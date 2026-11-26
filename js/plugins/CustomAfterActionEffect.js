//=============================================================================
// FixForcedActionStateTicks.js
// RPG Maker MV
//=============================================================================

(function() {
    'use strict';

    var Imported = Imported || {};
    Imported.FixForcedActionStateTicks = true;

    BattleManager._faPendingSubjects = [];
    BattleManager._faCurrentSubject = null;
    BattleManager._faCurrentWasForcedContext = false;
    BattleManager._faInForcedAction = false;

    // Цепочка взаимных форс-действий активна с момента первого queueForceAction
    // до следующего РЕАЛЬНОГО (не форс) startAction. Пока активна — любой
    // автоматический тик (onTurnEnd/onTurnStart от CTB и т.п.) пропускается;
    // длительности уменьшаются только вручную в tickForcedActionDurations.
    BattleManager._faChainActive = false;

    function isBattler(obj) {
        return obj && obj._states && obj._stateTurns && obj._buffTurns;
    }

    function battlerName(battler) {
        if (!battler) return 'NULL';
        if (battler.isActor && battler.isActor()) {
            return 'Actor: ' + battler.name() + ' (ID ' + battler.actorId() + ')';
        }
        if (battler.isEnemy && battler.isEnemy()) {
            return 'Enemy: ' + battler.name() + ' (Index ' + battler.index() + ')';
        }
        return 'Unknown battler';
    }

    //-------------------------------------------------------------------------
    // Логирующие helpers
    //-------------------------------------------------------------------------

    function faSnapshotStateTurns(battler) {
        var snap = {};
        if (!battler || !battler._states || !battler._stateTurns) return snap;
        for (var i = 0; i < battler._states.length; i++) {
            var id = battler._states[i];
            snap[id] = battler._stateTurns[id];
        }
        return snap;
    }

    function faSnapshotBuffTurns(battler) {
        if (!battler || !battler._buffTurns) return [];
        return battler._buffTurns.slice();
    }

    function faDiffStateTurns(before, after) {
        var result = [];
        var id;
        for (id in before) {
            if (!Object.prototype.hasOwnProperty.call(before, id)) continue;
            if (Object.prototype.hasOwnProperty.call(after, id)) {
                if (before[id] !== after[id]) {
                    result.push({ id: Number(id), from: before[id], to: after[id] });
                }
            } else {
                result.push({ id: Number(id), from: before[id], to: 'REMOVED' });
            }
        }
        for (id in after) {
            if (!Object.prototype.hasOwnProperty.call(after, id)) continue;
            if (!Object.prototype.hasOwnProperty.call(before, id)) {
                result.push({ id: Number(id), from: 'NEW', to: after[id] });
            }
        }
        return result;
    }

    function faDiffBuffTurns(before, after) {
        var result = [];
        var len = Math.max(before.length, after.length);
        for (var i = 0; i < len; i++) {
            var b = before[i];
            var a = after[i];
            if (b !== a) {
                result.push({ stat: i, from: b, to: a });
            }
        }
        return result;
    }

    //-------------------------------------------------------------------------
    // 1. При постановке в очередь запоминаем контекст и оригинального субъекта
    //-------------------------------------------------------------------------

    if (typeof BattleManager.queueForceAction === 'function') {
        var _FA_queueForceAction = BattleManager.queueForceAction;

        BattleManager.queueForceAction = function(subject, skillId, targetIndex) {
            if (isBattler(subject)) {
                var original = this._faOriginalSubjectOverride || this._subject;
                this._faPendingSubjects.push({
                    subject: subject,
                    wasForcedContext: this._faInForcedAction,
                    originalSubject: isBattler(original) ? original : null
                });

                // Открываем «цепочку»: с этого момента и до следующего
                // настоящего startAction все авто-тики будут пропускаться.
                if (!this._faChainActive) {
                    this._faChainActive = true;
                    console.log('[FA TICKS] Chain ACTIVE (opened by', battlerName(subject) + ')');
                }

                console.log(
                    '[FA TICKS] Queued:', battlerName(subject),
                    'Skill:', skillId,
                    'FromForcedContext:', this._faInForcedAction,
                    'OriginalSubject:', battlerName(original),
                    'Pending:', this._faPendingSubjects.length
                );
            }
            return _FA_queueForceAction.apply(this, arguments);
        };
    }

    //-------------------------------------------------------------------------
    // 2. При старте принудительного действия достаём флаг из очереди
    //-------------------------------------------------------------------------

    var _FA_processForcedAction = BattleManager.processForcedAction;

    BattleManager.processForcedAction = function() {
        var forcedSubject = null;
        var wasForcedContext = false;
        var originalSubject = null;

        if (isBattler(this._actionForcedBattler)) {
            forcedSubject = this._actionForcedBattler;
            var idx = this._faPendingSubjects.findIndex(function(e) {
                return e.subject === forcedSubject;
            });
            if (idx >= 0) {
                wasForcedContext = this._faPendingSubjects[idx].wasForcedContext;
                originalSubject = this._faPendingSubjects[idx].originalSubject;
                this._faPendingSubjects.splice(idx, 1);
            }
        }

        if (!forcedSubject && this._faPendingSubjects.length > 0) {
            var entry = this._faPendingSubjects.shift();
            forcedSubject = entry.subject;
            wasForcedContext = entry.wasForcedContext;
            originalSubject = entry.originalSubject;
        }

        this._faCurrentSubject = forcedSubject;
        this._faCurrentWasForcedContext = wasForcedContext;
        this._faInForcedAction = isBattler(forcedSubject);

        console.log(
            '[FA TICKS] Processing:', battlerName(forcedSubject),
            'FromForcedContext:', wasForcedContext,
            'OriginalSubject:', battlerName(originalSubject),
            'Pending left:', this._faPendingSubjects.length
        );

        _FA_processForcedAction.call(this);

        if (!this._faCurrentSubject && isBattler(this._subject)) {
            this._faCurrentSubject = this._subject;
            this._faCurrentWasForcedContext = false;
        }
    };

    //-----------------------------------------------------------------------------
    // 3. Контроль тиков состояний и баффов
    //-----------------------------------------------------------------------------
    // Пока активен форс-контекст ИЛИ цепочка — пропускаем любые авто-тики.
    // Это гарантирует ровно один ручной тик на каждое форс-действие и ноль
    // авто-тиков «в хвосте» цепочки, независимо от того, сколько раз CTB
    // вызовет onTurnEnd для каждого бойца.
    //-----------------------------------------------------------------------------

    var _FA_updateStateTurns = Game_Battler.prototype.updateStateTurns;

    Game_Battler.prototype.updateStateTurns = function() {

        if (BattleManager._faInForcedAction || BattleManager._faChainActive) {
            console.log(
                '[FA TICKS] updateStateTurns SKIPPED (forced/chain active):',
                battlerName(this)
            );
            return;
        }

        var before = faSnapshotStateTurns(this);
        _FA_updateStateTurns.call(this);
        var after = faSnapshotStateTurns(this);
        var diffs = faDiffStateTurns(before, after);

        if (diffs.length > 0) {
            console.log(
                '[FA TICKS] updateStateTurns DECREASED:', battlerName(this),
                'Changes:', JSON.stringify(diffs)
            );
        } else {
            console.log(
                '[FA TICKS] updateStateTurns:', battlerName(this),
                'No state duration changes'
            );
        }
    };

    var _FA_updateBuffTurns = Game_Battler.prototype.updateBuffTurns;

    Game_Battler.prototype.updateBuffTurns = function() {

        if (BattleManager._faInForcedAction || BattleManager._faChainActive) {
            console.log(
                '[FA TICKS] updateBuffTurns SKIPPED (forced/chain active):',
                battlerName(this)
            );
            return;
        }

        var before = faSnapshotBuffTurns(this);
        _FA_updateBuffTurns.call(this);
        var after = faSnapshotBuffTurns(this);
        var diffs = faDiffBuffTurns(before, after);

        if (diffs.length > 0) {
            console.log(
                '[FA TICKS] updateBuffTurns DECREASED:', battlerName(this),
                'Changes:', JSON.stringify(diffs)
            );
        } else {
            console.log(
                '[FA TICKS] updateBuffTurns:', battlerName(this),
                'No buff duration changes'
            );
        }
    };

    //-------------------------------------------------------------------------
    // 3b. Трассировка удаления состояний и диагностика onTurnStart/onTurnEnd
    //-------------------------------------------------------------------------

    var _FA_removeState_DEBUG = Game_Battler.prototype.removeState;

    Game_Battler.prototype.removeState = function(stateId) {
        var turns = this._stateTurns ? this._stateTurns[stateId] : undefined;

        if (stateId !== 1 && typeof turns === 'number') {
            console.log(
                '[STATE REMOVE TRACE]',
                'Battler:', battlerName(this),
                'State ID:', stateId,
                'State name:', $dataStates[stateId] ? $dataStates[stateId].name : 'Unknown',
                'Turns before:', turns,
                'Current subject:', battlerName(BattleManager._subject),
                'Forced action:', BattleManager._faInForcedAction,
                'Chain active:', BattleManager._faChainActive
            );
            console.trace('[STATE REMOVE CALL STACK]');
        }

        _FA_removeState_DEBUG.call(this, stateId);
    };

    var _FA_onTurnStart_DEBUG = Game_Battler.prototype.onTurnStart;

    Game_Battler.prototype.onTurnStart = function() {
        console.log(
            '[FA TICKS] onTurnStart ENTER:', battlerName(this),
            'Chain active:', BattleManager._faChainActive
        );
        _FA_onTurnStart_DEBUG.call(this);
    };

    var _FA_onTurnEnd_DEBUG = Game_Battler.prototype.onTurnEnd;

    Game_Battler.prototype.onTurnEnd = function() {
        console.log(
            '[FA TICKS] onTurnEnd ENTER:', battlerName(this),
            'Chain active:', BattleManager._faChainActive
        );
        _FA_onTurnEnd_DEBUG.call(this);
    };

    var _FA_removeStatesAuto = Game_Battler.prototype.removeStatesAuto;

    Game_Battler.prototype.removeStatesAuto = function(timing) {
        var before = this._states ? this._states.slice() : [];
        _FA_removeStatesAuto.call(this, timing);
        var after = this._states ? this._states.slice() : [];

        var removed = [];
        for (var i = 0; i < before.length; i++) {
            if (after.indexOf(before[i]) === -1) removed.push(before[i]);
        }

        if (removed.length > 0) {
            console.log(
                '[FA TICKS] removeStatesAuto(timing=' + timing + ') on:',
                battlerName(this),
                'Removed state(s) (duration expired):', JSON.stringify(removed)
            );
        }
    };

    var _FA_removeBuffsAuto = Game_Battler.prototype.removeBuffsAuto;

    Game_Battler.prototype.removeBuffsAuto = function() {
        var before = faSnapshotBuffTurns(this);
        _FA_removeBuffsAuto.call(this);
        var after = faSnapshotBuffTurns(this);
        var diffs = faDiffBuffTurns(before, after);

        if (diffs.length > 0) {
            console.log(
                '[FA TICKS] removeBuffsAuto on:', battlerName(this),
                'Removed/cleared buff(s) (duration expired):', JSON.stringify(diffs)
            );
        }
    };

    //-------------------------------------------------------------------------
    // 4. Ручной тик принудительного субъекта (Case 2)
    //-------------------------------------------------------------------------
    // Skip-лист больше не нужен: во время цепочки авто-тики и так
    // пропускаются по флагу _faChainActive. Оставлен только фактический
    // ручной тик — ровно один на каждое форс-действие.
    //-------------------------------------------------------------------------

    function tickForcedActionDurations(battler) {
        if (!isBattler(battler)) return;

        var statesBefore = [];
        var statesAfter = [];

        battler._states.slice().forEach(function(stateId) {
            var turns = battler._stateTurns[stateId];
            statesBefore.push({ id: stateId, turns: turns });
            if (typeof turns === 'number' && turns > 0) {
                battler._stateTurns[stateId] = turns - 1;
            }
        });

        if (typeof battler.removeStatesAuto === 'function') {
            battler.removeStatesAuto(2);
        }

        for (var i = 0; i < battler._buffTurns.length; i++) {
            if (battler._buffTurns[i] > 0) battler._buffTurns[i]--;
        }

        if (typeof battler.removeBuffsAuto === 'function') {
            battler.removeBuffsAuto();
        }

        battler._states.forEach(function(stateId) {
            statesAfter.push({
                id: stateId,
                turns: battler._stateTurns[stateId]
            });
        });

        console.log(
            '[FA TICKS] Ticked:', battlerName(battler),
            'Before:', JSON.stringify(statesBefore),
            'After:', JSON.stringify(statesAfter),
            'Buffs:', JSON.stringify(battler._buffTurns)
        );
    }

    //-------------------------------------------------------------------------
    // 5. Завершение действия
    //-------------------------------------------------------------------------

    var _FA_endAction = BattleManager.endAction;

    BattleManager.endAction = function() {
        var forcedSubject = this._faCurrentSubject;
        var isForcedAction = isBattler(forcedSubject);

        _FA_endAction.call(this);

        if (isForcedAction) {
            forcedSubject._revengeCounterPending = false;

            tickForcedActionDurations(forcedSubject);

            this._faInForcedAction = false;

            if (this._faCurrentSubject === forcedSubject) {
                this._faCurrentSubject = null;
                this._faCurrentWasForcedContext = false;
            }

            console.log(
                '[FA TICKS] endAction done. Forced subject:',
                battlerName(forcedSubject),
                'Pending left:', this._faPendingSubjects.length,
                'Chain active:', this._faChainActive
            );
        }
    };

    //-----------------------------------------------------------------------------
    // Сброс флагов перед следующим НАСТОЯЩИМ (не форс) действием
    //-----------------------------------------------------------------------------

    var _FA_startAction = BattleManager.startAction;

    BattleManager.startAction = function() {

        if (!this._faInForcedAction && this._faChainActive) {
            // Реальная (не форс) акция началась — цепочка завершена.
            this._faChainActive = false;
            console.log('[FA TICKS] Chain DEACTIVATED (real startAction)');
        }

        _FA_startAction.call(this);
    };

    //-------------------------------------------------------------------------
    // 6. Сброс при старте боя
    //-------------------------------------------------------------------------

    var _FA_setup = BattleManager.setup;

    BattleManager.setup = function(troopId, canEscape, canLose) {
        this._faPendingSubjects = [];
        this._faCurrentSubject = null;
        this._faCurrentWasForcedContext = false;
        this._faInForcedAction = false;
        this._faChainActive = false;
        this._faOriginalSubjectOverride = null;
        _FA_setup.call(this, troopId, canEscape, canLose);
    };

})();

//=============================================================================
// Custom After Action State Effect
//=============================================================================
// Requires: YEP_BattleEngineCore.js, YEP_BuffsStatesCore.js
// Place this plugin BELOW both of them in the Plugin Manager.
//=============================================================================

var Imported = Imported || {};
Imported.CustomAfterActionEffect = true;

var Yanfly = Yanfly || {};
Yanfly.AAE = Yanfly.AAE || {};

//=============================================================================
// Dependency Check
//=============================================================================
if (!Imported.YEP_BattleEngineCore || !Imported.YEP_BuffsStatesCore) {
    throw new Error('CustomAfterActionEffect requires YEP_BattleEngineCore and YEP_BuffsStatesCore');
}

//=============================================================================
// DataManager
//=============================================================================

var AAE_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!AAE_DataManager_isDatabaseLoaded.call(this)) return false;
    if (!Yanfly._loaded_AAE) {
        this.processAAENotetags($dataStates);
        Yanfly._loaded_AAE = true;
    }
    return true;
};

DataManager.processAAENotetags = function(group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        if (!obj.customEffectEval) {
            obj.customEffectEval = {};
        }
        obj.customEffectEval['afterActionState'] = obj.customEffectEval['afterActionState'] || '';

        var notedata = obj.note.split(/[\r\n]+/);
        var evalMode = 'none';
        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(/<CUSTOM[ ](AFTER ACTION|POST ACTION)[ ]EFFECT>/i)) {
                evalMode = 'afterActionState';
            } else if (line.match(/<\/CUSTOM[ ](AFTER ACTION|POST ACTION)[ ]EFFECT>/i)) {
                evalMode = 'none';
            } else if (evalMode === 'afterActionState') {
                obj.customEffectEval['afterActionState'] += line + '\n';
            }
        }
    }
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.customAfterActionEval = function(stateId, subject) {
    var state = $dataStates[stateId];
    if (!state) return;
    var code = state.customEffectEval['afterActionState'];
    if (!code || code === '') return;

    var a = subject;
    var b = this;
    var user = subject;
    var target = this;
    var origin = this.stateOrigin ? this.stateOrigin(stateId) : null;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;

    try {
        eval(code);
    } catch (e) {
        Yanfly.Util.displayError(e, code, 'CUSTOM AFTER ACTION EFFECT ERROR for state ' + stateId);
    }
};

Game_Battler.prototype.processAfterActionStateEffects = function(subject) {
    if (!subject) return;
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        if (state) this.customAfterActionEval(state.id, subject);
    }
};

//=============================================================================
// BattleManager
//=============================================================================

var AAE_BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    var subject = this._subject;
    var allTargets = this._allTargets ? this._allTargets.slice() : [];

    AAE_BattleManager_endAction.call(this);

    if (!subject) return;

    var targets = [];
    if (allTargets.length > 0) {
        targets = targets.concat(allTargets);
    }

    var party = $gameParty && $gameParty.battleMembers ? $gameParty.battleMembers() : [];
    var troop = $gameTroop && $gameTroop.members ? $gameTroop.members() : [];
    for (var i = 0; i < party.length; i++) {
        if (targets.indexOf(party[i]) === -1) targets.push(party[i]);
    }
    for (var i = 0; i < troop.length; i++) {
        if (targets.indexOf(troop[i]) === -1) targets.push(troop[i]);
    }

    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        if (target && target.processAfterActionStateEffects) {
            target.processAfterActionStateEffects(subject);
        }
    }
};

//=============================================================================
// End of File
//=============================================================================
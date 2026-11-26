
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
    BattleManager._faSkipTickFor = null; // кому пропускаем тик
    BattleManager._faSkipBuffTickFor = null;

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
    // 1. При постановке в очередь запоминаем контекст и оригинального субъекта
    //-------------------------------------------------------------------------

    if (typeof BattleManager.queueForceAction === 'function') {
        var _FA_queueForceAction = BattleManager.queueForceAction;

        BattleManager.queueForceAction = function(subject, skillId, targetIndex) {
            if (isBattler(subject)) {
                // Оригинальный субъект — тот, кто сейчас действует (a),
                // либо явно переданный через override.
                var original = this._faOriginalSubjectOverride || this._subject;
                this._faPendingSubjects.push({
                    subject: subject,
                    wasForcedContext: this._faInForcedAction,
                    originalSubject: isBattler(original) ? original : null
                });
                console.log(
                    '[FA TICKS] Queued:', battlerName(subject),
                    'Skill:', skillId,
                    'FromForcedContext:', this._faInForcedAction,
                    'OriginalSubject:', battlerName(original)
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

        // ВАЖНО: для Case 1 пропускаем тик состояний/баффов оригинального
        // субъекта, пока активно принудительное действие.
        this._faSkipStateTickFor =
            (!wasForcedContext && isBattler(originalSubject)) ? originalSubject : null;

        this._faSkipBuffTickFor =
            (!wasForcedContext && isBattler(originalSubject)) ? originalSubject : null;

        console.log(
            '[FA TICKS] Processing:', battlerName(forcedSubject),
            'FromForcedContext:', wasForcedContext,
            'SkipTickFor:', battlerName(this._faSkipTickFor)
        );

        _FA_processForcedAction.call(this);

        if (!this._faCurrentSubject && isBattler(this._subject)) {
            this._faCurrentSubject = this._subject;
            this._faCurrentWasForcedContext = false;
            this._faSkipTickFor = null;
        }
    };

    //-----------------------------------------------------------------------------
    // 3. Контроль тиков состояний и баффов
    //-----------------------------------------------------------------------------
    function removeBattlerFromList(list, battler) {
        var index = list.indexOf(battler);

        if (index >= 0) {
            list.splice(index, 1);
        }
    }

    function skipNextAutomaticTick(list, battler) {
        if (list.indexOf(battler) >= 0) {
            removeBattlerFromList(list, battler);
            return true;
        }

        return false;
    }

    var _FA_updateStateTurns = Game_Battler.prototype.updateStateTurns;

    Game_Battler.prototype.updateStateTurns = function() {

        if (skipNextAutomaticTick(
            BattleManager._faSkipStateTicks, this
        )) return;

        if (BattleManager._faInForcedAction) return;

        if (this === BattleManager._faSkipStateTickFor) {
            BattleManager._faSkipStateTickFor = null;
            return;
        }

        _FA_updateStateTurns.call(this);
    };

    var _FA_updateBuffTurns = Game_Battler.prototype.updateBuffTurns;

    Game_Battler.prototype.updateBuffTurns = function() {

        if (skipNextAutomaticTick(
            BattleManager._faSkipBuffTicks, this
        )) return;

        if (BattleManager._faInForcedAction) return;

        if (this === BattleManager._faSkipBuffTickFor) {
            BattleManager._faSkipBuffTickFor = null;
            return;
        }

        _FA_updateBuffTurns.call(this);
    };

    //-------------------------------------------------------------------------
    // 4. Ручной тик принудительного субъекта (Case 2)
    //-------------------------------------------------------------------------

    function tickForcedActionDurations(battler) {
        if (!isBattler(battler)) return;

        // Запоминаем исполнителя, чтобы пропустить повторный
        // автоматический тик длительности.
        if (BattleManager._faSkipStateTicks.indexOf(battler) < 0) {
            BattleManager._faSkipStateTicks.push(battler);
        }

        if (BattleManager._faSkipBuffTicks.indexOf(battler) < 0) {
            BattleManager._faSkipBuffTicks.push(battler);
        }

        // Далее идёт прежний код ручного уменьшения состояний и баффов.

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
        var endingSubject = this._subject;
        var forcedSubject = this._faCurrentSubject;
        var wasForcedContext = this._faCurrentWasForcedContext;

        // Проверяем наличие отслеживаемого принудительного действия.
        var isForcedAction = isBattler(forcedSubject);

        _FA_endAction.call(this);

        if (isForcedAction) {

            forcedSubject._revengeCounterPending = false;

            // Всегда уменьшаем длительность состояний исполнителя.
            tickForcedActionDurations(forcedSubject);

            this._faInForcedAction = false;
            this._faSkipTickFor = null;

            if (this._faCurrentSubject === forcedSubject) {
                this._faCurrentSubject = null;
                this._faCurrentWasForcedContext = false;
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Сброс устаревших флагов перед следующим обычным действием
    //-----------------------------------------------------------------------------

    var _FA_startAction = BattleManager.startAction;

    BattleManager.startAction = function() {

        if (!this._faInForcedAction) {
            this._faSkipStateTicks = [];
            this._faSkipBuffTicks = [];

            this._faSkipStateTickFor = null;
            this._faSkipBuffTickFor = null;
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
        // Не сбрасываем _faSkipStateTickFor и _faSkipBuffTickFor здесь.
        // Они должны сохраниться до фактического обновления длительности
        // прерванного бойца.
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
        // Ensure the eval container exists
        if (!obj.customEffectEval) {
            obj.customEffectEval = {};
        }
        obj.customEffectEval['afterActionState'] = obj.customEffectEval['afterActionState'] || '';

        var notedata = obj.note.split(/[\r\n]+/);
        var evalMode = 'none';
        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            // Match <Custom After Action Effect> or <Custom Post Action Effect>
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

    // Set up variables as in other BSC custom effects
    var a = subject;                   // attacker
    var b = this;                      // target (the battler with this state)
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
    // Remember subject before it is cleared by the original method.
    var subject = this._subject;

    // Fallback list: if _allTargets is populated, keep old behaviour; but
    // for the general case we'll iterate over ALL battlers below.
    var allTargets = this._allTargets ? this._allTargets.slice() : [];

    // Call original (this cleans up action and moves battlers back, etc.)
    AAE_BattleManager_endAction.call(this);

    if (!subject) return;

    // Build a set of battlers to process.
    // The old code only used _allTargets, which is unreliable when an action
    // sequence hits several targets one after another (e.g. via multiple
    // "action effect: target" calls, especially under CTB).
    var targets = [];
    if (allTargets.length > 0) {
        targets = targets.concat(allTargets);
    }

    // Add every actor and enemy in the battle to guarantee that any battler
    // hit earlier in the action is also processed.
    var party = $gameParty && $gameParty.battleMembers ? $gameParty.battleMembers() : [];
    var troop = $gameTroop && $gameTroop.members ? $gameTroop.members() : [];
    for (var i = 0; i < party.length; i++) {
        if (targets.indexOf(party[i]) === -1) targets.push(party[i]);
    }
    for (var i = 0; i < troop.length; i++) {
        if (targets.indexOf(troop[i]) === -1) targets.push(troop[i]);
    }

    // Now run the custom after-action effects on every battler.
    // Each state's own code is responsible for checking whether it should do
    // anything (e.g. via its own per-battler flags).
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

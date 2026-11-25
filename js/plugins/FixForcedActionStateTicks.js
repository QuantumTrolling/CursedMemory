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
        this._faSkipTickFor =
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

    //-------------------------------------------------------------------------
    // 3. Хуки на тик состояний и баффов
    //-------------------------------------------------------------------------

    var _FA_updateStateTurns = Game_Battler.prototype.updateStateTurns;
    Game_Battler.prototype.updateStateTurns = function() {
        if (BattleManager._faInForcedAction && this === BattleManager._faSkipTickFor) {
            console.log('[FA TICKS] Skipped state tick for original subject:', battlerName(this));
            return;
        }
        _FA_updateStateTurns.call(this);
    };

    var _FA_updateBuffTurns = Game_Battler.prototype.updateBuffTurns;
    Game_Battler.prototype.updateBuffTurns = function() {
        if (BattleManager._faInForcedAction && this === BattleManager._faSkipTickFor) {
            console.log('[FA TICKS] Skipped buff tick for original subject:', battlerName(this));
            return;
        }
        _FA_updateBuffTurns.call(this);
    };

    //-------------------------------------------------------------------------
    // 4. Ручной тик принудительного субъекта (Case 2)
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
        var endingSubject = this._subject;
        var forcedSubject = this._faCurrentSubject;
        var wasForcedContext = this._faCurrentWasForcedContext;
        var isForcedAction =
            isBattler(forcedSubject) && endingSubject === forcedSubject;

        _FA_endAction.call(this);

        if (isForcedAction) {
            if (wasForcedContext) {
                tickForcedActionDurations(forcedSubject);
            } else {
                console.log(
                    '[FA TICKS] Skipped tick (normal-triggered forced action):',
                    battlerName(forcedSubject)
                );
            }

            this._faInForcedAction = false;
            this._faSkipTickFor = null;
            if (this._faCurrentSubject === forcedSubject) {
                this._faCurrentSubject = null;
                this._faCurrentWasForcedContext = false;
            }
        }
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
        this._faSkipTickFor = null;
        this._faOriginalSubjectOverride = null;
        _FA_setup.call(this, troopId, canEscape, canLose);
    };

})();
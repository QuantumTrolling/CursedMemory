
//=============================================================================
// FixForcedActionStateTicks.js
// RPG Maker MV
//
// Directly decreases state and buff turn counters after forced actions.
// Does not call onTurnEnd(), so no extra regeneration is triggered.
//
// Place BELOW:
//   YEP_BattleEngineCore
//   YEP_BuffsStatesCore
//   YEP_X_BattleSysCTB
//   CustomAfterActionEffect
//=============================================================================

(function() {
    'use strict';

    var Imported = Imported || {};
    Imported.FixForcedActionStateTicks = true;

    //-------------------------------------------------------------------------
    // Initialization
    //-------------------------------------------------------------------------

    BattleManager._faPendingSubjects = [];
    BattleManager._faCurrentSubject = null;

    function isBattler(obj) {
        return obj &&
            obj._states &&
            obj._stateTurns &&
            obj._buffTurns;
    }

    function battlerName(battler) {
        if (!battler) return 'NULL';

        if (battler.isActor && battler.isActor()) {
            return 'Actor: ' + battler.name() +
                ' (ID ' + battler.actorId() + ')';
        }

        if (battler.isEnemy && battler.isEnemy()) {
            return 'Enemy: ' + battler.name() +
                ' (Index ' + battler.index() + ')';
        }

        return 'Unknown battler';
    }

    //-------------------------------------------------------------------------
    // 1. Remember queued forced-action subjects.
    //-------------------------------------------------------------------------

    if (typeof BattleManager.queueForceAction === 'function') {
        var _FA_queueForceAction = BattleManager.queueForceAction;

        BattleManager.queueForceAction = function(subject, skillId, targetIndex) {
            if (isBattler(subject)) {
                this._faPendingSubjects.push(subject);

                console.log(
                    '[FA TICKS] Queued:',
                    battlerName(subject),
                    'Skill:',
                    skillId
                );
            }

            return _FA_queueForceAction.apply(this, arguments);
        };
    }

    //-------------------------------------------------------------------------
    // 2. Detect the subject when the forced action starts.
    //-------------------------------------------------------------------------

    var _FA_processForcedAction = BattleManager.processForcedAction;

    BattleManager.processForcedAction = function() {
        var forcedSubject = null;

        if (isBattler(this._actionForcedBattler)) {
            forcedSubject = this._actionForcedBattler;
        }

        if (!forcedSubject && this._faPendingSubjects.length > 0) {
            forcedSubject = this._faPendingSubjects.shift();
        } else if (forcedSubject) {
            var index = this._faPendingSubjects.indexOf(forcedSubject);

            if (index >= 0) {
                this._faPendingSubjects.splice(index, 1);
            }
        }

        this._faCurrentSubject = forcedSubject;

        console.log(
            '[FA TICKS] Processing:',
            battlerName(forcedSubject)
        );

        _FA_processForcedAction.call(this);

        // Fallback for battle systems that assign the subject here.
        if (!this._faCurrentSubject && isBattler(this._subject)) {
            this._faCurrentSubject = this._subject;
        }
    };

    //-------------------------------------------------------------------------
    // 3. Directly decrease durations.
    //-------------------------------------------------------------------------

    function tickForcedActionDurations(battler) {
        if (!isBattler(battler)) return;

        var statesBefore = [];
        var statesAfter = [];

        // States: directly decrease every positive turn counter.
        battler._states.slice().forEach(function(stateId) {
            var turns = battler._stateTurns[stateId];

            statesBefore.push({
                id: stateId,
                turns: turns
            });

            if (typeof turns === 'number' && turns > 0) {
                battler._stateTurns[stateId] = turns - 1;
            }
        });

        // Remove states whose turn duration has expired.
        // Timing 2 corresponds to turn-end removal in RPG Maker MV.
        if (typeof battler.removeStatesAuto === 'function') {
            battler.removeStatesAuto(2);
        }

        // Buffs: directly decrease every positive turn counter.
        for (var i = 0; i < battler._buffTurns.length; i++) {
            if (battler._buffTurns[i] > 0) {
                battler._buffTurns[i]--;
            }
        }

        // Remove expired buffs.
        if (typeof battler.removeBuffsAuto === 'function') {
            battler.removeBuffsAuto();
        }

        // Collect the resulting state counters.
        battler._states.forEach(function(stateId) {
            statesAfter.push({
                id: stateId,
                turns: battler._stateTurns[stateId]
            });
        });

        console.log(
            '[FA TICKS] Finished:',
            battlerName(battler),
            'States BEFORE:',
            JSON.stringify(statesBefore),
            'States AFTER:',
            JSON.stringify(statesAfter),
            'Buff turns:',
            JSON.stringify(battler._buffTurns)
        );
    }

    //-------------------------------------------------------------------------
    // 4. Tick only the subject of the action that actually ended.
    //-------------------------------------------------------------------------

    var _FA_endAction = BattleManager.endAction;

    BattleManager.endAction = function() {
        // Capture before original endAction:
        // CustomAfterActionEffect can queue new actions inside it.
        var endingSubject = this._subject;
        var forcedSubject = this._faCurrentSubject;

        var isForcedAction =
            isBattler(forcedSubject) &&
            endingSubject === forcedSubject;

        _FA_endAction.call(this);

        if (isForcedAction) {
            tickForcedActionDurations(forcedSubject);

            if (this._faCurrentSubject === forcedSubject) {
                this._faCurrentSubject = null;
            }
        }
    };

    //-------------------------------------------------------------------------
    // 5. Reset on battle setup.
    //-------------------------------------------------------------------------

    var _FA_setup = BattleManager.setup;

    BattleManager.setup = function(troopId, canEscape, canLose) {
        this._faPendingSubjects = [];
        this._faCurrentSubject = null;

        _FA_setup.call(this, troopId, canEscape, canLose);
    };

})();

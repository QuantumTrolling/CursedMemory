//=============================================================================
// FixForcedActionStateTicks.js
// Blocks state turn reduction for non-subject battlers during and shortly
// after forced actions triggered by queueForceAction.
// Place BELOW: YEP_BattleEngineCore, YEP_BuffsStatesCore, YEP_X_BattleSysCTB,
// CustomAfterActionEffect
//=============================================================================

(function() {

var Imported = Imported || {};
Imported.FixForcedActionStateTicks = true;

// --- 1) Hook queueForceAction: mark subject BEFORE forced action runs ---
if (typeof BattleManager.queueForceAction === 'function') {
    var _BM_queueForceAction = BattleManager.queueForceAction;
    BattleManager.queueForceAction = function(subject, skillId, targetIndex) {
        BattleManager._faSubject = subject;
        BattleManager._faQueued = true;
        return _BM_queueForceAction.apply(this, arguments);
    };
}

// --- 2) Hook processForcedAction: mark active + clear queued ---
var _BM_processForcedAction = BattleManager.processForcedAction;
BattleManager.processForcedAction = function() {
    BattleManager._faQueued = false;
    BattleManager._faActive = true;
    _BM_processForcedAction.call(this);
};

// --- 3) Hook endAction: forced action ended → start grace window ---
var _BM_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    var wasForced = BattleManager._faActive;
    _BM_endAction.call(this);
    if (wasForced) {
        BattleManager._faActive = false;
        BattleManager._faGrace = 120;   // frames of protection after forced action
    }
};

// --- 4) Decrement grace counter every frame ---
var _BM_update = BattleManager.update;
BattleManager.update = function() {
    if (BattleManager._faGrace > 0) BattleManager._faGrace--;
    _BM_update.call(this);
};

// --- 5) Block updateStateTurns for non-subjects during forced + grace ---
var _GBB_updateStateTurns = Game_BattlerBase.prototype.updateStateTurns;
Game_BattlerBase.prototype.updateStateTurns = function() {
    var active = BattleManager._faActive || BattleManager._faQueued;
    var grace = BattleManager._faGrace > 0;
    var subject = BattleManager._faSubject;
    if ((active || grace) && subject && this !== subject) {
        return;
    }
    _GBB_updateStateTurns.call(this);
};

// --- 6) Reset flags on battle setup ---
var _BM_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    this._faActive = false;
    this._faQueued = false;
    this._faGrace = 0;
    this._faSubject = null;
    _BM_setup.call(this, troopId, canEscape, canLose);
};

})();
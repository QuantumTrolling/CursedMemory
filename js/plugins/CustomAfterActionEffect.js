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
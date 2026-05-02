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
    // Remember targets and subject before they are cleared
    var allTargets = this._allTargets ? this._allTargets.slice() : [];
    var subject = this._subject;
    
    // Call original (this cleans up action and moves battlers back, etc.)
    AAE_BattleManager_endAction.call(this);
    
    // Now run the custom after-action effects on every target
    if (allTargets.length > 0 && subject) {
        for (var i = 0; i < allTargets.length; i++) {
            var target = allTargets[i];
            if (target && target.processAfterActionStateEffects) {
                target.processAfterActionStateEffects(subject);
            }
        }
    }
};

//=============================================================================
// End of File
//=============================================================================
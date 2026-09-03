//=============================================================================
// FixRemoveEffectsOnDeath.js
//=============================================================================
/*:
 * @plugindesc v1.1 Ensures states are removed with their Custom Remove Effects before death state is applied.
 * Also adds Game_BattlerBase.forceAddState to bypass state add restrictions while still triggering Apply Effects.
 * @author Assistant
 *
 * @help
 * This plugin modifies Game_Battler.die so that all states except state 1
 * (death) are removed via removeState() before death state is added.
 *
 * It also adds forceAddState(stateId) which adds a state even if isStateAddable
 * returns false, but still initializes turn count, refreshes, and triggers
 * custom apply effects.
 *
 * Place this plugin below YEP_BuffsStatesCore.
 */
(function() {
    // --- Оригинальный fix для смерти ---
    var _Game_Battler_die = Game_Battler.prototype.die;
    Game_Battler.prototype.die = function() {
        this._hp = 0;
        var states = this._states.slice();
        for (var i = 0; i < states.length; i++) {
            var stateId = states[i];
            if (stateId !== 1) {
                this.removeState(stateId);
            }
        }
        _Game_Battler_die.call(this);
    };

    // --- Метод принудительного добавления состояния с вызовом эффектов ---
    Game_BattlerBase.prototype.forceAddState = function(stateId) {
        if (this._states.contains(stateId)) return;
        this._states.push(stateId);
        this._states.sort(function(a, b) { return a - b; });

        var state = $dataStates[stateId];
        var variance = 1 + Math.max(state.maxTurns - state.minTurns, 0);
        this._stateTurns[stateId] = state.minTurns + Math.randomInt(variance);

        this.refresh();
        // Вызываем onAddState, если он есть (для совместимости с другими плагинами)
        if (this.onAddState) {
            this.onAddState(stateId);
        }
        // Вызываем кастомный Apply Effect (Yanfly Buffs & States Core)
        this.customEffectEval(stateId, 'addState');
    };
})();
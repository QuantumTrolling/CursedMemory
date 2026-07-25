//=============================================================================
// DeathCleanseStates.js
// При наложении смерти (state ID 1) сначала снимает все остальные состояния,
// вызывая для каждого Custom Remove Effect из YEP_BuffsStatesCore.
//=============================================================================

var Imported = Imported || {};
Imported.DeathCleanseStates = true;

(function() {

    // Оригинальный метод
    var _Game_Battler_addState = Game_Battler.prototype.addState;

    Game_Battler.prototype.addState = function(stateId) {
        // Если добавляется смерть и персонаж ещё жив
        if (stateId === 1 && this.isAlive()) {
            // Копируем массив текущих состояний, так как он изменится при удалении
            var currentStates = this._states.clone();
            // Флаг для предотвращения повторного входа (на всякий случай)
            this._deathCleanseActive = true;
            // Снимаем все состояния, кроме самой смерти (её ещё нет)
            for (var i = 0; i < currentStates.length; i++) {
                var id = currentStates[i];
                if (id !== 1) { // на всякий случай, хотя смерти нет
                    // Вызовет removeState → YEP_BuffsStatesCore запустит Custom Remove Effect
                    this.removeState(id);
                }
            }
            this._deathCleanseActive = false;
        }

        // Стандартное добавление состояния (теперь уже смерти)
        _Game_Battler_addState.call(this, stateId);
    };

})();
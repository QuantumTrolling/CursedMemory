/*:
 * @plugindesc Состояние-множитель стоимости TP
 * @author Помощник
 * @help В заметку (Note) состояния добавьте тег:
 * <TP Cost Multiplier: 0.5>
 * или процент:
 * <TP Cost Multiplier: 50%>
 *
 * Все навыки персонажа с этим состоянием будут потреблять
 * указанную ДОЛЮ от исходной стоимости TP.
 * Если действует несколько таких состояний, множители перемножаются.
 * Результат округляется вверх.
 */

(function() {
    var _Game_BattlerBase_skillTpCost = Game_BattlerBase.prototype.skillTpCost;
    Game_BattlerBase.prototype.skillTpCost = function(skill) {
        var cost = _Game_BattlerBase_skillTpCost.call(this, skill);
        if (this.states) {
            var states = this.states();
            for (var i = 0; i < states.length; i++) {
                var note = states[i].note;
                // Ищем тег <TP Cost Multiplier: число>
                var match = note.match(/<TP[ _]?COST[ _]?MULTIPLIER:[ _]?(\d+\.?\d*)\s*%?>/i);
                if (match) {
                    var mult = parseFloat(match[1]);
                    if (match[0].includes('%')) mult /= 100;
                    cost = Math.ceil(cost * mult);
                }
            }
        }
        return cost;
    };
})();
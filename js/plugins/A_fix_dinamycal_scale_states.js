/*:
 * @plugindesc Состояние: бонус MAT от DEF
 * @author Помощник
 * @help Добавляет тег для состояний:
 * <MAT Bonus from DEF: 0.5>
 * или
 * <MAT Bonus from DEF: 50%>
 * 
 * При наличии такого состояния магическая атака (MAT)
 * увеличивается на (DEF × множитель).
 * Может суммироваться от нескольких состояний.
 * Результат округляется вниз (целое число).
 */

(function() {
    var _Game_BattlerBase_param = Game_BattlerBase.prototype.param;
    Game_BattlerBase.prototype.param = function(paramId) {
        var value = _Game_BattlerBase_param.call(this, paramId);
        if (paramId === 4) { // MAT (4-й параметр)
            if (this.states) {
                var states = this.states();
                for (var i = 0; i < states.length; i++) {
                    var note = states[i].note;
                    var match = note.match(/<MAT[ _]?BONUS[ _]?FROM[ _]?DEF:[ _]?(\d+\.?\d*)\s*%?>/i);
                    if (match) {
                        var mult = parseFloat(match[1]);
                        if (match[0].includes('%')) mult /= 100;
                        value += Math.floor(this.param(3) * mult); // DEF = param 3
                    }
                }
            }
        }
        return value;
    };
})();
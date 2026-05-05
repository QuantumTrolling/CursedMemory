/*:
 * @plugindesc Состояния: бонус MAT от DEF и LUK от ATK
 * @author Помощник
 * @help Добавляет теги для состояний:
 *   <MAT Bonus from DEF: 0.5>
 *   <MAT Bonus from DEF: 50%>
 *
 *   <LUK Bonus from ATK: 0.3>
 *   <LUK Bonus from ATK: 30%>
 * 
 * При наличии состояния:
 *   MAT увеличивается на (DEF × множитель),
 *   LUK увеличивается на (ATK × множитель).
 * Бонусы от разных состояний суммируются.
 * Результат округляется вниз.
 */

(function() {
    var _Game_BattlerBase_param = Game_BattlerBase.prototype.param;
    Game_BattlerBase.prototype.param = function(paramId) {
        var value = _Game_BattlerBase_param.call(this, paramId);
        if (this.states) {
            var states = this.states();
            if (paramId === 4) { // MAT (магическая атака)
                for (var i = 0; i < states.length; i++) {
                    var note = states[i].note;
                    var match = note.match(/<MAT[ _]?BONUS[ _]?FROM[ _]?DEF:[ _]?(\d+\.?\d*)\s*%?>/i);
                    if (match) {
                        var mult = parseFloat(match[1]);
                        if (match[0].includes('%')) mult /= 100;
                        value += Math.floor(this.param(3) * mult); // DEF = параметр 3
                    }
                }
            } else if (paramId === 7) { // LUK (удача)
                for (var i = 0; i < states.length; i++) {
                    var note = states[i].note;
                    var match = note.match(/<LUK[ _]?BONUS[ _]?FROM[ _]?ATK:[ _]?(\d+\.?\d*)\s*%?>/i);
                    if (match) {
                        var mult = parseFloat(match[1]);
                        if (match[0].includes('%')) mult /= 100;
                        value += Math.floor(this.param(2) * mult); // ATK = параметр 2
                    }
                }
            }
        }
        return value;
    };
})();
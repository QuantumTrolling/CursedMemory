/*:
 * @plugindesc Состояния: динамические бонусы от параметров и HP
 * @author Помощник
 *
 * @help
 * Примеры тегов:
 *
 * <MAT Bonus from DEF: 50%>
 * <LUK Bonus from ATK: 30%>
 *
 * <AGI Bonus from Missing HP: 5%>
 * <DEF Bonus from Missing HP: 10%>
 *
 * <AGI Bonus from Current HP: 2%>
 * <LUK Bonus from Current HP: 1%>
 *
 * Поддержка:
 * MAT, ATK, DEF, AGI, LUK
 * Источники:
 * ATK, DEF, MAT, AGI, LUK, Current HP, Missing HP
 */

(function() {

    const PARAM_MAP = {
        MHP: 0,
        MMP: 1,
        ATK: 2,
        DEF: 3,
        MAT: 4,
        MDF: 5,
        AGI: 6,
        LUK: 7
    };

    const _Game_BattlerBase_param = Game_BattlerBase.prototype.param;

    Game_BattlerBase.prototype.param = function(paramId) {
        let baseValue = _Game_BattlerBase_param.call(this, paramId);
        let value = baseValue;

        const states = this.states();
        if (!states) return value;

        for (let i = 0; i < states.length; i++) {
            const note = states[i].note;

            const regex = /<(\w+)[ _]?BONUS[ _]?FROM[ _]?([\w ]+):[ _]?(\d+\.?\d*)\s*%?>/gi;
            let match;

            while ((match = regex.exec(note)) !== null) {
                let target = match[1].toUpperCase();
                let source = match[2].toUpperCase();
                let mult = parseFloat(match[3]);

                if (match[0].includes('%')) mult /= 100;

                if (PARAM_MAP[target] !== paramId) continue;

                let sourceValue = 0;

                // 📌 Источник = параметр
                if (PARAM_MAP[source] !== undefined) {
                    sourceValue = _Game_BattlerBase_param.call(this, PARAM_MAP[source]);
                }

                // 📌 Текущий HP
                else if (source === "CURRENT HP") {
                    sourceValue = this.hp || 0;
                }

                // 📌 Недостающее HP
                else if (source === "MISSING HP") {
                    sourceValue = (this.mhp || 0) - (this.hp || 0);
                }

                value += Math.floor(sourceValue * mult);
            }
        }

        return value;
    };

})();
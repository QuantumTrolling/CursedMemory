/*:
 * @plugindesc Состояния: динамические бонусы от параметров, HP и щита
 * @author Помощник
 *
 * @help
 * ============================================================================
 * Примеры тегов:
 * ============================================================================
 *
 * 1. Плоская прибавка:
 *    <DEF Bonus from Current Shield: 10%>
 *    <MAT Bonus from DEF: 50%>
 *
 * 2. Процент от базового параметра за каждую единицу источника:
 *    <DEF Bonus per Shield: 10%>
 *    <ATK Bonus per Missing HP: 2%>
 *    <MAT Bonus per Current HP: 1%>
 *
 * ============================================================================
 * Источники:
 * ATK, DEF, MAT, AGI, LUK, Current HP, Missing HP, Current Shield, Shield
 * ============================================================================
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
        const baseValue = _Game_BattlerBase_param.call(this, paramId);

        const states = this.states();
        if (!states || states.length === 0) {
            return baseValue;
        }

        let bonusFlat = 0;
        let bonusPercent = 0;

        for (let i = 0; i < states.length; i++) {
            const note = states[i].note || "";

            // <PARAM Bonus from SOURCE: X%>
            const regexFlat =
                /<(\w+)[ _]?BONUS[ _]?FROM[ _]?([\w ]+):[ _]?(\d+\.?\d*)\s*%?>/gi;

            let matchFlat;
            while ((matchFlat = regexFlat.exec(note)) !== null) {

                const target = matchFlat[1].toUpperCase();
                const source = matchFlat[2].toUpperCase().trim();

                let mult = parseFloat(matchFlat[3]);

                if (matchFlat[0].includes('%')) {
                    mult /= 100;
                }

                if (PARAM_MAP[target] !== paramId) {
                    continue;
                }

                bonusFlat += Math.floor(
                    this.getSourceValue(source) * mult
                );
            }

            // <PARAM Bonus per SOURCE: X%>
            const regexPer =
                /<(\w+)[ _]?BONUS[ _]?PER[ _]?([\w ]+):[ _]?(\d+\.?\d*)\s*%?>/gi;

            let matchPer;
            while ((matchPer = regexPer.exec(note)) !== null) {

                const target = matchPer[1].toUpperCase();
                const source = matchPer[2].toUpperCase().trim();

                let mult = parseFloat(matchPer[3]);

                if (matchPer[0].includes('%')) {
                    mult /= 100;
                }

                if (PARAM_MAP[target] !== paramId) {
                    continue;
                }

                bonusPercent += mult * this.getSourceValue(source);
            }
        }

        return (
            baseValue +
            Math.floor(baseValue * bonusPercent) +
            bonusFlat
        );
    };

    Game_BattlerBase.prototype.getSourceValue = function(source) {

        // Параметры
        if (PARAM_MAP[source] !== undefined) {
            return _Game_BattlerBase_param.call(this, PARAM_MAP[source]);
        }

        // Current HP
        if (source === "CURRENT HP") {
            return this.hp || 0;
        }

        // Missing HP
        if (source === "MISSING HP") {
            return (this.mhp || 0) - (this.hp || 0);
        }

        // Shield / Current Shield
        if (source === "CURRENT SHIELD" || source === "SHIELD") {

            // Olivia Octo Battle:
            // во время Break считаем щиты равными 0
            if (typeof this.isStateAffected === "function") {

                const breakStateId =
                    Olivia &&
                    Olivia.OctoBattle &&
                    Olivia.OctoBattle.BreakShield ?
                    Olivia.OctoBattle.BreakShield.StunStateId :
                    4;

                if (this.isStateAffected(breakStateId)) {
                    return 0;
                }
            }

            if (typeof this.currentBreakShield === "function") {
                return this.currentBreakShield();
            }

            return 0;
        }

        return 0;
    };

})();
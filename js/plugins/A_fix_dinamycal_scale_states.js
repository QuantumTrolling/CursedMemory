/*:
 * @plugindesc Состояния: динамические бонусы от параметров, HP и щита
 * @author Помощник
 *
 * @help
 * ============================================================================
 * Примеры тегов:
 * ============================================================================
 *
 * 1. Плоская прибавка (значение источника умножается на % и добавляется к параметру):
 *    <DEF Bonus from Current Shield: 10%>
 *    <MAT Bonus from DEF: 50%>
 *
 * 2. Бонус от абсолютных единиц источника:
 *    <DEF Bonus per Shield: 10%>           // +10% базовой защиты за каждую единицу щита
 *    <ATK Bonus per Missing HP: 2%>       // +2% базовой атаки за каждую единицу недостающего HP
 *
 * 3. Бонус от процентного значения источника (добавьте % после названия):
 *    <DEF Bonus per Missing HP%: -1%>     // –1% базовой защиты за каждый процент недостающего HP
 *    <MAT Bonus per Current HP%: 0.5%>    // +0.5% базовой магии за каждый процент текущего HP
 *
 * 4. Бонус от параметра другого актёра:
 *    <ATK Bonus from Actor: 3, 50%, MDF>  // +50% от маг. защиты актёра с ID 3 к атаке
 *    <DEF Bonus from Actor: 1, 100%, ATK> // +100% от атаки актёра 1 к защите
 *
 * 5. Бонус от параметра другого актёра при полном HP владельца:
 *    <LUK Bonus from Actor Full HP: 3, 50%>  // +50% от удачи актёра 3 к удаче, только если HP = MHP
 *    <ATK Bonus from Actor Full HP: 2, 30%>  // +30% от атаки актёра 2 к атаке, только если HP = MHP
 *
 * ============================================================================
 * Источники:
 * ATK, DEF, MAT, MDF, AGI, LUK, Current HP, Missing HP, Current Shield, Shield
 * (процентные версии: Current HP%, Missing HP%)
 * Для Actor-тега: параметры из PARAM_MAP (ATK, DEF, MAT, MDF, AGI, LUK)
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

            // <PARAM Bonus from SOURCE: X%>  (поддерживает % у источника)
            const regexFlat =
                /<(\w+)[ _]?BONUS[ _]?FROM[ _]?([\w ]+?)(\s*%)?\s*:\s*(-?\d+\.?\d*)\s*%?>/gi;

            let matchFlat;
            while ((matchFlat = regexFlat.exec(note)) !== null) {

                const target = matchFlat[1].toUpperCase();
                let source = matchFlat[2].toUpperCase().trim();
                const isPercent = !!matchFlat[3];
                let mult = parseFloat(matchFlat[4]);

                if (matchFlat[0].includes('%')) {
                    mult /= 100;
                }

                if (PARAM_MAP[target] !== paramId) {
                    continue;
                }

                bonusFlat += Math.floor(
                    this.getSourceValue(source, isPercent) * mult
                );
            }

            // <PARAM Bonus per SOURCE: X%>  (поддерживает % у источника)
            const regexPer =
                /<(\w+)[ _]?BONUS[ _]?PER[ _]?([\w ]+?)(\s*%)?\s*:\s*(-?\d+\.?\d*)\s*%?>/gi;

            let matchPer;
            while ((matchPer = regexPer.exec(note)) !== null) {

                const target = matchPer[1].toUpperCase();
                let source = matchPer[2].toUpperCase().trim();
                const isPercent = !!matchPer[3];
                let mult = parseFloat(matchPer[4]);

                if (matchPer[0].includes('%')) {
                    mult /= 100;
                }

                if (PARAM_MAP[target] !== paramId) {
                    continue;
                }

                bonusPercent += mult * this.getSourceValue(source, isPercent);
            }

            // <PARAM Bonus from Actor: ID, %, SOURCE>
            const regexActor =
                /<(\w+)\s+BONUS\s+FROM\s+ACTOR\s*:\s*(\d+)\s*,\s*(-?\d+\.?\d*)%\s*,\s*(\w+)\s*>/gi;

            let matchActor;
            while ((matchActor = regexActor.exec(note)) !== null) {

                const target = matchActor[1].toUpperCase();
                const actorId = Number(matchActor[2]);
                const percent = Number(matchActor[3]) / 100;
                const sourceParam = matchActor[4].toUpperCase();

                if (PARAM_MAP[target] !== paramId) {
                    continue;
                }

                const actor = $gameActors.actor(actorId);

                if (!actor) {
                    continue;
                }

                if (PARAM_MAP[sourceParam] === undefined) {
                    continue;
                }

                // Используем оригинальный param, чтобы избежать рекурсии
                const sourceValue =
                    _Game_BattlerBase_param.call(
                        actor,
                        PARAM_MAP[sourceParam]
                    );

                bonusFlat += Math.floor(sourceValue * percent);
            }

            // <STAT Bonus from Actor Full HP: actorId, X%>
            const regexActorFullHP =
                /<(\w+)\s+BONUS\s+FROM\s+ACTOR\s+FULL\s+HP\s*:\s*(\d+)\s*,\s*(-?\d+\.?\d*)%\s*>/gi;

            let matchFullHP;
            while ((matchFullHP = regexActorFullHP.exec(note)) !== null) {

                const target = matchFullHP[1].toUpperCase();
                const actorId = Number(matchFullHP[2]);
                const percent = Number(matchFullHP[3]) / 100;

                // 1. Проверяем, что запрашивается именно этот параметр
                if (PARAM_MAP[target] !== paramId) {
                    continue;
                }

                // 2. Проверяем полное здоровье (hp < mhp → не активно)
                if (this.hp < this.mhp) {
                    continue;
                }

                const actor = $gameActors.actor(actorId);
                if (!actor) continue;

                // Базовое значение того же параметра актёра-источника
                const sourceValue =
                    _Game_BattlerBase_param.call(actor, PARAM_MAP[target]);

                bonusFlat += Math.floor(sourceValue * percent);
            }
        }

        return (
            baseValue +
            Math.floor(baseValue * bonusPercent) +
            bonusFlat
        );
    };

    Game_BattlerBase.prototype.getSourceValue = function(source, isPercent) {

        // Параметры
        if (PARAM_MAP[source] !== undefined) {
            return _Game_BattlerBase_param.call(this, PARAM_MAP[source]);
        }

        // Current HP
        if (source === "CURRENT HP") {
            if (isPercent) {
                const mhp = this.mhp || 1;
                return (this.hp || 0) / mhp * 100;   // 0..100
            }
            return this.hp || 0;
        }

        // Missing HP
        if (source === "MISSING HP") {
            if (isPercent) {
                const mhp = this.mhp || 1;
                return ((this.mhp || 0) - (this.hp || 0)) / mhp * 100;   // 0..100
            }
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
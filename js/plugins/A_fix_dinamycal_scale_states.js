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
 * 6. Бонус от параметра всех союзников, имеющих определённое состояние:
 *    <ATK Bonus from Actors ATK with state 5: 50%>
 *    // +50% от суммарной атаки живых союзников, на которых есть состояние с ID 5, к атаке владельца
 *    <DEF Bonus from Actors MDF with state 8: 30%>
 *    // +30% от суммарной маг. защиты живых союзников с состоянием 8 к защите владельца
 *
 * 7. Бонус от параметра всех союзников с полным HP:
 *    <ATK Bonus from Actors ATK Full HP: 50%>
 *    // +50% от суммарной атаки всех живых союзников, у которых HP = MHP, к атаке владельца
 *    <MAT Bonus from Actors DEF Full HP: 30%>
 *    // +30% от суммарной защиты живых союзников с полным HP к магии владельца
 *
 * 8. Бонус от суммы недостающего HP всех живых союзников:
 *    <MAT Bonus from Allies Missing HP: 5%>
 *    // +5% от общей недостающей HP живых членов отряда к маг. атаке владельца
 *
 * 9. Бонус ко ВСЕМ параметрам от параметров другого актёра:
 *    <ALLSTAT Bonus from Actor: 3, 50%>
 *    // +50% от соответствующего параметра актёра 3 к каждому параметру владельца
 *    <ALLSTAT Bonus from Actor: 3, 50%, ALLSTAT>
 *    // (аналогично, с явным указанием ALLSTAT)
 *
 * ============================================================================
 * Источники:
 * ATK, DEF, MAT, MDF, AGI, LUK, Current HP, Missing HP, Current Shield, Shield,
 * ALLSTAT (для целого набора параметров)
 * (процентные версии: Current HP%, Missing HP%)
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

            // Новый тег: <STAT Bonus from Actors PARAM with state ID: X%>
            const regexActorsWithState =
                /<(\w+)\s+BONUS\s+FROM\s+ACTORS\s+(\w+)\s+WITH\s+STATE\s+(\d+)\s*:\s*(-?\d+\.?\d+)\s*%?>/gi;
            let matchActorsWithState;
            while ((matchActorsWithState = regexActorsWithState.exec(note)) !== null) {
                const target = matchActorsWithState[1].toUpperCase();
                const sourceParam = matchActorsWithState[2].toUpperCase();
                const stateId = Number(matchActorsWithState[3]);
                const percent = Number(matchActorsWithState[4]) / 100;

                if (PARAM_MAP[target] !== paramId) continue;
                if (PARAM_MAP[sourceParam] === undefined) continue;
                if (!this.friendsUnit) continue;

                const unit = this.friendsUnit();
                let sum = 0;
                for (const member of unit.members()) {
                    if (member.hp > 0 && member.isStateAffected(stateId)) {
                        sum += _Game_BattlerBase_param.call(member, PARAM_MAP[sourceParam]);
                    }
                }
                bonusFlat += Math.floor(sum * percent);
            }

            // Новый тег: <STAT Bonus from Actors PARAM Full HP: X%>
            const regexActorsFullHP =
                /<(\w+)\s+BONUS\s+FROM\s+ACTORS\s+(\w+)\s+FULL\s+HP\s*:\s*(-?\d+\.?\d+)\s*%?>/gi;
            let matchActorsFullHP;
            while ((matchActorsFullHP = regexActorsFullHP.exec(note)) !== null) {
                const target = matchActorsFullHP[1].toUpperCase();
                const sourceParam = matchActorsFullHP[2].toUpperCase();
                const percent = Number(matchActorsFullHP[3]) / 100;

                if (PARAM_MAP[target] !== paramId) continue;
                if (PARAM_MAP[sourceParam] === undefined) continue;
                if (!this.friendsUnit) continue;

                const unit = this.friendsUnit();
                let sum = 0;
                for (const member of unit.members()) {
                    // Живой союзник с полным HP (hp >= mhp)
                    if (member.hp > 0 && member.hp >= member.mhp) {
                        sum += _Game_BattlerBase_param.call(member, PARAM_MAP[sourceParam]);
                    }
                }
                bonusFlat += Math.floor(sum * percent);
            }

            // НОВЫЙ ТЕГ: <STAT Bonus from Allies Missing HP: X%>
            const regexAlliesMissingHP =
                /<(\w+)\s+BONUS\s+FROM\s+ALLIES\s+MISSING\s+HP\s*:\s*(-?\d+\.?\d*)\s*%>/gi;
            let matchAlliesMissingHP;
            while ((matchAlliesMissingHP = regexAlliesMissingHP.exec(note)) !== null) {
                const target = matchAlliesMissingHP[1].toUpperCase();
                const percent = parseFloat(matchAlliesMissingHP[2]) / 100;

                if (PARAM_MAP[target] !== paramId) continue;
                if (!this.friendsUnit) continue;

                const unit = this.friendsUnit();
                let totalMissing = 0;
                for (const member of unit.members()) {
                    if (member.hp > 0) {
                        totalMissing += (member.mhp - member.hp);
                    }
                }
                bonusFlat += Math.floor(totalMissing * percent);
            }

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

                // EDIT: Бонусы, основанные на щите, не применяются, если цель поражена состоянием 157
                if ((source === "SHIELD" || source === "CURRENT SHIELD") && this.isStateAffected(157)) {
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

                // EDIT: Бонусы, основанные на щите, не применяются, если цель поражена состоянием 157
                if ((source === "SHIELD" || source === "CURRENT SHIELD") && this.isStateAffected(157)) {
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

                const sourceValue =
                    _Game_BattlerBase_param.call(actor, PARAM_MAP[sourceParam]);
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

                if (PARAM_MAP[target] !== paramId) {
                    continue;
                }

                if (this.hp < this.mhp) {
                    continue;
                }

                const actor = $gameActors.actor(actorId);
                if (!actor) continue;

                const sourceValue =
                    _Game_BattlerBase_param.call(actor, PARAM_MAP[target]);
                bonusFlat += Math.floor(sourceValue * percent);
            }

            // <TARGET Bonus from SOURCE Full HP: X%>
            const regexSelfStatFullHP =
                /<(\w+)\s+BONUS\s+FROM\s+(\w+)\s+FULL\s+HP\s*:\s*(-?\d+\.?\d*)%\s*>/gi;
            let matchSelfFullHP;
            while ((matchSelfFullHP = regexSelfStatFullHP.exec(note)) !== null) {
                const target = matchSelfFullHP[1].toUpperCase();
                const source = matchSelfFullHP[2].toUpperCase();
                const percent = Number(matchSelfFullHP[3]) / 100;

                if (PARAM_MAP[target] !== paramId) continue;
                if (PARAM_MAP[source] === undefined) continue;
                if (this.hp < this.mhp) continue;   // только при полном HP

                const sourceValue = _Game_BattlerBase_param.call(this, PARAM_MAP[source]);
                bonusFlat += Math.floor(sourceValue * percent);
            }

            // ===== НОВЫЙ ТЕГ: <ALLSTAT Bonus from Actor: ID, X%> =====
            // Применяет процент от каждого параметра актёра ID к такому же параметру цели
            const regexAllstatActor =
                /<ALLSTAT\s+BONUS\s+FROM\s+ACTOR\s*:\s*(\d+)\s*,\s*(-?\d+\.?\d*)%\s*(?:,\s*ALLSTAT\s*)?>/gi;
            let matchAllstat;
            while ((matchAllstat = regexAllstatActor.exec(note)) !== null) {
                const actorId = Number(matchAllstat[1]);
                const percent = Number(matchAllstat[2]) / 100;

                const actor = $gameActors.actor(actorId);
                if (!actor) continue;

                // Берём значение того же параметра (paramId) у актёра
                const sourceValue = _Game_BattlerBase_param.call(actor, paramId);
                bonusFlat += Math.floor(sourceValue * percent);
            }
            // ===========================================================
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

        // Добавить в getSourceValue, после блока MISSING HP
        if (source === "CURRENT MP") {
            if (isPercent) {
                const mmp = this.mmp || 1;
                return (this.mp || 0) / mmp * 100;   // 0..100
            }
            return this.mp || 0;
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
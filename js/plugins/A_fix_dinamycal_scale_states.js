/*:
 * @plugindesc Состояния: динамические бонусы от параметров, HP и щита
 * @author Помощник
 *
 * @help
 * ============================================================================
 * Теги (примеры):
 *  1. <DEF Bonus from Current Shield: 10%>
 *     <MAT Bonus from DEF: 50%>
 *  2. <DEF Bonus per Shield: 10%>
 *     <ATK Bonus per Missing HP: 2%>
 *  3. <DEF Bonus per Missing HP%: -1%>
 *     <MAT Bonus per Current HP%: 0.5%>
 *  4. <ATK Bonus from Actor: 3, 50%, MDF>
 *     <DEF Bonus from Actor: 1, 100%, ATK>
 *  5. <LUK Bonus from Actor Full HP: 3, 50%>
 *  6. <ATK Bonus from Actors ATK with state 5: 50%>
 *     <DEF Bonus from Actors MDF with state 8: 30%>
 *  7. <ATK Bonus from Actors ATK Full HP: 50%>
 *  8. <MAT Bonus from Allies Missing HP: 5%>
 *  9. <ALLSTAT Bonus from Actor: 3, 50%>
 * 10. <MDF Bonus from Actors Missing HP with state 292: 50%>
 *     <MDF Bonus from Actors Current HP with state 292: 25%>
 *     <MDF Bonus from Actors Missing HP% with state 292: 50%>
 *     <MDF Bonus from Actors Current HP% with state 292: 30%>
 * 11. <ATK Bonus per Actors Current HP% with state 310: 1%>
 * 12. <MDF Bonus from Ally Min HP: 5%>
 *
 * Источники: ATK, DEF, MAT, MDF, AGI, LUK, Current HP, Missing HP,
 * Current MP, Current Shield, Shield, ALLSTAT
 * Процентные: Current HP%, Missing HP%
 * ============================================================================
 */

(function() {

    const PARAM_MAP = {
        MHP: 0, MMP: 1, ATK: 2, DEF: 3, MAT: 4, MDF: 5, AGI: 6, LUK: 7
    };

    const _Game_BattlerBase_param = Game_BattlerBase.prototype.param;

    const STANDARD_FORMULA =
        /^\s*\(\s*base\s*\+\s*plus\s*\)\s*\*\s*paramRate\s*\*\s*buffRate\s*\+\s*flat\s*$/;

    // =========================================================================
    // Безопасные хелперы
    // =========================================================================
    function safeGetActor(actorId) {
        if (typeof $gameActors === 'undefined' || !$gameActors._data) return null;
        return $gameActors._data[actorId] || null;
    }

    function safePartyMembers() {
        if (typeof $gameParty === 'undefined' || typeof $gameActors === 'undefined') return [];
        if (!$gameParty._actors || !$gameActors._data) return [];
        const result = [];
        const ids = $gameParty._actors;
        for (let i = 0; i < ids.length; i++) {
            const actor = $gameActors._data[ids[i]];
            if (actor) result.push(actor);
        }
        return result;
    }

    function safeMembers(unit) {
        if (!unit) return [];
        if (typeof $gameParty !== 'undefined' && unit === $gameParty) return safePartyMembers();
        try { return unit.members() || []; } catch (e) { return []; }
    }

    // Актёр «готов», если $gameActors._data[actorId] уже существует.
    // Верно и для боевого актёра, и для JsonEx-клона (превью экипировки).
    function isReady(battler) {
        if (!battler._states) return false;
        if (!battler.isActor || !battler.isActor()) return true;
        if (!battler._actorId) return false;
        if (typeof $gameActors === 'undefined' || !$gameActors._data) return false;
        return !!$gameActors._data[battler._actorId];
    }

    function computeBaseValue(battler, paramId) {
        let useManual = false;
        if (typeof Yanfly !== 'undefined' && Yanfly.Param && Yanfly.Param.BPCFormula) {
            const f = String(Yanfly.Param.BPCFormula[paramId] || '');
            if (STANDARD_FORMULA.test(f)) useManual = true;
        }
        if (useManual) {
            try {
                const base = battler.paramBase(paramId);
                const plus = battler.paramPlus(paramId);
                const rate = battler.paramRate(paramId);
                const buff = battler.paramBuffRate(paramId);
                const flat = battler.paramFlat ? battler.paramFlat(paramId) : 0;
                const minV = battler.paramMin ? battler.paramMin(paramId) : 1;
                const maxV = Math.max(minV, battler.paramMax ? battler.paramMax(paramId) : 999999);
                const raw = (base + plus) * rate * buff + flat;
                return Math.round(Math.min(Math.max(raw, minV), maxV));
            } catch (e) { /* fallthrough */ }
        }
        return _Game_BattlerBase_param.call(battler, paramId);
    }

    // =========================================================================
    // Основная функция
    // =========================================================================
    Game_BattlerBase.prototype.param = function(paramId) {
        if (!this._paramCalcSet) this._paramCalcSet = {};
        if (this._paramCalcSet[paramId]) {
            return (this._paramPlus && this._paramPlus[paramId]) || 0;
        }
        this._paramCalcSet[paramId] = true;

        try {
            let baseValue = 0;
            try {
                baseValue = computeBaseValue(this, paramId);
            } catch (e) {
                try { baseValue = this.paramBase(paramId) || 0; } catch (e2) { baseValue = 0; }
            }

            if (!isReady(this)) return baseValue;

            // ===== Аура =====
            let auraBonusPercent = 0;
            try {
                if (this.friendsUnit) {
                    const members = safeMembers(this.friendsUnit());
                    for (let m = 0; m < members.length; m++) {
                        const member = members[m];
                        if (!member || member === this) continue;
                        if (typeof member._hp !== 'number' || member._hp <= 0) continue;
                        let mStates;
                        try { mStates = member.states(); } catch (e) { continue; }
                        if (!mStates) continue;
                        for (let j = 0; j < mStates.length; j++) {
                            const state = mStates[j];
                            if (!state || !state.note) continue;
                            const regexAuraTP = /<(\w+)\s+BONUS\s+FROM\s+AURA\s+TP\s*:\s*(\d+)\s*,\s*(-?\d+\.?\d*)\s*%?>/gi;
                            let matchAura;
                            while ((matchAura = regexAuraTP.exec(state.note)) !== null) {
                                const target = matchAura[1].toUpperCase();
                                const tpStep = Number(matchAura[2]);
                                const percent = Number(matchAura[3]) / 100;
                                if ((PARAM_MAP[target] === paramId || target === "ALLSTAT") && tpStep > 0) {
                                    auraBonusPercent += Math.floor((member._tp || 0) / tpStep) * percent;
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                console.error("Ошибка при расчете ауры:", e);
            }

            const states = this.states();
            let bonusFlat = 0;
            let bonusPercent = 0;

            for (let i = 0; i < states.length; i++) {
                const note = states[i].note || "";

                // <STAT Bonus from Actors PARAM with state ID: X%>
                {
                    const regex = /<(\w+)\s+BONUS\s+FROM\s+ACTORS\s+(\w+)\s+WITH\s+STATE\s+(\d+)\s*:\s*(-?\d+\.?\d*)\s*%?>/gi;
                    let m;
                    while ((m = regex.exec(note)) !== null) {
                        const target = m[1].toUpperCase();
                        const sourceParam = m[2].toUpperCase();
                        const stateId = Number(m[3]);
                        const percent = Number(m[4]) / 100;
                        if (PARAM_MAP[target] !== paramId) continue;
                        if (PARAM_MAP[sourceParam] === undefined) continue;
                        if (!this.friendsUnit) continue;
                        const members = safeMembers(this.friendsUnit());
                        let sum = 0;
                        for (let k = 0; k < members.length; k++) {
                            const mm = members[k];
                            if (!mm || typeof mm._hp !== 'number' || mm._hp <= 0) continue;
                            if (mm.isStateAffected(stateId)) {
                                sum += _Game_BattlerBase_param.call(mm, PARAM_MAP[sourceParam]);
                            }
                        }
                        bonusFlat += Math.floor(sum * percent);
                    }
                }

                // <STAT Bonus from Actors Missing HP with state ID: X%>
                {
                    const regex = /<(\w+)\s+BONUS\s+FROM\s+ACTORS\s+MISSING\s+HP\s+WITH\s+STATE\s+(\d+)\s*:\s*(-?\d+\.?\d*)\s*%?>/gi;
                    let m;
                    while ((m = regex.exec(note)) !== null) {
                        const target = m[1].toUpperCase();
                        const stateId = Number(m[2]);
                        const percent = Number(m[3]) / 100;
                        if (PARAM_MAP[target] !== paramId) continue;
                        if (!this.friendsUnit) continue;
                        const members = safeMembers(this.friendsUnit());
                        let sum = 0;
                        for (let k = 0; k < members.length; k++) {
                            const mm = members[k];
                            if (!mm || typeof mm._hp !== 'number' || mm._hp <= 0) continue;
                            if (mm.isStateAffected(stateId)) {
                                sum += Math.max(0, (mm.mhp || 0) - mm._hp);
                            }
                        }
                        bonusFlat += Math.floor(sum * percent);
                    }
                }

                // <STAT Bonus from Actors Current HP with state ID: X%>
                {
                    const regex = /<(\w+)\s+BONUS\s+FROM\s+ACTORS\s+CURRENT\s+HP\s+WITH\s+STATE\s+(\d+)\s*:\s*(-?\d+\.?\d*)\s*%?>/gi;
                    let m;
                    while ((m = regex.exec(note)) !== null) {
                        const target = m[1].toUpperCase();
                        const stateId = Number(m[2]);
                        const percent = Number(m[3]) / 100;
                        if (PARAM_MAP[target] !== paramId) continue;
                        if (!this.friendsUnit) continue;
                        const members = safeMembers(this.friendsUnit());
                        let sum = 0;
                        for (let k = 0; k < members.length; k++) {
                            const mm = members[k];
                            if (!mm || typeof mm._hp !== 'number' || mm._hp <= 0) continue;
                            if (mm.isStateAffected(stateId)) sum += mm._hp;
                        }
                        bonusFlat += Math.floor(sum * percent);
                    }
                }

                // <STAT Bonus from Actors Missing HP% with state ID: X%>
                {
                    const regex = /<(\w+)\s+BONUS\s+FROM\s+ACTORS\s+MISSING\s+HP\s*%\s+WITH\s+STATE\s+(\d+)\s*:\s*(-?\d+\.?\d*)\s*%?>/gi;
                    let m;
                    while ((m = regex.exec(note)) !== null) {
                        const target = m[1].toUpperCase();
                        const stateId = Number(m[2]);
                        const percent = Number(m[3]) / 100;
                        if (PARAM_MAP[target] !== paramId) continue;
                        if (!this.friendsUnit) continue;
                        const members = safeMembers(this.friendsUnit());
                        let sum = 0;
                        for (let k = 0; k < members.length; k++) {
                            const mm = members[k];
                            if (!mm || typeof mm._hp !== 'number' || mm._hp <= 0) continue;
                            if (mm.isStateAffected(stateId)) {
                                const mhp = mm.mhp || 1;
                                sum += Math.max(0, mhp - mm._hp) / mhp * 100;
                            }
                        }
                        bonusFlat += Math.floor(sum * percent);
                    }
                }

                // <STAT Bonus from Actors Current HP% with state ID: X%>
                {
                    const regex = /<(\w+)\s+BONUS\s+FROM\s+ACTORS\s+CURRENT\s+HP\s*%\s+WITH\s+STATE\s+(\d+)\s*:\s*(-?\d+\.?\d*)\s*%?>/gi;
                    let m;
                    while ((m = regex.exec(note)) !== null) {
                        const target = m[1].toUpperCase();
                        const stateId = Number(m[2]);
                        const percent = Number(m[3]) / 100;
                        if (PARAM_MAP[target] !== paramId) continue;
                        if (!this.friendsUnit) continue;
                        const members = safeMembers(this.friendsUnit());
                        let sum = 0;
                        for (let k = 0; k < members.length; k++) {
                            const mm = members[k];
                            if (!mm || typeof mm._hp !== 'number' || mm._hp <= 0) continue;
                            if (mm.isStateAffected(stateId)) {
                                const mhp = mm.mhp || 1;
                                sum += mm._hp / mhp * 100;
                            }
                        }
                        bonusFlat += Math.floor(sum * percent);
                    }
                }

                // <STAT Bonus from Ally Min HP: X%>
                {
                    const regex = /<(\w+)\s+BONUS\s+FROM\s+ALLY\s+MIN\s+HP\s*:\s*(-?\d+\.?\d*)\s*%?>/gi;
                    let m;
                    while ((m = regex.exec(note)) !== null) {
                        const target = m[1].toUpperCase();
                        const percent = Number(m[2]) / 100;
                        if (PARAM_MAP[target] !== paramId) continue;
                        if (!this.friendsUnit) continue;
                        const members = safeMembers(this.friendsUnit());
                        let minHp = Infinity;
                        for (let k = 0; k < members.length; k++) {
                            const mm = members[k];
                            if (!mm || typeof mm._hp !== 'number' || mm._hp <= 0) continue;
                            if (mm._hp < minHp) minHp = mm._hp;
                        }
                        if (minHp === Infinity) minHp = 0;
                        bonusFlat += Math.floor(minHp * percent);
                    }
                }

                // <STAT Bonus per Actors Current HP% with state ID: X%>
                {
                    const regex = /<(\w+)\s+BONUS\s+PER\s+ACTORS\s+CURRENT\s+HP\s*%\s+WITH\s+STATE\s+(\d+)\s*:\s*(-?\d+\.?\d*)\s*%?>/gi;
                    let m;
                    while ((m = regex.exec(note)) !== null) {
                        const target = m[1].toUpperCase();
                        const stateId = Number(m[2]);
                        const percent = Number(m[3]) / 100;
                        if (PARAM_MAP[target] !== paramId) continue;
                        if (!this.friendsUnit) continue;
                        const members = safeMembers(this.friendsUnit());
                        let sum = 0;
                        for (let k = 0; k < members.length; k++) {
                            const mm = members[k];
                            if (!mm || typeof mm._hp !== 'number' || mm._hp <= 0) continue;
                            if (mm.isStateAffected(stateId)) {
                                const mhp = mm.mhp || 1;
                                sum += mm._hp / mhp * 100;
                            }
                        }
                        bonusPercent += sum * percent;
                    }
                }

                // <STAT Bonus from Actors PARAM Full HP: X%>
                {
                    const regex = /<(\w+)\s+BONUS\s+FROM\s+ACTORS\s+(\w+)\s+FULL\s+HP\s*:\s*(-?\d+\.?\d*)\s*%?>/gi;
                    let m;
                    while ((m = regex.exec(note)) !== null) {
                        const target = m[1].toUpperCase();
                        const sourceParam = m[2].toUpperCase();
                        const percent = Number(m[3]) / 100;
                        if (PARAM_MAP[target] !== paramId) continue;
                        if (PARAM_MAP[sourceParam] === undefined) continue;
                        if (!this.friendsUnit) continue;
                        const members = safeMembers(this.friendsUnit());
                        let sum = 0;
                        for (let k = 0; k < members.length; k++) {
                            const mm = members[k];
                            if (!mm || typeof mm._hp !== 'number' || mm._hp <= 0) continue;
                            const mhp = mm.mhp || 0;
                            if (mm._hp >= mhp) {
                                sum += _Game_BattlerBase_param.call(mm, PARAM_MAP[sourceParam]);
                            }
                        }
                        bonusFlat += Math.floor(sum * percent);
                    }
                }

                // <STAT Bonus from Allies Missing HP: X%>
                {
                    const regex = /<(\w+)\s+BONUS\s+FROM\s+ALLIES\s+MISSING\s+HP\s*:\s*(-?\d+\.?\d*)\s*%>/gi;
                    let m;
                    while ((m = regex.exec(note)) !== null) {
                        const target = m[1].toUpperCase();
                        const percent = parseFloat(m[2]) / 100;
                        if (PARAM_MAP[target] !== paramId) continue;
                        if (!this.friendsUnit) continue;
                        const members = safeMembers(this.friendsUnit());
                        let totalMissing = 0;
                        for (let k = 0; k < members.length; k++) {
                            const mm = members[k];
                            if (!mm || typeof mm._hp !== 'number' || mm._hp <= 0) continue;
                            totalMissing += Math.max(0, (mm.mhp || 0) - mm._hp);
                        }
                        bonusFlat += Math.floor(totalMissing * percent);
                    }
                }

                // <PARAM Bonus from SOURCE: X%>
                {
                    const regex = /<(\w+)[ _]?BONUS[ _]?FROM[ _]?([\w ]+?)(\s*%)?\s*:\s*(-?\d+\.?\d*)\s*%?>/gi;
                    let m;
                    while ((m = regex.exec(note)) !== null) {
                        const target = m[1].toUpperCase();
                        const source = m[2].toUpperCase().trim();
                        const isPercent = !!m[3];
                        let mult = parseFloat(m[4]);
                        if (m[0].includes('%')) mult /= 100;
                        if (PARAM_MAP[target] !== paramId) continue;
                        if ((source === "SHIELD" || source === "CURRENT SHIELD") && this.isStateAffected(157)) continue;
                        if (source === "ALLY MIN HP") continue;
                        bonusFlat += Math.floor(this.getSourceValue(source, isPercent) * mult);
                    }
                }

                // <PARAM Bonus per SOURCE: X%>
                {
                    const regex = /<(\w+)[ _]?BONUS[ _]?PER[ _]?([\w ]+?)(\s*%)?\s*:\s*(-?\d+\.?\d*)\s*%?>/gi;
                    let m;
                    while ((m = regex.exec(note)) !== null) {
                        const target = m[1].toUpperCase();
                        const source = m[2].toUpperCase().trim();
                        const isPercent = !!m[3];
                        let mult = parseFloat(m[4]);
                        if (m[0].includes('%')) mult /= 100;
                        if (PARAM_MAP[target] !== paramId) continue;
                        if ((source === "SHIELD" || source === "CURRENT SHIELD") && this.isStateAffected(157)) continue;
                        bonusPercent += mult * this.getSourceValue(source, isPercent);
                    }
                }

                // <PARAM Bonus from Actor: ID, %, SOURCE>
                {
                    const regex = /<(\w+)\s+BONUS\s+FROM\s+ACTOR\s*:\s*(\d+)\s*,\s*(-?\d+\.?\d*)%\s*,\s*(\w+)\s*>/gi;
                    let m;
                    while ((m = regex.exec(note)) !== null) {
                        const target = m[1].toUpperCase();
                        const actorId = Number(m[2]);
                        const percent = Number(m[3]) / 100;
                        const sourceParam = m[4].toUpperCase();
                        if (PARAM_MAP[target] !== paramId) continue;
                        const actor = safeGetActor(actorId);
                        if (!actor) continue;
                        if (PARAM_MAP[sourceParam] === undefined) continue;
                        const sourceValue = _Game_BattlerBase_param.call(actor, PARAM_MAP[sourceParam]);
                        bonusFlat += Math.floor(sourceValue * percent);
                    }
                }

                // <STAT Bonus from Actor Full HP: actorId, X%>
                {
                    const regex = /<(\w+)\s+BONUS\s+FROM\s+ACTOR\s+FULL\s+HP\s*:\s*(\d+)\s*,\s*(-?\d+\.?\d*)%\s*>/gi;
                    let m;
                    while ((m = regex.exec(note)) !== null) {
                        const target = m[1].toUpperCase();
                        const actorId = Number(m[2]);
                        const percent = Number(m[3]) / 100;
                        if (PARAM_MAP[target] !== paramId) continue;
                        if (this._hp < this.mhp) continue;
                        const actor = safeGetActor(actorId);
                        if (!actor) continue;
                        const sourceValue = _Game_BattlerBase_param.call(actor, PARAM_MAP[target]);
                        bonusFlat += Math.floor(sourceValue * percent);
                    }
                }

                // <TARGET Bonus from SOURCE Full HP: X%>
                {
                    const regex = /<(\w+)\s+BONUS\s+FROM\s+(\w+)\s+FULL\s+HP\s*:\s*(-?\d+\.?\d*)%\s*>/gi;
                    let m;
                    while ((m = regex.exec(note)) !== null) {
                        const target = m[1].toUpperCase();
                        const source = m[2].toUpperCase();
                        const percent = Number(m[3]) / 100;
                        if (PARAM_MAP[target] !== paramId) continue;
                        if (PARAM_MAP[source] === undefined) continue;
                        if (this._hp < this.mhp) continue;
                        const sourceValue = _Game_BattlerBase_param.call(this, PARAM_MAP[source]);
                        bonusFlat += Math.floor(sourceValue * percent);
                    }
                }

                // <ALLSTAT Bonus from Actor: ID, X%>
                {
                    const regex = /<ALLSTAT\s+BONUS\s+FROM\s+ACTOR\s*:\s*(\d+)\s*,\s*(-?\d+\.?\d*)%\s*(?:,\s*ALLSTAT\s*)?>/gi;
                    let m;
                    while ((m = regex.exec(note)) !== null) {
                        const actorId = Number(m[1]);
                        const percent = Number(m[2]) / 100;
                        const actor = safeGetActor(actorId);
                        if (!actor) continue;
                        const sourceValue = _Game_BattlerBase_param.call(actor, paramId);
                        bonusFlat += Math.floor(sourceValue * percent);
                    }
                }
            }

            return (
                baseValue +
                Math.floor(baseValue * bonusPercent) +
                Math.floor(baseValue * auraBonusPercent) +
                bonusFlat
            );
        } finally {
            this._paramCalcSet[paramId] = false;
        }
    };

    Game_BattlerBase.prototype.getSourceValue = function(source, isPercent) {
        if (PARAM_MAP[source] !== undefined) {
            return _Game_BattlerBase_param.call(this, PARAM_MAP[source]);
        }

        if (source === "CURRENT HP") {
            if (isPercent) {
                const mhp = this.mhp || 1;
                return (this._hp || 0) / mhp * 100;
            }
            return this._hp || 0;
        }

        if (source === "MISSING HP") {
            const mhp = this.mhp || 0;
            const missing = Math.max(0, mhp - (this._hp || 0));
            if (isPercent) return mhp > 0 ? missing / mhp * 100 : 0;
            return missing;
        }

        if (source === "CURRENT MP") {
            if (isPercent) {
                const mmp = this.mmp || 1;
                return (this._mp || 0) / mmp * 100;
            }
            return this._mp || 0;
        }

        if (source === "CURRENT SHIELD" || source === "SHIELD") {
            if (typeof this.isStateAffected === "function") {
                const breakStateId =
                    Olivia && Olivia.OctoBattle && Olivia.OctoBattle.BreakShield ?
                    Olivia.OctoBattle.BreakShield.StunStateId : 4;
                if (this.isStateAffected(breakStateId)) return 0;
            }
            if (typeof this.currentBreakShield === "function") {
                return this.currentBreakShield();
            }
            return 0;
        }

        return 0;
    };

    // =========================================================================
    // ФИКС ПРЕВЬЮ В SCENE_EQUIP
    // =========================================================================
    // Hook Window_EquipStatus.setTempActor — универсальный, работает с любой
    // MV-версией (cloneForEquip, makeTempActor, JsonEx deep copy и т.п.).
    // Принудительно вызываем refresh() на временном актёре, чтобы
    // YEP_AutoPassiveStates навесил пассивные состояния от новой экипировки.

    if (typeof Window_EquipStatus !== 'undefined' && Window_EquipStatus.prototype.setTempActor) {
        const _setTempActor = Window_EquipStatus.prototype.setTempActor;
        Window_EquipStatus.prototype.setTempActor = function(tempActor) {
            if (tempActor && tempActor !== this._tempActor) {
                try {
                    tempActor._paramCalcSet = {};
                    tempActor._baseParamCache = undefined;
                    if (typeof tempActor.refresh === 'function') {
                        tempActor.refresh();
                    }
                } catch (e) {
                    console.warn('[DynamicScaleStates] tempActor.refresh() failed:', e);
                }
            }
            _setTempActor.call(this, tempActor);
        };
    }

    // Дополнительная страховка: если какой-то плагин всё-таки вызывает
    // cloneForEquip — патчим и его (без вреда, если метода нет).
    if (Game_Actor.prototype.cloneForEquip) {
        const _cloneForEquip = Game_Actor.prototype.cloneForEquip;
        Game_Actor.prototype.cloneForEquip = function(slotId, item) {
            const actor = _cloneForEquip.call(this, slotId, item);
            actor._paramCalcSet = {};
            actor._baseParamCache = undefined;
            try { actor.refresh(); } catch (e) { /* ignore */ }
            return actor;
        };
    }

    // Дополнительная страховка: патчим Scene_Equip.makeTempActor, если он есть
    // (характерно для MV 1.6.x).
    if (typeof Scene_Equip !== 'undefined' && Scene_Equip.prototype.makeTempActor) {
        const _makeTempActor = Scene_Equip.prototype.makeTempActor;
        Scene_Equip.prototype.makeTempActor = function() {
            const actor = _makeTempActor.call(this);
            if (actor) {
                try {
                    actor._paramCalcSet = {};
                    actor._baseParamCache = undefined;
                    if (typeof actor.refresh === 'function') actor.refresh();
                } catch (e) { /* ignore */ }
            }
            return actor;
        };
    }

})();
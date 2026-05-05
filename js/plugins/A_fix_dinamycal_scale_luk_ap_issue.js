/*:
 * @plugindesc Состояние: LUK Bonus from Missing MP (с фиксацией на ход)
 * @author Исправлено для YEP_BaseParamControl
 * @help 
 * Тег состояния: <LUK Bonus from Missing MP: 30%>
 * 
 * Бонус = (макс.MP - тек.MP) * множитель
 * - В течение своего хода персонажа — бонус фиксируется по состоянию MP в начале хода.
 * - В остальное время — динамический.
 * 
 * Требования: плагин должен быть ниже YEP_BaseParamControl.
 */

(function() {

    // ---- Вспомогательная функция: сброс кеша параметров у battler ----
    function refreshBattlerCache(battler) {
        if (battler && battler.refresh) battler.refresh();
        // Дополнительно сбрасываем внутренний кеш YEP_BaseParamControl
        if (battler && battler._baseParamCache) {
            battler._baseParamCache = [];
        }
    }

    // ---- Фиксация бонуса на время хода ----
    var _Game_Battler_onTurnStart = Game_Battler.prototype.onTurnStart;
    Game_Battler.prototype.onTurnStart = function() {
        _Game_Battler_onTurnStart.call(this);
        // Проверяем, есть ли у этого battler состояние с нужным тегом
        var hasTag = false;
        if (this.states) {
            for (var i = 0; i < this.states().length; i++) {
                if (this.states()[i].note.match(/<LUK[ _]?BONUS[ _]?FROM[ _]?MISSING[ _]?MP:/i)) {
                    hasTag = true;
                    break;
                }
            }
        }
        if (hasTag) {
            this._fixedMissingMp = Math.max(0, this.mmp - this.mp);
            $gameTemp = $gameTemp || {};
            $gameTemp._turnLockedBattler = this;
            // Сбрасываем кеш параметров, чтобы LUK пересчитался с новым бонусом
            refreshBattlerCache(this);
        }
    };

    var _Game_Battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
    Game_Battler.prototype.onTurnEnd = function() {
        _Game_Battler_onTurnEnd.call(this);
        if ($gameTemp && $gameTemp._turnLockedBattler === this) {
            delete this._fixedMissingMp;
            $gameTemp._turnLockedBattler = null;
            refreshBattlerCache(this);
        }
    };

    // ---- Перехват изменения MP (для динамического обновления вне хода) ----
    var _Game_Battler_gainMp = Game_Battler.prototype.gainMp;
    Game_Battler.prototype.gainMp = function(value) {
        var oldMp = this.mp;
        _Game_Battler_gainMp.call(this, value);
        if (oldMp !== this.mp) {
            // Вне хода бонус должен пересчитаться
            if (!$gameTemp || $gameTemp._turnLockedBattler !== this) {
                refreshBattlerCache(this);
            }
        }
    };

    var _Game_Battler_setMp = Game_Battler.prototype.setMp;
    Game_Battler.prototype.setMp = function(mp) {
        var oldMp = this.mp;
        _Game_Battler_setMp.call(this, mp);
        if (oldMp !== this.mp) {
            if (!$gameTemp || $gameTemp._turnLockedBattler !== this) {
                refreshBattlerCache(this);
            }
        }
    };

    // ---- Перехват изменения maxMP ----
    var _Game_Battler_setMmp = Game_Battler.prototype.setMmp;
    Game_Battler.prototype.setMmp = function(mmp) {
        var oldMmp = this.mmp;
        _Game_Battler_setMmp.call(this, mmp);
        if (oldMmp !== mmp) {
            if (!$gameTemp || $gameTemp._turnLockedBattler !== this) {
                refreshBattlerCache(this);
            }
        }
    };

    // ---- Добавление бонуса к LUK ----
    var _param = Game_BattlerBase.prototype.param;
    Game_BattlerBase.prototype.param = function(paramId) {
        var value = _param.call(this, paramId);
        if (paramId === 7 && this.states) { // LUK = 7
            var totalBonus = 0;
            var states = this.states();
            for (var i = 0; i < states.length; i++) {
                var note = states[i].note;
                var match = note.match(/<LUK[ _]?BONUS[ _]?FROM[ _]?MISSING[ _]?MP:[ _]?(\d+\.?\d*)\s*%?>/i);
                if (match) {
                    var mult = parseFloat(match[1]);
                    if (match[0].includes('%')) mult /= 100;

                    var missing;
                    // Если сейчас ход этого battler и есть сохранённое значение – используем его
                    if ($gameTemp && $gameTemp._turnLockedBattler === this && this._fixedMissingMp !== undefined) {
                        missing = this._fixedMissingMp;
                    } else {
                        missing = Math.max(0, this.mmp - this.mp);
                    }
                    totalBonus += Math.floor(missing * mult);
                }
            }
            value += totalBonus;
        }
        return value;
    };

})();
/*:
 * @plugindesc v1.2 State On Heal Trigger (YEP Compatible)
 * @author ChatGPT
 *
 * @help
 * ============================================================================
 * Нотетег состояния
 * ============================================================================
 *
 * <On Heal>
 * user.addState(239);
 * </On Heal>
 *
 * Выполняется каждый раз, когда владелец состояния получает лечение.
 *
 * ============================================================================
 * Доступные переменные
 * ============================================================================
 *
 * user      - владелец состояния
 * healValue - фактически восстановленное HP
 * stateId   - ID текущего состояния
 * state     - объект состояния
 *
 * ============================================================================
 * Отладка
 * ============================================================================
 *
 * F8 -> Console
 *
 */

(function() {

"use strict";

var DEBUG = true;

function log() {
    if (!DEBUG) return;
    console.log.apply(console, arguments);
}

//=============================================================================
// DataManager
//=============================================================================

const _DM_isDatabaseLoaded = DataManager.isDatabaseLoaded;

DataManager.isDatabaseLoaded = function() {

    if (!_DM_isDatabaseLoaded.call(this)) {
        return false;
    }

    if (!this._OnHealLoaded) {

        this.processOnHealNotetags();
        this._OnHealLoaded = true;

    }

    return true;
};

DataManager.processOnHealNotetags = function() {

    log("[OnHeal] Parsing state notetags...");

    for (var i = 1; i < $dataStates.length; i++) {

        var state = $dataStates[i];

        if (!state) continue;

        state._onHealCode = null;

        var notedata = state.note || "";

        var match = notedata.match(
            /<On Heal>([\s\S]*?)<\/On Heal>/im
        );

        if (match) {

            state._onHealCode = match[1].trim();

            log(
                "[OnHeal] Found tag in State",
                state.id,
                state.name
            );
        }
    }
};

//=============================================================================
// gainHp Hook
//=============================================================================

const _Game_Battler_gainHp =
    Game_Battler.prototype.gainHp;

Game_Battler.prototype.gainHp = function(value) {

    var beforeHp = this.hp;

    _Game_Battler_gainHp.call(this, value);

    var afterHp = this.hp;
    var healValue = afterHp - beforeHp;

    var battlerName =
        this.name ? this.name() : "Unknown";

    log("========================================");
    log("[OnHeal] gainHp()");
    log("[OnHeal] Battler:", battlerName);
    log("[OnHeal] Incoming:", value);
    log("[OnHeal] Before:", beforeHp);
    log("[OnHeal] After :", afterHp);
    log("[OnHeal] Delta :", healValue);

    if (healValue <= 0) {

        log("[OnHeal] Not healing.");
        return;
    }

    var user = this;
    var states = this.states();

    log(
        "[OnHeal] Active States:",
        states.map(function(s) {
            return s.id + ":" + s.name;
        })
    );

    for (var i = 0; i < states.length; i++) {

        var state = states[i];

        log("----------------------------------------");
        log(
            "[OnHeal] Checking State",
            state.id,
            state.name
        );

        if (!state._onHealCode) {

            log("[OnHeal] No tag.");
            continue;
        }

        var stateId = state.id;

        log("[OnHeal] Tag found.");
        log("[OnHeal] Executing:");
        log(state._onHealCode);

        try {

            eval(state._onHealCode);

            log(
                "[OnHeal] Success State",
                stateId
            );

        } catch (e) {

            console.error(
                "[OnHeal] ERROR State " + stateId
            );

            console.error(e);
        }
    }

    log("========================================");
};

})();
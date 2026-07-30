//=============================================================================
// EquipFullHeal.js
//=============================================================================
/*:
 * @plugindesc v1.2 При экипировке восстанавливает HP/MP до максимума,
 * включая корректный предпросмотр в сцене экипировки.
 * @author Fix Plugin
 *
 * @help
 * После любой смены экипировки (через сцену, события или предпросмотр)
 * текущие HP и MP актёра становятся равными его максимальным HP и MP.
 * Это гарантирует, что пассивные состояния, зависящие от полных HP/MP,
 * активируются сразу, а окно статуса показывает реальные итоговые значения.
 *
 * Порядок плагинов:
 * Установите этот плагин ниже MOG_SceneEquip и YEP_AutoPassiveStates.
 */

(function() {
    'use strict';

    // Вспомогательная функция: установить HP/MP в максимум и обновить актёра
    function fullHealRefresh(actor) {
        actor._hp = actor.mhp;
        actor._mp = actor.mmp;
        actor.refresh();
    }

    // 1. Перехват changeEquip (используется при реальной смене экипировки)
    var _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
    Game_Actor.prototype.changeEquip = function(slotId, item) {
        _Game_Actor_changeEquip.call(this, slotId, item);
        fullHealRefresh(this);
    };

    // 2. Перехват forceChangeEquip (используется для предпросмотра tempActor)
    var _Game_Actor_forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
    Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
        _Game_Actor_forceChangeEquip.call(this, slotId, item);
        fullHealRefresh(this);
    };

})();
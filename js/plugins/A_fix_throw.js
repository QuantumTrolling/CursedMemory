//=============================================================================
// VE_ThrowableObjects_BattleZoom_Patch.js
//=============================================================================
/*:
 * @plugindesc Fixes z-order for UI elements when using VE Throwable Objects and BattleZoom
 * @author ChatGPT
 * @help This plugin ensures weakness windows are always on top of battler sprites and projectiles.
 * Place it after VE_ThrowableObjects.js and BattleZoom.js (if present) in plugin list.
 */

(function() {
    'use strict';

    if (typeof Spriteset_Battle === 'undefined') return;

    // Сохраняем оригинальный метод сортировки (может быть из ядра MV, Yanfly или BattleZoom)
    var _updateZCoordinates = Spriteset_Battle.prototype.updateZCoordinates;

    Spriteset_Battle.prototype.updateZCoordinates = function() {
        // Сначала вызываем оригинальный метод, чтобы сохранить стандартную сортировку
        if (_updateZCoordinates) _updateZCoordinates.call(this);

        // Работаем с _battleField — контейнером, в котором находятся спрайты баттлеров, снаряды и UI-окна
        var bf = this._battleField;
        if (!bf || !bf.children) return;

        var windows = [];
        var others = [];

        for (var i = 0; i < bf.children.length; i++) {
            var child = bf.children[i];

            // Определяем окна уязвимостей/щитов по наличию _factorX или _factorY (BattleZoom добавляет эти свойства)
            // Если окно не помечено, но имеет эти свойства, помечаем его
            if (!child._isWeaknessWindow && (child._factorX !== undefined || child._factorY !== undefined)) {
                child._isWeaknessWindow = true;
            }

            if (child._isWeaknessWindow) {
                windows.push(child);
                // Устанавливаем высокий zIndex, чтобы окна были выше всех
                child.z = 1000;
            } else {
                others.push(child);
                // Для снарядов можно установить z ниже, чтобы они не перекрывали окна
                if (child instanceof Sprite_Throw && child.z === undefined) {
                    child.z = 500;
                }
            }
        }

        // Если есть окна, перемещаем их в конец массива, чтобы они рисовались поверх всех остальных
        if (windows.length > 0) {
            bf.children = others.concat(windows);
        }
    };
})();
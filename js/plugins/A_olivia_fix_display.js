//=============================================================================
// Olivia_OctoBattle_Fix.js
//=============================================================================
/*:
 * @plugindesc Fix weakness display layer order in Olivia_OctoBattle.
 * @author YourName
 *
 * @help
 * - Прикрепляет окно слабостей к спрайту врага (решает перекрытие посторонними спрайтами).
 * - Задаёт Z врага пропорционально его Y: чем ниже враг на экране, тем выше его Z,
 *   и его HUD не перекрывается верхними врагами.
 * - Предотвращает мерцание за счёт однократного добавления окна.
 *
 * Place this plugin directly below Olivia_OctoBattle.js.
 */

var Imported = Imported || {};

if (Imported.Olivia_OctoBattle && Olivia.OctoBattle.WeaknessDisplay && Olivia.OctoBattle.WeaknessDisplay.Enabled) {

    // Однократно делаем окно слабостей дочерним элементом спрайта врага
    var _Sprite_Enemy_createWeaknessDisplayWindow = Sprite_Enemy.prototype.createWeaknessDisplayWindow;
    Sprite_Enemy.prototype.createWeaknessDisplayWindow = function() {
        _Sprite_Enemy_createWeaknessDisplayWindow.call(this);
        if (this._weaknessWindow && !this._weaknessDisplayAdded) {
            // Удаляем окно из предыдущего родителя (если был)
            if (this._weaknessWindow.parent) {
                this._weaknessWindow.parent.removeChild(this._weaknessWindow);
            }
            // Добавляем как дочерний элемент спрайта
            this.addChild(this._weaknessWindow);
            // Запоминаем, что уже добавили
            this._weaknessDisplayAdded = true;
            // Устанавливаем начальную позицию
            this._weaknessWindow.x = this._weaknessWindow._factorX || 0;
            this._weaknessWindow.y = this._weaknessWindow._factorY || 0;
        }
    };

    // Обновление позиции окна – теперь всегда работает в локальных координатах спрайта
    var _Window_WeaknessDisplay_updatePosition = Window_WeaknessDisplay.prototype.updatePosition;
    Window_WeaknessDisplay.prototype.updatePosition = function() {
        if (this.parent && this.parent instanceof Sprite_Enemy) {
            this.x = this._factorX || 0;
            this.y = this._factorY || 0;
        } else {
            _Window_WeaknessDisplay_updatePosition.call(this);
        }
    };

    // Убираем попытки добавить окно в _baseSprite, оставляем только рефреш
    var _Spriteset_Battle_updateEnemyWeaknessWindows = Spriteset_Battle.prototype.updateEnemyWeaknessWindows;
    Spriteset_Battle.prototype.updateEnemyWeaknessWindows = function() {
        if ($gameTemp._needRefreshAllEnemyWeaknessWindows === true) {
            for (var i = 0; i < this._enemySprites.length; i++) {
                var sprite = this._enemySprites[i];
                if (sprite && sprite._weaknessWindow) {
                    sprite._weaknessWindow.refresh();
                }
            }
            $gameTemp._needRefreshAllEnemyWeaknessWindows = false;
        }
    };

    // ----- СОРТИРОВКА ПО ГЛУБИНЕ + ОБНОВЛЕНИЕ ПОЗИЦИИ ОКНА -----
    var _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
    Sprite_Enemy.prototype.update = function() {
        _Sprite_Enemy_update.call(this);
        // Z = Y для правильного порядка перекрытия
        this.z = this.y;
        // Следим, чтобы окно слабостей обновляло позицию каждый кадр
        if (this._weaknessWindow && this._weaknessDisplayAdded) {
            this._weaknessWindow.updatePosition();
        }
    };

}
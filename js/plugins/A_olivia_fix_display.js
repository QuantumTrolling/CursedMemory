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
 *
 * Place this plugin directly below Olivia_OctoBattle.js.
 */

var Imported = Imported || {};

if (Imported.Olivia_OctoBattle && Olivia.OctoBattle.WeaknessDisplay && Olivia.OctoBattle.WeaknessDisplay.Enabled) {

    // Переопределяем создание окна слабостей – теперь оно будет дочерним элементом спрайта врага
    var _Sprite_Enemy_createWeaknessDisplayWindow = Sprite_Enemy.prototype.createWeaknessDisplayWindow;
    Sprite_Enemy.prototype.createWeaknessDisplayWindow = function() {
        _Sprite_Enemy_createWeaknessDisplayWindow.call(this);
        if (this._weaknessWindow) {
            if (this._weaknessWindow.parent) {
                this._weaknessWindow.parent.removeChild(this._weaknessWindow);
            }
            this.addChild(this._weaknessWindow);
            this._weaknessWindow.x = this._weaknessWindow._factorX;
            this._weaknessWindow.y = this._weaknessWindow._factorY;
            this._weaknessWindow._added = true;
        }
    };

    // Корректируем обновление позиции окна для работы в локальных координатах спрайта
    var _Window_WeaknessDisplay_updatePosition = Window_WeaknessDisplay.prototype.updatePosition;
    Window_WeaknessDisplay.prototype.updatePosition = function() {
        if (this.parent && this.parent instanceof Sprite_Enemy) {
            this.x = this._factorX;
            this.y = this._factorY;
        } else {
            _Window_WeaknessDisplay_updatePosition.call(this);
        }
    };

    // Убираем добавление окна в _baseSprite внутри Spriteset_Battle
    var _Spriteset_Battle_updateEnemyWeaknessWindows = Spriteset_Battle.prototype.updateEnemyWeaknessWindows;
    Spriteset_Battle.prototype.updateEnemyWeaknessWindows = function() {
        if ($gameTemp._needRefreshAllEnemyWeaknessWindows === true) {
            for (var i = 0; i < this._enemySprites.length; i++) {
                var sprite = this._enemySprites[i];
                if (!!sprite && !!sprite._weaknessWindow) {
                    sprite._weaknessWindow.refresh();
                }
            }
            $gameTemp._needRefreshAllEnemyWeaknessWindows = false;
        }
    };

    // ----- ДОБАВЛЯЕМ СОРТИРОВКУ ПО ГЛУБИНЕ -----
    // Каждый кадр для каждого врага задаём Z = Y (или Y * множитель)
    var _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
    Sprite_Enemy.prototype.update = function() {
        _Sprite_Enemy_update.call(this);
        // Чем ниже враг (больше Y), тем выше Z → рисуется поверх остальных
        this.z = this.y;
        // Для гарантии можно использовать множитель, если Y различаются слабо:
        // this.z = this.y * 10;
    };

}
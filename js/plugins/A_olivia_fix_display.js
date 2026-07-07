//=============================================================================
// Olivia_OctoBattle_Fix.js
//=============================================================================
/*:
 * @plugindesc Fix weakness display layer order in Olivia_OctoBattle.
 * @author YourName
 *
 * @help
 * Makes the weakness window appear 1 layer above its own enemy sprite,
 * but below all other character and enemy sprites.
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
            // Удаляем окно из любого другого родителя (например, _baseSprite), если оно там уже было
            if (this._weaknessWindow.parent) {
                this._weaknessWindow.parent.removeChild(this._weaknessWindow);
            }
            // Добавляем окно как дочерний элемент спрайта врага
            this.addChild(this._weaknessWindow);
            // Устанавливаем относительные координаты (смещение от спрайта)
            this._weaknessWindow.x = this._weaknessWindow._factorX;
            this._weaknessWindow.y = this._weaknessWindow._factorY;
            // Помечаем, что окно уже добавлено, чтобы избежать повторной вставки в _baseSprite
            this._weaknessWindow._added = true;
        }
    };

    // Корректируем обновление позиции окна для работы в локальных координатах спрайта
    var _Window_WeaknessDisplay_updatePosition = Window_WeaknessDisplay.prototype.updatePosition;
    Window_WeaknessDisplay.prototype.updatePosition = function() {
        if (this.parent && this.parent instanceof Sprite_Enemy) {
            // Если родитель – спрайт врага, используем относительное смещение
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
                    // Окно уже является потомком спрайта, поэтому ничего не добавляем
                }
            }
            $gameTemp._needRefreshAllEnemyWeaknessWindows = false;
        }
    };

}
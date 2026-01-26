/*:
 * @plugindesc Дневной лес: свет, мягкий блур и свечение на battleback для пиксель-арт игр (Pixi 4 совместимо)
 * @author ChatGPT
 *
 * @help
 * Добавляет дневной свет и мягкий световой эффект на battleback1 и battleback2.
 * Полностью совместимо с Pixi 4 / RPG Maker MV. Без листьев и лишних PNG.
 */

(function() {

    var _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function() {
        _Scene_Battle_createDisplayObjects.call(this);

        if (this._spriteset && this._spriteset._back1Sprite && this._spriteset._back2Sprite) {

            // ColorMatrixFilter для дневного света
            var colorFilter = new PIXI.filters.ColorMatrixFilter();
            colorFilter.brightness(1.1, false); // чуть ярче
            colorFilter.saturate(1.1, false);   // чуть насыщеннее
            colorFilter.hue(10, false);         // смещаем тон к желтому

            this._spriteset._back1Sprite.filters = [colorFilter];
            this._spriteset._back2Sprite.filters = [colorFilter];
            this._forestColorFilter = colorFilter;

            // Лёгкое вертикальное колебание battleback
            this._battlebackBaseY = 0;

            // Мягкий Blur
            var blurFilter = new PIXI.filters.BlurFilter();
            blurFilter.blur = 1; // мягкий блюр
            this._spriteset._back1Sprite.filters.push(blurFilter);
            this._spriteset._back2Sprite.filters.push(blurFilter);
            this._forestBlurFilter = blurFilter;
        }
    };

    var _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);

        if (this._forestColorFilter) {
            // Лёгкое мерцание света
            var t = Date.now() / 2000;
            this._forestColorFilter.brightness(1.08 + Math.sin(t) * 0.03, false);
        }

        if (this._spriteset && this._spriteset._back1Sprite && this._spriteset._back2Sprite) {
            var offsetY = Math.sin(Date.now() / 1200) * 2;
            this._spriteset._back1Sprite.y = this._battlebackBaseY + offsetY;
            this._spriteset._back2Sprite.y = this._battlebackBaseY + offsetY;
        }

        if (this._forestBlurFilter) {
            // Лёгкое колебание blur
            this._forestBlurFilter.blur = 0.9 + Math.sin(Date.now() / 1800) * 0.3;
        }
    };

})();
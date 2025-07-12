/*:
 * @plugindesc Hides pictures 10 and 11 the same way as Galv's Screen Buttons [v1.0]
 * @author ChatGPT
 * 
 * @help
 * Этот плагин автоматически скрывает картинки с ID 10 и 11, 
 * если $gameSystem._hideBtns == true или если запущено событие.
 * 
 * Поведение и скорость исчезновения совпадают с Galv_ScreenButtons.
 */

(function () {

    const BUTTON_FADE_SPEED = Number(PluginManager.parameters('Galv_ScreenButtons')["Button Fade"]) || 30;

    const _Spriteset_Base_updatePictures = Spriteset_Base.prototype.updatePictures;
    Spriteset_Base.prototype.updatePictures = function () {
        _Spriteset_Base_updatePictures.call(this);

        this._pictureContainer.children.forEach(sprite => {
            if (!sprite || !sprite.picture) return;

            const picId = sprite.picture()._pictureId;
            if (picId === 10 || picId === 11) {
                // Условия как у Galv_ScreenButtons
                if ($gameSystem._hideBtns || $gameMap.isEventRunning()) {
                    sprite.opacity = Math.max(sprite.opacity - BUTTON_FADE_SPEED, 0);
                } else {
                    sprite.opacity = Math.min(sprite.opacity + BUTTON_FADE_SPEED, 255);
                }
            }
        });
    };

})();

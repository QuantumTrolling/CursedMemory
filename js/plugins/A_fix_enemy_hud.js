//=============================================================================
// Fix_WeaknessLayer.js
// Исправляет перекрытие окна слабостей из Olivia Octo Battle другими спрайтами.
// Разместите этот плагин НИЖЕ Olivia_OctoBattle в списке плагинов.
//=============================================================================

(function() {
    // 1. При создании окна слабостей добавляем его прямо в спрайт врага (а не в _baseSprite)
    var _Sprite_Enemy_createWeaknessDisplayWindow = Sprite_Enemy.prototype.createWeaknessDisplayWindow;
    Sprite_Enemy.prototype.createWeaknessDisplayWindow = function() {
        _Sprite_Enemy_createWeaknessDisplayWindow.call(this);
        // Добавляем окно как дочерний элемент этого спрайта
        if (this._weaknessWindow) {
            this.addChild(this._weaknessWindow);
        }
    };

    // 2. Убираем добавление в _baseSprite из Spriteset_Battle, оставляем только обновление
    var _Spriteset_Battle_updateEnemyWeaknessWindows = Spriteset_Battle.prototype.updateEnemyWeaknessWindows;
    Spriteset_Battle.prototype.updateEnemyWeaknessWindows = function() {
        // Больше не добавляем окно в _baseSprite, только обновляем его содержимое
        if ($gameTemp._needRefreshAllEnemyWeaknessWindows === true) {
            var sprites = this._enemySprites;
            for (var i = 0; i < sprites.length; i++) {
                var sprite = sprites[i];
                if (sprite && sprite._weaknessWindow) {
                    sprite._weaknessWindow.refresh();
                }
            }
            $gameTemp._needRefreshAllEnemyWeaknessWindows = false;
        }
    };

    // 3. Координаты окна теперь относительны спрайта, а не экрана
    var _Window_WeaknessDisplay_updatePosition = Window_WeaknessDisplay.prototype.updatePosition;
    Window_WeaknessDisplay.prototype.updatePosition = function() {
        // Просто устанавливаем смещение, зашитое в _factorX/_factorY
        // (больше не прибавляем позицию спрайта, т.к. окно уже внутри него)
        this.x = this._factorX;
        this.y = this._factorY;
    };
})();
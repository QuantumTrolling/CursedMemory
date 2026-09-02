//=============================================================================
// MOG_ConsecutiveBattles_Fix.js
//=============================================================================
//
// Фикс для MOG_ConsecutiveBattles: исправляет неправильное отражение
// врагов во второй и последующих волнах.
//
// Подключите этот плагин ПОСЛЕ MOG_ConsecutiveBattles и ПОСЛЕ плагина
// анимаций врагов (например, SV Animated Enemies).
//
//=============================================================================

(function() {

    var _SpritesetBattle_createEnemies = Spriteset_Battle.prototype.createEnemies;

    Spriteset_Battle.prototype.createEnemies = function() {
        _SpritesetBattle_createEnemies.call(this);

        // Проверяем, что система последовательных битв активна
        if (!$gameSystem || !$gameSystem._consBat) return;

        // index > 0 означает, что это вторая или более поздняя волна
        // (в первой волне index = 0)
        if ($gameSystem._consBat.index > 0) {
            var sprites = this._enemySprites;
            for (var i = 0; i < sprites.length; i++) {
                var sprite = sprites[i];
                if (sprite && sprite._enemy) {
                    // Принудительно разворачиваем спрайт влево
                    // Если ваш плагин использует scale.x = -1 для отражения,
                    // то знак должен быть отрицательным.
                    // Если враг уже отражён правильно, можно проверить
                    // и не трогать, но проще просто применить.
                    sprite.scale.x = -Math.abs(sprite.scale.x);
                }
            }
        }
    };

})();
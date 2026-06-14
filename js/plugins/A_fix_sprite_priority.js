//=============================================================================
// BattleSpriteNoOverlap.js
//=============================================================================
/*:
 * @plugindesc v1.0 Запрещает наложение спрайтов союзных актёров друг на друга.
 * @author ChatGPT
 *
 * @param padding
 * @text Минимальный отступ (px)
 * @type number
 * @default 8
 *
 * @param onlyActors
 * @text Только союзные актёры
 * @type boolean
 * @default true
 *
 * @help
 * Если два спрайта актёров перекрываются, они раздвигаются по X.
 * Переопределяет updatePosition() у Sprite_Battler, чтобы после
 * всех смещений (jump, float и т.д.) выполнять проверку коллизий.
 */
(function() {
    'use strict';

    var parameters = PluginManager.parameters('BattleSpriteNoOverlap');
    var padding = Number(parameters['padding'] || 8);
    var onlyActors = parameters['onlyActors'] === 'true';

    function getBoundingBox(sprite) {
        if (!sprite.bitmap || !sprite.bitmap.isReady()) return null;
        var w = sprite.bitmap.width;
        var h = sprite.bitmap.height;
        var ax = (sprite.anchor ? sprite.anchor.x : 0.5);
        var ay = (sprite.anchor ? sprite.anchor.y : 1);
        return {
            x: sprite.x - w * ax,
            y: sprite.y - h * ay,
            width: w,
            height: h
        };
    }

    function rectsOverlap(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    var _Sprite_Battler_updatePosition = Sprite_Battler.prototype.updatePosition;
    Sprite_Battler.prototype.updatePosition = function() {
        _Sprite_Battler_updatePosition.call(this);   // сначала стандартное позиционирование

        // Применяем только к союзным актёрам, если нужно
        if (onlyActors && !this._battler || !this._battler.isActor()) return;

        var spriteset = BattleManager._spriteset;
        if (!spriteset) return;

        var allSprites = spriteset.battlerSprites();
        var self = this;

        // Идём по всем спрайтам, сравниваем только с актёрами
        for (var i = 0; i < allSprites.length; i++) {
            var other = allSprites[i];
            if (other === self) continue;
            if (onlyActors && (!other._battler || !other._battler.isActor())) continue;

            var box1 = getBoundingBox(self);
            var box2 = getBoundingBox(other);
            if (!box1 || !box2) continue;

            if (rectsOverlap(box1, box2)) {
                // Вычисляем перекрытие по X и Y
                var overlapX = Math.min(box1.x + box1.width - box2.x, box2.x + box2.width - box1.x);
                var overlapY = Math.min(box1.y + box1.height - box2.y, box2.y + box2.height - box1.y);

                // Раздвигаем только по X (чтобы не ломать порядок отрисовки по Y)
                // self сдвигаем вправо, other влево на половину суммы перекрытия + padding
                if (overlapX > 0 && overlapY > 0) {
                    var shift = (overlapX / 2) + padding / 2;
                    // Определяем, кто левее
                    var selfCenterX = box1.x + box1.width / 2;
                    var otherCenterX = box2.x + box2.width / 2;
                    if (selfCenterX < otherCenterX) {
                        self.x -= shift;
                        other.x += shift;
                    } else {
                        self.x += shift;
                        other.x -= shift;
                    }

                    // Чтобы бесконечно не дёргать – ограничиваем количество вызовов за кадр
                    // но updatePosition вызывается много раз, проблема не возникнет.
                }
                // При необходимости можно добавить ограничение смещения (например, не более 30px)
                break; // на данном кадре обрабатываем только одно пересечение для этого спрайта
            }
        }
    };

})();
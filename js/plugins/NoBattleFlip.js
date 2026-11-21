/*:
 * @plugindesc v1.1 Запрет разворота (зеркалирования) спрайтов в бою. Fix double-scale.
 * @author Custom Fix
 *
 * @param Actor Scale X
 * @type select
 * @option 1 — как нарисовано в листе
 * @value 1
 * @option -1 — отразить горизонтально
 * @value -1
 * @default -1
 * @desc Ориентация спрайтов актёров.
 *
 * @param Enemy Scale X
 * @type select
 * @option 1 — как нарисовано в листе
 * @value 1
 * @option -1 — отразить горизонтально
 * @value -1
 * @default 1
 * @desc Ориентация спрайтов врагов.
 *
 * @help
 * Ставить ПОСЛЕ YED_SideviewBattler, YEP_BattleEngineCore,
 * YEP_X_AnimatedSVEnemies, YEP_X_ActSeqPack1/2.
 *
 * Значение:
 *   1  = спрайт в исходной ориентации листа (без отражения)
 *   -1 = спрайт отражён по горизонтали
 *
 * Если у вас листы нарисованы «лицом влево», а персонажи стоят слева
 * и должны смотреть на врагов справа — ставьте Actor Scale X = -1.
 *
 * ВАЖНО: после изменения параметров сохраните проект и ПЕРЕЗАПУСТИТЕ
 * тестовую игру — параметры плагинов читаются только при старте.
 */

(function() {
    var params = PluginManager.parameters('NoBattleFlip');
    var ACTOR_SCALE_X = Number(params['Actor Scale X'] || 1);
    var ENEMY_SCALE_X = Number(params['Enemy Scale X'] || 1);

    function forceScale(sprite, target) {
        if (!sprite || !sprite.scale) return;

        if (sprite._mainSprite && sprite._mainSprite.scale) {
            // Родитель всегда держим в 1, чтобы избежать двойного отражения
            if (sprite.scale.x !== 1) sprite.scale.x = 1;

            // Дочерние спрайты отражаем по параметру
            if (sprite._mainSprite.scale.x !== target) {
                sprite._mainSprite.scale.x = target;
            }
            if (sprite._weaponSprite && sprite._weaponSprite.scale &&
                sprite._weaponSprite.scale.x !== target) {
                sprite._weaponSprite.scale.x = target;
            }
            if (sprite._stateSprite && sprite._stateSprite.scale &&
                sprite._stateSprite.scale.x !== target) {
                sprite._stateSprite.scale.x = target;
            }
        } else {
            // Спрайт без дочерней структуры (например, стандартный Sprite_Enemy)
            if (sprite.scale.x !== target) sprite.scale.x = target;
        }
    }

    if (window.Sprite_Actor) {
        var _Sprite_Actor_update = Sprite_Actor.prototype.update;
        Sprite_Actor.prototype.update = function() {
            _Sprite_Actor_update.call(this);
            forceScale(this, ACTOR_SCALE_X);
        };
    }

    if (window.Sprite_Enemy) {
        var _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
        Sprite_Enemy.prototype.update = function() {
            _Sprite_Enemy_update.call(this);
            forceScale(this, ENEMY_SCALE_X);
        };
    }
})();
/*:
 * @plugindesc Patch for YED_SideviewBattler + YEP_X_AnimatedSVEnemies (v1.6)
 * @author Community
 * @help This plugin enables custom motions for enemies and ensures idle animation plays at battle start.
 */

(function() {
    if (!Imported.YED_SideviewBattler || !Imported.YEP_X_AnimatedSVEnemies) return;

    // 1. Связываем forceSideviewMotion с requestMotion для YEP
    var _forceSideviewMotion = Sprite_Enemy.prototype.forceSideviewMotion;
    Sprite_Enemy.prototype.forceSideviewMotion = function(motionType) {
        _forceSideviewMotion.call(this, motionType);
        if (this._enemy) this._enemy.requestMotion(motionType);
    };

    var _startSideviewMotion = Sprite_Enemy.prototype.startSideviewMotion;
    Sprite_Enemy.prototype.startSideviewMotion = function(motionType) {
        _startSideviewMotion.call(this, motionType);
        if (this._enemy) this._enemy.requestMotion(motionType);
    };

    // 2. Перехватываем startMotion для использования индексов из YED
    var _Sprite_Enemy_startMotion = Sprite_Enemy.prototype.startMotion;
    Sprite_Enemy.prototype.startMotion = function(motionType) {
        if (this._enemy && typeof this._enemy.isSideviewBattler === 'function' && this._enemy.isSideviewBattler()) {
            var motion = this._enemy.getSideviewMotion(motionType);
            if (motion) {
                // Создаём объект движения с необходимыми полями для YEP
                this._motion = {
                    index: motion.index,
                    loop: motion.loop || false,
                    frames: motion.frames || 4,
                    speed: motion.speed || 10
                };
                this._motionCount = 0;
                this._pattern = 0;
                return;
            }
        }
        _Sprite_Enemy_startMotion.call(this, motionType);
    };

    // 3. Запускаем idle-анимацию после полной загрузки спрайта
    var _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
    Sprite_Enemy.prototype.updateBitmap = function() {
        _Sprite_Enemy_updateBitmap.call(this);
        if (this._svBattlerEnabled && this._mainSprite && this._mainSprite.bitmap && this._mainSprite.bitmap.isReady()) {
            if (!this._idleMotionInitialized) {
                this._idleMotionInitialized = true;
                // Запрашиваем idle-движение (walk)
                if (this._enemy && typeof this._enemy.idleMotion === 'function') {
                    this._enemy.requestMotion(this._enemy.idleMotion());
                }
            }
        }
    };

    // 4. Сбрасываем флаг при смене цели
    var _setSVBattler = Sprite_Enemy.prototype.setSVBattler;
    Sprite_Enemy.prototype.setSVBattler = function(battler) {
        _setSVBattler.call(this, battler);
        this._idleMotionInitialized = false;
        this._motion = null;
    };
})();
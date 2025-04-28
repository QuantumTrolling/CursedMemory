/*:
 * @plugindesc v1.05 — Полный фикс VE_LoopAnimation + одинаковая позиция анимаций для loop и обычных, без ошибок (battle+map)
 * @author ChatGPT
 *
 * @help
 * Этот плагин исправляет:
 *  - Моргание в VE_LoopAnimation
 *  - Одинаковую позицию анимаций (startAnimation и loopAnimation)
 *  - Только зацикленные анимации зацикливаются
 *  - Плавная работа и правильный слой
 *  - Нет ошибки "position of undefined"
 *
 * Просто установите ниже VE_LoopAnimation.js
 */

(function() {

  function Sprite_LoopedAnimation() {
    Sprite_Animation.call(this);
  }

  Sprite_LoopedAnimation.prototype = Object.create(Sprite_Animation.prototype);
  Sprite_LoopedAnimation.prototype.constructor = Sprite_LoopedAnimation;

  Sprite_LoopedAnimation.prototype.updateMain = function() {
    if (!this._animation) return;
    this._duration--;
    while (this._duration > 0 && this.isReady()) {
      this.updateFrame();
      break;
    }
    if (this._duration <= 0) {
      this._duration = this._animation.frames.length * 4;
      this._frameIndex = 0;
    }
  };

  Sprite_LoopedAnimation.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateMain();
    if (this._animation) {
      this.updatePosition(); // Вызываем только если _animation задана
    }
  };

  // --- Только обычные анимации (startAnimation) ---
  Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
    if (!animation) return;

    const sprite = new Sprite_Animation();
    sprite.setup(this._effectTarget || this, animation, mirror, delay);
    sprite.visible = this.isSpriteVisible();

    if (!this._animationSprites) this._animationSprites = [];
    this._animationSprites.push(sprite);

    if (this._effectTarget && this._effectTarget.addChild) {
      this._effectTarget.addChild(sprite);
    } else {
      this.addChild(sprite);
    }
  };

  // --- Только зацикленные анимации через нотетеги ---
  Sprite_Base.prototype.refreshLoopAnimation = function(data, type, index) {
    this._loopAnimSprites = this._loopAnimSprites || [];
    var sprite = new Sprite_LoopedAnimation();
    var mirror = this.isMirrorAnimation();
    var animation = $dataAnimations[data.id];

    sprite.setup(this._effectTarget || this, animation, mirror, 0);
    sprite.visible = this.isSpriteVisible();
    this._loopAnimSprites[type] = this._loopAnimSprites[type] || [];
    this._loopAnimSprites[type].push(sprite);

    if (this._effectTarget && this._effectTarget.addChild) {
      this._effectTarget.addChild(sprite);
    } else {
      this.addChild(sprite);
    }
  };

})();

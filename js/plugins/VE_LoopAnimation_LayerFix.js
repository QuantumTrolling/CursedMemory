(function() {

  const _Sprite_Animation_updateMain = Sprite_Animation.prototype.updateMain;
  Sprite_Animation.prototype.updateMain = function() {
    if (this._animation && this._duration <= 0) {
      if (this._loop) {
        // Перезапускаем без удаления и без всплытия в слоях
        this._duration = this._animation.frames.length * 4;
        this._frameIndex = 0;
      } else {
        this.onEnd();
      }
    } else {
      _Sprite_Animation_updateMain.call(this);
    }
  };

  // Переопределяем refreshLoopAnimation
  Sprite_Base.prototype.refreshLoopAnimation = function(data, type, index) {
    console.log('▶ refreshLoopAnimation called for type:', type, 'with data:', data);

    this._loopAnimSprites[type] = this._loopAnimSprites[type] || [];
    var sprite = new Sprite_Animation();
    var mirror = this.isMirrorAnimation();
    var animation = $dataAnimations[data.id];

    console.log('▶ Setting up animation:', animation && animation.name);

    sprite.setup(this._effectTarget || this, animation, mirror, 0);
    sprite.visible = this.isSpriteVisible();
    sprite._loop = true; // ручной флаг для зацикливания
    this._loopAnimSprites[type].push(sprite);

    if (this._effectTarget && this._effectTarget.addChild) {
      this._effectTarget.addChild(sprite);
    } else {
      this.addChild(sprite);
    }
  };

})();

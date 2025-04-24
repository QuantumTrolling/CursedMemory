(function() {

  Sprite_Base.prototype.refreshLoopAnimation = function(data, type, index) {
    console.log('▶ refreshLoopAnimation called for type:', type, 'with data:', data);

    this._loopAnimSprites[type] = this._loopAnimSprites[type] || [];
    var sprite = new Sprite_Animation();
    var mirror = this.isMirrorAnimation();
    var animation = $dataAnimations[data.id];

    console.log('▶ Setting up animation:', animation && animation.name);

    sprite.setup(this._effectTarget, animation, mirror, 0);
    sprite.visible = this.isSpriteVisible();
    this._loopAnimSprites[type].push(sprite);

    if (this._effectTarget && this._effectTarget.addChild) {
      console.log('▶ Adding to effectTarget');
      this._effectTarget.addChild(sprite);
    } else {
      console.log('▶ Adding to self');
      this.addChild(sprite);
    }
  };

})();

Scene_MenuBase.prototype.createBackground = function() {
    
    let pictureName = null;
	pictureName = "MenuBackground";
    
    const bitmap = ImageManager.loadPicture(pictureName);
    this._backgroundSprite = new Sprite(bitmap);
    
    // stretch picture to screen size
    bitmap.addLoadListener(() => {
        this._backgroundSprite.scale.x = Graphics.width / bitmap.width;
        this._backgroundSprite.scale.y = Graphics.height / bitmap.height;
    });
    
    this.addChild(this._backgroundSprite);
}

//=============================================================================
// BattleCamera_Parallax_FINAL.js
//=============================================================================
/*:
 * @plugindesc Octopath style camera + multi parallax backgrounds (FINAL)
 * @author ChatGPT
 */

(function(){
'use strict';

// -------------------------------------------------------------
function snap(v){ return Math.round(v); }

function bitmapReady(s){
    return s && s.bitmap && s.bitmap.isReady && s.bitmap.isReady();
}

// -------------------------------------------------------------
// CAMERA
// -------------------------------------------------------------
var BattleCamera = {

    x:0,
    y:0,
    tx:0,
    ty:0,
    scale:1,
    tScale:1,

    follow:null,
    forced:false,
    speed:0.15,

    update:function(){

        if(!BattleManager._spriteset) return;

        if(this.forced){
            this.tx = 0;
            this.ty = 0;
        }
        else if(this.follow && bitmapReady(this.follow)){

            let s = this.follow;
            let h = s.bitmap.height;
            let ay = s.anchor ? s.anchor.y : 1;

            let cx = s.x;
            let cy = s.y - (h * ay / 2);

            this.tx = Graphics.width/2 - cx;
            this.ty = Graphics.height/2 - cy;
        }

        this.x += (this.tx-this.x)*this.speed;
        this.y += (this.ty-this.y)*this.speed;
        this.scale += (this.tScale-this.scale)*this.speed;

        this.x = snap(this.x);
        this.y = snap(this.y);
    },

    focus:function(sprite,scale){
        this.follow = sprite;
        this.forced = false;
        this.tScale = scale || 1.06;
    },

    center:function(){
        this.follow = null;
        this.forced = true;
        this.tScale = 1;
    }
};

// -------------------------------------------------------------
// FIND SPRITE
// -------------------------------------------------------------
function findBattlerSprite(battler){
    if(!BattleManager._spriteset) return null;
    return BattleManager._spriteset.battlerSprites()
        .find(s=>s._battler===battler);
}

// -------------------------------------------------------------
// CREATE BACKGROUND LAYERS
// -------------------------------------------------------------
var _createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function(){

    _createBattleback.call(this);

    // скрываем стандартные battlebacks
    if(this._back1Sprite) this._back1Sprite.visible = false;
    if(this._back2Sprite) this._back2Sprite.visible = false;

    // создаём слои
    this._farBack = new Sprite();
    this._midBack = new Sprite();
    this._mainBack = new Sprite();

    // вставляем ПЕРЕД battlefield
    let index = this._baseSprite.getChildIndex(this._battleField);

    this._baseSprite.addChildAt(this._farBack,index);
    this._baseSprite.addChildAt(this._midBack,index+1);
    this._baseSprite.addChildAt(this._mainBack,index+2);
};

// -------------------------------------------------------------
// LOAD BACKS
// -------------------------------------------------------------
Spriteset_Battle.prototype.updateCameraBacks = function(){

    if($gameTemp.battleCameraFarBack){
        this._farBack.bitmap =
            ImageManager.loadBattleback1($gameTemp.battleCameraFarBack);
        $gameTemp.battleCameraFarBack = null;
    }

    if($gameTemp.battleCameraMidBack){
        this._midBack.bitmap =
            ImageManager.loadBattleback1($gameTemp.battleCameraMidBack);
        $gameTemp.battleCameraMidBack = null;
    }

    if($gameTemp.battleCameraBattleback){
        this._mainBack.bitmap =
            ImageManager.loadBattleback1($gameTemp.battleCameraBattleback);
        $gameTemp.battleCameraBattleback = null;
    }
};

// -------------------------------------------------------------
// PARALLAX
// -------------------------------------------------------------
Spriteset_Battle.prototype.updateParallax = function(){

    if(bitmapReady(this._farBack)){
        this._farBack.x = snap(BattleCamera.x * 0.2);
        this._farBack.y = snap(BattleCamera.y * 0.2);
    }

    if(bitmapReady(this._midBack)){
        this._midBack.x = snap(BattleCamera.x * 0.5);
        this._midBack.y = snap(BattleCamera.y * 0.5);
    }

    if(bitmapReady(this._mainBack)){
        let sw = Graphics.width;
        let sh = Graphics.height;
        let bw = this._mainBack.bitmap.width;
        let bh = this._mainBack.bitmap.height;

        this._mainBack.x = snap((sw-bw)/2);
        this._mainBack.y = snap((sh-bh)/2);
    }
};

// -------------------------------------------------------------
// UPDATE
// -------------------------------------------------------------
var _updateSpriteset = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function(){

    _updateSpriteset.call(this);

    if(!this._battleField) return;

    BattleCamera.update();

    this.updateCameraBacks();
    this.updateParallax();

    this._battleField.x = BattleCamera.x;
    this._battleField.y = BattleCamera.y;
    this._battleField.scale.x = BattleCamera.scale;
    this._battleField.scale.y = BattleCamera.scale;
};

// -------------------------------------------------------------
// SCENE CAMERA CONTROL
// -------------------------------------------------------------
var _sceneUpdate = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function(){

    _sceneUpdate.call(this);

    if(this._actorCommandWindow && this._actorCommandWindow.active){
        let actor = this._actorCommandWindow._actor;
        if(actor){
            BattleCamera.focus(findBattlerSprite(actor),1.06);
        }
    }
};

// -------------------------------------------------------------
var _startAction = BattleManager.startAction;
BattleManager.startAction = function(){

    _startAction.call(this);

    let subject = this._subject;
    if(!subject) return;

    let sprite = findBattlerSprite(subject);
    if(sprite){
        BattleCamera.focus(sprite,1.1);
    }
};

// -------------------------------------------------------------
var _endAction = BattleManager.endAction;
BattleManager.endAction = function(){
    _endAction.call(this);
    BattleCamera.center();
};

})();

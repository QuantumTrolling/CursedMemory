//=============================================================================
// BattleCamera_MidFar_FIXED.js
//=============================================================================
/*:
 * @plugindesc Battle camera with strict centering on active battler + subtle FAR parallax
 * @author ChatGPT
 */

(function(){
'use strict';

// -------------------------------------------------------------
function snap(v){ return Math.round(v); }
function ready(s){ return s && s.bitmap && s.bitmap.isReady(); }

// -------------------------------------------------------------
// CAMERA
// -------------------------------------------------------------
var BattleCamera = {

    x: 0,
    y: 0,

    farX: 0,
    farY: 0,

    update: function(){

        const spriteset = BattleManager._spriteset;
        if(!spriteset) return;

        let battler = BattleManager._subject;

        // если сейчас выбор команды — берём текущего актёра
        if(!battler && SceneManager._scene instanceof Scene_Battle){
            const win = SceneManager._scene._actorCommandWindow;
            if(win && win.active){
                battler = win._actor;
            }
        }

        if(!battler) return;

        const sprite = spriteset.battlerSprites()
            .find(s => s._battler === battler);

        if(!sprite || !ready(sprite)) return;

        const h = sprite.bitmap.height;
        const ay = sprite.anchor ? sprite.anchor.y : 1;

        const cx = sprite.x;
        const cy = sprite.y - h * ay * 0.5;

        // 🔴 ЖЁСТКОЕ ЦЕНТРИРОВАНИЕ
        this.x = snap(Graphics.width * 0.5 - cx);
        this.y = snap(Graphics.height * 0.5 - cy);

        // FAR — очень мягкое отставание
        this.farX += (this.x - this.farX) * 0.02;
        this.farY += (this.y - this.farY) * 0.02;
    }
};

// -------------------------------------------------------------
// CREATE BACKGROUNDS
// -------------------------------------------------------------
const _createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function(){

    _createBattleback.call(this);

    if(this._back1Sprite) this._back1Sprite.visible = false;
    if(this._back2Sprite) this._back2Sprite.visible = false;

    this._cameraRoot = new Sprite();
    this._baseSprite.addChild(this._cameraRoot);

    // FAR
    this._farBack = new Sprite();
    this._cameraRoot.addChild(this._farBack);

    // MID + battlers
    this._baseSprite.removeChild(this._battleField);
    this._cameraRoot.addChild(this._battleField);

    this._midBack = new Sprite();
    this._battleField.addChildAt(this._midBack, 0);
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
};

// -------------------------------------------------------------
// PARALLAX
// -------------------------------------------------------------
Spriteset_Battle.prototype.updateParallax = function(){

    const sw = Graphics.width;
    const sh = Graphics.height;

    if(ready(this._farBack)){
        const bw = this._farBack.bitmap.width;
        const bh = this._farBack.bitmap.height;

        this._farBack.x = snap((sw - bw) / 2 - BattleCamera.farX * 0.05);
        this._farBack.y = snap((sh - bh) / 2 - BattleCamera.farY * 0.05);
    }

    if(ready(this._midBack)){
        const bw = this._midBack.bitmap.width;
        const bh = this._midBack.bitmap.height;

        this._midBack.x = snap((sw - bw) / 2);
        this._midBack.y = snap((sh - bh) / 2);
    }
};

// -------------------------------------------------------------
// UPDATE
// -------------------------------------------------------------
const _update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function(){

    _update.call(this);

    BattleCamera.update();
    this.updateCameraBacks();
    this.updateParallax();

    this._cameraRoot.x = BattleCamera.x;
    this._cameraRoot.y = BattleCamera.y;
};

})();

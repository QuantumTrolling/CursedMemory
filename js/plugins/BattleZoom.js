//=============================================================================
// BattleParallaxFollow.js
// Depth-based parallax battle backgrounds responding to camera position
//=============================================================================
/*:
 * @plugindesc Parallax background layers that follow the BattleZoom camera movement.
 * @author You
 */

var Imported = Imported || {};
Imported.BattleParallaxFollow = true;

(function(){

//-----------------------------------------------------------------------------
// DATA STORAGE
//-----------------------------------------------------------------------------
var _GameSystem_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _GameSystem_initialize.call(this);
    this._battleLayers = {};
};

//-----------------------------------------------------------------------------
// IMAGE LOADER
//-----------------------------------------------------------------------------
ImageManager.loadBattleLayer = function(filename) {
    return this.loadBitmap('img/layers/', filename, 0, true);
};

//-----------------------------------------------------------------------------
// PLUGIN COMMAND
//-----------------------------------------------------------------------------
var _GI_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _GI_pluginCommand.call(this, command, args);

    if (command === "BattleLayer") {
        if (args[0] === "ADD") {
            $gameSystem._battleLayers[Number(args[1])] = {
                graphic: args[2],
                depth: Number(args[3]),
                z: Number(args[4]),
                blend: Number(args[5])
            };
            if (SceneManager._scene instanceof Scene_Battle) {
                SceneManager._scene._spriteset.refreshBattleLayers();
            }
        }
        if (args[0] === "REMOVE") {
            delete $gameSystem._battleLayers[Number(args[1])];
            if (SceneManager._scene instanceof Scene_Battle) {
                SceneManager._scene._spriteset.refreshBattleLayers();
            }
        }
    }
};

//-----------------------------------------------------------------------------
// SPRITESET EXTENSION
//-----------------------------------------------------------------------------
var _SB_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _SB_createLowerLayer.call(this);

    this._parallaxBack = new Sprite();
    this._parallaxFront = new Sprite();

    this.addChildAt(this._parallaxBack, 0);
    this.addChild(this._parallaxFront);

    this._battleLayerSprites = {};
    this.refreshBattleLayers();
};

Spriteset_Battle.prototype.refreshBattleLayers = function() {
    var data = $gameSystem._battleLayers;

    for (var id in this._battleLayerSprites) {
        var spr = this._battleLayerSprites[id];
        if (spr.parent) spr.parent.removeChild(spr);
    }
    this._battleLayerSprites = {};

    for (var id in data) {
        var sprite = new Sprite_BattleLayer(Number(id));
        this._battleLayerSprites[id] = sprite;
        if (data[id].z === 0) this._parallaxBack.addChild(sprite);
        else this._parallaxFront.addChild(sprite);
    }
};

var _SB_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    _SB_update.call(this);
    if (!window.BattleCamera) return;

    var cx = BattleCamera.x;
    var cy = BattleCamera.y;
    var cs = BattleCamera.scale;

    this._parallaxBack.x = -cx * 0.2;
    this._parallaxBack.y = -cy * 0.2;
    this._parallaxFront.x = -cx * 0.8;
    this._parallaxFront.y = -cy * 0.8;

    this._parallaxBack.scale.x = 1 / cs;
    this._parallaxBack.scale.y = 1 / cs;
    this._parallaxFront.scale.x = 1 / cs;
    this._parallaxFront.scale.y = 1 / cs;
};

//-----------------------------------------------------------------------------
// LAYER SPRITE
//-----------------------------------------------------------------------------
function Sprite_BattleLayer() {
    this.initialize.apply(this, arguments);
}

Sprite_BattleLayer.prototype = Object.create(Sprite.prototype);
Sprite_BattleLayer.prototype.constructor = Sprite_BattleLayer;

Sprite_BattleLayer.prototype.initialize = function(id) {
    Sprite.prototype.initialize.call(this);
    this._id = id;
    this.updateBitmap();
};

Sprite_BattleLayer.prototype.data = function() {
    return $gameSystem._battleLayers[this._id];
};

Sprite_BattleLayer.prototype.update = function() {
    Sprite.prototype.update.call(this);
};

Sprite_BattleLayer.prototype.updateBitmap = function() {
    var d = this.data();
    if (!d) return;
    this.bitmap = ImageManager.loadBattleLayer(d.graphic);
    this.blendMode = d.blend || 0;
};

})();

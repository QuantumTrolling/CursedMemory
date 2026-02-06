//=============================================================================
// OctopathLikeBattleCamera_CTB_PIXELPERFECT_CENTERED.js
//=============================================================================
/*:
 * @plugindesc Pixel-perfect battle camera for RPG Maker MV + YEP CTB.
 * No blur, no sway, no skew. Camera centers exactly on battler body.
 * @author ChatGPT
 */

(function() {
'use strict';

// -----------------------------------------------------------------------------
// GLOBAL NO-BLUR FIX
// -----------------------------------------------------------------------------
if (window.PIXI) {
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
}

// -----------------------------------------------------------------------------
// UTILS
// -----------------------------------------------------------------------------
function snap(value) {
    return Math.round(value);
}

function snapScale(value) {
    if (value >= 1.125) return 1.125;
    if (value >= 1.0625) return 1.0625;
    return 1.0;
}

function findBattlerSprite(battler) {
    if (!BattleManager._spriteset || !battler) return null;
    var sprites = BattleManager._spriteset.battlerSprites();
    for (var i = 0; i < sprites.length; i++) {
        if (sprites[i]._battler === battler) return sprites[i];
    }
    return null;
}

// Центр корпуса спрайта (НЕ по ногам)
function getSpriteCenter(sprite) {
    if (!sprite || !sprite.bitmap || !sprite.bitmap.isReady()) {
        return { x: sprite.x, y: sprite.y };
    }

    var height = sprite.bitmap.height;
    var anchorY = sprite.anchor ? sprite.anchor.y : 1;

    return {
        x: sprite.x,
        y: sprite.y - (height * anchorY / 2)
    };
}

// -----------------------------------------------------------------------------
// BATTLE CAMERA CORE
// -----------------------------------------------------------------------------
var BattleCamera = {
    x: 0,
    y: 0,
    scale: 1.0,

    tx: 0,
    ty: 0,
    tScale: 1.0,

    followSprite: null,
    focusedBattler: null,
    forcedCenter: false,

    speed: 0.15,

    update: function() {
        if (this.forcedCenter) {
            this.tx = 0;
            this.ty = 0;
        } else if (this.followSprite) {
            var center = getSpriteCenter(this.followSprite);
            this.tx = Graphics.width / 2 - center.x;
            this.ty = Graphics.height / 2 - center.y;
        }

        this.x += (this.tx - this.x) * this.speed;
        this.y += (this.ty - this.y) * this.speed;
        this.scale += (this.tScale - this.scale) * this.speed;

        // PIXEL LOCK
        this.x = snap(this.x);
        this.y = snap(this.y);
        this.scale = snapScale(this.scale);
    },

    focus: function(sprite, battler, scale) {
        if (!sprite || this.focusedBattler === battler) return;
        this.focusedBattler = battler;
        this.followSprite = sprite;
        this.forcedCenter = false;
        this.tScale = scale || 1.0625;
    },

    focusCenter: function() {
        this.forcedCenter = true;
        this.focusedBattler = null;
        this.followSprite = null;
        this.tScale = 1.0;
    },

    soften: function() {
        this.forcedCenter = false;
        this.focusedBattler = null;
        this.tScale = 1.0;
    }
};

// -----------------------------------------------------------------------------
// SPRITESET_BATTLE UPDATE
// -----------------------------------------------------------------------------
var _SB_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    _SB_update.call(this);

    BattleCamera.update();

    var bf = this._battleField;
    bf.x = BattleCamera.x;
    bf.y = BattleCamera.y;
    bf.scale.x = BattleCamera.scale;
    bf.scale.y = BattleCamera.scale;

    // NEAREST для всех баттлеров (страховка от блюра)
    var sprites = this.battlerSprites();
    for (var i = 0; i < sprites.length; i++) {
        if (sprites[i].texture && sprites[i].texture.baseTexture) {
            sprites[i].texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        }
    }

    // Статичный фон без зума
    if (this._customBattleback && this._customBattleback.bitmap.isReady()) {
        var sw = Graphics.width;
        var sh = Graphics.height;
        var bw = this._customBattleback.bitmap.width;
        var bh = this._customBattleback.bitmap.height;

        this._customBattleback.scale.x = 1;
        this._customBattleback.scale.y = 1;
        this._customBattleback.x = snap((sw - bw) / 2);
        this._customBattleback.y = snap((sh - bh) / 2);
    }
};

// -----------------------------------------------------------------------------
// ACTOR TURN (CTB / COMMAND SELECTION)
// -----------------------------------------------------------------------------
var _SceneBattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _SceneBattle_update.call(this);

    if ((this._skillWindow && this._skillWindow.active) ||
        (this._actorCommandWindow && this._actorCommandWindow.active)) {

        var actor = this._actorCommandWindow._actor;
        if (actor) {
            BattleCamera.focus(
                findBattlerSprite(actor),
                actor,
                1.0625
            );
        }
    }

    if ((this._enemyWindow && this._enemyWindow.active) ||
        (this._actorWindow && this._actorWindow.active)) {
        BattleCamera.focusCenter();
    }
};

// -----------------------------------------------------------------------------
// ENEMY / ACTION START
// -----------------------------------------------------------------------------
var _BM_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    _BM_startAction.call(this);

    var subject = this._subject;
    if (!subject) return;

    var sprite = findBattlerSprite(subject);
    if (sprite) {
        BattleCamera.focus(
            sprite,
            subject,
            subject.isEnemy() ? 1.0625 : 1.125
        );
    }
};

// -----------------------------------------------------------------------------
// END ACTION
// -----------------------------------------------------------------------------
var _BM_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    _BM_endAction.call(this);
    BattleCamera.soften();
};

})();

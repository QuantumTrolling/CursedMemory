//=============================================================================
// OctopathLikeBattleCamera_CTB_StaticBG_NoSway_NoSkew.js
//=============================================================================
/*:
 * @plugindesc Камера для MV + YEP CTB с фоном без sway и наклона, только зум и следование за персонажами
 * @author ChatGPT
 */

(function() {
'use strict';

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------
function findBattlerSprite(battler) {
    if (!BattleManager._spriteset || !battler) return null;
    var sprites = BattleManager._spriteset.battlerSprites();
    for (var i = 0; i < sprites.length; i++) {
        if (sprites[i]._battler === battler) return sprites[i];
    }
    return null;
}

// -----------------------------------------------------------------------------
// Battle Camera Core
// -----------------------------------------------------------------------------
var BattleCamera = {
    x: 0,
    y: 0,
    scale: 1.0,
    skew: 0.0,

    tx: 0,
    ty: 0,
    tScale: 1.0,
    tSkew: 0.0,

    followSprite: null,
    focusedBattler: null,
    forcedCenter: false,
    offsetY: 0,

    speed: 0.15,

    update: function() {
        // Плавное движение камеры без sway и наклона
        if (this.forcedCenter) {
            this.tx = 0;
            this.ty = 0;
        } else if (this.followSprite) {
            this.tx = Graphics.width / 2 - this.followSprite.x;
            this.ty = Graphics.height / 2 - (this.followSprite.y + this.offsetY);
        }

        this.x += (this.tx - this.x) * this.speed;
        this.y += (this.ty - this.y) * this.speed;
        this.scale += (this.tScale - this.scale) * this.speed;
        this.skew += (this.tSkew - this.skew) * this.speed;
    },

    focus: function(sprite, battler, scale, offsetY) {
        if (!sprite || this.focusedBattler === battler) return;
        this.focusedBattler = battler;
        this.followSprite = sprite;
        this.forcedCenter = false;
        this.tScale = scale || 1.08;
        this.tSkew = 0; // наклон убран
        this.offsetY = offsetY || 0;
    },

    focusCenter: function() {
        this.forcedCenter = true;
        this.focusedBattler = null;
        this.followSprite = null;
        this.tScale = 1.0;
        this.tSkew = 0;
        this.offsetY = 0;
    },

    soften: function() {
        this.forcedCenter = false;
        this.focusedBattler = null;
        this.tScale = 1.02;
        this.tSkew = 0;
        this.offsetY = 0;
    }
};

// -----------------------------------------------------------------------------
// Spriteset_Battle update
// -----------------------------------------------------------------------------
var _SB_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    _SB_update.call(this);

    BattleCamera.update();

    // 1. Battlefield (персонажи + враги + попапы)
    var bf = this._battleField;
    bf.x = BattleCamera.x;
    bf.y = BattleCamera.y;
    bf.scale.x = BattleCamera.scale;
    bf.scale.y = BattleCamera.scale;
    bf.skew.x = BattleCamera.skew;

    // 2. Персонажи и враги получают skew
    var sprites = this.battlerSprites();
    for (var i = 0; i < sprites.length; i++) {
        sprites[i].skew.x = BattleCamera.skew;
    }

    // 3. Фоновый спрайт статичен и центрирован
    if (this._customBattleback && this._customBattleback.bitmap.isReady()) {
        const screenWidth = Graphics.width;
        const screenHeight = Graphics.height;
        const bgWidth = this._customBattleback.bitmap.width;
        const bgHeight = this._customBattleback.bitmap.height;

        this._customBattleback.scale.x = 1;
        this._customBattleback.scale.y = 1;
        this._customBattleback.x = (screenWidth - bgWidth) / 2;
        this._customBattleback.y = (screenHeight - bgHeight) / 2;
    }
};

// -----------------------------------------------------------------------------
// ACTOR TURN
// -----------------------------------------------------------------------------
var _SceneBattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _SceneBattle_update.call(this);

    if (this._actorCommandWindow && this._actorCommandWindow.active) {
        var actor = this._actorCommandWindow._actor;
        if (actor) {
            BattleCamera.focus(
                findBattlerSprite(actor),
                actor,
                1.08,
                0
            );
        }
    }

    if ((this._enemyWindow && this._enemyWindow.active) || 
        (this._actorWindow && this._actorWindow.active)) {
        BattleCamera.focusCenter();
    }
};

// -----------------------------------------------------------------------------
// ENEMY TURN
// -----------------------------------------------------------------------------
var _BM_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    _BM_startAction.call(this);

    var subject = this._subject;
    if (!subject) return;

    var sprite = findBattlerSprite(subject);
    if (sprite) {
        var enemyFocusOffset = -80;
        var offsetY = subject.isEnemy() ? enemyFocusOffset : 0;
        BattleCamera.focus(
            sprite,
            subject,
            subject.isEnemy() ? 1.06 : 1.1,
            offsetY
        );
    }
};

// -----------------------------------------------------------------------------
// Action start → keep following during movement
// -----------------------------------------------------------------------------
var _WBL_performActionStart = Window_BattleLog.prototype.performActionStart;
Window_BattleLog.prototype.performActionStart = function(subject, action) {
    _WBL_performActionStart.call(this, subject, action);

    if (!subject) return;
    var sprite = findBattlerSprite(subject);
    if (!sprite) return;

    var enemyFocusOffset = -80;
    var offsetY = subject.isEnemy() ? enemyFocusOffset : 0;
    BattleCamera.followSprite = sprite;
    BattleCamera.forcedCenter = false;
    BattleCamera.tScale = subject.isEnemy() ? 1.12 : 1.14;
    BattleCamera.tSkew = 0; // наклон убран
    BattleCamera.offsetY = offsetY;
};

// -----------------------------------------------------------------------------
// End action → мягко отпустить камеру
// -----------------------------------------------------------------------------
var _BM_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    _BM_endAction.call(this);
    BattleCamera.soften();
};

// -----------------------------------------------------------------------------
// Попапы привязаны к персонажам
// -----------------------------------------------------------------------------
var _SD_setup = Sprite_Damage.prototype.setup;
Sprite_Damage.prototype.setup = function(target) {
    _SD_setup.call(this, target);

    this.x += BattleCamera.x;
    this.y += BattleCamera.y;
};
})();
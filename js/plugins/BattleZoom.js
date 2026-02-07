//=============================================================================
// OctopathLikeBattleCamera_CTB_PIXELPERFECT_CENTERED.js
//=============================================================================
/*:
 * @plugindesc Pixel-perfect battle camera for RPG Maker MV + YEP CTB.
 * No blur, no sway, no skew. Camera centers exactly on battler body.
 * @author ChatGPT
 */

/*:
* @plugindesc Свободная камера для битвы с большими battlebacks. Фон статичен, камера плавно следует за персонажами/врагами.
* @author ChatGPT
*
* @param Camera Speed
* @text Скорость камеры
* @type number
* @default 10
*
* @param Camera Smooth
* @text Плавность движения камеры (0-1)
* @type number
* @decimals 2
* @default 0.2
*
* @help
* Перед битвой можно задать нужный фон:
* $gameTemp.battleCameraBattleback = "FieldBattle"; // имя файла из img/battlebacks1
*
* Камера управляется стрелками или программно:
* $gameTemp._battleCameraTarget.x = число;
* $gameTemp._battleCameraTarget.y = число;
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

// -----------------------------------------------------------------------------
// ДОБАВЛЕНИЕ ВТОРОГО СЛОЯ БОЕВОГО ФОНА
// -----------------------------------------------------------------------------
var _SB_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function() {
    _SB_initialize.call(this);

    // Второй фон под основным
    this._customBattlebackLayer2 = null;
    if ($gameTemp.battleCameraBattlebackLayer2) {
        var filename = $gameTemp.battleCameraBattlebackLayer2;
        this._customBattlebackLayer2 = new Sprite(ImageManager.loadBattleback1(filename));
        this._battleField.addChildAt(this._customBattlebackLayer2, 0); // под всеми объектами
    }
};

// -----------------------------------------------------------------------------
// UPDATE ДЛЯ ВТОРОГО СЛОЯ ФОНА
// -----------------------------------------------------------------------------
var _SB_update_customBattleback = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    _SB_update_customBattleback.call(this);

    // ---------- Второй слой ----------
    if (this._customBattlebackLayer2 && this._customBattlebackLayer2.bitmap.isReady()) {
        var sw = Graphics.width;
        var sh = Graphics.height;
        var bw = this._customBattlebackLayer2.bitmap.width;
        var bh = this._customBattlebackLayer2.bitmap.height;

        this._customBattlebackLayer2.scale.x = 1;
        this._customBattlebackLayer2.scale.y = 1;
        this._customBattlebackLayer2.x = snap((sw - bw) / 2);
        this._customBattlebackLayer2.y = snap((sh - bh) / 2);
    }
};

const parameters = PluginManager.parameters('FreeBattleCameraStable');
const cameraSpeed = Number(parameters['Camera Speed'] || 10);
const cameraSmooth = Number(parameters['Camera Smooth'] || 0.2);


// -----------------------------
// Инициализация камеры
// -----------------------------
const _Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
_Game_Temp_initialize.call(this);
this.battleCamera = { x: 0, y: 0 }; // координаты камеры для персонажей
this.battleCameraBattleback = null; // имя battleback
this._battleCameraTarget = { x: 0, y: 0 };
};


// -----------------------------
// Создание кастомного фонового спрайта
// -----------------------------
const _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function() {
_Scene_Battle_createSpriteset.call(this);


const backFile = $gameTemp.battleCameraBattleback || $dataSystem.battleback1Name;
this._customBattleback = new Sprite();
this._customBattleback.bitmap = ImageManager.loadBattleback1(backFile);
this._spriteset._battleField.addChildAt(this._customBattleback, 0);
};


// -----------------------------
// Обновление фонового спрайта
// -----------------------------
const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
_Scene_Battle_update.call(this);


if (this._customBattleback && this._customBattleback.bitmap.isReady()) {
const screenWidth = Graphics.width;
const screenHeight = Graphics.height;
const bgWidth = this._customBattleback.bitmap.width;
const bgHeight = this._customBattleback.bitmap.height;


// -----------------------------
// Делаем фон статичным (абсолютно)
// -----------------------------
this._customBattleback.scale.x = 1;
this._customBattleback.scale.y = 1;

var PARALLAX_FACTOR_LAYER2 = 0.5;
var offsetX = BattleCamera.x * PARALLAX_FACTOR_LAYER2;
var offsetY = BattleCamera.y * PARALLAX_FACTOR_LAYER2;

this._customBattleback.x = snap((screenWidth - bgWidth) / 2 + offsetX);
this._customBattleback.y = snap((screenHeight - bgHeight) / 2 + offsetY);


// -----------------------------
// Камера персонажей
// -----------------------------
if ($gameTemp.battleCamera) {
const cam = $gameTemp.battleCamera;


// Управление стрелками
if (Input.isPressed('left')) $gameTemp._battleCameraTarget.x -= cameraSpeed;
if (Input.isPressed('right')) $gameTemp._battleCameraTarget.x += cameraSpeed;
if (Input.isPressed('up')) $gameTemp._battleCameraTarget.y -= cameraSpeed;
if (Input.isPressed('down')) $gameTemp._battleCameraTarget.y += cameraSpeed;


// Плавное движение камеры за персонажами
cam.x += ($gameTemp._battleCameraTarget.x - cam.x) * cameraSmooth;
cam.y += ($gameTemp._battleCameraTarget.y - cam.y) * cameraSmooth;
}
}
};

})();
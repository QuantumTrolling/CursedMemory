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

// Убираем размытие (антиалиасинг) для всех спрайтов, чтобы пиксели оставались четкими
if (window.PIXI) {
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
}

// -----------------------------------------------------------------------------
// UTILS (вспомогательные функции)
// -----------------------------------------------------------------------------

// Привязка координаты к целому числу (для пиксель-перфект эффекта)
function snap(value) {
    return Math.round(value);
}

// Привязка масштаба к заранее определенным шагам
// Ограничивает масштаб, чтобы не было слишком сильного увеличения
function snapScale(value) {
    if (value >= 1.125) return 1.125;
    if (value >= 1.0625) return 1.0625;
    return 1.0;
}

// Находим спрайт конкретного баттлера на поле боя
function findBattlerSprite(battler) {
    if (!BattleManager._spriteset || !battler) return null;
    var sprites = BattleManager._spriteset.battlerSprites();
    for (var i = 0; i < sprites.length; i++) {
        if (sprites[i]._battler === battler) return sprites[i];
    }
    return null;
}

// Возвращает координаты центра спрайта (по середине тела, а не ног)
// Используется для правильного фокусирования камеры на персонаже
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
    // Текущие координаты камеры
    x: 0,
    y: 0,
    scale: 1.0,

    // Целевые координаты камеры (куда должна двигаться)
    tx: 0,
    ty: 0,
    tScale: 1.0,

    followSprite: null,       // спрайт, за которым камера следует
    focusedBattler: null,     // баттлер, на котором фокус
    forcedCenter: false,      // если true, камера центрируется по центру экрана

    speed: 0.15,              // скорость движения камеры (чем выше, тем быстрее)

    // Обновление позиции камеры
    update: function() {
        if (this.forcedCenter) {
            // Если требуется центр по экрану, цель всегда (0,0)
            this.tx = 0;
            this.ty = 0;
        } else if (this.followSprite) {
            // Если есть спрайт для слежения, центрируем камеру на него
            var center = getSpriteCenter(this.followSprite);
            this.tx = Graphics.width / 2 - center.x;
            this.ty = Graphics.height / 2 - center.y;
        }

        // Плавное движение камеры к целевой позиции
        this.x += (this.tx - this.x) * this.speed;
        this.y += (this.ty - this.y) * this.speed;
        this.scale += (this.tScale - this.scale) * this.speed;

        // Привязка к пикселям для "pixel-perfect"
        this.x = snap(this.x);
        this.y = snap(this.y);
        this.scale = snapScale(this.scale);
    },

    // Фокус на конкретный спрайт/баттлер
    focus: function(sprite, battler, scale) {
        if (!sprite || this.focusedBattler === battler) return;
        this.focusedBattler = battler;
        this.followSprite = sprite;
        this.forcedCenter = false;
        this.tScale = scale || 1.0625; // немного увеличиваем персонажа
    },

    // Центрирование камеры на экран
    focusCenter: function() {
        this.forcedCenter = true;
        this.focusedBattler = null;
        this.followSprite = null;
        this.tScale = 1.0;
    },

    // Плавное возвращение к стандартной позиции
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

    // Обновляем позицию камеры
    BattleCamera.update();

    // Применяем координаты и масштаб к полю боя
    var bf = this._battleField;
    bf.x = BattleCamera.x;
    bf.y = BattleCamera.y;
    bf.scale.x = BattleCamera.scale;
    bf.scale.y = BattleCamera.scale;

    // Применяем NEAREST масштаб для всех баттлеров (чтобы избежать размытия)
    var sprites = this.battlerSprites();
    for (var i = 0; i < sprites.length; i++) {
        if (sprites[i].texture && sprites[i].texture.baseTexture) {
            sprites[i].texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        }
    }

    // Статичный фон без масштабирования (фиксируем по центру экрана)
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

// ---------- ACTOR / ENEMY TURN (CTB / COMMAND SELECTION) ----------
var _SceneBattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _SceneBattle_update.call(this);

    // Определяем активного баттлера (актора или врага)
    var activeBattler = null;

    if ((this._skillWindow && this._skillWindow.active) ||
        (this._actorCommandWindow && this._actorCommandWindow.active)) {
        activeBattler = this._actorCommandWindow._actor;
    } else if ((this._enemyWindow && this._enemyWindow.active) ||
               (this._enemyWindow && this._enemyWindow.activeBattler)) { // для врагов
        activeBattler = this._enemyWindow._enemy; // здесь берём активного врага, если используется YEP CTB
    } else if (BattleManager._subject) {
        activeBattler = BattleManager._subject; // fallback — текущий субъект действия
    }

    if (activeBattler) {
        var sprite = findBattlerSprite(activeBattler);
        if (sprite) {
            BattleCamera.focusCenter(); // центрируем по экрану
            BattleCamera.focus(sprite, activeBattler, 1.125); // увеличиваем активного баттлера
        }
    } else {
        // Если активного баттлера нет — мягко возвращаем камеру к стандартной позиции
        BattleCamera.soften();
    }
};


// -----------------------------------------------------------------------------
// END ACTION
// -----------------------------------------------------------------------------

var _BM_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    _BM_endAction.call(this);
    BattleCamera.soften(); // Плавное возвращение камеры к стандартной позиции
};

// -----------------------------------------------------------------------------
// ПАРАМЕТРЫ ПЛАГИНА
// -----------------------------------------------------------------------------

const parameters = PluginManager.parameters('FreeBattleCameraStable');
const cameraSpeed = Number(parameters['Camera Speed'] || 10);
const cameraSmooth = Number(parameters['Camera Smooth'] || 0.2);

// -----------------------------
// Инициализация камеры в $gameTemp
// -----------------------------

const _Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize.call(this);
    this.battleCamera = { x: 0, y: 0 };          // координаты камеры для персонажей
    this.battleCameraBattleback = null;          // имя выбранного battleback
    this._battleCameraTarget = { x: 0, y: 0 };   // целевая точка для плавного движения камеры
};

// -----------------------------
// Инициализация фоновых слоев battleback
// -----------------------------
var _SB_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function() {
    _SB_initialize.call(this);

    const backFile = $gameTemp.battleCameraBattleback || $dataSystem.battleback1Name;
    const layer2File = $gameTemp.battleCameraBattlebackLayer2;

    // ---------- Layer1 (параллакс) ----------
    this._customBattleback = new Sprite();
    this._customBattleback.bitmap = ImageManager.loadBattleback1(backFile);
    this._customBattlebackContainer = new Sprite(); // отдельный контейнер
    this._customBattlebackContainer.addChild(this._customBattleback);
    this.addChild(this._customBattlebackContainer); // добавляем в сцену

    // ---------- Layer2 (статичный) ----------
    this._customBattlebackLayer2 = null;
    this._customBattlebackLayer2Container = new Sprite(); // отдельный контейнер
    if (layer2File) {
        this._customBattlebackLayer2 = new Sprite(ImageManager.loadBattleback1(layer2File));
        this._customBattlebackLayer2Container.addChild(this._customBattlebackLayer2);
    }
    this.addChild(this._customBattlebackLayer2Container); // всегда выше Layer1

    // ---------- _battleField (актёры/враги) ----------
    // стандартный _battleField уже добавлен в _SB_initialize
    // гарантируем, что он поверх обоих контейнеров
    this.addChild(this._battleField);

    // ---------- Лог для проверки порядка ----------
    console.log("BattleField children order after initialize:");
    this.children.forEach((c, i) => {
        if (c === this._customBattlebackContainer) console.log(i, "Layer1 Container");
        else if (c === this._customBattlebackLayer2Container) console.log(i, "Layer2 Container");
        else if (c === this._battleField) console.log(i, "_battleField (Actors)");
        else console.log(i, c);
    });
};

// ---------- BATTLE BACKS UPDATE ----------

const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _Scene_Battle_update.call(this);

    if (!this._spriteset) return;

    const ss = this._spriteset;
    const sw = Graphics.width;
    const sh = Graphics.height;

    // ---------- Layer1 (параллакс) ----------
    if (ss._customBattleback && ss._customBattleback.bitmap.isReady()) {
        const bw = ss._customBattleback.bitmap.width;
        const bh = ss._customBattleback.bitmap.height;
		const bh2 = ss._customBattlebackLayer2.bitmap.height;
        const PARALLAX_FACTOR = 0.5;

        const offsetX = BattleCamera.x * PARALLAX_FACTOR;
        const offsetY = BattleCamera.y * PARALLAX_FACTOR;

        ss._customBattleback.x = snap((sw - bw) / 2 + offsetX);
        ss._customBattleback.y = snap((sh - bh2) / 2 + BattleCamera.y);
    }

    // ---------- Layer2 (статичный) ----------
    if (ss._customBattlebackLayer2 && ss._customBattlebackLayer2.bitmap.isReady()) {
        const bw2 = ss._customBattlebackLayer2.bitmap.width;
        const bh2 = ss._customBattlebackLayer2.bitmap.height;

		ss._customBattlebackLayer2.x = snap((sw - bw2) / 2 + BattleCamera.x);
		ss._customBattlebackLayer2.y = snap((sh - bh2) / 2 + BattleCamera.y);
    }

    // ---------- Плавное движение камеры за персонажами ----------
    if ($gameTemp.battleCamera) {
        const cam = $gameTemp.battleCamera;
        cam.x += ($gameTemp._battleCameraTarget.x - cam.x) * cameraSmooth;
        cam.y += ($gameTemp._battleCameraTarget.y - cam.y) * cameraSmooth;
    }
};

})();

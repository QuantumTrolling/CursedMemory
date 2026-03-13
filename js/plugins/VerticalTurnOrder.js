/*:
 * @plugindesc v1.9 CTB Vertical Turn Order (With Future Clone Preview)
 * @author You
 *
 * @param HorizontalAlign
 * @type select
 * @option Left
 * @option Center
 * @option Right
 * @default Right
 *
 * @param VerticalAlign
 * @type select
 * @option Top
 * @option Center
 * @option Bottom
 * @default Top
 *
 * @param OffsetX
 * @type number
 * @default 0
 *
 * @param OffsetY
 * @type number
 * @default 0
 *
 * @param FrameImage
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param AllyBarColor
 * @text Цвет полосы союзников
 * @desc CSS цвет (например #00ff00)
 * @default #00ff00
 *
 * @param EnemyBarColor
 * @text Цвет полосы врагов
 * @desc CSS цвет (например #ff0000)
 * @default #ff0000
 *
 * @param BarWidth
 * @text Ширина полосы
 * @type number
 * @default 4
 */

(function() {

const params = PluginManager.parameters(document.currentScript.src.match(/([^/]+)\.js$/)[1]);

const H_ALIGN   = params.HorizontalAlign;
const V_ALIGN   = params.VerticalAlign;
const OFFSET_X  = Number(params.OffsetX || 0);
const OFFSET_Y  = Number(params.OffsetY || 0);
const FRAME_IMAGE = params.FrameImage || "";

const ALLY_COLOR  = String(params.AllyBarColor || "#00ff00");
const ENEMY_COLOR = String(params.EnemyBarColor || "#ff0000");
const BAR_WIDTH   = Number(params.BarWidth || 4);

const VISIBLE_COUNT = 6;
const ICON_GAP    = 6;
const ACTIVE_GAP  = 10;
const ACTIVE_LIFT = 10;

// ==================================================
// РАМКА + ЦВЕТНАЯ ПОЛОСА (для основных плашек)
// ==================================================

Window_CTBIcon.prototype.createFrameSprite = function() {
  if (!FRAME_IMAGE) return;
  if (this._frameSprite) return;

  this._frameSprite = new Sprite();
  this._frameSprite.bitmap = ImageManager.loadPicture(FRAME_IMAGE);

  this._frameSprite.bitmap.addLoadListener(() => {
    const fw = this._frameSprite.bitmap.width;
    const fh = this._frameSprite.bitmap.height;

    this._frameSprite.x = (this.width - fw) / 2;
    this._frameSprite.y = (this.height - fh) / 2;

    this.addChildToBack(this._frameSprite);

    if (this._windowContentsSprite) {
      this._windowContentsSprite.x = (this.width - this.iconWidth()) / 2;
      this._windowContentsSprite.y = (this.height - this.iconHeight()) / 2;
    }

    this.createSideBar(fw, fh);
  });
};

Window_CTBIcon.prototype.createSideBar = function(fw, fh) {
  if (this._sideBar) return;

  this._sideBar = new Sprite(new Bitmap(BAR_WIDTH, fh));
  this._sideBar.x = this._frameSprite.x + fw - BAR_WIDTH;
  this._sideBar.y = this._frameSprite.y;
  this.addChild(this._sideBar);
  this.refreshSideBar();
};

Window_CTBIcon.prototype.refreshSideBar = function() {
  if (!this._sideBar || !this._battler) return;
  const color = this._battler.isActor() ? ALLY_COLOR : ENEMY_COLOR;
  this._sideBar.bitmap.clear();
  this._sideBar.bitmap.fillAll(color);
};

// ==================================================
// УТИЛИТЫ
// ==================================================

Window_CTBIcon.prototype.ctbSpacing = function() {
  if (this._frameSprite && this._frameSprite.bitmap.isReady()) {
    return this._frameSprite.bitmap.height + 6;
  }
  return this.iconHeight() + ICON_GAP;
};

Window_CTBIcon.prototype.isFirstInQueue = function() {
  const order = BattleManager.ctbTurnOrder();
  return order && order[0] === this._battler;
};

// ==================================================
// БАЗОВАЯ ПОЗИЦИЯ
// ==================================================

Window_CTBIcon.prototype.baseX = function() {
  const margin = 8;
  let x = 0;
  switch (H_ALIGN) {
    case "Left":   x = margin; break;
    case "Center": x = (Graphics.boxWidth - this.width) / 2; break;
    case "Right":  x = Graphics.boxWidth - this.width - margin; break;
  }
  return x + OFFSET_X;
};

Window_CTBIcon.prototype.baseY = function() {
  const margin = 8;
  let y = 0;
  switch (V_ALIGN) {
    case "Top":     y = margin; break;
    case "Center":  y = Graphics.boxHeight / 2 - (this.ctbSpacing() * VISIBLE_COUNT) / 2; break;
    case "Bottom":  y = Graphics.boxHeight - (this.ctbSpacing() * VISIBLE_COUNT) - margin; break;
  }
  return y + OFFSET_Y;
};

// ==================================================
// ПОЗИЦИЯ В ОЧЕРЕДИ
// ==================================================

Window_CTBIcon.prototype.destinationY = function() {
  const order = BattleManager.ctbTurnOrder();
  if (!order) return this.baseY();

  const index = order.indexOf(this._battler);
  if (index < 0) return this.baseY();

  let y = this.baseY() + index * this.ctbSpacing();
  if (index === 0) y -= ACTIVE_LIFT;
  if (index > 0) y += ACTIVE_GAP;
  return y;
};

Window_CTBIcon.prototype.updateDestinationX = function() {
  this._destinationX = this.baseX();
};

// ==================================================
// ПЛАВНОЕ ДВИЖЕНИЕ
// ==================================================

Window_CTBIcon.prototype.updatePositionY = function() {
  const desY = this.destinationY();
  const move = Math.max(1, Math.abs(desY - this.y) / 4);
  if (this.y > desY) this.y = Math.max(this.y - move, desY);
  if (this.y < desY) this.y = Math.min(this.y + move, desY);
};

// ==================================================
// ВИДИМОСТЬ И ПОДСВЕТКА
// ==================================================

Window_CTBIcon.prototype.updateCTBVisibility = function() {
  const order = BattleManager.ctbTurnOrder();
  if (!order) return;
  const index = order.indexOf(this._battler);
  this.visible = index >= 0 && index < VISIBLE_COUNT;
};

Window_CTBIcon.prototype.updateCTBHighlight = function() {
  if (!this.isFirstInQueue()) {
    this.contentsOpacity = 255;
    this._pulse = 0;
    return;
  }
  this._pulse = (this._pulse || 0) + 0.1;
  this.contentsOpacity = 210 + Math.sin(this._pulse) * 45;
};

// ==================================================
// ОСНОВНОЙ UPDATE (без призрака)
// ==================================================

const _Window_CTBIcon_update = Window_CTBIcon.prototype.update;
Window_CTBIcon.prototype.update = function() {
  _Window_CTBIcon_update.call(this);
  if (!this._battler) return;

  this.createFrameSprite();
  this.refreshSideBar();
  this.updateCTBHighlight();
  this.updateCTBVisibility();
};

// ==================================================
// CLONE TURN PREVIEW — КОПИЯ ПЛАШКИ В БУДУЩЕМ МЕСТЕ
// ==================================================

let _ctbCloneWindow = null;

// ---- Расчёт будущих тиков с учётом выбранного навыка
Game_Battler.prototype.calcFutureTicksWithItem = function(item) {
    let futureSpeed;
    if (item) {
        if (item.afterCTBFlat !== undefined) {
            futureSpeed = item.afterCTBFlat;
        } else if (item.afterCTBRate !== undefined) {
            futureSpeed = item.afterCTBRate * BattleManager.ctbTarget();
        } else if (item.speed > 0) {
            futureSpeed = item.speed;
        } else {
            futureSpeed = 0;
        }
    } else {
        futureSpeed = 0;
    }
    futureSpeed += BattleManager.ctbTarget() * this.ctbTurnRate() + this.ctbTurnFlat();
    const goal = BattleManager.ctbTarget();
    if (futureSpeed >= goal) return 0;
    return (goal - futureSpeed) / this.ctbSpeedTick();
};

// ---- Найти будущий индекс в очереди с учётом предмета
function calcFutureIndexForBattler(battler, testItem) {
    const futureTicks = battler.calcFutureTicksWithItem(testItem);

    const members = $gameParty.aliveMembers().concat($gameTroop.aliveMembers());

    const ticksArray = members.map(b => {
        if (b === battler) return futureTicks;
        return b.ctbTicksToReady();
    });

    const sorted = ticksArray.slice().sort((a, b) => a - b);
    const epsilon = 0.0001;
    for (let i = 0; i < sorted.length; i++) {
        if (Math.abs(sorted[i] - futureTicks) < epsilon) return i;
    }
    return -1;
}

// ==================================================
// ОКНО КОПИИ
// ==================================================

function Window_CTBClone() {
    this.initialize.apply(this, arguments);
}

Window_CTBClone.prototype = Object.create(Window_CTBIcon.prototype);
Window_CTBClone.prototype.constructor = Window_CTBClone;

Window_CTBClone.prototype.initialize = function() {
    const width  = this.iconWidth() + 8 + this.standardPadding() * 2;
    const height = this.iconHeight() + 8 + this.standardPadding() * 2;
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.opacity = 0;
    this.contentsOpacity = 160; // полупрозрачный
    this._battler = null;
    this._futureIndex = -1;
};

// ---- Установить баттлера
Window_CTBClone.prototype.setBattler = function(battler) {
    if (this._battler === battler) return;
    this._battler = battler;
    this._iconIndex = battler ? battler.ctbIcon() : 0;
    this.loadBattlerImage();
    this.refresh();
};

// ---- Загрузка изображения (адаптировано из Window_CTBIcon)
Window_CTBClone.prototype.loadBattlerImage = function() {
    if (!this._battler) return;
    if (this._iconIndex > 0) {
        this._image = ImageManager.loadSystem('IconSet');
    } else if (this._battler.isEnemy()) {
        const battlerName = this._battler.battlerName();
        const battlerHue = this._battler.battlerHue();
        if ($gameSystem.isSideView()) {
            this._image = ImageManager.loadSvEnemy(battlerName, battlerHue);
        } else {
            this._image = ImageManager.loadEnemy(battlerName, battlerHue);
        }
    } else if (this._battler.isActor()) {
        const faceName = this._battler.faceName();
        this._image = ImageManager.loadFace(faceName);
    }
    this._redraw = true;
};

// ---- Полная отрисовка: рамка, полоса, иконка
Window_CTBClone.prototype.refresh = function() {
    this.contents.clear();
    if (!this._battler) return;

    // Рисуем рамку как в оригинале
    const w = this.contents.width;
    const h = this.contents.height;
    const borderColor = this.textColor(this._battler.ctbBorderColor() || 0);
    const backColor = this.textColor(this._battler.ctbBackgroundColor() || 0);

    // Внешний контур (цвет рамки)
    this.contents.fillRect(2, 2, w - 4, h - 4, borderColor);
    // Внутренний фон (цвет фона)
    this.contents.fillRect(6, 6, w - 12, h - 12, backColor);

    // Рисуем вертикальную полосу справа (как в оригинале, но без спрайта)
    const barColor = this._battler.isActor() ? ALLY_COLOR : ENEMY_COLOR;
    this.contents.fillRect(w - BAR_WIDTH - 4, 8, BAR_WIDTH, h - 16, barColor);

    // Рисуем иконку/лицо
    if (this._iconIndex > 0) {
        this.drawIcon(this._iconIndex, 4, 4);
    } else if (this._battler.isActor()) {
        this.redrawActorFace();
    } else if (this._battler.isEnemy()) {
        this.redrawEnemy();
    }
};

// ---- Вспомогательные методы для рисования лица/врага (как в Window_CTBIcon)
Window_CTBClone.prototype.redrawActorFace = function() {
    const bitmap = this._image;
    if (!bitmap) return;
    const pw = Window_Base._faceWidth;
    const ph = Window_Base._faceHeight;
    const faceIndex = this._battler.faceIndex();
    const sx = faceIndex % 4 * pw;
    const sy = Math.floor(faceIndex / 4) * ph;
    const dw = this.contents.width - 8;
    const dh = this.contents.height - 8;
    this.contents.blt(bitmap, sx, sy, pw, ph, 4, 4, dw, dh);
};

Window_CTBClone.prototype.redrawEnemy = function() {
    const bitmap = this._image;
    if (!bitmap) return;
    let sw = bitmap.width;
    let sh = bitmap.height;
    let dw = this.contents.width - 8;
    let dh = this.contents.height - 8;
    let dx = 4;
    let dy = 4;
    if (sw > sh) {
        const rate = sh / sw;
        dh = dw * rate;
        dy += (this.contents.height - 8 - dh) / 2;
    } else {
        const rate = sw / sh;
        dw = dh * rate;
        dx += (this.contents.width - 8 - dw) / 2;
    }
    this.contents.blt(bitmap, 0, 0, sw, sh, dx, dy, dw, dh);
};

// ---- Позиционирование по будущему индексу
Window_CTBClone.prototype.setFutureIndex = function(index) {
    this._futureIndex = index;
    this.updatePositionFromFuture();
};

Window_CTBClone.prototype.updatePositionFromFuture = function() {
    if (this._futureIndex < 0) return;
    const spacing = this.ctbSpacing();
    let y = this.baseY() + this._futureIndex * spacing;
    if (this._futureIndex === 0) y -= ACTIVE_LIFT;
    if (this._futureIndex > 0) y += ACTIVE_GAP;
    this.x = this.baseX();
    this.y = y;
};

// ---- Пустые методы, чтобы избежать ошибок от родительского класса
Window_CTBClone.prototype.updateBattler = function() {};
Window_CTBClone.prototype.update = function() {
    if (this._redraw) {
        this.refresh();
        this._redraw = false;
    }
};
// Отключаем всё, что связано со спрайтами рамки и полосы (они нам не нужны)
Window_CTBClone.prototype.createFrameSprite = function() {};
Window_CTBClone.prototype.refreshSideBar = function() {};
Window_CTBClone.prototype.updateCTBHighlight = function() {};
Window_CTBClone.prototype.updateCTBVisibility = function() {};
Window_CTBClone.prototype.manageGhost = function() {};

// ==================================================
// УПРАВЛЕНИЕ КЛОНОМ
// ==================================================

function updateCTBClone() {
    const subject = BattleManager._subject;

    if (!subject || !subject.isAlive() || subject.isHidden()) {
        if (_ctbCloneWindow) _ctbCloneWindow.visible = false;
        return;
    }

    // Определяем текущий выбранный предмет (если окно навыков активно)
    const scene = SceneManager._scene;
    let testItem = null;
    if (scene && scene._skillWindow && scene._skillWindow.active) {
        testItem = scene._skillWindow.item();
    } else if (subject.currentAction()) {
        testItem = subject.currentAction().item();
    }

    const futureIndex = calcFutureIndexForBattler(subject, testItem);

    if (futureIndex < 0) {
        if (_ctbCloneWindow) _ctbCloneWindow.visible = false;
        return;
    }

    if (!_ctbCloneWindow) {
        _ctbCloneWindow = new Window_CTBClone();
        SceneManager._scene.addChild(_ctbCloneWindow);
    }

    _ctbCloneWindow.setBattler(subject);
    _ctbCloneWindow.setFutureIndex(futureIndex);
    _ctbCloneWindow.visible = true;
}

// ==================================================
// ИНТЕГРАЦИЯ В СЦЕНУ БОЯ
// ==================================================

const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _Scene_Battle_update.call(this);
    updateCTBClone();
};

const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
    if (_ctbCloneWindow) {
        this.removeChild(_ctbCloneWindow);
        _ctbCloneWindow = null;
    }
    _Scene_Battle_terminate.call(this);
};

})();
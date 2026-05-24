/*:
 * @plugindesc v1.9 CTB Vertical Turn Order (With Future Clone Preview) - Only for Actors
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
 *
 * @param LetterOffsetX
 * @text Сдвиг буквы по X
 * @desc Смещение буквы вправо (отрицательные — влево). Может выходить за пределы иконки.
 * @type number
 * @default 10
 *
 * @param LetterOffsetY
 * @text Сдвиг буквы по Y
 * @desc Смещение буквы вверх/вниз (положительные — вниз)
 * @type number
 * @default 0
 *
 * @param LetterFontSize
 * @text Размер шрифта буквы
 * @desc Размер шрифта буквы A, B, C... (по умолчанию 20)
 * @type number
 * @default 20
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
const LETTER_OFFSET_X = Number(params.LetterOffsetX || 0);
const LETTER_OFFSET_Y = Number(params.LetterOffsetY || 0);
const LETTER_FONT_SIZE = Number(params.LetterFontSize || 20);

const VISIBLE_COUNT = 6;
const ICON_GAP    = 6;
const ACTIVE_GAP  = 10;
const ACTIVE_LIFT = 10;

let _cloneVisualIndex = -1;
let _cloneBattler = null;
let _ctbCloneWindow = null;
let _lastCloneShouldShow = false;

// ==================================================
// ОТКЛЮЧАЕМ ВСТРОЕННУЮ БУКВУ YANFLY
// ==================================================
Window_CTBIcon.prototype.redrawLetter = function() {};

// ==================================================
// РАСШИРЕНИЕ Window_CTBIcon: рамка + цветная полоса
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
// НАШ СОБСТВЕННЫЙ СПРАЙТ ДЛЯ БУКВЫ (без обрезки)
// ==================================================

Window_CTBIcon.prototype.createLabelSprite = function() {
  if (this._labelSprite) return;
  if (this.children) {
    for (const child of this.children) {
      if (child === this._labelSprite) return;
    }
  }
  // Размер спрайта делаем с запасом, чтобы вместить крупный шрифт
  const bitmap = new Bitmap(80, 40);
  bitmap.fontSize = LETTER_FONT_SIZE;
  bitmap.textColor = '#ffffff';
  bitmap.outlineColor = 'rgba(0,0,0,0.7)';
  bitmap.outlineWidth = 3;
  this._labelSprite = new Sprite(bitmap);
  this.addChild(this._labelSprite);
};

Window_CTBIcon.prototype.updateEnemyLabel = function() {
  if (!this._battler || !this._battler.isEnemy()) {
    if (this._labelSprite) this._labelSprite.visible = false;
    return;
  }
  if (!this._battler._plural) {
    if (this._labelSprite) this._labelSprite.visible = false;
    return;
  }

  this.createLabelSprite();
  const letter = this._battler._letter;
  const bitmap = this._labelSprite.bitmap;
  // Обновляем размер шрифта на случай изменения параметра
  bitmap.fontSize = LETTER_FONT_SIZE;
  bitmap.clear();
  bitmap.drawText(letter, 0, 0, bitmap.width, bitmap.height, 'center');

  // Базовая позиция: правый нижний угол иконки
  if (this._windowContentsSprite) {
    const iconW = this.iconWidth();
    const iconH = this.iconHeight();
    // Центр спрайта выравниваем относительно правого нижнего угла иконки
    const baseX = this._windowContentsSprite.x + iconW - bitmap.width / 2 - 2;
    const baseY = this._windowContentsSprite.y + iconH - bitmap.height / 2 - 2;
    this._labelSprite.x = baseX + LETTER_OFFSET_X;
    this._labelSprite.y = baseY + LETTER_OFFSET_Y;
  }
  this._labelSprite.visible = true;
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
// ПОЗИЦИЯ В ОЧЕРЕДИ (с учётом клона)
// ==================================================

Window_CTBIcon.prototype.destinationY = function() {
  const order = BattleManager.ctbTurnOrder();
  if (!order) return this.baseY();

  const index = order.indexOf(this._battler);
  if (index < 0) return this.baseY();

  let shift = 0;
  if (_cloneVisualIndex >= 0 && this._battler !== _cloneBattler) {
    if (index >= _cloneVisualIndex) {
      shift = 1;
    }
  }

  let y = this.baseY() + (index + shift) * this.ctbSpacing();
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
// ОСНОВНОЙ UPDATE (с обновлением буквы)
// ==================================================

const _Window_CTBIcon_update = Window_CTBIcon.prototype.update;
Window_CTBIcon.prototype.update = function() {
  _Window_CTBIcon_update.call(this);
  if (!this._battler) return;

  this.createFrameSprite();
  this.refreshSideBar();
  this.updateCTBHighlight();
  this.updateCTBVisibility();
  this.updateEnemyLabel();   // ← наша буква
};

// ==================================================
// CLONE TURN PREVIEW — ТОЛЬКО ДЛЯ АКТОРОВ
// ==================================================

Game_Battler.prototype.calcFutureTicksWithItem = function(item) {
    let futureSpeed = 0;
    if (item) {
        if (item.afterCTBFlat !== undefined) {
            futureSpeed = item.afterCTBFlat;
        } else if (item.afterCTBRate !== undefined) {
            futureSpeed = item.afterCTBRate * BattleManager.ctbTarget();
        } else if (item.speed > 0) {
            futureSpeed = item.speed;
        }
    }
    futureSpeed += BattleManager.ctbTarget() * this.ctbTurnRate() + this.ctbTurnFlat();
    const goal = BattleManager.ctbTarget();
    if (futureSpeed >= goal) return 0;
    return (goal - futureSpeed) / this.ctbSpeedTick();
};

function calcFutureIndexForBattler(battler) {
    const futureTicks = battler.calcFutureTicksWithItem(null);
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

function Window_CTBClone() {
    this.initialize.apply(this, arguments);
}

Window_CTBClone.prototype = Object.create(Window_CTBIcon.prototype);
Window_CTBClone.prototype.constructor = Window_CTBClone;

Window_CTBClone.prototype.initialize = function() {
    const dummy = { _battler: null };
    Window_CTBIcon.prototype.initialize.call(this, dummy);
    this.opacity = 0;
    this.contentsOpacity = 160;
};

Window_CTBClone.prototype.setBattler = function(battler) {
    if (!battler) return;
    this._mainSprite._battler = battler;
    Window_CTBIcon.prototype.updateBattler.call(this);
    this.updateRedraw();
};

Window_CTBClone.prototype.updatePositionX = function() {};
Window_CTBClone.prototype.updatePositionY = function() {};
Window_CTBClone.prototype.updateDestinationX = function() {};
Window_CTBClone.prototype.updateBattler = function() {};

// Клону подписи не нужны
Window_CTBClone.prototype.updateEnemyLabel = function() {
    if (this._labelSprite) this._labelSprite.visible = false;
};

Window_CTBClone.prototype.update = function() {
    Window_CTBIcon.prototype.update.call(this);
    this.contentsOpacity = 160;
};

Window_CTBClone.prototype.setFutureIndex = function(index) {
    const spacing = this.ctbSpacing();
    let y = this.baseY() + index * spacing;
    if (index === 0) y -= ACTIVE_LIFT;
    if (index > 0)  y += ACTIVE_GAP;
    this.x = this.baseX();
    this.y = y;
};

// ==================================================
// УПРАВЛЕНИЕ КЛОНОМ
// ==================================================

function showCloneForActor(actor) {
    if (!actor || !actor.isAlive() || !actor.isActor()) {
        hideClone();
        return;
    }
    const order = BattleManager.ctbTurnOrder();
    if (!order) { hideClone(); return; }

    const currentIndex = order.indexOf(actor);
    if (currentIndex < 0) { hideClone(); return; }

    const futureIndex = calcFutureIndexForBattler(actor);
    if (futureIndex < 0) { hideClone(); return; }

    let visualIndex;
    if (futureIndex <= currentIndex) {
        visualIndex = currentIndex + 1;
    } else {
        visualIndex = futureIndex + 1;
    }

    _cloneVisualIndex = visualIndex;
    _cloneBattler = actor;

    if (!_ctbCloneWindow) {
        _ctbCloneWindow = new Window_CTBClone();
        SceneManager._scene.addChild(_ctbCloneWindow);
    }
    _ctbCloneWindow.setBattler(actor);
    _ctbCloneWindow.setFutureIndex(visualIndex);
    _ctbCloneWindow.visible = true;
}

function hideClone() {
    if (_ctbCloneWindow) _ctbCloneWindow.visible = false;
    _cloneVisualIndex = -1;
    _cloneBattler = null;
}

// ==================================================
// ИНТЕГРАЦИЯ В БОЕВУЮ СИСТЕМУ
// ==================================================

const _Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
    _Scene_Battle_startActorCommandSelection.call(this);
    const actor = BattleManager.actor();
    if (actor) showCloneForActor(actor);
};

const _BattleManager_startCTBInput = BattleManager.startCTBInput;
BattleManager.startCTBInput = function(battler) {
    _BattleManager_startCTBInput.call(this, battler);
    if (battler && battler.isActor() && battler.canInput()) {
        showCloneForActor(battler);
    }
};

const _Game_Battler_endTurnAllCTB = Game_Battler.prototype.endTurnAllCTB;
Game_Battler.prototype.endTurnAllCTB = function() {
    _Game_Battler_endTurnAllCTB.call(this);
    if (this.isActor() && BattleManager._subject === this) {
        hideClone();
    }
};

const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _Scene_Battle_update.call(this);
    const actor = BattleManager.actor();
    if (BattleManager.isInputting() && actor) {
        showCloneForActor(actor);
    } else {
        hideClone();
    }

    if (_ctbCloneWindow && _ctbCloneWindow.visible && _cloneBattler) {
        const order = BattleManager.ctbTurnOrder();
        if (!order) return;
        const currentIndex = order.indexOf(_cloneBattler);
        if (currentIndex < 0) { hideClone(); return; }
        const futureIndex = calcFutureIndexForBattler(_cloneBattler);
        if (futureIndex < 0) { hideClone(); return; }
        let visualIndex = (futureIndex <= currentIndex) ? currentIndex + 1 : futureIndex + 1;
        if (visualIndex !== _cloneVisualIndex) {
            _cloneVisualIndex = visualIndex;
            _ctbCloneWindow.setFutureIndex(visualIndex);
        }
    }
};

const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
    hideClone();
    if (_ctbCloneWindow) {
        this.removeChild(_ctbCloneWindow);
        _ctbCloneWindow = null;
    }
    _Scene_Battle_terminate.call(this);
};

})();
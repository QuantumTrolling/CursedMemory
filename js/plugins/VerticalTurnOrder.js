/*:
 * @plugindesc v1.9 CTB Vertical Turn Order (With Future Position Preview while selecting skill)
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
// РАСЧЁТ БУДУЩИХ ТИКОВ (теперь с параметром item)
// ==================================================
if (!Game_Battler.prototype.calcFutureTicksToReady) {
    Game_Battler.prototype.calcFutureTicksToReady = function(item) {
        // Если передан item, используем его; иначе берём текущее действие
        var testItem = item || (this.currentAction() ? this.currentAction().item() : null);
        if (!testItem) return this.ctbTicksToReady();

        var futureSpeed = 0;
        if (testItem) {
            if (testItem.afterCTBFlat !== undefined) {
                futureSpeed = testItem.afterCTBFlat;
            } else if (testItem.afterCTBRate !== undefined) {
                futureSpeed = testItem.afterCTBRate * BattleManager.ctbTarget();
            } else if (testItem.speed > 0) {
                futureSpeed = testItem.speed;
            }
        }
        futureSpeed += BattleManager.ctbTarget() * this.ctbTurnRate() + this.ctbTurnFlat();
        var goal = BattleManager.ctbTarget();
        if (futureSpeed >= goal) return 0;
        return (goal - futureSpeed) / this.ctbSpeedTick();
    };
}

// ==================================================
// РАМКА + ЦВЕТНАЯ ПОЛОСА
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
      this._windowContentsSprite.x =
        (this.width - this.iconWidth()) / 2;

      this._windowContentsSprite.y =
        (this.height - this.iconHeight()) / 2;
    }

    this.createSideBar(fw, fh);
  });
};

// ==================================================
// СОЗДАНИЕ ПОЛОСЫ
// ==================================================

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
    case "Left":
      x = margin;
      break;
    case "Center":
      x = (Graphics.boxWidth - this.width) / 2;
      break;
    case "Right":
      x = Graphics.boxWidth - this.width - margin;
      break;
  }

  return x + OFFSET_X;
};

Window_CTBIcon.prototype.baseY = function() {
  const margin = 8;
  let y = 0;

  switch (V_ALIGN) {
    case "Top":
      y = margin;
      break;
    case "Center":
      y = Graphics.boxHeight / 2 - (this.ctbSpacing() * VISIBLE_COUNT) / 2;
      break;
    case "Bottom":
      y = Graphics.boxHeight - (this.ctbSpacing() * VISIBLE_COUNT) - margin;
      break;
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
// ВИДИМОСТЬ
// ==================================================

Window_CTBIcon.prototype.updateCTBVisibility = function() {
  const order = BattleManager.ctbTurnOrder();
  if (!order) return;

  const index = order.indexOf(this._battler);
  this.visible = index >= 0 && index < VISIBLE_COUNT;
};

// ==================================================
// ПОДСВЕТКА ПЕРВОГО
// ==================================================

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
// ПРЕДСКАЗАНИЕ БУДУЩЕЙ ПОЗИЦИИ (с учётом выбранного навыка)
// ==================================================

Window_CTBIcon.prototype.calcFutureIndex = function(testItem) {
    if (!this._battler) return -1;
    if (!testItem) return -1;

    var futureTicks = this._battler.calcFutureTicksToReady(testItem);
    var members = $gameParty.aliveMembers().concat($gameTroop.aliveMembers());
    var futureTicksArray = members.map(function(battler) {
        if (battler === this._battler) {
            return futureTicks;
        } else {
            return battler.ctbTicksToReady();
        }
    }, this);

    var sorted = futureTicksArray.slice().sort(function(a, b) { return a - b; });
    var index = sorted.indexOf(futureTicks);
    return index;
};

Window_CTBIcon.prototype.updateFutureIndex = function() {
    if (!this._futureIndexSprite) return;

    // Показываем только для текущего субъекта, живого, в состоянии inputting или waiting
    if (BattleManager._subject === this._battler && this._battler.isAlive() &&
        (this._battler._actionState === 'inputting' || this._battler._actionState === 'waiting')) {

        var scene = SceneManager._scene;
        var testItem = null;

        // Если окно навыков активно, используем выбранный в нём навык
        if (scene && scene._skillWindow && scene._skillWindow.active) {
            testItem = scene._skillWindow.item();
        }
        // Иначе, если есть текущее действие, используем его
        else if (this._battler.currentAction()) {
            testItem = this._battler.currentAction().item();
        }

        if (testItem) {
            var futureIndex = this.calcFutureIndex(testItem);
            if (futureIndex >= 0) {
                this._futureIndexSprite.visible = true;
                this._futureIndexSprite.bitmap.clear();
                this._futureIndexSprite.bitmap.fontSize = 14;
                this._futureIndexSprite.bitmap.drawText((futureIndex+1).toString(), 0, 0, 20, 20, 'right');
            } else {
                this._futureIndexSprite.visible = false;
            }
        } else {
            this._futureIndexSprite.visible = false;
        }
    } else {
        this._futureIndexSprite.visible = false;
    }
};

// ==================================================
// UPDATE
// ==================================================

const _Window_CTBIcon_initialize = Window_CTBIcon.prototype.initialize;
Window_CTBIcon.prototype.initialize = function(mainSprite) {
    _Window_CTBIcon_initialize.call(this, mainSprite);
    // Добавляем спрайт для отображения будущей позиции
    this._futureIndexSprite = new Sprite(new Bitmap(20, 20));
    this._futureIndexSprite.bitmap.fontSize = 14;
    this._futureIndexSprite.x = this.width - 22;
    this._futureIndexSprite.y = this.height - 22;
    this.addChild(this._futureIndexSprite);
    this._futureIndexSprite.visible = false;
};

const _update = Window_CTBIcon.prototype.update;
Window_CTBIcon.prototype.update = function() {
  _update.call(this);

  if (!this._battler) return;

  this.createFrameSprite();
  this.refreshSideBar();
  this.updateCTBHighlight();
  this.updateCTBVisibility();
  this.updateFutureIndex();  // Обновляем предсказание
};

})();
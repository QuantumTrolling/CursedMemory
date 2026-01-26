/*:
 * @plugindesc v1.5 CTB Vertical Turn Order (Clean, Right Top)
 * @author You
 */

(function() {

// ==================================================
// НАСТРОЙКИ ВНЕШНЕГО ВИДА
// ==================================================

const VISIBLE_COUNT   = 6;
const BASE_Y          = 8;   // верх экрана

const ICON_GAP        = 6;   // базовый отступ между всеми
const ACTIVE_GAP      = 10;  // доп. разрыв после первого
const ACTIVE_LIFT     = 10;  // приподнятие первого

// ==================================================
// УТИЛИТЫ
// ==================================================

Window_CTBIcon.prototype.ctbSpacing = function() {
  return this.iconHeight() + ICON_GAP;
};

Window_CTBIcon.prototype.isFirstInQueue = function() {
  const order = BattleManager.ctbTurnOrder();
  return order && order[0] === this._battler;
};

// ==================================================
// ФИКСИРОВАННЫЙ X (ПРАВЫЙ ВЕРХ)
// ==================================================

Window_CTBIcon.prototype.updateDestinationX = function() {
  const margin = 8;
  this._destinationX = Graphics.boxWidth - this.width - margin;
};

// ==================================================
// Y: ВЕРТИКАЛЬ + ОТСТУПЫ
// ==================================================

Window_CTBIcon.prototype.destinationY = function() {
  const order = BattleManager.ctbTurnOrder();
  if (!order) return BASE_Y;

  const index = order.indexOf(this._battler);
  if (index < 0) return BASE_Y;

  let y = BASE_Y + index * this.ctbSpacing();

  // приподнимаем первого
  if (index === 0) {
    y -= ACTIVE_LIFT;
  }

  // дополнительный разрыв после первого
  if (index > 0) {
    y += ACTIVE_GAP;
  }

  return y;
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
// МЕРЦАНИЕ ПЕРВОГО
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
// UPDATE
// ==================================================

const _update = Window_CTBIcon.prototype.update;
Window_CTBIcon.prototype.update = function() {
  _update.call(this);
  this.updateCTBHighlight();
  this.updateCTBVisibility();
};

})();

/*:
 * @plugindesc v1.10 Vertical Turn Order Display with Arrow & Highlight
 * @author Yanfly Engine Plugins (modified)
 *
 * @help
 * Вертикальный порядок ходов:
 * - Первый ходящий сверху
 * - Стрелка у текущего хода
 * - Пульсирующая подсветка
 */

(function() {

if (!Imported.YEP_X_TurnOrderDisplay) {
  console.error("Требуется YEP_X_TurnOrderDisplay");
  return;
}

// ===============================
// Window_TurnOrderIcon (OVERRIDES)
// ===============================

Window_TurnOrderIcon.prototype.destinationX = function() {
  var buffer = Math.ceil(this.width / 4);
  if (this._position === 'left') {
    return buffer;
  } else if (this._position === 'center') {
    return Math.floor(Graphics.boxWidth / 2 - this.width / 2);
  } else {
    return Graphics.boxWidth - this.width - buffer;
  }
};

Window_TurnOrderIcon.prototype.updateDestinationX = function() {
  this._destinationX = this.destinationX();
};

Window_TurnOrderIcon.prototype.destinationY = function() {
  var baseY = Yanfly.Param.TODPositionY;
  var index = this.turnOrderDisplayIndex();
  if (index < 0) return baseY;

  var spacing = this.height + 6;
  return baseY + index * spacing;
};

// ===============================
// Плавное движение (вертикаль)
// ===============================

Window_TurnOrderIcon.prototype.updatePosition = function() {
  var desY = this.destinationY();
  var desX = this.destinationX();

  var speed = 6;

  this.x += (desX - this.x) / speed;
  this.y += (desY - this.y) / speed;
};

// ===============================
// Подсветка + стрелка
// ===============================

Window_TurnOrderIcon.prototype.update = function() {
  Window_Base.prototype.update.call(this);
  this.updateBattler();
  this.updateRedraw();
  this.updatePosition();
  this.updateOpacity();
  this.updateHighlight();
};

Window_TurnOrderIcon.prototype.updateHighlight = function() {
  if (this.isCurrentTurn()) {
    this._pulse = this._pulse || 0;
    this._pulse += 0.08;
    this.contentsOpacity = 200 + Math.sin(this._pulse) * 55;
  } else {
    this._pulse = 0;
    this.contentsOpacity = this._targetOpacity;
  }
};

Window_TurnOrderIcon.prototype.isCurrentTurn = function() {
  return BattleManager._subject === this.battler();
};

// ===============================
// Перерисовка рамки + стрелки
// ===============================

Window_TurnOrderIcon.prototype.refresh = function() {
  this.contents.clear();
  this.drawBorder();
  this.drawBattler();
  if (this.isCurrentTurn()) this.drawArrow();
};

Window_TurnOrderIcon.prototype.drawBorder = function() {
  var w = this.contents.width;
  var h = this.contents.height;

  if (this.isCurrentTurn()) {
    this.contents.fillRect(0, 0, w, h, '#ffffff');
  }

  this.contents.fillRect(2, 2, w - 4, h - 4, this.battlerBorderColor());
  this.contents.fillRect(6, 6, w - 12, h - 12, this.battlerBackColor());
};

// ===============================
// Стрелка текущего хода
// ===============================

Window_TurnOrderIcon.prototype.drawArrow = function() {
  var size = 12;
  var x = -size - 4;
  var y = this.contents.height / 2 - size / 2;

  this.contents.paintOpacity = 255;
  this.contents.drawText("▶", x, y - 2, size + 10, size + 10, 'left');
};

// ===============================
// Мягкое появление
// ===============================

Window_TurnOrderIcon.prototype.updateTargetOpacity = function() {
  if (!this.isBattlerVisible()) {
    this._targetOpacity = 0;
  } else {
    this._targetOpacity = this.isCurrentTurn() ? 255 : 200;
  }
};

})();/*:
 * @plugindesc v1.10 Vertical Turn Order Display with Arrow & Highlight
 * @author Yanfly Engine Plugins (modified)
 *
 * @help
 * Вертикальный порядок ходов:
 * - Первый ходящий сверху
 * - Стрелка у текущего хода
 * - Пульсирующая подсветка
 */

(function() {

if (!Imported.YEP_X_TurnOrderDisplay) {
  console.error("Требуется YEP_X_TurnOrderDisplay");
  return;
}

// ===============================
// Window_TurnOrderIcon (OVERRIDES)
// ===============================

Window_TurnOrderIcon.prototype.destinationX = function() {
  var buffer = Math.ceil(this.width / 4);
  if (this._position === 'left') {
    return buffer;
  } else if (this._position === 'center') {
    return Math.floor(Graphics.boxWidth / 2 - this.width / 2);
  } else {
    return Graphics.boxWidth - this.width - buffer;
  }
};

Window_TurnOrderIcon.prototype.updateDestinationX = function() {
  this._destinationX = this.destinationX();
};

Window_TurnOrderIcon.prototype.destinationY = function() {
  var baseY = Yanfly.Param.TODPositionY;
  var index = this.turnOrderDisplayIndex();
  if (index < 0) return baseY;

  var spacing = this.height + 6;
  return baseY + index * spacing;
};

// ===============================
// Плавное движение (вертикаль)
// ===============================

Window_TurnOrderIcon.prototype.updatePosition = function() {
  var desY = this.destinationY();
  var desX = this.destinationX();

  var speed = 6;

  this.x += (desX - this.x) / speed;
  this.y += (desY - this.y) / speed;
};

// ===============================
// Подсветка + стрелка
// ===============================

Window_TurnOrderIcon.prototype.update = function() {
  Window_Base.prototype.update.call(this);
  this.updateBattler();
  this.updateRedraw();
  this.updatePosition();
  this.updateOpacity();
  this.updateHighlight();
};

Window_TurnOrderIcon.prototype.updateHighlight = function() {
  if (this.isCurrentTurn()) {
    this._pulse = this._pulse || 0;
    this._pulse += 0.08;
    this.contentsOpacity = 200 + Math.sin(this._pulse) * 55;
  } else {
    this._pulse = 0;
    this.contentsOpacity = this._targetOpacity;
  }
};

Window_TurnOrderIcon.prototype.isCurrentTurn = function() {
  return BattleManager._subject === this.battler();
};

// ===============================
// Перерисовка рамки + стрелки
// ===============================

Window_TurnOrderIcon.prototype.refresh = function() {
  this.contents.clear();
  this.drawBorder();
  this.drawBattler();
  if (this.isCurrentTurn()) this.drawArrow();
};

Window_TurnOrderIcon.prototype.drawBorder = function() {
  var w = this.contents.width;
  var h = this.contents.height;

  if (this.isCurrentTurn()) {
    this.contents.fillRect(0, 0, w, h, '#ffffff');
  }

  this.contents.fillRect(2, 2, w - 4, h - 4, this.battlerBorderColor());
  this.contents.fillRect(6, 6, w - 12, h - 12, this.battlerBackColor());
};

// ===============================
// Стрелка текущего хода
// ===============================

Window_TurnOrderIcon.prototype.drawArrow = function() {
  var size = 12;
  var x = -size - 4;
  var y = this.contents.height / 2 - size / 2;

  this.contents.paintOpacity = 255;
  this.contents.drawText("▶", x, y - 2, size + 10, size + 10, 'left');
};

// ===============================
// Мягкое появление
// ===============================

Window_TurnOrderIcon.prototype.updateTargetOpacity = function() {
  if (!this.isBattlerVisible()) {
    this._targetOpacity = 0;
  } else {
    this._targetOpacity = this.isCurrentTurn() ? 255 : 200;
  }
};

})();
/*:
 * @plugindesc [v1.8 FIXED] Торговый ползунок поверх карты. Max из переменной. Кастомный заголовок. Корректный switch 65. RPG Maker MV.
 * @author ChatGPT
 *
 * @param Price Variable ID
 * @default 141
 *
 * @param Irritation Variable ID
 * @default 142
 *
 * @param Irritation Icon ID
 * @default 84
 *
 * @help
 * ShowSlider min max step x y [iconId] [title]
 *
 * max:
 *  число или v[ID]
 *
 * title:
 *  текст (_ = пробел)
 */

(function () {

const params = PluginManager.parameters('');
const priceVarId = Number(params['Price Variable ID'] || 141);
const irritationVarId = Number(params['Irritation Variable ID'] || 142);
const defaultIconId = Number(params['Irritation Icon ID'] || 84);

function parseValue(arg) {
  if (!arg) return 0;
  const m = arg.match(/^v\[(\d+)\]$/i);
  if (m) return Number($gameVariables.value(Number(m[1])) || 0);
  return Number(arg);
}

const _pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
  _pluginCommand.call(this, command, args);

  if (command === "ShowSlider") {
    const min = Number(args[0]);
    let max = parseValue(args[1]);
    const step = Number(args[2]);
    const x = Number(args[3] || 0);
    const y = Number(args[4] || 0);
    const iconId = Number(args[5]) || defaultIconId;
    const title = args[6] ? args.slice(6).join(" ").replace(/_/g, " ") : "TRADING";

    if (max <= min) max = min + step;

    if (SceneManager._scene.addSlider) {
      SceneManager._scene.addSlider(min, max, step, x, y, iconId, title);
    }
  }
};

Scene_Base.prototype.addSlider = function (min, max, step, x, y, iconId, title) {
  if (this._isSliderActive) return;

  this._isSliderActive = true;

  this._sliderWindow = new Window_MouseSlider(min, max, step, x, y, iconId, title);
  this.addChild(this._sliderWindow);

  const cy = this._sliderWindow.y + this._sliderWindow.height + 10;
  this._sliderCommandWindow = new Window_SliderCommand(this._sliderWindow.x + 120, cy);
  this.addChild(this._sliderCommandWindow);

  // блокируем меню
  this._original_callMenu = Scene_Map.prototype.callMenu;
  Scene_Map.prototype.callMenu = function () {};

  // switch + wait
  $gameSwitches.setValue(65, true);
  $gameMap._interpreter.setWaitMode("slider");

  this._closeSlider = () => {
    this.removeChild(this._sliderWindow);
    this.removeChild(this._sliderCommandWindow);
    this._sliderWindow = null;
    this._sliderCommandWindow = null;

    this._isSliderActive = false;
    $gameSwitches.setValue(65, false);
    $gameMap._interpreter._waitMode = "";

    if (this._original_callMenu) {
      Scene_Map.prototype.callMenu = this._original_callMenu;
      this._original_callMenu = null;
    }
  };

  this._sliderCommandWindow.setHandler('ok', () => {
    $gameVariables.setValue(priceVarId, this._sliderWindow._value);
    SoundManager.playOk();
    this._closeSlider();
  });
};

function Window_MouseSlider(min, max, step, px, py, iconId, title) {
  this._min = min;
  this._max = max;
  this._step = step;
  this._titleText = title;

  const init = $gameVariables.value(priceVarId);
  this._value = (init >= min && init <= max) ? Math.round(init / step) * step : min;

  this._iconId = iconId;

  const w = 400, h = 180;
  const x = px || (Graphics.boxWidth - w) / 2;
  const y = py || (Graphics.boxHeight - h) / 2;
  Window_Base.prototype.initialize.call(this, x, y, w, h);

  this._sliderWidth = this.width - this.padding * 2 - 40;
  this._sliderX = (this.contentsWidth() - this._sliderWidth) / 2;
  this._sliderY = 60;
  this._sliderHeight = 12;

  this.refresh();
}

Window_MouseSlider.prototype = Object.create(Window_Base.prototype);
Window_MouseSlider.prototype.constructor = Window_MouseSlider;

Window_MouseSlider.prototype.update = function () {
  Window_Base.prototype.update.call(this);
  if (TouchInput.isTriggered()) {
    const mx = TouchInput.x - this.x - this.padding;
    const my = TouchInput.y - this.y - this.padding;

    if (mx >= this._sliderX && mx <= this._sliderX + this._sliderWidth &&
        my >= this._sliderY && my <= this._sliderY + 20) {

      const r = (mx - this._sliderX) / this._sliderWidth;
      let v = this._min + (this._max - this._min) * r;
      this._value = Math.max(this._min, Math.min(this._max, Math.round(v / this._step) * this._step));
      SoundManager.playCursor();
      this.refresh();
    }
  }
};

Window_MouseSlider.prototype.drawIrritationBar = function (x, y, w, h) {
  const lvl = Math.min($gameVariables.value(irritationVarId) || 0, 5);
  const bw = Math.floor((w - 36) * (lvl / 5));
  this.drawIcon(this._iconId, x, y - 12);
  this.contents.fillRect(x + 36, y, w - 36, h, this.gaugeBackColor());
  this.contents.fillRect(x + 36, y, bw, h, '#FFD700');
};

Window_MouseSlider.prototype.refresh = function () {
  this.contents.clear();
  const top = 60;

  this.drawText(this._titleText, 0, 0, this.contentsWidth(), 'center');
  this.drawText(this._min, this._sliderX - 10, top - 30, 80, 'left');
  this.drawText(this._max, this._sliderX + this._sliderWidth - 70, top - 30, 80, 'right');
  this.drawText(String(this._value), 0, top - 30, this.contentsWidth(), 'center');

  this.contents.fillRect(this._sliderX, top + 8, this._sliderWidth, 4, this.gaugeBackColor());
  const pos = (this._value - this._min) / (this._max - this._min);
  this.contents.fillRect(this._sliderX + pos * this._sliderWidth - 6, top, 12, this._sliderHeight, this.normalColor());

  const iy = top + 50;
  this.drawText("Irritation", 0, iy - 30, this.contentsWidth(), 'center');
  this.drawIrritationBar(0, iy + 10, this.contentsWidth(), 14);
};

function Window_SliderCommand() { this.initialize.apply(this, arguments); }
Window_SliderCommand.prototype = Object.create(Window_Command.prototype);
Window_SliderCommand.prototype.constructor = Window_SliderCommand;
Window_SliderCommand.prototype.makeCommandList = function () {
  this.addCommand("Propose", 'ok');
};
Window_SliderCommand.prototype.windowWidth = () => 160;
Window_SliderCommand.prototype.numVisibleRows = () => 1;
Window_SliderCommand.prototype.processCancel = function () {};

})();

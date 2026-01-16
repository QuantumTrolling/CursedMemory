/*:
 * @plugindesc [v1.7] Торговый ползунок поверх карты. Max из переменной. Кастомный заголовок через команду. RPG Maker MV.
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
 *  - число
 *  - v[ID]
 *
 * title:
 *  - текст (через _ вместо пробелов)
 */

(function () {

  const parameters = PluginManager.parameters('');
  const priceVarId = Number(parameters['Price Variable ID'] || 141);
  const irritationVarId = Number(parameters['Irritation Variable ID'] || 142);
  const defaultIrritationIconId = Number(parameters['Irritation Icon ID'] || 84);

  function parseValue(arg) {
    if (typeof arg !== "string") return Number(arg);
    const match = arg.match(/^v\[(\d+)\]$/i);
    if (match) return Number($gameVariables.value(Number(match[1])) || 0);
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
      const iconId = Number(args[5]) || defaultIrritationIconId;
      const title = args[6] ? args.slice(6).join(" ").replace(/_/g, " ") : "TRADING";

      if (max <= min) max = min + step;

      if (SceneManager._scene.addSlider) {
        SceneManager._scene.addSlider(min, max, step, x, y, iconId, title);
      }
    }
  };

  Scene_Base.prototype.addSlider = function (min, max, step, x, y, iconId, title) {
    if (this._sliderWindow) return;

    this._sliderWindow = new Window_MouseSlider(min, max, step, x, y, iconId, title);
    this.addChild(this._sliderWindow);

    const commandY = this._sliderWindow.y + this._sliderWindow.height + 10;
    this._sliderCommandWindow = new Window_SliderCommand(this._sliderWindow.x + 120, commandY);

    $gameMap._interpreter.setWaitMode("slider");

    this._sliderCommandWindow.setHandler('ok', () => {
      $gameVariables.setValue(priceVarId, this._sliderWindow._value);
      SoundManager.playOk();
      this._closeSlider();
    });

    this.addChild(this._sliderCommandWindow);

    this._closeSlider = () => {
      this.removeChild(this._sliderWindow);
      this.removeChild(this._sliderCommandWindow);
      this._sliderWindow = null;
      this._sliderCommandWindow = null;
      $gameMap._interpreter._waitMode = "";
    };
  };

  function Window_MouseSlider(min, max, step, px, py, iconId, title) {
    this._min = min;
    this._max = max;
    this._step = step;
    this._titleText = title || "TRADING";

    const initVal = $gameVariables.value(priceVarId);
    this._value = (initVal >= min && initVal <= max)
      ? Math.round(initVal / step) * step
      : min;

    this._irritationIconId = iconId || defaultIrritationIconId;

    const width = 400;
    const height = 180;
    const x = px || (Graphics.boxWidth - width) / 2;
    const y = py || (Graphics.boxHeight - height) / 2;

    Window_Base.prototype.initialize.call(this, x, y, width, height);

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
          my >= this._sliderY && my <= this._sliderY + this._sliderHeight + 10) {

        const ratio = (mx - this._sliderX) / this._sliderWidth;
        const rawValue = this._min + (this._max - this._min) * ratio;
        this._value = Math.round(rawValue / this._step) * this._step;
        this._value = Math.max(this._min, Math.min(this._max, this._value));
        SoundManager.playCursor();
        this.refresh();
      }
    }
  };

  Window_MouseSlider.prototype.drawIrritationBar = function (x, y, width, height) {
    const irritation = $gameVariables.value(irritationVarId) || 0;
    const level = Math.min(irritation, 5);
    const barW = Math.floor((width - 36) * (level / 5));

    this.drawIcon(this._irritationIconId, x, y - 12);
    const barX = x + 36;
    this.contents.fillRect(barX, y, width - 36, height, this.gaugeBackColor());
    this.contents.fillRect(barX, y, barW, height, '#FFD700');
  };

  Window_MouseSlider.prototype.refresh = function () {
    this.contents.clear();

    const sliderTop = 60;

    this.drawText(this._titleText, 0, 0, this.contentsWidth(), 'center');
    this.drawText(this._min, this._sliderX - 10, sliderTop - 30, 80, 'left');
    this.drawText(this._max, this._sliderX + this._sliderWidth - 70, sliderTop - 30, 80, 'right');
    this.drawText(String(this._value), 0, sliderTop - 30, this.contentsWidth(), 'center');

    this.contents.fillRect(this._sliderX, sliderTop + 8, this._sliderWidth, 4, this.gaugeBackColor());

    const pos = (this._value - this._min) / (this._max - this._min);
    const knobX = this._sliderX + Math.round(pos * this._sliderWidth) - 6;
    this.contents.fillRect(knobX, sliderTop, 12, this._sliderHeight, this.normalColor());

    const irritationY = sliderTop + 50;
    this.drawText("Irritation", 0, irritationY - 30, this.contentsWidth(), 'center');
    this.drawIrritationBar(0, irritationY + 10, this.contentsWidth(), 14);
  };

  function Window_SliderCommand() {
    this.initialize.apply(this, arguments);
  }

  Window_SliderCommand.prototype = Object.create(Window_Command.prototype);
  Window_SliderCommand.prototype.constructor = Window_SliderCommand;
  Window_SliderCommand.prototype.makeCommandList = function () {
    this.addCommand("Propose", 'ok');
  };
  Window_SliderCommand.prototype.windowWidth = () => 160;
  Window_SliderCommand.prototype.numVisibleRows = () => 1;
  Window_SliderCommand.prototype.processCancel = function () {};

})();

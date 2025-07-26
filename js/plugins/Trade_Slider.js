/*:
 * @plugindesc [v1.3] Торговый ползунок с раздражением и нормальным интерфейсом. RPG Maker MV. Центрировано, без перекрытий.
 * @author ChatGPT
 * 
 * @param Price Variable ID
 * @desc ID переменной, в которую сохраняется предложенная цена
 * @default 200
 * 
 * @param Irritation Variable ID
 * @desc ID переменной уровня раздражения
 * @default 201
 * 
 * @param Irritation Icon ID
 * @desc ID иконки для раздражения
 * @default 84
 * 
 * @help
 * Команда плагина:
 *   ShowSlider min max step x y
 * Пример:
 *   ShowSlider 100 500 50 200 100
 */

(function () {
  const parameters = PluginManager.parameters('');
  const priceVarId = Number(parameters['Price Variable ID'] || 200);
  const irritationVarId = Number(parameters['Irritation Variable ID'] || 201);
  const irritationIconId = Number(parameters['Irritation Icon ID'] || 84);

  const pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    pluginCommand.call(this, command, args);
    if (command === "ShowSlider") {
      const min = Number(args[0]);
      const max = Number(args[1]);
      const step = Number(args[2]);
      const posX = Number(args[3] || 0);
      const posY = Number(args[4] || 0);
      SceneManager.push(Scene_Slider);
      SceneManager.prepareNextScene(min, max, step, posX, posY);
    }
  };

  SceneManager.prepareNextScene = function (min, max, step, x, y) {
    this._sliderParams = { min, max, step, x, y };
  };

  function Scene_Slider() {
    this.initialize(...arguments);
  }

  Scene_Slider.prototype = Object.create(Scene_Base.prototype);
  Scene_Slider.prototype.constructor = Scene_Slider;

  Scene_Slider.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
  };

  Scene_Slider.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    const p = SceneManager._sliderParams;
    this._sliderWindow = new Window_MouseSlider(p.min, p.max, p.step, p.x, p.y);
    this.addChild(this._sliderWindow);

    const commandY = this._sliderWindow.y + this._sliderWindow.height + 10;
    this._commandWindow = new Window_SliderCommand(this._sliderWindow.x + 120, commandY);
    this._commandWindow.setHandler('ok', this.onOfferOk.bind(this));
    this.addChild(this._commandWindow);
  };

  Scene_Slider.prototype.onOfferOk = function () {
    $gameVariables.setValue(priceVarId, this._sliderWindow._value);
    SoundManager.playOk();
    SceneManager.pop();
  };

  function Window_MouseSlider(min, max, step, px, py) {
    this._min = min;
    this._max = max;
    this._step = step;
    this._value = min;
    const width = 400;
    const height = 180;
    const x = px || (Graphics.boxWidth - width) / 2;
    const y = py || (Graphics.boxHeight - height) / 2;
    Window_Base.prototype.initialize.call(this, x, y, width, height);

    // Центрированный ползунок
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
    const iconY = y - 2;
    this.drawIcon(irritationIconId, x, iconY);

    const barX = x + 36;
    const barWidth = width - 36;
    this.contents.fillRect(barX, y, barWidth, height, this.gaugeBackColor());
    this.contents.fillRect(barX, y, barW, height, '#FFD700');
  };

  Window_MouseSlider.prototype.refresh = function () {
    this.contents.clear();

    const sliderTop = 60;
    const labelHeight = 24;
    const knobHeight = this._sliderHeight;

    this.drawText("ТОРГОВЛЯ", 0, 0, this.contentsWidth(), 'center');

    this.drawText(this._min, this._sliderX - 10, sliderTop - 30, 80, 'left');
    this.drawText(this._max, this._sliderX + this._sliderWidth - 70, sliderTop - 30, 80, 'right');
    this.drawText(this._value.toString(), 0, sliderTop - 30, this.contentsWidth(), 'center');
	this.drawIcon(313, this._sliderX + 180, sliderTop - 28);

    const sliderY = sliderTop + 8;
    this.contents.fillRect(this._sliderX, sliderY, this._sliderWidth, 4, this.gaugeBackColor());

    const pos = (this._value - this._min) / (this._max - this._min);
    const knobX = this._sliderX + Math.round(pos * this._sliderWidth) - 6;
    this.contents.fillRect(knobX, sliderTop, 12, knobHeight, this.normalColor());

    const irritationY = sliderTop + 50;
    this.drawText("Раздражение", 0, irritationY - 30, this.contentsWidth(), 'center');
    this.drawIrritationBar(0, irritationY + 10, this.contentsWidth(), 14);
  };

  function Window_SliderCommand() {
    this.initialize.apply(this, arguments);
  }

  Window_SliderCommand.prototype = Object.create(Window_Command.prototype);
  Window_SliderCommand.prototype.constructor = Window_SliderCommand;

  Window_SliderCommand.prototype.initialize = function (x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
  };

  Window_SliderCommand.prototype.makeCommandList = function () {
    this.addCommand("Предложить", 'ok');
  };

  Window_SliderCommand.prototype.windowWidth = function () {
    return 160;
  };

  Window_SliderCommand.prototype.numVisibleRows = function () {
    return 1;
  };

})();

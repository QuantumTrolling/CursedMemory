/*:
 * @plugindesc Колонки (\col[N]) для всех окон + выравнивание в помощи.
 * @author Ваше имя
 *
 * @param textAlign
 * @text Выравнивание текста в Window_Help
 * @desc Глобальное выравнивание текста в окне помощи.
 * @type select
 * @option Влево
 * @value left
 * @option По центру
 * @value center
 * @option Вправо
 * @value right
 * @default left
 *
 * @help
 * Используйте в любом тексте, который обрабатывается через drawTextEx:
 * \col[кол-во] — включить режим колонок, разделитель '|'
 * \col[0] или \col[1] — вернуться к обычному тексту
 *
 * Пример:
 * \col[2]Сила: 10|Магия: 15
 * Ловкость: 20|Удача: 5
 * \col[0]Дополнительное описание.
 *
 * Работает в описании предметов, навыков, в магазине и т.д.
 * В бою плагин автоматически отключается.
 */
(function() {
    var pluginName = 'HelpColumnsAlign'; // Имя файла плагина без расширения (укажите своё)
    var parameters = PluginManager.parameters(pluginName);
    var textAlign = String(parameters['textAlign'] || 'left').toLowerCase();

    function isInBattle() {
        return $gameParty && $gameParty.inBattle();
    }

    //=========================================================================
    // Инициализация свойств в Window_Base
    //=========================================================================
    var _Window_Base_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(x, y, width, height) {
        _Window_Base_initialize.call(this, x, y, width, height);
        this._multiCol = false;
        this._colCount = 0;
        this._colIndex = 0;
        this._colBaseX = 0;
        this._colWidth = 0;
    };

    //=========================================================================
    // Сброс колонок перед каждым drawTextEx
    //=========================================================================
    var _Window_Base_drawTextEx = Window_Base.prototype.drawTextEx;
    Window_Base.prototype.drawTextEx = function(text, x, y) {
        this._multiCol = false;
        this._colCount = 0;
        this._colIndex = 0;
        this._colBaseX = x;
        this._colWidth = 0;
        return _Window_Base_drawTextEx.call(this, text, x, y);
    };

    //=========================================================================
    // Обработка escape-кодов: перехватываем COL для \col[N]
    //=========================================================================
    var _processEscape = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function(code, textState) {
        if (!isInBattle() && code.toUpperCase() === 'COL') {
            var param = this.obtainEscapeParam(textState);
            if (param > 1) {
                this._multiCol = true;
                this._colCount = param;
                this._colIndex = 0;
                this._colBaseX = textState.x;
                var totalWidth = this.contentsWidth ? this.contentsWidth() : this.width;
                var padding = this.textPadding ? this.textPadding() : 0;
                this._colWidth = Math.floor((totalWidth - padding * 2) / param);
                textState.x = this._colBaseX;
            } else {
                this._multiCol = false;
            }
            return;
        }
        // Остальные escape-коды (включая \C[N], \L и т.д.)
        _processEscape.call(this, code, textState);
    };

    //=========================================================================
    // Разделитель колонок '|' и перевод строки
    //=========================================================================
    var _processNormal = Window_Base.prototype.processNormalCharacter;
    Window_Base.prototype.processNormalCharacter = function(textState) {
        if (!isInBattle() && this._multiCol && textState.text[textState.index] === '|') {
            if (this._colIndex < this._colCount - 1) {
                this._colIndex++;
                textState.x = this._colBaseX + this._colIndex * this._colWidth;
            }
            textState.index++;
            return;
        }
        _processNormal.call(this, textState);
    };

    var _processNewLine = Window_Base.prototype.processNewLine;
    Window_Base.prototype.processNewLine = function(textState) {
        _processNewLine.call(this, textState);
        if (!isInBattle() && this._multiCol) {
            this._colIndex = 0;
            textState.x = this._colBaseX;
        }
    };

    //=========================================================================
    // Оригинальное выравнивание для Window_Help (без изменений)
    //=========================================================================
    var _Window_Help_refresh = Window_Help.prototype.refresh;
    Window_Help.prototype.refresh = function() {
        if (isInBattle()) {
            _Window_Help_refresh.call(this);
            return;
        }
        this._multiCol = false;
        this.contents.clear();
        var text = this._text;
        var x = this.textPadding();

        if (textAlign !== 'left' && text) {
            var textWidth = this.textSizeEx(text).width;
            var totalWidth = this.contentsWidth();
            if (textAlign === 'center') {
                x = Math.max(0, (totalWidth - textWidth) / 2);
            } else if (textAlign === 'right') {
                x = Math.max(0, totalWidth - textWidth - this.textPadding());
            }
        }
        this.drawTextEx(text, x, 0);
    };

})();
/*:
 * @plugindesc Расширение окна помощи: колонки (\col[N]) и выравнивание текста.
 * @author Ваше имя
 *
 * @param textAlign
 * @text Выравнивание текста
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
 * Используйте в описании предмета/навыка:
 * \col[кол-во] — начать многоколоночный режим, разделитель ячеек '|'
 * \col[0] или \col[1] — вернуться к обычному тексту
 *
 * Пример:
 * Обычный текст.
 * \col[2]Сила: 10|Магия: 15
 * Ловкость: 20|Удача: 5
 * \col[0]Дополнительное описание.
 *
 * Примечание: в бою плагин автоматически отключается.
 */
(function() {
    // Укажите точное имя вашего файла (без расширения)
    var pluginName = 'HelpColumnsAlign'; // ← Если файл называется HelpColumnsAlign.js
    // Если файл называется text_box_v2Addon.js, замените на 'text_box_v2Addon'
    var parameters = PluginManager.parameters(pluginName);
    var textAlign = String(parameters['textAlign'] || 'left').toLowerCase();

    // Сохраняем оригинальные методы
    var _Window_Help_refresh = Window_Help.prototype.refresh;
    var _processEscape = Window_Help.prototype.processEscapeCharacter;
    var _processNormal = Window_Help.prototype.processNormalCharacter;
    var _processNewLine = Window_Help.prototype.processNewLine;

    function isInBattle() {
        return $gameParty && $gameParty.inBattle();
    }

    Window_Help.prototype.refresh = function() {
        // В бою — стандартный показ, плагин не вмешивается
        if (isInBattle()) {
            _Window_Help_refresh.call(this);
            return;
        }

        // Сбрасываем многоколоночное состояние для нового текста
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

    Window_Help.prototype.processEscapeCharacter = function(code, textState) {
        if (!isInBattle() && code.toUpperCase() === 'COL') {
            var param = this.obtainEscapeParam(textState);
            if (param > 1) {
                this._multiCol = true;
                this._colCount = param;
                this._colIndex = 0;
                this._colBaseX = textState.x;
                this._colWidth = Math.floor((this.contentsWidth() - this.textPadding() * 2) / param);
                textState.x = this._colBaseX;
            } else {
                this._multiCol = false;
            }
            return;
        }
        _processEscape.call(this, code, textState);
    };

    Window_Help.prototype.processNormalCharacter = function(textState) {
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

    Window_Help.prototype.processNewLine = function(textState) {
        _processNewLine.call(this, textState);
        if (!isInBattle() && this._multiCol) {
            this._colIndex = 0;
            textState.x = this._colBaseX;
        }
    };
})();
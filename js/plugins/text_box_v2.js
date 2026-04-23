(function() {
    // Сохраняем оригинальные методы
    var _Window_Help_initialize = Window_Help.prototype.initialize;
    var _Window_Help_setText = Window_Help.prototype.setText;
    var _Window_Help_refresh = Window_Help.prototype.refresh;

    // Переопределяем initialize – установка высоты окна (оставляем как было)
    Window_Help.prototype.initialize = function(numLines) {
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Skill || scene instanceof Scene_Battle) {
            var height = this.fittingHeight(5); // 5 строк для умений
        } else if (
            scene instanceof Scene_Item || 
            scene instanceof Scene_Shop || 
            scene instanceof Scene_Equip ||
            (scene instanceof Scene_Battle && this instanceof Window_BattleItem)
        ) {
            var height = this.fittingHeight(5); // 5 строк для предметов и т.д.
        } else {
            var height = this.fittingHeight(numLines || 2);
        }
        var width = Graphics.boxWidth;
        Window_Base.prototype.initialize.call(this, 0, 0, width, height);
        this._text = '';
    };

    // Переопределяем setText – поддержка \n
    Window_Help.prototype.setText = function(text) {
        if (this._text !== text) {
            this._text = text.replace(/\\n/g, "\n");
            this.refresh();
        }
    };

    // Переопределяем refresh – трёхколоночный режим по маркеру \3col
    Window_Help.prototype.refresh = function() {
        this.contents.clear();
        var text = this._text;

        // Проверяем наличие маркера трёх колонок
        var threeColMode = false;
        var colTexts = null;

        if (text && text.indexOf('\\3col') !== -1) {
            threeColMode = true;
            // Удаляем первый маркер \3col
            var idx = text.indexOf('\\3col');
            var rest = text.substring(0, idx) + text.substring(idx + 5);
            // Разделяем на три части по символу "|"
            var parts = rest.split('|');
            colTexts = [parts[0] || '', parts[1] || '', parts[2] || ''];
        }

        if (threeColMode && colTexts) {
            // Рисуем три колонки
            var w = this.contents.width;
            var colWidth = Math.floor(w / 3);
            var x1 = 0, x2 = colWidth, x3 = colWidth * 2;
            var y = 0;
            var padding = 4; // отступы по краям внутри колонки
            this.drawTextEx(colTexts[0], x1 + padding, y, colWidth - padding * 2);
            this.drawTextEx(colTexts[1], x2 + padding, y, colWidth - padding * 2);
            this.drawTextEx(colTexts[2], x3 + padding, y, colWidth - padding * 2);
        } else {
            // Обычное отображение (одна колонка)
            this.drawTextEx(this._text, 0, 0);
        }
    };
})();
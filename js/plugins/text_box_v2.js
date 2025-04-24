(function() {
    var _Window_Help_initialize = Window_Help.prototype.initialize;
    Window_Help.prototype.initialize = function(numLines) {
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Skill || scene instanceof Scene_Battle) {
            var height = this.fittingHeight(5); // 6 строк для умений (меню и бой)
        } else if (
            scene instanceof Scene_Item || 
            scene instanceof Scene_Shop || 
            scene instanceof Scene_Equip || // Добавлено для экипировки
            (scene instanceof Scene_Battle && this instanceof Window_BattleItem)
        ) {
            var height = this.fittingHeight(3); // 3 строки для предметов (меню, магазин, бой, экипировка)
        } else {
            var height = this.fittingHeight(numLines || 2); // По умолчанию
        }
        var width = Graphics.boxWidth;
        Window_Base.prototype.initialize.call(this, 0, 0, width, height);
        this._text = '';
    };

    var _Window_Help_setText = Window_Help.prototype.setText;
    Window_Help.prototype.setText = function(text) {
        if (this._text !== text) {
            this._text = text.replace(/\\n/g, "\n"); // Перенос строк по \n
            this.refresh();
        }
    };
})();
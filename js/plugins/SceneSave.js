//=============================================================================
// MOG_SceneSave_YEP.js (v4.1) – Рабочая мышь + рамки (заголовок и список)
//=============================================================================
/*:
 * @plugindesc (v4.1) Вертикальные слоты, мышь, скролл и оконные рамки.
 * Совместимо с YEP_SaveCore.
 * @author Moghunter (адаптация)
 *
 * @param Background Image
 * @desc Фоновое изображение (img/menus/save/). Оставьте пустым для чёрного фона.
 * @default Layout
 *
 * @param Title Text
 * @desc Текст заголовка.
 * @default Save
 *
 * @param Title X
 * @desc X-позиция окна заголовка.
 * @default 50
 *
 * @param Title Y
 * @desc Y-позиция окна заголовка.
 * @default 20
 *
 * @param Title Width
 * @desc Ширина окна заголовка.
 * @default 200
 *
 * @param Title Height
 * @desc Высота окна заголовка.
 * @default 60
 *
 * @param Title Font Size
 * @desc Размер шрифта заголовка.
 * @default 28
 *
 * @param Slot Width
 * @desc Ширина ячейки сохранения (внутри окна списка).
 * @default 600
 *
 * @param Slot Height
 * @desc Высота ячейки сохранения.
 * @default 150
 *
 * @param Slot Spacing Y
 * @desc Отступ между ячейками.
 * @default 10
 *
 * @param Playtime X
 * @desc Смещение времени игры от левого края ячейки.
 * @default 200
 *
 * @param Playtime Y
 * @desc Смещение времени игры от верхнего края ячейки.
 * @default 20
 *
 * @param Faces X
 * @desc Смещение лиц от левого края ячейки.
 * @default 30
 *
 * @param Faces Y
 * @desc Смещение лиц от верхнего края ячейки.
 * @default 70
 *
 * @param Faces Spacing
 * @desc Расстояние между лицами.
 * @default 90
 *
 * @param Save Button X
 * @desc Кнопка «Сохранить»: смещение по X от левого края ячейки.
 * @default 400
 *
 * @param Save Button Y
 * @desc Кнопка «Сохранить»: смещение по Y от верхнего края ячейки.
 * @default 80
 *
 * @param Overwrite Button X
 * @desc Кнопка «Перезаписать»: смещение по X.
 * @default 300
 *
 * @param Overwrite Button Y
 * @desc Кнопка «Перезаписать»: смещение по Y.
 * @default 80
 *
 * @param Load Button X
 * @desc Кнопка «Загрузить»: смещение по X.
 * @default 480
 *
 * @param Load Button Y
 * @desc Кнопка «Загрузить»: смещение по Y.
 * @default 80
 *
 * @param Save Button Text
 * @default Сохранить
 *
 * @param Overwrite Button Text
 * @default Перезаписать
 *
 * @param Load Button Text
 * @default Загрузить
 *
 * @param Button Width
 * @desc Ширина кнопки.
 * @default 120
 *
 * @param Button Height
 * @desc Высота кнопки.
 * @default 40
 *
 * @help
 * Заменяет интерфейс сохранения/загрузки.
 * Заголовок — отдельное окно с рамкой. Слоты — внутри окна списка с рамкой.
 * Мышь: наведение на слоты и кнопки, клик, скролл.
 * Esc / ПКМ – выход.
 */
//=============================================================================

var Imported = Imported || {};
Imported.MOG_SceneSaveYEP = true;

(function() {
    var parameters = PluginManager.parameters('MOG_SceneSave_YEP');
    var param = {
        bgImage:       String(parameters['Background Image'] || ''),
        titleText:     String(parameters['Title Text'] || 'Save'),
        titleX:        Number(parameters['Title X'] || 50),
        titleY:        Number(parameters['Title Y'] || 20),
        titleWidth:    Number(parameters['Title Width'] || 200),
        titleHeight:   Number(parameters['Title Height'] || 60),
        titleFontSize: Number(parameters['Title Font Size'] || 28),
        slotWidth:     Number(parameters['Slot Width'] || 600),
        slotHeight:    Number(parameters['Slot Height'] || 150),
        slotSpacingY:  Number(parameters['Slot Spacing Y'] || 10),
        playtimeX:     Number(parameters['Playtime X'] || 200),
        playtimeY:     Number(parameters['Playtime Y'] || 20),
        facesX:        Number(parameters['Faces X'] || 30),
        facesY:        Number(parameters['Faces Y'] || 70),
        facesSpacing:  Number(parameters['Faces Spacing'] || 90),
        saveBtnX:      Number(parameters['Save Button X'] || 400),
        saveBtnY:      Number(parameters['Save Button Y'] || 80),
        overwriteBtnX: Number(parameters['Overwrite Button X'] || 300),
        overwriteBtnY: Number(parameters['Overwrite Button Y'] || 80),
        loadBtnX:      Number(parameters['Load Button X'] || 480),
        loadBtnY:      Number(parameters['Load Button Y'] || 80),
        saveText:      String(parameters['Save Button Text'] || 'Сохранить'),
        overwriteText: String(parameters['Overwrite Button Text'] || 'Перезаписать'),
        loadText:      String(parameters['Load Button Text'] || 'Загрузить'),
        btnWidth:      Number(parameters['Button Width'] || 120),
        btnHeight:     Number(parameters['Button Height'] || 40)
    };

    // Подгрузка фона
    ImageManager.loadMenuSave = function(filename) {
        return this.loadBitmap('img/menus/save/', filename, 0, true);
    };

    //-----------------------------------------------------------------------
    // Window_SaveTitle – окно заголовка с рамкой
    //-----------------------------------------------------------------------
    function Window_SaveTitle() {
        this.initialize.apply(this, arguments);
    }
    Window_SaveTitle.prototype = Object.create(Window_Base.prototype);
    Window_SaveTitle.prototype.constructor = Window_SaveTitle;

    Window_SaveTitle.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_SaveTitle.prototype.refresh = function() {
        this.contents.clear();
        this.contents.fontSize = param.titleFontSize;
        this.changeTextColor(this.normalColor());
        this.drawText(param.titleText, 0, 0, this.contents.width, this.contents.height, 'left');
    };

    //-----------------------------------------------------------------------
    // Window_VerticalSaveList – основное окно со слотами
    //-----------------------------------------------------------------------
    function Window_VerticalSaveList() {
        this.initialize.apply(this, arguments);
    }

    Window_VerticalSaveList.prototype = Object.create(Window_Selectable.prototype);
    Window_VerticalSaveList.prototype.constructor = Window_VerticalSaveList;

    Window_VerticalSaveList.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._buttonIndex = 0;
        this._lastHoverIndex = -1;
        this.refresh();
    };

    Window_VerticalSaveList.prototype.maxCols = function() {
        return 1;
    };

    Window_VerticalSaveList.prototype.maxItems = function() {
        return DataManager.maxSavefiles();
    };

    Window_VerticalSaveList.prototype.itemHeight = function() {
        return param.slotHeight + param.slotSpacingY;
    };

    Window_VerticalSaveList.prototype.lineHeight = function() {
        return 36;
    };

    Window_VerticalSaveList.prototype.isTouchedInside = function() {
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };

    Window_VerticalSaveList.prototype.drawItem = function(index) {
        var rect = this.itemRectForText(index);
        var x = rect.x;
        var y = rect.y;

        // Фон ячейки
        this.contents.fillRect(x, y, param.slotWidth, param.slotHeight, 'rgba(0,0,0,0.6)');

        // Номер сохранения
        this.contents.fontSize = 20;
        this.changeTextColor(this.systemColor());
        this.contents.drawText('Save ' + (index + 1), x + 10, y + 5, 200, 30, 'left');
        this.resetTextColor();

        var savefileId = index + 1;
        if (DataManager.isThisGameFile(savefileId)) {
            var info = DataManager.loadSavefileInfo(savefileId);
            if (info) {
                // Время игры
                this.contents.fontSize = 18;
                this.changeTextColor(this.normalColor());
                this.contents.drawText(info.playtime, x + param.playtimeX, y + param.playtimeY, 200, 40, 'left');

                // Лица персонажей (до 4)
                var saveContents = StorageManager.load(savefileId);
                if (saveContents) {
                    saveContents = JsonEx.parse(saveContents);
                    var party = saveContents.party;
                    var actors = saveContents.actors;
                    if (party && actors) {
                        var members = party._actors;
                        var count = Math.min(members.length, 4);
                        for (var i = 0; i < count; i++) {
                            var actorId = members[i];
                            var actorData = actors._data[actorId];
                            if (actorData) {
                                var faceName = actorData._faceName;
                                var faceIndex = actorData._faceIndex;
                                var fx = x + param.facesX + i * param.facesSpacing;
                                var fy = y + param.facesY;
                                this.drawFace(faceName, faceIndex, fx, fy, 96, 96);
                            }
                        }
                    }
                }
            }
        } else {
            // Пустой слот
            this.contents.fontSize = 18;
            this.changeTextColor(this.normalColor());
            this.contents.drawText('Пусто', x + 100, y + 60, 200, 40, 'left');
        }

        // Кнопки
        if (DataManager.isThisGameFile(savefileId)) {
            this.drawButton(x + param.overwriteBtnX, y + param.overwriteBtnY, param.overwriteText, index, 0);
            this.drawButton(x + param.loadBtnX,      y + param.loadBtnY,      param.loadText,      index, 1);
        } else {
            this.drawButton(x + param.saveBtnX,      y + param.saveBtnY,      param.saveText,      index, 0);
        }
    };

    Window_VerticalSaveList.prototype.drawButton = function(x, y, text, slotIndex, btnIndex) {
        var w = param.btnWidth;
        var h = param.btnHeight;
        var isSelected = (this.index() === slotIndex && this._buttonIndex === btnIndex);
        this.contents.fillRect(x, y, w, h, isSelected ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)');
        this.contents.fontSize = 18;
        this.changeTextColor(isSelected ? this.textColor(4) : this.normalColor());
        this.contents.drawText(text, x, y, w, h, 'center');
        this.resetTextColor();
    };

    Window_VerticalSaveList.prototype.processOk = function() {
        var index = this.index();
        if (index < 0) return;
        var savefileId = index + 1;
        var isThisGame = DataManager.isThisGameFile(savefileId);

        if (isThisGame) {
            if (this._buttonIndex === 0) {
                this.callHandler('save');
            } else {
                this.callHandler('load');
            }
        } else {
            this.callHandler('save');
        }
    };

    Window_VerticalSaveList.prototype.processCancel = function() {
        Window_Selectable.prototype.processCancel.call(this);
    };

    Window_VerticalSaveList.prototype.processButtonTouch = function() {
        if (!TouchInput.isTriggered() || !this.isTouchedInside()) return;
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var index = this.index();
        if (index >= 0) {
            var rect = this.itemRectForText(index);
            var sx = rect.x;
            var sy = rect.y;
            var savefileId = index + 1;
            var isThisGame = DataManager.isThisGameFile(savefileId);
            if (!isThisGame) {
                if (x >= sx + param.saveBtnX && x <= sx + param.saveBtnX + param.btnWidth &&
                    y >= sy + param.saveBtnY && y <= sy + param.saveBtnY + param.btnHeight) {
                    this._buttonIndex = 0;
                    this.processOk();
                    return;
                }
            } else {
                if (x >= sx + param.overwriteBtnX && x <= sx + param.overwriteBtnX + param.btnWidth &&
                    y >= sy + param.overwriteBtnY && y <= sy + param.overwriteBtnY + param.btnHeight) {
                    this._buttonIndex = 0;
                    this.processOk();
                    return;
                }
                if (x >= sx + param.loadBtnX && x <= sx + param.loadBtnX + param.btnWidth &&
                    y >= sy + param.loadBtnY && y <= sy + param.loadBtnY + param.btnHeight) {
                    this._buttonIndex = 1;
                    this.processOk();
                    return;
                }
            }
        }
    };

    Window_VerticalSaveList.prototype.processMouseHover = function() {
        if (!TouchInput.isMoved()) return;
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;

        var row = this.rowAt(y);
        if (row >= 0 && row < this.maxItems() && row !== this._lastHoverIndex) {
            this._lastHoverIndex = row;
            this.select(row);
        }
    };

    Window_VerticalSaveList.prototype.rowAt = function(y) {
        var spacing = param.slotSpacingY;
        var itemH = param.slotHeight + spacing;
        return Math.floor((y + this._scrollY) / itemH);
    };

    Window_VerticalSaveList.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        this.processMouseHover();
        this.processButtonTouch();
    };

    Window_VerticalSaveList.prototype.cursorUp = function(wrap) {
        var prev = this.index();
        Window_Selectable.prototype.cursorUp.call(this, wrap);
        if (this.index() !== prev) this._buttonIndex = 0;
    };

    Window_VerticalSaveList.prototype.cursorDown = function(wrap) {
        var prev = this.index();
        Window_Selectable.prototype.cursorDown.call(this, wrap);
        if (this.index() !== prev) this._buttonIndex = 0;
    };

    Window_VerticalSaveList.prototype.cursorLeft = function(wrap) {
        if (this.index() >= 0 && DataManager.isThisGameFile(this.index() + 1)) {
            this._buttonIndex = this._buttonIndex === 0 ? 1 : 0;
            this.redrawCurrentItem();
        }
    };

    Window_VerticalSaveList.prototype.cursorRight = function(wrap) {
        this.cursorLeft(wrap);
    };

    //-----------------------------------------------------------------------
    // Переопределение Scene_File
    //-----------------------------------------------------------------------
    var _Scene_File_createListWindow = Scene_File.prototype.createListWindow;
    Scene_File.prototype.createListWindow = function() {
        if (this._listWindow) {
            this.removeChild(this._listWindow);
        }
        var x = 0;
        var y = this._helpWindow.height;
        var width = Graphics.boxWidth - x;
        var height = Graphics.boxHeight - y;
        this._listWindow = new Window_VerticalSaveList(x, y, width, height);
        this._listWindow.setHandler('ok',     this.onSavefileOk.bind(this));
        this._listWindow.setHandler('cancel', this.popScene.bind(this));
        this._listWindow.setHandler('save',   this.onActionSave.bind(this));
        this._listWindow.setHandler('load',   this.onActionLoad.bind(this));
        this.addWindow(this._listWindow);
        this._listWindow.select(this.firstSavefileIndex());
        this._listWindow.setTopRow(this.firstSavefileIndex() - 2);
        this._listWindow.activate();
    };

    var _Scene_File_onActionCancel = Scene_File.prototype.onActionCancel;
    Scene_File.prototype.onActionCancel = function() {
        _Scene_File_onActionCancel.call(this);
        this._listWindow._buttonIndex = 0;
        this._listWindow.redrawCurrentItem();
    };

    var _Scene_File_onSaveSuccess = Scene_File.prototype.onSaveSuccess;
    Scene_File.prototype.onSaveSuccess = function() {
        _Scene_File_onSaveSuccess.call(this);
        this._listWindow.refresh();
        this._listWindow.activate();
    };

    var _Scene_File_onLoadSuccess = Scene_File.prototype.onLoadSuccess;
    Scene_File.prototype.onLoadSuccess = function() {
        _Scene_File_onLoadSuccess.call(this);
        this._listWindow.refresh();
    };

    var _Scene_File_create = Scene_File.prototype.create;
    Scene_File.prototype.create = function() {
        _Scene_File_create.call(this);
        this.createCustomBackground();
    };

    Scene_File.prototype.createCustomBackground = function() {
        // Скрываем окно помощи YEP_SaveCore
        if (this._helpWindow) {
            this._helpWindow.visible = false;
        }

        // Фоновый спрайт
        this._customBackground = new Sprite();
        if (param.bgImage) {
            this._customBackground.bitmap = ImageManager.loadMenuSave(param.bgImage);
        } else {
            this._customBackground.bitmap = new Bitmap(Graphics.width, Graphics.height);
            this._customBackground.bitmap.fillAll('black');
        }
        this.addChildAt(this._customBackground, 0);

        // Заголовок как окно с рамкой
        this._titleWindow = new Window_SaveTitle(
            param.titleX, param.titleY, param.titleWidth, param.titleHeight
        );
        this.addWindow(this._titleWindow);
    };

})();
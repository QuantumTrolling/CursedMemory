//=============================================================================
// CustomSaveLayout.js
//=============================================================================
// v2.3 – лица из faces2 (как в MOG_SceneMenu), кнопки снизу по центру
//=============================================================================

/*:
 * @plugindesc v2.3 Лица из img/menus/faces/faces2/ (Actor_1...), кнопки снизу.
 * @author YourName
 *
 * @param Save Button Text
 * @default Save
 * @param Load Button Text
 * @default Load
 * @param Overwrite Button Text
 * @default Overwrite
 * @param Confirm Overwrite Text
 * @default Overwrite this save file?
 *
 * @help
 * Разместите плагин ниже YEP_SaveCore и SaveDisableDuringChoice.
 * Лица текущего боевого отряда берутся из faces2 (Actor_1 и т.д.).
 */

(function() {
    'use strict';

    var params = PluginManager.parameters('CustomSaveLayout');
    var SAVE_TEXT = String(params['Save Button Text'] || 'Save');
    var LOAD_TEXT = String(params['Load Button Text'] || 'Load');
    var OVERWRITE_TEXT = String(params['Overwrite Button Text'] || 'Overwrite');
    var CONFIRM_OVERWRITE = String(params['Confirm Overwrite Text'] || 'Overwrite this save file?');

    DataManager.maxSavefiles = function() { return 3; };

    // Поддержка загрузки лиц из faces2 (если MOG_SceneMenu не установлен)
    if (!ImageManager.loadMenusFaces2) {
        ImageManager.loadMenusFaces2 = function(filename) {
            return this.loadBitmap('img/menus/faces/faces2/', filename, 0, true);
        };
    }

    function isChoiceActive() {
        return $gameMessage && $gameMessage.isChoice();
    }

    // Запрет открытия сцены сохранения при активном выборе
    var _SceneManager_push = SceneManager.push;
    SceneManager.push = function(sceneClass) {
        if ((sceneClass === Scene_Save || sceneClass === Scene_CustomSave) && isChoiceActive()) {
            SoundManager.playBuzzer();
            return;
        }
        _SceneManager_push.call(this, sceneClass);
    };

    // Кнопки для слота
    function getSlotButtons(savefileId, mode) {
        var hasSave = !!DataManager.loadSavefileInfo(savefileId);
        var btns = [];
        var saveDisabled = isChoiceActive();

        if (savefileId === 1) {
            btns.push({ text: LOAD_TEXT, action: 'load', enabled: hasSave });
        } else {
            if (mode === 'save') {
                if (hasSave) {
                    btns.push({ text: LOAD_TEXT, action: 'load', enabled: true });
                    btns.push({ text: OVERWRITE_TEXT, action: 'overwrite', enabled: !saveDisabled });
                } else {
                    btns.push({ text: SAVE_TEXT, action: 'save', enabled: !saveDisabled });
                }
            } else if (mode === 'load') {
                if (hasSave) {
                    btns.push({ text: LOAD_TEXT, action: 'load', enabled: true });
                }
            }
        }
        return btns;
    }

    //-----------------------------------------------------------------------------
    // Window_CustomSaveList
    //-----------------------------------------------------------------------------

    function Window_CustomSaveList() {
        this.initialize.apply(this, arguments);
    }

    Window_CustomSaveList.prototype = Object.create(Window_Selectable.prototype);
    Window_CustomSaveList.prototype.constructor = Window_CustomSaveList;

    Window_CustomSaveList.prototype.initialize = function(x, y, width, mode) {
        this._mode = mode;
        this._buttonRects = [];
        this._facesReady = [false, false, false]; // готовность лиц для каждого слота
        var slotH = this.lineHeight() * 3 + 8;
        var height = slotH * 3 + this.standardPadding() * 2;
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
        this.select(0);
    };

    Window_CustomSaveList.prototype.maxItems = function() { return 3; };
    Window_CustomSaveList.prototype.itemHeight = function() { return this.lineHeight() * 3 + 8; };
    Window_CustomSaveList.prototype.savefileId = function() { return this.index() + 1; };

    Window_CustomSaveList.prototype.drawItem = function(index) {
        var id = index + 1;
        var rect = this.itemRect(index);
        this.resetTextColor();
        var info = DataManager.loadSavefileInfo(id);
        var hasSave = !!info;

        var iconIndex = hasSave ? 231 : 230;
        var iconY = rect.y + (rect.height - Window_Base._iconHeight) / 2;
        this.drawIcon(iconIndex, rect.x + 4, iconY);

        // Область для лиц справа
        var faceAreaWidth = 210;
        var faceAreaX = rect.x + rect.width - 10 - faceAreaWidth;

        // Текст слота
        var textX = rect.x + Window_Base._iconWidth + 12;
        var textWidth = faceAreaX - textX - 10;
        var label = (id === 1) ? 'Autosave' : 'Slot ' + id;
        if (hasSave) {
            this.drawText(label, textX, rect.y + 2, textWidth, 'left');
            this.drawText(info.playtime || '', textX, rect.y + this.lineHeight() + 2, textWidth, 'left');
        } else {
            this.drawText(label + '  (Empty)', textX, rect.y + rect.height / 2 - this.lineHeight() / 2, textWidth, 'left');
        }

        // Лица (текущий боевой отряд из faces2)
        this.drawFacesForSlot(index, rect, faceAreaX, faceAreaWidth);

        // Кнопки снизу по центру
        var buttons = getSlotButtons(id, this._mode);
        var btnRects = [];
        var btnY = rect.y + this.lineHeight() * 2 + 10;
        var btnHeight = this.lineHeight();
        var totalBtnWidth = 0;
        for (var b = 0; b < buttons.length; b++) {
            totalBtnWidth += this.textWidth(buttons[b].text) + 8;
        }
        if (buttons.length > 1) totalBtnWidth += (buttons.length - 1) * 8;
        var btnX = rect.x + (rect.width - totalBtnWidth) / 2;
        for (var b = 0; b < buttons.length; b++) {
            var btn = buttons[b];
            var w = this.textWidth(btn.text) + 8;
            var color = btn.enabled ? this.normalColor() : this.textColor(16);
            this.changeTextColor(color);
            this.drawText(btn.text, btnX, btnY, w, 'center');
            btnRects.push({ x: btnX, y: btnY, width: w, height: btnHeight, action: btn.action, enabled: btn.enabled });
            btnX += w + 8;
        }
        this._buttonRects[index] = btnRects;
    };

    // Рисование лиц отряда
    Window_CustomSaveList.prototype.drawFacesForSlot = function(index, rect, areaX, areaWidth) {
        var members = $gameParty.battleMembers();
        if (members.length === 0) return;

        var faceW = 48;
        var faceH = 48;
        var gap = 4;
        var totalWidth = members.length * faceW + (members.length - 1) * gap;
        var startX = areaX + (areaWidth - totalWidth) / 2;
        var topPartHeight = this.lineHeight() * 2 + 8;
        var faceY = rect.y + (topPartHeight - faceH) / 2;

        var allReady = true;
        for (var i = 0; i < members.length; i++) {
            var actorId = members[i]._actorId;
            var bmp = ImageManager.loadMenusFaces2('Actor_' + actorId);
            if (bmp.isReady()) {
                // Рисуем лицо, масштабируя до faceW x faceH
                var srcW = bmp.width;
                var srcH = bmp.height;
                var scale = Math.min(faceW / srcW, faceH / srcH);
                var dw = srcW * scale;
                var dh = srcH * scale;
                var dx = startX + i * (faceW + gap) + (faceW - dw) / 2;
                var dy = faceY + (faceH - dh) / 2;
                this.contents.blt(bmp, 0, 0, srcW, srcH, dx, dy, dw, dh);
            } else {
                allReady = false;
            }
        }

        // Если не все загружены, запоминаем необходимость обновления
        if (!allReady) {
            this._facesReady[index] = false;
        } else {
            this._facesReady[index] = true;
        }
    };

    // Проверка загрузки лиц и перерисовка при необходимости
    Window_CustomSaveList.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        for (var i = 0; i < 3; i++) {
            if (!this._facesReady[i]) {
                // Проверяем готовность всех лиц для этого слота
                var members = $gameParty.battleMembers();
                var allReady = true;
                for (var j = 0; j < members.length; j++) {
                    var bmp = ImageManager.loadMenusFaces2('Actor_' + members[j]._actorId);
                    if (!bmp.isReady()) {
                        allReady = false;
                        break;
                    }
                }
                if (allReady) {
                    this._facesReady[i] = true;
                    this.refresh();
                }
            }
        }
    };

    Window_CustomSaveList.prototype.processTouch = function() {
        if (!this.isOpenAndActive()) return;
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            var x = this.canvasToLocalX(TouchInput.x);
            var y = this.canvasToLocalY(TouchInput.y);
            var index = this.hitTest(x, y);
            if (index >= 0) {
                var rects = this._buttonRects[index];
                if (rects) {
                    for (var b = 0; b < rects.length; b++) {
                        var r = rects[b];
                        if (x >= r.x && x < r.x + r.width && y >= r.y && y < r.y + r.height) {
                            if (r.enabled) {
                                this.select(index);
                                this.callHandler(r.action);
                            } else {
                                SoundManager.playBuzzer();
                            }
                            return;
                        }
                    }
                }
                if (this._selectedIndex !== index) {
                    this.select(index);
                    SoundManager.playCursor();
                }
            }
        }
    };

    Window_CustomSaveList.prototype.processOk = function() {
        if (this.isCurrentItemEnabled()) {
            var index = this.index();
            var rects = this._buttonRects[index];
            if (rects && rects.length === 1 && rects[0].enabled) {
                this.callHandler(rects[0].action);
            } else if (rects && rects.length > 1) {
                SoundManager.playBuzzer();
            } else {
                SoundManager.playBuzzer();
            }
        }
    };

    Window_CustomSaveList.prototype.callHandler = function(symbol) {
        if (this._handlers && this._handlers[symbol]) {
            this._handlers[symbol]();
        }
    };

    //-----------------------------------------------------------------------------
    // Сцены
    //-----------------------------------------------------------------------------

    function Scene_CustomSaveBase() {
        this.initialize.apply(this, arguments);
    }

    Scene_CustomSaveBase.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_CustomSaveBase.prototype.constructor = Scene_CustomSaveBase;

    Scene_CustomSaveBase.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
        this._mode = this.mode();
    };

    Scene_CustomSaveBase.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createListWindow();
    };

    Scene_CustomSaveBase.prototype.createListWindow = function() {
        var listWidth = 520;
        var slotH = Window_CustomSaveList.prototype.itemHeight();
        var listHeight = slotH * 3 + Window_Selectable.prototype.standardPadding() * 2;
        var x = (Graphics.boxWidth - listWidth) / 2;
        var y = (Graphics.boxHeight - listHeight) / 2;

        this._listWindow = new Window_CustomSaveList(x, y, listWidth, this._mode);
        this._listWindow.setHandler('save', this.onActionSave.bind(this));
        this._listWindow.setHandler('load', this.onActionLoad.bind(this));
        this._listWindow.setHandler('overwrite', this.onActionOverwrite.bind(this));
        this._listWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._listWindow);
        this._listWindow.activate();
    };

    Scene_CustomSaveBase.prototype.onActionSave = function() {
        if (isChoiceActive()) { SoundManager.playBuzzer(); return; }
        var id = this._listWindow.savefileId();
        $gameSystem.onBeforeSave();
        if (DataManager.saveGame(id)) {
            SoundManager.playSave();
            this._listWindow.refresh();
        } else {
            SoundManager.playBuzzer();
        }
    };

    Scene_CustomSaveBase.prototype.onActionLoad = function() {
        var id = this._listWindow.savefileId();
        if (DataManager.loadGame(id)) {
            SoundManager.playLoad();
            $gameSystem.onAfterLoad();
            SceneManager.goto(Scene_Map);
        } else {
            SoundManager.playBuzzer();
        }
    };

    Scene_CustomSaveBase.prototype.onActionOverwrite = function() {
        if (isChoiceActive()) { SoundManager.playBuzzer(); return; }
        this._overwriteSlotId = this._listWindow.savefileId();
        this.showConfirmWindow(CONFIRM_OVERWRITE);
    };

    Scene_CustomSaveBase.prototype.showConfirmWindow = function(text) {
        var win = new Window_SaveConfirm();
        win.setData(text);
        win.setHandler('confirm', this.onConfirmOverwrite.bind(this));
        win.setHandler('cancel', this.onConfirmCancel.bind(this));
        this.addWindow(win);
        win.open();
        win.activate();
        win.select(0);
        this._confirmWindow = win;
    };

    Scene_CustomSaveBase.prototype.onConfirmOverwrite = function() {
        this._confirmWindow.close();
        this.removeChild(this._confirmWindow);
        var id = this._overwriteSlotId;
        $gameSystem.onBeforeSave();
        if (DataManager.saveGame(id)) {
            SoundManager.playSave();
            this._listWindow.refresh();
        }
    };

    Scene_CustomSaveBase.prototype.onConfirmCancel = function() {
        this._confirmWindow.close();
        this.removeChild(this._confirmWindow);
        this._listWindow.activate();
    };

    Scene_CustomSaveBase.prototype.mode = function() { return 'save'; };

    function Scene_CustomSave() {
        this.initialize.apply(this, arguments);
    }
    Scene_CustomSave.prototype = Object.create(Scene_CustomSaveBase.prototype);
    Scene_CustomSave.prototype.constructor = Scene_CustomSave;
    Scene_CustomSave.prototype.mode = function() { return 'save'; };

    function Scene_CustomLoad() {
        this.initialize.apply(this, arguments);
    }
    Scene_CustomLoad.prototype = Object.create(Scene_CustomSaveBase.prototype);
    Scene_CustomLoad.prototype.constructor = Scene_CustomLoad;
    Scene_CustomLoad.prototype.mode = function() { return 'load'; };

    Scene_Save = Scene_CustomSave;
    Scene_Load = Scene_CustomLoad;

    // Window_SaveConfirm (если отсутствует)
    if (typeof Window_SaveConfirm === 'undefined') {
        Window_SaveConfirm = function() { this.initialize.apply(this, arguments); };
        Window_SaveConfirm.prototype = Object.create(Window_Command.prototype);
        Window_SaveConfirm.prototype.constructor = Window_SaveConfirm;
        Window_SaveConfirm.prototype.initialize = function() {
            Window_Command.prototype.initialize.call(this, 0, 0);
            this.openness = 0;
        };
        Window_SaveConfirm.prototype.setData = function(text) {
            this._text = text;
            var tw = this.textWidthEx(this._text) + this.standardPadding() * 2 + this.textPadding() * 2;
            this.width = Math.min(tw, Graphics.boxWidth);
            this.refresh();
            this.x = (Graphics.boxWidth - this.width) / 2;
            this.y = (Graphics.boxHeight - this.height) / 2;
            this.drawTextEx(this._text, this.textPadding(), 0);
        };
        Window_SaveConfirm.prototype.makeCommandList = function() {
            this.addCommand('Yes', 'confirm');
            this.addCommand('No', 'cancel');
        };
        Window_SaveConfirm.prototype.windowHeight = function() { return this.fittingHeight(3); };
        Window_SaveConfirm.prototype.itemRect = function(index) {
            var rect = Window_Selectable.prototype.itemRect.call(this, index);
            rect.y += this.lineHeight();
            return rect;
        };
        Window_SaveConfirm.prototype.itemTextAlign = function() { return 'center'; };
    }

})();
//=============================================================================
// CustomSaveLayout.js
//=============================================================================
// v3.6 – каждая кнопка как отдельное окно "Купить" из A_fix_shops
//=============================================================================

/*:
 * @plugindesc v3.6 Кнопки Save/Load/Overwrite — отдельные окна с подсветкой.
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
 * Разместите плагин ниже YEP_SaveCore, MOG_Weather_EX и SaveDisableDuringChoice.
 */

(function() {
    'use strict';

    // === Патч для MOG_Weather_EX ===
    if (typeof Moghunter !== 'undefined') {
        var _Spriteset_Base_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
        Spriteset_Base.prototype.createUpperLayer = function() {
            try { _Spriteset_Base_createUpperLayer.call(this); }
            catch (e) {
                console.warn("MOG_Weather_EX error suppressed:", e.message);
                this.createUpperLayerFallback();
            }
        };
        Spriteset_Base.prototype.createUpperLayerFallback = function() {
            this._upperLayer = new Sprite();
            this._upperLayer.setFrame(0, 0, Graphics.width, Graphics.height);
            this.addChild(this._upperLayer);
            this._weather = new Weather();
            this._weather.type = 'none';
            this.addChild(this._weather);
            this._pictureContainer = new Sprite();
            this._upperLayer.addChild(this._pictureContainer);
            this._fogs = [];
            this.createFlashSprite();
            this.createTimerSprite();
        };
    }

    var params = PluginManager.parameters('CustomSaveLayout');
    var SAVE_TEXT   = String(params['Save Button Text'] || 'Save');
    var LOAD_TEXT   = String(params['Load Button Text'] || 'Load');
    var OVERWRITE_TEXT = String(params['Overwrite Button Text'] || 'Overwrite');
    var CONFIRM_OVERWRITE = String(params['Confirm Overwrite Text'] || 'Overwrite this save file?');

    DataManager.maxSavefiles = function() { return 3; };

    if (!ImageManager.loadMenusFaces2) {
        ImageManager.loadMenusFaces2 = function(filename) {
            return this.loadBitmap('img/menus/faces/faces2/', filename, 0, true);
        };
    }

    function isChoiceActive() {
        return $gameMessage && $gameMessage.isChoice();
    }

    var _SceneManager_push = SceneManager.push;
    SceneManager.push = function(sceneClass) {
        if ((sceneClass === Scene_Save || sceneClass === Scene_CustomSave) && isChoiceActive()) {
            SoundManager.playBuzzer();
            return;
        }
        _SceneManager_push.call(this, sceneClass);
    };

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
                if (hasSave) btns.push({ text: LOAD_TEXT, action: 'load', enabled: true });
            }
        }
        return btns;
    }

    //-----------------------------------------------------------------------------
    // Window_SaveSingleButton (одна кнопка, как Window_ShopBuyAction)
    //-----------------------------------------------------------------------------

    function Window_SaveSingleButton() {
        this.initialize.apply(this, arguments);
    }
    Window_SaveSingleButton.prototype = Object.create(Window_Base.prototype);
    Window_SaveSingleButton.prototype.constructor = Window_SaveSingleButton;

    Window_SaveSingleButton.prototype.initialize = function(x, y, w, h) {
        Window_Base.prototype.initialize.call(this, x, y, w, h);
        this.padding = 4;
        this._text = '';
        this._enabled = true;
        this._hover = false;
        this._anim = 0;
        this._action = null;
        this._actionCallback = null;
        this.deactivate();
        this.refresh();
    };

    Window_SaveSingleButton.prototype.setButton = function(text, action, enabled, callback) {
        this._text = text;
        this._action = action;
        this._enabled = enabled;
        this._actionCallback = callback;
        this.refresh();
    };

    Window_SaveSingleButton.prototype.refresh = function() {
        this.contents.clear();
        var rect = new Rectangle(0, 0, this.contents.width, this.contents.height);
        var colorIndex = this._enabled ? 0 : 16;
        this.changeTextColor(this.textColor(colorIndex));
        if (this._enabled && this._hover) {
            var alpha = 0.2 + Math.sin(this._anim) * 0.1;
            this.contents.fillRect(rect.x, rect.y, rect.width, rect.height,
                'rgba(255, 255, 255, ' + alpha + ')');
        }
        this.drawText(this._text, rect.x, rect.y, rect.width, 'center');
    };

    Window_SaveSingleButton.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        if (!this.visible) return;
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        this._hover = (x >= 0 && y >= 0 && x < this.width && y < this.height);
        this._anim += 0.05;
        this.refresh();
        if (TouchInput.isTriggered() && this._enabled && this._hover) {
            if (this._actionCallback && this._action) {
                this._actionCallback(this._action);
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Window_CustomSaveList (без изменений)
    //-----------------------------------------------------------------------------

    function Window_CustomSaveList() {
        this.initialize.apply(this, arguments);
    }
    Window_CustomSaveList.prototype = Object.create(Window_Selectable.prototype);
    Window_CustomSaveList.prototype.constructor = Window_CustomSaveList;

    Window_CustomSaveList.prototype.initialize = function(x, y, width, mode) {
        this._mode = mode;
        this._saveCache = {};
        this._facesReady = [false, false, false];
        var slotH = this.lineHeight() * 3 + 8;
        var height = slotH * 3 + this.standardPadding() * 2;
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
        this.select(0);
    };

    Window_CustomSaveList.prototype.maxItems = function() { return 3; };
    Window_CustomSaveList.prototype.itemHeight = function() { return this.lineHeight() * 3 + 8; };
    Window_CustomSaveList.prototype.savefileId = function() { return this.index() + 1; };

    Window_CustomSaveList.prototype.loadSaveContent = function(id) {
        if (this._saveCache[id]) return this._saveCache[id];
        var raw = StorageManager.load(id);
        if (!raw) return null;
        try { var data = JsonEx.parse(raw); this._saveCache[id] = data; return data; }
        catch (e) { return null; }
    };

    Window_CustomSaveList.prototype.clearSaveCache = function(id) {
        delete this._saveCache[id];
        this._facesReady[id - 1] = false;
    };

    Window_CustomSaveList.prototype.drawItem = function(index) {
        var id = index + 1;
        var rect = this.itemRect(index);
        this.resetTextColor();
        var info = DataManager.loadSavefileInfo(id);
        var hasSave = !!info;

        var iconIndex = hasSave ? 231 : 230;
        var iconY = rect.y + (rect.height - Window_Base._iconHeight) / 2;
        this.drawIcon(iconIndex, rect.x + 4, iconY);

        var faceAreaWidth = 210;
        var faceAreaX = rect.x + rect.width - 10 - faceAreaWidth;
        var textX = rect.x + Window_Base._iconWidth + 12;
        var textWidth = faceAreaX - textX - 10;
        var label = (id === 1) ? 'Autosave' : 'Slot ' + id;
        if (hasSave) {
            this.drawText(label, textX, rect.y + 2, textWidth, 'left');
            this.drawText(info.playtime || '', textX, rect.y + this.lineHeight() + 2, textWidth, 'left');
        } else {
            this.drawText(label + '  (Empty)', textX, rect.y + rect.height / 2 - this.lineHeight() / 2, textWidth, 'left');
        }

        if (hasSave) this.drawFacesForSlot(index, rect, faceAreaX, faceAreaWidth);
    };

    Window_CustomSaveList.prototype.drawFacesForSlot = function(index, rect, areaX, areaWidth) {
        var content = this.loadSaveContent(index + 1);
        if (!content || !content.party || !content.party._actors) return;
        var actorIds = content.party._actors;
        if (actorIds.length === 0) return;
        var faceW = 48, faceH = 48, gap = 4;
        var totalWidth = actorIds.length * faceW + (actorIds.length - 1) * gap;
        var startX = areaX + (areaWidth - totalWidth) / 2;
        var faceY = rect.y + (this.lineHeight() * 2 + 8 - faceH) / 2;
        var allReady = true;
        for (var i = 0; i < actorIds.length; i++) {
            var bmp = ImageManager.loadMenusFaces2('Actor_' + actorIds[i]);
            if (bmp.isReady()) {
                var scale = Math.min(faceW / bmp.width, faceH / bmp.height);
                var dw = bmp.width * scale, dh = bmp.height * scale;
                var dx = startX + i * (faceW + gap) + (faceW - dw) / 2;
                var dy = faceY + (faceH - dh) / 2;
                this.contents.blt(bmp, 0, 0, bmp.width, bmp.height, dx, dy, dw, dh);
            } else allReady = false;
        }
        this._facesReady[index] = allReady;
    };

    Window_CustomSaveList.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        for (var i = 0; i < 3; i++) {
            if (!this._facesReady[i] && DataManager.loadSavefileInfo(i + 1)) {
                var content = this.loadSaveContent(i + 1);
                if (content && content.party && content.party._actors) {
                    var allReady = true;
                    var actorIds = content.party._actors;
                    for (var j = 0; j < actorIds.length; j++) {
                        if (!ImageManager.loadMenusFaces2('Actor_' + actorIds[j]).isReady()) {
                            allReady = false; break;
                        }
                    }
                    if (allReady) { this._facesReady[i] = true; this.refresh(); }
                }
            }
        }
    };

    Window_CustomSaveList.prototype.processTouch = function() {
        // Не обрабатываем касания, если мышь над кнопками — они сами обработают
        if (!this.isOpenAndActive()) return;
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            var gx = TouchInput.x;
            var gy = TouchInput.y;
            var scene = SceneManager._scene;
            if (scene && scene._buttonGroups) {
                for (var i = 0; i < scene._buttonGroups.length; i++) {
                    var group = scene._buttonGroups[i];
                    if (group) {
                        for (var j = 0; j < group.length; j++) {
                            var btn = group[j];
                            if (btn.visible && btn.x <= gx && gx < btn.x + btn.width &&
                                btn.y <= gy && gy < btn.y + btn.height) {
                                return; // кнопка сама обработает
                            }
                        }
                    }
                }
            }
            var x = this.canvasToLocalX(gx);
            var y = this.canvasToLocalY(gy);
            var index = this.hitTest(x, y);
            if (index >= 0 && this._selectedIndex !== index) {
                this.select(index);
                SoundManager.playCursor();
            }
        }
    };

    Window_CustomSaveList.prototype.processOk = function() {
        if (this.isCurrentItemEnabled()) {
            var index = this.index();
            var scene = SceneManager._scene;
            if (scene && scene._buttonGroups) {
                var group = scene._buttonGroups[index];
                if (group && group.length === 1 && group[0]._enabled) {
                    if (this._handlers[group[0]._action]) {
                        this._handlers[group[0]._action]();
                    }
                    return;
                }
            }
            SoundManager.playBuzzer();
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_CustomSaveBase
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
        this.createButtonWindows();
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

    Scene_CustomSaveBase.prototype.createButtonWindows = function() {
        // _buttonGroups[slotIndex] = массив Window_SaveSingleButton
        this._buttonGroups = [];
        for (var i = 0; i < 3; i++) {
            this._buttonGroups[i] = [];
        }
        this.updateButtonWindows();
    };

    Scene_CustomSaveBase.prototype.updateButtonWindows = function() {
        var list = this._listWindow;
        for (var i = 0; i < 3; i++) {
            var rect = list.itemRect(i);
            var buttons = getSlotButtons(i + 1, this._mode);
            var group = this._buttonGroups[i];

            // Удаляем лишние окна, добавляем недостающие
            while (group.length > buttons.length) {
                var old = group.pop();
                this.removeChild(old);
            }
            while (group.length < buttons.length) {
                var newBtn = new Window_SaveSingleButton(0, 0, 1, 1);
                newBtn.setActionCallback = function(cb) { this._actionCallback = cb; };
                newBtn._actionCallback = this.onButtonAction.bind(this);
                this.addWindow(newBtn);
                group.push(newBtn);
            }

            // Обновляем текст и размеры каждой кнопки
            var spacing = 8;
            var btnHeight = 36 + 8; // высота окна = lineHeight + padding*2
            var totalWidth = 0;
            for (var b = 0; b < buttons.length; b++) {
                var w = Math.max(60, list.textWidth(buttons[b].text) + 16);
                totalWidth += w;
            }
            if (buttons.length > 1) totalWidth += spacing * (buttons.length - 1);

            var slotCenterX = list.x + rect.x + rect.width / 2;
            var slotBottomY = list.y + rect.y + rect.height - 4;
            var startX = slotCenterX - totalWidth / 2;
            var y = slotBottomY - btnHeight;

            var x = startX;
            for (var b = 0; b < buttons.length; b++) {
                var btn = buttons[b];
                var w = Math.max(60, list.textWidth(btn.text) + 16);
                group[b].move(x, y, w, btnHeight);
                group[b].setButton(btn.text, btn.action, btn.enabled, this.onButtonAction.bind(this));
                x += w + spacing;
            }

            // Скрываем неиспользуемые окна (если buttons меньше длины group)
            for (var b = buttons.length; b < group.length; b++) {
                group[b].hide();
            }
        }
    };

    Scene_CustomSaveBase.prototype.onButtonAction = function(action) {
        switch (action) {
            case 'save': this.onActionSave(); break;
            case 'load': this.onActionLoad(); break;
            case 'overwrite': this.onActionOverwrite(); break;
        }
    };

    var _Scene_CustomSaveBase_update = Scene_CustomSaveBase.prototype.update;
    Scene_CustomSaveBase.prototype.update = function() {
        if (this._listWindow && this._buttonGroups) this.updateButtonWindows();
        _Scene_CustomSaveBase_update.call(this);
    };

    Scene_CustomSaveBase.prototype.onActionSave = function() {
        if (isChoiceActive()) { SoundManager.playBuzzer(); return; }
        var id = this._listWindow.savefileId();
        $gameSystem.onBeforeSave();
        if (DataManager.saveGame(id)) {
            SoundManager.playSave();
            this._listWindow.clearSaveCache(id);
            this._listWindow.refresh();
        } else SoundManager.playBuzzer();
    };

    Scene_CustomSaveBase.prototype.onActionLoad = function() {
        var id = this._listWindow.savefileId();
        if (DataManager.loadGame(id)) {
            SoundManager.playLoad();
            $gameSystem.onAfterLoad();
            SceneManager.goto(Scene_Map);
        } else SoundManager.playBuzzer();
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
            this._listWindow.clearSaveCache(id);
            this._listWindow.refresh();
        }
    };

    Scene_CustomSaveBase.prototype.onConfirmCancel = function() {
        this._confirmWindow.close();
        this.removeChild(this._confirmWindow);
        this._listWindow.activate();
    };

    Scene_CustomSaveBase.prototype.mode = function() { return 'save'; };

    function Scene_CustomSave() { this.initialize.apply(this, arguments); }
    Scene_CustomSave.prototype = Object.create(Scene_CustomSaveBase.prototype);
    Scene_CustomSave.prototype.constructor = Scene_CustomSave;
    Scene_CustomSave.prototype.mode = function() { return 'save'; };

    function Scene_CustomLoad() { this.initialize.apply(this, arguments); }
    Scene_CustomLoad.prototype = Object.create(Scene_CustomSaveBase.prototype);
    Scene_CustomLoad.prototype.constructor = Scene_CustomLoad;
    Scene_CustomLoad.prototype.mode = function() { return 'load'; };

    Scene_Save = Scene_CustomSave;
    Scene_Load = Scene_CustomLoad;

    // Window_SaveConfirm (запасной)
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
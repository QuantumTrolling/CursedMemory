//=============================================================================
// CustomSaveLayout.js
//=============================================================================
// v3.39 – заголовок "Saves" для обеих сцен
//=============================================================================

/*:
 * @plugindesc v3.39 Кастомное меню сохранения/загрузки с блокировкой при диалоге.
 * @author YourName
 *
 * @param Save Button Text
 * @default Save
 *
 * @param Load Button Text
 * @default Load
 *
 * @param Overwrite Button Text
 * @default Overwrite
 *
 * @param Confirm Overwrite Text
 * @default Overwrite this save file?
 *
 * @param Save Button X
 * @type number
 * @default 0
 *
 * @param Save Button Y
 * @type number
 * @default -4
 *
 * @param Save Button Width
 * @type number
 * @default 0
 *
 * @param Save Button Height
 * @type number
 * @default 0
 *
 * @param Load Button X
 * @type number
 * @default 0
 *
 * @param Load Button Y
 * @type number
 * @default -4
 *
 * @param Load Button Width
 * @type number
 * @default 0
 *
 * @param Load Button Height
 * @type number
 * @default 0
 *
 * @param Overwrite Button X
 * @type number
 * @default 0
 *
 * @param Overwrite Button Y
 * @type number
 * @default -4
 *
 * @param Overwrite Button Width
 * @type number
 * @default 0
 *
 * @param Overwrite Button Height
 * @type number
 * @default 0
 *
 * @param Button Spacing
 * @type number
 * @default 8
 *
 * @param Text Offset X
 * @text Смещение текста по X
 * @type number
 * @desc Сдвиг текста относительно центра рамки по горизонтали.
 * @default 0
 *
 * @param Text Offset Y
 * @text Смещение текста по Y
 * @type number
 * @desc Сдвиг текста относительно центра рамки по вертикали.
 * @default 0
 *
 * @help
 * Разместите плагин ниже YEP_SaveCore, MOG_Weather_EX и MOG_SceneMenu.
 * При активном диалоге выбора иконка «Сохранить» затемнена, но доступна для наведения.
 * Нажатие и клик заблокированы.
 *
 * Текст внутри кнопок смещается на Text Offset X/Y относительно центра.
 * Если Button Width/Height = 0, размер рамки автоматически подбирается
 * так, чтобы текст со смещениями никогда не обрезался.
 * Если заданы фиксированные размеры — убедитесь, что они достаточны.
 *
 * @default
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

    // === Параметры ===
    var parameters = PluginManager.parameters('CustomSaveLayout');
    var SAVE_TEXT   = String(parameters['Save Button Text'] || 'Save');
    var LOAD_TEXT   = String(parameters['Load Button Text'] || 'Load');
    var OVERWRITE_TEXT = String(parameters['Overwrite Button Text'] || 'Overwrite');
    var CONFIRM_OVERWRITE = String(parameters['Confirm Overwrite Text'] || 'Overwrite this save file?');

    var TEXT_OFFSET_X = Number(parameters['Text Offset X'] || 0);
    var TEXT_OFFSET_Y = Number(parameters['Text Offset Y'] || 0);

    var BTN_CFG = {
        save: {
            x: Number(parameters['Save Button X'] || 0),
            y: Number(parameters['Save Button Y'] || -4),
            w: Number(parameters['Save Button Width'] || 120),
            h: Number(parameters['Save Button Height'] || 60)
        },
        load: {
            x: Number(parameters['Load Button X'] || 0),
            y: Number(parameters['Load Button Y'] || 15),
            w: Number(parameters['Load Button Width'] || 120),
            h: Number(parameters['Load Button Height'] || 60)
        },
        overwrite: {
            x: Number(parameters['Overwrite Button X'] || 30),
            y: Number(parameters['Overwrite Button Y'] || 15),
            w: Number(parameters['Overwrite Button Width'] || 180),
            h: Number(parameters['Overwrite Button Height'] || 60)
        }
    };
    var BTN_SPACING = Number(parameters['Button Spacing'] || 8);

    DataManager.maxSavefiles = function() { return 3; };

    if (!ImageManager.loadMenusFaces2) {
        ImageManager.loadMenusFaces2 = function(filename) {
            return this.loadBitmap('img/menus/faces/faces2/', filename, 0, true);
        };
    }

    function isChoiceActive() {
        return $gameMessage && $gameMessage.isChoice();
    }

    // --- БЛОКИРОВКА СЦЕН СОХРАНЕНИЯ/ЗАГРУЗКИ ---
    var _SceneManager_push = SceneManager.push;
    SceneManager.push = function(sceneClass) {
        if ((sceneClass === Scene_Save || sceneClass === Scene_Load || 
             sceneClass === Scene_CustomSave || sceneClass === Scene_CustomLoad) && 
            isChoiceActive()) {
            SoundManager.playBuzzer();
            return;
        }
        _SceneManager_push.call(this, sceneClass);
    };

    var _Scene_Map_commandSave = Scene_Map.prototype.commandSave;
    Scene_Map.prototype.commandSave = function() {
        if (isChoiceActive()) {
            SoundManager.playBuzzer();
            return;
        }
        _Scene_Map_commandSave.call(this);
    };

    var _Game_System_isSaveEnabled = Game_System.prototype.isSaveEnabled;
    Game_System.prototype.isSaveEnabled = function() {
        if (isChoiceActive()) return false;
        return _Game_System_isSaveEnabled.call(this);
    };

    var _Scene_Menu_commandSave = Scene_Menu.prototype.commandSave;
    Scene_Menu.prototype.commandSave = function() {
        if (isChoiceActive()) {
            SoundManager.playBuzzer();
            return;
        }
        _Scene_Menu_commandSave.call(this);
    };

    // --- ТУСКЛАЯ ИКОНКА «СОХРАНИТЬ» ---
    var _Scene_Menu_updateCommands = Scene_Menu.prototype.updateCommands;
    Scene_Menu.prototype.updateCommands = function() {
        _Scene_Menu_updateCommands.call(this);

        if (isChoiceActive()) {
            var blockedSymbols = ['save', 'load'];
            for (var i = 0; i < blockedSymbols.length; i++) {
                var idx = this._comList.findIndex(function(cmd) {
                    return cmd.symbol === blockedSymbols[i];
                });
                if (idx >= 0 && this._commands && this._commands[idx]) {
                    this._commands[idx].opacity = 160;
                }
            }
        }
    };

    var _Scene_Menu_checkTouchCommand = Scene_Menu.prototype.checkTouchCommand;
    Scene_Menu.prototype.checkTouchCommand = function() {
        if (isChoiceActive()) {
            var blockedSymbols = ['save', 'load'];
            for (var i = 0; i < blockedSymbols.length; i++) {
                var idx = this._comList.findIndex(function(cmd) {
                    return cmd.symbol === blockedSymbols[i];
                });
                if (idx >= 0 && this._commands && this._commands[idx] && 
                    this.isOnSprite(this._commands[idx])) {
                    SoundManager.playBuzzer();
                    return;
                }
            }
        }
        _Scene_Menu_checkTouchCommand.call(this);
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
    // Window_SaveSingleButton
    //-----------------------------------------------------------------------------

    function Window_SaveSingleButton() {
        this.initialize.apply(this, arguments);
    }
    Window_SaveSingleButton.prototype = Object.create(Window_Base.prototype);
    Window_SaveSingleButton.prototype.constructor = Window_SaveSingleButton;

    Window_SaveSingleButton.prototype.initialize = function(x, y, w, h) {
        Window_Base.prototype.initialize.call(this, x, y, w, h);
        this.padding = 0;
        this.backOpacity = 0;
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
        this.resetFontSettings();
        var cw = this.contents.width;
        var ch = this.contents.height;
        var textWidth = this.textWidth(this._text);

        var textX = (cw - textWidth) / 2 + TEXT_OFFSET_X;
        var textY = (ch - this.lineHeight()) / 2 + TEXT_OFFSET_Y;

        if (this._enabled && this._hover) {
            var alpha = 0.2 + Math.sin(this._anim) * 0.1;
            this.contents.fillRect(0, 0, cw, ch, 'rgba(255, 255, 255, ' + alpha + ')');
        }

        if (this._enabled) {
            this.changeTextColor(this.textColor(0));
        } else {
            this.changeTextColor(this.textColor(16));
        }

        this.drawText(this._text, textX, textY, textWidth, 'left');
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
    // Window_SaveTitle – всегда "Saves", по центру
    //-----------------------------------------------------------------------------

    function Window_SaveTitle() {
        this.initialize.apply(this, arguments);
    }
    Window_SaveTitle.prototype = Object.create(Window_Base.prototype);
    Window_SaveTitle.prototype.constructor = Window_SaveTitle;

    Window_SaveTitle.prototype.initialize = function() {
        // Текст всегда "Saves"
        var text = 'Saves';
        // Ширина с запасом, высота — строка + отступы
        var w = 120;
        var h = this.lineHeight() + 12;
        Window_Base.prototype.initialize.call(this, 0, 0, w, h);
        this.padding = 0;
        this.backOpacity = 0;
        this._text = text;
        this.refresh();
    };

    Window_SaveTitle.prototype.refresh = function() {
        this.contents.clear();
        this.changeTextColor(this.textColor(0));
        var textWidth = this.textWidth(this._text);
        var textX = (this.contents.width - textWidth) / 2;
        var textY = (this.contents.height - this.lineHeight()) / 2;
        this.drawText(this._text, textX, textY, textWidth, 'left');
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
        var slotH = this.itemHeight();
        var height = slotH * 3 + this.standardPadding() * 2;
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
        this.select(0);
    };

    Window_CustomSaveList.prototype.maxItems = function() { return 3; };
    Window_CustomSaveList.prototype.itemHeight = function() { 
        return this.lineHeight() * 3 + 18; 
    };
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

        var maxFaces = $gameParty.maxBattleMembers();
        actorIds = actorIds.slice(0, maxFaces);

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
                    var actorIds = content.party._actors.slice(0, $gameParty.maxBattleMembers());
                    var allReady = true;
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
                                return;
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
        this.createTitleWindow();
        this.createListWindow();
        this.createButtonWindows();
    };

    Scene_CustomSaveBase.prototype.createTitleWindow = function() {
        // Всегда создаём заголовок с текстом "Saves"
        this._titleWindow = new Window_SaveTitle();
        this._titleWindow.x = 10;
        this._titleWindow.y = 10;
        this.addWindow(this._titleWindow);
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

            while (group.length > buttons.length) {
                var old = group.pop();
                this.removeChild(old);
            }
            while (group.length < buttons.length) {
                var newBtn = new Window_SaveSingleButton(0, 0, 1, 1);
                newBtn._actionCallback = this.onButtonAction.bind(this);
                this.addWindow(newBtn);
                group.push(newBtn);
            }

            var totalWidth = 0;
            var widths = [];
            for (var b = 0; b < buttons.length; b++) {
                var cfgKey = buttons[b].action;
                var cfg = BTN_CFG[cfgKey];
                var textW = list.textWidth(buttons[b].text);
                var baseW;
                if (cfg.w > 0) {
                    baseW = cfg.w;
                } else {
                    baseW = Math.ceil(textW) + Math.abs(TEXT_OFFSET_X) * 2 + 4;
                }
                widths.push(baseW);
                totalWidth += baseW;
            }
            if (buttons.length > 1) totalWidth += BTN_SPACING * (buttons.length - 1);

            var slotCenterX = list.x + rect.x + rect.width / 2;
            var slotBottomY = list.y + rect.y + rect.height;
            var startX = slotCenterX - totalWidth / 2;
            var x = startX;

            for (var b = 0; b < buttons.length; b++) {
                var btn = buttons[b];
                var cfgKey = btn.action;
                var cfg = BTN_CFG[cfgKey];
                var textH = list.lineHeight();

                var finalW = widths[b];
                var finalH;
                if (cfg.h > 0) {
                    finalH = cfg.h;
                } else {
                    finalH = textH + Math.abs(TEXT_OFFSET_Y) * 2 + 4;
                }

                var btnX = x + cfg.x;
                var btnY = slotBottomY + cfg.y - finalH;

                group[b].move(btnX, btnY, finalW, finalH);
                group[b].createContents();
                group[b].setButton(btn.text, btn.action, btn.enabled, this.onButtonAction.bind(this));

                x += widths[b] + BTN_SPACING;
            }

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
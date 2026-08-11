//=============================================================================
// CustomSaveLayout.js
//=============================================================================
// v3.51 – исправлена ошибка AudioManager при загрузке
//=============================================================================

/*:
 * @plugindesc v3.51 Кастомное меню сохранения/загрузки (исправление загрузки).
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
 * @param Slot Font Size
 * @text Размер шрифта слотов
 * @type number
 * @desc Размер шрифта для названий слотов (0 — стандартный).
 * @default 0
 *
 * @param Button Font Size
 * @text Размер шрифта кнопок
 * @type number
 * @desc Размер шрифта для текста кнопок Save/Load/Overwrite (0 — стандартный).
 * @default 0
 *
 * @param Title Text
 * @text Текст заголовка
 * @desc Текст, отображаемый в заголовке окна сохранений.
 * @default Saves
 *
 * @param Title Font Size
 * @text Размер шрифта заголовка
 * @type number
 * @desc Размер шрифта заголовка (0 — стандартный).
 * @default 0
 *
 * @param Title Width
 * @text Ширина заголовка
 * @type number
 * @desc Ширина окна заголовка (0 — авто).
 * @default 0
 *
 * @param Title Height
 * @text Высота заголовка
 * @type number
 * @desc Высота окна заголовка (0 — авто).
 * @default 0
 *
 * @help
 * Разместите плагин ниже YEP_SaveCore, MOG_Weather_EX и MOG_SceneMenu.
 * При активном диалоге выбора иконка «Сохранить» затемнена, но доступна для наведения.
 * Нажатие и клик заблокированы.
 *
 * Кнопки действий (Save/Load/Overwrite) активируются только кликом мыши или касанием.
 * Клавиша Enter в сценах сохранения/загрузки не действует.
 * Стрелки вверх/вниз переключают выбранный слот (без подсветки).
 * Cancel (Esc) возвращает в предыдущее меню.
 * Правая кнопка мыши также возвращает в предыдущее меню.
 *
 * Текст внутри кнопок смещается на Text Offset X/Y относительно центра.
 * Если Button Width/Height = 0, размер рамки автоматически подбирается
 * так, чтобы текст со смещениями никогда не обрезался.
 * Если заданы фиксированные размеры — убедитесь, что они достаточны.
 *
 * При изменении размеров шрифтов может потребоваться вручную подобрать
 * размеры окон через соответствующие параметры.
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
            y: Number(parameters['Save Button Y'] || -15),
            w: Number(parameters['Save Button Width'] || 160),
            h: Number(parameters['Save Button Height'] || 60)
        },
        load: {
            x: Number(parameters['Load Button X'] || 0),
            y: Number(parameters['Load Button Y'] || -15),
            w: Number(parameters['Load Button Width'] || 170),
            h: Number(parameters['Load Button Height'] || 60)
        },
        overwrite: {
            x: Number(parameters['Overwrite Button X'] || 20),
            y: Number(parameters['Overwrite Button Y'] || -15),
            w: Number(parameters['Overwrite Button Width'] || 230),
            h: Number(parameters['Overwrite Button Height'] || 60)
        }
    };
    var BTN_SPACING = Number(parameters['Button Spacing'] || 4);

    var SAVE_SLOT_FONT_SIZE = Number(parameters['Slot Font Size'] || 32);
    var BUTTON_FONT_SIZE = Number(parameters['Button Font Size'] || 32);

    var TITLE_TEXT = String(parameters['Title Text'] || 'Saves');
    var TITLE_FONT_SIZE = Number(parameters['Title Font Size'] || 32);
    var TITLE_WIDTH = Number(parameters['Title Width'] || 140);
    var TITLE_HEIGHT = Number(parameters['Title Height'] || 60);

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
            if (hasSave) {
                btns.push({ text: LOAD_TEXT, action: 'load', enabled: true });
            }
            return btns;
        }
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
        this._text = '';
        this._enabled = true;
        this._hover = false;
        this._anim = 0;
        this._action = null;
        this._actionCallback = null;
        this._slotIndex = 0;
        this.deactivate();
        this.refresh();
    };

    Window_SaveSingleButton.prototype.setButton = function(text, action, enabled, callback, slotIndex) {
        this._text = text;
        this._action = action;
        this._enabled = enabled;
        this._actionCallback = callback;
        this._slotIndex = (slotIndex !== undefined) ? slotIndex : 0;
        this.refresh();
    };

    Window_SaveSingleButton.prototype.refresh = function() {
        this.contents.clear();
        this.resetFontSettings();
        var defaultFontSize = this.contents.fontSize;
        if (BUTTON_FONT_SIZE > 0) {
            this.contents.fontSize = BUTTON_FONT_SIZE;
        }
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
        if (BUTTON_FONT_SIZE > 0) {
            this.contents.fontSize = defaultFontSize;
        }
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
                this._actionCallback(this._action, this._slotIndex);
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Window_SaveTitle
    //-----------------------------------------------------------------------------

    function Window_SaveTitle() {
        this.initialize.apply(this, arguments);
    }
    Window_SaveTitle.prototype = Object.create(Window_Base.prototype);
    Window_SaveTitle.prototype.constructor = Window_SaveTitle;

    Window_SaveTitle.prototype.initialize = function() {
        Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
        this._text = TITLE_TEXT;
        var originalFontSize = this.contents.fontSize;
        if (TITLE_FONT_SIZE > 0) {
            this.contents.fontSize = TITLE_FONT_SIZE;
        }
        var textWidth = this.textWidth(this._text);
        var lineHeight = this.lineHeight();
        var pad = this.standardPadding();
        var tw, th;
        if (TITLE_WIDTH > 0) {
            tw = TITLE_WIDTH;
        } else {
            tw = textWidth + pad * 2;
        }
        if (TITLE_HEIGHT > 0) {
            th = TITLE_HEIGHT;
        } else {
            th = lineHeight + pad * 2;
        }
        this.contents.fontSize = originalFontSize;
        this.width = tw;
        this.height = th;
        this.createContents();
        this.refresh();
    };

    Window_SaveTitle.prototype.refresh = function() {
        this.contents.clear();
        var originalFontSize = this.contents.fontSize;
        if (TITLE_FONT_SIZE > 0) {
            this.contents.fontSize = TITLE_FONT_SIZE;
        }
        this.changeTextColor(this.textColor(0));
        var textWidth = this.textWidth(this._text);
        var textX = (this.contents.width - textWidth) / 2;
        var textY = (this.contents.height - this.lineHeight()) / 2;
        this.drawText(this._text, textX, textY, textWidth, 'left');
        this.contents.fontSize = originalFontSize;
    };

    //-----------------------------------------------------------------------------
    // Window_SaveSlot
    //-----------------------------------------------------------------------------

    function Window_SaveSlot() {
        this.initialize.apply(this, arguments);
    }
    Window_SaveSlot.prototype = Object.create(Window_Base.prototype);
    Window_SaveSlot.prototype.constructor = Window_SaveSlot;

    Window_SaveSlot.prototype.initialize = function(x, y, width, slotIndex, sceneRef) {
        this._slotIndex = slotIndex;
        this._savefileId = slotIndex + 1;
        this._scene = sceneRef;
        this._needsFaceRefresh = false;
        this._actorIds = null;
        Window_Base.prototype.initialize.call(this, x, y, width, this.windowHeight());
        this.refresh();
    };

    Window_SaveSlot.prototype.windowHeight = function() {
        return this.lineHeight() * 3 + this.standardPadding() * 2 + 18;
    };

    Window_SaveSlot.prototype.refresh = function() {
        this.contents.clear();
        this.resetFontSettings();
        var id = this._savefileId;
        var info = DataManager.loadSavefileInfo(id);
        var hasSave = !!info;
        var defaultFontSize = this.contents.fontSize;
        if (SAVE_SLOT_FONT_SIZE > 0) {
            this.contents.fontSize = SAVE_SLOT_FONT_SIZE;
        }
        var textX = 10;
        var faceAreaWidth = 210;
        var faceAreaX = this.contents.width - 10 - faceAreaWidth;
        var textWidth = faceAreaX - textX - 10;
        var label = (id === 1) ? 'Autosave' : 'Save' + (id - 1);
        var labelY = 2;
        if (hasSave) {
            this.drawText(label, textX, labelY, textWidth, 'left');
        } else {
            this.drawText(label + '  (Empty)', textX, labelY, textWidth, 'left');
        }
        if (SAVE_SLOT_FONT_SIZE > 0) {
            this.contents.fontSize = defaultFontSize;
        }
        if (hasSave) this.drawFaces(faceAreaX, faceAreaWidth, labelY);
    };

    Window_SaveSlot.prototype.drawFaces = function(areaX, areaWidth, faceY) {
        var cache = this._scene._saveCache;
        var id = this._savefileId;
        var content = cache[id];
        if (!content) {
            var raw = StorageManager.load(id);
            if (raw) {
                try { content = JsonEx.parse(raw); cache[id] = content; } catch(e) { return; }
            }
        }
        if (!content || !content.party || !content.party._actors) return;
        var actorIds = content.party._actors.slice(0, $gameParty.maxBattleMembers());
        if (actorIds.length === 0) return;
        this._actorIds = actorIds;
        var faceW = 48, faceH = 48, gap = 4;
        var totalWidth = actorIds.length * faceW + (actorIds.length - 1) * gap;
        var startX = areaX + (areaWidth - totalWidth) / 2;
        var faceDrawY = faceY;
        var allReady = true;
        for (var i = 0; i < actorIds.length; i++) {
            var bmp = ImageManager.loadMenusFaces2('Actor_' + actorIds[i]);
            if (bmp.isReady()) {
                var scale = Math.min(faceW / bmp.width, faceH / bmp.height);
                var dw = bmp.width * scale, dh = bmp.height * scale;
                var dx = startX + i * (faceW + gap) + (faceW - dw) / 2;
                var dy = faceDrawY + (faceH - dh) / 2;
                this.contents.blt(bmp, 0, 0, bmp.width, bmp.height, dx, dy, dw, dh);
            } else {
                allReady = false;
                break;
            }
        }
        if (!allReady) {
            this._needsFaceRefresh = true;
        } else {
            this._needsFaceRefresh = false;
        }
    };

    Window_SaveSlot.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        if (this._needsFaceRefresh && this._actorIds) {
            var allReady = true;
            for (var i = 0; i < this._actorIds.length; i++) {
                if (!ImageManager.loadMenusFaces2('Actor_' + this._actorIds[i]).isReady()) {
                    allReady = false;
                    break;
                }
            }
            if (allReady) {
                this._needsFaceRefresh = false;
                this.refresh();
            }
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
        this._selectedSlot = 0;
        this._saveCache = {};
    };

    Scene_CustomSaveBase.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createTitleWindow();
        this.createSlotWindows();
        this.createButtonWindows();
        this._onRightClick = this.onRightClick.bind(this);
        document.addEventListener('contextmenu', this._onRightClick);
    };

    Scene_CustomSaveBase.prototype.onRightClick = function(event) {
        event.preventDefault();
        this.popScene();
    };

    var _Scene_CustomSaveBase_terminate = Scene_CustomSaveBase.prototype.terminate;
    Scene_CustomSaveBase.prototype.terminate = function() {
        document.removeEventListener('contextmenu', this._onRightClick);
        _Scene_CustomSaveBase_terminate.call(this);
    };

    Scene_CustomSaveBase.prototype.createTitleWindow = function() {
        this._titleWindow = new Window_SaveTitle();
        this._titleWindow.x = 10;
        this._titleWindow.y = 10;
        this.addWindow(this._titleWindow);
    };

    Scene_CustomSaveBase.prototype.createSlotWindows = function() {
        this._slotWindows = [];
        var slotWidth = 520;
        var slotHeight = Window_SaveSlot.prototype.windowHeight();
        var totalHeight = slotHeight * 3;
        var startY = (Graphics.boxHeight - totalHeight) / 2;
        for (var i = 0; i < 3; i++) {
            var win = new Window_SaveSlot(0, 0, slotWidth, i, this);
            win.x = (Graphics.boxWidth - slotWidth) / 2;
            win.y = startY + i * slotHeight;
            this.addWindow(win);
            this._slotWindows.push(win);
        }
    };

    Scene_CustomSaveBase.prototype.createButtonWindows = function() {
        this._buttonGroups = [];
        for (var i = 0; i < 3; i++) {
            this._buttonGroups[i] = [];
        }
        this.updateButtonWindows();
    };

    Scene_CustomSaveBase.prototype.updateButtonWindows = function() {
        var pad = Window_Base.prototype.standardPadding();
        for (var i = 0; i < 3; i++) {
            var slotWin = this._slotWindows[i];
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
            var tmpFontSize = slotWin.contents.fontSize;
            if (BUTTON_FONT_SIZE > 0) {
                slotWin.contents.fontSize = BUTTON_FONT_SIZE;
            }
            var totalWidth = 0;
            var widths = [];
            for (var b = 0; b < buttons.length; b++) {
                var cfgKey = buttons[b].action;
                var cfg = BTN_CFG[cfgKey];
                var textW = slotWin.textWidth(buttons[b].text);
                var contentsW = Math.ceil(textW) + Math.abs(TEXT_OFFSET_X) * 2 + 4;
                var baseW = contentsW + pad * 2;
                if (cfg.w > 0) baseW = cfg.w;
                widths.push(baseW);
                totalWidth += baseW;
            }
            if (BUTTON_FONT_SIZE > 0) {
                slotWin.contents.fontSize = tmpFontSize;
            }
            if (buttons.length > 1) totalWidth += BTN_SPACING * (buttons.length - 1);
            var slotCenterX = slotWin.x + slotWin.width / 2;
            var slotBottomY = slotWin.y + slotWin.height;
            var startX = slotCenterX - totalWidth / 2;
            var x = startX;
            for (var b = 0; b < buttons.length; b++) {
                var btn = buttons[b];
                var cfgKey = btn.action;
                var cfg = BTN_CFG[cfgKey];
                var textH;
                if (BUTTON_FONT_SIZE > 0) {
                    var savedFontSize = slotWin.contents.fontSize;
                    slotWin.contents.fontSize = BUTTON_FONT_SIZE;
                    textH = slotWin.lineHeight();
                    slotWin.contents.fontSize = savedFontSize;
                } else {
                    textH = slotWin.lineHeight();
                }
                var contentsH = textH + Math.abs(TEXT_OFFSET_Y) * 2 + 4;
                var finalH = contentsH + pad * 2;
                if (cfg.h > 0) finalH = cfg.h;
                var btnX = x + cfg.x;
                var btnY = slotBottomY + cfg.y - finalH;
                group[b].move(btnX, btnY, widths[b], finalH);
                group[b].createContents();
                group[b].setButton(btn.text, btn.action, btn.enabled, this.onButtonAction.bind(this), i);
                x += widths[b] + BTN_SPACING;
            }
            for (var b = buttons.length; b < group.length; b++) {
                group[b].hide();
            }
        }
    };

    Scene_CustomSaveBase.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
        this.updateSelection();
        this.updateButtonWindows();
    };

    Scene_CustomSaveBase.prototype.updateSelection = function() {
        var last = this._selectedSlot;
        if (Input.isRepeated('up')) {
            this._selectedSlot = (this._selectedSlot - 1 + 3) % 3;
        } else if (Input.isRepeated('down')) {
            this._selectedSlot = (this._selectedSlot + 1) % 3;
        }
        if (last !== this._selectedSlot) {
            SoundManager.playCursor();
        }
        if (TouchInput.isTriggered()) {
            var gx = TouchInput.x;
            var gy = TouchInput.y;
            var hitButton = false;
            for (var i = 0; i < this._buttonGroups.length; i++) {
                var group = this._buttonGroups[i];
                for (var j = 0; j < group.length; j++) {
                    var btn = group[j];
                    if (btn.visible && btn.x <= gx && gx < btn.x + btn.width &&
                        btn.y <= gy && gy < btn.y + btn.height) {
                        hitButton = true;
                        break;
                    }
                }
                if (hitButton) break;
            }
            if (!hitButton) {
                for (var i = 0; i < this._slotWindows.length; i++) {
                    var win = this._slotWindows[i];
                    if (win.x <= gx && gx < win.x + win.width &&
                        win.y <= gy && gy < win.y + win.height) {
                        if (this._selectedSlot !== i) {
                            this._selectedSlot = i;
                            SoundManager.playCursor();
                        }
                        break;
                    }
                }
            }
        }
        if (Input.isTriggered('cancel')) {
            this.popScene();
        }
    };

    Scene_CustomSaveBase.prototype.onButtonAction = function(action, slotIndex) {
        this._selectedSlot = slotIndex;
        switch (action) {
            case 'save': this.onActionSave(); break;
            case 'load': this.onActionLoad(); break;
            case 'overwrite': this.onActionOverwrite(); break;
        }
    };

    Scene_CustomSaveBase.prototype.onActionSave = function() {
        if (isChoiceActive()) { SoundManager.playBuzzer(); return; }
        var id = this._selectedSlot + 1;
        $gameSystem.onBeforeSave();
        if (DataManager.saveGame(id)) {
            SoundManager.playSave();
            delete this._saveCache[id];
            this._slotWindows[this._selectedSlot]._needsFaceRefresh = false;
            this._slotWindows[this._selectedSlot].refresh();
        } else {
            SoundManager.playBuzzer();
        }
    };

    Scene_CustomSaveBase.prototype.onActionLoad = function() {
        var id = this._selectedSlot + 1;
        if (DataManager.loadGame(id)) {
            SoundManager.playLoad();
            this.fadeOutAll();
            try {
                $gameSystem.onAfterLoad();
            } catch (e) {
                console.error("Error during onAfterLoad:", e);
            }
            SceneManager.goto(Scene_Map);
        } else {
            SoundManager.playBuzzer();
        }
    };

    Scene_CustomSaveBase.prototype.onActionOverwrite = function() {
        if (isChoiceActive()) { SoundManager.playBuzzer(); return; }
        this._overwriteSlotId = this._selectedSlot + 1;
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
            delete this._saveCache[id];
            this._slotWindows[this._selectedSlot]._needsFaceRefresh = false;
            this._slotWindows[this._selectedSlot].refresh();
        }
    };

    Scene_CustomSaveBase.prototype.onConfirmCancel = function() {
        this._confirmWindow.close();
        this.removeChild(this._confirmWindow);
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
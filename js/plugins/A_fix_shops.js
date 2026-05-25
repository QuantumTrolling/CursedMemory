//=============================================================================
// A_fix_shops.js (гарантированное количество колонок, column-major режим)
//=============================================================================
/*:
 * @plugindesc Полностью переработанный интерфейс магазина
 * @author
 *
 * @help
 * - Сетка товаров с СТРОГО ЗАДАННЫМ количеством колонок (параметр listColumns)
 * - Только кнопка "Купить"
 * - Все позиции настраиваются через параметры
 * - Чтобы колонки не «схлопывались», установите достаточную ширину списка:
 *   для 4 колонок – 800+, для 5 колонок – 1000+, для 6 – 1200+ и т.д.
 * - Режим заполнения: "column" – товары заполняются сверху вниз по колонкам (Diablo-стиль),
 *   "row" – стандартное построчное заполнение слева направо.
 *
 * ============================
 * ОСНОВНЫЕ НАСТРОЙКИ
 * ============================
 *
 * @param bgDefault
 * @text Фон магазина
 * @default fon_taverna
 *
 * @param traderDefault
 * @text Торговец
 * @default velrand_with_bag
 *
 * @param traderX
 * @text Торговец X
 * @type number
 * @default 480
 *
 * @param traderY
 * @text Торговец Y
 * @type number
 * @default 60
 *
 * @param coinIcon
 * @text Иконка валюты
 * @type number
 * @default 313
 *
 * ============================
 * СПИСОК ТОВАРОВ
 * ============================
 *
 * @param listX
 * @text Список X
 * @type number
 * @default 0
 *
 * @param listY
 * @text Список Y
 * @type number
 * @default 0
 *
 * @param listWidth
 * @text Ширина списка (для 5 колонок ставьте 1000+)
 * @type number
 * @default 1000
 *
 * @param listHeight
 * @text Высота списка
 * @type number
 * @default 600
 *
 * @param listColumns
 * @text Количество колонок (строго!)
 * @type number
 * @default 4
 *
 * @param listFontSize
 * @text Шрифт цены
 * @type number
 * @default 18
 *
 * ============================
 * ОПИСАНИЕ
 * ============================
 *
 * @param descX
 * @text Описание X
 * @type number
 * @default 0
 *
 * @param descY
 * @text Описание Y
 * @type number
 * @default 440
 *
 * @param descWidth
 * @text Ширина описания
 * @type number
 * @default 800
 *
 * @param descHeight
 * @text Высота описания
 * @type number
 * @default 300
 *
 * @param descFontSize
 * @text Размер шрифта описания
 * @type number
 * @default 14
 *
 * @param descLines
 * @text Макс строк (0 = автоподбор по высоте)
 * @type number
 * @default 0
 *
 * ============================
 * КНОПКА КУПИТЬ
 * ============================
 *
 * @param buyBtnX
 * @text Кнопка X
 * @type number
 * @default 516
 *
 * @param buyBtnY
 * @text Кнопка Y
 * @type number
 * @default 390
 *
 * ============================
 * НАЗВАНИЕ ПРЕДМЕТА
 * ============================
 *
 * @param nameX
 * @text Название X
 * @type number
 * @default 0
 *
 * @param nameY
 * @text Название Y
 * @type number
 * @default 410
 *
 * @param nameWidth
 * @text Ширина названия
 * @type number
 * @default 800
 *
 * ============================
 * ПРОЧЕЕ
 * ============================
 *
 * @param goldY
 * @text Золото Y
 * @type number
 * @default 0
 *
 * @param fillMode
 * @text Заполнение: row (по строкам) или column (по колонкам)
 * @type string
 * @default column
 */

var Imported = Imported || {};
Imported.A_fix_shops = true;

if (!Imported.YEP_ShopMenuCore) {
    console.error('A_fix_shops: требуется YEP_ShopMenuCore!');
}

(function() {
    'use strict';

    var parameters = PluginManager.parameters('A_fix_shops');
    var params = {
        bgDefault: String(parameters['bgDefault'] || 'fon_taverna'),
        traderDefault: String(parameters['traderDefault'] || 'velrand_with_bag'),
        traderX: Number(parameters['traderX'] || 480),
        traderY: Number(parameters['traderY'] || 60),
        coinIcon: Number(parameters['coinIcon'] || 313),
        listX: Number(parameters['listX'] || 0),
        listY: Number(parameters['listY'] || 0),
        listWidth: Number(parameters['listWidth'] || 1000),
        listHeight: Number(parameters['listHeight'] || 600),
        listColumns: Number(parameters['listColumns'] || 4),
        listFontSize: Number(parameters['listFontSize'] || 18),
        descX: Number(parameters['descX'] || 0),
        descY: Number(parameters['descY'] || 440),
        descHeight: Number(parameters['descHeight'] || 300),
        descFontSize: Number(parameters['descFontSize'] || 14),
        descLines: Number(parameters['descLines'] || 0),
        descWidth: Number(parameters['descWidth'] || 800),
        actionX: Number(parameters['actionX'] || 516),
        actionY: Number(parameters['actionY'] || 390),
        buyBtnX: Number(parameters['buyBtnX'] || 516),
        buyBtnY: Number(parameters['buyBtnY'] || 390),
        nameX: Number(parameters['nameX'] || 0),
        nameY: Number(parameters['nameY'] || 410),
        nameWidth: Number(parameters['nameWidth'] || 800),
        goldX: Number(parameters['goldX'] || 0),
        goldY: Number(parameters['goldY'] || 0),
        sellButton: parameters['sellButton'] === 'false' ? false : true,
        fillMode: String(parameters['fillMode'] || 'column').toLowerCase()
    };

    var coinIconIndex = params.coinIcon !== 0 ? params.coinIcon : ($dataSystem ? $dataSystem.currencyIcon || 313 : 313);

    //=============================================================================
    // Window_ShopItemName
    //=============================================================================
    function Window_ShopItemName() {
        this.initialize.apply(this, arguments);
    }
    Window_ShopItemName.prototype = Object.create(Window_Base.prototype);
    Window_ShopItemName.prototype.constructor = Window_ShopItemName;

    Window_ShopItemName.prototype.initialize = function() {
        var height = this.fittingHeight(1);
        Window_Base.prototype.initialize.call(this,
            params.nameX,
            params.nameY,
            params.nameWidth,
            height
        );
        this._item = null;
        this.refresh();
    };

    Window_ShopItemName.prototype.setItem = function(item) {
        if (this._item === item) return;
        this._item = item;
        this.refresh();
    };

    Window_ShopItemName.prototype.refresh = function() {
        this.contents.clear();
        if (this._item) {
            this.resetFontSettings();
            this.contents.fontSize = 32;
            this.changeTextColor(this.normalColor());
            this.drawText(this._item.name, this.textPadding(), 0,
                         this.contents.width - this.textPadding() * 2, 'left');
        }
    };

    //=============================================================================
    // Window_ShopDesc
    //=============================================================================
    function Window_ShopDesc() {
        this.initialize.apply(this, arguments);
    }
    Window_ShopDesc.prototype = Object.create(Window_Base.prototype);
    Window_ShopDesc.prototype.constructor = Window_ShopDesc;

    Window_ShopDesc.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._item = null;
        this.refresh();
    };

    Window_ShopDesc.prototype.standardFontSize = function() {
        return params.descFontSize;
    };

    Window_ShopDesc.prototype.setItem = function(item) {
        if (this._item === item) return;
        this._item = item;
        this.refresh();
    };

    Window_ShopDesc.prototype.refresh = function() {
        this.contents.clear();
        if (this._item) {
            var desc = this._item.description.replace(/\\n/g, '\n');
            var lines = desc.split('\n');

            if (params.descLines > 0) {
                lines = lines.slice(0, params.descLines);
            } else {
                var maxLinesByHeight = Math.floor(this.contentsHeight() / this.lineHeight());
                lines = lines.slice(0, Math.max(1, maxLinesByHeight));
            }
            desc = lines.join('\n');

            this.resetFontSettings();
            this.drawTextEx(desc, this.textPadding(), 0);
        }
    };

    //=============================================================================
    // Window_ShopBuyAction
    //=============================================================================
    function Window_ShopBuyAction() {
        this.initialize.apply(this, arguments);
    }
    Window_ShopBuyAction.prototype = Object.create(Window_Base.prototype);
    Window_ShopBuyAction.prototype.constructor = Window_ShopBuyAction;

    Window_ShopBuyAction.prototype.initialize = function(x, y, width) {
        Window_Base.prototype.initialize.call(this,
            params.buyBtnX,
            params.buyBtnY,
            width,
            this.fittingHeight(1)
        );
        this._enabled = false;
        this._hover = false;
        this._anim = 0;
        this.refresh();
    };

    Window_ShopBuyAction.prototype.setEnabled = function(enabled) {
        if (this._enabled !== enabled) {
            this._enabled = enabled;
            this.refresh();
        }
    };

    Window_ShopBuyAction.prototype.refresh = function() {
        this.contents.clear();
        var rect = new Rectangle(0, 0, this.contents.width, this.contents.height);
        var colorIndex = this._enabled ? 0 : 16;
        this.changeTextColor(this.textColor(colorIndex));
        if (this._enabled && this._hover) {
            var alpha = 0.2 + Math.sin(this._anim) * 0.1;
            this.contents.fillRect(rect.x, rect.y, rect.width, rect.height,
                'rgba(255, 255, 255, ' + alpha + ')');
        }
        this.drawText("Купить", rect.x, rect.y, rect.width, 'center');
    };

    Window_ShopBuyAction.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        this._hover = (x >= 0 && y >= 0 && x < this.width && y < this.height);
        this._anim += 0.05;
        this.refresh();
        if (TouchInput.isTriggered() && this._enabled && this._hover) {
            SceneManager._scene.commandBuyAction();
        }
    };

    //=============================================================================
    // Window_ShopBuyCustom
    //=============================================================================
    function Window_ShopBuyCustom() {
        this.initialize.apply(this, arguments);
    }
    Window_ShopBuyCustom.prototype = Object.create(Window_ShopBuy.prototype);
    Window_ShopBuyCustom.prototype.constructor = Window_ShopBuyCustom;

    Window_ShopBuyCustom.prototype.initialize = function(x, y, height, goods) {
        Window_ShopBuy.prototype.initialize.call(this, x, y, height, goods);
        this._colMax = params.listColumns;
        this._hoverIndex = -1;
        this._hoverAnim = 0;
        this._itemSelected = false;
        this._customDescWindow = null;
        this._customNameWindow = null;
        this._buyActionWindow = null;
    };

    // Получение предмета по текущему индексу (с учётом column-major)
    Window_ShopBuyCustom.prototype.item = function() {
        var index = this.index();
        if (index >= 0 && index < this._data.length) {
            return this._data[index];
        }
        return null;
    };

    Window_ShopBuyCustom.prototype.callUpdateHelp = function() {
        Window_ShopBuy.prototype.updateHelp.call(this);
        var item = this.item();
        if (item) {
            if (this._customDescWindow) {
                this._customDescWindow.visible = true;
                this._customDescWindow.setItem(item);
            }
            if (this._customNameWindow) {
                this._customNameWindow.visible = true;
                this._customNameWindow.setItem(item);
            }
        } else {
            if (this._customDescWindow) this._customDescWindow.visible = false;
            if (this._customNameWindow) this._customNameWindow.visible = false;
        }
        if (SceneManager._scene) {
            SceneManager._scene.updateActionEnabled();
        }
    };

    Window_ShopBuyCustom.prototype.isTouchEnabled = function() {
        return Window_ShopBuy.prototype.isTouchEnabled.call(this);
    };

    Window_ShopBuyCustom.prototype.select = function(index) {
        if (this._itemSelected && index !== this.index()) return;
        Window_ShopBuy.prototype.select.call(this, index);
        if (index !== -1) {
            this.callUpdateHelp();
        }
    };

    Window_ShopBuyCustom.prototype._refreshFrame = function() {};
    Window_ShopBuyCustom.prototype._refreshBack = function() {};

    Window_ShopBuyCustom.prototype.isCursorVisible = function() {
        return false;
    };

    Window_ShopBuyCustom.prototype.windowWidth = function() { return params.listWidth; };
    Window_ShopBuyCustom.prototype.maxCols = function() {
        return params.listColumns;
    };

    Window_ShopBuy.prototype.maxCols = function() {
        return params.listColumns;
    };

    Window_ShopBuyCustom.prototype.spacing = function() { return 0; };
    Window_ShopBuy.prototype.spacing = function() { return 0; };
    Window_ShopBuy.prototype.colSpacing = function() { return 0; };

    Window_ShopBuyCustom.prototype.numVisibleRows = function() {
        return Math.floor(this.height / this.itemHeight());
    };

    Window_ShopBuyCustom.prototype.lineHeight = function() {
        return Window_Base._iconHeight * 2 + Window_Base.prototype.lineHeight.call(this) + 24;
    };
    Window_ShopBuyCustom.prototype.itemHeight = function() { return this.lineHeight(); };

    Window_ShopBuyCustom.prototype.itemWidth = function() {
        var cols = this.maxCols();
        var totalWidth = this.contents.width - this.textPadding() * 2;
        return Math.floor(totalWidth / cols);
    };

    // Вычисление числа строк для column-major
    Window_ShopBuyCustom.prototype.rows = function() {
        return this.numVisibleRows();
    };

    // Максимальное количество отображаемых ячеек (заполняем всю сетку)
    Window_ShopBuyCustom.prototype.maxPageItems = function() {
        return this.maxCols() * this.rows();
    };

    Window_ShopBuyCustom.prototype.maxItems = function() {
        return this.maxCols() * this.rows();
    };

    // Главная фича: позиция ячейки в зависимости от режима заполнения
    Window_ShopBuyCustom.prototype.itemRect = function(index) {
        var maxCols = this.maxCols();
        var w = this.itemWidth();
        var h = this.itemHeight();

        if (params.fillMode === 'column') {
            // Column-major: сначала заполняются колонки сверху вниз
            var rows = this.rows();
            var col = Math.floor(index / rows);
            var row = index % rows;
        } else {
            // Row-major: стандартное заполнение слева направо
            var col = index % maxCols;
            var row = Math.floor(index / maxCols);
        }

        var x = col * w;
        var y = row * h;
        return new Rectangle(x, y, w, h);
    };

    // Навигация для column-major
    Window_ShopBuyCustom.prototype.isHorizontal = function() {
        return params.fillMode !== 'column';
    };

    Window_ShopBuyCustom.prototype.cursorRight = function(wrap) {
        if (params.fillMode !== 'column') {
            return Window_ShopBuy.prototype.cursorRight.call(this, wrap);
        }
        var rows = this.rows();
        var maxItems = this.maxItems();
        var index = this.index();
        var next = index + rows;
        if (next >= maxItems) {
            if (wrap) next = next % rows;
            else return;
        }
        this.select(next);
    };

    Window_ShopBuyCustom.prototype.cursorLeft = function(wrap) {
        if (params.fillMode !== 'column') {
            return Window_ShopBuy.prototype.cursorLeft.call(this, wrap);
        }
        var rows = this.rows();
        var index = this.index();
        var next = index - rows;
        if (next < 0) {
            if (wrap) next = this.maxItems() - rows + (index % rows);
            else return;
        }
        this.select(next);
    };

    Window_ShopBuyCustom.prototype.cursorDown = function(wrap) {
        if (params.fillMode !== 'column') {
            return Window_ShopBuy.prototype.cursorDown.call(this, wrap);
        }
        var rows = this.rows();
        var maxItems = this.maxItems();
        var index = this.index();
        var col = Math.floor(index / rows);
        var next = index + 1;
        // Проверяем, не вышли ли за границы текущей колонки
        if (Math.floor(next / rows) !== col || next >= maxItems) {
            if (wrap) {
                next = col * rows; // в начало колонки
            } else return;
        }
        this.select(next);
    };

    Window_ShopBuyCustom.prototype.cursorUp = function(wrap) {
        if (params.fillMode !== 'column') {
            return Window_ShopBuy.prototype.cursorUp.call(this, wrap);
        }
        var rows = this.rows();
        var index = this.index();
        var col = Math.floor(index / rows);
        var next = index - 1;
        if (next < 0 || Math.floor(next / rows) !== col) {
            if (wrap) {
                next = (col + 1) * rows - 1; // в конец колонки
            } else return;
        }
        this.select(next);
    };

    // Отрисовка карточки (общая для обоих режимов)
    Window_ShopBuyCustom.prototype.drawItem = function(index) {
        var item = (index < this._data.length) ? this._data[index] : null;
        var rect = this.itemRect(index);
        var x = rect.x;
        var y = rect.y;
        var w = rect.width;
        var h = this.itemHeight();
        var cx = x + w / 2;

        // Фон ячейки
        this.contents.fillRect(x, y, w, h, 'rgba(0, 0, 0, 0.4)');
        this.drawSkinFrame(x, y, w, h);

        if (!item) return; // пустая ячейка

        var isHover = (!this._itemSelected && index === this._hoverIndex);
        var isSelected = (this._itemSelected && index === this.index());
        var highlight = isHover || isSelected;

        if (highlight) {
            var alpha = 0.15 + Math.sin(this._hoverAnim) * 0.1;
            this.contents.fillRect(x, y, w, h, 'rgba(255,255,255,' + alpha + ')');
        }

        this.resetFontSettings();

        var iconWh = Math.min(64, w * 0.6);
        var bitmap = ImageManager.loadSystem('IconSet');
        var sx = item.iconIndex % 16 * Window_Base._iconWidth;
        var sy = Math.floor(item.iconIndex / 16) * Window_Base._iconHeight;
        var dx = cx - iconWh / 2;
        var dy = y + 12;

        var ctx = this.contents.context;
        var smooth = ctx.imageSmoothingEnabled;
        ctx.imageSmoothingEnabled = false;
        this.contents.blt(bitmap, sx, sy, Window_Base._iconWidth, Window_Base._iconHeight,
                          dx, dy, iconWh, iconWh);
        ctx.imageSmoothingEnabled = smooth;

        var price = Yanfly.Util.toGroup(this.price(item));

        this.contents.fontSize = params.listFontSize || 
            (Imported.YEP_CoreEngine ? Yanfly.Param.GoldFontSize : 18);

        var textW = this.textWidth(price);
        var iconW = (coinIconIndex > 0) ? Window_Base._iconWidth + 4 : 0;
        var totalW = textW + iconW + 24;
        var boxW = Math.min(totalW, w - 10) + 6;
        var boxH = 49;
        var boxX = cx - boxW / 2;
        var boxY = y + h - boxH;

        this.drawSkinFrame(boxX, boxY, boxW, boxH);

        var canAfford = $gameParty.gold() >= this.price(item);
        this.changeTextColor(canAfford ? this.normalColor() : this.textColor(8));

        this.drawText(price, boxX + 24, boxY - 39, boxW - (coinIconIndex > 0 ? 24 : 0), boxH, 'right');

        if (coinIconIndex > 0) {
            var iconX = boxX + boxW - Window_Base._iconWidth - 7;
            var iconY = boxY + (boxH - Window_Base._iconHeight) / 2;
            this.drawIcon(coinIconIndex, iconX, iconY);
        }

        this.resetFontSettings();
    };

    Window_ShopBuyCustom.prototype.drawSkinFrame = function(x, y, w, h) {
        var skin = this.windowskin;
        var margin = 24;
        var p = 96;
        var q = 96;

        this.contents.blt(skin, p, 0, margin, margin, x, y);
        this.contents.blt(skin, p + q - margin, 0, margin, margin, x + w - margin, y);
        this.contents.blt(skin, p, q - margin, margin, margin, x, y + h - margin);
        this.contents.blt(skin, p + q - margin, q - margin, margin, margin, x + w - margin, y + h - margin);

        this.contents.blt(skin, p + margin, 0, q - margin * 2, margin,
            x + margin, y, w - margin * 2, margin);
        this.contents.blt(skin, p + margin, q - margin, q - margin * 2, margin,
            x + margin, y + h - margin, w - margin * 2, margin);
        this.contents.blt(skin, p, margin, margin, q - margin * 2,
            x, y + margin, margin, h - margin * 2);
        this.contents.blt(skin, p + q - margin, margin, margin, q - margin * 2,
            x + w - margin, y + margin, margin, h - margin * 2);
    };

    // Обновление с поддержкой ховера и тач-ввода
    Window_ShopBuyCustom.prototype.update = function() {
        Window_ShopBuy.prototype.update.call(this);

        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var newHover = -1;
        for (var i = 0; i < this.maxItems(); i++) {
            var rect = this.itemRect(i);
            if (x >= rect.x && x < rect.x + rect.width &&
                y >= rect.y && y < rect.y + rect.height) {
                newHover = i;
                break;
            }
        }

        if (!this._itemSelected) {
            if (newHover !== this._hoverIndex) {
                this._hoverIndex = newHover;
                var item = (newHover >= 0 && newHover < this._data.length) ? this._data[newHover] : null;
                if (this._customDescWindow) {
                    this._customDescWindow.visible = !!item;
                    this._customDescWindow.setItem(item);
                }
                if (this._customNameWindow) {
                    this._customNameWindow.visible = !!item;
                    this._customNameWindow.setItem(item);
                }
                if (SceneManager._scene) {
                    SceneManager._scene.updateActionEnabled();
                }
                this.refresh();
            }
            this._hoverAnim += 0.05;
        }

        if (TouchInput.isTriggered() && newHover >= 0) {
            if (this._itemSelected && this.index() === newHover) {
                return;
            }
            Window_ShopBuy.prototype.select.call(this, newHover);
            this._itemSelected = true;
            this.callUpdateHelp();
            this.refresh();
        }
    };

    //=============================================================================
    // Scene_Shop
    //=============================================================================
    var _Scene_Shop_create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() {
        this._vwStorage = {};
        _Scene_Shop_create.call(this);

        if (this._statusWindow) {
            this._statusWindow.hide();
            this._statusWindow.visible = false;
        }

        if (this._backgroundSprite) {
            this._backgroundSprite.visible = false;
        }
        this.createShopBackground();
        this.createShopTrader();
        this.repositionStandardWindows();

        if (this._buyWindow && this._descWindow && this._nameWindow) {
            this._buyWindow._customDescWindow = this._descWindow;
            this._buyWindow._customNameWindow = this._nameWindow;
            this._buyWindow._buyActionWindow = this._buyActionWindow;
        }

        this._onContextMenu = function(e) {
            e.preventDefault();
            this.onCancel();
        }.bind(this);

        if (Graphics._canvas) {
            Graphics._canvas.addEventListener('contextmenu', this._onContextMenu);
        } else {
            console.warn('A_fix_shops: Graphics._canvas недоступен, слушатель ПКМ не добавлен.');
        }
    };

    var _Scene_Shop_activateBuyWindow = Scene_Shop.prototype.activateBuyWindow;
    Scene_Shop.prototype.activateBuyWindow = function() {
        _Scene_Shop_activateBuyWindow.call(this);
        if (this._statusWindow) {
            this._statusWindow.hide();
        }
    };

    Scene_Shop.prototype.createShopBackground = function() {
        var bgName = ($gameSystem._shopBG !== undefined && $gameSystem._shopBG !== null)
                     ? $gameSystem._shopBG : params.bgDefault;
        if (!bgName) return;
        var bitmap = ImageManager.loadPicture(bgName);
        this._bgSprite = new Sprite(bitmap);
        this._bgSprite.width = Graphics.boxWidth;
        this._bgSprite.height = Graphics.boxHeight;
        this.addChildAt(this._bgSprite, 1);
    };

    Scene_Shop.prototype.createShopTrader = function() {
        if (typeof VWSprite === 'undefined') return;
        var traderName = ($gameSystem._shopTrader !== undefined && $gameSystem._shopTrader !== null)
                         ? $gameSystem._shopTrader : params.traderDefault;
        if (!traderName) return;
        var vm = new VWSprite(traderName);
        vm.setLoop(); vm.create();
        vm.x = params.traderX; vm.y = params.traderY;
        this.addChildAt(vm, 2);
        this._vwStorage['shopTrader'] = vm;
    };

    Scene_Shop.prototype.repositionStandardWindows = function() {
        if (this._goldWindow) {
            this._goldWindow.width = 140;
            this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width - 10;
            this._goldWindow.y = params.goldY;
            this._goldWindow.createContents();
            this._goldWindow.refresh();
        }
        if (this._buyWindow) {
            this._buyWindow = this.replaceBuyWindow(this._buyWindow);
            this._buyWindow.x = params.listX;
            this._buyWindow.y = params.listY;
            this._buyWindow.width = params.listWidth;
            this._buyWindow.height = params.listHeight;
            this._buyWindow.createContents();
            this._buyWindow.refresh();
        }

        if (this._commandWindow) this._commandWindow.hide();
        if (this._infoWindow) this._infoWindow.hide();
        if (this._dummyWindow) this._dummyWindow.hide();
        if (this._helpWindow) this._helpWindow.hide();

        this.createDescWindow();
        this.createNameWindow();
        this.createActionWindow();

        if (this._buyWindow && this._descWindow && this._nameWindow) {
            this._buyWindow._customDescWindow = this._descWindow;
            this._buyWindow._customNameWindow = this._nameWindow;
            this._buyWindow._buyActionWindow = this._buyActionWindow;
        }
    };

    Scene_Shop.prototype.replaceBuyWindow = function(oldBuyWindow) {
        var shopGoods = oldBuyWindow._shopGoods;
        var newBuy = new Window_ShopBuyCustom(0, 0, params.listHeight, shopGoods);
        newBuy.setHelpWindow(oldBuyWindow._helpWindow);
        newBuy.setInfoWindow(oldBuyWindow._infoWindow);
        newBuy.setStatusWindow(null);
        newBuy.setHandler('cancel', this.onCancel.bind(this));

        newBuy.select(-1);
        newBuy._itemSelected = false;
        newBuy.activate();
        this.removeChild(oldBuyWindow);
        this.addChild(newBuy);
        return newBuy;
    };

    Scene_Shop.prototype.createDescWindow = function() {
        this._descWindow = new Window_ShopDesc(
            params.descX,
            params.descY,
            params.descWidth,
            params.descHeight
        );
        this.addWindow(this._descWindow);
        this._descWindow.hide();
    };

    Scene_Shop.prototype.createNameWindow = function() {
        this._nameWindow = new Window_ShopItemName();
        this.addWindow(this._nameWindow);
        this._nameWindow.hide();
    };

    Scene_Shop.prototype.createActionWindow = function() {
        var btnWidth = 180;
        this._buyActionWindow = new Window_ShopBuyAction(params.actionX, params.actionY, btnWidth);
        this.addWindow(this._buyActionWindow);
        this._buyActionWindow.hide();

        this._sellActionWindow = null;
    };

    Scene_Shop.prototype.updateActionEnabled = function() {
        if (this._buyActionWindow && this._buyWindow) {
            var item = this._buyWindow.item();
            var selected = this._buyWindow._itemSelected;
            var visible = selected && !!item;

            this._buyActionWindow.setEnabled(visible);
            this._buyActionWindow.visible = visible;
        }
    };

    Scene_Shop.prototype.onCancel = function() {
        if (this._buyWindow && this._buyWindow._itemSelected) {
            this._buyWindow._itemSelected = false;
            this._buyWindow._hoverIndex = -1;
            this._buyWindow.select(-1);
            this._buyWindow.refresh();

            if (this._descWindow) this._descWindow.hide();
            if (this._nameWindow) this._nameWindow.hide();

            this.updateActionEnabled();
            this._buyWindow.activate();
            return;
        }

        SceneManager.pop();
    };

    var _Scene_Shop_popScene = Scene_Shop.prototype.popScene;
    Scene_Shop.prototype.popScene = function() {
        this.onCancel();
    };

    var _Scene_Shop_terminate = Scene_Shop.prototype.terminate;
    Scene_Shop.prototype.terminate = function() {
        if (this._onContextMenu && Graphics.canvas) {
            Graphics.canvas.removeEventListener('contextmenu', this._onContextMenu);
        }
        this._onContextMenu = null;
        var vm = this._vwStorage ? this._vwStorage['shopTrader'] : null;
        if (vm) {
            vm._selfDestroy();
            delete this._vwStorage['shopTrader'];
        }
        _Scene_Shop_terminate.call(this);
    };

    //=============================================================================
    // Покупка товара
    //=============================================================================
    Scene_Shop.prototype.commandBuyAction = function() {
        var item = this._buyWindow.item();
        if (item) {
            var price = this._buyWindow.price(item);
            if ($gameParty.gold() >= price) {
                SoundManager.playShop();
                $gameParty.loseGold(price);
                $gameParty.gainItem(item, 1);
                this._goldWindow.refresh();
                this._buyWindow.refresh();
                this._buyWindow.select(-1);
                this._buyWindow._itemSelected = false;
                this.updateActionEnabled();
                this._buyWindow.activate();
            } else {
                SoundManager.playBuzzer();
            }
        }
    };

})();
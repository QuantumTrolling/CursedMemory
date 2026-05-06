//=============================================================================
// EXT_ShopVisual.js v3.0
//=============================================================================
// Полностью переработанный интерфейс магазина.
// Исправлено:
//   - Название предмета в отдельном окне над описанием.
//   - В карточке только иконка (64x64) и цена.
//   - Кнопки "Купить" и "Торговать" появляются только после клика/выбора предмета.
//   - При нажатии Esc/ПКМ (отмена) выделение снимается, кнопки скрываются.
//   - Цена выводится внизу карточки в системной рамке (windowskin).
//   - Переключение актёров в статусном окне стрелками.
//   - Стандартная рамка окна списка товаров убрана.
//=============================================================================

var Imported = Imported || {};
Imported.EXT_ShopVisual = true;

if (!Imported.YEP_ShopMenuCore) {
    console.error('EXT_ShopVisual: требуется YEP_ShopMenuCore!');
}

(function() {
    'use strict';

    var parameters = PluginManager.parameters('EXT_ShopVisual');
    var params = {
        bgDefault: String(parameters['bgDefault'] || 'fon_taverna'),
        traderDefault: String(parameters['traderDefault'] || 'velrand_with_bag'),
        traderX: Number(parameters['traderX'] || 480),
        traderY: Number(parameters['traderY'] || 60),
        coinIcon: Number(parameters['coinIcon'] || 313),
        listX: Number(parameters['listX'] || 0),
        listY: Number(parameters['listY'] || 0),
        listWidth: Number(parameters['listWidth'] || 516),
        listHeight: Number(parameters['listHeight'] || 420),
        listColumns: Number(parameters['listColumns'] || 3),
        listFontSize: Number(parameters['listFontSize'] || 18),
        descX: Number(parameters['descX'] || 400),
        descY: Number(parameters['descY'] || 460),
        descHeight: Number(parameters['descHeight'] || 260),
        actionX: Number(parameters['actionX'] || 516),
        actionY: Number(parameters['actionY'] || 390),
        statusX: Number(parameters['statusX'] || 0),
        statusY: Number(parameters['statusY'] || 400),
        statusWidth: Number(parameters['statusWidth'] || 400),
        goldX: Number(parameters['goldX'] || 0),
        goldY: Number(parameters['goldY'] || 0)
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

    Window_ShopItemName.prototype.initialize = function(x, y, width) {
        var height = this.fittingHeight(1);
        Window_Base.prototype.initialize.call(this, x, y - 30, width - 500, height);
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

    Window_ShopDesc.prototype.setItem = function(item) {
        if (this._item === item) return;
        this._item = item;
        this.refresh();
    };

    Window_ShopDesc.prototype.refresh = function() {
        this.contents.clear();
        if (this._item) {
            this.resetFontSettings();
            this.contents.fontSize = 20;
            var desc = this._item.description.replace(/\\n/g, '\n');
            this.drawTextEx(desc, this.textPadding(), 0,
                this.contents.width - this.textPadding() * 2);
        }
    };

    //=============================================================================
    // Window_ShopBuyAction – кнопка "Купить"
    //=============================================================================
    function Window_ShopBuyAction() {
        this.initialize.apply(this, arguments);
    }
    Window_ShopBuyAction.prototype = Object.create(Window_Base.prototype);
    Window_ShopBuyAction.prototype.constructor = Window_ShopBuyAction;

    Window_ShopBuyAction.prototype.initialize = function(x, y, width) {
        Window_Base.prototype.initialize.call(this, x, y, width, this.fittingHeight(1));
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
    // Window_ShopSellAction – кнопка "Торговать"
    //=============================================================================
    function Window_ShopSellAction() {
        this.initialize.apply(this, arguments);
    }
    Window_ShopSellAction.prototype = Object.create(Window_Base.prototype);
    Window_ShopSellAction.prototype.constructor = Window_ShopSellAction;

    Window_ShopSellAction.prototype.initialize = function(x, y, width) {
        Window_Base.prototype.initialize.call(this, x, y, width, this.fittingHeight(1));
        this._enabled = false;
        this._hover = false;
        this._anim = 0;
        this.refresh();
    };

    Window_ShopSellAction.prototype.setEnabled = function(enabled) {
        if (this._enabled !== enabled) {
            this._enabled = enabled;
            this.refresh();
        }
    };

    Window_ShopSellAction.prototype.refresh = function() {
        this.contents.clear();
        var rect = new Rectangle(0, 0, this.contents.width, this.contents.height);
        var colorIndex = this._enabled ? 0 : 16;
        this.changeTextColor(this.textColor(colorIndex));
        if (this._enabled && this._hover) {
            var alpha = 0.2 + Math.sin(this._anim) * 0.1;
            this.contents.fillRect(rect.x, rect.y, rect.width, rect.height,
                'rgba(255, 255, 255, ' + alpha + ')');
        }
        this.drawText("Торговать", rect.x, rect.y, rect.width, 'center');
    };

    Window_ShopSellAction.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        this._hover = (x >= 0 && y >= 0 && x < this.width && y < this.height);
        this._anim += 0.05;
        this.refresh();
        if (TouchInput.isTriggered() && this._enabled && this._hover) {
            SceneManager._scene.commandSellAction();
        }
    };

    //=============================================================================
    // Window_ShopBuyCustom – карточки товаров (без названия предмета)
    //=============================================================================
    function Window_ShopBuyCustom() {
        this.initialize.apply(this, arguments);
    }
    Window_ShopBuyCustom.prototype = Object.create(Window_ShopBuy.prototype);
    Window_ShopBuyCustom.prototype.constructor = Window_ShopBuyCustom;

    Window_ShopBuyCustom.prototype.initialize = function(x, y, height, goods) {
        Window_ShopBuy.prototype.initialize.call(this, x, y, height, goods);
        this._hoverIndex = -1;
        this._hoverAnim = 0;
        this._itemSelected = false;

        this.setHandler('ok', function() {
            this._itemSelected = true;
            this.updateHelp();
        });
    };

    // Блокировка касаний при выбранном предмете
    Window_ShopBuyCustom.prototype.isTouchEnabled = function() {
        return !this._itemSelected && Window_ShopBuy.prototype.isTouchEnabled.call(this);
    };

    // Блокировка перемещения курсора при выбранном предмете
    Window_ShopBuyCustom.prototype.select = function(index) {
        // Разрешаем снятие выделения (index === -1) при любом состоянии
        if (this._itemSelected && index !== -1) return;
        Window_ShopBuy.prototype.select.call(this, index);
    };

    // Убираем стандартную рамку и фон окна
    Window_ShopBuyCustom.prototype._refreshFrame = function() {};
    Window_ShopBuyCustom.prototype._refreshBack = function() {};

    Window_ShopBuyCustom.prototype.windowWidth = function() { return params.listWidth; };
    Window_ShopBuyCustom.prototype.maxCols = function() { return params.listColumns; };

    Window_ShopBuyCustom.prototype.lineHeight = function() {
        return Window_Base._iconHeight * 2 + Window_Base.prototype.lineHeight.call(this) + 24;
    };
    Window_ShopBuyCustom.prototype.itemHeight = function() { return this.lineHeight(); };
    Window_ShopBuyCustom.prototype.itemWidth = function() {
        return Math.floor((this.contents.width - this.textPadding() * 2) / this.maxCols());
    };
    Window_ShopBuyCustom.prototype.spacing = function() { return 8; };

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

    Window_ShopBuyCustom.prototype.update = function() {
        Window_ShopBuy.prototype.update.call(this);
        if (this._itemSelected) return;            // заблокировано – не обновляем наведение мыши
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
        if (newHover !== this._hoverIndex) {
            this._hoverIndex = newHover;
            this.refresh();
        }
        this._hoverAnim += 0.05;

        if (TouchInput.isTriggered() && newHover >= 0) {
            this.select(newHover);
            this._itemSelected = true;             // блокируем предмет
            this.updateHelp();
        }
    };

    var _custom_cursorDown = Window_ShopBuyCustom.prototype.cursorDown;
    Window_ShopBuyCustom.prototype.cursorDown = function(wrap) {
        if (this._itemSelected) return;            // блокировка перемещения клавишами
        _custom_cursorDown.call(this, wrap);
        this.updateHelp();
    };
    var _custom_cursorUp = Window_ShopBuyCustom.prototype.cursorUp;
    Window_ShopBuyCustom.prototype.cursorUp = function(wrap) {
        if (this._itemSelected) return;
        _custom_cursorUp.call(this, wrap);
        this.updateHelp();
    };

    // -------------------------------------------------------------------------
    // drawItem – иконка 64x64 + цена в системной рамке
    // -------------------------------------------------------------------------
    Window_ShopBuyCustom.prototype.drawItem = function(index) {
        var item = this._data[index];
        if (!item) return;

        var rect = this.itemRect(index);
        var x = rect.x;
        var y = rect.y;
        var w = rect.width;
        var h = this.itemHeight();
        var cx = x + w / 2;

        var isHover = (index === this._hoverIndex);

        // Фон + рамка карточки
        this.contents.fillRect(x, y, w, h, 'rgba(0, 0, 0, 0.4)');
        this.drawSkinFrame(x, y, w, h);
        if (isHover) {
            var alpha = 0.15 + Math.sin(this._hoverAnim) * 0.1;
            this.contents.fillRect(x, y, w, h, 'rgba(255,255,255,' + alpha + ')');
        }

        this.resetFontSettings();

        // Иконка предмета (64x64, без размытия)
        var iconWh = Window_Base._iconWidth * 2;
        var bitmap = ImageManager.loadSystem('IconSet');
        var sx = item.iconIndex % 16 * Window_Base._iconWidth;
        var sy = Math.floor(item.iconIndex / 16) * Window_Base._iconHeight;
        var dx = cx - iconWh / 2;
        var dy = y + 12;   // прижато к верху, чтобы освободить низ для рамки цены

        var ctx = this.contents.context;
        var smooth = ctx.imageSmoothingEnabled;
        ctx.imageSmoothingEnabled = false;
        this.contents.blt(bitmap, sx, sy, Window_Base._iconWidth, Window_Base._iconHeight,
                          dx, dy, iconWh, iconWh);
        ctx.imageSmoothingEnabled = smooth;

        // Цена в системной рамке (drawSkinFrame, минимум 48x48 для корректных углов)
        var price = Yanfly.Util.toGroup(this.price(item));
        this.contents.fontSize = params.listFontSize;
        if (Imported.YEP_CoreEngine) {
            this.contents.fontSize = Yanfly.Param.GoldFontSize;
        }

        var textW = this.textWidth(price);
        var iconW = (coinIconIndex > 0) ? Window_Base._iconWidth + 4 : 0;
        var totalW = textW + iconW + 24;          // отступы для рамки
        var boxW = Math.min(totalW, w - 10) + 6;
        var boxH = 49;                            // минимальная высота для drawSkinFrame
        var boxX = cx - boxW / 2;
        var boxY = y + h - boxH;                  // прижато к низу карточки

        // Системная рамка для цены
        this.drawSkinFrame(boxX, boxY, boxW, boxH);

        // Цвет текста: серый, если недостаточно золота
        var canAfford = $gameParty.gold() >= this.price(item);
        this.changeTextColor(canAfford ? this.normalColor() : this.textColor(8));

        // Текст цены (сдвинут влево, чтобы уместить иконку валюты)
        this.drawText(price, boxX + 24, boxY - 39, boxW - (coinIconIndex > 0 ? 24 : 0), boxH, 'right');

        // Иконка валюты
        if (coinIconIndex > 0) {
            var iconX = boxX + boxW - Window_Base._iconWidth - 7;
            var iconY = boxY + (boxH - Window_Base._iconHeight) / 2;
            this.drawIcon(coinIconIndex, iconX, iconY);
        }

        this.resetFontSettings();
    };

    //=============================================================================
    // Расширение Window_ShopStatus
    //=============================================================================
    var _Window_ShopStatus_initialize = Window_ShopStatus.prototype.initialize;
    Window_ShopStatus.prototype.initialize = function(x, y, width, height) {
        _Window_ShopStatus_initialize.call(this, x, y, width, height);
        this._actorIndex = 0;
    };

    var _Window_ShopStatus_update = Window_ShopStatus.prototype.update;
    Window_ShopStatus.prototype.update = function() {
        _Window_ShopStatus_update.call(this);
        if (Input.isTriggered('left')) {
            this._actorIndex = (this._actorIndex - 1 + $gameParty.members().length) % $gameParty.members().length;
            this.refresh();
        } else if (Input.isTriggered('right')) {
            this._actorIndex = (this._actorIndex + 1) % $gameParty.members().length;
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
        if (this._backgroundSprite) {
            this._backgroundSprite.visible = false;
        }
        this.createShopBackground();
        this.createShopTrader();
        this.repositionStandardWindows();
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
            this._goldWindow.width = 180;
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
        if (this._statusWindow) {
            this._statusWindow.x = params.statusX;
            this._statusWindow.y = params.statusY;
            this._statusWindow.width = params.statusWidth;
            this._statusWindow.height = Graphics.boxHeight - params.statusY;
            this._statusWindow.createContents();
            this._statusWindow.refresh();
            this._statusWindow.hide();
        }
        if (this._commandWindow) this._commandWindow.hide();
        if (this._infoWindow) this._infoWindow.hide();
        if (this._dummyWindow) this._dummyWindow.hide();
        if (this._helpWindow) this._helpWindow.hide();

        this.createDescWindow();
        this.createNameWindow();
        this.createActionWindow();
    };

    Scene_Shop.prototype.replaceBuyWindow = function(oldBuyWindow) {
        var shopGoods = oldBuyWindow._shopGoods;
        var newBuy = new Window_ShopBuyCustom(0, 0, params.listHeight, shopGoods);
        newBuy.setHelpWindow(oldBuyWindow._helpWindow);
        newBuy.setInfoWindow(oldBuyWindow._infoWindow);
        newBuy.setStatusWindow(oldBuyWindow._statusWindow);

        var self = this;
        newBuy.setHandler('cancel', function() {
            if (newBuy._itemSelected) {
                newBuy._itemSelected = false;
                newBuy.select(-1);
                newBuy.refresh();
                if (self._descWindow) self._descWindow.hide();
                if (self._nameWindow) self._nameWindow.hide();
                if (self._statusWindow) self._statusWindow.hide();
                self.updateActionEnabled();
            } else {
                // Закрываем магазин
                self.popScene();
            }
        });

        if (oldBuyWindow._category !== undefined) {
            newBuy.setCategory(oldBuyWindow._category);
        }

        newBuy.select(-1);
        newBuy._itemSelected = false;
        newBuy.activate();
        this.removeChild(oldBuyWindow);
        this.addChild(newBuy);
        return newBuy;
    };

    Scene_Shop.prototype.createDescWindow = function() {
        var descWidth = Graphics.boxWidth - params.descX;
        this._descWindow = new Window_ShopDesc(params.descX, params.descY, descWidth, params.descHeight);
        this.addWindow(this._descWindow);
        this._descWindow.hide();
    };

    Scene_Shop.prototype.createNameWindow = function() {
        var nameWidth = Graphics.boxWidth - params.descX;
        var lineH = Window_Base.prototype.lineHeight.call(this);
        var nameY = params.descY - lineH;
        this._nameWindow = new Window_ShopItemName(params.descX, nameY, nameWidth);
        this.addWindow(this._nameWindow);
        this._nameWindow.hide();

        var self = this;
        var oldUpdateHelp = this._buyWindow.updateHelp;
        this._buyWindow.updateHelp = function() {
            oldUpdateHelp.call(this);
            var item = this.item();
            var show = !!item;
            if (self._descWindow) {
                self._descWindow.visible = show;
                if (show) self._descWindow.setItem(item);
            }
            if (self._nameWindow) {
                self._nameWindow.visible = show;
                if (show) self._nameWindow.setItem(item);
            }
            if (self._statusWindow) {
                self._statusWindow.visible = show;
            }
            if (self._buyActionWindow) self.updateActionEnabled();
        };
    };

    Scene_Shop.prototype.createActionWindow = function() {
        var btnWidth = 160;
        var gap = 10;
        this._buyActionWindow = new Window_ShopBuyAction(params.actionX, params.actionY, btnWidth);
        this._sellActionWindow = new Window_ShopSellAction(params.actionX + btnWidth + gap, params.actionY, btnWidth);
        this.addWindow(this._buyActionWindow);
        this.addWindow(this._sellActionWindow);

        this._buyActionWindow.hide();
        this._sellActionWindow.hide();
    };

    Scene_Shop.prototype.updateActionEnabled = function() {
        if (this._buyActionWindow && this._buyWindow) {
            var item = this._buyWindow.item();
            var selected = this._buyWindow._itemSelected;
            var visible = selected && !!item;

            this._buyActionWindow.setEnabled(visible);
            this._sellActionWindow.setEnabled(visible);
            this._buyActionWindow.visible = visible;
            this._sellActionWindow.visible = visible;
        }
    };

    Scene_Shop.prototype.commandBuyAction = function() {
        if (this._buyWindow && this._buyWindow.item()) {
            var item = this._buyWindow.item();
            var price = this._buyWindow.price(item);
            if ($gameParty.gold() >= price) {
                this._item = item;
                this.doBuy(1);

                this._buyWindow.refresh();
                this._goldWindow.refresh();
                this._statusWindow.refresh();

                // Снимаем блокировку после покупки
                this._buyWindow._itemSelected = false;
                if (!this._buyWindow.item()) {
                    this._buyWindow.select(-1);
                }
                this._buyWindow.updateHelp();
                this.updateActionEnabled();
            }
        }
    };

    Scene_Shop.prototype.commandSellAction = function() {
        // Заглушка
    };

    var _Scene_Shop_terminate = Scene_Shop.prototype.terminate;
    Scene_Shop.prototype.terminate = function() {
        var vm = this._vwStorage ? this._vwStorage['shopTrader'] : null;
        if (vm) {
            vm._selfDestroy();
            delete this._vwStorage['shopTrader'];
        }
        _Scene_Shop_terminate.call(this);
    };

})();
//=============================================================================
// EXT_ShopVisual.js v3.0
//=============================================================================
// Полностью переработанный интерфейс магазина.
// Исправлено:
//   - Название всегда сверху, фиксированный отступ.
//   - Иконка строго по центру (стандартный размер 32x32).
//   - Цена всегда внизу, не выходит за пределы карточки.
//   - Иконка валюты отображается через drawIcon.
//   - Переключение актёров в статусном окне стрелками.
//   - Уменьшена ширина статусного окна, увеличена высота описания.
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
        coinIcon: Number(parameters['coinIcon'] || 314),          // fallback иконка валюты
        listX: Number(parameters['listX'] || 0),
        listY: Number(parameters['listY'] || 0),
        listWidth: Number(parameters['listWidth'] || 516),
        listHeight: Number(parameters['listHeight'] || 400),
        listColumns: Number(parameters['listColumns'] || 3),
        listFontSize: Number(parameters['listFontSize'] || 18),
        descX: Number(parameters['descX'] || 516),
        descY: Number(parameters['descY'] || 440),
        descHeight: Number(parameters['descHeight'] || 260),      // увеличено
        actionX: Number(parameters['actionX'] || 516),
        actionY: Number(parameters['actionY'] || 390),
        statusX: Number(parameters['statusX'] || 0),
        statusY: Number(parameters['statusY'] || 400),
        statusWidth: Number(parameters['statusWidth'] || 360),    // уменьшено
        goldX: Number(parameters['goldX'] || 0),
        goldY: Number(parameters['goldY'] || 0)
    };

    // Иконка валюты: если параметр coinIcon = 0, используем из системы
    var coinIconIndex = params.coinIcon !== 0 ? params.coinIcon : ($dataSystem ? $dataSystem.currencyIcon || 314 : 314);

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
            this.contents.fontSize = 18;
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
    Window_ShopBuyAction.prototype = Object.create(Window_Selectable.prototype);
    Window_ShopBuyAction.prototype.constructor = Window_ShopBuyAction;

    Window_ShopBuyAction.prototype.initialize = function(x, y, width) {
        this._enabled = false;
        this._hover = false;
        this._anim = 0;
        Window_Selectable.prototype.initialize.call(this, x, y, width, this.fittingHeight(1));
        this.deactivate();
        this.refresh();
    };

    Window_ShopBuyAction.prototype.maxItems = function() { return 1; };
    Window_ShopBuyAction.prototype.itemWidth = function() { return this.contents.width - this.textPadding() * 2; };
    Window_ShopBuyAction.prototype.itemHeight = function() { return this.lineHeight(); };

    Window_ShopBuyAction.prototype.setEnabled = function(enabled) {
        if (this._enabled !== enabled) {
            this._enabled = enabled;
            this.refresh();
        }
    };

    Window_ShopBuyAction.prototype.drawItem = function(index) {
        var rect = this.itemRect(0);
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
        Window_Selectable.prototype.update.call(this);

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
    Window_ShopSellAction.prototype = Object.create(Window_Selectable.prototype);
    Window_ShopSellAction.prototype.constructor = Window_ShopSellAction;

    Window_ShopSellAction.prototype.initialize = function(x, y, width) {
        this._enabled = false;
        this._hover = false;
        this._anim = 0;
        Window_Selectable.prototype.initialize.call(this, x, y, width, this.fittingHeight(1));
        this.deactivate();
        this.refresh();
    };

    Window_ShopSellAction.prototype.maxItems = function() { return 1; };
    Window_ShopSellAction.prototype.itemWidth = function() { return this.contents.width - this.textPadding() * 2; };
    Window_ShopSellAction.prototype.itemHeight = function() { return this.lineHeight(); };

    Window_ShopSellAction.prototype.setEnabled = function(enabled) {
        if (this._enabled !== enabled) {
            this._enabled = enabled;
            this.refresh();
        }
    };

    Window_ShopSellAction.prototype.drawItem = function(index) {
        var rect = this.itemRect(0);
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
        Window_Selectable.prototype.update.call(this);

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
    // Window_ShopBuyCustom – карточки товаров
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
    };

    Window_ShopBuyCustom.prototype.windowWidth = function() { return params.listWidth; };
    Window_ShopBuyCustom.prototype.maxCols = function() { return params.listColumns; };

    // Пересчитанная высота карточки: иконка 32 + две строки + отступы
    Window_ShopBuyCustom.prototype.lineHeight = function() {
        return Window_Base._iconHeight + Window_Base.prototype.lineHeight.call(this) * 2 + 16;
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
    };

    // -------------------------------------------------------------------------
    // Новый drawItem с потоковым позиционированием
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

        // Фон + рамка + подсветка
        this.contents.fillRect(x, y, w, h, 'rgba(0, 0, 0, 0.4)');
        this.drawSkinFrame(x, y, w, h);
        if (isHover) {
            var alpha = 0.15 + Math.sin(this._hoverAnim) * 0.1;
            this.contents.fillRect(x, y, w, h, 'rgba(255,255,255,' + alpha + ')');
        }

        this.resetFontSettings();
        this.contents.fontSize = params.listFontSize;

        var cursorY = y + 4;

        // 1. Название (сверху, центрировано)
        this.drawText(item.name, x, cursorY, w, 'center');
        cursorY += Window_Base.prototype.lineHeight.call(this);  // используем базовый lineHeight

        // 2. Иконка предмета (стандартный размер 32x32, по центру)
        var iconX = cx - Window_Base._iconWidth / 2;
        this.drawIcon(item.iconIndex, iconX, cursorY);
        cursorY += Window_Base._iconHeight + 4;

        // 3. Цена + иконка валюты
        var price = Yanfly.Util.toGroup(this.price(item));
        if (Imported.YEP_CoreEngine) {
            this.contents.fontSize = Yanfly.Param.GoldFontSize;
        }

        this.drawText(price, x, cursorY, w, 'center');

        if (coinIconIndex > 0) {
            var textW = this.textWidth(price);
            var coinX = cx + textW / 2 + 4;
            var lineH = Window_Base.prototype.lineHeight.call(this);
            var coinY = cursorY + Math.floor((lineH - Window_Base._iconHeight) / 2);
            this.drawIcon(coinIconIndex, coinX, coinY);
        }

        this.resetFontSettings();
    };

    //=============================================================================
    // Расширение Window_ShopStatus: переключение актёров стрелками
    //=============================================================================
    var _Window_ShopStatus_initialize = Window_ShopStatus.prototype.initialize;
    Window_ShopStatus.prototype.initialize = function(x, y, width, height) {
        _Window_ShopStatus_initialize.call(this, x, y, width, height);
        this._actorIndex = 0; // индекс выбранного актёра
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

    // Пример использования актёра в вашем коде:
    // var actor = $gameParty.members()[this._actorIndex];
    // Чтобы изменить отрисовку параметров, добавьте переопределение drawItem
    // или другого метода, используя this._actorIndex.
    // Рекомендуется вставить свой код ниже.

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
            this._statusWindow.width = params.statusWidth;   // уже 360
            this._statusWindow.height = Graphics.boxHeight - params.statusY;
            this._statusWindow.createContents();
            this._statusWindow.refresh();
        }
        if (this._commandWindow) this._commandWindow.hide();
        if (this._infoWindow) this._infoWindow.hide();
        if (this._dummyWindow) this._dummyWindow.hide();
        if (this._helpWindow) this._helpWindow.hide();

        this.createDescWindow();
        this.createActionWindow();
    };

    Scene_Shop.prototype.replaceBuyWindow = function(oldBuyWindow) {
        var shopGoods = oldBuyWindow._shopGoods;
        var newBuy = new Window_ShopBuyCustom(0, 0, params.listHeight, shopGoods);
        newBuy.setHelpWindow(oldBuyWindow._helpWindow);
        newBuy.setInfoWindow(oldBuyWindow._infoWindow);
        newBuy.setStatusWindow(oldBuyWindow._statusWindow);
        newBuy.setHandler('ok', oldBuyWindow._handlers['ok']);
        newBuy.setHandler('cancel', oldBuyWindow._handlers['cancel']);
        if (oldBuyWindow._category !== undefined) {
            newBuy.setCategory(oldBuyWindow._category);
        }
        newBuy.select(oldBuyWindow.index());
        newBuy.activate();
        this.removeChild(oldBuyWindow);
        this.addChild(newBuy);
        return newBuy;
    };

    Scene_Shop.prototype.createDescWindow = function() {
        var descWidth = Graphics.boxWidth - params.descX;
        this._descWindow = new Window_ShopDesc(params.descX, params.descY, descWidth, params.descHeight);
        this.addWindow(this._descWindow);
        var self = this;
        var oldUpdateHelp = this._buyWindow.updateHelp;
        this._buyWindow.updateHelp = function() {
            oldUpdateHelp.call(this);
            if (self._descWindow) self._descWindow.setItem(this.item());
        };
    };

    Scene_Shop.prototype.createActionWindow = function() {
        var btnWidth = 160;
        var gap = 10;
        this._buyActionWindow = new Window_ShopBuyAction(params.actionX, params.actionY, btnWidth);
        this.addWindow(this._buyActionWindow);

        this._sellActionWindow = new Window_ShopSellAction(params.actionX + btnWidth + gap, params.actionY, btnWidth);
        this.addWindow(this._sellActionWindow);

        this.updateActionEnabled();
        var self = this;
        var oldUpdateHelp2 = this._buyWindow.updateHelp;
        this._buyWindow.updateHelp = function() {
            oldUpdateHelp2.call(this);
            if (self._buyActionWindow) self.updateActionEnabled();
        };
    };

    Scene_Shop.prototype.updateActionEnabled = function() {
        if (this._buyActionWindow && this._buyWindow) {
            var item = this._buyWindow.item();
            this._buyActionWindow.setEnabled(!!item);
            this._sellActionWindow.setEnabled(false);
        }
    };

    Scene_Shop.prototype.commandBuyAction = function() {
        if (this._buyWindow && this._buyWindow.item()) {
            this._buyWindow.callHandler('ok');
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
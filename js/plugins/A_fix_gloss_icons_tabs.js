/*:
 * @plugindesc v4.2 Глоссарий: верхние табы + footer подменю (FINAL STABLE)
 * @author You
 *
 * @help
 * ВЕРХ:
 * <SGTabs: 10,11,12>
 *
 * НИЗ:
 * <SGFooterTabs: 6:45=7,46=8,47=9>
 *
 * Формат:
 * базовая_страница: иконка=страница
 */

(function () {
'use strict';

//==============================================================
// НАСТРОЙКИ
//==============================================================
const SG_TABS_HEIGHT = 170;
const HITBOX_PADDING = 12;

//==============================================================
// ВЕРХНИЕ ТАБЫ
//==============================================================
Window_Glossary.prototype.sgTabsList = function () {
    var item = this._itemData;
    if (!item) return [];

    var str = this.getMetaContents(['Tabs'], 0);
    if (!str) return [];

    return str.split(',')
        .map(s => parseInt(s.trim()))
        .filter(n => !isNaN(n));
};

Window_Glossary.prototype.hasSGTabs = function () {
    return this.sgTabsList().length > 1;
};

//==============================================================
// FOOTER ТАБЫ (БЕЗОПАСНО)
//==============================================================
Window_Glossary.prototype.sgFooterTabs = function () {
    var item = this._itemData;
    if (!item) return {};

    var str = this.getMetaContents(['FooterTabs'], 0);
    if (!str) return {};

    var result = {};

    str.split(';').forEach(function (block) {
        if (!block) return;

        var parts = block.split(':');
        if (parts.length < 2) return;

        var basePage = parseInt(parts[0].trim());
        if (isNaN(basePage)) return;

        var entries = [];

        parts[1].split(',').forEach(function (pair) {
            if (!pair) return;

            var p = pair.split('=');
            if (!p[0] || !p[1]) return;

            var icon = parseInt(p[0].trim());
            var page = parseInt(p[1].trim());

            if (isNaN(icon) || isNaN(page)) return;

            entries.push({ icon: icon, page: page });
        });

        if (entries.length > 0) {
            result[basePage] = entries;
        }
    });

    return result;
};

//==============================================================
// АКТИВНЫЙ FOOTER
//==============================================================
Window_Glossary.prototype.currentFooterData = function () {
    var data = this.sgFooterTabs();

    if (this._footerBasePage != null && data[this._footerBasePage]) {
        return data[this._footerBasePage];
    }

    if (data[this._pageIndex]) {
        this._footerBasePage = this._pageIndex;
        this._footerIndex = -1;
        return data[this._pageIndex];
    }

    return null;
};

//==============================================================
// DRAW (ГЛАВНЫЙ ФИКС ТЕКСТА)
//==============================================================
const _drawItem = Window_Glossary.prototype.drawItem;
Window_Glossary.prototype.drawItem = function (index) {
    this.contents.clear();

    // ✔ один раз задаём offset
    this._textYOffset = this.hasSGTabs() ? SG_TABS_HEIGHT + 40 : 0;

    _drawItem.call(this, index);

    this.drawSGTabs();
    this.drawFooterTabs();
};

// ✔ безопасный drawTextEx
const _drawTextEx = Window_Base.prototype.drawTextEx;
Window_Glossary.prototype.drawTextEx = function (text, x, y) {
    y += this._textYOffset || 0;
    return _drawTextEx.call(this, text, x, y);
};

//==============================================================
// ВЕРХНИЕ ТАБЫ DRAW
//==============================================================
Window_Glossary.prototype.drawSGTabs = function () {
    if (!this.hasSGTabs()) return;

    var tabs = this.sgTabsList();
    var startX = 20, startY = 10;
    var spacingX = 64, spacingY = 80;
    var perRow = 4;

    for (var i = 0; i < tabs.length; i++) {
        var row = Math.floor(i / perRow);
        var col = i % perRow;

        var x = startX + col * spacingX;
        var y = startY + row * spacingY;

        this.drawSGTabIcon(tabs[i], x, y, i === this._pageIndex);
    }
};

//==============================================================
// FOOTER DRAW
//==============================================================
Window_Glossary.prototype.drawFooterTabs = function () {
    var data = this.currentFooterData();
    if (!data) return;

    var startX = 20;
    var y = this.contents.height - 80;
    var spacing = 64;

    for (var i = 0; i < data.length; i++) {
        var x = startX + i * spacing;
        var active = (this._footerIndex === i);

        this.drawSGTabIcon(data[i].icon, x, y, active);
    }
};

//==============================================================
// ИКОНКА
//==============================================================
Window_Glossary.prototype.drawSGTabIcon = function (iconIndex, x, y, active) {
    var bitmap = ImageManager.loadSystem('IconSet');

    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;

    var sx = (iconIndex % 16) * pw;
    var sy = Math.floor(iconIndex / 16) * ph;

    var size = active ? 52 : 44;
    var offset = active ? 0 : 4;

    this.contents.paintOpacity = active ? 255 : 180;
    this.contents.blt(bitmap, sx, sy, pw, ph, x + offset, y + offset, size, size);

    if (active) {
        this.contents.fillRect(x, y + 56, 52, 3, this.normalColor());
    }

    this.contents.paintOpacity = 255;
};

//==============================================================
// INPUT
//==============================================================
const _update = Window_Glossary.prototype.update;
Window_Glossary.prototype.update = function () {
    _update.call(this);
    this.updateSGTabsTouch();
};

Window_Glossary.prototype.updateSGTabsTouch = function () {
    if (!TouchInput.isTriggered()) return;

    var localX = this.canvasToLocalX(TouchInput.x);
    var localY = this.canvasToLocalY(TouchInput.y);

    // ВЕРХ
    if (this.hasSGTabs()) {
        var tabs = this.sgTabsList();

        var startX = 20, startY = 10;
        var spacingX = 64, spacingY = 80;
        var perRow = 4;

        for (var i = 0; i < tabs.length; i++) {
            var row = Math.floor(i / perRow);
            var col = i % perRow;

            var x = startX + col * spacingX;
            var y = startY + row * spacingY;

            if (localX >= x - HITBOX_PADDING && localX <= x + 52 + HITBOX_PADDING &&
                localY >= y - HITBOX_PADDING && localY <= y + 52 + HITBOX_PADDING) {

                SoundManager.playCursor();

                this._pageIndex = i;
                this._footerIndex = -1;
                this._footerBasePage = null;

                this.drawItem(this._pageIndex);
                return;
            }
        }
    }

    // FOOTER
    var data = this.currentFooterData();

    if (data) {
        var startX = 20;
        var y = this.contents.height - 80;
        var spacing = 64;

        for (var i = 0; i < data.length; i++) {
            var x = startX + i * spacing;

            if (localX >= x - HITBOX_PADDING && localX <= x + 52 + HITBOX_PADDING &&
                localY >= y - HITBOX_PADDING && localY <= y + 52 + HITBOX_PADDING) {

                SoundManager.playCursor();

                this._footerIndex = i;
                this._pageIndex = data[i].page;

                this.drawItem(this._pageIndex);
                return;
            }
        }
    }
};

//==============================================================
// ОТКЛЮЧЕНИЕ UI YEP
//==============================================================
Window_Glossary.prototype.refreshArrows = function () {
    this.leftArrowVisible = false;
    this.rightArrowVisible = false;
    this.upArrowVisible = false;
    this.downArrowVisible = false;
};

Window_Glossary.prototype.updateArrows = function () {
    this.leftArrowVisible = false;
    this.rightArrowVisible = false;
};

Window_Glossary.prototype.drawPageNumber = function () {
    // отключено
};

})();
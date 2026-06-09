/*:
 * @plugindesc v4.10 Глоссарий: табы + футер + подменю (плавное мигание полоски)
 * @author You
 *
 * @help
 * ВЕРХ:
 * <SGTabs: 252,31,4, ROW, 176,177,178, ...>   (ROW разрывает строки)
 * <SGTabs: 10,11,12, ROW=6, ...>               (ROW=6 задаёт кол-во иконок в ряду)
 *
 * НИЗ:
 * <SGFooterTabs: 6:45=7+8+9,46=10>   (иконка=страница или иконка=стр1+стр2+стр3)
 * <SGFooterTabs: 1:45,46>             (просто иконка = ведёт на страницу с тем же номером)
 */

(function () {
'use strict';

const SG_TABS_HEIGHT = 50;
const HITBOX_PADDING = 12;
const DEBUG = false;

function log() { if (DEBUG) console.log.apply(console, arguments); }

function arrayEquals(a, b) {
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

//==============================================================
// ФИКС АРТЕФАКТОВ ИКОНОК
//==============================================================
function drawIconFixed(contents, iconIndex, x, y, scale, alpha) {
    if (alpha === undefined) alpha = 255;
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = (iconIndex % 16) * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    var dw = Math.floor(pw * scale);
    var dh = Math.floor(ph * scale);
    var dx = Math.floor(x + (pw - dw) / 2);
    var dy = Math.floor(y + (ph - dh) / 2);

    var ctx = contents._context;
    var oldSmooth = ctx.imageSmoothingEnabled;
    var oldAlpha = contents.paintOpacity;

    ctx.imageSmoothingEnabled = false;
    contents.paintOpacity = alpha;

    contents.blt(bitmap, sx, sy, pw, ph, dx, dy, dw, dh);

    contents.paintOpacity = oldAlpha;
    ctx.imageSmoothingEnabled = oldSmooth;
}

//==============================================================
// ПЕРЕОПРЕДЕЛЕНИЕ drawIcon В Window_GlossaryList
//==============================================================
var _Window_GlossaryList_drawIcon = Window_GlossaryList.prototype.drawIcon;
Window_GlossaryList.prototype.drawIcon = function(iconIndex, x, y) {
    var scale = PluginManager.parameters('SceneGlossary')['IconScale'] || '1.0';
    scale = parseFloat(scale) || 1.0;
    drawIconFixed(this.contents, iconIndex, x, y, scale, 255);
};

//==============================================================
// ПЕРЕОПРЕДЕЛЕНИЕ drawIcon В Window_Glossary
//==============================================================
var _Window_Glossary_drawIcon = Window_Glossary.prototype.drawIcon;
Window_Glossary.prototype.drawIcon = function(iconIndex, x, y) {
    var scale = PluginManager.parameters('SceneGlossary')['IconScale'] || '1.0';
    scale = parseFloat(scale) || 1.0;
    drawIconFixed(this.contents, iconIndex, x, y, scale, 255);
};

//==============================================================
// ИНИЦИАЛИЗАЦИЯ ПЕРЕМЕННЫХ ДЛЯ ПЛАВНОГО МИГАНИЯ
//==============================================================
const _Window_Glossary_initialize = Window_Glossary.prototype.initialize;
Window_Glossary.prototype.initialize = function(x, y, width, height) {
    _Window_Glossary_initialize.call(this, x, y, width, height);
    this._tabBlinkFrame = 0;       // счётчик кадров анимации
    this._tabBlinkOpacity = 1;     // текущая прозрачность полоски (0..1)
};

//==============================================================
// ВЕРХНИЕ ТАБЫ (ROW как разрыв строки)
//==============================================================
Window_Glossary.prototype.sgTabsList = function () {
    var item = this._itemData;
    if (!item) return { tabs: [], perRow: 0, manualRows: false };

    var str = this.getMetaContents(['Tabs'], 0);
    if (!str) return { tabs: [], perRow: 0, manualRows: false };

    var perRow = 0;
    var rows = [];
    var currentRow = [];
    var manualRows = false;

    str.split(',').forEach(function (part) {
        part = part.trim();
        if (part.toUpperCase() === 'ROW') {
            manualRows = true;
            if (currentRow.length > 0) {
                rows.push(currentRow);
                currentRow = [];
            }
            return;
        }
        if (part.toUpperCase().startsWith('ROW=')) {
            var val = parseInt(part.split('=')[1]);
            if (!isNaN(val) && val > 0) perRow = val;
            return;
        }
        var num = parseInt(part);
        if (!isNaN(num)) currentRow.push(num);
    });

    if (currentRow.length > 0) rows.push(currentRow);

    if (manualRows) {
        return { tabs: rows, perRow: 0, manualRows: true };
    } else {
        var finalPerRow = perRow > 0 ? perRow : 4;
        var flat = [];
        rows.forEach(function(row) { flat = flat.concat(row); });
        return { tabs: flat, perRow: finalPerRow, manualRows: false };
    }
};

Window_Glossary.prototype.hasSGTabs = function () {
    var data = this.sgTabsList();
    if (data.manualRows) {
        return data.tabs.some(function(row) { return row.length > 0; });
    } else {
        return data.tabs.length > 1;
    }
};

//==============================================================
// FOOTER ТАБЫ
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
            pair = pair.trim();
            var p = pair.split('=');
            var icon, target;

            if (p.length === 1) {
                icon = parseInt(p[0]);
                if (isNaN(icon)) return;
                target = String(icon);
            } else if (p.length === 2) {
                icon = parseInt(p[0].trim());
                if (isNaN(icon)) return;
                target = p[1].trim();
            } else {
                return;
            }

            if (target.includes('+')) {
                var subPages = target.split('+').map(function (s) {
                    return parseInt(s.trim());
                }).filter(function (n) { return !isNaN(n); });
                if (subPages.length > 0) {
                    entries.push({ icon: icon, subPages: subPages });
                }
            } else {
                var page = parseInt(target);
                if (!isNaN(page)) entries.push({ icon: icon, page: page });
            }
        });

        if (entries.length > 0) result[basePage] = entries;
    });

    return result;
};

Window_Glossary.prototype.hasFooterTabs = function () {
    return !!this.currentFooterData();
};

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
// ГЕОМЕТРИЯ КОНТЕНТА
//==============================================================
Window_Glossary.prototype.topReservedHeight = function () {
    return this.hasSGTabs() ? SG_TABS_HEIGHT + 40 : 0;
};

Window_Glossary.prototype.bottomReservedHeight = function () {
    return (this.hasFooterTabs() || this._subPages) ? 80 : 0;
};

Window_Glossary.prototype.contentAreaHeight = function () {
    return Math.max(0, this.contentsHeight() - this.topReservedHeight() - this.bottomReservedHeight());
};

Window_Glossary.prototype.contentStartY = function () {
    return this.topReservedHeight();
};

//==============================================================
// DRAW
//==============================================================
const _drawItem = Window_Glossary.prototype.drawItem;
Window_Glossary.prototype.drawItem = function (index) {
    if (!this._forceDraw && this._pageIndex !== undefined && index !== this._pageIndex) {
        log('drawItem SKIP: unwanted index', index, 'current pageIndex', this._pageIndex);
        return;
    }
    this._forceDraw = false;

    if (this._subPages) {
        var base = this._footerBasePage;
        var data = this.sgFooterTabs();
        var valid = false;
        if (base != null && data[base]) {
            for (var j = 0; j < data[base].length; j++) {
                if (data[base][j].subPages && arrayEquals(data[base][j].subPages, this._subPages)) {
                    valid = true;
                    break;
                }
            }
        }
        if (!valid) {
            this._subPages = null;
            this._subPageIndex = -1;
        }
    }

    log('=== drawItem index', index, 'pageIndex', this._pageIndex);

    this.contents.clear();
    if (this.hasSGTabs()) {
        this.contents.clearRect(0, 0, this.contents.width, SG_TABS_HEIGHT + 100);
    }

    this._textYOffset = 0;
    _drawItem.call(this, index);

    this.drawSGTabs();
    if (this._subPages) {
        this.drawFooterSubMenu();
    } else {
        this.drawFooterTabs();
    }

    this.hideAllArrows();
};

Window_Glossary.prototype.hideAllArrows = function() {
    this.downArrowVisible = false;
    this.upArrowVisible = false;
    this.leftArrowVisible = false;
    this.rightArrowVisible = false;
};

const _drawItemSub = Window_Glossary.prototype.drawItemSub;
Window_Glossary.prototype.drawItemSub = function(bitmap, listIndex, pageIndex) {
    if (this._listIndex !== listIndex || this._pageIndex !== pageIndex) {
        log('drawItemSub SKIP: index mismatch');
        return;
    }

    var text    = this.getDescription(this._pageIndex);
    var textPos = this.getTextPosition();
    var startY = this.contentStartY();
    var availableH = this.contentAreaHeight();

    var ctx = this.contents._context;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, startY, this.contentsWidth(), availableH);
    ctx.clip();

    var textHandler, pictureHandler, y;
    switch (this.getPicturePosition()) {
        case 'top':
            if (!textPos) textPos = this.calcItemPictureHeight(bitmap, text);
            textHandler    = this.drawItemText.bind(this, text, startY + textPos);
            pictureHandler = this.drawPicture.bind(this, bitmap, text, startY);
            break;
        case 'bottom':
            textHandler    = this.drawItemText.bind(this, text, startY + textPos);
            y              = startY + availableH - this.calcItemPictureHeight(bitmap, text);
            pictureHandler = this.drawPicture.bind(this, bitmap, text, y);
            break;
        case 'text':
        default :
            textHandler    = this.drawItemText.bind(this, text, startY + textPos);
            y              = startY + this.calcItemTextHeight(text) + textPos;
            pictureHandler = this.drawPicture.bind(this, bitmap, text, y);
            break;
    }

    if (this.getPicturePriority() === 'bottom') {
        pictureHandler();
        textHandler();
    } else {
        textHandler();
        pictureHandler();
    }

    this.drawPlusPictures();
    ctx.restore();
};

const _drawTextEx = Window_Base.prototype.drawTextEx;
Window_Glossary.prototype.drawTextEx = function (text, x, y) {
    return _drawTextEx.call(this, text, x, y);
};

//==============================================================
// ВЕРХНИЕ ТАБЫ (отрисовка)
//==============================================================
Window_Glossary.prototype.drawSGTabs = function () {
    var data = this.sgTabsList();
    if (data.manualRows) {
        var rows = data.tabs;
        var startX = 20, startY = 10;
        var spacingX = 64, spacingY = 80;

        for (var r = 0; r < rows.length; r++) {
            var rowIcons = rows[r];
            for (var c = 0; c < rowIcons.length; c++) {
                var x = startX + c * spacingX;
                var y = startY + r * spacingY;
                var globalIndex = 0;
                for (var rr = 0; rr < r; rr++) globalIndex += rows[rr].length;
                globalIndex += c;
                var active = (globalIndex === this._pageIndex);
                this.drawSGTabIcon(rowIcons[c], x, y, active);
            }
        }
    } else if (data.tabs.length > 0) {
        var tabs = data.tabs;
        var perRow = data.perRow;
        var startX = 20, startY = 10;
        var spacingX = 64, spacingY = 80;

        for (var i = 0; i < tabs.length; i++) {
            var row = Math.floor(i / perRow);
            var col = i % perRow;
            var x = startX + col * spacingX;
            var y = startY + row * spacingY;
            this.drawSGTabIcon(tabs[i], x, y, i === this._pageIndex);
        }
    }
};

//==============================================================
// FOOTER
//==============================================================
Window_Glossary.prototype.drawFooterTabs = function () {
    var data = this.currentFooterData();
    if (!data) return;
    var startX = 20;
    var y = this.contents.height - 80;
    var spacing = 64;
    for (var i = 0; i < data.length; i++) {
        var x = startX + i * spacing;
        var active = (this._footerIndex === i && !data[i].subPages);
        this.drawSGTabIcon(data[i].icon, x, y, active);
    }
};

Window_Glossary.prototype.drawFooterSubMenu = function () {
    var pages = this._subPages;
    if (!pages || pages.length === 0) return;
    var startX = 20;
    var y = this.contents.height - 80;
    var spacing = 48;
    for (var i = 0; i < pages.length; i++) {
        var x = startX + i * spacing;
        var active = (this._subPageIndex === i);
        var text = String(pages[i]);
        this.contents.fontSize = active ? 26 : 22;
        this.contents.paintOpacity = active ? 255 : 180;
        this.contents.drawText(text, x, y, spacing, 52, 'center');
        this.contents.paintOpacity = 255;
    }
};

//==============================================================
// ИКОНКА ТАБА (с плавным миганием подчёркивания)
//==============================================================
Window_Glossary.prototype.drawSGTabIcon = function (iconIndex, x, y, active) {
    var size = active ? 52 : 44;
    var offset = active ? 0 : 4;
    var alpha = active ? 255 : 180;

    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = (iconIndex % 16) * pw;
    var sy = Math.floor(iconIndex / 16) * ph;

    var dx = Math.floor(x + offset);
    var dy = Math.floor(y + offset);
    var dw = Math.floor(size);
    var dh = Math.floor(size);

    var ctx = this.contents._context;
    var oldSmooth = ctx.imageSmoothingEnabled;
    ctx.imageSmoothingEnabled = false;
    var oldAlpha = this.contents.paintOpacity;
    this.contents.paintOpacity = alpha;

    this.contents.blt(bitmap, sx, sy, pw, ph, dx, dy, dw, dh);

    // Плавно пульсирующая полоска
    if (active) {
        var blinkAlpha = Math.floor(this._tabBlinkOpacity * 255);
        this.contents.paintOpacity = blinkAlpha;
        this.contents.fillRect(x, y + 56, 52, 3, this.normalColor());
    }

    this.contents.paintOpacity = oldAlpha;
    ctx.imageSmoothingEnabled = oldSmooth;
};

//==============================================================
// ПЕРЕРИСОВКА ТОЛЬКО ЗОНЫ С ИКОНКАМИ (для анимации)
//==============================================================
Window_Glossary.prototype.refreshTabIcons = function() {
    if (this.hasSGTabs()) {
        this.contents.clearRect(0, 0, this.contents.width, SG_TABS_HEIGHT + 40);
        this.drawSGTabs();
    }
    if (this.hasFooterTabs() || this._subPages) {
        var bottomY = this.contents.height - 80;
        this.contents.clearRect(0, bottomY, this.contents.width, 80);
        if (this._subPages) {
            this.drawFooterSubMenu();
        } else {
            this.drawFooterTabs();
        }
    }
};

//==============================================================
// INPUT
//==============================================================
const _update = Window_Glossary.prototype.update;
Window_Glossary.prototype.update = function () {
    _update.call(this);

    // Плавное изменение прозрачности подчёркивания (период ~1 сек)
    this._tabBlinkFrame++;
    this._tabBlinkOpacity = 0.5 + 0.5 * Math.cos(this._tabBlinkFrame * 0.08);
    this.refreshTabIcons();

    this.updateSGTabsTouch();
    if (this._subPages) {
        if (Input.isTriggered('left')) {
            this._subPageIndex = (this._subPageIndex - 1 + this._subPages.length) % this._subPages.length;
            SoundManager.playCursor();
            this.drawItem(this._pageIndex);
        } else if (Input.isTriggered('right')) {
            this._subPageIndex = (this._subPageIndex + 1) % this._subPages.length;
            SoundManager.playCursor();
            this.drawItem(this._pageIndex);
        }
    }
};

Window_Glossary.prototype.updateSGTabsTouch = function () {
    if (!TouchInput.isTriggered()) return;
    var localX = this.canvasToLocalX(TouchInput.x);
    var localY = this.canvasToLocalY(TouchInput.y);

    var data = this.sgTabsList();
    if (data.manualRows) {
        var rows = data.tabs;
        var startX = 20, startY = 10;
        var spacingX = 64, spacingY = 80;

        for (var r = 0; r < rows.length; r++) {
            var rowIcons = rows[r];
            for (var c = 0; c < rowIcons.length; c++) {
                var x = startX + c * spacingX;
                var y = startY + r * spacingY;
                if (localX >= x - HITBOX_PADDING && localX <= x + 52 + HITBOX_PADDING &&
                    localY >= y - HITBOX_PADDING && localY <= y + 52 + HITBOX_PADDING) {
                    SoundManager.playCursor();
                    var globalIndex = 0;
                    for (var rr = 0; rr < r; rr++) globalIndex += rows[rr].length;
                    globalIndex += c;
                    this._pageIndex = globalIndex;
                    this._footerIndex = -1;
                    this._footerBasePage = null;
                    this._subPages = null;
                    this.drawItem(this._pageIndex);
                    return;
                }
            }
        }
    } else if (data.tabs.length > 0) {
        var tabs = data.tabs;
        var perRow = data.perRow;
        var startX = 20, startY = 10;
        var spacingX = 64, spacingY = 80;
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
                this._subPages = null;
                this.drawItem(this._pageIndex);
                return;
            }
        }
    }

    if (!this._subPages) {
        var fdata = this.currentFooterData();
        if (fdata) {
            var startX = 20;
            var y = this.contents.height - 80;
            var spacing = 64;
            for (var i = 0; i < fdata.length; i++) {
                var x = startX + i * spacing;
                if (localX >= x - HITBOX_PADDING && localX <= x + 52 + HITBOX_PADDING &&
                    localY >= y - HITBOX_PADDING && localY <= y + 52 + HITBOX_PADDING) {
                    SoundManager.playCursor();
                    var item = fdata[i];
                    if (item.subPages) {
                        this._subPages = item.subPages;
                        this._subPageIndex = 0;
                        this._footerIndex = i;
                        this.drawItem(this._pageIndex);
                        return;
                    } else {
                        this._footerIndex = i;
                        this._pageIndex = item.page;
                        this._subPages = null;
                        this.drawItem(this._pageIndex);
                        return;
                    }
                }
            }
        }
    }

    if (this._subPages) {
        var startX = 20;
        var y = this.contents.height - 80;
        var spacing = 48;
        for (var i = 0; i < this._subPages.length; i++) {
            var x = startX + i * spacing;
            if (localX >= x - 4 && localX <= x + 48 + 4 &&
                localY >= y - 4 && localY <= y + 52 + 4) {
                SoundManager.playCursor();
                this._subPageIndex = i;
                this._pageIndex = this._subPages[i];
                this.drawItem(this._pageIndex);
                return;
            }
        }
    }
};

//==============================================================
// ВСПОМОГАТЕЛЬНЫЕ
//==============================================================
const _refreshPage = Window_Glossary.prototype.refreshPage;
Window_Glossary.prototype.refreshPage = function(item, index) {
    this._forceDraw = true;
    this._subPages = null;
    this._subPageIndex = -1;
    _refreshPage.call(this, item, index);
    this._forceDraw = false;
};

const _updateArrows = Window_Glossary.prototype.updateArrows;
Window_Glossary.prototype.updateArrows = function() {
    _updateArrows.call(this);
    this.hideAllArrows();
};

const _refreshArrows = Window_Glossary.prototype.refreshArrows;
Window_Glossary.prototype.refreshArrows = function() {
    _refreshArrows.call(this);
    this.hideAllArrows();
};

Window_Glossary.prototype.drawPageNumber = function() {};

})();
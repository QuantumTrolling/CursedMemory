/*:
 * @plugindesc v4.8 Глоссарий: табы + футер + подменю (железобетонный фикс наложения)
 * @author You
 *
 * @help
 * ВЕРХ:
 * <SGTabs: 252,31,4, ROW, 176,177,178, ...>   (ROW разрывает строки)
 * <SGTabs: 10,11,12, ROW=6, ...>               (ROW=6 задаёт кол-во иконок в ряду)
 *
 * НИЗ:
 * <SGFooterTabs: 6:45=7+8+9,46=10>
 *
 * Формат:
 * базовая_страница: иконка=страница  или  иконка=стр1+стр2+стр3
 */

(function () {
'use strict';

const SG_TABS_HEIGHT = 170;
const HITBOX_PADDING = 12;
const DEBUG = true;  // false, когда всё заработает

function log() { if (DEBUG) console.log.apply(console, arguments); }

function arrayEquals(a, b) {
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

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
            var p = pair.split('=');
            if (!p[0] || !p[1]) return;
            var icon = parseInt(p[0].trim());
            var target = p[1].trim();
            if (isNaN(icon)) return;

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
// DRAW (защита от рисования чужих страниц)
//==============================================================
const _drawItem = Window_Glossary.prototype.drawItem;
Window_Glossary.prototype.drawItem = function (index) {
    // Игнорируем вызовы, которые пытаются нарисовать не текущую страницу
    // Кроме случаев, когда стоит флаг _forceDraw (из refreshPage) или pageIndex ещё не определён
    if (!this._forceDraw && this._pageIndex !== undefined && index !== this._pageIndex) {
        log('drawItem SKIP: unwanted index', index, 'current pageIndex', this._pageIndex);
        return;
    }
    // Сбрасываем флаг после использования
    this._forceDraw = false;

    // Сброс подменю, если базовая страница не поддерживает его
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

    // Вызываем оригинальный drawItem, который установит _pageIndex = index и нарисует контент
    _drawItem.call(this, index);

    // Рисуем наши табы и футер
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

// Перехват drawItemSub (только для клиппинга, без дополнительных проверок – они теперь в drawItem)
const _drawItemSub = Window_Glossary.prototype.drawItemSub;
Window_Glossary.prototype.drawItemSub = function(bitmap, listIndex, pageIndex) {
    // Дополнительная проверка актуальности (на всякий случай)
    if (this._listIndex !== listIndex || this._pageIndex !== pageIndex) {
        log('drawItemSub SKIP: index mismatch', 'listIdx', listIndex, 'pageIdx', pageIndex);
        return;
    }

    var text    = this.getDescription(this._pageIndex);
    var textPos = this.getTextPosition();
    var startY = this.contentStartY();
    var availableH = this.contentAreaHeight();
    log('drawItemSub listIdx', listIndex, 'pageIdx', pageIndex, 'startY', startY, 'availH', availableH);

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
    log('drawTextEx x', x, 'y', y, 'text:', text.substring(0, 50));
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
    // Сбрасываем все фильтры, чтобы следующая отрисовка точно прошла
    this._forceDraw = true;
    this._subPages = null;
    this._subPageIndex = -1;
    _refreshPage.call(this, item, index);
    this._forceDraw = false;
};

// Полное отключение стрелок
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
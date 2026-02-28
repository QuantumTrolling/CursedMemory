/*:
 * @plugindesc Увеличивает иконки навыков в 2 раза в бою (без названий, стоимость с типом под иконкой), иконка щита врага увеличена (v3.3)
 * @author Ваше Имя
 * @help
 * - В окнах навыков/предметов в бою иконки 64x64, названия скрыты.
 * - Стоимость (MP/TP) с указанием типа отображается под иконкой по центру.
 * - Цвет стоимости: MP - синий, TP - оранжевый.
 * - Ширина колонки фиксирована (размер иконки + 6px), расстояние между колонками автоматически подбирается для равномерного заполнения окна.
 * - Выделение текущего навыка рисуется ровно вокруг иконки и текста стоимости (исправлено смещение).
 * - Высота строк в этих окнах увеличена до 96.
 * - В окнах выбора цели и уязвимостей иконки 32x32.
 * - Иконка щита в окне уязвимостей 48x48 с цифрой в 2 раза крупнее.
 * - Вне боя все иконки 32x32.
 * - При увеличении используется nearest neighbour (без размытия).
 * Разместите этот плагин ПОД Olivia_OctoBattle и MOG_BattleHud.
 */

(function() {

    // --- Вспомогательные функции для определения типа окна ---
    function isTargetWindow(window) {
        return window instanceof Window_BattleEnemy ||
               window instanceof Window_BattleActor;
    }

    function isWeaknessWindow(window) {
        return typeof Window_WeaknessDisplay !== 'undefined' &&
               window instanceof Window_WeaknessDisplay;
    }

    // --- Функция для определения размера иконки в текущем окне и контексте ---
    function getIconSize(window) {
        var isBattle = SceneManager._scene instanceof Scene_Battle;
        return (isBattle && !isTargetWindow(window) && !isWeaknessWindow(window)) ? 64 : 32;
    }

    // --- Переопределяем отрисовку иконок с учётом масштабирования ---
    var _Window_Base_drawIcon = Window_Base.prototype.drawIcon;
    Window_Base.prototype.drawIcon = function(iconIndex, x, y) {
        if (!iconIndex) return;

        var pw = getIconSize(this);
        var ph = pw;

        var bitmap = ImageManager.loadSystem('IconSet');
        var sx = (iconIndex % 16) * 32;
        var sy = Math.floor(iconIndex / 16) * 32;

        var context = this.contents.context;
        var smooth = context.imageSmoothingEnabled;
        context.imageSmoothingEnabled = false;

        this.contents.blt(bitmap, sx, sy, 32, 32, x, y, pw, ph);

        context.imageSmoothingEnabled = smooth;
    };

    // --- Увеличиваем высоту строки в окнах навыков и предметов до 96 ---
    [Window_BattleSkill, Window_BattleItem].forEach(function(winClass) {
        winClass.prototype.lineHeight = function() {
            return 96;
        };
    });

    // --- Фиксированная ширина колонки (размер иконки + запас) ---
    if (Window_BattleSkill.prototype.itemWidth) {
        Window_BattleSkill.prototype.itemWidth = function() {
            var iconSize = getIconSize(this);
            return iconSize + 6;
        };
    }

    // --- Полное переопределение itemRect для равномерного распределения колонок с учётом остатка ---
    if (Window_BattleSkill.prototype.itemRect) {
        Window_BattleSkill.prototype.itemRect = function(index) {
            var rect = new Rectangle();
            var cols = this.maxCols();
            var itemW = this.itemWidth();
            var itemH = this.itemHeight();
            var padding = this.padding;
            var innerWidth = this.width - padding * 2;

            if (cols <= 1) {
                rect.x = padding;
            } else {
                var baseSpacing = Math.floor((innerWidth - itemW * cols) / (cols - 1));
                var remainder = (innerWidth - itemW * cols) - baseSpacing * (cols - 1);
                var colIndex = index % cols;
                var extra = colIndex < remainder ? colIndex : remainder;
                rect.x = padding + colIndex * itemW + colIndex * baseSpacing + extra;
            }

            rect.y = padding + Math.floor(index / cols) * itemH;
            rect.width = itemW;
            rect.height = itemH;
            return rect;
        };
    }

    // --- Отключаем использование spacing, чтобы не мешало ---
    if (Window_BattleSkill.prototype.spacing) {
        Window_BattleSkill.prototype.spacing = function() {
            return 0;
        };
    }

    // --- Переопределяем отрисовку имени предмета в окне навыков: только иконка, без названия ---
    if (Window_BattleSkill.prototype.drawItemName) {
        Window_BattleSkill.prototype.drawItemName = function(item, x, y, width) {
            if (!item) return;

            var iconSize = getIconSize(this);
            var iconX = x + (width - iconSize) / 2;
            var iconY = y + 2;

            // Округляем до целых, чтобы избежать размытия и смещения
            this.drawIcon(item.iconIndex, Math.round(iconX), Math.round(iconY));

            this._lastSkillIconRect = {
                x: Math.round(iconX),
                y: Math.round(iconY),
                size: iconSize,
                baseY: y,
                width: width
            };
        };
    }

    // --- Полностью переопределяем отрисовку стоимости навыка: под иконкой, с типом, по центру ---
    if (Window_BattleSkill.prototype.drawSkillCost) {
        Window_BattleSkill.prototype.drawSkillCost = function(skill, x, y, width) {
            var actor = this._actor;
            if (!actor) return;

            var mpCost = actor.skillMpCost(skill);
            var tpCost = actor.skillTpCost(skill);

            var costValue = 0;
            var costType = '';
            var costColor = this.normalColor();

            if (mpCost > 0) {
                costValue = mpCost;
                costType = 'MP';
                costColor = this.mpCostColor();
            } else if (tpCost > 0) {
                costValue = tpCost;
                costType = 'TP';
                costColor = '#ffa500';
            } else {
                return;
            }

            var iconRect = this._lastSkillIconRect;
            if (!iconRect) {
                var iconSize = getIconSize(this);
                iconRect = {
                    x: Math.round(x + (width - iconSize) / 2),
                    y: Math.round(y + 2),
                    size: iconSize,
                    baseY: y
                };
            }

            var costText = costValue + ' ' + costType;
            var textY = iconRect.y + iconRect.size + 4;
            var textHeight = 20;

            this.changeTextColor(costColor);
            this.contents.drawText(costText, iconRect.x, textY, iconRect.size, textHeight, 'center');
            this.resetTextColor();

            this._lastSkillIconRect = null;
        };
    }

    // --- Переопределяем отрисовку курсора для окна навыков (ровно вокруг иконки и текста) ---
    if (Window_BattleSkill.prototype.drawCursor) {
        Window_BattleSkill.prototype.drawCursor = function() {
            if (this._cursorAll) {
                var rect = this.itemRect(0);
                rect.x = this.padding;
                rect.width = this.width - this.padding * 2;
                this._drawCursor(rect);
            } else {
                var index = this.index();
                if (index >= 0) {
                    var rect = this.itemRect(index);
                    var iconSize = getIconSize(this);
                    // Вычисляем позицию иконки точно так же, как в drawItemName, с округлением
                    var iconX = Math.round(rect.x + (rect.width - iconSize) / 2);
                    var iconY = rect.y + 2;
                    var textHeight = 20;
                    var cursorRect = new Rectangle(
                        iconX,
                        iconY,
                        iconSize,
                        iconSize + 4 + textHeight
                    );
                    this._drawCursor(cursorRect);
                }
            }
        };
    }

    // --- Специальная обработка для иконки щита в окне уязвимостей Olivia OctoBattle ---
    if (typeof Window_WeaknessDisplay !== 'undefined' && 
        typeof Olivia !== 'undefined' && 
        Olivia.OctoBattle && 
        Olivia.OctoBattle.BreakShield && 
        Olivia.OctoBattle.BreakShield.Enabled) {

        var _Window_WeaknessDisplay_drawBreakShield = Window_WeaknessDisplay.prototype.drawBreakShield;

        Window_WeaknessDisplay.prototype.drawBreakShield = function() {
            if (!Olivia.OctoBattle.WeaknessDisplay.ShowBreakShield || !Olivia.OctoBattle.BreakShield.Enemies) return;

            var subject = this._subject;
            var shieldIconSize = 48;

            var x;
            if (Olivia.OctoBattle.WeaknessDisplay.ShowName) {
                this.resetFontSettings();
                this.contents.fontSize = Olivia.OctoBattle.WeaknessDisplay.NameFontSize;
                var nameWidth = this.textWidth(subject.name());
                this.resetFontSettings();
                nameWidth = Math.max(this._hpGaugeWidth, nameWidth);
                x = Math.round((this.contentsWidth() - nameWidth) / 2) - shieldIconSize - 4;
            } else if (Olivia.OctoBattle.WeaknessDisplay.ShowStates && subject.allIcons().length > 0) {
                x = Math.round(this.contentsWidth() / 2) - shieldIconSize;
            } else {
                x = Math.round((this.contentsWidth() - shieldIconSize) / 2);
            }

            this.drawLargeBreakShieldIcon(subject, x, 0, shieldIconSize);
        };

        Window_WeaknessDisplay.prototype.drawLargeBreakShieldIcon = function(battler, x, y, size) {
            var icon, text;
            if (battler.isDead() && $dataStates[battler.deathStateId()].iconIndex > 0) {
                icon = $dataStates[battler.deathStateId()].iconIndex;
                text = '';
            } else if (battler.isDead()) {
                icon = 0;
                text = '';
            } else if (battler.isBreakStunned()) {
                icon = Window_Base._iconBreakStun;
                if (this.showBreakStunDuration()) {
                    var turns = battler._stateTurns[Olivia.OctoBattle.BreakShield.StunState] || 0;
                    text = turns === 0 ? '' : String(turns);
                } else {
                    text = '';
                }
            } else {
                icon = Window_Base._iconBreakShield;
                text = battler.currentBreakShield();
            }

            if (icon === 0) return;

            var bitmap = ImageManager.loadSystem('IconSet');
            var sx = (icon % 16) * 32;
            var sy = Math.floor(icon / 16) * 32;

            var context = this.contents.context;
            var smooth = context.imageSmoothingEnabled;
            context.imageSmoothingEnabled = false;

            this.contents.blt(bitmap, sx, sy, 32, 32, x, y, size, size);

            if (text !== '') {
                this.contents.fontSize = Olivia.OctoBattle.BreakShield.IconFontSize * 2;
                var oldOutline = this.contents.outlineColor;
                this.contents.outlineColor = "rgba(0, 0, 0, 1.0)";
                this.contents.drawText(text, x, y, size, size, 'center');
                this.resetFontSettings();
                this.contents.outlineColor = oldOutline;
            }

            context.imageSmoothingEnabled = smooth;
        };
    }

})();
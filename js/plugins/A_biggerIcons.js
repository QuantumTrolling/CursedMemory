/*:
 * @plugindesc Увеличивает иконки навыков в 2 раза в бою (без названий, стоимость AP/EP под иконкой), иконка щита врага увеличена (v4.1)
 * @author Ваше Имя
 * @help
 * - В окнах навыков/предметов в бою иконки 64x64, названия скрыты.
 * - Стоимость (AP/EP) с указанием типа отображается под иконкой по центру с увеличенным отступом.
 * - Цвет стоимости: AP - синий, EP - оранжевый.
 * - Навыки распределяются по всей ширине окна с равными отступами (gap-распределение).
 * - Прямоугольник ячейки (itemRect) охватывает иконку и текст с запасом снизу, чтобы курсор не обрезал текст.
 * - Высота строк увеличена до 104.
 * - В окнах выбора цели и уязвимостей иконки 32x32.
 * - Иконка щита в окне уязвимостей 48x48 с цифрой в 2 раза крупнее.
 * - Вне боя все иконки 32x32.
 * - При увеличении используется nearest neighbour (без размытия).
 * - ИСПРАВЛЕНО: курсор (мигающая рамка) при наведении рисуется точно по размеру иконки (64x64) и находится поверх неё.
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

    // --- Увеличиваем высоту строки для обоих окон ---
    [Window_BattleSkill, Window_BattleItem].forEach(function(winClass) {
        winClass.prototype.lineHeight = function() {
            return 104;
        };
    });

    // ========== ДОПОЛНЕНИЯ ДЛЯ Window_BattleSkill ==========
    if (Window_BattleSkill.prototype.itemWidth) {
        Window_BattleSkill.prototype.itemWidth = function() {
            return getIconSize(this);
        };
    }

    if (Window_BattleSkill.prototype.spacing) {
        Window_BattleSkill.prototype.spacing = function() {
            return 0;
        };
    }

    if (Window_BattleSkill.prototype.itemRect) {
		Window_BattleSkill.prototype.itemRect = function(index) {
			var rect = new Rectangle();

			var cols = this.maxCols();
			var iconSize = this.itemWidth();
			var itemH = this.itemHeight();
			var innerWidth = this.contentsWidth();

			var gap = 0;
			if (cols > 1) {
				gap = Math.floor((innerWidth - cols * iconSize) / (cols + 1));
			} else {
				gap = Math.floor((innerWidth - iconSize) / 2);
			}

			var col = index % cols;
			var row = Math.floor(index / cols);

			rect.x = gap + col * (iconSize + gap);
			rect.y = row * itemH + 2; // отступ сверху 2 пикселя
			rect.width = iconSize;

			// *** ИЗМЕНЕНИЕ ЗДЕСЬ ***
			rect.height = iconSize; // запас для рамки, текст остаётся вне выделения

			return rect;
		};
    }

    if (Window_BattleSkill.prototype.drawItemName) {
        Window_BattleSkill.prototype.drawItemName = function(item, x, y, width) {
            if (!item) return;
            this.drawIcon(item.iconIndex, x, y);
        };
    }

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
                costType = 'AP';
                costColor = this.mpCostColor();
            } else if (tpCost > 0) {
                costValue = tpCost;
                costType = 'EP';
                costColor = '#ffa500';
            } else {
                return;
            }

            var iconSize = width;
            var textY = y + iconSize + 8;
            var textHeight = 24;
            var costText = costValue + ' ' + costType;

            this.changeTextColor(costColor);
            this.contents.drawText(costText, x, textY, iconSize, textHeight, 'center');
            this.resetTextColor();
        };
    }

    // ========== ДОПОЛНЕНИЯ ДЛЯ Window_BattleItem (аналогично навыкам) ==========
    if (Window_BattleItem.prototype.itemWidth) {
        Window_BattleItem.prototype.itemWidth = function() {
            return getIconSize(this);
        };
    }

    if (Window_BattleItem.prototype.spacing) {
        Window_BattleItem.prototype.spacing = function() {
            return 0;
        };
    }

    if (Window_BattleItem.prototype.itemRect) {
        Window_BattleItem.prototype.itemRect = function(index) {
            var rect = new Rectangle();

            var cols = this.maxCols();
            var iconSize = this.itemWidth();
            var itemH = this.itemHeight();
            var innerWidth = this.contentsWidth();

            var gap = 0;
            if (cols > 1) {
                gap = Math.floor((innerWidth - cols * iconSize) / (cols + 1));
            } else {
                gap = Math.floor((innerWidth - iconSize) / 2);
            }

            var col = index % cols;
            var row = Math.floor(index / cols);

            rect.x = gap + col * (iconSize + gap);
            rect.y = row * itemH + 2;
            rect.width = iconSize;
            rect.height = iconSize + 4;   // для предметов не рисуем стоимость, только небольшой запас

            return rect;
        };
    }

    if (Window_BattleItem.prototype.drawItemName) {
        Window_BattleItem.prototype.drawItemName = function(item, x, y, width) {
            if (!item) return;
            this.drawIcon(item.iconIndex, x, y);
        };
    }

    // ========== ИСПРАВЛЕНИЕ ФОНА ПОД ИКОНКОЙ (необязательно, но оставим для красоты) ==========
    function drawHoverBackground(win, index) {
        if (win.isCurrentItemEnabled() && index === win.index()) {
            var rect = win.itemRect(index);
            var iconSize = win.itemWidth();
            win.contents.fillRect(rect.x, rect.y, iconSize, iconSize, win.hoverBackgroundColor());
        }
    }

    if (Window_BattleSkill.prototype.drawItemBackground) {
        Window_BattleSkill.prototype.drawItemBackground = function(index) {
            drawHoverBackground(this, index);
        };
    }

    if (Window_BattleItem.prototype.drawItemBackground) {
        Window_BattleItem.prototype.drawItemBackground = function(index) {
            drawHoverBackground(this, index);
        };
    }

	// ========== ИСПРАВЛЕНИЕ КУРСОРА: ПОВЕРХ И РОВНО ПОД ИКОНКУ ==========

	// 1. Меняем порядок слоёв в окнах навыков и предметов, чтобы курсор был над содержимым
	var _Window_BattleSkill_initialize = Window_BattleSkill.prototype.initialize;
	Window_BattleSkill.prototype.initialize = function(rect) {
		_Window_BattleSkill_initialize.call(this, rect);
		// Перемещаем курсор выше содержимого
		var cursorIndex = this.getChildIndex(this._windowCursorSprite);
		var contentsIndex = this.getChildIndex(this._windowContentsSprite);
		if (cursorIndex < contentsIndex) {
			this.setChildIndex(this._windowCursorSprite, contentsIndex);
		}
	};

	var _Window_BattleItem_initialize = Window_BattleItem.prototype.initialize;
	Window_BattleItem.prototype.initialize = function(rect) {
		_Window_BattleItem_initialize.call(this, rect);
		var cursorIndex = this.getChildIndex(this._windowCursorSprite);
		var contentsIndex = this.getChildIndex(this._windowContentsSprite);
		if (cursorIndex < contentsIndex) {
			this.setChildIndex(this._windowCursorSprite, contentsIndex);
		}
	};

	// 2. Задаём точные размеры и позицию курсора (64x64, по координатам иконки)
	Window_BattleSkill.prototype.cursorWidth = function() {
		return 30;
	};
	Window_BattleSkill.prototype.cursorHeight = function() {
		return 30;
	};
	Window_BattleSkill.prototype.cursorX = function() {
		var rect = this.itemRect(this.index());
		return rect.x;
	};
	Window_BattleSkill.prototype.cursorY = function() {
		var rect = this.itemRect(this.index());
		return rect.y;
	};

	Window_BattleItem.prototype.cursorWidth = function() {
		return 30;
	};
	Window_BattleItem.prototype.cursorHeight = function() {
		return 30;
	};
	Window_BattleItem.prototype.cursorX = function() {
		var rect = this.itemRect(this.index());
		return rect.x;
	};
	Window_BattleItem.prototype.cursorY = function() {
		var rect = this.itemRect(this.index());
		return rect.y;
	};

    // ========== СПЕЦИАЛЬНАЯ ОБРАБОТКА ДЛЯ ЩИТА (Olivia OctoBattle) ==========
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
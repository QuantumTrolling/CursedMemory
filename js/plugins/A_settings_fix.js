/*:
 * @plugindesc v1.0.9 Pixel sliders with perfectly spaced layout and cold silver-blue style.
 * @author YourName
 *
 * @param animSpeed
 * @desc Animation speed (0.0 to 1.0). Higher = faster fill.
 * @default 0.2
 *
 * @param closeBtnImage
 * @text Файл картинки кнопки закрытия
 * @desc Имя файла из img/pictures/ (без расширения).
 * @default close
 *
 * @param closeBtnX
 * @text X кнопки закрытия (0 = авто: правый верх)
 * @type number
 * @default 0
 *
 * @param closeBtnY
 * @text Y кнопки закрытия (0 = авто: правый верх)
 * @type number
 * @default 0
 *
 * @param closeBtnMarginRight
 * @text Отступ от правого края (для авто-позиции)
 * @type number
 * @default 20
 *
 * @param closeBtnMarginTop
 * @text Отступ от верхнего края (для авто-позиции)
 * @type number
 * @default 20
 *
 * @param closeBtnScale
 * @text Масштаб кнопки закрытия
 * @type number
 * @decimals 2
 * @default 1
 *
 * @param closeBtnHover
 * @text Подсветка кнопки при наведении (0/1)
 * @desc 1 = при наведении кнопка становится чуть ярче.
 * @type number
 * @default 1
 *
 * @help
 * Replaces default volume buttons with interactive pixel sliders styled
 * to match a dark, cold-silver UI (SNES/PS1 aesthetic).
 * Fixes percentage text clipping by using wider area and balanced spacing.
 *
 * Features:
 * - Mouse drag & click, keyboard (Enter to activate, arrows to adjust).
 * - Smooth animated fill.
 * - Adaptive layout (compatible with YEP_CoreEngine, resolution plugins).
 * - Silver-blue color scheme.
 * - Refined spacing: labels, sliders, and percentages no longer feel cramped.
 * - Close button from img/pictures/close.png that acts as ESC (closes scene).
 * - Close button auto-anchors to the top-right corner of the screen.
 *
 * Installation:
 * - Save as "VolSliderOptions.js" in js/plugins folder.
 * - Enable in Plugin Manager, placing AFTER any Options-modifying plugins.
 */

var Imported = Imported || {};
Imported.VolSliderOptions = true;

(function() {
    'use strict';

    var parameters = PluginManager.parameters('VolSliderOptions');
    var animSpeed = Number(parameters['animSpeed'] || '0.2');

    var closeBtnImage = String(parameters['closeBtnImage'] || 'close');
    var closeBtnX = Number(parameters['closeBtnX'] || 0);
    var closeBtnY = Number(parameters['closeBtnY'] || 0);
    var closeBtnMarginRight = Number(parameters['closeBtnMarginRight'] || 10);
    var closeBtnMarginTop = Number(parameters['closeBtnMarginTop'] || 10);
    var closeBtnScale = Number(parameters['closeBtnScale'] || 1);
    var closeBtnHover = Number(parameters['closeBtnHover'] || 1);

    // Pixel sizes
    var SLIDER_HEIGHT = 10;
    var KNOB_WIDTH = 6;

    // Aliases
    var _Window_Options_initialize = Window_Options.prototype.initialize;
    var _Window_Options_drawItem = Window_Options.prototype.drawItem;
    var _Window_Options_processOk = Window_Options.prototype.processOk;
    var _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
    var _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
    var _Window_Options_update = Window_Options.prototype.update;
    var _Window_Options_cursorUp = Window_Options.prototype.cursorUp;
    var _Window_Options_cursorDown = Window_Options.prototype.cursorDown;
    var _Window_Options_processCancel = Window_Options.prototype.processCancel;

    function volumeIndex(symbol) {
        switch (symbol) {
            case 'bgmVolume': return 0;
            case 'bgsVolume': return 1;
            case 'meVolume':  return 2;
            case 'seVolume':  return 3;
        }
        return -1;
    }

    // -------------------------------------------------------------------------
    // Initialization
    // -------------------------------------------------------------------------

    Window_Options.prototype.initialize = function() {
        _Window_Options_initialize.call(this);
        this._displayVolumes = [
            ConfigManager.bgmVolume,
            ConfigManager.bgsVolume,
            ConfigManager.meVolume,
            ConfigManager.seVolume
        ];
        this._targetVolumes = [
            ConfigManager.bgmVolume,
            ConfigManager.bgsVolume,
            ConfigManager.meVolume,
            ConfigManager.seVolume
        ];
        this._draggingSliderIndex = -1;
        this._sliderActiveIndex = -1;
    };

    Window_Options.prototype.ensureVolumeArrays = function() {
        if (!this._displayVolumes) {
            this._displayVolumes = [
                ConfigManager.bgmVolume,
                ConfigManager.bgsVolume,
                ConfigManager.meVolume,
                ConfigManager.seVolume
            ];
        }
        if (!this._targetVolumes) {
            this._targetVolumes = [
                ConfigManager.bgmVolume,
                ConfigManager.bgsVolume,
                ConfigManager.meVolume,
                ConfigManager.seVolume
            ];
        }
    };

    // -------------------------------------------------------------------------
    // Adaptive layout with refined spacing
    // -------------------------------------------------------------------------

    Window_Options.prototype.currentVolumeSymbol = function() {
        var symbol = this.commandSymbol(this.index());
        if (symbol && volumeIndex(symbol) >= 0) return symbol;
        return null;
    };

    Window_Options.prototype.volumeSliderRect = function(index) {
        var rect = this.itemRect(index);
        var totalWidth = rect.width;

        // Proportional but with breathing room
        var labelWidth = Math.floor(totalWidth * 0.42);
        var percentWidth = 52;
        var spacing = 12;

        var sliderWidth = totalWidth - labelWidth - percentWidth - spacing * 3;
        if (sliderWidth < 20) sliderWidth = 20; // minimum to avoid zero

        var x = rect.x + labelWidth + spacing;
        var y = rect.y + Math.floor((rect.height - SLIDER_HEIGHT) / 2);

        return {
            x: x,
            y: y,
            width: sliderWidth,
            height: SLIDER_HEIGHT,
            labelWidth: labelWidth,
            percentWidth: percentWidth,
            spacing: spacing
        };
    };

    Window_Options.prototype.updateDisplayVolumes = function() {
        var changed = false;
        this.ensureVolumeArrays();
        for (var i = 0; i < 4; i++) {
            var target = this._targetVolumes[i];
            var current = this._displayVolumes[i];
            if (Math.abs(target - current) < 0.5) {
                if (current !== target) {
                    this._displayVolumes[i] = target;
                    changed = true;
                }
            } else {
                this._displayVolumes[i] += (target - current) * animSpeed;
                changed = true;
            }
        }
        return changed;
    };

    // -------------------------------------------------------------------------
    // Drawing – cold silver-blue pixel style
    // -------------------------------------------------------------------------

    Window_Options.prototype.drawItem = function(index) {
        var symbol = this.commandSymbol(index);
        if (symbol && volumeIndex(symbol) >= 0) {
            this.ensureVolumeArrays();
            var rect = this.itemRect(index);
            var text = this.commandName(index);
            var sliderRect = this.volumeSliderRect(index);

            this.resetTextColor();
            // Parameter name
            this.drawText(text, rect.x, rect.y, sliderRect.labelWidth, 'left');

            // === Track ===
            // Border (medium grey-blue)
            this.contents.fillRect(
                sliderRect.x - 1,
                sliderRect.y - 1,
                sliderRect.width + 2,
                SLIDER_HEIGHT + 2,
                '#6a7488'
            );
            // Background (dark recessed)
            this.contents.fillRect(
                sliderRect.x,
                sliderRect.y,
                sliderRect.width,
                SLIDER_HEIGHT,
                '#1a2230'
            );

            // === Fill ===
            var volIdx = volumeIndex(symbol);
            var displayVol = this._displayVolumes[volIdx] || 0;
            var fillW = Math.floor(sliderRect.width * displayVol / 100);
            if (fillW > 0) {
                // Main fill (silver-blue)
                this.contents.fillRect(
                    sliderRect.x,
                    sliderRect.y,
                    fillW,
                    SLIDER_HEIGHT,
                    '#6f7c99'
                );
                // Top highlight (cold light)
                this.contents.fillRect(
                    sliderRect.x,
                    sliderRect.y,
                    fillW,
                    1,
                    '#cfd8e8'
                );
            }

            // === Knob (pixel art handle with depth) ===
            var knobX = sliderRect.x + fillW - KNOB_WIDTH / 2;
            if (knobX < sliderRect.x - 1) knobX = sliderRect.x - 1;
            if (knobX > sliderRect.x + sliderRect.width - KNOB_WIDTH + 1) {
                knobX = sliderRect.x + sliderRect.width - KNOB_WIDTH + 1;
            }

            // Shadow
            this.contents.fillRect(
                knobX - 1,
                sliderRect.y - 2,
                KNOB_WIDTH + 2,
                SLIDER_HEIGHT + 4,
                '#000000'
            );
            // Body
            this.contents.fillRect(
                knobX,
                sliderRect.y - 1,
                KNOB_WIDTH,
                SLIDER_HEIGHT + 2,
                '#9aa5b8'
            );
            // Top highlight
            this.contents.fillRect(
                knobX,
                sliderRect.y - 1,
                KNOB_WIDTH,
                1,
                '#e8eef8'
            );
            // Left shadow for 3D effect
            this.contents.fillRect(
                knobX,
                sliderRect.y,
                1,
                SLIDER_HEIGHT,
                '#5a6578'
            );

            // === Percentage (right-aligned, with proper space) ===
            var percText = Math.round(displayVol) + '%';
            var percX = sliderRect.x + sliderRect.width + sliderRect.spacing;
            this.drawText(percText, percX, rect.y, sliderRect.percentWidth, 'right');
        } else {
            _Window_Options_drawItem.call(this, index);
        }
    };

    // -------------------------------------------------------------------------
    // Update & Dragging
    // -------------------------------------------------------------------------

    Window_Options.prototype.update = function() {
        _Window_Options_update.call(this);
        if (this.updateDisplayVolumes()) {
            for (var i = 0; i < this.maxItems(); i++) {
                var sym = this.commandSymbol(i);
                if (volumeIndex(sym) >= 0) this.redrawItem(i);
            }
        }

        if (this._draggingSliderIndex >= 0) {
            if (TouchInput.isPressed()) {
                this.updateSliderDrag();
            } else {
                this._draggingSliderIndex = -1;
            }
        }
    };

    Window_Options.prototype.updateSliderDrag = function() {
        var index = this._draggingSliderIndex;
        var symbol = this.commandSymbol(index);
        if (!symbol) return;

        var rect = this.volumeSliderRect(index);
        var localX = TouchInput.x - this.x - this.padding;
        var localY = TouchInput.y - this.y - this.padding;

        var relX = localX - rect.x;
        var percentage = Math.min(1, Math.max(0, relX / rect.width));
        var newValue = Math.round(percentage * 100);

        var diff = Math.abs(ConfigManager[symbol] - newValue);
        if (diff >= 2 && ConfigManager[symbol] !== newValue) {
            ConfigManager[symbol] = newValue;
            this._targetVolumes[volumeIndex(symbol)] = newValue;
            SoundManager.playCursor();
        } else if (diff > 0) {
            ConfigManager[symbol] = newValue;
            this._targetVolumes[volumeIndex(symbol)] = newValue;
        }
    };

    // -------------------------------------------------------------------------
    // Touch via processTouch
    // -------------------------------------------------------------------------

    Window_Options.prototype.processTouch = function() {
        if (this.isOpenAndActive()) {
            if (TouchInput.isTriggered() || TouchInput.isPressed()) {
                var localX = TouchInput.x - this.x - this.padding;
                var localY = TouchInput.y - this.y - this.padding;

                for (var i = 0; i < this.maxItems(); i++) {
                    var sym = this.commandSymbol(i);
                    if (volumeIndex(sym) >= 0) {
                        var rect = this.volumeSliderRect(i);
                        // Slightly larger touch zone for ease of use
                        if (localX >= rect.x - 2 && localX <= rect.x + rect.width + 2 &&
                            localY >= rect.y - 3 && localY <= rect.y + rect.height + 3) {
                            this.select(i);
                            this._draggingSliderIndex = i;
                            this._sliderActiveIndex = -1;
                            this.updateSliderDrag();
                            return;
                        }
                    }
                }
            }

            if (TouchInput.isReleased()) {
                this._draggingSliderIndex = -1;
            }
        }

        Window_Selectable.prototype.processTouch.call(this);
    };

    // -------------------------------------------------------------------------
    // Keyboard control
    // -------------------------------------------------------------------------

    Window_Options.prototype.processOk = function() {
        var sym = this.currentVolumeSymbol();
        if (sym) {
            if (this._sliderActiveIndex === this.index()) {
                this._sliderActiveIndex = -1;
            } else {
                this._sliderActiveIndex = this.index();
            }
            this.redrawItem(this.index());
            SoundManager.playOk();
        } else {
            _Window_Options_processOk.call(this);
        }
    };

    Window_Options.prototype.cursorUp = function(wrap) {
        if (this._sliderActiveIndex >= 0) return;
        _Window_Options_cursorUp.call(this, wrap);
    };

    Window_Options.prototype.cursorDown = function(wrap) {
        if (this._sliderActiveIndex >= 0) return;
        _Window_Options_cursorDown.call(this, wrap);
    };

    Window_Options.prototype.cursorRight = function(wrap) {
        var sym = this.currentVolumeSymbol();
        if (sym && this._sliderActiveIndex === this.index()) {
            this.changeVolumeByDelta(1);
        } else {
            _Window_Options_cursorRight.call(this, wrap);
        }
    };

    Window_Options.prototype.cursorLeft = function(wrap) {
        var sym = this.currentVolumeSymbol();
        if (sym && this._sliderActiveIndex === this.index()) {
            this.changeVolumeByDelta(-1);
        } else {
            _Window_Options_cursorLeft.call(this, wrap);
        }
    };

    Window_Options.prototype.changeVolumeByDelta = function(delta) {
        var symbol = this.commandSymbol(this.index());
        if (symbol && volumeIndex(symbol) >= 0) {
            var newValue = ConfigManager[symbol] + delta;
            newValue = Math.max(0, Math.min(100, newValue));
            if (ConfigManager[symbol] !== newValue) {
                ConfigManager[symbol] = newValue;
                this.ensureVolumeArrays();
                this._targetVolumes[volumeIndex(symbol)] = newValue;
                SoundManager.playCursor();
            }
        }
    };

    Window_Options.prototype.processCancel = function() {
        if (this._sliderActiveIndex >= 0) {
            this._sliderActiveIndex = -1;
            this.redrawItem(this.index());
            SoundManager.playCancel();
        } else {
            _Window_Options_processCancel.call(this);
        }
    };

    // =========================================================================
    // Close button on Scene_Options
    // =========================================================================

    var _Scene_Options_create = Scene_Options.prototype.create;
    Scene_Options.prototype.create = function() {
        _Scene_Options_create.call(this);
        this.createCloseButton();
    };

    Scene_Options.prototype.createCloseButton = function() {
        var bmp = ImageManager.loadPicture(closeBtnImage);
        this._closeButton = new Sprite(bmp);
        this._closeButton.scale.x = closeBtnScale;
        this._closeButton.scale.y = closeBtnScale;
        this._closeButton.opacity = 255;

        // Авто-позиция в правый верхний угол (если closeBtnX/Y = 0).
        // Реальное позиционирование по X произойдёт в update(),
        // т.к. на момент создания спрайта ширина спрайта может быть 0.
        this._closeButton.x = closeBtnX;
        this._closeButton.y = closeBtnY;

        this._closeBtnAutoPos = (closeBtnX === 0 && closeBtnY === 0);
        this._closeBtnHovered = false;

        // Кнопка должна быть поверх окна опций
        this.addChild(this._closeButton);
    };

    // Пересчёт авто-позиции в правом верхнем углу.
    // Учитывает размер картинки и scale, а также реальные размеры экрана.
    Scene_Options.prototype.repositionCloseButton = function() {
        var s = this._closeButton;
        if (!s || !s.bitmap) return;

        // Пока картинка не готова, размеры спрайта могут быть 0 —
        // повторим попытку в update().
        if (!s.bitmap.isReady()) return;

        // Размер с учётом scale
        var w = s.bitmap.width * closeBtnScale;
        var h = s.bitmap.height * closeBtnScale;

        if (this._closeBtnAutoPos) {
            // Правый верхний угол
            s.x = Graphics.boxWidth - w - closeBtnMarginRight;
            s.y = closeBtnMarginTop;
        } else {
            s.x = closeBtnX;
            s.y = closeBtnY;
        }
    };

    Scene_Options.prototype.isCloseButtonTouched = function() {
        var s = this._closeButton;
        if (!s || !s.visible || !s.bitmap) return false;
        if (!s.bitmap.isReady()) return false;

        var x = TouchInput.x;
        var y = TouchInput.y;
        var local = s.worldTransform.applyInverse({ x: x, y: y });
        return local.x >= 0 && local.y >= 0 &&
               local.x < s.width && local.y < s.height;
    };

    var _Scene_Options_update = Scene_Options.prototype.update;
    Scene_Options.prototype.update = function() {
        _Scene_Options_update.call(this);

        if (!this._closeButton) return;

        // Держим кнопку в правом верхнем углу, пока картинка грузится/при смене разрешения
        if (this._closeBtnAutoPos) {
            this.repositionCloseButton();
        }

        // Реакция на наведение курсора (лёгкая подсветка)
        if (closeBtnHover) {
            var hovered = this.isCloseButtonTouched();
            if (hovered !== this._closeBtnHovered) {
                this._closeBtnHovered = hovered;
                this._closeButton.opacity = hovered ? 200 : 255;
            }
        }

        // Клик ЛКМ по кнопке = нажатие ESC (закрытие сцены)
        if (TouchInput.isTriggered() && this.isCloseButtonTouched()) {
            this.onCloseButtonClick();
        }
    };

    Scene_Options.prototype.onCloseButtonClick = function() {
        SoundManager.playCancel();
        // Эквивалент ESC: закрыть текущую сцену (вернуться в меню)
        this.popScene();
    };

    var _Scene_Options_terminate = Scene_Options.prototype.terminate;
    Scene_Options.prototype.terminate = function() {
        if (this._closeButton) {
            this.removeChild(this._closeButton);
            this._closeButton = null;
        }
        _Scene_Options_terminate.call(this);
    };

})();
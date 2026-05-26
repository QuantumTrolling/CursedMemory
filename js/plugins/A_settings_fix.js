/*:
 * @plugindesc v1.0.8 Pixel sliders with perfectly spaced layout and cold silver-blue style.
 * @author YourName
 *
 * @param animSpeed
 * @desc Animation speed (0.0 to 1.0). Higher = faster fill.
 * @default 0.2
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

})();
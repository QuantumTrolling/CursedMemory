/*:
 * @plugindesc Stable Fullscreen Toggle with Config Support for RPG Maker MV
 * @author ChatGPT
 * @target MV
 */

(function() {

    // Add fullscreen option to options menu
    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.call(this);
        this.addCommand("Fullscreen", "fullscreen");
    };

    // Hook fullscreen setting into config manager
    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.call(this);
        config.fullscreen = this.fullscreen;
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        this.fullscreen = config.fullscreen !== undefined ? config.fullscreen : this.defaultFullscreen();
        this.applyFullScreen();
    };

    ConfigManager.defaultFullscreen = function() {
        return false; // default fullscreen state
    };

    ConfigManager.applyFullScreen = function() {
        if (this.fullscreen !== this.isCurrentlyFullScreen()) {
            this.toggleFullScreen();
        }
    };

    ConfigManager.isCurrentlyFullScreen = function() {
        return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    };

    ConfigManager.toggleFullScreen = function() {
        if (!this.isCurrentlyFullScreen()) {
            const element = document.body;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    };

    // When player changes option from menu
    const _Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function(index) {
        const symbol = this.commandSymbol(index);
        if (symbol === "fullscreen") {
            return ConfigManager[symbol] ? "On" : "Off";
        }
        return _Window_Options_statusText.call(this, index);
    };

    const _Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function() {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (symbol === "fullscreen") {
            ConfigManager[symbol] = !ConfigManager[symbol];
            ConfigManager.applyFullScreen();
            this.redrawItem(index);
        } else {
            _Window_Options_processOk.call(this);
        }
    };

})();
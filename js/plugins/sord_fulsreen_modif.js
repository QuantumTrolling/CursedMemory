/*:
 * @plugindesc Fully stable fullscreen toggle with config sync and scaling fix for RPG Maker MV.
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

    // Sync fullscreen state correctly when loading config
    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.call(this);
        config.fullscreen = this.fullscreen;
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        this.fullscreen = (config.fullscreen !== undefined) ? config.fullscreen : false;
    };

    // Correctly determine fullscreen state
    ConfigManager.isCurrentlyFullScreen = function() {
        return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    };

    // Apply fullscreen AFTER scenes start
    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);
        setTimeout(function() {
            if (ConfigManager.fullscreen !== ConfigManager.isCurrentlyFullScreen()) {
                toggleFullScreen();
            }
        }, 100);
    };

    // When player changes option from menu
    const _Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function(index) {
        const symbol = this.commandSymbol(index);
        if (symbol === "fullscreen") {
            return ConfigManager.fullscreen ? "On" : "Off";
        }
        return _Window_Options_statusText.call(this, index);
    };

    const _Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function() {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (symbol === "fullscreen") {
            ConfigManager.fullscreen = !ConfigManager.fullscreen;
            toggleFullScreen();
            this.redrawItem(index);
        } else {
            _Window_Options_processOk.call(this);
        }
    };

    function toggleFullScreen() {
        const element = document.body;
        if (!ConfigManager.isCurrentlyFullScreen()) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    // Optional: scaling fix to prevent black bars
    const resizeGame = function() {
        let ratioX = window.innerWidth / Graphics.width;
        let ratioY = window.innerHeight / Graphics.height;
        let ratio = Math.min(ratioX, ratioY);
        let newWidth = Math.floor(Graphics.width * ratio);
        let newHeight = Math.floor(Graphics.height * ratio);
        const canvas = document.getElementById('GameCanvas');
        canvas.style.width = newWidth + 'px';
        canvas.style.height = newHeight + 'px';
        canvas.style.margin = 'auto';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.bottom = '0';
        canvas.style.left = '0';
        canvas.style.right = '0';
    };

    window.addEventListener("resize", resizeGame);
    window.addEventListener("load", resizeGame);

})();

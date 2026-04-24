/*:
 * @plugindesc Fullscreen + точное попадание курсора (DPI fix v2)
 * @author Midnight Crew (fixed)
 * @target MV
 *
 * @param EnableLog
 * @desc Включить отладочный вывод координат в консоль (true/false)
 * @default false
 *
 * @help
 * Исправляет положение курсора в полноэкранном режиме при масштабе Windows ≠100%.
 * Если EnableLog = true, в консоли (F8) появится текущее положение мыши и
 * координаты ближайшей кнопки (при её наличии).
 */

(function() {
    var parameters = PluginManager.parameters('FullscreenFix');
    var enableLog = parameters['EnableLog'] === 'true';

    // ================== ОПЦИЯ В МЕНЮ ==================
    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.call(this);
        this.addCommand("Fullscreen", "fullscreen");
    };

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

    ConfigManager.isCurrentlyFullScreen = function() {
        return document.fullscreenElement ||
               document.webkitFullscreenElement ||
               document.mozFullScreenElement ||
               document.msFullscreenElement;
    };

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);
        setTimeout(function() {
            if (ConfigManager.fullscreen !== ConfigManager.isCurrentlyFullScreen()) {
                toggleFullScreen();
            }
        }, 100);
    };

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

    // ================== РАСТЯЖЕНИЕ НА ВЕСЬ ЭКРАН ==================
    function forceCanvasStretch() {
        const canvas = document.getElementById('GameCanvas');
        if (!canvas) return;

        if (ConfigManager.isCurrentlyFullScreen()) {
            canvas.style.width = '100vw';
            canvas.style.height = '100vh';
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.objectFit = 'fill';
        } else {
            canvas.style.width = '';
            canvas.style.height = '';
            canvas.style.position = '';
            canvas.style.top = '';
            canvas.style.left = '';
            canvas.style.objectFit = '';
            if (Graphics._updateRealScale) Graphics._updateRealScale();
        }
    }

    // ================== ТОЧНОЕ ПРЕОБРАЗОВАНИЕ КООРДИНАТ ==================
    const _Graphics_pageToCanvasX = Graphics.pageToCanvasX;
    const _Graphics_pageToCanvasY = Graphics.pageToCanvasY;

    Graphics.pageToCanvasX = function(x) {
        if (!this._canvas) return 0;
        const rect = this._canvas.getBoundingClientRect();
        // x относительно документа → относительно canvas (в CSS-пикселях)
        const cssX = x - rect.left;
        // Масштаб: CSS-ширина / внутренняя ширина canvas
        return cssX * (this._canvas.width / rect.width);
    };

    Graphics.pageToCanvasY = function(y) {
        if (!this._canvas) return 0;
        const rect = this._canvas.getBoundingClientRect();
        const cssY = y - rect.top;
        return cssY * (this._canvas.height / rect.height);
    };

    // ================== ОТЛАДОЧНЫЕ ЛОГИ ==================
    if (enableLog) {
        // Отслеживаем движение мыши и показываем координаты
        document.addEventListener('mousemove', function(e) {
            if (!Graphics._canvas) return;
            const rect = Graphics._canvas.getBoundingClientRect();
            const cssX = e.pageX - rect.left;
            const cssY = e.pageY - rect.top;
            const gameX = cssX * (Graphics._canvas.width / rect.width);
            const gameY = cssY * (Graphics._canvas.height / rect.height);

            console.log(`[Mouse] pageX=${e.pageX}, pageY=${e.pageY} | ` +
                        `CSS: (${cssX.toFixed(1)}, ${cssY.toFixed(1)}) | ` +
                        `Game: (${Math.floor(gameX)}, ${Math.floor(gameY)})`);
        });

        // Также можно вывести координаты окон при открытии
        const _Scene_Map_start = Scene_Map.prototype.start;
        Scene_Map.prototype.start = function() {
            _Scene_Map_start.call(this);
            console.log('[Scene_Map] Windows:', SceneManager._scene._windowLayer.children.map(w => ({
                width: w.width, height: w.height,
                x: w.x, y: w.y,
                visible: w.visible,
                name: w.constructor.name
            })));
        };
    }

    // ================== ПЕРЕКЛЮЧЕНИЕ ПОЛНОГО ЭКРАНА ==================
    function toggleFullScreen() {
        const element = document.body;
        if (!ConfigManager.isCurrentlyFullScreen()) {
            const requestMethod = element.requestFullscreen ||
                                  element.webkitRequestFullscreen ||
                                  element.mozRequestFullScreen ||
                                  element.msRequestFullscreen;
            if (requestMethod) requestMethod.call(element);
        } else {
            const exitMethod = document.exitFullscreen ||
                               document.webkitExitFullscreen ||
                               document.mozCancelFullScreen ||
                               document.msExitFullscreen;
            if (exitMethod) exitMethod.call(document);
        }
        setTimeout(forceCanvasStretch, 50);
    }

    document.addEventListener('fullscreenchange', forceCanvasStretch);
    document.addEventListener('webkitfullscreenchange', forceCanvasStretch);
    document.addEventListener('mozfullscreenchange', forceCanvasStretch);
    document.addEventListener('MSFullscreenChange', forceCanvasStretch);

    window.addEventListener('resize', function() {
        if (ConfigManager.isCurrentlyFullScreen()) {
            forceCanvasStretch();
        }
    });

    window.addEventListener('load', forceCanvasStretch);
})();
/*:
 * @plugindesc MV Performance Profiler (FPS + update time tracker)
 * @author ChatGPT
 *
 * @help
 * F8 - toggle overlay
 * Logs heavy frames into console
 */

var MVProfiler = MVProfiler || {};

(function() {

    MVProfiler.enabled = false;
    MVProfiler.lastTime = performance.now();
    MVProfiler.frameTimes = [];
    MVProfiler.maxSamples = 60;

    MVProfiler.stats = {
        sceneTime: 0,
        lastScene: "",
        spikes: 0
    };

    //==============================
    // FPS + frame timing
    //==============================
    var _SceneManager_update = SceneManager.update;
    SceneManager.update = function() {

        var now = performance.now();
        var dt = now - MVProfiler.lastTime;
        MVProfiler.lastTime = now;

        MVProfiler.frameTimes.push(dt);
        if (MVProfiler.frameTimes.length > MVProfiler.maxSamples) {
            MVProfiler.frameTimes.shift();
        }

        var avg = MVProfiler.frameTimes.reduce((a,b)=>a+b,0) / MVProfiler.frameTimes.length;

        if (dt > 33) {
            MVProfiler.stats.spikes++;
        }

        if (MVProfiler.enabled && dt > 33) {
            console.warn("[Profiler] Spike frame:", dt.toFixed(2) + "ms", SceneManager._scene);
        }

        _SceneManager_update.call(this);

        if (MVProfiler.enabled) {
            MVProfiler.drawOverlay(avg, dt);
        }
    };

    //==============================
    // Scene profiling
    //==============================
    var _Scene_updateMain = SceneManager.updateMain;
    SceneManager.updateMain = function() {

        var start = performance.now();

        _Scene_updateMain.call(this);

        var time = performance.now() - start;
        MVProfiler.stats.sceneTime = time;
        MVProfiler.stats.lastScene = SceneManager._scene ? SceneManager._scene.constructor.name : "null";

        if (MVProfiler.enabled && time > 10) {
            console.log("[Profiler] Scene update:", MVProfiler.stats.lastScene, time.toFixed(2) + "ms");
        }
    };

    //==============================
    // Toggle key
    //==============================
    var _Input_onKeyDown = Input._onKeyDown;
    Input._onKeyDown = function(event) {
        _Input_onKeyDown.call(this, event);
        if (event.key === "F8") {
            MVProfiler.enabled = !MVProfiler.enabled;
            console.log("[Profiler] enabled:", MVProfiler.enabled);
        }
    };

    //==============================
    // Overlay
    //==============================
    MVProfiler.drawOverlay = function(avg, dt) {

        if (!SceneManager._scene) return;

        if (!this._sprite) {
            this._sprite = new Sprite(new Bitmap(300, 120));
            this._sprite.x = 10;
            this._sprite.y = 10;
            SceneManager._scene.addChild(this._sprite);
        }

        var b = this._sprite.bitmap;
        b.clear();

        b.fontSize = 18;

        b.drawText("FPS: " + (1000 / avg).toFixed(1), 0, 0, 300, 24, "left");
        b.drawText("Frame: " + dt.toFixed(2) + "ms", 0, 24, 300, 24, "left");
        b.drawText("Scene: " + MVProfiler.stats.lastScene, 0, 48, 300, 24, "left");
        b.drawText("SceneTime: " + MVProfiler.stats.sceneTime.toFixed(2) + "ms", 0, 72, 300, 24, "left");
        b.drawText("Spikes: " + MVProfiler.stats.spikes, 0, 96, 300, 24, "left");
    };

})();
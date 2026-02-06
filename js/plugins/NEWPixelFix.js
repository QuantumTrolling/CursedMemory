(function() {
    const _Graphics_createCanvas = Graphics._createCanvas;
    Graphics._createCanvas = function() {
        _Graphics_createCanvas.call(this);

        const ctx = this._canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
    };

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
})();

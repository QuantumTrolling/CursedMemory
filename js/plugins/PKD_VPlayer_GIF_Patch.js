//=============================================================================
// PKD_VPlayer GIF Support Patch v18 (GIF как video – идеальное решение)
//=============================================================================

/*:
 * @plugindesc <PKD GIF Patch> Замена webm на GIF через video-элемент.
 * @author Midnight Crew
 * @target MV
 *
 * @param Default Scale
 * @desc Множитель размера GIF (1.0 = исходный размер).
 * @type number
 * @default 1.0
 *
 * @help
 * Порядок: PKD_VPlayer -> Ваш фикс -> ЭТОТ ПЛАГИН.
 * GIF-файлы в папке movies/. Расширение .gif
 * Браузеры воспроизводят GIF как видео, поэтому анимация работает идеально.
 */

(function() {
    if (typeof VWSprite === 'undefined') {
        console.error('[PKD_GIF_Patch] VWSprite не найден.');
        return;
    }

    var parameters = $plugins.filter(function(p) {
        return p.description.contains('<PKD GIF Patch>');
    })[0].parameters;
    var defaultScale = Number(parameters['Default Scale'] || 1.0);

    console.log('[PKD_GIF_Patch] Патч активирован (v18). GIF через video. Масштаб: ' + defaultScale);

    // Переопределяем create – создаём video вместо PIXI.Texture.fromVideo
    var _original_create = VWSprite.prototype.create;
    VWSprite.prototype.create = function() {
        var video = document.createElement('video');
        video.src = 'movies/' + this.filename + '.gif';
        video.loop = this._loop;
        video.autoplay = true;
        video.muted = true;
        video.playsInline = true;
        video.style.display = 'none';
        document.body.appendChild(video);

        this._video = video;

        // Создаём текстуру из видео-элемента
        this.vidTexture = PIXI.Texture.fromVideo(video);
        this.surface = new PIXI.Sprite(this.vidTexture);
        this.source = video; // важно для оригинальных методов

        var self = this;

        var onLoadedMetadata = function() {
            self.surface.width = video.videoWidth * defaultScale;
            self.surface.height = video.videoHeight * defaultScale;
            self.addChild(self.surface);
            self._loaded = true;
            if (self.onLoaded) self.onLoaded();
        };

        video.addEventListener('loadedmetadata', onLoadedMetadata);
        video.addEventListener('ended', function() {
            self._onEnd();
        });
        video.play();

        // Сохраняем обработчики для очистки
        this._videoLoadHandler = onLoadedMetadata;
    };

    // Обновление оставляем оригинальное (оно уже делает update текстуры и вызывает play)
    // Но переопределим _selfStop, чтобы удалить наш video-элемент
    var _original_selfStop = VWSprite.prototype._selfStop;
    VWSprite.prototype._selfStop = function() {
        if (this._video) {
            this._video.removeEventListener('loadedmetadata', this._videoLoadHandler);
            this._video.removeEventListener('ended', function() {});
            this._video.pause();
            if (this._video.parentNode) this._video.parentNode.removeChild(this._video);
            this._video.src = '';
            this._video.load();
            this._video = null;
        }
        _original_selfStop.call(this);
    };

    // Заглушка для _workWithTexture (не нужна, потому что оригинал её вызывает, но мы уже всё сделали)
    var _original_workWithTexture = VWSprite.prototype._workWithTexture;
    VWSprite.prototype._workWithTexture = function() {
        // В оригинале здесь устанавливаются размеры и запускается play.
        // У нас это уже сделано в onLoadedMetadata. Просто заглушка.
    };

})();
})();
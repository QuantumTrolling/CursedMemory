
/*:
 * @plugindesc v6.3 Затемнение боя и волн MOG Consecutive Battles, включая все CTB-окна.
 * @author ChatGPT
 *
 * @param Fade Frames
 * @text Длительность проявления (кадры)
 * @type number
 * @min 1
 * @default 60
 *
 * @param Black Duration (ms)
 * @text Длительность чёрного экрана (мс)
 * @type number
 * @min 0
 * @default 5000
 *
 * @help
 * ForceBattleFade v6.3
 *
 * 1. При запуске первой битвы экран мгновенно становится чёрным.
 * 2. При переходе к каждой следующей волне затемнение запускается
 *    непосредственно в BattleManager.processVictory.
 * 3. Новые противники создаются под чёрным слоем.
 * 4. После задержки экран плавно проявляется.
 * 5. Чёрный слой всегда находится выше всех окон и спрайтов,
 *    включая CTB-полоску и динамический клон будущего хода.
 *
 * Разместить ниже:
 * YEP_CoreEngine
 * YEP_BattleEngineCore
 * MOG_BattleHud
 * BattleZoom
 * MOG_ConsecutiveBattles
 * CTB-плагинов и других плагинов, создающих окна в Scene_Battle.
 *
 * Важно: оставить включённой только одну версию ForceBattleFade.
 */

(function() {
    'use strict';

    var params = PluginManager.parameters('ForceBattleFade');

    var FADE_FRAMES = Math.max(
        1,
        Number(params['Fade Frames'] || 60)
    );

    var BLACK_MS = Math.max(
        0,
        Number(
            params['Black Duration (ms)'] !== undefined
                ? params['Black Duration (ms)']
                : 1000
        )
    );

    var BLACK_FRAMES = Math.ceil(BLACK_MS * 60 / 1000);


    // ==================================================
    // СОХРАНЯЕМ ОРИГИНАЛЬНЫЕ МЕТОДЫ
    // ==================================================

    var _Scene_Battle_start =
        Scene_Battle.prototype.start;

    var _Scene_Battle_update =
        Scene_Battle.prototype.update;

    var _Scene_Battle_updateBattleProcess =
        Scene_Battle.prototype.updateBattleProcess;

    // MOG должен быть загружен до этого плагина.
    var _FBF_BattleManager_processVictory =
        BattleManager.processVictory;


    // ==================================================
    // ПЕРЕМЕЩЕНИЕ ЗАТЕМНЕНИЯ НА САМЫЙ ВЕРХ СЦЕНЫ
    // ==================================================

    Scene_Battle.prototype._fbfBringOverlayToFront = function() {
        var overlay = this._fbfOverlay;

        if (!overlay) {
            return;
        }

        if (overlay.parent !== this) {
            this.addChild(overlay);
            return;
        }

        var children = this.children;

        if (!children || children.length === 0) {
            return;
        }

        var lastIndex = children.length - 1;
        var currentIndex = children.indexOf(overlay);

        if (currentIndex !== lastIndex) {

            // PIXI.Container поддерживает setChildIndex.
            if (typeof this.setChildIndex === 'function') {
                this.setChildIndex(overlay, lastIndex);
            } else {
                // Резервный вариант.
                this.removeChild(overlay);
                this.addChild(overlay);
            }
        }
    };


    // ==================================================
    // СОЗДАНИЕ ЧЁРНОГО СЛОЯ
    // ==================================================

    Scene_Battle.prototype._fbfCreateOverlay = function() {
        if (this._fbfOverlay) {
            return;
        }

        var bitmap = new Bitmap(
            Graphics.width,
            Graphics.height
        );

        bitmap.fillAll('#000000');

        var sprite = new Sprite(bitmap);

        sprite.x = 0;
        sprite.y = 0;
        sprite.opacity = 255;
        sprite.visible = true;

        this._fbfOverlay = sprite;

        this.addChild(sprite);

        // Сразу помещаем поверх всех существующих окон.
        this._fbfBringOverlayToFront();
    };


    // ==================================================
    // МГНОВЕННОЕ ВКЛЮЧЕНИЕ ЗАТЕМНЕНИЯ
    // ==================================================

    Scene_Battle.prototype._fbfStartTransition = function() {
        if (!this._fbfStarted) {
            return;
        }

        this._fbfCreateOverlay();

        this._fbfOverlay.visible = true;
        this._fbfOverlay.opacity = 255;

        this._fbfPhase = 'black';
        this._fbfTimer = BLACK_FRAMES;

        // Повторно поднимаем слой на случай,
        // если между волнами появились новые окна.
        this._fbfBringOverlayToFront();
    };


    // ==================================================
    // ОТКЛЮЧЕНИЕ ШТАТНОГО ЗАТЕМНЕНИЯ RPG MAKER
    // ==================================================

    Scene_Battle.prototype._fbfClearNativeFade = function() {
        if (this._fadeSprite) {
            this._fadeSprite.opacity = 0;
            this._fadeSprite.visible = false;
        }

        this._fadeDuration = 0;
        this._fadeSign = 0;
    };


    // ==================================================
    // ПЕРВОНАЧАЛЬНЫЙ ЗАПУСК БОЯ
    // ==================================================

    Scene_Battle.prototype.start = function() {
        _Scene_Battle_start.call(this);

        if (this._fbfStarted) {
            return;
        }

        this._fbfStarted = true;

        this._fbfClearNativeFade();

        this._fbfStartTransition();
    };


    // ==================================================
    // БЛОКИРОВКА БОЕВОГО ПРОЦЕССА
    // ==================================================

    Scene_Battle.prototype.updateBattleProcess = function() {
        if (this._fbfPhase) {

            // Сохраняем обратный отсчёт MOG.
            if (
                $gameSystem &&
                $gameSystem._consBatime > 0
            ) {
                $gameSystem._consBatime--;
            }

            return;
        }

        _Scene_Battle_updateBattleProcess.call(this);
    };


    // ==================================================
    // ОБНОВЛЕНИЕ ЗАТЕМНЕНИЯ
    // ==================================================

    Scene_Battle.prototype.update = function() {

        // Сначала выполняются все остальные обновления сцены:
        // CTB, его клон, окна, HUD и остальные плагины.
        _Scene_Battle_update.call(this);

        if (!this._fbfStarted) {
            return;
        }

        // КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ:
        // после обновления всех окон снова поднимаем
        // затемнение на самый верх Scene_Battle.
        //
        // Благодаря этому CTB-полоска и динамический клон
        // не смогут оказаться поверх чёрного слоя.
        if (this._fbfOverlay) {
            this._fbfBringOverlayToFront();
        }

        if (!this._fbfPhase) {
            return;
        }


        // ----------------------------------------------
        // ЧЁРНЫЙ ЭКРАН
        // ----------------------------------------------

        if (this._fbfPhase === 'black') {

            if (this._fbfTimer > 0) {
                this._fbfTimer--;
            }

            if (this._fbfTimer <= 0) {
                this._fbfPhase = 'fadeIn';
                this._fbfTimer = FADE_FRAMES;
            }

            return;
        }


        // ----------------------------------------------
        // ПЛАВНОЕ ПРОЯВЛЕНИЕ
        // ----------------------------------------------

        if (this._fbfPhase === 'fadeIn') {

            if (this._fbfTimer > 0) {
                this._fbfTimer--;
            }

            var progress = this._fbfTimer / FADE_FRAMES;

            this._fbfOverlay.opacity = Math.max(
                0,
                Math.min(
                    255,
                    Math.round(255 * progress)
                )
            );

            if (this._fbfTimer <= 0) {

                this._fbfOverlay.opacity = 0;

                this.removeChild(this._fbfOverlay);

                // Bitmap.destroy() отсутствует
                // в некоторых версиях RPG Maker MV.
                this._fbfOverlay.bitmap = null;
                this._fbfOverlay = null;

                this._fbfPhase = null;
                this._fbfTimer = 0;
            }

            return;
        }
    };


    // ==================================================
    // MOG CONSECUTIVE BATTLES
    // ЗАТЕМНЕНИЕ ДО НАЧАЛА СЛЕДУЮЩЕЙ ВОЛНЫ
    // ==================================================

    if (typeof _FBF_BattleManager_processVictory === 'function') {

        BattleManager.processVictory = function() {

            var hasNextWave = (
                typeof this.isConsBattle === 'function' &&
                this.isConsBattle()
            );

            if (hasNextWave) {

                var scene = SceneManager._scene;

                // Затемнение запускается до оригинального
                // processVictory MOG.
                if (
                    scene instanceof Scene_Battle &&
                    scene._fbfStarted
                ) {
                    scene._fbfStartTransition();
                }
            }

            return _FBF_BattleManager_processVictory.call(this);
        };
    }

})();

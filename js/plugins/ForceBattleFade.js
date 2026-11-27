/*:
 * @plugindesc v7.1 Объединённый: запрет разворота спрайтов в бою + затемнение боя/волн MOG CTB.
 * @author Custom (merger)
 *
 * @param Actor Scale X
 * @text Actor Scale X
 * @type select
 * @option 1 — как нарисовано в листе
 * @value 1
 * @option -1 — отразить горизонтально
 * @value -1
 * @default -1
 * @desc Ориентация спрайтов актёров.
 *
 * @param Enemy Scale X
 * @text Enemy Scale X
 * @type select
 * @option 1 — как нарисовано в листе
 * @value 1
 * @option -1 — отразить горизонтально
 * @value -1
 * @default 1
 * @desc Ориентация спрайтов врагов.
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
 * ОБЪЕДИНЁННЫЙ ПЛАГИН: NoBattleFlip v1.1 + ForceBattleFade v6.3
 *
 * Можно называть файл ЛЮБЫМ именем:
 *   NoBattleFlip_ForceBattleFade.js  (рекомендуется)
 *   NoBattleFlip.js                  (подхватит старые настройки)
 *   ForceBattleFade.js               (подхватит старые настройки)
 *   любое_другое.js                  (использует @param-дефолты)
 *
 * Параметры читаются в таком порядке приоритета:
 *   1. Собственная запись этого файла в Plugin Manager.
 *   2. Старая запись NoBattleFlip_ForceBattleFade (если осталась).
 *   3. Старая запись NoBattleFlip (если осталась).
 *   4. Старая запись ForceBattleFade (если осталась).
 *   5. @param-дефолт (-1 / 1 / 60 / 5000).
 *
 * Если в старой ForceBattleFade вы меняли Fade Frames / Black Duration —
 * проверьте значения в Plugin Manager у объединённого плагина и
 * при необходимости поправьте руками.
 *
 * Не включайте одновременно старые отдельные NoBattleFlip / ForceBattleFade.
 *
 * ============================================================
 * NoBattleFlip
 * ============================================================
 * Родительский спрайт держится в scale.x = 1 (без двойного отражения),
 * дочерние (main/weapon/state) выставляются по параметрам.
 *
 * ============================================================
 * ForceBattleFade
 * ============================================================
 * 1. Первая битва — экран мгновенно чёрный.
 * 2. Каждая следующая волна — затемнение из BattleManager.processVictory.
 * 3. Новые враги создаются под чёрным слоем.
 * 4. После задержки — плавное проявление.
 * 5. Чёрный слой всегда выше всех окон (CTB, HUD, клоны).
 *
 * Размещать ниже: YEP_CoreEngine, YEP_BattleEngineCore,
 * MOG_BattleHud, BattleZoom, MOG_ConsecutiveBattles,
 * CTB-плагинов и любых плагинов, создающих окна в Scene_Battle.
 */

(function() {
    'use strict';

    // ==================================================================
    // Определение имени текущего файла плагина
    // ==================================================================
    var ownName = null;
    try {
        if (document.currentScript && document.currentScript.src) {
            var src = document.currentScript.src.split('?')[0];
            ownName = src.substring(src.lastIndexOf('/') + 1).replace(/\.js$/i, '');
        }
    } catch (e) {}

    // ==================================================================
    // Чтение параметра с приоритетом источников
    // ==================================================================
    function readParam(key, defaultValue) {
        var sources = [
            ownName ? PluginManager.parameters(ownName) : null,
            PluginManager.parameters('NoBattleFlip_ForceBattleFade'),
            PluginManager.parameters('NoBattleFlip'),
            PluginManager.parameters('ForceBattleFade')
        ];
        for (var i = 0; i < sources.length; i++) {
            var s = sources[i];
            if (s && s[key] !== undefined && s[key] !== '') {
                return s[key];
            }
        }
        return defaultValue;
    }

    // ==================================================================
    // ЧАСТЬ 1: NoBattleFlip — запрет разворота спрайтов
    // ==================================================================

    var ACTOR_SCALE_X = Number(readParam('Actor Scale X', -1));
    var ENEMY_SCALE_X = Number(readParam('Enemy Scale X', 1));

    function forceScale(sprite, target) {
        if (!sprite || !sprite.scale) return;

        if (sprite._mainSprite && sprite._mainSprite.scale) {
            // Родитель всегда в 1 — защита от двойного отражения
            if (sprite.scale.x !== 1) sprite.scale.x = 1;

            if (sprite._mainSprite.scale.x !== target) {
                sprite._mainSprite.scale.x = target;
            }
            if (sprite._weaponSprite && sprite._weaponSprite.scale &&
                sprite._weaponSprite.scale.x !== target) {
                sprite._weaponSprite.scale.x = target;
            }
            if (sprite._stateSprite && sprite._stateSprite.scale &&
                sprite._stateSprite.scale.x !== target) {
                sprite._stateSprite.scale.x = target;
            }
        } else {
            if (sprite.scale.x !== target) sprite.scale.x = target;
        }
    }

    var _Sprite_Actor_update = Sprite_Actor.prototype.update;
    Sprite_Actor.prototype.update = function() {
        _Sprite_Actor_update.call(this);
        forceScale(this, ACTOR_SCALE_X);
    };

    var _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
    Sprite_Enemy.prototype.update = function() {
        _Sprite_Enemy_update.call(this);
        forceScale(this, ENEMY_SCALE_X);
    };

    // ==================================================================
    // ЧАСТЬ 2: ForceBattleFade — затемнение боя
    // ==================================================================

    var FADE_FRAMES = Math.max(1, Number(readParam('Fade Frames', 60)));
    var BLACK_MS = Math.max(0, Number(readParam('Black Duration (ms)', 5000)));
    var BLACK_FRAMES = Math.ceil(BLACK_MS * 60 / 1000);

    // --- Сохраняем оригинальные методы ---
    var _Scene_Battle_start               = Scene_Battle.prototype.start;
    var _Scene_Battle_update              = Scene_Battle.prototype.update;
    var _Scene_Battle_updateBattleProcess = Scene_Battle.prototype.updateBattleProcess;
    var _FBF_BattleManager_processVictory = BattleManager.processVictory;

    // --- Перемещение затемнения на самый верх сцены ---
    Scene_Battle.prototype._fbfBringOverlayToFront = function() {
        var overlay = this._fbfOverlay;
        if (!overlay) return;

        if (overlay.parent !== this) {
            this.addChild(overlay);
            return;
        }

        var children = this.children;
        if (!children || children.length === 0) return;

        var lastIndex = children.length - 1;

        // Fast-path: уже сверху — ничего не делаем
        if (children[lastIndex] === overlay) return;

        if (typeof this.setChildIndex === 'function') {
            this.setChildIndex(overlay, lastIndex);
        } else {
            this.removeChild(overlay);
            this.addChild(overlay);
        }
    };

    // --- Создание чёрного слоя ---
    Scene_Battle.prototype._fbfCreateOverlay = function() {
        if (this._fbfOverlay) return;

        var bitmap = new Bitmap(Graphics.width, Graphics.height);
        bitmap.fillAll('#000000');

        var sprite = new Sprite(bitmap);
        sprite.x = 0;
        sprite.y = 0;
        sprite.opacity = 255;
        sprite.visible = true;

        this._fbfOverlay = sprite;
        this.addChild(sprite);
        this._fbfBringOverlayToFront();
    };

    // --- Мгновенное включение затемнения ---
    Scene_Battle.prototype._fbfStartTransition = function() {
        if (!this._fbfStarted) return;

        this._fbfCreateOverlay();

        this._fbfOverlay.visible = true;
        this._fbfOverlay.opacity = 255;

        this._fbfPhase = 'black';
        this._fbfTimer = BLACK_FRAMES;

        this._fbfBringOverlayToFront();
    };

    // --- Отключение штатного затемнения MV ---
    Scene_Battle.prototype._fbfClearNativeFade = function() {
        if (this._fadeSprite) {
            this._fadeSprite.opacity = 0;
            this._fadeSprite.visible = false;
        }
        this._fadeDuration = 0;
        this._fadeSign = 0;
    };

    // --- Старт боя ---
    Scene_Battle.prototype.start = function() {
        _Scene_Battle_start.call(this);
        if (this._fbfStarted) return;

        this._fbfStarted = true;
        this._fbfClearNativeFade();
        this._fbfStartTransition();
    };

    // --- Блокировка боевого процесса под чёрным экраном ---
    Scene_Battle.prototype.updateBattleProcess = function() {
        if (this._fbfPhase) {
            // Сохраняем обратный отсчёт MOG Consecutive Battles
            if ($gameSystem && $gameSystem._consBatime > 0) {
                $gameSystem._consBatime--;
            }
            return;
        }
        _Scene_Battle_updateBattleProcess.call(this);
    };

    // --- Обновление затемнения ---
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);

        if (!this._fbfStarted) return;

        // Возвращаем слой наверх после обновлений всех окон
        if (this._fbfOverlay) {
            this._fbfBringOverlayToFront();
        }

        if (!this._fbfPhase) return;

        // --- Чёрный экран ---
        if (this._fbfPhase === 'black') {
            if (--this._fbfTimer <= 0) {
                this._fbfPhase = 'fadeIn';
                this._fbfTimer = FADE_FRAMES;
            }
            return;
        }

        // --- Плавное проявление ---
        if (this._fbfPhase === 'fadeIn') {
            this._fbfTimer--;

            var progress = this._fbfTimer / FADE_FRAMES;
            this._fbfOverlay.opacity = Math.max(
                0,
                Math.min(255, Math.round(255 * progress))
            );

            if (this._fbfTimer <= 0) {
                this.removeChild(this._fbfOverlay);
                this._fbfOverlay.bitmap = null;
                this._fbfOverlay = null;
                this._fbfPhase = null;
                this._fbfTimer = 0;
            }
        }
    };

    // --- MOG Consecutive Battles: затемнение перед следующей волной ---
    if (typeof _FBF_BattleManager_processVictory === 'function') {
        BattleManager.processVictory = function() {
            if (typeof this.isConsBattle === 'function' && this.isConsBattle()) {
                var scene = SceneManager._scene;
                if (scene instanceof Scene_Battle && scene._fbfStarted) {
                    scene._fbfStartTransition();
                }
            }
            return _FBF_BattleManager_processVictory.call(this);
        };
    }

})();
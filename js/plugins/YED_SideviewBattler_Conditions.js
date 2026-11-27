/*:
 * @plugindesc (v1.0.2) Addon for YED_SideviewBattler - State Condition Overrides (no sprite shift, no flicker).
 * @author YED + Mod
 * @requires YED_SideviewBattler
 *
 * @help
 * ============================================================================
 * YED Sideview Battler - State Condition Override Addon
 * ============================================================================
 *
 * Полностью повторяет функционал v1.3.0 (условные суффиксы |a:ID|e:ID|s:ID),
 * но НЕ СДВИГАЕТ спрайт персонажа при изменении размера кадра в состоянии.
 * Размер кадра используется только для нарезки спрайта, а позиционирование
 * всегда рассчитывается по базовому размеру из нотетегов актёра/врага.
 *
 * Дополнительно включает фиксы из A_fix_sv_actors:
 *  - battlerName для актёров/врагов всегда возвращает базовый файл;
 *  - refresh() автоматически подменяет bitmap спрайта при смене состояния
 *    с сохранением текущей анимации;
 *  - предзагрузка всех спрайтов при загрузке БД;
 *  - защита от повторного loadBitmaps во время подмены.
 *
 * Порядок загрузки:
 * 1. YED_SideviewBattler (v1.2.1 или v1.3.0)
 * 2. YEP_X_AnimatedSVEnemies (если используется)
 * 3. Этот аддон
 * ============================================================================
 */

var YED = YED || {};
YED.SideviewBattler = YED.SideviewBattler || {};
var Imported = Imported || {};

(function() {
    if (!Imported.YED_SideviewBattler || !YED.SideviewBattler.Utils) {
        console.error('[YED_SVB_StateCond] YED_SideviewBattler is required and must be loaded above this addon.');
        return;
    }

    var Regexp = YED.SideviewBattler.Regexp;
    var Utils = YED.SideviewBattler.Utils;

    // ==================================================================
    // 1. РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ С УСЛОВИЯМИ (из v1.3.0)
    // ==================================================================
    Regexp.STATE_FILENAME = /<Sideview Battler State:[ ]*([^|>]*)(?:\|([^>]*))?>/i;
    Regexp.STATE_FRAMES = /<Sideview Battler State Frames:[ ]*(\d+)(?:\|([^>]*))?>/i;
    Regexp.STATE_SPEED = /<Sideview Battler State Speed:[ ]*(\d+)(?:\|([^>]*))?>/i;
    Regexp.STATE_SIZES = /<Sideview Battler State Size:[ ]*(\d+),[ ]*(\d+)(?:\|([^>]*))?>/i;
    Regexp.STATE_WEAPON = /<Sideview Battler State Weapon:[ ]*(true|false)(?:\|([^>]*))?>/i;
    Regexp.STATE_MOTION_QUICK = /<Sideview Battler State Motion:[ ]*([^,]+?),\s*(\d+)(?:\|([^>]*))?>/i;
    Regexp.STATE_MOTION_CONDITION = /Condition:[ ]*(.*)/i;

    // ==================================================================
    // 2. УТИЛИТЫ УСЛОВИЙ
    // ==================================================================
    Utils.parseStateCondition = function(str) {
        var cond = { targetType: null, targetId: null, stateId: null };
        if (!str) return cond;
        var parts = String(str).split('|');
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i].trim();
            if (!part) continue;
            var m;
            if ((m = part.match(/^a\s*:\s*(\d+)$/i))) {
                cond.targetType = 'actor';
                cond.targetId = Number(m[1]);
            } else if ((m = part.match(/^e\s*:\s*(\d+)$/i))) {
                cond.targetType = 'enemy';
                cond.targetId = Number(m[1]);
            } else if ((m = part.match(/^s\s*:\s*(\d+)$/i))) {
                cond.stateId = Number(m[1]);
            }
        }
        return cond;
    };

    Utils.stateConditionsEqual = function(a, b) {
        if (!a || !b) return false;
        return a.targetType === b.targetType &&
               a.targetId   === b.targetId   &&
               a.stateId    === b.stateId;
    };

    Utils.getOrCreateOverrideEntry = function(state, cond) {
        var overrides = state._sideviewBattlerOverrides;
        for (var i = 0; i < overrides.length; i++) {
            if (Utils.stateConditionsEqual(overrides[i].condition, cond)) {
                return overrides[i];
            }
        }
        var entry = {
            condition: cond,
            filename: null,
            frames: null,
            speed: null,
            weapon: null,
            sizes: null,
            motions: {}
        };
        overrides.push(entry);
        return entry;
    };

    // ==================================================================
    // 3. ОБРАБОТКА НОТЕТЕГОВ
    // ==================================================================
    Utils.processNotetags = function() {
        var groups = [$dataActors, $dataEnemies],
            group, obj,
            notedata, line,
            helpers = {};

        for (var j = 0; j < groups.length; j++) {
            group = groups[j];
            for (var i = 1; i < group.length; i++) {
                obj = group[i];
                notedata = obj.note.split(/[\r\n]+/);

                Utils._processProperties.call(this, obj);
                Utils._processMethods.call(this, obj);

                for (var n = 0; n < notedata.length; n++) {
                    line = notedata[n];
                    Utils._processNotetag.call(this, obj, line, helpers);
                }
            }
        }

        // Process states
        if ($dataStates) {
            for (var i = 1; i < $dataStates.length; i++) {
                var state = $dataStates[i];
                if (!state) continue;
                var notedata = state.note.split(/[\r\n]+/);
                var helpers = {};

                state._sideviewBattlerOverrides = [];

                for (var n = 0; n < notedata.length; n++) {
                    var line = notedata[n];
                    Utils._processStateNotetag.call(this, state, line, helpers);
                }
            }
        }
    };

    Utils._processStateNotetag = function(state, notetag, helpers) {
        var match, cond, entry, motion;

        match = notetag.match(Regexp.STATE_FILENAME);
        if (match) {
            cond = Utils.parseStateCondition(match[2]);
            entry = Utils.getOrCreateOverrideEntry(state, cond);
            entry.filename = String(match[1]).trim();
        }

        match = notetag.match(Regexp.STATE_FRAMES);
        if (match) {
            cond = Utils.parseStateCondition(match[2]);
            entry = Utils.getOrCreateOverrideEntry(state, cond);
            entry.frames = Number(match[1]);
        }

        match = notetag.match(Regexp.STATE_SPEED);
        if (match) {
            cond = Utils.parseStateCondition(match[2]);
            entry = Utils.getOrCreateOverrideEntry(state, cond);
            entry.speed = Number(match[1]);
        }

        match = notetag.match(Regexp.STATE_SIZES);
        if (match) {
            cond = Utils.parseStateCondition(match[3]);
            entry = Utils.getOrCreateOverrideEntry(state, cond);
            entry.sizes = [Number(match[1]), Number(match[2])];
        }

        match = notetag.match(Regexp.STATE_WEAPON);
        if (match) {
            cond = Utils.parseStateCondition(match[2]);
            entry = Utils.getOrCreateOverrideEntry(state, cond);
            entry.weapon = eval(match[1].toLowerCase());
        }

        match = notetag.match(Regexp.STATE_MOTION_QUICK);
        if (match) {
            cond = Utils.parseStateCondition(match[3]);
            entry = Utils.getOrCreateOverrideEntry(state, cond);
            motion = {};
            motion.name = match[1].trim().toLowerCase();
            motion.index = Number(match[2]);
            entry.motions[motion.name] = motion;
        }

        match = notetag.match(Regexp.STATE_MOTION_BEGIN);
        if (match) {
            helpers.motionFlag = true;
            helpers.motion = {};
            helpers.motionCondition = null;
            return;
        }

        match = notetag.match(Regexp.STATE_MOTION_END);
        if (match) {
            motion = helpers.motion;
            var cond = helpers.motionCondition || Utils.parseStateCondition(null);
            helpers.motionFlag = false;
            helpers.motionCondition = null;
            entry = Utils.getOrCreateOverrideEntry(state, cond);
            if (motion.name) entry.motions[motion.name] = motion;
            return;
        }

        if (helpers.motionFlag) {
            motion = helpers.motion;

            match = notetag.match(Regexp.STATE_MOTION_NAME);
            if (match) {
                motion.name = match[1].toLowerCase();
            }

            match = notetag.match(Regexp.STATE_MOTION_INDEX);
            if (match) {
                motion.index = Number(match[1]);
            }

            match = notetag.match(Regexp.STATE_MOTION_CONDITION);
            if (match) {
                helpers.motionCondition = Utils.parseStateCondition(match[1]);
            }

            match = notetag.match(Regexp.STATE_MOTION_LOOP);
            if (match) {
                motion.loop = true;
            }

            match = notetag.match(Regexp.STATE_MOTION_FRAMES);
            if (match) {
                motion.frames = Number(match[1]);
            }

            match = notetag.match(Regexp.STATE_MOTION_SPEED);
            if (match) {
                motion.speed = Number(match[1]);
            }
        }
    };

    // ==================================================================
    // 4. ЛОГИКА СОСТОЯНИЙ
    // ==================================================================
    Game_Battler.prototype.matchesStateOverrideCondition = function(cond) {
        if (!cond) return true;

        var battlerType = null;
        var battlerId   = 0;
        if (this.isActor()) {
            battlerType = 'actor';
            battlerId   = this.actorId();
        } else if (this.isEnemy()) {
            battlerType = 'enemy';
            battlerId   = this.enemyId();
        }

        if (cond.targetType === 'actor') {
            if (battlerType !== 'actor' || battlerId !== cond.targetId) return false;
        } else if (cond.targetType === 'enemy') {
            if (battlerType !== 'enemy' || battlerId !== cond.targetId) return false;
        }

        if (cond.stateId !== null) {
            if (!this.isStateAffected(cond.stateId)) return false;
        }

        return true;
    };

    Game_Battler.prototype.getActiveStateOverride = function() {
        var states = this.states();
        var merged = null;
        var seen = {};

        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            if (!state) continue;
            if (seen[state.id]) continue;
            seen[state.id] = true;

            if (!state._sideviewBattlerOverrides) continue;

            for (var j = 0; j < state._sideviewBattlerOverrides.length; j++) {
                var o = state._sideviewBattlerOverrides[j];

                if (!this.matchesStateOverrideCondition(o.condition)) continue;

                var hasAny = o.filename !== null || o.frames !== null ||
                             o.speed !== null || o.weapon !== null ||
                             o.sizes !== null ||
                             (o.motions && Object.keys(o.motions).length > 0);
                if (!hasAny) continue;

                if (!merged) {
                    merged = {
                        filename: null,
                        frames: null,
                        speed: null,
                        weapon: null,
                        sizes: null,
                        motions: {}
                    };
                }

                if (o.filename !== null) merged.filename = o.filename;
                if (o.frames   !== null) merged.frames   = o.frames;
                if (o.speed    !== null) merged.speed    = o.speed;
                if (o.weapon   !== null) merged.weapon   = o.weapon;
                if (o.sizes    !== null) merged.sizes    = o.sizes;

                if (o.motions) {
                    for (var key in o.motions) {
                        if (o.motions.hasOwnProperty(key)) {
                            merged.motions[key] = o.motions[key];
                        }
                    }
                }
            }
        }
        return merged;
    };

    // ==================================================================
    // 5. РАЗДЕЛЕНИЕ РАЗМЕРА ДЛЯ НАРЕЗКИ И ПОЗИЦИОНИРОВАНИЯ
    // ==================================================================

    // 5.1. getSideviewSizes теперь ВСЕГДА возвращает базовый размер
    //      (используется движком для позиционирования спрайта).
    var _Game_Battler_getSideviewSizes = Game_Battler.prototype.getSideviewSizes;
    Game_Battler.prototype.getSideviewSizes = function() {
        if (!this.isSideviewBattler()) return null;
        return this.getSideviewBattler().sizes;
    };

    // 5.2. Новый метод для получения размера кадра с учётом состояния.
    //      Используется только для нарезки спрайта (setFrame).
    Game_Battler.prototype.getSideviewFrameSizes = function() {
        var override = this.getActiveStateOverride();
        if (override && override.sizes !== null) return override.sizes;

        if (!this.isSideviewBattler()) return null;
        return this.getSideviewBattler().sizes;
    };

    // ==================================================================
    // 5.3. frameSizes в спрайтах — нарезка с учётом готовности битмапа
    // ==================================================================

    // Возвращает безопасный размер кадра: если битмап ещё не загрузился
    // (ширина 0) или меньше одного кадра нового размера — откатываемся
    // на базовый размер, чтобы движок не нарезал старую картинку "новой"
    // сеткой и не показывал её целиком.
    function safeFrameSizes(battler, currentBitmap) {
        var sizes = battler.getSideviewFrameSizes();
        if (!sizes) return sizes;

        var bmp = currentBitmap;
        if (bmp && bmp.width > 0 && bmp.width < sizes[0]) {
            return battler.getSideviewSizes();
        }
        return sizes;
    }

    Sprite_Actor.prototype.frameSizes = function() {
        var bmp = (this._mainSprite && this._mainSprite.bitmap) || this.bitmap;
        return safeFrameSizes(this._actor, bmp);
    };

    Sprite_Enemy.prototype.frameSizes = function() {
        var bmp = (this._mainSprite && this._mainSprite.bitmap) || this.bitmap;
        return safeFrameSizes(this._enemy, bmp);
    };

    // ==================================================================
    // 6. ФИКСЫ ИЗ A_fix_sv_actors
    // ==================================================================

    // 6.1. battlerName для актёров/врагов — всегда базовый файл.
    //      Состояние применяется отдельно через refresh() + getStateOverrideFilename.
    var _Game_Actor_battlerName = Game_Actor.prototype.battlerName;
    Game_Actor.prototype.battlerName = function() {
        if (this.isSideviewBattler()) {
            return this.getSideviewBattler().filename;
        }
        return _Game_Actor_battlerName.call(this);
    };

    var _Game_Enemy_battlerName = Game_Enemy.prototype.battlerName;
    Game_Enemy.prototype.battlerName = function() {
        if (this.isSideviewBattler()) {
            return this.getSideviewBattler().filename;
        }
        return _Game_Enemy_battlerName.call(this);
    };

    // 6.2. Получение имени из состояния (для ручной замены в refresh).
    Game_Battler.prototype.getStateOverrideFilename = function() {
        var override = this.getActiveStateOverride();
        if (override && override.filename !== null) return override.filename;
        return null;
    };

    // 6.3. Поиск спрайта бойца в текущем сценовом Spriteset.
    function getSprite(battler) {
        var scene = SceneManager._scene;
        if (!scene || !scene._spriteset) return null;
        var spriteset = scene._spriteset;
        if (battler.isActor()) {
            return spriteset._actorSprites
                ? spriteset._actorSprites.find(function(s) { return s._actor === battler; })
                : null;
        }
        return spriteset._enemySprites
            ? spriteset._enemySprites.find(function(s) { return s._enemy === battler; })
            : null;
    }

    // 6.4. Применение bitmap с сохранением анимации и защитой от loadBitmaps.
    function applyBitmapToSprite(sprite, bitmap) {
        if (!sprite) return;
        sprite._skipLoadBitmaps = true;

        var motion  = sprite._motionName;
        var pattern = sprite._pattern;
        var count   = sprite._motionCount;

        if (sprite._mainSprite) {
            sprite._mainSprite.bitmap = bitmap;
        } else if (sprite.bitmap) {
            sprite.bitmap = bitmap;
        }

        if (motion) {
            sprite.startMotion(motion);
            sprite._pattern = pattern;
            sprite._motionCount = count;
        }
        if (sprite.updateFrame) sprite.updateFrame();

        sprite._skipLoadBitmaps = false;
    }

    // 6.5. Предзагрузка всех возможных спрайтов (сбор из БД).
    function preloadAll() {
        var set = new Set();
        var i, a, e, s;

        for (i = 1; i < $dataActors.length; i++) {
            a = $dataActors[i];
            if (a && a._sideviewBattler && a._sideviewBattler.filename) {
                set.add(a._sideviewBattler.filename);
            }
        }
        for (i = 1; i < $dataEnemies.length; i++) {
            e = $dataEnemies[i];
            if (e && e._sideviewBattler && e._sideviewBattler.filename) {
                set.add(e._sideviewBattler.filename);
            }
        }
        for (i = 1; i < $dataStates.length; i++) {
            s = $dataStates[i];
            if (s && s._sideviewBattlerOverride && s._sideviewBattlerOverride.filename) {
                set.add(s._sideviewBattlerOverride.filename);
            }
        }

        set.forEach(function(f) {
            // loadSvActor сам ставит в очередь загрузки — пустой listener не нужен.
            ImageManager.loadSvActor(f);
        });
    }

    // 6.6. Реакция на смену состояния: подмена bitmap у спрайта.
    var _Game_Battler_refresh = Game_Battler.prototype.refresh;
    Game_Battler.prototype.refresh = function() {
        _Game_Battler_refresh.call(this);

        var newFilename = this.getStateOverrideFilename();
        if (newFilename === this._lastAppliedStateFilename) return;

        this._lastAppliedStateFilename = newFilename;

        var sprite = getSprite(this);
        if (!sprite) return;

        if (newFilename) {
            var bmp = ImageManager.loadSvActor(newFilename);
            if (bmp.isReady()) {
                applyBitmapToSprite(sprite, bmp);
            } else {
                // старый bitmap остаётся до готовности нового
                var self = this;
                bmp.addLoadListener(function() {
                    var currentSprite = getSprite(self);
                    if (currentSprite) applyBitmapToSprite(currentSprite, bmp);
                });
            }
        } else {
            // возвращаем базовый спрайт
            var baseName = this.isSideviewBattler()
                ? this.getSideviewBattler().filename
                : null;
            if (baseName) {
                applyBitmapToSprite(sprite, ImageManager.loadSvActor(baseName));
            }
        }
    };

    var _Game_Battler_initialize = Game_Battler.prototype.initialize;
    Game_Battler.prototype.initialize = function() {
        _Game_Battler_initialize.call(this);
        this._lastAppliedStateFilename = null;
    };

    // 6.7. Блокируем loadBitmaps на время подмены bitmap.
    var _Sprite_Actor_loadBitmaps = Sprite_Actor.prototype.loadBitmaps;
    Sprite_Actor.prototype.loadBitmaps = function() {
        if (this._skipLoadBitmaps) return;
        _Sprite_Actor_loadBitmaps.call(this);
    };

    var _Sprite_Enemy_loadBitmaps = Sprite_Enemy.prototype.loadBitmaps;
    Sprite_Enemy.prototype.loadBitmaps = function() {
        if (this._skipLoadBitmaps) return;
        _Sprite_Enemy_loadBitmaps.call(this);
    };

    // 6.8. Инициализация флага _skipLoadBitmaps на спрайтах.
    var _Sprite_Actor_initMembers = Sprite_Actor.prototype.initMembers;
    Sprite_Actor.prototype.initMembers = function() {
        _Sprite_Actor_initMembers.call(this);
        this._skipLoadBitmaps = false;
    };

    var _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
    Sprite_Enemy.prototype.initMembers = function() {
        _Sprite_Enemy_initMembers.call(this);
        this._skipLoadBitmaps = false;
    };

    // 6.9. Предзагрузка после загрузки БД.
    var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        var loaded = _DataManager_isDatabaseLoaded.call(this);
        if (loaded && !this._preloadedSideview) {
            this._preloadedSideview = true;
            preloadAll();
        }
        return loaded;
    };

    // 6.10. Первичное применение состояния после создания спрайтов.
    var _Spriteset_Battle_createActors = Spriteset_Battle.prototype.createActors;
    Spriteset_Battle.prototype.createActors = function() {
        _Spriteset_Battle_createActors.call(this);
        $gameParty.members().forEach(function(a) { a.refresh(); });
    };

    var _Spriteset_Battle_createEnemies = Spriteset_Battle.prototype.createEnemies;
    Spriteset_Battle.prototype.createEnemies = function() {
        _Spriteset_Battle_createEnemies.call(this);
        $gameTroop.members().forEach(function(e) { e.refresh(); });
    };

    // ==================================================================
    // 7. Интеграция с Yanfly AnimatedSVEnemies
    // ==================================================================
    if (Imported.YEP_X_AnimatedSVEnemies) {
        // 7.1. Считаем врага SV-врагом, если YED нашёл спрайт.
        var _Game_Enemy_isSVEnemy = Game_Enemy.prototype.isSVEnemy;
        Game_Enemy.prototype.isSVEnemy = function() {
            if (this.isSideviewBattler()) return true;
            return _Game_Enemy_isSVEnemy.call(this);
        };

        // 7.2. Подменяем имя файла, которое Yanfly берёт из метаданных.
        if (Game_Enemy.prototype.svBattlerName) {
            var _Game_Enemy_svBattlerName = Game_Enemy.prototype.svBattlerName;
            Game_Enemy.prototype.svBattlerName = function() {
                if (this.isSideviewBattler()) return this.getSideviewFilename();
                return _Game_Enemy_svBattlerName.call(this);
            };
        }

        // 7.3. Синхронизация битмапа + защита от флипа при смене спрайта.
        var _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
        Sprite_Enemy.prototype.updateBitmap = function() {
            var prevSX  = this.scale.x;
            var prevSY  = this.scale.y;
            var prevMSX = this._mainSprite ? this._mainSprite.scale.x : 1;
            var prevMSY = this._mainSprite ? this._mainSprite.scale.y : 1;

            _Sprite_Enemy_updateBitmap.call(this);

            if (this._enemy && this._enemy.isSVEnemy() && this._mainSprite) {
                var name = this._enemy.getSideviewFilename();
                if (name) {
                    this._mainSprite.bitmap = ImageManager.loadSvActor(name);
                    this._frameSizesFilename = name;
                }
            }

            // Yanfly / движок могли сбросить scale на MV-дефолт (-1) —
            // возвращаем то, что было до смены битмапа.
            this.scale.x = prevSX;
            this.scale.y = prevSY;
            if (this._mainSprite) {
                this._mainSprite.scale.x = prevMSX;
                this._mainSprite.scale.y = prevMSY;
            }
        };

        // 7.4. Страховка на каждом кадре: YED-спрайты не отражаем.
        var _Sprite_Enemy_updatePosition = Sprite_Enemy.prototype.updatePosition;
        Sprite_Enemy.prototype.updatePosition = function() {
            _Sprite_Enemy_updatePosition.call(this);
            if (this._enemy && this._enemy.isSideviewBattler && this._enemy.isSideviewBattler()) {
                // Спрайты в файле уже смотрят в нужную сторону — флип не нужен.
                this.scale.x = 1;
            }
        };
    }

})();
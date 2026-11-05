/*:
 * @plugindesc (v1.0.1) Addon for YED_SideviewBattler - State Condition Overrides (no sprite shift).
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
    // 2. УТИЛИТЫ УСЛОВИЙ (из v1.3.0)
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
    // 3. ОБРАБОТКА НОТЕТЕГОВ (из v1.3.0)
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
    // 4. ЛОГИКА СОСТОЯНИЙ (из v1.3.0)
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

    // 5.3. frameSizes в спрайтах теперь используют getSideviewFrameSizes.
    var _Sprite_Actor_frameSizes = Sprite_Actor.prototype.frameSizes;
    Sprite_Actor.prototype.frameSizes = function() {
        return this._actor.getSideviewFrameSizes();
    };

    var _Sprite_Enemy_frameSizes = Sprite_Enemy.prototype.frameSizes;
    Sprite_Enemy.prototype.frameSizes = function() {
        return this._enemy.getSideviewFrameSizes();
    };
	
    // ==================================================================
    // 7. Интеграция с Yanfly AnimatedSVEnemies
    // ==================================================================
    if (Imported.YEP_X_AnimatedSVEnemies) {
        // 7.1. Заставляем Yanfly считать врага SV-врагом, если YED нашел спрайт
        var _Game_Enemy_isSVEnemy = Game_Enemy.prototype.isSVEnemy;
        Game_Enemy.prototype.isSVEnemy = function() {
            if (this.isSideviewBattler()) return true;
            return _Game_Enemy_isSVEnemy.call(this);
        };

        // 7.2. Подменяем имя файла, которое Yanfly берет из метаданных
        if (Game_Enemy.prototype.svBattlerName) {
            var _Game_Enemy_svBattlerName = Game_Enemy.prototype.svBattlerName;
            Game_Enemy.prototype.svBattlerName = function() {
                if (this.isSideviewBattler()) return this.getSideviewFilename();
                return _Game_Enemy_svBattlerName.call(this);
            };
        }

        // 7.3. Страховка: если Yanfly по какой-то причине пропустил смену,
        // принудительно синхронизируем битмап (без сдвига позиционирования)
        var _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
        Sprite_Enemy.prototype.updateBitmap = function() {
            _Sprite_Enemy_updateBitmap.call(this);

            if (this._enemy && this._enemy.isSVEnemy() && this._mainSprite) {
                var targetName = this._enemy.getSideviewFilename();
                if (targetName) {
                    var targetBitmap = ImageManager.loadSvActor(targetName);
                    if (this._mainSprite.bitmap !== targetBitmap) {
                        this._mainSprite.bitmap = targetBitmap;
                    }
                }
            }
        };
    }

})();
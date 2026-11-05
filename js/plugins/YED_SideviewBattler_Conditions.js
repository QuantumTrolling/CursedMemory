/*:
 * @plugindesc (v1.0.0) Addon for YED_SideviewBattler - conditional state overrides.
 * @author State Condition Override Addon
 * @requires YED_SideviewBattler
 *
 * @help
 * ============================================================================
 * YED Sideview Battler - State Condition Override Addon
 * ============================================================================
 *
 * Расширяет YED_SideviewBattler (v1.2.1) условными оверрайдами в состояниях
 * (эквивалент v1.3.0). Старые нотетеги БЕЗ условий продолжают работать
 * без изменений — они попадают в запись с пустым условием, которая
 * матчится всегда (поведение v1.2.1 сохранено).
 *
 * ----------------------------------------------------------------------------
 * ПОРЯДОК ЗАГРУЗКИ
 * ----------------------------------------------------------------------------
 *
 * 1. YED_SideviewBattler          <- БАЗА (v1.2.1)
 * 2. YEP_BattleEngineCore         <- опционально
 * 3. YEP_X_AnimatedSVEnemies      <- опционально
 * 4. YED_SideviewBattler_StateConditionOverride  <- ЭТОТ АДДОН
 *
 * Без Yanfly-врагов аддон можно ставить прямо под базой.
 *
 * ВАЖНО: если используется YEP_X_AnimatedSVEnemies, аддон ОБЯЗАТЕЛЬНО
 * должен грузиться ПОСЛЕ него, иначе оверрайд спрайта врага в состоянии
 * не будет переключать битмап (Yanfly читает имя файла из метаданных БД,
 * а не через getSideviewFilename).
 *
 * ----------------------------------------------------------------------------
 * СИНТАКСИС УСЛОВИЙ
 * ----------------------------------------------------------------------------
 *
 *   <TAG: VALUE|CONDITION>
 *
 * CONDITION — список через '|', элементы:
 *   a:ID   — только если текущий баттлер — актёр с ID
 *   e:ID   — только если текущий баттлер — враг с ID
 *   s:ID   — только если на баттлере висит состояние с ID
 *
 * Примеры: |a:1   |e:3|s:5   |s:306
 *
 * Несколько тегов внутри одного состояния с ОДИНАКОВЫМ условием
 * объединяются в одну запись. С РАЗНЫМИ — независимые записи.
 *
 * ----------------------------------------------------------------------------
 * ДОСТУПНЫЕ STATE-ТЕГИ
 * ----------------------------------------------------------------------------
 *
 *   <Sideview Battler State: FILENAME|COND>
 *   <Sideview Battler State Frames: X|COND>
 *   <Sideview Battler State Speed: X|COND>
 *   <Sideview Battler State Size: W,H|COND>
 *   <Sideview Battler State Weapon: true/false|COND>
 *   <Sideview Battler State Motion: NAME, INDEX|COND>
 *
 *   <Sideview Battler State Motion>
 *     Name: NAME
 *     Index: INDEX
 *     Condition: a:ID|s:ID       (опционально)
 *     Loop
 *     Frames: X
 *     Speed: Y
 *   </Sideview Battler State Motion>
 *
 * ----------------------------------------------------------------------------
 * ПРИМЕР
 * ----------------------------------------------------------------------------
 *
 *   // Базовый скин берсерка (безусловный).
 *   <Sideview Battler State:berserk_enraged>
 *   <Sideview Battler State Size: 192, 216>
 *
 *   // "Светящийся" берсерк — только пока висит state 306.
 *   <Sideview Battler State:berserk_enraged_shine|s:306>
 *   <Sideview Battler State Size: 192, 216|s:306>
 *
 *   // Анимации берсерка — общие, безусловные.
 *   <Sideview Battler State Motion>
 *    Name: damage
 *    Index: 3
 *    Frames: 4
 *    Speed: 10
 *   </Sideview Battler State Motion>
 *   ...
 *
 * ============================================================================
 */

var YED = YED || {};
YED.SideviewBattler = YED.SideviewBattler || {};
var Imported = Imported || {};

(function() {
    // ------------------------------------------------------------------
    // 0. Проверка базового плагина
    // ------------------------------------------------------------------
    if (!Imported.YED_SideviewBattler || !YED.SideviewBattler.Utils) {
        console.error(
            '[YED_SVB_StateCond] YED_SideviewBattler is required and must ' +
            'be loaded above this addon.'
        );
        return;
    }

    var Utils = YED.SideviewBattler.Utils;

    // ==================================================================
    // 1. РЕГЭКСПЫ С ПОДДЕРЖКОЙ |CONDITION
    // ==================================================================
    var CondRegexp = {
        STATE_FILENAME:     /<Sideview Battler State:[ ]*([^|>]*)(?:\|([^>]*))?>/i,
        STATE_FRAMES:       /<Sideview Battler State Frames:[ ]*(\d+)(?:\|([^>]*))?>/i,
        STATE_SPEED:        /<Sideview Battler State Speed:[ ]*(\d+)(?:\|([^>]*))?>/i,
        STATE_SIZES:        /<Sideview Battler State Size:[ ]*(\d+),[ ]*(\d+)(?:\|([^>]*))?>/i,
        STATE_WEAPON:       /<Sideview Battler State Weapon:[ ]*(true|false)(?:\|([^>]*))?>/i,
        STATE_MOTION_QUICK: /<Sideview Battler State Motion:[ ]*([^,]+?),\s*(\d+)(?:\|([^>]*))?>/i,
        STATE_MOTION_BEGIN: /<Sideview Battler State Motion>/i,
        STATE_MOTION_END:   /<\/Sideview Battler State Motion>/i,
        STATE_MOTION_NAME:  /Name:[ ]*(.*)/i,
        STATE_MOTION_INDEX: /Index:[ ]*(\d+)/i,
        STATE_MOTION_LOOP:  /Loop/i,
        STATE_MOTION_FRAMES:/Frames:[ ]*(\d+)/i,
        STATE_MOTION_SPEED: /Speed:[ ]*(\d+)/i,
        STATE_MOTION_CONDITION: /Condition:[ ]*(.*)/i,
    };

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
                cond.targetId   = Number(m[1]);
            } else if ((m = part.match(/^e\s*:\s*(\d+)$/i))) {
                cond.targetType = 'enemy';
                cond.targetId   = Number(m[1]);
            } else if ((m = part.match(/^s\s*:\s*(\d+)$/i))) {
                cond.stateId    = Number(m[1]);
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
            filename:  null,
            frames:    null,
            speed:     null,
            weapon:    null,
            sizes:     null,
            motions:   {}
        };
        overrides.push(entry);
        return entry;
    };

    // ==================================================================
    // 3. ПОДМЕНА processNotetags
    //    Актёры/враги — через базовые хелперы (без изменений).
    //    Состояния  — через массив _sideviewBattlerOverrides.
    // ==================================================================
    Utils.processNotetags = function() {
        var groups = [$dataActors, $dataEnemies],
            group, obj, notedata, line,
            helpers = {};

        for (var j = 0; j < groups.length; j++) {
            group = groups[j];
            for (var i = 1; i < group.length; i++) {
                obj = group[i];
                if (!obj) continue;
                notedata = obj.note.split(/[\r\n]+/);

                Utils._processProperties.call(this, obj);
                Utils._processMethods.call(this, obj);

                for (var n = 0; n < notedata.length; n++) {
                    line = notedata[n];
                    Utils._processNotetag.call(this, obj, line, helpers);
                }
            }
        }

        // Состояния — массив записей, каждая со своим условием.
        if ($dataStates) {
            for (var i = 1; i < $dataStates.length; i++) {
                var state = $dataStates[i];
                if (!state) continue;
                var notedata = state.note.split(/[\r\n]+/);
                var helpers  = {};

                state._sideviewBattlerOverrides = [];

                for (var n = 0; n < notedata.length; n++) {
                    var line = notedata[n];
                    Utils._processStateNotetag.call(this, state, line, helpers);
                }
            }
        }
    };

    // ==================================================================
    // 4. ПОДМЕНА _processStateNotetag
    // ==================================================================
    Utils._processStateNotetag = function(state, notetag, helpers) {
        var match, cond, entry, motion;

        match = notetag.match(CondRegexp.STATE_FILENAME);
        if (match) {
            cond  = Utils.parseStateCondition(match[2]);
            entry = Utils.getOrCreateOverrideEntry(state, cond);
            entry.filename = String(match[1]).trim();
        }

        match = notetag.match(CondRegexp.STATE_FRAMES);
        if (match) {
            cond  = Utils.parseStateCondition(match[2]);
            entry = Utils.getOrCreateOverrideEntry(state, cond);
            entry.frames = Number(match[1]);
        }

        match = notetag.match(CondRegexp.STATE_SPEED);
        if (match) {
            cond  = Utils.parseStateCondition(match[2]);
            entry = Utils.getOrCreateOverrideEntry(state, cond);
            entry.speed = Number(match[1]);
        }

        match = notetag.match(CondRegexp.STATE_SIZES);
        if (match) {
            cond  = Utils.parseStateCondition(match[3]);
            entry = Utils.getOrCreateOverrideEntry(state, cond);
            entry.sizes = [Number(match[1]), Number(match[2])];
        }

        match = notetag.match(CondRegexp.STATE_WEAPON);
        if (match) {
            cond  = Utils.parseStateCondition(match[2]);
            entry = Utils.getOrCreateOverrideEntry(state, cond);
            entry.weapon = (match[1].toLowerCase() === 'true');
        }

        match = notetag.match(CondRegexp.STATE_MOTION_QUICK);
        if (match) {
            cond  = Utils.parseStateCondition(match[3]);
            entry = Utils.getOrCreateOverrideEntry(state, cond);
            motion = {};
            motion.name  = match[1].trim().toLowerCase();
            motion.index = Number(match[2]);
            entry.motions[motion.name] = motion;
        }

        match = notetag.match(CondRegexp.STATE_MOTION_BEGIN);
        if (match) {
            helpers.motionFlag      = true;
            helpers.motion          = {};
            helpers.motionCondition = null;
            return;
        }

        match = notetag.match(CondRegexp.STATE_MOTION_END);
        if (match) {
            motion = helpers.motion;
            var cond = helpers.motionCondition || Utils.parseStateCondition(null);
            helpers.motionFlag      = false;
            helpers.motionCondition = null;
            entry = Utils.getOrCreateOverrideEntry(state, cond);
            if (motion.name) entry.motions[motion.name] = motion;
            return;
        }

        if (helpers.motionFlag) {
            motion = helpers.motion;

            match = notetag.match(CondRegexp.STATE_MOTION_NAME);
            if (match) motion.name = match[1].toLowerCase();

            match = notetag.match(CondRegexp.STATE_MOTION_INDEX);
            if (match) motion.index = Number(match[1]);

            match = notetag.match(CondRegexp.STATE_MOTION_CONDITION);
            if (match) helpers.motionCondition = Utils.parseStateCondition(match[1]);

            match = notetag.match(CondRegexp.STATE_MOTION_LOOP);
            if (match) motion.loop = true;

            match = notetag.match(CondRegexp.STATE_MOTION_FRAMES);
            if (match) motion.frames = Number(match[1]);

            match = notetag.match(CondRegexp.STATE_MOTION_SPEED);
            if (match) motion.speed = Number(match[1]);
        }
    };

    // ==================================================================
    // 5. ПРОВЕРКА УСЛОВИЙ И СБОРКА ОВЕРРАЙДА
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
            // isStateAffected учитывает и обычные состояния, и пассивные
            // (Yanfly APS), и их собственные <Custom Passive Condition>.
            if (!this.isStateAffected(cond.stateId)) return false;
        }

        return true;
    };

    Game_Battler.prototype.getActiveStateOverride = function() {
        if (!this._states) return null;

        var states = this.states();  // включает и пассивные состояния
        var merged = null;
        var seen   = {};             // дедуп по ID состояния

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
                             o.speed    !== null || o.weapon !== null ||
                             o.sizes    !== null ||
                             (o.motions && Object.keys(o.motions).length > 0);
                if (!hasAny) continue;

                if (!merged) {
                    merged = {
                        filename: null,
                        frames:   null,
                        speed:    null,
                        weapon:   null,
                        sizes:    null,
                        motions:  {}
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
    // 6. YANFLY ANIMATEDSVENEMIES: переключение битмапа врага
    //    (Yanfly читает имя из метаданных, а не из getSideviewFilename)
    // ==================================================================
    if (Imported.YEP_X_AnimatedSVEnemies) {
        var _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;

        Sprite_Enemy.prototype.updateBitmap = function() {
            if (this._enemy && this._enemy.isSideviewBattler()) {
                var targetName = this._enemy.getSideviewFilename();
                if (targetName && this._battlerName !== targetName) {
                    this._battlerName = targetName;
                    if (this._mainSprite) {
                        this._mainSprite.bitmap = ImageManager.loadSvActor(targetName);
                    }
                }
                return; // обходим Yanfly-ветку
            }
            _Sprite_Enemy_updateBitmap.call(this);
        };
    }
})();
})();
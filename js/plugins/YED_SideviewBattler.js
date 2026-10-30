/*:
 * Yami Engine Delta - Sideview Battler Enhancement
 *
 * @plugindesc v1.3.0 This plugin allows user to use any kind of sideview battler, with state overrides.
 * @author Yami Engine Delta [Dr.Yami] + state override mod
 *
 * @param [Default Setting]
 * @default
 *
 * @param Default Frames
 * @desc Default frames number for each pose.
 * @default 3
 *
 * @param Default Speed
 * @desc Default speed for each pose. The higher number, the slower motion is.
 * @default 12
 *
 * @param Default Frame Width
 * @desc Default frame width.
 * @default 96
 *
 * @param Default Frame Height
 * @desc Default frame height.
 * @default 96
 *
 * @param Enable Weapon
 * @desc Showing weapon for battler.
 * @default false
 *
 * @help
 * There is no Plugin Command for this plugin.
 *
 * ============================================================================
 * Actors & Enemies Notetags
 *
 * <Sideview Battler: FILENAME>
 * Enable custom sideview battler for actor/enemy with battler set FILENAME.
 *
 * <Sideview Battler Default>
 * Make this battler use default kind of battler (MV's SV Battlers).
 *
 * <Sideview Battler Frames: X>
 * Change default number of frames per pose for current battler.
 *
 * <Sideview Battler Speed: X>
 * Change default speed per pose for current battler. The higher number, the
 * slower motion is.
 *
 * <Sideview Battler Size: WIDTH, HEIGHT>
 * Change the frame sizes.
 *
 * <Sideview Battler Weapon: FLAG>
 * Set weapon showing enable for battler. FLAG can be true or false.
 *
 * <Sideview Battler Motion: NAME, INDEX>
 * Add new motion (pose) for current battler, index is row number (start from
 * zero).
 *
 * <Sideview Battler Motion>
 *   Name: NAME
 *   Index: INDEX
 *   Loop
 *   Frames: X
 *   Speed: Y
 * </Sideview Battler Motion>
 * Add new motion (pose) for current battler.
 * Loop is for looping motion.
 * Frames and Speed is for custom frames and speed from the default ones.
 * Loop, Frames and Speed can be omitted.
 *
 * ============================================================================
 * States Notetags (NEW)
 *
 * You can override sideview battler properties while a state is active.
 * The last active state with overrides takes priority.
 * Overrides from multiple active states are MERGED together: a later state's
 * property replaces an earlier state's property of the same kind, but
 * properties not touched by the later state are kept from the earlier one.
 *
 * ---------------------------------------------------------------------------
 * CONDITION SUPPORT (NEW)
 * ---------------------------------------------------------------------------
 * Every State notetag may include an optional condition suffix:
 *
 *   <TAG: VALUE|CONDITION>
 *
 * CONDITION is a '|' separated list of:
 *
 *   a:ID  - apply only if current battler is Actor with that ID
 *   e:ID  - apply only if current battler is Enemy with that ID
 *   s:ID  - apply only if state with ID is also present on the battler
 *
 * You may combine conditions, e.g. |a:1|s:12 or |e:3|s:5.
 * Conditions are optional. If omitted, the tag applies unconditionally
 * (same as before).
 *
 * Multiple tags inside ONE state with the SAME condition are merged into a
 * single override entry. Tags with DIFFERENT conditions become separate
 * entries that are evaluated independently.
 *
 * ---------------------------------------------------------------------------
 * Available state tags:
 * ---------------------------------------------------------------------------
 *
 * <Sideview Battler State: FILENAME>
 * <Sideview Battler State: FILENAME|a:ID>
 * <Sideview Battler State: FILENAME|e:ID|s:ID>
 * Override the sprite filename.
 *
 * <Sideview Battler State Frames: X>
 * <Sideview Battler State Frames: X|a:ID|s:ID>
 * Override default frames.
 *
 * <Sideview Battler State Speed: X>
 * <Sideview Battler State Speed: X|a:ID>
 * Override default speed.
 *
 * <Sideview Battler State Size: WIDTH, HEIGHT>
 * <Sideview Battler State Size: WIDTH, HEIGHT|e:ID|s:ID>
 * Override frame sizes.
 *
 * <Sideview Battler State Weapon: true/false>
 * <Sideview Battler State Weapon: true/false|a:ID>
 * Override weapon visibility.
 *
 * <Sideview Battler State Motion: NAME, INDEX>
 * <Sideview Battler State Motion: NAME, INDEX|a:ID|s:ID>
 * Quick override for a motion (row index).
 *
 * <Sideview Battler State Motion>
 *   Name: NAME
 *   Index: INDEX
 *   Condition: a:ID|s:ID        (optional)
 *   Loop
 *   Frames: X
 *   Speed: Y
 * </Sideview Battler State Motion>
 * Full override for a motion.
 *
 * ---------------------------------------------------------------------------
 * Example:
 * ---------------------------------------------------------------------------
 *   // For actor 1 while state 5 active: use flame_hero
 *   <Sideview Battler State: flame_hero|a:1|s:5>
 *
 *   // For enemy 3 while state 5 active: use flame_enemy
 *   <Sideview Battler State: flame_enemy|e:3|s:5>
 *
 *   // For enemy 2 while state 5 active: override attack row to 3
 *   <Sideview Battler State Motion: attack, 3|e:2|s:5>
 *
 * ============================================================================
 * Notes
 *
 * 1. Frame will be started from 0 (first frame of the pose).
 * 2. All default motions to be setup:
 *    walk      wait    chant   guard   damage
 *    evade     thrust  swing   missile skill
 *    spell     item    escape  victory dying
 *    abnormal  sleep   dead
 * 3. All battlers should have the motion "walk". If any of default motions is
 *    not setup, the "other" motion will be used, "walk" will be used instead
 *    if "other" hasn't been setup.
 * 4. Current version only support animated enemies with Yanfly's Animated
 *    Sideview Enemies. This will be standalone on next version.
 * 5. When using with Yanfly's Animated Sideview Enemies, the sprite width and
 *    height should be set manually instead of 'auto'.
 * ============================================================================
 * Compatible
 *
 * The plugin should be placed under any of other Core script, such as YEP -
 * Core Engine.
 *
 * The plugin should be placed under YEP - Battle Engine Core and YEP -
 * Animated Sideview Enemies if used.
 * ============================================================================
 * Action Sequences - Action List (For YEP - Battle Engine Core)
 *
 * CUSTOM MOTION type, (no weapon)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Forces the target to perform a custom motion defined by this plugin. Anything
 * besides above listed default motions should be called with this action instead.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: attack animation: target
 *
 * ============================================================================
 */

var YED = YED || {};
YED.SideviewBattler = {};
var Imported = Imported || {};
Imported.YED_SideviewBattler = true;

(function($SideviewBattler) {
    var Regexp = {
        FILENAME: /<Sideview Battler:[ ]*(.*)>/i,
        DEFAULT_TYPE: /<Sideview Battler Default>/i,
        FRAMES: /<Sideview Battler Frames:[ ]*(\d+)>/i,
        SPEED: /<Sideview Battler Speed:[ ]*(\d+)>/i,
        SIZES: /<Sideview Battler Size:[ ]*(\d+),[ ]*(\d+)>/i,
        WEAPON_ENABLE: /<Sideview Battler Weapon:[ ]*(true|false)>/i,
        MOTION_QUICK: /<Sideview Battler Motion:[ ]*(.*),[ ]*(\d+)>/i,
        MOTION_BEGIN: /<Sideview Battler Motion>/i,
        MOTION_END: /<\/Sideview Battler Motion>/i,
        MOTION_NAME: /Name:[ ]*(.*)/i,
        MOTION_INDEX: /Index:[ ]*(\d+)/i,
        MOTION_LOOP: /Loop/i,
        MOTION_FRAMES: /Frames:[ ]*(\d+)/i,
        MOTION_SPEED: /Speed:[ ]*(\d+)/i,

        // State overrides — с поддержкой условий |a:ID|e:ID|s:ID|
        STATE_FILENAME: /<Sideview Battler State:[ ]*([^|>]*)(?:\|([^>]*))?>/i,
        STATE_FRAMES: /<Sideview Battler State Frames:[ ]*(\d+)(?:\|([^>]*))?>/i,
        STATE_SPEED: /<Sideview Battler State Speed:[ ]*(\d+)(?:\|([^>]*))?>/i,
        STATE_SIZES: /<Sideview Battler State Size:[ ]*(\d+),[ ]*(\d+)(?:\|([^>]*))?>/i,
        STATE_WEAPON: /<Sideview Battler State Weapon:[ ]*(true|false)(?:\|([^>]*))?>/i,
        STATE_MOTION_QUICK: /<Sideview Battler State Motion:[ ]*([^,]+?),\s*(\d+)(?:\|([^>]*))?>/i,
        STATE_MOTION_BEGIN: /<Sideview Battler State Motion>/i,
        STATE_MOTION_END: /<\/Sideview Battler State Motion>/i,
        STATE_MOTION_NAME: /Name:[ ]*(.*)/i,
        STATE_MOTION_INDEX: /Index:[ ]*(\d+)/i,
        STATE_MOTION_LOOP: /Loop/i,
        STATE_MOTION_FRAMES: /Frames:[ ]*(\d+)/i,
        STATE_MOTION_SPEED: /Speed:[ ]*(\d+)/i,
        STATE_MOTION_CONDITION: /Condition:[ ]*(.*)/i,
    };

    $SideviewBattler.Regexp = Regexp;
}(YED.SideviewBattler));

(function($SideviewBattler) {
    var Regexp = $SideviewBattler.Regexp;
    var Utils = {};

    Utils.parameters = {};

    Utils.processParameters = function() {
        var parameters = PluginManager.parameters('YED_SideviewBattler'),
            result     = Utils.parameters;

        result['Default Frames'] = Number(parameters['Default Frames'] || 0);
        result['Default Speed'] = Number(parameters['Default Speed']  || 0);
        result['Default Frame Width'] = Number(parameters['Default Frame Width']  || 0);
        result['Default Frame Height'] = Number(parameters['Default Frame Height']  || 0);
        result['Enable Weapon'] = eval(parameters['Enable Weapon'].toLowerCase());
    };

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

                // Массив записей-переопределений (у каждой свой набор условий)
                state._sideviewBattlerOverrides = [];

                for (var n = 0; n < notedata.length; n++) {
                    var line = notedata[n];
                    Utils._processStateNotetag.call(this, state, line, helpers);
                }
            }
        }
    };

    Utils._processProperties = function(obj) {
        obj._sideviewBattler = {
            filename: "",
            default : false,
            frames  : Utils.parameters['Default Frames'],
            speed   : Utils.parameters['Default Speed'],
            weapon  : Utils.parameters['Enable Weapon'],
            sizes   : [
                Utils.parameters['Default Frame Width'],
                Utils.parameters['Default Frame Height']
            ],
            motions : {}
        };
    };

    Utils._processMethods = function(obj) {
        obj.getSideviewBattler = Utils.getSideviewBattler;
        obj.isSideviewBattler = Utils.isSideviewBattler;
    };

    Utils._processNotetag = function(obj, notetag, helpers) {
        var sideviewBattler = obj._sideviewBattler,
            match,
            motion;

        match = notetag.match(Regexp.FILENAME);
        if (match) {
            sideviewBattler.filename = String(match[1]);
        }

        match = notetag.match(Regexp.DEFAULT_TYPE);
        if (match) {
            sideviewBattler.default = true;
        }

        match = notetag.match(Regexp.FRAMES);
        if (match) {
            sideviewBattler.frames = Number(match[1]);
        }

        match = notetag.match(Regexp.SPEED);
        if (match) {
            sideviewBattler.speed = Number(match[1]);
        }

        match = notetag.match(Regexp.SIZES);
        if (match) {
            sideviewBattler.sizes[0] = Number(match[1]);
            sideviewBattler.sizes[1] = Number(match[2]);
        }

        match = notetag.match(Regexp.WEAPON_ENABLE);
        if (match) {
            sideviewBattler.weapon = eval(match[1].toLowerCase());
        }

        match = notetag.match(Regexp.MOTION_QUICK);
        if (match) {
            motion = {};
            motion.name = match[1].toLowerCase();
            motion.index = Number(match[2]);
            sideviewBattler.motions[motion.name] = motion;
        }

        match = notetag.match(Regexp.MOTION_BEGIN);
        if (match) {
            helpers.motionFlag = true;
            helpers.motion = {};
            return;
        }

        match = notetag.match(Regexp.MOTION_END);
        if (match) {
            motion = helpers.motion;
            helpers.motionFlag = false;
            sideviewBattler.motions[motion.name] = motion;
            return;
        }

        if (helpers.motionFlag) {
            motion = helpers.motion;

            match = notetag.match(Regexp.MOTION_NAME);
            if (match) {
                motion.name = match[1].toLowerCase();
            }

            match = notetag.match(Regexp.MOTION_INDEX);
            if (match) {
                motion.index = Number(match[1]);
            }

            match = notetag.match(Regexp.MOTION_LOOP);
            if (match) {
                motion.loop = true;
            }

            match = notetag.match(Regexp.MOTION_FRAMES);
            if (match) {
                motion.frames = Number(match[1]);
            }

            match = notetag.match(Regexp.MOTION_SPEED);
            if (match) {
                motion.speed = Number(match[1]);
            }
        }
    };

    // ---- Помощники для условий ----

    Utils.parseStateCondition = function(str) {
        var cond = { targetType: null, targetId: null, stateId: null };
        if (!str) return cond;
        var parts = String(str).split('|');
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i].trim();
            if (!part) continue;
            var m;
            if (m = part.match(/^a\s*:\s*(\d+)$/i)) {
                cond.targetType = 'actor';
                cond.targetId = Number(m[1]);
            } else if (m = part.match(/^e\s*:\s*(\d+)$/i)) {
                cond.targetType = 'enemy';
                cond.targetId = Number(m[1]);
            } else if (m = part.match(/^s\s*:\s*(\d+)$/i)) {
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

    // ---- Обработка ноте-тегов состояний ----

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

    Utils.getSideviewBattler = function() {
        return this._sideviewBattler;
    };

    Utils.isSideviewBattler = function() {
        return this._sideviewBattler.filename !== "" && !this._sideviewBattler.default;
    };

    $SideviewBattler.Utils = Utils;
}(YED.SideviewBattler));

(function($SideviewBattler) {
    var Utils = $SideviewBattler.Utils;
    var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;

    DataManager.isDatabaseLoaded = function() {
        var loaded = _DataManager_isDatabaseLoaded.call(this);
        if (!loaded) return false;

        Utils.processParameters.call(DataManager);
        Utils.processNotetags.call(DataManager);
        return true;
    };
}(YED.SideviewBattler));

(function() {
    if (!Imported.YEP_BattleEngineCore) return;

    var _BattleManager_processActionSequence = BattleManager.processActionSequence;
    BattleManager.processActionSequence = function(actionName, actionArgs) {
        if (actionName.match(/CUSTOM MOTION[ ](.*)/i)) {
            return this.actionCustomMotionTarget(String(RegExp.$1), actionArgs);
        }
        return _BattleManager_processActionSequence.call(this, actionName, actionArgs);
    };

    BattleManager.actionCustomMotionTarget = function(name, actionArgs) {
        var movers = this.makeActionTargets(actionArgs[0]);
        if (movers.length < 1) return true;
        var showWeapon = !(actionArgs[1] && actionArgs[1].toUpperCase() === 'NO WEAPON');
        movers.forEach(function(mover) {
            mover.forceMotion(name.toLowerCase());
        });
        return false;
    };
}());

(function() {
    Game_Battler.prototype.getBattler = function() {
        var battler = this.isActor() ? this.actor() : (this.isEnemy() ? this.enemy() : null);
        return battler || null;
    };

    Game_Battler.prototype.getSideviewBattler = function() {
        var battler = this.getBattler();
        return battler ? battler.getSideviewBattler() : null;
    };

    Game_Battler.prototype.isSideviewBattler = function() {
        var battler = this.getBattler();
        return battler ? battler.isSideviewBattler() : false;
    };

    // Проверка соответствия записи текущему баттлеру
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
        // ВАЖНО: isStateAffected работает и для обычных, и для пассивных,
        // и учитывает их собственные <Custom Passive Condition>.
        if (!this.isStateAffected(cond.stateId)) return false;
    }

    return true;
};

    // Слияние всех подходящих записей из активных состояний.
    // Поздние записи/состояния перекрывают более ранние по тем же свойствам.
    Game_Battler.prototype.getActiveStateOverride = function() {
    // this.states() включает и обычные (_states), и пассивные (Yanfly APS)
    var states = this.states();
    var merged = null;
    var seen = {}; // защита от дубликатов (states() может отдать один ID дважды)

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

    Game_Battler.prototype.isUseWeapon = function() {
        var override = this.getActiveStateOverride();
        if (override && override.weapon !== null) return override.weapon;

        if (!this.isSideviewBattler()) return true;
        var sideviewBattler = this.getSideviewBattler();
        return sideviewBattler.weapon;
    };

    Game_Battler.prototype.getSideviewFilename = function() {
        var override = this.getActiveStateOverride();
        if (override && override.filename !== null) return override.filename;

        if (!this.isSideviewBattler()) return null;
        return this.getSideviewBattler().filename;
    };

    Game_Battler.prototype.getSideviewSizes = function() {
        var override = this.getActiveStateOverride();
        if (override && override.sizes !== null) return override.sizes;

        if (!this.isSideviewBattler()) return null;
        return this.getSideviewBattler().sizes;
    };

    Game_Battler.prototype.getSideviewMotions = function() {
        var baseMotions = null;
        if (this.isSideviewBattler()) {
            baseMotions = this.getSideviewBattler().motions;
        }

        var override = this.getActiveStateOverride();
        if (!override) return baseMotions;

        var merged = {};
        if (baseMotions) Object.assign(merged, baseMotions);
        Object.assign(merged, override.motions);
        return merged;
    };

    Game_Battler.prototype.getFallbackMotion = function() {
        var motions = this.getSideviewMotions();
        if (!this.isSideviewBattler()) return null;
        if (motions.other) return motions.other;
        return motions.walk;
    };

    Game_Battler.prototype.getSideviewMotion = function(motionName) {
        if (!motionName) return null;
        if (!this.isSideviewBattler()) return null;

        var motions = this.getSideviewMotions();
        if (!motions[motionName]) return this.getFallbackMotion();
        return motions[motionName];
    };

    Game_Battler.prototype.getSideviewFrames = function(motionName) {
        var override = this.getActiveStateOverride();
        // Check motion-specific override
        if (override && override.motions[motionName] && override.motions[motionName].frames !== undefined) {
            return override.motions[motionName].frames;
        }
        // Check global frames override
        if (override && override.frames !== null) return override.frames;

        if (!this.isSideviewBattler()) return null;
        var sideviewBattler = this.getSideviewBattler();
        var motion = this.getSideviewMotion(motionName);
        if (motion && motion.frames !== undefined) return motion.frames;
        return sideviewBattler.frames;
    };

    Game_Battler.prototype.getSideviewSpeed = function(motionName) {
        var override = this.getActiveStateOverride();
        if (override && override.motions[motionName] && override.motions[motionName].speed !== undefined) {
            return override.motions[motionName].speed;
        }
        if (override && override.speed !== null) return override.speed;

        if (!this.isSideviewBattler()) return null;
        var sideviewBattler = this.getSideviewBattler();
        var motion = this.getSideviewMotion(motionName);
        if (motion && motion.speed !== undefined) return motion.speed;
        return sideviewBattler.speed;
    };
}());

(function() {
    var _Game_Actor_battlerName = Game_Actor.prototype.battlerName;
    Game_Actor.prototype.battlerName = function() {
        if (this.isSideviewBattler()) {
            return this.getSideviewFilename();
        }
        return _Game_Actor_battlerName.call(this);
    };
}());

(function() {
    var _Game_Enemy_battlerName = Game_Enemy.prototype.battlerName;
    Game_Enemy.prototype.battlerName = function() {
        if (this.isSideviewBattler()) {
            return this.getSideviewFilename();
        }
        return _Game_Enemy_battlerName.call(this);
    };
}());

(function() {
    var _Sprite_Actor_initMembers = Sprite_Actor.prototype.initMembers;
    var _Sprite_Actor_setupWeaponAnimation = Sprite_Actor.prototype.setupWeaponAnimation;
    var _Sprite_Actor_startMotion = Sprite_Actor.prototype.startMotion;
    var _Sprite_Actor_forceMotion = Sprite_Actor.prototype.forceMotion;
    var _Sprite_Actor_motionSpeed = Sprite_Actor.prototype.motionSpeed;
    var _Sprite_Actor_updateFrame = Sprite_Actor.prototype.updateFrame;
    var _Sprite_Actor_updateMotionCount = Sprite_Actor.prototype.updateMotionCount;

    Sprite_Actor.prototype.initMembers = function() {
        _Sprite_Actor_initMembers.call(this);
        this._motionName = "";
    };

    Sprite_Actor.prototype.setupWeaponAnimation = function() {
        if (this._actor.isUseWeapon()) {
            _Sprite_Actor_setupWeaponAnimation.call(this);
        } else {
            this._actor.clearWeaponAnimation();
        }
    };

    Sprite_Actor.prototype.startMotion = function(motionType) {
        if (this._actor.isSideviewBattler()) {
            this.startSideviewMotion(motionType);
        } else {
            _Sprite_Actor_startMotion.call(this, motionType);
        }
    };

    Sprite_Actor.prototype.forceMotion = function(motionType) {
        if (this._actor.isSideviewBattler()) {
            this.forceSideviewMotion(motionType);
        } else {
            _Sprite_Actor_forceMotion.call(this, motionType);
        }
    };

    Sprite_Actor.prototype.startSideviewMotion = function(motionType) {
        if (this._motionName !== motionType) {
            this._motionName = motionType;
            this._motionCount = 0;
            this._pattern = 0;
        }
    };

    Sprite_Actor.prototype.forceSideviewMotion = function(motionType) {
        this._motionName = motionType;
        this._motionCount = 0;
        this._pattern = 0;
    };

    Sprite_Actor.prototype.getCurrentMotion = function() {
        return this._actor.getSideviewMotion(this._motionName);
    };

    Sprite_Actor.prototype.frameSizes = function() {
        return this._actor.getSideviewSizes();
    };

    Sprite_Actor.prototype.motionFrames = function() {
        var motionName = this._motionName;
        if (this._actor.isSideviewBattler()) {
            return this._actor.getSideviewFrames(motionName);
        }
        return 3;
    };

    Sprite_Actor.prototype.motionSpeed = function() {
        var motionName = this._motionName;
        if (this._actor.isSideviewBattler()) {
            return this._actor.getSideviewSpeed(motionName);
        }
        return _Sprite_Actor_motionSpeed.call(this);
    };

    Sprite_Actor.prototype.updateFrame = function() {
        if (this._actor.isSideviewBattler()) {
            this.updateSideviewFrame();
        } else {
            _Sprite_Actor_updateFrame.call(this);
        }
    };

    Sprite_Actor.prototype.updateSideviewFrame = function() {
        var bitmap = this._mainSprite.bitmap,
            motion = this.getCurrentMotion(),
            frameSizes = this.frameSizes();

        Sprite_Battler.prototype.updateFrame.call(this);

        if (bitmap) {
            var motionIndex = motion.index;
            var pattern = this._pattern;
            var cw = frameSizes[0];
            var ch = frameSizes[1];
            this._mainSprite.setFrame(pattern * cw, motionIndex * ch, cw, ch);
        }
    };

    Sprite_Actor.prototype.updateMotionCount = function() {
        if (this._actor.isSideviewBattler()) {
            this.updateSideviewMotionCount();
        } else {
            _Sprite_Actor_updateMotionCount.call(this);
        }
    };

    Sprite_Actor.prototype.updateSideviewMotionCount = function() {
        var motion = this.getCurrentMotion(),
            speed = this.motionSpeed(),
            frames = this.motionFrames();

        if (motion && ++this._motionCount >= speed) {
            if (motion.loop) {
                this._pattern = (this._pattern + 1) % frames;
            } else if (this._pattern < frames - 1) {
                this._pattern++;
            } else {
                this.refreshMotion();
            }
            this._motionCount = 0;
        }
    };
}());

(function() {
    if (!Imported.YEP_X_AnimatedSVEnemies) return;

    var _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
    var _Sprite_Enemy_setupWeaponAnimation = Sprite_Enemy.prototype.setupWeaponAnimation;
    var _Sprite_Enemy_startMotion = Sprite_Enemy.prototype.startMotion;
    var _Sprite_Enemy_forceMotion = Sprite_Enemy.prototype.forceMotion;
    var _Sprite_Enemy_updateFrame = Sprite_Enemy.prototype.updateFrame;
    var _Sprite_Enemy_updateMotionCount = Sprite_Enemy.prototype.updateMotionCount;

    Sprite_Enemy.prototype.initMembers = function() {
        _Sprite_Enemy_initMembers.call(this);
        this._motionName = "";
    };

    Sprite_Enemy.prototype.setupWeaponAnimation = function() {
        if (this._enemy.isUseWeapon()) {
            _Sprite_Enemy_setupWeaponAnimation.call(this);
        } else {
            this._enemy.clearWeaponAnimation();
        }
    };

    Sprite_Enemy.prototype.startMotion = function(motionType) {
        if (this._enemy.isSideviewBattler()) {
            this.startSideviewMotion(motionType);
        } else {
            _Sprite_Enemy_startMotion.call(this, motionType);
        }
    };

    Sprite_Enemy.prototype.forceMotion = function(motionType) {
        if (this._enemy.isSideviewBattler()) {
            this.forceSideviewMotion(motionType);
        } else {
            _Sprite_Enemy_forceMotion.call(this, motionType);
        }
    };

    Sprite_Enemy.prototype.startSideviewMotion = function(motionType) {
        if (this._motionName !== motionType) {
            this._motionName = motionType;
            this._motionCount = 0;
            this._pattern = 0;
        }
    };

    Sprite_Enemy.prototype.forceSideviewMotion = function(motionType) {
        this._motionName = motionType;
        this._motionCount = 0;
        this._pattern = 0;
    };

    Sprite_Enemy.prototype.getCurrentMotion = function() {
        return this._enemy.getSideviewMotion(this._motionName);
    };

    Sprite_Enemy.prototype.frameSizes = function() {
        return this._enemy.getSideviewSizes();
    };

    Sprite_Enemy.prototype.motionFrames = function() {
        var motionName = this._motionName;
        if (this._enemy.isSideviewBattler()) {
            return this._enemy.getSideviewFrames(motionName);
        }
        return 3;
    };

    Sprite_Enemy.prototype.motionSpeed = function() {
        var motionName = this._motionName;
        if (this._enemy.isSideviewBattler()) {
            return this._enemy.getSideviewSpeed(motionName);
        }
        return 12;
    };

    Sprite_Enemy.prototype.updateMotionCount = function() {
        if (this._enemy.isSideviewBattler()) {
            this.updateSideviewMotionCount();
        } else {
            _Sprite_Enemy_updateMotionCount.call(this);
        }
    };

    Sprite_Enemy.prototype.updateSideviewMotionCount = function() {
        var motion = this.getCurrentMotion(),
            speed = this.motionSpeed(),
            frames = this.motionFrames();

        if (motion && ++this._motionCount >= speed) {
            if (motion.loop) {
                this._pattern = (this._pattern + 1) % frames;
            } else if (this._pattern < frames - 1) {
                this._pattern++;
            } else {
                this.refreshMotion();
            }
            this._motionCount = 0;
        }
    };

    Sprite_Enemy.prototype.updateFrame = function() {
        if (this._enemy.isSideviewBattler()) {
            this.updateSideviewFrame();
        } else {
            _Sprite_Enemy_updateFrame.call(this);
        }
    };

    Sprite_Enemy.prototype.updateSideviewFrame = function() {
        var bitmap = this._mainSprite.bitmap,
            motion = this.getCurrentMotion(),
            frameSizes = this.frameSizes();

        Sprite_Battler.prototype.updateFrame.call(this);

        if (bitmap.width <= 0) return;

        this._effectTarget = this._mainSprite;

        var motionIndex = motion.index;
        var pattern = this._pattern;
        var cw = frameSizes[0];
        var ch = frameSizes[1];
        var cdh = (this._effectType === 'bossCollapse') ? ch - this._effectDuration : 0;

        this.setFrame(pattern * cw, motionIndex * ch, cw, ch);
        this._mainSprite.setFrame(pattern * cw, motionIndex * ch, cw, ch - cdh);
        this.adjustMainBitmapSettings(bitmap);
        this.adjustSVShadowSettings();
    };

    
    
}());

(function() {
    if (!Imported.YEP_X_AnimatedSVEnemies) return;

    var _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;

    Sprite_Enemy.prototype.updateBitmap = function() {
        // Если враг ещё не появился — работает штатная логика Yanfly
        // (она сама решает, грузить ли битмап и как показывать спрайт)
        if (!(this._enemy && this._enemy.isSideviewBattler() && this._enemy.isAppeared())) {
            return _Sprite_Enemy_updateBitmap.call(this);
        }

        var targetName = this._enemy.getSideviewFilename();
        if (!targetName) return;

        var targetBitmap = ImageManager.loadSvActor(targetName);
        if (this._battlerName !== targetName ||
            (this._mainSprite && this._mainSprite.bitmap !== targetBitmap)) {
            this._battlerName = targetName;
            if (this._mainSprite) {
                this._mainSprite.bitmap = targetBitmap;
            }
        }
    };
})();


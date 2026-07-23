/*
 * ==============================================================================
 * ** Victor Engine MV - Throwable Objects (Final Fixed + Animation Follow)
 * ==============================================================================
 */

var Imported = Imported || {};
Imported['VE - Throwable Objects'] = '1.02';

var VictorEngine = VictorEngine || {};
VictorEngine.ThrowableObjects = VictorEngine.ThrowableObjects || {};

(function() {
    VictorEngine.ThrowableObjects.loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function() {
        VictorEngine.ThrowableObjects.loadDatabase.call(this);
        PluginManager.requiredPlugin.call(PluginManager, 'VE - Throwable Objects', 'VE - Basic Module', '1.21');
        PluginManager.requiredPlugin.call(PluginManager, 'VE - Throwable Objects', 'VE - Charge Actions');
    };

    VictorEngine.ThrowableObjects.requiredPlugin = PluginManager.requiredPlugin;
    PluginManager.requiredPlugin = function(name, required, version) {
        if (!VictorEngine.BasicModule) {
            var msg = 'The plugin ' + name + ' requires the plugin ' + required;
            msg += ' v' + version + ' or higher installed to work properly.';
            msg += ' Go to http://victorenginescripts.wordpress.com/ to download the plugin.';
            throw new Error(msg);
        } else {
            VictorEngine.ThrowableObjects.requiredPlugin.call(this, name, required, version)
        };
    };
})();

/*: (help text unchanged) */

(function() {

    //=============================================================================
    // VictorEngine (notetag loading – unchanged)
    //=============================================================================

    VictorEngine.ThrowableObjects.loadNotetagsValues = VictorEngine.loadNotetagsValues;
    VictorEngine.loadNotetagsValues = function(data, index) {
        VictorEngine.ThrowableObjects.loadNotetagsValues.call(this, data, index);
        if (this.objectSelection(index, ['skill', 'item', 'weapon', 'enemy'])) {
            VictorEngine.ThrowableObjects.loadNotes1(data);
        }
        if (this.objectSelection(index, ['weapon', 'enemy'])) {
            VictorEngine.ThrowableObjects.loadNotes2(data);
        }
    };

    VictorEngine.ThrowableObjects.loadNotes1 = function(data) {
        data.throwableObjects = data.throwableObjects || {};
        this.processNotes1(data);
        this.processNotes2(data);
    };

    VictorEngine.ThrowableObjects.loadNotes2 = function(data) {
        data.throwableObjects = data.throwableObjects || {};
        this.processNotes2(data);
    };

    VictorEngine.ThrowableObjects.processNotes1 = function(data) {
        var match;
        var regex = VictorEngine.getNotesValues('throw object[ ]*:[ ]*(\\w+)', 'throw object');
        while (match = regex.exec(data.note)) {
            this.processValues1(data, match);
        };
        data.throwableObjects.weapon = !!data.note.match(/<throw item>/gi);
    };

    VictorEngine.ThrowableObjects.processNotes2 = function(data) {
        var match;
        var part1 = 'throw image[ ]*:[ ]*(icon|animation|picture)[ ]*';
        var regex = new RegExp('<' + part1 + "(\\d+|'[^\']+'|\"[^\"]+\")[ ]*>", 'gi');
        while (match = regex.exec(data.note)) {
            this.processValues2(data, match);
        };
    };

    VictorEngine.ThrowableObjects.processValues1 = function(data, match) {
        var result = {};
        var type = match[1].toLowerCase()
        result.image = this.getImage(match[2]);
        result.start = this.getOffset(match[2], 'start');
        result.end = this.getOffset(match[2], 'end');
        result.speed = VictorEngine.getNumberValue(match[2], 'speed', 100);
        result.delay = VictorEngine.getNumberValue(match[2], 'delay', 0);
        result.spin = VictorEngine.getNumberValue(match[2], 'spin', 0);
        result.arc = VictorEngine.getNumberValue(match[2], 'arc', 0);
        result.anim = VictorEngine.getNumberValue(match[2], 'animation', 0);
        result.duration = VictorEngine.getNumberValue(match[2], 'duration', 0);
        result.angled = !!match[2].match(/angled/gi);
        result.returning = !!match[2].match(/return(?:ing)?/gi);
        data.throwableObjects[type] = result;
    };

    VictorEngine.ThrowableObjects.processValues2 = function(data, match) {
        var result = {};
        var type = match[1].toLowerCase();
        result.type = type;
        result.id = type === 'picture' ? 0 : Number(match[2]) || 0;
        result.name = type === 'picture' ? match[2].slice(1, -1) : '';
        data.throwableObjects.item = result;
    };

    VictorEngine.ThrowableObjects.getImage = function(match) {
        var image = '[ ]*(weapon|icon|animation|picture)[ ]*';
        var regex = new RegExp("image[ ]*:" + image + "(\\d+|'[^\']+'|\"[^\"]+\")?", 'gi');
        var value = regex.exec(match) || [];
        var type = value[1] || '';
        var id = type !== 'picture' && value[2] ? Number(value[2]) || 0 : 0;
        var name = type === 'picture' && value[2] ? value[2].slice(1, -1) : '';
        return {
            type: type.toLowerCase(),
            id: id,
            name: name
        };
    };

    VictorEngine.ThrowableObjects.getOffset = function(match, type) {
        var regex = new RegExp(type + '[ ]*:[ ]*([+-]?\\d+)[ ]*,?[ ]*([+-]?\\d+)', 'gi');
        var value = regex.exec(match) || [];
        var x = Number(value[1]) || 0;
        var y = Number(value[2]) || 0;
        return {
            x: x,
            y: y
        };
    };

    //=============================================================================
    // BattleManager
    //=============================================================================

    VictorEngine.ThrowableObjects.initMembersBattleManager = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        VictorEngine.ThrowableObjects.initMembersBattleManager.call(this);
        this._throwableObjects = [];
    };

    BattleManager.addThrowableObjects = function(sprite) {
        if (!this._throwableObjects.contains(sprite)) {
            this._throwableObjects.push(sprite);
        }
    };

    BattleManager.removeThrowableObjects = function(sprite) {
        for (var i = 0; i < this._throwableObjects.length; i++) {
            if (this._throwableObjects[i] === sprite) {
                this._throwableObjects.splice(i, 1);
                i--;
            }
        }
    };

    BattleManager.throwableObjects = function() {
        return this._throwableObjects;
    };

    BattleManager.createThrow = function(subject, target, params) {
        if (!subject || !target || !params) return;
        var object = {
            image: {},
            start: { x: params.startX || 0, y: params.startY || 0 },
            end: { x: params.endX || 0, y: params.endY || 0 },
            speed: params.speed || 100,
            duration: params.duration || 0,
            delay: params.delay || 0,
            spin: params.spin || 0,
            arc: params.arc || 0,
            anim: params.anim || 0,
            returning: !!params.returning,
            angled: !!params.angled
        };
        var imgType = params.image || 'icon';
        object.image.type = imgType;
        if (imgType === 'picture') {
            object.image.name = params.name || '';
            object.image.id = 0;
        } else {
            object.image.id = params.id || 0;
            object.image.name = '';
        }
        if (target.battleSprite()) {
            target.battleSprite().startThrow(subject, target, object);
        }
    };

    //=============================================================================
    // Game_Action
    //=============================================================================

    Game_Action.prototype.isThrowable = function() {
        var object = this.item().throwableObjects;
        return object && (object.before || object.after || object.during);
    };

    Game_Action.prototype.throwableObject = function(type) {
        var object = this.item().throwableObjects;
        if (object && object.weapon) {
            if (this.subject().isActor()) {
                var weapon = this.subject().weapons()[0];
                if (weapon) {
                    return weapon.throwableObjects[type];
                }
            } else {
                return this.subject().enemy().throwableObjects[type];
            }
        }
        return object[type];
    };

    //=============================================================================
    // Game_BattlerBase
    //=============================================================================

    Game_BattlerBase.prototype.isSpriteThrowing = function() {
        return BattleManager.allBattleMembers().some(function(target) {
            return this.isThrowing(target);
        }, this);
    };

    Game_BattlerBase.prototype.isThrowing = function(target) {
        return BattleManager.throwableObjects().some(function(sprite) {
            return sprite.isThrowing(this, target)
        }, this);
    };

    //=============================================================================
    // Sprite_Battler
    //=============================================================================

    VictorEngine.ThrowableObjects.initMembersSpriteBattler = Sprite_Battler.prototype.initMembers;
    Sprite_Battler.prototype.initMembers = function() {
        VictorEngine.ThrowableObjects.initMembersSpriteBattler.call(this);
        this._throwableObjects = [];
    };

    VictorEngine.ThrowableObjects.updateSpriteBattler = Sprite_Battler.prototype.update;
    Sprite_Battler.prototype.update = function() {
        VictorEngine.ThrowableObjects.updateSpriteBattler.call(this);
        this.updateThrowableSprites();
    };

    Sprite_Battler.prototype.startThrow = function(subject, target, object) {
        var sprite = new Sprite_Throw(subject, target, object);
        this._throwableObjects.push(sprite);
        this.parent.addChild(sprite);
        BattleManager.addThrowableObjects(sprite);
    };

    Sprite_Battler.prototype.updateThrowableSprites = function() {
        if (this._throwableObjects.length > 0) {
            var sprites = this._throwableObjects.clone();
            this._throwableObjects = [];
            for (var i = 0; i < sprites.length; i++) {
                var sprite = sprites[i];
                if (sprite.isPlaying()) {
                    this._throwableObjects.push(sprite);
                } else {
                    sprite.remove();
                }
            }
        }
    };

    //=============================================================================
    // Spriteset_Battle (без sortBattleSprites)
    //=============================================================================

    VictorEngine.ThrowableObjects.updateSpritesetBattle = Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update = function() {
        VictorEngine.ThrowableObjects.updateSpritesetBattle.call(this);
    };

    //=============================================================================
    // Window_BattleLog (защита от ошибок стека)
    //=============================================================================

    VictorEngine.ThrowableObjects.initialize = Window_BattleLog.prototype.initialize;
    Window_BattleLog.prototype.initialize = function() {
        this.initializeMethodsStack()
        VictorEngine.ThrowableObjects.initialize.call(this);
    };

    VictorEngine.ThrowableObjects.initializeMethodsStack = Window_BattleLog.prototype.initializeMethodsStack;
    Window_BattleLog.prototype.initializeMethodsStack = function() {
        if (VictorEngine.ThrowableObjects.initializeMethodsStack) {
            VictorEngine.ThrowableObjects.initializeMethodsStack.call(this);
        }
        this._throwingSubject = [];
    };

    VictorEngine.ThrowableObjects.push = Window_BattleLog.prototype.push;
    Window_BattleLog.prototype.push = function(methodName) {
        if (this._methodStack && (this._stackIndex || this.methodStackActive())) {
            this.pushMethodsStack.apply(this, arguments);
        } else {
            VictorEngine.ThrowableObjects.push.apply(this, arguments);
        }
    };

    VictorEngine.ThrowableObjects.updateWindowBattleLog = Window_BattleLog.prototype.update;
    Window_BattleLog.prototype.update = function() {
        if (this._methodStack && this.methodStackActive() && !Imported['VE - Battle Motions']) {
            this.updateMethodsStack();
        } else {
            VictorEngine.ThrowableObjects.updateWindowBattleLog.call(this);
        }
    };

    VictorEngine.ThrowableObjects.isBusy = Window_BattleLog.prototype.isBusy;
    Window_BattleLog.prototype.isBusy = function() {
        return VictorEngine.ThrowableObjects.isBusy.call(this) || (this._methodStack && this.methodStackActive());
    };

    VictorEngine.ThrowableObjects.updateWait = Window_BattleLog.prototype.updateWait;
    Window_BattleLog.prototype.updateWait = function() {
        return VictorEngine.ThrowableObjects.updateWait.call(this) || (this._methodStack && this.methodStackActive());
    };

    VictorEngine.ThrowableObjects.startAction = Window_BattleLog.prototype.startAction;
    Window_BattleLog.prototype.startAction = function(subject, action, targets) {
        VictorEngine.ThrowableObjects.startAction.call(this, subject, action, targets);
        this.setupStartAction(subject, action, targets);
    };

    VictorEngine.ThrowableObjects.updateStackWaitMode = Window_BattleLog.prototype.updateStackWaitMode;
    Window_BattleLog.prototype.updateStackWaitMode = function(index) {
        var battler = this.stackBattler(index);
        var waitMode = this._stackWaitMode[index];
        if (waitMode && waitMode.contains('throwing')) {
            var subject = this._throwingSubject[index];
            if (subject && subject.isThrowing(battler)) {
                return true;
            }
            this.removeWaitMode(index, 'throwing');
            this._throwingSubject[index] = null;
        }
        return VictorEngine.ThrowableObjects.updateStackWaitMode.call(this, index);
    };

    VictorEngine.ThrowableObjects.prepareUniqueActionStep1 = Window_BattleLog.prototype.prepareUniqueActionStep1;
    Window_BattleLog.prototype.prepareUniqueActionStep1 = function(subject, action, target, repeat) {
        this.push('startThrow', subject, action, target, 'before');
        this.push('waitForThrow', this._stackIndex, subject);
        VictorEngine.ThrowableObjects.prepareUniqueActionStep1.call(this, subject, action, target, repeat);
    };

    VictorEngine.ThrowableObjects.prepareUniqueActionStep2 = Window_BattleLog.prototype.prepareUniqueActionStep2;
    Window_BattleLog.prototype.prepareUniqueActionStep2 = function(subject, action, target, repeat) {
        this.push('startThrow', subject, action, target, 'during');
        VictorEngine.ThrowableObjects.prepareUniqueActionStep2.call(this, subject, action, target, repeat);
    };

    VictorEngine.ThrowableObjects.prepareUniqueActionStep3 = Window_BattleLog.prototype.prepareUniqueActionStep3;
    Window_BattleLog.prototype.prepareUniqueActionStep3 = function(subject, action, target, repeat) {
        this.push('startThrow', subject, action, target, 'after');
        VictorEngine.ThrowableObjects.prepareUniqueActionStep3.call(this, subject, action, target, repeat);
        this.push('waitForThrow', this._stackIndex, subject);
    };

    Window_BattleLog.prototype.waitForThrow = function(index, subject) {
        this._throwingSubject[index] = subject;
        this.setStackWaitMode(index, 'throwing');
    };

    Window_BattleLog.prototype.isThrowable = function(item, type) {
        return item.throwableObjects && item.throwableObjects[type];
    };

    Window_BattleLog.prototype.startThrow = function(subject, action, target, type) {
        var object = action.throwableObject(type)
        if (object) {
            target.battleSprite().startThrow(subject, target, object);
        }
    };

    Window_BattleLog.prototype.defaultMotionEffect = function(subject, action) {
        var motion = '';
        motion += 'throw: user to subject, before;';
        motion += 'wait: subject, throw;';
        motion += 'animation: subject, action;';
        motion += 'throw: user to subject, during;';
        motion += 'wait: subject, animation;';
        motion += 'throw: user to subject, after;';
        motion += 'effect: subject, 100%;';
        motion += 'wait: subject, throw;';
        motion += 'wait: subject, popup;';
        return motion;
    };

})();

//=============================================================================
// Sprite_Throw (with forced child positioning for animations)
//=============================================================================

function Sprite_Throw() {
    this.initialize.apply(this, arguments);
}

Sprite_Throw._lastId = 0;

Sprite_Throw.prototype = Object.create(Sprite_Base.prototype);
Sprite_Throw.prototype.constructor = Sprite_Throw;

(function() {

    Object.defineProperties(Sprite_Throw.prototype, {
        z: {
            get: function() { return this.throwZ(); },
            configurable: true
        },
        h: {
            get: function() { return this.throwH(); },
            configurable: true
        }
    });

    Sprite_Throw.prototype.initialize = function(subject, target, object) {
        Sprite_Base.prototype.initialize.call(this);
        this._subject = subject;
        this._target = target;
        this._object = object;
        this._throwId = Sprite_Throw._lastId++;
        this.initMembers();
    };

    Sprite_Throw.prototype.subject = function() { return this._subject; };
    Sprite_Throw.prototype.target = function() { return this._target; };
    Sprite_Throw.prototype.item = function() { return this._item; };
    Sprite_Throw.prototype.object = function() { return this._object; };
    Sprite_Throw.prototype.isMirrorAnimation = function() { return this._mirror; };

    Sprite_Throw.prototype.throwZ = function() {
        return 10000 + this.y + this._throwId * 0.001;
    };

    Sprite_Throw.prototype.throwH = function() {
        return this._homeY + this._offsetY + (this._duration > this._starting / 2 ? this._homeZ : this._targetZ);
    };

    Sprite_Throw.prototype.initMembers = function() {
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.setupBitmap();
        this.setupMovement();
        this.setupDuration();
        this.setupArc();
        this.setupAnimation('start');
    };

    Sprite_Throw.prototype.setupAnimation = function(timing) {
        var object = this.object();
        var source = object.returning ? this.target() : this.subject();
        if (timing === 'start' && object.anim && source === this.subject()) {
            this.subject().startAnimation(object.anim, this._mirror, 0);
        } else if (timing === 'end' && object.anim && source === this.subject()) {
            this.subject().startAnimation(object.anim, this._mirror, 0);
        }
    };

    Sprite_Throw.prototype.update = function() {
        Sprite_Base.prototype.update.call(this);
        if (this._delay > 0) { this._delay--; return; }
        if (!this._object) return;
        this.updateBitmap();
        this.updateGraphics();
        this.updateArc();
        this.updateMove();
        this.updateAngle();
        this.updatePosition();

        // ---- FORCE CHILD ANIMATIONS TO FOLLOW PARENT ----
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            if (child && child !== this) {
                child.x = 0;
                child.y = 0;
            }
        }
    };

    Sprite_Throw.prototype.setupMovement = function() {
        var object = this._object;
        var source = object.returning ? this._target : this._subject;
        var target = object.returning ? this._subject : this._target;
        var srcRight = source.isFacingRight();
        var trgRight = target.isFacingRight();
        var srcSprite = source.battleSprite();
        var trgSprite = target.battleSprite();
        var srcOffset = srcRight ? -object.start.x : object.start.x;
        var trgOffset = trgRight ? -object.end.x : object.end.x;

        function getCenterY(sprite) {
            if (!sprite) return 0;
            var frameH = sprite.height || 64;
            var anchorY = sprite.anchor ? sprite.anchor.y : 1.0;
            var scaledH = frameH * Math.abs(sprite.scale.y);
            return sprite.y - scaledH * anchorY + scaledH / 2;
        }

        var srcCenterY = getCenterY(srcSprite);
        var trgCenterY = getCenterY(trgSprite);

        this._homeX = srcSprite.x + srcOffset * (srcRight ? -1 : 1);
        this._homeY = srcCenterY + object.start.y;
        this._homeZ = srcCenterY + 4;
        this._targetX = trgSprite.x + trgOffset * (trgRight ? -1 : 1) - this._homeX;
        this._targetY = trgCenterY + object.end.y - this._homeY;
        this._targetZ = trgCenterY + 4;
        this._offsetX = 0;
        this._offsetY = 0;
        this._z = 9999;

        var baseRotation = 0;
        if (object.tiltDeg !== undefined) {
            baseRotation = object.tiltDeg * Math.PI / 180;
        } else if (object.autoTilt) {
            var trgCY = getCenterY(trgSprite);
            var diffY = trgCY - object.autoTilt.baseY;
            var angleDeg = diffY * object.autoTilt.factor;
            baseRotation = angleDeg * Math.PI / 180;
        } else if (object.angled) {
            baseRotation = Math.atan2(-this._targetY, this._targetX);
        }
        this.rotation = baseRotation + (object.spin || 0) * Math.PI / 180;
    };

    Sprite_Throw.prototype.setupDuration = function() {
        var object = this._object;
        var source = object.returning ? this._target : this._subject;
        var duration = object.duration;
        var arc = Math.abs(object.arc) || 0;
        var max = Math.max(this._targetY, arc);
        this._delay = object.delay;
        this._mirror = source.isFacingRight();
        this._distance = Math.sqrt(Math.pow(this._targetX, 2) + Math.pow(max, 2));
        this._duration = duration ? duration : this._distance * 5 / object.speed;
        this._duration = Math.max(Math.floor(this._duration / 2) * 2, 2);
        this._starting = this._duration;
        if (!this._imageType) this._duration = 0;
    };

    Sprite_Throw.prototype.setupArc = function() {
        var distance = Math.sqrt(Math.abs(this._targetX) + 400);
        this._arcPeak = Math.floor(Math.abs(this._object.arc) * distance / 20);
        this._arcInvert = this._object.arc < 0;
        this._arcHeight = 0;
    };

    Sprite_Throw.prototype.setupBitmap = function() {
        var image = this.setupObjectImage();
        if (image) {
            switch (image.type) {
            case 'icon':
                this._imageType = image.type;
                this._iconIndex = image.id;
                break;
            case 'picture':
                this._imageType = image.type;
                this._imageFile = image.name;
                break;
            case 'animation':
                if (Imported['VE - Loop Animation']) {
                    this._imageType = image.type;
                    this._animationId = image.id;
                }
                break;
            }
        }
    };

    Sprite_Throw.prototype.setupObjectImage = function() {
        var object = this._object.image;
        if (object.type === 'weapon') {
            if (this._subject.isActor()) {
                var weapon = this._subject.weapons()[0];
                if (weapon) return weapon.throwableObjects.item;
            } else {
                return this._subject.enemy().throwableObjects.item;
            }
        }
        return object;
    };

    Sprite_Throw.prototype.updateBitmap = function() {
        if (this._iconIndex && this._iconIndex !== this._thworIcon) {
            this._thworIcon = this._iconIndex;
            this.bitmap = ImageManager.loadSystem('IconSet');
            this.bitmap.addLoadListener(this.updateIcon.bind(this));
        }
        if (this._imageFile && this._imageFile !== this._thworImage) {
            this._thworImage = this._imageFile;
            this.bitmap = ImageManager.loadPicture(this._imageFile);
            this.bitmap.addLoadListener(this.updatePicture.bind(this));
        }
        if (this._animationId && this._animationId !== this._thworImage) {
            this._thworImage = this._animationId;
            this.addLoopAnimation({
                id: this._animationId,
                type: 'throw',
                loop: 1
            });
        }
    };

    Sprite_Throw.prototype.updateMove = function() {
        if (this._duration > 0) {
            var d = this._duration;
            this._offsetX = (this._offsetX * (d - 1) + this._targetX) / d;
            this._offsetY = (this._offsetY * (d - 1) + this._targetY) / d;
            this._duration--;
            if (this._duration === 0) this.onThrowEnd();
        }
    };

    Sprite_Throw.prototype.updateArc = function() {
        if (this._arcPeak && this._duration > 0) {
            var starting = this._starting / 2;
            var gravity = 2 * this._arcPeak / starting;
            if (this._arcInvert) gravity *= -1;
            if (this._duration > starting) {
                var duration = this._duration - starting;
                this._arcHeight += gravity * duration / starting;
            } else {
                var duration = this._duration;
                this._arcHeight -= gravity * (starting - duration + 1) / starting;
            }
            if (gravity < 0 && this._arcHeight > 0) this._arcHeight = 0;
            if (gravity > 0 && this._arcHeight < 0) this._arcHeight = 0;
        }
    };

    Sprite_Throw.prototype.updatePosition = function() {
        this.x = this._homeX + this._offsetX;
        this.y = this._homeY + this._offsetY - this._arcHeight;
    };

    Sprite_Throw.prototype.updateAngle = function() {
        if (this._object.spin) this.rotation += this._object.spin;
        if (this._object.angle) this.rotation = this._object.angle * Math.PI / 180;
    };

    Sprite_Throw.prototype.updateGraphics = function() {
        switch (this._imageType) {
        case 'icon': this.updateIcon(); break;
        case 'picture': this.updatePicture(); break;
        }
    };

    Sprite_Throw.prototype.updateIcon = function() {
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = this._iconIndex % 16 * pw;
        var sy = Math.floor(this._iconIndex / 16) * ph;
        this.setFrame(sx, sy, pw, ph);
    };

    Sprite_Throw.prototype.updatePicture = function() {
        if (this.bitmap.width && this.bitmap.height) {
            this.setFrame(0, 0, this.bitmap.width, this.bitmap.height);
        }
    };

    Sprite_Throw.prototype.onThrowEnd = function() {
        this.setupAnimation('end');
    };

    Sprite_Throw.prototype.remove = function() {
        BattleManager.removeThrowableObjects(this);
        if (this.parent) {
            this.parent.removeChild(this);
            if (this._animationId) {
                Object.keys(this._loopAnimations).forEach(function(type) {
                    this.clearLoopAnimation(type)
                }, this);
            }
        }
    };

    Sprite_Throw.prototype.isPlaying = function() {
        return this._duration > 0 || this._delay > 0;
    };

    Sprite_Throw.prototype.isThrowing = function(subject, target) {
        return ((this._subject === subject && this._target === target) ||
            (this._subject === target && this._target === subject));
    };

})();

// ============================================================================
// Global createThrow
// ============================================================================

window.createThrow = function(user, target, imageType, imageId,
                               startX, startY, endX, endY,
                               duration, arc, spin, delay, anim,
                               tiltDeg, autoTiltBaseY, autoTiltFactor) {
    var spr = target.battleSprite ? target.battleSprite() : null;
    if (!spr || !user) return;

    var obj = {
        image: { type: imageType || 'animation', id: imageId || 0, name: '' },
        start: { x: startX || 0, y: startY || 0 },
        end:   { x: endX || 0,   y: endY || 0   },
        duration: duration || 30,
        speed: 100,
        delay: delay || 0,
        spin: spin || 0,
        arc: arc || 0,
        anim: anim || 0,
        angled: false,
        returning: false
    };

    if (tiltDeg !== undefined) obj.tiltDeg = tiltDeg;
    if (autoTiltBaseY !== undefined) {
        obj.autoTilt = { baseY: autoTiltBaseY, factor: autoTiltFactor || 0.2 };
    }

    var throwSpr = new Sprite_Throw(user, target, obj);
    if (!spr._throwableObjects) spr._throwableObjects = [];
    spr._throwableObjects.push(throwSpr);

    var parent = spr.parent;
    if (parent) {
        parent.addChild(throwSpr);
        BattleManager.addThrowableObjects(throwSpr);
    } else {
        SceneManager._scene.addChild(throwSpr);
        BattleManager.addThrowableObjects(throwSpr);
    }
};

// ============================================================================
// Sprite_Battler z-index fix (мерцание)
// ============================================================================
(function() {
    var _Sprite_Battler_update = Sprite_Battler.prototype.update;
    Sprite_Battler.prototype.update = function() {
        _Sprite_Battler_update.call(this);
        if (this._battler) {
            var index = 0;
            if (this._battler.isActor()) {
                index = $gameParty.members().indexOf(this._battler);
            } else {
                index = $gameTroop.members().indexOf(this._battler);
            }
            this.z = this.y + index * 0.001;
        }
    };
})();

// ============================================================================
// ANIMATION LOGGING – вывод координат любой анимации при появлении
// ============================================================================
(function() {
    var _Sprite_Battler_startAnimation = Sprite_Battler.prototype.startAnimation;
    Sprite_Battler.prototype.startAnimation = function(animationId, mirror, delay) {
        if (this._battler) {
            console.log('Animation', animationId, 'started on', this._battler.name(),
                        'at position x:', this.x, 'y:', this.y);
        }
        _Sprite_Battler_startAnimation.call(this, animationId, mirror, delay);
    };
})();

// YEP compatibility
if (Imported.YEP_BattleEngineCore) {
    var _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        var item = this.item();
        var hasYep = item && (item.wholeActions || item.targetActions);
        var stack = new Error().stack;
        var fromVE = stack && stack.indexOf('updateStackAction') !== -1;
        if (hasYep && fromVE) return;
        _Game_Action_apply.call(this, target);
    };

    var _Sprite_Throw_setupAnimation = Sprite_Throw.prototype.setupAnimation;
    Sprite_Throw.prototype.setupAnimation = function(timing) {
        var subject = this.subject();
        if (subject) {
            var action = subject.currentAction();
            if (action) {
                var item = action.item();
                if (item && (item.wholeActions || item.targetActions)) return;
            }
        }
        _Sprite_Throw_setupAnimation.call(this, timing);
    };
}
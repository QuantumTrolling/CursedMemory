// =============================================================================
// Complete Fix: VE_ThrowableObjects Visual + YEP Compatibility + Tilt
// =============================================================================
// Исправляет:
//   1. Визуальный центр для акторов и врагов с учётом scale (дыхание/плавание).
//   2. Принудительный z-порядок снарядов (всегда поверх баталеров).
//   3. Блокировку двойного урона и анимаций для YEP Action Sequences.
//   4. Функцию createThrow для вызова в секвенциях (всегда доступна).
//   5. Наклон летящего спрайта (tilt) – фиксированный или автонаклон.
// =============================================================================

(function() {
    'use strict';

    if (!Imported['VE - Throwable Objects']) return;

    // -------------------------------------------------------------------------
    // 1. Визуальная высота
    // -------------------------------------------------------------------------
    Sprite_Battler.prototype.getVisualHeight = function() {
        if (this.bitmap) {
            return this.bitmap.height * Math.abs(this.scale.y);
        }
        return 0;
    };

    // Метод больше не нужен для наклона, но оставлен для совместимости
    Sprite_Battler.prototype.visualCenterY = function() {
        return this.y - this.getVisualHeight() * this.anchor.y;
    };

    if (typeof Sprite_Actor !== 'undefined') {
        Sprite_Actor.prototype.getVisualHeight = function() {
            if (this._mainSprite && this._mainSprite.bitmap && this._mainSprite.bitmap.height > 0) {
                var frameHeight = this._mainSprite.bitmap.height / 6;
                return frameHeight * Math.abs(this.scale.y);
            }
            return Sprite_Battler.prototype.getVisualHeight.call(this);
        };
    }

    if (typeof Sprite_Enemy !== 'undefined') {
        Sprite_Enemy.prototype.getVisualHeight = function() {
            if (this._mainSprite && this._mainSprite.bitmap && this._mainSprite.bitmap.height > 0) {
                var frameHeight = this._mainSprite.bitmap.height / 6;
                return frameHeight * Math.abs(this.scale.y);
            }
            return Sprite_Battler.prototype.getVisualHeight.call(this);
        };
    }

    // -------------------------------------------------------------------------
    // 2. setupMovement с учётом Anchor и НАКЛОНОМ
    // -------------------------------------------------------------------------
    var _Sprite_Throw_setupMovement_v2 = Sprite_Throw.prototype.setupMovement;
    Sprite_Throw.prototype.setupMovement = function() {
        var object = this.object();
        var source = object.returning ? this.target() : this.subject();
        var target = object.returning ? this.subject() : this.target();
        var srcRight = source.isFacingRight();
        var trgRight = target.isFacingRight();
        var srcSprite = source.battleSprite();
        var trgSprite = target.battleSprite();
        var srcOffset = srcRight ? -object.start.x : object.start.x;
        var trgOffset = trgRight ? -object.end.x : object.end.x;

        // --- Функция получения реального визуального центра ---
        function getVisualCenter(sprite) {
            var frameH = 64;
            var anchorY = 1.0;
            if (sprite._mainSprite && sprite._mainSprite.bitmap) {
                frameH = sprite._mainSprite.bitmap.height / 6;
                anchorY = sprite._mainSprite.anchor.y;
            } else if (sprite.bitmap && sprite.bitmap.height > 0) {
                frameH = sprite.bitmap.height;
                anchorY = sprite.anchor.y;
            }
            var scaledH = frameH * Math.abs(sprite.scale.y);
            var visualTop = sprite.y - scaledH * anchorY;
            return visualTop + scaledH / 2;
        }

        var srcCenterY = getVisualCenter(srcSprite);
        var trgCenterY = getVisualCenter(trgSprite);

        this._homeX = srcSprite.x + srcOffset * (srcRight ? -1 : 1);
        this._homeY = srcCenterY + object.start.y;
        this._homeZ = srcCenterY + 4;
        this._targetX = trgSprite.x + trgOffset * (trgRight ? -1 : 1) - this._homeX;
        this._targetY = trgCenterY + object.end.y - this._homeY;
        this._targetZ = trgCenterY + 4;
        this._offsetX = 0;
        this._offsetY = 0;
        this._z = 9999;

        // ----- НАКЛОН -----
        var baseRotation = 0;
        if (object.tiltDeg !== undefined) {
            baseRotation = object.tiltDeg * Math.PI / 180;
        } else if (object.autoTilt) {
            // Используем ту же getVisualCenter, что и для вычисления позиции
            var trgCY = trgSprite ? getVisualCenter(trgSprite) : this._homeY + this._targetY;
            var diffY = trgCY - object.autoTilt.baseY;
            var angleDeg = diffY * object.autoTilt.factor;
            baseRotation = angleDeg * Math.PI / 180;
        } else if (object.angled) {
            baseRotation = Math.atan2(-this._targetY, this._targetX);
        }
        this.rotation = baseRotation + (object.spin || 0) * Math.PI / 180;
    };

    // ============================================================
    // 3. Функция createThrow (доступна всегда)
    // ============================================================
    window.createThrow = function(user, target, imageType, imageId,
                                   startX, startY, endX, endY,
                                   duration, arc, spin, delay, anim,
                                   tiltDeg, autoTiltBaseY, autoTiltFactor) {
        var spr = target.battleSprite ? target.battleSprite() : null;
        if (!spr) {
            console.error("createThrow: target.battleSprite() is null. target:", target);
            return;
        }
        if (!user) {
            console.error("createThrow: user is undefined");
            return;
        }

        // Ограничение отклонения Y от 420 вдвое (сохранено из оригинала)
        var baseY = 420;
        var rawTargetY = spr.y - spr.center().y;
        var diff = rawTargetY - baseY;
        var adjustedTargetY = baseY + diff / 2;
        endY += adjustedTargetY - spr.y + spr.center().y;

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

        if (tiltDeg !== undefined) {
            obj.tiltDeg = tiltDeg;
        }
        if (autoTiltBaseY !== undefined) {
            obj.autoTilt = {
                baseY: autoTiltBaseY,
                factor: autoTiltFactor || 0.2
            };
        }

        var throwSpr = new Sprite_Throw(user, target, obj);
        if (!spr._throwableObjects) spr._throwableObjects = [];
        spr._throwableObjects.push(throwSpr);

        var parent = spr.parent;
        if (parent) {
            parent.addChild(throwSpr);
            BattleManager.addThrowableObjects(throwSpr);
        } else {
            console.warn("createThrow: sprite has no parent, adding to scene directly?");
        }
    };

    // ============================================================
    // 4. Совместимость с YEP Action Sequences (применяется, если YEP есть)
    // ============================================================
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

})();
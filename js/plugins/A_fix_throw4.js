// =============================================================================
// Complete Fix: VE_ThrowableObjects Visual + YEP Compatibility
// =============================================================================
// Исправляет:
//   1. Визуальный центр для акторов и врагов с учётом scale (дыхание/плавание).
//   2. Принудительный z-порядок снарядов (всегда поверх баталеров).
//   3. Блокировку двойного урона и анимаций для YEP Action Sequences.
//   4. Функцию createThrow для вызова в секвенциях.
// =============================================================================

(function() {
    'use strict';

    if (!Imported['VE - Throwable Objects']) return;

    // -------------------------------------------------------------------------
    // 1. Визуальная высота для всех типов спрайтов
    // -------------------------------------------------------------------------
    Sprite_Battler.prototype.getVisualHeight = function() {
        if (this.bitmap) {
            return this.bitmap.height * Math.abs(this.scale.y);
        }
        return 0;
    };

    Sprite_Battler.prototype.visualCenterY = function() {
        return this.y - this.getVisualHeight() * this.anchor.y;
    };

    // Акторы (Sprite_Actor) используют _mainSprite, а не this.bitmap
    if (typeof Sprite_Actor !== 'undefined') {
        Sprite_Actor.prototype.getVisualHeight = function() {
            if (this._mainSprite && this._mainSprite.bitmap && this._mainSprite.bitmap.height > 0) {
                var frameHeight = this._mainSprite.bitmap.height / 6; // стандартный лист 6 строк
                return frameHeight * Math.abs(this.scale.y);
            }
            return Sprite_Battler.prototype.getVisualHeight.call(this);
        };
    }

    // Враги с анимированным боковым видом (YEP_X_AnimatedSVEnemies)
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
// 2. setupMovement с учётом Anchor кастомизированных врагов
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
        var frameH = 64; // запасной вариант
        var anchorY = 1.0;
        // Для SV-акторов или врагов с _mainSprite
        if (sprite._mainSprite && sprite._mainSprite.bitmap) {
            frameH = sprite._mainSprite.bitmap.height / 6; // высота одного кадра
            anchorY = sprite._mainSprite.anchor.y;
        } else if (sprite.bitmap && sprite.bitmap.height > 0) {
            frameH = sprite.bitmap.height;
            anchorY = sprite.anchor.y;
        }
        var scaledH = frameH * Math.abs(sprite.scale.y);
        // Верхняя граница спрайта с учётом anchor
        var visualTop = sprite.y - scaledH * anchorY;
        // Визуальный центр = верх + половина высоты
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
};

    // -------------------------------------------------------------------------
    // 3. Совместимость с YEP Action Sequences (без двойного урона/анимаций)
    // -------------------------------------------------------------------------
    if (Imported.YEP_BattleEngineCore) {
        // Блокируем урон от VE для навыков с YEP Sequence
        var _Game_Action_apply = Game_Action.prototype.apply;
        Game_Action.prototype.apply = function(target) {
            var item = this.item();
            var hasYep = item && (item.wholeActions || item.targetActions);
            var stack = new Error().stack;
            var fromVE = stack && stack.indexOf('updateStackAction') !== -1;
            if (hasYep && fromVE) return;
            _Game_Action_apply.call(this, target);
        };

        // Блокируем дублирующуюся анимацию на субъекте
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

        window.createThrow = function(user, target, imageType, imageId,
                               startX, startY, endX, endY,
                               duration, arc, spin, delay, anim) {
    var spr = target.battleSprite ? target.battleSprite() : null;
    if (!spr) return;

    // === Ограничение отклонения Y от 420 вдвое ===
    var baseY = 420;

    // исходная конечная Y-координата (до ограничения)
    var rawTargetY = spr.y - spr.center().y;
    var diff = rawTargetY - baseY;
    var adjustedTargetY = baseY + diff / 2;
    // пересчитываем endY так, чтобы итоговая позиция стала adjustedTargetY
    endY += adjustedTargetY - spr.y + spr.center().y;
    // === Конец ограничения ===

    var obj = {
        image: { type: imageType, id: imageId || 0, name: '' },
        start: { x: startX, y: startY },
        end:   { x: endX,   y: endY   },
        duration: duration || 30,
        speed: 100,
        delay: delay || 0,
        spin: spin || 0,
        arc: arc || 0,
        anim: anim || 0,
        angled: false,
        returning: false
    };

    var throwSpr = new Sprite_Throw(user, target, obj);
    if (!spr._throwableObjects) spr._throwableObjects = [];
    spr._throwableObjects.push(throwSpr);

    var parent = spr.parent;
    if (parent) {
        parent.addChild(throwSpr);
        BattleManager.addThrowableObjects(throwSpr);
    }
};
    }

})();
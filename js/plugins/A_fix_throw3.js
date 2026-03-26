//=============================================================================
// Fix: VE_ThrowableObjects + YEP_BattleEngineCore
// Позволяет вызывать снаряды внутри Action Sequences и корректно удалять их
//=============================================================================

(function() {

    if (!Imported['VE - Throwable Objects'] || !Imported.YEP_BattleEngineCore) return;

    // 1. Блокируем двойной урон от VE
    var originalApply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        var item = this.item();
        var hasYepSequence = item && (item.wholeActions || item.targetActions);
        var stack = new Error().stack;
        var fromVE = stack && stack.indexOf('updateStackAction') !== -1;

        if (hasYepSequence && fromVE) {
            return;
        }
        originalApply.call(this, target);
    };

    // 2. Блокируем лишние анимации VE (чтобы не дублировать)
    if (Sprite_Throw && Sprite_Throw.prototype.setupAnimation) {
        var originalSetupAnimation = Sprite_Throw.prototype.setupAnimation;
        Sprite_Throw.prototype.setupAnimation = function(timing) {
            var item = this._subject ? this._subject.currentAction() : null;
            if (item) {
                var hasYepSequence = item.item() && (item.item().wholeActions || item.item().targetActions);
                if (hasYepSequence) {
                    return;
                }
            }
            originalSetupAnimation.call(this, timing);
        };
    }

    // 3. Глобальная функция для вызова броска в action sequences
    window.createThrow = function(user, target, imageType, imageId, startX, startY, endX, endY, duration, arc, spin, delay, anim) {
        // Получаем спрайт цели
        var spr = BattleManager.getSprite ? BattleManager.getSprite(target) : target.battleSprite();
        if (!spr) {
            console.log('[createThrow] No sprite for target', target.name());
            return;
        }

        // Формируем объект броска (все поля обязательны)
        var obj = {
            image: { type: imageType, id: imageId, name: '' },
            start: { x: startX, y: startY },
            end: { x: endX, y: endY },
            duration: duration,
            speed: 100,
            delay: delay || 0,
            spin: spin || 0,
            arc: arc || 0,
            anim: anim || 0,
            angled: false,
            returning: false
        };

        var throwSpr = new Sprite_Throw(user, target, obj);

        // Добавляем в массив спрайта цели для автоматического удаления
        if (!spr._throwableObjects) spr._throwableObjects = [];
        spr._throwableObjects.push(throwSpr);

        // Добавляем на сцену
        var parent = spr.parent || SceneManager._scene._spriteset;
        if (parent) {
            parent.addChild(throwSpr);
            BattleManager.addThrowableObjects(throwSpr);
        } else {
            console.log('[createThrow] No parent for sprite');
        }
    };

    console.log('[FIX] VE_ThrowableObjects + YEP_BattleEngineCore: damage/animations blocked, createThrow registered');

})();
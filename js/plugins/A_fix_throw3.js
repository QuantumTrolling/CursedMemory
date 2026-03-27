//=============================================================================
// Fix: VE_ThrowableObjects + YEP_BattleEngineCore
// Позволяет вызывать снаряды внутри Action Sequences, корректно удалять их
// и отображать поверх всех спрайтов (включая врагов)
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

    // 3. Создаём отдельный слой для снарядов поверх battlefield
    var _Spriteset_Battle_createBattleField = Spriteset_Battle.prototype.createBattleField;
    Spriteset_Battle.prototype.createBattleField = function() {
        _Spriteset_Battle_createBattleField.call(this);
        // Контейнер поверх всего
        this._throwLayer = new Sprite();
        this.addChild(this._throwLayer);
    };

    // 4. Перенаправляем создание снарядов в этот слой
    // Сохраняем оригинальный метод startThrow (из VE), если он уже есть, иначе создаём заглушку
    var _startThrow = Sprite_Battler.prototype.startThrow;
    Sprite_Battler.prototype.startThrow = function(subject, target, object) {
        // Вызываем оригинальный метод VE, если он существует
        if (_startThrow) {
            _startThrow.call(this, subject, target, object);
        } else {
            // Если startThrow не определён (например, VE не установлен?), создаём снаряд вручную
            var sprite = new Sprite_Throw(subject, target, object);
            this._throwableObjects = this._throwableObjects || [];
            this._throwableObjects.push(sprite);
            BattleManager.addThrowableObjects(sprite);
        }

        // Находим только что созданный спрайт и перемещаем его в _throwLayer
        var spriteset = SceneManager._scene._spriteset;
        if (spriteset && spriteset._throwLayer) {
            // Последний добавленный спрайт
            var lastSprite = this._throwableObjects[this._throwableObjects.length - 1];
            if (lastSprite && lastSprite.parent !== spriteset._throwLayer) {
                if (lastSprite.parent) {
                    lastSprite.parent.removeChild(lastSprite);
                }
                spriteset._throwLayer.addChild(lastSprite);
            }
        }
    };

    // 5. Убираем старую сортировку, так как она больше не нужна (снаряды в отдельном слое)
    // Но для совместимости можно оставить заглушки, чтобы не ломать код
    // Переопределяем battleFieldDepthCompare, чтобы не влиять на сортировку (снаряды больше не в battlefield)
    Spriteset_Battle.prototype.battleFieldDepthCompare = function(a, b) {
        // Снаряды теперь не в _battleField, поэтому стандартная сортировка работает как обычно
        return 0; // можно вернуть 0 или вызвать оригинал, но оригинал может быть не определён
    };
    // Переопределяем updateZCoordinates, чтобы не трогать снаряды
    var _updateZCoordinates = Spriteset_Battle.prototype.updateZCoordinates;
    Spriteset_Battle.prototype.updateZCoordinates = function() {
        _updateZCoordinates.call(this);
        // Ничего дополнительного не делаем, так как снаряды в отдельном слое
    };

    // 6. Глобальная функция для вызова броска в action sequences
    window.createThrow = function(user, target, imageType, imageId, startX, startY, endX, endY, duration, arc, spin, delay, anim) {
        // Получаем спрайт цели (для определения parent? теперь не нужно)
        var spr = BattleManager.getSprite ? BattleManager.getSprite(target) : target.battleSprite();
        if (!spr) {
            console.log('[createThrow] No sprite for target', target.name());
            return;
        }

        // Формируем объект броска
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

        // Добавляем в специальный слой
        var spriteset = SceneManager._scene._spriteset;
        if (spriteset && spriteset._throwLayer) {
            spriteset._throwLayer.addChild(throwSpr);
            BattleManager.addThrowableObjects(throwSpr);
        } else {
            console.log('[createThrow] No throw layer');
        }
    };

    // 7. Дополнительно: при удалении спрайта нужно удалять его из слоя
    // Это уже обрабатывается в Sprite_Throw.prototype.remove, но нужно убедиться, что remove вызывается
    // Можно переопределить remove для совместимости
    var _remove = Sprite_Throw.prototype.remove;
    Sprite_Throw.prototype.remove = function() {
        BattleManager.removeThrowableObjects(this);
        if (this.parent) {
            this.parent.removeChild(this);
            if (this._animationId) {
                Object.keys(this._loopAnimations).forEach(function(type) {
                    this.clearLoopAnimation(type);
                }, this);
            }
        }
    };

    console.log('[FIX] VE_ThrowableObjects + YEP_BattleEngineCore: top layer implemented, sorting conflicts resolved');
})();
/*:
 * @plugindesc v1.4 Альтернативный метод – через z-индекс
 */
(function() {
    var _BattleManager_startAction = BattleManager.startAction;
    var _BattleManager_endAction = BattleManager.endAction;
    var savedZ = {};

    BattleManager.startAction = function() {
        _BattleManager_startAction.call(this);
        var subject = this._subject;
        if (!subject) return;
        var sprite = subject.battler();
        if (!sprite) return;

        // Сохраняем оригинальный z всех спрайтов
        var spriteset = SceneManager._scene._spriteset;
        var all = spriteset.battlerSprites();
        all.forEach(function(s) {
            var b = s._battler;
            if (b && !savedZ[b._objectId]) savedZ[b._objectId] = s.z;
        });

        // Поднимаем субъект выше максимального z среди противоположной стороны
        var oppositeSide = subject.isActor() ? 'enemy' : 'actor';
        var maxOppositeZ = -Infinity;
        all.forEach(function(s) {
            var b = s._battler;
            if (b && ((oppositeSide === 'enemy' && b.isEnemy()) || (oppositeSide === 'actor' && b.isActor()))) {
                if (s.z > maxOppositeZ) maxOppositeZ = s.z;
            }
        });
        if (maxOppositeZ > -Infinity) sprite.z = maxOppositeZ + 1;
    };

    BattleManager.endAction = function() {
        var spriteset = SceneManager._scene._spriteset;
        if (spriteset) {
            var all = spriteset.battlerSprites();
            all.forEach(function(s) {
                var b = s._battler;
                if (b && savedZ[b._objectId] !== undefined) {
                    s.z = savedZ[b._objectId];
                }
            });
        }
        savedZ = {};
        _BattleManager_endAction.call(this);
    };
})();
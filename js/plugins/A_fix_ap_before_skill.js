(function() {
    // Сохраняем MP перед useSkill
    var _Game_BattlerBase_useSkill = Game_BattlerBase.prototype.useSkill;
    Game_BattlerBase.prototype.useSkill = function(skill) {
        this._mpBeforeSkill = this.mp;
        _Game_BattlerBase_useSkill.call(this, skill);
    };

    // Удаляем флаг только при завершении всех действий (конец фазы)
    var _Game_Battler_onAllActionsEnd = Game_Battler.prototype.onAllActionsEnd;
    Game_Battler.prototype.onAllActionsEnd = function() {
        _Game_Battler_onAllActionsEnd.call(this);
        delete this._mpBeforeSkill;
    };

    // Также чистим, если персонаж умер или сбежал
    var _Game_Battler_die = Game_Battler.prototype.die;
    Game_Battler.prototype.die = function() {
        delete this._mpBeforeSkill;
        _Game_Battler_die.call(this);
    };
})();
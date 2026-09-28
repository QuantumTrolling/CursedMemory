/*:
 * @plugindesc Позволяет навыкам/предметам с <Any Ally> выбирать любого союзника, включая мёртвых.
 * @author 
 * @help
 * Поместите этот плагин ниже YEP_TargetCore.js.
 * 
 * На навыке или предмете:
 * <Any Ally>
 * 
 * В базе данных выберите scope "1 Ally" или "1 Ally (Dead)".
 */

(function() {
    var _Game_Action_makeTargets = Game_Action.prototype.makeTargets;
    Game_Action.prototype.makeTargets = function() {
        if (this.item() && this.item().meta['Any Ally']) {
            var unit = this.friendsUnit();
            var index = this._targetIndex;
            if (index < 0) index = 0;
            var member = unit.members()[index];
            return member ? [member] : [];
        }
        return _Game_Action_makeTargets.call(this);
    };

    var _Window_BattleActor_isOk = Window_BattleActor.prototype.isOk;
    Window_BattleActor.prototype.isOk = function() {
        var action = BattleManager.inputtingAction();
        if (action && action.item() && action.item().meta['Any Ally']) {
            if (!action.needsSelection()) return false;
            if (action.isForOpponent()) return false;
            return true;
        }
        return _Window_BattleActor_isOk.call(this);
    };
})();
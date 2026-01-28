/*:
 * @plugindesc Fix MOG HUD target list for self-only skills
 * @author You
 */

(function() {

    const _Game_Action_needsSelection = Game_Action.prototype.needsSelection;
    Game_Action.prototype.needsSelection = function() {

        const item = this.item();
        if (!item) return _Game_Action_needsSelection.call(this);

        // scope 11 = User
        if (item.scope === 11) {
            return false; // 🚫 НЕТ выбора цели
        }

        return _Game_Action_needsSelection.call(this);
    };

})();
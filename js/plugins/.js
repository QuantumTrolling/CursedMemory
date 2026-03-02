/*:
 * @plugindesc Fix for MOG_BattleHud – correct actor selection click on bottom row
 * @author Fix
 *
 * @help
 * This plugin fixes the issue where the bottom actor in the
 * ally selection window requires multiple clicks.
 *
 * Place this plugin BELOW MOG_BattleHud.
 */

(function() {

    var _mog_bhud_fix_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        _mog_bhud_fix_start.call(this);

        if (this._actorWindow) {
            // Move actor window to top layer
            this.removeChild(this._actorWindow);
            this.addChild(this._actorWindow);

            // Force very high z-order
            this._actorWindow.z = 9999;
        }

        if (this._enemyWindow) {
            // Optional: also protect enemy window from overlap
            this.removeChild(this._enemyWindow);
            this.addChild(this._enemyWindow);
            this._enemyWindow.z = 9999;
        }
    };

})();
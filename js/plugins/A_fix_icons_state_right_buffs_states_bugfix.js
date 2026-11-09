
/*:
 * @plugindesc Hides state icons in the target selection help window.
 * @author Custom
 */

(function() {
    'use strict';

    var _drawBattlerWithIcons =
        Window_Help.prototype.drawBattlerWithIcons;

    Window_Help.prototype.drawBattlerWithIcons = function(battler) {
        if (this._battler === battler) {
            this.contents.clear();
            this.resetFontSettings();

            this.drawText(
                battler.name(),
                0,
                0,
                this.contents.width,
                'center'
            );

            return;
        }

        _drawBattlerWithIcons.call(this, battler);
    };
})();

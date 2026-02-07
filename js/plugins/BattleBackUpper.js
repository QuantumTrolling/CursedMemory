/*:
 * @plugindesc Raises Battleback2 ignoring battle camera movement (MV)
 * @author You
 *
 * @param OffsetY
 * @type number
 * @default -120
 */

(function() {
    'use strict';

    var pluginName = document.currentScript.src.match(/([^\/]+)\.js$/)[1];
    var params = PluginManager.parameters(pluginName);
    var OFFSET_Y = Number(params.OffsetY || -120);

    var _SB_update = Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update = function() {
        _SB_update.call(this);

        if (this._battleback2Sprite && this._battleField) {
            // компенсируем смещение камеры
            this._battleback2Sprite.y =
                this._battleback2Sprite._baseY
                - this._battleField.y
                + OFFSET_Y;
        }
    };

    var _SB_updateBattleback = Spriteset_Battle.prototype.updateBattleback;
    Spriteset_Battle.prototype.updateBattleback = function() {
        _SB_updateBattleback.call(this);

        if (this._battleback2Sprite) {
            // сохраняем базовую позицию, которую задаёт движок
            if (this._battleback2Sprite._baseY === undefined) {
                this._battleback2Sprite._baseY = this._battleback2Sprite.y;
            }
        }
    };

})();

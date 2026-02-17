/*:
 * @plugindesc Ограничивает камеру Action Sequence Pack 3 в заданной зоне корректно
 * @author YourName
 *
 * @param Min X
 * @type number
 * @default -200
 *
 * @param Max X
 * @type number
 * @default 200
 *
 * @param Min Y
 * @type number
 * @default -100
 *
 * @param Max Y
 * @type number
 * @default 50
 */

(function() {
    const parameters = PluginManager.parameters('CameraZoneClamp');
    const MIN_X = Number(parameters['Min X'] || -200);
    const MAX_X = Number(parameters['Max X'] || 200);
    const MIN_Y = Number(parameters['Min Y'] || -100);
    const MAX_Y = Number(parameters['Max Y'] || 50);

    const _SB_update = Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update = function() {
        _SB_update.call(this);

        if (window.BattleCamera) {
            // Ограничиваем координаты камеры после всех вычислений
            BattleCamera.x = Math.max(MIN_X, Math.min(MAX_X, BattleCamera.x));
            BattleCamera.y = Math.max(MIN_Y, Math.min(MAX_Y, BattleCamera.y));
        }
    };
})();
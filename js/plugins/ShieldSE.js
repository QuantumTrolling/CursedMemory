//=============================================================================
// OctoBattle_ShieldSE.js
//=============================================================================
/*:
 * @plugindesc Play SE when enemy's Break Shield decreases in battle.
 * @author YourName
 *
 * @help This plugin requires Olivia_OctoBattle.js for the Break Shield system.
 * It plays a sound effect whenever an enemy's Break Shield value decreases.
 * Place it BELOW Olivia_OctoBattle in the Plugin Manager.
 *
 * To suppress the SE when calling setBreakShield directly from script,
 * pass true as the second argument:
 *   $gameTroop.members()[1].setBreakShield(10, true);
 *
 * @param seName
 * @desc SE filename (without extension) played when shield decreases.
 * @default ShieldBreak
 *
 * @param volume
 * @desc SE volume (0-100).
 * @type number
 * @min 0
 * @max 100
 * @default 80
 *
 * @param pitch
 * @desc SE pitch (50-150).
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @param pan
 * @desc SE pan (-100 left, 0 center, 100 right).
 * @type number
 * @min -100
 * @max 100
 * @default 0
 */

var Imported = Imported || {};
Imported.Olivia_OctoBattle_ShieldSE = true;

(function() {
    // Read plugin parameters
    var parameters = PluginManager.parameters('OctoBattle_ShieldSE');
    var seName = parameters['seName'] || 'M_shield_damage';
    var volume = Number(parameters['volume'] || 60);
    var pitch = Number(parameters['pitch'] || 100);
    var pan = Number(parameters['pan'] || 0);

    // Safety check: Olivia_OctoBattle must be loaded
    if (!Imported.Olivia_OctoBattle) {
        console.warn('OctoBattle Shield SE requires Olivia_OctoBattle.js');
        return;
    }

    // Alias setBreakShield to detect decreases on enemies
    var _Game_Battler_setBreakShield = Game_Battler.prototype.setBreakShield;
    Game_Battler.prototype.setBreakShield = function(value, skipSE) {
        var oldShield = this._currentBreakShield;
        // Вызываем оригинальный метод с одним аргументом (оригинал не знает про skipSE)
        _Game_Battler_setBreakShield.call(this, value);
        // Играем звук только если:
        // - это враг
        // - щит уменьшился
        // - НЕ передан skipSE = true
        if (this.isEnemy() && this._currentBreakShield < oldShield && !skipSE) {
            AudioManager.playSe({
                name: seName,
                volume: volume,
                pitch: pitch,
                pan: pan
            });
        }
    };
})();
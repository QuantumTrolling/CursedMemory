/*:
 * @plugindesc Removes all states except state ID 1 when a character dies.
 * @author YourName
 * 
 * @help
 * This plugin automatically removes all states from a character 
 * when they die, except for state ID 1.
 *
 * No plugin commands required.
 */

(function() {
    // Overriding the die function to remove all states except ID 1
    var _Game_BattlerBase_die = Game_BattlerBase.prototype.die;
    Game_BattlerBase.prototype.die = function() {
        _Game_BattlerBase_die.call(this); // Call the original die function
        
        // Remove all states except state ID 1
        this._states = this._states.filter(stateId => stateId === 1);
        this.refresh(); // Refresh the character to apply changes
    };
})();
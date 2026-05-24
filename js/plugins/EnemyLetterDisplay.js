//=============================================================================
// EnemyLetterDisplay.js
// Добавляет A, B, C к именам одинаковых врагов во всех боевых окнах.
//=============================================================================

var Imported = Imported || {};
Imported.EnemyLetterDisplay = true;

(function() {

// Патчим Game_Enemy.name(), чтобы оно сразу возвращало "Имя + буква"
var _Game_Enemy_name = Game_Enemy.prototype.name;
Game_Enemy.prototype.name = function() {
    var original = _Game_Enemy_name.call(this);
    if (!$gameParty.inBattle()) return original;
    var letter = this.letterForDuplicate();
    return letter ? original + ' ' + letter : original;
};

// Вычисляем букву (A, B, C…) среди живых врагов с тем же enemyId
Game_Enemy.prototype.letterForDuplicate = function() {
    var enemies = $gameTroop.aliveMembers().filter(function(e) {
        return e.enemyId() === this.enemyId();
    }, this);
    if (enemies.length <= 1) return '';
    var indexAmong = enemies.indexOf(this);
    return String.fromCharCode(65 + indexAmong); // 65 = 'A'
};

})();
//=============================================================================
// EnemyLetterDisplay.js
// Добавляет A, B, C к именам одинаковых врагов во всех боевых окнах.
// (буква присваивается один раз при старте боя и не меняется после смерти противников)
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

// Вычисляем букву (A, B, C…) среди **всех** врагов с тем же enemyId (включая мёртвых)
// Это гарантирует, что при смерти одного противника буквы у оставшихся не сдвигаются.
Game_Enemy.prototype.letterForDuplicate = function() {
    // Используем $gameTroop.members() вместо aliveMembers(), чтобы список был неизменным
    var enemies = $gameTroop.members().filter(function(e) {
        return e.enemyId() === this.enemyId();
    }, this);
    if (enemies.length <= 1) return '';
    var indexAmong = enemies.indexOf(this);
    return String.fromCharCode(65 + indexAmong); // 65 = 'A'
};

})();
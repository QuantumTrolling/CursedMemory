//=============================================================================
// NoEscapeMove.js
// Отключает визуальное движение актёров при попытке побега.
//=============================================================================

// 1. Отключаем анимацию побега у спрайта (движение вправо)
var _Sprite_Actor_performEscape = Sprite_Actor.prototype.performEscape;
Sprite_Actor.prototype.performEscape = function() {
    // Ничего не делаем — персонаж остаётся на месте
};

// 2. Отключаем движение, вызываемое из Game_Actor (при успешном побеге)
var _Game_Actor_performEscapeSuccess = Game_Actor.prototype.performEscapeSuccess;
Game_Actor.prototype.performEscapeSuccess = function() {
    // Убираем вызов startMove(300, 0, 60)
    // Можно оставить только звук (он уже воспроизводится в BattleManager)
};
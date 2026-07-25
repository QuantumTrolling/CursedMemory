//=============================================================================
// NoEscapeMove.js
// Отключает визуальное движение актёров при попытке побега.
// Теперь также гарантирует срабатывание Custom Remove Effect при успешном побеге.
//=============================================================================

// 1. Отключаем анимацию побега у спрайта (движение вправо)
var _Sprite_Actor_performEscape = Sprite_Actor.prototype.performEscape;
Sprite_Actor.prototype.performEscape = function() {
    // Ничего не делаем — персонаж остаётся на месте
};

// 2. Отключаем движение, вызываемое из Game_Actor, и принудительно удаляем состояния,
//    чтобы гарантированно сработал Custom Remove Effect из YEP_BuffsStatesCore.
var _Game_Actor_performEscapeSuccess = Game_Actor.prototype.performEscapeSuccess;
Game_Actor.prototype.performEscapeSuccess = function() {
    // Убираем оригинальный вызов startMove(300, 0, 60)
    // Принудительно снимаем все состояния, помеченные "Remove at Battle End"
    // Это вызовет Game_Battler.removeState, который в YEP_BuffsStatesCore
    // запустит <Custom Remove Effect>.
    this.removeBattleStates();
};
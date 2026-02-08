/*:
 * @plugindesc [FIX] Safe Party Commands V4 - предотвращает спавн невидимых врагов
 * @author ChatGPT
 *
 * @help
 * Исправляет баг с CommonEventPartyCommandsV3:
 * - Команды не запускают restartTurn/startTurn вне хода игрока
 * - Невидимые враги не появляются при возврате в бой
 * 
 * Подключайте **после** основного плагина.
 */

(function() {

    function safeCommand(originalCommand) {
        return function() {
            // Проверяем, что это активный бой и ход игрока
            if (!(SceneManager._scene instanceof Scene_Battle)) return;
            if (!BattleManager.isInputting()) return; // Только когда игрок выбирает команду
            if (BattleManager.isBattleEnd()) return; // Если бой закончился — не выполнять

            // Зарезервировать Common Event, но не трогать restartTurn/startTurn
            if (originalCommand.name === "commandEvent1") $gameTemp.reserveCommonEvent($gameTemp._event1ID || 1);
            if (originalCommand.name === "commandEvent2") $gameTemp.reserveCommonEvent($gameTemp._event2ID || 1);
            if (originalCommand.name === "commandEvent3") $gameTemp.reserveCommonEvent($gameTemp._event3ID || 1);
            if (originalCommand.name === "commandEvent4") $gameTemp.reserveCommonEvent($gameTemp._event4ID || 1);

            // Не трогаем ход боя
        };
    }

    // Патчим команды
    Scene_Battle.prototype.commandEvent1 = safeCommand(Scene_Battle.prototype.commandEvent1);
    Scene_Battle.prototype.commandEvent2 = safeCommand(Scene_Battle.prototype.commandEvent2);
    Scene_Battle.prototype.commandEvent3 = safeCommand(Scene_Battle.prototype.commandEvent3);
    Scene_Battle.prototype.commandEvent4 = safeCommand(Scene_Battle.prototype.commandEvent4);

})();

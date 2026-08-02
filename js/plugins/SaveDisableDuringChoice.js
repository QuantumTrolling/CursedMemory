//=============================================================================
// SaveDisableDuringChoice.js
//=============================================================================
/*:
 * @plugindesc v1.0 Запрещает сохранение игры во время активного окна выбора.
 * @author YourName
 *
 * @help
 * Этот плагин предотвращает сохранение в моменты, когда на экране отображается
 * окно выбора (команда "Показать выбор" в событиях). Это устраняет проблему,
 * при которой загрузка такого сохранения приводит к неправильной обработке
 * выбора вариантов.
 *
 * Команда "Сохранить" в главном меню становится недоступной (затемнённой),
 * если в данный момент активно окно выбора. Попытка открыть экран сохранения
 * через событие (команда "Открыть экран сохранения") будет проигнорирована.
 */

(function() {
    'use strict';

    // Проверяет, активно ли сейчас окно выбора
    function isChoiceActive() {
        return $gameMessage && $gameMessage.isChoice();
    }

    // --- Отключаем команду сохранения в меню ---
    var _Game_System_isSaveEnabled = Game_System.prototype.isSaveEnabled;
    Game_System.prototype.isSaveEnabled = function() {
        if (isChoiceActive()) return false;
        return _Game_System_isSaveEnabled.call(this);
    };

    // Дополнительная страховка: запрещаем вызов напрямую из Scene_Map
    var _Scene_Map_commandSave = Scene_Map.prototype.commandSave;
    Scene_Map.prototype.commandSave = function() {
        if (isChoiceActive()) {
            SoundManager.playBuzzer();
            return;
        }
        _Scene_Map_commandSave.call(this);
    };

    // --- Блокируем событийную команду "Открыть экран сохранения" ---
    var _Game_Interpreter_commandOpenSaveScreen =
        Game_Interpreter.prototype.commandOpenSaveScreen;
    Game_Interpreter.prototype.commandOpenSaveScreen = function() {
        if (isChoiceActive()) {
            // Просто пропускаем команду без ошибок
            return true;
        }
        return _Game_Interpreter_commandOpenSaveScreen.call(this);
    };

})();
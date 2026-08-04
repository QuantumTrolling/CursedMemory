//=============================================================================
// SaveDisableDuringChoice.js (v1.7.4 — совместимость с MOG_SceneMenu + тусклая иконка)
//=============================================================================
/*:
 * @plugindesc v1.7.4 Блокирует сохранение и выход на титул при активном выборе.
 * Иконка «Выход» остаётся затемнённой (не подсвечивается при наведении),
 * стрелка и название команды работают как обычно.
 * @author YourName
 *
 * @help
 * Пока на экране активно окно выбора:
 * - Сохранение недоступно.
 * - Выход в главное меню (титульный экран) невозможен.
 *   Иконка «Выход» всегда приглушена (не становится яркой при наведении),
 *   но стрелка‑индикатор и название «Выход» отображаются.
 * Обычное открытие меню и остальные команды работают без ограничений.
 */

(function() {
    'use strict';

    function isChoiceActive() {
        return $gameMessage && $gameMessage.isChoice();
    }

    // --- Запрет сохранения ---
    var _Game_System_isSaveEnabled = Game_System.prototype.isSaveEnabled;
    Game_System.prototype.isSaveEnabled = function() {
        if (isChoiceActive()) return false;
        return _Game_System_isSaveEnabled.call(this);
    };

    var _Scene_Map_commandSave = Scene_Map.prototype.commandSave;
    Scene_Map.prototype.commandSave = function() {
        if (isChoiceActive()) {
            SoundManager.playBuzzer();
            return;
        }
        _Scene_Map_commandSave.call(this);
    };

    var _Game_Interpreter_commandOpenSaveScreen =
        Game_Interpreter.prototype.commandOpenSaveScreen;
    Game_Interpreter.prototype.commandOpenSaveScreen = function() {
        if (isChoiceActive()) return true;
        return _Game_Interpreter_commandOpenSaveScreen.call(this);
    };

    // --- Запрет выхода ---
    var _Scene_Menu_commandGameEnd = Scene_Menu.prototype.commandGameEnd;
    Scene_Menu.prototype.commandGameEnd = function() {
        if (isChoiceActive()) {
            SoundManager.playBuzzer();
            return;
        }
        _Scene_Menu_commandGameEnd.call(this);
    };

    // --- Клавиатурный переход на иконку «Выход» заблокирован ---
    var _Window_MenuCommand_processCursorMove = Window_MenuCommand.prototype.processCursorMove;
    Window_MenuCommand.prototype.processCursorMove = function() {
        if (!isChoiceActive()) {
            _Window_MenuCommand_processCursorMove.call(this);
            return;
        }
        var gameEndIndex = this._list.findIndex(function(cmd) {
            return cmd.symbol === 'gameEnd';
        });
        if (gameEndIndex >= 0) {
            var lastIndex = this.index();
            _Window_MenuCommand_processCursorMove.call(this);
            if (this.index() === gameEndIndex) {
                this.select(lastIndex);  // откатываемся
            }
        } else {
            _Window_MenuCommand_processCursorMove.call(this);
        }
    };

    // --- Иконка «Выход» всегда тусклая, но стрелка/название работают ---
    var _Scene_Menu_updateCommands = Scene_Menu.prototype.updateCommands;
    Scene_Menu.prototype.updateCommands = function() {
        _Scene_Menu_updateCommands.call(this);   // полная анимация MOG

        if (isChoiceActive()) {
            var gameEndIndex = this._commandWindow._list.findIndex(function(cmd) {
                return cmd.symbol === 'gameEnd';
            });
            if (gameEndIndex >= 0 && this._commands && this._commands[gameEndIndex]) {
                // Фиксируем затемнение, не даём MOG перекрасить в яркий
                this._commands[gameEndIndex].opacity = 160;
            }
        }
    };

    // --- Клик по иконке «Выход» игнорируется ---
    var _Scene_Menu_checkTouchCommand = Scene_Menu.prototype.checkTouchCommand;
    Scene_Menu.prototype.checkTouchCommand = function() {
        if (isChoiceActive()) {
            var gameEndIndex = this._comList.findIndex(function(cmd) {
                return cmd.symbol === 'gameEnd';
            });
            if (gameEndIndex >= 0 && this.isOnSprite(this._commands[gameEndIndex])) {
                SoundManager.playBuzzer();
                return;
            }
        }
        _Scene_Menu_checkTouchCommand.call(this);
    };

})();
//=============================================================================
// SaveDisableDuringChoice.js
//=============================================================================
/*:
 * @plugindesc v1.7.2 Блокирует сохранение и выход на титул при активном выборе.
 * Иконка "Выход" не подсвечивается, но стрелка и название работают как обычно.
 * @author YourName
 *
 * @help
 * Пока на экране активно окно выбора:
 * - Сохранение недоступно (пункт меню затемнён, событийная команда игнорируется).
 * - Выход в главное меню (титульный экран) невозможен.
 *   Иконка "Выход" в меню всегда остаётся затемнённой, не подсвечивается
 *   при наведении, но стрелка-индикатор и название команды отображаются,
 *   как и для любой другой кнопки. Клик и выбор клавишами заблокированы.
 * Обычное открытие меню (Esc/ПКМ) работает без ограничений.
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

    // --- Запрет выхода через клавиатуру ---
    var _Scene_Menu_commandGameEnd = Scene_Menu.prototype.commandGameEnd;
    Scene_Menu.prototype.commandGameEnd = function() {
        if (isChoiceActive()) {
            SoundManager.playBuzzer();
            return;
        }
        _Scene_Menu_commandGameEnd.call(this);
    };

    // --- Модификация updateCommands ---
    var _Scene_Menu_updateCommands = Scene_Menu.prototype.updateCommands;
    Scene_Menu.prototype.updateCommands = function() {
        if (!this._commands || !this._commandWindow || !this._commandWindow._list) {
            if (this._cmdArrow) this._cmdArrow.visible = false;
            return _Scene_Menu_updateCommands.call(this);
        }

        var gameEndIndex = this._commandWindow._list.findIndex(function(cmd) {
            return cmd.symbol === 'gameEnd';
        });

        if (isChoiceActive() && gameEndIndex >= 0) {
            var hoverIndex = -1;
            for (var i = 0; i < this._commands.length; i++) {
                if (this.isOnSprite(this._commands[i])) {
                    hoverIndex = i;
                    break;
                }
            }

            // Запоминаем, был ли предыдущий ховер над заблокированной иконкой
            if (hoverIndex === gameEndIndex) {
                this._hoverBlocked = true;
                this._lastHoverIndex = gameEndIndex;
            } else if (hoverIndex !== -1) {
                this._hoverBlocked = false;
                this._lastHoverIndex = hoverIndex;
                if (this._commandWindow._index !== hoverIndex) {
                    this._commandWindow.select(hoverIndex);
                }
            } else {
                // Мышь не над командами: если до этого были над "Выход", оставляем её
                if (this._hoverBlocked && this._lastHoverIndex === gameEndIndex) {
                    // оставляем _hoverBlocked = true, effectiveSelIndex = gameEndIndex
                } else {
                    this._hoverBlocked = false;
                    this._lastHoverIndex = -1;
                }
            }

            var effectiveSelIndex;
            if (this._hoverBlocked && this._lastHoverIndex === gameEndIndex) {
                effectiveSelIndex = -1; // иконка выхода не подсвечивается, но стрелка будет на ней
            } else if (hoverIndex !== -1 && !this._hoverBlocked) {
                effectiveSelIndex = hoverIndex;
            } else {
                effectiveSelIndex = this._commandWindow._index;
            }

            // Обновляем позиции и прозрачность
            for (var i = 0; i < this._commands.length; i++) {
                var isSelected = (i === effectiveSelIndex);
                var nx, ny;
                if (isSelected) {
                    nx = this._statusWindow.active ? Moghunter.scMenu_ComWX : this._compos[i][0];
                    ny = this._statusWindow.active ? Moghunter.scMenu_ComWY : this._compos[i][1];
                    if (this._commands[i].opacity < 255) {
                        this._commands[i].opacity += 20;
                        if (this._commands[i].opacity > 255) this._commands[i].opacity = 255;
                    }
                } else {
                    nx = this._compos[i][0];
                    ny = this._compos[i][1];
                    var targetOpacity = 160;
                    if (this._commands[i].opacity > targetOpacity) {
                        this._commands[i].opacity -= 10;
                        if (this._commands[i].opacity < targetOpacity) this._commands[i].opacity = targetOpacity;
                    } else if (this._commands[i].opacity < targetOpacity) {
                        this._commands[i].opacity += 10;
                        if (this._commands[i].opacity > targetOpacity) this._commands[i].opacity = targetOpacity;
                    }
                }
                this._commands[i].x = this.commandMoveTo(this._commands[i].x, nx);
                this._commands[i].y = this.commandMoveTo(this._commands[i].y, ny);
            }

            // Стрелка наведения
            if (!this._statusWindow.active) {
                var arrowIndex = -1;
                if (this._hoverBlocked && this._lastHoverIndex === gameEndIndex) {
                    arrowIndex = gameEndIndex;
                } else if (effectiveSelIndex >= 0) {
                    arrowIndex = effectiveSelIndex;
                }
                if (arrowIndex >= 0 && this._commands[arrowIndex]) {
                    var cmd = this._commands[arrowIndex];
                    this._cmdArrow.visible = true;
                    this._cmdArrow.x = cmd.x;
                    this._cmdArrow.y = cmd.y - 18;
                    this.updatePauseArrow(this._cmdArrow);
                } else {
                    this._cmdArrow.visible = false;
                }
            } else {
                this._cmdArrow.visible = false;
            }

        } else {
            _Scene_Menu_updateCommands.call(this);
        }
    };

    // --- Отображение названия команды при наведении на заблокированный "Выход" ---
    var _Scene_Menu_updateCommandName = Scene_Menu.prototype.updateCommandName;
    Scene_Menu.prototype.updateCommandName = function() {
        if (!isChoiceActive()) {
            _Scene_Menu_updateCommandName.call(this);
            return;
        }

        var gameEndIndex = this._commandWindow._list.findIndex(function(cmd) {
            return cmd.symbol === 'gameEnd';
        });

        if (this._hoverBlocked && this._lastHoverIndex === gameEndIndex) {
            // Принудительно показываем название "Выход"
            if (this._commandNameIndex !== gameEndIndex) {
                this._commandNameIndex = gameEndIndex;
                this._commandNameIndex2 = -2;
                this._commandName.bitmap.clear();
                var name = this._comList[gameEndIndex].name;
                this._commandName.bitmap.drawText(name, 0, 0, 100, 32, "center");
                this._commandName.x = Moghunter.scMenu_ComNameX - 50;
                this._commandName.y = Moghunter.scMenu_ComNameY;
                this._commandName.opacity = 0;
            }
            this._commandName.x = this.commandMoveTo(this._commandName.x, Moghunter.scMenu_ComNameX);
            this._commandName.y = this.commandMoveTo(this._commandName.y, Moghunter.scMenu_ComNameY);
            this._commandName.opacity += 10;
            return;
        }

        _Scene_Menu_updateCommandName.call(this);
    };

    // --- Запрет перехода клавишами на иконку выхода ---
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
                this.select(lastIndex);
            }
        } else {
            _Window_MenuCommand_processCursorMove.call(this);
        }
    };

    // --- Клик по иконке выхода игнорируется ---
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
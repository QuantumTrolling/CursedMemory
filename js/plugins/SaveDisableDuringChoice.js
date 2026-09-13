//=============================================================================
// SaveDisableDuringChoice.js (v1.7.6 — фикс кнопки «Сохранить» в меню)
//=============================================================================
/*:
 * @plugindesc v1.7.6 Блокирует сохранение и выход на титул при активном выборе.
 * Иконка «Выход» остаётся затемнённой (не подсвечивается при наведении),
 * стрелка и название команды работают как обычно.
 * При попытке сохранить/выйти во время выбора выводится диалоговое окно
 * по центру экрана с пояснением.
 * @author YourName
 *
 * @help
 * Пока на экране активно окно выбора:
 * - Сохранение недоступно.
 * - Выход в главное меню (титульный экран) невозможен.
 *   Иконка «Выход» всегда приглушена (не становится яркой при наведении),
 *   но стрелка‑индикатор и название «Выход» отображаются.
 * При нажатии на «Сохранить» или «Выход» по центру экрана всплывает
 * диалоговое окно с сообщением о недоступности команды.
 * Обычное открытие меню и остальные команды работают без ограничений.
 */

(function() {
    'use strict';

    function isChoiceActive() {
        return $gameMessage && $gameMessage.isChoice();
    }

    // -------------------------------------------------------------------------
    // Окно-уведомление по центру экрана
    // -------------------------------------------------------------------------
    function ChoiceBlockMessageWindow() {
        this.initialize.apply(this, arguments);
    }

    ChoiceBlockMessageWindow.prototype = Object.create(Window_Base.prototype);
    ChoiceBlockMessageWindow.prototype.constructor = ChoiceBlockMessageWindow;

    ChoiceBlockMessageWindow.prototype.initialize = function() {
        Window_Base.prototype.initialize.call(this, 0, 0, 500, 120);
        this.visible = false;
        this._hideTimerId = null;
    };

    ChoiceBlockMessageWindow.prototype.showText = function(text) {
        this.resetFontSettings();

        var padding = this.standardPadding();
        var textWidth = this.textWidth(text);
        var w = Math.max(400, textWidth + padding * 2 + 20);
        var h = this.fittingHeight(1) + padding * 2;

        this.width  = w;
        this.height = h;
        this.x = Math.floor((Graphics.boxWidth  - w) / 2);
        this.y = Math.floor((Graphics.boxHeight - h) / 2);

        this.createContents();
        this.contents.clear();
        this.drawTextEx(text, 0, 0);

        this.visible  = true;
        this.openness = 255;

        if (this._hideTimerId) {
            clearTimeout(this._hideTimerId);
        }
        var self = this;
        this._hideTimerId = setTimeout(function() {
            self.visible = false;
            self._hideTimerId = null;
        }, 2000);
    };

    function showChoiceBlockMessage(text) {
        var scene = SceneManager._scene;
        if (!scene) return;

        if (!scene._choiceBlockMessageWindow) {
            scene._choiceBlockMessageWindow = new ChoiceBlockMessageWindow();
            scene.addChild(scene._choiceBlockMessageWindow);
        }
        scene._choiceBlockMessageWindow.showText(text);
    }

    // --- Запрет сохранения (системный уровень) ---
    var _Game_System_isSaveEnabled = Game_System.prototype.isSaveEnabled;
    Game_System.prototype.isSaveEnabled = function() {
        if (isChoiceActive()) return false;
        return _Game_System_isSaveEnabled.call(this);
    };

    // --- Запрет сохранения из меню на карте (Scene_Map) ---
    var _Scene_Map_commandSave = Scene_Map.prototype.commandSave;
    Scene_Map.prototype.commandSave = function() {
        if (isChoiceActive()) {
            SoundManager.playBuzzer();
            showChoiceBlockMessage('Сохранение не доступно во время сюжетного выбора');
            return;
        }
        _Scene_Map_commandSave.call(this);
    };

    // --- Запрет сохранения из главного меню (Scene_Menu) — ЭТО ГЛАВНЫЙ ФИКС ---
    var _Scene_Menu_commandSave = Scene_Menu.prototype.commandSave;
    Scene_Menu.prototype.commandSave = function() {
        if (isChoiceActive()) {
            SoundManager.playBuzzer();
            showChoiceBlockMessage('Сохранение не доступно во время сюжетного выбора');
            return;
        }
        _Scene_Menu_commandSave.call(this);
    };

    // --- Запрет сохранения через команду события ---
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
            showChoiceBlockMessage('Выход не доступен во время сюжетного выбора');
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

    // --- Клик/тап по иконкам «Выход» и «Сохранить» игнорируется с сообщением ---
    var _Scene_Menu_checkTouchCommand = Scene_Menu.prototype.checkTouchCommand;
    Scene_Menu.prototype.checkTouchCommand = function() {
        if (isChoiceActive()) {
            var list = this._comList || [];
            var gameEndIndex = list.findIndex(function(cmd) {
                return cmd.symbol === 'gameEnd';
            });
            var saveIndex = list.findIndex(function(cmd) {
                return cmd.symbol === 'save';
            });

            if (gameEndIndex >= 0 && this.isOnSprite(this._commands[gameEndIndex])) {
                SoundManager.playBuzzer();
                showChoiceBlockMessage('Exit is not available during a story choice.');
                return;
            }
            if (saveIndex >= 0 && this.isOnSprite(this._commands[saveIndex])) {
                SoundManager.playBuzzer();
                showChoiceBlockMessage('Saving is not available during a story choice.');
                return;
            }
        }
        _Scene_Menu_checkTouchCommand.call(this);
    };

})();
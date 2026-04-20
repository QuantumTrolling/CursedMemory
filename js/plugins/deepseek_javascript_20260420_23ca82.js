//=============================================================================
// EquipCommandAlwaysClickable.js
//=============================================================================
/*:
 * @plugindesc v1.0 Позволяет нажимать на команды экипировки (Экипировать, Авто,
 * Снять, Закончить) даже когда открыто окно выбора предметов.
 * @author Помощник
 * @help
 * ============================================================================
 * Введение
 * ============================================================================
 * Этот плагин изменяет сцену экипировки так, что командное окно всегда
 * реагирует на клики мыши, независимо от того, активно ли окно предметов.
 * Совместим с YEP_EquipCore. Разместите этот плагин ПОСЛЕ YEP_EquipCore.
 *
 * ============================================================================
 * Как это работает
 * ============================================================================
 * При клике на команду плагин проверяет, активно ли окно предметов.
 * Если да, то он сначала выполняет действие команды, а затем при необходимости
 * возвращает управление в корректное состояние.
 */

(function() {
    'use strict';

    // Сохраняем оригинальный метод обновления сцены экипировки
    var _Scene_Equip_update = Scene_Equip.prototype.update;
    Scene_Equip.prototype.update = function() {
        _Scene_Equip_update.call(this);
        // Вызываем обработку кликов по командному окну на каждом кадре
        this.processCommandWindowClick();
    };

    // Новый метод: проверка и обработка кликов по командному окну
    Scene_Equip.prototype.processCommandWindowClick = function() {
        // Если нет командного окна или оно невидимо - выходим
        if (!this._commandWindow || !this._commandWindow.visible) return;

        // Проверяем, был ли клик мыши и находится ли он внутри командного окна
        if (TouchInput.isTriggered() && this._commandWindow.isTouchedInsideFrame()) {
            // Получаем индекс команды под указателем
            var touchPos = this._commandWindow.canvasToLocalX(TouchInput.x);
            var index = this._commandWindow.hitTest(touchPos, TouchInput.y);
            if (index >= 0) {
                // Сохраняем состояние сцены до выполнения команды
                var wasItemWindowActive = this._itemWindow && this._itemWindow.active;
                var wasActorWindowActive = this._actorWindow && this._actorWindow.active;

                // Если плагин YEP_EquipCore присутствует, его окна могут быть активны
                var wasYepActorWindowActive = this._actorCommandWindow && this._actorCommandWindow.active;

                // Выполняем соответствующую команду
                var symbol = this._commandWindow.commandSymbol(index);
                if (symbol) {
                    this.processEquipCommand(symbol);
                }

                // Восстанавливаем активность окон, если это необходимо
                // (чтобы не нарушить логику других плагинов)
                if (wasItemWindowActive) {
                    this._itemWindow.activate();
                }
                if (wasActorWindowActive) {
                    this._actorWindow.activate();
                }
                if (wasYepActorWindowActive && this._actorCommandWindow) {
                    this._actorCommandWindow.activate();
                }

                // Очищаем состояние триггера, чтобы избежать повторных срабатываний
                TouchInput.clear();
            }
        }
    };

    // Метод для выполнения команды по символу (аналогичен стандартному, но вызывается принудительно)
    Scene_Equip.prototype.processEquipCommand = function(symbol) {
        // Временно активируем командное окно, чтобы методы команд работали корректно
        var wasCommandWindowActive = this._commandWindow.active;
        this._commandWindow.activate();

        // Выполняем нужную команду
        switch (symbol) {
            case 'equip':
                this.commandEquip();
                break;
            case 'optimize':
                this.commandOptimize();
                break;
            case 'clear':
                this.commandClear();
                break;
            case 'cancel':
                this.popScene();
                break;
            default:
                // Если команда не стандартная (например, добавлена другим плагином)
                // можно попытаться вызвать общий обработчик
                if (this._commandWindow.currentSymbol) {
                    var handler = this._commandWindow.currentExt();
                    if (handler) {
                        handler.call(this);
                    }
                }
                break;
        }

        // Возвращаем исходное состояние активности командного окна
        if (!wasCommandWindowActive) {
            this._commandWindow.deactivate();
        }
    };

    // Расширяем Window_EquipCommand, чтобы получить символ команды по индексу
    Window_EquipCommand.prototype.commandSymbol = function(index) {
        var symbols = ['equip', 'optimize', 'clear', 'cancel'];
        // Если плагин YEP_EquipCore добавляет другие команды, список может быть другим
        // Мы берём стандартный порядок, а для расширенных случаев используем _list
        if (this._list && this._list[index]) {
            return this._list[index].symbol;
        }
        return symbols[index] || null;
    };

    // Совместимость с YEP_EquipCore:
    // В YEP команды могут быть изменены, поэтому для получения символа используем _list
    // Убедимся, что метод есть и у модифицированного окна
    var alias_YEP_EquipCommand_makeCommandList = Window_EquipCommand.prototype.makeCommandList;
    Window_EquipCommand.prototype.makeCommandList = function() {
        alias_YEP_EquipCommand_makeCommandList.call(this);
        // Принудительно устанавливаем _list (если YEP его не создал)
        if (!this._list) {
            this._list = [];
            if (this._data) {
                for (var i = 0; i < this._data.length; i++) {
                    this._list.push({ symbol: this._data[i].symbol, enabled: true });
                }
            }
        }
    };

})();
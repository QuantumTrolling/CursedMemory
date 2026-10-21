//=============================================================================
// NoRightClick.js
// Полностью отключает нажатие ПКМ в игре. ESC (клавиатура) продолжает работать.
//=============================================================================

/*:
 * @plugindesc Полностью отключает ПКМ в игре. Работает только ESC.
 * @author
 *
 * @help
 * Полностью блокирует правую кнопку мыши (ПКМ) во всей игре.
 *
 * - ПКМ больше не вызывает ESC и не закрывает окна/меню/сцены.
 * - ПКМ не вызывает контекстное меню браузера.
 * - ПКМ не срабатывает ни в каких плагинах, которые слушают
 *   mousedown / mouseup / click / auxclick / contextmenu / pointerdown.
 * - Клавиша ESC на клавиатуре и все остальные клавиши работают как обычно.
 *
 * Разместите плагин НИЖЕ всех остальных, особенно ниже тех,
 * которые используют ПКМ (контекстное меню) для своих целей.
 */
(function() {
    'use strict';

    //-------------------------------------------------------------------------
    // 1. Отключаем обработку правой кнопки в TouchInput
    //-------------------------------------------------------------------------
    // Стандартное поведение MV:
    //   ПКМ -> TouchInput._onRightButtonDown() -> _onCancel()
    //       -> TouchInput._cancelled = true
    //       -> Window_Selectable.processTouch() видит isCancelled()
    //       -> Window_Selectable.processCancel() (= ESC).
    //
    // Перезаписываем _onRightButtonDown так, чтобы ПКМ ничего не делала.
    if (typeof TouchInput !== 'undefined') {
        TouchInput._onRightButtonDown = function() {
            // Ничего не делаем — ни _onCancel, ни движения, ни кликов.
        };

        // На всякий случай сбрасываем возможные «залипшие» флаги.
        TouchInput._cancelled = false;
        TouchInput._cancelPressed = false;

        // Если у пользователя стоит плагин, который расширяет TouchInput
        // и добавляет свои cancel-флаги — тоже очищаем их при clear().
        var _TouchInput_clear = TouchInput.clear;
        TouchInput.clear = function() {
            _TouchInput_clear.call(this);
            this._cancelled = false;
            this._cancelPressed = false;
        };
    }

    //-------------------------------------------------------------------------
    // 2. Блокируем правые клики на уровне событий DOM (capture-фаза на window)
    //-------------------------------------------------------------------------
    // Capture-фаза на window срабатывает РАНЬШЕ всех остальных обработчиков:
    //   window(capture) -> document(capture) -> ... -> canvas(target) -> ... -> bubble.
    // Значит любой addEventListener('mousedown', ...), addEventListener('contextmenu', ...),
    // document.oncontextmenu = ..., canvas.onmousedown = ... и т.д. не получат событие.

    var blockRightButton = function(event) {
        if (event.button === 2) { // 2 = правая кнопка мыши
            event.stopImmediatePropagation();
            event.preventDefault();
            return false;
        }
    };

    var blockContextMenu = function(event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        return false;
    };

    var mouseEvents = [
        'mousedown', 'mouseup', 'click', 'dblclick', 'auxclick',
        'pointerdown', 'pointerup'
    ];
    for (var i = 0; i < mouseEvents.length; i++) {
        window.addEventListener(mouseEvents[i], blockRightButton, true);
    }
    // contextmenu ловит и ПКМ, и долгое нажатие на тач-устройствах.
    window.addEventListener('contextmenu', blockContextMenu, true);
})();
/*:
 * @plugindesc (v1.0) Отключает перезагрузку игры по клавише F5.
 * @author Midnight Crew
 *
 * @help
 * Этот плагин предотвращает стандартное действие клавиши F5,
 * которое перезагружает страницу и перезапускает игру.
 *
 * Просто подключите этот файл в менеджере плагинов.
 */

(function() {
    var _SceneManager_onKeyDown = SceneManager.onKeyDown;
    SceneManager.onKeyDown = function(event) {
        // 116 — это keyCode для клавиши F5
        if (event.keyCode !== 116) {
            _SceneManager_onKeyDown.call(this, event);
        }
    };
})();
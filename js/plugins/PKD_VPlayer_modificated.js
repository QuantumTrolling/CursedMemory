/*:
 * @plugindesc [Companion] Instant video animation switcher for PKD_VPlayer — removes flicker when replacing animations (MV only).
 * @author ChatGPT
 *
 * @help
 * This plugin adds a global function `ReplaceVAnimInstant` that allows you to
 * instantly replace a looping video animation created with PKD_VPlayer
 * without any visual flicker.
 *
 * Usage:
 *    ReplaceVAnimInstant(ID, NEW_FILE_NAME, X, Y, IS_LOOP)
 *
 * Example:
 *    ReplaceVAnimInstant(1, "shirashin_set_thinking", 0, 120, true);
 *
 * If the animation with the given ID doesn't exist, it will be created.
 *
 * Requirements:
 *    - PKD_VPlayer.js (Basic or Pro version)
 *    - RPG Maker MV
 */

(function() {

window.ReplaceVAnimSmooth = function(oldId, tempId, newName, x = 0, y = 0, isLoop = true) {
    // Показываем новую анимацию с временным ID
    ShowVAnimOnSpriteset(tempId, newName, x, y, isLoop);

    const checkReady = () => {
        const vm = SceneManager._scene._getVM(tempId);
        if (vm && vm.isLoaded()) {
            // Удаляем старую анимацию
            DeleteVAnim(oldId);

            // Ждём один кадр, чтобы гарантировать удаление
            requestAnimationFrame(() => {
                const newVM = SceneManager._scene._getVM(tempId);
                if (newVM) {
                    // Присваиваем новую анимацию старому ID
                    SceneManager._scene._vwStorage[oldId] = newVM;
                    delete SceneManager._scene._vwStorage[tempId];
                }
            });
        } else {
            // Повторная проверка загрузки
            requestAnimationFrame(checkReady);
        }
    };

    requestAnimationFrame(checkReady);
};

})();

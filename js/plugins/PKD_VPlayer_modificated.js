(function () {

    window._VAnimRestoreCache = window._VAnimRestoreCache || {};

    window.ReplaceVAnimSmooth = function(oldId, tempId, newName, x = 0, y = 0, isLoop = true) {
        // Создаём новую временную анимацию
        ShowVAnimOnSpriteset(tempId, newName, x, y, isLoop);

        const checkReady = () => {
            const newVM = SceneManager._scene._getVM(tempId);
            if (newVM && newVM.isLoaded()) {
                // Удаляем старую анимацию
                DeleteVAnim(oldId);
                if (window._VAnimRestoreCache[oldId]) {
                    delete window._VAnimRestoreCache[oldId];
                }

                // Переносим новую анимацию на место старой
                SceneManager._scene._vwStorage[oldId] = newVM;
                delete SceneManager._scene._vwStorage[tempId];

                // Обновляем кэш для восстановления
                window._VAnimRestoreCache[oldId] = {
                    id: oldId,
                    name: newName,
                    x: x,
                    y: y,
                    isLoop: isLoop
                };
            } else {
                requestAnimationFrame(checkReady);
            }
        };

        requestAnimationFrame(checkReady);
    };

    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        _Scene_Map_start.call(this);

        if (window._VAnimRestoreCache) {
            for (const id in window._VAnimRestoreCache) {
                const data = window._VAnimRestoreCache[id];
                if (!SceneManager._scene._getVM(id)) {
                    ShowVAnimOnSpriteset(data.id, data.name, data.x, data.y, data.isLoop);
                }
            }
        }
    };

    // Патч для удаления из кэша при обычном удалении анимации
    const _DeleteVAnim = window.DeleteVAnim;
    window.DeleteVAnim = function(id) {
        _DeleteVAnim(id);
        if (window._VAnimRestoreCache && window._VAnimRestoreCache[id]) {
            delete window._VAnimRestoreCache[id];
        }
    };

})();

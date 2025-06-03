(function () {

    // Инициализация кэша в $gameSystem
    const _GameSystem_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _GameSystem_initialize.call(this);
        this._VAnimRestoreCache = {};
    };

    // Быстрая ссылка на кэш
    function VAnimRestoreCache() {
        if (!$gameSystem._VAnimRestoreCache) {
            $gameSystem._VAnimRestoreCache = {};
        }
        return $gameSystem._VAnimRestoreCache;
    }

    window.ReplaceVAnimSmooth = function(oldId, tempId, newName, x = 0, y = 0, isLoop = true) {
        // Создаём новую временную анимацию
        ShowVAnimOnSpriteset(tempId, newName, x, y, isLoop);

        const checkReady = () => {
            const newVM = SceneManager._scene._getVM(tempId);
            if (newVM && newVM.isLoaded()) {
                // Удаляем старую анимацию
                DeleteVAnim(oldId);
                if (VAnimRestoreCache()[oldId]) {
                    delete VAnimRestoreCache()[oldId];
                }

                // Переносим новую анимацию на место старой
                SceneManager._scene._vwStorage[oldId] = newVM;
                delete SceneManager._scene._vwStorage[tempId];

                // Обновляем кэш для восстановления
                VAnimRestoreCache()[oldId] = {
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

        const cache = VAnimRestoreCache();
        if (cache) {
            for (const id in cache) {
                const data = cache[id];
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
        const cache = VAnimRestoreCache();
        if (cache && cache[id]) {
            delete cache[id];
        }
    };


// Восстановление анимаций при возврате из меню (если Scene_Map активен)
const _SceneManager_onSceneStart = SceneManager.onSceneStart;
SceneManager.onSceneStart = function () {
    _SceneManager_onSceneStart.call(this);

    if (SceneManager._scene instanceof Scene_Map) {
        const cache = VAnimRestoreCache();
        if (cache) {
            for (const id in cache) {
                const data = cache[id];
                if (!SceneManager._scene._getVM(id)) {
                    ShowVAnimOnSpriteset(data.id, data.name, data.x, data.y, data.isLoop);
                }
            }
        }
    }
};

})();

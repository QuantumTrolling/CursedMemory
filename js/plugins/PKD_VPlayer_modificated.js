(function () {

    const _GameSystem_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        _GameSystem_initialize.call(this);
        this._VAnimRestoreCache = {};
    };

    function VAnimRestoreCache() {
        if (!$gameSystem._VAnimRestoreCache) {
            $gameSystem._VAnimRestoreCache = {};
        }
        return $gameSystem._VAnimRestoreCache;
    }

    // 🆕 Сохраняем текущее состояние всех VM перед вызовом меню
    const _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function () {
        const scene = SceneManager._scene;
        if (scene && scene._vwStorage) {
            const cache = VAnimRestoreCache();
            for (const id in scene._vwStorage) {
                const vm = scene._vwStorage[id];
                if (vm && vm.isLoaded() && !vm.isDestroyed()) {
                    cache[id] = {
                        id: id,
                        name: vm.filename,
                        x: vm.x,
                        y: vm.y,
                        isLoop: vm._loop
                    };
                    console.log(`🔄 Saved animation before menu: [${id}] ${vm.filename}`);
                }
            }
        }
        _Scene_Menu_create.call(this);
    };

    // 🆗 Переопределим ReplaceVAnimSmooth, чтобы всегда сохранять актуальную анимацию
    window.ReplaceVAnimSmooth = function (oldId, tempId, newName, x = 0, y = 0, isLoop = true) {
        ShowVAnimOnSpriteset(tempId, newName, x, y, isLoop);

        const checkReady = () => {
            const newVM = SceneManager._scene._getVM(tempId);
            if (newVM && newVM.isLoaded()) {

                if (SceneManager._scene._getVM(oldId)) {
                    DeleteVAnim(oldId);
                }

                SceneManager._scene._vwStorage[oldId] = newVM;
                delete SceneManager._scene._vwStorage[tempId];

                VAnimRestoreCache()[oldId] = {
                    id: oldId,
                    name: newName,
                    x: x,
                    y: y,
                    isLoop: isLoop
                };

                if ($gameMap && $gameMap._saveVW) {
                    $gameMap._saveVW(oldId, newName, x, y, isLoop, 1);
                }

                console.log(`✅ Replaced animation: [${oldId}] -> ${newName}`);
            } else {
                requestAnimationFrame(checkReady);
            }
        };

        requestAnimationFrame(checkReady);
    };

    // 🔁 При старте карты восстанавливаем анимации из кэша
    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        _Scene_Map_start.call(this);

        const cache = VAnimRestoreCache();
        if (cache) {
            for (const id in cache) {
                const data = cache[id];
                if (!SceneManager._scene._getVM(id)) {
                    ShowVAnimOnSpriteset(data.id, data.name, data.x, data.y, data.isLoop);
                    console.log(`♻️ Restored animation after menu: [${id}] ${data.name}`);
                }
            }
        }
    };

    // Удаление анимации также чистит кэш
    const _DeleteVAnim = window.DeleteVAnim;
    window.DeleteVAnim = function (id) {
        _DeleteVAnim(id);
        const cache = VAnimRestoreCache();
        if (cache && cache[id]) {
            delete cache[id];
        }
    };

    // При старте любой сцены проверяем и восстанавливаем
    const _SceneManager_onSceneStart = SceneManager.onSceneStart;
    SceneManager.onSceneStart = function () {
        _SceneManager_onSceneStart.call(this);

        if (SceneManager._scene instanceof Scene_Map) {
            const cache = VAnimRestoreCache();
            for (const id in cache) {
                const data = cache[id];
                if (!SceneManager._scene._getVM(id)) {
                    ShowVAnimOnSpriteset(data.id, data.name, data.x, data.y, data.isLoop);
                    console.log(`🗂 Scene Start Restore: [${id}] ${data.name}`);
                }
            }
        }
    };

})();

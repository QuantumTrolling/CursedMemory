
(function () {

    const _GameSystem_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _GameSystem_initialize.call(this);
        this._VAnimRestoreCache = {};
    };

    function VAnimRestoreCache() {
        if (!$gameSystem._VAnimRestoreCache) {
            $gameSystem._VAnimRestoreCache = {};
        }
        return $gameSystem._VAnimRestoreCache;
    }

    window.ReplaceVAnimSmooth = function(oldId, tempId, newName, x = 0, y = 0, isLoop = true) {
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

                // 🛠 КРИТИЧЕСКОЕ ДОБАВЛЕНИЕ — сохраняем в карту
                if ($gameMap && $gameMap._saveVW) {
                    $gameMap._saveVW(oldId, newName, x, y, isLoop, 1);
                }
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

    const _DeleteVAnim = window.DeleteVAnim;
    window.DeleteVAnim = function(id) {
        _DeleteVAnim(id);
        const cache = VAnimRestoreCache();
        if (cache && cache[id]) {
            delete cache[id];
        }
    };

    const _SceneManager_onSceneStart = SceneManager.onSceneStart;
    SceneManager.onSceneStart = function () {
        _SceneManager_onSceneStart.call(this);

        if (SceneManager._scene instanceof Scene_Map) {
            const cache = VAnimRestoreCache();
            for (const id in cache) {
                const data = cache[id];
                if (!SceneManager._scene._getVM(id)) {
                    ShowVAnimOnSpriteset(data.id, data.name, data.x, data.y, data.isLoop);
                }
            }
        }
    };

})();

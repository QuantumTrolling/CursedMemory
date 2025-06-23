
/*:
 * @plugindesc Fix for ReplaceVAnimSmooth restoring wrong animations after menu (CallMenu.js + Galv_ScreenButtons compatible). Full override of animation restoration system. @author Midnight Crew
 * @target MV
 */

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

    function saveCurrentAnimationsToCache() {
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
                    console.log(`🔄 [Fix] Saved animation before menu/button: [${id}] ${vm.filename}`);
                }
            }
        }
    }

    // Сохраняем анимации при вызове меню
    const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function () {
        saveCurrentAnimationsToCache();
        _Scene_Map_callMenu.call(this);
    };

    // Поддержка кнопок Galv_ScreenButtons, если они вызывают меню через eval
    if (Scene_Base.prototype.gButtonScript) {
        const _gButtonScript = Scene_Base.prototype.gButtonScript;
        Scene_Base.prototype.gButtonScript = function(script) {
            if (script.includes("SceneManager.push(Scene_Menu") || script.includes("SceneManager.goto(Scene_Menu")) {
                saveCurrentAnimationsToCache();
            }
            _gButtonScript.call(this, script);
        };
    }

    // Полностью переопределяем восстановление
    Game_Map.prototype._reloadVWStorage = function () {
        const cache = VAnimRestoreCache();
        for (const id in cache) {
            const data = cache[id];
            if (data) {
                ShowVAnimOnSpriteset(data.id, data.name, data.x, data.y, data.isLoop);
                console.log(`♻️ [Fix] Re-applied animation from cache: [${id}] ${data.name}`);
            }
        }
    };

    // Заменяем ReplaceVAnimSmooth чтобы кэшировать
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

                console.log(`✅ Replaced animation: [${oldId}] -> ${newName}`);
            } else {
                requestAnimationFrame(checkReady);
            }
        };

        requestAnimationFrame(checkReady);
    };

    const _DeleteVAnim = window.DeleteVAnim;
    window.DeleteVAnim = function (id) {
        _DeleteVAnim(id);
        delete VAnimRestoreCache()[id];
    };

})();

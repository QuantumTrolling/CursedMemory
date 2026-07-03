/*:
 * @plugindesc Объединённый PKD_VPlayer (modificated + AnimFix) с защитой от зависаний.
 * @author Midnight Crew
 * @target MV
 */

(function () {

    //=============================================================================
    // Общий кэш и инициализация (объединённая версия)
    //=============================================================================

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

    //=============================================================================
    // Сохранение в кэш при уходе с карты (меню / кнопки)
    //=============================================================================

    function saveCurrentAnimationsToCache(prefix = '') {
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
                    console.log(`🔄 ${prefix}Saved animation: [${id}] ${vm.filename}`);
                }
            }
        }
    }

    // Перехват создания меню (на случай, если сцена меню создаётся не через callMenu)
    const _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function () {
        saveCurrentAnimationsToCache('[Menu create] ');
        _Scene_Menu_create.call(this);
    };

    // Перехват вызова меню с карты
    const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function () {
        saveCurrentAnimationsToCache('[callMenu] ');
        _Scene_Map_callMenu.call(this);
    };

    // Поддержка Galv_ScreenButtons, если они вызывают меню через eval
    if (Scene_Base.prototype.gButtonScript) {
        const _gButtonScript = Scene_Base.prototype.gButtonScript;
        Scene_Base.prototype.gButtonScript = function(script) {
            if (script.includes("SceneManager.push(Scene_Menu") ||
                script.includes("SceneManager.goto(Scene_Menu")) {
                saveCurrentAnimationsToCache('[GalvBtn] ');
            }
            _gButtonScript.call(this, script);
        };
    }

    //=============================================================================
    // Улучшенный ReplaceVAnimSmooth с защитой от зависаний
    //=============================================================================

    window.ReplaceVAnimSmooth = function (oldId, tempId, newName, x = 0, y = 0, isLoop = true) {
        ShowVAnimOnSpriteset(tempId, newName, x, y, isLoop);

        let frame = 0;
        const MAX_FRAMES = 600; // 10 секунд при 60 fps

        const checkReady = () => {
            frame++;

            // 1. Проверяем, существует ли сцена
            const scene = SceneManager._scene;
            if (!scene) {
                console.error(`[ReplaceVAnimSmooth] Scene lost while waiting for VM: ${tempId}`);
                return;
            }

            // 2. Пробуем получить временную VM
            const newVM = scene._getVM(tempId);

            // Если VM ещё не создалась, ждём, но с выводом диагностики
            if (!newVM) {
                if (frame % 60 === 0) {
                    console.warn(`[ReplaceVAnimSmooth] Waiting for VM to exist: ${tempId} (frame ${frame})`);
                }
                if (frame < MAX_FRAMES) {
                    requestAnimationFrame(checkReady);
                } else {
                    console.error(`[ReplaceVAnimSmooth] Timeout waiting for VM to exist: ${tempId}`);
                }
                return;
            }

            // 3. Если VM уничтожена, завершаем
            if (newVM.isDestroyed()) {
                console.error(`[ReplaceVAnimSmooth] VM ${tempId} was destroyed before loading`);
                return;
            }

            // 4. Если загрузилась — выполняем замену
            if (newVM.isLoaded()) {
                console.log(`[ReplaceVAnimSmooth] VM loaded after ${frame} frames`);

                if (scene._getVM(oldId)) {
                    DeleteVAnim(oldId);
                }

                // Переносим ссылку
                scene._vwStorage[oldId] = newVM;
                delete scene._vwStorage[tempId];

                // Сохраняем в кэш
                VAnimRestoreCache()[oldId] = {
                    id: oldId,
                    name: newName,
                    x: x,
                    y: y,
                    isLoop: isLoop
                };

                // Оповещаем PKD_VPlayer о новом состоянии (если есть такой метод)
                if ($gameMap && $gameMap._saveVW) {
                    $gameMap._saveVW(oldId, newName, x, y, isLoop, 1);
                }

                console.log(`✅ Replaced animation: [${oldId}] -> ${newName}`);
                return;
            }

            // 5. Видео ещё загружается — продолжаем ожидание
            if (frame % 60 === 0) {
                console.log(`[ReplaceVAnimSmooth] Loading VM ${tempId}... (frame ${frame})`);
            }

            if (frame < MAX_FRAMES) {
                requestAnimationFrame(checkReady);
            } else {
                console.error(`[ReplaceVAnimSmooth] Timeout waiting for VM to load: ${tempId}`);
                // Можно принудительно удалить временную VM, чтобы не оставлять мусор
                try { DeleteVAnim(tempId); } catch (e) {}
            }
        };

        requestAnimationFrame(checkReady);
    };

    //=============================================================================
    // Удаление анимации с очисткой кэша
    //=============================================================================

    const _DeleteVAnim = window.DeleteVAnim;
    window.DeleteVAnim = function (id) {
        _DeleteVAnim.call(this, id);
        const cache = VAnimRestoreCache();
        if (cache && cache[id]) {
            delete cache[id];
        }
    };

    //=============================================================================
    // Восстановление анимаций (объединённая логика из modificated и AnimFix)
    //=============================================================================

    // 1. Восстановление при загрузке карты (из сохранения) — переопределение PKD
    Game_Map.prototype._reloadVWStorage = function () {
        const cache = VAnimRestoreCache();
        for (const id in cache) {
            const data = cache[id];
            if (data) {
                ShowVAnimOnSpriteset(data.id, data.name, data.x, data.y, data.isLoop);
                console.log(`♻️ [Fix] Re-applied from cache: [${id}] ${data.name}`);
            }
        }
    };

    // 2. Восстановление при старте Scene_Map (возврат из меню)
    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        _Scene_Map_start.call(this);
        const cache = VAnimRestoreCache();
        for (const id in cache) {
            const data = cache[id];
            if (!SceneManager._scene._getVM(id)) {
                ShowVAnimOnSpriteset(data.id, data.name, data.x, data.y, data.isLoop);
                console.log(`♻️ Restored after menu: [${id}] ${data.name}`);
            }
        }
    };

    // 3. Восстановление при старте любой сцены (дополнительная подстраховка)
    const _SceneManager_onSceneStart = SceneManager.onSceneStart;
    SceneManager.onSceneStart = function () {
        _SceneManager_onSceneStart.call(this);
        if (SceneManager._scene instanceof Scene_Map) {
            const cache = VAnimRestoreCache();
            for (const id in cache) {
                const data = cache[id];
                if (!SceneManager._scene._getVM(id)) {
                    ShowVAnimOnSpriteset(data.id, data.name, data.x, data.y, data.isLoop);
                    console.log(`🗂 Scene start restore: [${id}] ${data.name}`);
                }
            }
        }
    };

})();
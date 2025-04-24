(function () {

    // Кэш для восстановления
    window._VAnimRestoreCache = window._VAnimRestoreCache || {};
    
    // Плавная замена анимации
    window.ReplaceVAnimSmooth = function(oldId, tempId, newName, x = 0, y = 0, isLoop = true) {
        ShowVAnimOnSpriteset(tempId, newName, x, y, isLoop);
    
        const checkReady = () => {
            const vm = SceneManager._scene._getVM(tempId);
            if (vm && vm.isLoaded()) {
                DeleteVAnim(oldId);
    
                requestAnimationFrame(() => {
                    const newVM = SceneManager._scene._getVM(tempId);
                    if (newVM) {
                        // Переназначаем новый спрайт
                        SceneManager._scene._vwStorage[oldId] = newVM;
                        delete SceneManager._scene._vwStorage[tempId];
    
                        // Сохраняем данные в кэш на случай выхода в меню
                        window._VAnimRestoreCache[oldId] = {
                            id: oldId,
                            name: newName,
                            x: x,
                            y: y,
                            isLoop: isLoop
                        };
                    }
                });
            } else {
                requestAnimationFrame(checkReady);
            }
        };
    
        requestAnimationFrame(checkReady);
    };
    
    // При возвращении на карту — восстанавливаем анимации вручную
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
    
    })();
    
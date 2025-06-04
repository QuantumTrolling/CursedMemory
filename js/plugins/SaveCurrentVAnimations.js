
/*:
 * @plugindesc Utility: Adds SaveCurrentVAnimations() global function to cache current visual animations for ReplaceVAnimSmooth support. @author ChatGPT
 * @target MV
 */

(function() {

    window.SaveCurrentVAnimations = function() {
        if (!SceneManager._scene || !SceneManager._scene._vwStorage) return;
        if (!$gameSystem._VAnimRestoreCache) $gameSystem._VAnimRestoreCache = {};
        const cache = $gameSystem._VAnimRestoreCache;
        const store = SceneManager._scene._vwStorage;

        for (const id in store) {
            const vm = store[id];
            if (vm && vm.isLoaded() && !vm.isDestroyed()) {
                cache[id] = {
                    id: id,
                    name: vm.filename,
                    x: vm.x,
                    y: vm.y,
                    isLoop: vm._loop
                };
                console.log(`💾 SaveCurrentVAnimations: [${id}] ${vm.filename}`);
            }
        }
    };

})();

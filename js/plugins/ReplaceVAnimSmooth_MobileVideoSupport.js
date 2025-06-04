
/*:
 * @plugindesc Mobile fallback: if on mobile, replaces .webm animation filenames with .gif before loading them. Requires matching .gif versions in /movies/. @author ChatGPT
 * @target MV
 */

(function () {
    const isMobile = Utils.isMobileDevice();

    if (!isMobile) return;

    // Intercept ShowVAnimOnSpriteset before it calls anything else
    const _ShowVAnimOnSpriteset = window.ShowVAnimOnSpriteset;
    window.ShowVAnimOnSpriteset = function(id, name, x = 0, y = 0, loop = true) {
        if (typeof name === 'string' && name.toLowerCase().endsWith('.webm')) {
            name = name.replace(/\.webm$/i, '.gif');
            console.log("📱 Mobile fallback: swapped .webm -> .gif for animation:", name);
        }
        _ShowVAnimOnSpriteset.call(this, id, name, x, y, loop);
    };

    // Also patch ReplaceVAnimSmooth if it directly passes .webm names
    if (window.ReplaceVAnimSmooth) {
        const _ReplaceVAnimSmooth = window.ReplaceVAnimSmooth;
        window.ReplaceVAnimSmooth = function(oldId, tempId, newName, x = 0, y = 0, isLoop = true) {
            if (typeof newName === 'string' && newName.toLowerCase().endsWith('.webm')) {
                newName = newName.replace(/\.webm$/i, '.gif');
                console.log("📱 Mobile fallback: swapped .webm -> .gif in ReplaceVAnimSmooth:", newName);
            }
            _ReplaceVAnimSmooth(oldId, tempId, newName, x, y, isLoop);
        };
    }
})();

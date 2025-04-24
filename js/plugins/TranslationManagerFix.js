/*:
 * @plugindesc Patch to add missing TranslationManager methods for SceneGlossary compatibility with SRD_TranslationEngine.js
 * @author ChatGPT
 * 
 * @help
 * This plugin defines TranslationManager.translateIfNeed() and getTranslatePromise()
 * to ensure compatibility between SceneGlossary and SRD Translation Engine.
 */

(function() {
    if (typeof TranslationManager === 'undefined') {
        window.TranslationManager = {};
    }

    // Добавляем translateIfNeed, если его нет
    if (typeof TranslationManager.translateIfNeed !== 'function') {
        TranslationManager.translateIfNeed = function(text) {
            if (typeof SRD !== 'undefined' && SRD.TranslationEngine && SRD.TranslationEngine.translate) {
                return SRD.TranslationEngine.translate(text);
            }
            return text;
        };
    }

    // Добавляем getTranslatePromise, если его нет
    if (typeof TranslationManager.getTranslatePromise !== 'function') {
        TranslationManager.getTranslatePromise = function(text) {
            // Возвращаем промис с переведённым текстом (симулируем async поведение)
            return Promise.resolve(TranslationManager.translateIfNeed(text));
        };
    }
})();

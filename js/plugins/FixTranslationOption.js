/*:
 * @plugindesc Fix for SRD_TranslationEngine option visibility on Android/Webview.
 * @author ChatGPT
 *
 * @help
 * This plugin forces the language option to appear even outside NW.js.
 */

if (!SRD.TranslationEngine) SRD = SRD || {};
if (SRD.TranslationEngine) {
    SRD.TranslationEngine.allowOption = true;
}

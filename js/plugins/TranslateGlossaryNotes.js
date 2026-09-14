/*:
 * @plugindesc Enable dynamic translation of <SGDescription:...> using SRD_TranslationEngine for glossary support (e.g., SceneGlossary). Supports language switching in-game.
 * @author Midnight Crew (modified)
 *
 * @help
 * This plugin allows dynamic translation of <SGDescription:...> tags based on the current language using SRD_TranslationEngine.
 * Place this plugin below SRD_TranslationEngine and SceneGlossary in the Plugin Manager.
 *
 * Now supports all SGDescription tags (including SGDescription2, SGDescription3, etc.) and SGCategory.
 */

(function() {
    const _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_DataManager_isDatabaseLoaded.call(this)) return false;

        if (!DataManager._glossaryTranslationPatched) {
            patchGlossaryItems($dataItems);
            DataManager._glossaryTranslationPatched = true;
        }

        return true;
    };

    function patchGlossaryItems(dataArray) {
        const defaultLang = SRD.TranslationEngine.sourceName || 'English';

        for (const item of dataArray) {
            if (!item || !item.note) continue;

            const translations = parseGlossaryTranslations(item.note);

            // Определяем все теги, которые нужно переводить:
            // - все, что начинается с "SGDescription" (SGDescription, SGDescription2, SGDescription3, ...)
            // - SGCategory (без номера)
            const tagsToTranslate = [];
            for (const key in item.meta) {
                if (key.startsWith('SGDescription') || key === 'SGCategory') {
                    tagsToTranslate.push(key);
                }
            }

            for (const tag of tagsToTranslate) {
                if (!(tag in item.meta)) continue;
                const originalValue = item.meta[tag];

                Object.defineProperty(item.meta, tag, {
                    get: function() {
                        const lang = ConfigManager.getLanguage();
                        if (!lang || lang === defaultLang || !translations[lang]) {
                            return originalValue;
                        }
                        return translations[lang][tag] || originalValue;
                    },
                    configurable: true
                });
            }
        }
    }

function parseGlossaryTranslations(note) {
    const allTranslations = {};
    const blockRegex = /<(\w+)\s+Translation>([\s\S]*?)<\/\1\s+Translation>/gi;

    let blockMatch;
    while ((blockMatch = blockRegex.exec(note)) !== null) {
        const lang = blockMatch[1];
        const body = blockMatch[2];
        const fields = {};

        // Ищем все пары "[Tag]:<значение>".
        // Значение — всё после ":" до следующего "\n[Tag]:" или до конца блока.
        const fieldRegex = /\[([^\]\r\n]+)\]:([\s\S]*?)(?=\r?\n\[|$)/g;
        let fieldMatch;
        while ((fieldMatch = fieldRegex.exec(body)) !== null) {
            const key = fieldMatch[1].trim();

            // Единственное, что убираем — финальный перевод строки.
            // Ведущий пробел после ":" НЕ трогаем.
            const value = fieldMatch[2].replace(/[\r\n]+$/, '');

            fields[key] = value;
        }

        allTranslations[lang] = fields;
    }

    return allTranslations;
}
})();
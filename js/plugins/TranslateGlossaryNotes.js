/*:
 * @plugindesc Enable dynamic translation of <SGDescription:...> using SRD_TranslationEngine for glossary support (e.g., SceneGlossary). Supports language switching in-game.
 * @author ChatGPT
 *
 * @help
 * This plugin allows dynamic translation of <SGDescription:...> tags based on the current language using SRD_TranslationEngine.
 * Place this plugin below SRD_TranslationEngine and SceneGlossary in the Plugin Manager.
 */

(function() {
    const TRANSLATABLE_TAGS = ['SGDescription', 'SGCategory']; // можно добавить больше

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

            for (const tag of TRANSLATABLE_TAGS) {
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
        const regex = /<(\w+)\s+Translation>([\s\S]*?)<\/\1\s+Translation>/gi;

        let match;
        while ((match = regex.exec(note)) !== null) {
            const lang = match[1];
            const body = match[2];
            const fields = {};

            body.replace(/\[(.+?)\]:([\s\S]*?)(?=\n\[|$)/g, (_, key, value) => {
                fields[key.trim()] = value.trim();
            });

            allTranslations[lang] = fields;
        }

        return allTranslations;
    }
})();

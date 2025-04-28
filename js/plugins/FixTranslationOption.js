/*:
 * @plugindesc [Full Fix] Correctly enables SRD_TranslationEngine language switching on mobile/web v3.0 (instant update, no reload) 
 * @author ChatGPT
 *
 * @help
 * Full mobile fix for SRD_TranslationEngine.
 * Language switching works immediately, without errors.
 * Place BELOW SRD_TranslationEngine.js.
 */

(function() {
    if (!SRD || !SRD.TranslationEngine) {
        console.error('SRD_TranslationEngine is required for this fix!');
        return;
    }

    const params = PluginManager.parameters('SRD_TranslationEngine');

    if (!Array.isArray(SRD.TranslationEngine.languages) || SRD.TranslationEngine.languages.length === 0) {
        try {
            SRD.TranslationEngine.languages = JSON.parse(params['Languages']) || [];
        } catch (e) {
            console.error('Failed to parse Languages in SRD_TranslationEngine.', e);
            SRD.TranslationEngine.languages = [];
        }
    }

    SRD.TranslationEngine.sourceName = SRD.TranslationEngine.sourceName || params['Source Language Name'] || 'English';
    SRD.TranslationEngine.optionName = SRD.TranslationEngine.optionName || params['Option Name'] || 'Language';

    if (Utils.isNwjs()) {
        console.log('FixTranslationOption: NW.js detected, fix disabled on PC.');
        return;
    }

    // Force adding the option
    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.call(this);
        this.addCommand(SRD.TranslationEngine.optionName, 'language');
    };

    // Show language name
    const _Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function(index) {
        const symbol = this.commandSymbol(index);
        const value = this.getConfigValue(symbol);
        if (symbol === 'language') {
            if (value === 0) return SRD.TranslationEngine.sourceName;
            return SRD.TranslationEngine.languages[value - 1] || 'Unknown';
        }
        return _Window_Options_statusText.call(this, index);
    };

    function safeLangLength() {
        return SRD.TranslationEngine.languages.length;
    }

    // Handle input
    const _Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function() {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (symbol === 'language') {
            const value = this.getConfigValue(symbol);
            const total = safeLangLength() + 1;
            const newValue = (value + 1) % total;
            this.changeValue(symbol, newValue);
            applyLanguageImmediately(newValue);
        } else {
            _Window_Options_processOk.call(this);
        }
    };

    const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function(wrap) {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (symbol === 'language') {
            const value = this.getConfigValue(symbol);
            const total = safeLangLength() + 1;
            const newValue = (value + 1) % total;
            this.changeValue(symbol, newValue);
            applyLanguageImmediately(newValue);
        } else {
            _Window_Options_cursorRight.call(this, wrap);
        }
    };

    const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
    Window_Options.prototype.cursorLeft = function(wrap) {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (symbol === 'language') {
            const value = this.getConfigValue(symbol);
            const total = safeLangLength() + 1;
            const newValue = (value + total - 1) % total;
            this.changeValue(symbol, newValue);
            applyLanguageImmediately(newValue);
        } else {
            _Window_Options_cursorLeft.call(this, wrap);
        }
    };

    function applyLanguageImmediately(langIndex) {
        ConfigManager.language = langIndex;
        ConfigManager.save();

        const filename = langIndex === 0 
            ? 'translations/Source.json' 
            : `translations/${SRD.TranslationEngine.languages[langIndex - 1]}.json`;

        loadTranslationFile(filename);
    }

    function loadTranslationFile(filename) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', filename);
        xhr.overrideMimeType('application/json');
        xhr.onload = function() {
            if (xhr.status < 400) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    SRD.TranslationEngine._translations = data;
                    SceneManager._scene && SceneManager._scene.refresh && SceneManager._scene.refresh();
                    console.log('Language changed successfully:', filename);
                } catch (e) {
                    console.error('Failed to parse translation file:', filename, e);
                }
            } else {
                console.error('Failed to load translation file:', filename);
            }
        };
        xhr.onerror = function() {
            console.error('Error loading translation file:', filename);
        };
        xhr.send();
    }

})();

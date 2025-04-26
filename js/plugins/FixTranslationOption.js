/*:
 * @plugindesc [Fix] Force SRD_TranslationEngine language option to work properly on mobile/web (Android, iOS, HTML5) v2.1 FULL FIX
 * @author ChatGPT
 *
 * @help
 * Fixes missing language list and broken language switching in SRD_TranslationEngine on mobile.
 * Place BELOW SRD_TranslationEngine.js
 */

(function() {
    if (!SRD || !SRD.TranslationEngine) {
        console.error('SRD_TranslationEngine is required for SRD_TranslationEngine_FixMobile.js!');
        return;
    }

    if (!SRD.TranslationEngine.optionName) {
        SRD.TranslationEngine.optionName = PluginManager.parameters('SRD_TranslationEngine')['Option Name'] || 'Language';
    }

    // === FORCE LOAD LANGUAGE LIST CORRECTLY
    const srdParams = PluginManager.parameters('SRD_TranslationEngine');
    if (!Array.isArray(SRD.TranslationEngine.languages) || SRD.TranslationEngine.languages.length === 0) {
        try {
            SRD.TranslationEngine.languages = JSON.parse(srdParams['Languages']);
            console.log('Fixed: Loaded languages from plugin parameters:', SRD.TranslationEngine.languages);
        } catch (e) {
            console.error('Failed to parse Languages in SRD_TranslationEngine', e);
            SRD.TranslationEngine.languages = [];
        }
    }
    if (!SRD.TranslationEngine.sourceName) {
        SRD.TranslationEngine.sourceName = srdParams['Source Language Name'] || 'English';
    }

    if (Utils.isNwjs()) {
        console.log('FixTranslationOption: NW.js detected, fix disabled on PC.');
        return;
    }

    // === Inject language option into options menu
    const alias_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        alias_addGeneralOptions.call(this);
        this.addCommand(SRD.TranslationEngine.optionName, 'language');
    };

    const alias_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function(index) {
        const symbol = this.commandSymbol(index);
        const value = this.getConfigValue(symbol);

        if (symbol === 'language') {
            const langs = SRD.TranslationEngine.languages || [];
            const source = SRD.TranslationEngine.sourceName || 'English';
            if (value === 0) return source;
            return langs[value - 1] || 'Unknown';
        }
        return alias_statusText.call(this, index);
    };

    function safeLangLength() {
        if (SRD && SRD.TranslationEngine && Array.isArray(SRD.TranslationEngine.languages)) {
            return SRD.TranslationEngine.languages.length;
        }
        return 0;
    }

    const alias_cursorRight = Window_Options.prototype.cursorRight;
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
            alias_cursorRight.call(this, wrap);
        }
    };

    const alias_cursorLeft = Window_Options.prototype.cursorLeft;
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
            alias_cursorLeft.call(this, wrap);
        }
    };

    const alias_processOk = Window_Options.prototype.processOk;
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
            alias_processOk.call(this);
        }
    };

    function applyLanguageImmediately(langIndex) {
        if (!SRD.TranslationEngine) return;
        ConfigManager.language = langIndex;
        ConfigManager.save();
        if (SRD.TranslationEngine.loadLanguage) {
            SRD.TranslationEngine.loadLanguage();
        }
    }

})();

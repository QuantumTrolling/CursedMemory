
/*:
 * @plugindesc Customizes the Options Menu and Title Screen: removes unwanted options, renames sound settings, and adds an Exit Game button. Fixes volume % display. @author ChatGPT
 * @target MV
 */

(function() {

    // === OPTIONS MENU MODIFICATIONS ===

    // Remove unwanted commands
    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.call(this);

        // Filter out specific commands
        this._list = this._list.filter(option => {
            return ![
                'alwaysDash',
                'commandRemember',
                'battleCamera'
            ].includes(option.symbol);
        });
    };

    // Rename volume labels and fix % display
    const _Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function(index) {
        const symbol = this.commandSymbol(index);
        if (this.isVolumeSymbol(symbol)) {
            return this.getConfigValue(symbol) + '%'; // value already in percent
        }
        return _Window_Options_statusText.call(this, index);
    };

    const _Window_Options_commandName = Window_Options.prototype.commandName;
    Window_Options.prototype.commandName = function(symbol) {
        switch (symbol) {
            case 'bgmVolume': return 'Музыка';
            case 'bgsVolume': return 'Эмбиент';
            case 'seVolume': return 'Эффекты';
            case 'meVolume': return null; // Hide ME volume
        }
        return Window_Command.prototype.commandName.call(this, symbol);
    };

    // Filter out ME volume from list
    const _Window_Options_addVolumeOptions = Window_Options.prototype.addVolumeOptions;
    Window_Options.prototype.addVolumeOptions = function() {
        const oldPush = this._list.push.bind(this._list);
        this._list.push = function(option) {
            if (option.symbol === 'meVolume') return;
            oldPush(option);
        };
        _Window_Options_addVolumeOptions.call(this);
        this._list.push = oldPush;
    };

    // === TITLE SCREEN MODIFICATIONS ===

    const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        _Window_TitleCommand_makeCommandList.call(this);
        this.addCommand('Выйти из игры', 'exitGame');
    };

    const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.call(this);
        this._commandWindow.setHandler('exitGame', this.commandExitGame.bind(this));
    };

    Scene_Title.prototype.commandExitGame = function() {
        this._commandWindow.close();
        this.fadeOutAll();
        SceneManager.exit();
    };

})();

/*:
 * @target MV
 * @plugindesc Add "options" party battle command.
 * @author Caethyril
 * @url https://forums.rpgmakerweb.com/threads/165820/
 * @help Free to use and/or modify for any project, no credit required.
 */
;void (() => {
"use strict";

  const KEY = "_optionsWindow";

  const showOptions = function() {
    this[KEY].open();
    this[KEY].activate();
  };

  const resumeBattle = function() {
    ConfigManager.save();
    this[KEY].deactivate();
    this[KEY].close();
    this._partyCommandWindow.activate();
  };

  void (alias => {
    Scene_Battle.prototype.createAllWindows = function() {
      alias.apply(this, arguments);
      const w = this[KEY] = new Window_Options();
      w.setHandler("cancel", resumeBattle.bind(this));
      w.openness = 0;
      w.deactivate();
      this.addWindow(w);
    };
  })(Scene_Battle.prototype.createAllWindows);

  void (alias => {
    Scene_Battle.prototype.createPartyCommandWindow = function() {
      alias.apply(this, arguments);
      this._partyCommandWindow.setHandler("options", showOptions.bind(this));
    };
  })(Scene_Battle.prototype.createPartyCommandWindow);

  void (alias => {
    Scene_Battle.prototype.isAnyInputWindowActive = function() {
      return alias.apply(this, arguments) || this[KEY].active;
    };
  })(Scene_Battle.prototype.isAnyInputWindowActive);

  void (alias => {
    Window_PartyCommand.prototype.makeCommandList = function() {
      alias.apply(this, arguments);
      this.addCommand(TextManager.options, "options");
    };
  })(Window_PartyCommand.prototype.makeCommandList);

})();
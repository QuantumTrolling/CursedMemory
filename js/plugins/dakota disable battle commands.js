(() => {
  const _Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
  Scene_Battle.prototype.startActorCommandSelection = function() {
    _Scene_Battle_startActorCommandSelection.call(this);

    // Скрываем окно команд, как было в оригинале
    this._actorCommandWindow.hide();
    this._actorCommandWindow.deactivate();

    // Автоматически открываем окно навыков
    this.commandSkill();
  };
})();м
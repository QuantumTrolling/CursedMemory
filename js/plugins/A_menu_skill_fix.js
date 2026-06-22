//=============================================================================
// Replace Item With Escape + No Retreat Movement
//=============================================================================

(function() {

    // Убираем окно Fight/Escape
    Scene_Battle.prototype.startPartyCommandSelection = function() {
        this.refreshStatus();
        this.selectNextCommand();
    };

    // Заменяем Item на Escape
    Window_ActorCommand.prototype.addItemCommand = function() {
        this.addCommand(
            TextManager.escape,
            'escape',
            BattleManager.canEscape()
        );
    };

    const _createActorCommandWindow =
        Scene_Battle.prototype.createActorCommandWindow;

    Scene_Battle.prototype.createActorCommandWindow = function() {
        _createActorCommandWindow.call(this);

        this._actorCommandWindow.setHandler(
            'escape',
            this.commandEscape.bind(this)
        );
    };

    // Отключаем движение персонажей при отступлении
    Sprite_Actor.prototype.retreat = function() {
        // ничего не делаем
    };

})();
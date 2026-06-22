//=============================================================================
// Replace Item With Escape + No Retreat Movement
//=============================================================================

(function() {

    // Убираем окно Fight/Escape
    Scene_Battle.prototype.startPartyCommandSelection = function() {
        this.refreshStatus();
        this.selectNextCommand();
    };

	//=============================================================================
	// Полностью свой список команд
	// Навыки + Отступить
	//=============================================================================

	Window_ActorCommand.prototype.makeCommandList = function() {

		if (!this._actor) return;

		// Единственный тип навыков
		this.addCommand(
			$dataSystem.skillTypes[1] || TextManager.skill,
			'skill',
			true,
			1
		);

		// Отступить
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
	
	//-----------------------------------------------------------------------------
	// YEP Battle Engine - no Party Command return
	//-----------------------------------------------------------------------------

	if (Imported.YEP_BattleEngineCore) {

		Scene_Battle.prototype.selectPreviousCommand = function() {

			if (this.isStartActorCommand()) {

				BattleManager.selectPreviousCommand();

				// Не даём уйти в Party Command
				if (!BattleManager.actor() && BattleManager.isInputting()) {

					var members = $gameParty.battleMembers();

					for (var i = 0; i < members.length; i++) {

						if (members[i].canInput()) {

							BattleManager._actorIndex = i;
							this.startActorCommandSelection();
							return;

						}
					}
				}

			} else {

				Yanfly.BEC.Scene_Battle_selectPreviousCommand.call(this);

			}
		};

	}

})();
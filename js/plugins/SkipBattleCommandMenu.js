/*:
 * @plugindesc DEBUG: Log actor command selection and command windows for YEP/CTB/MOG battle
 * @author ChatGPT
 */

(function() {

    // Логируем вызов выбора команды актера
    const _BattleManager_startActorCommandSelection = BattleManager.startActorCommandSelection;
    BattleManager.startActorCommandSelection = function() {
        console.log('--- BattleManager.startActorCommandSelection called ---');

        // Показываем текущего актера
        const actor = this.actor();
        console.log('Current actor:', actor ? actor.name() : 'NULL');

        // Логируем окна сцен
        const scene = SceneManager._scene;
        console.log('Scene:', scene);
        if (scene._actorCommandWindow) console.log('_actorCommandWindow exists');
        if (scene._partyCommandWindow) console.log('_partyCommandWindow exists');
        if (scene._commandWindow) console.log('_commandWindow exists');

        // Логируем список команд в окне
        let cmdWin = scene._actorCommandWindow || scene._partyCommandWindow || scene._commandWindow;
        if (cmdWin) {
            console.log('Command window contents:');
            if (cmdWin._list) {
                cmdWin._list.forEach((cmd, i) => {
                    console.log(`  [${i}] name: ${cmd.name}, symbol: ${cmd.symbol}`);
                });
            } else {
                console.log('  No _list found in command window');
            }
        } else {
            console.log('No command window found');
        }

        _BattleManager_startActorCommandSelection.call(this);
    };

})();
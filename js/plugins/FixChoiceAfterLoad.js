/*:
 * @plugindesc [FixChoiceAfterLoad_Strict] Восстановление выбора после загрузки. Полностью игнорирует ввод имени (в том числе с Name Input Upgrade). @author ChatGPT
 */

(function () {

    function isNameInputScene() {
        const scene = SceneManager._scene;
        if (!scene) return false;

        // Проверяем стандартную и возможные кастомные сцены ввода имени
        const sceneName = scene.constructor.name;
        return scene instanceof Scene_Name ||
               sceneName.includes("Name") ||       // Scene_NameInput, Scene_NameInputUpgrade и т.п.
               sceneName.toLowerCase().includes("name");
    }

    const _GameMessage_setChoices = Game_Message.prototype.setChoices;
    Game_Message.prototype.setChoices = function(choices, defaultType, cancelType) {
        _GameMessage_setChoices.call(this, choices, defaultType, cancelType);

        // Удаляем любые старые сохранённые данные
        $gameSystem._savedChoiceData = null;
        $gameSystem._savedChoiceCallback = null;

        // Абсолютно игнорируем всё, если идёт ввод имени
        if (isNameInputScene()) return;

        if (SceneManager._scene instanceof Scene_Map) {
            $gameSystem._savedChoiceData = {
                choices: choices.slice(),
                defaultType: defaultType,
                cancelType: cancelType,
                callbackSet: false
            };
        }
    };

    const _GameMessage_setChoiceCallback = Game_Message.prototype.setChoiceCallback;
    Game_Message.prototype.setChoiceCallback = function(callback) {
        _GameMessage_setChoiceCallback.call(this, callback);

        if (typeof callback === 'function' && $gameSystem._savedChoiceData) {
            try {
                $gameSystem._savedChoiceCallback = callback.toString();
                $gameSystem._savedChoiceData.callbackSet = true;
            } catch (e) {
                console.warn("Ошибка сериализации выбора:", e);
            }
        }
    };

	const __FixChoiceAfterLoad_Scene_Map_start = Scene_Map.prototype.start;
	Scene_Map.prototype.start = function() {
		__FixChoiceAfterLoad_Scene_Map_start.call(this); // <--- важно!

		f (isNameInputScene()) {
			$gameSystem._savedChoiceData = null;
			$gameSystem._savedChoiceCallback = null;
			return;
		}

    const data = $gameSystem._savedChoiceData;
    const fnStr = $gameSystem._savedChoiceCallback;

    if (data && data.callbackSet && fnStr) {
        try {
            $gameMessage.setChoices(data.choices, data.defaultType, data.cancelType);
            const fnBody = fnStr.match(/function\\s*\\(\\s*n\\s*\\)\\s*\\{([\\s\\S]*)\\}$/)[1];
            const restoredFn = new Function("n", fnBody);
            $gameMessage.setChoiceCallback(restoredFn);
        } catch (e) {
            console.warn("Ошибка восстановления выбора:", e);
            $gameMessage.setChoiceCallback(null);
        }
    }

    $gameSystem._savedChoiceData = null;
    $gameSystem._savedChoiceCallback = null;
};

})();

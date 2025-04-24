//=============================================================================
// RPG Maker MZ - Button Picture
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Makes a picture clickable & Adds variable control.
 * @author Yoji Ojima
 *
 * @help ButtonPicture.js
 *
 * This plugin provides a command to call a common event when a picture is
 * clicked.
 *
 * Use it in the following procedure.
 *   1. Execute "Show Picture" to display your button image.
 *   2. Call the plugin command "Set Button Picture".
 *   3. Set Variable ID and value to assign to said Picture ID.
 *
 * @command set
 * @text Set Button Picture
 * @desc Makes the specified picture clickable.
 *
 * @arg pictureId
 * @type number
 * @min 1
 * @max 100
 * @default 1
 * @text Picture Number
 * @desc Control number of the picture.
 *
 * @arg commonEventId
 * @type common_event
 * @default 1
 * @text Common Event
 * @desc Common event to call when the picture is clicked.
 *
 * @arg VariableId
 * @type variable
 * @default 1
 * @text Variable ID
 * @desc Variable used to attribute a value to the comment event call.
 *
 * @arg VariableValue
 * @type text
 * @default 1
 * @text Variable Value
 * @desc Value given to determine how the common event should react.
 */

/*:ja
 * @target MZ
 * @plugindesc ピクチャをクリック可能にします。
 * @author Yoji Ojima
 *
 * @help ButtonPicture.js
 *
 * このプラグインは、ピクチャのクリック時にコモンイベントを呼び出すコマンドを
 * 提供します。
 *
 * 次の手順で使用してください。
 *   1. 「ピクチャの表示」を実行して、ボタン画像を表示します。
 *   2. プラグインコマンド「ボタンピクチャの設定」を呼び出します。
 *   3. ピクチャーナンバーに割り当てる変数番号と値を設定します。
 *
 * @command set
 * @text ボタンピクチャの設定
 * @desc 指定したピクチャをクリック可能にします。
 *
 * @arg pictureId
 * @type number
 * @min 1
 * @max 100
 * @default 1
 * @text ピクチャ番号
 * @desc ピクチャの管理番号です。
 *
 * @arg commonEventId
 * @type common_event
 * @default 1
 * @text コモンイベント
 * @desc ピクチャがクリックされた時に呼び出すコモンイベントです。
 *
 * @arg VariableId
 * @type variable
 * @default 1
 * @text ヴァリアブル番号
 * @desc コモン・イベント・コールに値を帰属させるために使用される変数。
 *
 * @arg VariableValue
 * @type text
 * @default 1
 * @text ヴァリアブル価値
 * @desc 共通のイベントがどのように反応すべきかを決定するために与えられた値。
 */

(() => {
    const pluginName = "ButtonPicture";

    PluginManager.registerCommand(pluginName, "set", args => {
        const pictureId = Number(args.pictureId);
        const commonEventId = Number(args.commonEventId);
        const variableId = Number(args.VariableId);
        const variableValue = args.VariableValue;
        const picture = $gameScreen.picture(pictureId);
        if (picture) {
            picture.mzkp_commonEventId = commonEventId;
            picture.mzkp_variableId = variableId;
            picture.mzkp_variableValue = variableValue;}
    });

    Sprite_Picture.prototype.isClickEnabled = function() {
        const picture = this.picture();
        return picture && picture.mzkp_commonEventId && picture.mzkp_variableId && picture.mzkp_variableValue && !$gameMessage.isBusy();
    };

    Sprite_Picture.prototype.onClick = function() {
        $gameTemp.reserveCommonEvent(this.picture().mzkp_commonEventId);
        $gameVariables.setValue(this.picture().mzkp_variableId,this.picture().mzkp_variableValue)

    };

    Spriteset_Base.prototype.mzkp_isAnyPicturePressed = function() {
        return this._pictureContainer.children.some(sprite =>
            sprite.isPressed()
        );
    };

    const _Scene_Map_isAnyButtonPressed =
        Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed = function() {
        return (
            _Scene_Map_isAnyButtonPressed.apply(this, arguments) ||
            this._spriteset.mzkp_isAnyPicturePressed()
        );
    };
})();

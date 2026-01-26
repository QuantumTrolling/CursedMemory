/*:
 * @plugindesc Мини-плагин для отладки слоёв битвы и позиций battleback и battlefield
 * @author ChatGPT
 */

(function() {
    const _SB_createSpriteset = Scene_Battle.prototype.createSpriteset;
    Scene_Battle.prototype.createSpriteset = function() {
        _SB_createSpriteset.call(this);

        // Создаем кастомный battleback
        const backFile = $gameTemp.battleCameraBattleback || $dataSystem.battleback1Name;
        this._customBattleback = new Sprite();
        this._customBattleback.bitmap = ImageManager.loadBattleback1(backFile);

        // Добавляем прямо в _spriteset, а не в _battleField
        this._spriteset.addChildAt(this._customBattleback, 0);

        console.log('--- BattleLayerLogger ---');
        console.log('CustomBattleback:', this._customBattleback);
        console.log('BattleField:', this._spriteset._battleField);
        console.log('BattleField children count:', this._spriteset._battleField.children.length);
        console.log('--------------------------');
    };

    const _SB_update = Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update = function() {
        _SB_update.call(this);

        if (this._customBattleback && this._customBattleback.bitmap.isReady()) {
            console.log('--- BattleLayerLogger Update ---');
            console.log('CustomBattleback x,y:', this._customBattleback.x, this._customBattleback.y);
            console.log('BattleField x,y:', this._battleField.x, this._battleField.y);
            console.log('BattleField scale x,y:', this._battleField.scale.x, this._battleField.scale.y);
            console.log('--------------------------');
        }
    };
})();
//=============================================================================
// BattleCamera_ScreenSpaceFix.js
//=============================================================================
/*:
 * @plugindesc Forces damage popups and Octopath HUD into screen-space (camera-safe)
 * @author ChatGPT
 *
 * @help
 * - Damage / regen popups stay fixed on screen
 * - Olivia_OctoBattle HUD ignores camera movement & zoom
 * - Designed for heavy camera usage
 * - Place LAST in plugin list
 */

(function() {
'use strict';

//--------------------------------------------------------------------------
// Utils
//--------------------------------------------------------------------------
function worldToScreen(sprite) {
    if (!sprite || !sprite.parent) return null;
    return sprite.parent.toGlobal(sprite.position);
}

//--------------------------------------------------------------------------
// FIX DAMAGE POPUPS
//--------------------------------------------------------------------------
const _Sprite_Damage_update = Sprite_Damage.prototype.update;
Sprite_Damage.prototype.update = function() {
    _Sprite_Damage_update.call(this);

    if (!this._target) return;

    const targetSprite = this._target.sprite;
    if (!targetSprite) return;

    const globalPos = worldToScreen(targetSprite);
    if (!globalPos) return;

    this.x = globalPos.x + this._xOffset;
    this.y = globalPos.y + this._yOffset;
    this.scale.x = 1;
    this.scale.y = 1;
};

//--------------------------------------------------------------------------
// FIX OCTOPATH HUD
//--------------------------------------------------------------------------
if (typeof Sprite_OctoEnemyHud !== 'undefined') {

    const _OctoHud_update = Sprite_OctoEnemyHud.prototype.update;
    Sprite_OctoEnemyHud.prototype.update = function() {
        _OctoHud_update.call(this);

        if (!this._enemySprite) return;

        const globalPos = worldToScreen(this._enemySprite);
        if (!globalPos) return;

        this.x = globalPos.x;
        this.y = globalPos.y - 48;

        this.scale.x = 1;
        this.scale.y = 1;
    };
}

})();
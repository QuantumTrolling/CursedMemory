/*:
 * @plugindesc Показывает Turn.png над актёром во время выбора навыка v2.2
 * @author You
 *
 * @help
 * Картинка: img/battlehud/Turn.png
 *
 * Смещена на 30% ширины спрайта влево.
 * Появляется при выборе навыка.
 * Мерцает и плавно двигается.
 *
 * @param OffsetY
 * @type number
 * @default -10
 */

(function() {
"use strict";

var pluginName = "A_turn_arrow_actors";
var parameters = PluginManager.parameters(pluginName) || {};

var offsetY = Number(parameters["OffsetY"] || -10);

var _createSpriteset = Scene_Battle.prototype.createSpriteset;
var _update = Scene_Battle.prototype.update;

Scene_Battle.prototype.createSpriteset = function() {
    _createSpriteset.call(this);

    this._turnIndicator = new Sprite();
    this._turnIndicator.bitmap =
        ImageManager.loadBitmap("img/battlehud/", "Turn");

    this._turnIndicator.anchor.set(0.5, 1);
    this._turnIndicator.visible = false;
    this._turnIndicator.opacity = 255;
    this._turnIndicator._floatTime = 0;

    // поверх актёров
    this._spriteset.addChild(this._turnIndicator);
};

Scene_Battle.prototype.update = function() {
    _update.call(this);

    if (!this._turnIndicator) return;

    var actor = BattleManager.actor();
    var skillActive = this._skillWindow && this._skillWindow.active;

    if (actor && skillActive) {

        var sprite = this._spriteset._actorSprites[actor.index()];
        if (!sprite || !sprite.visible) return;

        var bounds = sprite.getBounds();

        var centerX = bounds.x + bounds.width / 2;

        // 🔥 Смещение на 30% ширины влево
        var shiftedX = centerX - (bounds.width * 0.2);

        var topY = bounds.y;

        this._turnIndicator._floatTime += 0.08;

        var floatOffset = Math.sin(this._turnIndicator._floatTime) * 6;
        var alphaPulse  = 210 + Math.sin(this._turnIndicator._floatTime * 2) * 45;

        this._turnIndicator.x = shiftedX;
        this._turnIndicator.y = topY + offsetY + floatOffset;
        this._turnIndicator.opacity = alphaPulse;

        this._turnIndicator.visible = true;

    } else {
        this._turnIndicator.visible = false;
    }
};

})();
/*:
 * @plugindesc Показывает Turn.png над актёром во время выбора навыка v2.5
 * @author You
 *
 * @help
 * Картинка берётся из:
 * img/battlehud/Turn.png
 *
 * Появляется ТОЛЬКО когда активно окно навыков.
 * Исчезает при выходе из выбора навыка.
 * Мерцает и плавно двигается вверх/вниз.
 *
 * Можно настроить индивидуальное смещение для каждого актора (1-16).
 * Если для актора не задано смещение, используются общие значения OffsetX/OffsetY.
 *
 * @param OffsetX
 * @type number
 * @desc Общее смещение по X (отрицательное – левее, положительное – правее)
 * @default 0
 *
 * @param OffsetY
 * @type number
 * @desc Общее смещение по Y (отрицательное – выше, положительное – ниже)
 * @default -80
 *
 * @param Actor1X
 * @type number
 * @desc Смещение по X для актора 1
 * @default 0
 *
 * @param Actor1Y
 * @type number
 * @desc Смещение по Y для актора 1
 * @default -80
 *
 * @param Actor2X
 * @type number
 * @desc Смещение по X для актора 2
 * @default 0
 *
 * @param Actor2Y
 * @type number
 * @desc Смещение по Y для актора 2
 * @default -80
 *
 * @param Actor3X
 * @type number
 * @desc Смещение по X для актора 3
 * @default 0
 *
 * @param Actor3Y
 * @type number
 * @desc Смещение по Y для актора 3
 * @default -80
 *
 * @param Actor4X
 * @type number
 * @desc Смещение по X для актора 4
 * @default 0
 *
 * @param Actor4Y
 * @type number
 * @desc Смещение по Y для актора 4
 * @default -80
 *
 * @param Actor5X
 * @type number
 * @desc Смещение по X для актора 5
 * @default 0
 *
 * @param Actor5Y
 * @type number
 * @desc Смещение по Y для актора 5
 * @default -80
 *
 * @param Actor6X
 * @type number
 * @desc Смещение по X для актора 6
 * @default 0
 *
 * @param Actor6Y
 * @type number
 * @desc Смещение по Y для актора 6
 * @default -80
 *
 * @param Actor7X
 * @type number
 * @desc Смещение по X для актора 7
 * @default 0
 *
 * @param Actor7Y
 * @type number
 * @desc Смещение по Y для актора 7
 * @default -80
 *
 * @param Actor8X
 * @type number
 * @desc Смещение по X для актора 8
 * @default 0
 *
 * @param Actor8Y
 * @type number
 * @desc Смещение по Y для актора 8
 * @default -80
 *
 * @param Actor9X
 * @type number
 * @desc Смещение по X для актора 9
 * @default 0
 *
 * @param Actor9Y
 * @type number
 * @desc Смещение по Y для актора 9
 * @default -80
 *
 * @param Actor10X
 * @type number
 * @desc Смещение по X для актора 10
 * @default 0
 *
 * @param Actor10Y
 * @type number
 * @desc Смещение по Y для актора 10
 * @default -80
 *
 * @param Actor11X
 * @type number
 * @desc Смещение по X для актора 11
 * @default 0
 *
 * @param Actor11Y
 * @type number
 * @desc Смещение по Y для актора 11
 * @default -80
 *
 * @param Actor12X
 * @type number
 * @desc Смещение по X для актора 12
 * @default 0
 *
 * @param Actor12Y
 * @type number
 * @desc Смещение по Y для актора 12
 * @default -80
 *
 * @param Actor13X
 * @type number
 * @desc Смещение по X для актора 13
 * @default 0
 *
 * @param Actor13Y
 * @type number
 * @desc Смещение по Y для актора 13
 * @default -80
 *
 * @param Actor14X
 * @type number
 * @desc Смещение по X для актора 14
 * @default 0
 *
 * @param Actor14Y
 * @type number
 * @desc Смещение по Y для актора 14
 * @default -80
 *
 * @param Actor15X
 * @type number
 * @desc Смещение по X для актора 15
 * @default 0
 *
 * @param Actor15Y
 * @type number
 * @desc Смещение по Y для актора 15
 * @default -80
 *
 * @param Actor16X
 * @type number
 * @desc Смещение по X для актора 16
 * @default 0
 *
 * @param Actor16Y
 * @type number
 * @desc Смещение по Y для актора 16
 * @default -80
 */

(function() {
"use strict";

var pluginName = "A_turn_arrow_actors";

function getPluginParameters() {
    return PluginManager.parameters(pluginName) || {};
}

function getActorOffset(actorId) {
    var parameters = getPluginParameters();

    var defaultOffsetX = Number(parameters["OffsetX"] || 0);
    var defaultOffsetY = Number(parameters["OffsetY"] || -80);

    if (actorId >= 1 && actorId <= 16) {
        var actorX = parameters["Actor" + actorId + "X"];
        var actorY = parameters["Actor" + actorId + "Y"];

        return {
            x: actorX !== undefined ? Number(actorX) : defaultOffsetX,
            y: actorY !== undefined ? Number(actorY) : defaultOffsetY
        };
    }

    return { x: defaultOffsetX, y: defaultOffsetY };
}

// ------------------------------------------------------------
// Scene_Battle
// ------------------------------------------------------------

var _createSpriteset = Scene_Battle.prototype.createSpriteset;
var _update = Scene_Battle.prototype.update;

Scene_Battle.prototype.createSpriteset = function() {
    _createSpriteset.call(this);

    this._turnIndicator = new Sprite();
    this._turnIndicator.bitmap =
        ImageManager.loadBitmap("img/battlehud/", "Turn");

    this._turnIndicator.anchor.x = 0.5;
    this._turnIndicator.anchor.y = 0.5;

    this._turnIndicator.visible = false;
    this._turnIndicator.opacity = 255;
    this._turnIndicator._floatTime = 0;

    // 🔥 ВАЖНО: добавляем НЕ в battlefield, а непосредственно в сцену
    this.addChild(this._turnIndicator);
};

Scene_Battle.prototype.update = function() {
    _update.call(this);

    if (!this._turnIndicator) return;

    var actor = BattleManager.actor();
    var skillActive = this._skillWindow && this._skillWindow.active;

    if (actor && skillActive) {
        var index = actor.index();
        var sprite = this._spriteset._actorSprites[index];
        if (!sprite) return;

        var actorId = actor.actorId();
        var offset = getActorOffset(actorId);

        var spriteY = sprite.y;
        var spriteHeight = sprite.height * sprite.scale.y;

        var topOfSprite = spriteY - spriteHeight;
        var baseX = sprite.x + offset.x;
        var baseY = topOfSprite + offset.y;

        // Анимация
        this._turnIndicator._floatTime += 0.1;
        var floatOffset = Math.sin(this._turnIndicator._floatTime) * 5;
        var alphaPulse  = 200 + Math.sin(this._turnIndicator._floatTime * 2) * 55;

        this._turnIndicator.x = baseX;
        this._turnIndicator.y = baseY + floatOffset;
        this._turnIndicator.opacity = alphaPulse;

        this._turnIndicator.visible = true;

    } else {
        this._turnIndicator.visible = false;
    }
};

})();
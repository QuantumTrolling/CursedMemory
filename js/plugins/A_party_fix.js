/*:
 * @target MV
 * @plugindesc Custom Party Scene v19 (fixed text arrows, stable pages)
 * @author ChatGPT (improved)
 *
 * @help
 * Меняет состав боевого отряда:
 * - Верхняя панель: лица резервных героев, по 6 на странице (по умолчанию),
 *   равномерно распределённые от края до края экрана.
 *   Размер лиц никогда не превышает 144px, но уменьшается при необходимости.
 * - Стрелки навигации: символы ◀ и ▶, всегда на одном и том же месте.
 * - Нижняя панель: портреты текущего боевого отряда (макс. 4).
 * - Клик по герою → мигание, клик по другому → обмен местами.
 *
 * @param facesPerPage
 * @desc Количество резервных лиц на странице (по умолчанию 6)
 * @default 6
 *
 * @param maxFaceSize
 * @desc Максимальный размер лица в пикселях (ширина = высота). По умолчанию 144.
 * @default 144
 *
 * @param faceSpacing
 * @desc Минимальный промежуток между лицами в пикселях
 * @default 10
 */

(function() {

var parameters = PluginManager.parameters('CustomPartyScene');
var facesPerPage = Number(parameters['facesPerPage'] || 6);
var maxFaceSize = Number(parameters['maxFaceSize'] || 144);
var faceSpacing = Number(parameters['faceSpacing'] || 10);

// Размер битмапа под стрелку
var ARROW_BITMAP_SIZE = 36;

function Scene_PartyCustom() {
    this.initialize.apply(this, arguments);
}

Scene_PartyCustom.prototype = Object.create(Scene_MenuBase.prototype);
Scene_PartyCustom.prototype.constructor = Scene_PartyCustom;

Scene_PartyCustom.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);

    this._selectedActor = null;
    this._selectedSprite = null;
    this._clickableSprites = [];
    this._reservePage = 0;

    this.createTitle();
    this.createParty();
    this.createFaceBar();
    this.updateClickableList();
};

Scene_PartyCustom.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
        SoundManager.playCancel();
        SceneManager.pop();
    }
    if (TouchInput.isTriggered()) {
        this.handleClick();
    }
};

Scene_PartyCustom.prototype.createTitle = function() {
    this._titleWindow = new Window_Base(0, 0, 240, 72);
    this._titleWindow.drawText("PARTY", 0, 0, 200, 'left');
    this.addWindow(this._titleWindow);
};

Scene_PartyCustom.prototype.createFaceBar = function() {
    this._faceContainer = new Sprite();
    this._faceContainer.y = 100;
    this.addChild(this._faceContainer);
    this.refreshFaces();
};

Scene_PartyCustom.prototype.allReserveIds = function() {
    var battleIds = $gameParty._battleMembers.filter(function(id) {
        return id > 0 && $gameActors.actor(id);
    });
    return $gameParty._actors.filter(function(actorId) {
        return !battleIds.contains(actorId) && $gameActors.actor(actorId);
    });
};

Scene_PartyCustom.prototype.maxReservePages = function() {
    return Math.ceil(this.allReserveIds().length / facesPerPage);
};

Scene_PartyCustom.prototype.reserveActorsForPage = function(page) {
    var ids = this.allReserveIds();
    var start = page * facesPerPage;
    return ids.slice(start, start + facesPerPage).map(function(id) {
        return $gameActors.actor(id);
    });
};

Scene_PartyCustom.prototype.refreshFaces = function() {
    this._faceContainer.removeChildren();

    if (this._reservePage >= this.maxReservePages()) {
        this._reservePage = Math.max(0, this.maxReservePages() - 1);
    }

    var actors = this.reserveActorsForPage(this._reservePage);
    var count = actors.length;
    if (count === 0) {
        this.updateClickableList();
        return;
    }

    // Определяем размер лиц: не больше maxFaceSize, но уменьшаем, если не влезают
    var availWidth = Graphics.boxWidth;
    var maxFaceDisplayWidth = Math.floor((availWidth - faceSpacing * (count + 1)) / count);
    var faceSize = Math.min(maxFaceSize, maxFaceDisplayWidth);
    var faceScale = faceSize / 144;

    var totalFacesWidth = count * faceSize;
    var actualSpacing = (availWidth - totalFacesWidth) / (count + 1);

    actors.forEach(function(actor, i) {
        var sprite = new Sprite(ImageManager.loadFace(actor.faceName()));
        sprite.setFrame(
            actor.faceIndex() % 4 * 144,
            Math.floor(actor.faceIndex() / 4) * 144,
            144, 144
        );
        sprite.scale.x = faceScale;
        sprite.scale.y = faceScale;
        sprite.x = actualSpacing + i * (faceSize + actualSpacing);
        sprite._actor = actor;
        this.setupInteraction(sprite);
        this._faceContainer.addChild(sprite);
    }, this);

    // Фиксированные позиции стрелок (не зависят от actualSpacing)
    var arrowMargin = 10;                             // отступ от края
    var arrowY = maxFaceSize / 2 - ARROW_BITMAP_SIZE / 2;   // центр по высоте стандартного лица
    var leftArrowX = arrowMargin;
    var rightArrowX = Graphics.boxWidth - ARROW_BITMAP_SIZE - arrowMargin;

    if (this.maxReservePages() > 1) {
        this.createArrow(-1, leftArrowX, arrowY);
        this.createArrow(1, rightArrowX, arrowY);
    }

    if (this._selectedActor && !actors.contains(this._selectedActor)) {
        this.clearSelection();
    }

    this.updateClickableList();
};

// Рисует стрелку текстовым символом ◀ или ▶
Scene_PartyCustom.prototype.createArrow = function(direction, x, y) {
    var bitmap = new Bitmap(ARROW_BITMAP_SIZE, ARROW_BITMAP_SIZE);
    bitmap.fontFace = 'GameFont, sans-serif';
    bitmap.fontSize = 28;
    bitmap.textColor = '#ffffff';
    var symbol = direction === -1 ? '◀' : '▶';
    bitmap.drawText(symbol, 0, 0, ARROW_BITMAP_SIZE, ARROW_BITMAP_SIZE, 'center');

    var sprite = new Sprite(bitmap);
    sprite.x = x;
    sprite.y = y;
    sprite._isArrow = true;
    sprite._arrowDirection = direction;
    this.setupInteraction(sprite);
    this._faceContainer.addChild(sprite);
};

Scene_PartyCustom.prototype.createParty = function() {
    this._partyContainer = new Sprite();
    var charY = (typeof Moghunter !== 'undefined' && Moghunter.scMenu_CharY != null) ? Moghunter.scMenu_CharY : 0;
    this._partyContainer.y = Graphics.boxHeight + charY;
    this.addChild(this._partyContainer);
    this.refreshParty();
};

Scene_PartyCustom.prototype.refreshParty = function() {
    this._partyContainer.removeChildren();
    var battleMembers = $gameParty.battleMembers();
    battleMembers.forEach(function(actor, i) {
        var sprite;
        if (typeof ImageManager.loadMenusFaces3 === 'function') {
            sprite = new Sprite(ImageManager.loadMenusFaces3("actor_" + actor.actorId()));
            sprite._isBust = true;
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 1.0;
        } else {
            sprite = new Sprite(ImageManager.loadFace(actor.faceName()));
            sprite.setFrame(
                actor.faceIndex() % 4 * 144,
                Math.floor(actor.faceIndex() / 4) * 144,
                144, 144
            );
            sprite._isBust = false;
        }
        sprite._actor = actor;
        sprite._baseScaleX = sprite.scale.x || 1;
        sprite._baseScaleY = sprite.scale.y || 1;
        this.setupInteraction(sprite);
        this._partyContainer.addChild(sprite);
    }, this);
    this.layoutParty();
    this.updateClickableList();
};

Scene_PartyCustom.prototype.layoutParty = function() {
    var children = this._partyContainer.children;
    if (children.length === 0) return;
    var maxSlots = $gameParty.maxBattleMembers();
    var space = Math.floor((Graphics.boxWidth - 32) / maxSlots);
    var charX = (typeof Moghunter !== 'undefined' && Moghunter.scMenu_CharX != null) ? Moghunter.scMenu_CharX : 0;
    children.forEach(function(spr, i) {
        spr.x = 16 + (space / 2) + (space * i) + charX;
        spr.y = 0;
    });
};

Scene_PartyCustom.prototype.updateClickableList = function() {
    this._clickableSprites = [];
    if (this._partyContainer) {
        for (var i = 0; i < this._partyContainer.children.length; i++) {
            this._clickableSprites.push(this._partyContainer.children[i]);
        }
    }
    if (this._faceContainer) {
        for (var j = 0; j < this._faceContainer.children.length; j++) {
            this._clickableSprites.push(this._faceContainer.children[j]);
        }
    }
};

Scene_PartyCustom.prototype.setupInteraction = function(sprite) {
    sprite._blink = false;
    sprite.update = function() {
        Sprite.prototype.update.call(this);
        if (this._blink) {
            this.opacity = 150 + Math.sin(Graphics.frameCount * 0.3) * 100;
        } else {
            this.opacity = 255;
        }
    };
    sprite.isHovered = function() {
        var w = this.width * (this.scale.x || 1);
        var h = this.height * (this.scale.y || 1);
        if (w <= 0 || h <= 0) return false;
        var left = this.x - w * (this.anchor.x || 0);
        var top = this.y - h * (this.anchor.y || 0);
        var parentY = this.parent ? this.parent.y : 0;
        return TouchInput.x >= left && TouchInput.x <= left + w &&
               TouchInput.y >= top + parentY && TouchInput.y <= top + parentY + h;
    };
    sprite.startBlink = function() { this._blink = true; };
    sprite.stopBlink = function() { this._blink = false; this.opacity = 255; };
};

Scene_PartyCustom.prototype.handleClick = function() {
    for (var i = this._clickableSprites.length - 1; i >= 0; i--) {
        var spr = this._clickableSprites[i];
        if (spr.isHovered && spr.isHovered()) {
            if (spr._isArrow) {
                this.changeReservePage(spr._arrowDirection);
                return;
            }
            if (spr._actor) {
                this.onActorClick(spr._actor, spr);
            }
            break;
        }
    }
};

Scene_PartyCustom.prototype.changeReservePage = function(direction) {
    var newPage = this._reservePage + direction;
    if (newPage < 0 || newPage >= this.maxReservePages()) {
        SoundManager.playBuzzer();
        return;
    }
    SoundManager.playCursor();
    this._reservePage = newPage;
    this.refreshFaces();
};

Scene_PartyCustom.prototype.onActorClick = function(actor, sprite) {
    if (!this._selectedActor) {
        this.clearSelection();
        this._selectedActor = actor;
        this._selectedSprite = sprite;
        sprite.startBlink();
    } else {
        if (this._swapLock) return;
        this._swapLock = true;
        this.swapActors(this._selectedActor, actor);
        this.clearSelection();
        this.refreshFaces();
        this.refreshParty();
        var self = this;
        setTimeout(function() { self._swapLock = false; }, 0);
    }
};

Scene_PartyCustom.prototype.clearSelection = function() {
    if (this._selectedSprite) this._selectedSprite.stopBlink();
    this._selectedActor = null;
    this._selectedSprite = null;
};

Scene_PartyCustom.prototype.swapActors = function(a, b) {
    var idA = a.actorId(), idB = b.actorId();
    var battle = $gameParty._battleMembers;
    var reserve = $gameParty._actors;

    var idxA = battle.indexOf(idA);
    var idxB = battle.indexOf(idB);

    if (idxA >= 0 && idxB >= 0) {
        var tmp = battle[idxA];
        battle[idxA] = battle[idxB];
        battle[idxB] = tmp;
    } else if (idxA >= 0 && idxB < 0) {
        battle[idxA] = idB;
        var posB = reserve.indexOf(idB);
        if (posB >= 0) reserve.splice(posB, 1);
        if (!reserve.contains(idA)) reserve.push(idA);
    } else if (idxB >= 0 && idxA < 0) {
        battle[idxB] = idA;
        var posA = reserve.indexOf(idA);
        if (posA >= 0) reserve.splice(posA, 1);
        if (!reserve.contains(idB)) reserve.push(idB);
    }

    if (typeof $gameParty.rearrangeActors === 'function') {
        $gameParty.rearrangeActors();
    }
    $gamePlayer.refresh();
    $gameMap.requestRefresh();
};

// ================= MENU HOOK =================
(function() {
    Scene_Menu.prototype.commandFormation = function() {
        SceneManager.push(Scene_PartyCustom);
    };
    var _create = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _create.call(this);
        this._commandWindow.setHandler('formation', this.commandFormation.bind(this));
    };
})();

})();
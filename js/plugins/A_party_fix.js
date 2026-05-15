/*:
 * @target MV
 * @plugindesc Custom Party Scene v13 (reserve pagination, 4 faces per page)
 * @author ChatGPT (improved)
 *
 * @help
 * Меняет состав боевого отряда:
 * - Верхняя панель: лица резервных героев (в группе, но не в бою), по 4 на странице
 *   с навигационными стрелками.
 * - Нижняя панель: большие портреты текущего боевого отряда (макс. 4)
 * - Клик по герою → мигание, клик по другому → обмен местами.
 * - Без визуальных эффектов при наведении.
 * - Лица всегда поверх портретов, клик по лицу не перехватывается.
 */

(function() {

// ================= SCENE =================

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
    this._reservePage = 0;               // текущая страница резерва

    this.createTitle();
    this.createParty();     // battle members (нижняя панель)
    this.createFaceBar();   // резерв с пагинацией (верхняя панель)
    this.updateClickableList();
};

// ================= EXIT =================

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

// ================= TITLE =================

Scene_PartyCustom.prototype.createTitle = function() {
    this._titleWindow = new Window_Base(0, 0, 240, 72);
    this._titleWindow.drawText("PARTY", 0, 0, 200, 'left');
    this.addWindow(this._titleWindow);
};

// ================= RESERVE FACES (paginated) =================

Scene_PartyCustom.prototype.createFaceBar = function() {
    this._faceContainer = new Sprite();
    this._faceContainer.y = 100;
    this.addChild(this._faceContainer);

    // Загружаем системную иконку для стрелок
    this._iconBitmap = ImageManager.loadSystem('IconSet');
    this.refreshFaces();
};

// Все резервные ID (отсортированы)
Scene_PartyCustom.prototype.allReserveIds = function() {
    var battleIds = $gameParty._battleMembers.filter(function(id) {
        return id > 0 && $gameActors.actor(id);
    });
    return $gameParty._actors.filter(function(actorId) {
        return !battleIds.contains(actorId) && $gameActors.actor(actorId);
    });
};

// Количество страниц (по 4 лица)
Scene_PartyCustom.prototype.maxReservePages = function() {
    return Math.ceil(this.allReserveIds().length / 4);
};

// Актёры для текущей страницы
Scene_PartyCustom.prototype.reserveActorsForPage = function(page) {
    var ids = this.allReserveIds();
    var start = page * 4;
    return ids.slice(start, start + 4).map(function(id) {
        return $gameActors.actor(id);
    });
};

Scene_PartyCustom.prototype.refreshFaces = function() {
    this._faceContainer.removeChildren();

    // Если страница вышла за границы, корректируем
    if (this._reservePage >= this.maxReservePages()) {
        this._reservePage = Math.max(0, this.maxReservePages() - 1);
    }

    var actors = this.reserveActorsForPage(this._reservePage);

    actors.forEach(function(actor, i) {
        var sprite = new Sprite(ImageManager.loadFace(actor.faceName()));
        sprite.setFrame(
            actor.faceIndex() % 4 * 144,
            Math.floor(actor.faceIndex() / 4) * 144,
            144, 144
        );
        sprite.x = 100 + i * 150;
        sprite._actor = actor;
        this.setupInteraction(sprite);
        this._faceContainer.addChild(sprite);
    }, this);

    // Добавляем стрелки, если страниц больше одной
    if (this.maxReservePages() > 1) {
        this.createArrow(-1, 100 - 50, 144 / 2 - 16);   // левая стрелка
        this.createArrow(1, 100 + 3 * 150 + 50, 144 / 2 - 16); // правая
    }

    // Если выбранный актёр больше не на экране, сбрасываем выделение
    if (this._selectedActor && !actors.contains(this._selectedActor)) {
        this.clearSelection();
    }

    this.updateClickableList();
};

// Создаёт спрайт стрелки (direction: -1 лево, 1 право)
Scene_PartyCustom.prototype.createArrow = function(direction, x, y) {
    var sprite = new Sprite(this._iconBitmap);
    var iconIndex = direction === -1 ? 76 : 77; // стандартные иконки стрелок
    var sx = (iconIndex % 16) * 32;
    var sy = Math.floor(iconIndex / 16) * 32;
    sprite.setFrame(sx, sy, 32, 32);
    sprite.x = x;
    sprite.y = y;
    sprite._isArrow = true;
    sprite._arrowDirection = direction;
    this.setupInteraction(sprite); // базовая анимация (не нужна), но нужен isHovered
    this._faceContainer.addChild(sprite);
};

// ================= BATTLE PARTY (MOG busts or faces) =================

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
            sprite.scale.x = 1;
            sprite.scale.y = 1;
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
        sprite._baseScaleX = 1;
        sprite._baseScaleY = 1;

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
        var baseX = 16 + (space / 2) + (space * i) + charX;
        spr.x = baseX;
        spr.y = 0;
    });
};

// ================= CLICKABLE LIST =================

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

// ================= INTERACTION =================

Scene_PartyCustom.prototype.setupInteraction = function(sprite) {
    sprite._blink = false;

    sprite.update = function() {
        Sprite.prototype.update.call(this);

        if (this._blink) {
            this.opacity = 150 + Math.sin(Graphics.frameCount * 0.3) * 100;
        } else {
            this.opacity = 255;
        }
        this.scale.x = this._baseScaleX || 1;
        this.scale.y = this._baseScaleY || 1;
    };

    sprite.isHovered = function() {
        var w = this.width * (this.scale.x || 1);
        var h = this.height * (this.scale.y || 1);
        if (w <= 0 || h <= 0) return false;

        var anchorX = this.anchor.x;
        var anchorY = this.anchor.y;
        var left = this.x - w * anchorX;
        var top = this.y - h * anchorY;
        var parentY = this.parent ? this.parent.y : 0;

        return TouchInput.x >= left &&
               TouchInput.x <= left + w &&
               TouchInput.y >= top + parentY &&
               TouchInput.y <= top + parentY + h;
    };

    sprite.startBlink = function() {
        this._blink = true;
    };

    sprite.stopBlink = function() {
        this._blink = false;
        this.opacity = 255;
    };
};

// ================= CENTRALIZED CLICK =================

Scene_PartyCustom.prototype.handleClick = function() {
    for (var i = this._clickableSprites.length - 1; i >= 0; i--) {
        var spr = this._clickableSprites[i];
        if (spr.isHovered && spr.isHovered()) {
            // Если попали по стрелке – листаем страницу
            if (spr._isArrow) {
                this.changeReservePage(spr._arrowDirection);
                return;
            }
            // Иначе обычный клик по актёру
            if (spr._actor) {
                this.onActorClick(spr._actor, spr);
            }
            break;
        }
    }
};

// Переключение страницы резерва
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

// ================= CLICK LOGIC =================

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
    if (this._selectedSprite) {
        this._selectedSprite.stopBlink();
    }
    this._selectedActor = null;
    this._selectedSprite = null;
};

// ================= SWAP (YEP-compatible) =================

Scene_PartyCustom.prototype.swapActors = function(a, b) {
    var idA = a.actorId();
    var idB = b.actorId();
    var battle = $gameParty._battleMembers;
    var reserve = $gameParty._actors;

    var indexA = battle.indexOf(idA);
    var indexB = battle.indexOf(idB);

    if (indexA >= 0 && indexB >= 0) {
        var tmp = battle[indexA];
        battle[indexA] = battle[indexB];
        battle[indexB] = tmp;
    } else if (indexA >= 0 && indexB < 0) {
        battle[indexA] = idB;
        var posB = reserve.indexOf(idB);
        if (posB >= 0) reserve.splice(posB, 1);
        if (!reserve.contains(idA)) reserve.push(idA);
    } else if (indexB >= 0 && indexA < 0) {
        battle[indexB] = idA;
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
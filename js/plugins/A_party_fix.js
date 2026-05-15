/*:
 * @target MV
 * @plugindesc Custom Party Scene (FINAL FIXED)
 * @author ChatGPT
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

    this.createTitle();
    this.createFaceBar();
    this.createParty();
};

// ================= EXIT =================

Scene_PartyCustom.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);

    if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
        SoundManager.playCancel();
        SceneManager.pop();
    }
};

// ================= TITLE =================

Scene_PartyCustom.prototype.createTitle = function() {
    this._titleWindow = new Window_Base(0, 0, 240, 72);
    this._titleWindow.drawText("PARTY", 0, 0, 200, 'left');
    this.addWindow(this._titleWindow);
};

// ================= FACE BAR =================

Scene_PartyCustom.prototype.createFaceBar = function() {
    this._faceContainer = new Sprite();
    this._faceContainer.y = 100;
    this.addChild(this._faceContainer);

    this.refreshFaces();
};

Scene_PartyCustom.prototype.allActors = function() {
    return $gameActors._data.filter(a => a);
};

Scene_PartyCustom.prototype.refreshFaces = function() {
    this._faceContainer.removeChildren();

    let actors = this.allActors().slice(0, 6);

    actors.forEach((actor, i) => {
        let sprite = new Sprite(ImageManager.loadFace(actor.faceName()));

        sprite.setFrame(
            actor.faceIndex() % 4 * 144,
            Math.floor(actor.faceIndex() / 4) * 144,
            144, 144
        );

        sprite.x = 100 + i * 150;
        sprite._actor = actor;

        this.setupInteraction(sprite);
        this._faceContainer.addChild(sprite);
    });
};

// ================= PARTY (CHAR SPRITES) =================

Scene_PartyCustom.prototype.createParty = function() {
    this._partyContainer = new Sprite();
    this._partyContainer.y = 320;
    this.addChild(this._partyContainer);

    this.refreshParty();
};

Scene_PartyCustom.prototype.refreshParty = function() {
    this._partyContainer.removeChildren();

    $gameParty.members().forEach((actor, i) => {
        let bitmap = ImageManager.loadCharacter(actor.characterName());
        let sprite = new Sprite(bitmap);

        let pw = bitmap.width / 12;
        let ph = bitmap.height / 8;

        let sx = (actor.characterIndex() % 4) * 3 * pw;
        let sy = Math.floor(actor.characterIndex() / 4) * 4 * ph;

        sprite.setFrame(sx, sy, pw, ph);

        sprite.x = 120 + i * 120;
        sprite.scale.x = 2;
        sprite.scale.y = 2;

        sprite._actor = actor;

        this.setupInteraction(sprite);
        this._partyContainer.addChild(sprite);
    });
};

// ================= INTERACTION =================

Scene_PartyCustom.prototype.setupInteraction = function(sprite) {
    sprite._blink = false;

    sprite.update = function() {
        Sprite.prototype.update.call(this);

        let hovered = this.isHovered();

        // Hover эффект
        if (hovered && !this._blink) {
            this.opacity = 200;
            this.scale.x = this.scale.y = 1.1;
        } else if (!this._blink) {
            this.opacity = 255;
            this.scale.x = this.scale.y = this.scale.x > 1.5 ? this.scale.x : 1;
        }

        // Мигание выбранного
        if (this._blink) {
            this.opacity = 150 + Math.sin(Graphics.frameCount * 0.3) * 100;
        }

        if (TouchInput.isTriggered() && this.isHovered()) {
            this._clickHandler();
        }
    };

    sprite.isHovered = function() {
        return TouchInput.x >= this.x &&
               TouchInput.x <= this.x + this.width &&
               TouchInput.y >= this.y + this.parent.y &&
               TouchInput.y <= this.y + this.parent.y + this.height;
    };

    sprite.startBlink = function() {
        this._blink = true;
    };

    sprite.stopBlink = function() {
        this._blink = false;
        this.opacity = 255;
    };

    sprite._clickHandler = () => this.onActorClick(sprite._actor, sprite);
};

// ================= CLICK =================

Scene_PartyCustom.prototype.onActorClick = function(actor, sprite) {
    if (!this._selectedActor) {
        this.clearSelection();
        this._selectedActor = actor;
        this._selectedSprite = sprite;
        sprite.startBlink();
    } else {
        this.swapActors(this._selectedActor, actor);
        this.clearSelection();
        this.refreshFaces();
        this.refreshParty();
    }
};

Scene_PartyCustom.prototype.clearSelection = function() {
    if (this._selectedSprite) this._selectedSprite.stopBlink();
    this._selectedActor = null;
    this._selectedSprite = null;
};

// ================= SWAP =================

Scene_PartyCustom.prototype.swapActors = function(a, b) {
    let party = $gameParty._actors;

    let idA = a.actorId();
    let idB = b.actorId();

    let indexA = party.indexOf(idA);
    let indexB = party.indexOf(idB);

    if (indexA >= 0 && indexB >= 0) {
        let temp = party[indexA];
        party[indexA] = party[indexB];
        party[indexB] = temp;
    } else if (indexA >= 0) {
        party[indexA] = idB;
    } else if (indexB >= 0) {
        party[indexB] = idA;
    }

    $gamePlayer.refresh();
};

// ================= MOG FIX =================

(function() {
Scene_Menu.prototype.commandFormation = function() {
    SceneManager.push(Scene_PartyCustom);
};

const _create = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    _create.call(this);
    this._commandWindow.setHandler('formation', this.commandFormation.bind(this));
};
})();

})();
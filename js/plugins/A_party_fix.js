/*:
 * @target MV
 * @plugindesc Custom Party Scene v37 (arrow SE Ok like MOG, conditional visibility)
 * @author ChatGPT (improved)
 *
 * @help
 * Меняет состав боевого отряда:
 * - Верхняя панель: лица резервных героев (в оконной рамке).
 *   Анимация выезда — только при первом открытии.
 * - Стрелки навигации: стандартные из system/Window.
 *   Видимы только если есть следующая/предыдущая страница.
 * - Нижняя панель: портреты текущего боевого отряда.
 *   Анимация выезда — только при первом открытии.
 * - Клик по герою → мигание, клик по другому → обмен местами.
 * - Окна статуса (MCharStatus) с анимацией только при старте.
 * - Звук при клике на персонажа и стрелки настраивается в параметрах.
 *   Если имя файла SE не указано, используются системные звуки:
 *   "OK" для персонажей и стрелок (как в MOG_SceneMenu).
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
 *
 * @param statusBaseX
 * @desc Смещение X базы статус-панели (относительно центра слота персонажа)
 * @default 0
 *
 * @param statusBaseY
 * @desc Смещение Y базы статус-панели (от нижнего края экрана вверх). Положительное — панель выше.
 * @default -200
 *
 * @param statusHPmeterX
 * @desc Смещение X полоски HP относительно базы статуса
 * @default 0
 *
 * @param statusHPmeterY
 * @desc Смещение Y полоски HP
 * @default 0
 *
 * @param statusMPmeterX
 * @desc Смещение X полоски MP
 * @default 0
 *
 * @param statusMPmeterY
 * @desc Смещение Y полоски MP
 * @default 24
 *
 * @param statusHPnumX
 * @desc Смещение X числа HP
 * @default 110
 *
 * @param statusHPnumY
 * @desc Смещение Y числа HP
 * @default 0
 *
 * @param statusHPmaxX
 * @desc Смещение X максимального HP
 * @default 160
 *
 * @param statusHPmaxY
 * @desc Смещение Y максимального HP
 * @default 0
 *
 * @param statusMPnumX
 * @desc Смещение X числа MP
 * @default 110
 *
 * @param statusMPnumY
 * @desc Смещение Y числа MP
 * @default 24
 *
 * @param statusMPmaxX
 * @desc Смещение X максимального MP
 * @default 160
 *
 * @param statusMPmaxY
 * @desc Смещение Y максимального MP
 * @default 24
 *
 * @param statusLevelX
 * @desc Смещение X уровня
 * @default 230
 *
 * @param statusLevelY
 * @desc Смещение Y уровня
 * @default 0
 *
 * @param statusNameX
 * @desc Смещение X имени
 * @default 230
 *
 * @param statusNameY
 * @desc Смещение Y имени
 * @default 24
 *
 * @param statusNameSize
 * @desc Размер шрифта имени (по умолчанию 20)
 * @default 20
 *
 * @param statusEquipX
 * @desc Смещение X иконок экипировки
 * @default 280
 *
 * @param statusEquipY
 * @desc Смещение Y иконок экипировки
 * @default 0
 *
 * @param statusEquipSpace
 * @desc Расстояние между иконками экипировки
 * @default 36
 *
 * @param statusShowStates
 * @desc Показывать состояния (true/false)
 * @default false
 *
 * @param seClickName
 * @desc Имя файла SE (без расширения), проигрываемого при клике по персонажу.
 * Оставьте пустым, чтобы использовать системный звук "OK".
 * @default
 *
 * @param seClickVolume
 * @desc Громкость SE клика по персонажу (0-100)
 * @default 80
 *
 * @param seClickPitch
 * @desc Высота тона SE клика по персонажу (50-150)
 * @default 100
 *
 * @param seClickPan
 * @desc Панорама SE клика по персонажу (-100 лево, 0 центр, 100 право)
 * @default 0
 *
 * @param seArrowName
 * @desc Имя файла SE (без расширения), проигрываемого при клике на стрелку.
 * Оставьте пустым, чтобы использовать системный звук "OK".
 * @default
 *
 * @param seArrowVolume
 * @desc Громкость SE стрелки (0-100)
 * @default 80
 *
 * @param seArrowPitch
 * @desc Высота тона SE стрелки (50-150)
 * @default 100
 *
 * @param seArrowPan
 * @desc Панорама SE стрелки (-100 лево, 0 центр, 100 право)
 * @default 0
 */

(function() {

var parameters = PluginManager.parameters('CustomPartyScene');
var facesPerPage = Number(parameters['facesPerPage'] || 6);
var maxFaceSize = Number(parameters['maxFaceSize'] || 144);
var faceSpacing = Number(parameters['faceSpacing'] || 10);

var statusBaseX   = Number(parameters['statusBaseX'] || 0);
var statusBaseY   = Number(parameters['statusBaseY'] || -150);
var hpMeterX      = Number(parameters['statusHPmeterX'] || -110);
var hpMeterY      = Number(parameters['statusHPmeterY'] || 0);
var mpMeterX      = Number(parameters['statusMPmeterX'] || 0);
var mpMeterY      = Number(parameters['statusMPmeterY'] || 24);
var hpNumX        = Number(parameters['statusHPnumX'] || 27);
var hpNumY        = Number(parameters['statusHPnumY'] || -15);
var hpMaxX        = Number(parameters['statusHPmaxX'] || 160);
var hpMaxY        = Number(parameters['statusHPmaxY'] || 0);
var mpNumX        = Number(parameters['statusMPnumX'] || 110);
var mpNumY        = Number(parameters['statusMPnumY'] || 24);
var mpMaxX        = Number(parameters['statusMPmaxX'] || 160);
var mpMaxY        = Number(parameters['statusMPmaxY'] || 24);
var lvX           = Number(parameters['statusLevelX'] || -90);
var lvY           = Number(parameters['statusLevelY'] || -65);
var nameX         = Number(parameters['statusNameX'] || 0);
var nameY         = Number(parameters['statusNameY'] || -67);
var nameSize      = Number(parameters['statusNameSize'] || 25);
var equipX        = Number(parameters['statusEquipX'] || -111);
var equipY        = Number(parameters['statusEquipY'] || -15);
var equipSpace    = Number(parameters['statusEquipSpace'] || 36);
var showStates    = String(parameters['statusShowStates'] || 'false') === 'true';

// Параметры SE клика по персонажу
var seClickName   = String(parameters['seClickName'] || '').trim();
var seClickVolume = Number(parameters['seClickVolume'] || 80);
var seClickPitch  = Number(parameters['seClickPitch'] || 100);
var seClickPan    = Number(parameters['seClickPan'] || 0);

// Параметры SE клика по стрелкам
var seArrowName   = String(parameters['seArrowName'] || '').trim();
var seArrowVolume = Number(parameters['seArrowVolume'] || 80);
var seArrowPitch  = Number(parameters['seArrowPitch'] || 100);
var seArrowPan    = Number(parameters['seArrowPan'] || 0);

var ARROW_WIDTH  = 22;
var ARROW_HEIGHT = 20;

function loadMenuBitmap(filename, hue) {
    if (typeof ImageManager.loadMenusMain === 'function') {
        return ImageManager.loadMenusMain(filename);
    } else {
        return ImageManager.loadBitmap('img/menus/main/', filename, hue || 0, true);
    }
}

function loadStatusBitmaps() {
    if (this._statusBitmapsLoaded) return;
    this._statusBitmapsLoaded = true;

    this._layoutStatusBmp = loadMenuBitmap("LayoutStatus");
    this._hpMeterBmp = loadMenuBitmap("HPMeter");
    this._mpMeterBmp = loadMenuBitmap("MPMeter");
    this._hpNumberBmp = loadMenuBitmap("HPNumber");
    this._mpNumberBmp = loadMenuBitmap("MPNumber");
    this._lvNumberBmp = loadMenuBitmap("LVNumber");
    this._iconSet = ImageManager.loadSystem('IconSet');
}

// ----------- Класс окна статуса одного персонажа -----------
function MCharStatusParty(actor, scene) {
    this.initialize(actor, scene);
}
MCharStatusParty.prototype = Object.create(Sprite.prototype);
MCharStatusParty.prototype.constructor = MCharStatusParty;

MCharStatusParty.prototype.initialize = function(actor, scene) {
    Sprite.prototype.initialize.call(this);
    this._actor = actor;
    this._scene = scene;
    this._targetX = null;
    this._slideWait = 0;
    this.opacity = 255;
    this.createSprites();
    this.refresh();
};

MCharStatusParty.prototype.createSprites = function() {
    this._layout = new Sprite(this._scene._layoutStatusBmp);
    this.addChild(this._layout);
    this._hpMeter = new Sprite(this._scene._hpMeterBmp);
    this.addChild(this._hpMeter);
    this._mpMeter = new Sprite(this._scene._mpMeterBmp);
    this.addChild(this._mpMeter);

    this._hpNumbers = [];
    for (var i = 0; i < 5; i++) {
        var spr = new Sprite(this._scene._hpNumberBmp);
        spr.visible = false;
        this.addChild(spr);
        this._hpNumbers.push(spr);
    }
    this._hpMaxNumbers = [];
    for (var j = 0; j < 5; j++) {
        var spr2 = new Sprite(this._scene._hpNumberBmp);
        spr2.visible = false;
        this.addChild(spr2);
        this._hpMaxNumbers.push(spr2);
    }
    this._mpNumbers = [];
    for (var k = 0; k < 5; k++) {
        var spr3 = new Sprite(this._scene._mpNumberBmp);
        spr3.visible = false;
        this.addChild(spr3);
        this._mpNumbers.push(spr3);
    }
    this._mpMaxNumbers = [];
    for (var m = 0; m < 5; m++) {
        var spr4 = new Sprite(this._scene._mpNumberBmp);
        spr4.visible = false;
        this.addChild(spr4);
        this._mpMaxNumbers.push(spr4);
    }
    this._lvNumbers = [];
    for (var n = 0; n < 3; n++) {
        var spr5 = new Sprite(this._scene._lvNumberBmp);
        spr5.visible = false;
        this.addChild(spr5);
        this._lvNumbers.push(spr5);
    }

    this._nameBitmap = new Bitmap(120, 32);
    this._nameSprite = new Sprite(this._nameBitmap);
    this.addChild(this._nameSprite);

    this._equipIcons = [];
    for (var e = 0; e < 5; e++) {
        var icon = new Sprite(this._scene._iconSet);
        icon.visible = false;
        this.addChild(icon);
        this._equipIcons.push(icon);
    }

    this._stateIcon = null;
    if (showStates) {
        this._stateIcon = new Sprite(this._scene._iconSet);
        this._stateIcon.visible = false;
        this.addChild(this._stateIcon);
    }
};

MCharStatusParty.prototype.refresh = function() {
    if (!this._actor || !this._scene._hpMeterBmp.isReady()) return;

    var hpW = Math.floor(this._scene._hpMeterBmp.width * this._actor.hp / this._actor.mhp);
    var mpW = Math.floor(this._scene._mpMeterBmp.width * this._actor.mp / this._actor.mmp);
    this._hpMeter.setFrame(0, 0, hpW, this._scene._hpMeterBmp.height);
    this._mpMeter.setFrame(0, 0, mpW, this._scene._mpMeterBmp.height);

    this.refreshNumber(this._mpNumbers, this._actor.mp, this._scene._mpNumberBmp);
    this.refreshNumber(this._mpMaxNumbers, this._actor.mmp, this._scene._mpNumberBmp);
    this.refreshNumber(this._lvNumbers, this._actor.level, this._scene._lvNumberBmp);

    this._nameBitmap.clear();
    this._nameBitmap.fontSize = nameSize;
    this._nameBitmap.drawText(this._actor.name(), 0, 0, 120, 32, 'left');

    var equips = this._actor.equips();
    for (var i = 0; i < this._equipIcons.length; i++) {
        var item = i < equips.length ? equips[i] : null;
        var icon = this._equipIcons[i];
        if (item) {
            icon.visible = true;
            var sx = (item.iconIndex % 16) * 32;
            var sy = Math.floor(item.iconIndex / 16) * 32;
            icon.setFrame(sx, sy, 32, 32);
            icon.x = equipX + i * equipSpace;
            icon.y = equipY;
        } else {
            icon.visible = false;
        }
    }

    if (this._stateIcon) {
        var icons = this._actor.allIcons();
        if (icons.length > 0) {
            this._stateIcon.visible = true;
            var iidx = icons[0];
            var sx = (iidx % 16) * 32;
            var sy = Math.floor(iidx / 16) * 32;
            this._stateIcon.setFrame(sx, sy, 32, 32);
            this._stateIcon.x = nameX + 130;
            this._stateIcon.y = nameY;
        } else {
            this._stateIcon.visible = false;
        }
    }
};

MCharStatusParty.prototype.refreshNumber = function(sprites, value, bitmap) {
    var maxDigits = sprites.length;
    var str = Math.min(value, Math.pow(10, maxDigits) - 1).toString();
    var digitW = bitmap.width / 10;
    for (var i = 0; i < maxDigits; i++) {
        if (i < str.length) {
            var n = parseInt(str[i]);
            sprites[i].setFrame(n * digitW, 0, digitW, bitmap.height);
            sprites[i].visible = true;
        } else {
            sprites[i].visible = false;
        }
    }
};

MCharStatusParty.prototype.layout = function(posX, posY) {
    var baseX = posX + statusBaseX;
    var baseY = posY + statusBaseY;

    this._layout.x = -127;
    this._layout.y = -80;

    this._hpMeter.x = hpMeterX;
    this._hpMeter.y = hpMeterY;
    this._mpMeter.x = mpMeterX;
    this._mpMeter.y = mpMeterY;

    var digitW = this._scene._hpNumberBmp.width / 10;
    var lenHP = this._actor.hp.toString().length;
    var startX = hpNumX - lenHP * digitW;
    for (var i = 0; i < this._hpNumbers.length; i++) {
        this._hpNumbers[i].x = startX + i * digitW;
        this._hpNumbers[i].y = hpNumY;
    }

    var digitWmp = this._scene._mpNumberBmp.width / 10;
    var lenMP = this._actor.mp.toString().length;
    var startXMp = mpNumX - lenMP * digitWmp;
    for (var k = 0; k < this._mpNumbers.length; k++) {
        this._mpNumbers[k].x = startXMp + k * digitWmp;
        this._mpNumbers[k].y = mpNumY;
    }

    var lenMaxMP = this._actor.mmp.toString().length;
    var startXMaxMp = mpMaxX - lenMaxMP * digitWmp;
    for (var m = 0; m < this._mpMaxNumbers.length; m++) {
        this._mpMaxNumbers[m].x = startXMaxMp + m * digitWmp;
        this._mpMaxNumbers[m].y = mpMaxY;
    }

    var lvDigitW = this._scene._lvNumberBmp.width / 10;
    var lenLV = this._actor.level.toString().length;
    var startLv = lvX - lenLV * lvDigitW;
    for (var n = 0; n < this._lvNumbers.length; n++) {
        this._lvNumbers[n].x = startLv + n * lvDigitW;
        this._lvNumbers[n].y = lvY;
    }

    this._nameSprite.x = nameX;
    this._nameSprite.y = nameY;

    for (var e = 0; e < this._equipIcons.length; e++) {
        if (this._equipIcons[e].visible) {
            this._equipIcons[e].x = equipX + e * equipSpace;
            this._equipIcons[e].y = equipY;
        }
    }

    if (this._stateIcon && this._stateIcon.visible) {
        this._stateIcon.x = nameX + 130;
        this._stateIcon.y = nameY;
    }
};

MCharStatusParty.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._slideWait > 0) {
        this._slideWait--;
    } else if (this._targetX != null) {
        if (this.x < this._targetX) {
            this.x += 2;
            if (this.x > this._targetX) this.x = this._targetX;
        }
        this.opacity += 10;
        if (this.opacity > 255) this.opacity = 255;
        if (this.x >= this._targetX && this.opacity >= 255) {
            this._targetX = null;
        }
    }
    if (this._actor && Graphics.frameCount % 5 === 0) {
        this.refresh();
    }
};

// ----------- Основная сцена -----------
function Scene_PartyCustom() {
    this.initialize.apply(this, arguments);
}

Scene_PartyCustom.prototype = Object.create(Scene_MenuBase.prototype);
Scene_PartyCustom.prototype.constructor = Scene_PartyCustom;

Scene_PartyCustom.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    loadStatusBitmaps.call(this);
    this._selectedActor = null;
    this._selectedSprite = null;
    this._clickableSprites = [];
    this._reservePage = 0;
    this._animationsDone = false;
    this.createTitle();
    this.createParty();
    this.createFaceBar();
    this._animationsDone = true;
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
    if (this._statusSprites) {
        for (var i = 0; i < this._statusSprites.length; i++) {
            this._statusSprites[i].update();
        }
    }
};

Scene_PartyCustom.prototype.createTitle = function() {
    this._titleWindow = new Window_Base(0, 0, 240, 72);
    this._titleWindow.drawText("PARTY", 0, 0, 200, 'center');
    this.addWindow(this._titleWindow);
};

Scene_PartyCustom.prototype.createFaceBar = function() {
    this._faceFrameWindow = new Window_Base(0, 70, Graphics.boxWidth, maxFaceSize + 40);
    this._faceFrameWindow.opacity = 255;
    this._faceFrameWindow.contentsOpacity = 0;
    this._faceFrameWindow.deactivate();
    this.addChild(this._faceFrameWindow);

    this._faceContainer = new Sprite();
    this._faceContainer.y = 90;
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
        if (this._faceFrameWindow) this._faceFrameWindow.visible = false;
        this.updateClickableList();
        return;
    }

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
        var targetX = actualSpacing + i * (faceSize + actualSpacing);
        sprite._actor = actor;

        if (!this._animationsDone) {
            sprite._targetX = targetX;
            sprite.x = targetX - 50;
            sprite.opacity = 0;
            sprite._slideWait = 5 + 10 * i;
        } else {
            sprite.x = targetX;
            sprite.opacity = 255;
        }
        this.setupInteraction(sprite);
        this._faceContainer.addChild(sprite);
    }, this);

    // Стрелки с условной видимостью
    var maxPages = this.maxReservePages();
    if (maxPages > 1) {
        // Левая стрелка видна, только если есть предыдущая страница
        this.createArrow(-1, 10, maxFaceSize / 2 - ARROW_HEIGHT / 2, this._reservePage > 0);
        // Правая стрелка видна, только если есть следующая страница
        this.createArrow(1, Graphics.boxWidth - ARROW_WIDTH - 10, maxFaceSize / 2 - ARROW_HEIGHT / 2, this._reservePage < maxPages - 1);
    }

    if (this._selectedActor && !actors.contains(this._selectedActor)) {
        this.clearSelection();
    }

    if (this._faceFrameWindow) {
        this._faceFrameWindow.visible = true;
        this._faceFrameWindow.width = Graphics.boxWidth;
        this._faceFrameWindow.height = faceSize + 40;
        this._faceFrameWindow.createContents();
        this._faceFrameWindow.contentsOpacity = 0;
    }

    this.updateClickableList();
};

Scene_PartyCustom.prototype.createArrow = function(direction, x, y, visible) {
    var bitmap = ImageManager.loadSystem('Window');
    var sprite = new Sprite(bitmap);
    var sx = direction === -1 ? 121 : 155;
    var sy = 38;
    sprite.setFrame(sx, sy, ARROW_WIDTH, ARROW_HEIGHT);
    sprite.x = x;
    sprite.y = y;
    sprite._isArrow = true;
    sprite._arrowDirection = direction;
    sprite.opacity = 255;
    sprite.visible = visible;
    this.setupInteraction(sprite);
    this._faceContainer.addChild(sprite);
};

Scene_PartyCustom.prototype.createParty = function() {
    this._partyContainer = new Sprite();
    var charY = (typeof Moghunter !== 'undefined' && Moghunter.scMenu_CharY != null) ? Moghunter.scMenu_CharY : 0;
    this._partyContainer.y = Graphics.boxHeight + charY + 50;
    this.addChild(this._partyContainer);
    this.refreshParty();
};

Scene_PartyCustom.prototype.refreshParty = function() {
    this._partyContainer.removeChildren();
    if (this._statusSprites) {
        for (var i = 0; i < this._statusSprites.length; i++) {
            this.removeChild(this._statusSprites[i]);
        }
    }
    this._statusSprites = [];

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

        if (!this._animationsDone) {
            sprite._slideWait = 5 + 10 * i;
            sprite._targetX = 0;
        } else {
            sprite.opacity = 255;
        }
        this.setupInteraction(sprite);
        this._partyContainer.addChild(sprite);
    }, this);

    this.layoutParty();

    var children = this._partyContainer.children;
    for (var idx = 0; idx < children.length; idx++) {
        var spr = children[idx];
        if (!this._animationsDone) {
            spr._targetX = spr.x;
            spr.x = spr._targetX - 50;
            spr.opacity = 0;
        } else {
            spr.x = spr.x;
            spr.opacity = 255;
        }
    }

    battleMembers.forEach(function(actor, i) {
        var statusSpr = new MCharStatusParty(actor, this);
        this._statusSprites.push(statusSpr);
        this.addChild(statusSpr);
        var maxSlots = $gameParty.maxBattleMembers();
        var space = Math.floor((Graphics.boxWidth - 32) / maxSlots);
        var charX = (typeof Moghunter !== 'undefined' && Moghunter.scMenu_CharX != null) ? Moghunter.scMenu_CharX : 0;
        var posX = 16 + (space / 2) + (space * i) + charX;
        var posY = Graphics.boxHeight;
        statusSpr.layout(posX, posY);

        if (!this._animationsDone) {
            statusSpr._targetX = posX + statusBaseX;
            statusSpr.y = posY + statusBaseY;
            statusSpr.x = statusSpr._targetX - 50;
            statusSpr._slideWait = 5 + 5 * i;
            statusSpr.opacity = 0;
        } else {
            statusSpr.x = posX + statusBaseX;
            statusSpr.y = posY + statusBaseY;
            statusSpr.opacity = 255;
        }
    }, this);

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
        if (this._slideWait != null && this._slideWait > 0) {
            this._slideWait--;
        } else if (this._targetX != null) {
            if (this.x < this._targetX) {
                this.x += 2;
                if (this.x > this._targetX) this.x = this._targetX;
            }
            this.opacity += 10;
            if (this.opacity > 255) this.opacity = 255;
            if (this.x >= this._targetX && this.opacity >= 255) {
                this._targetX = null;
            }
        }
        if (this._blink) {
            this.opacity = 150 + Math.sin(Graphics.frameCount * 0.3) * 100;
        } else if (this._targetX == null) {
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
    // Звук стрелки: свой SE или системный OK
    if (seArrowName !== '') {
        AudioManager.playSe({
            name: seArrowName,
            volume: seArrowVolume,
            pitch: seArrowPitch,
            pan: seArrowPan
        });
    } else {
        SoundManager.playOk();
    }
    this._reservePage = newPage;
    this.refreshFaces();
};

Scene_PartyCustom.prototype.onActorClick = function(actor, sprite) {
    // Звук клика по персонажу
    if (seClickName !== '') {
        AudioManager.playSe({
            name: seClickName,
            volume: seClickVolume,
            pitch: seClickPitch,
            pan: seClickPan
        });
    } else {
        SoundManager.playOk();
    }

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
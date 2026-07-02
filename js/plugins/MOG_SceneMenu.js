//=============================================================================
// MOG_SceneMenu.js (модифицированная версия)
//=============================================================================

/*:
 * @plugindesc (v1.3) Modifica a cena de menu principal.
 * @author Moghunter
 *
 * @param Actor Hud X-Axis
 * @default 0
 *
 * @param Actor Hud Y-Axis
 * @default 0
 *
 * @param Char X-Axis
 * @default 20
 *
 * @param Char Y-Axis
 * @default 0
 *
 * @param HP Meter X-Axis
 * @default 17
 *
 * @param HP Meter Y-Axis
 * @default 93
 *
 * @param MP Meter X-Axis
 * @default 17
 *
 * @param MP Meter Y-Axis
 * @default 144
 *
 * @param HP Number X-Axis
 * @default 100
 *
 * @param HP Number Y-Axis
 * @default 73
 *
 * @param HPMax Number X-Axis
 * @default 140
 *
 * @param HPMax Number Y-Axis
 * @default 100
 *
 * @param MP Number X-Axis
 * @default 100
 *
 * @param MP Number Y-Axis
 * @default 124
 *
 * @param MPMax Number X-Axis
 * @default 140
 *
 * @param MPMax Number Y-Axis
 * @default 151
 *
 * @param LV Number X-Axis
 * @default 95
 *
 * @param LV Number Y-Axis
 * @default 33
 *
 * @param States X-Axis
 * @default 111
 *
 * @param States Y-Axis
 * @default 30
 *
 * @param Name X-Axis
 * @default 20
 *
 * @param Name Y-Axis
 * @default 0
 *
 * @param Name FontSize
 * @default 20
 *
 * @param Commands X-Axis
 * @default 180
 *
 * @param Commands Y-Axis
 * @default 50
 *
 * @param Command Active X-Axis
 * @default 40
 *
 * @param Command Active Y-Axis
 * @default 148
 *
 * @param Com Name Visible
 * @default true
 *
 * @param Com Name X-Axis
 * @default 40
 *
 * @param Com Name Y-Axis
 * @default 96
 *
 * @param Com Name FontSize
 * @default 22
 *
 * @param Max Visible Faces
 * @default 5
 *
 * @param Face Sel X-Axis
 * @default 400
 *
 * @param Face Sel Y-Axis
 * @default 128
 *
 * @param Gold X-Axis
 * @default 260
 *
 * @param Gold Y-Axis
 * @default 580
 *
 * @param Time X-Axis
 * @default 565
 *
 * @param Time Y-Axis
 * @default 60
 *
 * @param Time FontSize
 * @default 24
 *
 * @param Location X-Axis
 * @default 450
 *
 * @param Location Y-Axis
 * @default 575
 *
 * @param Location FontSize
 * @default 26
 *
 * @param Magic Circle Visible
 * @default true
 *
 * @param Magic Circle X-Axis
 * @default 700
 *
 * @param Magic Circle Y-Axis
 * @default 140
 *
 * @param Magic Circle Rotation
 * @default 0.001
 *
 * @param Equip Icons X-Axis
 * @default 20
 *
 * @param Equip Icons Y-Axis
 * @default 120
 *
 * @param Equip Icons Spacing
 * @default 36
 *
 * @param Playtime Visible
 * @default false
 *
 * @param Menu Label
 * @default Menu
 *
 * @param Menu Label X-Axis
 * @default 20
 *
 * @param Menu Label Y-Axis
 * @default 20
 *
 * @param Menu Label FontSize
 * @default 28
 *
 * @help
 * =============================================================================
 * +++ MOG - Scene Menu (v1.3) +++
 * By Moghunter
 * https://mogplugins.com
 * =============================================================================
 * Модификации:
 * - Удалены команды "Инвентарь" и "Навык"
 * - Иконки команд центрированы
 * - Иконки команд затемнены (opacity 160) когда не выбраны, яркие (255) при выборе
 * - Полностью скрыты HP/MP и состояния
 * - Панель выбора лиц центрируется (Face Sel X/Y — центр группы)
 * - Исправлены клики/тапы по лицам
 * - Выбранное лицо подсвечивается (opacity 255), остальные приглушены (160)
 * - Вместо увеличения — системная стрелка над выбранным лицом (сдвинута на 20px вниз для точного позиционирования)
 * - Стрелки прокрутки лиц и команд — системные (pause sign)
 * - Отключено сглаживание для чёткости
 */

var Imported = Imported || {};
Imported.MMOG_SceneMenu = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters('MOG_SceneMenu');
Moghunter.scMenu_layoutStatusX = Number(Moghunter.parameters['Actor Hud X-Axis'] || 0);
Moghunter.scMenu_layoutStatusY = Number(Moghunter.parameters['Actor Hud Y-Axis'] || 0);
Moghunter.scMenu_CharX = Number(Moghunter.parameters['Char X-Axis'] || 20);
Moghunter.scMenu_CharY = Number(Moghunter.parameters['Char Y-Axis'] || 0);
Moghunter.scMenu_HPMeterX = Number(Moghunter.parameters['HP Meter X-Axis'] || 17);
Moghunter.scMenu_HPMeterY = Number(Moghunter.parameters['HP Meter Y-Axis'] || 93);
Moghunter.scMenu_MPMeterX = Number(Moghunter.parameters['MP Meter X-Axis'] || 17);
Moghunter.scMenu_MPMeterY = Number(Moghunter.parameters['MP Meter Y-Axis'] || 144);
Moghunter.scMenu_HPNumberX = Number(Moghunter.parameters['HP Number X-Axis'] || 100);
Moghunter.scMenu_HPNumberY = Number(Moghunter.parameters['HP Number Y-Axis'] || 73);
Moghunter.scMenu_HPNumber2X = Number(Moghunter.parameters['HPMax Number X-Axis'] || 140);
Moghunter.scMenu_HPNumber2Y = Number(Moghunter.parameters['HPMax Number Y-Axis'] || 100);
Moghunter.scMenu_MPNumberX = Number(Moghunter.parameters['MP Number X-Axis'] || 100);
Moghunter.scMenu_MPNumberY = Number(Moghunter.parameters['MP Number Y-Axis'] || 124);
Moghunter.scMenu_MPNumber2X = Number(Moghunter.parameters['MPMax Number X-Axis'] || 140);
Moghunter.scMenu_MPNumber2Y = Number(Moghunter.parameters['MPMax Number Y-Axis'] || 151);
Moghunter.scMenu_LVNumberX = Number(Moghunter.parameters['LV Number X-Axis'] || 95);
Moghunter.scMenu_LVNumberY = Number(Moghunter.parameters['LV Number Y-Axis'] || 33);
Moghunter.scMenu_statesX = Number(Moghunter.parameters['States X-Axis'] || 111);
Moghunter.scMenu_statesY = Number(Moghunter.parameters['States Y-Axis'] || 30);
Moghunter.scMenu_NameX = Number(Moghunter.parameters['Name X-Axis'] || 20);
Moghunter.scMenu_NameY = Number(Moghunter.parameters['Name Y-Axis'] || 0);
Moghunter.scMenu_NameFontSize = Number(Moghunter.parameters['Name FontSize'] || 20);
Moghunter.scMenu_ComX = Number(Moghunter.parameters['Commands X-Axis'] || 180);
Moghunter.scMenu_ComY = Number(Moghunter.parameters['Commands Y-Axis'] || 50);
Moghunter.scMenu_ComWX = Number(Moghunter.parameters['Command Active X-Axis'] || 40);
Moghunter.scMenu_ComWY = Number(Moghunter.parameters['Command Active Y-Axis'] || 148);
Moghunter.scMenu_ComNameVisible = String(Moghunter.parameters['Com Name Visible'] || "true");
Moghunter.scMenu_ComNameX = Number(Moghunter.parameters['Com Name X-Axis'] || 40);
Moghunter.scMenu_ComNameY = Number(Moghunter.parameters['Com Name Y-Axis'] || 96);
Moghunter.scMenu_ComNameFontSize = Number(Moghunter.parameters['Com Name FontSize'] || 22);
Moghunter.scMenu_maxVisibleFaces = Number(Moghunter.parameters['Max Visible Faces'] || 5);
Moghunter.scMenu_FaceSelX = Number(Moghunter.parameters['Face Sel X-Axis'] || 400);
Moghunter.scMenu_FaceSelY = Number(Moghunter.parameters['Face Sel Y-Axis'] || 128);
Moghunter.scMenu_GoldNumberX = Number(Moghunter.parameters['Gold X-Axis'] || 260);
Moghunter.scMenu_GoldNumberY = Number(Moghunter.parameters['Gold Y-Axis'] || 580);
Moghunter.scMenu_playTimeNumberX = Number(Moghunter.parameters['Time X-Axis'] || 565);
Moghunter.scMenu_playTimeNumberY = Number(Moghunter.parameters['Time Y-Axis'] || 60);
Moghunter.scMenu_playTimeNumberFontSize = Number(Moghunter.parameters['Time FontSize'] || 24);
Moghunter.scMenu_locationX = Number(Moghunter.parameters['Location X-Axis'] || 450);
Moghunter.scMenu_locationY = Number(Moghunter.parameters['Location Y-Axis'] || 575);
Moghunter.scMenu_locationFontSize = Number(Moghunter.parameters['Location FontSize'] || 26);
Moghunter.scMenu_MagicCircleV = String(Moghunter.parameters['Magic Circle Visible'] || "true");
Moghunter.scMenu_MagicCircleX = Number(Moghunter.parameters['Magic Circle X-Axis'] || 700);
Moghunter.scMenu_MagicCircleY = Number(Moghunter.parameters['Magic Circle Y-Axis'] || 140);
Moghunter.scMenu_MagicCircleR = Number(Moghunter.parameters['Magic Circle Rotation'] || 0.001);
Moghunter.scMenu_EquipIconX = Number(Moghunter.parameters['Equip Icons X-Axis'] || 20);
Moghunter.scMenu_EquipIconY = Number(Moghunter.parameters['Equip Icons Y-Axis'] || 120);
Moghunter.scMenu_EquipIconSpacing = Number(Moghunter.parameters['Equip Icons Spacing'] || 36);

Moghunter.scMenu_playtimeVisible = String(Moghunter.parameters['Playtime Visible'] || "false");
Moghunter.scMenu_menuLabel = String(Moghunter.parameters['Menu Label'] || "Menu");
Moghunter.scMenu_menuLabelX = Number(Moghunter.parameters['Menu Label X-Axis'] || 20);
Moghunter.scMenu_menuLabelY = Number(Moghunter.parameters['Menu Label Y-Axis'] || 20);
Moghunter.scMenu_menuLabelFontSize = Number(Moghunter.parameters['Menu Label FontSize'] || 28);

//=============================================================================
// ** ImageManager
//=============================================================================

ImageManager.loadMenusMain = function(filename) {
    return this.loadBitmap('img/menus/main/', filename, 0, true);
};

ImageManager.loadMenusFaces1 = function(filename) {
    return this.loadBitmap('img/menus/faces/faces1/', filename, 0, true);
};

ImageManager.loadMenusFaces2 = function(filename) {
    return this.loadBitmap('img/menus/faces/faces2/', filename, 0, true);
};

ImageManager.loadMenusFaces3 = function(filename) {
    return this.loadBitmap('img/menus/faces/faces3/', filename, 0, true);
};

ImageManager.loadMenusFaces4 = function(filename) {
    return this.loadBitmap('img/menus/faces/faces4/', filename, 0, true);
};

ImageManager.loadMenusMainCommands = function(filename) {
    return this.loadBitmap('img/menus/main/commands/', filename, 0, true);
};

//=============================================================================
// ** Scene Menu
//=============================================================================
var _mog_scmenu_create = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function() {
    _mog_scmenu_create.call(this);
    this.loadBitmapsMain();
    this.createField();
    this.createMonogatari();
};

Scene_Menu.prototype.loadBitmapsMain = function() {
    this._commandWindow._list = this._commandWindow._list.filter(function(cmd) {
        return cmd.symbol !== "item" && cmd.symbol !== "skill";
    });
    this._comList = this._commandWindow._list;

    this._facesBitmaps = []
    for (var i = 0; i < $gameParty.members().length; i++) {
        this._facesBitmaps[i] = ImageManager.loadMenusFaces2("Actor_" + $gameParty.members()[i]._actorId);
    };
    this._comBitmaps = []
    for (var i = 0; i < this._comList.length; i++) {
        this._comBitmaps[i] = ImageManager.loadMenusMainCommands(this._comList[i].name);
    };
    this._goldImg = ImageManager.loadMenusMain("GoldNumber");

    for (var j = 0; j < this._facesBitmaps.length; j++) {
        if (this._facesBitmaps[j]) this._facesBitmaps[j].smooth = false;
    }
    for (var k = 0; k < this._comBitmaps.length; k++) {
        if (this._comBitmaps[k]) this._comBitmaps[k].smooth = false;
    }
};

Scene_Menu.prototype.createField = function() {
    this._field = new Sprite();
    this.addChild(this._field);
};

Scene_Menu.prototype.createMonogatari = function() {
    if (String(Moghunter.scMenu_MagicCircleV) === "true") {this.createMagicCircle()};
    this.createCharacters();
    this.createLayout();
    this.createCharStatus();
    this.createCommands();
    this.createCommandName();
    if (String(Moghunter.scMenu_playtimeVisible) === "true") { this.createPlayTime(); }
    this.createLocation();
    this.createMenuLabel();
};

Scene_Menu.prototype.createAfter = function() {
    this.createSelection();
    this.createFaceArrows();
    this.createGold();
};

Scene_Menu.prototype.createGold = function() {
    this._gold_number = [];
    this._GoldData = [this._goldImg.width / 10,this._goldImg.height]
    var x = Moghunter.scMenu_GoldNumberX;
    var y = Moghunter.scMenu_GoldNumberY;
    for (var i = 0; i < 9; i++) {
        this._gold_number[i] = new Sprite(this._goldImg);
        this._gold_number[i].visible = false;
        this._gold_number[i].opacity = 255;
        this._gold_number[i].x = x ;
        this._gold_number[i].y = y ;
        this._field.addChild(this._gold_number[i]);
    };
    this.refresh_number(this._gold_number,$gameParty.gold(),this._GoldData,x)
};

Scene_Menu.prototype.createMagicCircle = function() {
    this._magicCircle = new Sprite(ImageManager.loadMenusMain("MagicCircle"));
    this._magicCircle.anchor.x = 0.5;
    this._magicCircle.anchor.y = 0.5;
    this._magicCircle.x = Moghunter.scMenu_MagicCircleX;
    this._magicCircle.y = Moghunter.scMenu_MagicCircleY;
    this._field.addChild(this._magicCircle);
};

Scene_Menu.prototype.updateMagicCircle = function() {
    this._magicCircle.rotation +=Moghunter.scMenu_MagicCircleR;
};

Scene_Menu.prototype.playTimeSec = function() {
    return $gameSystem.playtime()  % 60;
};

Scene_Menu.prototype.createPlayTime = function() {
    this._playTime = new Sprite(new Bitmap(200,32));
    this._playTime.x = Moghunter.scMenu_playTimeNumberX;
    this._playTime.y = Moghunter.scMenu_playTimeNumberY;
    this._playTime.bitmap.fontSize = Moghunter.scMenu_playTimeNumberFontSize;
    this._field.addChild(this._playTime);
    this._playTimeSec = this.playTimeSec();
    this.refreshTime();
};

Scene_Menu.prototype.refreshTime = function() {
    this._playTime.bitmap.clear();
    this._playTimeSec = this.playTimeSec();
    this._playTime.bitmap.drawText($gameSystem.playtimeText(),0,0,200,32,"right");
};

Scene_Menu.prototype.updateTime = function() {
    if (this._playTimeSec != this.playTimeSec()) {this.refreshTime()};
};

Scene_Menu.prototype.createLocation = function() {
    this._location = new Sprite(new Bitmap(260,32));
    this._location.x = Moghunter.scMenu_locationX;
    this._location.y = Moghunter.scMenu_locationY;
    this._location.bitmap.fontSize = Moghunter.scMenu_locationFontSize;
    var mapName = $gameMap.displayName();
    this._location.bitmap.drawText(mapName,0,0,260,32,"center");
    this._field.addChild(this._location);
};

Scene_Menu.prototype.createMenuLabel = function() {
    this._menuLabel = new Sprite(new Bitmap(200, 50));
    this._menuLabel.x = Moghunter.scMenu_menuLabelX;
    this._menuLabel.y = Moghunter.scMenu_menuLabelY;
    this._menuLabel.bitmap.fontSize = Moghunter.scMenu_menuLabelFontSize;
    this._menuLabel.bitmap.drawText(Moghunter.scMenu_menuLabel, 0, 0, 200, 50, "left");
    this._field.addChild(this._menuLabel);
};

Scene_Menu.prototype.refresh_number = function(sprites,value,img_data,x) {
    numbers = Math.abs(value).toString().split("");
    for (var i = 0; i < sprites.length ; i++) {
        sprites[i].visible = false;
        if (i < numbers.length) {
            var n = Number(numbers[i]);
            sprites[i].setFrame(n * img_data[0], 0, img_data[0], img_data[1]);
            var nx = -(img_data[0] * i) + (img_data[0] *  numbers.length);
            sprites[i].x = x - nx;
            sprites[i].visible = true;
        } else {
            var n = 0;
            sprites[i].setFrame(n * img_data[0], 0, img_data[0], img_data[1]);
            var nx = -(img_data[0] * i) + (img_data[0] *  (sprites.length + numbers.length));
            sprites[i].x = x - nx;
        };
    };
};

Scene_Menu.prototype.maxMembers = function() {
    return Math.min(Math.max($gameParty.members().length,0),$gameParty.maxBattleMembers());
};

Scene_Menu.prototype.createCharacters = function() {
    this._characters = [];
    for (var i = 0; i < this.maxMembers(); i++) {
        this._characters[i] = new MBustMenu(i,$gameParty.members()[i],this.maxMembers());
        this._field.addChild(this._characters[i]);
    };
};

Scene_Menu.prototype.createCharStatus = function() {
    this._charStatus = [];
    for (var i = 0; i < this.maxMembers(); i++) {
        this._charStatus[i] = new MCharStatus(i,$gameParty.members()[i],this.maxMembers());
        this._field.addChild(this._charStatus[i]);
    };
};

var _mog_smenu_update = Scene_Menu.prototype.createGoldWindow;
Scene_Menu.prototype.createGoldWindow = function() {
    _mog_smenu_update.call(this);
    if (this._goldWindow) {this._goldWindow.visible = false};
};

Scene_Menu.prototype.createLayout = function() {
    this._layout = new Sprite(ImageManager.loadMenusMain("Layout"));
    this._field.addChild(this._layout);
};

// *** КОМАНДЫ: затемнённые по умолчанию, яркие при выборе ***
Scene_Menu.prototype.createCommands = function() {
    this._commands = [];
    this._compos = [];
    this._comzoom = [];
    this._comField = new Sprite();
    this._field.addChild(this._comField);

    var spacing = 80;
    var centerX = Moghunter.scMenu_ComX;
    var startX = centerX + 210 - ((this._comList.length - 1) * spacing) / 2;

    for (var i = 0; i < this._comList.length; i++) {
        this._commands[i] = new Sprite(this._comBitmaps[i]);
        this._commands[i].anchor.x = 0.5;
        this._commands[i].anchor.y = 0.5;
        this._commands[i].x = startX + spacing * i;
        this._commands[i].y = Moghunter.scMenu_ComY;
        this._commands[i].opacity = 160; // начальное затемнение
        this._compos[i] = [startX + spacing * i, Moghunter.scMenu_ComY];
        this._comzoom[i] = 0;
        this._comField.addChild(this._commands[i]);
    }

    // Стрелка для команд
    this._cmdArrowWindow = new Window_Base(0, 0, 0, 0);
    this._cmdArrowWindow.opacity = 0;
    this._cmdArrowWindow.backOpacity = 0;
    this._cmdArrowWindow.contentsOpacity = 0;
    this._cmdArrow = this._cmdArrowWindow._windowPauseSignSprite;
    this._cmdArrow.visible = false;
    this._comField.addChild(this._cmdArrow);
};

Scene_Menu.prototype.updatePauseArrow = function(sprite) {
    if (!sprite) return;
    var w = Graphics.frameCount;
    sprite.y += Math.sin(w / 8) * 0.5;
    sprite.opacity = 200 + Math.sin(w / 8) * 55;
};

Scene_Menu.prototype.updateCommands = function() {
    if (!this._statusWindow.active && this._commandWindow.active) {
        var hoverIndex = -1;
        for (var i = 0; i < this._commands.length; i++) {
            if (this.isOnSprite(this._commands[i])) {
                hoverIndex = i;
                break;
            }
        }
        if (hoverIndex !== -1 && this._commandWindow._index !== hoverIndex) {
            this._commandWindow.select(hoverIndex);
        }
    }

    var selIndex = this._commandWindow._index;
    for (var i = 0; i < this._commands.length; i++) {
        var isSelected = (i === selIndex);
        var nx, ny;
        if (isSelected) {
            nx = this._statusWindow.active ? Moghunter.scMenu_ComWX : this._compos[i][0];
            ny = this._statusWindow.active ? Moghunter.scMenu_ComWY : this._compos[i][1];
            // Выбранная иконка — яркая
            if (this._commands[i].opacity < 255) {
                this._commands[i].opacity += 20;
                if (this._commands[i].opacity > 255) this._commands[i].opacity = 255;
            }
        } else {
            nx = this._compos[i][0];
            ny = this._compos[i][1];
            // Невыбранные — затемнённые (160)
            if (this._commands[i].opacity > 160) {
                this._commands[i].opacity -= 10;
                if (this._commands[i].opacity < 160) this._commands[i].opacity = 160;
            } else if (this._commands[i].opacity < 160) {
                this._commands[i].opacity += 10;
                if (this._commands[i].opacity > 160) this._commands[i].opacity = 160;
            }
        }
        this._commands[i].x = this.commandMoveTo(this._commands[i].x, nx);
        this._commands[i].y = this.commandMoveTo(this._commands[i].y, ny);
    }

    // Стрелка над активной командой
    if (!this._statusWindow.active && selIndex >= 0 && this._commands[selIndex]) {
        var cmd = this._commands[selIndex];
        this._cmdArrow.visible = true;
        this._cmdArrow.x = cmd.x;
        this._cmdArrow.y = cmd.y - 18;
        this.updatePauseArrow(this._cmdArrow);
    } else {
        this._cmdArrow.visible = false;
    }
};

Scene_Menu.prototype.updateComField = function() {
    if (!this._statusWindow.active) {
        this._comField.opacity += 15
        if (this._comField.y < 0) {
            this._comField.y += 3;
            if (this._comField.y > 0 ) {this._comField.y = 0}
        }
    } else {
        this._comField.opacity -= 15
        if (this._comField.y > -50) {
            this._comField.y -= 3;
            if (this._comField.y < -50 ) {this._comField.y = -50}
        };
    };
};

Scene_Menu.prototype.isComEnabled = function(index) {
    if (index != this._commandWindow._index) {return false};
    return true;
};

Scene_Menu.prototype.commandMoveTo = function(value,real_value) {
    if (value == real_value) {return value};
    var dnspeed = 3 + (Math.abs(value - real_value) / 20);
    if (value > real_value) {value -= dnspeed;
        if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
        if (value  > real_value) {value  = real_value};
    };
    return Math.floor(value);
};

Scene_Menu.prototype.createCommandName = function() {
    this._commandName = new Sprite(new Bitmap(100,32));
    this._commandName.bitmap.fontSize = Moghunter.scMenu_ComNameFontSize;
    this._commandNameIndex = -2;
    this._commandNameIndex2 = -2;
    this._field.addChild(this._commandName);
    this._commandName.visible = String(Moghunter.scMenu_ComNameVisible) === "true" ? true : false;
};

Scene_Menu.prototype.updateCommandName = function() {
    if (this._statusWindow.active) {
        if (this._commandNameIndex2 != this._statusWindow._index) {this.refreshActorName()};
    } else {
        if (this._commandNameIndex != this._commandWindow._index) {this.refreshCommandName()};
    };
    this._commandName.x = this.commandMoveTo(this._commandName.x,Moghunter.scMenu_ComNameX);
    this._commandName.y = this.commandMoveTo(this._commandName.y,Moghunter.scMenu_ComNameY);
    this._commandName.opacity += 10;
};

Scene_Menu.prototype.refreshCommandName = function() {
    var index = this._commandWindow._index;
    if (index < 0 || index >= this._comList.length) return;
    this._commandNameIndex = index;
    this._commandNameIndex2 = -2;
    this._commandName.bitmap.clear();
    this._commandName.bitmap.drawText(this._comList[index].name, 0, 0, 100, 32, "center");
    this._commandName.x = Moghunter.scMenu_ComNameX - 50;
    this._commandName.y = Moghunter.scMenu_ComNameY;
    this._commandName.opacity = 0;
};

Scene_Menu.prototype.refreshActorName = function() {
    this._commandNameIndex = -2;
    this._commandNameIndex2 = this._statusWindow._index;
    this._commandName.bitmap.clear();
    var actor = $gameParty.members()[this._statusWindow._index]
    if (!actor) {return}
    this._commandName.bitmap.drawText(actor.name(),0,0,100,32,"center")
    this._commandName.x = Moghunter.scMenu_ComNameX - 100;
    this._commandName.y = Moghunter.scMenu_ComNameY;
    this._commandName.opacity = 0;
};

// *** ПАНЕЛЬ ВЫБОРА ЛИЦ (faces2): подсветка + стрелка СВЕРХУ (сдвинута на 20px вниз) ***
Scene_Menu.prototype.createSelection = function() {
    this._selection = [];
    this._selectionPos = [];
    this._selzoom = [];
    this._selMax = Math.min(Math.max(Moghunter.scMenu_maxVisibleFaces,2),999);
    this._selField = new Sprite();
    this._field.addChild(this._selField);
    this._selField.opacity = 0;
    this._selField.x = Moghunter.scMenu_FaceSelX + 50;
    this._selField.y = Moghunter.scMenu_FaceSelY;

    var count = $gameParty.members().length;
    var faceWidth = this._facesBitmaps[0].width;
    var spacing = 4 + faceWidth;
    for (var i = 0; i < count; i++) {
        this._selection[i] = new Sprite(this._facesBitmaps[i]);
        var localX = (i - (count - 1) / 2) * spacing;
        this._selectionPos[i] = [localX, 0];
        this._selection[i].anchor.x = 0.5;
        this._selection[i].anchor.y = 0.5;
        this._selection[i].opacity = 160;  // все приглушены по умолчанию
        this._selection[i].vsb = false;
        this._selection[i].x = this._selectionPos[i][0];
        this._selection[i].y = this._selectionPos[i][1];
        this._selField.addChild(this._selection[i]);
    }

    // Стрелка для подсвеченного лица
    this._selArrowWindow = new Window_Base(0, 0, 0, 0);
    this._selArrowWindow.opacity = 0;
    this._selArrowWindow.backOpacity = 0;
    this._selArrowWindow.contentsOpacity = 0;
    this._selArrow = this._selArrowWindow._windowPauseSignSprite;
    this._selArrow.visible = false;
    this._selField.addChild(this._selArrow);
};

Scene_Menu.prototype.isOnFaceSprite = function(sprite) {
    if (!sprite.visible || sprite.opacity === 0) return false;
    var cw = sprite.bitmap.width / 2;
    var ch = sprite.bitmap.height / 2;
    var globalX = sprite.x + this._selField.x;
    var globalY = sprite.y + this._selField.y;
    if (TouchInput.x < globalX - cw) return false;
    if (TouchInput.x > globalX + cw) return false;
    if (TouchInput.y < globalY - ch) return false;
    if (TouchInput.y > globalY + ch) return false;
    return true;
};

Scene_Menu.prototype.updateSelection = function() {
    if (this._statusWindow.active && this._selection) {
        var hoverFaceIndex = -1;
        for (var i = 0; i < this._selection.length; i++) {
            if (this.isOnFaceSprite(this._selection[i])) {
                hoverFaceIndex = i;
                break;
            }
        }
        if (hoverFaceIndex !== -1 && this._statusWindow._index !== hoverFaceIndex) {
            this._statusWindow.select(hoverFaceIndex);
        }
    }

    if (this._statusWindow.active) {
        this._selField.opacity += 15;
        if (this._selField.x > Moghunter.scMenu_FaceSelX) {
            this._selField.x -= 4;
            if (this._selField.x < Moghunter.scMenu_FaceSelX) this._selField.x = Moghunter.scMenu_FaceSelX;
        }
    } else {
        if (this._selField.x < Moghunter.scMenu_FaceSelX + 50) {
            this._selField.x += 4;
            if (this._selField.x > Moghunter.scMenu_FaceSelX + 50) this._selField.x = Moghunter.scMenu_FaceSelX + 50;
        }
        this._selField.opacity -= 15;
    }

    var selIndex = this._statusWindow._index;

    for (var i = 0; i < this._selection.length; i++) {
        // Управление видимостью лиц
        if (this._statusWindow._index < this._selMax) {
            var nindex = 0
            if (i > this._selMax) {
                this._selection[i].vsb = false;
            } else {
                this._selection[i].vsb = true;
            };
        } else {
            var ni = this._statusWindow._index - this._selMax
            var nindex = ((4 + this._facesBitmaps[i].width) * (ni));
            if (i < ni || i > ni + this._selMax) {
                this._selection[i].vsb = false;
            } else {
                this._selection[i].vsb = true;
            }
        };

        // Подсветка выбранного лица (opacity 255), остальные затемнены (160) или скрыты (0)
        var targetOpacity = 0;
        if (i === selIndex) {
            targetOpacity = 255;
        } else if (this._selection[i].vsb) {
            targetOpacity = 160;
        }

        // Плавное изменение прозрачности
        if (this._selection[i].opacity < targetOpacity) {
            this._selection[i].opacity += 15;
            if (this._selection[i].opacity > targetOpacity) this._selection[i].opacity = targetOpacity;
        } else if (this._selection[i].opacity > targetOpacity) {
            this._selection[i].opacity -= 15;
            if (this._selection[i].opacity < targetOpacity) this._selection[i].opacity = targetOpacity;
        }

        // Масштаб всегда 1.0
        this._selection[i].scale.x = 1.0;
        this._selection[i].scale.y = 1.0;

        var nx = this._selectionPos[i][0] - nindex;
        var ny = this._selectionPos[i][1];
        this._selection[i].x = this.commandMoveTo(this._selection[i].x,nx);
        this._selection[i].y = this.commandMoveTo(this._selection[i].y,ny);
    }

    // Стрелка над выбранным лицом, сдвинута на 20px вниз (было 10, стало 20)
    if (this._statusWindow.active && selIndex >= 0 && this._selection[selIndex]) {
        var face = this._selection[selIndex];
        this._selArrow.visible = true;
        this._selArrow.x = face.x;
        this._selArrow.y = face.y - face.bitmap.height / 2 - 14 + 20; // +20 вместо +10
        this.updatePauseArrow(this._selArrow);
    } else {
        this._selArrow.visible = false;
    }

    this.updateArrow();
};

// *** СИСТЕМНЫЕ СТРЕЛКИ ДЛЯ ПРОКРУТКИ ЛИЦ ***
Scene_Menu.prototype.createFaceArrows = function() {
    this._arrowSprites = [];
    this._arrowWindows = [];
    this._arrowPos = [];
    this._arrowAni = [0,0];

    for (var i = 0; i < 2; i++) {
        var win = new Window_Base(0, 0, 0, 0);
        win.opacity = 0;
        win.backOpacity = 0;
        win.contentsOpacity = 0;
        this._arrowWindows[i] = win;
        this._arrowSprites[i] = win._windowPauseSignSprite;
        this._arrowSprites[i].visible = false;
        this._selField.addChild(this._arrowSprites[i]);
    }

    var baseX = this._selection[0].x + this._selField.x;
    var baseY = Moghunter.scMenu_FaceSelY;
    var spacing = (4 + this._facesBitmaps[0].width) * this._selMax;
    this._arrowPos[0] = [baseX - 20, baseY];
    this._arrowPos[1] = [baseX + 4 + spacing, baseY];
    this._arrowSprites[1].scale.x = -1;
};

Scene_Menu.prototype.updateFaceArrowAnimation = function(sprite) {
    this.updatePauseArrow(sprite);
};

Scene_Menu.prototype.updateArrow = function() {
    this.updateArrowAni();
    for (var i = 0; i < 2; i++) {
        var sprite = this._arrowSprites[i];
        var basePos = this._arrowPos[i];
        var offsetX = (i === 0 ? -this._arrowAni[1] : this._arrowAni[1]);
        sprite.x = this.commandMoveTo(sprite.x, basePos[0] + offsetX);
        sprite.y = this.commandMoveTo(sprite.y, basePos[1]);
        sprite.visible = (i === 0 ? this.isArrow1Visible() : this.isArrow2Visible());
        if (sprite.visible) {
            this.updateFaceArrowAnimation(sprite);
        }
    }
};

Scene_Menu.prototype.isArrow1Visible = function() {
    if (this._statusWindow._index <= this._selMax) {return false};
    return true;
};

Scene_Menu.prototype.isArrow2Visible = function() {
    if (this._statusWindow._index >= this._selection.length - 1) {return false};
    if ($gameParty.members().length < this._selMax + 2 ) {return false};
    return true;
};

Scene_Menu.prototype.updateArrowAni = function() {
    this._arrowAni[0]++;
    if (this._arrowAni[0] < 20) {
        this._arrowAni[1] ++;
    } else if (this._arrowAni[0] < 40) {
        this._arrowAni[1] --;
    } else {
        this._arrowAni[1] = 0;
        this._arrowAni[0] = 0;
    };
};

// *** ТАЧИ ***
Scene_Menu.prototype.checkTouchOnSprites = function() {
    if (this._statusWindow.active) {
        this.checkTouchSelection();
    } else {
        this.checkTouchCommand();
    };
};

Scene_Menu.prototype.checkTouchSelection = function() {
    for (var i = 0; i < this._selection.length; i++) {
        if (this.isOnFaceSprite(this._selection[i])) {this.setTouchSelection(i)};
    };
    for (var i = 0; i < this._arrowSprites.length; i++) {
        if (this.isOnFaceSprite(this._arrowSprites[i])) {this.setTouchArrow(i)};
    };
};

Scene_Menu.prototype.setTouchArrow = function(index) {
    SoundManager.playCursor();
    if (index === 0) {
        this._statusWindow.cursorUp();
    } else {
        this._statusWindow.cursorDown();
    };
};

Scene_Menu.prototype.setTouchSelection = function(index) {
    this._statusWindow.select(index);
    this._statusWindow.processOk();
};

Scene_Menu.prototype.checkTouchCommand = function() {
    for (var i = 0; i < this._commands.length; i++) {
        if (this.isOnSprite(this._commands[i])) {
            this.setTouchCommand(i);
            break;
        }
    };
};

Scene_Menu.prototype.setTouchCommand = function(index) {
    this._commandWindow.select(index);
    this._commandWindow.processOk();
};

Scene_Menu.prototype.isOnSprite = function(sprite) {
    var cw = sprite.bitmap.width / 2;
    var ch = sprite.bitmap.height / 2;
    if (sprite.visible === false) {return false};
    if (sprite.opacity === 0) {return false};
    if (TouchInput.x < sprite.x - cw) {return false};
    if (TouchInput.x > sprite.x + cw) {return false};
    if (TouchInput.y < sprite.y - ch) {return false};
    if (TouchInput.y > sprite.y + ch) {return false};
    return true;
};

Scene_Menu.prototype.updateTouchScreen = function() {
    if (TouchInput.isTriggered()) {this.checkTouchOnSprites()};
};

Scene_Menu.prototype.updateWindowStatus = function() {
    this._statusWindow.visible = false;
    this._statusWindow.x = - this._statusWindow.width;
    this._statusWindow.updateScrollRoll();
};

var _mog_mono_scmenu_update = Scene_Menu.prototype.update;
Scene_Menu.prototype.update = function() {
    _mog_mono_scmenu_update.call(this)
    if (this._commands) {this.updateCommands()};
    if (this._commandName) {this.updateCommandName()};
    if (!this._selection && this._facesBitmaps && this._facesBitmaps[0].isReady()) {this.createAfter()};
    if (this._selection) {this.updateSelection()};
    if (this._playTime) {this.updateTime()};
    if (this._magicCircle) {this.updateMagicCircle()};
    this.updateComField();
    this.updateWindowStatus();
    this.updateTouchScreen();
};

//=============================================================================
// ** MBustMenu
//=============================================================================
function MBustMenu() {
    this.initialize.apply(this, arguments);
};

MBustMenu.prototype = Object.create(Sprite.prototype);
MBustMenu.prototype.constructor = MBustMenu;

MBustMenu.prototype.initialize = function(index,actor,maxmembers) {
    Sprite.prototype.initialize.call(this);
    this._index = index;
    this._actor = actor;
    this._maxMembers = maxmembers
    this.createCharaters();
};

MBustMenu.prototype.posX = function() {
    var space = Math.floor((Graphics.boxWidth - 32) / this._maxMembers);
    return 16 + (space / 2) + (space * this._index);
};

MBustMenu.prototype.createCharaters = function() {
    this._char = new Sprite(ImageManager.loadMenusFaces3("actor_" + this._actor._actorId));
    this._char.anchor.x = 0.5;
    this._char.anchor.y = 1.0;
    this._char.x = this.posX() + Moghunter.scMenu_CharX;
    this._char.y = Graphics.boxHeight + Moghunter.scMenu_CharY;
    this._orgX  = this._char.x;
    this._char.x -= 50;
    this._wait = 5 + 10 * this._index;
    this._char.opacity = 0;
    this.addChild(this._char);
};

MBustMenu.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._wait > 0) {this._wait--; return};
    this._char.opacity += 10;
    if (this._char.x < this._orgX) {
        this._char.x += 2;
        if (this._char.x > this._orgX) {this._char.x = this._orgX};
    };
};

//=============================================================================
// ** MCharStatus (HP/MP и состояния удалены)
//=============================================================================
function MCharStatus() {
    this.initialize.apply(this, arguments);
};

MCharStatus.prototype = Object.create(Sprite.prototype);
MCharStatus.prototype.constructor = MCharStatus;

MCharStatus.prototype.initialize = function(index,actor,maxmembers) {
    Sprite.prototype.initialize.call(this);
    this._index = index;
    this._actor = actor;
    this._maxMembers = maxmembers;
    this.x = 50;
    this._wait = 5 + 5 * this._index;
    this.opacity = 0;
    this.loadBitmaps();
};

MCharStatus.prototype.loadBitmaps = function() {
    this._layoutImg = ImageManager.loadMenusMain("LayoutStatus");
    this._numberImg3 = ImageManager.loadMenusMain("LVNumber");
    this._state_img = ImageManager.loadSystem("IconSet");
};

MCharStatus.prototype.posX = function() {
    var space = Math.floor((Graphics.boxWidth - 32) / this._maxMembers);
    return 16 + (space / 2) + (space * this._index);
};

MCharStatus.prototype.createSprites = function() {
    this.createLayoutStatus();
    this.createLVNumber();
    this.createName();
    this.createEquipIcons();
};

MCharStatus.prototype.createName = function() {
    this._name = new Sprite(new Bitmap(120,32));
    this._name.x = this._layout.x + Moghunter.scMenu_NameX;
    this._name.y = this._layout.y + Moghunter.scMenu_NameY;
    this._name.bitmap.fontSize = Moghunter.scMenu_NameFontSize;
    this._name.bitmap.drawText(this._actor.name(),0,0,120,32,"center");
    this.addChild(this._name);
};

MCharStatus.prototype.createStates = function() {
};

MCharStatus.prototype.refresh_states = function() {
};

MCharStatus.prototype.update_states = function() {
};

MCharStatus.prototype.need_refresh_states = function() {
    return false;
};

MCharStatus.prototype.createLayoutStatus = function() {
    this._layout = new Sprite(this._layoutImg);
    this._layout.x = this.posX() - 70 + Moghunter.scMenu_layoutStatusX;
    this._layout.y = Graphics.boxHeight - 280 + Moghunter.scMenu_layoutStatusY;
    this.addChild(this._layout);
};

MCharStatus.prototype.createLVNumber = function() {
    this._lv_number = [];
    this._NumberData3 = [this._numberImg3.width / 10,this._numberImg3.height]
    var x = this._layout.x + Moghunter.scMenu_LVNumberX;
    var y = this._layout.y + Moghunter.scMenu_LVNumberY;
    for (var i = 0; i < 3; i++) {
        this._lv_number[i] = new Sprite(this._numberImg3);
        this._lv_number[i].visible = false;
        this._lv_number[i].opacity = 255;
        this._lv_number[i].x = x ;
        this._lv_number[i].y = y ;
        this.addChild(this._lv_number[i]);
    };
    this.refresh_number(this._lv_number,this._actor.level,this._NumberData3,x)
};

MCharStatus.prototype.refresh_number = function(sprites,value,img_data,x) {
    if (value > 99999) {value = 99999};
    numbers = Math.abs(value).toString().split("");
    for (var i = 0; i < sprites.length ; i++) {
        sprites[i].visible = false;
        if (i < numbers.length) {
            var n = Number(numbers[i]);
            sprites[i].setFrame(n * img_data[0], 0, img_data[0], img_data[1]);
            var nx = -(img_data[0] * i) + (img_data[0] *  numbers.length);
            sprites[i].x = x - nx;
            sprites[i].visible = true;
        } else {
            var n = 0;
            sprites[i].setFrame(n * img_data[0], 0, img_data[0], img_data[1]);
            var nx = -(img_data[0] * i) + (img_data[0] *  (sprites.length + numbers.length));
            sprites[i].x = x - nx;
        };
    };
};

MCharStatus.prototype.createEquipIcons = function() {
    if (this._equipIcons) {
        for (var i = 0; i < this._equipIcons.length; i++) {
            this.removeChild(this._equipIcons[i]);
        }
    }
    this._equipIcons = [];
    var equips = this._actor.equips();
    var iconIndex = 0;
    for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (item) {
            var icon = new Sprite(this._state_img);
            var sx = (item.iconIndex % 16) * 32;
            var sy = Math.floor(item.iconIndex / 16) * 32;
            icon.setFrame(sx, sy, 32, 32);
            icon.x = this._layout.x + Moghunter.scMenu_EquipIconX + (iconIndex * Moghunter.scMenu_EquipIconSpacing);
            icon.y = this._layout.y + Moghunter.scMenu_EquipIconY;
            this.addChild(icon);
            this._equipIcons.push(icon);
            iconIndex++;
        }
    }
};

MCharStatus.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (!this._actor) {return}
    if (!this._lv_number) {
        if (this._numberImg3.isReady()) {this.createSprites();
        } else {
            return
        };
    };
    if (this._wait > 0) {this._wait--;return}
    this.opacity += 10;
    if (this.x > 0) {this.x -= 2;
        if (this.x < 0) {this.x = 0};
    }
};

//=============================================================================
// ** Window Menu Command
//=============================================================================
var _mog_menu_wMenuCom_update = Window_MenuCommand.prototype.update;
Window_MenuCommand.prototype.update = function() {
    _mog_menu_wMenuCom_update.call(this);
    this.visible = false;
    this.x = -this.width;
    this.updateScrollRoll();
};

Window_MenuCommand.prototype.processCursorMove = function() {
    if (this.isCursorMovable()) {
        var lastIndex = this.index();
        if (Input.isRepeated('down') || Input.isRepeated('right')) {
            this.cursorDown();
        };
        if (Input.isRepeated('up') || Input.isRepeated('left')) {
            this.cursorUp();
        };
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        };
    };
};

Window_MenuCommand.prototype.updateScrollRoll = function() {
    if (this.isOpenAndActive() && this.maxItems() > 0) {
        var srow = this.maxTopRow() === 0 ? 1 : this.maxCols();
        var threshold = 20;
        var idx = this._index;
        if (TouchInput.wheelY >= threshold) {
            this._index += srow;
            if (this._index > (this.maxItems() - 1)) {this._index = this.maxItems() - 1};
            this.select(this._index);
            if (idx != this._index) {SoundManager.playCursor()};
        };
        if (TouchInput.wheelY <= -threshold) {
            this._index -= srow;
            if (this._index < 0) {this._index = 0};
            this.select(this._index);
            if (idx != this._index) {SoundManager.playCursor()};
        };
    };
};

//=============================================================================
// ** Window MenuStatus
//=============================================================================
Window_MenuStatus.prototype.processCursorMove = function() {
    if (this.isCursorMovable()) {
        var lastIndex = this.index();
        if (Input.isRepeated('down') || Input.isRepeated('right')) {
            this.cursorDown();
        };
        if (Input.isRepeated('up') || Input.isRepeated('left')) {
            this.cursorUp();
        };
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        };
    };
};

Window_MenuStatus.prototype.updateScrollRoll = function() {
    if (this.isOpenAndActive() && this.maxItems() > 0) {
        var srow = this.maxTopRow() === 0 ? 1 : this.maxCols();
        var threshold = 20;
        var idx = this._index;
        if (TouchInput.wheelY >= threshold) {
            this._index += srow;
            if (this._index > (this.maxItems() - 1)) {this._index = this.maxItems() - 1};
            this.select(this._index);
            if (idx != this._index) {SoundManager.playCursor()};
        };
        if (TouchInput.wheelY <= -threshold) {
            this._index -= srow;
            if (this._index < 0) {this._index = 0};
            this.select(this._index);
            if (idx != this._index) {SoundManager.playCursor()};
        };
    };
};

//=============================================================================
// ** Scene Menu
//=============================================================================
Scene_Menu.prototype.commandFormation = function() {
    SceneManager.push(Scene_Party);
};

//=============================================================================
// ** Scene Party
//=============================================================================
function Scene_Party() {
    this.initialize.apply(this, arguments);
}

Scene_Party.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Party.prototype.constructor = Scene_Party;

Scene_Party.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Party.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createLayout();
    this.createStatusWindow();
};

Scene_Party.prototype.createLayout = function() {
};

Scene_Party.prototype.createStatusWindow = function() {
    this._statusWindow = new Window_MenuStatusM(0, 0);
    this._statusWindow.setFormationMode(true);
    this._statusWindow.selectLast();
    this._statusWindow.activate();
    this._statusWindow.setHandler('ok',     this.onFormationOk.bind(this));
    this._statusWindow.setHandler('cancel', this.onFormationCancel.bind(this));
    this.addWindow(this._statusWindow);
};

Scene_Party.prototype.onFormationOk = function() {
    var index = this._statusWindow.index();
    var actor = $gameParty.members()[index];
    var pendingIndex = this._statusWindow.pendingIndex();
    if (pendingIndex >= 0) {
        $gameParty.swapOrder(index, pendingIndex);
        this._statusWindow.setPendingIndex(-1);
        this._statusWindow.redrawItem(index);
    } else {
        this._statusWindow.setPendingIndex(index);
    }
    this._statusWindow.activate();
};

Scene_Party.prototype.onFormationCancel = function() {
    if (this._statusWindow.pendingIndex() >= 0) {
        this._statusWindow.setPendingIndex(-1);
        this._statusWindow.activate();
    } else {
        SceneManager.pop()
    }
};

Scene_Party.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    this._statusWindow.opacity = 0;
};

//=============================================================================
// ** Window MenuStatusM
//=============================================================================
function Window_MenuStatusM() {
    this.initialize.apply(this, arguments);
}

Window_MenuStatusM.prototype = Object.create(Window_Selectable.prototype);
Window_MenuStatusM.prototype.constructor = Window_MenuStatusM;

Window_MenuStatusM.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._formationMode = false;
    this._pendingIndex = -1;
    this.loadImages();
    this.refresh();
    this.select(0);
};

Window_MenuStatusM.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_MenuStatusM.prototype.windowHeight = function() {
    return Graphics.boxHeight;
};

Window_MenuStatusM.prototype.maxItems = function() {
    return $gameParty.size();
};

Window_MenuStatusM.prototype.itemHeight = function() {
    var clientHeight = this.height - this.padding * 2;
    return Math.floor(clientHeight / this.numVisibleRows());
};

Window_MenuStatusM.prototype.numVisibleRows = function() {
    return 4;
};

Window_MenuStatusM.prototype.loadImages = function() {
    $gameParty.members().forEach(function(actor) {
        ImageManager.loadFace(actor.faceName());
    }, this);
};

Window_MenuStatusM.prototype.drawItem = function(index) {
    this.contents.fontSize = 20;
    this.drawItemBackground(index)
    this.drawItemImage(index);
    this.drawItemStatus(index);
};

Window_MenuStatusM.prototype.drawItemBackground = function(index) {
    if (index === this._pendingIndex) {
        var rect = this.itemRect(index);
        var color = this.pendingColor();
        this.changePaintOpacity(false);
        this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
        this.changePaintOpacity(true);
    };
};

Window_MenuStatusM.prototype.drawItemImage = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    this.changePaintOpacity(actor.isBattleMember());
    this.drawActorFace(actor, rect.x + 1, rect.y + 1, 144, rect.height - 2);
    this.changePaintOpacity(true);
};

Window_MenuStatusM.prototype.drawItemStatus = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    var x = rect.x + 162;
    var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
    var width = rect.width - x - this.textPadding();
    this.changeTextColor(this.systemColor());
    this.drawText("LV",x,y + 32 * 1,64,"left")
    this.drawText("HP",x,y + 32 * 2,64,"left")
    this.drawText("MP",x,y + 32 * 3,80)
    this.drawText("Atk",x + 130,y + 32 * 1,64,"left")
    this.drawText("Def",x + 130,y + 32 * 2,64,"left")
    this.drawText("Mat",x + 130,y + 32 * 3,80)
    this.drawText("Mdf",x + 260,y + 32 * 1,64,"left")
    this.drawText("Agi",x + 260,y + 32 * 2,64,"left")
    this.drawText("Luk",x + 260,y + 32 * 3,80)
    this.changeTextColor(this.normalColor());
    this.drawText(actor.name(),x,y)
    this.drawText(actor.level,x,y + 32 * 1,80,"right")
    this.drawText(actor.mhp,x,y + 32 * 2,80,"right")
    this.drawText(actor.mmp,x,y + 32 * 3,80,"right")
    this.drawText(actor.atk ,x + 130,y + 32 * 1,80,"right")
    this.drawText(actor.def,x+ 130,y + 32 * 2,80,"right")
    this.drawText(actor.mat,x + 130,y + 32 * 3,80,"right")
    this.drawText(actor.mdf ,x + 260,y + 32 * 1,80,"right")
    this.drawText(actor.agi,x+ 260,y + 32 * 2,80,"right")
    this.drawText(actor.luk,x + 260,y + 32 * 3,80,"right")
};

Window_MenuStatusM.prototype.processOk = function() {
    Window_Selectable.prototype.processOk.call(this);
    $gameParty.setMenuActor($gameParty.members()[this.index()]);
};

Window_MenuStatusM.prototype.isCurrentItemEnabled = function() {
    if (this._formationMode) {
        var actor = $gameParty.members()[this.index()];
        return actor && actor.isFormationChangeOk();
    } else {
        return true;
    }
};

Window_MenuStatusM.prototype.selectLast = function() {
    this.select(0);
};

Window_MenuStatusM.prototype.formationMode = function() {
    return this._formationMode;
};

Window_MenuStatusM.prototype.setFormationMode = function(formationMode) {
    this._formationMode = formationMode;
};

Window_MenuStatusM.prototype.pendingIndex = function() {
    return this._pendingIndex;
};

Window_MenuStatusM.prototype.setPendingIndex = function(index) {
    var lastPendingIndex = this._pendingIndex;
    this._pendingIndex = index;
    this.redrawItem(this._pendingIndex);
    this.redrawItem(lastPendingIndex);
};

if (Imported.MOG_TimeSystem) {
    Scene_Menu.prototype.createTimeStatus = function() {
        $gameSystem._refresh_window_time = false;
    };
}
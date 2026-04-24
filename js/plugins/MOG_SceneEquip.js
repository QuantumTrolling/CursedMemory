//=============================================================================
// MOG_SceneEquip.js
//=============================================================================

/*:
 * @plugindesc (v1.0) Modifica a cena de equipamento.
 * (Иконки/текст ×2, окна подогнаны, навигация восстановлена,
 *  5-й слот отображается, параметры подписаны и выводятся на кастомном фоне,
 *  фокус сразу на слотах)
 * @author Moghunter (модифицировано)
 *
 * @param FontSize
 * @desc Definição do tamanho da fonte.
 * @default 20
 *
 * @param Help X-Axis
 * @desc Definição X-Axis da janela de ajuda.
 * @default 0
 *
 * @param Help Y-Axis
 * @desc Definição Y-Axis da janela de ajuda.
 * @default 516
 *
 * @param Help Layout X-Axis
 * @desc Definição X-Axis do layout da janela de ajuda.
 * @default 0
 *
 * @param Help Layout Y-Axis
 * @desc Definição Y-Axis do layout da janela de ajuda.
 * @default -67
 *
 * @param Command X-Axis
 * @desc Definição X-Axis da janela de comando.
 * @default 312
 *
 * @param Command Y-Axis
 * @desc Definição Y-Axis da janela de comando.
 * @default 10
 *
 * @param Command Layout X-Axis
 * @desc Definição X-Axis do layout da janela de comando.
 * @default 15
 *
 * @param Command Layout Y-Axis
 * @desc Definição Y-Axis do layout da janela de comando.
 * @default 11
 *
 * @param Slot X-Axis
 * @desc Definição X-Axis da janela de slot.
 * @default 312
 *
 * @param Slot Y-Axis
 * @desc Definição Y-Axis da janela de slot.
 * @default 70
 *
 * @param Slot Layout X-Axis
 * @desc Definição X-Axis do layout da janela de slot.
 * @default 22
 *
 * @param Slot Layout Y-Axis
 * @desc Definição Y-Axis do layout da janela de slot.
 * @default 8
 *
 * @param List X-Axis
 * @desc Definição X-Axis da janela de lista de items.
 * @default 305
 *
 * @param List Y-Axis
 * @desc Definição Y-Axis da janela de lista de items.
 * @default 280
 *
 * @param List Layout X-Axis
 * @desc Definição X-Axis do layout da janela de lista de items.
 * @default 0
 *
 * @param List Layout Y-Axis
 * @desc Definição Y-Axis do layout da janela de lista de items.
 * @default 0
 *
 * @param Status X-Axis
 * @desc Definição X-Axis da janela de status.
 * @default 10
 *
 * @param Status Y-Axis
 * @desc Definição Y-Axis da janela de  status.
 * @default 120
 *
 * @param Status Layout X-Axis
 * @desc Definição X-Axis do layout da janela de status.
 * @default 0
 *
 * @param Status Layout Y-Axis
 * @desc Definição Y-Axis do layout da janela de status.
 * @default 0
 *
 * @help
 * =============================================================================
 * +++ MOG - Scene Equip (v1.0) +++
 * By Moghunter
 * https://mogplugins.com
 * =============================================================================
 * Modifica a cena de equipamento.
 *
 * =============================================================================
 * UTILIZAÇÃO
 * =============================================================================
 * As imagens do sistema deverão ser gravados na pasta.
 *
 * /img/menus/equip/
 *
 * =============================================================================
 * МОДИФИКАЦИИ:
 * - Фокус при входе сразу на слотах экипировки (не нужно жать "Equip").
 * - Командное окно открывается по кнопке отмены.
 * - Иконки и названия предметов увеличены в 2 раза (64x64).
 * - Высота строк в окнах слотов и списка подогнана (itemHeight = 72).
 * - Ширина окон слотов и предметов уменьшена вдвое.
 * - Высота окон вмещает ровно 5 строк.
 * - Восстановлена нормальная работа навигации по слотам.
 * - Исправлено отображение содержимого 5-го слота.
 * - Параметры отображаются на кастомном фоне LayoutStatus (без системного окна).
 * - Названия параметров берутся из базы данных.
 * - Рамки вокруг параметров убраны.
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.MOG_SceneEquip = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters('MOG_SceneEquip');
Moghunter.scEquip_FontSize = Number(Moghunter.parameters['FontSize'] || 20);
Moghunter.scEquip_HelpWindowX = Number(Moghunter.parameters['Help X-Axis'] || 0);
Moghunter.scEquip_HelpWindowY = Number(Moghunter.parameters['Help Y-Axis'] || 516);
Moghunter.scEquip_HelpLayoutX = Number(Moghunter.parameters['Help Layout X-Axis'] || 0);
Moghunter.scEquip_HelpLayoutY = Number(Moghunter.parameters['Help Layout Y-Axis'] || -67);
Moghunter.scEquip_ComWindowX = Number(Moghunter.parameters['Command X-Axis'] || 312);
Moghunter.scEquip_ComWindowY = Number(Moghunter.parameters['Command Y-Axis'] || 10);
Moghunter.scEquip_ComLayoutX = Number(Moghunter.parameters['Command Layout X-Axis'] || 15);
Moghunter.scEquip_ComLayoutY = Number(Moghunter.parameters['Command Layout Y-Axis'] || 11);
Moghunter.scEquip_SlotWindowX = Number(Moghunter.parameters['Slot X-Axis'] || 312);
Moghunter.scEquip_SlotWindowY = Number(Moghunter.parameters['Slot Y-Axis'] || 70);
Moghunter.scEquip_SlotLayoutX = Number(Moghunter.parameters['Slot Layout X-Axis'] || 22);
Moghunter.scEquip_SlotLayoutY = Number(Moghunter.parameters['Slot Layout Y-Axis'] || 8);
Moghunter.scEquip_ItemWindowX = Number(Moghunter.parameters['List X-Axis'] || 305);
Moghunter.scEquip_ItemWindowY = Number(Moghunter.parameters['List Y-Axis'] || 280);
Moghunter.scEquip_ItemLayoutX = Number(Moghunter.parameters['List Layout X-Axis'] || 0);
Moghunter.scEquip_ItemLayoutY = Number(Moghunter.parameters['List Layout Y-Axis'] || 0);
Moghunter.scEquip_StatusWindowX = Number(Moghunter.parameters['Status X-Axis'] || 10);
Moghunter.scEquip_StatusWindowY = Number(Moghunter.parameters['Status Y-Axis'] || 120);
Moghunter.scEquip_StatusLayoutX = Number(Moghunter.parameters['Status Layout X-Axis'] || 0);
Moghunter.scEquip_StatusLayoutY = Number(Moghunter.parameters['Status Layout Y-Axis'] || 0);

//=============================================================================
// ** ImageManager
//=============================================================================

//==============================
// * Equip
//==============================
ImageManager.loadMenusequip = function(filename) {
    return this.loadBitmap('img/menus/equip/', filename, 0, true);
};

//=============================================================================
// ** Scene Equip
//=============================================================================

//==============================
// * create Background
//==============================
var _mog_scEquip_createBackground = Scene_Equip.prototype.createBackground;
Scene_Equip.prototype.createBackground = function() {
    _mog_scEquip_createBackground.call(this);
    this._field = new Sprite();
    this.addChild(this._field);
};

//==============================
// * Create
//==============================
var _mog_scEquipM_create = Scene_Equip.prototype.create;
Scene_Equip.prototype.create = function() {
    _mog_scEquipM_create.call(this);
    this._helpWindow.x = Moghunter.scEquip_HelpWindowX;
    this._helpWindow.y = Moghunter.scEquip_HelpWindowY;
    this._helpWindowOrg = [this._helpWindow.x, this._helpWindow.y];
    this._commandWindow.x = Moghunter.scEquip_ComWindowX;
    this._commandWindow.y = Moghunter.scEquip_ComWindowY;
    this._commandWindow.contents.fontSize = Moghunter.scEquip_FontSize;
    this._commandWindowOrg = [this._commandWindow.x, this._commandWindow.y];
    this._slotWindow.x = Moghunter.scEquip_SlotWindowX;
    this._slotWindow.y = Moghunter.scEquip_SlotWindowY;
    // Уменьшаем ширину окна слотов в 2 раза и увеличиваем высоту до 5 строк
    this._slotWindow.width = Math.floor(this._slotWindow.width / 2);
    this._slotWindow.height = this._slotWindow.fittingHeight(5);
    this._slotWindow.createContents();
    this._slotWindow.refresh();
    this._slotWindowOrg = [this._slotWindow.x, this._slotWindow.y];
    this._itemWindow.x = Moghunter.scEquip_ItemWindowX;
    this._itemWindow.y = Moghunter.scEquip_ItemWindowY;
    this._itemWindow.width = this._slotWindow.width;
    this._itemWindow.height = this._itemWindow.fittingHeight(5);
    this._itemWindow.createContents();
    this._itemWindow.refresh();
    this._itemWindowOrg = [this._itemWindow.x, this._itemWindow.y];
    this._statusWindow.x = Moghunter.scEquip_StatusWindowX;
    this._statusWindow.y = Moghunter.scEquip_StatusWindowY;
    this._statusWindowOrg = [this._statusWindow.x, this._statusWindow.y];
    this.createSprites();
    this.resetPosition();
};

//==============================
// * Start (фокус сразу на слотах)
//==============================
var _mog_scEquipM_start = Scene_Equip.prototype.start;
Scene_Equip.prototype.start = function() {
    _mog_scEquipM_start.call(this);
    this._commandWindow.deactivate();
    this._slotWindow.activate();
    this._slotWindow.select(0);
};

//==============================
// * On Actor Change
//==============================
var _mog_scsEquipM_onActorChange = Scene_Equip.prototype.onActorChange;
Scene_Equip.prototype.onActorChange = function() {
    _mog_scsEquipM_onActorChange.call(this);
    this.resetPosition();
    this.update();
};

//==============================
// * Create Sprites
//==============================
Scene_Equip.prototype.createSprites = function() {
    this.createLayout();
    this.createLayoutHelp();
    this.createLayoutCommand();
    this.createLayoutSlot();
    this.createLayoutItem();
    this.createLayoutStatus(); // будет создавать кастомный LayoutStatus
};

//==============================
// * Create Layout
//==============================
Scene_Equip.prototype.createLayout = function() {
    this._layout = new Sprite(ImageManager.loadMenusequip("Layout"));
    this._field.addChild(this._layout);
};

//==============================
// * Create LayoutHelp
//==============================
Scene_Equip.prototype.createLayoutHelp = function() {
    this._layoutHelp = new Sprite(ImageManager.loadMenusequip("LayoutHelp"));
    this._field.addChild(this._layoutHelp);
};

//==============================
// * Create LayoutCommand
//==============================
Scene_Equip.prototype.createLayoutCommand = function() {
    this._layoutCommand = new Sprite(ImageManager.loadMenusequip("LayoutCommand"));
    this._field.addChild(this._layoutCommand);
};

//==============================
// * Create LayoutSlot
//==============================
Scene_Equip.prototype.createLayoutSlot = function() {
    this._layoutSlot = new Sprite(ImageManager.loadMenusequip("LayoutSlot"));
    this._field.addChild(this._layoutSlot);
};

//==============================
// * Create LayoutItem
//==============================
Scene_Equip.prototype.createLayoutItem = function() {
    this._layoutItem = new Sprite(ImageManager.loadMenusequip("LayoutItem"));
    this._field.addChild(this._layoutItem);
};

//==============================
// * Create LayoutStatus (возвращён кастомный фон)
//==============================
Scene_Equip.prototype.createLayoutStatus = function() {
    this._layoutStatus = new Sprite(ImageManager.loadMenusequip("LayoutStatus"));
    this._field.addChild(this._layoutStatus);
};

//==============================
// * update Sprites
//==============================
Scene_Equip.prototype.updateSprites = function() {
    this.updateSlide();
    this.updateLayout();
};

//==============================
// * reset Position
//==============================
Scene_Equip.prototype.resetPosition = function() {
    var slide = 100;
    this._helpWindow.y = this._helpWindowOrg[1] + slide;
    this._commandWindow.y = this._commandWindowOrg[1] - slide;
    this._slotWindow.x = this._slotWindowOrg[0] + slide;
    this._itemWindow.x = this._itemWindowOrg[0] + slide + 0;
    this._statusWindow.x = this._statusWindowOrg[0] - slide - 0;
    this._helpWindow.contentsOpacity = 0;
    this._commandWindow.contentsOpacity = 0;
    this._slotWindow.contentsOpacity = 0;
    this._itemWindow.contentsOpacity = 0;
    this._statusWindow.contentsOpacity = 0;
};

//==============================
// * update Slide
//==============================
Scene_Equip.prototype.updateSlide = function() {
    var slideSpeed = 5;
    var opcSpeed = 10;
    this._helpWindow.contentsOpacity += opcSpeed;
    this._commandWindow.contentsOpacity += opcSpeed;
    this._slotWindow.contentsOpacity += opcSpeed;
    this._itemWindow.contentsOpacity += opcSpeed;
    this._statusWindow.contentsOpacity += opcSpeed;

    if (this._helpWindow.y > this._helpWindowOrg[1]) {
        this._helpWindow.y -= slideSpeed;
        if (this._helpWindow.y < this._helpWindowOrg[1]) { this._helpWindow.y = this._helpWindowOrg[1]; }
    }
    if (this._commandWindow.y < this._commandWindowOrg[1]) {
        this._commandWindow.y += slideSpeed;
        if (this._commandWindow.y > this._commandWindowOrg[1]) { this._commandWindow.y = this._commandWindowOrg[1]; }
    }
    if (this._slotWindow.x > this._slotWindowOrg[0]) {
        this._slotWindow.x -= slideSpeed;
        if (this._slotWindow.x < this._slotWindowOrg[0]) { this._slotWindow.x = this._slotWindowOrg[0]; }
    }
    if (this._itemWindow.x > this._itemWindowOrg[0]) {
        this._itemWindow.x -= slideSpeed;
        if (this._itemWindow.x < this._itemWindowOrg[0]) { this._itemWindow.x = this._itemWindowOrg[0]; }
    }
    if (this._statusWindow.x < this._statusWindowOrg[0]) {
        this._statusWindow.x += slideSpeed;
        if (this._statusWindow.x > this._statusWindowOrg[0]) { this._statusWindow.x = this._statusWindowOrg[0]; }
    }
};

//==============================
// * update Layout (статусное окно снова скрыто, LayoutStatus активен)
//==============================
Scene_Equip.prototype.updateLayout = function() {
    this._layoutHelp.x = this._helpWindow.x + Moghunter.scEquip_HelpLayoutX;
    this._layoutHelp.y = this._helpWindow.y + Moghunter.scEquip_HelpLayoutY;
    this._layoutHelp.opacity = this._helpWindow.contentsOpacity;
    this._helpWindow.opacity = 0;

    this._layoutCommand.x = this._commandWindow.x + Moghunter.scEquip_ComLayoutX;
    this._layoutCommand.y = this._commandWindow.y + Moghunter.scEquip_ComLayoutY;
    this._layoutCommand.opacity = this._commandWindow.contentsOpacity;
    this._commandWindow.opacity = 0;

    this._layoutSlot.x = this._slotWindow.x + Moghunter.scEquip_SlotLayoutX;
    this._layoutSlot.y = this._slotWindow.y + Moghunter.scEquip_SlotLayoutY;
    this._layoutSlot.opacity = this._slotWindow.contentsOpacity;
    this._slotWindow.opacity = 0;

    this._layoutItem.x = this._itemWindow.x + Moghunter.scEquip_ItemLayoutX;
    this._layoutItem.y = this._itemWindow.y + Moghunter.scEquip_ItemLayoutY;
    this._layoutItem.opacity = this._itemWindow.contentsOpacity;
    this._itemWindow.opacity = 0;

    // Кастомный фон статуса возвращён
    this._layoutStatus.x = this._statusWindow.x + Moghunter.scEquip_StatusLayoutX;
    this._layoutStatus.y = this._statusWindow.y + Moghunter.scEquip_StatusLayoutY;
    this._layoutStatus.opacity = this._statusWindow.contentsOpacity;
    this._statusWindow.opacity = 0;   // само окно скрыто
};

//==============================
// * Update
//==============================
var _mog_scEquipM_update = Scene_Equip.prototype.update;
Scene_Equip.prototype.update = function() {
    _mog_scEquipM_update.call(this);
    if (this._layout) { this.updateSprites(); }
};

//=============================================================================
// ** Window Equip Slot
//=============================================================================

//==============================
// * Window Equip Slot - lineHeight
//==============================
Window_EquipSlot.prototype.lineHeight = function() {
    return 72;
};

//==============================
// * Window Equip Slot - itemHeight
//==============================
Window_EquipSlot.prototype.itemHeight = function() {
    return this.lineHeight();
};

//==============================
// * Window Equip Slot - Draw Item (иконки и текст увеличены в 2 раза)
//==============================
Window_EquipSlot.prototype.drawItem = function(index) {
    this.contents.fontSize = Moghunter.scEquip_FontSize * 2;
    if (this._actor) {
        var rect = this.itemRectForText(index);
        this.changeTextColor(this.systemColor());
        this.changePaintOpacity(this.isEnabled(index));
        var item = this._actor.equips()[index];
        this.drawItemName(item, rect.x, rect.y, rect.width);
        this.changePaintOpacity(true);
    }
};

//==============================
// * Window Equip Slot - Draw Item Name (увеличенная иконка и шрифт)
//==============================
Window_EquipSlot.prototype.drawItemName = function(item, x, y, width) {
    if (item) {
        var iconIndex = item.iconIndex;
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth * 2;
        var ph = Window_Base._iconHeight * 2;
        var sx = iconIndex % 16 * Window_Base._iconWidth;
        var sy = Math.floor(iconIndex / 16) * Window_Base._iconHeight;
        this.contents.blt(bitmap, sx, sy, Window_Base._iconWidth, Window_Base._iconHeight, x, y, pw, ph);
        this.drawText(item.name, x + pw + 8, y, width - pw - 8);
    } else {
        this.drawText("", x, y, width);
    }
};

//=============================================================================
// ** Window Equip Command
//=============================================================================

Window_EquipCommand.prototype.drawText = function(text, x, y, maxWidth, align) {
};

//=============================================================================
// ** Window Equip Status
//=============================================================================

var _mog_scequip_westatus_initialize = Window_EquipStatus.prototype.initialize;
Window_EquipStatus.prototype.initialize = function(x, y) {
    _mog_scequip_westatus_initialize.call(this, x, y);
    this._parImg = ImageManager.loadMenusequip("Par");
    this._parData = [0, 0];
};

Window_EquipStatus.prototype.createFaceSprite = function() {
    this._faceSprite = new Sprite();
    this._faceSprite.x = 150;
    this._faceSprite.y = 0;
    this.addChild(this._faceSprite);
};

Window_EquipStatus.prototype.refresh = function() {
    this.contents.clear();
    this.contents.fontSize = Moghunter.scEquip_FontSize;
    if (this._actor) {
        this._parData[0] = this._parImg.width / 3;
        this._parData[1] = this._parImg.height;
        if (!this._faceSprite) { this.createFaceSprite(); }
        this.refreshFaceSprite();
        this.drawActorName(this._actor, this.textPadding(), 0);
        for (var i = 0; i < 8; i++) {
            this.drawItem(0, 53 + this.lineHeight() * i, i);
        }
        console.log(this._actor.param(1));
    }
};

Window_EquipStatus.prototype.refreshFaceSprite = function() {
    this._faceSprite.bitmap = ImageManager.loadMenusFaces1("Actor_" + this._actor._actorId);
};

Window_EquipStatus.prototype.windowHeight = function() {
    return 400;
};

//==============================
// * draw Param Name (отображает названия из $dataSystem)
//==============================
Window_EquipStatus.prototype.drawParamName = function(x, y, paramId) {
    if ($dataSystem && $dataSystem.terms && $dataSystem.terms.params[paramId]) {
        var name = $dataSystem.terms.params[paramId];
        this.changeTextColor(this.systemColor());
        this.drawText(name, x, y, 120);
        this.resetTextColor();
    }
};

//==============================
// * draw Right Arrow
//==============================
Window_EquipStatus.prototype.drawRightArrowM = function(x, y, paramId) {
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    if (diffvalue > 0) {
        var sx = this._parData[0];
    } else if (diffvalue < 0) {
        var sx = this._parData[0] * 2;
    } else {
        var sx = 0;
    }
    this.contents.blt(this._parImg, sx, 0, this._parData[0], this._parData[1], x, y);
};

//==============================
// * draw Item (без рамок, без системного фона)
//==============================
Window_EquipStatus.prototype.drawItem = function(x, y, paramId) {
    var w = this.contents.width - x;
    var h = this.lineHeight();
    // Никакого заполнения фона и рамок – просто текст и стрелки на прозрачном фоне
    this.drawParamName(x + this.textPadding(), y, paramId);

    if (this._actor) {
        this.drawCurrentParam(x + 120, y, paramId);
        if (this._tempActor) {
            this.drawRightArrowM(x + 188, y + 6, paramId);
        }
    }
    if (this._tempActor) {
        this.drawNewParam(x + 202, y, paramId);
    }
};

//==============================
// * update
//==============================
var _mog_scnEquipUpdate = Window_EquipStatus.prototype.update;
Window_EquipStatus.prototype.update = function() {
    _mog_scnEquipUpdate.call(this);
    this._faceSprite.opacity = this.contentsOpacity;
};

//=============================================================================
// ** Window Equip Item
//=============================================================================

//==============================
// * Window Equip Item - lineHeight
//==============================
Window_EquipItem.prototype.lineHeight = function() {
    return 72;
};

//==============================
// * Window Equip Item - itemHeight
//==============================
Window_EquipItem.prototype.itemHeight = function() {
    return this.lineHeight();
};

//==============================
// * Window Equip Item - Draw Item Name (увеличенная иконка и шрифт)
//==============================
Window_EquipItem.prototype.drawItemName = function(item, x, y, width) {
    this.contents.fontSize = Moghunter.scEquip_FontSize * 2;
    if (item) {
        var iconIndex = item.iconIndex;
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth * 2;
        var ph = Window_Base._iconHeight * 2;
        var sx = iconIndex % 16 * Window_Base._iconWidth;
        var sy = Math.floor(iconIndex / 16) * Window_Base._iconHeight;
        this.contents.blt(bitmap, sx, sy, Window_Base._iconWidth, Window_Base._iconHeight, x, y, pw, ph);
        this.drawText(item.name, x + pw + 8, y, width - pw - 8);
    } else {
        this.drawText("", x, y, width);
    }
};

Window_EquipItem.prototype.maxCols = function() {
    return 1;
};
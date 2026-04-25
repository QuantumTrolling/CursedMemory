//=============================================================================
// MOG_SceneEquip.js
//=============================================================================

/*:
 * @plugindesc (v1.4) Modifica a cena de equipamento.
 * (Иконки/текст ×2, окна подогнаны, навигация восстановлена,
 *  5-й слот отображается, параметры подписаны, фокус сразу на слотах,
 *  иконка оружия зависит от типа, стандартные рамки MV)
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
 * @param Command X-Axis
 * @desc Definição X-Axis da janela de comando.
 * @default 312
 *
 * @param Command Y-Axis
 * @desc Definição Y-Axis da janela de comando.
 * @default 10
 *
 * @param Slot X-Axis
 * @desc Definição X-Axis da janela de slot.
 * @default 312
 *
 * @param Slot Y-Axis
 * @desc Definição Y-Axis da janela de slot.
 * @default 70
 *
 * @param List X-Axis
 * @desc Definição X-Axis da janela de lista de items.
 * @default 305
 *
 * @param List Y-Axis
 * @desc Definição Y-Axis da janela de lista de items.
 * @default 280
 *
 * @param Status X-Axis
 * @desc Definição X-Axis da janela de status.
 * @default 10
 *
 * @param Status Y-Axis
 * @desc Definição Y-Axis da janela de  status.
 * @default 120
 *
 * @param Slot0_Icon
 * @desc ID иконки для слота 0 (fallback, если тип оружия не задан).
 * @default 116
 *
 * @param Slot1_Icon
 * @desc ID иконки для слота 1 (Щит). 0 - не показывать.
 * @default 118
 *
 * @param Slot2_Icon
 * @desc ID иконки для слота 2 (Голова). 0 - не показывать.
 * @default 120
 *
 * @param Slot3_Icon
 * @desc ID иконки для слота 3 (Тело). 0 - не показывать.
 * @default 122
 *
 * @param Slot4_Icon
 * @desc ID иконки для слота 4 (Аксессуар). 0 - не показывать.
 * @default 124
 *
 * @param Weapon Type 1 Icon
 * @desc Иконка для типа оружия 1.
 * @default 0
 *
 * @param Weapon Type 2 Icon
 * @desc Иконка для типа оружия 2.
 * @default 0
 *
 * @param Weapon Type 3 Icon
 * @desc Иконка для типа оружия 3.
 * @default 0
 *
 * @param Weapon Type 4 Icon
 * @desc Иконка для типа оружия 4.
 * @default 0
 *
 * @param Weapon Type 5 Icon
 * @desc Иконка для типа оружия 5.
 * @default 0
 *
 * @param Weapon Type 6 Icon
 * @desc Иконка для типа оружия 6.
 * @default 0
 *
 * @param Weapon Type 7 Icon
 * @desc Иконка для типа оружия 7.
 * @default 0
 *
 * @param Weapon Type 8 Icon
 * @desc Иконка для типа оружия 8.
 * @default 0
 *
 * @param Weapon Type 9 Icon
 * @desc Иконка для типа оружия 9.
 * @default 0
 *
 * @param Weapon Type 10 Icon
 * @desc Иконка для типа оружия 10.
 * @default 0
 *
 * @param Weapon Type 11 Icon
 * @desc Иконка для типа оружия 11.
 * @default 0
 *
 * @param Weapon Type 12 Icon
 * @desc Иконка для типа оружия 12.
 * @default 0
 *
 * @param Weapon Type 13 Icon
 * @desc Иконка для типа оружия 13.
 * @default 0
 *
 * @param Weapon Type 14 Icon
 * @desc Иконка для типа оружия 14.
 * @default 0
 *
 * @param Weapon Type 15 Icon
 * @desc Иконка для типа оружия 15.
 * @default 0
 *
 * @param Weapon Type 16 Icon
 * @desc Иконка для типа оружия 16.
 * @default 0
 *
 * @param Weapon Type 17 Icon
 * @desc Иконка для типа оружия 17.
 * @default 0
 *
 * @param Weapon Type 18 Icon
 * @desc Иконка для типа оружия 18.
 * @default 0
 *
 * @param Weapon Type 19 Icon
 * @desc Иконка для типа оружия 19.
 * @default 0
 *
 * @param Weapon Type 20 Icon
 * @desc Иконка для типа оружия 20.
 * @default 0
 *
 * @help
 * =============================================================================
 * +++ MOG - Scene Equip (v1.4) +++
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
 * - Фокус при входе сразу на слотах экипировки.
 * - Иконки и названия предметов увеличены в 2 раза (64x64).
 * - Высота строк в окнах слотов/списка = 72.
 * - Ширина окон слотов/предметов уменьшена вдвое, высота на 5 строк.
 * - 5-й слот отображается корректно.
 * - Параметры подписаны (названия из базы).
 * - Иконка первого слота теперь зависит от типа оружия (настраивается для каждого ID типа).
 * - Окна используют стандартные рамки MV.
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
Moghunter.scEquip_ComWindowX = Number(Moghunter.parameters['Command X-Axis'] || 312);
Moghunter.scEquip_ComWindowY = Number(Moghunter.parameters['Command Y-Axis'] || 10);
Moghunter.scEquip_SlotWindowX = Number(Moghunter.parameters['Slot X-Axis'] || 312);
Moghunter.scEquip_SlotWindowY = Number(Moghunter.parameters['Slot Y-Axis'] || 70);
Moghunter.scEquip_ItemWindowX = Number(Moghunter.parameters['List X-Axis'] || 305);
Moghunter.scEquip_ItemWindowY = Number(Moghunter.parameters['List Y-Axis'] || 280);
Moghunter.scEquip_StatusWindowX = Number(Moghunter.parameters['Status X-Axis'] || 10);
Moghunter.scEquip_StatusWindowY = Number(Moghunter.parameters['Status Y-Axis'] || 120);

Moghunter.scEquip_SlotIcons = [
    Number(Moghunter.parameters['Slot0_Icon'] || 0),
    Number(Moghunter.parameters['Slot1_Icon'] || 0),
    Number(Moghunter.parameters['Slot2_Icon'] || 0),
    Number(Moghunter.parameters['Slot3_Icon'] || 0),
    Number(Moghunter.parameters['Slot4_Icon'] || 0)
];

// Иконки типов оружия (индексы 1..20)
Moghunter.scEquip_WeaponTypeIcons = [];
for (var i = 1; i <= 20; i++) {
    Moghunter.scEquip_WeaponTypeIcons[i] = Number(Moghunter.parameters['Weapon Type ' + i + ' Icon'] || 0);
}

//=============================================================================
// ** ImageManager
//=============================================================================
ImageManager.loadMenusequip = function(filename) {
    return this.loadBitmap('img/menus/equip/', filename, 0, true);
};

//=============================================================================
// ** Scene Equip
//=============================================================================

var _mog_scEquip_createBackground = Scene_Equip.prototype.createBackground;
Scene_Equip.prototype.createBackground = function() {
    _mog_scEquip_createBackground.call(this);
    this._field = new Sprite();
    this.addChild(this._field);
};

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

    // Общий фон Layout (по желанию)
    this._layout = new Sprite(ImageManager.loadMenusequip("Layout"));
    this._field.addChild(this._layout);

    this.resetPosition();
};

var _mog_scEquipM_start = Scene_Equip.prototype.start;
Scene_Equip.prototype.start = function() {
    _mog_scEquipM_start.call(this);
    this._commandWindow.deactivate();
    this._slotWindow.activate();
    this._slotWindow.select(0);
};

var _mog_scsEquipM_onActorChange = Scene_Equip.prototype.onActorChange;
Scene_Equip.prototype.onActorChange = function() {
    _mog_scsEquipM_onActorChange.call(this);
    this.resetPosition();
    this.update();
};

Scene_Equip.prototype.resetPosition = function() {
    var slide = 100;
    this._helpWindow.y = this._helpWindowOrg[1] + slide;
    this._commandWindow.y = this._commandWindowOrg[1] - slide;
    this._slotWindow.x = this._slotWindowOrg[0] + slide;
    this._itemWindow.x = this._itemWindowOrg[0] + slide;
    this._statusWindow.x = this._statusWindowOrg[0] - slide;

    this._helpWindow.contentsOpacity = 0;
    this._commandWindow.contentsOpacity = 0;
    this._slotWindow.contentsOpacity = 0;
    this._itemWindow.contentsOpacity = 0;
    this._statusWindow.contentsOpacity = 0;
};

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
        if (this._helpWindow.y < this._helpWindowOrg[1]) this._helpWindow.y = this._helpWindowOrg[1];
    }
    if (this._commandWindow.y < this._commandWindowOrg[1]) {
        this._commandWindow.y += slideSpeed;
        if (this._commandWindow.y > this._commandWindowOrg[1]) this._commandWindow.y = this._commandWindowOrg[1];
    }
    if (this._slotWindow.x > this._slotWindowOrg[0]) {
        this._slotWindow.x -= slideSpeed;
        if (this._slotWindow.x < this._slotWindowOrg[0]) this._slotWindow.x = this._slotWindowOrg[0];
    }
    if (this._itemWindow.x > this._itemWindowOrg[0]) {
        this._itemWindow.x -= slideSpeed;
        if (this._itemWindow.x < this._itemWindowOrg[0]) this._itemWindow.x = this._itemWindowOrg[0];
    }
    if (this._statusWindow.x < this._statusWindowOrg[0]) {
        this._statusWindow.x += slideSpeed;
        if (this._statusWindow.x > this._statusWindowOrg[0]) this._statusWindow.x = this._statusWindowOrg[0];
    }
};

Scene_Equip.prototype.updateSprites = function() {
    this.updateSlide();
};

var _mog_scEquipM_update = Scene_Equip.prototype.update;
Scene_Equip.prototype.update = function() {
    _mog_scEquipM_update.call(this);
    if (this._layout) this.updateSprites();
};

//=============================================================================
// ** Window EquipSlot
//=============================================================================
Window_EquipSlot.prototype.lineHeight = function() {
    return 72;
};

Window_EquipSlot.prototype.itemHeight = function() {
    return this.lineHeight();
};

Window_EquipSlot.prototype.drawItem = function(index) {
    this.contents.fontSize = Moghunter.scEquip_FontSize * 2;
    if (this._actor) {
        var rect = this.itemRectForText(index);
        var iconWh = Window_Base._iconWidth * 2;
        var slotIconId = this.slotIconId(index);  // новый метод

        if (slotIconId > 0) {
            var bitmap = ImageManager.loadSystem('IconSet');
            var sx = slotIconId % 16 * Window_Base._iconWidth;
            var sy = Math.floor(slotIconId / 16) * Window_Base._iconHeight;
            var dx = rect.x;
            var dy = rect.y + (this.itemHeight() - iconWh) / 2;
            this.contents.blt(bitmap, sx, sy, Window_Base._iconWidth, Window_Base._iconHeight, dx, dy, iconWh, iconWh);
        }

        var itemX = rect.x + (slotIconId > 0 ? iconWh + 8 : 0);
        var itemWidth = rect.width - (slotIconId > 0 ? iconWh + 8 : 0);

        this.changeTextColor(this.systemColor());
        this.changePaintOpacity(this.isEnabled(index));
        var item = this._actor.equips()[index];
        this.drawItemName(item, itemX, rect.y, itemWidth);
        this.changePaintOpacity(true);
    }
};

// Новая функция: определяет ID иконки слота с учётом типа оружия
Window_EquipSlot.prototype.slotIconId = function(index) {
    if (index !== 0) return Moghunter.scEquip_SlotIcons[index] || 0;

    // Слот оружия (index 0)
    var item = this._actor.equips()[0];
    if (item && DataManager.isWeapon(item)) {
        var wtypeId = item.wtypeId;
        return Moghunter.scEquip_WeaponTypeIcons[wtypeId] || Moghunter.scEquip_SlotIcons[0];
    } else {
        // Оружие не надето – ищем первый доступный тип
        var types = this._actor.equippableWeaponTypes();
        for (var i = 0; i < types.length; i++) {
            var icon = Moghunter.scEquip_WeaponTypeIcons[types[i]];
            if (icon > 0) return icon;
        }
        return Moghunter.scEquip_SlotIcons[0]; // fallback
    }
};

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
// ** Window Equip Command (скрыто)
//=============================================================================
Scene_Equip.prototype.onSlotCancel = function() {
    this.popScene();
};

Scene_Equip.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_EquipCommand(0, 0);
    this._commandWindow.x = Moghunter.scEquip_ComWindowX;
    this._commandWindow.y = Moghunter.scEquip_ComWindowY;
    this._commandWindow.visible = false;
    this.addWindow(this._commandWindow);
};

//=============================================================================
// ** Window EquipStatus
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
        if (!this._faceSprite) this.createFaceSprite();
        this.refreshFaceSprite();
        this.drawActorName(this._actor, this.textPadding(), 0);
        for (var i = 0; i < 8; i++) {
            this.drawItem(0, 53 + this.lineHeight() * i, i);
        }
    }
};

Window_EquipStatus.prototype.refreshFaceSprite = function() {
    this._faceSprite.bitmap = ImageManager.loadMenusFaces1("Actor_" + this._actor._actorId);
};

Window_EquipStatus.prototype.windowHeight = function() {
    return 400;
};

Window_EquipStatus.prototype.drawParamName = function(x, y, paramId) {
    if ($dataSystem && $dataSystem.terms && $dataSystem.terms.params[paramId]) {
        var name = $dataSystem.terms.params[paramId];
        this.changeTextColor(this.systemColor());
        this.drawText(name, x, y, 120);
        this.resetTextColor();
    }
};

Window_EquipStatus.prototype.drawRightArrowM = function(x, y, paramId) {
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    var sx;
    if (diffvalue > 0) {
        sx = this._parData[0];
    } else if (diffvalue < 0) {
        sx = this._parData[0] * 2;
    } else {
        sx = 0;
    }
    this.contents.blt(this._parImg, sx, 0, this._parData[0], this._parData[1], x, y);
};

Window_EquipStatus.prototype.drawItem = function(x, y, paramId) {
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

var _mog_scnEquipUpdate = Window_EquipStatus.prototype.update;
Window_EquipStatus.prototype.update = function() {
    _mog_scnEquipUpdate.call(this);
    if (this._faceSprite) this._faceSprite.opacity = this.contentsOpacity;
};

//=============================================================================
// ** Window EquipItem
//=============================================================================
Window_EquipItem.prototype.lineHeight = function() {
    return 72;
};

Window_EquipItem.prototype.itemHeight = function() {
    return this.lineHeight();
};

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
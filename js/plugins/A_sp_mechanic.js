//=============================================================================
// A_SP_Mechanic.js
//=============================================================================
// Дополнение к MOG_BattleHud + Double Icon Skills:
// общие SP для отряда, плашка в окне навыков и стоимость SP под иконкой.
// Версия 2.3 – добавлен общий сдвиг всех стоимостей по X (Cost X Offset)
//=============================================================================

/*:
 * @plugindesc v2.3 SP для партии + плашка + сдвиг всех стоимостей (AP/EP/SP).
 * @author Дополнение сообществом
 *
 * @help
 * ============================================================================
 * Введение
 * ============================================================================
 * Этот плагин добавляет ресурс SP (Skill Points), общий для всего отряда.
 * В начале битвы даётся 4 SP (настраивается). SP не восстанавливаются сами.
 * Навыкам можно назначить стоимость SP через нотег: <sp cost: X>
 * При открытии окна навыков рядом с ним появляется плашка SP_Layout.png
 * с числом текущих SP.
 * Стоимость SP отображается в списке навыков ПОД ИКОНКОЙ, справа, в формате
 * "X SP", оранжевым цветом (\C[30]), на строке ниже стоимости AP/EP.
 *
 * Параметр "Cost X Offset" сдвигает ВСЕ стоимости (AP, EP, SP) по горизонтали.
 * Параметр "SP Cost X Offset (extra)" добавляет дополнительный сдвиг только для SP.
 *
 * ============================================================================
 * Параметры
 * ============================================================================
 * @param Initial SP
 * @text Начальное SP
 * @desc Количество SP в начале каждого боя.
 * @type number
 * @min 0
 * @default 4
 *
 * @param Max SP
 * @text Максимум SP
 * @desc Максимальное количество SP, которое может иметь отряд.
 * @type number
 * @min 0
 * @default 4
 *
 * @param SP Layout X Offset
 * @text Смещение плашки SP по X
 * @desc Смещение картинки SP_Layout.png относительно левого верхнего угла окна навыков.
 * @type number
 * @default 0
 *
 * @param SP Layout Y Offset
 * @text Смещение плашки SP по Y
 * @desc Смещение картинки SP_Layout.png относительно левого верхнего угла окна навыков.
 * @type number
 * @default -60
 *
 * @param SP Text X Offset
 * @text Смещение текста SP по X
 * @desc Дополнительное смещение числа SP внутри плашки по горизонтали.
 * @type number
 * @default 0
 *
 * @param SP Text Y Offset
 * @text Смещение текста SP по Y
 * @desc Дополнительное смещение числа SP внутри плашки по вертикали.
 * @type number
 * @default 0
 *
 * @param SP Font Size
 * @text Размер шрифта общего SP
 * @desc Размер цифр на плашке общего SP.
 * @type number
 * @min 10
 * @default 28
 *
 * @param Cost X Offset
 * @text Сдвиг всех стоимостей по X
 * @desc Смещение всех надписей (AP/EP/SP) в окне навыков по горизонтали (+ вправо).
 * @type number
 * @default 0
 *
 * @param SP Cost X Offset
 * @text Доп. сдвиг SP по X
 * @desc Дополнительное смещение только надписи "X SP" (добавляется к общему сдвигу).
 * @type number
 * @default 2
 */

(function() {
    'use strict';

    var parameters = PluginManager.parameters('A_SP_Mechanic');
    var initSP = Number(parameters['Initial SP'] || 4);
    var maxSP  = Number(parameters['Max SP'] || 4);
    var spLayoutX = Number(parameters['SP Layout X Offset'] || 0);
    var spLayoutY = Number(parameters['SP Layout Y Offset'] || -60);
    var spTextX = Number(parameters['SP Text X Offset'] || 0);
    var spTextY = Number(parameters['SP Text Y Offset'] || 0);
    var spFontSize = Number(parameters['SP Font Size'] || 28);
    var costXOffset = Number(parameters['Cost X Offset'] || 0);
    var spCostXOffset = Number(parameters['SP Cost X Offset'] || 2);

    //=========================================================================
    // Game_Party – храним SP
    //=========================================================================
    var _mogSP_GameParty_initMembers = Game_Party.prototype.initMembers;
    Game_Party.prototype.initMembers = function() {
        _mogSP_GameParty_initMembers.call(this);
        this._sp = 0;
    };

    Game_Party.prototype.sp = function() {
        return this._sp;
    };

    Game_Party.prototype.setSp = function(value) {
        this._sp = value.clamp(0, maxSP);
    };

    Game_Party.prototype.maxSp = function() {
        return maxSP;
    };

    Game_Party.prototype.gainSp = function(value) {
        this.setSp(this._sp + value);
    };

    //=========================================================================
    // DataManager – парсим нотеги навыков
    //=========================================================================
    var _mogSP_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_mogSP_DataManager_isDatabaseLoaded.call(this)) return false;
        this.processSPNotetags();
        return true;
    };

    DataManager.processSPNotetags = function() {
        if (!$dataSkills) return;
        for (var i = 1; i < $dataSkills.length; i++) {
            var skill = $dataSkills[i];
            if (!skill) continue;
            var notedata = skill.note.split(/[\r\n]+/);
            skill.spCost = 0;
            for (var j = 0; j < notedata.length; j++) {
                var line = notedata[j];
                if (line.match(/<sp\s*cost:\s*(\d+)>/i)) {
                    skill.spCost = parseInt(RegExp.$1);
                }
            }
        }
    };

    //=========================================================================
    // Game_Actor – тратим SP при использовании навыка
    //=========================================================================
    var _mogSP_GameActor_paySkillCost = Game_Actor.prototype.paySkillCost;
    Game_Actor.prototype.paySkillCost = function(skill) {
        _mogSP_GameActor_paySkillCost.call(this, skill);
        if (skill.spCost > 0) {
            $gameParty.gainSp(-skill.spCost);
        }
    };

    //=========================================================================
    // Window_BattleSkill – серые навыки при нехватке SP
    //=========================================================================
    var _mogSP_WindowBattleSkill_isEnabled = Window_BattleSkill.prototype.isEnabled;
    Window_BattleSkill.prototype.isEnabled = function(item) {
        if (!_mogSP_WindowBattleSkill_isEnabled.call(this, item)) return false;
        if (item && item.spCost > 0 && $gameParty.sp() < item.spCost) {
            return false;
        }
        return true;
    };

    //=========================================================================
    // Window_BattleSkill – сдвиг всех стоимостей (AP/EP + SP)
    //=========================================================================
    var _doubleIconSkills_drawSkillCost = Window_BattleSkill.prototype.drawSkillCost;
    Window_BattleSkill.prototype.drawSkillCost = function(skill, x, y, width) {
        // Сдвигаем начальную позицию для всех стоимостей
        var baseX = x + costXOffset;
        // Рисуем AP/EP с учётом общего сдвига
        _doubleIconSkills_drawSkillCost.call(this, skill, baseX, y, width);

        if (skill && skill.spCost > 0) {
            var iconSize = width;
            var textY = y + iconSize + 8;
            var actor = this._actor;
            var mpCost = actor ? actor.skillMpCost(skill) : 0;
            var tpCost = actor ? actor.skillTpCost(skill) : 0;
            if (mpCost > 0 || tpCost > 0) {
                textY += 24;
            }
            var spText = skill.spCost + ' SP';
            var textHeight = 24;
            // К общему сдвигу добавляем дополнительный сдвиг SP
            var drawX = baseX + spCostXOffset;
            this.changeTextColor(this.textColor(30));
            this.contents.drawText(spText, drawX, textY, iconSize, textHeight, 'center');
            this.resetTextColor();
        }
    };

    //=========================================================================
    // Scene_Battle – создание и обновление плашки SP
    //=========================================================================
    var _mogSP_SceneBattle_createSpriteset = Scene_Battle.prototype.createSpriteset;
    Scene_Battle.prototype.createSpriteset = function() {
        _mogSP_SceneBattle_createSpriteset.call(this);
        this.createSPLayout();
    };

    Scene_Battle.prototype.createSPLayout = function() {
        this._spLayoutSprite = new Sprite(ImageManager.loadBHud('SP_Layout'));
        this._spLayoutSprite.visible = false;
        if (!this._layoutField) {
            this._layoutField = new Sprite();
            this.addChild(this._layoutField);
        }
        this._layoutField.addChild(this._spLayoutSprite);

        this._spText = new Sprite(new Bitmap(100, 48));
        this._spText.bitmap.fontSize = spFontSize;
        this._spText.bitmap.outlineWidth = 4;
        this._spText.bitmap.fontBold = true;
        this._spText.visible = false;
        this._spLayoutSprite.addChild(this._spText);
    };

    var _mogSP_SceneBattle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _mogSP_SceneBattle_update.call(this);
        this.updateSPLayout();
    };

    Scene_Battle.prototype.updateSPLayout = function() {
        if (!this._spLayoutSprite) return;

        var skillWindow = this._skillWindow;
        var visible = false;

        if (skillWindow && skillWindow.visible && skillWindow.isOpenAndActive()) {
            visible = true;
        }

        this._spLayoutSprite.visible = visible;
        this._spText.visible = visible;

        if (visible) {
            var baseX = skillWindow.org[0];
            var baseY = skillWindow.org[1];

            this._spLayoutSprite.x = baseX + spLayoutX;
            this._spLayoutSprite.y = baseY + spLayoutY;

            this._spText.x = spTextX;
            this._spText.y = spTextY;

            var sp = $gameParty.sp();
            this._spText.bitmap.clear();
            this._spText.bitmap.drawText(sp, 0, 0, this._spText.bitmap.width, this._spText.bitmap.height, 'center');
        }
    };

    //=========================================================================
    // BattleManager – начальное SP в начале битвы
    //=========================================================================
    var _mogSP_BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        _mogSP_BattleManager_startBattle.call(this);
        $gameParty.setSp(initSP);
    };

})();
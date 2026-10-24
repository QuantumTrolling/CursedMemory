//=============================================================================
// A_SP_Mechanic.js
//=============================================================================
// Дополнение к MOG_BattleHud + Double Icon Skills:
// общие SP для отряда, плашка в окне навыков и стоимость SP под иконкой.
// Версия 2.4 – SP отображается только для указанных актёров
//=============================================================================

/*:
 * @plugindesc v2.4 SP для партии + плашка + стоимость под иконкой (ограничение по актёрам).
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
 * Параметр "Required Actor IDs" — список ID актёров (через запятую), для которых
 * работает система SP. Если в битве нет ни одного из них, SP не отображается
 * и навыки со стоимостью SP недоступны.
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
 * @param Required Actor IDs
 * @text ID актёров (через запятую)
 * @desc Список ID персонажей, для которых работает SP. Оставьте пустым, чтобы работало для всех.
 * @default 8,12,13,16
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
    var requiredActorIdsStr = parameters['Required Actor IDs'] || '8,12,13,16,17,18,19';
    var requiredActorIds = requiredActorIdsStr.split(',').map(function(id) {
        return parseInt(id.trim());
    }).filter(function(id) {
        return !isNaN(id) && id > 0;
    });

    //=========================================================================
    // Проверка, есть ли в текущей битве хотя бы один нужный актёр
    //=========================================================================
    function isSPAvailable() {
        if (requiredActorIds.length === 0) return true; // если список пуст — доступно всем
        var members = $gameParty.battleMembers();
        for (var i = 0; i < members.length; i++) {
            if (requiredActorIds.contains(members[i].actorId())) {
                return true;
            }
        }
        return false;
    }

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
        if (skill.spCost > 0 && isSPAvailable()) {
            $gameParty.gainSp(-skill.spCost);
        }
    };

    //=========================================================================
    // Window_BattleSkill – серые навыки при нехватке SP
    //=========================================================================
    var _mogSP_WindowBattleSkill_isEnabled = Window_BattleSkill.prototype.isEnabled;
    Window_BattleSkill.prototype.isEnabled = function(item) {
        if (!_mogSP_WindowBattleSkill_isEnabled.call(this, item)) return false;
        if (item && item.spCost > 0) {
            // Если нет нужных актёров или не хватает SP — навык недоступен
            if (!isSPAvailable() || $gameParty.sp() < item.spCost) {
                return false;
            }
        }
        return true;
    };

    //=========================================================================
    // Window_BattleSkill – сдвиг всех стоимостей (AP/EP + SP)
    //=========================================================================
    var _doubleIconSkills_drawSkillCost = Window_BattleSkill.prototype.drawSkillCost;
    Window_BattleSkill.prototype.drawSkillCost = function(skill, x, y, width) {
        var baseX = x + costXOffset;
        _doubleIconSkills_drawSkillCost.call(this, skill, baseX, y, width);

        // Показываем SP только если есть нужные актёры и стоимость > 0
        if (skill && skill.spCost > 0 && isSPAvailable()) {
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
            var drawX = baseX + spCostXOffset;
            this.changeTextColor(this.textColor(30));
            this.contents.drawText(spText, drawX, textY, iconSize, textHeight, 'center');
            this.resetTextColor();
        }
    };

    //=========================================================================
    // Scene_Battle – создание и обновление плашки SP (только для нужных актёров)
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
        // >>> NEW: anchor в центр, как у MP-цифр
        this._spText.anchor.x = 0.5;
        this._spText.anchor.y = 0.5;
        this._spLayoutSprite.addChild(this._spText);

        // >>> NEW: состояние анимации
        this._spAnimActive = false;
        this._spAnimFrame  = 0;
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

    if (skillWindow && skillWindow.visible && skillWindow.isOpenAndActive() && isSPAvailable()) {
        visible = true;
    }

    this._spLayoutSprite.visible = visible;
    this._spText.visible = visible;

    if (visible) {
        var baseX = skillWindow.org[0];
        var baseY = skillWindow.org[1];

        this._spLayoutSprite.x = baseX + spLayoutX;
        this._spLayoutSprite.y = baseY + spLayoutY;

        // >>> NEW: компенсация anchor 0.5 (сдвиг на половину размера битмапа)
        this._spText.x = spTextX + this._spText.bitmap.width  / 2;
        this._spText.y = spTextY + this._spText.bitmap.height / 2;

        var sp = $gameParty.sp();
        this._spText.bitmap.clear();
        this._spText.bitmap.drawText(sp, 0, 0,
            this._spText.bitmap.width, this._spText.bitmap.height, 'center');
    }

    // >>> NEW: анимация цифры SP
    this.updateSPTextAnimation(skillWindow);
};

//=========================================================================
// Анимация цифры SP (аналог update_mp_number_animation из MOG_BattleHud)
//=========================================================================
Scene_Battle.prototype.updateSPTextAnimation = function(skillWindow) {
    if (!this._spText) return;

    // --- Условия запуска: окно навыков активно + выбран навык со spCost ---
    var shouldAnimate = false;
    var skillItem = null;
    if (skillWindow && skillWindow.visible && skillWindow.active && isSPAvailable()) {
        var item = skillWindow.item();
        if (item && item.spCost && item.spCost > 0) {
            shouldAnimate = true;
            skillItem = item;
        }
    }

    if (shouldAnimate) {
        if (!this._spAnimActive) {
            this._spAnimActive = true;
            this._spAnimFrame  = 0;
        }
        this._spAnimFrame++;

        var shimmerPhase = this._spAnimFrame * 0.12;   // частота переливания
        var pulsePhase   = this._spAnimFrame * 0.10;   // частота пульса

        // ---- Переливание: цвет <-> белый (цвет зависит от достатка SP) ----
        var s = (Math.sin(shimmerPhase) + 1) / 2;

        var r, g, b;
        if (skillItem.spCost <= $gameParty.sp()) {
            // ХВАТАЕТ SP: зелёный (64,255,64) <-> белый (255,255,255)
            r = Math.floor(64 + 191 * s);
            g = 255;
            b = Math.floor(64 + 191 * s);
        } else {
            // НЕ ХВАТАЕТ SP: красный (255,64,64) <-> белый (255,255,255)
            r = 255;
            g = Math.floor(64 + 191 * s);
            b = Math.floor(64 + 191 * s);
        }
        var tint = (r << 16) | (g << 8) | b;

        // ---- Пульсация: прозрачность + размер ----
        var p     = (Math.sin(pulsePhase) + 1) / 2;
        var alpha = 0.70 + 0.30 * p;      // 0.70..1.00
        var scale = 0.94 + 0.12 * p;      // 0.94..1.06

        this._spText.tint    = tint;
        this._spText.opacity = Math.floor(255 * alpha);
        this._spText.scale.x = scale;
        this._spText.scale.y = scale;

    } else if (this._spAnimActive) {
        // ---- Возврат к нормальному виду ----
        this._spAnimActive = false;
        this._spAnimFrame  = 0;
        this._spText.tint    = 0xFFFFFF;
        this._spText.opacity = 255;
        this._spText.scale.x = 1;
        this._spText.scale.y = 1;
    }
};

    //=========================================================================
    // BattleManager – начальное SP в начале битвы
    //=========================================================================
var _mogSP_BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
    _mogSP_BattleManager_startBattle.call(this);

    // Не сбрасываем SP при переходе на новую волну последовательных битв.
    // Сбрасываем только при старте нового боя:
    // - _consBat отсутствует (плагин волн не установлен)  -> новый бой
    // - _consBat.index === 0                              -> первый бой в серии
    // При переходе на волну prepareConBat уже сделал index++,
    // поэтому здесь index > 0 и SP не трогаем.
    if (!$gameSystem._consBat || $gameSystem._consBat.index === 0) {
        $gameParty.setSp(initSP);
    }
};

})();
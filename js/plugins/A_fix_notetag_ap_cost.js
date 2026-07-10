//=============================================================================
// MP_Cost_Flat_State.js
//=============================================================================
/*:
 * @plugindesc v1.1 Состояния могут увеличивать стоимость MP навыков,
 *              но только тех, у которых она уже есть.
 * @author
 *
 * @help
 * Используйте в заметке состояния тег:
 * <MP Cost Flat: +x>
 * где x — целое число (может быть отрицательным).
 *
 * Пример:
 * <MP Cost Flat: +1>   — если навык тратит MP, его стоимость вырастет на 1.
 * <MP Cost Flat: -2>   — если навык тратит MP, его стоимость уменьшится на 2.
 *
 * Важно: если итоговая стоимость навыка до применения этого бонуса равна 0,
 * бонус НЕ применяется. Так бесплатные навыки остаются бесплатными.
 *
 * Плагин должен находиться НИЖЕ YEP_SkillCore в списке плагинов.
 */

var Imported = Imported || {};
Imported.MP_Cost_Flat_State = true;

(function() {

    // Загрузка тегов из состояний
    var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!Imported.MP_Cost_Flat_State) return true;
        processMPCostFlatNotetags($dataStates);
        return true;
    };

    function processMPCostFlatNotetags(group) {
        for (var i = 1; i < group.length; i++) {
            var obj = group[i];
            obj.mpCostFlat = 0;
            var notedata = obj.note.split(/[\r\n]+/);
            var regex = /<(?:MP COST FLAT):\s*([+\-]?\d+)>/i;
            for (var j = 0; j < notedata.length; j++) {
                var line = notedata[j];
                if (line.match(regex)) {
                    obj.mpCostFlat = parseInt(RegExp.$1);
                }
            }
        }
    }

    // Переопределяем расчёт стоимости MP
    Game_BattlerBase.prototype.skillMpCost = function(skill) {
        var cost = skill.mpCost;
        var item = skill;
        var a = this;
        var user = this;
        var subject = this;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        cost += this.mmp * skill.mpCostPer;

        var code = skill.mpCostEval;
        try {
            eval(code);
        } catch (e) {
            Yanfly.Util.displayError(e, code, 'SKILL CUSTOM MP COST ERROR');
        }

        // === Вот здесь главное изменение ===
        // Сохраняем стоимость до применения плоского бонуса
        var baseCost = cost;

        // Суммируем плоские бонусы от всех состояний
        var flatBonus = 0;
        var states = this.states();
        for (var i = 0; i < states.length; i++) {
            if (states[i].mpCostFlat) {
                flatBonus += states[i].mpCostFlat;
            }
        }

        // Добавляем бонус ТОЛЬКО если базовая стоимость навыка > 0
        if (baseCost > 0) {
            cost += flatBonus;
        }

        return Math.max(0, Math.floor(cost * this.mcr));
    };

})();
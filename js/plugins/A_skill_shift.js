/*:
 * @plugindesc v1.1 - Shift по навыку в бою → глоссарий (с условной логикой по актёру)
 * @author
 *
 * @param requireShiftHold
 * @text Требовать удержания Shift
 * @type boolean
 * @default false
 * @desc Если true — откроется по удержанию Shift (с дебаунсом). Если false — по одиночному нажатию.
 *
 * @help
 * Порядок плагинов:
 *   SceneGlossary.js
 *   MOG_BattleHud.js
 *   BattleGlossaryButton.js   (window.GlossaryOverlay = GlossaryOverlay;)
 *   A_fix_glossary_hover.js
 *   StateGlossaryClick.js
 *   TimingModeTwoIcons.js
 *   SkillGlossaryShift.js     (этот)
 *
 * ============================================================
 * СТАРЫЙ ФОРМАТ (для всех актёров одинаково):
 * ============================================================
 *   <glossaryItem:ID>         (обязательно)
 *   <glossaryDesc:X>          (опционально, по умолч. 1)
 *   <glossaryType:N>          (опционально, по умолч. 1)
 *   <glossaryCategory:Name>   (опционально)
 *
 * Пример в навыке:
 *   <glossaryItem:41>
 *   <glossaryDesc:2>
 *
 * ============================================================
 * НОВЫЙ ФОРМАТ (условия по ID актёра):
 * ============================================================
 *   <glossary:actorId|itemId|descNum|glossaryType|category>
 *
 * Все поля кроме actorId и itemId опциональны.
 * actorId = 0 → fallback для всех актёров без своей записи.
 *
 * Примеры:
 *   <glossary:8|68|3>             // актёр 8 → предмет 68, страница 3
 *   <glossary:9|67|2>             // актёр 9 → предмет 67, страница 2
 *   <glossary:8|68|3|2|Персонажи> // с типом 2 и категорией
 *   <glossary:0|65|1>             // fallback для остальных
 *
 * ============================================================
 * ПРИОРИТЕТ:
 * ============================================================
 *   1. <glossary:actorId|...> с точным actorId (активный актёр)
 *   2. <glossary:0|...>            (fallback нового формата)
 *   3. старые теги <glossaryItem:...>
 *
 * ============================================================
 * ВАЖНО:
 * ============================================================
 *   - Работает только в бою и только когда окно навыков активно.
 *   - Мобильные устройства не имеют Shift — нужно другое действие.
 */
(function() {
    'use strict';

    if (typeof Battle_Hud === 'undefined') {
        console.warn('[SGS] MOG_BattleHud.js не загружен.');
        return;
    }

    var params = PluginManager.parameters('SkillGlossaryShift');
    var REQUIRE_HOLD = String(params['requireShiftHold'] || 'false') === 'true';

    //=====================================================================
    // Парсинг нового формата <glossary:actorId|itemId|...>
    //=====================================================================
    function parseNewEntries(note) {
        var matches = note.match(/<glossary:[^>]+>/gi) || [];
        var entries = [];
        for (var i = 0; i < matches.length; i++) {
            // "<glossary:" = 10 символов, ">" = 1 символ
            var content = matches[i].slice(10, -1);
            var parts = content.split('|').map(function(s) { return s.trim(); });
            var actorId = parseInt(parts[0]);
            var itemId  = parseInt(parts[1]);
            if (isNaN(actorId) || isNaN(itemId)) continue;
            entries.push({
                actorId:      actorId,
                itemId:       itemId,
                pageNum:      (parts[2] && !isNaN(parseInt(parts[2]))) ? parseInt(parts[2]) : 1,
                glossaryType: (parts[3] && !isNaN(parseInt(parts[3]))) ? parseInt(parts[3]) : 1,
                category:     (parts[4] && parts[4].length > 0) ? parts[4] : null
            });
        }
        return entries;
    }

    //=====================================================================
    // Получение данных глоссария для навыка + актёра
    //=====================================================================
    function getSkillGlossaryData(skill, actorId) {
        if (!skill || !skill.note) return null;

        // --- 1. Новый формат ---
        var entries = parseNewEntries(skill.note);
        if (entries.length > 0) {
            // точное совпадение actorId
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].actorId === actorId) {
                    return makeData(skill, entries[i]);
                }
            }
            // fallback: actorId === 0
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].actorId === 0) {
                    return makeData(skill, entries[i]);
                }
            }
            // своя запись есть, но не для этого актёра и без fallback →
            // пробуем старый формат ниже (если он есть)
        }

        // --- 2. Старый формат ---
        var mItem = skill.note.match(/<glossaryItem:\s*(\d+)>/i);
        if (!mItem) return null;
        var mDesc = skill.note.match(/<glossaryDesc:\s*(\d+)>/i);
        var mType = skill.note.match(/<glossaryType:\s*(\d+)>/i);
        var mCat  = skill.note.match(/<glossaryCategory:\s*([^>\r\n]+)>/i);
        return {
            stateId:      -1,
            skillId:      skill.id,
            itemId:       Number(mItem[1]),
            pageNum:      mDesc ? Number(mDesc[1]) : 1,
            glossaryType: mType ? Number(mType[1]) : 1,
            category:     mCat  ? mCat[1].trim()      : null
        };
    }

    function makeData(skill, entry) {
        return {
            stateId:      -1,
            skillId:      skill.id,
            itemId:       entry.itemId,
            pageNum:      entry.pageNum,
            glossaryType: entry.glossaryType,
            category:     entry.category
        };
    }

    //=====================================================================
    // Проверка Shift с дебаунсом
    //=====================================================================
    var _shiftLocked = false;

    function isShiftTriggered() {
        if (REQUIRE_HOLD) {
            if (Input.isPressed('shift') && !_shiftLocked) {
                _shiftLocked = true;
                return true;
            }
            if (!Input.isPressed('shift')) _shiftLocked = false;
            return false;
        }
        return Input.isTriggered('shift');
    }

    //=====================================================================
    // Патч Window_BattleSkill.update
    //=====================================================================
    var _WBS_update = Window_BattleSkill.prototype.update;

    Window_BattleSkill.prototype.update = function() {
        _WBS_update.call(this);

        // Только когда окно активно и видимо
        if (!this.active || !this.visible) return;
        if (this._canReceiveInput === false) return;

        if (!isShiftTriggered()) return;

        var scene = SceneManager._scene;
        if (!(scene instanceof Scene_Battle)) return;
        if (scene._glossaryActive) return;
        if (scene._glossaryCancelBlock > 0) return;
        if (scene._stateGlossarySkipTouch > 0) return;
        if ($gameMessage.isBusy()) return;

        var skill = this.item();
        if (!skill) return;

        // Актёр, для которого открыто окно навыков
        var actorId = (this._actor && this._actor._actorId)
                   || (BattleManager.actor() && BattleManager.actor()._actorId)
                   || 0;

        var data = getSkillGlossaryData(skill, actorId);
        if (!data) return;

        var hud = scene._battle_hud && scene._battle_hud[0];
        if (!hud || typeof hud.openGlossaryForState !== 'function') return;

        console.log('[SGS] Shift на навыке "' + skill.name +
                    '" (actor=' + actorId + ') → item ' + data.itemId +
                    ', page ' + data.pageNum);

        hud.openGlossaryForState(scene, data);
    };

})();
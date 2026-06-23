//=============================================================================
// GlossaryUXFix.js
//=============================================================================
// Версия: 2.8
// Исправлено: термины с \N[1] теперь корректно меняют цвет и не ломаются
//=============================================================================

/*:
 * @plugindesc v2.8 Глоссарий: фиксация описания, цвет 6, без артефактов
 * @author You
 *
 * @help
 * Плагин модифицирует сцену SceneGlossary:
 *   1. После выбора категории список терминов активен, курсор скрыт, описание пусто.
 *   2. Наведение мыши/клавиш показывает курсор, но не фиксирует описание.
 *   3. Клик (ЛКМ или Enter) фиксирует описание, имя становится жёлтым (цвет 6).
 *   4. При открытом описании можно наводиться на другие термины, описание не меняется до клика.
 *   5. Клик по другому термину обновляет описание и подсветку.
 *   6. Кнопка Cancel (Esc / ПКМ) при открытом описании сразу возвращает к выбору категорий.
 *   7. Полная совместимость с управляющими символами (\N[1] и др.).
 *
 * Порядок плагинов в менеджере:
 *   SDJB_MouseHover
 *   SceneGlossary
 *   SceneGlossaryTabs (если есть)
 *   GlossaryUXFix (этот)
 */

(function() {
    'use strict';

    if (typeof Scene_Glossary === 'undefined') {
        console.warn('GlossaryUXFix: Scene_Glossary не найден. Плагин не активирован.');
        return;
    }

    //=========================================================================
    // ВНУТРЕННИЙ ФЛАГ СКРЫТИЯ КУРСОРА (только визуально)
    //=========================================================================
    Window_GlossaryList.prototype._cursorHidden = false;

    var _Window_GlossaryList__updateCursor = Window_GlossaryList.prototype._updateCursor;
    Window_GlossaryList.prototype._updateCursor = function() {
        if (this._cursorHidden) {
            this.setCursorRect(0, 0, 0, 0);
            return;
        }
        _Window_GlossaryList__updateCursor.call(this);
    };

    //=========================================================================
    // ВСЕГДА УСТАНАВЛИВАЕМ ОБРАБОТЧИК 'ok' (независимо от SelectAction)
    //=========================================================================
    var _Window_GlossaryList_setItemHandler = Window_GlossaryList.prototype.setItemHandler;
    Window_GlossaryList.prototype.setItemHandler = function(handler) {
        this.setHandler('ok', handler);
    };

    //=========================================================================
    // ПЕРЕОПРЕДЕЛЕНИЕ select: ТОЛЬКО ВЫДЕЛЕНИЕ, БЕЗ ПОКАЗА ОПИСАНИЯ
    //=========================================================================
    var _Window_GlossaryList_select = Window_GlossaryList.prototype.select;
    Window_GlossaryList.prototype.select = function(index) {
        if (this._cursorHidden && index >= 0) {
            this._cursorHidden = false;
        }
        Window_Selectable.prototype.select.call(this, index);
        if (index >= 0) {
            $gameParty.setGlossaryListIndex(index);
        }
    };

    //=========================================================================
    // ПРИ ВЫБОРЕ КАТЕГОРИИ: курсор скрыт, описание скрыто, выбран первый (0)
    //=========================================================================
    var _Scene_Glossary_onOkGlossaryCategory = Scene_Glossary.prototype.onOkGlossaryCategory;
    Scene_Glossary.prototype.onOkGlossaryCategory = function() {
        _Scene_Glossary_onOkGlossaryCategory.call(this);
        this._selectedItemForColor = null;
        this._glossaryListWindow._cursorHidden = true;
        this._glossaryListWindow.select(0);
        if (this._glossaryWindow) {
            this._glossaryWindow.clearItem();
        }
    };

    //=========================================================================
    // КЛИК ПО ТЕРМИНУ: фиксация описания, имя становится жёлтым (цвет 6)
    //=========================================================================
    var _Scene_Glossary_onOkGlossaryList = Scene_Glossary.prototype.onOkGlossaryList;
    Scene_Glossary.prototype.onOkGlossaryList = function() {
        var item = this.item();
        if (item) {
            if (this._selectedItemForColor && this._selectedItemForColor !== item) {
                $gameParty.setConfirmedGlossaryItem(this._selectedItemForColor);
            }
            this._selectedItemForColor = item;
            $gameParty.setConfirmedGlossaryItem(item);

            // Показываем описание
            this._glossaryWindow.refreshPage(item, this._glossaryListWindow.index());
            // Курсор теперь видим
            this._glossaryListWindow._cursorHidden = false;
        }

        // Активируем список (этот метод сам вызовет refresh() и обновит цвета)
        this.activateListWindow(false);
    };

    //=========================================================================
    // НАЖАТИЕ CANCEL В СПИСКЕ ТЕРМИНОВ
    //=========================================================================
    var _Scene_Glossary_onCancelGlossaryList = Scene_Glossary.prototype.onCancelGlossaryList;
    Scene_Glossary.prototype.onCancelGlossaryList = function() {
        // Если описание открыто — скрываем и сразу возвращаемся к категориям
        if (this._glossaryWindow && this._glossaryWindow._itemData) {
            this._glossaryWindow.clearItem();
            this._selectedItemForColor = null;
            this._glossaryListWindow._cursorHidden = true;
            this._glossaryListWindow.select(0);
            this._glossaryListWindow.refresh();
        }
        // Возврат к категориям (или выход)
        _Scene_Glossary_onCancelGlossaryList.call(this);
    };

    //=========================================================================
    // ПОДСВЕТКА ИМЕНИ: жёлтый (6) для зафиксированного, обычный для остальных
    // (оранжевый «новый» цвет полностью отключён)
    //=========================================================================
    var _Window_GlossaryList_getGlossaryColorIndex = Window_GlossaryList.prototype.getGlossaryColorIndex;
    Window_GlossaryList.prototype.getGlossaryColorIndex = function(item) {
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Glossary && scene._selectedItemForColor === item) {
            return 6; // Жёлтый
        }
        // Всегда возвращаем 0, игнорируя стандартную логику новых терминов
        return 0;
    };
	
    //=========================================================================
    // ПРИНУДИТЕЛЬНАЯ ПЕРЕРИСОВКА ИМЕНИ В ЖЁЛТЫЙ ДЛЯ ТЕРМИНОВ С УПРАВЛЯЮЩИМИ СИМВОЛАМИ
    //=========================================================================
    var _Window_GlossaryList_drawItemName = Window_GlossaryList.prototype.drawItemName;
    Window_GlossaryList.prototype.drawItemName = function(item, x, y, width) {
        _Window_GlossaryList_drawItemName.call(this, item, x, y, width);
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Glossary && scene._selectedItemForColor === item) {
            var iconScale = parseFloat(PluginManager.parameters('SceneGlossary')['IconScale']) || 1.0;
            var iconBoxWidth = this.isShowIcon(item) ? Window_Base._iconWidth * iconScale + 4 : 0;
            // Конвертируем управляющие символы (\N[1] и т.д.)
            var text = item.name;
            text = this.convertEscapeCharacters(text);
            // Очищаем область имени и рисуем заново жёлтым
            this.contents.clearRect(x + iconBoxWidth, y, width - iconBoxWidth, this.lineHeight());
            this.changeTextColor(this.textColor(6));
            this.drawText(text, x + iconBoxWidth, y, width - iconBoxWidth, 'left');
            this.resetTextColor();
        }
    };

    //=========================================================================
    // ОЧИСТКА ОКНА ОПИСАНИЯ (скрываем табы)
    //=========================================================================
    var _Window_Glossary_clearItem = Window_Glossary.prototype.clearItem;
    Window_Glossary.prototype.clearItem = function() {
        _Window_Glossary_clearItem.call(this);
        this._itemData = null;
        this._maxPages = 1;
        this._pageIndex = 0;
        if (this.contents) {
            this.contents.clear();
        }
    };

    console.log('GlossaryUXFix v2.8 успешно применён.');

})();
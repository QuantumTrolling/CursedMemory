//=============================================================================
// BattleGlossaryUXFix.js
//=============================================================================
// Версия: 1.0
// Обеспечивает совместимость GlossaryUXFix с BattleGlossaryButton
//=============================================================================

/*:
 * @plugindesc v1.0 Боевой глоссарий: поддержка UX-фикса (скрытое описание, фиксация)
 * @author You
 *
 * @help
 * Поместите ПОСЛЕ BattleGlossaryButton.js и GlossaryUXFix.js.
 * Добавляет в боевой оверлей глоссария поведение:
 *   - после выбора категории список без выделения, описание скрыто
 *   - наведение/стрелки – курсор виден, но описание не меняется
 *   - клик фиксирует описание и окрашивает имя в жёлтый (цвет 6)
 *   - Cancel сразу возвращает к категориям (а не скрывает только описание)
 *
 * Порядок плагинов:
 *   SDJB_MouseHover
 *   SceneGlossary
 *   SceneGlossaryTabs (если есть)
 *   BattleGlossaryButton
 *   GlossaryUXFix
 *   BattleGlossaryUXFix (этот)
 */

(function() {
    'use strict';

    if (typeof GlossaryOverlay === 'undefined') return;

    // Добавляем свойства для хранения состояния в оверлей
    GlossaryOverlay.prototype._selectedItemForColor = null;
    GlossaryOverlay.prototype._glossaryDescriptionLocked = false;

    // При создании окон сразу применяем скрытый курсор
    var _GlossaryOverlay_createWindows = GlossaryOverlay.prototype.createWindows;
    GlossaryOverlay.prototype.createWindows = function() {
        _GlossaryOverlay_createWindows.call(this);
        // Включаем скрытый курсор для списка
        this._windows.list._cursorHidden = false; // будет скрыт при входе в категорию
    };

    // Показ оверлея
    var _GlossaryOverlay_show = GlossaryOverlay.prototype.show;
    GlossaryOverlay.prototype.show = function(type) {
        _GlossaryOverlay_show.call(this, type);
        // После стандартного показа применяем UX-логику
        if ($gameParty.isUseGlossaryCategory()) {
            this._glossaryDescriptionLocked = true; // заблокируем описание
            this._selectedItemForColor = null;
            this._windows.list._cursorHidden = true;
            this._windows.list.select(-1); // ничего не выбрано
            if (this._windows.glossary) this._windows.glossary.clearItem();
        }
    };

    // При выборе категории – активируем список, но без выделения
    var _GlossaryOverlay_onOkCategory = GlossaryOverlay.prototype.onOkCategory;
    GlossaryOverlay.prototype.onOkCategory = function() {
        _GlossaryOverlay_onOkCategory.call(this);
        // Применяем UX: скрываем описание, снимаем выделение
        this._glossaryDescriptionLocked = true;
        this._selectedItemForColor = null;
        this._windows.list._cursorHidden = true;
        this._windows.list.select(-1);
        if (this._windows.glossary) this._windows.glossary.clearItem();
    };

    // Клик по термину в списке
    var _GlossaryOverlay_onOkList = GlossaryOverlay.prototype.onOkList;
    GlossaryOverlay.prototype.onOkList = function() {
        var item = this._windows.list.item();
        if (item) {
            // Снимаем фиксацию с предыдущего
            if (this._selectedItemForColor && this._selectedItemForColor !== item) {
                $gameParty.setConfirmedGlossaryItem(this._selectedItemForColor);
            }
            this._selectedItemForColor = item;
            $gameParty.setConfirmedGlossaryItem(item);

            this._glossaryDescriptionLocked = true;
            // Показываем описание
            this._windows.glossary.refreshPage(item, this._windows.list.index());
            this._windows.list._cursorHidden = false;
            this._windows.list.refresh(); // обновляем цвета
        }
        // Затем вызываем оригинал (если нужно подтверждение или другое)
        _GlossaryOverlay_onOkList.call(this);
    };

    // Отмена в списке – теперь сразу возвращает к категориям, если описание открыто
    var _GlossaryOverlay_onCancelList = GlossaryOverlay.prototype.onCancelList;
    GlossaryOverlay.prototype.onCancelList = function() {
        if (this._glossaryDescriptionLocked && this._windows.glossary._itemData) {
            // Скрываем описание и сбрасываем состояние
            this._windows.glossary.clearItem();
            this._glossaryDescriptionLocked = false;
            this._selectedItemForColor = null;
            this._windows.list._cursorHidden = true;
            this._windows.list.select(-1);
            this._windows.list.refresh();
            // Переходим обратно к категориям (если категории используются)
            if ($gameParty.isUseGlossaryCategory()) {
                this.activateCategoryWindow(false);
                return;
            }
        }
        _GlossaryOverlay_onCancelList.call(this);
    };

    // Отмена в категориях – просто скрываем оверлей
    var _GlossaryOverlay_onCancelCategory = GlossaryOverlay.prototype.onCancelCategory;
    GlossaryOverlay.prototype.onCancelCategory = function() {
        this.hide();
    };

    // При подтверждении использования или отмене – сбрасываем состояние
    var _GlossaryOverlay_onConfirmUse = GlossaryOverlay.prototype.onConfirmUse;
    GlossaryOverlay.prototype.onConfirmUse = function() {
        _GlossaryOverlay_onConfirmUse.call(this);
        this._glossaryDescriptionLocked = false;
        this._selectedItemForColor = null;
        this._windows.list._cursorHidden = true;
    };
    var _GlossaryOverlay_onConfirmCancel = GlossaryOverlay.prototype.onConfirmCancel;
    GlossaryOverlay.prototype.onConfirmCancel = function() {
        _GlossaryOverlay_onConfirmCancel.call(this);
        this._glossaryDescriptionLocked = false;
        this._selectedItemForColor = null;
        this._windows.list._cursorHidden = true;
    };

    // Подсветка имени в списке для оверлея (используем Scene_Battle._glossaryOverlay)
    var _Window_GlossaryList_getGlossaryColorIndex = Window_GlossaryList.prototype.getGlossaryColorIndex;
    Window_GlossaryList.prototype.getGlossaryColorIndex = function(item) {
        var battle = SceneManager._scene;
        if (battle instanceof Scene_Battle && battle._glossaryOverlay) {
            var overlay = battle._glossaryOverlay;
            if (overlay._selectedItemForColor === item) {
                return 6; // Жёлтый
            }
            return 0; // Отключаем оранжевый
        }
        // Иначе стандартное поведение (для сцены глоссария уже переопределено в UX фиксе)
        return _Window_GlossaryList_getGlossaryColorIndex.call(this, item);
    };

    // Скрытие курсора в списке должно обновляться через _updateCursor
    // Уже переопределено в GlossaryUXFix, работает глобально, так что ок.
})();
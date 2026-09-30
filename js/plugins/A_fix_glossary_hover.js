//=============================================================================
// A_fix_glossary_hover.js (GlossaryUXFix v5.2 DEBUG)
// Добавлен перехват onCancelList для боевого оверлея.
// Добавлена кнопка закрытия (img/pictures/close.png) в правом верхнем углу.
//=============================================================================

/*:
 * @plugindesc GlossaryUXFix — исправление UX для Scene_Glossary (Triacontane) + кнопка закрытия.
 * @author
 *
 * @param closeBtnImage
 * @text Файл кнопки закрытия
 * @desc Имя файла из img/pictures/ (без расширения).
 * @default close
 *
 * @param closeBtnMarginRight
 * @text Отступ кнопки закрытия справа
 * @type number
 * @default 20
 *
 * @param closeBtnMarginTop
 * @text Отступ кнопки закрытия сверху
 * @type number
 * @default 20
 *
 * @param closeBtnScale
 * @text Масштаб кнопки закрытия
 * @type number
 * @decimals 2
 * @default 1
 *
 * @help
 * Плагин-патч для SceneGlossary (Triacontane).
 * Добавляет поведение, при котором описание в правой части
 * не подгружается при простом наведении — только по клику.
 *
 * В правом верхнем углу отображается кнопка закрытия (img/pictures/close.png).
 * ЛКМ по ней = нажатие ESC (выход из сцены глоссария).
 */

var Imported = Imported || {};
Imported.GlossaryUXFix = true;

(function() {
    'use strict';

    if (typeof Scene_Glossary === 'undefined') {
        console.warn('GlossaryUXFix: Scene_Glossary не найден.');
        return;
    }

    var parameters = PluginManager.parameters('A_fix_glossary_hover');
    var CLOSE_IMG          = String(parameters['closeBtnImage'] || 'close');
    var CLOSE_MARGIN_RIGHT = Number(parameters['closeBtnMarginRight'] || 1195);
    var CLOSE_MARGIN_TOP   = Number(parameters['closeBtnMarginTop'] || 635);
    var CLOSE_SCALE        = Number(parameters['closeBtnScale'] || 1);

    var DEBUG = true;
    function log() { if (DEBUG) console.log.apply(console, arguments); }
    log('[UXFix v5.2] Старт диагностики...');

    //=========================================================================
    // Расширение прототипа GlossaryOverlay
    //=========================================================================
    var _battleOverlayExtended = false;

    function extendBattleOverlayPrototype(scene) {
        if (_battleOverlayExtended) return;
        if (!scene._glossaryOverlay) return;
        var proto = Object.getPrototypeOf(scene._glossaryOverlay);
        if (!proto || proto._glossaryUXExtended) return;

        // === onCancelList (ПКМ в списке терминов) ===
        var _onCancelList = proto.onCancelList;
        proto.onCancelList = function() {
            log('[BO:onCancelList] Вызван, locked=' + this._glossaryDescriptionLocked);
            // Если описание было открыто, принудительно очищаем
            if (this._glossaryDescriptionLocked && this._windows && this._windows.glossary && this._windows.glossary._itemData) {
                this._windows.glossary.clearItem();
                this._windows.glossary.contents.clear();
                this._windows.glossary._itemData = null;
                log('[BO:onCancelList] Описание очищено принудительно');
            }
            this._glossaryDescriptionLocked = false;
            this._selectedItemForColor = null;
            if (this._windows && this._windows.list) {
                this._windows.list._cursorHidden = true;
                this._windows.list.select(-1);
                this._windows.list.refresh();
            }
            _onCancelList.call(this);
        };

        // === onCancelCategory (ПКМ на уровне категорий) ===
        var _onCancelCategory = proto.onCancelCategory;
        proto.onCancelCategory = function() {
            log('[BO:onCancelCategory] Вызван');
            if (this._windows && this._windows.glossary) {
                this._windows.glossary.clearItem();
                this._windows.glossary.contents.clear();
                this._windows.glossary._itemData = null;
                log('[BO:onCancelCategory] Описание очищено принудительно');
            }
            this._glossaryDescriptionLocked = false;
            this._selectedItemForColor = null;
            _onCancelCategory.call(this);
        };

        // === onOkCategory ===
        var _onOkCategory = proto.onOkCategory;
        proto.onOkCategory = function() {
            log('[BO:onOkCategory] Вызван');
            this._glossaryDescriptionLocked = true;
            this._selectedItemForColor = null;
            if (this._windows.list) {
                this._windows.list._cursorHidden = true;
                this._windows.list.select(-1);
            }
            if (this._windows.glossary) this._windows.glossary.clearItem();
            _onOkCategory.call(this);
            if (this._windows.list) {
                this._windows.list._cursorHidden = true;
                this._windows.list.select(-1);
            }
            if (this._windows.glossary) this._windows.glossary.clearItem();
            log('[BO:onOkCategory] Завершён');
        };

        // === activateListWindow ===
        var _activateListWindow = proto.activateListWindow;
        proto.activateListWindow = function(resetIndex) {
            log('[BO:activateListWindow] resetIndex=' + resetIndex);
            if (resetIndex) {
                this._glossaryDescriptionLocked = true;
                this._selectedItemForColor = null;
                if (this._windows.list) {
                    this._windows.list._cursorHidden = true;
                }
            }
            _activateListWindow.call(this, resetIndex);
            if (resetIndex) {
                if (this._windows.list) {
                    this._windows.list.select(-1);
                    this._windows.list._cursorHidden = true;
                }
                if (this._windows.glossary) {
                    this._windows.glossary.clearItem();
                    log('[BO:activateListWindow] clearItem вызван');
                }
            }
        };

        // === hide ===
        var _hide = proto.hide;
        proto.hide = function() {
            log('[BO:hide] Вызван');
            if (this._windows && this._windows.glossary) {
                this._windows.glossary.clearItem();
                this._windows.glossary.contents.clear();
                this._windows.glossary._itemData = null;
            }
            _hide.call(this);
        };

        proto._glossaryUXExtended = true;
        _battleOverlayExtended = true;
        log('[BO] Прототип GlossaryOverlay расширен (включая onCancelList)');
    }

    //=========================================================================
    // Инициализация состояния боевого оверлея
    //=========================================================================
    function ensureBattleOverlayState(scene) {
        if (!(scene instanceof Scene_Battle)) return false;
        var overlay = scene._glossaryOverlay;
        if (!overlay) return true;
        extendBattleOverlayPrototype(scene);
        if (overlay._glossaryDescriptionLocked === undefined) {
            overlay._glossaryDescriptionLocked = true;
            overlay._selectedItemForColor = null;
            if (overlay._windows && overlay._windows.glossary) {
                overlay._windows.glossary.clearItem();
                overlay._windows.glossary.contents.clear();
                log('[BO:init] Описание очищено при инициализации');
            }
        }
        return overlay._glossaryDescriptionLocked;
    }

    //=========================================================================
    // Скрытие курсора
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
    // Обработчик 'ok' всегда ставится
    //=========================================================================
    var _Window_GlossaryList_setItemHandler = Window_GlossaryList.prototype.setItemHandler;
    Window_GlossaryList.prototype.setItemHandler = function(handler) {
        this.setHandler('ok', handler);
    };

    //=========================================================================
    // select: блокируем описание, если оно зафиксировано
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

        var locked = false;
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Glossary) {
            locked = scene._glossaryDescriptionLocked || false;
        } else if (scene instanceof Scene_Battle) {
            locked = ensureBattleOverlayState(scene);
        } else {
            locked = true;
        }

        if (!locked) {
            if (this.item() && this._glossaryWindow) {
                this._glossaryWindow.refreshPage(this.item(), this.index());
            } else if (!this.item() && this._glossaryWindow) {
                this._glossaryWindow.clearItem();
            }
        }
    };

    //=========================================================================
    // onTouch: раздельное поведение
    //=========================================================================
    var _Window_GlossaryList_onTouch = Window_GlossaryList.prototype.onTouch;
    Window_GlossaryList.prototype.onTouch = function(triggered) {
        var hitIndex = this.hitTest(TouchInput.x, TouchInput.y);
        if (hitIndex >= 0) {
            this.select(hitIndex);

            var scene = SceneManager._scene;
            var isBattle = scene instanceof Scene_Battle;
            var locked = false;
            if (scene instanceof Scene_Glossary) {
                locked = scene._glossaryDescriptionLocked || false;
            } else if (isBattle) {
                locked = ensureBattleOverlayState(scene);
            } else {
                locked = true;
            }

            if (triggered && isBattle && locked) {
                var item = this.item();
                if (item && this._glossaryWindow) {
                    var overlay = scene._glossaryOverlay;
                    overlay._selectedItemForColor = item;
                    this._glossaryWindow.refreshPage(item, this.index());
                    this.refresh();
                    overlay._glossaryDescriptionLocked = true;
                    this._cursorHidden = false;
                }
            } else if (triggered && !isBattle && locked) {
                this.processOk();
            } else if (triggered && !locked) {
                this.processOk();
            } else if (!triggered && !locked) {
                if (!isBattle) this.processOk();
            }
        }
    };

    //=========================================================================
    // СЦЕНА ГЛОССАРИЯ (обычная)
    //=========================================================================
    Scene_Glossary.prototype._selectedItemForColor = null;
    Scene_Glossary.prototype._glossaryDescriptionLocked = false;

    var _Scene_Glossary_activateListWindow = Scene_Glossary.prototype.activateListWindow;
    Scene_Glossary.prototype.activateListWindow = function(resetIndex) {
        if (resetIndex) {
            this._glossaryDescriptionLocked = true;
            this._selectedItemForColor = null;
            this._glossaryListWindow._cursorHidden = true;
        }
        _Scene_Glossary_activateListWindow.call(this, resetIndex);
        if (resetIndex) {
            this._glossaryListWindow.select(-1);
            this._glossaryListWindow._cursorHidden = true;
            if (this._glossaryWindow) this._glossaryWindow.clearItem();
        }
    };

    var _Scene_Glossary_onOkGlossaryCategory = Scene_Glossary.prototype.onOkGlossaryCategory;
    Scene_Glossary.prototype.onOkGlossaryCategory = function() {
        this._glossaryDescriptionLocked = true;
        _Scene_Glossary_onOkGlossaryCategory.call(this);
        this._selectedItemForColor = null;
        this._glossaryListWindow._cursorHidden = true;
        this._glossaryListWindow.select(-1);
        if (this._glossaryWindow) this._glossaryWindow.clearItem();
    };

    var _Scene_Glossary_onOkGlossaryList = Scene_Glossary.prototype.onOkGlossaryList;
    Scene_Glossary.prototype.onOkGlossaryList = function() {
        var item = this.item();
        if (item) {
            if (this._selectedItemForColor && this._selectedItemForColor !== item) {
                $gameParty.setConfirmedGlossaryItem(this._selectedItemForColor);
            }
            this._selectedItemForColor = item;
            $gameParty.setConfirmedGlossaryItem(item);
            this._glossaryDescriptionLocked = true;
            this._glossaryWindow.refreshPage(item, this._glossaryListWindow.index());
            this._glossaryListWindow._cursorHidden = false;
        }
        this.activateListWindow(false);
    };

    var _Scene_Glossary_onCancelGlossaryList = Scene_Glossary.prototype.onCancelGlossaryList;
    Scene_Glossary.prototype.onCancelGlossaryList = function() {
        if (this._glossaryWindow && this._glossaryWindow._itemData) {
            this._glossaryWindow.clearItem();
            this._selectedItemForColor = null;
            this._glossaryDescriptionLocked = false;
            this._glossaryListWindow._cursorHidden = true;
            this._glossaryListWindow.select(-1);
            this._glossaryListWindow.refresh();
        }
        _Scene_Glossary_onCancelGlossaryList.call(this);
    };

    //=========================================================================
    // ЦВЕТ ИМЕНИ
    //=========================================================================
    var _Window_GlossaryList_getGlossaryColorIndex = Window_GlossaryList.prototype.getGlossaryColorIndex;
    Window_GlossaryList.prototype.getGlossaryColorIndex = function(item) {
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Glossary && scene._selectedItemForColor === item) return 6;
        if (scene instanceof Scene_Battle && scene._glossaryOverlay && scene._glossaryOverlay._selectedItemForColor === item) return 6;
        return 0;
    };

    var _Window_GlossaryList_drawItemName = Window_GlossaryList.prototype.drawItemName;
    Window_GlossaryList.prototype.drawItemName = function(item, x, y, width) {
        _Window_GlossaryList_drawItemName.call(this, item, x, y, width);
        var scene = SceneManager._scene;
        var selected = null;
        if (scene instanceof Scene_Glossary) {
            selected = scene._selectedItemForColor;
        } else if (scene instanceof Scene_Battle && scene._glossaryOverlay) {
            selected = scene._glossaryOverlay._selectedItemForColor;
        }
        if (selected === item) {
            var iconScale = parseFloat(PluginManager.parameters('SceneGlossary')['IconScale']) || 1.0;
            var iconBoxWidth = this.isShowIcon(item) ? Window_Base._iconWidth * iconScale + 4 : 0;
            var text = item.name;
            text = this.convertEscapeCharacters(text);
            this.contents.clearRect(x + iconBoxWidth, y, width - iconBoxWidth, this.lineHeight());
            this.changeTextColor(this.textColor(6));
            this.drawText(text, x + iconBoxWidth, y, width - iconBoxWidth, 'left');
            this.resetTextColor();
        }
    };

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

    //=========================================================================
    // Кнопка закрытия (аналог ESC) в правом верхнем углу — Scene_Glossary
    //=========================================================================

    var _Scene_Glossary_create_uxfix = Scene_Glossary.prototype.create;
    Scene_Glossary.prototype.create = function() {
        _Scene_Glossary_create_uxfix.call(this);
        this.createCloseButton();
    };

    Scene_Glossary.prototype.createCloseButton = function() {
        var bmp = ImageManager.loadPicture(CLOSE_IMG);
        this._closeButton = new Sprite(bmp);
        this._closeButton.scale.x = CLOSE_SCALE;
        this._closeButton.scale.y = CLOSE_SCALE;
        this._closeButton.opacity = 255;
        this._closeBtnHovered = false;
        // Авто-позиция в правом верхнем углу — пересчитывается в update(),
        // пока картинка не загружена.
        this.addChild(this._closeButton);
    };

    Scene_Glossary.prototype.isCloseButtonTouched = function() {
        var s = this._closeButton;
        if (!s || !s.visible || !s.bitmap || !s.bitmap.isReady()) return false;
        var local = s.worldTransform.applyInverse({ x: TouchInput.x, y: TouchInput.y });
        return local.x >= 0 && local.y >= 0 &&
               local.x < s.width && local.y < s.height;
    };

    Scene_Glossary.prototype.updateCloseButton = function() {
        var s = this._closeButton;
        if (!s || !s.bitmap) return false;

        // Пересчёт позиции в правом верхнем углу
        if (s.bitmap.isReady()) {
            var w = s.bitmap.width * CLOSE_SCALE;
            var h = s.bitmap.height * CLOSE_SCALE;
            s.x = Graphics.boxWidth - w - CLOSE_MARGIN_RIGHT;
            s.y = CLOSE_MARGIN_TOP;
        }

        // Лёгкая подсветка при наведении
        var hovered = this.isCloseButtonTouched();
        if (hovered !== this._closeBtnHovered) {
            this._closeBtnHovered = hovered;
            s.opacity = hovered ? 200 : 255;
        }

        // Клик = ESC
        if (TouchInput.isTriggered() && hovered) {
            this.onCloseButtonClick();
            return true;
        }
        return false;
    };

    Scene_Glossary.prototype.onCloseButtonClick = function() {
        SoundManager.playCancel();
        // Эквивалент ESC на верхнем уровне сцены: выходим из неё.
        // Если хочется повторять поведение ESC «на один уровень назад»
        // (например, из списка в категории) — замените на:
        // if (this._glossaryCategoryWindow && this._glossaryCategoryWindow.active) this.escapeScene();
        // else this.onCancelGlossaryList();
        this.popScene();
    };

    var _Scene_Glossary_update_uxfix = Scene_Glossary.prototype.update;
    Scene_Glossary.prototype.update = function() {
        _Scene_Glossary_update_uxfix.call(this);
        this.updateCloseButton();
    };

    var _Scene_Glossary_terminate_uxfix = Scene_Glossary.prototype.terminate;
    Scene_Glossary.prototype.terminate = function() {
        if (this._closeButton) {
            this.removeChild(this._closeButton);
            this._closeButton = null;
        }
        _Scene_Glossary_terminate_uxfix.call(this);
    };

    log('[UXFix v5.2] Инициализация завершена.');
})();
//=============================================================================
// A_fix_glossary_hover.js (GlossaryUXFix v5.1 DEBUG)
// Добавлен перехват onCancelList для боевого оверлея.
//=============================================================================

var Imported = Imported || {};
Imported.GlossaryUXFix = true;

(function() {
    'use strict';

    if (typeof Scene_Glossary === 'undefined') {
        console.warn('GlossaryUXFix: Scene_Glossary не найден.');
        return;
    }

    var DEBUG = true;
    function log() { if (DEBUG) console.log.apply(console, arguments); }
    log('[UXFix v5.1] Старт диагностики...');

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

    log('[UXFix v5.1] Инициализация завершена.');
})();
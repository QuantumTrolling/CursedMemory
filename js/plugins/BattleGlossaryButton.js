/*:
 * @plugindesc v2.7.11 Глоссарий поверх боя (кнопка скрыта при выборе цели + close-кнопка)
 * @author ВашеИмя
 *
 * @param Button Image
 * @text Изображение кнопки
 * @desc Имя файла в img/pictures/ (без .png)
 * @default
 *
 * @param Button X
 * @text Координата X
 * @type number
 * @default 0
 *
 * @param Button Y
 * @text Координата Y
 * @type number
 * @default 0
 *
 * @param Close Button Image
 * @text Файл кнопки закрытия
 * @desc Имя файла из img/pictures/ (без расширения).
 * @default close
 *
 * @param Close Button Margin Right
 * @text Отступ кнопки закрытия справа
 * @type number
 * @default 20
 *
 * @param Close Button Margin Top
 * @text Отступ кнопки закрытия сверху
 * @type number
 * @default 20
 *
 * @param Close Button Scale
 * @text Масштаб кнопки закрытия
 * @type number
 * @decimals 2
 * @default 1
 *
 * @help
 * Поместите ПОСЛЕ SceneGlossary.js и всех боевых плагинов.
 * Кнопка в бою открывает глоссарий как оверлей.
 * Esc / ПКМ = назад; меню, CTB и MOG-Layouts скрываются.
 * При открытом глоссарии ввод в бой полностью блокируется.
 * Если активно окно выбора цели (врага или союзника), кнопка
 * глоссария автоматически скрывается.
 *
 * В правом верхнем углу оверлея глоссария отображается кнопка закрытия
 * (img/pictures/close.png). ЛКМ по ней = нажатие ESC в оверлее:
 * если активно окно подтверждения — отменяет его, если список — возвращает
 * к категориям (или закрывает), если категории — закрывает оверлей.
 *
 * v2.7.11 – добавлена close-кнопка в правом верхнем углу оверлея.
 */
(function() {
    'use strict';

    var parameters = PluginManager.parameters('BattleGlossaryButton');
    var btnImage = String(parameters['Button Image'] || '');
    var btnX = Number(parameters['Button X'] || 0);
    var btnY = Number(parameters['Button Y'] || 0);

    // === Параметры close-кнопки ===
    var closeBtnImage       = String(parameters['Close Button Image'] || 'close');
    var closeBtnMarginRight = Number(parameters['Close Button Margin Right'] || 1195);
    var closeBtnMarginTop   = Number(parameters['Close Button Margin Top'] || 635);
    var closeBtnScale       = Number(parameters['Close Button Scale'] || 1);

    if (!btnImage) return;

    //=====================================================================
    // Оверлей глоссария
    //=====================================================================
    function GlossaryOverlay(scene) {
        this._scene = scene;
        this._active = false;
        this._windows = {};
        this._hiddenWindows = [];
        this._savedActiveWindow = null;
        this._savedActiveWindowType = '';
        this._helpWasVisible = false;
        this._savedPhase = '';
    }

    GlossaryOverlay.prototype.show = function(glossaryType) {
        if (this._active) return;
        if (glossaryType !== undefined) {
            $gameParty.setSelectedGlossaryType(glossaryType);
        } else if (!$gameParty._glossarySetting) {
            $gameParty.setSelectedGlossaryType(1);
        }
        this._savedPhase = BattleManager._phase;
        this._scene._glossaryActive = true;
        this.hideAllBattleWindows();
        this.createWindows();
        this.createCloseButton();   // <-- добавлено
        this._active = true;
        if ($gameParty.isUseGlossaryCategory()) {
            this.activateCategoryWindow(true);
        } else {
            this.activateListWindow(true);
            this._windows.list.selectLastIndex();
        }
    };

    GlossaryOverlay.prototype.hide = function() {
        if (!this._active) return;
        this._active = false;
        this._scene._glossaryActive = false;
        this.removeCloseButton();   // <-- добавлено
        this.removeGlossaryWindows();
        this.restoreAllBattleWindows();

        this._scene._glossaryCancelBlock = 10;

        if (this._savedPhase === 'input' && BattleManager._phase !== 'input') {
            BattleManager._phase = 'input';
        }

        var scene = this._scene;
        if (typeof scene.updateWindowSlideEffect === 'function') {
            scene.updateWindowSlideEffect();
        }
        if (typeof scene.updateLayoutWindow === 'function') {
            scene.updateLayoutWindow();
        }
        if (typeof scene.updateBattleHud === 'function') {
            scene.updateBattleHud();
        }
    };

    GlossaryOverlay.prototype.hideAllBattleWindows = function() {
        var scene = this._scene;
        this._hiddenWindows = [];

        this._savedActiveWindow = null;
        this._savedActiveWindowType = '';

        if (scene._actorCommandWindow && scene._actorCommandWindow.active && scene._actorCommandWindow.visible) {
            this._savedActiveWindow = scene._actorCommandWindow;
            this._savedActiveWindowType = 'command';
        } else if (scene._skillWindow && scene._skillWindow.active && scene._skillWindow.visible) {
            this._savedActiveWindow = scene._skillWindow;
            this._savedActiveWindowType = 'skill';
        } else if (scene._itemWindow && scene._itemWindow.active && scene._itemWindow.visible) {
            this._savedActiveWindow = scene._itemWindow;
            this._savedActiveWindowType = 'item';
        } else if (scene._actorWindow && scene._actorWindow.active && scene._actorWindow.visible) {
            this._savedActiveWindow = scene._actorWindow;
            this._savedActiveWindowType = 'target';
        } else if (scene._enemyWindow && scene._enemyWindow.active && scene._enemyWindow.visible) {
            this._savedActiveWindow = scene._enemyWindow;
            this._savedActiveWindowType = 'enemyTarget';
        } else {
            var windows = scene._windows || [];
            for (var i = 0; i < windows.length; i++) {
                var win = windows[i];
                if (win.active && win.visible && !win._glossaryOverlayWindow) {
                    this._savedActiveWindow = win;
                    this._savedActiveWindowType = 'custom';
                    break;
                }
            }
        }

        this._helpWasVisible = scene._helpWindow && scene._helpWindow.visible;

        var windows = scene._windows;
        if (windows) {
            for (var i = 0; i < windows.length; i++) {
                var win = windows[i];
                if (win._glossaryOverlayWindow) continue;
                if (win.visible) {
                    this._hiddenWindows.push(win);
                    win.visible = false;
                    if (typeof win.deactivate === 'function') {
                        win.deactivate();
                    }
                    win.active = false;
                }
            }
        }

        if (scene.children) {
            for (var j = 0; j < scene.children.length; j++) {
                var child = scene.children[j];
                if ((child instanceof Window_CTBIcon) ||
                    (typeof Window_CTBClone !== 'undefined' && child instanceof Window_CTBClone)) {
                    if (child.visible) {
                        this._hiddenWindows.push(child);
                        child.visible = false;
                        if (typeof child.deactivate === 'function') {
                            child.deactivate();
                        }
                        child.active = false;
                    }
                }
            }
        }

        //==================================================
        // Скрыть MOG HUD и оверлеи, НЕ трогать поле боя
        //==================================================
        this._hiddenSprites = [];

        var keep = [
            scene._spriteset,
            scene._windowLayer,
            scene._glossaryBtn
        ];

        (scene.children || []).forEach(function(child){
            if (!child) return;
            if (keep.indexOf(child) >= 0) {
                return;
            }
            if (child.visible) {
                this._hiddenSprites.push(child);
                child.visible = false;
            }
        }, this);

        // отдельно скрыть layout MOG
        if (scene._layoutField && scene._layoutField.visible) {
            this._hiddenSprites.push(scene._layoutField);
            scene._layoutField.visible = false;
        }
    };

    GlossaryOverlay.prototype.restoreAllBattleWindows = function() {
        var scene = this._scene;
        this._hiddenWindows.forEach(function(win) {
            win.visible = true;
        });
        this._hiddenWindows = [];
        if (this._hiddenSprites) {
            this._hiddenSprites.forEach(function(sprite){
                if (sprite) {
                    sprite.visible = true;
                }
            });
            this._hiddenSprites = [];
        }

        if ($gameTemp._bhud_position_active !== undefined) {
            $gameTemp._bhud_position_active = null;
        }
        if ($gameTemp._bhud_enemyTurn !== undefined) {
            $gameTemp._bhud_enemyTurn = false;
        }

        if (this._helpWasVisible && scene._helpWindow) {
            scene._helpWindow.visible = true;
        }

        if (this._savedActiveWindow && this._savedActiveWindowType) {
            switch (this._savedActiveWindowType) {
                case 'skill':
                    if (scene._actorCommandWindow) {
                        scene._actorCommandWindow.show();
                        scene._actorCommandWindow.open();
                        scene._actorCommandWindow.deactivate();
                    }
                    if (scene._skillWindow) {
                        scene._skillWindow.show();
                        scene._skillWindow.open();
                        scene._skillWindow.activate();
                    }
                    break;
                case 'item':
                    if (scene._actorCommandWindow) {
                        scene._actorCommandWindow.show();
                        scene._actorCommandWindow.open();
                        scene._actorCommandWindow.deactivate();
                    }
                    if (scene._itemWindow) {
                        scene._itemWindow.show();
                        scene._itemWindow.open();
                        scene._itemWindow.activate();
                    }
                    break;
                case 'target':
                    if (scene._actorCommandWindow) scene._actorCommandWindow.visible = false;
                    if (scene._skillWindow) scene._skillWindow.visible = false;
                    if (scene._itemWindow) scene._itemWindow.visible = false;
                    if (scene._actorWindow) {
                        scene._actorWindow.visible = true;
                        scene._actorWindow.activate();
                    }
                    break;
                case 'command':
                    if (scene._actorCommandWindow) {
                        scene._actorCommandWindow.visible = true;
                        scene._actorCommandWindow.activate();
                    }
                    if (scene._skillWindow) scene._skillWindow.visible = false;
                    if (scene._itemWindow) scene._itemWindow.visible = false;
                    if (scene._actorWindow) scene._actorWindow.visible = false;
                    break;
                case 'custom':
                    if (this._savedActiveWindow) {
                        this._savedActiveWindow.activate();
                    }
                    break;
                case 'enemyTarget':
                    if (scene._actorCommandWindow) scene._actorCommandWindow.visible = false;
                    if (scene._skillWindow) scene._skillWindow.visible = false;
                    if (scene._itemWindow) scene._itemWindow.visible = false;
                    if (scene._enemyWindow) {
                        scene._enemyWindow.visible = true;
                        scene._enemyWindow.activate();
                    }
                    break;
            }
        } else {
            if (BattleManager.isInputting()) {
                if (scene._actorCommandWindow) {
                    scene._actorCommandWindow.visible = true;
                    scene._actorCommandWindow.activate();
                }
            } else if (BattleManager._phase === 'partyCommand') {
                if (scene._partyCommandWindow) {
                    scene._partyCommandWindow.visible = true;
                    scene._partyCommandWindow.activate();
                }
            }
        }

        if (this._savedActiveWindowType !== 'skill' && scene._skillWindow) {
            scene._skillWindow.visible = false;
            scene._skillWindow.deactivate();
        }
        if (this._savedActiveWindowType !== 'item' && scene._itemWindow) {
            scene._itemWindow.visible = false;
            scene._itemWindow.deactivate();
        }

        if (typeof scene.updateBattleHud === 'function') {
            scene.updateBattleHud();
        }
    };

    GlossaryOverlay.prototype.createWindows = function() {
        var scene = this._scene;
        var listWidth = $gameParty.getGlossaryListWidth();

        var glossaryWin = new Window_Glossary(listWidth, 0);
        glossaryWin._glossaryOverlayWindow = true;
        scene.addWindow(glossaryWin);
        this._windows.glossary = glossaryWin;

        var listWin = new Window_GlossaryList(glossaryWin);
        listWin._glossaryOverlayWindow = true;
        listWin.setHandler('cancel', this.onCancelList.bind(this));
        scene.addWindow(listWin);
        this._windows.list = listWin;

        var catWin = new Window_GlossaryCategory(listWin);
        catWin._glossaryOverlayWindow = true;
        catWin.setHandler('cancel', this.onCancelCategory.bind(this));
        catWin.setHandler('ok', this.onOkCategory.bind(this));
        catWin.setHandler('select', this.refreshComplete.bind(this));
        scene.addWindow(catWin);
        this._windows.category = catWin;

        var confirmWin = new Window_GlossaryConfirm(listWin);
        confirmWin._glossaryOverlayWindow = true;
        confirmWin.setHandler('cancel', this.onConfirmCancel.bind(this));
        confirmWin.setHandler('use', this.onConfirmUse.bind(this));
        confirmWin.setHandler('noUse', this.onConfirmCancel.bind(this));
        scene.addWindow(confirmWin);
        this._windows.confirm = confirmWin;

        var compWin = new Window_GlossaryComplete(listWin);
        compWin._glossaryOverlayWindow = true;
        if (!$gameParty.isUseGlossaryComplete()) compWin.visible = false;
        scene.addWindow(compWin);
        this._windows.complete = compWin;

        listWin.deactivateAndHide();
        catWin.deactivateAndHide();
        confirmWin.deactivateAndHide();
    };

    GlossaryOverlay.prototype.removeGlossaryWindows = function() {
        var scene = this._scene;
        ['glossary','list','category','confirm','complete'].forEach(function(key) {
            var win = this._windows[key];
            if (win) {
                if (win.parent) win.parent.removeChild(win);
                if (scene._windows) {
                    var idx = scene._windows.indexOf(win);
                    if (idx >= 0) scene._windows.splice(idx, 1);
                }
                delete this._windows[key];
            }
        }.bind(this));
    };

    //=====================================================================
    // Close-кнопка (аналог ESC) для оверлея
    //=====================================================================

    GlossaryOverlay.prototype.createCloseButton = function() {
        var bmp = ImageManager.loadPicture(closeBtnImage);
        this._closeButton = new Sprite(bmp);
        this._closeButton.scale.x = closeBtnScale;
        this._closeButton.scale.y = closeBtnScale;
        this._closeButton.opacity = 255;
        this._closeBtnHovered = false;
        // Позиция в правом верхнем углу выставляется в updateCloseButton()
        // (картинка на момент создания ещё не готова).
        this._scene.addChild(this._closeButton);
    };

    GlossaryOverlay.prototype.isCloseButtonTouched = function() {
        var s = this._closeButton;
        if (!s || !s.visible || !s.bitmap || !s.bitmap.isReady()) return false;
        var local = s.worldTransform.applyInverse({ x: TouchInput.x, y: TouchInput.y });
        return local.x >= 0 && local.y >= 0 &&
               local.x < s.width && local.y < s.height;
    };

    // Возвращает true, если клик в этом кадре был поглощён кнопкой.
    GlossaryOverlay.prototype.updateCloseButton = function() {
        var s = this._closeButton;
        if (!s || !s.bitmap) return false;

        // Держим кнопку в правом верхнем углу, пока картинка грузится
        // и при смене разрешения.
        if (s.bitmap.isReady()) {
            var w = s.bitmap.width * closeBtnScale;
            var h = s.bitmap.height * closeBtnScale;
            s.x = Graphics.boxWidth - w - closeBtnMarginRight;
            s.y = closeBtnMarginTop;
        }

        var hovered = this.isCloseButtonTouched();
        if (hovered !== this._closeBtnHovered) {
            this._closeBtnHovered = hovered;
            s.opacity = hovered ? 200 : 255;
        }

        if (TouchInput.isTriggered() && hovered) {
            this.onCloseButtonClick();
            return true;
        }
        return false;
    };

    // Повторяет поведение ESC в оверлее (см. Scene_Battle.commandCancel)
    GlossaryOverlay.prototype.onCloseButtonClick = function() {
        SoundManager.playCancel();
        var list = this._windows.list;
        var category = this._windows.category;
        var confirm = this._windows.confirm;
        if (confirm && confirm.active) {
            this.onConfirmCancel();
        } else if (list && list.active) {
            this.onCancelList();
        } else if (category && category.active) {
            this.onCancelCategory();
        } else {
            this.hide();
        }
    };

    GlossaryOverlay.prototype.removeCloseButton = function() {
        if (this._closeButton) {
            if (this._closeButton.parent) {
                this._closeButton.parent.removeChild(this._closeButton);
            }
            this._closeButton = null;
        }
    };

    //=====================================================================
    // Управление окнами оверлея
    //=====================================================================
    GlossaryOverlay.prototype.activateCategoryWindow = function(resetIndex) {
        this._windows.category.activateAndShow();
        if (resetIndex) this._windows.category.select(0);
        this._windows.list.deactivateAndHide();
        this._windows.confirm.deactivateAndHide();
        this.refreshComplete();
    };
    GlossaryOverlay.prototype.activateListWindow = function(resetIndex) {
        this._windows.list.setHandler('ok', this.onOkList.bind(this));
        this._windows.list.refresh();
        this._windows.list.activateAndShow();
        if (resetIndex) this._windows.list.select(0);
        this._windows.category.deactivateAndHide();
        this._windows.confirm.deactivateAndHide();
        this.refreshComplete();
    };
    GlossaryOverlay.prototype.activateConfirmWindow = function() {
        this._windows.list.deactivate();
        this._windows.confirm.updatePlacement();
        this._windows.confirm.select(0);
        this._windows.confirm.activateAndShow();
    };
    GlossaryOverlay.prototype.onCancelCategory = function() { this.hide(); };
    GlossaryOverlay.prototype.onOkCategory = function() { this.activateListWindow(true); };
    GlossaryOverlay.prototype.onCancelList = function() {
        if ($gameParty.isUseGlossaryCategory()) this.activateCategoryWindow(false);
        else this.hide();
    };
    GlossaryOverlay.prototype.onOkList = function() {
        if ($gameParty.isUseGlossaryConfirm()) this.activateConfirmWindow();
        else this.onConfirmUse();
    };
    GlossaryOverlay.prototype.onConfirmUse = function() {
        this._windows.confirm.deactivateAndHide();
        var item = this._windows.list.item();
        $gameParty.setGlossarySelectVariableValue(item.id);
        $gameParty.setGlossarySelectSwitchValue(true);
        this.activateListWindow(false);
    };
    GlossaryOverlay.prototype.onConfirmCancel = function() {
        $gameParty.setGlossarySelectVariableValue(-1);
        $gameParty.setGlossarySelectSwitchValue(false);
        this.activateListWindow(false);
    };
    GlossaryOverlay.prototype.refreshComplete = function() {
        if (this._windows.complete.visible) this._windows.complete.refresh();
    };

    //=====================================================================
    // Перехват Cancel и мыши/Touch
    //=====================================================================

    var _Window_Selectable_processCancel = Window_Selectable.prototype.processCancel;
    Window_Selectable.prototype.processCancel = function() {
        var battle = SceneManager._scene;
        if (battle instanceof Scene_Battle && battle._glossaryCancelBlock > 0) {
            return;
        }
        if (battle instanceof Scene_Battle && battle._glossaryOverlay && battle._glossaryOverlay._active) {
            if (this._glossaryOverlayWindow) {
                _Window_Selectable_processCancel.call(this);
            }
            return;
        }
        _Window_Selectable_processCancel.call(this);
    };

    var _Window_Selectable_processTouch = Window_Selectable.prototype.processTouch;
    Window_Selectable.prototype.processTouch = function() {
        var battle = SceneManager._scene;
        if (battle instanceof Scene_Battle && battle._glossaryActive && !this._glossaryOverlayWindow) {
            return false;
        }
        return _Window_Selectable_processTouch.call(this);
    };

    var _Scene_Battle_commandCancel = Scene_Battle.prototype.commandCancel;
    Scene_Battle.prototype.commandCancel = function() {
        if (this._glossaryCancelBlock > 0) {
            return;
        }
        if (this._glossaryOverlay && this._glossaryOverlay._active) {
            var overlay = this._glossaryOverlay;
            var list = overlay._windows.list;
            var category = overlay._windows.category;
            var confirm = overlay._windows.confirm;
            if (confirm.active) overlay.onConfirmCancel();
            else if (list.active) overlay.onCancelList();
            else if (category.active) overlay.onCancelCategory();
            else overlay.hide();
            return;
        }
        _Scene_Battle_commandCancel.call(this);
    };

    var _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
    Scene_Battle.prototype.createSpriteset = function() {
        _Scene_Battle_createSpriteset.call(this);
        this.createGlossaryButton();
        this._glossaryCancelBlock = 0;
        this._glossaryActive = false;
    };

    Scene_Battle.prototype.createGlossaryButton = function() {
        this._glossaryBtn = new Sprite(ImageManager.loadPicture(btnImage));
        this._glossaryBtn.anchor.set(0.5);
        this._glossaryBtn.x = btnX;
        this._glossaryBtn.y = btnY;
        this.addChild(this._glossaryBtn);
    };

    Scene_Battle.prototype.hideAllOverlaySprites = function() {
        if (this._layoutField) {
            var sprites = ['_com_layout', '_party_layout', '_help_layout',
                           '_skill_layout', '_item_layout', '_actor_layout', '_enemy_layout'];
            for (var i = 0; i < sprites.length; i++) {
                var spr = this[sprites[i]];
                if (spr && spr.visible) spr.visible = false;
            }
        }
    };

    var _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);
        if (this._glossaryCancelBlock > 0) {
            this._glossaryCancelBlock--;
        }
        this.updateGlossaryButton();
        if (this._glossaryActive) {
            this.hideCTBWindows();
            this.hideAllOverlaySprites();
            // Обновление close-кнопки оверлея
            if (this._glossaryOverlay && this._glossaryOverlay._active) {
                this._glossaryOverlay.updateCloseButton();
            }
        }
    };

    Scene_Battle.prototype.hideCTBWindows = function() {
        var children = this.children || [];
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child instanceof Window_CTBIcon || (typeof Window_CTBClone !== 'undefined' && child instanceof Window_CTBClone)) {
                child.visible = false;
            }
        }
        if (typeof _ctbCloneWindow !== 'undefined' && _ctbCloneWindow && _ctbCloneWindow.visible) {
            _ctbCloneWindow.visible = false;
        }
    };

    Scene_Battle.prototype.updateGlossaryButton = function() {
        if (!this._glossaryBtn || !$gameParty.inBattle()) return;
        if (!this._glossaryBtn.bitmap.isReady()) return;

        var overlayActive = this._glossaryOverlay && this._glossaryOverlay._active;

        // Проверка, что никакое окно выбора цели не активно
        var targetWindowActive = false;
        if (this._actorWindow && this._actorWindow.active && this._actorWindow.visible) {
            targetWindowActive = true;
        }
        if (this._enemyWindow && this._enemyWindow.active && this._enemyWindow.visible) {
            targetWindowActive = true;
        }

        var inputWindowActive =
            (this._actorCommandWindow && this._actorCommandWindow.active) ||
            (this._skillWindow && this._skillWindow.active) ||
            (this._itemWindow && this._itemWindow.active);

        var canUse =
            inputWindowActive &&
            !$gameMessage.isBusy() &&
            !overlayActive &&
            !targetWindowActive;

        this._glossaryBtn.visible = canUse;
        if (!canUse) return;

        var s = this._glossaryBtn;
        var bx = s.x - s.width / 2;
        var by = s.y - s.height / 2;
        var touching = TouchInput.x >= bx && TouchInput.x <= bx + s.width &&
                       TouchInput.y >= by && TouchInput.y <= by + s.height;
        s.scale.set(touching && TouchInput.isPressed() ? 0.9 : 1.0);
        if (TouchInput.isTriggered() && touching) {
            SoundManager.playOk();
            if (!this._glossaryOverlay) this._glossaryOverlay = new GlossaryOverlay(this);
            this._glossaryOverlay.show(1);
        }
    };

    var _Scene_Battle_isMenuEnabled = Scene_Battle.prototype.isMenuEnabled;
    Scene_Battle.prototype.isMenuEnabled = function() {
        if (this._glossaryOverlay && this._glossaryOverlay._active) return false;
        return _Scene_Battle_isMenuEnabled.call(this);
    };

    var _SceneManager_push = SceneManager.push;
    SceneManager.push = function(sceneClass) {
        if (sceneClass === Scene_Menu) {
            var battle = SceneManager._scene;
            if (battle instanceof Scene_Battle && battle._glossaryOverlay && battle._glossaryOverlay._active) return;
        }
        _SceneManager_push.call(this, sceneClass);
    };

    var _Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
    Scene_Battle.prototype.isAnyInputWindowActive = function() {
        if (this._glossaryOverlay && this._glossaryOverlay._active) return true;
        return _Scene_Battle_isAnyInputWindowActive.call(this);
    };

    // Блокировка OK (пробела) при активном глоссарии
    var _Window_Selectable_processOk = Window_Selectable.prototype.processOk;
    Window_Selectable.prototype.processOk = function() {
        var battle = SceneManager._scene;
        if (battle instanceof Scene_Battle && battle._glossaryOverlay && battle._glossaryOverlay._active) {
            if (!this._glossaryOverlayWindow) {
                return;
            }
        }
        _Window_Selectable_processOk.call(this);
    };
})();
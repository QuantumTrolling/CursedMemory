/*:
 * @plugindesc v2.7.1 Глоссарий поверх боя (восстановление MOG Layout_Help)
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
 * @help
 * Поместите ПОСЛЕ SceneGlossary.js и всех боевых плагинов.
 * Кнопка в бою открывает глоссарий как оверлей.
 * Esc / ПКМ = назад; меню, CTB и MOG-Layouts скрываются.
 * Логи в консоли (F8).
 */
(function() {
    'use strict';

    var parameters = PluginManager.parameters('BattleGlossaryButton');
    var btnImage = String(parameters['Button Image'] || '');
    var btnX = Number(parameters['Button X'] || 0);
    var btnY = Number(parameters['Button Y'] || 0);

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
        this._helpWasVisible = false;   // новое
    }

    GlossaryOverlay.prototype.show = function(glossaryType) {
        console.log('[Glossary] show');
        if (this._active) return;
        if (glossaryType !== undefined) {
            $gameParty.setSelectedGlossaryType(glossaryType);
        } else if (!$gameParty._glossarySetting) {
            $gameParty.setSelectedGlossaryType(1);
        }
        this._scene._glossaryActive = true;
        this.hideAllBattleWindows();
        this.createWindows();
        this._active = true;
        if ($gameParty.isUseGlossaryCategory()) {
            this.activateCategoryWindow(true);
        } else {
            this.activateListWindow(true);
            this._windows.list.selectLastIndex();
        }
    };

    GlossaryOverlay.prototype.hide = function() {
        console.log('[Glossary] hide');
        if (!this._active) return;
        this._active = false;
        this._scene._glossaryActive = false;
        this.removeGlossaryWindows();
        this.restoreAllBattleWindows();
    };

    GlossaryOverlay.prototype.hideAllBattleWindows = function() {
        var scene = this._scene;
        this._hiddenWindows = [];

        // Сохраняем активное окно
        this._savedActiveWindow = null;
        this._savedActiveWindowType = '';
        if (scene._skillWindow && scene._skillWindow.active) {
            this._savedActiveWindow = scene._skillWindow;
            this._savedActiveWindowType = 'skill';
        } else if (scene._itemWindow && scene._itemWindow.active) {
            this._savedActiveWindow = scene._itemWindow;
            this._savedActiveWindowType = 'item';
        } else if (scene._actorWindow && scene._actorWindow.active) {
            this._savedActiveWindow = scene._actorWindow;
            this._savedActiveWindowType = 'target';
        } else if (scene._actorCommandWindow && scene._actorCommandWindow.active) {
            this._savedActiveWindow = scene._actorCommandWindow;
            this._savedActiveWindowType = 'command';
        } else {
            var windows = scene._windows || [];
            for (var i = 0; i < windows.length; i++) {
                if (windows[i].active && !windows[i]._glossaryOverlayWindow) {
                    this._savedActiveWindow = windows[i];
                    this._savedActiveWindowType = 'custom';
                    break;
                }
            }
        }

        // Запоминаем, было ли видимо окно помощи
        this._helpWasVisible = scene._helpWindow && scene._helpWindow.visible;

        // Скрываем все видимые окна
        var windows = scene._windows;
        if (windows) {
            for (var i = 0; i < windows.length; i++) {
                var win = windows[i];
                if (win._glossaryOverlayWindow) continue;
                if (win.visible) {
                    this._hiddenWindows.push(win);
                    win.visible = false;
                }
            }
        }

        // CTB иконки
        if (scene.children) {
            for (var j = 0; j < scene.children.length; j++) {
                var child = scene.children[j];
                if ((child instanceof Window_CTBIcon) ||
                    (typeof Window_CTBClone !== 'undefined' && child instanceof Window_CTBClone)) {
                    if (child.visible) {
                        this._hiddenWindows.push(child);
                        child.visible = false;
                    }
                }
            }
        }
    };

    GlossaryOverlay.prototype.restoreAllBattleWindows = function() {
        var scene = this._scene;
        // Показываем всё обратно
        this._hiddenWindows.forEach(function(win) {
            win.visible = true;
        });
        this._hiddenWindows = [];

        // Сброс HUD позиции
        if ($gameTemp._bhud_position_active !== undefined) {
            $gameTemp._bhud_position_active = null;
        }

        // Восстанавливаем видимость окна помощи, если оно было показано
        if (this._helpWasVisible && scene._helpWindow) {
            scene._helpWindow.visible = true;
        }

        // Восстанавливаем активное окно
        if (this._savedActiveWindow && this._savedActiveWindowType) {
            switch (this._savedActiveWindowType) {
                case 'skill':
                    if (scene._actorCommandWindow) {
                        scene._actorCommandWindow.visible = true;
                        scene._actorCommandWindow.deactivate();
                    }
                    if (scene._skillWindow) {
                        scene._skillWindow.visible = true;
                        scene._skillWindow.activate();
                    }
                    break;
                case 'item':
                    if (scene._actorCommandWindow) {
                        scene._actorCommandWindow.visible = true;
                        scene._actorCommandWindow.deactivate();
                    }
                    if (scene._itemWindow) {
                        scene._itemWindow.visible = true;
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

        // Принудительно скрываем лишние окна
        var allWindows = [];
        if (scene._windows) allWindows = allWindows.concat(scene._windows);
        if (scene.children) {
            for (var c = 0; c < scene.children.length; c++) {
                if (scene.children[c] instanceof Window && allWindows.indexOf(scene.children[c]) === -1) {
                    allWindows.push(scene.children[c]);
                }
            }
        }
        allWindows.forEach(function(w) {
            if (!w.visible || w._glossaryOverlayWindow) return;
            if (w === scene._helpWindow || w === scene._statusWindow || w === scene._logWindow ||
                (w instanceof Window_CTBIcon) || (typeof Window_CTBClone !== 'undefined' && w instanceof Window_CTBClone)) {
                return;
            }
            var keep = false;
            if (w === this._savedActiveWindow) keep = true;
            if ((this._savedActiveWindowType === 'skill' || this._savedActiveWindowType === 'item') && w === scene._actorCommandWindow) keep = true;
            if (this._savedActiveWindowType === 'command' && w === scene._actorCommandWindow) keep = true;
            if (!this._savedActiveWindow && w === scene._actorCommandWindow && BattleManager.isInputting()) keep = true;
            if (!keep) {
                w.visible = false;
            }
        }, this);

        // Обновляем HUD и layout-спрайты MOG
        if (typeof scene.updateBattleHud === 'function') {
            scene.updateBattleHud();
        }
    };

    // Создание/удаление окон глоссария (без изменений)
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

    // Навигация (без изменений)
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

    // Перехват processCancel и commandCancel
    var _Window_Selectable_processCancel = Window_Selectable.prototype.processCancel;
    Window_Selectable.prototype.processCancel = function() {
        var battle = SceneManager._scene;
        if (battle instanceof Scene_Battle && battle._glossaryOverlay && battle._glossaryOverlay._active) {
            if (this._glossaryOverlayWindow) {
                _Window_Selectable_processCancel.call(this);
            }
            return;
        }
        _Window_Selectable_processCancel.call(this);
    };

    var _Scene_Battle_commandCancel = Scene_Battle.prototype.commandCancel;
    Scene_Battle.prototype.commandCancel = function() {
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

    // Интеграция в сцену
    var _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
    Scene_Battle.prototype.createSpriteset = function() {
        _Scene_Battle_createSpriteset.call(this);
        this.createGlossaryButton();
    };

    Scene_Battle.prototype.createGlossaryButton = function() {
        this._glossaryBtn = new Sprite(ImageManager.loadPicture(btnImage));
        this._glossaryBtn.anchor.set(0.5);
        this._glossaryBtn.x = btnX;
        this._glossaryBtn.y = btnY;
        this.addChild(this._glossaryBtn);
    };

    // НОВЫЙ МЕТОД: скрытие layout-спрайтов MOG (окна не трогаем, они уже скрыты)
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
        this.updateGlossaryButton();

        // Пока активен глоссарий – полностью блокируем показ CTB и MOG-Layouts
        if (this._glossaryActive) {
            this.hideCTBWindows();
            this.hideAllOverlaySprites();
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
        var canUse = BattleManager.isInputting() && !$gameMessage.isBusy() && !overlayActive;
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

    // Блокировка меню
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

    // Лог выбора навыка
    if (typeof Window_BattleSkill !== 'undefined') {
        var _Window_BattleSkill_processOk = Window_BattleSkill.prototype.processOk;
        Window_BattleSkill.prototype.processOk = function() {
            console.log('[Glossary-SKILL] processOk');
            _Window_BattleSkill_processOk.call(this);
        };
    }
	
})();
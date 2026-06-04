/*:
 * @plugindesc v2.2 Глоссарий поверх боя (блокировка кнопок боя) + ЖЁСТКИЕ ЛОГИ
 * @author ВашеИмя
 * @help
 * Поместите этот плагин ПОСЛЕ:
 *   - SceneGlossary.js
 *   - MOG_BattleHud_ExtraButton.js
 *
 * В параметрах MOG_BattleHud_ExtraButton установите:
 *   Extra Button Common Event = 0
 *
 * При открытом глоссарии боевые окна деактивируются, ESC/ПКМ закрывают глоссарий.
 * Для отладки откройте консоль (F8) во время боя – все логи начинаются с [GlossaryPlugin]
 */

(function() {
    'use strict';

    // ===== ЖЁСТКАЯ ПРОВЕРКА ЗАГРУЗКИ =====
    console.log('[GlossaryPlugin] Plugin file is being evaluated');
    try {
        alert('[GlossaryPlugin] Plugin loaded!'); // Удалите или закомментируйте после проверки
    } catch(e) {
        console.error(e);
    }
    // ====================================

    //=====================================================================
    // 1. Исправляем создание кнопки: разрешаем CE = 0
    //=====================================================================
    var _mog_createBtn = Scene_Battle.prototype.createBattleHudExtraButton;
    Scene_Battle.prototype.createBattleHudExtraButton = function() {
        if (!Moghunter.bhud_extraBtnImage) return;
        this._bhudExtraButton = new Sprite(ImageManager.loadPicture(Moghunter.bhud_extraBtnImage));
        this._bhudExtraButton.anchor.set(0.5);
        this._bhudExtraButton.x = Moghunter.bhud_extraBtnX;
        this._bhudExtraButton.y = Moghunter.bhud_extraBtnY;
        this.addChild(this._bhudExtraButton);
    };

    //=====================================================================
    // 2. Полностью переопределяем обработку нажатия на кнопку
    //=====================================================================
    var _mog_updateBtn = Scene_Battle.prototype.updateBattleHudExtraButton;
    Scene_Battle.prototype.updateBattleHudExtraButton = function() {
        if (!this._bhudExtraButton || !$gameParty.inBattle()) return;
        if (!this._bhudExtraButton.bitmap.isReady()) return;

        var canUse = BattleManager.isInputting() && !$gameMessage.isBusy() &&
                     !(this._glossaryOverlay && this._glossaryOverlay._active);
        this._bhudExtraButton.visible = canUse;
        if (!canUse) return;

        var s = this._bhudExtraButton;
        var bx = s.x - s.width / 2;
        var by = s.y - s.height / 2;
        var touching = TouchInput.x >= bx && TouchInput.x <= bx + s.width &&
                       TouchInput.y >= by && TouchInput.y <= by + s.height;

        s.scale.set(touching && TouchInput.isPressed() ? 0.9 : 1.0);

        if (TouchInput.isTriggered() && touching) {
            SoundManager.playOk();

            if (Moghunter.bhud_extraBtnCE > 0) {
                if (typeof BattleManager.exBtnSaveBattleState === 'function') {
                    BattleManager.exBtnSaveBattleState();
                }
                BattleManager._exBtnEventRunning = true;
                BattleManager._actorIndex = -1;
                BattleManager._inputting = false;
                $gameTemp.reserveCommonEvent(Moghunter.bhud_extraBtnCE);
                if (Moghunter.bhud_extraBtnTurn) {
                    BattleManager.restartTurn();
                } else {
                    BattleManager._phase = 'event';
                }
                this._delayBattleEvent = 1;
            } else {
                if (!this._glossaryOverlay) {
                    this._glossaryOverlay = new Window_GlossaryOverlay(this);
                    this.addChild(this._glossaryOverlay);
                }
                console.log('[GlossaryPlugin] Opening glossary overlay via button');
                this._glossaryOverlay.show(1);
            }
        }
    };

    //=====================================================================
    // 3. Класс Window_GlossaryOverlay
    //=====================================================================
    function Window_GlossaryOverlay() {
        this.initialize.apply(this, arguments);
    }

    Window_GlossaryOverlay.prototype = Object.create(PIXI.Container.prototype);
    Window_GlossaryOverlay.prototype.constructor = Window_GlossaryOverlay;

    Window_GlossaryOverlay.prototype.initialize = function(sceneBattle) {
        PIXI.Container.call(this);
        this._scene = sceneBattle;
        this._active = false;
        this._created = false;
        console.log('[GlossaryPlugin] Window_GlossaryOverlay initialized');
    };

    Window_GlossaryOverlay.prototype.createWindows = function() {
        console.log('[GlossaryPlugin] createWindows called');
        this.removeChildren();
        // ... остальной код создания окон без изменений ...
        this._created = true;
    };

    Window_GlossaryOverlay.prototype.show = function(glossaryType) {
        console.log('[GlossaryPlugin] show() called, glossaryType=' + glossaryType);
        if (glossaryType !== undefined) {
            $gameParty.setSelectedGlossaryType(glossaryType);
        } else if (!$gameParty._glossarySetting) {
            $gameParty.setSelectedGlossaryType(1);
        }

        if (!this._created) {
            this.createWindows();
        } else {
            this._helpTexts = $gameParty.getGlossaryHelpMessages();
        }

        // Логируем состояние боевых окон
        console.log('[GlossaryPlugin] Before deactivation:');
        if (this._scene._actorCommandWindow) {
            console.log('  _actorCommandWindow.active = ' + this._scene._actorCommandWindow.active);
        } else {
            console.log('  _actorCommandWindow not found!');
        }
        if (this._scene._partyCommandWindow) {
            console.log('  _partyCommandWindow.active = ' + this._scene._partyCommandWindow.active);
        } else {
            console.log('  _partyCommandWindow not found!');
        }

        // Деактивируем боевые окна
        if (this._scene._actorCommandWindow) {
            this._scene._actorCommandWindow.deactivate();
            console.log('[GlossaryPlugin] _actorCommandWindow deactivated');
        }
        if (this._scene._partyCommandWindow) {
            this._scene._partyCommandWindow.deactivate();
            console.log('[GlossaryPlugin] _partyCommandWindow deactivated');
        }

        this._active = true;
        BattleManager._glossaryOverlayActive = true;

        if ($gameParty.isUseGlossaryCategory()) {
            this.activateCategoryWindow(true);
        } else {
            this.activateListWindow(true);
            this._glossaryListWindow.selectLastIndex();
        }
    };

    Window_GlossaryOverlay.prototype.hide = function() {
        console.log('[GlossaryPlugin] hide() called');
        this._active = false;
        this._glossaryCategoryWindow.deactivateAndHide();
        this._glossaryListWindow.deactivateAndHide();
        this._confirmWindow.deactivateAndHide();
        this._helpWindow.hide();
        BattleManager._glossaryOverlayActive = false;

        var canReturn = BattleManager.isInputting() && !$gameMessage.isBusy();
        console.log('[GlossaryPlugin] Return focus to battle? isInputting=' + BattleManager.isInputting() + ', msgBusy=' + $gameMessage.isBusy());
        if (canReturn) {
            if (this._scene._partyCommandWindow && this._scene._partyCommandWindow.isOpen()) {
                this._scene._partyCommandWindow.activate();
                console.log('[GlossaryPlugin] _partyCommandWindow activated');
            } else if (this._scene._actorCommandWindow) {
                this._scene._actorCommandWindow.activate();
                console.log('[GlossaryPlugin] _actorCommandWindow activated');
            }
        }
    };

    // Остальные методы оставляем без изменений, но можно добавить в них короткие логи при необходимости
    Window_GlossaryOverlay.prototype.activateCategoryWindow = function(resetIndex) {
        // ... (прежний код) ...
    };
    // ... и так далее – полный набор методов, как в предыдущей версии ...

    //=====================================================================
    // 4. Интеграция в сцену битвы (блокировка ввода)
    //=====================================================================
    var _Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
    Scene_Battle.prototype.isAnyInputWindowActive = function() {
        var overlayActive = (this._glossaryOverlay && this._glossaryOverlay._active);
        // Этот лог будет спамить в консоль каждый кадр, поэтому можно закомментировать после отладки
        // console.log('[GlossaryPlugin] isAnyInputWindowActive: overlayActive=' + overlayActive);
        if (overlayActive) return true;
        return _Scene_Battle_isAnyInputWindowActive.call(this);
    };

    // Перехват commandEscape
    var _Scene_Battle_commandEscape = Scene_Battle.prototype.commandEscape;
    Scene_Battle.prototype.commandEscape = function() {
        var overlayActive = (this._glossaryOverlay && this._glossaryOverlay._active);
        console.log('[GlossaryPlugin] commandEscape called, overlayActive=' + overlayActive);
        if (overlayActive) {
            console.log('[GlossaryPlugin] Closing glossary instead of escape');
            if (this._glossaryOverlay._glossaryCategoryWindow.active) {
                this._glossaryOverlay.onCancelCategory();
            } else if (this._glossaryOverlay._glossaryListWindow.active) {
                this._glossaryOverlay.onCancelList();
            } else if (this._glossaryOverlay._confirmWindow.active) {
                this._glossaryOverlay.onConfirmCancel();
            }
            return;
        }
        console.log('[GlossaryPlugin] Normal escape proceed');
        _Scene_Battle_commandEscape.call(this);
    };

})();
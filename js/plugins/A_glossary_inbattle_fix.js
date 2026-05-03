/*:
 * @plugindesc v2.0 Глоссарий поверх боя (исправление кнопки).
 * @author ВашеИмя
 * @help
 * Поместите этот плагин ПОСЛЕ:
 *   - SceneGlossary.js
 *   - MOG_BattleHud_ExtraButton.js
 *
 * В параметрах MOG_BattleHud_ExtraButton установите:
 *   Extra Button Common Event = 0
 *
 * Кнопка будет отображаться и при нажатии открывать глоссарий
 * как оверлей, не прерывая бой.
 */

(function() {
    'use strict';

    //=====================================================================
    // 1. Исправляем создание кнопки: разрешаем CE = 0
    //=====================================================================
    var _mog_createBtn = Scene_Battle.prototype.createBattleHudExtraButton;
    Scene_Battle.prototype.createBattleHudExtraButton = function() {
        // Убираем проверку CE <= 0, оставляем только проверку на картинку
        if (!Moghunter.bhud_extraBtnImage) return;
        // Создаём кнопку в любом случае (CE может быть 0)
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
        // Проверки видимости кнопки
        if (!this._bhudExtraButton || !$gameParty.inBattle()) return;
        if (!this._bhudExtraButton.bitmap.isReady()) return;

        var canUse = BattleManager.isInputting() && !$gameMessage.isBusy() &&
                     !(this._glossaryOverlay && this._glossaryOverlay._active);
        this._bhudExtraButton.visible = canUse;
        if (!canUse) return;

        // Обработка касания
        var s = this._bhudExtraButton;
        var bx = s.x - s.width / 2;
        var by = s.y - s.height / 2;
        var touching = TouchInput.x >= bx && TouchInput.x <= bx + s.width &&
                       TouchInput.y >= by && TouchInput.y <= by + s.height;

        s.scale.set(touching && TouchInput.isPressed() ? 0.9 : 1.0);

        if (TouchInput.isTriggered() && touching) {
            SoundManager.playOk();

            // ---- CE > 0: поведение оригинала ----
            if (Moghunter.bhud_extraBtnCE > 0) {
                // Сохраняем бой, запускаем общее событие
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
            }
            // ---- CE = 0: открыть глоссарий как оверлей ----
            else {
                if (!this._glossaryOverlay) {
                    // Если оверлей ещё не создан (редкий случай)
                    this._glossaryOverlay = new Window_GlossaryOverlay(this);
                    this.addChild(this._glossaryOverlay);
                }
                this._glossaryOverlay.show(1); // тип глоссария по умолчанию = 1
            }
        }
    };

    //=====================================================================
    // 3. Класс Window_GlossaryOverlay (без изменений, как в предыдущем ответе)
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
    };

    Window_GlossaryOverlay.prototype.createWindows = function() {
        this.removeChildren();

        this._dummyWindow = new Window_Base(0, 0, 1, 1);
        this._dummyWindow.visible = false;
        this.addChild(this._dummyWindow);

        this._helpTexts = $gameParty.getGlossaryHelpMessages();

        this._helpWindow = new Window_Help(1);
        this._helpWindow.setText(this._helpTexts[0] || '');
        this.addChild(this._helpWindow);

        var listWidth = $gameParty.getGlossaryListWidth();

        this._glossaryWindow = new Window_Glossary(listWidth, this._helpWindow.height);
        this.addChild(this._glossaryWindow);

        this._glossaryListWindow = new Window_GlossaryList(this._glossaryWindow);
        this._glossaryListWindow.setHandler('cancel', this.onCancelList.bind(this));
        this._glossaryListWindow.setItemHandler(this.onOkList.bind(this));
        this.addChild(this._glossaryListWindow);

        this._glossaryCategoryWindow = new Window_GlossaryCategory(this._glossaryListWindow);
        this._glossaryCategoryWindow.setHandler('cancel', this.onCancelCategory.bind(this));
        this._glossaryCategoryWindow.setHandler('ok', this.onOkCategory.bind(this));
        this._glossaryCategoryWindow.setHandler('select', this.refreshComplete.bind(this));
        this.addChild(this._glossaryCategoryWindow);

        this._confirmWindow = new Window_GlossaryConfirm(this._glossaryListWindow);
        this._confirmWindow.setHandler('cancel', this.onConfirmCancel.bind(this));
        this._confirmWindow.setHandler('use', this.onConfirmUse.bind(this));
        this._confirmWindow.setHandler('noUse', this.onConfirmCancel.bind(this));
        this.addChild(this._confirmWindow);

        this._completeWindow = new Window_GlossaryComplete(this._glossaryListWindow);
        if (!$gameParty.isUseGlossaryComplete()) {
            this._completeWindow.visible = false;
        }
        this.addChild(this._completeWindow);

        this._glossaryListWindow.deactivateAndHide();
        this._glossaryCategoryWindow.deactivateAndHide();
        this._confirmWindow.deactivateAndHide();
        this._helpWindow.hide();
        this._created = true;
    };

    Window_GlossaryOverlay.prototype.show = function(glossaryType) {
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
        this._active = false;
        this._glossaryCategoryWindow.deactivateAndHide();
        this._glossaryListWindow.deactivateAndHide();
        this._confirmWindow.deactivateAndHide();
        this._helpWindow.hide();
        BattleManager._glossaryOverlayActive = false;
    };

    Window_GlossaryOverlay.prototype.activateCategoryWindow = function(resetIndex) {
        this._glossaryCategoryWindow.activateAndShow();
        if (resetIndex) this._glossaryCategoryWindow.select(0);
        this._glossaryListWindow.deactivateAndHide();
        this._confirmWindow.deactivateAndHide();
        this._helpWindow.setText(this._helpTexts[1] || '');
        this._helpWindow.show();
        this.refreshComplete();
    };

    Window_GlossaryOverlay.prototype.activateListWindow = function(resetIndex) {
        this._glossaryListWindow.setItemHandler(this.onOkList.bind(this));
        this._glossaryListWindow.refresh();
        this._glossaryListWindow.activateAndShow();
        if (resetIndex) this._glossaryListWindow.select(0);
        this._glossaryCategoryWindow.deactivateAndHide();
        this._confirmWindow.deactivateAndHide();
        this._helpWindow.setText(this._helpTexts[0] || '');
        this._helpWindow.show();
        this.refreshComplete();
    };

    Window_GlossaryOverlay.prototype.activateConfirmWindow = function() {
        this._glossaryListWindow.deactivate();
        this._confirmWindow.updatePlacement();
        this._confirmWindow.select(0);
        this._confirmWindow.activateAndShow();
        if (this._helpTexts[2]) {
            this._helpWindow.setText(this._helpTexts[2]);
            this._helpWindow.show();
        }
    };

    Window_GlossaryOverlay.prototype.onCancelCategory = function() { this.hide(); };
    Window_GlossaryOverlay.prototype.onOkCategory = function() { this.activateListWindow(true); };
    Window_GlossaryOverlay.prototype.onCancelList = function() {
        if ($gameParty.isUseGlossaryCategory()) {
            this.activateCategoryWindow(false);
        } else {
            this.hide();
        }
    };
    Window_GlossaryOverlay.prototype.onOkList = function() {
        if ($gameParty.isUseGlossaryConfirm()) {
            this.activateConfirmWindow();
        } else {
            this.onConfirmUse();
        }
    };
    Window_GlossaryOverlay.prototype.onConfirmUse = function() {
        this._confirmWindow.deactivateAndHide();
        var item = this._glossaryListWindow.item();
        $gameParty.setGlossarySelectVariableValue(item.id);
        $gameParty.setGlossarySelectSwitchValue(true);
        this.activateListWindow(false);
        if (this._helpTexts[3]) this._helpWindow.setText(this._helpTexts[3]);
    };
    Window_GlossaryOverlay.prototype.onConfirmCancel = function() {
        $gameParty.setGlossarySelectVariableValue(-1);
        $gameParty.setGlossarySelectSwitchValue(false);
        this._helpWindow.setText(this._helpTexts[0] || '');
        this.activateListWindow(false);
    };
    Window_GlossaryOverlay.prototype.refreshComplete = function() {
        if (this._completeWindow.visible) this._completeWindow.refresh();
    };

    //=====================================================================
    // 4. Интеграция в сцену битвы (блокировка ввода)
    //=====================================================================
    var _Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
    Scene_Battle.prototype.isAnyInputWindowActive = function() {
        if (this._glossaryOverlay && this._glossaryOverlay._active) return true;
        return _Scene_Battle_isAnyInputWindowActive.call(this);
    };

})();
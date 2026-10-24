//=============================================================================
// A_reatreat_fix.js
// Отключает визуальное движение актёров при попытке побега.
// Теперь также гарантирует срабатывание Custom Remove Effect при успешном побеге.
// Добавлена кнопка закрытия (ESC) в правом верхнем углу боя.
// Кнопка видна в ход противника и при выборе цели.
// Кнопка скрыта во время сообщений и при открытом оверлее глоссария.
//=============================================================================

/*:
 * @plugindesc Отключает анимацию побега + кнопка ESC в бою.
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
 * @default 5
 *
 * @param closeBtnMarginTop
 * @text Отступ кнопки закрытия сверху
 * @type number
 * @default 160
 *
 * @param closeBtnScale
 * @text Масштаб кнопки закрытия
 * @type number
 * @decimals 2
 * @default 1
 *
 * @help
 * 1. Отключает визуальное движение актёров при попытке побега.
 * 2. Гарантирует срабатывание Custom Remove Effect при успешном побеге.
 * 3. Добавляет кнопку закрытия (ESC) в правом верхнем углу боя.
 *    Кнопка видна и кликабельна только в ход игрока (включая выбор цели):
 *    - скрыта во время сообщений;
 *    - скрыта при открытом оверлее глоссария (BattleGlossaryButton).
 */

(function() {
    'use strict';

    // === Параметры кнопки закрытия ===
    var parameters = PluginManager.parameters('A_reatreat_fix');
    var closeBtnImage       = String(parameters['closeBtnImage'] || 'close');
    var closeBtnMarginRight = Number(parameters['closeBtnMarginRight'] || 5);
    var closeBtnMarginTop   = Number(parameters['closeBtnMarginTop'] || 160);
    var closeBtnScale       = Number(parameters['closeBtnScale'] || 1);

    // 1. Отключаем анимацию побега у спрайта (движение вправо)
    var _Sprite_Actor_performEscape = Sprite_Actor.prototype.performEscape;
    Sprite_Actor.prototype.performEscape = function() {
        // Ничего не делаем — персонаж остаётся на месте
    };

    // 2. Отключаем движение, вызываемое из Game_Actor, и принудительно удаляем состояния,
    //    чтобы гарантированно сработал Custom Remove Effect из YEP_BuffsStatesCore.
    var _Game_Actor_performEscapeSuccess = Game_Actor.prototype.performEscapeSuccess;
    Game_Actor.prototype.performEscapeSuccess = function() {
        // Убираем оригинальный вызов startMove(300, 0, 60)
        // Принудительно снимаем все состояния, помеченные "Remove at Battle End"
        // Это вызовет Game_Battler.removeState, который в YEP_BuffsStatesCore
        // запустит <Custom Remove Effect>.
        this.removeBattleStates();
    };

    //=============================================================================
    // Close Button in Scene_Battle (аналог ESC)
    //=============================================================================

    var _Scene_Battle_create = Scene_Battle.prototype.create;
    Scene_Battle.prototype.create = function() {
        _Scene_Battle_create.call(this);
        this.createCloseButton();
    };

    Scene_Battle.prototype.createCloseButton = function() {
        var bmp = ImageManager.loadPicture(closeBtnImage);
        this._closeButton = new Sprite(bmp);
        this._closeButton.scale.x = closeBtnScale;
        this._closeButton.scale.y = closeBtnScale;
        this._closeButton.opacity = 255;
        this._closeButton.visible = false;
        this._closeBtnHovered = false;
        // Кнопка добавляется в конец списка детей сцены, значит рисуется поверх всего.
        this.addChild(this._closeButton);
    };

    Scene_Battle.prototype.isCloseButtonTouched = function() {
        var s = this._closeButton;
        if (!s || !s.visible || !s.bitmap || !s.bitmap.isReady()) return false;
        var local = s.worldTransform.applyInverse({ x: TouchInput.x, y: TouchInput.y });
        return local.x >= 0 && local.y >= 0 &&
               local.x < s.width && local.y < s.height;
    };

    // Активен ли оверлей глоссария (BattleGlossaryButton).
    Scene_Battle.prototype.isGlossaryOverlayActive = function() {
        if (this._glossaryActive) return true;
        if (this._glossaryOverlay && this._glossaryOverlay._active) return true;
        return false;
    };

    // Имитация нажатия ESC (вызов processCancel у активного окна)
    Scene_Battle.prototype.onCloseButtonClick = function() {
        var win = null;
        
        // Порядок проверки важен: сначала проверяем окна, которые находятся "поверх" остальных
        // (например, окно выбора цели перекрывает окно выбора скилла).
        if (this._actorWindow && this._actorWindow.active && this._actorWindow.visible) {
            win = this._actorWindow;
        } else if (this._enemyWindow && this._enemyWindow.active && this._enemyWindow.visible) {
            win = this._enemyWindow;
        } else if (this._skillWindow && this._skillWindow.active && this._skillWindow.visible) {
            win = this._skillWindow;
        } else if (this._itemWindow && this._itemWindow.active && this._itemWindow.visible) {
            win = this._itemWindow;
        } else if (this._actorCommandWindow && this._actorCommandWindow.active && this._actorCommandWindow.visible) {
            win = this._actorCommandWindow;
        } else if (this._partyCommandWindow && this._partyCommandWindow.active && this._partyCommandWindow.visible) {
            win = this._partyCommandWindow;
        }

        if (win && typeof win.processCancel === 'function') {
            // processCancel сам проиграет звук отмены и вызовет нужный handler.
            // Проверяем isCancelEnabled, как это делает движок при нажатии ESC,
            // чтобы, например, не «выпрыгнуть» из окна выбора при одном актёре.
            if (typeof win.isCancelEnabled !== 'function' || win.isCancelEnabled()) {
                win.processCancel();
            }
        } else {
            // Fallback: если по каким-то причинам активного окна не нашли —
            // используем стандартный обработчик сцены.
            this.commandCancel();
        }
    };

    Scene_Battle.prototype.updateCloseButton = function() {
        var s = this._closeButton;
        if (!s || !s.bitmap) return false;

        // Активно ли окно ввода игрока (выбор действия, скилла, предмета, цели).
        // В ход противника эти окна неактивны — значит, кнопка скрыта.
        var inputWindowActive =
            (this._actorCommandWindow && this._actorCommandWindow.active) ||
            (this._skillWindow && this._skillWindow.active) ||
            (this._itemWindow && this._itemWindow.active) ||
            (this._actorWindow && this._actorWindow.active) ||
            (this._enemyWindow && this._enemyWindow.active);

        // Открыт ли оверлей глоссария — если да, у него своя close-кнопка.
        var glossaryActive = this.isGlossaryOverlayActive();

        // Кнопка видна и кликабельна только в ход игрока
        // и только когда оверлей глоссария закрыт.
        var canUse =
            inputWindowActive &&
            !$gameMessage.isBusy() &&
            !glossaryActive;

        s.visible = canUse;
        if (!canUse) return false;

        // Держим кнопку в правом верхнем углу
        if (s.bitmap.isReady()) {
            var w = s.bitmap.width * closeBtnScale;
            var h = s.bitmap.height * closeBtnScale;
            s.x = Graphics.boxWidth - w - closeBtnMarginRight;
            s.y = closeBtnMarginTop;
        }

        // Лёгкая подсветка при наведении
        var hovered = this.isCloseButtonTouched();
        if (hovered !== this._closeBtnHovered) {
            this._closeBtnHovered = hovered;
            s.opacity = hovered ? 200 : 255;
        }

        // Клик ЛКМ = ESC
        if (TouchInput.isTriggered() && hovered) {
            this.onCloseButtonClick();
            return true;
        }
        return false;
    };

    var _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);
        this.updateCloseButton();
    };

    var _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        if (this._closeButton) {
            this.removeChild(this._closeButton);
            this._closeButton = null;
        }
        _Scene_Battle_terminate.call(this);
    };

})();
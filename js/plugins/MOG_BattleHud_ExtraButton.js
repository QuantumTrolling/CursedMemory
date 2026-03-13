/*:
 * @target MV
 * @plugindesc (Addon) HUD кнопка в бою для MOG_BattleHud, с мгновенным восстановлением состояния после глоссария (без затемнения).
 * @help
 * ============================================================================
 * MOG_BattleHud Extra Button + Glossary Support
 * ============================================================================
 * Этот плагин добавляет в бою дополнительную кнопку, которая может запускать
 * общее событие или открывать глоссарий. При открытии глоссария состояние боя
 * полностью сохраняется (HP, состояния, скрытость врагов и т.д.) и мгновенно
 * восстанавливается после выхода из глоссария, без появления ранее невидимых
 * врагов.
 *
 * Для работы требуется плагин SceneGlossary.js (triacontane).
 *
 * Параметры:
 *   Extra Button Image      – имя картинки для кнопки (в папке img/pictures/)
 *   Extra Button X, Y       – координаты кнопки на экране
 *   Extra Button Common Event – ID общего события, которое запускается при нажатии
 *                             (если 0 – кнопка работает как открытие глоссария)
 *   Count As Turn           – считать ли нажатие за ход (true/false)
 *
 * Версия: 1.3 – добавлено сохранение Break Shields (Olivia_OctoBattle).
 */

var Imported = Imported || {};
Imported.MOG_BattleHud_ExtraButton = true;

var Moghunter = Moghunter || {};
Moghunter.parameters = PluginManager.parameters('MOG_BattleHud_ExtraButton');

Moghunter.bhud_extraBtnImage = String(Moghunter.parameters['Extra Button Image'] || "");
Moghunter.bhud_extraBtnX = Number(Moghunter.parameters['Extra Button X'] || 0);
Moghunter.bhud_extraBtnY = Number(Moghunter.parameters['Extra Button Y'] || 0);
Moghunter.bhud_extraBtnCE = Number(Moghunter.parameters['Extra Button Common Event'] || 0);
Moghunter.bhud_extraBtnTurn = String(Moghunter.parameters['Count As Turn'] || "true") === "true";

//=============================================================================
// restartTurn (если не существует)
//=============================================================================
if (!BattleManager.restartTurn) {
    BattleManager.restartTurn = function() {
        this._phase = 'turnEnd';
        this._preemptive = false;
        this._surprise = false;
        if (this.isForcedTurn()) this._turnForced = false;
    };
}

//=============================================================================
// [SAVE/RESTORE] Снимок состояния боя (с поддержкой Break Shields)
//=============================================================================
BattleManager._exBtnBattleSnapshot = null;
BattleManager._exBtnEventRunning = false;
BattleManager._exBtnRestorePending = false;
BattleManager._exBtnGlossaryReturnPending = false;  // флаг возврата из глоссария
BattleManager._exBtnGlossaryOpenedFromBattle = false;

BattleManager.exBtnMakeBattlerSnapshot = function(b) {
    if (!b) return null;
    return {
        hp: b._hp,
        mp: b._mp,
        tp: b._tp,
        states: b._states ? b._states.slice() : [],
        stateTurns: b._stateTurns ? JSON.parse(JSON.stringify(b._stateTurns)) : {},
        buffs: b._buffs ? b._buffs.slice() : [],
        buffTurns: b._buffTurns ? b._buffTurns.slice() : [],
        result: b._result ? JsonEx.makeDeepCopy(b._result) : null,
        // Добавлено для совместимости с Olivia_OctoBattle (Break Shields)
        breakShield: b._currentBreakShield
    };
};

BattleManager.exBtnApplyBattlerSnapshot = function(b, snap) {
    if (!b || !snap) return;
    b._hp = snap.hp;
    b._mp = snap.mp;
    b._tp = snap.tp;
    b._states = snap.states ? snap.states.slice() : [];
    b._stateTurns = snap.stateTurns ? JSON.parse(JSON.stringify(snap.stateTurns)) : {};
    b._buffs = snap.buffs ? snap.buffs.slice() : [];
    b._buffTurns = snap.buffTurns ? snap.buffTurns.slice() : [];
    if (snap.result) b._result = JsonEx.makeDeepCopy(snap.result);
    // Восстанавливаем Break Shields, если они были сохранены
    if (snap.breakShield !== undefined) b._currentBreakShield = snap.breakShield;
    b.refresh();
};

BattleManager.exBtnSaveBattleState = function() {
    if (this._exBtnBattleSnapshot) return;

    var snap = {};

    snap.phase = this._phase;
    snap.actorIndex = this._actorIndex;
    snap.inputting = this._inputting;
    snap.turnForced = this._turnForced;
    snap.preemptive = this._preemptive;
    snap.surprise = this._surprise;
    snap.subject = this._subject;
    snap.turnCount = this._turnCount;

    snap.actionBattlers = this._actionBattlers ? this._actionBattlers.slice() : null;

    snap.partyBattlers = [];
    var p = $gameParty ? $gameParty.battleMembers() : [];
    for (var i = 0; i < p.length; i++) {
        snap.partyBattlers[i] = this.exBtnMakeBattlerSnapshot(p[i]);
    }

    snap.troopBattlers = [];
    var t = $gameTroop ? $gameTroop.members() : [];
    for (var j = 0; j < t.length; j++) {
        snap.troopBattlers[j] = this.exBtnMakeBattlerSnapshot(t[j]);
    }

    snap.enemyHidden = [];
    var members = $gameTroop ? $gameTroop.members() : [];
    for (var k = 0; k < members.length; k++) {
        var e = members[k];
        snap.enemyHidden[k] = e ? !!e._hidden : false;
    }

    snap.enemySpriteState = [];
    if (SceneManager._scene && SceneManager._scene._spriteset) {
        var es = SceneManager._scene._spriteset._enemySprites || [];
        for (var m = 0; m < es.length; m++) {
            var spr = es[m];
            snap.enemySpriteState[m] = spr ? {
                visible: spr.visible,
                opacity: spr.opacity
            } : null;
        }
    }

    this._exBtnBattleSnapshot = snap;
};

BattleManager.exBtnRestoreBattleState = function() {
    var snap = this._exBtnBattleSnapshot;
    if (!snap) return;

    this._phase = snap.phase;
    this._actorIndex = snap.actorIndex;
    this._inputting = snap.inputting;
    this._turnForced = snap.turnForced;
    this._preemptive = snap.preemptive;
    this._surprise = snap.surprise;
    this._subject = snap.subject;
    this._turnCount = snap.turnCount;

    if (snap.actionBattlers) {
        this._actionBattlers = snap.actionBattlers.slice();
    }

    var members = $gameTroop ? $gameTroop.members() : [];
    for (var i = 0; i < members.length; i++) {
        var e = members[i];
        if (!e) continue;
        e._hidden = !!snap.enemyHidden[i];
    }

    var p = $gameParty ? $gameParty.battleMembers() : [];
    for (var k = 0; k < p.length; k++) {
        this.exBtnApplyBattlerSnapshot(p[k], snap.partyBattlers ? snap.partyBattlers[k] : null);
    }

    var t = $gameTroop ? $gameTroop.members() : [];
    for (var m = 0; m < t.length; m++) {
        this.exBtnApplyBattlerSnapshot(t[m], snap.troopBattlers ? snap.troopBattlers[m] : null);
    }

    // Принудительно синхронизируем спрайты врагов
    if (SceneManager._scene && SceneManager._scene._spriteset) {
        var es = SceneManager._scene._spriteset._enemySprites || [];
        for (var j = 0; j < es.length; j++) {
            var spr = es[j];
            if (!spr || !spr._battler) continue;

            if (spr._battler.isHidden()) {
                spr._appeared = false;
                spr.visible = false;
                spr.opacity = 0;
                spr._effectType = null;
                spr._effectDuration = 0;
            } else {
                spr._appeared = true;
                spr.visible = true;
                spr.opacity = 255;
                spr._effectType = null;
                spr._effectDuration = 0;
            }
            spr.update();
        }
        SceneManager._scene._spriteset.update();
    }

    // Сбрасываем флаги плагина волн (если есть)
    if ($gameSystem._consBaPhase) {
        $gameSystem._consBaPhase = [false, false];
    }

    this._exBtnBattleSnapshot = null;
};

//=============================================================================
// Автовозврат после завершения Common Event
//=============================================================================
var _mog_exbtn_BM_updateEventMain = BattleManager.updateEventMain;
BattleManager.updateEventMain = function() {
    var result = _mog_exbtn_BM_updateEventMain.call(this);

    if (this._exBtnEventRunning) {
        if (!$gameTroop.isEventRunning() && !$gameMessage.isBusy()) {
            this._exBtnEventRunning = false;
            this._exBtnRestorePending = true;
            // Затемнение удалено
        }
    }

    return result;
};

//=============================================================================
// Основное обновление сцены битвы (добавлена обработка возврата из глоссария)
//=============================================================================
var _base_sceneBattle_update = Scene_Battle.prototype.update;

Scene_Battle.prototype.update = function() {
    // Если есть ожидающее восстановление после Common Event
    if (BattleManager._exBtnRestorePending) {
        BattleManager._exBtnRestorePending = false;
        BattleManager.exBtnRestoreBattleState();
        if (this._spriteset) {
            this._spriteset.update();
        }
    }

    // Если есть ожидающее восстановление после глоссария
    if (BattleManager._exBtnGlossaryReturnPending && SceneManager._scene === this) {
        BattleManager._exBtnGlossaryReturnPending = false;
        // Восстанавливаем состояние боя
        if (typeof BattleManager.exBtnRestoreBattleState === 'function') {
            BattleManager.exBtnRestoreBattleState();
        }
        // Затемнение удалено
    }

    _base_sceneBattle_update.call(this);
    this.updateBattleHudExtraButton();
    this.updateExtraButtonEvent();
};

//=============================================================================
// Создание кнопки (без затемнения)
//=============================================================================
var _mog_exbtn_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function() {
    _mog_exbtn_createSpriteset.call(this);
    this.createBattleHudExtraButton();
    // createExtraButtonFade() удалён
};

Scene_Battle.prototype.createBattleHudExtraButton = function() {
    if (!Moghunter.bhud_extraBtnImage) return;
    if (Moghunter.bhud_extraBtnCE <= 0) return;

    this._bhudExtraButton = new Sprite(ImageManager.loadPicture(Moghunter.bhud_extraBtnImage));
    this._bhudExtraButton.anchor.set(0.5);
    this._bhudExtraButton.x = Moghunter.bhud_extraBtnX;
    this._bhudExtraButton.y = Moghunter.bhud_extraBtnY;

    this.addChild(this._bhudExtraButton);
};

//=============================================================================
// Обработка нажатия на кнопку
//=============================================================================
Scene_Battle.prototype.updateBattleHudExtraButton = function() {
    if (!this._bhudExtraButton || !$gameParty.inBattle()) return;
    if (!this._bhudExtraButton.bitmap.isReady()) return;

    var canUse = BattleManager.isInputting() && !$gameMessage.isBusy();
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

        // Если задано общее событие – запускаем его, иначе открываем глоссарий
        if (Moghunter.bhud_extraBtnCE > 0) {
            // Запуск общего события
            BattleManager.exBtnSaveBattleState();
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
            // Открытие глоссария
            if (typeof $gameParty.setSelectedGlossaryType === 'function') {
                BattleManager.exBtnSaveBattleState();          // сохраняем состояние боя
                BattleManager._exBtnGlossaryOpenedFromBattle = true;
                $gameParty.setSelectedGlossaryType(1);        // тип глоссария (можно параметризовать)
                SceneManager.push(Scene_Glossary);
            }
        }
    }
};

Scene_Battle.prototype.updateExtraButtonEvent = function() {
    if (this._delayBattleEvent > 0) {
        this._delayBattleEvent--;
        if (this._delayBattleEvent === 0) {
            BattleManager.updateEvent();
            BattleManager.updateEventMain();
        }
    }
};

//=============================================================================
// Дополнительная защита спрайтов врагов (на всякий случай)
//=============================================================================
var _exBtn_spriteEnemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
    _exBtn_spriteEnemy_update.call(this);

    if (this._battler && this._battler.isHidden()) {
        this._appeared = false;
        this.visible = false;
        this.opacity = 0;
        this._effectType = null;
        this._effectDuration = 0;
    }
};

//=============================================================================
// Обработка открытия/закрытия глоссария
//=============================================================================
var _Scene_Glossary_initialize = Scene_Glossary.prototype.initialize;
Scene_Glossary.prototype.initialize = function() {
    _Scene_Glossary_initialize.call(this);
    var currentScene = SceneManager._scene;
    if (currentScene instanceof Scene_Battle) {
        // Если глоссарий открыт из боя – ставим флаг (сохранение уже выполнено в кнопке)
        BattleManager._exBtnGlossaryOpenedFromBattle = true;
    } else {
        BattleManager._exBtnGlossaryOpenedFromBattle = false;
    }
};

var _Scene_Glossary_terminate = Scene_Glossary.prototype.terminate;
Scene_Glossary.prototype.terminate = function() {
    _Scene_Glossary_terminate.call(this);
    if (BattleManager._exBtnGlossaryOpenedFromBattle) {
        // При закрытии глоссария, открытого из боя, ставим флаг восстановления
        BattleManager._exBtnGlossaryReturnPending = true;
    }
};

//=============================================================================
// Конец файла
//=============================================================================
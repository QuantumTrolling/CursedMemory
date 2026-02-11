/*:
 * @target MV
 * @plugindesc (Addon) HUD кнопка в бою для MOG_BattleHud, мгновенно запускающая Common Event (с сохранением прогресса боя)
 *
 * @param --- Extra Battle Button ---
 * @default
 *
 * @param Extra Button Image
 * @parent --- Extra Battle Button ---
 * @desc Имя файла из img/pictures (без .png)
 * @default
 *
 * @param Extra Button X
 * @parent --- Extra Battle Button ---
 * @type number
 * @default 0
 *
 * @param Extra Button Y
 * @parent --- Extra Battle Button ---
 * @type number
 * @default 0
 *
 * @param Extra Button Common Event
 * @parent --- Extra Battle Button ---
 * @type common_event
 * @default 0
 *
 * @param Count As Turn
 * @type boolean
 * @default true
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
// [SAVE/RESTORE] Снимок состояния боя перед Common Event
//=============================================================================
BattleManager._exBtnBattleSnapshot = null;
BattleManager._exBtnEventRunning = false;

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

        // иногда помогает избежать визуальных глюков
        result: b._result ? JsonEx.makeDeepCopy(b._result) : null
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

    // рефреш чтобы иконки/параметры обновились
    b.refresh();
};

BattleManager.exBtnSaveBattleState = function() {
    // защита от двойного клика
    if (this._exBtnBattleSnapshot) return;

    var snap = {};

    // Состояние BattleManager
    snap.phase = this._phase;
    snap.actorIndex = this._actorIndex;
    snap.inputting = this._inputting;
    snap.turnForced = this._turnForced;
    snap.preemptive = this._preemptive;
    snap.surprise = this._surprise;
    snap.subject = this._subject;
    snap.turnCount = this._turnCount;

    // Массив actionBattlers (копия)
    snap.actionBattlers = this._actionBattlers ? this._actionBattlers.slice() : null;

    // Снапшот ВСЕХ battler'ов (актеры + враги)
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

    // Скрытость врагов (Game_Enemy._hidden)
    snap.enemyHidden = [];
    var members = $gameTroop ? $gameTroop.members() : [];
    for (var k = 0; k < members.length; k++) {
        var e = members[k];
        snap.enemyHidden[k] = e ? !!e._hidden : false;
    }

    // Видимость/opacity спрайтов врагов (на случай если refresh их ломает)
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

    // Восстановление BattleManager
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

    // Восстановление скрытости врагов
    var members = $gameTroop ? $gameTroop.members() : [];
    for (var i = 0; i < members.length; i++) {
        var e = members[i];
        if (!e) continue;
        e._hidden = !!snap.enemyHidden[i];
    }

    // Восстановление состояния спрайтов врагов
    if (SceneManager._scene && SceneManager._scene._spriteset) {
        var es = SceneManager._scene._spriteset._enemySprites || [];
        for (var j = 0; j < es.length; j++) {
            var spr = es[j];
            var st = snap.enemySpriteState[j];
            if (!spr || !st) continue;
            spr.visible = st.visible;
            spr.opacity = st.opacity;
        }
    }

    // Восстановление состояний/баффов/HP/MP/TP у актеров
    var p = $gameParty ? $gameParty.battleMembers() : [];
    for (var k = 0; k < p.length; k++) {
        this.exBtnApplyBattlerSnapshot(p[k], snap.partyBattlers ? snap.partyBattlers[k] : null);
    }

    // Восстановление состояний/баффов/HP/MP/TP у врагов
    var t = $gameTroop ? $gameTroop.members() : [];
    for (var m = 0; m < t.length; m++) {
        this.exBtnApplyBattlerSnapshot(t[m], snap.troopBattlers ? snap.troopBattlers[m] : null);
    }

    this._exBtnBattleSnapshot = null;
};

//=============================================================================
// Автовозврат после завершения Common Event
//=============================================================================
var _mog_exbtn_BM_updateEventMain = BattleManager.updateEventMain;
BattleManager.updateEventMain = function() {
    var result = _mog_exbtn_BM_updateEventMain.call(this);

    // Если событие было запущено кнопкой и оно уже закончилось — вернуть бой
    if (this._exBtnEventRunning) {
        if (!$gameTroop.isEventRunning() && !$gameMessage.isBusy()) {
            this._exBtnEventRunning = false;
            this.exBtnRestoreBattleState();
        }
    }

    return result;
};

//=============================================================================
// CREATE BUTTON
//=============================================================================
var _mog_exbtn_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function() {
    _mog_exbtn_createSpriteset.call(this);
    this.createBattleHudExtraButton();
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
// UPDATE
//=============================================================================
var _mog_exbtn_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _mog_exbtn_update.call(this);
    this.updateBattleHudExtraButton();
    this.updateExtraButtonEvent();
};

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

        // [SAVE] сохраняем состояние боя ДО любых изменений
        BattleManager.exBtnSaveBattleState();
        BattleManager._exBtnEventRunning = true;

        // 🔻 СБРОС ВВОДА ТЕКУЩЕГО АКТЁРА (MV способ)
        BattleManager._actorIndex = -1;
        BattleManager._inputting = false;

        // Резервируем событие
        $gameTemp.reserveCommonEvent(Moghunter.bhud_extraBtnCE);

        if (Moghunter.bhud_extraBtnTurn) {
            // Засчитать как завершение хода
            BattleManager.restartTurn();
        } else {
            // Просто перейти к обработке событий
            BattleManager._phase = 'event';
        }

        // Немедленно запустить обработку событий
        this._delayBattleEvent = 1;
    }
};

//=============================================================================
// 🔥 МГНОВЕННЫЙ ЗАПУСК ОБЩЕГО СОБЫТИЯ
//=============================================================================
Scene_Battle.prototype.updateExtraButtonEvent = function() {
    if (this._delayBattleEvent > 0) {
        this._delayBattleEvent--;
        if (this._delayBattleEvent === 0) {
            BattleManager.updateEvent();
            BattleManager.updateEventMain();
        }
    }
};

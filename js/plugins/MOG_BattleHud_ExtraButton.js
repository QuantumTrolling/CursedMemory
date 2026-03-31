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
 * Версия: 1.8 – добавлено сохранение и восстановление навыков акторов.
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
// [SAVE/RESTORE] Снимок состояния боя (с поддержкой Break Shields и позиций)
//=============================================================================
BattleManager._exBtnBattleSnapshot = null;
BattleManager._exBtnEventRunning = false;
BattleManager._exBtnRestorePending = false;
BattleManager._exBtnGlossaryReturnPending = false;
BattleManager._exBtnGlossaryOpenedFromBattle = false;

BattleManager.exBtnMakeBattlerSnapshot = function(b) {
    if (!b) return null;
    var snap = {
        hp: b._hp,
        mp: b._mp,
        tp: b._tp,
        states: b._states ? b._states.slice() : [],
        stateTurns: b._stateTurns ? JSON.parse(JSON.stringify(b._stateTurns)) : {},
        buffs: b._buffs ? b._buffs.slice() : [],
        buffTurns: b._buffTurns ? b._buffTurns.slice() : [],
        result: b._result ? JsonEx.makeDeepCopy(b._result) : null,
        breakShield: b._currentBreakShield,
        row: b._row
    };
    // Сохраняем навыки для акторов
    if (b.isActor && b.isActor()) {
        snap.skills = b._skills ? b._skills.slice() : [];
    }
    return snap;
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
    if (snap.breakShield !== undefined) b._currentBreakShield = snap.breakShield;
    if (snap.row !== undefined) b._row = snap.row;
    // Восстанавливаем навыки для акторов
    if (snap.skills && b.isActor && b.isActor()) {
        b._skills = snap.skills.slice();
    }
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

    // Состояние партии
    snap.partyBattlers = [];
    var p = $gameParty ? $gameParty.battleMembers() : [];
    for (var i = 0; i < p.length; i++) {
        snap.partyBattlers[i] = this.exBtnMakeBattlerSnapshot(p[i]);
    }

    // Состояние врагов
    snap.troopBattlers = [];
    var t = $gameTroop ? $gameTroop.members() : [];
    for (var j = 0; j < t.length; j++) {
        snap.troopBattlers[j] = this.exBtnMakeBattlerSnapshot(t[j]);
    }

    // Скрытость врагов
    snap.enemyHidden = [];
    var members = $gameTroop ? $gameTroop.members() : [];
    for (var k = 0; k < members.length; k++) {
        var e = members[k];
        snap.enemyHidden[k] = e ? !!e._hidden : false;
    }

    // Состояние спрайтов врагов
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

    // Сохранение позиций акторов (ключевой момент)
    snap.actorPositions = [];
    if (SceneManager._scene && SceneManager._scene._spriteset) {
        var actorSprites = SceneManager._scene._spriteset._actorSprites || [];
        for (var n = 0; n < actorSprites.length; n++) {
            var spr = actorSprites[n];
            snap.actorPositions[n] = spr ? { x: spr.x, y: spr.y } : null;
        }
    }

    this._exBtnBattleSnapshot = snap;
};

BattleManager.exBtnRestoreBattleState = function() {
    var snap = this._exBtnBattleSnapshot;
    if (!snap) return;

    // Сбрасываем флаг запроса обновления рядов, чтобы предотвратить автоматический пересчёт
    this._refreshRows = false;

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

        // ---- Временное снятие состояния смерти для акторов (ID=1) ----
        var deathStateId = 1;
        var actorsWithDeath = [];
        for (var a = 0; a < p.length; a++) {
            var actor = p[a];
            if (actor && actor._states && actor._states.contains(deathStateId)) {
                actorsWithDeath.push(actor);
                actor._states = actor._states.filter(function(id) { return id !== deathStateId; });
                actor.refresh(); // обновляем, чтобы снять эффекты состояния
            }
        }
        // --------------------------------------------------------------

        // Восстановление позиций акторов (включая мёртвых) с учётом блокировки движения
        if (snap.actorPositions) {
            var actorSprites = SceneManager._scene._spriteset._actorSprites || [];
            for (var a = 0; a < actorSprites.length; a++) {
                var spr = actorSprites[a];
                var pos = snap.actorPositions[a];
                if (spr && pos) {
                    // Принудительно устанавливаем координаты
                    spr.x = pos.x;
                    spr.y = pos.y;
                    // Обновляем домашние координаты (для YEP_RowFormation)
                    spr._homeX = pos.x;
                    spr._homeY = pos.y;
                    // Сбрасываем все смещения и движение
                    spr._offsetX = 0;
                    spr._offsetY = 0;
                    spr._targetOffsetX = 0;
                    spr._targetOffsetY = 0;
                    spr._movementDuration = 0;
                    // Если у спрайта есть метод setHome (из YEP_RowFormation), вызываем его для фиксации
                    if (typeof spr.setHome === 'function') {
                        spr.setHome(pos.x, pos.y);
                    }
                    // Обновляем спрайт, чтобы изменения применились
                    spr.update();
                }
            }
        }

        // ---- Возвращаем состояние смерти акторам ----
        for (var a = 0; a < actorsWithDeath.length; a++) {
            var actor = actorsWithDeath[a];
            if (actor && !actor._states.contains(deathStateId)) {
                actor._states.push(deathStateId);
                actor.refresh();
            }
        }
        // ----------------------------------------------
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
        }
    }

    return result;
};

//=============================================================================
// Основное обновление сцены битвы
//=============================================================================
var _base_sceneBattle_update = Scene_Battle.prototype.update;

Scene_Battle.prototype.update = function() {
    if (BattleManager._exBtnRestorePending) {
        BattleManager._exBtnRestorePending = false;
        BattleManager.exBtnRestoreBattleState();
        if (this._spriteset) {
            this._spriteset.update();
        }
    }

    if (BattleManager._exBtnGlossaryReturnPending && SceneManager._scene === this) {
        BattleManager._exBtnGlossaryReturnPending = false;
        if (typeof BattleManager.exBtnRestoreBattleState === 'function') {
            BattleManager.exBtnRestoreBattleState();
        }
    }

    _base_sceneBattle_update.call(this);
    this.updateBattleHudExtraButton();
    this.updateExtraButtonEvent();
};

//=============================================================================
// Создание кнопки
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

        if (Moghunter.bhud_extraBtnCE > 0) {
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
            if (typeof $gameParty.setSelectedGlossaryType === 'function') {
                BattleManager.exBtnSaveBattleState();
                BattleManager._exBtnGlossaryOpenedFromBattle = true;
                $gameParty.setSelectedGlossaryType(1);
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
// Защита спрайтов врагов
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
        BattleManager._exBtnGlossaryOpenedFromBattle = true;
    } else {
        BattleManager._exBtnGlossaryOpenedFromBattle = false;
    }
};

var _Scene_Glossary_terminate = Scene_Glossary.prototype.terminate;
Scene_Glossary.prototype.terminate = function() {
    _Scene_Glossary_terminate.call(this);
    if (BattleManager._exBtnGlossaryOpenedFromBattle) {
        BattleManager._exBtnGlossaryReturnPending = true;
    }
};

//=============================================================================
// Конец файла
//=============================================================================
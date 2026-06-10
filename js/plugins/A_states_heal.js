// =============================================================================
// Heal State Triggers
// For RPG Maker MV
// Requires YEP_BuffsStatesCore
// =============================================================================

var Imported = Imported || {};
Imported.HealStateTriggers = true;

(function() {

  //=============================================================================
  // DataManager
  //=============================================================================
  var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function() {
    if (!_DataManager_isDatabaseLoaded.call(this)) return false;
    if (!DataManager._HealStateTriggersLoaded) {
      this.processHealStateNotetags($dataStates);
      DataManager._HealStateTriggersLoaded = true;
    }
    return true;
  };

  DataManager.processHealStateNotetags = function(group) {
    for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      if (!obj) continue;
      obj.customHealEffect = "";
      obj.customAllyHealEffect = "";
      obj.customPartyHealEffect = "";
      obj.customAllyActionEffect = "";   // новый тип
      var notedata = obj.note.split(/[\r\n]+/);
      var mode = "";
      for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (/<CUSTOM HEAL EFFECT>/i.test(line)) {
          mode = "heal";
          continue;
        }
        if (/<\/CUSTOM HEAL EFFECT>/i.test(line)) {
          mode = "";
          continue;
        }
        if (/<CUSTOM ALLY HEAL EFFECT>/i.test(line)) {
          mode = "allyheal";
          continue;
        }
        if (/<\/CUSTOM ALLY HEAL EFFECT>/i.test(line)) {
          mode = "";
          continue;
        }
        if (/<CUSTOM PARTY HEAL EFFECT>/i.test(line)) {
          mode = "partyheal";
          continue;
        }
        if (/<\/CUSTOM PARTY HEAL EFFECT>/i.test(line)) {
          mode = "";
          continue;
        }
        // Новый тег действия на союзника
        if (/<CUSTOM ALLY ACTION EFFECT>/i.test(line)) {
          mode = "allyaction";
          continue;
        }
        if (/<\/CUSTOM ALLY ACTION EFFECT>/i.test(line)) {
          mode = "";
          continue;
        }
        if (mode === "heal") {
          obj.customHealEffect += line + "\n";
        }
        if (mode === "allyheal") {
          obj.customAllyHealEffect += line + "\n";
        }
        if (mode === "partyheal") {
          obj.customPartyHealEffect += line + "\n";
        }
        if (mode === "allyaction") {
          obj.customAllyActionEffect += line + "\n";
        }
      }
    }
  };

  //=============================================================================
  // BattleManager healer tracking
  //=============================================================================
  var _BattleManager_startAction = BattleManager.startAction;
  BattleManager.startAction = function() {
    this._healStateSubject = this._subject;
    _BattleManager_startAction.call(this);
  };

  //=============================================================================
  // Healing Detection — перехватываем setHp (прямые изменения здоровья)
  //=============================================================================
  var _Game_BattlerBase_setHp = Game_BattlerBase.prototype.setHp;
  Game_BattlerBase.prototype.setHp = function(hp) {
    var oldHp = this.hp;
    _Game_BattlerBase_setHp.call(this, hp);
    var healAmount = this.hp - oldHp;
    if (healAmount <= 0) return;
    if (this.processHealStateEffects) {
      var healer = BattleManager._healStateSubject || this;
      this.processHealStateEffects(healAmount, healer);
    }
  };

  //=============================================================================
  // Healing Detection — дополняем gainHp (лечение через навыки/скрипты)
  //=============================================================================
  var _Game_Battler_gainHp = Game_Battler.prototype.gainHp;
  Game_Battler.prototype.gainHp = function(value) {
    _Game_Battler_gainHp.call(this, value);
    if (value > 0 && this.processHealStateEffects) {
      var healer = BattleManager._healStateSubject || this;
      this.processHealStateEffects(value, healer);
    }
  };

  //=============================================================================
  // Heal Processing (оставляем без изменений)
  //=============================================================================
  Game_Battler.prototype.processHealStateEffects = function(value, healer) {
    var target = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;

    // SELF HEAL EFFECT
    var states = target.states();
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      if (!state) continue;
      if (!state.customHealEffect) continue;
      if (state.customHealEffect.length <= 0) continue;
      var user = target;
      var stateId = state.id;
      try {
        eval(state.customHealEffect);
      } catch (e) {
        console.error(e);
      }
    }

    // PARTY / ALLY EFFECTS
    var unit = target.isActor() ? $gameParty : $gameTroop;
    var members = unit.members();
    for (var m = 0; m < members.length; m++) {
      var battler = members[m];
      if (!battler) continue;
      var battlerStates = battler.states();
      for (var j = 0; j < battlerStates.length; j++) {
        var state = battlerStates[j];
        if (!state) continue;
        var user = battler;
        var stateId = state.id;

        if (state.customPartyHealEffect && state.customPartyHealEffect.length > 0) {
          try {
            eval(state.customPartyHealEffect);
          } catch (e) {
            console.error(e);
          }
        }

        if (battler !== target && state.customAllyHealEffect && state.customAllyHealEffect.length > 0) {
          try {
            eval(state.customAllyHealEffect);
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  };

  //=============================================================================
  // Ally Action Detection — перехватываем выполнение действий
  //=============================================================================
  var _Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function(target) {
    _Game_Action_apply.call(this, target);   // выполняем оригинал
    this.processAllyActionEffect(target);    // затем кастомный эффект
  };

  Game_Action.prototype.processAllyActionEffect = function(target) {
    var user = this.subject();
    if (!user || !target) return;

    // Проверяем, что цель — союзник и не сам пользователь
    if (target === user) return;
    if (user.isActor() !== target.isActor()) return; // оба в одной команде
    if (!user.isAlive() || !target.isAlive()) return;

    // Проверяем состояния пользователя
    var states = user.states();
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      if (!state) continue;
      if (!state.customAllyActionEffect) continue;
      if (state.customAllyActionEffect.length <= 0) continue;

      var stateId = state.id;
      var s = $gameSwitches._data;
      var v = $gameVariables._data;
      var item = this.item();  // навык или предмет
      try {
        eval(state.customAllyActionEffect);
      } catch (e) {
        console.error(e);
      }
    }
  };

})();
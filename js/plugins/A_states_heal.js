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
        if (mode === "heal") {
          obj.customHealEffect += line + "\n";
        }
        if (mode === "allyheal") {
          obj.customAllyHealEffect += line + "\n";
        }
        if (mode === "partyheal") {
          obj.customPartyHealEffect += line + "\n";
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
  // Heal Processing
  //=============================================================================
  Game_Battler.prototype.processHealStateEffects = function(value, healer) {
    var target = this; // получатель лечения

    // Общие переменные для всех eval
    var s = $gameSwitches._data;
    var v = $gameVariables._data;

    //----------------------------------------------------------------------
    // SELF HEAL EFFECT
    //----------------------------------------------------------------------
    var states = target.states();
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      if (!state) continue;
      if (!state.customHealEffect) continue;
      if (state.customHealEffect.length <= 0) continue;

      var user = target;   // для SELF: user = получатель = носитель
      var stateId = state.id;

      try {
        eval(state.customHealEffect);
      } catch (e) {
        console.error(e);
      }
    }

    //----------------------------------------------------------------------
    // PARTY / ALLY EFFECTS
    //----------------------------------------------------------------------
    var unit = target.isActor() ? $gameParty : $gameTroop;
    var members = unit.members();
    for (var m = 0; m < members.length; m++) {
      var battler = members[m];
      if (!battler) continue;
      var battlerStates = battler.states();
      for (var j = 0; j < battlerStates.length; j++) {
        var state = battlerStates[j];
        if (!state) continue;

        var user = battler;       // носитель состояния
        var stateId = state.id;
        // target уже определён выше — получатель лечения

        // PARTY (включая самого получателя)
        if (state.customPartyHealEffect && state.customPartyHealEffect.length > 0) {
          try {
            eval(state.customPartyHealEffect);
          } catch (e) {
            console.error(e);
          }
        }

        // ALLY (только если носитель НЕ является получателем)
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

})();
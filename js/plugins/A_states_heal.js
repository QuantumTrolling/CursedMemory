// =============================================================================
// Heal State Triggers (Extended) — Fixed Ally Trigger
// For RPG Maker MV
// Requires YEP_BuffsStatesCore
// =============================================================================
// Fix: ally trigger now works regardless of target (ally or enemy)
// New tags: <Ally Trigger Skills: id1,id2,...> and <Ally Trigger State: id>

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
      obj.customAllyActionEffect = "";
      obj.allyTriggerSkillIds = [];
      obj.allyTriggerStateId = 0;
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
        if (/<ALLY TRIGGER SKILLS:\s*(.*)>/i.test(line)) {
          var ids = RegExp.$1.split(',').map(function(s) { return Number(s); });
          obj.allyTriggerSkillIds = ids;
        }
        if (/<ALLY TRIGGER STATE:\s*(\d+)>/i.test(line)) {
          obj.allyTriggerStateId = Number(RegExp.$1);
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
  // Healing Detection (setHp)
  //=============================================================================
  var _Game_BattlerBase_setHp = Game_BattlerBase.prototype.setHp;
  Game_BattlerBase.prototype.setHp = function(hp) {
    var oldHp = this.hp;
    _Game_BattlerBase_setHp.call(this, hp);
    var healAmount = this.hp - oldHp;
    if (healAmount <= 0) return;
    if (!$gameParty.inBattle()) return;
    if (this.processHealStateEffects) {
      var healer = BattleManager._healStateSubject || this;
      this.processHealStateEffects(healAmount, healer);
    }
  };

  //=============================================================================
  // Healing Detection (gainHp)
  //=============================================================================
  var _Game_Battler_gainHp = Game_Battler.prototype.gainHp;
  Game_Battler.prototype.gainHp = function(value) {
    _Game_Battler_gainHp.call(this, value);
    if (value > 0 && this.processHealStateEffects) {
      if (!$gameParty.inBattle()) return;
      var healer = BattleManager._healStateSubject || this;
      this.processHealStateEffects(value, healer);
    }
  };

  //=============================================================================
  // Heal Processing
  //=============================================================================
  Game_Battler.prototype.processHealStateEffects = function(value, healer) {
    var target = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;

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
  // Action Apply — запускаем и старый eval, и новый триггер
  //=============================================================================
  var _Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function(target) {
    _Game_Action_apply.call(this, target);
    this.processAllyActionEffect(target);      // старый CUSTOM ALLY ACTION EFFECT
    this.processAllyTriggerEffects(target);    // НОВЫЙ триггер
  };

  Game_Action.prototype.processAllyActionEffect = function(target) {
    var user = this.subject();
    if (!user || !target) return;
    if (target === user) return;
    if (user.isActor() !== target.isActor()) return;
    if (!user.isAlive() || !target.isAlive()) return;

    var states = user.states();
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      if (!state) continue;
      if (!state.customAllyActionEffect) continue;
      if (state.customAllyActionEffect.length <= 0) continue;

      var stateId = state.id;
      var s = $gameSwitches._data;
      var v = $gameVariables._data;
      var item = this.item();
      try {
        eval(state.customAllyActionEffect);
      } catch (e) {
        console.error(e);
      }
    }
  };

  //=============================================================================
  // НОВЫЙ Ally Trigger Effects (работает при ЛЮБОМ использовании навыка)
  //=============================================================================
  Game_Action.prototype.processAllyTriggerEffects = function(target) {
    var user = this.subject();
    // Только если действует актёр
    if (!user || !user.isActor()) return;
    if (!user.isAlive()) return;

    var item = this.item();
    if (!item || !item.id) return;
    var skillId = item.id;

    // Проверяем всех союзников (кроме самого user)
    var members = $gameParty.aliveMembers();
    for (var i = 0; i < members.length; i++) {
      var battler = members[i];
      if (battler === user) continue;  // пропускаем того, кто использовал навык
      var states = battler.states();
      for (var j = 0; j < states.length; j++) {
        var state = states[j];
        if (!state) continue;
        if (!state.allyTriggerSkillIds || state.allyTriggerSkillIds.length === 0) continue;
        if (!state.allyTriggerStateId || state.allyTriggerStateId <= 0) continue;
        if (state.allyTriggerSkillIds.indexOf(skillId) >= 0) {
          battler.addState(state.allyTriggerStateId);
          // battler.startDamagePopup();  // раскомментируйте, если нужна всплывашка
        }
      }
    }
  };

})();
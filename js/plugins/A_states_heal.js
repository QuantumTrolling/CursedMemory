// =============================================================================
// Heal State Triggers (Extended) — Fixed Ally Trigger + Pre-Action Tag
// For RPG Maker MV
// Requires YEP_BuffsStatesCore
// =============================================================================
// New tag: <Ally Pre-Action: condRes,op,val,costRes,costPer,rewRes,rewAmt,stateId>

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
      obj.customAllyPreActionEffect = "";
      obj.allyTriggerSkillIds = [];
      obj.allyTriggerStateId = 0;
      obj.allyPreActionParams = null;
      var notedata = obj.note.split(/[\r\n]+/);
      var mode = "";
      for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (/<CUSTOM HEAL EFFECT>/i.test(line)) { mode = "heal"; continue; }
        if (/<\/CUSTOM HEAL EFFECT>/i.test(line)) { mode = ""; continue; }
        if (/<CUSTOM ALLY HEAL EFFECT>/i.test(line)) { mode = "allyheal"; continue; }
        if (/<\/CUSTOM ALLY HEAL EFFECT>/i.test(line)) { mode = ""; continue; }
        if (/<CUSTOM PARTY HEAL EFFECT>/i.test(line)) { mode = "partyheal"; continue; }
        if (/<\/CUSTOM PARTY HEAL EFFECT>/i.test(line)) { mode = ""; continue; }
        if (/<CUSTOM ALLY PRE-ACTION EFFECT>/i.test(line)) { mode = "allypreaction"; continue; }
        if (/<\/CUSTOM ALLY PRE-ACTION EFFECT>/i.test(line)) { mode = ""; continue; }
        if (/<CUSTOM ALLY ACTION EFFECT>/i.test(line)) { mode = "allyaction"; continue; }
        if (/<\/CUSTOM ALLY ACTION EFFECT>/i.test(line)) { mode = ""; continue; }

        // Короткий тег
        if (/<Ally Pre-Action:\s*([^>]*)>/i.test(line)) {
          var params = RegExp.$1.split(',').map(function(s) { return s.trim(); });
          obj.allyPreActionParams = {
            condResource: params[0] || 'tp',
            condOperator: params[1] || '<',
            condValue: Number(params[2]) || 50,
            costResource: params[3] || 'mp',
            costPerTarget: Number(params[4]) || 1,
            rewardResource: params[5] || 'tp',
            rewardAmount: Number(params[6]) || 50,
            rewardStateId: Number(params[7]) || 0
          };
          console.log("State " + obj.id + " loaded Ally Pre-Action params:", JSON.stringify(obj.allyPreActionParams));
        }

        if (mode === "heal") obj.customHealEffect += line + "\n";
        if (mode === "allyheal") obj.customAllyHealEffect += line + "\n";
        if (mode === "partyheal") obj.customPartyHealEffect += line + "\n";
        if (mode === "allypreaction") obj.customAllyPreActionEffect += line + "\n";
        if (mode === "allyaction") obj.customAllyActionEffect += line + "\n";

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
  // BattleManager (без pre-action, оставляем только healer tracking)
  //=============================================================================
  var _BattleManager_startAction = BattleManager.startAction;
  BattleManager.startAction = function() {
    this._healStateSubject = this._subject;
    _BattleManager_startAction.call(this);
  };

  //=============================================================================
  // Healing Detection
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

  var _Game_Battler_gainHp = Game_Battler.prototype.gainHp;
  Game_Battler.prototype.gainHp = function(value) {
    _Game_Battler_gainHp.call(this, value);
    if (value > 0 && this.processHealStateEffects) {
      if (!$gameParty.inBattle()) return;
      var healer = BattleManager._healStateSubject || this;
      this.processHealStateEffects(value, healer);
    }
  };

  Game_Battler.prototype.processHealStateEffects = function(value, healer) {
    var target = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var states = target.states();
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      if (!state || !state.customHealEffect || state.customHealEffect.length <= 0) continue;
      var user = target;
      var stateId = state.id;
      try { eval(state.customHealEffect); } catch (e) { console.error(e); }
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
          try { eval(state.customPartyHealEffect); } catch (e) { console.error(e); }
        }
        if (battler !== target && state.customAllyHealEffect && state.customAllyHealEffect.length > 0) {
          try { eval(state.customAllyHealEffect); } catch (e) { console.error(e); }
        }
      }
    }
  };

  //=============================================================================
  // Action Apply — pre-action ОДИН РАЗ перед обычным применением
  //=============================================================================
  var _Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function(target) {
    // Один раз за действие обрабатываем pre-action по всем целям
    if (!this._preActionDone) {
      this._preActionDone = true;
      this.processAllyPreActionAll();   // <-- обработка всех целей из this.makeTargets()
    }

    this.processAllyPreActionEffect(target);   // старый eval pre (если нужен)
    _Game_Action_apply.call(this, target);
    this.processAllyActionEffect(target);      // старый post eval
    this.processAllyTriggerEffects(target);
  };

  // ---------- Обработка всех целей pre-action (один раз) ----------
  Game_Action.prototype.processAllyPreActionAll = function() {
    var user = this.subject();
    if (!user || !user.isActor() || !user.isAlive()) return;

    var targets = this.makeTargets();   // те же цели, что будут использованы навыком
    console.log("=== processAllyPreActionAll START ===");
    console.log("User:", user.name ? user.name() : "unnamed");
    console.log("Targets:", targets.map(function(t) { return t.name(); }));

    var states = user.states();
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      if (!state || !state.allyPreActionParams) continue;

      var p = state.allyPreActionParams;
      console.log("State", state.id, "params:", JSON.stringify(p));

      var eligible = [];
      for (var j = 0; j < targets.length; j++) {
        var t = targets[j];
        if (!t || !t.isActor() || !t.isAlive() || t === user) {
          console.log("Skip", t ? t.name() : "null", "- not valid ally");
          continue;
        }
        var resValue = t[p.condResource];
        var ok = false;
        switch (p.condOperator) {
          case '<':  ok = resValue < p.condValue; break;
          case '>':  ok = resValue > p.condValue; break;
          case '<=': ok = resValue <= p.condValue; break;
          case '>=': ok = resValue >= p.condValue; break;
          case '==': ok = resValue == p.condValue; break;
        }
        console.log("  " + t.name(), p.condResource + "=" + resValue, p.condOperator, p.condValue, "->", ok);
        if (ok) eligible.push(t);
      }

      var totalCost = eligible.length * p.costPerTarget;
      console.log("Eligible:", eligible.length, "Total cost:", totalCost, "User", p.costResource, "=", user[p.costResource]);

      if (totalCost > 0 && user[p.costResource] >= totalCost) {
        if (p.costResource === 'mp') user.gainMp(-totalCost);
        else if (p.costResource === 'tp') user.gainTp(-totalCost);
        else if (p.costResource === 'hp') user.gainHp(-totalCost);
        console.log("Cost PAID:", -totalCost, p.costResource);

        for (var k = 0; k < eligible.length; k++) {
          var ally = eligible[k];
          if (p.rewardResource === 'mp') ally.gainMp(p.rewardAmount);
          else if (p.rewardResource === 'tp') ally.gainTp(p.rewardAmount);
          else if (p.rewardResource === 'hp') ally.gainHp(p.rewardAmount);
          console.log("Reward: +" + p.rewardAmount, p.rewardResource, "to", ally.name());
          if (p.rewardStateId > 0) {
            ally.addState(p.rewardStateId);
            console.log("State", p.rewardStateId, "added to", ally.name());
          }
        }
      } else {
        console.log("Cost NOT paid (insufficient or none)");
      }
    }
    console.log("=== processAllyPreActionAll END ===");
  };

  // Старые eval-методы
  Game_Action.prototype.processAllyPreActionEffect = function(target) {
    var user = this.subject();
    if (!user || !target) return;
    if (target === user) return;
    if (user.isActor() !== target.isActor()) return;
    if (!user.isAlive() || !target.isAlive()) return;
    var states = user.states();
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      if (!state || !state.customAllyPreActionEffect || state.customAllyPreActionEffect.length <= 0) continue;
      var stateId = state.id;
      var s = $gameSwitches._data;
      var v = $gameVariables._data;
      var item = this.item();
      try { eval(state.customAllyPreActionEffect); } catch (e) { console.error(e); }
    }
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
      if (!state || !state.customAllyActionEffect || state.customAllyActionEffect.length <= 0) continue;
      var stateId = state.id;
      var s = $gameSwitches._data;
      var v = $gameVariables._data;
      var item = this.item();
      try { eval(state.customAllyActionEffect); } catch (e) { console.error(e); }
    }
  };

  Game_Action.prototype.processAllyTriggerEffects = function(target) {
    var user = this.subject();
    if (!user || !user.isActor() || !user.isAlive()) return;
    var item = this.item();
    if (!item || !item.id) return;
    var skillId = item.id;
    var members = $gameParty.aliveMembers();
    for (var i = 0; i < members.length; i++) {
      var battler = members[i];
      if (battler === user) continue;
      var states = battler.states();
      for (var j = 0; j < states.length; j++) {
        var state = states[j];
        if (!state || !state.allyTriggerSkillIds || state.allyTriggerSkillIds.length === 0) continue;
        if (!state.allyTriggerStateId || state.allyTriggerStateId <= 0) continue;
        if (state.allyTriggerSkillIds.indexOf(skillId) >= 0) {
          battler.addState(state.allyTriggerStateId);
        }
      }
    }
  };

})();
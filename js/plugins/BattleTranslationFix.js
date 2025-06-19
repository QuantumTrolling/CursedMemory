/*:
 * @plugindesc Fix for translating enemy/skill/state names in battle using SRD_TranslationEngine. Works live with language switch. | by ChatGPT
 * @author ChatGPT
 * 
 * @help
 * - Place BELOW SRD_TranslationEngine.js
 * - No config needed.
 * - Automatically uses translated [name], [message1-4] fields from database.
 */

(function() {
  const lang = () => ConfigManager.getLanguage?.() || null;

  function translateField(data, field) {
    if (!data || !data._tt_translations || !lang()) return data?.[field];
    const trans = data._tt_translations[lang()];
    return (trans && trans[field]) || data[field];
  }

  // Patch for enemy name
  const _enemyName = Game_Enemy.prototype.name;
  Game_Enemy.prototype.name = function() {
    return translateField(this.enemy(), 'name') || _enemyName.call(this);
  };

  // Patch for state name/messages
  const _stateName = Game_Battler.prototype.stateText;
  Game_Battler.prototype.stateText = function(stateId) {
    const state = $dataStates[stateId];
    if (!state || !state.autoRemovalTiming) return '';
    const name = translateField(state, 'name');
    return name || _stateName.call(this, stateId);
  };

  const _getStateText = Game_BattlerBase.prototype.allIcons;
  Game_BattlerBase.prototype.allIcons = function() {
    const icons = _getStateText.call(this);
    if (!this.isActor && this._states) {
      this._states.forEach(stateId => {
        const state = $dataStates[stateId];
        if (state && state.iconIndex > 0) {
          const name = translateField(state, 'name');
          if (name) state.name = name; // temporary override for window text
        }
      });
    }
    return icons;
  };

  // Patch for skills/items
  const _displayAction = Window_BattleLog.prototype.displayAction;
  Window_BattleLog.prototype.displayAction = function(subject, item) {
    const originalName = item.name;
    const translated = translateField(item, 'name');
    if (translated) item.name = translated;

    _displayAction.call(this, subject, item);

    item.name = originalName; // revert
  };

})();

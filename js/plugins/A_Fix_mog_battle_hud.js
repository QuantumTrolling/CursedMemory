//=============================================================================
// MOG_BattleHud_StateTurns.js
// Добавляет отображение оставшихся ходов состояний на иконках в HUD
//=============================================================================

var Imported = Imported || {};
Imported.MOG_BattleHud_StateTurns = true;

//-----------------------------------------------------------------------------
// Battle_Hud :: getStateDataList
// Возвращает массив объектов { stateId, iconIndex, turns } для всех состояний
//-----------------------------------------------------------------------------
Battle_Hud.prototype.getStateDataList = function() {
    if (!this._battler) return [];
    var result = [];
    var states = this._battler.states();
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        if (state.iconIndex > 0) {
            var turns = this._battler._stateTurns[state.id];
            result.push({
                stateId: state.id,
                iconIndex: state.iconIndex,
                turns: (turns !== undefined && turns >= 0) ? turns : null
            });
        }
    }
    return result;
};

//-----------------------------------------------------------------------------
// Режим 0 – Timing Mode (показывает одно состояние, циклически)
//-----------------------------------------------------------------------------

var _mog_bhud_create_states = Battle_Hud.prototype.create_states;
Battle_Hud.prototype.create_states = function() {
    _mog_bhud_create_states.call(this);
    // Дочерний текст для количества ходов
    if (this._state_icon && !this._stateTurnText) {
        this._stateTurnText = new Sprite(new Bitmap(32, 32));
        this._stateTurnText.bitmap.fontSize = 14;
        this._stateTurnText.bitmap.textColor = '#ffffff';
        this._stateTurnText.bitmap.outlineColor = 'rgba(0,0,0,0.8)';
        this._stateTurnText.bitmap.outlineWidth = 3;
        this._state_icon.addChild(this._stateTurnText);
    }
};

var _mog_bhud_refresh_states = Battle_Hud.prototype.refresh_states;
Battle_Hud.prototype.refresh_states = function() {
    this._stateDataList = this.getStateDataList();
    this._states_data[1] = 0;
    if (this._stateDataList.length === 0) {
        this._state_icon.visible = false;
        if (this._stateTurnText) this._stateTurnText.visible = false;
        return;
    }
    this._state_icon.visible = true;
    if (this._stateTurnText) this._stateTurnText.visible = true;
    this._updateStateIconAndTurns();
};

Battle_Hud.prototype._updateStateIconAndTurns = function() {
    var data = this._stateDataList[this._states_data[1] % this._stateDataList.length];
    var iconIndex = data.iconIndex;
    var sx = iconIndex % 16 * 32;
    var sy = Math.floor(iconIndex / 16) * 32;
    this._state_icon.setFrame(sx, sy, 32, 32);

    if (this._stateTurnText) {
        this._stateTurnText.bitmap.clear();
        var turns = data.turns;
        if (turns !== null && turns > 0) {
            var text = String(turns);
            var tw = this._stateTurnText.bitmap.measureTextWidth(text);
            this._stateTurnText.bitmap.drawText(text, 32 - tw - 2, 32 - 20, tw + 4, 20, 'right');
            this._stateTurnText.visible = true;
        } else {
            this._stateTurnText.visible = false;
        }
    }
};

var _mog_bhud_update_states = Battle_Hud.prototype.update_states;
Battle_Hud.prototype.update_states = function() {
    if (!this._state_icon || !this._battler) return;
    if (this._battler.need_refresh_bhud_states) {
        this.refresh_states();
        return;
    }
    if (!this._stateDataList || this._stateDataList.length === 0) return;

    this._states_data[2] = (this._states_data[2] || 0) + 1;
    if (this._states_data[2] > 60) {
        this._states_data[2] = 0;
        this._states_data[1] = (this._states_data[1] + 1) % this._stateDataList.length;
        this._updateStateIconAndTurns();
    }
    // Обновляем текст каждый кадр (на случай изменения turns)
    this._updateStateIconAndTurns();
};

//-----------------------------------------------------------------------------
// Режим 1 – Line Mode (показывает несколько состояний)
//-----------------------------------------------------------------------------

var _mog_bhud_create_states2 = Battle_Hud.prototype.create_states2;
Battle_Hud.prototype.create_states2 = function() {
    _mog_bhud_create_states2.call(this);
    this._stateTurnTexts = [];
};

var _mog_bhud_refresh_states2 = Battle_Hud.prototype.refresh_states2;
Battle_Hud.prototype.refresh_states2 = function() {
    this._battler.need_refresh_bhud_states = false;
    this._state_icon.visible = false;
    // Удаляем старые текстовые спрайты
    if (this._stateTurnTexts) {
        for (var i = 0; i < this._stateTurnTexts.length; i++) {
            this._state_icon.removeChild(this._stateTurnTexts[i]);
        }
    }
    this._stateDataList = this.getStateDataList();
    if (this._stateDataList.length === 0) return;

    var maxIcons = Math.min(this._stateDataList.length, Moghunter.bhud_statesMax);
    this._stateIcons = [];
    this._stateTurnTexts = [];

    var w = Window_Base._iconWidth;
    var align = Moghunter.bhud_statesAlign;

    for (var i = 0; i < maxIcons; i++) {
        var data = this._stateDataList[i];
        var iconIndex = data.iconIndex;

        var sprIcon = new Sprite(this._state_img);
        var sx = iconIndex % 16 * w;
        var sy = Math.floor(iconIndex / 16) * w;
        sprIcon.setFrame(sx, sy, w, w);

        if (align === 1) sprIcon.x = -((w + 4) * i);
        else if (align === 2) sprIcon.y = (w + 4) * i;
        else if (align === 3) sprIcon.y = -((w + 4) * i);
        else sprIcon.x = (w + 4) * i;

        // Текстовый спрайт для числа ходов
        var txtSprite = new Sprite(new Bitmap(w, w));
        txtSprite.bitmap.fontSize = 14;
        txtSprite.bitmap.textColor = '#ffffff';
        txtSprite.bitmap.outlineColor = 'rgba(0,0,0,0.8)';
        txtSprite.bitmap.outlineWidth = 3;
        sprIcon.addChild(txtSprite);

        this._stateIcons.push(sprIcon);
        this._stateTurnTexts.push(txtSprite);
        this._state_icon.addChild(sprIcon);
    }
    this._state_icon.visible = true;
    this._updateStateTurnsLine();
};

Battle_Hud.prototype._updateStateTurnsLine = function() {
    if (!this._stateTurnTexts) return;
    for (var i = 0; i < this._stateTurnTexts.length; i++) {
        var txt = this._stateTurnTexts[i];
        var data = this._stateDataList[i];
        txt.bitmap.clear();
        if (data && data.turns !== null && data.turns > 0) {
            var text = String(data.turns);
            var tw = txt.bitmap.measureTextWidth(text);
            txt.bitmap.drawText(text, 32 - tw - 2, 32 - 20, tw + 4, 20, 'right');
            txt.visible = true;
        } else {
            txt.visible = false;
        }
    }
};

var _mog_bhud_update_states2 = Battle_Hud.prototype.update_states2;
Battle_Hud.prototype.update_states2 = function() {
    if (this._battler.need_refresh_bhud_states) {
        this.refresh_states2();
    }
    this._updateStateTurnsLine();
};
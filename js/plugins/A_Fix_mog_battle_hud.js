//=============================================================================
// A_fix_mog_battle_hud.js
// Добавляет отображение оставшихся ходов состояний на иконках в HUD
// + Автообновление иконок для пассивных состояний (исправлено)
// + МГНОВЕННОЕ ОБНОВЛЕНИЕ ЦИФРЫ ХОДОВ (без задержки)
// + Настройки: размер шрифта, смещение текста по X и Y
// + Фикс: цифра не показывается, если у состояния autoRemovalTiming = 0
//=============================================================================

/*:
 * @plugindesc v1.1 Отображение оставшихся ходов состояний на иконках батл-худа
 * @author Moghunter, дополнения fix
 *
 * @param fontSize
 * @desc Размер шрифта для цифры оставшихся ходов (по умолчанию 14)
 * @default 14
 *
 * @param textOffsetX
 * @desc Смещение текста по оси X (влево-вправо)
 * @default 0
 *
 * @param textOffsetY
 * @desc Смещение текста по оси Y (вверх-вниз)
 * @default 0
 *
 * @help
 * Плагин добавляет на иконки состояний в батл-худе число оставшихся ходов.
 * Если у состояния нет длительности (autoRemovalTiming = 0, т.е. "Удалить автоматически - Нет"),
 * цифра не отображается, даже если в _stateTurns остались старые данные.
 *
 * Настройки:
 * fontSize    - размер шрифта (по умолчанию 14)
 * textOffsetX - смещение цифры по горизонтали (от левого верхнего угла иконки)
 * textOffsetY - смещение цифры по вертикали
 */

var Imported = Imported || {};
Imported.A_fix_mog_battle_hud = true;

var parameters = PluginManager.parameters('A_fix_mog_battle_hud');
var fontSize = Number(parameters['fontSize'] || 14);
var textOffsetX = Number(parameters['textOffsetX'] || 0);
var textOffsetY = Number(parameters['textOffsetY'] || 0);

//-----------------------------------------------------------------------------
// Battle_Hud :: getStateDataList
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
// Режим 0 – Timing Mode
//-----------------------------------------------------------------------------
var _mog_bhud_create_states = Battle_Hud.prototype.create_states;
Battle_Hud.prototype.create_states = function() {
    _mog_bhud_create_states.call(this);
    if (this._state_icon) {
    if (!this._stateTurnText || this._stateTurnText.bitmap._destroyed) {
        if (this._stateTurnText) this._state_icon.removeChild(this._stateTurnText);
        this._stateTurnText = new Sprite(new Bitmap(32, 32));
        this._stateTurnText.bitmap.fontSize = fontSize;
        this._stateTurnText.bitmap.textColor = '#ffffff';
        this._stateTurnText.bitmap.outlineColor = 'rgba(0,0,0,0.8)';
        this._stateTurnText.bitmap.outlineWidth = 3;
        this._stateTurnText.x = textOffsetX;
        this._stateTurnText.y = textOffsetY;
        this._state_icon.addChild(this._stateTurnText);
    }
}
};

var _mog_bhud_refresh_states = Battle_Hud.prototype.refresh_states;
Battle_Hud.prototype.refresh_states = function() {
    var prevDataList = this._stateDataList ? this._stateDataList.slice() : [];
    this._stateDataList = this.getStateDataList();
    var changed = false;
    if (prevDataList.length !== this._stateDataList.length) {
        changed = true;
    } else {
        for (var i = 0; i < this._stateDataList.length; i++) {
            if (prevDataList[i].stateId !== this._stateDataList[i].stateId) {
                changed = true;
                break;
            }
        }
    }

    if (changed) {
        this._states_data[1] = 0;
    }

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
    if (!this._stateDataList || this._stateDataList.length === 0) return;
    var data = this._stateDataList[this._states_data[1] % this._stateDataList.length];
    var iconIndex = data.iconIndex;
    var sx = iconIndex % 16 * 32;
    var sy = Math.floor(iconIndex / 16) * 32;
    this._state_icon.setFrame(sx, sy, 32, 32);

    if (this._stateTurnText) {
        this._stateTurnText.bitmap.clear();
        var turns = null;
        if (this._battler && this._battler._stateTurns) {
            var raw = this._battler._stateTurns[data.stateId];
            turns = (raw !== undefined && raw >= 0) ? raw : null;
        }

        // Проверка: если состояние не имеет автоматического удаления (autoRemovalTiming = 0), цифру не показываем
        var state = $dataStates[data.stateId];
        if (!state || state.autoRemovalTiming === 0) {
            turns = null;
        }

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
        this._battler.need_refresh_bhud_states = false;
        this.refresh_states();
    }
    if (!this._stateDataList || this._stateDataList.length === 0) return;

    this._states_data[2] = (this._states_data[2] || 0) + 1;
    if (this._states_data[2] > 60) {
        this._states_data[2] = 0;
        this._states_data[1] = (this._states_data[1] + 1) % this._stateDataList.length;
        this._updateStateIconAndTurns();
    }
    this._updateStateIconAndTurns();
};

//-----------------------------------------------------------------------------
// Режим 1 – Line Mode (с настройками и фиксом)
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

        var txtSprite = new Sprite(new Bitmap(w, w));
        txtSprite.bitmap.fontSize = fontSize;
        txtSprite.bitmap.textColor = '#ffffff';
        txtSprite.bitmap.outlineColor = 'rgba(0,0,0,0.8)';
        txtSprite.bitmap.outlineWidth = 3;
        txtSprite.x = textOffsetX;
        txtSprite.y = textOffsetY;
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
        if (data) {
            var turns = null;
            if (this._battler && this._battler._stateTurns) {
                var raw = this._battler._stateTurns[data.stateId];
                turns = (raw !== undefined && raw >= 0) ? raw : null;
            }

            // Проверка autoRemovalTiming
            var state = $dataStates[data.stateId];
            if (!state || state.autoRemovalTiming === 0) {
                turns = null;
            }

            if (turns !== null && turns > 0) {
                var text = String(turns);
                var tw = txt.bitmap.measureTextWidth(text);
                txt.bitmap.drawText(text, 32 - tw - 2, 32 - 20, tw + 4, 20, 'right');
                txt.visible = true;
            } else {
                txt.visible = false;
            }
        } else {
            txt.visible = false;
        }
    }
};

var _mog_bhud_update_states2 = Battle_Hud.prototype.update_states2;
Battle_Hud.prototype.update_states2 = function() {
    if (this._battler.need_refresh_bhud_states) {
        this._battler.need_refresh_bhud_states = false;
        this.refresh_states2();
    }
    this._updateStateTurnsLine();
};

// =============================================================================
// ФИКС: умное обновление иконок при изменении пассивных состояний
// =============================================================================
var _mog_bhud_fix_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
    var prevStates = this._prevStates ? this._prevStates.slice() : [];
    _mog_bhud_fix_refresh.call(this);
    var newStates = this.states().slice();
    if (!this._prevStates || this._arrayDiff(prevStates, newStates)) {
        this.need_refresh_bhud_states = true;
    }
    this._prevStates = newStates;
};

Game_BattlerBase.prototype._arrayDiff = function(a, b) {
    if (a.length !== b.length) return true;
    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return true;
    }
    return false;
};
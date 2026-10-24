/*:
 * @plugindesc v1.1 - Timing Mode: 2 иконки + бегущая строка + оставшиеся ходы
 * @author
 *
 * @param fontSize
 * @text Размер шрифта ходов
 * @type number
 * @default 14
 * @desc Размер шрифта цифр оставшихся ходов
 *
 * @param textOffsetX
 * @text Смещение X
 * @type number
 * @default 0
 * @desc Смещение цифр по X относительно иконки
 *
 * @param textOffsetY
 * @text Смещение Y
 * @type number
 * @default 0
 * @desc Смещение цифр по Y относительно иконки
 *
 * @help
 * Порядок:
 *   SceneGlossary.js
 *   MOG_BattleHud.js
 *   BattleGlossaryButton.js   (window.GlossaryOverlay = GlossaryOverlay;)
 *   A_fix_glossary_hover.js
 *   StateGlossaryClick.js
 *   TimingModeTwoIcons.js     (этот)
 *
 * ВАЖНО: УДАЛИТЕ A_fix_mog_battle_hud.js из плагин-менеджера —
 * этот файл полностью его заменяет.
 *
 * Timing Mode (States Mode = 0):
 *   0 состояний → пусто
 *   1 состояние → 1 иконка + цифра ходов
 *   2 состояния → 2 иконки + цифры
 *   3+          → 2 иконки, бегущая строка каждые 60 кадров + цифры
 *
 * Line Mode (States Mode = 1): все иконки + цифры (как в A_fix)
 *
 * Клик по любой иконке Timing Mode открывает глоссарий на этом состоянии.
 */
(function() {
    'use strict';

    if (typeof Battle_Hud === 'undefined') {
        console.warn('[TM2] MOG_BattleHud.js не загружен.');
        return;
    }

    var params = PluginManager.parameters('TimingModeTwoIcons');
    var FONT_SIZE    = Number(params['fontSize']    || 14);
    var TEXT_OFFSET_X = Number(params['textOffsetX'] || 0);
    var TEXT_OFFSET_Y = Number(params['textOffsetY'] || 0);

    var ICON_W = 32;
    var ICON_H = 32;
    var GAP    = 4;
    var TICK   = 60;

    //=====================================================================
    // Парсинг заметок состояния (для клика)
    //=====================================================================
    function getStateGlossaryData(stateId, actorId) {
        var state = $dataStates[stateId];
        if (!state || !state.note) return null;

        // --- 1. Старый формат <glossaryItem:...> (для всех одинаково) ---
        var mItem = state.note.match(/<glossaryItem:\s*(\d+)>/i);
        if (mItem) {
            var mDesc = state.note.match(/<glossaryDesc:\s*(\d+)>/i);
            var mType = state.note.match(/<glossaryType:\s*(\d+)>/i);
            var mCat  = state.note.match(/<glossaryCategory:\s*([^>\r\n]+)>/i);
            return {
                stateId: stateId, itemId: Number(mItem[1]),
                pageNum: mDesc ? Number(mDesc[1]) : 1,
                glossaryType: mType ? Number(mType[1]) : 1,
                category: mCat ? mCat[1].trim() : null
            };
        }

        // --- 2. Новый формат <glossary:actorId|itemId|...> ---
        var m = state.note.match(/<glossary:[^>]+>/gi) || [];
        var entries = [];
        for (var i = 0; i < m.length; i++) {
            var parts = m[i].slice(10, -1).split('|').map(function(s){ return s.trim(); });
            var aId = parseInt(parts[0]), iId = parseInt(parts[1]);
            if (isNaN(aId) || isNaN(iId)) continue;
            entries.push({
                actorId: aId, itemId: iId,
                pageNum: parts[2] ? (parseInt(parts[2]) || 1) : 1,
                glossaryType: parts[3] ? (parseInt(parts[3]) || 1) : 1,
                category: parts[4] || null
            });
        }
        if (entries.length > 0) {
            // Если actorId не передан — берём активного актёра (для HUD актёров)
            if (actorId === undefined || actorId === null) {
                actorId = (BattleManager.actor() || {})._actorId || 0;
            }
            var pick = null;
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].actorId === actorId) { pick = entries[i]; break; }
            }
            if (!pick) for (var i = 0; i < entries.length; i++) {
                if (entries[i].actorId === 0) { pick = entries[i]; break; }
            }
            if (pick) return {
                stateId: stateId, itemId: pick.itemId, pageNum: pick.pageNum,
                glossaryType: pick.glossaryType, category: pick.category
            };
        }
        return null;
    }

    function isHitLocal(sprite, tx, ty) {
        if (!sprite || !sprite.visible) return false;
        var px = 0, py = 0, s = sprite;
        while (s) { px += s.x || 0; py += s.y || 0; s = s.parent; }
        return tx >= px && tx < px + ICON_W &&
               ty >= py && ty < py + ICON_H;
    }
	
	function absolutePos(sprite) {
        var x = 0, y = 0, s = sprite;
        while (s) { x += s.x || 0; y += s.y || 0; s = s.parent; }
        return { x: x, y: y };
    }

    //=====================================================================
    // getStateDataList — состояния с иконками и их turns
    //=====================================================================
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

    //=====================================================================
    // TIMING MODE (create_states / refresh_states / update_states)
    //=====================================================================
    Battle_Hud.prototype.create_states = function() {
        if (String(Moghunter.bhud_states_visible) != "true") {return};
        this.removeChild(this._state_icon);
        if (!this._battler) {return};

        // Контейнер
        this._state_icon = new Sprite();
        this._state_icon.x = this._pos_x + Moghunter.bhud_states_pos_x;
        this._state_icon.y = this._pos_y + Moghunter.bhud_states_pos_y;
        this._state_icon.visible = false;
        this.addChild(this._state_icon);

        // 2 дочерних спрайта + текст ходов
        this._stateIcons = [];
        this._stateTurnTexts = [];
        for (var i = 0; i < 2; i++) {
            var spr = new Sprite(this._state_img);
            spr.x = i * (ICON_W + GAP);
            spr.y = 0;
            spr.visible = false;
            this._state_icon.addChild(spr);
            this._stateIcons.push(spr);

            var txt = new Sprite(new Bitmap(ICON_W, ICON_H));
            txt.bitmap.fontSize = FONT_SIZE;
            txt.bitmap.textColor = '#ffffff';
            txt.bitmap.outlineColor = 'rgba(0,0,0,0.8)';
            txt.bitmap.outlineWidth = 3;
            txt.x = TEXT_OFFSET_X;
            txt.y = TEXT_OFFSET_Y;
            txt.visible = false;
            spr.addChild(txt);
            this._stateTurnTexts.push(txt);
        }

        this._states_data = [0, 0, 0]; // [0]=shift, [1]=unused, [2]=tick
        this._stateDataList = [];
        this.refresh_states();
    };

    Battle_Hud.prototype.refresh_states = function() {
        var prevDataList = this._stateDataList ? this._stateDataList.slice() : [];
        this._stateDataList = this.getStateDataList();
        var changed = false;
        if (prevDataList.length !== this._stateDataList.length) {
            changed = true;
        } else {
            for (var i = 0; i < this._stateDataList.length; i++) {
                if (prevDataList[i].stateId !== this._stateDataList[i].stateId) {
                    changed = true; break;
                }
            }
        }
        if (changed) this._states_data[0] = 0;

        if (this._stateDataList.length === 0) {
            this._state_icon.visible = false;
            if (this._stateTurnTexts) {
                for (var i = 0; i < this._stateTurnTexts.length; i++) {
                    this._stateTurnTexts[i].visible = false;
                }
            }
            this._lastStateTurns = {};
            this._battler.need_refresh_bhud_states = false;
            return;
        }

        this._state_icon.visible = true;
        this._updateStateIconAndTurns();

        // Снимок turns
        this._lastStateTurns = {};
        var states = this._battler.states();
        for (var i = 0; i < states.length; i++) {
            this._lastStateTurns[states[i].id] = this._battler._stateTurns[states[i].id];
        }
        this._battler.need_refresh_bhud_states = false;
    };

    Battle_Hud.prototype._updateStateIconAndTurns = function() {
        if (!this._stateDataList) return;
        var n = this._stateDataList.length;
        if (n === 0) return;
        var shift = (this._states_data[0] || 0) % n;
        var count = Math.min(2, n);

        // Позиции слотов:
        //   count === 2 → левая x=0, правая x=36  (стандарт)
        //   count === 1 → единственная по центру между слотами (x=18)
        var slotX = [
            count === 1 ? (ICON_W + GAP) / 2 : 0,
            ICON_W + GAP
        ];

        for (var i = 0; i < this._stateIcons.length; i++) {
            var icon = this._stateIcons[i];
            var txt = this._stateTurnTexts[i];

            icon.x = slotX[i];   // ← выставляем позицию каждый раз

            if (i >= count) {
                icon.visible = false;
                if (txt) txt.visible = false;
                continue;
            }
            var data = this._stateDataList[(shift + i) % n];
            if (!data) {
                icon.visible = false;
                if (txt) txt.visible = false;
                continue;
            }

            icon.visible = true;
            var iconId = data.iconIndex;
            icon.setFrame(iconId % 16 * 32, Math.floor(iconId / 16) * 32, 32, 32);

            if (!txt) continue;
            txt.bitmap.clear();

            var turns = null;
            if (this._battler && this._battler._stateTurns) {
                var raw = this._battler._stateTurns[data.stateId];
                turns = (raw !== undefined && raw >= 0) ? raw : null;
            }
            var state = $dataStates[data.stateId];
            if (!state || state.autoRemovalTiming === 0) turns = null;

            if (turns !== null && turns > 0) {
                var text = String(turns);
                var tw = txt.bitmap.measureTextWidth
                    ? txt.bitmap.measureTextWidth(text)
                    : Math.floor(FONT_SIZE * 0.6 * text.length);
                txt.bitmap.drawText(text, 32 - tw - 2, 32 - 20, tw + 4, 20, 'right');
                txt.visible = true;
            } else {
                txt.visible = false;
            }
        }
    };

    Battle_Hud.prototype.update_states = function() {
        if (!this._state_icon || !this._battler) return;

        // Отслеживание изменения turns/состава состояний
        if (this._battler.isAlive() && !this._battler.need_refresh_bhud_states) {
            var states = this._battler.states();
            var stateChanged = false;
            if (this._lastStateTurns) {
                for (var i = 0; i < states.length; i++) {
                    var id = states[i].id;
                    if (this._battler._stateTurns[id] !== this._lastStateTurns[id]) {
                        stateChanged = true; break;
                    }
                }
                if (!stateChanged && Object.keys(this._lastStateTurns).length !== states.length) {
                    stateChanged = true;
                }
            } else {
                stateChanged = true;
            }
            if (stateChanged) this._battler.need_refresh_bhud_states = true;
        }

        if (this._battler.need_refresh_bhud_states) {
            this.refresh_states();
        }

        if (!this._stateDataList || this._stateDataList.length === 0) return;

        var n = this._stateDataList.length;
        this._states_data[2] = (this._states_data[2] || 0) + 1;

        // Бегущая строка только при 3+
        if (n >= 3 && this._states_data[2] > TICK) {
            this._states_data[2] = 0;
            this._states_data[0] = (this._states_data[0] + 1) % n;
            this._updateStateIconAndTurns();
        }
    };

    //=====================================================================
    // Клик по Timing Mode — по любой из 2-х иконок
    //=====================================================================
    Battle_Hud.prototype.handleTimingModeClick = function(tx, ty, stateList, scene) {
        if (!this._stateIcons || this._stateIcons.length === 0) return;
        if (!this._state_icon || !this._state_icon.visible) return;
        if (!this._stateDataList || this._stateDataList.length === 0) return;

        var n = this._stateDataList.length;
        var shift = (this._states_data && this._states_data[0]) || 0;
        var count = Math.min(2, n);

        for (var i = 0; i < count; i++) {
            var icon = this._stateIcons[i];
            if (!icon.visible) continue;
            if (!isHitLocal(icon, tx, ty)) continue;

            var data = this._stateDataList[(shift + i) % n];
            if (!data) return;

            var gData = getStateGlossaryData(data.stateId, this._battler._actorId);
            if (gData) this.openGlossaryForState(scene, gData);
            return;
        }
    };

    //=====================================================================
    // LINE MODE (create_states2 / refresh_states2 / update_states2)
    //=====================================================================
    Battle_Hud.prototype.create_states2 = function() {
        if (String(Moghunter.bhud_states_visible) != "true") {return};
        this.removeChild(this._state_icon);
        if (!this._battler) {return};
        this._state_icon = new Sprite();
        this._state_icon.x = this._pos_x + Moghunter.bhud_states_pos_x;
        this._state_icon.y = this._pos_y + Moghunter.bhud_states_pos_y;
        this._state_icon.visible = false;
        this.addChild(this._state_icon);
        this._stateIcons = [];
        this._stateTurnTexts = [];
        this.refresh_states2();
    };

    Battle_Hud.prototype.refresh_states2 = function() {
        this._battler.need_refresh_bhud_states = false;
        this._state_icon.visible = false;
        if (this._stateTurnTexts) {
            for (var i = 0; i < this._stateTurnTexts.length; i++) {
                var old = this._stateTurnTexts[i];
                if (old && old.parent) old.parent.removeChild(old);
            }
        }
        if (this._stateIcons) {
            for (var i = 0; i < this._stateIcons.length; i++) {
                var oi = this._stateIcons[i];
                if (oi && oi.parent) oi.parent.removeChild(oi);
            }
        }
        this._stateDataList = this.getStateDataList();
        if (this._stateDataList.length === 0) {
            this._lastStateTurns = {};
            return;
        }

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

            var txt = new Sprite(new Bitmap(w, w));
            txt.bitmap.fontSize = FONT_SIZE;
            txt.bitmap.textColor = '#ffffff';
            txt.bitmap.outlineColor = 'rgba(0,0,0,0.8)';
            txt.bitmap.outlineWidth = 3;
            txt.x = TEXT_OFFSET_X;
            txt.y = TEXT_OFFSET_Y;
            sprIcon.addChild(txt);

            this._stateIcons.push(sprIcon);
            this._stateTurnTexts.push(txt);
            this._state_icon.addChild(sprIcon);
        }
        this._state_icon.visible = true;
        this._updateStateTurnsLine();

        this._lastStateTurns = {};
        var states = this._battler.states();
        for (var i = 0; i < states.length; i++) {
            this._lastStateTurns[states[i].id] = this._battler._stateTurns[states[i].id];
        }
    };

    Battle_Hud.prototype._updateStateTurnsLine = function() {
        if (!this._stateTurnTexts) return;
        for (var i = 0; i < this._stateTurnTexts.length; i++) {
            var txt = this._stateTurnTexts[i];
            var data = this._stateDataList[i];
            if (!txt) continue;
            txt.bitmap.clear();
            if (!data) { txt.visible = false; continue; }

            var turns = null;
            if (this._battler && this._battler._stateTurns) {
                var raw = this._battler._stateTurns[data.stateId];
                turns = (raw !== undefined && raw >= 0) ? raw : null;
            }
            var state = $dataStates[data.stateId];
            if (!state || state.autoRemovalTiming === 0) turns = null;

            if (turns !== null && turns > 0) {
                var text = String(turns);
                var tw = txt.bitmap.measureTextWidth
                    ? txt.bitmap.measureTextWidth(text)
                    : Math.floor(FONT_SIZE * 0.6 * text.length);
                txt.bitmap.drawText(text, 32 - tw - 2, 32 - 20, tw + 4, 20, 'right');
                txt.visible = true;
            } else {
                txt.visible = false;
            }
        }
    };

    Battle_Hud.prototype.update_states2 = function() {
        if (!this._state_icon || !this._battler) return;
        if (this._battler.isAlive()) {
            var states = this._battler.states();
            var stateChanged = false;
            if (this._lastStateTurns) {
                for (var i = 0; i < states.length; i++) {
                    var id = states[i].id;
                    if (this._battler._stateTurns[id] !== this._lastStateTurns[id]) {
                        stateChanged = true; break;
                    }
                }
                if (!stateChanged && Object.keys(this._lastStateTurns).length !== states.length) {
                    stateChanged = true;
                }
            } else {
                stateChanged = true;
            }
            if (stateChanged) this._battler.need_refresh_bhud_states = true;
        }
        if (this._battler.need_refresh_bhud_states) {
            this.refresh_states2();
        }
        this._updateStateTurnsLine();
    };

    //=====================================================================
    // Умное обновление при изменении states (из A_fix)
    //=====================================================================
    var _bgbb_refresh = Game_BattlerBase.prototype.refresh;
    Game_BattlerBase.prototype.refresh = function() {
        var prevStates = this._prevStates ? this._prevStates.slice() : [];
        _bgbb_refresh.call(this);
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

    //=====================================================================
    // Принудительное обновление turns (из A_fix)
    //=====================================================================
    var _bh_update = Battle_Hud.prototype.update;
    Battle_Hud.prototype.update = function() {
        _bh_update.call(this);

        // Обработка кликов по состояниям врагов — только из первого HUD
        if (this._hud_id === 0) {
            this.processEnemyStateClicks(SceneManager._scene);
        }

        if (!this._battler) return;

        var currentStates = this._battler.states();
        var needRefresh = false;

        if (!this._lastStateTurns) {
            needRefresh = true;
        } else {
            if (Object.keys(this._lastStateTurns).length !== currentStates.length) {
                needRefresh = true;
            }
            if (!needRefresh) {
                for (var i = 0; i < currentStates.length; i++) {
                    var stateId = currentStates[i].id;
                    if (this._battler._stateTurns[stateId] !== this._lastStateTurns[stateId]) {
                        needRefresh = true; break;
                    }
                }
            }
        }

        if (needRefresh) {
            this._lastStateTurns = {};
            for (var i = 0; i < currentStates.length; i++) {
                this._lastStateTurns[currentStates[i].id] =
                    this._battler._stateTurns[currentStates[i].id];
            }
            this._battler.need_refresh_bhud_states = true;
        }
    };

    //=====================================================================
    // Клик по состояниям врагов
    // - Olivia OctoBattle: Window_WeaknessDisplay._stateIconSprite
    // - Vanilla MV:        Sprite_Enemy._stateIconSprite (если Olivia не скрыл)
    // - MOG BossHP:        Sprite_BossHP._stateIcons[]
    //
    // Для врагов actorId в <glossary:...> = 0 (fallback).
    // Старый формат <glossaryItem> работает как обычно.
    //=====================================================================

    function findStateByIcon(battler, iconIndex) {
        if (!battler || !iconIndex) return null;
        var states = battler.states();
        for (var i = 0; i < states.length; i++) {
            if (states[i].iconIndex === iconIndex) return states[i];
        }
        return null;
    }

    // Клик по одиночной Sprite_StateIcon (Olivia / vanilla)
    function tryOpenEnemyStateIcon(scene, battler, iconSpr, tx, ty) {
        if (!iconSpr || !iconSpr.parent || !iconSpr.visible) return false;
        if (iconSpr.opacity <= 0) return false;
        if (!iconSpr._iconIndex) return false;

        var pos = absolutePos(iconSpr);
        if (tx < pos.x || tx >= pos.x + ICON_W) return false;
        if (ty < pos.y || ty >= pos.y + ICON_W) return false;

        var state = findStateByIcon(battler, iconSpr._iconIndex);
        if (!state) return false;

        var data = getStateGlossaryData(state.id, 0);
        if (!data) return false;

        var hud = (scene._battle_hud && scene._battle_hud[0]);
        if (!hud) return false;
        hud.openGlossaryForState(scene, data);
        return true;
    }

    // Клик по иконкам на босс-баре MOG
    function tryBossHpClick(scene, bossSpr, tx, ty) {
        if (!bossSpr || !bossSpr.visible) return false;
        if (!bossSpr._battler) return false;
        if (!bossSpr._stateIcons || bossSpr._stateIcons.length === 0) return false;

        // В refreshStates: _stateIcons[i] соответствует allIcons()[i]
        var allIcons = bossSpr._battler.allIcons();
        if (allIcons.length === 0) return false;

        for (var i = 0; i < bossSpr._stateIcons.length; i++) {
            var iconSpr = bossSpr._stateIcons[i];
            if (!iconSpr || !iconSpr.parent || !iconSpr.visible) continue;

            var pos = absolutePos(iconSpr);
            if (tx < pos.x || tx >= pos.x + ICON_W) continue;
            if (ty < pos.y || ty >= pos.y + ICON_W) continue;

            var iconIndex = allIcons[i];
            if (!iconIndex) continue;

            var state = findStateByIcon(bossSpr._battler, iconIndex);
            if (!state) continue;

            var data = getStateGlossaryData(state.id, 0);
            if (!data) return false;

            var hud = (scene._battle_hud && scene._battle_hud[0]);
            if (!hud) return false;
            hud.openGlossaryForState(scene, data);
            return true;
        }
        return false;
    }

    Battle_Hud.prototype.processEnemyStateClicks = function(scene) {
        if (!(scene instanceof Scene_Battle)) return;
        if (!TouchInput.isTriggered()) return;
        if (scene._glossaryActive) return;
        if (scene._glossaryCancelBlock > 0) return;
        if (scene._stateGlossarySkipTouch > 0) return;
        if ($gameMessage.isBusy()) return;
        if (!scene._battle_hud || !scene._battle_hud[0]) return;

        var tx = TouchInput.x, ty = TouchInput.y;

        // --- 1. MOG BossHP (приоритет) ---
        if (scene._bosshp_sprites) {
            if (tryBossHpClick(scene, scene._bosshp_sprites, tx, ty)) return;
        }

        // --- 2. Враги ---
        if (scene._spriteset && scene._spriteset._enemySprites) {
            var enemySprites = scene._spriteset._enemySprites;
            for (var i = 0; i < enemySprites.length; i++) {
                var enemySpr = enemySprites[i];
                if (!enemySpr || !enemySpr._battler) continue;
                if (enemySpr._battler.isDead()) continue;

                // Olivia: окно видимо, если contentsOpacity >= 128
                if (enemySpr._weaknessWindow &&
                    enemySpr._weaknessWindow.contentsOpacity >= 128) {
                    var weakIcon = enemySpr._weaknessWindow._stateIconSprite;
                    if (tryOpenEnemyStateIcon(scene, enemySpr._battler, weakIcon, tx, ty)) {
                        return;
                    }
                }

                // Vanilla (Olivia скрывает стандартный через opacity = 0)
                if (enemySpr._stateIconSprite && enemySpr._stateIconSprite.opacity > 0) {
                    if (tryOpenEnemyStateIcon(scene, enemySpr._battler, enemySpr._stateIconSprite, tx, ty)) {
                        return;
                    }
                }
            }
        }
    };

})();
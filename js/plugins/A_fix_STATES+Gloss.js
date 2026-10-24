/*:
 * @plugindesc v1.5 - Клик по иконке состояния → глоссарий (с условной логикой по актёру)
 * @author
 *
 * @help
 * Порядок плагинов:
 *   SceneGlossary.js
 *   MOG_BattleHud.js
 *   BattleGlossaryButton.js   (в конце: window.GlossaryOverlay = GlossaryOverlay;)
 *   A_fix_glossary_hover.js
 *   StateGlossaryClick.js     (этот)
 *
 * ============================================================
 * СТАРЫЙ ФОРМАТ (для всех актёров одинаково):
 * ============================================================
 *   <glossaryItem:ID>         (обязательно)
 *   <glossaryDesc:X>          (опционально, по умолч. 1)
 *   <glossaryType:N>          (опционально, по умолч. 1)
 *   <glossaryCategory:Name>   (опционально)
 *
 * Пример:
 *   <glossaryItem:68>
 *   <glossaryDesc:3>
 *
 * ============================================================
 * НОВЫЙ ФОРМАТ (условия по ID актёра):
 * ============================================================
 *   <glossary:actorId|itemId|descNum|glossaryType|category>
 *
 * Все поля кроме actorId и itemId опциональны.
 * actorId = 0 → fallback для всех актёров без своей записи.
 *
 * Примеры:
 *   <glossary:8|68|3>             // актёр 8 → предмет 68, страница 3
 *   <glossary:9|67|2>             // актёр 9 → предмет 67, страница 2
 *   <glossary:8|68|3|2|Персонажи> // с типом 2 и категорией
 *   <glossary:0|65|1>             // fallback для остальных
 *
 * ============================================================
 * ПРИОРИТЕТ ПРИ КЛИКЕ:
 * ============================================================
 *   1. <glossary:actorId|...> с точным actorId
 *   2. <glossary:0|...>            (fallback нового формата)
 *   3. старые теги <glossaryItem:...>
 */
(function() {
    'use strict';

    if (typeof Battle_Hud === 'undefined') {
        console.warn('[SGC] MOG_BattleHud.js не загружен.');
        return;
    }

    var ICON_SIZE = 32;

    //=====================================================================
    // Парсинг: новый формат <glossary:actorId|itemId|descNum|type|category>
    //=====================================================================
    function parseNewGlossaryEntries(note) {
        var matches = note.match(/<glossary:[^>]+>/gi) || [];
        var entries = [];
        for (var i = 0; i < matches.length; i++) {
            // отрезаем "<glossary:" (10 символов) и ">" (1 символ)
            var content = matches[i].slice(10, -1);
            var parts = content.split('|').map(function(s) { return s.trim(); });
            var actorId = parseInt(parts[0]);
            var itemId  = parseInt(parts[1]);
            if (isNaN(actorId) || isNaN(itemId)) continue;
            entries.push({
                actorId:      actorId,
                itemId:       itemId,
                pageNum:      (parts[2] && !isNaN(parseInt(parts[2]))) ? parseInt(parts[2]) : 1,
                glossaryType: (parts[3] && !isNaN(parseInt(parts[3]))) ? parseInt(parts[3]) : 1,
                category:     (parts[4] && parts[4].length > 0) ? parts[4] : null
            });
        }
        return entries;
    }

    //=====================================================================
    // Получение данных глоссария для состояния + актёра
    //=====================================================================
    function getStateGlossaryData(stateId, actorId) {
        var state = $dataStates[stateId];
        if (!state || !state.note) return null;

        // --- 1. Новый формат ---
        var entries = parseNewGlossaryEntries(state.note);
        if (entries.length > 0) {
            // точное совпадение actorId
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].actorId === actorId) {
                    return makeData(stateId, entries[i]);
                }
            }
            // fallback: actorId === 0
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].actorId === 0) {
                    return makeData(stateId, entries[i]);
                }
            }
            // своя запись есть, но не для этого актёра и без fallback →
            // пробуем старый формат ниже (если он есть), иначе null
        }

        // --- 2. Старый формат ---
        var mItem = state.note.match(/<glossaryItem:\s*(\d+)>/i);
        if (!mItem) return null;
        var mDesc = state.note.match(/<glossaryDesc:\s*(\d+)>/i);
        var mType = state.note.match(/<glossaryType:\s*(\d+)>/i);
        var mCat  = state.note.match(/<glossaryCategory:\s*([^>\r\n]+)>/i);
        return {
            stateId:      stateId,
            itemId:       Number(mItem[1]),
            pageNum:      mDesc ? Number(mDesc[1]) : 1,
            glossaryType: mType ? Number(mType[1]) : 1,
            category:     mCat  ? mCat[1].trim()      : null
        };
    }

    function makeData(stateId, entry) {
        return {
            stateId:      stateId,
            itemId:       entry.itemId,
            pageNum:      entry.pageNum,
            glossaryType: entry.glossaryType,
            category:     entry.category
        };
    }

    //=====================================================================
    // Вспомогательные
    //=====================================================================
    function getStateListWithIcons(battler) {
        return battler.states().filter(function(s) { return s.iconIndex > 0; });
    }

    function absolutePos(sprite) {
        var x = 0, y = 0, s = sprite;
        while (s) { x += s.x || 0; y += s.y || 0; s = s.parent; }
        return { x: x, y: y };
    }

    function isHit(sprite, tx, ty) {
        if (!sprite || !sprite.visible) return false;
        var p = absolutePos(sprite);
        return tx >= p.x && tx < p.x + ICON_SIZE &&
               ty >= p.y && ty < p.y + ICON_SIZE;
    }

    function findGlossaryItemIndex(listWindow, itemId) {
        var data = listWindow._data || [];
        for (var i = 0; i < data.length; i++) {
            if (data[i] && data[i].id === itemId) return i;
        }
        return -1;
    }

    //=====================================================================
    // Перехват клика по иконке
    //=====================================================================
    var _update_sprites = Battle_Hud.prototype.update_sprites;
    Battle_Hud.prototype.update_sprites = function() {
        _update_sprites.call(this);
        this.processStateIconClick();
    };

    Battle_Hud.prototype.processStateIconClick = function() {
        if (!this._battler || !this._battler.isActor()) return;
        if (!TouchInput.isTriggered()) return;
        if (!this.is_hud_visible()) return;
        var scene = SceneManager._scene;
        if (!(scene instanceof Scene_Battle)) return;
        if (scene._glossaryActive) return;
        if (scene._glossaryCancelBlock > 0) return;
        if ($gameMessage.isBusy()) return;
        var tx = TouchInput.x, ty = TouchInput.y;
        var stateList = getStateListWithIcons(this._battler);
        if (stateList.length === 0) return;
        if (this._stateType === 1) {
            this.handleLineModeClick(tx, ty, stateList, scene);
        } else {
            this.handleTimingModeClick(tx, ty, stateList, scene);
        }
    };

    Battle_Hud.prototype.handleTimingModeClick = function(tx, ty, stateList, scene) {
        // ---------------------------------------------------------------
        // Новый режим: 2 иконки (TimingModeTwoIcons.js)
        // Признаки: _stateDataList заполнен и _stateIcons содержит 2 слота
        // ---------------------------------------------------------------
        if (this._stateDataList && this._stateIcons &&
            this._stateIcons.length >= 1 && this._state_icon && this._state_icon.visible) {
            var n = this._stateDataList.length;
            if (n === 0) return;

            var shift = (this._states_data && this._states_data[0]) || 0;
            var count = Math.min(2, n);

            for (var i = 0; i < count; i++) {
                var icon = this._stateIcons[i];
                if (!icon || !icon.visible) continue;
                if (!isHit(icon, tx, ty)) continue;

                var entry = this._stateDataList[(shift + i) % n];
                if (!entry) return;

                var actorId = this._battler._actorId;   // ← актёр именно этого HUD
                var data = getStateGlossaryData(entry.stateId, actorId);
                if (data) this.openGlossaryForState(scene, data);
                return;
            }
            return;
        }

        // ---------------------------------------------------------------
        // Старый режим MOG (одна иконка в Timing Mode)
        // ---------------------------------------------------------------
        if (!this._state_icon) return;
        if (!isHit(this._state_icon, tx, ty)) return;

        var idx = (this._states_data && this._states_data[1]) || 0;
        if (idx < 0 || idx >= stateList.length) return;

        var actorId = this._battler._actorId;
        var data = getStateGlossaryData(stateList[idx].id, actorId);
        if (!data) return;
        this.openGlossaryForState(scene, data);
    };

    Battle_Hud.prototype.handleLineModeClick = function(tx, ty, stateList, scene) {
        if (!this._stateIcons || this._stateIcons.length === 0) return;
        var buffCount = this._battler.buffIcons().length;
        for (var i = 0; i < this._stateIcons.length; i++) {
            if (!isHit(this._stateIcons[i], tx, ty)) continue;
            if (i < buffCount) return;
            var stateIdx = i - buffCount;
            if (stateIdx >= stateList.length) return;
            var actorId = this._battler._actorId;
            var data = getStateGlossaryData(stateList[stateIdx].id, actorId);
            if (data) this.openGlossaryForState(scene, data);
            return;
        }
    };

    //=====================================================================
    // Открытие глоссария
    //=====================================================================
    Battle_Hud.prototype.openGlossaryForState = function(scene, data) {
        SoundManager.playOk();

        if (typeof window.GlossaryOverlay !== 'function') {
            console.warn('[SGC] window.GlossaryOverlay не определён. ' +
                         'Добавьте в конец BattleGlossaryButton.js: window.GlossaryOverlay = GlossaryOverlay;');
            return;
        }
        if (!$dataItems[data.itemId]) {
            console.warn('[SGC] предмет id=' + data.itemId + ' не найден в БД.');
            return;
        }

        $gameParty.setSelectedGlossaryType(data.glossaryType);
        scene._stateGlossarySkipTouch = 2;

        if (!scene._glossaryOverlay) {
            scene._glossaryOverlay = new window.GlossaryOverlay(scene);
        }
        var overlay = scene._glossaryOverlay;
        overlay.show(data.glossaryType);
        this.navigateToItemAndPage(overlay, data);
    };

    //=====================================================================
    // Навигация: категория → предмет → страница
    //=====================================================================
    Battle_Hud.prototype.navigateToItemAndPage = function(overlay, data) {
        // --- 1. Категория ---
        if ($gameParty.isUseGlossaryCategory()) {
            var catWin = overlay._windows.category;
            if (catWin) {
                var catIndex = this.findCategoryIndex(data);
                if (catIndex >= 0) catWin.select(catIndex);
                overlay.onOkCategory();
            }
        }

        // --- 2. Предмет ---
        var listWin = overlay._windows.list;
        if (!listWin || listWin.maxItems() === 0) {
            console.warn('[SGC] список пуст.');
            return;
        }
        var itemIdx = findGlossaryItemIndex(listWin, data.itemId);
        if (itemIdx < 0) {
            console.warn('[SGC] предмет id=' + data.itemId + ' отсутствует в списке. ' +
                         'Включите VisibleItemNotYet / UseItemHistory или получите предмет. ' +
                         'В списке: [' +
                         (listWin._data || []).map(function(it){return it.id;}).join(',') + ']');
            return;
        }
        listWin.select(itemIdx);

        // --- 3. refreshPage (обходит lock A_fix_glossary_hover) ---
        var gWin = overlay._windows.glossary;
        var item = listWin.item();
        if (!gWin || !item) {
            console.warn('[SGC] нет окна глоссария или предмета.');
            return;
        }

        var refreshOK = false;
        try {
            gWin.refreshPage(item, itemIdx);
            refreshOK = true;
            console.log('[SGC] refreshPage OK. _maxPages=' + gWin._maxPages +
                        ', _itemData=' + (gWin._itemData ? gWin._itemData.id : 'null'));
        } catch (e) {
            console.error('[SGC] refreshPage бросил исключение:', e);
        }

        if (!refreshOK || !gWin._itemData) {
            try {
                gWin._listIndex = itemIdx;
                gWin._itemData  = item;
                gWin._enemy     = null;
                gWin._maxPages  = $gameParty.hasGlossary(item) ? gWin.calcMaxPages(0) : 1;
                gWin._pageIndex = 0;
                gWin.drawItem(0, true);
            } catch (e) {
                console.error('[SGC] manual refresh бросил исключение:', e);
            }
        }
        if (typeof listWin.refresh === 'function') listWin.refresh();

        // --- 4. Страница SGDescriptionX ---
        if (data.pageNum > 1) {
            var maxPages = gWin._maxPages || 1;
            var pageIdx  = Math.min(data.pageNum - 1, maxPages - 1);
            console.log('[SGC] navigate: pageNum=' + data.pageNum +
                        ', maxPages=' + maxPages + ', targetIdx=' + pageIdx);
            if (pageIdx > 0) {
                try {
                    gWin.contents.clear();
                    gWin._pageIndex      = pageIdx;
                    gWin._footerBasePage = null;
                    gWin._footerIndex    = -1;
                    gWin._subPages       = null;
                    gWin._subPageIndex   = -1;
                    gWin._forceDraw      = true;
                    gWin.drawItem(pageIdx, true);
                    gWin._forceDraw      = false;
                } catch (e) {
                    console.error('[SGC] drawItem(' + pageIdx + ') бросил:', e);
                }
            } else if (maxPages <= 1) {
                console.warn('[SGC] maxPages=1 — SGDescription' + data.pageNum +
                             ' на этом предмете не найдена.');
            }
        }
    };

    Battle_Hud.prototype.findCategoryIndex = function(data) {
        var list = $gameParty.getAllGlossaryCategory();
        var name = data.category;
        if (!name) {
            var item = $dataItems[data.itemId];
            if (item) name = $gameParty.getGlossaryCategory(item).split(',')[0].trim();
        }
        if (!name) return -1;
        return list.indexOf(name);
    };

    //=====================================================================
    // Патч drawItemText — защита от асинхронной отрисовки чужой страницы
    //=====================================================================
    var _wG_drawItemText_sgc = Window_Glossary.prototype.drawItemText;
    Window_Glossary.prototype.drawItemText = function(text, y) {
        if (typeof TranslationManager !== 'undefined') {
            var capturedPageIndex = this._pageIndex;
            var capturedItemId    = this._itemData ? this._itemData.id : null;
            TranslationManager.getTranslatePromise(text).then(function(translatedText) {
                if (this._pageIndex !== capturedPageIndex) return;
                if (!this._itemData || this._itemData.id !== capturedItemId) return;
                this.drawTextEx(translatedText, 0, y);
            }.bind(this));
        } else {
            this.drawTextEx(text, 0, y);
        }
    };

    //=====================================================================
    // Патч processTouch
    //=====================================================================
    var _wG_processTouch_sgc = Window_Glossary.prototype.processTouch;
    Window_Glossary.prototype.processTouch = function() {
        var scene = SceneManager._scene;
        if (scene && scene._stateGlossarySkipTouch > 0) return;
        _wG_processTouch_sgc.call(this);
    };

    var _sceneBattleUpdate_sgc = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _sceneBattleUpdate_sgc.call(this);
        if (this._stateGlossarySkipTouch > 0) this._stateGlossarySkipTouch--;
    };

})();
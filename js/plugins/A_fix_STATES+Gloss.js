/*:
 * @plugindesc v1.7 - Клик по иконке состояния → глоссарий (с условной логикой по актёру, исправлено позиционирование, работает для врагов Olivia_OctoBattle)
 * @author
 *
 * @param ClickOffsetX
 * @desc Смещение области клика по X в пикселях (может быть отрицательным).
 * @default 0
 * @type number
 * @min -200
 * @max 200
 *
 * @param ClickOffsetY
 * @desc Смещение области клика по Y в пикселях (может быть отрицательным).
 * @default 0
 * @type number
 * @min -200
 * @max 200
 *
 * @param EnableForEnemies
 * @desc Разрешить клик по иконкам состояний над врагами (не только актёрами).
 * Для врагов берётся fallback-запись <glossary:0|...>.
 * @default false
 * @type boolean
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
 * ============================================================
 * НОВЫЙ ФОРМАТ (условия по ID актёра):
 * ============================================================
 *   <glossary:actorId|itemId|descNum|glossaryType|category>
 *
 * actorId = 0 → fallback (используется в т.ч. для врагов).
 *
 * ============================================================
 * ПРИОРИТЕТ ПРИ КЛИКЕ:
 * ============================================================
 *   1. <glossary:actorId|...> с точным actorId
 *   2. <glossary:0|...>            (fallback)
 *   3. старые теги <glossaryItem:...>
 *
 * ============================================================
 * ДЛЯ ВРАГОВ (Olivia_OctoBattle):
 * ============================================================
 * Патч ниже перехватывает клик по _stateIconSprite в Window_WeaknessDisplay
 * для врагов. Работает даже если EnableForEnemies = false — независимая ветка.
 * Требуется тег <glossary:0|itemId|desc|type|category> на состоянии.
 */
(function() {
    'use strict';
    window._sgcDebug = true;

    var parameters = PluginManager.parameters('StateGlossaryClick');
    var CLICK_OFFSET_X     = Number(parameters['ClickOffsetX'] || 0);
    var CLICK_OFFSET_Y     = Number(parameters['ClickOffsetY'] || 0);
    var ENABLE_FOR_ENEMIES = (parameters['EnableForEnemies'] === 'true');

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
    // Получение данных глоссария для состояния + актёра (0 = fallback/враг)
    //=====================================================================
    function getStateGlossaryData(stateId, actorId) {
        var state = $dataStates[stateId];
        if (!state || !state.note) return null;

        var entries = parseNewGlossaryEntries(state.note);
        if (entries.length > 0) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].actorId === actorId) {
                    return makeData(stateId, entries[i]);
                }
            }
            for (var j = 0; j < entries.length; j++) {
                if (entries[j].actorId === 0) {
                    return makeData(stateId, entries[j]);
                }
            }
        }

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

    //---------------------------------------------------------------------
    // ТОЧНАЯ мировая позиция + масштаб спрайта (учитывает scale/anchor всех родителей)
    //---------------------------------------------------------------------
    function absolutePos(sprite) {
        if (!sprite) return { x: 0, y: 0, scaleX: 1, scaleY: 1 };

        if (typeof PIXI !== 'undefined' && sprite.toGlobal) {
            try {
                var p0 = sprite.toGlobal(new PIXI.Point(0, 0));
                var px = sprite.toGlobal(new PIXI.Point(1, 0));
                var py = sprite.toGlobal(new PIXI.Point(0, 1));

                var dx = px.x - p0.x, dy = px.y - p0.y;
                var ex = py.x - p0.x, ey = py.y - p0.y;
                var scaleX = Math.sqrt(dx * dx + dy * dy);
                var scaleY = Math.sqrt(ex * ex + ey * ey);

                var anchorX = (sprite.anchor && sprite.anchor.x) || 0;
                var anchorY = (sprite.anchor && sprite.anchor.y) || 0;
                var w = (sprite.width  || 0) * scaleX;
                var h = (sprite.height || 0) * scaleY;

                return {
                    x: p0.x - anchorX * w,
                    y: p0.y - anchorY * h,
                    scaleX: scaleX,
                    scaleY: scaleY
                };
            } catch (e) {
                console.warn('[SGC] toGlobal failed, используем fallback:', e);
            }
        }

        var x = 0, y = 0, s = sprite;
        while (s) { x += s.x || 0; y += s.y || 0; s = s.parent; }
        return { x: x, y: y, scaleX: 1, scaleY: 1 };
    }

    function isHit(sprite, tx, ty) {
        if (!sprite || !sprite.visible) return false;

        var p = absolutePos(sprite);
        var w = ICON_SIZE * p.scaleX;
        var h = ICON_SIZE * p.scaleY;
        var left = p.x + CLICK_OFFSET_X;
        var top  = p.y + CLICK_OFFSET_Y;
        var hit = tx >= left && tx < left + w &&
                  ty >= top  && ty < top  + h;

        // === SGC DEBUG ===
        if (window._sgcDebug) {
            var tl  = sprite.toGlobal(new PIXI.Point(0, 0));
            var br  = sprite.toGlobal(new PIXI.Point(sprite.width || 0, sprite.height || 0));
            var gb  = sprite.getBounds ? sprite.getBounds() : null;
            console.log('[SGC] isHit', {
                click: { x: tx, y: ty },
                hitArea: { left: left, top: top, w: w, h: h,
                           right: left + w, bottom: top + h },
                getBounds: gb ? { x: gb.x, y: gb.y, w: gb.width, h: gb.height } : 'n/a',
                toGlobal_origin: { x: tl.x, y: tl.y },
                toGlobal_br:     { x: br.x, y: br.y },
                anchor: sprite.anchor ? { x: sprite.anchor.x, y: sprite.anchor.y } : null,
                scale:  { x: sprite.scale.x, y: sprite.scale.y },
                width: sprite.width, height: sprite.height,
                texture: sprite.texture ? { w: sprite.texture.width, h: sprite.texture.height } : null,
                effectiveScale: { x: p.scaleX, y: p.scaleY },
                hit: hit
            });
        }
        return hit;
    }

    function findGlossaryItemIndex(listWindow, itemId) {
        var data = listWindow._data || [];
        for (var i = 0; i < data.length; i++) {
            if (data[i] && data[i].id === itemId) return i;
        }
        return -1;
    }

    // actorId для глоссария: актёр → свой ID, враг → 0 (fallback)
    Battle_Hud.prototype._sgcGlossaryActorId = function() {
        if (!this._battler) return 0;
        if (this._battler.isActor()) return this._battler._actorId;
        return 0;
    };

    //=====================================================================
    // Перехват клика по иконке (для HUD актёров/врагов)
    //=====================================================================
    var _update_sprites = Battle_Hud.prototype.update_sprites;
    Battle_Hud.prototype.update_sprites = function() {
        _update_sprites.call(this);
        this.processStateIconClick();
    };

    Battle_Hud.prototype.processStateIconClick = function() {
        if (!this._battler) return;
        var isActor = this._battler.isActor();
        if (!isActor && !ENABLE_FOR_ENEMIES) return;
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
        // --- 2 иконки (TimingModeTwoIcons.js) ---
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

                var data = getStateGlossaryData(entry.stateId, this._sgcGlossaryActorId());
                if (data) this.openGlossaryForState(scene, data);
                return;
            }
            return;
        }

        // --- Старый режим MOG (одна иконка в Timing Mode) ---
        if (!this._state_icon) return;
        if (!isHit(this._state_icon, tx, ty)) return;

        var idx = (this._states_data && this._states_data[1]) || 0;
        if (idx < 0 || idx >= stateList.length) return;

        var data = getStateGlossaryData(stateList[idx].id, this._sgcGlossaryActorId());
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
            var data = getStateGlossaryData(stateList[stateIdx].id, this._sgcGlossaryActorId());
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

    //=====================================================================
    // == StateGlossaryClick — ENEMY PATCH v1.1 ==
    // Клик по иконке состояния врага (Olivia_OctoBattle / Window_WeaknessDisplay)
    //=====================================================================
    (function() {
        'use strict';
        if (typeof Battle_Hud === 'undefined') return;

        var ICON = 32;

        var _update_sprites_enemy = Battle_Hud.prototype.update_sprites;
        Battle_Hud.prototype.update_sprites = function() {
            _update_sprites_enemy.call(this);
            // Защита от множественного запуска в одном кадре —
            // первый HUD открывает глоссарий и ставит _stateGlossarySkipTouch = 2,
            // последующие HUD'ы в этом же кадре увидят его и выйдут.
            processEnemyClick();
        };

        function processEnemyClick() {
            if (!TouchInput.isTriggered()) return;
            var scene = SceneManager._scene;
            if (!(scene instanceof Scene_Battle)) return;
            if (scene._glossaryActive) return;
            if (scene._glossaryCancelBlock > 0) return;
            if (scene._stateGlossarySkipTouch > 0) return;  // ← защита от двойного открытия
            if ($gameMessage.isBusy()) return;

            var tx = TouchInput.x, ty = TouchInput.y;
            var spriteset = scene._spriteset;

            for (var i = 0; i < spriteset._enemySprites.length; i++) {
                var spr = spriteset._enemySprites[i];
                if (!spr || !spr._enemy) continue;
                var ww = spr._weaknessWindow;
                var icon = ww && ww._stateIconSprite;
                if (!icon || !icon.visible) continue;

                // getBounds учитывает _baseSprite, scale, anchor — то, что не учитывает ww.x + s.x
                var b = icon.getBounds();
                if (tx < b.x || tx >= b.x + b.width) continue;
                if (ty < b.y || ty >= b.y + b.height) continue;

                var activeStates = spr._enemy.states().filter(function(s){ return s.iconIndex > 0; });
                if (activeStates.length === 0) continue;
                var curIcon = icon._iconIndex;
                var st = activeStates.find(function(s){ return s.iconIndex === curIcon; }) || activeStates[0];

                var data = getEnemyGlossaryData(st.id);
                if (!data) {
                    console.warn('[SGC-ENEMY] state ' + st.id + ' (' + st.name + ') — нет тега <glossary:0|...> или <glossaryItem:...>');
                    return;
                }
                openEnemyGlossary(scene, data);
                return;
            }
        }

        function getEnemyGlossaryData(stateId) {
            var state = $dataStates[stateId];
            if (!state || !state.note) return null;

            // Новый формат: <glossary:0|itemId|desc|type|category>
            var m = state.note.match(/<glossary:\s*0\s*\|([^>]+)>/i);
            if (m) {
                var parts = m[1].split('|').map(function(s){ return s.trim(); });
                return {
                    stateId: stateId,
                    itemId: parseInt(parts[0]),
                    pageNum: parts[1] ? parseInt(parts[1]) : 1,
                    glossaryType: parts[2] ? parseInt(parts[2]) : 1,
                    category: parts[3] || null
                };
            }
            // Старый формат
            var mi = state.note.match(/<glossaryItem:\s*(\d+)>/i);
            if (!mi) return null;
            var md = state.note.match(/<glossaryDesc:\s*(\d+)>/i);
            var mt = state.note.match(/<glossaryType:\s*(\d+)>/i);
            return {
                stateId: stateId,
                itemId: Number(mi[1]),
                pageNum: md ? Number(md[1]) : 1,
                glossaryType: mt ? Number(mt[1]) : 1
            };
        }

        function openEnemyGlossary(scene, data) {
            SoundManager.playOk();
            if (typeof window.GlossaryOverlay !== 'function') {
                console.warn('[SGC-ENEMY] window.GlossaryOverlay не определён');
                return;
            }
            if (!$dataItems[data.itemId]) {
                console.warn('[SGC-ENEMY] item id=' + data.itemId + ' не найден');
                return;
            }
            $gameParty.setSelectedGlossaryType(data.glossaryType);
            scene._stateGlossarySkipTouch = 2;
            if (!scene._glossaryOverlay) scene._glossaryOverlay = new window.GlossaryOverlay(scene);
            scene._glossaryOverlay.show(data.glossaryType);

            // Навигация — через HUD-инстанс, если он есть; иначе через прототип
            var navFn = null;
            if (scene._spriteset && scene._spriteset.children) {
                for (var k = 0; k < scene._spriteset.children.length; k++) {
                    var c = scene._spriteset.children[k];
                    if (c instanceof Battle_Hud && typeof c.navigateToItemAndPage === 'function') {
                        navFn = c.navigateToItemAndPage.bind(c);
                        break;
                    }
                }
            }
            if (!navFn && typeof Battle_Hud.prototype.navigateToItemAndPage === 'function') {
                var fakeThis = {
                    findCategoryIndex: Battle_Hud.prototype.findCategoryIndex
                };
                navFn = Battle_Hud.prototype.navigateToItemAndPage.bind(fakeThis);
            }
            if (navFn) {
                navFn(scene._glossaryOverlay, data);
            } else {
                console.warn('[SGC-ENEMY] navigateToItemAndPage недоступен');
            }
        }
    })();

})();
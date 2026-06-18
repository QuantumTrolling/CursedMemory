//=============================================================================
// Element Damage Icons
// EDamageIcons.js
//=============================================================================
// v1.4 – Полный перехват startDamagePopup из LGP для точной привязки иконок
// Требуется: YEP_ElementCore и LGP_BetterDamagePopup.
// Разместите этот плагин НИЖЕ LGP_BetterDamagePopup.
//=============================================================================

var Imported = Imported || {};
Imported.EDamageIcons = true;

var EDamageIcons = EDamageIcons || {};
EDamageIcons.version = '1.4';

/*:
 * @plugindesc v1.4 Иконки элементов и состояний в попапах урона.
 * @author YourName
 *
 * @param Icon Mapping
 * @type text
 * @desc JSON: ID элемента → индекс иконки. Пример: {"3":120, "4":121}
 * @default {}
 *
 * @param Icon Position
 * @type select
 * @option Справа
 * @value right
 * @option Слева
 * @value left
 * @option Сверху
 * @value top
 * @option Снизу
 * @value bottom
 * @desc Положение иконок относительно числа урона.
 * @default right
 *
 * @param Icon Offset X
 * @type number
 * @desc Смещение иконок по горизонтали.
 * @default 4
 *
 * @param Icon Offset Y
 * @type number
 * @desc Смещение иконок по вертикали.
 * @default 0
 *
 * @param Icon Scale
 * @type number
 * @decimals 2
 * @desc Масштаб иконок (1 = стандартный размер).
 * @default 1.0
 *
 * @param Max Icons
 * @type number
 * @desc Максимальное количество иконок стихий (0 = все).
 * @default 3
 *
 * @help
 * ============================================================================
 * Введение
 * ============================================================================
 * Дополняет Better Damage Popup (LGP).
 * Показывает иконки стихий (из Icon Mapping) или иконку состояния,
 * вызвавшего урон/лечение через YEP_BuffsStatesCore.
 *
 * Для состояний: добавьте в заметки <State Damage Icon>.
 * Тогда при срабатывании Custom Turn/Regen/Action End Effect
 * в попапе появится иконка именно этого состояния.
 */
//=============================================================================

(function() {
    'use strict';

    if (!Imported.LGP_BetterDamagePopup || !Imported.YEP_ElementCore) return;

    //=============================================================================
    // Параметры плагина
    //=============================================================================

    var parameters = PluginManager.parameters('EDamageIcons');

    // Нормализуем ключи iconMapping — переводим строковые ключи в числа
    var iconMapping = {};
    try {
        var rawMapping = JSON.parse(parameters['Icon Mapping'] || '{}');
        for (var key in rawMapping) {
            if (rawMapping.hasOwnProperty(key)) {
                var numKey = Number(key);
                if (!isNaN(numKey)) {
                    iconMapping[numKey] = rawMapping[key];
                }
            }
        }
    } catch (e) {
        console.error('EDamageIcons: Ошибка Icon Mapping.', e);
    }

    var iconPosition = parameters['Icon Position'] || 'right';
    var iconOffsetX = Number(parameters['Icon Offset X']) || 4;
    var iconOffsetY = Number(parameters['Icon Offset Y']) || 0;
    var iconScale = Number(parameters['Icon Scale']) || 1.0;
    var maxIcons = Number(parameters['Max Icons']) || 3;

    //=============================================================================
    // Предварительный парсинг нотетега состояний при загрузке базы
    //=============================================================================

    var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!this._EDamageIcons_parsed) {
            for (var i = 1; i < $dataStates.length; i++) {
                var state = $dataStates[i];
                if (state && state.note && state.note.match(/<State Damage Icon>/i)) {
                    state._stateDamageIcon = true;
                }
            }
            this._EDamageIcons_parsed = true;
        }
        return true;
    };

    //=============================================================================
    // Интеграция с YEP_BuffsStatesCore
    //=============================================================================

    if (Imported.YEP_BuffsStatesCore) {

        var _EDI_customEffectEval = Game_Battler.prototype.customEffectEval;
        Game_Battler.prototype.customEffectEval = function(stateId, type) {
            var state = $dataStates[stateId];
            if (
                state &&
                state._stateDamageIcon &&
                state.customEffectEval &&
                state.customEffectEval[type] !== ''
            ) {
                this._pendingStateDamageIcon = state.iconIndex;
            }
            _EDI_customEffectEval.call(this, stateId, type);
            // Если иконка не была использована в startDamagePopup, удаляем её
            if (this._pendingStateDamageIcon !== undefined) {
                delete this._pendingStateDamageIcon;
            }
        };

        if (Game_Battler.prototype.reactEffectEval) {
            var _EDI_reactEffectEval = Game_Battler.prototype.reactEffectEval;
            Game_Battler.prototype.reactEffectEval = function(stateId) {
                var state = $dataStates[stateId];
                if (state && state._stateDamageIcon) {
                    this._pendingStateDamageIcon = state.iconIndex;
                }
                _EDI_reactEffectEval.call(this, stateId);
                if (this._pendingStateDamageIcon !== undefined) {
                    delete this._pendingStateDamageIcon;
                }
            };
        }
    }

    //=============================================================================
    // Переопределяем startDamagePopup, чтобы иконка попадала только в нужный тип урона
    // Копируем код из LGP_BetterDamagePopup и добавляем вставку _stateDamageIcon
    //=============================================================================

    Game_Battler.prototype.startDamagePopup = function() {
        var result = this.result();
        if (result.missed || result.evaded) {
            var copyResult = JsonEx.makeDeepCopy(result);
            copyResult.hpAffected = false;
            copyResult.mpDamage = 0;
            copyResult.tpDamage = 0;
            copyResult.addedStates = [];
            copyResult.removedStates = [];
            copyResult.addedBuffs = [];
            copyResult.addedDebuffs = [];
            copyResult.removedBuffs = [];
            this._damagePopup.push(copyResult);
        }
        if (result.hpAffected) {
            var copyResult = JsonEx.makeDeepCopy(result);
            copyResult.mpDamage = 0;
            copyResult.tpDamage = 0;
            copyResult.missed = false;
            copyResult.evaded = false;
            copyResult.addedStates = [];
            copyResult.removedStates = [];
            copyResult.addedBuffs = [];
            copyResult.addedDebuffs = [];
            copyResult.removedBuffs = [];
            // Вставляем иконку состояния, если она ожидает
            if (this._pendingStateDamageIcon !== undefined && this._pendingStateDamageIcon !== null) {
                copyResult._stateDamageIcon = this._pendingStateDamageIcon;
                delete this._pendingStateDamageIcon;
            }
            this._damagePopup.push(copyResult);
        }
        if (result.mpDamage !== 0) {
            var copyResult = JsonEx.makeDeepCopy(result);
            copyResult.hpAffected = false;
            copyResult.tpDamage = 0;
            copyResult.missed = false;
            copyResult.evaded = false;
            copyResult.addedStates = [];
            copyResult.removedStates = [];
            copyResult.addedBuffs = [];
            copyResult.addedDebuffs = [];
            copyResult.removedBuffs = [];
            if (this._pendingStateDamageIcon !== undefined && this._pendingStateDamageIcon !== null) {
                copyResult._stateDamageIcon = this._pendingStateDamageIcon;
                delete this._pendingStateDamageIcon;
            }
            this._damagePopup.push(copyResult);
        }
        if (result.tpDamage !== 0) {
            var copyResult = JsonEx.makeDeepCopy(result);
            copyResult.hpAffected = false;
            copyResult.mpDamage = 0;
            copyResult.missed = false;
            copyResult.evaded = false;
            copyResult.addedStates = [];
            copyResult.removedStates = [];
            copyResult.addedBuffs = [];
            copyResult.addedDebuffs = [];
            copyResult.removedBuffs = [];
            if (this._pendingStateDamageIcon !== undefined && this._pendingStateDamageIcon !== null) {
                copyResult._stateDamageIcon = this._pendingStateDamageIcon;
                delete this._pendingStateDamageIcon;
            }
            this._damagePopup.push(copyResult);
        }
        if (result.isStatusAffected()) {
            var copyResult = JsonEx.makeDeepCopy(result);
            copyResult.clear();
            copyResult.addedStates = result.addedStates;
            copyResult.removedStates = result.removedStates;
            copyResult.addedBuffs = result.addedBuffs;
            copyResult.addedDebuffs = result.addedDebuffs;
            copyResult.removedBuffs = result.removedBuffs;
            // Иконку состояния в статусные попапы не добавляем
            this._damagePopup.push(copyResult);
        }
    };

    //=============================================================================
    // Sprite_Damage — отрисовка иконок
    //=============================================================================

    var _Sprite_Damage_drawDefaultNumber = Sprite_Damage.prototype.drawDefaultNumber;
    Sprite_Damage.prototype.drawDefaultNumber = function() {
        _Sprite_Damage_drawDefaultNumber.call(this);

        if (this._result && this._result._stateDamageIcon) {
            this._addStateIcon();
        } else if (this._result && this._result.itemElements && this._result.itemElements.length > 0) {
            this._addElementIcons();
        }
    };

    Sprite_Damage.prototype._addStateIcon = function() {
        var numberSprite = this.getChild('number');
        if (!numberSprite) return;

        if (numberSprite._elementIconContainer) {
            numberSprite.removeChild(numberSprite._elementIconContainer);
        }

        var container = new Sprite();
        numberSprite._elementIconContainer = container;
        numberSprite.addChild(container);

        var iconBitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var iconIndex = this._result._stateDamageIcon;

        var bw = numberSprite.bitmap.width;
        var bh = numberSprite.bitmap.height;
        var startX, startY;
        var totalWidth = pw * iconScale;

        switch (iconPosition) {
            case 'right':
                startX = bw / 2 + iconOffsetX;
                startY = -bh / 2 + iconOffsetY - (ph * iconScale) / 2;
                break;
            case 'left':
                startX = -bw / 2 - totalWidth - iconOffsetX;
                startY = -bh / 2 + iconOffsetY - (ph * iconScale) / 2;
                break;
            case 'top':
                startX = -totalWidth / 2 + iconOffsetX;
                startY = -bh - iconOffsetY - ph * iconScale;
                break;
            case 'bottom':
                startX = -totalWidth / 2 + iconOffsetX;
                startY = iconOffsetY;
                break;
        }

        container.x = startX;
        container.y = startY;

        var iconSprite = new Sprite();
        iconSprite.bitmap = new Bitmap(pw, ph);
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        iconSprite.bitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0);
        iconSprite.scale.x = iconScale;
        iconSprite.scale.y = iconScale;
        container.addChild(iconSprite);

        delete this._result._stateDamageIcon;
    };

    Sprite_Damage.prototype._addElementIcons = function() {
        var result = this._result;
        var elements = result.itemElements.filter(function(elId) {
            return iconMapping[elId] !== undefined;
        });
        if (elements.length === 0) return;

        if (maxIcons > 0 && elements.length > maxIcons) {
            elements = elements.slice(0, maxIcons);
        }

        var numberSprite = this.getChild('number');
        if (!numberSprite) return;

        if (numberSprite._elementIconContainer) {
            numberSprite.removeChild(numberSprite._elementIconContainer);
        }

        var container = new Sprite();
        numberSprite._elementIconContainer = container;
        numberSprite.addChild(container);

        var iconBitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;

        var bw = numberSprite.bitmap.width;
        var bh = numberSprite.bitmap.height;
        var totalIconsWidth = elements.length * pw * iconScale;
        var startX, startY;

        switch (iconPosition) {
            case 'right':
                startX = bw / 2 + iconOffsetX;
                startY = -bh / 2 + iconOffsetY - (ph * iconScale) / 2;
                break;
            case 'left':
                startX = -bw / 2 - totalIconsWidth - iconOffsetX;
                startY = -bh / 2 + iconOffsetY - (ph * iconScale) / 2;
                break;
            case 'top':
                startX = -totalIconsWidth / 2 + iconOffsetX;
                startY = -bh - iconOffsetY - ph * iconScale;
                break;
            case 'bottom':
                startX = -totalIconsWidth / 2 + iconOffsetX;
                startY = iconOffsetY;
                break;
        }

        container.x = startX;
        container.y = startY;

        for (var i = 0; i < elements.length; i++) {
            var iconIndex = iconMapping[elements[i]];
            var iconSprite = new Sprite();
            iconSprite.bitmap = new Bitmap(pw, ph);
            var sx = iconIndex % 16 * pw;
            var sy = Math.floor(iconIndex / 16) * ph;
            iconSprite.bitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0);
            iconSprite.scale.x = iconScale;
            iconSprite.scale.y = iconScale;
            iconSprite.x = i * pw * iconScale;
            container.addChild(iconSprite);
        }
    };

})();
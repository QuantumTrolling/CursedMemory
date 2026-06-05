//=============================================================================
// Element Damage Icons
// EDamageIcons.js
//=============================================================================
// Плагин добавляет иконки элементов к попапам урона.
// Требуется: YEP_ElementCore и LGP_BetterDamagePopup.
// Разместите этот плагин НИЖЕ LGP_BetterDamagePopup в списке плагинов.
//=============================================================================

var Imported = Imported || {};
Imported.EDamageIcons = true;

var EDamageIcons = EDamageIcons || {};
EDamageIcons.version = '1.0';

/*:
 * @plugindesc v1.0 Отображает иконки элементов (стихий) рядом с цифрами урона.
 * @author YourName
 *
 * @param Icon Mapping
 * @type text
 * @desc JSON-объект: ID элемента → индекс иконки. Пример: {"3":120, "4":121}
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
 * @desc Максимальное количество отображаемых иконок (0 = все).
 * @default 3
 *
 * @help
 * ============================================================================
 * Введение
 * ============================================================================
 *
 * Этот плагин дополняет Better Damage Popup от Azel, добавляя к числам
 * урона маленькие иконки элементов, которыми была совершена атака.
 * Для работы необходимы:
 *   - YEP_ElementCore (или ваша модифицированная версия)
 *   - LGP_BetterDamagePopup
 *
 * Разместите плагин **после** LGP_BetterDamagePopup в списке плагинов.
 *
 * ============================================================================
 * Настройка
 * ============================================================================
 *
 * В параметре «Icon Mapping» укажите JSON-строку, связывающую ID элементов
 * (из вкладки "Типы" в базе данных) с индексами иконок (из набора IconSet).
 * Например:
 *   {"1":64, "2":65, "3":120}
 *
 * Остальные параметры управляют расположением и масштабом иконок.
 */
//=============================================================================

(function() {
    'use strict';

    // Проверяем, что нужные плагины загружены
    if (!Imported.LGP_BetterDamagePopup || !Imported.YEP_ElementCore) return;

    //=============================================================================
    // Parameter Parsing
    //=============================================================================

    var parameters = PluginManager.parameters('EDamageIcons');

    var iconMappingStr = parameters['Icon Mapping'] || '{}';
    var iconMapping = {};
    try {
        iconMapping = JSON.parse(iconMappingStr);
    } catch (e) {
        console.error('EDamageIcons: Ошибка парсинга Icon Mapping. Используется пустой объект.', e);
    }

    var iconPosition = parameters['Icon Position'] || 'right';
    var iconOffsetX = Number(parameters['Icon Offset X']) || 4;
    var iconOffsetY = Number(parameters['Icon Offset Y']) || 0;
    var iconScale = Number(parameters['Icon Scale']) || 1.0;
    var maxIcons = Number(parameters['Max Icons']) || 3;

    //=============================================================================
    // Sprite_Damage - добавляем иконки к стандартному отображению числа
    //=============================================================================

    var _Sprite_Damage_drawDefaultNumber = Sprite_Damage.prototype.drawDefaultNumber;

    Sprite_Damage.prototype.drawDefaultNumber = function() {
        // Вызываем оригинальный метод отрисовки числа (из LGP)
        _Sprite_Damage_drawDefaultNumber.call(this);

        // Если есть элементы – добавляем иконки
        if (this._result && this._result.itemElements && this._result.itemElements.length > 0) {
            this._addElementIcons();
        }
    };

    /**
     * Создаёт контейнер с иконками элементов и добавляет его к спрайту числа.
     */
    Sprite_Damage.prototype._addElementIcons = function() {
        var result = this._result;
        var elements = result.itemElements.filter(function(elId) {
            return iconMapping[elId] !== undefined;
        });
        if (elements.length === 0) return;

        // Применяем ограничение по количеству
        if (maxIcons > 0 && elements.length > maxIcons) {
            elements = elements.slice(0, maxIcons);
        }

        // Спрайт числа (создан в оригинальном методе)
        var numberSprite = this.getChild('number');
        if (!numberSprite) return;

        // Удаляем старый контейнер с иконками, если был
        if (numberSprite._elementIconContainer) {
            numberSprite.removeChild(numberSprite._elementIconContainer);
        }

        var container = new Sprite();
        container.anchor.x = 0;
        container.anchor.y = 0;
        numberSprite._elementIconContainer = container;
        numberSprite.addChild(container);

        var iconBitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;

        // Вычисляем начальную позицию контейнера относительно спрайта числа
        // Спрайт числа имеет anchor (0.5, 1), т.е. локальные координаты:
        //   левый верхний угол: (-bitmap.width/2, -bitmap.height)
        //   центр низа: (0, 0)
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

        // Создаём иконки
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
            iconSprite.y = 0;
            container.addChild(iconSprite);
        }
    };

})();
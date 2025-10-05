/*:
 * @plugindesc [RU] Скрытие значений параметров (цифр и стрелок) в окне экипировки, совместимо с YEP_EquipCore.
 * @author ChatGPT
 *
 * @param Switch ID
 * @type switch
 * @desc Переключатель, при включении которого значения параметров будут скрыты.
 * @default 73
 */

(function () {
    const parameters = PluginManager.parameters('CM_HideEquipStatusValues');
    const switchId = Number(parameters['Switch ID'] || 73);

    const _Window_EquipStatus_drawItem = Window_EquipStatus.prototype.drawItem;
    Window_EquipStatus.prototype.drawItem = function (index) {
        const rect = this.itemRect(index);
        const paramId = this.paramId(index);
        if (!this._actor) return;

        this.changeTextColor(this.systemColor());
        const name = TextManager.param(paramId);
        this.drawText(name, rect.x, rect.y, 160);

        // Если переключатель выключен — рисуем как обычно
        if (!$gameSwitches.value(switchId)) {
            const rightValue = this._actor.param(paramId);
            const newValue = this._tempActor ? this._tempActor.param(paramId) : rightValue;
            const diffvalue = newValue - rightValue;
            const arrowX = rect.x + 160;
            const valueX = rect.x + 188;
            this.drawRightArrow(arrowX, rect.y);
            this.resetTextColor();
            this.drawText(newValue, valueX, rect.y, 48, 'right');
        }
    };
})();

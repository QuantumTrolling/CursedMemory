//=============================================================================
// OctoBattle Break Shield Fix – Уязвимость только по врагу, а не по атакеру
//=============================================================================

var Imported = Imported || {};
if (Imported.Olivia_OctoBattle) {

  // Переопределяем метод, отвечающий за уменьшение щита при уроне
  Game_Action.prototype.executeBreakShieldReduction = function(target, value) {
    if (!target.isBreakStunned()) {
      // Получаем все элементы навыка (работает с YEP_ElementCore)
      var elements = [];
      if (Imported.YEP_ElementCore) {
        elements = this.getItemElements();
      } else {
        var elementId = this.item().damage.elementId;
        if (elementId < 0) {
          elements = this.subject().attackElements();
        } else {
          elements = [elementId];
        }
      }

      // Проверяем, есть ли среди элементов тот, по которому враг УЯЗВИМ
      var weakRateReached = elements.some(function(elId) {
        if (elId <= 0) return false;       // физический/без элемента – не ломаем
        var rate = target.elementRate(elId); // <-- чистая сопротивляемость врага
        // Если хотите игнорировать Protect, замените на target.originalElementRate(elId)
        return rate >= Olivia.OctoBattle.BreakShield.WeakRate;
      });

      if (weakRateReached) {
        var reduction = -1 * this.itemBreakShieldReduction(target);
        target.startBreakShieldReduceAnimation();
        target.alterBreakShield(reduction);
      }
    }
  };

}
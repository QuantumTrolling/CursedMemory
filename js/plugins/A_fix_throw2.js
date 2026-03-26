//=============================================================================
// Fix: VE_ThrowableObjects + YEP_BattleEngineCore
// Убирает двойной урон и лишние анимации от VE для навыков с YEP-последовательностями
//=============================================================================

(function() {

    if (!Imported['VE - Throwable Objects'] || !Imported.YEP_BattleEngineCore) return;

    // 1. Блокируем нанесение урона от VE
    var originalApply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        var item = this.item();
        var hasYepSequence = item && (item.wholeActions || item.targetActions);
        var stack = new Error().stack;
        var fromVE = stack && stack.indexOf('updateStackAction') !== -1;

        if (hasYepSequence && fromVE) {
            return;
        }
        originalApply.call(this, target);
    };

    // 2. Блокируем анимации от VE (которые идут из Sprite_Throw)
    if (Sprite_Throw && Sprite_Throw.prototype.setupAnimation) {
        var originalSetupAnimation = Sprite_Throw.prototype.setupAnimation;
        Sprite_Throw.prototype.setupAnimation = function(timing) {
            var item = this._subject ? this._subject.currentAction() : null;
            if (item) {
                var hasYepSequence = item.item() && (item.item().wholeActions || item.item().targetActions);
                if (hasYepSequence) {
                    // Если навык использует YEP-последовательности, не показываем анимацию от VE
                    return;
                }
            }
            originalSetupAnimation.call(this, timing);
        };
    }

    console.log('[FIX] VE_ThrowableObjects + YEP_BattleEngineCore: damage and animations blocked for YEP skills, throw sprite preserved');

})();
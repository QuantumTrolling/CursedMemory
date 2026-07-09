//=============================================================================
// EnemyHUD_VisibleOnActorTurn_CTB.js
// Для YEP_X_BattleSysCTB.js (Charge Turn Battle)
// Скрывает HUD над врагами только во время выполнения действия врага.
// В остальное время (ввод команд, ожидание, ход актёров) HUD видим.
// Также скрывает HUD для невидимых и мёртвых врагов.
//=============================================================================
/*:
 * @plugindesc v1.01 HUD врагов скрыт строго на время действия врага (CTB).
 * @author Assistant
 * @help
 * Разместите после Olivia_OctoBattle.js, EnemyLetterDisplay.js
 * и YEP_X_BattleSysCTB.js.
 */

(function() {
    if (typeof Window_WeaknessDisplay === 'undefined') return;

    //=========================================================================
    // Патч CTB: отслеживаем, действует ли враг прямо сейчас
    //=========================================================================
    var _BattleManager_startCTBAction = BattleManager.startCTBAction;
    BattleManager.startCTBAction = function(battler) {
        $gameTemp._ctbEnemyActing = battler && battler.isEnemy();
        _BattleManager_startCTBAction.call(this, battler);
    };

    var _BattleManager_endCTBAction = BattleManager.endCTBAction;
    BattleManager.endCTBAction = function() {
        $gameTemp._ctbEnemyActing = false;
        _BattleManager_endCTBAction.call(this);
    };

    // На всякий случай сброс при завершении боя
    var _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        $gameTemp._ctbEnemyActing = false;
        _BattleManager_endBattle.call(this, result);
    };

    //=========================================================================
    // Переопределение прозрачности окна слабостей
    //=========================================================================
    Window_WeaknessDisplay.prototype.updateOpacity = function() {
        if (this.shouldHideNow()) {
            // Мгновенно скрываем, если нужно
            this.contentsOpacity = Math.max(0, this.contentsOpacity - 16);
        } else {
            // Плавно показываем
            this.contentsOpacity = Math.min(255, this.contentsOpacity + 16);
        }
        if (this._stateIconSprite) {
            this._stateIconSprite.opacity = this.contentsOpacity;
        }
    };

    Window_WeaknessDisplay.prototype.shouldHideNow = function() {
        if (!$gameParty || !$gameParty.inBattle()) return false;

        // Всегда скрываем, если враг невидим или мёртв (оригинальное поведение)
        if (this._subject.isHidden() || this._subject.isDead()) return true;

        // Скрываем, если идёт действие врага (по флагу из CTB)
        if ($gameTemp._ctbEnemyActing) return true;

        return false;
    };
})();
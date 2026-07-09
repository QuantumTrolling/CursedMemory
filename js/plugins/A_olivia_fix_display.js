//=============================================================================
// EnemyHUD_VisibleOnActorTurn_CTB.js
// Для YEP_X_BattleSysCTB.js (Charge Turn Battle)
// Скрывает HUD над врагами только во время выполнения действия врага.
// В остальное время (ввод команд, ожидание, ход актёров) HUD видим.
// Также скрывает HUD для невидимых и мёртвых врагов (как в оригинале).
//=============================================================================
/*:
 * @plugindesc v1.00 HUD врагов скрыт только при действии врага (CTB).
 * @author Assistant
 * @help
 * Разместите после Olivia_OctoBattle.js и EnemyLetterDisplay.js.
 * Требует YEP_X_BattleSysCTB.js.
 */

(function() {
    if (typeof Window_WeaknessDisplay === 'undefined') return;

    // Полностью переопределяем прозрачность
    Window_WeaknessDisplay.prototype.updateOpacity = function() {
        if (this.shouldHideForEnemyTurn()) {
            // Враг действует, или субъект скрыт/мёртв – скрываем
            this.contentsOpacity -= 16;
        } else {
            // Всё остальное время – показываем
            this.contentsOpacity += 16;
        }
        if (this._stateIconSprite) {
            this._stateIconSprite.opacity = this.contentsOpacity;
        }
    };

    Window_WeaknessDisplay.prototype.shouldHideForEnemyTurn = function() {
        if (!$gameParty || !$gameParty.inBattle()) return false;

        // Всегда скрываем, если враг невидим или мёртв (поведение оригинала)
        if (this._subject.isHidden() || this._subject.isDead()) return true;

        // В CTB скрываем только когда идёт фаза действия и субъект – враг
        if (BattleManager._phase === 'action' &&
            BattleManager._subject &&
            BattleManager._subject.isEnemy()) {
            return true;
        }

        return false;
    };
})();
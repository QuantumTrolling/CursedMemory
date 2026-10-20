/*:
 * @plugindesc (v1.0) Исправляет побег из последовательных боев MOG.
 * @author 
 *
 * @help
 * Позволяет сбежать из любой волны, даже во время анимации,
 * и корректно сбрасывает состояние последовательных боев.
 */

(function() {
    // 1. Разрешаем обработку побега, даже если активны таймеры
    var _mog_needSkip = Scene_Battle.prototype.needSkipBattleProcessCB;
    Scene_Battle.prototype.needSkipBattleProcessCB = function() {
        // Если игрок нажал «Побег» или бой уже помечен как побег — не пропускаем обработку
        if (BattleManager._escaped) return false;
        if (Input.isTriggered('escape')) return false; // 'escape' — стандартный код кнопки отмены/побега
        return _mog_needSkip.call(this);
    };

    // 2. Гарантированно очищаем данные последовательных боев при побеге
    var _mog_processEscape = BattleManager.processEscape;
    BattleManager.processEscape = function() {
        // Сбрасываем таймеры, чтобы они не блокировали дальнейшие действия
        $gameSystem._consBatime = 0;
        $gameSystem._consBaPhase = [false, false];
        
        // Вызываем оригинальный обработчик побега
        var success = _mog_processEscape.call(this);
        
        // Если побег удался — очищаем серию боев
        if (success) {
            $gameSystem.clearConsBat();
        }
        return success;
    };
})();
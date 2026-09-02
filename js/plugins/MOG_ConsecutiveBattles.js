// ... (всё до этого места остаётся без изменений)

// -----------------------------------------------------------------------------
// Spriteset_Battle.update
// -----------------------------------------------------------------------------
var _mog_consBat_sprtBat_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    _mog_consBat_sprtBat_update.call(this);

    if ($gameSystem._consBatWait > 0) $gameSystem._consBatWait--;
    if ($gameSystem._consBat.prepareSprite && $gameSystem._consBatWait === 0) {
        this.prepareConBatSprites();
    }

    // Если ожидаем загрузку новой волны, проверяем готовность
    if (this._waitingForWaveLoad) {
        if (this.isWaveReady()) {
            this._waitingForWaveLoad = false;
            // Все спрайты готовы – запускаем прояснение
            $gameScreen.startFadeIn(Moghunter.consBat_FadeInDuration);
            // Устанавливаем задержку обновления боя на время прояснения
            $gameSystem._consBatime = Moghunter.consBat_FadeInDuration;
            // Теперь можно запустить бой (он будет приостановлен на время fade in)
            BattleManager.startBattle();
        }
    }
};

// -----------------------------------------------------------------------------
// Spriteset_Battle.prepareConBatSprites
// -----------------------------------------------------------------------------
Spriteset_Battle.prototype.prepareConBatSprites = function() {
    console.log("[ConsBatFix] === PREPARE NEW WAVE ===");
    $gameSystem._consBat.prepareSprite = false;

    this.prepareComBatBefore();
    this.removeEnemiesConBat();
    this.createEnemies();

    // Обновляем z контейнера в соответствии с новыми спрайтами
    if (this._enemySprites && this._enemySprites[0]) {
        this._conBatField.z = this._enemySprites[0].z;
    }

    this.turnEnemiesForNewWave();
    BattleManager._consBatTemporaryEnemyTurn = true;

    this.prepareComBatAfter();

    // Устанавливаем флаг ожидания готовности спрайтов – бой и fade in начнутся после загрузки
    this._waitingForWaveLoad = true;

    if ($gameSystem._consBat.index >= $gameSystem._consBat.battles.length) {
        $gameSystem._consBat.enable = false;
    }
};
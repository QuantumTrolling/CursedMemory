//=============================================================================
// YED_SideviewBattler_ForceNoFlicker.js
//=============================================================================

(function() {

    // Полностью отключаем учёт состояния в battlerName
    var _Game_Actor_battlerName = Game_Actor.prototype.battlerName;
    Game_Actor.prototype.battlerName = function() {
        if (this.isSideviewBattler()) {
            return this.getSideviewBattler().filename;
        }
        return _Game_Actor_battlerName.call(this);
    };
    var _Game_Enemy_battlerName = Game_Enemy.prototype.battlerName;
    Game_Enemy.prototype.battlerName = function() {
        if (this.isSideviewBattler()) {
            return this.getSideviewBattler().filename;
        }
        return _Game_Enemy_battlerName.call(this);
    };

    // Метод получения имени из состояния (для нашей ручной замены)
    Game_Battler.prototype.getStateOverrideFilename = function() {
        var override = this.getActiveStateOverride();
        if (override && override.filename !== null) return override.filename;
        return null;
    };

    // Получение спрайта
    function getSprite(battler) {
        var scene = SceneManager._scene;
        if (!scene || !scene._spriteset) return null;
        var spriteset = scene._spriteset;
        if (battler.isActor()) {
            return spriteset._actorSprites ? spriteset._actorSprites.find(s => s._actor === battler) : null;
        } else {
            return spriteset._enemySprites ? spriteset._enemySprites.find(s => s._enemy === battler) : null;
        }
    }

    // Применение bitmap с сохранением анимации
    function applyBitmapToSprite(sprite, bitmap, battler) {
        if (!sprite) return;
        var motion = sprite._motionName;
        var pattern = sprite._pattern;
        var count = sprite._motionCount;
        if (sprite._mainSprite) {
            sprite._mainSprite.bitmap = bitmap;
        } else if (sprite.bitmap) {
            sprite.bitmap = bitmap;
        }
        if (motion) {
            sprite.startMotion(motion);
            sprite._pattern = pattern;
            sprite._motionCount = count;
        }
        if (sprite.updateFrame) sprite.updateFrame();
    }

    // Предзагрузка всех возможных спрайтов (сбор из базы)
    function preloadAll() {
        var set = new Set();
        for (var i=1; i<$dataActors.length; i++) {
            var a = $dataActors[i];
            if (a && a._sideviewBattler && a._sideviewBattler.filename) set.add(a._sideviewBattler.filename);
        }
        for (var i=1; i<$dataEnemies.length; i++) {
            var e = $dataEnemies[i];
            if (e && e._sideviewBattler && e._sideviewBattler.filename) set.add(e._sideviewBattler.filename);
        }
        for (var i=1; i<$dataStates.length; i++) {
            var s = $dataStates[i];
            if (s && s._sideviewBattlerOverride && s._sideviewBattlerOverride.filename) set.add(s._sideviewBattlerOverride.filename);
        }
        set.forEach(function(f) {
            var bmp = ImageManager.loadSvActor(f);
            if (!bmp.isReady()) {
                bmp.addLoadListener(function() {});
            }
        });
    }

    // Отслеживание изменения состояния
    var _Game_Battler_refresh = Game_Battler.prototype.refresh;
    Game_Battler.prototype.refresh = function() {
        _Game_Battler_refresh.call(this);
        var newFilename = this.getStateOverrideFilename();
        if (newFilename !== this._lastAppliedStateFilename) {
            this._lastAppliedStateFilename = newFilename;
            var sprite = getSprite(this);
            if (sprite) {
                if (newFilename) {
                    var bmp = ImageManager.loadSvActor(newFilename);
                    if (bmp.isReady()) {
                        applyBitmapToSprite(sprite, bmp, this);
                    } else {
                        // ждём загрузки, но старый bitmap остаётся
                        var self = this;
                        bmp.addLoadListener(function() {
                            var currentSprite = getSprite(self);
                            if (currentSprite) {
                                applyBitmapToSprite(currentSprite, bmp, self);
                            }
                        });
                    }
                } else {
                    // возвращаем базовый спрайт
                    var baseName = this.isSideviewBattler() ? this.getSideviewBattler().filename : null;
                    if (baseName) {
                        var baseBmp = ImageManager.loadSvActor(baseName);
                        applyBitmapToSprite(sprite, baseBmp, this);
                    }
                }
            }
        }
    };

    var _Game_Battler_initialize = Game_Battler.prototype.initialize;
    Game_Battler.prototype.initialize = function() {
        _Game_Battler_initialize.call(this);
        this._lastAppliedStateFilename = null;
    };

    // Блокируем методы, которые могут перезагрузить спрайт во время нашей замены
    var _Sprite_Actor_loadBitmaps = Sprite_Actor.prototype.loadBitmaps;
    Sprite_Actor.prototype.loadBitmaps = function() {
        // Если идёт замена от нас, пропускаем
        if (this._skipLoadBitmaps) return;
        _Sprite_Actor_loadBitmaps.call(this);
    };
    var _Sprite_Enemy_loadBitmaps = Sprite_Enemy.prototype.loadBitmaps;
    Sprite_Enemy.prototype.loadBitmaps = function() {
        if (this._skipLoadBitmaps) return;
        _Sprite_Enemy_loadBitmaps.call(this);
    };

    // Применяем временную блокировку во время замены
    var _applyBitmapToSprite = applyBitmapToSprite;
    applyBitmapToSprite = function(sprite, bitmap, battler) {
        if (!sprite) return;
        sprite._skipLoadBitmaps = true;
        _applyBitmapToSprite(sprite, bitmap, battler);
        sprite._skipLoadBitmaps = false;
    };

    // Инициализация
    var _Sprite_Actor_initMembers = Sprite_Actor.prototype.initMembers;
    Sprite_Actor.prototype.initMembers = function() {
        _Sprite_Actor_initMembers.call(this);
        this._skipLoadBitmaps = false;
    };
    var _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
    Sprite_Enemy.prototype.initMembers = function() {
        _Sprite_Enemy_initMembers.call(this);
        this._skipLoadBitmaps = false;
    };

    // Запуск предзагрузки после загрузки БД
    var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        var loaded = _DataManager_isDatabaseLoaded.call(this);
        if (loaded && !this._preloadedSideview) {
            this._preloadedSideview = true;
            preloadAll();
        }
        return loaded;
    };

    // Обновление спрайтов после создания
    var _Spriteset_Battle_createActors = Spriteset_Battle.prototype.createActors;
    Spriteset_Battle.prototype.createActors = function() {
        _Spriteset_Battle_createActors.call(this);
        $gameParty.members().forEach(function(a) { a.refresh(); });
    };
    var _Spriteset_Battle_createEnemies = Spriteset_Battle.prototype.createEnemies;
    Spriteset_Battle.prototype.createEnemies = function() {
        _Spriteset_Battle_createEnemies.call(this);
        $gameTroop.members().forEach(function(e) { e.refresh(); });
    };

})();
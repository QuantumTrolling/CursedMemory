//=============================================================================
// MOG_ConsecutiveBattles.js
// (модифицированная версия: корректное затемнение + вывод переменной без "X" + автообновление)
//=============================================================================

/*:
 * @plugindesc (v1.4 *) Система последовательных битв с выводом значения переменной.
 * @author Moghunter (модификация: вывод переменной рядом с номером волны, автообновление)
 *
 * @param Show Wave Number
 * @desc Показывать номер волны.
 * @default true
 * @type boolean
 *
 * @param X-Axis
 * @desc Позиция по X для Wave_A.
 * @default 630
 *
 * @param Y-Axis
 * @desc Позиция по Y для Wave_A.
 * @default 0
 *
 * @param Number X-Axis
 * @desc Смещение по X для номера в Wave_A.
 * @default 65
 *
 * @param Number Y-Axis
 * @desc Смещение по Y для номера в Wave_A.
 * @default 3
 *
 * @param Number FontSize
 * @desc Размер шрифта номера в Wave_A.
 * @default 20
 *
 * @param Number Font Italic
 * @desc Курсив для номера в Wave_A.
 * @default false
 * @type boolean
 *
 * @param ---------------------
 *
 * @param Show Phase
 * @desc Показывать анимацию фаз.
 * @default true
 *
 * @param Phase Duration
 * @desc Длительность анимации фазы.
 * @default 60
 *
 * @param Phase X-Axis
 * @desc Позиция по X для Wave_B.
 * @default 220
 *
 * @param Phase Y-Axis
 * @desc Позиция по Y для Wave_B.
 * @default 240
 *
 * @param Phase Number X-Axis
 * @desc Смещение номера по X в Wave_B.
 * @default 10
 *
 * @param Phase Number Y-Axis
 * @desc Смещение номера по Y в Wave_B.
 * @default 10
 *
 * @param Phase FontSize
 * @desc Размер шрифта номера в Wave_B.
 * @default 28
 *
 * @param Phase Font Italic
 * @desc Курсив для номера в Wave_B.
 * @default true
 *
 * @param Fade Out Duration
 * @desc Длительность затемнения экрана в кадрах.
 * @default 20
 *
 * @param Fade In Duration
 * @desc Длительность прояснения экрана в кадрах.
 * @default 30
 *
 * @param Variable ID
 * @desc ID переменной, значение которой будет показано после номера волны.
 * @default 150
 *
 * @help
 * =============================================================================
 * +++ MOG - Consecutive Battles (v1.4) +++
 * By Moghunter (модифицировано)
 * =============================================================================
 * Активирует систему последовательных битв.
 *
 * =============================================================================
 * PLUGIN COMMAND
 * =============================================================================
 * consecutive_battles : X,X,X,X...
 * X - ID битвы (troop).
 *
 * hide_wave_number
 * show_wave_number
 * hide_phase_animation
 * show_phase_animation
 * ============================================================================
 * - ИЗМЕНЕНИЯ (v1.4)
 * ============================================================================
 * - Добавлен параметр Variable ID для отображения значения переменной.
 * - Текст волны теперь: "1/2 150" (где 150 - значение переменной).
 * - Номер волны автоматически обновляется при изменении переменной.
 * ============================================================================
 */

var Imported = Imported || {};
Imported.MOG_ConsecutiveBattles = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters('MOG_ConsecutiveBattles');
Moghunter.consBat_SpriteWave = String(Moghunter.parameters['Show Wave Number'] || 'true');
Moghunter.consBat_SpriteWaveX = Number(Moghunter.parameters['X-Axis'] || 630);
Moghunter.consBat_SpriteWaveY = Number(Moghunter.parameters['Y-Axis'] || 0);
Moghunter.consBat_SpriteWaveNumberX = Number(Moghunter.parameters['Number X-Axis'] || 65);
Moghunter.consBat_SpriteWaveNumberY = Number(Moghunter.parameters['Number Y-Axis'] || 3);
Moghunter.consBat_SpriteWaveNumberFontSize = Number(Moghunter.parameters['Number FontSize'] || 20);
Moghunter.consBat_SpriteWaveNumberFontItalic = String(Moghunter.parameters['Number Font Italic'] || 'false');

Moghunter.consBat_SpriteTurn = String(Moghunter.parameters['Show Phase'] || 'true');
Moghunter.consBat_SpriteTurnX = Number(Moghunter.parameters['Phase X-Axis'] || 220);
Moghunter.consBat_SpriteTurnY = Number(Moghunter.parameters['Phase Y-Axis'] || 240);
Moghunter.consBat_SpriteTurnNumberX = Number(Moghunter.parameters['Phase Number X-Axis'] || 10);
Moghunter.consBat_SpriteTurnNumberY = Number(Moghunter.parameters['Phase Number Y-Axis'] || 10);
Moghunter.consBat_SpriteTurnNumberFontSize = Number(Moghunter.parameters['Phase FontSize'] || 34);
Moghunter.consBat_SpriteTurnNumberFontItalic = String(Moghunter.parameters['Phase Font Italic'] || 'true');
Moghunter.consBat_SpriteTurnDuration = Number(Moghunter.parameters['Phase Duration'] || 60);

Moghunter.consBat_FadeOutDuration = Number(Moghunter.parameters['Fade Out Duration'] || 20);
Moghunter.consBat_FadeInDuration = Number(Moghunter.parameters['Fade In Duration'] || 30);
Moghunter.consBat_VariableId = Number(Moghunter.parameters['Variable ID'] || 150);

//=============================================================================
// ** Game System
//=============================================================================

var _mog_consBat_gSys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _mog_consBat_gSys_initialize.call(this);
    this._consBat = {};
    this._consBat.enable = true;
    this._consBat.prepareSprite = false;
    this._consBat.index = 0;
    this._consBat.battles = [];
    this._consBat.rewards = [];
    this._consBatime = 0;
    this._consBaPhase = [false, false];
    this._consBaVisible = true;
    this._consBaTurnVisible = String(Moghunter.consBat_SpriteTurn) == "true" ? true : false;
    this._consBatWait = 0;
};

Game_System.prototype.clearConsBat = function() {
    this._consBat.enable = false;
    this._consBat.prepareSprite = false;
    this._consBat.index = 0;
    this._consBat.battles = [];
    this._consBat.rewards = [];
    this._consBatime = 0;
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================

var _mog_cosBat_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _mog_cosBat_pluginCommand.call(this, command, args);
    this.setConsBattes(command, args);
    return true;
};

Game_Interpreter.prototype.setConsBattes = function(command, args) {
    if (command === "consecutive_battles") {
        if (args[1]) {
            $gameSystem.clearConsBat();
            $gameSystem._consBat.enable = true;
            var battles = args[1].split(/,/);
            for (var i = 0; i < battles.length; i++) {
                var troopId = Number(battles[i]);
                if ($dataTroops[troopId]) {
                    $gameSystem._consBat.battles.push(troopId);
                }
            }
            if ($gameSystem._consBat.battles.length === 0) {
                $gameSystem.clearConsBat();
            }
        }
    } else if (command === "hide_wave_number") {
        $gameSystem._consBaVisible = false;
    } else if (command === "show_wave_number") {
        $gameSystem._consBaVisible = true;
    } else if (command === "hide_phase_animation") {
        $gameSystem._consBaTurnVisible = false;
    } else if (command === "show_phase_animation") {
        $gameSystem._consBaTurnVisible = true;
    }
};

//=============================================================================
// ** Spriteset Battle
//=============================================================================

var _mog_consBat_sprtBat_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
    console.log("[ConsBatFix] createEnemies вызван. Индекс волны:", $gameSystem._consBat.index);
    _mog_consBat_sprtBat_createEnemies.call(this);
    if (!this._conBatField) {
        this.createConBatField();
    }
};

Spriteset_Battle.prototype.createConBatField = function() {
    this._conBatField = new Sprite();
    this._battleField.addChild(this._conBatField);
    if (this._enemySprites && this._enemySprites[0]) {
        this._conBatField.z = this._enemySprites[0].z ? this._enemySprites[0].z : 0;
    } else {
        this._conBatField.z = 0;
    }
};

//=============================================================================
// ** Temporary Enemy Orientation
//=============================================================================

Spriteset_Battle.prototype.turnEnemiesForNewWave = function() {
    if (!this._enemySprites) return;
    console.log("[ConsBatFix] === TURN ENEMIES FOR NEW WAVE ===");
    this._enemySprites.forEach(function(sprite) {
        if (!sprite || !sprite._enemy) return;
        if (sprite._consBatOrientationChanged) return;
        sprite._consBatOriginalScaleX = sprite.scale.x;
        if (sprite._mainSprite) {
            sprite._consBatOriginalMainScaleX = sprite._mainSprite.scale.x;
        }
        sprite.scale.x = -Math.abs(sprite.scale.x);
        if (sprite._mainSprite) {
            sprite._mainSprite.scale.x = -Math.abs(sprite._mainSprite.scale.x);
        }
        sprite._consBatOrientationChanged = true;
        console.log("[ConsBatFix] Enemy:", sprite._enemy.name(), "temporary scale.x =", sprite.scale.x);
    });
};

Spriteset_Battle.prototype.restoreEnemyOrientation = function() {
    if (!this._enemySprites) return;
    console.log("[ConsBatFix] === RESTORE ENEMY ORIENTATION ===");
    this._enemySprites.forEach(function(sprite) {
        if (!sprite || !sprite._enemy) return;
        if (!sprite._consBatOrientationChanged) return;
        if (sprite._consBatOriginalScaleX !== undefined) {
            sprite.scale.x = sprite._consBatOriginalScaleX;
        }
        if (sprite._mainSprite && sprite._consBatOriginalMainScaleX !== undefined) {
            sprite._mainSprite.scale.x = sprite._consBatOriginalMainScaleX;
        }
        sprite._consBatOrientationChanged = false;
        console.log("[ConsBatFix] Enemy:", sprite._enemy.name(), "restored scale.x =", sprite.scale.x);
    });
};

var _mog_consBat_sprtBat_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    _mog_consBat_sprtBat_update.call(this);
    if ($gameSystem._consBatWait > 0) $gameSystem._consBatWait--;
    if ($gameSystem._consBat.prepareSprite && $gameSystem._consBatWait === 0) {
        this.prepareConBatSprites();
    }
};

Spriteset_Battle.prototype.prepareConBatSprites = function() {
    console.log("[ConsBatFix] === PREPARE NEW WAVE ===");
    $gameSystem._consBat.prepareSprite = false;
    this.prepareComBatBefore();
    this.removeEnemiesConBat();
    this.createEnemies();
    if (this._enemySprites && this._enemySprites[0]) {
        this._conBatField.z = this._enemySprites[0].z;
    }
    this.turnEnemiesForNewWave();
    BattleManager._consBatTemporaryEnemyTurn = true;
    this.prepareComBatAfter();
    BattleManager.startBattle();
    $gameScreen.startFadeIn(Moghunter.consBat_FadeInDuration);
    if ($gameSystem._consBat.index >= $gameSystem._consBat.battles.length) {
        $gameSystem._consBat.enable = false;
    }
};

Spriteset_Battle.prototype.prepareComBatBefore = function() {
    if (Imported.MOG_BattleCameraFrontal) $gameTemp.clearCamTemp();
};

Spriteset_Battle.prototype.prepareComBatAfter = function() {
    if (Imported.MOG_HPGauge) {
        this.removeHPSprites();
        this.createHPSprites();
    }
    if (Imported.MOG_BattleCursor) {
        $gameTemp._needRefreshBattleCursor = true;
    }
    if ($gameSystem._consBaTurnVisible) {
        $gameSystem._consBaPhase = [true, true];
    }
    if ($gameTemp._battleEnd != null) {
        $gameTemp._battleEnd = false;
    }
    if (Imported.MOG_ATB) {
        $gameSystem._atbEventPhase = [0, 0, 0, false, false];
        $gameSystem._atbEventPhase[3] = BattleManager.updateEventMain();
    }
};

Spriteset_Battle.prototype.removeEnemiesConBat = function() {
    for (var i = 0; i < this._enemySprites.length; i++) {
        this._battleField.removeChild(this._enemySprites[i]);
        this._conBatField.removeChild(this._enemySprites[i]);
    }
};

Spriteset_Battle.prototype.createEnemiesConBat = function() {
    // Не используется, оставлено для совместимости
};

//=============================================================================
// ** Scene Base
//=============================================================================

Scene_Base.prototype.createHudField = function() {
    this._hudField = new Sprite();
    this._hudField.z = 10;
    this.addChild(this._hudField);
};

Scene_Base.prototype.sortMz = function() {
    this._hudField.children.sort(function(a, b) { return a.mz - b.mz; });
};

//=============================================================================
// ** Scene Battle
//=============================================================================

var _mog_conBat_scBat_start = Scene_Battle.prototype.start;
Scene_Battle.prototype.start = function() {
    _mog_conBat_scBat_start.call(this);
    if ($gameSystem._consBaTurnVisible && $gameSystem._consBat.battles.length > 0) {
        $gameSystem._consBaPhase = [true, true];
    }
};

var _mog_conBat_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function() {
    _mog_conBat_createSpriteset.call(this);
    if (!this._hudField) this.createHudField();
};

var _mog_consBat_sbat_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
    _mog_consBat_sbat_createDisplayObjects.call(this);
    var wsprite = String(Moghunter.consBat_SpriteWave) == "true" ? true : false;
    if (wsprite) {
        this.createWaveNSprite();
        this.sortMz();
    }
};

Scene_Battle.prototype.createWaveNSprite = function() {
    this._waveNCursor = new WaveNumber();
    this._waveNCursor.mz = 115;
    this._hudField.addChild(this._waveNCursor);
};

Scene_Battle.prototype.needSkipBattleProcessCB = function() {
    if ($gameSystem._consBatime > 0) return true;
    if ($gameSystem._consBaPhase[0]) return true;
    return false;
};

var _mog_consBat_sBat_updateBattleProcess = Scene_Battle.prototype.updateBattleProcess;
Scene_Battle.prototype.updateBattleProcess = function() {
    if (this.needSkipBattleProcessCB()) {
        $gameSystem._consBatime--;
        return;
    }
    _mog_consBat_sBat_updateBattleProcess.call(this);
};

//=============================================================================
// ** Battle Manager
//=============================================================================

BattleManager.isConsBattle = function() {
    if (!$gameSystem._consBat.enable) return false;
    var troopID = $gameSystem._consBat.battles[$gameSystem._consBat.index];
    if (!$dataTroops[troopID]) return false;
    return true;
};

BattleManager.prototype.conBat = function(switches) {
    if (!switches || switches.length === 0) return;
    var swt = Math.randomInt(switches.length);
    var eswt = switches[swt];
    for (var i = 0; i < switches.length; i++) {
        var sch = Number(switches[i]);
        if (sch === eswt) {
            $gameSwitches.setValue(sch, true);
        } else {
            $gameSwitches.setValue(sch, false);
        }
    }
};

var _mog_conscBat_BatMngr_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
    if (this.isConsBattle()) {
        $gameScreen.startFadeOut(Moghunter.consBat_FadeOutDuration);
        console.log("[ConsBatFix] Fade Out started before wave preparation.");
        this.prepareConBat();
        return;
    }
    this.getDataRewardsCB();
    _mog_conscBat_BatMngr_processVictory.call(this);
};

BattleManager.prepareConBat = function() {
    this.getDataRewardsCB();
    this._phase = 'init';
    var troopID = $gameSystem._consBat.battles[$gameSystem._consBat.index];
    this._actorIndex = -1;
    this._actionForcedBattler = null;
    this._actionBattlers = [];
    this._subject = null;
    this._action = null;
    this._targets = [];
    $gameTroop.setup(troopID);
    $gameScreen.onBattleStart();
    this.makeEscapeRatio();
    $gameSystem._consBat.prepareSprite = true;
    $gameSystem._consBat.index++;
    $gameSystem._consBatime = Moghunter.consBat_FadeOutDuration + 5;
    $gameSystem._consBatWait = Moghunter.consBat_FadeOutDuration + 5;
    if ($gameTemp._battleEnd) $gameTemp._battleEnd = false;
    if (Imported.MOG_BossHP) $gameTemp._forceCreateBossHud = true;
    if (Imported.MOG_ATB) {
        $gameTemp._refreshATBGauge = true;
        BattleManager.selectionComAtbClear();
        BattleManager.prepareInitialATBValue();
        $gameSystem._atbEventPhase = [0, 0, 0, false, false];
    }
};

BattleManager.getDataRewardsCB = function() {
    var index = $gameSystem._consBat.index;
    $gameSystem._consBat.rewards[index] = {};
    $gameSystem._consBat.rewards[index].gold = $gameTroop.goldTotal();
    $gameSystem._consBat.rewards[index].exp = $gameTroop.expTotal();
    $gameSystem._consBat.rewards[index].items = $gameTroop.makeDropItems();
};

BattleManager.makeRewardsCB = function() {
    this._rewards = {};
    this._rewards.gold = 0;
    this._rewards.exp = 0;
    this._rewards.items = [];
    for (var i = 0; i < $gameSystem._consBat.rewards.length; i++) {
        var rwd = $gameSystem._consBat.rewards[i];
        this._rewards.gold += rwd.gold;
        this._rewards.exp += rwd.exp;
        for (var e = 0; e < rwd.items.length; e++) {
            this._rewards.items.push(rwd.items[e]);
        }
    }
    $gameSystem._consBat.battles = [];
};

var _mog_cBat_BatMngr_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
    if ($gameSystem._consBat.rewards.length > 0) {
        this.makeRewardsCB();
        return;
    }
    if ($gameTemp._battleEnd != null) {
        $gameTemp._battleEnd = true;
    }
    _mog_cBat_BatMngr_makeRewards.call(this);
};

var _mog_cBat_BatMngr_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
    $gameSystem.clearConsBat();
    _mog_cBat_BatMngr_endBattle.call(this, result);
};

var _mog_cBat_BatMngr_displayStartMessages = BattleManager.displayStartMessages;
BattleManager.displayStartMessages = function() {
    if ($gameSystem._consBat.index > 0) return;
    _mog_cBat_BatMngr_displayStartMessages.call(this);
};

var _mog_consBat_BattleManager_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function() {
    _mog_consBat_BattleManager_endTurn.call(this);
    if (this._consBatTemporaryEnemyTurn) {
        var scene = SceneManager._scene;
        if (scene && scene._spriteset) {
            scene._spriteset.restoreEnemyOrientation();
        }
        this._consBatTemporaryEnemyTurn = false;
        console.log("[ConsBatFix] Temporary enemy orientation finished.");
    }
};

//=============================================================================
// * WaveNumber
//=============================================================================
function WaveNumber() {
    this.initialize.apply(this, arguments);
}

WaveNumber.prototype = Object.create(Sprite.prototype);
WaveNumber.prototype.constructor = WaveNumber;

WaveNumber.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.setup();
    this.createSprites();
};

WaveNumber.prototype.setup = function() {
    this._waveIndex = this.data().index;
    this._mwaveIndex = this.data().battles.length;
    this._showTurn = $gameSystem._consBaTurnVisible;
    this._lastVariableValue = null; // ДОБАВЛЕНО: для отслеживания изменения переменной
    this.opacity = 0;
};

WaveNumber.prototype.createSprites = function() {
    this.createLayout();
    this.createNumber();
    if (this._showTurn) {
        this.createTurnLayout();
        this.createTurnNumber();
    }
};

WaveNumber.prototype.createLayout = function() {
    this._layout = new Sprite(ImageManager.loadSystem("Wave_A"));
    this._layout.x = Moghunter.consBat_SpriteWaveX;
    this._layout.y = Moghunter.consBat_SpriteWaveY;
    this.addChild(this._layout);
};

WaveNumber.prototype.data = function() {
    return $gameSystem._consBat;
};

WaveNumber.prototype.createNumber = function() {
    this._number = new Sprite(new Bitmap(160, 48));
    this._number.bitmap.fontSize = Moghunter.consBat_SpriteWaveNumberFontSize;
    this._number.bitmap.fontItalic = String(Moghunter.consBat_SpriteWaveNumberFontItalic) === "true" ? true : false;
    this._number.x = this._layout.x + Moghunter.consBat_SpriteWaveNumberX;
    this._number.y = this._layout.y + Moghunter.consBat_SpriteWaveNumberY;
    this.addChild(this._number);
    this.refreshWaveNumber();
};

WaveNumber.prototype.refreshWaveNumber = function() {
    this._waveIndex = this.data().index;
    this._mwaveIndex = this.data().battles.length;
    if (this._mwaveIndex === 0) return;
    this._number.bitmap.clear();
    var wave = this._waveIndex + 1;
    var mwave = this._mwaveIndex + 1;
    var variableValue = $gameVariables.value(Moghunter.consBat_VariableId);
    this._lastVariableValue = variableValue; // ДОБАВЛЕНО: сохраняем текущее значение
    var text = String(wave + "/" + mwave + " " + variableValue);
    this._number.bitmap.drawText(text, 0, 0, this._number.width - 5, this._number.height - 5, "center");
};

WaveNumber.prototype.needRefreshWaveNumber = function() {
    if (this._waveIndex != this.data().index) return true;
    if (this._mwaveIndex != this.data().battles.length) return true;
    // ДОБАВЛЕНО: проверяем изменение переменной
    if (this._lastVariableValue !== $gameVariables.value(Moghunter.consBat_VariableId)) return true;
    return false;
};

WaveNumber.prototype.createTurnLayout = function() {
    this._layoutTurn = new Sprite(ImageManager.loadSystem("Wave_B"));
    this._layoutTurn.x = Moghunter.consBat_SpriteTurnX;
    this._layoutTurn.y = Moghunter.consBat_SpriteTurnY;
    this._layoutTurn.org = [-1, -1];
    this._layoutTurn.visible = false;
    this._layoutTurn.anchor.x = 0.5;
    this._layoutTurn.anchor.y = 0.5;
    this._layoutTurnPhase = [0, 60];
    this.addChild(this._layoutTurn);
};

WaveNumber.prototype.createTurnNumber = function() {
    this._numberTurn = new Sprite(new Bitmap(300, 48));
    this._numberTurn.bitmap.fontSize = Moghunter.consBat_SpriteTurnNumberFontSize;
    this._numberTurn.bitmap.fontItalic = String(Moghunter.consBat_SpriteTurnNumberFontItalic) === "true" ? true : false;
    this._numberTurn.x = Moghunter.consBat_SpriteTurnNumberX;
    this._numberTurn.y = Moghunter.consBat_SpriteTurnNumberY;
    this._numberTurn.org = [this._numberTurn.x, this._numberTurn.y];
    this._numberTurn.anchor.x = 0.5;
    this._numberTurn.anchor.y = 0.5;
    this.addChild(this._numberTurn);
    this.refreshNumberTurn();
};

WaveNumber.prototype.refreshNumberTurn = function() {
    this._numberTurn.bitmap.clear();
    var wave = this._waveIndex + 1;
    var mwave = this._mwaveIndex + 1;
    var variableValue = $gameVariables.value(Moghunter.consBat_VariableId);
    var text = String(wave + "/" + mwave + " " + variableValue);
    this._numberTurn.bitmap.drawText(text, 0, 0, this._numberTurn.width - 5, this._numberTurn.height - 5, "center");
};

WaveNumber.prototype.needFade = function() {
    if ($gameMessage.isBusy()) return true;
    if (this._mwaveIndex === 0) return true;
    if (!$gameSystem._consBaVisible) return true;
    return false;
};

WaveNumber.prototype.updateVisible = function() {
    if (this.needFade()) {
        this.opacity -= 10;
    } else {
        this.opacity += 10;
    }
};

WaveNumber.prototype.getData = function() {
    this._layoutTurn.org[0] = this._layoutTurn.x + (this._layoutTurn.width / 2);
    this._layoutTurn.org[1] = this._layoutTurn.y + (this._layoutTurn.height / 2);
};

WaveNumber.prototype.needRefreshTurnNumber = function() {
    if (!$gameSystem._consBaPhase[0]) return false;
    if (!$gameSystem._consBaPhase[1]) return false;
    return true;
};

WaveNumber.prototype.refreshTurnNumber = function() {
    $gameSystem._consBaPhase[1] = false;
    this.opacity = 255;
    this._layoutTurn.x = this._layoutTurn.org[0] - 60;
    this._layoutTurn.y = this._layoutTurn.org[1];
    this._layoutTurn.opacity = 0;
    this._layoutTurn.visible = true;
    this._layoutTurnPhase = [0, 60];
    this.refreshNumberTurn();
};

WaveNumber.prototype.updateSlide = function() {
    if (this._layoutTurnPhase[0] === 0) {
        if (this._layoutTurn.x < this._layoutTurn.org[0]) {
            this._layoutTurn.x += 1;
            this._layoutTurn.opacity += 5;
            if (this._layoutTurn.x >= this._layoutTurn.org[0]) {
                this._layoutTurn.x = this._layoutTurn.org[0];
                this._layoutTurn.opacity = 255;
                this._layoutTurnPhase = [1, Moghunter.consBat_SpriteTurnDuration];
            }
        }
    } else if (this._layoutTurnPhase[0] === 1) {
        this._layoutTurnPhase[1]--;
        if (this._layoutTurnPhase[1] <= 0) {
            this._layoutTurnPhase[0] = 2;
        }
    } else if (this._layoutTurnPhase[0] === 2) {
        this._layoutTurn.x += 1;
        this._layoutTurn.opacity -= 5;
        if (this._layoutTurn.opacity <= 0) {
            this._layoutTurnPhase[0] = 3;
            this._layoutTurn.visible = false;
            $gameSystem._consBaPhase[0] = false;
        }
    }
};

WaveNumber.prototype.updateTurnSprites = function() {
    if (this._layoutTurn.org[0] === -1) {
        if (this._layoutTurn.bitmap.isReady()) {
            this.getData();
        }
        return;
    }
    if (this.opacity === 0) return;
    if (this.needRefreshTurnNumber()) this.refreshTurnNumber();
    this.updateSlide();
    this._numberTurn.x = this._layoutTurn.x + this._numberTurn.org[0];
    this._numberTurn.y = this._layoutTurn.y + this._numberTurn.org[1];
    this._numberTurn.opacity = this._layoutTurn.opacity;
    this._numberTurn.visible = this._layoutTurn.visible;
};

WaveNumber.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateVisible();
    if (this.needRefreshWaveNumber()) this.refreshWaveNumber();
    if (this._layoutTurn) this.updateTurnSprites();
};
/*:
* @plugindesc Свободная камера для битвы с большими battlebacks. Фон статичен, камера плавно следует за персонажами/врагами.
* @author ChatGPT
*
* @param Camera Speed
* @text Скорость камеры
* @type number
* @default 10
*
* @param Camera Smooth
* @text Плавность движения камеры (0-1)
* @type number
* @decimals 2
* @default 0.2
*
* @help
* Перед битвой можно задать нужный фон:
* $gameTemp.battleCameraBattleback = "FieldBattle"; // имя файла из img/battlebacks1
*
* Камера управляется стрелками или программно:
* $gameTemp._battleCameraTarget.x = число;
* $gameTemp._battleCameraTarget.y = число;
*/


(function() {
const parameters = PluginManager.parameters('FreeBattleCameraStable');
const cameraSpeed = Number(parameters['Camera Speed'] || 10);
const cameraSmooth = Number(parameters['Camera Smooth'] || 0.2);


// -----------------------------
// Инициализация камеры
// -----------------------------
const _Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
_Game_Temp_initialize.call(this);
this.battleCamera = { x: 0, y: 0 }; // координаты камеры для персонажей
this.battleCameraBattleback = null; // имя battleback
this._battleCameraTarget = { x: 0, y: 0 };
};


// -----------------------------
// Создание кастомного фонового спрайта
// -----------------------------
const _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function() {
_Scene_Battle_createSpriteset.call(this);


const backFile = $gameTemp.battleCameraBattleback || $dataSystem.battleback1Name;
this._customBattleback = new Sprite();
this._customBattleback.bitmap = ImageManager.loadBattleback1(backFile);
this._spriteset._battleField.addChildAt(this._customBattleback, 0);
};


// -----------------------------
// Обновление фонового спрайта
// -----------------------------
const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
_Scene_Battle_update.call(this);


if (this._customBattleback && this._customBattleback.bitmap.isReady()) {
const screenWidth = Graphics.width;
const screenHeight = Graphics.height;
const bgWidth = this._customBattleback.bitmap.width;
const bgHeight = this._customBattleback.bitmap.height;


// -----------------------------
// Делаем фон статичным (абсолютно)
// -----------------------------
this._customBattleback.scale.x = 1;
this._customBattleback.scale.y = 1;
this._customBattleback.x = (screenWidth - bgWidth) / 2;
this._customBattleback.y = (screenHeight - bgHeight) / 2;


// -----------------------------
// Камера персонажей
// -----------------------------
if ($gameTemp.battleCamera) {
const cam = $gameTemp.battleCamera;


// Управление стрелками
if (Input.isPressed('left')) $gameTemp._battleCameraTarget.x -= cameraSpeed;
if (Input.isPressed('right')) $gameTemp._battleCameraTarget.x += cameraSpeed;
if (Input.isPressed('up')) $gameTemp._battleCameraTarget.y -= cameraSpeed;
if (Input.isPressed('down')) $gameTemp._battleCameraTarget.y += cameraSpeed;


// Плавное движение камеры за персонажами
cam.x += ($gameTemp._battleCameraTarget.x - cam.x) * cameraSmooth;
cam.y += ($gameTemp._battleCameraTarget.y - cam.y) * cameraSmooth;
}
}
};
})();
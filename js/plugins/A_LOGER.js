//=============================================================================
// BattleDebugTracker.js
// Диагностика: показывает, кто создаёт спрайты/окна в бою
//=============================================================================

(function() {
'use strict';

// Включать только в бою
function inBattle() {
    return SceneManager._scene instanceof Scene_Battle;
}

// -----------------------------------------------------------------------------
// ПЕРЕХВАТ addChild
// -----------------------------------------------------------------------------

const _addChild = PIXI.Container.prototype.addChild;
PIXI.Container.prototype.addChild = function(child) {

    const result = _addChild.call(this, child);

    if (inBattle()) {

        const name = child.constructor.name;

        // Игнорируем системные слои
        if (name === "Sprite" || name === "TilingSprite") return result;

        console.log("=== NEW CHILD ADDED IN BATTLE ===");
        console.log("Class:", name);
        console.log("Parent:", this.constructor.name);
        console.log("Position:", child.x, child.y);
        console.log(child);

        // Подсветка рамкой
        if (child instanceof Sprite) {
            const debugBox = new PIXI.Graphics();
            debugBox.lineStyle(2, 0xff0000);
            debugBox.drawRect(0, 0, child.width || 100, child.height || 100);
            child.addChild(debugBox);
        }

        if (child instanceof Window_Base) {
            child.opacity = 200; // немного проявим
            child.backOpacity = 200;
        }
    }

    return result;
};

// -----------------------------------------------------------------------------
// Показываем координаты курсора
// -----------------------------------------------------------------------------

const _SceneBattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _SceneBattle_update.call(this);

    if (TouchInput.isPressed()) {
        console.log("Mouse:", TouchInput.x, TouchInput.y);
    }
};

})();

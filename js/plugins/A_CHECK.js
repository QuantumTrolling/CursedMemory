var _gs_showPicture = Game_Screen.prototype.showPicture;
Game_Screen.prototype.showPicture = function(pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode) {
    if(name === "Button_Settings2") {
        console.log("=== Button_Settings2 создана ===");
        console.trace(); // Показать стек вызовов
    }
    _gs_showPicture.call(this, pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
};

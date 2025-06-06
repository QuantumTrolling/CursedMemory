/*=============================================================================
 *  CallMenu.js
 *=============================================================================*/
 
var Imported = Imported || {};
Imported.CallMenu = true;
 
/*:=============================================================================
* @plugindesc v1.5 Call menu during messages\choices on map by pressing one of the standard menu keys ESC, X, Insert, NUM 0.
* @author Krimer
* @help
* If you want call menu during choices just disallow cancel in choice command.
* Place this plugin below non-standard message systems or choice windows in
* plugin manager for better compatibility.
 
* =============================================================================*/
 
/*=============================================================================*/
/* Alias */
var _Game_Temp_initialize_Alias = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize_Alias.call(this)
    this._lastSelectedChoice = null;
};

/* NEW */
Game_Temp.prototype.setLastSelectedChoice = function(f) {
    this._lastSelectedChoice = f
};
/* NEW */
Game_Temp.prototype.getLastSelectedChoice = function() {
    return this._lastSelectedChoice
};
/* Alias */
var _Window_ChoiceList_callOkHandler = Window_ChoiceList.prototype.callOkHandler
Window_ChoiceList.prototype.callOkHandler = function() {
    $gameTemp.setLastSelectedChoice(null)
    _Window_ChoiceList_callOkHandler.call(this);
};
/* Alias */
var _Window_ChoiceList_callCancelHandler = Window_ChoiceList.prototype.callCancelHandler
Window_ChoiceList.prototype.callCancelHandler = function() {
    $gameTemp.setLastSelectedChoice(null)
    _Window_ChoiceList_callCancelHandler.call(this);
};
/* Alias */
var _Window_ChoiceList_selectDefault = Window_ChoiceList.prototype.selectDefault
Window_ChoiceList.prototype.selectDefault = function() {
    if ($gameTemp.getLastSelectedChoice() !== null){
        this.select($gameTemp.getLastSelectedChoice());
    } else {
        _Window_ChoiceList_selectDefault.call(this);
    }  
};
/* Alias*/
var _Window_ChoiceList_update = Window_ChoiceList.prototype.update
Window_ChoiceList.prototype.update = function() {
    _Window_ChoiceList_update.call(this);
     if ((Input.isTriggered('escape') || Input.isTriggered('menu') || TouchInput.isCancelled()) && $gameMessage.isBusy() && $gameSystem.isMenuEnabled()) {
        $gameTemp.setLastSelectedChoice(this._index)
    }
 
}; 
 
/* Alias */
var _DataManager_makeSaveContents_Alias = DataManager.makeSaveContents;
DataManager.makeSaveContents = function () {
    var contents = _DataManager_makeSaveContents_Alias.call(this);
    contents.message = $gameMessage;
	
    return contents;
};
/* Alias */
var _DataManager_extractSaveContents_Alias = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (contents) {
    _DataManager_extractSaveContents_Alias.call(this, contents);
    $gameMessage = contents.message;
    if ($gameMessage._choices.length !== 0) {
        $gameMessage.setChoiceCallback(function(n) {
           $gameMap._interpreter._branch[$gameMap._interpreter._indent] = n;
        }.bind(this));
    }
};
/* Alias */
var _Scene_Map_update_Alias = Scene_Map.prototype.update;
Scene_Map.prototype.update = function () {
    _Scene_Map_update_Alias.call(this);
    if ((Input.isTriggered('escape') || Input.isTriggered('menu') || TouchInput.isCancelled()) && $gameMessage.isBusy() && $gameSystem.isMenuEnabled()) {
        this.callMenu();
    }
};
/* OVERWRITE */
Window_Message.prototype.isTriggered = function () {
    return (Input.isRepeated('ok') || TouchInput.isRepeated());
};
/* Alias */
var _Window_ChoiceList_WidthEx_Alias = Window_ChoiceList.prototype.textWidthEx;
Window_ChoiceList.prototype.textWidthEx = function (text) {
    if(!SceneManager._scene.isActive()) return;
    return _Window_ChoiceList_WidthEx_Alias.call(this, text);
};
/* HIME_HiddenChoiceConditions Compatibility */
var _Window_ChoiceList_makeCommandList_Alias = Window_ChoiceList.prototype.makeCommandList
Window_ChoiceList.prototype.makeCommandList = function() {
    if(!SceneManager._scene.isActive()) return;
    _Window_ChoiceList_makeCommandList_Alias.call(this);
}
/* Galv_VisualNovelChoices Compatibility */
if (Imported.Galv_VisualNovelChoices) {
    var _Window_ChoiceList_drawItem_Alias = Window_ChoiceList.prototype.drawItem 
    Window_ChoiceList.prototype.drawItem = function(index) {
    if(typeof this.choice_background === 'undefined'){
        this.choice_background = [];
    };
        _Window_ChoiceList_drawItem_Alias.call(this, index);
    };
}
/* SRD_TitleCommandCustomizer Compatibility */
if (Imported["SumRndmDde Title Command Customizer"]) {
    var _Scene_Title_createMessageWindow_Alias = Scene_Title.prototype.createMessageWindow
    Scene_Title.prototype.createMessageWindow = function() {
        $gameMessage.clear();
        _Scene_Title_createMessageWindow_Alias.call(this)
        
    };
}
 
/* End of File */
/*=============================================================================*/
//=============================================================================
// VisuStella MZ - Event Title Scene
// VisuMZ_4_EventTitleScene.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_EventTitleScene = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventTitleScene = VisuMZ.EventTitleScene || {};
VisuMZ.EventTitleScene.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.05] [EventTitleScene]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Event_Title_Scene_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * For those who feel compelled to create their own custom title scene using
 * in-game maps and events, this plugin will replace Scene_Title with a new
 * dedicated map scene to allow such a thing to happen. Customize it however
 * you can within your abilities and utilize the full power of RPG Maker MZ's
 * eventing system. Just don't forget to use an Autorun event to kick things
 * off, alright?
 *
 * Features include all (but not limited to) the following:
 * 
 * * Dedicated map scene to use for custom map title scenes.
 * * Going to the Game End screen to return to the title screen will take the
 *   player back to the dedicated map scene.
 * * Customize which map to use and where on the map to display.
 * * Determine the player's position, visibility, facing direction, and whether
 *   or not followers are shown, too.
 * * Disable or enable movement on the title scene if you want.
 * * Plugin Commands that facilitate the New Game, Continue, and Options
 *   command as seen before in the title screen.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Autosave
 * 
 * - Autosaving is disabled on the event title scene map. This is to prevent
 * any instances of the player loading into an unintended map by accident.
 *
 * ---
 * 
 * Movement Disable
 * 
 * - Through the Plugin Parameters, you can disable input and mouse movement
 * from the player for the dedicated event title scene.
 * 
 * ---
 * 
 * Menu and Debug Disable
 * 
 * - On the dedicated event title scene, calling the Main Menu and debug menu
 * is disabled to prevent errors.
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_0_CoreEngine
 * 
 * Those using the VisuStella MZ Core Engine will now have the "Title Picture
 * Buttons" imported into the Event Title Scene. They can be interacted the
 * same way. The picture buttons will appear above all else so keep that in
 * mind for how you position them.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Continue-Related Text Codes ===
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Show Choice Text Only)
 * ------------------   -------------------------------------------------------
 * 
 * <Continue>           Put this text code inside of a Show Choice and it will
 *                      enable that choice if there is a save file available.
 *                      It will disable that choice if there are no saves.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === System-Type Plugin Commands ===
 * 
 * ---
 *
 * System: Start New Game
 * - Leaves the current scene and starts a new game.
 *
 *   Slow Fade Out?:
 *   - Use a slow fade out transition to the next scene?
 *
 * ---
 *
 * System: Open Load Scene
 * - Leaves the current scene and opens the load game scene.
 *
 *   Slow Fade Out?:
 *   - Use a slow fade out transition to the next scene?
 *
 * ---
 *
 * System: Open Options Scene
 * - Leaves the current scene and opens the options scene.
 *
 *   Slow Fade Out?:
 *   - Use a slow fade out transition to the next scene?
 *
 * ---
 *
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * The following are Script Calls that can be used with this plugin. These are
 * made for JavaScript proficient users. We are not responsible if you use them
 * incorrectly or for unintended usage.
 *
 * ---
 * 
 * === Continue-Related Script Calls ===
 * 
 * ---
 *
 * DataManager.isAnySavefileExists()
 * 
 * - Use this in a 'Conditional Branch' event command script check.
 * - This will return 'true' if there are save files to load from.
 * - This will return 'false' if there are no save files to load from.
 * - This code is available outside of this plugin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the settings available through the plugin parameters to adjust how
 * the map title scene plays out.
 *
 * ---
 *
 * Title Scene Coordinates
 * 
 *   Map ID:
 *   - Select the map used for the evented title scene.
 * 
 *   Map X:
 *   - Select the X coordinate for the evented title scene.
 * 
 *   Map Y:
 *   - Select the Y coordinate for the evented title scene.
 * 
 *   Face Direction:
 *   - What direction will the player face on the title scene?
 *   - This is assuming the player is visible.
 *
 * ---
 *
 * Player Character
 * 
 *   Transparent?:
 *   - Make the player transparent on the title scene?
 * 
 *   Can Input Move?:
 *   - Can the player move while on the title scene?
 * 
 *   Show Followers?:
 *   - Show player followers on the title scene?
 *   - This is assuming the player is visible.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Irina
 * * Arisu
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.05: February 24, 2022
 * * Bug Fixes!
 * ** Added failsafe to prevent title screen transition change from causing a
 *    crash while utilizing tileset-based sprites. Fix made by Arisu.
 * 
 * Version 1.04: February 3, 2022
 * * Feature Update!
 * ** Autosave no longer triggers from starting a new game with the locked
 *    save style. Update made by Irina.
 * 
 * Version 1.03: December 23, 2021
 * * Feature Update!
 * ** Added an extra save file exist check for the Load Screen Plugin Command
 *    using the Single Save Slot type plugin parameter in Save Core. Update
 *    made by Irina.
 * 
 * Version 1.02: December 16, 2021
 * * Compatibility Update!
 * ** This plugin now works properly with the Save Core's single save slot
 *    style plugin parameters setting. Update made by Irina.
 * ** This plugin now works properly with the Save Core's single locked slot
 *    style plugin parameters setting. Update made by Irina.
 * * Feature Update!
 * ** Autosave no longer triggers from starting a new game. It will be after
 *    the transition is done that any further requests for autosave can be
 *    utilized. Update made by Irina.
 * 
 * Version 1.01: June 25, 2021
 * * Documentation Update!
 * ** Added section for VisuStella compatibility.
 * *** Those using the VisuStella MZ Core Engine will now have the "Title
 *     Picture Buttons" imported into the Event Title Scene. They can be
 *     interacted the same way. The picture buttons will appear above all else
 *     so keep that in mind for how you position them.
 * * Compatibility Update!
 * ** This plugin is now compatible with the VisuMZ Core Engine's Title Picture
 *    Buttons and will have them displayed on the same scene. Update by Arisu.
 * 
 * Version 1.00 Official Release Date: July 9, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command NewGame
 * @text System: Start New Game
 * @desc Leaves the current scene and starts a new game.
 *
 * @arg SlowFade:eval
 * @text Slow Fade Out?
 * @type boolean
 * @on Slow
 * @off Normal
 * @desc Use a slow fade out transition to the next scene?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LoadScreen
 * @text System: Open Load Scene
 * @desc Leaves the current scene and opens the load game scene.
 *
 * @arg SlowFade:eval
 * @text Slow Fade Out?
 * @type boolean
 * @on Slow
 * @off Normal
 * @desc Use a slow fade out transition to the next scene?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Options
 * @text System: Open Options Scene
 * @desc Leaves the current scene and opens the options scene.
 *
 * @arg SlowFade:eval
 * @text Slow Fade Out?
 * @type boolean
 * @on Slow
 * @off Normal
 * @desc Use a slow fade out transition to the next scene?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param EventTitleScene
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Coordinates
 * @text Title Scene Coordinates
 *
 * @param MapID:num
 * @text Map ID
 * @parent Coordinates
 * @type number
 * @min 1
 * @max 999
 * @desc Select the map used for the evented title scene.
 * @default 1
 *
 * @param MapX:num
 * @text Map X
 * @parent Coordinates
 * @type number
 * @min 0
 * @max 255
 * @desc Select the X coordinate for the evented title scene.
 * @default 10
 *
 * @param MapY:num
 * @text Map Y
 * @parent Coordinates
 * @type number
 * @min 0
 * @max 255
 * @desc Select the Y coordinate for the evented title scene.
 * @default 10
 *
 * @param FaceDirection:num
 * @text Face Direction
 * @parent Coordinates
 * @type select
 * @option Down Left
 * @value 1
 * @option Down
 * @value 2
 * @option Down Right
 * @value 3
 * @option Left
 * @value 4
 * @option Right
 * @value 6
 * @option Up Left
 * @value 7
 * @option Up
 * @value 8
 * @option Up Right
 * @value 9
 * @desc What direction will the player face on the title scene?
 * This is assuming the player is visible.
 * @default 2
 * 
 * @param Player
 * @text Player Character
 *
 * @param PlayerTransparent:eval
 * @text Transparent?
 * @parent Player
 * @type boolean
 * @on Transparent
 * @off Opaque
 * @desc Make the player transparent on the title scene?
 * @default true
 *
 * @param CanInputMove:eval
 * @text Can Input Move?
 * @parent Player
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Can the player move while on the title scene?
 * @default false
 *
 * @param ShowFollowers:eval
 * @text Show Followers?
 * @parent Player
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show player followers on the title scene?
 * This is assuming the player is visible.
 * @default false
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

const _0x10f0a6=_0x3905;(function(_0x310ec5,_0x26b8e7){const _0x4fa75b=_0x3905,_0x194c23=_0x310ec5();while(!![]){try{const _0x32ad4f=parseInt(_0x4fa75b(0x1e6))/0x1*(-parseInt(_0x4fa75b(0x21c))/0x2)+-parseInt(_0x4fa75b(0x25e))/0x3+parseInt(_0x4fa75b(0x223))/0x4+parseInt(_0x4fa75b(0x20a))/0x5*(-parseInt(_0x4fa75b(0x263))/0x6)+-parseInt(_0x4fa75b(0x205))/0x7*(-parseInt(_0x4fa75b(0x23b))/0x8)+parseInt(_0x4fa75b(0x269))/0x9+-parseInt(_0x4fa75b(0x23f))/0xa*(-parseInt(_0x4fa75b(0x26d))/0xb);if(_0x32ad4f===_0x26b8e7)break;else _0x194c23['push'](_0x194c23['shift']());}catch(_0x52956e){_0x194c23['push'](_0x194c23['shift']());}}}(_0x5b25,0xea94b));var label=_0x10f0a6(0x21a),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x4281df){const _0x34938c=_0x10f0a6;return _0x4281df[_0x34938c(0x254)]&&_0x4281df[_0x34938c(0x1fe)][_0x34938c(0x200)]('['+label+']');})[0x0];VisuMZ[label][_0x10f0a6(0x1ff)]=VisuMZ[label][_0x10f0a6(0x1ff)]||{},VisuMZ[_0x10f0a6(0x24e)]=function(_0x149ac9,_0x304bea){const _0x339f97=_0x10f0a6;for(const _0x2fa87f in _0x304bea){if(_0x2fa87f[_0x339f97(0x241)](/(.*):(.*)/i)){if('ObDSU'===_0x339f97(0x22c)){const _0x4b2f51=String(RegExp['$1']),_0x590fdb=String(RegExp['$2'])[_0x339f97(0x242)]()[_0x339f97(0x235)]();let _0x4de1e8,_0x430739,_0x1d47c1;switch(_0x590fdb){case _0x339f97(0x21d):_0x4de1e8=_0x304bea[_0x2fa87f]!==''?Number(_0x304bea[_0x2fa87f]):0x0;break;case'ARRAYNUM':_0x430739=_0x304bea[_0x2fa87f]!==''?JSON['parse'](_0x304bea[_0x2fa87f]):[],_0x4de1e8=_0x430739[_0x339f97(0x214)](_0x14ee45=>Number(_0x14ee45));break;case _0x339f97(0x220):_0x4de1e8=_0x304bea[_0x2fa87f]!==''?eval(_0x304bea[_0x2fa87f]):null;break;case'ARRAYEVAL':_0x430739=_0x304bea[_0x2fa87f]!==''?JSON['parse'](_0x304bea[_0x2fa87f]):[],_0x4de1e8=_0x430739[_0x339f97(0x214)](_0xfc803c=>eval(_0xfc803c));break;case _0x339f97(0x258):_0x4de1e8=_0x304bea[_0x2fa87f]!==''?JSON[_0x339f97(0x221)](_0x304bea[_0x2fa87f]):'';break;case _0x339f97(0x1f6):_0x430739=_0x304bea[_0x2fa87f]!==''?JSON[_0x339f97(0x221)](_0x304bea[_0x2fa87f]):[],_0x4de1e8=_0x430739['map'](_0xb5b274=>JSON[_0x339f97(0x221)](_0xb5b274));break;case _0x339f97(0x22b):_0x4de1e8=_0x304bea[_0x2fa87f]!==''?new Function(JSON[_0x339f97(0x221)](_0x304bea[_0x2fa87f])):new Function(_0x339f97(0x262));break;case'ARRAYFUNC':_0x430739=_0x304bea[_0x2fa87f]!==''?JSON[_0x339f97(0x221)](_0x304bea[_0x2fa87f]):[],_0x4de1e8=_0x430739[_0x339f97(0x214)](_0x7e78b9=>new Function(JSON[_0x339f97(0x221)](_0x7e78b9)));break;case'STR':_0x4de1e8=_0x304bea[_0x2fa87f]!==''?String(_0x304bea[_0x2fa87f]):'';break;case _0x339f97(0x226):_0x430739=_0x304bea[_0x2fa87f]!==''?JSON['parse'](_0x304bea[_0x2fa87f]):[],_0x4de1e8=_0x430739[_0x339f97(0x214)](_0x17a0f9=>String(_0x17a0f9));break;case _0x339f97(0x232):_0x1d47c1=_0x304bea[_0x2fa87f]!==''?JSON[_0x339f97(0x221)](_0x304bea[_0x2fa87f]):{},_0x4de1e8=VisuMZ['ConvertParams']({},_0x1d47c1);break;case _0x339f97(0x246):_0x430739=_0x304bea[_0x2fa87f]!==''?JSON[_0x339f97(0x221)](_0x304bea[_0x2fa87f]):[],_0x4de1e8=_0x430739[_0x339f97(0x214)](_0x42ab6e=>VisuMZ['ConvertParams']({},JSON['parse'](_0x42ab6e)));break;default:continue;}_0x149ac9[_0x4b2f51]=_0x4de1e8;}else this[_0x339f97(0x264)]=0x0;}}return _0x149ac9;},(_0x3b449f=>{const _0x271451=_0x10f0a6,_0x11928e=_0x3b449f['name'];for(const _0x483a78 of dependencies){if('gkIOo'!==_0x271451(0x25d))for(const _0x455485 of _0x56daea[_0x271451(0x233)]){const _0x2f82f3=new _0x2ce236(_0x455485);this[_0x271451(0x20b)](_0x2f82f3);}else{if(!Imported[_0x483a78]){if(_0x271451(0x210)===_0x271451(0x20d))this[_0x271451(0x217)](...arguments);else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x271451(0x230)](_0x11928e,_0x483a78)),SceneManager[_0x271451(0x23c)]();break;}}}}const _0x46fecb=_0x3b449f[_0x271451(0x1fe)];if(_0x46fecb[_0x271451(0x241)](/\[Version[ ](.*?)\]/i)){if(_0x271451(0x203)!==_0x271451(0x203))return![];else{const _0x7ae2c2=Number(RegExp['$1']);_0x7ae2c2!==VisuMZ[label][_0x271451(0x26e)]&&(alert(_0x271451(0x256)[_0x271451(0x230)](_0x11928e,_0x7ae2c2)),SceneManager['exit']());}}if(_0x46fecb[_0x271451(0x241)](/\[Tier[ ](\d+)\]/i)){const _0x5699d1=Number(RegExp['$1']);_0x5699d1<tier?(alert(_0x271451(0x259)[_0x271451(0x230)](_0x11928e,_0x5699d1,tier)),SceneManager['exit']()):_0x271451(0x253)===_0x271451(0x22a)?this['_optionsCoreFailsafeCheck']++:tier=Math['max'](_0x5699d1,tier);}VisuMZ[_0x271451(0x24e)](VisuMZ[label]['Settings'],_0x3b449f[_0x271451(0x1fd)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x10f0a6(0x25b)],_0x10f0a6(0x215),_0x6078a2=>{const _0x3503c4=_0x10f0a6;VisuMZ[_0x3503c4(0x24e)](_0x6078a2,_0x6078a2);const _0x27e32f=_0x6078a2[_0x3503c4(0x227)];_0x27e32f&&SceneManager[_0x3503c4(0x212)][_0x3503c4(0x248)](),Imported[_0x3503c4(0x216)]&&StorageManager['saveStyle']()==='locked'?(DataManager['setupNewGame'](),$gameTemp[_0x3503c4(0x240)]=!![],SceneManager[_0x3503c4(0x1eb)](Scene_Save)):SceneManager['push'](Scene_TitleTransition);}),PluginManager[_0x10f0a6(0x225)](pluginData[_0x10f0a6(0x25b)],_0x10f0a6(0x222),_0x4ea634=>{const _0xc47034=_0x10f0a6;VisuMZ[_0xc47034(0x24e)](_0x4ea634,_0x4ea634);const _0x696b54=_0x4ea634['SlowFade'];_0x696b54&&SceneManager[_0xc47034(0x212)]['fadeOutAll']();if(Imported[_0xc47034(0x216)]&&StorageManager['saveStyle']()==='single'){if(DataManager[_0xc47034(0x1fa)]())SceneManager[_0xc47034(0x1eb)](Scene_SingleLoadTransition);else{if(_0xc47034(0x270)===_0xc47034(0x270))SoundManager[_0xc47034(0x237)](),SceneManager[_0xc47034(0x212)][_0xc47034(0x238)]();else{if(!_0x23b2e1[_0xc47034(0x21a)]['Settings'][_0xc47034(0x1f2)]&&_0x1cdb13[_0xc47034(0x23d)]())return 0x0;return _0x2f763e[_0xc47034(0x21a)]['Game_Player_getInputDirection']['call'](this);}}}else SceneManager[_0xc47034(0x1eb)](Scene_Load);}),PluginManager[_0x10f0a6(0x225)](pluginData[_0x10f0a6(0x25b)],_0x10f0a6(0x257),_0x5f3fc7=>{const _0x2fe41f=_0x10f0a6;VisuMZ['ConvertParams'](_0x5f3fc7,_0x5f3fc7);const _0x5a1841=_0x5f3fc7['SlowFade'];_0x5a1841&&SceneManager['_scene'][_0x2fe41f(0x248)](),SceneManager[_0x2fe41f(0x1eb)](Scene_Options);}),DataManager[_0x10f0a6(0x229)]=function(){const _0x5aacdd=_0x10f0a6;this['setupNewGame']();const _0x4a4585=VisuMZ[_0x5aacdd(0x21a)]['Settings'][_0x5aacdd(0x20c)],_0x230f43=VisuMZ[_0x5aacdd(0x21a)][_0x5aacdd(0x1ff)][_0x5aacdd(0x21f)],_0x5b6dce=VisuMZ['EventTitleScene'][_0x5aacdd(0x1ff)][_0x5aacdd(0x20f)],_0x1422c0=VisuMZ['EventTitleScene'][_0x5aacdd(0x1ff)]['FaceDirection'];$gamePlayer[_0x5aacdd(0x23e)](_0x4a4585,_0x230f43,_0x5b6dce,_0x1422c0,0x0);},SceneManager[_0x10f0a6(0x267)]=function(){const _0x36b8f7=_0x10f0a6;return this[_0x36b8f7(0x212)]&&this['_scene'][_0x36b8f7(0x218)]===Scene_Map;},SceneManager[_0x10f0a6(0x23d)]=function(){const _0x51c802=_0x10f0a6;return this[_0x51c802(0x212)]&&this['_scene']['constructor']===Scene_EventedTitleMap;},VisuMZ['EventTitleScene']['SceneManager_goto']=SceneManager['goto'],SceneManager['goto']=function(_0x44eba4){const _0x4d6aec=_0x10f0a6;(_0x44eba4===Scene_Title||_0x44eba4===Scene_EventedTitleMap)&&(DataManager[_0x4d6aec(0x229)](),_0x44eba4=Scene_EventedTitleMap),VisuMZ[_0x4d6aec(0x21a)][_0x4d6aec(0x236)]['call'](this,_0x44eba4);},VisuMZ['EventTitleScene'][_0x10f0a6(0x201)]=SceneManager[_0x10f0a6(0x1eb)],SceneManager[_0x10f0a6(0x1eb)]=function(_0x26c66b){const _0x4597df=_0x10f0a6;(_0x26c66b===Scene_Title||_0x26c66b===Scene_EventedTitleMap)&&('tNmnp'==='tNmnp'?(DataManager[_0x4597df(0x229)](),_0x26c66b=Scene_EventedTitleMap):(_0xaa4a4e[_0x4597df(0x229)](),_0x5d80cb=_0x5c64da)),VisuMZ[_0x4597df(0x21a)][_0x4597df(0x201)][_0x4597df(0x22e)](this,_0x26c66b);},VisuMZ[_0x10f0a6(0x21a)]['Game_Player_getInputDirection']=Game_Player['prototype']['getInputDirection'],Game_Player[_0x10f0a6(0x26b)][_0x10f0a6(0x1f0)]=function(){const _0x1e3a24=_0x10f0a6;if(!VisuMZ['EventTitleScene']['Settings']['CanInputMove']&&SceneManager[_0x1e3a24(0x23d)]()){if(_0x1e3a24(0x26f)===_0x1e3a24(0x26f))return 0x0;else{_0x46a855['ConvertParams'](_0x532a0e,_0x4ff01e);const _0x261c0e=_0x1711c4['SlowFade'];_0x261c0e&&_0x2cd984['_scene']['fadeOutAll'](),_0x2e59b4[_0x1e3a24(0x216)]&&_0x293cc7[_0x1e3a24(0x1f7)]()===_0x1e3a24(0x1ee)?(_0x210d3c[_0x1e3a24(0x1f8)](),_0x268077[_0x1e3a24(0x240)]=!![],_0x7001e0['push'](_0x3ee73e)):_0x236880[_0x1e3a24(0x1eb)](_0x7cea7e);}}return VisuMZ[_0x1e3a24(0x21a)][_0x1e3a24(0x25c)][_0x1e3a24(0x22e)](this);};function Scene_EventedTitleMap(){const _0x5a283d=_0x10f0a6;this[_0x5a283d(0x217)](...arguments);}function _0x5b25(){const _0x3a728a=['10610649elBMvi','isPreviousScene','prototype','onSaveCoreLoadFailure','33WDlnqa','version','OroxX','haCgo','1RMIizp','cjiPY','save','updateEncounter','showFollowers','push','isTriggered','onLoadSuccess','locked','left','getInputDirection','update','CanInputMove','setTileBitmap','tileset','exTJL','ARRAYJSON','saveStyle','setupNewGame','PlayerTransparent','isAnySavefileExists','isMenuCalled','OnLoadSuccessJS','parameters','description','Settings','includes','SceneManager_push','enabled','lPYBD','length','98xNVmtW','onLoadFailure','Window_ChoiceList_makeCommandList','playLoad','enableContinueTextTag','20195NwGiXh','addChild','MapID','mgWNu','right','MapY','aupVE','loadGame','_scene','isAutosaveEnabled','map','NewGame','VisuMZ_1_SaveCore','initialize','constructor','start','EventTitleScene','processOptionsCoreFailsafe','1526594KZuMzI','NUM','updateCallDebug','MapX','EVAL','parse','LoadScreen','4021436QUAhVi','setTransparent','registerCommand','ARRAYSTR','SlowFade','then','prepareEventedTitleScreen','pTIik','FUNC','ObDSU','ixZVl','call','Save','format','Duration','STRUCT','pictureButtons','isMapTouchOk','trim','SceneManager_goto','playBuzzer','loadFailureConfirmationWindow','assistMode','OnLoadFailureJS','174768TcMXht','exit','isSceneTitleMap','reserveTransfer','4261690tVkJnP','_pickLockedSaveSlot','match','toUpperCase','jVJIN','isDebugCalled','create','ARRAYSTRUCT','_list','fadeOutAll','Sprite_Character_setTileBitmap','bind','Scene_Base_isAutosaveEnabled','isPlaytest','HUvzb','ConvertParams','makeCommandList','hideFollowers','VisuMZ_1_OptionsCore','ShowFollowers','DKTNB','status','createTitleButtons','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Options','JSON','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','replace','name','Game_Player_getInputDirection','gkIOo','3298215NeKvjV','popScene','updateOptionsCoreFailsafe','down','return\x200','1404ZEBsTh','_optionsCoreFailsafeCheck','initMembers','reloadMapIfUpdated','isSceneMap','SaveCore'];_0x5b25=function(){return _0x3a728a;};return _0x5b25();}Scene_EventedTitleMap['prototype']=Object['create'](Scene_Map[_0x10f0a6(0x26b)]),Scene_EventedTitleMap[_0x10f0a6(0x26b)][_0x10f0a6(0x218)]=Scene_EventedTitleMap,Scene_EventedTitleMap['prototype'][_0x10f0a6(0x217)]=function(){const _0x1aede7=_0x10f0a6;Scene_Map[_0x1aede7(0x26b)][_0x1aede7(0x217)]['call'](this),this['initMembers']();},Scene_EventedTitleMap['prototype'][_0x10f0a6(0x265)]=function(){const _0x2879d8=_0x10f0a6;$gamePlayer[_0x2879d8(0x224)](VisuMZ['EventTitleScene']['Settings'][_0x2879d8(0x1f9)]),VisuMZ[_0x2879d8(0x21a)][_0x2879d8(0x1ff)][_0x2879d8(0x252)]?$gamePlayer[_0x2879d8(0x1ea)]():$gamePlayer[_0x2879d8(0x250)]();},Scene_EventedTitleMap[_0x10f0a6(0x26b)][_0x10f0a6(0x213)]=function(){return![];},Scene_EventedTitleMap[_0x10f0a6(0x26b)][_0x10f0a6(0x234)]=function(){const _0x5d7127=_0x10f0a6;return VisuMZ['EventTitleScene'][_0x5d7127(0x1ff)][_0x5d7127(0x1f2)];},Scene_EventedTitleMap[_0x10f0a6(0x26b)][_0x10f0a6(0x1e9)]=function(){},Scene_EventedTitleMap['prototype'][_0x10f0a6(0x1fb)]=function(){return![];},Scene_EventedTitleMap[_0x10f0a6(0x26b)]['callMenu']=function(){},Scene_EventedTitleMap[_0x10f0a6(0x26b)][_0x10f0a6(0x21e)]=function(){},Scene_EventedTitleMap[_0x10f0a6(0x26b)][_0x10f0a6(0x244)]=function(){return![];},Scene_EventedTitleMap[_0x10f0a6(0x26b)][_0x10f0a6(0x219)]=function(){const _0x41b3fa=_0x10f0a6;Scene_Map['prototype'][_0x41b3fa(0x219)]['call'](this),Imported['VisuMZ_0_CoreEngine']&&this[_0x41b3fa(0x255)]();},Scene_EventedTitleMap['prototype'][_0x10f0a6(0x255)]=function(){const _0x32f960=_0x10f0a6;for(const _0x3e451d of Scene_Title[_0x32f960(0x233)]){const _0x282ea8=new Sprite_TitlePictureButton(_0x3e451d);this[_0x32f960(0x20b)](_0x282ea8);}},Scene_EventedTitleMap['prototype'][_0x10f0a6(0x1f1)]=function(){const _0x391c7a=_0x10f0a6;Scene_Map[_0x391c7a(0x26b)][_0x391c7a(0x1f1)][_0x391c7a(0x22e)](this),this['updateOptionsCoreFailsafe']();},Scene_EventedTitleMap[_0x10f0a6(0x26b)][_0x10f0a6(0x260)]=function(){const _0x2f5cbf=_0x10f0a6;if(ConfigManager[_0x2f5cbf(0x239)])return;if($gameTemp[_0x2f5cbf(0x24c)]())return;if(!Imported[_0x2f5cbf(0x251)])return;if(Input[_0x2f5cbf(0x1ec)](_0x2f5cbf(0x261)))this[_0x2f5cbf(0x21b)](0x2);if(Input[_0x2f5cbf(0x1ec)](_0x2f5cbf(0x1ef)))this[_0x2f5cbf(0x21b)](0x4);if(Input['isTriggered'](_0x2f5cbf(0x20e)))this[_0x2f5cbf(0x21b)](0x6);if(Input['isTriggered']('up'))this[_0x2f5cbf(0x21b)](0x8);},Scene_EventedTitleMap[_0x10f0a6(0x26b)][_0x10f0a6(0x21b)]=function(_0x13a8e8){const _0x519ade=_0x10f0a6,_0x3561ce=[0x8,0x8,0x2,0x2,0x4,0x6,0x4,0x6];this[_0x519ade(0x264)]=this['_optionsCoreFailsafeCheck']||0x0,_0x13a8e8===_0x3561ce[this[_0x519ade(0x264)]]?this[_0x519ade(0x264)]++:_0x519ade(0x24d)===_0x519ade(0x24d)?this['_optionsCoreFailsafeCheck']=0x0:_0x2d2651[_0x519ade(0x212)]['fadeOutAll'](),this[_0x519ade(0x264)]===_0x3561ce[_0x519ade(0x204)]&&(_0x519ade(0x1e7)===_0x519ade(0x243)?_0x2d61ab[_0x519ade(0x26b)][_0x519ade(0x217)]['call'](this):(ConfigManager[_0x519ade(0x239)]=!![],ConfigManager['save'](),SoundManager[_0x519ade(0x208)]()));};function Scene_TitleTransition(){const _0x251569=_0x10f0a6;this[_0x251569(0x217)](...arguments);}Scene_TitleTransition[_0x10f0a6(0x26b)]=Object[_0x10f0a6(0x245)](Scene_Base[_0x10f0a6(0x26b)]),Scene_TitleTransition[_0x10f0a6(0x26b)][_0x10f0a6(0x218)]=Scene_TitleTransition,Scene_TitleTransition[_0x10f0a6(0x26b)][_0x10f0a6(0x217)]=function(){const _0x3683a2=_0x10f0a6;Scene_Base[_0x3683a2(0x26b)]['initialize'][_0x3683a2(0x22e)](this);},Scene_TitleTransition[_0x10f0a6(0x26b)][_0x10f0a6(0x219)]=function(){const _0x15523a=_0x10f0a6;Scene_Base[_0x15523a(0x26b)]['start'][_0x15523a(0x22e)](this),DataManager[_0x15523a(0x1f8)](),SceneManager['goto'](Scene_Map);},VisuMZ[_0x10f0a6(0x21a)][_0x10f0a6(0x24b)]=Scene_Base['prototype']['isAutosaveEnabled'],Scene_Base[_0x10f0a6(0x26b)][_0x10f0a6(0x213)]=function(){const _0x5343a9=_0x10f0a6;if(SceneManager[_0x5343a9(0x26a)](Scene_TitleTransition))return![];if(SceneManager[_0x5343a9(0x26a)](Scene_Save))return![];return VisuMZ[_0x5343a9(0x21a)]['Scene_Base_isAutosaveEnabled'][_0x5343a9(0x22e)](this);};function Scene_SingleLoadTransition(){this['initialize'](...arguments);}function _0x3905(_0x206aef,_0x476f5a){const _0x5b2556=_0x5b25();return _0x3905=function(_0x3905cb,_0x31696b){_0x3905cb=_0x3905cb-0x1e6;let _0x59dc63=_0x5b2556[_0x3905cb];return _0x59dc63;},_0x3905(_0x206aef,_0x476f5a);}Scene_SingleLoadTransition[_0x10f0a6(0x26b)]=Object[_0x10f0a6(0x245)](Scene_Base['prototype']),Scene_SingleLoadTransition[_0x10f0a6(0x26b)][_0x10f0a6(0x218)]=Scene_SingleLoadTransition,Scene_SingleLoadTransition['prototype'][_0x10f0a6(0x217)]=function(){const _0x5618b5=_0x10f0a6;Scene_Base[_0x5618b5(0x26b)][_0x5618b5(0x217)][_0x5618b5(0x22e)](this);},Scene_SingleLoadTransition[_0x10f0a6(0x26b)][_0x10f0a6(0x219)]=function(){const _0x5d0966=_0x10f0a6;Scene_Base[_0x5d0966(0x26b)][_0x5d0966(0x219)][_0x5d0966(0x22e)](this),DataManager[_0x5d0966(0x211)](0x0)[_0x5d0966(0x228)](()=>this[_0x5d0966(0x1ed)]())['catch'](()=>this[_0x5d0966(0x206)]());},Scene_SingleLoadTransition[_0x10f0a6(0x26b)][_0x10f0a6(0x1ed)]=function(){const _0x2e53b6=_0x10f0a6;SoundManager[_0x2e53b6(0x208)](),this[_0x2e53b6(0x248)](),Scene_Load['prototype'][_0x2e53b6(0x266)](),SceneManager['goto'](Scene_Map),VisuMZ[_0x2e53b6(0x268)][_0x2e53b6(0x1ff)][_0x2e53b6(0x22f)][_0x2e53b6(0x1fc)][_0x2e53b6(0x22e)](this);},Scene_SingleLoadTransition['prototype'][_0x10f0a6(0x26c)]=function(){const _0x4be93e=_0x10f0a6;SoundManager[_0x4be93e(0x237)](),VisuMZ[_0x4be93e(0x268)][_0x4be93e(0x1ff)][_0x4be93e(0x22f)][_0x4be93e(0x23a)][_0x4be93e(0x22e)](this),this['loadFailureConfirmationWindow']();},Scene_SingleLoadTransition[_0x10f0a6(0x26b)][_0x10f0a6(0x206)]=function(){const _0x458715=_0x10f0a6;SoundManager['playBuzzer'](),VisuMZ[_0x458715(0x268)][_0x458715(0x1ff)][_0x458715(0x22f)]['OnLoadFailureJS'][_0x458715(0x22e)](this),this[_0x458715(0x238)]();const _0x221b07=VisuMZ[_0x458715(0x268)][_0x458715(0x1ff)]['SaveConfirm'][_0x458715(0x231)];setTimeout(this[_0x458715(0x25f)][_0x458715(0x24a)](this),_0x221b07);},VisuMZ[_0x10f0a6(0x21a)]['Sprite_Character_setTileBitmap']=Sprite_Character['prototype']['setTileBitmap'],Sprite_Character[_0x10f0a6(0x26b)][_0x10f0a6(0x1f3)]=function(){const _0x2ff9ab=_0x10f0a6;if(!$gameMap[_0x2ff9ab(0x1f4)]())return;VisuMZ[_0x2ff9ab(0x21a)][_0x2ff9ab(0x249)][_0x2ff9ab(0x22e)](this);},VisuMZ[_0x10f0a6(0x21a)][_0x10f0a6(0x207)]=Window_ChoiceList[_0x10f0a6(0x26b)]['makeCommandList'],Window_ChoiceList[_0x10f0a6(0x26b)][_0x10f0a6(0x24f)]=function(){const _0x225120=_0x10f0a6;VisuMZ[_0x225120(0x21a)][_0x225120(0x207)][_0x225120(0x22e)](this),this[_0x225120(0x209)]();},Window_ChoiceList['prototype'][_0x10f0a6(0x209)]=function(){const _0x2046d1=_0x10f0a6;for(const _0x1e0cc8 of this[_0x2046d1(0x247)]){if(_0x2046d1(0x1f5)===_0x2046d1(0x22d))_0x3b8105[_0x2046d1(0x239)]=!![],_0x3ad95e[_0x2046d1(0x1e8)](),_0x3e2087[_0x2046d1(0x208)]();else{if(!_0x1e0cc8)continue;if(!_0x1e0cc8[_0x2046d1(0x25b)][_0x2046d1(0x241)](/<CONTINUE>/i))continue;_0x1e0cc8[_0x2046d1(0x25b)]=_0x1e0cc8['name'][_0x2046d1(0x25a)](/<CONTINUE>/gi,'')['trim'](),_0x1e0cc8[_0x2046d1(0x202)]=DataManager[_0x2046d1(0x1fa)]();}}};
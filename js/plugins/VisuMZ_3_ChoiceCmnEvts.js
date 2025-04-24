//=============================================================================
// VisuStella MZ - Choice Common Events
// VisuMZ_3_ChoiceCmnEvts.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_ChoiceCmnEvts = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ChoiceCmnEvts = VisuMZ.ChoiceCmnEvts || {};
VisuMZ.ChoiceCmnEvts.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.01] [ChoiceCmnEvts]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Choice_Common_Events_VisuStella_MZ
 * @base VisuMZ_1_MessageCore
 * @orderAfter VisuMZ_1_MessageCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Ever wanted to have Common Events run when an option in the Choice Window is
 * selected without requiring the player to press OK? This plugin allows you,
 * the game dev, to make it so that specific choices will run Common Events in
 * the background (on the map scene) without any interruptions. Have a legion
 * of Common Events that change what picture is shown based on the selected
 * choice or make some events on the screen jump up and down whenever their
 * names are selected in the Choice Window.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Use specific text codes to determine which Common Event will run for a
 *   specific choice when selected without the need to press OK.
 * * Common Events ran this way won't interrupt the ongoing event.
 * * Can be used to create effects such as a shifting picture gallery or making
 *   events jump up and down when their name is selected.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_1_MessageCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Choice-Related Text Codes ===
 * 
 * ---
 *
 * -------------------------   ------------------------------------------------
 * Text Code                   Effect (Show Choice Text Only)
 * -------------------------   ------------------------------------------------
 * 
 * <Choice Common Event: id>   Makes the Common Event 'id' run when the choice
 *                             is selected (not confirmed) without having to
 *                             close the Choice Window. This only works on the
 *                             map scene.
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
 * Version 1.01: July 2, 2021
 * * Bug Fixes!
 * ** Default selected choice should now trigger upon the opening of the Choice
 *    List Window. Fix made by Arisu.
 * 
 * Version 1.00 Official Release Date: July 7, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

function _0x44e6(_0xf85580,_0x571412){const _0x4fc545=_0x4fc5();return _0x44e6=function(_0x44e66c,_0x5f0fa8){_0x44e66c=_0x44e66c-0x13d;let _0x2f2f9b=_0x4fc545[_0x44e66c];return _0x2f2f9b;},_0x44e6(_0xf85580,_0x571412);}const _0x517d28=_0x44e6;(function(_0x4f43b1,_0x54283d){const _0x2e87a0=_0x44e6,_0x356156=_0x4f43b1();while(!![]){try{const _0x39647d=-parseInt(_0x2e87a0(0x173))/0x1+-parseInt(_0x2e87a0(0x15e))/0x2+-parseInt(_0x2e87a0(0x17b))/0x3*(parseInt(_0x2e87a0(0x166))/0x4)+-parseInt(_0x2e87a0(0x151))/0x5*(parseInt(_0x2e87a0(0x16d))/0x6)+parseInt(_0x2e87a0(0x146))/0x7*(parseInt(_0x2e87a0(0x153))/0x8)+parseInt(_0x2e87a0(0x16f))/0x9*(parseInt(_0x2e87a0(0x176))/0xa)+parseInt(_0x2e87a0(0x16b))/0xb;if(_0x39647d===_0x54283d)break;else _0x356156['push'](_0x356156['shift']());}catch(_0xd3bfa){_0x356156['push'](_0x356156['shift']());}}}(_0x4fc5,0x5c80c));var label='ChoiceCmnEvts',tier=tier||0x0,dependencies=[_0x517d28(0x158)],pluginData=$plugins[_0x517d28(0x14e)](function(_0x38331e){const _0x46b7cc=_0x517d28;return _0x38331e[_0x46b7cc(0x141)]&&_0x38331e[_0x46b7cc(0x170)]['includes']('['+label+']');})[0x0];function _0x4fc5(){const _0x2ee4f8=['name','_choiceCommonEventAlert','Choice\x20Common\x20Events\x20only\x20work\x20on\x20the\x20map\x20scene!','ARRAYFUNC','CRDFW','status','Window_Selectable_select','format','ARRAYEVAL','replace','7DBqTtf','clearChoiceCommonEvents','onSelectChoiceCommonEvents','ARRAYNUM','NeNQt','constructor','return\x200','match','filter','call','select','38035ENLVUk','ARRAYSTRUCT','637464WLAzBm','exit','includes','Window_ChoiceList','_scene','VisuMZ_1_MessageCore','xBWri','map','_index','hZceP','Settings','373410GePpvh','ChoiceCmnEvts','indexOf','_choiceCommonEvents','Window_ChoiceList_makeCommandList','isPlaytest','max','toUpperCase','12DSmkHM','version','STR','Axktf','Scene_EventedTitleMap','16415014zHATuA','EVAL','354VtbYOY','ARRAYSTR','26055hgiAgC','description','trim','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','456759fURNGc','NdaKR','parameters','810PxDqEq','NUM','_list','STRUCT','fCGzX','335283XudgaD','index','makeCommandList','ConvertParams','prototype','parse','isSceneSelectChoiceCommonEventValid','Izldv','isSceneMap','addMessageCommonEvent','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'];_0x4fc5=function(){return _0x2ee4f8;};return _0x4fc5();}VisuMZ[label][_0x517d28(0x15d)]=VisuMZ[label][_0x517d28(0x15d)]||{},VisuMZ[_0x517d28(0x17e)]=function(_0x2d5c41,_0x329e0c){const _0x424814=_0x517d28;for(const _0x2e2f40 in _0x329e0c){if(_0x2e2f40[_0x424814(0x14d)](/(.*):(.*)/i)){const _0x28a841=String(RegExp['$1']),_0x109a57=String(RegExp['$2'])[_0x424814(0x165)]()[_0x424814(0x171)]();let _0x417d2d,_0xbe4d5e,_0x32afe9;switch(_0x109a57){case _0x424814(0x177):_0x417d2d=_0x329e0c[_0x2e2f40]!==''?Number(_0x329e0c[_0x2e2f40]):0x0;break;case _0x424814(0x149):_0xbe4d5e=_0x329e0c[_0x2e2f40]!==''?JSON[_0x424814(0x180)](_0x329e0c[_0x2e2f40]):[],_0x417d2d=_0xbe4d5e[_0x424814(0x15a)](_0x145374=>Number(_0x145374));break;case _0x424814(0x16c):_0x417d2d=_0x329e0c[_0x2e2f40]!==''?eval(_0x329e0c[_0x2e2f40]):null;break;case _0x424814(0x144):_0xbe4d5e=_0x329e0c[_0x2e2f40]!==''?JSON[_0x424814(0x180)](_0x329e0c[_0x2e2f40]):[],_0x417d2d=_0xbe4d5e[_0x424814(0x15a)](_0x6d069d=>eval(_0x6d069d));break;case'JSON':_0x417d2d=_0x329e0c[_0x2e2f40]!==''?JSON[_0x424814(0x180)](_0x329e0c[_0x2e2f40]):'';break;case'ARRAYJSON':_0xbe4d5e=_0x329e0c[_0x2e2f40]!==''?JSON[_0x424814(0x180)](_0x329e0c[_0x2e2f40]):[],_0x417d2d=_0xbe4d5e['map'](_0x4ab4b1=>JSON[_0x424814(0x180)](_0x4ab4b1));break;case'FUNC':_0x417d2d=_0x329e0c[_0x2e2f40]!==''?new Function(JSON[_0x424814(0x180)](_0x329e0c[_0x2e2f40])):new Function(_0x424814(0x14c));break;case _0x424814(0x13f):_0xbe4d5e=_0x329e0c[_0x2e2f40]!==''?JSON[_0x424814(0x180)](_0x329e0c[_0x2e2f40]):[],_0x417d2d=_0xbe4d5e[_0x424814(0x15a)](_0x4dfe98=>new Function(JSON[_0x424814(0x180)](_0x4dfe98)));break;case _0x424814(0x168):_0x417d2d=_0x329e0c[_0x2e2f40]!==''?String(_0x329e0c[_0x2e2f40]):'';break;case _0x424814(0x16e):_0xbe4d5e=_0x329e0c[_0x2e2f40]!==''?JSON[_0x424814(0x180)](_0x329e0c[_0x2e2f40]):[],_0x417d2d=_0xbe4d5e[_0x424814(0x15a)](_0x1253d8=>String(_0x1253d8));break;case _0x424814(0x179):_0x32afe9=_0x329e0c[_0x2e2f40]!==''?JSON[_0x424814(0x180)](_0x329e0c[_0x2e2f40]):{},_0x417d2d=VisuMZ[_0x424814(0x17e)]({},_0x32afe9);break;case _0x424814(0x152):_0xbe4d5e=_0x329e0c[_0x2e2f40]!==''?JSON[_0x424814(0x180)](_0x329e0c[_0x2e2f40]):[],_0x417d2d=_0xbe4d5e['map'](_0x1a9e3c=>VisuMZ[_0x424814(0x17e)]({},JSON[_0x424814(0x180)](_0x1a9e3c)));break;default:continue;}_0x2d5c41[_0x28a841]=_0x417d2d;}}return _0x2d5c41;},(_0x53d095=>{const _0x35ef9a=_0x517d28,_0x34564e=_0x53d095[_0x35ef9a(0x186)];for(const _0x91cd9e of dependencies){if(!Imported[_0x91cd9e]){if(_0x35ef9a(0x169)!==_0x35ef9a(0x169))_0xcdd8f0=_0x1d7ad9[_0x35ef9a(0x164)](_0x249e63,_0x2df4ea);else{alert(_0x35ef9a(0x185)[_0x35ef9a(0x143)](_0x34564e,_0x91cd9e)),SceneManager[_0x35ef9a(0x154)]();break;}}}const _0xb58ecd=_0x53d095['description'];if(_0xb58ecd[_0x35ef9a(0x14d)](/\[Version[ ](.*?)\]/i)){if(_0x35ef9a(0x140)===_0x35ef9a(0x182))return _0x22e625[_0x35ef9a(0x141)]&&_0x506b05['description']['includes']('['+_0x432747+']');else{const _0xf60769=Number(RegExp['$1']);_0xf60769!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x35ef9a(0x143)](_0x34564e,_0xf60769)),SceneManager[_0x35ef9a(0x154)]());}}if(_0xb58ecd[_0x35ef9a(0x14d)](/\[Tier[ ](\d+)\]/i)){const _0x48f0fe=Number(RegExp['$1']);if(_0x48f0fe<tier)alert(_0x35ef9a(0x172)[_0x35ef9a(0x143)](_0x34564e,_0x48f0fe,tier)),SceneManager[_0x35ef9a(0x154)]();else{if(_0x35ef9a(0x14a)!==_0x35ef9a(0x14a)){const _0x2cbc47=_0x1a3293(_0x5161c3['$1']);_0x2cbc47!==_0x3423cd[_0x68096f][_0x35ef9a(0x167)]&&(_0x5c8b07('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x35ef9a(0x143)](_0x21e288,_0x2cbc47)),_0xe5aff8[_0x35ef9a(0x154)]());}else tier=Math[_0x35ef9a(0x164)](_0x48f0fe,tier);}}VisuMZ[_0x35ef9a(0x17e)](VisuMZ[label][_0x35ef9a(0x15d)],_0x53d095[_0x35ef9a(0x175)]);})(pluginData),SceneManager[_0x517d28(0x183)]=function(){const _0x4b350d=_0x517d28;return this[_0x4b350d(0x157)]&&this[_0x4b350d(0x157)][_0x4b350d(0x14b)]===Scene_Map;},VisuMZ[_0x517d28(0x15f)][_0x517d28(0x162)]=Window_ChoiceList['prototype'][_0x517d28(0x17d)],Window_ChoiceList[_0x517d28(0x17f)]['makeCommandList']=function(){const _0x9adc9c=_0x517d28;this[_0x9adc9c(0x15b)]=-0x1,VisuMZ[_0x9adc9c(0x15f)][_0x9adc9c(0x162)][_0x9adc9c(0x14f)](this),this[_0x9adc9c(0x147)](),this['applyChoiceCommonEvents']();},Window_ChoiceList[_0x517d28(0x17f)][_0x517d28(0x147)]=function(){const _0x39f8f7=_0x517d28;this[_0x39f8f7(0x161)]={};},Window_ChoiceList['prototype']['applyChoiceCommonEvents']=function(){const _0x31e453=_0x517d28,_0x571279=/<(?:CHOICE|SELECT) (?:COMMON EVENT|EVENT|COMMONEVENT):[ ](\d+)>/gi;for(const _0x2adbf4 of this[_0x31e453(0x178)]){if(!_0x2adbf4)continue;if(_0x2adbf4[_0x31e453(0x186)][_0x31e453(0x14d)](_0x571279)){if('fCGzX'===_0x31e453(0x17a)){const _0x3fdf7a=Number(RegExp['$1']),_0x4eb76e=this['_list'][_0x31e453(0x160)](_0x2adbf4);this[_0x31e453(0x161)][_0x4eb76e]=_0x3fdf7a,_0x2adbf4[_0x31e453(0x186)]=_0x2adbf4[_0x31e453(0x186)][_0x31e453(0x145)](_0x571279,'')[_0x31e453(0x171)]();}else{_0x1fee6c[_0x31e453(0x163)]()&&!_0x594267[_0x31e453(0x13d)]&&(_0x385fc6[_0x31e453(0x13d)]=!![],_0x2aa1dd(_0x31e453(0x13e)));return;}}}},VisuMZ[_0x517d28(0x15f)][_0x517d28(0x142)]=Window_Selectable[_0x517d28(0x17f)][_0x517d28(0x150)],Window_Selectable['prototype'][_0x517d28(0x150)]=function(_0x140734){const _0x3260d4=_0x517d28,_0x459d01=this[_0x3260d4(0x17c)]();VisuMZ[_0x3260d4(0x15f)][_0x3260d4(0x142)][_0x3260d4(0x14f)](this,_0x140734),this['constructor'][_0x3260d4(0x186)]===_0x3260d4(0x156)&&this[_0x3260d4(0x148)](_0x140734,_0x459d01);},Window_ChoiceList[_0x517d28(0x17f)]['onSelectChoiceCommonEvents']=function(_0x455d65,_0x5d84c9){const _0x8c87c3=_0x517d28;if(_0x455d65<0x0)return;this[_0x8c87c3(0x161)]===undefined&&(_0x8c87c3(0x159)!==_0x8c87c3(0x174)?this['clearChoiceCommonEvents']():this[_0x8c87c3(0x161)]={});if(_0x455d65===_0x5d84c9)return;const _0x2b7e90=this[_0x8c87c3(0x161)][_0x455d65]||0x0;if(!_0x2b7e90)return;if(!this[_0x8c87c3(0x181)]()){if(_0x8c87c3(0x15c)===_0x8c87c3(0x15c)){$gameTemp[_0x8c87c3(0x163)]()&&!$gameTemp['_choiceCommonEventAlert']&&($gameTemp[_0x8c87c3(0x13d)]=!![],alert(_0x8c87c3(0x13e)));return;}else this[_0x8c87c3(0x148)](_0xbe3681,_0x5d71ba);}$gameMap&&$gameMap[_0x8c87c3(0x184)](_0x2b7e90);},Window_ChoiceList[_0x517d28(0x17f)][_0x517d28(0x181)]=function(){const _0x4a7b5a=_0x517d28,_0x4386bc=[_0x4a7b5a(0x16a)];return SceneManager[_0x4a7b5a(0x183)]()||_0x4386bc[_0x4a7b5a(0x155)](SceneManager[_0x4a7b5a(0x157)]['constructor'][_0x4a7b5a(0x186)]);};
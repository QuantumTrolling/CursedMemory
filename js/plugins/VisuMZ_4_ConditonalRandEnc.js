//=============================================================================
// VisuStella MZ - Conditional Random Encounters
// VisuMZ_4_ConditonalRandEnc.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_ConditonalRandEnc = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ConditonalRandEnc = VisuMZ.ConditonalRandEnc || {};
VisuMZ.ConditonalRandEnc.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.00] [ConditonalRandEnc]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Conditional_Random_Encounters_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Do you use Random Encounters for your RPG but want certain troops to appear
 * only after certain conditions have been met? For example, a pack of wolves
 * that appear when a specific switch is on, or a school of piranhas that show
 * up if they detect you have bait in your inventory? This plugin allows that
 * to be possible!
 *
 * Features include all (but not limited to) the following:
 * 
 * * Conditional Random Encounter requirements will prevent certain troops from
 *   being a part of the random encounter pool until the requirements are met.
 * * Also applies to the "Battle Processing" event command's "Same As Random
 *   Encounters" feature.
 * * Requirements range from switch conditions, variable values, item counts,
 *   weapon counts, armor counts, alive members, and more.
 * * Additional Comment Tags to force specific BGM's to play for specific
 *   troop encounters.
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
 * Comment Tags
 * ============================================================================
 *
 * To make these comment tags work, insert any of the below comment tags inside
 * a comment found within any of the troop's pages. The page's conditions do
 * not need to be met and can even work with the "Don't Run" condition.
 * 
 * If there are multiple comments, the comments will be stringed together
 * allowing for more than 6 lines of conditions.
 * 
 * If using the Battle Core's "Base Troop ID(s)" Plugin Parameter, the comments
 * from the Base Troop pages will also be copied over.
 *
 * ---
 * 
 * === Requirement Comment Tags ===
 * 
 * ---
 *
 * <Random Encounter Requirements>
 *  condition
 *  condition
 *  condition
 *  condition
 * </Random Encounter Requirements>
 *
 * - Used for: Troop Page Comment Tags
 * - Create conditional requirements for this random encounter to be met before
 *   it would appear in the random encounter pool for the map.
 * - Replace 'condition' with any of the conditions listed in below section.
 * - Insert and/or remove 'condition' lines to add/remove conditions.
 *
 * -=-=- Condition List -=-=-
 *
 * Replace 'condition' in the notetags in the above section with any of the
 * following to make conditions. These conditions are also used in the Plugin
 * Parameters for the default conditions, too.
 * 
 * ---
 *
 * x >= y
 * x > y
 * x === y
 * x !== y
 * x < y
 * x <= y
 * 
 * - Replace 'x' and 'y' with any of the following:
 *
 * - 'Switch x' (replace 'x' with a number) for switch x's current state.
 * - 'TRUE', 'FALSE', 'ON', 'OFF' for the opposite x/y value.
 * - Using any of these boolean modifiers must be paired with '===' or '!=='
 *
 * - 'Variable x' (replace 'x' with a number) for variable x's current value.
 * - A numeric value representing a hard number.
 * - '50%' or any other percentile number to represent a rate.
 * - '0.5' or any other float number to represent a rate.
 * 
 * - 'Item id Count' for the number of specific items the party owns.
 *   - Replace 'id' with the ID of the item.
 * - 'Item name Count' for the number of specific items the party owns.
 *   - Replace 'name' with the ID of the item.
 * 
 * - 'Weapon id Count' for the number of specific weapons the party owns.
 *   - Replace 'id' with the ID of the weapon.
 * - 'Weapon name Count' for the number of specific weapons the party owns.
 *   - Replace 'name' with the ID of the weapon.
 * 
 * - 'Armor id Count' for the number of specific armors the party owns.
 *   - Replace 'id' with the ID of the armor.
 * - 'Armor name Count' for the number of specific armors the party owns.
 *   - Replace 'name' with the ID of the armor.
 * 
 * - 'Alive Members' for the number of alive party members when drops are
 *   being determined.
 * 
 * - 'Battle Members' for the number of participating party members in battle.
 * 
 * - 'Dead Members' for the number of dead party members when drops are
 *   being determined.
 * 
 * - 'Death Turn' for the turn the enemy died. If an enemy was revived during
 *   battle, then take the most recent turn the enemy has died.
 * 
 * - 'Party Gold' for the party's current gold value when drops are
 *   being determined.
 * 
 * - 'Party Members' for the number of total party members in battle.
 *
 * ---
 * 
 * === BGM Comment Tags ===
 * 
 * ---
 * 
 * <Forced BGM>
 *  Name: filename
 *  Volume: x
 *  Pitch: x
 *  Pan: x
 * </Forced BGM>
 *
 * - Used for: Troop Page Comment Tags
 * - Forces a specific BGM to play whenever this specific encounter is primed
 *   for battle.
 * - This will override any database settings or music changes from event
 *   commands.
 * - Replace 'filename' with the filename of the BGM you want to play.
 *   - Do NOT include the file extension.
 * - Replace 'volume' with a number to determine sound volume.
 * - Replace 'pitch' with a number to determine sound pitch.
 * - Replace 'pan' with a number to determine sound panning.
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
 * Version 1.00 Official Release Date: September 10, 2021
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

function _0x53d5(_0x33098c,_0x31e85c){const _0x2b67ae=_0x2b67();return _0x53d5=function(_0x53d55a,_0x2164b6){_0x53d55a=_0x53d55a-0xea;let _0xd9b1db=_0x2b67ae[_0x53d55a];return _0xd9b1db;},_0x53d5(_0x33098c,_0x31e85c);}const _0x14b9e2=_0x53d5;(function(_0x151d72,_0x12a5ec){const _0x2e8217=_0x53d5,_0x481ba4=_0x151d72();while(!![]){try{const _0x26ad78=parseInt(_0x2e8217(0x128))/0x1+parseInt(_0x2e8217(0xfb))/0x2*(-parseInt(_0x2e8217(0x10c))/0x3)+-parseInt(_0x2e8217(0x115))/0x4+-parseInt(_0x2e8217(0x140))/0x5*(parseInt(_0x2e8217(0x154))/0x6)+-parseInt(_0x2e8217(0x157))/0x7*(-parseInt(_0x2e8217(0x13a))/0x8)+-parseInt(_0x2e8217(0xf6))/0x9*(-parseInt(_0x2e8217(0x10f))/0xa)+parseInt(_0x2e8217(0x12d))/0xb;if(_0x26ad78===_0x12a5ec)break;else _0x481ba4['push'](_0x481ba4['shift']());}catch(_0x51b368){_0x481ba4['push'](_0x481ba4['shift']());}}}(_0x2b67,0x2411d));function _0x2b67(){const _0x265ffd=['_troopId','TIiPv','name','map','5561633FYmldj','ssjaG','_weaponIDs','gold','_itemIDs','_skillIDs','getClassIdWithName','split','nyYYW','ITEMS','ITEM','EVAL','WEAPON','57096LerbQj','vDeqw','pitch','code','description','aliveMembers','35LgzhrG','ARRAYNUM','list','xArDu','sikHp','meetsConditionalRandomEncounterRequirement','ReplaceText','meetsEncounterConditions','Game_System_battleBgm','QRIgT','JSON','WEAPONS','STR','lVqvB','battleBgm','ARRAYFUNC','BQmaN','gBglH','pages','getArmorIdWithName','240852oRlFSX','max','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','140DJJtwp','SKILLS','ConditonalRandEnc','FUNC','ConvertParams','ARRAYEVAL','match','exit','troopId','parameters','LsWur','replace','tbEqK','false','length','includes','STATES','CEwbf','deadMembers','log','_classIDs','knuHa','IgTfa','getItemIdWithName','63RxGPmQ','ARMOR','_armorIDs','getDatabase','createTroopNote','6udoeiV','_stateIDs','WvcqL','getDatabaseItem','nRLCJ','STRUCT','filter','true','MqnNZ','trim','getSkillIdWithName','value','Settings','status','getStateIdWithName','ftmQS','clamp','258891TRDGRm','ARRAYSTRUCT','getWeaponIdWithName','343670XvuXMt','LgcYA','getDatabaseKind','ARMORS','format','eUoSx','1164720GebTvd','parse','version','meetsConditionalRandomEncounterConditions','getDatabaseItemID','toUpperCase','Game_Player_meetsEncounterConditions','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','fsQpr','volume','pan','battleBgmCondRandEnc','SKILL','_actorIDs','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','prototype','STATE','QvpSD','numItems','89894jcdwEh'];_0x2b67=function(){return _0x265ffd;};return _0x2b67();}var label='ConditonalRandEnc',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x14b9e2(0x101)](function(_0x629a8e){const _0x1d09f6=_0x14b9e2;return _0x629a8e[_0x1d09f6(0x108)]&&_0x629a8e[_0x1d09f6(0x13e)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x14b9e2(0x107)]||{},VisuMZ[_0x14b9e2(0x15b)]=function(_0x1bf0ac,_0x5d7ead){const _0x5ad55a=_0x14b9e2;for(const _0x136559 in _0x5d7ead){if(_0x136559['match'](/(.*):(.*)/i)){if(_0x5ad55a(0x13b)!==_0x5ad55a(0x135)){const _0x349464=String(RegExp['$1']),_0x21470a=String(RegExp['$2'])[_0x5ad55a(0x11a)]()[_0x5ad55a(0x104)]();let _0x4dd68e,_0x9859b0,_0x1b149a;switch(_0x21470a){case'NUM':_0x4dd68e=_0x5d7ead[_0x136559]!==''?Number(_0x5d7ead[_0x136559]):0x0;break;case _0x5ad55a(0x141):_0x9859b0=_0x5d7ead[_0x136559]!==''?JSON[_0x5ad55a(0x116)](_0x5d7ead[_0x136559]):[],_0x4dd68e=_0x9859b0['map'](_0x36dc9b=>Number(_0x36dc9b));break;case _0x5ad55a(0x138):_0x4dd68e=_0x5d7ead[_0x136559]!==''?eval(_0x5d7ead[_0x136559]):null;break;case _0x5ad55a(0x15c):_0x9859b0=_0x5d7ead[_0x136559]!==''?JSON[_0x5ad55a(0x116)](_0x5d7ead[_0x136559]):[],_0x4dd68e=_0x9859b0[_0x5ad55a(0x12c)](_0x51b934=>eval(_0x51b934));break;case _0x5ad55a(0x14a):_0x4dd68e=_0x5d7ead[_0x136559]!==''?JSON['parse'](_0x5d7ead[_0x136559]):'';break;case'ARRAYJSON':_0x9859b0=_0x5d7ead[_0x136559]!==''?JSON[_0x5ad55a(0x116)](_0x5d7ead[_0x136559]):[],_0x4dd68e=_0x9859b0[_0x5ad55a(0x12c)](_0x25e0b9=>JSON[_0x5ad55a(0x116)](_0x25e0b9));break;case _0x5ad55a(0x15a):_0x4dd68e=_0x5d7ead[_0x136559]!==''?new Function(JSON[_0x5ad55a(0x116)](_0x5d7ead[_0x136559])):new Function('return\x200');break;case _0x5ad55a(0x14f):_0x9859b0=_0x5d7ead[_0x136559]!==''?JSON[_0x5ad55a(0x116)](_0x5d7ead[_0x136559]):[],_0x4dd68e=_0x9859b0['map'](_0x264959=>new Function(JSON[_0x5ad55a(0x116)](_0x264959)));break;case _0x5ad55a(0x14c):_0x4dd68e=_0x5d7ead[_0x136559]!==''?String(_0x5d7ead[_0x136559]):'';break;case'ARRAYSTR':_0x9859b0=_0x5d7ead[_0x136559]!==''?JSON[_0x5ad55a(0x116)](_0x5d7ead[_0x136559]):[],_0x4dd68e=_0x9859b0['map'](_0x58e7a3=>String(_0x58e7a3));break;case _0x5ad55a(0x100):_0x1b149a=_0x5d7ead[_0x136559]!==''?JSON[_0x5ad55a(0x116)](_0x5d7ead[_0x136559]):{},_0x4dd68e=VisuMZ[_0x5ad55a(0x15b)]({},_0x1b149a);break;case _0x5ad55a(0x10d):_0x9859b0=_0x5d7ead[_0x136559]!==''?JSON[_0x5ad55a(0x116)](_0x5d7ead[_0x136559]):[],_0x4dd68e=_0x9859b0[_0x5ad55a(0x12c)](_0x1c6780=>VisuMZ[_0x5ad55a(0x15b)]({},JSON[_0x5ad55a(0x116)](_0x1c6780)));break;default:continue;}_0x1bf0ac[_0x349464]=_0x4dd68e;}else return _0x41424a[_0x4839d0[_0x5ad55a(0x153)](_0xfc39d7)]['id'];}}return _0x1bf0ac;},(_0x3c581a=>{const _0x28afd8=_0x14b9e2,_0x292828=_0x3c581a[_0x28afd8(0x12b)];for(const _0x1cbea8 of dependencies){if(_0x28afd8(0x12e)!==_0x28afd8(0x12e))_0x486dc8=_0x525240[_0x28afd8(0x162)](/\b\\V\[(\d+)\]\b/gi,(_0x412398,_0x39124a)=>_0x2e4b59[_0x28afd8(0x106)](_0x26ab08(_0x39124a)));else{if(!Imported[_0x1cbea8]){alert(_0x28afd8(0x156)[_0x28afd8(0x113)](_0x292828,_0x1cbea8)),SceneManager[_0x28afd8(0x15e)]();break;}}}const _0x102a81=_0x3c581a[_0x28afd8(0x13e)];if(_0x102a81[_0x28afd8(0x15d)](/\[Version[ ](.*?)\]/i)){if(_0x28afd8(0x14d)===_0x28afd8(0x149))_0x43ffc7[_0x28afd8(0x13c)]=_0x597da9(_0x1c947f['$1'])[_0x28afd8(0x10b)](0x0,0x3e8);else{const _0x4c9879=Number(RegExp['$1']);_0x4c9879!==VisuMZ[label][_0x28afd8(0x117)]&&('eUoSx'!==_0x28afd8(0x114)?_0x45cfde=_0x4e7f08['replace'](/\bVARIABLE (\d+)\b/gi,(_0x222c61,_0x28a8b6)=>_0x494107[_0x28afd8(0x106)](_0x5a0143(_0x28a8b6))):(alert(_0x28afd8(0x11c)[_0x28afd8(0x113)](_0x292828,_0x4c9879)),SceneManager[_0x28afd8(0x15e)]()));}}if(_0x102a81['match'](/\[Tier[ ](\d+)\]/i)){if(_0x28afd8(0xef)==='kGhxe')_0x262b6a(_0x28afd8(0x11c)[_0x28afd8(0x113)](_0x19f562,_0x29b284)),_0x11567d[_0x28afd8(0x15e)]();else{const _0x547936=Number(RegExp['$1']);if(_0x547936<tier)alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x28afd8(0x113)](_0x292828,_0x547936,tier)),SceneManager[_0x28afd8(0x15e)]();else{if('NRNFP'!=='FuxvF')tier=Math['max'](_0x547936,tier);else{_0xbfa922=_0x47e05f['toUpperCase']()[_0x28afd8(0x104)]();if(['I',_0x28afd8(0x137),_0x28afd8(0x136)][_0x28afd8(0xed)](_0x41b7a4))return _0x1526ec;if(['W',_0x28afd8(0x139),'WEAPONS'][_0x28afd8(0xed)](_0xdd8db1))return _0x460ea6;if(['A',_0x28afd8(0xf7),_0x28afd8(0x112)]['includes'](_0x4d21a4))return _0x1ed5d5;if(['S',_0x28afd8(0x121),_0x28afd8(0x158)]['includes'](_0x4a4823))return _0x2331c1;if(['T',_0x28afd8(0x125),_0x28afd8(0xee)][_0x28afd8(0xed)](_0x3310dc))return _0xb2a066;return _0xafb78f;}}}}VisuMZ['ConvertParams'](VisuMZ[label][_0x28afd8(0x107)],_0x3c581a[_0x28afd8(0x160)]);})(pluginData),DataManager[_0x14b9e2(0xfa)]=function(_0x53c2aa){const _0x5069f0=_0x14b9e2,_0xcb6fab=$dataTroops[_0x53c2aa];if(!_0xcb6fab)return'';let _0x27b3f3='';_0x27b3f3+=_0xcb6fab[_0x5069f0(0x12b)];for(const _0x43063e of _0xcb6fab[_0x5069f0(0x152)]){if(_0x5069f0(0xf3)===_0x5069f0(0x143))return _0x17a020[_0x27c94e[_0x5069f0(0xf5)](_0x24022c)];else for(const _0x14beeb of _0x43063e[_0x5069f0(0x142)]){if([0x6c,0x198]['includes'](_0x14beeb[_0x5069f0(0x13d)])){if(_0x5069f0(0x150)==='KdVZR'){let _0x37086e=![];if(_0x37086e)_0x1dcda3[_0x5069f0(0xf1)](_0x16ea03);try{return _0x41797c(_0x4f7389);}catch(_0x621a61){return![];}}else _0x27b3f3+='\x0a',_0x27b3f3+=_0x14beeb[_0x5069f0(0x160)][0x0];}}}return _0x27b3f3;},DataManager['getActorIdWithName']=function(_0x8729ad){const _0x4edc46=_0x14b9e2;_0x8729ad=_0x8729ad[_0x4edc46(0x11a)]()[_0x4edc46(0x104)](),this['_actorIDs']=this[_0x4edc46(0x122)]||{};if(this[_0x4edc46(0x122)][_0x8729ad])return this[_0x4edc46(0x122)][_0x8729ad];for(const _0x469dd8 of $dataActors){if(!_0x469dd8)continue;this[_0x4edc46(0x122)][_0x469dd8[_0x4edc46(0x12b)][_0x4edc46(0x11a)]()['trim']()]=_0x469dd8['id'];}return this[_0x4edc46(0x122)][_0x8729ad]||0x0;},DataManager[_0x14b9e2(0x133)]=function(_0x438713){const _0x73aa2a=_0x14b9e2;_0x438713=_0x438713[_0x73aa2a(0x11a)]()[_0x73aa2a(0x104)](),this['_classIDs']=this[_0x73aa2a(0xf2)]||{};if(this[_0x73aa2a(0xf2)][_0x438713])return this['_classIDs'][_0x438713];for(const _0x4e4ecf of $dataClasses){if(!_0x4e4ecf)continue;let _0xf4660=_0x4e4ecf['name'];_0xf4660=_0xf4660[_0x73aa2a(0x162)](/\x1I\[(\d+)\]/gi,''),_0xf4660=_0xf4660[_0x73aa2a(0x162)](/\\I\[(\d+)\]/gi,''),this[_0x73aa2a(0xf2)][_0xf4660['toUpperCase']()[_0x73aa2a(0x104)]()]=_0x4e4ecf['id'];}return this[_0x73aa2a(0xf2)][_0x438713]||0x0;},DataManager[_0x14b9e2(0x105)]=function(_0x226f8d){const _0x4393cc=_0x14b9e2;_0x226f8d=_0x226f8d['toUpperCase']()[_0x4393cc(0x104)](),this['_skillIDs']=this[_0x4393cc(0x132)]||{};if(this[_0x4393cc(0x132)][_0x226f8d])return this['_skillIDs'][_0x226f8d];for(const _0x1d4d15 of $dataSkills){if(!_0x1d4d15)continue;this['_skillIDs'][_0x1d4d15['name'][_0x4393cc(0x11a)]()['trim']()]=_0x1d4d15['id'];}return this[_0x4393cc(0x132)][_0x226f8d]||0x0;},DataManager[_0x14b9e2(0xf5)]=function(_0x1d5507){const _0x1cc719=_0x14b9e2;_0x1d5507=_0x1d5507[_0x1cc719(0x11a)]()[_0x1cc719(0x104)](),this['_itemIDs']=this[_0x1cc719(0x131)]||{};if(this[_0x1cc719(0x131)][_0x1d5507])return this['_itemIDs'][_0x1d5507];for(const _0x1a78bd of $dataItems){if(_0x1cc719(0x110)===_0x1cc719(0x110)){if(!_0x1a78bd)continue;this[_0x1cc719(0x131)][_0x1a78bd['name']['toUpperCase']()['trim']()]=_0x1a78bd['id'];}else _0x43ca2b=_0x58ca59[_0x1cc719(0x155)](_0x3c31bd,_0x449818);}return this['_itemIDs'][_0x1d5507]||0x0;},DataManager[_0x14b9e2(0x10e)]=function(_0x2fe8e1){const _0x2f55f8=_0x14b9e2;_0x2fe8e1=_0x2fe8e1[_0x2f55f8(0x11a)]()[_0x2f55f8(0x104)](),this[_0x2f55f8(0x12f)]=this[_0x2f55f8(0x12f)]||{};if(this['_weaponIDs'][_0x2fe8e1])return this[_0x2f55f8(0x12f)][_0x2fe8e1];for(const _0x256534 of $dataWeapons){if(_0x2f55f8(0x11d)===_0x2f55f8(0xf4)){const _0x219612=_0x4ac4a3(_0xc86287['$1']);_0x219612!==_0x1613c6[_0x116da0][_0x2f55f8(0x117)]&&(_0x11293a(_0x2f55f8(0x11c)['format'](_0x5c030a,_0x219612)),_0x55550e[_0x2f55f8(0x15e)]());}else{if(!_0x256534)continue;this[_0x2f55f8(0x12f)][_0x256534[_0x2f55f8(0x12b)]['toUpperCase']()[_0x2f55f8(0x104)]()]=_0x256534['id'];}}return this[_0x2f55f8(0x12f)][_0x2fe8e1]||0x0;},DataManager[_0x14b9e2(0x153)]=function(_0x59b61f){const _0x52d933=_0x14b9e2;_0x59b61f=_0x59b61f[_0x52d933(0x11a)]()[_0x52d933(0x104)](),this[_0x52d933(0xf8)]=this['_armorIDs']||{};if(this[_0x52d933(0xf8)][_0x59b61f])return this['_armorIDs'][_0x59b61f];for(const _0x12bee2 of $dataArmors){if(!_0x12bee2)continue;this[_0x52d933(0xf8)][_0x12bee2[_0x52d933(0x12b)]['toUpperCase']()[_0x52d933(0x104)]()]=_0x12bee2['id'];}return this[_0x52d933(0xf8)][_0x59b61f]||0x0;},DataManager[_0x14b9e2(0x109)]=function(_0x595ff7){const _0x50ded5=_0x14b9e2;_0x595ff7=_0x595ff7['toUpperCase']()[_0x50ded5(0x104)](),this[_0x50ded5(0xfc)]=this[_0x50ded5(0xfc)]||{};if(this[_0x50ded5(0xfc)][_0x595ff7])return this['_stateIDs'][_0x595ff7];for(const _0x4e3536 of $dataStates){if(!_0x4e3536)continue;this['_stateIDs'][_0x4e3536[_0x50ded5(0x12b)][_0x50ded5(0x11a)]()[_0x50ded5(0x104)]()]=_0x4e3536['id'];}return this[_0x50ded5(0xfc)][_0x595ff7]||0x0;},VisuMZ['ConditonalRandEnc']['getDatabase']=function(_0x94aa05){const _0x4a89f6=_0x14b9e2;_0x94aa05=_0x94aa05[_0x4a89f6(0x11a)]()[_0x4a89f6(0x104)]();if(['I','ITEM',_0x4a89f6(0x136)][_0x4a89f6(0xed)](_0x94aa05))return $dataItems;if(['W',_0x4a89f6(0x139),'WEAPONS'][_0x4a89f6(0xed)](_0x94aa05))return $dataWeapons;if(['A',_0x4a89f6(0xf7),_0x4a89f6(0x112)][_0x4a89f6(0xed)](_0x94aa05))return $dataArmors;if(['S',_0x4a89f6(0x121),_0x4a89f6(0x158)]['includes'](_0x94aa05))return $dataSkills;if(['T',_0x4a89f6(0x125),_0x4a89f6(0xee)]['includes'](_0x94aa05))return $dataStates;return $dataItems;},VisuMZ['ConditonalRandEnc'][_0x14b9e2(0x111)]=function(_0x38bddd){const _0x335f5e=_0x14b9e2;_0x38bddd=_0x38bddd[_0x335f5e(0x11a)]()[_0x335f5e(0x104)]();if(['I',_0x335f5e(0x137),'ITEMS'][_0x335f5e(0xed)](_0x38bddd))return 0x1;if(['W',_0x335f5e(0x139),_0x335f5e(0x14b)]['includes'](_0x38bddd))return 0x2;if(['A',_0x335f5e(0xf7),_0x335f5e(0x112)][_0x335f5e(0xed)](_0x38bddd))return 0x3;return 0x0;},VisuMZ[_0x14b9e2(0x159)][_0x14b9e2(0xfe)]=function(_0x3c44ea,_0x7f57dc){const _0x1701e0=_0x14b9e2;_0x3c44ea=_0x3c44ea[_0x1701e0(0x11a)]()[_0x1701e0(0x104)]();if(['I',_0x1701e0(0x137),'ITEMS'][_0x1701e0(0xed)](_0x3c44ea)){if('WKzHG'===_0x1701e0(0x126)){const _0x305f8d=_0xb3e2e1[_0x5b7c22];if(!_0x305f8d)return'';let _0x1119e6='';_0x1119e6+=_0x305f8d[_0x1701e0(0x12b)];for(const _0x418f5f of _0x305f8d[_0x1701e0(0x152)]){for(const _0x3f0dc7 of _0x418f5f[_0x1701e0(0x142)]){[0x6c,0x198]['includes'](_0x3f0dc7[_0x1701e0(0x13d)])&&(_0x1119e6+='\x0a',_0x1119e6+=_0x3f0dc7[_0x1701e0(0x160)][0x0]);}}return _0x1119e6;}else return $dataItems[DataManager[_0x1701e0(0xf5)](_0x7f57dc)];}if(['W','WEAPON','WEAPONS'][_0x1701e0(0xed)](_0x3c44ea))return'ftmQS'===_0x1701e0(0x10a)?$dataWeapons[DataManager[_0x1701e0(0x10e)](_0x7f57dc)]:_0x189e12[_0x2b0643[_0x1701e0(0x153)](_0x490312)];if(['A',_0x1701e0(0xf7),_0x1701e0(0x112)][_0x1701e0(0xed)](_0x3c44ea))return $dataArmors[DataManager[_0x1701e0(0x153)](_0x7f57dc)];if(['S','SKILL',_0x1701e0(0x158)][_0x1701e0(0xed)](_0x3c44ea))return $dataSkills[DataManager[_0x1701e0(0x105)](_0x7f57dc)];if(['T',_0x1701e0(0x125),_0x1701e0(0xee)][_0x1701e0(0xed)](_0x3c44ea))return $dataStates[DataManager[_0x1701e0(0x109)](_0x7f57dc)];return null;},VisuMZ['ConditonalRandEnc'][_0x14b9e2(0x119)]=function(_0x1ab6df,_0x485099){const _0x584185=_0x14b9e2;_0x1ab6df=_0x1ab6df[_0x584185(0x11a)]()[_0x584185(0x104)]();if(['I',_0x584185(0x137),_0x584185(0x136)][_0x584185(0xed)](_0x1ab6df))return $dataItems[DataManager['getItemIdWithName'](_0x485099)]['id'];if(['W',_0x584185(0x139),'WEAPONS'][_0x584185(0xed)](_0x1ab6df))return $dataWeapons[DataManager[_0x584185(0x10e)](_0x485099)]['id'];if(['A',_0x584185(0xf7),_0x584185(0x112)]['includes'](_0x1ab6df)){if(_0x584185(0x151)!==_0x584185(0x151))for(const _0x2e550e of _0x4d5c54[_0x584185(0x142)]){[0x6c,0x198][_0x584185(0xed)](_0x2e550e[_0x584185(0x13d)])&&(_0x503617+='\x0a',_0x5bd715+=_0x2e550e[_0x584185(0x160)][0x0]);}else return $dataArmors[DataManager[_0x584185(0x153)](_0x485099)]['id'];}return 0x0;},VisuMZ[_0x14b9e2(0x159)][_0x14b9e2(0x148)]=Game_System['prototype'][_0x14b9e2(0x14e)],Game_System[_0x14b9e2(0x124)][_0x14b9e2(0x14e)]=function(){const _0x1aa036=_0x14b9e2;return this[_0x1aa036(0x120)]()||VisuMZ[_0x1aa036(0x159)][_0x1aa036(0x148)]['call'](this);},Game_System[_0x14b9e2(0x124)]['battleBgmCondRandEnc']=function(){const _0x3fc2d0=_0x14b9e2,_0x418001=$dataTroops[$gameTroop[_0x3fc2d0(0x129)]||0x0];if(_0x418001){let _0x1cacc2=DataManager[_0x3fc2d0(0xfa)](_0x418001['id'])||'';if(_0x1cacc2[_0x3fc2d0(0x15d)](/<(?:FORCE|FORCED) BGM>\s*([\s\S]*)\s*<\/(?:FORCE|FORCED) BGM>/i)){const _0x491940=String(RegExp['$1']),_0x12fdba={'name':'','volume':0x5a,'pitch':0x64,'pan':0x0},_0x1033bc=_0x491940[_0x3fc2d0(0x134)](/[\r\n]+/);for(const _0x15f62b of _0x1033bc){_0x15f62b[_0x3fc2d0(0x15d)](/NAME:[ ]*(.*)/i)&&(_0x12fdba[_0x3fc2d0(0x12b)]=String(RegExp['$1']));_0x15f62b[_0x3fc2d0(0x15d)](/VOLUME:[ ]*(.*)/i)&&(_0x12fdba[_0x3fc2d0(0x11e)]=Number(RegExp['$1'])[_0x3fc2d0(0x10b)](0x0,0x64));if(_0x15f62b[_0x3fc2d0(0x15d)](/PITCH:[ ]*(.*)/i)){if('nRLCJ'===_0x3fc2d0(0xff))_0x12fdba[_0x3fc2d0(0x13c)]=Number(RegExp['$1'])[_0x3fc2d0(0x10b)](0x0,0x3e8);else{const _0x1c40eb=_0x208eb1(_0x53a96e['$1']);_0x1c40eb<_0x4afc95?(_0x8db24('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x3fc2d0(0x113)](_0x18294e,_0x1c40eb,_0x39ed6a)),_0x2420ec[_0x3fc2d0(0x15e)]()):_0x23f3cc=_0x4f51b5[_0x3fc2d0(0x155)](_0x1c40eb,_0x24e13f);}}if(_0x15f62b[_0x3fc2d0(0x15d)](/PAN:[ ]*(.*)/i)){if(_0x3fc2d0(0x144)!==_0x3fc2d0(0x12a))_0x12fdba[_0x3fc2d0(0x11f)]=Number(RegExp['$1'])[_0x3fc2d0(0x10b)](-0x64,0x64);else{let _0x39b7ab=_0x439b8a(_0x5f3a5e['$1']);_0x39b7ab=_0x51b4ef[_0x3fc2d0(0x159)][_0x3fc2d0(0x146)](_0x39b7ab)['trim']();const _0x5805e8=_0x39b7ab[_0x3fc2d0(0x134)](/[\r\n]+/);for(const _0x44f786 of _0x5805e8){if(!this['meetsConditionalRandomEncounterRequirement'](_0x44f786))return![];}}}}if(_0x12fdba['name']!=='')return _0x12fdba;}}return null;},VisuMZ['ConditonalRandEnc'][_0x14b9e2(0x11b)]=Game_Player[_0x14b9e2(0x124)][_0x14b9e2(0x147)],Game_Player['prototype'][_0x14b9e2(0x147)]=function(_0x2651fb){const _0x517aaa=_0x14b9e2;if(!_0x2651fb)return![];let _0x5efdc9=VisuMZ[_0x517aaa(0x159)]['Game_Player_meetsEncounterConditions']['call'](this,_0x2651fb);if(!_0x5efdc9)return![];let _0x9d5726=_0x2651fb[_0x517aaa(0x15f)];const _0x4c7688=$dataTroops[_0x9d5726];if(!_0x4c7688)return![];const _0x2366c2=DataManager[_0x517aaa(0xfa)](_0x4c7688['id']);return this[_0x517aaa(0x118)](_0x2366c2);},Game_Player['prototype']['meetsConditionalRandomEncounterConditions']=function(_0xc5cbce){const _0x687c40=_0x14b9e2;if(_0xc5cbce[_0x687c40(0x15d)](/<RANDOM ENCOUNTER (?:REQ|REQUIREMENT|REQUIREMENTS)>\s*([\s\S]*)\s*<\/RANDOM ENCOUNTER (?:REQ|REQUIREMENT|REQUIREMENTS)>/i)){if('SEHIT'!==_0x687c40(0xfd)){let _0x19cd0f=String(RegExp['$1']);_0x19cd0f=VisuMZ[_0x687c40(0x159)][_0x687c40(0x146)](_0x19cd0f)[_0x687c40(0x104)]();const _0x3557b2=_0x19cd0f[_0x687c40(0x134)](/[\r\n]+/);for(const _0x51cc85 of _0x3557b2){if(!this[_0x687c40(0x145)](_0x51cc85))return![];}}else return _0x66143a[_0x48dfc9[_0x687c40(0x105)](_0x2a95d5)];}return!![];},VisuMZ[_0x14b9e2(0x159)][_0x14b9e2(0x146)]=function(_0x2c2eca){const _0x546211=_0x14b9e2;while(_0x2c2eca[_0x546211(0x15d)](/\b\\V\[(\d+)\]\b/gi)){if(_0x546211(0x103)===_0x546211(0x103))_0x2c2eca=_0x2c2eca[_0x546211(0x162)](/\b\\V\[(\d+)\]\b/gi,(_0x25ad54,_0x145f42)=>$gameVariables[_0x546211(0x106)](parseInt(_0x145f42)));else{const _0x2c5a41=_0x46c56f[_0x546211(0x159)][_0x546211(0xf9)](_0x2e6268),_0xcef5a1=_0x2c5a41[_0x42250b(_0x59bc04)]||null;return _0xcef5a1?_0x3ec355[_0x546211(0x127)](_0xcef5a1):0x0;}}while(_0x2c2eca[_0x546211(0x15d)](/\bVARIABLE (\d+)\b/gi)){_0x2c2eca=_0x2c2eca['replace'](/\bVARIABLE (\d+)\b/gi,(_0x429d18,_0x5ecf06)=>$gameVariables[_0x546211(0x106)](parseInt(_0x5ecf06)));}return _0x2c2eca=_0x2c2eca[_0x546211(0x162)](/\\S\[(\d+)\] ON/gi,(_0x3b4fe9,_0x269daa)=>String($gameSwitches[_0x546211(0x106)](parseInt(_0x269daa))===!![])),_0x2c2eca=_0x2c2eca[_0x546211(0x162)](/\\S\[(\d+)\] OFF/gi,(_0x45f957,_0x2ced5f)=>String($gameSwitches[_0x546211(0x106)](parseInt(_0x2ced5f))===![])),_0x2c2eca=_0x2c2eca[_0x546211(0x162)](/\\S\[(\d+)\]/gi,(_0x556d7a,_0x293657)=>String($gameSwitches[_0x546211(0x106)](parseInt(_0x293657)))),_0x2c2eca=_0x2c2eca[_0x546211(0x162)](/SWITCH (\d+) ON/gi,(_0x159275,_0x2f0745)=>String($gameSwitches[_0x546211(0x106)](parseInt(_0x2f0745))===!![])),_0x2c2eca=_0x2c2eca[_0x546211(0x162)](/SWITCH (\d+) OFF/gi,(_0x1b21cb,_0x2813d5)=>String($gameSwitches[_0x546211(0x106)](parseInt(_0x2813d5))===![])),_0x2c2eca=_0x2c2eca[_0x546211(0x162)](/SWITCH (\d+)/gi,(_0x3b198e,_0x32437a)=>String($gameSwitches['value'](parseInt(_0x32437a)))),_0x2c2eca=_0x2c2eca[_0x546211(0x162)](/\bON\b/gi,_0x546211(0x102)),_0x2c2eca=_0x2c2eca['replace'](/\bOFF\b/gi,'false'),_0x2c2eca=_0x2c2eca[_0x546211(0x162)](/\bTRUE\b/gi,_0x546211(0x102)),_0x2c2eca=_0x2c2eca[_0x546211(0x162)](/\bFALSE\b/gi,_0x546211(0xeb)),_0x2c2eca=_0x2c2eca[_0x546211(0x162)](/\b(ITEM|WEAPON|ARMOR)[ ](\d+)[ ]COUNT\b/gi,(_0x1b44fb,_0x1283af,_0x3780db)=>{const _0x3b2112=_0x546211;if(_0x3b2112(0xea)===_0x3b2112(0xea)){const _0x1832d8=VisuMZ[_0x3b2112(0x159)][_0x3b2112(0xf9)](_0x1283af),_0x3b02fe=_0x1832d8[Number(_0x3780db)]||null;return _0x3b02fe?$gameParty[_0x3b2112(0x127)](_0x3b02fe):0x0;}else[0x6c,0x198]['includes'](_0x412e07[_0x3b2112(0x13d)])&&(_0x295189+='\x0a',_0x15a6c0+=_0x5b602d[_0x3b2112(0x160)][0x0]);}),_0x2c2eca=_0x2c2eca[_0x546211(0x162)](/\b(ITEM|WEAPON|ARMOR)[ ](.*)[ ]COUNT\b/gi,(_0x3bfa23,_0x3cc375,_0x1cf072)=>{const _0x4094d7=_0x546211;if('LsWur'!==_0x4094d7(0x161))_0x1f888b(_0x4094d7(0x123)[_0x4094d7(0x113)](_0x32f07e,_0x20c2bd,_0x57700e)),_0x53fae1[_0x4094d7(0x15e)]();else{const _0x4365c8=VisuMZ[_0x4094d7(0x159)][_0x4094d7(0xfe)](_0x3cc375,_0x1cf072);return _0x4365c8?$gameParty['numItems'](_0x4365c8):0x0;}}),_0x2c2eca=_0x2c2eca[_0x546211(0x162)](/\bALIVE MEMBERS\b/gi,$gameParty[_0x546211(0x13f)]()[_0x546211(0xec)]),_0x2c2eca=_0x2c2eca[_0x546211(0x162)](/\bBATTLE MEMBERS\b/gi,$gameParty['battleMembers']()['length']),_0x2c2eca=_0x2c2eca[_0x546211(0x162)](/\bDEAD MEMBERS\b/gi,$gameParty[_0x546211(0xf0)]()[_0x546211(0xec)]),_0x2c2eca=_0x2c2eca[_0x546211(0x162)](/\bPARTY GOLD\b/gi,$gameParty[_0x546211(0x130)]()),_0x2c2eca=_0x2c2eca[_0x546211(0x162)](/\bPARTY MEMBERS\b/gi,$gameParty['members']()[_0x546211(0xec)]),_0x2c2eca['trim']();},Game_Player[_0x14b9e2(0x124)]['meetsConditionalRandomEncounterRequirement']=function(_0x245855){const _0x52a8c8=_0x14b9e2;let _0x101f38=![];if(_0x101f38)console[_0x52a8c8(0xf1)](_0x245855);try{return eval(_0x245855);}catch(_0x3f3f73){return![];}};
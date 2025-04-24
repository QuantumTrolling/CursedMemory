//=============================================================================
// VisuStella MZ - New Game +
// VisuMZ_3_NewGamePlus.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_NewGamePlus = true;

var VisuMZ = VisuMZ || {};
VisuMZ.NewGamePlus = VisuMZ.NewGamePlus || {};
VisuMZ.NewGamePlus.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.04] [NewGamePlus]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/New_Game_Plus_VisuStella_MZ
 * @base VisuMZ_1_SaveCore
 * @orderAfter VisuMZ_1_SaveCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * New Game+ is a great way to provide replay value for your game. It lets the
 * player re-experience the game in a different way with either carried over
 * items, to carried over party members, to carried over skills, switches, and
 * variables even. There exists many options to change how New Game+ will work
 * for your game.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Select which switches, variables, actor data, party data, and system data
 *   is carried over into a New Game+.
 * * Use notetags to prevent specific items, weapons, armors, or actors from
 *   carrying over their data.
 * * Two different ways of starting a New Game+.
 * * One way is by saving a New Game+ save file and loading upon it.
 * * The second way is by immediately using the current game's save data and
 *   starting a New Game+ with it.
 * * Run a dedicated Common Event after a New Game+ has started.
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
 * * VisuMZ_1_SaveCore
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
 * Instructions
 * ============================================================================
 *
 * So how do you start a New Game+? There are two ways to do it:
 * 
 * ---
 * 
 * Method 1: Save File with New Game+
 * 
 * Use the Plugin Command from this plugin for "Save: New Game+" from the map
 * scene. The save menu will open and prompt the player where to make a save
 * file for the New Game+ file to be at.
 * 
 * When the player loads up that file, a new game will start instead with all
 * of the carry over effects listed in the Plugin Parameters.
 * 
 * ---
 * 
 * Method 2: Transition into New Game+
 * 
 * Use the Plugin Command from this plugin for "Transition: New Game+" from the
 * map scene. The game will immediately fade out and start a new game with all
 * of the carry over effects listed in the Plugin Parameters.
 * 
 * This is useful for the games who have decided to make one save file games.
 * 
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 * 
 * VisuMZ_2_ClassChangeSystem
 *
 * VisuMZ_2_SkillLearnSystem
 *
 * This plugin allows the functionality of carrying over AP, CP, JP, SP if you
 * so wish. You can change the settings in this plugin's Plugin Parameters.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === New Game+-Related Notetags ===
 * 
 * ---
 *
 * <No New Game+ Carry Over>
 *
 * - Used for: Actor, Item, Weapon, Armor Notetags
 * - This will prevent the item, weapon, or armor from being carried over to
 *   New Game+. If this is used on an actor, the actor will be in its default
 *   state as if a new game started.
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
 * === Save Plugin Commands ===
 * 
 * ---
 *
 * Save: New Game+
 * - Opens up the Save menu for the player to save a New Game+ file.
 * - Only works from map scene.
 *
 * ---
 * 
 * === Transition Plugin Commands ===
 * 
 * ---
 *
 * Transition: New Game+
 * - Transitions the current game directly into a New Game+.
 * - Only works from map scene.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Data Settings
 * ============================================================================
 *
 * This contains actor data that will be carried over when starting a
 * New Game+.
 *
 * ---
 *
 * General
 * 
 *   Copy Actor?:
 *   - Carry over all of each actor's settings when starting a New Game+?
 * 
 *   EXP:
 *   - Carry over each actor's EXP data when starting a New Game+?
 * 
 *   Skills:
 *   - Carry over each actor's skills data when starting a New Game+?
 *
 * ---
 *
 * Compatibility
 * 
 *   Ability Points:
 *   - Carry over each actor's AP when starting a New Game+?
 *   - Requires VisuMZ_2_SkillLearnSystem
 * 
 *   Class Points:
 *   - Carry over each actor's CP when starting a New Game+?
 *   - Requires VisuMZ_2_ClassChangeSystem
 * 
 *   Job Points:
 *   - Carry over each actor's JP when starting a New Game+?
 *   - Requires VisuMZ_2_ClassChangeSystem
 * 
 *   Skill Points:
 *   - Carry over each actor's SP when starting a New Game+?
 *   - Requires VisuMZ_2_SkillLearnSystem
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Party Data Settings
 * ============================================================================
 *
 * This contains party data that will be carried over when starting a
 * New Game+.
 *
 * ---
 *
 * Settings
 * 
 *   Gold:
 *   - Carry over gold data when starting a New Game+?
 * 
 *   Items:
 *   - Carry over item data when starting a New Game+?
 * 
 *   Weapons:
 *   - Carry over weapon data when starting a New Game+?
 * 
 *   Armors:
 *   - Carry over armor data when starting a New Game+?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: System Data Settings
 * ============================================================================
 *
 * This contains system data that will be carried over when starting a
 * New Game+.
 *
 * ---
 *
 * Settings
 * 
 *   Playtime:
 *   - Carry over playtime data when starting a New Game+?
 * 
 *   Save Count:
 *   - Carry over save count data when starting a New Game+?
 * 
 *   Step Count:
 *   - Carry over step count data when starting a New Game+?
 * 
 *   Battle Count:
 *   - Carry over battle count data when starting a New Game+?
 * 
 *   Victory Count:
 *   - Carry over victory count data when starting a New Game+?
 * 
 *   Escape Count:
 *   - Carry over escape count data when starting a New Game+?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Carry Over Switches and Variables
 * ============================================================================
 *
 * When starting a New Game+, usually all of the data found in Switches and
 * Variables will be cleared out to an OFF flag and 0 value respectively. These
 * settings allow you to set exceptions for certain Switches and Variables to
 * retain their data when going into a New Game+.
 *
 * ---
 *
 * Settings
 * 
 *   Switches:
 *   - A list of switches to be carried over when starting a New Game+.
 * 
 *   Variables:
 *   - A list of variables to be carried over when starting a New Game+.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Scene_Save Settings
 * ============================================================================
 *
 * The settings for the Save Menu for New Game+ related entities.
 *
 * ---
 *
 * Settings
 * 
 *   Title Format:
 *   - Title format for a New Game+ file.
 *   - %1 - Save File ID
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Save New Game+ Help:
 *   - Text to display in the help file when saving for a New Game+ target.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: New Game+ Common Event Settings
 * ============================================================================
 *
 * When a New Game+ occurs, you can set the game to run a Common Event once
 * loaded into the map.
 *
 * ---
 *
 * Settings
 * 
 *   Common Event:
 *   - Select a Common Event to run after starting a New Game+.
 *   - Use 0 for no Common Event.
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
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.04: May 29, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: April 2, 2021
 * * Bug Fixes!
 * ** Carrying over variables for a New Game+ should no longer cause crashes
 *    during the transition phase. Fix made by Arisu.
 * 
 * Version 1.02: February 12, 2021
 * * Bug Fixes!
 * ** Carry-Over Variables Plugin Parameter should now display Variables
 *    instead of Switches. Fix made by Irina.
 * ** Save files will no longer corrupt when carrying over uninitialized
 *    actors. Fix made by Irina.
 * 
 * Version 1.01: January 1, 2021
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.00: January 20, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveNewGamePlus
 * @text Save: New Game+
 * @desc Opens up the Save menu for the player to save a New Game+ file.
 * Only works from map scene.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TransitionNewGamePlus
 * @text Transition: New Game+
 * @desc Transitions the current game directly into a New Game+.
 * Only works from map scene.
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
 * @param NewGamePlus
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param CarryOver
 * @text Carry Over
 *
 * @param Actor:struct
 * @text Actor Data
 * @parent CarryOver
 * @type struct<Actor>
 * @desc This contains actor data that will be carried over when starting a New Game+.
 * @default {"General":"","CopyActor:eval":"true","EXP:eval":"true","Skills:eval":"true","Compatibility":"","AbilityPoints:eval":"true","ClassPoints:eval":"true","JobPoints:eval":"true","SkillPoints:eval":"true"}
 *
 * @param Party:struct
 * @text Party Data
 * @parent CarryOver
 * @type struct<Party>
 * @desc This contains party data that will be carried over when starting a New Game+.
 * @default {"Gold:eval":"true","Items:eval":"true","Weapons:eval":"true","Armors:eval":"true"}
 *
 * @param System:struct
 * @text System Data
 * @parent CarryOver
 * @type struct<System>
 * @desc This contains system data that will be carried over when starting a New Game+.
 * @default {"Playtime:eval":"true","SaveCount:eval":"true","StepCount:eval":"true","BattleCount:eval":"true","VictoryCount:eval":"true","EscapeCount:eval":"true"}
 * 
 * @param Switches:arraynum
 * @text Switches
 * @parent CarryOver
 * @type switch[]
 * @desc A list of switches to be carried over when starting a New Game+.
 * @default []
 * 
 * @param Variables:arraynum
 * @text Variables
 * @parent CarryOver
 * @type variable[]
 * @desc A list of variables to be carried over when starting a New Game+.
 * @default []
 *
 * @param SceneSave:struct
 * @text Scene_Save
 * @type struct<SceneSave>
 * @desc The settings for the Save Menu for New Game+ related entities.
 * @default {"TitleFmt:str":"File %1: NEW GAME+","TextColor:str":"6","SaveNewGamePlusHelp:str":"Which file would you like to save New Game+ to?"}
 * 
 * @param CommonEvent:num
 * @text New Game+ Common Event
 * @type common_event
 * @desc Select a Common Event to run after starting a New Game+.
 * Use 0 for no Common Event.
 * @default 0
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
/* ----------------------------------------------------------------------------
 * Actor Data Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Actor:
 *
 * @param General
 *
 * @param CopyActor:eval
 * @text Copy Actor?
 * @parent General
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over all of each actor's settings when starting a New Game+?
 * @default true
 *
 * @param EXP:eval
 * @text EXP
 * @parent General
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over each actor's EXP data when starting a New Game+?
 * @default true
 *
 * @param Skills:eval
 * @text Skills
 * @parent General
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over each actor's skills data when starting a New Game+?
 * @default true
 * 
 * @param Compatibility
 *
 * @param AbilityPoints:eval
 * @text Ability Points
 * @parent Compatibility
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over each actor's AP when starting a New Game+?
 * Requires VisuMZ_2_SkillLearnSystem
 * @default true
 *
 * @param ClassPoints:eval
 * @text Class Points
 * @parent Compatibility
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over each actor's CP when starting a New Game+?
 * Requires VisuMZ_2_ClassChangeSystem
 * @default true
 *
 * @param JobPoints:eval
 * @text Job Points
 * @parent Compatibility
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over each actor's JP when starting a New Game+?
 * Requires VisuMZ_2_ClassChangeSystem
 * @default true
 *
 * @param SkillPoints:eval
 * @text Skill Points
 * @parent Compatibility
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over each actor's SP when starting a New Game+?
 * Requires VisuMZ_2_SkillLearnSystem
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Party Data Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Party:
 *
 * @param Gold:eval
 * @text Gold
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over gold data when starting a New Game+?
 * @default true
 *
 * @param Items:eval
 * @text Items
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over item data when starting a New Game+?
 * @default true
 *
 * @param Weapons:eval
 * @text Weapons
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over weapon data when starting a New Game+?
 * @default true
 *
 * @param Armors:eval
 * @text Armors
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over armor data when starting a New Game+?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * System Data Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~System:
 *
 * @param Playtime:eval
 * @text Playtime
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over playtime data when starting a New Game+?
 * @default true
 *
 * @param SaveCount:eval
 * @text Save Count
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over save count data when starting a New Game+?
 * @default true
 *
 * @param StepCount:eval
 * @text Step Count
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over step count data when starting a New Game+?
 * @default true
 *
 * @param BattleCount:eval
 * @text Battle Count
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over battle count data when starting a New Game+?
 * @default true
 *
 * @param VictoryCount:eval
 * @text Victory Count
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over victory count data when starting a New Game+?
 * @default true
 *
 * @param EscapeCount:eval
 * @text Escape Count
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over escape count data when starting a New Game+?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * SceneSave Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SceneSave:
 *
 * @param TitleFmt:str
 * @text Title Format
 * @parent NewGamePlus
 * @desc Title format for a New Game+ file.
 * %1 - Save File ID
 * @default File %1: NEW GAME+
 * 
 * @param TextColor:str
 * @text Text Color
 * @parent NewGamePlus
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param SaveNewGamePlusHelp:str
 * @text Save New Game+ Help
 * @parent NewGamePlus
 * @desc Text to display in the help file when saving for a New Game+ target.
 * @default Which file would you like to save New Game+ to?
 *
 */
//=============================================================================

function _0x5160(){const _0x5dc19e=['prototype','initNewGamePlusSettings','escapecount','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','#%1','carryOverNewGamePlusVariables','drawTitle','gHtHt','hkjoN','helpWindowText','SaveNewGamePlus','EXP','max','toUpperCase','getNewGamePlusLoops','_classPoints','SceneSave','makeDeepCopy','refresh','push','prepareNewGamePlusData','gainStartingAbilityPoints','CopyActor','JobPoints','Qdqbw','iSoNj','5flIFDD','2372829usXZgO','zlqsT','_skills','actors','newGamePlusAdjustLevel','isNewGamePlusEnabled','initialLevel','787116RxKQTW','Switches','xSCkL','fileNewGamePlus','Party','EVAL','isNewGamePlus','match','TransitionNewGamePlus','itemRectWithPadding','Window_SavefileList_drawTitle','setNewGamePlusLoaded','currentExp','includes','initJobPoints','CommonEvent','Game_System_initialize','initialize','isNewGamePlusLoaded','victorycount','671rRgrzl','STRUCT','allItems','switches','_newGamePlusLoops','setNewGamePlusLoops','startNewGamePlus','ARRAYFUNC','actor','Variables','equips','System','VisuMZ_2_ClassChangeSystem','runNewGamePlusCommonEvent','isSceneMap','needsSlowFadeOut','_newGamePlusLoaded','Settings','SaveNewGamePlusHelp','ConvertParams','_ngpData','_gold','levelUp','Scene_Load_onLoadSuccess','clearEquipments','version','Scene_Map_needsSlowFadeOut','length','setupNewGame','SkillPoints','copyNewGamePlusActorData','return\x200','_steps','status','call','getColor','TextColor','initClassPoints','isNextScene','newGamePlusRefresh','newGamePlus','onLoadSuccess','ARRAYJSON','registerCommand','_items','carryOverNewGamePlusActors','items','NBRYH','SaveCount','DxuqQ','_saveCount','newGamePlusTitle','canNewGamePlusCarryOver','kleXd','removeNewGamePlusNoCarryOverItems','VisuMZ_1_SaveCore','gold','_newGamePlusEnabled','30qZURqs','51344wEtfJy','description','_data','zmJUA','17byQIRA','NUM','cVOqV','Actor','changeTextColor','7348536tvHRKN','ARRAYSTRUCT','FOfRN','nidcP','recoverAll','_framesOnSave','gainStartingClassPoints','setValue','_skillPoints','helpNewGamePlus','ARRAYNUM','frameCount','drawText','classId','rVOvW','create','loops','exit','BIGxF','434710xczDaL','_classId','FUNC','_escapeCount','width','_scene','_armors','AzAkR','_winCount','savefileId','phWHL','ZpFdx','carryOverNewGamePlusPartyData','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','goto','Playtime','playtime','loseItem','NewGamePlus','_jobPoints','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','StepCount','OthGQ','initSkills','steps','weapons','name','carryOverNewGamePlusSystemData','_battleCount','filter','DataManager_makeSavefileInfo','cqaEw','carryOverNewGamePlusSwitches','gainStartingJobPoints','273912MHOFRh','parse','_listWindow','format','constructor','VictoryCount','16191aYPveV','initExp','TitleFmt','savecount','savefileInfo','_exp','nextLevelExp','Gold','carryOverNewGamePlusData','saveCount','stepcount','261eKCCgg','_abilityPoints','map','start','FAQmH','makeSavefileInfo','PqUSv','Items','currentLevelExp','BattleCount','numItems','drawNewGamePlusMarker','VWGXF','armors','AbilityPoints'];_0x5160=function(){return _0x5dc19e;};return _0x5160();}const _0x472382=_0x65d7;function _0x65d7(_0x204fcf,_0x5ad3c9){const _0x516047=_0x5160();return _0x65d7=function(_0x65d73a,_0x488523){_0x65d73a=_0x65d73a-0x110;let _0x208c7a=_0x516047[_0x65d73a];return _0x208c7a;},_0x65d7(_0x204fcf,_0x5ad3c9);}(function(_0x2ea15c,_0x2b596e){const _0x3a2abd=_0x65d7,_0x52a9b6=_0x2ea15c();while(!![]){try{const _0xad6b77=parseInt(_0x3a2abd(0x17f))/0x1*(-parseInt(_0x3a2abd(0x17b))/0x2)+-parseInt(_0x3a2abd(0x125))/0x3+parseInt(_0x3a2abd(0x12c))/0x4*(parseInt(_0x3a2abd(0x124))/0x5)+-parseInt(_0x3a2abd(0x17a))/0x6*(parseInt(_0x3a2abd(0x1bf))/0x7)+-parseInt(_0x3a2abd(0x184))/0x8+parseInt(_0x3a2abd(0x1ca))/0x9*(parseInt(_0x3a2abd(0x197))/0xa)+parseInt(_0x3a2abd(0x140))/0xb*(parseInt(_0x3a2abd(0x1b9))/0xc);if(_0xad6b77===_0x2b596e)break;else _0x52a9b6['push'](_0x52a9b6['shift']());}catch(_0x46b066){_0x52a9b6['push'](_0x52a9b6['shift']());}}}(_0x5160,0xa9065));var label=_0x472382(0x1a9),tier=tier||0x0,dependencies=[_0x472382(0x177)],pluginData=$plugins[_0x472382(0x1b4)](function(_0x50ae02){const _0x15f3dc=_0x472382;return _0x50ae02[_0x15f3dc(0x161)]&&_0x50ae02['description'][_0x15f3dc(0x139)]('['+label+']');})[0x0];VisuMZ[label][_0x472382(0x151)]=VisuMZ[label][_0x472382(0x151)]||{},VisuMZ[_0x472382(0x153)]=function(_0x1c633a,_0x47eb95){const _0x26bee4=_0x472382;for(const _0x2bd437 in _0x47eb95){if(_0x2bd437[_0x26bee4(0x133)](/(.*):(.*)/i)){const _0x5b5214=String(RegExp['$1']),_0x46ac6a=String(RegExp['$2'])[_0x26bee4(0x117)]()['trim']();let _0x12b00c,_0x238a9d,_0x203c02;switch(_0x46ac6a){case _0x26bee4(0x180):_0x12b00c=_0x47eb95[_0x2bd437]!==''?Number(_0x47eb95[_0x2bd437]):0x0;break;case _0x26bee4(0x18e):_0x238a9d=_0x47eb95[_0x2bd437]!==''?JSON[_0x26bee4(0x1ba)](_0x47eb95[_0x2bd437]):[],_0x12b00c=_0x238a9d['map'](_0x38d564=>Number(_0x38d564));break;case _0x26bee4(0x131):_0x12b00c=_0x47eb95[_0x2bd437]!==''?eval(_0x47eb95[_0x2bd437]):null;break;case'ARRAYEVAL':_0x238a9d=_0x47eb95[_0x2bd437]!==''?JSON[_0x26bee4(0x1ba)](_0x47eb95[_0x2bd437]):[],_0x12b00c=_0x238a9d['map'](_0x36ab46=>eval(_0x36ab46));break;case'JSON':_0x12b00c=_0x47eb95[_0x2bd437]!==''?JSON[_0x26bee4(0x1ba)](_0x47eb95[_0x2bd437]):'';break;case _0x26bee4(0x16a):_0x238a9d=_0x47eb95[_0x2bd437]!==''?JSON[_0x26bee4(0x1ba)](_0x47eb95[_0x2bd437]):[],_0x12b00c=_0x238a9d[_0x26bee4(0x1cc)](_0x531aec=>JSON[_0x26bee4(0x1ba)](_0x531aec));break;case _0x26bee4(0x199):_0x12b00c=_0x47eb95[_0x2bd437]!==''?new Function(JSON[_0x26bee4(0x1ba)](_0x47eb95[_0x2bd437])):new Function(_0x26bee4(0x15f));break;case _0x26bee4(0x147):_0x238a9d=_0x47eb95[_0x2bd437]!==''?JSON[_0x26bee4(0x1ba)](_0x47eb95[_0x2bd437]):[],_0x12b00c=_0x238a9d[_0x26bee4(0x1cc)](_0x403622=>new Function(JSON[_0x26bee4(0x1ba)](_0x403622)));break;case'STR':_0x12b00c=_0x47eb95[_0x2bd437]!==''?String(_0x47eb95[_0x2bd437]):'';break;case'ARRAYSTR':_0x238a9d=_0x47eb95[_0x2bd437]!==''?JSON['parse'](_0x47eb95[_0x2bd437]):[],_0x12b00c=_0x238a9d[_0x26bee4(0x1cc)](_0x4cac64=>String(_0x4cac64));break;case _0x26bee4(0x141):_0x203c02=_0x47eb95[_0x2bd437]!==''?JSON[_0x26bee4(0x1ba)](_0x47eb95[_0x2bd437]):{},_0x12b00c=VisuMZ[_0x26bee4(0x153)]({},_0x203c02);break;case _0x26bee4(0x185):_0x238a9d=_0x47eb95[_0x2bd437]!==''?JSON['parse'](_0x47eb95[_0x2bd437]):[],_0x12b00c=_0x238a9d[_0x26bee4(0x1cc)](_0x2b91f3=>VisuMZ[_0x26bee4(0x153)]({},JSON[_0x26bee4(0x1ba)](_0x2b91f3)));break;default:continue;}_0x1c633a[_0x5b5214]=_0x12b00c;}}return _0x1c633a;},(_0x1184bc=>{const _0x15e581=_0x472382,_0x4c4086=_0x1184bc[_0x15e581(0x1b1)];for(const _0x1bf8d4 of dependencies){if(!Imported[_0x1bf8d4]){if(_0x15e581(0x171)===_0x15e581(0x111))this[_0x15e581(0x11e)](),this['setupNewGame'](),this[_0x15e581(0x1c7)](),this[_0x15e581(0x14d)]();else{alert(_0x15e581(0x1ab)[_0x15e581(0x1bc)](_0x4c4086,_0x1bf8d4)),SceneManager['exit']();break;}}}const _0x4813ae=_0x1184bc[_0x15e581(0x17c)];if(_0x4813ae['match'](/\[Version[ ](.*?)\]/i)){const _0x1579f2=Number(RegExp['$1']);if(_0x1579f2!==VisuMZ[label][_0x15e581(0x159)]){if(_0x15e581(0x192)!==_0x15e581(0x192)){var _0x3a23b1=_0x54fa9c[_0x15e581(0x148)](_0x5d7b69);_0x3a23b1&&(_0x3a23b1=this[_0x15e581(0x15e)](_0x3a23b1,_0x2b121e),_0x3a23b1['newGamePlusRefresh']());}else alert(_0x15e581(0x1a4)[_0x15e581(0x1bc)](_0x4c4086,_0x1579f2)),SceneManager[_0x15e581(0x195)]();}}if(_0x4813ae[_0x15e581(0x133)](/\[Tier[ ](\d+)\]/i)){if('FWLIe'!==_0x15e581(0x1d0)){const _0x3537dd=Number(RegExp['$1']);_0x3537dd<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x4c4086,_0x3537dd,tier)),SceneManager['exit']()):tier=Math[_0x15e581(0x116)](_0x3537dd,tier);}else _0x4c6131=_0x25b428[_0x15e581(0x116)](_0x4ff015,_0x441e47);}VisuMZ['ConvertParams'](VisuMZ[label][_0x15e581(0x151)],_0x1184bc['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x472382(0x1b1)],_0x472382(0x114),_0x25e53d=>{const _0x196049=_0x472382;if(!SceneManager[_0x196049(0x14e)]())return;SceneManager[_0x196049(0x11d)](Scene_SaveNewGamePlus);}),PluginManager[_0x472382(0x16b)](pluginData[_0x472382(0x1b1)],_0x472382(0x134),_0x76d07a=>{const _0x51d16e=_0x472382;if(!SceneManager[_0x51d16e(0x14e)]())return;SceneManager[_0x51d16e(0x11d)](Scene_NewGamePlusTransition);}),DataManager[_0x472382(0x174)]=function(_0x41ea65){const _0x4c1489=_0x472382;if(!_0x41ea65)return![];if(_0x41ea65['note'][_0x4c1489(0x133)](/<NO NEW GAME\+ CARRY OVER>/i))return![];return!![];},VisuMZ[_0x472382(0x1a9)]['DataManager_makeSavefileInfo']=DataManager[_0x472382(0x1cf)],DataManager[_0x472382(0x1cf)]=function(){const _0x2de77a=_0x472382;var _0x247833=VisuMZ[_0x2de77a(0x1a9)][_0x2de77a(0x1b5)]['call'](this);return _0x247833[_0x2de77a(0x168)]=$gameSystem[_0x2de77a(0x12a)](),_0x247833;},DataManager[_0x472382(0x146)]=function(){const _0x4b7fa9=_0x472382;this[_0x4b7fa9(0x11e)](),this[_0x4b7fa9(0x15c)](),this[_0x4b7fa9(0x1c7)](),this[_0x4b7fa9(0x14d)]();},DataManager[_0x472382(0x11e)]=function(){const _0x2df7ec=_0x472382;var _0x1221a3=$gameActors[_0x2df7ec(0x17d)][_0x2df7ec(0x15b)];for(var _0x3bdae0=0x0;_0x3bdae0<_0x1221a3;++_0x3bdae0){var _0x244ba8=$gameActors['_data'][_0x3bdae0];if(_0x244ba8)_0x244ba8[_0x2df7ec(0x158)]();}this['_ngpData']={'switches':JsonEx[_0x2df7ec(0x11b)]($gameSwitches[_0x2df7ec(0x17d)]),'variables':JsonEx['makeDeepCopy']($gameVariables[_0x2df7ec(0x17d)]),'loops':$gameSystem[_0x2df7ec(0x118)](),'playtime':$gameSystem[_0x2df7ec(0x189)],'savecount':$gameSystem[_0x2df7ec(0x1c8)](),'stepcount':$gameParty[_0x2df7ec(0x1af)](),'battlecount':$gameSystem[_0x2df7ec(0x1b3)],'victorycount':$gameSystem[_0x2df7ec(0x19f)],'escapecount':$gameSystem[_0x2df7ec(0x19a)],'actors':JsonEx[_0x2df7ec(0x11b)]($gameActors[_0x2df7ec(0x17d)]),'gold':$gameParty[_0x2df7ec(0x155)],'items':JsonEx[_0x2df7ec(0x11b)]($gameParty[_0x2df7ec(0x16c)]),'weapons':JsonEx[_0x2df7ec(0x11b)]($gameParty['_weapons']),'armors':JsonEx['makeDeepCopy']($gameParty['_armors'])};},DataManager[_0x472382(0x1c7)]=function(){const _0x9d7506=_0x472382;this[_0x9d7506(0x1b7)](),this[_0x9d7506(0x1de)](),this['carryOverNewGamePlusSystemData'](),this['carryOverNewGamePlusActors'](),this[_0x9d7506(0x1a3)]();},DataManager[_0x472382(0x1b7)]=function(){const _0x389970=_0x472382;for(const _0x39ba52 of VisuMZ[_0x389970(0x1a9)]['Settings'][_0x389970(0x12d)]){if(_0x39ba52<=0x0)continue;$gameSwitches[_0x389970(0x18b)](_0x39ba52,this[_0x389970(0x154)][_0x389970(0x143)][_0x39ba52]);}},DataManager['carryOverNewGamePlusVariables']=function(){const _0x2ffbdf=_0x472382;for(const _0x5047dd of VisuMZ[_0x2ffbdf(0x1a9)][_0x2ffbdf(0x151)][_0x2ffbdf(0x149)]){if(_0x5047dd<=0x0)continue;$gameVariables[_0x2ffbdf(0x18b)](_0x5047dd,this[_0x2ffbdf(0x154)]['variables'][_0x5047dd]);}},DataManager['carryOverNewGamePlusSystemData']=function(){const _0x3642bf=_0x472382,_0x51e4ca=VisuMZ[_0x3642bf(0x1a9)][_0x3642bf(0x151)][_0x3642bf(0x14b)];$gameSystem[_0x3642bf(0x145)](this[_0x3642bf(0x154)][_0x3642bf(0x194)]+0x1),$gameSystem[_0x3642bf(0x137)](!![]);_0x51e4ca[_0x3642bf(0x1a6)]&&(_0x3642bf(0x186)!==_0x3642bf(0x12e)?($gameSystem[_0x3642bf(0x189)]=this['_ngpData'][_0x3642bf(0x1a7)],Graphics[_0x3642bf(0x18f)]=this[_0x3642bf(0x154)][_0x3642bf(0x1a7)]):(this[_0x3642bf(0x1b7)](),this[_0x3642bf(0x1de)](),this[_0x3642bf(0x1b2)](),this[_0x3642bf(0x16d)](),this['carryOverNewGamePlusPartyData']()));_0x51e4ca[_0x3642bf(0x170)]&&(_0x3642bf(0x187)===_0x3642bf(0x187)?$gameSystem[_0x3642bf(0x172)]=this[_0x3642bf(0x154)][_0x3642bf(0x1c2)]:_0x580859['prototype'][_0x3642bf(0x13d)][_0x3642bf(0x162)](this));_0x51e4ca[_0x3642bf(0x1ac)]&&(_0x3642bf(0x1ad)==='OthGQ'?$gameParty[_0x3642bf(0x160)]=this[_0x3642bf(0x154)][_0x3642bf(0x1c9)]:_0x4f98d2[_0x3642bf(0x1a9)]['Window_SavefileList_drawTitle'][_0x3642bf(0x162)](this,_0x1eccea,_0x47a339,_0x79a536));_0x51e4ca[_0x3642bf(0x1d3)]&&($gameSystem['_battleCount']=this[_0x3642bf(0x154)]['battlecount']);_0x51e4ca[_0x3642bf(0x1be)]&&($gameSystem['_winCount']=this[_0x3642bf(0x154)][_0x3642bf(0x13f)]);if(_0x51e4ca['EscapeCount']){if(_0x3642bf(0x16f)===_0x3642bf(0x16f))$gameSystem[_0x3642bf(0x19a)]=this[_0x3642bf(0x154)][_0x3642bf(0x1db)];else return this[_0x3642bf(0x19c)]&&this['_scene']['constructor']===_0x3323ea;}},DataManager[_0x472382(0x16d)]=function(){const _0x43f27d=_0x472382;var _0x287a31=$gameActors['_data'][_0x43f27d(0x15b)];for(var _0xe2af20=0x0;_0xe2af20<_0x287a31;++_0xe2af20){if(_0x43f27d(0x1b6)===_0x43f27d(0x1b6)){var _0x1ba749=$gameActors[_0x43f27d(0x148)](_0xe2af20);_0x1ba749&&(_0x1ba749=this['copyNewGamePlusActorData'](_0x1ba749,_0xe2af20),_0x1ba749[_0x43f27d(0x167)]());}else _0x1886a3[_0x43f27d(0x1cb)]=_0x53ad6f[_0x43f27d(0x11b)](this['_ngpData']['actors'][_0x154cea][_0x43f27d(0x1cb)]);}},DataManager[_0x472382(0x15e)]=function(_0x51bc06,_0x40b72b){const _0x4b0857=_0x472382;if(!DataManager['canNewGamePlusCarryOver'](_0x51bc06[_0x4b0857(0x148)]()))return _0x51bc06;if(!this[_0x4b0857(0x154)][_0x4b0857(0x128)][_0x40b72b])return _0x51bc06;const _0x113656=VisuMZ[_0x4b0857(0x1a9)]['Settings'][_0x4b0857(0x182)];_0x113656[_0x4b0857(0x120)]&&this[_0x4b0857(0x154)]['actors'][_0x40b72b]&&($gameActors[_0x4b0857(0x17d)][_0x40b72b]=JsonEx[_0x4b0857(0x11b)](this[_0x4b0857(0x154)][_0x4b0857(0x128)][_0x40b72b]),_0x51bc06=$gameActors[_0x4b0857(0x17d)][_0x40b72b]);_0x113656[_0x4b0857(0x115)]&&this[_0x4b0857(0x154)][_0x4b0857(0x128)][_0x40b72b][_0x4b0857(0x1c4)]?(_0x51bc06[_0x4b0857(0x1c4)]=JsonEx[_0x4b0857(0x11b)](this['_ngpData'][_0x4b0857(0x128)][_0x40b72b][_0x4b0857(0x1c4)]),_0x51bc06[_0x4b0857(0x129)]()):(_0x51bc06['_level']=_0x51bc06['actor']()[_0x4b0857(0x12b)],_0x51bc06[_0x4b0857(0x1c4)]={},_0x51bc06[_0x4b0857(0x1c0)]());if(_0x113656['Skills']&&this[_0x4b0857(0x154)][_0x4b0857(0x128)][_0x40b72b][_0x4b0857(0x127)])_0x51bc06[_0x4b0857(0x127)]=JsonEx['makeDeepCopy'](this[_0x4b0857(0x154)]['actors'][_0x40b72b][_0x4b0857(0x127)]);else{if('KDOBE'===_0x4b0857(0x122)){if(_0x1aa3c===0x0)return;const _0x31627e=this[_0x4b0857(0x135)](_0x5525e7),_0x14a08a=_0x8cb4['fileNewGamePlus'][_0x4b0857(0x1bc)](_0x17a975);this['changeTextColor'](_0x106463['newGamePlusTitle']()),this[_0x4b0857(0x190)](_0x14a08a,_0x5d4570,_0x21d4c7,_0x405d2f['max'](0xb4,_0x31627e['width']-0xb4));}else _0x51bc06[_0x4b0857(0x1ae)]();}Imported['VisuMZ_2_SkillLearnSystem']&&(_0x4b0857(0x1a1)===_0x4b0857(0x1a1)?(_0x113656[_0x4b0857(0x1d8)]&&this[_0x4b0857(0x154)][_0x4b0857(0x128)][_0x40b72b][_0x4b0857(0x1cb)]?_0x51bc06[_0x4b0857(0x1cb)]=JsonEx[_0x4b0857(0x11b)](this[_0x4b0857(0x154)][_0x4b0857(0x128)][_0x40b72b]['_abilityPoints']):(_0x51bc06['initAbilityPoints'](),_0x51bc06[_0x4b0857(0x11f)]()),_0x113656[_0x4b0857(0x15d)]&&this[_0x4b0857(0x154)][_0x4b0857(0x128)][_0x40b72b][_0x4b0857(0x18c)]?_0x51bc06[_0x4b0857(0x18c)]=JsonEx[_0x4b0857(0x11b)](this['_ngpData'][_0x4b0857(0x128)][_0x40b72b][_0x4b0857(0x18c)]):(_0x51bc06['initSkillPoints'](),_0x51bc06['gainStartingSkillPoints']())):_0x13fa67[_0x4b0857(0x16c)]=this[_0x4b0857(0x154)][_0x4b0857(0x16e)]);if(Imported[_0x4b0857(0x14c)]){if('kqbWn'!==_0x4b0857(0x196)){_0x113656['ClassPoints']&&this['_ngpData']['actors'][_0x40b72b]['_classPoints']?_0x4b0857(0x1ce)==='DUQnC'?this[_0x4b0857(0x132)](_0x54101e)?this[_0x4b0857(0x1d5)](_0x552487,_0x462d26,_0x1f24bb):_0x9c49bd[_0x4b0857(0x1a9)][_0x4b0857(0x136)][_0x4b0857(0x162)](this,_0x146ec1,_0x594cf3,_0x5c4464):_0x51bc06[_0x4b0857(0x119)]=JsonEx[_0x4b0857(0x11b)](this['_ngpData'][_0x4b0857(0x128)][_0x40b72b][_0x4b0857(0x119)]):_0x4b0857(0x181)!==_0x4b0857(0x181)?(_0x4908a6[_0x4b0857(0x165)](),_0x4e0254[_0x4b0857(0x18a)]()):(_0x51bc06[_0x4b0857(0x165)](),_0x51bc06[_0x4b0857(0x18a)]());if(_0x113656[_0x4b0857(0x121)]&&this[_0x4b0857(0x154)]['actors'][_0x40b72b][_0x4b0857(0x1aa)]){if(_0x4b0857(0x175)!==_0x4b0857(0x123))_0x51bc06[_0x4b0857(0x1aa)]=JsonEx[_0x4b0857(0x11b)](this[_0x4b0857(0x154)][_0x4b0857(0x128)][_0x40b72b]['_jobPoints']);else return _0x34fda2['isSceneNewGamePlus']();}else _0x51bc06[_0x4b0857(0x13a)](),_0x51bc06[_0x4b0857(0x1b8)]();}else _0x27be9d['_level']=_0x5efe3f[_0x4b0857(0x148)]()[_0x4b0857(0x12b)],_0x45d288[_0x4b0857(0x1c4)]={},_0x2809e7['initExp']();}return _0x51bc06;},DataManager['carryOverNewGamePlusPartyData']=function(){const _0x3bb361=_0x472382,_0x16c162=VisuMZ[_0x3bb361(0x1a9)][_0x3bb361(0x151)][_0x3bb361(0x130)];_0x16c162[_0x3bb361(0x1c6)]&&($gameParty['_gold']=this[_0x3bb361(0x154)][_0x3bb361(0x178)]);if(_0x16c162[_0x3bb361(0x1d1)]){if(_0x3bb361(0x1d6)===_0x3bb361(0x19e)){if(this[_0x3bb361(0x150)]===_0x2e3c9f)this['initNewGamePlusSettings']();this['_newGamePlusLoaded']=_0x5a82b5;}else $gameParty[_0x3bb361(0x16c)]=this['_ngpData']['items'];}_0x16c162['Weapons']&&($gameParty['_weapons']=this[_0x3bb361(0x154)][_0x3bb361(0x1b0)]),_0x16c162['Armors']&&($gameParty[_0x3bb361(0x19d)]=this[_0x3bb361(0x154)][_0x3bb361(0x1d7)]),$gameParty[_0x3bb361(0x176)]();},DataManager[_0x472382(0x14d)]=function(){const _0x3b890c=_0x472382,_0x3cf4e7=VisuMZ[_0x3b890c(0x1a9)][_0x3b890c(0x151)],_0x586365=_0x3cf4e7[_0x3b890c(0x13b)];if(_0x586365<=0x0)return;$gameTemp['reserveCommonEvent'](_0x586365);},TextManager[_0x472382(0x12f)]=VisuMZ[_0x472382(0x1a9)][_0x472382(0x151)]['SceneSave'][_0x472382(0x1c1)],TextManager[_0x472382(0x18d)]=VisuMZ[_0x472382(0x1a9)][_0x472382(0x151)][_0x472382(0x11a)][_0x472382(0x152)],ColorManager[_0x472382(0x163)]=function(_0x5deb2a){const _0x52eb9b=_0x472382;return _0x5deb2a=String(_0x5deb2a),_0x5deb2a[_0x52eb9b(0x133)](/#(.*)/i)?_0x52eb9b(0x1dd)[_0x52eb9b(0x1bc)](String(RegExp['$1'])):this['textColor'](Number(_0x5deb2a));},ColorManager[_0x472382(0x173)]=function(){const _0x3257ac=_0x472382;return ColorManager[_0x3257ac(0x163)](VisuMZ[_0x3257ac(0x1a9)][_0x3257ac(0x151)]['SceneSave'][_0x3257ac(0x164)]);},SceneManager[_0x472382(0x14e)]=function(){const _0x3cb13=_0x472382;return this['_scene']&&this[_0x3cb13(0x19c)][_0x3cb13(0x1bd)]===Scene_Map;},SceneManager['isSceneNewGamePlus']=function(){const _0x2c1fa4=_0x472382;return this['_scene']&&this[_0x2c1fa4(0x19c)][_0x2c1fa4(0x1bd)]===Scene_SaveNewGamePlus;},VisuMZ[_0x472382(0x1a9)][_0x472382(0x13c)]=Game_System[_0x472382(0x1d9)][_0x472382(0x13d)],Game_System[_0x472382(0x1d9)][_0x472382(0x13d)]=function(){const _0x52c007=_0x472382;VisuMZ[_0x52c007(0x1a9)][_0x52c007(0x13c)][_0x52c007(0x162)](this),this[_0x52c007(0x1da)]();},Game_System[_0x472382(0x1d9)][_0x472382(0x1da)]=function(){const _0x4ef810=_0x472382;this[_0x4ef810(0x179)]=![],this[_0x4ef810(0x144)]=0x0,this[_0x4ef810(0x150)]=![];},Game_System[_0x472382(0x1d9)][_0x472382(0x12a)]=function(){return SceneManager['isSceneNewGamePlus']();},Game_System['prototype']['getNewGamePlusLoops']=function(){const _0x1d064c=_0x472382;if(this[_0x1d064c(0x144)]===undefined)this['initNewGamePlusSettings']();return this['_newGamePlusLoops'];},Game_System['prototype'][_0x472382(0x145)]=function(_0x189a3a){const _0x1dae68=_0x472382;if(this['_newGamePlusLoops']===undefined)this[_0x1dae68(0x1da)]();this['_newGamePlusLoops']=_0x189a3a;},Game_System['prototype'][_0x472382(0x13e)]=function(){const _0x549466=_0x472382;if(this[_0x549466(0x150)]===undefined)this['initNewGamePlusSettings']();return this[_0x549466(0x150)];},Game_System[_0x472382(0x1d9)][_0x472382(0x137)]=function(_0x5d9b75){const _0x5a5d14=_0x472382;if(this[_0x5a5d14(0x150)]===undefined)this[_0x5a5d14(0x1da)]();this[_0x5a5d14(0x150)]=_0x5d9b75;},Game_Actor[_0x472382(0x1d9)][_0x472382(0x129)]=function(){const _0xce70c7=_0x472382;while(!this['isMaxLevel']()&&this[_0xce70c7(0x138)]()>=this[_0xce70c7(0x1c5)]()){this[_0xce70c7(0x156)]();}while(this[_0xce70c7(0x138)]()<this[_0xce70c7(0x1d2)]()){this['levelDown']();}},Game_Actor[_0x472382(0x1d9)]['newGamePlusRefresh']=function(){const _0x31f2df=_0x472382,_0x35cb84=this['actor']();this[_0x31f2df(0x198)]=_0x35cb84[_0x31f2df(0x191)],this['initEquips'](_0x35cb84[_0x31f2df(0x14a)]),this[_0x31f2df(0x11c)](),this[_0x31f2df(0x188)]();},Game_Party[_0x472382(0x1d9)][_0x472382(0x176)]=function(){const _0x375966=_0x472382;var _0x54ec01=$gameParty[_0x375966(0x142)](),_0x5c812e=_0x54ec01['length'];for(var _0x47f996=0x0;_0x47f996<_0x5c812e;++_0x47f996){var _0x5b43fc=_0x54ec01[_0x47f996];if(!_0x5b43fc)continue;if(DataManager[_0x375966(0x174)](_0x5b43fc))continue;var _0x3dcd73=$gameParty[_0x375966(0x1d4)](_0x5b43fc);$gameParty[_0x375966(0x1a8)](_0x5b43fc,_0x3dcd73);}},VisuMZ[_0x472382(0x1a9)][_0x472382(0x15a)]=Scene_Map[_0x472382(0x1d9)][_0x472382(0x14f)],Scene_Map[_0x472382(0x1d9)][_0x472382(0x14f)]=function(){const _0x41e936=_0x472382;if(SceneManager[_0x41e936(0x166)](Scene_NewGamePlusTransition))return!![];return VisuMZ['NewGamePlus'][_0x41e936(0x15a)][_0x41e936(0x162)](this);},VisuMZ[_0x472382(0x1a9)]['Scene_Load_onLoadSuccess']=Scene_Load[_0x472382(0x1d9)]['onLoadSuccess'],Scene_Load[_0x472382(0x1d9)][_0x472382(0x169)]=function(){const _0x50257c=_0x472382;this[_0x50257c(0x1bb)]&&this[_0x50257c(0x1bb)]['isNewGamePlus'](this[_0x50257c(0x1bb)][_0x50257c(0x1a0)]())?_0x50257c(0x112)!=='UlKlk'?this[_0x50257c(0x146)]():(_0x5168a2['_framesOnSave']=this[_0x50257c(0x154)]['playtime'],_0x272c95[_0x50257c(0x18f)]=this[_0x50257c(0x154)]['playtime']):VisuMZ['NewGamePlus'][_0x50257c(0x157)][_0x50257c(0x162)](this);},Scene_Load['prototype'][_0x472382(0x146)]=function(){const _0x2ecc5d=_0x472382;SoundManager['playLoad'](),DataManager[_0x2ecc5d(0x146)](),this['fadeOutAll'](),SceneManager[_0x2ecc5d(0x1a5)](Scene_Map);};function Scene_SaveNewGamePlus(){const _0x3817ea=_0x472382;this[_0x3817ea(0x13d)](...arguments);}Scene_SaveNewGamePlus[_0x472382(0x1d9)]=Object['create'](Scene_Save['prototype']),Scene_SaveNewGamePlus[_0x472382(0x1d9)]['constructor']=Scene_SaveNewGamePlus,Scene_SaveNewGamePlus[_0x472382(0x1d9)][_0x472382(0x113)]=function(){const _0x1dcc9d=_0x472382;return TextManager[_0x1dcc9d(0x18d)];};function Scene_NewGamePlusTransition(){this['initialize'](...arguments);}Scene_NewGamePlusTransition['prototype']=Object[_0x472382(0x193)](Scene_Base[_0x472382(0x1d9)]),Scene_NewGamePlusTransition[_0x472382(0x1d9)][_0x472382(0x1bd)]=Scene_NewGamePlusTransition,Scene_NewGamePlusTransition['prototype'][_0x472382(0x13d)]=function(){const _0x34aa5b=_0x472382;Scene_Base[_0x34aa5b(0x1d9)][_0x34aa5b(0x13d)][_0x34aa5b(0x162)](this);},Scene_NewGamePlusTransition['prototype'][_0x472382(0x1cd)]=function(){const _0xf6e185=_0x472382;DataManager['startNewGamePlus'](),SceneManager[_0xf6e185(0x1a5)](Scene_Map);},Window_SavefileList['prototype']['isNewGamePlus']=function(_0x1ee033){const _0x5894a3=_0x472382;if(_0x1ee033===0x0)return![];const _0x3567bc=DataManager[_0x5894a3(0x1c3)](_0x1ee033);return _0x3567bc&&_0x3567bc[_0x5894a3(0x168)];},VisuMZ[_0x472382(0x1a9)][_0x472382(0x136)]=Window_SavefileList[_0x472382(0x1d9)][_0x472382(0x110)],Window_SavefileList['prototype'][_0x472382(0x110)]=function(_0x44f9f5,_0x43b76a,_0x264f30){const _0x26a7b6=_0x472382;this[_0x26a7b6(0x132)](_0x44f9f5)?_0x26a7b6(0x126)!==_0x26a7b6(0x17e)?this[_0x26a7b6(0x1d5)](_0x44f9f5,_0x43b76a,_0x264f30):(_0x32c19f(_0x26a7b6(0x1dc)[_0x26a7b6(0x1bc)](_0x4ac6e3,_0x520782,_0x2cd8c4)),_0x2e2a8d['exit']()):_0x26a7b6(0x1a2)!==_0x26a7b6(0x1a2)?_0x57c3b6[_0x26a7b6(0x18c)]=_0x323010['makeDeepCopy'](this['_ngpData'][_0x26a7b6(0x128)][_0x5dde95][_0x26a7b6(0x18c)]):VisuMZ[_0x26a7b6(0x1a9)][_0x26a7b6(0x136)]['call'](this,_0x44f9f5,_0x43b76a,_0x264f30);},Window_SavefileList[_0x472382(0x1d9)][_0x472382(0x1d5)]=function(_0x55b7cf,_0x1b6aab,_0x352510){const _0x3eb929=_0x472382;if(_0x55b7cf===0x0)return;const _0x4d7e3e=this[_0x3eb929(0x135)](_0x55b7cf),_0xdf67f6=TextManager[_0x3eb929(0x12f)][_0x3eb929(0x1bc)](_0x55b7cf);this[_0x3eb929(0x183)](ColorManager['newGamePlusTitle']()),this[_0x3eb929(0x190)](_0xdf67f6,_0x1b6aab,_0x352510,Math[_0x3eb929(0x116)](0xb4,_0x4d7e3e[_0x3eb929(0x19b)]-0xb4));};
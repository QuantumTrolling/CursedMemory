//=============================================================================
// VisuStella MZ - Chain Battles
// VisuMZ_3_ChainBattles.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_ChainBattles = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ChainBattles = VisuMZ.ChainBattles || {};
VisuMZ.ChainBattles.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.02] [ChainBattles]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Chain_Battles_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Ever wanted to have a continuous stream of battles without the victory
 * sequence appearing until the very end? The Chain Battles plugin will allow
 * RPG Maker MZ to do just that. As the player's party progresses forward, they
 * maintain their states, buffs, and debuffs. The such effects will keep their
 * stacks and turns. Chain Battles will make creating a marathon of battles
 * a possibility.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Queue up battles to be chained one after the other. This can be done in or
 *   out of battle. An unlimited amount of battles can be chained.
 * * Chained battles can be randomized across a pool of Troop ID's, based off
 *   the random encounter pool, or calculated through JavaScript.
 * * Battlebacks can be changed as chain battles continue to give a scenary
 *   change and a sense of progression.
 * * Any states, buffs, and/or debuffs that are applied to battlers as they
 *   transition from one battle to another will be carried over with their
 *   turn durations intact.
 * * Battle rewards such as EXP, Gold, and Drop Rates can be affected by the
 *   total number of chain battles, increasing the overall multiplier (or
 *   decreasing it if you so wish).
 * * Queue up Common Events to run upon the next victory condition! These
 *   Common Events will run each time the victory conditions are achieved and
 *   before the next battle is chained.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
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
 * Chain Battle Carry Over
 * ============================================================================
 *
 * The following section will explain what happens whenever chain battles
 * occur and describe exactly what is carried over.
 *
 * ---
 *
 * HP, MP, and TP
 * 
 * HP and MP, by default, are static across battles and will not reset
 * themselves at the start of each chained battle.
 * 
 * TP, however, will depend. If TP is preserved, then the TP values will be
 * maintained as chain battles progress. If TP is not preserved, then, by
 * default, the battler will gain a random amount of TP at the start of each
 * chained battle.
 *
 * ---
 * 
 * Turn Count
 * 
 * When chaining into the next battle, the turn count will be preserved and
 * then increased by 1. This means if you end the first battle at Turn 10, then
 * you will start the second battle at Turn 11. This applies to TPB battle
 * systems as well.
 * 
 * ---
 * 
 * Troop Event Page Span
 * 
 * If a troop event page's span is set to "battle", it will be reset at the
 * start of each chain battle. This means even if you are utilizing the same
 * conditions as before for the same page, the same page's span will be reset.
 * 
 * ---
 * 
 * Next Victory
 * 
 * You can setup certain Common Events to run upon achieving Victory but before
 * the battle ends or moves onto the next chain. These are achieved through the
 * new Plugin Commands added through this plugin. If multiple Common Events are
 * queued, then all of them will run before the next victory phase.
 * 
 * If enemies revive in the middle of the Common Event queue, the queue is
 * paused and resumed after the enemies are defeated once again.
 * 
 * For example:
 * 
 * 1. Common Events A, B, C, D, E are queued.
 * 2. Enemies are set to revive on Common Event B.
 * 3. When the player achieves battle victory, Common Events A and B run.
 * 4. The enemies will revive.
 * 5. The player has to defeat the enemies again.
 * 6. Once the enemies are defeated, Common Events C, D, and E then run.
 * 7. Afterwards, any chain battles will occur.
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
 * This plugin offers bonus reward multipliers for the Class Change System's
 * CP and JP resource points earned from battle.
 * 
 * ---
 * 
 * VisuMZ_2_SkillLearnSystem
 * 
 * This plugin offers bonus reward multipliers for the Skill Learn System's
 * AP and SP resource points earned from battle.
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
 * VisuMZ_4_ExtraEnemyDrops
 * 
 * Extra Rewards will be carried over into subsequently chained battles instead
 * of being cleared. However, Forced Rewards will still overwrite everything.
 * Keep this in mind as you use these Extra Enemy Drops Plugin Commands.
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
 * === Chain Battle Plugin Commands ===
 * 
 * ---
 *
 * Chain Battle: Queue Troop ID(s)
 * - Setup the next Troop ID as a part of a chain battle.
 * - If there are multiple, one will be randomly picked.
 *
 *   Troop ID(s):
 *   - Select which Troop ID(s) to register as the next potential battle.
 *
 *   Change Battleback?:
 *   - Change the battlebacks for this queued battle?
 *
 *     Battleback 1:
 *     Battleback 2:
 *     - Filename used for the battleback image.
 *     - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * Chain Battle: Queue Encounter Pool
 * - Setup the next battle from the random encounter pool.
 * - If there are multiple, one will be randomly picked.
 *
 *   Change Battleback?:
 *   - Change the battlebacks for this queued battle?
 *
 *     Battleback 1:
 *     Battleback 2:
 *     - Filename used for the battleback image.
 *     - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * Chain Battle: Queue JavaScript ID
 * - Use JavaScript to determine which Troop ID to queue up for a chain battle.
 *
 *   JS: Troop ID:
 *   - Use JavaScript code to determine what Troop ID to queue up for a
 *     chain battle.
 *
 *   Change Battleback?:
 *   - Change the battlebacks for this queued battle?
 *
 *     Battleback 1:
 *     Battleback 2:
 *     - Filename used for the battleback image.
 *     - Leave empty if you don't wish to use one.
 *
 * ---
 * 
 * Chain Battle: Clear Chains
 * - Clears any stored Chain Battles, allowing the battle to end after
 * the current one.
 * 
 * ---
 * 
 * === Next Victory Common Events ===
 * 
 * ---
 * 
 * Next Victory: Queue Common Event
 * - Queue a Common Event(s) to run next victory.
 * - If multiple, Common Events run in queued order.
 * - The Common Events will run before the next queued chain battle.
 * 
 *   Common Event ID(s):
 *   - Select which Common Event(s) to run upon the next victory.
 *   - If multiple, Common Events run in queued order.
 * 
 *   - If enemies revive in the middle of the Common Event queue, the queue is
 *     paused and resumed after the enemies are defeated once again.
 *     - For example:
 *     - Common Events A, B, C, D, E are queued.
 *     - Enemies are set to revive on Common Event B.
 *     - When the player achieves battle victory, Common Events A and B run.
 *     - The enemies will revive.
 *     - The player has to defeat the enemies again.
 *     - Once the enemies are defeated, Common Events C, D, and E then run.
 *     - Afterwards, any chain battles will occur.
 * 
 * ---
 * 
 * Next Victory: Clear Common Event Queue
 * - Clear queued Common Event(s) for next victory.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings related to Chain Battles.
 *
 * ---
 * 
 * Animation
 * 
 *   Chain Walk Forward?:
 *   - Does player party perform walk up animation for chain battles?
 * 
 * ---
 *
 * Delay
 * 
 *   Frames:
 *   - How many frames should be delayed on average?
 * 
 *   Allow Fast Forward?:
 *   - Allow fast forwarding the delay by holding down the OK or Cancel
 *     buttons?
 *
 * ---
 *
 * Tracking
 * 
 *   Variable: Chains:
 *   - Automatically tracks total chained battles.
 *   - Insert Variable ID '0' to not use.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Reward Multipliers
 * ============================================================================
 *
 * Reward multipliers based on the number of Chain Battles in total.
 *
 * ---
 *
 * Settings
 * 
 *   Enable Multipliers?:
 *   - Enable victory reward multipliers?
 *
 * ---
 *
 * General
 * 
 *   EXP Rates:
 *   Gold Rates:
 *   Drop Rates:
 *   - What rates do you want per total chain battles?
 *   - 1.0 = 100%, 1.5 = 150%
 *
 * ---
 *
 * Compatibility > Class Change System
 * 
 *   CP Rates:
 *   JP Rates:
 *   - What rates do you want per total chain battles?
 *   - 1.0 = 100%, 1.5 = 150%
 *
 * ---
 *
 * Compatibility > Skill Learn System
 * 
 *   AP Rates:
 *   SP Rates:
 *   - What rates do you want per total chain battles?
 *   - 1.0 = 100%, 1.5 = 150%
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
 * * Olivia
 * * Arisu
 * * Irina
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.02: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated features list in Introduction.
 * ** Added "Next Victory" segment to "Chain Battle Carry Over" section.
 * *** Next Victory
 * *** You can setup certain Common Events to run upon achieving Victory but
 *     before the battle ends or moves onto the next chain. These are achieved
 *     through the new Plugin Commands added through this plugin. If multiple
 *     Common Events are queued, then all of them will run before the next
 *     victory phase.
 * *** If enemies revive in the middle of the Common Event queue, the queue is
 *     paused and resumed after the enemies are defeated once again.
 * **** Example provided inside segment.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by AndyL:
 * *** Next Victory: Queue Common Event
 * **** Queue a Common Event(s) to run next victory. If multiple, Common Events
 *      run in queued order. The Common Events will run before the next queued
 *      chain battle.
 * *** Next Victory: Clear Common Event Queue
 * **** Clear queued Common Event(s) for next victory.
 * 
 * Version 1.01: October 21, 2021
 * * Bug Fixes!
 * ** Battle win/lose branches should now carry over. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > General > Animation > Chain Walk Forward?
 * **** Does player party perform walk up animation for chain battles?
 * 
 * Version 1.00 Official Release Date: September 8, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChainBattleQueueTroop
 * @text Chain Battle: Queue Troop ID(s)
 * @desc Setup the next Troop ID as a part of a chain battle.
 * If there are multiple, one will be randomly picked.
 *
 * @arg TroopIDs:arraynum
 * @text Troop ID(s)
 * @parent Step1
 * @type troop[]
 * @desc Select which Troop ID(s) to register as the next potential battle.
 * @default ["1"]
 *
 * @arg ChangeBattleback:eval
 * @text Change Battleback?
 * @type boolean
 * @on Change
 * @off Don't Change
 * @desc Change the battlebacks for this queued battle?
 * @default false
 *
 * @arg Filename1:str
 * @text Battleback 1
 * @parent ChangeBattleback:eval
 * @type file
 * @dir img/battlebacks1/
 * @require 1
 * @desc Filename used for the battleback 1 image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @arg Filename2:str
 * @text Battleback 2
 * @parent ChangeBattleback:eval
 * @type file
 * @dir img/battlebacks2/
 * @require 1
 * @desc Filename used for the battleback 2 image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChainBattleQueueEncounter
 * @text Chain Battle: Queue Encounter Pool
 * @desc Setup the next battle from the random encounter pool.
 * If there are multiple, one will be randomly picked.
 *
 * @arg ChangeBattleback:eval
 * @text Change Battleback?
 * @type boolean
 * @on Change
 * @off Don't Change
 * @desc Change the battlebacks for this queued battle?
 * @default false
 *
 * @arg Filename1:str
 * @text Battleback 1
 * @parent ChangeBattleback:eval
 * @type file
 * @dir img/battlebacks1/
 * @require 1
 * @desc Filename used for the battleback 1 image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @arg Filename2:str
 * @text Battleback 2
 * @parent ChangeBattleback:eval
 * @type file
 * @dir img/battlebacks2/
 * @require 1
 * @desc Filename used for the battleback 2 image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChainBattleQueueJavaScript
 * @text Chain Battle: Queue JavaScript ID
 * @desc Use JavaScript to determine which Troop ID to queue
 * up for a chain battle.
 *
 * @arg calcTroopID:func
 * @text JS: Troop ID
 * @parent Step1
 * @type note
 * @desc Use JavaScript code to determine what Troop ID to queue up for a chain battle.
 * @default "// Declare Troop ID\nlet troopID = 1;\n\n// Calculations\n\n// Return Troop ID\nreturn troopID;"
 *
 * @arg ChangeBattleback:eval
 * @text Change Battleback?
 * @type boolean
 * @on Change
 * @off Don't Change
 * @desc Change the battlebacks for this queued battle?
 * @default false
 *
 * @arg Filename1:str
 * @text Battleback 1
 * @parent ChangeBattleback:eval
 * @type file
 * @dir img/battlebacks1/
 * @require 1
 * @desc Filename used for the battleback 1 image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @arg Filename2:str
 * @text Battleback 2
 * @parent ChangeBattleback:eval
 * @type file
 * @dir img/battlebacks2/
 * @require 1
 * @desc Filename used for the battleback 2 image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChainBattleClear
 * @text Chain Battle: Clear Chains
 * @desc Clears any stored Chain Battles, allowing the battle
 * to end after the current one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command NextVictoryQueueCommonEvent
 * @text Next Victory: Queue Common Event
 * @desc Queue a Common Event(s) to run next victory.
 * If multiple, Common Events run in queued order.
 *
 * @arg CommonEventIDs:arraynum
 * @text Common Event ID(s)
 * @type common_event[]
 * @desc Select which Common Event(s) to run upon the next victory.
 * If multiple, Common Events run in queued order.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command NextVictoryClearCommonEventQueue
 * @text Next Victory: Clear Common Event Queue
 * @desc Clear queued Common Event(s) for next victory.
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
 * @param ChainBattles
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings related to Chain Battles.
 * @default {"Delay":"","DelayFrames:num":"120","AllowFastFwd:eval":"true","Tracking":"","TrackTotalChainVariable:num":"0"}
 *
 * @param Multipliers:struct
 * @text Reward Multipliers
 * @type struct<Multipliers>
 * @desc Reward multipliers based on the number of Chain Battles in total.
 * @default {"Enable:eval":"true","General":"","ExpRates:arraynum":"[\"1.0\",\"1.1\",\"1.3\",\"1.6\",\"2.0\",\"3.0\"]","GoldRates:arraynum":"[\"1.0\",\"1.1\",\"1.3\",\"1.6\",\"2.0\",\"3.0\"]","DropRates:arraynum":"[\"1.0\",\"1.1\",\"1.3\",\"1.6\",\"2.0\",\"3.0\"]","Compatibility":"","ClassChange":"VisuMZ_2_ClassChangeSystem","CpRates:arraynum":"[\"1.0\",\"1.1\",\"1.3\",\"1.6\",\"2.0\",\"3.0\"]","JpRates:arraynum":"[\"1.0\",\"1.1\",\"1.3\",\"1.6\",\"2.0\",\"3.0\"]","SkillLearn":"VisuMZ_2_SkillLearnSystem","ApRates:arraynum":"[\"1.0\",\"1.1\",\"1.3\",\"1.6\",\"2.0\",\"3.0\"]","SpRates:arraynum":"[\"1.0\",\"1.1\",\"1.3\",\"1.6\",\"2.0\",\"3.0\"]"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param Animation
 *
 * @param WalkForward:eval
 * @text Chain Walk Forward?
 * @parent Animation
 * @type boolean
 * @on Walk Forward
 * @off Don't Walk
 * @desc Does player party perform walk up animation for chain battles?
 * @default true
 *
 * @param Delay
 *
 * @param DelayFrames:num
 * @text Frames
 * @parent Delay
 * @desc How many frames should be delayed on average?
 * @default 120
 *
 * @param AllowFastFwd:eval
 * @text Allow Fast Forward?
 * @parent Delay
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow fast forwarding the delay by holding down the OK or Cancel buttons?
 * @default true
 *
 * @param Tracking
 *
 * @param TrackTotalChainVariable:num
 * @text Variable: Chains
 * @parent Tracking
 * @type variable
 * @desc Automatically tracks total chained battles.
 * Insert Variable ID '0' to not use.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Multipliers Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Multipliers:
 *
 * @param Enable:eval
 * @text Enable Multipliers?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable victory reward multipliers?
 * @default true
 * 
 * @param General
 *
 * @param ExpRates:arraynum
 * @text EXP Rates
 * @parent General
 * @type string[]
 * @desc What EXP rates do you want per total chain battles?
 * 1.0 = 100%, 1.5 = 150%
 * @default ["1.0","1.1","1.3","1.6","2.0","3.0"]
 *
 * @param GoldRates:arraynum
 * @text Gold Rates
 * @parent General
 * @type string[]
 * @desc What gold rates do you want per total chain battles?
 * 1.0 = 100%, 1.5 = 150%
 * @default ["1.0","1.1","1.3","1.6","2.0","3.0"]
 *
 * @param DropRates:arraynum
 * @text Drop Rates
 * @parent General
 * @type string[]
 * @desc What drop rates do you want per total chain battles?
 * 1.0 = 100%, 1.5 = 150%
 * @default ["1.0","1.1","1.3","1.6","2.0","3.0"]
 * 
 * @param Compatibility
 * 
 * @param ClassChange
 * @text Class Change System
 * @parent Compatibility
 * @default VisuMZ_2_ClassChangeSystem
 *
 * @param CpRates:arraynum
 * @text CP Rates
 * @parent ClassChange
 * @type string[]
 * @desc What CP rates do you want per total chain battles?
 * 1.0 = 100%, 1.5 = 150%
 * @default ["1.0","1.1","1.3","1.6","2.0","3.0"]
 *
 * @param JpRates:arraynum
 * @text JP Rates
 * @parent ClassChange
 * @type string[]
 * @desc What JP rates do you want per total chain battles?
 * 1.0 = 100%, 1.5 = 150%
 * @default ["1.0","1.1","1.3","1.6","2.0","3.0"]
 * 
 * @param SkillLearn
 * @text Skill Learn System
 * @parent Compatibility
 * @default VisuMZ_2_SkillLearnSystem
 *
 * @param ApRates:arraynum
 * @text AP Rates
 * @parent SkillLearn
 * @type string[]
 * @desc What AP rates do you want per total chain battles?
 * 1.0 = 100%, 1.5 = 150%
 * @default ["1.0","1.1","1.3","1.6","2.0","3.0"]
 *
 * @param SpRates:arraynum
 * @text SP Rates
 * @parent SkillLearn
 * @type string[]
 * @desc What SP rates do you want per total chain battles?
 * 1.0 = 100%, 1.5 = 150%
 * @default ["1.0","1.1","1.3","1.6","2.0","3.0"]
 *
 */
//=============================================================================

function _0x59a1(){const _0x23fb07=['ARRAYFUNC','DropRates','gotoChainBattle','Game_Troop_jobPointsTotal','CHAIN_BATTLE_BONUS_DROP_RATE','ceil','isTurnBased','close','updateTotalChainBattlesVariable','Game_Troop_skillPointsTotal','Filename1','dropItemRate','2403heaMII','GMYXj','_actorWindow','_partyCommandWindow','FUNC','CHAIN_BATTLE_BONUS_GOLD','onBattleEnd','debugChainBattleDeadMemberList','Game_Enemy_dropItemRate','classPointsTotal','ARRAYEVAL','format','BattleManager_update','BattleManager_checkBattleEnd','getBattleSystem','CommonEventIDs','makeDeepCopy','lOcBk','registerCommand','Multipliers','prototype','_enemyWindow','Sprite_Actor_moveToStartPositionBattleCore','reserveCommonEvent','gCuqz','ExpRates','shiftChainBattleQueue','isChainBonusEnabled','Filename2','General','_skillWindow','filter','isTpb','name','isSceneBattle','STRUCT','match','BattleManager_updateTurn','carryOverChainBattleData','MNXSY','clear','expRate','BattleCore','members','skillPointsTotal','setup','goto','Game_Troop_clear','call','RcgZB','_forcedRewards','_chainBattleVictoryCommonEvent','return\x200','mlaHX','Settings','XvTWA','LIvJS','BkYYf','getChainBattleVictoryCommonEvents','Game_Troop_expRate','CHAIN_BATTLE_BONUS_EXP','Game_Troop_goldRate','battleback2Name','battleSys','deadMembers','toUpperCase','ARRAYJSON','_scene','setupNextChainBattle','CHAIN_BATTLE_DELAY_FRAMES','shiftChainBattleVictoryCommonEvents','33224TFSGDX','ChainBattleQueueJavaScript','Sprite_Battleback_battleback2Name','_forcedBattleLayout','_canLose','clearCarryOverChainBattleDeadMembers','_chainBattleQueue','CHAIN_BATTLE_BONUS_CP','isPressed','goToBattleScene','NUM','map','JSON','length','_itemWindow','addChainBattleData','rboOi','moveToStartPositionBattleCore','_chainBattleback1','battleback1','_chainBattleTransition','includes','_carryDeadMembersFlag','parse','dHEfq','_chainBattleTotal','changeBattleback','ARRAYNUM','CHAIN_BATTLE_BONUS_ENABLE','_chainBattlebackUse','15gNhPRK','concat','parameters','4062564XrJJAx','closeChainBattleWindows','bonusRewards','8126867ghwIvu','CHAIN_BATTLE_BONUS_SP','163218ELZKml','CHAIN_BATTLE_BONUS_AP','EVAL','Game_Temp_clearForcedGameTroopSettingsCoreEngine','AllowFastFwd','battleLayout','applyForcedGameTroopSettingsCoreEngine','Enable','endBattle','setupQueuedVictoryCommonEvents','RMBfc','4591890kTvPlB','create','ConvertParams','goldRate','NMTui','status','CHAIN_BATTLE_TURN_COUNT_ADVANCE','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','randomInt','getChainBattleSettings','NextVictoryQueueCommonEvent','clearChainBattleSettings','isAnyInputWindowActive','ApRates','abilityPointsTotal','jobPointsTotal','update','CHAIN_BATTLE_BONUS_JP','_canEscape','active','JpRates','battleback1Name','shift','SetupChainBattles','_chainBattleFlag','hsQwt','_bonusRewards','675392NdHxZZ','GoldRates','euXxE','initMembers','_carryOverDeadMembers','TroopIDs','getTotalChainBattles','trim','chainBattleTotal','HoDkU','CHAIN_BATTLE_DELAY_FAST_FWD','battleback2','exit','_chainBattleDelayDuration','troopId','start','checkAbort','Game_Troop_abilityPointsTotal','ChangeBattleback','STR','Game_Unit_deadMembers','setupChainBattleSettings','constructor','checkBattleEnd','calcTroopID','WalkForward','BattleManager_endBattle','BattleManager_initMembers','isBattleTest','setupChainBattle','isPlaytest','Game_Troop_classPointsTotal','clearChainBattleData','Scene_Battle_isAnyInputWindowActive','_turnCount','YivJU','TrackTotalChainVariable','3972294QWpezs','turnCount','deactivate','BattleManager_makeRewards','updateTurn','_forcedBattleSys','unshift','push','clearChainBattleVictoryCommonEvents','ChainBattles','_actorCommandWindow','ChainBattleQueueTroop','VisuMZ_0_CoreEngine','RFmdb','setBattleTest','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_chainBattleback2','UTaNW','version','description','clearForcedGameTroopSettingsCoreEngine','SpRates','queueChainBattleVictoryCommonEvent','Style','EvYor','updateChainBattleTransition','ARRAYSTR','_tpbTurnCount','isAllDead','CHAIN_BATTLE_TOTAL_VARIABLE','_eventCallback','initialize'];_0x59a1=function(){return _0x23fb07;};return _0x59a1();}const _0x5bedc1=_0x4688;(function(_0x44c7ea,_0x37e974){const _0x4bc913=_0x4688,_0x52c120=_0x44c7ea();while(!![]){try{const _0x4f3570=-parseInt(_0x4bc913(0x86))/0x1+parseInt(_0x4bc913(0x144))/0x2*(-parseInt(_0x4bc913(0x13c))/0x3)+parseInt(_0x4bc913(0x13f))/0x4+-parseInt(_0x4bc913(0x6b))/0x5+-parseInt(_0x4bc913(0xab))/0x6+parseInt(_0x4bc913(0x142))/0x7+-parseInt(_0x4bc913(0x11e))/0x8*(-parseInt(_0x4bc913(0xd7))/0x9);if(_0x4f3570===_0x37e974)break;else _0x52c120['push'](_0x52c120['shift']());}catch(_0x484c7e){_0x52c120['push'](_0x52c120['shift']());}}}(_0x59a1,0x97c29));var label=_0x5bedc1(0xb4),tier=tier||0x0,dependencies=[_0x5bedc1(0xb7),'VisuMZ_1_BattleCore'],pluginData=$plugins[_0x5bedc1(0xf6)](function(_0x492f31){const _0x59beab=_0x5bedc1;return _0x492f31[_0x59beab(0x70)]&&_0x492f31[_0x59beab(0xbe)][_0x59beab(0x133)]('['+label+']');})[0x0];function _0x4688(_0x2091f1,_0x1203b6){const _0x59a1c4=_0x59a1();return _0x4688=function(_0x4688f0,_0x17810b){_0x4688f0=_0x4688f0-0x69;let _0x24c9bd=_0x59a1c4[_0x4688f0];return _0x24c9bd;},_0x4688(_0x2091f1,_0x1203b6);}VisuMZ[label]['Settings']=VisuMZ[label][_0x5bedc1(0x10d)]||{},VisuMZ[_0x5bedc1(0x6d)]=function(_0x348a40,_0x3ec6b8){const _0x29fd28=_0x5bedc1;for(const _0x4c1bc4 in _0x3ec6b8){if('OpUjH'==='OpUjH'){if(_0x4c1bc4[_0x29fd28(0xfb)](/(.*):(.*)/i)){const _0x73bf3b=String(RegExp['$1']),_0x1824f0=String(RegExp['$2'])[_0x29fd28(0x118)]()[_0x29fd28(0x8d)]();let _0x4c8162,_0x1fc7c9,_0x323308;switch(_0x1824f0){case _0x29fd28(0x128):_0x4c8162=_0x3ec6b8[_0x4c1bc4]!==''?Number(_0x3ec6b8[_0x4c1bc4]):0x0;break;case _0x29fd28(0x139):_0x1fc7c9=_0x3ec6b8[_0x4c1bc4]!==''?JSON[_0x29fd28(0x135)](_0x3ec6b8[_0x4c1bc4]):[],_0x4c8162=_0x1fc7c9['map'](_0x36d341=>Number(_0x36d341));break;case _0x29fd28(0x146):_0x4c8162=_0x3ec6b8[_0x4c1bc4]!==''?eval(_0x3ec6b8[_0x4c1bc4]):null;break;case _0x29fd28(0xe1):_0x1fc7c9=_0x3ec6b8[_0x4c1bc4]!==''?JSON[_0x29fd28(0x135)](_0x3ec6b8[_0x4c1bc4]):[],_0x4c8162=_0x1fc7c9[_0x29fd28(0x129)](_0x456ec8=>eval(_0x456ec8));break;case _0x29fd28(0x12a):_0x4c8162=_0x3ec6b8[_0x4c1bc4]!==''?JSON['parse'](_0x3ec6b8[_0x4c1bc4]):'';break;case _0x29fd28(0x119):_0x1fc7c9=_0x3ec6b8[_0x4c1bc4]!==''?JSON['parse'](_0x3ec6b8[_0x4c1bc4]):[],_0x4c8162=_0x1fc7c9['map'](_0x2ee38e=>JSON['parse'](_0x2ee38e));break;case _0x29fd28(0xdb):_0x4c8162=_0x3ec6b8[_0x4c1bc4]!==''?new Function(JSON['parse'](_0x3ec6b8[_0x4c1bc4])):new Function(_0x29fd28(0x10b));break;case _0x29fd28(0xcb):_0x1fc7c9=_0x3ec6b8[_0x4c1bc4]!==''?JSON[_0x29fd28(0x135)](_0x3ec6b8[_0x4c1bc4]):[],_0x4c8162=_0x1fc7c9[_0x29fd28(0x129)](_0x543ad6=>new Function(JSON[_0x29fd28(0x135)](_0x543ad6)));break;case _0x29fd28(0x99):_0x4c8162=_0x3ec6b8[_0x4c1bc4]!==''?String(_0x3ec6b8[_0x4c1bc4]):'';break;case _0x29fd28(0xc5):_0x1fc7c9=_0x3ec6b8[_0x4c1bc4]!==''?JSON[_0x29fd28(0x135)](_0x3ec6b8[_0x4c1bc4]):[],_0x4c8162=_0x1fc7c9[_0x29fd28(0x129)](_0x36ebbe=>String(_0x36ebbe));break;case _0x29fd28(0xfa):_0x323308=_0x3ec6b8[_0x4c1bc4]!==''?JSON[_0x29fd28(0x135)](_0x3ec6b8[_0x4c1bc4]):{},_0x4c8162=VisuMZ[_0x29fd28(0x6d)]({},_0x323308);break;case'ARRAYSTRUCT':_0x1fc7c9=_0x3ec6b8[_0x4c1bc4]!==''?JSON['parse'](_0x3ec6b8[_0x4c1bc4]):[],_0x4c8162=_0x1fc7c9[_0x29fd28(0x129)](_0x575f62=>VisuMZ[_0x29fd28(0x6d)]({},JSON[_0x29fd28(0x135)](_0x575f62)));break;default:continue;}_0x348a40[_0x73bf3b]=_0x4c8162;}}else{if(!this['_phase'])return![];if(!this[_0x29fd28(0x96)]()&&!_0x32db5b[_0x29fd28(0xc7)]()&&_0x18c015[_0x29fd28(0xc7)]()){if(_0x2910af[_0x29fd28(0x111)]()['length']>0x0)return this[_0x29fd28(0x69)](),![];const _0x1b54b3=_0x5a5e98['getChainBattleSettings']();if(_0x1b54b3)return this[_0x29fd28(0xa3)](),![];}return _0x361bcf[_0x29fd28(0xb4)][_0x29fd28(0xe4)][_0x29fd28(0x107)](this);}}return _0x348a40;},(_0x29f6a9=>{const _0x553d87=_0x5bedc1,_0x482456=_0x29f6a9['name'];for(const _0x13c634 of dependencies){if('YivJU'===_0x553d87(0xa9)){if(!Imported[_0x13c634]){if(_0x553d87(0xe8)!=='UklNE'){alert(_0x553d87(0x72)[_0x553d87(0xe2)](_0x482456,_0x13c634)),SceneManager['exit']();break;}else _0x3f7854=_0x167bea['_troopId'];}}else _0x33d103[_0x553d87(0xb3)]();}const _0x16b299=_0x29f6a9[_0x553d87(0xbe)];if(_0x16b299[_0x553d87(0xfb)](/\[Version[ ](.*?)\]/i)){const _0x2eb356=Number(RegExp['$1']);_0x2eb356!==VisuMZ[label][_0x553d87(0xbd)]&&(alert(_0x553d87(0xba)['format'](_0x482456,_0x2eb356)),SceneManager['exit']());}if(_0x16b299['match'](/\[Tier[ ](\d+)\]/i)){if(_0x553d87(0x10f)===_0x553d87(0x110))_0xc08079[_0x553d87(0xeb)]['initialize']['call'](this);else{const _0x2defb4=Number(RegExp['$1']);if(_0x2defb4<tier){if(_0x553d87(0x10e)!=='XvTWA'){let _0xfa29b9=_0x4dcff9[_0x553d87(0xb4)][_0x553d87(0xd4)][_0x553d87(0x107)](this);if(_0x3f928c['isChainBonusEnabled']()){let _0x525511=_0x3ebb68[_0x553d87(0x8c)](),_0x25c0a7=_0x2be6d8[_0x553d87(0x143)],_0x35dc9e=_0x25c0a7[_0x525511]??_0x25c0a7[_0x25c0a7[_0x553d87(0x12b)]-0x1];_0xfa29b9*=_0x35dc9e;}return _0x25a199[_0x553d87(0xd0)](_0xfa29b9);}else alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x482456,_0x2defb4,tier)),SceneManager[_0x553d87(0x92)]();}else{if(_0x553d87(0x6f)===_0x553d87(0x6f))tier=Math['max'](_0x2defb4,tier);else return this[_0x553d87(0x10a)]=this[_0x553d87(0x10a)]||[],this[_0x553d87(0x10a)];}}}VisuMZ[_0x553d87(0x6d)](VisuMZ[label][_0x553d87(0x10d)],_0x29f6a9[_0x553d87(0x13e)]);})(pluginData),VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0x82)]=function(_0x216bc3,_0x4cfaf8){const _0x13a6aa=_0x5bedc1,_0x122bb6={'troopId':_0x216bc3,'changeBattleback':_0x4cfaf8[_0x13a6aa(0x98)],'battleback1':_0x4cfaf8[_0x13a6aa(0xd5)],'battleback2':_0x4cfaf8[_0x13a6aa(0xf3)]};$gameTemp[_0x13a6aa(0x9b)](_0x122bb6);},PluginManager[_0x5bedc1(0xe9)](pluginData[_0x5bedc1(0xf8)],_0x5bedc1(0xb6),_0x72edba=>{const _0x137326=_0x5bedc1;VisuMZ[_0x137326(0x6d)](_0x72edba,_0x72edba);const _0x34b65d=_0x72edba['TroopIDs'],_0x4d43a9=_0x34b65d[Math['randomInt'](_0x34b65d[_0x137326(0x12b)])];_0x4d43a9>0x0&&VisuMZ[_0x137326(0xb4)][_0x137326(0x82)](_0x4d43a9,_0x72edba);}),PluginManager[_0x5bedc1(0xe9)](pluginData[_0x5bedc1(0xf8)],'ChainBattleQueueEncounter',_0x24f409=>{const _0x25ad33=_0x5bedc1;VisuMZ['ConvertParams'](_0x24f409,_0x24f409);let _0x554053=0x0;BattleManager[_0x25ad33(0xa2)]()?_0x554053=$gameTroop['_troopId']:_0x554053=$gamePlayer['makeEncounterTroopId'](),_0x554053>0x0&&VisuMZ[_0x25ad33(0xb4)][_0x25ad33(0x82)](_0x554053,_0x24f409);}),PluginManager['registerCommand'](pluginData['name'],_0x5bedc1(0x11f),_0x3cf1f4=>{const _0x2d6177=_0x5bedc1;VisuMZ[_0x2d6177(0x6d)](_0x3cf1f4,_0x3cf1f4);const _0x2cccee=_0x3cf1f4[_0x2d6177(0x9e)]();_0x2cccee>0x0&&VisuMZ[_0x2d6177(0xb4)]['SetupChainBattles'](_0x2cccee,_0x3cf1f4);}),PluginManager[_0x5bedc1(0xe9)](pluginData[_0x5bedc1(0xf8)],'ChainBattleClear',_0x26d777=>{const _0x423213=_0x5bedc1;$gameTemp[_0x423213(0x76)]();}),PluginManager[_0x5bedc1(0xe9)](pluginData['name'],_0x5bedc1(0x75),_0x3ace76=>{const _0x4b6373=_0x5bedc1;VisuMZ[_0x4b6373(0x6d)](_0x3ace76,_0x3ace76);const _0x3788ca=_0x3ace76[_0x4b6373(0xe6)];for(const _0x4f586b of _0x3788ca){if(_0x4b6373(0x108)===_0x4b6373(0x108))$gameTemp[_0x4b6373(0xc1)](_0x4f586b);else return this['setupQueuedVictoryCommonEvents'](),![];}}),PluginManager['registerCommand'](pluginData['name'],'NextVictoryClearCommonEventQueue',_0xe6677b=>{$gameTemp['clearChainBattleVictoryCommonEvents']();}),BattleManager[_0x5bedc1(0x90)]=VisuMZ['ChainBattles'][_0x5bedc1(0x10d)][_0x5bedc1(0xf4)][_0x5bedc1(0x148)],BattleManager[_0x5bedc1(0x11c)]=VisuMZ['ChainBattles'][_0x5bedc1(0x10d)][_0x5bedc1(0xf4)]['DelayFrames'],BattleManager['CHAIN_BATTLE_TURN_COUNT_ADVANCE']=0x1,VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0xa1)]=BattleManager[_0x5bedc1(0x89)],BattleManager[_0x5bedc1(0x89)]=function(){const _0x17504c=_0x5bedc1;VisuMZ[_0x17504c(0xb4)][_0x17504c(0xa1)][_0x17504c(0x107)](this),this[_0x17504c(0x132)]=![],this['_chainBattleDelayDuration']=0x0,this[_0x17504c(0x83)]=![];},VisuMZ['ChainBattles'][_0x5bedc1(0xa0)]=BattleManager[_0x5bedc1(0x14c)],BattleManager['endBattle']=function(_0x36d20e){const _0x59af16=_0x5bedc1;$gameTemp[_0x59af16(0x76)](),$gameTroop[_0x59af16(0x123)](),VisuMZ[_0x59af16(0xb4)]['BattleManager_endBattle'][_0x59af16(0x107)](this,_0x36d20e),$gameTroop['clearChainBattleData']();},VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0xe4)]=BattleManager[_0x5bedc1(0x9d)],BattleManager[_0x5bedc1(0x9d)]=function(){const _0x27c9f7=_0x5bedc1;if(!this['_phase'])return![];if(!this[_0x27c9f7(0x96)]()&&!$gameParty[_0x27c9f7(0xc7)]()&&$gameTroop[_0x27c9f7(0xc7)]()){if($gameTemp[_0x27c9f7(0x111)]()['length']>0x0)return this['setupQueuedVictoryCommonEvents'](),![];const _0x24f745=$gameTemp['getChainBattleSettings']();if(_0x24f745)return this[_0x27c9f7(0xa3)](),![];}return VisuMZ[_0x27c9f7(0xb4)][_0x27c9f7(0xe4)][_0x27c9f7(0x107)](this);},BattleManager[_0x5bedc1(0x69)]=function(){const _0x2bd379=_0x5bedc1,_0x5d42d7=$gameTemp['shiftChainBattleVictoryCommonEvents']();$gameTemp[_0x2bd379(0xee)](_0x5d42d7);},BattleManager[_0x5bedc1(0xa3)]=function(){const _0x3e85c2=_0x5bedc1;if(this[_0x3e85c2(0xd1)]()){let _0x4119c9=BattleManager[_0x3e85c2(0x71)];while(_0x4119c9--){this['endTurn']();}}SceneManager[_0x3e85c2(0x11a)][_0x3e85c2(0x140)]();;this[_0x3e85c2(0x132)]=!![],this[_0x3e85c2(0x93)]=BattleManager[_0x3e85c2(0x11c)],this[_0x3e85c2(0x93)]<=0x0&&this[_0x3e85c2(0xcd)]();},VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0xe3)]=BattleManager[_0x5bedc1(0x7b)],BattleManager['update']=function(_0x1162d6){const _0xb3a281=_0x5bedc1;if(this[_0xb3a281(0x132)]){this[_0xb3a281(0xc4)]();return;}VisuMZ[_0xb3a281(0xb4)][_0xb3a281(0xe3)][_0xb3a281(0x107)](this,_0x1162d6);},VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0xfc)]=BattleManager[_0x5bedc1(0xaf)],BattleManager[_0x5bedc1(0xaf)]=function(_0x516b82){const _0x1a05b1=_0x5bedc1;if(this[_0x1a05b1(0x132)])return;VisuMZ['ChainBattles'][_0x1a05b1(0xfc)][_0x1a05b1(0x107)](this,_0x516b82);},BattleManager['updateChainBattleTransition']=function(){const _0x344979=_0x5bedc1;BattleManager[_0x344979(0x90)]&&((Input['isPressed']('ok')||Input['isPressed']('cancel')||TouchInput[_0x344979(0x126)]())&&(this[_0x344979(0x93)]-=0x3)),this[_0x344979(0x93)]--<=0x0&&(_0x344979(0x136)===_0x344979(0x136)?this[_0x344979(0xcd)]():_0x5d4918[_0x344979(0xa4)]()&&_0x1b6f25['log'](this[_0x344979(0x117)]()[_0x344979(0x129)](_0x5bf18d=>_0x5bf18d[_0x344979(0xf8)]())));},BattleManager[_0x5bedc1(0xcd)]=function(){const _0x157bc6=_0x5bedc1;SceneManager[_0x157bc6(0x105)](Scene_ChainBattleTransition);},VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0xae)]=BattleManager['makeRewards'],BattleManager['makeRewards']=function(){const _0x41cbd9=_0x5bedc1;$gameTroop['addCarryOverChainBattleDeadMembers'](),VisuMZ['ChainBattles'][_0x41cbd9(0xae)][_0x41cbd9(0x107)](this);},Game_Temp[_0x5bedc1(0xeb)]['setupChainBattleSettings']=function(_0x1eb224){const _0x48507=_0x5bedc1;this[_0x48507(0x124)]=this[_0x48507(0x124)]||[],this[_0x48507(0x124)][_0x48507(0xb2)](JsonEx[_0x48507(0xe7)](_0x1eb224));},Game_Temp[_0x5bedc1(0xeb)]['clearChainBattleSettings']=function(){this['_chainBattleQueue']=undefined;},Game_Temp['prototype'][_0x5bedc1(0xf1)]=function(){const _0x5b1367=_0x5bedc1;this[_0x5b1367(0x124)]=this[_0x5b1367(0x124)]||[],this[_0x5b1367(0x124)]['shift']();},Game_Temp[_0x5bedc1(0xeb)][_0x5bedc1(0x74)]=function(){const _0x231954=_0x5bedc1;return this[_0x231954(0x124)]?this[_0x231954(0x124)][0x0]:null;},VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0x147)]=Game_Temp[_0x5bedc1(0xeb)][_0x5bedc1(0xbf)],Game_Temp['prototype'][_0x5bedc1(0xbf)]=function(){const _0x4ffeed=_0x5bedc1;if(this['_chainBattleTransition'])return;VisuMZ[_0x4ffeed(0xb4)][_0x4ffeed(0x147)][_0x4ffeed(0x107)](this);},VisuMZ[_0x5bedc1(0xb4)]['Game_Temp_applyForcedGameTroopSettingsCoreEngine']=Game_Temp[_0x5bedc1(0xeb)][_0x5bedc1(0x14a)],Game_Temp['prototype'][_0x5bedc1(0x14a)]=function(_0x435f1d){const _0x595c02=_0x5bedc1;if(this[_0x595c02(0x132)])return;VisuMZ[_0x595c02(0xb4)]['Game_Temp_applyForcedGameTroopSettingsCoreEngine'][_0x595c02(0x107)](this,_0x435f1d);},Game_Temp[_0x5bedc1(0xeb)][_0x5bedc1(0xc1)]=function(_0x50fcb8){const _0x40d24c=_0x5bedc1;this[_0x40d24c(0x10a)]=this[_0x40d24c(0x10a)]||[],this[_0x40d24c(0x10a)][_0x40d24c(0xb2)](_0x50fcb8);},Game_Temp[_0x5bedc1(0xeb)][_0x5bedc1(0x111)]=function(){const _0x669ece=_0x5bedc1;return this['_chainBattleVictoryCommonEvent']=this[_0x669ece(0x10a)]||[],this[_0x669ece(0x10a)];},Game_Temp[_0x5bedc1(0xeb)][_0x5bedc1(0x11d)]=function(){const _0x50f14b=_0x5bedc1;return this['_chainBattleVictoryCommonEvent']=this[_0x50f14b(0x10a)]||[],this['_chainBattleVictoryCommonEvent'][_0x50f14b(0x81)]()||0x0;},Game_Temp[_0x5bedc1(0xeb)][_0x5bedc1(0xb3)]=function(){const _0x5ec230=_0x5bedc1;this[_0x5ec230(0x10a)]=[];},Game_System[_0x5bedc1(0x13a)]=VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0x10d)][_0x5bedc1(0xea)][_0x5bedc1(0x14b)],Game_System[_0x5bedc1(0xc8)]=VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0x10d)]['General'][_0x5bedc1(0xaa)],Game_System['prototype'][_0x5bedc1(0xf2)]=function(){const _0x2961ac=_0x5bedc1;return SceneManager[_0x2961ac(0xf9)]()&&Game_System[_0x2961ac(0x13a)];},Game_System['prototype'][_0x5bedc1(0xd3)]=function(){const _0x82ff68=_0x5bedc1;if(Game_System[_0x82ff68(0xc8)]<=0x0)return;if(!$gameTroop)return;const _0x36a606=Game_System[_0x82ff68(0xc8)],_0x406458=$gameTroop[_0x82ff68(0x8c)]();$gameVariables['setValue'](_0x36a606,_0x406458);},VisuMZ[_0x5bedc1(0xb4)]['Game_Battler_onBattleEnd']=Game_Battler['prototype'][_0x5bedc1(0xdd)],Game_Battler[_0x5bedc1(0xeb)]['onBattleEnd']=function(){const _0xdbc33a=_0x5bedc1,_0x4d58ec=$gameTemp[_0xdbc33a(0x74)]();if(_0x4d58ec)return;VisuMZ[_0xdbc33a(0xb4)]['Game_Battler_onBattleEnd'][_0xdbc33a(0x107)](this);},VisuMZ['ChainBattles'][_0x5bedc1(0xdf)]=Game_Enemy[_0x5bedc1(0xeb)][_0x5bedc1(0xd6)],Game_Enemy['prototype'][_0x5bedc1(0xd6)]=function(){const _0x52cd38=_0x5bedc1;let _0x2ef444=VisuMZ[_0x52cd38(0xb4)][_0x52cd38(0xdf)][_0x52cd38(0x107)](this);if($gameSystem['isChainBonusEnabled']()){if('rboOi'!==_0x52cd38(0x12e))_0x375cc4[_0x52cd38(0xf1)](),_0x260cc4['goto'](_0x1b8d13),_0x29a41d[_0x52cd38(0x132)]=![];else{let _0x5ed529=$gameTroop[_0x52cd38(0x8c)](),_0x296812=Game_Troop[_0x52cd38(0xcf)],_0x299efb=_0x296812[_0x5ed529]??_0x296812[_0x296812[_0x52cd38(0x12b)]-0x1];_0x2ef444*=_0x299efb;}}return _0x2ef444;},Game_Unit[_0x5bedc1(0xeb)]['addCarryOverChainBattleDeadMembers']=function(){const _0x1d51fa=_0x5bedc1;this[_0x1d51fa(0x134)]=!![];},Game_Unit[_0x5bedc1(0xeb)][_0x5bedc1(0x123)]=function(){const _0x20c8eb=_0x5bedc1;this[_0x20c8eb(0x134)]=![];},VisuMZ['ChainBattles'][_0x5bedc1(0x9a)]=Game_Unit[_0x5bedc1(0xeb)]['deadMembers'],Game_Unit[_0x5bedc1(0xeb)][_0x5bedc1(0x117)]=function(){const _0x39b823=_0x5bedc1;let _0x5851a5=VisuMZ[_0x39b823(0xb4)][_0x39b823(0x9a)]['call'](this);if(this['constructor']===Game_Troop&&this[_0x39b823(0x134)]){if(_0x39b823(0xb8)!==_0x39b823(0xfe))this[_0x39b823(0x8a)]=this[_0x39b823(0x8a)]||[],_0x5851a5=this[_0x39b823(0x8a)][_0x39b823(0x13d)](_0x5851a5);else{let _0x3554fb=_0x2cd546[_0x39b823(0xb4)][_0x39b823(0x114)][_0x39b823(0x107)](this);if(_0x3844f6[_0x39b823(0xf2)]()){let _0xadb5df=_0x55142c[_0x39b823(0x8c)](),_0x87fb27=_0x36d69b[_0x39b823(0xdc)],_0x579122=_0x87fb27[_0xadb5df]??_0x87fb27[_0x87fb27[_0x39b823(0x12b)]-0x1];_0x3554fb*=_0x579122;}return _0x3554fb;}}return _0x5851a5;},Game_Troop[_0x5bedc1(0x113)]=VisuMZ['ChainBattles']['Settings']['Multipliers'][_0x5bedc1(0xf0)],Game_Troop[_0x5bedc1(0xdc)]=VisuMZ[_0x5bedc1(0xb4)]['Settings']['Multipliers'][_0x5bedc1(0x87)],Game_Troop[_0x5bedc1(0xcf)]=VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0x10d)][_0x5bedc1(0xea)][_0x5bedc1(0xcc)],Game_Troop[_0x5bedc1(0x113)]['unshift'](0x1),Game_Troop['CHAIN_BATTLE_BONUS_GOLD'][_0x5bedc1(0xb1)](0x1),Game_Troop[_0x5bedc1(0xcf)]['unshift'](0x1),Game_Troop['CHAIN_BATTLE_BONUS_AP']=VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0x10d)]['Multipliers'][_0x5bedc1(0x78)],Game_Troop['CHAIN_BATTLE_BONUS_SP']=VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0x10d)]['Multipliers'][_0x5bedc1(0xc0)],Game_Troop[_0x5bedc1(0x145)][_0x5bedc1(0xb1)](0x1),Game_Troop[_0x5bedc1(0x143)][_0x5bedc1(0xb1)](0x1),Game_Troop[_0x5bedc1(0x125)]=VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0x10d)][_0x5bedc1(0xea)]['CpRates'],Game_Troop[_0x5bedc1(0x7c)]=VisuMZ['ChainBattles'][_0x5bedc1(0x10d)][_0x5bedc1(0xea)][_0x5bedc1(0x7f)],Game_Troop[_0x5bedc1(0x125)][_0x5bedc1(0xb1)](0x1),Game_Troop[_0x5bedc1(0x7c)][_0x5bedc1(0xb1)](0x1),VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0x106)]=Game_Troop[_0x5bedc1(0xeb)]['clear'],Game_Troop[_0x5bedc1(0xeb)][_0x5bedc1(0xff)]=function(){const _0x48b736=_0x5bedc1;VisuMZ[_0x48b736(0xb4)][_0x48b736(0x106)][_0x48b736(0x107)](this),this[_0x48b736(0xa6)]();},Game_Troop[_0x5bedc1(0xeb)][_0x5bedc1(0xa6)]=function(){const _0x4885fe=_0x5bedc1;this[_0x4885fe(0x8a)]=[],this[_0x4885fe(0x134)]=![],this['_chainBattleTotal']=0x0,$gameSystem[_0x4885fe(0xd3)](),this[_0x4885fe(0x13b)]=![],this[_0x4885fe(0x130)]='',this[_0x4885fe(0xbb)]='';},Game_Troop[_0x5bedc1(0xeb)][_0x5bedc1(0x12d)]=function(_0x273cd0){const _0x26978b=_0x5bedc1;_0x273cd0[_0x26978b(0xac)]=this[_0x26978b(0xac)]();if(BattleManager[_0x26978b(0xf7)]())_0x273cd0[_0x26978b(0xac)]+=0x1;this['_carryOverDeadMembers']=this[_0x26978b(0x8a)]||[],_0x273cd0[_0x26978b(0x117)]=_0x273cd0[_0x26978b(0x117)]||[],_0x273cd0[_0x26978b(0x117)]=this['_carryOverDeadMembers'][_0x26978b(0x13d)](_0x273cd0[_0x26978b(0x117)]),_0x273cd0['deadMembers']=_0x273cd0[_0x26978b(0x117)][_0x26978b(0x13d)]($gameTroop['deadMembers']()),this[_0x26978b(0x137)]=this[_0x26978b(0x137)]||0x1,this[_0x26978b(0x137)]+=0x1,_0x273cd0[_0x26978b(0x8e)]=this[_0x26978b(0x137)],$gameSystem[_0x26978b(0xd3)](),_0x273cd0['forcedRewards']=this[_0x26978b(0x109)],_0x273cd0[_0x26978b(0x141)]=this[_0x26978b(0x85)];},Game_Troop[_0x5bedc1(0xeb)][_0x5bedc1(0x8c)]=function(){const _0x460f73=_0x5bedc1;return this[_0x460f73(0x137)]=this['_chainBattleTotal']||0x1,this[_0x460f73(0x137)];},Game_Troop[_0x5bedc1(0xeb)]['carryOverChainBattleData']=function(_0x50f2e3){const _0x392eee=_0x5bedc1;this[_0x392eee(0xa8)]=_0x50f2e3[_0x392eee(0xac)],this[_0x392eee(0x8a)]=_0x50f2e3[_0x392eee(0x117)],this['_chainBattleTotal']=_0x50f2e3[_0x392eee(0x8e)]||0x1,$gameSystem[_0x392eee(0xd3)](),this[_0x392eee(0x109)]=_0x50f2e3['forcedRewards'],this['_bonusRewards']=_0x50f2e3[_0x392eee(0x141)],this[_0x392eee(0x13b)]=_0x50f2e3[_0x392eee(0x138)],this[_0x392eee(0x130)]=_0x50f2e3[_0x392eee(0x131)],this[_0x392eee(0xbb)]=_0x50f2e3[_0x392eee(0x91)];if(BattleManager[_0x392eee(0xf7)]())for(const _0x4813a3 of this[_0x392eee(0x102)]()){if(_0x392eee(0x84)!==_0x392eee(0x84)){let _0x39edc5=_0x58db73['getTotalChainBattles'](),_0x167329=_0x4ed62c[_0x392eee(0x113)],_0x49fc10=_0x167329[_0x39edc5]??_0x167329[_0x167329[_0x392eee(0x12b)]-0x1];_0x225853*=_0x49fc10;}else{if(!_0x4813a3)continue;_0x4813a3[_0x392eee(0xc6)]=this['_turnCount'];}}},Game_Troop[_0x5bedc1(0xeb)][_0x5bedc1(0xde)]=function(){const _0x3d756a=_0x5bedc1;$gameTemp['isPlaytest']()&&console['log'](this[_0x3d756a(0x117)]()[_0x3d756a(0x129)](_0x4a46cd=>_0x4a46cd['name']()));},VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0x112)]=Game_Troop[_0x5bedc1(0xeb)][_0x5bedc1(0x100)],Game_Troop[_0x5bedc1(0xeb)][_0x5bedc1(0x100)]=function(){const _0x463466=_0x5bedc1;let _0x68a37=VisuMZ[_0x463466(0xb4)]['Game_Troop_expRate'][_0x463466(0x107)](this);if($gameSystem[_0x463466(0xf2)]()){if(_0x463466(0x88)===_0x463466(0x88)){let _0x432e23=$gameTroop[_0x463466(0x8c)](),_0x3effa2=Game_Troop[_0x463466(0x113)],_0x175a27=_0x3effa2[_0x432e23]??_0x3effa2[_0x3effa2[_0x463466(0x12b)]-0x1];_0x68a37*=_0x175a27;}else return this['_chainBattleVictoryCommonEvent']=this['_chainBattleVictoryCommonEvent']||[],this[_0x463466(0x10a)][_0x463466(0x81)]()||0x0;}return Math[_0x463466(0xd0)](_0x68a37);},VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0x114)]=Game_Troop['prototype'][_0x5bedc1(0x6e)],Game_Troop[_0x5bedc1(0xeb)][_0x5bedc1(0x6e)]=function(){const _0x2338de=_0x5bedc1;let _0x311b92=VisuMZ[_0x2338de(0xb4)]['Game_Troop_goldRate'][_0x2338de(0x107)](this);if($gameSystem['isChainBonusEnabled']()){if(_0x2338de(0x6a)!=='kNcVZ'){let _0x3e6c7d=$gameTroop[_0x2338de(0x8c)](),_0x4c2993=Game_Troop[_0x2338de(0xdc)],_0x4ead16=_0x4c2993[_0x3e6c7d]??_0x4c2993[_0x4c2993[_0x2338de(0x12b)]-0x1];_0x311b92*=_0x4ead16;}else{const _0x3681e9=[this[_0x2338de(0xda)],this['_actorCommandWindow'],this['_skillWindow'],this[_0x2338de(0x12c)],this[_0x2338de(0xd9)],this[_0x2338de(0xec)]];for(const _0x40feaa of _0x3681e9){_0x40feaa['active']&&(_0x40feaa[_0x2338de(0xad)](),_0x40feaa[_0x2338de(0xd2)]());}}}return _0x311b92;},VisuMZ[_0x5bedc1(0xb4)]['Game_Troop_abilityPointsTotal']=Game_Troop[_0x5bedc1(0xeb)][_0x5bedc1(0x79)],Game_Troop[_0x5bedc1(0xeb)][_0x5bedc1(0x79)]=function(){const _0x7f2792=_0x5bedc1;let _0x45dfbb=VisuMZ[_0x7f2792(0xb4)][_0x7f2792(0x97)][_0x7f2792(0x107)](this);if($gameSystem[_0x7f2792(0xf2)]()){if('AJaST'!==_0x7f2792(0x10c)){let _0x5bc523=$gameTroop[_0x7f2792(0x8c)](),_0x2a727a=Game_Troop[_0x7f2792(0x145)],_0x5f1859=_0x2a727a[_0x5bc523]??_0x2a727a[_0x2a727a[_0x7f2792(0x12b)]-0x1];_0x45dfbb*=_0x5f1859;}else _0x42fe79[_0x7f2792(0xb4)]['BattleManager_initMembers'][_0x7f2792(0x107)](this),this[_0x7f2792(0x132)]=![],this[_0x7f2792(0x93)]=0x0,this[_0x7f2792(0x83)]=![];}return Math[_0x7f2792(0xd0)](_0x45dfbb);},VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0xd4)]=Game_Troop['prototype'][_0x5bedc1(0x103)],Game_Troop[_0x5bedc1(0xeb)]['skillPointsTotal']=function(){const _0x1e2e46=_0x5bedc1;let _0x785bbb=VisuMZ[_0x1e2e46(0xb4)][_0x1e2e46(0xd4)][_0x1e2e46(0x107)](this);if($gameSystem[_0x1e2e46(0xf2)]()){let _0x310569=$gameTroop['getTotalChainBattles'](),_0x47d3c5=Game_Troop[_0x1e2e46(0x143)],_0x1e6381=_0x47d3c5[_0x310569]??_0x47d3c5[_0x47d3c5[_0x1e2e46(0x12b)]-0x1];_0x785bbb*=_0x1e6381;}return Math[_0x1e2e46(0xd0)](_0x785bbb);},VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0xa5)]=Game_Troop['prototype'][_0x5bedc1(0xe0)],Game_Troop[_0x5bedc1(0xeb)][_0x5bedc1(0xe0)]=function(){const _0x3946d1=_0x5bedc1;let _0x467667=VisuMZ[_0x3946d1(0xb4)][_0x3946d1(0xa5)][_0x3946d1(0x107)](this);if($gameSystem[_0x3946d1(0xf2)]()){if(_0x3946d1(0xd8)===_0x3946d1(0xc3))_0x57fd0f[_0x3946d1(0xb4)]['Game_Troop_clear'][_0x3946d1(0x107)](this),this[_0x3946d1(0xa6)]();else{let _0x2373e8=$gameTroop[_0x3946d1(0x8c)](),_0x4e7ef6=Game_Troop['CHAIN_BATTLE_BONUS_CP'],_0x484642=_0x4e7ef6[_0x2373e8]??_0x4e7ef6[_0x4e7ef6['length']-0x1];_0x467667*=_0x484642;}}return Math['ceil'](_0x467667);},VisuMZ[_0x5bedc1(0xb4)][_0x5bedc1(0xce)]=Game_Troop['prototype']['jobPointsTotal'],Game_Troop[_0x5bedc1(0xeb)][_0x5bedc1(0x7a)]=function(){const _0x8b31cd=_0x5bedc1;let _0x2389f9=VisuMZ[_0x8b31cd(0xb4)][_0x8b31cd(0xce)][_0x8b31cd(0x107)](this);if($gameSystem[_0x8b31cd(0xf2)]()){let _0x3b7f83=$gameTroop[_0x8b31cd(0x8c)](),_0x2c7c08=Game_Troop[_0x8b31cd(0x7c)],_0x2a13c1=_0x2c7c08[_0x3b7f83]??_0x2c7c08[_0x2c7c08['length']-0x1];_0x2389f9*=_0x2a13c1;}return Math['ceil'](_0x2389f9);},VisuMZ['ChainBattles']['Scene_Battle_isAnyInputWindowActive']=Scene_Battle['prototype'][_0x5bedc1(0x77)],Scene_Battle[_0x5bedc1(0xeb)]['isAnyInputWindowActive']=function(){const _0x5c00e8=_0x5bedc1;if(BattleManager[_0x5c00e8(0x132)])return!![];return VisuMZ[_0x5c00e8(0xb4)][_0x5c00e8(0xa7)][_0x5c00e8(0x107)](this);},Scene_Battle[_0x5bedc1(0xeb)][_0x5bedc1(0x140)]=function(){const _0x5a1621=_0x5bedc1,_0x53aea0=[this[_0x5a1621(0xda)],this[_0x5a1621(0xb5)],this[_0x5a1621(0xf5)],this['_itemWindow'],this['_actorWindow'],this[_0x5a1621(0xec)]];for(const _0x44c075 of _0x53aea0){if(_0x5a1621(0x8f)==='HoDkU'){if(_0x44c075[_0x5a1621(0x7e)]){if('LUthF'!==_0x5a1621(0xbc))_0x44c075[_0x5a1621(0xad)](),_0x44c075[_0x5a1621(0xd2)]();else{let _0x5b5b1b=_0x254ff0[_0x5a1621(0x8c)](),_0x1c322c=_0x5fbef7[_0x5a1621(0xdc)],_0xaba09a=_0x1c322c[_0x5b5b1b]??_0x1c322c[_0x1c322c[_0x5a1621(0x12b)]-0x1];_0x5cc9fa*=_0xaba09a;}}}else{_0x376a4e[_0x5a1621(0x6d)](_0x3c8abd,_0x247597);const _0x289492=_0x50aa19[_0x5a1621(0x8b)],_0x38894d=_0x289492[_0x2e2759[_0x5a1621(0x73)](_0x289492[_0x5a1621(0x12b)])];_0x38894d>0x0&&_0x30f282['ChainBattles'][_0x5a1621(0x82)](_0x38894d,_0x5ba430);}}};function Scene_ChainBattleTransition(){const _0x5adea9=_0x5bedc1;this[_0x5adea9(0xca)](...arguments);}Scene_ChainBattleTransition['prototype']=Object[_0x5bedc1(0x6c)](Scene_Base[_0x5bedc1(0xeb)]),Scene_ChainBattleTransition['prototype'][_0x5bedc1(0x9c)]=Scene_ChainBattleTransition,Scene_ChainBattleTransition['prototype'][_0x5bedc1(0xca)]=function(){const _0x4275c4=_0x5bedc1;Scene_Base[_0x4275c4(0xeb)]['initialize'][_0x4275c4(0x107)](this);},Scene_ChainBattleTransition['prototype'][_0x5bedc1(0x95)]=function(){const _0x95e1e3=_0x5bedc1;Scene_Base[_0x95e1e3(0xeb)][_0x95e1e3(0x95)][_0x95e1e3(0x107)](this),this[_0x95e1e3(0x12d)](),this[_0x95e1e3(0x11b)](),this['carryOverChainBattleData'](),this[_0x95e1e3(0x127)]();},Scene_ChainBattleTransition[_0x5bedc1(0xeb)][_0x5bedc1(0x12d)]=function(){const _0x24697e=_0x5bedc1,_0x19ad4f=$gameTemp[_0x24697e(0x74)]();$gameTroop[_0x24697e(0x12d)](_0x19ad4f),_0x19ad4f[_0x24697e(0x116)]=$gameSystem[_0x24697e(0xe5)](),_0x19ad4f[_0x24697e(0x149)]=$gameTemp[_0x24697e(0x121)]||VisuMZ[_0x24697e(0x101)][_0x24697e(0x10d)]['BattleLayout'][_0x24697e(0xc2)]['toLowerCase']()[_0x24697e(0x8d)](),$gameTemp[_0x24697e(0x132)]=!![];},Scene_ChainBattleTransition[_0x5bedc1(0xeb)][_0x5bedc1(0x11b)]=function(){const _0x15091a=_0x5bedc1,_0x3d59d9=$gameTemp['getChainBattleSettings'](),_0x4ffd9c=_0x3d59d9[_0x15091a(0x94)],_0x51334f=BattleManager[_0x15091a(0x7d)],_0x1dd021=BattleManager[_0x15091a(0x122)],_0x29574e=BattleManager[_0x15091a(0xa2)](),_0x1a6f39=BattleManager[_0x15091a(0xc9)];BattleManager[_0x15091a(0x104)](_0x4ffd9c,_0x51334f,_0x1dd021),BattleManager[_0x15091a(0xb9)](_0x29574e),BattleManager['setEventCallback'](_0x1a6f39),BattleManager[_0x15091a(0x83)]=!![];},Scene_ChainBattleTransition['prototype'][_0x5bedc1(0xfd)]=function(){const _0x2260e3=_0x5bedc1,_0x201be5=$gameTemp[_0x2260e3(0x74)]();$gameTroop[_0x2260e3(0xfd)](_0x201be5),$gameTemp[_0x2260e3(0xb0)]=_0x201be5['battleSys'],$gameTemp['_forcedBattleLayout']=_0x201be5[_0x2260e3(0x149)];},Scene_ChainBattleTransition[_0x5bedc1(0xeb)][_0x5bedc1(0x127)]=function(){const _0x2e6969=_0x5bedc1;$gameTemp[_0x2e6969(0xf1)](),SceneManager[_0x2e6969(0x105)](Scene_Battle),$gameTemp[_0x2e6969(0x132)]=![];},VisuMZ['ChainBattles']['Sprite_Actor_moveToStartPositionBattleCore']=Sprite_Actor[_0x5bedc1(0xeb)][_0x5bedc1(0x12f)],Sprite_Actor[_0x5bedc1(0xeb)][_0x5bedc1(0x12f)]=function(_0x1f8858){const _0x5abcaa=_0x5bedc1;if(BattleManager[_0x5abcaa(0x83)]){if(_0x5abcaa(0xef)!==_0x5abcaa(0xef)){const _0x8ce49e=_0x57d427[_0x5abcaa(0x74)]();if(_0x8ce49e)return;_0x1e85d7[_0x5abcaa(0xb4)]['Game_Battler_onBattleEnd'][_0x5abcaa(0x107)](this);}else{const _0x342f0f=VisuMZ[_0x5abcaa(0xb4)]['Settings'][_0x5abcaa(0xf4)][_0x5abcaa(0x9f)]??!![];if(!_0x342f0f)return;}}VisuMZ['ChainBattles'][_0x5abcaa(0xed)][_0x5abcaa(0x107)](this,_0x1f8858);},VisuMZ['ChainBattles']['Sprite_Battleback_battleback1Name']=Sprite_Battleback['prototype'][_0x5bedc1(0x80)],Sprite_Battleback['prototype'][_0x5bedc1(0x80)]=function(){const _0x22d023=_0x5bedc1;return $gameTroop[_0x22d023(0x13b)]?$gameTroop[_0x22d023(0x130)]:VisuMZ[_0x22d023(0xb4)]['Sprite_Battleback_battleback1Name'][_0x22d023(0x107)](this);},VisuMZ['ChainBattles'][_0x5bedc1(0x120)]=Sprite_Battleback[_0x5bedc1(0xeb)]['battleback2Name'],Sprite_Battleback[_0x5bedc1(0xeb)][_0x5bedc1(0x115)]=function(){const _0x48f2d5=_0x5bedc1;return $gameTroop[_0x48f2d5(0x13b)]?$gameTroop[_0x48f2d5(0xbb)]:VisuMZ[_0x48f2d5(0xb4)]['Sprite_Battleback_battleback2Name'][_0x48f2d5(0x107)](this);};
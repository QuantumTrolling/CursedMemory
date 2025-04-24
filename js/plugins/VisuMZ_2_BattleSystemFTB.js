//=============================================================================
// VisuStella MZ - Battle System - FTB - Free Turn Battle
// VisuMZ_2_BattleSystemFTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemFTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemFTB = VisuMZ.BattleSystemFTB || {};
VisuMZ.BattleSystemFTB.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.10] [BattleSystemFTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_FTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Free Turn Battle (FTB) is a type of battle system made for RPG Maker MZ,
 * where the teams for actors and enemies take turns attacking one another as
 * a whole. During each team's turns, an action count is given to them and they
 * can freely perform actions among their teammates as wanted (or if turned off
 * by the Plugin Parameters, in a cycle). When the action count is depleted or
 * if one team ran out of battler's that can act, the other team begins their
 * turn and so forth.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ftb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actor and enemy teams take turns attacking each other as a whole.
 * * Action counts are given to each team at the start of each turn to utilize
 *   actions for.
 * * If enabled, actors can be freely switched around to perform actions with.
 * * Alter the mechanics of the Battle System FTB to your liking through the
 *   Plugin Parameters.
 * * An Action Count Display is shown for each side to relay information to the
 *   player about the current state of each turn.
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
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
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
 * Surprise Attacks and Preemptive Bonuses
 * 
 * Due to the nature of a team-based battle system, surprise attacks and
 * preemptive bonuses no longer prevent the other team from being able to act
 * for a turn as that gives the initiating team too much advantage. Instead,
 * a surprise attack means the enemy team will always start first for each turn
 * while a preemptive bonus means the actor team will always start first for
 * each turn.
 * 
 * ---
 * 
 * Agility and Speed
 * 
 * When there is no surprise attack or preemptive bonus, aka a neutral battle
 * initiative, then the team that goes first is determined by their Agility
 * value at the start of battle (unless determined otherwise through the Plugin
 * Parameters).
 * 
 * However, because of the nature of team-based battle systems, agility and
 * speed have no impact on action speeds as action speeds are now instantly
 * performed.
 * 
 * Agility, however, can influence Action Counts through buffs and debuffs if
 * enabled through the Plugin Parameters. Each stack of Agility buffs will
 * raise the Action Count for a team while each stack of Agility debuffs will
 * decrease them for subsequent turns.
 * 
 * ---
 * 
 * Action Count
 * 
 * Each team will have an allotted number of actions available for usage. This
 * amount is determined by the number of alive members they have available by
 * default multiplied by their action count base.
 * 
 * The amount of actions that can be performed at base value can be determined
 * inside the Plugin Parameters > Mechanics Settings > Base.
 * 
 * The action count can be altered by AGI buffs and/or debuffs depending on the
 * Plugin Parameter settings.
 * 
 * Further action counts can be altered by various notetag effects tied to the
 * trait objects of each battle member.
 * 
 * ---
 * 
 * Action Orders
 * 
 * As team-based battle systems always have teams go between each other, the
 * standard action orders seen for turn-based and tick-based battle systems no
 * longer exist. However, in the event the actor team has berserk, confused, or
 * autobattlers, the actions will be performed in the following order:
 * 
 * 1. Berserk, confused, and auto battlers go first.
 * 2. If any actions are left, inputtable actors go next.
 * 3. If any actions are left, but there are no inputtable actors, berserk,
 *    confused, and auto battlers use up the remaining actions.
 * 4. Switch to the next team.
 * 
 * For enemy teams, enemies will always go in order from left-to-right for the
 * front view or right-to-left for sideview. If there are actions left, the
 * enemy team will cycle back to the first acting enemy.
 * 
 * ---
 * 
 * Free Range Switching
 * 
 * If this is enabled (it's an optional feature) and it's the player's turn,
 * the player can freely switch between actors in his/her party by pressing the
 * left/right buttons or the page up/page down buttons. The Actor Command
 * Window will automatically update to the newly selected actor. This gives the
 * player complete control and freedom over the party and the party's actions.
 * 
 * For touch controls, instead of pressing left/right or page up/page down on
 * the keyboard, click on the Battle Status Window for the target actor to be
 * selected to perform an action. The Actor Command Window will automatically
 * update to the newly selected actor.
 * 
 * ---
 *
 * Turn Structure
 * 
 * Each battle turn is dedicated to one team or the other. You need to design
 * your turns with this in mind. When one team finishes its actions, the next
 * turn will have the other team perform theirs.
 * 
 * As a result, both teams will not benefit from their turn end activities such
 * as regeneration at the end of each battle turn. Instead, they will only
 * occur at the end of their own respective turns.
 * 
 * However, for states and buffs, this is slightly different. States and buffs
 * update at the end of the opposing team's turn. This is so that 1 turn states
 * like Guard will last until the opponent's turn is over instead of being over
 * immediately after the player's turn ends (rendering the effect useless).
 * 
 * The state and buff turn updates can be disabled in the Plugin Parameters.
 * However, the durations must be accounted for if disabled (ie. making Guard
 * last two turns instead of 1).
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
 * === General FTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <FTB Help>
 *  description
 *  description
 * </FTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under FTB.
 * - This is primarily used if the skill behaves differently in FTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to FTB.
 *
 * ---
 * 
 * === Action Cost-Related Notetags ===
 * 
 * ---
 *
 * <FTB Action Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the FTB action cost of this skill/item to 'x'.
 * - Replace 'x' with a number value representing the action cost required to
 *   perform the skill.
 *
 * ---
 *
 * <FTB Hide Action Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the FTB action cost for this skill/item hidden regardless of Plugin
 *   Parameter settings.
 *
 * ---
 *
 * <FTB Show Action Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the FTB action cost for this skill/item visible regardless of Plugin
 *   Parameter settings.
 *
 * ---
 * 
 * === Mechanics-Related Notetags ===
 * 
 * ---
 *
 * <FTB Pass Turn>
 *
 * - Used for: Skill, Item Notetags
 * - If a battler uses this skill/item, then even if there are actions left for
 *   the team to perform, that battler would no longer be able to input as they
 *   have already passed their turn.
 * - By default, this applies to "Guard". If you don't want it to apply to the
 *   Guard skill, turn it off in the Plugin Parameters for mechanics.
 *
 * ---
 *
 * <FTB Actions: +x>
 * <FTB Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Battlers associated with these trait objects can increase or decrease the
 *   maximum number of actions performed each turn.
 * - Replace 'x' with a number representing the increase or decrease in action
 *   count per turn.
 * - Depending on the Plugin Parameters, altering the max value can result in
 *   gaining or losing remaining actions for the current turn.
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
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: FTB Action Count Visibility
 * - Determine the visibility of the FTB Action Count Display.
 *
 *   Visibility:
 *   - Changes the visibility of the FTB Action Count Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Determines the general settings of the FTB Battle System. These settings
 * range from determining how the Action Count resources and costs are
 * displayed to the text that appear during team shifting.
 *
 * ---
 *
 * Action Counts
 * 
 *   Full Name:
 *   - What is the full name of "Action Counts" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Action Counts" in your game?
 * 
 *   Cost Format:
 *   - How are Action Count costs displayed?
 *   - %1 - Cost, %2 - Abbr Text, %3 - Icon
 * 
 * ---
 * 
 * Icons
 * 
 *   Actor Action Icon:
 *   - What icon is used to represent actor actions?
 * 
 *   Enemy Action Icon:
 *   - What icon is used to represent enemy actions?
 * 
 *   Empty Action Icon:
 *   - What icon is used to represent empty actions?
 *
 * ---
 *
 * Team Shift
 * 
 *   Party's Turn:
 *   - Text that appears when it's the party's turn.
 *   - %1 - Party Name
 * 
 *   Enemy's Turn:
 *   - Text that appears when it's the enemy's turn.
 * 
 *   Wait Frames:
 *   - How many frames to wait in between team changes?
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the action cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the action cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the action cost for the Guard command?
 * 
 *   Show Cost: 0 Action:
 *   - Show the action cost when the cost is 0 action?
 * 
 *   Show Cost: 1 Action:
 *   - Show the action cost when the cost is 1 action?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of the FTB Battle System. From here, you can
 * enable or disable core mechanics, determine how to determine turn advantage,
 * and how the various supporting mechanics operate.
 *
 * ---
 *
 * Main Mechanics
 * 
 *   Enable Free Switch?:
 *   - Enable free range switching between actors?
 * 
 *     Maintain Same Actor?:
 *     - Requires Free Switching.
 *     - Maintain the same actor after an action or move onto the next
 *       available actor?
 * 
 *   Reset Index New Turns:
 *   - Resets the selected actor whenever a new turn starts?
 *   - Needs "Free Switching" to be off.
 * 
 *   Guard > Pass Turn?:
 *   - Does guarding cause a battler to pass turn?
 * 
 *   Gain Differences?:
 *   - If the max Action Count for a team changes, gain the difference in value
 *     if positive?
 * 
 *   Lose Differences?:
 *   - If the max Action Count for a team changes, lose the difference in value
 *     if negative?
 * 
 *   State/Buff Updates:
 *   - If enabled, update state/buff turns only on opponent turns.
 *   - Otherwise, they occur every turn.
 *
 * ---
 *
 * Turn Advantage
 * 
 *   Neutral Advantage:
 *   - For a neutral advantage battle, what determines which team goes first?
 *     - Random - 50% chance on which team goes first
 *     - Player - Player's team always goes first.
 *     - Lowest AGI - Battler with lowest AGI's team goes first
 *     - Average AGI - Team with the highest average AGI goes first
 *     - Highest AGI - Battler with highest AGI's team goes first
 *     - Total AGI - Team with highest total AGI goes first
 *
 * ---
 *
 * Action Generation
 * 
 *   Base:
 *   - What is the starting base number of actions that are generated per
 *     battler each turn?
 * 
 *   AGI Buff Influence?:
 *   - Do AGI buffs give +1 for each stack?
 * 
 *   AGI Debuff Influence?:
 *   - Do AGI debuffs give -1 for each stack?
 * 
 *   Maximum Actions:
 *   - What is the absolute maximum number of actions a team can have
 *     each turn?
 * 
 *   Minimum Actions:
 *   - What is the bare minimum number of actions a team can have each turn?
 * 
 *   Allow Overflow?:
 *   - Allow current actions to overflow?
 *   - Or let them cap at the current team max?
 *
 * ---
 *
 * Default Action Costs
 * 
 *   Skills:
 *   - What is the default action cost for skills?
 * 
 *   Items:
 *   - What is the default action cost for items?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Count Display Settings
 * ============================================================================
 *
 * Adjust the settings for the Action Count Display. They appear in the upper
 * or lower corners of the screen for the player party and the enemy troop.
 *
 * ---
 *
 * Display Settings
 * 
 *   Draw Horizontally?:
 *   - Which direction do you want the Action Count Display to go?
 * 
 *   Bottom Position?:
 *   - Place the Action Count Display towards the bottom of the screen?
 * 
 *     Offset Top Log Y?:
 *     - If using the top position, offset the log window's Y position.
 * 
 *     Reposition for Help?:
 *     - If using the top position, reposition the display when the help window
 *       is open?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's X/Y coordinates by this much when the
 *     Help Window is visible.
 *
 * ---
 *
 * Picture Settings
 * 
 *   Actor Action Picture:
 *   Enemy Action Picture:
 *   Empty Action Picture:
 *   - Optional. Place an image for an actor, enemy, or empty action instead of
 *     an icon?
 *
 * ---
 *
 * Coordinates
 * 
 *   Screen Buffer X:
 *   Screen Buffer Y:
 *   - Buffer from the the edge of the screen's X/Y by this much.
 * 
 *   Actor Offset X:
 *   Actor Offset Y:
 *   Enemy Offset X:
 *   Enemy Offset Y:
 *   - Offset the actor/enemy images' X/Y by this much.
 *
 * ---
 *
 * Draw Settings
 * 
 *   Max Actions Visible:
 *   - How many action slots max should be drawn for each team?
 * 
 *   Image Size:
 *   - What is the size of the icons or pictures for the action slots?
 * 
 *   Gap Distance:
 *   - How wide should the gab between each slot be in pixels?
 * 
 *   Icon Smoothing?:
 *   - Smooth the display for icons?
 *   - Or pixelate them?
 * 
 *   Picture Smoothing?:
 *   - Smooth the display for pictures?
 *   - Or pixelate them?
 *
 * ---
 *
 * Turns Remaining
 * 
 *   Show Number?:
 *   - Show a number to display the actions remaining?
 * 
 *   Font Size:
 *   - What font size should be used for this number?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the remaining actions number X/Y.
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
 * Version 1.10: October 20, 2022
 * * Bug Fixes!
 * ** Fixed problem with the Action Count Display's Actor Offset Y not working
 *    properly. Fix made by Arisu.
 * 
 * Version 1.09: June 2, 2022
 * * Bug Fixes!
 * ** Fixed a bug where Force Actions do not work when there's only one action
 *    left for the turn. Fix made by Olivia.
 * 
 * Version 1.08: April 21, 2022
 * * Bug Fixes!
 * ** Fixed a bug that prevents the battle system from shifting back to the
 *    default battle system after an enemy counter attack. Fix made by Olivia.
 * 
 * Version 1.07: April 14, 2022
 * * Compatibility Update!
 * ** Now works more compatible with counters. Update made by Olivia.
 * 
 * Verison 1.06: March 17, 2022
 * * Bug Fixes!
 * ** Death by slip damage will now perform the proper death animation.
 *    Fix made by Olivia.
 * 
 * Version 1.05: August 13, 2021
 * * Bug Fixes!
 * ** Fixed some Plugin Parameters that did not work properly when
 *    showing/hiding action costs. Fix made by Irina.
 * 
 * Version 1.04: June 18, 2021
 * * Documentation Update!
 * ** Added "Action Count" section to Major Changes for extra clarity on how
 *    action counts are determined.
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Olivia:
 * *** <FTB Show Action Cost>
 * **** Makes the FTB action cost for this skill/item visible regardless of
 *      Plugin Parameter settings.
 * 
 * Version 1.03: May 28, 2021
 * * Documentation Update!
 * ** Updated the text for Plugin Parameter "Maintain Same Actor?"
 * *** Requires Free Switching. Maintain the same actor after an action or move
 *     onto the next available actor?
 * * Feature Update!
 * ** When there are more actions available than the number of actions that can
 *    be shown at a time, the visible icons displayed will be trimmed to fit
 *    the number of maximum visible icons displayed. Update by Olivia.
 * 
 * Version 1.02: April 2, 2021
 * * Bug Fixes!
 * ** Action costs for FTP will now only take effect if inside battle only.
 *    Fix made by Olivia.
 * 
 * Version 1.01: March 19, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.00 Official Release Date: February 22, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemActionCountVisibility
 * @text System: FTB Action Count Visibility
 * @desc Determine the visibility of the FTB Action Count Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the FTB Action Count Display.
 * @default true
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
 * @param BattleSystemFTB
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
 * @desc Determines the general settings of the FTB Battle System.
 * @default {"ActionCounts":"","ActionCountFull:str":"Fight Points","ActionCountAbbr:str":"FP","ActionCountCostFmt:str":"\\FS[22]\\C[0]×%1%3\\C[0]","Icons":"","ActorActionsIcon:num":"165","EnemyActionsIcon:num":"162","EmptyActionsIcon:num":"161","TeamShift":"","PartyTeamShiftFmt:str":"%1's Turn!","TroopTeamShiftFmt:str":"Opponent's Turn!","TeamShiftWait:num":"60","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","Show_0_Action_Cost:eval":"true","Show_1_Action_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of the FTB Battle System.
 * @default {"Main":"","FreeChange:eval":"true","KeepPrevActor:eval":"true","GuardPass:eval":"true","GainDiff:eval":"true","LoseDiff:eval":"false","StateBuffUpdate:eval":"true","TurnAdvantage":"","NeutralAdvantage:str":"average agi","ActionGeneration":"","GenerateBase:num":"1","AgiBuff:eval":"true","AgiDebuff:eval":"false","MaxActions:num":"99","MinActions:num":"1","AllowOverflow:eval":"false","DefaultCost":"","DefaultCostSkill:num":"1","DefaultCostItem:num":"1"}
 *
 * @param ActionCountDisplay:struct
 * @text Action Count Display
 * @type struct<ActionCountDisplay>
 * @desc Adjust the settings for the Action Count Display.
 * @default {"Display":"","DrawHorz:eval":"true","BottomPosition:eval":"true","LogWindowTopOffsetY:num":"40","RepositionTopForHelp:eval":"true","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"160","Pictures":"","ActorActionPicture:str":"","EnemyActionPicture:str":"","EmptyActionPicture:str":"","Coordinates":"","ScreenBufferX:num":"16","ScreenBufferY:num":"16","ActorOffsetX:num":"0","ActorOffsetY:num":"0","EnemyOffsetX:num":"0","EnemyOffsetY:num":"0","DrawSettings":"","MaxVisible:num":"10","ImageSize:num":"32","ImageGapDistance:num":"2","IconSmoothing:eval":"false","PictureSmoothing:eval":"true","TurnsRemaining":"","DrawActionsRemaining:eval":"true","ActionsRemainingFontSize:num":"26","ActionsRemainingOffsetX:num":"0","ActionsRemainingOffsetY:num":"0"}
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
 * @param ActionCounts
 * @text Action Counts
 *
 * @param ActionCountFull:str
 * @text Full Name
 * @parent ActionCounts
 * @desc What is the full name of "Action Counts" in your game?
 * @default Fight Points
 *
 * @param ActionCountAbbr:str
 * @text Abbreviation
 * @parent ActionCounts
 * @desc What is the abbreviation of "Action Counts" in your game?
 * @default FP
 *
 * @param ActionCountCostFmt:str
 * @text Cost Format
 * @parent ActionCounts
 * @desc How are Action Count costs displayed?
 * %1 - Cost, %2 - Abbr Text, %3 - Icon
 * @default \FS[22]\C[0]×%1%3\C[0]
 *
 * @param Icons
 *
 * @param ActorActionsIcon:num
 * @text Actor Action Icon
 * @parent Icons
 * @desc What icon is used to represent actor actions?
 * @default 165
 *
 * @param EnemyActionsIcon:num
 * @text Enemy Action Icon
 * @parent Icons
 * @desc What icon is used to represent enemy actions?
 * @default 162
 *
 * @param EmptyActionsIcon:num
 * @text Empty Action Icon
 * @parent Icons
 * @desc What icon is used to represent empty actions?
 * @default 161
 *
 * @param TeamShift
 * @text Team Shift
 *
 * @param PartyTeamShiftFmt:str
 * @text Party's Turn
 * @parent TeamShift
 * @desc Text that appears when it's the party's turn.
 * %1 - Party Name
 * @default %1's Turn!
 *
 * @param TroopTeamShiftFmt:str
 * @text Enemy's Turn
 * @parent TeamShift
 * @desc Text that appears when it's the enemy's turn.
 * @default Opponent's Turn!
 *
 * @param TeamShiftWait:num
 * @text Wait Frames
 * @parent TeamShift
 * @type number
 * @desc How many frames to wait in between team changes?
 * @default 60
 *
 * @param DisplayedCosts
 * @text Displayed Costs
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @parent DisplayedCosts
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the action cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost for the Guard command?
 * @default false
 *
 * @param Show_0_Action_Cost:eval
 * @text Show Cost: 0 Action
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost when the cost is 0 action?
 * @default true
 *
 * @param Show_1_Action_Cost:eval
 * @text Show Cost: 1 Action
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost when the cost is 1 action?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Main
 * @text Main Mechanics
 *
 * @param FreeChange:eval
 * @text Enable Free Switch?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable free range switching between actors?
 * @default true
 *
 * @param KeepPrevActor:eval
 * @text Maintain Same Actor?
 * @parent FreeChange:eval
 * @type boolean
 * @on Maintain
 * @off Next Available
 * @desc Requires Free Switching. Maintain the same actor after
 * an action or move onto the next available actor?
 * @default true
 *
 * @param NewTurnResetIndex:eval
 * @text Reset Index New Turns
 * @parent Main
 * @type boolean
 * @on Reset
 * @off Keep
 * @desc Resets the selected actor whenever a new turn starts?
 * Needs "Free Switching" to be off.
 * @default false
 *
 * @param GuardPass:eval
 * @text Guard > Pass Turn?
 * @parent Main
 * @type boolean
 * @on Pass Turn
 * @off Don't Pass
 * @desc Does guarding cause a battler to pass turn?
 * @default true
 *
 * @param GainDiff:eval
 * @text Gain Differences?
 * @parent Main
 * @type boolean
 * @on Gain Differences
 * @off Keep Same
 * @desc If the max Action Count for a team changes,
 * gain the difference in value if positive?
 * @default true
 *
 * @param LoseDiff:eval
 * @text Lose Differences?
 * @parent Main
 * @type boolean
 * @on Lose Differences
 * @off Keep Same
 * @desc If the max Action Count for a team changes,
 * lose the difference in value if negative?
 * @default false
 *
 * @param StateBuffUpdate:eval
 * @text State/Buff Updates
 * @parent Main
 * @type boolean
 * @on Opponent Turns Only
 * @off All Turns
 * @desc If enabled, update state/buff turns only on opponent
 * turns. Otherwise, they occur every turn.
 * @default true
 *
 * @param TurnAdvantage
 * @text Turn Advantage
 *
 * @param NeutralAdvantage:str
 * @text Neutral Advantage
 * @parent TurnAdvantage
 * @type select
 * @option Random - 50% chance on which team goes first
 * @value random
 * @option Player - Player's team always goes first
 * @value player
 * @option Enemy - Enemy's team always goes first
 * @value enemy
 * @option Lowest AGI - Battler with lowest AGI's team goes first
 * @value lowest agi
 * @option Average AGI - Team with the highest average AGI goes first
 * @value average agi
 * @option Highest AGI - Battler with highest AGI's team goes first
 * @value highest agi
 * @option Total AGI - Team with highest total AGI goes first
 * @value total agi
 * @desc For a neutral advantage battle, what determines which team goes first?
 * @default average agi
 *
 * @param ActionGeneration
 * @text Action Generation
 *
 * @param GenerateBase:num
 * @text Base
 * @parent ActionGeneration
 * @type number
 * @desc What is the starting base number of actions that are generated per battler each turn?
 * @default 1
 *
 * @param AgiBuff:eval
 * @text AGI Buff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI buffs give +1 for each stack?
 * @default true
 *
 * @param AgiDebuff:eval
 * @text AGI Debuff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI debuffs give -1 for each stack?
 * @default false
 *
 * @param MaxActions:num
 * @text Maximum Actions
 * @parent ActionGeneration
 * @type number
 * @desc What is the absolute maximum number of actions a team can have each turn?
 * @default 99
 *
 * @param MinActions:num
 * @text Minimum Actions
 * @parent ActionGeneration
 * @type number
 * @desc What is the bare minimum number of actions a team can have each turn?
 * @default 1
 *
 * @param AllowOverflow:eval
 * @text Allow Overflow?
 * @parent ActionGeneration
 * @type boolean
 * @on Allow
 * @off Cap to Max
 * @desc Allow current actions to overflow?
 * Or let them cap at the current team max?
 * @default false
 *
 * @param DefaultCost
 * @text Default Action Costs
 *
 * @param DefaultCostSkill:num
 * @text Skills
 * @parent DefaultCost
 * @type number
 * @desc What is the default action cost for skills?
 * @default 1
 *
 * @param DefaultCostItem:num
 * @text Items
 * @parent DefaultCost
 * @type number
 * @desc What is the default action cost for items?
 * @default 1
 * 
 */
/* ----------------------------------------------------------------------------
 * Action Count Display Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionCountDisplay:
 *
 * @param Display
 * @text Display Settings
 *
 * @param DrawHorz:eval
 * @text Draw Horizontally?
 * @parent Display
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Which direction do you want the Action Count Display to go?
 * @default true
 *
 * @param BottomPosition:eval
 * @text Bottom Position?
 * @parent Display
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Place the Action Count Display towards the bottom of the screen?
 * @default true
 *
 * @param LogWindowTopOffsetY:num
 * @text Offset Top Log Y?
 * @parent BottomPosition:eval
 * @type number
 * @desc If using the top position, offset the log window's Y position.
 * @default 40
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent BottomPosition:eval
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If using the top position, reposition the display when the help window is open?
 * @default true
 *
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 160
 *
 * @param Pictures
 * @text Picture Settings
 *
 * @param ActorActionPicture:str
 * @text Actor Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an actor action instead of an icon?
 * @default 
 *
 * @param EnemyActionPicture:str
 * @text Enemy Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an enemy action instead of an icon?
 * @default 
 *
 * @param EmptyActionPicture:str
 * @text Empty Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an empty action instead of an icon?
 * @default 
 *
 * @param Coordinates
 *
 * @param ScreenBufferX:num
 * @text Screen Buffer X
 * @parent Coordinates
 * @desc Buffer from the the edge of the screen's X by this much.
 * @default 16
 *
 * @param ScreenBufferY:num
 * @text Screen Buffer Y
 * @parent Coordinates
 * @desc Buffer from the the edge of the screen's Y by this much.
 * @default 16
 *
 * @param ActorOffsetX:num
 * @text Actor Offset X
 * @parent Coordinates
 * @desc Offset the actor images' X by this much.
 * @default 0
 *
 * @param ActorOffsetY:num
 * @text Actor Offset Y
 * @parent Coordinates
 * @desc Offset the actor images' Y by this much.
 * @default 0
 *
 * @param EnemyOffsetX:num
 * @text Enemy Offset X
 * @parent Coordinates
 * @desc Offset the enemy images' X by this much.
 * @default 0
 *
 * @param EnemyOffsetY:num
 * @text Enemy Offset Y
 * @parent Coordinates
 * @desc Offset the enemy images' Y by this much.
 * @default 0
 *
 * @param DrawSettings
 * @text Draw Settings
 *
 * @param MaxVisible:num
 * @text Max Actions Visible
 * @parent DrawSettings
 * @desc How many action slots max should be drawn for each team?
 * @default 10
 *
 * @param ImageSize:num
 * @text Image Size
 * @parent DrawSettings
 * @desc What is the size of the icons or pictures for the action slots?
 * @default 32
 *
 * @param ImageGapDistance:num
 * @text Gap Distance
 * @parent DrawSettings
 * @desc How wide should the gab between each slot be in pixels?
 * @default 2
 *
 * @param IconSmoothing:eval
 * @text Icon Smoothing?
 * @parent DrawSettings
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Smooth the display for icons?
 * Or pixelate them?
 * @default false
 *
 * @param PictureSmoothing:eval
 * @text Picture Smoothing?
 * @parent DrawSettings
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Smooth the display for pictures?
 * Or pixelate them?
 * @default true
 *
 * @param TurnsRemaining
 * @text Turns Remaining
 *
 * @param DrawActionsRemaining:eval
 * @text Show Number?
 * @parent TurnsRemaining
 * @type boolean
 * @on Show Number
 * @off Don't Show
 * @desc Show a number to display the actions remaining?
 * @default true
 *
 * @param ActionsRemainingFontSize:num
 * @text Font Size
 * @parent DrawActionsRemaining:eval
 * @desc What font size should be used for this number?
 * @default 26
 *
 * @param ActionsRemainingOffsetX:num
 * @text Offset X
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining actions number X.
 * @default 0
 *
 * @param ActionsRemainingOffsetY:num
 * @text Offset Y
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining actions number Y.
 * @default 0
 *
 */
//=============================================================================

const _0x15a739=_0xfd68;(function(_0x21df8b,_0x4776a9){const _0x1f2c48=_0xfd68,_0x7818d7=_0x21df8b();while(!![]){try{const _0x11bd5d=-parseInt(_0x1f2c48(0x1d7))/0x1*(-parseInt(_0x1f2c48(0x1d5))/0x2)+parseInt(_0x1f2c48(0x285))/0x3+-parseInt(_0x1f2c48(0x2e4))/0x4*(-parseInt(_0x1f2c48(0x24a))/0x5)+-parseInt(_0x1f2c48(0x288))/0x6+parseInt(_0x1f2c48(0x181))/0x7*(parseInt(_0x1f2c48(0x24c))/0x8)+-parseInt(_0x1f2c48(0x10c))/0x9*(-parseInt(_0x1f2c48(0x27e))/0xa)+parseInt(_0x1f2c48(0x268))/0xb*(-parseInt(_0x1f2c48(0x21e))/0xc);if(_0x11bd5d===_0x4776a9)break;else _0x7818d7['push'](_0x7818d7['shift']());}catch(_0x1c5b18){_0x7818d7['push'](_0x7818d7['shift']());}}}(_0x25db,0x6ac5b));var label=_0x15a739(0x2fc),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x15a739(0x2c4)](function(_0x2cc635){const _0x328932=_0x15a739;return _0x2cc635[_0x328932(0x175)]&&_0x2cc635[_0x328932(0x29e)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x4524f1,_0x10da07){const _0x48397b=_0x15a739;for(const _0x440128 in _0x10da07){if(_0x440128[_0x48397b(0x263)](/(.*):(.*)/i)){if(_0x48397b(0x21c)===_0x48397b(0x1e7))_0x58b31e['BattleSystemFTB'][_0x48397b(0x1e5)][_0x48397b(0x1cc)](this,_0x59d2d1,_0x50b5dc),this['friendsUnit']()[_0x48397b(0x304)]();else{const _0x4dfa1a=String(RegExp['$1']),_0x2828fc=String(RegExp['$2'])[_0x48397b(0x165)]()[_0x48397b(0x166)]();let _0x351c91,_0x55a458,_0x3be40a;switch(_0x2828fc){case _0x48397b(0x2ca):_0x351c91=_0x10da07[_0x440128]!==''?Number(_0x10da07[_0x440128]):0x0;break;case _0x48397b(0x2dc):_0x55a458=_0x10da07[_0x440128]!==''?JSON[_0x48397b(0x2f3)](_0x10da07[_0x440128]):[],_0x351c91=_0x55a458[_0x48397b(0x20a)](_0x20ebf4=>Number(_0x20ebf4));break;case _0x48397b(0x23c):_0x351c91=_0x10da07[_0x440128]!==''?eval(_0x10da07[_0x440128]):null;break;case _0x48397b(0x179):_0x55a458=_0x10da07[_0x440128]!==''?JSON[_0x48397b(0x2f3)](_0x10da07[_0x440128]):[],_0x351c91=_0x55a458[_0x48397b(0x20a)](_0x173d2=>eval(_0x173d2));break;case'JSON':_0x351c91=_0x10da07[_0x440128]!==''?JSON['parse'](_0x10da07[_0x440128]):'';break;case'ARRAYJSON':_0x55a458=_0x10da07[_0x440128]!==''?JSON['parse'](_0x10da07[_0x440128]):[],_0x351c91=_0x55a458[_0x48397b(0x20a)](_0x43fa95=>JSON[_0x48397b(0x2f3)](_0x43fa95));break;case _0x48397b(0x23f):_0x351c91=_0x10da07[_0x440128]!==''?new Function(JSON['parse'](_0x10da07[_0x440128])):new Function(_0x48397b(0x2e5));break;case _0x48397b(0x25c):_0x55a458=_0x10da07[_0x440128]!==''?JSON[_0x48397b(0x2f3)](_0x10da07[_0x440128]):[],_0x351c91=_0x55a458['map'](_0x508da6=>new Function(JSON[_0x48397b(0x2f3)](_0x508da6)));break;case _0x48397b(0x241):_0x351c91=_0x10da07[_0x440128]!==''?String(_0x10da07[_0x440128]):'';break;case _0x48397b(0x261):_0x55a458=_0x10da07[_0x440128]!==''?JSON[_0x48397b(0x2f3)](_0x10da07[_0x440128]):[],_0x351c91=_0x55a458[_0x48397b(0x20a)](_0x221b49=>String(_0x221b49));break;case _0x48397b(0x19b):_0x3be40a=_0x10da07[_0x440128]!==''?JSON[_0x48397b(0x2f3)](_0x10da07[_0x440128]):{},_0x351c91=VisuMZ[_0x48397b(0x145)]({},_0x3be40a);break;case _0x48397b(0x162):_0x55a458=_0x10da07[_0x440128]!==''?JSON[_0x48397b(0x2f3)](_0x10da07[_0x440128]):[],_0x351c91=_0x55a458['map'](_0x5c26bb=>VisuMZ['ConvertParams']({},JSON['parse'](_0x5c26bb)));break;default:continue;}_0x4524f1[_0x4dfa1a]=_0x351c91;}}}return _0x4524f1;},(_0x411695=>{const _0x4ed4f2=_0x15a739,_0x10e481=_0x411695[_0x4ed4f2(0x23b)];for(const _0x5563f0 of dependencies){if(!Imported[_0x5563f0]){alert(_0x4ed4f2(0x27d)[_0x4ed4f2(0x275)](_0x10e481,_0x5563f0)),SceneManager[_0x4ed4f2(0x1e1)]();break;}}const _0x57f0dc=_0x411695['description'];if(_0x57f0dc[_0x4ed4f2(0x263)](/\[Version[ ](.*?)\]/i)){const _0x32679f=Number(RegExp['$1']);_0x32679f!==VisuMZ[label][_0x4ed4f2(0x1a7)]&&('ChcGq'===_0x4ed4f2(0x247)?this[_0x4ed4f2(0x169)]():(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x4ed4f2(0x275)](_0x10e481,_0x32679f)),SceneManager['exit']()));}if(_0x57f0dc[_0x4ed4f2(0x263)](/\[Tier[ ](\d+)\]/i)){if(_0x4ed4f2(0x2c2)===_0x4ed4f2(0x2c2)){const _0x547e67=Number(RegExp['$1']);_0x547e67<tier?(alert(_0x4ed4f2(0x2d7)[_0x4ed4f2(0x275)](_0x10e481,_0x547e67,tier)),SceneManager['exit']()):tier=Math[_0x4ed4f2(0x197)](_0x547e67,tier);}else{_0x548b49=this[_0x4ed4f2(0x1b7)]-_0x16d8c5-_0x11765e[_0x4ed4f2(0x2ff)]-_0x33c3a5,_0x2eaed9=_0x2da8e4?this[_0x4ed4f2(0x26a)]-_0x27eab[_0x4ed4f2(0x1b4)]-_0x338583:_0x19c7cb[_0x4ed4f2(0x1b4)];if(_0x52fda9&&_0x59a614)_0x70de18-=_0x3a694a;else!_0x1a1608&&(_0x28391f-=_0x35543d);}}VisuMZ[_0x4ed4f2(0x145)](VisuMZ[label][_0x4ed4f2(0x1cd)],_0x411695['parameters']);})(pluginData),PluginManager[_0x15a739(0x1c8)](pluginData[_0x15a739(0x23b)],_0x15a739(0x1c9),_0x5ab3eb=>{const _0x28121e=_0x15a739;VisuMZ[_0x28121e(0x145)](_0x5ab3eb,_0x5ab3eb);const _0x31000d=_0x5ab3eb[_0x28121e(0x1b0)];$gameSystem[_0x28121e(0x250)](_0x31000d);}),VisuMZ['BattleSystemFTB'][_0x15a739(0x205)]={'ActionPointCost':/<FTB (?:FP|ACTION) COST:[ ](\d+)>/i,'HideActionPointCost':/<FTB HIDE (?:FP|ACTION) COST>/i,'ShowActionPointCost':/<FTB SHOW (?:FP|ACTION) COST>/i,'PassTurn':/<FTB PASS TURN>/i,'ActionPointTraitPlus':/<FTB (?:FP|ACTION|ACTIONS):[ ]([\+\-]\d+)>/i},DataManager[_0x15a739(0x1f4)]=function(_0x292494){const _0x1d3c25=_0x15a739;if(!_0x292494)return 0x0;const _0x1efb06=VisuMZ[_0x1d3c25(0x2fc)][_0x1d3c25(0x1cd)][_0x1d3c25(0x157)],_0x32582c=VisuMZ[_0x1d3c25(0x2fc)]['RegExp'],_0x5f3753=_0x292494[_0x1d3c25(0xf1)];if(_0x5f3753[_0x1d3c25(0x263)](_0x32582c[_0x1d3c25(0x178)])){if(_0x1d3c25(0x257)===_0x1d3c25(0x1d0))_0x440d64['setTarget'](this[_0x1d3c25(0x2ce)]);else return Number(RegExp['$1']);}else{if(DataManager[_0x1d3c25(0x2b2)](_0x292494)){if(_0x1d3c25(0x174)===_0x1d3c25(0x21f))_0x1f3169[_0x1d3c25(0x2fc)]['Game_Actor_changeEquip'][_0x1d3c25(0x1cc)](this,_0x5b9521,_0x2da233),this[_0x1d3c25(0x25b)]()[_0x1d3c25(0x304)]();else return _0x1efb06[_0x1d3c25(0x140)];}else return DataManager[_0x1d3c25(0x18e)](_0x292494)?_0x1efb06[_0x1d3c25(0x211)]:0x0;}},ImageManager[_0x15a739(0xfd)]=VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1cd)][_0x15a739(0x269)][_0x15a739(0x15a)],ImageManager[_0x15a739(0x298)]=VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1cd)][_0x15a739(0x269)][_0x15a739(0x1e9)],ImageManager[_0x15a739(0x1c4)]=VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1cd)]['General'][_0x15a739(0x1af)],TextManager[_0x15a739(0x14b)]=VisuMZ['BattleSystemFTB'][_0x15a739(0x1cd)][_0x15a739(0x269)][_0x15a739(0x276)],TextManager['ftbActionPointsAbbr']=VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1cd)][_0x15a739(0x269)][_0x15a739(0xf2)],TextManager[_0x15a739(0x1ca)]=VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1cd)]['General'][_0x15a739(0x1bc)],TextManager[_0x15a739(0x16b)]=VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1cd)][_0x15a739(0x269)][_0x15a739(0x180)],TextManager[_0x15a739(0x1dd)]=VisuMZ[_0x15a739(0x2fc)]['Settings'][_0x15a739(0x269)]['TroopTeamShiftFmt'],SceneManager[_0x15a739(0x297)]=function(){const _0x474cf7=_0x15a739;return this[_0x474cf7(0x1fd)]&&this['_scene'][_0x474cf7(0x27b)]===Scene_Battle;},BattleManager[_0x15a739(0x15d)]=VisuMZ[_0x15a739(0x2fc)]['Settings']['Mechanics'][_0x15a739(0x2a4)],BattleManager['_FTB_KEEP_PREV_ACTOR']=VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1cd)][_0x15a739(0x157)][_0x15a739(0x24e)],BattleManager[_0x15a739(0x1a1)]=VisuMZ['BattleSystemFTB']['Settings'][_0x15a739(0x157)][_0x15a739(0x1f8)]??![],BattleManager[_0x15a739(0x2bd)]=VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1cd)][_0x15a739(0x157)][_0x15a739(0x2fa)],BattleManager[_0x15a739(0x222)]=VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1cd)][_0x15a739(0x157)]['GainDiff'],BattleManager[_0x15a739(0x281)]=VisuMZ[_0x15a739(0x2fc)]['Settings'][_0x15a739(0x157)]['LoseDiff'],BattleManager[_0x15a739(0x193)]=VisuMZ[_0x15a739(0x2fc)]['Settings'][_0x15a739(0x157)][_0x15a739(0x21d)],BattleManager[_0x15a739(0x1be)]=VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1cd)][_0x15a739(0x269)][_0x15a739(0x2a8)],BattleManager[_0x15a739(0x26b)]=VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1cd)][_0x15a739(0x157)][_0x15a739(0x2c7)],VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x217)]=BattleManager[_0x15a739(0x12c)],BattleManager['battleSys']=function(){const _0x540cfa=_0x15a739;if(this['isFTB']())return _0x540cfa(0x287);return VisuMZ['BattleSystemFTB']['BattleManager_battleSys'][_0x540cfa(0x1cc)](this);},BattleManager[_0x15a739(0x172)]=function(){const _0x272bac=_0x15a739;return $gameSystem[_0x272bac(0x18b)]()===_0x272bac(0x287);},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x155)]=BattleManager[_0x15a739(0x14c)],BattleManager['isTpb']=function(){const _0x1560d1=_0x15a739;if(this[_0x1560d1(0x172)]())return![];return VisuMZ[_0x1560d1(0x2fc)]['BattleManager_isTpb'][_0x1560d1(0x1cc)](this);},VisuMZ['BattleSystemFTB'][_0x15a739(0x2f9)]=BattleManager['isActiveTpb'],BattleManager[_0x15a739(0x14d)]=function(){const _0x42bdc0=_0x15a739;if(this[_0x42bdc0(0x172)]())return![];return VisuMZ[_0x42bdc0(0x2fc)]['BattleManager_isActiveTpb']['call'](this);},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1da)]=BattleManager['isTurnBased'],BattleManager[_0x15a739(0x215)]=function(){const _0x2ad49e=_0x15a739;if(this[_0x2ad49e(0x172)]())return!![];return VisuMZ[_0x2ad49e(0x2fc)][_0x2ad49e(0x1da)][_0x2ad49e(0x1cc)](this);},VisuMZ[_0x15a739(0x2fc)]['BattleManager_isTeamBased']=BattleManager[_0x15a739(0x1df)],BattleManager[_0x15a739(0x1df)]=function(){const _0x17d98b=_0x15a739;if(this[_0x17d98b(0x172)]())return!![];return VisuMZ['BattleSystemFTB'][_0x17d98b(0x2c3)]['call'](this);},VisuMZ[_0x15a739(0x2fc)]['BattleManager_startInput']=BattleManager['startInput'],BattleManager[_0x15a739(0x2f0)]=function(){const _0x2ce9c7=_0x15a739;if(this[_0x2ce9c7(0x172)]())this[_0x2ce9c7(0x188)]=![];VisuMZ['BattleSystemFTB'][_0x2ce9c7(0x11a)][_0x2ce9c7(0x1cc)](this);if(this[_0x2ce9c7(0x172)]()&&$gameParty[_0x2ce9c7(0x1b6)]())this['startInputFTB']();},BattleManager[_0x15a739(0x103)]=function(){const _0xb25a79=_0x15a739;this[_0xb25a79(0x206)]();},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x220)]=BattleManager[_0x15a739(0x2e6)],BattleManager[_0x15a739(0x2e6)]=function(){const _0x45f767=_0x15a739;this['isFTB']()?this['processTurnFTB']():VisuMZ['BattleSystemFTB'][_0x45f767(0x220)]['call'](this);},BattleManager[_0x15a739(0x293)]=function(){const _0x435bff=_0x15a739,_0x3db316=this[_0x435bff(0x16e)];if(_0x3db316&&!_0x3db316[_0x435bff(0x25b)]()[_0x435bff(0x13d)]())this[_0x435bff(0x2c9)](),this['_subject']=null,this[_0x435bff(0x17d)](![]);else{if(_0x3db316&&_0x3db316[_0x435bff(0x10d)]()&&_0x3db316[_0x435bff(0x1b6)]()){if(_0x435bff(0x25d)!==_0x435bff(0x25d))this['_ftbTurnAdvantageUnit']='enemies';else{const _0x34f714=_0x3db316[_0x435bff(0x115)]();if(!_0x34f714)VisuMZ[_0x435bff(0x2fc)][_0x435bff(0x220)]['call'](this);else _0x34f714[_0x435bff(0x12e)]?_0x435bff(0x28e)!=='EELoK'?VisuMZ['BattleSystemFTB'][_0x435bff(0x220)][_0x435bff(0x1cc)](this):this[_0x435bff(0x1b9)](![]):(this[_0x435bff(0x224)]=_0x3db316,this[_0x435bff(0x213)]());}}else VisuMZ['BattleSystemFTB'][_0x435bff(0x220)]['call'](this);}},VisuMZ[_0x15a739(0x2fc)]['BattleManager_finishActorInput']=BattleManager['finishActorInput'],BattleManager[_0x15a739(0x1bf)]=function(){const _0x137f9a=_0x15a739;this[_0x137f9a(0x172)]()?VisuMZ[_0x137f9a(0x2fc)][_0x137f9a(0x220)][_0x137f9a(0x1cc)](this):'fndfj'===_0x137f9a(0x1e8)?(_0x2a8822['BattleSystemFTB'][_0x137f9a(0x14f)][_0x137f9a(0x1cc)](this,_0x2c48ea),this[_0x137f9a(0x25b)]()[_0x137f9a(0x304)]()):VisuMZ[_0x137f9a(0x2fc)]['BattleManager_finishActorInput'][_0x137f9a(0x1cc)](this);},VisuMZ['BattleSystemFTB'][_0x15a739(0x264)]=BattleManager[_0x15a739(0x2cc)],BattleManager[_0x15a739(0x2cc)]=function(){const _0x5a1990=_0x15a739;this['isFTB']()?this[_0x5a1990(0x169)]():VisuMZ[_0x5a1990(0x2fc)][_0x5a1990(0x264)][_0x5a1990(0x1cc)](this);},BattleManager[_0x15a739(0x169)]=function(){const _0x2096cb=_0x15a739;this[_0x2096cb(0x224)]=null,this['_inputting']=![];},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x305)]=BattleManager[_0x15a739(0x2c9)],BattleManager[_0x15a739(0x2c9)]=function(){const _0x32fcdd=_0x15a739,_0x4d0d42=this[_0x32fcdd(0x16e)];VisuMZ[_0x32fcdd(0x2fc)]['BattleManager_endAction'][_0x32fcdd(0x1cc)](this),this[_0x32fcdd(0x195)](_0x4d0d42);},BattleManager[_0x15a739(0x195)]=function(_0x1a05d5){const _0x96131c=_0x15a739;if(!this[_0x96131c(0x172)]())return;if(_0x1a05d5){if('wjLRp'!==_0x96131c(0x240))this['ftbSwitchActorDirection'](!![]);else{const _0x41fe3c=_0x1a05d5[_0x96131c(0x289)][_0x96131c(0x2c4)](_0x30a34b=>_0x30a34b[_0x96131c(0x12e)]);_0x1a05d5[_0x96131c(0x18f)]();if(_0x41fe3c){if(_0x96131c(0x122)==='kMjjd')_0x3a96b3-=_0x472c57;else{let _0x14c157=_0x41fe3c[_0x96131c(0x1a4)];while(_0x14c157--){_0x96131c(0xf5)==='PSciK'?_0x1a05d5['_actions'][_0x96131c(0x1f7)]():_0x591e41[_0x96131c(0x2fc)]['Game_Battler_forceAction'][_0x96131c(0x1cc)](this,_0x55cf3a,_0x3fa58c);}_0x1a05d5[_0x96131c(0x289)]=_0x41fe3c[_0x96131c(0x2be)](_0x1a05d5[_0x96131c(0x289)]);}}}}if(this[_0x96131c(0x131)][_0x96131c(0x1a4)]>0x0)this[_0x96131c(0x16e)]&&(!this[_0x96131c(0x232)]['includes'](this[_0x96131c(0x16e)])&&this[_0x96131c(0x232)][_0x96131c(0x21a)](this[_0x96131c(0x16e)])),this[_0x96131c(0x16e)]=this[_0x96131c(0x296)]();else this[_0x96131c(0xf4)](_0x1a05d5)&&(_0x96131c(0x216)===_0x96131c(0x1fa)?_0x183b69[_0x96131c(0x172)]()?this[_0x96131c(0x1d6)]():_0x59f408[_0x96131c(0x2fc)][_0x96131c(0x218)][_0x96131c(0x1cc)](this):this['_subject']=_0x1a05d5);_0x1a05d5[_0x96131c(0x25b)]()['setLastFtbIndex'](_0x1a05d5);},BattleManager[_0x15a739(0xf4)]=function(_0x1ddcd4){const _0x5ac5b0=_0x15a739;if(!_0x1ddcd4)return![];if(!_0x1ddcd4['isActor']())return![];if(!_0x1ddcd4['canMove']())return![];if(!_0x1ddcd4[_0x5ac5b0(0x1b6)]())return![];if(_0x1ddcd4[_0x5ac5b0(0x236)]())return![];return BattleManager['_FTB_FREE_CHANGE']&&BattleManager[_0x5ac5b0(0x2ea)];},VisuMZ['BattleSystemFTB'][_0x15a739(0x262)]=BattleManager[_0x15a739(0x23d)],BattleManager[_0x15a739(0x23d)]=function(){const _0x5c4821=_0x15a739;VisuMZ['BattleSystemFTB'][_0x5c4821(0x262)][_0x5c4821(0x1cc)](this),this[_0x5c4821(0x244)]();},BattleManager[_0x15a739(0x244)]=function(){const _0x532762=_0x15a739;if(!this[_0x532762(0x172)]())return;if(this[_0x532762(0x2df)])this[_0x532762(0x170)]='actors';else this['_surprise']?'UtUzb'===_0x532762(0x1e0)?(_0x36f540[_0x532762(0x2fc)]['Game_Battler_performCollapse'][_0x532762(0x1cc)](this),_0x358a9b[_0x532762(0x253)](),this[_0x532762(0x25b)]()['recalculateActionsFTB']()):this[_0x532762(0x170)]=_0x532762(0x26e):_0x532762(0x259)===_0x532762(0x118)?_0x541dc6=_0x941b5+this[_0x532762(0x1b5)]()+_0x3d8d0b:this[_0x532762(0x170)]=BattleManager[_0x532762(0x193)];this[_0x532762(0x170)]=this['_ftbTurnAdvantageUnit']||'random';let _0x413f82=0x0,_0x36b609=0x0;switch(this['_ftbTurnAdvantageUnit']['toLowerCase']()[_0x532762(0x166)]()){case _0x532762(0x1eb):let _0x5d59c1=['actors',_0x532762(0x26e)];this[_0x532762(0x170)]=_0x5d59c1[Math['randomInt'](_0x5d59c1[_0x532762(0x1a4)])];break;case'player':this[_0x532762(0x170)]=_0x532762(0x132);break;case _0x532762(0x2d0):this[_0x532762(0x170)]=_0x532762(0x26e);break;case'lowest\x20agi':_0x413f82=$gameParty[_0x532762(0x2a6)](),_0x36b609=$gameTroop['ftbLowestAgility'](),this[_0x532762(0x170)]=_0x413f82>=_0x36b609?_0x532762(0x132):_0x532762(0x26e);break;case'average\x20agi':_0x413f82=$gameParty['agility'](),_0x36b609=$gameTroop[_0x532762(0x2e8)](),this['_ftbTurnAdvantageUnit']=_0x413f82>=_0x36b609?_0x532762(0x132):_0x532762(0x26e);break;case _0x532762(0x28d):_0x413f82=$gameParty[_0x532762(0x1ad)](),_0x36b609=$gameTroop[_0x532762(0x1ad)](),this[_0x532762(0x170)]=_0x413f82>=_0x36b609?_0x532762(0x132):'enemies';break;case _0x532762(0x184):_0x413f82=$gameParty[_0x532762(0x13e)](),_0x36b609=$gameTroop[_0x532762(0x13e)](),this[_0x532762(0x170)]=_0x413f82>=_0x36b609?_0x532762(0x132):_0x532762(0x26e);break;}this[_0x532762(0x190)]=this[_0x532762(0x170)]==='actors'?$gameParty:$gameTroop,this['_ftbTeamEven']=this['_ftbTurnAdvantageUnit']==='actors'?$gameTroop:$gameParty;},VisuMZ[_0x15a739(0x2fc)]['BattleManager_makeActionOrders']=BattleManager[_0x15a739(0x11d)],BattleManager[_0x15a739(0x11d)]=function(){const _0x2821da=_0x15a739;this[_0x2821da(0x172)]()?this['makeActionOrdersFTB']():VisuMZ[_0x2821da(0x2fc)][_0x2821da(0x194)][_0x2821da(0x1cc)](this);},BattleManager[_0x15a739(0x278)]=function(){const _0x3fcc33=_0x15a739;let _0x3de7e8=[],_0x1e0091=[],_0x23555c=0x0;const _0x4f79c1=$gameTroop[_0x3fcc33(0x212)]();let _0x35d568=_0x4f79c1%0x2===0x0?this[_0x3fcc33(0x106)]:this[_0x3fcc33(0x190)];this[_0x3fcc33(0x1bd)]=_0x35d568;if(_0x35d568===$gameParty){if(_0x3fcc33(0x191)===_0x3fcc33(0x2a1))this['forceActionFTB'](_0x32d4bb);else{let _0x50b8b5=$gameParty[_0x3fcc33(0x110)]()[_0x3fcc33(0x2c4)](_0x384fd4=>_0x384fd4[_0x3fcc33(0x161)]()&&!_0x384fd4['canInput']()),_0x5aaac5=$gameParty[_0x3fcc33(0x110)]()[_0x3fcc33(0x2c4)](_0x4c2d8f=>_0x4c2d8f[_0x3fcc33(0x161)]()&&_0x4c2d8f[_0x3fcc33(0x1b6)]());_0x3de7e8=_0x3de7e8[_0x3fcc33(0x2be)](_0x50b8b5),_0x23555c=Game_Unit[_0x3fcc33(0x258)];while(_0x23555c--){_0x3fcc33(0x2bb)!==_0x3fcc33(0x2fd)?_0x3de7e8=_0x3de7e8[_0x3fcc33(0x2be)](_0x5aaac5):this[_0x3fcc33(0x17a)](_0x30322b,_0x3d593f);}_0x23555c=Game_Unit['_FTB_MAX_ACTIONS']-0x1;while(_0x23555c--){'dxBxP'!=='NkAbU'?_0x3de7e8=_0x3de7e8['concat'](_0x50b8b5):this[_0x3fcc33(0x172)]()?_0x10f6b9[_0x3fcc33(0x2fc)][_0x3fcc33(0x220)][_0x3fcc33(0x1cc)](this):_0x2f86a5['BattleSystemFTB'][_0x3fcc33(0x17f)][_0x3fcc33(0x1cc)](this);}}}if(_0x35d568===$gameTroop){let _0x1f5269=$gameTroop['ftbAliveMembers']()[_0x3fcc33(0x2c4)](_0xf4ec61=>_0xf4ec61[_0x3fcc33(0x161)]());$gameSystem[_0x3fcc33(0x2bf)]()?_0x1f5269[_0x3fcc33(0x151)]((_0x215a92,_0x368242)=>_0x368242['screenX']()-_0x215a92[_0x3fcc33(0x125)]()):_0x1f5269[_0x3fcc33(0x151)]((_0x22e19c,_0x11163d)=>_0x22e19c[_0x3fcc33(0x125)]()-_0x11163d[_0x3fcc33(0x125)]());_0x23555c=Game_Unit[_0x3fcc33(0x258)];while(_0x23555c--){_0x1e0091=_0x1e0091['concat'](_0x1f5269);}$gameTroop[_0x3fcc33(0x18f)]();}this[_0x3fcc33(0x232)]=_0x3de7e8['concat'](_0x1e0091);},BattleManager[_0x15a739(0x253)]=function(){const _0x413286=_0x15a739;if(!this[_0x413286(0x172)]())return;this[_0x413286(0x232)]=this[_0x413286(0x232)]||[],this[_0x413286(0x232)]=this[_0x413286(0x232)][_0x413286(0x2c4)](_0x491bb3=>_0x491bb3['canMove']()&&!_0x491bb3['isPassingTurnFTB']());},VisuMZ[_0x15a739(0x2fc)]['BattleManager_setup']=BattleManager[_0x15a739(0x2da)],BattleManager[_0x15a739(0x2da)]=function(_0x3eeb13,_0x2c1b1e,_0x2f9c62){const _0x2d23b4=_0x15a739;VisuMZ[_0x2d23b4(0x2fc)][_0x2d23b4(0x2c6)][_0x2d23b4(0x1cc)](this,_0x3eeb13,_0x2c1b1e,_0x2f9c62),this[_0x2d23b4(0x230)]();},BattleManager['initMembersFTB']=function(){const _0x1ce06d=_0x15a739;if(!BattleManager['isFTB']())return;this[_0x1ce06d(0x1bd)]=undefined,$gameParty[_0x1ce06d(0x1c7)](),$gameTroop['startTurnFTB']();},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x17e)]=BattleManager[_0x15a739(0x206)],BattleManager[_0x15a739(0x206)]=function(){const _0x55be42=_0x15a739;this['startTurnFTB'](),VisuMZ['BattleSystemFTB'][_0x55be42(0x17e)][_0x55be42(0x1cc)](this),this[_0x55be42(0x2b0)]();},BattleManager[_0x15a739(0x1c7)]=function(){const _0x16d075=_0x15a739;if(!BattleManager[_0x16d075(0x172)]())return;$gameParty[_0x16d075(0x1d2)](),$gameTroop[_0x16d075(0x1d2)]();const _0x240880=$gameTroop[_0x16d075(0x212)]()+0x1;let _0x5c75bc=_0x240880%0x2===0x0?this[_0x16d075(0x106)]:this[_0x16d075(0x190)],_0xfbe569=_0x240880%0x2===0x0?this['_ftbTeamOdd']:this[_0x16d075(0x106)];_0x240880>0x1&&_0xfbe569[_0x16d075(0x2cd)](),_0x5c75bc[_0x16d075(0x2d9)](),_0x5c75bc[_0x16d075(0x1c7)]();},VisuMZ[_0x15a739(0x2fc)]['BattleManager_endTurn']=BattleManager[_0x15a739(0x272)],BattleManager[_0x15a739(0x272)]=function(){const _0x489c9e=_0x15a739;VisuMZ[_0x489c9e(0x2fc)][_0x489c9e(0x210)][_0x489c9e(0x1cc)](this),this[_0x489c9e(0x109)]();},BattleManager[_0x15a739(0x109)]=function(){const _0x4d3722=_0x15a739;if(!BattleManager[_0x4d3722(0x172)]())return;},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x228)]=BattleManager[_0x15a739(0x16f)],BattleManager[_0x15a739(0x16f)]=function(){const _0xe47a85=_0x15a739;if(this[_0xe47a85(0x172)]())return;VisuMZ[_0xe47a85(0x2fc)]['BattleManager_endAllBattlersTurn'][_0xe47a85(0x1cc)](this);},BattleManager[_0x15a739(0x2b0)]=function(){const _0x5e4b51=_0x15a739;if(!BattleManager[_0x5e4b51(0x172)]())return;let _0x16fae5='';if(this[_0x5e4b51(0x1bd)]===$gameParty){if(_0x5e4b51(0x229)!==_0x5e4b51(0x1d4)){let _0x363b51=$gameParty[_0x5e4b51(0x23b)]();_0x16fae5=TextManager[_0x5e4b51(0x16b)][_0x5e4b51(0x275)](_0x363b51);}else _0x55b1c1[_0x5e4b51(0x100)](_0x1cc421);}else _0x16fae5=TextManager['ftbTroopTeamShift'];if(_0x16fae5!==''){if(_0x5e4b51(0x245)!==_0x5e4b51(0x245)){const _0x36318c=this[_0x5e4b51(0x156)](),_0x55acc6=_0x36318c[this[_0x5e4b51(0x2d2)]];let _0x1f1778=_0x36318c[_0x5e4b51(0x2de)](_0x55acc6)+0x1;if(_0x1f1778>=_0x36318c['length'])_0x1f1778=0x0;this[_0x5e4b51(0x2d2)]=_0x1f1778;}else{this[_0x5e4b51(0x282)]['push'](_0x5e4b51(0x223),_0x16fae5);const _0x552d60=BattleManager[_0x5e4b51(0x1be)];this[_0x5e4b51(0x282)][_0x5e4b51(0x100)](_0x5e4b51(0x1b8),_0x552d60),this[_0x5e4b51(0x282)]['push'](_0x5e4b51(0x300));}}},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x254)]=BattleManager[_0x15a739(0xfb)],BattleManager[_0x15a739(0xfb)]=function(_0x2dd81d,_0x485561){const _0x377393=_0x15a739,_0x55b607=BattleManager[_0x377393(0x172)]();if(_0x55b607)$gameSystem[_0x377393(0x2f6)](_0x377393(0x15b));VisuMZ['BattleSystemFTB'][_0x377393(0x254)][_0x377393(0x1cc)](this,_0x2dd81d,_0x485561);if(_0x55b607)$gameSystem['setBattleSystem'](_0x377393(0x287));},VisuMZ[_0x15a739(0x2fc)]['Game_System_initialize']=Game_System[_0x15a739(0x2b7)][_0x15a739(0x124)],Game_System[_0x15a739(0x2b7)][_0x15a739(0x124)]=function(){const _0x3325bd=_0x15a739;VisuMZ[_0x3325bd(0x2fc)]['Game_System_initialize'][_0x3325bd(0x1cc)](this),this[_0x3325bd(0x280)]();},Game_System[_0x15a739(0x2b7)][_0x15a739(0x280)]=function(){const _0x5da50e=_0x15a739;this[_0x5da50e(0x29b)]=!![];},Game_System[_0x15a739(0x2b7)][_0x15a739(0x1d9)]=function(){const _0x45e5ff=_0x15a739;if(BattleManager['_phase']===_0x45e5ff(0x239))return![];return this[_0x45e5ff(0x29b)]===undefined&&this['initBattleSystemFTB'](),this['_ftbActionCountVisible'];},Game_System[_0x15a739(0x2b7)]['setBattleSystemFTBActionCountVisible']=function(_0x151da5){const _0x688d66=_0x15a739;if(this['_ftbActionCountVisible']===undefined){if(_0x688d66(0x22e)!==_0x688d66(0x2f1))this['initBattleSystemFTB']();else{const _0x88cdf2='Nothing';_0x52b5da?_0x45f041[_0x688d66(0x100)](_0x88cdf2):_0x523bc1['unshift'](_0x88cdf2);}}this['_ftbActionCountVisible']=_0x151da5;},VisuMZ[_0x15a739(0x2fc)]['Game_Action_speed']=Game_Action[_0x15a739(0x2b7)]['speed'],Game_Action['prototype']['speed']=function(){const _0x15bc61=_0x15a739;if(BattleManager[_0x15bc61(0x172)]())return 0x0;else{if(_0x15bc61(0x2e1)===_0x15bc61(0x2e1))return VisuMZ[_0x15bc61(0x2fc)][_0x15bc61(0x160)][_0x15bc61(0x1cc)](this);else{const _0x398347=_0x7fc98f[_0x15bc61(0x1fd)][_0x15bc61(0x29c)];if(!_0x398347)return;if(!_0x398347[_0x15bc61(0x266)])return;this[_0x15bc61(0x1bb)]=![];const _0x4748dc=this['index'](),_0x428d36=this[_0x15bc61(0x2a5)]();if(_0x428d36>=0x0){const _0x23d995=_0xf62f9a[_0x15bc61(0x242)]()[_0x4748dc],_0x457bad=_0x14265e[_0x15bc61(0x242)]()[_0x428d36];this[_0x15bc61(0x273)](_0x457bad)&&(_0x428d36===this['index']()&&(this['_doubleTouch']=!![]),this[_0x15bc61(0x29d)](_0x428d36),_0x398347[_0x15bc61(0x2e7)](_0x23d995,_0x457bad));}}}},VisuMZ['BattleSystemFTB']['Game_Action_applyGlobal']=Game_Action['prototype'][_0x15a739(0x1ef)],Game_Action[_0x15a739(0x2b7)][_0x15a739(0x1ef)]=function(){const _0x4134f1=_0x15a739;VisuMZ[_0x4134f1(0x2fc)][_0x4134f1(0x2e3)]['call'](this),this[_0x4134f1(0x26d)]();},Game_Action['prototype'][_0x15a739(0x26d)]=function(){const _0x4d97bd=_0x15a739;if(!BattleManager[_0x4d97bd(0x172)]())return;if(!this[_0x4d97bd(0x1c6)]())return;if(!this['item']())return;this[_0x4d97bd(0x2b2)]()&&this['item']()['id']===this[_0x4d97bd(0x1c6)]()[_0x4d97bd(0x1ff)]()&&(_0x4d97bd(0x1e3)===_0x4d97bd(0x20e)?_0x246889-=this['textWidth'](this[_0x4d97bd(0x1b5)]())+_0x2aa161:BattleManager[_0x4d97bd(0x2bd)]&&this[_0x4d97bd(0x1c6)]()[_0x4d97bd(0x11e)]());const _0x4906b7=VisuMZ[_0x4d97bd(0x2fc)]['RegExp'],_0x10d1c7=this['item']()[_0x4d97bd(0xf1)];_0x10d1c7['match'](_0x4906b7[_0x4d97bd(0x173)])&&this[_0x4d97bd(0x1c6)]()[_0x4d97bd(0x11e)]();},VisuMZ['BattleSystemFTB'][_0x15a739(0x1ba)]=Game_BattlerBase[_0x15a739(0x2b7)][_0x15a739(0x12f)],Game_BattlerBase[_0x15a739(0x2b7)]['hide']=function(){const _0x4376b0=_0x15a739;VisuMZ[_0x4376b0(0x2fc)][_0x4376b0(0x1ba)][_0x4376b0(0x1cc)](this),BattleManager[_0x4376b0(0x253)](),this[_0x4376b0(0x25b)]()['recalculateActionsFTB']();},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x123)]=Game_BattlerBase[_0x15a739(0x2b7)][_0x15a739(0x231)],Game_BattlerBase[_0x15a739(0x2b7)][_0x15a739(0x231)]=function(){const _0x2bea24=_0x15a739;VisuMZ['BattleSystemFTB'][_0x2bea24(0x123)][_0x2bea24(0x1cc)](this),BattleManager[_0x2bea24(0x253)](),this['friendsUnit']()[_0x2bea24(0x304)]();},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x16c)]=Game_Battler[_0x15a739(0x2b7)][_0x15a739(0x113)],Game_Battler[_0x15a739(0x2b7)][_0x15a739(0x113)]=function(){const _0x459578=_0x15a739;VisuMZ['BattleSystemFTB'][_0x459578(0x16c)][_0x459578(0x1cc)](this),BattleManager[_0x459578(0x253)](),this['friendsUnit']()[_0x459578(0x304)]();},Game_BattlerBase[_0x15a739(0x2b7)][_0x15a739(0x11e)]=function(){const _0x48aa39=_0x15a739;this[_0x48aa39(0x283)]=!![],BattleManager[_0x48aa39(0x253)]();},Game_BattlerBase[_0x15a739(0x2b7)][_0x15a739(0x236)]=function(){const _0x371463=_0x15a739;return!!this[_0x371463(0x283)];},Game_BattlerBase[_0x15a739(0x237)]=VisuMZ[_0x15a739(0x2fc)]['Settings'][_0x15a739(0x157)][_0x15a739(0x249)],Game_BattlerBase['_FTB_ACTION_AGI_BUFF']=VisuMZ[_0x15a739(0x2fc)]['Settings'][_0x15a739(0x157)][_0x15a739(0x1c2)],Game_BattlerBase[_0x15a739(0x167)]=VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1cd)][_0x15a739(0x157)]['AgiDebuff'],Game_BattlerBase[_0x15a739(0x2b7)][_0x15a739(0x24d)]=function(){const _0x372623=_0x15a739;let _0x2dcd35=Game_BattlerBase[_0x372623(0x237)];if(this[_0x372623(0x225)]===undefined)this['clearBuffs']();const _0x25b25e=this[_0x372623(0x225)][0x6]||0x0;if(_0x25b25e>0x0&&Game_BattlerBase[_0x372623(0x14a)])_0x2dcd35+=_0x25b25e;else _0x25b25e<0x0&&Game_BattlerBase[_0x372623(0x167)]&&(_0x2dcd35+=_0x25b25e);const _0x586d40=VisuMZ['BattleSystemFTB'][_0x372623(0x205)],_0x1ec1ea=this[_0x372623(0x133)]();for(const _0x1c3d80 of _0x1ec1ea){if('YaEUB'===_0x372623(0x2cb))this['_subject']&&(!this[_0x372623(0x232)][_0x372623(0x2b1)](this[_0x372623(0x16e)])&&this[_0x372623(0x232)][_0x372623(0x21a)](this[_0x372623(0x16e)])),this[_0x372623(0x16e)]=this[_0x372623(0x296)]();else{if(!_0x1c3d80)continue;const _0x168bd3=_0x1c3d80[_0x372623(0xf1)];_0x168bd3[_0x372623(0x263)](_0x586d40[_0x372623(0x22c)])&&(_0x2dcd35+=Number(RegExp['$1']));}}return Math['max'](0x0,_0x2dcd35);},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x2a2)]=Game_BattlerBase[_0x15a739(0x2b7)][_0x15a739(0x25a)],Game_BattlerBase[_0x15a739(0x2b7)][_0x15a739(0x25a)]=function(){VisuMZ['BattleSystemFTB']['Game_BattlerBase_clearStates']['call'](this),this['friendsUnit']()['recalculateActionsFTB']();},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x192)]=Game_BattlerBase[_0x15a739(0x2b7)][_0x15a739(0x2b3)],Game_BattlerBase[_0x15a739(0x2b7)][_0x15a739(0x2b3)]=function(_0x2c6662){const _0x15a999=_0x15a739;if(SceneManager[_0x15a999(0x297)]()&&BattleManager[_0x15a999(0x172)]()){const _0x200d97=DataManager[_0x15a999(0x1f4)](_0x2c6662);if(_0x200d97>this[_0x15a999(0x25b)]()[_0x15a999(0x1fc)]())return![];}return VisuMZ[_0x15a999(0x2fc)][_0x15a999(0x192)]['call'](this,_0x2c6662);},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x10a)]=Game_Battler[_0x15a739(0x2b7)][_0x15a739(0x1ed)],Game_Battler[_0x15a739(0x2b7)][_0x15a739(0x1ed)]=function(_0x3da525){const _0x23bd3a=_0x15a739;VisuMZ['BattleSystemFTB']['Game_Battler_useItem'][_0x23bd3a(0x1cc)](this,_0x3da525),this[_0x23bd3a(0x2ab)](_0x3da525);},Game_Battler[_0x15a739(0x2b7)][_0x15a739(0x2ab)]=function(_0x47b80a){const _0x5c428c=_0x15a739;if(!_0x47b80a)return;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x5c428c(0x172)]())return;const _0x441070=BattleManager[_0x5c428c(0x134)];if(_0x441070&&_0x441070[_0x5c428c(0x12e)])return;const _0x2c32d7=DataManager[_0x5c428c(0x1f4)](_0x47b80a);this[_0x5c428c(0x25b)]()['reduceActionsFTB'](_0x2c32d7);},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x129)]=Game_Battler[_0x15a739(0x2b7)]['onTurnEnd'],Game_Battler['prototype'][_0x15a739(0x1e4)]=function(){const _0x2dd722=_0x15a739;this['_bypassStateTurnUpdatesFTB']=BattleManager[_0x2dd722(0x172)]()&&BattleManager[_0x2dd722(0x26b)],VisuMZ[_0x2dd722(0x2fc)][_0x2dd722(0x129)][_0x2dd722(0x1cc)](this),delete this[_0x2dd722(0x28a)];},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x2bc)]=Game_BattlerBase[_0x15a739(0x2b7)][_0x15a739(0x19a)],Game_BattlerBase[_0x15a739(0x2b7)][_0x15a739(0x19a)]=function(){const _0x4547de=_0x15a739;if(this[_0x4547de(0x28a)])return;VisuMZ['BattleSystemFTB'][_0x4547de(0x2bc)][_0x4547de(0x1cc)](this);},VisuMZ['BattleSystemFTB'][_0x15a739(0x1f9)]=Game_BattlerBase[_0x15a739(0x2b7)]['updateBuffTurns'],Game_BattlerBase[_0x15a739(0x2b7)]['updateBuffTurns']=function(){const _0x5a113e=_0x15a739;if(this[_0x5a113e(0x28a)])return;VisuMZ[_0x5a113e(0x2fc)][_0x5a113e(0x1f9)]['call'](this);},VisuMZ[_0x15a739(0x2fc)]['Game_Battler_addState']=Game_Battler[_0x15a739(0x2b7)][_0x15a739(0x260)],Game_Battler['prototype'][_0x15a739(0x260)]=function(_0x1082f8){const _0x21e402=_0x15a739;VisuMZ[_0x21e402(0x2fc)][_0x21e402(0x20d)]['call'](this,_0x1082f8),this[_0x21e402(0x25b)]()['recalculateActionsFTB']();},VisuMZ['BattleSystemFTB'][_0x15a739(0x14f)]=Game_Battler[_0x15a739(0x2b7)][_0x15a739(0x2c0)],Game_Battler[_0x15a739(0x2b7)][_0x15a739(0x2c0)]=function(_0x24dff7){const _0xe56439=_0x15a739;VisuMZ['BattleSystemFTB'][_0xe56439(0x14f)][_0xe56439(0x1cc)](this,_0x24dff7),this[_0xe56439(0x25b)]()[_0xe56439(0x304)]();},VisuMZ[_0x15a739(0x2fc)]['Game_Battler_addBuff']=Game_Battler[_0x15a739(0x2b7)][_0x15a739(0x290)],Game_Battler[_0x15a739(0x2b7)][_0x15a739(0x290)]=function(_0x2a40f0,_0x25c866){const _0x10406b=_0x15a739;VisuMZ[_0x10406b(0x2fc)][_0x10406b(0x1d8)][_0x10406b(0x1cc)](this,_0x2a40f0,_0x25c866),this[_0x10406b(0x25b)]()[_0x10406b(0x304)]();},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x279)]=Game_Battler['prototype'][_0x15a739(0x176)],Game_Battler[_0x15a739(0x2b7)][_0x15a739(0x176)]=function(_0x388c4f,_0x208fa8){const _0x41402a=_0x15a739;VisuMZ[_0x41402a(0x2fc)]['Game_Battler_addDebuff'][_0x41402a(0x1cc)](this,_0x388c4f,_0x208fa8),this[_0x41402a(0x25b)]()[_0x41402a(0x304)]();},VisuMZ['BattleSystemFTB']['Game_Battler_removeBuff']=Game_Battler[_0x15a739(0x2b7)][_0x15a739(0x1a2)],Game_Battler[_0x15a739(0x2b7)][_0x15a739(0x1a2)]=function(_0x63bf9d){const _0x252e2f=_0x15a739;VisuMZ[_0x252e2f(0x2fc)]['Game_Battler_removeBuff'][_0x252e2f(0x1cc)](this,_0x63bf9d),this[_0x252e2f(0x25b)]()['recalculateActionsFTB']();},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x2af)]=Game_Battler[_0x15a739(0x2b7)][_0x15a739(0x2d5)],Game_Battler['prototype'][_0x15a739(0x2d5)]=function(_0x1b99f4,_0x44e662){const _0x5a78ce=_0x15a739;if(BattleManager[_0x5a78ce(0x172)]()){if(_0x5a78ce(0x1b1)!=='jHqpa')this[_0x5a78ce(0x198)](_0x1b99f4,_0x44e662);else{if(!_0x4b4c31)return;const _0x28bbda=_0x4076e9[_0x5a78ce(0x1cd)],_0x71ffc3=_0x28bbda[_0x5a78ce(0x148)],_0x844709=_0x71ffc3/_0x61c587['width'],_0x56fed5=_0x71ffc3/_0x47dd14[_0x5a78ce(0x1a6)],_0x35af2a=_0x172cee[_0x5a78ce(0x22b)](_0x844709,_0x56fed5,0x1),_0x5e6057=_0x2bff3c[_0x5a78ce(0x1a6)],_0x3ab00e=_0x44dce0[_0x5a78ce(0x1a6)],_0xe2e878=_0x271b20[_0x5a78ce(0xf8)](_0x5e6057*_0x35af2a),_0x327f20=_0x7cf062[_0x5a78ce(0xf8)](_0x3ab00e*_0x35af2a),_0xac14ee=_0x446c50['round'](_0x18fe75+(_0x71ffc3-_0xe2e878)/0x2),_0x132615=_0x924aaf[_0x5a78ce(0xf8)](_0x2b1b83+(_0x71ffc3-_0x327f20)/0x2);this[_0x5a78ce(0x2a3)][_0x5a78ce(0x203)][_0x5a78ce(0x18c)]=_0x28bbda[_0x5a78ce(0x12b)],this[_0x5a78ce(0x2a3)][_0x5a78ce(0x158)](_0x1e71a4,0x0,0x0,_0x5e6057,_0x3ab00e,_0xac14ee,_0x132615,_0xe2e878,_0x327f20),this[_0x5a78ce(0x2a3)]['_context']['imageSmoothingEnabled']=!![],this['canDrawActionsRemaining'](_0x2c04ac)&&this[_0x5a78ce(0x17a)](_0x41be2f,_0x46a72d);}}else'eDnbC'===_0x5a78ce(0x28f)?_0x31cccc[_0x5a78ce(0x172)]()?this[_0x5a78ce(0x1d3)]():_0x37e1f8[_0x5a78ce(0x2fc)]['Scene_Battle_commandFight']['call'](this):VisuMZ[_0x5a78ce(0x2fc)][_0x5a78ce(0x2af)]['call'](this,_0x1b99f4,_0x44e662);},Game_Battler['prototype'][_0x15a739(0x198)]=function(_0x4afef5,_0x41be38){const _0x4bdf0e=_0x15a739,_0x2b88fd=new Game_Action(this,!![]);_0x2b88fd[_0x4bdf0e(0x1dc)](_0x4afef5),_0x2b88fd['_forceAction']=!![];if(_0x41be38===-0x2)_0x2b88fd['setTarget'](this[_0x4bdf0e(0x2ce)]);else _0x41be38===-0x1?_0x2b88fd[_0x4bdf0e(0xfc)]():_0x2b88fd[_0x4bdf0e(0x149)](_0x41be38);this[_0x4bdf0e(0x289)][_0x4bdf0e(0x21a)](_0x2b88fd);},VisuMZ['BattleSystemFTB'][_0x15a739(0x116)]=BattleManager['forceAction'],BattleManager[_0x15a739(0x2d5)]=function(_0x388aca){const _0x1990c1=_0x15a739;if(BattleManager[_0x1990c1(0x172)]()){if(_0x1990c1(0x107)===_0x1990c1(0x233)){const _0x3a63bc=_0x59ab1c[_0x1990c1(0x1f4)](_0xc1af43);if(_0x3a63bc>this[_0x1990c1(0x25b)]()[_0x1990c1(0x1fc)]())return![];}else this[_0x1990c1(0x198)](_0x388aca);}else VisuMZ[_0x1990c1(0x2fc)]['BattleManager_forceAction']['call'](this,_0x388aca);},BattleManager[_0x15a739(0x198)]=function(_0x16bcf5){const _0x318747=_0x15a739,_0x44f44a=JsonEx[_0x318747(0x2b9)](_0x16bcf5[_0x318747(0x115)]());this[_0x318747(0x131)][_0x318747(0x100)]([_0x16bcf5,_0x44f44a]);},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x114)]=Game_Actor[_0x15a739(0x2b7)][_0x15a739(0x2b6)],Game_Actor[_0x15a739(0x2b7)][_0x15a739(0x2b6)]=function(){const _0x5a8787=_0x15a739;if(BattleManager['isFTB']()){if(this[_0x5a8787(0xfe)]())this['battler']()[_0x5a8787(0x1de)]();return![];}return VisuMZ[_0x5a8787(0x2fc)][_0x5a8787(0x114)][_0x5a8787(0x1cc)](this);},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x2d3)]=Game_Actor['prototype'][_0x15a739(0x154)],Game_Actor[_0x15a739(0x2b7)][_0x15a739(0x154)]=function(_0x1bdca9,_0x5c70e3){const _0x15497a=_0x15a739;VisuMZ[_0x15497a(0x2fc)]['Game_Actor_changeEquip'][_0x15497a(0x1cc)](this,_0x1bdca9,_0x5c70e3),this[_0x15497a(0x25b)]()[_0x15497a(0x304)]();},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1e5)]=Game_Actor[_0x15a739(0x2b7)][_0x15a739(0x24b)],Game_Actor[_0x15a739(0x2b7)][_0x15a739(0x24b)]=function(_0x3ba93e,_0x54e20a){const _0x4d5d6b=_0x15a739;VisuMZ['BattleSystemFTB'][_0x4d5d6b(0x1e5)][_0x4d5d6b(0x1cc)](this,_0x3ba93e,_0x54e20a),this[_0x4d5d6b(0x25b)]()[_0x4d5d6b(0x304)]();},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x2ec)]=Game_Actor[_0x15a739(0x2b7)][_0x15a739(0x22f)],Game_Actor['prototype'][_0x15a739(0x22f)]=function(_0x3439e3,_0x5e631a){const _0x58f510=_0x15a739;VisuMZ['BattleSystemFTB'][_0x58f510(0x2ec)][_0x58f510(0x1cc)](this,_0x3439e3,_0x5e631a),this[_0x58f510(0x25b)]()['recalculateActionsFTB']();},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x183)]=Game_Actor['prototype'][_0x15a739(0x243)],Game_Actor[_0x15a739(0x2b7)][_0x15a739(0x243)]=function(_0xeb92fb){const _0x572d1b=_0x15a739;VisuMZ[_0x572d1b(0x2fc)][_0x572d1b(0x183)][_0x572d1b(0x1cc)](this,_0xeb92fb),this[_0x572d1b(0x25b)]()[_0x572d1b(0x304)]();},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x23e)]=Game_Actor[_0x15a739(0x2b7)][_0x15a739(0x251)],Game_Actor[_0x15a739(0x2b7)][_0x15a739(0x251)]=function(_0x48707f){const _0xbeb49f=_0x15a739;VisuMZ[_0xbeb49f(0x2fc)][_0xbeb49f(0x23e)]['call'](this,_0x48707f),this[_0xbeb49f(0x25b)]()[_0xbeb49f(0x304)]();},VisuMZ[_0x15a739(0x2fc)]['Game_Actor_changeClass']=Game_Actor[_0x15a739(0x2b7)]['changeClass'],Game_Actor[_0x15a739(0x2b7)][_0x15a739(0x17c)]=function(_0x537fd2,_0x2f3eae){const _0x3da7d8=_0x15a739;VisuMZ[_0x3da7d8(0x2fc)][_0x3da7d8(0x277)][_0x3da7d8(0x1cc)](this,_0x537fd2,_0x2f3eae),this['friendsUnit']()['recalculateActionsFTB']();},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x219)]=Game_Enemy['prototype'][_0x15a739(0x2e2)],Game_Enemy[_0x15a739(0x2b7)]['transform']=function(_0x59ed8c){const _0x2dae61=_0x15a739;VisuMZ[_0x2dae61(0x2fc)]['Game_Enemy_transform'][_0x2dae61(0x1cc)](this,_0x59ed8c),this[_0x2dae61(0x25b)]()[_0x2dae61(0x304)]();},Game_Unit[_0x15a739(0x258)]=VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1cd)][_0x15a739(0x157)][_0x15a739(0x2b4)],Game_Unit[_0x15a739(0x24f)]=VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1cd)][_0x15a739(0x157)][_0x15a739(0x18a)],Game_Unit[_0x15a739(0x25e)]=VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1cd)][_0x15a739(0x157)][_0x15a739(0x128)],Game_Unit[_0x15a739(0x2b7)][_0x15a739(0x1c7)]=function(){const _0x7eb8d5=_0x15a739;this['createActionsFTB'](),this[_0x7eb8d5(0x2d6)](this[_0x7eb8d5(0x1ab)]());},Game_Unit[_0x15a739(0x2b7)][_0x15a739(0x187)]=function(){const _0x249dc8=_0x15a739;this[_0x249dc8(0x182)]=!![];let _0x4660de=0x0,_0x5a0159=this[_0x249dc8(0x20f)]()['filter'](_0x1b8b83=>_0x1b8b83['canMove']());_0x4660de=_0x5a0159[_0x249dc8(0x301)]((_0x46f9cd,_0x3932ef)=>_0x46f9cd+_0x3932ef['ftbActionCount'](),_0x4660de),_0x4660de=_0x4660de[_0x249dc8(0x104)](Game_Unit[_0x249dc8(0x24f)],Game_Unit[_0x249dc8(0x258)]),this[_0x249dc8(0x271)]=_0x4660de;},Game_Unit[_0x15a739(0x2b7)][_0x15a739(0x304)]=function(){const _0x563fd9=_0x15a739;if(!BattleManager[_0x563fd9(0x172)]())return;if(!$gameParty['inBattle']())return;const _0x56a091=this[_0x563fd9(0x1ab)]();this[_0x563fd9(0x187)]();let _0x1c63c9=this[_0x563fd9(0x1fc)]();const _0x5d56f5=this[_0x563fd9(0x1ab)]()-_0x56a091;if(BattleManager[_0x563fd9(0x222)]&&_0x5d56f5>0x0)_0x1c63c9+=_0x5d56f5;if(BattleManager[_0x563fd9(0x281)]&&_0x5d56f5<0x0)_0x1c63c9+=_0x5d56f5;_0x1c63c9=Math[_0x563fd9(0x22b)](_0x1c63c9,Game_Unit[_0x563fd9(0x258)]),this[_0x563fd9(0x2d6)](_0x1c63c9);},Game_Unit['prototype'][_0x15a739(0x1fc)]=function(){const _0x1ccedc=_0x15a739;return this[_0x1ccedc(0x2ee)]||0x0;},Game_Unit[_0x15a739(0x2b7)][_0x15a739(0x2d6)]=function(_0x419d2a){const _0x91cc9b=_0x15a739;this[_0x91cc9b(0x2ee)]=Math[_0x91cc9b(0xf8)](_0x419d2a)[_0x91cc9b(0x104)](0x0,Game_Unit[_0x91cc9b(0x258)]),!Game_Unit['_FTB_ACTION_OVERFLOW']&&(this[_0x91cc9b(0x2ee)]=Math[_0x91cc9b(0x22b)](this[_0x91cc9b(0x2ee)],this[_0x91cc9b(0x1ab)]()));},Game_Unit['prototype'][_0x15a739(0x27c)]=function(_0x35c1e5){const _0x1f32d5=_0x15a739;this[_0x1f32d5(0x2d6)](this[_0x1f32d5(0x1fc)]()+_0x35c1e5);},Game_Unit['prototype']['loseCurrentActionsFTB']=function(_0x44bcf4){const _0x5492aa=_0x15a739;this[_0x5492aa(0x27c)](-_0x44bcf4);},Game_Unit[_0x15a739(0x2b7)]['getMaxActionsFTB']=function(){const _0xffcd33=_0x15a739;return this[_0xffcd33(0x271)]||0x0;},Game_Unit[_0x15a739(0x2b7)]['setMaxActionsFTB']=function(_0x25fe22){const _0x179f88=_0x15a739;this[_0x179f88(0x271)]=_0x25fe22[_0x179f88(0x104)](Game_Unit['_FTB_MIN_ACTIONS'],Game_Unit[_0x179f88(0x258)]);},Game_Unit[_0x15a739(0x2b7)][_0x15a739(0x2eb)]=function(_0x390e4a){const _0x428fba=_0x15a739;this[_0x428fba(0x207)](_0x390e4a);},Game_Unit[_0x15a739(0x2b7)]['canActFTB']=function(){const _0x55e4d1=_0x15a739;if(BattleManager['_subject']){if(this[_0x55e4d1(0x156)]()['includes'](BattleManager[_0x55e4d1(0x16e)])){if(_0x55e4d1(0x112)===_0x55e4d1(0x22d))_0x305c49['BattleSystemFTB'][_0x55e4d1(0x210)][_0x55e4d1(0x1cc)](this),this['endTurnFTB']();else{const _0x381f1c=BattleManager[_0x55e4d1(0x16e)][_0x55e4d1(0x115)]();if(_0x381f1c&&_0x381f1c[_0x55e4d1(0x12e)])return!![];}}}return this['_ftbActionsCur']=this[_0x55e4d1(0x2ee)]||0x0,this['_ftbActionsCur']>0x0;},Game_Unit[_0x15a739(0x2b7)][_0x15a739(0x2cd)]=function(){const _0x15ee1a=_0x15a739;for(const _0x1299f0 of this[_0x15ee1a(0x156)]()){if(_0x15ee1a(0xff)===_0x15ee1a(0xff)){if(!_0x1299f0)continue;const _0x481d0c=_0x1299f0['isAlive']();_0x1299f0[_0x15ee1a(0x1e4)](),_0x1299f0[_0x15ee1a(0x199)]();if(_0x481d0c&&_0x1299f0[_0x15ee1a(0x1ac)]()){if(_0x15ee1a(0x2dd)!==_0x15ee1a(0x2dd)){this['_unit']=null,this[_0x15ee1a(0x101)]=0x0,this[_0x15ee1a(0x121)]=0x0;const _0x33e4d4=_0x446036[_0x15ee1a(0x1cd)];this[_0x15ee1a(0x1a8)]={'ActorPicture':_0x33e4d4['ActorActionPicture']?_0x107cee[_0x15ee1a(0x1c3)](_0x33e4d4['ActorActionPicture']):'','EnemyPicture':_0x33e4d4[_0x15ee1a(0x15e)]?_0x513f6b['loadPicture'](_0x33e4d4[_0x15ee1a(0x15e)]):'','EmptyPicture':_0x33e4d4[_0x15ee1a(0x2ba)]?_0x444a9c[_0x15ee1a(0x1c3)](_0x33e4d4[_0x15ee1a(0x2ba)]):''};}else _0x1299f0['performCollapse']();}}else _0x115da1[_0x15ee1a(0x2fc)][_0x15ee1a(0x2a2)]['call'](this),this['friendsUnit']()[_0x15ee1a(0x304)]();}},Game_Unit['prototype']['meetEndTurnConditionsFTB']=function(){const _0x59ea5a=_0x15a739;if(this['getCurrentActionsFTB']()<=0x0)return!![];if(!this[_0x59ea5a(0x20f)]()['some'](_0x2d9c1e=>_0x2d9c1e['canMove']()))return!![];return![];},Game_Unit[_0x15a739(0x2b7)][_0x15a739(0x2d9)]=function(){const _0x170c0d=_0x15a739;for(const _0xb4c3e8 of this[_0x170c0d(0x156)]()){if(!_0xb4c3e8)continue;_0xb4c3e8[_0x170c0d(0x19a)](),_0xb4c3e8[_0x170c0d(0x2b8)](0x2),_0xb4c3e8[_0x170c0d(0x111)](),_0xb4c3e8[_0x170c0d(0x199)]();}},Game_Unit['prototype'][_0x15a739(0x1d2)]=function(){const _0x5ccf0c=_0x15a739;for(const _0x5bcc60 of this[_0x5ccf0c(0x156)]()){if('Oowxl'!==_0x5ccf0c(0x255)){if(!this[_0x5ccf0c(0x1b3)])return;(this[_0x5ccf0c(0x101)]!==this[_0x5ccf0c(0x1b3)][_0x5ccf0c(0x1fc)]()||this[_0x5ccf0c(0x121)]!==this[_0x5ccf0c(0x1b3)][_0x5ccf0c(0x1ab)]())&&(this[_0x5ccf0c(0x101)]=this[_0x5ccf0c(0x1b3)]['getCurrentActionsFTB'](),this[_0x5ccf0c(0x121)]=this['_unit'][_0x5ccf0c(0x1ab)](),this[_0x5ccf0c(0x2c1)]());}else{if(!_0x5bcc60)continue;_0x5bcc60[_0x5ccf0c(0x283)]=![];}}},Game_Unit[_0x15a739(0x2b7)]['ftbLowestAgility']=function(){const _0x1187d5=_0x15a739,_0xb3d917=this[_0x1187d5(0x156)]();return Math[_0x1187d5(0x22b)](..._0xb3d917[_0x1187d5(0x20a)](_0x35d382=>_0x35d382['agi']));},Game_Unit['prototype'][_0x15a739(0x1ad)]=function(){const _0x3d442e=_0x15a739,_0x59dabb=this[_0x3d442e(0x156)]();return Math[_0x3d442e(0x197)](..._0x59dabb[_0x3d442e(0x20a)](_0x2d895d=>_0x2d895d[_0x3d442e(0x15c)]));},Game_Unit[_0x15a739(0x2b7)][_0x15a739(0x13e)]=function(){const _0x5d3ba=_0x15a739,_0x1404fb=this[_0x5d3ba(0x156)]();return _0x1404fb[_0x5d3ba(0x301)]((_0x41d475,_0x2fc1e9)=>_0x41d475+_0x2fc1e9[_0x5d3ba(0x15c)],0x0);},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x2a9)]=Game_Unit[_0x15a739(0x2b7)]['onBattleStart'],Game_Unit['prototype']['onBattleStart']=function(_0x5364c3){const _0x4939c6=_0x15a739;VisuMZ['BattleSystemFTB'][_0x4939c6(0x2a9)][_0x4939c6(0x1cc)](this,_0x5364c3),BattleManager[_0x4939c6(0x172)]()&&(this[_0x4939c6(0x2d2)]=0x0);},Game_Unit[_0x15a739(0x2b7)][_0x15a739(0x110)]=function(){const _0x5b8ea9=_0x15a739,_0x5bd405=this[_0x5b8ea9(0x20f)]();if(BattleManager[_0x5b8ea9(0x1a1)])return _0x5bd405;if(BattleManager['_FTB_FREE_CHANGE'])return _0x5bd405;this[_0x5b8ea9(0x2d2)]=this[_0x5b8ea9(0x2d2)]||0x0;while(!_0x5bd405[_0x5b8ea9(0x235)](_0x1f6c09=>_0x1f6c09[_0x5b8ea9(0x25f)]()===this[_0x5b8ea9(0x2d2)])){const _0x6472e3=this[_0x5b8ea9(0x156)](),_0x56a27a=_0x6472e3[this[_0x5b8ea9(0x2d2)]];let _0x377c89=_0x6472e3[_0x5b8ea9(0x2de)](_0x56a27a)+0x1;if(_0x377c89>=_0x6472e3[_0x5b8ea9(0x1a4)])_0x377c89=0x0;this[_0x5b8ea9(0x2d2)]=_0x377c89;}for(;;){if(_0x5b8ea9(0x256)==='EQxBR'){const _0x3c730d=_0x5bd405[0x0][_0x5b8ea9(0x25f)]();if(_0x3c730d===this[_0x5b8ea9(0x2d2)])break;_0x5bd405['push'](_0x5bd405['shift']());}else this['_ftbLastIndex']=0x0;}return _0x5bd405;},Game_Unit[_0x15a739(0x2b7)][_0x15a739(0x15f)]=function(_0x1110de){const _0x5473bb=_0x15a739;this[_0x5473bb(0x2d2)]=_0x1110de?_0x1110de[_0x5473bb(0x25f)]():0x0,this[_0x5473bb(0x2d2)]++;},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x13b)]=Scene_Battle['prototype'][_0x15a739(0x1a5)],Scene_Battle[_0x15a739(0x2b7)][_0x15a739(0x1a5)]=function(){const _0x23b3c7=_0x15a739;VisuMZ[_0x23b3c7(0x2fc)][_0x23b3c7(0x13b)][_0x23b3c7(0x1cc)](this),BattleManager[_0x23b3c7(0x172)]()&&this[_0x23b3c7(0x2ef)]();},Scene_Battle[_0x15a739(0x2b7)][_0x15a739(0x2ef)]=function(){const _0x239f7b=_0x15a739,_0x4e3b26=this[_0x239f7b(0x29c)];this['isPartyCommandWindowDisabled']()&&delete _0x4e3b26['_handlers'][_0x239f7b(0x2a7)];},VisuMZ['BattleSystemFTB'][_0x15a739(0x218)]=Scene_Battle['prototype'][_0x15a739(0x2e0)],Scene_Battle[_0x15a739(0x2b7)]['commandCancel']=function(){const _0x137d8e=_0x15a739;if(BattleManager[_0x137d8e(0x172)]()){if(_0x137d8e(0x1c0)!==_0x137d8e(0x1c0))return this[_0x137d8e(0x1fd)]&&this[_0x137d8e(0x1fd)][_0x137d8e(0x27b)]===_0x526ab4;else this[_0x137d8e(0x1d6)]();}else VisuMZ[_0x137d8e(0x2fc)][_0x137d8e(0x218)][_0x137d8e(0x1cc)](this);},Scene_Battle['prototype']['commandCancelFTB']=function(){const _0x267c88=_0x15a739;this[_0x267c88(0x12a)]['setup'](),this[_0x267c88(0x29c)][_0x267c88(0x2f8)]();},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x13c)]=Scene_Battle['prototype'][_0x15a739(0x10f)],Scene_Battle['prototype']['commandFight']=function(){const _0xba22f=_0x15a739;BattleManager[_0xba22f(0x172)]()?this['startActorCommandSelection']():_0xba22f(0x22a)!=='UQCnL'?_0x30f34b[_0xba22f(0x172)]()&&_0x2c8a37&&_0x31c980[_0xba22f(0xf1)]&&_0x1cfb2d[_0xba22f(0xf1)][_0xba22f(0x263)](/<(?:FTB) HELP>\s*([\s\S]*)\s*<\/(?:FTB) HELP>/i)?this[_0xba22f(0x120)](_0x57eda3(_0x1a3ad1['$1'])):_0x2d9d37[_0xba22f(0x2fc)][_0xba22f(0x1ae)][_0xba22f(0x1cc)](this,_0x17ebe7):VisuMZ[_0xba22f(0x2fc)][_0xba22f(0x13c)][_0xba22f(0x1cc)](this);},VisuMZ['BattleSystemFTB'][_0x15a739(0x1f6)]=Scene_Battle['prototype']['createAllWindows'],Scene_Battle['prototype'][_0x15a739(0x159)]=function(){const _0x1fa4e0=_0x15a739;VisuMZ[_0x1fa4e0(0x2fc)]['Scene_Battle_createAllWindows']['call'](this),this[_0x1fa4e0(0x1f3)]();},Scene_Battle['prototype'][_0x15a739(0x1f3)]=function(){const _0xacf888=_0x15a739;if(!BattleManager[_0xacf888(0x172)]())return;const _0x5c2f9e=this[_0xacf888(0x143)](this['_windowLayer']);this['_ftbTroopActionCountWindow']=new Window_FTB_ActionCount(),this[_0xacf888(0x2cf)][_0xacf888(0x2db)]($gameTroop),this[_0xacf888(0x204)](this[_0xacf888(0x2cf)],_0x5c2f9e),this[_0xacf888(0x1a3)]=new Window_FTB_ActionCount(),this[_0xacf888(0x1a3)]['setUnit']($gameParty),this[_0xacf888(0x204)](this['_ftbPartyActionCountWindow'],_0x5c2f9e),this[_0xacf888(0x299)]();},Scene_Battle[_0x15a739(0x2b7)][_0x15a739(0x299)]=function(){const _0x4246aa=_0x15a739;if(!BattleManager[_0x4246aa(0x172)]())return;if(!this[_0x4246aa(0x282)])return;const _0x39574c=Window_FTB_ActionCount[_0x4246aa(0x1cd)];if(_0x39574c[_0x4246aa(0x2b5)])return;this['_logWindow']['y']+=_0x39574c[_0x4246aa(0x1cb)];},Window_Base[_0x15a739(0xfa)]=VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1cd)][_0x15a739(0x269)]['CostPosition'],Window_Base['_FTB_COST_SHOW_ATTACK']=VisuMZ[_0x15a739(0x2fc)]['Settings'][_0x15a739(0x269)][_0x15a739(0x2ad)],Window_Base[_0x15a739(0x19e)]=VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1cd)][_0x15a739(0x269)][_0x15a739(0x13a)],Window_Base['_FTB_COST_SHOW_0']=VisuMZ[_0x15a739(0x2fc)]['Settings'][_0x15a739(0x269)][_0x15a739(0x196)],Window_Base['_FTB_COST_SHOW_1']=VisuMZ['BattleSystemFTB']['Settings']['General'][_0x15a739(0x286)],VisuMZ['BattleSystemFTB'][_0x15a739(0xf6)]=Window_Base[_0x15a739(0x2b7)][_0x15a739(0x1c5)],Window_Base[_0x15a739(0x2b7)]['makeAdditionalSkillCostText']=function(_0x4d2e76,_0x5c1b3f,_0x2fbe0f){const _0xa80f70=_0x15a739;return _0x2fbe0f=VisuMZ[_0xa80f70(0x2fc)][_0xa80f70(0xf6)][_0xa80f70(0x1cc)](this,_0x4d2e76,_0x5c1b3f,_0x2fbe0f),_0x2fbe0f=this[_0xa80f70(0x21b)](_0x4d2e76,_0x5c1b3f,_0x2fbe0f),_0x2fbe0f;},VisuMZ['BattleSystemFTB'][_0x15a739(0xf9)]=Window_Base['prototype'][_0x15a739(0x2f7)],Window_Base[_0x15a739(0x2b7)][_0x15a739(0x2f7)]=function(_0x1dac01,_0x35d5dd,_0x55acb1,_0x566626){const _0x319772=_0x15a739;if(BattleManager[_0x319772(0x172)]()&&this['constructor']===Window_BattleItem)this['drawItemNumberFTB'](_0x1dac01,_0x35d5dd,_0x55acb1,_0x566626);else{if(_0x319772(0x141)!==_0x319772(0x1a9))VisuMZ[_0x319772(0x2fc)][_0x319772(0xf9)]['call'](this,_0x1dac01,_0x35d5dd,_0x55acb1,_0x566626);else{const _0x41d8f9=_0x1e9f9d['currentAction']();if(!_0x41d8f9)_0x3bd62c[_0x319772(0x2fc)][_0x319772(0x220)][_0x319772(0x1cc)](this);else _0x41d8f9['_forceAction']?_0x16e748[_0x319772(0x2fc)][_0x319772(0x220)][_0x319772(0x1cc)](this):(this[_0x319772(0x224)]=_0x35ae80,this[_0x319772(0x213)]());}}this[_0x319772(0x274)]();},Window_Base[_0x15a739(0x2b7)][_0x15a739(0x152)]=function(_0x539b54,_0x484acd,_0x4ba7ef,_0x1ff313){const _0x43db67=_0x15a739,_0x13e8c8=BattleManager[_0x43db67(0x29a)]||$gameParty[_0x43db67(0x156)]()[0x0],_0x534546=this[_0x43db67(0x21b)](_0x13e8c8,_0x539b54,''),_0x1bf8a4=this[_0x43db67(0x19c)](_0x534546)[_0x43db67(0x127)],_0x157aca=Window_Base[_0x43db67(0xfa)];let _0x186682=_0x484acd+_0x1ff313-_0x1bf8a4;if(_0x534546==='')VisuMZ[_0x43db67(0x2fc)][_0x43db67(0xf9)]['call'](this,_0x539b54,_0x484acd,_0x4ba7ef,_0x1ff313);else{if(this[_0x43db67(0x214)](_0x539b54)){this[_0x43db67(0x274)]();const _0x20ae43=VisuMZ[_0x43db67(0x2f4)][_0x43db67(0x1cd)][_0x43db67(0x1ec)];this['contents'][_0x43db67(0x252)]=_0x20ae43[_0x43db67(0xf7)];if(_0x157aca){const _0xb0e4d9=_0x20ae43[_0x43db67(0x295)],_0x902a9a=_0xb0e4d9[_0x43db67(0x275)]($gameParty[_0x43db67(0x1fb)](_0x539b54)),_0x4940ed=this['textWidth'](_0x902a9a+this[_0x43db67(0x1b5)]());_0x186682-=_0x4940ed;}else _0x1ff313-=this['textWidth'](this['skillCostSeparator']())+_0x1bf8a4;VisuMZ['BattleSystemFTB'][_0x43db67(0xf9)][_0x43db67(0x1cc)](this,_0x539b54,_0x484acd,_0x4ba7ef,_0x1ff313);}}this['drawTextEx'](_0x534546,_0x186682,_0x4ba7ef);},Window_Base['prototype'][_0x15a739(0x21b)]=function(_0x417df0,_0x58fcb0,_0x14b8ce){const _0x535679=_0x15a739;if(!BattleManager[_0x535679(0x172)]())return _0x14b8ce;if(!_0x417df0)return _0x14b8ce;if(!_0x58fcb0)return _0x14b8ce;if(_0x58fcb0[_0x535679(0xf1)][_0x535679(0x263)](VisuMZ[_0x535679(0x2fc)][_0x535679(0x205)][_0x535679(0x227)]))return _0x14b8ce;let _0x1f4f7e=DataManager[_0x535679(0x1f4)](_0x58fcb0);const _0x3e6e54=Window_Base[_0x535679(0xfa)],_0x2b0090=Window_Base[_0x535679(0x119)],_0x3606ff=Window_Base[_0x535679(0x19e)],_0x1e5891=Window_Base[_0x535679(0x1ee)],_0x2e30ae=Window_Base[_0x535679(0x26c)];if(_0x58fcb0[_0x535679(0xf1)][_0x535679(0x263)](VisuMZ[_0x535679(0x2fc)][_0x535679(0x205)][_0x535679(0x117)])){if(_0x535679(0x147)===_0x535679(0x147)){if(_0x1f4f7e<0x0)return _0x14b8ce;}else _0x2b3216+=_0x2ca8b5;}else{if(DataManager['isSkill'](_0x58fcb0)&&this[_0x535679(0x27b)]===Window_ActorCommand){if(_0x535679(0x2ae)===_0x535679(0x1db))delete _0x4ca979[_0x535679(0x11c)][_0x535679(0x2a7)];else{if(!_0x2b0090&&_0x58fcb0['id']===_0x417df0[_0x535679(0x26f)]())return _0x14b8ce;if(!_0x3606ff&&_0x58fcb0['id']===_0x417df0[_0x535679(0x1ff)]())return _0x14b8ce;}}if(_0x1f4f7e<0x0)return _0x14b8ce;if(!_0x1e5891&&_0x1f4f7e===0x0)return _0x14b8ce;if(!_0x2e30ae&&_0x1f4f7e===0x1)return _0x14b8ce;}const _0x423fad=_0x535679(0x2d1)[_0x535679(0x275)](ImageManager[_0x535679(0xfd)]),_0x373216=TextManager[_0x535679(0x139)];let _0x710f1e=TextManager['ftbCostFormat'][_0x535679(0x275)](_0x1f4f7e,_0x373216,_0x423fad);if(_0x14b8ce==='')_0x14b8ce+=_0x710f1e;else _0x3e6e54?_0x14b8ce=_0x710f1e+this[_0x535679(0x1b5)]()+_0x14b8ce:_0x14b8ce=_0x14b8ce+this[_0x535679(0x1b5)]()+_0x710f1e;return _0x14b8ce;},VisuMZ['BattleSystemFTB']['Window_Help_setItem']=Window_Help['prototype']['setItem'],Window_Help['prototype']['setItem']=function(_0x3b2870){const _0x2e297f=_0x15a739;BattleManager['isFTB']()&&_0x3b2870&&_0x3b2870['note']&&_0x3b2870['note'][_0x2e297f(0x263)](/<(?:FTB) HELP>\s*([\s\S]*)\s*<\/(?:FTB) HELP>/i)?'fyKOQ'!==_0x2e297f(0x1ce)?this[_0x2e297f(0x120)](String(RegExp['$1'])):_0x3291ce[_0x2e297f(0x21a)](_0x8dfb26):VisuMZ[_0x2e297f(0x2fc)][_0x2e297f(0x1ae)]['call'](this,_0x3b2870);},Window_Selectable['prototype'][_0x15a739(0x267)]=function(){const _0x23622f=_0x15a739;return this[_0x23622f(0x27b)]===Window_ActorCommand&&BattleManager[_0x23622f(0x172)]()&&BattleManager[_0x23622f(0x15d)];},VisuMZ['BattleSystemFTB'][_0x15a739(0x29f)]=Window_Selectable[_0x15a739(0x2b7)]['cursorRight'],Window_Selectable[_0x15a739(0x2b7)][_0x15a739(0x20b)]=function(_0x1042fb){const _0x24bd08=_0x15a739;this[_0x24bd08(0x267)]()&&this[_0x24bd08(0x2d4)]()===0x1?this[_0x24bd08(0x1b9)](!![]):VisuMZ[_0x24bd08(0x2fc)][_0x24bd08(0x29f)][_0x24bd08(0x1cc)](this,_0x1042fb);},VisuMZ['BattleSystemFTB'][_0x15a739(0x1e6)]=Window_Selectable[_0x15a739(0x2b7)][_0x15a739(0x108)],Window_Selectable[_0x15a739(0x2b7)][_0x15a739(0x108)]=function(_0x3a9d1f){const _0x4e4673=_0x15a739;this[_0x4e4673(0x267)]()&&this['maxCols']()===0x1?this['ftbSwitchActorDirection'](![]):VisuMZ['BattleSystemFTB']['Window_Selectable_cursorLeft'][_0x4e4673(0x1cc)](this,_0x3a9d1f);},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x2ac)]=Window_Selectable['prototype'][_0x15a739(0x189)],Window_Selectable[_0x15a739(0x2b7)][_0x15a739(0x189)]=function(){const _0x309c32=_0x15a739;this[_0x309c32(0x267)]()?_0x309c32(0x2aa)!==_0x309c32(0x246)?this['ftbSwitchActorDirection'](!![]):this[_0x309c32(0x172)]()?this['selectNextActorFTB']():_0x561caa[_0x309c32(0x2fc)][_0x309c32(0x264)][_0x309c32(0x1cc)](this):VisuMZ['BattleSystemFTB'][_0x309c32(0x2ac)][_0x309c32(0x1cc)](this);},VisuMZ['BattleSystemFTB'][_0x15a739(0x11b)]=Window_Selectable['prototype'][_0x15a739(0x146)],Window_Selectable['prototype'][_0x15a739(0x146)]=function(){const _0x19dd8f=_0x15a739;if(this[_0x19dd8f(0x267)]()){if(_0x19dd8f(0xf3)!==_0x19dd8f(0xf3))return _0x346f44=_0x1c9007[_0x19dd8f(0x2fc)][_0x19dd8f(0xf6)][_0x19dd8f(0x1cc)](this,_0x47d839,_0xdeacfe,_0x4b1843),_0x53923d=this['makeAdditionalCostTextFTB'](_0x5bb695,_0x39e37f,_0x413916),_0x687d0a;else this[_0x19dd8f(0x1b9)](![]);}else VisuMZ['BattleSystemFTB']['Window_Selectable_cursorPageup'][_0x19dd8f(0x1cc)](this);},Window_ActorCommand['prototype']['ftbSwitchActorDirection']=function(_0x4df68f){const _0xcc040d=_0x15a739,_0x459f04=BattleManager[_0xcc040d(0x224)];let _0x595a05=$gameParty['battleMembers']()['indexOf'](_0x459f04);const _0x3ced82=$gameParty[_0xcc040d(0x242)]()[_0xcc040d(0x1a4)]-0x1;let _0x421bfb=$gameParty[_0xcc040d(0x242)]()[_0x595a05];for(;;){_0x595a05+=_0x4df68f?0x1:-0x1;if(_0x595a05<0x0)_0x595a05=_0x3ced82;if(_0x595a05>_0x3ced82)_0x595a05=0x0;_0x421bfb=$gameParty[_0xcc040d(0x242)]()[_0x595a05];if(_0x421bfb&&_0x421bfb['canInput']()&&!_0x421bfb[_0xcc040d(0x236)]())break;if(_0x421bfb===_0x459f04)break;}this[_0xcc040d(0x2e7)](_0x459f04,_0x421bfb);},Window_ActorCommand[_0x15a739(0x2b7)]['processSwitchActors']=function(_0x56c652,_0x24be66){const _0x5b03db=_0x15a739;if(_0x56c652===_0x24be66)return;if(_0x56c652[_0x5b03db(0xfe)]())_0x56c652['battler']()[_0x5b03db(0x164)]();this[_0x5b03db(0x1d1)](),BattleManager[_0x5b03db(0x16e)]=_0x24be66,BattleManager[_0x5b03db(0x224)]=_0x24be66,BattleManager[_0x5b03db(0x213)](),SceneManager[_0x5b03db(0x1fd)][_0x5b03db(0x1d3)]();},VisuMZ[_0x15a739(0x2fc)][_0x15a739(0x1b2)]=Window_Selectable[_0x15a739(0x2b7)][_0x15a739(0x2f5)],Window_Selectable[_0x15a739(0x2b7)][_0x15a739(0x2f5)]=function(){const _0x41abf6=_0x15a739;if(BattleManager[_0x41abf6(0x172)]()&&BattleManager['_FTB_FREE_CHANGE']&&this['constructor']===Window_BattleStatus){if('xeDJh'!=='ivQFh')this[_0x41abf6(0x265)]();else{if(!_0x1df180['isFTB']())return;let _0x1fcfb8='';if(this[_0x41abf6(0x1bd)]===_0x37f730){let _0x46ec35=_0x118f10[_0x41abf6(0x23b)]();_0x1fcfb8=_0x2da87a[_0x41abf6(0x16b)][_0x41abf6(0x275)](_0x46ec35);}else _0x1fcfb8=_0x2c61f2[_0x41abf6(0x1dd)];if(_0x1fcfb8!==''){this[_0x41abf6(0x282)][_0x41abf6(0x100)]('addText',_0x1fcfb8);const _0x4e5149=_0x1f3937[_0x41abf6(0x1be)];this[_0x41abf6(0x282)][_0x41abf6(0x100)](_0x41abf6(0x1b8),_0x4e5149),this[_0x41abf6(0x282)][_0x41abf6(0x100)](_0x41abf6(0x300));}}}else VisuMZ['BattleSystemFTB'][_0x41abf6(0x1b2)][_0x41abf6(0x1cc)](this);},Window_BattleStatus[_0x15a739(0x2b7)][_0x15a739(0x265)]=function(){const _0x1e0760=_0x15a739;this[_0x1e0760(0x2d8)]()&&(TouchInput[_0x1e0760(0x2ed)]()&&(_0x1e0760(0x16d)!==_0x1e0760(0x16d)?this[_0x1e0760(0x265)]():this[_0x1e0760(0x136)](!![])));},Window_BattleStatus[_0x15a739(0x2b7)][_0x15a739(0x136)]=function(_0x4b3157){const _0x447abc=_0x15a739,_0xbe793e=SceneManager[_0x447abc(0x1fd)]['_actorCommandWindow'];if(!_0xbe793e)return;if(!_0xbe793e['active'])return;this[_0x447abc(0x1bb)]=![];const _0x1373f3=this[_0x447abc(0x25f)](),_0x5d9752=this[_0x447abc(0x2a5)]();if(_0x5d9752>=0x0){if(_0x447abc(0x102)===_0x447abc(0x234)){if(_0x75d7d9<0x0)return _0x3cf702;}else{const _0x5716c3=$gameParty[_0x447abc(0x242)]()[_0x1373f3],_0x26aff2=$gameParty['battleMembers']()[_0x5d9752];this[_0x447abc(0x273)](_0x26aff2)&&(_0x447abc(0x18d)==='rbuRQ'?(this['_ftbActionCountVisible']===_0x2d3a2f&&this['initBattleSystemFTB'](),this['_ftbActionCountVisible']=_0x3773f0):(_0x5d9752===this['index']()&&(this[_0x447abc(0x1bb)]=!![]),this[_0x447abc(0x29d)](_0x5d9752),_0xbe793e[_0x447abc(0x2e7)](_0x5716c3,_0x26aff2)));}}},Window_BattleStatus[_0x15a739(0x2b7)]['canActorBeSelectedFTB']=function(_0x50439f){const _0x2b5fee=_0x15a739;if(!_0x50439f)return![];if(!_0x50439f[_0x2b5fee(0x161)]())return![];if(!_0x50439f[_0x2b5fee(0x1b6)]())return![];if(_0x50439f[_0x2b5fee(0x236)]())return![];return!![];};function _0xfd68(_0x202f74,_0xc644c0){const _0x25db2b=_0x25db();return _0xfd68=function(_0xfd684d,_0x42da64){_0xfd684d=_0xfd684d-0xf1;let _0x547524=_0x25db2b[_0xfd684d];return _0x547524;},_0xfd68(_0x202f74,_0xc644c0);}function Window_FTB_ActionCount(){const _0x4f2c79=_0x15a739;this[_0x4f2c79(0x124)](...arguments);}function _0x25db(){const _0x357662=['opDPH','gazJb','xFbvQ','initMembers','GenerateBase','335ELDvac','forceChangeEquip','2687352WFifXQ','ftbActionCount','KeepPrevActor','_FTB_MIN_ACTIONS','setBattleSystemFTBActionCountVisible','releaseUnequippableItems','fontSize','removeActionBattlersFTB','BattleManager_invokeCounterAttack','Oowxl','EQxBR','arNAf','_FTB_MAX_ACTIONS','lbcxf','clearStates','friendsUnit','ARRAYFUNC','KzCjj','_FTB_ACTION_OVERFLOW','index','addState','ARRAYSTR','BattleManager_startBattle','match','BattleManager_selectNextActor','processTouchFTB','active','ftbFreeRangeSwitch','187UBdHpk','General','innerWidth','_FTB_STATE_BUFF_TURN_UPDATES_ONLY_ON_OPPONENT_TURNS','_FTB_COST_SHOW_1','applyGlobalFTB','enemies','attackSkillId','VBWep','_ftbActionsMax','endTurn','canActorBeSelectedFTB','resetFontSettings','format','ActionCountFull','Game_Actor_changeClass','makeActionOrdersFTB','Game_Battler_addDebuff','drawText','constructor','gainCurrentActionsFTB','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','25610bnAJEC','ActionsRemainingOffsetY','initBattleSystemFTB','_FTB_RECALC_SUB_DIFF','_logWindow','_passedTurnFTB','checkNeedsUpdate','2272911hacqSM','Show_1_Action_Cost','FTB','1251210URbwCm','_actions','_bypassStateTurnUpdatesFTB','KBdTy','windowRect','highest\x20agi','WIFJc','hSCzk','addBuff','setBackgroundType','addLoadListener','processTurnFTB','iconHeight','ItemQuantityFmt','getNextSubject','isSceneBattle','ftbEnemyActionsIcon','repositionLogWindowFTB','_actor','_ftbActionCountVisible','_actorCommandWindow','select','description','Window_Selectable_cursorRight','createContentsArray','aDdFw','Game_BattlerBase_clearStates','contents','FreeChange','hitIndex','ftbLowestAgility','cancel','TeamShiftWait','Game_Unit_onBattleStart','zGppK','payActionCostFTB','Window_Selectable_cursorPagedown','ShowCostForAttack','TjajH','Game_Battler_forceAction','ftbCreateTeamSwitchText','includes','isSkill','canUse','MaxActions','BottomPosition','selectNextCommand','prototype','removeStatesAuto','makeDeepCopy','EmptyActionPicture','HroGz','Game_BattlerBase_updateStateTurns','_FTB_GUARD_PASS','concat','isSideView','removeState','refresh','wjtTK','BattleManager_isTeamBased','filter','padding','BattleManager_setup','StateBuffUpdate','Mckiz','endAction','NUM','JoehP','selectNextActor','performTurnEndFTB','_lastTargetIndex','_ftbTroopActionCountWindow','enemy','\x5cI[%1]','_ftbLastIndex','Game_Actor_changeEquip','maxCols','forceAction','setCurrentActionsFTB','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','isOpen','updateStateTurnsFTB','setup','setUnit','ARRAYNUM','QIQqY','indexOf','_preemptive','commandCancel','MkjbC','transform','Game_Action_applyGlobal','20308RDJeSt','return\x200','processTurn','processSwitchActors','agility','_helpWindow','_FTB_KEEP_PREV_ACTOR','reduceActionsFTB','Game_Actor_changeEquipById','isTriggered','_ftbActionsCur','createActorCommandWindowFTB','startInput','lJrhs','ActionsRemainingOffsetX','parse','ItemsEquipsCore','processTouch','setBattleSystem','drawItemNumber','close','BattleManager_isActiveTpb','GuardPass','xWVZu','BattleSystemFTB','ibIBu','ImageGapDistance','ScreenBufferY','clear','reduce','Game_Battler_removeBuff','MaxVisible','recalculateActionsFTB','BattleManager_endAction','note','ActionCountAbbr','nIMaF','keepPrevSubjectFTB','PSciK','Window_Base_makeAdditionalSkillCostText','ItemQuantityFontSize','round','Window_Base_drawItemNumber','_FTB_COST_POSITION','invokeCounterAttack','decideRandomTarget','ftbActorActionsIcon','battler','ePrpZ','push','_currentActions','UzUWl','startInputFTB','clamp','Actor','_ftbTeamEven','SbdDD','cursorLeft','endTurnFTB','Game_Battler_useItem','Current','2142UlSfgs','isActor','ActorOffsetY','commandFight','ftbAliveMembers','updateBuffTurns','lREeh','performCollapse','Game_Actor_selectNextCommand','currentAction','BattleManager_forceAction','ShowActionPointCost','IlDge','_FTB_COST_SHOW_ATTACK','BattleManager_startInput','Window_Selectable_cursorPageup','_handlers','makeActionOrders','passTurnFTB','Empty','setText','_maxActions','Rnnbr','Game_BattlerBase_appear','initialize','screenX','ZryCJ','width','AllowOverflow','Game_Battler_onTurnEnd','_partyCommandWindow','PictureSmoothing','battleSys','drawImage','_forceAction','hide','vJpmc','_forcedBattlers','actors','traitObjects','_action','Enemy','onTouchSelectFTB','bind','CWTTm','ftbActionPointsAbbr','ShowCostForGuard','Scene_Battle_createActorCommandWindow','Scene_Battle_commandFight','canActFTB','ftbTotalAgility','create','DefaultCostSkill','ckbet','EnemyOffsetX','getChildIndex','DrawActionsRemaining','ConvertParams','cursorPageup','ofGoU','ImageSize','setTarget','_FTB_ACTION_AGI_BUFF','ftbActionPointsFull','isTpb','isActiveTpb','createStartingCoordinates','Game_Battler_removeState','ZAOij','sort','drawItemNumberFTB','canDrawActionsRemaining','changeEquip','BattleManager_isTpb','members','Mechanics','blt','createAllWindows','ActorActionsIcon','DTB','agi','_FTB_FREE_CHANGE','EnemyActionPicture','setLastFtbIndex','Game_Action_speed','canMove','ARRAYSTRUCT','gmoaq','stepBack','toUpperCase','trim','_FTB_ACTION_AGI_DEBUFF','bmdKx','selectNextActorFTB','MHGeb','ftbPartyTeamShift','Game_Battler_performCollapse','vZTEb','_subject','endAllBattlersTurn','_ftbTurnAdvantageUnit','ilYgy','isFTB','PassTurn','PjQlF','status','addDebuff','kPilM','ActionPointCost','ARRAYEVAL','drawActionsRemaining','RepositionTopForHelp','changeClass','updateTurn','BattleManager_startTurn','BattleManager_finishActorInput','PartyTeamShiftFmt','7bxqXFt','_inBattle','Game_Actor_discardEquip','total\x20agi','Nothing','GnVcI','createActionsFTB','_surprise','cursorPagedown','MinActions','getBattleSystem','imageSmoothingEnabled','zhblR','isItem','makeActions','_ftbTeamOdd','eknNj','Game_BattlerBase_canUse','_FTB_NEUTRAL_TURN_ADVANTAGE','BattleManager_makeActionOrders','endActionFTB','Show_0_Action_Cost','max','forceActionFTB','startDamagePopup','updateStateTurns','STRUCT','textSizeEx','RepositionTopHelpX','_FTB_COST_SHOW_GUARD','shift','ActorOffsetX','_FTB_RESET_INDEX','removeBuff','_ftbPartyActionCountWindow','length','createActorCommandWindow','height','version','_storedBitmaps','dHGiM','update','getMaxActionsFTB','isDead','ftbHighestAgility','Window_Help_setItem','EmptyActionsIcon','Visible','XEQHY','Window_Selectable_processTouch','_unit','ScreenBufferX','skillCostSeparator','canInput','innerHeight','waitCount','ftbSwitchActorDirection','Game_BattlerBase_hide','_doubleTouch','ActionCountCostFmt','_ftbCurrentUnit','_FTB_BETWEEN_TEAMS_WAIT','finishActorInput','PSJKJ','isPartyCommandWindowDisabled','AgiBuff','loadPicture','ftbEmptyActionsIcon','makeAdditionalSkillCostText','subject','startTurnFTB','registerCommand','SystemActionCountVisibility','ftbCostFormat','LogWindowTopOffsetY','call','Settings','gmusP','IconSmoothing','AuvjM','playCursorSound','clearPassTurnFTB','startActorCommandSelection','vJRmh','220770bNOYrL','commandCancelFTB','6iMiUPB','Game_Battler_addBuff','isBattleSystemFTBActionCountVisible','BattleManager_isTurnBased','iYKzI','setSkill','ftbTroopTeamShift','stepForward','isTeamBased','papGm','exit','EnemyOffsetY','nbeEZ','onTurnEnd','Game_Actor_forceChangeEquip','Window_Selectable_cursorLeft','JJlZF','YWefz','EnemyActionsIcon','loadSystem','random','ItemScene','useItem','_FTB_COST_SHOW_0','applyGlobal','WNRcF','drawPicture','earFr','createActionCountWindowsFTB','getActionCostFTB','OGHiL','Scene_Battle_createAllWindows','pop','NewTurnResetIndex','Game_BattlerBase_updateBuffTurns','VuaFW','numItems','getCurrentActionsFTB','_scene','updateVisibility','guardSkillId','DrawHorz','ActionsRemainingFontSize','%1ActionPicture','_context','addChildAt','RegExp','startTurn','loseCurrentActionsFTB','pTxEy','WHFlF','map','cursorRight','RepositionTopHelpY','Game_Battler_addState','uDbrZ','aliveMembers','BattleManager_endTurn','DefaultCostItem','turnCount','startActorInput','isDrawItemNumber','isTurnBased','wqnZJ','BattleManager_battleSys','Scene_Battle_commandCancel','Game_Enemy_transform','unshift','makeAdditionalCostTextFTB','AFIDQ','NeutralAdvantage','1453884HLSRzp','jPeEF','BattleManager_processTurn','updatePosition','_FTB_RECALC_ADD_DIFF','addText','_currentActor','_buffs','visible','HideActionPointCost','BattleManager_endAllBattlersTurn','vJRsi','UQCnL','min','ActionPointTraitPlus','UcSDv','aRTST','changeEquipById','initMembersFTB','appear','_actionBattlers','IaQjo','oSYVc','some','isPassingTurnFTB','_FTB_ACTION_BASE','BTHjT','battleEnd','ActorActionPicture','name','EVAL','startBattle','Game_Actor_releaseUnequippableItems','FUNC','wjLRp','STR','battleMembers','discardEquip','startBattleFTB'];_0x25db=function(){return _0x357662;};return _0x25db();}Window_FTB_ActionCount['prototype']=Object[_0x15a739(0x13f)](Window_Base[_0x15a739(0x2b7)]),Window_FTB_ActionCount[_0x15a739(0x2b7)]['constructor']=Window_FTB_ActionCount,Window_FTB_ActionCount['Settings']=VisuMZ['BattleSystemFTB'][_0x15a739(0x1cd)]['ActionCountDisplay'],Window_FTB_ActionCount[_0x15a739(0x2b7)]['initialize']=function(){const _0x270b66=_0x15a739,_0x33b536=this[_0x270b66(0x28c)]();Window_Base[_0x270b66(0x2b7)][_0x270b66(0x124)][_0x270b66(0x1cc)](this,_0x33b536),this[_0x270b66(0x291)](0x0),this[_0x270b66(0x248)](),this['opacity']=0x0;},Window_FTB_ActionCount[_0x15a739(0x2b7)][_0x15a739(0x28c)]=function(){const _0x3344d2=_0x15a739;return new Rectangle(0x0,0x0,Graphics['width'],Graphics[_0x3344d2(0x1a6)]);},Window_FTB_ActionCount[_0x15a739(0x2b7)][_0x15a739(0x248)]=function(){const _0x1bd43f=_0x15a739;this[_0x1bd43f(0x1b3)]=null,this[_0x1bd43f(0x101)]=0x0,this[_0x1bd43f(0x121)]=0x0;const _0x253c07=Window_FTB_ActionCount[_0x1bd43f(0x1cd)];this[_0x1bd43f(0x1a8)]={'ActorPicture':_0x253c07[_0x1bd43f(0x23a)]?ImageManager['loadPicture'](_0x253c07[_0x1bd43f(0x23a)]):'','EnemyPicture':_0x253c07[_0x1bd43f(0x15e)]?ImageManager['loadPicture'](_0x253c07[_0x1bd43f(0x15e)]):'','EmptyPicture':_0x253c07[_0x1bd43f(0x2ba)]?ImageManager[_0x1bd43f(0x1c3)](_0x253c07['EmptyActionPicture']):''};},Window_FTB_ActionCount[_0x15a739(0x2b7)]['updatePadding']=function(){const _0x3b5e5e=_0x15a739;this[_0x3b5e5e(0x2c5)]=0x0;},Window_FTB_ActionCount[_0x15a739(0x2b7)][_0x15a739(0x2db)]=function(_0x2a8903){const _0x2d9250=_0x15a739;this[_0x2d9250(0x1b3)]=_0x2a8903,this[_0x2d9250(0x1aa)]();},Window_FTB_ActionCount[_0x15a739(0x2b7)][_0x15a739(0x1aa)]=function(){const _0x5472d4=_0x15a739;Window_Base[_0x5472d4(0x2b7)]['update'][_0x5472d4(0x1cc)](this),this[_0x5472d4(0x284)](),this[_0x5472d4(0x221)](),this[_0x5472d4(0x1fe)]();},Window_FTB_ActionCount[_0x15a739(0x2b7)][_0x15a739(0x284)]=function(){const _0x36cde2=_0x15a739;if(!this[_0x36cde2(0x1b3)])return;(this[_0x36cde2(0x101)]!==this[_0x36cde2(0x1b3)][_0x36cde2(0x1fc)]()||this[_0x36cde2(0x121)]!==this[_0x36cde2(0x1b3)]['getMaxActionsFTB']())&&(this[_0x36cde2(0x101)]=this[_0x36cde2(0x1b3)][_0x36cde2(0x1fc)](),this[_0x36cde2(0x121)]=this[_0x36cde2(0x1b3)][_0x36cde2(0x1ab)](),this['refresh']());},Window_FTB_ActionCount[_0x15a739(0x2b7)][_0x15a739(0x1fe)]=function(){const _0x45eed1=_0x15a739;this[_0x45eed1(0x226)]=$gameSystem['isBattleSystemFTBActionCountVisible']();},Window_FTB_ActionCount[_0x15a739(0x2b7)][_0x15a739(0x2c1)]=function(){const _0x25bae9=_0x15a739;this[_0x25bae9(0x2a3)][_0x25bae9(0x300)]();if(!this[_0x25bae9(0x1b3)])return;const _0x35514f=Window_FTB_ActionCount['Settings'];if(!_0x35514f)return;const _0x369a2b=this[_0x25bae9(0x14e)](),_0x17ae22=this[_0x25bae9(0x2a0)](),_0xc07965=_0x35514f['ImageSize']+_0x35514f[_0x25bae9(0x2fe)],_0x26f92f=_0x35514f['DrawHorz'];let _0x11d21f=_0x369a2b['x'],_0x2171f1=_0x369a2b['y'];while(_0x17ae22[_0x25bae9(0x1a4)]>_0x35514f[_0x25bae9(0x303)]){_0x17ae22[_0x25bae9(0x19f)]();}while(_0x17ae22['length']>0x0){if(_0x25bae9(0x130)===_0x25bae9(0x130)){const _0x31299c=_0x17ae22[_0x25bae9(0x19f)]();this[_0x25bae9(0x12d)](_0x31299c,_0x11d21f,_0x2171f1,_0x17ae22['length']),_0x26f92f?_0x25bae9(0x126)===_0x25bae9(0x126)?_0x11d21f+=_0xc07965:(_0x5ac25e[_0x25bae9(0x2fc)][_0x25bae9(0x302)][_0x25bae9(0x1cc)](this,_0x3e62aa),this[_0x25bae9(0x25b)]()['recalculateActionsFTB']()):_0x25bae9(0x2fb)!==_0x25bae9(0x186)?_0x2171f1+=_0xc07965:_0x3ca2c8['performTurnEndFTB']();}else _0x53528b-=_0x4168f7;}},Window_FTB_ActionCount[_0x15a739(0x2b7)]['createStartingCoordinates']=function(){const _0x2cf61f=_0x15a739,_0x9e1bd1=Window_FTB_ActionCount[_0x2cf61f(0x1cd)],_0x45b0ea=this[_0x2cf61f(0x1b3)]===$gameParty,_0x38ba62=_0x9e1bd1[_0x2cf61f(0x148)],_0x245ba3=_0x38ba62*(_0x9e1bd1[_0x2cf61f(0x303)]-0x1)+_0x9e1bd1[_0x2cf61f(0x2fe)]*(_0x9e1bd1[_0x2cf61f(0x303)]-0x2),_0x701f3c=_0x9e1bd1[_0x2cf61f(0x200)],_0x1bcb24=SceneManager[_0x2cf61f(0x1fd)]['_statusWindow'][_0x2cf61f(0x1a6)];let _0x4f3e11=0x0,_0x1c93a5=0x0;const _0x5d80c9=_0x9e1bd1[_0x2cf61f(0x2b5)];if(_0x5d80c9){if(_0x2cf61f(0x177)==='hByuO'){const _0x347228=_0x6c56c0[_0x2cf61f(0x289)][_0x2cf61f(0x2c4)](_0x42ad2a=>_0x42ad2a['_forceAction']);_0xf2287b[_0x2cf61f(0x18f)]();if(_0x347228){let _0x110bae=_0x347228[_0x2cf61f(0x1a4)];while(_0x110bae--){_0xbf451f['_actions'][_0x2cf61f(0x1f7)]();}_0x1fe0ab[_0x2cf61f(0x289)]=_0x347228[_0x2cf61f(0x2be)](_0x47bbcb[_0x2cf61f(0x289)]);}}else{_0x1c93a5=this[_0x2cf61f(0x1b7)]-_0x1bcb24-_0x9e1bd1['ScreenBufferY']-_0x38ba62,_0x4f3e11=_0x45b0ea?this[_0x2cf61f(0x26a)]-_0x9e1bd1[_0x2cf61f(0x1b4)]-_0x38ba62:_0x9e1bd1[_0x2cf61f(0x1b4)];if(_0x701f3c&&_0x45b0ea){if(_0x2cf61f(0x171)!==_0x2cf61f(0x28b))_0x4f3e11-=_0x245ba3;else return this['constructor']===_0x3b4a75&&_0x3a3866[_0x2cf61f(0x172)]()&&_0x40b4ed[_0x2cf61f(0x15d)];}else!_0x701f3c&&(_0x1c93a5-=_0x245ba3);}}else{if(_0x2cf61f(0x208)===_0x2cf61f(0x2c8))_0x59c35f===this[_0x2cf61f(0x25f)]()&&(this[_0x2cf61f(0x1bb)]=!![]),this[_0x2cf61f(0x29d)](_0x268e19),_0x38bc74[_0x2cf61f(0x2e7)](_0x36c714,_0x30775f);else{_0x1c93a5=_0x9e1bd1[_0x2cf61f(0x2ff)],_0x4f3e11=_0x45b0ea?this[_0x2cf61f(0x26a)]-_0x9e1bd1[_0x2cf61f(0x1b4)]-_0x38ba62:_0x9e1bd1['ScreenBufferX'];if(_0x701f3c&&_0x45b0ea){if(_0x2cf61f(0x1f0)===_0x2cf61f(0x209))return this['_ftbActionsCur']||0x0;else _0x4f3e11-=_0x245ba3;}}}return _0x4f3e11+=_0x45b0ea?_0x9e1bd1[_0x2cf61f(0x1a0)]:_0x9e1bd1[_0x2cf61f(0x142)],_0x1c93a5+=_0x45b0ea?_0x9e1bd1[_0x2cf61f(0x10e)]:_0x9e1bd1[_0x2cf61f(0x1e2)],new Point(Math[_0x2cf61f(0xf8)](_0x4f3e11),Math['round'](_0x1c93a5));},Window_FTB_ActionCount[_0x15a739(0x2b7)]['createContentsArray']=function(){const _0x45c1d4=_0x15a739,_0x2296f8=Window_FTB_ActionCount[_0x45c1d4(0x1cd)];let _0x263596=!![];if(_0x2296f8['DrawHorz']){if(this['_unit']===$gameParty)_0x263596=!_0x263596;}else _0x263596=!_0x2296f8[_0x45c1d4(0x2b5)];let _0x227aa5=this[_0x45c1d4(0x1b3)]['getCurrentActionsFTB'](),_0x307dab=Math['max'](0x0,this[_0x45c1d4(0x1b3)][_0x45c1d4(0x1ab)]()-_0x227aa5);const _0xfc8da0=[];while(_0x227aa5--){if(_0x45c1d4(0x150)!=='ZAOij')this['ftbSwitchActorDirection'](![]);else{const _0x263bd4=_0x45c1d4(0x10b);_0xfc8da0[_0x45c1d4(0x100)](_0x263bd4);}}while(_0x307dab--){const _0x1e35ef=_0x45c1d4(0x11f);_0x263596?_0x45c1d4(0x168)!=='bmdKx'?_0x1acc33[_0x45c1d4(0x2fc)][_0x45c1d4(0x220)][_0x45c1d4(0x1cc)](this):_0xfc8da0[_0x45c1d4(0x100)](_0x1e35ef):_0xfc8da0[_0x45c1d4(0x21a)](_0x1e35ef);}while(_0xfc8da0[_0x45c1d4(0x1a4)]<0xa){if(_0x45c1d4(0x138)==='CWTTm'){const _0x1aa928='Nothing';_0x263596?_0xfc8da0[_0x45c1d4(0x100)](_0x1aa928):_0x45c1d4(0x238)===_0x45c1d4(0x1f2)?(this['createActionsFTB'](),this[_0x45c1d4(0x2d6)](this[_0x45c1d4(0x1ab)]())):_0xfc8da0['unshift'](_0x1aa928);}else this[_0x45c1d4(0x17a)](_0x1518a9,_0x438c94);}return _0xfc8da0;},Window_FTB_ActionCount[_0x15a739(0x2b7)]['drawImage']=function(_0x563b83,_0x489c9b,_0x29f213,_0xf288ce){const _0x59e540=_0x15a739;if(_0x563b83===_0x59e540(0x185))return;if(_0x563b83===_0x59e540(0x10b))_0x563b83=this[_0x59e540(0x1b3)]===$gameParty?_0x59e540(0x105):_0x59e540(0x135);const _0x2ed95b=Window_FTB_ActionCount[_0x59e540(0x1cd)];if(_0x2ed95b['%1ActionPicture'[_0x59e540(0x275)](_0x563b83)]){const _0x256944=_0x2ed95b[_0x59e540(0x202)['format'](_0x563b83)],_0x2d05ff=ImageManager[_0x59e540(0x1c3)](_0x256944);_0x2d05ff[_0x59e540(0x292)](this[_0x59e540(0x1f1)][_0x59e540(0x137)](this,_0x2d05ff,_0x489c9b,_0x29f213,_0xf288ce));}else{const _0x4ed83c=ImageManager['ftb%1ActionsIcon'[_0x59e540(0x275)](_0x563b83)];this['drawBigIcon'](_0x4ed83c,_0x489c9b,_0x29f213),this['canDrawActionsRemaining'](_0xf288ce)&&this[_0x59e540(0x17a)](_0x489c9b,_0x29f213);}},Window_FTB_ActionCount[_0x15a739(0x2b7)][_0x15a739(0x1f1)]=function(_0x42daf9,_0x30a3ed,_0x2082e8,_0x189963){const _0x26facb=_0x15a739;if(!_0x42daf9)return;const _0x2db102=Window_FTB_ActionCount[_0x26facb(0x1cd)],_0x16decd=_0x2db102['ImageSize'],_0x516ece=_0x16decd/_0x42daf9[_0x26facb(0x127)],_0x2f1a7d=_0x16decd/_0x42daf9[_0x26facb(0x1a6)],_0x4b9590=Math[_0x26facb(0x22b)](_0x516ece,_0x2f1a7d,0x1),_0x167644=_0x42daf9[_0x26facb(0x1a6)],_0xba7854=_0x42daf9[_0x26facb(0x1a6)],_0x44dea3=Math[_0x26facb(0xf8)](_0x167644*_0x4b9590),_0xfefadc=Math['round'](_0xba7854*_0x4b9590),_0x1b61f7=Math[_0x26facb(0xf8)](_0x30a3ed+(_0x16decd-_0x44dea3)/0x2),_0xba7ba=Math['round'](_0x2082e8+(_0x16decd-_0xfefadc)/0x2);this[_0x26facb(0x2a3)]['_context']['imageSmoothingEnabled']=_0x2db102['PictureSmoothing'],this[_0x26facb(0x2a3)][_0x26facb(0x158)](_0x42daf9,0x0,0x0,_0x167644,_0xba7854,_0x1b61f7,_0xba7ba,_0x44dea3,_0xfefadc),this['contents']['_context']['imageSmoothingEnabled']=!![],this[_0x26facb(0x153)](_0x189963)&&this['drawActionsRemaining'](_0x30a3ed,_0x2082e8);},Window_FTB_ActionCount[_0x15a739(0x2b7)]['drawBigIcon']=function(_0x433fcf,_0x31879c,_0x483d28){const _0x1fa91f=_0x15a739,_0x2ea9c7=Window_FTB_ActionCount[_0x1fa91f(0x1cd)];let _0x17d9b4=_0x2ea9c7[_0x1fa91f(0x148)];const _0x29b48c=ImageManager[_0x1fa91f(0x1ea)]('IconSet'),_0x35d652=ImageManager['iconWidth'],_0x32a542=ImageManager[_0x1fa91f(0x294)],_0xe82b=_0x433fcf%0x10*_0x35d652,_0x552ec5=Math['floor'](_0x433fcf/0x10)*_0x32a542;this['contents'][_0x1fa91f(0x203)]['imageSmoothingEnabled']=_0x2ea9c7[_0x1fa91f(0x1cf)],this[_0x1fa91f(0x2a3)][_0x1fa91f(0x158)](_0x29b48c,_0xe82b,_0x552ec5,_0x35d652,_0x32a542,_0x31879c,_0x483d28,_0x17d9b4,_0x17d9b4),this[_0x1fa91f(0x2a3)][_0x1fa91f(0x203)]['imageSmoothingEnabled']=!![];},Window_FTB_ActionCount[_0x15a739(0x2b7)][_0x15a739(0x221)]=function(){const _0x4cd7c3=_0x15a739,_0x25ef4f=Window_FTB_ActionCount[_0x4cd7c3(0x1cd)];if(_0x25ef4f['BottomPosition'])return;if(!_0x25ef4f[_0x4cd7c3(0x17b)])return;const _0x3e82db=SceneManager[_0x4cd7c3(0x1fd)][_0x4cd7c3(0x2e9)];if(!_0x3e82db)return;_0x3e82db[_0x4cd7c3(0x226)]?(this['x']=_0x25ef4f[_0x4cd7c3(0x19d)]||0x0,this['y']=_0x25ef4f[_0x4cd7c3(0x20c)]||0x0):(this['x']=0x0,this['y']=0x0);},Window_FTB_ActionCount[_0x15a739(0x2b7)][_0x15a739(0x153)]=function(_0x55bbe4){const _0x18757a=_0x15a739,_0x1b9d4d=Window_FTB_ActionCount[_0x18757a(0x1cd)];if(!_0x1b9d4d[_0x18757a(0x144)])return![];const _0x34174a=_0x1b9d4d[_0x18757a(0x2b5)],_0x3fb8e1=_0x1b9d4d[_0x18757a(0x200)],_0xd65b3c=this['_unit']===$gameParty;if(_0x3fb8e1){if(_0x18757a(0x1f5)===_0x18757a(0x270)){const _0x5cf03d=this['_actorCommandWindow'];this[_0x18757a(0x1c1)]()&&delete _0x5cf03d[_0x18757a(0x11c)][_0x18757a(0x2a7)];}else return _0xd65b3c?_0x55bbe4===0x0:_0x55bbe4===_0x1b9d4d[_0x18757a(0x303)]-0x1;}else{if(_0x34174a){if(_0x18757a(0x16a)===_0x18757a(0x163)){if(_0x509c4e['isFTB']()){if(this[_0x18757a(0xfe)]())this[_0x18757a(0xfe)]()[_0x18757a(0x1de)]();return![];}return _0x14df5d[_0x18757a(0x2fc)][_0x18757a(0x114)][_0x18757a(0x1cc)](this);}else return _0x55bbe4===0x0;}else return _0x55bbe4===_0x1b9d4d[_0x18757a(0x303)]-0x1;}},Window_FTB_ActionCount[_0x15a739(0x2b7)][_0x15a739(0x17a)]=function(_0xfa74b,_0x5798b4){const _0x4bb511=_0x15a739;this[_0x4bb511(0x274)]();const _0x1c444c=Window_FTB_ActionCount[_0x4bb511(0x1cd)],_0xc5f820=new Rectangle(_0xfa74b,_0x5798b4,_0x1c444c[_0x4bb511(0x148)],_0x1c444c[_0x4bb511(0x148)]);_0xc5f820['x']+=_0x1c444c[_0x4bb511(0x2f2)],_0xc5f820['y']+=_0x1c444c[_0x4bb511(0x27f)];const _0x2ee31e=this['_unit'][_0x4bb511(0x1fc)]();this[_0x4bb511(0x2a3)][_0x4bb511(0x252)]=_0x1c444c[_0x4bb511(0x201)],this['contents'][_0x4bb511(0x27a)](_0x2ee31e,_0xc5f820['x'],_0xc5f820['y'],_0xc5f820[_0x4bb511(0x127)],_0xc5f820['height'],'center'),this['resetFontSettings']();};
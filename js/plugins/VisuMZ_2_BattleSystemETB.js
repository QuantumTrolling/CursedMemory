//=============================================================================
// VisuStella MZ - Battle System - ETB - Energy Turn Battle
// VisuMZ_2_BattleSystemETB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemETB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemETB = VisuMZ.BattleSystemETB || {};
VisuMZ.BattleSystemETB.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.06] [BattleSystemETB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_ETB_VisuStella_MZ
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
 * Energy Turn Battle (ETB) is a type of battle system made for RPG Maker MZ,
 * where the teams for actors and enemies take turns attacking one another as
 * a whole. Energy is accumulated as turns pass on, allowing each team to
 * perform more actions each turn. Each team can freely perform actions among
 * their teammates as wanted. When the energy count is depleted or if one team
 * ran out of battler's that can act, the other team begins their turn and
 * so forth.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "etb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actor and enemy teams take turns attacking each other as a whole.
 * * As the battle continues, energy is accumulated and more actions can be
 *   performed each turn.
 * * Energy count are given to each team at the start of each turn, and the
 *   amount of actions that can be performed increase progressively.
 * * Actors can be freely switched around to perform actions with.
 * * Alter the mechanics of the Battle System ETB to your liking through the
 *   Plugin Parameters.
 * * An Energy Count Display is shown for each side to relay information to the
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
 * Agility, however, can influence Energy Count through buffs and debuffs if
 * enabled through the Plugin Parameters. Each stack of Agility buffs will
 * raise the Energy Count for a team while each stack of Agility debuffs will
 * decrease them for subsequent turns.
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
 * Energy Ramping
 * 
 * As the battle starts and goes forward, energy is accumulated across the two
 * teams, allowing them to perform more actions each turn that has passed.
 * 
 * The amount of actions that can be performed at base value can be determined
 * inside the Plugin Parameters > Mechanics Settings > Turn Base.
 * 
 * By default, assuming nothing else has changed, each team will have a base
 * energy count of 1 each turn they acquire until they reach 10 actions. This
 * cap will be different if you changed the Plugin Parameters mentioned above.
 * 
 * Once the maximum cap has been reached, that will be the finalized amount for
 * the start of each turn after.
 * 
 * The Energy Count can be altered by AGI buffs and/or debuffs depending on the
 * Plugin Parameter settings.
 * 
 * Further Energy Count can be altered by various notetag effects tied to the
 * trait objects of each battle member.
 * 
 * ---
 * 
 * Free Range Switching
 * 
 * Free Range Switching is always available to the player in the battle system.
 * The player can freely switch between actors in his/her party by pressing the
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
 * === General ETB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <ETB Help>
 *  description
 *  description
 * </ETB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under ETB.
 * - This is primarily used if the skill behaves differently in ETB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to ETB.
 *
 * ---
 * 
 * === Energy Cost-Related Notetags ===
 * 
 * ---
 *
 * <ETB Energy Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the ETB energy cost of this skill/item to 'x'.
 * - Replace 'x' with a number value representing the energy cost required to
 *   perform the skill.
 *
 * ---
 *
 * <ETB Hide Energy Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the ETB energy cost for this skill/item hidden regardless of Plugin
 *   Parameter settings.
 * 
 * ---
 *
 * <ETB Show Energy Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the ETB energy cost for this skill/item visible regardless of Plugin
 *   Parameter settings.
 *
 * ---
 * 
 * === Mechanics-Related Notetags ===
 * 
 * ---
 *
 * <ETB Pass Turn>
 *
 * - Used for: Skill, Item Notetags
 * - If a battler uses this skill/item, then even if there is energy left for
 *   the team to perform, that battler would no longer be able to input as they
 *   have already passed their turn.
 * - By default, this applies to "Guard". If you don't want it to apply to the
 *   Guard skill, turn it off in the Plugin Parameters for mechanics.
 *
 * ---
 *
 * <ETB Energy: +x>
 * <ETB Energy: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Battlers associated with these trait objects can increase or decrease the
 *   maximum number of actions performed each turn.
 * - Replace 'x' with a number representing the increase or decrease in energy
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
 * System: ETB Energy Count Visibility
 * - Determine the visibility of the ETB Energy Count Display.
 *
 *   Visibility:
 *   - Changes the visibility of the ETB Energy Count Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Determines the general settings of the ETB Battle System. These settings
 * range from determining how the Action Count resources and costs are
 * displayed to the text that appear during team shifting.
 *
 * ---
 *
 * Energy Counts
 * 
 *   Full Name:
 *   - What is the full name of "Energy Counts" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Energy Counts" in your game?
 * 
 *   Cost Format:
 *   - How are Energy Count costs displayed?
 *   - %1 - Cost, %2 - Abbr Text, %3 - Icon
 * 
 * ---
 * 
 * Icons
 * 
 *   Actor Energy Icon:
 *   - What icon is used to represent actor actions?
 * 
 *   Enemy Energy Icon:
 *   - What icon is used to represent enemy actions?
 * 
 *   Empty Energy Icon:
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
 *   - Put the energy cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the energy cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the energy cost for the Guard command?
 * 
 *   Show Cost: 0 Energy:
 *   - Show the energy cost when the cost is 0 energy?
 * 
 *   Show Cost: 1 Energy:
 *   - Show the energy cost when the cost is 1 energy?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of the ETB Battle System. From here, you can
 * enable or disable core mechanics, determine how to determine turn advantage,
 * and how the various supporting mechanics operate.
 *
 * ---
 *
 * Main Mechanics
 * 
 *   Maintain Same Actor?:
 *   - Maintain the same actor after an action or move onto the next
 *     available actor?
 * 
 *   Guard > Pass Turn?:
 *   - Does guarding cause a battler to pass turn?
 * 
 *   Gain Differences?:
 *   - If the max Energy Count for a team changes, gain the difference in value
 *     if positive?
 * 
 *   Lose Differences?:
 *   - If the max Energy Count for a team changes, lose the difference in value
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
 * Energy Generation
 * 
 *   Turn Base:
 *   - What is the starting base number of actions that's available at
 *     each turn?
 * 
 *   AGI Buff Influence?:
 *   - Do AGI buffs give +1 for each stack?
 * 
 *   AGI Debuff Influence?:
 *   - Do AGI debuffs give -1 for each stack?
 * 
 *   Maximum Energy:
 *   - What is the absolute maximum number of actions a team can have
 *     each turn?
 * 
 *   Minimum Energy:
 *   - What is the bare minimum number of actions a team can have each turn?
 * 
 *   Allow Overflow?:
 *   - Allow current actions to overflow?
 *   - Or let them cap at the current team max?
 *
 * ---
 *
 * Default Energy Costs
 * 
 *   Skills:
 *   - What is the default energy cost for skills?
 * 
 *   Items:
 *   - What is the default energy cost for items?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Energy Count Display Settings
 * ============================================================================
 *
 * Adjust the settings for the Energy Count Display. They appear in the upper
 * or lower corners of the screen for the player party and the enemy troop.
 *
 * ---
 *
 * Display Settings
 * 
 *   Draw Horizontally?:
 *   - Which direction do you want the Energy Count Display to go?
 * 
 *   Bottom Position?:
 *   - Place the Energy Count Display towards the bottom of the screen?
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
 *   Actor Energy Picture:
 *   Enemy Energy Picture:
 *   Empty Energy Picture:
 *   - Optional. Place an image for an actor, enemy, or empty energy instead of
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
 *   Max Energy Visible:
 *   - How many energy slots max should be drawn for each team?
 * 
 *   Image Size:
 *   - What is the size of the icons or pictures for the energy slots?
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
 *   - Show a number to display the energy remaining?
 * 
 *   Font Size:
 *   - What font size should be used for this number?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the remaining energy number X/Y.
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
 * Version 1.06: October 20, 2022
 * * Bug Fixes!
 * ** Fixed problem with the Energy Count Display's Actor Offset Y not working
 *    properly. Fix made by Arisu.
 * 
 * Version 1.05: June 2, 2022
 * * Bug Fixes!
 * ** Fixed a bug where Force Actions do not work when there's only one action
 *    left for the turn. Fix made by Olivia.
 * 
 * Version 1.04: April 21, 2022
 * * Bug Fixes!
 * ** Fixed a bug that prevents the battle system from shifting back to the
 *    default battle system after an enemy counter attack. Fix made by Olivia.
 * 
 * Version 1.03: April 14, 2022
 * * Compatibility Update!
 * ** Now works more compatible with counters. Update made by Olivia.
 * 
 * Verison 1.02: March 17, 2022
 * * Bug Fixes!
 * ** Death by slip damage will now perform the proper death animation.
 *    Fix made by Olivia.
 * 
 * Version 1.01: January 13, 2022
 * * Bug Fixes!
 * ** Fixed a redistribution error. Fix made by Olivia.
 * 
 * Version 1.00 Official Release Date: September 6, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemActionCountVisibility
 * @text System: ETB Energy Count Visibility
 * @desc Determine the visibility of the ETB Energy Count Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the ETB Energy Count Display.
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
 * @param BattleSystemETB
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
 * @desc Determines the general settings of the ETB Battle System.
 * @default {"ActionCounts":"","ActionCountFull:str":"Energy Points","ActionCountAbbr:str":"EP","ActionCountCostFmt:str":"\\FS[22]\\C[0]×%1%3\\C[0]","Icons":"","ActorActionsIcon:num":"165","EnemyActionsIcon:num":"162","EmptyActionsIcon:num":"161","TeamShift":"","PartyTeamShiftFmt:str":"%1's Turn!","TroopTeamShiftFmt:str":"Opponent's Turn!","TeamShiftWait:num":"60","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","Show_0_Action_Cost:eval":"true","Show_1_Action_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of the ETB Battle System.
 * @default {"Main":"","KeepPrevActor:eval":"true","GuardPass:eval":"true","GainDiff:eval":"true","LoseDiff:eval":"false","StateBuffUpdate:eval":"true","TurnAdvantage":"","NeutralAdvantage:str":"average agi","ActionGeneration":"","TurnBase:arraynum":"[\"1\",\"1\",\"2\",\"2\",\"3\",\"3\",\"4\",\"4\",\"5\",\"5\",\"6\",\"6\",\"7\",\"7\",\"8\",\"8\",\"9\",\"9\",\"10\",\"10\"]","AgiBuff:eval":"false","AgiDebuff:eval":"false","MaxActions:num":"99","MinActions:num":"1","AllowOverflow:eval":"false","DefaultCost":"","DefaultCostSkill:num":"1","DefaultCostItem:num":"1"}
 *
 * @param ActionCountDisplay:struct
 * @text Energy Count Display
 * @type struct<ActionCountDisplay>
 * @desc Adjust the settings for the Energy Count Display.
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
 * @text Energy Count
 *
 * @param ActionCountFull:str
 * @text Full Name
 * @parent ActionCounts
 * @desc What is the full name of "Energy Count" in your game?
 * @default Energy Points
 *
 * @param ActionCountAbbr:str
 * @text Abbreviation
 * @parent ActionCounts
 * @desc What is the abbreviation of "Energy Count" in your game?
 * @default EP
 *
 * @param ActionCountCostFmt:str
 * @text Cost Format
 * @parent ActionCounts
 * @desc How are Energy Count costs displayed?
 * %1 - Cost, %2 - Abbr Text, %3 - Icon
 * @default \FS[22]\C[0]×%1%3\C[0]
 *
 * @param Icons
 *
 * @param ActorActionsIcon:num
 * @text Actor Energy Icon
 * @parent Icons
 * @desc What icon is used to represent actor energy?
 * @default 165
 *
 * @param EnemyActionsIcon:num
 * @text Enemy Energy Icon
 * @parent Icons
 * @desc What icon is used to represent enemy energy?
 * @default 162
 *
 * @param EmptyActionsIcon:num
 * @text Empty Energy Icon
 * @parent Icons
 * @desc What icon is used to represent empty energy?
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
 * @desc Put the energy cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the energy cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the energy cost for the Guard command?
 * @default false
 *
 * @param Show_0_Action_Cost:eval
 * @text Show Cost: 0 Energy
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the energy cost when the cost is 0 energy?
 * @default true
 *
 * @param Show_1_Action_Cost:eval
 * @text Show Cost: 1 Energy
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the energy cost when the cost is 1 energy?
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
 * @param KeepPrevActor:eval
 * @text Maintain Same Actor?
 * @parent Main
 * @type boolean
 * @on Maintain
 * @off Next Available
 * @desc Maintain the same actor after an action or move onto
 * the next available actor?
 * @default true
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
 * @desc If the max Energy Count for a team changes,
 * gain the difference in value if positive?
 * @default true
 *
 * @param LoseDiff:eval
 * @text Lose Differences?
 * @parent Main
 * @type boolean
 * @on Lose Differences
 * @off Keep Same
 * @desc If the max Energy Count for a team changes,
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
 * @text Energy Generation
 *
 * @param TurnBase:arraynum
 * @text Turn Base
 * @parent ActionGeneration
 * @type number[]
 * @desc What is the starting base number of actions that's available at each turn?
 * @default ["1","1","2","2","3","3","4","4","5","5","6","6","7","7","8","8","9","9","10","10"]
 *
 * @param AgiBuff:eval
 * @text AGI Buff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI buffs give +1 for each stack?
 * @default false
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
 * @text Maximum Energy
 * @parent ActionGeneration
 * @type number
 * @desc What is the absolute maximum number of actions a team can have each turn?
 * @default 99
 *
 * @param MinActions:num
 * @text Minimum Energy
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
 * @desc What is the default energy cost for skills?
 * @default 1
 *
 * @param DefaultCostItem:num
 * @text Items
 * @parent DefaultCost
 * @type number
 * @desc What is the default energy cost for items?
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
 * @desc Which direction do you want the Energy Count Display to go?
 * @default true
 *
 * @param BottomPosition:eval
 * @text Bottom Position?
 * @parent Display
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Place the Energy Count Display towards the bottom of the screen?
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
 * @text Actor Energy Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an actor energy instead of an icon?
 * @default 
 *
 * @param EnemyActionPicture:str
 * @text Enemy Energy Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an enemy energy instead of an icon?
 * @default 
 *
 * @param EmptyActionPicture:str
 * @text Empty Energy Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an empty energy instead of an icon?
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
 * @text Max Energy Visible
 * @parent DrawSettings
 * @desc How many energy slots max should be drawn for each team?
 * @default 10
 *
 * @param ImageSize:num
 * @text Image Size
 * @parent DrawSettings
 * @desc What is the size of the icons or pictures for the energy slots?
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
 * @desc Show a number to display the energy remaining?
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
 * @desc Offset the remaining energy number X.
 * @default 0
 *
 * @param ActionsRemainingOffsetY:num
 * @text Offset Y
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining energy number Y.
 * @default 0
 *
 */
//=============================================================================

const _0xb2d282=_0x5de2;(function(_0x2c595b,_0x4aecf8){const _0x4290eb=_0x5de2,_0x43ad97=_0x2c595b();while(!![]){try{const _0x22a8e9=-parseInt(_0x4290eb(0x19c))/0x1+parseInt(_0x4290eb(0x275))/0x2*(-parseInt(_0x4290eb(0x288))/0x3)+parseInt(_0x4290eb(0x224))/0x4*(parseInt(_0x4290eb(0x2c8))/0x5)+-parseInt(_0x4290eb(0x171))/0x6*(parseInt(_0x4290eb(0x2dc))/0x7)+-parseInt(_0x4290eb(0x24a))/0x8*(parseInt(_0x4290eb(0x262))/0x9)+-parseInt(_0x4290eb(0x2dd))/0xa+parseInt(_0x4290eb(0x131))/0xb;if(_0x22a8e9===_0x4aecf8)break;else _0x43ad97['push'](_0x43ad97['shift']());}catch(_0x15b2dd){_0x43ad97['push'](_0x43ad97['shift']());}}}(_0x38e1,0x5f776));var label=_0xb2d282(0x2b9),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xb2d282(0x2ac)](function(_0x3da823){const _0x2eb18b=_0xb2d282;return _0x3da823[_0x2eb18b(0x1b7)]&&_0x3da823['description']['includes']('['+label+']');})[0x0];function _0x5de2(_0x279cd8,_0x3c2474){const _0x38e1a4=_0x38e1();return _0x5de2=function(_0x5de26b,_0x3b24ac){_0x5de26b=_0x5de26b-0xe5;let _0x5007f1=_0x38e1a4[_0x5de26b];return _0x5007f1;},_0x5de2(_0x279cd8,_0x3c2474);}function _0x38e1(){const _0x54523a=['inBattle','_ETB_MIN_ACTIONS','_handlers','RegExp','processTurnETB','_ETB_BETWEEN_TEAMS_WAIT','getCurrentActionsETB','version','Empty','ulLUB','reduce','makeDeepCopy','RepositionTopForHelp','_ETB_COST_SHOW_GUARD','setCurrentActionsETB','processSwitchActors','MaxVisible','setUnit','Game_Battler_onTurnEnd','performCollapse','keepPrevSubjectETB','turnCount','BattleManager_endTurn','ActionsRemainingOffsetX','concat','getBattleSystem','makeAdditionalCostTextETB','innerWidth','max','AgiBuff','changeEquipById','reduceActionsETB','hide','Game_BattlerBase_updateStateTurns','SystemActionCountVisibility','maxCols','canMove','innerHeight','iconWidth','_unit','enemies','_ETB_GUARD_PASS','_etbActionsCur','BattleManager_isTeamBased','prototype','_etbPartyActionCountWindow','random','_ETB_ACTION_BASE','resetFontSettings','playCursorSound','startInputETB','canActETB','BottomPosition','isPassingTurnETB','NUM','_etbCurrentUnit','setup','finishActorInput','GainDiff','removeState','Game_Actor_changeEquipById','Game_BattlerBase_updateBuffTurns','clear','battleMembers','applyGlobal','meetEndTurnConditionsETB','isSceneBattle','invokeCounterAttack','Scene_Battle_commandFight','40lToWSF','waitCount','JxYWs','updateStateTurnsETB','fENfO','ImageGapDistance','startTurn','speed','screenX','BattleManager_startTurn','includes','selectNextActor','NeutralAdvantage','cursorLeft','WZLiw','bjXyx','call','_ETB_RESET_INDEX','members','_forcedBattlers','Game_BattlerBase_appear','etbHighestAgility','TeamShiftWait','BattleManager_battleSys','loadSystem','ImageSize','isSkill','active','aSJkt','lUlTy','ActionCountCostFmt','ARRAYEVAL','_ETB_ACTION_SECOND','_forceAction','updatePosition','attackSkillId','_actionBattlers','EnemyActionPicture','771832hHjRkg','refresh','constructor','Scene_Battle_commandCancel','_etbActionCountVisible','etbActionPointsAbbr','PassTurn','STR','qIWxo','VCwhU','Game_BattlerBase_clearStates','nLTqt','canDrawActionsRemaining','_ETB_COST_SHOW_0','clearPassTurnETB','endTurn','_ETB_FREE_CHANGE','performTurnEndETB','ARRAYNUM','hnDqx','Nothing','Window_Selectable_cursorPageup','match','updateVisibility','45yVjPcu','isActor','name','createActorCommandWindow','FXzRK','cursorRight','Game_Battler_forceAction','RKLYM','ndqPs','initMembersETB','BattleManager_endAllBattlersTurn','textWidth','etbCostFormat','aRvSA','BattleManager_setup','_logWindow','return\x200','addText','traitObjects','1559884bxGSvG','length','addState','note','ygnAQ','DefaultCostSkill','_actions','pmRvo','Window_Selectable_processTouch','select','ARRAYSTRUCT','_actorCommandWindow','BattleManager_forceAction','Game_Battler_removeBuff','createStartingCoordinates','MuFHg','LABiK','_maxActions','ItemsEquipsCore','3nyBrKO','agi','startInput','AllowOverflow','_partyCommandWindow','Game_System_initialize','transform','FUNC','crMpD','floor','ETB','_storedBitmaps','commandCancel','Show_0_Action_Cost','YoJRU','clamp','PLTSJ','startBattleETB','zANZu','drawItemNumberETB','_currentActions','startBattle','updateTurn','BattleManager_startInput','_ETB_MAX_ACTIONS','_ETB_KEEP_PREV_ACTOR','battler','_ETB_NEUTRAL_TURN_ADVANTAGE','PictureSmoothing','repositionLogWindowETB','Game_Actor_releaseUnequippableItems','yPLVb','agility','passTurnETB','ScreenBufferX','create','filter','removeBuff','useItem','ItemQuantityFmt','Game_Battler_useItem','center','rqmCr','etbFreeRangeSwitch','lMtsh','processTurn','Game_Actor_discardEquip','kYJbR','VVbXY','BattleSystemETB','BattleManager_isActiveTpb','map','update','discardEquip','Game_Battler_performCollapse','tZBss','LtoyD','DrawHorz','BattleManager_finishActorInput','height','clearStates','processTouchETB','loseCurrentActionsETB','RepositionTopHelpX','374515EVWMDV','OquyN','DefaultCostItem','_ETB_ACTION_AGI_BUFF','EVAL','format','etbSwitchActorDirection','setItem','General','forceActionETB','updateBuffTurns','PartyTeamShiftFmt','drawBigIcon','Game_Actor_selectNextCommand','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','cursorPageup','updateStateTurns','index','_etbTurnAdvantageUnit','isItem','1393CFHTnb','632570ocqsqi','friendsUnit','unshift','_scene','_ETB_ACTION_AGI_DEBUFF','BattleManager_invokeCounterAttack','AgiDebuff','RiSYw','parameters','createContentsArray','gainCurrentActionsETB','etbEnemyActionsIcon','updatePadding','drawTextEx','JrNEK','setSkill','Visible','isETB','makeActionOrdersETB','etbActorActionsIcon','_inputting','ARRAYJSON','bind','windowRect','_phase','initBattleSystemETB','Game_Action_speed','isDead','createActionsETB','drawImage','isTeamBased','initialize','MAeuW','BattleManager_selectNextActor','getActionCostETB','lkRGO','addBuff','etbPartyTeamShift','RaRJq','getMaxActionsETB','forceAction','drawText','setBattleSystemETBActionCountVisible','Game_Battler_addDebuff','_buffs','MaxActions','_ETB_COST_POSITION','ARRAYSTR','Enemy','dqOYw','_ETB_COST_SHOW_ATTACK','guardSkillId','push','fontSize','stepForward','endAction','_lastTargetIndex','jWzjG','_etbTroopActionCountWindow','contents','_ETB_ACTION_LAST','xIrzr','Game_BattlerBase_hide','ScreenBufferY','_bypassStateTurnUpdatesETB','etb%1ActionsIcon','endActionETB','isActiveTpb','MinActions','etbTotalAgility','cursorPagedown','etbActionPointsFull','Game_Unit_onBattleStart','setLastEtbIndex','STRUCT','LoseDiff','calculateTotalActionsETB','_doubleTouch','shift','pRKlk','total\x20agi','skillCostSeparator','isTpb','EnemyOffsetX','ActionCountDisplay','addLoadListener','isTurnBased','lowest\x20agi','17636718nTORXc','isPartyCommandWindowDisabled','loadPicture','BattleManager_isTurnBased','Scene_Battle_createActorCommandWindow','nBMOt','_currentActor','applyGlobalETB','JSON','BattleManager_startBattle','canUse','Game_Battler_addBuff','selectNextActorETB','DrawActionsRemaining','round','startActorInput','pop','removeActionBattlersETB','changeEquip','_ETB_ACTION_FIRST','etbActionCount','_passedTurnETB','canInput','drawPicture','_surprise','startTurnETB','IconSet','YLmkw','BattleManager_processTurn','ActionsRemainingFontSize','createActorCommandWindowETB','vGbEl','etbAliveMembers','decideRandomTarget','appear','vkqML','etbCreateTeamSwitchText','startDamagePopup','_etbTeamEven','setTarget','subject','BattleManager_makeActionOrders','qcAjD','setText','vVJBL','_preemptive','Game_Battler_addState','setBattleSystem','fNvZH','addChildAt','initMembers','hUzVB','blt','Window_Help_setItem','UVjyi','_subject','JwSuS','IconSmoothing','DTB','_ETB_RECALC_SUB_DIFF','Mechanics','SzrNU','CostPosition','changeClass','8082bfNfiv','KeepPrevActor','Scene_Battle_createAllWindows','average\x20agi','parse','visible','imageSmoothingEnabled','refreshActionCountWindowsETB','recalculateActionsETB','ConvertParams','releaseUnequippableItems','_windowLayer','drawItemNumber','%1ActionPicture','selectNextCommand','ActorOffsetY','item','min','bnMlu','setBackgroundType','some','Window_Base_drawItemNumber','isBattleSystemETBActionCountVisible','LxRkW','createActionCountWindowsETB','HideActionPointCost','commandFight','GuardPass','ActionCountFull','Show_1_Action_Cost','battleSys','Game_Enemy_transform','makeAdditionalSkillCostText','startActorCommandSelection','cancel','padding','Window_Selectable_cursorLeft','kfBky','stepBack','EmptyActionPicture','HZLSj','Game_Action_applyGlobal','Settings','367691rPtyow','actors','_etbActionsMax','checkNeedsUpdate','ARRAYFUNC','onTouchSelectETB','ItemScene','iconHeight','_etbLastIndex','endAllBattlersTurn','makeActions','isOpen','_etbTeamOdd','_context','zudpP','_ETB_COST_SHOW_1','getNextSubject','sort','isDrawItemNumber','makeActionOrders','Window_Selectable_cursorRight','Current','Game_Actor_changeEquip','ActorActionsIcon','removeStatesAuto','etbLowestAgility','createAllWindows','status','indexOf','currentAction','exit','payActionCostETB','ActionCountAbbr','XoBPZ','isTriggered','YDdon','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_ETB_ACTION_OVERFLOW','Game_Battler_removeState','OVTXe','trim','_inBattle','canActorBeSelectedETB','eJthN','EUrzR','forceChangeEquip','drawActionsRemaining','onTurnEnd','_ETB_RECALC_ADD_DIFF','ZKzkb','description','Window_Selectable_cursorPagedown','RsSbo','addDebuff','fGGLv','BattleManager_isTpb','commandCancelETB','BattleManager_endAction','_ETB_STATE_BUFF_TURN_UPDATES_ONLY_ON_OPPONENT_TURNS','endTurnETB','registerCommand','TroopTeamShiftFmt','processTouch','width','tsYoJ','EnemyActionsIcon','Actor'];_0x38e1=function(){return _0x54523a;};return _0x38e1();}VisuMZ[label][_0xb2d282(0x19b)]=VisuMZ[label][_0xb2d282(0x19b)]||{},VisuMZ[_0xb2d282(0x17a)]=function(_0x319fd4,_0x45e52e){const _0x1b191d=_0xb2d282;for(const _0x40757a in _0x45e52e){if(_0x40757a[_0x1b191d(0x260)](/(.*):(.*)/i)){const _0x215883=String(RegExp['$1']),_0x142544=String(RegExp['$2'])['toUpperCase']()[_0x1b191d(0x1c4)]();let _0x2181e6,_0x128cae,_0x1a0ee4;switch(_0x142544){case _0x1b191d(0x215):_0x2181e6=_0x45e52e[_0x40757a]!==''?Number(_0x45e52e[_0x40757a]):0x0;break;case _0x1b191d(0x25c):_0x128cae=_0x45e52e[_0x40757a]!==''?JSON[_0x1b191d(0x175)](_0x45e52e[_0x40757a]):[],_0x2181e6=_0x128cae['map'](_0x33d44a=>Number(_0x33d44a));break;case _0x1b191d(0x2cc):_0x2181e6=_0x45e52e[_0x40757a]!==''?eval(_0x45e52e[_0x40757a]):null;break;case _0x1b191d(0x243):_0x128cae=_0x45e52e[_0x40757a]!==''?JSON['parse'](_0x45e52e[_0x40757a]):[],_0x2181e6=_0x128cae[_0x1b191d(0x2bb)](_0x7c9cbf=>eval(_0x7c9cbf));break;case _0x1b191d(0x139):_0x2181e6=_0x45e52e[_0x40757a]!==''?JSON['parse'](_0x45e52e[_0x40757a]):'';break;case _0x1b191d(0xee):_0x128cae=_0x45e52e[_0x40757a]!==''?JSON['parse'](_0x45e52e[_0x40757a]):[],_0x2181e6=_0x128cae[_0x1b191d(0x2bb)](_0x58a31e=>JSON[_0x1b191d(0x175)](_0x58a31e));break;case _0x1b191d(0x28f):_0x2181e6=_0x45e52e[_0x40757a]!==''?new Function(JSON[_0x1b191d(0x175)](_0x45e52e[_0x40757a])):new Function(_0x1b191d(0x272));break;case _0x1b191d(0x1a0):_0x128cae=_0x45e52e[_0x40757a]!==''?JSON[_0x1b191d(0x175)](_0x45e52e[_0x40757a]):[],_0x2181e6=_0x128cae[_0x1b191d(0x2bb)](_0x376995=>new Function(JSON[_0x1b191d(0x175)](_0x376995)));break;case _0x1b191d(0x251):_0x2181e6=_0x45e52e[_0x40757a]!==''?String(_0x45e52e[_0x40757a]):'';break;case _0x1b191d(0x108):_0x128cae=_0x45e52e[_0x40757a]!==''?JSON[_0x1b191d(0x175)](_0x45e52e[_0x40757a]):[],_0x2181e6=_0x128cae[_0x1b191d(0x2bb)](_0x37f515=>String(_0x37f515));break;case _0x1b191d(0x123):_0x1a0ee4=_0x45e52e[_0x40757a]!==''?JSON['parse'](_0x45e52e[_0x40757a]):{},_0x2181e6=VisuMZ[_0x1b191d(0x17a)]({},_0x1a0ee4);break;case _0x1b191d(0x27f):_0x128cae=_0x45e52e[_0x40757a]!==''?JSON[_0x1b191d(0x175)](_0x45e52e[_0x40757a]):[],_0x2181e6=_0x128cae[_0x1b191d(0x2bb)](_0x3b1830=>VisuMZ[_0x1b191d(0x17a)]({},JSON['parse'](_0x3b1830)));break;default:continue;}_0x319fd4[_0x215883]=_0x2181e6;}}return _0x319fd4;},(_0x4c6a02=>{const _0x435868=_0xb2d282,_0x5a0ff5=_0x4c6a02['name'];for(const _0xc9e1e1 of dependencies){if(!Imported[_0xc9e1e1]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x435868(0x2cd)](_0x5a0ff5,_0xc9e1e1)),SceneManager['exit']();break;}}const _0x48e015=_0x4c6a02[_0x435868(0x1ce)];if(_0x48e015[_0x435868(0x260)](/\[Version[ ](.*?)\]/i)){if(_0x435868(0x2b8)===_0x435868(0x1c8)){const _0x5ed926=this['members']();return _0x4c190a[_0x435868(0x1fb)](..._0x5ed926[_0x435868(0x2bb)](_0x481c51=>_0x481c51[_0x435868(0x289)]));}else{const _0x5642de=Number(RegExp['$1']);_0x5642de!==VisuMZ[label][_0x435868(0x1e6)]&&(alert(_0x435868(0x2d6)[_0x435868(0x2cd)](_0x5a0ff5,_0x5642de)),SceneManager[_0x435868(0x1ba)]());}}if(_0x48e015[_0x435868(0x260)](/\[Tier[ ](\d+)\]/i)){const _0x33379f=Number(RegExp['$1']);_0x33379f<tier?(alert(_0x435868(0x1c0)[_0x435868(0x2cd)](_0x5a0ff5,_0x33379f,tier)),SceneManager['exit']()):tier=Math['max'](_0x33379f,tier);}VisuMZ[_0x435868(0x17a)](VisuMZ[label][_0x435868(0x19b)],_0x4c6a02[_0x435868(0x2e5)]);})(pluginData),PluginManager[_0xb2d282(0x1d8)](pluginData[_0xb2d282(0x264)],_0xb2d282(0x201),_0x5cc2a2=>{const _0x15e718=_0xb2d282;VisuMZ[_0x15e718(0x17a)](_0x5cc2a2,_0x5cc2a2);const _0xff369f=_0x5cc2a2[_0x15e718(0xe9)];$gameSystem[_0x15e718(0x103)](_0xff369f);}),VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x1e2)]={'ActionPointCost':/<ETB (?:EP|ACTION|ENERGY) COST:[ ](\d+)>/i,'HideActionPointCost':/<ETB HIDE (?:EP|ACTION|ENERGY) COST>/i,'ShowActionPointCost':/<ETB SHOW (?:EP|ACTION|ENERGY) COST>/i,'PassTurn':/<ETB PASS TURN>/i,'ActionPointTraitPlus':/<ETB (?:EP|ACTION|ACTIONS|ENERGY):[ ]([\+\-]\d+)>/i},DataManager[_0xb2d282(0xfb)]=function(_0x53457f){const _0x2eeb3a=_0xb2d282;if(!_0x53457f)return 0x0;const _0x2f86d2=VisuMZ[_0x2eeb3a(0x2b9)][_0x2eeb3a(0x19b)]['Mechanics'],_0x41bb86=VisuMZ[_0x2eeb3a(0x2b9)][_0x2eeb3a(0x1e2)],_0x396400=_0x53457f['note'];if(_0x396400['match'](_0x41bb86['ActionPointCost'])){if(_0x2eeb3a(0x164)===_0x2eeb3a(0x1aa))this[_0x2eeb3a(0xea)]()?this[_0x2eeb3a(0xeb)]():_0x17db42[_0x2eeb3a(0x2b9)]['BattleManager_makeActionOrders']['call'](this);else return Number(RegExp['$1']);}else{if(DataManager[_0x2eeb3a(0x23e)](_0x53457f)){if(_0x2eeb3a(0x116)===_0x2eeb3a(0x150))_0x2ab20d[_0x2eeb3a(0x2b9)][_0x2eeb3a(0xfa)][_0x2eeb3a(0x234)](this);else return _0x2f86d2[_0x2eeb3a(0x27a)];}else{if(DataManager[_0x2eeb3a(0x2db)](_0x53457f)){if(_0x2eeb3a(0x2c9)!==_0x2eeb3a(0x196))return _0x2f86d2[_0x2eeb3a(0x2ca)];else _0x423104['BattleSystemETB'][_0x2eeb3a(0x186)][_0x2eeb3a(0x234)](this,_0x5c997e,_0x2d7ff5,_0x1d5c34,_0x5013c4);}else return 0x0;}}},ImageManager[_0xb2d282(0xec)]=VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19b)][_0xb2d282(0x2d0)][_0xb2d282(0x1b3)],ImageManager[_0xb2d282(0x2e8)]=VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19b)][_0xb2d282(0x2d0)][_0xb2d282(0x1dd)],ImageManager['etbEmptyActionsIcon']=VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19b)][_0xb2d282(0x2d0)]['EmptyActionsIcon'],TextManager[_0xb2d282(0x120)]=VisuMZ[_0xb2d282(0x2b9)]['Settings'][_0xb2d282(0x2d0)][_0xb2d282(0x18d)],TextManager[_0xb2d282(0x24f)]=VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19b)]['General'][_0xb2d282(0x1bc)],TextManager[_0xb2d282(0x26e)]=VisuMZ['BattleSystemETB'][_0xb2d282(0x19b)][_0xb2d282(0x2d0)][_0xb2d282(0x242)],TextManager[_0xb2d282(0xfe)]=VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19b)][_0xb2d282(0x2d0)][_0xb2d282(0x2d3)],TextManager['etbTroopTeamShift']=VisuMZ['BattleSystemETB'][_0xb2d282(0x19b)][_0xb2d282(0x2d0)][_0xb2d282(0x1d9)],SceneManager['isSceneBattle']=function(){const _0x557899=_0xb2d282;return this['_scene']&&this[_0x557899(0x2e0)][_0x557899(0x24c)]===Scene_Battle;},BattleManager[_0xb2d282(0x25a)]=!![],BattleManager['_ETB_KEEP_PREV_ACTOR']=VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19b)][_0xb2d282(0x16d)][_0xb2d282(0x172)],BattleManager['_ETB_RESET_INDEX']=![],BattleManager[_0xb2d282(0x208)]=VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19b)]['Mechanics'][_0xb2d282(0x18c)],BattleManager[_0xb2d282(0x1cc)]=VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19b)][_0xb2d282(0x16d)][_0xb2d282(0x219)],BattleManager['_ETB_RECALC_SUB_DIFF']=VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19b)][_0xb2d282(0x16d)][_0xb2d282(0x124)],BattleManager[_0xb2d282(0x2a3)]=VisuMZ['BattleSystemETB'][_0xb2d282(0x19b)][_0xb2d282(0x16d)][_0xb2d282(0x230)],BattleManager[_0xb2d282(0x1e4)]=VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19b)]['General'][_0xb2d282(0x23a)],BattleManager[_0xb2d282(0x1d6)]=VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19b)][_0xb2d282(0x16d)]['StateBuffUpdate'],VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x23b)]=BattleManager[_0xb2d282(0x18f)],BattleManager['battleSys']=function(){const _0x137ba0=_0xb2d282;if(this[_0x137ba0(0xea)]())return'ETB';return VisuMZ[_0x137ba0(0x2b9)][_0x137ba0(0x23b)]['call'](this);},BattleManager['isETB']=function(){const _0x4c5f85=_0xb2d282;return $gameSystem[_0x4c5f85(0x1f8)]()===_0x4c5f85(0x292);},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x1d3)]=BattleManager['isTpb'],BattleManager[_0xb2d282(0x12b)]=function(){const _0x177d7d=_0xb2d282;if(this[_0x177d7d(0xea)]())return![];return VisuMZ[_0x177d7d(0x2b9)]['BattleManager_isTpb'][_0x177d7d(0x234)](this);},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x2ba)]=BattleManager[_0xb2d282(0x11c)],BattleManager[_0xb2d282(0x11c)]=function(){const _0x300a89=_0xb2d282;if(this['isETB']())return![];return VisuMZ[_0x300a89(0x2b9)][_0x300a89(0x2ba)][_0x300a89(0x234)](this);},VisuMZ['BattleSystemETB'][_0xb2d282(0x134)]=BattleManager[_0xb2d282(0x12f)],BattleManager['isTurnBased']=function(){const _0x1ac520=_0xb2d282;if(this[_0x1ac520(0xea)]())return!![];return VisuMZ['BattleSystemETB'][_0x1ac520(0x134)][_0x1ac520(0x234)](this);},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x20a)]=BattleManager[_0xb2d282(0xf7)],BattleManager[_0xb2d282(0xf7)]=function(){const _0xdaab37=_0xb2d282;if(this[_0xdaab37(0xea)]())return!![];return VisuMZ[_0xdaab37(0x2b9)]['BattleManager_isTeamBased']['call'](this);},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x29f)]=BattleManager['startInput'],BattleManager[_0xb2d282(0x28a)]=function(){const _0x3fc2fa=_0xb2d282;if(this[_0x3fc2fa(0xea)]())this[_0x3fc2fa(0x149)]=![];VisuMZ[_0x3fc2fa(0x2b9)][_0x3fc2fa(0x29f)]['call'](this);if(this['isETB']()&&$gameParty[_0x3fc2fa(0x147)]())this['startInputETB']();},BattleManager[_0xb2d282(0x211)]=function(){const _0x12dc0f=_0xb2d282;this[_0x12dc0f(0x22a)]();},VisuMZ['BattleSystemETB'][_0xb2d282(0x14d)]=BattleManager[_0xb2d282(0x2b5)],BattleManager[_0xb2d282(0x2b5)]=function(){const _0x2f606e=_0xb2d282;this[_0x2f606e(0xea)]()?this['processTurnETB']():VisuMZ['BattleSystemETB'][_0x2f606e(0x14d)]['call'](this);},BattleManager[_0xb2d282(0x1e3)]=function(){const _0x27e3c2=_0xb2d282,_0x18c00b=this['_subject'];if(_0x18c00b&&!_0x18c00b[_0x27e3c2(0x2de)]()[_0x27e3c2(0x212)]()){if('WZLiw'!==_0x27e3c2(0x232)){if(_0x4fcfa4<0x0)return _0x4b1217;}else this[_0x27e3c2(0x110)](),this['_subject']=null,this[_0x27e3c2(0x29e)](![]);}else{if(_0x18c00b&&_0x18c00b[_0x27e3c2(0x263)]()&&_0x18c00b[_0x27e3c2(0x147)]()){if(_0x27e3c2(0x169)!==_0x27e3c2(0x169))_0x3af75a[_0x27e3c2(0x2df)](_0x52ef3c);else{const _0x47201f=_0x18c00b[_0x27e3c2(0x1b9)]();if(!_0x47201f)VisuMZ[_0x27e3c2(0x2b9)][_0x27e3c2(0x14d)][_0x27e3c2(0x234)](this);else{if(_0x47201f[_0x27e3c2(0x245)]){if(_0x27e3c2(0x241)==='lUlTy')VisuMZ[_0x27e3c2(0x2b9)]['BattleManager_processTurn'][_0x27e3c2(0x234)](this);else{const _0x168fd1=_0x2bc089[_0x27e3c2(0xea)]();if(_0x168fd1)_0x756f76[_0x27e3c2(0x160)](_0x27e3c2(0x16b));_0x1dba83[_0x27e3c2(0x2b9)][_0x27e3c2(0x2e2)][_0x27e3c2(0x234)](this,_0x1543a8,_0x1ddf32);if(_0x168fd1)_0x8a54c1[_0x27e3c2(0x160)](_0x27e3c2(0x292));}}else _0x27e3c2(0x2a7)!=='yPLVb'?_0x503e0f[_0x27e3c2(0xea)]()&&_0x5b765a[_0x27e3c2(0x25a)]&&this[_0x27e3c2(0x24c)]===_0x9a34a2?this['processTouchETB']():_0x4c707c[_0x27e3c2(0x2b9)][_0x27e3c2(0x27d)][_0x27e3c2(0x234)](this):(this[_0x27e3c2(0x137)]=_0x18c00b,this[_0x27e3c2(0x140)]());}}}else VisuMZ[_0x27e3c2(0x2b9)]['BattleManager_processTurn'][_0x27e3c2(0x234)](this);}},VisuMZ['BattleSystemETB'][_0xb2d282(0x2c2)]=BattleManager[_0xb2d282(0x218)],BattleManager[_0xb2d282(0x218)]=function(){const _0x1330f9=_0xb2d282;this['isETB']()?VisuMZ[_0x1330f9(0x2b9)][_0x1330f9(0x14d)][_0x1330f9(0x234)](this):VisuMZ[_0x1330f9(0x2b9)]['BattleManager_finishActorInput']['call'](this);},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0xfa)]=BattleManager[_0xb2d282(0x22f)],BattleManager[_0xb2d282(0x22f)]=function(){const _0x2e58f8=_0xb2d282;if(this[_0x2e58f8(0xea)]()){if(_0x2e58f8(0x1d2)===_0x2e58f8(0x1d2))this[_0x2e58f8(0x13d)]();else{this['_logWindow'][_0x2e58f8(0x10d)](_0x2e58f8(0x273),_0x3e3bd5);const _0x331975=_0x31314d[_0x2e58f8(0x1e4)];this[_0x2e58f8(0x271)][_0x2e58f8(0x10d)](_0x2e58f8(0x225),_0x331975),this[_0x2e58f8(0x271)]['push'](_0x2e58f8(0x21d));}}else VisuMZ[_0x2e58f8(0x2b9)]['BattleManager_selectNextActor'][_0x2e58f8(0x234)](this);},BattleManager[_0xb2d282(0x13d)]=function(){const _0x5101eb=_0xb2d282;this[_0x5101eb(0x137)]=null,this[_0x5101eb(0xed)]=![];},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x1d5)]=BattleManager[_0xb2d282(0x110)],BattleManager['endAction']=function(){const _0x544789=_0xb2d282,_0x17dac4=this[_0x544789(0x168)];VisuMZ[_0x544789(0x2b9)][_0x544789(0x1d5)][_0x544789(0x234)](this),this[_0x544789(0x11b)](_0x17dac4);},BattleManager[_0xb2d282(0x11b)]=function(_0x440755){const _0x429a4d=_0xb2d282;if(!this[_0x429a4d(0xea)]())return;if(_0x440755){if(_0x429a4d(0x199)!==_0x429a4d(0x199))return this[_0x429a4d(0x2e0)]&&this[_0x429a4d(0x2e0)]['constructor']===_0x5389fa;else{const _0x285991=_0x440755[_0x429a4d(0x27b)][_0x429a4d(0x2ac)](_0x54b172=>_0x54b172['_forceAction']);_0x440755[_0x429a4d(0x1a6)]();if(_0x285991){if(_0x429a4d(0x285)==='YpiDj')this['_etbLastIndex']=0x0;else{let _0x1716f5=_0x285991[_0x429a4d(0x276)];while(_0x1716f5--){if(_0x429a4d(0x136)!==_0x429a4d(0x136)){const _0x4c6a59=_0x44a2b7['shift']();this[_0x429a4d(0xf6)](_0x4c6a59,_0x471f2b,_0x5330e3,_0x26dd7e[_0x429a4d(0x276)]),_0x4dda26?_0x1addce+=_0x4556db:_0x13e7c4+=_0xcc605f;}else _0x440755['_actions'][_0x429a4d(0x141)]();}_0x440755[_0x429a4d(0x27b)]=_0x285991[_0x429a4d(0x1f7)](_0x440755[_0x429a4d(0x27b)]);}}}}if(this[_0x429a4d(0x237)][_0x429a4d(0x276)]>0x0)this[_0x429a4d(0x168)]&&(!this[_0x429a4d(0x248)][_0x429a4d(0x22e)](this[_0x429a4d(0x168)])&&this['_actionBattlers'][_0x429a4d(0x2df)](this[_0x429a4d(0x168)])),this[_0x429a4d(0x168)]=this[_0x429a4d(0x1ac)]();else this[_0x429a4d(0x1f3)](_0x440755)&&(this[_0x429a4d(0x168)]=_0x440755);_0x440755[_0x429a4d(0x2de)]()[_0x429a4d(0x122)](_0x440755);},BattleManager[_0xb2d282(0x1f3)]=function(_0x21a4dc){const _0x23eb04=_0xb2d282;if(!_0x21a4dc)return![];if(!_0x21a4dc[_0x23eb04(0x263)]())return![];if(!_0x21a4dc[_0x23eb04(0x203)]())return![];if(!_0x21a4dc[_0x23eb04(0x147)]())return![];if(_0x21a4dc[_0x23eb04(0x214)]())return![];return BattleManager[_0x23eb04(0x25a)]&&BattleManager[_0x23eb04(0x2a1)];},VisuMZ[_0xb2d282(0x2b9)]['BattleManager_startBattle']=BattleManager[_0xb2d282(0x29d)],BattleManager[_0xb2d282(0x29d)]=function(){const _0x15b76c=_0xb2d282;VisuMZ[_0x15b76c(0x2b9)][_0x15b76c(0x13a)][_0x15b76c(0x234)](this),this[_0x15b76c(0x299)]();},BattleManager['startBattleETB']=function(){const _0x225a18=_0xb2d282;if(!this[_0x225a18(0xea)]())return;if(this[_0x225a18(0x15e)])this['_etbTurnAdvantageUnit']=_0x225a18(0x19d);else this[_0x225a18(0x149)]?'rnEFL'==='jJMOC'?_0x3d2b6c-=this['textWidth'](this[_0x225a18(0x12a)]())+_0x310e8b:this[_0x225a18(0x2da)]='enemies':this[_0x225a18(0x2da)]=BattleManager['_ETB_NEUTRAL_TURN_ADVANTAGE'];this['_etbTurnAdvantageUnit']=this['_etbTurnAdvantageUnit']||_0x225a18(0x20d);let _0x5d9601=0x0,_0x37935e=0x0;switch(this[_0x225a18(0x2da)]['toLowerCase']()[_0x225a18(0x1c4)]()){case _0x225a18(0x20d):let _0x5d9b8a=[_0x225a18(0x19d),'enemies'];this[_0x225a18(0x2da)]=_0x5d9b8a[Math['randomInt'](_0x5d9b8a[_0x225a18(0x276)])];break;case'player':this[_0x225a18(0x2da)]=_0x225a18(0x19d);break;case'enemy':this[_0x225a18(0x2da)]=_0x225a18(0x207);break;case _0x225a18(0x130):_0x5d9601=$gameParty['etbLowestAgility'](),_0x37935e=$gameTroop[_0x225a18(0x1b5)](),this[_0x225a18(0x2da)]=_0x5d9601>=_0x37935e?'actors':'enemies';break;case _0x225a18(0x174):_0x5d9601=$gameParty[_0x225a18(0x2a8)](),_0x37935e=$gameTroop[_0x225a18(0x2a8)](),this[_0x225a18(0x2da)]=_0x5d9601>=_0x37935e?_0x225a18(0x19d):'enemies';break;case'highest\x20agi':_0x5d9601=$gameParty['etbHighestAgility'](),_0x37935e=$gameTroop[_0x225a18(0x239)](),this['_etbTurnAdvantageUnit']=_0x5d9601>=_0x37935e?'actors':_0x225a18(0x207);break;case _0x225a18(0x129):_0x5d9601=$gameParty[_0x225a18(0x11e)](),_0x37935e=$gameTroop[_0x225a18(0x11e)](),this[_0x225a18(0x2da)]=_0x5d9601>=_0x37935e?_0x225a18(0x19d):_0x225a18(0x207);break;}this[_0x225a18(0x1a8)]=this['_etbTurnAdvantageUnit']==='actors'?$gameParty:$gameTroop,this[_0x225a18(0x157)]=this['_etbTurnAdvantageUnit']===_0x225a18(0x19d)?$gameTroop:$gameParty,this['_etbTeamOdd'][_0x225a18(0x125)](0x1),this[_0x225a18(0x157)][_0x225a18(0x125)](0x2),this[_0x225a18(0x157)][_0x225a18(0x1ed)](this[_0x225a18(0x157)][_0x225a18(0x100)]());},VisuMZ[_0xb2d282(0x2b9)]['BattleManager_makeActionOrders']=BattleManager[_0xb2d282(0x1af)],BattleManager[_0xb2d282(0x1af)]=function(){const _0x499ecb=_0xb2d282;if(this[_0x499ecb(0xea)]()){if(_0x499ecb(0x2e4)==='RiSYw')this[_0x499ecb(0xeb)]();else{if(this['isETB']())return _0x499ecb(0x292);return _0x5bae96[_0x499ecb(0x2b9)][_0x499ecb(0x23b)][_0x499ecb(0x234)](this);}}else VisuMZ[_0x499ecb(0x2b9)][_0x499ecb(0x15a)][_0x499ecb(0x234)](this);},Game_Unit[_0xb2d282(0x20b)][_0xb2d282(0xeb)]=function(){const _0x3f8d55=_0xb2d282;this[_0x3f8d55(0x258)](),this[_0x3f8d55(0x125)](),this[_0x3f8d55(0x14a)]();},BattleManager[_0xb2d282(0xeb)]=function(){const _0x2522ac=_0xb2d282;let _0x2aee75=[],_0x4bba08=[],_0x57dbef=0x0;const _0x10fe54=$gameTroop[_0x2522ac(0x1f4)]();let _0x558977=_0x10fe54%0x2===0x0?this[_0x2522ac(0x157)]:this[_0x2522ac(0x1a8)];_0x558977['makeActionOrdersETB'](),this[_0x2522ac(0x216)]=_0x558977;if(_0x558977===$gameParty){let _0x4fd35d=$gameParty[_0x2522ac(0x151)]()['filter'](_0x398c77=>_0x398c77[_0x2522ac(0x203)]()&&!_0x398c77[_0x2522ac(0x147)]()),_0xb44ce6=$gameParty[_0x2522ac(0x151)]()[_0x2522ac(0x2ac)](_0x37b8ee=>_0x37b8ee['canMove']()&&_0x37b8ee[_0x2522ac(0x147)]());_0x2aee75=_0x2aee75[_0x2522ac(0x1f7)](_0x4fd35d),_0x57dbef=Game_Unit['_ETB_MAX_ACTIONS'];while(_0x57dbef--){_0x2aee75=_0x2aee75['concat'](_0xb44ce6);}_0x57dbef=Game_Unit['_ETB_MAX_ACTIONS']-0x1;while(_0x57dbef--){_0x2aee75=_0x2aee75['concat'](_0x4fd35d);}}if(_0x558977===$gameTroop){let _0x13bdff=$gameTroop[_0x2522ac(0x151)]()[_0x2522ac(0x2ac)](_0xfa5134=>_0xfa5134[_0x2522ac(0x203)]());if($gameSystem['isSideView']()){if(_0x2522ac(0xfc)!=='lkRGO'){const _0x4b470c=_0x26d528(_0x4ca8ee['$1']);_0x4b470c<_0x45df57?(_0x3b181b(_0x2522ac(0x1c0)[_0x2522ac(0x2cd)](_0xbc15d8,_0x4b470c,_0x1ea306)),_0x154ec7[_0x2522ac(0x1ba)]()):_0x3d9dcf=_0x2e6b79[_0x2522ac(0x1fb)](_0x4b470c,_0x2fbf8b);}else _0x13bdff[_0x2522ac(0x1ad)]((_0x12659f,_0x1f8e6f)=>_0x1f8e6f[_0x2522ac(0x22c)]()-_0x12659f['screenX']());}else _0x13bdff[_0x2522ac(0x1ad)]((_0x23e414,_0x1cb2a3)=>_0x23e414['screenX']()-_0x1cb2a3['screenX']());_0x57dbef=Game_Unit[_0x2522ac(0x2a0)];while(_0x57dbef--){_0x4bba08=_0x4bba08[_0x2522ac(0x1f7)](_0x13bdff);}$gameTroop[_0x2522ac(0x1a6)]();}this[_0x2522ac(0x248)]=_0x2aee75[_0x2522ac(0x1f7)](_0x4bba08);},BattleManager[_0xb2d282(0x142)]=function(){const _0xfc81db=_0xb2d282;if(!this[_0xfc81db(0xea)]())return;this[_0xfc81db(0x248)]=this[_0xfc81db(0x248)]||[],this['_actionBattlers']=this[_0xfc81db(0x248)][_0xfc81db(0x2ac)](_0x4513f8=>_0x4513f8[_0xfc81db(0x203)]()&&!_0x4513f8['isPassingTurnETB']());},VisuMZ['BattleSystemETB'][_0xb2d282(0x270)]=BattleManager[_0xb2d282(0x217)],BattleManager[_0xb2d282(0x217)]=function(_0x38cf1b,_0x12879f,_0x440b34){const _0x24bdab=_0xb2d282;VisuMZ[_0x24bdab(0x2b9)][_0x24bdab(0x270)][_0x24bdab(0x234)](this,_0x38cf1b,_0x12879f,_0x440b34),this[_0x24bdab(0x26b)]();},BattleManager[_0xb2d282(0x26b)]=function(){const _0xb5e54=_0xb2d282;if(!BattleManager[_0xb5e54(0xea)]())return;this[_0xb5e54(0x216)]=undefined,$gameParty[_0xb5e54(0x14a)](),$gameTroop[_0xb5e54(0x14a)]();},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x22d)]=BattleManager[_0xb2d282(0x22a)],BattleManager['startTurn']=function(){const _0x43ab69=_0xb2d282;this[_0x43ab69(0x14a)](),VisuMZ[_0x43ab69(0x2b9)][_0x43ab69(0x22d)]['call'](this),this['etbCreateTeamSwitchText']();},BattleManager[_0xb2d282(0x14a)]=function(){const _0x43c6b8=_0xb2d282;if(!BattleManager[_0x43c6b8(0xea)]())return;$gameParty['clearPassTurnETB'](),$gameTroop[_0x43c6b8(0x258)]();const _0x20a775=$gameTroop[_0x43c6b8(0x1f4)]()+0x1;let _0x589750=_0x20a775%0x2===0x0?this[_0x43c6b8(0x157)]:this[_0x43c6b8(0x1a8)],_0x493e99=_0x20a775%0x2===0x0?this[_0x43c6b8(0x1a8)]:this[_0x43c6b8(0x157)];_0x20a775>0x1&&_0x493e99[_0x43c6b8(0x25b)](),_0x589750[_0x43c6b8(0x227)](),_0x589750[_0x43c6b8(0x14a)]();},VisuMZ['BattleSystemETB'][_0xb2d282(0x1f5)]=BattleManager[_0xb2d282(0x259)],BattleManager[_0xb2d282(0x259)]=function(){const _0x53eaf0=_0xb2d282;VisuMZ[_0x53eaf0(0x2b9)]['BattleManager_endTurn'][_0x53eaf0(0x234)](this),this['endTurnETB']();},BattleManager[_0xb2d282(0x1d7)]=function(){const _0x510549=_0xb2d282;if(!BattleManager[_0x510549(0xea)]())return;},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x26c)]=BattleManager[_0xb2d282(0x1a5)],BattleManager[_0xb2d282(0x1a5)]=function(){const _0x18869f=_0xb2d282;if(this[_0x18869f(0xea)]())return;VisuMZ[_0x18869f(0x2b9)][_0x18869f(0x26c)]['call'](this);},BattleManager[_0xb2d282(0x155)]=function(){const _0x4c94c0=_0xb2d282;if(!BattleManager[_0x4c94c0(0xea)]())return;let _0x2b9d32='';if(this[_0x4c94c0(0x216)]===$gameParty){let _0x48c21d=$gameParty[_0x4c94c0(0x264)]();_0x2b9d32=TextManager['etbPartyTeamShift']['format'](_0x48c21d);}else _0x4c94c0(0x2b4)==='lMtsh'?_0x2b9d32=TextManager['etbTroopTeamShift']:(_0x289f53[_0x4c94c0(0x2b9)]['Game_BattlerBase_appear'][_0x4c94c0(0x234)](this),_0xbc1964[_0x4c94c0(0x142)](),this[_0x4c94c0(0x2de)]()[_0x4c94c0(0x179)]());if(_0x2b9d32!==''){this[_0x4c94c0(0x271)][_0x4c94c0(0x10d)]('addText',_0x2b9d32);const _0x5172a4=BattleManager[_0x4c94c0(0x1e4)];this[_0x4c94c0(0x271)]['push'](_0x4c94c0(0x225),_0x5172a4),this[_0x4c94c0(0x271)][_0x4c94c0(0x10d)](_0x4c94c0(0x21d));}},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x2e2)]=BattleManager[_0xb2d282(0x222)],BattleManager[_0xb2d282(0x222)]=function(_0x32323,_0x330f14){const _0xe2e9dc=_0xb2d282,_0x548404=BattleManager[_0xe2e9dc(0xea)]();if(_0x548404)$gameSystem[_0xe2e9dc(0x160)](_0xe2e9dc(0x16b));VisuMZ[_0xe2e9dc(0x2b9)][_0xe2e9dc(0x2e2)][_0xe2e9dc(0x234)](this,_0x32323,_0x330f14);if(_0x548404)$gameSystem[_0xe2e9dc(0x160)](_0xe2e9dc(0x292));},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x28d)]=Game_System['prototype'][_0xb2d282(0xf8)],Game_System[_0xb2d282(0x20b)][_0xb2d282(0xf8)]=function(){const _0x41e334=_0xb2d282;VisuMZ['BattleSystemETB'][_0x41e334(0x28d)][_0x41e334(0x234)](this),this[_0x41e334(0xf2)]();},Game_System[_0xb2d282(0x20b)][_0xb2d282(0xf2)]=function(){const _0x58ca0d=_0xb2d282;this[_0x58ca0d(0x24e)]=!![];},Game_System[_0xb2d282(0x20b)][_0xb2d282(0x187)]=function(){const _0x41c3db=_0xb2d282;if(BattleManager[_0x41c3db(0xf1)]==='battleEnd')return![];return this[_0x41c3db(0x24e)]===undefined&&this[_0x41c3db(0xf2)](),this[_0x41c3db(0x24e)];},Game_System[_0xb2d282(0x20b)][_0xb2d282(0x103)]=function(_0x11e7a6){const _0x6caa86=_0xb2d282;this[_0x6caa86(0x24e)]===undefined&&this[_0x6caa86(0xf2)](),this[_0x6caa86(0x24e)]=_0x11e7a6;},VisuMZ[_0xb2d282(0x2b9)]['Game_Action_speed']=Game_Action[_0xb2d282(0x20b)][_0xb2d282(0x22b)],Game_Action[_0xb2d282(0x20b)][_0xb2d282(0x22b)]=function(){const _0x1e0d1e=_0xb2d282;if(BattleManager[_0x1e0d1e(0xea)]())return 0x0;else{if('dKkYD'!==_0x1e0d1e(0x167))return VisuMZ['BattleSystemETB'][_0x1e0d1e(0xf3)][_0x1e0d1e(0x234)](this);else _0x2383d8[_0x1e0d1e(0x1ad)]((_0x273f75,_0x2949e7)=>_0x273f75['screenX']()-_0x2949e7[_0x1e0d1e(0x22c)]());}},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19a)]=Game_Action[_0xb2d282(0x20b)][_0xb2d282(0x21f)],Game_Action['prototype']['applyGlobal']=function(){const _0x3fd011=_0xb2d282;VisuMZ[_0x3fd011(0x2b9)][_0x3fd011(0x19a)][_0x3fd011(0x234)](this),this[_0x3fd011(0x138)]();},Game_Action[_0xb2d282(0x20b)][_0xb2d282(0x138)]=function(){const _0x215bed=_0xb2d282;if(!BattleManager[_0x215bed(0xea)]())return;if(!this['subject']())return;if(!this[_0x215bed(0x181)]())return;if(this[_0x215bed(0x23e)]()&&this[_0x215bed(0x181)]()['id']===this['subject']()[_0x215bed(0x10c)]()){if(BattleManager[_0x215bed(0x208)]){if(_0x215bed(0x2bf)!==_0x215bed(0x2bf)){if(!_0x320da0[_0x215bed(0xea)]())return;let _0x1e698b='';if(this['_etbCurrentUnit']===_0x4bf622){let _0xb76644=_0x3eb6a0['name']();_0x1e698b=_0x31024b['etbPartyTeamShift'][_0x215bed(0x2cd)](_0xb76644);}else _0x1e698b=_0x47acaf['etbTroopTeamShift'];if(_0x1e698b!==''){this[_0x215bed(0x271)]['push'](_0x215bed(0x273),_0x1e698b);const _0x34d57b=_0x5067a2['_ETB_BETWEEN_TEAMS_WAIT'];this[_0x215bed(0x271)][_0x215bed(0x10d)]('waitCount',_0x34d57b),this[_0x215bed(0x271)]['push'](_0x215bed(0x21d));}}else this[_0x215bed(0x159)]()[_0x215bed(0x2a9)]();}}const _0x2935bf=VisuMZ[_0x215bed(0x2b9)]['RegExp'],_0x58c554=this['item']()['note'];_0x58c554[_0x215bed(0x260)](_0x2935bf[_0x215bed(0x250)])&&this['subject']()[_0x215bed(0x2a9)]();},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x117)]=Game_BattlerBase[_0xb2d282(0x20b)][_0xb2d282(0x1ff)],Game_BattlerBase[_0xb2d282(0x20b)]['hide']=function(){const _0x843cf8=_0xb2d282;VisuMZ['BattleSystemETB'][_0x843cf8(0x117)][_0x843cf8(0x234)](this),BattleManager[_0x843cf8(0x142)](),this[_0x843cf8(0x2de)]()[_0x843cf8(0x179)]();},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x238)]=Game_BattlerBase[_0xb2d282(0x20b)][_0xb2d282(0x153)],Game_BattlerBase[_0xb2d282(0x20b)][_0xb2d282(0x153)]=function(){const _0x3d44a4=_0xb2d282;VisuMZ['BattleSystemETB']['Game_BattlerBase_appear'][_0x3d44a4(0x234)](this),BattleManager[_0x3d44a4(0x142)](),this[_0x3d44a4(0x2de)]()[_0x3d44a4(0x179)]();},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x2be)]=Game_Battler['prototype']['performCollapse'],Game_Battler[_0xb2d282(0x20b)]['performCollapse']=function(){const _0x273684=_0xb2d282;VisuMZ[_0x273684(0x2b9)][_0x273684(0x2be)][_0x273684(0x234)](this),BattleManager[_0x273684(0x142)](),this[_0x273684(0x2de)]()[_0x273684(0x179)]();},Game_BattlerBase[_0xb2d282(0x20b)][_0xb2d282(0x2a9)]=function(){const _0x142f97=_0xb2d282;this[_0x142f97(0x146)]=!![],BattleManager[_0x142f97(0x142)]();},Game_BattlerBase[_0xb2d282(0x20b)]['isPassingTurnETB']=function(){const _0x286aca=_0xb2d282;return!!this[_0x286aca(0x146)];},Game_BattlerBase[_0xb2d282(0x2cb)]=VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19b)][_0xb2d282(0x16d)][_0xb2d282(0x1fc)],Game_BattlerBase['_ETB_ACTION_AGI_DEBUFF']=VisuMZ['BattleSystemETB']['Settings'][_0xb2d282(0x16d)][_0xb2d282(0x2e3)],Game_BattlerBase[_0xb2d282(0x20b)][_0xb2d282(0x145)]=function(){const _0x19c406=_0xb2d282;let _0xab636c=0x0;if(this[_0x19c406(0x105)]===undefined)this['clearBuffs']();const _0x30ba8b=this[_0x19c406(0x105)][0x6]||0x0;if(_0x30ba8b>0x0&&Game_BattlerBase[_0x19c406(0x2cb)]){if(_0x19c406(0xff)===_0x19c406(0xf9))return _0x254001===0x0;else _0xab636c+=_0x30ba8b;}else _0x30ba8b<0x0&&Game_BattlerBase[_0x19c406(0x2e1)]&&(_0xab636c+=_0x30ba8b);const _0x2a78ae=VisuMZ[_0x19c406(0x2b9)]['RegExp'],_0x6a3531=this[_0x19c406(0x274)]();for(const _0x2ca7c4 of _0x6a3531){if(!_0x2ca7c4)continue;const _0x5c06e9=_0x2ca7c4[_0x19c406(0x278)];_0x5c06e9['match'](_0x2a78ae['ActionPointTraitPlus'])&&(_0x19c406(0x1e8)===_0x19c406(0x253)?_0x183130[_0x19c406(0x2b9)][_0x19c406(0x14d)]['call'](this):_0xab636c+=Number(RegExp['$1']));}return Math['max'](0x0,_0xab636c);},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x254)]=Game_BattlerBase['prototype'][_0xb2d282(0x2c4)],Game_BattlerBase[_0xb2d282(0x20b)]['clearStates']=function(){const _0x23de77=_0xb2d282;VisuMZ[_0x23de77(0x2b9)][_0x23de77(0x254)][_0x23de77(0x234)](this),this[_0x23de77(0x2de)]()[_0x23de77(0x179)]();},VisuMZ[_0xb2d282(0x2b9)]['Game_BattlerBase_canUse']=Game_BattlerBase[_0xb2d282(0x20b)][_0xb2d282(0x13b)],Game_BattlerBase[_0xb2d282(0x20b)]['canUse']=function(_0x3b0dad){const _0x413d91=_0xb2d282;if(SceneManager[_0x413d91(0x221)]()&&BattleManager['isETB']()){const _0x1a4e30=DataManager[_0x413d91(0xfb)](_0x3b0dad);if(_0x1a4e30>this[_0x413d91(0x2de)]()['getCurrentActionsETB']())return![];}return VisuMZ[_0x413d91(0x2b9)]['Game_BattlerBase_canUse'][_0x413d91(0x234)](this,_0x3b0dad);},VisuMZ['BattleSystemETB'][_0xb2d282(0x2b0)]=Game_Battler[_0xb2d282(0x20b)]['useItem'],Game_Battler[_0xb2d282(0x20b)][_0xb2d282(0x2ae)]=function(_0x42aff4){const _0x11921f=_0xb2d282;VisuMZ[_0x11921f(0x2b9)]['Game_Battler_useItem'][_0x11921f(0x234)](this,_0x42aff4),this[_0x11921f(0x1bb)](_0x42aff4);},Game_Battler[_0xb2d282(0x20b)]['payActionCostETB']=function(_0x80716c){const _0x1ae9a6=_0xb2d282;if(!_0x80716c)return;if(!SceneManager[_0x1ae9a6(0x221)]())return;if(!BattleManager['isETB']())return;const _0x367bf0=BattleManager['_action'];if(_0x367bf0&&_0x367bf0[_0x1ae9a6(0x245)])return;const _0x1c0216=DataManager[_0x1ae9a6(0xfb)](_0x80716c);this[_0x1ae9a6(0x2de)]()[_0x1ae9a6(0x1fe)](_0x1c0216);},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x1f1)]=Game_Battler['prototype'][_0xb2d282(0x1cb)],Game_Battler['prototype'][_0xb2d282(0x1cb)]=function(){const _0x208406=_0xb2d282;this[_0x208406(0x119)]=BattleManager[_0x208406(0xea)]()&&BattleManager[_0x208406(0x1d6)],VisuMZ[_0x208406(0x2b9)]['Game_Battler_onTurnEnd'][_0x208406(0x234)](this),delete this['_bypassStateTurnUpdatesETB'];},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x200)]=Game_BattlerBase['prototype'][_0xb2d282(0x2d8)],Game_BattlerBase[_0xb2d282(0x20b)]['updateStateTurns']=function(){const _0x44fb66=_0xb2d282;if(this[_0x44fb66(0x119)])return;VisuMZ[_0x44fb66(0x2b9)][_0x44fb66(0x200)][_0x44fb66(0x234)](this);},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x21c)]=Game_BattlerBase[_0xb2d282(0x20b)][_0xb2d282(0x2d2)],Game_BattlerBase[_0xb2d282(0x20b)][_0xb2d282(0x2d2)]=function(){const _0x573434=_0xb2d282;if(this[_0x573434(0x119)])return;VisuMZ[_0x573434(0x2b9)][_0x573434(0x21c)][_0x573434(0x234)](this);},VisuMZ[_0xb2d282(0x2b9)]['Game_Battler_addState']=Game_Battler['prototype'][_0xb2d282(0x277)],Game_Battler[_0xb2d282(0x20b)][_0xb2d282(0x277)]=function(_0x3f7608){const _0x375217=_0xb2d282;VisuMZ[_0x375217(0x2b9)][_0x375217(0x15f)][_0x375217(0x234)](this,_0x3f7608),this[_0x375217(0x2de)]()[_0x375217(0x179)]();},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x1c2)]=Game_Battler[_0xb2d282(0x20b)][_0xb2d282(0x21a)],Game_Battler[_0xb2d282(0x20b)][_0xb2d282(0x21a)]=function(_0x4a6999){const _0x5a4f6d=_0xb2d282;VisuMZ[_0x5a4f6d(0x2b9)]['Game_Battler_removeState'][_0x5a4f6d(0x234)](this,_0x4a6999),this[_0x5a4f6d(0x2de)]()[_0x5a4f6d(0x179)]();},VisuMZ['BattleSystemETB'][_0xb2d282(0x13c)]=Game_Battler[_0xb2d282(0x20b)][_0xb2d282(0xfd)],Game_Battler[_0xb2d282(0x20b)]['addBuff']=function(_0x52d02b,_0x1660ea){const _0x148563=_0xb2d282;VisuMZ[_0x148563(0x2b9)]['Game_Battler_addBuff'][_0x148563(0x234)](this,_0x52d02b,_0x1660ea),this[_0x148563(0x2de)]()[_0x148563(0x179)]();},VisuMZ['BattleSystemETB'][_0xb2d282(0x104)]=Game_Battler[_0xb2d282(0x20b)][_0xb2d282(0x1d1)],Game_Battler[_0xb2d282(0x20b)][_0xb2d282(0x1d1)]=function(_0x2633a5,_0x12cc9a){const _0x3d814b=_0xb2d282;VisuMZ[_0x3d814b(0x2b9)]['Game_Battler_addDebuff']['call'](this,_0x2633a5,_0x12cc9a),this[_0x3d814b(0x2de)]()['recalculateActionsETB']();},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x282)]=Game_Battler['prototype'][_0xb2d282(0x2ad)],Game_Battler[_0xb2d282(0x20b)]['removeBuff']=function(_0x4f0442){const _0x253167=_0xb2d282;VisuMZ[_0x253167(0x2b9)]['Game_Battler_removeBuff'][_0x253167(0x234)](this,_0x4f0442),this[_0x253167(0x2de)]()[_0x253167(0x179)]();},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x268)]=Game_Battler[_0xb2d282(0x20b)][_0xb2d282(0x101)],Game_Battler['prototype']['forceAction']=function(_0x2786f4,_0x4f0491){const _0xee0371=_0xb2d282;if(BattleManager[_0xee0371(0xea)]())_0xee0371(0x1c7)!=='uJekG'?this[_0xee0371(0x2d1)](_0x2786f4,_0x4f0491):(_0x3c2439[_0xee0371(0x2b9)]['Game_Battler_addBuff'][_0xee0371(0x234)](this,_0x3e1506,_0x3dfcc0),this[_0xee0371(0x2de)]()[_0xee0371(0x179)]());else{if(_0xee0371(0x29a)===_0xee0371(0x29a))VisuMZ[_0xee0371(0x2b9)][_0xee0371(0x268)][_0xee0371(0x234)](this,_0x2786f4,_0x4f0491);else{const _0x3cf83b=_0x4a10a3[_0xee0371(0x168)][_0xee0371(0x1b9)]();if(_0x3cf83b&&_0x3cf83b[_0xee0371(0x245)])return!![];}}},Game_Battler[_0xb2d282(0x20b)][_0xb2d282(0x2d1)]=function(_0x24a7a7,_0x2a116f){const _0x193155=_0xb2d282,_0x5ab5da=new Game_Action(this,!![]);_0x5ab5da[_0x193155(0xe8)](_0x24a7a7),_0x5ab5da[_0x193155(0x245)]=!![];if(_0x2a116f===-0x2)_0x193155(0x255)==='MVFLq'?_0xdd355f+=_0x3b343d:_0x5ab5da[_0x193155(0x158)](this[_0x193155(0x111)]);else _0x2a116f===-0x1?_0x5ab5da[_0x193155(0x152)]():_0x193155(0x233)===_0x193155(0x279)?_0x598d64['isETB']()?this['forceActionETB'](_0x1f9b7b):_0x365ca5[_0x193155(0x2b9)][_0x193155(0x281)][_0x193155(0x234)](this,_0x4882de):_0x5ab5da[_0x193155(0x158)](_0x2a116f);this[_0x193155(0x27b)]['unshift'](_0x5ab5da);},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x281)]=BattleManager[_0xb2d282(0x101)],BattleManager['forceAction']=function(_0x2e02a9){const _0x456e9c=_0xb2d282;BattleManager[_0x456e9c(0xea)]()?this[_0x456e9c(0x2d1)](_0x2e02a9):VisuMZ[_0x456e9c(0x2b9)][_0x456e9c(0x281)][_0x456e9c(0x234)](this,_0x2e02a9);},BattleManager['forceActionETB']=function(_0x229885){const _0x2c145f=_0xb2d282,_0x5793b7=JsonEx[_0x2c145f(0x1ea)](_0x229885[_0x2c145f(0x1b9)]());this[_0x2c145f(0x237)][_0x2c145f(0x10d)]([_0x229885,_0x5793b7]);},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x2d5)]=Game_Actor[_0xb2d282(0x20b)]['selectNextCommand'],Game_Actor[_0xb2d282(0x20b)][_0xb2d282(0x17f)]=function(){const _0x2b9ca6=_0xb2d282;if(BattleManager[_0x2b9ca6(0xea)]()){if(this[_0x2b9ca6(0x2a2)]())this[_0x2b9ca6(0x2a2)]()['stepForward']();return![];}return VisuMZ['BattleSystemETB'][_0x2b9ca6(0x2d5)][_0x2b9ca6(0x234)](this);},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x1b2)]=Game_Actor['prototype']['changeEquip'],Game_Actor[_0xb2d282(0x20b)][_0xb2d282(0x143)]=function(_0x4871fd,_0x1b8872){const _0x210491=_0xb2d282;VisuMZ['BattleSystemETB']['Game_Actor_changeEquip'][_0x210491(0x234)](this,_0x4871fd,_0x1b8872),this[_0x210491(0x2de)]()[_0x210491(0x179)]();},VisuMZ['BattleSystemETB']['Game_Actor_forceChangeEquip']=Game_Actor[_0xb2d282(0x20b)][_0xb2d282(0x1c9)],Game_Actor['prototype'][_0xb2d282(0x1c9)]=function(_0x5747ac,_0xab23f7){const _0x14ca46=_0xb2d282;VisuMZ[_0x14ca46(0x2b9)]['Game_Actor_forceChangeEquip'][_0x14ca46(0x234)](this,_0x5747ac,_0xab23f7),this[_0x14ca46(0x2de)]()['recalculateActionsETB']();},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x21b)]=Game_Actor[_0xb2d282(0x20b)]['changeEquipById'],Game_Actor[_0xb2d282(0x20b)][_0xb2d282(0x1fd)]=function(_0x97eb87,_0x5c026a){const _0x32d058=_0xb2d282;VisuMZ[_0x32d058(0x2b9)][_0x32d058(0x21b)]['call'](this,_0x97eb87,_0x5c026a),this['friendsUnit']()[_0x32d058(0x179)]();},VisuMZ['BattleSystemETB'][_0xb2d282(0x2b6)]=Game_Actor[_0xb2d282(0x20b)][_0xb2d282(0x2bd)],Game_Actor[_0xb2d282(0x20b)][_0xb2d282(0x2bd)]=function(_0x25910f){const _0x593171=_0xb2d282;VisuMZ[_0x593171(0x2b9)]['Game_Actor_discardEquip']['call'](this,_0x25910f),this[_0x593171(0x2de)]()[_0x593171(0x179)]();},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x2a6)]=Game_Actor[_0xb2d282(0x20b)][_0xb2d282(0x17b)],Game_Actor[_0xb2d282(0x20b)][_0xb2d282(0x17b)]=function(_0x382fd1){const _0x38e655=_0xb2d282;VisuMZ[_0x38e655(0x2b9)]['Game_Actor_releaseUnequippableItems']['call'](this,_0x382fd1),this[_0x38e655(0x2de)]()['recalculateActionsETB']();},VisuMZ['BattleSystemETB']['Game_Actor_changeClass']=Game_Actor['prototype'][_0xb2d282(0x170)],Game_Actor[_0xb2d282(0x20b)]['changeClass']=function(_0x574228,_0x3b789b){const _0x3b9027=_0xb2d282;VisuMZ[_0x3b9027(0x2b9)]['Game_Actor_changeClass']['call'](this,_0x574228,_0x3b789b),this[_0x3b9027(0x2de)]()[_0x3b9027(0x179)]();},VisuMZ['BattleSystemETB'][_0xb2d282(0x190)]=Game_Enemy['prototype'][_0xb2d282(0x28e)],Game_Enemy['prototype'][_0xb2d282(0x28e)]=function(_0x34e26b){const _0x529e93=_0xb2d282;VisuMZ[_0x529e93(0x2b9)][_0x529e93(0x190)][_0x529e93(0x234)](this,_0x34e26b),this[_0x529e93(0x2de)]()[_0x529e93(0x179)]();},Game_Unit[_0xb2d282(0x20e)]=VisuMZ['BattleSystemETB'][_0xb2d282(0x19b)][_0xb2d282(0x16d)]['TurnBase']||[0x1],Game_Unit[_0xb2d282(0x144)]=Game_Unit[_0xb2d282(0x20e)][0x0],Game_Unit[_0xb2d282(0x244)]=Game_Unit[_0xb2d282(0x20e)][0x1]||Game_Unit['_ETB_ACTION_FIRST'],Game_Unit['_ETB_ACTION_BASE']['unshift'](Game_Unit['_ETB_ACTION_SECOND']),Game_Unit[_0xb2d282(0x115)]=Game_Unit[_0xb2d282(0x20e)][Game_Unit[_0xb2d282(0x20e)][_0xb2d282(0x276)]-0x1],Game_Unit[_0xb2d282(0x2a0)]=VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19b)][_0xb2d282(0x16d)][_0xb2d282(0x106)],Game_Unit[_0xb2d282(0x1e0)]=VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19b)][_0xb2d282(0x16d)][_0xb2d282(0x11d)],Game_Unit['_ETB_ACTION_OVERFLOW']=VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19b)]['Mechanics'][_0xb2d282(0x28b)],Game_Unit[_0xb2d282(0x20b)][_0xb2d282(0x14a)]=function(){const _0x1ec47d=_0xb2d282;this['createActionsETB'](),this[_0x1ec47d(0x1ed)](this['getMaxActionsETB']());},Game_Unit[_0xb2d282(0x20b)]['createActionsETB']=function(){const _0x14843d=_0xb2d282,_0x53cbf4=$gameTroop[_0x14843d(0x1f4)]();let _0x47bfca=_0x53cbf4%0x2===0x0?BattleManager['_etbTeamEven']:BattleManager[_0x14843d(0x1a8)];_0x47bfca===this&&(_0x14843d(0x154)==='vkqML'?this['calculateTotalActionsETB']():_0x5bf40c['BattleSystemETB'][_0x14843d(0x15a)]['call'](this));},Game_Unit['prototype'][_0xb2d282(0x125)]=function(_0x46e0d0){const _0x23f2b8=_0xb2d282;this[_0x23f2b8(0x1c5)]=!![];let _0x167d5e=0x0,_0x1fd49f=this['aliveMembers']()['filter'](_0x249b13=>_0x249b13[_0x23f2b8(0x203)]());_0x46e0d0=_0x46e0d0||$gameTroop['turnCount'](),_0x167d5e=Game_Unit[_0x23f2b8(0x20e)][_0x46e0d0]??Game_Unit[_0x23f2b8(0x115)],_0x167d5e=_0x1fd49f['reduce']((_0x3c864b,_0x493224)=>_0x3c864b+_0x493224[_0x23f2b8(0x145)](),_0x167d5e),_0x167d5e=_0x167d5e[_0x23f2b8(0x297)](Game_Unit[_0x23f2b8(0x1e0)],Game_Unit[_0x23f2b8(0x2a0)]),this[_0x23f2b8(0x19e)]=_0x167d5e;},Game_Unit[_0xb2d282(0x20b)][_0xb2d282(0x179)]=function(){const _0x130daf=_0xb2d282;if(!BattleManager[_0x130daf(0xea)]())return;if(!$gameParty[_0x130daf(0x1df)]())return;const _0x1f9cd5=this[_0x130daf(0x100)]();this[_0x130daf(0xf5)]();let _0x15dc2e=this[_0x130daf(0x1e5)]();const _0x203bca=this[_0x130daf(0x100)]()-_0x1f9cd5;if(BattleManager['_ETB_RECALC_ADD_DIFF']&&_0x203bca>0x0)_0x15dc2e+=_0x203bca;if(BattleManager[_0x130daf(0x16c)]&&_0x203bca<0x0)_0x15dc2e+=_0x203bca;_0x15dc2e=Math[_0x130daf(0x182)](_0x15dc2e,Game_Unit['_ETB_MAX_ACTIONS']),this['setCurrentActionsETB'](_0x15dc2e);},Game_Unit[_0xb2d282(0x20b)][_0xb2d282(0x1e5)]=function(){const _0x8e9099=_0xb2d282;return this[_0x8e9099(0x209)]||0x0;},Game_Unit[_0xb2d282(0x20b)][_0xb2d282(0x1ed)]=function(_0x5434b6){const _0x273fbe=_0xb2d282;this[_0x273fbe(0x209)]=Math[_0x273fbe(0x13f)](_0x5434b6)[_0x273fbe(0x297)](0x0,Game_Unit[_0x273fbe(0x2a0)]),!Game_Unit[_0x273fbe(0x1c1)]&&(this[_0x273fbe(0x209)]=Math[_0x273fbe(0x182)](this['_etbActionsCur'],this[_0x273fbe(0x100)]()));},Game_Unit[_0xb2d282(0x20b)][_0xb2d282(0x2e7)]=function(_0x457b30){const _0xc4ca2c=_0xb2d282;this['setCurrentActionsETB'](this[_0xc4ca2c(0x1e5)]()+_0x457b30);},Game_Unit[_0xb2d282(0x20b)][_0xb2d282(0x2c6)]=function(_0x138014){const _0x212723=_0xb2d282;this[_0x212723(0x2e7)](-_0x138014);},Game_Unit[_0xb2d282(0x20b)][_0xb2d282(0x100)]=function(){const _0x418bd1=_0xb2d282;return this[_0x418bd1(0x19e)]||0x0;},Game_Unit[_0xb2d282(0x20b)]['setMaxActionsETB']=function(_0x21ecda){const _0x142fb4=_0xb2d282;this[_0x142fb4(0x19e)]=_0x21ecda[_0x142fb4(0x297)](Game_Unit[_0x142fb4(0x1e0)],Game_Unit['_ETB_MAX_ACTIONS']);},Game_Unit[_0xb2d282(0x20b)][_0xb2d282(0x1fe)]=function(_0x1dd8f5){const _0x38225b=_0xb2d282;this[_0x38225b(0x2c6)](_0x1dd8f5);},Game_Unit[_0xb2d282(0x20b)][_0xb2d282(0x212)]=function(){const _0x14aa70=_0xb2d282;if(BattleManager[_0x14aa70(0x168)]){if(this[_0x14aa70(0x236)]()[_0x14aa70(0x22e)](BattleManager[_0x14aa70(0x168)])){if(_0x14aa70(0x1bd)===_0x14aa70(0x1bd)){const _0x21c416=BattleManager['_subject'][_0x14aa70(0x1b9)]();if(_0x21c416&&_0x21c416['_forceAction'])return!![];}else{const _0x165aa4='Current';_0x59b357[_0x14aa70(0x10d)](_0x165aa4);}}}return this[_0x14aa70(0x209)]=this[_0x14aa70(0x209)]||0x0,this[_0x14aa70(0x209)]>0x0;},Game_Unit['prototype'][_0xb2d282(0x25b)]=function(){const _0x52648f=_0xb2d282;for(const _0x31594e of this['members']()){if(!_0x31594e)continue;const _0x1ffb32=_0x31594e['isAlive']();_0x31594e['onTurnEnd'](),_0x31594e[_0x52648f(0x156)](),_0x1ffb32&&_0x31594e[_0x52648f(0xf4)]()&&_0x31594e[_0x52648f(0x1f2)]();}},Game_Unit[_0xb2d282(0x20b)][_0xb2d282(0x220)]=function(){const _0x3cae91=_0xb2d282;if(this[_0x3cae91(0x1e5)]()<=0x0)return!![];if(!this['aliveMembers']()['some'](_0x20fbb1=>_0x20fbb1[_0x3cae91(0x203)]()))return!![];return![];},Game_Unit['prototype'][_0xb2d282(0x227)]=function(){const _0x47cb70=_0xb2d282;for(const _0x46680b of this[_0x47cb70(0x236)]()){if(!_0x46680b)continue;_0x46680b[_0x47cb70(0x2d8)](),_0x46680b[_0x47cb70(0x1b4)](0x2),_0x46680b[_0x47cb70(0x2d2)](),_0x46680b[_0x47cb70(0x156)]();}},Game_Unit[_0xb2d282(0x20b)][_0xb2d282(0x258)]=function(){const _0x675a17=_0xb2d282;for(const _0x55f354 of this[_0x675a17(0x236)]()){if('HbGvl'==='MQKzM'){if(this[_0x675a17(0xea)]())return!![];return _0x53c17d[_0x675a17(0x2b9)][_0x675a17(0x134)][_0x675a17(0x234)](this);}else{if(!_0x55f354)continue;_0x55f354[_0x675a17(0x146)]=![];}}},Game_Unit[_0xb2d282(0x20b)][_0xb2d282(0x1b5)]=function(){const _0x137058=_0xb2d282,_0x480681=this[_0x137058(0x236)]();return Math[_0x137058(0x182)](..._0x480681['map'](_0x6b572e=>_0x6b572e['agi']));},Game_Unit['prototype']['etbHighestAgility']=function(){const _0x42ba52=_0xb2d282,_0x132e53=this['members']();return Math['max'](..._0x132e53[_0x42ba52(0x2bb)](_0x2af860=>_0x2af860['agi']));},Game_Unit[_0xb2d282(0x20b)]['etbTotalAgility']=function(){const _0x4d7c27=_0xb2d282,_0x1306bb=this[_0x4d7c27(0x236)]();return _0x1306bb[_0x4d7c27(0x1e9)]((_0x51ce5e,_0x29d62a)=>_0x51ce5e+_0x29d62a[_0x4d7c27(0x289)],0x0);},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x121)]=Game_Unit[_0xb2d282(0x20b)]['onBattleStart'],Game_Unit[_0xb2d282(0x20b)]['onBattleStart']=function(_0x43e300){const _0x414f54=_0xb2d282;VisuMZ[_0x414f54(0x2b9)][_0x414f54(0x121)][_0x414f54(0x234)](this,_0x43e300),BattleManager[_0x414f54(0xea)]()&&(this[_0x414f54(0x1a4)]=0x0);},Game_Unit[_0xb2d282(0x20b)][_0xb2d282(0x151)]=function(){const _0x122c71=_0xb2d282,_0xec230a=this['aliveMembers']();if(BattleManager[_0x122c71(0x235)])return _0xec230a;if(BattleManager[_0x122c71(0x25a)])return _0xec230a;this['_etbLastIndex']=this[_0x122c71(0x1a4)]||0x0;while(!_0xec230a[_0x122c71(0x185)](_0x1ba0f2=>_0x1ba0f2[_0x122c71(0x2d9)]()===this[_0x122c71(0x1a4)])){const _0x269cb7=this[_0x122c71(0x236)](),_0x12a510=_0x269cb7[this['_etbLastIndex']];let _0x14900e=_0x269cb7[_0x122c71(0x1b8)](_0x12a510)+0x1;if(_0x14900e>=_0x269cb7[_0x122c71(0x276)])_0x14900e=0x0;this[_0x122c71(0x1a4)]=_0x14900e;}for(;;){const _0x33e7e6=_0xec230a[0x0][_0x122c71(0x2d9)]();if(_0x33e7e6===this[_0x122c71(0x1a4)])break;_0xec230a[_0x122c71(0x10d)](_0xec230a[_0x122c71(0x127)]());}return _0xec230a;},Game_Unit['prototype'][_0xb2d282(0x122)]=function(_0x3e7819){const _0x1c872d=_0xb2d282;this['_etbLastIndex']=_0x3e7819?_0x3e7819[_0x1c872d(0x2d9)]():0x0;},VisuMZ['BattleSystemETB'][_0xb2d282(0x135)]=Scene_Battle[_0xb2d282(0x20b)]['createActorCommandWindow'],Scene_Battle[_0xb2d282(0x20b)][_0xb2d282(0x265)]=function(){const _0x1fa42e=_0xb2d282;VisuMZ['BattleSystemETB']['Scene_Battle_createActorCommandWindow'][_0x1fa42e(0x234)](this),BattleManager[_0x1fa42e(0xea)]()&&this[_0x1fa42e(0x14f)]();},Scene_Battle[_0xb2d282(0x20b)][_0xb2d282(0x14f)]=function(){const _0x41b094=_0xb2d282,_0x139784=this['_actorCommandWindow'];this[_0x41b094(0x132)]()&&delete _0x139784[_0x41b094(0x1e1)][_0x41b094(0x193)];},VisuMZ[_0xb2d282(0x2b9)]['Scene_Battle_commandCancel']=Scene_Battle['prototype'][_0xb2d282(0x294)],Scene_Battle[_0xb2d282(0x20b)]['commandCancel']=function(){const _0x3dfc19=_0xb2d282;if(BattleManager['isETB']()){if(_0x3dfc19(0x298)===_0x3dfc19(0x15d)){const _0x3c539d=_0x545238[_0x3dfc19(0x27b)][_0x3dfc19(0x2ac)](_0x232ec3=>_0x232ec3[_0x3dfc19(0x245)]);_0x344a8c[_0x3dfc19(0x1a6)]();if(_0x3c539d){let _0x19546a=_0x3c539d[_0x3dfc19(0x276)];while(_0x19546a--){_0x2d55e7['_actions'][_0x3dfc19(0x141)]();}_0x3902f3[_0x3dfc19(0x27b)]=_0x3c539d[_0x3dfc19(0x1f7)](_0x208d8c[_0x3dfc19(0x27b)]);}}else this[_0x3dfc19(0x1d4)]();}else VisuMZ[_0x3dfc19(0x2b9)][_0x3dfc19(0x24d)]['call'](this);},Scene_Battle['prototype'][_0xb2d282(0x1d4)]=function(){const _0x36afa0=_0xb2d282;this[_0x36afa0(0x28c)][_0x36afa0(0x217)](),this[_0x36afa0(0x280)]['close']();},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x223)]=Scene_Battle['prototype'][_0xb2d282(0x18b)],Scene_Battle['prototype']['commandFight']=function(){const _0x4e30cd=_0xb2d282;BattleManager[_0x4e30cd(0xea)]()?_0x4e30cd(0x296)===_0x4e30cd(0x296)?this[_0x4e30cd(0x192)]():_0x10a9a5['performCollapse']():VisuMZ[_0x4e30cd(0x2b9)]['Scene_Battle_commandFight'][_0x4e30cd(0x234)](this);},VisuMZ['BattleSystemETB'][_0xb2d282(0x173)]=Scene_Battle[_0xb2d282(0x20b)][_0xb2d282(0x1b6)],Scene_Battle[_0xb2d282(0x20b)][_0xb2d282(0x1b6)]=function(){const _0x5f2c38=_0xb2d282;VisuMZ[_0x5f2c38(0x2b9)][_0x5f2c38(0x173)][_0x5f2c38(0x234)](this),this[_0x5f2c38(0x189)]();},Scene_Battle[_0xb2d282(0x20b)][_0xb2d282(0x189)]=function(){const _0xf6f09=_0xb2d282;if(!BattleManager[_0xf6f09(0xea)]())return;const _0x37503e=this['getChildIndex'](this[_0xf6f09(0x17c)]);this[_0xf6f09(0x113)]=new Window_ETB_ActionCount(),this[_0xf6f09(0x113)][_0xf6f09(0x1f0)]($gameTroop),this[_0xf6f09(0x162)](this['_etbTroopActionCountWindow'],_0x37503e),this[_0xf6f09(0x20c)]=new Window_ETB_ActionCount(),this['_etbPartyActionCountWindow']['setUnit']($gameParty),this[_0xf6f09(0x162)](this[_0xf6f09(0x20c)],_0x37503e),this[_0xf6f09(0x2a5)]();},Scene_Battle['prototype'][_0xb2d282(0x2a5)]=function(){const _0x165442=_0xb2d282;if(!BattleManager[_0x165442(0xea)]())return;if(!this['_logWindow'])return;const _0x22b32f=Window_ETB_ActionCount['Settings'];if(_0x22b32f[_0x165442(0x213)])return;this[_0x165442(0x271)]['y']+=_0x22b32f['LogWindowTopOffsetY'];},Scene_Battle[_0xb2d282(0x20b)][_0xb2d282(0x178)]=function(){const _0x219014=_0xb2d282;this[_0x219014(0x113)]&&(_0x219014(0x1cd)===_0x219014(0x1cd)?this[_0x219014(0x113)][_0x219014(0x24b)]():this[_0x219014(0x20c)][_0x219014(0x24b)]()),this[_0x219014(0x20c)]&&this[_0x219014(0x20c)][_0x219014(0x24b)]();},Window_Base[_0xb2d282(0x107)]=VisuMZ['BattleSystemETB'][_0xb2d282(0x19b)][_0xb2d282(0x2d0)][_0xb2d282(0x16f)],Window_Base[_0xb2d282(0x10b)]=VisuMZ['BattleSystemETB'][_0xb2d282(0x19b)][_0xb2d282(0x2d0)]['ShowCostForAttack'],Window_Base[_0xb2d282(0x1ec)]=VisuMZ[_0xb2d282(0x2b9)]['Settings'][_0xb2d282(0x2d0)]['ShowCostForGuard'],Window_Base[_0xb2d282(0x257)]=VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19b)][_0xb2d282(0x2d0)][_0xb2d282(0x295)],Window_Base[_0xb2d282(0x1ab)]=VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19b)][_0xb2d282(0x2d0)][_0xb2d282(0x18e)],VisuMZ['BattleSystemETB']['Window_Base_makeAdditionalSkillCostText']=Window_Base[_0xb2d282(0x20b)][_0xb2d282(0x191)],Window_Base[_0xb2d282(0x20b)]['makeAdditionalSkillCostText']=function(_0x3a7104,_0x256b6c,_0x2ec7be){return _0x2ec7be=VisuMZ['BattleSystemETB']['Window_Base_makeAdditionalSkillCostText']['call'](this,_0x3a7104,_0x256b6c,_0x2ec7be),_0x2ec7be=this['makeAdditionalCostTextETB'](_0x3a7104,_0x256b6c,_0x2ec7be),_0x2ec7be;},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x186)]=Window_Base['prototype'][_0xb2d282(0x17d)],Window_Base['prototype'][_0xb2d282(0x17d)]=function(_0x2f40f6,_0x4e8db8,_0x346eaf,_0x438457){const _0x71c117=_0xb2d282;BattleManager['isETB']()&&this[_0x71c117(0x24c)]===Window_BattleItem?_0x71c117(0x16e)==='SzrNU'?this[_0x71c117(0x29b)](_0x2f40f6,_0x4e8db8,_0x346eaf,_0x438457):(_0x2930b[_0x71c117(0x2b9)][_0x71c117(0x15f)][_0x71c117(0x234)](this,_0x5f1320),this[_0x71c117(0x2de)]()[_0x71c117(0x179)]()):VisuMZ[_0x71c117(0x2b9)][_0x71c117(0x186)][_0x71c117(0x234)](this,_0x2f40f6,_0x4e8db8,_0x346eaf,_0x438457),this[_0x71c117(0x20f)]();},Window_Base[_0xb2d282(0x20b)][_0xb2d282(0x29b)]=function(_0x598f25,_0x2bd076,_0x2d0e16,_0x14eaf1){const _0x516573=_0xb2d282,_0x11e6f0=BattleManager['_actor']||$gameParty[_0x516573(0x236)]()[0x0],_0x52e407=this['makeAdditionalCostTextETB'](_0x11e6f0,_0x598f25,''),_0x2fe303=this['textSizeEx'](_0x52e407)[_0x516573(0x1db)],_0x2add25=Window_Base[_0x516573(0x107)];let _0x55d4d5=_0x2bd076+_0x14eaf1-_0x2fe303;if(_0x52e407==='')VisuMZ[_0x516573(0x2b9)][_0x516573(0x186)][_0x516573(0x234)](this,_0x598f25,_0x2bd076,_0x2d0e16,_0x14eaf1);else{if(this[_0x516573(0x1ae)](_0x598f25)){if(_0x516573(0x26a)!==_0x516573(0x26a)){if(this[_0x516573(0xea)]())return!![];return _0x4e95e3[_0x516573(0x2b9)]['BattleManager_isTeamBased']['call'](this);}else{this[_0x516573(0x20f)]();const _0x21a1b9=VisuMZ[_0x516573(0x287)][_0x516573(0x19b)][_0x516573(0x1a2)];this[_0x516573(0x114)][_0x516573(0x10e)]=_0x21a1b9['ItemQuantityFontSize'];if(_0x2add25){const _0x32749f=_0x21a1b9[_0x516573(0x2af)],_0x11dcef=_0x32749f['format']($gameParty['numItems'](_0x598f25)),_0x491e9b=this[_0x516573(0x26d)](_0x11dcef+this[_0x516573(0x12a)]());_0x55d4d5-=_0x491e9b;}else'qIWxo'!==_0x516573(0x252)?this['calculateTotalActionsETB']():_0x14eaf1-=this[_0x516573(0x26d)](this[_0x516573(0x12a)]())+_0x2fe303;VisuMZ['BattleSystemETB'][_0x516573(0x186)]['call'](this,_0x598f25,_0x2bd076,_0x2d0e16,_0x14eaf1);}}}this[_0x516573(0xe6)](_0x52e407,_0x55d4d5,_0x2d0e16);},Window_Base[_0xb2d282(0x20b)][_0xb2d282(0x1f9)]=function(_0x58b6aa,_0x823e55,_0x103ddc){const _0x16f4c2=_0xb2d282;if(!BattleManager['isETB']())return _0x103ddc;if(!_0x58b6aa)return _0x103ddc;if(!_0x823e55)return _0x103ddc;if(_0x823e55['note'][_0x16f4c2(0x260)](VisuMZ[_0x16f4c2(0x2b9)]['RegExp'][_0x16f4c2(0x18a)]))return _0x103ddc;let _0x449e17=DataManager['getActionCostETB'](_0x823e55);const _0x1b2c86=Window_Base[_0x16f4c2(0x107)],_0x310e52=Window_Base[_0x16f4c2(0x10b)],_0xaaac3d=Window_Base[_0x16f4c2(0x1ec)],_0x543aef=Window_Base['_ETB_COST_SHOW_0'],_0x2e1aef=Window_Base[_0x16f4c2(0x1ab)];if(_0x823e55[_0x16f4c2(0x278)]['match'](VisuMZ[_0x16f4c2(0x2b9)][_0x16f4c2(0x1e2)]['ShowActionPointCost'])){if(_0x449e17<0x0)return _0x103ddc;}else{if(DataManager[_0x16f4c2(0x23e)](_0x823e55)&&this[_0x16f4c2(0x24c)]===Window_ActorCommand){if(_0x16f4c2(0x1d0)!==_0x16f4c2(0x1d0))_0x2b542d[_0x16f4c2(0x2b9)][_0x16f4c2(0x281)][_0x16f4c2(0x234)](this,_0x54ba04);else{if(!_0x310e52&&_0x823e55['id']===_0x58b6aa[_0x16f4c2(0x247)]())return _0x103ddc;if(!_0xaaac3d&&_0x823e55['id']===_0x58b6aa['guardSkillId']())return _0x103ddc;}}if(_0x449e17<0x0)return _0x103ddc;if(!_0x543aef&&_0x449e17===0x0)return _0x103ddc;if(!_0x2e1aef&&_0x449e17===0x1)return _0x103ddc;}const _0x22f120='\x5cI[%1]'[_0x16f4c2(0x2cd)](ImageManager[_0x16f4c2(0xec)]),_0xc3e5e0=TextManager[_0x16f4c2(0x24f)];let _0x34d01b=TextManager['etbCostFormat'][_0x16f4c2(0x2cd)](_0x449e17,_0xc3e5e0,_0x22f120);if(_0x103ddc===''){if(_0x16f4c2(0x1c3)===_0x16f4c2(0x284)){if(!this[_0x16f4c2(0xea)]())return;this[_0x16f4c2(0x248)]=this[_0x16f4c2(0x248)]||[],this[_0x16f4c2(0x248)]=this[_0x16f4c2(0x248)][_0x16f4c2(0x2ac)](_0xa0ba8e=>_0xa0ba8e[_0x16f4c2(0x203)]()&&!_0xa0ba8e[_0x16f4c2(0x214)]());}else _0x103ddc+=_0x34d01b;}else _0x1b2c86?_0x103ddc=_0x34d01b+this[_0x16f4c2(0x12a)]()+_0x103ddc:_0x16f4c2(0x266)!==_0x16f4c2(0x266)?_0x456639+=_0xf3c72:_0x103ddc=_0x103ddc+this[_0x16f4c2(0x12a)]()+_0x34d01b;return _0x103ddc;},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x166)]=Window_Help[_0xb2d282(0x20b)][_0xb2d282(0x2cf)],Window_Help[_0xb2d282(0x20b)][_0xb2d282(0x2cf)]=function(_0x2193fb){const _0x5ca77d=_0xb2d282;if(BattleManager[_0x5ca77d(0xea)]()&&_0x2193fb&&_0x2193fb[_0x5ca77d(0x278)]&&_0x2193fb['note'][_0x5ca77d(0x260)](/<(?:ETB) HELP>\s*([\s\S]*)\s*<\/(?:ETB) HELP>/i))_0x5ca77d(0x15b)!=='QgZao'?this[_0x5ca77d(0x15c)](String(RegExp['$1'])):delete _0x1bbafe[_0x5ca77d(0x1e1)][_0x5ca77d(0x193)];else{if(_0x5ca77d(0x183)===_0x5ca77d(0x183))VisuMZ[_0x5ca77d(0x2b9)][_0x5ca77d(0x166)][_0x5ca77d(0x234)](this,_0x2193fb);else{if(this['members']()['includes'](_0x59d986['_subject'])){const _0x13fd0f=_0x42bebb[_0x5ca77d(0x168)]['currentAction']();if(_0x13fd0f&&_0x13fd0f[_0x5ca77d(0x245)])return!![];}}}},Window_Selectable[_0xb2d282(0x20b)][_0xb2d282(0x2b3)]=function(){const _0xf0d27=_0xb2d282;return this[_0xf0d27(0x24c)]===Window_ActorCommand&&BattleManager[_0xf0d27(0xea)]()&&BattleManager[_0xf0d27(0x25a)];},VisuMZ['BattleSystemETB']['Window_Selectable_cursorRight']=Window_Selectable[_0xb2d282(0x20b)][_0xb2d282(0x267)],Window_Selectable[_0xb2d282(0x20b)]['cursorRight']=function(_0x5768bb){const _0x510625=_0xb2d282;this['etbFreeRangeSwitch']()&&this[_0x510625(0x202)]()===0x1?this[_0x510625(0x2ce)](!![]):_0x510625(0x2c0)!==_0x510625(0x188)?VisuMZ[_0x510625(0x2b9)][_0x510625(0x1b0)][_0x510625(0x234)](this,_0x5768bb):_0xb98a0[_0x510625(0x10d)](_0x45bd73);},VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x195)]=Window_Selectable[_0xb2d282(0x20b)][_0xb2d282(0x231)],Window_Selectable[_0xb2d282(0x20b)]['cursorLeft']=function(_0x2bfa02){const _0x943897=_0xb2d282;if(this['etbFreeRangeSwitch']()&&this[_0x943897(0x202)]()===0x1)this[_0x943897(0x2ce)](![]);else{if(_0x943897(0x2b2)!==_0x943897(0x161))VisuMZ[_0x943897(0x2b9)][_0x943897(0x195)][_0x943897(0x234)](this,_0x2bfa02);else{if(_0x3a7ee9===_0x943897(0x25e))return;if(_0x268924===_0x943897(0x1b1))_0x302e6d=this[_0x943897(0x206)]===_0x7aebab?_0x943897(0x1de):_0x943897(0x109);const _0x1c7fe5=_0x33e551['Settings'];if(_0x1c7fe5['%1ActionPicture'[_0x943897(0x2cd)](_0x4d20b0)]){const _0x50015c=_0x1c7fe5[_0x943897(0x17e)['format'](_0x1b92f6)],_0x193b0d=_0x3ad7b3[_0x943897(0x133)](_0x50015c);_0x193b0d[_0x943897(0x12e)](this[_0x943897(0x148)]['bind'](this,_0x193b0d,_0x30febb,_0x362cec,_0xf2b1b2));}else{const _0x111e78=_0x15b475[_0x943897(0x11a)[_0x943897(0x2cd)](_0x540413)];this[_0x943897(0x2d4)](_0x111e78,_0x745484,_0x37360e),this[_0x943897(0x256)](_0x486132)&&this['drawActionsRemaining'](_0x288055,_0x32d3d4);}}}},VisuMZ['BattleSystemETB'][_0xb2d282(0x1cf)]=Window_Selectable[_0xb2d282(0x20b)][_0xb2d282(0x11f)],Window_Selectable['prototype'][_0xb2d282(0x11f)]=function(){const _0x22f8ea=_0xb2d282;this[_0x22f8ea(0x2b3)]()?_0x22f8ea(0x290)===_0x22f8ea(0x290)?this[_0x22f8ea(0x2ce)](!![]):this[_0x22f8ea(0x113)][_0x22f8ea(0x24b)]():VisuMZ[_0x22f8ea(0x2b9)][_0x22f8ea(0x1cf)]['call'](this);},VisuMZ['BattleSystemETB'][_0xb2d282(0x25f)]=Window_Selectable[_0xb2d282(0x20b)][_0xb2d282(0x2d7)],Window_Selectable[_0xb2d282(0x20b)][_0xb2d282(0x2d7)]=function(){const _0xf67643=_0xb2d282;this[_0xf67643(0x2b3)]()?_0xf67643(0x112)==='jWzjG'?this[_0xf67643(0x2ce)](![]):_0x16fe84-=_0x69439f:VisuMZ[_0xf67643(0x2b9)]['Window_Selectable_cursorPageup'][_0xf67643(0x234)](this);},Window_ActorCommand[_0xb2d282(0x20b)][_0xb2d282(0x2ce)]=function(_0x4996c0){const _0x438fa5=_0xb2d282,_0x130862=BattleManager[_0x438fa5(0x137)];let _0x382fbd=$gameParty[_0x438fa5(0x21e)]()[_0x438fa5(0x1b8)](_0x130862);const _0x17355f=$gameParty[_0x438fa5(0x21e)]()[_0x438fa5(0x276)]-0x1;let _0x3ccf6d=$gameParty['battleMembers']()[_0x382fbd];for(;;){if(_0x438fa5(0x2b7)===_0x438fa5(0x128))_0x48f04f[_0x438fa5(0x2b9)][_0x438fa5(0x28d)]['call'](this),this[_0x438fa5(0xf2)]();else{_0x382fbd+=_0x4996c0?0x1:-0x1;if(_0x382fbd<0x0)_0x382fbd=_0x17355f;if(_0x382fbd>_0x17355f)_0x382fbd=0x0;_0x3ccf6d=$gameParty[_0x438fa5(0x21e)]()[_0x382fbd];if(_0x3ccf6d&&_0x3ccf6d['canInput']()&&!_0x3ccf6d[_0x438fa5(0x214)]())break;if(_0x3ccf6d===_0x130862)break;}}this[_0x438fa5(0x1ee)](_0x130862,_0x3ccf6d);},Window_ActorCommand['prototype'][_0xb2d282(0x1ee)]=function(_0x19abed,_0x49c7b3){const _0x273f7e=_0xb2d282;if(_0x19abed===_0x49c7b3)return;if(_0x19abed[_0x273f7e(0x2a2)]())_0x19abed[_0x273f7e(0x2a2)]()[_0x273f7e(0x197)]();this[_0x273f7e(0x210)](),BattleManager[_0x273f7e(0x168)]=_0x49c7b3,BattleManager[_0x273f7e(0x137)]=_0x49c7b3,BattleManager[_0x273f7e(0x140)](),SceneManager['_scene'][_0x273f7e(0x192)]();},VisuMZ['BattleSystemETB']['Window_Selectable_processTouch']=Window_Selectable['prototype'][_0xb2d282(0x1da)],Window_Selectable['prototype']['processTouch']=function(){const _0x1601a4=_0xb2d282;BattleManager['isETB']()&&BattleManager[_0x1601a4(0x25a)]&&this[_0x1601a4(0x24c)]===Window_BattleStatus?'YLmkw'===_0x1601a4(0x14c)?this['processTouchETB']():this[_0x1601a4(0x2ce)](![]):_0x1601a4(0x1bf)===_0x1601a4(0x1bf)?VisuMZ[_0x1601a4(0x2b9)]['Window_Selectable_processTouch'][_0x1601a4(0x234)](this):(this[_0x1601a4(0x119)]=_0xc757aa[_0x1601a4(0xea)]()&&_0x57008d[_0x1601a4(0x1d6)],_0x38a1d9[_0x1601a4(0x2b9)][_0x1601a4(0x1f1)][_0x1601a4(0x234)](this),delete this[_0x1601a4(0x119)]);},Window_BattleStatus[_0xb2d282(0x20b)][_0xb2d282(0x2c5)]=function(){const _0x2c26cc=_0xb2d282;this[_0x2c26cc(0x1a7)]()&&(TouchInput[_0x2c26cc(0x1be)]()&&this[_0x2c26cc(0x1a1)](!![]));},Window_BattleStatus['prototype'][_0xb2d282(0x1a1)]=function(_0x5d3ea8){const _0x4410f0=_0xb2d282,_0x57872c=SceneManager[_0x4410f0(0x2e0)]['_actorCommandWindow'];if(!_0x57872c)return;if(!_0x57872c[_0x4410f0(0x23f)])return;this[_0x4410f0(0x126)]=![];const _0x5ed8d0=this['index'](),_0x20f1cf=this['hitIndex']();if(_0x20f1cf>=0x0){if(_0x4410f0(0x25d)!==_0x4410f0(0x1dc)){const _0x577cc8=$gameParty[_0x4410f0(0x21e)]()[_0x5ed8d0],_0x147fff=$gameParty[_0x4410f0(0x21e)]()[_0x20f1cf];this[_0x4410f0(0x1c6)](_0x147fff)&&(_0x20f1cf===this[_0x4410f0(0x2d9)]()&&(this[_0x4410f0(0x126)]=!![]),this[_0x4410f0(0x27e)](_0x20f1cf),_0x57872c[_0x4410f0(0x1ee)](_0x577cc8,_0x147fff));}else this[_0x4410f0(0x258)](),this[_0x4410f0(0x125)](),this['startTurnETB']();}},Window_BattleStatus['prototype'][_0xb2d282(0x1c6)]=function(_0x537cc7){const _0x581f7f=_0xb2d282;if(!_0x537cc7)return![];if(!_0x537cc7[_0x581f7f(0x203)]())return![];if(!_0x537cc7[_0x581f7f(0x147)]())return![];if(_0x537cc7[_0x581f7f(0x214)]())return![];return!![];};function Window_ETB_ActionCount(){const _0x4cd3ca=_0xb2d282;this[_0x4cd3ca(0xf8)](...arguments);}Window_ETB_ActionCount['prototype']=Object[_0xb2d282(0x2ab)](Window_Base[_0xb2d282(0x20b)]),Window_ETB_ActionCount['prototype'][_0xb2d282(0x24c)]=Window_ETB_ActionCount,Window_ETB_ActionCount[_0xb2d282(0x19b)]=VisuMZ[_0xb2d282(0x2b9)][_0xb2d282(0x19b)][_0xb2d282(0x12d)],Window_ETB_ActionCount[_0xb2d282(0x20b)]['initialize']=function(){const _0x45d0e1=_0xb2d282,_0x35f5c1=this[_0x45d0e1(0xf0)]();Window_Base['prototype'][_0x45d0e1(0xf8)][_0x45d0e1(0x234)](this,_0x35f5c1),this[_0x45d0e1(0x184)](0x0),this[_0x45d0e1(0x163)](),this['opacity']=0x0;},Window_ETB_ActionCount[_0xb2d282(0x20b)][_0xb2d282(0xf0)]=function(){const _0x4d0a24=_0xb2d282;return new Rectangle(0x0,0x0,Graphics[_0x4d0a24(0x1db)],Graphics[_0x4d0a24(0x2c3)]);},Window_ETB_ActionCount[_0xb2d282(0x20b)][_0xb2d282(0x163)]=function(){const _0x4721be=_0xb2d282;this[_0x4721be(0x206)]=null,this[_0x4721be(0x29c)]=0x0,this[_0x4721be(0x286)]=0x0;const _0x5037c7=Window_ETB_ActionCount['Settings'];this[_0x4721be(0x293)]={'ActorPicture':_0x5037c7['ActorActionPicture']?ImageManager['loadPicture'](_0x5037c7['ActorActionPicture']):'','EnemyPicture':_0x5037c7[_0x4721be(0x249)]?ImageManager[_0x4721be(0x133)](_0x5037c7[_0x4721be(0x249)]):'','EmptyPicture':_0x5037c7[_0x4721be(0x198)]?ImageManager['loadPicture'](_0x5037c7[_0x4721be(0x198)]):''};},Window_ETB_ActionCount['prototype'][_0xb2d282(0xe5)]=function(){const _0x1a4395=_0xb2d282;this[_0x1a4395(0x194)]=0x0;},Window_ETB_ActionCount[_0xb2d282(0x20b)][_0xb2d282(0x1f0)]=function(_0x3950bc){const _0x55e517=_0xb2d282;this['_unit']=_0x3950bc,this[_0x55e517(0x2bc)]();},Window_ETB_ActionCount['prototype'][_0xb2d282(0x2bc)]=function(){const _0x29814f=_0xb2d282;Window_Base['prototype'][_0x29814f(0x2bc)][_0x29814f(0x234)](this),this['checkNeedsUpdate'](),this[_0x29814f(0x246)](),this['updateVisibility']();},Window_ETB_ActionCount['prototype'][_0xb2d282(0x19f)]=function(){const _0x39d2c8=_0xb2d282;if(!this[_0x39d2c8(0x206)])return;(this['_currentActions']!==this[_0x39d2c8(0x206)]['getCurrentActionsETB']()||this[_0x39d2c8(0x286)]!==this[_0x39d2c8(0x206)][_0x39d2c8(0x100)]())&&(this['_currentActions']=this['_unit'][_0x39d2c8(0x1e5)](),this[_0x39d2c8(0x286)]=this['_unit'][_0x39d2c8(0x100)](),this[_0x39d2c8(0x24b)]());},Window_ETB_ActionCount['prototype'][_0xb2d282(0x261)]=function(){const _0xbeb87e=_0xb2d282;this[_0xbeb87e(0x176)]=$gameSystem[_0xbeb87e(0x187)]();},Window_ETB_ActionCount[_0xb2d282(0x20b)]['refresh']=function(){const _0x2b231e=_0xb2d282;this[_0x2b231e(0x114)][_0x2b231e(0x21d)]();if(!this['_unit'])return;const _0x370142=Window_ETB_ActionCount[_0x2b231e(0x19b)];if(!_0x370142)return;const _0xa7938a=this[_0x2b231e(0x283)](),_0x2a8aa3=this[_0x2b231e(0x2e6)](),_0x30c972=_0x370142[_0x2b231e(0x23d)]+_0x370142[_0x2b231e(0x229)],_0x157c22=_0x370142[_0x2b231e(0x2c1)];let _0x511659=_0xa7938a['x'],_0x2ac5a2=_0xa7938a['y'];while(_0x2a8aa3[_0x2b231e(0x276)]>_0x370142[_0x2b231e(0x1ef)]){_0x2a8aa3['shift']();}while(_0x2a8aa3['length']>0x0){const _0x2f4ef4=_0x2a8aa3[_0x2b231e(0x127)]();this[_0x2b231e(0xf6)](_0x2f4ef4,_0x511659,_0x2ac5a2,_0x2a8aa3[_0x2b231e(0x276)]);if(_0x157c22){if(_0x2b231e(0x26f)!==_0x2b231e(0x26f)){if(!_0xb469f6)return![];if(!_0x41f961[_0x2b231e(0x203)]())return![];if(!_0x37325a['canInput']())return![];if(_0x5a4ed4[_0x2b231e(0x214)]())return![];return!![];}else _0x511659+=_0x30c972;}else _0x2ac5a2+=_0x30c972;}},Window_ETB_ActionCount['prototype']['createStartingCoordinates']=function(){const _0x1c1230=_0xb2d282,_0x4c6ddb=Window_ETB_ActionCount[_0x1c1230(0x19b)],_0x2e7c7d=this[_0x1c1230(0x206)]===$gameParty,_0x1a09f0=_0x4c6ddb['ImageSize'],_0x1594f9=_0x1a09f0*(_0x4c6ddb['MaxVisible']-0x1)+_0x4c6ddb[_0x1c1230(0x229)]*(_0x4c6ddb['MaxVisible']-0x2),_0x3abf89=_0x4c6ddb[_0x1c1230(0x2c1)],_0x7a5542=SceneManager[_0x1c1230(0x2e0)]['_statusWindow'][_0x1c1230(0x2c3)];let _0x5c0270=0x0,_0x2f9a28=0x0;const _0x286c99=_0x4c6ddb[_0x1c1230(0x213)];if(_0x286c99){_0x2f9a28=this[_0x1c1230(0x204)]-_0x7a5542-_0x4c6ddb[_0x1c1230(0x118)]-_0x1a09f0,_0x5c0270=_0x2e7c7d?this['innerWidth']-_0x4c6ddb['ScreenBufferX']-_0x1a09f0:_0x4c6ddb['ScreenBufferX'];if(_0x3abf89&&_0x2e7c7d)_0x5c0270-=_0x1594f9;else!_0x3abf89&&(_0x2f9a28-=_0x1594f9);}else{if(_0x1c1230(0x226)!=='JxYWs'){if(this[_0x1c1230(0x2a2)]())this[_0x1c1230(0x2a2)]()[_0x1c1230(0x10f)]();return![];}else _0x2f9a28=_0x4c6ddb[_0x1c1230(0x118)],_0x5c0270=_0x2e7c7d?this[_0x1c1230(0x1fa)]-_0x4c6ddb['ScreenBufferX']-_0x1a09f0:_0x4c6ddb[_0x1c1230(0x2aa)],_0x3abf89&&_0x2e7c7d&&(_0x5c0270-=_0x1594f9);}return _0x5c0270+=_0x2e7c7d?_0x4c6ddb['ActorOffsetX']:_0x4c6ddb[_0x1c1230(0x12c)],_0x2f9a28+=_0x2e7c7d?_0x4c6ddb[_0x1c1230(0x180)]:_0x4c6ddb['EnemyOffsetY'],new Point(Math[_0x1c1230(0x13f)](_0x5c0270),Math['round'](_0x2f9a28));},Window_ETB_ActionCount['prototype']['createContentsArray']=function(){const _0x232a88=_0xb2d282,_0x3e2736=Window_ETB_ActionCount[_0x232a88(0x19b)];let _0x4039b4=!![];if(_0x3e2736[_0x232a88(0x2c1)]){if(this[_0x232a88(0x206)]===$gameParty)_0x4039b4=!_0x4039b4;}else _0x4039b4=!_0x3e2736[_0x232a88(0x213)];let _0x33432e=this[_0x232a88(0x206)][_0x232a88(0x1e5)](),_0x2b38a9=Math[_0x232a88(0x1fb)](0x0,this[_0x232a88(0x206)][_0x232a88(0x100)]()-_0x33432e);const _0x404692=[];while(_0x33432e--){const _0x12e780=_0x232a88(0x1b1);_0x404692[_0x232a88(0x10d)](_0x12e780);}while(_0x2b38a9--){if(_0x232a88(0x240)===_0x232a88(0x240)){const _0x127edd=_0x232a88(0x1e7);if(_0x4039b4)_0x404692[_0x232a88(0x10d)](_0x127edd);else{if(_0x232a88(0x27c)!==_0x232a88(0x27c)){let _0xd86947=_0x40cf4e[_0x232a88(0x151)]()[_0x232a88(0x2ac)](_0x34879c=>_0x34879c['canMove']()&&!_0x34879c[_0x232a88(0x147)]()),_0x26ee70=_0x58ae3a[_0x232a88(0x151)]()['filter'](_0x230b42=>_0x230b42[_0x232a88(0x203)]()&&_0x230b42['canInput']());_0x420de9=_0x2c73a2[_0x232a88(0x1f7)](_0xd86947),_0x180601=_0x12d7db['_ETB_MAX_ACTIONS'];while(_0x2045d6--){_0x23f776=_0x5199d9[_0x232a88(0x1f7)](_0x26ee70);}_0x205420=_0x38116c[_0x232a88(0x2a0)]-0x1;while(_0x47c8e4--){_0x1dd7ef=_0x3e527d[_0x232a88(0x1f7)](_0xd86947);}}else _0x404692['unshift'](_0x127edd);}}else{const _0x39b80c=_0x232a88(0x25e);_0x45ca50?_0x49dbc9[_0x232a88(0x10d)](_0x39b80c):_0x3c7a20[_0x232a88(0x2df)](_0x39b80c);}}while(_0x404692[_0x232a88(0x276)]<0xa){const _0x494dbd=_0x232a88(0x25e);_0x4039b4?'KCXTC'==='EqXHo'?this[_0x232a88(0x2da)]='enemies':_0x404692['push'](_0x494dbd):_0x232a88(0x10a)!==_0x232a88(0x10a)?_0x4e691a[_0x232a88(0x10d)](_0x1e2fcf):_0x404692[_0x232a88(0x2df)](_0x494dbd);}return _0x404692;},Window_ETB_ActionCount[_0xb2d282(0x20b)][_0xb2d282(0xf6)]=function(_0x542af1,_0x53ef26,_0x21edab,_0x1d29b6){const _0x1a58bb=_0xb2d282;if(_0x542af1===_0x1a58bb(0x25e))return;if(_0x542af1===_0x1a58bb(0x1b1))_0x542af1=this[_0x1a58bb(0x206)]===$gameParty?_0x1a58bb(0x1de):_0x1a58bb(0x109);const _0x2c8465=Window_ETB_ActionCount[_0x1a58bb(0x19b)];if(_0x2c8465[_0x1a58bb(0x17e)[_0x1a58bb(0x2cd)](_0x542af1)]){if(_0x1a58bb(0xe7)==='tCgBy')_0x4441aa['BattleSystemETB'][_0x1a58bb(0x19a)]['call'](this),this['applyGlobalETB']();else{const _0x3bb663=_0x2c8465['%1ActionPicture'['format'](_0x542af1)],_0x6cdf86=ImageManager[_0x1a58bb(0x133)](_0x3bb663);_0x6cdf86[_0x1a58bb(0x12e)](this[_0x1a58bb(0x148)][_0x1a58bb(0xef)](this,_0x6cdf86,_0x53ef26,_0x21edab,_0x1d29b6));}}else{const _0xdd8171=ImageManager[_0x1a58bb(0x11a)[_0x1a58bb(0x2cd)](_0x542af1)];this['drawBigIcon'](_0xdd8171,_0x53ef26,_0x21edab);if(this[_0x1a58bb(0x256)](_0x1d29b6)){if('fENfO'===_0x1a58bb(0x228))this[_0x1a58bb(0x1ca)](_0x53ef26,_0x21edab);else{const _0x3ac29f=_0x567a40[_0x1a58bb(0x19b)];let _0xae12ae=_0x3ac29f['ImageSize'];const _0xf4b5a1=_0x519b57[_0x1a58bb(0x23c)](_0x1a58bb(0x14b)),_0x2f4a6e=_0x4986b0['iconWidth'],_0x5e6db1=_0x3e50a1[_0x1a58bb(0x1a3)],_0x102fa1=_0xe8f8a8%0x10*_0x2f4a6e,_0x48f33e=_0x46fe61['floor'](_0x4c5522/0x10)*_0x5e6db1;this['contents'][_0x1a58bb(0x1a9)][_0x1a58bb(0x177)]=_0x3ac29f['IconSmoothing'],this[_0x1a58bb(0x114)][_0x1a58bb(0x165)](_0xf4b5a1,_0x102fa1,_0x48f33e,_0x2f4a6e,_0x5e6db1,_0x48af65,_0x3c2a36,_0xae12ae,_0xae12ae),this['contents']['_context'][_0x1a58bb(0x177)]=!![];}}}},Window_ETB_ActionCount['prototype'][_0xb2d282(0x148)]=function(_0x1ff079,_0x17647c,_0x330952,_0x28a878){const _0x5cb714=_0xb2d282;if(!_0x1ff079)return;const _0x877dfa=Window_ETB_ActionCount[_0x5cb714(0x19b)],_0x39cc70=_0x877dfa[_0x5cb714(0x23d)],_0x1cae60=_0x39cc70/_0x1ff079[_0x5cb714(0x1db)],_0x1a7bd6=_0x39cc70/_0x1ff079[_0x5cb714(0x2c3)],_0x365bf5=Math[_0x5cb714(0x182)](_0x1cae60,_0x1a7bd6,0x1),_0x664f29=_0x1ff079[_0x5cb714(0x2c3)],_0x185105=_0x1ff079['height'],_0x23f2ec=Math[_0x5cb714(0x13f)](_0x664f29*_0x365bf5),_0x5a34f4=Math[_0x5cb714(0x13f)](_0x185105*_0x365bf5),_0x4c6464=Math[_0x5cb714(0x13f)](_0x17647c+(_0x39cc70-_0x23f2ec)/0x2),_0x5d4d27=Math[_0x5cb714(0x13f)](_0x330952+(_0x39cc70-_0x5a34f4)/0x2);this[_0x5cb714(0x114)][_0x5cb714(0x1a9)][_0x5cb714(0x177)]=_0x877dfa[_0x5cb714(0x2a4)],this[_0x5cb714(0x114)]['blt'](_0x1ff079,0x0,0x0,_0x664f29,_0x185105,_0x4c6464,_0x5d4d27,_0x23f2ec,_0x5a34f4),this['contents'][_0x5cb714(0x1a9)][_0x5cb714(0x177)]=!![],this[_0x5cb714(0x256)](_0x28a878)&&this[_0x5cb714(0x1ca)](_0x17647c,_0x330952);},Window_ETB_ActionCount['prototype'][_0xb2d282(0x2d4)]=function(_0x41e816,_0x47ffcc,_0x18562b){const _0x586c9b=_0xb2d282,_0x31d33b=Window_ETB_ActionCount[_0x586c9b(0x19b)];let _0xb53fbe=_0x31d33b[_0x586c9b(0x23d)];const _0x1bf505=ImageManager[_0x586c9b(0x23c)](_0x586c9b(0x14b)),_0x307a9c=ImageManager[_0x586c9b(0x205)],_0x3b364d=ImageManager[_0x586c9b(0x1a3)],_0x31db65=_0x41e816%0x10*_0x307a9c,_0x264d7f=Math[_0x586c9b(0x291)](_0x41e816/0x10)*_0x3b364d;this['contents'][_0x586c9b(0x1a9)][_0x586c9b(0x177)]=_0x31d33b[_0x586c9b(0x16a)],this[_0x586c9b(0x114)][_0x586c9b(0x165)](_0x1bf505,_0x31db65,_0x264d7f,_0x307a9c,_0x3b364d,_0x47ffcc,_0x18562b,_0xb53fbe,_0xb53fbe),this['contents'][_0x586c9b(0x1a9)]['imageSmoothingEnabled']=!![];},Window_ETB_ActionCount['prototype'][_0xb2d282(0x246)]=function(){const _0x5640eb=_0xb2d282,_0x2978fe=Window_ETB_ActionCount[_0x5640eb(0x19b)];if(_0x2978fe[_0x5640eb(0x213)])return;if(!_0x2978fe[_0x5640eb(0x1eb)])return;const _0x4ad803=SceneManager['_scene']['_helpWindow'];if(!_0x4ad803)return;_0x4ad803[_0x5640eb(0x176)]?(this['x']=_0x2978fe[_0x5640eb(0x2c7)]||0x0,this['y']=_0x2978fe['RepositionTopHelpY']||0x0):(this['x']=0x0,this['y']=0x0);},Window_ETB_ActionCount[_0xb2d282(0x20b)][_0xb2d282(0x256)]=function(_0x895658){const _0x7862f5=_0xb2d282,_0x2a8417=Window_ETB_ActionCount[_0x7862f5(0x19b)];if(!_0x2a8417[_0x7862f5(0x13e)])return![];const _0x18b251=_0x2a8417[_0x7862f5(0x213)],_0x3edfe0=_0x2a8417[_0x7862f5(0x2c1)],_0x55547c=this['_unit']===$gameParty;if(_0x3edfe0)return _0x55547c?_0x895658===0x0:_0x895658===_0x2a8417[_0x7862f5(0x1ef)]-0x1;else{if(_0x18b251){if('mMPdW'==='mMPdW')return _0x895658===0x0;else _0x422aa2['BattleSystemETB'][_0x7862f5(0x14d)][_0x7862f5(0x234)](this);}else{if(_0x7862f5(0x269)!==_0x7862f5(0x269))_0x46fbd2['BattleSystemETB'][_0x7862f5(0x21b)][_0x7862f5(0x234)](this,_0x381fa0,_0x3f6334),this[_0x7862f5(0x2de)]()['recalculateActionsETB']();else return _0x895658===_0x2a8417['MaxVisible']-0x1;}}},Window_ETB_ActionCount['prototype'][_0xb2d282(0x1ca)]=function(_0x4c7359,_0x38c61e){const _0x3a30d3=_0xb2d282;this['resetFontSettings']();const _0x3b9222=Window_ETB_ActionCount[_0x3a30d3(0x19b)],_0x381cd3=new Rectangle(_0x4c7359,_0x38c61e,_0x3b9222['ImageSize'],_0x3b9222[_0x3a30d3(0x23d)]);_0x381cd3['x']+=_0x3b9222[_0x3a30d3(0x1f6)],_0x381cd3['y']+=_0x3b9222['ActionsRemainingOffsetY'];const _0x56df26=this[_0x3a30d3(0x206)][_0x3a30d3(0x1e5)]();this[_0x3a30d3(0x114)][_0x3a30d3(0x10e)]=_0x3b9222[_0x3a30d3(0x14e)],this[_0x3a30d3(0x114)][_0x3a30d3(0x102)](_0x56df26,_0x381cd3['x'],_0x381cd3['y'],_0x381cd3[_0x3a30d3(0x1db)],_0x381cd3['height'],_0x3a30d3(0x2b1)),this[_0x3a30d3(0x20f)]();};
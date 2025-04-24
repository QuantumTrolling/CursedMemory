//=============================================================================
// VisuStella MZ - Battle System - STB - Standard Turn Battle
// VisuMZ_2_BattleSystemSTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemSTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemSTB = VisuMZ.BattleSystemSTB || {};
VisuMZ.BattleSystemSTB.version = 1.18;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.18] [BattleSystemSTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_STB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Standard Turn Battle (STB) system uses RPG Maker MZ's default non-TPB
 * battle system as a base. Action orders are determined by the battler's AGI
 * values and they go from highest to lowest. However, actions are not selected
 * at the start of the turn. Instead, as the turn progresses, actions are then
 * picked as each battler's turn comes up and is executed immediately.
 * 
 * Optional to the battle system but fine tuned to it is the Exploit System.
 * When landing an elemental weakness or critical hit against a foe, the
 * battler can gain bonuses as well as an extra turn while the foe will become
 * stunned or gain any desired state(s). When all enemies are exploited in a
 * single turn, a common event can also be played, too.
 * 
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "stb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Utilizes the balanced AGI nature of the Default Turn Battle system.
 * * Allows for actions to execute immediately upon selection.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Skills and Items can have an "Instant Use" effect, which allows them to
 *   perform an action immediately without using up a turn.
 * * An optional Exploit System that can be disabled if desired, but otherwise,
 *   fine tuned to make use of STB's highly compatible nature.
 * * Landing an elemental weakness or critical hit can allow the active battler
 *   to gain bonuses, ranging from states to extra actions to custom effects
 *   that can be added on through JavaScript plugin parameters.
 * * An exploited enemy can suffer from states and/or custom effects added
 *   through JavaScript plugin parameters.
 * * If all enemies are exploited, a common event can run to allow for a custom
 *   follow up action.
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
 * Turn Order Display
 * 
 * The Turn Order Display will capture the battle's currently active battler
 * and any battlers found in the active battlers array for the BattleManager.
 * This does not overwrite any functions, but the Turn Order Display may or may
 * not conflict with any existing HUD elements that are already positioned on
 * the screen. If so, you can choose to offset the Turn Order Display or move
 * it to a different part of the screen through the plugin parameters.
 * 
 * ---
 *
 * Action Speed
 * 
 * For skills and items, action speeds now behave differently now. Because
 * actions are now decided after a turn starts, positioning will no longer be
 * decided from the selected skill/item's action speed for the current turn.
 * 
 * Instead, the action speed used by a skill or item will determine the bonus
 * speed (or speed penalty if negative) for the following turn. Using a Guard
 * action with a +2000 Action Speed will raise the following turn's speed by
 * +2000, whereas what is originally a long charge time skill with -1000 speed
 * will decrease the following action's speed by -1000.
 * 
 * You can also customize how speed is calculated through JS Plugin Parameters
 * found in the Mechanics Settings.
 *
 * ---
 * 
 * Instant Use
 * 
 * Skills and Items can have an "Instant Use" property which allows them to be
 * used immediately without consuming a turn. This can be used for actions that
 * otherwise do not warrant a whole turn. These can be used for minor buffs,
 * debuffs, toggles, etc.
 * 
 * ---
 * 
 * Exploit System
 * 
 * This is an optional system. If you wish to turn it off, you can do so in the
 * plugin parameters.
 * 
 * There are two main ways that battlers can be exploited. One is by receiving
 * damage that strikes an elemental weakness. The other is by receiving damage
 * from a Critical Hit. Exploited battlers can receive penalty states. These
 * states can be adjusted in the plugin parameters. The default penalty state
 * is the Stunned state.
 * 
 * The battler doing the exploiting can receive bonuses instead. This is to
 * reward a power play. These bonuses can range from added states to receiving
 * an extra action and allowing the active battler to immediately attack again.
 * 
 * Each battler can only be exploited once per turn. This means if an enemy
 * would receive multiple attacks to its elemental weakness(es), the exploited
 * effect will only occur once per turn, meaning the penalty states won't stack
 * multiple times over. This limitation is for the sake of game balance, but if
 * you so wish, you can turn off this limitation in the plugin parameters.
 * 
 * Each action can also exploit only once per use and against an unexploited
 * target. This means battlers cannot use the same elemental attacks against
 * the same foes over and over to stack up an infinite amount of turns. If the
 * player wants to gain more bonuses, the player would have to strike against
 * unexploited foes. This limitation is for the sake of game balance, but if
 * you so wish, you can turn off this limitation in the plugin parameters.
 * 
 * When all members of a party/troop are exploited, a common event can be
 * triggered to run, allowing for potential follow up actions. How you wish to
 * make these common events is up to you.
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins. Here is a list
 * of the ones this plugin is not compatible with.
 *
 * ---
 *
 * VisuMZ_4_BreakShields
 * 
 * The Break Shields plugin can be used together with Battle System - STB.
 * However, it cannot be used together with the STB Exploit system. This is
 * because both Break Shields and the Exploit system function under similar
 * mechanics and will conflict. However, if STB's Exploit system is turned off,
 * then you can use all of the Break Shield plugin's features fully.
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
 * === General STB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <STB Help>
 *  description
 *  description
 * </STB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under STB.
 * - This is primarily used if the skill behaves differently in STB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to STB.
 *
 * ---
 * 
 * === STB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the STB Turn Order Display
 * 
 * ---
 *
 * <STB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <STB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <STB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Instant Use-Related Notetags ===
 * 
 * ---
 *
 * <STB Instant>
 * <STB Instant Use>
 * <STB Instant Cast>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to be used immediately without consuming a turn.
 *
 * ---
 * 
 * === Exploit-Related Notetags ===
 * 
 * ---
 *
 * <STB Exploited Gain State: id>
 * <STB Exploited Gain State: id, id, id>
 * 
 * <STB Exploited Gain State: name>
 * <STB Exploited Gain State: name, name, name>
 *
 * - Used for: Class, Enemy Notetags
 * - If an actor (with the specified class) or enemy is exploited via elemental
 *   weaknesses or critical hits, apply the listed penalty state(s).
 * - Replace 'id' with a number representing the penalty state ID's you wish
 *   to apply to the exploited battler.
 * - Insert multiple 'id' values to apply multiple penalty states at once.
 * - Replace 'name' with the name of the penalty state you wish to apply to the
 *   exploited battler.
 * - Insert multiple 'name' entries to apply multiple penalty states at once.
 *
 * ---
 *
 * <STB Cannot Be Exploited>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This prevents the affected battler from being exploited via elemental
 *   weaknesses or critical hits.
 *
 * ---
 *
 * <STB Exploiter Gain State: id>
 * <STB Exploiter Gain State: id, id, id>
 * 
 * <STB Exploiter Gain State: name>
 * <STB Exploiter Gain State: name, name, name>
 *
 * - Used for: Class, Enemy Notetags
 * - If an actor (with the specified class) or enemy exploits an opponent with
 *   an elemental weakness or critical hit, apply the listed bonus state(s).
 * - Replace 'id' with a number representing the bonus state ID's you wish
 *   to apply to the exploited battler.
 * - Insert multiple 'id' values to apply multiple bonus states at once.
 * - Replace 'name' with the name of the bonus state you wish to apply to the
 *   exploited battler.
 * - Insert multiple 'name' entries to apply multiple bonus states at once.
 *
 * ---
 *
 * <STB Cannot Be Exploiter>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This prevents the affected battler from exploiting any opponents via
 *   elemental weaknesses or critical hits.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change STB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the STB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change STB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the STB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Actor: Clear STB Turn Order Graphic
 * - Clears the STB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change STB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the STB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change STB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the STB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear STB Turn Order Graphic
 * - Clears the STB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: STB Turn Order Visibility
 * - Determine the visibility of the STB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the STB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of the STB Battle System.
 *
 * ---
 *
 * Speed
 * 
 *   JS: Finalized Speed:
 *   - Code used to calculate the finalized speed at the start of each turn.
 * 
 *   JS: Next Turn Speed:
 *   - Code used to calculate speed for a following turn.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploit System Settings
 * ============================================================================
 *
 * Here, you can adjust the main settings for the Exploit System, including
 * where you can turn it on/off. The Exploited and Exploiter settings are
 * extensions of the Exploit System and are better off with their own sections.
 *
 * ---
 *
 * Settings
 * 
 *   Enable System?:
 *   - Enable the exploit system? 
 *   - If disabled, ignore all the  mechanics regarding the Exploit System.
 * 
 *   Critical Hits:
 *   - Do critical hits exploit the opponent?
 * 
 *   Elemental Weakness:
 *   - Do elemental weaknesses exploit the opponent?
 * 
 *     Minimum Rate:
 *     - What's the minimum rate needed to count as an elemental weakness?
 * 
 *   Forced Actions:
 *   - Apply exploit system to Forced Actions?
 *   - We added this function because forced actions can disrupt player
 *     strategies when used with the exploit system.
 * 
 *   Reset Each Turn:
 *   - Reset exploits at the end of each turn?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploited Effects Settings
 * ============================================================================
 *
 * These are effects for the exploited battlers (the receiving end). Change how
 * you want exploited battlers to behave here.
 *
 * ---
 *
 * Mechanics
 * 
 *   Added States:
 *   - A list of the states that are added when a target is exploited.
 * 
 *   Full Exploit Events:
 *   vs Actors Event:
 *   vs Enemies Event:
 *   - If all actors/enemies have been fully exploited, run this common event.
 *   - Does not work with unlimited exploits.
 * 
 *   Unlimited Exploits:
 *   - Can battlers be exploited endlessly?
 * 
 *   JS: On Exploited:
 *   - Code used when the target has been exploited.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploiter Effects Settings
 * ============================================================================
 *
 * These are effects for the battlers doing the exploiting. Change how you want
 * exploiter battlers to behave here.
 *
 * ---
 *
 * Mechanics
 * 
 *   Added States:
 *   - A list of the states that are added when a user exploits a foe.
 * 
 *   Extra Actions:
 *   - Successfully exploiting an enemy will grant the user this many
 *     extra actions.
 * 
 *   Multiple Exploits:
 *   - Can battlers exploit opponents multiple times with one action?
 * 
 *   JS: On Exploiting:
 *   - Code used when the user is exploiting a foe's weakness.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System STB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Center Horizontal?:
 *   - Reposition the Turn Order Display to always be centered if it is a
 *     'top' or 'bottom' position?
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Max Horizontal:
 *   - Maximum slots you want to display for top and bottom Turn Order Display
 *     positions?
 * 
 *   Max Vertical:
 *   - Maximum slots you want to display for left and right Turn Order Display
 *     positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
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
 * Version 1.18: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.17: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the STB Turn Order faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.16: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 * 
 * Version 1.15: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Exploit System Settings > Forced Actions
 * **** Apply exploit system to Forced Actions?
 * **** We added this function because forced actions can disrupt player
 *      strategies when used with the exploit system.
 * 
 * Version 1.14: March 3, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.13: November 11, 2021
 * * Bug Fixes!
 * ** Critical hits for enemies with only one action per turn should now
 *    properly allow for the exploited effect to occur. Fix made by Olivia.
 * 
 * Version 1.12: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.11: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that altered the current action choice when enemies are using
 *    a skill that utilizes instants when there is only enough MP left for one
 *    of those actions. Fix made by Olivia.
 * 
 * Version 1.10: July 2, 2021
 * * Bug Fixes!
 * ** Dead battlers will no longer reappear in the turn order on subsequent
 *    turns. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** "Mechanics Settings" Plugin Parameters has been updated into
 *    "Speed Mechanics" with updated formulas that will now correlate any
 *    adjusted AGI changes made to battlers to alter the following turn
 *    properly. Update made by Olivia.
 * 
 * Version 1.09: March 26, 2021
 * * Bug Fixes!
 * ** Enemy exploit actions should now associate A.I. properly. Fix by Yanfly.
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.08: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * 
 * Version 1.06: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: December 25, 2020
 * * Bug Fixes!
 * ** Starting battle from a surprise attack will no longer skip turn 1. And
 *    starting battle without any inputtable actors will no longer skip turn 1.
 *    Fix made by Yanfly.
 * 
 * Version 1.04: December 18, 2020
 * * Feature Update!
 * ** Enemies can now benefit from <STB Instant> skills. Update made by Olivia.
 * ** Action End States updating are now handled by Skills and States Core
 *    v1.07+ for proper intended usage. Change from Battle System - STB v1.02
 *    is reverted here to prevent triggering the update twice.
 * 
 * Version 1.03: December 4, 2020
 * * Bug Fixes!
 * ** Select Next Command no longer returns undefined. Fix made by Olivia.
 * 
 * Version 1.02: November 22, 2020
 * * Bug Fixes!
 * ** Action End States now update at the end of each individual action.
 *    Fix made by Yanfly.
 * 
 * Version 1.01: November 15, 2020
 * * Bug Fixes!
 * ** Now compatible with Party Command Window Disable from the Battle Core.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release Date: November 23, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderActorIcon
 * @text Actor: Change STB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the STB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderActorFace
 * @text Actor: Change STB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the STB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderClearActorGraphic
 * @text Actor: Clear STB Turn Order Graphic
 * @desc Clears the STB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderEnemyIcon
 * @text Enemy: Change STB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the STB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderEnemyFace
 * @text Enemy: Change STB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the STB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear STB Turn Order Graphic
 * @desc Clears the STB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: STB Turn Order Visibility
 * @desc Determine the visibility of the STB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the STB Turn Order Display.
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
 * @param BattleSystemSTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Speed:struct
 * @text Speed Mechanics
 * @type struct<Speed>
 * @desc Determines the mechanics of the STB Battle System.
 * @default {"Speed":"","InitialSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst agi = user.agi;\\n\\n// Create Base Speed\\nlet speed = agi;\\n\\n// Random Speed Check\\nif (user.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\n\\n// Add Saved Speed Modifiers from Previous Round\\nspeed += user.getSTBNextTurnSpeed();\\n\\n// Return Speed\\nreturn speed;\"","NextTurnSavedSpeedJS:func":"\"// Create Speed\\nconst action = this;\\nlet speed = 0;\\n\\n// Check Object\\nif (action.item()) {\\n    speed += action.item().speed;\\n}\\n\\n// Check Attack\\nif (action.isAttack()) {\\n    speed += action.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\""}
 *
 * @param Exploit:struct
 * @text Exploit System
 * @type struct<Exploit>
 * @desc Settings for the STB's Exploit System.
 * @default {"EnableExploit:eval":"true","ExploitCritical:eval":"true","ExploitEleWeakness:eval":"true","ExploitEleRate:num":"1.05","TurnResetExploits:eval":"true"}
 *
 * @param Exploited:struct
 * @text Exploited Effects
 * @parent Exploit:struct
 * @type struct<Exploited>
 * @desc Settings for targets being Exploited.
 * @default {"Mechanics":"","AddedStates:arraynum":"[\"13\"]","FullExploitEvents":"","vsActorsFullExploit:num":"0","vsEnemiesFullExploit:num":"0","UnlimitedExploits:eval":"false","CustomJS:func":"\"// Declare Constants\\nconst target = this;\\nconst user = arguments[0];\\nconst action = arguments[1];\\n\\n// Perform Actions\\n\"","Animation":"","AnimationID:num":"0","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"","TextColor:str":"0","FlashColor:eval":"[255, 255, 255, 160]","FlashDuration:num":"60"}
 *
 * @param Exploiter:struct
 * @text Exploiter Effects
 * @parent Exploit:struct
 * @type struct<Exploiter>
 * @desc Settings for users doing the Exploiting.
 * @default {"Mechanics":"","AddedStates:arraynum":"[]","ExtraActions:num":"1","MultipleExploits:eval":"false","CustomJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = arguments[0];\\nconst action = arguments[1];\\n\\n// Perform Actions\\n\"","Animation":"","AnimationID:num":"12","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"ONE MORE!","TextColor:str":"0","FlashColor:eval":"[255, 255, 128, 160]","FlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System STB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * Speed Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Speed:
 *
 * @param Speed
 *
 * @param InitialSpeedJS:func
 * @text JS: Finalized Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate initial speed at the start of battle.
 * @default "// Declare Constants\nconst user = this;\nconst agi = user.agi;\n\n// Create Base Speed\nlet speed = agi;\n\n// Random Speed Check\nif (user.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\n\n// Add Saved Speed Modifiers from Previous Round\nspeed += user.getSTBNextTurnSpeed();\n\n// Return Speed\nreturn speed;"
 *
 * @param NextTurnSavedSpeedJS:func
 * @text JS: Next Turn Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate speed for a following turn.
 * @default "// Create Speed\nconst action = this;\nlet speed = 0;\n\n// Check Object\nif (action.item()) {\n    speed += action.item().speed;\n}\n\n// Check Attack\nif (action.isAttack()) {\n    speed += action.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Exploit System Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploit:
 *
 * @param EnableExploit:eval
 * @text Enable System?
 * @parent Exploit
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the exploit system? If disabled, ignore all the 
 * mechanics regarding the Exploit System.
 * @default true
 *
 * @param ExploitCritical:eval
 * @text Critical Hits
 * @parent Exploit
 * @type boolean
 * @on Exploit
 * @off Don't Exploit
 * @desc Do critical hits exploit the opponent?
 * @default true
 *
 * @param ExploitEleWeakness:eval
 * @text Elemental Weakness
 * @parent Exploit
 * @type boolean
 * @on Exploit
 * @off Don't Exploit
 * @desc Do elemental weaknesses exploit the opponent?
 * @default true
 *
 * @param ExploitEleRate:num
 * @text Minimum Rate
 * @parent ExploitEleWeakness:eval
 * @desc What's the minimum rate needed to count as an elemental weakness?
 * @default 1.05
 *
 * @param ForcedActions:eval
 * @text Forced Actions
 * @parent Exploit
 * @type boolean
 * @on Apply
 * @off Don't Apply
 * @desc Apply exploit system to Forced Actions?
 * @default false
 *
 * @param TurnResetExploits:eval
 * @text Reset Each Turn
 * @parent Exploit
 * @type boolean
 * @on Reset Exploits
 * @off Don't Reset
 * @desc Reset exploits at the end of each turn?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Exploited Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploited:
 *
 * @param Mechanics
 * 
 * @param AddedStates:arraynum
 * @text Added States
 * @parent Mechanics
 * @type state[]
 * @desc A list of the states that are added when a target is exploited.
 * @default ["13"]
 * 
 * @param FullExploitEvents
 * @text Full Exploit Events
 * @parent Mechanics
 * 
 * @param vsActorsFullExploit:num
 * @text vs Actors Event
 * @parent FullExploitEvents
 * @type common_event
 * @desc If all actors have been fully exploited, run this common
 * event. Does not work with unlimited exploits.
 * @default 0
 * 
 * @param vsEnemiesFullExploit:num
 * @text vs Enemies Event
 * @parent FullExploitEvents
 * @type common_event
 * @desc If all enemies have been fully exploited, run this common
 * event. Does not work with unlimited exploits.
 * @default 0
 *
 * @param UnlimitedExploits:eval
 * @text Unlimited Exploits
 * @parent Mechanics
 * @type boolean
 * @on Unlimited
 * @off Once Per Turn
 * @desc Can battlers be exploited endlessly?
 * @default false
 *
 * @param CustomJS:func
 * @text JS: On Exploited
 * @parent Mechanics
 * @type note
 * @desc Code used when the target has been exploited.
 * @default "// Declare Constants\nconst target = this;\nconst user = arguments[0];\nconst action = arguments[1];\n\n// Perform Actions\n"
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 0
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default 
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Exploiter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploiter:
 *
 * @param Mechanics
 * 
 * @param AddedStates:arraynum
 * @text Added States
 * @parent Mechanics
 * @type state[]
 * @desc A list of the states that are added when a user exploits a foe.
 * @default []
 * 
 * @param ExtraActions:num
 * @text Extra Actions
 * @parent Mechanics
 * @type number
 * @desc Successfully exploiting an enemy will grant the user this many extra actions.
 * @default 1
 *
 * @param MultipleExploits:eval
 * @text Multiple Exploits
 * @parent Mechanics
 * @type boolean
 * @on Multiple
 * @off Once Per Action
 * @desc Can battlers exploit opponents multiple times with one action?
 * @default false
 *
 * @param CustomJS:func
 * @text JS: On Exploiting
 * @parent Mechanics
 * @type note
 * @desc Code used when the user is exploiting a foe's weakness.
 * @default ""
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default ONE MORE!
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 128, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param CenterHorz:eval
 * @text Center Horizontal?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Center
 * @off Stay
 * @desc Reposition the Turn Order Display to always be centered
 * if it is a 'top' or 'bottom' position?
 * @default true
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
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
 * @default 96
 * 
 * @param Slots
 *
 * @param MaxHorzSprites:num
 * @text Max Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param MaxVertSprites:num
 * @text Max Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
//=============================================================================

const _0x1ea107=_0x2a5e;(function(_0x5e8051,_0x40ef9b){const _0x10b3c8=_0x2a5e,_0xa3ab3=_0x5e8051();while(!![]){try{const _0x4c333c=parseInt(_0x10b3c8(0x2c6))/0x1+parseInt(_0x10b3c8(0x39f))/0x2*(-parseInt(_0x10b3c8(0x284))/0x3)+parseInt(_0x10b3c8(0x1db))/0x4*(parseInt(_0x10b3c8(0x1ed))/0x5)+-parseInt(_0x10b3c8(0x2d0))/0x6+-parseInt(_0x10b3c8(0x2d6))/0x7+parseInt(_0x10b3c8(0x38b))/0x8*(parseInt(_0x10b3c8(0x31d))/0x9)+-parseInt(_0x10b3c8(0x232))/0xa*(-parseInt(_0x10b3c8(0x24c))/0xb);if(_0x4c333c===_0x40ef9b)break;else _0xa3ab3['push'](_0xa3ab3['shift']());}catch(_0x2dd073){_0xa3ab3['push'](_0xa3ab3['shift']());}}}(_0x3d1b,0x5d3ee));function _0x2a5e(_0x18ddf7,_0x197855){const _0x3d1bb1=_0x3d1b();return _0x2a5e=function(_0x2a5ed4,_0x90139e){_0x2a5ed4=_0x2a5ed4-0x1b9;let _0x1b430e=_0x3d1bb1[_0x2a5ed4];return _0x1b430e;},_0x2a5e(_0x18ddf7,_0x197855);}var label=_0x1ea107(0x27f),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1ea107(0x293)](function(_0x49e794){const _0x1a9d49=_0x1ea107;return _0x49e794[_0x1a9d49(0x1f2)]&&_0x49e794[_0x1a9d49(0x2b6)][_0x1a9d49(0x37e)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x1ea107(0x29a)]||{},VisuMZ['ConvertParams']=function(_0x3ffd8f,_0x150327){const _0x24fd74=_0x1ea107;for(const _0xbb0462 in _0x150327){if(_0xbb0462[_0x24fd74(0x378)](/(.*):(.*)/i)){const _0x39bbb0=String(RegExp['$1']),_0x5f01b9=String(RegExp['$2'])[_0x24fd74(0x38d)]()['trim']();let _0x536578,_0x566a97,_0x34cc3f;switch(_0x5f01b9){case _0x24fd74(0x309):_0x536578=_0x150327[_0xbb0462]!==''?Number(_0x150327[_0xbb0462]):0x0;break;case _0x24fd74(0x385):_0x566a97=_0x150327[_0xbb0462]!==''?JSON[_0x24fd74(0x233)](_0x150327[_0xbb0462]):[],_0x536578=_0x566a97[_0x24fd74(0x210)](_0xd7ce53=>Number(_0xd7ce53));break;case _0x24fd74(0x1ee):_0x536578=_0x150327[_0xbb0462]!==''?eval(_0x150327[_0xbb0462]):null;break;case'ARRAYEVAL':_0x566a97=_0x150327[_0xbb0462]!==''?JSON[_0x24fd74(0x233)](_0x150327[_0xbb0462]):[],_0x536578=_0x566a97[_0x24fd74(0x210)](_0x5aea10=>eval(_0x5aea10));break;case'JSON':_0x536578=_0x150327[_0xbb0462]!==''?JSON[_0x24fd74(0x233)](_0x150327[_0xbb0462]):'';break;case'ARRAYJSON':_0x566a97=_0x150327[_0xbb0462]!==''?JSON[_0x24fd74(0x233)](_0x150327[_0xbb0462]):[],_0x536578=_0x566a97[_0x24fd74(0x210)](_0xe6ed3d=>JSON[_0x24fd74(0x233)](_0xe6ed3d));break;case'FUNC':_0x536578=_0x150327[_0xbb0462]!==''?new Function(JSON[_0x24fd74(0x233)](_0x150327[_0xbb0462])):new Function(_0x24fd74(0x25f));break;case'ARRAYFUNC':_0x566a97=_0x150327[_0xbb0462]!==''?JSON['parse'](_0x150327[_0xbb0462]):[],_0x536578=_0x566a97[_0x24fd74(0x210)](_0x2c2a87=>new Function(JSON[_0x24fd74(0x233)](_0x2c2a87)));break;case'STR':_0x536578=_0x150327[_0xbb0462]!==''?String(_0x150327[_0xbb0462]):'';break;case _0x24fd74(0x241):_0x566a97=_0x150327[_0xbb0462]!==''?JSON[_0x24fd74(0x233)](_0x150327[_0xbb0462]):[],_0x536578=_0x566a97[_0x24fd74(0x210)](_0x55af32=>String(_0x55af32));break;case'STRUCT':_0x34cc3f=_0x150327[_0xbb0462]!==''?JSON[_0x24fd74(0x233)](_0x150327[_0xbb0462]):{},_0x536578=VisuMZ[_0x24fd74(0x205)]({},_0x34cc3f);break;case _0x24fd74(0x38c):_0x566a97=_0x150327[_0xbb0462]!==''?JSON[_0x24fd74(0x233)](_0x150327[_0xbb0462]):[],_0x536578=_0x566a97[_0x24fd74(0x210)](_0x358aa2=>VisuMZ[_0x24fd74(0x205)]({},JSON[_0x24fd74(0x233)](_0x358aa2)));break;default:continue;}_0x3ffd8f[_0x39bbb0]=_0x536578;}}return _0x3ffd8f;},(_0xa53aef=>{const _0x288cd7=_0x1ea107,_0x4a8533=_0xa53aef[_0x288cd7(0x2d9)];for(const _0x394da5 of dependencies){if(_0x288cd7(0x1c9)==='gUdeI'){if(!Imported[_0x394da5]){if('YQIVp'!=='cwLcO'){alert(_0x288cd7(0x1f8)[_0x288cd7(0x277)](_0x4a8533,_0x394da5)),SceneManager[_0x288cd7(0x2ca)]();break;}else{const _0x3019c9=_0x24f7b5(_0x3f2ceb['$1']);_0x3019c9!==_0x449f67[_0x5d7f05][_0x288cd7(0x2bb)]&&(_0x45efe4(_0x288cd7(0x23d)['format'](_0x4f7488,_0x3019c9)),_0x99c512[_0x288cd7(0x2ca)]());}}}else this['_stbNextTurnSpeed']===_0x1f5a1e&&this[_0x288cd7(0x2f7)](),this[_0x288cd7(0x1cc)]=_0x5b621a;}const _0x4f314a=_0xa53aef[_0x288cd7(0x2b6)];if(_0x4f314a['match'](/\[Version[ ](.*?)\]/i)){if('UDTGv'!==_0x288cd7(0x3ab)){const _0x1a73b2=_0x5b4078[_0x288cd7(0x29a)];this['_fadeDuration']=_0x1a73b2[_0x288cd7(0x1f1)],this[_0x288cd7(0x305)]=_0x4ad249;}else{const _0x4c28a3=Number(RegExp['$1']);if(_0x4c28a3!==VisuMZ[label][_0x288cd7(0x2bb)]){if('LtCDH'===_0x288cd7(0x31c)){const _0x2b8bc0=_0x27fe9a['BattleSystemSTB'][_0x288cd7(0x33b)]['CannotBeExploiter'];return this[_0x288cd7(0x1cd)]()[_0x288cd7(0x300)](_0x30e00b=>_0x30e00b['note'][_0x288cd7(0x378)](_0x2b8bc0));}else alert(_0x288cd7(0x23d)[_0x288cd7(0x277)](_0x4a8533,_0x4c28a3)),SceneManager['exit']();}}}if(_0x4f314a[_0x288cd7(0x378)](/\[Tier[ ](\d+)\]/i)){const _0x1bbbb1=Number(RegExp['$1']);_0x1bbbb1<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x288cd7(0x277)](_0x4a8533,_0x1bbbb1,tier)),SceneManager[_0x288cd7(0x2ca)]()):'zwZKr'===_0x288cd7(0x291)?_0x51279f-=_0x79a4d8*_0x253db2[_0x288cd7(0x28d)]:tier=Math[_0x288cd7(0x249)](_0x1bbbb1,tier);}VisuMZ[_0x288cd7(0x205)](VisuMZ[label][_0x288cd7(0x29a)],_0xa53aef[_0x288cd7(0x25c)]);})(pluginData),PluginManager[_0x1ea107(0x28b)](pluginData[_0x1ea107(0x2d9)],_0x1ea107(0x333),_0x31c229=>{const _0x5184ba=_0x1ea107;VisuMZ[_0x5184ba(0x205)](_0x31c229,_0x31c229);const _0x18adb1=_0x31c229[_0x5184ba(0x35d)],_0x590d94=_0x31c229['IconIndex'];for(const _0x2de335 of _0x18adb1){const _0x59c98e=$gameActors[_0x5184ba(0x39b)](_0x2de335);if(!_0x59c98e)continue;_0x59c98e[_0x5184ba(0x3ad)]='icon',_0x59c98e['_stbTurnOrderIconIndex']=_0x590d94;}}),PluginManager[_0x1ea107(0x28b)](pluginData['name'],_0x1ea107(0x345),_0x1d033c=>{const _0x5c97d3=_0x1ea107;VisuMZ[_0x5c97d3(0x205)](_0x1d033c,_0x1d033c);const _0x5035b6=_0x1d033c[_0x5c97d3(0x35d)],_0x3d9ade=_0x1d033c[_0x5c97d3(0x359)],_0x56448e=_0x1d033c[_0x5c97d3(0x26d)];for(const _0x2c3315 of _0x5035b6){if(_0x5c97d3(0x1eb)===_0x5c97d3(0x376))return this[_0x5c97d3(0x1f4)]===_0x121bd2&&this[_0x5c97d3(0x2f7)](),this[_0x5c97d3(0x1f4)];else{const _0xd1fd25=$gameActors[_0x5c97d3(0x39b)](_0x2c3315);if(!_0xd1fd25)continue;_0xd1fd25[_0x5c97d3(0x3ad)]=_0x5c97d3(0x29f),_0xd1fd25[_0x5c97d3(0x298)]=_0x3d9ade,_0xd1fd25[_0x5c97d3(0x268)]=_0x56448e;}}}),PluginManager[_0x1ea107(0x28b)](pluginData[_0x1ea107(0x2d9)],_0x1ea107(0x2ed),_0x1bab98=>{const _0x2370d4=_0x1ea107;VisuMZ[_0x2370d4(0x205)](_0x1bab98,_0x1bab98);const _0x38630c=_0x1bab98['Actors'];for(const _0x4147a0 of _0x38630c){if(_0x2370d4(0x2b1)!==_0x2370d4(0x2b1))_0x8a044c[_0x2370d4(0x307)](_0x1df8de[_0x2370d4(0x303)](_0x5f16dd));else{const _0x29dea0=$gameActors[_0x2370d4(0x39b)](_0x4147a0);if(!_0x29dea0)continue;_0x29dea0['clearTurnOrderSTBGraphics']();}}}),PluginManager[_0x1ea107(0x28b)](pluginData[_0x1ea107(0x2d9)],_0x1ea107(0x29e),_0x1093fa=>{const _0x9cc1ef=_0x1ea107;VisuMZ[_0x9cc1ef(0x205)](_0x1093fa,_0x1093fa);const _0x18f7ef=_0x1093fa[_0x9cc1ef(0x1d1)],_0x2b0990=_0x1093fa[_0x9cc1ef(0x274)];for(const _0x30300d of _0x18f7ef){const _0x40df4d=$gameTroop['members']()[_0x30300d];if(!_0x40df4d)continue;_0x40df4d['_stbTurnOrderGraphicType']='icon',_0x40df4d[_0x9cc1ef(0x3a0)]=_0x2b0990;}}),PluginManager[_0x1ea107(0x28b)](pluginData[_0x1ea107(0x2d9)],'StbTurnOrderEnemyFace',_0x243d76=>{const _0x4d5b1a=_0x1ea107;VisuMZ['ConvertParams'](_0x243d76,_0x243d76);const _0x468899=_0x243d76[_0x4d5b1a(0x1d1)],_0xc0c015=_0x243d76['FaceName'],_0x576958=_0x243d76[_0x4d5b1a(0x26d)];for(const _0x49a09d of _0x468899){const _0x70c19b=$gameTroop[_0x4d5b1a(0x1cf)]()[_0x49a09d];if(!_0x70c19b)continue;_0x70c19b[_0x4d5b1a(0x3ad)]='face',_0x70c19b['_stbTurnOrderFaceName']=_0xc0c015,_0x70c19b[_0x4d5b1a(0x268)]=_0x576958;}}),PluginManager[_0x1ea107(0x28b)](pluginData[_0x1ea107(0x2d9)],'StbTurnOrderClearEnemyGraphic',_0x4a9f02=>{const _0x239cd5=_0x1ea107;VisuMZ[_0x239cd5(0x205)](_0x4a9f02,_0x4a9f02);const _0x2692e8=_0x4a9f02['Enemies'];for(const _0x74edbf of _0x2692e8){const _0x5dc2c5=$gameTroop['members']()[_0x74edbf];if(!_0x5dc2c5)continue;_0x5dc2c5[_0x239cd5(0x327)]();}}),PluginManager[_0x1ea107(0x28b)](pluginData[_0x1ea107(0x2d9)],_0x1ea107(0x36c),_0x105372=>{const _0x304a82=_0x1ea107;VisuMZ[_0x304a82(0x205)](_0x105372,_0x105372);const _0x5da5ce=_0x105372[_0x304a82(0x20a)];$gameSystem['setBattleSystemSTBTurnOrderVisible'](_0x5da5ce);}),VisuMZ[_0x1ea107(0x27f)][_0x1ea107(0x33b)]={'Instant':/<STB (?:INSTANT|INSTANT CAST|Instant Use)>/i,'CannotBeExploited':/<STB CANNOT BE EXPLOITED>/i,'CannotBeExploiter':/<STB CANNOT BE EXPLOITER>/i,'ExploitedStates':/<STB EXPLOITED GAIN (?:STATE|STATES):[ ](.*)>/i,'ExploiterStates':/<STB EXPLOITER GAIN (?:STATE|STATES):[ ](.*)>/i},DataManager[_0x1ea107(0x303)]=function(_0x401753){const _0x279706=_0x1ea107;_0x401753=_0x401753[_0x279706(0x38d)]()[_0x279706(0x2dc)](),this[_0x279706(0x220)]=this[_0x279706(0x220)]||{};if(this[_0x279706(0x220)][_0x401753])return this[_0x279706(0x220)][_0x401753];for(const _0xd43326 of $dataStates){if(!_0xd43326)continue;this[_0x279706(0x220)][_0xd43326['name'][_0x279706(0x38d)]()[_0x279706(0x2dc)]()]=_0xd43326['id'];}return this[_0x279706(0x220)][_0x401753]||0x0;},ImageManager[_0x1ea107(0x1f7)]=ImageManager['svActorHorzCells']||0x9,ImageManager['svActorVertCells']=ImageManager['svActorVertCells']||0x6,SceneManager[_0x1ea107(0x311)]=function(){const _0x12ef81=_0x1ea107;return this[_0x12ef81(0x260)]&&this['_scene'][_0x12ef81(0x387)]===Scene_Battle;},VisuMZ['BattleSystemSTB'][_0x1ea107(0x21a)]=BattleManager['battleSys'],BattleManager[_0x1ea107(0x201)]=function(){const _0x494b7=_0x1ea107;if(this[_0x494b7(0x323)]())return _0x494b7(0x287);return VisuMZ[_0x494b7(0x27f)][_0x494b7(0x21a)][_0x494b7(0x39e)](this);},BattleManager['isSTB']=function(){const _0x32b42c=_0x1ea107;return $gameSystem[_0x32b42c(0x30a)]()===_0x32b42c(0x287);},VisuMZ[_0x1ea107(0x27f)]['BattleManager_isTpb']=BattleManager[_0x1ea107(0x270)],BattleManager[_0x1ea107(0x270)]=function(){const _0x37d498=_0x1ea107;if(this[_0x37d498(0x323)]())return![];return VisuMZ[_0x37d498(0x27f)][_0x37d498(0x1ba)][_0x37d498(0x39e)](this);},VisuMZ[_0x1ea107(0x27f)]['BattleManager_isActiveTpb']=BattleManager[_0x1ea107(0x286)],BattleManager[_0x1ea107(0x286)]=function(){const _0xa3597f=_0x1ea107;if(this[_0xa3597f(0x323)]())return![];return VisuMZ[_0xa3597f(0x27f)][_0xa3597f(0x242)][_0xa3597f(0x39e)](this);},VisuMZ[_0x1ea107(0x27f)]['BattleManager_isTurnBased']=BattleManager[_0x1ea107(0x28f)],BattleManager[_0x1ea107(0x28f)]=function(){const _0xf4dee5=_0x1ea107;if(this[_0xf4dee5(0x323)]())return!![];return VisuMZ[_0xf4dee5(0x27f)][_0xf4dee5(0x38f)][_0xf4dee5(0x39e)](this);},VisuMZ[_0x1ea107(0x27f)]['BattleManager_startInput']=BattleManager[_0x1ea107(0x2c4)],BattleManager[_0x1ea107(0x2c4)]=function(){const _0x311514=_0x1ea107;VisuMZ[_0x311514(0x27f)][_0x311514(0x1e6)][_0x311514(0x39e)](this);if(this[_0x311514(0x323)]()&&$gameParty['canInput']()&&!this[_0x311514(0x2cd)])this[_0x311514(0x366)]();},BattleManager[_0x1ea107(0x366)]=function(){const _0x34115d=_0x1ea107;this[_0x34115d(0x346)]();},VisuMZ['BattleSystemSTB'][_0x1ea107(0x2cf)]=BattleManager[_0x1ea107(0x264)],BattleManager[_0x1ea107(0x264)]=function(){const _0x256dfe=_0x1ea107;this[_0x256dfe(0x323)]()?this[_0x256dfe(0x278)]():_0x256dfe(0x2d1)!=='GZwMl'?VisuMZ[_0x256dfe(0x27f)][_0x256dfe(0x2cf)]['call'](this):this[_0x256dfe(0x2a5)]();},BattleManager['processTurnSTB']=function(){const _0x48b0c0=_0x1ea107,_0x3ae5a4=this[_0x48b0c0(0x246)];if(_0x3ae5a4[_0x48b0c0(0x1e2)]()&&_0x3ae5a4[_0x48b0c0(0x34c)]()){const _0x5a2b48=_0x3ae5a4['currentAction']();if(!_0x5a2b48)VisuMZ[_0x48b0c0(0x27f)]['BattleManager_processTurn'][_0x48b0c0(0x39e)](this);else _0x5a2b48['_forceAction']?_0x48b0c0(0x296)!==_0x48b0c0(0x296)?this[_0x48b0c0(0x2f7)]():VisuMZ[_0x48b0c0(0x27f)]['BattleManager_processTurn'][_0x48b0c0(0x39e)](this):(this[_0x48b0c0(0x352)]=_0x3ae5a4,this[_0x48b0c0(0x398)]());}else VisuMZ[_0x48b0c0(0x27f)]['BattleManager_processTurn'][_0x48b0c0(0x39e)](this);},VisuMZ[_0x1ea107(0x27f)]['BattleManager_finishActorInput']=BattleManager[_0x1ea107(0x212)],BattleManager[_0x1ea107(0x212)]=function(){const _0x12037e=_0x1ea107;this[_0x12037e(0x323)]()?VisuMZ[_0x12037e(0x27f)]['BattleManager_processTurn'][_0x12037e(0x39e)](this):VisuMZ[_0x12037e(0x27f)][_0x12037e(0x229)]['call'](this);},VisuMZ['BattleSystemSTB']['BattleManager_selectNextActor']=BattleManager[_0x1ea107(0x32f)],BattleManager[_0x1ea107(0x32f)]=function(){const _0x80fc47=_0x1ea107;this[_0x80fc47(0x323)]()?this[_0x80fc47(0x2f5)]():VisuMZ['BattleSystemSTB'][_0x80fc47(0x2df)][_0x80fc47(0x39e)](this);},BattleManager[_0x1ea107(0x2f5)]=function(){const _0x1bc41e=_0x1ea107;this[_0x1bc41e(0x352)]=null,this[_0x1bc41e(0x2c8)]=![];},VisuMZ[_0x1ea107(0x27f)][_0x1ea107(0x336)]=BattleManager[_0x1ea107(0x215)],BattleManager[_0x1ea107(0x215)]=function(){const _0x3a66d3=_0x1ea107;VisuMZ[_0x3a66d3(0x27f)][_0x3a66d3(0x336)][_0x3a66d3(0x39e)](this),this[_0x3a66d3(0x200)]();},BattleManager['endActionSTB']=function(){const _0x13d2f3=_0x1ea107;if(!this[_0x13d2f3(0x323)]())return;this[_0x13d2f3(0x219)]();if(this['_forcedBattlers'][_0x13d2f3(0x36f)]>0x0){if(_0x13d2f3(0x208)===_0x13d2f3(0x1e1))return _0x27f7b3(_0x276c84['$1']);else{if(this[_0x13d2f3(0x246)]){if(_0x13d2f3(0x3af)!==_0x13d2f3(0x3af)){const _0x45eafb=this[_0x13d2f3(0x1fe)],_0x53ad25=this['bitmapWidth'](),_0x25ee22=this['bitmapHeight']();this[_0x13d2f3(0x211)][_0x13d2f3(0x373)]=new _0xb09080(_0x53ad25,_0x25ee22);const _0x434fbb=this[_0x13d2f3(0x211)][_0x13d2f3(0x373)],_0x25494a=_0x3541c4[_0x13d2f3(0x350)],_0x24c8c9=_0x27f87b['iconHeight'],_0x29bf1e=_0x15eacc[_0x13d2f3(0x23c)](_0x25494a,_0x24c8c9,_0x53ad25,_0x25ee22),_0x383a7e=_0x45eafb%0x10*_0x25494a,_0x27f42d=_0x1d8d95[_0x13d2f3(0x265)](_0x45eafb/0x10)*_0x24c8c9,_0x581d5e=_0x4daef2[_0x13d2f3(0x265)](_0xb35c45['max'](_0x53ad25-_0x29bf1e,0x0)/0x2),_0x46ac86=_0x657f4a[_0x13d2f3(0x265)](_0x28e6ee[_0x13d2f3(0x249)](_0x25ee22-_0x29bf1e,0x0)/0x2);_0x434fbb['blt'](_0x4a4265,_0x383a7e,_0x27f42d,_0x25494a,_0x24c8c9,_0x581d5e,_0x46ac86,_0x29bf1e,_0x29bf1e);}else{if(!this[_0x13d2f3(0x341)]['includes'](this[_0x13d2f3(0x246)])){if('AMfos'!==_0x13d2f3(0x288)){if(!this['_letterSprite'])return;const _0x4ebd01=this[_0x13d2f3(0x1e4)]();if(!_0x4ebd01)return;if(this[_0x13d2f3(0x35f)]===_0x4ebd01['_letter']&&this[_0x13d2f3(0x2de)]===_0x4ebd01['_plural'])return;this[_0x13d2f3(0x35f)]=_0x4ebd01[_0x13d2f3(0x35f)],this['_plural']=_0x4ebd01['_plural'];const _0x3d2f4a=_0x3e498a[_0x13d2f3(0x29a)],_0x287df8=this[_0x13d2f3(0x2d8)](),_0x3ecc4e=this[_0x13d2f3(0x391)](),_0x375777=this[_0x13d2f3(0x294)](),_0x5bfbcb=this[_0x13d2f3(0x295)][_0x13d2f3(0x373)];_0x5bfbcb['clear']();if(!this[_0x13d2f3(0x2de)])return;_0x5bfbcb['fontFace']=_0x3d2f4a['EnemyBattlerFontFace']||_0x576858['mainFontFace'](),_0x5bfbcb[_0x13d2f3(0x29c)]=_0x3d2f4a[_0x13d2f3(0x348)]||0x10,_0x287df8?_0x5bfbcb[_0x13d2f3(0x23b)](this[_0x13d2f3(0x35f)][_0x13d2f3(0x2dc)](),0x0,_0x375777/0x2,_0x3ecc4e,_0x375777/0x2,'center'):_0x5bfbcb[_0x13d2f3(0x23b)](this[_0x13d2f3(0x35f)][_0x13d2f3(0x2dc)](),0x0,0x2,_0x3ecc4e-0x8,_0x375777-0x4,_0x13d2f3(0x2ba));}else this[_0x13d2f3(0x341)][_0x13d2f3(0x318)](this[_0x13d2f3(0x246)]);}}}this[_0x13d2f3(0x246)]=this[_0x13d2f3(0x2c1)]();}};},BattleManager['isSTBExploitSystemEnabled']=function(){const _0x3734ef=_0x1ea107;return VisuMZ[_0x3734ef(0x27f)][_0x3734ef(0x29a)]['Exploit'][_0x3734ef(0x2c7)];},BattleManager['areAllActorsExploited']=function(){const _0x57159e=_0x1ea107,_0x2fd3c1=$gameParty[_0x57159e(0x279)]()[_0x57159e(0x293)](_0x2d68dd=>_0x2d68dd[_0x57159e(0x379)]()),_0x4c6772=_0x2fd3c1[_0x57159e(0x293)](_0x373e13=>_0x373e13['isSTBExploited']());return _0x2fd3c1[_0x57159e(0x36f)]===_0x4c6772['length'];},BattleManager['areAllEnemiesExploited']=function(){const _0x2350b9=_0x1ea107,_0x221642=$gameTroop[_0x2350b9(0x279)]()[_0x2350b9(0x293)](_0x3c2d3a=>_0x3c2d3a[_0x2350b9(0x379)]()),_0xf852a7=_0x221642[_0x2350b9(0x293)](_0x3880d0=>_0x3880d0['isSTBExploited']());return _0x221642['length']===_0xf852a7[_0x2350b9(0x36f)];},VisuMZ['BattleSystemSTB'][_0x1ea107(0x250)]=BattleManager['makeActionOrders'],BattleManager[_0x1ea107(0x2e6)]=function(){const _0x1a3c4d=_0x1ea107;VisuMZ[_0x1a3c4d(0x27f)][_0x1a3c4d(0x250)][_0x1a3c4d(0x39e)](this),this['isSTB']()&&(this[_0x1a3c4d(0x219)](),this[_0x1a3c4d(0x237)](),this[_0x1a3c4d(0x204)]());},BattleManager[_0x1ea107(0x219)]=function(){const _0x261c3b=_0x1ea107;if(!this[_0x261c3b(0x323)]())return;this[_0x261c3b(0x341)]=this[_0x261c3b(0x341)]||[],this['_actionBattlers']=this[_0x261c3b(0x341)][_0x261c3b(0x293)](_0x5b10ec=>_0x5b10ec&&_0x5b10ec[_0x261c3b(0x379)]()&&_0x5b10ec[_0x261c3b(0x230)]()),this[_0x261c3b(0x237)]();},BattleManager[_0x1ea107(0x237)]=function(_0x4e8a1a){const _0xbfe5c3=_0x1ea107;if(!this[_0xbfe5c3(0x323)]())return;const _0x3218a9=SceneManager[_0xbfe5c3(0x260)][_0xbfe5c3(0x2c9)];if(!_0x3218a9)return;_0x3218a9[_0xbfe5c3(0x248)](_0x4e8a1a);},BattleManager[_0x1ea107(0x204)]=function(){const _0x49ce73=_0x1ea107;for(const _0x226f9d of this[_0x49ce73(0x337)]()){if(_0x49ce73(0x2bf)!==_0x49ce73(0x3a6)){if(!_0x226f9d)continue;_0x226f9d['setSTBNextTurnSpeed'](0x0);}else this['initialize'](...arguments);}},VisuMZ[_0x1ea107(0x27f)][_0x1ea107(0x2d7)]=Game_System['prototype'][_0x1ea107(0x20b)],Game_System[_0x1ea107(0x33a)]['initialize']=function(){const _0x399cb2=_0x1ea107;VisuMZ[_0x399cb2(0x27f)][_0x399cb2(0x2d7)][_0x399cb2(0x39e)](this),this[_0x399cb2(0x22a)]();},Game_System[_0x1ea107(0x33a)][_0x1ea107(0x22a)]=function(){const _0x5f0d37=_0x1ea107;this[_0x5f0d37(0x31a)]=!![];},Game_System['prototype']['isBattleSystemSTBTurnOrderVisible']=function(){const _0x44d4c5=_0x1ea107;return this[_0x44d4c5(0x31a)]===undefined&&this[_0x44d4c5(0x22a)](),this[_0x44d4c5(0x31a)];},Game_System[_0x1ea107(0x33a)]['setBattleSystemSTBTurnOrderVisible']=function(_0x1f6a78){const _0x621097=_0x1ea107;if(this[_0x621097(0x31a)]===undefined){if('mhFgt'!=='nDxsr')this['initBattleSystemSTB']();else return this['_stbTurnOrderVisible']===_0x2325b3&&this[_0x621097(0x22a)](),this['_stbTurnOrderVisible'];}this[_0x621097(0x31a)]=_0x1f6a78;},VisuMZ[_0x1ea107(0x27f)][_0x1ea107(0x27c)]=Game_Action[_0x1ea107(0x33a)][_0x1ea107(0x27d)],Game_Action[_0x1ea107(0x33a)][_0x1ea107(0x27d)]=function(){const _0x8d3ea1=_0x1ea107;return BattleManager[_0x8d3ea1(0x323)]()?0x0:VisuMZ['BattleSystemSTB']['Game_Action_speed']['call'](this);},VisuMZ[_0x1ea107(0x27f)]['Game_Action_applyGlobal']=Game_Action['prototype'][_0x1ea107(0x37b)],Game_Action[_0x1ea107(0x33a)]['applyGlobal']=function(){const _0x3c5369=_0x1ea107;VisuMZ['BattleSystemSTB'][_0x3c5369(0x32b)][_0x3c5369(0x39e)](this),this[_0x3c5369(0x1e7)]();},Game_Action[_0x1ea107(0x33a)][_0x1ea107(0x1e7)]=function(){const _0xeda3c=_0x1ea107;if(!SceneManager[_0xeda3c(0x311)]())return;if(!BattleManager[_0xeda3c(0x323)]())return;const _0xa9d521=this[_0xeda3c(0x1dd)](),_0x43c111=VisuMZ[_0xeda3c(0x27f)][_0xeda3c(0x33b)],_0x5d2316=VisuMZ['BattleSystemSTB'][_0xeda3c(0x29a)]['Speed'];_0xa9d521&&_0xa9d521[_0xeda3c(0x25b)]['match'](_0x43c111[_0xeda3c(0x29b)])&&this[_0xeda3c(0x369)]()['stbGainInstant'](0x1);const _0x46974e=_0x5d2316[_0xeda3c(0x33d)][_0xeda3c(0x39e)](this);this['subject']()[_0xeda3c(0x25e)](_0x46974e);},VisuMZ['BattleSystemSTB']['Game_Action_clear']=Game_Action[_0x1ea107(0x33a)][_0x1ea107(0x27a)],Game_Action[_0x1ea107(0x33a)][_0x1ea107(0x27a)]=function(){const _0x4596bc=_0x1ea107;VisuMZ[_0x4596bc(0x27f)]['Game_Action_clear'][_0x4596bc(0x39e)](this),this[_0x4596bc(0x2f3)]();},Game_Action[_0x1ea107(0x33a)]['clearSTB']=function(){this['_stbExploitAdvantageFlag']=![];},Game_Action[_0x1ea107(0x33a)][_0x1ea107(0x253)]=function(){return this['_stbExploitAdvantageFlag']===undefined&&this['clearSTB'](),this['_stbExploitAdvantageFlag'];},Game_Action[_0x1ea107(0x33a)][_0x1ea107(0x2c3)]=function(_0x463492){const _0x40c3d6=_0x1ea107;this[_0x40c3d6(0x1c4)]===undefined&&(_0x40c3d6(0x368)==='WYCxO'?(this[_0x40c3d6(0x369)]()[_0x40c3d6(0x2ab)](_0x43669a,this),_0x1b7e58[_0x40c3d6(0x2f9)](this[_0x40c3d6(0x369)](),this)):this[_0x40c3d6(0x2f3)]()),this['_stbExploitAdvantageFlag']=_0x463492;},VisuMZ['BattleSystemSTB']['Game_Action_executeDamage']=Game_Action[_0x1ea107(0x33a)]['executeDamage'],Game_Action[_0x1ea107(0x33a)]['executeDamage']=function(_0x63cc0b,_0x34a25a){const _0x39a990=_0x1ea107;VisuMZ[_0x39a990(0x27f)]['Game_Action_executeDamage'][_0x39a990(0x39e)](this,_0x63cc0b,_0x34a25a),this[_0x39a990(0x32a)](_0x63cc0b);},Game_Action[_0x1ea107(0x33a)][_0x1ea107(0x32a)]=function(_0x310d4e){const _0x1c8470=_0x1ea107;if(!SceneManager[_0x1c8470(0x311)]())return;if(!BattleManager[_0x1c8470(0x323)]())return;if(!BattleManager[_0x1c8470(0x34b)]())return;if(_0x310d4e['friendsUnit']()===this[_0x1c8470(0x369)]()[_0x1c8470(0x302)]())return;const _0x4672df=VisuMZ[_0x1c8470(0x27f)][_0x1c8470(0x29a)][_0x1c8470(0x30f)],_0x4d172f=_0x310d4e['result']();if(!_0x4672df[_0x1c8470(0x2ce)]&&this[_0x1c8470(0x2e3)])return;_0x4672df[_0x1c8470(0x231)]&&_0x4d172f[_0x1c8470(0x1d6)]&&(this[_0x1c8470(0x369)]()['performSTBExploiter'](_0x310d4e,this),_0x310d4e[_0x1c8470(0x2f9)](this[_0x1c8470(0x369)](),this));if(_0x4672df[_0x1c8470(0x2ae)]){if('FrsFm'!==_0x1c8470(0x384))return _0x5476ca[_0x1c8470(0x396)]()-_0x3411ff['containerPosition']();else{const _0x2f6d2d=this['calcElementRate'](_0x310d4e);_0x2f6d2d>=_0x4672df['ExploitEleRate']&&(_0x1c8470(0x3a4)!=='JTIMX'?(_0x28eacf[_0x1c8470(0x33a)][_0x1c8470(0x22f)][_0x1c8470(0x39e)](this),this['updateHomePosition'](),this[_0x1c8470(0x2f4)](),this['updateSidePosition'](),this[_0x1c8470(0x247)](),this[_0x1c8470(0x30b)]()):(this[_0x1c8470(0x369)]()[_0x1c8470(0x2ab)](_0x310d4e,this),_0x310d4e[_0x1c8470(0x2f9)](this[_0x1c8470(0x369)](),this)));}}},VisuMZ[_0x1ea107(0x27f)][_0x1ea107(0x297)]=Game_BattlerBase[_0x1ea107(0x33a)]['initMembers'],Game_BattlerBase[_0x1ea107(0x33a)][_0x1ea107(0x395)]=function(){const _0x51a450=_0x1ea107;VisuMZ[_0x51a450(0x27f)]['Game_BattlerBase_initMembers'][_0x51a450(0x39e)](this),this[_0x51a450(0x2f7)]();},Game_BattlerBase['prototype'][_0x1ea107(0x2f7)]=function(){const _0x336836=_0x1ea107;this[_0x336836(0x1ce)](),this[_0x336836(0x2a5)]();},Game_BattlerBase[_0x1ea107(0x33a)]['clearSTBNextTurnSpeed']=function(){this['_stbNextTurnSpeed']=0x0;},Game_BattlerBase['prototype']['getSTBNextTurnSpeed']=function(){const _0x2b8e1a=_0x1ea107;return this['_stbNextTurnSpeed']===undefined&&this[_0x2b8e1a(0x2f7)](),this[_0x2b8e1a(0x1cc)];},Game_BattlerBase[_0x1ea107(0x33a)][_0x1ea107(0x221)]=function(_0x18c8bf){const _0x47d9de=_0x1ea107;this['_stbNextTurnSpeed']===undefined&&this[_0x47d9de(0x2f7)](),this[_0x47d9de(0x1cc)]=_0x18c8bf;},Game_BattlerBase[_0x1ea107(0x33a)][_0x1ea107(0x25e)]=function(_0x2594a2){const _0x3f3a0a=_0x1ea107;this['_stbNextTurnSpeed']===undefined&&this[_0x3f3a0a(0x2f7)](),_0x2594a2+=this['getSTBNextTurnSpeed'](),this[_0x3f3a0a(0x221)](_0x2594a2);},Game_BattlerBase[_0x1ea107(0x33a)][_0x1ea107(0x2a5)]=function(){const _0x4f6110=_0x1ea107;this[_0x4f6110(0x1f4)]=![];},Game_BattlerBase[_0x1ea107(0x33a)][_0x1ea107(0x2e9)]=function(){const _0x5ce43f=_0x1ea107;return this[_0x5ce43f(0x1f4)]===undefined&&(_0x5ce43f(0x367)!=='MeAEW'?_0x675649='face':this[_0x5ce43f(0x2f7)]()),this[_0x5ce43f(0x1f4)];},Game_BattlerBase[_0x1ea107(0x33a)][_0x1ea107(0x243)]=function(_0x4f7712){const _0x1dea76=_0x1ea107;this[_0x1dea76(0x1f4)]===undefined&&(_0x1dea76(0x30e)===_0x1dea76(0x1d4)?this['_stbTurnOrderFaceName']=this[_0x1dea76(0x324)]():this['initMembersBattleSystemSTB']()),this[_0x1dea76(0x1f4)]=_0x4f7712;},Game_BattlerBase[_0x1ea107(0x33a)]['stbCannotBeExploited']=function(){const _0xb21352=_0x1ea107,_0x29f3ca=VisuMZ[_0xb21352(0x27f)][_0xb21352(0x33b)][_0xb21352(0x20d)];return this[_0xb21352(0x1cd)]()[_0xb21352(0x300)](_0x401612=>_0x401612[_0xb21352(0x25b)][_0xb21352(0x378)](_0x29f3ca));},Game_BattlerBase[_0x1ea107(0x33a)][_0x1ea107(0x1bf)]=function(){const _0x5204e7=_0x1ea107,_0x17a127=VisuMZ[_0x5204e7(0x27f)]['RegExp'][_0x5204e7(0x245)];return this[_0x5204e7(0x1cd)]()[_0x5204e7(0x300)](_0x18ed36=>_0x18ed36[_0x5204e7(0x25b)][_0x5204e7(0x378)](_0x17a127));},Game_BattlerBase[_0x1ea107(0x33a)][_0x1ea107(0x327)]=function(){const _0x202f53=_0x1ea107;delete this[_0x202f53(0x3ad)],delete this[_0x202f53(0x298)],delete this['_stbTurnOrderFaceIndex'],delete this['_stbTurnOrderIconIndex'];},Game_BattlerBase['prototype'][_0x1ea107(0x2f0)]=function(){const _0x23ff20=_0x1ea107;return this[_0x23ff20(0x3ad)]===undefined&&(this[_0x23ff20(0x3ad)]=this[_0x23ff20(0x26c)]()),this[_0x23ff20(0x3ad)];},Game_BattlerBase[_0x1ea107(0x33a)][_0x1ea107(0x26c)]=function(){return Window_STB_TurnOrder['Settings']['EnemyBattlerType'];},Game_BattlerBase[_0x1ea107(0x33a)][_0x1ea107(0x381)]=function(){const _0x37be96=_0x1ea107;return this[_0x37be96(0x298)]===undefined&&(this[_0x37be96(0x298)]=this[_0x37be96(0x324)]()),this[_0x37be96(0x298)];},Game_BattlerBase[_0x1ea107(0x33a)][_0x1ea107(0x324)]=function(){const _0x56fccf=_0x1ea107;return Window_STB_TurnOrder['Settings'][_0x56fccf(0x1bb)];},Game_BattlerBase['prototype'][_0x1ea107(0x1c3)]=function(){const _0x379f1c=_0x1ea107;if(this[_0x379f1c(0x268)]===undefined){if(_0x379f1c(0x2d4)===_0x379f1c(0x2d4))this[_0x379f1c(0x268)]=this[_0x379f1c(0x2d5)]();else{const _0x25b3e8=this[_0x379f1c(0x39b)]()['note'];if(_0x25b3e8[_0x379f1c(0x378)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return _0x43d26f(_0x4833bf['$1']);return _0x334e36[_0x379f1c(0x29a)][_0x379f1c(0x28e)];}}return this[_0x379f1c(0x268)];},Game_BattlerBase['prototype'][_0x1ea107(0x2d5)]=function(){const _0x6978be=_0x1ea107;return Window_STB_TurnOrder[_0x6978be(0x29a)][_0x6978be(0x392)];},Game_BattlerBase['prototype']['TurnOrderSTBGraphicIconIndex']=function(){const _0x231f1c=_0x1ea107;return this['_stbTurnOrderIconIndex']===undefined&&(_0x231f1c(0x21d)===_0x231f1c(0x240)?delete _0x332303['_handlers'][_0x231f1c(0x1f6)]:this[_0x231f1c(0x3a0)]=this['createTurnOrderSTBGraphicIconIndex']()),this[_0x231f1c(0x3a0)];},Game_BattlerBase[_0x1ea107(0x33a)][_0x1ea107(0x254)]=function(){const _0x292688=_0x1ea107;return Window_STB_TurnOrder[_0x292688(0x29a)][_0x292688(0x28a)];},Game_BattlerBase[_0x1ea107(0x33a)][_0x1ea107(0x236)]=function(_0x1c8dd7){this['_stbTurnOrderIconIndex']=_0x1c8dd7;},VisuMZ[_0x1ea107(0x27f)][_0x1ea107(0x2d2)]=Game_BattlerBase[_0x1ea107(0x33a)]['hide'],Game_BattlerBase[_0x1ea107(0x33a)][_0x1ea107(0x322)]=function(){const _0x51493d=_0x1ea107;VisuMZ[_0x51493d(0x27f)][_0x51493d(0x2d2)][_0x51493d(0x39e)](this),BattleManager[_0x51493d(0x219)]();},VisuMZ[_0x1ea107(0x27f)]['Game_BattlerBase_appear']=Game_BattlerBase[_0x1ea107(0x33a)]['appear'],Game_BattlerBase['prototype']['appear']=function(){const _0x344b90=_0x1ea107;VisuMZ[_0x344b90(0x27f)]['Game_BattlerBase_appear'][_0x344b90(0x39e)](this),BattleManager['removeActionBattlersSTB']();},VisuMZ['BattleSystemSTB'][_0x1ea107(0x1fc)]=Game_Battler['prototype'][_0x1ea107(0x2a2)],Game_Battler['prototype'][_0x1ea107(0x2a2)]=function(){const _0x55b048=_0x1ea107;VisuMZ[_0x55b048(0x27f)][_0x55b048(0x1fc)][_0x55b048(0x39e)](this),BattleManager[_0x55b048(0x219)]();},VisuMZ[_0x1ea107(0x27f)][_0x1ea107(0x389)]=Game_Battler[_0x1ea107(0x33a)]['onBattleStart'],Game_Battler[_0x1ea107(0x33a)][_0x1ea107(0x228)]=function(_0x4d32cb){const _0x5a6b3a=_0x1ea107;VisuMZ[_0x5a6b3a(0x27f)][_0x5a6b3a(0x389)][_0x5a6b3a(0x39e)](this,_0x4d32cb),this['onBattleStartSTB'](_0x4d32cb);},Game_Battler[_0x1ea107(0x33a)][_0x1ea107(0x3ae)]=function(_0x34065c){const _0x37a497=_0x1ea107;if(!BattleManager['isSTB']())return;this[_0x37a497(0x2a5)]();const _0x3862cd=new Game_Action(this);this[_0x37a497(0x221)](0x0);},VisuMZ['BattleSystemSTB'][_0x1ea107(0x1ff)]=Game_Battler['prototype']['onTurnEnd'],Game_Battler[_0x1ea107(0x33a)][_0x1ea107(0x3a9)]=function(){const _0x2f2a04=_0x1ea107;VisuMZ['BattleSystemSTB'][_0x2f2a04(0x1ff)][_0x2f2a04(0x39e)](this);if(BattleManager[_0x2f2a04(0x323)]()&&VisuMZ[_0x2f2a04(0x27f)][_0x2f2a04(0x29a)]['Exploit'][_0x2f2a04(0x310)]){if(_0x2f2a04(0x292)!==_0x2f2a04(0x292)){const _0x3b1080=this[_0x2f2a04(0x39b)]()[_0x2f2a04(0x25b)];if(_0x3b1080[_0x2f2a04(0x378)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x2f2a04(0x29f);else{if(_0x3b1080[_0x2f2a04(0x378)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return _0x473d87[_0x2f2a04(0x29a)][_0x2f2a04(0x25d)];}else this[_0x2f2a04(0x2a5)]();}},VisuMZ['BattleSystemSTB']['Game_Battler_performActionEnd']=Game_Battler[_0x1ea107(0x33a)][_0x1ea107(0x37c)],Game_Battler[_0x1ea107(0x33a)][_0x1ea107(0x37c)]=function(){const _0xde9acd=_0x1ea107;VisuMZ[_0xde9acd(0x27f)][_0xde9acd(0x2a1)][_0xde9acd(0x39e)](this),BattleManager[_0xde9acd(0x323)]()&&this[_0xde9acd(0x2e5)]();},Game_Battler[_0x1ea107(0x33a)]['performActionEndSTB']=function(){const _0x17c3ec=_0x1ea107;if(this[_0x17c3ec(0x353)]()>0x0&&this===BattleManager[_0x17c3ec(0x246)]){const _0x3fe8d2=BattleManager[_0x17c3ec(0x271)];if(_0x3fe8d2[_0x17c3ec(0x36f)]>0x0&&_0x3fe8d2[0x0]!==this)return;const _0x4b3319=this['battler']();if(_0x4b3319)_0x4b3319[_0x17c3ec(0x347)]();}},Game_Battler[_0x1ea107(0x33a)][_0x1ea107(0x285)]=function(){const _0x515f28=_0x1ea107;return VisuMZ[_0x515f28(0x258)][_0x515f28(0x29a)][_0x515f28(0x2ac)][_0x515f28(0x1bd)];},VisuMZ[_0x1ea107(0x27f)][_0x1ea107(0x3a2)]=Game_Battler[_0x1ea107(0x33a)]['makeSpeed'],Game_Battler[_0x1ea107(0x33a)][_0x1ea107(0x238)]=function(){const _0xcf6313=_0x1ea107;BattleManager[_0xcf6313(0x323)]()?this[_0xcf6313(0x306)]():VisuMZ['BattleSystemSTB'][_0xcf6313(0x3a2)][_0xcf6313(0x39e)](this);},Game_Battler[_0x1ea107(0x33a)]['makeSTBSpeed']=function(){const _0x1429fe=_0x1ea107;this[_0x1429fe(0x3a1)]=VisuMZ[_0x1429fe(0x27f)]['Settings'][_0x1429fe(0x216)][_0x1429fe(0x313)][_0x1429fe(0x39e)](this);},Game_Battler[_0x1ea107(0x33a)]['stbExploitedStates']=function(){const _0x30dc8a=_0x1ea107,_0x267fdf=this[_0x30dc8a(0x1e2)]()?this[_0x30dc8a(0x2b4)]()[_0x30dc8a(0x25b)]:this[_0x30dc8a(0x20e)]()['note'];if(_0x267fdf[_0x30dc8a(0x378)](VisuMZ['BattleSystemSTB'][_0x30dc8a(0x33b)][_0x30dc8a(0x251)]))return VisuMZ[_0x30dc8a(0x27f)]['ParseStateData'](RegExp['$1']);return VisuMZ['BattleSystemSTB'][_0x30dc8a(0x29a)][_0x30dc8a(0x3b4)][_0x30dc8a(0x2e7)]||[];},Game_Battler[_0x1ea107(0x33a)]['stbExploiterStates']=function(){const _0x154852=_0x1ea107,_0xb101bc=this['isActor']()?this[_0x154852(0x2b4)]()['note']:this[_0x154852(0x20e)]()[_0x154852(0x25b)];if(_0xb101bc[_0x154852(0x378)](VisuMZ['BattleSystemSTB'][_0x154852(0x33b)][_0x154852(0x304)]))return VisuMZ[_0x154852(0x27f)]['ParseStateData'](RegExp['$1']);return VisuMZ[_0x154852(0x27f)]['Settings']['Exploiter'][_0x154852(0x2e7)]||[];},VisuMZ[_0x1ea107(0x27f)][_0x1ea107(0x342)]=function(_0x49dd93){const _0x2c5c90=_0x1ea107,_0x38e5dc=_0x49dd93['split'](','),_0x4cbf3a=[];for(let _0x1f492b of _0x38e5dc){if(_0x2c5c90(0x3a3)===_0x2c5c90(0x3a3)){_0x1f492b=(String(_0x1f492b)||'')[_0x2c5c90(0x2dc)]();const _0x29a34=/^\d+$/['test'](_0x1f492b);if(_0x29a34){if(_0x2c5c90(0x394)!==_0x2c5c90(0x394)){const _0x242e87=this[_0x2c5c90(0x20e)]()[_0x2c5c90(0x25b)];if(_0x242e87[_0x2c5c90(0x378)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x3d0679(_0x1a77fb['$2']);return _0x1caa3d[_0x2c5c90(0x29a)][_0x2c5c90(0x392)];}else _0x4cbf3a['push'](Number(_0x1f492b));}else _0x2c5c90(0x2b0)!=='DLKiN'?_0x4cbf3a['push'](DataManager[_0x2c5c90(0x303)](_0x1f492b)):(this[_0x2c5c90(0x246)]&&(!this[_0x2c5c90(0x341)][_0x2c5c90(0x37e)](this[_0x2c5c90(0x246)])&&this[_0x2c5c90(0x341)][_0x2c5c90(0x318)](this['_subject'])),this[_0x2c5c90(0x246)]=this[_0x2c5c90(0x2c1)]());}else return _0x51142c['BattleCore'][_0x2c5c90(0x29a)][_0x2c5c90(0x2ac)]['AllowRandomSpeed'];}return _0x4cbf3a;},Game_Battler['prototype']['becomeSTBExploited']=function(_0x41bc4c,_0x58dc76){const _0x4d14b3=_0x1ea107;if(!BattleManager[_0x4d14b3(0x323)]())return;if(!BattleManager[_0x4d14b3(0x34b)]())return;if(this[_0x4d14b3(0x2e9)]())return;const _0x5cd2d7=VisuMZ[_0x4d14b3(0x27f)]['Settings'][_0x4d14b3(0x3b4)];!_0x5cd2d7['UnlimitedExploits']&&this[_0x4d14b3(0x243)](!![]);if(this[_0x4d14b3(0x35a)]())return;if(this['hp']<=0x0)return;this[_0x4d14b3(0x202)](_0x5cd2d7);if(this['hp']>0x0||!this[_0x4d14b3(0x39d)]())for(const _0x5f3402 of this['stbExploitedStates']()){if(!$dataStates[_0x5f3402])continue;this['addState'](_0x5f3402);}if(_0x5cd2d7[_0x4d14b3(0x39c)]){if(_0x4d14b3(0x2ee)===_0x4d14b3(0x334)){const _0x2e31d0=this[_0x4d14b3(0x283)];this['opacity']=(this[_0x4d14b3(0x3b2)]*(_0x2e31d0-0x1)+this['_fadeTarget'])/_0x2e31d0,this[_0x4d14b3(0x283)]--,this['_fadeDuration']<=0x0&&(this[_0x4d14b3(0x2ea)](),this[_0x4d14b3(0x374)]=0x0,this['updatePosition'](),this['opacity']=this[_0x4d14b3(0x305)]);}else _0x5cd2d7['CustomJS'][_0x4d14b3(0x39e)](this,_0x41bc4c,_0x58dc76);}if(this['isActor']()&&BattleManager[_0x4d14b3(0x1c8)]()){const _0x19825d=_0x5cd2d7[_0x4d14b3(0x343)];_0x19825d>0x0&&$dataCommonEvents[_0x19825d]&&(_0x4d14b3(0x3a8)!==_0x4d14b3(0x206)?$gameTemp[_0x4d14b3(0x3a5)](_0x19825d):(_0x2d216a['BattleSystemSTB'][_0x4d14b3(0x32b)]['call'](this),this[_0x4d14b3(0x1e7)]()));}else{if(this['isEnemy']()&&BattleManager['areAllEnemiesExploited']()){const _0x17c4d5=_0x5cd2d7[_0x4d14b3(0x209)];_0x17c4d5>0x0&&$dataCommonEvents[_0x17c4d5]&&$gameTemp['reserveCommonEvent'](_0x17c4d5);}}},Game_Battler[_0x1ea107(0x33a)][_0x1ea107(0x2ab)]=function(_0x435c6c,_0x56e42f){const _0x3626de=_0x1ea107;if(!BattleManager[_0x3626de(0x323)]())return;if(!BattleManager['isSTBExploitSystemEnabled']())return;if(_0x56e42f['hasSTBExploited']())return;if(_0x435c6c[_0x3626de(0x2e9)]())return;const _0x348070=VisuMZ[_0x3626de(0x27f)][_0x3626de(0x29a)][_0x3626de(0x34e)];!_0x348070[_0x3626de(0x320)]&&_0x56e42f[_0x3626de(0x2c3)](!![]);if(this[_0x3626de(0x1bf)]())return;this[_0x3626de(0x202)](_0x348070);_0x348070['ExtraActions']>0x0&&(_0x3626de(0x301)!==_0x3626de(0x301)?_0x187340[_0x3626de(0x27f)][_0x3626de(0x1d7)][_0x3626de(0x39e)](this,_0x2b77fb):this[_0x3626de(0x2da)](_0x348070[_0x3626de(0x32d)]));for(const _0x6e9dcb of this[_0x3626de(0x321)]()){if('DUjGg'!==_0x3626de(0x35c)){if(!$dataStates[_0x6e9dcb])continue;this[_0x3626de(0x39a)](_0x6e9dcb);}else{if(!_0x38d237[_0x3626de(0x29a)]['ShowMarkerBorder'])return;const _0x35e88d=_0x1b562a['Settings'],_0xf3b9f6=this['_unit']===_0x2fbc70?_0x3626de(0x2db):_0x3626de(0x289),_0xdeba03=_0x3626de(0x267)[_0x3626de(0x277)](_0xf3b9f6),_0x2cbcda=new _0x2c0e35();_0x2cbcda[_0x3626de(0x262)]['x']=this['anchor']['x'],_0x2cbcda[_0x3626de(0x262)]['y']=this[_0x3626de(0x262)]['y'];if(_0x35e88d[_0xdeba03])_0x2cbcda[_0x3626de(0x373)]=_0xd3fb66[_0x3626de(0x312)](_0x35e88d[_0xdeba03]);else{let _0x114d1b=this['bitmapWidth'](),_0x2710ec=this[_0x3626de(0x294)](),_0xcf2409=_0x35e88d[_0x3626de(0x21b)];_0x2cbcda[_0x3626de(0x373)]=new _0xeac6d3(_0x114d1b,_0x2710ec);const _0x43bc6a='#000000',_0xd51938=_0x2c5cd2['getColor'](_0x35e88d['%1BorderColor'[_0x3626de(0x277)](_0xf3b9f6)]);_0x2cbcda[_0x3626de(0x373)][_0x3626de(0x23f)](0x0,0x0,_0x114d1b,_0x2710ec,_0x43bc6a),_0x114d1b-=0x2,_0x2710ec-=0x2,_0x2cbcda['bitmap'][_0x3626de(0x23f)](0x1,0x1,_0x114d1b,_0x2710ec,_0xd51938),_0x114d1b-=_0xcf2409*0x2,_0x2710ec-=_0xcf2409*0x2,_0x2cbcda[_0x3626de(0x373)]['fillRect'](0x1+_0xcf2409,0x1+_0xcf2409,_0x114d1b,_0x2710ec,_0x43bc6a),_0x114d1b-=0x2,_0x2710ec-=0x2,_0xcf2409+=0x1,_0x2cbcda[_0x3626de(0x373)][_0x3626de(0x2b9)](0x1+_0xcf2409,0x1+_0xcf2409,_0x114d1b,_0x2710ec);}this[_0x3626de(0x3b5)]=_0x2cbcda,this[_0x3626de(0x1c6)](this[_0x3626de(0x3b5)]);}}_0x348070[_0x3626de(0x39c)]&&_0x348070[_0x3626de(0x39c)][_0x3626de(0x39e)](this,_0x435c6c,_0x56e42f);},Game_Battler['prototype']['displayExploitedEffects']=function(_0x2c1fc9){const _0x15b1e7=_0x1ea107;if(!_0x2c1fc9)return;if(_0x2c1fc9[_0x15b1e7(0x34f)]){const _0x3b1335=_0x2c1fc9[_0x15b1e7(0x34f)],_0x32bc87=_0x2c1fc9[_0x15b1e7(0x2b7)],_0x285f63=_0x2c1fc9[_0x15b1e7(0x290)];$gameTemp[_0x15b1e7(0x358)]([this],_0x3b1335,_0x32bc87,_0x285f63);}if(this[_0x15b1e7(0x1e4)]()&&_0x2c1fc9[_0x15b1e7(0x399)][_0x15b1e7(0x36f)]>0x0){const _0x58b934=_0x2c1fc9[_0x15b1e7(0x399)],_0x560f4b={'textColor':ColorManager[_0x15b1e7(0x36e)](_0x2c1fc9['TextColor']),'flashColor':_0x2c1fc9['FlashColor'],'flashDuration':_0x2c1fc9[_0x15b1e7(0x24d)]};this[_0x15b1e7(0x24f)](_0x58b934,_0x560f4b);}},Game_Battler[_0x1ea107(0x33a)]['stbGainInstant']=function(_0x4b8d3e){const _0x2b0c56=_0x1ea107;this[_0x2b0c56(0x364)]=this[_0x2b0c56(0x364)]||[];const _0x1d6762=this[_0x2b0c56(0x364)]['length']<=0x0;if(this[_0x2b0c56(0x332)]()){for(let _0x4f39ce=0x0;_0x4f39ce<_0x4b8d3e;_0x4f39ce++){this[_0x2b0c56(0x364)][_0x2b0c56(0x307)](new Game_Action(this));}if(this[_0x2b0c56(0x388)]()){if(_0x2b0c56(0x22d)===_0x2b0c56(0x33f)){const _0xe8db3c=this[_0x2b0c56(0x39b)]()[_0x2b0c56(0x25b)];if(_0xe8db3c[_0x2b0c56(0x378)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x533b01(_0x35a2d0['$1']);return this[_0x2b0c56(0x257)]();}else{const _0x44cefd=this[_0x2b0c56(0x20e)]()['actions'][_0x2b0c56(0x293)](_0x8e05d2=>this[_0x2b0c56(0x35e)](_0x8e05d2));if(_0x44cefd[_0x2b0c56(0x36f)]>0x0){let _0xf85ddd;if(!_0x1d6762){if('LLPrA'!=='UpqCl')_0xf85ddd=this[_0x2b0c56(0x364)][_0x2b0c56(0x252)]();else{const _0x498af3=this[_0x2b0c56(0x1e4)]();if(!_0x498af3)return;if(!_0x498af3[_0x2b0c56(0x388)]())return;if(this[_0x2b0c56(0x1cb)]===_0x498af3[_0x2b0c56(0x26a)]())return;this[_0x2b0c56(0x1cb)]=_0x498af3['battlerHue'](),this[_0x2b0c56(0x211)]['setHue'](_0x498af3[_0x2b0c56(0x22e)]()?0x0:this[_0x2b0c56(0x1cb)]);}}this[_0x2b0c56(0x32c)](_0x44cefd),!_0x1d6762&&this[_0x2b0c56(0x364)][_0x2b0c56(0x318)](_0xf85ddd);}}}}},VisuMZ[_0x1ea107(0x27f)][_0x1ea107(0x2a7)]=Game_Actor[_0x1ea107(0x33a)][_0x1ea107(0x2ef)],Game_Actor[_0x1ea107(0x33a)][_0x1ea107(0x2ef)]=function(){const _0x1c8a08=_0x1ea107;if(BattleManager[_0x1c8a08(0x323)]()){if('BlNVG'!==_0x1c8a08(0x234))return _0x5ed9b9[_0x1c8a08(0x29a)]['EnemyBattlerIcon'];else{if(this['battler']())this['battler']()[_0x1c8a08(0x347)]();return![];}}return VisuMZ[_0x1c8a08(0x27f)]['Game_Actor_selectNextCommand'][_0x1c8a08(0x39e)](this);},Game_Actor[_0x1ea107(0x33a)][_0x1ea107(0x26c)]=function(){const _0x551d9d=_0x1ea107,_0x7d3386=this[_0x551d9d(0x39b)]()[_0x551d9d(0x25b)];if(_0x7d3386[_0x551d9d(0x378)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x551d9d(0x2dd)!==_0x551d9d(0x38a))return _0x551d9d(0x29f);else this[_0x551d9d(0x323)]()?this[_0x551d9d(0x2f5)]():_0x21980e['BattleSystemSTB']['BattleManager_selectNextActor']['call'](this);}else{if(_0x7d3386[_0x551d9d(0x378)](/<STB TURN ORDER ICON:[ ](\d+)>/i)){if('VxJBr'!==_0x551d9d(0x2b8))return _0x551d9d(0x218);else{if(!this[_0x551d9d(0x2d8)]())return;const _0x4bfbd0=_0x2b6935[_0x551d9d(0x27f)]['Settings']['TurnOrder'];if(!_0x4bfbd0[_0x551d9d(0x223)])return;const _0x27e474=_0x459247[_0x551d9d(0x1cf)]()[_0x551d9d(0x293)](_0x564dea=>_0x564dea&&_0x564dea[_0x551d9d(0x230)]()&&_0x564dea[_0x551d9d(0x379)]())[_0x551d9d(0x36f)],_0x53e473=_0x407f1d[_0x551d9d(0x1cf)]()['filter'](_0x2e799a=>_0x2e799a&&_0x2e799a[_0x551d9d(0x230)]()&&_0x2e799a[_0x551d9d(0x379)]())[_0x551d9d(0x36f)],_0x24f2e9=this[_0x551d9d(0x377)](_0x27e474,_0x53e473);this[_0x551d9d(0x37a)]=_0x24f2e9['x'],this[_0x551d9d(0x34a)]=_0x24f2e9['y'],(this[_0x551d9d(0x37a)]!==this['_homeX']||this[_0x551d9d(0x34a)]!==this['_homeY'])&&(this['_homeDuration']=_0x4bfbd0[_0x551d9d(0x1f1)]);}}}return Window_STB_TurnOrder[_0x551d9d(0x29a)]['ActorBattlerType'];},Game_Actor[_0x1ea107(0x33a)][_0x1ea107(0x324)]=function(){const _0x40f220=_0x1ea107,_0x550de4=this[_0x40f220(0x39b)]()[_0x40f220(0x25b)];if(_0x550de4[_0x40f220(0x378)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x40f220(0x34d)==='syYDm')this[_0x40f220(0x364)]['unshift'](_0x582240);else return String(RegExp['$1']);}return this[_0x40f220(0x257)]();},Game_Actor['prototype'][_0x1ea107(0x2d5)]=function(){const _0xc354e8=_0x1ea107,_0x57431b=this[_0xc354e8(0x39b)]()[_0xc354e8(0x25b)];if(_0x57431b[_0xc354e8(0x378)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0xc354e8(0x26f)]();},Game_Actor[_0x1ea107(0x33a)][_0x1ea107(0x254)]=function(){const _0x1a9418=_0x1ea107,_0x454091=this[_0x1a9418(0x39b)]()[_0x1a9418(0x25b)];if(_0x454091[_0x1a9418(0x378)](/<STB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x1a9418(0x20c)==='KkHum')_0x5c323b[_0x1a9418(0x27f)][_0x1a9418(0x2cf)][_0x1a9418(0x39e)](this);else return Number(RegExp['$1']);}return Window_STB_TurnOrder[_0x1a9418(0x29a)][_0x1a9418(0x28e)];},Game_Enemy[_0x1ea107(0x33a)][_0x1ea107(0x26c)]=function(){const _0x1251ec=_0x1ea107,_0x5b881e=this[_0x1251ec(0x20e)]()[_0x1251ec(0x25b)];if(_0x5b881e['match'](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x1251ec(0x1ea)===_0x1251ec(0x375))_0x4bb51f=_0x2778bb[_0x1251ec(0x249)](_0x4f0e8f,_0x1c755d);else return _0x1251ec(0x29f);}else{if(_0x5b881e[_0x1251ec(0x378)](/<STB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x1251ec(0x386)!==_0x1251ec(0x386)){const _0x557a45=_0x32e3b6[_0x1251ec(0x27f)]['RegExp'][_0x1251ec(0x20d)];return this['traitObjects']()[_0x1251ec(0x300)](_0x349c6b=>_0x349c6b[_0x1251ec(0x25b)][_0x1251ec(0x378)](_0x557a45));}else return _0x1251ec(0x218);}}return Window_STB_TurnOrder[_0x1251ec(0x29a)][_0x1251ec(0x275)];},Game_Enemy['prototype'][_0x1ea107(0x324)]=function(){const _0x5c3044=_0x1ea107,_0x1e0e06=this[_0x5c3044(0x20e)]()[_0x5c3044(0x25b)];if(_0x1e0e06[_0x5c3044(0x378)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x5c3044(0x361)==='nBYZb')_0x1ec494[_0x5c3044(0x27f)][_0x5c3044(0x282)][_0x5c3044(0x39e)](this);else return String(RegExp['$1']);}return Window_STB_TurnOrder[_0x5c3044(0x29a)][_0x5c3044(0x1bb)];},Game_Enemy[_0x1ea107(0x33a)][_0x1ea107(0x2d5)]=function(){const _0x242a7d=_0x1ea107,_0x4bd6f6=this[_0x242a7d(0x20e)]()[_0x242a7d(0x25b)];if(_0x4bd6f6[_0x242a7d(0x378)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_STB_TurnOrder[_0x242a7d(0x29a)][_0x242a7d(0x392)];},Game_Enemy[_0x1ea107(0x33a)][_0x1ea107(0x254)]=function(){const _0x3abb14=_0x1ea107,_0x1837c1=this['enemy']()[_0x3abb14(0x25b)];if(_0x1837c1[_0x3abb14(0x378)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_STB_TurnOrder[_0x3abb14(0x29a)]['EnemyBattlerIcon'];},VisuMZ[_0x1ea107(0x27f)][_0x1ea107(0x207)]=Game_Party[_0x1ea107(0x33a)][_0x1ea107(0x22c)],Game_Party['prototype']['removeActor']=function(_0x43f5a9){const _0x6635a5=_0x1ea107;VisuMZ[_0x6635a5(0x27f)][_0x6635a5(0x207)][_0x6635a5(0x39e)](this,_0x43f5a9),SceneManager[_0x6635a5(0x311)]()&&BattleManager[_0x6635a5(0x323)]()&&BattleManager['_actionBattlers'][_0x6635a5(0x2fe)]($gameActors[_0x6635a5(0x39b)](_0x43f5a9));},VisuMZ[_0x1ea107(0x27f)]['Scene_Battle_createActorCommandWindow']=Scene_Battle[_0x1ea107(0x33a)]['createActorCommandWindow'],Scene_Battle[_0x1ea107(0x33a)]['createActorCommandWindow']=function(){const _0x2ef879=_0x1ea107;VisuMZ[_0x2ef879(0x27f)][_0x2ef879(0x256)][_0x2ef879(0x39e)](this),BattleManager[_0x2ef879(0x323)]()&&this['createActorCommandWindowSTB']();},Scene_Battle[_0x1ea107(0x33a)][_0x1ea107(0x1e9)]=function(){const _0x376711=_0x1ea107,_0x49859f=this['_actorCommandWindow'];this['isPartyCommandWindowDisabled']()&&delete _0x49859f[_0x376711(0x2fd)][_0x376711(0x1f6)];},VisuMZ['BattleSystemSTB']['Scene_Battle_commandCancel']=Scene_Battle[_0x1ea107(0x33a)][_0x1ea107(0x355)],Scene_Battle['prototype'][_0x1ea107(0x355)]=function(){const _0x286ed2=_0x1ea107;BattleManager[_0x286ed2(0x323)]()?this[_0x286ed2(0x299)]():VisuMZ[_0x286ed2(0x27f)]['Scene_Battle_commandCancel'][_0x286ed2(0x39e)](this);},Scene_Battle[_0x1ea107(0x33a)]['commandCancelSTB']=function(){const _0x1d477e=_0x1ea107;this['_partyCommandWindow'][_0x1d477e(0x25a)](),this[_0x1d477e(0x2a3)][_0x1d477e(0x244)]();},VisuMZ['BattleSystemSTB'][_0x1ea107(0x282)]=Scene_Battle[_0x1ea107(0x33a)][_0x1ea107(0x2e1)],Scene_Battle[_0x1ea107(0x33a)][_0x1ea107(0x2e1)]=function(){const _0x5a00bd=_0x1ea107;if(BattleManager['isSTB']())this[_0x5a00bd(0x1d2)]();else{if(_0x5a00bd(0x31b)===_0x5a00bd(0x1fb))return this['_stbTurnOrderFaceIndex']===_0x560602&&(this['_stbTurnOrderFaceIndex']=this[_0x5a00bd(0x2d5)]()),this[_0x5a00bd(0x268)];else VisuMZ[_0x5a00bd(0x27f)][_0x5a00bd(0x282)]['call'](this);}},VisuMZ[_0x1ea107(0x27f)][_0x1ea107(0x3aa)]=Scene_Battle[_0x1ea107(0x33a)][_0x1ea107(0x239)],Scene_Battle[_0x1ea107(0x33a)][_0x1ea107(0x239)]=function(){const _0x14dcf5=_0x1ea107;VisuMZ[_0x14dcf5(0x27f)][_0x14dcf5(0x3aa)][_0x14dcf5(0x39e)](this),this[_0x14dcf5(0x31f)]();},Scene_Battle['prototype'][_0x1ea107(0x31f)]=function(){const _0x1d4839=_0x1ea107;if(!BattleManager[_0x1d4839(0x323)]())return;this[_0x1d4839(0x2c9)]=new Window_STB_TurnOrder();const _0x316677=this[_0x1d4839(0x1ec)](this[_0x1d4839(0x2e2)]);this['addChildAt'](this[_0x1d4839(0x2c9)],_0x316677),this[_0x1d4839(0x360)](),BattleManager['updateTurnOrderSTB'](!![]);},Scene_Battle[_0x1ea107(0x33a)][_0x1ea107(0x360)]=function(){const _0x2c67dc=_0x1ea107,_0x421ba6=Window_STB_TurnOrder[_0x2c67dc(0x29a)];if(_0x421ba6[_0x2c67dc(0x2a9)]!==_0x2c67dc(0x24a))return;if(!_0x421ba6[_0x2c67dc(0x1c5)])return;if(!this[_0x2c67dc(0x1e0)])return;const _0x4e2f2b=this['_stbTurnOrderWindow']['y']-Math['round']((Graphics[_0x2c67dc(0x280)]-Graphics['boxHeight'])/0x2),_0xfeb61=_0x4e2f2b+this['_stbTurnOrderWindow']['height'];this[_0x2c67dc(0x1e0)]['y']=_0xfeb61+_0x421ba6['ScreenBuffer'];};function Sprite_STB_TurnOrder_Battler(){const _0x248de6=_0x1ea107;this[_0x248de6(0x20b)](...arguments);}Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)]=Object[_0x1ea107(0x2bd)](Sprite_Clickable[_0x1ea107(0x33a)]),Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x387)]=Sprite_STB_TurnOrder_Battler,Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x20b)]=function(_0x26ae2c,_0x3edbc8){const _0x4ee19c=_0x1ea107;this['initMembers'](_0x26ae2c,_0x3edbc8),Sprite_Clickable[_0x4ee19c(0x33a)][_0x4ee19c(0x20b)]['call'](this),this[_0x4ee19c(0x3b2)]=0x0,this[_0x4ee19c(0x2c5)](),this[_0x4ee19c(0x2a4)]();},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x395)]=function(_0x332bab,_0x3618f8){const _0x3073d6=_0x1ea107;this[_0x3073d6(0x276)]=_0x332bab,this[_0x3073d6(0x2e4)]=_0x3618f8;const _0x7ceddc=Window_STB_TurnOrder[_0x3073d6(0x29a)],_0x3bceb5=this[_0x3073d6(0x2d8)](),_0x2e003b=this[_0x3073d6(0x2ad)]();this[_0x3073d6(0x374)]=0x0,this[_0x3073d6(0x357)]=_0x3bceb5?_0x7ceddc[_0x3073d6(0x28d)]*_0x2e003b:0x0,this[_0x3073d6(0x36a)]=_0x3bceb5?0x0:_0x7ceddc[_0x3073d6(0x28d)]*_0x2e003b,this[_0x3073d6(0x283)]=0x0,this['_fadeTarget']=0xff,this[_0x3073d6(0x23e)]=![],this[_0x3073d6(0x1f0)]=![],this['_containerWidth']=0x0,this[_0x3073d6(0x1d0)]=0x0;},Sprite_STB_TurnOrder_Battler['prototype'][_0x1ea107(0x2c5)]=function(){const _0x5b90a0=_0x1ea107;this['createInitialPositions'](),this[_0x5b90a0(0x2fb)](),this[_0x5b90a0(0x1bc)](),this[_0x5b90a0(0x1b9)](),this[_0x5b90a0(0x2ec)]();},Sprite_STB_TurnOrder_Battler['prototype'][_0x1ea107(0x317)]=function(){const _0x137b4c=_0x1ea107;this['x']=this[_0x137b4c(0x357)],this['y']=this['_positionTargetY'];},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x2d8)]=function(){const _0x142f99=_0x1ea107,_0x10ecf5=Window_STB_TurnOrder[_0x142f99(0x29a)],_0xcfbef7=[_0x142f99(0x24a),'bottom'][_0x142f99(0x37e)](_0x10ecf5['DisplayPosition']);return _0xcfbef7;},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x391)]=function(){const _0x2c21ed=_0x1ea107,_0x424772=Window_STB_TurnOrder['Settings'];return this[_0x2c21ed(0x2d8)]()?_0x424772[_0x2c21ed(0x28d)]:_0x424772['SpriteLength'];},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x294)]=function(){const _0x2cf6bf=_0x1ea107,_0x7ab51c=Window_STB_TurnOrder[_0x2cf6bf(0x29a)];return this[_0x2cf6bf(0x2d8)]()?_0x7ab51c[_0x2cf6bf(0x326)]:_0x7ab51c[_0x2cf6bf(0x28d)];},Sprite_STB_TurnOrder_Battler['prototype'][_0x1ea107(0x380)]=function(){const _0x31d2ba=_0x1ea107;this[_0x31d2ba(0x373)]=new Bitmap(0x48,0x24);const _0x2eeab8=this[_0x31d2ba(0x1e4)]()?this[_0x31d2ba(0x1e4)]()['name']():_0x31d2ba(0x2a0)[_0x31d2ba(0x277)](this[_0x31d2ba(0x276)],this[_0x31d2ba(0x2e4)]);this['bitmap'][_0x31d2ba(0x23b)](_0x2eeab8,0x0,0x0,0x48,0x24,_0x31d2ba(0x330));},Sprite_STB_TurnOrder_Battler['prototype'][_0x1ea107(0x2fb)]=function(){const _0x2262cf=_0x1ea107;if(!Window_STB_TurnOrder[_0x2262cf(0x29a)][_0x2262cf(0x2be)])return;const _0x989eb2=Window_STB_TurnOrder[_0x2262cf(0x29a)],_0x23d2ad=this[_0x2262cf(0x276)]===$gameParty?'Actor':'Enemy',_0xc80e4f=_0x2262cf(0x365)['format'](_0x23d2ad),_0x2d694c=new Sprite();_0x2d694c['anchor']['x']=this[_0x2262cf(0x262)]['x'],_0x2d694c['anchor']['y']=this[_0x2262cf(0x262)]['y'];if(_0x989eb2[_0xc80e4f]){if(_0x2262cf(0x356)!==_0x2262cf(0x22b))_0x2d694c[_0x2262cf(0x373)]=ImageManager['loadSystem'](_0x989eb2[_0xc80e4f]);else{const _0x4835c9=new _0x10072b(_0x3ba4f2,_0x48a369);this[_0x2262cf(0x1c2)][_0x2262cf(0x1c6)](_0x4835c9),this[_0x2262cf(0x2a6)][_0x2262cf(0x307)](_0x4835c9);}}else{if(_0x2262cf(0x21e)==='HxozO'){const _0x279f4e=this[_0x2262cf(0x391)](),_0x165740=this[_0x2262cf(0x294)]();_0x2d694c[_0x2262cf(0x373)]=new Bitmap(_0x279f4e,_0x165740);const _0x52c877=ColorManager['getColor'](_0x989eb2[_0x2262cf(0x20f)[_0x2262cf(0x277)](_0x23d2ad)]),_0x58ec4a=ColorManager[_0x2262cf(0x36e)](_0x989eb2[_0x2262cf(0x2c2)[_0x2262cf(0x277)](_0x23d2ad)]);_0x2d694c['bitmap'][_0x2262cf(0x281)](0x0,0x0,_0x279f4e,_0x165740,_0x52c877,_0x58ec4a,!![]);}else{const _0x5a0e0b=_0x84173c[_0x2262cf(0x29a)],_0x32ba82=['top',_0x2262cf(0x29d)][_0x2262cf(0x37e)](_0x5a0e0b[_0x2262cf(0x2a9)]);return _0x32ba82;}}this['_backgroundSprite']=_0x2d694c,this[_0x2262cf(0x1c6)](this[_0x2262cf(0x3b5)]),this[_0x2262cf(0x30d)]=this[_0x2262cf(0x3b5)][_0x2262cf(0x30d)],this[_0x2262cf(0x280)]=this[_0x2262cf(0x3b5)][_0x2262cf(0x280)];},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x1bc)]=function(){const _0xb4e178=_0x1ea107,_0x3efbb8=new Sprite();_0x3efbb8[_0xb4e178(0x262)]['x']=this['anchor']['x'],_0x3efbb8[_0xb4e178(0x262)]['y']=this[_0xb4e178(0x262)]['y'],this['_graphicSprite']=_0x3efbb8,this[_0xb4e178(0x1c6)](this[_0xb4e178(0x211)]),this[_0xb4e178(0x235)]();},Sprite_STB_TurnOrder_Battler['prototype']['createBorderSprite']=function(){const _0x1c9f1d=_0x1ea107;if(!Window_STB_TurnOrder[_0x1c9f1d(0x29a)]['ShowMarkerBorder'])return;const _0x19f906=Window_STB_TurnOrder[_0x1c9f1d(0x29a)],_0x398afe=this[_0x1c9f1d(0x276)]===$gameParty?_0x1c9f1d(0x2db):_0x1c9f1d(0x289),_0x366df9=_0x1c9f1d(0x267)[_0x1c9f1d(0x277)](_0x398afe),_0x46a714=new Sprite();_0x46a714[_0x1c9f1d(0x262)]['x']=this[_0x1c9f1d(0x262)]['x'],_0x46a714[_0x1c9f1d(0x262)]['y']=this['anchor']['y'];if(_0x19f906[_0x366df9])_0x1c9f1d(0x36d)==='TnOXs'?_0x46a714[_0x1c9f1d(0x373)]=ImageManager['loadSystem'](_0x19f906[_0x366df9]):_0x4d8217[_0x1c9f1d(0x373)]=_0x59343e[_0x1c9f1d(0x312)](_0x45fc80[_0x27d51c]);else{if('OOoVi'===_0x1c9f1d(0x259))this[_0x1c9f1d(0x1cc)]=0x0;else{let _0x5766c8=this[_0x1c9f1d(0x391)](),_0x294bb9=this[_0x1c9f1d(0x294)](),_0x2e28c0=_0x19f906[_0x1c9f1d(0x21b)];_0x46a714['bitmap']=new Bitmap(_0x5766c8,_0x294bb9);const _0x3e04cd=_0x1c9f1d(0x331),_0x411b6d=ColorManager['getColor'](_0x19f906[_0x1c9f1d(0x38e)[_0x1c9f1d(0x277)](_0x398afe)]);_0x46a714['bitmap'][_0x1c9f1d(0x23f)](0x0,0x0,_0x5766c8,_0x294bb9,_0x3e04cd),_0x5766c8-=0x2,_0x294bb9-=0x2,_0x46a714[_0x1c9f1d(0x373)][_0x1c9f1d(0x23f)](0x1,0x1,_0x5766c8,_0x294bb9,_0x411b6d),_0x5766c8-=_0x2e28c0*0x2,_0x294bb9-=_0x2e28c0*0x2,_0x46a714[_0x1c9f1d(0x373)][_0x1c9f1d(0x23f)](0x1+_0x2e28c0,0x1+_0x2e28c0,_0x5766c8,_0x294bb9,_0x3e04cd),_0x5766c8-=0x2,_0x294bb9-=0x2,_0x2e28c0+=0x1,_0x46a714[_0x1c9f1d(0x373)][_0x1c9f1d(0x2b9)](0x1+_0x2e28c0,0x1+_0x2e28c0,_0x5766c8,_0x294bb9);}}this['_backgroundSprite']=_0x46a714,this[_0x1c9f1d(0x1c6)](this[_0x1c9f1d(0x3b5)]);},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x2ec)]=function(){const _0x34a208=_0x1ea107,_0x352122=Window_STB_TurnOrder[_0x34a208(0x29a)];if(!_0x352122['EnemyBattlerDrawLetter'])return;if(this[_0x34a208(0x276)]===$gameParty)return;const _0x168382=this[_0x34a208(0x391)](),_0x47246c=this[_0x34a208(0x294)](),_0x2898f5=new Sprite();_0x2898f5['anchor']['x']=this['anchor']['x'],_0x2898f5[_0x34a208(0x262)]['y']=this[_0x34a208(0x262)]['y'],_0x2898f5[_0x34a208(0x373)]=new Bitmap(_0x168382,_0x47246c),this['_letterSprite']=_0x2898f5,this[_0x34a208(0x1c6)](this[_0x34a208(0x295)]);},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x1e4)]=function(){const _0x5563db=_0x1ea107;return this['_unit']?this['_unit'][_0x5563db(0x1cf)]()[this[_0x5563db(0x2e4)]]:null;},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)]['update']=function(){const _0x1e905a=_0x1ea107;Sprite_Clickable[_0x1e905a(0x33a)][_0x1e905a(0x22f)][_0x1e905a(0x39e)](this),this['checkPosition'](),this[_0x1e905a(0x2f4)](),this[_0x1e905a(0x2a4)](),this['updateOpacity'](),this[_0x1e905a(0x2b2)](),this[_0x1e905a(0x314)](),this['updateLetter'](),this[_0x1e905a(0x266)]();},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x2ea)]=function(){const _0x25a493=_0x1ea107,_0x44ee7e=this[_0x25a493(0x396)]();if(this[_0x25a493(0x371)]===_0x44ee7e)return;this[_0x25a493(0x371)]=_0x44ee7e;this[_0x25a493(0x3b2)]<0xff&&this[_0x25a493(0x1e4)]()&&_0x44ee7e!==this[_0x25a493(0x2ad)]()&&(_0x25a493(0x372)===_0x25a493(0x372)?this['startFade'](0xff):_0x35a59a['BattleSystemSTB'][_0x25a493(0x229)]['call'](this));if(_0x44ee7e===this[_0x25a493(0x2ad)]()&&this[_0x25a493(0x283)]<=0x0&&this[_0x25a493(0x3b2)]>0x0)'xXkgp'===_0x25a493(0x1d9)?this['processTurnSTB']():this['startFade'](0x0);else this[_0x25a493(0x283)]<=0x0&&this['opacity']<0xff&&this['checkOpacity']();this[_0x25a493(0x225)]();},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x263)]=function(){const _0x5f0b7f=_0x1ea107,_0x1b4b47=this[_0x5f0b7f(0x26b)]();if(!_0x1b4b47)return;let _0x5d0c5a=![];if(this[_0x5f0b7f(0x1c1)]!==_0x1b4b47['width'])_0x5d0c5a=!![];else this[_0x5f0b7f(0x1d0)]!==_0x1b4b47[_0x5f0b7f(0x280)]&&(_0x5d0c5a=!![]);_0x5d0c5a&&('SVKmY'===_0x5f0b7f(0x224)?this[_0x5f0b7f(0x225)]():this[_0x5f0b7f(0x31a)]=!![]);},Sprite_STB_TurnOrder_Battler['prototype'][_0x1ea107(0x225)]=function(){const _0x3c6ff2=_0x1ea107,_0x2d060a=Window_STB_TurnOrder['Settings'],_0x4f0f87=this[_0x3c6ff2(0x2d8)](),_0x408527=_0x2d060a[_0x3c6ff2(0x316)],_0x12de8d=_0x2d060a[_0x3c6ff2(0x382)],_0x17900d=SceneManager[_0x3c6ff2(0x260)][_0x3c6ff2(0x2c9)];if(!_0x17900d)return;const _0xacff4d=this[_0x3c6ff2(0x396)]();this[_0x3c6ff2(0x374)]=_0x2d060a['UpdateFrames'],this[_0x3c6ff2(0x357)]=_0x4f0f87?_0x2d060a['SpriteThin']*_0xacff4d:0x0,this['_positionTargetY']=_0x4f0f87?0x0:_0x2d060a[_0x3c6ff2(0x28d)]*_0xacff4d,_0xacff4d>0x0&&(this[_0x3c6ff2(0x357)]+=_0x4f0f87?_0x12de8d:0x0,this[_0x3c6ff2(0x36a)]+=_0x4f0f87?0x0:_0x12de8d),_0x408527?this[_0x3c6ff2(0x357)]=_0x4f0f87?_0x17900d[_0x3c6ff2(0x30d)]-this[_0x3c6ff2(0x357)]-_0x2d060a['SpriteThin']:0x0:this['_positionTargetY']=_0x4f0f87?0x0:_0x17900d[_0x3c6ff2(0x280)]-this[_0x3c6ff2(0x36a)]-_0x2d060a['SpriteThin'];},Sprite_STB_TurnOrder_Battler['prototype'][_0x1ea107(0x2f4)]=function(){const _0x3b1d29=_0x1ea107;if(this[_0x3b1d29(0x283)]>0x0)return;if(this[_0x3b1d29(0x374)]>0x0){const _0x10c98b=this[_0x3b1d29(0x374)];this['x']=(this['x']*(_0x10c98b-0x1)+this['_positionTargetX'])/_0x10c98b,this['y']=(this['y']*(_0x10c98b-0x1)+this[_0x3b1d29(0x36a)])/_0x10c98b,this['_positionDuration']--;}if(this[_0x3b1d29(0x374)]<=0x0){if('dXdMA'!=='dXdMA'){const _0x48cf39=_0x21370a[_0x3b1d29(0x29a)];if(_0x48cf39[_0x3b1d29(0x2a9)]!==_0x3b1d29(0x24a))return;if(!_0x48cf39[_0x3b1d29(0x227)])return;const _0x13e4c3=_0x50a2bc[_0x3b1d29(0x260)][_0x3b1d29(0x319)];if(!_0x13e4c3)return;_0x13e4c3[_0x3b1d29(0x1f9)]?(this['x']=this[_0x3b1d29(0x339)]+(_0x48cf39[_0x3b1d29(0x1fd)]||0x0),this['y']=this[_0x3b1d29(0x2f2)]+(_0x48cf39[_0x3b1d29(0x1e3)]||0x0)):(this['x']=this['_homeX'],this['y']=this['_homeY']);const _0x4430b3=_0x30407c[_0x3b1d29(0x260)][_0x3b1d29(0x2e2)];_0x2e39be[_0x3b1d29(0x3b6)]===_0x48082d&&(_0x596d4f[_0x3b1d29(0x3b6)]=_0xe65dbb[_0x3b1d29(0x31e)]((_0x2aded0[_0x3b1d29(0x30d)]-_0x5d51ba['min'](_0x6259c[_0x3b1d29(0x1e8)],_0x4430b3[_0x3b1d29(0x30d)]))/0x2),_0x10d319[_0x3b1d29(0x1fa)]=_0x461492[_0x3b1d29(0x31e)]((_0x33d8ba[_0x3b1d29(0x280)]-_0x5b900e[_0x3b1d29(0x23c)](_0x2203ac[_0x3b1d29(0x351)],_0x4430b3[_0x3b1d29(0x280)]))/0x2)),this['x']+=_0x4430b3['x']-_0x183cb8[_0x3b1d29(0x3b6)],this['y']+=_0x4430b3['y']-_0x26ca56[_0x3b1d29(0x1fa)];}else{this['x']=this[_0x3b1d29(0x357)],this['y']=this[_0x3b1d29(0x36a)];if(this['opacity']<0xff&&!this[_0x3b1d29(0x3b3)]&&this[_0x3b1d29(0x283)]<=0x0){if(_0x3b1d29(0x3b1)===_0x3b1d29(0x37f))_0xb2a116[_0x3b1d29(0x27f)][_0x3b1d29(0x336)]['call'](this),this[_0x3b1d29(0x200)]();else{const _0x29193c=this[_0x3b1d29(0x1e4)]();_0x29193c&&(this['_fadeTarget']=_0x29193c[_0x3b1d29(0x230)]()&&_0x29193c['isAppeared']()?0xff:0x0);}}}}},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x2ad)]=function(){const _0x39dc7b=_0x1ea107,_0x1cad9b=Window_STB_TurnOrder[_0x39dc7b(0x29a)],_0x9f253b=this['isHorz']()?_0x1cad9b[_0x39dc7b(0x272)]:_0x1cad9b['MaxVertSprites'];return _0x9f253b+0x1;},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x26b)]=function(){const _0x24f519=_0x1ea107;return SceneManager[_0x24f519(0x260)]['_stbTurnOrderWindow'];},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x396)]=function(){const _0x26f998=_0x1ea107,_0x2ef9c5=this[_0x26f998(0x1e4)]();if(!_0x2ef9c5)return this[_0x26f998(0x2ad)]();if(_0x2ef9c5===BattleManager[_0x26f998(0x246)])return 0x0;if(BattleManager['_actionBattlers'][_0x26f998(0x37e)](_0x2ef9c5)){if(_0x26f998(0x28c)!==_0x26f998(0x33c)){const _0x344524=BattleManager[_0x26f998(0x341)]['indexOf'](_0x2ef9c5)+0x1;return _0x344524;}else _0x50fe17[_0x26f998(0x341)]['remove'](_0x5b3a64[_0x26f998(0x39b)](_0x145ec1));}return this[_0x26f998(0x2ad)]();},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x315)]=function(_0x38684d){const _0x8a417f=_0x1ea107,_0x24d15f=Window_STB_TurnOrder[_0x8a417f(0x29a)];this['_fadeDuration']=_0x24d15f['UpdateFrames'],this[_0x8a417f(0x305)]=_0x38684d;},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x2a4)]=function(){const _0x220e6c=_0x1ea107,_0x2a889f=this[_0x220e6c(0x1e4)]();if(!_0x2a889f)return;if(this[_0x220e6c(0x23e)]===_0x2a889f[_0x220e6c(0x230)]()&&this['_isAppeared']===_0x2a889f[_0x220e6c(0x379)]())return;this[_0x220e6c(0x23e)]=_0x2a889f[_0x220e6c(0x230)](),this['_isAppeared']=_0x2a889f[_0x220e6c(0x379)]();let _0x497b12=this[_0x220e6c(0x23e)]&&this[_0x220e6c(0x1f0)]?0xff:0x0;this[_0x220e6c(0x315)](_0x497b12);},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x2aa)]=function(){const _0x5e05ad=_0x1ea107;if(this[_0x5e05ad(0x283)]>0x0){const _0x49d58a=this[_0x5e05ad(0x283)];this[_0x5e05ad(0x3b2)]=(this[_0x5e05ad(0x3b2)]*(_0x49d58a-0x1)+this['_fadeTarget'])/_0x49d58a,this['_fadeDuration']--,this[_0x5e05ad(0x283)]<=0x0&&(_0x5e05ad(0x1ca)==='GurBm'?(this['checkPosition'](),this[_0x5e05ad(0x374)]=0x0,this['updatePosition'](),this[_0x5e05ad(0x3b2)]=this[_0x5e05ad(0x305)]):(_0x3e1f6f[_0x5e05ad(0x33a)]['update'][_0x5e05ad(0x39e)](this),this[_0x5e05ad(0x2ea)](),this[_0x5e05ad(0x2f4)](),this[_0x5e05ad(0x2a4)](),this['updateOpacity'](),this['updateGraphic'](),this['updateGraphicHue'](),this[_0x5e05ad(0x35b)](),this[_0x5e05ad(0x266)]()));}if(this[_0x5e05ad(0x3b3)])return;BattleManager[_0x5e05ad(0x349)]===_0x5e05ad(0x1f5)&&(this['_isBattleOver']=!![],this[_0x5e05ad(0x315)](0x0));},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)]['updateGraphic']=function(){const _0x2830a9=_0x1ea107,_0x5dc46b=this[_0x2830a9(0x1e4)]();if(!_0x5dc46b)return;const _0x439cd5=Window_STB_TurnOrder[_0x2830a9(0x29a)],_0x6e919f=this['_unit']===$gameParty?_0x2830a9(0x2db):_0x2830a9(0x289);let _0x23cbe1=_0x5dc46b[_0x2830a9(0x2f0)]();if(_0x5dc46b[_0x2830a9(0x1e2)]()&&_0x23cbe1==='enemy'){if(_0x2830a9(0x308)===_0x2830a9(0x2f1)){const _0x10fb72=_0x27f484[_0x2830a9(0x29a)],_0xcd6075=this[_0x2830a9(0x391)](),_0x5c63c0=this['bitmapHeight'](),_0x243ffd=_0x36047f[_0x2830a9(0x23c)](_0xcd6075,_0x5c63c0);this[_0x2830a9(0x211)]['bitmap']=new _0xf6454f(_0xcd6075,_0x5c63c0);const _0x4d6a9f=this[_0x2830a9(0x211)][_0x2830a9(0x373)],_0x5e75b9=_0x6f597f[_0x2830a9(0x23c)](0x1,_0x243ffd/_0x477852[_0x2830a9(0x30d)],_0x243ffd/_0x4c0bbf[_0x2830a9(0x280)]),_0x5cc441=_0x2af15d[_0x2830a9(0x30d)]*_0x5e75b9,_0x276819=_0x1da4f3[_0x2830a9(0x280)]*_0x5e75b9,_0x1055ea=_0x319481[_0x2830a9(0x31e)]((_0xcd6075-_0x5cc441)/0x2),_0x5a7612=_0x367b5f['round']((_0x5c63c0-_0x276819)/0x2);_0x4d6a9f[_0x2830a9(0x1c0)](_0x497696,0x0,0x0,_0x11bdff[_0x2830a9(0x30d)],_0x3760c0[_0x2830a9(0x280)],_0x1055ea,_0x5a7612,_0x5cc441,_0x276819);}else _0x23cbe1=_0x2830a9(0x29f);}else _0x5dc46b[_0x2830a9(0x388)]()&&_0x23cbe1===_0x2830a9(0x2fc)&&('HIjgY'!=='HIjgY'?(_0x428d36[_0x2830a9(0x27f)][_0x2830a9(0x3aa)][_0x2830a9(0x39e)](this),this[_0x2830a9(0x31f)]()):_0x23cbe1=_0x2830a9(0x20e));if(this[_0x2830a9(0x354)]!==_0x23cbe1)return'HCnvP'!=='HCnvP'?this['createBattlerRect'](_0x138c26[_0x2830a9(0x213)](),0x9,!![]):this[_0x2830a9(0x235)]();switch(this[_0x2830a9(0x354)]){case'face':if(this[_0x2830a9(0x1be)]!==_0x5dc46b[_0x2830a9(0x381)]())return this['processUpdateGraphic']();if(this['_graphicFaceIndex']!==_0x5dc46b[_0x2830a9(0x1c3)]())return this['processUpdateGraphic']();break;case _0x2830a9(0x218):if(this[_0x2830a9(0x1fe)]!==_0x5dc46b['TurnOrderSTBGraphicIconIndex']()){if('iiLOK'===_0x2830a9(0x1da))return this['processUpdateGraphic']();else this['subject']()[_0x2830a9(0x2da)](0x1);}break;case _0x2830a9(0x20e):if(_0x5dc46b[_0x2830a9(0x22e)]()){if(this['_graphicSv']!==_0x5dc46b[_0x2830a9(0x2f6)]())return this['processUpdateGraphic']();}else{if(this[_0x2830a9(0x2d3)]!==_0x5dc46b[_0x2830a9(0x338)]())return this['processUpdateGraphic']();}break;case _0x2830a9(0x2fc):if(_0x5dc46b['isActor']()){if(this[_0x2830a9(0x37d)]!==_0x5dc46b[_0x2830a9(0x338)]())return this[_0x2830a9(0x235)]();}else{if(this[_0x2830a9(0x2d3)]!==_0x5dc46b[_0x2830a9(0x338)]())return this[_0x2830a9(0x235)]();}break;}},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x235)]=function(){const _0x53b714=_0x1ea107,_0x1b5585=this['battler']();if(!_0x1b5585)return;this[_0x53b714(0x354)]=_0x1b5585[_0x53b714(0x2f0)]();if(_0x1b5585[_0x53b714(0x1e2)]()&&this['_graphicType']===_0x53b714(0x20e))this[_0x53b714(0x354)]=_0x53b714(0x29f);else _0x1b5585[_0x53b714(0x388)]()&&this[_0x53b714(0x354)]==='svactor'&&(this[_0x53b714(0x354)]=_0x53b714(0x20e));let _0x1d53ec;switch(this[_0x53b714(0x354)]){case _0x53b714(0x29f):this['_graphicFaceName']=_0x1b5585[_0x53b714(0x381)](),this[_0x53b714(0x383)]=_0x1b5585[_0x53b714(0x1c3)](),_0x1d53ec=ImageManager['loadFace'](this[_0x53b714(0x1be)]),_0x1d53ec[_0x53b714(0x393)](this[_0x53b714(0x3b0)][_0x53b714(0x23a)](this,_0x1d53ec));break;case _0x53b714(0x218):this[_0x53b714(0x1fe)]=_0x1b5585['createTurnOrderSTBGraphicIconIndex'](),_0x1d53ec=ImageManager[_0x53b714(0x312)](_0x53b714(0x1df)),_0x1d53ec[_0x53b714(0x393)](this[_0x53b714(0x2bc)][_0x53b714(0x23a)](this,_0x1d53ec));break;case _0x53b714(0x20e):if(_0x1b5585[_0x53b714(0x22e)]())this[_0x53b714(0x37d)]=_0x1b5585['svBattlerName'](),_0x1d53ec=ImageManager['loadSvActor'](this['_graphicSv']),_0x1d53ec['addLoadListener'](this[_0x53b714(0x325)]['bind'](this,_0x1d53ec));else $gameSystem[_0x53b714(0x33e)]()?(this[_0x53b714(0x2d3)]=_0x1b5585[_0x53b714(0x338)](),_0x1d53ec=ImageManager['loadSvEnemy'](this[_0x53b714(0x2d3)]),_0x1d53ec[_0x53b714(0x393)](this[_0x53b714(0x390)][_0x53b714(0x23a)](this,_0x1d53ec))):_0x53b714(0x27e)!==_0x53b714(0x27e)?this[_0x53b714(0x354)]=_0x53b714(0x29f):(this['_graphicEnemy']=_0x1b5585[_0x53b714(0x338)](),_0x1d53ec=ImageManager['loadEnemy'](this[_0x53b714(0x2d3)]),_0x1d53ec[_0x53b714(0x393)](this[_0x53b714(0x390)][_0x53b714(0x23a)](this,_0x1d53ec)));break;case'svactor':this[_0x53b714(0x37d)]=_0x1b5585[_0x53b714(0x338)](),_0x1d53ec=ImageManager[_0x53b714(0x255)](this[_0x53b714(0x37d)]),_0x1d53ec[_0x53b714(0x393)](this[_0x53b714(0x325)]['bind'](this,_0x1d53ec));break;}},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)]['changeFaceGraphicBitmap']=function(_0x12c6e5){const _0x31b149=_0x1ea107,_0x25f5bc=this[_0x31b149(0x383)],_0x23b8e3=this['bitmapWidth'](),_0x295988=this[_0x31b149(0x294)](),_0x4a183f=Math[_0x31b149(0x249)](_0x23b8e3,_0x295988);this[_0x31b149(0x211)][_0x31b149(0x373)]=new Bitmap(_0x23b8e3,_0x295988);const _0xc39916=this[_0x31b149(0x211)][_0x31b149(0x373)],_0x4bfa20=ImageManager[_0x31b149(0x1f3)],_0x3c7374=ImageManager['faceHeight'],_0x4c5679=_0x4a183f/Math[_0x31b149(0x249)](_0x4bfa20,_0x3c7374),_0x100eb0=ImageManager[_0x31b149(0x1f3)],_0x10aebd=ImageManager['faceHeight'],_0x290013=_0x25f5bc%0x4*_0x4bfa20+(_0x4bfa20-_0x100eb0)/0x2,_0x5604a6=Math['floor'](_0x25f5bc/0x4)*_0x3c7374+(_0x3c7374-_0x10aebd)/0x2,_0x341677=(_0x23b8e3-_0x4bfa20*_0x4c5679)/0x2,_0x39e94c=(_0x295988-_0x3c7374*_0x4c5679)/0x2;_0xc39916[_0x31b149(0x1c0)](_0x12c6e5,_0x290013,_0x5604a6,_0x100eb0,_0x10aebd,_0x341677,_0x39e94c,_0x4a183f,_0x4a183f);},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x2bc)]=function(_0x2d5e3b){const _0x41e45f=_0x1ea107,_0x418f0b=this[_0x41e45f(0x1fe)],_0xae2565=this[_0x41e45f(0x391)](),_0x54690f=this[_0x41e45f(0x294)]();this['_graphicSprite'][_0x41e45f(0x373)]=new Bitmap(_0xae2565,_0x54690f);const _0x11605c=this['_graphicSprite'][_0x41e45f(0x373)],_0x214c15=ImageManager[_0x41e45f(0x350)],_0x4a730f=ImageManager[_0x41e45f(0x2a8)],_0x3ce819=Math['min'](_0x214c15,_0x4a730f,_0xae2565,_0x54690f),_0x57ad35=_0x418f0b%0x10*_0x214c15,_0x2e2f25=Math[_0x41e45f(0x265)](_0x418f0b/0x10)*_0x4a730f,_0x10d72c=Math['floor'](Math['max'](_0xae2565-_0x3ce819,0x0)/0x2),_0x5101ad=Math['floor'](Math[_0x41e45f(0x249)](_0x54690f-_0x3ce819,0x0)/0x2);_0x11605c[_0x41e45f(0x1c0)](_0x2d5e3b,_0x57ad35,_0x2e2f25,_0x214c15,_0x4a730f,_0x10d72c,_0x5101ad,_0x3ce819,_0x3ce819);},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x325)]=function(_0x2e5340){const _0x12a95a=_0x1ea107,_0x413cef=this['bitmapWidth'](),_0x3f8b6c=this['bitmapHeight'](),_0x45c29d=Math[_0x12a95a(0x23c)](_0x413cef,_0x3f8b6c);this['_graphicSprite'][_0x12a95a(0x373)]=new Bitmap(_0x413cef,_0x3f8b6c);const _0x1b078c=this['_graphicSprite'][_0x12a95a(0x373)],_0x1e0be3=this[_0x12a95a(0x37d)][_0x12a95a(0x378)](/\$/i),_0x2409eb=_0x1e0be3?0x1:ImageManager[_0x12a95a(0x1f7)],_0x5852e7=_0x1e0be3?0x1:ImageManager[_0x12a95a(0x21c)],_0x50054c=_0x2e5340[_0x12a95a(0x30d)]/_0x2409eb,_0x5b01cf=_0x2e5340['height']/_0x5852e7,_0x5aea36=Math['min'](0x1,_0x45c29d/_0x50054c,_0x45c29d/_0x5b01cf),_0x12531b=_0x50054c*_0x5aea36,_0x5be011=_0x5b01cf*_0x5aea36,_0xc47599=Math['round']((_0x413cef-_0x12531b)/0x2),_0x31fe47=Math['round']((_0x3f8b6c-_0x5be011)/0x2);_0x1b078c['blt'](_0x2e5340,0x0,0x0,_0x50054c,_0x5b01cf,_0xc47599,_0x31fe47,_0x12531b,_0x5be011);},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x390)]=function(_0x54666d){const _0x2966b8=_0x1ea107,_0x3f768d=Window_STB_TurnOrder[_0x2966b8(0x29a)],_0x343d1e=this[_0x2966b8(0x391)](),_0x2c9902=this['bitmapHeight'](),_0x3071e2=Math['min'](_0x343d1e,_0x2c9902);this[_0x2966b8(0x211)][_0x2966b8(0x373)]=new Bitmap(_0x343d1e,_0x2c9902);const _0x9e1812=this['_graphicSprite'][_0x2966b8(0x373)],_0x220495=Math[_0x2966b8(0x23c)](0x1,_0x3071e2/_0x54666d[_0x2966b8(0x30d)],_0x3071e2/_0x54666d[_0x2966b8(0x280)]),_0x1c955a=_0x54666d['width']*_0x220495,_0x4bdc74=_0x54666d[_0x2966b8(0x280)]*_0x220495,_0xe5a171=Math[_0x2966b8(0x31e)]((_0x343d1e-_0x1c955a)/0x2),_0x21dd8d=Math[_0x2966b8(0x31e)]((_0x2c9902-_0x4bdc74)/0x2);_0x9e1812[_0x2966b8(0x1c0)](_0x54666d,0x0,0x0,_0x54666d[_0x2966b8(0x30d)],_0x54666d[_0x2966b8(0x280)],_0xe5a171,_0x21dd8d,_0x1c955a,_0x4bdc74);},Sprite_STB_TurnOrder_Battler['prototype'][_0x1ea107(0x314)]=function(){const _0x1dd944=_0x1ea107,_0x57a9ba=this[_0x1dd944(0x1e4)]();if(!_0x57a9ba)return;if(!_0x57a9ba[_0x1dd944(0x388)]())return;if(this[_0x1dd944(0x1cb)]===_0x57a9ba[_0x1dd944(0x26a)]())return;this['_graphicHue']=_0x57a9ba['battlerHue'](),this[_0x1dd944(0x211)][_0x1dd944(0x24b)](_0x57a9ba[_0x1dd944(0x22e)]()?0x0:this[_0x1dd944(0x1cb)]);},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)][_0x1ea107(0x35b)]=function(){const _0x1291df=_0x1ea107;if(!this['_letterSprite'])return;const _0x2784ec=this[_0x1291df(0x1e4)]();if(!_0x2784ec)return;if(this['_letter']===_0x2784ec['_letter']&&this[_0x1291df(0x2de)]===_0x2784ec[_0x1291df(0x2de)])return;this['_letter']=_0x2784ec[_0x1291df(0x35f)],this[_0x1291df(0x2de)]=_0x2784ec[_0x1291df(0x2de)];const _0x3d8ca5=Window_STB_TurnOrder[_0x1291df(0x29a)],_0x4f8e39=this[_0x1291df(0x2d8)](),_0x5c7d53=this[_0x1291df(0x391)](),_0x31278d=this['bitmapHeight'](),_0x363b4d=this[_0x1291df(0x295)][_0x1291df(0x373)];_0x363b4d[_0x1291df(0x27a)]();if(!this[_0x1291df(0x2de)])return;_0x363b4d[_0x1291df(0x1d5)]=_0x3d8ca5[_0x1291df(0x222)]||$gameSystem[_0x1291df(0x340)](),_0x363b4d[_0x1291df(0x29c)]=_0x3d8ca5[_0x1291df(0x348)]||0x10,_0x4f8e39?_0x363b4d[_0x1291df(0x23b)](this[_0x1291df(0x35f)][_0x1291df(0x2dc)](),0x0,_0x31278d/0x2,_0x5c7d53,_0x31278d/0x2,'center'):_0x1291df(0x36b)!==_0x1291df(0x36b)?(_0x27e290[_0x1291df(0x3b6)]=_0x1fb3d4[_0x1291df(0x31e)]((_0x41f10a[_0x1291df(0x30d)]-_0x28bffb['min'](_0x17e621['boxWidth'],_0x6d6166[_0x1291df(0x30d)]))/0x2),_0x2529c1[_0x1291df(0x1fa)]=_0x369790['round']((_0x4eab96[_0x1291df(0x280)]-_0x7aa525[_0x1291df(0x23c)](_0x51305f['boxHeight'],_0x268fe8[_0x1291df(0x280)]))/0x2)):_0x363b4d[_0x1291df(0x23b)](this[_0x1291df(0x35f)][_0x1291df(0x2dc)](),0x0,0x2,_0x5c7d53-0x8,_0x31278d-0x4,_0x1291df(0x2ba));},Sprite_STB_TurnOrder_Battler['prototype'][_0x1ea107(0x266)]=function(){const _0x39c6e8=_0x1ea107,_0x46bb76=this[_0x39c6e8(0x1e4)]();if(!_0x46bb76)return;const _0x11ce0d=_0x46bb76['battler']();if(!_0x11ce0d)return;const _0x35cd40=_0x11ce0d[_0x39c6e8(0x26e)]();if(!_0x35cd40)return;this[_0x39c6e8(0x397)](_0x35cd40[_0x39c6e8(0x362)]);},Sprite_STB_TurnOrder_Battler[_0x1ea107(0x33a)]['getStateTooltipBattler']=function(){const _0x32d3de=_0x1ea107;return this[_0x32d3de(0x1e4)]();},VisuMZ['BattleSystemSTB']['Window_Help_setItem']=Window_Help['prototype'][_0x1ea107(0x2ff)],Window_Help[_0x1ea107(0x33a)][_0x1ea107(0x2ff)]=function(_0x14ebc6){const _0x2d01c9=_0x1ea107;if(BattleManager[_0x2d01c9(0x323)]()&&_0x14ebc6&&_0x14ebc6['note']&&_0x14ebc6[_0x2d01c9(0x25b)][_0x2d01c9(0x378)](/<(?:STB) HELP>\s*([\s\S]*)\s*<\/(?:STB) HELP>/i)){if(_0x2d01c9(0x269)===_0x2d01c9(0x2e8))return _0x5334a9['x']-_0x3cf3fd['x'];else this['setText'](String(RegExp['$1']));}else VisuMZ[_0x2d01c9(0x27f)][_0x2d01c9(0x1d7)][_0x2d01c9(0x39e)](this,_0x14ebc6);};function _0x3d1b(){const _0x795ed6=['_homeY','clearSTB','updatePosition','selectNextActorSTB','svBattlerName','initMembersBattleSystemSTB','ivGTa','becomeSTBExploited','vltvh','createBackgroundSprite','svactor','_handlers','remove','setItem','some','aiOkL','friendsUnit','getStateIdWithName','ExploiterStates','_fadeTarget','makeSTBSpeed','push','lQVMY','NUM','getBattleSystem','updateVisibility','compareBattlerSprites','width','RcsRM','Exploit','TurnResetExploits','isSceneBattle','loadSystem','InitialSpeedJS','updateGraphicHue','startFade','OrderDirection','createInitialPositions','unshift','_helpWindow','_stbTurnOrderVisible','kPpjb','AaNoQ','25515IckxUy','round','createSTBTurnOrderWindow','MultipleExploits','stbExploiterStates','hide','isSTB','createTurnOrderSTBGraphicFaceName','changeSvActorGraphicBitmap','SpriteLength','clearTurnOrderSTBGraphics','updateSidePosition','initHomePositions','executeDamageSTB','Game_Action_applyGlobal','selectAllActions','ExtraActions','ceil','selectNextActor','center','#000000','canMove','StbTurnOrderActorIcon','gEMcf','hxMkz','BattleManager_endAction','allBattleMembers','battlerName','_homeX','prototype','RegExp','FAcqx','NextTurnSavedSpeedJS','isSideView','MbRyo','mainFontFace','_actionBattlers','ParseStateData','vsActorsFullExploit','TurnOrder','StbTurnOrderActorFace','startTurn','stepForward','EnemyBattlerFontSize','_phase','_targetHomeY','isSTBExploitSystemEnabled','canInput','lJhWX','Exploiter','AnimationID','iconWidth','boxHeight','_currentActor','numActions','_graphicType','commandCancel','GQyjX','_positionTargetX','requestFauxAnimation','FaceName','stbCannotBeExploited','updateLetter','blcht','Actors','isActionValid','_letter','repositionLogWindowSTB','rSGvH','_blendColor','ScreenBuffer','_actions','%1SystemBg','startInputSTB','MeAEW','UjLGC','subject','_positionTargetY','YDgYT','SystemTurnOrderVisibility','TnOXs','getColor','length','addInnerChild','_position','vEiph','bitmap','_positionDuration','sIYCR','KpGBc','createBattlerRect','match','isAppeared','_targetHomeX','applyGlobal','performActionEnd','_graphicSv','includes','HunhW','createTestBitmap','TurnOrderSTBGraphicFaceName','SubjectDistance','_graphicFaceIndex','FrsFm','ARRAYNUM','rbaAG','constructor','isEnemy','Game_Battler_onBattleStart','qnVFO','2024OdEVKV','ARRAYSTRUCT','toUpperCase','%1BorderColor','BattleManager_isTurnBased','changeEnemyGraphicBitmap','bitmapWidth','EnemyBattlerFaceIndex','addLoadListener','Pwebt','initMembers','containerPosition','setBlendColor','startActorInput','PopupText','addState','actor','CustomJS','isImmortal','call','1349326bLDNVx','_stbTurnOrderIconIndex','_speed','Game_Battler_makeSpeed','QzsLl','JTIMX','reserveCommonEvent','xLEox','recalculateHome','VENIq','onTurnEnd','Scene_Battle_createAllWindows','UDTGv','sort','_stbTurnOrderGraphicType','onBattleStartSTB','WQTvp','changeFaceGraphicBitmap','hBTIk','opacity','_isBattleOver','Exploited','_backgroundSprite','_ogWindowLayerX','createBorderSprite','BattleManager_isTpb','EnemyBattlerFaceName','createGraphicSprite','AllowRandomSpeed','_graphicFaceName','stbCannotBeExploiter','blt','_containerWidth','_turnOrderInnerSprite','TurnOrderSTBGraphicFaceIndex','_stbExploitAdvantageFlag','RepositionLogWindow','addChild','left','areAllActorsExploited','gUdeI','GurBm','_graphicHue','_stbNextTurnSpeed','traitObjects','clearSTBNextTurnSpeed','members','_containerHeight','Enemies','startActorCommandSelection','padding','hQYaw','fontFace','critical','Window_Help_setItem','windowRect','bdZdJ','iiLOK','44cTDErU','_fullWidth','item','_fullHeight','IconSet','_logWindow','zVYms','isActor','RepositionTopHelpY','battler','isBattleSystemSTBTurnOrderVisible','BattleManager_startInput','applyGlobalBattleSystemSTB','boxWidth','createActorCommandWindowSTB','ruLby','osjcK','getChildIndex','176965YWKTux','EVAL','children','_isAppeared','UpdateFrames','status','faceWidth','_stbExploited','battleEnd','cancel','svActorHorzCells','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','visible','_ogWindowLayerY','nDTNV','Game_Battler_performCollapse','RepositionTopHelpX','_graphicIconIndex','Game_Battler_onTurnEnd','endActionSTB','battleSys','displayExploitedEffects','KuUwN','clearNextTurnSpeedSTB','ConvertParams','CTHzk','Game_Party_removeActor','TwLkR','vsEnemiesFullExploit','Visible','initialize','fYaQQ','CannotBeExploited','enemy','%1BgColor1','map','_graphicSprite','finishActorInput','maxBattleMembers','_statusWindow','endAction','Speed','SYEMJ','icon','removeActionBattlersSTB','BattleManager_battleSys','BorderThickness','svActorVertCells','oXLMd','HxozO','createBattlerSprites','_stateIDs','setSTBNextTurnSpeed','EnemyBattlerFontFace','CenterHorz','SVKmY','calculateTargetPositions','updateHomePosition','RepositionTopForHelp','onBattleStart','BattleManager_finishActorInput','initBattleSystemSTB','FQRzJ','removeActor','OhwjR','hasSvBattler','update','isAlive','ExploitCritical','10LVCHJA','parse','BlNVG','processUpdateGraphic','setSTBGraphicIconIndex','updateTurnOrderSTB','makeSpeed','createAllWindows','bind','drawText','min','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_isAlive','fillRect','kTXQY','ARRAYSTR','BattleManager_isActiveTpb','setSTBExploited','close','CannotBeExploiter','_subject','updateBattleContainerOrder','updateTurnOrder','max','top','setHue','2945294zgtYMG','FlashDuration','_homeDuration','setupTextPopup','BattleManager_makeActionOrders','ExploitedStates','shift','hasSTBExploited','createTurnOrderSTBGraphicIconIndex','loadSvActor','Scene_Battle_createActorCommandWindow','faceName','BattleCore','OAbqI','setup','note','parameters','ActorBattlerType','addSTBNextTurnSpeed','return\x200','_scene','LbIjL','anchor','checkTargetPositions','processTurn','floor','updateSelectionEffect','%1SystemBorder','_stbTurnOrderFaceIndex','rAOpJ','battlerHue','containerWindow','createTurnOrderSTBGraphicType','FaceIndex','mainSprite','faceIndex','isTpb','_forcedBattlers','MaxHorzSprites','qlMFP','IconIndex','EnemyBattlerType','_unit','format','processTurnSTB','aliveMembers','clear','DisplayOffsetX','Game_Action_speed','speed','VdyIi','BattleSystemSTB','height','gradientFillRect','Scene_Battle_commandFight','_fadeDuration','3jClCOW','allowRandomSpeed','isActiveTpb','STB','AMfos','Enemy','EnemyBattlerIcon','registerCommand','vKIVg','SpriteThin','ActorBattlerIcon','isTurnBased','Mute','cfWfy','Jkoip','filter','bitmapHeight','_letterSprite','zjqsT','Game_BattlerBase_initMembers','_stbTurnOrderFaceName','commandCancelSTB','Settings','Instant','fontSize','bottom','StbTurnOrderEnemyIcon','face','%1\x20%2\x20%3','Game_Battler_performActionEnd','performCollapse','_actorCommandWindow','checkOpacity','clearSTBExploit','_turnOrderContainer','Game_Actor_selectNextCommand','iconHeight','DisplayPosition','updateOpacity','performSTBExploiter','Mechanics','defaultPosition','ExploitEleWeakness','hmgUB','ayijL','iizlR','updateGraphic','scCzT','currentClass','updatePadding','description','Mirror','xkdZp','clearRect','right','version','changeIconGraphicBitmap','create','ShowMarkerBg','OJQqk','Chfsk','getNextSubject','%1BgColor2','setSTBExploitedFlag','startInput','createChildren','434792ASDatQ','EnableExploit','_inputting','_stbTurnOrderWindow','exit','WdFbt','fuoXe','_surprise','ForcedActions','BattleManager_processTurn','1252242utvRmW','smOcW','Game_BattlerBase_hide','_graphicEnemy','wMnwm','createTurnOrderSTBGraphicFaceIndex','3806740nimNkT','Game_System_initialize','isHorz','name','stbGainInstant','Actor','trim','MJzrA','_plural','BattleManager_selectNextActor','CzCic','commandFight','_windowLayer','_forcing','_index','performActionEndSTB','makeActionOrders','AddedStates','JVFdz','isSTBExploited','checkPosition','rzBhe','createLetterSprite','StbTurnOrderClearActorGraphic','nriro','selectNextCommand','TurnOrderSTBGraphicType','iKKze'];_0x3d1b=function(){return _0x795ed6;};return _0x3d1b();}function Window_STB_TurnOrder(){const _0xa59805=_0x1ea107;this[_0xa59805(0x20b)](...arguments);}Window_STB_TurnOrder[_0x1ea107(0x33a)]=Object[_0x1ea107(0x2bd)](Window_Base[_0x1ea107(0x33a)]),Window_STB_TurnOrder[_0x1ea107(0x33a)][_0x1ea107(0x387)]=Window_STB_TurnOrder,Window_STB_TurnOrder[_0x1ea107(0x29a)]=VisuMZ[_0x1ea107(0x27f)]['Settings']['TurnOrder'],Window_STB_TurnOrder[_0x1ea107(0x33a)]['initialize']=function(){const _0x2e405d=_0x1ea107,_0x461d0b=this['windowRect']();this[_0x2e405d(0x329)](_0x461d0b),Window_Base['prototype'][_0x2e405d(0x20b)][_0x2e405d(0x39e)](this,_0x461d0b),this[_0x2e405d(0x21f)](),this[_0x2e405d(0x30b)](),this[_0x2e405d(0x3b2)]=0x0;},Window_STB_TurnOrder[_0x1ea107(0x33a)][_0x1ea107(0x1d8)]=function(){const _0xa7aa1a=_0x1ea107;return this[_0xa7aa1a(0x377)]($gameParty[_0xa7aa1a(0x213)](),0x9,!![]);},Window_STB_TurnOrder[_0x1ea107(0x33a)][_0x1ea107(0x329)]=function(_0x5d2b71){const _0x3b88e0=_0x1ea107;this[_0x3b88e0(0x37a)]=this[_0x3b88e0(0x339)]=_0x5d2b71['x'],this[_0x3b88e0(0x34a)]=this[_0x3b88e0(0x2f2)]=_0x5d2b71['y'],this[_0x3b88e0(0x1dc)]=_0x5d2b71[_0x3b88e0(0x30d)],this[_0x3b88e0(0x1de)]=_0x5d2b71[_0x3b88e0(0x280)],this[_0x3b88e0(0x24e)]=0x0;},Window_STB_TurnOrder[_0x1ea107(0x33a)]['createBattlerRect']=function(_0x2dca26,_0xa891ed,_0x2c9003){const _0x226a9c=_0x1ea107,_0x5d2c85=Window_STB_TurnOrder[_0x226a9c(0x29a)],_0x45342d=this[_0x226a9c(0x2d8)]()?_0x5d2c85[_0x226a9c(0x272)]:_0x5d2c85['MaxVertSprites'],_0x231041=Math[_0x226a9c(0x23c)](_0x45342d,_0x2dca26+_0xa891ed),_0x564cd8=SceneManager['_scene'][_0x226a9c(0x214)]['height'],_0x252bb8=SceneManager[_0x226a9c(0x260)]['_helpWindow']['height'],_0x544df8=_0x5d2c85[_0x226a9c(0x382)],_0x7d6ce1=Graphics[_0x226a9c(0x280)]-_0x564cd8-_0x252bb8;let _0x256b35=0x0,_0x11d6c0=0x0,_0x15a754=0x0,_0x418a62=0x0;switch(_0x5d2c85[_0x226a9c(0x2a9)]){case'top':_0x256b35=_0x5d2c85[_0x226a9c(0x28d)]*_0x231041+_0x544df8,_0x11d6c0=_0x5d2c85[_0x226a9c(0x326)],_0x15a754=Math['ceil']((Graphics[_0x226a9c(0x30d)]-_0x256b35)/0x2),_0x418a62=_0x5d2c85['ScreenBuffer'];break;case'bottom':_0x256b35=_0x5d2c85[_0x226a9c(0x28d)]*_0x231041+_0x544df8,_0x11d6c0=_0x5d2c85[_0x226a9c(0x326)],_0x15a754=Math[_0x226a9c(0x32e)]((Graphics['width']-_0x256b35)/0x2),_0x418a62=Graphics[_0x226a9c(0x280)]-_0x564cd8-_0x11d6c0-_0x5d2c85['ScreenBuffer'];break;case _0x226a9c(0x1c7):_0x256b35=_0x5d2c85[_0x226a9c(0x326)],_0x11d6c0=_0x5d2c85[_0x226a9c(0x28d)]*_0x231041+_0x544df8,_0x15a754=_0x5d2c85[_0x226a9c(0x363)],_0x418a62=Math[_0x226a9c(0x32e)]((_0x7d6ce1-_0x11d6c0)/0x2),_0x418a62+=_0x252bb8;break;case _0x226a9c(0x2ba):_0x256b35=_0x5d2c85[_0x226a9c(0x326)],_0x11d6c0=_0x5d2c85[_0x226a9c(0x28d)]*_0x231041+_0x544df8,_0x15a754=Graphics['width']-_0x256b35-_0x5d2c85[_0x226a9c(0x363)],_0x418a62=Math['ceil']((_0x7d6ce1-_0x11d6c0)/0x2),_0x418a62+=_0x252bb8;break;}if(!_0x2c9003){if('CPoPr'!==_0x226a9c(0x2af)){const _0x98bf9c=Window_STB_TurnOrder[_0x226a9c(0x29a)]['OrderDirection'];let _0xcc6da=Math['min'](_0x45342d,Math['min']($gameParty[_0x226a9c(0x213)]()+0x8)-_0x231041);switch(_0x5d2c85[_0x226a9c(0x2a9)]){case _0x226a9c(0x24a):case'bottom':_0x98bf9c&&(_0x15a754-=_0xcc6da*_0x5d2c85[_0x226a9c(0x28d)]);break;}}else _0x6b59d3[_0x226a9c(0x39c)][_0x226a9c(0x39e)](this,_0x4b4498,_0x1a0380);}return _0x15a754+=_0x5d2c85[_0x226a9c(0x27b)],_0x418a62+=_0x5d2c85['DisplayOffsetY'],new Rectangle(_0x15a754,_0x418a62,_0x256b35,_0x11d6c0);},Window_STB_TurnOrder[_0x1ea107(0x33a)][_0x1ea107(0x2b5)]=function(){const _0x52fcb8=_0x1ea107;this[_0x52fcb8(0x1d3)]=0x0;},Window_STB_TurnOrder[_0x1ea107(0x33a)][_0x1ea107(0x2d8)]=function(){const _0x13b240=_0x1ea107,_0x20d027=Window_STB_TurnOrder[_0x13b240(0x29a)],_0x54efab=[_0x13b240(0x24a),_0x13b240(0x29d)][_0x13b240(0x37e)](_0x20d027['DisplayPosition']);return _0x54efab;},Window_STB_TurnOrder[_0x1ea107(0x33a)][_0x1ea107(0x21f)]=function(){const _0xd650a0=_0x1ea107;this['_turnOrderInnerSprite']=new Sprite(),this[_0xd650a0(0x370)](this['_turnOrderInnerSprite']),this['_turnOrderContainer']=[];for(let _0x578160=0x0;_0x578160<$gameParty[_0xd650a0(0x213)]();_0x578160++){if(_0xd650a0(0x2cb)===_0xd650a0(0x2b3))this[_0xd650a0(0x22a)]();else{const _0xcc3b2f=new Sprite_STB_TurnOrder_Battler($gameParty,_0x578160);this[_0xd650a0(0x1c2)]['addChild'](_0xcc3b2f),this[_0xd650a0(0x2a6)][_0xd650a0(0x307)](_0xcc3b2f);}}for(let _0x12a2ad=0x0;_0x12a2ad<$gameTroop[_0xd650a0(0x1cf)]()[_0xd650a0(0x36f)];_0x12a2ad++){const _0x54c1ac=new Sprite_STB_TurnOrder_Battler($gameTroop,_0x12a2ad);this[_0xd650a0(0x1c2)]['addChild'](_0x54c1ac),this[_0xd650a0(0x2a6)][_0xd650a0(0x307)](_0x54c1ac);}},Window_STB_TurnOrder[_0x1ea107(0x33a)][_0x1ea107(0x22f)]=function(){const _0x26c3aa=_0x1ea107;Window_Base[_0x26c3aa(0x33a)]['update'][_0x26c3aa(0x39e)](this),this[_0x26c3aa(0x226)](),this[_0x26c3aa(0x2f4)](),this[_0x26c3aa(0x328)](),this[_0x26c3aa(0x247)](),this[_0x26c3aa(0x30b)]();},Window_STB_TurnOrder['prototype'][_0x1ea107(0x226)]=function(){const _0x5d1cf9=_0x1ea107;if(this['_homeDuration']>0x0){if(_0x5d1cf9(0x2fa)!=='uzeVV'){const _0x1539f4=this[_0x5d1cf9(0x24e)];this[_0x5d1cf9(0x339)]=(this[_0x5d1cf9(0x339)]*(_0x1539f4-0x1)+this[_0x5d1cf9(0x37a)])/_0x1539f4,this[_0x5d1cf9(0x2f2)]=(this[_0x5d1cf9(0x2f2)]*(_0x1539f4-0x1)+this[_0x5d1cf9(0x34a)])/_0x1539f4,this[_0x5d1cf9(0x24e)]--,this['_homeDuration']<=0x0&&(this[_0x5d1cf9(0x339)]=this['_targetHomeX'],this[_0x5d1cf9(0x2f2)]=this['_targetHomeY']);}else return _0x50b03f(_0x1c077d['$2']);}},Window_STB_TurnOrder[_0x1ea107(0x33a)][_0x1ea107(0x2f4)]=function(){const _0x7a2739=_0x1ea107,_0x7e0efc=Window_STB_TurnOrder[_0x7a2739(0x29a)];if(_0x7e0efc['DisplayPosition']!==_0x7a2739(0x24a))return;if(!_0x7e0efc[_0x7a2739(0x227)])return;const _0xdfe12c=SceneManager[_0x7a2739(0x260)]['_helpWindow'];if(!_0xdfe12c)return;if(_0xdfe12c[_0x7a2739(0x1f9)])_0x7a2739(0x217)===_0x7a2739(0x217)?(this['x']=this[_0x7a2739(0x339)]+(_0x7e0efc[_0x7a2739(0x1fd)]||0x0),this['y']=this[_0x7a2739(0x2f2)]+(_0x7e0efc['RepositionTopHelpY']||0x0)):this[_0x7a2739(0x3a0)]=_0x9fa15d;else{if(_0x7a2739(0x2eb)!==_0x7a2739(0x2e0))this['x']=this[_0x7a2739(0x339)],this['y']=this['_homeY'];else{if(this[_0x7a2739(0x37d)]!==_0x5cc0fc[_0x7a2739(0x2f6)]())return this[_0x7a2739(0x235)]();}}const _0x4ffb83=SceneManager[_0x7a2739(0x260)][_0x7a2739(0x2e2)];Window_STB_TurnOrder['_ogWindowLayerX']===undefined&&(Window_STB_TurnOrder['_ogWindowLayerX']=Math['round']((Graphics['width']-Math[_0x7a2739(0x23c)](Graphics['boxWidth'],_0x4ffb83['width']))/0x2),Window_STB_TurnOrder['_ogWindowLayerY']=Math['round']((Graphics['height']-Math[_0x7a2739(0x23c)](Graphics[_0x7a2739(0x351)],_0x4ffb83[_0x7a2739(0x280)]))/0x2)),this['x']+=_0x4ffb83['x']-Window_STB_TurnOrder[_0x7a2739(0x3b6)],this['y']+=_0x4ffb83['y']-Window_STB_TurnOrder[_0x7a2739(0x1fa)];},Window_STB_TurnOrder[_0x1ea107(0x33a)][_0x1ea107(0x328)]=function(){const _0x1fb929=_0x1ea107,_0x212e8f=Window_STB_TurnOrder['Settings'];if([_0x1fb929(0x24a)]['includes'](_0x212e8f[_0x1fb929(0x2a9)]))return;this['x']=this[_0x1fb929(0x339)],this['y']=this[_0x1fb929(0x2f2)];const _0x4c51c2=SceneManager[_0x1fb929(0x260)][_0x1fb929(0x2e2)];this['x']+=_0x4c51c2['x'],this['y']+=_0x4c51c2['y'];},Window_STB_TurnOrder['prototype'][_0x1ea107(0x247)]=function(){const _0x2f4ab0=_0x1ea107;if(!this['_turnOrderInnerSprite'])return;const _0xddd3b7=this['_turnOrderInnerSprite'][_0x2f4ab0(0x1ef)];if(!_0xddd3b7)return;_0xddd3b7['sort'](this[_0x2f4ab0(0x30c)][_0x2f4ab0(0x23a)](this));},Window_STB_TurnOrder[_0x1ea107(0x33a)][_0x1ea107(0x30c)]=function(_0x22b5c6,_0x4bd353){const _0x2284d3=_0x1ea107,_0xc51bd7=this['isHorz'](),_0x2ff354=Window_STB_TurnOrder[_0x2284d3(0x29a)][_0x2284d3(0x316)];if(_0xc51bd7&&!_0x2ff354){if('dUTzb'!==_0x2284d3(0x2f8))return _0x22b5c6['x']-_0x4bd353['x'];else this[_0x2284d3(0x3a0)]=this['createTurnOrderSTBGraphicIconIndex']();}else{if(_0xc51bd7&&_0x2ff354){if(_0x2284d3(0x261)!==_0x2284d3(0x261))this['initMembersBattleSystemSTB']();else return _0x4bd353['x']-_0x22b5c6['x'];}else{if(!_0xc51bd7&&_0x2ff354){if(_0x2284d3(0x203)!==_0x2284d3(0x335))return _0x22b5c6['y']-_0x4bd353['y'];else this[_0x2284d3(0x1f4)]=![];}else{if(!_0xc51bd7&&!_0x2ff354){if(_0x2284d3(0x2cc)==='yqhqD')this[_0x2284d3(0x352)]=null,this[_0x2284d3(0x2c8)]=![];else return _0x4bd353['y']-_0x22b5c6['y'];}}}}},Window_STB_TurnOrder[_0x1ea107(0x33a)][_0x1ea107(0x30b)]=function(){const _0x1020b0=_0x1ea107;this[_0x1020b0(0x1f9)]=$gameSystem[_0x1020b0(0x1e5)]();},Window_STB_TurnOrder[_0x1ea107(0x33a)][_0x1ea107(0x248)]=function(_0x3d7071){const _0x7d7a75=_0x1ea107;this[_0x7d7a75(0x2a6)][_0x7d7a75(0x3ac)]((_0x27be0f,_0x32c366)=>{const _0x1e1fc2=_0x7d7a75;return _0x27be0f['containerPosition']()-_0x32c366[_0x1e1fc2(0x396)]();}),this[_0x7d7a75(0x3a7)]();if(!_0x3d7071)return;for(const _0x5cce0c of this[_0x7d7a75(0x2a6)]){if(_0x7d7a75(0x2c0)!=='yyxzY'){if(!_0x5cce0c)continue;_0x5cce0c[_0x7d7a75(0x22f)](),_0x5cce0c[_0x7d7a75(0x374)]=0x0;}else return this[_0x7d7a75(0x3ad)]===_0x26c223&&(this[_0x7d7a75(0x3ad)]=this[_0x7d7a75(0x26c)]()),this[_0x7d7a75(0x3ad)];}},Window_STB_TurnOrder[_0x1ea107(0x33a)][_0x1ea107(0x3a7)]=function(){const _0x5d5a25=_0x1ea107;if(!this[_0x5d5a25(0x2d8)]())return;const _0x456d8c=VisuMZ[_0x5d5a25(0x27f)][_0x5d5a25(0x29a)][_0x5d5a25(0x344)];if(!_0x456d8c[_0x5d5a25(0x223)])return;const _0x56a29a=$gameParty['members']()[_0x5d5a25(0x293)](_0x1a670d=>_0x1a670d&&_0x1a670d[_0x5d5a25(0x230)]()&&_0x1a670d[_0x5d5a25(0x379)]())[_0x5d5a25(0x36f)],_0x562e4a=$gameTroop['members']()['filter'](_0x417872=>_0x417872&&_0x417872['isAlive']()&&_0x417872[_0x5d5a25(0x379)]())[_0x5d5a25(0x36f)],_0x47d7a7=this[_0x5d5a25(0x377)](_0x56a29a,_0x562e4a);this[_0x5d5a25(0x37a)]=_0x47d7a7['x'],this[_0x5d5a25(0x34a)]=_0x47d7a7['y'],(this[_0x5d5a25(0x37a)]!==this[_0x5d5a25(0x339)]||this[_0x5d5a25(0x34a)]!==this['_homeY'])&&(_0x5d5a25(0x273)!=='JnerG'?this['_homeDuration']=_0x456d8c[_0x5d5a25(0x1f1)]:this[_0x5d5a25(0x305)]=_0x362aa7[_0x5d5a25(0x230)]()&&_0x3dd697[_0x5d5a25(0x379)]()?0xff:0x0);};
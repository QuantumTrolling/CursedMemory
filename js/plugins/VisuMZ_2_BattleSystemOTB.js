//=============================================================================
// VisuStella MZ - Battle System - OTB - Order Turn Battle
// VisuMZ_2_BattleSystemOTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemOTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemOTB = VisuMZ.BattleSystemOTB || {};
VisuMZ.BattleSystemOTB.version = 1.12;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.12] [BattleSystemOTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_OTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the RPG Maker MZ battle system to "Order Turn Battle",
 * a turn-based battle system where actions are executed immediately and the
 * orders for both the current and next turn are not only visible, but also
 * malleable. New mechanics are introduced where the player can manipulate the
 * turn order of an action's user or action's target in various ways they want.
 * 
 * The two Turn Orders are displayed at the top of the top of the screen to
 * give the player a clear understanding of who's turn it will be when it
 * becomes time to act, making it easier and viable for the player to formulate
 * strategies and adapt to the situation in battle.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "otb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Utilizes the balanced AGI nature of the Default Turn Battle system.
 * * Allows for actions to execute immediately upon selection.
 * * Two Turn Order Displays appear at the top of the screen, giving the player
 *   an idea of who's turn it will be and when, for both the current turn and
 *   the next turn.
 * * Skills and Items can have an "Instant Use" effect, which allows them to
 *   perform an action immediately without using up a turn.
 * * Skills and Items can manipulate the turn order of the action's user or the
 *   action's target(s). This can apply to either the current turn or the next
 *   turn, depending on the notetags and/or action effects used.
 * * The Turn Order Display will give a preview on how turn orders will change
 *   upon specific skills and/or items being used.
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
 * Turn Order Displays
 * 
 * The Two Turn Order Displays will capture the battle's current and next turn
 * orders determined by the BattleManager. This feature does not overwrite any
 * functions, but the Turn Order Displays may or may not conflict with any
 * existing HUD elements that are already positioned on the screen. If so, you
 * can choose to offset the Turn Order Display or move it to a different part
 * of the screen through the plugin parameters.
 * 
 * ---
 * 
 * Agility
 * 
 * Agility behaves slightly different from normal when it comes to the Order
 * Turn Battle system. Aside from the first turn in battle, agility will always
 * calculate the turn order for the "Next Turn" when conducted. This means that
 * any changes to agility values will not have any effect on the next turn's
 * already established turn order.
 * 
 * However, this can be remedied by utilizing the notetags provided by this
 * plugin to alter the Next Turn orders for specific targets. In fact, for
 * skill and item "effects" that add AGI Buffs and/or Debuffs, the target's
 * turn position on the Turn Order Display will be manipulated in accordance.
 * This auto-conversion feature can be disabled in the Plugin Parameters.
 * 
 * ---
 * 
 * Action Speed
 * 
 * Because the Order Turn Battle system already calculates agility speeds
 * before selecting an action to perform, the effects of the actioon speed will
 * not work the same way it did with the default battle system. Instead, the
 * Action Speed will be sent through a formula to determine its effect on the
 * following turn, either pushing the user ahead in next turn's turn order
 * (with a positive speed value) or back (with a negative speed value).
 * 
 * This option can have its formula altered or straight up disabled in the
 * Plugin Parameters.
 * 
 * ---
 * 
 * Infinity Speed and Clamping
 * 
 * Since Action Speeds are decided in such a way, enemies that will survive a
 * stun state past two turns will have "Infinity" speed on the recovery turn,
 * allowing them to act first relative to the rest of the battle participants
 * in order to balance out the turns they've lost.
 * 
 * Enemies with "Infinity" speed cannot be overtaken through turn order
 * manipulation while they are on the "Next Turn" order. If anything, battlers
 * who shift their turn order faster will be just trailing behind them, thus
 * the "clamping" effect. However if this occurs during the "Current Turn"
 * order, all is fair game and any battler can overtake them. Plan out your
 * battle system effects carefully with these rules in mind.
 * 
 * If you do not like the idea of Infinity Speed and/or Clamping, you can turn
 * them off in the Plugin Parameters.
 * 
 * This effect does not affect stun states that last only one turn. The effect
 * will only occur with stun states that last 2 turns or more.
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
 * Force Actions
 * 
 * Due to how OTB behaves, Force Actions have be adjusted to fit the battle
 * system. With other battle systems, force actions are added into a hidden
 * queue that would act upon after the current battler finishes his/her current
 * action. The new changes made with force actions is that they now appear on
 * the queue visibly.
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
 * VisuMZ_2_PartySystem
 * 
 * In battle, the player cannot change entire parties at once from the Party
 * Command Window. The feature will be unaccessible while Order Turn Battle is
 * in play. However, the player can still change party members through the
 * Actor Command Window by having actors replace other actors. Party changing
 * is also available through battle events, Common Events, and script calls.
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
 * === General OTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <OTB Help>
 *  description
 *  description
 * </OTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under OTB.
 * - This is primarily used if the skill behaves differently in OTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to OTB.
 *
 * ---
 * 
 * === OTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the OTB Turn Order Display
 * 
 * ---
 *
 * <OTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <OTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <OTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Instant Use-Related Notetags ===
 * 
 * ---
 *
 * <OTB Instant>
 * <OTB Instant Use>
 * <OTB Instant Cast>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to be used immediately without consuming a turn.
 *
 * ---
 * 
 * === Added Action Notetags ===
 * 
 * ---
 * 
 * <OTB User Add Current Turn Actions: x>
 * <OTB User Add Next Turn Actions: x>
 * 
 * - Used for: Skill, Item Notetags
 * - Adds extra actions for the user to perform during the current/next turn.
 *   - Added actions will go towards the back of the action list.
 *   - Multi-hit skills/items will trigger this effect multiple times.
 * - Replace 'x' with a number representing the amount of actions to add.
 * 
 * ---
 * 
 * <OTB Target Add Current Turn Actions: x>
 * <OTB Target Add Next Turn Actions: x>
 * 
 * - Used for: Skill, Item Notetags
 * - Adds extra actions for the target to perform during the current/next turn.
 *   - Added actions will go towards the back of the action list.
 *   - Multi-hit skills/items will trigger this effect multiple times.
 * - Replace 'x' with a number representing the amount of actions to add.
 * 
 * ---
 * 
 * === Turn Order Manipulation-Related Notetags ===
 * 
 * ---
 *
 * <OTB User Current Turn: +x>
 * <OTB User Next Turn: +x>
 * <OTB User Follow Turn: +x>
 *
 * <OTB User Current Turn: -x>
 * <OTB User Next Turn: -x>
 * <OTB User Follow Turn: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the user's position in the turn order for the current turn, next
 *   turn, or whichever turn is following.
 * - If using the "Follow" variant, if the user has actions left for the
 *   current turn, it will affect the current turn. If not, it affects the
 *   next turn instead.
 * - Replace 'x' with a number representing the number of slots to change.
 *   - Negative numbers move the user closer to the front.
 *   - Positive numbers move the user towards the back.
 * - This effect only occurs once per skill/item use and at the start of the
 *   action when initializing the skill/item.
 *
 * ---
 *
 * <OTB Target Current Turn: +x>
 * <OTB Target Next Turn: +x>
 * <OTB Target Follow Turn: +x>
 *
 * <OTB Target Current Turn: -x>
 * <OTB Target Next Turn: -x>
 * <OTB Target Follow Turn: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the target's position in the turn order for the current turn, next
 *   turn, or whichever turn is following.
 * - If using the "Follow" variant, if the target has actions left for the
 *   current turn, it will affect the current turn. If not, it affects the
 *   next turn instead.
 * - Replace 'x' with a number representing the number of slots to change.
 *   - Negative numbers move the target closer to the front.
 *   - Positive numbers move the target towards the back.
 * - This effect will occur as many times as there are successfully connected
 *   hits for each target, meaning a target can have its turn order shifted
 *   multiple times.
 * - These are best used with single target skills/items as multi-target skills
 *   may shift multiple targets back and forth with each other if they are
 *   adjacent to one another.
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
 * Actor: Change OTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the OTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change OTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the OTB Turn Order.
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
 * Actor: Clear OTB Turn Order Graphic
 * - Clears the OTB Turn Order graphics for the actor(s).
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
 * Enemy: Change OTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the OTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change OTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the OTB Turn Order.
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
 * Enemy: Clear OTB Turn Order Graphic
 * - Clears the OTB Turn Order graphics for the enemy(ies).
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
 * System: OTB Turn Order Visibility
 * - Determine the visibility of the OTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the OTB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Conversion Settings
 * ============================================================================
 *
 * Automatically converts specific mechanics to fit OTB.
 *
 * ---
 *
 * Buffs
 * 
 *   AGI Buff => Current:
 *   - Auto-convert AGI Buff effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   AGI Buff => Next:
 *   - Auto-convert AGI Buff effects for Items/Skills to speed up target's
 *     next Turn Order?
 *
 * ---
 *
 * Debuffs
 * 
 *   AGI Debuff => Current:
 *   - Auto-convert AGI Debuff effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   AGI Debuff => Next:
 *   - Auto-convert AGI Debuff effects for Items/Skills to speed up target's
 *     next Turn Order?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of Battle System OTB. These range from how Action
 * Times are handled to speed.
 *
 * ---
 *
 * Action Times+
 * 
 *   Enable Action Times?:
 *   - Enable Action Times+ to have an effect on OTB?
 * 
 *     Randomize Order?:
 *     - If enabled, randomize the action order for added actions?
 *
 * ---
 *
 * Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   Post-Stun Infinity?:
 *   - After a 2+ turn stun states, battlers have infinity speed for their
 *     recovery turn.
 *   - Once again, this only applies to stun states that last 2+ turns.
 * 
 *     Infinity Clamp?:
 *     - Prevents turn order manipulation from going faster than infinity
 *       speed battlers.
 * 
 *   JS: Initial Speed:
 *   - Code used to calculate initial speed at the start of battle.
 * 
 *   JS: Speed => Order:
 *   - Code used to calculate how action speeds alter next turn's order.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System OTB. These adjust how the
 * two visible turn orders appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 *     - Top
 *     - Bottom
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *     Offset X:
 *     - Reposition the display's X coordinates by this much when the Help
 *       Window is visible.
 * 
 *     Offset Y:
 *     - Reposition the display's Y coordinates by this much when the Help
 *       Window is visible.
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *     - Left to Right
 *     - Right to Left
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
 * UI Background
 * 
 *   Background Style:
 *   - Select the style you want for the background.
 *     - fill
 *     - gradient
 *     - image
 *     - transparent
 * 
 *   Image Filename:
 *   - When using the "image" style, select an image from /img/system/ as the
 *     background image.
 * 
 *     Offset X:
 *     - How much do you want to offset the Background Image's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the Background Image's Y position?
 * 
 * ---
 * 
 * UI Text
 * 
 *   Font Size:
 *   - The font size used for parameter values.
 * 
 *   Active Battler Text:
 *   - Text used to display the active battler.
 *   - This text will always be center aligned.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Current Turn Text:
 *   - Text used to display the current turn.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Next Turn Text:
 *   - Text used to display the next turn.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Text Align:
 *   - Text alignment for the Current and Next Turn texts?
 *     - auto
 *     - left
 *     - center
 *     - right
 * 
 * ---
 * 
 * Slots
 * 
 *   Width:
 *   - How many pixels wide should the slots be on the Turn Order display?
 * 
 *   Height:
 *   - How many pixels tall should the slots be on the Turn Order display?
 * 
 *   Preview Scale:
 *   - How much do you want to scale the preview sprites by?
 *   - Use a number between 0 and 1 for the best results.
 * 
 *     Offset X:
 *     - How much do you want to offset the Preview Sprites' X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the Preview Sprites' Y position?
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
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
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
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
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
 * Version 1.12: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the OTB Turn Order faces and icons to not change
 *    properly for actors and enemies.
 * 
 * Version 1.10: July 7, 2022
 * * Feature Update!
 * ** When the "Recover All" event command revives a dead unit, that revived
 *    unit can gain actions back if all other conditions are met. Update made
 *    by Olivia.
 * 
 * Version 1.09: June 2, 2022
 * * Documentation Update!
 * ** Added "Force Actions" to "Major Updates" section.
 * *** Due to how OTB behaves, Force Actions have be adjusted to fit the battle
 *     system. With other battle systems, force actions are added into a hidden
 *     queue that would act upon after the current battler finishes his/her
 *     current action. The new changes made with force actions is that they now
 *     appear on the queue visibly.
 * * Bug Fixes!
 * ** Fixed a bug that caused Forced Actions to not work properly while in OTB.
 *    Changes made to Forced Actions will now insert new actions at the front
 *    of the current action queue. Fix made by Olivia.
 * 
 * Version 1.08: March 10, 2022
 * * Feature Update!
 * ** OTB Instant Actions should now appear in the turn order in a more
 *    sensible fashion. Update made by Olivia.
 * 
 * Version 1.07: February 24, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Olivia:
 * *** <OTB User Add Current Turn Actions: x>
 * *** <OTB User Add Next Turn Actions: x>
 * *** <OTB Target Add Current Turn Actions: x>
 * *** <OTB Target Add Next Turn Actions: x>
 * **** Adds extra actions for the user/target to perform during the
 *      current/next turn.
 * **** Added actions will go towards the back of the action list.
 * **** Multi-hit skills/items will trigger this effect multiple times.
 * 
 * Version 1.05: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.04: August 6, 2021
 * * Bug Fixes!
 * ** Enemies with multiple actions will no longer step forward when it's not
 *    their turn. Fix made by Olivia.
 * 
 * Version 1.03: June 25, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 16, 2021
 * * Bug Fixes!
 * ** Post-stun infinity clamping should now be adjusted properly for
 *    previewing turn order changes.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Subsequent battles will properly reset the turn order. Fix by Olivia.
 * 
 * Version 1.00 Official Release Date: April 26, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderActorIcon
 * @text Actor: Change OTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the OTB Turn Order.
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
 * @command OtbTurnOrderActorFace
 * @text Actor: Change OTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the OTB Turn Order.
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
 * @command OtbTurnOrderClearActorGraphic
 * @text Actor: Clear OTB Turn Order Graphic
 * @desc Clears the OTB Turn Order graphics for the actor(s).
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
 * @command OtbTurnOrderEnemyIcon
 * @text Enemy: Change OTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the OTB Turn Order.
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
 * @command OtbTurnOrderEnemyFace
 * @text Enemy: Change OTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the OTB Turn Order.
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
 * @command OtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear OTB Turn Order Graphic
 * @desc Clears the OTB Turn Order graphics for the enemy(ies).
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
 * @text System: OTB Turn Order Visibility
 * @desc Determine the visibility of the OTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the OTB Turn Order Display.
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
 * @param BattleSystemOTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Conversion:struct
 * @text Conversion Settings
 * @type struct<Conversion>
 * @desc Automatically converts specific mechanics to fit OTB.
 * @default {"Buffs":"","ConvertAgiBuffCurrent:eval":"true","ConvertAgiBuffNext:eval":"true","Debuffs":"","ConvertAgiDebuffCurrent:eval":"true","ConvertAgiDebuffNext:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of Battle System OTB.
 * @default {"Actions":"","EnableActionTimes:eval":"true","RandomizeActionTimesOrder:eval":"true","Speed":"","AllowRandomSpeed:eval":"false","PostStunInfinitySpeed:eval":"true","InfinityClamp:eval":"true","InitialSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\n\\n// Return Speed\\nreturn speed;\"","ConvertSpeedJS:func":"\"// Declare Constants\\nconst item = this.item();\\nconst modifier = 50;\\n\\n// Calculate Order Slots Changed\\nlet change = item.speed / (-modifier);\\nchange = (change >= 0) ? Math.ceil(change) : Math.floor(change);\\n\\n// Return Change\\nreturn change || 0;\""}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System OTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionTopHelpX:num":"+0","RepositionTopHelpY:num":"+96","RepositionLogWindow:eval":"true","LogWindowOffsetY:num":"+0","OrderDirection:eval":"false","SubjectDistance:num":"16","ScreenBuffer:num":"36","UiBackground":"","BgDimStyle:str":"gradient","BgImageFilename:str":"","BgImageOffsetX:num":"+0","BgImageOffsetY:num":"+0","UiText":"","UiFontSize:num":"16","UiSubjectText:str":"★","UiSubjectOffsetX:num":"+0","UiSubjectOffsetY:num":"-6","UiCurrentText:str":"✦CURRENT TURN✦","UiCurrentOffsetX:num":"+6","UiCurrentOffsetY:num":"-6","UiNextText:str":"✧NEXT TURN✧","UiNextOffsetX:num":"+6","UiNextOffsetY:num":"-6","UiAlignment:str":"auto","Slots":"","SpriteThin:num":"72","SpriteLength:num":"72","PreviewScale:num":"0.5","PreviewOffsetX:num":"+0","PreviewOffsetY:num":"+0","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","PreviewActorBorderColor:str":"0","ActorSystemBorder:str":"","PreviewActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","PreviewEnemyBorderColor:str":"0","EnemySystemBorder:str":"","PreviewEnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","PreviewActorBgColor1:str":"19","ActorBgColor2:str":"9","PreviewActorBgColor2:str":"0","ActorSystemBg:str":"","PreviewActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","PreviewEnemyBgColor1:str":"19","EnemyBgColor2:str":"18","PreviewEnemyBgColor2:str":"0","EnemySystemBg:str":"","PreviewEnemySystemBg:str":""}
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
 * Conversion Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Conversion:
 * 
 * @param Buffs
 *
 * @param ConvertAgiBuffCurrent:eval
 * @text AGI Buff => Current
 * @parent Buffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Buff effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiBuffNext:eval
 * @text AGI Buff => Next
 * @parent Buffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Buff effects for Items/Skills to speed up target's next Turn Order?
 * @default true
 * 
 * @param Debuffs
 *
 * @param ConvertAgiDebuffCurrent:eval
 * @text AGI Debuff => Current
 * @parent Debuffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Debuff effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiDebuffNext:eval
 * @text AGI Debuff => Next
 * @parent Debuffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Debuff effects for Items/Skills to speed up target's next Turn Order?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Actions
 * @text Action Times+
 *
 * @param EnableActionTimes:eval
 * @text Enable Action Times?
 * @parent Actions
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Action Times+ to have an effect on OTB?
 * @default true
 *
 * @param RandomizeActionTimesOrder:eval
 * @text Randomize Order?
 * @parent EnableActionTimes:eval
 * @type boolean
 * @on Randomize
 * @off Clumped
 * @desc If enabled, randomize the action order for added actions?
 * @default true
 * 
 * @param Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent Speed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param PostStunInfinitySpeed:eval
 * @text Post-Stun Infinity?
 * @parent Speed
 * @type boolean
 * @on Infinity
 * @off Normal
 * @desc After a 2+ turn stun states, battlers have infinity speed for their recovery turn.
 * @default true
 *
 * @param InfinityClamp:eval
 * @text Infinity Clamp?
 * @parent PostStunInfinitySpeed:eval
 * @type boolean
 * @on Enable Clamp
 * @off Disable Clamp
 * @desc Prevents turn order manipulation from going faster than infinity speed battlers.
 * @default true
 *
 * @param InitialSpeedJS:func
 * @text JS: Initial Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate initial speed at the start of battle.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ConvertSpeedJS:func
 * @text JS: Speed => Order
 * @parent Speed
 * @type note
 * @desc Code used to calculate how action speeds alter next turn's order.
 * @default "// Declare Constants\nconst item = this.item();\nconst modifier = 50;\n\n// Calculate Order Slots Changed\nlet change = item.speed / (-modifier);\nchange = (change >= 0) ? Math.ceil(change) : Math.floor(change);\n\n// Return Change\nreturn change || 0;"
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
 * @param RepositionTopHelpX:num
 * @text Offset X
 * @parent RepositionTopForHelp:eval
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default +0
 *
 * @param RepositionTopHelpY:num
 * @text Offset Y
 * @parent RepositionTopForHelp:eval
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default +96
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
 * @param LogWindowOffsetY:num
 * @text Offset Y
 * @parent RepositionLogWindow:eval
 * @desc How much do you want to offset the Log Window's Y position?
 * @default +0
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right
 * @off Right to Left
 * @desc Decide on the direction of the Turn Order.
 * @default false
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 16
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 36
 *
 * @param UiBackground
 * @text UI Background
 *
 * @param BgDimStyle:str
 * @text Background Style
 * @parent UiBackground
 * @type select
 * @option fill
 * @option gradient
 * @option image
 * @option transparent
 * @desc Select the style you want for the background.
 * @default gradient
 *
 * @param BgImageFilename:str
 * @text Image Filename
 * @parent UiBackground
 * @type file
 * @dir img/system/
 * @desc When using the "image" style, select an image from /img/system/ as the background image.
 * @default 
 *
 * @param BgImageOffsetX:num
 * @text Offset X
 * @parent BgImageFilename:str
 * @desc How much do you want to offset the Background Image's X position?
 * @default +0
 *
 * @param BgImageOffsetY:num
 * @text Offset Y
 * @parent BgImageFilename:str
 * @desc How much do you want to offset the Background Image's Y position?
 * @default +0
 *
 * @param UiText
 * @text UI Text
 *
 * @param UiFontSize:num
 * @text Font Size
 * @parent UiText
 * @desc The font size used for parameter values.
 * @default 16
 *
 * @param UiSubjectText:str
 * @text Active Battler Text
 * @parent UiText
 * @desc Text used to display the active battler.
 * This text will always be center aligned.
 * @default ★
 *
 * @param UiSubjectOffsetX:num
 * @text Offset X
 * @parent UiSubjectText:str
 * @desc How much do you want to offset the text's X position?
 * @default +0
 *
 * @param UiSubjectOffsetY:num
 * @text Offset Y
 * @parent UiSubjectText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiCurrentText:str
 * @text Current Turn Text
 * @parent UiText
 * @desc Text used to display the current turn.
 * @default ✦CURRENT TURN✦
 *
 * @param UiCurrentOffsetX:num
 * @text Offset X
 * @parent UiCurrentText:str
 * @desc How much do you want to offset the text's X position?
 * @default +6
 *
 * @param UiCurrentOffsetY:num
 * @text Offset Y
 * @parent UiCurrentText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiNextText:str
 * @text Next Turn Text
 * @parent UiText
 * @desc Text used to display the next turn.
 * @default ✧NEXT TURN✧
 *
 * @param UiNextOffsetX:num
 * @text Offset X
 * @parent UiNextText:str
 * @desc How much do you want to offset the text's X position?
 * @default +6
 *
 * @param UiNextOffsetY:num
 * @text Offset Y
 * @parent UiNextText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiAlignment:str
 * @text Text Align
 * @parent UiText
 * @type combo
 * @option auto
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Current and Next Turn texts?
 * @default auto
 * 
 * @param Slots
 *
 * @param SpriteThin:num
 * @text Width
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels wide should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteLength:num
 * @text Height
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels tall should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param PreviewScale:num
 * @text Preview Scale
 * @parent Slots
 * @desc How much do you want to scale the preview sprites by?
 * Use a number between 0 and 1 for the best results.
 * @default 0.5
 *
 * @param PreviewOffsetX:num
 * @text Offset X
 * @parent PreviewScale:num
 * @desc How much do you want to offset the Preview Sprites' X position?
 * @default +0
 *
 * @param PreviewOffsetY:num
 * @text Offset Y
 * @parent PreviewScale:num
 * @desc How much do you want to offset the Preview Sprites' Y position?
 * @default +0
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
 * @param PreviewActorBorderColor:str
 * @text Preview Version
 * @parent ActorBorderColor:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param PreviewActorSystemBorder:str
 * @text Preview Version
 * @parent ActorSystemBorder:str
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
 * @param PreviewEnemyBorderColor:str
 * @text Preview Version
 * @parent EnemyBorderColor:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param PreviewEnemySystemBorder:str
 * @text Preview Version
 * @parent EnemySystemBorder:str
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
 * @param PreviewActorBgColor1:str
 * @text Preview Version
 * @parent ActorBgColor1:str
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
 * @param PreviewActorBgColor2:str
 * @text Preview Version
 * @parent ActorBgColor2:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param PreviewActorSystemBg:str
 * @text Preview Version
 * @parent ActorSystemBg:str
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
 * @param PreviewEnemyBgColor1:str
 * @text Preview Version
 * @parent EnemyBgColor1:str
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
 * @param PreviewEnemyBgColor2:str
 * @text Preview Version
 * @parent EnemyBgColor2:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 * @param PreviewEnemySystemBg:str
 * @text Preview Version
 * @parent EnemySystemBg:str
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
//=============================================================================

const _0x56d93f=_0x2618;(function(_0x3cbaa7,_0x40916e){const _0x1d09ee=_0x2618,_0x1fafa2=_0x3cbaa7();while(!![]){try{const _0x3ae994=parseInt(_0x1d09ee(0x313))/0x1+-parseInt(_0x1d09ee(0x240))/0x2*(-parseInt(_0x1d09ee(0x1ef))/0x3)+-parseInt(_0x1d09ee(0x198))/0x4+-parseInt(_0x1d09ee(0x194))/0x5+parseInt(_0x1d09ee(0x255))/0x6+parseInt(_0x1d09ee(0x266))/0x7+-parseInt(_0x1d09ee(0x20f))/0x8;if(_0x3ae994===_0x40916e)break;else _0x1fafa2['push'](_0x1fafa2['shift']());}catch(_0x119933){_0x1fafa2['push'](_0x1fafa2['shift']());}}}(_0x5abc,0x6be54));var label=_0x56d93f(0x29c),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x56d93f(0x2f4)](function(_0x657bcb){const _0x4203e1=_0x56d93f;return _0x657bcb['status']&&_0x657bcb[_0x4203e1(0x334)][_0x4203e1(0x1ec)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x56d93f(0x211)]||{},VisuMZ['ConvertParams']=function(_0x5ab27a,_0x4dccc7){const _0x2228c6=_0x56d93f;for(const _0x236e45 in _0x4dccc7){if(_0x2228c6(0x282)===_0x2228c6(0x295))_0x537ea4['otbPreviewOrderClear'](),_0x504cf4[_0x2228c6(0x29c)][_0x2228c6(0x337)][_0x2228c6(0x320)](this);else{if(_0x236e45[_0x2228c6(0x2d2)](/(.*):(.*)/i)){if('YILwj'!==_0x2228c6(0x393)){const _0x25f9b3=![],_0x4e964f=_0x2ba705(_0xf58b4c['$1'])||0x0;this[_0x2228c6(0x236)]()[_0x2228c6(0x2b6)](_0x4e964f,_0x25f9b3);}else{const _0x51442a=String(RegExp['$1']),_0x58098e=String(RegExp['$2'])[_0x2228c6(0x11f)]()[_0x2228c6(0x136)]();let _0x3e9516,_0x3fb9ca,_0x144044;switch(_0x58098e){case'NUM':_0x3e9516=_0x4dccc7[_0x236e45]!==''?Number(_0x4dccc7[_0x236e45]):0x0;break;case _0x2228c6(0x37e):_0x3fb9ca=_0x4dccc7[_0x236e45]!==''?JSON[_0x2228c6(0x132)](_0x4dccc7[_0x236e45]):[],_0x3e9516=_0x3fb9ca[_0x2228c6(0x349)](_0x2f3e9d=>Number(_0x2f3e9d));break;case _0x2228c6(0x328):_0x3e9516=_0x4dccc7[_0x236e45]!==''?eval(_0x4dccc7[_0x236e45]):null;break;case'ARRAYEVAL':_0x3fb9ca=_0x4dccc7[_0x236e45]!==''?JSON[_0x2228c6(0x132)](_0x4dccc7[_0x236e45]):[],_0x3e9516=_0x3fb9ca[_0x2228c6(0x349)](_0x6a294c=>eval(_0x6a294c));break;case _0x2228c6(0x37d):_0x3e9516=_0x4dccc7[_0x236e45]!==''?JSON[_0x2228c6(0x132)](_0x4dccc7[_0x236e45]):'';break;case _0x2228c6(0x29a):_0x3fb9ca=_0x4dccc7[_0x236e45]!==''?JSON[_0x2228c6(0x132)](_0x4dccc7[_0x236e45]):[],_0x3e9516=_0x3fb9ca[_0x2228c6(0x349)](_0x30851b=>JSON[_0x2228c6(0x132)](_0x30851b));break;case _0x2228c6(0x109):_0x3e9516=_0x4dccc7[_0x236e45]!==''?new Function(JSON[_0x2228c6(0x132)](_0x4dccc7[_0x236e45])):new Function(_0x2228c6(0x31e));break;case _0x2228c6(0x387):_0x3fb9ca=_0x4dccc7[_0x236e45]!==''?JSON[_0x2228c6(0x132)](_0x4dccc7[_0x236e45]):[],_0x3e9516=_0x3fb9ca[_0x2228c6(0x349)](_0x4258cb=>new Function(JSON[_0x2228c6(0x132)](_0x4258cb)));break;case _0x2228c6(0x280):_0x3e9516=_0x4dccc7[_0x236e45]!==''?String(_0x4dccc7[_0x236e45]):'';break;case _0x2228c6(0x2e2):_0x3fb9ca=_0x4dccc7[_0x236e45]!==''?JSON['parse'](_0x4dccc7[_0x236e45]):[],_0x3e9516=_0x3fb9ca[_0x2228c6(0x349)](_0x39047b=>String(_0x39047b));break;case _0x2228c6(0x2dd):_0x144044=_0x4dccc7[_0x236e45]!==''?JSON[_0x2228c6(0x132)](_0x4dccc7[_0x236e45]):{},_0x3e9516=VisuMZ[_0x2228c6(0x25a)]({},_0x144044);break;case _0x2228c6(0x19d):_0x3fb9ca=_0x4dccc7[_0x236e45]!==''?JSON[_0x2228c6(0x132)](_0x4dccc7[_0x236e45]):[],_0x3e9516=_0x3fb9ca[_0x2228c6(0x349)](_0x133df5=>VisuMZ['ConvertParams']({},JSON[_0x2228c6(0x132)](_0x133df5)));break;default:continue;}_0x5ab27a[_0x51442a]=_0x3e9516;}}}}return _0x5ab27a;},(_0x517b6f=>{const _0x2dd6ef=_0x56d93f,_0x11d73f=_0x517b6f[_0x2dd6ef(0x209)];for(const _0x2b7e4d of dependencies){if(!Imported[_0x2b7e4d]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x11d73f,_0x2b7e4d)),SceneManager[_0x2dd6ef(0x381)]();break;}}const _0x220c7b=_0x517b6f[_0x2dd6ef(0x334)];if(_0x220c7b[_0x2dd6ef(0x2d2)](/\[Version[ ](.*?)\]/i)){if(_0x2dd6ef(0x31f)!=='KIPnr'){const _0x56655e=Number(RegExp['$1']);_0x56655e!==VisuMZ[label][_0x2dd6ef(0x1ea)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x2dd6ef(0x21a)](_0x11d73f,_0x56655e)),SceneManager[_0x2dd6ef(0x381)]());}else{const _0x846fba=this[_0x2dd6ef(0x331)]()[_0x2dd6ef(0x1b1)];if(_0x846fba[_0x2dd6ef(0x2d2)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x115354(_0x1231ae['$2']);return _0x1ad592[_0x2dd6ef(0x211)][_0x2dd6ef(0x30d)];}}if(_0x220c7b['match'](/\[Tier[ ](\d+)\]/i)){if('fxVHe'!=='RHrnL'){const _0xd65251=Number(RegExp['$1']);_0xd65251<tier?(alert(_0x2dd6ef(0x1c1)[_0x2dd6ef(0x21a)](_0x11d73f,_0xd65251,tier)),SceneManager[_0x2dd6ef(0x381)]()):tier=Math[_0x2dd6ef(0x1b9)](_0xd65251,tier);}else _0x9de251[_0x2dd6ef(0x2ee)](),_0x58f770['BattleSystemOTB'][_0x2dd6ef(0x1fd)][_0x2dd6ef(0x320)](this);}VisuMZ[_0x2dd6ef(0x25a)](VisuMZ[label][_0x2dd6ef(0x211)],_0x517b6f['parameters']);})(pluginData),PluginManager[_0x56d93f(0x1b6)](pluginData[_0x56d93f(0x209)],_0x56d93f(0x1b0),_0x2f1f7b=>{const _0x446f23=_0x56d93f;VisuMZ[_0x446f23(0x25a)](_0x2f1f7b,_0x2f1f7b);const _0x2ef9ec=_0x2f1f7b[_0x446f23(0x110)],_0x129e9f=_0x2f1f7b[_0x446f23(0x2d9)];for(const _0x334845 of _0x2ef9ec){if(_0x446f23(0x119)===_0x446f23(0x119)){const _0x44da24=$gameActors[_0x446f23(0x1f3)](_0x334845);if(!_0x44da24)continue;_0x44da24[_0x446f23(0x370)]=_0x446f23(0x1e1),_0x44da24[_0x446f23(0x1ab)]=_0x129e9f;}else{const _0x5dba6f=this['enemy']()['note'];if(_0x5dba6f[_0x446f23(0x2d2)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x5529ae(_0x45c9c3['$1']);return _0x49573a['Settings'][_0x446f23(0x1da)];}}}),PluginManager['registerCommand'](pluginData['name'],_0x56d93f(0x281),_0x56f48f=>{const _0x398d20=_0x56d93f;VisuMZ[_0x398d20(0x25a)](_0x56f48f,_0x56f48f);const _0x299832=_0x56f48f[_0x398d20(0x110)],_0x4240f0=_0x56f48f[_0x398d20(0x1c8)],_0x5a5143=_0x56f48f[_0x398d20(0x10c)];for(const _0x24398c of _0x299832){const _0x3fad69=$gameActors[_0x398d20(0x1f3)](_0x24398c);if(!_0x3fad69)continue;_0x3fad69[_0x398d20(0x370)]=_0x398d20(0x345),_0x3fad69[_0x398d20(0x213)]=_0x4240f0,_0x3fad69['_otbTurnOrderFaceIndex']=_0x5a5143;}}),PluginManager['registerCommand'](pluginData[_0x56d93f(0x209)],_0x56d93f(0x391),_0x339bd7=>{const _0x1f8df1=_0x56d93f;VisuMZ[_0x1f8df1(0x25a)](_0x339bd7,_0x339bd7);const _0x460e9a=_0x339bd7['Actors'];for(const _0x114695 of _0x460e9a){const _0x3b2dd3=$gameActors[_0x1f8df1(0x1f3)](_0x114695);if(!_0x3b2dd3)continue;_0x3b2dd3['clearTurnOrderOTBGraphics']();}}),PluginManager[_0x56d93f(0x1b6)](pluginData[_0x56d93f(0x209)],_0x56d93f(0x16b),_0x168dc0=>{const _0xf0973f=_0x56d93f;VisuMZ['ConvertParams'](_0x168dc0,_0x168dc0);const _0x181b69=_0x168dc0[_0xf0973f(0x34f)],_0x31ed9a=_0x168dc0[_0xf0973f(0x2d9)];for(const _0x382733 of _0x181b69){if(_0xf0973f(0x223)!==_0xf0973f(0x158)){const _0xb357be=$gameTroop['members']()[_0x382733];if(!_0xb357be)continue;_0xb357be[_0xf0973f(0x370)]=_0xf0973f(0x1e1),_0xb357be[_0xf0973f(0x1ab)]=_0x31ed9a;}else{const _0x127640=this['_positionDuration'];this['x']=(this['x']*(_0x127640-0x1)+this[_0xf0973f(0x22c)])/_0x127640,this['y']=(this['y']*(_0x127640-0x1)+this[_0xf0973f(0x145)])/_0x127640,this['_positionDuration']--;}}}),PluginManager['registerCommand'](pluginData[_0x56d93f(0x209)],'OtbTurnOrderEnemyFace',_0x3d9a63=>{const _0x1b4cb7=_0x56d93f;VisuMZ['ConvertParams'](_0x3d9a63,_0x3d9a63);const _0x52cf1a=_0x3d9a63['Enemies'],_0xfd6217=_0x3d9a63[_0x1b4cb7(0x1c8)],_0xc87903=_0x3d9a63[_0x1b4cb7(0x10c)];for(const _0x5baee7 of _0x52cf1a){const _0x2cc35a=$gameTroop['members']()[_0x5baee7];if(!_0x2cc35a)continue;_0x2cc35a[_0x1b4cb7(0x370)]='face',_0x2cc35a[_0x1b4cb7(0x213)]=_0xfd6217,_0x2cc35a[_0x1b4cb7(0x315)]=_0xc87903;}}),PluginManager[_0x56d93f(0x1b6)](pluginData['name'],_0x56d93f(0x287),_0x46986a=>{const _0x2c4e87=_0x56d93f;VisuMZ[_0x2c4e87(0x25a)](_0x46986a,_0x46986a);const _0x4494a1=_0x46986a[_0x2c4e87(0x34f)];for(const _0x5c507f of _0x4494a1){if(_0x2c4e87(0x278)===_0x2c4e87(0x278)){const _0xeeff49=$gameTroop['members']()[_0x5c507f];if(!_0xeeff49)continue;_0xeeff49['clearTurnOrderOTBGraphics']();}else _0x3720f2[_0x2c4e87(0x29c)][_0x2c4e87(0x284)][_0x2c4e87(0x320)](this),this[_0x2c4e87(0x2df)]()&&this[_0x2c4e87(0x352)]();}}),PluginManager['registerCommand'](pluginData['name'],_0x56d93f(0x31c),_0x419071=>{const _0x58bb81=_0x56d93f;VisuMZ[_0x58bb81(0x25a)](_0x419071,_0x419071);const _0x634b1d=_0x419071['Visible'];$gameSystem[_0x58bb81(0x12d)](_0x634b1d);}),VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x305)]={'Instant':/<OTB (?:INSTANT|INSTANT CAST|INSTANT USE)>/i,'UserFollOrder':/<OTB USER FOLLOW TURN: ([\+\-]\d+)>/i,'UserCurrOrder':/<OTB USER CURRENT TURN: ([\+\-]\d+)>/i,'UserNextOrder':/<OTB USER NEXT TURN: ([\+\-]\d+)>/i,'TargetFollOrder':/<OTB TARGET FOLLOW TURN: ([\+\-]\d+)>/i,'TargetCurrOrder':/<OTB TARGET CURRENT TURN: ([\+\-]\d+)>/i,'TargetNextOrder':/<OTB TARGET NEXT TURN: ([\+\-]\d+)>/i,'UserAddActionCurrent':/<OTB USER ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'UserAddActionNext':/<OTB USER ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionCurrent':/<OTB TARGET ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionNext':/<OTB TARGET ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i},DataManager['getStateIdWithName']=function(_0x441646){const _0x1cf19d=_0x56d93f;_0x441646=_0x441646[_0x1cf19d(0x11f)]()[_0x1cf19d(0x136)](),this[_0x1cf19d(0x2d4)]=this[_0x1cf19d(0x2d4)]||{};if(this[_0x1cf19d(0x2d4)][_0x441646])return this['_stateIDs'][_0x441646];for(const _0x34a16f of $dataStates){if(!_0x34a16f)continue;this['_stateIDs'][_0x34a16f[_0x1cf19d(0x209)][_0x1cf19d(0x11f)]()[_0x1cf19d(0x136)]()]=_0x34a16f['id'];}return this['_stateIDs'][_0x441646]||0x0;},ImageManager[_0x56d93f(0x1c2)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x56d93f(0x11e)]=ImageManager[_0x56d93f(0x11e)]||0x6,SceneManager[_0x56d93f(0x1d7)]=function(){const _0x2ca86c=_0x56d93f;return this['_scene']&&this[_0x2ca86c(0x242)][_0x2ca86c(0x361)]===Scene_Battle;},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x2b9)]=BattleManager['setup'],BattleManager['setup']=function(_0x52728c,_0x27c082,_0xf9bbf6){const _0x15997d=_0x56d93f;VisuMZ[_0x15997d(0x29c)][_0x15997d(0x2b9)]['call'](this,_0x52728c,_0x27c082,_0xf9bbf6),this[_0x15997d(0x1b2)]();},BattleManager['initMembersOTB']=function(){const _0x7da4b4=_0x56d93f;if(!this[_0x7da4b4(0x2df)]())return;this[_0x7da4b4(0x11c)]=[],this[_0x7da4b4(0x351)]=![];},VisuMZ[_0x56d93f(0x29c)]['BattleManager_battleSys']=BattleManager[_0x56d93f(0x319)],BattleManager[_0x56d93f(0x319)]=function(){const _0x8227ed=_0x56d93f;if(this[_0x8227ed(0x2df)]())return _0x8227ed(0x222);return VisuMZ[_0x8227ed(0x29c)]['BattleManager_battleSys'][_0x8227ed(0x320)](this);},BattleManager['isOTB']=function(){return $gameSystem['getBattleSystem']()==='OTB';},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x359)]=BattleManager[_0x56d93f(0x15a)],BattleManager['isTpb']=function(){if(this['isOTB']())return![];return VisuMZ['BattleSystemOTB']['BattleManager_isTpb']['call'](this);},VisuMZ[_0x56d93f(0x29c)]['BattleManager_isActiveTpb']=BattleManager['isActiveTpb'],BattleManager[_0x56d93f(0x20b)]=function(){const _0x2fb816=_0x56d93f;if(this[_0x2fb816(0x2df)]())return![];return VisuMZ[_0x2fb816(0x29c)][_0x2fb816(0x1db)][_0x2fb816(0x320)](this);},VisuMZ[_0x56d93f(0x29c)]['BattleManager_isTurnBased']=BattleManager[_0x56d93f(0x1e4)],BattleManager['isTurnBased']=function(){const _0x206d7b=_0x56d93f;if(this['isOTB']())return!![];return VisuMZ[_0x206d7b(0x29c)]['BattleManager_isTurnBased'][_0x206d7b(0x320)](this);},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x25f)]=BattleManager[_0x56d93f(0x269)],BattleManager[_0x56d93f(0x269)]=function(){const _0x52702c=_0x56d93f;VisuMZ['BattleSystemOTB'][_0x52702c(0x25f)][_0x52702c(0x320)](this),this[_0x52702c(0x2df)]()&&$gameParty['canInput']()&&!this[_0x52702c(0x2e0)]&&this[_0x52702c(0x2db)]();},BattleManager[_0x56d93f(0x2db)]=function(){const _0x442228=_0x56d93f;this[_0x442228(0x265)]();},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x35e)]=BattleManager[_0x56d93f(0x15c)],BattleManager[_0x56d93f(0x15c)]=function(){const _0x4311a2=_0x56d93f;this['isOTB']()?this['processTurnOTB']():VisuMZ[_0x4311a2(0x29c)][_0x4311a2(0x35e)][_0x4311a2(0x320)](this);},BattleManager['processTurnOTB']=function(){const _0x40059c=_0x56d93f,_0x1e7850=this[_0x40059c(0x323)];if(_0x1e7850['isActor']()&&_0x1e7850['canInput']()){if('djbRy'!==_0x40059c(0x21f))return this[_0x40059c(0x315)]===_0x5a7e65&&(this[_0x40059c(0x315)]=this[_0x40059c(0x185)]()),this[_0x40059c(0x315)];else{const _0x187b41=_0x1e7850['currentAction']();if(!_0x187b41)_0x40059c(0x2d3)!==_0x40059c(0x152)?VisuMZ[_0x40059c(0x29c)][_0x40059c(0x35e)][_0x40059c(0x320)](this):_0x1c12c3[_0x40059c(0x1f6)](this,_0xbc1909,_0x3a9e99[_0x40059c(0x11c)]);else _0x187b41[_0x40059c(0x146)]?VisuMZ['BattleSystemOTB'][_0x40059c(0x35e)]['call'](this):(this[_0x40059c(0x111)]=_0x1e7850,this['startActorInput']());}}else VisuMZ[_0x40059c(0x29c)]['BattleManager_processTurn']['call'](this);},VisuMZ['BattleSystemOTB'][_0x56d93f(0x186)]=BattleManager[_0x56d93f(0x144)],BattleManager['finishActorInput']=function(){const _0x9dea9c=_0x56d93f;this[_0x9dea9c(0x2df)]()?_0x9dea9c(0x1a0)==='qxuyo'?VisuMZ[_0x9dea9c(0x29c)][_0x9dea9c(0x35e)][_0x9dea9c(0x320)](this):(this['x']=this[_0x9dea9c(0x22c)],this['y']=this[_0x9dea9c(0x145)]):VisuMZ[_0x9dea9c(0x29c)]['BattleManager_finishActorInput'][_0x9dea9c(0x320)](this);},VisuMZ[_0x56d93f(0x29c)]['BattleManager_selectNextActor']=BattleManager[_0x56d93f(0x2a0)],BattleManager[_0x56d93f(0x2a0)]=function(){const _0x556a37=_0x56d93f;this[_0x556a37(0x2df)]()?this[_0x556a37(0x12a)]():VisuMZ[_0x556a37(0x29c)]['BattleManager_selectNextActor'][_0x556a37(0x320)](this);},BattleManager['selectNextActorOTB']=function(){const _0x207c79=_0x56d93f;this[_0x207c79(0x111)]=null,this[_0x207c79(0x1b7)]=![];},VisuMZ[_0x56d93f(0x29c)]['BattleManager_endAction']=BattleManager[_0x56d93f(0x123)],BattleManager[_0x56d93f(0x123)]=function(){const _0x347e2f=_0x56d93f;this[_0x347e2f(0x1b5)](),VisuMZ[_0x347e2f(0x29c)]['BattleManager_endAction']['call'](this),this[_0x347e2f(0x239)]();},BattleManager[_0x56d93f(0x1b5)]=function(){const _0xe886d=_0x56d93f;if(!this[_0xe886d(0x2df)]())return;this[_0xe886d(0x2c2)]();this['_subject']&&this[_0xe886d(0x323)]['performActionEndOTB']();if(this[_0xe886d(0x323)]&&this[_0xe886d(0x323)][_0xe886d(0xf0)]()&&this[_0xe886d(0x106)][_0xe886d(0x1ec)](this[_0xe886d(0x323)])){if('hxXyh'===_0xe886d(0x366)){const _0x330b5b=this[_0xe886d(0x323)][_0xe886d(0x26b)][_0xe886d(0x2f4)](_0x5137d7=>_0x5137d7[_0xe886d(0x146)]);this[_0xe886d(0x323)][_0xe886d(0x107)]();if(_0x330b5b){if(_0xe886d(0x192)==='viFCy'){let _0x245ec7=_0x330b5b[_0xe886d(0x1ac)];while(_0x245ec7--){_0xe886d(0x134)==='FIGiI'?this[_0xe886d(0x323)][_0xe886d(0x26b)][_0xe886d(0x2e9)]():_0x395460+=_0x48d9d1(_0x151ed6['$1']);}this[_0xe886d(0x323)][_0xe886d(0x26b)]=_0x330b5b[_0xe886d(0x129)](this[_0xe886d(0x323)]['_actions']);}else _0x319f5c[_0xe886d(0xef)](_0x3df999,-_0x8e143f,!![]);}}else{if(!_0x4514da[_0xe886d(0x211)][_0xe886d(0x243)])return;const _0xad8612=_0x29ee0b[_0xe886d(0x211)],_0x51ff44=this[_0xe886d(0x179)](),_0x4feb49=_0xe886d(0x218)['format'](_0x51ff44),_0x2c8021=new _0x28f1b7();_0x2c8021[_0xe886d(0x1d4)]['x']=this['anchor']['x'],_0x2c8021[_0xe886d(0x1d4)]['y']=this[_0xe886d(0x1d4)]['y'];if(_0xad8612[_0x4feb49])_0x2c8021[_0xe886d(0x253)]=_0x19f9d7[_0xe886d(0x23c)](_0xad8612[_0x4feb49]);else{const _0x28016e=this['bitmapWidth'](),_0x4cc8da=this[_0xe886d(0x33f)]();_0x2c8021[_0xe886d(0x253)]=new _0x59d49b(_0x28016e,_0x4cc8da);const _0x1e40b8=_0x159cd0['getColor'](_0xad8612[_0xe886d(0x241)['format'](_0x51ff44)]),_0x513881=_0x437de9[_0xe886d(0x210)](_0xad8612[_0xe886d(0x229)['format'](_0x51ff44)]);_0x2c8021[_0xe886d(0x253)]['gradientFillRect'](0x0,0x0,_0x28016e,_0x4cc8da,_0x1e40b8,_0x513881,!![]);}this['_backgroundSprite']=_0x2c8021,this[_0xe886d(0x1de)](this['_backgroundSprite']),this['width']=this[_0xe886d(0x1d1)][_0xe886d(0x283)],this[_0xe886d(0x24f)]=this[_0xe886d(0x1d1)]['height'];}}},BattleManager[_0x56d93f(0x239)]=function(){const _0x45bec3=_0x56d93f;if(!this[_0x45bec3(0x2df)]())return;this['removeActionBattlersOTB']();if(this[_0x45bec3(0x323)]){if('nQfCN'!==_0x45bec3(0x1df)){const _0x37994c=_0x19b9a9[_0x45bec3(0x211)];this[_0x45bec3(0x32b)]=_0x1550d2['ceil'](0xff/(_0x37994c['UpdateFrames']||0x1));}else this['endBattlerActions'](this['_subject']),this['_subject']=null;}this[_0x45bec3(0x27e)][_0x45bec3(0x1ac)]>0x0&&(_0x45bec3(0x10d)==='EHtcT'?this['createOrderPreviewSprite'](_0xc43560,!![],_0x1b1e34):this[_0x45bec3(0x323)]=this['getNextSubject']());;},BattleManager[_0x56d93f(0x13e)]=VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x211)][_0x56d93f(0x346)][_0x56d93f(0x208)],BattleManager[_0x56d93f(0x188)]=VisuMZ[_0x56d93f(0x29c)]['Settings'][_0x56d93f(0x346)]['RandomizeActionTimesOrder'],BattleManager['OTB_STUN_INFINITY_CLAMP']=VisuMZ['BattleSystemOTB'][_0x56d93f(0x211)][_0x56d93f(0x346)][_0x56d93f(0x38b)],VisuMZ[_0x56d93f(0x29c)]['BattleManager_makeActionOrders']=BattleManager['makeActionOrders'],BattleManager[_0x56d93f(0x293)]=function(){const _0x3e2f08=_0x56d93f;if(this[_0x3e2f08(0x2df)]())this[_0x3e2f08(0x13d)]();else{if(_0x3e2f08(0x326)===_0x3e2f08(0x326))VisuMZ[_0x3e2f08(0x29c)][_0x3e2f08(0x1dd)][_0x3e2f08(0x320)](this);else{if(!_0x2dae82['isOTB']())return;this[_0x3e2f08(0x1af)]=new _0x82ff9f();const _0x4a8afd=this[_0x3e2f08(0x2f5)](this[_0x3e2f08(0x167)]);this[_0x3e2f08(0x2bc)](this[_0x3e2f08(0x1af)],_0x4a8afd),this['repositionLogWindowOTB'](),_0x70d34e['isPreviousSceneBattleTransitionable']()&&this[_0x3e2f08(0x1af)][_0x3e2f08(0x225)]();}}},BattleManager[_0x56d93f(0x13d)]=function(){const _0x3484a0=_0x56d93f;let _0x5748dc=this['_otb_createdFirstTurnOrders']?0x1:0x2;while(_0x5748dc--){this[_0x3484a0(0x1dc)]();}const _0x224d98=!this[_0x3484a0(0x351)];this['_otb_createdFirstTurnOrders']=!![];},BattleManager[_0x56d93f(0x1dc)]=function(){const _0x1e3a6b=_0x56d93f;this[_0x1e3a6b(0x106)]=this[_0x1e3a6b(0x11c)],this['otbShiftNextTurnSpritesToCurrentTurn']();const _0x967d65=[];_0x967d65['push'](...$gameParty[_0x1e3a6b(0x31b)]()),_0x967d65[_0x1e3a6b(0x125)](...$gameTroop['members']());for(const _0x22579a of _0x967d65){_0x22579a[_0x1e3a6b(0x2c8)]();}_0x967d65['sort']((_0x2a5683,_0x190a45)=>_0x190a45[_0x1e3a6b(0x322)]()-_0x2a5683[_0x1e3a6b(0x322)]()),this[_0x1e3a6b(0x11c)]=_0x967d65,this[_0x1e3a6b(0x31a)](),this[_0x1e3a6b(0x2c2)](),this[_0x1e3a6b(0x190)]();},BattleManager['otbApplyActionTimes']=function(){const _0x27a749=_0x56d93f;if(!BattleManager[_0x27a749(0x13e)])return;const _0x196f1b=this[_0x27a749(0x11c)],_0x414601=this[_0x27a749(0x22a)]();for(const _0x58f202 of _0x414601){if(_0x27a749(0x147)===_0x27a749(0x147)){if(!_0x58f202)continue;if(!_0x58f202[_0x27a749(0x311)]())continue;if(!_0x58f202[_0x27a749(0x1bc)]())continue;if(!_0x196f1b[_0x27a749(0x1ec)](_0x58f202))continue;const _0x802705=_0x196f1b[_0x27a749(0x142)](_0x58f202);let _0x2d83fa=_0x58f202['makeActionTimes']()-0x1;while(_0x2d83fa--){if(_0x27a749(0x19c)===_0x27a749(0x19c)){let _0x35a419=_0x802705;if(BattleManager[_0x27a749(0x188)]){if('efPMI'!==_0x27a749(0x206))_0x35a419=Math[_0x27a749(0x202)](_0x196f1b[_0x27a749(0x1ac)]-_0x802705)+_0x802705;else{const _0x4aa54b=this[_0x27a749(0x383)],_0x2899ab=this[_0x27a749(0x2c0)](),_0x49bad6=this[_0x27a749(0x33f)](),_0xe183cb=_0x111001[_0x27a749(0x1b9)](_0x2899ab,_0x49bad6);this['_graphicSprite'][_0x27a749(0x253)]=new _0x4629bc(_0x2899ab,_0x49bad6);const _0x566278=this['_graphicSprite']['bitmap'],_0x29bdf2=_0x1b2a11[_0x27a749(0x22d)],_0x5cac37=_0x1c01b6['faceHeight'],_0x5e36dc=_0xe183cb/_0x34391e[_0x27a749(0x1b9)](_0x29bdf2,_0x5cac37),_0x39e76a=_0x51996e[_0x27a749(0x22d)],_0x209557=_0x53199a['faceHeight'],_0x2b4ab6=_0x4aa54b%0x4*_0x29bdf2+(_0x29bdf2-_0x39e76a)/0x2,_0x583196=_0x3db907['floor'](_0x4aa54b/0x4)*_0x5cac37+(_0x5cac37-_0x209557)/0x2,_0x3dfb2f=(_0x2899ab-_0x29bdf2*_0x5e36dc)/0x2,_0x5da829=(_0x49bad6-_0x5cac37*_0x5e36dc)/0x2;_0x566278[_0x27a749(0x244)](_0x5ee533,_0x2b4ab6,_0x583196,_0x39e76a,_0x209557,_0x3dfb2f,_0x5da829,_0xe183cb,_0xe183cb);}}_0x196f1b[_0x27a749(0x2b5)](_0x35a419,0x0,_0x58f202);}else _0x2e8b1e[_0x27a749(0x2ee)](),_0x931091['BattleSystemOTB'][_0x27a749(0x161)][_0x27a749(0x320)](this);}}else _0x5846a9['BattleSystemOTB'][_0x27a749(0x246)][_0x27a749(0x320)](this,_0x1091d9);}},BattleManager[_0x56d93f(0x2c2)]=function(){const _0x163673=_0x56d93f;if(!this[_0x163673(0x2df)]())return;this[_0x163673(0x106)]=this[_0x163673(0x106)]||[],this['_actionBattlers']['remove'](null),this[_0x163673(0x106)][_0x163673(0x37c)](undefined),this['_actionBattlers']=this[_0x163673(0x106)][_0x163673(0x2f4)](_0x3224bd=>_0x3224bd['isBattleMember']()),this[_0x163673(0x106)]=this[_0x163673(0x106)][_0x163673(0x2f4)](_0x2cea62=>VisuMZ[_0x163673(0x29c)][_0x163673(0x262)](_0x2cea62)),this[_0x163673(0x2e0)]&&(this['_actionBattlers']=this[_0x163673(0x106)][_0x163673(0x2f4)](_0x1a4ed0=>!_0x1a4ed0[_0x163673(0x2c5)]())),this[_0x163673(0x248)]&&(this[_0x163673(0x106)]=this['_actionBattlers'][_0x163673(0x2f4)](_0x1d87d6=>!_0x1d87d6['isEnemy']())),this['_otb_actionBattlersNext']=this[_0x163673(0x11c)]||[],this['_otb_actionBattlersNext']['remove'](null),this['_otb_actionBattlersNext'][_0x163673(0x37c)](undefined),this[_0x163673(0x11c)]=this[_0x163673(0x11c)][_0x163673(0x2f4)](_0x34876c=>_0x34876c[_0x163673(0x11d)]()),this[_0x163673(0x11c)]=this[_0x163673(0x11c)]['filter'](_0x240b4b=>VisuMZ[_0x163673(0x29c)][_0x163673(0x2cb)](_0x240b4b)),this[_0x163673(0x25d)](),this['refreshTurnOrder']();},VisuMZ['BattleSystemOTB'][_0x56d93f(0x262)]=function(_0x4e48e7){const _0x297685=_0x56d93f;if(!_0x4e48e7)return![];if(!_0x4e48e7[_0x297685(0x1bc)]())return![];if(!_0x4e48e7[_0x297685(0x311)]())return![];return _0x4e48e7[_0x297685(0xf0)]();},VisuMZ['BattleSystemOTB'][_0x56d93f(0x2cb)]=function(_0x202ea3){const _0x3e7f24=_0x56d93f;if(!_0x202ea3)return![];const _0x1db5de=JsonEx['makeDeepCopy'](_0x202ea3);return _0x1db5de[_0x3e7f24(0x303)]=!![],_0x1db5de[_0x3e7f24(0x38c)]=!![],_0x1db5de['updateStateTurns'](),_0x1db5de[_0x3e7f24(0x310)](0x1),_0x1db5de[_0x3e7f24(0x310)](0x2),_0x1db5de[_0x3e7f24(0x13a)](),VisuMZ[_0x3e7f24(0x29c)][_0x3e7f24(0x262)](_0x1db5de);},BattleManager[_0x56d93f(0xef)]=function(_0x431155,_0x5688ff,_0x539f58){const _0x32e080=_0x56d93f;if(!_0x5688ff)return;const _0x206562=_0x539f58?this['_otb_actionBattlersNext']:this['_actionBattlers'];if(!_0x206562)return;if(!_0x206562['includes'](_0x431155))return;const _0x4fbca4=VisuMZ[_0x32e080(0x29c)][_0x32e080(0x35a)](_0x431155,_0x206562),_0x39bfc0=_0x539f58?VisuMZ[_0x32e080(0x29c)][_0x32e080(0x339)](_0x206562):0x0,_0x221767=_0x4fbca4[_0x32e080(0x1ac)]-0x1;for(let _0x2ddaf7=_0x221767;_0x2ddaf7>=0x0;_0x2ddaf7--){_0x206562[_0x32e080(0x2b5)](_0x4fbca4[_0x2ddaf7],0x1);}for(var _0x224e2f=0x0;_0x224e2f<_0x4fbca4[_0x32e080(0x1ac)];_0x224e2f++){if(_0x32e080(0x390)!==_0x32e080(0x390)){if(this[_0x32e080(0x24c)]())this[_0x32e080(0x30f)]=_0x556211;else{const _0x8cf910=this[_0x32e080(0x38f)]()||new _0x501253(this);this[_0x32e080(0x30f)]=_0x3db763[_0x32e080(0x29c)][_0x32e080(0x211)][_0x32e080(0x346)][_0x32e080(0x20c)][_0x32e080(0x320)](_0x8cf910);}}else{var _0x359fc6=(_0x4fbca4[_0x224e2f]-_0x5688ff)['clamp'](_0x39bfc0,_0x206562[_0x32e080(0x1ac)]);_0x206562[_0x32e080(0x2b5)](_0x359fc6,0x0,_0x431155);}}this[_0x32e080(0x2c2)](),this[_0x32e080(0x14f)]();},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x35a)]=function(_0x407c95,_0x3c6264){const _0x591687=[],_0x124044=_0x3c6264['length'];for(let _0x51a452=0x0;_0x51a452<_0x124044;_0x51a452++){if(_0x3c6264[_0x51a452]===_0x407c95)_0x591687['push'](_0x51a452);}return _0x591687;},VisuMZ['BattleSystemOTB']['getInfinityClamp']=function(_0x13a3b8){const _0x5b7ab7=_0x56d93f;if(!BattleManager[_0x5b7ab7(0x340)])return 0x0;if(!_0x13a3b8)return 0x0;let _0x3fd70d=0x0;const _0x2afc40=_0x13a3b8[_0x5b7ab7(0x1ac)];for(let _0x2e28e4=0x0;_0x2e28e4<_0x2afc40;_0x2e28e4++){const _0x48b04f=_0x13a3b8[_0x2e28e4];if(!_0x48b04f)continue;if(_0x48b04f[_0x5b7ab7(0x322)]()!==Infinity)return _0x2e28e4;else{if(_0x5b7ab7(0x2e4)==='lwnLY')_0x3fd70d++;else{if(!this[_0x5b7ab7(0x2df)]())return;const _0x512ed7=_0x46f650[_0x5b7ab7(0x242)]['_otbTurnOrderWindow'];if(!_0x512ed7)return;_0x512ed7['previewOrderByAction'](this[_0x5b7ab7(0x367)]());}}}return _0x3fd70d;},BattleManager['otbShiftNextTurnSpritesToCurrentTurn']=function(){const _0xc1a4ed=_0x56d93f;if(!this[_0xc1a4ed(0x2df)]())return;const _0x2a3fa8=SceneManager[_0xc1a4ed(0x242)][_0xc1a4ed(0x1af)];if(!_0x2a3fa8)return;_0x2a3fa8[_0xc1a4ed(0x26a)]();},BattleManager[_0x56d93f(0x190)]=function(){const _0x55dc3e=_0x56d93f;if(!this[_0x55dc3e(0x2df)]())return;const _0x204e50=SceneManager[_0x55dc3e(0x242)]['_otbTurnOrderWindow'];if(!_0x204e50)return;_0x204e50[_0x55dc3e(0x34e)]();},VisuMZ[_0x56d93f(0x29c)]['BattleManager_getNextSubject']=BattleManager[_0x56d93f(0x1a8)],BattleManager['getNextSubject']=function(){const _0x3dfd88=_0x56d93f;this[_0x3dfd88(0x323)]=VisuMZ[_0x3dfd88(0x29c)]['BattleManager_getNextSubject'][_0x3dfd88(0x320)](this);if(this[_0x3dfd88(0x2df)]()&&this[_0x3dfd88(0x323)]){if('tDMwp'!=='tDMwp'){var _0x599075=(_0xdfcc6c[_0x12ebfd]-_0x18335f)[_0x3dfd88(0x294)](_0x3159a0,_0x3e8d2c['length']);_0x179e3e[_0x3dfd88(0x2b5)](_0x599075,0x0,_0x1b691a);}else this[_0x3dfd88(0x384)](this[_0x3dfd88(0x323)]);}return this[_0x3dfd88(0x323)];},BattleManager[_0x56d93f(0x384)]=function(_0x54b87d){const _0x5de4c2=_0x56d93f;if(!this[_0x5de4c2(0x2df)]())return;const _0x28b727=SceneManager[_0x5de4c2(0x242)]['_otbTurnOrderWindow'];if(!_0x28b727)return;if(!_0x54b87d)return;_0x28b727[_0x5de4c2(0x1e6)](_0x54b87d);},BattleManager[_0x56d93f(0x14f)]=function(){const _0x57ec11=_0x56d93f;if(!this[_0x57ec11(0x2df)]())return;const _0x47b673=SceneManager[_0x57ec11(0x242)][_0x57ec11(0x1af)];if(!_0x47b673)return;_0x47b673[_0x57ec11(0x36f)]();},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x284)]=BattleManager[_0x56d93f(0x116)],BattleManager[_0x56d93f(0x116)]=function(){const _0x2a6ea8=_0x56d93f;VisuMZ[_0x2a6ea8(0x29c)][_0x2a6ea8(0x284)][_0x2a6ea8(0x320)](this),this[_0x2a6ea8(0x2df)]()&&this[_0x2a6ea8(0x352)]();},BattleManager['otbRemoveCurrentSubject']=function(){const _0x415894=_0x56d93f;if(!this[_0x415894(0x2df)]())return;const _0xb83bc6=SceneManager[_0x415894(0x242)][_0x415894(0x1af)];if(!_0xb83bc6)return;_0xb83bc6[_0x415894(0x261)]();},BattleManager[_0x56d93f(0x25d)]=function(){const _0x32ee16=_0x56d93f;if(!this[_0x32ee16(0x2df)]())return;const _0x237a09=SceneManager[_0x32ee16(0x242)][_0x32ee16(0x1af)];if(!_0x237a09)return;_0x237a09[_0x32ee16(0x251)]();},BattleManager[_0x56d93f(0x27a)]=function(_0x2c6145){const _0x144e9e=_0x56d93f;if(!_0x2c6145)return;const _0x437889=_0x2c6145[_0x144e9e(0x371)]();_0x2c6145[_0x144e9e(0x107)]();if(!this[_0x144e9e(0x106)][_0x144e9e(0x1ec)](_0x2c6145)){if(_0x144e9e(0x2ec)!==_0x144e9e(0x1f8)){const _0x2fd8ee=Math['max'](0x0,_0x437889-(_0x2c6145['_otbTimesActedThisTurn']||0x0));this[_0x144e9e(0x1f6)](_0x2c6145,_0x2fd8ee,this[_0x144e9e(0x106)]);}else _0x2c09ee[_0x144e9e(0x29c)][_0x144e9e(0x1ee)][_0x144e9e(0x320)](this),this[_0x144e9e(0x274)]();}if(!this[_0x144e9e(0x11c)][_0x144e9e(0x1ec)](_0x2c6145)){if('yKItP'!==_0x144e9e(0x13b))this[_0x144e9e(0x1a5)]=0x0;else{const _0x484ee6=_0x437889;this[_0x144e9e(0x1f6)](_0x2c6145,_0x484ee6,this['_otb_actionBattlersNext']);}}},BattleManager[_0x56d93f(0x1f6)]=function(_0x352abd,_0x5dde06,_0xaf15b7){const _0x12144e=_0x56d93f;if(!this['isOTB']())return;const _0xa8db32=SceneManager[_0x12144e(0x242)][_0x12144e(0x1af)];while(_0x5dde06--){_0xaf15b7[_0x12144e(0x125)](_0x352abd),_0xa8db32&&_0xa8db32[_0x12144e(0x196)](_0x352abd,_0xaf15b7);}},BattleManager[_0x56d93f(0x16c)]=function(_0x3a6ce6){const _0x4a5cfb=_0x56d93f;if(!_0x3a6ce6)return;const _0x5d5e81=_0x3a6ce6[_0x4a5cfb(0x371)]();_0x3a6ce6[_0x4a5cfb(0x107)]();if(!this['_actionBattlers'][_0x4a5cfb(0x1ec)](_0x3a6ce6)){const _0xa4de8e=Math[_0x4a5cfb(0x1b9)](0x0,_0x5d5e81-(_0x3a6ce6[_0x4a5cfb(0x2dc)]||0x0));this[_0x4a5cfb(0x25e)](_0x3a6ce6,_0xa4de8e,this[_0x4a5cfb(0x106)]);}if(!this[_0x4a5cfb(0x11c)][_0x4a5cfb(0x1ec)](_0x3a6ce6)){const _0x128957=_0x5d5e81;this[_0x4a5cfb(0x25e)](_0x3a6ce6,_0x128957,this[_0x4a5cfb(0x11c)]);}},BattleManager[_0x56d93f(0x16f)]=function(_0x1580dd,_0x1e3a58,_0x19002b){const _0x860888=_0x56d93f;if(!this[_0x860888(0x2df)]())return;const _0x3329f7=SceneManager['_scene'][_0x860888(0x1af)];while(_0x1e3a58--){_0x19002b[_0x860888(0x16d)](_0x1580dd),_0x3329f7&&_0x3329f7[_0x860888(0x25e)](_0x1580dd,_0x19002b);}},BattleManager[_0x56d93f(0x30b)]=function(_0x4bb98b){const _0x8d04a1=_0x56d93f;if(!this[_0x8d04a1(0x2df)]())return;const _0x57a505=this[_0x8d04a1(0x106)],_0x291497=_0x4bb98b===this[_0x8d04a1(0x323)]?0x1:0x0;let _0xbb5d20=0x0;for(let _0x5a7ef3=0x0;_0x5a7ef3<_0x57a505[_0x8d04a1(0x1ac)];_0x5a7ef3++){if(_0x8d04a1(0x2a7)===_0x8d04a1(0x2a7)){const _0x24e8c5=_0x57a505[_0x5a7ef3];if(!_0x24e8c5)continue;if(!_0x24e8c5['_actions'])continue;if(!_0x24e8c5[_0x8d04a1(0x26b)][_0x291497])continue;if(!_0x24e8c5[_0x8d04a1(0x26b)][_0x291497]['_forceAction'])continue;_0xbb5d20=_0x5a7ef3;}else{if(_0x548b89['OTB_CONVERT_AGI_DEBUFF_CURRENT_TURN'])_0x2ec2f2+=0x1;}}this[_0x8d04a1(0x106)][_0x8d04a1(0x2b5)](_0xbb5d20,0x0,_0x4bb98b);const _0x39b2fd=SceneManager[_0x8d04a1(0x242)][_0x8d04a1(0x1af)];_0x39b2fd&&(_0x8d04a1(0x117)===_0x8d04a1(0x117)?_0x39b2fd['addForceActionBattler'](_0x4bb98b,_0xbb5d20):(this[_0x8d04a1(0x1b5)](),_0x1c244a['BattleSystemOTB']['BattleManager_endAction']['call'](this),this['postEndActionOTB']()));},BattleManager[_0x56d93f(0x2ee)]=function(){const _0x3571ae=_0x56d93f;if(!this[_0x3571ae(0x2df)]())return;const _0x42d6f9=SceneManager[_0x3571ae(0x242)]['_otbTurnOrderWindow'];if(!_0x42d6f9)return;_0x42d6f9['previewOrderByAction'](null);},BattleManager[_0x56d93f(0x2e3)]=function(){const _0x2eb6dd=_0x56d93f;if(!this[_0x2eb6dd(0x2df)]())return;const _0x2dedb4=SceneManager[_0x2eb6dd(0x242)]['_otbTurnOrderWindow'];if(!_0x2dedb4)return;_0x2dedb4[_0x2eb6dd(0x115)](this[_0x2eb6dd(0x367)]());},VisuMZ[_0x56d93f(0x29c)]['Game_System_initialize']=Game_System[_0x56d93f(0x299)][_0x56d93f(0x17e)],Game_System[_0x56d93f(0x299)][_0x56d93f(0x17e)]=function(){const _0x5be898=_0x56d93f;VisuMZ[_0x5be898(0x29c)][_0x5be898(0x113)][_0x5be898(0x320)](this),this[_0x5be898(0x121)]();},Game_System['prototype']['initBattleSystemOTB']=function(){this['_otbTurnOrderVisible']=!![];},Game_System[_0x56d93f(0x299)][_0x56d93f(0xfe)]=function(){const _0x444dca=_0x56d93f;return this['_otbTurnOrderVisible']===undefined&&this['initBattleSystemOTB'](),this[_0x444dca(0x1f9)];},Game_System['prototype'][_0x56d93f(0x12d)]=function(_0x240a2e){const _0x58c6f7=_0x56d93f;this[_0x58c6f7(0x1f9)]===undefined&&this[_0x58c6f7(0x121)](),this[_0x58c6f7(0x1f9)]=_0x240a2e;},Game_Action[_0x56d93f(0x36e)]=VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x211)][_0x56d93f(0x2ab)][_0x56d93f(0x2fc)],Game_Action[_0x56d93f(0x122)]=VisuMZ[_0x56d93f(0x29c)]['Settings'][_0x56d93f(0x2ab)][_0x56d93f(0x35f)],Game_Action[_0x56d93f(0x153)]=VisuMZ['BattleSystemOTB'][_0x56d93f(0x211)][_0x56d93f(0x2ab)][_0x56d93f(0x180)],Game_Action['OTB_CONVERT_AGI_DEBUFF_NEXT_TURN']=VisuMZ['BattleSystemOTB'][_0x56d93f(0x211)][_0x56d93f(0x2ab)]['ConvertAgiDebuffNext'],VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x2d1)]=Game_Action['prototype'][_0x56d93f(0x322)],Game_Action['prototype'][_0x56d93f(0x322)]=function(){const _0x4b6e7c=_0x56d93f;if(BattleManager[_0x4b6e7c(0x2df)]())return 0x0;else{if(_0x4b6e7c(0x1fa)!==_0x4b6e7c(0x1fa)){let _0x57cee4=_0x5a9a3e;_0x52a993[_0x4b6e7c(0x188)]&&(_0x57cee4=_0x579fc3['randomInt'](_0xfc573a[_0x4b6e7c(0x1ac)]-_0x2c1b0b)+_0x26518c),_0x3144f1[_0x4b6e7c(0x2b5)](_0x57cee4,0x0,_0x4c1c4d);}else return VisuMZ['BattleSystemOTB'][_0x4b6e7c(0x2d1)][_0x4b6e7c(0x320)](this);}},VisuMZ[_0x56d93f(0x29c)]['Game_Action_applyGlobal']=Game_Action[_0x56d93f(0x299)][_0x56d93f(0x150)],Game_Action[_0x56d93f(0x299)][_0x56d93f(0x150)]=function(){const _0x4c323c=_0x56d93f;VisuMZ[_0x4c323c(0x29c)][_0x4c323c(0x1ee)]['call'](this),this[_0x4c323c(0x274)]();},Game_Action[_0x56d93f(0x299)][_0x56d93f(0x274)]=function(){const _0x43fae1=_0x56d93f;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x43fae1(0x2df)]())return;if(!this[_0x43fae1(0x1d8)]())return;if(!this[_0x43fae1(0x236)]())return;const _0x3002bb=VisuMZ[_0x43fae1(0x29c)][_0x43fae1(0x305)],_0x3003b1=this[_0x43fae1(0x1d8)]()[_0x43fae1(0x1b1)];if(_0x3003b1['match'](_0x3002bb[_0x43fae1(0x344)])){if(_0x43fae1(0x2eb)===_0x43fae1(0x2eb))this[_0x43fae1(0x236)]()[_0x43fae1(0x2fe)](0x1);else return _0x2c12db(_0x1f85eb['$1']);}let _0x1745ad=this[_0x43fae1(0x2f1)](),_0x1492c5=this[_0x43fae1(0x26d)]();_0x1745ad!==0x0&&('bpXXk'===_0x43fae1(0x101)?BattleManager[_0x43fae1(0xef)](this['subject'](),-_0x1745ad,![]):this['createOrderPreviewSprite'](_0x1b9127,![],_0xf4f647)),_0x1492c5!==0x0&&(_0x43fae1(0x357)!=='aJVfK'?BattleManager[_0x43fae1(0xef)](this['subject'](),-_0x1492c5,!![]):this['_subject']['performActionEndOTB']());},Game_Action[_0x56d93f(0x299)][_0x56d93f(0x2f1)]=function(){const _0xae7b60=_0x56d93f;if(!SceneManager[_0xae7b60(0x1d7)]())return 0x0;if(!BattleManager[_0xae7b60(0x2df)]())return 0x0;if(!this['item']())return 0x0;if(!this[_0xae7b60(0x236)]())return 0x0;if(!this[_0xae7b60(0x236)]()[_0xae7b60(0x1b4)]())return 0x0;const _0x572503=VisuMZ[_0xae7b60(0x29c)][_0xae7b60(0x305)],_0x51aae5=this['item']()[_0xae7b60(0x1b1)],_0x1ecc92=BattleManager[_0xae7b60(0x106)]||[];let _0xf1a6b1=0x0;if(_0x51aae5['match'](_0x572503[_0xae7b60(0x380)])){if('WttGR'!=='WttGR'){if(!_0x21e970)return;if(_0x1edac4===0x0)return;const _0xeefb7d=_0x32b96a?_0x50b20a['_otb_actionBattlersNext']:_0x58493a[_0xae7b60(0x106)],_0x5656c8=_0xe8513d[_0xae7b60(0x29c)][_0xae7b60(0x35a)](_0x3bd5da,_0xeefb7d),_0x1d261e=_0x48e3b4?this['_nextTurn']:this['_currentTurn'],_0x5bcbe7=_0x334e59?this[_0xae7b60(0x1a3)]:this[_0xae7b60(0x355)];if(_0x5656c8['length']<=0x0)return;for(let _0x369c3b=0x0;_0x369c3b<_0x5656c8[_0xae7b60(0x1ac)];_0x369c3b++){const _0x1d1184=new _0x4a5237(_0x68eda2,_0x369c3b,_0x1d261e,_0x1fb2f4);this['_previewContainer'][_0xae7b60(0x1de)](_0x1d1184),_0x5bcbe7['push'](_0x1d1184),_0x1d1184[_0xae7b60(0x1ce)](),_0x1d1184[_0xae7b60(0x317)](0xff);}}else{if(_0x1ecc92[_0xae7b60(0x1ec)](this[_0xae7b60(0x236)]())){if(_0xae7b60(0x2c6)!==_0xae7b60(0x356))_0xf1a6b1+=Number(RegExp['$1']);else{if(!_0x4c79db)return;const _0x3e9cce=_0x4decf1?this[_0xae7b60(0x11c)]:this[_0xae7b60(0x106)];if(!_0x3e9cce)return;if(!_0x3e9cce[_0xae7b60(0x1ec)](_0x13de79))return;const _0xcb8b94=_0x2e84f2[_0xae7b60(0x29c)][_0xae7b60(0x35a)](_0x5703ad,_0x3e9cce),_0x3f6671=_0x361f6d?_0x14334c[_0xae7b60(0x29c)]['getInfinityClamp'](_0x3e9cce):0x0,_0xe057e6=_0xcb8b94[_0xae7b60(0x1ac)]-0x1;for(let _0x3efe88=_0xe057e6;_0x3efe88>=0x0;_0x3efe88--){_0x3e9cce[_0xae7b60(0x2b5)](_0xcb8b94[_0x3efe88],0x1);}for(var _0x1a63bd=0x0;_0x1a63bd<_0xcb8b94[_0xae7b60(0x1ac)];_0x1a63bd++){var _0x16b981=(_0xcb8b94[_0x1a63bd]-_0x33c61a)['clamp'](_0x3f6671,_0x3e9cce[_0xae7b60(0x1ac)]);_0x3e9cce[_0xae7b60(0x2b5)](_0x16b981,0x0,_0x33466c);}this[_0xae7b60(0x2c2)](),this[_0xae7b60(0x14f)]();}}}}return _0x51aae5[_0xae7b60(0x2d2)](_0x572503['UserCurrOrder'])&&(_0xf1a6b1+=Number(RegExp['$1'])),_0xf1a6b1;},Game_Action[_0x56d93f(0x299)]['otbCalcUserNextOrderChange']=function(){const _0x48de4e=_0x56d93f;if(!SceneManager[_0x48de4e(0x1d7)]())return 0x0;if(!BattleManager[_0x48de4e(0x2df)]())return 0x0;if(!this['item']())return 0x0;if(!this[_0x48de4e(0x236)]())return 0x0;if(!this['subject']()[_0x48de4e(0x1b4)]())return 0x0;const _0x238b75=VisuMZ[_0x48de4e(0x29c)]['Settings'][_0x48de4e(0x346)],_0xa7518d=VisuMZ[_0x48de4e(0x29c)][_0x48de4e(0x305)],_0x22aa88=this[_0x48de4e(0x1d8)]()[_0x48de4e(0x1b1)],_0x4855b9=BattleManager[_0x48de4e(0x11c)]||[];let _0x5ae12e=0x0;if(_0x238b75[_0x48de4e(0x17c)]){if(_0x48de4e(0x36a)==='OYrpI')_0x5ae12e+=_0x238b75[_0x48de4e(0x17c)][_0x48de4e(0x320)](this);else{if(!this[_0x48de4e(0x2df)]())return;const _0x378bdd=_0x467aef['_scene'][_0x48de4e(0x1af)];if(!_0x378bdd)return;_0x378bdd['removeCurrentSubject']();}}_0x22aa88[_0x48de4e(0x2d2)](_0xa7518d[_0x48de4e(0x380)])&&(_0x4855b9[_0x48de4e(0x1ec)](this['subject']())&&(_0x48de4e(0xfa)===_0x48de4e(0x36d)?_0x598b91[_0x48de4e(0x29c)][_0x48de4e(0x35e)]['call'](this):_0x5ae12e+=Number(RegExp['$1'])));if(_0x22aa88[_0x48de4e(0x2d2)](_0xa7518d['UserNextOrder'])){if(_0x48de4e(0x165)!==_0x48de4e(0x10b))_0x5ae12e+=Number(RegExp['$1']);else return'icon';}return _0x5ae12e;},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x18c)]=Game_Action[_0x56d93f(0x299)][_0x56d93f(0x2b8)],Game_Action[_0x56d93f(0x299)][_0x56d93f(0x2b8)]=function(_0x1809ba){const _0x3ad5f9=_0x56d93f;VisuMZ[_0x3ad5f9(0x29c)][_0x3ad5f9(0x18c)]['call'](this,_0x1809ba),this[_0x3ad5f9(0x1a1)](_0x1809ba),this[_0x3ad5f9(0xff)](_0x1809ba);},Game_Action[_0x56d93f(0x299)][_0x56d93f(0x1a1)]=function(_0x22a2af){const _0x23c355=_0x56d93f;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x23c355(0x2df)]())return;if(!this[_0x23c355(0x1d8)]())return;if(!_0x22a2af)return;const _0x35dd99=VisuMZ['BattleSystemOTB'][_0x23c355(0x305)],_0x5beaec=this[_0x23c355(0x1d8)]()[_0x23c355(0x1b1)];if(_0x5beaec[_0x23c355(0x2d2)](_0x35dd99['UserAddActionCurrent'])){if(_0x23c355(0x1fb)!==_0x23c355(0x1fb))this['_requestTurnOrderUpdate']=!![];else{const _0x40e598=!![],_0x4209ef=Number(RegExp['$1'])||0x0;this[_0x23c355(0x236)]()['otbAddActions'](_0x4209ef,_0x40e598);}}if(_0x5beaec[_0x23c355(0x2d2)](_0x35dd99[_0x23c355(0x26e)])){const _0x13ebda=![],_0x337f51=Number(RegExp['$1'])||0x0;this['subject']()[_0x23c355(0x2b6)](_0x337f51,_0x13ebda);}if(_0x5beaec[_0x23c355(0x2d2)](_0x35dd99['TargetAddActionCurrent'])){if(_0x23c355(0x300)!==_0x23c355(0x385)){const _0x27d65e=!![],_0x24fdab=Number(RegExp['$1'])||0x0;_0x22a2af[_0x23c355(0x2b6)](_0x24fdab,_0x27d65e);}else return this[_0x23c355(0x325)]();}if(_0x5beaec[_0x23c355(0x2d2)](_0x35dd99[_0x23c355(0x343)])){const _0x285f24=![],_0x281c05=Number(RegExp['$1'])||0x0;_0x22a2af[_0x23c355(0x2b6)](_0x281c05,_0x285f24);}},Game_Action[_0x56d93f(0x299)][_0x56d93f(0xff)]=function(_0x96c696){const _0x3534f0=_0x56d93f;if(!SceneManager[_0x3534f0(0x1d7)]())return;if(!BattleManager[_0x3534f0(0x2df)]())return;if(!this[_0x3534f0(0x1d8)]())return;if(!_0x96c696)return;if(!_0x96c696['canChangeOtbTurnOrder']())return 0x0;let _0x4cf1f5=this[_0x3534f0(0x33e)](_0x96c696),_0x553d7a=this[_0x3534f0(0x285)](_0x96c696);_0x4cf1f5!==0x0&&BattleManager['turnOrderChangeOTB'](_0x96c696,-_0x4cf1f5,![]),_0x553d7a!==0x0&&BattleManager[_0x3534f0(0xef)](_0x96c696,-_0x553d7a,!![]);},Game_Action[_0x56d93f(0x299)][_0x56d93f(0x33e)]=function(_0x394950){const _0x5b0ae8=_0x56d93f;if(!SceneManager[_0x5b0ae8(0x1d7)]())return 0x0;if(!BattleManager[_0x5b0ae8(0x2df)]())return 0x0;if(!this[_0x5b0ae8(0x1d8)]())return 0x0;if(!_0x394950)return 0x0;if(!_0x394950[_0x5b0ae8(0x1b4)]())return 0x0;const _0x43552d=VisuMZ[_0x5b0ae8(0x29c)]['RegExp'],_0x4e869c=this[_0x5b0ae8(0x1d8)]()['note'],_0x3944a8=BattleManager[_0x5b0ae8(0x106)]||[];let _0x313659=0x0;_0x4e869c[_0x5b0ae8(0x2d2)](_0x43552d['TargetFollOrder'])&&(_0x3944a8[_0x5b0ae8(0x1ec)](_0x394950)&&(_0x313659+=Number(RegExp['$1'])));_0x4e869c[_0x5b0ae8(0x2d2)](_0x43552d[_0x5b0ae8(0x1b3)])&&(_0x313659+=Number(RegExp['$1']));const _0x251d58=this['item']()[_0x5b0ae8(0x304)];for(const _0x5370eb of _0x251d58){if(_0x5b0ae8(0x157)===_0x5b0ae8(0x1e8))_0x43bd96[_0x5b0ae8(0x2ee)](),_0x34ba39[_0x5b0ae8(0x29c)][_0x5b0ae8(0x103)]['call'](this);else{if(!_0x5370eb)continue;if(_0x5370eb[_0x5b0ae8(0x143)]===Game_Action[_0x5b0ae8(0x131)]&&_0x5370eb[_0x5b0ae8(0x159)]===0x6){if('EafEF'===_0x5b0ae8(0x277))return _0x347d41[_0x5b0ae8(0x242)]['_otbTurnOrderWindow'];else{if(Game_Action[_0x5b0ae8(0x36e)])_0x313659-=0x1;}}if(_0x5370eb[_0x5b0ae8(0x143)]===Game_Action['EFFECT_ADD_DEBUFF']&&_0x5370eb[_0x5b0ae8(0x159)]===0x6){if(Game_Action[_0x5b0ae8(0x122)])_0x313659+=0x1;}}}return _0x313659;},Game_Action[_0x56d93f(0x299)][_0x56d93f(0x285)]=function(_0x233b0b){const _0x4f6218=_0x56d93f;if(!SceneManager[_0x4f6218(0x1d7)]())return 0x0;if(!BattleManager[_0x4f6218(0x2df)]())return 0x0;if(!this['item']())return 0x0;if(!_0x233b0b)return 0x0;if(!_0x233b0b['canChangeOtbTurnOrder']())return 0x0;const _0x154824=VisuMZ[_0x4f6218(0x29c)][_0x4f6218(0x305)],_0x22fae7=this[_0x4f6218(0x1d8)]()[_0x4f6218(0x1b1)],_0x2e45d4=BattleManager[_0x4f6218(0x11c)]||[];let _0x3cf804=0x0;if(_0x22fae7['match'](_0x154824[_0x4f6218(0x2ce)])){if(_0x2e45d4['includes'](_0x233b0b)){if(_0x4f6218(0x18d)==='VKClC')_0x3cf804+=Number(RegExp['$1']);else{if(!this[_0x4f6218(0x2df)]())return;const _0x4b7fff=_0x7cf31d[_0x4f6218(0x242)][_0x4f6218(0x1af)];if(!_0x4b7fff)return;_0x4b7fff['shiftNextTurnSpritesToCurrentTurn']();}}}_0x22fae7[_0x4f6218(0x2d2)](_0x154824['TargetNextOrder'])&&(_0x4f6218(0x1bf)!==_0x4f6218(0x268)?_0x3cf804+=Number(RegExp['$1']):this[_0x4f6218(0x1cf)]=_0x4f6218(0x345));const _0x1bc939=this['item']()[_0x4f6218(0x304)];for(const _0x5b593c of _0x1bc939){if(_0x4f6218(0x309)===_0x4f6218(0x309)){if(!_0x5b593c)continue;if(_0x5b593c[_0x4f6218(0x143)]===Game_Action[_0x4f6218(0x131)]&&_0x5b593c[_0x4f6218(0x159)]===0x6){if(Game_Action['OTB_CONVERT_AGI_BUFF_NEXT_TURN'])_0x3cf804-=0x1;}if(_0x5b593c[_0x4f6218(0x143)]===Game_Action[_0x4f6218(0x16e)]&&_0x5b593c[_0x4f6218(0x159)]===0x6){if('ssiCj'!==_0x4f6218(0x378)){if(!this[_0x4f6218(0x2df)]())return;const _0x21c0d8=_0x4a0a8a[_0x4f6218(0x242)][_0x4f6218(0x1af)];if(!_0x21c0d8)return;_0x21c0d8[_0x4f6218(0x36f)]();}else{if(Game_Action[_0x4f6218(0x1b8)])_0x3cf804+=0x1;}}}else this[_0x4f6218(0x1c7)](),_0x381bee&&_0x27192c[_0x4f6218(0x1d8)]()!==null&&this['createOrderPreview'](_0x2127ae);}return _0x3cf804;},Game_BattlerBase['prototype']['clearTurnOrderOTBGraphics']=function(){const _0x681290=_0x56d93f;delete this[_0x681290(0x370)],delete this['_otbTurnOrderFaceName'],delete this[_0x681290(0x315)],delete this['_otbTurnOrderIconIndex'];},Game_BattlerBase['prototype']['TurnOrderOTBGraphicType']=function(){const _0x1108f9=_0x56d93f;return this[_0x1108f9(0x370)]===undefined&&(this[_0x1108f9(0x370)]=this[_0x1108f9(0x2cc)]()),this[_0x1108f9(0x370)];},Game_BattlerBase[_0x56d93f(0x299)]['createTurnOrderOTBGraphicType']=function(){const _0x35f1db=_0x56d93f;return Window_OTB_TurnOrder['Settings'][_0x35f1db(0x238)];},Game_BattlerBase[_0x56d93f(0x299)]['TurnOrderOTBGraphicFaceName']=function(){const _0xff9469=_0x56d93f;return this[_0xff9469(0x213)]===undefined&&(this['_otbTurnOrderFaceName']=this[_0xff9469(0x267)]()),this[_0xff9469(0x213)];},Game_BattlerBase['prototype'][_0x56d93f(0x267)]=function(){const _0x46e8d6=_0x56d93f;return Window_OTB_TurnOrder[_0x46e8d6(0x211)][_0x46e8d6(0x1da)];},Game_BattlerBase[_0x56d93f(0x299)]['TurnOrderOTBGraphicFaceIndex']=function(){const _0x35b99b=_0x56d93f;if(this[_0x35b99b(0x315)]===undefined){if(_0x35b99b(0x333)===_0x35b99b(0x333))this[_0x35b99b(0x315)]=this[_0x35b99b(0x185)]();else{const _0x149830=new _0xe8f89b();_0x149830[_0x35b99b(0x1d4)]['x']=this[_0x35b99b(0x1d4)]['x'],_0x149830['anchor']['y']=this[_0x35b99b(0x1d4)]['y'],this[_0x35b99b(0x2f8)]=_0x149830,this[_0x35b99b(0x1de)](this[_0x35b99b(0x2f8)]),this[_0x35b99b(0x325)]();}}return this[_0x35b99b(0x315)];},Game_BattlerBase['prototype'][_0x56d93f(0x185)]=function(){const _0x54f1c7=_0x56d93f;return Window_OTB_TurnOrder[_0x54f1c7(0x211)][_0x54f1c7(0x30d)];},Game_BattlerBase['prototype']['TurnOrderOTBGraphicIconIndex']=function(){const _0x3b7ba2=_0x56d93f;return this['_otbTurnOrderIconIndex']===undefined&&(this[_0x3b7ba2(0x1ab)]=this['createTurnOrderOTBGraphicIconIndex']()),this['_otbTurnOrderIconIndex'];},Game_BattlerBase[_0x56d93f(0x299)][_0x56d93f(0x203)]=function(){const _0x13993f=_0x56d93f;return Window_OTB_TurnOrder[_0x13993f(0x211)]['EnemyBattlerIcon'];},Game_BattlerBase[_0x56d93f(0x299)][_0x56d93f(0x379)]=function(_0xb81a69){const _0x420f01=_0x56d93f;this[_0x420f01(0x1ab)]=_0xb81a69;},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x104)]=Game_BattlerBase[_0x56d93f(0x299)]['hide'],Game_BattlerBase[_0x56d93f(0x299)][_0x56d93f(0x32a)]=function(){const _0x45af27=_0x56d93f;VisuMZ[_0x45af27(0x29c)][_0x45af27(0x104)][_0x45af27(0x320)](this),BattleManager['removeActionBattlersOTB']();},VisuMZ['BattleSystemOTB'][_0x56d93f(0x2a1)]=Game_BattlerBase[_0x56d93f(0x299)][_0x56d93f(0x376)],Game_BattlerBase['prototype']['appear']=function(){const _0x1e1338=_0x56d93f,_0x1325c3=this[_0x1e1338(0x2b7)];VisuMZ[_0x1e1338(0x29c)]['Game_BattlerBase_appear']['call'](this),BattleManager['isOTB']()&&SceneManager[_0x1e1338(0x1d7)]()&&_0x1325c3&&!this[_0x1e1338(0x2b7)]&&('HXrqV'!==_0x1e1338(0x2af)?BattleManager['otbReturnBattlerToTurnOrders'](this):_0x1aa354[_0x1e1338(0x2c8)]());},VisuMZ[_0x56d93f(0x29c)]['Game_Battler_performCollapse']=Game_Battler['prototype'][_0x56d93f(0x252)],Game_Battler[_0x56d93f(0x299)]['performCollapse']=function(){const _0x441d1a=_0x56d93f;VisuMZ['BattleSystemOTB'][_0x441d1a(0x151)][_0x441d1a(0x320)](this),BattleManager[_0x441d1a(0x2c2)]();},Game_Battler[_0x56d93f(0x22b)]=VisuMZ['BattleSystemOTB']['Settings'][_0x56d93f(0x346)][_0x56d93f(0x32e)],VisuMZ[_0x56d93f(0x29c)]['Game_Battler_onBattleStart']=Game_Battler[_0x56d93f(0x299)][_0x56d93f(0x2b0)],Game_Battler[_0x56d93f(0x299)][_0x56d93f(0x2b0)]=function(_0x4847d7){const _0x3c7ecd=_0x56d93f;VisuMZ[_0x3c7ecd(0x29c)][_0x3c7ecd(0x1a4)][_0x3c7ecd(0x320)](this,_0x4847d7),this[_0x3c7ecd(0x228)](_0x4847d7);},Game_Battler['prototype']['onBattleStartOTB']=function(_0x51da76){const _0x422950=_0x56d93f;if(!BattleManager['isOTB']())return;this[_0x422950(0x2dc)]=0x0;},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x259)]=Game_Battler[_0x56d93f(0x299)]['onBattleEnd'],Game_Battler[_0x56d93f(0x299)]['onBattleEnd']=function(){const _0x58178e=_0x56d93f;VisuMZ[_0x58178e(0x29c)][_0x58178e(0x259)]['call'](this),this[_0x58178e(0x2b1)]();},Game_Battler[_0x56d93f(0x299)][_0x56d93f(0x2b1)]=function(){const _0x25cf3a=_0x56d93f;if(!BattleManager[_0x25cf3a(0x2df)]())return;this[_0x25cf3a(0x2dc)]=0x0;},Game_Battler[_0x56d93f(0x299)][_0x56d93f(0x1cc)]=function(){const _0x175e1c=_0x56d93f;if(!BattleManager[_0x175e1c(0x2df)]())return;this['_otbTimesActedThisTurn']=this[_0x175e1c(0x2dc)]||0x0,this['_otbTimesActedThisTurn']++;if(this['numActions']()>0x0&&this===BattleManager[_0x175e1c(0x323)]){const _0x3a6874=BattleManager['_forcedBattlers'];if(_0x3a6874[_0x175e1c(0x1ac)]>0x0&&_0x3a6874[0x0]!==this)return;const _0x41e9c8=this['battler']();if(_0x41e9c8&&BattleManager[_0x175e1c(0x232)](this))_0x41e9c8[_0x175e1c(0x312)]();}},BattleManager[_0x56d93f(0x232)]=function(_0x1b9ce7){const _0x245a3a=_0x56d93f;if(!_0x1b9ce7)return![];return this[_0x245a3a(0x106)][0x0]===_0x1b9ce7;},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x332)]=Game_Battler[_0x56d93f(0x299)]['onTurnEnd'],Game_Battler['prototype'][_0x56d93f(0x1e7)]=function(){const _0x1570bf=_0x56d93f;VisuMZ[_0x1570bf(0x29c)][_0x1570bf(0x332)][_0x1570bf(0x320)](this),this[_0x1570bf(0xf3)]();},Game_Battler[_0x56d93f(0x299)][_0x56d93f(0xf3)]=function(){const _0x1cf7cf=_0x56d93f;if(!BattleManager['isOTB']())return;this[_0x1cf7cf(0x2dc)]=0x0;},VisuMZ[_0x56d93f(0x29c)]['Game_Battler_makeSpeed']=Game_Battler[_0x56d93f(0x299)][_0x56d93f(0x2c8)],Game_Battler[_0x56d93f(0x299)][_0x56d93f(0x2c8)]=function(){const _0xbf3321=_0x56d93f;BattleManager[_0xbf3321(0x2df)]()?this[_0xbf3321(0x31d)]():_0xbf3321(0x2f3)===_0xbf3321(0x181)?_0x4143c6=_0x87666[_0xbf3321(0x301)]?_0xbf3321(0x13c):_0xbf3321(0x34c):VisuMZ[_0xbf3321(0x29c)][_0xbf3321(0x112)]['call'](this);},Game_Battler[_0x56d93f(0x299)][_0x56d93f(0x31d)]=function(){const _0xd72604=_0x56d93f;if(this[_0xd72604(0x24c)]())this[_0xd72604(0x30f)]=Infinity;else{if(_0xd72604(0x245)!=='frxkQ')_0x2d8897['includes'](_0x240a8f)&&(_0x1a8130+=_0x5abe87(_0x476f54['$1']));else{const _0x4d6b8f=this[_0xd72604(0x38f)]()||new Game_Action(this);this[_0xd72604(0x30f)]=VisuMZ[_0xd72604(0x29c)][_0xd72604(0x211)][_0xd72604(0x346)][_0xd72604(0x20c)]['call'](_0x4d6b8f);}}},Game_Battler['prototype'][_0x56d93f(0x24c)]=function(){const _0x53c5d1=_0x56d93f;if(!Game_Battler['OTB_STUN_INFINITY_SPEED'])return![];if(!this[_0x53c5d1(0x1bc)]())return![];if(!this[_0x53c5d1(0x311)]())return![];if(this[_0x53c5d1(0xf0)]())return![];const _0x42b27b=JsonEx[_0x53c5d1(0x23b)](this);return _0x42b27b['_tempActor']=!![],_0x42b27b[_0x53c5d1(0x38c)]=!![],_0x42b27b[_0x53c5d1(0x292)](),_0x42b27b['removeStatesAuto'](0x1),_0x42b27b[_0x53c5d1(0x310)](0x2),_0x42b27b[_0x53c5d1(0x13a)](),_0x42b27b['canMove']();},VisuMZ['BattleSystemOTB'][_0x56d93f(0x2b3)]=Game_Action[_0x56d93f(0x299)][_0x56d93f(0x1c6)],Game_Action[_0x56d93f(0x299)][_0x56d93f(0x1c6)]=function(){const _0x38625b=_0x56d93f;return BattleManager[_0x38625b(0x2df)]()?VisuMZ[_0x38625b(0x29c)]['Settings'][_0x38625b(0x346)][_0x38625b(0x2ed)]:VisuMZ[_0x38625b(0x29c)][_0x38625b(0x2b3)][_0x38625b(0x320)](this);},Game_Battler['prototype'][_0x56d93f(0x2fe)]=function(_0x1c58e3){const _0x38f571=_0x56d93f;if(!this['canMove']())return;this[_0x38f571(0x2dc)]=this[_0x38f571(0x2dc)]||0x0,this[_0x38f571(0x2dc)]--,BattleManager[_0x38f571(0x16f)](this,_0x1c58e3,BattleManager[_0x38f571(0x106)]);},Game_Battler[_0x56d93f(0x299)][_0x56d93f(0x2b6)]=function(_0x25f7c9,_0x213356){const _0x3a55da=_0x56d93f;if(!this[_0x3a55da(0xf0)]())return;if(_0x213356)_0x3a55da(0x2d0)==='XoFHg'?BattleManager['otbAddBattlerToTurnOrderAtEnd'](this,_0x25f7c9,BattleManager[_0x3a55da(0x106)]):_0x132bac[_0x3a55da(0x253)]=_0x3e946c[_0x3a55da(0x23c)](_0x5f4bc8[_0x28dc32]);else{if('TLxFZ'!==_0x3a55da(0x127))BattleManager['otbAddBattlerToTurnOrderAtEnd'](this,_0x25f7c9,BattleManager[_0x3a55da(0x11c)]);else{const _0x410d59=this['_nextX']+_0x2c3ff1[_0x3a55da(0x28e)],_0x572519=_0x2a0f1e+_0x1556dd[_0x3a55da(0x217)],_0x2aae2c=this[_0x3a55da(0x10a)];this[_0x3a55da(0x369)](_0x47f5bf[_0x3a55da(0x163)],_0x410d59,_0x572519,_0x2aae2c,_0xba06c8);}}},Game_Battler[_0x56d93f(0x299)]['canChangeOtbTurnOrder']=function(){const _0x3efc13=_0x56d93f;if(this[_0x3efc13(0x322)]()===Infinity)return![];return!![];},Game_Battler['prototype'][_0x56d93f(0x35c)]=function(_0x8422d4,_0x8ba46e){const _0x2af75f=_0x56d93f;if(this['_tempBattler']||this['_tempActor'])return;if(!SceneManager[_0x2af75f(0x1d7)]())return;if(!BattleManager[_0x2af75f(0x2df)]())return;if(_0x8422d4&&!this[_0x2af75f(0xf0)]()){if(_0x2af75f(0x108)!=='bbgjG')BattleManager['removeActionBattlersOTB']();else{const _0x542539=_0x46be69[_0x2af75f(0x211)];return _0x542539[_0x2af75f(0x28b)];}}else!_0x8422d4&&this['canMove']()&&(_0x2af75f(0x15e)===_0x2af75f(0x15e)?BattleManager[_0x2af75f(0x27a)](this):_0x1e5e23['bitmap']=_0x4b194d[_0x2af75f(0x23c)](_0x8fbd42[_0x4c3854]));if(this[_0x2af75f(0xf0)]()){if(_0x2af75f(0x2e5)!=='DqEYR'){const _0x1f639b=this[_0x2af75f(0x371)]()-_0x8ba46e;_0x1f639b>0x0&&(_0x2af75f(0x330)!==_0x2af75f(0x120)?(BattleManager[_0x2af75f(0x1f6)](this,_0x1f639b,BattleManager[_0x2af75f(0x106)]),BattleManager[_0x2af75f(0x1f6)](this,_0x1f639b,BattleManager[_0x2af75f(0x11c)])):_0xe8ab00[_0x2af75f(0x27a)](this));}else _0x410fe1[_0x2af75f(0x1f6)](this,_0x33f61f,_0x56dd2f[_0x2af75f(0x106)]);}},VisuMZ['BattleSystemOTB'][_0x56d93f(0x363)]=Game_Battler[_0x56d93f(0x299)][_0x56d93f(0x100)],Game_Battler['prototype'][_0x56d93f(0x100)]=function(_0x46c960){const _0x51305c=_0x56d93f,_0x19f737=this[_0x51305c(0xf0)](),_0x234a21=this[_0x51305c(0x371)]();VisuMZ[_0x51305c(0x29c)][_0x51305c(0x363)][_0x51305c(0x320)](this,_0x46c960),this[_0x51305c(0x35c)](_0x19f737,_0x234a21);},VisuMZ['BattleSystemOTB'][_0x56d93f(0x189)]=Game_Battler[_0x56d93f(0x299)][_0x56d93f(0xf7)],Game_Battler[_0x56d93f(0x299)][_0x56d93f(0xf7)]=function(_0x36dd68){const _0xde9083=_0x56d93f,_0x4ef733=this[_0xde9083(0xf0)](),_0x1423f3=this[_0xde9083(0x371)]();VisuMZ['BattleSystemOTB'][_0xde9083(0x189)][_0xde9083(0x320)](this,_0x36dd68),this[_0xde9083(0x35c)](_0x4ef733,_0x1423f3);},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x135)]=Game_BattlerBase[_0x56d93f(0x299)]['recoverAll'],Game_BattlerBase[_0x56d93f(0x299)][_0x56d93f(0x35d)]=function(){const _0x5755c5=_0x56d93f;if(BattleManager['isOTB']())this[_0x5755c5(0xf7)](this['deathStateId']());VisuMZ['BattleSystemOTB'][_0x5755c5(0x135)]['call'](this);if(BattleManager['isOTB']())this[_0x5755c5(0x13a)]();},VisuMZ[_0x56d93f(0x29c)]['Game_Battler_forceAction']=Game_Battler[_0x56d93f(0x299)][_0x56d93f(0x23a)],Game_Battler[_0x56d93f(0x299)][_0x56d93f(0x23a)]=function(_0x192a7b,_0x5ac4b8){const _0x38dd59=_0x56d93f;BattleManager[_0x38dd59(0x2df)]()?this[_0x38dd59(0x247)](_0x192a7b,_0x5ac4b8):'hUWrI'===_0x38dd59(0x270)?VisuMZ[_0x38dd59(0x29c)][_0x38dd59(0x377)][_0x38dd59(0x320)](this,_0x192a7b,_0x5ac4b8):this[_0x38dd59(0x1ab)]=_0x597cce;},Game_Battler['prototype'][_0x56d93f(0x247)]=function(_0x470120,_0x16cd7c){const _0xed5a90=_0x56d93f,_0x2de5de=new Game_Action(this,!![]);_0x2de5de[_0xed5a90(0x2bd)](_0x470120),_0x2de5de[_0xed5a90(0x146)]=!![];if(_0x16cd7c===-0x2)_0x2de5de['setTarget'](this[_0xed5a90(0x1a9)]);else _0x16cd7c===-0x1?_0xed5a90(0x11a)!==_0xed5a90(0x11a)?(_0x52005a[_0xed5a90(0x29c)][_0xed5a90(0x18c)][_0xed5a90(0x320)](this,_0x166f2b),this[_0xed5a90(0x1a1)](_0x332896),this[_0xed5a90(0xff)](_0x23d04f)):_0x2de5de[_0xed5a90(0x2aa)]():_0xed5a90(0x138)===_0xed5a90(0x138)?_0x2de5de[_0xed5a90(0x2a6)](_0x16cd7c):_0x24b00a[_0xed5a90(0x1a2)]=0xff;this[_0xed5a90(0x26b)]['push'](_0x2de5de);},VisuMZ[_0x56d93f(0x29c)]['BattleManager_forceAction']=BattleManager[_0x56d93f(0x23a)],BattleManager[_0x56d93f(0x23a)]=function(_0x11236c){const _0x2eccef=_0x56d93f;if(BattleManager[_0x2eccef(0x2df)]())this['forceActionOTB'](_0x11236c);else{if(_0x2eccef(0x102)===_0x2eccef(0x338))return-_0x249082;else VisuMZ[_0x2eccef(0x29c)]['BattleManager_forceAction'][_0x2eccef(0x320)](this,_0x11236c);}},BattleManager[_0x56d93f(0x247)]=function(_0x19bbb4){BattleManager['otbAddForceActionBattler'](_0x19bbb4);},VisuMZ['BattleSystemOTB'][_0x56d93f(0x2d8)]=Game_Actor[_0x56d93f(0x299)][_0x56d93f(0x18b)],Game_Actor[_0x56d93f(0x299)]['selectNextCommand']=function(){const _0x50b6a7=_0x56d93f;if(BattleManager[_0x50b6a7(0x2df)]()){if(this[_0x50b6a7(0x124)]())this['battler']()[_0x50b6a7(0x312)]();return![];}return VisuMZ[_0x50b6a7(0x29c)][_0x50b6a7(0x2d8)][_0x50b6a7(0x320)](this);},Game_Actor['prototype'][_0x56d93f(0x2cc)]=function(){const _0x25f284=_0x56d93f,_0x369f69=this[_0x25f284(0x1f3)]()['note'];if(_0x369f69['match'](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x369f69['match'](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return _0x25f284(0x1e1);}return Window_OTB_TurnOrder[_0x25f284(0x211)][_0x25f284(0x1fc)];},Game_Actor[_0x56d93f(0x299)][_0x56d93f(0x267)]=function(){const _0x4541e3=_0x56d93f,_0x300003=this[_0x4541e3(0x1f3)]()[_0x4541e3(0x1b1)];if(_0x300003['match'](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x4541e3(0x29e)]();},Game_Actor[_0x56d93f(0x299)][_0x56d93f(0x185)]=function(){const _0x4abf94=_0x56d93f,_0xa13bd9=this['actor']()[_0x4abf94(0x1b1)];if(_0xa13bd9[_0x4abf94(0x2d2)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this['faceIndex']();},Game_Actor[_0x56d93f(0x299)]['createTurnOrderOTBGraphicIconIndex']=function(){const _0xca283c=_0x56d93f,_0x14ec89=this['actor']()[_0xca283c(0x1b1)];if(_0x14ec89[_0xca283c(0x2d2)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_OTB_TurnOrder[_0xca283c(0x211)][_0xca283c(0x32d)];},Game_Enemy[_0x56d93f(0x299)][_0x56d93f(0x2cc)]=function(){const _0x3ec401=_0x56d93f,_0x4ec095=this[_0x3ec401(0x331)]()[_0x3ec401(0x1b1)];if(_0x4ec095[_0x3ec401(0x2d2)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x3ec401(0x2cd)===_0x3ec401(0x2cd)?_0x3ec401(0x345):_0x3a6338[_0x3ec401(0x211)][_0x3ec401(0x30d)];else{if(_0x4ec095[_0x3ec401(0x2d2)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return _0x3ec401(0x1ca)===_0x3ec401(0x1ca)?'icon':_0x465752[_0x3ec401(0x28b)];}return Window_OTB_TurnOrder[_0x3ec401(0x211)][_0x3ec401(0x238)];},Game_Enemy[_0x56d93f(0x299)][_0x56d93f(0x267)]=function(){const _0x18b41f=_0x56d93f,_0x26faf8=this[_0x18b41f(0x331)]()['note'];if(_0x26faf8[_0x18b41f(0x2d2)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x18b41f(0x184)==='PqfAk'){if(this['_graphicSv']!==_0xbc8bb2[_0x18b41f(0x27b)]())return this['processUpdateGraphic']();}else return String(RegExp['$1']);}return Window_OTB_TurnOrder[_0x18b41f(0x211)][_0x18b41f(0x1da)];},Game_Enemy[_0x56d93f(0x299)][_0x56d93f(0x185)]=function(){const _0x2a76eb=_0x56d93f,_0x5ad0ba=this[_0x2a76eb(0x331)]()[_0x2a76eb(0x1b1)];if(_0x5ad0ba['match'](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_OTB_TurnOrder[_0x2a76eb(0x211)][_0x2a76eb(0x30d)];},Game_Enemy[_0x56d93f(0x299)][_0x56d93f(0x203)]=function(){const _0x1b6945=_0x56d93f,_0x386272=this[_0x1b6945(0x331)]()['note'];if(_0x386272[_0x1b6945(0x2d2)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_OTB_TurnOrder[_0x1b6945(0x211)]['EnemyBattlerIcon'];},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x221)]=Game_Party[_0x56d93f(0x299)][_0x56d93f(0x154)],Game_Party[_0x56d93f(0x299)][_0x56d93f(0x154)]=function(_0x14c6ee){const _0x148820=_0x56d93f;VisuMZ['BattleSystemOTB'][_0x148820(0x221)]['call'](this,_0x14c6ee);if(Imported[_0x148820(0x38d)])return;SceneManager['isSceneBattle']()&&BattleManager['isOTB']()&&('BSUHC'!=='ZLGpj'?(BattleManager[_0x148820(0x2c2)](),BattleManager[_0x148820(0x27a)]($gameActors[_0x148820(0x1f3)](_0x14c6ee))):_0x14bfe0=_0x1f9d71['randomInt'](_0x350488[_0x148820(0x1ac)]-_0x474942)+_0x200db5);},VisuMZ['BattleSystemOTB']['Game_Party_removeActor']=Game_Party['prototype'][_0x56d93f(0x2a8)],Game_Party[_0x56d93f(0x299)]['removeActor']=function(_0x5d5723){const _0x37672f=_0x56d93f;VisuMZ['BattleSystemOTB'][_0x37672f(0x2e7)][_0x37672f(0x320)](this,_0x5d5723),SceneManager[_0x37672f(0x1d7)]()&&BattleManager[_0x37672f(0x2df)]()&&BattleManager['removeActionBattlersOTB']();},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x2d5)]=Scene_Battle[_0x56d93f(0x299)]['createActorCommandWindow'],Scene_Battle['prototype'][_0x56d93f(0x273)]=function(){const _0x2f6e9d=_0x56d93f;VisuMZ[_0x2f6e9d(0x29c)]['Scene_Battle_createActorCommandWindow']['call'](this),BattleManager[_0x2f6e9d(0x2df)]()&&(_0x2f6e9d(0x1ba)!==_0x2f6e9d(0x1ba)?(_0x2aca0e[_0x2f6e9d(0x2ee)](),_0x21fd4e[_0x2f6e9d(0x29c)][_0x2f6e9d(0x2a2)][_0x2f6e9d(0x320)](this)):this[_0x2f6e9d(0x227)]());},Scene_Battle[_0x56d93f(0x299)]['createActorCommandWindowOTB']=function(){const _0x1c6b15=_0x56d93f,_0x52e786=this[_0x1c6b15(0x21c)];this[_0x1c6b15(0x2da)]()&&delete _0x52e786[_0x1c6b15(0xea)][_0x1c6b15(0x342)];},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x197)]=Scene_Battle[_0x56d93f(0x299)]['commandCancel'],Scene_Battle[_0x56d93f(0x299)][_0x56d93f(0x24b)]=function(){const _0x28b632=_0x56d93f;BattleManager[_0x28b632(0x2df)]()?this[_0x28b632(0x1f1)]():'kcDZA'==='QoXSr'?(_0x186db5[_0x28b632(0x23d)](_0x2af920,_0x298b2f,_0x329f47/0x2,_0x51ea53,_0x1c490c),_0x102988[_0x28b632(0x29b)](_0x4a7232+_0x4c8bf6/0x2,_0x28a32a,_0x2c3a42/0x2,_0x493862,_0xc35c45,_0x4739b2,![]),_0x2a92ae[_0x28b632(0x23d)](_0x1e4c27,_0x40997f,_0x49dd87/0x2,_0x2d4e49,_0x369b8f),_0x17ae4e[_0x28b632(0x29b)](_0x16d810+_0x46901a/0x2,_0x162e05,_0x7c5008/0x2,_0x12c742,_0x164afc,_0x416068,![]),_0x1dbbea[_0x28b632(0x23d)](_0x34011f,_0x5b5f8f,_0x3e2372/0x2,_0x4481fb,_0x1c97fe),_0x39f36d[_0x28b632(0x29b)](_0x2d94a7+_0x1e1a63/0x2,_0x55488c,_0x4bc5f9/0x2,_0x7c5f4b,_0x5deca7,_0x48f559,![])):VisuMZ[_0x28b632(0x29c)][_0x28b632(0x197)][_0x28b632(0x320)](this);},Scene_Battle[_0x56d93f(0x299)][_0x56d93f(0x1f1)]=function(){const _0x39e46f=_0x56d93f;BattleManager[_0x39e46f(0x2ee)](),this[_0x39e46f(0xec)]['setup'](),this['_actorCommandWindow'][_0x39e46f(0x308)]();},VisuMZ[_0x56d93f(0x29c)]['Scene_Battle_commandFight']=Scene_Battle[_0x56d93f(0x299)][_0x56d93f(0x14e)],Scene_Battle[_0x56d93f(0x299)]['commandFight']=function(){const _0x30748a=_0x56d93f;BattleManager[_0x30748a(0x2df)]()?_0x30748a(0x19f)===_0x30748a(0x19f)?this[_0x30748a(0x1d0)]():(_0x185d15[_0x30748a(0x299)][_0x30748a(0x1d2)][_0x30748a(0x320)](this),this['updateTurnOrders'](),this[_0x30748a(0x162)](),this[_0x30748a(0x1fe)](),this[_0x30748a(0x25c)]()):VisuMZ['BattleSystemOTB'][_0x30748a(0x17f)][_0x30748a(0x320)](this);},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x233)]=Scene_Battle[_0x56d93f(0x299)]['createAllWindows'],Scene_Battle[_0x56d93f(0x299)][_0x56d93f(0x296)]=function(){const _0x591fd8=_0x56d93f;VisuMZ[_0x591fd8(0x29c)][_0x591fd8(0x233)]['call'](this),this[_0x591fd8(0x114)]();},Scene_Battle['prototype'][_0x56d93f(0x114)]=function(){const _0x4f87ac=_0x56d93f;if(!BattleManager[_0x4f87ac(0x2df)]())return;this[_0x4f87ac(0x1af)]=new Window_OTB_TurnOrder();const _0x2cba53=this[_0x4f87ac(0x2f5)](this[_0x4f87ac(0x167)]);this[_0x4f87ac(0x2bc)](this[_0x4f87ac(0x1af)],_0x2cba53),this[_0x4f87ac(0x126)](),SceneManager[_0x4f87ac(0x354)]()&&(_0x4f87ac(0xfc)==='CcqKL'?this[_0x4f87ac(0x173)](_0x53962c,![],_0x2219f8):this[_0x4f87ac(0x1af)]['resumeTurnOrderSprites']());},Scene_Battle[_0x56d93f(0x299)][_0x56d93f(0x126)]=function(){const _0x21f5d5=_0x56d93f,_0x5000bc=Window_OTB_TurnOrder[_0x21f5d5(0x211)];if(_0x5000bc[_0x21f5d5(0x2a5)]!==_0x21f5d5(0x170))return;if(!_0x5000bc[_0x21f5d5(0x2a9)])return;if(!this[_0x21f5d5(0x27f)])return;const _0xc2e874=this[_0x21f5d5(0x1af)]['y']-Math[_0x21f5d5(0xee)]((Graphics['height']-Graphics[_0x21f5d5(0x23f)])/0x2),_0x317f95=_0xc2e874+this[_0x21f5d5(0x1af)][_0x21f5d5(0x24f)];this[_0x21f5d5(0x27f)]['y']=_0x317f95+(_0x5000bc['LogWindowOffsetY']||0x0);},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x1fd)]=Scene_Battle[_0x56d93f(0x299)][_0x56d93f(0x15d)],Scene_Battle[_0x56d93f(0x299)]['commandAttack']=function(){const _0x49292b=_0x56d93f;BattleManager[_0x49292b(0x2ee)](),VisuMZ[_0x49292b(0x29c)][_0x49292b(0x1fd)][_0x49292b(0x320)](this);},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x1d5)]=Scene_Battle[_0x56d93f(0x299)][_0x56d93f(0x16a)],Scene_Battle['prototype'][_0x56d93f(0x16a)]=function(){const _0x26d8a7=_0x56d93f;BattleManager[_0x26d8a7(0x2ee)](),VisuMZ['BattleSystemOTB']['Scene_Battle_commandGuard'][_0x26d8a7(0x320)](this);},VisuMZ[_0x56d93f(0x29c)]['Scene_Battle_onActorOk']=Scene_Battle['prototype']['onActorOk'],Scene_Battle[_0x56d93f(0x299)][_0x56d93f(0x18f)]=function(){const _0x2bdd88=_0x56d93f;BattleManager[_0x2bdd88(0x2ee)](),VisuMZ[_0x2bdd88(0x29c)]['Scene_Battle_onActorOk'][_0x2bdd88(0x320)](this);},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x24e)]=Scene_Battle[_0x56d93f(0x299)][_0x56d93f(0x169)],Scene_Battle['prototype'][_0x56d93f(0x169)]=function(){const _0x5f0bbc=_0x56d93f;BattleManager[_0x5f0bbc(0x2ee)](),VisuMZ[_0x5f0bbc(0x29c)][_0x5f0bbc(0x24e)][_0x5f0bbc(0x320)](this);},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x201)]=Scene_Battle[_0x56d93f(0x299)][_0x56d93f(0xf5)],Scene_Battle[_0x56d93f(0x299)][_0x56d93f(0xf5)]=function(){const _0x28c450=_0x56d93f;BattleManager[_0x28c450(0x2ee)](),VisuMZ[_0x28c450(0x29c)]['Scene_Battle_onEnemyOk'][_0x28c450(0x320)](this);},VisuMZ['BattleSystemOTB'][_0x56d93f(0x161)]=Scene_Battle[_0x56d93f(0x299)]['onEnemyCancel'],Scene_Battle[_0x56d93f(0x299)][_0x56d93f(0x1f2)]=function(){const _0x266e77=_0x56d93f;BattleManager[_0x266e77(0x2ee)](),VisuMZ[_0x266e77(0x29c)][_0x266e77(0x161)][_0x266e77(0x320)](this);},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x103)]=Scene_Battle[_0x56d93f(0x299)][_0x56d93f(0x2ac)],Scene_Battle[_0x56d93f(0x299)][_0x56d93f(0x2ac)]=function(){const _0x584cad=_0x56d93f;BattleManager[_0x584cad(0x2ee)](),VisuMZ[_0x584cad(0x29c)][_0x584cad(0x103)]['call'](this);},VisuMZ['BattleSystemOTB'][_0x56d93f(0x337)]=Scene_Battle[_0x56d93f(0x299)][_0x56d93f(0x28d)],Scene_Battle[_0x56d93f(0x299)][_0x56d93f(0x28d)]=function(){const _0x33c2da=_0x56d93f;BattleManager[_0x33c2da(0x2ee)](),VisuMZ['BattleSystemOTB'][_0x33c2da(0x337)][_0x33c2da(0x320)](this);},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x175)]=Scene_Battle['prototype'][_0x56d93f(0xeb)],Scene_Battle['prototype'][_0x56d93f(0xeb)]=function(){const _0x55f8d7=_0x56d93f;BattleManager[_0x55f8d7(0x2ee)](),VisuMZ['BattleSystemOTB'][_0x55f8d7(0x175)][_0x55f8d7(0x320)](this);},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x291)]=Scene_Battle[_0x56d93f(0x299)][_0x56d93f(0x20e)],Scene_Battle['prototype'][_0x56d93f(0x20e)]=function(){const _0xc1c2b5=_0x56d93f;BattleManager[_0xc1c2b5(0x2ee)](),VisuMZ[_0xc1c2b5(0x29c)]['Scene_Battle_onItemCancel'][_0xc1c2b5(0x320)](this);},VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x386)]=Scene_Battle['prototype']['actorCommandSingleSkill'],Scene_Battle[_0x56d93f(0x299)][_0x56d93f(0x1f0)]=function(){const _0x4c4d0b=_0x56d93f;BattleManager['otbPreviewOrderClear'](),VisuMZ[_0x4c4d0b(0x29c)][_0x4c4d0b(0x386)][_0x4c4d0b(0x320)](this);};function Sprite_OTB_TurnOrder_Battler(){const _0x203210=_0x56d93f;this[_0x203210(0x17e)](...arguments);}Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)]=Object[_0x56d93f(0x32f)](Sprite_Clickable[_0x56d93f(0x299)]),Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x361)]=Sprite_OTB_TurnOrder_Battler,Sprite_OTB_TurnOrder_Battler['prototype'][_0x56d93f(0x17e)]=function(_0x534995,_0x3d1d61,_0x4b14fe){const _0x23776e=_0x56d93f;this[_0x23776e(0x389)](_0x534995,_0x3d1d61,_0x4b14fe),Sprite_Clickable[_0x23776e(0x299)][_0x23776e(0x17e)][_0x23776e(0x320)](this),this[_0x23776e(0x1a2)]=0x0,this['createChildren'](),this[_0x23776e(0x12f)]();},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x389)]=function(_0x23f113,_0x3baf85,_0x9fc558){const _0x33773b=_0x56d93f;this[_0x33773b(0x33d)]=_0x23f113[_0x33773b(0x2c5)]()?$gameParty:$gameTroop,this[_0x33773b(0x2f2)]=_0x23f113['index'](),this[_0x33773b(0x329)]=_0x3baf85,this[_0x33773b(0x220)]=_0x9fc558;const _0x3b5426=Window_OTB_TurnOrder[_0x33773b(0x211)],_0x355afe=this['isHorz']();this[_0x33773b(0x2ae)]=0x0,this['_positionTargetX']=_0x3b5426[_0x33773b(0x301)]?-_0x3b5426[_0x33773b(0x28b)]:this[_0x33773b(0x258)]()[_0x33773b(0x283)],this[_0x33773b(0x145)]=0x0,this['_fadeDuration']=0x0,this[_0x33773b(0x1f5)]=0xff,this['_isAlive']=![],this[_0x33773b(0x275)]=![],this[_0x33773b(0x263)]=0x0,this['_containerHeight']=0x0;},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x166)]=function(){const _0x36097c=_0x56d93f;this[_0x36097c(0x204)](),this[_0x36097c(0x1eb)](),this[_0x36097c(0x2c4)](),this[_0x36097c(0x1f4)](),this[_0x36097c(0x193)]();},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x204)]=function(){const _0x100177=_0x56d93f;this['x']=this[_0x100177(0x22c)],this['y']=this[_0x100177(0x145)];},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x35b)]=function(){return!![];},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x2c0)]=function(){const _0x1f7127=_0x56d93f,_0x3be9ae=Window_OTB_TurnOrder[_0x1f7127(0x211)];return _0x3be9ae['SpriteThin'];},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x33f)]=function(){const _0x5bdd6b=_0x56d93f,_0xd5a525=Window_OTB_TurnOrder[_0x5bdd6b(0x211)];return _0xd5a525[_0x5bdd6b(0x105)];},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x179)]=function(){const _0x4f76b2=_0x56d93f;return this[_0x4f76b2(0x33d)]===$gameParty?_0x4f76b2(0x17b):'Enemy';},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x1eb)]=function(){const _0x175169=_0x56d93f;if(!Window_OTB_TurnOrder[_0x175169(0x211)][_0x175169(0x243)])return;const _0x726a36=Window_OTB_TurnOrder[_0x175169(0x211)],_0x1a45c7=this[_0x175169(0x179)](),_0x1c4318=_0x175169(0x218)[_0x175169(0x21a)](_0x1a45c7),_0x5db7e0=new Sprite();_0x5db7e0[_0x175169(0x1d4)]['x']=this[_0x175169(0x1d4)]['x'],_0x5db7e0[_0x175169(0x1d4)]['y']=this[_0x175169(0x1d4)]['y'];if(_0x726a36[_0x1c4318])_0x5db7e0[_0x175169(0x253)]=ImageManager[_0x175169(0x23c)](_0x726a36[_0x1c4318]);else{if(_0x175169(0x1c5)!==_0x175169(0x155)){const _0x477cbe=this[_0x175169(0x2c0)](),_0x29f483=this[_0x175169(0x33f)]();_0x5db7e0[_0x175169(0x253)]=new Bitmap(_0x477cbe,_0x29f483);const _0x259f59=ColorManager[_0x175169(0x210)](_0x726a36[_0x175169(0x241)['format'](_0x1a45c7)]),_0x13175b=ColorManager['getColor'](_0x726a36[_0x175169(0x229)[_0x175169(0x21a)](_0x1a45c7)]);_0x5db7e0[_0x175169(0x253)][_0x175169(0x29b)](0x0,0x0,_0x477cbe,_0x29f483,_0x259f59,_0x13175b,!![]);}else return _0x5f5da2[_0x175169(0x29c)][_0x175169(0x2d1)][_0x175169(0x320)](this);}this[_0x175169(0x1d1)]=_0x5db7e0,this[_0x175169(0x1de)](this[_0x175169(0x1d1)]),this['width']=this['_backgroundSprite'][_0x175169(0x283)],this[_0x175169(0x24f)]=this[_0x175169(0x1d1)][_0x175169(0x24f)];},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x2c4)]=function(){const _0x4b0587=_0x56d93f,_0x100f12=new Sprite();_0x100f12[_0x4b0587(0x1d4)]['x']=this[_0x4b0587(0x1d4)]['x'],_0x100f12[_0x4b0587(0x1d4)]['y']=this[_0x4b0587(0x1d4)]['y'],this[_0x4b0587(0x2f8)]=_0x100f12,this[_0x4b0587(0x1de)](this[_0x4b0587(0x2f8)]),this['processUpdateGraphic']();},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x1f4)]=function(){const _0x52d51e=_0x56d93f;if(!Window_OTB_TurnOrder[_0x52d51e(0x211)][_0x52d51e(0x1c4)])return;const _0xb9f7b1=Window_OTB_TurnOrder[_0x52d51e(0x211)],_0x377e6b=this[_0x52d51e(0x179)](),_0x265a73=_0x52d51e(0x17d)[_0x52d51e(0x21a)](_0x377e6b),_0x50f531=new Sprite();_0x50f531[_0x52d51e(0x1d4)]['x']=this[_0x52d51e(0x1d4)]['x'],_0x50f531[_0x52d51e(0x1d4)]['y']=this[_0x52d51e(0x1d4)]['y'];if(_0xb9f7b1[_0x265a73])_0x50f531[_0x52d51e(0x253)]=ImageManager[_0x52d51e(0x23c)](_0xb9f7b1[_0x265a73]);else{let _0x104df3=this[_0x52d51e(0x2c0)](),_0x548479=this[_0x52d51e(0x33f)](),_0x46d30f=this['getBorderThickness']();_0x50f531[_0x52d51e(0x253)]=new Bitmap(_0x104df3,_0x548479);const _0x2d5c85=_0x52d51e(0x2fa),_0x4c3227=ColorManager[_0x52d51e(0x210)](_0xb9f7b1['%1BorderColor'['format'](_0x377e6b)]);_0x50f531[_0x52d51e(0x253)][_0x52d51e(0x23d)](0x0,0x0,_0x104df3,_0x548479,_0x2d5c85),_0x104df3-=0x2,_0x548479-=0x2,_0x50f531[_0x52d51e(0x253)]['fillRect'](0x1,0x1,_0x104df3,_0x548479,_0x4c3227),_0x104df3-=_0x46d30f*0x2,_0x548479-=_0x46d30f*0x2,_0x50f531['bitmap'][_0x52d51e(0x23d)](0x1+_0x46d30f,0x1+_0x46d30f,_0x104df3,_0x548479,_0x2d5c85),_0x104df3-=0x2,_0x548479-=0x2,_0x46d30f+=0x1,_0x50f531['bitmap']['clearRect'](0x1+_0x46d30f,0x1+_0x46d30f,_0x104df3,_0x548479);}this[_0x52d51e(0x1d1)]=_0x50f531,this[_0x52d51e(0x1de)](this[_0x52d51e(0x1d1)]);},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)]['getBorderThickness']=function(){const _0x44fea4=_0x56d93f,_0x2d4b29=Window_OTB_TurnOrder[_0x44fea4(0x211)];return _0x2d4b29['BorderThickness'];},Sprite_OTB_TurnOrder_Battler['prototype']['createLetterSprite']=function(){const _0x436114=_0x56d93f,_0x15eba2=Window_OTB_TurnOrder[_0x436114(0x211)];if(!_0x15eba2['EnemyBattlerDrawLetter'])return;if(this[_0x436114(0x33d)]===$gameParty)return;const _0x276b17=this['bitmapWidth'](),_0x53e67f=this[_0x436114(0x33f)](),_0x427487=new Sprite();_0x427487[_0x436114(0x1d4)]['x']=this[_0x436114(0x1d4)]['x'],_0x427487[_0x436114(0x1d4)]['y']=this[_0x436114(0x1d4)]['y'],_0x427487['bitmap']=new Bitmap(_0x276b17,_0x53e67f),this[_0x436114(0x279)]=_0x427487,this['addChild'](this[_0x436114(0x279)]);},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x124)]=function(){const _0x5471fd=_0x56d93f;return this[_0x5471fd(0x33d)]?this[_0x5471fd(0x33d)][_0x5471fd(0x1e3)]()[this[_0x5471fd(0x2f2)]]:null;},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x1d2)]=function(){const _0x206ad7=_0x56d93f;Sprite_Clickable[_0x206ad7(0x299)]['update'][_0x206ad7(0x320)](this),this['updatePosition'](),this['checkOpacity'](),this[_0x206ad7(0x34a)](),this[_0x206ad7(0x139)](),this['updateGraphicHue'](),this['updateLetter'](),this['updateSelectionEffect']();},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x37b)]=function(_0x4029ad,_0x2afc80){const _0x597011=_0x56d93f,_0x177796=Window_OTB_TurnOrder[_0x597011(0x211)];this[_0x597011(0x2ae)]=_0x177796[_0x597011(0x321)],this['_positionTargetX']=_0x4029ad,this[_0x597011(0x145)]=_0x2afc80;},Sprite_OTB_TurnOrder_Battler['prototype'][_0x56d93f(0x162)]=function(){const _0x49a86f=_0x56d93f;if(this[_0x49a86f(0x2ae)]>0x0){if(_0x49a86f(0x18a)===_0x49a86f(0x18a)){const _0x4ee8af=this[_0x49a86f(0x2ae)];this['x']=(this['x']*(_0x4ee8af-0x1)+this[_0x49a86f(0x22c)])/_0x4ee8af,this['y']=(this['y']*(_0x4ee8af-0x1)+this[_0x49a86f(0x145)])/_0x4ee8af,this[_0x49a86f(0x2ae)]--;}else _0x366346[_0x49a86f(0x2a6)](_0x5594d7);}if(this['_positionDuration']<=0x0){this['x']=this['_positionTargetX'],this['y']=this['_positionTargetY'];if(this[_0x49a86f(0x1a2)]<0xff&&!this[_0x49a86f(0x171)]&&this[_0x49a86f(0x28a)]<=0x0){const _0x185285=this[_0x49a86f(0x124)]();_0x185285&&(_0x49a86f(0x133)===_0x49a86f(0x133)?this[_0x49a86f(0x1f5)]=_0x185285[_0x49a86f(0x1bc)]()&&_0x185285[_0x49a86f(0x311)]()?0xff:0x0:_0x50f456[_0x49a86f(0x369)](this[_0x49a86f(0xf4)][_0x49a86f(0x136)](),_0x185bca*0x1/0x8,_0x53cc2a/0x2,_0x441827,_0x16c03e/0x2,_0x49a86f(0x34c)));}}},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x234)]=function(){return 0x1;},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x258)]=function(){const _0x1c5eb8=_0x56d93f;return SceneManager[_0x1c5eb8(0x242)][_0x1c5eb8(0x1af)];},Sprite_OTB_TurnOrder_Battler['prototype'][_0x56d93f(0x2ba)]=function(){const _0x256631=_0x56d93f,_0x54e9e2=this[_0x256631(0x124)]();if(!_0x54e9e2)return this['defaultPosition']();if(_0x54e9e2===BattleManager[_0x256631(0x323)])return 0x0;if(BattleManager[_0x256631(0x106)][_0x256631(0x1ec)](_0x54e9e2)){if('YRHYY'!=='lqEbP'){const _0xfc4587=BattleManager[_0x256631(0x106)][_0x256631(0x142)](_0x54e9e2)+0x1;return _0xfc4587;}else{if(!this[_0x256631(0x2df)]())return;this['removeActionBattlersOTB']();this[_0x256631(0x323)]&&(this[_0x256631(0x12b)](this['_subject']),this['_subject']=null);this[_0x256631(0x27e)]['length']>0x0&&(this[_0x256631(0x323)]=this[_0x256631(0x1a8)]());;}}return this[_0x256631(0x234)]();},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x317)]=function(_0x2aa5ab){const _0x8e1269=_0x56d93f,_0x1fe898=Window_OTB_TurnOrder[_0x8e1269(0x211)];this['_fadeDuration']=_0x1fe898[_0x8e1269(0x321)],this['_fadeTarget']=_0x2aa5ab;},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x12f)]=function(){const _0x39e363=_0x56d93f,_0x54eb20=this[_0x39e363(0x124)]();if(!_0x54eb20)return;if(this[_0x39e363(0x2c1)]===_0x54eb20['isAlive']()&&this[_0x39e363(0x275)]===_0x54eb20['isAppeared']())return;this[_0x39e363(0x2c1)]=_0x54eb20[_0x39e363(0x1bc)](),this[_0x39e363(0x275)]=_0x54eb20['isAppeared']();let _0x50547f=this[_0x39e363(0x2c1)]&&this[_0x39e363(0x275)]?0xff:0x0;this[_0x39e363(0x317)](_0x50547f);},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x34a)]=function(){const _0xeb324e=_0x56d93f;if(this[_0xeb324e(0x28a)]>0x0){if('DXVgL'!==_0xeb324e(0x2fd)){const _0x38bd7f=this[_0xeb324e(0x28a)];this[_0xeb324e(0x1a2)]=(this[_0xeb324e(0x1a2)]*(_0x38bd7f-0x1)+this[_0xeb324e(0x1f5)])/_0x38bd7f,this[_0xeb324e(0x28a)]--;if(this[_0xeb324e(0x28a)]<=0x0){if(_0xeb324e(0x216)===_0xeb324e(0x216))this[_0xeb324e(0x1a2)]=this[_0xeb324e(0x1f5)];else{const _0x124369=new _0x33dcf5(_0x7e6c19,_0x24080d,_0x5c47be,_0x4d18b7);this['_previewContainer'][_0xeb324e(0x1de)](_0x124369),_0x4f3b51[_0xeb324e(0x125)](_0x124369),_0x124369['calculateTargetPositions'](),_0x124369[_0xeb324e(0x317)](0xff);}}}else{if(this['isOTB']())return _0xeb324e(0x222);return _0x4644f5[_0xeb324e(0x29c)][_0xeb324e(0x36c)][_0xeb324e(0x320)](this);}}if(this[_0xeb324e(0x171)])return;BattleManager[_0xeb324e(0x2e8)]===_0xeb324e(0x2e6)&&(this[_0xeb324e(0x171)]=!![],this['startFade'](0x0));},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x139)]=function(){const _0x56b3f1=_0x56d93f,_0x4f8f91=this[_0x56b3f1(0x124)]();if(!_0x4f8f91)return;const _0x19c4a3=Window_OTB_TurnOrder['Settings'],_0x2d78cf=this[_0x56b3f1(0x33d)]===$gameParty?_0x56b3f1(0x17b):'Enemy';let _0x17a0b6=_0x4f8f91[_0x56b3f1(0x1f7)]();if(_0x4f8f91[_0x56b3f1(0x2c5)]()&&_0x17a0b6==='enemy')_0x17a0b6=_0x56b3f1(0x345);else{if(_0x4f8f91[_0x56b3f1(0x30e)]()&&_0x17a0b6===_0x56b3f1(0x1ae)){if(_0x56b3f1(0xf9)===_0x56b3f1(0x29d)){if(_0x2236b1['OTB_CONVERT_AGI_BUFF_CURRENT_TURN'])_0xf7dcad-=0x1;}else _0x17a0b6='enemy';}}if(this[_0x56b3f1(0x1cf)]!==_0x17a0b6){if('kbBmq'===_0x56b3f1(0x33b)){if(!_0x19e957)return;const _0x4e2e13=_0xb1fe92[_0x56b3f1(0x371)]();_0x198dc2['makeActions']();if(!this[_0x56b3f1(0x106)][_0x56b3f1(0x1ec)](_0x36ce98)){const _0xcb94ef=_0x3001a0['max'](0x0,_0x4e2e13-(_0x587cc9[_0x56b3f1(0x2dc)]||0x0));this[_0x56b3f1(0x1f6)](_0x3f91dc,_0xcb94ef,this['_actionBattlers']);}if(!this[_0x56b3f1(0x11c)][_0x56b3f1(0x1ec)](_0x4331aa)){const _0x48cbe4=_0x4e2e13;this[_0x56b3f1(0x1f6)](_0x542e76,_0x48cbe4,this[_0x56b3f1(0x11c)]);}}else return this['processUpdateGraphic']();}switch(this[_0x56b3f1(0x1cf)]){case'face':if(this['_graphicFaceName']!==_0x4f8f91['TurnOrderOTBGraphicFaceName']())return this[_0x56b3f1(0x325)]();if(this[_0x56b3f1(0x383)]!==_0x4f8f91[_0x56b3f1(0x14a)]())return this['processUpdateGraphic']();break;case _0x56b3f1(0x1e1):if(this[_0x56b3f1(0x336)]!==_0x4f8f91['TurnOrderOTBGraphicIconIndex']())return this[_0x56b3f1(0x325)]();break;case'enemy':if(_0x4f8f91[_0x56b3f1(0x11b)]()){if(_0x56b3f1(0x2f9)!==_0x56b3f1(0x33a)){if(this[_0x56b3f1(0x374)]!==_0x4f8f91[_0x56b3f1(0x10e)]()){if(_0x56b3f1(0x1d3)===_0x56b3f1(0x187))_0xe1b4f6[_0x56b3f1(0x1a2)]=0xff,_0x4d708a['x']=_0x214273['_positionTargetX'],_0x400510[_0x56b3f1(0x2ae)]=0x0;else return this[_0x56b3f1(0x325)]();}}else return 0x0;}else{if(this[_0x56b3f1(0x290)]!==_0x4f8f91[_0x56b3f1(0x27b)]()){if(_0x56b3f1(0x353)===_0x56b3f1(0x353))return this[_0x56b3f1(0x325)]();else{if(this['_fadeDuration']>0x0){const _0x35527a=this[_0x56b3f1(0x28a)];this[_0x56b3f1(0x1a2)]=(this[_0x56b3f1(0x1a2)]*(_0x35527a-0x1)+this['_fadeTarget'])/_0x35527a,this[_0x56b3f1(0x28a)]--,this[_0x56b3f1(0x28a)]<=0x0&&(this[_0x56b3f1(0x1a2)]=this[_0x56b3f1(0x1f5)]);}if(this[_0x56b3f1(0x171)])return;_0x3f1d31[_0x56b3f1(0x2e8)]===_0x56b3f1(0x2e6)&&(this[_0x56b3f1(0x171)]=!![],this[_0x56b3f1(0x317)](0x0));}}}break;case'svactor':if(_0x4f8f91['isActor']()){if('rnqAG'!==_0x56b3f1(0x318)){if(this[_0x56b3f1(0x374)]!==_0x4f8f91[_0x56b3f1(0x27b)]())return this[_0x56b3f1(0x325)]();}else this[_0x56b3f1(0x323)]=this[_0x56b3f1(0x1a8)]();}else{if(this['_graphicEnemy']!==_0x4f8f91[_0x56b3f1(0x27b)]())return this[_0x56b3f1(0x325)]();}break;}},Sprite_OTB_TurnOrder_Battler['prototype'][_0x56d93f(0x325)]=function(){const _0x36220c=_0x56d93f,_0x21bf8b=this[_0x36220c(0x124)]();if(!_0x21bf8b)return;this[_0x36220c(0x1cf)]=_0x21bf8b[_0x36220c(0x1f7)]();if(_0x21bf8b['isActor']()&&this['_graphicType']==='enemy'){if('qvaSN'===_0x36220c(0x183))this[_0x36220c(0x1cf)]='face';else{if(!_0xd6b6a2)return;_0x21c6ae[_0x36220c(0x220)]&&_0x33f415[_0x36220c(0x220)]['remove'](_0x4beea2);const _0xe35183=_0x1ced4a[_0x36220c(0x211)],_0x345b0d=0x3e8/0x3c*_0xe35183[_0x36220c(0x321)]+0x1f4;_0x41f8c7[_0x36220c(0x317)](0x0),_0x797047(this[_0x36220c(0x200)][_0x36220c(0x13f)](this,_0x323def),_0x345b0d);}}else _0x21bf8b[_0x36220c(0x30e)]()&&this['_graphicType']===_0x36220c(0x1ae)&&(_0x36220c(0x34d)!==_0x36220c(0x34d)?_0x24b84a[_0x36220c(0x1ec)](this[_0x36220c(0x236)]())&&(_0x59af2b+=_0x201608(_0xd941ec['$1'])):this[_0x36220c(0x1cf)]='enemy');let _0x40f72a;switch(this['_graphicType']){case _0x36220c(0x345):this[_0x36220c(0x1c3)]=_0x21bf8b[_0x36220c(0xf1)](),this[_0x36220c(0x383)]=_0x21bf8b[_0x36220c(0x14a)](),_0x40f72a=ImageManager[_0x36220c(0x148)](this[_0x36220c(0x1c3)]),_0x40f72a[_0x36220c(0x28f)](this[_0x36220c(0x149)][_0x36220c(0x13f)](this,_0x40f72a));break;case _0x36220c(0x1e1):this[_0x36220c(0x336)]=_0x21bf8b[_0x36220c(0x203)](),_0x40f72a=ImageManager[_0x36220c(0x23c)](_0x36220c(0x27c)),_0x40f72a[_0x36220c(0x28f)](this['changeIconGraphicBitmap'][_0x36220c(0x13f)](this,_0x40f72a));break;case _0x36220c(0x331):if(_0x21bf8b['hasSvBattler']())this[_0x36220c(0x374)]=_0x21bf8b[_0x36220c(0x10e)](),_0x40f72a=ImageManager[_0x36220c(0x298)](this[_0x36220c(0x374)]),_0x40f72a[_0x36220c(0x28f)](this['changeSvActorGraphicBitmap'][_0x36220c(0x13f)](this,_0x40f72a));else $gameSystem[_0x36220c(0xfb)]()?(this[_0x36220c(0x290)]=_0x21bf8b[_0x36220c(0x27b)](),_0x40f72a=ImageManager['loadSvEnemy'](this[_0x36220c(0x290)]),_0x40f72a['addLoadListener'](this[_0x36220c(0x205)]['bind'](this,_0x40f72a))):(this['_graphicEnemy']=_0x21bf8b[_0x36220c(0x27b)](),_0x40f72a=ImageManager[_0x36220c(0x362)](this[_0x36220c(0x290)]),_0x40f72a[_0x36220c(0x28f)](this['changeEnemyGraphicBitmap'][_0x36220c(0x13f)](this,_0x40f72a)));break;case'svactor':this[_0x36220c(0x374)]=_0x21bf8b[_0x36220c(0x27b)](),_0x40f72a=ImageManager[_0x36220c(0x298)](this[_0x36220c(0x374)]),_0x40f72a[_0x36220c(0x28f)](this[_0x36220c(0x1e9)]['bind'](this,_0x40f72a));break;}},Sprite_OTB_TurnOrder_Battler['prototype']['changeFaceGraphicBitmap']=function(_0x4a7a1c){const _0x4b57f2=_0x56d93f,_0x460c69=this[_0x4b57f2(0x383)],_0x43ad97=this['bitmapWidth'](),_0x3bff67=this['bitmapHeight'](),_0x114e93=Math[_0x4b57f2(0x1b9)](_0x43ad97,_0x3bff67);this[_0x4b57f2(0x2f8)][_0x4b57f2(0x253)]=new Bitmap(_0x43ad97,_0x3bff67);const _0x4618ed=this[_0x4b57f2(0x2f8)][_0x4b57f2(0x253)],_0x377a88=ImageManager[_0x4b57f2(0x22d)],_0x301b1d=ImageManager[_0x4b57f2(0x364)],_0x4675af=_0x114e93/Math['max'](_0x377a88,_0x301b1d),_0x5d945e=ImageManager['faceWidth'],_0x1bca7e=ImageManager['faceHeight'],_0x4c5a1e=_0x460c69%0x4*_0x377a88+(_0x377a88-_0x5d945e)/0x2,_0x519f8d=Math[_0x4b57f2(0x1be)](_0x460c69/0x4)*_0x301b1d+(_0x301b1d-_0x1bca7e)/0x2,_0x469e2d=(_0x43ad97-_0x377a88*_0x4675af)/0x2,_0x25bf01=(_0x3bff67-_0x301b1d*_0x4675af)/0x2;_0x4618ed[_0x4b57f2(0x244)](_0x4a7a1c,_0x4c5a1e,_0x519f8d,_0x5d945e,_0x1bca7e,_0x469e2d,_0x25bf01,_0x114e93,_0x114e93);},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x214)]=function(_0x9ed728){const _0x143f9d=_0x56d93f,_0x1746a0=this[_0x143f9d(0x336)],_0x3546e4=this[_0x143f9d(0x2c0)](),_0x37d120=this[_0x143f9d(0x33f)]();this[_0x143f9d(0x2f8)][_0x143f9d(0x253)]=new Bitmap(_0x3546e4,_0x37d120);const _0x1dff86=this[_0x143f9d(0x2f8)]['bitmap'],_0x131075=ImageManager[_0x143f9d(0x360)],_0x4cc0c6=ImageManager[_0x143f9d(0x1ad)],_0x2bba7d=Math[_0x143f9d(0x2c9)](_0x131075,_0x4cc0c6,_0x3546e4,_0x37d120),_0x57288e=_0x1746a0%0x10*_0x131075,_0x414785=Math[_0x143f9d(0x1be)](_0x1746a0/0x10)*_0x4cc0c6,_0x227366=Math[_0x143f9d(0x1be)](Math['max'](_0x3546e4-_0x2bba7d,0x0)/0x2),_0x489f3d=Math['floor'](Math[_0x143f9d(0x1b9)](_0x37d120-_0x2bba7d,0x0)/0x2);_0x1dff86[_0x143f9d(0x244)](_0x9ed728,_0x57288e,_0x414785,_0x131075,_0x4cc0c6,_0x227366,_0x489f3d,_0x2bba7d,_0x2bba7d);},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x1e9)]=function(_0x122e48){const _0xdc41e4=_0x56d93f,_0x4436f6=this[_0xdc41e4(0x2c0)](),_0x47275d=this[_0xdc41e4(0x33f)](),_0x5b2524=Math[_0xdc41e4(0x2c9)](_0x4436f6,_0x47275d);this[_0xdc41e4(0x2f8)]['bitmap']=new Bitmap(_0x4436f6,_0x47275d);const _0x2a3621=this[_0xdc41e4(0x2f8)]['bitmap'],_0x56fe14=this['_graphicSv'][_0xdc41e4(0x2d2)](/\$/i),_0x1793d9=_0x56fe14?0x1:ImageManager[_0xdc41e4(0x1c2)],_0xdc3b4e=_0x56fe14?0x1:ImageManager[_0xdc41e4(0x11e)],_0x2014b1=_0x122e48[_0xdc41e4(0x283)]/_0x1793d9,_0x374e2e=_0x122e48[_0xdc41e4(0x24f)]/_0xdc3b4e,_0x43bd13=Math['min'](0x1,_0x5b2524/_0x2014b1,_0x5b2524/_0x374e2e),_0x34e574=_0x2014b1*_0x43bd13,_0x1710ff=_0x374e2e*_0x43bd13,_0x548de2=Math[_0xdc41e4(0xee)]((_0x4436f6-_0x34e574)/0x2),_0xd6229c=Math[_0xdc41e4(0xee)]((_0x47275d-_0x1710ff)/0x2);_0x2a3621[_0xdc41e4(0x244)](_0x122e48,0x0,0x0,_0x2014b1,_0x374e2e,_0x548de2,_0xd6229c,_0x34e574,_0x1710ff);},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x205)]=function(_0x57707b){const _0x3871a0=_0x56d93f,_0x5b52f1=Window_OTB_TurnOrder['Settings'],_0x5a9aa6=this[_0x3871a0(0x2c0)](),_0x14451c=this['bitmapHeight'](),_0x420b35=Math['min'](_0x5a9aa6,_0x14451c);this['_graphicSprite']['bitmap']=new Bitmap(_0x5a9aa6,_0x14451c);const _0x2a35b8=this['_graphicSprite']['bitmap'],_0x239620=Math[_0x3871a0(0x2c9)](0x1,_0x420b35/_0x57707b[_0x3871a0(0x283)],_0x420b35/_0x57707b[_0x3871a0(0x24f)]),_0x1b3c91=_0x57707b['width']*_0x239620,_0x4e0bb1=_0x57707b[_0x3871a0(0x24f)]*_0x239620,_0x5b1ee5=Math['round']((_0x5a9aa6-_0x1b3c91)/0x2),_0x228ccc=Math['round']((_0x14451c-_0x4e0bb1)/0x2);_0x2a35b8[_0x3871a0(0x244)](_0x57707b,0x0,0x0,_0x57707b[_0x3871a0(0x283)],_0x57707b[_0x3871a0(0x24f)],_0x5b1ee5,_0x228ccc,_0x1b3c91,_0x4e0bb1);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x56d93f(0x2ca)]=function(){const _0x50277c=_0x56d93f,_0x1b3c5f=this[_0x50277c(0x124)]();if(!_0x1b3c5f)return;if(!_0x1b3c5f[_0x50277c(0x30e)]())return;if(this['_graphicHue']===_0x1b3c5f[_0x50277c(0x12c)]())return;this['_graphicHue']=_0x1b3c5f[_0x50277c(0x12c)](),this[_0x50277c(0x2f8)][_0x50277c(0x348)](_0x1b3c5f[_0x50277c(0x11b)]()?0x0:this[_0x50277c(0x335)]);},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x264)]=function(){const _0x3aa2e6=_0x56d93f;if(!this[_0x3aa2e6(0x279)])return;const _0x21b6ed=this['battler']();if(!_0x21b6ed)return;if(this[_0x3aa2e6(0xf4)]===_0x21b6ed['_letter']&&this['_plural']===_0x21b6ed[_0x3aa2e6(0x2f6)])return;this[_0x3aa2e6(0xf4)]=_0x21b6ed[_0x3aa2e6(0xf4)],this['_plural']=_0x21b6ed['_plural'];const _0x244c49=Window_OTB_TurnOrder[_0x3aa2e6(0x211)],_0x264c2=this['bitmapWidth'](),_0x2e65a6=this[_0x3aa2e6(0x33f)](),_0x1e48ca=this['_letterSprite'][_0x3aa2e6(0x253)];_0x1e48ca[_0x3aa2e6(0x118)]();if(!this[_0x3aa2e6(0x2f6)])return;_0x1e48ca['fontFace']=_0x244c49[_0x3aa2e6(0x1cd)]||$gameSystem['mainFontFace'](),_0x1e48ca['fontSize']=_0x244c49[_0x3aa2e6(0x2c3)]||0x10,_0x244c49[_0x3aa2e6(0x301)]?_0x1e48ca['drawText'](this['_letter'][_0x3aa2e6(0x136)](),_0x264c2*0x1/0x8,_0x2e65a6/0x2,_0x264c2,_0x2e65a6/0x2,'left'):_0x1e48ca[_0x3aa2e6(0x369)](this[_0x3aa2e6(0xf4)]['trim'](),0x0,_0x2e65a6/0x2,_0x264c2*0x7/0x8,_0x2e65a6/0x2,_0x3aa2e6(0x13c));},Sprite_OTB_TurnOrder_Battler['prototype']['updateSelectionEffect']=function(){const _0x517344=_0x56d93f,_0x5bfdcd=this[_0x517344(0x124)]();if(!_0x5bfdcd)return;const _0x5412d6=_0x5bfdcd['battler']();if(!_0x5412d6)return;const _0x1e5e48=_0x5412d6[_0x517344(0x347)]();if(!_0x1e5e48)return;this[_0x517344(0x160)](_0x1e5e48[_0x517344(0x137)]);},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x191)]=function(){return null;},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x2ad)]=function(_0x1bb654){const _0xd7f63b=_0x56d93f;this[_0xd7f63b(0x220)]=_0x1bb654,this[_0xd7f63b(0x1ce)]();if(this['_sourceArray']===null){if('trGZc'!==_0xd7f63b(0x14c))this[_0xd7f63b(0x329)]=-0x1;else{const _0x15aa57=_0x4b7235[_0xd7f63b(0x1b9)](0x0,_0x58534a-(_0x6f7be7[_0xd7f63b(0x2dc)]||0x0));this['otbAddBattlerToTurnOrderAtEnd'](_0xc16343,_0x15aa57,this[_0xd7f63b(0x106)]);}}},Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)][_0x56d93f(0x1ce)]=function(){const _0x13357c=_0x56d93f,_0x582bdb=this[_0x13357c(0x258)]();if(!_0x582bdb)return;const _0x2e0e94=Window_OTB_TurnOrder[_0x13357c(0x211)],_0x378fe6=_0x2e0e94['OrderDirection'],_0x1a7bb4=this['_sourceArray']===_0x582bdb[_0x13357c(0xf6)]?!![]:![],_0x5efb23=this[_0x13357c(0x329)]===-0x1&&BattleManager[_0x13357c(0x323)]===this[_0x13357c(0x124)](),_0x594bbb=_0x582bdb['_spriteGroupWidth']-_0x2e0e94[_0x13357c(0x28b)];let _0x51ab19=Math[_0x13357c(0xe9)](_0x594bbb/(this[_0x13357c(0x220)][_0x13357c(0x1ac)]-0x1||0x1));_0x51ab19=Math[_0x13357c(0x2c9)](_0x2e0e94['SpriteThin'],_0x51ab19);let _0x51f175=0x0,_0x1ea2f7=0x0,_0x357d7f=_0x5efb23?-0x1:this[_0x13357c(0x220)][_0x13357c(0x142)](this);!_0x5efb23&&(_0x13357c(0x2d7)!==_0x13357c(0x2c7)?_0x357d7f=this[_0x13357c(0x1e2)]():_0x399c95=_0x13357c(0x345));if(_0x5efb23)'OoORz'!==_0x13357c(0x25b)?_0x1cc53e[_0x13357c(0x29c)]['BattleManager_processTurn']['call'](this):_0x51f175=_0x582bdb[_0x13357c(0x24d)];else _0x378fe6?'mGRVx'===_0x13357c(0x256)?(_0x51f175=(_0x1a7bb4?_0x582bdb[_0x13357c(0x207)]:_0x582bdb[_0x13357c(0x1aa)])+_0x594bbb,_0x51f175-=_0x357d7f*_0x51ab19):_0x2ba0ad+=_0x1eeaa1(_0x47e05c['$1']):_0x13357c(0x297)==='cTHqT'?this[_0x13357c(0x2df)]()?this[_0x13357c(0x12a)]():_0x4aa4c2[_0x13357c(0x29c)][_0x13357c(0x365)][_0x13357c(0x320)](this):(_0x51f175=_0x1a7bb4?_0x582bdb['_nextX']:_0x582bdb[_0x13357c(0x1aa)],_0x51f175+=_0x357d7f*_0x51ab19);_0x51f175+=this[_0x13357c(0x17a)](_0x357d7f,_0x2e0e94['SpriteThin']-_0x51ab19),!_0x5efb23&&_0x357d7f<0x0&&(_0x51f175=this['x'],_0x1ea2f7=this['y'],this[_0x13357c(0x317)](0x0)),this[_0x13357c(0x37b)](_0x51f175,_0x1ea2f7);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x56d93f(0x17a)]=function(_0x533c66,_0x1e8501){return 0x0;},Sprite_OTB_TurnOrder_Battler['prototype'][_0x56d93f(0x1e2)]=function(){const _0xfbf614=_0x56d93f,_0x15de2e=this[_0xfbf614(0x258)]();if(!_0x15de2e)return 0x0;const _0x4fdc46=this['_sourceArray']===_0x15de2e[_0xfbf614(0xf6)]?!![]:![],_0x157217=_0x4fdc46?BattleManager[_0xfbf614(0x11c)]:BattleManager['_actionBattlers'],_0x2070ea=this[_0xfbf614(0x124)](),_0x5cd8bc=VisuMZ[_0xfbf614(0x29c)][_0xfbf614(0x35a)](_0x2070ea,_0x157217);return _0x5cd8bc[this[_0xfbf614(0x329)]]??_0x5cd8bc[_0x5cd8bc[_0xfbf614(0x1ac)]-0x1]??-0x1;};function Sprite_OTB_TurnOrder_Preview(){const _0x55a6f8=_0x56d93f;this[_0x55a6f8(0x17e)](...arguments);}Sprite_OTB_TurnOrder_Preview['prototype']=Object[_0x56d93f(0x32f)](Sprite_OTB_TurnOrder_Battler[_0x56d93f(0x299)]),Sprite_OTB_TurnOrder_Preview[_0x56d93f(0x299)][_0x56d93f(0x361)]=Sprite_OTB_TurnOrder_Preview,Sprite_OTB_TurnOrder_Preview[_0x56d93f(0x299)][_0x56d93f(0x17e)]=function(_0x19cb38,_0x23668e,_0x580832,_0x29fd9f){const _0x58fce6=_0x56d93f;this[_0x58fce6(0x140)]=_0x29fd9f,Sprite_OTB_TurnOrder_Battler[_0x58fce6(0x299)][_0x58fce6(0x17e)]['call'](this,_0x19cb38,_0x23668e,_0x580832),this[_0x58fce6(0x172)]();},Sprite_OTB_TurnOrder_Preview['prototype'][_0x56d93f(0x172)]=function(){const _0x38ee2e=_0x56d93f,_0x268db9=Window_OTB_TurnOrder[_0x38ee2e(0x211)];this[_0x38ee2e(0x30c)]['x']=this['scale']['y']=_0x268db9['PreviewScale'];},Sprite_OTB_TurnOrder_Preview[_0x56d93f(0x299)]['getUnitSideSide']=function(){const _0x52ea6c=_0x56d93f;return this[_0x52ea6c(0x33d)]===$gameParty?'PreviewActor':_0x52ea6c(0x2bf);},Sprite_OTB_TurnOrder_Preview[_0x56d93f(0x299)][_0x56d93f(0x276)]=function(){const _0xbf51df=_0x56d93f,_0x2b116c=Window_OTB_TurnOrder['Settings'];return Math[_0xbf51df(0xe9)](_0x2b116c[_0xbf51df(0x195)]/(_0x2b116c['PreviewScale']||0.01));},Sprite_OTB_TurnOrder_Preview[_0x56d93f(0x299)][_0x56d93f(0x37b)]=function(_0x28c1b1,_0x1bf553){const _0x5def24=_0x56d93f;Sprite_OTB_TurnOrder_Battler[_0x5def24(0x299)][_0x5def24(0x37b)]['call'](this,_0x28c1b1,_0x1bf553),this['x']=this['_positionTargetX'],this['y']=this['_positionTargetY'];},Sprite_OTB_TurnOrder_Preview[_0x56d93f(0x299)][_0x56d93f(0x317)]=function(_0x198ad4){const _0x9f7e7d=_0x56d93f;Sprite_OTB_TurnOrder_Battler[_0x9f7e7d(0x299)][_0x9f7e7d(0x317)]['call'](this,_0x198ad4),_0x198ad4>0x0?_0x9f7e7d(0x128)!==_0x9f7e7d(0x128)?_0x5d7b3f[_0x9f7e7d(0x27a)](this):this['_fadeDuration']=0x1:(this['_fadeDuration']/=0x2,this[_0x9f7e7d(0x28a)]=Math['floor'](this['_fadeDuration']));},Sprite_OTB_TurnOrder_Preview[_0x56d93f(0x299)][_0x56d93f(0x17a)]=function(_0x3e19ca,_0x33e6ba){const _0x50e4d2=_0x56d93f,_0x3afefe=Window_OTB_TurnOrder['Settings'];if(_0x3e19ca>0x0){if('RYMLA'==='nCWoR'){if(!_0x28e135['isOTB']())return;this[_0x50e4d2(0x2dc)]=this['_otbTimesActedThisTurn']||0x0,this[_0x50e4d2(0x2dc)]++;if(this[_0x50e4d2(0x21d)]()>0x0&&this===_0x20b425[_0x50e4d2(0x323)]){const _0xfb1d9d=_0x18ec86[_0x50e4d2(0x27e)];if(_0xfb1d9d[_0x50e4d2(0x1ac)]>0x0&&_0xfb1d9d[0x0]!==this)return;const _0x2b53e2=this['battler']();if(_0x2b53e2&&_0x4c9eea[_0x50e4d2(0x232)](this))_0x2b53e2[_0x50e4d2(0x312)]();}}else{if(this[_0x50e4d2(0x140)]>0x0){if('upFQG'!==_0x50e4d2(0x2bb)){if(_0x3afefe[_0x50e4d2(0x301)])return-_0x3afefe['SpriteThin'];else{if(_0x50e4d2(0x230)!==_0x50e4d2(0x38e))return _0x3afefe[_0x50e4d2(0x28b)];else _0x5572d3[_0x50e4d2(0x1f6)](this,_0x184a52,_0x26b10d[_0x50e4d2(0x106)]),_0x39fe19[_0x50e4d2(0x1f6)](this,_0xe5b614,_0x2a2713[_0x50e4d2(0x11c)]);}}else{if(!this[_0x50e4d2(0x2df)]())return;this['_otb_actionBattlersNext']=[],this[_0x50e4d2(0x351)]=![];}}else{if(this[_0x50e4d2(0x140)]<0x0){if(_0x3afefe['OrderDirection']){if(_0x50e4d2(0x1c9)!=='ouUma')this[_0x50e4d2(0x1d0)]();else return-_0x33e6ba;}else return _0x33e6ba;}}}}return 0x0;},Sprite_OTB_TurnOrder_Preview[_0x56d93f(0x299)][_0x56d93f(0x1e2)]=function(){const _0x8b8f63=_0x56d93f,_0x26ea17=this[_0x8b8f63(0x258)](),_0x131005=this[_0x8b8f63(0x220)]===_0x26ea17[_0x8b8f63(0xf6)]?!![]:![],_0x553d3b=_0x131005?BattleManager[_0x8b8f63(0x11c)]:BattleManager[_0x8b8f63(0x106)];let _0x2e9d4f=0x0,_0x2c5b9d=_0x553d3b[_0x8b8f63(0x1ac)]-0x1;_0x131005&&(_0x2e9d4f=Math[_0x8b8f63(0x1b9)](0x0,VisuMZ[_0x8b8f63(0x29c)][_0x8b8f63(0x339)](_0x553d3b)));let _0x2c4845=Sprite_OTB_TurnOrder_Battler[_0x8b8f63(0x299)]['calculateTargetIndex'][_0x8b8f63(0x320)](this);return _0x2c4845+=this[_0x8b8f63(0x140)],_0x2c4845[_0x8b8f63(0x294)](_0x2e9d4f,_0x2c5b9d);},Sprite_OTB_TurnOrder_Preview['prototype'][_0x56d93f(0x327)]=function(){},Window_Selectable[_0x56d93f(0x299)][_0x56d93f(0x18e)]=function(){return![];},VisuMZ[_0x56d93f(0x29c)]['Window_Selectable_select']=Window_Selectable['prototype'][_0x56d93f(0x2d6)],Window_Selectable[_0x56d93f(0x299)][_0x56d93f(0x2d6)]=function(_0x2d7afa){const _0x3e8c3b=_0x56d93f;VisuMZ['BattleSystemOTB'][_0x3e8c3b(0x19b)][_0x3e8c3b(0x320)](this,_0x2d7afa),this['isBattleItemWindowOTB']()&&this[_0x3e8c3b(0x14d)]&&this[_0x3e8c3b(0x373)]();},Window_Selectable[_0x56d93f(0x299)][_0x56d93f(0x373)]=function(){BattleManager['otbPreviewOrderChange']();},VisuMZ['BattleSystemOTB']['Window_Help_setItem']=Window_Help[_0x56d93f(0x299)]['setItem'],Window_Help[_0x56d93f(0x299)][_0x56d93f(0x30a)]=function(_0x285906){const _0x43b95a=_0x56d93f;if(BattleManager[_0x43b95a(0x2df)]()&&_0x285906&&_0x285906[_0x43b95a(0x1b1)]&&_0x285906[_0x43b95a(0x1b1)][_0x43b95a(0x2d2)](/<(?:OTB) HELP>\s*([\s\S]*)\s*<\/(?:OTB) HELP>/i))this[_0x43b95a(0x178)](String(RegExp['$1']));else{if(_0x43b95a(0x2be)!==_0x43b95a(0x2be)){if(!_0x3afc4d[_0x43b95a(0x1d7)]())return 0x0;if(!_0x4c2ce5['isOTB']())return 0x0;if(!this[_0x43b95a(0x1d8)]())return 0x0;if(!this[_0x43b95a(0x236)]())return 0x0;if(!this[_0x43b95a(0x236)]()[_0x43b95a(0x1b4)]())return 0x0;const _0xc46334=_0x5078f4['BattleSystemOTB'][_0x43b95a(0x305)],_0x12dfc6=this[_0x43b95a(0x1d8)]()[_0x43b95a(0x1b1)],_0xcab40=_0x5f1e92['_actionBattlers']||[];let _0x373edb=0x0;return _0x12dfc6['match'](_0xc46334[_0x43b95a(0x380)])&&(_0xcab40[_0x43b95a(0x1ec)](this[_0x43b95a(0x236)]())&&(_0x373edb+=_0xcb8db2(_0x59d54a['$1']))),_0x12dfc6[_0x43b95a(0x2d2)](_0xc46334['UserCurrOrder'])&&(_0x373edb+=_0xea59c6(_0x95c685['$1'])),_0x373edb;}else VisuMZ[_0x43b95a(0x29c)][_0x43b95a(0x246)][_0x43b95a(0x320)](this,_0x285906);}},Window_ActorCommand['prototype'][_0x56d93f(0x18e)]=function(){const _0x5bff59=_0x56d93f;return BattleManager[_0x5bff59(0x2df)]();},Window_ActorCommand[_0x56d93f(0x299)][_0x56d93f(0x373)]=function(){const _0x740ecd=_0x56d93f,_0x2c497d=BattleManager[_0x740ecd(0x367)]();if(_0x2c497d){const _0x35d86f=this[_0x740ecd(0x1ed)]();switch(_0x35d86f){case _0x740ecd(0x382):_0x2c497d['setAttack']();break;case _0x740ecd(0x26c):_0x2c497d[_0x740ecd(0x288)]();break;case _0x740ecd(0x10f):_0x2c497d[_0x740ecd(0x2bd)](this[_0x740ecd(0x358)]());break;default:_0x2c497d['setSkill'](null);break;}}Window_Command[_0x740ecd(0x299)][_0x740ecd(0x373)]['call'](this);},Window_BattleSkill[_0x56d93f(0x299)][_0x56d93f(0x18e)]=function(){return BattleManager['isOTB']();},Window_BattleSkill[_0x56d93f(0x299)][_0x56d93f(0x373)]=function(){const _0x24105a=_0x56d93f,_0x4c04fe=this['item'](),_0x3a3363=BattleManager['inputtingAction']();if(_0x3a3363)_0x3a3363[_0x24105a(0x2bd)](_0x4c04fe?_0x4c04fe['id']:null);Window_SkillList[_0x24105a(0x299)][_0x24105a(0x373)][_0x24105a(0x320)](this);},Window_BattleItem[_0x56d93f(0x299)][_0x56d93f(0x18e)]=function(){const _0x328922=_0x56d93f;return BattleManager[_0x328922(0x2df)]();},Window_BattleItem[_0x56d93f(0x299)][_0x56d93f(0x373)]=function(){const _0x56cc73=_0x56d93f,_0x65ca4e=this[_0x56cc73(0x1d8)](),_0x190edf=BattleManager[_0x56cc73(0x367)]();if(_0x190edf)_0x190edf[_0x56cc73(0x30a)](_0x65ca4e?_0x65ca4e['id']:null);Window_ItemList[_0x56cc73(0x299)][_0x56cc73(0x373)][_0x56cc73(0x320)](this);},Window_BattleActor['prototype'][_0x56d93f(0x18e)]=function(){return BattleManager['isOTB']();},Window_BattleEnemy[_0x56d93f(0x299)]['isBattleItemWindowOTB']=function(){const _0x4d11b9=_0x56d93f;return BattleManager[_0x4d11b9(0x2df)]();};function _0x2618(_0x266887,_0x17730a){const _0x5abccc=_0x5abc();return _0x2618=function(_0x2618fd,_0x14c57a){_0x2618fd=_0x2618fd-0xe8;let _0x1b5402=_0x5abccc[_0x2618fd];return _0x1b5402;},_0x2618(_0x266887,_0x17730a);}function _0x5abc(){const _0x1b95e7=['RepositionLogWindow','decideRandomTarget','Conversion','onSkillOk','changeSourceArray','_positionDuration','miwyq','onBattleStart','onBattleEndOTB','CDHbm','Game_Action_allowRandomSpeed','mSdxW','splice','otbAddActions','_hidden','applyItemUserEffect','BattleManager_setup','containerPosition','CWpDJ','addChildAt','setSkill','rnBgT','PreviewEnemy','bitmapWidth','_isAlive','removeActionBattlersOTB','EnemyBattlerFontSize','createGraphicSprite','isActor','cGFwY','hypot','makeSpeed','min','updateGraphicHue','ActionBattlersNextFilter','createTurnOrderOTBGraphicType','Wvixx','TargetFollOrder','UiAlignment','XoFHg','Game_Action_speed','match','JYsRg','_stateIDs','Scene_Battle_createActorCommandWindow','select','OSqdr','Game_Actor_selectNextCommand','IconIndex','isPartyCommandWindowDisabled','startInputOTB','_otbTimesActedThisTurn','STRUCT','RepositionTopForHelp','isOTB','_surprise','glkOf','ARRAYSTR','otbPreviewOrderChange','lwnLY','WLHcT','battleEnd','Game_Party_removeActor','_phase','pop','StatusWindow','pijLZ','DMWhV','AllowRandomSpeed','otbPreviewOrderClear','UiCurrentText','TurnOrder','otbCalcUserCurrentOrderChange','_index','EgTmA','filter','getChildIndex','_plural','drawDimmedArea','_graphicSprite','oBhcJ','#000000','_ogWindowLayerY','ConvertAgiBuffCurrent','RlXfS','otbGainInstant','_homeY','SSjQB','OrderDirection','iCgVq','_tempActor','effects','RegExp','ChnRM','_homeX','close','YuJjA','setItem','otbAddForceActionBattler','scale','EnemyBattlerFaceIndex','isEnemy','_speed','removeStatesAuto','isAppeared','stepForward','713199UYtMsP','_actorWindow','_otbTurnOrderFaceIndex','UtTMZ','startFade','qOizp','battleSys','otbApplyActionTimes','battleMembers','SystemTurnOrderVisibility','makeOTBSpeed','return\x200','JJIby','call','UpdateFrames','speed','_subject','OCkTK','processUpdateGraphic','aOqxj','updateSelectionEffect','EVAL','_instance','hide','_fadeSpeed','yyulJ','ActorBattlerIcon','PostStunInfinitySpeed','create','BdmAs','enemy','Game_Battler_onTurnEnd','DQAia','description','_graphicHue','_graphicIconIndex','Scene_Battle_onSkillCancel','SYdvw','getInfinityClamp','cTCZZ','tEdBy','PreviewOffsetY','_unit','otbCalcTargetCurrentOrderChange','bitmapHeight','OTB_STUN_INFINITY_CLAMP','blCrD','cancel','TargetAddActionNext','Instant','face','Mechanics','mainSprite','setHue','map','updateOpacity','irToJ','left','FlCZK','createNewTurnOrderSprites','Enemies','drawUiText','_otb_createdFirstTurnOrders','otbRemoveCurrentSubject','UKYYy','isPreviousSceneBattleTransitionable','_previewCurrent','vQrVn','RxBAO','currentExt','BattleManager_isTpb','GetAllIndicies','isHorz','otbProcessActionCheck','recoverAll','BattleManager_processTurn','ConvertAgiDebuffCurrent','iconWidth','constructor','loadEnemy','Game_Battler_addState','faceHeight','BattleManager_selectNextActor','hxXyh','inputtingAction','UiSubjectOffsetX','drawText','OYrpI','PreviewScale','BattleManager_battleSys','xumli','OTB_CONVERT_AGI_BUFF_CURRENT_TURN','requestUpdateTurnOrders','_otbTurnOrderGraphicType','makeActionTimes','children','applyBattleItemWindowOTB','_graphicSv','fontSize','appear','Game_Battler_forceAction','ssiCj','setOTBGraphicIconIndex','vvixF','moveToPosition','remove','JSON','ARRAYNUM','_homeDuration','UserFollOrder','exit','attack','_graphicFaceIndex','otbShiftTurnOrderForSubject','kloFY','Scene_Battle_actorCommandSingleSkill','ARRAYFUNC','SideviewBattleUI','initMembers','Izknh','InfinityClamp','_tempBattler','VisuMZ_2_PartySystem','ouYwf','currentAction','nwreL','OtbTurnOrderClearActorGraphic','removeSprite','YILwj','UiFontSize','createTurnOrderSprites','ceil','_handlers','onItemOk','_partyCommandWindow','addChildToBack','round','turnOrderChangeOTB','canMove','TurnOrderOTBGraphicFaceName','PreviewActor','onTurnEndOTB','_letter','onEnemyOk','_nextTurn','removeState','processTurnOTB','ZsVpE','sqzKO','isSideView','BBGqa','createOrderPreview','isBattleSystemOTBTurnOrderVisible','applyItemTargetEffectOTB','addState','bpXXk','fdcPf','Scene_Battle_onSkillOk','Game_BattlerBase_hide','SpriteLength','_actionBattlers','makeActions','JaAgf','FUNC','_spriteGroupWidth','UlOOx','FaceIndex','DEahk','svBattlerName','singleSkill','Actors','_currentActor','Game_Battler_makeSpeed','Game_System_initialize','createOTBTurnOrderWindow','previewOrderByAction','endTurn','bKiJI','clear','QOHYe','aXvcp','hasSvBattler','_otb_actionBattlersNext','isBattleMember','svActorVertCells','toUpperCase','ZXSAs','initBattleSystemOTB','OTB_CONVERT_AGI_DEBUFF_CURRENT_TURN','endAction','battler','push','repositionLogWindowOTB','FVFQL','cXaax','concat','selectNextActorOTB','endBattlerActions','battlerHue','setBattleSystemOTBTurnOrderVisible','%1-%2','checkOpacity','_previewContainer','EFFECT_ADD_BUFF','parse','qnePZ','FIGiI','Game_BattlerBase_recoverAll','trim','_blendColor','eXEYl','updateGraphic','refresh','yKItP','right','makeActionOrdersOTB','OTB_ADDED_ACTION_TIMES','bind','_offset','auto','indexOf','code','finishActorInput','_positionTargetY','_forceAction','OMIXh','loadFace','changeFaceGraphicBitmap','TurnOrderOTBGraphicFaceIndex','UiCurrentOffsetX','LRZwV','active','commandFight','refreshTurnOrder','applyGlobal','Game_Battler_performCollapse','nVPJD','OTB_CONVERT_AGI_BUFF_NEXT_TURN','addActor','UrIGi','contents','MriDB','jltXc','dataId','isTpb','SEnUs','processTurn','commandAttack','gJRMK','RjiuC','setBlendColor','Scene_Battle_onEnemyCancel','updatePosition','UiNextText','UiSubjectText','LXWPn','createChildren','_windowLayer','createSpriteContainers','onActorCancel','commandGuard','OtbTurnOrderEnemyIcon','otbUnshiftBattlerToTurnOrders','unshift','EFFECT_ADD_DEBUFF','otbAddBattlerToTurnOrderAtStart','top','_isBattleOver','adjustForPreview','createOrderPreviewSprite','windowRect','Scene_Battle_onItemOk','center','DisplayOffsetY','setText','getUnitSideSide','additionalTargetXAdjustments','Actor','ConvertSpeedJS','%1SystemBorder','initialize','Scene_Battle_commandFight','ConvertAgiBuffNext','GJFkc','_requestTurnOrderUpdate','qvaSN','OWkkE','createTurnOrderOTBGraphicFaceIndex','BattleManager_finishActorInput','eEmKQ','OTB_ADDED_RANDOMIZE_ADDED_ACTION_ORDER','Game_Battler_removeState','pnTcU','selectNextCommand','Game_Action_applyItemUserEffect','VKClC','isBattleItemWindowOTB','onActorOk','otbCreateNewTurnOrderSprites','getStateTooltipBattler','viFCy','createLetterSprite','4306415hrYRXw','BorderThickness','addBattlerToTurnOrderAtEnd','Scene_Battle_commandCancel','87256tfpAnr','xomhV','boxWidth','Window_Selectable_select','dueiO','ARRAYSTRUCT','image','dzJOb','qxuyo','applyItemAddedActionOTB','opacity','_previewNext','Game_Battler_onBattleStart','padding','_enemyWindow','_currentTurn','getNextSubject','_lastTargetIndex','_currentX','_otbTurnOrderIconIndex','length','iconHeight','svactor','_otbTurnOrderWindow','OtbTurnOrderActorIcon','note','initMembersOTB','TargetCurrOrder','canChangeOtbTurnOrder','preEndActionOTB','registerCommand','_inputting','OTB_CONVERT_AGI_DEBUFF_NEXT_TURN','max','VNIDC','_spriteContainer','isAlive','ETvwd','floor','CKsoX','addForceActionBattler','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','svActorHorzCells','_graphicFaceName','ShowMarkerBorder','gkjHu','allowRandomSpeed','clearOrderPreview','FaceName','ouUma','WQzdv','drawBgImage','performActionEndOTB','EnemyBattlerFontFace','calculateTargetPositions','_graphicType','startActorCommandSelection','_backgroundSprite','update','YmWIX','anchor','Scene_Battle_commandGuard','needsSelection','isSceneBattle','item','Bumzv','EnemyBattlerFaceName','BattleManager_isActiveTpb','makeNextActionOrdersOTB','BattleManager_makeActionOrders','addChild','nQfCN','_statusWindow','icon','calculateTargetIndex','members','isTurnBased','gradient','shiftTurnOrderForSubject','onTurnEnd','gWJXK','changeSvActorGraphicBitmap','version','createBackgroundSprite','includes','currentSymbol','Game_Action_applyGlobal','64023MMNlGh','actorCommandSingleSkill','commandCancelOTB','onEnemyCancel','actor','createBorderSprite','_fadeTarget','otbAddBattlerToTurnOrderAtEnd','TurnOrderOTBGraphicType','AeSRX','_otbTurnOrderVisible','keQBO','bhWEx','ActorBattlerType','Scene_Battle_commandAttack','updateVisibility','updateTurnOrders','processSpriteRemoval','Scene_Battle_onEnemyOk','randomInt','createTurnOrderOTBGraphicIconIndex','createInitialPositions','changeEnemyGraphicBitmap','ocyxX','_nextX','EnableActionTimes','name','MoveDistance','isActiveTpb','InitialSpeedJS','VisuMZ_3_SideviewBattleUI','onItemCancel','4424480qrncWi','getColor','Settings','_bgImageSprite','_otbTurnOrderFaceName','changeIconGraphicBitmap','AtGJS','eABFZ','UiNextOffsetY','%1SystemBg','idyyk','format','BgImageOffsetX','_actorCommandWindow','numActions','bottom','djbRy','_sourceArray','Game_Party_addActor','OTB','fgUZS','gXfSX','resumeTurnOrderSprites','index','createActorCommandWindowOTB','onBattleStartOTB','%1BgColor2','allBattleMembers','OTB_STUN_INFINITY_SPEED','_positionTargetX','faceWidth','_ogWindowLayerX','ScreenBuffer','JCQJB','dimColor2','isNextOtbSubject','Scene_Battle_createAllWindows','defaultPosition','BgDimStyle','subject','_targetHomeY','EnemyBattlerType','postEndActionOTB','forceAction','makeDeepCopy','loadSystem','fillRect','YGKBg','boxHeight','36bIAjhU','%1BgColor1','_scene','ShowMarkerBg','blt','frxkQ','Window_Help_setItem','forceActionOTB','_preemptive','sort','initHomePositions','commandCancel','isInfinitySpeedOTB','_subjectX','Scene_Battle_onActorCancel','height','shift','removeUnableTurnOrderSprites','performCollapse','bitmap','XBnFB','360750jrIZMg','mGRVx','BgImageFilename','containerWindow','Game_Battler_onBattleEnd','ConvertParams','OoORz','sortContainer','otbRemoveUnableTurnOrderSprites','addBattlerToTurnOrderAtStart','BattleManager_startInput','_targetHomeX','removeCurrentSubject','ActionBattlersFilter','_containerWidth','updateLetter','startTurn','5044445ecCDTI','createTurnOrderOTBGraphicFaceName','PvBGa','startInput','shiftNextTurnSpritesToCurrentTurn','_actions','guard','otbCalcUserNextOrderChange','UserAddActionNext','PreviewOffsetX','hUWrI','UiCurrentOffsetY','SuCtA','createActorCommandWindow','applyGlobalBattleSystemOTB','_isAppeared','getBorderThickness','PNCXS','dQYuL','_letterSprite','otbReturnBattlerToTurnOrders','battlerName','IconSet','GQVta','_forcedBattlers','_logWindow','STR','OtbTurnOrderActorFace','FVsLp','width','BattleManager_endTurn','otbCalcTargetNextOrderChange','KUWon','OtbTurnOrderClearEnemyGraphic','setGuard','isUsingSideviewUiLayout','_fadeDuration','SpriteThin','mPaRI','onSkillCancel','UiNextOffsetX','addLoadListener','_graphicEnemy','Scene_Battle_onItemCancel','updateStateTurns','makeActionOrders','clamp','mNUXw','createAllWindows','mjsui','loadSvActor','prototype','ARRAYJSON','gradientFillRect','BattleSystemOTB','kSqtD','faceName','transparent','selectNextActor','Game_BattlerBase_appear','Scene_Battle_onActorOk','SubjectDistance','WVGlh','DisplayPosition','setTarget','kQwqj','removeActor'];_0x5abc=function(){return _0x1b95e7;};return _0x5abc();}function Window_OTB_TurnOrder(){const _0x531d43=_0x56d93f;this[_0x531d43(0x17e)](...arguments);}Window_OTB_TurnOrder[_0x56d93f(0x299)]=Object[_0x56d93f(0x32f)](Window_Base[_0x56d93f(0x299)]),Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x361)]=Window_OTB_TurnOrder,Window_OTB_TurnOrder['Settings']=VisuMZ[_0x56d93f(0x29c)][_0x56d93f(0x211)][_0x56d93f(0x2f0)],Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x17e)]=function(){const _0x1a084d=_0x56d93f,_0x575c59=this[_0x1a084d(0x174)]();this[_0x1a084d(0x24a)](_0x575c59),Window_Base[_0x1a084d(0x299)]['initialize'][_0x1a084d(0x320)](this,_0x575c59),this[_0x1a084d(0x1a2)]=0x0,this[_0x1a084d(0x2f7)](),this[_0x1a084d(0x350)](),this[_0x1a084d(0x168)](),this[_0x1a084d(0x1fe)]();},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x174)]=function(){const _0x20a8e9=_0x56d93f,_0x44bbe5=Window_OTB_TurnOrder[_0x20a8e9(0x211)],_0x1542f3=SceneManager['_scene'][_0x20a8e9(0x1e0)][_0x20a8e9(0x24f)];let _0x4acc29=Graphics['width']-_0x44bbe5['ScreenBuffer']*0x2,_0x2e0f60=_0x44bbe5['SpriteLength']+this['lineHeight'](),_0x104d2e=_0x44bbe5[_0x20a8e9(0x22f)],_0x368d67=0x0;switch(_0x44bbe5['DisplayPosition']){case _0x20a8e9(0x21e):_0x368d67=Graphics[_0x20a8e9(0x24f)]-_0x1542f3-_0x44bbe5[_0x20a8e9(0x22f)]-_0x2e0f60;break;default:_0x368d67=_0x44bbe5['ScreenBuffer'];break;}if(Imported[_0x20a8e9(0x20d)]&&BattleManager[_0x20a8e9(0x289)]()){const _0x57945a=VisuMZ[_0x20a8e9(0x388)][_0x20a8e9(0x211)][_0x20a8e9(0x2ea)];_0x4acc29-=_0x57945a['WidthBase']+_0x57945a[_0x20a8e9(0x20a)],_0x4acc29-=_0x44bbe5[_0x20a8e9(0x22f)];}return _0x104d2e+=_0x44bbe5['DisplayOffsetX']||0x0,_0x368d67+=_0x44bbe5[_0x20a8e9(0x177)]||0x0,new Rectangle(_0x104d2e,_0x368d67,_0x4acc29,_0x2e0f60);},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x24a)]=function(_0x1b234b){const _0x2f37ad=_0x56d93f;this[_0x2f37ad(0x260)]=this['_homeX']=_0x1b234b['x'],this[_0x2f37ad(0x237)]=this['_homeY']=_0x1b234b['y'],this[_0x2f37ad(0x37f)]=0x0;const _0x375dc5=Window_OTB_TurnOrder['Settings'];this[_0x2f37ad(0x10a)]=Math[_0x2f37ad(0xe9)]((_0x1b234b['width']-_0x375dc5[_0x2f37ad(0x28b)]-_0x375dc5[_0x2f37ad(0x2a3)]*0x2)/0x2),_0x375dc5['OrderDirection']?'ETvwd'===_0x2f37ad(0x1bd)?(this[_0x2f37ad(0x24d)]=_0x1b234b['width']-_0x375dc5[_0x2f37ad(0x28b)],this[_0x2f37ad(0x1aa)]=this[_0x2f37ad(0x10a)]+_0x375dc5[_0x2f37ad(0x2a3)],this['_nextX']=0x0):(_0x40b420=_0x1e1270?_0x1e5cf2['_nextX']:_0x1f02b5['_currentX'],_0x5edaeb+=_0x513a12*_0x21e4e7):_0x2f37ad(0x224)!==_0x2f37ad(0x2b2)?(this[_0x2f37ad(0x24d)]=0x0,this[_0x2f37ad(0x1aa)]=_0x375dc5['SpriteThin']+_0x375dc5[_0x2f37ad(0x2a3)],this[_0x2f37ad(0x207)]=this[_0x2f37ad(0x1aa)]+_0x375dc5[_0x2f37ad(0x2a3)]+this['_spriteGroupWidth']):this['isOTB']()?this[_0x2f37ad(0xf8)]():_0x4a39ee[_0x2f37ad(0x29c)]['BattleManager_processTurn'][_0x2f37ad(0x320)](this);},Window_OTB_TurnOrder[_0x56d93f(0x299)]['updatePadding']=function(){const _0xf2d1e9=_0x56d93f;this[_0xf2d1e9(0x1a5)]=0x0;},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x2f7)]=function(){const _0x2c320c=_0x56d93f,_0x32bd03=Window_OTB_TurnOrder['Settings'];if(_0x32bd03[_0x2c320c(0x235)]===_0x2c320c(0x29f))return;if(_0x32bd03['BgDimStyle']===_0x2c320c(0x19e)&&_0x32bd03[_0x2c320c(0x257)]!==''){if(_0x2c320c(0x2a4)===_0x2c320c(0x199)){const _0x16aa29=this[_0x2c320c(0x2b7)];_0x2a2abc['BattleSystemOTB'][_0x2c320c(0x2a1)]['call'](this),_0x8b872b['isOTB']()&&_0x4a189f[_0x2c320c(0x1d7)]()&&_0x16aa29&&!this['_hidden']&&_0x594fec['otbReturnBattlerToTurnOrders'](this);}else{const _0x250d26=ImageManager[_0x2c320c(0x23c)](_0x32bd03['BgImageFilename']);_0x250d26[_0x2c320c(0x28f)](this[_0x2c320c(0x1cb)]['bind'](this,_0x250d26));return;}};const _0x18c3d1=this['contentsBack'],_0x523c62=ColorManager['dimColor1'](),_0x5c7b1b=ColorManager[_0x2c320c(0x231)](),_0xcf32b8=this['_subjectX'],_0x3e11d7=_0x32bd03[_0x2c320c(0x28b)],_0x3ddc0c=0x0,_0x101e5d=_0x32bd03[_0x2c320c(0x105)],_0x409e56=this[_0x2c320c(0x1aa)],_0x122c68=this[_0x2c320c(0x207)],_0x4a7ed6=this[_0x2c320c(0x10a)];switch(_0x32bd03[_0x2c320c(0x235)]){case _0x2c320c(0x1e5):_0x32bd03['OrderDirection']?(_0x18c3d1[_0x2c320c(0x29b)](_0xcf32b8,_0x3ddc0c,_0x3e11d7/0x2,_0x101e5d,_0x5c7b1b,_0x523c62,![]),_0x18c3d1['fillRect'](_0xcf32b8+_0x3e11d7/0x2,_0x3ddc0c,_0x3e11d7/0x2,_0x101e5d,_0x523c62),_0x18c3d1['gradientFillRect'](_0x409e56,_0x3ddc0c,_0x4a7ed6/0x2,_0x101e5d,_0x5c7b1b,_0x523c62,![]),_0x18c3d1[_0x2c320c(0x23d)](_0x409e56+_0x4a7ed6/0x2,_0x3ddc0c,_0x4a7ed6/0x2,_0x101e5d,_0x523c62),_0x18c3d1['gradientFillRect'](_0x122c68,_0x3ddc0c,_0x4a7ed6/0x2,_0x101e5d,_0x5c7b1b,_0x523c62,![]),_0x18c3d1[_0x2c320c(0x23d)](_0x122c68+_0x4a7ed6/0x2,_0x3ddc0c,_0x4a7ed6/0x2,_0x101e5d,_0x523c62)):(_0x18c3d1[_0x2c320c(0x23d)](_0xcf32b8,_0x3ddc0c,_0x3e11d7/0x2,_0x101e5d,_0x523c62),_0x18c3d1['gradientFillRect'](_0xcf32b8+_0x3e11d7/0x2,_0x3ddc0c,_0x3e11d7/0x2,_0x101e5d,_0x523c62,_0x5c7b1b,![]),_0x18c3d1[_0x2c320c(0x23d)](_0x409e56,_0x3ddc0c,_0x4a7ed6/0x2,_0x101e5d,_0x523c62),_0x18c3d1[_0x2c320c(0x29b)](_0x409e56+_0x4a7ed6/0x2,_0x3ddc0c,_0x4a7ed6/0x2,_0x101e5d,_0x523c62,_0x5c7b1b,![]),_0x18c3d1[_0x2c320c(0x23d)](_0x122c68,_0x3ddc0c,_0x4a7ed6/0x2,_0x101e5d,_0x523c62),_0x18c3d1[_0x2c320c(0x29b)](_0x122c68+_0x4a7ed6/0x2,_0x3ddc0c,_0x4a7ed6/0x2,_0x101e5d,_0x523c62,_0x5c7b1b,![]));break;default:_0x18c3d1[_0x2c320c(0x23d)](_0xcf32b8,_0x3ddc0c,_0x3e11d7,_0x101e5d,_0x523c62),_0x18c3d1[_0x2c320c(0x23d)](_0x409e56,_0x3ddc0c,_0x4a7ed6,_0x101e5d,_0x523c62),_0x18c3d1[_0x2c320c(0x23d)](_0x122c68,_0x3ddc0c,_0x4a7ed6,_0x101e5d,_0x523c62);break;}},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x1cb)]=function(_0x4fab5e){const _0xee4a51=_0x56d93f;this[_0xee4a51(0x212)]=new Sprite(),this['_bgImageSprite']['bitmap']=_0x4fab5e,this[_0xee4a51(0xed)](this[_0xee4a51(0x212)]);const _0x38ff92=Window_OTB_TurnOrder[_0xee4a51(0x211)];this[_0xee4a51(0x212)]['x']=_0x38ff92[_0xee4a51(0x21b)],this[_0xee4a51(0x212)]['y']=_0x38ff92['BgImageOffsetY'];},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x350)]=function(){const _0x297258=_0x56d93f;this[_0x297258(0x156)][_0x297258(0x118)](),this['resetFontSettings']();const _0x312d3e=Window_OTB_TurnOrder[_0x297258(0x211)];this[_0x297258(0x156)][_0x297258(0x375)]=_0x312d3e[_0x297258(0x394)];let _0x4405ed=_0x312d3e[_0x297258(0x2cf)];_0x4405ed===_0x297258(0x141)&&(_0x297258(0x1d9)!==_0x297258(0x1d9)?_0x2c63e2=_0x4b8d08[_0x297258(0x1b9)](0x0,_0x41fb9d[_0x297258(0x29c)][_0x297258(0x339)](_0x3872be)):_0x4405ed=_0x312d3e[_0x297258(0x301)]?_0x297258(0x13c):'left');let _0x582161=_0x312d3e[_0x297258(0x105)];if(_0x312d3e[_0x297258(0x164)]!==''){const _0x44f590=this[_0x297258(0x24d)]+_0x312d3e[_0x297258(0x368)],_0x14c5c=_0x582161+_0x312d3e['UiSubjectOffsetY'],_0x133b38=_0x312d3e[_0x297258(0x28b)];this['drawText'](_0x312d3e[_0x297258(0x164)],_0x44f590,_0x14c5c,_0x133b38,_0x297258(0x176));}if(_0x312d3e[_0x297258(0x2ef)]!==''){const _0x551102=this[_0x297258(0x1aa)]+_0x312d3e[_0x297258(0x14b)],_0xb66b57=_0x582161+_0x312d3e[_0x297258(0x271)],_0x34f42f=this['_spriteGroupWidth'];this[_0x297258(0x369)](_0x312d3e[_0x297258(0x2ef)],_0x551102,_0xb66b57,_0x34f42f,_0x4405ed);}if(_0x312d3e[_0x297258(0x163)]!==''){if('irToJ'!==_0x297258(0x34b))return _0x4eed0d[_0x297258(0x2df)]()?_0x470215[_0x297258(0x29c)][_0x297258(0x211)][_0x297258(0x346)][_0x297258(0x2ed)]:_0x4dffce[_0x297258(0x29c)][_0x297258(0x2b3)][_0x297258(0x320)](this);else{const _0x5a0e57=this[_0x297258(0x207)]+_0x312d3e[_0x297258(0x28e)],_0x2f3e97=_0x582161+_0x312d3e['UiNextOffsetY'],_0x5ed695=this[_0x297258(0x10a)];this[_0x297258(0x369)](_0x312d3e[_0x297258(0x163)],_0x5a0e57,_0x2f3e97,_0x5ed695,_0x4405ed);}}},Window_OTB_TurnOrder['prototype']['createSpriteContainers']=function(){const _0x5c0a29=_0x56d93f,_0x49b45e=Window_OTB_TurnOrder['Settings'];this[_0x5c0a29(0x1bb)]=new Sprite(),this[_0x5c0a29(0x1de)](this[_0x5c0a29(0x1bb)]),this[_0x5c0a29(0x323)]=null,this[_0x5c0a29(0x1a7)]=[],this[_0x5c0a29(0xf6)]=[],this['_previewContainer']=new Sprite(),this[_0x5c0a29(0x130)]['x']=_0x49b45e[_0x5c0a29(0x26f)],this[_0x5c0a29(0x130)]['y']=_0x49b45e[_0x5c0a29(0x33c)],this['_previewContainer']['x']-=Math[_0x5c0a29(0xe9)](_0x49b45e[_0x5c0a29(0x28b)]*0.5*_0x49b45e[_0x5c0a29(0x36b)]),_0x49b45e[_0x5c0a29(0x301)]&&(this[_0x5c0a29(0x130)]['x']+=_0x49b45e[_0x5c0a29(0x28b)]),this[_0x5c0a29(0x130)]['y']-=Math[_0x5c0a29(0xe9)](_0x49b45e[_0x5c0a29(0x105)]*0.5*_0x49b45e['PreviewScale']),this[_0x5c0a29(0x1de)](this[_0x5c0a29(0x130)]),this[_0x5c0a29(0x355)]=[],this[_0x5c0a29(0x1a3)]=[];},Window_OTB_TurnOrder['prototype'][_0x56d93f(0x1d2)]=function(){const _0x1966f9=_0x56d93f;Window_Base[_0x1966f9(0x299)][_0x1966f9(0x1d2)][_0x1966f9(0x320)](this),this['updateTurnOrders'](),this[_0x1966f9(0x162)](),this['updateVisibility'](),this[_0x1966f9(0x25c)]();},Window_OTB_TurnOrder['prototype'][_0x56d93f(0x36f)]=function(){const _0x491a46=_0x56d93f;this[_0x491a46(0x182)]=!![];},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x1ff)]=function(){const _0x510bc9=_0x56d93f;if(!this[_0x510bc9(0x182)])return;this[_0x510bc9(0x182)]=![];for(const _0x24b25c of this['_currentTurn']){if(_0x510bc9(0x23e)!==_0x510bc9(0x215)){if(!_0x24b25c)continue;_0x24b25c[_0x510bc9(0x1ce)]();}else _0x3eb61a[_0x510bc9(0x2ee)](),_0x1f9ccc[_0x510bc9(0x29c)][_0x510bc9(0x175)][_0x510bc9(0x320)](this);}for(const _0x465fcf of this[_0x510bc9(0xf6)]){if(_0x510bc9(0x15f)!==_0x510bc9(0x15f))_0x7baeaa[_0x510bc9(0x220)][_0x510bc9(0x37c)](_0x6fd52b);else{if(!_0x465fcf)continue;_0x465fcf['calculateTargetPositions']();}}},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x162)]=function(){const _0x5919b9=_0x56d93f,_0x1f6212=Window_OTB_TurnOrder[_0x5919b9(0x211)];if(_0x1f6212['DisplayPosition']!==_0x5919b9(0x170))return;if(!_0x1f6212[_0x5919b9(0x2de)])return;const _0x4b9d3b=SceneManager[_0x5919b9(0x242)]['_helpWindow'];if(!_0x4b9d3b)return;_0x4b9d3b['visible']?(this['x']=this['_homeX']+(_0x1f6212['RepositionTopHelpX']||0x0),this['y']=this[_0x5919b9(0x2ff)]+(_0x1f6212['RepositionTopHelpY']||0x0)):(this['x']=this[_0x5919b9(0x307)],this['y']=this[_0x5919b9(0x2ff)]);const _0xea1c64=SceneManager[_0x5919b9(0x242)][_0x5919b9(0x167)];if(Window_OTB_TurnOrder[_0x5919b9(0x22e)]===undefined){if(_0x5919b9(0x302)!=='sVLfT')Window_OTB_TurnOrder[_0x5919b9(0x22e)]=Math[_0x5919b9(0xee)]((Graphics[_0x5919b9(0x283)]-Math[_0x5919b9(0x2c9)](Graphics[_0x5919b9(0x19a)],_0xea1c64[_0x5919b9(0x283)]))/0x2);else{if(!this[_0x5919b9(0xf0)]())return;this[_0x5919b9(0x2dc)]=this[_0x5919b9(0x2dc)]||0x0,this['_otbTimesActedThisTurn']--,_0x5ae874['otbAddBattlerToTurnOrderAtStart'](this,_0x1cbbb4,_0x165f97[_0x5919b9(0x106)]);}}Window_OTB_TurnOrder[_0x5919b9(0x2fb)]===undefined&&(Window_OTB_TurnOrder[_0x5919b9(0x2fb)]=Math[_0x5919b9(0xee)]((Graphics[_0x5919b9(0x24f)]-Math['min'](Graphics['boxHeight'],_0xea1c64[_0x5919b9(0x24f)]))/0x2));;this['x']+=_0xea1c64['x']-Window_OTB_TurnOrder[_0x5919b9(0x22e)],this['y']+=_0xea1c64['y']-Window_OTB_TurnOrder[_0x5919b9(0x2fb)];},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x1fe)]=function(){const _0x3228cc=_0x56d93f;this['visible']=$gameSystem[_0x3228cc(0xfe)]();if(BattleManager[_0x3228cc(0x2e8)]===_0x3228cc(0x2e6)){if(!this['_fadeSpeed']){if(_0x3228cc(0x219)!==_0x3228cc(0x219)){const _0x1fb18e=this[_0x3228cc(0x124)]();if(!_0x1fb18e)return;const _0x367568=_0x1fb18e[_0x3228cc(0x124)]();if(!_0x367568)return;const _0x45c7c9=_0x367568['mainSprite']();if(!_0x45c7c9)return;this[_0x3228cc(0x160)](_0x45c7c9['_blendColor']);}else{const _0x46c046=Window_OTB_TurnOrder[_0x3228cc(0x211)];this['_fadeSpeed']=Math[_0x3228cc(0xe9)](0xff/(_0x46c046['UpdateFrames']||0x1));}}this[_0x3228cc(0x1a2)]-=this[_0x3228cc(0x32b)],this['contentsOpacity']-=this['_fadeSpeed'],this['_contentsBackSprite'][_0x3228cc(0x1a2)]-=this[_0x3228cc(0x32b)];}},Window_OTB_TurnOrder[_0x56d93f(0x299)]['sortContainer']=function(){const _0x46c623=_0x56d93f;if(!this[_0x46c623(0x1bb)])return;const _0x301212=Window_OTB_TurnOrder[_0x46c623(0x211)],_0x52f097=_0x301212[_0x46c623(0x301)];if(_0x52f097){if(_0x46c623(0x316)==='avQPE'){const _0x3778bd=this[_0x46c623(0x1f3)]()[_0x46c623(0x1b1)];if(_0x3778bd['match'](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x16ad8a(_0x31bf10['$1']);return this[_0x46c623(0x29e)]();}else this[_0x46c623(0x1bb)]['children']['sort']((_0x4d1c0b,_0x2d775e)=>_0x4d1c0b['x']-_0x2d775e['x']);}else this[_0x46c623(0x1bb)][_0x46c623(0x372)][_0x46c623(0x249)]((_0xa161c1,_0x426657)=>_0x426657['x']-_0xa161c1['x']);},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x392)]=function(_0x1ba2f2){const _0x29e37f=_0x56d93f;if(!_0x1ba2f2)return;_0x1ba2f2['_sourceArray']&&('QqWoy'!=='hZtyY'?_0x1ba2f2[_0x29e37f(0x220)][_0x29e37f(0x37c)](_0x1ba2f2):this[_0x29e37f(0x31d)]());const _0x2e569b=Window_OTB_TurnOrder['Settings'],_0x534f07=0x3e8/0x3c*_0x2e569b[_0x29e37f(0x321)]+0x1f4;_0x1ba2f2[_0x29e37f(0x317)](0x0),setTimeout(this[_0x29e37f(0x200)][_0x29e37f(0x13f)](this,_0x1ba2f2),_0x534f07);},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x200)]=function(_0x5302e5){const _0x984792=_0x56d93f;_0x5302e5[_0x984792(0x220)]&&_0x5302e5[_0x984792(0x220)][_0x984792(0x37c)](_0x5302e5),this[_0x984792(0x1bb)]['removeChild'](_0x5302e5),this[_0x984792(0x130)]['removeChild'](_0x5302e5);},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x261)]=function(){const _0x5f57e8=_0x56d93f;if(!this[_0x5f57e8(0x323)])return;this[_0x5f57e8(0x392)](this[_0x5f57e8(0x323)]);},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x26a)]=function(){const _0x551df5=_0x56d93f;while(this[_0x551df5(0x1a7)]['length']){const _0x46f6ca=this['_currentTurn']['shift']();_0x46f6ca[_0x551df5(0x317)](0x0);}while(this[_0x551df5(0xf6)][_0x551df5(0x1ac)]){const _0x143a31=this[_0x551df5(0xf6)][_0x551df5(0x250)]();if(!_0x143a31)continue;this[_0x551df5(0x1a7)][_0x551df5(0x125)](_0x143a31);}for(const _0x1458f3 of this[_0x551df5(0x1a7)]){if(!_0x1458f3)continue;_0x1458f3[_0x551df5(0x2ad)](this['_currentTurn']);}},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0xe8)]=function(_0x2782b4,_0xedcf34){const _0x17daea=_0x56d93f,_0x2f010b=_0x2782b4===BattleManager[_0x17daea(0x106)]?this[_0x17daea(0x1a7)]:this[_0x17daea(0xf6)],_0x4350c3={};for(const _0xc90ea0 of _0x2782b4){if('vKXHK'!==_0x17daea(0x341)){const _0x5c423a=_0x17daea(0x12e)[_0x17daea(0x21a)](_0xc90ea0[_0x17daea(0x2c5)]()?'actor':_0x17daea(0x331),_0xc90ea0[_0x17daea(0x226)]());_0x4350c3[_0x5c423a]=_0x4350c3[_0x5c423a]||0x0;const _0x19d9a2=_0x4350c3[_0x5c423a]++,_0x23cc58=new Sprite_OTB_TurnOrder_Battler(_0xc90ea0,_0x19d9a2,_0x2f010b);this['_spriteContainer'][_0x17daea(0x1de)](_0x23cc58),_0x2f010b[_0x17daea(0x125)](_0x23cc58);}else delete _0x24fd06[_0x17daea(0xea)][_0x17daea(0x342)];}for(const _0x522121 of _0x2f010b){if(_0x17daea(0x2e1)!==_0x17daea(0x2b4)){if(!_0x522121)continue;_0x522121[_0x17daea(0x317)](0xff),_0x522121['calculateTargetPositions'](),_0xedcf34&&(_0x522121['opacity']=0xff,_0x522121['x']=_0x522121[_0x17daea(0x22c)],_0x522121[_0x17daea(0x2ae)]=0x0);}else _0x48ef31+=_0x18be67(_0x3be3b4['$1']);}},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x34e)]=function(){const _0x37dc95=BattleManager['_otb_actionBattlersNext'];this['createTurnOrderSprites'](_0x37dc95);},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x1e6)]=function(_0x1ddf12,_0x19a69d){const _0x3a8dce=_0x56d93f;this[_0x3a8dce(0x261)]();for(const _0x1fb3de of this[_0x3a8dce(0x1a7)]){if('tuJYb'!=='tuJYb')_0x28df0c['prototype'][_0x3a8dce(0x317)][_0x3a8dce(0x320)](this,_0x1d45ce),_0x4e14f0>0x0?this[_0x3a8dce(0x28a)]=0x1:(this[_0x3a8dce(0x28a)]/=0x2,this[_0x3a8dce(0x28a)]=_0x1cbfc4[_0x3a8dce(0x1be)](this[_0x3a8dce(0x28a)]));else{if(!_0x1fb3de)continue;_0x1fb3de[_0x3a8dce(0x124)]()===_0x1ddf12&&(_0x1fb3de['_instance']=_0x1fb3de[_0x3a8dce(0x329)]||0x0,_0x1fb3de[_0x3a8dce(0x329)]--);}}const _0x1f20e1=this[_0x3a8dce(0x1a7)]['findIndex'](_0x34fe8e=>_0x34fe8e[_0x3a8dce(0x124)]()===_0x1ddf12);if(this[_0x3a8dce(0x1a7)][_0x1f20e1])this[_0x3a8dce(0x323)]=this[_0x3a8dce(0x1a7)][_0x1f20e1],this['_currentTurn'][_0x1f20e1][_0x3a8dce(0x1ce)](),this[_0x3a8dce(0x1a7)][_0x3a8dce(0x2b5)](_0x1f20e1,0x1);else{if(_0x1ddf12){const _0x2c969d=new Sprite_OTB_TurnOrder_Battler(_0x1ddf12,-0x1,null);this[_0x3a8dce(0x1bb)][_0x3a8dce(0x1de)](_0x2c969d),this[_0x3a8dce(0x323)]=_0x2c969d,_0x2c969d[_0x3a8dce(0x317)](0xff),_0x2c969d[_0x3a8dce(0x2ae)]=0x258,_0x2c969d['x']=this[_0x3a8dce(0x24d)],_0x2c969d[_0x3a8dce(0x22c)]=this[_0x3a8dce(0x24d)];if(_0x19a69d){if(_0x3a8dce(0x324)===_0x3a8dce(0x324))_0x2c969d[_0x3a8dce(0x1a2)]=0xff;else{const _0x5160d6=new _0x51e2ec(this,!![]);_0x5160d6['setSkill'](_0x382b86),_0x5160d6['_forceAction']=!![];if(_0x1cec21===-0x2)_0x5160d6[_0x3a8dce(0x2a6)](this[_0x3a8dce(0x1a9)]);else _0x54df43===-0x1?_0x5160d6[_0x3a8dce(0x2aa)]():_0x5160d6['setTarget'](_0x324307);this['_actions']['push'](_0x5160d6);}}}}for(const _0x3b482b of this[_0x3a8dce(0x1a7)]){if('yyulJ'!==_0x3a8dce(0x32c))this['x']=this['_homeX'],this['y']=this[_0x3a8dce(0x2ff)];else{if(!_0x3b482b)continue;_0x3b482b['calculateTargetPositions']();}}},Window_OTB_TurnOrder[_0x56d93f(0x299)]['removeUnableTurnOrderSprites']=function(){const _0x537a59=_0x56d93f;for(const _0x5f217c of this[_0x537a59(0x1a7)]){if(!_0x5f217c)continue;const _0x5a829e=_0x5f217c[_0x537a59(0x124)]();if(BattleManager[_0x537a59(0x106)][_0x537a59(0x1ec)](_0x5a829e))continue;this['removeSprite'](_0x5f217c);}for(const _0x12939e of this[_0x537a59(0xf6)]){if(_0x537a59(0x15b)===_0x537a59(0x15b)){if(!_0x12939e)continue;const _0x531c6c=_0x12939e[_0x537a59(0x124)]();if(BattleManager[_0x537a59(0x11c)]['includes'](_0x531c6c))continue;this['removeSprite'](_0x12939e);}else _0xe8d4ca[_0x537a59(0x29b)](_0x3b8f28,_0x27b763,_0x37b91d/0x2,_0x441b00,_0x1b9460,_0x51b49a,![]),_0x4b18cf[_0x537a59(0x23d)](_0x2a5b30+_0x33e361/0x2,_0xc07229,_0x5bfe79/0x2,_0x348a99,_0x4fa84e),_0x17d021[_0x537a59(0x29b)](_0x27bf81,_0x1faa11,_0x4c0075/0x2,_0x978841,_0x15bd85,_0x4cf1e6,![]),_0x113f92['fillRect'](_0xa9b34b+_0xb0fa67/0x2,_0x16148d,_0x5011fa/0x2,_0x7d8f32,_0x1344b6),_0x45e081[_0x537a59(0x29b)](_0x44d89e,_0xc7fde5,_0x95611b/0x2,_0x10da80,_0x4c72ca,_0x3ecc5b,![]),_0x6b119[_0x537a59(0x23d)](_0x3991e0+_0x45d158/0x2,_0x121d1f,_0x3746b1/0x2,_0x55caf5,_0x3960ac);}},Window_OTB_TurnOrder[_0x56d93f(0x299)]['addBattlerToTurnOrderAtEnd']=function(_0x2ff839,_0x4bae4f){const _0xda0222=_0x56d93f,_0xb711db=_0x4bae4f===BattleManager[_0xda0222(0x106)]?this[_0xda0222(0x1a7)]:this[_0xda0222(0xf6)];if(!_0xb711db)return;const _0x102c8b=VisuMZ[_0xda0222(0x29c)]['GetAllIndicies'](_0x2ff839,_0x4bae4f),_0x4ae612=_0x102c8b['length']-0x1,_0x33bacf=new Sprite_OTB_TurnOrder_Battler(_0x2ff839,_0x4ae612,_0xb711db);this[_0xda0222(0x1bb)][_0xda0222(0x1de)](_0x33bacf),_0xb711db[_0xda0222(0x125)](_0x33bacf),_0x33bacf[_0xda0222(0x317)](0xff),this['requestUpdateTurnOrders']();},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x25e)]=function(_0x428c98,_0x1349c0){const _0x5fcc15=_0x56d93f,_0x5692ae=_0x1349c0===BattleManager[_0x5fcc15(0x106)]?this[_0x5fcc15(0x1a7)]:this[_0x5fcc15(0xf6)];if(!_0x5692ae)return;for(const _0xe9d56 of _0x5692ae){if(!_0xe9d56)continue;if(_0xe9d56[_0x5fcc15(0x124)]()===_0x428c98){if(_0x5fcc15(0x27d)!=='GQVta')return _0x5fcc15(0x345);else _0xe9d56[_0x5fcc15(0x329)]=_0xe9d56[_0x5fcc15(0x329)]||0x0,_0xe9d56[_0x5fcc15(0x329)]++;}}const _0x4559b4=0x0,_0x1c5eb9=new Sprite_OTB_TurnOrder_Battler(_0x428c98,_0x4559b4,_0x5692ae);this['_spriteContainer'][_0x5fcc15(0x1de)](_0x1c5eb9),_0x5692ae[_0x5fcc15(0x16d)](_0x1c5eb9),_0x1c5eb9[_0x5fcc15(0x317)](0xff),_0x1c5eb9[_0x5fcc15(0x2ae)]=0x258,_0x1c5eb9['x']=this[_0x5fcc15(0x24d)],this[_0x5fcc15(0x36f)]();},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x1c0)]=function(_0x20d3fe,_0x434f6f){const _0x2941f2=_0x56d93f,_0x46b711=this[_0x2941f2(0x1a7)];if(!_0x46b711)return;let _0x47472a=0x0;for(let _0x10bcba=0x0;_0x10bcba<_0x434f6f;_0x10bcba++){const _0xa50e53=_0x46b711[_0x10bcba];if(!_0xa50e53)continue;if(_0xa50e53[_0x2941f2(0x124)]()!==_0x20d3fe)continue;_0x47472a=_0xa50e53[_0x2941f2(0x329)]+0x1;}for(let _0x3ea60b=_0x434f6f;_0x3ea60b<_0x46b711['length'];_0x3ea60b++){const _0x13387c=_0x46b711[_0x3ea60b];if(!_0x13387c)continue;if(_0x13387c['battler']()!==_0x20d3fe)continue;_0x13387c[_0x2941f2(0x329)]=_0x13387c['_instance']||0x0,_0x13387c[_0x2941f2(0x329)]++;}const _0x220e64=new Sprite_OTB_TurnOrder_Battler(_0x20d3fe,_0x47472a,_0x46b711);this['_spriteContainer'][_0x2941f2(0x1de)](_0x220e64),_0x46b711[_0x2941f2(0x2b5)](_0x434f6f,0x0,_0x220e64),_0x220e64['startFade'](0xff),_0x220e64[_0x2941f2(0x2ae)]=0x258,_0x220e64['x']=this[_0x2941f2(0x24d)],this[_0x2941f2(0x36f)]();},Window_OTB_TurnOrder[_0x56d93f(0x299)]['resumeTurnOrderSprites']=function(){const _0x5d8a8e=_0x56d93f;this[_0x5d8a8e(0xe8)](BattleManager[_0x5d8a8e(0x106)],!![]),this['createTurnOrderSprites'](BattleManager[_0x5d8a8e(0x11c)],!![]),this[_0x5d8a8e(0x1e6)](BattleManager[_0x5d8a8e(0x323)],!![]),this[_0x5d8a8e(0x25c)]();},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x115)]=function(_0x302d9d){const _0x4e7e02=_0x56d93f;this[_0x4e7e02(0x1c7)]();if(_0x302d9d&&_0x302d9d[_0x4e7e02(0x1d8)]()!==null){if('jeAsn'===_0x4e7e02(0x272))return this[_0x4e7e02(0x1f9)]===_0x4b7205&&this[_0x4e7e02(0x121)](),this[_0x4e7e02(0x1f9)];else this['createOrderPreview'](_0x302d9d);}},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0x1c7)]=function(){const _0x567e5b=_0x56d93f;for(const _0x28b8fb of this[_0x567e5b(0x130)][_0x567e5b(0x372)]){if(!_0x28b8fb)continue;this[_0x567e5b(0x392)](_0x28b8fb);}},Window_OTB_TurnOrder[_0x56d93f(0x299)][_0x56d93f(0xfd)]=function(_0x17b0f2){const _0x508469=_0x56d93f,_0x3a51cc=_0x17b0f2[_0x508469(0x236)](),_0x49f712=_0x17b0f2[_0x508469(0x2f1)](),_0x253197=_0x17b0f2[_0x508469(0x26d)]();if(_0x49f712!==0x0){if(_0x508469(0x38a)!==_0x508469(0x306))this['createOrderPreviewSprite'](_0x3a51cc,![],_0x49f712);else return this[_0x508469(0x33d)]===_0x5a27ce?_0x508469(0xf2):'PreviewEnemy';}_0x253197!==0x0&&(_0x508469(0x286)!==_0x508469(0x286)?this[_0x508469(0x1cf)]=_0x508469(0x331):this['createOrderPreviewSprite'](_0x3a51cc,!![],_0x253197));if(!_0x17b0f2[_0x508469(0x1d6)]())return;const _0x26310c=SceneManager[_0x508469(0x242)][_0x508469(0x314)],_0x36f1e3=SceneManager['_scene'][_0x508469(0x1a6)];let _0x28fd62=null;if(_0x26310c&&_0x26310c[_0x508469(0x14d)])_0x28fd62=_0x26310c[_0x508469(0x1f3)](_0x26310c[_0x508469(0x226)]());else{if(_0x36f1e3&&_0x36f1e3[_0x508469(0x14d)]){if('mPaRI'!==_0x508469(0x28c)){if(!_0x350bfc[_0x508469(0x1d7)]())return;if(!_0x20b686['isOTB']())return;if(!this['item']())return;if(!_0x29ae21)return;if(!_0x323c86[_0x508469(0x1b4)]())return 0x0;let _0x33f6ed=this[_0x508469(0x33e)](_0x3a2802),_0xcaab05=this[_0x508469(0x285)](_0x4f08bb);_0x33f6ed!==0x0&&_0x3cca2a[_0x508469(0xef)](_0x544b86,-_0x33f6ed,![]),_0xcaab05!==0x0&&_0x1efa6d[_0x508469(0xef)](_0x51862e,-_0xcaab05,!![]);}else _0x28fd62=_0x36f1e3[_0x508469(0x331)]();}}if(!_0x28fd62)return;const _0x491f05=_0x17b0f2[_0x508469(0x33e)](_0x28fd62),_0x59f1fe=_0x17b0f2[_0x508469(0x285)](_0x28fd62);if(_0x491f05!==0x0){if(_0x508469(0x37a)!==_0x508469(0x37a)){const _0x4c2099=this['enemy']()[_0x508469(0x1b1)];if(_0x4c2099['match'](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x508469(0x345);else{if(_0x4c2099['match'](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return _0x2598fe['Settings']['EnemyBattlerType'];}else this[_0x508469(0x173)](_0x28fd62,![],_0x491f05);}if(_0x59f1fe!==0x0){if(_0x508469(0x254)===_0x508469(0x254))this[_0x508469(0x173)](_0x28fd62,!![],_0x59f1fe);else{const _0x33df85=_0x508469(0x12e)[_0x508469(0x21a)](_0x4b926e[_0x508469(0x2c5)]()?_0x508469(0x1f3):_0x508469(0x331),_0x2989cc[_0x508469(0x226)]());_0x411800[_0x33df85]=_0x1f5d3b[_0x33df85]||0x0;const _0x5b1f51=_0x50242b[_0x33df85]++,_0x299369=new _0x2101d8(_0x2d47c7,_0x5b1f51,_0x541fc6);this[_0x508469(0x1bb)][_0x508469(0x1de)](_0x299369),_0x40ffc5[_0x508469(0x125)](_0x299369);}}},Window_OTB_TurnOrder[_0x56d93f(0x299)]['createOrderPreviewSprite']=function(_0x2c7520,_0x1609f8,_0x7d413d){const _0x4a6769=_0x56d93f;if(!_0x2c7520)return;if(_0x7d413d===0x0)return;const _0x435433=_0x1609f8?BattleManager[_0x4a6769(0x11c)]:BattleManager['_actionBattlers'],_0x4bfce8=VisuMZ['BattleSystemOTB'][_0x4a6769(0x35a)](_0x2c7520,_0x435433),_0x39a1c9=_0x1609f8?this[_0x4a6769(0xf6)]:this[_0x4a6769(0x1a7)],_0x33ad76=_0x1609f8?this[_0x4a6769(0x1a3)]:this[_0x4a6769(0x355)];if(_0x4bfce8[_0x4a6769(0x1ac)]<=0x0)return;for(let _0x8cdee9=0x0;_0x8cdee9<_0x4bfce8['length'];_0x8cdee9++){const _0x264239=new Sprite_OTB_TurnOrder_Preview(_0x2c7520,_0x8cdee9,_0x39a1c9,_0x7d413d);this[_0x4a6769(0x130)][_0x4a6769(0x1de)](_0x264239),_0x33ad76[_0x4a6769(0x125)](_0x264239),_0x264239[_0x4a6769(0x1ce)](),_0x264239[_0x4a6769(0x317)](0xff);}};
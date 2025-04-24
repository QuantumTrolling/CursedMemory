//=============================================================================
// VisuStella MZ - Battle System CTB - Charge Turn Battle
// VisuMZ_2_BattleSystemCTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemCTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemCTB = VisuMZ.BattleSystemCTB || {};
VisuMZ.BattleSystemCTB.version = 1.21;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.21] [BattleSystemCTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_CTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin creates a Charge Turn Battle (CTB) system using RPG Maker MZ's
 * TPB as a base. CTB functions by calculating the speed of every battler and
 * balancing them relative to one another. When it's a battler's turn, the
 * battler will either choose an action to perform immediately or charge it
 * for later depending if the skill requires charging.
 * 
 * This is a battle system where agility plays an important factor in the
 * progress of battle where higher agility values give battlers more advantage
 * and additional turns over lower agility values, which give battlers less
 * advantage and less turns.
 * 
 * A turn order display will appear to compensate for the removal of gauges.
 * The turn order display will show a preview of what the turn order could
 * possibly be like. This turn order display is variable and can be changed
 * due to player and enemy influence by using different action speeds, effects
 * provided by this plugin that alter the turn order, and more!
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB integrated mechanics converted for CTB such as
 *   speed, calculations, etc.
 * * No more waiting for gauges to show up! In fact, you won't even see the
 *   TPB gauge in-game.
 * * A turn order display that previews a potential lineup for how the
 *   participating battlers in battle will play out.
 * * Notetags that give skills and items access to manipulating a battler's
 *   CTB speed.
 * * Notetags that give skills and items access to directly manipulate a target
 *   batter's position on the Turn Order display.
 * * These mechanics are separate from ATB and TPB itself, so you can still use
 *   either battle system without affecting both of them.
 * * Through the Core Engine, you can switch in and out of CTB for a different
 *   battle system.
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
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
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
 * Despite the fact that the Battle System CTB plugin uses RPG Maker MZ's TPB
 * as a base, it does not have any gauges to depict the time it takes for a
 * battler's turn to appear. Instead, a turn order display appears on the
 * screen (you pick where it can appear: top, bottom, left, or right) and shows
 * a possible preview of the battler turn order.
 * 
 * This is only a preview of what can happen because lots of different things
 * can influence the position and ordering of the turn order display, ranging
 * from skill/item speeds, notetag effects, changes in AGI, etc. What is seen
 * on the turn order display is the most likely possibility instead of the
 * exact order to occur due to the external influences.
 * 
 * ---
 * 
 * Skill & Item Speeds
 * 
 * With TPB, skills and items with negative speed values will cause the battler
 * to enter a "casting" state, meaning they have to wait extra time before the
 * action takes off. With this delayed action execution, one might assume that
 * if there is a positive speed value, the battler would require less time for
 * their next turn.
 * 
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to CTB,
 * skills and items with positive speed values will have an impact on how full
 * their CTB Speed will be in the following turn. A value of 2000 will put the
 * turn at 50% ready, 1000 will put the gauge at 25% ready, 500 will put it at
 * 12.5% ready, and so on. Notetags can also be used to influence this.
 * 
 * ---
 * 
 * JS Calculation Mechanics
 * 
 * While the calculation mechanics aren't changed from their original RPG Maker
 * MZ formulas, the functions for them have been overwritten to allow you, the
 * game developer, to alter them as you see fit.
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
 * === General CTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <CTB Help>
 *  description
 *  description
 * </CTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under CTB.
 * - This is primarily used if the skill behaves differently in CTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to CTB.
 *
 * ---
 * 
 * === CTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the CTB Turn Order Display
 * 
 * ---
 *
 * <CTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <CTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <CTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === CTB Speed Manipulation-Related Notetags ===
 * 
 * These notetags are used for CTB Speed manipulation purposes.
 * 
 * ---
 *
 * <CTB Set Order: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position to exactly x.
 * - Replace 'x' with a number value depicting the exact position of the turn
 *   order position. 0 is the currently active battler and cannot be used.
 *   1 is closest to taking a turn. Higher numbers are further away.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB Change Order: +x>
 * <CTB Change Order: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position by x slots.
 * - Replace 'x' with a number value indicating the increase or decrease.
 *   Negative values decrease the turns needed to wait while positive values
 *   increase the turns needed.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB After Speed: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's CTB Speed will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   CTB Speed to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <CTB Charge Speed: x%>
 * <CTB Charge Speed: +x%>
 * <CTB Charge Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <CTB Cast Speed: x%>
 * <CTB Cast Speed: +x%>
 * <CTB Cast Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 * 
 * === JavaScript Notetags: CTB Speed Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional CTB Speed Manipulation.
 * 
 * ---
 * 
 * <JS CTB Order>
 *  code
 *  code
 *  order = code;
 * </JS CTB Order>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine where to set the target's
 *   order on the CTB Turn Order Display to.
 * - The 'order' variable represents the final position on the Turn Order
 *   Display to place the target.
 * - The 'position' variable represents the target's current position on the
 *   Turn Order Display.
 * - This does not affect the currently active battler.
 * 
 * ---
 * 
 * <JS CTB Charge Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Charge Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a charging state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS CTB Cast Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Cast Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a casting state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS CTB After Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB After Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to after performing this skill/item action.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to 0.
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
 * Actor: Change CTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the CTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change CTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the CTB Turn Order.
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
 * Actor: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the actor(s).
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
 * Enemy: Change CTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change CTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
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
 * Enemy: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the enemy(ies).
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
 * System: CTB Turn Order Visibility
 * - Determine the visibility of the CTB Turn Order Display.
 * 
 *   Visibility:
 *   - Changes the visibility of the CTB Turn Order Display.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System CTB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * General
 * 
 *   Device Friendly:
 *   - Make the calculations more device friendly?
 *   - Or make it for desktop at full strength?
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Initial Speed:
 *   - JavaScript code to determine how much speed to give each battler at the
 *     start of battle.
 * 
 *   JS: Speed:
 *   - JavaScript code to determine how much speed a battler has.
 * 
 *   JS: Base Speed:
 *   - JavaScript code to determine how much base speed a battler has.
 * 
 *   JS: Relative Speed:
 *   - JavaScript code to determine what is the relative speed of a battler.
 * 
 *   JS: Acceleration:
 *   - JavaScript code to determine how much gauges accelerate by relative to
 *     reference time.
 * 
 *   JS: Cast Time:
 *   - JavaScript code to determine how much cast time is used for skills/items
 *     with negative speed modifiers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Order Change Effects Settings
 * ============================================================================
 * 
 * Whenever the turn order a battler is changed by a CTB Order notetag, play
 * these effects on the target battler. These effects do not play if the order
 * was changed due to speed changes and only through the specific notetags.
 *
 * ---
 *
 * Delay Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is delayed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is delayed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is delayed.
 *
 * ---
 *
 * Delay Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is delayed.
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
 * Rush Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is rushed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is rushed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is rushed.
 *
 * ---
 *
 * Rush Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is rushed.
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
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System CTB. These adjust how the
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
 *   Total Horizontal:
 *   - How many slots do you want to display for top and bottom Turn Order
 *     Display positions?
 * 
 *   Total Vertical:
 *   - How many slots do you want to display for left and right Turn Order
 *     Display positions?
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
 * Version 1.21: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.20: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the CTB Turn Order faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.19: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 * 
 * Version 1.18: June 2, 2022
 * * Bug Fixes!
 * ** Notetag effect for <CTB After Speed: x%> should now be working properly.
 *    Fix made by Olivia.
 * ** Notetag effect for <JS CTB After Speed> should now be working properly.
 *    Fix made by Olivia.
 * 
 * Version 1.17: May 2, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: April 28, 2022
 * * Feature Update!
 * ** Added update for CTB-specific idle time to allow a more consistent turn
 *    end processing for actors and enemies with higher than normal AGI values.
 *    Update made by Olivia.
 * 
 * Version 1.15: April 21, 2022
 * * Bug Fixes!
 * ** The endless softlock has been fixed! Much thanks to AndyL for providing a
 *    project that can easily replicate it! Fix made by Yanfly.
 * * Feature Update!
 * ** Slightly more accurate turn order forecasting. However, there is only so
 *    much I can do due to JavaScript's "accuracy" with decimal values. Update
 *    made by Yanfly.
 * 
 * Version 1.14: March 31, 2022
 * * Feature Update!
 * ** Updated anti-softlock check at 180 frames (3 seconds) to automatically
 *    clear any battle states to see if they're the cause of the hangup.
 * ** Updated anti-softlock check at 300 frames (5 seconds) to automatically
 *    clear all states to see if they're the cause of the hangup.
 * ** Updated anti-softlock check at 600 frames (10 seconds) to automatically
 *    abort the battle to salvage the game from freezing.
 * 
 * Version 1.13: March 3, 2022
 * * Feature Update!
 * ** Reserved common events for non-action sequence skills now function
 *    separately from one another when used by a battler with Action Times+.
 *    Update made by Olivia.
 * 
 * Version 1.12: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.10: June 18, 2021
 * * Bug Fixes!
 * ** Fixed turn order icon reappearing for a dying battler. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > Mechanics > General > Device Friendly
 * **** Make the calculations more device friendly? Or make it for desktop at
 *      full strength?
 * 
 * Version 1.09: June 11, 2021
 * * Bug Fixes!
 * ** Plugin Command: "Enemy: Change CTB Turn Order Face" should now properly
 *    change to the correct face index. Fix made by Arisu.
 * 
 * Version 1.08: April 23, 2021
 * * Feature Update!
 * ** When using 100% for After Speed notetag, no other battler is able to
 *    interrupt the action. Update made by Olivia.
 * 
 * Version 1.07: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.06: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * ** Added in a built-in anti-softlock check.
 * 
 * Version 1.05: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Optimization Update!
 * ** Uses less resources for turn order display.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change CTB Turn Order Face
 * **** Changes the faces used for the specific actor(s) on the CTB Turn Order.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Turn Order icons no longer stay invisible after rotating out completely.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <CTB Turn Order Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Action times + should no longer freeze the game. Fix made by Yanfly.
 * ** Actors and enemies without actions will no longer softlock the game.
 *    Fix made by Yanfly.
 * ** Auto-battle during CTB should no longer lock the game! Fix by Yanfly.
 * ** Enemies without any actions should no longer cause endless loops.
 *    Fix made by Yanfly.
 * ** SV_Actor graphics on the Turn Order display are now centered.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release: October 19, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderActorIcon
 * @text Actor: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the CTB Turn Order.
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
 * @command CtbTurnOrderActorFace
 * @text Actor: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the CTB Turn Order.
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
 * @command CtbTurnOrderClearActorGraphic
 * @text Actor: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the actor(s).
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
 * @command CtbTurnOrderEnemyIcon
 * @text Enemy: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
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
 * @command CtbTurnOrderEnemyFace
 * @text Enemy: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
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
 * @command CtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the enemy(ies).
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
 * @text System: CTB Turn Order Visibility
 * @desc Determine the visibility of the CTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the CTB Turn Order Display.
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
 * @param BattleSystemCTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings used for Battle System CTB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.50","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Effect:struct
 * @text Order Change Effects
 * @type struct<Effect>
 * @desc Effects to play when the Turn Order is changed in CTB.
 * @default {"Delay":"","DelayAnimation":"","DelayAnimationID:num":"54","DelayMirror:eval":"false","DelayMute:eval":"false","DelayPopups":"","DelayPopupText:str":"DELAY","DelayTextColor:str":"25","DelayFlashColor:eval":"[255, 0, 0, 160]","DelayFlashDuration:num":"60","Rush":"","RushAnimation":"","RushAnimationID:num":"51","RushMirror:eval":"false","RushMute:eval":"false","RushPopups":"","RushPopupText:str":"RUSH","RushTextColor:str":"24","RushFlashColor:eval":"[0, 255, 0, 160]","RushFlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System CTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","TotalHorzSprites:num":"16","TotalVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 *
 * @param DeviceFriendly:eval
 * @text Device Friendly
 * @parent General
 * @type boolean
 * @on Device Friendly
 * @off For Desktops
 * @desc Make the calculations more device friendly?
 * Or make it for desktop at full strength?
 * @default false
 * 
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Speed
 * @parent JavaScript
 * @desc JavaScript code to determine how much speed to give
 * each battler at the start of battle.
 * @default Math.random() * 0.5
 *
 * @param TpbSpeedCalcJS:func
 * @text JS: Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much speed a battler has.
 * @default "// Declare Constants\nconst user = this;\n\n// Process Calculation\nlet speed = Math.sqrt(user.agi) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param TpbBaseSpeedCalcJS:func
 * @text JS: Base Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much base speed a battler has.
 * @default "// Declare Constants\nconst user = this;\nconst baseAgility = user.paramBasePlus(6);\n\n// Process Calculation\nlet speed = Math.sqrt(baseAgility) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param BattlerRelativeSpeedJS:func
 * @text JS: Relative Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine what is the relative speed of a battler.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbSpeed()\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\n\n// Process Calculation\nlet relativeSpeed = speed / partyBaseSpeed;\n\n// Return Value\nreturn relativeSpeed;"
 * 
 * @param TpbAccelerationJS:func
 * @text JS: Acceleration
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much gauges accelerate by relative to reference time.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbRelativeSpeed();\nconst referenceTime = $gameParty.tpbReferenceTime();\n\n// Process Calculation\nlet acceleration = speed / referenceTime;\n\n// Return Value\nreturn acceleration;"
 * 
 * @param TpbCastTimeJS:func
 * @text JS: Cast Time
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much cast time is used for skills/items with negative speed modifiers.
 * @default "// Declare Constants\nconst user = this;\nconst actions = user._actions.filter(action => action.isValid());\nconst items = actions.map(action => action.item());\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\n\n// Process Calculation\nlet time = Math.sqrt(delay) / user.tpbSpeed();\n\n// Return Value\nreturn time;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Effect:
 *
 * @param Delay
 * @text Delay Turn Order
 * 
 * @param DelayAnimation
 * @text Animation
 * @parent Delay
 *
 * @param DelayAnimationID:num
 * @text Animation ID
 * @parent DelayAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is delayed.
 * @default 54
 *
 * @param DelayMirror:eval
 * @text Mirror Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayMute:eval
 * @text Mute Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayPopups
 * @text Popups
 * @parent Delay
 *
 * @param DelayPopupText:str
 * @text Text
 * @parent DelayPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is delayed.
 * @default DELAY
 *
 * @param DelayTextColor:str
 * @text Text Color
 * @parent DelayPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param DelayFlashColor:eval
 * @text Flash Color
 * @parent DelayPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DelayFlashDuration:num
 * @text Flash Duration
 * @parent DelayPopups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Rush
 * @text Rush Turn Order
 * 
 * @param RushAnimation
 * @text Animation
 * @parent Rush
 *
 * @param RushAnimationID:num
 * @text Animation ID
 * @parent RushAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is rushed.
 * @default 51
 *
 * @param RushMirror:eval
 * @text Mirror Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushMute:eval
 * @text Mute Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushPopups
 * @text Popups
 * @parent Rush
 *
 * @param RushPopupText:str
 * @text Text
 * @parent RushPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is rushed.
 * @default RUSH
 *
 * @param RushTextColor:str
 * @text Text Color
 * @parent RushPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param RushFlashColor:eval
 * @text Flash Color
 * @parent RushPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param RushFlashDuration:num
 * @text Flash Duration
 * @parent RushPopups
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
 * @param TotalHorzSprites:num
 * @text Total Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param TotalVertSprites:num
 * @text Total Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for left and
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

const _0x293f23=_0x4e98;(function(_0x2f34b6,_0x45bd49){const _0x46c5d7=_0x4e98,_0x2a32fc=_0x2f34b6();while(!![]){try{const _0x5467aa=-parseInt(_0x46c5d7(0x165))/0x1*(-parseInt(_0x46c5d7(0xfc))/0x2)+parseInt(_0x46c5d7(0x183))/0x3+parseInt(_0x46c5d7(0xcc))/0x4*(-parseInt(_0x46c5d7(0xc3))/0x5)+parseInt(_0x46c5d7(0x1aa))/0x6+parseInt(_0x46c5d7(0x1e8))/0x7*(-parseInt(_0x46c5d7(0x118))/0x8)+-parseInt(_0x46c5d7(0xa8))/0x9+parseInt(_0x46c5d7(0xff))/0xa*(-parseInt(_0x46c5d7(0x279))/0xb);if(_0x5467aa===_0x45bd49)break;else _0x2a32fc['push'](_0x2a32fc['shift']());}catch(_0x248641){_0x2a32fc['push'](_0x2a32fc['shift']());}}}(_0x1cd3,0x7fa86));var label='BattleSystemCTB',tier=tier||0x0,dependencies=[_0x293f23(0x107),_0x293f23(0xc6)],pluginData=$plugins[_0x293f23(0x150)](function(_0x415393){const _0x14bd8d=_0x293f23;return _0x415393[_0x14bd8d(0x261)]&&_0x415393[_0x14bd8d(0x132)][_0x14bd8d(0x1f1)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x293f23(0xdc)]||{},VisuMZ[_0x293f23(0x181)]=function(_0x49ed78,_0x3922f2){const _0x9595df=_0x293f23;for(const _0x42caa5 in _0x3922f2){if(_0x9595df(0x292)!==_0x9595df(0x292))_0x42e308[_0x9595df(0xd1)][_0x9595df(0x185)][_0x9595df(0x122)](this,_0xe91cc5);else{if(_0x42caa5[_0x9595df(0x11f)](/(.*):(.*)/i)){const _0xd496ef=String(RegExp['$1']),_0x37a128=String(RegExp['$2'])[_0x9595df(0x2a2)]()['trim']();let _0x17bd92,_0x34548d,_0x2d96ef;switch(_0x37a128){case'NUM':_0x17bd92=_0x3922f2[_0x42caa5]!==''?Number(_0x3922f2[_0x42caa5]):0x0;break;case _0x9595df(0x2a9):_0x34548d=_0x3922f2[_0x42caa5]!==''?JSON[_0x9595df(0x262)](_0x3922f2[_0x42caa5]):[],_0x17bd92=_0x34548d[_0x9595df(0x191)](_0x35d847=>Number(_0x35d847));break;case _0x9595df(0xd7):_0x17bd92=_0x3922f2[_0x42caa5]!==''?eval(_0x3922f2[_0x42caa5]):null;break;case _0x9595df(0x25a):_0x34548d=_0x3922f2[_0x42caa5]!==''?JSON['parse'](_0x3922f2[_0x42caa5]):[],_0x17bd92=_0x34548d['map'](_0x66da09=>eval(_0x66da09));break;case _0x9595df(0x1f2):_0x17bd92=_0x3922f2[_0x42caa5]!==''?JSON['parse'](_0x3922f2[_0x42caa5]):'';break;case'ARRAYJSON':_0x34548d=_0x3922f2[_0x42caa5]!==''?JSON['parse'](_0x3922f2[_0x42caa5]):[],_0x17bd92=_0x34548d['map'](_0x17b605=>JSON[_0x9595df(0x262)](_0x17b605));break;case _0x9595df(0xe6):_0x17bd92=_0x3922f2[_0x42caa5]!==''?new Function(JSON[_0x9595df(0x262)](_0x3922f2[_0x42caa5])):new Function(_0x9595df(0x1d4));break;case _0x9595df(0xbc):_0x34548d=_0x3922f2[_0x42caa5]!==''?JSON[_0x9595df(0x262)](_0x3922f2[_0x42caa5]):[],_0x17bd92=_0x34548d['map'](_0x4f586e=>new Function(JSON[_0x9595df(0x262)](_0x4f586e)));break;case _0x9595df(0x101):_0x17bd92=_0x3922f2[_0x42caa5]!==''?String(_0x3922f2[_0x42caa5]):'';break;case'ARRAYSTR':_0x34548d=_0x3922f2[_0x42caa5]!==''?JSON[_0x9595df(0x262)](_0x3922f2[_0x42caa5]):[],_0x17bd92=_0x34548d[_0x9595df(0x191)](_0x160db6=>String(_0x160db6));break;case _0x9595df(0x160):_0x2d96ef=_0x3922f2[_0x42caa5]!==''?JSON[_0x9595df(0x262)](_0x3922f2[_0x42caa5]):{},_0x17bd92=VisuMZ['ConvertParams']({},_0x2d96ef);break;case _0x9595df(0x223):_0x34548d=_0x3922f2[_0x42caa5]!==''?JSON['parse'](_0x3922f2[_0x42caa5]):[],_0x17bd92=_0x34548d[_0x9595df(0x191)](_0x4d53fc=>VisuMZ[_0x9595df(0x181)]({},JSON[_0x9595df(0x262)](_0x4d53fc)));break;default:continue;}_0x49ed78[_0xd496ef]=_0x17bd92;}}}return _0x49ed78;},(_0x398d81=>{const _0x22e613=_0x293f23,_0x4281a1=_0x398d81[_0x22e613(0x29b)];for(const _0xab0a7 of dependencies){if(!Imported[_0xab0a7]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x22e613(0x138)](_0x4281a1,_0xab0a7)),SceneManager[_0x22e613(0xcd)]();break;}}const _0x79403e=_0x398d81[_0x22e613(0x132)];if(_0x79403e[_0x22e613(0x11f)](/\[Version[ ](.*?)\]/i)){if(_0x22e613(0x18f)===_0x22e613(0x18f)){const _0x24d701=Number(RegExp['$1']);_0x24d701!==VisuMZ[label][_0x22e613(0x1bc)]&&(alert(_0x22e613(0x108)['format'](_0x4281a1,_0x24d701)),SceneManager[_0x22e613(0xcd)]());}else return this[_0x22e613(0x296)]();}if(_0x79403e['match'](/\[Tier[ ](\d+)\]/i)){const _0x1e421f=Number(RegExp['$1']);_0x1e421f<tier?(alert(_0x22e613(0x105)['format'](_0x4281a1,_0x1e421f,tier)),SceneManager['exit']()):tier=Math[_0x22e613(0x11e)](_0x1e421f,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x398d81[_0x22e613(0x26e)]);})(pluginData),PluginManager[_0x293f23(0x290)](pluginData[_0x293f23(0x29b)],_0x293f23(0x18c),_0x3040ef=>{const _0xea72a6=_0x293f23;VisuMZ[_0xea72a6(0x181)](_0x3040ef,_0x3040ef);const _0x5dfc77=_0x3040ef[_0xea72a6(0x9f)],_0x51956e=_0x3040ef[_0xea72a6(0x26d)];for(const _0x2f0681 of _0x5dfc77){if(_0xea72a6(0xc4)===_0xea72a6(0xe7)){const _0x434ed0=_0x102910(_0x36dea7['$1']);_0x434ed0<_0x355dac?(_0x5d3438(_0xea72a6(0x105)[_0xea72a6(0x138)](_0x4935db,_0x434ed0,_0x5c5dca)),_0x63d05b['exit']()):_0x45833a=_0x2195d5[_0xea72a6(0x11e)](_0x434ed0,_0x5d4918);}else{const _0x4eb134=$gameActors[_0xea72a6(0x13c)](_0x2f0681);if(!_0x4eb134)continue;_0x4eb134['_ctbTurnOrderGraphicType']=_0xea72a6(0x9d),_0x4eb134[_0xea72a6(0x127)]=_0x51956e;}}}),PluginManager['registerCommand'](pluginData['name'],_0x293f23(0xde),_0x5df366=>{const _0x1795f2=_0x293f23;VisuMZ[_0x1795f2(0x181)](_0x5df366,_0x5df366);const _0x44487f=_0x5df366[_0x1795f2(0x9f)],_0x1849cc=_0x5df366['FaceName'],_0x3d70f8=_0x5df366['FaceIndex'];for(const _0x26af9c of _0x44487f){const _0x2eb1eb=$gameActors[_0x1795f2(0x13c)](_0x26af9c);if(!_0x2eb1eb)continue;_0x2eb1eb[_0x1795f2(0x1fa)]=_0x1795f2(0x124),_0x2eb1eb[_0x1795f2(0x141)]=_0x1849cc,_0x2eb1eb[_0x1795f2(0x17b)]=_0x3d70f8;}}),PluginManager[_0x293f23(0x290)](pluginData['name'],'CtbTurnOrderClearActorGraphic',_0x1a988d=>{const _0x17edf6=_0x293f23;VisuMZ[_0x17edf6(0x181)](_0x1a988d,_0x1a988d);const _0x4c16fd=_0x1a988d['Actors'];for(const _0x5e8b17 of _0x4c16fd){const _0xa0b98f=$gameActors['actor'](_0x5e8b17);if(!_0xa0b98f)continue;_0xa0b98f[_0x17edf6(0x25e)]();}}),PluginManager[_0x293f23(0x290)](pluginData['name'],_0x293f23(0x1dc),_0x40f987=>{const _0x28e636=_0x293f23;VisuMZ['ConvertParams'](_0x40f987,_0x40f987);const _0x2a2a79=_0x40f987[_0x28e636(0xfe)],_0x988b6f=_0x40f987[_0x28e636(0x26d)];for(const _0x3b3d08 of _0x2a2a79){if(_0x28e636(0x158)===_0x28e636(0x158)){const _0x2238b0=$gameTroop[_0x28e636(0xb7)]()[_0x3b3d08];if(!_0x2238b0)continue;_0x2238b0[_0x28e636(0x1fa)]='icon',_0x2238b0[_0x28e636(0x127)]=_0x988b6f;}else{const _0x377528=this[_0x28e636(0x13c)]()[_0x28e636(0x27a)];if(_0x377528[_0x28e636(0x11f)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x472295(_0x2f0ebd['$1']);return this[_0x28e636(0xce)]();}}}),PluginManager[_0x293f23(0x290)](pluginData[_0x293f23(0x29b)],_0x293f23(0x17c),_0x22632a=>{const _0x5aa0fa=_0x293f23;VisuMZ[_0x5aa0fa(0x181)](_0x22632a,_0x22632a);const _0x8a9f12=_0x22632a[_0x5aa0fa(0xfe)],_0x56ce3d=_0x22632a[_0x5aa0fa(0x152)],_0x1ed530=_0x22632a[_0x5aa0fa(0xa6)];for(const _0x38dde1 of _0x8a9f12){if('mFmRH'!=='mFmRH'){if(!this['_letterSprite'])return;const _0xef1889=this[_0x5aa0fa(0x26c)]();if(!_0xef1889)return;if(this[_0x5aa0fa(0x10c)]===_0xef1889[_0x5aa0fa(0x10c)]&&this['_plural']===_0xef1889[_0x5aa0fa(0xcf)])return;this['_letter']=_0xef1889[_0x5aa0fa(0x10c)],this[_0x5aa0fa(0xcf)]=_0xef1889['_plural'];const _0x378fdd=_0x419fbc[_0x5aa0fa(0xdc)],_0x517393=this[_0x5aa0fa(0xef)](),_0x1110e2=this[_0x5aa0fa(0x123)](),_0x126e66=this[_0x5aa0fa(0xee)](),_0x19b374=this[_0x5aa0fa(0x25d)][_0x5aa0fa(0x199)];_0x19b374['clear']();if(!this['_plural'])return;_0x19b374[_0x5aa0fa(0x28c)]=_0x378fdd['EnemyBattlerFontFace']||_0x22b0b3['mainFontFace'](),_0x19b374[_0x5aa0fa(0x1b7)]=_0x378fdd[_0x5aa0fa(0x20c)]||0x10,_0x517393?_0x19b374[_0x5aa0fa(0xba)](this['_letter'][_0x5aa0fa(0xad)](),0x0,_0x126e66/0x2,_0x1110e2,_0x126e66/0x2,_0x5aa0fa(0x1fc)):_0x19b374[_0x5aa0fa(0xba)](this[_0x5aa0fa(0x10c)]['trim'](),0x0,0x2,_0x1110e2-0x8,_0x126e66-0x4,'right');}else{const _0x2db679=$gameTroop['members']()[_0x38dde1];if(!_0x2db679)continue;_0x2db679['_ctbTurnOrderGraphicType']=_0x5aa0fa(0x124),_0x2db679[_0x5aa0fa(0x141)]=_0x56ce3d,_0x2db679[_0x5aa0fa(0x17b)]=_0x1ed530;}}}),PluginManager[_0x293f23(0x290)](pluginData[_0x293f23(0x29b)],_0x293f23(0x2a8),_0x3994cf=>{const _0x38a758=_0x293f23;VisuMZ['ConvertParams'](_0x3994cf,_0x3994cf);const _0x5f3ad9=_0x3994cf['Enemies'];for(const _0x36ae4e of _0x5f3ad9){const _0xf9c930=$gameTroop[_0x38a758(0xb7)]()[_0x36ae4e];if(!_0xf9c930)continue;_0xf9c930[_0x38a758(0x25e)]();}}),PluginManager['registerCommand'](pluginData[_0x293f23(0x29b)],_0x293f23(0x23b),_0x1fff59=>{const _0x111eea=_0x293f23;VisuMZ['ConvertParams'](_0x1fff59,_0x1fff59);const _0x12ec8d=_0x1fff59[_0x111eea(0x28a)];$gameSystem[_0x111eea(0x213)](_0x12ec8d);}),VisuMZ['BattleSystemCTB']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x293f23(0x1a9)][_0x293f23(0x216)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x515467=_0x293f23;this[_0x515467(0x1af)](),VisuMZ[_0x515467(0xd1)][_0x515467(0xaf)][_0x515467(0x122)](this),this['process_VisuMZ_BattleSystemCTB_JS_Notetags']();},VisuMZ[_0x293f23(0xd1)][_0x293f23(0xf6)]={},Scene_Boot['prototype'][_0x293f23(0x1af)]=function(){const _0xec5ac5=_0x293f23,_0x3eebb7=VisuMZ[_0xec5ac5(0xd1)][_0xec5ac5(0xf6)],_0x2d86aa=_0xec5ac5(0x2a0),_0x54cb76=['Charge','Cast',_0xec5ac5(0x143)];for(const _0x554530 of _0x54cb76){if('vEQOF'===_0xec5ac5(0x19c))return this[_0xec5ac5(0x23a)]()?this[_0xec5ac5(0x13f)]/this[_0xec5ac5(0x26b)]():0x0;else{const _0x2b32a9=_0x2d86aa[_0xec5ac5(0x138)](_0x554530[_0xec5ac5(0x2a2)]()[_0xec5ac5(0xad)](),_0xec5ac5(0x1f7),_0xec5ac5(0xd2)),_0x4a3d53=new RegExp(_0x2b32a9,'i');VisuMZ[_0xec5ac5(0xd1)][_0xec5ac5(0xf6)][_0x554530]=_0x4a3d53;}}VisuMZ[_0xec5ac5(0xd1)][_0xec5ac5(0xf6)][_0xec5ac5(0x22a)]=/<JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>\s*([\s\S]*)\s*<\/JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>/i;},Scene_Boot[_0x293f23(0x1a9)][_0x293f23(0x1e2)]=function(){const _0x562d92=_0x293f23;if(VisuMZ['ParseAllNotetags'])return;const _0x3cb74e=$dataSkills[_0x562d92(0x1d8)]($dataItems);for(const _0x2da9bf of _0x3cb74e){if(!_0x2da9bf)continue;VisuMZ['BattleSystemCTB']['Parse_Notetags_CreateJS'](_0x2da9bf);}},VisuMZ['BattleSystemCTB'][_0x293f23(0x131)]=VisuMZ[_0x293f23(0x131)],VisuMZ[_0x293f23(0x131)]=function(_0x1ca215){const _0x3e7a7f=_0x293f23;VisuMZ['BattleSystemCTB'][_0x3e7a7f(0x131)]['call'](this,_0x1ca215),VisuMZ[_0x3e7a7f(0xd1)][_0x3e7a7f(0x154)](_0x1ca215);},VisuMZ['BattleSystemCTB'][_0x293f23(0x103)]=VisuMZ[_0x293f23(0x103)],VisuMZ[_0x293f23(0x103)]=function(_0x1ff688){const _0x116725=_0x293f23;VisuMZ[_0x116725(0xd1)][_0x116725(0x103)][_0x116725(0x122)](this,_0x1ff688),VisuMZ[_0x116725(0xd1)][_0x116725(0x154)](_0x1ff688);},VisuMZ[_0x293f23(0xd1)]['Parse_Notetags_CreateJS']=function(_0x30d4e5){const _0x291024=_0x293f23,_0x23151c=[_0x291024(0xb8),_0x291024(0x2ae),_0x291024(0x143)];for(const _0x15ef37 of _0x23151c){VisuMZ[_0x291024(0xd1)][_0x291024(0x120)](_0x30d4e5,_0x15ef37);}VisuMZ[_0x291024(0xd1)][_0x291024(0x114)](_0x30d4e5,_0x291024(0x146));},VisuMZ[_0x293f23(0xd1)]['JS']={},VisuMZ[_0x293f23(0xd1)]['createRateJS']=function(_0x3e72dc,_0x40271b){const _0x4a866f=_0x293f23,_0x471854=_0x3e72dc[_0x4a866f(0x27a)];if(_0x471854[_0x4a866f(0x11f)](VisuMZ[_0x4a866f(0xd1)][_0x4a866f(0xf6)][_0x40271b])){const _0x36768f=String(RegExp['$1']),_0x4b1390=_0x4a866f(0x270)[_0x4a866f(0x138)](_0x36768f,_0x40271b),_0x1bc8ae=VisuMZ[_0x4a866f(0xd1)][_0x4a866f(0xd0)](_0x3e72dc,_0x40271b);VisuMZ['BattleSystemCTB']['JS'][_0x1bc8ae]=new Function(_0x4b1390);}},VisuMZ[_0x293f23(0xd1)][_0x293f23(0x114)]=function(_0x57f8f9,_0x29eaa3){const _0x2172f4=_0x293f23,_0x9f799b=_0x57f8f9['note'];if(_0x9f799b['match'](VisuMZ[_0x2172f4(0xd1)][_0x2172f4(0xf6)]['OrderJS'])){if(_0x2172f4(0x15d)==='hlphl'){const _0x37f7b9=String(RegExp['$1']),_0x17b470=_0x2172f4(0x12e)[_0x2172f4(0x138)](_0x37f7b9,_0x29eaa3),_0x13957b=VisuMZ[_0x2172f4(0xd1)][_0x2172f4(0xd0)](_0x57f8f9,_0x29eaa3);VisuMZ[_0x2172f4(0xd1)]['JS'][_0x13957b]=new Function(_0x17b470);}else{const _0x30c5be=_0x32ec49[_0x2172f4(0xd1)]['Settings'][_0x2172f4(0x16e)],_0x355068=_0x52e19b>0x0?_0x2172f4(0x18a):'Rush';if(_0x30c5be[_0x2172f4(0x1fd)[_0x2172f4(0x138)](_0x355068)]){const _0x386c08=_0x30c5be['%1AnimationID'['format'](_0x355068)],_0x57a674=_0x30c5be[_0x2172f4(0x195)[_0x2172f4(0x138)](_0x355068)],_0x41c19b=_0x30c5be[_0x2172f4(0x1b1)[_0x2172f4(0x138)](_0x355068)];_0x32da4e[_0x2172f4(0x1ed)]([this],_0x386c08,_0x57a674,_0x41c19b);}if(this[_0x2172f4(0x26c)]()&&_0x30c5be[_0x2172f4(0x1d1)['format'](_0x355068)][_0x2172f4(0x1a6)]>0x0){const _0x2a83b9=_0x30c5be[_0x2172f4(0x1d1)[_0x2172f4(0x138)](_0x355068)],_0x157771={'textColor':_0x5c0729['getColor'](_0x30c5be[_0x2172f4(0x231)['format'](_0x355068)]),'flashColor':_0x30c5be[_0x2172f4(0xa7)[_0x2172f4(0x138)](_0x355068)],'flashDuration':_0x30c5be['%1FlashDuration'[_0x2172f4(0x138)](_0x355068)]};this[_0x2172f4(0x215)](_0x2a83b9,_0x157771);}}}},VisuMZ[_0x293f23(0xd1)][_0x293f23(0xd0)]=function(_0x5c5215,_0x5be1c1){const _0x131b6d=_0x293f23;if(VisuMZ['createKeyJS'])return VisuMZ[_0x131b6d(0xd0)](_0x5c5215,_0x5be1c1);let _0x220d54='';if($dataActors[_0x131b6d(0x1f1)](_0x5c5215))_0x220d54='Actor-%1-%2'[_0x131b6d(0x138)](_0x5c5215['id'],_0x5be1c1);if($dataClasses[_0x131b6d(0x1f1)](_0x5c5215))_0x220d54='Class-%1-%2'[_0x131b6d(0x138)](_0x5c5215['id'],_0x5be1c1);if($dataSkills[_0x131b6d(0x1f1)](_0x5c5215))_0x220d54='Skill-%1-%2'['format'](_0x5c5215['id'],_0x5be1c1);if($dataItems['includes'](_0x5c5215))_0x220d54=_0x131b6d(0xc7)[_0x131b6d(0x138)](_0x5c5215['id'],_0x5be1c1);if($dataWeapons['includes'](_0x5c5215))_0x220d54=_0x131b6d(0x2af)[_0x131b6d(0x138)](_0x5c5215['id'],_0x5be1c1);if($dataArmors[_0x131b6d(0x1f1)](_0x5c5215))_0x220d54=_0x131b6d(0xa2)[_0x131b6d(0x138)](_0x5c5215['id'],_0x5be1c1);if($dataEnemies[_0x131b6d(0x1f1)](_0x5c5215))_0x220d54=_0x131b6d(0x19a)[_0x131b6d(0x138)](_0x5c5215['id'],_0x5be1c1);if($dataStates[_0x131b6d(0x1f1)](_0x5c5215))_0x220d54=_0x131b6d(0x190)[_0x131b6d(0x138)](_0x5c5215['id'],_0x5be1c1);return _0x220d54;},ImageManager[_0x293f23(0x126)]=ImageManager[_0x293f23(0x126)]||0x9,ImageManager[_0x293f23(0x22d)]=ImageManager[_0x293f23(0x22d)]||0x6,VisuMZ[_0x293f23(0xd1)][_0x293f23(0x1c8)]=BattleManager[_0x293f23(0x12b)],BattleManager[_0x293f23(0x12b)]=function(){const _0x26ce11=_0x293f23;if(this[_0x26ce11(0x1ad)]())return'CTB';return VisuMZ[_0x26ce11(0xd1)][_0x26ce11(0x1c8)][_0x26ce11(0x122)](this);},BattleManager[_0x293f23(0x1ad)]=function(){const _0x2da312=_0x293f23;return $gameSystem[_0x2da312(0x135)]()==='CTB';},VisuMZ[_0x293f23(0xd1)][_0x293f23(0x25b)]=BattleManager[_0x293f23(0x274)],BattleManager[_0x293f23(0x274)]=function(){const _0x2b24dd=_0x293f23;if(this[_0x2b24dd(0x1ad)]())return!![];return VisuMZ[_0x2b24dd(0xd1)][_0x2b24dd(0x25b)]['call'](this);},VisuMZ['BattleSystemCTB'][_0x293f23(0x1f6)]=BattleManager[_0x293f23(0x15b)],BattleManager[_0x293f23(0x15b)]=function(){const _0x47d21b=_0x293f23;if(this['isCTB']())return![];return VisuMZ[_0x47d21b(0xd1)]['BattleManager_isActiveTpb'][_0x47d21b(0x122)](this);},VisuMZ[_0x293f23(0xd1)][_0x293f23(0x185)]=BattleManager[_0x293f23(0xf4)],BattleManager[_0x293f23(0xf4)]=function(_0x1c0937){const _0x7ca317=_0x293f23;this[_0x7ca317(0x1ad)]()?this[_0x7ca317(0x194)](_0x1c0937):VisuMZ[_0x7ca317(0xd1)][_0x7ca317(0x185)][_0x7ca317(0x122)](this,_0x1c0937);},BattleManager['updateTurnCTB']=function(_0x38ea1e){const _0x276e53=_0x293f23;return VisuMZ[_0x276e53(0xd1)]['BattleManager_updateTurn']['call'](this,_0x38ea1e);},VisuMZ[_0x293f23(0xd1)][_0x293f23(0x96)]=BattleManager[_0x293f23(0x1a1)],BattleManager[_0x293f23(0x1a1)]=function(){const _0x5988e5=_0x293f23;this['isCTB']()?this['processTurnCTB']():VisuMZ['BattleSystemCTB'][_0x5988e5(0x96)][_0x5988e5(0x122)](this);},BattleManager['processTurnCTB']=function(){const _0xf25cd4=_0x293f23,_0x203658=this[_0xf25cd4(0x251)],_0x3b07bd=_0x203658['currentAction']();_0x3b07bd?(_0x3b07bd[_0xf25cd4(0x19e)](),_0x3b07bd[_0xf25cd4(0xab)]()&&(_0xf25cd4(0x244)===_0xf25cd4(0x1ba)?_0x4f5cf9[_0xf25cd4(0x1f4)](_0x320a47(_0x2f7d4d['$1'])*0.01):this[_0xf25cd4(0x235)]()),_0x203658['removeCurrentAction']()):_0xf25cd4(0x1b9)===_0xf25cd4(0x1b9)?(_0x203658[_0xf25cd4(0x22e)](0x0),this['endAction'](),this[_0xf25cd4(0x251)]=null):this[_0xf25cd4(0xf5)]();},BattleManager['isAnyBattlerReadyCTB']=function(){const _0x10fc5f=_0x293f23;if(this[_0x10fc5f(0x251)])return!![];if(this[_0x10fc5f(0x22f)]!==_0x10fc5f(0x1e4))return!![];if(this[_0x10fc5f(0x10d)])return![];const _0x1fb632=this[_0x10fc5f(0x217)]()[_0x10fc5f(0x150)](_0x1ee35a=>_0x1ee35a&&_0x1ee35a[_0x10fc5f(0x1d3)]());return _0x1fb632[_0x10fc5f(0x134)](_0x1c7472=>_0x1c7472[_0x10fc5f(0xeb)]());},Game_Battler[_0x293f23(0x1a9)][_0x293f23(0xeb)]=function(){const _0x208474=_0x293f23;if(this[_0x208474(0x299)]())return!![];if(this[_0x208474(0xea)]())return!![];if(this[_0x208474(0x9e)]())return!![];return![];},BattleManager[_0x293f23(0x259)]=function(){const _0x109f79=_0x293f23;let _0x3f88b4=VisuMZ[_0x109f79(0xd1)][_0x109f79(0xdc)]['Mechanics'][_0x109f79(0x1d0)]?0x1e:0xa;if(this[_0x109f79(0xb5)]()&&this['otherCtbChecksPassed']())this[_0x109f79(0x29f)]=this[_0x109f79(0x29f)]||0x0,this[_0x109f79(0x29f)]++,this[_0x109f79(0x29f)]>=_0x3f88b4&&(_0x109f79(0x29d)!==_0x109f79(0x21a)?this[_0x109f79(0x11d)]():(_0x4b6741[_0x109f79(0x1a9)]['update'][_0x109f79(0x122)](this),this[_0x109f79(0x1c1)](),this[_0x109f79(0x214)](),this[_0x109f79(0x2a4)](),this['updateOpacity'](),this[_0x109f79(0x130)](),this[_0x109f79(0xf1)](),this['updateLetter'](),this['updateSelectionEffect']()));else{if('RLckd'===_0x109f79(0x15e))return'icon';else this['_anti_CTB_SoftlockCount']=0x0;}},BattleManager[_0x293f23(0xd6)]=function(){const _0x1c4a96=_0x293f23;if(this[_0x1c4a96(0x251)])return![];if(this[_0x1c4a96(0x22f)]!==_0x1c4a96(0x1e4))return![];if(this[_0x1c4a96(0x1df)]())return![];return!![];},BattleManager[_0x293f23(0x11d)]=function(){const _0x11079d=_0x293f23;$gameTemp[_0x11079d(0x276)]()&&this[_0x11079d(0x29f)]>=0x14&&(_0x11079d(0x1c3)===_0x11079d(0x1c3)?console[_0x11079d(0x163)](_0x11079d(0xc0),this[_0x11079d(0x29f)]):_0xa5c54[_0x11079d(0xd1)][_0x11079d(0x254)][_0x11079d(0x122)](this,_0x123ce4));this[_0x11079d(0x251)]=null,this[_0x11079d(0x22f)]=_0x11079d(0x1e4),this[_0x11079d(0x2a3)]=![],this[_0x11079d(0x28b)]=!![];for(const _0x67531b of this[_0x11079d(0x217)]()){if(_0x11079d(0x14e)==='pYJFw'){const _0xecc66e=this[_0x11079d(0x26c)]();if(!_0xecc66e)return;if(!_0xecc66e[_0x11079d(0x113)]())return;if(this[_0x11079d(0x2ab)]===_0xecc66e[_0x11079d(0x16f)]())return;this[_0x11079d(0x2ab)]=_0xecc66e['battlerHue'](),this[_0x11079d(0x1a5)]['setHue'](_0xecc66e['hasSvBattler']()?0x0:this[_0x11079d(0x2ab)]);}else{if(!_0x67531b)continue;if(_0x67531b[_0x11079d(0x25f)]()){_0x67531b[_0x11079d(0x24d)](_0x11079d(0x211)),_0x67531b[_0x11079d(0x212)]='charging';const _0x4c0965=_0x67531b['_tpbTurnCount'],_0x1e90fb=_0x67531b[_0x11079d(0x9a)]||0x0;_0x67531b[_0x11079d(0x1ef)](![]),_0x67531b[_0x11079d(0x208)]=_0x4c0965,_0x67531b[_0x11079d(0x9a)]=Math[_0x11079d(0x253)](_0x1e90fb,0.99),_0x67531b[_0x11079d(0x225)]();}}}if(this[_0x11079d(0x29f)]===0xb4){if('ufQlK'!=='fVtvr')$gameParty[_0x11079d(0xdb)](),$gameParty[_0x11079d(0xdb)][_0x11079d(0x122)]($gameTroop);else{if(!this[_0x11079d(0x1ad)]())return;const _0x1a4d91=_0x59d881[_0x11079d(0x23d)][_0x11079d(0x1e0)];if(!_0x1a4d91)return;_0x1a4d91[_0x11079d(0xca)](_0x1564bc);}}if(this['_anti_CTB_SoftlockCount']===0x12c)for(const _0x5936e3 of this[_0x11079d(0x217)]()){if('nEoEj'===_0x11079d(0x27d)){if(!_0x5936e3)continue;if(_0x5936e3[_0x11079d(0x24c)]())continue;_0x5936e3['clearStates']();}else this[_0x11079d(0xe9)](_0x28f4ce(_0xa61b27['$1']));}this[_0x11079d(0x29f)]>=0x258&&(BattleManager[_0x11079d(0xec)](),$gameTemp[_0x11079d(0x276)]()&&console['log'](_0x11079d(0xb6)));},VisuMZ[_0x293f23(0xd1)]['BattleManager_updateAllTpbBattlers']=BattleManager['updateAllTpbBattlers'],BattleManager['updateAllTpbBattlers']=function(){const _0x1d6065=_0x293f23;this[_0x1d6065(0x1ad)]()?_0x1d6065(0x1c9)===_0x1d6065(0x1c9)?this[_0x1d6065(0x1db)]():_0x1ef866+=0x1:VisuMZ['BattleSystemCTB'][_0x1d6065(0x179)][_0x1d6065(0x122)](this);},BattleManager[_0x293f23(0x1db)]=function(){const _0x46c027=_0x293f23,_0xe132f6=this['allBattleMembers']();_0xe132f6[_0x46c027(0xf0)]((_0x397aee,_0x27c1a9)=>{const _0x79eede=_0x46c027;return _0x397aee[_0x79eede(0x1ca)](0x1)-_0x27c1a9[_0x79eede(0x1ca)](0x1);});for(const _0x182bcd of _0xe132f6){this[_0x46c027(0x203)](_0x182bcd);}},VisuMZ[_0x293f23(0xd1)]['BattleManager_startBattle']=BattleManager[_0x293f23(0x238)],BattleManager[_0x293f23(0x238)]=function(){const _0x47bcee=_0x293f23;VisuMZ[_0x47bcee(0xd1)][_0x47bcee(0x268)][_0x47bcee(0x122)](this),this[_0x47bcee(0x157)](!![]);},VisuMZ[_0x293f23(0xd1)][_0x293f23(0x92)]=BattleManager[_0x293f23(0x1bf)],BattleManager[_0x293f23(0x1bf)]=function(){const _0x2adf2a=_0x293f23;this[_0x2adf2a(0xb3)](),VisuMZ[_0x2adf2a(0xd1)][_0x2adf2a(0x92)]['call'](this),this[_0x2adf2a(0xaa)]();},BattleManager[_0x293f23(0xb3)]=function(){const _0x22685e=_0x293f23;if(!this[_0x22685e(0x1ad)]())return;this[_0x22685e(0x251)]&&this[_0x22685e(0x251)][_0x22685e(0xb9)]()<=0x0&&(this['rotateCTBSprites'](),this[_0x22685e(0x251)][_0x22685e(0x24d)](_0x22685e(0x211)));},BattleManager['postEndActionCTB']=function(){const _0x352b3d=_0x293f23;if(!this[_0x352b3d(0x1ad)]())return;if(this[_0x352b3d(0x251)]&&$gameTemp[_0x352b3d(0x14d)]()){this[_0x352b3d(0x251)][_0x352b3d(0x212)]='ready',this['_subject'][_0x352b3d(0x151)]=_0x352b3d(0x271);return;}this[_0x352b3d(0x157)](),this['_subject']&&this[_0x352b3d(0x1a1)]();},VisuMZ[_0x293f23(0xd1)][_0x293f23(0x236)]=BattleManager['startActorInput'],BattleManager['startActorInput']=function(){const _0x39a6d9=_0x293f23;this[_0x39a6d9(0x157)](),VisuMZ[_0x39a6d9(0xd1)][_0x39a6d9(0x236)][_0x39a6d9(0x122)](this);},BattleManager[_0x293f23(0x157)]=function(_0x8c57d1){const _0x5152ea=_0x293f23;if(!this['isCTB']())return;const _0xa1346e=SceneManager[_0x5152ea(0x23d)][_0x5152ea(0x1e0)];if(!_0xa1346e)return;_0xa1346e[_0x5152ea(0xca)](_0x8c57d1);},BattleManager[_0x293f23(0x95)]=function(){const _0x165142=_0x293f23;if(!this['isCTB']())return;const _0x55e170=SceneManager[_0x165142(0x23d)][_0x165142(0x1e0)];if(!_0x55e170)return;_0x55e170[_0x165142(0x14f)](this[_0x165142(0x251)]);},BattleManager[_0x293f23(0x23c)]=function(){const _0xc33264=_0x293f23,_0x1d7f1c=this[_0xc33264(0x217)]()['map'](_0x4a11c=>String([_0x4a11c[_0xc33264(0x29b)](),'Ticks\x20to\x20Goal:\x20'+_0x4a11c['ctbTicksToGoal'](0x1)]));console[_0xc33264(0x163)](_0x1d7f1c);},VisuMZ[_0x293f23(0xd1)][_0x293f23(0x2aa)]=Game_System[_0x293f23(0x1a9)][_0x293f23(0x20a)],Game_System[_0x293f23(0x1a9)][_0x293f23(0x20a)]=function(){const _0x58cd5e=_0x293f23;VisuMZ[_0x58cd5e(0xd1)][_0x58cd5e(0x2aa)][_0x58cd5e(0x122)](this),this[_0x58cd5e(0x13d)]();},Game_System[_0x293f23(0x1a9)][_0x293f23(0x13d)]=function(){const _0x17a543=_0x293f23;this[_0x17a543(0x104)]=!![];},Game_System['prototype'][_0x293f23(0x221)]=function(){const _0x101436=_0x293f23;return this[_0x101436(0x104)]===undefined&&this[_0x101436(0x13d)](),this[_0x101436(0x104)];},Game_System[_0x293f23(0x1a9)][_0x293f23(0x213)]=function(_0x46c4a5){const _0x1bc2a8=_0x293f23;this[_0x1bc2a8(0x104)]===undefined&&this['initBattleSystemCTB'](),this[_0x1bc2a8(0x104)]=_0x46c4a5;},VisuMZ['BattleSystemCTB'][_0x293f23(0x267)]=Game_Action[_0x293f23(0x1a9)][_0x293f23(0x234)],Game_Action['prototype'][_0x293f23(0x234)]=function(_0x54585c){const _0x5adbc3=_0x293f23;VisuMZ[_0x5adbc3(0xd1)]['Game_Action_applyItemUserEffect'][_0x5adbc3(0x122)](this,_0x54585c),this[_0x5adbc3(0x133)](_0x54585c);},Game_Action[_0x293f23(0x1a9)][_0x293f23(0x133)]=function(_0x38c446){const _0x1c9154=_0x293f23;if(!SceneManager[_0x1c9154(0x140)]())return;if(!BattleManager[_0x1c9154(0x1ad)]())return;if(this[_0x1c9154(0xe0)]())this['applyItemBattleSystemCTBUserEffect'](_0x38c446);},Game_Action['prototype'][_0x293f23(0x1d5)]=function(_0x596f86){const _0x98fe27=_0x293f23,_0x2a53c9=this['item']()[_0x98fe27(0x27a)];if(_0x596f86[_0x98fe27(0x247)]()){const _0x542653=VisuMZ[_0x98fe27(0xd1)][_0x98fe27(0xd0)](this[_0x98fe27(0xe0)](),_0x98fe27(0xb8));if(VisuMZ[_0x98fe27(0xd1)]['JS'][_0x542653]){if(_0x98fe27(0x224)===_0x98fe27(0x9c)){const _0x4df9f8=this[_0x98fe27(0x26c)]();if(!_0x4df9f8)return _0x5d8cc3['MAX_SAFE_INTEGER'];const _0x453c96=0x1*(this[_0x98fe27(0x1f8)]+0x1);return _0x4df9f8['ctbTicksToGoal'](_0x453c96,_0xca64d2);}else{const _0x4ddf3b=VisuMZ['BattleSystemCTB']['JS'][_0x542653][_0x98fe27(0x122)](this,this[_0x98fe27(0x19f)](),_0x596f86);_0x596f86[_0x98fe27(0x1c6)](_0x4ddf3b);}}_0x2a53c9[_0x98fe27(0x11f)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x596f86['setCtbChargeTime'](Number(RegExp['$1'])*0.01),_0x2a53c9[_0x98fe27(0x11f)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x596f86[_0x98fe27(0xc5)](Number(RegExp['$1'])*0.01);}else{if(_0x596f86[_0x98fe27(0x23a)]()){if(_0x98fe27(0xc1)===_0x98fe27(0xc1)){const _0x28daf2=VisuMZ['BattleSystemCTB'][_0x98fe27(0xd0)](this[_0x98fe27(0xe0)](),'Cast');if(VisuMZ['BattleSystemCTB']['JS'][_0x28daf2]){const _0x569ceb=VisuMZ[_0x98fe27(0xd1)]['JS'][_0x28daf2]['call'](this,this['subject'](),_0x596f86);_0x596f86[_0x98fe27(0x1cf)](_0x569ceb);}if(_0x2a53c9['match'](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)){if('JcVHD'!==_0x98fe27(0x94))_0x596f86[_0x98fe27(0x1cf)](Number(RegExp['$1'])*0.01);else return this[_0x98fe27(0x296)]();}_0x2a53c9['match'](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x596f86[_0x98fe27(0x1f4)](Number(RegExp['$1'])*0.01);}else return _0x427ff9['allBattleMembers']()[_0x98fe27(0x150)](_0x45d74e=>_0x45d74e!==_0x3e8131)['some'](_0x482cb6=>_0x482cb6[_0x98fe27(0x25f)]()&&_0x482cb6['canMove']()&&_0x482cb6[_0x98fe27(0x29e)]>=0x1);}}const _0x30e99c=VisuMZ['BattleSystemCTB'][_0x98fe27(0xd0)](this['item'](),_0x98fe27(0x146));if(VisuMZ[_0x98fe27(0xd1)]['JS'][_0x30e99c]){const _0x3ecf31=VisuMZ['BattleSystemCTB']['JS'][_0x30e99c][_0x98fe27(0x122)](this,this[_0x98fe27(0x19f)](),_0x596f86);_0x596f86[_0x98fe27(0x18d)](_0x3ecf31);}if(_0x2a53c9[_0x98fe27(0x11f)](/<(?:CTB) (?:SET|MAKE|EXACT) ORDER:[ ](\d+)>/i)){if(_0x98fe27(0x1eb)===_0x98fe27(0x1eb))_0x596f86['setTurnOrderCTB'](Number(RegExp['$1']));else for(let _0x148386=0x0;_0x148386<_0x1af678;_0x148386++){const _0x2c5868=new _0x42ee28(_0x5e92b5,_0x1e6f27,_0x148386);this[_0x98fe27(0x15f)][_0x98fe27(0xf2)](_0x2c5868),this[_0x98fe27(0x1ac)][_0x98fe27(0x287)](_0x2c5868);}}if(_0x2a53c9[_0x98fe27(0x11f)](/<(?:CTB) (?:CHANGE|DELAY|RUSH|SHIFT) ORDER:[ ]([\+\-]\d+)>/i)){if(_0x98fe27(0x1e5)===_0x98fe27(0x1f5)){const _0x278f48=_0x2fd44a['BattleSystemCTB']['createKeyJS'](this[_0x98fe27(0xe0)](),_0x98fe27(0xb8));if(_0x48c582[_0x98fe27(0xd1)]['JS'][_0x278f48]){const _0x35dfba=_0x404403[_0x98fe27(0xd1)]['JS'][_0x278f48][_0x98fe27(0x122)](this,this['subject'](),_0x455cb8);_0x2d7f3e[_0x98fe27(0x1c6)](_0x35dfba);}_0x167e3c[_0x98fe27(0x11f)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x4b0b38[_0x98fe27(0x1c6)](_0xe5efb4(_0x1c89a7['$1'])*0.01),_0x5f2c0b['match'](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x342b1c[_0x98fe27(0xc5)](_0x228686(_0x4f5bca['$1'])*0.01);}else _0x596f86[_0x98fe27(0x139)](Number(RegExp['$1']));}},VisuMZ[_0x293f23(0xd1)][_0x293f23(0x202)]=Game_Action[_0x293f23(0x1a9)]['applyGlobal'],Game_Action[_0x293f23(0x1a9)]['applyGlobal']=function(){const _0x3faa60=_0x293f23;VisuMZ[_0x3faa60(0xd1)][_0x3faa60(0x202)][_0x3faa60(0x122)](this),this[_0x3faa60(0xcb)]();},Game_Action[_0x293f23(0x1a9)][_0x293f23(0xcb)]=function(){const _0x51db4e=_0x293f23;if(!this[_0x51db4e(0xe0)]())return;if(!BattleManager[_0x51db4e(0x1ad)]())return;const _0x5b5c3d=this['item']()[_0x51db4e(0x27a)];let _0x40c3f7=0x0;this['_forcing']&&(_0x40c3f7=this[_0x51db4e(0x19f)]()[_0x51db4e(0x9a)]);const _0x496d83=VisuMZ[_0x51db4e(0xd1)][_0x51db4e(0xd0)](this[_0x51db4e(0xe0)](),_0x51db4e(0x143));if(VisuMZ['BattleSystemCTB']['JS'][_0x496d83]){if(_0x51db4e(0x1c5)===_0x51db4e(0x258)){const _0x4aab77=_0x6b19d3['Settings'];if(_0x4aab77['DisplayPosition']!==_0x51db4e(0x13a))return;if(!_0x4aab77[_0x51db4e(0x186)])return;const _0x5c382c=_0x157a96[_0x51db4e(0x23d)][_0x51db4e(0xbf)];if(!_0x5c382c)return;_0x5c382c[_0x51db4e(0x291)]?(this['x']=this[_0x51db4e(0x272)]+(_0x4aab77[_0x51db4e(0x172)]||0x0),this['y']=this['_homeY']+(_0x4aab77[_0x51db4e(0x205)]||0x0)):(this['x']=this[_0x51db4e(0x272)],this['y']=this[_0x51db4e(0x281)]);const _0x52b039=_0x2166e2[_0x51db4e(0x23d)]['_windowLayer'];_0x19cebd[_0x51db4e(0xa3)]===_0x5a192c&&(_0x4f8330[_0x51db4e(0xa3)]=_0x5f3b07[_0x51db4e(0x1d2)]((_0x44ce74['width']-_0x1a0975[_0x51db4e(0x253)](_0x3f3eda['boxWidth'],_0x52b039[_0x51db4e(0x220)]))/0x2),_0x4b85f1['_ogWindowLayerY']=_0x4501d3[_0x51db4e(0x1d2)]((_0x1b053f[_0x51db4e(0x210)]-_0x3f0f35[_0x51db4e(0x253)](_0x2574dc[_0x51db4e(0x17e)],_0x52b039[_0x51db4e(0x210)]))/0x2)),this['x']+=_0x52b039['x']-_0x4c045f[_0x51db4e(0xa3)],this['y']+=_0x52b039['y']-_0x2d401b[_0x51db4e(0xa9)];}else _0x40c3f7=VisuMZ['BattleSystemCTB']['JS'][_0x496d83][_0x51db4e(0x122)](this,this[_0x51db4e(0x19f)](),this[_0x51db4e(0x19f)]());}let _0x542f74=this[_0x51db4e(0xe0)]()[_0x51db4e(0x188)]>0x0?this['item']()[_0x51db4e(0x188)]:0x0;if(this[_0x51db4e(0x241)]())_0x542f74+=this['subject']()[_0x51db4e(0x1b6)]();_0x40c3f7+=(_0x542f74/0xfa0)['clamp'](0x0,0x1);_0x5b5c3d[_0x51db4e(0x11f)](/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x40c3f7=Number(RegExp['$1'])*0.01);const _0x57e864=this[_0x51db4e(0x19f)]()[_0x51db4e(0x10a)]()[_0x51db4e(0x1d8)](this[_0x51db4e(0x19f)]()['skills']()),_0x128e7f=/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0xe16d5b=_0x57e864[_0x51db4e(0x191)](_0x3e8da7=>_0x3e8da7&&_0x3e8da7[_0x51db4e(0x27a)][_0x51db4e(0x11f)](_0x128e7f)?Number(RegExp['$1'])*0.01:0x0);_0x40c3f7=_0xe16d5b[_0x51db4e(0x18b)]((_0x14687e,_0x145bfd)=>_0x14687e+_0x145bfd,_0x40c3f7),this[_0x51db4e(0x19f)]()[_0x51db4e(0x22e)](_0x40c3f7);},Game_BattlerBase['prototype'][_0x293f23(0x1c6)]=function(_0x196ef5){this['_tpbChargeTime']=_0x196ef5;},Game_BattlerBase[_0x293f23(0x1a9)][_0x293f23(0xc5)]=function(_0x4a7cbe){const _0x448927=_0x293f23;this[_0x448927(0x1c6)](this['_tpbChargeTime']+_0x4a7cbe);},Game_BattlerBase[_0x293f23(0x1a9)][_0x293f23(0x1cf)]=function(_0x45ebad){const _0x2226b1=_0x293f23,_0x2fda22=this[_0x2226b1(0x26b)]();this['_tpbCastTime']=_0x2fda22*_0x45ebad;},Game_BattlerBase[_0x293f23(0x1a9)][_0x293f23(0x1f4)]=function(_0x380fa6){const _0x137f10=_0x293f23,_0x3497b8=this[_0x137f10(0x26b)](),_0x25bd54=_0x3497b8*_0x380fa6;this[_0x137f10(0x13f)]=this[_0x137f10(0x13f)]+_0x25bd54;},VisuMZ[_0x293f23(0xd1)][_0x293f23(0x129)]=Game_BattlerBase[_0x293f23(0x1a9)][_0x293f23(0x2a1)],Game_BattlerBase['prototype']['appear']=function(){const _0x12cfe4=_0x293f23;VisuMZ['BattleSystemCTB'][_0x12cfe4(0x129)][_0x12cfe4(0x122)](this),BattleManager[_0x12cfe4(0x157)]();},VisuMZ[_0x293f23(0xd1)][_0x293f23(0x14a)]=Game_BattlerBase[_0x293f23(0x1a9)]['hide'],Game_BattlerBase[_0x293f23(0x1a9)]['hide']=function(){const _0x379e30=_0x293f23;VisuMZ['BattleSystemCTB']['Game_BattlerBase_hide']['call'](this),BattleManager[_0x379e30(0x157)]();},Game_BattlerBase[_0x293f23(0x1a9)][_0x293f23(0x25e)]=function(){const _0x437a91=_0x293f23;delete this[_0x437a91(0x1fa)],delete this[_0x437a91(0x141)],delete this[_0x437a91(0x17b)],delete this[_0x437a91(0x127)];},Game_BattlerBase[_0x293f23(0x1a9)]['TurnOrderCTBGraphicType']=function(){const _0x3011c6=_0x293f23;return this[_0x3011c6(0x1fa)]===undefined&&(this[_0x3011c6(0x1fa)]=this[_0x3011c6(0x168)]()),this[_0x3011c6(0x1fa)];},Game_BattlerBase[_0x293f23(0x1a9)]['createTurnOrderCTBGraphicType']=function(){const _0x398a4d=_0x293f23;return Window_CTB_TurnOrder[_0x398a4d(0xdc)][_0x398a4d(0xe1)];},Game_BattlerBase[_0x293f23(0x1a9)]['TurnOrderCTBGraphicFaceName']=function(){const _0x8cad65=_0x293f23;return this[_0x8cad65(0x141)]===undefined&&(this[_0x8cad65(0x141)]=this[_0x8cad65(0x1ea)]()),this[_0x8cad65(0x141)];},Game_BattlerBase['prototype'][_0x293f23(0x1ea)]=function(){const _0x493567=_0x293f23;return Window_CTB_TurnOrder[_0x493567(0xdc)][_0x493567(0x2b0)];},Game_BattlerBase[_0x293f23(0x1a9)][_0x293f23(0x178)]=function(){const _0x2988b8=_0x293f23;return this[_0x2988b8(0x17b)]===undefined&&(_0x2988b8(0x12a)===_0x2988b8(0x115)?this[_0x2988b8(0x13d)]():this[_0x2988b8(0x17b)]=this[_0x2988b8(0x29c)]()),this['_ctbTurnOrderFaceIndex'];},Game_BattlerBase[_0x293f23(0x1a9)][_0x293f23(0x29c)]=function(){const _0x660cfe=_0x293f23;return Window_CTB_TurnOrder['Settings'][_0x660cfe(0x17a)];},Game_BattlerBase[_0x293f23(0x1a9)]['TurnOrderCTBGraphicIconIndex']=function(){const _0x3d997e=_0x293f23;if(this[_0x3d997e(0x127)]===undefined){if(_0x3d997e(0x14b)!==_0x3d997e(0x14b)){const _0x1c6526=_0x4aa0ce[_0x3d997e(0xdc)],_0x34aaaa=['top',_0x3d997e(0x1a0)][_0x3d997e(0x1f1)](_0x1c6526[_0x3d997e(0x193)]);return _0x34aaaa;}else this[_0x3d997e(0x127)]=this['createTurnOrderCTBGraphicIconIndex']();}return this[_0x3d997e(0x127)];},Game_BattlerBase[_0x293f23(0x1a9)][_0x293f23(0x1ff)]=function(){const _0xe0f69e=_0x293f23;return Window_CTB_TurnOrder[_0xe0f69e(0xdc)][_0xe0f69e(0xbd)];},Game_BattlerBase['prototype'][_0x293f23(0x222)]=function(_0x440b73){this['_ctbTurnOrderIconIndex']=_0x440b73;},Game_BattlerBase[_0x293f23(0x1a9)][_0x293f23(0x1ca)]=function(_0x5ac198,_0x13d4a3){const _0x5281f2=_0x293f23;if(this[_0x5281f2(0x24c)]())return Number[_0x5281f2(0x298)];if(!this['isAppeared']())return Number[_0x5281f2(0x298)];const _0x2cfe37=0x1;_0x5ac198*=_0x2cfe37;if(_0x5ac198===_0x2cfe37&&!_0x13d4a3){if(this===BattleManager['_subject'])return _0x5281f2(0xdf)!=='WPzYN'?Number['MIN_SAFE_INTEGER']/0xa:this['battler']();if(this===BattleManager[_0x5281f2(0x13c)]())return Number[_0x5281f2(0x116)]/0xa;if(BattleManager[_0x5281f2(0x1fb)]&&BattleManager[_0x5281f2(0x1fb)][_0x5281f2(0x1f1)](this)){if(_0x5281f2(0x161)==='XNqvO')_0x4c2560['bitmap']=_0x426e59[_0x5281f2(0xa5)](_0x543409[_0x6572c6]);else{let _0x24a135=Number[_0x5281f2(0x116)]/0x1388;return _0x24a135+=BattleManager['_actionBattlers'][_0x5281f2(0x153)](this)*0x5,_0x24a135;}}if(this[_0x5281f2(0x212)]===_0x5281f2(0x250))return _0x5281f2(0x20b)===_0x5281f2(0x20b)?(this['tpbRequiredCastTime']()*_0x2cfe37-this['_tpbCastTime'])/this[_0x5281f2(0x147)]():_0x3ad0fe(_0x4bbed0['$1']);}return _0x5ac198-=this[_0x5281f2(0xae)]()*_0x2cfe37,_0x5ac198/=this[_0x5281f2(0x147)]()*_0x2cfe37,_0x5ac198||0x0;},Game_BattlerBase[_0x293f23(0x1a9)]['ctbTicksToGoalAddedCastTime']=function(){const _0x5f4ce1=_0x293f23;if(this[_0x5f4ce1(0x212)]===_0x5f4ce1(0x250)){if('DizCZ'==='smufQ'){const _0x5d7178=_0x5f0861[_0x5f4ce1(0xdc)];this[_0x5f4ce1(0xe2)]=_0x5d7178['UpdateFrames'],this['_fadeTarget']=_0x368066;}else return(this[_0x5f4ce1(0x26b)]()-this[_0x5f4ce1(0x13f)])/this[_0x5f4ce1(0x147)]();}else return 0x0;},VisuMZ[_0x293f23(0xd1)][_0x293f23(0x254)]=Game_Battler['prototype'][_0x293f23(0x170)],Game_Battler['prototype'][_0x293f23(0x170)]=function(_0x33b2c4){const _0x1be042=_0x293f23;BattleManager[_0x1be042(0x1ad)]()?this[_0x1be042(0x125)](_0x33b2c4):VisuMZ['BattleSystemCTB'][_0x1be042(0x254)]['call'](this,_0x33b2c4);},Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x125)]=function(_0x1bce9b){const _0x3cfb9f=_0x293f23,_0x54457f=VisuMZ[_0x3cfb9f(0xd1)]['Settings'][_0x3cfb9f(0xf9)];let _0x3f9e1b=this['tpbRelativeSpeed']()*eval(_0x54457f[_0x3cfb9f(0x2a5)]);const _0xfc4fa1=this['traitObjects']()[_0x3cfb9f(0x1d8)](this['skills']()),_0x489a99=/<(?:CTB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x1e74a9=_0xfc4fa1[_0x3cfb9f(0x191)](_0x30945c=>_0x30945c&&_0x30945c[_0x3cfb9f(0x27a)][_0x3cfb9f(0x11f)](_0x489a99)?Number(RegExp['$1'])*0.01:0x0);_0x3f9e1b=_0x1e74a9[_0x3cfb9f(0x18b)]((_0x3f417e,_0x1ab64c)=>_0x3f417e+_0x1ab64c,_0x3f9e1b),this[_0x3cfb9f(0x212)]=_0x3cfb9f(0xf7),this[_0x3cfb9f(0x9a)]=(_0x1bce9b?0x1:_0x3f9e1b)[_0x3cfb9f(0xda)](0x0,0x1),this[_0x3cfb9f(0x12c)]()&&(this[_0x3cfb9f(0x9a)]=0x0);},Game_Battler['prototype'][_0x293f23(0x247)]=function(){const _0x1baa85=_0x293f23;return this[_0x1baa85(0x212)]===_0x1baa85(0xf7);},Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x23a)]=function(){const _0x784008=_0x293f23;return this[_0x784008(0x212)]===_0x784008(0x250)&&this[_0x784008(0x171)]()&&this[_0x784008(0x171)]()[_0x784008(0xe0)]()&&this['currentAction']()[_0x784008(0xe0)]()[_0x784008(0x188)]<0x0;},Game_BattlerBase[_0x293f23(0x1a9)][_0x293f23(0x2ac)]=function(){const _0xdb9083=_0x293f23;if(this[_0xdb9083(0x23a)]())return this[_0xdb9083(0x13f)]/this[_0xdb9083(0x26b)]();else{if('souLV'===_0xdb9083(0x200))return 0x0;else{const _0x392af2=_0x255542[_0xdb9083(0x1d1)[_0xdb9083(0x138)](_0x548038)],_0x270d8e={'textColor':_0x20d4de[_0xdb9083(0x227)](_0x1e410d[_0xdb9083(0x231)[_0xdb9083(0x138)](_0x1b5408)]),'flashColor':_0x324b50[_0xdb9083(0xa7)[_0xdb9083(0x138)](_0x38d711)],'flashDuration':_0x451f25[_0xdb9083(0x26a)[_0xdb9083(0x138)](_0x30218c)]};this['setupTextPopup'](_0x392af2,_0x270d8e);}}},Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x1f3)]=function(){const _0x2933ff=_0x293f23;return!this[_0x2933ff(0x22b)]();},Game_Battler['prototype']['setCtbAfterSpeed']=function(_0x2145d9){const _0x4ca0d3=_0x293f23;this[_0x4ca0d3(0x29e)]=_0x2145d9;},VisuMZ[_0x293f23(0xd1)][_0x293f23(0x22c)]=Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x197)],Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x197)]=function(){const _0x24bfa4=_0x293f23;if(BattleManager['isCTB']()){if(_0x24bfa4(0x245)!==_0x24bfa4(0x245)){const _0xd7e9e1=this[_0x24bfa4(0x1bd)]()['note'];if(_0xd7e9e1[_0x24bfa4(0x11f)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x24bfa4(0x124);else{if(_0xd7e9e1['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x24bfa4(0x9d);}return _0x5ecfb9[_0x24bfa4(0xdc)][_0x24bfa4(0xe1)];}else this[_0x24bfa4(0x1b4)]();}else VisuMZ[_0x24bfa4(0xd1)][_0x24bfa4(0x22c)]['call'](this);},Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x1b4)]=function(){const _0x12925c=_0x293f23;!this[_0x12925c(0x22b)]()&&(this['_tpbIdleTime']+=this['tpbAcceleration']());},VisuMZ[_0x293f23(0xd1)][_0x293f23(0xa0)]=Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x102)],Game_Battler['prototype'][_0x293f23(0x102)]=function(){const _0x5a85f9=_0x293f23;this[_0x5a85f9(0x209)]=BattleManager[_0x5a85f9(0x1ad)](),VisuMZ[_0x5a85f9(0xd1)][_0x5a85f9(0xa0)]['call'](this),this[_0x5a85f9(0x209)]=undefined;},VisuMZ[_0x293f23(0xd1)]['Game_Battler_clearTpbChargeTime']=Game_Battler[_0x293f23(0x1a9)][_0x293f23(0xe4)],Game_Battler['prototype']['clearTpbChargeTime']=function(){const _0x4eddbe=_0x293f23;if(BattleManager['isCTB']())this[_0x4eddbe(0x156)]();else{if(_0x4eddbe(0x1e1)!==_0x4eddbe(0xbb))VisuMZ[_0x4eddbe(0xd1)][_0x4eddbe(0x16c)][_0x4eddbe(0x122)](this);else return this[_0x4eddbe(0x141)]===_0x2e2e73&&(this[_0x4eddbe(0x141)]=this[_0x4eddbe(0x1ea)]()),this[_0x4eddbe(0x141)];}},Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x156)]=function(){const _0x102877=_0x293f23;if(this['_onRestrictBypassCtbReset'])return;this[_0x102877(0x212)]=_0x102877(0xf7),this[_0x102877(0x9a)]-=0x1,this[_0x102877(0x9a)]+=this[_0x102877(0x29e)]||0x0;},VisuMZ[_0x293f23(0xd1)][_0x293f23(0x278)]=Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x283)],Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x283)]=function(){const _0x5b9be7=_0x293f23;if(BattleManager[_0x5b9be7(0x1ad)]()){if(_0x5b9be7(0xb4)===_0x5b9be7(0x226))return 0x0;else this['applyCTBPenalty']();}else{if(_0x5b9be7(0x155)!==_0x5b9be7(0x1e9))VisuMZ[_0x5b9be7(0xd1)][_0x5b9be7(0x278)]['call'](this);else{if(_0x5c30ac[_0x5b9be7(0x255)](this))return;_0x2516a9[_0x5b9be7(0xd1)]['Game_Battler_updateTpb'][_0x5b9be7(0x122)](this);}}},Game_Battler[_0x293f23(0x1a9)][_0x293f23(0xd5)]=function(){const _0x248fd9=_0x293f23;this[_0x248fd9(0x212)]=_0x248fd9(0xf7),this[_0x248fd9(0x9a)]+=VisuMZ['BattleSystemCTB']['Settings'][_0x248fd9(0xf9)][_0x248fd9(0xfd)]||0x0;},VisuMZ[_0x293f23(0xd1)]['Game_Battler_tpbSpeed']=Game_Battler[_0x293f23(0x1a9)]['tpbSpeed'],Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x174)]=function(){const _0x2ce0fc=_0x293f23;if(BattleManager['isCTB']()){if(_0x2ce0fc(0xb2)===_0x2ce0fc(0x1ee))_0x145d56=_0x2e1b96(_0x27452e['$1'])*0.01;else return VisuMZ[_0x2ce0fc(0xd1)][_0x2ce0fc(0xdc)][_0x2ce0fc(0xf9)][_0x2ce0fc(0x275)][_0x2ce0fc(0x122)](this,this);}else return VisuMZ[_0x2ce0fc(0xd1)][_0x2ce0fc(0x189)][_0x2ce0fc(0x122)](this);},VisuMZ[_0x293f23(0xd1)][_0x293f23(0xc8)]=Game_Battler['prototype'][_0x293f23(0x184)],Game_Battler[_0x293f23(0x1a9)]['tpbBaseSpeed']=function(){const _0x4080fe=_0x293f23;return BattleManager['isCTB']()?VisuMZ[_0x4080fe(0xd1)][_0x4080fe(0xdc)][_0x4080fe(0xf9)][_0x4080fe(0x237)][_0x4080fe(0x122)](this,this):VisuMZ[_0x4080fe(0xd1)][_0x4080fe(0xc8)][_0x4080fe(0x122)](this);},VisuMZ[_0x293f23(0xd1)]['Game_Battler_tpbRelativeSpeed']=Game_Battler['prototype'][_0x293f23(0x218)],Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x218)]=function(){const _0x584492=_0x293f23;if(BattleManager['isCTB']())return VisuMZ[_0x584492(0xd1)]['Settings']['Mechanics'][_0x584492(0x148)]['call'](this,this);else{if('PsByK'!==_0x584492(0x110))_0x346be8[_0x584492(0xd1)][_0x584492(0x109)][_0x584492(0x122)](this),this[_0x584492(0xdd)]();else return VisuMZ[_0x584492(0xd1)][_0x584492(0x1b8)][_0x584492(0x122)](this);}},VisuMZ['BattleSystemCTB']['Game_Battler_tpbAcceleration']=Game_Battler['prototype'][_0x293f23(0x147)],Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x147)]=function(){const _0x4bb0c4=_0x293f23;if(BattleManager[_0x4bb0c4(0x1ad)]()){if(_0x4bb0c4(0x1cb)!==_0x4bb0c4(0x1cb))return _0x39d138(_0x11326a['$2']);else{let _0x28829f=VisuMZ['BattleSystemCTB'][_0x4bb0c4(0xdc)][_0x4bb0c4(0xf9)][_0x4bb0c4(0xbe)][_0x4bb0c4(0x122)](this,this);const _0x200249=0x0;return _0x28829f+_0x200249;}}else{if(_0x4bb0c4(0x27c)===_0x4bb0c4(0x1d6))this['initMembers'](_0x589266,_0x37a15a,_0x55a261),_0x1700aa[_0x4bb0c4(0x1a9)][_0x4bb0c4(0x20a)][_0x4bb0c4(0x122)](this),this['createChildren']();else return VisuMZ[_0x4bb0c4(0xd1)]['Game_Battler_tpbAcceleration'][_0x4bb0c4(0x122)](this);}},VisuMZ[_0x293f23(0xd1)][_0x293f23(0x145)]=Game_Battler['prototype'][_0x293f23(0x26b)],Game_Battler['prototype'][_0x293f23(0x26b)]=function(){const _0x4f087a=_0x293f23;if(BattleManager[_0x4f087a(0x1ad)]())return VisuMZ[_0x4f087a(0xd1)][_0x4f087a(0xdc)][_0x4f087a(0xf9)]['TpbCastTimeJS'][_0x4f087a(0x122)](this,this);else{if(_0x4f087a(0x240)==='ejMXz'){const _0x5c3028=this[_0x4f087a(0x13c)]()[_0x4f087a(0x27a)];if(_0x5c3028[_0x4f087a(0x11f)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x54458c(_0x40f8c6['$2']);return this[_0x4f087a(0x136)]();}else return VisuMZ['BattleSystemCTB'][_0x4f087a(0x145)][_0x4f087a(0x122)](this);}},Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x295)]=function(){const _0x53d629=_0x293f23,_0x1f2d81=SceneManager['_scene']['_ctbTurnOrderWindow'];if(!_0x1f2d81)return-0x1;const _0x38161a=_0x1f2d81[_0x53d629(0x1ac)];if(!_0x38161a)return-0x1;const _0x59b716=_0x38161a[_0x53d629(0xb1)](_0x566f8c=>_0x566f8c[_0x53d629(0x26c)]()===this);return _0x38161a[_0x53d629(0x153)](_0x59b716);},Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x139)]=function(_0x3279ed){const _0x32ca64=_0x293f23;if(!BattleManager['isCTB']())return;if(!SceneManager[_0x32ca64(0x140)]())return;if(this===BattleManager[_0x32ca64(0x13c)]())return;if(this===BattleManager[_0x32ca64(0x251)])return;const _0x111484=this[_0x32ca64(0x295)]();if(_0x111484<0x0)return;this[_0x32ca64(0x18d)](_0x111484+_0x3279ed);},Game_Battler['prototype'][_0x293f23(0x18d)]=function(_0x57f25e){const _0x54559f=_0x293f23;if(!BattleManager[_0x54559f(0x1ad)]())return;if(!SceneManager['isSceneBattle']())return;if(this===BattleManager[_0x54559f(0x13c)]())return;if(this===BattleManager['_subject'])return;_0x57f25e=Math[_0x54559f(0x11e)](_0x57f25e,0x1),this[_0x54559f(0x219)](_0x57f25e);},Game_Battler['prototype'][_0x293f23(0x219)]=function(_0xcc7681){const _0x424636=_0x293f23;if(!BattleManager[_0x424636(0x1ad)]())return;if(!SceneManager[_0x424636(0x140)]())return;if(this===BattleManager[_0x424636(0x13c)]())return;if(this===BattleManager[_0x424636(0x251)])return;const _0x470c99=SceneManager[_0x424636(0x23d)][_0x424636(0x1e0)];if(!_0x470c99)return;const _0x4b541f=_0x470c99['_turnOrderContainer'];if(!_0x4b541f)return;const _0x47678b=this[_0x424636(0x295)]();_0x47678b!==_0xcc7681&&this['onCtbOrderChange'](_0xcc7681-_0x47678b);let _0x3b345b=_0xcc7681,_0x6d5c3a=_0xcc7681;if(_0x47678b>_0xcc7681)_0x3b345b-=0x1;else{if(_0x424636(0xed)!==_0x424636(0xed)){const _0x1646bc=this['_graphicFaceIndex'],_0x4962f5=this[_0x424636(0x123)](),_0x4f4bd0=this[_0x424636(0xee)](),_0x58acf9=_0x599e92[_0x424636(0x11e)](_0x4962f5,_0x4f4bd0);this[_0x424636(0x1a5)][_0x424636(0x199)]=new _0x45120f(_0x4962f5,_0x4f4bd0);const _0xafa4f1=this[_0x424636(0x1a5)][_0x424636(0x199)],_0x324d64=_0x55568a['faceWidth'],_0x2ddb9a=_0x3027c7[_0x424636(0xf3)],_0x25cfeb=_0x58acf9/_0x199ddb[_0x424636(0x11e)](_0x324d64,_0x2ddb9a),_0xa7094f=_0x2e77f0[_0x424636(0x1d7)],_0x361aa7=_0x518a61[_0x424636(0xf3)],_0x4d5b1d=_0x1646bc%0x4*_0x324d64+(_0x324d64-_0xa7094f)/0x2,_0x1fc7d1=_0x5b3a47[_0x424636(0x100)](_0x1646bc/0x4)*_0x2ddb9a+(_0x2ddb9a-_0x361aa7)/0x2,_0x98551=(_0x4962f5-_0x324d64*_0x25cfeb)/0x2,_0x213e97=(_0x4f4bd0-_0x2ddb9a*_0x25cfeb)/0x2;_0xafa4f1[_0x424636(0x180)](_0x10689c,_0x4d5b1d,_0x1fc7d1,_0xa7094f,_0x361aa7,_0x98551,_0x213e97,_0x58acf9,_0x58acf9);}else _0x6d5c3a+=0x1;}const _0x2b6bf9=_0x4b541f[_0x3b345b][_0x424636(0x249)](!![]),_0x484c57=_0x4b541f[_0x6d5c3a]['ticksLeft'](!![]),_0x4535a3=(_0x2b6bf9+_0x484c57)/0x2;let _0x587502=_0x4535a3*this[_0x424636(0x147)]();if(this[_0x424636(0x212)]===_0x424636(0xf7))this[_0x424636(0x9a)]=0x1-_0x587502;else this[_0x424636(0x212)]==='casting'&&(this[_0x424636(0x13f)]=this[_0x424636(0x26b)]()-_0x587502);BattleManager['_actionBattlers']=[],BattleManager[_0x424636(0x157)]();},Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x29a)]=function(_0x56ac18){const _0x519948=_0x293f23,_0xc0c58b=VisuMZ[_0x519948(0xd1)][_0x519948(0xdc)][_0x519948(0x16e)],_0x5812a3=_0x56ac18>0x0?_0x519948(0x18a):_0x519948(0x198);if(_0xc0c58b[_0x519948(0x1fd)['format'](_0x5812a3)]){const _0x84da24=_0xc0c58b['%1AnimationID'[_0x519948(0x138)](_0x5812a3)],_0x525598=_0xc0c58b[_0x519948(0x195)[_0x519948(0x138)](_0x5812a3)],_0x2b5ced=_0xc0c58b[_0x519948(0x1b1)[_0x519948(0x138)](_0x5812a3)];$gameTemp[_0x519948(0x1ed)]([this],_0x84da24,_0x525598,_0x2b5ced);}if(this[_0x519948(0x26c)]()&&_0xc0c58b[_0x519948(0x1d1)['format'](_0x5812a3)][_0x519948(0x1a6)]>0x0){const _0x24f972=_0xc0c58b[_0x519948(0x1d1)[_0x519948(0x138)](_0x5812a3)],_0x2f17ee={'textColor':ColorManager[_0x519948(0x227)](_0xc0c58b['%1TextColor'[_0x519948(0x138)](_0x5812a3)]),'flashColor':_0xc0c58b['%1FlashColor'[_0x519948(0x138)](_0x5812a3)],'flashDuration':_0xc0c58b[_0x519948(0x26a)['format'](_0x5812a3)]};this[_0x519948(0x215)](_0x24f972,_0x2f17ee);}},VisuMZ[_0x293f23(0xd1)][_0x293f23(0x1b3)]=Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x225)],Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x225)]=function(){const _0x77fac2=_0x293f23;if(BattleManager[_0x77fac2(0x255)](this))return;VisuMZ[_0x77fac2(0xd1)]['Game_Battler_updateTpb']['call'](this);},BattleManager[_0x293f23(0x255)]=function(_0x2aeadf){const _0x5a59d5=_0x293f23;return BattleManager[_0x5a59d5(0x217)]()['filter'](_0x49527c=>_0x49527c!==_0x2aeadf)[_0x5a59d5(0x134)](_0x4a5ba9=>_0x4a5ba9[_0x5a59d5(0x25f)]()&&_0x4a5ba9[_0x5a59d5(0x22b)]()&&_0x4a5ba9[_0x5a59d5(0x29e)]>=0x1);},VisuMZ[_0x293f23(0xd1)][_0x293f23(0x196)]=Game_Battler[_0x293f23(0x1a9)]['updateTpbChargeTime'],Game_Battler['prototype'][_0x293f23(0x2a6)]=function(){const _0x34af8e=_0x293f23;if(BattleManager['isCTB']()){if(_0x34af8e(0x1b2)===_0x34af8e(0x19b))return _0x1bc53d[_0x34af8e(0x1ad)]()?_0x46f759[_0x34af8e(0xd1)][_0x34af8e(0xdc)][_0x34af8e(0xf9)]['TpbBaseSpeedCalcJS'][_0x34af8e(0x122)](this,this):_0x29b164[_0x34af8e(0xd1)][_0x34af8e(0xc8)]['call'](this);else this[_0x34af8e(0x15a)]();}else _0x34af8e(0x229)!=='dAGjE'?_0xec9e0a[_0x34af8e(0x1ad)]()?this['applyCTBPenalty']():_0x25fd48[_0x34af8e(0xd1)][_0x34af8e(0x278)][_0x34af8e(0x122)](this):VisuMZ[_0x34af8e(0xd1)]['Game_Battler_updateTpbChargeTime'][_0x34af8e(0x122)](this);},Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x15a)]=function(){const _0x17f326=_0x293f23;if(this[_0x17f326(0x212)]===_0x17f326(0xf7)){if(_0x17f326(0x1fe)!=='GFcvW')this['_tpbChargeTime']+=this[_0x17f326(0x147)](),this['_tpbChargeTime']>=0x1&&this['onTpbCharged']();else{if(_0x447157[_0x17f326(0x1ad)]()){let _0x3ff730=_0x1824ec[_0x17f326(0xd1)][_0x17f326(0xdc)]['Mechanics'][_0x17f326(0xbe)][_0x17f326(0x122)](this,this);const _0x197a80=0x0;return _0x3ff730+_0x197a80;}else return _0x59235f[_0x17f326(0xd1)][_0x17f326(0x263)][_0x17f326(0x122)](this);}}},VisuMZ[_0x293f23(0xd1)][_0x293f23(0xf8)]=Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x27e)],Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x27e)]=function(){const _0x35687b=_0x293f23;BattleManager[_0x35687b(0x1ad)]()?this[_0x35687b(0x206)]():_0x35687b(0x1ce)===_0x35687b(0xac)?this[_0x35687b(0xe8)]():VisuMZ['BattleSystemCTB'][_0x35687b(0xf8)]['call'](this);},Game_Battler[_0x293f23(0x1a9)][_0x293f23(0x206)]=function(){const _0x2bd046=_0x293f23;if(this['_tpbState']===_0x2bd046(0x250)){this[_0x2bd046(0x13f)]+=this[_0x2bd046(0x147)]();if(this['_tpbCastTime']>=this['tpbRequiredCastTime']()){if(_0x2bd046(0x1a2)!=='UzBGk'){const _0x35893d=this[_0x2bd046(0x251)],_0x8bf34a=_0x35893d[_0x2bd046(0x171)]();_0x8bf34a?(_0x8bf34a[_0x2bd046(0x19e)](),_0x8bf34a[_0x2bd046(0xab)]()&&this[_0x2bd046(0x235)](),_0x35893d[_0x2bd046(0x177)]()):(_0x35893d[_0x2bd046(0x22e)](0x0),this[_0x2bd046(0x1bf)](),this[_0x2bd046(0x251)]=null);}else this[_0x2bd046(0x212)]=_0x2bd046(0x1cc);}}},Game_Actor[_0x293f23(0x1a9)][_0x293f23(0x168)]=function(){const _0x356643=_0x293f23,_0x175ca2=this[_0x356643(0x13c)]()[_0x356643(0x27a)];if(_0x175ca2['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x356643(0x230)!==_0x356643(0x230))this[_0x356643(0x1a1)]();else return'face';}else{if(_0x175ca2[_0x356643(0x11f)](/<CTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x356643(0x20f)===_0x356643(0x264))this[_0x356643(0x9a)]=0x1-_0x1e4152;else return _0x356643(0x9d);}}return Window_CTB_TurnOrder[_0x356643(0xdc)][_0x356643(0x12f)];},Game_Actor[_0x293f23(0x1a9)][_0x293f23(0x1ea)]=function(){const _0x17711d=_0x293f23,_0x33f491=this[_0x17711d(0x13c)]()['note'];if(_0x33f491[_0x17711d(0x11f)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x17711d(0x233)==='cbhSM')this[_0x17711d(0xa1)]=_0x17711d(0x1bd);else return String(RegExp['$1']);}return this['faceName']();},Game_Actor[_0x293f23(0x1a9)][_0x293f23(0x29c)]=function(){const _0x4bda9a=_0x293f23,_0x46b9cf=this[_0x4bda9a(0x13c)]()[_0x4bda9a(0x27a)];if(_0x46b9cf[_0x4bda9a(0x11f)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this['faceIndex']();},Game_Actor[_0x293f23(0x1a9)][_0x293f23(0x1ff)]=function(){const _0x524f57=_0x293f23,_0x23af09=this[_0x524f57(0x13c)]()[_0x524f57(0x27a)];if(_0x23af09[_0x524f57(0x11f)](/<CTB TURN ORDER ICON:[ ](\d+)>/i)){if('ZVEJr'!==_0x524f57(0x128))return Number(RegExp['$1']);else this[_0x524f57(0x15a)]();}return Window_CTB_TurnOrder[_0x524f57(0xdc)][_0x524f57(0x112)];},Game_Enemy['prototype'][_0x293f23(0x168)]=function(){const _0x541e29=_0x293f23,_0x29fa54=this['enemy']()['note'];if(_0x29fa54[_0x541e29(0x11f)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x541e29(0x124);else{if(_0x29fa54[_0x541e29(0x11f)](/<CTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x541e29(0x1ab)===_0x541e29(0x15c))_0x39b572[_0x541e29(0xec)](),_0xd3de18[_0x541e29(0x276)]()&&_0x52acb9[_0x541e29(0x163)](_0x541e29(0xb6));else return _0x541e29(0x9d);}}return Window_CTB_TurnOrder[_0x541e29(0xdc)][_0x541e29(0xe1)];},Game_Enemy['prototype'][_0x293f23(0x1ea)]=function(){const _0x3e58c5=_0x293f23,_0x165a25=this['enemy']()['note'];if(_0x165a25[_0x3e58c5(0x11f)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_CTB_TurnOrder[_0x3e58c5(0xdc)][_0x3e58c5(0x2b0)];},Game_Enemy['prototype'][_0x293f23(0x29c)]=function(){const _0x1e2ef4=_0x293f23,_0x4ec153=this[_0x1e2ef4(0x1bd)]()[_0x1e2ef4(0x27a)];if(_0x4ec153[_0x1e2ef4(0x11f)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x1e2ef4(0x149)!==_0x1e2ef4(0x28d))return Number(RegExp['$2']);else{const _0x5a068d=this[_0x1e2ef4(0x13c)]()['note'];if(_0x5a068d[_0x1e2ef4(0x11f)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x17e294(_0x5e57c1['$1']);return _0x3b6c8c['Settings'][_0x1e2ef4(0x112)];}}return Window_CTB_TurnOrder[_0x1e2ef4(0xdc)][_0x1e2ef4(0x17a)];},Game_Enemy[_0x293f23(0x1a9)][_0x293f23(0x1ff)]=function(){const _0x1227e0=_0x293f23,_0x56da0c=this[_0x1227e0(0x1bd)]()[_0x1227e0(0x27a)];if(_0x56da0c[_0x1227e0(0x11f)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x1227e0(0x12d)!=='iiAAz'?Number(RegExp['$1']):_0x4a8c58[_0x1227e0(0x1ca)](0x1)-_0x24c08a[_0x1227e0(0x1ca)](0x1);return Window_CTB_TurnOrder[_0x1227e0(0xdc)][_0x1227e0(0xbd)];},VisuMZ[_0x293f23(0xd1)]['Scene_Battle_createAllWindows']=Scene_Battle[_0x293f23(0x1a9)][_0x293f23(0x16a)],Scene_Battle[_0x293f23(0x1a9)]['createAllWindows']=function(){const _0x10ad42=_0x293f23;VisuMZ['BattleSystemCTB'][_0x10ad42(0x109)][_0x10ad42(0x122)](this),this['createCTBTurnOrderWindow']();},Scene_Battle[_0x293f23(0x1a9)][_0x293f23(0xdd)]=function(){const _0x2737bc=_0x293f23;if(!BattleManager[_0x2737bc(0x1ad)]())return;this[_0x2737bc(0x1e0)]=new Window_CTB_TurnOrder();const _0x319b3f=this[_0x2737bc(0x285)](this['_windowLayer']);this['addChildAt'](this['_ctbTurnOrderWindow'],_0x319b3f),this[_0x2737bc(0x243)](),BattleManager[_0x2737bc(0x157)](!![]);},Scene_Battle['prototype'][_0x293f23(0x243)]=function(){const _0x3c3b18=_0x293f23,_0x2d1d97=Window_CTB_TurnOrder[_0x3c3b18(0xdc)];if(_0x2d1d97[_0x3c3b18(0x193)]!==_0x3c3b18(0x13a))return;if(!_0x2d1d97[_0x3c3b18(0x24a)])return;if(!this[_0x3c3b18(0x1a4)])return;const _0x482779=this['_ctbTurnOrderWindow']['y']-Math[_0x3c3b18(0x1d2)]((Graphics[_0x3c3b18(0x210)]-Graphics[_0x3c3b18(0x17e)])/0x2),_0x72d2a3=_0x482779+this[_0x3c3b18(0x1e0)]['height'];this[_0x3c3b18(0x1a4)]['y']=_0x72d2a3+_0x2d1d97['ScreenBuffer'];};function _0x4e98(_0x38683d,_0x4d0eff){const _0x1cd3af=_0x1cd3();return _0x4e98=function(_0x4e98f2,_0x419481){_0x4e98f2=_0x4e98f2-0x92;let _0x252963=_0x1cd3af[_0x4e98f2];return _0x252963;},_0x4e98(_0x38683d,_0x4d0eff);}function _0x1cd3(){const _0x57569=['Mechanics','addLoadListener','changeFaceGraphicBitmap','10cVvOez','EscapeFailPenalty','Enemies','130ekJWTe','floor','STR','onRestrict','ParseItemNotetags','_ctbTurnOrderVisible','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','maxBattleMembers','VisuMZ_0_CoreEngine','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Scene_Battle_createAllWindows','traitObjects','_fadeTarget','_letter','_autoBattle','OrderDirection','RfbfI','PsByK','constructor','ActorBattlerIcon','isEnemy','createOrderJS','UuwCF','MIN_SAFE_INTEGER','updateLetter','8FxYqOR','_unit','create','_positionTargetX','getStateTooltipBattler','processCtbAntiSoftlock','max','match','createRateJS','_blendColor','call','bitmapWidth','face','initTpbChargeTimeCTB','svActorHorzCells','_ctbTurnOrderIconIndex','GukxU','Game_BattlerBase_appear','FvnHW','battleSys','isRestricted','Tzqal','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20position\x20=\x20target.getCurrentTurnOrderPositionCTB();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20order\x20=\x20position;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(order)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20order\x20=\x20position;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20order;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','ActorBattlerType','updateGraphic','ParseSkillNotetags','description','applyBattleSystemCTBUserEffect','some','getBattleSystem','faceIndex','ScreenBuffer','format','changeTurnOrderByCTB','top','_windowLayer','actor','initBattleSystemCTB','iconWidth','_tpbCastTime','isSceneBattle','_ctbTurnOrderFaceName','_isAlive','After','ZZAUJ','Game_Battler_tpbRequiredCastTime','Order','tpbAcceleration','BattlerRelativeSpeedJS','tIczh','Game_BattlerBase_hide','XAogn','UpdateFrames','isCommonEventReserved','PAtLR','rotateCTBSprite','filter','_actionState','FaceName','indexOf','Parse_Notetags_CreateJS','kfoie','clearTpbChargeTimeCTB','updateTurnOrderCTB','UUGth','iconHeight','updateTpbChargeTimeCTB','isActiveTpb','TLknB','hlphl','mpSfR','_turnOrderInnerSprite','STRUCT','ucipL','_graphicEnemy','log','uqWSj','98099xfYyvW','HJKkw','updatePadding','createTurnOrderCTBGraphicType','%1BorderColor','createAllWindows','right','Game_Battler_clearTpbChargeTime','time','Effect','battlerHue','initTpbChargeTime','currentAction','RepositionTopHelpX','bind','tpbSpeed','battleEnd','_graphicFaceName','removeCurrentAction','TurnOrderCTBGraphicFaceIndex','BattleManager_updateAllTpbBattlers','EnemyBattlerFaceIndex','_ctbTurnOrderFaceIndex','CtbTurnOrderEnemyFace','SubjectDistance','boxHeight','createBorderSprite','blt','ConvertParams','padding','1495308MxGBaw','tpbBaseSpeed','BattleManager_updateTurn','RepositionTopForHelp','compareBattlerSprites','speed','Game_Battler_tpbSpeed','Delay','reduce','CtbTurnOrderActorIcon','setTurnOrderCTB','%1BgColor1','thaua','State-%1-%2','map','svactor','DisplayPosition','updateTurnCTB','%1Mirror','Game_Battler_updateTpbChargeTime','updateTpbIdleTime','Rush','bitmap','Enemy-%1-%2','iEZJA','XkFLX','createBattlerSprites','prepare','subject','bottom','processTurn','UzBGk','SpriteLength','_logWindow','_graphicSprite','length','boxWidth','_graphicFaceIndex','prototype','1738722WQPVLZ','Zhynf','_turnOrderContainer','isCTB','eLYxJ','process_VisuMZ_BattleSystemCTB_CreateRegExp','ShowMarkerBorder','%1Mute','iLdBJ','Game_Battler_updateTpb','updateTpbIdleTimeCTB','rotateDupeNumber','attackSpeed','fontSize','Game_Battler_tpbRelativeSpeed','PBKGb','KvBpd','updateVisibility','version','enemy','ZDgFR','endAction','_graphicIconIndex','checkPosition','setBlendColor','gVdaM','Window_StatusBase_placeGauge','CodbB','setCtbChargeTime','_position','BattleManager_battleSys','rhgmn','ctbTicksToGoal','wDswo','ready','Enemy','qkeUM','setCtbCastTime','DeviceFriendly','%1PopupText','round','isAppeared','return\x200','applyItemBattleSystemCTBUserEffect','BkDnx','faceWidth','concat','placeGauge','TotalHorzSprites','updateAllTpbBattlersCTB','CtbTurnOrderEnemyIcon','YHSqG','left','isInputting','_ctbTurnOrderWindow','GnRaR','process_VisuMZ_BattleSystemCTB_JS_Notetags','gradientFillRect','turn','mfmGO','GKvXt','hasSvBattler','593481UZkySe','HXHqj','createTurnOrderCTBGraphicFaceName','PcCrX','updateBattleContainerOrder','requestFauxAnimation','RFmlL','onBattleStart','VwoYA','includes','JSON','ctbStopped','changeCtbCastTime','keZbe','BattleManager_isActiveTpb','(?:CTB)','_dupe','loadSvActor','_ctbTurnOrderGraphicType','_actionBattlers','center','%1AnimationID','UDUeU','createTurnOrderCTBGraphicIconIndex','souLV','TotalVertSprites','Game_Action_applyGlobal','updateTpbBattler','ceil','RepositionTopHelpY','updateTpbCastTimeCTB','_isAppeared','_tpbTurnCount','_onRestrictBypassCtbReset','initialize','zjFxz','EnemyBattlerFontSize','changeEnemyGraphicBitmap','TurnOrderCTBGraphicFaceName','yYyRR','height','undecided','_tpbState','setBattleSystemCTBTurnOrderVisible','updatePosition','setupTextPopup','onDatabaseLoaded','allBattleMembers','tpbRelativeSpeed','processTurnOrderChangeCTB','KRDJs','battlerName','MvNkz','children','fillRect','defaultPosition','width','isBattleSystemCTBTurnOrderVisible','setCTBGraphicIconIndex','ARRAYSTRUCT','odtVV','updateTpb','CyeTB','getColor','RwLiH','dAGjE','OrderJS','canMove','Game_Battler_updateTpbIdleTime','svActorVertCells','setCtbAfterSpeed','_phase','fHzMx','%1TextColor','DDlCl','SQLpN','applyItemUserEffect','startAction','BattleManager_startActorInput','TpbBaseSpeedCalcJS','startBattle','_index','isCtbCastingState','SystemTurnOrderVisibility','logCtbData','_scene','initMembers','anchor','MlidH','isAttack','containerWindow','repositionLogWindowCTB','XTjxq','dntuR','mainFontFace','isCtbChargingState','TurnOrder','ticksLeft','RepositionLogWindow','cvwny','isDead','setActionState','DisplayOffsetX','createChildren','casting','_subject','%1BgColor2','min','Game_Battler_initTpbChargeTime','ctbHasInstantActionAfter','Uizmo','TurnOrderCTBGraphicType','SLrYO','checkCtbAntiSoftlock','ARRAYEVAL','BattleManager_isTpb','SpriteThin','_letterSprite','clearTurnOrderCTBGraphics','isAlive','changeIconGraphicBitmap','status','parse','Game_Battler_tpbAcceleration','czRJY','createBackgroundSprite','DqdnY','Game_Action_applyItemUserEffect','BattleManager_startBattle','_isBattleOver','%1FlashDuration','tpbRequiredCastTime','battler','IconIndex','parameters','createTestBitmap','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','acting','_homeX','setHue','isTpb','TpbSpeedCalcJS','isPlaytest','OVVvt','Game_Battler_applyTpbPenalty','73997TFtHfR','note','Actor','OJxUX','nEoEj','updateTpbCastTime','setItem','_positionDuration','_homeY','BorderThickness','applyTpbPenalty','isActor','getChildIndex','%1SystemBg','push','_backgroundSprite','Window_Help_setItem','Visible','_debutCTB','fontFace','odPJp','addInnerChild','createGraphicSprite','registerCommand','visible','RTpLp','YIaks','changeSvActorGraphicBitmap','getCurrentTurnOrderPositionCTB','processUpdateGraphic','windowRect','MAX_SAFE_INTEGER','isTpbCharged','onCtbOrderChange','name','createTurnOrderCTBGraphicFaceIndex','ojtcF','_ctbAfterSpeed','_anti_CTB_SoftlockCount','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','appear','toUpperCase','_inputting','checkOpacity','InitialGaugeJS','updateTpbChargeTime','clear','CtbTurnOrderClearEnemyGraphic','ARRAYNUM','Game_System_initialize','_graphicHue','getCtbCastTimeRate','createLetterSprite','Cast','Weapon-%1-%2','EnemyBattlerFaceName','BattleManager_endAction','_positionTargetY','FNIqX','rotateCTBSprites','BattleManager_processTurn','_graphicSv','DisplayOffsetY','opacity','_tpbChargeTime','%1SystemBorder','CSWmi','icon','isActing','Actors','Game_Battler_onRestrict','_graphicType','Armor-%1-%2','_ogWindowLayerX','updateOpacity','loadSystem','FaceIndex','%1FlashColor','1729071qwjvOs','_ogWindowLayerY','postEndActionCTB','isValid','ohDXe','trim','tpbChargeTime','Scene_Boot_onDatabaseLoaded','pZMJK','find','FnbJb','preEndActionCTB','RgqPA','isAnyBattlerReadyCTB','Aborting\x20Battle.\x20Softlock\x20cannot\x20be\x20fixed.','members','Charge','numActions','drawText','wzFey','ARRAYFUNC','EnemyBattlerIcon','TpbAccelerationJS','_helpWindow','Anti-CTB\x20Softlock\x20Count:','fPfro','containerPosition','15CftHjE','WfXDu','changeCtbChargeTime','VisuMZ_1_BattleCore','Item-%1-%2','Game_Battler_tpbBaseSpeed','%1\x20%2\x20%3','updateTurnOrder','applyGlobalBattleSystemCTBEffects','521972xnNjcu','exit','faceName','_plural','createKeyJS','BattleSystemCTB','(?:GAUGE|TIME|SPEED)','loadSvEnemy','loadFace','applyCTBPenalty','otherCtbChecksPassed','EVAL','startFade','dXfJd','clamp','removeBattleStates','Settings','createCTBTurnOrderWindow','CtbTurnOrderActorFace','WpTHz','item','EnemyBattlerType','_fadeDuration','update','clearTpbChargeTime','updateSelectionEffect','FUNC','QTUSs','processTurnCTB','setText','isTpbReady','isPassCTB','processAbort','vRqJs','bitmapHeight','isHorz','sort','updateGraphicHue','addChild','faceHeight','updateTurn','onTpbCharged','RegExp','charging','Game_Battler_updateTpbCastTime'];_0x1cd3=function(){return _0x57569;};return _0x1cd3();}function Sprite_CTB_TurnOrder_Battler(){const _0x20ac41=_0x293f23;this[_0x20ac41(0x20a)](...arguments);}Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)]=Object[_0x293f23(0x11a)](Sprite_Clickable[_0x293f23(0x1a9)]),Sprite_CTB_TurnOrder_Battler['prototype'][_0x293f23(0x111)]=Sprite_CTB_TurnOrder_Battler,Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0x20a)]=function(_0x3149a0,_0x2e5edd,_0x4c10e9){const _0x1fe449=_0x293f23;this[_0x1fe449(0x23e)](_0x3149a0,_0x2e5edd,_0x4c10e9),Sprite_Clickable['prototype'][_0x1fe449(0x20a)][_0x1fe449(0x122)](this),this['createChildren']();},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)]['initMembers']=function(_0x43c5b1,_0x2a3130,_0x5c251d){const _0x44ef8b=_0x293f23;this[_0x44ef8b(0x119)]=_0x43c5b1,this[_0x44ef8b(0x239)]=_0x2a3130,this[_0x44ef8b(0x1f8)]=_0x5c251d;const _0x2548a0=Window_CTB_TurnOrder[_0x44ef8b(0xdc)],_0x59815e=this[_0x44ef8b(0xef)](),_0x304dd6=this['defaultPosition']();this[_0x44ef8b(0x280)]=0x0,this[_0x44ef8b(0x11b)]=_0x59815e?_0x2548a0[_0x44ef8b(0x25c)]*_0x304dd6:0x0,this['_positionTargetY']=_0x59815e?0x0:_0x2548a0[_0x44ef8b(0x25c)]*_0x304dd6,this['_fadeDuration']=0x0,this[_0x44ef8b(0x10b)]=0xff,this[_0x44ef8b(0x142)]=!![],this[_0x44ef8b(0x207)]=!![];},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0x24f)]=function(){const _0x58bec2=_0x293f23;this['createInitialPositions'](),this['createBackgroundSprite'](),this[_0x58bec2(0x28f)](),this[_0x58bec2(0x17f)](),this[_0x58bec2(0x2ad)]();},Sprite_CTB_TurnOrder_Battler['prototype']['createInitialPositions']=function(){const _0x57db27=_0x293f23;this['x']=this[_0x57db27(0x11b)],this['y']=this[_0x57db27(0x93)];},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0xef)]=function(){const _0x2d0a27=_0x293f23,_0x3a7fa1=Window_CTB_TurnOrder[_0x2d0a27(0xdc)],_0x4aee08=['top','bottom'][_0x2d0a27(0x1f1)](_0x3a7fa1[_0x2d0a27(0x193)]);return _0x4aee08;},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0x123)]=function(){const _0x3ce283=_0x293f23,_0x2facd9=Window_CTB_TurnOrder['Settings'];return this[_0x3ce283(0xef)]()?_0x2facd9[_0x3ce283(0x25c)]:_0x2facd9[_0x3ce283(0x1a3)];},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0xee)]=function(){const _0x59678a=_0x293f23,_0xca22bd=Window_CTB_TurnOrder['Settings'];return this[_0x59678a(0xef)]()?_0xca22bd['SpriteLength']:_0xca22bd[_0x59678a(0x25c)];},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0x26f)]=function(){const _0x90b2ca=_0x293f23;this[_0x90b2ca(0x199)]=new Bitmap(0x48,0x24);const _0x417e27=this[_0x90b2ca(0x26c)]()?this[_0x90b2ca(0x26c)]()[_0x90b2ca(0x29b)]():_0x90b2ca(0xc9)['format'](this['_unit'],this[_0x90b2ca(0x239)],this[_0x90b2ca(0x1f8)]);this['bitmap'][_0x90b2ca(0xba)](_0x417e27,0x0,0x0,0x48,0x24,_0x90b2ca(0x1fc));},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0x265)]=function(){const _0x3fc82f=_0x293f23;if(!Window_CTB_TurnOrder['Settings']['ShowMarkerBg'])return;const _0x3ada54=Window_CTB_TurnOrder[_0x3fc82f(0xdc)],_0x5591c8=this[_0x3fc82f(0x119)]===$gameParty?'Actor':_0x3fc82f(0x1cd),_0x5e872d=_0x3fc82f(0x286)['format'](_0x5591c8),_0x372725=new Sprite();_0x372725[_0x3fc82f(0x23f)]['x']=this[_0x3fc82f(0x23f)]['x'],_0x372725['anchor']['y']=this[_0x3fc82f(0x23f)]['y'];if(_0x3ada54[_0x5e872d])_0x372725[_0x3fc82f(0x199)]=ImageManager['loadSystem'](_0x3ada54[_0x5e872d]);else{const _0x5d3047=this[_0x3fc82f(0x123)](),_0x57484f=this[_0x3fc82f(0xee)]();_0x372725['bitmap']=new Bitmap(_0x5d3047,_0x57484f);const _0x38add3=ColorManager['getColor'](_0x3ada54[_0x3fc82f(0x18e)[_0x3fc82f(0x138)](_0x5591c8)]),_0x4f9471=ColorManager['getColor'](_0x3ada54[_0x3fc82f(0x252)[_0x3fc82f(0x138)](_0x5591c8)]);_0x372725[_0x3fc82f(0x199)][_0x3fc82f(0x1e3)](0x0,0x0,_0x5d3047,_0x57484f,_0x38add3,_0x4f9471,!![]);}this[_0x3fc82f(0x288)]=_0x372725,this[_0x3fc82f(0xf2)](this[_0x3fc82f(0x288)]),this[_0x3fc82f(0x220)]=this[_0x3fc82f(0x288)][_0x3fc82f(0x220)],this[_0x3fc82f(0x210)]=this[_0x3fc82f(0x288)][_0x3fc82f(0x210)];},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0x28f)]=function(){const _0x18af57=_0x293f23,_0xefd47b=new Sprite();_0xefd47b[_0x18af57(0x23f)]['x']=this[_0x18af57(0x23f)]['x'],_0xefd47b['anchor']['y']=this['anchor']['y'],this[_0x18af57(0x1a5)]=_0xefd47b,this[_0x18af57(0xf2)](this[_0x18af57(0x1a5)]),this[_0x18af57(0x296)]();},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0x17f)]=function(){const _0x287ecb=_0x293f23;if(!Window_CTB_TurnOrder[_0x287ecb(0xdc)][_0x287ecb(0x1b0)])return;const _0xec7578=Window_CTB_TurnOrder[_0x287ecb(0xdc)],_0x52f229=this[_0x287ecb(0x119)]===$gameParty?'Actor':_0x287ecb(0x1cd),_0x1c66b5=_0x287ecb(0x9b)[_0x287ecb(0x138)](_0x52f229),_0x4fde50=new Sprite();_0x4fde50[_0x287ecb(0x23f)]['x']=this[_0x287ecb(0x23f)]['x'],_0x4fde50[_0x287ecb(0x23f)]['y']=this[_0x287ecb(0x23f)]['y'];if(_0xec7578[_0x1c66b5]){if(_0x287ecb(0x144)==='esbtm')return this[_0x287ecb(0x127)]===_0x4da055&&(this['_ctbTurnOrderIconIndex']=this[_0x287ecb(0x1ff)]()),this[_0x287ecb(0x127)];else _0x4fde50['bitmap']=ImageManager[_0x287ecb(0xa5)](_0xec7578[_0x1c66b5]);}else{let _0x333a02=this[_0x287ecb(0x123)](),_0xd227f3=this['bitmapHeight'](),_0x24a32e=_0xec7578[_0x287ecb(0x282)];_0x4fde50[_0x287ecb(0x199)]=new Bitmap(_0x333a02,_0xd227f3);const _0x27c03b='#000000',_0x11ef19=ColorManager[_0x287ecb(0x227)](_0xec7578[_0x287ecb(0x169)[_0x287ecb(0x138)](_0x52f229)]);_0x4fde50[_0x287ecb(0x199)][_0x287ecb(0x21e)](0x0,0x0,_0x333a02,_0xd227f3,_0x27c03b),_0x333a02-=0x2,_0xd227f3-=0x2,_0x4fde50['bitmap']['fillRect'](0x1,0x1,_0x333a02,_0xd227f3,_0x11ef19),_0x333a02-=_0x24a32e*0x2,_0xd227f3-=_0x24a32e*0x2,_0x4fde50[_0x287ecb(0x199)][_0x287ecb(0x21e)](0x1+_0x24a32e,0x1+_0x24a32e,_0x333a02,_0xd227f3,_0x27c03b),_0x333a02-=0x2,_0xd227f3-=0x2,_0x24a32e+=0x1,_0x4fde50[_0x287ecb(0x199)]['clearRect'](0x1+_0x24a32e,0x1+_0x24a32e,_0x333a02,_0xd227f3);}this[_0x287ecb(0x288)]=_0x4fde50,this[_0x287ecb(0xf2)](this['_backgroundSprite']);},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)]['createLetterSprite']=function(){const _0x5e15fe=_0x293f23,_0xd56f68=Window_CTB_TurnOrder[_0x5e15fe(0xdc)];if(!_0xd56f68['EnemyBattlerDrawLetter'])return;if(this[_0x5e15fe(0x119)]===$gameParty)return;const _0x2af319=this[_0x5e15fe(0x123)](),_0x34e5fe=this['bitmapHeight'](),_0xcc3ae=new Sprite();_0xcc3ae[_0x5e15fe(0x23f)]['x']=this[_0x5e15fe(0x23f)]['x'],_0xcc3ae[_0x5e15fe(0x23f)]['y']=this[_0x5e15fe(0x23f)]['y'],_0xcc3ae[_0x5e15fe(0x199)]=new Bitmap(_0x2af319,_0x34e5fe),this[_0x5e15fe(0x25d)]=_0xcc3ae,this[_0x5e15fe(0xf2)](this[_0x5e15fe(0x25d)]);},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0x26c)]=function(){const _0x37590a=_0x293f23;return this[_0x37590a(0x119)]?this['_unit']['members']()[this[_0x37590a(0x239)]]:null;},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0x249)]=function(_0x5eb6f0){const _0x4d7ced=_0x293f23,_0x116772=this[_0x4d7ced(0x26c)]();if(!_0x116772)return Number['MAX_SAFE_INTEGER'];const _0x3b6ef1=0x1*(this[_0x4d7ced(0x1f8)]+0x1);return _0x116772['ctbTicksToGoal'](_0x3b6ef1,_0x5eb6f0);},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0xe3)]=function(){const _0xe1ecba=_0x293f23;Sprite_Clickable[_0xe1ecba(0x1a9)]['update'][_0xe1ecba(0x122)](this),this[_0xe1ecba(0x1c1)](),this[_0xe1ecba(0x214)](),this[_0xe1ecba(0x2a4)](),this[_0xe1ecba(0xa4)](),this[_0xe1ecba(0x130)](),this[_0xe1ecba(0xf1)](),this[_0xe1ecba(0x117)](),this[_0xe1ecba(0xe5)]();},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0x1c1)]=function(){const _0x55cb99=_0x293f23,_0x1144b4=this[_0x55cb99(0xc2)]();if(this[_0x55cb99(0x1c7)]===_0x1144b4)return;this[_0x55cb99(0x1c7)]=_0x1144b4;const _0x190887=Window_CTB_TurnOrder[_0x55cb99(0xdc)],_0x3f1b70=this[_0x55cb99(0xef)](),_0x11d5ef=_0x190887[_0x55cb99(0x10e)],_0x46afd2=_0x190887[_0x55cb99(0x17d)],_0x229ffa=SceneManager[_0x55cb99(0x23d)][_0x55cb99(0x1e0)];if(!_0x229ffa)return;this[_0x55cb99(0x280)]=_0x190887[_0x55cb99(0x14c)],this[_0x55cb99(0x11b)]=_0x3f1b70?_0x190887[_0x55cb99(0x25c)]*_0x1144b4:0x0,this[_0x55cb99(0x93)]=_0x3f1b70?0x0:_0x190887[_0x55cb99(0x25c)]*_0x1144b4,_0x1144b4>0x0&&(this[_0x55cb99(0x11b)]+=_0x3f1b70?_0x46afd2:0x0,this[_0x55cb99(0x93)]+=_0x3f1b70?0x0:_0x46afd2),_0x11d5ef?this[_0x55cb99(0x11b)]=_0x3f1b70?_0x229ffa[_0x55cb99(0x220)]-this['_positionTargetX']-_0x190887['SpriteThin']:0x0:_0x55cb99(0x266)===_0x55cb99(0x1be)?this[_0x55cb99(0x212)]=_0x55cb99(0x1cc):this[_0x55cb99(0x93)]=_0x3f1b70?0x0:_0x229ffa[_0x55cb99(0x210)]-this[_0x55cb99(0x93)]-_0x190887['SpriteThin'];},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0x214)]=function(){const _0xf765=_0x293f23;if(this[_0xf765(0xe2)]>0x0)return;if(this[_0xf765(0x280)]>0x0){if('twDIp'===_0xf765(0xd9))this['checkPosition'](),this['_positionDuration']=0x0,this[_0xf765(0x214)](),this[_0xf765(0x99)]=this['_fadeTarget'];else{const _0x21b7ba=this['_positionDuration'];this['x']=(this['x']*(_0x21b7ba-0x1)+this[_0xf765(0x11b)])/_0x21b7ba,this['y']=(this['y']*(_0x21b7ba-0x1)+this[_0xf765(0x93)])/_0x21b7ba,this[_0xf765(0x280)]--;}}if(this['_positionDuration']<=0x0&&this[_0xf765(0x142)]){this['x']=this['_positionTargetX'],this['y']=this[_0xf765(0x93)];if(this['opacity']<=0x0&&!this[_0xf765(0x269)]){if(_0xf765(0xb0)==='pZMJK')this[_0xf765(0xd8)](0xff);else return _0x246024[_0xf765(0xd1)][_0xf765(0x189)][_0xf765(0x122)](this);}}},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0x21f)]=function(){const _0x31c969=_0x293f23;return Window_CTB_TurnOrder[_0x31c969(0xdc)][_0x31c969(0x1da)]*0x14;},Sprite_CTB_TurnOrder_Battler['prototype'][_0x293f23(0x242)]=function(){const _0x4a1661=_0x293f23;return SceneManager[_0x4a1661(0x23d)]['_ctbTurnOrderWindow'];},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)]['containerPosition']=function(){const _0x34716c=_0x293f23;if(!this['containerWindow']())return this[_0x34716c(0x21f)]();const _0x4a2e58=this[_0x34716c(0x242)]()[_0x34716c(0x1ac)];return _0x4a2e58[_0x34716c(0x153)](this);},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)]['rotateDupeNumber']=function(){const _0xdf3219=_0x293f23,_0x4b4f48=Window_CTB_TurnOrder[_0xdf3219(0xdc)],_0x3b17e9=this['isHorz'](),_0x671fbd=_0x3b17e9?_0x4b4f48[_0xdf3219(0x1da)]:_0x4b4f48[_0xdf3219(0x201)];this[_0xdf3219(0x1f8)]-=0x1,this['_dupe']<0x0&&(_0xdf3219(0x21c)===_0xdf3219(0x21c)?(this[_0xdf3219(0x1f8)]=_0x671fbd-0x1,this[_0xdf3219(0xd8)](0x0)):(this[_0xdf3219(0x9a)]+=this[_0xdf3219(0x147)](),this[_0xdf3219(0x9a)]>=0x1&&this['onTpbCharged']()));},Sprite_CTB_TurnOrder_Battler['prototype'][_0x293f23(0xd8)]=function(_0x4670f8){const _0x179f96=_0x293f23,_0x5e2e88=Window_CTB_TurnOrder[_0x179f96(0xdc)];this['_fadeDuration']=_0x5e2e88['UpdateFrames'],this['_fadeTarget']=_0x4670f8;},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0x2a4)]=function(){const _0x2a2c87=_0x293f23,_0x2561b8=this[_0x2a2c87(0x26c)]();if(!_0x2561b8)return;if(this[_0x2a2c87(0x142)]===_0x2561b8[_0x2a2c87(0x25f)]()&&this[_0x2a2c87(0x207)]===_0x2561b8[_0x2a2c87(0x1d3)]())return;this[_0x2a2c87(0x142)]=_0x2561b8[_0x2a2c87(0x25f)](),this[_0x2a2c87(0x207)]=_0x2561b8[_0x2a2c87(0x1d3)]();let _0x46eec9=this[_0x2a2c87(0x142)]&&this['_isAppeared']?0xff:0x0;this[_0x2a2c87(0xd8)](_0x46eec9);},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0xa4)]=function(){const _0x2e8cc3=_0x293f23;if(this[_0x2e8cc3(0xe2)]>0x0){const _0x2eb66f=this['_fadeDuration'];this[_0x2e8cc3(0x99)]=(this[_0x2e8cc3(0x99)]*(_0x2eb66f-0x1)+this['_fadeTarget'])/_0x2eb66f,this[_0x2e8cc3(0xe2)]--,this[_0x2e8cc3(0xe2)]<=0x0&&(this[_0x2e8cc3(0x1c1)](),this[_0x2e8cc3(0x280)]=0x0,this[_0x2e8cc3(0x214)](),this[_0x2e8cc3(0x99)]=this[_0x2e8cc3(0x10b)]);}if(this[_0x2e8cc3(0x269)])return;BattleManager['_phase']===_0x2e8cc3(0x175)&&(_0x2e8cc3(0x10f)!==_0x2e8cc3(0x10f)?_0x144714[_0x2e8cc3(0x1ad)]()?this['clearTpbChargeTimeCTB']():_0xbe77d7['BattleSystemCTB'][_0x2e8cc3(0x16c)][_0x2e8cc3(0x122)](this):(this['_isBattleOver']=!![],this[_0x2e8cc3(0xd8)](0x0)));},Sprite_CTB_TurnOrder_Battler['prototype'][_0x293f23(0x130)]=function(){const _0x43b4b8=_0x293f23,_0x520eb9=this[_0x43b4b8(0x26c)]();if(!_0x520eb9)return;const _0x10cb05=Window_CTB_TurnOrder['Settings'],_0x5260a0=this[_0x43b4b8(0x119)]===$gameParty?_0x43b4b8(0x27b):'Enemy';let _0xc73a14=_0x520eb9[_0x43b4b8(0x257)]();if(_0x520eb9[_0x43b4b8(0x284)]()&&_0xc73a14==='enemy')_0x43b4b8(0x1dd)!==_0x43b4b8(0x1dd)?this[_0x43b4b8(0x127)]=_0x52273f:_0xc73a14='face';else _0x520eb9[_0x43b4b8(0x113)]()&&_0xc73a14===_0x43b4b8(0x192)&&(_0xc73a14=_0x43b4b8(0x1bd));if(this['_graphicType']!==_0xc73a14)return this[_0x43b4b8(0x296)]();switch(this[_0x43b4b8(0xa1)]){case'face':if(this[_0x43b4b8(0x176)]!==_0x520eb9['TurnOrderCTBGraphicFaceName']()){if(_0x43b4b8(0x293)===_0x43b4b8(0x293))return this[_0x43b4b8(0x296)]();else _0x120398[_0x43b4b8(0xba)](this[_0x43b4b8(0x10c)][_0x43b4b8(0xad)](),0x0,_0x4cffda/0x2,_0x285cd0,_0x5eee67/0x2,'center');}if(this[_0x43b4b8(0x1a8)]!==_0x520eb9[_0x43b4b8(0x178)]())return this[_0x43b4b8(0x296)]();break;case _0x43b4b8(0x9d):if(this[_0x43b4b8(0x1c0)]!==_0x520eb9['TurnOrderCTBGraphicIconIndex']())return this[_0x43b4b8(0x296)]();break;case _0x43b4b8(0x1bd):if(_0x520eb9['hasSvBattler']()){if(this['_graphicSv']!==_0x520eb9['svBattlerName']())return this[_0x43b4b8(0x296)]();}else{if(this[_0x43b4b8(0x162)]!==_0x520eb9[_0x43b4b8(0x21b)]())return this['processUpdateGraphic']();}break;case _0x43b4b8(0x192):if(_0x520eb9['isActor']()){if(_0x43b4b8(0x228)===_0x43b4b8(0x228)){if(this[_0x43b4b8(0x97)]!==_0x520eb9['battlerName']()){if(_0x43b4b8(0x24b)!==_0x43b4b8(0x24b)){const _0x1907d4=_0x26122a[_0x43b4b8(0xdc)];return this[_0x43b4b8(0xef)]()?_0x1907d4[_0x43b4b8(0x25c)]:_0x1907d4[_0x43b4b8(0x1a3)];}else return this[_0x43b4b8(0x296)]();}}else{if(!_0x6698c0['isCTB']())return;this[_0x43b4b8(0x1e0)]=new _0xe09ba();const _0x347665=this[_0x43b4b8(0x285)](this['_windowLayer']);this['addChildAt'](this['_ctbTurnOrderWindow'],_0x347665),this[_0x43b4b8(0x243)](),_0x3bc84a[_0x43b4b8(0x157)](!![]);}}else{if(this[_0x43b4b8(0x162)]!==_0x520eb9['battlerName']())return this[_0x43b4b8(0x296)]();}break;}},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0x296)]=function(){const _0x544fea=_0x293f23,_0x5a4fd9=this[_0x544fea(0x26c)]();if(!_0x5a4fd9)return;this[_0x544fea(0xa1)]=_0x5a4fd9[_0x544fea(0x257)]();if(_0x5a4fd9[_0x544fea(0x284)]()&&this[_0x544fea(0xa1)]===_0x544fea(0x1bd)){if(_0x544fea(0x256)==='Uizmo')this[_0x544fea(0xa1)]='face';else{this['_subject']['_tpbState']='ready',this[_0x544fea(0x251)][_0x544fea(0x151)]='acting';return;}}else _0x5a4fd9[_0x544fea(0x113)]()&&this[_0x544fea(0xa1)]===_0x544fea(0x192)&&(this[_0x544fea(0xa1)]=_0x544fea(0x1bd));let _0x53fbf0;switch(this['_graphicType']){case _0x544fea(0x124):this[_0x544fea(0x176)]=_0x5a4fd9[_0x544fea(0x20e)](),this['_graphicFaceIndex']=_0x5a4fd9[_0x544fea(0x178)](),_0x53fbf0=ImageManager[_0x544fea(0xd4)](this[_0x544fea(0x176)]),_0x53fbf0[_0x544fea(0xfa)](this[_0x544fea(0xfb)][_0x544fea(0x173)](this,_0x53fbf0));break;case _0x544fea(0x9d):this['_graphicIconIndex']=_0x5a4fd9[_0x544fea(0x1ff)](),_0x53fbf0=ImageManager[_0x544fea(0xa5)]('IconSet'),_0x53fbf0[_0x544fea(0xfa)](this['changeIconGraphicBitmap'][_0x544fea(0x173)](this,_0x53fbf0));break;case'enemy':if(_0x5a4fd9[_0x544fea(0x1e7)]())this[_0x544fea(0x97)]=_0x5a4fd9['svBattlerName'](),_0x53fbf0=ImageManager['loadSvActor'](this[_0x544fea(0x97)]),_0x53fbf0['addLoadListener'](this['changeSvActorGraphicBitmap']['bind'](this,_0x53fbf0));else $gameSystem['isSideView']()?(this['_graphicEnemy']=_0x5a4fd9[_0x544fea(0x21b)](),_0x53fbf0=ImageManager[_0x544fea(0xd3)](this[_0x544fea(0x162)]),_0x53fbf0['addLoadListener'](this[_0x544fea(0x20d)][_0x544fea(0x173)](this,_0x53fbf0))):(this[_0x544fea(0x162)]=_0x5a4fd9['battlerName'](),_0x53fbf0=ImageManager['loadEnemy'](this[_0x544fea(0x162)]),_0x53fbf0[_0x544fea(0xfa)](this[_0x544fea(0x20d)]['bind'](this,_0x53fbf0)));break;case _0x544fea(0x192):this[_0x544fea(0x97)]=_0x5a4fd9[_0x544fea(0x21b)](),_0x53fbf0=ImageManager[_0x544fea(0x1f9)](this['_graphicSv']),_0x53fbf0[_0x544fea(0xfa)](this['changeSvActorGraphicBitmap']['bind'](this,_0x53fbf0));break;}},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0xfb)]=function(_0x28b546){const _0x82ea8a=_0x293f23,_0x92c5b6=this[_0x82ea8a(0x1a8)],_0x570b5f=this[_0x82ea8a(0x123)](),_0x327e46=this[_0x82ea8a(0xee)](),_0x85d9bb=Math[_0x82ea8a(0x11e)](_0x570b5f,_0x327e46);this['_graphicSprite']['bitmap']=new Bitmap(_0x570b5f,_0x327e46);const _0x554d1d=this['_graphicSprite'][_0x82ea8a(0x199)],_0x5ca479=ImageManager[_0x82ea8a(0x1d7)],_0x90d909=ImageManager['faceHeight'],_0x1c6a65=_0x85d9bb/Math[_0x82ea8a(0x11e)](_0x5ca479,_0x90d909),_0xfdcaf4=ImageManager['faceWidth'],_0x2e62b7=ImageManager[_0x82ea8a(0xf3)],_0x4bf0e0=_0x92c5b6%0x4*_0x5ca479+(_0x5ca479-_0xfdcaf4)/0x2,_0x20996d=Math[_0x82ea8a(0x100)](_0x92c5b6/0x4)*_0x90d909+(_0x90d909-_0x2e62b7)/0x2,_0x5841e8=(_0x570b5f-_0x5ca479*_0x1c6a65)/0x2,_0x383088=(_0x327e46-_0x90d909*_0x1c6a65)/0x2;_0x554d1d[_0x82ea8a(0x180)](_0x28b546,_0x4bf0e0,_0x20996d,_0xfdcaf4,_0x2e62b7,_0x5841e8,_0x383088,_0x85d9bb,_0x85d9bb);},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0x260)]=function(_0x1472c2){const _0x5d5a8f=_0x293f23,_0xaf9e7=this['_graphicIconIndex'],_0x264272=this[_0x5d5a8f(0x123)](),_0x213432=this['bitmapHeight']();this['_graphicSprite'][_0x5d5a8f(0x199)]=new Bitmap(_0x264272,_0x213432);const _0x22eea7=this[_0x5d5a8f(0x1a5)][_0x5d5a8f(0x199)],_0x25be2b=ImageManager[_0x5d5a8f(0x13e)],_0x4fe6c5=ImageManager[_0x5d5a8f(0x159)],_0x5c85e9=Math[_0x5d5a8f(0x253)](_0x25be2b,_0x4fe6c5,_0x264272,_0x213432),_0x35fe68=_0xaf9e7%0x10*_0x25be2b,_0x4ab039=Math[_0x5d5a8f(0x100)](_0xaf9e7/0x10)*_0x4fe6c5,_0x8d1a08=Math[_0x5d5a8f(0x100)](Math['max'](_0x264272-_0x5c85e9,0x0)/0x2),_0x1816ca=Math['floor'](Math[_0x5d5a8f(0x11e)](_0x213432-_0x5c85e9,0x0)/0x2);_0x22eea7[_0x5d5a8f(0x180)](_0x1472c2,_0x35fe68,_0x4ab039,_0x25be2b,_0x4fe6c5,_0x8d1a08,_0x1816ca,_0x5c85e9,_0x5c85e9);},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0x294)]=function(_0x3c24e8){const _0x23ace0=_0x293f23,_0x1bbaf4=this[_0x23ace0(0x123)](),_0x22b3a6=this['bitmapHeight'](),_0x5a939d=Math[_0x23ace0(0x253)](_0x1bbaf4,_0x22b3a6);this['_graphicSprite'][_0x23ace0(0x199)]=new Bitmap(_0x1bbaf4,_0x22b3a6);const _0x3215e4=this[_0x23ace0(0x1a5)][_0x23ace0(0x199)],_0x469d37=this[_0x23ace0(0x97)][_0x23ace0(0x11f)](/\$/i),_0x46c976=_0x469d37?0x1:ImageManager[_0x23ace0(0x126)],_0x2595d1=_0x469d37?0x1:ImageManager[_0x23ace0(0x22d)],_0x5c98ee=_0x3c24e8['width']/_0x46c976,_0x1448f3=_0x3c24e8[_0x23ace0(0x210)]/_0x2595d1,_0x1ba96a=Math[_0x23ace0(0x253)](0x1,_0x5a939d/_0x5c98ee,_0x5a939d/_0x1448f3),_0x1c1908=_0x5c98ee*_0x1ba96a,_0xf5318c=_0x1448f3*_0x1ba96a,_0x2ae56d=Math[_0x23ace0(0x1d2)]((_0x1bbaf4-_0x1c1908)/0x2),_0xb0538=Math[_0x23ace0(0x1d2)]((_0x22b3a6-_0xf5318c)/0x2);_0x3215e4['blt'](_0x3c24e8,0x0,0x0,_0x5c98ee,_0x1448f3,_0x2ae56d,_0xb0538,_0x1c1908,_0xf5318c);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x293f23(0x20d)]=function(_0xf20a81){const _0x248b3b=_0x293f23,_0x2c3ae4=Window_CTB_TurnOrder[_0x248b3b(0xdc)],_0x5eb7ff=this[_0x248b3b(0x123)](),_0x216dc8=this[_0x248b3b(0xee)](),_0x3f0750=Math[_0x248b3b(0x253)](_0x5eb7ff,_0x216dc8);this[_0x248b3b(0x1a5)][_0x248b3b(0x199)]=new Bitmap(_0x5eb7ff,_0x216dc8);const _0xbb08e=this[_0x248b3b(0x1a5)]['bitmap'],_0xc84c7f=Math['min'](0x1,_0x3f0750/_0xf20a81[_0x248b3b(0x220)],_0x3f0750/_0xf20a81[_0x248b3b(0x210)]),_0x4c7983=_0xf20a81['width']*_0xc84c7f,_0x149354=_0xf20a81[_0x248b3b(0x210)]*_0xc84c7f,_0x55e5cc=Math[_0x248b3b(0x1d2)]((_0x5eb7ff-_0x4c7983)/0x2),_0x2c88d1=Math[_0x248b3b(0x1d2)]((_0x216dc8-_0x149354)/0x2);_0xbb08e[_0x248b3b(0x180)](_0xf20a81,0x0,0x0,_0xf20a81[_0x248b3b(0x220)],_0xf20a81[_0x248b3b(0x210)],_0x55e5cc,_0x2c88d1,_0x4c7983,_0x149354);},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0xf1)]=function(){const _0xf73ee8=_0x293f23,_0x4493bb=this[_0xf73ee8(0x26c)]();if(!_0x4493bb)return;if(!_0x4493bb[_0xf73ee8(0x113)]())return;if(this[_0xf73ee8(0x2ab)]===_0x4493bb['battlerHue']())return;this[_0xf73ee8(0x2ab)]=_0x4493bb[_0xf73ee8(0x16f)](),this['_graphicSprite'][_0xf73ee8(0x273)](_0x4493bb[_0xf73ee8(0x1e7)]()?0x0:this['_graphicHue']);},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0x117)]=function(){const _0x176d0a=_0x293f23;if(!this[_0x176d0a(0x25d)])return;const _0x2227ec=this[_0x176d0a(0x26c)]();if(!_0x2227ec)return;if(this[_0x176d0a(0x10c)]===_0x2227ec[_0x176d0a(0x10c)]&&this[_0x176d0a(0xcf)]===_0x2227ec[_0x176d0a(0xcf)])return;this[_0x176d0a(0x10c)]=_0x2227ec[_0x176d0a(0x10c)],this[_0x176d0a(0xcf)]=_0x2227ec['_plural'];const _0xd8691a=Window_CTB_TurnOrder['Settings'],_0x7e8167=this[_0x176d0a(0xef)](),_0x4d9217=this[_0x176d0a(0x123)](),_0x5e07e1=this[_0x176d0a(0xee)](),_0x211234=this['_letterSprite'][_0x176d0a(0x199)];_0x211234[_0x176d0a(0x2a7)]();if(!this['_plural'])return;_0x211234[_0x176d0a(0x28c)]=_0xd8691a['EnemyBattlerFontFace']||$gameSystem[_0x176d0a(0x246)](),_0x211234[_0x176d0a(0x1b7)]=_0xd8691a[_0x176d0a(0x20c)]||0x10,_0x7e8167?_0x211234[_0x176d0a(0xba)](this[_0x176d0a(0x10c)][_0x176d0a(0xad)](),0x0,_0x5e07e1/0x2,_0x4d9217,_0x5e07e1/0x2,_0x176d0a(0x1fc)):_0x211234[_0x176d0a(0xba)](this[_0x176d0a(0x10c)][_0x176d0a(0xad)](),0x0,0x2,_0x4d9217-0x8,_0x5e07e1-0x4,_0x176d0a(0x16b));},Sprite_CTB_TurnOrder_Battler[_0x293f23(0x1a9)][_0x293f23(0xe5)]=function(){const _0x2e8b6a=_0x293f23,_0x1fde8c=this[_0x2e8b6a(0x26c)]();if(!_0x1fde8c)return;const _0x568641=_0x1fde8c[_0x2e8b6a(0x26c)]();if(!_0x568641)return;const _0x4ad5ed=_0x568641['mainSprite']();if(!_0x4ad5ed)return;this[_0x2e8b6a(0x1c2)](_0x4ad5ed[_0x2e8b6a(0x121)]);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x293f23(0x11c)]=function(){return this['battler']();},VisuMZ[_0x293f23(0xd1)]['Window_Help_setItem']=Window_Help[_0x293f23(0x1a9)][_0x293f23(0x27f)],Window_Help[_0x293f23(0x1a9)][_0x293f23(0x27f)]=function(_0x5de365){const _0x109e4c=_0x293f23;if(BattleManager[_0x109e4c(0x1ad)]()&&_0x5de365&&_0x5de365[_0x109e4c(0x27a)]&&_0x5de365['note'][_0x109e4c(0x11f)](/<(?:CTB) HELP>\s*([\s\S]*)\s*<\/(?:CTB) HELP>/i))this[_0x109e4c(0xe9)](String(RegExp['$1']));else{if(_0x109e4c(0x277)!=='OVVvt')return(this[_0x109e4c(0x26b)]()*_0x330184-this[_0x109e4c(0x13f)])/this[_0x109e4c(0x147)]();else VisuMZ[_0x109e4c(0xd1)][_0x109e4c(0x289)][_0x109e4c(0x122)](this,_0x5de365);}},VisuMZ[_0x293f23(0xd1)][_0x293f23(0x1c4)]=Window_StatusBase['prototype'][_0x293f23(0x1d9)],Window_StatusBase['prototype'][_0x293f23(0x1d9)]=function(_0x499dc6,_0x6d7473,_0xd33475,_0x26c089){const _0x13e9dc=_0x293f23;if(BattleManager[_0x13e9dc(0x1ad)]()&&_0x6d7473===_0x13e9dc(0x16d))return;VisuMZ[_0x13e9dc(0xd1)][_0x13e9dc(0x1c4)][_0x13e9dc(0x122)](this,_0x499dc6,_0x6d7473,_0xd33475,_0x26c089);};function Window_CTB_TurnOrder(){const _0x511e4a=_0x293f23;this[_0x511e4a(0x20a)](...arguments);}Window_CTB_TurnOrder[_0x293f23(0x1a9)]=Object[_0x293f23(0x11a)](Window_Base[_0x293f23(0x1a9)]),Window_CTB_TurnOrder[_0x293f23(0x1a9)][_0x293f23(0x111)]=Window_CTB_TurnOrder,Window_CTB_TurnOrder[_0x293f23(0xdc)]=VisuMZ['BattleSystemCTB'][_0x293f23(0xdc)][_0x293f23(0x248)],Window_CTB_TurnOrder[_0x293f23(0x1a9)][_0x293f23(0x20a)]=function(){const _0x312ff3=_0x293f23,_0x33918e=this[_0x312ff3(0x297)]();this[_0x312ff3(0x272)]=_0x33918e['x'],this[_0x312ff3(0x281)]=_0x33918e['y'],Window_Base[_0x312ff3(0x1a9)][_0x312ff3(0x20a)][_0x312ff3(0x122)](this,_0x33918e),this[_0x312ff3(0x19d)](),this[_0x312ff3(0x1bb)](),this['opacity']=0x0;},Window_CTB_TurnOrder[_0x293f23(0x1a9)][_0x293f23(0x297)]=function(){const _0x35c2bd=_0x293f23,_0x554ea2=Window_CTB_TurnOrder[_0x35c2bd(0xdc)],_0x14e73b=SceneManager[_0x35c2bd(0x23d)]['_statusWindow']['height'],_0x24e2c2=SceneManager['_scene'][_0x35c2bd(0xbf)][_0x35c2bd(0x210)],_0x46b430=_0x554ea2[_0x35c2bd(0x17d)];let _0x2756d9=0x0,_0x22ff79=0x0,_0x31a3bf=0x0,_0x2d0f94=0x0;switch(_0x554ea2['DisplayPosition']){case _0x35c2bd(0x13a):_0x2756d9=_0x554ea2[_0x35c2bd(0x25c)]*_0x554ea2[_0x35c2bd(0x1da)]+_0x46b430,_0x22ff79=_0x554ea2[_0x35c2bd(0x1a3)],_0x31a3bf=Math[_0x35c2bd(0x204)]((Graphics[_0x35c2bd(0x220)]-_0x2756d9)/0x2),_0x2d0f94=_0x554ea2['ScreenBuffer'];break;case _0x35c2bd(0x1a0):_0x2756d9=_0x554ea2[_0x35c2bd(0x25c)]*_0x554ea2[_0x35c2bd(0x1da)]+_0x46b430,_0x22ff79=_0x554ea2[_0x35c2bd(0x1a3)],_0x31a3bf=Math[_0x35c2bd(0x204)]((Graphics['width']-_0x2756d9)/0x2),_0x2d0f94=Graphics[_0x35c2bd(0x210)]-_0x14e73b-_0x22ff79-_0x554ea2[_0x35c2bd(0x137)];break;case _0x35c2bd(0x1de):_0x2756d9=_0x554ea2[_0x35c2bd(0x1a3)],_0x22ff79=_0x554ea2['SpriteThin']*_0x554ea2[_0x35c2bd(0x201)]+_0x46b430,_0x31a3bf=_0x554ea2[_0x35c2bd(0x137)],_0x2d0f94=Math[_0x35c2bd(0x204)]((Graphics[_0x35c2bd(0x210)]-_0x14e73b+_0x24e2c2-_0x22ff79)/0x2);break;case'right':_0x2756d9=_0x554ea2[_0x35c2bd(0x1a3)],_0x22ff79=_0x554ea2[_0x35c2bd(0x25c)]*_0x554ea2['TotalVertSprites']+_0x46b430,_0x31a3bf=Graphics[_0x35c2bd(0x220)]-_0x2756d9-_0x554ea2[_0x35c2bd(0x137)],_0x2d0f94=Math[_0x35c2bd(0x204)]((Graphics[_0x35c2bd(0x210)]-_0x14e73b+_0x24e2c2-_0x22ff79)/0x2);break;}return _0x31a3bf+=_0x554ea2[_0x35c2bd(0x24e)],_0x2d0f94+=_0x554ea2[_0x35c2bd(0x98)],new Rectangle(_0x31a3bf,_0x2d0f94,_0x2756d9,_0x22ff79);},Window_CTB_TurnOrder['prototype'][_0x293f23(0x167)]=function(){const _0x6c5adf=_0x293f23;this[_0x6c5adf(0x182)]=0x0;},Window_CTB_TurnOrder[_0x293f23(0x1a9)][_0x293f23(0xef)]=function(){const _0x52c34f=_0x293f23,_0x1aac4a=Window_CTB_TurnOrder[_0x52c34f(0xdc)],_0x57f852=[_0x52c34f(0x13a),_0x52c34f(0x1a0)][_0x52c34f(0x1f1)](_0x1aac4a[_0x52c34f(0x193)]);return _0x57f852;},Window_CTB_TurnOrder[_0x293f23(0x1a9)][_0x293f23(0x19d)]=function(){const _0x4c0822=_0x293f23,_0x596fc7=Window_CTB_TurnOrder[_0x4c0822(0xdc)],_0x52b2dd=this['isHorz'](),_0x44f095=_0x52b2dd?_0x596fc7[_0x4c0822(0x1da)]:_0x596fc7[_0x4c0822(0x201)];this[_0x4c0822(0x15f)]=new Sprite(),this[_0x4c0822(0x28e)](this['_turnOrderInnerSprite']),this[_0x4c0822(0x1ac)]=[];for(let _0x22bcaf=0x0;_0x22bcaf<$gameParty[_0x4c0822(0x106)]();_0x22bcaf++){if(_0x4c0822(0x164)===_0x4c0822(0x164))for(let _0x178369=0x0;_0x178369<_0x44f095;_0x178369++){if(_0x4c0822(0x1e6)===_0x4c0822(0x1f0))_0x59d0df[_0x4c0822(0x18d)](_0x306244(_0x31b859['$1']));else{const _0x3976ab=new Sprite_CTB_TurnOrder_Battler($gameParty,_0x22bcaf,_0x178369);this[_0x4c0822(0x15f)][_0x4c0822(0xf2)](_0x3976ab),this[_0x4c0822(0x1ac)][_0x4c0822(0x287)](_0x3976ab);}}else _0x6d33c5['isCTB']()&&_0x51f5ea&&_0x4c5993['note']&&_0x443235[_0x4c0822(0x27a)]['match'](/<(?:CTB) HELP>\s*([\s\S]*)\s*<\/(?:CTB) HELP>/i)?this[_0x4c0822(0xe9)](_0x2f5c2f(_0x507247['$1'])):_0x35193f[_0x4c0822(0xd1)]['Window_Help_setItem'][_0x4c0822(0x122)](this,_0x555e0e);}for(let _0x582dc9=0x0;_0x582dc9<$gameTroop[_0x4c0822(0xb7)]()[_0x4c0822(0x1a6)];_0x582dc9++){if('HJKkw'!==_0x4c0822(0x166))_0x1b4e74['BattleSystemCTB'][_0x4c0822(0x289)][_0x4c0822(0x122)](this,_0x4e0f4c);else for(let _0xe05074=0x0;_0xe05074<_0x44f095;_0xe05074++){const _0x1a63e6=new Sprite_CTB_TurnOrder_Battler($gameTroop,_0x582dc9,_0xe05074);this[_0x4c0822(0x15f)][_0x4c0822(0xf2)](_0x1a63e6),this[_0x4c0822(0x1ac)][_0x4c0822(0x287)](_0x1a63e6);}}},Window_CTB_TurnOrder[_0x293f23(0x1a9)]['update']=function(){const _0x59fd4c=_0x293f23;Window_Base[_0x59fd4c(0x1a9)][_0x59fd4c(0xe3)][_0x59fd4c(0x122)](this),this[_0x59fd4c(0x214)](),this[_0x59fd4c(0x1bb)]();},Window_CTB_TurnOrder['prototype'][_0x293f23(0x214)]=function(){const _0x102b3c=_0x293f23,_0x2a2e36=Window_CTB_TurnOrder[_0x102b3c(0xdc)];if(_0x2a2e36[_0x102b3c(0x193)]!==_0x102b3c(0x13a))return;if(!_0x2a2e36[_0x102b3c(0x186)])return;const _0x7da7eb=SceneManager[_0x102b3c(0x23d)][_0x102b3c(0xbf)];if(!_0x7da7eb)return;_0x7da7eb[_0x102b3c(0x291)]?(this['x']=this[_0x102b3c(0x272)]+(_0x2a2e36[_0x102b3c(0x172)]||0x0),this['y']=this[_0x102b3c(0x281)]+(_0x2a2e36[_0x102b3c(0x205)]||0x0)):(this['x']=this['_homeX'],this['y']=this['_homeY']);const _0x5260d0=SceneManager[_0x102b3c(0x23d)][_0x102b3c(0x13b)];Window_CTB_TurnOrder[_0x102b3c(0xa3)]===undefined&&(Window_CTB_TurnOrder['_ogWindowLayerX']=Math[_0x102b3c(0x1d2)]((Graphics[_0x102b3c(0x220)]-Math[_0x102b3c(0x253)](Graphics[_0x102b3c(0x1a7)],_0x5260d0['width']))/0x2),Window_CTB_TurnOrder[_0x102b3c(0xa9)]=Math[_0x102b3c(0x1d2)]((Graphics['height']-Math[_0x102b3c(0x253)](Graphics[_0x102b3c(0x17e)],_0x5260d0['height']))/0x2)),this['x']+=_0x5260d0['x']-Window_CTB_TurnOrder[_0x102b3c(0xa3)],this['y']+=_0x5260d0['y']-Window_CTB_TurnOrder[_0x102b3c(0xa9)];},Window_CTB_TurnOrder['prototype']['updateBattleContainerOrder']=function(){const _0x55641b=_0x293f23;if(!this[_0x55641b(0x15f)])return;const _0x1ac14d=this['_turnOrderInnerSprite'][_0x55641b(0x21d)];if(!_0x1ac14d)return;_0x1ac14d[_0x55641b(0xf0)](this[_0x55641b(0x187)][_0x55641b(0x173)](this));},Window_CTB_TurnOrder[_0x293f23(0x1a9)][_0x293f23(0x187)]=function(_0x42e177,_0x37e360){const _0x1e7725=_0x293f23,_0x5ed3b2=this['isHorz'](),_0x6f1fa=Window_CTB_TurnOrder['Settings'][_0x1e7725(0x10e)];if(_0x5ed3b2&&!_0x6f1fa)return _0x42e177['x']-_0x37e360['x'];else{if(_0x5ed3b2&&_0x6f1fa)return _0x37e360['x']-_0x42e177['x'];else{if(!_0x5ed3b2&&_0x6f1fa)return _0x42e177['y']-_0x37e360['y'];else{if(!_0x5ed3b2&&!_0x6f1fa){if(_0x1e7725(0x1ae)===_0x1e7725(0x1ae))return _0x37e360['y']-_0x42e177['y'];else this[_0x1e7725(0x212)]==='casting'&&(this[_0x1e7725(0x13f)]+=this['tpbAcceleration'](),this[_0x1e7725(0x13f)]>=this[_0x1e7725(0x26b)]()&&(this[_0x1e7725(0x212)]=_0x1e7725(0x1cc)));}}}}},Window_CTB_TurnOrder[_0x293f23(0x1a9)][_0x293f23(0x1bb)]=function(){const _0x40ea56=_0x293f23;this['visible']=$gameSystem[_0x40ea56(0x221)]();},Window_CTB_TurnOrder[_0x293f23(0x1a9)][_0x293f23(0xca)]=function(_0x37f00a){const _0x45b4d6=_0x293f23;this[_0x45b4d6(0x1ec)](),this[_0x45b4d6(0x1ac)]['sort']((_0x532ca2,_0x17d3e6)=>{return _0x532ca2['ticksLeft']()-_0x17d3e6['ticksLeft']();});if(!_0x37f00a)return;for(const _0xde739a of this['_turnOrderContainer']){if('VXGdF'==='xTSXf')this[_0x45b4d6(0x291)]=_0x2339c1[_0x45b4d6(0x221)]();else{if(!_0xde739a)continue;_0xde739a[_0x45b4d6(0xe3)](),_0xde739a['_positionDuration']=0x0;}}},Window_CTB_TurnOrder['prototype'][_0x293f23(0x14f)]=function(_0x117b25){const _0x1a0eba=_0x293f23;for(const _0x38fad8 of this[_0x1a0eba(0x1ac)]){if(_0x1a0eba(0x232)==='GHLXE')_0x8e2210[_0x1a0eba(0x19e)](),_0x5018d4[_0x1a0eba(0xab)]()&&this[_0x1a0eba(0x235)](),_0x1b3018[_0x1a0eba(0x177)]();else{if(!_0x38fad8)continue;if(_0x38fad8['battler']()!==_0x117b25)continue;_0x38fad8[_0x1a0eba(0x1b5)]();}}};
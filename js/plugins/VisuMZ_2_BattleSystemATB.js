//=============================================================================
// VisuStella MZ - Battle System ATB - Active Turn Battle
// VisuMZ_2_BattleSystemATB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemATB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemATB = VisuMZ.BattleSystemATB || {};
VisuMZ.BattleSystemATB.version = 1.24;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.24] [BattleSystemATB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_ATB_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The RPG Maker MZ Time Progress Battle (TPB) system is only a few steps away
 * from the acclaimed Active Turn Battle (ATB) system. This plugin will grant
 * it the various features needed to turn it from TPB into ATB.
 * 
 * This plugin will grant control over how the various mechanics work, ranging
 * from penalties to calculations, to actions that can manipulate the ATB gauge
 * of battlers. Battlers that are in the middle of casting a spell can also be
 * interrupted with specific notetag traits.
 * 
 * ATB Gauges can also be displayed on enemies and/or allies, giving the player
 * full access to the current battle state. The ATB Gauges are also improved,
 * showing different colors for different states and showing a new gauge for
 * the casting state.
 * 
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB/ATB mechanics such as speed, calculations, etc.
 * * Notetags that give skills and items access to ATB Gauge manipulation, by
 *   altering how filled they are.
 * * Interrupts can be used on battlers in the middle of casting a skill.
 * * Visual ATB Gauges can be displayed over battlers' heads.
 * * ATB Gauges have extra coloring options added to them to let the player
 *   quickly know the current speed state of the ATB Gauge.
 * * A field-wide ATB Gauge that positions actor and enemy markers on it to
 *   show how far along actors and enemies are relative to each other's turns.
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
 * - VisuMZ_1_BattleCore
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
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
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
 * ATB Gauges
 * 
 * The gauges are now revamped to show different colors to depict the various
 * ATB states a battler can be in. These various states include the following:
 * 
 * - When a battler's speed is fully stopped.
 * - When a battler's speed is slower/faster past a specific rating.
 * - When a battler is ready for an action.
 * - When a battler is casting an action (those with negative speed values).
 * 
 * The colors used for these states can be found and altered in the Plugin
 * Parameters under Gauge Color Settings.
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
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to ATB,
 * skills and items with positive speed values will have an impact on how full
 * their ATB Gauges will be in the following turn. A value of 2000 will put the
 * gauge at 50% full, 1000 will put the gauge at 25% full, 500 will put it at
 * 12.5% full, and so on. Notetags can also be used to influence this.
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 *
 * - ATB Interrupts can have animations played when they trigger if the
 * VisuStella Core Engine is installed.
 *
 * ---
 * 
 * VisuMZ_1_OptionsCore
 * 
 * - Having the VisuStella Options Core available will allow you to adjust the
 * speed at which the ATB gauges fill up.
 * 
 * - The VisuStella Options Core also gives the player the option to toggle
 * between Active and Wait-based ATB.
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
 * === General ATB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 *
 * ---
 * 
 * <ATB Help>
 *  description
 *  description
 * </ATB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under TPB/ATB.
 * - This is primarily used if the skill behaves differently in TPB/ATB versus
 *   any other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to TPB/ATB.
 * 
 * ---
 *
 * <Hide ATB Gauge>
 *
 * - Used for: Enemy Notetags
 * - If you don't want an enemy to show their ATB Gauge, use this notetag.
 * 
 * ---
 * 
 * === ATB Field Gauge-Related Notetags ===
 * 
 * These notetags only work if the ATB Field Gauge is enabled.
 * 
 * ---
 *
 * <ATB Field Gauge Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <ATB Field Gauge Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <ATB Field Gauge Face: Monster, 1>
 * 
 * ---
 * 
 * === ATB Gauge Manipulation-Related Notetags ===
 * 
 * These notetags are used for ATB Gauge manipulation purposes.
 * 
 * ---
 *
 * <ATB After Gauge: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's ATB Gauge will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   ATB Gauge to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <ATB Charge Gauge: x%>
 * <ATB Charge Gauge: +x%>
 * <ATB Charge Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <ATB Cast Gauge: x%>
 * <ATB Cast Gauge: +x%>
 * <ATB Cast Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 *
 * <ATB Interrupt>
 *
 * - Used for: Skill, Item Notetags
 * - If this skill/item hits a target who is in a casting state, interrupt that
 *   action to cancel it and reset the target's ATB Gauge to 0%.
 * 
 * ---
 *
 * <ATB Cannot Be Interrupted>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill/item immune to ATB Interruptions.
 * 
 * ---
 * 
 * <ATB Battle Start Gauge: +x%>
 * <ATB Battle Start Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determine how much extra or less ATB Gauge the battler will start with if
 *   associated with one of these database objects.
 * - Replace 'x' with a percentile value determining how much extra or less ATB
 *   Gauge value the battler will start battle with.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * <ATB After Gauge: +x%>
 * <ATB After Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Determine how much influence there is on the ATB Gauge after finishing a
 *   skill/item. Increase or decrease the amount after each action.
 * - Replace 'x' with a percentile value determining how much influence there
 *   is on the ATB Gauge after the skill/item has finished performing.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * === JavaScript Notetags: ATB Gauge Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional ATB Gauge Manipulation.
 * 
 * ---
 * 
 * <JS ATB Charge Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Charge Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a charging state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS ATB Cast Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Cast Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a casting state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS ATB After Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB After Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to after performing this skill/item action.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
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
 * Actor: Change Field Gauge Icon
 * - Changes the icons used for the specific actor(s) on the ATB Field Gauge.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change Field Gauge Face
 * - Changes the faces used for the specific actor(s) on the ATB Field Gauge.
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
 * Actor: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the actor(s).
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
 * Enemy: Change Field Gauge Icon
 * - Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change Field Gauge Face
 * - Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
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
 * Enemy: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the enemy(ies).
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
 * System: ATB Field Gauge Visibility
 * - Determine the visibility of the ATB Field Gauge.
 * 
 *   Visibility:
 *   - Changes the visibility of the ATB Field Gauge.
 * 
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System ATB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * Mechanics
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 * 
 *   Stuns Reset Gauge?:
 *   - Should stuns reset the ATB Gauge?
 * 
 *   JS: Initial Gauge:
 *   - JavaScript code to determine how much ATB gauge to give each battler at
 *     the start of battle.
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
 * Plugin Parameters: Interrupt Settings
 * ============================================================================
 *
 * Interrupt settings used for Battle System ATB.
 *
 * ---
 *
 * Interrupt
 * 
 *   Animation ID:
 *   - Play this animation when a unit is interrupted.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mirror Animation:
 *     - Mirror the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mute Animation:
 *     - Mute the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *   Text Popup:
 *   - Text used for popup when interrupts happen.
 *   - Leave empty for no popup.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *     Flash Color:
 *     - Adjust the popup's flash color.
 *     - Format: [red, green, blue, alpha]
 * 
 *     Flash Duration:
 *     - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Gauge Settings
 * ============================================================================
 *
 * General gauge settings used for ATB Gauges.
 *
 * ---
 *
 * General
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the ATB Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the ATB Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the ATB Gauge's X/Y by?
 *
 * ---
 *
 * AGI Gauge Rates
 * 
 *   Slow Rate:
 *   - How much should the AGI rate be at to be considered slow?
 * 
 *   Fast Rate:
 *   - How much should the AGI rate be at to be considered fast?
 *
 * ---
 *
 * Actors
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Show Status Gauges:
 *   - Show ATB Gauges in the status window?
 *   - Applies only to sideview.
 *
 * ---
 *
 * Enemies
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the enemy sprites' heads?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Field Gauge Settings
 * ============================================================================
 * 
 * The ATB Field Gauge is a large gauge placed on the screen with all of the
 * current battle's active participants shown on it. The participants are
 * represented by a marker. Each marker's position on the gauge indicates its
 * battler's ATB progress towards a turn.
 * 
 * In order for this feature to work, enable "Use Field Gauge?" in the
 * Plugin Parameters.
 *
 * ---
 *
 * General
 * 
 *   Use Field Gauge?:
 *   - This value must be set to true in order for the ATB Field Gauge
 *     to appear.
 *   - This needs to be on in order for this feature to work.
 * 
 *   Display Position:
 *   - Select where the Field Gauge will appear on the screen.
 *   - Top
 *   - Bottom
 *   - Left
 *   - Right
 * 
 *   Offset X:
 *   Offset Y:
 *   - How much to offset the X/Y coordinates by.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the gauge when the
 *     help window is open?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Field Gauge.
 *   - Settings may vary depending on position.
 *   - Left to Right
 *   - Right to Left
 *   - Up to Down
 *   - Down to Up
 *
 * ---
 *
 * Field Gauge Settings
 * 
 *   Gauge Skin:
 *   - Optional. Select an image to place behind the gauge.
 *   - This will be centered on the Field Gauge's position.
 * 
 *   Show Gauge?:
 *   - Decide if you want the gauge to be shown.
 * 
 *   Horizontal Length:
 *   - The length of the Field Gauge if placed horizontally.
 * 
 *   Vertical Length:
 *   - The length of the Field Gauge if placed vertically.
 * 
 *   Thickness:
 *   - The thickness of the Field Gauge for either direction.
 * 
 *   Split Location:
 *   - Determine where the gauge should split.
 *   - Use 0.00 for the start. Use 1.00 for the end.
 *
 * ---
 *
 * Marker Sprites
 * 
 *   Actor Marker Side:
 *   - Which side do you want the actor markers to appear?
 * 
 *   Enemy Marker Side:
 *   - Which side do you want the enemy markers to appear?
 * 
 *   Marker Offset:
 *   - How many pixels do you want to offset the markers by?
 * 
 *   Marker Size:
 *   - How pixels wide and tall do you want the markers to be?
 * 
 *   Marker Speed:
 *   - How many pixels maximum can a marker travel in one frame?
 * 
 *   Opacity Rate:
 *   - If a marker has to change opacity, how fast should it change by?
 *
 * ---
 *
 * Marker Border
 * 
 *   Show Border?:
 *   - Show borders for the marker sprites?
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
 * Marker Sprites
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
 * Marker Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the marker sprite?
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
 * Marker Background
 * 
 *   Show Background?:
 *   - Show the background on the marker sprite?
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
 * Marker Arrow
 * 
 *   Show Arrow?:
 *   - Show the arrow sprite pointing towards the Field Gauge?
 * 
 *   Arrow Skin:
 *   - Pick a window skin to draw arrows from.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Color Settings
 * ============================================================================
 *
 * Gauge color settings used for ATB Gauges.
 *
 * ---
 *
 * Colors
 * 
 *   Default Color 1:
 *   Default Color 2:
 *   Full Color 1:
 *   Full Color 2:
 *   Cast Color 1:
 *   Cast Color 2:
 *   Fast Color 1:
 *   Fast Color 2:
 *   Slow Color 1:
 *   Slow Color 2:
 *   Stop Color 1:
 *   Stop Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings used for Battle System ATB.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show ATB Gauges' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
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
 * Version 1.24: December 15, 2022
 * * Bug Fixes!
 * ** The Battle Core's <JS Pre-Start Turn> and <JS Post-Start Turn> notetags
 *    were previously disabled by this plugin. They should now be working again
 *    without problems. Fix made by Olivia.
 * 
 * Version 1.23: November 10, 2022
 * * Bug Fixes!
 * ** ATB Gauges will now display for ANIMATED sideview enemies depending on
 *    the Show Enemy Gauge setting. Fix made by Olivia.
 * 
 * Version 1.22: September 29, 2022
 * * Bug Fixes!
 * ** After enemies recover from a stun, enemies no longer take an immediate
 *    action regardless of their time gauge state. Fix made by Olivia.
 * 
 * Version 1.21: August 25, 2022
 * * Bug Fixes!
 * ** Restricted enemies will no longer be action-locked after removing the
 *    restriction state. Fix made by Olivia.
 * 
 * Version 1.20: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the ATB Field Gauge faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.19: July 21, 2022
 * * Bug Fixes!
 * ** Battlers under a "Cannot Move" state will no longer reset their ATB gauge
 *    after their "turn" comes up to update it. Fix made by Olivia.
 * 
 * Version 1.18: June 2, 2022
 * * Bug Fixes!
 * ** Notetag effect for <ATB After Gauge: x%> should now be working properly.
 *    Fix made by Olivia.
 * ** Notetag effect for <JS ATB After Gauge> should now be working properly.
 *    Fix made by Olivia.
 * 
 * Version 1.17: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: August 13, 2021
 * * Bug Fixes!
 * ** Crash prevented with certain Plugin Parameter combinations enabled when
 *    the ATB Gauge is filled up. Fix made by Irina.
 * 
 * Version 1.15: July 23, 2021
 * * Bug Fixes!
 * ** When enemies appear out from a troop event, Visual ATB Gauges above their
 *    heads should now appear properly for SV Enemies, too. Fix made by Irina.
 * 
 * Version 1.14: July 16, 2021
 * * Bug Fixes!
 * ** When enemies appear out from a troop event, Visual ATB Gauges above their
 *    heads should now appear properly. Fix made by Olivia.
 * 
 * Version 1.13: May 21, 2021
 * * Bug Fixes!
 * ** When slip damage is allowed to kill, dying actors will have their TPB
 *    state reset to charging in order to prevent lock-ups. Fix by Olivia.
 * 
 * Version 1.12: May 7, 2021
 * * Feature Update!
 * ** Actions with 0 or positive speed will now act immediately without
 *    allowing a single gauge tick pass through. Update made by Olivia.
 * 
 * Version 1.11: April 16, 2021
 * * Bug Fixes!
 * ** ATB Gauge visibility is now properly updated across various events such
 *    as party removal and other obstruction effects. Fix made by Olivia.
 * 
 * Version 1.10: March 12, 2021
 * * Hot Fix!
 * ** Fixed calculation errors due to field gauge. Fix made by Olivia.
 * * Feature Update!
 * ** Slight change to the way calculations are made for the bottom aligned
 *    field gauge position. Update made by Olivia.
 * 
 * Version 1.09: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.08: November 22, 2020
 * * Feature Update!
 * ** ATB Interrupts will not clear all actions (including queued ones) for
 *    mechanical compatibility. Change made by Yanfly.
 * 
 * Version 1.07: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change Field Gauge Face
 * **** Changes the faces used for the specific actor(s) on the ATB
 *      Field Gauge.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin should now be compatible with older saves when changing to a save
 *    that didn't use a Field Gauge to one that does. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <ATB Field Gauge Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Documentation Update
 * ** Help file updated with new features.
 * * Feature Update!
 * ** Enemy letters are no longer drawn on the Field Gauge unless there are
 *    multiple enemies of the same type. Added by Arisu.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and Yanfly.
 * *** Plugin Parameters > Field Gauge > Offset X and Y
 * **** How much to offset the X/Y coordinates of the Field Gauge by.
 * 
 * Version 1.02: October 4, 2020
 * * New Features!
 * ** New Plugin Command added "System: ATB Field Gauge Visibility" to let you
 *    show or hide the Field Gauge during battle. Added by Arisu.
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** ATB Cast and Charge notetags no longer cause crashes. Fix made by Olivia.
 * * New Features!
 * ** New plugin parameter added by Olivia.
 * *** Plugin Parameters > Mechanics > Stuns Reset Gauge?
 * **** Should stuns reset the ATB Gauge?
 *
 * Version 1.00: September 21, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeActorIcon
 * @text Actor: Change Field Gauge Icon
 * @desc Changes the icons used for the specific actor(s) on the ATB Field Gauge.
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
 * @command FieldGaugeActorFace
 * @text Actor: Change Field Gauge Face
 * @desc Changes the faces used for the specific actor(s) on the ATB Field Gauge.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeClearActorGraphic
 * @text Actor: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the actor(s).
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
 * @command FieldGaugeEnemyIcon
 * @text Enemy: Change Field Gauge Icon
 * @desc Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
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
 * @command FieldGaugeEnemyFace
 * @text Enemy: Change Field Gauge Face
 * @desc Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
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
 * @command FieldGaugeClearEnemyGraphic
 * @text Enemy: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the enemy(ies).
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
 * @command SystemFieldGaugeVisibility
 * @text System: ATB Field Gauge Visibility
 * @desc Determine the visibility of the ATB Field Gauge.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the ATB Field Gauge.
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
 * @param BattleSystemATB
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
 * @desc Mechanics settings used for Battle System ATB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","StunsResetGauge:eval":"false","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.5","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Interrupt:struct
 * @text Interrupt Settings
 * @type struct<Interrupt>
 * @desc Interrupt settings used for Battle System ATB.
 * @default {"Interrupt":"","InterruptAnimationID:num":"11","InterruptMirror:eval":"false","InterruptMute:eval":"false","InterruptText:str":"INTERRUPTED!","InterruptTextColor:str":"0","InterruptFlashColor:eval":"[255, 0, 0, 160]","InterruptFlashDuration:num":"60"}
 *
 * @param Gauge:struct
 * @text General Gauge Settings
 * @type struct<Gauge>
 * @desc General gauge settings used for ATB Gauges.
 * @default {"General":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"2","AGIGaugeRates":"","SlowRate:num":"0.60","FastRate:num":"1.40","Actors":"","ShowActorGauge:eval":"true","ShowStatusGauge:eval":"false","Enemies":"","ShowEnemyGauge:eval":"true"}
 *
 * @param FieldGauge:struct
 * @text Field Gauge Settings
 * @type struct<FieldGauge>
 * @desc Make a field-wide ATB gauge for all the battlers.
 * @default {"General":"","UseFieldGauge:eval":"false","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","GaugeDirection:eval":"true","Gauge":"","GaugeSystemSkin:str":"","DrawGauge:eval":"true","GaugeLengthHorz:num":"600","GaugeLengthVert:num":"400","GaugeThick:num":"16","GaugeSplit:num":"0.70","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"48","Markers":"","ActorSide:eval":"true","EnemySide:eval":"false","MarkerOffset:num":"28","MarkerSize:num":"32","MarkerSpeed:num":"36","OpacityRate:num":"4","BorderThickness:num":"2","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"1","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"10","EnemyBgColor2:str":"18","EnemySystemBg:str":"","Arrow":"","ShowMarkerArrow:eval":"true","MarkerArrowWindowSkin:str":"Window"}
 *
 * @param Color:struct
 * @text Gauge Color Settings
 * @type struct<Color>
 * @desc Gauge color settings used for ATB Gauges.
 * @default {"default1:str":"26","default2:str":"27","full1:str":"14","full2:str":"6","cast1:str":"2","cast2:str":"10","fast1:str":"27","fast2:str":"18","slow1:str":"22","slow2:str":"23","stop1:str":"7","stop2:str":"8"}
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings used for Battle System ATB.
 * @default {"Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show ATB Gauges"}
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
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param StunsResetGauge:eval
 * @text Stuns Reset Gauge?
 * @parent General
 * @type boolean
 * @on Reset Gauge
 * @off Don't Reset
 * @desc Should stuns reset the ATB Gauge?
 * @default false
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Gauge
 * @parent JavaScript
 * @desc JavaScript code to determine how much ATB gauge to give
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
 * Interrupt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Interrupt:
 *
 * @param Interrupt
 *
 * @param InterruptAnimationID:num
 * @text Animation ID
 * @parent Interrupt
 * @type animation
 * @desc Play this animation when a unit is interrupted.
 * Requires VisuMZ_0_CoreEngine.
 * @default 11
 *
 * @param InterruptMirror:eval
 * @text Mirror Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptMute:eval
 * @text Mute Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptText:str
 * @text Text Popup
 * @parent Interrupt
 * @desc Text used for popup when interrupts happen.
 * Leave empty for no popup.
 * @default INTERRUPTED!
 *
 * @param InterruptTextColor:str
 * @text Text Color
 * @parent InterruptText:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param InterruptFlashColor:eval
 * @text Flash Color
 * @parent InterruptText:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param InterruptFlashDuration:num
 * @text Flash Duration
 * @parent InterruptText:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param General
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent General
 * @desc How large/small do you want the ATB Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's Y by?
 * @default 2
 *
 * @param AGIGaugeRates
 * @text AGI Gauge Rates
 *
 * @param SlowRate:num
 * @text Slow Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered slow?
 * @default 0.60
 *
 * @param FastRate:num
 * @text Fast Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered fast?
 * @default 1.40
 *
 * @param Actors
 *
 * @param ShowActorGauge:eval
 * @text Show Sprite Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowStatusGauge:eval
 * @text Show Status Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges in the status window?
 * Applies only to sideview.
 * @default false
 *
 * @param Enemies
 *
 * @param ShowEnemyGauge:eval
 * @text Show Sprite Gauges
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the enemy sprites' heads?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param default1:str
 * @text Default Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param default2:str
 * @text Default Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param full1:str
 * @text Full Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param full2:str
 * @text Full Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param cast1:str
 * @text Cast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param cast2:str
 * @text Cast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 10
 *
 * @param fast1:str
 * @text Fast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param fast2:str
 * @text Fast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param slow1:str
 * @text Slow Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param slow2:str
 * @text Slow Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param stop1:str
 * @text Stop Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param stop2:str
 * @text Stop Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show ATB Gauges' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show ATB Gauges
 *
 */
/* ----------------------------------------------------------------------------
 * Field Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FieldGauge:
 *
 * @param General
 *
 * @param UseFieldGauge:eval
 * @text Use Field Gauge?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc This value must be set to true in order for the ATB Field Gauge to appear.
 * @default false
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Field Gauge will appear on the screen.
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
 * gauge when the help window is open?
 * @default true
 *
 * @param GaugeDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Up to Down
 * @off Right to Left / Down to Up
 * @desc Decide on the direction of the Field Gauge.
 * Settings may vary depending on position.
 * @default true
 *
 * @param Gauge
 * @text Field Gauge Settings
 *
 * @param GaugeSystemSkin:str
 * @text Gauge Skin
 * @parent Gauge
 * @type file
 * @dir img/system/
 * @desc Optional. Select an image to place behind the gauge.
 * This will be centered on the Field Gauge's position.
 * @default 
 *
 * @param DrawGauge:eval
 * @text Show Gauge?
 * @parent Gauge
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Decide if you want the gauge to be shown.
 * @default true
 *
 * @param GaugeLengthHorz:num
 * @text Horizontal Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed horizontally.
 * @default 600
 *
 * @param GaugeLengthVert:num
 * @text Vertical Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed vertically.
 * @default 400
 *
 * @param GaugeThick:num
 * @text Thickness
 * @parent Gauge
 * @type number
 * @min 3
 * @desc The thickness of the Field Gauge for either direction.
 * @default 16
 *
 * @param GaugeSplit:num
 * @text Split Location
 * @parent Gauge
 * @desc Determine where the gauge should split.
 * Use 0.00 for the start. Use 1.00 for the end.
 * @default 0.70
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the gauge's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the gauge's Y coordinates by this much when
 * the Help Window is visible.
 * @default 48
 *
 * @param Markers
 * @text Marker Sprites
 *
 * @param ActorSide:eval
 * @text Actor Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the actor markers to appear?
 * @default true
 *
 * @param EnemySide:eval
 * @text Enemy Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the enemy markers to appear?
 * @default false
 *
 * @param MarkerOffset:num
 * @text Marker Offset
 * @parent Markers
 * @desc How many pixels do you want to offset the markers by?
 * @default 28
 *
 * @param MarkerSize:num
 * @text Marker Size
 * @parent Markers
 * @type number
 * @min 10
 * @desc How pixels wide and tall do you want the markers to be?
 * @default 32
 *
 * @param MarkerSpeed:num
 * @text Marker Speed
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels maximum can a marker travel in one frame?
 * @default 36
 *
 * @param OpacityRate:num
 * @text Opacity Rate
 * @parent Markers
 * @type number
 * @min 1
 * @desc If a marker has to change opacity, how fast should it change by?
 * @default 4
 *
 * @param Border
 * @text Marker Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the marker sprites?
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
 * @text Marker Sprites
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
 * @text Marker Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the marker sprite?
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
 * @text Marker Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the marker sprite?
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
 * @default 1
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
 * @default 10
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
 * @param Arrow
 * @text Marker Arrow
 *
 * @param ShowMarkerArrow:eval
 * @text Show Arrow?
 * @parent Arrow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the arrow sprite pointing towards the Field Gauge?
 * @default true
 *
 * @param MarkerArrowWindowSkin:str
 * @text Arrow Skin
 * @parent Arrow
 * @type file
 * @dir img/system/
 * @desc Pick a window skin to draw arrows from.
 * @default Window
 *
 */
//=============================================================================

const _0x31935f=_0x4bed;function _0x4cc3(){const _0x36652c=['InterruptAnimationID','jtmVZ','atbActive','_fieldAtbGaugeFaceIndex','BattleCore','UokqG','createBackgroundSprite','battleUIOffsetY','%1BgColor1','targetPositionOnGauge','floor','_fieldGaugeATB','icon','ctGaugeColor2','#000000','updateLetter','AddOption','createGaugeSprite','Enemy-%1-%2','createFieldGaugeSkin','currentMaxValue','isTpb','call','ryQRd','toUpperCase','(?:GAUGE|TIME|SPEED)','AamER','_graphicEnemy','visualAtbGauge','isAlive','AqgEe','EVAL','clearFieldAtbGraphics','slow','faceName','fieldAtbGraphicType','isAtbCastingState','Item-%1-%2','ARRAYFUNC','vMKHA','fieldAtbGraphicIconIndex','hJWjS','updateTpb','RepositionTopHelpY','maxCommands','_homeY','reduce','full%1','traitObjects','setupAtbGaugeSprite','pgwuX','addChildAt','enemy','CtmIF','atbCurrentMaxValue','setAtbCastTime','paramBuffRate','State-%1-%2','ready','isCTB','qBbwJ','fast','processBattleCoreJS','_statusType','JjGWz','makeData','setAtbChargeTime','_fieldGaugeATB_Container','name','FaceName','addBattleSystemATBShowGaugeCommand','createKeyJS','battleUIOffsetX','TpbSpeedCalcJS','Game_Action_applyGlobal','width','onRestrict','zquVw','IconSet','After','ShowMarkerArrow','ARRAYNUM','jQsDI','_fieldAtbGaugeGraphicType','top','Game_Battler_tpbRelativeSpeed','createChildren','%1SystemBorder','ShowEnemyGauge','mainSprite','GaugeLengthVert','ConvertParams','zuOgP','Gauge','FieldGaugeClearActorGraphic','createFieldAtbGraphicFaceIndex','Skill-%1-%2','targetOpacity','isSceneBattle','getColor','cNcoB','TpbCastTimeJS','changeIconGraphicBitmap','height','changeAtbCastTime','full','Sprite_Battler_update','disappear','svBattlerName','TpbAccelerationJS','cast%1','isGaugeHorizontal','isAppeared','updateBattleContainerOrder','applyGlobal','updateOpacity','length','version','_gaugeSprite','17233300vmEauv','UseFieldGauge','RegExp','Window_StatusBase_placeGauge','startTpbTurn','smGfe','faceHeight','fieldAtbGraphicFaceIndex','Game_Battler_startTpbCasting','changeSvActorGraphicBitmap','setBattleSystemATBFieldGaugeVisible','Game_Battler_tpbBaseSpeed','PsVdv','hasSvBattler','format','Options','removeChild','ZeEAd','kZTMM','isActiveTpb','AggroControlSystem','_graphicHue','Sprite_Gauge_gaugeColor1','AnchorX','ShowActorGauge','isTpbCharged','685pIgCui','lgmTy','process_VisuMZ_BattleSystemATB_JS_Notetags','Game_Battler_tpbAcceleration','createAllWindows','parse','eUCUW','checkAggroControlSystemOffsetYAdjustment','Game_Battler_onRestrict','_tpbChargeTime','getChildIndex','cast','_battlerContainer','Window_SideviewUiBattleStatus','FieldGauge','MarkerArrowWindowSkin','_tpbTurnCount','match','fXtjk','update','isActor','onAtbInterrupt','setHue','Game_Unit_updateTpb','%1SystemBg','setAtbAfterSpeed','aRrJK','BattleSystemATB','atbAcceleration','dewLZ','_graphicFaceIndex','applyItemUserEffect','create','EnemyBattlerFontSize','Actor-%1-%2','visible','anchor','clearActions','%1BgColor2','JzceH','Game_BattlerBase_appear','constructor','uGpDt','Mechanics','rVjRA','initialize','createBattlerContainer','Game_Battler_tpbRequiredCastTime','paramRate','isHidden','battlerHue','FieldGaugeEnemyIcon','Window_Options_addGeneralOptions','placeGauge','658tHTrXk','makeActions','actor','InterruptMirror','applyTpbPenalty','addLoadListener','_windowskin','Cast','atbInterrupt','jaCmV','applyItemBattleSystemATBUserEffect','Scene_Boot_onDatabaseLoaded','updateSelectionEffect','_letter','_index','appear','EnemyBattlerDrawLetter','ShowStatusGauge','stop','Parse_Notetags_CreateJS','Game_BattlerBase_die','createArrowSprite','sfiYD','ERIdA','updateGraphicHue','VyFOq','updateVisibility','FastRate','FieldGaugeClearEnemyGraphic','GPhkl','createAtbGaugeSprite','updateAtbGaugeSpriteVisibility','fillRect','LAJFO','InterruptMute','_windowLayer','gaugeHeight','PALYL','wFEmu','isATB','onDatabaseLoaded','setHomeLocation','bqgif','createBattlerSprite','members','IdInk','%1Side','ctGaugeColor1','undecided','_arrowSprite','IconIndex','includes','dPhtr','_unit','updateMain','NUM','ARRAYSTRUCT','changeFaceGraphicBitmap','_atbGaugeSprite','description','default','trim','EnemyBattlerFaceName','map','_tpbCastTime','cast1','numActions','AkhaD','loadSystem','removeState','BWtvZ','round','AYDbO','canMove','subject','1428086pmfAfA','YobwB','FUNC','Sprite_Battler_updateMain','startTpbCasting','_subject','charging','isEnemy','_tpbState','Scale','loadSvEnemy','MarkerSize','Game_Actor_clearActions','_graphicFaceName','cast2','ActorBattlerIcon','ColorManager_loadWindowskin','phMkp','boxHeight','tpbRelativeSpeed','11812AQpVXs','createFieldGaugeContainerATB','requestFauxAnimation','EnemyBattlerFontFace','updatePositionOffset','svActorHorzCells','Game_System_initialize','slow%1','OpacityRate','currentValue','Sprite_Enemy_createStateIconSprite','lineHeight','iqkuG','fgBau','ParseAllNotetags','_battler','_graphicIconIndex','Visible','item','sAZCC','setActionState','updateGraphic','ShowMarkerBorder','currentAction','11682XnMtyj','_onRestrictBypassAtbReset','Aggro','_graphicSv','exit','XcwOv','BmeEX','boxWidth','atbStopped','Color','createFieldAtbGraphicType','ceil','setItem','Window_Help_setItem','FtbfN','fieldAtbGraphicFaceName','bind','scale','DrawGauge','addChild','bottom','vbheH','casting','status','children','Actors','createJS','loadWindowskin','GaugeThick','maxBattleMembers','createActorSprites','YEZbW','parameters','TpbBaseSpeedCalcJS','AnchorY','opacity','atbGaugeColor','IxnxN','ConfigManager_applyData','Game_Battler_clearTpbChargeTime','drawText','battler','_atbFieldGaugeVisible','AdCKY','updateAtbGaugeSpritePosition','clamp','tpbChargeTime','BattleManager_isActiveTpb','dftZy','createGaugeBitmap','xHycA','Weapon-%1-%2','addGeneralOptions','min','FaceIndex','tpbBaseSpeed','loadFace','createFieldAtbGraphicIconIndex','Sprite_Gauge_currentValue','isAttack','isSideView','right','revive','_fieldAtbGaugeFaceName','#%1','InterruptText','clearTpbChargeTime','JPxRU','_fieldAtbGaugeIconIndex','showVisualAtbGauge','xuWDn','createFieldGaugeSpriteATB','isShowAtbGauge','ConfigManager_makeData','fast%1','updatePosition','canMakeTpbActionsAtStartTpbTurn','Window_BattleStatus','tpbSpeed','ABLiG','Name','_atbAfterSpeed','skills','initMembers','addBattleSystemATBCommands','Sprite_Gauge_currentMaxValue','_svBattlerSprite','createGraphicSprite','sort','zkQuy','FieldGaugeActorFace','svactor','gaugeColor2','allBattleMembers','Enemy','BattlerRelativeSpeedJS','Game_Battler_removeState','EthrH','return\x200','changeEnemyGraphicBitmap','gaugeBackColor','UNstK','ArNgM','blt','Sprite_Gauge_gaugeColor2','speed','VisuMZ_2_AggroControlSystem','default%1','hzGeU','applyATBPenalty','setup','WNYqG','_letterSprite','Scene_Options_maxCommands','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','LVRhE','createEnemySprites','Actor','Charge','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_skinSprite','drawGaugeBitmap','fontSize','prototype','svActorVertCells','isBattleSystemATBFieldGaugeVisible','iconHeight','gradientFillRect','jHNvK','Sprite_Enemy_startEffect','GaugeSystemSkin','makeDeepCopy','UArCL','createStateSprite','note','tpbAcceleration','time','_plural','faceWidth','atbCurrentValue','isAtbChargingState','4487077yLwXCn','fontFace','_homeX','ShowMarkerBg','_fnord','2096NEPDIe','EDglJ','addCommand','getAtbCastTimeRate','loadEnemy','gaugeColor1','makeTpbActions','abs','EnemyBattlerType','tYakq','RepositionTopForHelp','kPNcI','OffsetX','OffsetY','yjwyg','loadSvActor','Settings','Game_Battler_applyTpbPenalty','updatePositionOnGauge','initBattleSystemATB','_graphicType','SlowRate','registerCommand','createBattlerSprites','setFrame','vKTAD','applyGlobalBattleSystemATBEffects','NaqEV','atbSpeed','cZTfg','xnNHb','createFieldAtbGraphicFaceName','ZhBoV','ARRAYJSON','ActorBattlerType','STRUCT','createStateIconSprite','Game_Battler_tpbSpeed','setBattler','FieldGaugeEnemyFace','EnemyBattlerFaceIndex','BQTWa','DisplayOffsetY','tpbRequiredCastTime','createLetterSprite','ParseItemNotetags','process_VisuMZ_BattleSystemATB_CreateRegExp','GaugeDirection','toLowerCase','_backgroundSprite','Scene_Battle_createAllWindows','concat','Enemies','left','InterruptFlashDuration','JSON','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','face','setupBattleSystemATBColors','UvVzV','DisplayPosition','bitmap','battleMembers','PreStartTurnJS','VisibleGauge','BattleManager_endBattlerActions','RepositionTopHelpX','_horz','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','changeAtbChargeTime','some','startEffect','4356750iQpAdk','_graphicSprite','applyBattleSystemATBUserEffect','atbColor','setupArrowSprite','_helpWindow','_atbColors','%1BorderColor','processUpdateGraphic','applyData','MarkerOffset','ParseSkillNotetags','faceIndex','Game_Action_applyItemUserEffect','VisuMZ_0_CoreEngine','BorderThickness','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','StunsResetGauge','_scene','battlerName','2313SuOrNj','clearRect','compareBattlerSprites','STR','max'];_0x4cc3=function(){return _0x36652c;};return _0x4cc3();}(function(_0x2acb1a,_0x3eff16){const _0x4576c6=_0x4bed,_0x2b0dd5=_0x2acb1a();while(!![]){try{const _0x2b47e3=parseInt(_0x4576c6(0xfb))/0x1+-parseInt(_0x4576c6(0xb0))/0x2*(-parseInt(_0x4576c6(0x127))/0x3)+parseInt(_0x4576c6(0x10f))/0x4*(-parseInt(_0x4576c6(0x2ab))/0x5)+parseInt(_0x4576c6(0x201))/0x6+-parseInt(_0x4576c6(0x1b4))/0x7+-parseInt(_0x4576c6(0x1b9))/0x8*(-parseInt(_0x4576c6(0x215))/0x9)+-parseInt(_0x4576c6(0x291))/0xa;if(_0x2b47e3===_0x3eff16)break;else _0x2b0dd5['push'](_0x2b0dd5['shift']());}catch(_0x4f8bfc){_0x2b0dd5['push'](_0x2b0dd5['shift']());}}}(_0x4cc3,0xb3249));var label='BattleSystemATB',tier=tier||0x0,dependencies=['VisuMZ_1_BattleCore'],pluginData=$plugins['filter'](function(_0x5d2e79){const _0x51b23a=_0x4bed;return _0x5d2e79[_0x51b23a(0x13e)]&&_0x5d2e79[_0x51b23a(0xeb)][_0x51b23a(0xe3)]('['+label+']');})[0x0];VisuMZ[label][_0x31935f(0x1c9)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x31935f(0x275)]=function(_0x14518a,_0x164180){const _0x2dd494=_0x31935f;for(const _0xf2eaa7 in _0x164180){if(_0xf2eaa7[_0x2dd494(0x2bc)](/(.*):(.*)/i)){const _0x36c875=String(RegExp['$1']),_0x34caf4=String(RegExp['$2'])[_0x2dd494(0x232)]()[_0x2dd494(0xed)]();let _0x2232c9,_0x213f5f,_0x3d7477;switch(_0x34caf4){case _0x2dd494(0xe7):_0x2232c9=_0x164180[_0xf2eaa7]!==''?Number(_0x164180[_0xf2eaa7]):0x0;break;case _0x2dd494(0x26b):_0x213f5f=_0x164180[_0xf2eaa7]!==''?JSON[_0x2dd494(0x2b0)](_0x164180[_0xf2eaa7]):[],_0x2232c9=_0x213f5f[_0x2dd494(0xef)](_0xcebe72=>Number(_0xcebe72));break;case _0x2dd494(0x239):_0x2232c9=_0x164180[_0xf2eaa7]!==''?eval(_0x164180[_0xf2eaa7]):null;break;case'ARRAYEVAL':_0x213f5f=_0x164180[_0xf2eaa7]!==''?JSON[_0x2dd494(0x2b0)](_0x164180[_0xf2eaa7]):[],_0x2232c9=_0x213f5f[_0x2dd494(0xef)](_0x22e08b=>eval(_0x22e08b));break;case _0x2dd494(0x1f0):_0x2232c9=_0x164180[_0xf2eaa7]!==''?JSON['parse'](_0x164180[_0xf2eaa7]):'';break;case _0x2dd494(0x1da):_0x213f5f=_0x164180[_0xf2eaa7]!==''?JSON[_0x2dd494(0x2b0)](_0x164180[_0xf2eaa7]):[],_0x2232c9=_0x213f5f[_0x2dd494(0xef)](_0x5c778d=>JSON[_0x2dd494(0x2b0)](_0x5c778d));break;case _0x2dd494(0xfd):_0x2232c9=_0x164180[_0xf2eaa7]!==''?new Function(JSON[_0x2dd494(0x2b0)](_0x164180[_0xf2eaa7])):new Function(_0x2dd494(0x189));break;case _0x2dd494(0x240):_0x213f5f=_0x164180[_0xf2eaa7]!==''?JSON['parse'](_0x164180[_0xf2eaa7]):[],_0x2232c9=_0x213f5f[_0x2dd494(0xef)](_0x1e209c=>new Function(JSON[_0x2dd494(0x2b0)](_0x1e209c)));break;case _0x2dd494(0x218):_0x2232c9=_0x164180[_0xf2eaa7]!==''?String(_0x164180[_0xf2eaa7]):'';break;case'ARRAYSTR':_0x213f5f=_0x164180[_0xf2eaa7]!==''?JSON[_0x2dd494(0x2b0)](_0x164180[_0xf2eaa7]):[],_0x2232c9=_0x213f5f[_0x2dd494(0xef)](_0x17eda2=>String(_0x17eda2));break;case _0x2dd494(0x1dc):_0x3d7477=_0x164180[_0xf2eaa7]!==''?JSON['parse'](_0x164180[_0xf2eaa7]):{},_0x2232c9=VisuMZ[_0x2dd494(0x275)]({},_0x3d7477);break;case _0x2dd494(0xe8):_0x213f5f=_0x164180[_0xf2eaa7]!==''?JSON[_0x2dd494(0x2b0)](_0x164180[_0xf2eaa7]):[],_0x2232c9=_0x213f5f[_0x2dd494(0xef)](_0x1e9551=>VisuMZ['ConvertParams']({},JSON['parse'](_0x1e9551)));break;default:continue;}_0x14518a[_0x36c875]=_0x2232c9;}}return _0x14518a;},(_0x5ea438=>{const _0x5743eb=_0x31935f,_0x458d3d=_0x5ea438[_0x5743eb(0x25e)];for(const _0x15910c of dependencies){if(_0x5743eb(0xe4)==='qAKGs')return _0x43191f[_0x5743eb(0x2c6)][_0x5743eb(0x2da)][_0x5743eb(0x230)](this);else{if(!Imported[_0x15910c]){alert(_0x5743eb(0x19e)[_0x5743eb(0x29f)](_0x458d3d,_0x15910c)),SceneManager[_0x5743eb(0x12b)]();break;}}}const _0x10fc93=_0x5ea438[_0x5743eb(0xeb)];if(_0x10fc93['match'](/\[Version[ ](.*?)\]/i)){const _0x47a968=Number(RegExp['$1']);_0x47a968!==VisuMZ[label][_0x5743eb(0x28f)]&&(alert(_0x5743eb(0x211)[_0x5743eb(0x29f)](_0x458d3d,_0x47a968)),SceneManager['exit']());}if(_0x10fc93[_0x5743eb(0x2bc)](/\[Tier[ ](\d+)\]/i)){const _0x3fece7=Number(RegExp['$1']);_0x3fece7<tier?(alert(_0x5743eb(0x1fd)['format'](_0x458d3d,_0x3fece7,tier)),SceneManager[_0x5743eb(0x12b)]()):tier=Math[_0x5743eb(0x219)](_0x3fece7,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x5743eb(0x1c9)],_0x5ea438[_0x5743eb(0x147)]);})(pluginData),PluginManager[_0x31935f(0x1cf)](pluginData['name'],'FieldGaugeActorIcon',_0x374f90=>{const _0xa5d53a=_0x31935f;VisuMZ[_0xa5d53a(0x275)](_0x374f90,_0x374f90);const _0x8d7eb6=_0x374f90[_0xa5d53a(0x140)],_0x5eec04=_0x374f90[_0xa5d53a(0xe2)];for(const _0x22cb82 of _0x8d7eb6){if(_0xa5d53a(0x234)!==_0xa5d53a(0x27e)){const _0x6a16e3=$gameActors[_0xa5d53a(0xb2)](_0x22cb82);if(!_0x6a16e3)continue;_0x6a16e3[_0xa5d53a(0x26d)]='icon',_0x6a16e3[_0xa5d53a(0x16b)]=_0x5eec04;}else{if(!_0x4af4a5['Settings'][_0xa5d53a(0x1b7)])return;const _0x175652=_0x53ffeb[_0xa5d53a(0x1c9)],_0xddc3a9=this[_0xa5d53a(0xe5)]===_0xe24294?_0xa5d53a(0x19c):'Enemy',_0x78711f='%1SystemBg'[_0xa5d53a(0x29f)](_0xddc3a9),_0x39b7c4=new _0x378b4b();_0x39b7c4[_0xa5d53a(0x2cf)]['x']=this['anchor']['x'],_0x39b7c4[_0xa5d53a(0x2cf)]['y']=this[_0xa5d53a(0x2cf)]['y'];if(_0x175652[_0x78711f])_0x39b7c4['bitmap']=_0x1b668f[_0xa5d53a(0xf4)](_0x175652[_0x78711f]);else{const _0x23d800=_0x175652['MarkerSize'];_0x39b7c4[_0xa5d53a(0x1f6)]=new _0x4e40ab(_0x23d800,_0x23d800);const _0x4ffcb7=_0x6399b3[_0xa5d53a(0x27d)](_0x175652[_0xa5d53a(0x222)['format'](_0xddc3a9)]),_0x2e7cc7=_0x420452[_0xa5d53a(0x27d)](_0x175652[_0xa5d53a(0x2d1)[_0xa5d53a(0x29f)](_0xddc3a9)]);_0x39b7c4['bitmap']['gradientFillRect'](0x0,0x0,_0x23d800,_0x23d800,_0x4ffcb7,_0x2e7cc7,!![]);}this['_backgroundSprite']=_0x39b7c4,this[_0xa5d53a(0x13a)](this[_0xa5d53a(0x1ea)]),this[_0xa5d53a(0x265)]=this['_backgroundSprite'][_0xa5d53a(0x265)],this[_0xa5d53a(0x281)]=this[_0xa5d53a(0x1ea)][_0xa5d53a(0x281)];}}}),PluginManager[_0x31935f(0x1cf)](pluginData[_0x31935f(0x25e)],_0x31935f(0x181),_0x32972c=>{const _0x450dd2=_0x31935f;VisuMZ[_0x450dd2(0x275)](_0x32972c,_0x32972c);const _0x15b476=_0x32972c[_0x450dd2(0x140)],_0x24e7fe=_0x32972c['FaceName'],_0x3e3ebb=_0x32972c['FaceIndex'];for(const _0x23c8e8 of _0x15b476){if(_0x450dd2(0x16a)===_0x450dd2(0x11b))this[_0x450dd2(0x2ce)]=_0x39c1ec['isBattleSystemATBFieldGaugeVisible']();else{const _0x470e93=$gameActors[_0x450dd2(0xb2)](_0x23c8e8);if(!_0x470e93)continue;_0x470e93[_0x450dd2(0x26d)]=_0x450dd2(0x1f2),_0x470e93['_fieldAtbGaugeFaceName']=_0x24e7fe,_0x470e93[_0x450dd2(0x21d)]=_0x3e3ebb;}}}),PluginManager['registerCommand'](pluginData[_0x31935f(0x25e)],_0x31935f(0x278),_0x1bd56d=>{const _0x61fca3=_0x31935f;VisuMZ[_0x61fca3(0x275)](_0x1bd56d,_0x1bd56d);const _0x2a14c0=_0x1bd56d[_0x61fca3(0x140)];for(const _0x525fc6 of _0x2a14c0){const _0x212eb1=$gameActors[_0x61fca3(0xb2)](_0x525fc6);if(!_0x212eb1)continue;_0x212eb1[_0x61fca3(0x23a)]();}}),PluginManager['registerCommand'](pluginData[_0x31935f(0x25e)],_0x31935f(0xad),_0x209e8c=>{const _0x34651e=_0x31935f;VisuMZ[_0x34651e(0x275)](_0x209e8c,_0x209e8c);const _0x313fb9=_0x209e8c[_0x34651e(0x1ed)],_0x506301=_0x209e8c[_0x34651e(0xe2)];for(const _0x24da0f of _0x313fb9){const _0x179687=$gameTroop[_0x34651e(0xdc)]()[_0x24da0f];if(!_0x179687)continue;_0x179687[_0x34651e(0x26d)]=_0x34651e(0x226),_0x179687[_0x34651e(0x16b)]=_0x506301;}}),PluginManager[_0x31935f(0x1cf)](pluginData[_0x31935f(0x25e)],_0x31935f(0x1e0),_0x5418a7=>{const _0x1ed72e=_0x31935f;VisuMZ[_0x1ed72e(0x275)](_0x5418a7,_0x5418a7);const _0x2fb022=_0x5418a7[_0x1ed72e(0x1ed)],_0x2cec46=_0x5418a7[_0x1ed72e(0x25f)],_0x4e720c=_0x5418a7[_0x1ed72e(0x15d)];for(const _0xe20299 of _0x2fb022){if(_0x1ed72e(0x25a)===_0x1ed72e(0x25a)){const _0x2c3644=$gameTroop[_0x1ed72e(0xdc)]()[_0xe20299];if(!_0x2c3644)continue;_0x2c3644[_0x1ed72e(0x26d)]=_0x1ed72e(0x1f2),_0x2c3644['_fieldAtbGaugeFaceName']=_0x2cec46,_0x2c3644[_0x1ed72e(0x21d)]=_0x4e720c;}else{if(!_0x285590[_0x1ed72e(0xd7)]())return;if(!_0x4d7231[_0x1ed72e(0x1c9)]['UseFieldGauge'])return;if(!_0x157e35[_0x1ed72e(0x236)])return;this[_0x1ed72e(0x25d)]=new _0x295010(new _0x37af16(0x0,0x0,0x0,0x0));const _0x344369=this[_0x1ed72e(0x2b5)](this['_windowLayer']);this['addChildAt'](this['_fieldGaugeATB_Container'],_0x344369);}}}),PluginManager[_0x31935f(0x1cf)](pluginData['name'],_0x31935f(0xcc),_0x38e47f=>{const _0x546542=_0x31935f;VisuMZ[_0x546542(0x275)](_0x38e47f,_0x38e47f);const _0x4fdd1a=_0x38e47f['Enemies'];for(const _0x2841cb of _0x4fdd1a){if('JELrz'==='FWhyq')this['visualAtbGauge']=_0x118ae4[_0x546542(0x236)];else{const _0x5311c4=$gameTroop[_0x546542(0xdc)]()[_0x2841cb];if(!_0x5311c4)continue;_0x5311c4['clearFieldAtbGraphics']();}}}),PluginManager[_0x31935f(0x1cf)](pluginData[_0x31935f(0x25e)],'SystemFieldGaugeVisibility',_0x5c9359=>{const _0x5aac7c=_0x31935f;VisuMZ[_0x5aac7c(0x275)](_0x5c9359,_0x5c9359);const _0x103e0c=_0x5c9359[_0x5aac7c(0x120)];$gameSystem[_0x5aac7c(0x29b)](_0x103e0c);}),VisuMZ[_0x31935f(0x2c6)][_0x31935f(0xbb)]=Scene_Boot[_0x31935f(0x1a2)][_0x31935f(0xd8)],Scene_Boot['prototype'][_0x31935f(0xd8)]=function(){const _0xffc2f5=_0x31935f;this[_0xffc2f5(0x1e7)](),VisuMZ[_0xffc2f5(0x2c6)][_0xffc2f5(0xbb)][_0xffc2f5(0x230)](this),this[_0xffc2f5(0x2ad)]();},VisuMZ[_0x31935f(0x2c6)]['RegExp']={},Scene_Boot[_0x31935f(0x1a2)]['process_VisuMZ_BattleSystemATB_CreateRegExp']=function(){const _0x4cd7bf=_0x31935f,_0x152998=VisuMZ[_0x4cd7bf(0x21e)][_0x4cd7bf(0x293)],_0x1bb05f=_0x4cd7bf(0x1f1),_0x4eedf3=[_0x4cd7bf(0x19d),'Cast','After'];for(const _0x5402a8 of _0x4eedf3){if(_0x4cd7bf(0x238)===_0x4cd7bf(0x21f))_0xa2f3b4=_0x5b38d8(_0x56709b['$1'])*0.01;else{const _0x52318e=_0x1bb05f[_0x4cd7bf(0x29f)](_0x5402a8[_0x4cd7bf(0x232)]()['trim'](),'(?:ATB|TPB)',_0x4cd7bf(0x233)),_0x2eb7e9=new RegExp(_0x52318e,'i');VisuMZ[_0x4cd7bf(0x2c6)]['RegExp'][_0x5402a8]=_0x2eb7e9;}}},Scene_Boot[_0x31935f(0x1a2)][_0x31935f(0x2ad)]=function(){const _0x1c1d4a=_0x31935f;if(VisuMZ[_0x1c1d4a(0x11d)])return;const _0x31c648=$dataSkills['concat']($dataItems);for(const _0x10eaa0 of _0x31c648){if(!_0x10eaa0)continue;VisuMZ[_0x1c1d4a(0x2c6)][_0x1c1d4a(0xc3)](_0x10eaa0);}},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x20c)]=VisuMZ[_0x31935f(0x20c)],VisuMZ[_0x31935f(0x20c)]=function(_0x2d9f6e){const _0x2620a6=_0x31935f;VisuMZ['BattleSystemATB'][_0x2620a6(0x20c)]['call'](this,_0x2d9f6e),VisuMZ[_0x2620a6(0x2c6)][_0x2620a6(0xc3)](_0x2d9f6e);},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x1e6)]=VisuMZ[_0x31935f(0x1e6)],VisuMZ['ParseItemNotetags']=function(_0x21f4c4){const _0x322a1d=_0x31935f;VisuMZ[_0x322a1d(0x2c6)]['ParseItemNotetags']['call'](this,_0x21f4c4),VisuMZ[_0x322a1d(0x2c6)]['Parse_Notetags_CreateJS'](_0x21f4c4);},VisuMZ['BattleSystemATB'][_0x31935f(0xc3)]=function(_0x5093ea){const _0x4e0507=_0x31935f,_0x5404dd=[_0x4e0507(0x19d),_0x4e0507(0xb7),_0x4e0507(0x269)];for(const _0x562a02 of _0x5404dd){VisuMZ['BattleSystemATB'][_0x4e0507(0x141)](_0x5093ea,_0x562a02);}},VisuMZ['BattleSystemATB']['JS']={},VisuMZ[_0x31935f(0x2c6)]['createJS']=function(_0x15036b,_0x342f3d){const _0xcf355c=_0x31935f,_0x46f380=_0x15036b[_0xcf355c(0x1ad)];if(_0x46f380[_0xcf355c(0x2bc)](VisuMZ[_0xcf355c(0x2c6)][_0xcf355c(0x293)][_0x342f3d])){const _0x2a74c8=String(RegExp['$1']),_0x4c00b4=_0xcf355c(0x199)[_0xcf355c(0x29f)](_0x2a74c8,_0x342f3d),_0x1ddab1=VisuMZ['BattleSystemATB'][_0xcf355c(0x261)](_0x15036b,_0x342f3d);VisuMZ[_0xcf355c(0x2c6)]['JS'][_0x1ddab1]=new Function(_0x4c00b4);}},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x261)]=function(_0x125740,_0x166290){const _0x1a23b5=_0x31935f;if(VisuMZ['createKeyJS'])return VisuMZ['createKeyJS'](_0x125740,_0x166290);let _0x1e3e1f='';if($dataActors[_0x1a23b5(0xe3)](_0x125740))_0x1e3e1f=_0x1a23b5(0x2cd)[_0x1a23b5(0x29f)](_0x125740['id'],_0x166290);if($dataClasses[_0x1a23b5(0xe3)](_0x125740))_0x1e3e1f='Class-%1-%2'[_0x1a23b5(0x29f)](_0x125740['id'],_0x166290);if($dataSkills['includes'](_0x125740))_0x1e3e1f=_0x1a23b5(0x27a)[_0x1a23b5(0x29f)](_0x125740['id'],_0x166290);if($dataItems[_0x1a23b5(0xe3)](_0x125740))_0x1e3e1f=_0x1a23b5(0x23f)[_0x1a23b5(0x29f)](_0x125740['id'],_0x166290);if($dataWeapons[_0x1a23b5(0xe3)](_0x125740))_0x1e3e1f=_0x1a23b5(0x15a)['format'](_0x125740['id'],_0x166290);if($dataArmors[_0x1a23b5(0xe3)](_0x125740))_0x1e3e1f='Armor-%1-%2'[_0x1a23b5(0x29f)](_0x125740['id'],_0x166290);if($dataEnemies['includes'](_0x125740))_0x1e3e1f=_0x1a23b5(0x22c)[_0x1a23b5(0x29f)](_0x125740['id'],_0x166290);if($dataStates[_0x1a23b5(0xe3)](_0x125740))_0x1e3e1f=_0x1a23b5(0x253)['format'](_0x125740['id'],_0x166290);return _0x1e3e1f;},ConfigManager[_0x31935f(0x236)]=!![],VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x170)]=ConfigManager[_0x31935f(0x25b)],ConfigManager[_0x31935f(0x25b)]=function(){const _0x48e0a6=_0x31935f,_0x5762ac=VisuMZ[_0x48e0a6(0x2c6)][_0x48e0a6(0x170)][_0x48e0a6(0x230)](this);return _0x5762ac[_0x48e0a6(0x236)]=this[_0x48e0a6(0x236)],_0x5762ac;},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x14d)]=ConfigManager[_0x31935f(0x20a)],ConfigManager['applyData']=function(_0x2281f3){const _0x3df74e=_0x31935f;VisuMZ[_0x3df74e(0x2c6)][_0x3df74e(0x14d)]['call'](this,_0x2281f3),_0x3df74e(0x236)in _0x2281f3?this[_0x3df74e(0x236)]=_0x2281f3[_0x3df74e(0x236)]:this[_0x3df74e(0x236)]=!![];},ImageManager[_0x31935f(0x114)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x31935f(0x1a3)]=ImageManager[_0x31935f(0x1a3)]||0x6,TextManager[_0x31935f(0x236)]=VisuMZ[_0x31935f(0x2c6)]['Settings'][_0x31935f(0x2a0)][_0x31935f(0x177)],VisuMZ['BattleSystemATB'][_0x31935f(0x10b)]=ColorManager[_0x31935f(0x142)],ColorManager[_0x31935f(0x142)]=function(){const _0xa4c909=_0x31935f;VisuMZ[_0xa4c909(0x2c6)][_0xa4c909(0x10b)][_0xa4c909(0x230)](this),this[_0xa4c909(0xb6)][_0xa4c909(0xb5)](this[_0xa4c909(0x1f3)][_0xa4c909(0x137)](this));},ColorManager[_0x31935f(0x27d)]=function(_0x155dd4){const _0x247ca3=_0x31935f;return _0x155dd4=String(_0x155dd4),_0x155dd4[_0x247ca3(0x2bc)](/#(.*)/i)?_0x247ca3(0x167)[_0x247ca3(0x29f)](String(RegExp['$1'])):this['textColor'](Number(_0x155dd4));},ColorManager['setupBattleSystemATBColors']=function(){const _0x238100=_0x31935f,_0x25a63f=[_0x238100(0xec),_0x238100(0x283),'cast',_0x238100(0x257),_0x238100(0x23b),_0x238100(0xc2)],_0x2c15f3=VisuMZ[_0x238100(0x2c6)][_0x238100(0x1c9)][_0x238100(0x130)];this[_0x238100(0x207)]={};for(const _0x5f5750 of _0x25a63f){for(let _0x47fd28=0x1;_0x47fd28<=0x2;_0x47fd28++){const _0x399893=_0x5f5750+_0x47fd28;this[_0x238100(0x207)][_0x399893]=this[_0x238100(0x27d)](_0x2c15f3[_0x399893]);}}},ColorManager['atbColor']=function(_0x1526ba){const _0x2e5b56=_0x31935f;if(this['_atbColors']===undefined)this['setupBattleSystemATBColors']();return this[_0x2e5b56(0x207)][_0x1526ba]||_0x2e5b56(0x228);},SceneManager[_0x31935f(0x27c)]=function(){const _0x5670a2=_0x31935f;return this[_0x5670a2(0x213)]&&this[_0x5670a2(0x213)][_0x5670a2(0x2d4)]===Scene_Battle;},BattleManager[_0x31935f(0xd7)]=function(){const _0x38d199=_0x31935f;if(Imported['VisuMZ_2_BattleSystemCTB']&&this[_0x38d199(0x255)]()){if(_0x38d199(0xd6)!=='PuEVC')return![];else{if(this[_0x38d199(0xf2)]()!==0x0)return![];if(_0x7958cb[_0x38d199(0xd7)]()){if(this[_0x38d199(0x102)]()){if(!this[_0x38d199(0x2aa)]())return![];}}return!![];}}return this['isTpb']();},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x156)]=BattleManager[_0x31935f(0x2a4)],BattleManager[_0x31935f(0x2a4)]=function(){const _0x21ad77=_0x31935f;if(!this[_0x21ad77(0x22f)]())return![];else{if(ConfigManager&&ConfigManager[_0x21ad77(0x21c)]!==undefined)return ConfigManager[_0x21ad77(0x21c)];else{if(_0x21ad77(0x256)!=='qBbwJ'){const _0x38562c=_0x2d50f2[_0x21ad77(0x2c6)]['JS'][_0x19c025][_0x21ad77(0x230)](this,this[_0x21ad77(0xfa)](),_0x1d1f8c);_0x4eb58e[_0x21ad77(0x251)](_0x38562c);}else return VisuMZ[_0x21ad77(0x2c6)][_0x21ad77(0x156)][_0x21ad77(0x230)](this);}}},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x115)]=Game_System[_0x31935f(0x1a2)][_0x31935f(0x2d8)],Game_System[_0x31935f(0x1a2)][_0x31935f(0x2d8)]=function(){const _0x5759ba=_0x31935f;VisuMZ[_0x5759ba(0x2c6)][_0x5759ba(0x115)][_0x5759ba(0x230)](this),this[_0x5759ba(0x1cc)]();},Game_System[_0x31935f(0x1a2)]['initBattleSystemATB']=function(){const _0x3c806e=_0x31935f;this[_0x3c806e(0x151)]=!![];},Game_System['prototype']['isBattleSystemATBFieldGaugeVisible']=function(){const _0x5d7d28=_0x31935f;if(this[_0x5d7d28(0x151)]===undefined){if(_0x5d7d28(0x1c4)===_0x5d7d28(0xf8))return _0x256839['y']-_0x17a8f9['y'];else this['initBattleSystemATB']();}return this[_0x5d7d28(0x151)];},Game_System[_0x31935f(0x1a2)]['setBattleSystemATBFieldGaugeVisible']=function(_0x25d2e7){const _0x19c9ec=_0x31935f;this[_0x19c9ec(0x151)]===undefined&&this['initBattleSystemATB'](),this[_0x19c9ec(0x151)]=_0x25d2e7;},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x20e)]=Game_Action['prototype'][_0x31935f(0x2ca)],Game_Action['prototype'][_0x31935f(0x2ca)]=function(_0x35499f){const _0x31634c=_0x31935f;VisuMZ[_0x31634c(0x2c6)]['Game_Action_applyItemUserEffect'][_0x31634c(0x230)](this,_0x35499f),this['applyBattleSystemATBUserEffect'](_0x35499f);},Game_Action[_0x31935f(0x1a2)][_0x31935f(0x203)]=function(_0x396d70){const _0x2fa1f2=_0x31935f;if(!SceneManager['isSceneBattle']())return;if(!BattleManager['isATB']())return;if(this[_0x2fa1f2(0x121)]())this[_0x2fa1f2(0xba)](_0x396d70);},Game_Action[_0x31935f(0x1a2)][_0x31935f(0xba)]=function(_0x3b64f6){const _0x150c5c=_0x31935f,_0x1db950=this['item']()[_0x150c5c(0x1ad)];if(_0x3b64f6['isAtbChargingState']()){const _0x2db9ba=VisuMZ[_0x150c5c(0x2c6)]['createKeyJS'](this[_0x150c5c(0x121)](),'Charge');if(VisuMZ[_0x150c5c(0x2c6)]['JS'][_0x2db9ba]){if('OBgTZ'!==_0x150c5c(0xcd)){const _0x1bbac9=VisuMZ['BattleSystemATB']['JS'][_0x2db9ba]['call'](this,this['subject'](),_0x3b64f6);_0x3b64f6[_0x150c5c(0x25c)](_0x1bbac9);}else _0xc17979['BattleSystemATB'][_0x150c5c(0x1c9)][_0x150c5c(0x277)]['ShowEnemyGauge']&&this[_0x150c5c(0xce)](),_0x5113ed[_0x150c5c(0x2c6)][_0x150c5c(0x119)][_0x150c5c(0x230)](this);}_0x1db950['match'](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&('Azgxv'!=='sgReM'?_0x3b64f6[_0x150c5c(0x25c)](Number(RegExp['$1'])*0.01):this[_0x150c5c(0x103)]=_0x150c5c(0x254)),_0x1db950['match'](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x3b64f6[_0x150c5c(0x1fe)](Number(RegExp['$1'])*0.01);}else{if(_0x3b64f6[_0x150c5c(0x23e)]()){const _0x4cb8cc=VisuMZ[_0x150c5c(0x2c6)][_0x150c5c(0x261)](this[_0x150c5c(0x121)](),_0x150c5c(0xb7));if(VisuMZ[_0x150c5c(0x2c6)]['JS'][_0x4cb8cc]){if(_0x150c5c(0x1ba)==='EDglJ'){const _0x4418d1=VisuMZ[_0x150c5c(0x2c6)]['JS'][_0x4cb8cc][_0x150c5c(0x230)](this,this['subject'](),_0x3b64f6);_0x3b64f6[_0x150c5c(0x251)](_0x4418d1);}else this[_0x150c5c(0x2b7)]&&this['_gaugeSprite'][_0x150c5c(0x2a1)](this[_0x150c5c(0x2b7)]),this['_battlerContainer']=new _0x1e62c1(),this['_gaugeSprite'][_0x150c5c(0x13a)](this['_battlerContainer']),this[_0x150c5c(0x1d0)]();}_0x1db950[_0x150c5c(0x2bc)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x3b64f6['setAtbCastTime'](Number(RegExp['$1'])*0.01),_0x1db950['match'](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x3b64f6[_0x150c5c(0x282)](Number(RegExp['$1'])*0.01),_0x1db950[_0x150c5c(0x2bc)](/<(?:ATB|TPB) INTERRUPT>/i)&&_0x3b64f6[_0x150c5c(0xb8)]();}}},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x264)]=Game_Action[_0x31935f(0x1a2)][_0x31935f(0x28c)],Game_Action[_0x31935f(0x1a2)][_0x31935f(0x28c)]=function(){const _0x51c067=_0x31935f;VisuMZ[_0x51c067(0x2c6)][_0x51c067(0x264)][_0x51c067(0x230)](this),this[_0x51c067(0x1d3)]();},Game_Action[_0x31935f(0x1a2)][_0x31935f(0x1d3)]=function(){const _0x22833b=_0x31935f;if(!this[_0x22833b(0x121)]())return;if(!BattleManager[_0x22833b(0xd7)]())return;const _0x26c526=this[_0x22833b(0x121)]()[_0x22833b(0x1ad)];let _0x4a5037=0x0;this['_forcing']&&(_0x4a5037=this[_0x22833b(0xfa)]()[_0x22833b(0x2b4)]);const _0x153290=VisuMZ[_0x22833b(0x2c6)][_0x22833b(0x261)](this[_0x22833b(0x121)](),_0x22833b(0x269));if(VisuMZ[_0x22833b(0x2c6)]['JS'][_0x153290]){if('LVRhE'===_0x22833b(0x19a))_0x4a5037=VisuMZ[_0x22833b(0x2c6)]['JS'][_0x153290][_0x22833b(0x230)](this,this['subject'](),this[_0x22833b(0xfa)]());else return this['processUpdateGraphic']();}let _0x12670d=this['item']()[_0x22833b(0x190)]>0x0?this['item']()[_0x22833b(0x190)]:0x0;if(this[_0x22833b(0x162)]())_0x12670d+=this[_0x22833b(0xfa)]()['attackSpeed']();_0x4a5037+=(_0x12670d/0xfa0)['clamp'](0x0,0x1);this[_0x22833b(0x121)]()[_0x22833b(0x1ad)]['match'](/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x4a5037=Number(RegExp['$1'])*0.01);const _0x5b34ce=this[_0x22833b(0xfa)]()[_0x22833b(0x24a)]()[_0x22833b(0x1ec)](this[_0x22833b(0xfa)]()[_0x22833b(0x179)]()),_0x35422f=/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x4a0783=_0x5b34ce[_0x22833b(0xef)](_0x2ea04b=>_0x2ea04b&&_0x2ea04b[_0x22833b(0x1ad)][_0x22833b(0x2bc)](_0x35422f)?Number(RegExp['$1'])*0.01:0x0);_0x4a5037=_0x4a0783[_0x22833b(0x248)]((_0x922ee4,_0x1577a0)=>_0x922ee4+_0x1577a0,_0x4a5037),this[_0x22833b(0x121)]()['note'][_0x22833b(0x2bc)](/<(?:ATB|TPB) INSTANT>/i)&&(_0x4a5037=0xa),this['subject']()[_0x22833b(0x2c4)](_0x4a5037);},Game_BattlerBase[_0x31935f(0x1a2)][_0x31935f(0x25c)]=function(_0x1e2866){const _0x4dda11=_0x31935f;this[_0x4dda11(0x2b4)]=_0x1e2866[_0x4dda11(0x154)](0x0,0x1);},Game_BattlerBase[_0x31935f(0x1a2)][_0x31935f(0x1fe)]=function(_0x3c33dc){const _0x471c15=_0x31935f;this[_0x471c15(0x25c)](this[_0x471c15(0x2b4)]+_0x3c33dc);},Game_BattlerBase[_0x31935f(0x1a2)]['setAtbCastTime']=function(_0x4f5754){const _0x5945cd=_0x31935f,_0x1da805=this[_0x5945cd(0x1e4)]();this[_0x5945cd(0xf0)]=(_0x1da805*_0x4f5754)[_0x5945cd(0x154)](0x0,_0x1da805);},Game_BattlerBase[_0x31935f(0x1a2)][_0x31935f(0x282)]=function(_0x441431){const _0x1b58ea=_0x31935f,_0x2c03c3=this[_0x1b58ea(0x1e4)](),_0x1862f8=_0x2c03c3*_0x441431;this[_0x1b58ea(0xf0)]=(this[_0x1b58ea(0xf0)]+_0x1862f8)['clamp'](0x0,_0x2c03c3);},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0xc4)]=Game_BattlerBase['prototype']['die'],Game_BattlerBase[_0x31935f(0x1a2)]['die']=function(){const _0x52e672=_0x31935f;VisuMZ[_0x52e672(0x2c6)][_0x52e672(0xc4)][_0x52e672(0x230)](this);if(BattleManager[_0x52e672(0x22f)]()){if(_0x52e672(0xf3)===_0x52e672(0x1c7)){const _0x137f30=_0x32208d['BattleSystemATB'][_0x52e672(0x170)]['call'](this);return _0x137f30['visualAtbGauge']=this[_0x52e672(0x236)],_0x137f30;}else this[_0x52e672(0x169)]();}},VisuMZ[_0x31935f(0x2c6)]['Game_BattlerBase_revive']=Game_BattlerBase['prototype']['revive'],Game_BattlerBase[_0x31935f(0x1a2)][_0x31935f(0x165)]=function(){const _0x26d8ab=_0x31935f;VisuMZ[_0x26d8ab(0x2c6)]['Game_BattlerBase_revive']['call'](this);if(BattleManager['isTpb']()){if(_0x26d8ab(0x152)!==_0x26d8ab(0x267))this[_0x26d8ab(0x169)]();else return _0x3f2f39*(_0x174f96*0x2);}},Game_Battler[_0x31935f(0x1a2)][_0x31935f(0x1b3)]=function(){const _0x3a3058=_0x31935f;return this['_tpbState']===_0x3a3058(0x101);},Game_Battler[_0x31935f(0x1a2)][_0x31935f(0x23e)]=function(){const _0xa8f558=_0x31935f;return this[_0xa8f558(0x103)]===_0xa8f558(0x13d)&&this[_0xa8f558(0x126)]()&&this['currentAction']()[_0xa8f558(0x121)]()&&this[_0xa8f558(0x126)]()['item']()[_0xa8f558(0x190)]<0x0;},Game_BattlerBase[_0x31935f(0x1a2)][_0x31935f(0x1bc)]=function(){const _0x28f8d2=_0x31935f;if(this[_0x28f8d2(0x23e)]()){if(_0x28f8d2(0x11c)==='fgBau')return this[_0x28f8d2(0xf0)]/this[_0x28f8d2(0x1e4)]();else this[_0x28f8d2(0x2b4)]=_0xf4e654['clamp'](0x0,0x1);}else return 0x0;},Game_Battler[_0x31935f(0x1a2)]['atbStopped']=function(){const _0x4873e2=_0x31935f;return!this[_0x4873e2(0xf9)]();},Game_Battler[_0x31935f(0x1a2)][_0x31935f(0x2c4)]=function(_0x4622f4){const _0x352984=_0x31935f;this[_0x352984(0x178)]=_0x4622f4;},VisuMZ[_0x31935f(0x2c6)]['BattleManager_endBattlerActions']=BattleManager['endBattlerActions'],BattleManager['endBattlerActions']=function(_0x535b0f){const _0x27913c=_0x31935f;this['isTpb']()&&!_0x535b0f[_0x27913c(0xf9)]()&&(_0x535b0f[_0x27913c(0x128)]=!![]),VisuMZ[_0x27913c(0x2c6)][_0x27913c(0x1fa)][_0x27913c(0x230)](this,_0x535b0f),this[_0x27913c(0x22f)]()&&!_0x535b0f[_0x27913c(0xf9)]()&&(_0x535b0f['_onRestrictBypassAtbReset']=![]);},VisuMZ[_0x31935f(0x2c6)]['Game_Battler_clearTpbChargeTime']=Game_Battler[_0x31935f(0x1a2)][_0x31935f(0x169)],Game_Battler['prototype'][_0x31935f(0x169)]=function(){const _0x5d4557=_0x31935f;if(this[_0x5d4557(0x128)])return;VisuMZ[_0x5d4557(0x2c6)][_0x5d4557(0x14e)][_0x5d4557(0x230)](this),this['_tpbChargeTime']+=this[_0x5d4557(0x178)]||0x0;},Game_Battler[_0x31935f(0x1a2)][_0x31935f(0xb8)]=function(){const _0x24a0de=_0x31935f;if(!this[_0x24a0de(0x23e)]())return;if(!this[_0x24a0de(0x126)]())return;if(!this['currentAction']()[_0x24a0de(0x121)]())return;if(this[_0x24a0de(0x126)]()[_0x24a0de(0x121)]()[_0x24a0de(0x1ad)][_0x24a0de(0x2bc)](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i))return;this[_0x24a0de(0x2d0)](),this[_0x24a0de(0x169)](),this[_0x24a0de(0xf0)]=0x0,this[_0x24a0de(0x2c0)]();},Game_Battler[_0x31935f(0x1a2)][_0x31935f(0x2c0)]=function(){const _0x3a4b36=_0x31935f,_0x5b9830=VisuMZ[_0x3a4b36(0x2c6)]['Settings']['Interrupt'];if(Imported[_0x3a4b36(0x20f)]){const _0x369eb6=_0x5b9830[_0x3a4b36(0x21a)],_0x5e389f=_0x5b9830[_0x3a4b36(0xb3)],_0x2917db=_0x5b9830[_0x3a4b36(0xd2)];$gameTemp[_0x3a4b36(0x111)]([this],_0x369eb6,_0x5e389f,_0x2917db);}if(this[_0x3a4b36(0x150)]()&&_0x5b9830[_0x3a4b36(0x168)]['length']>0x0){if(_0x3a4b36(0x135)!==_0x3a4b36(0x135)){if(this[_0x3a4b36(0x1fc)]!==_0x7e5fc8)return this[_0x3a4b36(0x1fc)];const _0x391102=_0x20d5bf[_0x3a4b36(0x1c9)]['DisplayPosition'];return this['_horz']=[_0x3a4b36(0x26e),_0x3a4b36(0x13b)][_0x3a4b36(0xe3)](_0x391102),this['_horz'];}else{const _0x2a63b3=_0x5b9830[_0x3a4b36(0x168)],_0x14f9e3={'textColor':ColorManager[_0x3a4b36(0x27d)](_0x5b9830['InterruptTextColor']),'flashColor':_0x5b9830['InterruptFlashColor'],'flashDuration':_0x5b9830[_0x3a4b36(0x1ef)]};this['setupTextPopup'](_0x2a63b3,_0x14f9e3);}}},VisuMZ['BattleSystemATB']['Game_Battler_startTpbCasting']=Game_Battler[_0x31935f(0x1a2)][_0x31935f(0xff)],Game_Battler[_0x31935f(0x1a2)][_0x31935f(0xff)]=function(){const _0x1673fa=_0x31935f;VisuMZ[_0x1673fa(0x2c6)][_0x1673fa(0x299)][_0x1673fa(0x230)](this);if(BattleManager[_0x1673fa(0xd7)]()){if(this[_0x1673fa(0xf0)]>=this[_0x1673fa(0x1e4)]()){if(_0x1673fa(0x29d)===_0x1673fa(0x29d))this[_0x1673fa(0x103)]='ready';else{if(_0x42d0bc[_0x1673fa(0xd7)]()){if(_0x50bcf1[_0x1673fa(0x184)]()[_0x1673fa(0x1ff)](_0x5c5331=>_0x5c5331&&_0x5c5331['isAlive']()&&_0x5c5331['isAppeared']()&&_0x5c5331[_0x1673fa(0x103)]==='ready'))return;}_0x1ae7ce[_0x1673fa(0x2c6)][_0x1673fa(0x2c2)][_0x1673fa(0x230)](this);}}}},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x2c2)]=Game_Unit['prototype'][_0x31935f(0x244)],Game_Unit[_0x31935f(0x1a2)][_0x31935f(0x244)]=function(){const _0x3d3ffc=_0x31935f;if(BattleManager['isATB']()){if(BattleManager[_0x3d3ffc(0x184)]()['some'](_0x10433f=>_0x10433f&&_0x10433f['isAlive']()&&_0x10433f[_0x3d3ffc(0x28a)]()&&_0x10433f[_0x3d3ffc(0x103)]==='ready'))return;}VisuMZ[_0x3d3ffc(0x2c6)][_0x3d3ffc(0x2c2)][_0x3d3ffc(0x230)](this);},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x2b3)]=Game_Battler[_0x31935f(0x1a2)][_0x31935f(0x266)],Game_Battler[_0x31935f(0x1a2)][_0x31935f(0x266)]=function(){const _0xd5ba65=_0x31935f;!VisuMZ[_0xd5ba65(0x2c6)][_0xd5ba65(0x1c9)]['Mechanics'][_0xd5ba65(0x212)]&&(this[_0xd5ba65(0x128)]=BattleManager[_0xd5ba65(0xd7)]()),VisuMZ[_0xd5ba65(0x2c6)][_0xd5ba65(0x2b3)][_0xd5ba65(0x230)](this),this[_0xd5ba65(0x128)]=undefined;},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x107)]=Game_Actor[_0x31935f(0x1a2)][_0x31935f(0x2d0)],Game_Actor[_0x31935f(0x1a2)][_0x31935f(0x2d0)]=function(){const _0x518f54=_0x31935f;if(this[_0x518f54(0x128)]){if(!this['isAtbCastingState']())return;}VisuMZ[_0x518f54(0x2c6)][_0x518f54(0x107)][_0x518f54(0x230)](this);},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x187)]=Game_Battler['prototype'][_0x31935f(0xf5)],Game_Battler[_0x31935f(0x1a2)]['removeState']=function(_0x581202){const _0x1e2046=_0x31935f,_0x4edbfc=!this['canMove']()&&BattleManager[_0x1e2046(0x22f)]();VisuMZ['BattleSystemATB'][_0x1e2046(0x187)][_0x1e2046(0x230)](this,_0x581202);if(this[_0x1e2046(0x102)]()){if(_0x1e2046(0x243)!==_0x1e2046(0x243))for(let _0x4c4368=0x1;_0x4c4368<=0x2;_0x4c4368++){const _0x5c7797=_0x3f94be+_0x4c4368;this['_atbColors'][_0x5c7797]=this[_0x1e2046(0x27d)](_0x39bd81[_0x5c7797]);}else this[_0x1e2046(0x123)](_0x1e2046(0xe0));}else _0x4edbfc&&this[_0x1e2046(0xf9)]()&&this[_0x1e2046(0xf2)]()<=0x0&&(this[_0x1e2046(0xb1)](),this[_0x1e2046(0x103)]=_0x1e2046(0x101),this['_onRestrictBypassAtbReset']=undefined);},Game_Battler[_0x31935f(0x1a2)][_0x31935f(0x295)]=function(){const _0x49a806=_0x31935f;this[_0x49a806(0x258)](_0x49a806(0x1f8)),this['_tpbTurnEnd']=![],this[_0x49a806(0x2bb)]++,this['_tpbIdleTime']=0x0,this[_0x49a806(0x173)]()&&this[_0x49a806(0x1bf)](),this['processBattleCoreJS']('PostStartTurnJS');},Game_Battler[_0x31935f(0x1a2)][_0x31935f(0x173)]=function(){const _0x43f404=_0x31935f;if(this[_0x43f404(0xf2)]()!==0x0)return![];if(BattleManager['isATB']()){if(_0x43f404(0x231)===_0x43f404(0x241))return _0x58cce3[_0x43f404(0xd7)]()?_0x563275[_0x43f404(0x2c6)][_0x43f404(0x1c9)][_0x43f404(0x2d6)][_0x43f404(0x148)][_0x43f404(0x230)](this,this):_0x399433[_0x43f404(0x2c6)][_0x43f404(0x29c)]['call'](this);else{if(this[_0x43f404(0x102)]()){if(!this[_0x43f404(0x2aa)]())return![];}}}return!![];},VisuMZ[_0x31935f(0x2c6)]['Game_Battler_applyTpbPenalty']=Game_Battler[_0x31935f(0x1a2)][_0x31935f(0xb4)],Game_Battler[_0x31935f(0x1a2)][_0x31935f(0xb4)]=function(){const _0x2e4f4a=_0x31935f;if(BattleManager[_0x2e4f4a(0xd7)]()){if(_0x2e4f4a(0x2d5)==='uGpDt')this['applyATBPenalty']();else return _0x288703(_0x2d41a0['$1']);}else _0x2e4f4a(0x188)===_0x2e4f4a(0x188)?VisuMZ[_0x2e4f4a(0x2c6)][_0x2e4f4a(0x1ca)][_0x2e4f4a(0x230)](this):(this['y']=_0x153ba1[_0x2e4f4a(0x143)]/0x2,this['y']+=_0x2f4496?-_0x2f3d97:_0x11c165);},Game_Battler[_0x31935f(0x1a2)][_0x31935f(0x194)]=function(){const _0x2292bb=_0x31935f;this[_0x2292bb(0x103)]=_0x2292bb(0x101),this['_tpbChargeTime']+=VisuMZ[_0x2292bb(0x2c6)][_0x2292bb(0x1c9)][_0x2292bb(0x2d6)]['EscapeFailPenalty']||0x0;},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x1de)]=Game_Battler[_0x31935f(0x1a2)][_0x31935f(0x175)],Game_Battler[_0x31935f(0x1a2)]['tpbSpeed']=function(){const _0x538f2c=_0x31935f;if(BattleManager[_0x538f2c(0xd7)]())return VisuMZ[_0x538f2c(0x2c6)][_0x538f2c(0x1c9)][_0x538f2c(0x2d6)][_0x538f2c(0x263)]['call'](this,this);else{if(_0x538f2c(0x14c)==='IxnxN')return VisuMZ[_0x538f2c(0x2c6)]['Game_Battler_tpbSpeed'][_0x538f2c(0x230)](this);else{if(this[_0x538f2c(0x1fc)]!==_0xaf4ec3)return this[_0x538f2c(0x1fc)];const _0x3db1d9=_0x43552c[_0x538f2c(0x1c9)]['DisplayPosition'];return this['_horz']=[_0x538f2c(0x26e),_0x538f2c(0x13b)][_0x538f2c(0xe3)](_0x3db1d9),this[_0x538f2c(0x1fc)];}}},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x29c)]=Game_Battler[_0x31935f(0x1a2)]['tpbBaseSpeed'],Game_Battler['prototype'][_0x31935f(0x15e)]=function(){const _0x549393=_0x31935f;return BattleManager['isATB']()?VisuMZ[_0x549393(0x2c6)][_0x549393(0x1c9)][_0x549393(0x2d6)][_0x549393(0x148)][_0x549393(0x230)](this,this):VisuMZ['BattleSystemATB']['Game_Battler_tpbBaseSpeed'][_0x549393(0x230)](this);},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x26f)]=Game_Battler['prototype'][_0x31935f(0x10e)],Game_Battler['prototype'][_0x31935f(0x10e)]=function(){const _0x496737=_0x31935f;if(BattleManager[_0x496737(0xd7)]())return VisuMZ[_0x496737(0x2c6)][_0x496737(0x1c9)][_0x496737(0x2d6)][_0x496737(0x186)]['call'](this,this);else{if(_0x496737(0xd1)===_0x496737(0x159)){if(this['y']>_0x375109)this['y']=_0x27fb5d[_0x496737(0x219)](_0x2e6b31,this['y']-_0x599d8e);if(this['y']<_0x534c5d)this['y']=_0x27f689['min'](_0x376eca,this['y']+_0x4e26d2);}else return VisuMZ[_0x496737(0x2c6)][_0x496737(0x26f)][_0x496737(0x230)](this);}},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x2ae)]=Game_Battler['prototype'][_0x31935f(0x1ae)],Game_Battler[_0x31935f(0x1a2)]['tpbAcceleration']=function(){const _0x1262ca=_0x31935f;if(BattleManager['isATB']())return'ZhBoV'!==_0x1262ca(0x1d9)?![]:this[_0x1262ca(0x2c7)]();else{if(_0x1262ca(0x1d7)===_0x1262ca(0x1d7))return VisuMZ[_0x1262ca(0x2c6)]['Game_Battler_tpbAcceleration'][_0x1262ca(0x230)](this);else this[_0x1262ca(0x194)]();}},Game_Battler['prototype'][_0x31935f(0x2c7)]=function(){const _0x26e4c3=_0x31935f;let _0x9087cc=VisuMZ['BattleSystemATB'][_0x26e4c3(0x1c9)][_0x26e4c3(0x2d6)][_0x26e4c3(0x287)]['call'](this,this);if(ConfigManager&&ConfigManager[_0x26e4c3(0x1d5)]!==undefined){const _0x381777=ConfigManager[_0x26e4c3(0x1d5)]-0x3;if(_0x381777>0x0)return _0x9087cc*(_0x381777*0x2);else{if(_0x381777<0x0)return _0x9087cc*(0x1/(_0x381777*-0x2));}}return _0x9087cc;},VisuMZ['BattleSystemATB']['Game_Battler_tpbRequiredCastTime']=Game_Battler[_0x31935f(0x1a2)][_0x31935f(0x1e4)],Game_Battler[_0x31935f(0x1a2)]['tpbRequiredCastTime']=function(){const _0x149350=_0x31935f;return BattleManager[_0x149350(0xd7)]()?VisuMZ[_0x149350(0x2c6)][_0x149350(0x1c9)]['Mechanics'][_0x149350(0x27f)][_0x149350(0x230)](this,this):VisuMZ[_0x149350(0x2c6)][_0x149350(0x2da)][_0x149350(0x230)](this);},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x198)]=Scene_Options['prototype'][_0x31935f(0x246)],Scene_Options[_0x31935f(0x1a2)][_0x31935f(0x246)]=function(){const _0x10c1de=_0x31935f;let _0x45adb8=VisuMZ[_0x10c1de(0x2c6)][_0x10c1de(0x198)][_0x10c1de(0x230)](this);const _0x3832a3=VisuMZ['BattleSystemATB']['Settings'];if(_0x3832a3[_0x10c1de(0x2a0)][_0x10c1de(0x22a)]&&_0x3832a3['Options']['AdjustRect']&&BattleManager[_0x10c1de(0xd7)]())_0x45adb8++;return _0x45adb8;},Sprite_Battler[_0x31935f(0x1a2)][_0x31935f(0xce)]=function(){const _0x2d484d=_0x31935f;if(!BattleManager[_0x2d484d(0xd7)]())return;if(!ConfigManager['visualAtbGauge'])return;const _0x3369f6=VisuMZ[_0x2d484d(0x2c6)][_0x2d484d(0x1c9)][_0x2d484d(0x277)],_0x1999f3=new Sprite_Gauge();_0x1999f3[_0x2d484d(0x2cf)]['x']=_0x3369f6[_0x2d484d(0x2a8)],_0x1999f3['anchor']['y']=_0x3369f6[_0x2d484d(0x149)],_0x1999f3[_0x2d484d(0x138)]['x']=_0x1999f3[_0x2d484d(0x138)]['y']=_0x3369f6[_0x2d484d(0x104)],this[_0x2d484d(0xea)]=_0x1999f3,this[_0x2d484d(0x13a)](this[_0x2d484d(0xea)]);},VisuMZ[_0x31935f(0x2c6)]['Sprite_Battler_setBattler']=Sprite_Battler[_0x31935f(0x1a2)][_0x31935f(0x1df)],Sprite_Battler[_0x31935f(0x1a2)][_0x31935f(0x1df)]=function(_0x507c33){const _0x4d0963=_0x31935f;VisuMZ[_0x4d0963(0x2c6)]['Sprite_Battler_setBattler'][_0x4d0963(0x230)](this,_0x507c33),this[_0x4d0963(0x24b)](_0x507c33),this[_0x4d0963(0xcf)]();},Sprite_Battler[_0x31935f(0x1a2)][_0x31935f(0x24b)]=function(_0x2a6bf5){const _0x49d18c=_0x31935f;if(!_0x2a6bf5)return;if(!this[_0x49d18c(0xea)])return;if(_0x2a6bf5[_0x49d18c(0x2bf)]()){}else{if(_0x2a6bf5[_0x49d18c(0x102)]()){if(this[_0x49d18c(0x2d4)]===Sprite_Enemy&&_0x2a6bf5[_0x49d18c(0x29e)]())return;if(this[_0x49d18c(0x2d4)]===Sprite_SvEnemy&&!_0x2a6bf5[_0x49d18c(0x29e)]())return;}}this['_atbGaugeSprite'][_0x49d18c(0x195)](_0x2a6bf5,_0x49d18c(0x1af));},Sprite_Battler[_0x31935f(0x1a2)][_0x31935f(0xcf)]=function(){const _0x546b3a=_0x31935f;if(!this['_atbGaugeSprite'])return;const _0x2644ff=this[_0x546b3a(0x11e)]&&this[_0x546b3a(0x11e)][_0x546b3a(0x28a)]()&&!this[_0x546b3a(0x11e)][_0x546b3a(0x2dc)]();this[_0x546b3a(0xea)]['visible']=_0x2644ff;if(this[_0x546b3a(0x17d)]&&this['_svBattlerSprite'][_0x546b3a(0xea)]){if('AKuZa'===_0x546b3a(0x13c))return this[_0x546b3a(0x151)]===_0x5e5793&&this[_0x546b3a(0x1cc)](),this['_atbFieldGaugeVisible'];else this[_0x546b3a(0x17d)][_0x546b3a(0xea)][_0x546b3a(0x2ce)]=_0x2644ff;}},VisuMZ[_0x31935f(0x2c6)]['Sprite_Battler_updateMain']=Sprite_Battler[_0x31935f(0x1a2)][_0x31935f(0xe6)],Sprite_Battler[_0x31935f(0x1a2)][_0x31935f(0xe6)]=function(){const _0x2db8d0=_0x31935f;VisuMZ['BattleSystemATB'][_0x2db8d0(0xfe)][_0x2db8d0(0x230)](this),this[_0x2db8d0(0x153)]();},Sprite_Battler[_0x31935f(0x1a2)][_0x31935f(0x153)]=function(){const _0x157c70=_0x31935f;if(!this['_battler'])return;if(!this[_0x157c70(0xea)])return;const _0x3b3c68=VisuMZ[_0x157c70(0x2c6)][_0x157c70(0x1c9)]['Gauge'],_0x209cba=this[_0x157c70(0xea)];let _0x2ac5d1=_0x3b3c68[_0x157c70(0x1c5)];this[_0x157c70(0x11e)][_0x157c70(0x262)]&&(_0x2ac5d1+=this[_0x157c70(0x11e)][_0x157c70(0x262)]());let _0x3b81c3=_0x3b3c68[_0x157c70(0x1c6)];this['_battler'][_0x157c70(0x221)]&&(_0x3b81c3+=this[_0x157c70(0x11e)][_0x157c70(0x221)]());_0x209cba['x']=_0x2ac5d1,_0x209cba['y']=-this['height']+_0x3b81c3;if(this[_0x157c70(0x11e)][_0x157c70(0x102)]()){if(this[_0x157c70(0x11e)][_0x157c70(0x24e)]()[_0x157c70(0x1ad)]['match'](/<HIDE (?:ATB|TPB) GAUGE>/i)){if('DEuIa'===_0x157c70(0xfc))return _0x5c5265*(0x1/(_0xa2dce6*-0x2));else _0x209cba[_0x157c70(0x2ce)]=![];}}this[_0x157c70(0x2b2)]()&&(_0x209cba['y']+=_0x209cba[_0x157c70(0xd4)]()*_0x3b3c68[_0x157c70(0x104)]-0x1),this[_0x157c70(0x138)]['x']<0x0&&(_0x209cba[_0x157c70(0x138)]['x']=-Math[_0x157c70(0x1c0)](_0x209cba['scale']['x']));},Sprite_Battler[_0x31935f(0x1a2)][_0x31935f(0x2b2)]=function(){const _0x291b04=_0x31935f;if(!Imported[_0x291b04(0x191)])return![];if(this[_0x291b04(0x11e)]&&this[_0x291b04(0x11e)]['isEnemy']())return![];const _0x127988=VisuMZ[_0x291b04(0x2a5)][_0x291b04(0x1c9)][_0x291b04(0x129)];if(!_0x127988[_0x291b04(0x1f9)])return![];if(!ConfigManager['aggroGauge'])return![];const _0x3c7ed7=VisuMZ[_0x291b04(0x2c6)][_0x291b04(0x1c9)][_0x291b04(0x277)];return _0x127988[_0x291b04(0x104)]===_0x3c7ed7[_0x291b04(0x104)]&&_0x127988['AnchorX']===_0x3c7ed7[_0x291b04(0x2a8)]&&_0x127988['AnchorY']===_0x3c7ed7['AnchorY']&&_0x127988[_0x291b04(0x1c5)]===_0x3c7ed7[_0x291b04(0x1c5)]&&_0x127988[_0x291b04(0x1c6)]===_0x3c7ed7[_0x291b04(0x1c6)]&&!![];},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x284)]=Sprite_Battler[_0x31935f(0x1a2)][_0x31935f(0x2be)],Sprite_Battler['prototype'][_0x31935f(0x2be)]=function(){const _0x29bd6c=_0x31935f;VisuMZ[_0x29bd6c(0x2c6)][_0x29bd6c(0x284)][_0x29bd6c(0x230)](this),!this[_0x29bd6c(0x11e)]&&this[_0x29bd6c(0xea)]&&(this[_0x29bd6c(0xea)]['visible']=![],this['_svBattlerSprite']&&(this['_svBattlerSprite']['_atbGaugeSprite'][_0x29bd6c(0x2ce)]=![]));},VisuMZ['BattleSystemATB']['Sprite_Actor_createStateSprite']=Sprite_Actor[_0x31935f(0x1a2)]['createStateSprite'],Sprite_Actor['prototype'][_0x31935f(0x1ac)]=function(){const _0x27fb83=_0x31935f;VisuMZ[_0x27fb83(0x2c6)]['Sprite_Actor_createStateSprite'][_0x27fb83(0x230)](this),this['isShowAtbGauge']()&&(_0x27fb83(0xc6)!==_0x27fb83(0x296)?this[_0x27fb83(0xce)]():this[_0x27fb83(0x151)]=!![]);},Sprite_Actor[_0x31935f(0x1a2)]['isShowAtbGauge']=function(){const _0x4ce400=_0x31935f;return VisuMZ[_0x4ce400(0x2c6)][_0x4ce400(0x1c9)][_0x4ce400(0x277)][_0x4ce400(0x2a9)];},Sprite_SvEnemy[_0x31935f(0x1a2)][_0x31935f(0x16f)]=function(){const _0xd34084=_0x31935f;return VisuMZ[_0xd34084(0x2c6)][_0xd34084(0x1c9)][_0xd34084(0x277)][_0xd34084(0x272)];},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x119)]=Sprite_Enemy['prototype']['createStateIconSprite'],Sprite_Enemy['prototype'][_0x31935f(0x1dd)]=function(){const _0x2ece55=_0x31935f;VisuMZ['BattleSystemATB'][_0x2ece55(0x1c9)][_0x2ece55(0x277)]['ShowEnemyGauge']&&(_0x2ece55(0x2a3)!==_0x2ece55(0x2a3)?this['createBattlerSprite'](_0x482f5a,_0x304e55):this[_0x2ece55(0xce)]()),VisuMZ[_0x2ece55(0x2c6)]['Sprite_Enemy_createStateIconSprite'][_0x2ece55(0x230)](this);},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x1a8)]=Sprite_Enemy['prototype'][_0x31935f(0x200)],Sprite_Enemy['prototype']['startEffect']=function(_0x549cab){const _0x56439e=_0x31935f;VisuMZ[_0x56439e(0x2c6)][_0x56439e(0x1a8)]['call'](this,_0x549cab),(_0x549cab===_0x56439e(0xbf)||_0x56439e(0x285))&&(_0x56439e(0x12c)===_0x56439e(0x12c)?this[_0x56439e(0xcf)]():_0x18c6dc=_0x56439e(0x24e));},VisuMZ[_0x31935f(0x2c6)]['Game_BattlerBase_appear']=Game_BattlerBase[_0x31935f(0x1a2)][_0x31935f(0xbf)],Game_BattlerBase[_0x31935f(0x1a2)]['appear']=function(){const _0x3dfbdb=_0x31935f;VisuMZ['BattleSystemATB'][_0x3dfbdb(0x2d3)][_0x3dfbdb(0x230)](this);if(this['isEnemy']()&&BattleManager[_0x3dfbdb(0xd7)]()&&this[_0x3dfbdb(0x150)]()){if(_0x3dfbdb(0x24c)===_0x3dfbdb(0x24c))this['battler']()[_0x3dfbdb(0x1b8)]=!![],this[_0x3dfbdb(0x150)]()[_0x3dfbdb(0xcf)]();else{const _0x5625a8=_0x4b6faa(_0x457530['$1']),_0x3739ae=_0x3dfbdb(0x199)[_0x3dfbdb(0x29f)](_0x5625a8,_0x2f9549),_0x20c235=_0x13a843[_0x3dfbdb(0x2c6)][_0x3dfbdb(0x261)](_0x4e61df,_0x5179f7);_0xd320f7[_0x3dfbdb(0x2c6)]['JS'][_0x20c235]=new _0x23cd5a(_0x3739ae);}}},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x2a7)]=Sprite_Gauge[_0x31935f(0x1a2)][_0x31935f(0x1be)],Sprite_Gauge['prototype'][_0x31935f(0x1be)]=function(){const _0x5c055d=_0x31935f;if(this[_0x5c055d(0x259)]===_0x5c055d(0x1af))return this[_0x5c055d(0x14b)](0x1);return VisuMZ[_0x5c055d(0x2c6)][_0x5c055d(0x2a7)]['call'](this);},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x18f)]=Sprite_Gauge[_0x31935f(0x1a2)][_0x31935f(0x183)],Sprite_Gauge[_0x31935f(0x1a2)][_0x31935f(0x183)]=function(){const _0x258567=_0x31935f;if(this[_0x258567(0x259)]===_0x258567(0x1af))return this[_0x258567(0x14b)](0x2);return VisuMZ[_0x258567(0x2c6)][_0x258567(0x18f)][_0x258567(0x230)](this);},Sprite_Gauge[_0x31935f(0x1a2)][_0x31935f(0x14b)]=function(_0xcc0556){const _0x3a5bac=_0x31935f;if(!this[_0x3a5bac(0x11e)])return ColorManager[_0x3a5bac(0x204)](_0x3a5bac(0x192)[_0x3a5bac(0x29f)](_0xcc0556));if(this[_0x3a5bac(0x11e)][_0x3a5bac(0x12f)]())return ColorManager[_0x3a5bac(0x204)]('stop%1'[_0x3a5bac(0x29f)](_0xcc0556));if(this['_battler'][_0x3a5bac(0x23e)]())return ColorManager[_0x3a5bac(0x204)](_0x3a5bac(0x288)[_0x3a5bac(0x29f)](_0xcc0556));if(this['gaugeRate']()>=0x1)return ColorManager[_0x3a5bac(0x204)](_0x3a5bac(0x249)[_0x3a5bac(0x29f)](_0xcc0556));const _0x5ca6b9=VisuMZ['BattleSystemATB'][_0x3a5bac(0x1c9)]['Gauge'],_0x2d1903=this['_battler'][_0x3a5bac(0x2db)](0x6)*this[_0x3a5bac(0x11e)][_0x3a5bac(0x252)](0x6);if(_0x2d1903<=_0x5ca6b9[_0x3a5bac(0x1ce)])return ColorManager['atbColor'](_0x3a5bac(0x116)[_0x3a5bac(0x29f)](_0xcc0556));if(_0x2d1903>=_0x5ca6b9[_0x3a5bac(0xcb)])return ColorManager[_0x3a5bac(0x204)](_0x3a5bac(0x171)[_0x3a5bac(0x29f)](_0xcc0556));return ColorManager[_0x3a5bac(0x204)](_0x3a5bac(0x192)[_0x3a5bac(0x29f)](_0xcc0556));},VisuMZ['BattleSystemATB']['Sprite_Gauge_currentValue']=Sprite_Gauge[_0x31935f(0x1a2)][_0x31935f(0x118)],Sprite_Gauge[_0x31935f(0x1a2)]['currentValue']=function(){const _0x1bbdea=_0x31935f;if(this[_0x1bbdea(0x11e)]&&this[_0x1bbdea(0x259)]===_0x1bbdea(0x1af))return this[_0x1bbdea(0x1b2)]();return VisuMZ[_0x1bbdea(0x2c6)][_0x1bbdea(0x161)][_0x1bbdea(0x230)](this);},Sprite_Gauge[_0x31935f(0x1a2)][_0x31935f(0x1b2)]=function(){const _0x374fd0=_0x31935f;return this['_battler'][_0x374fd0(0x23e)]()?Math[_0x374fd0(0x219)](this[_0x374fd0(0x11e)][_0x374fd0(0xf0)],0x0):VisuMZ['BattleSystemATB'][_0x374fd0(0x161)]['call'](this);},VisuMZ[_0x31935f(0x2c6)]['Sprite_Gauge_currentMaxValue']=Sprite_Gauge[_0x31935f(0x1a2)][_0x31935f(0x22e)],Sprite_Gauge['prototype'][_0x31935f(0x22e)]=function(){const _0x125c61=_0x31935f;if(this[_0x125c61(0x11e)]&&this[_0x125c61(0x259)]===_0x125c61(0x1af))return this[_0x125c61(0x250)]();return VisuMZ[_0x125c61(0x2c6)][_0x125c61(0x17c)][_0x125c61(0x230)](this);},Sprite_Gauge[_0x31935f(0x1a2)][_0x31935f(0x250)]=function(){const _0x476abd=_0x31935f;if(this[_0x476abd(0x11e)]['isAtbCastingState']()){if('tYakq'===_0x476abd(0x1c2))return Math['max'](this[_0x476abd(0x11e)][_0x476abd(0x1e4)](),0x1);else{const _0x40c00a=_0xc144b6[_0x476abd(0x1d5)]-0x3;if(_0x40c00a>0x0)return _0x203be4*(_0x40c00a*0x2);else{if(_0x40c00a<0x0)return _0x1fc2cb*(0x1/(_0x40c00a*-0x2));}}}else{if('JzceH'!==_0x476abd(0x2d2))this['anchor']['x']=0.5,this[_0x476abd(0x2cf)]['y']=0.5;else return VisuMZ[_0x476abd(0x2c6)]['Sprite_Gauge_currentMaxValue'][_0x476abd(0x230)](this);}},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x134)]=Window_Help[_0x31935f(0x1a2)][_0x31935f(0x133)],Window_Help['prototype']['setItem']=function(_0x2ff8b8){const _0x462041=_0x31935f;BattleManager['isATB']()&&_0x2ff8b8&&_0x2ff8b8[_0x462041(0x1ad)]&&_0x2ff8b8['note'][_0x462041(0x2bc)](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i)?this['setText'](String(RegExp['$1'])):VisuMZ['BattleSystemATB'][_0x462041(0x134)][_0x462041(0x230)](this,_0x2ff8b8);},VisuMZ[_0x31935f(0x2c6)]['Window_StatusBase_placeGauge']=Window_StatusBase[_0x31935f(0x1a2)]['placeGauge'],Window_StatusBase[_0x31935f(0x1a2)][_0x31935f(0xaf)]=function(_0x2967e6,_0x19013d,_0x5d663f,_0x2bd1c0){const _0x413bd7=_0x31935f;if(!this[_0x413bd7(0x16c)](_0x19013d))return;VisuMZ[_0x413bd7(0x2c6)][_0x413bd7(0x294)][_0x413bd7(0x230)](this,_0x2967e6,_0x19013d,_0x5d663f,_0x2bd1c0);},Window_StatusBase['prototype']['showVisualAtbGauge']=function(_0x52ab1f){const _0xde9b93=_0x31935f;if(_0x52ab1f!==_0xde9b93(0x1af))return!![];if(![_0xde9b93(0x174),_0xde9b93(0x2b8)][_0xde9b93(0xe3)](this[_0xde9b93(0x2d4)]['name']))return![];if(!BattleManager[_0xde9b93(0xd7)]())return![];if(!ConfigManager['visualAtbGauge'])return![];return VisuMZ[_0xde9b93(0x2c6)][_0xde9b93(0x1c9)]['Gauge'][_0xde9b93(0xc1)];},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0xae)]=Window_Options[_0x31935f(0x1a2)][_0x31935f(0x15b)],Window_Options[_0x31935f(0x1a2)][_0x31935f(0x15b)]=function(){const _0x20765e=_0x31935f;VisuMZ[_0x20765e(0x2c6)][_0x20765e(0xae)][_0x20765e(0x230)](this),this[_0x20765e(0x17b)]();},Window_Options['prototype'][_0x31935f(0x17b)]=function(){const _0x1d9a9a=_0x31935f;if(!BattleManager['isATB']())return;if(VisuMZ[_0x1d9a9a(0x2c6)]['Settings'][_0x1d9a9a(0x2a0)]['AddOption']){if(_0x1d9a9a(0x2d7)!==_0x1d9a9a(0x1a7))this[_0x1d9a9a(0x260)]();else return _0x372d12[_0x1d9a9a(0x13e)]&&_0x99a824[_0x1d9a9a(0xeb)][_0x1d9a9a(0xe3)]('['+_0x316b38+']');}},Window_Options[_0x31935f(0x1a2)][_0x31935f(0x260)]=function(){const _0x2ddba3=_0x31935f,_0x363169=TextManager[_0x2ddba3(0x236)],_0x527c45=_0x2ddba3(0x236);this[_0x2ddba3(0x1bb)](_0x363169,_0x527c45);},Game_BattlerBase[_0x31935f(0x1a2)][_0x31935f(0x23a)]=function(){const _0x1a7f35=_0x31935f;delete this[_0x1a7f35(0x26d)],delete this[_0x1a7f35(0x166)],delete this[_0x1a7f35(0x21d)],delete this[_0x1a7f35(0x16b)];},Game_BattlerBase[_0x31935f(0x1a2)]['fieldAtbGraphicType']=function(){const _0x5bbbed=_0x31935f;return this[_0x5bbbed(0x26d)]===undefined&&(this['_fieldAtbGaugeGraphicType']=this['createFieldAtbGraphicType']()),this[_0x5bbbed(0x26d)];},Game_BattlerBase[_0x31935f(0x1a2)][_0x31935f(0x131)]=function(){const _0x12868b=_0x31935f;return Sprite_FieldGaugeATB[_0x12868b(0x1c9)][_0x12868b(0x1c1)];},Game_BattlerBase[_0x31935f(0x1a2)]['fieldAtbGraphicFaceName']=function(){const _0xf0f70a=_0x31935f;return this[_0xf0f70a(0x166)]===undefined&&(this[_0xf0f70a(0x166)]=this[_0xf0f70a(0x1d8)]()),this[_0xf0f70a(0x166)];},Game_BattlerBase['prototype'][_0x31935f(0x1d8)]=function(){const _0x1744a8=_0x31935f;return Sprite_FieldGaugeATB['Settings'][_0x1744a8(0xee)];},Game_BattlerBase[_0x31935f(0x1a2)][_0x31935f(0x298)]=function(){const _0x9c606f=_0x31935f;return this[_0x9c606f(0x21d)]===undefined&&(this[_0x9c606f(0x21d)]=this[_0x9c606f(0x279)]()),this['_fieldAtbGaugeFaceIndex'];},Game_BattlerBase['prototype'][_0x31935f(0x279)]=function(){const _0x4e84ab=_0x31935f;return Sprite_FieldGaugeATB['Settings'][_0x4e84ab(0x1e1)];},Game_BattlerBase['prototype']['fieldAtbGraphicIconIndex']=function(){const _0x4cf574=_0x31935f;return this[_0x4cf574(0x16b)]===undefined&&(this['_fieldAtbGaugeIconIndex']=this[_0x4cf574(0x160)]()),this[_0x4cf574(0x16b)];},Game_BattlerBase['prototype'][_0x31935f(0x160)]=function(){const _0x50e177=_0x31935f;return Sprite_FieldGaugeATB[_0x50e177(0x1c9)]['EnemyBattlerIcon'];},Game_BattlerBase[_0x31935f(0x1a2)]['setAtbGraphicIconIndex']=function(_0x526cb0){const _0x4e8220=_0x31935f;this[_0x4e8220(0x16b)]=_0x526cb0;},Game_Actor[_0x31935f(0x1a2)][_0x31935f(0x131)]=function(){const _0x435141=_0x31935f,_0x31f4ac=this['actor']()[_0x435141(0x1ad)];if(_0x31f4ac['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if(_0x435141(0xb9)===_0x435141(0xb9))return _0x435141(0x1f2);else _0x25ef58['changeAtbChargeTime'](_0x1e0599(_0x219c28['$1'])*0.01);}else{if(_0x31f4ac[_0x435141(0x2bc)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x435141(0x226);}return Sprite_FieldGaugeATB[_0x435141(0x1c9)][_0x435141(0x1db)];},Game_Actor[_0x31935f(0x1a2)][_0x31935f(0x1d8)]=function(){const _0x6841e6=_0x31935f,_0x2cd733=this['actor']()[_0x6841e6(0x1ad)];if(_0x2cd733[_0x6841e6(0x2bc)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x6841e6(0x23c)]();},Game_Actor['prototype'][_0x31935f(0x279)]=function(){const _0x1b2425=_0x31935f,_0x1c7e61=this['actor']()[_0x1b2425(0x1ad)];if(_0x1c7e61[_0x1b2425(0x2bc)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if(_0x1b2425(0xdd)===_0x1b2425(0xdd))return Number(RegExp['$2']);else{const _0x400df3=[_0x1b2425(0xec),_0x1b2425(0x283),_0x1b2425(0x2b6),_0x1b2425(0x257),'slow','stop'],_0x103f74=_0x77b459[_0x1b2425(0x2c6)]['Settings'][_0x1b2425(0x130)];this[_0x1b2425(0x207)]={};for(const _0x3da633 of _0x400df3){for(let _0x45927a=0x1;_0x45927a<=0x2;_0x45927a++){const _0x257e42=_0x3da633+_0x45927a;this[_0x1b2425(0x207)][_0x257e42]=this[_0x1b2425(0x27d)](_0x103f74[_0x257e42]);}}}}return this[_0x1b2425(0x20d)]();},Game_Actor['prototype'][_0x31935f(0x160)]=function(){const _0x2b1eeb=_0x31935f,_0xa7156a=this['actor']()[_0x2b1eeb(0x1ad)];if(_0xa7156a[_0x2b1eeb(0x2bc)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x2b1eeb(0xf6)===_0x2b1eeb(0x2a2)?_0x472a33[_0x2b1eeb(0xd7)]()?_0x5e46fa['BattleSystemATB'][_0x2b1eeb(0x1c9)][_0x2b1eeb(0x2d6)][_0x2b1eeb(0x27f)]['call'](this,this):_0x30e9c5[_0x2b1eeb(0x2c6)][_0x2b1eeb(0x2da)]['call'](this):Number(RegExp['$1']);return Sprite_FieldGaugeATB[_0x2b1eeb(0x1c9)][_0x2b1eeb(0x10a)];},Game_Enemy[_0x31935f(0x1a2)][_0x31935f(0x131)]=function(){const _0x2a7f57=_0x31935f,_0x319b1f=this[_0x2a7f57(0x24e)]()[_0x2a7f57(0x1ad)];if(_0x319b1f[_0x2a7f57(0x2bc)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if('ArNgM'!==_0x2a7f57(0x18d)){const _0x4b556e=_0x3a50b6[_0x2a7f57(0x144)]();for(let _0x583aad=0x0;_0x583aad<_0x4b556e;_0x583aad++){this[_0x2a7f57(0xdb)](_0x583aad,_0x3c08cc);}}else return'face';}else{if(_0x319b1f['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x2a7f57(0x226);}return Sprite_FieldGaugeATB[_0x2a7f57(0x1c9)][_0x2a7f57(0x1c1)];},Game_Enemy[_0x31935f(0x1a2)][_0x31935f(0x1d8)]=function(){const _0x4f3180=_0x31935f,_0x46c499=this['enemy']()[_0x4f3180(0x1ad)];if(_0x46c499['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if(_0x4f3180(0x176)!=='ABLiG')_0x180ce4[_0x4f3180(0x1d1)](_0xfa6f39+_0x2c8624+_0x4b6a9d,_0x1ca513+_0x2f4fda,_0x4bf805,_0x29b9a7),_0x2d20eb['x']+=_0x3b9108['ceil'](_0x5e2d36*1.75),_0x5c80b4[_0x4f3180(0x2cf)]['x']=0x1;else return String(RegExp['$1']);}return Sprite_FieldGaugeATB[_0x4f3180(0x1c9)][_0x4f3180(0xee)];},Game_Enemy[_0x31935f(0x1a2)][_0x31935f(0x279)]=function(){const _0x10ff80=_0x31935f,_0x408fa6=this[_0x10ff80(0x24e)]()['note'];if(_0x408fa6[_0x10ff80(0x2bc)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Sprite_FieldGaugeATB[_0x10ff80(0x1c9)][_0x10ff80(0x1e1)];},Game_Enemy[_0x31935f(0x1a2)]['createFieldAtbGraphicIconIndex']=function(){const _0x304dba=_0x31935f,_0x2c4f1b=this[_0x304dba(0x24e)]()[_0x304dba(0x1ad)];if(_0x2c4f1b[_0x304dba(0x2bc)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return'VtDaL'!==_0x304dba(0xc7)?Number(RegExp['$1']):this[_0x304dba(0x213)]&&this[_0x304dba(0x213)][_0x304dba(0x2d4)]===_0x41be09;return Sprite_FieldGaugeATB[_0x304dba(0x1c9)]['EnemyBattlerIcon'];},VisuMZ[_0x31935f(0x2c6)][_0x31935f(0x1eb)]=Scene_Battle[_0x31935f(0x1a2)]['createAllWindows'],Scene_Battle[_0x31935f(0x1a2)][_0x31935f(0x2af)]=function(){const _0x245946=_0x31935f;this[_0x245946(0x110)](),VisuMZ[_0x245946(0x2c6)][_0x245946(0x1eb)][_0x245946(0x230)](this),this[_0x245946(0x16e)]();},Scene_Battle[_0x31935f(0x1a2)][_0x31935f(0x110)]=function(){const _0x31063a=_0x31935f;if(!BattleManager[_0x31063a(0xd7)]())return;if(!Sprite_FieldGaugeATB[_0x31063a(0x1c9)][_0x31063a(0x292)])return;if(!ConfigManager[_0x31063a(0x236)])return;this['_fieldGaugeATB_Container']=new Window_Base(new Rectangle(0x0,0x0,0x0,0x0));const _0xbf963e=this[_0x31063a(0x2b5)](this[_0x31063a(0xd3)]);this[_0x31063a(0x24d)](this['_fieldGaugeATB_Container'],_0xbf963e);},Scene_Battle['prototype']['createFieldGaugeSpriteATB']=function(){const _0x554187=_0x31935f;if(!BattleManager[_0x554187(0xd7)]())return;if(!Sprite_FieldGaugeATB[_0x554187(0x1c9)][_0x554187(0x292)])return;if(!ConfigManager[_0x554187(0x236)])return;this[_0x554187(0x225)]=new Sprite_FieldGaugeATB(),this[_0x554187(0x25d)][_0x554187(0x13a)](this[_0x554187(0x225)]);};function Sprite_FieldGaugeATB(){const _0x51c37b=_0x31935f;this[_0x51c37b(0x2d8)](...arguments);}Sprite_FieldGaugeATB[_0x31935f(0x1a2)]=Object[_0x31935f(0x2cb)](Sprite[_0x31935f(0x1a2)]),Sprite_FieldGaugeATB[_0x31935f(0x1a2)]['constructor']=Sprite_FieldGaugeATB,Sprite_FieldGaugeATB[_0x31935f(0x1c9)]=JsonEx[_0x31935f(0x1aa)](VisuMZ['BattleSystemATB'][_0x31935f(0x1c9)][_0x31935f(0x2b9)]),Sprite_FieldGaugeATB[_0x31935f(0x1a2)][_0x31935f(0x2d8)]=function(){const _0x1c3f7b=_0x31935f;Sprite['prototype'][_0x1c3f7b(0x2d8)][_0x1c3f7b(0x230)](this),this[_0x1c3f7b(0x17a)](),this[_0x1c3f7b(0xd9)](),this[_0x1c3f7b(0x270)]();},Sprite_FieldGaugeATB[_0x31935f(0x1a2)][_0x31935f(0x17a)]=function(){this['anchor']['x']=0.5,this['anchor']['y']=0.5;},Sprite_FieldGaugeATB['prototype']['isGaugeHorizontal']=function(){const _0x472acd=_0x31935f;if(this[_0x472acd(0x1fc)]!==undefined)return this['_horz'];const _0x4c92c9=Sprite_FieldGaugeATB[_0x472acd(0x1c9)][_0x472acd(0x1f5)];return this[_0x472acd(0x1fc)]=[_0x472acd(0x26e),_0x472acd(0x13b)]['includes'](_0x4c92c9),this[_0x472acd(0x1fc)];},Sprite_FieldGaugeATB['prototype'][_0x31935f(0xd9)]=function(){const _0x525839=_0x31935f,_0x39f1fe=Sprite_FieldGaugeATB[_0x525839(0x1c9)]['DisplayPosition'][_0x525839(0x1e9)]()['trim'](),_0x58b4fa=Window_Base[_0x525839(0x1a2)][_0x525839(0x11a)](),_0x74335c=SceneManager[_0x525839(0x213)]['_statusWindow'][_0x525839(0x281)]+Math[_0x525839(0xf7)](_0x58b4fa*0.5);this[_0x525839(0x1b6)]=0x0,this[_0x525839(0x247)]=0x0;switch(_0x39f1fe){case'top':this[_0x525839(0x1b6)]=Math[_0x525839(0xf7)](Graphics[_0x525839(0x12e)]*0.5),this[_0x525839(0x247)]=0x60;break;case _0x525839(0x13b):this[_0x525839(0x1b6)]=Math['round'](Graphics[_0x525839(0x12e)]*0.5),this[_0x525839(0x247)]=Graphics[_0x525839(0x10d)]-_0x74335c;break;case _0x525839(0x1ee):this[_0x525839(0x1b6)]=0x50,this[_0x525839(0x247)]=Math[_0x525839(0xf7)]((Graphics[_0x525839(0x10d)]-_0x74335c)/0x2);break;case'right':this[_0x525839(0x1b6)]=Graphics['boxWidth']-0x50,this['_homeY']=Math[_0x525839(0xf7)]((Graphics['boxHeight']-_0x74335c)/0x2);break;}this['_homeX']+=Sprite_FieldGaugeATB[_0x525839(0x1c9)]['DisplayOffsetX']||0x0,this['_homeY']+=Sprite_FieldGaugeATB[_0x525839(0x1c9)][_0x525839(0x1e3)]||0x0,this['x']=this['_homeX'],this['y']=this[_0x525839(0x247)];},Sprite_FieldGaugeATB[_0x31935f(0x1a2)]['createChildren']=function(){const _0xa0311b=_0x31935f;this['createFieldGaugeSkin'](),this[_0xa0311b(0x22b)](),this[_0xa0311b(0x2d9)]();},Sprite_FieldGaugeATB[_0x31935f(0x1a2)][_0x31935f(0x22d)]=function(){const _0x42c644=_0x31935f;this[_0x42c644(0x19f)]=new Sprite(),this[_0x42c644(0x19f)][_0x42c644(0x2cf)]['x']=0.5,this[_0x42c644(0x19f)][_0x42c644(0x2cf)]['y']=0.5,this[_0x42c644(0x13a)](this['_skinSprite']);const _0x14b304=Sprite_FieldGaugeATB[_0x42c644(0x1c9)][_0x42c644(0x1a9)];if(_0x14b304)this[_0x42c644(0x19f)][_0x42c644(0x1f6)]=ImageManager[_0x42c644(0xf4)](_0x14b304);},Sprite_FieldGaugeATB[_0x31935f(0x1a2)][_0x31935f(0x22b)]=function(){const _0x6f833c=_0x31935f;this[_0x6f833c(0x290)]=new Sprite(),this['addChild'](this['_gaugeSprite']),this[_0x6f833c(0x158)]();},Sprite_FieldGaugeATB['prototype'][_0x31935f(0x158)]=function(){const _0x1748d1=_0x31935f,_0x120b16=Sprite_FieldGaugeATB[_0x1748d1(0x1c9)],_0x11214a=this[_0x1748d1(0x289)](),_0x19d9cd=_0x11214a?_0x120b16['GaugeLengthHorz']:_0x120b16[_0x1748d1(0x143)],_0x20e5da=_0x11214a?_0x120b16[_0x1748d1(0x143)]:_0x120b16[_0x1748d1(0x274)];this[_0x1748d1(0x290)][_0x1748d1(0x1f6)]=new Bitmap(_0x19d9cd,_0x20e5da),this[_0x1748d1(0x1a0)](),this[_0x1748d1(0x290)]['x']=Math['ceil'](_0x19d9cd/-0x2),this[_0x1748d1(0x290)]['y']=Math[_0x1748d1(0x132)](_0x20e5da/-0x2);},Sprite_FieldGaugeATB['prototype']['drawGaugeBitmap']=function(){const _0x5daac9=_0x31935f;if(!Sprite_FieldGaugeATB[_0x5daac9(0x1c9)][_0x5daac9(0x139)])return;const _0x3f7d27=Sprite_FieldGaugeATB[_0x5daac9(0x1c9)],_0x75a614=this[_0x5daac9(0x290)][_0x5daac9(0x1f6)],_0x35aff8=_0x75a614[_0x5daac9(0x265)],_0x2f0452=_0x75a614['height'],_0x536fbe=ColorManager[_0x5daac9(0x18b)](),_0x772c72=ColorManager[_0x5daac9(0xdf)](),_0x524f70=ColorManager[_0x5daac9(0x227)](),_0x8f91d5=ColorManager[_0x5daac9(0x204)](_0x5daac9(0xf1)),_0x298cc6=ColorManager[_0x5daac9(0x204)](_0x5daac9(0x109)),_0x37ff74=this[_0x5daac9(0x289)](),_0x2ae296=_0x3f7d27[_0x5daac9(0x1e8)],_0x2d9475=_0x3f7d27['GaugeSplit'][_0x5daac9(0x154)](0x0,0x1),_0x1c0ffc=Math[_0x5daac9(0x132)](((_0x37ff74?_0x35aff8:_0x2f0452)-0x2)*_0x2d9475);_0x75a614[_0x5daac9(0xd0)](0x0,0x0,_0x35aff8,_0x2f0452,_0x536fbe);let _0x3ec85f=0x0,_0x2e1f4a=0x0,_0x5be43f=0x0,_0x4c94a2=0x0;if(_0x37ff74&&_0x2ae296){if('ddZMz'!==_0x5daac9(0x1e2))_0x3ec85f=_0x1c0ffc-0x1,_0x5be43f=_0x35aff8-0x3-_0x3ec85f,_0x75a614['gradientFillRect'](0x1,0x1,_0x3ec85f,_0x2f0452-0x2,_0x772c72,_0x524f70,![]),_0x75a614[_0x5daac9(0x1a6)](0x2+_0x3ec85f,0x1,_0x5be43f,_0x2f0452-0x2,_0x8f91d5,_0x298cc6,![]);else{this[_0x5daac9(0x19f)]=new _0x64ba7a(),this[_0x5daac9(0x19f)][_0x5daac9(0x2cf)]['x']=0.5,this['_skinSprite'][_0x5daac9(0x2cf)]['y']=0.5,this[_0x5daac9(0x13a)](this[_0x5daac9(0x19f)]);const _0x5890e3=_0x51db7a[_0x5daac9(0x1c9)][_0x5daac9(0x1a9)];if(_0x5890e3)this[_0x5daac9(0x19f)][_0x5daac9(0x1f6)]=_0x21e1e4[_0x5daac9(0xf4)](_0x5890e3);}}else{if(_0x37ff74&&!_0x2ae296){if('dftZy'!==_0x5daac9(0x157)){const _0x45f58e=this[_0x5daac9(0x150)]();if(!_0x45f58e)return;if(!_0x45f58e['isEnemy']())return;if(this['_graphicHue']===_0x45f58e[_0x5daac9(0xac)]())return;this[_0x5daac9(0x2a6)]=_0x45f58e[_0x5daac9(0xac)](),this[_0x5daac9(0x202)][_0x5daac9(0x2c1)](_0x45f58e[_0x5daac9(0x29e)]()?0x0:this['_graphicHue']);}else _0x3ec85f=_0x1c0ffc-0x1,_0x5be43f=_0x35aff8-0x3-_0x3ec85f,_0x75a614['gradientFillRect'](0x2+_0x5be43f,0x1,_0x3ec85f,_0x2f0452-0x2,_0x772c72,_0x524f70,![]),_0x75a614[_0x5daac9(0x1a6)](0x1,0x1,_0x5be43f,_0x2f0452-0x2,_0x8f91d5,_0x298cc6,![]);}else{if(!_0x37ff74&&_0x2ae296){if(_0x5daac9(0x2c8)!==_0x5daac9(0x2c8)){const _0x457c19=_0x32061e[_0x5daac9(0x21a)],_0x3e77f1=_0x4aebd7[_0x5daac9(0xb3)],_0x152901=_0x4a2b43[_0x5daac9(0xd2)];_0x32a213[_0x5daac9(0x111)]([this],_0x457c19,_0x3e77f1,_0x152901);}else _0x2e1f4a=_0x1c0ffc-0x1,_0x4c94a2=_0x2f0452-0x3-_0x2e1f4a,_0x75a614['gradientFillRect'](0x1,0x1,_0x35aff8-0x2,_0x2e1f4a,_0x772c72,_0x524f70,!![]),_0x75a614['gradientFillRect'](0x1,0x2+_0x2e1f4a,_0x35aff8-0x2,_0x4c94a2,_0x8f91d5,_0x298cc6,!![]);}else{if(!_0x37ff74&&!_0x2ae296){if(_0x5daac9(0xda)===_0x5daac9(0xda))_0x2e1f4a=_0x1c0ffc-0x1,_0x4c94a2=_0x2f0452-0x3-_0x2e1f4a,_0x75a614[_0x5daac9(0x1a6)](0x1,0x2+_0x4c94a2,_0x35aff8-0x2,_0x2e1f4a,_0x772c72,_0x524f70,!![]),_0x75a614['gradientFillRect'](0x1,0x1,_0x35aff8-0x2,_0x4c94a2,_0x8f91d5,_0x298cc6,!![]);else{if(!_0x194b05)return;if(!this[_0x5daac9(0xea)])return;if(_0x51b510['isActor']()){}else{if(_0x47b5ad['isEnemy']()){if(this['constructor']===_0xd2b73e&&_0x104620[_0x5daac9(0x29e)]())return;if(this[_0x5daac9(0x2d4)]===_0x2677ee&&!_0x1f3526[_0x5daac9(0x29e)]())return;}}this['_atbGaugeSprite']['setup'](_0x34d03e,_0x5daac9(0x1af));}}}}}},Sprite_FieldGaugeATB[_0x31935f(0x1a2)][_0x31935f(0x2d9)]=function(){const _0x478e57=_0x31935f;if(this[_0x478e57(0x2b7)]){if('zkQuy'===_0x478e57(0x180))this['_gaugeSprite'][_0x478e57(0x2a1)](this[_0x478e57(0x2b7)]);else return _0x2b1837(_0x2bf29d['$1']);}this[_0x478e57(0x2b7)]=new Sprite(),this[_0x478e57(0x290)][_0x478e57(0x13a)](this[_0x478e57(0x2b7)]),this[_0x478e57(0x1d0)]();},Sprite_FieldGaugeATB[_0x31935f(0x1a2)][_0x31935f(0x1d0)]=function(){const _0x427764=_0x31935f;this[_0x427764(0x19b)](),this['createActorSprites']();},Sprite_FieldGaugeATB[_0x31935f(0x1a2)][_0x31935f(0x19b)]=function(){const _0x1f8341=_0x31935f,_0x279c43=$gameTroop[_0x1f8341(0xdc)](),_0x376b5e=_0x279c43[_0x1f8341(0x28e)];for(let _0x2ea425=0x0;_0x2ea425<_0x376b5e;_0x2ea425++){if('sdIJN'!==_0x1f8341(0x26c))this[_0x1f8341(0xdb)](_0x2ea425,$gameTroop);else return this['_fieldAtbGaugeIconIndex']===_0x3c382f&&(this[_0x1f8341(0x16b)]=this[_0x1f8341(0x160)]()),this[_0x1f8341(0x16b)];}},Sprite_FieldGaugeATB[_0x31935f(0x1a2)][_0x31935f(0x145)]=function(){const _0x21908b=_0x31935f,_0x129b74=$gameParty[_0x21908b(0x144)]();for(let _0x30b739=0x0;_0x30b739<_0x129b74;_0x30b739++){_0x21908b(0x122)!==_0x21908b(0x122)?(_0x341d63[_0x21908b(0x2c6)][_0x21908b(0x115)]['call'](this),this[_0x21908b(0x1cc)]()):this['createBattlerSprite'](_0x30b739,$gameParty);}},Sprite_FieldGaugeATB[_0x31935f(0x1a2)][_0x31935f(0xdb)]=function(_0x1e97c3,_0x111fde){const _0x7891ba=_0x31935f,_0x585cf9=new Sprite_FieldMarkerATB(_0x1e97c3,_0x111fde,this[_0x7891ba(0x290)]);this[_0x7891ba(0x2b7)]['addChild'](_0x585cf9);},Sprite_FieldGaugeATB[_0x31935f(0x1a2)]['update']=function(){const _0x103ab7=_0x31935f;Sprite[_0x103ab7(0x1a2)][_0x103ab7(0x2be)][_0x103ab7(0x230)](this),this['updatePosition'](),this[_0x103ab7(0x28b)](),this[_0x103ab7(0xca)]();},Sprite_FieldGaugeATB[_0x31935f(0x1a2)][_0x31935f(0x172)]=function(){const _0x2a1593=_0x31935f,_0x5ecd67=Sprite_FieldGaugeATB[_0x2a1593(0x1c9)];if(_0x5ecd67['DisplayPosition']!==_0x2a1593(0x26e))return;if(!_0x5ecd67[_0x2a1593(0x1c3)])return;const _0x4f030c=SceneManager[_0x2a1593(0x213)][_0x2a1593(0x206)];if(!_0x4f030c)return;_0x4f030c[_0x2a1593(0x2ce)]?(this['x']=this[_0x2a1593(0x1b6)]+(_0x5ecd67[_0x2a1593(0x1fb)]||0x0),this['y']=this['_homeY']+(_0x5ecd67[_0x2a1593(0x245)]||0x0)):_0x2a1593(0x1f4)==='UvVzV'?(this['x']=this[_0x2a1593(0x1b6)],this['y']=this['_homeY']):_0x34e2d5['setAtbChargeTime'](_0x3b4871(_0x436f6d['$1'])*0.01);const _0x52c70b=SceneManager[_0x2a1593(0x213)]['_windowLayer'];this['x']+=_0x52c70b['x'],this['y']+=_0x52c70b['y'];},Sprite_FieldGaugeATB[_0x31935f(0x1a2)][_0x31935f(0x28b)]=function(){const _0x4f3a94=_0x31935f;if(!this[_0x4f3a94(0x2b7)])return;const _0x439395=this[_0x4f3a94(0x2b7)][_0x4f3a94(0x13f)];if(!_0x439395)return;_0x439395[_0x4f3a94(0x17f)](this[_0x4f3a94(0x217)]['bind'](this));},Sprite_FieldGaugeATB['prototype'][_0x31935f(0x217)]=function(_0x4dde1f,_0x407bdb){const _0x4cab0e=_0x31935f,_0x167c56=this[_0x4cab0e(0x289)](),_0x206770=Sprite_FieldGaugeATB['Settings'][_0x4cab0e(0x1e8)];if(_0x167c56&&_0x206770){if(_0x4cab0e(0x276)!==_0x4cab0e(0x276)){if(this[_0x4cab0e(0x102)]()){if(!this['isTpbCharged']())return![];}}else return _0x4dde1f['x']-_0x407bdb['x'];}else{if(_0x167c56&&!_0x206770){if(_0x4cab0e(0x2bd)===_0x4cab0e(0x12d)){if(_0x37fac0[_0x4cab0e(0x184)]()[_0x4cab0e(0x1ff)](_0x37813d=>_0x37813d&&_0x37813d[_0x4cab0e(0x237)]()&&_0x37813d[_0x4cab0e(0x28a)]()&&_0x37813d[_0x4cab0e(0x103)]==='ready'))return;}else return _0x407bdb['x']-_0x4dde1f['x'];}else{if(!_0x167c56&&_0x206770)return _0x4dde1f['y']-_0x407bdb['y'];else{if(!_0x167c56&&!_0x206770)return _0x407bdb['y']-_0x4dde1f['y'];}}}},Sprite_FieldGaugeATB[_0x31935f(0x1a2)][_0x31935f(0xca)]=function(){const _0x87b804=_0x31935f;this['visible']=$gameSystem[_0x87b804(0x1a4)]();};function Sprite_FieldMarkerATB(){this['initialize'](...arguments);}function _0x4bed(_0x370b8d,_0x6952f){const _0x4cc371=_0x4cc3();return _0x4bed=function(_0x4bede8,_0x3e4831){_0x4bede8=_0x4bede8-0xac;let _0x39cee6=_0x4cc371[_0x4bede8];return _0x39cee6;},_0x4bed(_0x370b8d,_0x6952f);}Sprite_FieldMarkerATB[_0x31935f(0x1a2)]=Object['create'](Sprite_Clickable[_0x31935f(0x1a2)]),Sprite_FieldMarkerATB['prototype']['constructor']=Sprite_FieldMarkerATB,Sprite_FieldMarkerATB[_0x31935f(0x1a2)][_0x31935f(0x2d8)]=function(_0x507cf7,_0x55c59e,_0x3f1252){const _0x55cf01=_0x31935f;this[_0x55cf01(0xbe)]=_0x507cf7,this[_0x55cf01(0xe5)]=_0x55c59e,this['_gaugeSprite']=_0x3f1252,Sprite_Clickable['prototype']['initialize'][_0x55cf01(0x230)](this),this['initMembers'](),this[_0x55cf01(0x270)](),this[_0x55cf01(0x14a)]=this['targetOpacity']();},Sprite_FieldMarkerATB[_0x31935f(0x1a2)][_0x31935f(0x17a)]=function(){const _0x12203d=_0x31935f;this[_0x12203d(0x2cf)]['x']=0.5,this[_0x12203d(0x2cf)]['y']=0.5;},Sprite_FieldMarkerATB[_0x31935f(0x1a2)][_0x31935f(0x270)]=function(){const _0x537df3=_0x31935f;this['createBackgroundSprite'](),this[_0x537df3(0x17e)](),this['createBorderSprite'](),this[_0x537df3(0x1e5)](),this[_0x537df3(0xc5)](),this[_0x537df3(0x1cb)](!![]);},Sprite_FieldMarkerATB[_0x31935f(0x1a2)][_0x31935f(0x220)]=function(){const _0x5455dd=_0x31935f;if(!Sprite_FieldGaugeATB[_0x5455dd(0x1c9)][_0x5455dd(0x1b7)])return;const _0x2a340d=Sprite_FieldGaugeATB['Settings'],_0x278690=this[_0x5455dd(0xe5)]===$gameParty?_0x5455dd(0x19c):'Enemy',_0x12c90e=_0x5455dd(0x2c3)[_0x5455dd(0x29f)](_0x278690),_0x2e6632=new Sprite();_0x2e6632[_0x5455dd(0x2cf)]['x']=this[_0x5455dd(0x2cf)]['x'],_0x2e6632[_0x5455dd(0x2cf)]['y']=this[_0x5455dd(0x2cf)]['y'];if(_0x2a340d[_0x12c90e])_0x5455dd(0x2b1)!=='VzDss'?_0x2e6632[_0x5455dd(0x1f6)]=ImageManager[_0x5455dd(0xf4)](_0x2a340d[_0x12c90e]):(_0x1724f0[_0x5455dd(0x1d1)](_0x376e36+_0x4f8e7e,_0x1e9cc4,_0x158bb2,_0x266ffc),_0x4a3483['y']-=_0x4cd63f,_0x63a410[_0x5455dd(0x2cf)]['y']=0x1);else{if(_0x5455dd(0x1ab)!==_0x5455dd(0x1ab))_0xb9d0db['y']+=_0x1eca4a['gaugeHeight']()*_0x5db011[_0x5455dd(0x104)]-0x1;else{const _0x2bd3b4=_0x2a340d['MarkerSize'];_0x2e6632[_0x5455dd(0x1f6)]=new Bitmap(_0x2bd3b4,_0x2bd3b4);const _0x564d6d=ColorManager[_0x5455dd(0x27d)](_0x2a340d[_0x5455dd(0x222)[_0x5455dd(0x29f)](_0x278690)]),_0x1087c8=ColorManager[_0x5455dd(0x27d)](_0x2a340d[_0x5455dd(0x2d1)[_0x5455dd(0x29f)](_0x278690)]);_0x2e6632[_0x5455dd(0x1f6)]['gradientFillRect'](0x0,0x0,_0x2bd3b4,_0x2bd3b4,_0x564d6d,_0x1087c8,!![]);}}this[_0x5455dd(0x1ea)]=_0x2e6632,this['addChild'](this['_backgroundSprite']),this['width']=this[_0x5455dd(0x1ea)]['width'],this[_0x5455dd(0x281)]=this[_0x5455dd(0x1ea)][_0x5455dd(0x281)];},Sprite_FieldMarkerATB[_0x31935f(0x1a2)][_0x31935f(0x17e)]=function(){const _0x58c27c=_0x31935f,_0x30933b=new Sprite();_0x30933b[_0x58c27c(0x2cf)]['x']=this[_0x58c27c(0x2cf)]['x'],_0x30933b[_0x58c27c(0x2cf)]['y']=this[_0x58c27c(0x2cf)]['y'],this[_0x58c27c(0x202)]=_0x30933b,this['addChild'](this[_0x58c27c(0x202)]),this[_0x58c27c(0x209)]();},Sprite_FieldMarkerATB[_0x31935f(0x1a2)]['createBorderSprite']=function(){const _0xc5ee21=_0x31935f;if(!Sprite_FieldGaugeATB[_0xc5ee21(0x1c9)][_0xc5ee21(0x125)])return;const _0x4cdd64=Sprite_FieldGaugeATB['Settings'],_0x4145dc=this[_0xc5ee21(0xe5)]===$gameParty?_0xc5ee21(0x19c):_0xc5ee21(0x185),_0x65cb52=_0xc5ee21(0x271)[_0xc5ee21(0x29f)](_0x4145dc),_0xed549d=new Sprite();_0xed549d[_0xc5ee21(0x2cf)]['x']=this[_0xc5ee21(0x2cf)]['x'],_0xed549d[_0xc5ee21(0x2cf)]['y']=this['anchor']['y'];if(_0x4cdd64[_0x65cb52])_0xc5ee21(0x1d4)!==_0xc5ee21(0x1d4)?_0x138f43[_0xc5ee21(0x128)]=![]:_0xed549d[_0xc5ee21(0x1f6)]=ImageManager[_0xc5ee21(0xf4)](_0x4cdd64[_0x65cb52]);else{let _0x5d1592=_0x4cdd64['MarkerSize'],_0x527c62=_0x4cdd64[_0xc5ee21(0x210)];_0xed549d[_0xc5ee21(0x1f6)]=new Bitmap(_0x5d1592,_0x5d1592);const _0x510d2a=_0xc5ee21(0x228),_0x9b1818=ColorManager['getColor'](_0x4cdd64[_0xc5ee21(0x208)['format'](_0x4145dc)]);_0xed549d[_0xc5ee21(0x1f6)][_0xc5ee21(0xd0)](0x0,0x0,_0x5d1592,_0x5d1592,_0x510d2a),_0x5d1592-=0x2,_0xed549d[_0xc5ee21(0x1f6)][_0xc5ee21(0xd0)](0x1,0x1,_0x5d1592,_0x5d1592,_0x9b1818),_0x5d1592-=_0x527c62*0x2,_0xed549d[_0xc5ee21(0x1f6)][_0xc5ee21(0xd0)](0x1+_0x527c62,0x1+_0x527c62,_0x5d1592,_0x5d1592,_0x510d2a),_0x5d1592-=0x2,_0x527c62+=0x1,_0xed549d[_0xc5ee21(0x1f6)][_0xc5ee21(0x216)](0x1+_0x527c62,0x1+_0x527c62,_0x5d1592,_0x5d1592);}this['_backgroundSprite']=_0xed549d,this['addChild'](this['_backgroundSprite']);},Sprite_FieldMarkerATB[_0x31935f(0x1a2)][_0x31935f(0x1e5)]=function(){const _0x2b17c7=_0x31935f,_0x491487=Sprite_FieldGaugeATB[_0x2b17c7(0x1c9)];if(!_0x491487[_0x2b17c7(0xc0)])return;if(this[_0x2b17c7(0xe5)]===$gameParty)return;const _0x868907=_0x491487[_0x2b17c7(0x106)],_0x333c7f=new Sprite();_0x333c7f[_0x2b17c7(0x2cf)]['x']=this[_0x2b17c7(0x2cf)]['x'],_0x333c7f[_0x2b17c7(0x2cf)]['y']=this[_0x2b17c7(0x2cf)]['y'],_0x333c7f[_0x2b17c7(0x1f6)]=new Bitmap(_0x868907,_0x868907),this[_0x2b17c7(0x197)]=_0x333c7f,this[_0x2b17c7(0x13a)](this[_0x2b17c7(0x197)]);},Sprite_FieldMarkerATB['prototype'][_0x31935f(0xc5)]=function(){const _0x265fb2=_0x31935f,_0x39d664=Sprite_FieldGaugeATB[_0x265fb2(0x1c9)];if(!_0x39d664[_0x265fb2(0x26a)])return;const _0x170576=new Sprite();_0x170576[_0x265fb2(0x2cf)]['x']=this['anchor']['x'],_0x170576[_0x265fb2(0x2cf)]['y']=this['anchor']['y'],this[_0x265fb2(0x205)](_0x170576),this[_0x265fb2(0xe1)]=_0x170576,this[_0x265fb2(0x13a)](this[_0x265fb2(0xe1)]);},Sprite_FieldMarkerATB['prototype'][_0x31935f(0x205)]=function(_0x19d7d2){const _0x41a94f=_0x31935f,_0x2ed3fd=Sprite_FieldGaugeATB[_0x41a94f(0x1c9)],_0x2a9fcd=_0x2ed3fd[_0x41a94f(0x106)],_0x46e7fb=Math[_0x41a94f(0xf7)](_0x2a9fcd/0x2),_0x5c78ab=this['isGaugeHorizontal'](),_0xb9b445=this['_unit']===$gameParty?_0x41a94f(0x19c):_0x41a94f(0x185),_0x56ffb2=_0x2ed3fd[_0x41a94f(0xde)[_0x41a94f(0x29f)](_0xb9b445)];_0x19d7d2[_0x41a94f(0x1f6)]=ImageManager[_0x41a94f(0xf4)](_0x2ed3fd[_0x41a94f(0x2ba)]);const _0x30fd38=0x18,_0x444332=_0x30fd38/0x2,_0x308eb1=0x60+_0x30fd38,_0x14ef30=0x0+_0x30fd38;if(_0x5c78ab&&_0x56ffb2)_0x19d7d2[_0x41a94f(0x1d1)](_0x308eb1+_0x444332,_0x14ef30+_0x444332+_0x30fd38,_0x30fd38,_0x444332),_0x19d7d2['y']+=_0x46e7fb,_0x19d7d2[_0x41a94f(0x2cf)]['y']=0x0;else{if(_0x5c78ab&&!_0x56ffb2)_0x19d7d2[_0x41a94f(0x1d1)](_0x308eb1+_0x444332,_0x14ef30,_0x30fd38,_0x444332),_0x19d7d2['y']-=_0x46e7fb,_0x19d7d2['anchor']['y']=0x1;else{if(!_0x5c78ab&&_0x56ffb2){if(_0x41a94f(0x16d)!==_0x41a94f(0x16d)){if(!this[_0x41a94f(0x23e)]())return;if(!this['currentAction']())return;if(!this[_0x41a94f(0x126)]()[_0x41a94f(0x121)]())return;if(this[_0x41a94f(0x126)]()['item']()[_0x41a94f(0x1ad)][_0x41a94f(0x2bc)](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i))return;this[_0x41a94f(0x2d0)](),this[_0x41a94f(0x169)](),this[_0x41a94f(0xf0)]=0x0,this[_0x41a94f(0x2c0)]();}else _0x19d7d2[_0x41a94f(0x1d1)](_0x308eb1,_0x14ef30+_0x444332,_0x444332,_0x30fd38),_0x19d7d2['x']-=Math[_0x41a94f(0x132)](_0x46e7fb*1.75),_0x19d7d2['anchor']['x']=0x0;}else!_0x5c78ab&&!_0x56ffb2&&(_0x41a94f(0x18c)!=='zAdeX'?(_0x19d7d2[_0x41a94f(0x1d1)](_0x308eb1+_0x30fd38+_0x444332,_0x14ef30+_0x444332,_0x444332,_0x30fd38),_0x19d7d2['x']+=Math[_0x41a94f(0x132)](_0x46e7fb*1.75),_0x19d7d2[_0x41a94f(0x2cf)]['x']=0x1):_0x572ab7[_0x41a94f(0x128)]=!![]);}}},Sprite_FieldMarkerATB[_0x31935f(0x1a2)]['battler']=function(){const _0x3f7f9=_0x31935f;if(this[_0x3f7f9(0xe5)]===$gameParty){if(_0x3f7f9(0xc9)!==_0x3f7f9(0xd5))return $gameParty[_0x3f7f9(0x1f7)]()[this[_0x3f7f9(0xbe)]];else this[_0x3f7f9(0x166)]=this['createFieldAtbGraphicFaceName']();}else return $gameTroop['members']()[this[_0x3f7f9(0xbe)]];},Sprite_FieldMarkerATB[_0x31935f(0x1a2)][_0x31935f(0x2be)]=function(){const _0x32ba8d=_0x31935f;Sprite_Clickable[_0x32ba8d(0x1a2)][_0x32ba8d(0x2be)][_0x32ba8d(0x230)](this),this[_0x32ba8d(0x28d)](),this[_0x32ba8d(0x113)](),this['updatePositionOnGauge'](),this[_0x32ba8d(0x124)](),this[_0x32ba8d(0xc8)](),this[_0x32ba8d(0x229)](),this[_0x32ba8d(0xbc)]();},Sprite_FieldMarkerATB['prototype']['updateOpacity']=function(){const _0x371974=_0x31935f,_0x154a74=this[_0x371974(0x27b)](),_0x2b797c=Sprite_FieldGaugeATB[_0x371974(0x1c9)][_0x371974(0x117)];if(this[_0x371974(0x14a)]>_0x154a74)_0x371974(0x2ac)===_0x371974(0x2ac)?this[_0x371974(0x14a)]=Math[_0x371974(0x219)](_0x154a74,this['opacity']-_0x2b797c):(this[_0x371974(0x258)](_0x371974(0x1f8)),this['_tpbTurnEnd']=![],this['_tpbTurnCount']++,this['_tpbIdleTime']=0x0,this['canMakeTpbActionsAtStartTpbTurn']()&&this[_0x371974(0x1bf)](),this[_0x371974(0x258)]('PostStartTurnJS'));else{if(this['opacity']<_0x154a74){if('ZyeXd'!==_0x371974(0x10c))this[_0x371974(0x14a)]=Math['min'](_0x154a74,this[_0x371974(0x14a)]+_0x2b797c);else{const _0x2050a9=_0x493cd6[_0x371974(0x1c9)],_0x602bc1=this['battler'](),_0x1b3ef9=this[_0x371974(0x289)](),_0x5b98be=this[_0x371974(0x290)]['bitmap'][_0x371974(0x265)],_0x45603f=this[_0x371974(0x290)][_0x371974(0x1f6)][_0x371974(0x281)],_0x1f7e4e=_0x2050a9['GaugeSplit'][_0x371974(0x154)](0x0,0x1),_0x537bec=_0x2050a9[_0x371974(0x1e8)];let _0x33eed3=_0x602bc1['tpbChargeTime']()*_0x1f7e4e;_0x33eed3+=(0x1-_0x1f7e4e)*_0x602bc1['getAtbCastTimeRate']();if(_0x602bc1===_0x2b92a2[_0x371974(0x100)])_0x33eed3=0x1;if(!_0x537bec)_0x33eed3=0x1-_0x33eed3;let _0x2ae69e=0x0;if(_0x1b3ef9)_0x2ae69e=_0x33eed3*_0x5b98be;else!_0x1b3ef9&&(_0x2ae69e=_0x33eed3*_0x45603f);return _0x53f8eb[_0x371974(0xf7)](_0x2ae69e);}}}},Sprite_FieldMarkerATB[_0x31935f(0x1a2)][_0x31935f(0x27b)]=function(){const _0x3f839d=_0x31935f,_0x2170cf=this[_0x3f839d(0x150)]();if(!_0x2170cf)return 0x0;if(_0x2170cf[_0x3f839d(0x2dc)]())return 0x0;if(_0x2170cf['isDead']())return 0x0;return 0xff;},Sprite_FieldMarkerATB[_0x31935f(0x1a2)][_0x31935f(0x289)]=function(){const _0x14bcbe=_0x31935f;if(this[_0x14bcbe(0x1fc)]!==undefined)return this[_0x14bcbe(0x1fc)];const _0x4186ef=Sprite_FieldGaugeATB['Settings']['DisplayPosition'];return this['_horz']=[_0x14bcbe(0x26e),_0x14bcbe(0x13b)][_0x14bcbe(0xe3)](_0x4186ef),this[_0x14bcbe(0x1fc)];},Sprite_FieldMarkerATB['prototype']['updatePositionOffset']=function(){const _0x3c3d77=_0x31935f,_0x53e3e0=Sprite_FieldGaugeATB['Settings'],_0x1f3b4e=this[_0x3c3d77(0x289)](),_0x3e2de8=this[_0x3c3d77(0xe5)]===$gameParty?_0x3c3d77(0x19c):_0x3c3d77(0x185),_0x2166ab=_0x53e3e0[_0x3c3d77(0x20b)],_0x2828b9=_0x53e3e0['%1Side'[_0x3c3d77(0x29f)](_0x3e2de8)];_0x1f3b4e?(this['y']=_0x53e3e0['GaugeThick']/0x2,this['y']+=_0x2828b9?-_0x2166ab:_0x2166ab):(this['x']=_0x53e3e0[_0x3c3d77(0x143)]/0x2,this['x']+=_0x2828b9?_0x2166ab:-_0x2166ab);},Sprite_FieldMarkerATB[_0x31935f(0x1a2)][_0x31935f(0x1cb)]=function(_0x3cf4b1){const _0x281434=_0x31935f,_0x383373=this[_0x281434(0x150)]();if(!_0x383373)return;const _0x33a50d=Sprite_FieldGaugeATB[_0x281434(0x1c9)],_0x44c596=this[_0x281434(0x289)](),_0x81f3a5=this[_0x281434(0x223)](),_0x24821f=_0x3cf4b1?Infinity:_0x33a50d['MarkerSpeed'];if(_0x44c596&&this['x']!==_0x81f3a5){if(this['x']>_0x81f3a5)this['x']=Math['max'](_0x81f3a5,this['x']-_0x24821f);if(this['x']<_0x81f3a5)this['x']=Math['min'](_0x81f3a5,this['x']+_0x24821f);}else{if(!_0x44c596&&this['x']!==_0x81f3a5){if(_0x281434(0x1d6)==='cZTfg'){if(this['y']>_0x81f3a5)this['y']=Math[_0x281434(0x219)](_0x81f3a5,this['y']-_0x24821f);if(this['y']<_0x81f3a5)this['y']=Math[_0x281434(0x15c)](_0x81f3a5,this['y']+_0x24821f);}else this[_0x281434(0xbe)]=_0x15cd66,this[_0x281434(0xe5)]=_0x46d2b4,this[_0x281434(0x290)]=_0x460ca2,_0x53a397['prototype'][_0x281434(0x2d8)][_0x281434(0x230)](this),this['initMembers'](),this[_0x281434(0x270)](),this[_0x281434(0x14a)]=this[_0x281434(0x27b)]();}}},Sprite_FieldMarkerATB[_0x31935f(0x1a2)]['targetPositionOnGauge']=function(){const _0x124948=_0x31935f,_0x1a4c98=Sprite_FieldGaugeATB[_0x124948(0x1c9)],_0x5b0dd5=this[_0x124948(0x150)](),_0x2dee76=this[_0x124948(0x289)](),_0x1aacdd=this[_0x124948(0x290)][_0x124948(0x1f6)][_0x124948(0x265)],_0x5aab2a=this[_0x124948(0x290)][_0x124948(0x1f6)][_0x124948(0x281)],_0x34d4f3=_0x1a4c98['GaugeSplit'][_0x124948(0x154)](0x0,0x1),_0x38e34b=_0x1a4c98[_0x124948(0x1e8)];let _0x1d8942=_0x5b0dd5[_0x124948(0x155)]()*_0x34d4f3;_0x1d8942+=(0x1-_0x34d4f3)*_0x5b0dd5[_0x124948(0x1bc)]();if(_0x5b0dd5===BattleManager[_0x124948(0x100)])_0x1d8942=0x1;if(!_0x38e34b)_0x1d8942=0x1-_0x1d8942;let _0x198d8a=0x0;if(_0x2dee76)_0x198d8a=_0x1d8942*_0x1aacdd;else!_0x2dee76&&(_0x198d8a=_0x1d8942*_0x5aab2a);return Math[_0x124948(0xf7)](_0x198d8a);},Sprite_FieldMarkerATB['prototype'][_0x31935f(0x124)]=function(){const _0x5f10c4=_0x31935f,_0x211f23=this[_0x5f10c4(0x150)]();if(!_0x211f23)return;const _0x2241a2=Sprite_FieldGaugeATB[_0x5f10c4(0x1c9)],_0x201a24=this[_0x5f10c4(0xe5)]===$gameParty?_0x5f10c4(0x19c):_0x5f10c4(0x185);let _0x45d7e8=_0x211f23['fieldAtbGraphicType']();if(_0x211f23[_0x5f10c4(0x2bf)]()&&_0x45d7e8==='enemy')_0x45d7e8='face';else _0x211f23[_0x5f10c4(0x102)]()&&_0x45d7e8==='svactor'&&(_0x5f10c4(0x1d2)!==_0x5f10c4(0x1d2)?_0x142cdc[_0x5f10c4(0xb8)]():_0x45d7e8=_0x5f10c4(0x24e));if(this[_0x5f10c4(0x1cd)]!==_0x45d7e8)return this[_0x5f10c4(0x209)]();switch(this[_0x5f10c4(0x1cd)]){case'face':if(this[_0x5f10c4(0x108)]!==_0x211f23[_0x5f10c4(0x136)]())return this['processUpdateGraphic']();if(this['_graphicFaceIndex']!==_0x211f23[_0x5f10c4(0x298)]())return this['processUpdateGraphic']();break;case'icon':if(this['_graphicIconIndex']!==_0x211f23[_0x5f10c4(0x242)]()){if(_0x5f10c4(0x21b)===_0x5f10c4(0x21b))return this[_0x5f10c4(0x209)]();else{if(this[_0x5f10c4(0x128)]){if(!this[_0x5f10c4(0x23e)]())return;}_0x4c384a[_0x5f10c4(0x2c6)][_0x5f10c4(0x107)]['call'](this);}}break;case _0x5f10c4(0x24e):if(_0x211f23['hasSvBattler']()){if(this[_0x5f10c4(0x12a)]!==_0x211f23[_0x5f10c4(0x286)]())return this['processUpdateGraphic']();}else{if(this[_0x5f10c4(0x235)]!==_0x211f23[_0x5f10c4(0x214)]()){if('unpUg'!==_0x5f10c4(0x24f))return this[_0x5f10c4(0x209)]();else{const _0x9372c1=_0x111822[_0x5f10c4(0x1c9)],_0x3326a3=_0x9372c1['MarkerSize'];this['_graphicSprite']['bitmap']=new _0x2177e4(_0x3326a3,_0x3326a3);const _0x573c56=this['_graphicSprite'][_0x5f10c4(0x1f6)],_0x2f1b1c=this['_graphicSv']['match'](/\$/i),_0x4072aa=_0x2f1b1c?0x1:_0x55059d[_0x5f10c4(0x114)],_0x51353a=_0x2f1b1c?0x1:_0x5322de[_0x5f10c4(0x1a3)],_0xc1da2c=_0x2b0d7b[_0x5f10c4(0x265)]/_0x4072aa,_0x282aeb=_0x141b20['height']/_0x51353a,_0x464af5=_0xbb531[_0x5f10c4(0x15c)](0x1,_0x3326a3/_0xc1da2c,_0x3326a3/_0x282aeb),_0x3f438f=_0xc1da2c*_0x464af5,_0x7bb1e7=_0x282aeb*_0x464af5,_0x5b1c3f=_0x249955[_0x5f10c4(0xf7)]((_0x3326a3-_0x3f438f)/0x2),_0x21d12a=_0x50d663[_0x5f10c4(0xf7)]((_0x3326a3-_0x7bb1e7)/0x2);_0x573c56[_0x5f10c4(0x18e)](_0x5b869f,0x0,0x0,_0xc1da2c,_0x282aeb,_0x5b1c3f,_0x21d12a,_0x3f438f,_0x7bb1e7);}}}break;case _0x5f10c4(0x182):if(_0x211f23[_0x5f10c4(0x2bf)]()){if(_0x5f10c4(0x193)===_0x5f10c4(0x193)){if(this[_0x5f10c4(0x12a)]!==_0x211f23['battlerName']()){if(_0x5f10c4(0x146)===_0x5f10c4(0x2c5))_0x336867[_0x5f10c4(0x251)](_0x3b0242(_0x308479['$1'])*0.01);else return this[_0x5f10c4(0x209)]();}}else this['initialize'](...arguments);}else{if(this[_0x5f10c4(0x235)]!==_0x211f23['battlerName']())return this[_0x5f10c4(0x209)]();}break;}},Sprite_FieldMarkerATB[_0x31935f(0x1a2)][_0x31935f(0x209)]=function(){const _0x59defa=_0x31935f,_0x1cc9f2=this[_0x59defa(0x150)]();if(!_0x1cc9f2)return;this[_0x59defa(0x1cd)]=_0x1cc9f2[_0x59defa(0x23d)]();if(_0x1cc9f2[_0x59defa(0x2bf)]()&&this[_0x59defa(0x1cd)]==='enemy')this[_0x59defa(0x1cd)]=_0x59defa(0x1f2);else _0x1cc9f2[_0x59defa(0x102)]()&&this[_0x59defa(0x1cd)]==='svactor'&&(this['_graphicType']='enemy');let _0x108bd9;switch(this[_0x59defa(0x1cd)]){case _0x59defa(0x1f2):this['_graphicFaceName']=_0x1cc9f2[_0x59defa(0x136)](),this[_0x59defa(0x2c9)]=_0x1cc9f2[_0x59defa(0x298)](),_0x108bd9=ImageManager[_0x59defa(0x15f)](this[_0x59defa(0x108)]),_0x108bd9[_0x59defa(0xb5)](this[_0x59defa(0xe9)][_0x59defa(0x137)](this,_0x108bd9));break;case _0x59defa(0x226):this[_0x59defa(0x11f)]=_0x1cc9f2['fieldAtbGraphicIconIndex'](),_0x108bd9=ImageManager[_0x59defa(0xf4)](_0x59defa(0x268)),_0x108bd9['addLoadListener'](this[_0x59defa(0x280)][_0x59defa(0x137)](this,_0x108bd9));break;case _0x59defa(0x24e):if(_0x1cc9f2['hasSvBattler']()){if(_0x59defa(0x196)==='WNYqG')this[_0x59defa(0x12a)]=_0x1cc9f2['svBattlerName'](),_0x108bd9=ImageManager[_0x59defa(0x1c8)](this['_graphicSv']),_0x108bd9[_0x59defa(0xb5)](this['changeSvActorGraphicBitmap'][_0x59defa(0x137)](this,_0x108bd9));else return _0x29e819[_0x59defa(0x2c6)]['Settings'][_0x59defa(0x2d6)][_0x59defa(0x148)][_0x59defa(0x230)](this,this);}else $gameSystem[_0x59defa(0x163)]()?(this['_graphicEnemy']=_0x1cc9f2[_0x59defa(0x214)](),_0x108bd9=ImageManager[_0x59defa(0x105)](this[_0x59defa(0x235)]),_0x108bd9[_0x59defa(0xb5)](this[_0x59defa(0x18a)][_0x59defa(0x137)](this,_0x108bd9))):(this['_graphicEnemy']=_0x1cc9f2[_0x59defa(0x214)](),_0x108bd9=ImageManager[_0x59defa(0x1bd)](this[_0x59defa(0x235)]),_0x108bd9[_0x59defa(0xb5)](this['changeEnemyGraphicBitmap'][_0x59defa(0x137)](this,_0x108bd9)));break;case _0x59defa(0x182):this[_0x59defa(0x12a)]=_0x1cc9f2[_0x59defa(0x214)](),_0x108bd9=ImageManager[_0x59defa(0x1c8)](this[_0x59defa(0x12a)]),_0x108bd9['addLoadListener'](this[_0x59defa(0x29a)][_0x59defa(0x137)](this,_0x108bd9));break;}},Sprite_FieldMarkerATB[_0x31935f(0x1a2)][_0x31935f(0xe9)]=function(_0x1a0276){const _0x16515a=_0x31935f,_0x3ef9ea=Sprite_FieldGaugeATB['Settings'],_0x25bd92=_0x3ef9ea['MarkerSize'],_0x398ae7=this[_0x16515a(0x2c9)];this[_0x16515a(0x202)][_0x16515a(0x1f6)]=new Bitmap(_0x25bd92,_0x25bd92);const _0x18282b=this[_0x16515a(0x202)]['bitmap'],_0x28df46=ImageManager['faceWidth'],_0x4bc4ff=ImageManager[_0x16515a(0x297)],_0x3149e3=ImageManager[_0x16515a(0x1b1)],_0x4be340=ImageManager[_0x16515a(0x297)],_0x58ed4b=_0x398ae7%0x4*_0x28df46+(_0x28df46-_0x3149e3)/0x2,_0x323f76=Math[_0x16515a(0x224)](_0x398ae7/0x4)*_0x4bc4ff+(_0x4bc4ff-_0x4be340)/0x2;_0x18282b[_0x16515a(0x18e)](_0x1a0276,_0x58ed4b,_0x323f76,_0x3149e3,_0x4be340,0x0,0x0,_0x25bd92,_0x25bd92);},Sprite_FieldMarkerATB['prototype'][_0x31935f(0x280)]=function(_0x5dc410){const _0x4d4fc6=_0x31935f,_0x145dc5=Sprite_FieldGaugeATB[_0x4d4fc6(0x1c9)],_0x28e1b6=_0x145dc5[_0x4d4fc6(0x106)],_0x316799=this[_0x4d4fc6(0x11f)];this[_0x4d4fc6(0x202)][_0x4d4fc6(0x1f6)]=new Bitmap(_0x28e1b6,_0x28e1b6);const _0x34c5f7=this[_0x4d4fc6(0x202)]['bitmap'],_0x37b452=ImageManager['iconWidth'],_0x5c1d2d=ImageManager[_0x4d4fc6(0x1a5)],_0x5e2779=_0x316799%0x10*_0x37b452,_0x3d6ef4=Math['floor'](_0x316799/0x10)*_0x5c1d2d;_0x34c5f7[_0x4d4fc6(0x18e)](_0x5dc410,_0x5e2779,_0x3d6ef4,_0x37b452,_0x5c1d2d,0x0,0x0,_0x28e1b6,_0x28e1b6);},Sprite_FieldMarkerATB['prototype']['changeSvActorGraphicBitmap']=function(_0x29c36d){const _0x42f804=_0x31935f,_0x36fed8=Sprite_FieldGaugeATB[_0x42f804(0x1c9)],_0x434d93=_0x36fed8[_0x42f804(0x106)];this[_0x42f804(0x202)][_0x42f804(0x1f6)]=new Bitmap(_0x434d93,_0x434d93);const _0x561057=this[_0x42f804(0x202)][_0x42f804(0x1f6)],_0x599d3a=this['_graphicSv'][_0x42f804(0x2bc)](/\$/i),_0x4a4951=_0x599d3a?0x1:ImageManager[_0x42f804(0x114)],_0x239205=_0x599d3a?0x1:ImageManager[_0x42f804(0x1a3)],_0x2f726a=_0x29c36d[_0x42f804(0x265)]/_0x4a4951,_0x43cfdc=_0x29c36d[_0x42f804(0x281)]/_0x239205,_0x412042=Math[_0x42f804(0x15c)](0x1,_0x434d93/_0x2f726a,_0x434d93/_0x43cfdc),_0x27ee32=_0x2f726a*_0x412042,_0x715cef=_0x43cfdc*_0x412042,_0x21ea81=Math[_0x42f804(0xf7)]((_0x434d93-_0x27ee32)/0x2),_0x6b76fa=Math['round']((_0x434d93-_0x715cef)/0x2);_0x561057[_0x42f804(0x18e)](_0x29c36d,0x0,0x0,_0x2f726a,_0x43cfdc,_0x21ea81,_0x6b76fa,_0x27ee32,_0x715cef);},Sprite_FieldMarkerATB['prototype'][_0x31935f(0x18a)]=function(_0x3095b3){const _0x339c15=_0x31935f,_0x5e69ba=Sprite_FieldGaugeATB['Settings'],_0x5a0756=_0x5e69ba[_0x339c15(0x106)];this[_0x339c15(0x202)]['bitmap']=new Bitmap(_0x5a0756,_0x5a0756);const _0x11068c=this[_0x339c15(0x202)][_0x339c15(0x1f6)],_0x29eadd=Math[_0x339c15(0x15c)](0x1,_0x5a0756/_0x3095b3[_0x339c15(0x265)],_0x5a0756/_0x3095b3[_0x339c15(0x281)]),_0x3b5ea8=_0x3095b3['width']*_0x29eadd,_0x3ef32d=_0x3095b3['height']*_0x29eadd,_0x2285c4=Math[_0x339c15(0xf7)]((_0x5a0756-_0x3b5ea8)/0x2),_0xf7b99a=Math[_0x339c15(0xf7)]((_0x5a0756-_0x3ef32d)/0x2);_0x11068c['blt'](_0x3095b3,0x0,0x0,_0x3095b3[_0x339c15(0x265)],_0x3095b3[_0x339c15(0x281)],_0x2285c4,_0xf7b99a,_0x3b5ea8,_0x3ef32d);},Sprite_FieldMarkerATB[_0x31935f(0x1a2)][_0x31935f(0xc8)]=function(){const _0x5584ba=_0x31935f,_0x12db9=this['battler']();if(!_0x12db9)return;if(!_0x12db9[_0x5584ba(0x102)]())return;if(this['_graphicHue']===_0x12db9[_0x5584ba(0xac)]())return;this[_0x5584ba(0x2a6)]=_0x12db9[_0x5584ba(0xac)](),this['_graphicSprite'][_0x5584ba(0x2c1)](_0x12db9[_0x5584ba(0x29e)]()?0x0:this[_0x5584ba(0x2a6)]);},Sprite_FieldMarkerATB[_0x31935f(0x1a2)][_0x31935f(0x229)]=function(){const _0x3fa277=_0x31935f;if(!this[_0x3fa277(0x197)])return;const _0x18026c=this['battler']();if(!_0x18026c)return;if(this[_0x3fa277(0xbd)]===_0x18026c['_letter']&&this[_0x3fa277(0x1b0)]===_0x18026c[_0x3fa277(0x1b0)])return;this[_0x3fa277(0xbd)]=_0x18026c['_letter'],this[_0x3fa277(0x1b0)]=_0x18026c[_0x3fa277(0x1b0)];const _0xf500=Sprite_FieldGaugeATB[_0x3fa277(0x1c9)],_0x477ab4=_0xf500['MarkerSize'],_0x56ec45=Math['floor'](_0x477ab4/0x2),_0x282466=this[_0x3fa277(0x197)][_0x3fa277(0x1f6)];_0x282466['clear']();if(!this[_0x3fa277(0x1b0)])return;_0x282466[_0x3fa277(0x1b5)]=_0xf500[_0x3fa277(0x112)]||$gameSystem['mainFontFace'](),_0x282466[_0x3fa277(0x1a1)]=_0xf500[_0x3fa277(0x2cc)]||0x10,_0x282466[_0x3fa277(0x14f)](this[_0x3fa277(0xbd)],0x2,_0x56ec45,_0x477ab4-0x4,_0x56ec45-0x2,_0x3fa277(0x164));},Sprite_FieldMarkerATB[_0x31935f(0x1a2)]['updateSelectionEffect']=function(){const _0xdd90c9=_0x31935f,_0x2be732=this[_0xdd90c9(0x150)]();if(!_0x2be732)return;const _0x247a2d=_0x2be732[_0xdd90c9(0x150)]();if(!_0x247a2d)return;const _0x2662c2=_0x247a2d[_0xdd90c9(0x273)]();if(!_0x2662c2)return;this['setBlendColor'](_0x2662c2['_blendColor']);},Sprite_FieldMarkerATB['prototype']['getStateTooltipBattler']=function(){const _0x7bd4c0=_0x31935f;return this[_0x7bd4c0(0x150)]();};
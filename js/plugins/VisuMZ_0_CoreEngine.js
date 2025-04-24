//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.72;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.72] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
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
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x3b4dfd=_0x3b79;(function(_0x5d13ee,_0x18f988){const _0x245ad3=_0x3b79,_0x758cfa=_0x5d13ee();while(!![]){try{const _0x35826a=-parseInt(_0x245ad3(0xa26))/0x1*(-parseInt(_0x245ad3(0x72a))/0x2)+parseInt(_0x245ad3(0x24c))/0x3*(-parseInt(_0x245ad3(0x99c))/0x4)+parseInt(_0x245ad3(0x8f7))/0x5*(parseInt(_0x245ad3(0x3cf))/0x6)+parseInt(_0x245ad3(0x73c))/0x7+parseInt(_0x245ad3(0x7c2))/0x8*(-parseInt(_0x245ad3(0x897))/0x9)+parseInt(_0x245ad3(0x8bf))/0xa*(parseInt(_0x245ad3(0x374))/0xb)+-parseInt(_0x245ad3(0x817))/0xc*(parseInt(_0x245ad3(0x96a))/0xd);if(_0x35826a===_0x18f988)break;else _0x758cfa['push'](_0x758cfa['shift']());}catch(_0x352e33){_0x758cfa['push'](_0x758cfa['shift']());}}}(_0xf6fb,0xdbc3c));var label='CoreEngine',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0xfbf54b){const _0x40148d=_0x3b79;return _0xfbf54b['status']&&_0xfbf54b[_0x40148d(0x731)][_0x40148d(0x5e6)]('['+label+']');})[0x0];VisuMZ[label][_0x3b4dfd(0x5af)]=VisuMZ[label][_0x3b4dfd(0x5af)]||{},VisuMZ[_0x3b4dfd(0x8a6)]=function(_0x430b51,_0x2b2a9b){const _0x32dafb=_0x3b4dfd;for(const _0x177af8 in _0x2b2a9b){if(_0x177af8[_0x32dafb(0x7b5)](/(.*):(.*)/i)){const _0x532358=String(RegExp['$1']),_0x3c30cc=String(RegExp['$2'])[_0x32dafb(0x33f)]()[_0x32dafb(0x58b)]();let _0x32f16c,_0x3a9127,_0x5efe5d;switch(_0x3c30cc){case _0x32dafb(0x4af):_0x32f16c=_0x2b2a9b[_0x177af8]!==''?Number(_0x2b2a9b[_0x177af8]):0x0;break;case _0x32dafb(0x75e):_0x3a9127=_0x2b2a9b[_0x177af8]!==''?JSON[_0x32dafb(0x8d7)](_0x2b2a9b[_0x177af8]):[],_0x32f16c=_0x3a9127[_0x32dafb(0x7d4)](_0x16db36=>Number(_0x16db36));break;case _0x32dafb(0x41c):_0x32f16c=_0x2b2a9b[_0x177af8]!==''?eval(_0x2b2a9b[_0x177af8]):null;break;case _0x32dafb(0x769):_0x3a9127=_0x2b2a9b[_0x177af8]!==''?JSON[_0x32dafb(0x8d7)](_0x2b2a9b[_0x177af8]):[],_0x32f16c=_0x3a9127[_0x32dafb(0x7d4)](_0x137c44=>eval(_0x137c44));break;case'JSON':_0x32f16c=_0x2b2a9b[_0x177af8]!==''?JSON['parse'](_0x2b2a9b[_0x177af8]):'';break;case _0x32dafb(0x6b7):_0x3a9127=_0x2b2a9b[_0x177af8]!==''?JSON[_0x32dafb(0x8d7)](_0x2b2a9b[_0x177af8]):[],_0x32f16c=_0x3a9127['map'](_0x175352=>JSON[_0x32dafb(0x8d7)](_0x175352));break;case'FUNC':_0x32f16c=_0x2b2a9b[_0x177af8]!==''?new Function(JSON[_0x32dafb(0x8d7)](_0x2b2a9b[_0x177af8])):new Function(_0x32dafb(0x8e5));break;case _0x32dafb(0x3d5):_0x3a9127=_0x2b2a9b[_0x177af8]!==''?JSON['parse'](_0x2b2a9b[_0x177af8]):[],_0x32f16c=_0x3a9127[_0x32dafb(0x7d4)](_0x2e90ce=>new Function(JSON[_0x32dafb(0x8d7)](_0x2e90ce)));break;case'STR':_0x32f16c=_0x2b2a9b[_0x177af8]!==''?String(_0x2b2a9b[_0x177af8]):'';break;case _0x32dafb(0x86b):_0x3a9127=_0x2b2a9b[_0x177af8]!==''?JSON[_0x32dafb(0x8d7)](_0x2b2a9b[_0x177af8]):[],_0x32f16c=_0x3a9127['map'](_0xf660e=>String(_0xf660e));break;case _0x32dafb(0x4fb):_0x5efe5d=_0x2b2a9b[_0x177af8]!==''?JSON[_0x32dafb(0x8d7)](_0x2b2a9b[_0x177af8]):{},_0x430b51[_0x532358]={},VisuMZ[_0x32dafb(0x8a6)](_0x430b51[_0x532358],_0x5efe5d);continue;case _0x32dafb(0x96d):_0x3a9127=_0x2b2a9b[_0x177af8]!==''?JSON[_0x32dafb(0x8d7)](_0x2b2a9b[_0x177af8]):[],_0x32f16c=_0x3a9127[_0x32dafb(0x7d4)](_0x4f4f95=>VisuMZ[_0x32dafb(0x8a6)]({},JSON[_0x32dafb(0x8d7)](_0x4f4f95)));break;default:continue;}_0x430b51[_0x532358]=_0x32f16c;}}return _0x430b51;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x54b)]=SceneManager['exit'],SceneManager[_0x3b4dfd(0x259)]=function(){const _0x3114c3=_0x3b4dfd;VisuMZ[_0x3114c3(0x1bf)][_0x3114c3(0x54b)]['call'](this);if(Utils['RPGMAKER_VERSION']>=_0x3114c3(0x4d6)){if(_0x3114c3(0x8ee)!==_0x3114c3(0xa2f)){if(typeof nw===_0x3114c3(0x207))nw[_0x3114c3(0x2d1)][_0x3114c3(0x27e)]();}else{if(!this['_coreEasing'])return;if(this[_0x3114c3(0x939)][_0x3114c3(0x2da)]<=0x0)return;this['x']=this[_0x3114c3(0x211)](this['x'],this[_0x3114c3(0x939)]['targetX']),this['y']=this['applyCoreEasing'](this['y'],this[_0x3114c3(0x939)][_0x3114c3(0x548)]),this['scale']['x']=this[_0x3114c3(0x211)](this[_0x3114c3(0x979)]['x'],this[_0x3114c3(0x939)][_0x3114c3(0x2b6)]),this[_0x3114c3(0x979)]['y']=this['applyCoreEasing'](this[_0x3114c3(0x979)]['y'],this[_0x3114c3(0x939)]['targetScaleY']),this[_0x3114c3(0x413)]=this['applyCoreEasing'](this[_0x3114c3(0x413)],this[_0x3114c3(0x939)][_0x3114c3(0x750)]),this['backOpacity']=this[_0x3114c3(0x211)](this[_0x3114c3(0x903)],this[_0x3114c3(0x939)][_0x3114c3(0x4c3)]),this[_0x3114c3(0x7e4)]=this['applyCoreEasing'](this['contentsOpacity'],this[_0x3114c3(0x939)][_0x3114c3(0x55b)]),this[_0x3114c3(0x939)][_0x3114c3(0x2da)]--;}}},(_0x47e1c7=>{const _0x1e35ca=_0x3b4dfd,_0x5edbab=_0x47e1c7[_0x1e35ca(0x926)];for(const _0x3180e5 of dependencies){if(!Imported[_0x3180e5]){alert(_0x1e35ca(0x470)['format'](_0x5edbab,_0x3180e5)),SceneManager['exit']();break;}}const _0x5751a7=_0x47e1c7[_0x1e35ca(0x731)];if(_0x5751a7[_0x1e35ca(0x7b5)](/\[Version[ ](.*?)\]/i)){if(_0x1e35ca(0x19c)===_0x1e35ca(0x970))this[_0x1e35ca(0x87e)]();else{const _0x130bd2=Number(RegExp['$1']);if(_0x130bd2!==VisuMZ[label][_0x1e35ca(0x64c)]){if(_0x1e35ca(0x425)!==_0x1e35ca(0x425)){if(this[_0x1e35ca(0x89f)]())return 0x1;const _0x182a9a=this[_0x1e35ca(0x298)]()-this['currentLevelExp'](),_0x5f24b2=this[_0x1e35ca(0x56c)]()-this[_0x1e35ca(0x19a)]();return(_0x5f24b2/_0x182a9a)[_0x1e35ca(0x1e1)](0x0,0x1);}else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x1e35ca(0x4f9)](_0x5edbab,_0x130bd2)),SceneManager[_0x1e35ca(0x259)]();}}}if(_0x5751a7[_0x1e35ca(0x7b5)](/\[Tier[ ](\d+)\]/i)){const _0x26be9b=Number(RegExp['$1']);_0x26be9b<tier?(alert(_0x1e35ca(0x429)['format'](_0x5edbab,_0x26be9b,tier)),SceneManager[_0x1e35ca(0x259)]()):_0x1e35ca(0x91e)!==_0x1e35ca(0x91e)?_0x244aa6[_0x1e35ca(0x228)]&&(this[_0x1e35ca(0x30a)]=_0x1e35ca(0x42a)):tier=Math[_0x1e35ca(0x67b)](_0x26be9b,tier);}VisuMZ[_0x1e35ca(0x8a6)](VisuMZ[label]['Settings'],_0x47e1c7[_0x1e35ca(0x74b)]);})(pluginData),((()=>{const _0x3f6997=_0x3b4dfd;if(VisuMZ[_0x3f6997(0x1bf)]['Settings'][_0x3f6997(0x38a)][_0x3f6997(0x3b1)]??!![])for(const _0xa933c in $plugins){const _0x501099=$plugins[_0xa933c];_0x501099[_0x3f6997(0x926)]['match'](/(.*)\/(.*)/i)&&(_0x501099['name']=String(RegExp['$2']['trim']()));}})()),PluginManager[_0x3b4dfd(0x455)](pluginData['name'],_0x3b4dfd(0x936),_0x5d8d2d=>{const _0xf97418=_0x3b4dfd;if(!SceneManager[_0xf97418(0x46a)])return;if(!SceneManager[_0xf97418(0x46a)][_0xf97418(0x8c9)])return;VisuMZ[_0xf97418(0x8a6)](_0x5d8d2d,_0x5d8d2d);const _0x3b3335=Math[_0xf97418(0x355)](_0x5d8d2d['pointX']),_0x50ed88=Math[_0xf97418(0x355)](_0x5d8d2d['pointY']);$gameTemp[_0xf97418(0x9e1)](_0x3b3335,_0x50ed88,_0x5d8d2d[_0xf97418(0x77d)],_0x5d8d2d[_0xf97418(0x184)],_0x5d8d2d[_0xf97418(0x288)]);}),PluginManager[_0x3b4dfd(0x455)](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0xa29),_0xa96111=>{const _0x4d9381=_0x3b4dfd;VisuMZ[_0x4d9381(0x8a6)](_0xa96111,_0xa96111);const _0x300416=Math['round'](_0xa96111[_0x4d9381(0x743)])[_0x4d9381(0x1e1)](0x0,0x64),_0x16d663=AudioManager[_0x4d9381(0x37d)];_0x16d663&&(_0x16d663[_0x4d9381(0x743)]=_0x300416,AudioManager[_0x4d9381(0x22a)](_0x16d663));}),PluginManager['registerCommand'](pluginData['name'],_0x3b4dfd(0xa28),_0x403409=>{const _0x11e903=_0x3b4dfd;VisuMZ[_0x11e903(0x8a6)](_0x403409,_0x403409);const _0x443230=Math[_0x11e903(0x355)](_0x403409['pitch'])[_0x11e903(0x1e1)](0x32,0x96),_0x14b4a4=AudioManager['_currentBgm'];_0x14b4a4&&(_0x14b4a4[_0x11e903(0x3d4)]=_0x443230,AudioManager[_0x11e903(0x22a)](_0x14b4a4));}),PluginManager['registerCommand'](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0x258),_0x425a3d=>{const _0xbd5b5b=_0x3b4dfd;VisuMZ[_0xbd5b5b(0x8a6)](_0x425a3d,_0x425a3d);const _0xc648f9=Math['round'](_0x425a3d[_0xbd5b5b(0x93c)])[_0xbd5b5b(0x1e1)](-0x64,0x64),_0x414c6e=AudioManager[_0xbd5b5b(0x37d)];_0x414c6e&&(_0x414c6e[_0xbd5b5b(0x93c)]=_0xc648f9,AudioManager[_0xbd5b5b(0x22a)](_0x414c6e));}),PluginManager[_0x3b4dfd(0x455)](pluginData['name'],_0x3b4dfd(0x7ae),_0x31d42d=>{const _0x2f4075=_0x3b4dfd;VisuMZ[_0x2f4075(0x8a6)](_0x31d42d,_0x31d42d);const _0x4ac8e0=Math[_0x2f4075(0x355)](_0x31d42d[_0x2f4075(0x743)])['clamp'](0x0,0x64),_0x528e64=AudioManager[_0x2f4075(0x67a)];_0x528e64&&(_0x528e64[_0x2f4075(0x743)]=_0x4ac8e0,AudioManager[_0x2f4075(0x5b3)](_0x528e64));}),PluginManager[_0x3b4dfd(0x455)](pluginData[_0x3b4dfd(0x926)],'AudioChangeBgsPitch',_0x3c7d4e=>{const _0x16855e=_0x3b4dfd;VisuMZ[_0x16855e(0x8a6)](_0x3c7d4e,_0x3c7d4e);const _0x921f1d=Math[_0x16855e(0x355)](_0x3c7d4e[_0x16855e(0x3d4)])[_0x16855e(0x1e1)](0x32,0x96),_0x55cb66=AudioManager[_0x16855e(0x67a)];if(_0x55cb66){if(_0x16855e(0x866)===_0x16855e(0x866))_0x55cb66['pitch']=_0x921f1d,AudioManager[_0x16855e(0x5b3)](_0x55cb66);else{if(this[_0x16855e(0x5ff)]()[_0x16855e(0x791)]&&_0x445533[_0x16855e(0x1db)]()===0x1){this[_0x16855e(0x225)]=this[_0x16855e(0x5ff)]()[_0x16855e(0x684)];return;}_0x1f49b5['CoreEngine'][_0x16855e(0x976)][_0x16855e(0x68e)](this,_0x3351f5);}}}),PluginManager['registerCommand'](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0x302),_0xe6fae0=>{const _0x27170f=_0x3b4dfd;VisuMZ[_0x27170f(0x8a6)](_0xe6fae0,_0xe6fae0);const _0x10d239=Math[_0x27170f(0x355)](_0xe6fae0['pan'])[_0x27170f(0x1e1)](-0x64,0x64),_0x3d984a=AudioManager[_0x27170f(0x67a)];_0x3d984a&&(_0x3d984a[_0x27170f(0x93c)]=_0x10d239,AudioManager[_0x27170f(0x5b3)](_0x3d984a));}),PluginManager[_0x3b4dfd(0x455)](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0x542),_0x3e0c18=>{const _0x370720=_0x3b4dfd;if(!$gameTemp[_0x370720(0x821)]())return;const _0x420abb=Input[_0x370720(0x444)]();navigator[_0x370720(0x692)]&&navigator[_0x370720(0x692)][_0x370720(0x3b7)](_0x420abb);}),PluginManager[_0x3b4dfd(0x455)](pluginData['name'],_0x3b4dfd(0x47c),_0x540eee=>{const _0x8a61aa=_0x3b4dfd;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;SceneManager[_0x8a61aa(0x46a)][_0x8a61aa(0x562)]=![],VisuMZ[_0x8a61aa(0x1bf)]['ExportStrFromAllMaps']();}),PluginManager['registerCommand'](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0x547),_0x40041a=>{const _0x41c138=_0x3b4dfd;if(!$gameTemp[_0x41c138(0x821)]())return;if(!Utils['isNwjs']())return;SceneManager['_scene'][_0x41c138(0x562)]=![],VisuMZ[_0x41c138(0x1bf)][_0x41c138(0x9b6)]();}),PluginManager[_0x3b4dfd(0x455)](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0x716),_0xb6f9b4=>{const _0x4f374f=_0x3b4dfd;if(!$gameTemp[_0x4f374f(0x821)]())return;if(!Utils[_0x4f374f(0x581)]())return;if(!$gameMap)return;if($gameMap['mapId']()<=0x0)return;VisuMZ[_0x4f374f(0x8a6)](_0xb6f9b4,_0xb6f9b4);const _0x380376=_0x4f374f(0x91b)[_0x4f374f(0x4f9)]($gameMap[_0x4f374f(0x87f)]()['padZero'](0x3)),_0x4e5bdb=VisuMZ[_0x4f374f(0x1bf)][_0x4f374f(0x91f)]($gameMap['mapId']());VisuMZ[_0x4f374f(0x1bf)]['ExportString'](_0x4e5bdb,_0x380376,!![]);}),PluginManager[_0x3b4dfd(0x455)](pluginData[_0x3b4dfd(0x926)],'ExportCurTroopText',_0x426bec=>{const _0x22f8b3=_0x3b4dfd;if(!$gameTemp[_0x22f8b3(0x821)]())return;if(!Utils[_0x22f8b3(0x581)]())return;if(!$gameParty[_0x22f8b3(0x3ef)]())return;VisuMZ[_0x22f8b3(0x8a6)](_0x426bec,_0x426bec);const _0x14f00e=_0x22f8b3(0x951)[_0x22f8b3(0x4f9)]($gameTroop[_0x22f8b3(0x6da)]['padZero'](0x4)),_0x5f1e7d=VisuMZ['CoreEngine'][_0x22f8b3(0x7ce)]($gameTroop[_0x22f8b3(0x6da)]);VisuMZ[_0x22f8b3(0x1bf)][_0x22f8b3(0x5e8)](_0x5f1e7d,_0x14f00e,!![]);}),VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5e8)]=function(_0x27eaf2,_0x32e006,_0x3ea585){const _0x7a86de=_0x3b4dfd,_0x1b5d6d=require('fs');let _0x45ed37='Exported_Script_%1.txt'[_0x7a86de(0x4f9)](_0x32e006||'0');_0x1b5d6d[_0x7a86de(0x58c)](_0x45ed37,_0x27eaf2,_0x26d6a1=>{const _0x402873=_0x7a86de;if(_0x26d6a1)throw err;else{if(_0x3ea585){if('YbGOW'===_0x402873(0x4be)){const _0x2be3c0=this['itemLineRect'](_0x3bc5df),_0x3f5088=_0x206fed[_0x402873(0x1bf)][_0x402873(0x5af)][_0x402873(0x339)][_0x402873(0x7a2)][_0x165241],_0x3692b1=_0x25c896[_0x402873(0x4db)](_0x3f5088),_0x4e22aa=this[_0x402873(0x202)]['paramValueByName'](_0x3f5088,!![]);this[_0x402873(0x9a5)](_0x2be3c0['x'],_0x2be3c0['y'],0xa0,_0x3f5088,![]),this[_0x402873(0x618)](),this[_0x402873(0x686)](_0x4e22aa,_0x2be3c0['x']+0xa0,_0x2be3c0['y'],0x3c,_0x402873(0x5b2));}else alert('Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.'[_0x402873(0x4f9)](_0x45ed37));}}});},VisuMZ['CoreEngine'][_0x3b4dfd(0x92b)]=function(){const _0x597cc8=_0x3b4dfd,_0x5cd5b3=[];for(const _0x3cbee6 of $dataMapInfos){if(!_0x3cbee6)continue;_0x5cd5b3[_0x597cc8(0x297)](_0x3cbee6['id']);}const _0x8db269=_0x5cd5b3['length']*0x64+Math[_0x597cc8(0x3d3)](0x64);alert('Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x597cc8(0x4f9)](_0x8db269)),this['_storedMapText']=[],this[_0x597cc8(0x4c8)]=$dataMap;for(const _0xeb408e of _0x5cd5b3){VisuMZ[_0x597cc8(0x1bf)][_0x597cc8(0x9ec)](_0xeb408e);}setTimeout(VisuMZ[_0x597cc8(0x1bf)][_0x597cc8(0x2b9)][_0x597cc8(0x2bd)](this),_0x8db269);},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x9ec)]=function(_0x4653ad){const _0x486d88=_0x3b4dfd,_0x3a63cd=_0x486d88(0x4a6)['format'](_0x4653ad['padZero'](0x3)),_0x365d=new XMLHttpRequest(),_0x157228=_0x486d88(0x7b4)+_0x3a63cd;_0x365d[_0x486d88(0x545)](_0x486d88(0x1a5),_0x157228),_0x365d[_0x486d88(0x598)](_0x486d88(0x3c2)),_0x365d[_0x486d88(0x4b5)]=()=>this['storeMapData'](_0x365d,_0x4653ad,_0x3a63cd,_0x157228),_0x365d[_0x486d88(0x18d)]=()=>DataManager[_0x486d88(0x6d3)](_0x486d88(0x991),_0x3a63cd,_0x157228),_0x365d[_0x486d88(0x524)]();},VisuMZ[_0x3b4dfd(0x1bf)]['storeMapData']=function(_0x5ee4e5,_0x189625,_0x597c60,_0x3a2a62){const _0x252891=_0x3b4dfd;$dataMap=JSON[_0x252891(0x8d7)](_0x5ee4e5[_0x252891(0x52a)]),DataManager['onLoad']($dataMap),this['_storedMapText'][_0x189625]=VisuMZ['CoreEngine'][_0x252891(0x91f)](_0x189625),$dataMap=this[_0x252891(0x4c8)];},VisuMZ[_0x3b4dfd(0x1bf)]['exportAllMapStrings']=function(){const _0x4b736e=_0x3b4dfd,_0x5c8243=_0x4b736e(0x9e2);this[_0x4b736e(0x857)][_0x4b736e(0x8b7)](undefined)[_0x4b736e(0x8b7)]('')[_0x4b736e(0x8b7)](null);const _0x1e8678=this[_0x4b736e(0x857)][_0x4b736e(0x25b)](_0x4b736e(0x446))['trim']();VisuMZ['CoreEngine'][_0x4b736e(0x5e8)](_0x1e8678,_0x5c8243,!![]),SceneManager[_0x4b736e(0x46a)][_0x4b736e(0x562)]=!![];},VisuMZ['CoreEngine']['ExtractStrFromMap']=function(_0x37498d){const _0x5a3465=_0x3b4dfd;if(!$dataMap)return'';let _0x3633c1='█'[_0x5a3465(0x73b)](0x46)+'\x0a\x0a',_0x4597c4='═'[_0x5a3465(0x73b)](0x46)+'\x0a\x0a',_0x497d56='';this[_0x5a3465(0x3fd)]=0x0;for(const _0x4e7ad3 of $dataMap['events']){if(_0x5a3465(0x33a)!=='GoUGM'){if(!_0x4e7ad3)continue;let _0x12478e=_0x4e7ad3['id'],_0x30ce43=_0x4e7ad3[_0x5a3465(0x926)],_0x45c511=_0x4e7ad3[_0x5a3465(0x5ec)];for(const _0x59a033 of _0x45c511){const _0x37570f=_0x45c511[_0x5a3465(0x6cf)](_0x59a033)+0x1;let _0x545e1a=_0x4597c4+'《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a',_0x43fa3a=VisuMZ['CoreEngine'][_0x5a3465(0x957)](_0x59a033[_0x5a3465(0x24e)]);if(_0x43fa3a[_0x5a3465(0xa16)]>0x0){if(_0x497d56['length']>0x0)_0x497d56+=_0x4597c4+_0x5a3465(0x446);else{if(_0x5a3465(0x379)===_0x5a3465(0x379)){const _0x3e151b=$dataMapInfos[_0x37498d][_0x5a3465(0x926)];_0x497d56+=_0x3633c1+'〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'['format'](_0x37498d,_0x3e151b||_0x5a3465(0x531))+_0x3633c1;}else return this[_0x5a3465(0x47a)][_0x5a3465(0x5a7)]();}_0x497d56+=_0x545e1a['format'](_0x12478e,_0x30ce43,_0x37570f,_0x43fa3a);}}}else return this[_0x5a3465(0x3cc)];}return _0x497d56[_0x5a3465(0xa16)]>0x0&&(_0x497d56+=_0x4597c4),_0x497d56;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x9b6)]=function(){const _0x494088=_0x3b4dfd,_0x4ea0b5=$dataTroops[_0x494088(0xa16)]*0xa+Math[_0x494088(0x3d3)](0xa);alert(_0x494088(0x276)[_0x494088(0x4f9)](_0x4ea0b5));const _0x2896aa=[];for(const _0x1aeb94 of $dataTroops){if(!_0x1aeb94)continue;const _0x5bcb57=_0x1aeb94['id'];_0x2896aa[_0x5bcb57]=VisuMZ[_0x494088(0x1bf)][_0x494088(0x7ce)](_0x5bcb57);}setTimeout(VisuMZ['CoreEngine']['exportAllTroopStrings']['bind'](this,_0x2896aa),_0x4ea0b5);},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x7ce)]=function(_0x217b67){const _0x51531a=_0x3b4dfd;if(!$dataTroops[_0x217b67])return'';let _0xbb6eb1='█'[_0x51531a(0x73b)](0x46)+'\x0a\x0a',_0x17c4b5='═'[_0x51531a(0x73b)](0x46)+'\x0a\x0a',_0x308107='';this[_0x51531a(0x3fd)]=0x0;const _0x73f6d1=$dataTroops[_0x217b67];let _0x2652de=_0x73f6d1[_0x51531a(0x5ec)];for(const _0x1a488b of _0x2652de){const _0x248cda=_0x2652de[_0x51531a(0x6cf)](_0x1a488b)+0x1;let _0x233470=_0x17c4b5+_0x51531a(0x358),_0x752f6f=VisuMZ['CoreEngine'][_0x51531a(0x957)](_0x1a488b[_0x51531a(0x24e)]);if(_0x752f6f['length']>0x0){if(_0x51531a(0x9b7)!==_0x51531a(0x9b7))return _0x575a33[_0x51531a(0x1bf)][_0x51531a(0x3ab)][_0x51531a(0x68e)](this)[_0x51531a(0x1e1)](0x0,0x1);else _0x308107['length']>0x0?_0x51531a(0x9e5)!==_0x51531a(0x804)?_0x308107+=_0x17c4b5+_0x51531a(0x446):this['_effectsContainer'][_0x51531a(0x2f6)](_0x1bfc3f):_0x308107+=_0xbb6eb1+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'['format'](_0x217b67,_0x73f6d1[_0x51531a(0x926)]||_0x51531a(0x531))+_0xbb6eb1,_0x308107+=_0x233470[_0x51531a(0x4f9)](_0x248cda,_0x752f6f);}}return _0x308107[_0x51531a(0xa16)]>0x0&&(_0x308107+=_0x17c4b5),_0x308107;},VisuMZ['CoreEngine'][_0x3b4dfd(0xa15)]=function(_0xe62ffb){const _0x53f7a6=_0x3b4dfd,_0x5a2700=_0x53f7a6(0x658);_0xe62ffb[_0x53f7a6(0x8b7)](undefined)[_0x53f7a6(0x8b7)]('')['remove'](null);const _0x454d85=_0xe62ffb['join'](_0x53f7a6(0x446))['trim']();VisuMZ['CoreEngine'][_0x53f7a6(0x5e8)](_0x454d85,_0x5a2700,!![]),SceneManager[_0x53f7a6(0x46a)]['_active']=!![];},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x957)]=function(_0x5551c0){const _0x22e0e3=_0x3b4dfd;let _0x4c82f6='\x0a'+'─'[_0x22e0e3(0x73b)](0x46)+'\x0a',_0xdef608='\x0a'+'┄'[_0x22e0e3(0x73b)](0x46)+'\x0a',_0x5137e9='';for(const _0x44cceb of _0x5551c0){if(!_0x44cceb)continue;if(_0x44cceb[_0x22e0e3(0x4e3)]===0x65)_0x5137e9+=_0x4c82f6+'\x0a',_0x5137e9+=_0x22e0e3(0x2e8),_0x44cceb['parameters'][0x4]!==''&&_0x44cceb[_0x22e0e3(0x74b)][0x4]!==undefined&&(_0x5137e9+=_0x22e0e3(0x38e)[_0x22e0e3(0x4f9)](_0x44cceb['parameters'][0x4]));else{if(_0x44cceb[_0x22e0e3(0x4e3)]===0x191)_0x22e0e3(0x859)!==_0x22e0e3(0x9ac)?_0x5137e9+=_0x22e0e3(0x312)[_0x22e0e3(0x4f9)](_0x44cceb[_0x22e0e3(0x74b)][0x0]):this[_0x22e0e3(0x24b)](...arguments);else{if(_0x44cceb['code']===0x192)_0x5137e9+=_0x4c82f6,_0x5137e9+='%1〘Choice\x20%2〙\x20%3%1'[_0x22e0e3(0x4f9)](_0xdef608,_0x44cceb[_0x22e0e3(0x74b)][0x0]+0x1,_0x44cceb['parameters'][0x1]);else{if(_0x44cceb[_0x22e0e3(0x4e3)]===0x193)_0x5137e9+=_0x4c82f6,_0x5137e9+=_0x22e0e3(0x4b3)[_0x22e0e3(0x4f9)](_0xdef608);else{if(_0x44cceb['code']===0x194)_0x5137e9+=_0x4c82f6,_0x5137e9+=_0x22e0e3(0x44c)['format'](_0xdef608);else{if(_0x44cceb[_0x22e0e3(0x4e3)]===0x69)_0x5137e9+=_0x4c82f6+'\x0a',_0x5137e9+='〘Scrolling\x20Text〙\x0a';else{if(_0x44cceb['code']===0x6c)_0x5137e9+=_0x4c82f6+'\x0a',_0x5137e9+=_0x22e0e3(0x40f)[_0x22e0e3(0x4f9)](_0x44cceb['parameters'][0x0]);else{if(_0x44cceb[_0x22e0e3(0x4e3)]===0x198)_0x22e0e3(0x3f1)===_0x22e0e3(0x73e)?(_0x287264+=_0xb7e051+'\x0a',_0x1a88ad+=_0x22e0e3(0x2e8),_0x89cd97[_0x22e0e3(0x74b)][0x4]!==''&&_0x575871[_0x22e0e3(0x74b)][0x4]!==_0x38142d&&(_0x147e9a+=_0x22e0e3(0x38e)[_0x22e0e3(0x4f9)](_0x340921[_0x22e0e3(0x74b)][0x4]))):_0x5137e9+=_0x22e0e3(0x312)['format'](_0x44cceb['parameters'][0x0]);else{if(_0x44cceb[_0x22e0e3(0x4e3)]===0x75){const _0x466125=$dataCommonEvents[_0x44cceb[_0x22e0e3(0x74b)][0x0]];if(_0x466125&&this['_commonEventLayers']<=0xa){this[_0x22e0e3(0x3fd)]++;let _0x26d80d=VisuMZ[_0x22e0e3(0x1bf)][_0x22e0e3(0x957)](_0x466125[_0x22e0e3(0x24e)]);_0x26d80d['length']>0x0&&(_0x5137e9+=_0x4c82f6,_0x5137e9+=_0xdef608,_0x5137e9+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'['format'](_0x466125['id'],_0x466125['name']),_0x5137e9+=_0xdef608,_0x5137e9+=_0x26d80d,_0x5137e9+=_0xdef608,_0x5137e9+=_0x22e0e3(0x751)[_0x22e0e3(0x4f9)](_0x466125['id'],_0x466125[_0x22e0e3(0x926)]),_0x5137e9+=_0xdef608),this['_commonEventLayers']--;}}}}}}}}}}}return _0x5137e9[_0x22e0e3(0xa16)]>0x0&&(_0x5137e9+=_0x4c82f6),_0x5137e9;},PluginManager[_0x3b4dfd(0x455)](pluginData['name'],_0x3b4dfd(0x69d),_0xb6e95d=>{const _0x2d17db=_0x3b4dfd;VisuMZ[_0x2d17db(0x8a6)](_0xb6e95d,_0xb6e95d);const _0x1c86f9=_0xb6e95d[_0x2d17db(0x1d8)];VisuMZ['openURL'](_0x1c86f9);}),PluginManager[_0x3b4dfd(0x455)](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0x6c6),_0x1749e0=>{const _0x3af781=_0x3b4dfd;VisuMZ[_0x3af781(0x8a6)](_0x1749e0,_0x1749e0);const _0x2114ec=_0x1749e0['value']||0x0;$gameParty[_0x3af781(0x35a)](_0x2114ec);}),PluginManager[_0x3b4dfd(0x455)](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0x1bb),_0xdc0179=>{const _0x53d30d=_0x3b4dfd;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x53d30d(0x8a6)](_0xdc0179,_0xdc0179);const _0x245c71=_0xdc0179[_0x53d30d(0x1d2)];SceneManager['_scene']['playOnceParallelInterpreter'](_0x245c71);}),PluginManager['registerCommand'](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0x5fd),_0x9d6ac0=>{const _0x15100e=_0x3b4dfd;if(!$gameTemp[_0x15100e(0x821)]())return;if(!Utils[_0x15100e(0x581)]())return;VisuMZ['ConvertParams'](_0x9d6ac0,_0x9d6ac0);const _0x49d8b8=_0x9d6ac0['PictureID']||0x1;$gameTemp[_0x15100e(0x736)]=_0x49d8b8;}),PluginManager[_0x3b4dfd(0x455)](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0x6cd),_0x477353=>{const _0x4b8c48=_0x3b4dfd;VisuMZ['ConvertParams'](_0x477353,_0x477353);const _0x5443cb=_0x477353[_0x4b8c48(0x4a4)]||0x1,_0x5514da=_0x477353[_0x4b8c48(0xa2d)]||'Linear',_0x3fa36b=$gameScreen[_0x4b8c48(0x2b5)](_0x5443cb);_0x3fa36b&&_0x3fa36b['setEasingType'](_0x5514da);}),PluginManager['registerCommand'](pluginData['name'],_0x3b4dfd(0x28f),_0x41e772=>{const _0x2cf19f=_0x3b4dfd;for(let _0x25d2f7=0x1;_0x25d2f7<=0x64;_0x25d2f7++){$gameScreen[_0x2cf19f(0x878)](_0x25d2f7);}}),PluginManager[_0x3b4dfd(0x455)](pluginData[_0x3b4dfd(0x926)],'PictureEraseRange',_0x53d4c0=>{const _0x19a009=_0x3b4dfd;VisuMZ[_0x19a009(0x8a6)](_0x53d4c0,_0x53d4c0);const _0x25c2f7=Math[_0x19a009(0x467)](_0x53d4c0['StartID'],_0x53d4c0[_0x19a009(0x652)]),_0x2df109=Math['max'](_0x53d4c0[_0x19a009(0x576)],_0x53d4c0[_0x19a009(0x652)]);for(let _0x4834d9=_0x25c2f7;_0x4834d9<=_0x2df109;_0x4834d9++){$gameScreen[_0x19a009(0x878)](_0x4834d9);}}),PluginManager[_0x3b4dfd(0x455)](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0x2fc),_0x242a91=>{const _0x5f4d4e=_0x3b4dfd;VisuMZ[_0x5f4d4e(0x8a6)](_0x242a91,_0x242a91);const _0x332d1a=Math['round'](_0x242a91['PictureID'])['clamp'](0x1,0x64),_0x4e810d=_0x242a91[_0x5f4d4e(0x5af)],_0x8be2df=_0x4e810d[_0x5f4d4e(0x515)][_0x5f4d4e(0x1e1)](0x0,0x1),_0x58df0d=Math[_0x5f4d4e(0x355)](_0x4e810d[_0x5f4d4e(0x64b)]||0x0),_0x417265=Math['round'](_0x4e810d[_0x5f4d4e(0x51f)]||0x0),_0x464206=Math['round'](_0x4e810d[_0x5f4d4e(0x3b3)]||0x0),_0x40386f=Math[_0x5f4d4e(0x355)](_0x4e810d[_0x5f4d4e(0x4a0)]||0x0),_0xfcf09b=Math[_0x5f4d4e(0x355)](_0x4e810d[_0x5f4d4e(0x4ba)])['clamp'](0x0,0xff),_0x91f344=_0x4e810d['BlendMode'],_0x41f8ce=_0x5f4d4e(0x333),_0xece51c=_0x242a91[_0x5f4d4e(0x42e)]?_0x5f4d4e(0x42e):'Pixelated',_0x258479=_0x41f8ce['format'](_0x242a91['IconIndex'],_0xece51c);$gameScreen['showPicture'](_0x332d1a,_0x258479,_0x8be2df,_0x58df0d,_0x417265,_0x464206,_0x40386f,_0xfcf09b,_0x91f344);}),PluginManager[_0x3b4dfd(0x455)](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0x74f),_0x1142b2=>{const _0x5858fc=_0x3b4dfd;VisuMZ[_0x5858fc(0x8a6)](_0x1142b2,_0x1142b2);const _0x4d64c3=_0x1142b2[_0x5858fc(0x78f)]||'random',_0x96245d=_0x1142b2['Power'][_0x5858fc(0x1e1)](0x1,0x9),_0x488ccb=_0x1142b2[_0x5858fc(0x434)][_0x5858fc(0x1e1)](0x1,0x9),_0x405e92=_0x1142b2[_0x5858fc(0x6db)]||0x1,_0x53e600=_0x1142b2['Wait'];$gameScreen['setCoreEngineScreenShakeStyle'](_0x4d64c3),$gameScreen[_0x5858fc(0x780)](_0x96245d,_0x488ccb,_0x405e92);if(_0x53e600){if('Jdygx'!=='DJSCm'){const _0x5493db=$gameTemp[_0x5858fc(0x5e2)]();if(_0x5493db)_0x5493db[_0x5858fc(0x66e)](_0x405e92);}else this[_0x5858fc(0x4c5)]=this[_0x5858fc(0x4c5)]||[],this[_0x5858fc(0x4c5)][_0x5858fc(0x8b7)](_0x128733);}}),PluginManager[_0x3b4dfd(0x455)](pluginData['name'],'SwitchRandomizeOne',_0x1c9d9b=>{const _0x5a7df1=_0x3b4dfd;if($gameParty[_0x5a7df1(0x3ef)]())return;VisuMZ[_0x5a7df1(0x8a6)](_0x1c9d9b,_0x1c9d9b);const _0x550b07=_0x1c9d9b[_0x5a7df1(0x9e6)],_0x5782ee=(_0x1c9d9b[_0x5a7df1(0x90d)]||0x0)/0x64;for(const _0x349640 of _0x550b07){if(_0x5a7df1(0x9e4)!==_0x5a7df1(0x182)){const _0x2c2b85=Math[_0x5a7df1(0x55f)]()<=_0x5782ee;$gameSwitches['setValue'](_0x349640,_0x2c2b85);}else _0x5cc6ab['erasePicture'](_0x31a41f);}}),PluginManager[_0x3b4dfd(0x455)](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0x886),_0x5e5580=>{const _0x5af0bc=_0x3b4dfd;if($gameParty[_0x5af0bc(0x3ef)]())return;VisuMZ['ConvertParams'](_0x5e5580,_0x5e5580);const _0x456543=Math[_0x5af0bc(0x467)](_0x5e5580[_0x5af0bc(0x576)],_0x5e5580['EndingID']),_0x116193=Math[_0x5af0bc(0x67b)](_0x5e5580[_0x5af0bc(0x576)],_0x5e5580[_0x5af0bc(0x652)]),_0x57223d=(_0x5e5580[_0x5af0bc(0x90d)]||0x0)/0x64;for(let _0x271aa1=_0x456543;_0x271aa1<=_0x116193;_0x271aa1++){if(_0x5af0bc(0x815)!==_0x5af0bc(0x97f)){const _0x297bf1=Math[_0x5af0bc(0x55f)]()<=_0x57223d;$gameSwitches['setValue'](_0x271aa1,_0x297bf1);}else return-0.5*(_0x5a4b9c[_0x5af0bc(0x78d)](0x1-_0x226af2*_0x2b0015)-0x1);}}),PluginManager[_0x3b4dfd(0x455)](pluginData[_0x3b4dfd(0x926)],'SwitchToggleOne',_0x5c6dc3=>{const _0x3136b0=_0x3b4dfd;if($gameParty[_0x3136b0(0x3ef)]())return;VisuMZ[_0x3136b0(0x8a6)](_0x5c6dc3,_0x5c6dc3);const _0x1cfc61=_0x5c6dc3[_0x3136b0(0x9e6)];for(const _0x2ccb37 of _0x1cfc61){const _0x456232=$gameSwitches[_0x3136b0(0x9db)](_0x2ccb37);$gameSwitches[_0x3136b0(0x274)](_0x2ccb37,!_0x456232);}}),PluginManager[_0x3b4dfd(0x455)](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0x550),_0x19d14=>{const _0x53ca58=_0x3b4dfd;if($gameParty['inBattle']())return;VisuMZ[_0x53ca58(0x8a6)](_0x19d14,_0x19d14);const _0x33cb30=Math['min'](_0x19d14[_0x53ca58(0x576)],_0x19d14['EndingID']),_0x2db327=Math[_0x53ca58(0x67b)](_0x19d14[_0x53ca58(0x576)],_0x19d14[_0x53ca58(0x652)]);for(let _0xf665d=_0x33cb30;_0xf665d<=_0x2db327;_0xf665d++){if(_0x53ca58(0x30e)!==_0x53ca58(0xa23)){const _0x40eddb=$gameSwitches[_0x53ca58(0x9db)](_0xf665d);$gameSwitches[_0x53ca58(0x274)](_0xf665d,!_0x40eddb);}else this['startMove'](0x4b0,0x0,0x78);}}),PluginManager[_0x3b4dfd(0x455)](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0x2e0),_0x4827ce=>{const _0x865708=_0x3b4dfd;VisuMZ[_0x865708(0x8a6)](_0x4827ce,_0x4827ce);const _0x18f749=_0x4827ce[_0x865708(0x66b)]||0x1;$gameSystem[_0x865708(0x1a4)](_0x18f749);}),PluginManager['registerCommand'](pluginData['name'],_0x3b4dfd(0x7c9),_0x411d9f=>{const _0x10ea2e=_0x3b4dfd;if($gameParty[_0x10ea2e(0x3ef)]())return;VisuMZ['ConvertParams'](_0x411d9f,_0x411d9f);const _0x55c12f=_0x411d9f[_0x10ea2e(0x66b)];if(_0x55c12f[_0x10ea2e(0x7b5)](/Front/i))$gameSystem[_0x10ea2e(0x6c0)](![]);else _0x55c12f[_0x10ea2e(0x7b5)](/Side/i)?$gameSystem[_0x10ea2e(0x6c0)](!![]):$gameSystem[_0x10ea2e(0x6c0)](!$gameSystem[_0x10ea2e(0x675)]());}),PluginManager['registerCommand'](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0x607),_0x552fe1=>{const _0x58b22c=_0x3b4dfd;if($gameParty['inBattle']())return;VisuMZ[_0x58b22c(0x8a6)](_0x552fe1,_0x552fe1);const _0x58dd3f=['bgm',_0x58b22c(0x18e),'me','se'];for(const _0x1efa2f of _0x58dd3f){const _0x51436e=_0x552fe1[_0x1efa2f],_0x4cc216=_0x58b22c(0x3df)[_0x58b22c(0x4f9)](_0x1efa2f);for(const _0x5f3e63 of _0x51436e){if(_0x58b22c(0x752)===_0x58b22c(0x752))AudioManager[_0x58b22c(0x4d7)](_0x4cc216,_0x5f3e63);else return _0x1671f2[_0x58b22c(0x35e)](this),_0xfc7632['CoreEngine'][_0x58b22c(0x76d)][_0x58b22c(0x68e)](this,_0x25cf51);}}}),PluginManager[_0x3b4dfd(0x455)](pluginData['name'],_0x3b4dfd(0x672),_0x1adbc4=>{const _0x1c3ac3=_0x3b4dfd;if($gameParty[_0x1c3ac3(0x3ef)]())return;VisuMZ[_0x1c3ac3(0x8a6)](_0x1adbc4,_0x1adbc4);const _0x588856=['animations',_0x1c3ac3(0x8af),_0x1c3ac3(0x450),_0x1c3ac3(0x569),_0x1c3ac3(0x7f3),_0x1c3ac3(0x463),_0x1c3ac3(0x5b9),_0x1c3ac3(0x572),_0x1c3ac3(0x33b),_0x1c3ac3(0x46e),'system',_0x1c3ac3(0x4de),'titles1',_0x1c3ac3(0x6a2)];for(const _0x35a411 of _0x588856){const _0x3d155a=_0x1adbc4[_0x35a411],_0x499fc1=_0x1c3ac3(0x87c)[_0x1c3ac3(0x4f9)](_0x35a411);for(const _0x3ba392 of _0x3d155a){ImageManager[_0x1c3ac3(0x26a)](_0x499fc1,_0x3ba392);}}}),PluginManager[_0x3b4dfd(0x455)](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0x8a3),_0x5013ff=>{const _0x14507b=_0x3b4dfd;if($gameParty['inBattle']())return;VisuMZ[_0x14507b(0x8a6)](_0x5013ff,_0x5013ff);const _0x4fe881=_0x5013ff[_0x14507b(0x66b)][_0x14507b(0x33f)]()[_0x14507b(0x58b)](),_0x2eb951=VisuMZ['CoreEngine']['CreateBattleSystemID'](_0x4fe881);$gameSystem[_0x14507b(0x328)](_0x2eb951);}),VisuMZ['CoreEngine'][_0x3b4dfd(0x7a4)]=function(_0x1c46f){const _0x4634c2=_0x3b4dfd;_0x1c46f=_0x1c46f||_0x4634c2(0x697),_0x1c46f=String(_0x1c46f)['toUpperCase']()[_0x4634c2(0x58b)]();switch(_0x1c46f){case'DTB':return 0x0;case'TPB\x20ACTIVE':Imported[_0x4634c2(0x1de)]&&(_0x4634c2(0x22c)!=='GQChC'?ConfigManager[_0x4634c2(0x30b)]=!![]:(_0x1db13a[_0x4634c2(0x670)](),this[_0x4634c2(0x4fc)]()));return 0x1;case'TPB\x20WAIT':Imported[_0x4634c2(0x1de)]&&(ConfigManager['atbActive']=![]);return 0x2;case _0x4634c2(0x680):if(Imported[_0x4634c2(0x2b4)])return _0x4634c2(0x680);break;case'STB':if(Imported[_0x4634c2(0x271)])return _0x4634c2(0x85a);break;case'BTB':if(Imported[_0x4634c2(0x3f8)])return'BTB';break;case _0x4634c2(0x8b4):if(Imported[_0x4634c2(0x2ce)]){if(_0x4634c2(0x3ca)!==_0x4634c2(0x6e0))return _0x4634c2(0x8b4);else this['_dimmerSprite']=new _0x360c5f(),this[_0x4634c2(0x3b4)]['bitmap']=new _0x450aee(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0x4634c2(0x281)](this[_0x4634c2(0x3b4)]);}break;case'OTB':if(Imported['VisuMZ_2_BattleSystemOTB'])return'EjRSZ'!==_0x4634c2(0x5f4)?_0x23a9e0['getBattleSystem']()>=0x1:_0x4634c2(0x8ea);break;case _0x4634c2(0x42a):if(Imported[_0x4634c2(0x228)])return'ETB';break;case _0x4634c2(0x70c):if(Imported[_0x4634c2(0x6c3)])return _0x4634c2(0x70c);break;}return $dataSystem['battleSystem'];},PluginManager['registerCommand'](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0x4e7),_0x142a4f=>{const _0x4989bc=_0x3b4dfd;VisuMZ[_0x4989bc(0x8a6)](_0x142a4f,_0x142a4f);const _0x4d0451=_0x142a4f[_0x4989bc(0x66b)]||0x1;$gameSystem[_0x4989bc(0x8f2)](_0x4d0451);}),PluginManager['registerCommand'](pluginData['name'],_0x3b4dfd(0x784),_0x3ce8ec=>{const _0x2873b6=_0x3b4dfd;VisuMZ[_0x2873b6(0x8a6)](_0x3ce8ec,_0x3ce8ec);const _0x2d44d6=_0x3ce8ec['id']||0x1,_0x4593fc=_0x3ce8ec[_0x2873b6(0x9f6)],_0xc74281=_0x3ce8ec[_0x2873b6(0x414)]||0x0;let _0x5a9b2f=$gameVariables['value'](_0x2d44d6)||0x0;switch(_0x4593fc){case'=':_0x5a9b2f=_0xc74281;break;case'+':_0x5a9b2f+=_0xc74281;break;case'-':_0x5a9b2f-=_0xc74281;break;case'*':_0x5a9b2f*=_0xc74281;break;case'/':_0x5a9b2f/=_0xc74281;break;case'%':_0x5a9b2f%=_0xc74281;break;}_0x5a9b2f=_0x5a9b2f||0x0,$gameVariables[_0x2873b6(0x274)](_0x2d44d6,_0x5a9b2f);}),PluginManager[_0x3b4dfd(0x455)](pluginData[_0x3b4dfd(0x926)],_0x3b4dfd(0x1b7),_0x31991f=>{const _0xec448a=_0x3b4dfd;VisuMZ[_0xec448a(0x8a6)](_0x31991f,_0x31991f);const _0x2d78fd=_0x31991f['id']()||0x1,_0x2ef767=_0x31991f['operation'],_0x4ce755=_0x31991f['operand']()||0x0;let _0x2a5738=$gameVariables[_0xec448a(0x9db)](_0x2d78fd)||0x0;switch(_0x2ef767){case'=':_0x2a5738=_0x4ce755;break;case'+':_0x2a5738+=_0x4ce755;break;case'-':_0x2a5738-=_0x4ce755;break;case'*':_0x2a5738*=_0x4ce755;break;case'/':_0x2a5738/=_0x4ce755;break;case'%':_0x2a5738%=_0x4ce755;break;}_0x2a5738=_0x2a5738||0x0,$gameVariables['setValue'](_0x2d78fd,_0x2a5738);}),VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x41d)]=Scene_Boot['prototype'][_0x3b4dfd(0x963)],Scene_Boot['prototype'][_0x3b4dfd(0x963)]=function(){const _0x450df9=_0x3b4dfd;VisuMZ[_0x450df9(0x1bf)][_0x450df9(0x41d)][_0x450df9(0x68e)](this),this['process_VisuMZ_CoreEngine_RegExp'](),this['process_VisuMZ_CoreEngine_Notetags'](),this['process_VisuMZ_CoreEngine_Settings'](),this[_0x450df9(0x969)](),this[_0x450df9(0x940)](),this['process_VisuMZ_CoreEngine_ControllerButtons'](),VisuMZ[_0x450df9(0x613)]();},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x20c)]={},Scene_Boot[_0x3b4dfd(0x396)]['process_VisuMZ_CoreEngine_RegExp']=function(){const _0x76ae2b=_0x3b4dfd,_0x1e15cc=[_0x76ae2b(0x332),_0x76ae2b(0x1b9),_0x76ae2b(0x1d7),_0x76ae2b(0x9b3),_0x76ae2b(0x275),'MDF',_0x76ae2b(0x49c),'LUK'],_0x3f500c=[_0x76ae2b(0x655),_0x76ae2b(0x4ae),'CRI',_0x76ae2b(0x342),_0x76ae2b(0x3f4),_0x76ae2b(0x64f),_0x76ae2b(0x8f5),_0x76ae2b(0x7c8),_0x76ae2b(0x7c3),_0x76ae2b(0x352)],_0x4de503=[_0x76ae2b(0x22f),_0x76ae2b(0x24a),_0x76ae2b(0x65f),_0x76ae2b(0x5e9),_0x76ae2b(0x673),_0x76ae2b(0x278),_0x76ae2b(0x4c7),_0x76ae2b(0x9f1),'FDR',_0x76ae2b(0x3f3)],_0x4012b8=[_0x1e15cc,_0x3f500c,_0x4de503],_0x353ca5=[_0x76ae2b(0x23c),_0x76ae2b(0x59a),_0x76ae2b(0x81d),'Max',_0x76ae2b(0x61f),_0x76ae2b(0x959),_0x76ae2b(0xa30),'Flat',_0x76ae2b(0x643),_0x76ae2b(0x983)];for(const _0x38304c of _0x4012b8){if(_0x76ae2b(0x982)!==_0x76ae2b(0x7b8)){let _0x3e7d23='';if(_0x38304c===_0x1e15cc)_0x3e7d23=_0x76ae2b(0x4db);if(_0x38304c===_0x3f500c)_0x3e7d23=_0x76ae2b(0x733);if(_0x38304c===_0x4de503)_0x3e7d23=_0x76ae2b(0x50b);for(const _0x27077a of _0x353ca5){if('EJkBc'===_0x76ae2b(0x29a))!_0x25d03c[_0x76ae2b(0x6a5)]()&&this[_0x76ae2b(0x28d)](_0xdf5c9c);else{let _0x252ffb=_0x76ae2b(0x850)[_0x76ae2b(0x4f9)](_0x3e7d23,_0x27077a);VisuMZ[_0x76ae2b(0x1bf)][_0x76ae2b(0x20c)][_0x252ffb]=[],VisuMZ[_0x76ae2b(0x1bf)]['RegExp'][_0x252ffb+'JS']=[];let _0x1b380c=_0x76ae2b(0x2b0);if([_0x76ae2b(0x23c),_0x76ae2b(0x1c7)][_0x76ae2b(0x5e6)](_0x27077a))'bZVaM'!==_0x76ae2b(0x849)?(_0x1a04c8[_0x76ae2b(0x1bf)]['Game_Picture_show'][_0x76ae2b(0x68e)](this,_0x49c30f,_0x14a2f3,_0x8395a4,_0x25c787,_0x262477,_0x20666c,_0x2d2c8f,_0x1dc9a4),this[_0x76ae2b(0x88a)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x26c2fd]||{'x':0x0,'y':0x0})):_0x1b380c+=_0x76ae2b(0x6ba);else{if([_0x76ae2b(0x59a),_0x76ae2b(0x643)][_0x76ae2b(0x5e6)](_0x27077a))_0x1b380c+=_0x76ae2b(0x266);else{if([_0x76ae2b(0x81d),_0x76ae2b(0x983)]['includes'](_0x27077a))_0x1b380c+=_0x76ae2b(0x3e4);else{if(_0x27077a===_0x76ae2b(0x67e))_0x1b380c+=_0x76ae2b(0x370);else{if(_0x27077a===_0x76ae2b(0x959))_0x1b380c+='(\x5cd+)([%％])>';else _0x27077a===_0x76ae2b(0xa30)&&(_0x1b380c+=_0x76ae2b(0x7ee));}}}}for(const _0x5f3e56 of _0x38304c){let _0x1cff8b=_0x27077a[_0x76ae2b(0x5df)](/[\d+]/g,'')[_0x76ae2b(0x33f)]();const _0x54e68a=_0x1b380c['format'](_0x5f3e56,_0x1cff8b);VisuMZ[_0x76ae2b(0x1bf)][_0x76ae2b(0x20c)][_0x252ffb][_0x76ae2b(0x297)](new RegExp(_0x54e68a,'i'));const _0x376488=_0x76ae2b(0x2ee)['format'](_0x5f3e56,_0x1cff8b);VisuMZ[_0x76ae2b(0x1bf)][_0x76ae2b(0x20c)][_0x252ffb+'JS']['push'](new RegExp(_0x376488,'i'));}}}}else{let _0x5887ad=_0x5c9634['createTroopNote'](_0x5e5645['id']);this['parseForcedGameTroopSettingsCoreEngine'](_0x5887ad);}}},Scene_Boot[_0x3b4dfd(0x396)][_0x3b4dfd(0x968)]=function(){if(VisuMZ['ParseAllNotetags'])return;},Scene_Boot[_0x3b4dfd(0x396)][_0x3b4dfd(0x8d2)]=function(){const _0x36c137=_0x3b4dfd,_0x38fc62=VisuMZ['CoreEngine'][_0x36c137(0x5af)];_0x38fc62[_0x36c137(0x38a)][_0x36c137(0x97c)]&&VisuMZ[_0x36c137(0x382)](!![]);if(_0x38fc62[_0x36c137(0x38a)]['ModernControls']){if(_0x36c137(0x3e7)==='hbZfI')Input[_0x36c137(0x1e9)][0x23]=_0x36c137(0x634),Input[_0x36c137(0x1e9)][0x24]=_0x36c137(0x381);else{const _0xfc55fd=_0x18df56[_0x36c137(0x1bf)][_0x36c137(0x5af)]['Window'];if(_0xfc55fd[_0x36c137(0x5e4)]===![])return;_0xfc55fd[_0x36c137(0x317)]?_0xfc55fd[_0x36c137(0x317)][_0x36c137(0x68e)](this,_0xe83757):_0x9788ad[_0x36c137(0x1bf)][_0x36c137(0x3ff)][_0x36c137(0x68e)](this,_0xe79cfc);}}if(_0x38fc62[_0x36c137(0x3da)]){const _0x5577e8=_0x38fc62[_0x36c137(0x3da)];_0x5577e8[_0x36c137(0x5fb)]=_0x5577e8[_0x36c137(0x5fb)]||_0x36c137(0x49a),_0x5577e8['KeyTAB']=_0x5577e8[_0x36c137(0x6d4)]||'\x5c}❪TAB❫\x5c{';}_0x38fc62[_0x36c137(0x456)][_0x36c137(0x237)]&&(Input['keyMapper'][0x57]='up',Input[_0x36c137(0x1e9)][0x41]=_0x36c137(0x3a6),Input[_0x36c137(0x1e9)][0x53]=_0x36c137(0x86a),Input[_0x36c137(0x1e9)][0x44]=_0x36c137(0x5b2),Input['keyMapper'][0x45]=_0x36c137(0x1dd)),_0x38fc62['KeyboardInput'][_0x36c137(0xa1f)]&&('xJsza'===_0x36c137(0x552)?_0x2a8219[_0x36c137(0x1bf)][_0x36c137(0x42d)]['call'](this):Input[_0x36c137(0x1e9)][0x52]=_0x36c137(0x7ab)),_0x38fc62[_0x36c137(0x339)][_0x36c137(0x7a2)]=_0x38fc62[_0x36c137(0x339)][_0x36c137(0x7a2)][_0x36c137(0x7d4)](_0x734d82=>_0x734d82[_0x36c137(0x33f)]()[_0x36c137(0x58b)]()),_0x38fc62['Param'][_0x36c137(0x1ee)]=_0x38fc62[_0x36c137(0x339)][_0x36c137(0x1ee)][_0x36c137(0x7d4)](_0x54dd92=>_0x54dd92[_0x36c137(0x33f)]()[_0x36c137(0x58b)]());},Scene_Boot[_0x3b4dfd(0x396)][_0x3b4dfd(0x969)]=function(){const _0x3f2c74=_0x3b4dfd;this[_0x3f2c74(0x65e)]();},Scene_Boot[_0x3b4dfd(0x396)][_0x3b4dfd(0x65e)]=function(){const _0x439146=_0x3b4dfd,_0x471cda=VisuMZ[_0x439146(0x1bf)][_0x439146(0x5af)]['jsQuickFunc'];for(const _0xe505f of _0x471cda){const _0x5cd6f6=_0xe505f['FunctionName'][_0x439146(0x5df)](/[ ]/g,''),_0x30a702=_0xe505f[_0x439146(0xa2a)];VisuMZ[_0x439146(0x1bf)][_0x439146(0x2cd)](_0x5cd6f6,_0x30a702);}},VisuMZ[_0x3b4dfd(0x1bf)]['createJsQuickFunction']=function(_0x5aa316,_0x471029){const _0x32c9e5=_0x3b4dfd;if(!!window[_0x5aa316]){if(_0x32c9e5(0x773)!=='nMgRB'){if($gameTemp[_0x32c9e5(0x821)]())console[_0x32c9e5(0x862)]('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'['format'](_0x5aa316));}else _0x10996a(_0x32c9e5(0x8a1));}const _0x568c22=_0x32c9e5(0x239)[_0x32c9e5(0x4f9)](_0x5aa316,_0x471029);window[_0x5aa316]=new Function(_0x568c22);},Scene_Boot[_0x3b4dfd(0x396)][_0x3b4dfd(0x940)]=function(){const _0x219665=_0x3b4dfd,_0x3fac2d=VisuMZ[_0x219665(0x1bf)]['Settings'][_0x219665(0x5c9)];if(!_0x3fac2d)return;for(const _0x522a34 of _0x3fac2d){if(!_0x522a34)continue;VisuMZ['CoreEngine']['createCustomParameter'](_0x522a34);}},VisuMZ[_0x3b4dfd(0x1bf)]['CustomParamNames']={},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x7ca)]={},VisuMZ['CoreEngine'][_0x3b4dfd(0x2d8)]={},VisuMZ['CoreEngine']['CustomParamAbb']={},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5d8)]=function(_0x2a590e){const _0x441971=_0x3b4dfd,_0x4b664f=_0x2a590e[_0x441971(0x37f)],_0xa1d5a9=_0x2a590e[_0x441971(0x6f0)],_0x5b573a=_0x2a590e[_0x441971(0x651)],_0x1405ce=_0x2a590e[_0x441971(0x78f)],_0x62e5d8=new Function(_0x2a590e[_0x441971(0x7a1)]);VisuMZ[_0x441971(0x1bf)]['CustomParamNames'][_0x4b664f[_0x441971(0x33f)]()[_0x441971(0x58b)]()]=_0xa1d5a9,VisuMZ[_0x441971(0x1bf)][_0x441971(0x7ca)][_0x4b664f[_0x441971(0x33f)]()[_0x441971(0x58b)]()]=_0x5b573a,VisuMZ[_0x441971(0x1bf)][_0x441971(0x2d8)][_0x4b664f['toUpperCase']()[_0x441971(0x58b)]()]=_0x1405ce,VisuMZ[_0x441971(0x1bf)][_0x441971(0x84b)][_0x4b664f['toUpperCase']()[_0x441971(0x58b)]()]=_0x4b664f,Object['defineProperty'](Game_BattlerBase[_0x441971(0x396)],_0x4b664f,{'get'(){const _0x4ce159=_0x441971,_0x110732=_0x62e5d8['call'](this);return _0x1405ce===_0x4ce159(0x5ee)?Math[_0x4ce159(0x355)](_0x110732):_0x110732;}});},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x9a3)]={},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x376)]={},Scene_Boot[_0x3b4dfd(0x396)][_0x3b4dfd(0x7cd)]=function(){const _0x373b3b=_0x3b4dfd,_0x1abfdf=VisuMZ[_0x373b3b(0x1bf)][_0x373b3b(0x5af)][_0x373b3b(0x9a3)];for(const _0x3bc26f of _0x1abfdf){const _0x3eab7a=(_0x3bc26f[_0x373b3b(0x4e0)]||'')[_0x373b3b(0x1ea)]()[_0x373b3b(0x58b)](),_0x15eabc=(_0x3bc26f[_0x373b3b(0x529)]||'')[_0x373b3b(0x1ea)]()['trim']();VisuMZ[_0x373b3b(0x1bf)][_0x373b3b(0x9a3)][_0x3eab7a]=_0x3bc26f,VisuMZ[_0x373b3b(0x1bf)][_0x373b3b(0x376)][_0x15eabc]=_0x3eab7a;}},VisuMZ[_0x3b4dfd(0x613)]=function(){const _0x5e8f7d=_0x3b4dfd;for(const _0x86a55f of $dataActors){if(_0x86a55f)VisuMZ[_0x5e8f7d(0x21c)](_0x86a55f);}for(const _0x49d9b9 of $dataClasses){if(_0x49d9b9)VisuMZ['ParseClassNotetags'](_0x49d9b9);}for(const _0x44eb56 of $dataSkills){if(_0x44eb56)VisuMZ[_0x5e8f7d(0x26c)](_0x44eb56);}for(const _0x3a1d29 of $dataItems){if(_0x5e8f7d(0xa21)===_0x5e8f7d(0x453)){if(_0x452eac[_0x5e8f7d(0x5e6)](_0x3dea98)){const _0x33b19a=_0x1a7498[_0x5e8f7d(0x1bf)]['ControllerMatches'][_0x297511],_0x653db1=_0x2e8c2a[_0x5e8f7d(0x1bf)][_0x5e8f7d(0x9a3)][_0x33b19a];return _0x653db1[_0x1a9c25]||this[_0x5e8f7d(0x932)](_0xf5ff5a);}}else{if(_0x3a1d29)VisuMZ[_0x5e8f7d(0x6c8)](_0x3a1d29);}}for(const _0x1c7fc4 of $dataWeapons){if(_0x5e8f7d(0x62b)===_0x5e8f7d(0x62b)){if(_0x1c7fc4)VisuMZ['ParseWeaponNotetags'](_0x1c7fc4);}else _0x94d12c+=_0x4d8de3,_0x3b441c+=_0x5e8f7d(0x666)[_0x5e8f7d(0x4f9)](_0x5b2cdb,_0x31e444[_0x5e8f7d(0x74b)][0x0]+0x1,_0x2c5122[_0x5e8f7d(0x74b)][0x1]);}for(const _0x13ec29 of $dataArmors){if(_0x5e8f7d(0x543)!==_0x5e8f7d(0x7c1)){if(_0x13ec29)VisuMZ['ParseArmorNotetags'](_0x13ec29);}else{this[_0x5e8f7d(0x81b)][_0x5e8f7d(0x8b7)](_0x153e70),this[_0x5e8f7d(0xa01)](_0x90506b);for(const _0x557b95 of _0x87b1d0[_0x5e8f7d(0x8e7)]){_0x557b95['endAnimation']&&_0x557b95[_0x5e8f7d(0x3b2)]();}_0x490b6b[_0x5e8f7d(0x86c)]();}}for(const _0x2e2453 of $dataEnemies){if('kxISB'===_0x5e8f7d(0x29d)){if(_0x2e2453)VisuMZ['ParseEnemyNotetags'](_0x2e2453);}else return _0x20fea3[_0x5e8f7d(0x396)][_0x5e8f7d(0x7e9)][_0x5e8f7d(0x68e)](this);}for(const _0x51d333 of $dataStates){if(_0x51d333)VisuMZ[_0x5e8f7d(0x888)](_0x51d333);}for(const _0xcd1166 of $dataTilesets){if(_0xcd1166)VisuMZ[_0x5e8f7d(0x36b)](_0xcd1166);}},VisuMZ[_0x3b4dfd(0x21c)]=function(_0x4d81e4){},VisuMZ[_0x3b4dfd(0x49d)]=function(_0x2c9aa1){},VisuMZ['ParseSkillNotetags']=function(_0x1b70c7){},VisuMZ[_0x3b4dfd(0x6c8)]=function(_0x3625e5){},VisuMZ[_0x3b4dfd(0x7c6)]=function(_0xb2dfd6){},VisuMZ['ParseArmorNotetags']=function(_0x15bfa6){},VisuMZ[_0x3b4dfd(0x64d)]=function(_0x393a10){},VisuMZ['ParseStateNotetags']=function(_0x39efc1){},VisuMZ[_0x3b4dfd(0x36b)]=function(_0x32438a){},VisuMZ['CoreEngine']['ParseActorNotetags']=VisuMZ[_0x3b4dfd(0x21c)],VisuMZ[_0x3b4dfd(0x21c)]=function(_0x52f4ec){const _0x238b47=_0x3b4dfd;VisuMZ[_0x238b47(0x1bf)][_0x238b47(0x21c)][_0x238b47(0x68e)](this,_0x52f4ec);const _0x20e7f3=_0x52f4ec[_0x238b47(0x8e2)];if(_0x20e7f3[_0x238b47(0x7b5)](/<MAX LEVEL:[ ](\d+)>/i)){_0x52f4ec[_0x238b47(0x1a2)]=Number(RegExp['$1']);if(_0x52f4ec[_0x238b47(0x1a2)]===0x0)_0x52f4ec['maxLevel']=Number[_0x238b47(0x3a7)];}_0x20e7f3[_0x238b47(0x7b5)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x52f4ec[_0x238b47(0x558)]=Math[_0x238b47(0x467)](Number(RegExp['$1']),_0x52f4ec[_0x238b47(0x1a2)]));},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x49d)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x3b4dfd(0x49d)]=function(_0x4a59d6){const _0x50d0c0=_0x3b4dfd;VisuMZ[_0x50d0c0(0x1bf)][_0x50d0c0(0x49d)]['call'](this,_0x4a59d6);if(_0x4a59d6[_0x50d0c0(0x56d)])for(const _0x126ece of _0x4a59d6['learnings']){_0x50d0c0(0x292)!=='pOiXz'?(_0xda97f9[_0x50d0c0(0x396)][_0x50d0c0(0x9bd)][_0x50d0c0(0x68e)](this),this[_0x50d0c0(0x3c0)]()):_0x126ece[_0x50d0c0(0x8e2)][_0x50d0c0(0x7b5)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x126ece[_0x50d0c0(0x678)]=Math[_0x50d0c0(0x67b)](Number(RegExp['$1']),0x1));}},VisuMZ['CoreEngine'][_0x3b4dfd(0x64d)]=VisuMZ[_0x3b4dfd(0x64d)],VisuMZ['ParseEnemyNotetags']=function(_0x5b54dd){const _0x298f27=_0x3b4dfd;VisuMZ[_0x298f27(0x1bf)][_0x298f27(0x64d)][_0x298f27(0x68e)](this,_0x5b54dd),_0x5b54dd['level']=0x1;const _0x5552b5=_0x5b54dd[_0x298f27(0x8e2)];if(_0x5552b5[_0x298f27(0x7b5)](/<LEVEL:[ ](\d+)>/i))_0x5b54dd[_0x298f27(0x678)]=Number(RegExp['$1']);if(_0x5552b5[_0x298f27(0x7b5)](/<MAXHP:[ ](\d+)>/i))_0x5b54dd['params'][0x0]=Number(RegExp['$1']);if(_0x5552b5[_0x298f27(0x7b5)](/<MAXMP:[ ](\d+)>/i))_0x5b54dd[_0x298f27(0x1f4)][0x1]=Number(RegExp['$1']);if(_0x5552b5[_0x298f27(0x7b5)](/<ATK:[ ](\d+)>/i))_0x5b54dd['params'][0x2]=Number(RegExp['$1']);if(_0x5552b5[_0x298f27(0x7b5)](/<DEF:[ ](\d+)>/i))_0x5b54dd[_0x298f27(0x1f4)][0x3]=Number(RegExp['$1']);if(_0x5552b5[_0x298f27(0x7b5)](/<MAT:[ ](\d+)>/i))_0x5b54dd[_0x298f27(0x1f4)][0x4]=Number(RegExp['$1']);if(_0x5552b5[_0x298f27(0x7b5)](/<MDF:[ ](\d+)>/i))_0x5b54dd[_0x298f27(0x1f4)][0x5]=Number(RegExp['$1']);if(_0x5552b5[_0x298f27(0x7b5)](/<AGI:[ ](\d+)>/i))_0x5b54dd['params'][0x6]=Number(RegExp['$1']);if(_0x5552b5[_0x298f27(0x7b5)](/<LUK:[ ](\d+)>/i))_0x5b54dd[_0x298f27(0x1f4)][0x7]=Number(RegExp['$1']);if(_0x5552b5[_0x298f27(0x7b5)](/<EXP:[ ](\d+)>/i))_0x5b54dd['exp']=Number(RegExp['$1']);if(_0x5552b5[_0x298f27(0x7b5)](/<GOLD:[ ](\d+)>/i))_0x5b54dd[_0x298f27(0x2d0)]=Number(RegExp['$1']);},VisuMZ['CoreEngine'][_0x3b4dfd(0x44e)]=Graphics['_defaultStretchMode'],Graphics['_defaultStretchMode']=function(){const _0x9b7e3e=_0x3b4dfd;switch(VisuMZ[_0x9b7e3e(0x1bf)]['Settings']['QoL']['AutoStretch']){case _0x9b7e3e(0x4ab):return!![];case _0x9b7e3e(0x875):return![];default:return VisuMZ[_0x9b7e3e(0x1bf)][_0x9b7e3e(0x44e)][_0x9b7e3e(0x68e)](this);}},VisuMZ['CoreEngine'][_0x3b4dfd(0x7bb)]=Graphics[_0x3b4dfd(0x9cc)],Graphics['printError']=function(_0x173ef9,_0x56eb5e,_0x3397b2=null){const _0x25f103=_0x3b4dfd;VisuMZ[_0x25f103(0x1bf)]['Graphics_printError'][_0x25f103(0x68e)](this,_0x173ef9,_0x56eb5e,_0x3397b2),VisuMZ[_0x25f103(0x382)](![]);},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x4fe)]=Graphics[_0x3b4dfd(0x2d4)],Graphics[_0x3b4dfd(0x2d4)]=function(_0x36bfd4){const _0x5e51d1=_0x3b4dfd;VisuMZ[_0x5e51d1(0x1bf)][_0x5e51d1(0x4fe)][_0x5e51d1(0x68e)](this,_0x36bfd4),this[_0x5e51d1(0x4b0)](_0x36bfd4);},Graphics['_centerElementCoreEngine']=function(_0x378a64){const _0x24d445=_0x3b4dfd;VisuMZ[_0x24d445(0x1bf)][_0x24d445(0x5af)][_0x24d445(0x38a)]['FontSmoothing']&&(_0x378a64['style'][_0x24d445(0x795)]=_0x24d445(0x86e));VisuMZ[_0x24d445(0x1bf)][_0x24d445(0x5af)][_0x24d445(0x38a)][_0x24d445(0x43c)]&&(_0x24d445(0x233)!=='zbGqp'?_0x378a64[_0x24d445(0x32d)]['image-rendering']=_0x24d445(0x5eb):this[_0x24d445(0x7d8)][_0x24d445(0x3f2)](_0x1b28e9[_0x24d445(0x630)][_0x24d445(0x80b)]));const _0xf2f435=Math['max'](0x0,Math[_0x24d445(0x9d3)](_0x378a64[_0x24d445(0x2d3)]*this[_0x24d445(0x3a9)])),_0x3cfc97=Math[_0x24d445(0x67b)](0x0,Math[_0x24d445(0x9d3)](_0x378a64[_0x24d445(0x2c8)]*this[_0x24d445(0x3a9)]));_0x378a64['style']['width']=_0xf2f435+'px',_0x378a64[_0x24d445(0x32d)][_0x24d445(0x2c8)]=_0x3cfc97+'px';},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x549)]=Bitmap[_0x3b4dfd(0x396)]['initialize'],Bitmap[_0x3b4dfd(0x396)][_0x3b4dfd(0x24b)]=function(_0x519962,_0x422ce4){const _0x398fdb=_0x3b4dfd;VisuMZ[_0x398fdb(0x1bf)][_0x398fdb(0x549)][_0x398fdb(0x68e)](this,_0x519962,_0x422ce4),this['_smooth']=!(VisuMZ[_0x398fdb(0x1bf)][_0x398fdb(0x5af)][_0x398fdb(0x38a)][_0x398fdb(0x43c)]??!![]);},Bitmap[_0x3b4dfd(0x396)][_0x3b4dfd(0x503)]=function(){const _0x49dfe3=_0x3b4dfd;this[_0x49dfe3(0x5bb)]=!![];},VisuMZ['CoreEngine'][_0x3b4dfd(0x488)]=Sprite['prototype'][_0x3b4dfd(0x86c)],Sprite[_0x3b4dfd(0x396)][_0x3b4dfd(0x86c)]=function(){const _0x3e8eea=_0x3b4dfd;if(this[_0x3e8eea(0x246)])VisuMZ[_0x3e8eea(0x1bf)][_0x3e8eea(0x488)][_0x3e8eea(0x68e)](this);this[_0x3e8eea(0x476)]();},Sprite[_0x3b4dfd(0x396)][_0x3b4dfd(0x476)]=function(){const _0x493745=_0x3b4dfd;if(!this[_0x493745(0x8ad)])return;if(!this['bitmap']['_customModified'])return;this[_0x493745(0x8ad)]['_baseTexture']&&!this[_0x493745(0x757)][_0x493745(0x5a0)]['destroyed']&&this['bitmap'][_0x493745(0x86c)]();},VisuMZ[_0x3b4dfd(0x1bf)]['Bitmap_resize']=Bitmap[_0x3b4dfd(0x396)]['resize'],Bitmap[_0x3b4dfd(0x396)][_0x3b4dfd(0x5d0)]=function(_0x258eaf,_0x57e500){const _0x4c5d32=_0x3b4dfd;VisuMZ[_0x4c5d32(0x1bf)][_0x4c5d32(0x946)]['call'](this,_0x258eaf,_0x57e500),this[_0x4c5d32(0x503)]();},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x864)]=Bitmap[_0x3b4dfd(0x396)][_0x3b4dfd(0x254)],Bitmap[_0x3b4dfd(0x396)]['blt']=function(_0x241d3d,_0x5942b4,_0x49b149,_0x266462,_0x5c893a,_0x33f361,_0x5618a2,_0x574aa8,_0x3b2219){const _0x147e5a=_0x3b4dfd;_0x5942b4=Math[_0x147e5a(0x355)](_0x5942b4),_0x49b149=Math[_0x147e5a(0x355)](_0x49b149),_0x266462=Math['round'](_0x266462),_0x5c893a=Math['round'](_0x5c893a),_0x33f361=Math[_0x147e5a(0x355)](_0x33f361),_0x5618a2=Math['round'](_0x5618a2),VisuMZ['CoreEngine']['Bitmap_blt'][_0x147e5a(0x68e)](this,_0x241d3d,_0x5942b4,_0x49b149,_0x266462,_0x5c893a,_0x33f361,_0x5618a2,_0x574aa8,_0x3b2219),this[_0x147e5a(0x503)]();},VisuMZ[_0x3b4dfd(0x1bf)]['Bitmap_clearRect']=Bitmap[_0x3b4dfd(0x396)][_0x3b4dfd(0x8f8)],Bitmap[_0x3b4dfd(0x396)][_0x3b4dfd(0x8f8)]=function(_0x4139e4,_0x5b10bf,_0x1ecc20,_0x203c83){const _0x6da935=_0x3b4dfd;VisuMZ['CoreEngine'][_0x6da935(0x9d2)][_0x6da935(0x68e)](this,_0x4139e4,_0x5b10bf,_0x1ecc20,_0x203c83),this[_0x6da935(0x503)]();},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x1f7)]=Bitmap[_0x3b4dfd(0x396)][_0x3b4dfd(0x676)],Bitmap[_0x3b4dfd(0x396)][_0x3b4dfd(0x676)]=function(_0x1da236,_0x480dac,_0x5dc542,_0x2de807,_0x5326c5){const _0x4a3cbe=_0x3b4dfd;VisuMZ[_0x4a3cbe(0x1bf)][_0x4a3cbe(0x1f7)][_0x4a3cbe(0x68e)](this,_0x1da236,_0x480dac,_0x5dc542,_0x2de807,_0x5326c5),this[_0x4a3cbe(0x503)]();},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5d5)]=Bitmap['prototype'][_0x3b4dfd(0x5cc)],Bitmap['prototype'][_0x3b4dfd(0x5cc)]=function(_0x1833de,_0x735cdf,_0x514567,_0x4e1d36,_0x4e0142){const _0x456379=_0x3b4dfd;VisuMZ['CoreEngine']['Bitmap_strokeRect'][_0x456379(0x68e)](this,_0x1833de,_0x735cdf,_0x514567,_0x4e1d36,_0x4e0142),this[_0x456379(0x503)]();},VisuMZ[_0x3b4dfd(0x1bf)]['Bitmap_gradientFillRect']=Bitmap[_0x3b4dfd(0x396)]['gradientFillRect'],Bitmap['prototype'][_0x3b4dfd(0x533)]=function(_0x237fa1,_0x508e4f,_0x285e0a,_0x185eb3,_0xbe033c,_0x10f56,_0x55b86f){const _0x23aa01=_0x3b4dfd;VisuMZ[_0x23aa01(0x1bf)][_0x23aa01(0x44f)][_0x23aa01(0x68e)](this,_0x237fa1,_0x508e4f,_0x285e0a,_0x185eb3,_0xbe033c,_0x10f56,_0x55b86f),this[_0x23aa01(0x503)]();},VisuMZ[_0x3b4dfd(0x1bf)]['Bitmap_drawCircle']=Bitmap[_0x3b4dfd(0x396)][_0x3b4dfd(0x559)],Bitmap[_0x3b4dfd(0x396)][_0x3b4dfd(0x559)]=function(_0x13f9dd,_0x1b79bc,_0x53fdcf,_0x4ba820){const _0x6b55=_0x3b4dfd;_0x13f9dd=Math['round'](_0x13f9dd),_0x1b79bc=Math['round'](_0x1b79bc),_0x53fdcf=Math['round'](_0x53fdcf),VisuMZ[_0x6b55(0x1bf)]['Bitmap_drawCircle']['call'](this,_0x13f9dd,_0x1b79bc,_0x53fdcf,_0x4ba820),this[_0x6b55(0x503)]();},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x1a1)]=Bitmap['prototype'][_0x3b4dfd(0xa04)],Bitmap[_0x3b4dfd(0x396)][_0x3b4dfd(0xa04)]=function(_0x42c95e){const _0x2981d0=_0x3b4dfd;return Math['ceil'](VisuMZ['CoreEngine'][_0x2981d0(0x1a1)]['call'](this,_0x42c95e));},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x8b3)]=Bitmap[_0x3b4dfd(0x396)]['drawText'],Bitmap[_0x3b4dfd(0x396)][_0x3b4dfd(0x686)]=function(_0xa42cb4,_0x445d94,_0x30beb7,_0x4ef4a6,_0x26c8f5,_0x68c150){const _0x3dc24c=_0x3b4dfd;_0x445d94=Math[_0x3dc24c(0x355)](_0x445d94),_0x30beb7=Math[_0x3dc24c(0x355)](_0x30beb7),_0x4ef4a6=Math[_0x3dc24c(0x355)](_0x4ef4a6),_0x26c8f5=Math[_0x3dc24c(0x355)](_0x26c8f5),VisuMZ[_0x3dc24c(0x1bf)]['Bitmap_drawText'][_0x3dc24c(0x68e)](this,_0xa42cb4,_0x445d94,_0x30beb7,_0x4ef4a6,_0x26c8f5,_0x68c150),this[_0x3dc24c(0x503)]();},VisuMZ['CoreEngine'][_0x3b4dfd(0x421)]=Bitmap[_0x3b4dfd(0x396)]['_drawTextOutline'],Bitmap[_0x3b4dfd(0x396)][_0x3b4dfd(0x56b)]=function(_0x1a17cd,_0x10c464,_0x95f9cf,_0x637679){const _0x1cecff=_0x3b4dfd;VisuMZ[_0x1cecff(0x1bf)][_0x1cecff(0x5af)][_0x1cecff(0x38a)][_0x1cecff(0x356)]?this['_drawTextShadow'](_0x1a17cd,_0x10c464,_0x95f9cf,_0x637679):_0x1cecff(0x216)===_0x1cecff(0x44b)?(_0x283645['clear'](),this[_0x1cecff(0x880)]()):VisuMZ[_0x1cecff(0x1bf)][_0x1cecff(0x421)][_0x1cecff(0x68e)](this,_0x1a17cd,_0x10c464,_0x95f9cf,_0x637679);},Bitmap[_0x3b4dfd(0x396)]['_drawTextShadow']=function(_0x57497a,_0x217b31,_0x5caa54,_0x31cd5a){const _0x4d59e7=_0x3b4dfd,_0x11512e=this[_0x4d59e7(0x9f7)];_0x11512e['fillStyle']=this[_0x4d59e7(0x9be)],_0x11512e[_0x4d59e7(0x6c2)](_0x57497a,_0x217b31+0x2,_0x5caa54+0x2,_0x31cd5a);},VisuMZ['CoreEngine'][_0x3b4dfd(0x69c)]=Input[_0x3b4dfd(0x670)],Input['clear']=function(){const _0x132a58=_0x3b4dfd;VisuMZ[_0x132a58(0x1bf)][_0x132a58(0x69c)][_0x132a58(0x68e)](this),this[_0x132a58(0x7cb)]=undefined,this[_0x132a58(0x3de)]=undefined,this['_gamepadWait']=Input[_0x132a58(0x1f9)];},VisuMZ[_0x3b4dfd(0x1bf)]['Input_update']=Input[_0x3b4dfd(0x933)],Input[_0x3b4dfd(0x933)]=function(){const _0x2b7dc1=_0x3b4dfd;VisuMZ[_0x2b7dc1(0x1bf)][_0x2b7dc1(0x519)][_0x2b7dc1(0x68e)](this);if(this['_gamepadWait'])this['_gamepadWait']--;},VisuMZ[_0x3b4dfd(0x1bf)]['Input_pollGamepads']=Input[_0x3b4dfd(0x2b2)],Input[_0x3b4dfd(0x2b2)]=function(){const _0x1d1b16=_0x3b4dfd;if(this[_0x1d1b16(0x60f)])return;VisuMZ['CoreEngine'][_0x1d1b16(0x35d)][_0x1d1b16(0x68e)](this);},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x47e)]=Input[_0x3b4dfd(0x43d)],Input[_0x3b4dfd(0x43d)]=function(){const _0xccd51b=_0x3b4dfd;VisuMZ[_0xccd51b(0x1bf)][_0xccd51b(0x47e)][_0xccd51b(0x68e)](this),document[_0xccd51b(0x8d5)](_0xccd51b(0x884),this[_0xccd51b(0x3e2)][_0xccd51b(0x2bd)](this));},VisuMZ['CoreEngine'][_0x3b4dfd(0x7b0)]=Input['_onKeyDown'],Input[_0x3b4dfd(0x438)]=function(_0x3f8f96){const _0x299125=_0x3b4dfd;this[_0x299125(0x3de)]=_0x3f8f96[_0x299125(0x8df)],VisuMZ[_0x299125(0x1bf)][_0x299125(0x7b0)][_0x299125(0x68e)](this,_0x3f8f96),this[_0x299125(0x489)](null);},Input['_onKeyPress']=function(_0x341a94){const _0x35d389=_0x3b4dfd;this[_0x35d389(0x92a)](_0x341a94);},Input[_0x3b4dfd(0x92a)]=function(_0x133fea){const _0x4c1c81=_0x3b4dfd;this[_0x4c1c81(0x3de)]=_0x133fea[_0x4c1c81(0x8df)];let _0x4346e5=String[_0x4c1c81(0x9bb)](_0x133fea[_0x4c1c81(0x34d)]);this[_0x4c1c81(0x7cb)]===undefined?this['_inputString']=_0x4346e5:this[_0x4c1c81(0x7cb)]+=_0x4346e5;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x900)]=Input['_shouldPreventDefault'],Input[_0x3b4dfd(0x5fe)]=function(_0x1b16f7){const _0x10b408=_0x3b4dfd;if(_0x1b16f7===0x8)return![];return VisuMZ[_0x10b408(0x1bf)][_0x10b408(0x900)]['call'](this,_0x1b16f7);},Input[_0x3b4dfd(0x8ec)]=function(_0x4fe39b){const _0x10e163=_0x3b4dfd;if(_0x4fe39b[_0x10e163(0x7b5)](/backspace/i))return this[_0x10e163(0x3de)]===0x8;if(_0x4fe39b['match'](/enter/i))return this['_inputSpecialKeyCode']===0xd;if(_0x4fe39b[_0x10e163(0x7b5)](/escape/i))return this[_0x10e163(0x3de)]===0x1b;},Input[_0x3b4dfd(0x7d7)]=function(){const _0x2d44a5=_0x3b4dfd;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x2d44a5(0x7ad)](this['_inputSpecialKeyCode']);},Input[_0x3b4dfd(0x763)]=function(){const _0x41f26e=_0x3b4dfd;return[0x25,0x26,0x27,0x28][_0x41f26e(0x7ad)](this['_inputSpecialKeyCode']);},Input['isGamepadConnected']=function(){const _0x8e9122=_0x3b4dfd;if(navigator[_0x8e9122(0x85f)]){const _0x2c6da1=navigator[_0x8e9122(0x85f)]();if(_0x2c6da1){if(_0x8e9122(0x796)!==_0x8e9122(0x796))this['_listWindow'][_0x8e9122(0x3f2)](_0x47cb8c['layoutSettings'][_0x8e9122(0x6c1)]);else for(const _0x3bd758 of _0x2c6da1){if(_0x3bd758&&_0x3bd758[_0x8e9122(0x67d)])return!![];}}}return![];},Input[_0x3b4dfd(0x65c)]=function(){const _0x43b9e5=_0x3b4dfd;if(navigator[_0x43b9e5(0x85f)]){const _0x3a9938=navigator[_0x43b9e5(0x85f)]();if(_0x3a9938)for(const _0x24dca5 of _0x3a9938){if(_0x43b9e5(0x3bf)==='BEQFm'){if(_0x24dca5&&_0x24dca5['connected']){if('WCBnE'===_0x43b9e5(0x1cc))return _0x426e2c[_0x43b9e5(0x337)]()?_0x421fd3['actor']()[_0x43b9e5(0x433)](_0x2e2d27):_0x534865[_0x43b9e5(0x396)]['isEnabled'][_0x43b9e5(0x68e)](this,_0x2e50c9);else{if(this[_0x43b9e5(0x723)](_0x24dca5))return!![];if(this[_0x43b9e5(0x9fe)](_0x24dca5))return!![];}}}else this['isItemStyle']()?this[_0x43b9e5(0x427)]():_0x51ddda[_0x43b9e5(0x1bf)][_0x43b9e5(0x611)][_0x43b9e5(0x68e)](this);}}return![];},Input[_0x3b4dfd(0x723)]=function(_0x1137d0){const _0x53ab35=_0x3b4dfd,_0x509e30=_0x1137d0['buttons'];for(let _0x1597e2=0x0;_0x1597e2<_0x509e30[_0x53ab35(0xa16)];_0x1597e2++){if(_0x509e30[_0x1597e2]['pressed'])return!![];}return![];},Input['isGamepadAxisMoved']=function(_0x23c294){const _0x2baf7f=_0x3b4dfd,_0x5641cf=_0x23c294[_0x2baf7f(0x8ab)],_0x5f0e75=0.5;if(_0x5641cf[0x0]<-_0x5f0e75)return!![];if(_0x5641cf[0x0]>_0x5f0e75)return!![];if(_0x5641cf[0x1]<-_0x5f0e75)return!![];if(_0x5641cf[0x1]>_0x5f0e75)return!![];return![];},Input[_0x3b4dfd(0x841)]=function(){const _0x1ea9a2=_0x3b4dfd;return this[_0x1ea9a2(0x95b)]||null;},Input[_0x3b4dfd(0x489)]=function(_0x1b4c71){const _0x215e0d=_0x3b4dfd;this[_0x215e0d(0x95b)]=_0x1b4c71;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x8f3)]=Input['_updateGamepadState'],Input['_updateGamepadState']=function(_0x1fec20){const _0x2d960e=_0x3b4dfd;VisuMZ[_0x2d960e(0x1bf)][_0x2d960e(0x8f3)][_0x2d960e(0x68e)](this,_0x1fec20),(this[_0x2d960e(0x723)](_0x1fec20)||this[_0x2d960e(0x9fe)](_0x1fec20))&&this[_0x2d960e(0x489)](_0x1fec20);},Input[_0x3b4dfd(0x444)]=function(){const _0x32d38f=_0x3b4dfd;return this[_0x32d38f(0x95b)]?this[_0x32d38f(0x95b)]['id']:_0x32d38f(0x865);},VisuMZ['CoreEngine'][_0x3b4dfd(0x79c)]=Tilemap[_0x3b4dfd(0x396)][_0x3b4dfd(0x284)],Tilemap[_0x3b4dfd(0x396)][_0x3b4dfd(0x284)]=function(_0x144cfb,_0x323bc2,_0x2b99cf,_0x3d2ab0){const _0x925c5b=_0x3b4dfd;if($gameMap&&$gameMap[_0x925c5b(0x1a9)]())return;VisuMZ[_0x925c5b(0x1bf)][_0x925c5b(0x79c)][_0x925c5b(0x68e)](this,_0x144cfb,_0x323bc2,_0x2b99cf,_0x3d2ab0);},Tilemap[_0x3b4dfd(0x827)][_0x3b4dfd(0x396)][_0x3b4dfd(0x3bd)]=function(){const _0xbc9b7b=_0x3b4dfd;this[_0xbc9b7b(0x4b7)]();for(let _0x69bdff=0x0;_0x69bdff<Tilemap[_0xbc9b7b(0x587)][_0xbc9b7b(0x2f0)];_0x69bdff++){if(_0xbc9b7b(0x6ac)==='bnIAa'){const _0x1ea469=new PIXI[(_0xbc9b7b(0x81a))]();_0x1ea469[_0xbc9b7b(0x406)](0x800,0x800),VisuMZ[_0xbc9b7b(0x1bf)][_0xbc9b7b(0x5af)]['QoL'][_0xbc9b7b(0x43c)]&&(_0x1ea469[_0xbc9b7b(0x565)]=PIXI[_0xbc9b7b(0x6b2)][_0xbc9b7b(0x63e)]),this[_0xbc9b7b(0x930)]['push'](_0x1ea469);}else return _0x13b20a[_0xbc9b7b(0x1bf)]['Scene_MenuBase_mainAreaTop'][_0xbc9b7b(0x68e)](this);}},WindowLayer['prototype']['isMaskingEnabled']=function(){const _0x4fab0b=_0x3b4dfd;if(SceneManager&&SceneManager[_0x4fab0b(0x46a)])return SceneManager[_0x4fab0b(0x46a)][_0x4fab0b(0x622)]();else{if('DlcKr'!==_0x4fab0b(0x3e3))_0x17b53f['scaleMode']=_0x3e6954['SCALE_MODES'][_0x4fab0b(0x63e)];else return!![];}},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x72e)]=WindowLayer['prototype'][_0x3b4dfd(0x252)],WindowLayer[_0x3b4dfd(0x396)][_0x3b4dfd(0x252)]=function render(_0x3dc3d7){const _0x440bf2=_0x3b4dfd;this['isMaskingEnabled']()?VisuMZ[_0x440bf2(0x1bf)][_0x440bf2(0x72e)][_0x440bf2(0x68e)](this,_0x3dc3d7):this[_0x440bf2(0x835)](_0x3dc3d7);},WindowLayer['prototype']['renderNoMask']=function render(_0x195360){const _0x264388=_0x3b4dfd;if(!this[_0x264388(0xa11)])return;const _0x5837aa=new PIXI[(_0x264388(0x9a6))](),_0x525443=_0x195360['gl'],_0x3221cc=this['children']['clone']();_0x195360[_0x264388(0x3b5)]['forceStencil'](),_0x5837aa[_0x264388(0x578)]=this[_0x264388(0x578)],_0x195360[_0x264388(0x3d7)][_0x264388(0x251)](),_0x525443['enable'](_0x525443[_0x264388(0x4a7)]);while(_0x3221cc[_0x264388(0xa16)]>0x0){if('eiElv'===_0x264388(0x8da)){const _0xc477e3=_0x3221cc[_0x264388(0x5a7)]();_0xc477e3[_0x264388(0xa0d)]&&_0xc477e3[_0x264388(0xa11)]&&_0xc477e3[_0x264388(0x80d)]>0x0&&(_0x525443[_0x264388(0x5a4)](_0x525443[_0x264388(0x682)],0x0,~0x0),_0x525443[_0x264388(0x22d)](_0x525443['KEEP'],_0x525443[_0x264388(0x544)],_0x525443[_0x264388(0x544)]),_0xc477e3[_0x264388(0x252)](_0x195360),_0x195360['batch'][_0x264388(0x251)](),_0x5837aa['clear'](),_0x525443[_0x264388(0x5a4)](_0x525443[_0x264388(0x9ef)],0x1,~0x0),_0x525443['stencilOp'](_0x525443[_0x264388(0x260)],_0x525443['REPLACE'],_0x525443[_0x264388(0x260)]),_0x525443[_0x264388(0x59f)](_0x525443[_0x264388(0x800)],_0x525443[_0x264388(0x9d7)]),_0x5837aa[_0x264388(0x252)](_0x195360),_0x195360['batch'][_0x264388(0x251)](),_0x525443[_0x264388(0x59f)](_0x525443[_0x264388(0x9d7)],_0x525443['ONE_MINUS_SRC_ALPHA']));}else this['_itemWindow']['setBackgroundType'](_0x4cff27[_0x264388(0x630)][_0x264388(0x80b)]);}_0x525443[_0x264388(0x4d0)](_0x525443['STENCIL_TEST']),_0x525443[_0x264388(0x670)](_0x525443['STENCIL_BUFFER_BIT']),_0x525443['clearStencil'](0x0),_0x195360['batch'][_0x264388(0x251)]();for(const _0x305aab of this[_0x264388(0x89d)]){if(_0x264388(0x746)!==_0x264388(0x2af))!_0x305aab[_0x264388(0xa0d)]&&_0x305aab[_0x264388(0xa11)]&&_0x305aab[_0x264388(0x252)](_0x195360);else{const _0x499a67=_0x45a20a[_0x264388(0xa0c)][_0x264388(0x5df)](/[ ]/g,''),_0x37fad8=_0x3970c8[_0x264388(0xa2a)];_0x397b78[_0x264388(0x1bf)]['createJsQuickFunction'](_0x499a67,_0x37fad8);}}_0x195360[_0x264388(0x3d7)][_0x264388(0x251)]();},DataManager[_0x3b4dfd(0x31b)]=function(_0x3d2f2a){const _0x3a4728=_0x3b4dfd;return this[_0x3a4728(0x571)](_0x3d2f2a)&&_0x3d2f2a['itypeId']===0x2;},VisuMZ['CoreEngine']['DataManager_setupNewGame']=DataManager[_0x3b4dfd(0x400)],DataManager[_0x3b4dfd(0x400)]=function(){const _0x4f32e4=_0x3b4dfd;VisuMZ[_0x4f32e4(0x1bf)][_0x4f32e4(0x604)][_0x4f32e4(0x68e)](this),this[_0x4f32e4(0x4c1)](),this[_0x4f32e4(0x60e)]();},DataManager[_0x3b4dfd(0x4c1)]=function(){const _0x3fd058=_0x3b4dfd;if($gameTemp[_0x3fd058(0x821)]()){if('lXYEd'===_0x3fd058(0x1fe)){const _0x6d5f2e=_0x48dfdf['y']+(this[_0x3fd058(0x2b8)]()-_0x5757a8[_0x3fd058(0x6a4)])/0x2;this[_0x3fd058(0x18f)](_0x56a7e5,_0x5819f9['x'],_0x6d5f2e);const _0x1b2f5b=_0x11a77a[_0x3fd058(0x321)]+0x4;_0x366a24['x']+=_0x1b2f5b,_0x4e4b1d[_0x3fd058(0x2d3)]-=_0x1b2f5b;}else{const _0x241439=VisuMZ[_0x3fd058(0x1bf)][_0x3fd058(0x5af)]['QoL'][_0x3fd058(0x250)];if(_0x241439>0x0)$gameTemp[_0x3fd058(0x794)](_0x241439);}}},DataManager['reserveNewGameCommonEvent']=function(){const _0x58ae2e=_0x3b4dfd,_0x34c333=VisuMZ[_0x58ae2e(0x1bf)][_0x58ae2e(0x5af)][_0x58ae2e(0x38a)]['NewGameCommonEventAll']||0x0;if(_0x34c333>0x0)$gameTemp['reserveCommonEvent'](_0x34c333);},DataManager[_0x3b4dfd(0x4ca)]=function(_0x3bcb09){const _0x202121=_0x3b4dfd,_0x19942d=$dataTroops[_0x3bcb09];if(!_0x19942d)return'';let _0x4a1a0b='';_0x4a1a0b+=_0x19942d['name'];for(const _0x3d3110 of _0x19942d['pages']){for(const _0x3cab37 of _0x3d3110[_0x202121(0x24e)]){[0x6c,0x198][_0x202121(0x5e6)](_0x3cab37[_0x202121(0x4e3)])&&(_0x4a1a0b+='\x0a',_0x4a1a0b+=_0x3cab37[_0x202121(0x74b)][0x0]);}}return _0x4a1a0b;};(VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5af)][_0x3b4dfd(0x38a)][_0x3b4dfd(0x993)]??!![])&&($scene=null,VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x53a)]=Scene_Base['prototype'][_0x3b4dfd(0x9bd)],Scene_Base['prototype'][_0x3b4dfd(0x9bd)]=function(){const _0x58ef67=_0x3b4dfd;VisuMZ['CoreEngine'][_0x58ef67(0x53a)][_0x58ef67(0x68e)](this),$scene=this;},$spriteset=null,VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x4c4)]=Scene_Map[_0x3b4dfd(0x396)]['createSpriteset'],Scene_Map['prototype']['createSpriteset']=function(){const _0x1f55f5=_0x3b4dfd;VisuMZ[_0x1f55f5(0x1bf)][_0x1f55f5(0x4c4)][_0x1f55f5(0x68e)](this),$spriteset=this[_0x1f55f5(0x8c9)];},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x9b1)]=Scene_Battle[_0x3b4dfd(0x396)]['createSpriteset'],Scene_Battle['prototype'][_0x3b4dfd(0x3ee)]=function(){const _0x48d648=_0x3b4dfd;VisuMZ[_0x48d648(0x1bf)][_0x48d648(0x9b1)][_0x48d648(0x68e)](this),$spriteset=this[_0x48d648(0x8c9)];},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x960)]=Scene_Base['prototype']['terminate'],Scene_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x5c5)]=function(){const _0x284590=_0x3b4dfd;VisuMZ['CoreEngine']['Scene_Base_terminate'][_0x284590(0x68e)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x431)]=BattleManager[_0x3b4dfd(0x933)],BattleManager[_0x3b4dfd(0x933)]=function(_0x607e62){const _0x2c21fa=_0x3b4dfd;VisuMZ['CoreEngine'][_0x2c21fa(0x431)][_0x2c21fa(0x68e)](this,_0x607e62),$subject=this[_0x2c21fa(0x9b0)],$targets=this[_0x2c21fa(0x92f)],$target=this[_0x2c21fa(0x7de)]||this[_0x2c21fa(0x92f)][0x0];},$event=null,VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x744)]=Game_Event[_0x3b4dfd(0x396)][_0x3b4dfd(0x21f)],Game_Event[_0x3b4dfd(0x396)]['start']=function(){const _0x5b29ec=_0x3b4dfd;VisuMZ[_0x5b29ec(0x1bf)][_0x5b29ec(0x744)][_0x5b29ec(0x68e)](this),$event=this;},VisuMZ['CoreEngine'][_0x3b4dfd(0x913)]=Scene_Map[_0x3b4dfd(0x396)][_0x3b4dfd(0x933)],Scene_Map[_0x3b4dfd(0x396)][_0x3b4dfd(0x933)]=function(){const _0x3a7751=_0x3b4dfd;VisuMZ[_0x3a7751(0x1bf)][_0x3a7751(0x913)][_0x3a7751(0x68e)](this),$gameMap['updateCurrentEvent']();},Game_Map[_0x3b4dfd(0x396)][_0x3b4dfd(0xa1c)]=function(){const _0x3a38ea=_0x3b4dfd;!this[_0x3a38ea(0x95a)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x2dd700){const _0x1e10a4=_0x3b4dfd;if($gameTemp)$gameTemp[_0x1e10a4(0x794)](_0x2dd700);},$onceParallel=function(_0x199b25){const _0x5a4f3f=_0x3b4dfd;if(SceneManager[_0x5a4f3f(0x645)]()){if(_0x5a4f3f(0x797)!==_0x5a4f3f(0x6aa))$scene[_0x5a4f3f(0x567)](_0x199b25);else{const _0x12c0d2=this[_0x5a4f3f(0x720)](),_0x2cbe10=this[_0x5a4f3f(0x948)][_0x5a4f3f(0x3b0)](_0x518966),_0x298151=_0x2cbe10-this[_0x5a4f3f(0x202)][_0x5a4f3f(0x3b0)](_0x57469f);this[_0x5a4f3f(0x78a)](_0x401a6a['paramchangeTextColor'](_0x298151)),this[_0x5a4f3f(0x686)](this['_tempActor'][_0x5a4f3f(0x3b0)](_0x332329,!![]),_0x39118d,_0x3c483c,_0x12c0d2,'right');}}else{if(SceneManager[_0x5a4f3f(0x717)]()){if(_0x5a4f3f(0x1b1)!=='ImYQT'){if(Imported['VisuMZ_1_BattleCore'])'FAjgJ'===_0x5a4f3f(0x714)?this[_0x5a4f3f(0x7b6)][_0x5a4f3f(0x3f2)](_0x5b1ad6[_0x5a4f3f(0x630)][_0x5a4f3f(0x848)]):$scene['playOnceParallelInterpreter'](_0x199b25);else $gameTemp&&$gameTemp[_0x5a4f3f(0x821)]()&&alert(_0x5a4f3f(0x262));}else return;}else $gameTemp&&$gameTemp[_0x5a4f3f(0x821)]()&&alert(_0x5a4f3f(0x8a1));}});;StorageManager[_0x3b4dfd(0x88b)]=function(_0x47ce1f){return new Promise((_0x4420df,_0x45b56e)=>{const _0x22d1df=_0x3b79;try{const _0x537547=pako['deflate'](_0x47ce1f,{'to':_0x22d1df(0x9b2),'level':0x1});if(_0x537547[_0x22d1df(0xa16)]>=0xc350){}_0x4420df(_0x537547);}catch(_0xd5254c){_0x45b56e(_0xd5254c);}});},TextManager[_0x3b4dfd(0x31c)]=['','','','CANCEL','','','HELP','',_0x3b4dfd(0x37c),_0x3b4dfd(0x910),'','',_0x3b4dfd(0x502),_0x3b4dfd(0x55e),'ENTER_SPECIAL','',_0x3b4dfd(0x2ca),_0x3b4dfd(0x32e),_0x3b4dfd(0x308),_0x3b4dfd(0x459),_0x3b4dfd(0x77a),_0x3b4dfd(0x8dc),_0x3b4dfd(0x523),_0x3b4dfd(0x8eb),_0x3b4dfd(0x825),_0x3b4dfd(0x1fd),'',_0x3b4dfd(0x629),_0x3b4dfd(0x75c),_0x3b4dfd(0x499),'ACCEPT','MODECHANGE',_0x3b4dfd(0x231),_0x3b4dfd(0x998),_0x3b4dfd(0x9f2),_0x3b4dfd(0x67c),_0x3b4dfd(0x87d),_0x3b4dfd(0x594),'UP',_0x3b4dfd(0x75a),_0x3b4dfd(0x919),'SELECT',_0x3b4dfd(0x98e),'EXECUTE',_0x3b4dfd(0x7a9),_0x3b4dfd(0x490),_0x3b4dfd(0x4d2),'','0','1','2','3','4','5','6','7','8','9',_0x3b4dfd(0x1d3),_0x3b4dfd(0x5a3),_0x3b4dfd(0x29b),_0x3b4dfd(0x97e),_0x3b4dfd(0x24f),'QUESTION_MARK','AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x3b4dfd(0x972),'',_0x3b4dfd(0x215),'','SLEEP',_0x3b4dfd(0x563),_0x3b4dfd(0x65b),_0x3b4dfd(0x917),_0x3b4dfd(0x415),_0x3b4dfd(0x241),_0x3b4dfd(0x95e),'NUMPAD6',_0x3b4dfd(0x6f7),_0x3b4dfd(0x916),_0x3b4dfd(0x4d8),_0x3b4dfd(0x1df),_0x3b4dfd(0x2a0),_0x3b4dfd(0x730),_0x3b4dfd(0x59d),_0x3b4dfd(0x727),_0x3b4dfd(0x27a),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x3b4dfd(0x3d2),_0x3b4dfd(0x5d7),_0x3b4dfd(0x729),'F13',_0x3b4dfd(0x749),_0x3b4dfd(0x870),'F16','F17',_0x3b4dfd(0x4c6),_0x3b4dfd(0x1d1),_0x3b4dfd(0x70e),_0x3b4dfd(0x343),_0x3b4dfd(0x21d),_0x3b4dfd(0x617),'F24','','','','','','','','','NUM_LOCK',_0x3b4dfd(0x2de),_0x3b4dfd(0x582),'WIN_OEM_FJ_MASSHOU',_0x3b4dfd(0x4b9),_0x3b4dfd(0x8bc),_0x3b4dfd(0x6d9),'','','','','','','','','','CIRCUMFLEX','EXCLAMATION',_0x3b4dfd(0x583),_0x3b4dfd(0x51b),_0x3b4dfd(0x3af),_0x3b4dfd(0x1a8),'AMPERSAND','UNDERSCORE',_0x3b4dfd(0x432),_0x3b4dfd(0x669),'ASTERISK','PLUS',_0x3b4dfd(0x4a8),_0x3b4dfd(0xa25),_0x3b4dfd(0x4dc),_0x3b4dfd(0x63b),_0x3b4dfd(0x94f),'','','','',_0x3b4dfd(0x48c),_0x3b4dfd(0x6f4),_0x3b4dfd(0x5d6),'','',_0x3b4dfd(0x5a3),_0x3b4dfd(0x97e),_0x3b4dfd(0x715),_0x3b4dfd(0x4cf),'PERIOD',_0x3b4dfd(0x57f),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x3b4dfd(0x97a),'BACK_SLASH',_0x3b4dfd(0x928),_0x3b4dfd(0x5d9),'',_0x3b4dfd(0x602),'ALTGR','','WIN_ICO_HELP',_0x3b4dfd(0x229),'',_0x3b4dfd(0x398),'','',_0x3b4dfd(0x938),_0x3b4dfd(0x53c),_0x3b4dfd(0x46f),_0x3b4dfd(0x24d),'WIN_OEM_PA3',_0x3b4dfd(0x894),_0x3b4dfd(0x43f),_0x3b4dfd(0x76c),_0x3b4dfd(0x39c),'WIN_OEM_COPY',_0x3b4dfd(0x609),_0x3b4dfd(0x803),_0x3b4dfd(0x3b6),_0x3b4dfd(0x287),_0x3b4dfd(0xa00),'EXSEL',_0x3b4dfd(0x1cf),_0x3b4dfd(0x478),_0x3b4dfd(0x2f1),'',_0x3b4dfd(0x331),'WIN_OEM_CLEAR',''],TextManager[_0x3b4dfd(0x726)]=VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5af)][_0x3b4dfd(0x3da)][_0x3b4dfd(0x69f)],TextManager['buttonAssistCancel']=VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5af)][_0x3b4dfd(0x3da)][_0x3b4dfd(0x4a2)],TextManager[_0x3b4dfd(0xa19)]=VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5af)][_0x3b4dfd(0x3da)]['SwitchActorText'],VisuMZ['CoreEngine'][_0x3b4dfd(0x530)]=TextManager[_0x3b4dfd(0x4db)],TextManager['param']=function(_0x11972a){const _0x3a620d=_0x3b4dfd;if(typeof _0x11972a===_0x3a620d(0x2ec)){if(_0x3a620d(0x5ac)===_0x3a620d(0x5ac))return VisuMZ[_0x3a620d(0x1bf)][_0x3a620d(0x530)]['call'](this,_0x11972a);else{if(this[_0x3a620d(0x1da)]<=0x0)return;const _0x17bd82=this[_0x3a620d(0x1da)],_0x1b3056=this[_0x3a620d(0x561)],_0x3fd19f=this['_moveEasingType'];this[_0x3a620d(0x713)]=this[_0x3a620d(0x3cd)](this[_0x3a620d(0x713)],this[_0x3a620d(0x369)],_0x17bd82,_0x1b3056,_0x3fd19f),this['_offsetY']=this[_0x3a620d(0x3cd)](this[_0x3a620d(0xa0a)],this[_0x3a620d(0x68a)],_0x17bd82,_0x1b3056,_0x3fd19f),this[_0x3a620d(0x1da)]--;if(this[_0x3a620d(0x1da)]<=0x0)this[_0x3a620d(0x4f8)]();}}else return this[_0x3a620d(0x4ad)](_0x11972a);},TextManager[_0x3b4dfd(0x4ad)]=function(_0x219c1c){const _0x5e4c5d=_0x3b4dfd;_0x219c1c=String(_0x219c1c||'')[_0x5e4c5d(0x33f)]();const _0x23dad7=VisuMZ[_0x5e4c5d(0x1bf)][_0x5e4c5d(0x5af)]['Param'];if(_0x219c1c===_0x5e4c5d(0x332))return $dataSystem['terms'][_0x5e4c5d(0x1f4)][0x0];if(_0x219c1c==='MAXMP')return $dataSystem[_0x5e4c5d(0x7e8)][_0x5e4c5d(0x1f4)][0x1];if(_0x219c1c===_0x5e4c5d(0x1d7))return $dataSystem['terms'][_0x5e4c5d(0x1f4)][0x2];if(_0x219c1c===_0x5e4c5d(0x9b3))return $dataSystem['terms'][_0x5e4c5d(0x1f4)][0x3];if(_0x219c1c===_0x5e4c5d(0x275))return $dataSystem['terms'][_0x5e4c5d(0x1f4)][0x4];if(_0x219c1c===_0x5e4c5d(0x832))return $dataSystem['terms'][_0x5e4c5d(0x1f4)][0x5];if(_0x219c1c==='AGI')return $dataSystem[_0x5e4c5d(0x7e8)][_0x5e4c5d(0x1f4)][0x6];if(_0x219c1c===_0x5e4c5d(0x238))return $dataSystem[_0x5e4c5d(0x7e8)][_0x5e4c5d(0x1f4)][0x7];if(_0x219c1c===_0x5e4c5d(0x655))return _0x23dad7[_0x5e4c5d(0x74d)];if(_0x219c1c===_0x5e4c5d(0x4ae))return _0x23dad7[_0x5e4c5d(0x2c1)];if(_0x219c1c===_0x5e4c5d(0x5bd))return _0x23dad7[_0x5e4c5d(0x21b)];if(_0x219c1c===_0x5e4c5d(0x342))return _0x23dad7[_0x5e4c5d(0x477)];if(_0x219c1c===_0x5e4c5d(0x3f4))return _0x23dad7[_0x5e4c5d(0xa13)];if(_0x219c1c==='MRF')return _0x23dad7['XParamVocab5'];if(_0x219c1c===_0x5e4c5d(0x8f5))return _0x23dad7['XParamVocab6'];if(_0x219c1c==='HRG')return _0x23dad7['XParamVocab7'];if(_0x219c1c===_0x5e4c5d(0x7c3))return _0x23dad7[_0x5e4c5d(0x657)];if(_0x219c1c==='TRG')return _0x23dad7[_0x5e4c5d(0x383)];if(_0x219c1c==='TGR')return _0x23dad7['SParamVocab0'];if(_0x219c1c===_0x5e4c5d(0x24a))return _0x23dad7[_0x5e4c5d(0x2d6)];if(_0x219c1c===_0x5e4c5d(0x65f))return _0x23dad7[_0x5e4c5d(0x2e4)];if(_0x219c1c===_0x5e4c5d(0x5e9))return _0x23dad7['SParamVocab3'];if(_0x219c1c==='MCR')return _0x23dad7['SParamVocab4'];if(_0x219c1c===_0x5e4c5d(0x278))return _0x23dad7['SParamVocab5'];if(_0x219c1c===_0x5e4c5d(0x4c7))return _0x23dad7[_0x5e4c5d(0x36c)];if(_0x219c1c==='MDR')return _0x23dad7[_0x5e4c5d(0x683)];if(_0x219c1c===_0x5e4c5d(0x98a))return _0x23dad7[_0x5e4c5d(0x600)];if(_0x219c1c===_0x5e4c5d(0x3f3))return _0x23dad7[_0x5e4c5d(0x468)];if(VisuMZ[_0x5e4c5d(0x1bf)]['CustomParamNames'][_0x219c1c])return _0x5e4c5d(0x654)!==_0x5e4c5d(0x269)?VisuMZ[_0x5e4c5d(0x1bf)][_0x5e4c5d(0x534)][_0x219c1c]:_0x2e927f[_0x5e4c5d(0x1bf)][_0x5e4c5d(0x61d)][_0x5e4c5d(0x68e)](this);return'';},TextManager[_0x3b4dfd(0x6ef)]=function(_0x3baa6d){const _0x26fe58=_0x3b4dfd,_0x592280=Input['getLastUsedGamepadType']();if(_0x592280===_0x26fe58(0x865)){if(_0x26fe58(0x57d)!==_0x26fe58(0x57d))this['_pictureName']&&this[_0x26fe58(0x9d4)]['match'](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x26fe58(0x638)](_0x2cf106(_0x4868f2['$1'])):_0x24e614['CoreEngine'][_0x26fe58(0x500)][_0x26fe58(0x68e)](this);else return this[_0x26fe58(0x932)](_0x3baa6d);}else{if(_0x26fe58(0x311)!==_0x26fe58(0x4ac))return this['getControllerInputButtonString'](_0x592280,_0x3baa6d);else for(const _0x46e0be in _0x36745a){const _0x17cc11=_0x3add63[_0x46e0be];_0x17cc11[_0x26fe58(0x926)]['match'](/(.*)\/(.*)/i)&&(_0x17cc11[_0x26fe58(0x926)]=_0x57fc18(_0x307812['$2'][_0x26fe58(0x58b)]()));}}},TextManager[_0x3b4dfd(0x932)]=function(_0x58bb8d){const _0x43a913=_0x3b4dfd;if(_0x58bb8d===_0x43a913(0x4cc))_0x58bb8d=_0x43a913(0x90e);if(_0x58bb8d===_0x43a913(0x9a4))_0x58bb8d=_0x43a913(0x90e);let _0x232485=[];for(let _0x461df0 in Input[_0x43a913(0x1e9)]){if(_0x43a913(0x776)!==_0x43a913(0x776)){const _0x58fc24=_0x43a913(0x837);this[_0x43a913(0x5d4)]=this[_0x43a913(0x5d4)]||{};if(this[_0x43a913(0x5d4)][_0x58fc24])return this['_colorCache'][_0x58fc24];const _0x57c933=_0x6efdcf[_0x43a913(0x1bf)][_0x43a913(0x5af)]['Color'][_0x43a913(0x197)];return this[_0x43a913(0x9df)](_0x58fc24,_0x57c933);}else{_0x461df0=Number(_0x461df0);if(_0x461df0>=0x60&&_0x461df0<=0x69)continue;if([0x12,0x20][_0x43a913(0x5e6)](_0x461df0))continue;_0x58bb8d===Input[_0x43a913(0x1e9)][_0x461df0]&&_0x232485[_0x43a913(0x297)](_0x461df0);}}for(let _0x847660=0x0;_0x847660<_0x232485[_0x43a913(0xa16)];_0x847660++){_0x232485[_0x847660]=TextManager['stringKeyMap'][_0x232485[_0x847660]];}return this[_0x43a913(0x404)](_0x232485);},TextManager[_0x3b4dfd(0x404)]=function(_0x59e535){const _0x1e9fed=_0x3b4dfd,_0x2e3174=VisuMZ[_0x1e9fed(0x1bf)][_0x1e9fed(0x5af)]['ButtonAssist'],_0x57cfc5=_0x2e3174['KeyUnlisted'],_0xbdae4=_0x59e535['pop'](),_0x47fabd=_0x1e9fed(0x1e4)[_0x1e9fed(0x4f9)](_0xbdae4);return _0x2e3174[_0x47fabd]?_0x2e3174[_0x47fabd]:_0x57cfc5[_0x1e9fed(0x4f9)](_0xbdae4);},TextManager['getInputMultiButtonStrings']=function(_0x17e2e1,_0x1c306c){const _0x249e62=_0x3b4dfd,_0x5d109b=VisuMZ['CoreEngine']['Settings'][_0x249e62(0x3da)],_0x3bd016=_0x5d109b['MultiKeyFmt'],_0x41ad16=this['getInputButtonString'](_0x17e2e1),_0x18f5e9=this[_0x249e62(0x6ef)](_0x1c306c);return _0x3bd016[_0x249e62(0x4f9)](_0x41ad16,_0x18f5e9);},TextManager[_0x3b4dfd(0x7aa)]=function(_0x2fab57,_0x37a873){const _0x51d6bd=_0x3b4dfd,_0x22d7c8=_0x2fab57[_0x51d6bd(0x1ea)]()[_0x51d6bd(0x58b)](),_0xfa6750=VisuMZ[_0x51d6bd(0x1bf)][_0x51d6bd(0x9a3)][_0x22d7c8];if(!_0xfa6750)return this[_0x51d6bd(0x3cb)](_0x2fab57,_0x37a873);return _0xfa6750[_0x37a873]||this[_0x51d6bd(0x932)](_0x2fab57,_0x37a873);},TextManager[_0x3b4dfd(0x3cb)]=function(_0x330c22,_0x445868){const _0x4419ef=_0x3b4dfd,_0xdc03c5=_0x330c22[_0x4419ef(0x1ea)]()[_0x4419ef(0x58b)]();for(const _0x4f3d5d in VisuMZ[_0x4419ef(0x1bf)][_0x4419ef(0x376)]){if(_0xdc03c5['includes'](_0x4f3d5d)){const _0x34fefa=VisuMZ['CoreEngine'][_0x4419ef(0x376)][_0x4f3d5d],_0x46f477=VisuMZ['CoreEngine'][_0x4419ef(0x9a3)][_0x34fefa];return _0x46f477[_0x445868]||this['getKeyboardInputButtonString'](_0x445868);}}return this[_0x4419ef(0x932)](_0x445868);},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x19f)]=ColorManager['loadWindowskin'],ColorManager[_0x3b4dfd(0x6c5)]=function(){const _0x39b345=_0x3b4dfd;VisuMZ[_0x39b345(0x1bf)][_0x39b345(0x19f)][_0x39b345(0x68e)](this),this[_0x39b345(0x5d4)]=this['_colorCache']||{};},ColorManager[_0x3b4dfd(0x9df)]=function(_0x2490b3,_0x4989b9){const _0x16b43b=_0x3b4dfd;_0x4989b9=String(_0x4989b9),this[_0x16b43b(0x5d4)]=this['_colorCache']||{};if(_0x4989b9[_0x16b43b(0x7b5)](/#(.*)/i)){if('MKAYZ'===_0x16b43b(0x47d))return _0x5a8197['PreserveNumbers'](_0x2c0866,'[',']');else this[_0x16b43b(0x5d4)][_0x2490b3]=_0x16b43b(0x1ca)[_0x16b43b(0x4f9)](String(RegExp['$1']));}else{if(_0x16b43b(0x790)===_0x16b43b(0x790))this['_colorCache'][_0x2490b3]=this[_0x16b43b(0x384)](Number(_0x4989b9));else return _0x1e210b['CoreEngine'][_0x16b43b(0x5af)][_0x16b43b(0x9f4)][_0x16b43b(0x336)][_0x16b43b(0x68e)](this,_0x15d190);}return this[_0x16b43b(0x5d4)][_0x2490b3];},ColorManager[_0x3b4dfd(0x9af)]=function(_0x4d2911){const _0x13e589=_0x3b4dfd;_0x4d2911=String(_0x4d2911);if(_0x4d2911[_0x13e589(0x7b5)](/#(.*)/i))return _0x13e589(0x1ca)['format'](String(RegExp['$1']));else{if(_0x13e589(0x3ba)===_0x13e589(0x256)){_0x46dcf0['CoreEngine'][_0x13e589(0x474)][_0x13e589(0x68e)](this);if(!_0x3c253d[_0x13e589(0x309)])return;const _0x16b84b=this[_0x13e589(0x8c9)];if(!_0x16b84b)return;this['_pictureContainer']=_0x16b84b['_pictureContainer'];if(!this[_0x13e589(0x566)])return;this[_0x13e589(0x2f6)](this['_pictureContainer']);}else return this[_0x13e589(0x384)](Number(_0x4d2911));}},ColorManager[_0x3b4dfd(0x99d)]=function(){const _0x4613cf=_0x3b4dfd;this[_0x4613cf(0x5d4)]={};},ColorManager[_0x3b4dfd(0x6de)]=function(){const _0x3b8af3=_0x3b4dfd,_0x585ef5='_stored_normalColor';this[_0x3b8af3(0x5d4)]=this['_colorCache']||{};if(this[_0x3b8af3(0x5d4)][_0x585ef5])return this['_colorCache'][_0x585ef5];const _0x16dfce=VisuMZ[_0x3b8af3(0x1bf)][_0x3b8af3(0x5af)][_0x3b8af3(0x9f4)]['ColorNormal'];return this['getColorDataFromPluginParameters'](_0x585ef5,_0x16dfce);},ColorManager[_0x3b4dfd(0x440)]=function(){const _0x1a6329=_0x3b4dfd,_0x14cd7=_0x1a6329(0x738);this[_0x1a6329(0x5d4)]=this[_0x1a6329(0x5d4)]||{};if(this[_0x1a6329(0x5d4)][_0x14cd7])return this[_0x1a6329(0x5d4)][_0x14cd7];const _0x5b3643=VisuMZ[_0x1a6329(0x1bf)][_0x1a6329(0x5af)]['Color'][_0x1a6329(0x7ef)];return this[_0x1a6329(0x9df)](_0x14cd7,_0x5b3643);},ColorManager['crisisColor']=function(){const _0x46af5b=_0x3b4dfd,_0x4de41f='_stored_crisisColor';this[_0x46af5b(0x5d4)]=this['_colorCache']||{};if(this['_colorCache'][_0x4de41f])return this['_colorCache'][_0x4de41f];const _0x115d79=VisuMZ[_0x46af5b(0x1bf)][_0x46af5b(0x5af)]['Color'][_0x46af5b(0x1d5)];return this[_0x46af5b(0x9df)](_0x4de41f,_0x115d79);},ColorManager[_0x3b4dfd(0x3a0)]=function(){const _0x4a23a9=_0x3b4dfd,_0x32fbad=_0x4a23a9(0x25d);this[_0x4a23a9(0x5d4)]=this[_0x4a23a9(0x5d4)]||{};if(this[_0x4a23a9(0x5d4)][_0x32fbad])return this[_0x4a23a9(0x5d4)][_0x32fbad];const _0x106e95=VisuMZ[_0x4a23a9(0x1bf)]['Settings'][_0x4a23a9(0x9f4)][_0x4a23a9(0x491)];return this[_0x4a23a9(0x9df)](_0x32fbad,_0x106e95);},ColorManager[_0x3b4dfd(0x54a)]=function(){const _0x5761cf=_0x3b4dfd,_0x389604=_0x5761cf(0x45e);this[_0x5761cf(0x5d4)]=this['_colorCache']||{};if(this[_0x5761cf(0x5d4)][_0x389604])return this['_colorCache'][_0x389604];const _0x568b66=VisuMZ[_0x5761cf(0x1bf)][_0x5761cf(0x5af)][_0x5761cf(0x9f4)][_0x5761cf(0x2e6)];return this[_0x5761cf(0x9df)](_0x389604,_0x568b66);},ColorManager[_0x3b4dfd(0x227)]=function(){const _0x25d4fe=_0x3b4dfd,_0x136246=_0x25d4fe(0xa18);this[_0x25d4fe(0x5d4)]=this[_0x25d4fe(0x5d4)]||{};if(this[_0x25d4fe(0x5d4)][_0x136246])return this[_0x25d4fe(0x5d4)][_0x136246];const _0x3445a2=VisuMZ[_0x25d4fe(0x1bf)][_0x25d4fe(0x5af)][_0x25d4fe(0x9f4)]['ColorHPGauge1'];return this[_0x25d4fe(0x9df)](_0x136246,_0x3445a2);},ColorManager[_0x3b4dfd(0x27d)]=function(){const _0x3cb808=_0x3b4dfd,_0x460eff='_stored_hpGaugeColor2';this[_0x3cb808(0x5d4)]=this[_0x3cb808(0x5d4)]||{};if(this[_0x3cb808(0x5d4)][_0x460eff])return this[_0x3cb808(0x5d4)][_0x460eff];const _0x143a52=VisuMZ['CoreEngine'][_0x3cb808(0x5af)][_0x3cb808(0x9f4)]['ColorHPGauge2'];return this[_0x3cb808(0x9df)](_0x460eff,_0x143a52);},ColorManager[_0x3b4dfd(0x514)]=function(){const _0x3d8cbc=_0x3b4dfd,_0x550a6c=_0x3d8cbc(0x77e);this['_colorCache']=this[_0x3d8cbc(0x5d4)]||{};if(this[_0x3d8cbc(0x5d4)][_0x550a6c])return this['_colorCache'][_0x550a6c];const _0x209b66=VisuMZ[_0x3d8cbc(0x1bf)]['Settings'][_0x3d8cbc(0x9f4)][_0x3d8cbc(0x895)];return this[_0x3d8cbc(0x9df)](_0x550a6c,_0x209b66);},ColorManager[_0x3b4dfd(0x1fa)]=function(){const _0x3baf8f=_0x3b4dfd,_0x4e5cab=_0x3baf8f(0x497);this[_0x3baf8f(0x5d4)]=this[_0x3baf8f(0x5d4)]||{};if(this[_0x3baf8f(0x5d4)][_0x4e5cab])return this[_0x3baf8f(0x5d4)][_0x4e5cab];const _0x1ebe4f=VisuMZ['CoreEngine'][_0x3baf8f(0x5af)][_0x3baf8f(0x9f4)][_0x3baf8f(0x5e5)];return this[_0x3baf8f(0x9df)](_0x4e5cab,_0x1ebe4f);},ColorManager[_0x3b4dfd(0x304)]=function(){const _0x251d4c=_0x3b4dfd,_0x14c4c5=_0x251d4c(0x659);this[_0x251d4c(0x5d4)]=this[_0x251d4c(0x5d4)]||{};if(this[_0x251d4c(0x5d4)][_0x14c4c5])return this[_0x251d4c(0x5d4)][_0x14c4c5];const _0xab5efe=VisuMZ[_0x251d4c(0x1bf)][_0x251d4c(0x5af)][_0x251d4c(0x9f4)][_0x251d4c(0x57c)];return this[_0x251d4c(0x9df)](_0x14c4c5,_0xab5efe);},ColorManager['powerUpColor']=function(){const _0x3017cc=_0x3b4dfd,_0x4cdb76=_0x3017cc(0x295);this[_0x3017cc(0x5d4)]=this[_0x3017cc(0x5d4)]||{};if(this[_0x3017cc(0x5d4)][_0x4cdb76])return this[_0x3017cc(0x5d4)][_0x4cdb76];const _0x32d1d8=VisuMZ['CoreEngine'][_0x3017cc(0x5af)][_0x3017cc(0x9f4)][_0x3017cc(0x72c)];return this[_0x3017cc(0x9df)](_0x4cdb76,_0x32d1d8);},ColorManager[_0x3b4dfd(0x3d8)]=function(){const _0x553813=_0x3b4dfd,_0xa4f73b=_0x553813(0x82c);this[_0x553813(0x5d4)]=this['_colorCache']||{};if(this[_0x553813(0x5d4)][_0xa4f73b])return this[_0x553813(0x5d4)][_0xa4f73b];const _0x49a9fd=VisuMZ[_0x553813(0x1bf)]['Settings'][_0x553813(0x9f4)][_0x553813(0x63f)];return this[_0x553813(0x9df)](_0xa4f73b,_0x49a9fd);},ColorManager[_0x3b4dfd(0x7e0)]=function(){const _0xcd965a=_0x3b4dfd,_0x36c3be=_0xcd965a(0x1e3);this['_colorCache']=this[_0xcd965a(0x5d4)]||{};if(this[_0xcd965a(0x5d4)][_0x36c3be])return this['_colorCache'][_0x36c3be];const _0x319e29=VisuMZ[_0xcd965a(0x1bf)][_0xcd965a(0x5af)]['Color'][_0xcd965a(0x923)];return this['getColorDataFromPluginParameters'](_0x36c3be,_0x319e29);},ColorManager[_0x3b4dfd(0x92c)]=function(){const _0x4900ed=_0x3b4dfd,_0x439487=_0x4900ed(0xa0b);this[_0x4900ed(0x5d4)]=this[_0x4900ed(0x5d4)]||{};if(this[_0x4900ed(0x5d4)][_0x439487])return this[_0x4900ed(0x5d4)][_0x439487];const _0x2fff20=VisuMZ['CoreEngine'][_0x4900ed(0x5af)][_0x4900ed(0x9f4)][_0x4900ed(0x813)];return this[_0x4900ed(0x9df)](_0x439487,_0x2fff20);},ColorManager[_0x3b4dfd(0x204)]=function(){const _0xf1988c=_0x3b4dfd,_0x1a95e8='_stored_tpGaugeColor1';this[_0xf1988c(0x5d4)]=this[_0xf1988c(0x5d4)]||{};if(this[_0xf1988c(0x5d4)][_0x1a95e8])return this[_0xf1988c(0x5d4)][_0x1a95e8];const _0x3662de=VisuMZ['CoreEngine'][_0xf1988c(0x5af)][_0xf1988c(0x9f4)][_0xf1988c(0x2f5)];return this[_0xf1988c(0x9df)](_0x1a95e8,_0x3662de);},ColorManager[_0x3b4dfd(0x357)]=function(){const _0x5d8199=_0x3b4dfd,_0x5d3a69='_stored_tpGaugeColor2';this[_0x5d8199(0x5d4)]=this[_0x5d8199(0x5d4)]||{};if(this[_0x5d8199(0x5d4)][_0x5d3a69])return this['_colorCache'][_0x5d3a69];const _0x1e8cb8=VisuMZ['CoreEngine'][_0x5d8199(0x5af)]['Color']['ColorTPGauge2'];return this['getColorDataFromPluginParameters'](_0x5d3a69,_0x1e8cb8);},ColorManager[_0x3b4dfd(0x40a)]=function(){const _0x1f2975=_0x3b4dfd,_0xcd3009=_0x1f2975(0x6d6);this[_0x1f2975(0x5d4)]=this[_0x1f2975(0x5d4)]||{};if(this[_0x1f2975(0x5d4)][_0xcd3009])return this['_colorCache'][_0xcd3009];const _0x59cd0a=VisuMZ[_0x1f2975(0x1bf)][_0x1f2975(0x5af)][_0x1f2975(0x9f4)]['ColorTPCost'];return this[_0x1f2975(0x9df)](_0xcd3009,_0x59cd0a);},ColorManager[_0x3b4dfd(0x506)]=function(){const _0x233c1b=_0x3b4dfd,_0x2a3952=_0x233c1b(0x2a1);this['_colorCache']=this[_0x233c1b(0x5d4)]||{};if(this[_0x233c1b(0x5d4)][_0x2a3952])return this[_0x233c1b(0x5d4)][_0x2a3952];const _0x4e7807=VisuMZ[_0x233c1b(0x1bf)][_0x233c1b(0x5af)][_0x233c1b(0x9f4)][_0x233c1b(0x388)];return this['getColorDataFromPluginParameters'](_0x2a3952,_0x4e7807);},ColorManager[_0x3b4dfd(0x1ab)]=function(){const _0x28bdc8=_0x3b4dfd,_0x4e3a94=_0x28bdc8(0x218);this[_0x28bdc8(0x5d4)]=this[_0x28bdc8(0x5d4)]||{};if(this[_0x28bdc8(0x5d4)][_0x4e3a94])return this[_0x28bdc8(0x5d4)][_0x4e3a94];const _0x4e1a77=VisuMZ[_0x28bdc8(0x1bf)][_0x28bdc8(0x5af)][_0x28bdc8(0x9f4)][_0x28bdc8(0x9c3)];return this[_0x28bdc8(0x9df)](_0x4e3a94,_0x4e1a77);},ColorManager['expGaugeColor2']=function(){const _0x46d2e2=_0x3b4dfd,_0x3e1bdf=_0x46d2e2(0x6e2);this['_colorCache']=this['_colorCache']||{};if(this[_0x46d2e2(0x5d4)][_0x3e1bdf])return this[_0x46d2e2(0x5d4)][_0x3e1bdf];const _0x4b1f8e=VisuMZ[_0x46d2e2(0x1bf)]['Settings'][_0x46d2e2(0x9f4)][_0x46d2e2(0x2f3)];return this[_0x46d2e2(0x9df)](_0x3e1bdf,_0x4b1f8e);},ColorManager[_0x3b4dfd(0x8c8)]=function(){const _0x3d88a5=_0x3b4dfd,_0x4e45d1='_stored_maxLvGaugeColor1';this[_0x3d88a5(0x5d4)]=this['_colorCache']||{};if(this[_0x3d88a5(0x5d4)][_0x4e45d1])return this[_0x3d88a5(0x5d4)][_0x4e45d1];const _0x1bdcb3=VisuMZ[_0x3d88a5(0x1bf)][_0x3d88a5(0x5af)][_0x3d88a5(0x9f4)][_0x3d88a5(0x2f2)];return this['getColorDataFromPluginParameters'](_0x4e45d1,_0x1bdcb3);},ColorManager[_0x3b4dfd(0x293)]=function(){const _0x262ace=_0x3b4dfd,_0x3e2444=_0x262ace(0x2ad);this[_0x262ace(0x5d4)]=this['_colorCache']||{};if(this[_0x262ace(0x5d4)][_0x3e2444])return this[_0x262ace(0x5d4)][_0x3e2444];const _0x5a328a=VisuMZ['CoreEngine'][_0x262ace(0x5af)][_0x262ace(0x9f4)][_0x262ace(0x8de)];return this[_0x262ace(0x9df)](_0x3e2444,_0x5a328a);},ColorManager[_0x3b4dfd(0x3c6)]=function(_0x25942c){const _0x5af057=_0x3b4dfd;return VisuMZ[_0x5af057(0x1bf)][_0x5af057(0x5af)][_0x5af057(0x9f4)][_0x5af057(0x2d2)][_0x5af057(0x68e)](this,_0x25942c);},ColorManager[_0x3b4dfd(0x403)]=function(_0x36972e){const _0x168fc5=_0x3b4dfd;return VisuMZ[_0x168fc5(0x1bf)][_0x168fc5(0x5af)][_0x168fc5(0x9f4)][_0x168fc5(0x336)][_0x168fc5(0x68e)](this,_0x36972e);},ColorManager[_0x3b4dfd(0x194)]=function(_0x338591){const _0x425c38=_0x3b4dfd;return VisuMZ[_0x425c38(0x1bf)][_0x425c38(0x5af)][_0x425c38(0x9f4)][_0x425c38(0x647)][_0x425c38(0x68e)](this,_0x338591);},ColorManager[_0x3b4dfd(0x417)]=function(_0x3e2d7f){const _0x546ec1=_0x3b4dfd;return VisuMZ[_0x546ec1(0x1bf)][_0x546ec1(0x5af)][_0x546ec1(0x9f4)][_0x546ec1(0x6fc)][_0x546ec1(0x68e)](this,_0x3e2d7f);},ColorManager['damageColor']=function(_0xfc3f4b){const _0xce26d8=_0x3b4dfd;return VisuMZ[_0xce26d8(0x1bf)][_0xce26d8(0x5af)][_0xce26d8(0x9f4)][_0xce26d8(0x224)][_0xce26d8(0x68e)](this,_0xfc3f4b);},ColorManager['outlineColor']=function(){const _0xe02104=_0x3b4dfd;return VisuMZ['CoreEngine'][_0xe02104(0x5af)][_0xe02104(0x9f4)][_0xe02104(0x7f5)];},ColorManager[_0x3b4dfd(0x5dd)]=function(){const _0xffadcb=_0x3b4dfd;return VisuMZ[_0xffadcb(0x1bf)][_0xffadcb(0x5af)]['Color'][_0xffadcb(0x6af)]||_0xffadcb(0x9cf);},ColorManager[_0x3b4dfd(0x303)]=function(){const _0x47f3ac=_0x3b4dfd;return VisuMZ[_0x47f3ac(0x1bf)][_0x47f3ac(0x5af)][_0x47f3ac(0x9f4)][_0x47f3ac(0x1e8)]||_0x47f3ac(0x1ae);},ColorManager[_0x3b4dfd(0x424)]=function(){const _0x3c2e72=_0x3b4dfd;return VisuMZ['CoreEngine']['Settings'][_0x3c2e72(0x9f4)][_0x3c2e72(0x5dc)];},ColorManager[_0x3b4dfd(0x687)]=function(){const _0x31932c=_0x3b4dfd;return VisuMZ[_0x31932c(0x1bf)]['Settings'][_0x31932c(0x9f4)][_0x31932c(0x879)];},ColorManager['itemBackColor1']=function(){const _0x6339f5=_0x3b4dfd;return VisuMZ[_0x6339f5(0x1bf)][_0x6339f5(0x5af)][_0x6339f5(0x9f4)][_0x6339f5(0x809)];},ColorManager['itemBackColor2']=function(){const _0x16eca5=_0x3b4dfd;return VisuMZ['CoreEngine'][_0x16eca5(0x5af)][_0x16eca5(0x9f4)][_0x16eca5(0x934)];},SceneManager[_0x3b4dfd(0x1b3)]=[],SceneManager[_0x3b4dfd(0x717)]=function(){return this['_scene']&&this['_scene']['constructor']===Scene_Battle;},SceneManager[_0x3b4dfd(0x645)]=function(){const _0x1983cc=_0x3b4dfd;return this[_0x1983cc(0x46a)]&&this[_0x1983cc(0x46a)][_0x1983cc(0x9dc)]===Scene_Map;},SceneManager[_0x3b4dfd(0x99f)]=function(){const _0x460d9c=_0x3b4dfd;return this[_0x460d9c(0x46a)]&&this[_0x460d9c(0x46a)]instanceof Scene_Map;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x512)]=SceneManager['initialize'],SceneManager[_0x3b4dfd(0x24b)]=function(){const _0xb0c845=_0x3b4dfd;VisuMZ[_0xb0c845(0x1bf)][_0xb0c845(0x512)][_0xb0c845(0x68e)](this),this['initVisuMZCoreEngine']();},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x347)]=SceneManager[_0x3b4dfd(0x6cb)],SceneManager[_0x3b4dfd(0x6cb)]=function(_0x2cc351){const _0x4a393d=_0x3b4dfd;if($gameTemp)this['onKeyDownKeysF6F7'](_0x2cc351);VisuMZ[_0x4a393d(0x1bf)][_0x4a393d(0x347)][_0x4a393d(0x68e)](this,_0x2cc351);},SceneManager['onKeyDownKeysF6F7']=function(_0x5c72a7){const _0x1c9f5c=_0x3b4dfd;if(!_0x5c72a7['ctrlKey']&&!_0x5c72a7[_0x1c9f5c(0xa1e)])switch(_0x5c72a7[_0x1c9f5c(0x8df)]){case 0x54:this[_0x1c9f5c(0xa31)]();break;case 0x75:this['playTestF6']();break;case 0x76:if(Input['isPressed'](_0x1c9f5c(0x5a7))||Input[_0x1c9f5c(0x33e)](_0x1c9f5c(0x745)))return;this[_0x1c9f5c(0x808)]();break;}},SceneManager[_0x3b4dfd(0x9dd)]=function(){const _0x2bab4e=_0x3b4dfd;if($gameTemp[_0x2bab4e(0x821)]()&&VisuMZ[_0x2bab4e(0x1bf)][_0x2bab4e(0x5af)][_0x2bab4e(0x38a)]['F6key']){if(ConfigManager[_0x2bab4e(0x183)]!==0x0)ConfigManager['bgmVolume']=0x0,ConfigManager[_0x2bab4e(0x536)]=0x0,ConfigManager[_0x2bab4e(0x40d)]=0x0,ConfigManager['seVolume']=0x0;else{if(_0x2bab4e(0x7fe)===_0x2bab4e(0x7fe))ConfigManager[_0x2bab4e(0x98d)]=0x64,ConfigManager[_0x2bab4e(0x536)]=0x64,ConfigManager[_0x2bab4e(0x40d)]=0x64,ConfigManager[_0x2bab4e(0x183)]=0x64;else return this[_0x2bab4e(0x9e3)]();}ConfigManager[_0x2bab4e(0x9ed)]();if(this[_0x2bab4e(0x46a)][_0x2bab4e(0x9dc)]===Scene_Options){if(this[_0x2bab4e(0x46a)][_0x2bab4e(0x325)])this[_0x2bab4e(0x46a)][_0x2bab4e(0x325)][_0x2bab4e(0x443)]();if(this[_0x2bab4e(0x46a)][_0x2bab4e(0x387)])this[_0x2bab4e(0x46a)][_0x2bab4e(0x387)][_0x2bab4e(0x443)]();}}},SceneManager[_0x3b4dfd(0x808)]=function(){const _0x5b654b=_0x3b4dfd;$gameTemp[_0x5b654b(0x821)]()&&VisuMZ[_0x5b654b(0x1bf)][_0x5b654b(0x5af)][_0x5b654b(0x38a)]['F7key']&&($gameTemp[_0x5b654b(0x709)]=!$gameTemp['_playTestFastMode']);},SceneManager[_0x3b4dfd(0xa31)]=function(){const _0x5ab075=_0x3b4dfd;if(!$gameTemp[_0x5ab075(0x821)]())return;if(!SceneManager['isSceneBattle']())return;for(const _0x2b3640 of $gameParty['members']()){if(!_0x2b3640)continue;_0x2b3640[_0x5ab075(0x99a)](_0x2b3640[_0x5ab075(0x437)]());}},SceneManager[_0x3b4dfd(0x7c0)]=function(){const _0x2d3869=_0x3b4dfd;this[_0x2d3869(0x9c9)]=![],this[_0x2d3869(0x786)]=!VisuMZ['CoreEngine']['Settings']['UI'][_0x2d3869(0x4d4)];},SceneManager[_0x3b4dfd(0x283)]=function(_0x3e2774){const _0x1cdf14=_0x3b4dfd;if(VisuMZ[_0x1cdf14(0x1bf)][_0x1cdf14(0x5af)]['UI']['SideButtons']){if(_0x1cdf14(0x1d4)===_0x1cdf14(0x1d4))this[_0x1cdf14(0x9c9)]=_0x3e2774;else{const _0x320f1f=_0x1cdf14(0x7d3);this[_0x1cdf14(0x5d4)]=this[_0x1cdf14(0x5d4)]||{};if(this[_0x1cdf14(0x5d4)][_0x320f1f])return this[_0x1cdf14(0x5d4)][_0x320f1f];const _0x3acdd0=_0x12a9d7[_0x1cdf14(0x1bf)]['Settings']['Color']['ColorHPGauge2'];return this[_0x1cdf14(0x9df)](_0x320f1f,_0x3acdd0);}}},SceneManager[_0x3b4dfd(0x18a)]=function(){const _0x29c72f=_0x3b4dfd;return this[_0x29c72f(0x9c9)];},SceneManager['areButtonsHidden']=function(){return this['_hideButtons'];},SceneManager[_0x3b4dfd(0x7f7)]=function(){const _0x4cff8a=_0x3b4dfd;return this[_0x4cff8a(0x943)]()||this[_0x4cff8a(0x18a)]();},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x62a)]=SceneManager['isGameActive'],SceneManager[_0x3b4dfd(0x1c8)]=function(){const _0x43c274=_0x3b4dfd;return VisuMZ[_0x43c274(0x1bf)]['Settings']['QoL'][_0x43c274(0x876)]?VisuMZ['CoreEngine'][_0x43c274(0x62a)][_0x43c274(0x68e)](this):!![];},SceneManager[_0x3b4dfd(0xa06)]=function(_0x4d4478){const _0x3366d3=_0x3b4dfd;if(_0x4d4478 instanceof Error){if(_0x3366d3(0x807)===_0x3366d3(0x465)){var _0x692379=_0x239019(_0x271dc9['$1']);_0xb4bdb9+=_0x692379;}else this['catchNormalError'](_0x4d4478);}else _0x4d4478 instanceof Array&&_0x4d4478[0x0]===_0x3366d3(0x495)?this[_0x3366d3(0x449)](_0x4d4478):this[_0x3366d3(0x2a6)](_0x4d4478);this['stop']();},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x61d)]=BattleManager[_0x3b4dfd(0x908)],BattleManager[_0x3b4dfd(0x908)]=function(){const _0x494588=_0x3b4dfd;if(VisuMZ['CoreEngine'][_0x494588(0x5af)][_0x494588(0x38a)][_0x494588(0x86d)]){if(_0x494588(0x464)===_0x494588(0x464))this[_0x494588(0x58d)]();else{this[_0x494588(0x2fe)][_0x494588(0x8b7)](_0x30740b),this['removeAnimationFromContainer'](_0x40cb44);for(const _0x76a189 of _0x203d94[_0x494588(0x8e7)]){_0x76a189['endAnimation']&&_0x76a189[_0x494588(0x3b2)]();}_0x3fba4e[_0x494588(0x86c)]();}}else return VisuMZ[_0x494588(0x1bf)]['BattleManager_processEscape']['call'](this);},BattleManager['processAlwaysEscape']=function(){const _0x3e3986=_0x3b4dfd;return $gameParty[_0x3e3986(0x901)](),SoundManager[_0x3e3986(0x88e)](),this[_0x3e3986(0x980)](),!![];},BattleManager[_0x3b4dfd(0x62f)]=function(){const _0x35b0a5=_0x3b4dfd;return $gameSystem[_0x35b0a5(0x20e)]()>=0x1;},BattleManager[_0x3b4dfd(0x9f0)]=function(){return $gameSystem['getBattleSystem']()===0x1;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x73d)]=Game_Temp[_0x3b4dfd(0x396)]['initialize'],Game_Temp['prototype']['initialize']=function(){const _0x1ad1eb=_0x3b4dfd;VisuMZ[_0x1ad1eb(0x1bf)][_0x1ad1eb(0x73d)]['call'](this),this[_0x1ad1eb(0x208)](),this[_0x1ad1eb(0x27f)](),this[_0x1ad1eb(0x210)]();},Game_Temp[_0x3b4dfd(0x396)]['forceOutOfPlaytest']=function(){const _0x29b348=_0x3b4dfd;VisuMZ[_0x29b348(0x1bf)]['Settings'][_0x29b348(0x38a)][_0x29b348(0x38b)]&&(this['_isPlaytest']=![]);},Game_Temp[_0x3b4dfd(0x396)][_0x3b4dfd(0x35e)]=function(_0x4bbb8a){const _0x44a0ab=_0x3b4dfd;this[_0x44a0ab(0x300)]=_0x4bbb8a;},Game_Temp[_0x3b4dfd(0x396)][_0x3b4dfd(0x5e2)]=function(){const _0x3bf915=_0x3b4dfd;return this[_0x3bf915(0x300)];},Game_Temp[_0x3b4dfd(0x396)][_0x3b4dfd(0x81c)]=function(){const _0x107ddb=_0x3b4dfd;this[_0x107ddb(0x3c4)]=undefined,this[_0x107ddb(0x30a)]=undefined;},Game_Temp[_0x3b4dfd(0x396)][_0x3b4dfd(0x54d)]=function(_0x430e1d){const _0x192ef8=_0x3b4dfd;$gameMap&&$dataMap&&$dataMap['note']&&this['parseForcedGameTroopSettingsCoreEngine']($dataMap[_0x192ef8(0x8e2)]);const _0x1a29fc=$dataTroops[_0x430e1d];if(_0x1a29fc){if('oDnaj'!==_0x192ef8(0x949)){let _0x30fb80=DataManager[_0x192ef8(0x4ca)](_0x1a29fc['id']);this[_0x192ef8(0x338)](_0x30fb80);}else this[_0x192ef8(0x98c)](_0x4663dc);}},Game_Temp[_0x3b4dfd(0x396)]['parseForcedGameTroopSettingsCoreEngine']=function(_0x573415){const _0x711b7c=_0x3b4dfd;if(!_0x573415)return;if(_0x573415[_0x711b7c(0x7b5)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x711b7c(0x3c4)]='FV';else{if(_0x573415[_0x711b7c(0x7b5)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i)){if(_0x711b7c(0x9de)===_0x711b7c(0x9de))this[_0x711b7c(0x3c4)]='SV';else return 0xc0;}else{if(_0x573415['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x711b7c(0x3a1)!=='SVnPW')_0x511591['update']();else{const _0x37ae43=String(RegExp['$1']);if(_0x37ae43[_0x711b7c(0x7b5)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))_0x711b7c(0x7a7)==='kbqhA'?this[_0x711b7c(0x3c4)]='FV':_0x4b0f70+=_0x5614cc(_0x357b0e);else _0x37ae43[_0x711b7c(0x7b5)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x711b7c(0x3c4)]='SV');}}}}if(_0x573415[_0x711b7c(0x7b5)](/<(?:DTB)>/i))'fxqDe'!==_0x711b7c(0x460)?this[_0x711b7c(0x30a)]=0x0:this[_0x711b7c(0x7bf)]();else{if(_0x573415['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i)){if(_0x711b7c(0x585)===_0x711b7c(0x5ca)){_0xb3f96d&&_0x172483&&_0x2ccadf[_0x711b7c(0x8e2)]&&this['parseForcedGameTroopSettingsCoreEngine'](_0x3a02fc[_0x711b7c(0x8e2)]);const _0x29d56f=_0x2a18f5[_0x5cd921];if(_0x29d56f){let _0x14a2d3=_0x5c787b[_0x711b7c(0x4ca)](_0x29d56f['id']);this[_0x711b7c(0x338)](_0x14a2d3);}}else this['_forcedBattleSys']=0x1;}else{if(_0x573415[_0x711b7c(0x7b5)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x711b7c(0x30a)]=0x2;else{if(_0x573415[_0x711b7c(0x7b5)](/<(?:CTB)>/i))_0x711b7c(0x6ed)===_0x711b7c(0x6ed)?Imported[_0x711b7c(0x2b4)]&&(this['_forcedBattleSys']='CTB'):_0x3aeb73+=_0x711b7c(0x266);else{if(_0x573415[_0x711b7c(0x7b5)](/<(?:STB)>/i)){if(_0x711b7c(0x360)===_0x711b7c(0x265))return this[_0x711b7c(0x877)];else Imported[_0x711b7c(0x271)]&&(this['_forcedBattleSys']='STB');}else{if(_0x573415[_0x711b7c(0x7b5)](/<(?:BTB)>/i))_0x711b7c(0x2a4)===_0x711b7c(0x7ac)?this['backOpacity']=_0xc19826[_0x711b7c(0x8b8)]():Imported[_0x711b7c(0x3f8)]&&(_0x711b7c(0x5c1)===_0x711b7c(0x5c1)?this[_0x711b7c(0x30a)]=_0x711b7c(0x318):(this[_0x711b7c(0x539)]=new _0x308581(_0x2034ff[_0x711b7c(0x76b)](_0x344929['BgFilename1'])),this[_0x711b7c(0x88c)]=new _0x3452b1(_0x49161a[_0x711b7c(0x6ee)](_0x57dd17[_0x711b7c(0x92d)])),this[_0x711b7c(0x2f6)](this[_0x711b7c(0x539)]),this[_0x711b7c(0x2f6)](this[_0x711b7c(0x88c)]),this['_backSprite1'][_0x711b7c(0x8ad)]['addLoadListener'](this[_0x711b7c(0x394)]['bind'](this,this[_0x711b7c(0x539)])),this[_0x711b7c(0x88c)][_0x711b7c(0x8ad)][_0x711b7c(0x88f)](this[_0x711b7c(0x394)][_0x711b7c(0x2bd)](this,this[_0x711b7c(0x88c)]))));else{if(_0x573415['match'](/<(?:FTB)>/i)){if(_0x711b7c(0x9d8)!==_0x711b7c(0x9d8)){_0x3cbb78[_0x711b7c(0x3b2)]&&_0x31a251[_0x711b7c(0x3b2)]();const _0x1cd7d4=this[_0x711b7c(0x85d)]();if(_0x1cd7d4)_0x1cd7d4['removeChild'](_0x170e23);}else Imported[_0x711b7c(0x2ce)]&&(this['_forcedBattleSys']=_0x711b7c(0x8b4));}else{if(_0x573415['match'](/<(?:OTB)>/i))Imported[_0x711b7c(0x6d0)]&&(this[_0x711b7c(0x30a)]='OTB');else{if(_0x573415[_0x711b7c(0x7b5)](/<(?:ETB)>/i)){if(_0x711b7c(0x6c9)==='SrgFM')return this['refresh']();else Imported['VisuMZ_2_BattleSystemETB']&&(this['_forcedBattleSys']=_0x711b7c(0x42a));}else{if(_0x573415[_0x711b7c(0x7b5)](/<(?:PTB)>/i)){if(_0x711b7c(0x525)!=='ltyty'){if(Imported[_0x711b7c(0x6c3)]){if('harqw'===_0x711b7c(0x6f6))return _0x3b2d00['buttonAssistSwitch'];else this[_0x711b7c(0x30a)]=_0x711b7c(0x70c);}}else this[_0x711b7c(0x5bb)]=!![];}else{if(_0x573415[_0x711b7c(0x7b5)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x2d8abc=String(RegExp['$1']);if(_0x2d8abc[_0x711b7c(0x7b5)](/DTB/i)){if(_0x711b7c(0x3db)===_0x711b7c(0x1b5)){if(!this[_0x711b7c(0x939)])return _0xede2e7;return _0x41dafa[_0x711b7c(0x511)](_0x507b1b,this['_coreEasing'][_0x711b7c(0x2fa)]||_0x711b7c(0x245));}else this[_0x711b7c(0x30a)]=0x0;}else{if(_0x2d8abc[_0x711b7c(0x7b5)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x711b7c(0x30a)]=0x1;else{if(_0x2d8abc[_0x711b7c(0x7b5)](/(?:TPB|ATB)[ ]WAIT/i)){if(_0x711b7c(0x528)!==_0x711b7c(0x689))this[_0x711b7c(0x30a)]=0x2;else{if(!this['showPointAnimations']())return;_0xde2322=_0x506579||![],_0x1cd91b=_0x2444c9||![];if(_0x5509e9[_0x590acc]){const _0x1f39cf={'x':_0x3298a3,'y':_0x51566b,'animationId':_0x3712b8,'mirror':_0x2f0967,'mute':_0x590415};this[_0x711b7c(0x47a)]['push'](_0x1f39cf);}}}else{if(_0x2d8abc['match'](/CTB/i)){if(_0x711b7c(0x74e)!==_0x711b7c(0x2a7))Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0x711b7c(0x30a)]=_0x711b7c(0x680));else return _0x46c2aa[_0x711b7c(0x1bf)][_0x711b7c(0x5af)][_0x711b7c(0x339)][_0x711b7c(0x7a2)][_0x711b7c(0xa16)];}else{if(_0x2d8abc[_0x711b7c(0x7b5)](/STB/i)){if(_0x711b7c(0x1b2)!==_0x711b7c(0x7f6))Imported['VisuMZ_2_BattleSystemSTB']&&('gEqee'===_0x711b7c(0x754)?this[_0x711b7c(0x30a)]=_0x711b7c(0x85a):(_0x47931c+=this[_0x711b7c(0x3ac)][_0x26d789][_0x711b7c(0x74b)][0x0]+'\x0a',_0x29d46c++));else for(const _0x1e6aeb of _0x1d7e57){this['createPointAnimationSprite']([_0x1e6aeb],_0x3fbd09,_0xf05b8e,_0x35017d,_0x194c12),_0x338fd5+=_0x25df77;}}else{if(_0x2d8abc[_0x711b7c(0x7b5)](/BTB/i))Imported[_0x711b7c(0x3f8)]&&(_0x711b7c(0x2dd)==='mtUjq'?this[_0x711b7c(0x30a)]='BTB':(this[_0x711b7c(0x3de)]=_0x3d49b2[_0x711b7c(0x8df)],_0x87b771['CoreEngine'][_0x711b7c(0x7b0)][_0x711b7c(0x68e)](this,_0x23765b),this[_0x711b7c(0x489)](null)));else{if(_0x2d8abc[_0x711b7c(0x7b5)](/FTB/i)){if('MeoFW'===_0x711b7c(0x79b))Imported[_0x711b7c(0x2ce)]&&(this[_0x711b7c(0x30a)]=_0x711b7c(0x8b4));else return _0x4c0056[_0x711b7c(0x630)]['SlotRect'][_0x711b7c(0x68e)](this);}else{if(_0x2d8abc['match'](/OTB/i))Imported[_0x711b7c(0x6d0)]&&(this['_forcedBattleSys']=_0x711b7c(0x8ea));else{if(_0x2d8abc[_0x711b7c(0x7b5)](/ETB/i))Imported[_0x711b7c(0x228)]&&(this[_0x711b7c(0x30a)]=_0x711b7c(0x42a));else _0x2d8abc[_0x711b7c(0x7b5)](/PTB/i)&&(Imported[_0x711b7c(0x6c3)]&&(this[_0x711b7c(0x30a)]='PTB'));}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x3b4dfd(0x396)][_0x3b4dfd(0x27f)]=function(){const _0x30dd7e=_0x3b4dfd;this[_0x30dd7e(0x898)]=[];},Game_Temp[_0x3b4dfd(0x396)][_0x3b4dfd(0x442)]=function(_0xee0abf,_0x3a89bf,_0x5b09cf,_0x443c2e){const _0x4f132b=_0x3b4dfd;if(!this[_0x4f132b(0x7bc)]())return;_0x5b09cf=_0x5b09cf||![],_0x443c2e=_0x443c2e||![];if($dataAnimations[_0x3a89bf]){if(_0x4f132b(0x1f5)!==_0x4f132b(0x2c9)){const _0x510afe={'targets':_0xee0abf,'animationId':_0x3a89bf,'mirror':_0x5b09cf,'mute':_0x443c2e};this[_0x4f132b(0x898)][_0x4f132b(0x297)](_0x510afe);for(const _0x4d5954 of _0xee0abf){_0x4d5954[_0x4f132b(0x3ea)]&&_0x4d5954[_0x4f132b(0x3ea)]();}}else try{_0x1f34c6[_0x4f132b(0x1bf)][_0x4f132b(0x2ba)][_0x4f132b(0x68e)](this,_0x26de41);}catch(_0x57523c){if(_0x4b3749[_0x4f132b(0x821)]())_0x518e74[_0x4f132b(0x862)](_0x57523c);}}},Game_Temp[_0x3b4dfd(0x396)][_0x3b4dfd(0x7bc)]=function(){return!![];},Game_Temp[_0x3b4dfd(0x396)][_0x3b4dfd(0x6fa)]=function(){const _0x393e31=_0x3b4dfd;return this[_0x393e31(0x898)]['shift']();},Game_Temp['prototype'][_0x3b4dfd(0x210)]=function(){const _0x49bd24=_0x3b4dfd;this[_0x49bd24(0x47a)]=[];},Game_Temp['prototype'][_0x3b4dfd(0x9e1)]=function(_0x16cf04,_0x2cc424,_0x1a34bf,_0x30ccb8,_0x15f64a){const _0x16e72f=_0x3b4dfd;if(!this[_0x16e72f(0x620)]())return;_0x30ccb8=_0x30ccb8||![],_0x15f64a=_0x15f64a||![];if($dataAnimations[_0x1a34bf]){const _0xeb612d={'x':_0x16cf04,'y':_0x2cc424,'animationId':_0x1a34bf,'mirror':_0x30ccb8,'mute':_0x15f64a};this[_0x16e72f(0x47a)][_0x16e72f(0x297)](_0xeb612d);}},Game_Temp[_0x3b4dfd(0x396)][_0x3b4dfd(0x620)]=function(){return!![];},Game_Temp[_0x3b4dfd(0x396)]['retrievePointAnimation']=function(){const _0x4f7778=_0x3b4dfd;return this[_0x4f7778(0x47a)][_0x4f7778(0x5a7)]();},VisuMZ[_0x3b4dfd(0x1bf)]['Game_System_initialize']=Game_System[_0x3b4dfd(0x396)][_0x3b4dfd(0x24b)],Game_System['prototype'][_0x3b4dfd(0x24b)]=function(){const _0x1377fa=_0x3b4dfd;VisuMZ[_0x1377fa(0x1bf)]['Game_System_initialize']['call'](this),this[_0x1377fa(0x6b8)]();},Game_System[_0x3b4dfd(0x396)][_0x3b4dfd(0x6b8)]=function(){const _0x32be50=_0x3b4dfd;this[_0x32be50(0x7c7)]={'SideView':$dataSystem['optSideView'],'BattleSystem':this[_0x32be50(0x90a)](),'FontSize':$dataSystem[_0x32be50(0x81e)][_0x32be50(0x6f8)],'Padding':0xc};},Game_System[_0x3b4dfd(0x396)][_0x3b4dfd(0x675)]=function(){const _0x21052c=_0x3b4dfd;if($gameTemp[_0x21052c(0x3c4)]==='SV')return!![];else{if($gameTemp[_0x21052c(0x3c4)]==='FV')return![];}if(this[_0x21052c(0x7c7)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x21052c(0xa1d)]===undefined)this['initCoreEngine']();return this[_0x21052c(0x7c7)]['SideView'];},Game_System['prototype'][_0x3b4dfd(0x6c0)]=function(_0x24ea59){const _0x527014=_0x3b4dfd;if(this[_0x527014(0x7c7)]===undefined)this[_0x527014(0x6b8)]();if(this[_0x527014(0x7c7)][_0x527014(0xa1d)]===undefined)this[_0x527014(0x6b8)]();this[_0x527014(0x7c7)][_0x527014(0xa1d)]=_0x24ea59;},Game_System['prototype'][_0x3b4dfd(0x766)]=function(){const _0x3d4b06=_0x3b4dfd;if(this[_0x3d4b06(0x7c7)]===undefined)this['initCoreEngine']();this[_0x3d4b06(0x7c7)]['BattleSystem']=this[_0x3d4b06(0x90a)]();},Game_System[_0x3b4dfd(0x396)][_0x3b4dfd(0x90a)]=function(){const _0x4bd368=_0x3b4dfd,_0x93c951=(VisuMZ[_0x4bd368(0x1bf)]['Settings'][_0x4bd368(0x3e8)]||_0x4bd368(0x697))[_0x4bd368(0x33f)]()[_0x4bd368(0x58b)]();return VisuMZ[_0x4bd368(0x1bf)]['CreateBattleSystemID'](_0x93c951);},Game_System['prototype']['getBattleSystem']=function(){const _0x587fb0=_0x3b4dfd;if($gameTemp[_0x587fb0(0x30a)]!==undefined)return $gameTemp[_0x587fb0(0x30a)];if(this[_0x587fb0(0x7c7)]===undefined)this[_0x587fb0(0x6b8)]();if(this[_0x587fb0(0x7c7)][_0x587fb0(0x3e8)]===undefined)this[_0x587fb0(0x766)]();return this[_0x587fb0(0x7c7)][_0x587fb0(0x3e8)];},Game_System[_0x3b4dfd(0x396)][_0x3b4dfd(0x328)]=function(_0x360099){const _0x2e5f12=_0x3b4dfd;if(this[_0x2e5f12(0x7c7)]===undefined)this[_0x2e5f12(0x6b8)]();if(this[_0x2e5f12(0x7c7)][_0x2e5f12(0x3e8)]===undefined)this[_0x2e5f12(0x766)]();this[_0x2e5f12(0x7c7)][_0x2e5f12(0x3e8)]=_0x360099;},Game_System[_0x3b4dfd(0x396)][_0x3b4dfd(0x3e0)]=function(){const _0x5f5e0b=_0x3b4dfd;if(this[_0x5f5e0b(0x7c7)]===undefined)this[_0x5f5e0b(0x6b8)]();if(this[_0x5f5e0b(0x7c7)][_0x5f5e0b(0x6e6)]===undefined)this[_0x5f5e0b(0x6b8)]();return this['_CoreEngineSettings'][_0x5f5e0b(0x6e6)];},Game_System['prototype'][_0x3b4dfd(0x1a4)]=function(_0x2fd85c){const _0x42a475=_0x3b4dfd;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x42a475(0x962)]===undefined)this[_0x42a475(0x6b8)]();this[_0x42a475(0x7c7)][_0x42a475(0x6e6)]=_0x2fd85c;},Game_System[_0x3b4dfd(0x396)]['windowPadding']=function(){const _0x21dee3=_0x3b4dfd;if(this[_0x21dee3(0x7c7)]===undefined)this[_0x21dee3(0x6b8)]();if(this[_0x21dee3(0x7c7)][_0x21dee3(0x7af)]===undefined)this[_0x21dee3(0x6b8)]();return this[_0x21dee3(0x7c7)][_0x21dee3(0x7af)];},Game_System['prototype'][_0x3b4dfd(0x8f2)]=function(_0x23f2df){const _0x3dfafc=_0x3b4dfd;if(this[_0x3dfafc(0x7c7)]===undefined)this[_0x3dfafc(0x6b8)]();if(this['_CoreEngineSettings'][_0x3dfafc(0x962)]===undefined)this[_0x3dfafc(0x6b8)]();this[_0x3dfafc(0x7c7)][_0x3dfafc(0x7af)]=_0x23f2df;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x9e8)]=Game_Screen[_0x3b4dfd(0x396)][_0x3b4dfd(0x24b)],Game_Screen[_0x3b4dfd(0x396)][_0x3b4dfd(0x24b)]=function(){const _0x365700=_0x3b4dfd;VisuMZ[_0x365700(0x1bf)][_0x365700(0x9e8)][_0x365700(0x68e)](this),this[_0x365700(0x1e2)]();},Game_Screen[_0x3b4dfd(0x396)][_0x3b4dfd(0x1e2)]=function(){const _0x47bdde=_0x3b4dfd,_0x59d19b=VisuMZ[_0x47bdde(0x1bf)]['Settings'][_0x47bdde(0x74f)];this['_coreEngineShakeStyle']=_0x59d19b?.[_0x47bdde(0x632)]||_0x47bdde(0x55f);},Game_Screen[_0x3b4dfd(0x396)][_0x3b4dfd(0x853)]=function(){const _0xad3551=_0x3b4dfd;if(this['_coreEngineShakeStyle']===undefined)this[_0xad3551(0x1e2)]();return this[_0xad3551(0xa12)];},Game_Screen[_0x3b4dfd(0x396)][_0x3b4dfd(0x9c6)]=function(_0x154ebd){const _0x689934=_0x3b4dfd;if(this[_0x689934(0xa12)]===undefined)this[_0x689934(0x1e2)]();this[_0x689934(0xa12)]=_0x154ebd[_0x689934(0x1ea)]()[_0x689934(0x58b)]();},Game_Picture['prototype']['isMapScrollLinked']=function(){const _0x58d1f2=_0x3b4dfd;if($gameParty['inBattle']())return![];return this[_0x58d1f2(0x926)]()&&this[_0x58d1f2(0x926)]()[_0x58d1f2(0x8ae)](0x0)==='!';},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x79d)]=Game_Picture[_0x3b4dfd(0x396)]['x'],Game_Picture[_0x3b4dfd(0x396)]['x']=function(){const _0x1c3c62=_0x3b4dfd;if(this[_0x1c3c62(0x6e3)]()){if(_0x1c3c62(0x458)!==_0x1c3c62(0x458)){var _0x404258=_0x3206f8(_0x94de73['$1'])/0x64;_0x11d128+=_0x404258;}else return this[_0x1c3c62(0x40c)]();}else return VisuMZ[_0x1c3c62(0x1bf)]['Game_Picture_x'][_0x1c3c62(0x68e)](this);},Game_Picture[_0x3b4dfd(0x396)][_0x3b4dfd(0x40c)]=function(){const _0x5c0c43=_0x3b4dfd,_0x15e104=$gameMap[_0x5c0c43(0x2dc)]()*$gameMap[_0x5c0c43(0x765)]();return(this['_x']-_0x15e104)*$gameScreen['zoomScale']();},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x42c)]=Game_Picture['prototype']['y'],Game_Picture[_0x3b4dfd(0x396)]['y']=function(){const _0x4f1106=_0x3b4dfd;if(this[_0x4f1106(0x6e3)]())return this[_0x4f1106(0x3ad)]();else{if(_0x4f1106(0x51d)===_0x4f1106(0x51d))return VisuMZ[_0x4f1106(0x1bf)]['Game_Picture_y'][_0x4f1106(0x68e)](this);else _0xc06303(_0x26fe2c);}},Game_Picture[_0x3b4dfd(0x396)]['yScrollLinkedOffset']=function(){const _0x4f4b84=_0x3b4dfd,_0x602787=$gameMap[_0x4f4b84(0x684)]()*$gameMap[_0x4f4b84(0x4e2)]();return(this['_y']-_0x602787)*$gameScreen['zoomScale']();},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x8f0)]=Game_Picture['prototype'][_0x3b4dfd(0x5ea)],Game_Picture['prototype'][_0x3b4dfd(0x5ea)]=function(){const _0x29db1c=_0x3b4dfd;let _0x25cb7f=VisuMZ[_0x29db1c(0x1bf)]['Game_Picture_scaleX'][_0x29db1c(0x68e)](this);return this['isMapScrollLinked']()&&(_0x25cb7f*=$gameScreen[_0x29db1c(0x1db)]()),_0x25cb7f;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x6e9)]=Game_Picture[_0x3b4dfd(0x396)][_0x3b4dfd(0x1e5)],Game_Picture[_0x3b4dfd(0x396)][_0x3b4dfd(0x1e5)]=function(){const _0xf511ef=_0x3b4dfd;let _0x2756d3=VisuMZ[_0xf511ef(0x1bf)][_0xf511ef(0x6e9)][_0xf511ef(0x68e)](this);if(this[_0xf511ef(0x6e3)]()){if(_0xf511ef(0x725)!==_0xf511ef(0x725)){if(this[_0xf511ef(0x96c)]===_0xf511ef(0x961))return;if(_0x487ad9[_0xf511ef(0x7d7)]())return;_0x1d05e8[_0xf511ef(0x1bf)]['Window_NameInput_cursorPageup'][_0xf511ef(0x68e)](this),this[_0xf511ef(0x2b1)](_0xf511ef(0x4aa));}else _0x2756d3*=$gameScreen['zoomScale']();}return _0x2756d3;},Game_Picture['prototype'][_0x3b4dfd(0x834)]=function(_0x1cd089){const _0x1582d6=_0x3b4dfd;this[_0x1582d6(0x767)]=_0x1cd089;},VisuMZ['CoreEngine'][_0x3b4dfd(0x351)]=Game_Picture['prototype']['calcEasing'],Game_Picture[_0x3b4dfd(0x396)][_0x3b4dfd(0x5bf)]=function(_0xef5d7a){const _0x1d2b55=_0x3b4dfd;return this[_0x1d2b55(0x767)]=this[_0x1d2b55(0x767)]||0x0,[0x0,0x1,0x2,0x3]['includes'](this[_0x1d2b55(0x767)])?VisuMZ['CoreEngine'][_0x1d2b55(0x351)][_0x1d2b55(0x68e)](this,_0xef5d7a):VisuMZ[_0x1d2b55(0x511)](_0xef5d7a,this['_coreEasingType']);},VisuMZ['CoreEngine']['Game_Action_itemHit']=Game_Action[_0x3b4dfd(0x396)][_0x3b4dfd(0x277)],Game_Action[_0x3b4dfd(0x396)][_0x3b4dfd(0x277)]=function(_0x3d55a0){const _0x353159=_0x3b4dfd;if(VisuMZ['CoreEngine'][_0x353159(0x5af)][_0x353159(0x38a)]['ImprovedAccuracySystem']){if('lalPD'!=='lalPD'){if(!_0x19fca6[_0x353159(0x46a)])return;if(!_0x1322b8['_scene'][_0x353159(0x8c9)])return;_0x46bfe7['ConvertParams'](_0x5d3639,_0x4f4cc9);const _0x8654e7=_0x30eed9[_0x353159(0x355)](_0x53f3e9[_0x353159(0x70d)]),_0x62cb26=_0x82a0d[_0x353159(0x355)](_0x404221['pointY']);_0x5f2114[_0x353159(0x9e1)](_0x8654e7,_0x62cb26,_0x4300ec[_0x353159(0x77d)],_0x102dd2[_0x353159(0x184)],_0x55136a[_0x353159(0x288)]);}else return this[_0x353159(0x8b0)](_0x3d55a0);}else return VisuMZ[_0x353159(0x1bf)][_0x353159(0x628)][_0x353159(0x68e)](this,_0x3d55a0);},Game_Action[_0x3b4dfd(0x396)][_0x3b4dfd(0x8b0)]=function(_0x2204d0){const _0xfbbff7=_0x3b4dfd,_0x9e0244=this[_0xfbbff7(0x91d)](_0x2204d0),_0x535309=this['subjectHitRate'](_0x2204d0),_0x53dd5d=this['targetEvaRate'](_0x2204d0);return _0x9e0244*(_0x535309-_0x53dd5d);},VisuMZ['CoreEngine']['Game_Action_itemEva']=Game_Action[_0x3b4dfd(0x396)][_0x3b4dfd(0x921)],Game_Action['prototype'][_0x3b4dfd(0x921)]=function(_0x151a78){const _0x332381=_0x3b4dfd;return VisuMZ[_0x332381(0x1bf)]['Settings'][_0x332381(0x38a)][_0x332381(0x200)]?_0x332381(0x270)==='CmqWV'?this[_0x332381(0x6eb)]()[_0x332381(0x35f)]+0.05:0x0:VisuMZ[_0x332381(0x1bf)][_0x332381(0x9c0)][_0x332381(0x68e)](this,_0x151a78);},Game_Action[_0x3b4dfd(0x396)][_0x3b4dfd(0x91d)]=function(_0x521997){const _0x24029e=_0x3b4dfd;return this[_0x24029e(0x82f)]()[_0x24029e(0x4f4)]*0.01;},Game_Action[_0x3b4dfd(0x396)]['subjectHitRate']=function(_0x39ed93){const _0x434582=_0x3b4dfd;if(VisuMZ[_0x434582(0x1bf)]['Settings']['QoL'][_0x434582(0x844)]&&this['isItem']())return 0x1;if(this[_0x434582(0x60d)]())return VisuMZ[_0x434582(0x1bf)][_0x434582(0x5af)]['QoL'][_0x434582(0x844)]&&this[_0x434582(0x6eb)]()[_0x434582(0x6d1)]()?this[_0x434582(0x6eb)]()['hit']+0.05:this[_0x434582(0x6eb)]()['hit'];else{if(_0x434582(0x814)!==_0x434582(0x814))_0x2c6832['VisuMZ_2_BattleSystemFTB']&&(this['_forcedBattleSys']=_0x434582(0x8b4));else return 0x1;}},Game_Action[_0x3b4dfd(0x396)][_0x3b4dfd(0x1d9)]=function(_0x3fe592){const _0xc527eb=_0x3b4dfd;if(this['subject']()[_0xc527eb(0x6d1)]()===_0x3fe592[_0xc527eb(0x6d1)]())return 0x0;if(this[_0xc527eb(0x60d)]()){if('AAOrH'===_0xc527eb(0x230))return VisuMZ[_0xc527eb(0x1bf)]['Settings'][_0xc527eb(0x38a)][_0xc527eb(0x844)]&&_0x3fe592[_0xc527eb(0x441)]()?_0x3fe592[_0xc527eb(0x188)]-0.05:_0x3fe592[_0xc527eb(0x188)];else this[_0xc527eb(0x30a)]=0x0;}else return this['isMagical']()?_0x3fe592['mev']:0x0;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x527)]=Game_Action[_0x3b4dfd(0x396)][_0x3b4dfd(0x47f)],Game_Action[_0x3b4dfd(0x396)][_0x3b4dfd(0x47f)]=function(_0xe47379){const _0x21b1b7=_0x3b4dfd;VisuMZ[_0x21b1b7(0x1bf)][_0x21b1b7(0x527)][_0x21b1b7(0x68e)](this,_0xe47379);if(VisuMZ[_0x21b1b7(0x1bf)][_0x21b1b7(0x5af)][_0x21b1b7(0x38a)][_0x21b1b7(0x200)])return;const _0x44d0e6=_0xe47379['result']();_0x44d0e6[_0x21b1b7(0x469)]&&(_0x21b1b7(0x54c)!==_0x21b1b7(0x98b)?0x1-this[_0x21b1b7(0x921)](_0xe47379)>this[_0x21b1b7(0x277)](_0xe47379)&&(_0x21b1b7(0x508)!=='JLWhP'?(_0x44d0e6[_0x21b1b7(0x469)]=![],_0x44d0e6[_0x21b1b7(0x4cb)]=!![]):_0x156e6e['CoreEngine'][_0x21b1b7(0x9ec)](_0x116675)):this[_0x21b1b7(0x30a)]=_0x21b1b7(0x8ea));},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x887)]=Game_BattlerBase[_0x3b4dfd(0x396)]['initMembers'],Game_BattlerBase[_0x3b4dfd(0x396)]['initMembers']=function(){const _0x3e1507=_0x3b4dfd;this[_0x3e1507(0x2a8)]={},VisuMZ[_0x3e1507(0x1bf)][_0x3e1507(0x887)][_0x3e1507(0x68e)](this);},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x997)]=Game_BattlerBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x443)],Game_BattlerBase[_0x3b4dfd(0x396)]['refresh']=function(){const _0x3b41e4=_0x3b4dfd;this['_cache']={},VisuMZ['CoreEngine'][_0x3b41e4(0x997)]['call'](this);},Game_BattlerBase[_0x3b4dfd(0x396)]['checkCacheKey']=function(_0x5ba20c){const _0x4bf04a=_0x3b4dfd;return this[_0x4bf04a(0x2a8)]=this[_0x4bf04a(0x2a8)]||{},this['_cache'][_0x5ba20c]!==undefined;},Game_BattlerBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x1a3)]=function(_0x101e63){const _0x37950f=_0x3b4dfd,_0x1e1af1=(_0x336d6b,_0x47cd9c)=>{const _0x53644c=_0x3b79;if(!_0x47cd9c)return _0x336d6b;if(_0x47cd9c['note']['match'](VisuMZ[_0x53644c(0x1bf)][_0x53644c(0x20c)][_0x53644c(0x1a3)][_0x101e63])){var _0x1868d5=Number(RegExp['$1']);_0x336d6b+=_0x1868d5;}if(_0x47cd9c[_0x53644c(0x8e2)][_0x53644c(0x7b5)](VisuMZ['CoreEngine'][_0x53644c(0x20c)][_0x53644c(0x423)][_0x101e63])){var _0x4ab8e9=String(RegExp['$1']);try{if(_0x53644c(0x871)!==_0x53644c(0x871))return this[_0x53644c(0x9ca)]&&this[_0x53644c(0x9ca)][_0x53644c(0xa11)]?_0x66e036[_0x53644c(0xa19)]:'';else _0x336d6b+=eval(_0x4ab8e9);}catch(_0x456b10){if($gameTemp[_0x53644c(0x821)]())console['log'](_0x456b10);}}return _0x336d6b;};return this['traitObjects']()[_0x37950f(0x8ef)](_0x1e1af1,this[_0x37950f(0x8e0)][_0x101e63]);},Game_BattlerBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x662)]=function(_0x196ab5){const _0x2c49eb=_0x3b4dfd;var _0x4f7cb7=_0x2c49eb(0x301)+(this[_0x2c49eb(0x6d1)]()?'Actor':_0x2c49eb(0x82e))+'ParamMax'+_0x196ab5;if(this['checkCacheKey'](_0x4f7cb7))return this['_cache'][_0x4f7cb7];this['_cache'][_0x4f7cb7]=eval(VisuMZ[_0x2c49eb(0x1bf)][_0x2c49eb(0x5af)]['Param'][_0x4f7cb7]);const _0x427e7f=(_0x46e5c1,_0x3e0e5f)=>{const _0x15056e=_0x2c49eb;if(!_0x3e0e5f)return _0x46e5c1;if(_0x3e0e5f[_0x15056e(0x8e2)][_0x15056e(0x7b5)](VisuMZ[_0x15056e(0x1bf)][_0x15056e(0x20c)][_0x15056e(0x662)][_0x196ab5])){if(_0x15056e(0x589)!==_0x15056e(0x8cb)){var _0x198de7=Number(RegExp['$1']);if(_0x198de7===0x0)_0x198de7=Number[_0x15056e(0x3a7)];_0x46e5c1=Math[_0x15056e(0x67b)](_0x46e5c1,_0x198de7);}else this[_0x15056e(0x68f)]=![];}if(_0x3e0e5f[_0x15056e(0x8e2)][_0x15056e(0x7b5)](VisuMZ['CoreEngine'][_0x15056e(0x20c)][_0x15056e(0x368)][_0x196ab5])){var _0x2f1404=String(RegExp['$1']);try{if(_0x15056e(0x592)==='OURHR'){_0x48e4fb['ConvertParams'](_0x301343,_0x2ec49e);const _0xf799f6=_0x2b4aa0[_0x15056e(0x355)](_0x4e5fa1[_0x15056e(0x93c)])[_0x15056e(0x1e1)](-0x64,0x64),_0x3dd0ab=_0x2ea163['_currentBgs'];_0x3dd0ab&&(_0x3dd0ab[_0x15056e(0x93c)]=_0xf799f6,_0xe48fd1[_0x15056e(0x5b3)](_0x3dd0ab));}else _0x46e5c1=Math['max'](_0x46e5c1,Number(eval(_0x2f1404)));}catch(_0x5344d6){if(_0x15056e(0x40b)!==_0x15056e(0x40b))return _0x412244[_0x15056e(0x9fc)]-this[_0x15056e(0x1c6)]();else{if($gameTemp[_0x15056e(0x821)]())console[_0x15056e(0x862)](_0x5344d6);}}}return _0x46e5c1;};if(this['_cache'][_0x4f7cb7]===0x0)this[_0x2c49eb(0x2a8)][_0x4f7cb7]=Number[_0x2c49eb(0x3a7)];return this[_0x2c49eb(0x2a8)][_0x4f7cb7]=this[_0x2c49eb(0x646)]()['reduce'](_0x427e7f,this[_0x2c49eb(0x2a8)][_0x4f7cb7]),this[_0x2c49eb(0x2a8)][_0x4f7cb7];},Game_BattlerBase[_0x3b4dfd(0x396)]['paramRate']=function(_0x560b9b){const _0x4628d3=_0x3b4dfd,_0x548f24=this[_0x4628d3(0x73a)](Game_BattlerBase['TRAIT_PARAM'],_0x560b9b),_0x426e1c=(_0x2b659a,_0x1eccd0)=>{const _0xbb210a=_0x4628d3;if(!_0x1eccd0)return _0x2b659a;if(_0x1eccd0[_0xbb210a(0x8e2)][_0xbb210a(0x7b5)](VisuMZ[_0xbb210a(0x1bf)][_0xbb210a(0x20c)]['paramRate1'][_0x560b9b])){var _0x4fa9e6=Number(RegExp['$1'])/0x64;_0x2b659a*=_0x4fa9e6;}if(_0x1eccd0[_0xbb210a(0x8e2)][_0xbb210a(0x7b5)](VisuMZ[_0xbb210a(0x1bf)][_0xbb210a(0x20c)]['paramRate2'][_0x560b9b])){var _0x4fa9e6=Number(RegExp['$1']);_0x2b659a*=_0x4fa9e6;}if(_0x1eccd0[_0xbb210a(0x8e2)][_0xbb210a(0x7b5)](VisuMZ['CoreEngine'][_0xbb210a(0x20c)][_0xbb210a(0x59e)][_0x560b9b])){var _0x19f830=String(RegExp['$1']);try{_0x2b659a*=eval(_0x19f830);}catch(_0xa270b9){if($gameTemp[_0xbb210a(0x821)]())console['log'](_0xa270b9);}}return _0x2b659a;};return this[_0x4628d3(0x646)]()['reduce'](_0x426e1c,_0x548f24);},Game_BattlerBase[_0x3b4dfd(0x396)]['paramFlatBonus']=function(_0x3353af){const _0x33e426=_0x3b4dfd,_0x275be3=(_0x469640,_0x3ca862)=>{const _0x2ac7f3=_0x3b79;if(!_0x3ca862)return _0x469640;if(_0x3ca862[_0x2ac7f3(0x8e2)][_0x2ac7f3(0x7b5)](VisuMZ[_0x2ac7f3(0x1bf)]['RegExp']['paramFlat'][_0x3353af])){if(_0x2ac7f3(0x753)===_0x2ac7f3(0x753)){var _0x56f038=Number(RegExp['$1']);_0x469640+=_0x56f038;}else this['_statusWindow'][_0x2ac7f3(0x3f2)](_0x36380a[_0x2ac7f3(0x630)][_0x2ac7f3(0x792)]);}if(_0x3ca862[_0x2ac7f3(0x8e2)]['match'](VisuMZ['CoreEngine']['RegExp']['paramFlatJS'][_0x3353af])){var _0x2a7a98=String(RegExp['$1']);try{_0x2ac7f3(0x84c)!==_0x2ac7f3(0x483)?_0x469640+=eval(_0x2a7a98):this['processTouchModernControls']();}catch(_0x31cb29){if($gameTemp[_0x2ac7f3(0x821)]())console[_0x2ac7f3(0x862)](_0x31cb29);}}return _0x469640;};return this['traitObjects']()[_0x33e426(0x8ef)](_0x275be3,0x0);},Game_BattlerBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x4db)]=function(_0x3b7926){const _0x46bb49=_0x3b4dfd;let _0x37cdfe=_0x46bb49(0x4db)+_0x3b7926+_0x46bb49(0x9c1);if(this[_0x46bb49(0x986)](_0x37cdfe))return this['_cache'][_0x37cdfe];return this[_0x46bb49(0x2a8)][_0x37cdfe]=Math['round'](VisuMZ['CoreEngine'][_0x46bb49(0x5af)][_0x46bb49(0x339)][_0x46bb49(0x740)][_0x46bb49(0x68e)](this,_0x3b7926)),this[_0x46bb49(0x2a8)][_0x37cdfe];},Game_BattlerBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x967)]=function(_0x14cee9){const _0x9cf11b=_0x3b4dfd,_0x571148=(_0x28c99f,_0xf00a56)=>{const _0x51b4b8=_0x3b79;if(!_0xf00a56)return _0x28c99f;if(_0xf00a56['note']['match'](VisuMZ['CoreEngine'][_0x51b4b8(0x20c)][_0x51b4b8(0x597)][_0x14cee9])){var _0x1cbee5=Number(RegExp['$1'])/0x64;_0x28c99f+=_0x1cbee5;}if(_0xf00a56[_0x51b4b8(0x8e2)][_0x51b4b8(0x7b5)](VisuMZ[_0x51b4b8(0x1bf)][_0x51b4b8(0x20c)][_0x51b4b8(0x869)][_0x14cee9])){if(_0x51b4b8(0x5a6)===_0x51b4b8(0x5a6)){var _0x1cbee5=Number(RegExp['$1']);_0x28c99f+=_0x1cbee5;}else this[_0x51b4b8(0x96e)]=new _0x490cdc[(_0x51b4b8(0x55c))]['BlurFilter'](_0x239a7d=!![]),this[_0x51b4b8(0x8dd)]=new _0x40ed90(),this['_backgroundSprite'][_0x51b4b8(0x8ad)]=_0x51e189[_0x51b4b8(0x640)](),this['_backgroundSprite'][_0x51b4b8(0x55c)]=[this[_0x51b4b8(0x96e)]],this['_baseSprite']['addChild'](this['_backgroundSprite']);}if(_0xf00a56[_0x51b4b8(0x8e2)][_0x51b4b8(0x7b5)](VisuMZ['CoreEngine'][_0x51b4b8(0x20c)]['xparamPlusJS'][_0x14cee9])){if(_0x51b4b8(0x21a)!=='zZUeL')_0x3b699a[_0x51b4b8(0x1bf)][_0x51b4b8(0x915)][_0x51b4b8(0x68e)](this),this[_0x51b4b8(0x6b8)]();else{var _0x99da1=String(RegExp['$1']);try{'NPdIZ'===_0x51b4b8(0x5c4)?_0x963a2e+=_0x27001b:_0x28c99f+=eval(_0x99da1);}catch(_0x3ddf3b){if(_0x51b4b8(0x84f)!==_0x51b4b8(0x2bb)){if($gameTemp[_0x51b4b8(0x821)]())console[_0x51b4b8(0x862)](_0x3ddf3b);}else for(const _0x88ac3c of _0x576d2a[_0x51b4b8(0x24e)]){[0x6c,0x198]['includes'](_0x88ac3c[_0x51b4b8(0x4e3)])&&(_0x764dc1+='\x0a',_0x14f109+=_0x88ac3c[_0x51b4b8(0x74b)][0x0]);}}}}return _0x28c99f;};return this[_0x9cf11b(0x646)]()[_0x9cf11b(0x8ef)](_0x571148,0x0);},Game_BattlerBase[_0x3b4dfd(0x396)]['xparamRate']=function(_0x33261c){const _0x10975e=_0x3b4dfd,_0x1bb597=(_0x288aa5,_0x430804)=>{const _0x1248ed=_0x3b79;if(!_0x430804)return _0x288aa5;if(_0x430804[_0x1248ed(0x8e2)]['match'](VisuMZ[_0x1248ed(0x1bf)][_0x1248ed(0x20c)][_0x1248ed(0x39e)][_0x33261c])){if(_0x1248ed(0x3ed)==='vtJps')this[_0x1248ed(0x7f9)](),this[_0x1248ed(0x416)]();else{var _0x4874d5=Number(RegExp['$1'])/0x64;_0x288aa5*=_0x4874d5;}}if(_0x430804['note'][_0x1248ed(0x7b5)](VisuMZ[_0x1248ed(0x1bf)][_0x1248ed(0x20c)][_0x1248ed(0xa32)][_0x33261c])){if('gxDUj'==='QQWDF'){const _0x139e36=_0x69a2ea['getLastUsedGamepadType']();return _0x139e36===_0x1248ed(0x865)?this[_0x1248ed(0x932)](_0x30fe79):this[_0x1248ed(0x7aa)](_0x139e36,_0x5f0418);}else{var _0x4874d5=Number(RegExp['$1']);_0x288aa5*=_0x4874d5;}}if(_0x430804[_0x1248ed(0x8e2)][_0x1248ed(0x7b5)](VisuMZ[_0x1248ed(0x1bf)][_0x1248ed(0x20c)][_0x1248ed(0x190)][_0x33261c])){var _0x36bd5f=String(RegExp['$1']);try{_0x288aa5*=eval(_0x36bd5f);}catch(_0x4b053a){if(_0x1248ed(0x9b5)!==_0x1248ed(0x674)){if($gameTemp[_0x1248ed(0x821)]())console[_0x1248ed(0x862)](_0x4b053a);}else for(let _0x3170ad=0x1;_0x3170ad<=0x64;_0x3170ad++){_0x41e959[_0x1248ed(0x878)](_0x3170ad);}}}return _0x288aa5;};return this[_0x10975e(0x646)]()[_0x10975e(0x8ef)](_0x1bb597,0x1);},Game_BattlerBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x3c7)]=function(_0x5ecbb1){const _0x253dd3=(_0x434076,_0x18afcf)=>{const _0x1b5a11=_0x3b79;if(!_0x18afcf)return _0x434076;if(_0x18afcf[_0x1b5a11(0x8e2)][_0x1b5a11(0x7b5)](VisuMZ[_0x1b5a11(0x1bf)]['RegExp'][_0x1b5a11(0x64a)][_0x5ecbb1])){var _0x66636a=Number(RegExp['$1'])/0x64;_0x434076+=_0x66636a;}if(_0x18afcf['note']['match'](VisuMZ[_0x1b5a11(0x1bf)][_0x1b5a11(0x20c)][_0x1b5a11(0x8c2)][_0x5ecbb1])){var _0x66636a=Number(RegExp['$1']);_0x434076+=_0x66636a;}if(_0x18afcf[_0x1b5a11(0x8e2)]['match'](VisuMZ[_0x1b5a11(0x1bf)][_0x1b5a11(0x20c)]['xparamFlatJS'][_0x5ecbb1])){var _0x41ce72=String(RegExp['$1']);try{_0x434076+=eval(_0x41ce72);}catch(_0x415ed6){if($gameTemp[_0x1b5a11(0x821)]())console[_0x1b5a11(0x862)](_0x415ed6);}}return _0x434076;};return this['traitObjects']()['reduce'](_0x253dd3,0x0);},Game_BattlerBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x733)]=function(_0x32279e){const _0x2e2e9a=_0x3b4dfd;let _0x4f35cd=_0x2e2e9a(0x733)+_0x32279e+_0x2e2e9a(0x9c1);if(this[_0x2e2e9a(0x986)](_0x4f35cd))return this[_0x2e2e9a(0x2a8)][_0x4f35cd];return this[_0x2e2e9a(0x2a8)][_0x4f35cd]=VisuMZ[_0x2e2e9a(0x1bf)][_0x2e2e9a(0x5af)]['Param'][_0x2e2e9a(0x187)][_0x2e2e9a(0x68e)](this,_0x32279e),this['_cache'][_0x4f35cd];},Game_BattlerBase['prototype'][_0x3b4dfd(0x9ad)]=function(_0xd5b077){const _0xe20a36=_0x3b4dfd,_0x3f3cb6=(_0x429e5,_0x3d0744)=>{const _0xac8ed7=_0x3b79;if(_0xac8ed7(0x43e)!=='GLFWS'){_0x3b2378['ConvertParams'](_0x1c6a2e,_0xcf2a7d);const _0x462696=_0x2fd952[_0xac8ed7(0x355)](_0x16d06f[_0xac8ed7(0x4b2)])[_0xac8ed7(0x1e1)](0x1,0x64),_0x415c39=_0x48a82a['Settings'],_0x3a3833=_0x415c39[_0xac8ed7(0x515)]['clamp'](0x0,0x1),_0x3de39e=_0x58a982[_0xac8ed7(0x355)](_0x415c39[_0xac8ed7(0x64b)]||0x0),_0x4d470b=_0x2aa8f3[_0xac8ed7(0x355)](_0x415c39[_0xac8ed7(0x51f)]||0x0),_0x28fedd=_0x4fafaa[_0xac8ed7(0x355)](_0x415c39['ScaleX']||0x0),_0x43642f=_0x2cfbbc[_0xac8ed7(0x355)](_0x415c39[_0xac8ed7(0x4a0)]||0x0),_0x459565=_0x19a068['round'](_0x415c39[_0xac8ed7(0x4ba)])[_0xac8ed7(0x1e1)](0x0,0xff),_0x1d73f3=_0x415c39[_0xac8ed7(0x748)],_0x5cfa0d=_0xac8ed7(0x333),_0x1d75e6=_0x17526d[_0xac8ed7(0x42e)]?'Smooth':_0xac8ed7(0x2ea),_0x8761df=_0x5cfa0d[_0xac8ed7(0x4f9)](_0x141444['IconIndex'],_0x1d75e6);_0x5b202b[_0xac8ed7(0x2c0)](_0x462696,_0x8761df,_0x3a3833,_0x3de39e,_0x4d470b,_0x28fedd,_0x43642f,_0x459565,_0x1d73f3);}else{if(!_0x3d0744)return _0x429e5;if(_0x3d0744[_0xac8ed7(0x8e2)][_0xac8ed7(0x7b5)](VisuMZ['CoreEngine']['RegExp']['sparamPlus1'][_0xd5b077])){var _0x11bdef=Number(RegExp['$1'])/0x64;_0x429e5+=_0x11bdef;}if(_0x3d0744[_0xac8ed7(0x8e2)][_0xac8ed7(0x7b5)](VisuMZ['CoreEngine'][_0xac8ed7(0x20c)][_0xac8ed7(0x805)][_0xd5b077])){if(_0xac8ed7(0x9a0)==='duXUP'){var _0x11bdef=Number(RegExp['$1']);_0x429e5+=_0x11bdef;}else this[_0xac8ed7(0x4c9)](_0x226203);}if(_0x3d0744[_0xac8ed7(0x8e2)][_0xac8ed7(0x7b5)](VisuMZ['CoreEngine'][_0xac8ed7(0x20c)][_0xac8ed7(0x698)][_0xd5b077])){if(_0xac8ed7(0x584)!==_0xac8ed7(0x724)){var _0x30d931=String(RegExp['$1']);try{_0xac8ed7(0x929)!==_0xac8ed7(0x69e)?_0x429e5+=eval(_0x30d931):this[_0xac8ed7(0x898)]=[];}catch(_0x28410b){if(_0xac8ed7(0x8a7)===_0xac8ed7(0x8a7)){if($gameTemp[_0xac8ed7(0x821)]())console[_0xac8ed7(0x862)](_0x28410b);}else return _0xd84816[_0xac8ed7(0x396)][_0xac8ed7(0x2b8)]();}}else{if(!this[_0xac8ed7(0x57a)]())return![];else{const _0x172e5c=_0x421e64[_0xac8ed7(0x8bb)](_0x2345ba,_0x48c497)[_0xac8ed7(0x619)](_0x5b7cff=>_0x5b7cff[_0xac8ed7(0x57a)]());return _0x172e5c[_0xac8ed7(0xa16)]>0x0;}}}return _0x429e5;}};return this[_0xe20a36(0x646)]()[_0xe20a36(0x8ef)](_0x3f3cb6,0x0);},Game_BattlerBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x9ae)]=function(_0x3a1d2f){const _0x380dae=(_0x195d4,_0x3986e0)=>{const _0x44d10d=_0x3b79;if(!_0x3986e0)return _0x195d4;if(_0x3986e0[_0x44d10d(0x8e2)][_0x44d10d(0x7b5)](VisuMZ[_0x44d10d(0x1bf)][_0x44d10d(0x20c)][_0x44d10d(0x5f2)][_0x3a1d2f])){if(_0x44d10d(0x248)!==_0x44d10d(0x6dd)){var _0x172075=Number(RegExp['$1'])/0x64;_0x195d4*=_0x172075;}else this[_0x44d10d(0x306)][_0x44d10d(0x3f2)](_0x3bd0ff[_0x44d10d(0x630)]['HelpBgType']);}if(_0x3986e0[_0x44d10d(0x8e2)][_0x44d10d(0x7b5)](VisuMZ[_0x44d10d(0x1bf)]['RegExp'][_0x44d10d(0x839)][_0x3a1d2f])){if(_0x44d10d(0x6d5)===_0x44d10d(0x6d5)){var _0x172075=Number(RegExp['$1']);_0x195d4*=_0x172075;}else{let _0x323012=_0x17e14a[_0x44d10d(0x67b)](0x0,this['index']());const _0x2c52d8=this['maxItems'](),_0x14adeb=this['maxCols']();if(this['isUseModernControls']()&&_0x323012>0x0||_0x263671&&_0x14adeb===0x1){_0x323012-=_0x14adeb;if(_0x323012<=0x0)_0x323012=0x0;this['smoothSelect'](_0x323012);}else!this[_0x44d10d(0x93f)]()&&((_0x323012>=_0x14adeb||_0x5d7ba5&&_0x14adeb===0x1)&&this[_0x44d10d(0x5fc)]((_0x323012-_0x14adeb+_0x2c52d8)%_0x2c52d8));}}if(_0x3986e0['note'][_0x44d10d(0x7b5)](VisuMZ[_0x44d10d(0x1bf)][_0x44d10d(0x20c)][_0x44d10d(0x8a9)][_0x3a1d2f])){if(_0x44d10d(0x4e8)!==_0x44d10d(0x4e8)){const _0x34c8d6=_0x581582['floor']((_0xa4fdc7-0x2)*_0x425689),_0x50ea37=_0x4c150c[_0x44d10d(0x396)]['gaugeHeight'][_0x44d10d(0x68e)](this),_0x52702d=_0x2fd953+this['lineHeight']()-_0x50ea37-0x2;this[_0x44d10d(0x27c)]['fillRect'](_0x2c78bf,_0x52702d,_0x4faca1,_0x50ea37,_0x33f99f[_0x44d10d(0x54a)]()),this['contents']['gradientFillRect'](_0x3c6fa4+0x1,_0x52702d+0x1,_0x34c8d6,_0x50ea37-0x2,_0x50862c,_0x4eba8d);}else{var _0x2b45ce=String(RegExp['$1']);try{_0x195d4*=eval(_0x2b45ce);}catch(_0x45bd6f){if($gameTemp[_0x44d10d(0x821)]())console[_0x44d10d(0x862)](_0x45bd6f);}}}return _0x195d4;};return this['traitObjects']()['reduce'](_0x380dae,0x1);},Game_BattlerBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x4df)]=function(_0x53bdb6){const _0x1a7538=_0x3b4dfd,_0x5c55f2=(_0x142746,_0x3eb508)=>{const _0x38463f=_0x3b79;if(!_0x3eb508)return _0x142746;if(_0x3eb508['note']['match'](VisuMZ[_0x38463f(0x1bf)][_0x38463f(0x20c)][_0x38463f(0x273)][_0x53bdb6])){var _0x41ddb7=Number(RegExp['$1'])/0x64;_0x142746+=_0x41ddb7;}if(_0x3eb508[_0x38463f(0x8e2)][_0x38463f(0x7b5)](VisuMZ[_0x38463f(0x1bf)]['RegExp']['sparamFlat2'][_0x53bdb6])){var _0x41ddb7=Number(RegExp['$1']);_0x142746+=_0x41ddb7;}if(_0x3eb508[_0x38463f(0x8e2)][_0x38463f(0x7b5)](VisuMZ[_0x38463f(0x1bf)]['RegExp'][_0x38463f(0x7fa)][_0x53bdb6])){if(_0x38463f(0xa07)===_0x38463f(0xa07)){var _0x36cc24=String(RegExp['$1']);try{_0x142746+=eval(_0x36cc24);}catch(_0x10a071){if($gameTemp[_0x38463f(0x821)]())console[_0x38463f(0x862)](_0x10a071);}}else{_0x2846ba[_0x38463f(0x1bf)]['ParseEnemyNotetags'][_0x38463f(0x68e)](this,_0x12741d),_0x2d5dc2[_0x38463f(0x678)]=0x1;const _0x18963a=_0x29304e[_0x38463f(0x8e2)];if(_0x18963a['match'](/<LEVEL:[ ](\d+)>/i))_0x269eea[_0x38463f(0x678)]=_0x3db190(_0x3ee394['$1']);if(_0x18963a[_0x38463f(0x7b5)](/<MAXHP:[ ](\d+)>/i))_0x40e52c[_0x38463f(0x1f4)][0x0]=_0x3e7538(_0x351858['$1']);if(_0x18963a['match'](/<MAXMP:[ ](\d+)>/i))_0x5e016e[_0x38463f(0x1f4)][0x1]=_0x347dd6(_0x691b9a['$1']);if(_0x18963a[_0x38463f(0x7b5)](/<ATK:[ ](\d+)>/i))_0x4d3fe4[_0x38463f(0x1f4)][0x2]=_0x512123(_0x4059bf['$1']);if(_0x18963a[_0x38463f(0x7b5)](/<DEF:[ ](\d+)>/i))_0x16b1bd['params'][0x3]=_0x51394f(_0x311723['$1']);if(_0x18963a[_0x38463f(0x7b5)](/<MAT:[ ](\d+)>/i))_0x5f494a[_0x38463f(0x1f4)][0x4]=_0x1033fb(_0x36ba32['$1']);if(_0x18963a[_0x38463f(0x7b5)](/<MDF:[ ](\d+)>/i))_0x5de682[_0x38463f(0x1f4)][0x5]=_0x1748a6(_0x4e0a78['$1']);if(_0x18963a['match'](/<AGI:[ ](\d+)>/i))_0x59c0e9[_0x38463f(0x1f4)][0x6]=_0x224b7a(_0x1c90a3['$1']);if(_0x18963a['match'](/<LUK:[ ](\d+)>/i))_0x43173c['params'][0x7]=_0x16defb(_0x16bbf8['$1']);if(_0x18963a[_0x38463f(0x7b5)](/<EXP:[ ](\d+)>/i))_0x2106ea[_0x38463f(0x45b)]=_0x4f4670(_0x251462['$1']);if(_0x18963a[_0x38463f(0x7b5)](/<GOLD:[ ](\d+)>/i))_0x5c6172[_0x38463f(0x2d0)]=_0x4e90c5(_0x4152a0['$1']);}}return _0x142746;};return this[_0x1a7538(0x646)]()[_0x1a7538(0x8ef)](_0x5c55f2,0x0);},Game_BattlerBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x50b)]=function(_0x5ae12d){const _0x4357bb=_0x3b4dfd;let _0x13929f=_0x4357bb(0x50b)+_0x5ae12d+_0x4357bb(0x9c1);if(this[_0x4357bb(0x986)](_0x13929f))return this[_0x4357bb(0x2a8)][_0x13929f];return this['_cache'][_0x13929f]=VisuMZ['CoreEngine']['Settings'][_0x4357bb(0x339)][_0x4357bb(0x538)][_0x4357bb(0x68e)](this,_0x5ae12d),this[_0x4357bb(0x2a8)][_0x13929f];},Game_BattlerBase['prototype']['paramValueByName']=function(_0x1f8f1d,_0x5a990f){const _0x12a318=_0x3b4dfd;if(typeof paramId===_0x12a318(0x2ec))return this[_0x12a318(0x4db)](_0x1f8f1d);_0x1f8f1d=String(_0x1f8f1d||'')['toUpperCase']();if(_0x1f8f1d===_0x12a318(0x332))return this[_0x12a318(0x4db)](0x0);if(_0x1f8f1d===_0x12a318(0x1b9))return this[_0x12a318(0x4db)](0x1);if(_0x1f8f1d===_0x12a318(0x1d7))return this[_0x12a318(0x4db)](0x2);if(_0x1f8f1d==='DEF')return this[_0x12a318(0x4db)](0x3);if(_0x1f8f1d===_0x12a318(0x275))return this[_0x12a318(0x4db)](0x4);if(_0x1f8f1d===_0x12a318(0x832))return this['param'](0x5);if(_0x1f8f1d==='AGI')return this[_0x12a318(0x4db)](0x6);if(_0x1f8f1d===_0x12a318(0x238))return this[_0x12a318(0x4db)](0x7);if(_0x1f8f1d===_0x12a318(0x655))return _0x5a990f?String(Math[_0x12a318(0x355)](this['xparam'](0x0)*0x64))+'%':this[_0x12a318(0x733)](0x0);if(_0x1f8f1d===_0x12a318(0x4ae))return _0x5a990f?String(Math[_0x12a318(0x355)](this[_0x12a318(0x733)](0x1)*0x64))+'%':this[_0x12a318(0x733)](0x1);if(_0x1f8f1d===_0x12a318(0x5bd))return _0x5a990f?String(Math['round'](this[_0x12a318(0x733)](0x2)*0x64))+'%':this[_0x12a318(0x733)](0x2);if(_0x1f8f1d==='CEV')return _0x5a990f?String(Math['round'](this['xparam'](0x3)*0x64))+'%':this[_0x12a318(0x733)](0x3);if(_0x1f8f1d===_0x12a318(0x3f4))return _0x5a990f?String(Math[_0x12a318(0x355)](this[_0x12a318(0x733)](0x4)*0x64))+'%':this[_0x12a318(0x733)](0x4);if(_0x1f8f1d===_0x12a318(0x64f))return _0x5a990f?String(Math[_0x12a318(0x355)](this['xparam'](0x5)*0x64))+'%':this[_0x12a318(0x733)](0x5);if(_0x1f8f1d===_0x12a318(0x8f5))return _0x5a990f?String(Math['round'](this[_0x12a318(0x733)](0x6)*0x64))+'%':this[_0x12a318(0x733)](0x6);if(_0x1f8f1d===_0x12a318(0x7c8))return _0x5a990f?String(Math['round'](this['xparam'](0x7)*0x64))+'%':this[_0x12a318(0x733)](0x7);if(_0x1f8f1d===_0x12a318(0x7c3))return _0x5a990f?String(Math['round'](this['xparam'](0x8)*0x64))+'%':this[_0x12a318(0x733)](0x8);if(_0x1f8f1d===_0x12a318(0x352))return _0x5a990f?String(Math[_0x12a318(0x355)](this['xparam'](0x9)*0x64))+'%':this[_0x12a318(0x733)](0x9);if(_0x1f8f1d==='TGR')return _0x5a990f?String(Math[_0x12a318(0x355)](this[_0x12a318(0x50b)](0x0)*0x64))+'%':this[_0x12a318(0x50b)](0x0);if(_0x1f8f1d===_0x12a318(0x24a))return _0x5a990f?String(Math[_0x12a318(0x355)](this['sparam'](0x1)*0x64))+'%':this[_0x12a318(0x50b)](0x1);if(_0x1f8f1d===_0x12a318(0x65f))return _0x5a990f?String(Math['round'](this[_0x12a318(0x50b)](0x2)*0x64))+'%':this[_0x12a318(0x50b)](0x2);if(_0x1f8f1d===_0x12a318(0x5e9))return _0x5a990f?String(Math[_0x12a318(0x355)](this[_0x12a318(0x50b)](0x3)*0x64))+'%':this[_0x12a318(0x50b)](0x3);if(_0x1f8f1d===_0x12a318(0x673))return _0x5a990f?String(Math[_0x12a318(0x355)](this[_0x12a318(0x50b)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x1f8f1d===_0x12a318(0x278))return _0x5a990f?String(Math[_0x12a318(0x355)](this[_0x12a318(0x50b)](0x5)*0x64))+'%':this[_0x12a318(0x50b)](0x5);if(_0x1f8f1d===_0x12a318(0x4c7))return _0x5a990f?String(Math['round'](this[_0x12a318(0x50b)](0x6)*0x64))+'%':this[_0x12a318(0x50b)](0x6);if(_0x1f8f1d==='MDR')return _0x5a990f?String(Math[_0x12a318(0x355)](this[_0x12a318(0x50b)](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x1f8f1d===_0x12a318(0x98a))return _0x5a990f?String(Math[_0x12a318(0x355)](this['sparam'](0x8)*0x64))+'%':this[_0x12a318(0x50b)](0x8);if(_0x1f8f1d==='EXR')return _0x5a990f?String(Math[_0x12a318(0x355)](this[_0x12a318(0x50b)](0x9)*0x64))+'%':this[_0x12a318(0x50b)](0x9);if(VisuMZ[_0x12a318(0x1bf)][_0x12a318(0x84b)][_0x1f8f1d]){const _0x14f812=VisuMZ[_0x12a318(0x1bf)]['CustomParamAbb'][_0x1f8f1d],_0x3a7255=this[_0x14f812];return VisuMZ['CoreEngine'][_0x12a318(0x2d8)][_0x1f8f1d]==='integer'?_0x12a318(0x261)!==_0x12a318(0x261)?_0x155803[_0x12a318(0x630)][_0x12a318(0x3bb)][_0x12a318(0x68e)](this):_0x3a7255:_0x5a990f?String(Math[_0x12a318(0x355)](_0x3a7255*0x64))+'%':_0x3a7255;}return'';},Game_BattlerBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x631)]=function(){const _0x38665a=_0x3b4dfd;return this[_0x38665a(0x3a2)]()&&this['_hp']<this[_0x38665a(0x9eb)]*VisuMZ[_0x38665a(0x1bf)][_0x38665a(0x5af)]['Param'][_0x38665a(0x326)];},Game_Battler[_0x3b4dfd(0x396)][_0x3b4dfd(0x240)]=function(){const _0x5c6869=_0x3b4dfd;SoundManager[_0x5c6869(0x70b)](),this[_0x5c6869(0x8e9)](_0x5c6869(0x74a));},VisuMZ[_0x3b4dfd(0x1bf)]['Game_Actor_paramBase']=Game_Actor['prototype'][_0x3b4dfd(0x935)],Game_Actor[_0x3b4dfd(0x396)][_0x3b4dfd(0x935)]=function(_0x1f6e37){const _0x4d1269=_0x3b4dfd;if(this['level']>0x63)return this[_0x4d1269(0x28a)](_0x1f6e37);return VisuMZ[_0x4d1269(0x1bf)]['Game_Actor_paramBase'][_0x4d1269(0x68e)](this,_0x1f6e37);},Game_Actor[_0x3b4dfd(0x396)][_0x3b4dfd(0x28a)]=function(_0x236ad9){const _0x56d8a1=_0x3b4dfd,_0x46e4e0=this['currentClass']()[_0x56d8a1(0x1f4)][_0x236ad9][0x63],_0x2cc31e=this['currentClass']()[_0x56d8a1(0x1f4)][_0x236ad9][0x62];return _0x46e4e0+(_0x46e4e0-_0x2cc31e)*(this[_0x56d8a1(0x678)]-0x63);},VisuMZ['CoreEngine'][_0x3b4dfd(0x8ce)]=Game_Actor[_0x3b4dfd(0x396)][_0x3b4dfd(0x4c2)],Game_Actor['prototype'][_0x3b4dfd(0x4c2)]=function(_0x50b9e2,_0x19e5dc){const _0x1a906d=_0x3b4dfd;$gameTemp[_0x1a906d(0x5f5)]=!![],VisuMZ[_0x1a906d(0x1bf)][_0x1a906d(0x8ce)][_0x1a906d(0x68e)](this,_0x50b9e2,_0x19e5dc),$gameTemp['_changingClass']=undefined;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x8e4)]=Game_Actor[_0x3b4dfd(0x396)][_0x3b4dfd(0x436)],Game_Actor[_0x3b4dfd(0x396)][_0x3b4dfd(0x436)]=function(){const _0x56899f=_0x3b4dfd;VisuMZ[_0x56899f(0x1bf)][_0x56899f(0x8e4)][_0x56899f(0x68e)](this);if(!$gameTemp[_0x56899f(0x5f5)])this[_0x56899f(0x80f)]();},Game_Actor['prototype']['levelUpRecovery']=function(){const _0x3ad6c0=_0x3b4dfd;this[_0x3ad6c0(0x2a8)]={};if(VisuMZ[_0x3ad6c0(0x1bf)]['Settings']['QoL'][_0x3ad6c0(0x904)])this[_0x3ad6c0(0x9f9)]=this[_0x3ad6c0(0x9eb)];if(VisuMZ[_0x3ad6c0(0x1bf)][_0x3ad6c0(0x5af)][_0x3ad6c0(0x38a)]['LevelUpFullMp'])this[_0x3ad6c0(0x601)]=this['mmp'];},Game_Actor[_0x3b4dfd(0x396)][_0x3b4dfd(0x505)]=function(){const _0x55e358=_0x3b4dfd;if(this[_0x55e358(0x89f)]())return 0x1;const _0x2b6ae6=this[_0x55e358(0x298)]()-this['currentLevelExp'](),_0x548ae7=this[_0x55e358(0x56c)]()-this[_0x55e358(0x19a)]();return(_0x548ae7/_0x2b6ae6)['clamp'](0x0,0x1);},Game_Actor[_0x3b4dfd(0x396)][_0x3b4dfd(0x646)]=function(){const _0x237dbb=_0x3b4dfd,_0x5cc121=Game_Battler[_0x237dbb(0x396)][_0x237dbb(0x646)][_0x237dbb(0x68e)](this);for(const _0x255124 of this[_0x237dbb(0x896)]()){if(_0x255124){if(_0x237dbb(0x7f0)!==_0x237dbb(0x7f0))return this['_actor'][_0x237dbb(0x367)](_0xc955d2);else _0x5cc121[_0x237dbb(0x297)](_0x255124);}}return _0x5cc121[_0x237dbb(0x297)](this[_0x237dbb(0xa22)](),this[_0x237dbb(0x337)]()),_0x5cc121;},Object[_0x3b4dfd(0x907)](Game_Enemy[_0x3b4dfd(0x396)],_0x3b4dfd(0x678),{'get':function(){return this['getLevel']();},'configurable':!![]}),Game_Enemy['prototype'][_0x3b4dfd(0x644)]=function(){const _0x1a41ef=_0x3b4dfd;return this[_0x1a41ef(0x44d)]()[_0x1a41ef(0x678)];},Game_Enemy[_0x3b4dfd(0x396)]['moveRelativeToResolutionChange']=function(){const _0x13409e=_0x3b4dfd;!this[_0x13409e(0x650)]&&(this[_0x13409e(0x5f0)]+=Math[_0x13409e(0x355)]((Graphics[_0x13409e(0x2c8)]-0x270)/0x2),this[_0x13409e(0x5f0)]-=Math['floor']((Graphics['height']-Graphics[_0x13409e(0x9fc)])/0x2),$gameSystem[_0x13409e(0x675)]()?_0x13409e(0x8fb)!==_0x13409e(0x3dd)?this[_0x13409e(0x918)]-=Math[_0x13409e(0x9d3)]((Graphics['width']-Graphics['boxWidth'])/0x2):this[_0x13409e(0x2b1)](_0x13409e(0x961)):this['_screenX']+=Math[_0x13409e(0x355)]((Graphics[_0x13409e(0x6b3)]-0x330)/0x2)),this[_0x13409e(0x650)]=!![];},Game_Party['prototype'][_0x3b4dfd(0x5ba)]=function(){const _0x1bf764=_0x3b4dfd;return VisuMZ['CoreEngine'][_0x1bf764(0x5af)][_0x1bf764(0x280)][_0x1bf764(0x3a5)];},VisuMZ['CoreEngine'][_0x3b4dfd(0x6e8)]=Game_Party[_0x3b4dfd(0x396)][_0x3b4dfd(0x45a)],Game_Party['prototype'][_0x3b4dfd(0x45a)]=function(_0x6fec5d){const _0x40b522=_0x3b4dfd;if(VisuMZ[_0x40b522(0x1bf)]['Settings']['QoL'][_0x40b522(0x322)]&&DataManager['isKeyItem'](_0x6fec5d))return;VisuMZ[_0x40b522(0x1bf)][_0x40b522(0x6e8)][_0x40b522(0x68e)](this,_0x6fec5d);},Game_Party[_0x3b4dfd(0x396)][_0x3b4dfd(0x1c5)]=function(){const _0x4bd99f=_0x3b4dfd,_0x3211ab=VisuMZ[_0x4bd99f(0x1bf)][_0x4bd99f(0x5af)][_0x4bd99f(0x38a)],_0x4c17fc=_0x3211ab[_0x4bd99f(0x823)]??0x63;let _0x4ee69a=[];if(_0x3211ab[_0x4bd99f(0x314)]??!![]){if(_0x4bd99f(0x482)!==_0x4bd99f(0x482)){const _0x3d63fd=_0x49848d[_0x4bd99f(0x5a7)]();_0x3d63fd[_0x4bd99f(0xa0d)]&&_0x3d63fd[_0x4bd99f(0xa11)]&&_0x3d63fd[_0x4bd99f(0x80d)]>0x0&&(_0x37d660[_0x4bd99f(0x5a4)](_0x51d6a1[_0x4bd99f(0x682)],0x0,~0x0),_0x4e254d[_0x4bd99f(0x22d)](_0x49fbd2[_0x4bd99f(0x544)],_0x5720d0['KEEP'],_0xdea50b[_0x4bd99f(0x544)]),_0x3d63fd[_0x4bd99f(0x252)](_0x3fb891),_0x4b6143[_0x4bd99f(0x3d7)][_0x4bd99f(0x251)](),_0x41d155[_0x4bd99f(0x670)](),_0x252572[_0x4bd99f(0x5a4)](_0x4f22d0['ALWAYS'],0x1,~0x0),_0x3a84e7['stencilOp'](_0x25a245[_0x4bd99f(0x260)],_0xe8e6e['REPLACE'],_0x514dde[_0x4bd99f(0x260)]),_0x2af1d2['blendFunc'](_0x4d8511['ZERO'],_0x3c408c[_0x4bd99f(0x9d7)]),_0x42fdc3[_0x4bd99f(0x252)](_0xa0f75a),_0xca006e[_0x4bd99f(0x3d7)][_0x4bd99f(0x251)](),_0x41cb63[_0x4bd99f(0x59f)](_0xceb3bb[_0x4bd99f(0x9d7)],_0x353fe8[_0x4bd99f(0x2cb)]));}else _0x4ee69a=_0x4ee69a['concat']($dataItems);}(_0x3211ab[_0x4bd99f(0x6df)]??!![])&&(_0x4ee69a=_0x4ee69a[_0x4bd99f(0x408)]($dataWeapons));(_0x3211ab['BTestArmors']??!![])&&(_0x4bd99f(0x348)===_0x4bd99f(0x348)?_0x4ee69a=_0x4ee69a[_0x4bd99f(0x408)]($dataArmors):(_0x4c3b9d['x']=_0x24f6d3['round'](_0x523ae3['x']),_0x4b35a0['y']=_0x56c56b['round'](_0x10b706['y']),_0x3c8281[_0x4bd99f(0x2d3)]=_0x1c93f0[_0x4bd99f(0x355)](_0x59e127[_0x4bd99f(0x2d3)]),_0x4f50ee['height']=_0x3af4a2[_0x4bd99f(0x355)](_0x287ec8[_0x4bd99f(0x2c8)]),this[_0x4bd99f(0x430)](),_0x1b8f83['CoreEngine']['Window_Base_initialize'][_0x4bd99f(0x68e)](this,_0xa6a5c),this[_0x4bd99f(0x677)]()));for(const _0x3a2db5 of _0x4ee69a){if(!_0x3a2db5)continue;if(_0x3a2db5[_0x4bd99f(0x926)]['trim']()<=0x0)continue;if(_0x3a2db5[_0x4bd99f(0x926)][_0x4bd99f(0x7b5)](/-----/i))continue;this['gainItem'](_0x3a2db5,_0x4c17fc);}},VisuMZ['CoreEngine'][_0x3b4dfd(0x350)]=Game_Troop[_0x3b4dfd(0x396)][_0x3b4dfd(0x557)],Game_Troop[_0x3b4dfd(0x396)][_0x3b4dfd(0x557)]=function(_0x100ce0){const _0x2dc585=_0x3b4dfd;$gameTemp[_0x2dc585(0x81c)](),$gameTemp[_0x2dc585(0x54d)](_0x100ce0),VisuMZ[_0x2dc585(0x1bf)][_0x2dc585(0x350)][_0x2dc585(0x68e)](this,_0x100ce0);},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x6dc)]=Game_Map['prototype'][_0x3b4dfd(0x557)],Game_Map[_0x3b4dfd(0x396)][_0x3b4dfd(0x557)]=function(_0x27abc7){const _0x16abf1=_0x3b4dfd;VisuMZ[_0x16abf1(0x1bf)][_0x16abf1(0x6dc)][_0x16abf1(0x68e)](this,_0x27abc7),this['checkCoreEngineDisplayCenter'](),this[_0x16abf1(0x6ab)](_0x27abc7);},Game_Map[_0x3b4dfd(0x396)][_0x3b4dfd(0x6ab)]=function(){const _0xc42687=_0x3b4dfd;this['_hideTileShadows']=VisuMZ[_0xc42687(0x1bf)][_0xc42687(0x5af)][_0xc42687(0x38a)][_0xc42687(0x53f)]||![];const _0x25255c=VisuMZ[_0xc42687(0x1bf)]['Settings'][_0xc42687(0x209)],_0x3e8af2=$dataMap?$dataMap[_0xc42687(0x8e2)]||'':'';if(_0x3e8af2[_0xc42687(0x7b5)](/<SHOW TILE SHADOWS>/i))this[_0xc42687(0x8a2)]=![];else _0x3e8af2['match'](/<HIDE TILE SHADOWS>/i)&&(this[_0xc42687(0x8a2)]=!![]);if(_0x3e8af2[_0xc42687(0x7b5)](/<SCROLL LOCK X>/i))this[_0xc42687(0x5ff)]()['centerX']=!![],this[_0xc42687(0x5ff)]()[_0xc42687(0x2dc)]=_0x25255c['DisplayLockX'];else _0x3e8af2[_0xc42687(0x7b5)](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0xc42687(0x5ff)]()[_0xc42687(0x5b6)]=!![],this['centerCameraCheckData']()[_0xc42687(0x2dc)]=Number(RegExp['$1']));if(_0x3e8af2[_0xc42687(0x7b5)](/<SCROLL LOCK Y>/i)){if(_0xc42687(0x6be)!==_0xc42687(0x324))this[_0xc42687(0x5ff)]()['centerY']=!![],this['centerCameraCheckData']()[_0xc42687(0x684)]=_0x25255c[_0xc42687(0x842)];else for(const _0x359d28 of _0x1c953c[_0xc42687(0x315)]){if(_0x359d28[_0xc42687(0xa24)][_0xc42687(0x68e)](this)){const _0x40cd55=_0x359d28[_0xc42687(0x1b0)];let _0x1537a4=_0x359d28[_0xc42687(0x974)];if(['',_0xc42687(0x235)][_0xc42687(0x5e6)](_0x1537a4))_0x1537a4=_0x359d28[_0xc42687(0x380)][_0xc42687(0x68e)](this);const _0x13eabd=_0x359d28['EnableJS']['call'](this),_0x1022a0=_0x359d28[_0xc42687(0x5e1)][_0xc42687(0x68e)](this);this[_0xc42687(0x89b)](_0x1537a4,_0x40cd55,_0x13eabd,_0x1022a0),this[_0xc42687(0x5bc)](_0x40cd55,_0x359d28[_0xc42687(0x316)][_0xc42687(0x2bd)](this,_0x1022a0));}}}else _0x3e8af2[_0xc42687(0x7b5)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0xc42687(0x5ff)]()['centerY']=!![],this['centerCameraCheckData']()[_0xc42687(0x684)]=Number(RegExp['$1']));},Game_Map['prototype'][_0x3b4dfd(0x1a9)]=function(){const _0x2a3543=_0x3b4dfd;if(this[_0x2a3543(0x8a2)]===undefined)this[_0x2a3543(0x6ab)]();return this[_0x2a3543(0x8a2)];},Game_Map['prototype'][_0x3b4dfd(0x924)]=function(){const _0x889d4d=_0x3b4dfd,_0x46656f=VisuMZ[_0x889d4d(0x1bf)]['Settings'][_0x889d4d(0x209)];this[_0x889d4d(0x58f)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x46656f['AutoScrollLockX']){const _0x46434f=Graphics[_0x889d4d(0x2d3)]/this[_0x889d4d(0x765)]();if(_0x46434f%0x1!==0x0&&Math[_0x889d4d(0x313)](_0x46434f)===this[_0x889d4d(0x2d3)]()&&!this['isLoopHorizontal']()){if(_0x889d4d(0x6e7)!=='ALoMt'){this[_0x889d4d(0x75d)]=_0x889d4d(0x97b),this[_0x889d4d(0x76a)]=_0x889d4d(0x97b),this[_0x889d4d(0x70f)]=_0x889d4d(0x97b);const _0x31fae9=this[_0x889d4d(0x636)]();_0x36f70e['prototype'][_0x889d4d(0x24b)][_0x889d4d(0x68e)](this,_0x31fae9),this[_0x889d4d(0x3f2)](0x2);}else this[_0x889d4d(0x58f)][_0x889d4d(0x5b6)]=!![],this[_0x889d4d(0x58f)][_0x889d4d(0x2dc)]=_0x46656f[_0x889d4d(0xa1b)]||0x0;}}if(_0x46656f[_0x889d4d(0x546)]){const _0x5658c7=Graphics[_0x889d4d(0x2c8)]/this['tileHeight']();_0x5658c7%0x1!==0x0&&Math['ceil'](_0x5658c7)===this[_0x889d4d(0x2c8)]()&&!this[_0x889d4d(0x399)]()&&(this[_0x889d4d(0x58f)]['centerY']=!![],this[_0x889d4d(0x58f)]['displayY']=_0x46656f['DisplayLockY']||0x0);}},Game_Map['prototype']['centerCameraCheckData']=function(){const _0x4a0abc=_0x3b4dfd;if(this[_0x4a0abc(0x58f)]===undefined)this[_0x4a0abc(0x924)]();return this[_0x4a0abc(0x58f)];},VisuMZ[_0x3b4dfd(0x1bf)]['Game_Map_scrollDown']=Game_Map[_0x3b4dfd(0x396)][_0x3b4dfd(0x3e9)],Game_Map[_0x3b4dfd(0x396)][_0x3b4dfd(0x3e9)]=function(_0x40fcf3){const _0x422f2f=_0x3b4dfd;if(this['centerCameraCheckData']()['centerY']&&$gameScreen['zoomScale']()===0x1){this['_displayY']=this[_0x422f2f(0x5ff)]()[_0x422f2f(0x684)];return;}VisuMZ[_0x422f2f(0x1bf)]['Game_Map_scrollDown'][_0x422f2f(0x68e)](this,_0x40fcf3);},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5d1)]=Game_Map['prototype'][_0x3b4dfd(0x7be)],Game_Map[_0x3b4dfd(0x396)][_0x3b4dfd(0x7be)]=function(_0x35297b){const _0x28df1f=_0x3b4dfd;if(this[_0x28df1f(0x5ff)]()[_0x28df1f(0x5b6)]&&$gameScreen[_0x28df1f(0x1db)]()===0x1){if('pObwB'!==_0x28df1f(0x1e0)){const _0x40cef1=_0x28df1f(0x890);this['_colorCache']=this[_0x28df1f(0x5d4)]||{};if(this[_0x28df1f(0x5d4)][_0x40cef1])return this['_colorCache'][_0x40cef1];const _0x2c5559=_0x48dd57[_0x28df1f(0x1bf)]['Settings']['Color']['ColorCrisis'];return this[_0x28df1f(0x9df)](_0x40cef1,_0x2c5559);}else{this['_displayX']=this['centerCameraCheckData']()['displayX'];return;}}VisuMZ[_0x28df1f(0x1bf)]['Game_Map_scrollLeft'][_0x28df1f(0x68e)](this,_0x35297b);},VisuMZ['CoreEngine'][_0x3b4dfd(0x285)]=Game_Map['prototype'][_0x3b4dfd(0x706)],Game_Map['prototype'][_0x3b4dfd(0x706)]=function(_0x4f389c){const _0x90136b=_0x3b4dfd;if(this[_0x90136b(0x5ff)]()['centerX']&&$gameScreen['zoomScale']()===0x1){if(_0x90136b(0x90b)===_0x90136b(0x90b)){this[_0x90136b(0x1e6)]=this['centerCameraCheckData']()[_0x90136b(0x2dc)];return;}else _0x3918a4=null;}VisuMZ['CoreEngine'][_0x90136b(0x285)][_0x90136b(0x68e)](this,_0x4f389c);},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x9d9)]=Game_Map[_0x3b4dfd(0x396)]['scrollUp'],Game_Map[_0x3b4dfd(0x396)][_0x3b4dfd(0x56a)]=function(_0x3ac74d){const _0x28e538=_0x3b4dfd;if(this['centerCameraCheckData']()[_0x28e538(0x791)]&&$gameScreen[_0x28e538(0x1db)]()===0x1){this[_0x28e538(0x225)]=this['centerCameraCheckData']()[_0x28e538(0x684)];return;}VisuMZ[_0x28e538(0x1bf)][_0x28e538(0x9d9)]['call'](this,_0x3ac74d);},VisuMZ['CoreEngine'][_0x3b4dfd(0x2ba)]=Game_Character[_0x3b4dfd(0x396)][_0x3b4dfd(0x710)],Game_Character[_0x3b4dfd(0x396)][_0x3b4dfd(0x710)]=function(_0x206053){const _0x30f217=_0x3b4dfd;try{if(_0x30f217(0x418)!==_0x30f217(0x418))return _0x46cfeb[_0x30f217(0x1bf)][_0x30f217(0x606)][_0x30f217(0x68e)](this)||this[_0x30f217(0x7f4)]();else VisuMZ['CoreEngine']['Game_Character_processMoveCommand'][_0x30f217(0x68e)](this,_0x206053);}catch(_0x257044){if($gameTemp['isPlaytest']())console[_0x30f217(0x862)](_0x257044);}},Game_Player['prototype'][_0x3b4dfd(0x55a)]=function(){const _0x3e7384=_0x3b4dfd,_0x13a2f3=$gameMap[_0x3e7384(0x1eb)]();this['_encounterCount']=Math[_0x3e7384(0x3d3)](_0x13a2f3)+Math[_0x3e7384(0x3d3)](_0x13a2f3)+this[_0x3e7384(0x1ac)]();},Game_Player[_0x3b4dfd(0x396)]['encounterStepsMinimum']=function(){const _0x1d472f=_0x3b4dfd;return $dataMap&&$dataMap[_0x1d472f(0x8e2)]&&$dataMap[_0x1d472f(0x8e2)][_0x1d472f(0x7b5)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x1d472f(0x1bf)][_0x1d472f(0x5af)][_0x1d472f(0x38a)]['EncounterRateMinimum'];},VisuMZ['CoreEngine']['Game_Event_isCollidedWithEvents']=Game_Event[_0x3b4dfd(0x396)][_0x3b4dfd(0x785)],Game_Event[_0x3b4dfd(0x396)][_0x3b4dfd(0x785)]=function(_0x3e32a9,_0x5a4370){const _0x252f49=_0x3b4dfd;if(this['isSmartEventCollisionOn']())return this['checkSmartEventCollision'](_0x3e32a9,_0x5a4370);else{if('UiXFf'!==_0x252f49(0x8e1))return VisuMZ[_0x252f49(0x1bf)][_0x252f49(0x8b5)][_0x252f49(0x68e)](this,_0x3e32a9,_0x5a4370);else{const _0x307a1f=_0x5467d6[_0x252f49(0x1bf)][_0x252f49(0x5af)][_0x252f49(0x840)]['BlurStrength']??0x8;this[_0x252f49(0x96e)]=new _0x55726a['filters'][(_0x252f49(0x9ce))](_0x307a1f),this[_0x252f49(0x8dd)]=new _0x37ff10(),this[_0x252f49(0x8dd)][_0x252f49(0x8ad)]=_0x35c9df[_0x252f49(0x640)](),this['_backgroundSprite']['filters']=[this[_0x252f49(0x96e)]],this[_0x252f49(0x2f6)](this[_0x252f49(0x8dd)]),this[_0x252f49(0x9c8)](0xc0),this[_0x252f49(0x9c8)](this[_0x252f49(0x391)]()),this[_0x252f49(0x8db)]();}}},Game_Event['prototype'][_0x3b4dfd(0x454)]=function(){const _0x3ad4bd=_0x3b4dfd;return VisuMZ['CoreEngine'][_0x3ad4bd(0x5af)][_0x3ad4bd(0x38a)][_0x3ad4bd(0x473)];},Game_Event[_0x3b4dfd(0x396)][_0x3b4dfd(0x621)]=function(_0x4466b0,_0xf20b83){const _0x265fdb=_0x3b4dfd;if(!this[_0x265fdb(0x57a)]()){if('eCTQu'!==_0x265fdb(0x19e))return![];else{const _0x3b9a6a=this[_0x265fdb(0x91d)](_0x47c29d),_0x19f7cd=this[_0x265fdb(0xa27)](_0x43d5ed),_0x3fa0a1=this[_0x265fdb(0x1d9)](_0x32e54c);return _0x3b9a6a*(_0x19f7cd-_0x3fa0a1);}}else{if(_0x265fdb(0x4f1)!==_0x265fdb(0x6b0)){const _0x33f04f=$gameMap[_0x265fdb(0x8bb)](_0x4466b0,_0xf20b83)[_0x265fdb(0x619)](_0x1331d0=>_0x1331d0[_0x265fdb(0x57a)]());return _0x33f04f['length']>0x0;}else _0x384bd2['CoreEngine']['Sprite_Picture_updateOrigin'][_0x265fdb(0x68e)](this);}},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x9d5)]=Game_Interpreter['prototype']['command105'],Game_Interpreter[_0x3b4dfd(0x396)][_0x3b4dfd(0x573)]=function(_0x5788e4){const _0x124d61=_0x3b4dfd,_0x42a2af=this[_0x124d61(0x8d0)]();if(_0x42a2af[_0x124d61(0x7b5)](/\/\/[ ]SCRIPT[ ]CALL/i)){if(_0x124d61(0x397)===_0x124d61(0x397))return this['runCombinedScrollingTextAsCode'](_0x42a2af);else this['cursorUp'](_0x386735['isTriggered']('up'));}else return VisuMZ[_0x124d61(0x1bf)][_0x124d61(0x9d5)][_0x124d61(0x68e)](this,_0x5788e4);},Game_Interpreter[_0x3b4dfd(0x396)][_0x3b4dfd(0x8d0)]=function(){const _0x526977=_0x3b4dfd;let _0x4f3307='',_0x2a66c5=this[_0x526977(0x8e3)]+0x1;while(this[_0x526977(0x3ac)][_0x2a66c5]&&this[_0x526977(0x3ac)][_0x2a66c5][_0x526977(0x4e3)]===0x195){_0x4f3307+=this[_0x526977(0x3ac)][_0x2a66c5]['parameters'][0x0]+'\x0a',_0x2a66c5++;}return _0x4f3307;},Game_Interpreter[_0x3b4dfd(0x396)][_0x3b4dfd(0xa1a)]=function(_0x5a8af3){const _0x357eac=_0x3b4dfd;try{eval(_0x5a8af3);}catch(_0x943e8){_0x357eac(0x247)!==_0x357eac(0x247)?this[_0x357eac(0x427)]():$gameTemp[_0x357eac(0x821)]()&&(console['log']('Show\x20Scrolling\x20Text\x20Script\x20Error'),console['log'](_0x943e8));}return!![];},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x26e)]=Game_Interpreter[_0x3b4dfd(0x396)][_0x3b4dfd(0x54e)],Game_Interpreter[_0x3b4dfd(0x396)]['command111']=function(_0x4b6939){const _0x48069d=_0x3b4dfd;try{VisuMZ[_0x48069d(0x1bf)][_0x48069d(0x26e)][_0x48069d(0x68e)](this,_0x4b6939);}catch(_0x114d31){$gameTemp['isPlaytest']()&&(console[_0x48069d(0x862)](_0x48069d(0x6b1)),console[_0x48069d(0x862)](_0x114d31)),this[_0x48069d(0x6d8)]();}return!![];},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x94e)]=Game_Interpreter[_0x3b4dfd(0x396)][_0x3b4dfd(0x881)],Game_Interpreter[_0x3b4dfd(0x396)]['command122']=function(_0x41bb9e){const _0x210f5b=_0x3b4dfd;try{VisuMZ[_0x210f5b(0x1bf)][_0x210f5b(0x94e)]['call'](this,_0x41bb9e);}catch(_0x267529){_0x210f5b(0x883)!=='asDQi'?$gameTemp['isPlaytest']()&&(console[_0x210f5b(0x862)](_0x210f5b(0x6c4)),console[_0x210f5b(0x862)](_0x267529)):_0x3eafb6+=_0x18e384(_0x34a769);}return!![];},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x47b)]=Game_Interpreter[_0x3b4dfd(0x396)][_0x3b4dfd(0x811)],Game_Interpreter['prototype']['command355']=function(){const _0x4d7ee3=_0x3b4dfd;try{VisuMZ[_0x4d7ee3(0x1bf)][_0x4d7ee3(0x47b)]['call'](this);}catch(_0x2fae7c){$gameTemp['isPlaytest']()&&(_0x4d7ee3(0x6b6)!==_0x4d7ee3(0x185)?(console[_0x4d7ee3(0x862)](_0x4d7ee3(0x77c)),console[_0x4d7ee3(0x862)](_0x2fae7c)):this[_0x4d7ee3(0x413)]=0xff);}return!![];},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x76d)]=Game_Interpreter[_0x3b4dfd(0x396)]['command357'],Game_Interpreter[_0x3b4dfd(0x396)][_0x3b4dfd(0x1f6)]=function(_0x2fcc75){const _0x27b1c8=_0x3b4dfd;return $gameTemp[_0x27b1c8(0x35e)](this),VisuMZ[_0x27b1c8(0x1bf)][_0x27b1c8(0x76d)][_0x27b1c8(0x68e)](this,_0x2fcc75);},Scene_Base['prototype'][_0x3b4dfd(0x4b1)]=function(){const _0x3e9264=_0x3b4dfd;return VisuMZ['CoreEngine'][_0x3e9264(0x5af)]['UI'][_0x3e9264(0x41e)];},Scene_Base[_0x3b4dfd(0x396)]['isBottomHelpMode']=function(){const _0x15ceea=_0x3b4dfd;return VisuMZ[_0x15ceea(0x1bf)]['Settings']['UI'][_0x15ceea(0x48e)];},Scene_Base[_0x3b4dfd(0x396)]['isBottomButtonMode']=function(){const _0x23f894=_0x3b4dfd;return VisuMZ[_0x23f894(0x1bf)][_0x23f894(0x5af)]['UI'][_0x23f894(0x8fa)];},Scene_Base['prototype'][_0x3b4dfd(0x9b4)]=function(){const _0x596f39=_0x3b4dfd;return VisuMZ[_0x596f39(0x1bf)]['Settings']['UI'][_0x596f39(0x906)];},Scene_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x653)]=function(){const _0x4e3dd4=_0x3b4dfd;return VisuMZ[_0x4e3dd4(0x1bf)][_0x4e3dd4(0x5af)]['UI'][_0x4e3dd4(0x5f1)];},Scene_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x486)]=function(){const _0x24c872=_0x3b4dfd;return VisuMZ[_0x24c872(0x1bf)][_0x24c872(0x5af)]['UI']['ButtonHeight'];},Scene_Base[_0x3b4dfd(0x396)]['isWindowMaskingEnabled']=function(){const _0xb5fca9=_0x3b4dfd;return VisuMZ[_0xb5fca9(0x1bf)][_0xb5fca9(0x5af)]['Window'][_0xb5fca9(0x4d3)];},VisuMZ[_0x3b4dfd(0x1bf)]['Scene_Base_createWindowLayer']=Scene_Base['prototype'][_0x3b4dfd(0x253)],Scene_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x253)]=function(){const _0x357731=_0x3b4dfd;VisuMZ[_0x357731(0x1bf)]['Scene_Base_createWindowLayer'][_0x357731(0x68e)](this),this[_0x357731(0x588)](),this['_windowLayer']['x']=Math['round'](this[_0x357731(0x1c4)]['x']),this[_0x357731(0x1c4)]['y']=Math['round'](this[_0x357731(0x1c4)]['y']);},Scene_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x588)]=function(){},Scene_Base[_0x3b4dfd(0x396)]['buttonAssistKey1']=function(){const _0x2dde22=_0x3b4dfd;return TextManager['getInputMultiButtonStrings']('pageup',_0x2dde22(0x1dd));},Scene_Base[_0x3b4dfd(0x396)]['buttonAssistKey2']=function(){const _0xe914ad=_0x3b4dfd;return TextManager['getInputButtonString'](_0xe914ad(0x4fd));},Scene_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x624)]=function(){const _0x4af310=_0x3b4dfd;return TextManager[_0x4af310(0x6ef)]('shift');},Scene_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x37e)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base[_0x3b4dfd(0x396)]['buttonAssistKey5']=function(){const _0x5ed5e4=_0x3b4dfd;return TextManager[_0x5ed5e4(0x6ef)](_0x5ed5e4(0x4cc));},Scene_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x4b8)]=function(){const _0x9607bc=_0x3b4dfd;if(this[_0x9607bc(0x9ca)]&&this[_0x9607bc(0x9ca)][_0x9607bc(0xa11)]){if(_0x9607bc(0x774)==='RhEyY')return TextManager['buttonAssistSwitch'];else{const _0x4b8231='_stored_mpGaugeColor2';this[_0x9607bc(0x5d4)]=this[_0x9607bc(0x5d4)]||{};if(this[_0x9607bc(0x5d4)][_0x4b8231])return this[_0x9607bc(0x5d4)][_0x4b8231];const _0x1518ec=_0x21fa8c[_0x9607bc(0x1bf)]['Settings'][_0x9607bc(0x9f4)][_0x9607bc(0x5e5)];return this['getColorDataFromPluginParameters'](_0x4b8231,_0x1518ec);}}else return'';},Scene_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x5fa)]=function(){return'';},Scene_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x83a)]=function(){return'';},Scene_Base[_0x3b4dfd(0x396)]['buttonAssistText4']=function(){const _0x4c3cc6=_0x3b4dfd;return TextManager[_0x4c3cc6(0x726)];},Scene_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x71d)]=function(){const _0x352e46=_0x3b4dfd;return TextManager[_0x352e46(0x612)];},Scene_Base[_0x3b4dfd(0x396)]['buttonAssistOffset1']=function(){return 0x0;},Scene_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x23e)]=function(){return 0x0;},Scene_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x7d2)]=function(){return 0x0;},Scene_Base['prototype'][_0x3b4dfd(0x451)]=function(){return 0x0;},Scene_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x3ec)]=function(){return 0x0;},VisuMZ[_0x3b4dfd(0x1bf)]['Scene_Boot_loadSystemImages']=Scene_Boot[_0x3b4dfd(0x396)]['loadSystemImages'],Scene_Boot[_0x3b4dfd(0x396)]['loadSystemImages']=function(){const _0x80fbd9=_0x3b4dfd;VisuMZ[_0x80fbd9(0x1bf)]['Scene_Boot_loadSystemImages'][_0x80fbd9(0x68e)](this),this[_0x80fbd9(0x63c)]();},Scene_Boot[_0x3b4dfd(0x396)][_0x3b4dfd(0x63c)]=function(){const _0x2be662=_0x3b4dfd,_0x4c625e=[_0x2be662(0x4cd),_0x2be662(0x8af),_0x2be662(0x450),'characters',_0x2be662(0x7f3),_0x2be662(0x463),_0x2be662(0x5b9),_0x2be662(0x572),'sv_actors',_0x2be662(0x46e),_0x2be662(0x574),_0x2be662(0x4de),'titles1',_0x2be662(0x6a2)];for(const _0xc9d51c of _0x4c625e){if(_0x2be662(0x6f1)===_0x2be662(0x6f1)){const _0x20f699=VisuMZ[_0x2be662(0x1bf)][_0x2be662(0x5af)][_0x2be662(0x83d)][_0xc9d51c],_0x12dbf1='img/%1/'[_0x2be662(0x4f9)](_0xc9d51c);for(const _0x58c170 of _0x20f699){ImageManager[_0x2be662(0x26a)](_0x12dbf1,_0x58c170);}}else return _0x5d79ff[_0x2be662(0x630)][_0x2be662(0x690)][_0x2be662(0x68e)](this);}},VisuMZ['CoreEngine'][_0x3b4dfd(0x42d)]=Scene_Boot[_0x3b4dfd(0x396)][_0x3b4dfd(0x191)],Scene_Boot[_0x3b4dfd(0x396)][_0x3b4dfd(0x191)]=function(){const _0x67e6e1=_0x3b4dfd;Utils['isOptionValid'](_0x67e6e1(0x3d6))&&VisuMZ[_0x67e6e1(0x1bf)]['Settings']['QoL'][_0x67e6e1(0xa2e)]?_0x67e6e1(0x213)!==_0x67e6e1(0x213)?_0x1cb62d[_0x67e6e1(0x821)]()&&(_0x47407e[_0x67e6e1(0x862)](_0x67e6e1(0x77c)),_0x91088c[_0x67e6e1(0x862)](_0x2b877c)):this[_0x67e6e1(0x263)]():VisuMZ[_0x67e6e1(0x1bf)][_0x67e6e1(0x42d)][_0x67e6e1(0x68e)](this);},Scene_Boot[_0x3b4dfd(0x396)][_0x3b4dfd(0x263)]=function(){const _0x1fb5e4=_0x3b4dfd;DataManager['setupNewGame'](),SceneManager[_0x1fb5e4(0x472)](Scene_Map);},Scene_Boot[_0x3b4dfd(0x396)]['adjustBoxSize']=function(){const _0x2b00f9=_0x3b4dfd,_0x5f3c28=$dataSystem[_0x2b00f9(0x81e)][_0x2b00f9(0x831)],_0x14ac95=$dataSystem[_0x2b00f9(0x81e)][_0x2b00f9(0x346)],_0x5dec32=VisuMZ['CoreEngine'][_0x2b00f9(0x5af)]['UI']['BoxMargin'];Graphics['boxWidth']=_0x5f3c28-_0x5dec32*0x2,Graphics[_0x2b00f9(0x9fc)]=_0x14ac95-_0x5dec32*0x2,this[_0x2b00f9(0xa03)]();},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x6a3)]=Scene_Boot[_0x3b4dfd(0x396)][_0x3b4dfd(0x62d)],Scene_Boot[_0x3b4dfd(0x396)][_0x3b4dfd(0x62d)]=function(){const _0x5cf1b1=_0x3b4dfd;this[_0x5cf1b1(0x50f)]()?this[_0x5cf1b1(0x291)]():_0x5cf1b1(0x985)!==_0x5cf1b1(0x985)?_0xe1e3f[_0x5cf1b1(0x3b2)]():VisuMZ[_0x5cf1b1(0x1bf)][_0x5cf1b1(0x6a3)][_0x5cf1b1(0x68e)](this);},Scene_Boot[_0x3b4dfd(0x396)]['isFullDocumentTitle']=function(){const _0x67d3d2=_0x3b4dfd;if(Scene_Title[_0x67d3d2(0x439)]==='')return![];if(Scene_Title['subtitle']===_0x67d3d2(0x198))return![];if(Scene_Title['version']==='')return![];if(Scene_Title['version']===_0x67d3d2(0x7b1))return![];return!![];},Scene_Boot[_0x3b4dfd(0x396)][_0x3b4dfd(0x291)]=function(){const _0x1061c5=_0x3b4dfd,_0x2dc061=$dataSystem[_0x1061c5(0x214)],_0x12c85b=Scene_Title['subtitle']||'',_0x35cdfa=Scene_Title['version']||'',_0x190ba1=VisuMZ[_0x1061c5(0x1bf)][_0x1061c5(0x5af)][_0x1061c5(0x2ab)][_0x1061c5(0x635)]['DocumentTitleFmt'],_0x348339=_0x190ba1[_0x1061c5(0x4f9)](_0x2dc061,_0x12c85b,_0x35cdfa);document[_0x1061c5(0x1ed)]=_0x348339;},Scene_Boot[_0x3b4dfd(0x396)][_0x3b4dfd(0xa03)]=function(){const _0x164296=_0x3b4dfd;if(VisuMZ['CoreEngine']['Settings']['UI'][_0x164296(0x5d2)]){const _0x2e4f88=Graphics[_0x164296(0x2d3)]-Graphics[_0x164296(0x6b3)]-VisuMZ[_0x164296(0x1bf)][_0x164296(0x5af)]['UI'][_0x164296(0x4bb)]*0x2,_0x230b8d=Sprite_Button['prototype'][_0x164296(0x703)][_0x164296(0x68e)](this)*0x4;if(_0x2e4f88>=_0x230b8d)SceneManager[_0x164296(0x283)](!![]);}},Scene_Title[_0x3b4dfd(0x439)]=VisuMZ['CoreEngine'][_0x3b4dfd(0x5af)][_0x3b4dfd(0x2ab)][_0x3b4dfd(0x635)][_0x3b4dfd(0x198)],Scene_Title['version']=VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5af)][_0x3b4dfd(0x2ab)]['Title'][_0x3b4dfd(0x575)],Scene_Title[_0x3b4dfd(0x72f)]=VisuMZ['CoreEngine'][_0x3b4dfd(0x5af)][_0x3b4dfd(0x7b2)],VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x6fd)]=Scene_Title[_0x3b4dfd(0x396)]['drawGameTitle'],Scene_Title[_0x3b4dfd(0x396)][_0x3b4dfd(0x23a)]=function(){const _0x57d632=_0x3b4dfd;VisuMZ[_0x57d632(0x1bf)]['Settings']['MenuLayout'][_0x57d632(0x635)][_0x57d632(0x23a)]['call'](this);if(Scene_Title['subtitle']!==''&&Scene_Title[_0x57d632(0x439)]!==_0x57d632(0x198))this[_0x57d632(0x931)]();if(Scene_Title['version']!==''&&Scene_Title[_0x57d632(0x64c)]!==_0x57d632(0x7b1))this['drawGameVersion']();},Scene_Title[_0x3b4dfd(0x396)][_0x3b4dfd(0x931)]=function(){const _0x5c6a01=_0x3b4dfd;VisuMZ[_0x5c6a01(0x1bf)][_0x5c6a01(0x5af)][_0x5c6a01(0x2ab)][_0x5c6a01(0x635)][_0x5c6a01(0x931)]['call'](this);},Scene_Title[_0x3b4dfd(0x396)]['drawGameVersion']=function(){const _0x27912c=_0x3b4dfd;VisuMZ['CoreEngine'][_0x27912c(0x5af)][_0x27912c(0x2ab)]['Title'][_0x27912c(0x94a)]['call'](this);},Scene_Title[_0x3b4dfd(0x396)]['createCommandWindow']=function(){const _0x21a204=_0x3b4dfd;this[_0x21a204(0x4ef)]();const _0x4cca88=$dataSystem[_0x21a204(0x485)][_0x21a204(0x2a2)],_0x4145b9=this['commandWindowRect']();this['_commandWindow']=new Window_TitleCommand(_0x4145b9),this[_0x21a204(0x965)][_0x21a204(0x3f2)](_0x4cca88);const _0x4ea344=this[_0x21a204(0x4ce)]();this[_0x21a204(0x965)][_0x21a204(0x54f)](_0x4ea344['x'],_0x4ea344['y'],_0x4ea344[_0x21a204(0x2d3)],_0x4ea344[_0x21a204(0x2c8)]),this['_commandWindow']['createContents'](),this[_0x21a204(0x965)]['refresh'](),this[_0x21a204(0x965)]['selectLast'](),this[_0x21a204(0x595)](this[_0x21a204(0x965)]);},Scene_Title[_0x3b4dfd(0x396)][_0x3b4dfd(0x195)]=function(){const _0x4a8279=_0x3b4dfd;return this['_commandWindow']?this[_0x4a8279(0x965)][_0x4a8279(0x941)]():VisuMZ['CoreEngine'][_0x4a8279(0x5af)]['TitleCommandList'][_0x4a8279(0xa16)];},Scene_Title['prototype'][_0x3b4dfd(0x4ce)]=function(){const _0x3a2e0f=_0x3b4dfd;return VisuMZ[_0x3a2e0f(0x1bf)]['Settings'][_0x3a2e0f(0x2ab)]['Title'][_0x3a2e0f(0x181)][_0x3a2e0f(0x68e)](this);},Scene_Title[_0x3b4dfd(0x396)][_0x3b4dfd(0x4ef)]=function(){const _0x16a7be=_0x3b4dfd;for(const _0x313068 of Scene_Title['pictureButtons']){if(_0x16a7be(0x783)!==_0x16a7be(0x700)){const _0x495ccc=new Sprite_TitlePictureButton(_0x313068);this['addChild'](_0x495ccc);}else{const _0x4d44cd=this[_0x16a7be(0x711)],_0x4dba13=this[_0x16a7be(0x892)],_0x19bd8a=0x18,_0xf99b2=_0x19bd8a/0x2,_0x107b83=0x60+_0x19bd8a,_0x3abe62=0x0+_0x19bd8a;this[_0x16a7be(0xa20)]['bitmap']=this[_0x16a7be(0x8b9)],this[_0x16a7be(0xa20)][_0x16a7be(0x977)]['x']=0.5,this[_0x16a7be(0xa20)][_0x16a7be(0x977)]['y']=0.5,this[_0x16a7be(0xa20)][_0x16a7be(0x5e0)](_0x107b83+_0xf99b2,_0x3abe62+_0xf99b2+_0x19bd8a,_0x19bd8a,_0xf99b2),this['_downArrowSprite'][_0x16a7be(0x54f)](_0x298137[_0x16a7be(0x355)](_0x4d44cd/0x2),_0x392191[_0x16a7be(0x355)](_0x4dba13-_0xf99b2)),this['_upArrowSprite']['bitmap']=this['_windowskin'],this[_0x16a7be(0x38c)][_0x16a7be(0x977)]['x']=0.5,this[_0x16a7be(0x38c)]['anchor']['y']=0.5,this[_0x16a7be(0x38c)]['setFrame'](_0x107b83+_0xf99b2,_0x3abe62,_0x19bd8a,_0xf99b2),this[_0x16a7be(0x38c)][_0x16a7be(0x54f)](_0x5e2cad[_0x16a7be(0x355)](_0x4d44cd/0x2),_0x531f17['round'](_0xf99b2));}}},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x830)]=Scene_Map['prototype'][_0x3b4dfd(0x24b)],Scene_Map[_0x3b4dfd(0x396)]['initialize']=function(){const _0x1b939e=_0x3b4dfd;VisuMZ[_0x1b939e(0x1bf)][_0x1b939e(0x830)][_0x1b939e(0x68e)](this),$gameTemp[_0x1b939e(0x81c)](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x8ff)]=Scene_Map[_0x3b4dfd(0x396)][_0x3b4dfd(0x1ff)],Scene_Map[_0x3b4dfd(0x396)][_0x3b4dfd(0x1ff)]=function(){const _0x59f4af=_0x3b4dfd;VisuMZ[_0x59f4af(0x1bf)]['Scene_Map_updateMainMultiply'][_0x59f4af(0x68e)](this),$gameTemp[_0x59f4af(0x709)]&&!$gameMessage['isBusy']()&&(this[_0x59f4af(0x9d6)](),SceneManager['updateEffekseer']());},Scene_Map[_0x3b4dfd(0x396)][_0x3b4dfd(0x5c5)]=function(){const _0x38e84d=_0x3b4dfd;Scene_Message[_0x38e84d(0x396)][_0x38e84d(0x5c5)][_0x38e84d(0x68e)](this),!SceneManager[_0x38e84d(0x1a7)](Scene_Battle)&&(this[_0x38e84d(0x8c9)]['update'](),this[_0x38e84d(0x345)][_0x38e84d(0x760)](),this[_0x38e84d(0x1c4)][_0x38e84d(0xa11)]=![],SceneManager[_0x38e84d(0x7eb)]()),$gameScreen[_0x38e84d(0x2d7)](),this[_0x38e84d(0x264)]();},VisuMZ['CoreEngine'][_0x3b4dfd(0x294)]=Scene_Map['prototype'][_0x3b4dfd(0x3f0)],Scene_Map[_0x3b4dfd(0x396)][_0x3b4dfd(0x3f0)]=function(){const _0x4b05d9=_0x3b4dfd;VisuMZ['CoreEngine'][_0x4b05d9(0x294)][_0x4b05d9(0x68e)](this);if(SceneManager[_0x4b05d9(0x18a)]()){if(_0x4b05d9(0x3fe)==='WPfLo'){if(this[_0x4b05d9(0x7c7)]===_0x5786d4)this[_0x4b05d9(0x6b8)]();this[_0x4b05d9(0x7c7)]['BattleSystem']=this[_0x4b05d9(0x90a)]();}else this[_0x4b05d9(0x942)]();}},Scene_Map['prototype'][_0x3b4dfd(0x942)]=function(){const _0x51c1c8=_0x3b4dfd;this[_0x51c1c8(0x902)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x3b4dfd(0x1bf)]['Scene_Map_updateScene']=Scene_Map['prototype'][_0x3b4dfd(0x299)],Scene_Map[_0x3b4dfd(0x396)]['updateScene']=function(){const _0x3ec7bb=_0x3b4dfd;VisuMZ[_0x3ec7bb(0x1bf)][_0x3ec7bb(0x9b8)][_0x3ec7bb(0x68e)](this),this[_0x3ec7bb(0x7f8)]();},Scene_Map[_0x3b4dfd(0x396)]['updateDashToggle']=function(){const _0x31548b=_0x3b4dfd;if(Input[_0x31548b(0x447)](_0x31548b(0x7ab))){if(_0x31548b(0x5a2)!==_0x31548b(0x5a2)){var _0x2ac9bd=_0xc2539b(_0x234aa4['$1'])/0x64;_0x4fe4e8+=_0x2ac9bd;}else ConfigManager[_0x31548b(0x426)]=!ConfigManager[_0x31548b(0x426)],ConfigManager[_0x31548b(0x9ed)]();}},VisuMZ['CoreEngine'][_0x3b4dfd(0x5a9)]=Scene_Map['prototype']['updateMain'],Scene_Map[_0x3b4dfd(0x396)][_0x3b4dfd(0x9d6)]=function(){const _0x3ee66e=_0x3b4dfd;VisuMZ[_0x3ee66e(0x1bf)][_0x3ee66e(0x5a9)][_0x3ee66e(0x68e)](this),this[_0x3ee66e(0x593)]();},Scene_Map[_0x3b4dfd(0x396)][_0x3b4dfd(0x264)]=function(){const _0x2a34eb=_0x3b4dfd;this[_0x2a34eb(0x4c5)]=[];},Scene_Map['prototype'][_0x3b4dfd(0x593)]=function(){const _0x1259fb=_0x3b4dfd;if(!this[_0x1259fb(0x4c5)])return;for(const _0x3bc1bf of this[_0x1259fb(0x4c5)]){_0x3bc1bf&&('vMjHJ'!=='tlDDe'?_0x3bc1bf['update']():(this['_data'][_0x1259fb(0x219)][_0x1259fb(0x68e)](this),this[_0x1259fb(0x6b4)][_0x1259fb(0x9ee)][_0x1259fb(0x68e)](this),this['setClickHandler'](this[_0x1259fb(0x6b4)]['CallHandlerJS'][_0x1259fb(0x2bd)](this))));}},Scene_Map['prototype'][_0x3b4dfd(0x567)]=function(_0x4b5d71){const _0xb0cd1e=_0x3b4dfd,_0x8d0ba8=$dataCommonEvents[_0x4b5d71];if(!_0x8d0ba8)return;const _0x3f4bf8=new Game_OnceParallelInterpreter();this[_0xb0cd1e(0x688)](_0x3f4bf8),_0x3f4bf8['setCommonEvent'](_0x4b5d71);},Scene_Map[_0x3b4dfd(0x396)]['addOnceParallelInterpreter']=function(_0x5155ba){const _0x536296=_0x3b4dfd;this[_0x536296(0x4c5)]=this[_0x536296(0x4c5)]||[],this[_0x536296(0x4c5)][_0x536296(0x297)](_0x5155ba);},Scene_Map['prototype'][_0x3b4dfd(0xa10)]=function(_0x112a0d){const _0x1569d4=_0x3b4dfd;this['_onceParallelInterpreters']=this[_0x1569d4(0x4c5)]||[],this['_onceParallelInterpreters'][_0x1569d4(0x8b7)](_0x112a0d);};function Game_OnceParallelInterpreter(){this['initialize'](...arguments);}Game_OnceParallelInterpreter['prototype']=Object['create'](Game_Interpreter['prototype']),Game_OnceParallelInterpreter[_0x3b4dfd(0x396)][_0x3b4dfd(0x9dc)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x3b4dfd(0x396)][_0x3b4dfd(0x5ce)]=function(_0x1e50f8){const _0xed6d6e=_0x3b4dfd,_0x7c7c0=$dataCommonEvents[_0x1e50f8];if(_0x7c7c0){if(_0xed6d6e(0x412)!==_0xed6d6e(0x409))this['setup'](_0x7c7c0[_0xed6d6e(0x24e)],0x0);else return this[_0xed6d6e(0xa1a)](_0x4d421c);}else _0xed6d6e(0x1e7)!=='daZhN'?this[_0xed6d6e(0x5c5)]():(_0x5a27a1[_0xed6d6e(0x862)](_0xed6d6e(0x6c4)),_0x300810[_0xed6d6e(0x862)](_0x314014));},Game_OnceParallelInterpreter[_0x3b4dfd(0x396)][_0x3b4dfd(0x5c5)]=function(){const _0x306ddb=_0x3b4dfd;if(!SceneManager[_0x306ddb(0x645)]())return;SceneManager['_scene'][_0x306ddb(0xa10)](this),Game_Interpreter[_0x306ddb(0x396)][_0x306ddb(0x5c5)][_0x306ddb(0x68e)](this);},VisuMZ[_0x3b4dfd(0x1bf)]['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x242)],Scene_MenuBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x242)]=function(){const _0x441445=_0x3b4dfd;let _0x6f2703=0x0;if(SceneManager[_0x441445(0x7f7)]()){if(_0x441445(0xa14)!==_0x441445(0xa14)){const _0x60d138=_0x119fa5[_0x441445(0x1bf)][_0x441445(0x5af)][_0x441445(0x9a3)];for(const _0x2a4acf of _0x60d138){const _0x39cac8=(_0x2a4acf['Name']||'')[_0x441445(0x1ea)]()[_0x441445(0x58b)](),_0x3e96ae=(_0x2a4acf['Match']||'')[_0x441445(0x1ea)]()[_0x441445(0x58b)]();_0x262ac4['CoreEngine'][_0x441445(0x9a3)][_0x39cac8]=_0x2a4acf,_0x41e18b[_0x441445(0x1bf)]['ControllerMatches'][_0x3e96ae]=_0x39cac8;}}else _0x6f2703=this['helpAreaTopSideButtonLayout']();}else _0x441445(0x3aa)==='FmhOM'?_0x6f2703=VisuMZ[_0x441445(0x1bf)][_0x441445(0x89c)][_0x441445(0x68e)](this):this[_0x441445(0x686)](this[_0x441445(0x9db)](),_0x2ff4f0['x'],_0x479912['y'],_0x34d91d[_0x441445(0x2d3)],_0x441445(0x5b2));return _0x6f2703;},Scene_MenuBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x777)]=function(){const _0x408fbf=_0x3b4dfd;return this[_0x408fbf(0x719)]()?_0x408fbf(0x8fc)!==_0x408fbf(0x8fc)?this[_0x408fbf(0x2ef)]()?this[_0x408fbf(0x27c)][_0x408fbf(0x8d8)](_0x27ae15):_0x524744[_0x408fbf(0x396)][_0x408fbf(0x4a9)][_0x408fbf(0x68e)](this,_0x37fe50):this[_0x408fbf(0x981)]():0x0;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x944)]=Scene_MenuBase['prototype'][_0x3b4dfd(0x599)],Scene_MenuBase['prototype'][_0x3b4dfd(0x599)]=function(){const _0xae4d92=_0x3b4dfd;if(SceneManager[_0xae4d92(0x7f7)]())return this[_0xae4d92(0x386)]();else{if(_0xae4d92(0x6bd)===_0xae4d92(0x279))_0x53cab8+=_0x5e8aa0,_0x274b52+=_0x303f22,_0x104bdf+=_0xae4d92(0x61a)[_0xae4d92(0x4f9)](_0x4d7266['id'],_0x523abb[_0xae4d92(0x926)]),_0x5b6763+=_0x149aaa,_0x4f57de+=_0x184943,_0x470999+=_0x4553fb,_0x397f53+=_0xae4d92(0x751)[_0xae4d92(0x4f9)](_0x54c86e['id'],_0x443423[_0xae4d92(0x926)]),_0x202e87+=_0x4274c2;else return VisuMZ[_0xae4d92(0x1bf)][_0xae4d92(0x944)][_0xae4d92(0x68e)](this);}},Scene_MenuBase[_0x3b4dfd(0x396)]['mainAreaTopSideButtonLayout']=function(){const _0x19acbd=_0x3b4dfd;if(!this[_0x19acbd(0x719)]())return this['helpAreaBottom']();else return this[_0x19acbd(0x802)]()&&this['getButtonAssistLocation']()===_0x19acbd(0x615)?Window_ButtonAssist[_0x19acbd(0x396)][_0x19acbd(0x2b8)]():0x0;},VisuMZ['CoreEngine'][_0x3b4dfd(0x762)]=Scene_MenuBase[_0x3b4dfd(0x396)]['mainAreaHeight'],Scene_MenuBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x3ae)]=function(){const _0x49fc36=_0x3b4dfd;let _0x50d5dc=0x0;if(SceneManager[_0x49fc36(0x7f7)]())_0x50d5dc=this[_0x49fc36(0x858)]();else{if(_0x49fc36(0x8a5)===_0x49fc36(0x8a5))_0x50d5dc=VisuMZ[_0x49fc36(0x1bf)][_0x49fc36(0x762)][_0x49fc36(0x68e)](this);else{if(!_0x41328c)return;if(!_0x7c46c0[_0x49fc36(0x6d1)]())return;const _0x6dda45=0x80,_0x34175a=_0x58a7bd[_0x49fc36(0x505)]();let _0x3b2d02=_0x4f3913[_0x49fc36(0x1ab)](),_0xa39146=_0x30695c[_0x49fc36(0x1f2)]();_0x34175a>=0x1&&(_0x3b2d02=_0x520d72[_0x49fc36(0x8c8)](),_0xa39146=_0x4960d2[_0x49fc36(0x293)]()),this[_0x49fc36(0x8b1)](_0x8a5674,_0x3a428a,_0x6dda45,_0x34175a,_0x3b2d02,_0xa39146);}}return this['isMenuButtonAssistEnabled']()&&this[_0x49fc36(0x971)]()!=='button'&&(_0x50d5dc-=Window_ButtonAssist['prototype']['lineHeight']()),_0x50d5dc;},Scene_MenuBase[_0x3b4dfd(0x396)]['mainAreaHeightSideButtonLayout']=function(){const _0x5d08ba=_0x3b4dfd;return Graphics[_0x5d08ba(0x9fc)]-this[_0x5d08ba(0x1c6)]();},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x732)]=Scene_MenuBase[_0x3b4dfd(0x396)][_0x3b4dfd(0xa17)],Scene_MenuBase[_0x3b4dfd(0x396)][_0x3b4dfd(0xa17)]=function(){const _0x165150=_0x3b4dfd,_0x14d9a2=VisuMZ[_0x165150(0x1bf)][_0x165150(0x5af)][_0x165150(0x840)]['BlurStrength']??0x8;this[_0x165150(0x96e)]=new PIXI[(_0x165150(0x55c))][(_0x165150(0x9ce))](_0x14d9a2),this[_0x165150(0x8dd)]=new Sprite(),this['_backgroundSprite'][_0x165150(0x8ad)]=SceneManager[_0x165150(0x640)](),this[_0x165150(0x8dd)]['filters']=[this[_0x165150(0x96e)]],this[_0x165150(0x2f6)](this[_0x165150(0x8dd)]),this[_0x165150(0x9c8)](0xc0),this[_0x165150(0x9c8)](this['getBackgroundOpacity']()),this[_0x165150(0x8db)]();},Scene_MenuBase[_0x3b4dfd(0x396)]['getBackgroundOpacity']=function(){const _0x3f72a8=_0x3b4dfd,_0x26f3a2=String(this[_0x3f72a8(0x9dc)][_0x3f72a8(0x926)]),_0x2f1c39=this['getCustomBackgroundSettings'](_0x26f3a2);return _0x2f1c39?_0x2f1c39['SnapshotOpacity']:0xc0;},Scene_MenuBase[_0x3b4dfd(0x396)]['createCustomBackgroundImages']=function(){const _0x424bae=_0x3b4dfd,_0x12be7d=String(this[_0x424bae(0x9dc)][_0x424bae(0x926)]),_0x5cf62f=this[_0x424bae(0x996)](_0x12be7d);_0x5cf62f&&(_0x5cf62f[_0x424bae(0x94c)]!==''||_0x5cf62f[_0x424bae(0x92d)]!=='')&&(_0x424bae(0x72b)!==_0x424bae(0x72b)?(_0x5e18f8[_0x424bae(0x81c)](),_0x81e141[_0x424bae(0x54d)](_0x4bc897),_0x219b86[_0x424bae(0x1bf)][_0x424bae(0x350)][_0x424bae(0x68e)](this,_0x2643ef)):(this[_0x424bae(0x539)]=new Sprite(ImageManager[_0x424bae(0x76b)](_0x5cf62f['BgFilename1'])),this[_0x424bae(0x88c)]=new Sprite(ImageManager[_0x424bae(0x6ee)](_0x5cf62f[_0x424bae(0x92d)])),this[_0x424bae(0x2f6)](this['_backSprite1']),this[_0x424bae(0x2f6)](this[_0x424bae(0x88c)]),this['_backSprite1'][_0x424bae(0x8ad)][_0x424bae(0x88f)](this[_0x424bae(0x394)][_0x424bae(0x2bd)](this,this[_0x424bae(0x539)])),this['_backSprite2'][_0x424bae(0x8ad)]['addLoadListener'](this[_0x424bae(0x394)][_0x424bae(0x2bd)](this,this[_0x424bae(0x88c)]))));},Scene_MenuBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x996)]=function(_0x4dd586){const _0x382a29=_0x3b4dfd;return VisuMZ[_0x382a29(0x1bf)][_0x382a29(0x5af)]['MenuBg'][_0x4dd586]||VisuMZ[_0x382a29(0x1bf)]['Settings']['MenuBg'][_0x382a29(0x80e)];},Scene_MenuBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x394)]=function(_0x25b845){const _0x53c3d6=_0x3b4dfd;this[_0x53c3d6(0x93a)](_0x25b845),this[_0x53c3d6(0x4bf)](_0x25b845);},VisuMZ['CoreEngine'][_0x3b4dfd(0x26d)]=Scene_MenuBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x19d)],Scene_MenuBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x19d)]=function(){const _0x16f8a6=_0x3b4dfd;VisuMZ[_0x16f8a6(0x1bf)][_0x16f8a6(0x26d)]['call'](this),SceneManager[_0x16f8a6(0x18a)]()&&this[_0x16f8a6(0x824)]();},Scene_MenuBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x824)]=function(){const _0x6d48d4=_0x3b4dfd;this['_cancelButton']['x']=Graphics[_0x6d48d4(0x6b3)]+0x4;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x2a5)]=Scene_MenuBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x41b)],Scene_MenuBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x41b)]=function(){const _0xb8f1b8=_0x3b4dfd;VisuMZ[_0xb8f1b8(0x1bf)][_0xb8f1b8(0x2a5)][_0xb8f1b8(0x68e)](this),SceneManager[_0xb8f1b8(0x18a)]()&&('rgvJi'!==_0xb8f1b8(0x7f1)?this[_0xb8f1b8(0x30a)]=_0xb8f1b8(0x680):this['movePageButtonSideButtonLayout']());},Scene_MenuBase[_0x3b4dfd(0x396)]['movePageButtonSideButtonLayout']=function(){const _0x2c4750=_0x3b4dfd;this[_0x2c4750(0x9ca)]['x']=-0x1*(this[_0x2c4750(0x9ca)][_0x2c4750(0x2d3)]+this[_0x2c4750(0x8d9)][_0x2c4750(0x2d3)]+0x8),this[_0x2c4750(0x8d9)]['x']=-0x1*(this[_0x2c4750(0x8d9)]['width']+0x4);},Scene_MenuBase[_0x3b4dfd(0x396)]['isMenuButtonAssistEnabled']=function(){const _0x58a9c0=_0x3b4dfd;return VisuMZ['CoreEngine'][_0x58a9c0(0x5af)][_0x58a9c0(0x3da)][_0x58a9c0(0x8cd)];},Scene_MenuBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x971)]=function(){const _0x39383a=_0x3b4dfd;if(SceneManager[_0x39383a(0x18a)]()||SceneManager[_0x39383a(0x943)]()){if(_0x39383a(0x2c7)===_0x39383a(0x2c7))return VisuMZ[_0x39383a(0x1bf)]['Settings'][_0x39383a(0x3da)][_0x39383a(0x699)];else _0x35c836[_0x39383a(0x1bf)][_0x39383a(0x199)]['call'](this);}else return _0x39383a(0x78b);},Scene_MenuBase[_0x3b4dfd(0x396)]['createButtonAssistWindow']=function(){const _0x1dc862=_0x3b4dfd;if(!this[_0x1dc862(0x802)]())return;const _0xb164ce=this[_0x1dc862(0x62c)]();this[_0x1dc862(0x3bc)]=new Window_ButtonAssist(_0xb164ce),this[_0x1dc862(0x595)](this[_0x1dc862(0x3bc)]);},Scene_MenuBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x62c)]=function(){const _0x36110a=_0x3b4dfd;if(this[_0x36110a(0x971)]()==='button')return this[_0x36110a(0x9e3)]();else{if(_0x36110a(0x5f9)!==_0x36110a(0x1f1))return this['buttonAssistWindowSideRect']();else{_0x2ec268-=_0x224d43;if(_0x23ca31<=0x0)_0x4a9d6f=0x0;this[_0x36110a(0x5fc)](_0x587567);}}},Scene_MenuBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x9e3)]=function(){const _0xfd0cf6=_0x3b4dfd,_0x2c2f60=ConfigManager[_0xfd0cf6(0x7ec)]?(Sprite_Button[_0xfd0cf6(0x396)][_0xfd0cf6(0x703)]()+0x6)*0x2:0x0,_0x193a83=this[_0xfd0cf6(0x6ec)](),_0x4135a8=Graphics[_0xfd0cf6(0x6b3)]-_0x2c2f60*0x2,_0x10f4ef=this[_0xfd0cf6(0x486)]();return new Rectangle(_0x2c2f60,_0x193a83,_0x4135a8,_0x10f4ef);},Scene_MenuBase['prototype'][_0x3b4dfd(0x377)]=function(){const _0x34cbc8=_0x3b4dfd,_0x3c9610=Graphics[_0x34cbc8(0x6b3)],_0x563f82=Window_ButtonAssist['prototype'][_0x34cbc8(0x2b8)](),_0xd9b550=0x0;let _0x379db0=0x0;return this[_0x34cbc8(0x971)]()===_0x34cbc8(0x615)?_0x379db0=0x0:_0x34cbc8(0x28e)!==_0x34cbc8(0x28e)?_0x56aad1=_0xbcdbc3[_0x34cbc8(0x9fc)]-_0x84d610:_0x379db0=Graphics[_0x34cbc8(0x9fc)]-_0x563f82,new Rectangle(_0xd9b550,_0x379db0,_0x3c9610,_0x563f82);},Scene_Menu['layoutSettings']=VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5af)]['MenuLayout'][_0x3b4dfd(0x3e1)],VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x782)]=Scene_Menu[_0x3b4dfd(0x396)][_0x3b4dfd(0x9bd)],Scene_Menu['prototype']['create']=function(){const _0x9bcac1=_0x3b4dfd;VisuMZ[_0x9bcac1(0x1bf)][_0x9bcac1(0x782)][_0x9bcac1(0x68e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Menu['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x370cb5=_0x3b4dfd;this[_0x370cb5(0x965)]&&this[_0x370cb5(0x965)]['setBackgroundType'](Scene_Menu[_0x370cb5(0x630)]['CommandBgType']),this[_0x370cb5(0x801)]&&this['_goldWindow'][_0x370cb5(0x3f2)](Scene_Menu['layoutSettings'][_0x370cb5(0x66a)]),this['_statusWindow']&&this[_0x370cb5(0x8bd)][_0x370cb5(0x3f2)](Scene_Menu[_0x370cb5(0x630)][_0x370cb5(0x792)]);},Scene_Menu[_0x3b4dfd(0x396)][_0x3b4dfd(0x4ce)]=function(){const _0x323b42=_0x3b4dfd;return Scene_Menu[_0x323b42(0x630)][_0x323b42(0x181)]['call'](this);},Scene_Menu[_0x3b4dfd(0x396)][_0x3b4dfd(0x34c)]=function(){const _0x11c7fa=_0x3b4dfd;return Scene_Menu[_0x11c7fa(0x630)][_0x11c7fa(0x7ea)][_0x11c7fa(0x68e)](this);},Scene_Menu[_0x3b4dfd(0x396)][_0x3b4dfd(0x2e7)]=function(){const _0x5de0e4=_0x3b4dfd;return Scene_Menu['layoutSettings']['StatusRect'][_0x5de0e4(0x68e)](this);},Scene_Item[_0x3b4dfd(0x630)]=VisuMZ['CoreEngine']['Settings'][_0x3b4dfd(0x2ab)]['ItemMenu'],VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5a8)]=Scene_Item[_0x3b4dfd(0x396)]['create'],Scene_Item[_0x3b4dfd(0x396)][_0x3b4dfd(0x9bd)]=function(){const _0x8efadf=_0x3b4dfd;VisuMZ[_0x8efadf(0x1bf)][_0x8efadf(0x5a8)][_0x8efadf(0x68e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item[_0x3b4dfd(0x396)][_0x3b4dfd(0x3c0)]=function(){const _0x4fe7f6=_0x3b4dfd;this['_helpWindow']&&(_0x4fe7f6(0x8be)!=='dHzhy'?this[_0x4fe7f6(0x306)][_0x4fe7f6(0x3f2)](Scene_Item[_0x4fe7f6(0x630)]['HelpBgType']):_0x582de0['keyMapper'][0x52]='dashToggle');this[_0x4fe7f6(0x7a8)]&&(_0x4fe7f6(0x94b)!==_0x4fe7f6(0x94b)?(_0xb4be20[_0x4fe7f6(0x1bf)][_0x4fe7f6(0x4dd)]['call'](this),this[_0x4fe7f6(0x3c0)]()):this[_0x4fe7f6(0x7a8)][_0x4fe7f6(0x3f2)](Scene_Item[_0x4fe7f6(0x630)][_0x4fe7f6(0x945)]));if(this[_0x4fe7f6(0x7d8)]){if('nfzLf'!==_0x4fe7f6(0x2aa))this['_itemWindow'][_0x4fe7f6(0x3f2)](Scene_Item[_0x4fe7f6(0x630)][_0x4fe7f6(0x80b)]);else{const _0x4c3eff=_0x4fe7f6(0x1ec);this[_0x4fe7f6(0x5d4)]=this[_0x4fe7f6(0x5d4)]||{};if(this[_0x4fe7f6(0x5d4)][_0x4c3eff])return this[_0x4fe7f6(0x5d4)][_0x4c3eff];const _0x26933f=_0x5ab7ae[_0x4fe7f6(0x1bf)][_0x4fe7f6(0x5af)][_0x4fe7f6(0x9f4)]['ColorTPGauge1'];return this[_0x4fe7f6(0x9df)](_0x4c3eff,_0x26933f);}}this[_0x4fe7f6(0x7b6)]&&(_0x4fe7f6(0x663)==='aaaqe'?this[_0x4fe7f6(0x7b6)][_0x4fe7f6(0x3f2)](Scene_Item[_0x4fe7f6(0x630)][_0x4fe7f6(0x848)]):_0x3be33c['CoreEngine'][_0x4fe7f6(0x5ad)][_0x4fe7f6(0x68e)](this,_0x298260));},Scene_Item['prototype'][_0x3b4dfd(0x93e)]=function(){const _0x411261=_0x3b4dfd;return Scene_Item['layoutSettings'][_0x411261(0x690)][_0x411261(0x68e)](this);},Scene_Item['prototype'][_0x3b4dfd(0x4f5)]=function(){const _0x3d32ce=_0x3b4dfd;return Scene_Item[_0x3d32ce(0x630)]['CategoryRect'][_0x3d32ce(0x68e)](this);},Scene_Item[_0x3b4dfd(0x396)][_0x3b4dfd(0x286)]=function(){const _0x21e819=_0x3b4dfd;return Scene_Item['layoutSettings']['ItemRect'][_0x21e819(0x68e)](this);},Scene_Item[_0x3b4dfd(0x396)][_0x3b4dfd(0x372)]=function(){const _0x1b10f7=_0x3b4dfd;return Scene_Item[_0x1b10f7(0x630)][_0x1b10f7(0x770)][_0x1b10f7(0x68e)](this);},Scene_Skill['layoutSettings']=VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5af)][_0x3b4dfd(0x2ab)][_0x3b4dfd(0x36d)],VisuMZ[_0x3b4dfd(0x1bf)]['Scene_Skill_create']=Scene_Skill[_0x3b4dfd(0x396)][_0x3b4dfd(0x9bd)],Scene_Skill[_0x3b4dfd(0x396)][_0x3b4dfd(0x9bd)]=function(){const _0x35d719=_0x3b4dfd;VisuMZ['CoreEngine']['Scene_Skill_create'][_0x35d719(0x68e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill[_0x3b4dfd(0x396)][_0x3b4dfd(0x3c0)]=function(){const _0x3c179e=_0x3b4dfd;this['_helpWindow']&&this[_0x3c179e(0x306)][_0x3c179e(0x3f2)](Scene_Skill['layoutSettings'][_0x3c179e(0x232)]);if(this[_0x3c179e(0x772)]){if(_0x3c179e(0x707)!==_0x3c179e(0x707))return _0x9e881f[_0x3c179e(0x1bf)][_0x3c179e(0x5af)][_0x3c179e(0x3da)][_0x3c179e(0x8cd)];else this[_0x3c179e(0x772)][_0x3c179e(0x3f2)](Scene_Skill['layoutSettings'][_0x3c179e(0x272)]);}if(this[_0x3c179e(0x8bd)]){if(_0x3c179e(0x580)!==_0x3c179e(0x6ad))this[_0x3c179e(0x8bd)][_0x3c179e(0x3f2)](Scene_Skill[_0x3c179e(0x630)][_0x3c179e(0x792)]);else return _0x312b5a[_0x3c179e(0x630)][_0x3c179e(0x9cb)][_0x3c179e(0x68e)](this);}this['_itemWindow']&&('kDkih'===_0x3c179e(0x493)?this[_0x3c179e(0x7d8)][_0x3c179e(0x3f2)](Scene_Skill['layoutSettings'][_0x3c179e(0x80b)]):(this[_0x3c179e(0x877)]['x']=this['_targetAnchor']['x'],this[_0x3c179e(0x877)]['y']=this[_0x3c179e(0x994)]['y'])),this[_0x3c179e(0x7b6)]&&this[_0x3c179e(0x7b6)][_0x3c179e(0x3f2)](Scene_Skill[_0x3c179e(0x630)][_0x3c179e(0x848)]);},Scene_Skill[_0x3b4dfd(0x396)][_0x3b4dfd(0x93e)]=function(){const _0x3de7d9=_0x3b4dfd;return Scene_Skill[_0x3de7d9(0x630)][_0x3de7d9(0x690)]['call'](this);},Scene_Skill['prototype']['skillTypeWindowRect']=function(){const _0x1ee9a0=_0x3b4dfd;return Scene_Skill['layoutSettings'][_0x1ee9a0(0x6f5)][_0x1ee9a0(0x68e)](this);},Scene_Skill[_0x3b4dfd(0x396)][_0x3b4dfd(0x2e7)]=function(){const _0x36b88b=_0x3b4dfd;return Scene_Skill[_0x36b88b(0x630)]['StatusRect'][_0x36b88b(0x68e)](this);},Scene_Skill[_0x3b4dfd(0x396)][_0x3b4dfd(0x286)]=function(){const _0x4e49c1=_0x3b4dfd;return Scene_Skill[_0x4e49c1(0x630)]['ItemRect'][_0x4e49c1(0x68e)](this);},Scene_Skill[_0x3b4dfd(0x396)][_0x3b4dfd(0x372)]=function(){const _0x283bda=_0x3b4dfd;return Scene_Skill[_0x283bda(0x630)]['ActorRect'][_0x283bda(0x68e)](this);},Scene_Equip[_0x3b4dfd(0x630)]=VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5af)][_0x3b4dfd(0x2ab)][_0x3b4dfd(0x694)],VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x52b)]=Scene_Equip['prototype'][_0x3b4dfd(0x9bd)],Scene_Equip[_0x3b4dfd(0x396)]['create']=function(){const _0x53ee50=_0x3b4dfd;VisuMZ[_0x53ee50(0x1bf)]['Scene_Equip_create'][_0x53ee50(0x68e)](this),this[_0x53ee50(0x3c0)]();},Scene_Equip[_0x3b4dfd(0x396)][_0x3b4dfd(0x3c0)]=function(){const _0x263f0a=_0x3b4dfd;if(this[_0x263f0a(0x306)]){if(_0x263f0a(0x966)!=='Ejokl')return _0x3aa278[_0x263f0a(0x630)]['StatusParamsRect'][_0x263f0a(0x68e)](this);else this['_helpWindow'][_0x263f0a(0x3f2)](Scene_Equip['layoutSettings'][_0x263f0a(0x232)]);}if(this[_0x263f0a(0x8bd)]){if('dEbbJ'===_0x263f0a(0x836))this[_0x263f0a(0x8bd)]['setBackgroundType'](Scene_Equip[_0x263f0a(0x630)][_0x263f0a(0x792)]);else{const _0x3b411e=_0x511b04[_0x263f0a(0x50c)]()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x263f0a(0x686)](_0x23e05a[_0x263f0a(0x50c)](),_0x70310d,_0x511096,_0x649218);}}this[_0x263f0a(0x965)]&&this['_commandWindow']['setBackgroundType'](Scene_Equip['layoutSettings'][_0x263f0a(0x39b)]),this[_0x263f0a(0x5f6)]&&this[_0x263f0a(0x5f6)]['setBackgroundType'](Scene_Equip[_0x263f0a(0x630)][_0x263f0a(0x722)]),this[_0x263f0a(0x7d8)]&&this[_0x263f0a(0x7d8)][_0x263f0a(0x3f2)](Scene_Equip['layoutSettings'][_0x263f0a(0x80b)]);},Scene_Equip[_0x3b4dfd(0x396)]['helpWindowRect']=function(){const _0x4cb603=_0x3b4dfd;return Scene_Equip[_0x4cb603(0x630)][_0x4cb603(0x690)][_0x4cb603(0x68e)](this);},Scene_Equip[_0x3b4dfd(0x396)][_0x3b4dfd(0x2e7)]=function(){const _0x13dcdb=_0x3b4dfd;return Scene_Equip[_0x13dcdb(0x630)][_0x13dcdb(0x9cb)][_0x13dcdb(0x68e)](this);},Scene_Equip[_0x3b4dfd(0x396)]['commandWindowRect']=function(){const _0x219a1b=_0x3b4dfd;return Scene_Equip[_0x219a1b(0x630)][_0x219a1b(0x181)]['call'](this);},Scene_Equip[_0x3b4dfd(0x396)][_0x3b4dfd(0x189)]=function(){const _0x2074ac=_0x3b4dfd;return Scene_Equip[_0x2074ac(0x630)][_0x2074ac(0x856)][_0x2074ac(0x68e)](this);},Scene_Equip[_0x3b4dfd(0x396)][_0x3b4dfd(0x286)]=function(){const _0x1f6558=_0x3b4dfd;return Scene_Equip[_0x1f6558(0x630)][_0x1f6558(0x411)][_0x1f6558(0x68e)](this);},Scene_Status[_0x3b4dfd(0x630)]=VisuMZ['CoreEngine'][_0x3b4dfd(0x5af)]['MenuLayout']['StatusMenu'],VisuMZ[_0x3b4dfd(0x1bf)]['Scene_Status_create']=Scene_Status['prototype'][_0x3b4dfd(0x9bd)],Scene_Status[_0x3b4dfd(0x396)]['create']=function(){const _0x5d8a39=_0x3b4dfd;VisuMZ['CoreEngine'][_0x5d8a39(0x196)][_0x5d8a39(0x68e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Status[_0x3b4dfd(0x396)][_0x3b4dfd(0x3c0)]=function(){const _0x5a7d53=_0x3b4dfd;this['_profileWindow']&&this['_profileWindow'][_0x5a7d53(0x3f2)](Scene_Status[_0x5a7d53(0x630)][_0x5a7d53(0x852)]);if(this[_0x5a7d53(0x8bd)]){if(_0x5a7d53(0x517)===_0x5a7d53(0x861))return _0x5422ec[_0x5a7d53(0x1bf)][_0x5a7d53(0x5af)]['Color'][_0x5a7d53(0x7f5)];else this[_0x5a7d53(0x8bd)][_0x5a7d53(0x3f2)](Scene_Status[_0x5a7d53(0x630)][_0x5a7d53(0x792)]);}this[_0x5a7d53(0x327)]&&('phCkw'!==_0x5a7d53(0x2df)?this[_0x5a7d53(0x327)]['setBackgroundType'](Scene_Status[_0x5a7d53(0x630)][_0x5a7d53(0x42b)]):this[_0x5a7d53(0x45c)]&&this[_0x5a7d53(0x45c)]()),this[_0x5a7d53(0x68d)]&&this['_statusEquipWindow'][_0x5a7d53(0x3f2)](Scene_Status[_0x5a7d53(0x630)][_0x5a7d53(0x768)]);},Scene_Status[_0x3b4dfd(0x396)][_0x3b4dfd(0x1b8)]=function(){const _0x1b7cd8=_0x3b4dfd;return Scene_Status[_0x1b7cd8(0x630)]['ProfileRect'][_0x1b7cd8(0x68e)](this);},Scene_Status[_0x3b4dfd(0x396)][_0x3b4dfd(0x2e7)]=function(){const _0x385780=_0x3b4dfd;return Scene_Status[_0x385780(0x630)][_0x385780(0x9cb)][_0x385780(0x68e)](this);},Scene_Status['prototype'][_0x3b4dfd(0x5b0)]=function(){const _0x1157e3=_0x3b4dfd;return Scene_Status['layoutSettings'][_0x1157e3(0x3f7)]['call'](this);},Scene_Status[_0x3b4dfd(0x396)][_0x3b4dfd(0x2f9)]=function(){const _0x24b908=_0x3b4dfd;return Scene_Status[_0x24b908(0x630)]['StatusEquipRect'][_0x24b908(0x68e)](this);},Scene_Options[_0x3b4dfd(0x630)]=VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5af)][_0x3b4dfd(0x2ab)][_0x3b4dfd(0x625)],VisuMZ['CoreEngine']['Scene_Options_create']=Scene_Options[_0x3b4dfd(0x396)][_0x3b4dfd(0x9bd)],Scene_Options['prototype']['create']=function(){const _0x2215ef=_0x3b4dfd;VisuMZ[_0x2215ef(0x1bf)][_0x2215ef(0x4dd)][_0x2215ef(0x68e)](this),this[_0x2215ef(0x3c0)]();},Scene_Options[_0x3b4dfd(0x396)]['setCoreEngineUpdateWindowBg']=function(){const _0x3e373e=_0x3b4dfd;this['_optionsWindow']&&this['_optionsWindow'][_0x3e373e(0x3f2)](Scene_Options['layoutSettings'][_0x3e373e(0x1aa)]);},Scene_Options[_0x3b4dfd(0x396)][_0x3b4dfd(0x3ce)]=function(){const _0x280be8=_0x3b4dfd;return Scene_Options['layoutSettings'][_0x280be8(0x34e)]['call'](this);},Scene_Save['layoutSettings']=VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5af)][_0x3b4dfd(0x2ab)][_0x3b4dfd(0x708)],Scene_Save[_0x3b4dfd(0x396)][_0x3b4dfd(0x9bd)]=function(){const _0x59ff7c=_0x3b4dfd;Scene_File[_0x59ff7c(0x396)]['create'][_0x59ff7c(0x68e)](this),this[_0x59ff7c(0x3c0)]();},Scene_Save[_0x3b4dfd(0x396)][_0x3b4dfd(0x3c0)]=function(){const _0x20fac4=_0x3b4dfd;this['_helpWindow']&&this['_helpWindow'][_0x20fac4(0x3f2)](Scene_Save[_0x20fac4(0x630)]['HelpBgType']),this['_listWindow']&&this[_0x20fac4(0x387)]['setBackgroundType'](Scene_Save[_0x20fac4(0x630)][_0x20fac4(0x6c1)]);},Scene_Save['prototype']['helpWindowRect']=function(){const _0x31c4f2=_0x3b4dfd;return Scene_Save[_0x31c4f2(0x630)]['HelpRect'][_0x31c4f2(0x68e)](this);},Scene_Save[_0x3b4dfd(0x396)][_0x3b4dfd(0x6c7)]=function(){const _0x4f13b4=_0x3b4dfd;return Scene_Save[_0x4f13b4(0x630)][_0x4f13b4(0x8d6)][_0x4f13b4(0x68e)](this);},Scene_Load[_0x3b4dfd(0x630)]=VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5af)][_0x3b4dfd(0x2ab)][_0x3b4dfd(0x8a4)],Scene_Load[_0x3b4dfd(0x396)][_0x3b4dfd(0x9bd)]=function(){const _0x1d1106=_0x3b4dfd;Scene_File[_0x1d1106(0x396)][_0x1d1106(0x9bd)][_0x1d1106(0x68e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load[_0x3b4dfd(0x396)][_0x3b4dfd(0x3c0)]=function(){const _0x5d3ac7=_0x3b4dfd;this[_0x5d3ac7(0x306)]&&(_0x5d3ac7(0x679)===_0x5d3ac7(0x244)?(_0xb1fde7+='\x0a',_0x1256d8+=_0x59e6d9['parameters'][0x0]):this[_0x5d3ac7(0x306)][_0x5d3ac7(0x3f2)](Scene_Load['layoutSettings'][_0x5d3ac7(0x232)]));if(this[_0x5d3ac7(0x387)]){if(_0x5d3ac7(0x31d)!==_0x5d3ac7(0x31d))return _0x484c0f['CoreEngine'][_0x5d3ac7(0x4fa)][_0x5d3ac7(0x68e)](this,_0x4545b0);else this['_listWindow'][_0x5d3ac7(0x3f2)](Scene_Load['layoutSettings'][_0x5d3ac7(0x6c1)]);}},Scene_Load[_0x3b4dfd(0x396)][_0x3b4dfd(0x93e)]=function(){const _0x31c7aa=_0x3b4dfd;return Scene_Load[_0x31c7aa(0x630)]['HelpRect'][_0x31c7aa(0x68e)](this);},Scene_Load['prototype']['listWindowRect']=function(){const _0xe2d873=_0x3b4dfd;return Scene_Load[_0xe2d873(0x630)]['ListRect']['call'](this);},Scene_GameEnd[_0x3b4dfd(0x630)]=VisuMZ[_0x3b4dfd(0x1bf)]['Settings'][_0x3b4dfd(0x2ab)][_0x3b4dfd(0x85b)],VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x739)]=Scene_GameEnd['prototype'][_0x3b4dfd(0xa17)],Scene_GameEnd['prototype'][_0x3b4dfd(0xa17)]=function(){const _0x21c533=_0x3b4dfd;Scene_MenuBase[_0x21c533(0x396)]['createBackground']['call'](this);},Scene_GameEnd[_0x3b4dfd(0x396)][_0x3b4dfd(0x771)]=function(){const _0x27b3a8=_0x3b4dfd,_0x2805a5=this['commandWindowRect']();this[_0x27b3a8(0x965)]=new Window_GameEnd(_0x2805a5),this['_commandWindow']['setHandler'](_0x27b3a8(0x4cc),this['popScene'][_0x27b3a8(0x2bd)](this)),this['addWindow'](this[_0x27b3a8(0x965)]),this[_0x27b3a8(0x965)][_0x27b3a8(0x3f2)](Scene_GameEnd[_0x27b3a8(0x630)]['CommandBgType']);},Scene_GameEnd[_0x3b4dfd(0x396)][_0x3b4dfd(0x4ce)]=function(){const _0xfef907=_0x3b4dfd;return Scene_GameEnd[_0xfef907(0x630)][_0xfef907(0x181)][_0xfef907(0x68e)](this);},Scene_Shop['layoutSettings']=VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5af)][_0x3b4dfd(0x2ab)][_0x3b4dfd(0x775)],VisuMZ['CoreEngine'][_0x3b4dfd(0x392)]=Scene_Shop[_0x3b4dfd(0x396)]['create'],Scene_Shop[_0x3b4dfd(0x396)]['create']=function(){const _0x240517=_0x3b4dfd;VisuMZ['CoreEngine'][_0x240517(0x392)][_0x240517(0x68e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Shop[_0x3b4dfd(0x396)][_0x3b4dfd(0x3c0)]=function(){const _0xf112db=_0x3b4dfd;this['_helpWindow']&&(_0xf112db(0x718)!==_0xf112db(0x718)?(_0x34512b<_0x47070b-_0x571b88||_0x36be0a&&_0xea6c76===0x1)&&this[_0xf112db(0x5fc)]((_0x33d72a+_0x334741)%_0x4af776):this['_helpWindow'][_0xf112db(0x3f2)](Scene_Shop[_0xf112db(0x630)]['HelpBgType']));this[_0xf112db(0x801)]&&this[_0xf112db(0x801)][_0xf112db(0x3f2)](Scene_Shop['layoutSettings'][_0xf112db(0x66a)]);if(this[_0xf112db(0x965)]){if(_0xf112db(0x2c2)!=='ticCg')this[_0xf112db(0x965)][_0xf112db(0x3f2)](Scene_Shop[_0xf112db(0x630)][_0xf112db(0x39b)]);else return _0x1a2823[_0xf112db(0x1bf)]['Game_Action_numRepeats'][_0xf112db(0x68e)](this);}if(this['_dummyWindow']){if(_0xf112db(0x192)===_0xf112db(0x4ee)){const _0x24d591=this[_0xf112db(0x8d0)]();return _0x24d591['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0xf112db(0xa1a)](_0x24d591):_0xd3bf88[_0xf112db(0x1bf)][_0xf112db(0x9d5)]['call'](this,_0x32484a);}else this[_0xf112db(0x83b)][_0xf112db(0x3f2)](Scene_Shop['layoutSettings'][_0xf112db(0x6ca)]);}if(this[_0xf112db(0x2bf)]){if('IAweH'===_0xf112db(0x401))this[_0xf112db(0x2bf)]['setBackgroundType'](Scene_Shop[_0xf112db(0x630)]['NumberBgType']);else{if(_0x420f86)throw _0x16f31a;else _0x3931a4&&_0x59b1a5(_0xf112db(0x29e)[_0xf112db(0x4f9)](_0x4b9084));}}if(this[_0xf112db(0x8bd)]){if('FqctJ'===_0xf112db(0x41a))this['_statusWindow'][_0xf112db(0x3f2)](Scene_Shop[_0xf112db(0x630)][_0xf112db(0x792)]);else{if(this[_0xf112db(0x9b0)])this[_0xf112db(0x38f)]['endAction'](this[_0xf112db(0x9b0)]);this[_0xf112db(0x978)]=_0xf112db(0x71a),this[_0xf112db(0x9b0)]&&this[_0xf112db(0x9b0)]['numActions']()===0x0&&(this[_0xf112db(0x822)](this[_0xf112db(0x9b0)]),this[_0xf112db(0x9b0)]=null);}}this[_0xf112db(0x7a5)]&&this[_0xf112db(0x7a5)][_0xf112db(0x3f2)](Scene_Shop[_0xf112db(0x630)][_0xf112db(0x5d3)]);this[_0xf112db(0x7a8)]&&this['_categoryWindow'][_0xf112db(0x3f2)](Scene_Shop[_0xf112db(0x630)][_0xf112db(0x945)]);if(this[_0xf112db(0x29f)]){if('ccMzS'!==_0xf112db(0x9e0))this['_sellWindow']['setBackgroundType'](Scene_Shop[_0xf112db(0x630)][_0xf112db(0x937)]);else return this['_lastGamepad']?this[_0xf112db(0x95b)]['id']:_0xf112db(0x865);}},Scene_Shop[_0x3b4dfd(0x396)]['helpWindowRect']=function(){const _0xfbab30=_0x3b4dfd;return Scene_Shop[_0xfbab30(0x630)]['HelpRect']['call'](this);},Scene_Shop[_0x3b4dfd(0x396)][_0x3b4dfd(0x34c)]=function(){const _0xc169ff=_0x3b4dfd;return Scene_Shop[_0xc169ff(0x630)][_0xc169ff(0x7ea)][_0xc169ff(0x68e)](this);},Scene_Shop[_0x3b4dfd(0x396)][_0x3b4dfd(0x4ce)]=function(){const _0x48eb3f=_0x3b4dfd;return Scene_Shop[_0x48eb3f(0x630)][_0x48eb3f(0x181)][_0x48eb3f(0x68e)](this);},Scene_Shop[_0x3b4dfd(0x396)]['dummyWindowRect']=function(){const _0x52f4ab=_0x3b4dfd;return Scene_Shop[_0x52f4ab(0x630)][_0x52f4ab(0x40e)]['call'](this);},Scene_Shop[_0x3b4dfd(0x396)]['numberWindowRect']=function(){const _0x4a8d2f=_0x3b4dfd;return Scene_Shop[_0x4a8d2f(0x630)][_0x4a8d2f(0x23d)][_0x4a8d2f(0x68e)](this);},Scene_Shop[_0x3b4dfd(0x396)]['statusWindowRect']=function(){const _0x3589f4=_0x3b4dfd;return Scene_Shop[_0x3589f4(0x630)][_0x3589f4(0x9cb)]['call'](this);},Scene_Shop['prototype'][_0x3b4dfd(0x58a)]=function(){const _0xf57901=_0x3b4dfd;return Scene_Shop[_0xf57901(0x630)]['BuyRect'][_0xf57901(0x68e)](this);},Scene_Shop[_0x3b4dfd(0x396)]['categoryWindowRect']=function(){const _0x59b27d=_0x3b4dfd;return Scene_Shop[_0x59b27d(0x630)][_0x59b27d(0x3bb)][_0x59b27d(0x68e)](this);},Scene_Shop[_0x3b4dfd(0x396)][_0x3b4dfd(0x359)]=function(){const _0x47c5d5=_0x3b4dfd;return Scene_Shop['layoutSettings'][_0x47c5d5(0x5c3)]['call'](this);},Scene_Name[_0x3b4dfd(0x630)]=VisuMZ[_0x3b4dfd(0x1bf)]['Settings'][_0x3b4dfd(0x2ab)][_0x3b4dfd(0xa0e)],VisuMZ[_0x3b4dfd(0x1bf)]['Scene_Name_create']=Scene_Name[_0x3b4dfd(0x396)][_0x3b4dfd(0x9bd)],Scene_Name[_0x3b4dfd(0x396)][_0x3b4dfd(0x9bd)]=function(){const _0x21593c=_0x3b4dfd;VisuMZ[_0x21593c(0x1bf)][_0x21593c(0x51c)]['call'](this),this[_0x21593c(0x3c0)]();},Scene_Name[_0x3b4dfd(0x396)][_0x3b4dfd(0x3c0)]=function(){const _0x518313=_0x3b4dfd;this[_0x518313(0x63a)]&&(_0x518313(0x305)==='YHwCN'?this[_0x518313(0x918)]-=_0x44d58c[_0x518313(0x9d3)]((_0x245916[_0x518313(0x2d3)]-_0x4b7d75[_0x518313(0x6b3)])/0x2):this['_editWindow'][_0x518313(0x3f2)](Scene_Name[_0x518313(0x630)]['EditBgType'])),this['_inputWindow']&&this[_0x518313(0x779)]['setBackgroundType'](Scene_Name['layoutSettings'][_0x518313(0x1dc)]);},Scene_Name[_0x3b4dfd(0x396)][_0x3b4dfd(0x1c6)]=function(){return 0x0;},Scene_Name[_0x3b4dfd(0x396)]['editWindowRect']=function(){const _0x43baa7=_0x3b4dfd;return Scene_Name[_0x43baa7(0x630)][_0x43baa7(0x39a)][_0x43baa7(0x68e)](this);},Scene_Name[_0x3b4dfd(0x396)]['inputWindowRect']=function(){const _0x81380c=_0x3b4dfd;return Scene_Name['layoutSettings'][_0x81380c(0x2f4)][_0x81380c(0x68e)](this);},Scene_Name[_0x3b4dfd(0x396)][_0x3b4dfd(0x778)]=function(){const _0x32fa6d=_0x3b4dfd;if(!this[_0x32fa6d(0x779)])return![];return VisuMZ[_0x32fa6d(0x1bf)][_0x32fa6d(0x5af)]['KeyboardInput'][_0x32fa6d(0x778)];},Scene_Name['prototype']['buttonAssistKey1']=function(){const _0x55245f=_0x3b4dfd;if(this['EnableNameInput']()){if('yCAAS'===_0x55245f(0x826))return TextManager[_0x55245f(0x6ef)]('tab');else this['drawIcon'](_0xe30cfc,_0x2e0eb8+0x2,_0x5b9fae+0x2),_0x1fea98-=_0x151020['iconWidth']+0x4,_0x159f57+=_0x13eae1[_0x55245f(0x321)]+0x4;}else return Scene_MenuBase[_0x55245f(0x396)]['buttonAssistKey1']['call'](this);},Scene_Name[_0x3b4dfd(0x396)]['buttonAssistText1']=function(){const _0x556703=_0x3b4dfd;if(this[_0x556703(0x778)]()){const _0x3952e3=VisuMZ[_0x556703(0x1bf)][_0x556703(0x5af)][_0x556703(0x456)];return this[_0x556703(0x779)]['_mode']===_0x556703(0x961)?'RjktQ'===_0x556703(0x806)?_0x3952e3[_0x556703(0x865)]||_0x556703(0x865):'':_0x3952e3[_0x556703(0x8a8)]||'Manual';}else return Scene_MenuBase[_0x556703(0x396)][_0x556703(0x4b8)]['call'](this);},VisuMZ['CoreEngine'][_0x3b4dfd(0x927)]=Scene_Name['prototype']['onInputOk'],Scene_Name[_0x3b4dfd(0x396)][_0x3b4dfd(0x3fc)]=function(){const _0x4c036f=_0x3b4dfd;this['doesNameContainBannedWords']()?this[_0x4c036f(0x341)]():VisuMZ[_0x4c036f(0x1bf)][_0x4c036f(0x927)][_0x4c036f(0x68e)](this);},Scene_Name[_0x3b4dfd(0x396)][_0x3b4dfd(0x5f8)]=function(){const _0x47e3a4=_0x3b4dfd,_0x409c7c=VisuMZ[_0x47e3a4(0x1bf)][_0x47e3a4(0x5af)][_0x47e3a4(0x456)];if(!_0x409c7c)return![];const _0x577517=_0x409c7c['BannedWords'];if(!_0x577517)return![];const _0xc6ee5b=this[_0x47e3a4(0x63a)][_0x47e3a4(0x926)]()[_0x47e3a4(0x1ea)]();for(const _0x1650c3 of _0x577517){if(_0xc6ee5b[_0x47e3a4(0x5e6)](_0x1650c3[_0x47e3a4(0x1ea)]()))return!![];}return![];},Scene_Name[_0x3b4dfd(0x396)][_0x3b4dfd(0x341)]=function(){const _0x1b24ee=_0x3b4dfd;SoundManager[_0x1b24ee(0x510)]();},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x518)]=Scene_Battle[_0x3b4dfd(0x396)]['update'],Scene_Battle['prototype'][_0x3b4dfd(0x933)]=function(){const _0x512302=_0x3b4dfd;VisuMZ[_0x512302(0x1bf)]['Scene_Battle_update'][_0x512302(0x68e)](this);if($gameTemp[_0x512302(0x709)])this['updatePlayTestF7']();},Scene_Battle[_0x3b4dfd(0x396)][_0x3b4dfd(0x83c)]=function(){const _0x5f3c81=_0x3b4dfd;!BattleManager[_0x5f3c81(0x9ab)]()&&!this[_0x5f3c81(0x30d)]&&!$gameMessage['isBusy']()&&(_0x5f3c81(0x820)===_0x5f3c81(0x820)?(this[_0x5f3c81(0x30d)]=!![],this[_0x5f3c81(0x933)](),SceneManager[_0x5f3c81(0x4e5)](),this[_0x5f3c81(0x30d)]=![]):(this['_anchor']=_0xf55cf9,this['_targetAnchor']=_0x542ea5[_0x5f3c81(0x7a0)](this[_0x5f3c81(0x877)])));},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x51a)]=Scene_Battle[_0x3b4dfd(0x396)][_0x3b4dfd(0x19d)],Scene_Battle[_0x3b4dfd(0x396)][_0x3b4dfd(0x19d)]=function(){const _0x24653b=_0x3b4dfd;VisuMZ['CoreEngine'][_0x24653b(0x51a)]['call'](this),SceneManager['isSideButtonLayout']()&&this[_0x24653b(0x393)]();},Scene_Battle['prototype'][_0x3b4dfd(0x393)]=function(){const _0x7830be=_0x3b4dfd;this[_0x7830be(0x5c8)]['x']=Graphics[_0x7830be(0x6b3)]+0x4;if(this[_0x7830be(0x371)]()){if(_0x7830be(0x2e9)==='LypQq'){let _0x4e41c8=_0x2e5043[_0x7830be(0x7cb)],_0x2ea73e=_0x4e41c8[_0x7830be(0xa16)];for(let _0x3df7ba=0x0;_0x3df7ba<_0x2ea73e;++_0x3df7ba){this[_0x7830be(0x63a)][_0x7830be(0x8e6)](_0x4e41c8[_0x3df7ba])?_0x186abb['playOk']():_0x4e5749[_0x7830be(0x510)]();}_0x25d41f[_0x7830be(0x670)]();}else this[_0x7830be(0x5c8)]['y']=Graphics['boxHeight']-this[_0x7830be(0x486)]();}else this[_0x7830be(0x5c8)]['y']=0x0;},VisuMZ['CoreEngine'][_0x3b4dfd(0x1d0)]=Sprite_Button['prototype']['initialize'],Sprite_Button[_0x3b4dfd(0x396)][_0x3b4dfd(0x24b)]=function(_0x39c161){const _0x4549c9=_0x3b4dfd;VisuMZ[_0x4549c9(0x1bf)][_0x4549c9(0x1d0)][_0x4549c9(0x68e)](this,_0x39c161),this[_0x4549c9(0x498)]();},Sprite_Button['prototype'][_0x3b4dfd(0x498)]=function(){const _0x57be61=_0x3b4dfd,_0x564aba=VisuMZ[_0x57be61(0x1bf)][_0x57be61(0x5af)]['UI'];this['_isButtonHidden']=![];switch(this[_0x57be61(0x509)]){case _0x57be61(0x4cc):this[_0x57be61(0x9a1)]=!_0x564aba[_0x57be61(0x60a)];break;case'pageup':case'pagedown':this[_0x57be61(0x9a1)]=!_0x564aba[_0x57be61(0x843)];break;case _0x57be61(0x86a):case'up':case'down2':case _0x57be61(0x6a6):case'ok':this[_0x57be61(0x9a1)]=!_0x564aba[_0x57be61(0x37a)];break;case _0x57be61(0x9a4):this[_0x57be61(0x9a1)]=!_0x564aba['menuShowButton'];break;}},VisuMZ['CoreEngine'][_0x3b4dfd(0x3e6)]=Sprite_Button[_0x3b4dfd(0x396)][_0x3b4dfd(0x97d)],Sprite_Button[_0x3b4dfd(0x396)][_0x3b4dfd(0x97d)]=function(){const _0x1d5eeb=_0x3b4dfd;SceneManager[_0x1d5eeb(0x943)]()||this[_0x1d5eeb(0x9a1)]?this[_0x1d5eeb(0x7bf)]():_0x1d5eeb(0x5f3)===_0x1d5eeb(0x5f3)?VisuMZ[_0x1d5eeb(0x1bf)][_0x1d5eeb(0x3e6)][_0x1d5eeb(0x68e)](this):_0x54850f[_0x1d5eeb(0x1bf)]['Game_Interpreter_command111'][_0x1d5eeb(0x68e)](this,_0x5498bf);},Sprite_Button[_0x3b4dfd(0x396)][_0x3b4dfd(0x7bf)]=function(){const _0x449158=_0x3b4dfd;this[_0x449158(0xa11)]=![],this[_0x449158(0x413)]=0x0,this['x']=Graphics[_0x449158(0x2d3)]*0xa,this['y']=Graphics[_0x449158(0x2c8)]*0xa;},VisuMZ['CoreEngine']['Sprite_Battler_startMove']=Sprite_Battler[_0x3b4dfd(0x396)][_0x3b4dfd(0x2fd)],Sprite_Battler[_0x3b4dfd(0x396)]['startMove']=function(_0x320597,_0x447a66,_0x5314bc){const _0x4fdd97=_0x3b4dfd;(this[_0x4fdd97(0x369)]!==_0x320597||this[_0x4fdd97(0x68a)]!==_0x447a66)&&(_0x4fdd97(0x6e4)==='PRCNO'?_0xab1a83(_0xd0eb3e):(this[_0x4fdd97(0x6a0)](_0x4fdd97(0x48d)),this[_0x4fdd97(0x561)]=_0x5314bc)),VisuMZ['CoreEngine'][_0x4fdd97(0x5ef)][_0x4fdd97(0x68e)](this,_0x320597,_0x447a66,_0x5314bc);},Sprite_Battler[_0x3b4dfd(0x396)][_0x3b4dfd(0x6a0)]=function(_0x26a3c9){this['_moveEasingType']=_0x26a3c9;},Sprite_Battler[_0x3b4dfd(0x396)][_0x3b4dfd(0x3b9)]=function(){const _0x59c7c0=_0x3b4dfd;if(this[_0x59c7c0(0x1da)]<=0x0)return;const _0x36dd5a=this['_movementDuration'],_0x55350d=this[_0x59c7c0(0x561)],_0x24d8ef=this[_0x59c7c0(0x6b9)];this[_0x59c7c0(0x713)]=this['applyEasing'](this[_0x59c7c0(0x713)],this[_0x59c7c0(0x369)],_0x36dd5a,_0x55350d,_0x24d8ef),this['_offsetY']=this[_0x59c7c0(0x3cd)](this[_0x59c7c0(0xa0a)],this['_targetOffsetY'],_0x36dd5a,_0x55350d,_0x24d8ef),this[_0x59c7c0(0x1da)]--;if(this[_0x59c7c0(0x1da)]<=0x0)this['onMoveEnd']();},Sprite_Battler[_0x3b4dfd(0x396)][_0x3b4dfd(0x3cd)]=function(_0x4d00a6,_0xbba73d,_0x10de88,_0x302b2c,_0x4055ce){const _0x3ae43b=_0x3b4dfd,_0x45383c=VisuMZ[_0x3ae43b(0x511)]((_0x302b2c-_0x10de88)/_0x302b2c,_0x4055ce||'Linear'),_0x2373db=VisuMZ[_0x3ae43b(0x511)]((_0x302b2c-_0x10de88+0x1)/_0x302b2c,_0x4055ce||_0x3ae43b(0x48d)),_0x5bd5cf=(_0x4d00a6-_0xbba73d*_0x45383c)/(0x1-_0x45383c);return _0x5bd5cf+(_0xbba73d-_0x5bd5cf)*_0x2373db;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x8aa)]=Sprite_Actor[_0x3b4dfd(0x396)]['setActorHome'],Sprite_Actor['prototype'][_0x3b4dfd(0x2fb)]=function(_0xba9f27){const _0x3004ef=_0x3b4dfd;VisuMZ[_0x3004ef(0x1bf)][_0x3004ef(0x5af)]['UI'][_0x3004ef(0x734)]?this[_0x3004ef(0x833)](_0xba9f27):VisuMZ['CoreEngine'][_0x3004ef(0x8aa)]['call'](this,_0xba9f27);},Sprite_Actor[_0x3b4dfd(0x396)][_0x3b4dfd(0x833)]=function(_0x17b6bd){const _0x191b5d=_0x3b4dfd;let _0x1f292e=Math[_0x191b5d(0x355)](Graphics[_0x191b5d(0x2d3)]/0x2+0xc0);_0x1f292e-=Math['floor']((Graphics['width']-Graphics[_0x191b5d(0x6b3)])/0x2),_0x1f292e+=_0x17b6bd*0x20;let _0x1f6c3b=Graphics[_0x191b5d(0x2c8)]-0xc8-$gameParty[_0x191b5d(0x742)]()*0x30;_0x1f6c3b-=Math[_0x191b5d(0x9d3)]((Graphics[_0x191b5d(0x2c8)]-Graphics[_0x191b5d(0x9fc)])/0x2),_0x1f6c3b+=_0x17b6bd*0x30,this[_0x191b5d(0x49e)](_0x1f292e,_0x1f6c3b);},Sprite_Actor[_0x3b4dfd(0x396)][_0x3b4dfd(0x7ed)]=function(){const _0x5787fd=_0x3b4dfd;this[_0x5787fd(0x2fd)](0x4b0,0x0,0x78);},Sprite_Animation['prototype']['setMute']=function(_0x19cb82){this['_muteSound']=_0x19cb82;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x9f8)]=Sprite_Animation['prototype'][_0x3b4dfd(0xa02)],Sprite_Animation[_0x3b4dfd(0x396)][_0x3b4dfd(0xa02)]=function(){const _0xcee7fe=_0x3b4dfd;if(this['_muteSound'])return;VisuMZ[_0xcee7fe(0x1bf)][_0xcee7fe(0x9f8)][_0xcee7fe(0x68e)](this);},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x855)]=Sprite_Animation[_0x3b4dfd(0x396)]['setViewport'],Sprite_Animation[_0x3b4dfd(0x396)]['setViewport']=function(_0x3522a6){const _0x28c7a4=_0x3b4dfd;this[_0x28c7a4(0x4bd)]()?this[_0x28c7a4(0x9a7)](_0x3522a6):VisuMZ[_0x28c7a4(0x1bf)][_0x28c7a4(0x855)][_0x28c7a4(0x68e)](this,_0x3522a6);},Sprite_Animation[_0x3b4dfd(0x396)]['isAnimationOffsetXMirrored']=function(){const _0x2e5678=_0x3b4dfd;if(!this[_0x2e5678(0x290)])return![];const _0x3c652e=this['_animation']['name']||'';if(_0x3c652e[_0x2e5678(0x7b5)](/<MIRROR OFFSET X>/i))return!![];if(_0x3c652e[_0x2e5678(0x7b5)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x2e5678(0x1bf)]['Settings'][_0x2e5678(0x38a)]['AnimationMirrorOffset'];},Sprite_Animation[_0x3b4dfd(0x396)]['setViewportCoreEngineFix']=function(_0x27b5d6){const _0x3643e2=_0x3b4dfd,_0x1147b4=this['_viewportSize'],_0x13dc2a=this[_0x3643e2(0x4da)],_0x20a341=this['_animation'][_0x3643e2(0x7ff)]*(this['_mirror']?-0x1:0x1)-_0x1147b4/0x2,_0x33c599=this['_animation'][_0x3643e2(0x5aa)]-_0x13dc2a/0x2,_0x1e80af=this['targetPosition'](_0x27b5d6);_0x27b5d6['gl']['viewport'](_0x20a341+_0x1e80af['x'],_0x33c599+_0x1e80af['y'],_0x1147b4,_0x13dc2a);},Sprite_Animation[_0x3b4dfd(0x396)][_0x3b4dfd(0x7e6)]=function(_0x3eb69e){const _0x234deb=_0x3b4dfd;if(_0x3eb69e['_mainSprite']){}const _0x1f3d83=this['_animation'][_0x234deb(0x926)];let _0x592e0b=_0x3eb69e['height']*_0x3eb69e[_0x234deb(0x979)]['y'],_0x4917de=0x0,_0x51b782=-_0x592e0b/0x2;if(_0x1f3d83[_0x234deb(0x7b5)](/<(?:HEAD|HEADER|TOP)>/i))_0x51b782=-_0x592e0b;if(_0x1f3d83['match'](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x51b782=0x0;if(this[_0x234deb(0x290)][_0x234deb(0x5b1)])_0x51b782=0x0;if(_0x1f3d83[_0x234deb(0x7b5)](/<(?:LEFT)>/i))_0x4917de=-_0x3eb69e[_0x234deb(0x2d3)]/0x2;if(_0x1f3d83[_0x234deb(0x7b5)](/<(?:RIGHT)>/i))_0x4917de=_0x3eb69e['width']/0x2;_0x1f3d83[_0x234deb(0x7b5)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x4917de=Number(RegExp['$1'])*_0x3eb69e['width']);if(_0x1f3d83[_0x234deb(0x7b5)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)){if(_0x234deb(0x5c0)==='EUqEe')_0x51b782=(0x1-Number(RegExp['$1']))*-_0x592e0b;else return _0x4ce32b;}_0x1f3d83[_0x234deb(0x7b5)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x4917de=Number(RegExp['$1'])*_0x3eb69e['width'],_0x51b782=(0x1-Number(RegExp['$2']))*-_0x592e0b);if(_0x1f3d83[_0x234deb(0x7b5)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x4917de+=Number(RegExp['$1']);if(_0x1f3d83[_0x234deb(0x7b5)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x51b782+=Number(RegExp['$1']);_0x1f3d83[_0x234deb(0x7b5)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x234deb(0x570)===_0x234deb(0x603)?_0x487fcd[_0x234deb(0x1bf)][_0x234deb(0x3ff)][_0x234deb(0x68e)](this,_0x207321):(_0x4917de+=Number(RegExp['$1']),_0x51b782+=Number(RegExp['$2'])));const _0x48d5e3=new Point(_0x4917de,_0x51b782);return _0x3eb69e[_0x234deb(0x32c)](),_0x3eb69e[_0x234deb(0x7a3)][_0x234deb(0x70a)](_0x48d5e3);},Sprite_AnimationMV[_0x3b4dfd(0x396)][_0x3b4dfd(0x221)]=function(){const _0x22742a=_0x3b4dfd;this[_0x22742a(0x642)]=VisuMZ[_0x22742a(0x1bf)][_0x22742a(0x5af)]['QoL'][_0x22742a(0x9c4)]??0x4,this[_0x22742a(0x4ff)](),this[_0x22742a(0x642)]=this[_0x22742a(0x642)][_0x22742a(0x1e1)](0x1,0xa);},Sprite_AnimationMV['prototype'][_0x3b4dfd(0x4ff)]=function(){const _0x5bc9e2=_0x3b4dfd;if(!this['_animation']);const _0x33a9e4=this['_animation']['name']||'';_0x33a9e4[_0x5bc9e2(0x7b5)](/<RATE:[ ](\d+)>/i)&&('gpOnc'!==_0x5bc9e2(0x789)?this['_rate']=(Number(RegExp['$1'])||0x1)['clamp'](0x1,0xa):this[_0x5bc9e2(0x5f6)]['setBackgroundType'](_0x385bce[_0x5bc9e2(0x630)][_0x5bc9e2(0x722)]));},Sprite_AnimationMV['prototype'][_0x3b4dfd(0x4f3)]=function(_0xef3cbb){const _0x36e9cc=_0x3b4dfd;this[_0x36e9cc(0x445)]=_0xef3cbb;},VisuMZ[_0x3b4dfd(0x1bf)]['Sprite_AnimationMV_processTimingData']=Sprite_AnimationMV[_0x3b4dfd(0x396)]['processTimingData'],Sprite_AnimationMV[_0x3b4dfd(0x396)]['processTimingData']=function(_0x3b0a17){const _0x3b5cd7=_0x3b4dfd;if(this[_0x3b5cd7(0x445)]){if(_0x3b5cd7(0x8c3)!==_0x3b5cd7(0x73f)){_0x3b0a17=JsonEx[_0x3b5cd7(0x7a0)](_0x3b0a17);if(_0x3b0a17['se']){if('VssbV'===_0x3b5cd7(0x7e7))_0x3b0a17['se'][_0x3b5cd7(0x743)]=0x0;else{_0x4f21c1[_0x3b5cd7(0x1bf)]['ParseActorNotetags'][_0x3b5cd7(0x68e)](this,_0x26bf6f);const _0x2eca3e=_0x3612d4[_0x3b5cd7(0x8e2)];if(_0x2eca3e[_0x3b5cd7(0x7b5)](/<MAX LEVEL:[ ](\d+)>/i)){_0x3bfd39[_0x3b5cd7(0x1a2)]=_0xc5f323(_0x519571['$1']);if(_0x413307['maxLevel']===0x0)_0x3d2fb7[_0x3b5cd7(0x1a2)]=_0x37f93e[_0x3b5cd7(0x3a7)];}_0x2eca3e[_0x3b5cd7(0x7b5)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x12b8f9[_0x3b5cd7(0x558)]=_0x4d965a[_0x3b5cd7(0x467)](_0x21ed8c(_0x38927a['$1']),_0x37fe9c[_0x3b5cd7(0x1a2)]));}}}else{_0x5d9ebb['CoreEngine'][_0x3b5cd7(0x8e4)][_0x3b5cd7(0x68e)](this);if(!_0x562556[_0x3b5cd7(0x5f5)])this[_0x3b5cd7(0x80f)]();}}VisuMZ['CoreEngine'][_0x3b5cd7(0x22b)][_0x3b5cd7(0x68e)](this,_0x3b0a17);},VisuMZ[_0x3b4dfd(0x1bf)]['Sprite_AnimationMV_updatePosition']=Sprite_AnimationMV[_0x3b4dfd(0x396)][_0x3b4dfd(0x905)],Sprite_AnimationMV[_0x3b4dfd(0x396)][_0x3b4dfd(0x905)]=function(){const _0x3be9b1=_0x3b4dfd;VisuMZ[_0x3be9b1(0x1bf)][_0x3be9b1(0x7d6)][_0x3be9b1(0x68e)](this);if(this[_0x3be9b1(0x290)][_0x3be9b1(0x2c4)]===0x3){if(this['x']===0x0)this['x']=Math[_0x3be9b1(0x355)](Graphics[_0x3be9b1(0x2d3)]/0x2);if(this['y']===0x0)this['y']=Math[_0x3be9b1(0x355)](Graphics[_0x3be9b1(0x2c8)]/0x2);}},Sprite_Damage[_0x3b4dfd(0x396)]['createDigits']=function(_0x5afd67){const _0x5933ad=_0x3b4dfd;let _0x262ee0=Math[_0x5933ad(0x6e5)](_0x5afd67)[_0x5933ad(0x889)]();this[_0x5933ad(0x462)]()&&(_0x262ee0=VisuMZ['GroupDigits'](_0x262ee0));const _0xcf53be=this['fontSize'](),_0x288fbc=Math[_0x5933ad(0x9d3)](_0xcf53be*0.75);for(let _0x18ccb2=0x0;_0x18ccb2<_0x262ee0[_0x5933ad(0xa16)];_0x18ccb2++){if(_0x5933ad(0x860)===_0x5933ad(0x860)){const _0x5addbf=this['createChildSprite'](_0x288fbc,_0xcf53be);_0x5addbf['bitmap'][_0x5933ad(0x686)](_0x262ee0[_0x18ccb2],0x0,0x0,_0x288fbc,_0xcf53be,'center'),_0x5addbf['x']=(_0x18ccb2-(_0x262ee0[_0x5933ad(0xa16)]-0x1)/0x2)*_0x288fbc,_0x5addbf['dy']=-_0x18ccb2;}else _0x4e6581=_0x157007[_0x5933ad(0x67b)](_0x4d63ef,_0x233a65);}},Sprite_Damage[_0x3b4dfd(0x396)][_0x3b4dfd(0x462)]=function(){const _0x48c1d9=_0x3b4dfd;return VisuMZ[_0x48c1d9(0x1bf)][_0x48c1d9(0x5af)][_0x48c1d9(0x38a)][_0x48c1d9(0x705)];},Sprite_Damage[_0x3b4dfd(0x396)][_0x3b4dfd(0x4e4)]=function(){const _0x2b7b4a=_0x3b4dfd;return ColorManager[_0x2b7b4a(0x5dd)]();},VisuMZ['CoreEngine'][_0x3b4dfd(0x3ab)]=Sprite_Gauge[_0x3b4dfd(0x396)]['gaugeRate'],Sprite_Gauge[_0x3b4dfd(0x396)][_0x3b4dfd(0x43a)]=function(){const _0x2c5075=_0x3b4dfd;return VisuMZ[_0x2c5075(0x1bf)][_0x2c5075(0x3ab)]['call'](this)[_0x2c5075(0x1e1)](0x0,0x1);},VisuMZ['CoreEngine'][_0x3b4dfd(0x83f)]=Sprite_Gauge[_0x3b4dfd(0x396)][_0x3b4dfd(0x952)],Sprite_Gauge[_0x3b4dfd(0x396)][_0x3b4dfd(0x952)]=function(){const _0x549ba=_0x3b4dfd;let _0x3cce8c=VisuMZ[_0x549ba(0x1bf)]['Sprite_Gauge_currentValue'][_0x549ba(0x68e)](this);return _0x3cce8c;},Sprite_Gauge[_0x3b4dfd(0x396)][_0x3b4dfd(0x7db)]=function(){const _0xb309f1=_0x3b4dfd;let _0x56d50d=this[_0xb309f1(0x952)]();this[_0xb309f1(0x462)]()&&(_0x56d50d=VisuMZ['GroupDigits'](_0x56d50d));const _0x2374e4=this[_0xb309f1(0x633)]()-0x1,_0x159f3d=this[_0xb309f1(0x7ba)]?this[_0xb309f1(0x7ba)]():this['bitmapHeight']();this[_0xb309f1(0x389)](),this[_0xb309f1(0x8ad)][_0xb309f1(0x686)](_0x56d50d,0x0,0x0,_0x2374e4,_0x159f3d,'right');},Sprite_Gauge['prototype'][_0x3b4dfd(0x623)]=function(){return 0x3;},Sprite_Gauge[_0x3b4dfd(0x396)][_0x3b4dfd(0x462)]=function(){const _0x255c4a=_0x3b4dfd;return VisuMZ[_0x255c4a(0x1bf)][_0x255c4a(0x5af)][_0x255c4a(0x38a)][_0x255c4a(0x6ea)];},Sprite_Gauge[_0x3b4dfd(0x396)][_0x3b4dfd(0x4e4)]=function(){const _0x147cb5=_0x3b4dfd;return ColorManager[_0x147cb5(0x303)]();},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x500)]=Sprite_Picture[_0x3b4dfd(0x396)][_0x3b4dfd(0x26a)],Sprite_Picture[_0x3b4dfd(0x396)][_0x3b4dfd(0x26a)]=function(){const _0x5b52ef=_0x3b4dfd;if(this['_pictureName']&&this[_0x5b52ef(0x9d4)][_0x5b52ef(0x7b5)](/VisuMZ CoreEngine PictureIcon (\d+)/i))this[_0x5b52ef(0x638)](Number(RegExp['$1']));else{if(_0x5b52ef(0x55d)===_0x5b52ef(0x84d)){let _0x479541=this[_0x5b52ef(0x50e)]();const _0x534584=this[_0x5b52ef(0x941)](),_0x34d853=this[_0x5b52ef(0x793)]();if(this[_0x5b52ef(0x93f)]()&&(_0x479541<_0x534584||_0x114781&&_0x34d853===0x1)){_0x479541+=_0x34d853;if(_0x479541>=_0x534584)_0x479541=_0x534584-0x1;this[_0x5b52ef(0x5fc)](_0x479541);}else!this['isUseModernControls']()&&((_0x479541<_0x534584-_0x34d853||_0x4c691b&&_0x34d853===0x1)&&this[_0x5b52ef(0x5fc)]((_0x479541+_0x34d853)%_0x534584));}else VisuMZ['CoreEngine']['Sprite_Picture_loadBitmap'][_0x5b52ef(0x68e)](this);}},Sprite_Picture['prototype'][_0x3b4dfd(0x638)]=function(_0x21fcc3){const _0x5d0c2f=_0x3b4dfd,_0x368797=ImageManager[_0x5d0c2f(0x321)],_0xec16ca=ImageManager['iconHeight'],_0x34bb8d=this[_0x5d0c2f(0x9d4)][_0x5d0c2f(0x7b5)](/SMOOTH/i);this[_0x5d0c2f(0x8ad)]=new Bitmap(_0x368797,_0xec16ca);const _0xba4d=ImageManager[_0x5d0c2f(0x64e)]('IconSet'),_0x3a4b2d=_0x21fcc3%0x10*_0x368797,_0x1cb762=Math[_0x5d0c2f(0x9d3)](_0x21fcc3/0x10)*_0xec16ca;this[_0x5d0c2f(0x8ad)][_0x5d0c2f(0x59c)]=_0x34bb8d,this[_0x5d0c2f(0x8ad)][_0x5d0c2f(0x254)](_0xba4d,_0x3a4b2d,_0x1cb762,_0x368797,_0xec16ca,0x0,0x0,_0x368797,_0xec16ca);};function Sprite_TitlePictureButton(){const _0x145c0e=_0x3b4dfd;this[_0x145c0e(0x24b)](...arguments);}Sprite_TitlePictureButton[_0x3b4dfd(0x396)]=Object[_0x3b4dfd(0x9bd)](Sprite_Clickable['prototype']),Sprite_TitlePictureButton[_0x3b4dfd(0x396)][_0x3b4dfd(0x9dc)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x3b4dfd(0x396)]['initialize']=function(_0x12e4c4){const _0xf3e530=_0x3b4dfd;Sprite_Clickable[_0xf3e530(0x396)][_0xf3e530(0x24b)]['call'](this),this[_0xf3e530(0x6b4)]=_0x12e4c4,this[_0xf3e530(0x45c)]=null,this['setup']();},Sprite_TitlePictureButton[_0x3b4dfd(0x396)][_0x3b4dfd(0x557)]=function(){const _0x4b4fd5=_0x3b4dfd;this['x']=Graphics['width'],this['y']=Graphics[_0x4b4fd5(0x2c8)],this[_0x4b4fd5(0xa11)]=![],this[_0x4b4fd5(0x4d5)]();},Sprite_TitlePictureButton[_0x3b4dfd(0x396)][_0x3b4dfd(0x4d5)]=function(){const _0x4c2515=_0x3b4dfd;this[_0x4c2515(0x8ad)]=ImageManager['loadPicture'](this[_0x4c2515(0x6b4)][_0x4c2515(0x8ca)]),this[_0x4c2515(0x8ad)]['addLoadListener'](this[_0x4c2515(0x958)]['bind'](this));},Sprite_TitlePictureButton[_0x3b4dfd(0x396)]['onButtonImageLoad']=function(){const _0x1bcf76=_0x3b4dfd;this['_data'][_0x1bcf76(0x219)][_0x1bcf76(0x68e)](this),this['_data'][_0x1bcf76(0x9ee)]['call'](this),this[_0x1bcf76(0x91a)](this['_data'][_0x1bcf76(0x316)][_0x1bcf76(0x2bd)](this));},Sprite_TitlePictureButton[_0x3b4dfd(0x396)][_0x3b4dfd(0x933)]=function(){const _0x10dade=_0x3b4dfd;Sprite_Clickable[_0x10dade(0x396)][_0x10dade(0x933)][_0x10dade(0x68e)](this),this[_0x10dade(0x97d)](),this[_0x10dade(0x3a4)]();},Sprite_TitlePictureButton[_0x3b4dfd(0x396)]['fadeSpeed']=function(){const _0x313f62=_0x3b4dfd;return VisuMZ[_0x313f62(0x1bf)][_0x313f62(0x5af)][_0x313f62(0x2ab)]['Title']['ButtonFadeSpeed'];},Sprite_TitlePictureButton[_0x3b4dfd(0x396)][_0x3b4dfd(0x97d)]=function(){const _0xed697=_0x3b4dfd;this[_0xed697(0x1be)]||this[_0xed697(0x8fd)]?this['opacity']=0xff:(this[_0xed697(0x413)]+=this[_0xed697(0xa11)]?this['fadeSpeed']():-0x1*this[_0xed697(0x4b1)](),this[_0xed697(0x413)]=Math[_0xed697(0x467)](0xc0,this[_0xed697(0x413)]));},Sprite_TitlePictureButton['prototype'][_0x3b4dfd(0x91a)]=function(_0x3915e5){const _0x48f9b9=_0x3b4dfd;this[_0x48f9b9(0x45c)]=_0x3915e5;},Sprite_TitlePictureButton[_0x3b4dfd(0x396)][_0x3b4dfd(0x741)]=function(){const _0xd3146c=_0x3b4dfd;this[_0xd3146c(0x45c)]&&this[_0xd3146c(0x45c)]();},VisuMZ['CoreEngine'][_0x3b4dfd(0x914)]=Spriteset_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x24b)],Spriteset_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x24b)]=function(){const _0xe41e67=_0x3b4dfd;VisuMZ[_0xe41e67(0x1bf)][_0xe41e67(0x914)][_0xe41e67(0x68e)](this),this[_0xe41e67(0x641)]();},Spriteset_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x641)]=function(){const _0x1bf2d1=_0x3b4dfd;this[_0x1bf2d1(0x81b)]=[],this[_0x1bf2d1(0x8f1)]=[],this['_cacheScaleX']=this[_0x1bf2d1(0x979)]['x'],this[_0x1bf2d1(0x501)]=this[_0x1bf2d1(0x979)]['y'];},VisuMZ[_0x3b4dfd(0x1bf)]['Spriteset_Base_destroy']=Spriteset_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x86c)],Spriteset_Base[_0x3b4dfd(0x396)]['destroy']=function(_0x26a659){const _0x43fdfc=_0x3b4dfd;this[_0x43fdfc(0x9aa)](),this[_0x43fdfc(0x5cb)](),VisuMZ[_0x43fdfc(0x1bf)][_0x43fdfc(0x953)][_0x43fdfc(0x68e)](this,_0x26a659);},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x6ae)]=Spriteset_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x933)],Spriteset_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x933)]=function(){const _0x3f721c=_0x3b4dfd;VisuMZ['CoreEngine'][_0x3f721c(0x6ae)][_0x3f721c(0x68e)](this),this[_0x3f721c(0x6a8)](),this[_0x3f721c(0x18c)](),this['updatePointAnimations']();},Spriteset_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x6a8)]=function(){const _0x4d4f03=_0x3b4dfd;if(!VisuMZ['CoreEngine'][_0x4d4f03(0x5af)][_0x4d4f03(0x38a)][_0x4d4f03(0x4e1)])return;if(this[_0x4d4f03(0x6fb)]===this['scale']['x']&&this[_0x4d4f03(0x501)]===this[_0x4d4f03(0x979)]['y'])return;this[_0x4d4f03(0x799)](),this['_cacheScaleX']=this[_0x4d4f03(0x979)]['x'],this[_0x4d4f03(0x501)]=this[_0x4d4f03(0x979)]['y'];},Spriteset_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x799)]=function(){const _0x257346=_0x3b4dfd;if(SceneManager[_0x257346(0x645)]()&&Spriteset_Map[_0x257346(0x309)]){if('IdVyf'!=='uENal')return;else{var _0x5760d3=_0x4bf945(_0x28013a['$1']);try{_0x1b6bda*=_0x410748(_0x5760d3);}catch(_0x304862){if(_0x44d007[_0x257346(0x821)]())_0x252028[_0x257346(0x862)](_0x304862);}}}else{if(SceneManager['isSceneBattle']()&&Spriteset_Battle['DETACH_PICTURE_CONTAINER']){if('UQcDY'===_0x257346(0x586))return;else{const _0x4e67b5=this[_0x257346(0x9f7)];_0x4e67b5[_0x257346(0x9ed)](),_0x4e67b5['font']=this[_0x257346(0x516)]();const _0x34323e=_0x4e67b5[_0x257346(0x1f0)](_0x4feb5f)[_0x257346(0x2d3)];return _0x4e67b5[_0x257346(0x3b8)](),_0x34323e;}}}this['scale']['x']!==0x0&&(this[_0x257346(0x566)][_0x257346(0x979)]['x']=0x1/this['scale']['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x257346(0x979)]['x'])),this[_0x257346(0x979)]['y']!==0x0&&(_0x257346(0x3f5)===_0x257346(0x3f5)?(this['_pictureContainer'][_0x257346(0x979)]['y']=0x1/this[_0x257346(0x979)]['y'],this[_0x257346(0x566)]['y']=-(this['y']/this['scale']['y'])):(_0x536fa3['CoreEngine']['Scene_Shop_create'][_0x257346(0x68e)](this),this['setCoreEngineUpdateWindowBg']()));},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x452)]=Spriteset_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x905)],Spriteset_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x905)]=function(){const _0x3e10d7=_0x3b4dfd;VisuMZ[_0x3e10d7(0x1bf)][_0x3e10d7(0x452)][_0x3e10d7(0x68e)](this),this[_0x3e10d7(0x920)]();},Spriteset_Base['prototype'][_0x3b4dfd(0x920)]=function(){const _0x576421=_0x3b4dfd;if(!$gameScreen)return;if($gameScreen[_0x576421(0x755)]<=0x0)return;this['x']-=Math[_0x576421(0x355)]($gameScreen[_0x576421(0x1c2)]());const _0x296d29=$gameScreen[_0x576421(0x853)]();switch($gameScreen[_0x576421(0x853)]()){case _0x576421(0x82b):this[_0x576421(0x8c1)]();break;case _0x576421(0x6cc):this[_0x576421(0x30c)]();break;case _0x576421(0x521):this[_0x576421(0x33c)]();break;default:this[_0x576421(0x36a)]();break;}},Spriteset_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x8c1)]=function(){const _0x20bd07=_0x3b4dfd,_0x326832=VisuMZ['CoreEngine'][_0x20bd07(0x5af)][_0x20bd07(0x74f)];if(_0x326832&&_0x326832['originalJS'])return _0x326832[_0x20bd07(0x7c4)]['call'](this);this['x']+=Math[_0x20bd07(0x355)]($gameScreen[_0x20bd07(0x1c2)]());},Spriteset_Base['prototype']['updatePositionCoreEngineShakeRand']=function(){const _0x49d0ed=_0x3b4dfd,_0x3b268d=VisuMZ[_0x49d0ed(0x1bf)]['Settings']['ScreenShake'];if(_0x3b268d&&_0x3b268d[_0x49d0ed(0x86f)])return _0x49d0ed(0x3a3)===_0x49d0ed(0x3a3)?_0x3b268d['randomJS'][_0x49d0ed(0x68e)](this):_0xf5a1c9?_0x137490(_0x517f6d[_0x49d0ed(0x355)](_0xf0e2dc*0x64))+'%':_0x4e8395;const _0x33813d=$gameScreen[_0x49d0ed(0x52c)]*0.75,_0x12b9b9=$gameScreen[_0x49d0ed(0x4ed)]*0.6,_0x5f24d5=$gameScreen[_0x49d0ed(0x755)];this['x']+=Math['round'](Math[_0x49d0ed(0x3d3)](_0x33813d)-Math[_0x49d0ed(0x3d3)](_0x12b9b9))*(Math[_0x49d0ed(0x467)](_0x5f24d5,0x1e)*0.5),this['y']+=Math['round'](Math[_0x49d0ed(0x3d3)](_0x33813d)-Math['randomInt'](_0x12b9b9))*(Math['min'](_0x5f24d5,0x1e)*0.5);},Spriteset_Base['prototype'][_0x3b4dfd(0x30c)]=function(){const _0x3d6bc6=_0x3b4dfd,_0x53b2a1=VisuMZ[_0x3d6bc6(0x1bf)][_0x3d6bc6(0x5af)][_0x3d6bc6(0x74f)];if(_0x53b2a1&&_0x53b2a1[_0x3d6bc6(0x9a8)])return _0x53b2a1['horzJS'][_0x3d6bc6(0x68e)](this);const _0x324ba1=$gameScreen[_0x3d6bc6(0x52c)]*0.75,_0x21750c=$gameScreen[_0x3d6bc6(0x4ed)]*0.6,_0x5acaa3=$gameScreen[_0x3d6bc6(0x755)];this['x']+=Math[_0x3d6bc6(0x355)](Math[_0x3d6bc6(0x3d3)](_0x324ba1)-Math['randomInt'](_0x21750c))*(Math[_0x3d6bc6(0x467)](_0x5acaa3,0x1e)*0.5);},Spriteset_Base['prototype'][_0x3b4dfd(0x33c)]=function(){const _0x34ebdb=_0x3b4dfd,_0x2074f1=VisuMZ[_0x34ebdb(0x1bf)][_0x34ebdb(0x5af)][_0x34ebdb(0x74f)];if(_0x2074f1&&_0x2074f1[_0x34ebdb(0x435)])return _0x2074f1[_0x34ebdb(0x435)]['call'](this);const _0x50b687=$gameScreen[_0x34ebdb(0x52c)]*0.75,_0x23496c=$gameScreen[_0x34ebdb(0x4ed)]*0.6,_0x2dd4c8=$gameScreen[_0x34ebdb(0x755)];this['y']+=Math[_0x34ebdb(0x355)](Math[_0x34ebdb(0x3d3)](_0x50b687)-Math[_0x34ebdb(0x3d3)](_0x23496c))*(Math['min'](_0x2dd4c8,0x1e)*0.5);},Spriteset_Base['prototype']['updateFauxAnimations']=function(){const _0x18e7fe=_0x3b4dfd;for(const _0x141e5d of this[_0x18e7fe(0x81b)]){!_0x141e5d[_0x18e7fe(0x6a5)]()&&this[_0x18e7fe(0x98c)](_0x141e5d);}this[_0x18e7fe(0x1c1)]();},Spriteset_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x1c1)]=function(){const _0x30dcd6=_0x3b4dfd;for(;;){if(_0x30dcd6(0x1d6)==='PsdsM')_0x2ca2f4+=_0x51416e;else{const _0x30b4a7=$gameTemp[_0x30dcd6(0x6fa)]();if(_0x30b4a7)this[_0x30dcd6(0x984)](_0x30b4a7);else break;}}},Spriteset_Base['prototype'][_0x3b4dfd(0x984)]=function(_0x2cdd9d){const _0x11671f=_0x3b4dfd,_0x2e298d=$dataAnimations[_0x2cdd9d[_0x11671f(0x201)]],_0x4c8e63=_0x2cdd9d['targets'],_0x173ff8=_0x2cdd9d[_0x11671f(0x56e)],_0x49c763=_0x2cdd9d[_0x11671f(0x756)];let _0x1838a0=this[_0x11671f(0x7b7)]();const _0x2bd53a=this[_0x11671f(0x85e)]();if(this['isAnimationForEach'](_0x2e298d)){if(_0x11671f(0x22e)!=='jNPCa')return _0x519a5f[_0x11671f(0x1bf)][_0x11671f(0x5af)][_0x11671f(0x38a)][_0x11671f(0x956)];else for(const _0x2c4194 of _0x4c8e63){this['createFauxAnimationSprite']([_0x2c4194],_0x2e298d,_0x173ff8,_0x1838a0,_0x49c763),_0x1838a0+=_0x2bd53a;}}else this['createFauxAnimationSprite'](_0x4c8e63,_0x2e298d,_0x173ff8,_0x1838a0,_0x49c763);},Spriteset_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x2ac)]=function(_0x48647c,_0x1c24d9,_0xd3a91f,_0x4734df){const _0x52fb14=_0x3b4dfd,_0x106f57=this['isMVAnimation'](_0x1c24d9),_0x278b29=new(_0x106f57?Sprite_AnimationMV:Sprite_Animation)(),_0x4f3b45=this['makeTargetSprites'](_0x48647c),_0x439bf1=this['animationBaseDelay'](),_0x5c26a8=_0x4734df>_0x439bf1?this['lastAnimationSprite']():null;this[_0x52fb14(0x78e)](_0x48647c[0x0])&&(_0xd3a91f=!_0xd3a91f),_0x278b29[_0x52fb14(0x8e7)]=_0x48647c,_0x278b29['setup'](_0x4f3b45,_0x1c24d9,_0xd3a91f,_0x4734df,_0x5c26a8),this[_0x52fb14(0x8f4)](_0x278b29),this[_0x52fb14(0x2fe)][_0x52fb14(0x297)](_0x278b29);},Spriteset_Base[_0x3b4dfd(0x396)]['createFauxAnimationSprite']=function(_0x1d2c63,_0x3a943e,_0x455c41,_0x3a5abd,_0x54c825){const _0x2876cc=_0x3b4dfd,_0x23a144=this[_0x2876cc(0x1af)](_0x3a943e),_0x224704=new(_0x23a144?Sprite_AnimationMV:Sprite_Animation)(),_0x1bb8c1=this[_0x2876cc(0x5db)](_0x1d2c63);this[_0x2876cc(0x78e)](_0x1d2c63[0x0])&&(_0x455c41=!_0x455c41);_0x224704[_0x2876cc(0x8e7)]=_0x1d2c63,_0x224704[_0x2876cc(0x557)](_0x1bb8c1,_0x3a943e,_0x455c41,_0x3a5abd),_0x224704[_0x2876cc(0x4f3)](_0x54c825),this[_0x2876cc(0x8f4)](_0x224704);if(this[_0x2876cc(0x2fe)])this[_0x2876cc(0x2fe)][_0x2876cc(0x8b7)](_0x224704);this['_fauxAnimationSprites'][_0x2876cc(0x297)](_0x224704);},Spriteset_Base[_0x3b4dfd(0x396)]['addAnimationSpriteToContainer']=function(_0x27652d){const _0x5ec614=_0x3b4dfd;this[_0x5ec614(0x50d)][_0x5ec614(0x2f6)](_0x27652d);},Spriteset_Base[_0x3b4dfd(0x396)]['removeAnimation']=function(_0x345967){const _0x560df=_0x3b4dfd;this[_0x560df(0x2fe)][_0x560df(0x8b7)](_0x345967),this[_0x560df(0xa01)](_0x345967);for(const _0x158f64 of _0x345967[_0x560df(0x8e7)]){_0x158f64[_0x560df(0x3b2)]&&('eTJeb'!==_0x560df(0x4b4)?this[_0x560df(0x494)]():_0x158f64[_0x560df(0x3b2)]());}_0x345967[_0x560df(0x86c)]();},Spriteset_Base['prototype'][_0x3b4dfd(0x98c)]=function(_0x143a61){const _0x56ba08=_0x3b4dfd;this[_0x56ba08(0x81b)]['remove'](_0x143a61),this['removeAnimationFromContainer'](_0x143a61);for(const _0x5d323a of _0x143a61[_0x56ba08(0x8e7)]){if(_0x56ba08(0x8c0)!==_0x56ba08(0x8c0)){var _0x31112f=_0x55a89c(_0x295cb5['$1']);if(_0x31112f===0x0)_0x31112f=_0x996ba6[_0x56ba08(0x3a7)];_0x42c1a5=_0x47d6de['max'](_0xbd8a4f,_0x31112f);}else _0x5d323a[_0x56ba08(0x3b2)]&&_0x5d323a[_0x56ba08(0x3b2)]();}_0x143a61[_0x56ba08(0x86c)]();},Spriteset_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0xa01)]=function(_0x57dd62){const _0x9b1050=_0x3b4dfd;this['_effectsContainer'][_0x9b1050(0x45f)](_0x57dd62);},Spriteset_Base['prototype'][_0x3b4dfd(0x9aa)]=function(){const _0x4aaac7=_0x3b4dfd;for(const _0x3121cd of this[_0x4aaac7(0x81b)]){this[_0x4aaac7(0x98c)](_0x3121cd);}},Spriteset_Base['prototype']['isFauxAnimationPlaying']=function(){const _0x688c83=_0x3b4dfd;return this[_0x688c83(0x81b)]['length']>0x0;},Spriteset_Base[_0x3b4dfd(0x396)]['updatePointAnimations']=function(){const _0x4a7065=_0x3b4dfd;for(const _0x5bba1c of this[_0x4a7065(0x8f1)]){if(_0x4a7065(0x5b5)===_0x4a7065(0x5b5)){if(!_0x5bba1c['isPlaying']()){if(_0x4a7065(0x8b2)!==_0x4a7065(0x8b2)){const _0x55a285=_0x1925a0[_0x4a7065(0x7da)](_0x31c03d);_0x4ee467?(this[_0x4a7065(0x319)](_0x55a285,_0x5c95ff,_0x2f85d3,this['gaugeLineHeight']()),_0x34f7f7-=this['gaugeLineHeight']()+0x2,_0x29e5c7+=this[_0x4a7065(0x2bc)]()+0x2):(this[_0x4a7065(0x18f)](_0x55a285,_0x27f2b8+0x2,_0x24e56d+0x2),_0x3a0d6a-=_0x198167[_0x4a7065(0x321)]+0x4,_0x673e72+=_0x43f131[_0x4a7065(0x321)]+0x4);}else this['removePointAnimation'](_0x5bba1c);}}else this[_0x4a7065(0x3c4)]='SV';}this['processPointAnimationRequests']();},Spriteset_Base[_0x3b4dfd(0x396)]['processPointAnimationRequests']=function(){const _0x4aaab7=_0x3b4dfd;for(;;){const _0x4fca6a=$gameTemp[_0x4aaab7(0x995)]();if(_0x4fca6a){if(_0x4aaab7(0x626)===_0x4aaab7(0x2f8)){const _0xb2a81a=_0x278e17['width']/this[_0x4aaab7(0x765)]();_0xb2a81a%0x1!==0x0&&_0x4dd4a6[_0x4aaab7(0x313)](_0xb2a81a)===this[_0x4aaab7(0x2d3)]()&&!this['isLoopHorizontal']()&&(this['_centerCameraCheck'][_0x4aaab7(0x5b6)]=!![],this[_0x4aaab7(0x58f)]['displayX']=_0xf3a51d[_0x4aaab7(0xa1b)]||0x0);}else this[_0x4aaab7(0x556)](_0x4fca6a);}else break;}},Spriteset_Base[_0x3b4dfd(0x396)]['createPointAnimation']=function(_0x4c3ae){const _0x42cc07=_0x3b4dfd,_0x1c46d5=$dataAnimations[_0x4c3ae[_0x42cc07(0x201)]],_0x4b48f1=this[_0x42cc07(0x7df)](_0x4c3ae),_0x250be1=_0x4c3ae[_0x42cc07(0x56e)],_0x43f892=_0x4c3ae[_0x42cc07(0x756)];let _0x415855=this[_0x42cc07(0x7b7)]();const _0x4a0498=this[_0x42cc07(0x85e)]();if(this[_0x42cc07(0x764)](_0x1c46d5)){if(_0x42cc07(0x522)===_0x42cc07(0x522))for(const _0x6cf4f2 of _0x4b48f1){_0x42cc07(0x758)===_0x42cc07(0x758)?(this['createPointAnimationSprite']([_0x6cf4f2],_0x1c46d5,_0x250be1,_0x415855,_0x43f892),_0x415855+=_0x4a0498):_0x50888f=_0x42cc07(0x2db)[_0x42cc07(0x4f9)](_0x13fd03,_0x24467b);}else _0xa9a1d4='State-%1-%2'['format'](_0x5bd285,_0x386792);}else this[_0x42cc07(0x954)](_0x4b48f1,_0x1c46d5,_0x250be1,_0x415855,_0x43f892);},Spriteset_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x7df)]=function(_0x199206){const _0x5102c7=_0x3b4dfd,_0xb47b39=new Sprite_Clickable();_0xb47b39['x']=_0x199206['x'],_0xb47b39['y']=_0x199206['y'],_0xb47b39['z']=0x64;const _0x32063c=this[_0x5102c7(0x85d)]();return _0x32063c[_0x5102c7(0x2f6)](_0xb47b39),[_0xb47b39];},Spriteset_Base['prototype'][_0x3b4dfd(0x85d)]=function(){return this;},Spriteset_Map['prototype']['getPointAnimationLayer']=function(){const _0x4b29c8=_0x3b4dfd;return this[_0x4b29c8(0x596)]||this;},Spriteset_Battle['prototype'][_0x3b4dfd(0x85d)]=function(){const _0x3d4a2f=_0x3b4dfd;return this[_0x3d4a2f(0x99b)]||this;},Spriteset_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x954)]=function(_0x2b50a6,_0x5d5387,_0x305930,_0x5f2ee7,_0x329830){const _0x215497=_0x3b4dfd,_0x32a5d7=this[_0x215497(0x1af)](_0x5d5387),_0x5bd127=new(_0x32a5d7?Sprite_AnimationMV:Sprite_Animation)();_0x5bd127[_0x215497(0x8e7)]=_0x2b50a6,_0x5bd127[_0x215497(0x557)](_0x2b50a6,_0x5d5387,_0x305930,_0x5f2ee7),_0x5bd127[_0x215497(0x4f3)](_0x329830),this[_0x215497(0x50d)][_0x215497(0x2f6)](_0x5bd127),this['_pointAnimationSprites']['push'](_0x5bd127);},Spriteset_Base[_0x3b4dfd(0x396)]['removePointAnimation']=function(_0x165c38){const _0x29c203=_0x3b4dfd;this[_0x29c203(0x8f1)]['remove'](_0x165c38),this[_0x29c203(0x50d)][_0x29c203(0x45f)](_0x165c38);for(const _0x3d9624 of _0x165c38[_0x29c203(0x8e7)]){if(_0x29c203(0x484)!=='IbhdW')return this['item']()?_0x3eadf6[_0x29c203(0x1bf)]['Game_Action_numRepeats'][_0x29c203(0x68e)](this):0x0;else{if(_0x3d9624[_0x29c203(0x3b2)]){if(_0x29c203(0x526)===_0x29c203(0x9c5)){const _0xd17f59=_0x2ca844['_scene'];if(!_0xd17f59)return;!_0xd17f59[_0x29c203(0x205)]&&(_0x16ef01[_0x29c203(0x893)](),_0xd17f59[_0x29c203(0x205)]=new _0x373fd3(),_0xd17f59['addChild'](_0xd17f59[_0x29c203(0x205)])),_0x152ccb['_pictureCoordinatesMode']===_0x7a439a&&(_0x384211['playCancel'](),_0xd17f59[_0x29c203(0x45f)](_0xd17f59[_0x29c203(0x205)]),_0xd17f59[_0x29c203(0x205)]=_0x4256cc);}else _0x3d9624[_0x29c203(0x3b2)]();}const _0x5c171e=this[_0x29c203(0x85d)]();if(_0x5c171e)_0x5c171e['removeChild'](_0x3d9624);}}_0x165c38['destroy']();},Spriteset_Base[_0x3b4dfd(0x396)]['removeAllPointAnimations']=function(){const _0x4bdab2=_0x3b4dfd;for(const _0x49666f of this['_pointAnimationSprites']){if(_0x4bdab2(0x3c9)!==_0x4bdab2(0x3c9)){if(_0x24f0a0[_0x56e539][_0x4bdab2(0x26b)])return!![];}else this[_0x4bdab2(0x28d)](_0x49666f);}},Spriteset_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x7f4)]=function(){const _0x452bec=_0x3b4dfd;return this[_0x452bec(0x8f1)][_0x452bec(0xa16)]>0x0;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x606)]=Spriteset_Base[_0x3b4dfd(0x396)]['isAnimationPlaying'],Spriteset_Base['prototype'][_0x3b4dfd(0x648)]=function(){const _0x88ba01=_0x3b4dfd;return VisuMZ[_0x88ba01(0x1bf)][_0x88ba01(0x606)][_0x88ba01(0x68e)](this)||this[_0x88ba01(0x7f4)]();},Spriteset_Map[_0x3b4dfd(0x309)]=VisuMZ[_0x3b4dfd(0x1bf)]['Settings']['QoL'][_0x3b4dfd(0x53d)]||![],VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x474)]=Scene_Map[_0x3b4dfd(0x396)]['createSpriteset'],Scene_Map[_0x3b4dfd(0x396)][_0x3b4dfd(0x3ee)]=function(){const _0x27d672=_0x3b4dfd;VisuMZ['CoreEngine']['Scene_Map_createSpriteset_detach'][_0x27d672(0x68e)](this);if(!Spriteset_Map[_0x27d672(0x309)])return;const _0x4b1134=this[_0x27d672(0x8c9)];if(!_0x4b1134)return;this[_0x27d672(0x566)]=_0x4b1134['_pictureContainer'];if(!this[_0x27d672(0x566)])return;this[_0x27d672(0x2f6)](this[_0x27d672(0x566)]);},Spriteset_Battle[_0x3b4dfd(0x309)]=VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5af)][_0x3b4dfd(0x38a)][_0x3b4dfd(0x492)]||![],VisuMZ['CoreEngine'][_0x3b4dfd(0xa08)]=Scene_Battle[_0x3b4dfd(0x396)][_0x3b4dfd(0x3ee)],Scene_Battle[_0x3b4dfd(0x396)][_0x3b4dfd(0x3ee)]=function(){const _0x1c104f=_0x3b4dfd;VisuMZ[_0x1c104f(0x1bf)][_0x1c104f(0xa08)][_0x1c104f(0x68e)](this);if(!Spriteset_Battle[_0x1c104f(0x309)])return;const _0x3e01c3=this['_spriteset'];if(!_0x3e01c3)return;this[_0x1c104f(0x566)]=_0x3e01c3['_pictureContainer'];if(!this[_0x1c104f(0x566)])return;this['addChild'](this['_pictureContainer']);},Spriteset_Battle[_0x3b4dfd(0x396)][_0x3b4dfd(0xa17)]=function(){const _0x450ac7=_0x3b4dfd;this[_0x450ac7(0x96e)]=new PIXI[(_0x450ac7(0x55c))][(_0x450ac7(0x9ce))](clamp=!![]),this[_0x450ac7(0x8dd)]=new Sprite(),this['_backgroundSprite'][_0x450ac7(0x8ad)]=SceneManager[_0x450ac7(0x640)](),this[_0x450ac7(0x8dd)][_0x450ac7(0x55c)]=[this[_0x450ac7(0x96e)]],this[_0x450ac7(0x4c0)][_0x450ac7(0x2f6)](this['_backgroundSprite']);},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x35c)]=Spriteset_Battle[_0x3b4dfd(0x396)][_0x3b4dfd(0x8c7)],Spriteset_Battle[_0x3b4dfd(0x396)]['createEnemies']=function(){const _0x14d5ad=_0x3b4dfd;this['coreEngineRepositionEnemies']()&&this['repositionEnemiesByResolution'](),VisuMZ['CoreEngine'][_0x14d5ad(0x35c)][_0x14d5ad(0x68e)](this);},Spriteset_Battle['prototype'][_0x3b4dfd(0x95c)]=function(){const _0x3f7dde=_0x3b4dfd,_0x56830e=VisuMZ[_0x3f7dde(0x1bf)][_0x3f7dde(0x5af)][_0x3f7dde(0x209)];if(!_0x56830e)return![];if(Utils[_0x3f7dde(0x2eb)]>=_0x3f7dde(0x268)&&!_0x56830e[_0x3f7dde(0x6ce)])return![];return _0x56830e[_0x3f7dde(0x83e)];},Spriteset_Battle[_0x3b4dfd(0x396)][_0x3b4dfd(0x553)]=function(){const _0x22fcd3=_0x3b4dfd;for(member of $gameTroop[_0x22fcd3(0x3a8)]()){member['moveRelativeToResolutionChange']();}},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x9da)]=Window_Base['prototype'][_0x3b4dfd(0x24b)],Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x24b)]=function(_0x4e1f2f){const _0x5defc3=_0x3b4dfd;_0x4e1f2f['x']=Math[_0x5defc3(0x355)](_0x4e1f2f['x']),_0x4e1f2f['y']=Math[_0x5defc3(0x355)](_0x4e1f2f['y']),_0x4e1f2f[_0x5defc3(0x2d3)]=Math[_0x5defc3(0x355)](_0x4e1f2f[_0x5defc3(0x2d3)]),_0x4e1f2f[_0x5defc3(0x2c8)]=Math[_0x5defc3(0x355)](_0x4e1f2f[_0x5defc3(0x2c8)]),this[_0x5defc3(0x430)](),VisuMZ[_0x5defc3(0x1bf)]['Window_Base_initialize'][_0x5defc3(0x68e)](this,_0x4e1f2f),this[_0x5defc3(0x677)]();},Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x430)]=function(){const _0x176c14=_0x3b4dfd;this[_0x176c14(0x2d9)]=VisuMZ['CoreEngine'][_0x176c14(0x5af)][_0x176c14(0x38a)]['DigitGroupingStandardText'],this[_0x176c14(0x3cc)]=VisuMZ['CoreEngine'][_0x176c14(0x5af)][_0x176c14(0x38a)][_0x176c14(0x32a)];},Window_Base['prototype'][_0x3b4dfd(0x2b8)]=function(){const _0x27c17e=_0x3b4dfd;return VisuMZ[_0x27c17e(0x1bf)]['Settings'][_0x27c17e(0x5a1)]['LineHeight'];},Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x53b)]=function(){return VisuMZ['CoreEngine']['Settings']['Window']['ItemPadding'];},Window_Base[_0x3b4dfd(0x396)]['updateBackOpacity']=function(){const _0x59e240=_0x3b4dfd;$gameSystem['windowOpacity']?this['backOpacity']=$gameSystem[_0x59e240(0x8b8)]():_0x59e240(0x75f)!==_0x59e240(0x2ed)?this[_0x59e240(0x903)]=VisuMZ[_0x59e240(0x1bf)][_0x59e240(0x5af)]['Window'][_0x59e240(0x395)]:this['_optionsWindow'][_0x59e240(0x3f2)](_0x445afa['layoutSettings'][_0x59e240(0x1aa)]);},Window_Base[_0x3b4dfd(0x396)]['translucentOpacity']=function(){const _0x15dcd0=_0x3b4dfd;return VisuMZ[_0x15dcd0(0x1bf)][_0x15dcd0(0x5af)][_0x15dcd0(0x5a1)]['TranslucentOpacity'];},Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x6d7)]=function(){const _0x406a34=_0x3b4dfd;return VisuMZ['CoreEngine'][_0x406a34(0x5af)][_0x406a34(0x5a1)]['OpenSpeed'];},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x4ea)]=Window_Base['prototype'][_0x3b4dfd(0x933)],Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x933)]=function(){const _0x1fd68f=_0x3b4dfd;VisuMZ[_0x1fd68f(0x1bf)][_0x1fd68f(0x4ea)][_0x1fd68f(0x68e)](this),this['updateCoreEasing']();},Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x6bc)]=function(){const _0xca10f2=_0x3b4dfd;this['_opening']&&(this[_0xca10f2(0x80d)]+=this[_0xca10f2(0x6d7)](),this[_0xca10f2(0xa0f)]()&&(_0xca10f2(0x560)!==_0xca10f2(0x2c3)?this[_0xca10f2(0x816)]=![]:(this[_0xca10f2(0x413)]+=this['visible']?this['fadeSpeed']():-0x1*this[_0xca10f2(0x4b1)](),this[_0xca10f2(0x413)]=_0x2d1b93[_0xca10f2(0x467)](0xc0,this[_0xca10f2(0x413)]))));},Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x564)]=function(){const _0x3409e7=_0x3b4dfd;if(this[_0x3409e7(0x68c)]){if(_0x3409e7(0x964)!==_0x3409e7(0x362))this[_0x3409e7(0x80d)]-=this[_0x3409e7(0x6d7)](),this[_0x3409e7(0x53e)]()&&(this['_closing']=![]);else return!![];}},VisuMZ['CoreEngine'][_0x3b4dfd(0x3e5)]=Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x686)],Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x686)]=function(_0xffb530,_0x46d8f0,_0x3a5dda,_0x486a0f,_0x1a454b){const _0x28b6ef=_0x3b4dfd;if(this[_0x28b6ef(0x462)]())_0xffb530=VisuMZ[_0x28b6ef(0x59b)](_0xffb530);VisuMZ['CoreEngine'][_0x28b6ef(0x3e5)][_0x28b6ef(0x68e)](this,_0xffb530,_0x46d8f0,_0x3a5dda,_0x486a0f,_0x1a454b);},Window_Base['prototype'][_0x3b4dfd(0x462)]=function(){const _0x46ba39=_0x3b4dfd;return this[_0x46ba39(0x2d9)];},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x354)]=Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x93b)],Window_Base['prototype'][_0x3b4dfd(0x93b)]=function(_0x200a27,_0xfa82b0,_0x1a5a72,_0x27d60b){const _0x4a5454=_0x3b4dfd;var _0x19c335=VisuMZ[_0x4a5454(0x1bf)][_0x4a5454(0x354)][_0x4a5454(0x68e)](this,_0x200a27,_0xfa82b0,_0x1a5a72,_0x27d60b);if(this[_0x4a5454(0x226)]())_0x19c335[_0x4a5454(0x8e8)]=VisuMZ[_0x4a5454(0x59b)](_0x19c335[_0x4a5454(0x8e8)]);return _0x19c335;},Window_Base['prototype'][_0x3b4dfd(0x226)]=function(){const _0x31c0a1=_0x3b4dfd;return this[_0x31c0a1(0x3cc)];},Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x5c2)]=function(_0x3403e9){this['_digitGrouping']=_0x3403e9;},Window_Base['prototype'][_0x3b4dfd(0x810)]=function(_0x194d33){const _0x9f2965=_0x3b4dfd;this[_0x9f2965(0x3cc)]=_0x194d33;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x829)]=Window_Base['prototype'][_0x3b4dfd(0x18f)],Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x18f)]=function(_0x4d27e0,_0x446c14,_0x4a9b40){const _0x2c995c=_0x3b4dfd;_0x446c14=Math[_0x2c995c(0x355)](_0x446c14),_0x4a9b40=Math[_0x2c995c(0x355)](_0x4a9b40),VisuMZ[_0x2c995c(0x1bf)][_0x2c995c(0x829)]['call'](this,_0x4d27e0,_0x446c14,_0x4a9b40);},VisuMZ[_0x3b4dfd(0x1bf)]['Window_Base_drawFace']=Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x46c)],Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x46c)]=function(_0x33f019,_0x408339,_0x5773ea,_0x1409ba,_0x4fb906,_0xb0f82b){const _0x41b95d=_0x3b4dfd;_0x4fb906=_0x4fb906||ImageManager['faceWidth'],_0xb0f82b=_0xb0f82b||ImageManager[_0x41b95d(0x61b)],_0x5773ea=Math[_0x41b95d(0x355)](_0x5773ea),_0x1409ba=Math['round'](_0x1409ba),_0x4fb906=Math[_0x41b95d(0x355)](_0x4fb906),_0xb0f82b=Math['round'](_0xb0f82b),VisuMZ[_0x41b95d(0x1bf)][_0x41b95d(0x402)][_0x41b95d(0x68e)](this,_0x33f019,_0x408339,_0x5773ea,_0x1409ba,_0x4fb906,_0xb0f82b);},VisuMZ['CoreEngine'][_0x3b4dfd(0x349)]=Window_Base[_0x3b4dfd(0x396)]['drawCharacter'],Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x31f)]=function(_0x3d2da6,_0x5d54eb,_0x21bde7,_0x535023){const _0x208fed=_0x3b4dfd;_0x21bde7=Math[_0x208fed(0x355)](_0x21bde7),_0x535023=Math[_0x208fed(0x355)](_0x535023),VisuMZ[_0x208fed(0x1bf)][_0x208fed(0x349)][_0x208fed(0x68e)](this,_0x3d2da6,_0x5d54eb,_0x21bde7,_0x535023);},VisuMZ[_0x3b4dfd(0x1bf)]['Window_Selectable_itemRect']=Window_Selectable[_0x3b4dfd(0x396)][_0x3b4dfd(0x1a0)],Window_Selectable[_0x3b4dfd(0x396)][_0x3b4dfd(0x1a0)]=function(_0x3af690){const _0x1e1f35=_0x3b4dfd;let _0x1f91fa=VisuMZ[_0x1e1f35(0x1bf)][_0x1e1f35(0x6bf)]['call'](this,_0x3af690);return _0x1f91fa['x']=Math[_0x1e1f35(0x355)](_0x1f91fa['x']),_0x1f91fa['y']=Math[_0x1e1f35(0x355)](_0x1f91fa['y']),_0x1f91fa[_0x1e1f35(0x2d3)]=Math['round'](_0x1f91fa['width']),_0x1f91fa[_0x1e1f35(0x2c8)]=Math['round'](_0x1f91fa['height']),_0x1f91fa;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x363)]=Window_StatusBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x475)],Window_StatusBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x475)]=function(_0x12156b,_0x28b18e,_0x5b976e){const _0xefee1d=_0x3b4dfd;_0x28b18e=Math['round'](_0x28b18e),_0x5b976e=Math[_0xefee1d(0x355)](_0x5b976e),VisuMZ[_0xefee1d(0x1bf)]['Window_StatusBase_drawActorSimpleStatus'][_0xefee1d(0x68e)](this,_0x12156b,_0x28b18e,_0x5b976e);},Window_Base['prototype'][_0x3b4dfd(0x677)]=function(){const _0x24195c=_0x3b4dfd;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':_0x24195c(0x245),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this[_0x24195c(0x413)],'targetBackOpacity':this[_0x24195c(0x903)],'targetContentsOpacity':this[_0x24195c(0x7e4)]};},Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x6bb)]=function(){const _0x253b1c=_0x3b4dfd;if(!this[_0x253b1c(0x939)])return;if(this[_0x253b1c(0x939)][_0x253b1c(0x2da)]<=0x0)return;this['x']=this['applyCoreEasing'](this['x'],this[_0x253b1c(0x939)][_0x253b1c(0x6d2)]),this['y']=this[_0x253b1c(0x211)](this['y'],this['_coreEasing'][_0x253b1c(0x548)]),this[_0x253b1c(0x979)]['x']=this[_0x253b1c(0x211)](this[_0x253b1c(0x979)]['x'],this[_0x253b1c(0x939)]['targetScaleX']),this['scale']['y']=this[_0x253b1c(0x211)](this[_0x253b1c(0x979)]['y'],this['_coreEasing'][_0x253b1c(0x34f)]),this[_0x253b1c(0x413)]=this[_0x253b1c(0x211)](this['opacity'],this['_coreEasing'][_0x253b1c(0x750)]),this[_0x253b1c(0x903)]=this[_0x253b1c(0x211)](this['backOpacity'],this[_0x253b1c(0x939)][_0x253b1c(0x4c3)]),this[_0x253b1c(0x7e4)]=this[_0x253b1c(0x211)](this[_0x253b1c(0x7e4)],this[_0x253b1c(0x939)]['targetContentsOpacity']),this[_0x253b1c(0x939)][_0x253b1c(0x2da)]--;},Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x211)]=function(_0xb1826a,_0x1b26ac){const _0x571273=_0x3b4dfd;if(!this[_0x571273(0x939)])return _0x1b26ac;const _0x368ce5=this['_coreEasing'][_0x571273(0x2da)],_0x32650e=this[_0x571273(0x939)][_0x571273(0x532)],_0xe5f3a6=this[_0x571273(0x79f)]((_0x32650e-_0x368ce5)/_0x32650e),_0x544d3d=this[_0x571273(0x79f)]((_0x32650e-_0x368ce5+0x1)/_0x32650e),_0x1317fb=(_0xb1826a-_0x1b26ac*_0xe5f3a6)/(0x1-_0xe5f3a6);return _0x1317fb+(_0x1b26ac-_0x1317fb)*_0x544d3d;},Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x79f)]=function(_0x3aa2c9){const _0x30c73b=_0x3b4dfd;if(!this[_0x30c73b(0x939)])return _0x3aa2c9;return VisuMZ[_0x30c73b(0x511)](_0x3aa2c9,this[_0x30c73b(0x939)][_0x30c73b(0x2fa)]||_0x30c73b(0x245));},Window_Base['prototype']['anchorCoreEasing']=function(_0x56d7d6,_0x5cdba3){const _0x5cd494=_0x3b4dfd;if(!this[_0x5cd494(0x939)])return;this['x']=this[_0x5cd494(0x939)][_0x5cd494(0x6d2)],this['y']=this['_coreEasing'][_0x5cd494(0x548)],this[_0x5cd494(0x979)]['x']=this['_coreEasing'][_0x5cd494(0x2b6)],this['scale']['y']=this[_0x5cd494(0x939)][_0x5cd494(0x34f)],this[_0x5cd494(0x413)]=this[_0x5cd494(0x939)][_0x5cd494(0x750)],this[_0x5cd494(0x903)]=this[_0x5cd494(0x939)][_0x5cd494(0x4c3)],this[_0x5cd494(0x7e4)]=this[_0x5cd494(0x939)]['targetContentsOpacity'],this[_0x5cd494(0x818)](_0x56d7d6,_0x5cdba3,this['x'],this['y'],this[_0x5cd494(0x979)]['x'],this[_0x5cd494(0x979)]['y'],this['opacity'],this[_0x5cd494(0x903)],this[_0x5cd494(0x7e4)]);},Window_Base[_0x3b4dfd(0x396)]['setupCoreEasing']=function(_0x58a7fc,_0x5cbb33,_0x37f539,_0x297012,_0x326ea4,_0x11abed,_0x135e77,_0xc58fbc,_0x2ec3ca){const _0x2d9ae8=_0x3b4dfd;this[_0x2d9ae8(0x939)]={'duration':_0x58a7fc,'wholeDuration':_0x58a7fc,'type':_0x5cbb33,'targetX':_0x37f539,'targetY':_0x297012,'targetScaleX':_0x326ea4,'targetScaleY':_0x11abed,'targetOpacity':_0x135e77,'targetBackOpacity':_0xc58fbc,'targetContentsOpacity':_0x2ec3ca};},Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x9fb)]=function(_0x2351ad,_0x2652ce,_0x56365e,_0x2a4c6e,_0xe90ed8){const _0x42d486=_0x3b4dfd;this[_0x42d486(0x43b)](),this[_0x42d486(0x27c)][_0x42d486(0x6f8)]=VisuMZ[_0x42d486(0x1bf)][_0x42d486(0x5af)]['Gold'][_0x42d486(0x390)];const _0x4c1ec5=VisuMZ[_0x42d486(0x1bf)][_0x42d486(0x5af)][_0x42d486(0x280)][_0x42d486(0x693)];if(_0x4c1ec5>0x0&&_0x2652ce===TextManager['currencyUnit']){const _0x4c2daf=_0x2a4c6e+(this['lineHeight']()-ImageManager[_0x42d486(0x6a4)])/0x2;this[_0x42d486(0x18f)](_0x4c1ec5,_0x56365e+(_0xe90ed8-ImageManager[_0x42d486(0x321)]),_0x4c2daf),_0xe90ed8-=ImageManager[_0x42d486(0x321)]+0x4;}else this[_0x42d486(0x78a)](ColorManager[_0x42d486(0x440)]()),this[_0x42d486(0x686)](_0x2652ce,_0x56365e,_0x2a4c6e,_0xe90ed8,_0x42d486(0x5b2)),_0xe90ed8-=this['textWidth'](_0x2652ce)+0x6;this[_0x42d486(0x618)]();const _0x2b633e=this[_0x42d486(0x4a9)](this[_0x42d486(0x2d9)]?VisuMZ['GroupDigits'](_0x2351ad):_0x2351ad);_0x2b633e>_0xe90ed8?this[_0x42d486(0x686)](VisuMZ[_0x42d486(0x1bf)][_0x42d486(0x5af)]['Gold'][_0x42d486(0x79e)],_0x56365e,_0x2a4c6e,_0xe90ed8,_0x42d486(0x5b2)):this[_0x42d486(0x686)](_0x2351ad,_0x56365e,_0x2a4c6e,_0xe90ed8,'right'),this['resetFontSettings']();},Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x319)]=function(_0x19eea9,_0x56be9f,_0x3da9a9,_0x405e7b,_0x4010f1){const _0x2c7fa6=_0x3b4dfd,_0x48126a=ImageManager[_0x2c7fa6(0x64e)](_0x2c7fa6(0xa2b)),_0x3950a8=ImageManager[_0x2c7fa6(0x321)],_0x3c3aa4=ImageManager[_0x2c7fa6(0x6a4)],_0x1171fd=_0x19eea9%0x10*_0x3950a8,_0x615a39=Math[_0x2c7fa6(0x9d3)](_0x19eea9/0x10)*_0x3c3aa4,_0x218e0f=_0x405e7b,_0x39d22f=_0x405e7b;this[_0x2c7fa6(0x27c)][_0x2c7fa6(0x1cd)][_0x2c7fa6(0x9ff)]=_0x4010f1,this[_0x2c7fa6(0x27c)][_0x2c7fa6(0x254)](_0x48126a,_0x1171fd,_0x615a39,_0x3950a8,_0x3c3aa4,_0x56be9f,_0x3da9a9,_0x218e0f,_0x39d22f),this[_0x2c7fa6(0x27c)][_0x2c7fa6(0x1cd)]['imageSmoothingEnabled']=!![];},Window_Base['prototype'][_0x3b4dfd(0x8b1)]=function(_0x1f035d,_0x1ac4bd,_0x1ceca0,_0x149add,_0x2d45ca,_0x594400){const _0x2f0ace=_0x3b4dfd,_0x4a256b=Math[_0x2f0ace(0x9d3)]((_0x1ceca0-0x2)*_0x149add),_0x4432ac=Sprite_Gauge['prototype']['gaugeHeight'][_0x2f0ace(0x68e)](this),_0x2bce95=_0x1ac4bd+this['lineHeight']()-_0x4432ac-0x2;this[_0x2f0ace(0x27c)]['fillRect'](_0x1f035d,_0x2bce95,_0x1ceca0,_0x4432ac,ColorManager[_0x2f0ace(0x54a)]()),this[_0x2f0ace(0x27c)][_0x2f0ace(0x533)](_0x1f035d+0x1,_0x2bce95+0x1,_0x4a256b,_0x4432ac-0x2,_0x2d45ca,_0x594400);},Window_Selectable[_0x3b4dfd(0x396)]['cursorDown']=function(_0x209f4e){const _0x24804f=_0x3b4dfd;let _0x39bc21=this['index']();const _0x296abb=this[_0x24804f(0x941)](),_0x2bd07c=this['maxCols']();if(this[_0x24804f(0x93f)]()&&(_0x39bc21<_0x296abb||_0x209f4e&&_0x2bd07c===0x1)){_0x39bc21+=_0x2bd07c;if(_0x39bc21>=_0x296abb)_0x39bc21=_0x296abb-0x1;this[_0x24804f(0x5fc)](_0x39bc21);}else{if(!this[_0x24804f(0x93f)]()){if(_0x24804f(0x62e)!==_0x24804f(0x95f))(_0x39bc21<_0x296abb-_0x2bd07c||_0x209f4e&&_0x2bd07c===0x1)&&(_0x24804f(0x51e)===_0x24804f(0x51e)?this[_0x24804f(0x5fc)]((_0x39bc21+_0x2bd07c)%_0x296abb):_0x781371[_0x24804f(0x1bf)]['Sprite_Button_updateOpacity']['call'](this));else return _0x25a222[_0x24804f(0x18a)]()||_0xdf57c0['areButtonsHidden']()?_0x268fd7[_0x24804f(0x1bf)][_0x24804f(0x5af)][_0x24804f(0x3da)][_0x24804f(0x699)]:'button';}}},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x375)]=Window_Selectable[_0x3b4dfd(0x396)][_0x3b4dfd(0x2f7)],Window_Selectable[_0x3b4dfd(0x396)][_0x3b4dfd(0x2f7)]=function(_0x4872e1){const _0x47f5c5=_0x3b4dfd;this['isUseModernControls']()&&_0x4872e1&&this[_0x47f5c5(0x793)]()===0x1&&this['index']()===this[_0x47f5c5(0x941)]()-0x1?this[_0x47f5c5(0x5fc)](0x0):_0x47f5c5(0x3c5)===_0x47f5c5(0x885)?_0x157047[_0x47f5c5(0x6d0)]&&(this['_forcedBattleSys']='OTB'):VisuMZ[_0x47f5c5(0x1bf)][_0x47f5c5(0x375)][_0x47f5c5(0x68e)](this,_0x4872e1);},Window_Selectable['prototype'][_0x3b4dfd(0x2a3)]=function(_0x17ee10){const _0x434072=_0x3b4dfd;let _0x1cb507=Math[_0x434072(0x67b)](0x0,this['index']());const _0x3395f8=this[_0x434072(0x941)](),_0x1e41f3=this[_0x434072(0x793)]();if(this['isUseModernControls']()&&_0x1cb507>0x0||_0x17ee10&&_0x1e41f3===0x1){if(_0x434072(0x3f6)!==_0x434072(0x7fc)){_0x1cb507-=_0x1e41f3;if(_0x1cb507<=0x0)_0x1cb507=0x0;this[_0x434072(0x5fc)](_0x1cb507);}else{for(const _0x36b441 of this[_0x434072(0x81b)]){!_0x36b441['isPlaying']()&&this['removeFauxAnimation'](_0x36b441);}this['processFauxAnimationRequests']();}}else{if(!this['isUseModernControls']()){if(_0x1cb507>=_0x1e41f3||_0x17ee10&&_0x1e41f3===0x1){if(_0x434072(0x487)!==_0x434072(0x605))this['smoothSelect']((_0x1cb507-_0x1e41f3+_0x3395f8)%_0x3395f8);else return this[_0x434072(0x386)]();}}}},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5ad)]=Window_Selectable['prototype']['cursorUp'],Window_Selectable[_0x3b4dfd(0x396)]['cursorUp']=function(_0x35e097){const _0x4014b2=_0x3b4dfd;this[_0x4014b2(0x93f)]()&&_0x35e097&&this['maxCols']()===0x1&&this['index']()===0x0?_0x4014b2(0x6b5)!==_0x4014b2(0x6b5)?_0x3eb82e[_0x4014b2(0x1bf)]['Settings']['UI']['SideButtons']&&(this[_0x4014b2(0x9c9)]=_0x34fb0a):this[_0x4014b2(0x5fc)](this[_0x4014b2(0x941)]()-0x1):VisuMZ[_0x4014b2(0x1bf)][_0x4014b2(0x5ad)][_0x4014b2(0x68e)](this,_0x35e097);},Window_Selectable[_0x3b4dfd(0x396)][_0x3b4dfd(0x93f)]=function(){const _0x2fdae8=_0x3b4dfd;return VisuMZ[_0x2fdae8(0x1bf)]['Settings']['QoL'][_0x2fdae8(0x956)];},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x9c7)]=Window_Selectable[_0x3b4dfd(0x396)]['processCursorMove'],Window_Selectable[_0x3b4dfd(0x396)][_0x3b4dfd(0x8ac)]=function(){const _0x21f948=_0x3b4dfd;this[_0x21f948(0x93f)]()?(this[_0x21f948(0x7f9)](),this[_0x21f948(0x416)]()):VisuMZ[_0x21f948(0x1bf)][_0x21f948(0x9c7)][_0x21f948(0x68e)](this);},Window_Selectable[_0x3b4dfd(0x396)][_0x3b4dfd(0x44a)]=function(){return!![];},Window_Selectable[_0x3b4dfd(0x396)][_0x3b4dfd(0x7f9)]=function(){const _0x24a346=_0x3b4dfd;if(this['isCursorMovable']()){const _0xc14ee8=this['index']();Input[_0x24a346(0x98f)](_0x24a346(0x86a))&&(Input[_0x24a346(0x33e)](_0x24a346(0x5a7))&&this[_0x24a346(0x44a)]()?this[_0x24a346(0x494)]():_0x24a346(0x193)===_0x24a346(0x691)?this[_0x24a346(0x27c)][_0x24a346(0x6f8)]<=0x60&&(this[_0x24a346(0x27c)][_0x24a346(0x6f8)]+=0x6):this[_0x24a346(0x2f7)](Input['isTriggered'](_0x24a346(0x86a)))),Input[_0x24a346(0x98f)]('up')&&(Input['isPressed'](_0x24a346(0x5a7))&&this['allowShiftScrolling']()?this[_0x24a346(0x82a)]():_0x24a346(0x8d3)!=='Cscaj'?this[_0x24a346(0x30a)]=_0x24a346(0x85a):this[_0x24a346(0x2a3)](Input['isTriggered']('up'))),Input[_0x24a346(0x98f)](_0x24a346(0x5b2))&&(_0x24a346(0x551)!==_0x24a346(0x5be)?this[_0x24a346(0x220)](Input[_0x24a346(0x447)](_0x24a346(0x5b2))):this[_0x24a346(0x27c)][_0x24a346(0x6f8)]+=0x6),Input[_0x24a346(0x98f)]('left')&&this['cursorLeft'](Input['isTriggered'](_0x24a346(0x3a6))),!this[_0x24a346(0x1a6)]('pagedown')&&Input[_0x24a346(0x98f)](_0x24a346(0x1dd))&&this[_0x24a346(0x494)](),!this[_0x24a346(0x1a6)]('pageup')&&Input[_0x24a346(0x98f)](_0x24a346(0x68b))&&this['cursorPageup'](),this['index']()!==_0xc14ee8&&this[_0x24a346(0x5b8)]();}},Window_Selectable[_0x3b4dfd(0x396)][_0x3b4dfd(0x416)]=function(){const _0x4fd41b=_0x3b4dfd;if(this[_0x4fd41b(0x4d9)]()){if(_0x4fd41b(0x761)===_0x4fd41b(0x761)){const _0x5a4048=this['index']();Input['isTriggered']('home')&&this[_0x4fd41b(0x5fc)](Math[_0x4fd41b(0x467)](this[_0x4fd41b(0x50e)](),0x0));Input[_0x4fd41b(0x447)]('end')&&this[_0x4fd41b(0x5fc)](Math[_0x4fd41b(0x67b)](this[_0x4fd41b(0x50e)](),this[_0x4fd41b(0x941)]()-0x1));if(this[_0x4fd41b(0x50e)]()!==_0x5a4048){if(_0x4fd41b(0x554)==='WdFdP')this[_0x4fd41b(0x5b8)]();else{if(this[_0x4fd41b(0x678)]>0x63)return this[_0x4fd41b(0x28a)](_0xffead7);return _0x240a77['CoreEngine'][_0x4fd41b(0x461)]['call'](this,_0x41c188);}}}else return _0x3cd4d5[_0x4fd41b(0x1bf)][_0x4fd41b(0x5af)]['Color'][_0x4fd41b(0x809)];}},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x199)]=Window_Selectable[_0x3b4dfd(0x396)][_0x3b4dfd(0x3a4)],Window_Selectable[_0x3b4dfd(0x396)][_0x3b4dfd(0x3a4)]=function(){const _0x1a9546=_0x3b4dfd;if(this[_0x1a9546(0x93f)]()){if(_0x1a9546(0x3c8)===_0x1a9546(0x7dd)){_0x21188b['CoreEngine']['Scene_Battle_createSpritesetFix']['call'](this);const _0x5479dd=this['_spriteset']['_timerSprite'];if(_0x5479dd)this['addChild'](_0x5479dd);}else this[_0x1a9546(0x7e3)]();}else{if('gKvaR'===_0x1a9546(0x236)){const _0x1d5e09=_0x1a9546(0x658);_0x3628b4[_0x1a9546(0x8b7)](_0x32d4ab)[_0x1a9546(0x8b7)]('')['remove'](null);const _0x42b28a=_0x3dc86d[_0x1a9546(0x25b)](_0x1a9546(0x446))[_0x1a9546(0x58b)]();_0x4b677e['CoreEngine']['ExportString'](_0x42b28a,_0x1d5e09,!![]),_0x35df76[_0x1a9546(0x46a)]['_active']=!![];}else VisuMZ[_0x1a9546(0x1bf)][_0x1a9546(0x199)][_0x1a9546(0x68e)](this);}},Window_Selectable['prototype']['processTouchModernControls']=function(){const _0x5d9e3f=_0x3b4dfd;VisuMZ[_0x5d9e3f(0x1bf)][_0x5d9e3f(0x199)][_0x5d9e3f(0x68e)](this);},Window_Selectable[_0x3b4dfd(0x396)][_0x3b4dfd(0x2e3)]=function(){const _0x589452=_0x3b4dfd;return VisuMZ['CoreEngine']['Settings'][_0x589452(0x5a1)]['ColSpacing'];},Window_Selectable[_0x3b4dfd(0x396)]['rowSpacing']=function(){const _0x2dc213=_0x3b4dfd;return VisuMZ['CoreEngine'][_0x2dc213(0x5af)][_0x2dc213(0x5a1)]['RowSpacing'];},Window_Selectable['prototype'][_0x3b4dfd(0x206)]=function(){const _0x199425=_0x3b4dfd;return Window_Scrollable[_0x199425(0x396)]['itemHeight']['call'](this)+VisuMZ['CoreEngine'][_0x199425(0x5af)][_0x199425(0x5a1)]['ItemHeight'];;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x3ff)]=Window_Selectable[_0x3b4dfd(0x396)]['drawBackgroundRect'],Window_Selectable[_0x3b4dfd(0x396)][_0x3b4dfd(0x728)]=function(_0x2e849f){const _0x447d71=_0x3b4dfd,_0x204f23=VisuMZ['CoreEngine'][_0x447d71(0x5af)][_0x447d71(0x5a1)];if(_0x204f23[_0x447d71(0x5e4)]===![])return;if(_0x204f23['DrawItemBackgroundJS']){if('cHjTG'!==_0x447d71(0x759)){_0x5c4ac4['ConvertParams'](_0x4ba6e7,_0x15ad35);const _0x4efdc5=_0x5a2a16['min'](_0x1f105f[_0x447d71(0x576)],_0xcb05a7[_0x447d71(0x652)]),_0x576c6d=_0x1d386f[_0x447d71(0x67b)](_0x50ca21[_0x447d71(0x576)],_0x569fe2[_0x447d71(0x652)]);for(let _0x32a6d6=_0x4efdc5;_0x32a6d6<=_0x576c6d;_0x32a6d6++){_0x2ae4cb[_0x447d71(0x878)](_0x32a6d6);}}else _0x204f23[_0x447d71(0x317)][_0x447d71(0x68e)](this,_0x2e849f);}else _0x447d71(0x504)===_0x447d71(0x504)?VisuMZ[_0x447d71(0x1bf)][_0x447d71(0x3ff)][_0x447d71(0x68e)](this,_0x2e849f):(this[_0x447d71(0x319)](_0x2aff52,_0x85416e,_0x11b25f,this[_0x447d71(0x2bc)]()),_0x514303-=this[_0x447d71(0x2bc)]()+0x2,_0x4aafb4+=this[_0x447d71(0x2bc)]()+0x2);},VisuMZ['CoreEngine'][_0x3b4dfd(0x611)]=Window_Gold[_0x3b4dfd(0x396)][_0x3b4dfd(0x443)],Window_Gold[_0x3b4dfd(0x396)][_0x3b4dfd(0x443)]=function(){const _0x90e02d=_0x3b4dfd;if(this[_0x90e02d(0x2c5)]()){if(_0x90e02d(0x4a1)!==_0x90e02d(0x4a1))return _0x4dc9b8[_0x90e02d(0x511)](_0x44b519,this[_0x90e02d(0x767)]);else this[_0x90e02d(0x427)]();}else VisuMZ[_0x90e02d(0x1bf)][_0x90e02d(0x611)][_0x90e02d(0x68e)](this);},Window_Gold[_0x3b4dfd(0x396)][_0x3b4dfd(0x2c5)]=function(){const _0x205cb8=_0x3b4dfd;if(TextManager['currencyUnit']!==this[_0x205cb8(0x925)]())return![];return VisuMZ[_0x205cb8(0x1bf)][_0x205cb8(0x5af)]['Gold'][_0x205cb8(0x457)];},Window_Gold[_0x3b4dfd(0x396)][_0x3b4dfd(0x427)]=function(){const _0x2d7f8c=_0x3b4dfd;this[_0x2d7f8c(0x43b)](),this[_0x2d7f8c(0x27c)][_0x2d7f8c(0x670)](),this[_0x2d7f8c(0x27c)]['fontSize']=VisuMZ[_0x2d7f8c(0x1bf)][_0x2d7f8c(0x5af)][_0x2d7f8c(0x280)][_0x2d7f8c(0x390)];const _0x310e9f=VisuMZ['CoreEngine'][_0x2d7f8c(0x5af)][_0x2d7f8c(0x280)][_0x2d7f8c(0x693)],_0x924ff5=this[_0x2d7f8c(0x234)](0x0);if(_0x310e9f>0x0){const _0x35a9e4=_0x924ff5['y']+(this[_0x2d7f8c(0x2b8)]()-ImageManager[_0x2d7f8c(0x6a4)])/0x2;this[_0x2d7f8c(0x18f)](_0x310e9f,_0x924ff5['x'],_0x35a9e4);const _0x5ca5fc=ImageManager[_0x2d7f8c(0x321)]+0x4;_0x924ff5['x']+=_0x5ca5fc,_0x924ff5[_0x2d7f8c(0x2d3)]-=_0x5ca5fc;}this[_0x2d7f8c(0x78a)](ColorManager[_0x2d7f8c(0x440)]()),this[_0x2d7f8c(0x686)](this[_0x2d7f8c(0x925)](),_0x924ff5['x'],_0x924ff5['y'],_0x924ff5[_0x2d7f8c(0x2d3)],'left');const _0x5cef82=this[_0x2d7f8c(0x4a9)](this['currencyUnit']())+0x6;;_0x924ff5['x']+=_0x5cef82,_0x924ff5['width']-=_0x5cef82,this['resetTextColor']();const _0x375c29=this[_0x2d7f8c(0x9db)](),_0x4a710f=this[_0x2d7f8c(0x4a9)](this[_0x2d7f8c(0x2d9)]?VisuMZ[_0x2d7f8c(0x59b)](this['value']()):this[_0x2d7f8c(0x9db)]());_0x4a710f>_0x924ff5[_0x2d7f8c(0x2d3)]?this['drawText'](VisuMZ[_0x2d7f8c(0x1bf)][_0x2d7f8c(0x5af)][_0x2d7f8c(0x280)]['GoldOverlap'],_0x924ff5['x'],_0x924ff5['y'],_0x924ff5[_0x2d7f8c(0x2d3)],_0x2d7f8c(0x5b2)):'rLnlx'!==_0x2d7f8c(0x60b)?(_0x3c8084[_0x2d7f8c(0x670)](),this[_0x2d7f8c(0x2b1)]('keyboard')):this[_0x2d7f8c(0x686)](this[_0x2d7f8c(0x9db)](),_0x924ff5['x'],_0x924ff5['y'],_0x924ff5[_0x2d7f8c(0x2d3)],_0x2d7f8c(0x5b2)),this[_0x2d7f8c(0x43b)]();},Window_StatusBase['prototype']['drawParamText']=function(_0x521265,_0x4ca31d,_0x3f6584,_0x1789c5,_0x9f0a96){const _0x48a6cd=_0x3b4dfd;_0x1789c5=String(_0x1789c5||'')[_0x48a6cd(0x33f)]();if(VisuMZ['CoreEngine']['Settings'][_0x48a6cd(0x339)][_0x48a6cd(0x255)]){if(_0x48a6cd(0x1c3)===_0x48a6cd(0x1c3)){const _0x5db364=VisuMZ[_0x48a6cd(0x7da)](_0x1789c5);if(_0x9f0a96){if(_0x48a6cd(0x84e)===_0x48a6cd(0x84e))this['drawIconBySize'](_0x5db364,_0x521265,_0x4ca31d,this[_0x48a6cd(0x2bc)]()),_0x3f6584-=this[_0x48a6cd(0x2bc)]()+0x2,_0x521265+=this['gaugeLineHeight']()+0x2;else{const _0x48344d=_0x433daf[_0x28b573['parameters'][0x0]];if(_0x48344d&&this[_0x48a6cd(0x3fd)]<=0xa){this[_0x48a6cd(0x3fd)]++;let _0x8305b0=_0x3e4c6c[_0x48a6cd(0x1bf)][_0x48a6cd(0x957)](_0x48344d[_0x48a6cd(0x24e)]);_0x8305b0[_0x48a6cd(0xa16)]>0x0&&(_0x2f6bb3+=_0x227313,_0x3baf7c+=_0x181f70,_0x31bd2c+=_0x48a6cd(0x61a)[_0x48a6cd(0x4f9)](_0x48344d['id'],_0x48344d[_0x48a6cd(0x926)]),_0x119e58+=_0x35acdc,_0x45d452+=_0x8305b0,_0x4dc2ff+=_0x34b44a,_0x52efb5+=_0x48a6cd(0x751)['format'](_0x48344d['id'],_0x48344d[_0x48a6cd(0x926)]),_0x32a57f+=_0x49654b),this[_0x48a6cd(0x3fd)]--;}}}else this[_0x48a6cd(0x18f)](_0x5db364,_0x521265+0x2,_0x4ca31d+0x2),_0x3f6584-=ImageManager['iconWidth']+0x4,_0x521265+=ImageManager[_0x48a6cd(0x321)]+0x4;}else _0x233659*=_0x31fcbf(_0xf47992);}const _0x5c5c81=TextManager[_0x48a6cd(0x4db)](_0x1789c5);this['resetFontSettings'](),this[_0x48a6cd(0x78a)](ColorManager[_0x48a6cd(0x440)]()),_0x9f0a96?(this['contents'][_0x48a6cd(0x6f8)]=this[_0x48a6cd(0x9bf)](),this[_0x48a6cd(0x27c)][_0x48a6cd(0x686)](_0x5c5c81,_0x521265,_0x4ca31d,_0x3f6584,this['gaugeLineHeight'](),_0x48a6cd(0x3a6))):this[_0x48a6cd(0x686)](_0x5c5c81,_0x521265,_0x4ca31d,_0x3f6584),this[_0x48a6cd(0x43b)]();},Window_StatusBase['prototype'][_0x3b4dfd(0x9bf)]=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase['prototype'][_0x3b4dfd(0x65a)]=function(_0x2bb7f8,_0x3cee4d,_0x1484f2,_0x218547){const _0x4451e5=_0x3b4dfd;_0x218547=_0x218547||0xa8,this['resetTextColor']();if(VisuMZ[_0x4451e5(0x1bf)]['Settings']['UI'][_0x4451e5(0x535)])this[_0x4451e5(0x71c)](_0x2bb7f8[_0x4451e5(0xa22)]()[_0x4451e5(0x926)],_0x3cee4d,_0x1484f2,_0x218547);else{if(_0x4451e5(0x2e1)===_0x4451e5(0x660)){const _0x11fe24=this['innerWidth'];this[_0x4451e5(0x335)](0x0,0x0,_0x11fe24,this[_0x4451e5(0x2b8)]());const _0x1920fa=this['textSizeEx'](_0x40a5e1[_0x4451e5(0x5b7)]())[_0x4451e5(0x2d3)];this[_0x4451e5(0x71c)](_0x6f06c4[_0x4451e5(0x5b7)](),_0xb800e2[_0x4451e5(0x9d3)]((_0x11fe24-_0x1920fa)/0x2),0x0);}else{const _0x2a800f=_0x2bb7f8[_0x4451e5(0xa22)]()[_0x4451e5(0x926)][_0x4451e5(0x5df)](/\\I\[(\d+)\]/gi,'');this[_0x4451e5(0x686)](_0x2a800f,_0x3cee4d,_0x1484f2,_0x218547);}}},Window_StatusBase[_0x3b4dfd(0x396)]['drawActorNickname']=function(_0x157d92,_0x11ee99,_0x5c539e,_0xd6c90){const _0x4970f2=_0x3b4dfd;_0xd6c90=_0xd6c90||0x10e,this['resetTextColor']();if(VisuMZ[_0x4970f2(0x1bf)][_0x4970f2(0x5af)]['UI'][_0x4970f2(0x27b)])this[_0x4970f2(0x71c)](_0x157d92[_0x4970f2(0x50c)](),_0x11ee99,_0x5c539e,_0xd6c90);else{const _0x2f42ff=_0x157d92[_0x4970f2(0x50c)]()[_0x4970f2(0x5df)](/\\I\[(\d+)\]/gi,'');this[_0x4970f2(0x686)](_0x157d92[_0x4970f2(0x50c)](),_0x11ee99,_0x5c539e,_0xd6c90);}},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x2d5)]=Window_StatusBase[_0x3b4dfd(0x396)]['drawActorLevel'],Window_StatusBase[_0x3b4dfd(0x396)][_0x3b4dfd(0x701)]=function(_0x4318d6,_0x3633ce,_0x2e4042){const _0x35724=_0x3b4dfd;if(VisuMZ[_0x35724(0x1bf)][_0x35724(0x5af)][_0x35724(0x339)]['ShowActorLevel']===![])return;if(this['isExpGaugeDrawn']())this['drawActorExpGauge'](_0x4318d6,_0x3633ce,_0x2e4042);VisuMZ[_0x35724(0x1bf)]['Window_StatusBase_drawActorLevel'][_0x35724(0x68e)](this,_0x4318d6,_0x3633ce,_0x2e4042);},Window_StatusBase['prototype']['isExpGaugeDrawn']=function(){const _0x43a63c=_0x3b4dfd;return VisuMZ[_0x43a63c(0x1bf)]['Settings']['UI'][_0x43a63c(0x828)];},Window_StatusBase[_0x3b4dfd(0x396)]['drawActorExpGauge']=function(_0x2b1a21,_0x52eb0a,_0xe21dea){const _0x3719bf=_0x3b4dfd;if(!_0x2b1a21)return;if(!_0x2b1a21['isActor']())return;const _0x5aa3a2=0x80,_0x5efeb7=_0x2b1a21[_0x3719bf(0x505)]();let _0x5547d2=ColorManager[_0x3719bf(0x1ab)](),_0x32124b=ColorManager['expGaugeColor2']();if(_0x5efeb7>=0x1){if(_0x3719bf(0x999)!==_0x3719bf(0x999)){const _0x5bb704=_0x2911f1['Symbol'];let _0x3872e0=_0x5a19c4[_0x3719bf(0x974)];if(['','Untitled'][_0x3719bf(0x5e6)](_0x3872e0))_0x3872e0=_0x406aff[_0x3719bf(0x380)]['call'](this);const _0x5b5714=_0x5634bc[_0x3719bf(0x289)]['call'](this),_0x3a6003=_0x27b674[_0x3719bf(0x5e1)][_0x3719bf(0x68e)](this);this[_0x3719bf(0x89b)](_0x3872e0,_0x5bb704,_0x5b5714,_0x3a6003),this[_0x3719bf(0x5bc)](_0x5bb704,_0x1930df[_0x3719bf(0x316)][_0x3719bf(0x2bd)](this,_0x3a6003));}else _0x5547d2=ColorManager['maxLvGaugeColor1'](),_0x32124b=ColorManager['maxLvGaugeColor2']();}this[_0x3719bf(0x8b1)](_0x52eb0a,_0xe21dea,_0x5aa3a2,_0x5efeb7,_0x5547d2,_0x32124b);},Window_EquipStatus['prototype']['drawAllParams']=function(){const _0x3f28b3=_0x3b4dfd;let _0x51939a=0x0;for(const _0x534446 of VisuMZ[_0x3f28b3(0x1bf)]['Settings'][_0x3f28b3(0x339)][_0x3f28b3(0x7a2)]){const _0x4b1a67=this['itemPadding'](),_0x198feb=this[_0x3f28b3(0x82d)](_0x51939a);this[_0x3f28b3(0x579)](_0x4b1a67,_0x198feb,_0x534446),_0x51939a++;}},Window_EquipStatus[_0x3b4dfd(0x396)]['drawParamName']=function(_0x383505,_0x35039d,_0x4da896){const _0x278f74=_0x3b4dfd,_0xd08d59=this[_0x278f74(0x990)]()-this[_0x278f74(0x53b)]()*0x2;this[_0x278f74(0x9a5)](_0x383505,_0x35039d,_0xd08d59,_0x4da896,![]);},Window_EquipStatus[_0x3b4dfd(0x396)][_0x3b4dfd(0x1ef)]=function(_0x57b6fd,_0x5e9d07,_0x1cc821){const _0x5f22b3=_0x3b4dfd,_0x5f0457=this[_0x5f22b3(0x720)]();this[_0x5f22b3(0x618)](),this['drawText'](this[_0x5f22b3(0x202)][_0x5f22b3(0x3b0)](_0x1cc821,!![]),_0x57b6fd,_0x5e9d07,_0x5f0457,'right');},Window_EquipStatus[_0x3b4dfd(0x396)][_0x3b4dfd(0x1bd)]=function(_0x18a3b8,_0x159ee9){const _0x76d89c=_0x3b4dfd,_0x40c947=this['rightArrowWidth']();this['changeTextColor'](ColorManager[_0x76d89c(0x440)]());const _0x485cda=VisuMZ['CoreEngine'][_0x76d89c(0x5af)]['UI'][_0x76d89c(0x2b7)];this[_0x76d89c(0x686)](_0x485cda,_0x18a3b8,_0x159ee9,_0x40c947,_0x76d89c(0x637));},Window_EquipStatus[_0x3b4dfd(0x396)]['drawNewParam']=function(_0x5b539a,_0xe2b959,_0x321427){const _0x59c6f2=_0x3b4dfd,_0x49b1b5=this[_0x59c6f2(0x720)](),_0x3a3a52=this[_0x59c6f2(0x948)][_0x59c6f2(0x3b0)](_0x321427),_0x1f35a7=_0x3a3a52-this['_actor'][_0x59c6f2(0x3b0)](_0x321427);this[_0x59c6f2(0x78a)](ColorManager[_0x59c6f2(0x417)](_0x1f35a7)),this[_0x59c6f2(0x686)](this[_0x59c6f2(0x948)][_0x59c6f2(0x3b0)](_0x321427,!![]),_0x5b539a,_0xe2b959,_0x49b1b5,'right');},VisuMZ[_0x3b4dfd(0x1bf)]['Window_EquipItem_isEnabled']=Window_EquipItem['prototype'][_0x3b4dfd(0x909)],Window_EquipItem[_0x3b4dfd(0x396)][_0x3b4dfd(0x909)]=function(_0x221c4f){const _0x928b44=_0x3b4dfd;if(_0x221c4f&&this[_0x928b44(0x202)])return this[_0x928b44(0x202)]['canEquip'](_0x221c4f);else{if(_0x928b44(0x627)===_0x928b44(0x9bc))this[_0x928b44(0x88d)](_0x1c0645);else return VisuMZ[_0x928b44(0x1bf)][_0x928b44(0x37b)]['call'](this,_0x221c4f);}},Window_StatusParams[_0x3b4dfd(0x396)][_0x3b4dfd(0x941)]=function(){const _0x4a098c=_0x3b4dfd;return VisuMZ[_0x4a098c(0x1bf)][_0x4a098c(0x5af)][_0x4a098c(0x339)][_0x4a098c(0x7a2)]['length'];},Window_StatusParams[_0x3b4dfd(0x396)][_0x3b4dfd(0x579)]=function(_0x2a3249){const _0x1d3159=_0x3b4dfd,_0x459ac9=this[_0x1d3159(0x234)](_0x2a3249),_0x45e473=VisuMZ[_0x1d3159(0x1bf)]['Settings']['Param'][_0x1d3159(0x7a2)][_0x2a3249],_0x4cdad2=TextManager[_0x1d3159(0x4db)](_0x45e473),_0x4d5a4e=this['_actor'][_0x1d3159(0x3b0)](_0x45e473,!![]);this[_0x1d3159(0x9a5)](_0x459ac9['x'],_0x459ac9['y'],0xa0,_0x45e473,![]),this[_0x1d3159(0x618)](),this['drawText'](_0x4d5a4e,_0x459ac9['x']+0xa0,_0x459ac9['y'],0x3c,'right');};if(VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5af)][_0x3b4dfd(0x456)]['EnableNameInput']){VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5af)]['KeyboardInput'][_0x3b4dfd(0x57e)]&&(Window_NameInput[_0x3b4dfd(0x577)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x3b4dfd(0x695),'OK']);;VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x72d)]=Window_NameInput[_0x3b4dfd(0x396)]['initialize'],Window_NameInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x24b)]=function(_0x5f2948){const _0x202fdc=_0x3b4dfd;this[_0x202fdc(0x96c)]=this[_0x202fdc(0x590)](),VisuMZ[_0x202fdc(0x1bf)][_0x202fdc(0x72d)][_0x202fdc(0x68e)](this,_0x5f2948),this[_0x202fdc(0x96c)]==='default'?this[_0x202fdc(0x872)](0x0):(Input[_0x202fdc(0x670)](),this[_0x202fdc(0x880)]());},Window_NameInput[_0x3b4dfd(0x396)]['defaultInputMode']=function(){const _0x428c3f=_0x3b4dfd;if(Input[_0x428c3f(0x9ba)]())return _0x428c3f(0x4aa);return VisuMZ['CoreEngine'][_0x428c3f(0x5af)][_0x428c3f(0x456)][_0x428c3f(0x4a3)]||'keyboard';},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x25a)]=Window_NameInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x788)],Window_NameInput['prototype'][_0x3b4dfd(0x788)]=function(){const _0x56050e=_0x3b4dfd;if(!this[_0x56050e(0xa0f)]())return;if(!this[_0x56050e(0x56f)])return;if(this[_0x56050e(0x96c)]===_0x56050e(0x961)&&Input[_0x56050e(0x65c)]())this[_0x56050e(0x2b1)]('default');else{if(Input[_0x56050e(0x8ec)](_0x56050e(0x496))){if(_0x56050e(0x3c1)===_0x56050e(0x3c1))Input[_0x56050e(0x670)](),this[_0x56050e(0x4fc)]();else return _0x4de1bf[_0x56050e(0x1bf)][_0x56050e(0x5af)][_0x56050e(0x5a1)]['ItemPadding'];}else{if(Input[_0x56050e(0x447)](_0x56050e(0x4fd))){if('RlWvY'===_0x56050e(0x7e1)){const _0x7d5605=_0x3961dd[_0x409ea5[_0x56050e(0x201)]],_0x3c03ad=_0x5d803a[_0x56050e(0x668)],_0x22b7ae=_0x4505ad['mirror'],_0x4d9f00=_0x356cfe[_0x56050e(0x756)];let _0x42acef=this[_0x56050e(0x7b7)]();const _0x54dcda=this[_0x56050e(0x85e)]();if(this[_0x56050e(0x764)](_0x7d5605))for(const _0x1a4f1e of _0x3c03ad){this[_0x56050e(0x94d)]([_0x1a4f1e],_0x7d5605,_0x22b7ae,_0x42acef,_0x4d9f00),_0x42acef+=_0x54dcda;}else this[_0x56050e(0x94d)](_0x3c03ad,_0x7d5605,_0x22b7ae,_0x42acef,_0x4d9f00);}else Input[_0x56050e(0x670)](),this[_0x56050e(0x96c)]===_0x56050e(0x961)?'yFEqw'!==_0x56050e(0x8c5)?this[_0x56050e(0x2b1)]('default'):0x1-this[_0x56050e(0x921)](_0x54e72d)>this[_0x56050e(0x277)](_0x346d26)&&(_0x20d862[_0x56050e(0x469)]=![],_0x19bc2f[_0x56050e(0x4cb)]=!![]):'Jjxtp'==='wmexH'?(this['createPointAnimationSprite']([_0x2af3e3],_0x5de424,_0x876cc3,_0xaa6de4,_0x42f4b0),_0x78b411+=_0x2ca23f):this[_0x56050e(0x2b1)]('keyboard');}else{if(this[_0x56050e(0x96c)]===_0x56050e(0x961))'pUWhK'==='pUWhK'?this[_0x56050e(0x5de)]():_0x25abfd[_0x56050e(0x396)][_0x56050e(0x8ac)][_0x56050e(0x68e)](this);else Input[_0x56050e(0x8ec)](_0x56050e(0x90e))?(Input['clear'](),this[_0x56050e(0x2b1)](_0x56050e(0x961))):VisuMZ[_0x56050e(0x1bf)][_0x56050e(0x25a)][_0x56050e(0x68e)](this);}}}},VisuMZ['CoreEngine'][_0x3b4dfd(0xa2c)]=Window_NameInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x3a4)],Window_NameInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x3a4)]=function(){const _0x4157f9=_0x3b4dfd;if(!this[_0x4157f9(0x52d)]())return;if(this[_0x4157f9(0x96c)]===_0x4157f9(0x961)){if(TouchInput[_0x4157f9(0x447)]()&&this['isTouchedInsideFrame']()){if(_0x4157f9(0x1f8)===_0x4157f9(0x1f8))this[_0x4157f9(0x2b1)](_0x4157f9(0x4aa));else{_0x281877[_0x4157f9(0x8a6)](_0x42c488,_0x5eb144);const _0x30c9d6=_0x1919cc['round'](_0x170b7c[_0x4157f9(0x93c)])[_0x4157f9(0x1e1)](-0x64,0x64),_0xe5967f=_0xa4c803['_currentBgm'];_0xe5967f&&(_0xe5967f[_0x4157f9(0x93c)]=_0x30c9d6,_0xb74cf0[_0x4157f9(0x22a)](_0xe5967f));}}else{if(TouchInput[_0x4157f9(0x4f6)]()){if(_0x4157f9(0x846)!==_0x4157f9(0x5e3))this[_0x4157f9(0x2b1)](_0x4157f9(0x4aa));else return'#%1'[_0x4157f9(0x4f9)](_0x5b19c1(_0x13dc63['$1']));}}}else{if('SGiWA'!=='rBsrv')VisuMZ['CoreEngine'][_0x4157f9(0xa2c)]['call'](this);else for(const _0x42b9a7 of _0x2084bb[_0x4157f9(0x56d)]){_0x42b9a7[_0x4157f9(0x8e2)]['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x42b9a7[_0x4157f9(0x678)]=_0x26dacb['max'](_0x19bcd9(_0x4f9fb4['$1']),0x1));}}},Window_NameInput[_0x3b4dfd(0x396)]['processKeyboardHandling']=function(){const _0x2f9809=_0x3b4dfd;if(Input[_0x2f9809(0x8ec)]('enter')){if('tpyRL'!==_0x2f9809(0x2e2))Input[_0x2f9809(0x670)](),this[_0x2f9809(0x608)]();else return _0x30bd4d[_0x2f9809(0x630)][_0x2f9809(0x34e)]['call'](this);}else{if(Input[_0x2f9809(0x7cb)]!==undefined){if(_0x2f9809(0x481)===_0x2f9809(0x30f))_0x24531f['CoreEngine'][_0x2f9809(0x5af)]['UI']['RepositionActors']?this[_0x2f9809(0x833)](_0x491d22):_0x504cb8['CoreEngine']['Sprite_Actor_setActorHome'][_0x2f9809(0x68e)](this,_0x32c630);else{let _0x2d4565=Input['_inputString'],_0x3d38a9=_0x2d4565[_0x2f9809(0xa16)];for(let _0xacf784=0x0;_0xacf784<_0x3d38a9;++_0xacf784){this[_0x2f9809(0x63a)][_0x2f9809(0x8e6)](_0x2d4565[_0xacf784])?SoundManager[_0x2f9809(0x365)]():SoundManager[_0x2f9809(0x510)]();}Input[_0x2f9809(0x670)]();}}}},Window_NameInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x2b1)]=function(_0x2ac155){const _0x3cd7ee=_0x3b4dfd;let _0x377be4=this['_mode'];this[_0x3cd7ee(0x96c)]=_0x2ac155,_0x377be4!==this['_mode']&&(this[_0x3cd7ee(0x443)](),SoundManager['playOk'](),this[_0x3cd7ee(0x96c)]===_0x3cd7ee(0x4aa)?this[_0x3cd7ee(0x872)](0x0):_0x3cd7ee(0x955)!=='dFcGf'?(_0xeb40e0+=_0x55bc64+'\x0a',_0x293dc5+=_0x3cd7ee(0x40f)[_0x3cd7ee(0x4f9)](_0x337791['parameters'][0x0])):this[_0x3cd7ee(0x872)](-0x1));},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x45d)]=Window_NameInput['prototype']['cursorDown'],Window_NameInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x2f7)]=function(_0x3fb1ca){const _0x31b7a8=_0x3b4dfd;if(this[_0x31b7a8(0x96c)]===_0x31b7a8(0x961)&&!Input['isArrowPressed']())return;if(Input[_0x31b7a8(0x7d7)]())return;VisuMZ[_0x31b7a8(0x1bf)][_0x31b7a8(0x45d)][_0x31b7a8(0x68e)](this,_0x3fb1ca),this['switchModes'](_0x31b7a8(0x4aa));},VisuMZ['CoreEngine'][_0x3b4dfd(0x23f)]=Window_NameInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x2a3)],Window_NameInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x2a3)]=function(_0x3a6967){const _0x2ec5be=_0x3b4dfd;if(this['_mode']===_0x2ec5be(0x961)&&!Input[_0x2ec5be(0x763)]())return;if(Input[_0x2ec5be(0x7d7)]())return;VisuMZ[_0x2ec5be(0x1bf)][_0x2ec5be(0x23f)][_0x2ec5be(0x68e)](this,_0x3a6967),this[_0x2ec5be(0x2b1)](_0x2ec5be(0x4aa));},VisuMZ[_0x3b4dfd(0x1bf)]['Window_NameInput_cursorRight']=Window_NameInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x220)],Window_NameInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x220)]=function(_0x5aebb2){const _0x2c0134=_0x3b4dfd;if(this[_0x2c0134(0x96c)]===_0x2c0134(0x961)&&!Input['isArrowPressed']())return;if(Input[_0x2c0134(0x7d7)]())return;VisuMZ[_0x2c0134(0x1bf)]['Window_NameInput_cursorRight'][_0x2c0134(0x68e)](this,_0x5aebb2),this[_0x2c0134(0x2b1)](_0x2c0134(0x4aa));},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x90f)]=Window_NameInput[_0x3b4dfd(0x396)]['cursorLeft'],Window_NameInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x4d1)]=function(_0x3c785d){const _0x5a5ed7=_0x3b4dfd;if(this[_0x5a5ed7(0x96c)]===_0x5a5ed7(0x961)&&!Input['isArrowPressed']())return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine'][_0x5a5ed7(0x90f)][_0x5a5ed7(0x68e)](this,_0x3c785d),this['switchModes'](_0x5a5ed7(0x4aa));},VisuMZ['CoreEngine'][_0x3b4dfd(0x685)]=Window_NameInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x494)],Window_NameInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x494)]=function(){const _0x13bfae=_0x3b4dfd;if(this[_0x13bfae(0x96c)]===_0x13bfae(0x961))return;if(Input[_0x13bfae(0x7d7)]())return;VisuMZ[_0x13bfae(0x1bf)][_0x13bfae(0x685)][_0x13bfae(0x68e)](this),this['switchModes'](_0x13bfae(0x4aa));},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x57b)]=Window_NameInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x82a)],Window_NameInput['prototype']['cursorPageup']=function(){const _0x12f25f=_0x3b4dfd;if(this['_mode']===_0x12f25f(0x961))return;if(Input[_0x12f25f(0x7d7)]())return;VisuMZ['CoreEngine'][_0x12f25f(0x57b)][_0x12f25f(0x68e)](this),this[_0x12f25f(0x2b1)]('default');},VisuMZ[_0x3b4dfd(0x1bf)]['Window_NameInput_refresh']=Window_NameInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x443)],Window_NameInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x443)]=function(){const _0x60e50c=_0x3b4dfd;if(this[_0x60e50c(0x96c)]===_0x60e50c(0x961)){this['contents'][_0x60e50c(0x670)](),this[_0x60e50c(0x721)][_0x60e50c(0x670)](),this[_0x60e50c(0x618)]();let _0x18d75e=VisuMZ['CoreEngine']['Settings'][_0x60e50c(0x456)][_0x60e50c(0x20a)][_0x60e50c(0x4eb)]('\x0a'),_0x24e884=_0x18d75e[_0x60e50c(0xa16)],_0x5c5542=(this[_0x60e50c(0x2cc)]-_0x24e884*this[_0x60e50c(0x2b8)]())/0x2;for(let _0xbb3bae=0x0;_0xbb3bae<_0x24e884;++_0xbb3bae){if(_0x60e50c(0x5ed)!==_0x60e50c(0x5ed))_0x96cbcc['_showDevTools']=!![],_0x41cf24[_0x60e50c(0x667)]();else{let _0x33fd8c=_0x18d75e[_0xbb3bae],_0x465dcb=this[_0x60e50c(0x71f)](_0x33fd8c)['width'],_0x21b107=Math['floor']((this[_0x60e50c(0x27c)][_0x60e50c(0x2d3)]-_0x465dcb)/0x2);this['drawTextEx'](_0x33fd8c,_0x21b107,_0x5c5542),_0x5c5542+=this[_0x60e50c(0x2b8)]();}}}else VisuMZ[_0x60e50c(0x1bf)][_0x60e50c(0x854)]['call'](this);};};VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x4fa)]=Window_ShopSell[_0x3b4dfd(0x396)][_0x3b4dfd(0x909)],Window_ShopSell[_0x3b4dfd(0x396)][_0x3b4dfd(0x909)]=function(_0x465461){const _0x3a9bff=_0x3b4dfd;if(VisuMZ[_0x3a9bff(0x1bf)][_0x3a9bff(0x5af)][_0x3a9bff(0x38a)][_0x3a9bff(0x322)]&&DataManager[_0x3a9bff(0x31b)](_0x465461)){if(_0x3a9bff(0x5f7)!==_0x3a9bff(0x639))return![];else _0x32bb49['CoreEngine'][_0x3a9bff(0x6ae)]['call'](this),this[_0x3a9bff(0x6a8)](),this[_0x3a9bff(0x18c)](),this[_0x3a9bff(0x222)]();}else{if(_0x3a9bff(0x7fb)!=='fHNQL'){const _0x4b23d8='_stored_ctGaugeColor1';this[_0x3a9bff(0x5d4)]=this[_0x3a9bff(0x5d4)]||{};if(this[_0x3a9bff(0x5d4)][_0x4b23d8])return this[_0x3a9bff(0x5d4)][_0x4b23d8];const _0x59cf49=_0x483ea4['CoreEngine'][_0x3a9bff(0x5af)][_0x3a9bff(0x9f4)][_0x3a9bff(0x923)];return this[_0x3a9bff(0x9df)](_0x4b23d8,_0x59cf49);}else return VisuMZ[_0x3a9bff(0x1bf)][_0x3a9bff(0x4fa)][_0x3a9bff(0x68e)](this,_0x465461);}},Window_NumberInput['prototype'][_0x3b4dfd(0x93f)]=function(){return![];};VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x5af)][_0x3b4dfd(0x456)][_0x3b4dfd(0x1cb)]&&(VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x75b)]=Window_NumberInput[_0x3b4dfd(0x396)]['start'],Window_NumberInput[_0x3b4dfd(0x396)]['start']=function(){const _0x3c29dd=_0x3b4dfd;VisuMZ[_0x3c29dd(0x1bf)][_0x3c29dd(0x75b)]['call'](this),this[_0x3c29dd(0x872)](this[_0x3c29dd(0x992)]-0x1),Input[_0x3c29dd(0x670)]();},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x4f2)]=Window_NumberInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x267)],Window_NumberInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x267)]=function(){const _0x4c5068=_0x3b4dfd;if(!this['isOpenAndActive']())return;if(Input[_0x4c5068(0x7d7)]())_0x4c5068(0x1c0)===_0x4c5068(0x1c0)?this[_0x4c5068(0x89e)]():this[_0x4c5068(0x30a)]=_0x4c5068(0x318);else{if(Input[_0x4c5068(0x8ec)](_0x4c5068(0x496)))this[_0x4c5068(0x99e)]();else{if(Input[_0x4c5068(0x3de)]===0x2e)_0x4c5068(0x307)!=='WnnEm'?this[_0x4c5068(0x891)]():this[_0x4c5068(0x891)]();else{if(Input['_inputSpecialKeyCode']===0x24)_0x4c5068(0x41f)===_0x4c5068(0x656)?this[_0x4c5068(0x5fc)]((_0x240a99+_0x1540d5)%_0xfb65c5):this['processKeyboardHome']();else{if(Input[_0x4c5068(0x3de)]===0x23)'EGIRS'!==_0x4c5068(0x77f)?this['_commandWindow']['setBackgroundType'](_0x261e19[_0x4c5068(0x630)][_0x4c5068(0x39b)]):this[_0x4c5068(0x90c)]();else{if(_0x4c5068(0x737)===_0x4c5068(0x7c5)){if(_0x1b81b6[_0x4c5068(0x9ba)]())return _0x4c5068(0x4aa);return _0x59308a['CoreEngine']['Settings']['KeyboardInput']['DefaultMode']||'keyboard';}else VisuMZ[_0x4c5068(0x1bf)][_0x4c5068(0x4f2)][_0x4c5068(0x68e)](this);}}}}}},Window_NumberInput['prototype']['processCursorMove']=function(){const _0x51208b=_0x3b4dfd;if(!this['isCursorMovable']())return;if(Input[_0x51208b(0x7d7)]()){if('VpmfB'!==_0x51208b(0x4ec)){if(this['x']===0x0)this['x']=_0x4ce19b[_0x51208b(0x355)](_0xe9e22['width']/0x2);if(this['y']===0x0)this['y']=_0x295cd7[_0x51208b(0x355)](_0x4aaa32[_0x51208b(0x2c8)]/0x2);}else this[_0x51208b(0x89e)]();}else Window_Selectable[_0x51208b(0x396)]['processCursorMove'][_0x51208b(0x68e)](this);},Window_NumberInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x416)]=function(){},Window_NumberInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x89e)]=function(){const _0x1c79dd=_0x3b4dfd;if(String(this['_number'])[_0x1c79dd(0xa16)]>=this[_0x1c79dd(0x992)])return;const _0x2dc0a6=Number(String(this[_0x1c79dd(0x7cf)])+Input[_0x1c79dd(0x7cb)]);if(isNaN(_0x2dc0a6))return;this[_0x1c79dd(0x7cf)]=_0x2dc0a6;const _0x3d583a='9'[_0x1c79dd(0x73b)](this[_0x1c79dd(0x992)]);this[_0x1c79dd(0x7cf)]=this['_number'][_0x1c79dd(0x1e1)](0x0,_0x3d583a),Input['clear'](),this[_0x1c79dd(0x443)](),SoundManager[_0x1c79dd(0x987)](),this[_0x1c79dd(0x872)](this['_maxDigits']-0x1);},Window_NumberInput[_0x3b4dfd(0x396)]['processKeyboardBackspace']=function(){const _0x16b22c=_0x3b4dfd;this[_0x16b22c(0x7cf)]=Number(String(this[_0x16b22c(0x7cf)])[_0x16b22c(0x1ad)](0x0,-0x1)),this[_0x16b22c(0x7cf)]=Math[_0x16b22c(0x67b)](0x0,this['_number']),Input['clear'](),this['refresh'](),SoundManager[_0x16b22c(0x987)](),this[_0x16b22c(0x872)](this[_0x16b22c(0x992)]-0x1);},Window_NumberInput[_0x3b4dfd(0x396)][_0x3b4dfd(0x891)]=function(){const _0x469e1b=_0x3b4dfd;this[_0x469e1b(0x7cf)]=Number(String(this[_0x469e1b(0x7cf)])[_0x469e1b(0x5cd)](0x1)),this[_0x469e1b(0x7cf)]=Math['max'](0x0,this[_0x469e1b(0x7cf)]),Input[_0x469e1b(0x670)](),this['refresh'](),SoundManager[_0x469e1b(0x987)](),this[_0x469e1b(0x872)](this[_0x469e1b(0x992)]-0x1);},Window_NumberInput['prototype'][_0x3b4dfd(0x664)]=function(){const _0x13ad65=_0x3b4dfd;if(this[_0x13ad65(0x50e)]()===0x0)return;Input['clear'](),this['refresh'](),SoundManager[_0x13ad65(0x987)](),this['select'](0x0);},Window_NumberInput[_0x3b4dfd(0x396)]['processKeyboardEnd']=function(){const _0x39fbcb=_0x3b4dfd;if(this[_0x39fbcb(0x50e)]()===this[_0x39fbcb(0x992)]-0x1)return;Input['clear'](),this[_0x39fbcb(0x443)](),SoundManager[_0x39fbcb(0x987)](),this[_0x39fbcb(0x872)](this[_0x39fbcb(0x992)]-0x1);});function _0x3b79(_0x3655c9,_0x3d8024){const _0xf6fb78=_0xf6fb();return _0x3b79=function(_0x3b797a,_0x27c8ea){_0x3b797a=_0x3b797a-0x181;let _0x2734e8=_0xf6fb78[_0x3b797a];return _0x2734e8;},_0x3b79(_0x3655c9,_0x3d8024);};VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x334)]=Window_MapName[_0x3b4dfd(0x396)][_0x3b4dfd(0x443)],Window_MapName[_0x3b4dfd(0x396)][_0x3b4dfd(0x443)]=function(){const _0x5e1670=_0x3b4dfd;VisuMZ[_0x5e1670(0x1bf)][_0x5e1670(0x5af)][_0x5e1670(0x38a)][_0x5e1670(0x7d9)]?this[_0x5e1670(0x5b4)]():VisuMZ[_0x5e1670(0x1bf)]['Window_MapName_refresh'][_0x5e1670(0x68e)](this);},Window_MapName[_0x3b4dfd(0x396)][_0x3b4dfd(0x5b4)]=function(){const _0x56b1a9=_0x3b4dfd;this['contents'][_0x56b1a9(0x670)]();if($gameMap['displayName']()){const _0x54a1fe=this[_0x56b1a9(0x320)];this[_0x56b1a9(0x335)](0x0,0x0,_0x54a1fe,this[_0x56b1a9(0x2b8)]());const _0x287147=this[_0x56b1a9(0x71f)]($gameMap[_0x56b1a9(0x5b7)]())[_0x56b1a9(0x2d3)];this[_0x56b1a9(0x71c)]($gameMap[_0x56b1a9(0x5b7)](),Math['floor']((_0x54a1fe-_0x287147)/0x2),0x0);}},Window_TitleCommand[_0x3b4dfd(0x315)]=VisuMZ[_0x3b4dfd(0x1bf)]['Settings'][_0x3b4dfd(0x9c2)],Window_TitleCommand[_0x3b4dfd(0x396)][_0x3b4dfd(0x555)]=function(){const _0x2f2e36=_0x3b4dfd;this[_0x2f2e36(0x9a9)]();},Window_TitleCommand[_0x3b4dfd(0x396)][_0x3b4dfd(0x9a9)]=function(){const _0x5e719d=_0x3b4dfd;for(const _0x3166b0 of Window_TitleCommand[_0x5e719d(0x315)]){if(_0x3166b0['ShowJS'][_0x5e719d(0x68e)](this)){const _0x53f235=_0x3166b0[_0x5e719d(0x1b0)];let _0x6876da=_0x3166b0[_0x5e719d(0x974)];if(['',_0x5e719d(0x235)][_0x5e719d(0x5e6)](_0x6876da))_0x6876da=_0x3166b0['TextJS'][_0x5e719d(0x68e)](this);const _0x322248=_0x3166b0['EnableJS'][_0x5e719d(0x68e)](this),_0x4f7c3d=_0x3166b0['ExtJS'][_0x5e719d(0x68e)](this);this[_0x5e719d(0x89b)](_0x6876da,_0x53f235,_0x322248,_0x4f7c3d),this[_0x5e719d(0x5bc)](_0x53f235,_0x3166b0[_0x5e719d(0x316)][_0x5e719d(0x2bd)](this,_0x4f7c3d));}}},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x28b)]=Window_TitleCommand[_0x3b4dfd(0x396)][_0x3b4dfd(0x9fa)],Window_TitleCommand[_0x3b4dfd(0x396)]['selectLast']=function(){const _0x27c15b=_0x3b4dfd;VisuMZ[_0x27c15b(0x1bf)]['Window_TitleCommand_selectLast'][_0x27c15b(0x68e)](this);if(!Window_TitleCommand[_0x27c15b(0x7dc)])return;const _0x16c4aa=this['findSymbol'](Window_TitleCommand[_0x27c15b(0x7dc)]),_0x562376=Math[_0x27c15b(0x9d3)](this['maxVisibleItems']()/0x2)-0x1;this[_0x27c15b(0x5fc)](_0x16c4aa),this['_scrollDuration']>0x1&&(this[_0x27c15b(0x95d)]=0x1,this[_0x27c15b(0x851)]()),this[_0x27c15b(0x3fa)](_0x16c4aa-_0x562376);},Window_GameEnd[_0x3b4dfd(0x315)]=VisuMZ[_0x3b4dfd(0x1bf)]['Settings'][_0x3b4dfd(0x2ab)][_0x3b4dfd(0x85b)][_0x3b4dfd(0x9e9)],Window_GameEnd[_0x3b4dfd(0x396)]['makeCommandList']=function(){this['makeCoreEngineCommandList']();},Window_GameEnd['prototype'][_0x3b4dfd(0x9a9)]=function(){const _0x18e107=_0x3b4dfd;for(const _0x297884 of Window_GameEnd[_0x18e107(0x315)]){if(_0x297884[_0x18e107(0xa24)][_0x18e107(0x68e)](this)){const _0xea6ded=_0x297884[_0x18e107(0x1b0)];let _0x4647d2=_0x297884[_0x18e107(0x974)];if(['','Untitled']['includes'](_0x4647d2))_0x4647d2=_0x297884['TextJS'][_0x18e107(0x68e)](this);const _0x3de37c=_0x297884[_0x18e107(0x289)][_0x18e107(0x68e)](this),_0x30a573=_0x297884[_0x18e107(0x5e1)][_0x18e107(0x68e)](this);this['addCommand'](_0x4647d2,_0xea6ded,_0x3de37c,_0x30a573),this[_0x18e107(0x5bc)](_0xea6ded,_0x297884['CallHandlerJS']['bind'](this,_0x30a573));}}};function Window_ButtonAssist(){const _0x2a98ce=_0x3b4dfd;this[_0x2a98ce(0x24b)](...arguments);}Window_ButtonAssist[_0x3b4dfd(0x396)]=Object['create'](Window_Base[_0x3b4dfd(0x396)]),Window_ButtonAssist['prototype'][_0x3b4dfd(0x9dc)]=Window_ButtonAssist,Window_ButtonAssist[_0x3b4dfd(0x396)][_0x3b4dfd(0x24b)]=function(_0x2e7023){const _0x2530b2=_0x3b4dfd;this['_data']={},Window_Base[_0x2530b2(0x396)][_0x2530b2(0x24b)][_0x2530b2(0x68e)](this,_0x2e7023),this[_0x2530b2(0x3f2)](VisuMZ[_0x2530b2(0x1bf)][_0x2530b2(0x5af)][_0x2530b2(0x3da)][_0x2530b2(0x3dc)]||0x0),this[_0x2530b2(0x443)]();},Window_ButtonAssist[_0x3b4dfd(0x396)][_0x3b4dfd(0x819)]=function(){const _0x1e26dd=_0x3b4dfd;this[_0x1e26dd(0x27c)]['fontSize']<=0x60&&(_0x1e26dd(0x702)==='PseBv'?(_0x30e8d2['alwaysDash']=!_0x1f1460[_0x1e26dd(0x426)],_0x3fd1e2[_0x1e26dd(0x9ed)]()):this[_0x1e26dd(0x27c)]['fontSize']+=0x6);},Window_ButtonAssist[_0x3b4dfd(0x396)]['makeFontSmaller']=function(){const _0x5a15b0=_0x3b4dfd;if(this[_0x5a15b0(0x27c)]['fontSize']>=0x18){if('DWLQQ'!==_0x5a15b0(0x353)){if(_0x2f3acd['isPlaytest']())_0x2c53ea[_0x5a15b0(0x862)](_0x550475);}else this['contents']['fontSize']-=0x6;}},Window_ButtonAssist[_0x3b4dfd(0x396)][_0x3b4dfd(0x933)]=function(){const _0x20df52=_0x3b4dfd;Window_Base[_0x20df52(0x396)]['update'][_0x20df52(0x68e)](this),this[_0x20df52(0x25f)]();},Window_ButtonAssist['prototype'][_0x3b4dfd(0x8c6)]=function(){const _0x481b1d=_0x3b4dfd;this['padding']=SceneManager[_0x481b1d(0x46a)][_0x481b1d(0x971)]()!==_0x481b1d(0x78b)?0x0:0x8;},Window_ButtonAssist[_0x3b4dfd(0x396)][_0x3b4dfd(0x25f)]=function(){const _0x3a9f21=_0x3b4dfd,_0x56f55c=SceneManager[_0x3a9f21(0x46a)];for(let _0xc59888=0x1;_0xc59888<=0x5;_0xc59888++){if(_0x3a9f21(0x407)!==_0x3a9f21(0x407))_0x6b0f01['CoreEngine'][_0x3a9f21(0x72e)][_0x3a9f21(0x68e)](this,_0x5e3c7c);else{if(this[_0x3a9f21(0x6b4)][_0x3a9f21(0x9d1)[_0x3a9f21(0x4f9)](_0xc59888)]!==_0x56f55c['buttonAssistKey%1'[_0x3a9f21(0x4f9)](_0xc59888)]()){if(_0x3a9f21(0x49b)===_0x3a9f21(0x49b))return this['refresh']();else{const _0x1573a7=_0x138bc2[_0x3a9f21(0x1bf)][_0x3a9f21(0x5af)][_0x3a9f21(0x74f)];if(_0x1573a7&&_0x1573a7['randomJS'])return _0x1573a7[_0x3a9f21(0x86f)][_0x3a9f21(0x68e)](this);const _0x4216d5=_0x928fbd[_0x3a9f21(0x52c)]*0.75,_0x22eb6a=_0x3e1c1e[_0x3a9f21(0x4ed)]*0.6,_0x16d81e=_0x4f5132['_shakeDuration'];this['x']+=_0x173fc4[_0x3a9f21(0x355)](_0x44757d['randomInt'](_0x4216d5)-_0x1f4ed5['randomInt'](_0x22eb6a))*(_0x23b2b1['min'](_0x16d81e,0x1e)*0.5),this['y']+=_0x3f17e5['round'](_0x1ac959[_0x3a9f21(0x3d3)](_0x4216d5)-_0x5867b5[_0x3a9f21(0x3d3)](_0x22eb6a))*(_0x5ae8d2[_0x3a9f21(0x467)](_0x16d81e,0x1e)*0.5);}}if(this['_data'][_0x3a9f21(0x671)[_0x3a9f21(0x4f9)](_0xc59888)]!==_0x56f55c[_0x3a9f21(0x7e2)['format'](_0xc59888)]())return this[_0x3a9f21(0x443)]();}}},Window_ButtonAssist[_0x3b4dfd(0x396)][_0x3b4dfd(0x443)]=function(){const _0x20630b=_0x3b4dfd;this[_0x20630b(0x27c)][_0x20630b(0x670)]();for(let _0x59127d=0x1;_0x59127d<=0x5;_0x59127d++){this[_0x20630b(0x378)](_0x59127d);}},Window_ButtonAssist[_0x3b4dfd(0x396)][_0x3b4dfd(0x378)]=function(_0x8eb65c){const _0x1691dc=_0x3b4dfd,_0x267ebc=this[_0x1691dc(0x320)]/0x5,_0x35e053=SceneManager[_0x1691dc(0x46a)],_0x544986=_0x35e053[_0x1691dc(0x537)[_0x1691dc(0x4f9)](_0x8eb65c)](),_0x1ca109=_0x35e053[_0x1691dc(0x7e2)[_0x1691dc(0x4f9)](_0x8eb65c)]();this[_0x1691dc(0x6b4)][_0x1691dc(0x9d1)[_0x1691dc(0x4f9)](_0x8eb65c)]=_0x544986,this['_data'][_0x1691dc(0x671)[_0x1691dc(0x4f9)](_0x8eb65c)]=_0x1ca109;if(_0x544986==='')return;if(_0x1ca109==='')return;const _0x4f7dc3=_0x35e053[_0x1691dc(0x7d0)['format'](_0x8eb65c)](),_0x1b98e5=this['itemPadding'](),_0x2585a9=_0x267ebc*(_0x8eb65c-0x1)+_0x1b98e5+_0x4f7dc3,_0x3a6f73=VisuMZ['CoreEngine'][_0x1691dc(0x5af)][_0x1691dc(0x3da)][_0x1691dc(0x7a6)];this['drawTextEx'](_0x3a6f73[_0x1691dc(0x4f9)](_0x544986,_0x1ca109),_0x2585a9,0x0,_0x267ebc-_0x1b98e5*0x2);},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x61e)]=Game_Interpreter[_0x3b4dfd(0x396)][_0x3b4dfd(0x46b)],Game_Interpreter[_0x3b4dfd(0x396)]['updateWaitMode']=function(){const _0x2134cc=_0x3b4dfd;if($gameTemp[_0x2134cc(0x736)]!==undefined)return VisuMZ[_0x2134cc(0x1bf)][_0x2134cc(0x696)]();return VisuMZ[_0x2134cc(0x1bf)][_0x2134cc(0x61e)][_0x2134cc(0x68e)](this);},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x696)]=function(){const _0x361834=_0x3b4dfd,_0x294339=$gameTemp[_0x361834(0x736)]||0x0;(_0x294339<0x0||_0x294339>0x64||TouchInput['isCancelled']()||Input[_0x361834(0x447)](_0x361834(0x4cc)))&&('SDOYe'!=='IeKDA'?($gameTemp[_0x361834(0x736)]=undefined,Input[_0x361834(0x670)](),TouchInput[_0x361834(0x670)]()):_0x324f82[_0x361834(0x821)]()&&_0x168046[_0x361834(0x1bf)][_0x361834(0x5af)][_0x361834(0x38a)]['F7key']&&(_0x217182[_0x361834(0x709)]=!_0x16a300[_0x361834(0x709)]));const _0x40c665=$gameScreen['picture'](_0x294339);return _0x40c665&&('xaDEo'===_0x361834(0x874)?this['_helpWindow'][_0x361834(0x3f2)](_0x302d44[_0x361834(0x630)][_0x361834(0x232)]):(_0x40c665['_x']=TouchInput['_x'],_0x40c665['_y']=TouchInput['_y'])),VisuMZ['CoreEngine'][_0x361834(0x69b)](),$gameTemp[_0x361834(0x736)]!==undefined;},VisuMZ[_0x3b4dfd(0x1bf)]['updatePictureCoordinates']=function(){const _0x3e6538=_0x3b4dfd,_0x1f6791=SceneManager[_0x3e6538(0x46a)];if(!_0x1f6791)return;!_0x1f6791[_0x3e6538(0x205)]&&(_0x3e6538(0x448)!==_0x3e6538(0x448)?this[_0x3e6538(0x954)](_0x41ee47,_0x29bf26,_0x256739,_0x3c286c,_0x2bafa5):(SoundManager[_0x3e6538(0x893)](),_0x1f6791[_0x3e6538(0x205)]=new Window_PictureCoordinates(),_0x1f6791[_0x3e6538(0x2f6)](_0x1f6791[_0x3e6538(0x205)]))),$gameTemp[_0x3e6538(0x736)]===undefined&&(SoundManager['playCancel'](),_0x1f6791[_0x3e6538(0x45f)](_0x1f6791['_pictureCoordinatesWindow']),_0x1f6791[_0x3e6538(0x205)]=undefined);};function Window_PictureCoordinates(){const _0x2b68c4=_0x3b4dfd;this[_0x2b68c4(0x24b)](...arguments);}Window_PictureCoordinates[_0x3b4dfd(0x396)]=Object[_0x3b4dfd(0x9bd)](Window_Base[_0x3b4dfd(0x396)]),Window_PictureCoordinates[_0x3b4dfd(0x396)]['constructor']=Window_PictureCoordinates,Window_PictureCoordinates[_0x3b4dfd(0x396)][_0x3b4dfd(0x24b)]=function(){const _0x561420=_0x3b4dfd;this[_0x561420(0x75d)]=_0x561420(0x97b),this[_0x561420(0x76a)]='nah',this[_0x561420(0x70f)]=_0x561420(0x97b);const _0x457684=this[_0x561420(0x636)]();Window_Base[_0x561420(0x396)][_0x561420(0x24b)][_0x561420(0x68e)](this,_0x457684),this['setBackgroundType'](0x2);},Window_PictureCoordinates[_0x3b4dfd(0x396)][_0x3b4dfd(0x636)]=function(){const _0x1927bd=_0x3b4dfd;let _0x24dbd9=0x0,_0xe73fca=Graphics[_0x1927bd(0x2c8)]-this[_0x1927bd(0x2b8)](),_0xae7fbd=Graphics[_0x1927bd(0x2d3)],_0x494c47=this['lineHeight']();return new Rectangle(_0x24dbd9,_0xe73fca,_0xae7fbd,_0x494c47);},Window_PictureCoordinates[_0x3b4dfd(0x396)][_0x3b4dfd(0x8c6)]=function(){const _0xb58763=_0x3b4dfd;this[_0xb58763(0x1fb)]=0x0;},Window_PictureCoordinates[_0x3b4dfd(0x396)][_0x3b4dfd(0x933)]=function(){const _0x39e0c1=_0x3b4dfd;Window_Base[_0x39e0c1(0x396)]['update'][_0x39e0c1(0x68e)](this),this[_0x39e0c1(0x7cc)]();},Window_PictureCoordinates[_0x3b4dfd(0x396)]['updateData']=function(){const _0x5a855c=_0x3b4dfd;if(!this[_0x5a855c(0x950)]())return;this[_0x5a855c(0x443)]();},Window_PictureCoordinates['prototype']['needsUpdate']=function(){const _0xb2f6e7=_0x3b4dfd,_0x460a14=$gameTemp[_0xb2f6e7(0x736)],_0x5912b9=$gameScreen[_0xb2f6e7(0x2b5)](_0x460a14);if(_0x5912b9){if(_0xb2f6e7(0x9d0)!=='PCTtI')return this[_0xb2f6e7(0x75d)]!==_0x5912b9[_0xb2f6e7(0x405)]||this[_0xb2f6e7(0x76a)]!==_0x5912b9['_x']||this['_lastY']!==_0x5912b9['_y'];else{if(_0x3c1b37[_0xb2f6e7(0x3ef)]())return;_0x5e8d61['ConvertParams'](_0x5a6f3e,_0x1b87f9);const _0x376000=['animations',_0xb2f6e7(0x8af),_0xb2f6e7(0x450),_0xb2f6e7(0x569),'enemies',_0xb2f6e7(0x463),_0xb2f6e7(0x5b9),'pictures',_0xb2f6e7(0x33b),_0xb2f6e7(0x46e),_0xb2f6e7(0x574),'tilesets',_0xb2f6e7(0x540),'titles2'];for(const _0x629ff9 of _0x376000){const _0x4db18c=_0x3f00e1[_0x629ff9],_0x2ccac9=_0xb2f6e7(0x87c)[_0xb2f6e7(0x4f9)](_0x629ff9);for(const _0x24f576 of _0x4db18c){_0x377782[_0xb2f6e7(0x26a)](_0x2ccac9,_0x24f576);}}}}else return![];},Window_PictureCoordinates['prototype']['refresh']=function(){const _0x4529f4=_0x3b4dfd;this[_0x4529f4(0x27c)]['clear']();const _0x1d6ae6=$gameTemp[_0x4529f4(0x736)],_0x482d6e=$gameScreen[_0x4529f4(0x2b5)](_0x1d6ae6);if(!_0x482d6e)return;this[_0x4529f4(0x75d)]=_0x482d6e[_0x4529f4(0x405)],this[_0x4529f4(0x76a)]=_0x482d6e['_x'],this[_0x4529f4(0x70f)]=_0x482d6e['_y'];const _0x16ccd9=ColorManager[_0x4529f4(0x66d)]();this['contents'][_0x4529f4(0x676)](0x0,0x0,this['innerWidth'],this['innerHeight'],_0x16ccd9);const _0x210f90=_0x4529f4(0x3be)[_0x4529f4(0x4f9)](_0x482d6e['_origin']===0x0?_0x4529f4(0x513):_0x4529f4(0x186)),_0x2c3284=_0x4529f4(0x74c)[_0x4529f4(0x4f9)](_0x482d6e['_x']),_0x1c77eb=_0x4529f4(0x361)[_0x4529f4(0x4f9)](_0x482d6e['_y']),_0x5c3f9d='%1:\x20Exit\x20'[_0x4529f4(0x4f9)](TextManager[_0x4529f4(0x6ef)](_0x4529f4(0x4cc)));let _0x4ee307=Math[_0x4529f4(0x9d3)](this[_0x4529f4(0x320)]/0x4);this[_0x4529f4(0x686)](_0x210f90,_0x4ee307*0x0,0x0,_0x4ee307),this[_0x4529f4(0x686)](_0x2c3284,_0x4ee307*0x1,0x0,_0x4ee307,'center'),this[_0x4529f4(0x686)](_0x1c77eb,_0x4ee307*0x2,0x0,_0x4ee307,_0x4529f4(0x637));const _0x51cc50=this[_0x4529f4(0x71f)](_0x5c3f9d)[_0x4529f4(0x2d3)],_0x5ac509=this[_0x4529f4(0x320)]-_0x51cc50;this[_0x4529f4(0x71c)](_0x5c3f9d,_0x5ac509,0x0,_0x51cc50);},VisuMZ[_0x3b4dfd(0x382)]=function(_0x2aedf7){const _0x2dcde9=_0x3b4dfd;if(Utils['isOptionValid'](_0x2dcde9(0x3d6))){var _0x22e973=require(_0x2dcde9(0x912))[_0x2dcde9(0x5a1)][_0x2dcde9(0x78c)]();SceneManager[_0x2dcde9(0x667)]();if(_0x2aedf7)setTimeout(_0x22e973['focus'][_0x2dcde9(0x2bd)](_0x22e973),0x190);}},VisuMZ[_0x3b4dfd(0x511)]=function(_0x237d5f,_0x97fecd){const _0x314664=_0x3b4dfd;_0x97fecd=_0x97fecd['toUpperCase']();var _0x1fd4d2=1.70158,_0x17fabe=0.7;switch(_0x97fecd){case _0x314664(0x245):return _0x237d5f;case'INSINE':return-0x1*Math[_0x314664(0x868)](_0x237d5f*(Math['PI']/0x2))+0x1;case _0x314664(0x8ba):return Math[_0x314664(0x87b)](_0x237d5f*(Math['PI']/0x2));case _0x314664(0x373):return-0.5*(Math[_0x314664(0x868)](Math['PI']*_0x237d5f)-0x1);case _0x314664(0x973):return _0x237d5f*_0x237d5f;case _0x314664(0x87a):return _0x237d5f*(0x2-_0x237d5f);case _0x314664(0x419):return _0x237d5f<0.5?0x2*_0x237d5f*_0x237d5f:-0x1+(0x4-0x2*_0x237d5f)*_0x237d5f;case _0x314664(0x873):return _0x237d5f*_0x237d5f*_0x237d5f;case _0x314664(0x922):var _0x43600e=_0x237d5f-0x1;return _0x43600e*_0x43600e*_0x43600e+0x1;case'INOUTCUBIC':return _0x237d5f<0.5?0x4*_0x237d5f*_0x237d5f*_0x237d5f:(_0x237d5f-0x1)*(0x2*_0x237d5f-0x2)*(0x2*_0x237d5f-0x2)+0x1;case _0x314664(0x847):return _0x237d5f*_0x237d5f*_0x237d5f*_0x237d5f;case _0x314664(0x2ff):var _0x43600e=_0x237d5f-0x1;return 0x1-_0x43600e*_0x43600e*_0x43600e*_0x43600e;case'INOUTQUART':var _0x43600e=_0x237d5f-0x1;return _0x237d5f<0.5?0x8*_0x237d5f*_0x237d5f*_0x237d5f*_0x237d5f:0x1-0x8*_0x43600e*_0x43600e*_0x43600e*_0x43600e;case'INQUINT':return _0x237d5f*_0x237d5f*_0x237d5f*_0x237d5f*_0x237d5f;case'OUTQUINT':var _0x43600e=_0x237d5f-0x1;return 0x1+_0x43600e*_0x43600e*_0x43600e*_0x43600e*_0x43600e;case _0x314664(0x8d4):var _0x43600e=_0x237d5f-0x1;return _0x237d5f<0.5?0x10*_0x237d5f*_0x237d5f*_0x237d5f*_0x237d5f*_0x237d5f:0x1+0x10*_0x43600e*_0x43600e*_0x43600e*_0x43600e*_0x43600e;case _0x314664(0x66f):if(_0x237d5f===0x0){if(_0x314664(0x4b6)===_0x314664(0x4b6))return 0x0;else this[_0x314664(0x5ff)]()[_0x314664(0x5b6)]=!![],this[_0x314664(0x5ff)]()[_0x314664(0x2dc)]=_0x8630fb(_0x3efb6a['$1']);}return Math['pow'](0x2,0xa*(_0x237d5f-0x1));case _0x314664(0x48f):if(_0x237d5f===0x1)return 0x1;return-Math[_0x314664(0x2e5)](0x2,-0xa*_0x237d5f)+0x1;case'INOUTEXPO':if(_0x237d5f===0x0||_0x237d5f===0x1)return _0x237d5f;var _0xfe2132=_0x237d5f*0x2,_0x71f358=_0xfe2132-0x1;if(_0xfe2132<0x1)return 0.5*Math[_0x314664(0x2e5)](0x2,0xa*_0x71f358);return 0.5*(-Math[_0x314664(0x2e5)](0x2,-0xa*_0x71f358)+0x2);case _0x314664(0x29c):var _0xfe2132=_0x237d5f/0x1;return-0x1*(Math['sqrt'](0x1-_0xfe2132*_0x237d5f)-0x1);case _0x314664(0x34b):var _0x43600e=_0x237d5f-0x1;return Math[_0x314664(0x78d)](0x1-_0x43600e*_0x43600e);case _0x314664(0x5e7):var _0xfe2132=_0x237d5f*0x2,_0x71f358=_0xfe2132-0x2;if(_0xfe2132<0x1)return-0.5*(Math[_0x314664(0x78d)](0x1-_0xfe2132*_0xfe2132)-0x1);return 0.5*(Math[_0x314664(0x78d)](0x1-_0x71f358*_0x71f358)+0x1);case _0x314664(0x7bd):return _0x237d5f*_0x237d5f*((_0x1fd4d2+0x1)*_0x237d5f-_0x1fd4d2);case _0x314664(0x911):var _0xfe2132=_0x237d5f/0x1-0x1;return _0xfe2132*_0xfe2132*((_0x1fd4d2+0x1)*_0xfe2132+_0x1fd4d2)+0x1;break;case _0x314664(0x9cd):var _0xfe2132=_0x237d5f*0x2,_0x400e1a=_0xfe2132-0x2,_0x18edb9=_0x1fd4d2*1.525;if(_0xfe2132<0x1)return 0.5*_0xfe2132*_0xfe2132*((_0x18edb9+0x1)*_0xfe2132-_0x18edb9);return 0.5*(_0x400e1a*_0x400e1a*((_0x18edb9+0x1)*_0x400e1a+_0x18edb9)+0x2);case _0x314664(0x23b):if(_0x237d5f===0x0||_0x237d5f===0x1)return _0x237d5f;var _0xfe2132=_0x237d5f/0x1,_0x71f358=_0xfe2132-0x1,_0x2cf84d=0x1-_0x17fabe,_0x18edb9=_0x2cf84d/(0x2*Math['PI'])*Math[_0x314664(0x6fe)](0x1);return-(Math[_0x314664(0x2e5)](0x2,0xa*_0x71f358)*Math[_0x314664(0x87b)]((_0x71f358-_0x18edb9)*(0x2*Math['PI'])/_0x2cf84d));case _0x314664(0x899):var _0x2cf84d=0x1-_0x17fabe,_0xfe2132=_0x237d5f*0x2;if(_0x237d5f===0x0||_0x237d5f===0x1)return _0x237d5f;var _0x18edb9=_0x2cf84d/(0x2*Math['PI'])*Math['asin'](0x1);return Math[_0x314664(0x2e5)](0x2,-0xa*_0xfe2132)*Math[_0x314664(0x87b)]((_0xfe2132-_0x18edb9)*(0x2*Math['PI'])/_0x2cf84d)+0x1;case _0x314664(0x7fd):var _0x2cf84d=0x1-_0x17fabe;if(_0x237d5f===0x0||_0x237d5f===0x1){if('xumgb'!==_0x314664(0x329))return _0x237d5f;else _0x1371a7[_0x314664(0x1bf)]['Scene_Name_onInputOk'][_0x314664(0x68e)](this);}var _0xfe2132=_0x237d5f*0x2,_0x71f358=_0xfe2132-0x1,_0x18edb9=_0x2cf84d/(0x2*Math['PI'])*Math[_0x314664(0x6fe)](0x1);if(_0xfe2132<0x1){if(_0x314664(0x5ae)!==_0x314664(0x989))return-0.5*(Math[_0x314664(0x2e5)](0x2,0xa*_0x71f358)*Math[_0x314664(0x87b)]((_0x71f358-_0x18edb9)*(0x2*Math['PI'])/_0x2cf84d));else this['makeCoreEngineCommandList']();}return Math[_0x314664(0x2e5)](0x2,-0xa*_0x71f358)*Math[_0x314664(0x87b)]((_0x71f358-_0x18edb9)*(0x2*Math['PI'])/_0x2cf84d)*0.5+0x1;case _0x314664(0x31e):var _0xfe2132=_0x237d5f/0x1;if(_0xfe2132<0x1/2.75)return 7.5625*_0xfe2132*_0xfe2132;else{if(_0xfe2132<0x2/2.75){var _0x400e1a=_0xfe2132-1.5/2.75;return 7.5625*_0x400e1a*_0x400e1a+0.75;}else{if(_0xfe2132<2.5/2.75){var _0x400e1a=_0xfe2132-2.25/2.75;return 7.5625*_0x400e1a*_0x400e1a+0.9375;}else{var _0x400e1a=_0xfe2132-2.625/2.75;return 7.5625*_0x400e1a*_0x400e1a+0.984375;}}}case _0x314664(0x6a7):var _0x2cd72f=0x1-VisuMZ[_0x314664(0x511)](0x1-_0x237d5f,_0x314664(0x661));return _0x2cd72f;case _0x314664(0x1ba):if(_0x237d5f<0.5)var _0x2cd72f=VisuMZ[_0x314664(0x511)](_0x237d5f*0x2,'inbounce')*0.5;else{if(_0x314664(0x863)===_0x314664(0x863))var _0x2cd72f=VisuMZ[_0x314664(0x511)](_0x237d5f*0x2-0x1,_0x314664(0x661))*0.5+0.5;else{if(this['_texture'])_0xff573[_0x314664(0x1bf)][_0x314664(0x488)][_0x314664(0x68e)](this);this[_0x314664(0x476)]();}}return _0x2cd72f;default:return _0x237d5f;}},VisuMZ[_0x3b4dfd(0x7da)]=function(_0x2f68aa){const _0x2a1fde=_0x3b4dfd;_0x2f68aa=String(_0x2f68aa)['toUpperCase']();const _0x2df2d0=VisuMZ[_0x2a1fde(0x1bf)][_0x2a1fde(0x5af)][_0x2a1fde(0x339)];if(_0x2f68aa===_0x2a1fde(0x332))return _0x2df2d0['IconParam0'];if(_0x2f68aa===_0x2a1fde(0x1b9))return _0x2df2d0[_0x2a1fde(0x46d)];if(_0x2f68aa===_0x2a1fde(0x1d7))return _0x2df2d0[_0x2a1fde(0x25e)];if(_0x2f68aa===_0x2a1fde(0x9b3))return _0x2df2d0[_0x2a1fde(0x48b)];if(_0x2f68aa==='MAT')return _0x2df2d0[_0x2a1fde(0x610)];if(_0x2f68aa==='MDF')return _0x2df2d0[_0x2a1fde(0x2cf)];if(_0x2f68aa===_0x2a1fde(0x49c))return _0x2df2d0[_0x2a1fde(0x3d9)];if(_0x2f68aa===_0x2a1fde(0x238))return _0x2df2d0[_0x2a1fde(0x838)];if(_0x2f68aa===_0x2a1fde(0x655))return _0x2df2d0[_0x2a1fde(0xa05)];if(_0x2f68aa==='EVA')return _0x2df2d0[_0x2a1fde(0x616)];if(_0x2f68aa===_0x2a1fde(0x5bd))return _0x2df2d0[_0x2a1fde(0x9e7)];if(_0x2f68aa===_0x2a1fde(0x342))return _0x2df2d0[_0x2a1fde(0x480)];if(_0x2f68aa===_0x2a1fde(0x3f4))return _0x2df2d0[_0x2a1fde(0x282)];if(_0x2f68aa===_0x2a1fde(0x64f))return _0x2df2d0[_0x2a1fde(0x947)];if(_0x2f68aa==='CNT')return _0x2df2d0[_0x2a1fde(0x39d)];if(_0x2f68aa===_0x2a1fde(0x7c8))return _0x2df2d0[_0x2a1fde(0x479)];if(_0x2f68aa===_0x2a1fde(0x7c3))return _0x2df2d0['IconXParam8'];if(_0x2f68aa===_0x2a1fde(0x352))return _0x2df2d0[_0x2a1fde(0x203)];if(_0x2f68aa===_0x2a1fde(0x22f))return _0x2df2d0[_0x2a1fde(0x8b6)];if(_0x2f68aa==='GRD')return _0x2df2d0[_0x2a1fde(0x96b)];if(_0x2f68aa==='REC')return _0x2df2d0[_0x2a1fde(0x5c6)];if(_0x2f68aa===_0x2a1fde(0x5e9))return _0x2df2d0[_0x2a1fde(0x812)];if(_0x2f68aa===_0x2a1fde(0x673))return _0x2df2d0[_0x2a1fde(0x71e)];if(_0x2f68aa===_0x2a1fde(0x278))return _0x2df2d0[_0x2a1fde(0x84a)];if(_0x2f68aa==='PDR')return _0x2df2d0[_0x2a1fde(0x3f9)];if(_0x2f68aa===_0x2a1fde(0x9f1))return _0x2df2d0[_0x2a1fde(0x735)];if(_0x2f68aa===_0x2a1fde(0x98a))return _0x2df2d0[_0x2a1fde(0x5da)];if(_0x2f68aa==='EXR')return _0x2df2d0['IconSParam9'];if(VisuMZ[_0x2a1fde(0x1bf)][_0x2a1fde(0x7ca)][_0x2f68aa]){if('EAozP'!==_0x2a1fde(0x330))this[_0x2a1fde(0x2d9)]=_0x2a060a['CoreEngine'][_0x2a1fde(0x5af)]['QoL'][_0x2a1fde(0x3d0)],this[_0x2a1fde(0x3cc)]=_0xa80433[_0x2a1fde(0x1bf)][_0x2a1fde(0x5af)][_0x2a1fde(0x38a)][_0x2a1fde(0x32a)];else return VisuMZ[_0x2a1fde(0x1bf)][_0x2a1fde(0x7ca)][_0x2f68aa]||0x0;}return 0x0;},VisuMZ[_0x3b4dfd(0x9f5)]=function(_0x403703,_0x3ee353,_0x13182d){const _0x59ebe9=_0x3b4dfd;if(_0x13182d===undefined&&_0x403703%0x1===0x0)return _0x403703;if(_0x13182d!==undefined&&[_0x59ebe9(0x332),'MAXMP',_0x59ebe9(0x1d7),_0x59ebe9(0x9b3),_0x59ebe9(0x275),'MDF',_0x59ebe9(0x49c),_0x59ebe9(0x238)]['includes'](String(_0x13182d)['toUpperCase']()['trim']()))return _0x403703;_0x3ee353=_0x3ee353||0x0;if(VisuMZ['CoreEngine'][_0x59ebe9(0x84b)][_0x13182d])return VisuMZ[_0x59ebe9(0x1bf)][_0x59ebe9(0x2d8)][_0x13182d]==='integer'?_0x403703:String((_0x403703*0x64)[_0x59ebe9(0x80c)](_0x3ee353))+'%';return String((_0x403703*0x64)[_0x59ebe9(0x80c)](_0x3ee353))+'%';},VisuMZ['GroupDigits']=function(_0x444742){const _0x8876ba=_0x3b4dfd;_0x444742=String(_0x444742);if(!_0x444742)return _0x444742;if(typeof _0x444742!==_0x8876ba(0x9b2))return _0x444742;const _0xd8af99=VisuMZ[_0x8876ba(0x1bf)][_0x8876ba(0x5af)][_0x8876ba(0x38a)][_0x8876ba(0x80a)]||_0x8876ba(0x1b6),_0x46ed77={'maximumFractionDigits':0x6};_0x444742=_0x444742[_0x8876ba(0x5df)](/\[(.*?)\]/g,(_0x575d84,_0x5a6499)=>{const _0x1fcfe9=_0x8876ba;if(_0x1fcfe9(0x520)===_0x1fcfe9(0x1bc))this[_0x1fcfe9(0x63a)]&&this[_0x1fcfe9(0x63a)][_0x1fcfe9(0x3f2)](_0x1988a0['layoutSettings'][_0x1fcfe9(0x366)]),this['_inputWindow']&&this[_0x1fcfe9(0x779)][_0x1fcfe9(0x3f2)](_0x13920c[_0x1fcfe9(0x630)][_0x1fcfe9(0x1dc)]);else return VisuMZ[_0x1fcfe9(0x91c)](_0x5a6499,'[',']');}),_0x444742=_0x444742['replace'](/<(.*?)>/g,(_0x31bf7b,_0x448d67)=>{const _0x18067b=_0x8876ba;return VisuMZ[_0x18067b(0x91c)](_0x448d67,'<','>');}),_0x444742=_0x444742[_0x8876ba(0x5df)](/\{\{(.*?)\}\}/g,(_0x19d6af,_0x275d1a)=>{const _0x4a76b4=_0x8876ba;return VisuMZ[_0x4a76b4(0x91c)](_0x275d1a,'','');}),_0x444742=_0x444742['replace'](/(\d+\.?\d*)/g,(_0x2963de,_0x337180)=>{const _0x1591b2=_0x8876ba;let _0x565450=_0x337180;if(_0x565450[0x0]==='0')return _0x565450;if(_0x565450[_0x565450['length']-0x1]==='.')return Number(_0x565450)[_0x1591b2(0x28c)](_0xd8af99,_0x46ed77)+'.';else{if(_0x565450[_0x565450[_0x1591b2(0xa16)]-0x1]===',')return _0x1591b2(0x428)!==_0x1591b2(0x428)?this[_0x1591b2(0x377)]():Number(_0x565450)[_0x1591b2(0x28c)](_0xd8af99,_0x46ed77)+',';else{if(_0x1591b2(0x7d5)===_0x1591b2(0x7d5))return Number(_0x565450)[_0x1591b2(0x28c)](_0xd8af99,_0x46ed77);else this[_0x1591b2(0x1fb)]=_0x3bfef4[_0x1591b2(0x46a)][_0x1591b2(0x971)]()!==_0x1591b2(0x78b)?0x0:0x8;}}});let _0x1add5c=0x3;while(_0x1add5c--){if(_0x8876ba(0x36e)===_0x8876ba(0x36e))_0x444742=VisuMZ[_0x8876ba(0x781)](_0x444742);else return _0x135e84[_0x8876ba(0x630)][_0x8876ba(0x3bb)][_0x8876ba(0x68e)](this);}return _0x444742;},VisuMZ['PreserveNumbers']=function(_0x4eddde,_0x5be10e,_0x477c2e){const _0x455a72=_0x3b4dfd;return _0x4eddde=_0x4eddde[_0x455a72(0x5df)](/(\d)/gi,(_0x267907,_0x163294)=>'PRESERVCONVERSION(%1)'[_0x455a72(0x4f9)](Number(_0x163294))),_0x455a72(0x8ed)['format'](_0x4eddde,_0x5be10e,_0x477c2e);},VisuMZ[_0x3b4dfd(0x781)]=function(_0x11aad6){const _0x2b05f6=_0x3b4dfd;return _0x11aad6=_0x11aad6[_0x2b05f6(0x5df)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x3f75d2,_0x52d632)=>Number(parseInt(_0x52d632))),_0x11aad6;},VisuMZ[_0x3b4dfd(0x7d1)]=function(_0x19ad97){const _0xd40684=_0x3b4dfd;SoundManager[_0xd40684(0x365)]();if(!Utils['isNwjs']()){const _0x5967a3=window[_0xd40684(0x545)](_0x19ad97,_0xd40684(0x34a));}else{const _0x10b722=process[_0xd40684(0x323)]==_0xd40684(0x8f6)?_0xd40684(0x545):process[_0xd40684(0x323)]==_0xd40684(0x71b)?_0xd40684(0x21f):'xdg-open';require(_0xd40684(0x845))['exec'](_0x10b722+'\x20'+_0x19ad97);}},VisuMZ[_0x3b4dfd(0x6f3)]=function(_0x3554e3,_0x583117){const _0x2a0714=_0x3b4dfd;if(!_0x3554e3)return'';const _0x1f0134=_0x3554e3[_0x2a0714(0x8cf)]||_0x3554e3['id'];let _0xd51f79='';_0x3554e3[_0x2a0714(0x558)]!==undefined&&_0x3554e3[_0x2a0714(0x50c)]!==undefined&&(_0xd51f79=_0x2a0714(0x249)[_0x2a0714(0x4f9)](_0x1f0134,_0x583117));_0x3554e3[_0x2a0714(0x67f)]!==undefined&&_0x3554e3['learnings']!==undefined&&(_0xd51f79='Class-%1-%2'[_0x2a0714(0x4f9)](_0x1f0134,_0x583117));_0x3554e3[_0x2a0714(0x58e)]!==undefined&&_0x3554e3['requiredWtypeId1']!==undefined&&(_0xd51f79='Skill-%1-%2'['format'](_0x1f0134,_0x583117));_0x3554e3[_0x2a0714(0x212)]!==undefined&&_0x3554e3[_0x2a0714(0x1f3)]!==undefined&&(_0xd51f79=_0x2a0714(0x2ae)[_0x2a0714(0x4f9)](_0x1f0134,_0x583117));_0x3554e3[_0x2a0714(0x3fb)]!==undefined&&_0x3554e3[_0x2a0714(0x32b)]===0x1&&(_0xd51f79=_0x2a0714(0x33d)['format'](_0x1f0134,_0x583117));if(_0x3554e3[_0x2a0714(0x8f9)]!==undefined&&_0x3554e3[_0x2a0714(0x32b)]>0x1){if(_0x2a0714(0x704)!==_0x2a0714(0x704))return _0x1998c4[_0x2a0714(0x1bf)][_0x2a0714(0x7ca)][_0x2811c9]||0x0;else _0xd51f79='Armor-%1-%2'[_0x2a0714(0x4f9)](_0x1f0134,_0x583117);}return _0x3554e3[_0x2a0714(0x882)]!==undefined&&_0x3554e3['battlerHue']!==undefined&&(_0xd51f79='Enemy-%1-%2'['format'](_0x1f0134,_0x583117)),_0x3554e3['autoRemovalTiming']!==undefined&&_0x3554e3[_0x2a0714(0x79a)]!==undefined&&(_0xd51f79=_0x2a0714(0x3d1)[_0x2a0714(0x4f9)](_0x1f0134,_0x583117)),_0xd51f79;},Game_Picture[_0x3b4dfd(0x396)]['anchor']=function(){const _0x1bb6f2=_0x3b4dfd;return this[_0x1bb6f2(0x877)];},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x19b)]=Game_Picture[_0x3b4dfd(0x396)][_0x3b4dfd(0x60c)],Game_Picture[_0x3b4dfd(0x396)]['initBasic']=function(){const _0x307524=_0x3b4dfd;VisuMZ[_0x307524(0x1bf)][_0x307524(0x19b)]['call'](this),this[_0x307524(0x877)]={'x':0x0,'y':0x0},this[_0x307524(0x994)]={'x':0x0,'y':0x0};},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x8cc)]=Game_Picture[_0x3b4dfd(0x396)][_0x3b4dfd(0x3b9)],Game_Picture['prototype']['updateMove']=function(){const _0x7107d8=_0x3b4dfd;this['updateAnchor']();const _0x5424e2=this['_duration'];VisuMZ[_0x7107d8(0x1bf)]['Game_Picture_updateMove']['call'](this),_0x5424e2>0x0&&this[_0x7107d8(0x5c7)]<=0x0&&(this['_x']=this[_0x7107d8(0x8c4)],this['_y']=this[_0x7107d8(0x4f0)],this['_scaleX']=this[_0x7107d8(0x2be)],this['_scaleY']=this[_0x7107d8(0x3c3)],this['_opacity']=this[_0x7107d8(0x223)],this[_0x7107d8(0x877)]&&(_0x7107d8(0x243)!==_0x7107d8(0x243)?(_0x58c922[_0x7107d8(0x862)]('Script\x20Call\x20Error'),_0x285898['log'](_0x4ae3cb)):(this[_0x7107d8(0x877)]['x']=this[_0x7107d8(0x994)]['x'],this[_0x7107d8(0x877)]['y']=this[_0x7107d8(0x994)]['y'])));},VisuMZ[_0x3b4dfd(0x1bf)]['Game_Picture_show']=Game_Picture[_0x3b4dfd(0x396)]['show'],Game_Picture[_0x3b4dfd(0x396)][_0x3b4dfd(0x340)]=function(_0x593e88,_0x2cd6de,_0x2aca6e,_0x539943,_0x287cb6,_0x581a8f,_0xb87b39,_0x290dfd){const _0x2f691f=_0x3b4dfd;VisuMZ[_0x2f691f(0x1bf)]['Game_Picture_show'][_0x2f691f(0x68e)](this,_0x593e88,_0x2cd6de,_0x2aca6e,_0x539943,_0x287cb6,_0x581a8f,_0xb87b39,_0x290dfd),this[_0x2f691f(0x88a)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x2cd6de]||{'x':0x0,'y':0x0});},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x867)]=Game_Picture[_0x3b4dfd(0x396)]['move'],Game_Picture[_0x3b4dfd(0x396)][_0x3b4dfd(0x54f)]=function(_0x2885dc,_0x4cf9f1,_0x129629,_0x1d1b43,_0x36e57f,_0x52ebb7,_0x3f1579,_0x5315d7,_0x2cb973){const _0x5e1f61=_0x3b4dfd;VisuMZ[_0x5e1f61(0x1bf)]['Game_Picture_move'][_0x5e1f61(0x68e)](this,_0x2885dc,_0x4cf9f1,_0x129629,_0x1d1b43,_0x36e57f,_0x52ebb7,_0x3f1579,_0x5315d7,_0x2cb973),this[_0x5e1f61(0x471)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x2885dc]||{'x':0x0,'y':0x0});},Game_Picture['prototype'][_0x3b4dfd(0x93d)]=function(){const _0x4b60ea=_0x3b4dfd;this['_duration']>0x0&&(this[_0x4b60ea(0x877)]['x']=this[_0x4b60ea(0x3cd)](this[_0x4b60ea(0x877)]['x'],this['_targetAnchor']['x']),this[_0x4b60ea(0x877)]['y']=this[_0x4b60ea(0x3cd)](this[_0x4b60ea(0x877)]['y'],this[_0x4b60ea(0x994)]['y']));},Game_Picture[_0x3b4dfd(0x396)][_0x3b4dfd(0x88a)]=function(_0x496cba){const _0x419874=_0x3b4dfd;this[_0x419874(0x877)]=_0x496cba,this[_0x419874(0x994)]=JsonEx['makeDeepCopy'](this['_anchor']);},Game_Picture[_0x3b4dfd(0x396)][_0x3b4dfd(0x471)]=function(_0x46b76d){const _0x4d3068=_0x3b4dfd;this[_0x4d3068(0x994)]=_0x46b76d;},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x1c9)]=Sprite_Picture[_0x3b4dfd(0x396)][_0x3b4dfd(0x6a9)],Sprite_Picture[_0x3b4dfd(0x396)]['updateOrigin']=function(){const _0x3ac834=_0x3b4dfd,_0x4054f0=this[_0x3ac834(0x2b5)]();if(!_0x4054f0[_0x3ac834(0x977)]())VisuMZ[_0x3ac834(0x1bf)]['Sprite_Picture_updateOrigin'][_0x3ac834(0x68e)](this);else{if('UAOSq'==='UAOSq')this['anchor']['x']=_0x4054f0[_0x3ac834(0x977)]()['x'],this[_0x3ac834(0x977)]['y']=_0x4054f0[_0x3ac834(0x977)]()['y'];else{if(this[_0x3ac834(0xa12)]===_0x5d67ca)this[_0x3ac834(0x1e2)]();this[_0x3ac834(0xa12)]=_0x5f3bd4[_0x3ac834(0x1ea)]()[_0x3ac834(0x58b)]();}}},Game_Action[_0x3b4dfd(0x396)]['setEnemyAction']=function(_0x4af789){const _0x1a317b=_0x3b4dfd;if(_0x4af789){if(_0x1a317b(0x4bc)!=='VZxiq'){if(!this[_0x1a317b(0x290)]);const _0xa80a23=this['_animation'][_0x1a317b(0x926)]||'';_0xa80a23[_0x1a317b(0x7b5)](/<RATE:[ ](\d+)>/i)&&(this[_0x1a317b(0x642)]=(_0x101500(_0x41131d['$1'])||0x1)[_0x1a317b(0x1e1)](0x1,0xa));}else{const _0x4bbd25=_0x4af789[_0x1a317b(0x217)];if(_0x4bbd25===0x1&&this[_0x1a317b(0x6eb)]()[_0x1a317b(0x7b3)]()!==0x1)_0x1a317b(0x89a)!==_0x1a317b(0x49f)?this[_0x1a317b(0x8d1)]():(this[_0x1a317b(0x822)](this[_0x1a317b(0x9b0)]),this[_0x1a317b(0x9b0)]=null);else{if(_0x4bbd25===0x2&&this[_0x1a317b(0x6eb)]()[_0x1a317b(0x257)]()!==0x2){if(_0x1a317b(0x5ab)===_0x1a317b(0x5ab))this[_0x1a317b(0x20b)]();else return _0x57d28b['buttonAssistOk'];}else'pZKJV'===_0x1a317b(0x591)?_0x221a88[_0x1a317b(0x365)]():this[_0x1a317b(0x4c9)](_0x4bbd25);}}}else this[_0x1a317b(0x670)]();},Game_Actor['prototype'][_0x3b4dfd(0x9ea)]=function(){const _0x3eadeb=_0x3b4dfd;return this[_0x3eadeb(0x9f3)]()['filter'](_0x126fce=>this[_0x3eadeb(0x433)](_0x126fce)&&this[_0x3eadeb(0x975)]()[_0x3eadeb(0x5e6)](_0x126fce[_0x3eadeb(0x58e)]));},Window_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x36f)]=function(){const _0x39363e=_0x3b4dfd;this[_0x39363e(0x3b4)]=new Sprite(),this[_0x39363e(0x3b4)][_0x39363e(0x8ad)]=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0x39363e(0x281)](this[_0x39363e(0x3b4)]);},Window_Base[_0x3b4dfd(0x396)]['refreshDimmerBitmap']=function(){const _0x5e82b0=_0x3b4dfd;if(this['_dimmerSprite']){if('NJTUt'!=='ESozk'){const _0x427d57=this[_0x5e82b0(0x3b4)][_0x5e82b0(0x8ad)],_0x497d31=this[_0x5e82b0(0x2d3)],_0x3813c8=this[_0x5e82b0(0x2c8)],_0x51f612=this['padding'],_0x371083=ColorManager[_0x5e82b0(0x424)](),_0x5949c0=ColorManager[_0x5e82b0(0x687)]();_0x427d57[_0x5e82b0(0x5d0)](_0x497d31,_0x3813c8),_0x427d57['gradientFillRect'](0x0,0x0,_0x497d31,_0x51f612,_0x5949c0,_0x371083,!![]),_0x427d57[_0x5e82b0(0x676)](0x0,_0x51f612,_0x497d31,_0x3813c8-_0x51f612*0x2,_0x371083),_0x427d57[_0x5e82b0(0x533)](0x0,_0x3813c8-_0x51f612,_0x497d31,_0x51f612,_0x371083,_0x5949c0,!![]),this[_0x5e82b0(0x3b4)]['setFrame'](0x0,0x0,_0x497d31,_0x3813c8);}else return 0x0;}},Game_Actor[_0x3b4dfd(0x396)][_0x3b4dfd(0x614)]=function(){const _0x44d1d8=_0x3b4dfd;for(let _0x2157c6=0x0;_0x2157c6<this[_0x44d1d8(0x2c6)]();_0x2157c6++){if('kZuJD'===_0x44d1d8(0x20f))return _0x414ce9[_0x44d1d8(0x1bf)][_0x44d1d8(0x5af)][_0x44d1d8(0x2ab)][_0x44d1d8(0x635)]['ButtonFadeSpeed'];else{const _0x2a1672=this[_0x44d1d8(0x541)]();let _0x1f192f=Number[_0x44d1d8(0x5cf)];this[_0x44d1d8(0x4e9)](_0x2157c6,_0x2a1672[0x0]);for(const _0x34d579 of _0x2a1672){const _0x4f9a9d=_0x34d579[_0x44d1d8(0x65d)]();_0x4f9a9d>_0x1f192f&&(_0x44d1d8(0x988)===_0x44d1d8(0x988)?(_0x1f192f=_0x4f9a9d,this[_0x44d1d8(0x4e9)](_0x2157c6,_0x34d579)):_0x1ab6f9[_0x44d1d8(0x821)]()&&(_0x2e24db['log'](_0x44d1d8(0x69a)),_0xdc6bde['log'](_0xe7dc9b)));}}}this[_0x44d1d8(0x649)](_0x44d1d8(0x66c));},Window_BattleItem['prototype']['isEnabled']=function(_0x30fa1e){const _0x462899=_0x3b4dfd;if(BattleManager['actor']()){if('GMznp'===_0x462899(0x21e))return BattleManager[_0x462899(0x337)]()[_0x462899(0x433)](_0x30fa1e);else{let _0x5bef9d=_0xe01d64['CoreEngine'][_0x462899(0x6e9)][_0x462899(0x68e)](this);return this[_0x462899(0x6e3)]()&&(_0x5bef9d*=_0x4b2c19[_0x462899(0x1db)]()),_0x5bef9d;}}else return Window_ItemList[_0x462899(0x396)][_0x462899(0x909)][_0x462899(0x68e)](this,_0x30fa1e);},VisuMZ['CoreEngine'][_0x3b4dfd(0x4e6)]=Scene_Map['prototype'][_0x3b4dfd(0x3ee)],Scene_Map[_0x3b4dfd(0x396)][_0x3b4dfd(0x3ee)]=function(){const _0x3c3946=_0x3b4dfd;VisuMZ[_0x3c3946(0x1bf)][_0x3c3946(0x4e6)][_0x3c3946(0x68e)](this);const _0x4d0d8f=this[_0x3c3946(0x8c9)][_0x3c3946(0x385)];if(_0x4d0d8f)this[_0x3c3946(0x2f6)](_0x4d0d8f);},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x3eb)]=Scene_Battle['prototype'][_0x3b4dfd(0x3ee)],Scene_Battle[_0x3b4dfd(0x396)][_0x3b4dfd(0x3ee)]=function(){const _0x5e971d=_0x3b4dfd;VisuMZ['CoreEngine'][_0x5e971d(0x3eb)][_0x5e971d(0x68e)](this);const _0x3e5a5d=this[_0x5e971d(0x8c9)][_0x5e971d(0x385)];if(_0x3e5a5d)this[_0x5e971d(0x2f6)](_0x3e5a5d);},Sprite_Actor[_0x3b4dfd(0x396)]['update']=function(){const _0x3409eb=_0x3b4dfd;Sprite_Battler[_0x3409eb(0x396)][_0x3409eb(0x933)][_0x3409eb(0x68e)](this),this[_0x3409eb(0x6ff)]();if(this[_0x3409eb(0x202)])this[_0x3409eb(0x92e)]();else this[_0x3409eb(0x85c)]!==''&&(this[_0x3409eb(0x85c)]='');},Window['prototype'][_0x3b4dfd(0x50a)]=function(){const _0x2f6d9c=_0x3b4dfd,_0x3e28b8=this['_width'],_0x4300fa=this['_height'],_0x23cb0d=0x18,_0x4aa49d=_0x23cb0d/0x2,_0x411b84=0x60+_0x23cb0d,_0x3ce3e7=0x0+_0x23cb0d;this[_0x2f6d9c(0xa20)]['bitmap']=this[_0x2f6d9c(0x8b9)],this[_0x2f6d9c(0xa20)]['anchor']['x']=0.5,this[_0x2f6d9c(0xa20)][_0x2f6d9c(0x977)]['y']=0.5,this[_0x2f6d9c(0xa20)][_0x2f6d9c(0x5e0)](_0x411b84+_0x4aa49d,_0x3ce3e7+_0x4aa49d+_0x23cb0d,_0x23cb0d,_0x4aa49d),this[_0x2f6d9c(0xa20)][_0x2f6d9c(0x54f)](Math['round'](_0x3e28b8/0x2),Math[_0x2f6d9c(0x355)](_0x4300fa-_0x4aa49d)),this[_0x2f6d9c(0x38c)][_0x2f6d9c(0x8ad)]=this[_0x2f6d9c(0x8b9)],this[_0x2f6d9c(0x38c)][_0x2f6d9c(0x977)]['x']=0.5,this[_0x2f6d9c(0x38c)][_0x2f6d9c(0x977)]['y']=0.5,this[_0x2f6d9c(0x38c)]['setFrame'](_0x411b84+_0x4aa49d,_0x3ce3e7,_0x23cb0d,_0x4aa49d),this[_0x2f6d9c(0x38c)][_0x2f6d9c(0x54f)](Math[_0x2f6d9c(0x355)](_0x3e28b8/0x2),Math[_0x2f6d9c(0x355)](_0x4aa49d));},Window[_0x3b4dfd(0x396)]['_refreshPauseSign']=function(){const _0x5aaeae=_0x3b4dfd,_0x1c6216=0x90,_0x1e6b9f=0x60,_0x50fed4=0x18;this['_pauseSignSprite'][_0x5aaeae(0x8ad)]=this[_0x5aaeae(0x8b9)],this[_0x5aaeae(0x422)][_0x5aaeae(0x977)]['x']=0.5,this[_0x5aaeae(0x422)][_0x5aaeae(0x977)]['y']=0x1,this[_0x5aaeae(0x422)][_0x5aaeae(0x54f)](Math[_0x5aaeae(0x355)](this[_0x5aaeae(0x711)]/0x2),this[_0x5aaeae(0x892)]),this['_pauseSignSprite'][_0x5aaeae(0x5e0)](_0x1c6216,_0x1e6b9f,_0x50fed4,_0x50fed4),this[_0x5aaeae(0x422)][_0x5aaeae(0x6f9)]=0xff;},Window[_0x3b4dfd(0x396)][_0x3b4dfd(0x6a1)]=function(){const _0x1a9f7f=_0x3b4dfd,_0x4329ac=this[_0x1a9f7f(0x76f)][_0x1a9f7f(0x7a3)][_0x1a9f7f(0x70a)](new Point(0x0,0x0)),_0x300d02=this[_0x1a9f7f(0x76f)][_0x1a9f7f(0x76e)];_0x300d02['x']=_0x4329ac['x']+this[_0x1a9f7f(0x8fe)]['x'],_0x300d02['y']=_0x4329ac['y']+this[_0x1a9f7f(0x8fe)]['y'],_0x300d02[_0x1a9f7f(0x2d3)]=Math[_0x1a9f7f(0x313)](this[_0x1a9f7f(0x320)]*this['scale']['x']),_0x300d02[_0x1a9f7f(0x2c8)]=Math[_0x1a9f7f(0x313)](this[_0x1a9f7f(0x2cc)]*this[_0x1a9f7f(0x979)]['y']);},Window['prototype']['_refreshBack']=function(){const _0x19f709=_0x3b4dfd,_0x2743ec=this['_margin'],_0x3b565b=Math['max'](0x0,this['_width']-_0x2743ec*0x2),_0x38c4aa=Math[_0x19f709(0x67b)](0x0,this[_0x19f709(0x892)]-_0x2743ec*0x2),_0x2170f9=this[_0x19f709(0x2a9)],_0xb73896=_0x2170f9[_0x19f709(0x89d)][0x0];_0x2170f9[_0x19f709(0x8ad)]=this[_0x19f709(0x8b9)],_0x2170f9['setFrame'](0x0,0x0,0x60,0x60),_0x2170f9[_0x19f709(0x54f)](_0x2743ec,_0x2743ec),_0x2170f9['scale']['x']=_0x3b565b/0x60,_0x2170f9[_0x19f709(0x979)]['y']=_0x38c4aa/0x60,_0xb73896[_0x19f709(0x8ad)]=this[_0x19f709(0x8b9)],_0xb73896[_0x19f709(0x5e0)](0x0,0x60,0x60,0x60),_0xb73896[_0x19f709(0x54f)](0x0,0x0,_0x3b565b,_0x38c4aa),_0xb73896[_0x19f709(0x979)]['x']=0x1/_0x2170f9[_0x19f709(0x979)]['x'],_0xb73896[_0x19f709(0x979)]['y']=0x1/_0x2170f9[_0x19f709(0x979)]['y'],_0x2170f9['setColorTone'](this[_0x19f709(0x6e1)]);},Game_Temp[_0x3b4dfd(0x396)]['sceneTerminationClearEffects']=function(){const _0x4ed489=_0x3b4dfd;this[_0x4ed489(0x466)]=[],this[_0x4ed489(0x898)]=[],this[_0x4ed489(0x47a)]=[],this[_0x4ed489(0x681)]=[];},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x52f)]=Scene_Base[_0x3b4dfd(0x396)][_0x3b4dfd(0x5c5)],Scene_Base['prototype'][_0x3b4dfd(0x5c5)]=function(){const _0x14e9bf=_0x3b4dfd;if($gameTemp)$gameTemp['sceneTerminationClearEffects']();VisuMZ[_0x14e9bf(0x1bf)][_0x14e9bf(0x52f)][_0x14e9bf(0x68e)](this);},Bitmap[_0x3b4dfd(0x396)][_0x3b4dfd(0x8d8)]=function(_0x22d14e){const _0xdd5029=_0x3b4dfd,_0x4ac72b=this[_0xdd5029(0x9f7)];_0x4ac72b[_0xdd5029(0x9ed)](),_0x4ac72b[_0xdd5029(0x61c)]=this[_0xdd5029(0x516)]();const _0xcd6f60=_0x4ac72b[_0xdd5029(0x1f0)](_0x22d14e)[_0xdd5029(0x2d3)];return _0x4ac72b[_0xdd5029(0x3b8)](),_0xcd6f60;},Window_Message[_0x3b4dfd(0x396)][_0x3b4dfd(0x4a9)]=function(_0x11711c){const _0x1228b7=_0x3b4dfd;if(this['useFontWidthFix']()){if(_0x1228b7(0x665)!==_0x1228b7(0x665))_0x3380b9='Skill-%1-%2'[_0x1228b7(0x4f9)](_0xdadc6c,_0x29e6a0);else return this[_0x1228b7(0x27c)][_0x1228b7(0x8d8)](_0x11711c);}else return Window_Base['prototype'][_0x1228b7(0x4a9)][_0x1228b7(0x68e)](this,_0x11711c);},Window_Message[_0x3b4dfd(0x396)][_0x3b4dfd(0x2ef)]=function(){const _0x117863=_0x3b4dfd;return VisuMZ[_0x117863(0x1bf)][_0x117863(0x5af)][_0x117863(0x38a)]['FontWidthFix']??!![];},VisuMZ[_0x3b4dfd(0x1bf)][_0x3b4dfd(0x507)]=Game_Action[_0x3b4dfd(0x396)]['numRepeats'],Game_Action[_0x3b4dfd(0x396)][_0x3b4dfd(0x38d)]=function(){const _0x4b4a6e=_0x3b4dfd;return this['item']()?VisuMZ[_0x4b4a6e(0x1bf)][_0x4b4a6e(0x507)][_0x4b4a6e(0x68e)](this):0x0;},VisuMZ['CoreEngine'][_0x3b4dfd(0x63d)]=Game_Action[_0x3b4dfd(0x396)][_0x3b4dfd(0x8d1)],Game_Action['prototype'][_0x3b4dfd(0x8d1)]=function(){const _0x5bf2b4=_0x3b4dfd;this[_0x5bf2b4(0x6eb)]()&&this['subject']()[_0x5bf2b4(0x798)]()?VisuMZ[_0x5bf2b4(0x1bf)][_0x5bf2b4(0x63d)][_0x5bf2b4(0x68e)](this):this[_0x5bf2b4(0x670)]();},Sprite_Name['prototype'][_0x3b4dfd(0x787)]=function(){return 0x24;},Sprite_Name[_0x3b4dfd(0x396)][_0x3b4dfd(0x9fd)]=function(){const _0x2769a9=_0x3b4dfd,_0x3a35ca=this[_0x2769a9(0x926)](),_0x27400d=this[_0x2769a9(0x633)](),_0x2b28fa=this[_0x2769a9(0x787)]();this[_0x2769a9(0x39f)](),this[_0x2769a9(0x8ad)][_0x2769a9(0x670)](),this['bitmap']['drawTextTopAligned'](_0x3a35ca,0x4,0x0,_0x27400d,_0x2b28fa,_0x2769a9(0x3a6));},Bitmap['prototype'][_0x3b4dfd(0x6f2)]=function(_0x23e3fb,_0x20627b,_0x33757e,_0x4123fe,_0x11b5f6,_0x41bf14){const _0x57c2e1=_0x3b4dfd,_0x4cb775=this[_0x57c2e1(0x9f7)],_0x3965bc=_0x4cb775['globalAlpha'];_0x4123fe=_0x4123fe||0xffffffff;let _0x59c97b=_0x20627b,_0x3a78cf=Math[_0x57c2e1(0x355)](_0x33757e+0x18/0x2+this[_0x57c2e1(0x6f8)]*0.35);if(_0x41bf14===_0x57c2e1(0x637)){if(_0x57c2e1(0x9b9)!==_0x57c2e1(0x9b9))return _0x41e02e[_0x57c2e1(0x313)](_0x386406[_0x57c2e1(0x1bf)][_0x57c2e1(0x1a1)][_0x57c2e1(0x68e)](this,_0x4af6ed));else _0x59c97b+=_0x4123fe/0x2;}_0x41bf14===_0x57c2e1(0x5b2)&&(_0x59c97b+=_0x4123fe),_0x4cb775[_0x57c2e1(0x9ed)](),_0x4cb775['font']=this[_0x57c2e1(0x516)](),_0x4cb775['textAlign']=_0x41bf14,_0x4cb775[_0x57c2e1(0x310)]=_0x57c2e1(0x410),_0x4cb775['globalAlpha']=0x1,this[_0x57c2e1(0x56b)](_0x23e3fb,_0x59c97b,_0x3a78cf,_0x4123fe),_0x4cb775[_0x57c2e1(0x7e5)]=_0x3965bc,this[_0x57c2e1(0x52e)](_0x23e3fb,_0x59c97b,_0x3a78cf,_0x4123fe),_0x4cb775[_0x57c2e1(0x3b8)](),this[_0x57c2e1(0x5a0)][_0x57c2e1(0x933)]();},VisuMZ[_0x3b4dfd(0x1bf)]['BattleManager_checkSubstitute']=BattleManager[_0x3b4dfd(0x96f)],BattleManager['checkSubstitute']=function(_0x58d241){const _0x2d3c9b=_0x3b4dfd;if(this['_action'][_0x2d3c9b(0x296)]())return![];return VisuMZ[_0x2d3c9b(0x1bf)][_0x2d3c9b(0x81f)][_0x2d3c9b(0x68e)](this,_0x58d241);},BattleManager[_0x3b4dfd(0x77b)]=function(){const _0x850eef=_0x3b4dfd;if(this[_0x850eef(0x9b0)])this[_0x850eef(0x38f)][_0x850eef(0x77b)](this['_subject']);this[_0x850eef(0x978)]=_0x850eef(0x71a),this[_0x850eef(0x9b0)]&&this[_0x850eef(0x9b0)][_0x850eef(0x2c6)]()===0x0&&(this[_0x850eef(0x822)](this[_0x850eef(0x9b0)]),this[_0x850eef(0x9b0)]=null);},Bitmap[_0x3b4dfd(0x396)][_0x3b4dfd(0x4a5)]=function(){const _0x3e9519=_0x3b4dfd;this[_0x3e9519(0x1fc)]=new Image(),this[_0x3e9519(0x1fc)][_0x3e9519(0x4b5)]=this[_0x3e9519(0x42f)][_0x3e9519(0x2bd)](this),this[_0x3e9519(0x1fc)]['onerror']=this[_0x3e9519(0x35b)]['bind'](this),this['_destroyCanvas'](),this[_0x3e9519(0x2b3)]=_0x3e9519(0x1ce);if(Utils[_0x3e9519(0x31a)]()){if(_0x3e9519(0x48a)==='zsQHu')this[_0x3e9519(0x87e)]();else return _0x3ab923[_0x3e9519(0x630)][_0x3e9519(0x181)][_0x3e9519(0x68e)](this);}else this[_0x3e9519(0x1fc)][_0x3e9519(0x747)]=this[_0x3e9519(0x4f7)],![]&&this[_0x3e9519(0x1fc)][_0x3e9519(0x2d3)]>0x0&&(this[_0x3e9519(0x1fc)][_0x3e9519(0x4b5)]=null,this[_0x3e9519(0x42f)]());},Scene_Skill[_0x3b4dfd(0x396)][_0x3b4dfd(0x18b)]=function(){const _0x11a55f=_0x3b4dfd;Scene_MenuBase[_0x11a55f(0x396)][_0x11a55f(0x18b)][_0x11a55f(0x68e)](this),this[_0x11a55f(0x7f2)](),this['_itemWindow']['deactivate'](),this[_0x11a55f(0x7d8)][_0x11a55f(0x880)](),this['_skillTypeWindow'][_0x11a55f(0x32f)]();},Scene_Skill['prototype']['arePageButtonsEnabled']=function(){const _0x166b2b=_0x3b4dfd;return this['_skillTypeWindow']&&this[_0x166b2b(0x772)][_0x166b2b(0x56f)];},Game_Map[_0x3b4dfd(0x396)][_0x3b4dfd(0x9a2)]=function(_0x218d6a,_0x4b2088,_0x3ece68){const _0x5355a3=_0x3b4dfd,_0x5d4c3f=this[_0x5355a3(0x1b4)](),_0x33beb8=this[_0x5355a3(0x7b9)](_0x218d6a,_0x4b2088);for(const _0x1ac76e of _0x33beb8){const _0x24c718=_0x5d4c3f[_0x1ac76e];if(_0x24c718===undefined||_0x24c718===null){if($gameTemp['isPlaytest']()){if(_0x5355a3(0xa09)===_0x5355a3(0x344))_0x3f888e['CoreEngine'][_0x5355a3(0x744)][_0x5355a3(0x68e)](this),_0x1a3605=this;else{let _0x2aabd9='Current\x20tileset\x20has\x20incomplete\x20flag\x20data.'+'\x0a';_0x2aabd9+=_0x5355a3(0x420)+'\x0a',_0x2aabd9+=_0x5355a3(0x364),Imported['VisuMZ_3_EventChainReact']||Imported[_0x5355a3(0x25c)]?(alert(_0x2aabd9),SceneManager['exit']()):_0x5355a3(0x26f)!==_0x5355a3(0x26f)?_0x182e64[_0x5355a3(0x1bf)][_0x5355a3(0x5af)]['QoL'][_0x5355a3(0x356)]?this[_0x5355a3(0x20d)](_0x6ae04b,_0x2eb3c7,_0x4fd0ae,_0x190c30):_0x141fb9['CoreEngine']['Bitmap_drawTextOutline']['call'](this,_0x5ba599,_0x55973a,_0x1b16ba,_0x283b6a):(console['log'](_0x2aabd9),!$gameTemp[_0x5355a3(0x8a0)]&&('ZxcOA'!==_0x5355a3(0x712)?($gameTemp['_showDevTools']=!![],SceneManager[_0x5355a3(0x667)]()):(_0x47bae8[_0x5355a3(0x862)](_0x46217b),!_0x59b21d[_0x5355a3(0x8a0)]&&(_0x2f3730[_0x5355a3(0x8a0)]=!![],_0x5aa2e1[_0x5355a3(0x667)]()))));}}}if((_0x24c718&0x10)!==0x0){if(_0x5355a3(0x5a5)!==_0x5355a3(0x5a5))for(const _0x5b6ab7 of _0x309f5d){this[_0x5355a3(0x94d)]([_0x5b6ab7],_0x41d315,_0x7cb465,_0x1314cc,_0xade8d9),_0x47c91a+=_0xa5172c;}else continue;}if((_0x24c718&_0x3ece68)===0x0)return!![];if((_0x24c718&_0x3ece68)===_0x3ece68){if(_0x5355a3(0x568)!==_0x5355a3(0x568))this[_0x5355a3(0x686)](_0x216252[_0x5355a3(0x1bf)][_0x5355a3(0x5af)]['Gold']['GoldOverlap'],_0x365984,_0x3bdb31,_0xebb6a5,_0x5355a3(0x5b2));else return![];}}return![];};function _0xf6fb(){const _0x149d5b=['eventsXyNt','WIN_OEM_FJ_LOYA','_statusWindow','KVcHV','436210mYeCjU','OVVrJ','updatePositionCoreEngineShakeOriginal','xparamFlat2','jgKXb','_targetX','TostF','updatePadding','createEnemies','maxLvGaugeColor1','_spriteset','PictureFilename','TLWFY','Game_Picture_updateMove','Enable','Game_Actor_changeClass','baseId','getCombinedScrollingText','setAttack','process_VisuMZ_CoreEngine_Settings','Cscaj','INOUTQUINT','addEventListener','ListRect','parse','measureTextWidthNoRounding','_pagedownButton','eiElv','createCustomBackgroundImages','KANA','_backgroundSprite','ColorMaxLvGauge2','keyCode','_paramPlus','leLVF','note','_index','Game_Actor_levelUp','return\x200','add','targetObjects','text','requestMotion','OTB','JUNJA','isSpecialCode','%2%1%3','FvZhI','reduce','Game_Picture_scaleX','_pointAnimationSprites','setWindowPadding','Input_updateGamepadState','addAnimationSpriteToContainer','CNT','darwin','100975ZGOVWl','clearRect','atypeId','BottomButtons','WSqPa','TZOjs','_hovered','origin','Scene_Map_updateMainMultiply','Input_shouldPreventDefault','performEscape','_menuButton','backOpacity','LevelUpFullHp','updatePosition','RightMenus','defineProperty','processEscape','isEnabled','initialBattleSystem','MqrtN','processKeyboardEnd','Chance','escape','Window_NameInput_cursorLeft','TAB','OUTBACK','nw.gui','Scene_Map_update','Spriteset_Base_initialize','Game_System_initialize','NUMPAD8','NUMPAD2','_screenX','DOWN','setClickHandler','Map%1','PreserveNumbers','itemSuccessRate','IFjeT','ExtractStrFromMap','updatePositionCoreEngine','itemEva','OUTCUBIC','ColorCTGauge1','checkCoreEngineDisplayCenter','currencyUnit','name','Scene_Name_onInputOk','CLOSE_BRACKET','ZkGHY','_registerKeyInput','ExportStrFromAllMaps','ctGaugeColor2','BgFilename2','updateMotion','_targets','_internalTextures','drawGameSubtitle','getKeyboardInputButtonString','update','ItemBackColor2','paramBase','AnimationPoint','SellBgType','WIN_OEM_RESET','_coreEasing','scaleSprite','createTextState','pan','updateAnchor','helpWindowRect','isUseModernControls','process_VisuMZ_CoreEngine_CustomParameters','maxItems','moveMenuButtonSideButtonLayout','areButtonsHidden','Scene_MenuBase_mainAreaTop','CategoryBgType','Bitmap_resize','IconXParam5','_tempActor','ouySx','drawGameVersion','cBgXZ','BgFilename1','createFauxAnimationSprite','Game_Interpreter_command122','TILDE','needsUpdate','Troop%1','currentValue','Spriteset_Base_destroy','createPointAnimationSprite','dFcGf','ModernControls','ExtractStrFromList','onButtonImageLoad','Rate1','isEventRunning','_lastGamepad','coreEngineRepositionEnemies','_scrollDuration','NUMPAD5','xaGHj','Scene_Base_terminate','keyboard','TimeProgress','onDatabaseLoaded','xnmzx','_commandWindow','Ejokl','xparamPlus','process_VisuMZ_CoreEngine_Notetags','process_VisuMZ_CoreEngine_Functions','13VrhqnL','IconSParam1','_mode','ARRAYSTRUCT','_backgroundFilter','checkSubstitute','RSYqG','getButtonAssistLocation','OS_KEY','INQUAD','TextStr','skillTypes','Game_Map_scrollDown','anchor','_phase','scale','OPEN_BRACKET','nah','OpenConsole','updateOpacity','EQUALS','dDMYM','onEscapeSuccess','mainAreaBottom','AQTUB','Flat2','createFauxAnimation','KmXia','checkCacheKey','playCursor','XZHUB','UmvVN','FDR','bhhwx','removeFauxAnimation','bgmVolume','PRINT','isRepeated','paramX','$dataMap','_maxDigits','ShortcutScripts','_targetAnchor','retrievePointAnimation','getCustomBackgroundSettings','Game_BattlerBase_refresh','PGUP','LvhuE','gainSilentTp','_battleField','3554436iDIesQ','clearCachedKeys','processKeyboardBackspace','isInstanceOfSceneMap','duXUP','_isButtonHidden','checkPassage','ControllerButtons','menu','drawParamText','Graphics','setViewportCoreEngineFix','horzJS','makeCoreEngineCommandList','removeAllFauxAnimations','isInputting','JsUMA','sparamPlus','sparamRate','getColor','_subject','Scene_Battle_createSpriteset','string','DEF','isRightInputMode','lupyt','ExportStrFromAllTroops','dnTsO','Scene_Map_updateScene','AHlbu','isGamepadConnected','fromCharCode','LxOwH','create','outlineColor','smallParamFontSize','Game_Action_itemEva','Total','TitleCommandList','ColorExpGauge1','MvAnimationRate','hhCjm','setCoreEngineScreenShakeStyle','Window_Selectable_processCursorMove','setBackgroundOpacity','_sideButtonLayout','_pageupButton','StatusRect','printError','INOUTBACK','BlurFilter','rgba(0,\x200,\x200,\x200.7)','aLIYr','key%1','Bitmap_clearRect','floor','_pictureName','Game_Interpreter_command105','updateMain','ONE','yUuGN','Game_Map_scrollUp','Window_Base_initialize','value','constructor','playTestF6','Xujdp','getColorDataFromPluginParameters','wuUzT','requestPointAnimation','AllMaps','buttonAssistWindowButtonRect','atYlc','Nruvd','IDs','IconXParam2','Game_Screen_initialize','CommandList','usableSkills','mhp','loadMapData','save','PositionJS','ALWAYS','isActiveTpb','MDR','PGDN','skills','Color','ConvertNumberToString','operation','context','Sprite_Animation_processSoundTimings','_hp','selectLast','drawCurrencyValue','boxHeight','redraw','isGamepadAxisMoved','imageSmoothingEnabled','CRSEL','removeAnimationFromContainer','processSoundTimings','determineSideButtonLayoutValid','measureTextWidth','IconXParam0','catchException','oQjgR','Scene_Battle_createSpriteset_detach','Yhekg','_offsetY','_stored_ctGaugeColor2','FunctionName','_isWindow','NameMenu','isOpen','removeOnceParallelInterpreter','visible','_coreEngineShakeStyle','XParamVocab4','qpkng','exportAllTroopStrings','length','createBackground','_stored_hpGaugeColor1','buttonAssistSwitch','runCombinedScrollingTextAsCode','DisplayLockX','updateCurrentEvent','SideView','altKey','DashToggleR','_downArrowSprite','bGBjz','currentClass','AQVtD','ShowJS','HYPHEN_MINUS','1467493cbALtv','subjectHitRate','AudioChangeBgmPitch','AudioChangeBgmVolume','CodeJS','IconSet','Window_NameInput_processTouch','easingType','NewGameBoot','KJVdb','Rate2','playTestCtrlT','xparamRate2','CommandRect','UGmvK','seVolume','Mirror','fafeO','Center','XParameterFormula','eva','slotWindowRect','isSideButtonLayout','onActorChange','updateFauxAnimations','onerror','bgs','drawIcon','xparamRateJS','startNormalGame','SFvPP','nnWMe','tpColor','commandWindowRows','Scene_Status_create','ColorTPGauge2','Subtitle','Window_Selectable_processTouch','currentLevelExp','Game_Picture_initBasic','INTlg','createCancelButton','Obora','ColorManager_loadWindowskin','itemRect','Bitmap_measureTextWidth','maxLevel','paramPlus','setMainFontSize','GET','isHandled','isNextScene','PERCENT','areTileShadowsHidden','OptionsBgType','expGaugeColor1','encounterStepsMinimum','slice','rgba(0,\x200,\x200,\x201.0)','isMVAnimation','Symbol','IqCDa','rvtuD','_storedStack','tilesetFlags','kLamF','en-US','VariableJsBlock','profileWindowRect','MAXMP','INOUTBOUNCE','MapOnceParallel','qGKPc','drawRightArrow','_pressed','CoreEngine','QNrBk','processFauxAnimationRequests','shake','XTSIJ','_windowLayer','setupBattleTestItems','helpAreaHeight','Flat','isGameActive','Sprite_Picture_updateOrigin','#%1','EnableNumberInput','sULGQ','_context','loading','EREOF','Sprite_Button_initialize','F19','CommonEventID','COLON','ilJBN','ColorCrisis','RYHxG','ATK','URL','targetEvaRate','_movementDuration','zoomScale','InputBgType','pagedown','VisuMZ_1_OptionsCore','MULTIPLY','pObwB','clamp','initCoreEngineScreenShake','_stored_ctGaugeColor1','Key%1','scaleY','_displayX','ECJoU','OutlineColorGauge','keyMapper','toLowerCase','encounterStep','_stored_tpGaugeColor1','title','ExtDisplayedParams','drawCurrentParam','measureText','RQuwq','expGaugeColor2','consumable','params','XKebx','command357','Bitmap_fillRect','Jtmch','keyRepeatWait','mpGaugeColor2','padding','_image','HANJA','gXKWf','updateMainMultiply','ImprovedAccuracySystem','animationId','_actor','IconXParam9','tpGaugeColor1','_pictureCoordinatesWindow','itemHeight','object','forceOutOfPlaytest','ScreenResolution','NameInputMessage','setGuard','RegExp','_drawTextShadow','getBattleSystem','LfGLM','createPointAnimationQueue','applyCoreEasing','itypeId','ZUeEj','gameTitle','CONTEXT_MENU','xOiIy','skillId','_stored_expGaugeColor1','OnLoadJS','zZUeL','XParamVocab2','ParseActorNotetags','F22','GMznp','start','cursorRight','setupRate','updatePointAnimations','_targetOpacity','DamageColor','_displayY','useDigitGroupingEx','hpGaugeColor1','VisuMZ_2_BattleSystemETB','WIN_ICO_00','playBgm','Sprite_AnimationMV_processTimingData','ZVGFY','stencilOp','jNPCa','TGR','AAOrH','SPACE','HelpBgType','aosaJ','itemLineRect','Untitled','FmrVV','WASD','LUK','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','drawGameTitle','INELASTIC','Plus','NumberRect','buttonAssistOffset2','Window_NameInput_cursorUp','performMiss','NUMPAD4','helpAreaTop','Iicyy','hkapf','LINEAR','_texture','FBqid','tJnHu','Actor-%1-%2','GRD','initialize','3JDLwJZ','WIN_OEM_PA2','list','GREATER_THAN','NewGameCommonEvent','flush','render','createWindowLayer','blt','DrawIcons','nIUYh','guardSkillId','AudioChangeBgmPan','exit','Window_NameInput_processHandling','join','VisuMZ_4_UniqueTileEffects','_stored_deathColor','IconParam2','updateKeyText','REPLACE','nprue','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','startAutoNewGame','clearOnceParallelInterpreters','dzuQr','([\x5c+\x5c-]\x5cd+)([%％])>','processDigitChange','1.3.0','QXPeF','loadBitmap','pressed','ParseSkillNotetags','Scene_MenuBase_createCancelButton','Game_Interpreter_command111','RfyWT','TEBws','VisuMZ_2_BattleSystemSTB','SkillTypeBgType','sparamFlat1','setValue','MAT','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','itemHit','TCR','EkpnT','DIVIDE','TextCodeNicknames','contents','hpGaugeColor2','quit','createFauxAnimationQueue','Gold','addChildToBack','IconXParam4','setSideButtonLayout','_addShadow','Game_Map_scrollRight','itemWindowRect','ATTN','Mute','EnableJS','paramBaseAboveLevel99','Window_TitleCommand_selectLast','toLocaleString','removePointAnimation','WExBl','PictureEraseAll','_animation','makeDocumentTitle','pOiXz','maxLvGaugeColor2','Scene_Map_createMenuButton','_stored_powerUpColor','isForFriend','push','nextLevelExp','updateScene','eRxdv','LESS_THAN','INCIRC','kxISB','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','_sellWindow','ADD','_stored_pendingColor','background','cursorUp','OvTQw','Scene_MenuBase_createPageButtons','catchUnknownError','PDqHr','_cache','_backSprite','tixuP','MenuLayout','createAnimationSprite','_stored_maxLvGaugeColor2','Item-%1-%2','ALYFe','<%1\x20%2:[\x20]','switchModes','_pollGamepads','_loadingState','VisuMZ_2_BattleSystemCTB','picture','targetScaleX','ParamArrow','lineHeight','exportAllMapStrings','Game_Character_processMoveCommand','gVJlJ','gaugeLineHeight','bind','_targetScaleX','_numberWindow','showPicture','XParamVocab1','LLtnY','cxnKD','position','isItemStyle','numActions','DEcyi','height','tpfHp','SHIFT','ONE_MINUS_SRC_ALPHA','innerHeight','createJsQuickFunction','VisuMZ_2_BattleSystemFTB','IconParam5','gold','App','ActorHPColor','width','_centerElement','Window_StatusBase_drawActorLevel','SParamVocab1','clearZoom','CustomParamType','_digitGrouping','duration','Class-%1-%2','displayX','mtUjq','SCROLL_LOCK','VKagN','SystemSetFontSize','BSzzY','RIEwd','colSpacing','SParamVocab2','pow','ColorGaugeBack','statusWindowRect','〘Show\x20Text〙\x0a','vjpNB','Pixelated','RPGMAKER_VERSION','number','rHVyT','<JS\x20%1\x20%2:[\x20](.*)>','useFontWidthFix','MAX_GL_TEXTURES','ZOOM','ColorMaxLvGauge1','ColorExpGauge2','InputRect','ColorTPGauge1','addChild','cursorDown','yTbzu','statusEquipWindowRect','type','setActorHome','PictureShowIcon','startMove','_animationSprites','OUTQUART','_lastPluginCommandInterpreter','Basic','AudioChangeBgsPan','outlineColorGauge','mpCostColor','LeFph','_helpWindow','cHEtK','ALT','DETACH_PICTURE_CONTAINER','_forcedBattleSys','atbActive','updatePositionCoreEngineShakeHorz','_playtestF7Looping','uFiZJ','Ohtlg','textBaseline','cEQCf','%1\x0a','ceil','BTestItems','_commandList','CallHandlerJS','DrawItemBackgroundJS','BTB','drawIconBySize','hasEncryptedImages','isKeyItem','stringKeyMap','cHlLb','OUTBOUNCE','drawCharacter','innerWidth','iconWidth','KeyItemProtect','platform','kcSJA','_optionsWindow','CrisisRate','_statusParamsWindow','setBattleSystem','OhVdb','DigitGroupingExText','etypeId','updateTransform','style','CTRL','activate','EAozP','PA1','MAXHP','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','Window_MapName_refresh','drawBackground','ActorMPColor','actor','parseForcedGameTroopSettingsCoreEngine','Param','RFaWo','sv_actors','updatePositionCoreEngineShakeVert','Weapon-%1-%2','isPressed','toUpperCase','show','onInputBannedWords','CEV','F21','UXRiN','_mapNameWindow','uiAreaHeight','SceneManager_onKeyDown','wmTGv','Window_Base_drawCharacter','_blank','OUTCIRC','goldWindowRect','charCode','OptionsRect','targetScaleY','Game_Troop_setup','Game_Picture_calcEasing','TRG','DWLQQ','Window_Base_createTextState','round','FontShadows','tpGaugeColor2','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','sellWindowRect','gainGold','_onError','Spriteset_Battle_createEnemies','Input_pollGamepads','setLastPluginCommandInterpreter','hit','KBPCd','Y:\x20%1','MMRlp','Window_StatusBase_drawActorSimpleStatus','and\x20add\x20it\x20onto\x20this\x20one.','playOk','EditBgType','canEquip','paramMaxJS','_targetOffsetX','updatePositionCoreEngineShakeRand','ParseTilesetNotetags','SParamVocab6','SkillMenu','FKgdJ','createDimmerSprite','(\x5cd+)>','isBottomButtonMode','actorWindowRect','INOUTSINE','264xSmYvv','Window_Selectable_cursorDown','ControllerMatches','buttonAssistWindowSideRect','drawSegment','vjnHR','numberShowButton','Window_EquipItem_isEnabled','BACKSPACE','_currentBgm','buttonAssistKey4','Abbreviation','TextJS','home','ShowDevTools','XParamVocab9','textColor','_timerSprite','mainAreaTopSideButtonLayout','_listWindow','ColorTPCost','setupValueFont','QoL','ForceNoPlayTest','_upArrowSprite','numRepeats','【%1】\x0a','_logWindow','GoldFontSize','getBackgroundOpacity','Scene_Shop_create','repositionCancelButtonSideButtonLayout','adjustSprite','BackOpacity','prototype','OIHmd','WIN_ICO_CLEAR','isLoopVertical','EditRect','CommandBgType','WIN_OEM_FINISH','IconXParam6','xparamRate1','setupFont','deathColor','SVnPW','isAlive','vAHmP','processTouch','GoldMax','left','MAX_SAFE_INTEGER','members','_realScale','FmhOM','Sprite_Gauge_gaugeRate','_list','yScrollLinkedOffset','mainAreaHeight','DOLLAR','paramValueByName','SubfolderParse','endAnimation','ScaleX','_dimmerSprite','framebuffer','WIN_OEM_BACKTAB','writeText','restore','updateMove','iBMiT','CategoryRect','_buttonAssistWindow','_createInternalTextures','\x20Origin:\x20%1','BEQFm','setCoreEngineUpdateWindowBg','woogg','application/json','_targetScaleY','_forcedTroopView','HcRuX','hpColor','xparamFlatBonus','jwtik','JCSnQ','AfMyG','getControllerInputButtonMatch','_digitGroupingEx','applyEasing','optionsWindowRect','168NfVfin','DigitGroupingStandardText','State-%1-%2','F10','randomInt','pitch','ARRAYFUNC','test','batch','powerDownColor','IconParam6','ButtonAssist','xkYPS','BgType','PTNuA','_inputSpecialKeyCode','%1/','mainFontSize','MainMenu','_onKeyPress','DlcKr','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','Window_Base_drawText','Sprite_Button_updateOpacity','hbZfI','BattleSystem','scrollDown','startAnimation','Scene_Battle_createSpritesetFix','buttonAssistOffset5','bGQxc','createSpriteset','inBattle','createMenuButton','LkUmp','setBackgroundType','EXR','MEV','Kghyk','Dbhif','StatusParamsRect','VisuMZ_2_BattleSystemBTB','IconSParam6','setTopRow','wtypeId','onInputOk','_commonEventLayers','mmImL','Window_Selectable_drawBackgroundRect','setupNewGame','IAweH','Window_Base_drawFace','mpColor','makeInputButtonString','_origin','setSize','CMVDO','concat','UeQBp','tpCostColor','NOCGj','xScrollLinkedOffset','meVolume','DummyRect','》Comment《\x0a%1\x0a','alphabetic','ItemRect','jlhqR','opacity','operand','NUMPAD3','processCursorHomeEndTrigger','paramchangeTextColor','msFhu','INOUTQUAD','FqctJ','createPageButtons','EVAL','Scene_Boot_onDatabaseLoaded','FadeSpeed','jzBgU','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','Bitmap_drawTextOutline','_pauseSignSprite','paramPlusJS','dimColor1','ALbtE','alwaysDash','drawGoldItemStyle','zgGzZ','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ETB','StatusParamsBgType','Game_Picture_y','Scene_Boot_startNormalGame','Smooth','_onLoad','initDigitGrouping','BattleManager_update','OPEN_PAREN','canUse','Speed','vertJS','levelUp','maxTp','_onKeyDown','subtitle','gaugeRate','resetFontSettings','PixelateImageRendering','_setupEventHandlers','GLFWS','WIN_OEM_CUSEL','systemColor','isEnemy','requestFauxAnimation','refresh','getLastUsedGamepadType','_muteSound','\x0a\x0a\x0a\x0a\x0a','isTriggered','gHlAa','catchLoadError','allowShiftScrolling','abBDw','%1〘End\x20Choice\x20Selection〙%1','enemy','Graphics_defaultStretchMode','Bitmap_gradientFillRect','battlebacks2','buttonAssistOffset4','Spriteset_Base_updatePosition','OWBLE','isSmartEventCollisionOn','registerCommand','KeyboardInput','ItemStyle','hPQbM','PAUSE','consumeItem','exp','_clickHandler','Window_NameInput_cursorDown','_stored_gaugeBackColor','removeChild','CThEA','Game_Actor_paramBase','useDigitGrouping','faces','wEhuW','yDisf','_animationQueue','min','SParamVocab9','missed','_scene','updateWaitMode','drawFace','IconParam1','sv_enemies','WIN_OEM_PA1','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setTargetAnchor','goto','SmartEventCollisionPriority','Scene_Map_createSpriteset_detach','drawActorSimpleStatus','destroyCoreEngineMarkedBitmaps','XParamVocab3','PLAY','IconXParam7','_pointAnimationQueue','Game_Interpreter_command355','ExportAllMapText','zqjFK','Input_setupEventHandlers','updateLastTarget','IconXParam3','hehOO','myCMV','siGYx','IbhdW','titleCommandWindow','buttonAreaHeight','rwAkh','Sprite_destroy','setLastGamepadUsed','zsQHu','IconParam3','VOLUME_MUTE','Linear','BottomHelp','OUTEXPO','INSERT','ColorDeath','DetachBattlePictureContainer','kDkih','cursorPagedown','LoadError','backspace','_stored_mpGaugeColor2','initButtonHidden','NONCONVERT','\x5c}❪SHIFT❫\x5c{','rheVa','AGI','ParseClassNotetags','setHome','qaUtL','ScaleY','GXqjz','CancelText','DefaultMode','pictureId','_startLoading','Map%1.json','STENCIL_TEST','PIPE','textWidth','default','stretch','WbmSv','paramName','EVA','NUM','_centerElementCoreEngine','fadeSpeed','PictureID','%1〘Choice\x20Cancel〙%1','eTJeb','onload','RpKjv','_destroyInternalTextures','buttonAssistText1','WIN_OEM_FJ_TOUROKU','Opacity','BoxMargin','VZxiq','isAnimationOffsetXMirrored','GBZFo','centerSprite','_baseSprite','reservePlayTestNewGameCommonEvent','changeClass','targetBackOpacity','Scene_Map_createSpriteset','_onceParallelInterpreters','F18','PDR','_currentMap','setSkill','createTroopNote','evaded','cancel','animations','commandWindowRect','MINUS','disable','cursorLeft','DELETE','EnableMasking','ShowButtons','setupButtonImage','1.4.4','createBuffer','NUMPAD9','isCursorMovable','_viewportSize','param','OPEN_CURLY_BRACKET','Scene_Options_create','tilesets','sparamFlatBonus','Name','AntiZoomPictures','tileHeight','code','valueOutlineColor','updateEffekseer','Scene_Map_createSpritesetFix','SystemSetWindowPadding','lqvkV','setAction','Window_Base_update','split','VpmfB','_shakeSpeed','ENrrt','createTitleButtons','_targetY','jwpbW','Window_NumberInput_processDigitChange','setMute','successRate','categoryWindowRect','isCancelled','_url','onMoveEnd','format','Window_ShopSell_isEnabled','STRUCT','processBack','tab','Graphics_centerElement','setupCustomRateCoreEngine','Sprite_Picture_loadBitmap','_cacheScaleY','CLEAR','markCoreEngineModified','JJuYA','expRate','pendingColor','Game_Action_numRepeats','lXKjG','_buttonType','_refreshArrows','sparam','nickname','_effectsContainer','index','isFullDocumentTitle','playBuzzer','ApplyEasing','SceneManager_initialize','Upper\x20Left','mpGaugeColor1','Origin','_makeFontNameText','OFGjG','Scene_Battle_update','Input_update','Scene_Battle_createCancelButton','HASH','Scene_Name_create','VzCko','UBhDk','PositionY','LTyZt','vertical','zpEjv','EISU','send','vIcsJ','sSizO','Game_Action_updateLastTarget','uUjAt','Match','responseText','Scene_Equip_create','_shakePower','isOpenAndActive','_drawTextBody','Scene_Base_terminateAnimationClearBugFix','TextManager_param','Unnamed','wholeDuration','gradientFillRect','CustomParamNames','TextCodeClassNames','bgsVolume','buttonAssistKey%1','SParameterFormula','_backSprite1','Scene_Base_create','itemPadding','WIN_OEM_JUMP','DetachMapPictureContainer','isClosed','NoTileShadows','titles1','makeActionList','DebugConsoleLastControllerID','KaLlG','KEEP','open','AutoScrollLockY','ExportAllTroopText','targetY','Bitmap_initialize','gaugeBackColor','SceneManager_exit','lJBWZ','applyForcedGameTroopSettingsCoreEngine','command111','move','SwitchToggleRange','nNOBX','zgtey','repositionEnemiesByResolution','WdFdP','makeCommandList','createPointAnimation','setup','initialLevel','drawCircle','makeEncounterCount','targetContentsOpacity','filters','ghCpN','ENTER','random','owlTT','_movementWholeDuration','_active','NUMPAD0','updateClose','scaleMode','_pictureContainer','playOnceParallelInterpreter','mJwZh','characters','scrollUp','_drawTextOutline','currentExp','learnings','mirror','active','nLVip','isItem','pictures','command105','system','Version','StartID','LATIN1','transform','drawItem','isNormalPriority','Window_NameInput_cursorPageup','ColorMPCost','gmbAw','QwertyLayout','SLASH','uRRbJ','isNwjs','WIN_OEM_FJ_JISHO','DOUBLE_QUOTE','BxjCN','TNKBS','UQcDY','Layer','createButtonAssistWindow','NVpPJ','buyWindowRect','trim','writeFile','processAlwaysEscape','stypeId','_centerCameraCheck','defaultInputMode','wehzG','NwvHA','updateOnceParallelInterpreters','LEFT','addWindow','_tilemap','xparamPlus1','overrideMimeType','mainAreaTop','Plus1','GroupDigits','smooth','SUBTRACT','paramRateJS','blendFunc','_baseTexture','Window','aAExp','SEMICOLON','stencilFunc','mcWNJ','mojkM','shift','Scene_Item_create','Scene_Map_updateMain','offsetY','DJcBD','nBIzy','Window_Selectable_cursorUp','ILMqW','Settings','statusParamsWindowRect','alignBottom','right','playBgs','refreshWithTextCodeSupport','dizPw','centerX','displayName','playCursorSound','parallaxes','maxGold','_customModified','setHandler','CRI','BfFhz','calcEasing','EUqEe','eEWkv','enableDigitGrouping','SellRect','lNwGX','terminate','IconSParam2','_duration','_cancelButton','CustomParam','XEwfR','removeAllPointAnimations','strokeRect','substring','setCommonEvent','MIN_SAFE_INTEGER','resize','Game_Map_scrollLeft','SideButtons','BuyBgType','_colorCache','Bitmap_strokeRect','VOLUME_UP','F11','createCustomParameter','QUOTE','IconSParam8','makeTargetSprites','DimColor1','outlineColorDmg','processKeyboardHandling','replace','setFrame','ExtJS','getLastPluginCommandInterpreter','EAGdy','ShowItemBackground','ColorMPGauge2','includes','INOUTCIRC','ExportString','PHA','scaleX','pixelated','pages','CXdbW','integer','Sprite_Battler_startMove','_screenY','CommandWidth','sparamRate1','TYWpS','EjRSZ','_changingClass','_slotWindow','oGQdG','doesNameContainBannedWords','Oerwy','buttonAssistText2','KeySHIFT','smoothSelect','PictureCoordinatesMode','_shouldPreventDefault','centerCameraCheckData','SParamVocab8','_mp','META','JAtwX','DataManager_setupNewGame','fNRhP','Spriteset_Base_isAnimationPlaying','SystemLoadAudio','onNameOk','WIN_OEM_AUTO','cancelShowButton','rLnlx','initBasic','isPhysical','reserveNewGameCommonEvent','_gamepadWait','IconParam4','Window_Gold_refresh','buttonAssistCancel','ParseAllNotetags','makeAutoBattleActions','top','IconXParam1','F23','resetTextColor','filter','〘Common\x20Event\x20%1:\x20%2〙\x20Start','faceHeight','font','BattleManager_processEscape','Game_Interpreter_updateWaitMode','Rate','showPointAnimations','checkSmartEventCollision','isWindowMaskingEnabled','valueOutlineWidth','buttonAssistKey3','OptionsMenu','WLepc','fZDeD','Game_Action_itemHit','ESC','SceneManager_isGameActive','MFYhn','buttonAssistWindowRect','updateDocumentTitle','hmxrX','isTpb','layoutSettings','isDying','DefaultStyle','bitmapWidth','end','Title','windowRect','center','loadIconBitmap','oKyVG','_editWindow','CLOSE_CURLY_BRACKET','loadGameImagesCoreEngine','Game_Action_setAttack','NEAREST','ColorPowerDown','backgroundBitmap','initMembersCoreEngine','_rate','Flat1','getLevel','isSceneMap','traitObjects','ActorTPColor','isAnimationPlaying','setActionState','xparamFlat1','PositionX','version','ParseEnemyNotetags','loadSystem','MRF','_repositioned','Icon','EndingID','mainCommandWidth','xYRGa','HIT','bttoA','XParamVocab8','AllTroops','_stored_mpCostColor','drawActorClass','NUMPAD1','isGamepadTriggered','evaluate','process_VisuMZ_CoreEngine_jsQuickFunctions','REC','jSfRA','outbounce','paramMax','aaaqe','processKeyboardHome','MGbKI','%1〘Choice\x20%2〙\x20%3%1','showDevTools','targets','CLOSE_PAREN','GoldBgType','option','waiting','itemBackColor1','wait','INEXPO','clear','text%1','SystemLoadImages','MCR','VubBD','isSideView','fillRect','initCoreEasing','level','kOgEv','_currentBgs','max','END','connected','Max','expParams','CTB','_balloonQueue','EQUAL','SParamVocab7','displayY','Window_NameInput_cursorPagedown','drawText','dimColor2','addOnceParallelInterpreter','ZTzhD','_targetOffsetY','pageup','_closing','_statusEquipWindow','call','_isPlaytest','HelpRect','PcXmB','clipboard','GoldIcon','EquipMenu','Page','UpdatePictureCoordinates','DATABASE','sparamPlusJS','Location','Show\x20Scrolling\x20Text\x20Script\x20Error','updatePictureCoordinates','Input_clear','OpenURL','JktvP','OkText','setMoveEasingType','_updateFilterArea','titles2','Scene_Boot_updateDocumentTitle','iconHeight','isPlaying','up2','INBOUNCE','updatePictureAntiZoom','updateOrigin','pURoq','setupCoreEngine','bnIAa','OlhLL','Spriteset_Base_update','OutlineColorDmg','ygDIV','Conditional\x20Branch\x20Script\x20Error','SCALE_MODES','boxWidth','_data','DBErr','ILeDB','ARRAYJSON','initCoreEngine','_moveEasingType','([\x5c+\x5c-]\x5cd+)>','updateCoreEasing','updateOpen','vrusk','McOTg','Window_Selectable_itemRect','setSideView','ListBgType','fillText','VisuMZ_2_BattleSystemPTB','Control\x20Variables\x20Script\x20Error','loadWindowskin','GoldChange','listWindowRect','ParseItemNotetags','RjGyw','DummyBgType','onKeyDown','horizontal','PictureEasingType','RepositionEnemies130','indexOf','VisuMZ_2_BattleSystemOTB','isActor','targetX','onXhrError','KeyTAB','wmwkv','_stored_tpCostColor','openingSpeed','skipBranch','WIN_OEM_FJ_ROYA','_troopId','Duration','Game_Map_setup','zQGLI','normalColor','BTestWeapons','ikdAr','_colorTone','_stored_expGaugeColor2','isMapScrollLinked','CIAHl','abs','FontSize','ALoMt','Game_Party_consumeItem','Game_Picture_scaleY','DigitGroupingGaugeSprites','subject','buttonY','zExfG','loadTitle2','getInputButtonString','ParamName','RtTyj','drawTextTopAligned','createKeyJS','VOLUME_DOWN','SkillTypeRect','usVjd','NUMPAD7','fontSize','alpha','retrieveFauxAnimation','_cacheScaleX','ParamChange','Scene_Title_drawGameTitle','asin','updateShadow','AkFIj','drawActorLevel','lkUfy','blockWidth','alQxE','DigitGroupingDamageSprites','scrollRight','IXHyX','SaveMenu','_playTestFastMode','apply','playMiss','PTB','pointX','F20','_lastY','processMoveCommand','_width','slmaS','_offsetX','espTo','COMMA','ExportCurMapText','isSceneBattle','qrVAS','isBottomHelpMode','turn','win32','drawTextEx','buttonAssistText5','IconSParam4','textSizeEx','paramWidth','contentsBack','SlotBgType','isGamepadButtonPressed','sAZFV','JBwiH','buttonAssistOk','DECIMAL','drawBackgroundRect','F12','2DSXPKx','wgSGa','ColorPowerUp','Window_NameInput_initialize','WindowLayer_render','pictureButtons','SEPARATOR','description','Scene_MenuBase_createBackground','xparam','RepositionActors','IconSParam7','_pictureCoordinatesMode','wNvvH','_stored_systemColor','Scene_GameEnd_createBackground','traitsPi','repeat','2655415txlBaJ','Game_Temp_initialize','arqgC','oWarf','BasicParameterFormula','onClick','maxBattleMembers','volume','Game_Event_start','ctrl','raUpD','src','BlendMode','F14','evade','parameters','X:\x20%1','XParamVocab0','GCmwS','ScreenShake','targetOpacity','〘Common\x20Event\x20%1:\x20%2〙\x20End','IqjqY','wOczi','gEqee','_shakeDuration','mute','_bitmap','LhPJA','cHjTG','RIGHT','Window_NumberInput_start','CONVERT','_lastOrigin','ARRAYNUM','Iqzzs','hide','kSUHE','Scene_MenuBase_mainAreaHeight','isArrowPressed','isAnimationForEach','tileWidth','resetBattleSystem','_coreEasingType','StatusEquipBgType','ARRAYEVAL','_lastX','loadTitle1','WIN_OEM_ATTN','Game_Interpreter_PluginCommand','filterArea','_clientArea','ActorRect','createCommandWindow','_skillTypeWindow','GfMIi','RhEyY','ShopMenu','jnCFh','helpAreaTopSideButtonLayout','EnableNameInput','_inputWindow','CAPSLOCK','endAction','Script\x20Call\x20Error','AnimationID','_stored_mpGaugeColor1','EGIRS','startShake','RevertPreserveNumbers','Scene_Menu_create','wthcV','VariableEvalReference','isCollidedWithEvents','_hideButtons','bitmapHeight','processHandling','YzBRU','changeTextColor','button','get','sqrt','animationShouldMirror','Type','yozeB','centerY','StatusBgType','maxCols','reserveCommonEvent','font-smooth','bscUx','usyWZ','canAttack','adjustPictureAntiZoom','maxTurns','MeoFW','Tilemap_addShadow','Game_Picture_x','GoldOverlap','calcCoreEasing','makeDeepCopy','ValueJS','DisplayedParams','worldTransform','CreateBattleSystemID','_buyWindow','TextFmt','kbqhA','_categoryWindow','PRINTSCREEN','getControllerInputButtonString','dashToggle','hzqqH','contains','AudioChangeBgsVolume','Padding','Input_onKeyDown','0.00','TitlePicButtons','attackSkillId','data/','match','_actorWindow','animationBaseDelay','NqEWY','allTiles','textHeight','Graphics_printError','showFauxAnimations','INBACK','scrollLeft','hideButtonFromView','initVisuMZCoreEngine','rTarV','54096JbyEQv','MRG','originalJS','RiVwQ','ParseWeaponNotetags','_CoreEngineSettings','HRG','SystemSetSideView','CustomParamIcons','_inputString','updateData','process_VisuMZ_CoreEngine_ControllerButtons','ExtractStrFromTroop','_number','buttonAssistOffset%1','openURL','buttonAssistOffset3','_stored_hpGaugeColor2','map','WRxJu','Sprite_AnimationMV_updatePosition','isNumpadPressed','_itemWindow','MapNameTextCode','GetParamIcon','drawValue','_lastCommandSymbol','RFhCh','_target','createPointAnimationTargets','ctGaugeColor1','apNsA','buttonAssistText%1','processTouchModernControls','contentsOpacity','globalAlpha','targetSpritePosition','VssbV','terms','buttonAssistKey1','GoldRect','snapForBackground','touchUI','retreat','(\x5cd+\x5c.?\x5cd+)>','ColorSystem','oExdl','rgvJi','refreshActor','enemies','isPointAnimationPlaying','OutlineColor','ZLHrK','areButtonsOutsideMainUI','updateDashToggle','processCursorMoveModernControls','sparamFlatJS','fHNQL','EeNki','INOUTELASTIC','WQLXn','offsetX','ZERO','_goldWindow','isMenuButtonAssistEnabled','WIN_OEM_ENLW','WCTZE','sparamPlus2','RjktQ','hMYMC','playTestF7','ItemBackColor1','DigitGroupingLocale','ItemBgType','toFixed','openness','Scene_Unlisted','levelUpRecovery','enableDigitGroupingEx','command355','IconSParam3','ColorCTGauge2','SUaFQ','rIESb','_opening','3491868QcrKUI','setupCoreEasing','makeFontBigger','BaseTexture','_fauxAnimationSprites','clearForcedGameTroopSettingsCoreEngine','Plus2','advanced','BattleManager_checkSubstitute','vnLMN','isPlaytest','endBattlerActions','BTestAddedQuantity','moveCancelButtonSideButtonLayout','FINAL','yCAAS','Renderer','LvExpGauge','Window_Base_drawIcon','cursorPageup','original','_stored_powerDownColor','paramY','Enemy','item','Scene_Map_initialize','uiAreaWidth','MDF','setActorHomeRepositioned','setEasingType','renderNoMask','dEbbJ','_stored_tpGaugeColor2','IconParam7','sparamRate2','buttonAssistText3','_dummyWindow','updatePlayTestF7','ImgLoad','RepositionEnemies','Sprite_Gauge_currentValue','MenuBg','getLastGamepadUsed','DisplayLockY','pagedownShowButton','AccuracyBoost','child_process','FdOLH','INQUART','ActorBgType','bZVaM','IconSParam5','CustomParamAbb','jDvct','tqSon','cEJsN','owyNl','%1%2','updateSmoothScroll','ProfileBgType','getCoreEngineScreenShakeStyle','Window_NameInput_refresh','Sprite_Animation_setViewport','SlotRect','_storedMapText','mainAreaHeightSideButtonLayout','BQvoq','STB','GameEnd','_battlerName','getPointAnimationLayer','animationNextDelay','getGamepads','gufBR','BepWY','log','vlLxl','Bitmap_blt','Keyboard','TuAug','Game_Picture_move','cos','xparamPlus2','down','ARRAYSTR','destroy','EscapeAlways','none','randomJS','F15','bpTdQ','select','INCUBIC','CNnSp','normal','RequireFocus','_anchor','erasePicture','DimColor2','OUTQUAD','sin','img/%1/','HOME','_startDecrypting','mapId','deselect','command122','dropItems','wkwda','keypress','rPnbK','SwitchRandomizeRange','Game_BattlerBase_initMembers','ParseStateNotetags','toString','setAnchor','jsonToZip','_backSprite2','catchNormalError','playEscape','addLoadListener','_stored_crisisColor','processKeyboardDelete','_height','playLoad','WIN_OEM_WSCTRL','ColorMPGauge1','equips','1836FPlBgC','_fauxAnimationQueue','OUTELASTIC','DNCVd','addCommand','Scene_MenuBase_helpAreaTop','children','processKeyboardDigitChange','isMaxLevel','_showDevTools','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','_hideTileShadows','SystemSetBattleSystem','LoadMenu','sGipX','ConvertParams','vPnAx','Manual','sparamRateJS','Sprite_Actor_setActorHome','axes','processCursorMove','bitmap','charAt','battlebacks1','itemHitImprovedAccuracy','drawGauge','dCaEG','Bitmap_drawText','FTB','Game_Event_isCollidedWithEvents','IconSParam0','remove','windowOpacity','_windowskin','OUTSINE'];_0xf6fb=function(){return _0x149d5b;};return _0xf6fb();}
//=============================================================================
// VisuStella MZ - Bright Effects
// VisuMZ_2_BrightEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BrightEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BrightEffects = VisuMZ.BrightEffects || {};
VisuMZ.BrightEffects.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.06] [BrightEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Bright_Effects_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * This RPG Maker MZ plugin allows you to add various bright effects to your
 * game's maps and battle system. These effects can make the game appear more
 * vivid, light, and gives you control over the color settings of a particular
 * map to make a more distinct feeling, too. The bright effects can be changed
 * midway through events in both maps and battles, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * A Bloom filter effect that can help soften the feel of a map by giving
 *   objects on the screen a slight hazy glow.
 * * Godrays can be used to show animated sunlight coming down from the sky
 *   above.
 * * The Color Adjustment filter allows you to alter the brightness, contrast,
 *   and saturation levels of your maps and battles.
 * * Plugin Commands that allow you to adjust these settings on the go.
 * * Notetags for maps to alter the Bloom, Godray, and Color Adjustments
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
 * * Pixi JS Filters*
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 * 
 * *Note* You can download the Pixi JS Filters plugin library from the below
 * URL or from the Action Sequence Impact product page. Install it as a
 * Tier 0 plugin.
 * 
 * *Note2* Pixi JS Filters perform differently on different machines/devices.
 * Please understand that this is outside of VisuStella's control.
 * 
 * URL: https://filters.pixijs.download/v3.1.0/pixi-filters.js
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * New Effects
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Bloom
 * 
 * This filter puts a faint (or large) glow around lighter-colored objects on
 * the map to give them a softer, hazy, brighter feeling.
 * 
 * Properties:
 *
 * Scale: To adjust the strength of the bloom. Higher values is more
 * intense brightness.
 *
 * Brightness: The brightness, lower value is more subtle brightness, higher
 * value is blown-out.
 *
 * Threshold: Defines how bright a color needs to be to affect bloom.
 *
 * ---
 *
 * Godray
 * 
 * The Godray filter puts down rays of light coming from the sky at an angle.
 * This is often used to represent sunlight peaking from above the clouds.
 * 
 * Properties:
 *
 * Visible: If on, the godrays will be visible by default. If off, they won't.
 *
 * Speed: The speed at which the light flickers. Lower for slower rate.
 * Higher for faster speeds.
 *
 * Gain: General intensity of the effect.
 *
 * Lacunarity: The density of the fractal noise.
 *
 * Angle: The angle/light-source direction of the rays.
 *
 * ---
 *
 * Color Adjustment
 * 
 * The Color Adjustment filter allows you to control the colors on the screen
 * to be more/less bright, contrast more/less, and more/less saturated.
 * 
 * Properties:
 *
 * Brightness: Adjusts the overall brightness of the screen. Use lower numbers
 * to make it darker and higher numbers to increase the brightness.
 *
 * Contrast: Increases the separation between dark and bright. Darker colors
 * become darker. Lighter colors become lighter. Increase this number to make
 * the effect more intense or decrease it to lessen it.
 *
 * Saturate: Adjusts the intensity of color on the screen. User higher numbers
 * to make colors more intense and lower numbers to make it less.
 *
 * ---
 * 
 * Tilt Shift
 * 
 * The Tilt Shift filter creates a blur at the upper and lower edges of the
 * screen with varying degrees of pixelation blur and gradient blur.
 * 
 * Properties:
 * 
 * Pixel Blur: What is the default pixel blur amount for tilt shift? Smaller
 * values mean less blur. Higher values mean more blur.
 * 
 * Gradient Blur: What is the default gradient blur amount for tilt shift?
 * Smaller values mean less gradient. Higher values mean more gradient.
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
 * VisuMZ_1_OptionsCore
 * 
 * As of the VisuStella MZ Options Core v1.10 update, both the Bright Effects
 * and Horror Effects plugins will be affected by the "Special Effects" option
 * found under the Options Core's General Settings. If the "Special Effects"
 * option is set to OFF, then the filter effects applied by those plugins will
 * also be disabled. They will be reenabled when the option is set back to ON.
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
 * === Bloom-Related Notetags ===
 * 
 * ---
 *
 * <Bloom Scale: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes the bloom scale to x for map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less bloom
 *   - Higher - More bloom
 *
 * ---
 *
 * <Bloom Brightness: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes the bloom brightness to x for map/battle
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Bloom Threshold: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes the bloom threshold to x for map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less picky
 *   - Higher - More picky
 *
 * ---
 *
 * <Bloom Horz Scale: x to y>
 * <Bloom Vert Scale: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Sets an adjusting scale when traveling left to right on the map
 *   (Horz) or up to down on the map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less bloom
 *   - Higher - More bloom
 *
 * ---
 *
 * <Bloom Horz Brightness: x to y>
 * <Bloom Vert Brightness: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Sets an adjusting brightness when traveling left to right on the
 *   map (Horz) or up to down on the map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Bloom Horz Threshold: x to y>
 * <Bloom Vert Threshold: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Sets an adjusting threshold when traveling left to right on the
 *   map (Horz) or up to down on the map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less picky
 *   - Higher - More picky
 *
 * ---
 * 
 * === Godray-Related Notetags ===
 * 
 * ---
 *
 * <Godray>
 * <No Godray>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes if there will be a godray on the map/battle regardless of the
 *   default settings in the plugin parameters.
 *
 * ---
 *
 * <Godray Speed: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the flickering speed of the rays.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Slower
 *   - Higher - Faster
 *
 * ---
 *
 * <Godray Gain: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the gain/intensity of the rays.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Lighter
 *   - Higher - Intense
 *
 * ---
 *
 * <Godray Lacunarity: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the lacunarity/density of the rays.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less dense
 *   - Higher - More dense
 *
 * ---
 *
 * <Godray Angle: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the angle of the rays.
 * - Replace 'x' with a number to represent the value. Use a negative or
 *   positive integer value.
 *   - Negative - Coming from the left
 *   - Positive - Coming from the right
 *
 * ---
 *
 * <Godray Horz Speed: x to y>
 * <Godray Vert Speed: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray speed going left to right on a map (Horz) or up
 *   to down on a map (Vert). 
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Slower
 *   - Higher - Faster
 *
 * ---
 *
 * <Godray Horz Gain: x to y>
 * <Godray Vert Gain: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray gain going left to right on a map (Horz) or up to
 *   down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Lighter
 *   - Higher - Intense
 *
 * ---
 *
 * <Godray Horz Lacunarity: x to y>
 * <Godray Vert Lacunarity: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray lacunarity going left to right on a map (Horz) or
 *   up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less dense
 *   - Higher - More dense
 *
 * ---
 *
 * <Godray Horz Angle: x to y>
 * <Godray Vert Angle: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray angle going left to right on a map (Horz) or up
 *   to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use a negative or
 *   positive integer values.
 *   - Negative - Coming from the left
 *   - Positive - Coming from the right
 *
 * ---
 * 
 * === Color Adjust-Related Notetags ===
 * 
 * ---
 *
 * <Color Adjust Brightness: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Alters the screen brightness for the map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Color Adjust Contrast: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Adjusts the screen contrast for the map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less contrast
 *   - Higher - More contrast
 *
 * ---
 *
 * <Color Adjust Saturate: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Adjusts the screen saturation for the map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Color Adjust Horz Brightness: x to y>
 * <Color Adjust Vert Brightness: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Alters the screen brightness when moving left to right on a map
 *   (Horz) or up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Color Adjust Horz Contrast: x to y>
 * <Color Adjust Vert Contrast: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts the screen contrast when moving left to right on a map
 *   (Horz) or up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less contrast
 *   - Higher - More contrast
 *
 * ---
 *
 * <Color Adjust Horz Saturate: x to y>
 * <Color Adjust Vert Saturate: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts the screen saturation when moving left to right on a map
 *   (Horz) or up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less intensity
 *   - Higher - More intensity
 *
 * ---
 * 
 * === Tilt Shift Notetags ===
 * 
 * ---
 * 
 * <Tilt Shift Pixel Blur: x>
 * 
 * - Used for: Map Notetags and Troop Names
 * - Adjusts the tilt shift filter's pixel blur amount for the map/battle.
 * - Replace 'x' with a number to represent the blur intensity.
 *   - Lower = less blur
 *   - Higher = more blur
 * 
 * ---
 * 
 * <Tilt Shift Gradient Blur: x>
 * 
 * - Used for: Map Notetags and Troop Names
 * - Adjusts the tilt shift filter's gradient blur amount for the map/battle.
 * - Replace 'x' with a number to represent the gradient blur distance.
 *   - Lower = less gradient
 *   - Higher = more gradient
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
 * === Bloom Plugin Commands ===
 * 
 * ---
 *
 * Bloom: Change Settings
 * - Change the Bloom filter settings for the screen.
 *
 *   Bloom Scale:
 *   - Change bloom scale for the screen.
 *
 *   Bloom Brightness:
 *   - Change bloom brightness for the screen.
 *
 *   Bloom Threshold:
 *   - Change bloom threshold for the screen.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 *
 * ---
 *
 * Bloom: Reset
 * - Reset the Bloom filter settings for the settings found in the Plugin
 *   Parameters or map notetags.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the reset to occur.
 *
 * ---
 * 
 * === Godray Plugin Commands ===
 * 
 * ---
 *
 * Godray: Change Settings
 * - Change the Godray filter settings for the screen.
 *
 *   Visible?:
 *   - Show godrays on the screen?
 *   - Visibility changes are immediate.
 *
 *   Godray Speed:
 *   - Change godray speed for the screen.
 *
 *   Godray Gain:
 *   - Change godray gain for the screen.
 *
 *   Godray Lacunarity:
 *   - Change godray lacunarity for the screen.
 *
 *   Godray Angle:
 *   - Change godray angle for the screen.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 *   - Visibility changes are immediate.
 *
 * ---
 *
 * Godray: Reset
 * - Reset the Godray filter settings for the settings found in the Plugin
 *   Parameters or map notetags.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the reset to occur.
 *   - Visibility changes are immediate.
 *
 * ---
 * 
 * === Color Adjust Plugin Commands ===
 * 
 * ---
 *
 * Color Adjust: Change Settings
 * - Change the Color Adjustment filter settings for the screen.
 *
 *   Adjust Brightness:
 *   - Change color adjust brightness for the screen.
 *
 *   Adjust Contrast:
 *   - Change color adjust contrast for the screen.
 *
 *   Adjust Saturation:
 *   - Change color adjust saturation for the screen.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 *
 * ---
 *
 * Color Adjust: Reset
 * - Reset the Color Adjustment filter settings for the settings found in the
 *   Plugin Parameters or map notetags.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the reset to occur.
 *
 * ---
 * 
 * === Tilt Shift Plugin Commands ===
 * 
 * ---
 * 
 * Tilt Shift: Change Settings
 * - Change the Tilt Shift filter settings for the screen.
 * 
 *   Pixel Blur:
 *   - What is the default pixel blur amount for tilt shift?
 *   - Smaller = less blur. Higher = more blur.
 * 
 *   Gradient Blur:
 *   - What is the default gradient blur amount for tilt shift?
 *   - Smaller = less gradient. Higher = more gradient.
 * 
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 * 
 * ---
 * 
 * Tilt Shift: Reset
 * - Reset the Tilt Shift filter settings for the settings found in the
 *   Plugin Parameters or map notetags.
 * 
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 * 
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 * 
 * This section is for the general plugin parameter settings.
 * 
 * ---
 * 
 * General
 * 
 *   Apply Base-Only?
 *   - Base-Only excludes pictures, timers, and weather.
 *   - Whole includes the above.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Bloom Settings
 * ============================================================================
 *
 * There are two versions of these plugin parameters. One of them are for the
 * Map Defaults and the other is for the Battle Defaults. These settings are
 * applied to the map and battle scenes respectively and will serve as the
 * stock setting when no map notetags, troop name tags, or Plugin Commands have
 * been used to alter them.
 *
 * ---
 *
 * Bloom Settings
 * 
 *   Bloom Scale:
 *   - Default bloom scale for the screen unless changed through tags.
 * 
 *   Bloom Brightness:
 *   - Default bloom brightness for the screen unless changed through tags.
 * 
 *   Bloom Threshold:
 *   - Default bloom threshold for the screen unless changed through tags.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Godray Settings
 * ============================================================================
 *
 * There are two versions of these plugin parameters. One of them are for the
 * Map Defaults and the other is for the Battle Defaults. These settings are
 * applied to the map and battle scenes respectively and will serve as the
 * stock setting when no map notetags, troop name tags, or Plugin Commands have
 * been used to alter them.
 *
 * ---
 *
 * Godray Settings
 * 
 *   Default Visible?:
 *   - Show godrays on all screens by default unless changed through tags?
 * 
 *   Godray Speed:
 *   - Default godray speed for all screens unless changed through tags.
 * 
 *   Godray Gain:
 *   - Default godray gain for all screens unless changed through tags.
 * 
 *   Godray Lacunarity:
 *   - Default godray lacunarity for all screens unless changed through tags.
 * 
 *   Godray Angle:
 *   - Default godray angle for all screens unless changed through tags.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Adjust Settings
 * ============================================================================
 *
 * There are two versions of these plugin parameters. One of them are for the
 * Map Defaults and the other is for the Battle Defaults. These settings are
 * applied to the map and battle scenes respectively and will serve as the
 * stock setting when no map notetags, troop name tags, or Plugin Commands have
 * been used to alter them.
 *
 * ---
 *
 * Color Adjust Settings
 * 
 *   Adjust Brightness:
 *   - Default color adjust brightness for all screens unless changed
 *     through tags.
 * 
 *   Adjust Contrast:
 *   - Default color adjust contrast for all screens unless changed
 *     through tags.
 * 
 *   Adjust Saturation:
 *   - Default color adjust saturation for all screens unless changed
 *     through tags.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Tilt Shift Settings
 * ============================================================================
 *
 * There are two versions of these plugin parameters. One of them are for the
 * Map Defaults and the other is for the Battle Defaults. These settings are
 * applied to the map and battle scenes respectively and will serve as the
 * stock setting when no map notetags, troop name tags, or Plugin Commands have
 * been used to alter them.
 *
 * ---
 *
 * Tilt Shift Settings
 * 
 *   Pixel Blur:
 *   - What is the default pixel blur amount for tilt shift?
 *   - Smaller = less blur. Higher = more blur.
 * 
 *   Gradient Blur:
 *   - What is the default gradient blur amount for tilt shift?
 *   - Smaller = less gradient. Higher = more gradient.
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
 * Version 1.06: October 13, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Olivia and sponsored by Archeia:
 * *** Tilt Shift
 * **** The Tilt Shift filter creates a blur at the upper and lower edges of
 *      the screen with varying degrees of pixelation blur and gradient blur.
 * **** Plugin Parameters, Notetags, and Plugin Commands added.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: April 28, 2022
 * * Bug Fixes!
 * ** No longer crashes with event test play. Fix made by Olivia.
 * 
 * Version 1.04: March 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features:
 * ** New Plugin Parameters added: "Apply Base-Only?"
 * *** Base-Only excludes pictures, timers, and weather.
 * *** Whole includes the above.
 * 
 * Version 1.03: April 2, 2021
 * * Bug Fixes!
 * ** Changing scenes while a filter change is in transition will automatically
 *    load up the changes made to the filter to prevent desynchronization.
 *    Fix made by Olivia.
 * 
 * Version 1.02: March 12, 2021
 * * Compatibility Update!
 * ** Added compatibility with the VisuStella MZ Options Core v1.10 update.
 * *** When the "Special Effects" option is set to OFF, the filters for this
 *     plugin will be shut off. They will be returned to normal when set to ON.
 * * Documentation Update!
 * ** Added the Options Core section to the "Extra Features" list.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Bright effects from battle should no longer carry back over into the
 *    map scene. Fix made by Yanfly.
 *
 * Version 1.00: January 18, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BloomChange
 * @text Bloom: Change Settings
 * @desc Change the Bloom filter settings for the screen.
 *
 * @arg Scale:num
 * @text Bloom Scale
 * @desc Change bloom scale for the screen.
 * @default 0.5
 *
 * @arg Brightness:num
 * @text Bloom Brightness
 * @desc Change bloom brightness for the screen.
 * @default 1.0
 *
 * @arg Threshold:num
 * @text Bloom Threshold
 * @desc Change bloom threshold for the screen.
 * @default 0.5
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the change to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BloomReset
 * @text Bloom: Reset
 * @desc Reset the Bloom filter settings for the settings found in
 * the Plugin Parameters or map notetags.
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the reset to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Godray
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GodrayChange
 * @text Godray: Change Settings
 * @desc Change the Godray filter settings for the screen.
 *
 * @arg Visible:eval
 * @text Visible?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show godrays on the screen?
 * Visibility changes are immediate.
 * @default true
 *
 * @arg Speed:num
 * @text Godray Speed
 * @desc Change godray speed for the screen.
 * @default 0.01
 *
 * @arg Gain:num
 * @text Godray Gain
 * @desc Change godray gain for the screen.
 * @default 0.6
 *
 * @arg Lacunarity:num
 * @text Godray Lacunarity
 * @desc Change godray lacunarity for the screen.
 * @default 2.0
 *
 * @arg Angle:num
 * @text Godray Angle
 * @desc Change godray angle for the screen.
 * @default -30
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the change to occur.
 * Visibility changes are immediate.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GodrayReset
 * @text Godray: Reset
 * @desc Reset the Godray filter settings for the settings
 * found in the Plugin Parameters or map notetags.
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the reset to occur.
 * Visibility changes are immediate.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ColorAdjust
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ColorAdjustChange
 * @text Color Adjust: Change Settings
 * @desc Change the Color Adjustment filter settings for the screen.
 *
 * @arg Brightness:num
 * @text Adjust Brightness
 * @desc Change color adjust brightness for the screen.
 * @default 1.0
 *
 * @arg Contrast:num
 * @text Adjust Contrast
 * @desc Change color adjust contrast for the screen.
 * @default 0.0
 *
 * @arg Saturate:num
 * @text Adjust Saturation
 * @desc Change color adjust saturation for the screen.
 * @default 0.0
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the change to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ColorAdjustReset
 * @text Color Adjust: Reset
 * @desc Reset the Color Adjustment filter settings for the settings
 * found in the Plugin Parameters or map notetags.
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the reset to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TiltShift
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TiltShiftChange
 * @text Tilt Shift: Change Settings
 * @desc Change the Tilt Shift filter settings for the screen.
 *
 * @arg Blur:num
 * @text Pixel Blur
 * @desc What is the default pixel blur amount for tilt shift?
 * Smaller = less blur. Higher = more blur.
 * @default 24
 *
 * @arg GradientBlur:num
 * @text Gradient Blur
 * @desc What is the default gradient blur amount for tilt shift?
 * Smaller = less gradient. Higher = more gradient.
 * @default 1000
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the change to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TiltShiftReset
 * @text Tilt Shift: Reset
 * @desc Reset the Tilt Shift filter settings for the settings
 * found in the Plugin Parameters or map notetags.
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the reset to occur.
 * @default 60
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
 * @param BrightEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Map
 * @text Map Defaults
 *
 * @param MapBaseFilter:eval
 * @text Apply Base-Only?
 * @parent Map
 * @type boolean
 * @on Base-Only
 * @off Apply Whole
 * @desc Base-Only excludes pictures, timers, and weather.
 * Whole includes the above.
 * @default true
 *
 * @param MapBloom:struct
 * @text Bloom Settings
 * @parent Map
 * @type struct<Bloom>
 * @desc Default bloom settings for all maps.
 * @default {"Scale:num":"0.5","Brightness:num":"1.0","Threshold:num":"0.5"}
 *
 * @param MapGodray:struct
 * @text Godray Settings
 * @parent Map
 * @type struct<Godray>
 * @desc Default Godray settings for all maps.
 * @default {"Visible:eval":"false","Speed:num":"0.01","Gain:num":"0.6","Lacunarity:num":"2.0","Angle:num":"-30"}
 *
 * @param MapColorAdjust:struct
 * @text Color Adjust Settings
 * @parent Map
 * @type struct<ColorAdjust>
 * @desc Default color adjustment settings for all maps.
 * @default {"Brightness:num":"1.0","Contrast:num":"0.0","Saturate:num":"0.0"}
 *
 * @param MapTiltShift:struct
 * @text Tilt Shift Settings
 * @parent Map
 * @type struct<TiltShift>
 * @desc Default tilt shift adjustment settings for all maps.
 * @default {"Blur:num":"24","GradientBlur:num":"1000"}
 * 
 * @param Battle
 * @text Battle Defaults
 *
 * @param BattleBaseFilter:eval
 * @text Apply Base-Only?
 * @parent Battle
 * @type boolean
 * @on Base-Only
 * @off Apply Whole
 * @desc Base-Only excludes pictures, timers, and weather.
 * Whole includes the above.
 * @default true
 *
 * @param BattleBloom:struct
 * @text Bloom Settings
 * @parent Battle
 * @type struct<Bloom>
 * @desc Default bloom settings for all battles.
 * @default {"Scale:num":"0.5","Brightness:num":"1.0","Threshold:num":"0.5"}
 *
 * @param BattleGodray:struct
 * @text Godray Settings
 * @parent Battle
 * @type struct<Godray>
 * @desc Default Godray settings for all battles.
 * @default {"Visible:eval":"false","Speed:num":"0.01","Gain:num":"0.6","Lacunarity:num":"2.0","Angle:num":"-30"}
 *
 * @param BattleColorAdjust:struct
 * @text Color Adjust Settings
 * @parent Battle
 * @type struct<ColorAdjust>
 * @desc Default color adjustment settings for all battles.
 * @default {"Brightness:num":"1.0","Contrast:num":"0.0","Saturate:num":"0.0"}
 *
 * @param BattleTiltShift:struct
 * @text Tilt Shift Settings
 * @parent Battle
 * @type struct<TiltShift>
 * @desc Default tilt shift adjustment settings for all battles.
 * @default {"Blur:num":"0","GradientBlur:num":"1600"}
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
 * Bloom Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Bloom:
 *
 * @param Scale:num
 * @text Bloom Scale
 * @desc Default bloom scale for the screen unless changed through tags.
 * @default 0.5
 *
 * @param Brightness:num
 * @text Bloom Brightness
 * @desc Default bloom brightness for the screen unless changed through tags.
 * @default 1.0
 *
 * @param Threshold:num
 * @text Bloom Threshold
 * @desc Default bloom threshold for the screen unless changed through tags.
 * @default 0.5
 *
 */
/* ----------------------------------------------------------------------------
 * Godray Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Godray:
 *
 * @param Visible:eval
 * @text Default Visible?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show godrays on all screens by default unless changed through tags?
 * @default false
 *
 * @param Speed:num
 * @text Godray Speed
 * @desc Default godray speed for all screens unless changed through tags.
 * @default 0.01
 *
 * @param Gain:num
 * @text Godray Gain
 * @desc Default godray gain for all screens unless changed through tags.
 * @default 0.6
 *
 * @param Lacunarity:num
 * @text Godray Lacunarity
 * @desc Default godray lacunarity for all screens unless changed through tags.
 * @default 2.0
 *
 * @param Angle:num
 * @text Godray Angle
 * @desc Default godray angle for all screens unless changed through tags.
 * @default -30
 *
 */
/* ----------------------------------------------------------------------------
 * Color Adjust Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ColorAdjust:
 *
 * @param Brightness:num
 * @text Adjust Brightness
 * @desc Default color adjust brightness for all screens unless changed through tags.
 * @default 1.0
 *
 * @param Contrast:num
 * @text Adjust Contrast
 * @desc Default color adjust contrast for all screens unless changed through tags.
 * @default 0.0
 *
 * @param Saturate:num
 * @text Adjust Saturation
 * @desc Default color adjust saturation for all screens unless changed through tags.
 * @default 0.0
 *
 */
/* ----------------------------------------------------------------------------
 * Tilt Shift Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TiltShift:
 *
 * @param Blur:num
 * @text Pixel Blur
 * @desc What is the default pixel blur amount for tilt shift?
 * Smaller = less blur. Higher = more blur.
 * @default 24
 *
 * @param GradientBlur:num
 * @text Gradient Blur
 * @desc What is the default gradient blur amount for tilt shift?
 * Smaller = less gradient. Higher = more gradient.
 * @default 1000
 *
 */
//=============================================================================

var _0x10d95b=_0xc805;function _0xadc4(){var _0x4d9499=['saturate','_brightEffectsColorAdjustHorzContrast','vmWLk','bKRaG','pixelBlur','status','fzcKV','Game_Map_setup','YgwLI','STR','_scene','_brightEffectsGodrayVertLacunarity','ZvRMP','setBrightEffectsColorAdjustSettings','duration','_BrightEffectsColorAdjustFilter','Blur','ColorAdjustReset','678tbzGsV','ungrD','currentSaturate','NhRjh','STRUCT','setupBrightEffectsTiltShiftFilter','fphAL','_BrightEffectsAdvBloomSettingsBattle','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_brightEffectsColorAdjustHorzSaturate','_BrightEffectsColorAdjustSettingsBattle','createBrightEffectsColorAdjustFilter','_brightEffectsBloomHorzScale','_brightEffectsGodrayHorzGain','MapGodray','_brightEffectsGodrayHorzSpeed','isSceneMap','getBrightEffectsAdvBloomSettings','start','hFgGH','setupBrightEffectsGodrayFilter','115341OsFDDa','xRVEJ','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','dRhQQ','1345825pUBqme','1926830CuwtFK','dDzsz','ZxZHJ','HgqjT','setupBrightEffectsColorAdjustFilter','registerCommand','MsTeC','setup','ARRAYNUM','fdlEv','GradientBlur','currentContrast','currentBrightness','brightEffectsBaseOnly','toUpperCase','shiftY','format','snMfn','Speed','width','return\x200','EVAL','_BrightEffectsAdvBloomSettingsMap','speed','BloomChange','_BrightEffectsColorAdjustSettingsMap','getBrightEffectsTiltShiftSettings','BattleBloom','createBrightEffectsFilters','CUDBV','2FxtFrJ','Scene_Battle_start','5525762DPwCoo','constructor','parse','setBrightEffectsGodraySettings','BattleColorAdjust','parameters','updateBrightEffectsColorAdjustFilter','trim','BattleBaseFilter','_brightEffectsGodrayVertGain','GodrayChange','_baseSprite','crvUO','name','MapColorAdjust','findTargetSprite','locate','_brightEffectsBloomVertBrightness','dSlIq','RLMWO','gain','tileHeight','description','MVaCq','TiltShiftChange','time','getBrightEffectsColorAdjustSettings','setupBrightEffectsAdvBloomFilter','Angle','match','mapCameraSettings','_BrightEffectsTiltShiftFilter','qKYAl','_BrightEffectsGodraySettingsMap','Spriteset_Base_createOverallFilters','Eslzc','isSceneBattle','_brightEffectsBloomVertScale','BloomReset','threshold','BZJIP','includes','Spriteset_Base_update','brightness','ITroq','qVncR','updateMapBrightEffectsAdvBloom','ZbBMJ','updateBrightEffectsTiltShiftFilter','_brightEffectsGodrayHorzLacunarity','_realX','_brightEffectsColorAdjustVertSaturate','8LgMiaS','update','AdvancedBloomFilter','push','_brightEffectsColorAdjustVertBrightness','getBrightEffectsGodraySettings','filter','NUM','Gain','contrast','MapTiltShift','Game_Player_update','updateBrightEffectsAdvBloomFilter','UQjce','Game_CharacterBase_locate','MapBloom','end','LdphY','_BrightEffectsGodrayFilter','tcOIa','currentGradientBlur','DvYsC','McjTj','TiltShiftReset','_realY','RuKWi','nCjdb','gFOmT','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','4YWsnMw','bloomScale','PUoTm','jLuvO','_brightEffectsColorAdjustHorzBrightness','nQYXP','OcPTM','updateMapBrightEffectsGodray','BafQe','_BrightEffectsGodraySettingsBattle','VisuMZ_3_MapCameraZoom','VXHfb','prototype','updateBrightEffectsFilters','UqPqe','4942fGvxEA','BZCwl','ColorMatrixFilter','NqHPM','TiltShiftFilter','mapCameraFocusTarget','max','height','ARRAYSTR','angle','currentPixelBlur','_brightEffectsColorAdjustVertContrast','gradientBlur','UFENP','setMapEnhanceTiltShiftFilterY','troop','Saturate','YqNtw','Brightness','createOverallFilters','NdSsa','1203723iKzsOc','VfMRO','filters','lacunarity','uvMdF','HyVSZ','ARRAYFUNC','dGETM','updateBrightEffectsGodrayFilter','min','createBrightEffectsTiltShiftFilter','VEVIn','Threshold','JSON','_brightEffectsGodrayVertSpeed','Contrast','specialEffects','KeBbU','Scale','createBrightEffectsGodrayFilter','MapBaseFilter','updateMapBrightEffects','blur','Settings','_BrightEffectsTiltShiftSettingsBattle','exit','xCNDl','updateBrightEffectsTiltShiftFilterProperties','Duration','enabled','gBCuB','tileFocus','AnbKs','dsysD','updateMapBrightEffectsColorAdjust','iQeCn','createBrightEffectsAdvBloomFilter','screenY','setBrightEffectsAdvBloomSettings','jhoHH','setBrightEffectsTiltShiftSettings','BrightEffects','721689oNbYdP','map','call','_brightEffectsGodrayHorzAngle','UGqkX','_BrightEffectsAdvBloomFilter','BRIGHT_EFFECTS_BASE_ONLY','_brightEffectsBloomVertThreshold','GouOQ','_brightEffectsBloomHorzThreshold','ConvertParams','GodrayFilter','_brightEffectsBloomHorzBrightness','setupBrightEffectsFilters','RTqQC','yJchH','YfREd','getMapEnhanceScreenY','ZbmJD','_brightEffectsGodrayVertAngle','_BrightEffectsTiltShiftSettingsMap','note','bCyup','visible','RmWkP'];_0xadc4=function(){return _0x4d9499;};return _0xadc4();}function _0xc805(_0x3c4390,_0x301061){var _0xadc4ae=_0xadc4();return _0xc805=function(_0xc8051b,_0x3a10ea){_0xc8051b=_0xc8051b-0x1f3;var _0xd89cf=_0xadc4ae[_0xc8051b];return _0xd89cf;},_0xc805(_0x3c4390,_0x301061);}(function(_0x5bc807,_0x56ecbf){var _0x4c4bee=_0xc805,_0x5655e4=_0x5bc807();while(!![]){try{var _0x420f63=-parseInt(_0x4c4bee(0x22f))/0x1*(-parseInt(_0x4c4bee(0x252))/0x2)+-parseInt(_0x4c4bee(0x2f3))/0x3+parseInt(_0x4c4bee(0x2a5))/0x4*(-parseInt(_0x4c4bee(0x233))/0x5)+-parseInt(_0x4c4bee(0x21a))/0x6*(-parseInt(_0x4c4bee(0x2b4))/0x7)+-parseInt(_0x4c4bee(0x288))/0x8*(parseInt(_0x4c4bee(0x2c9))/0x9)+parseInt(_0x4c4bee(0x234))/0xa+parseInt(_0x4c4bee(0x254))/0xb;if(_0x420f63===_0x56ecbf)break;else _0x5655e4['push'](_0x5655e4['shift']());}catch(_0x23f4a1){_0x5655e4['push'](_0x5655e4['shift']());}}}(_0xadc4,0x3c38d));var label='BrightEffects',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x10d95b(0x28e)](function(_0x1e3dc7){var _0x5a917e=_0x10d95b;return _0x1e3dc7[_0x5a917e(0x20d)]&&_0x1e3dc7[_0x5a917e(0x26a)][_0x5a917e(0x27d)]('['+label+']');})[0x0];VisuMZ[label][_0x10d95b(0x2e0)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x10d95b(0x1f9)]=function(_0x491938,_0x5a3492){var _0x5a6c17=_0x10d95b;for(const _0x4ab23b in _0x5a3492){if(_0x5a6c17(0x23a)===_0x5a6c17(0x23a)){if(_0x4ab23b[_0x5a6c17(0x271)](/(.*):(.*)/i)){const _0x29dc60=String(RegExp['$1']),_0x5a6473=String(RegExp['$2'])[_0x5a6c17(0x242)]()[_0x5a6c17(0x25b)]();let _0xfa60c3,_0x1912bc,_0x389875;switch(_0x5a6473){case _0x5a6c17(0x28f):_0xfa60c3=_0x5a3492[_0x4ab23b]!==''?Number(_0x5a3492[_0x4ab23b]):0x0;break;case _0x5a6c17(0x23c):_0x1912bc=_0x5a3492[_0x4ab23b]!==''?JSON[_0x5a6c17(0x256)](_0x5a3492[_0x4ab23b]):[],_0xfa60c3=_0x1912bc[_0x5a6c17(0x2f4)](_0x45ddf7=>Number(_0x45ddf7));break;case _0x5a6c17(0x249):_0xfa60c3=_0x5a3492[_0x4ab23b]!==''?eval(_0x5a3492[_0x4ab23b]):null;break;case'ARRAYEVAL':_0x1912bc=_0x5a3492[_0x4ab23b]!==''?JSON[_0x5a6c17(0x256)](_0x5a3492[_0x4ab23b]):[],_0xfa60c3=_0x1912bc[_0x5a6c17(0x2f4)](_0x291c09=>eval(_0x291c09));break;case _0x5a6c17(0x2d6):_0xfa60c3=_0x5a3492[_0x4ab23b]!==''?JSON['parse'](_0x5a3492[_0x4ab23b]):'';break;case'ARRAYJSON':_0x1912bc=_0x5a3492[_0x4ab23b]!==''?JSON['parse'](_0x5a3492[_0x4ab23b]):[],_0xfa60c3=_0x1912bc[_0x5a6c17(0x2f4)](_0x3b7925=>JSON[_0x5a6c17(0x256)](_0x3b7925));break;case'FUNC':_0xfa60c3=_0x5a3492[_0x4ab23b]!==''?new Function(JSON[_0x5a6c17(0x256)](_0x5a3492[_0x4ab23b])):new Function(_0x5a6c17(0x248));break;case _0x5a6c17(0x2cf):_0x1912bc=_0x5a3492[_0x4ab23b]!==''?JSON[_0x5a6c17(0x256)](_0x5a3492[_0x4ab23b]):[],_0xfa60c3=_0x1912bc[_0x5a6c17(0x2f4)](_0x30ef70=>new Function(JSON['parse'](_0x30ef70)));break;case _0x5a6c17(0x211):_0xfa60c3=_0x5a3492[_0x4ab23b]!==''?String(_0x5a3492[_0x4ab23b]):'';break;case _0x5a6c17(0x2bc):_0x1912bc=_0x5a3492[_0x4ab23b]!==''?JSON[_0x5a6c17(0x256)](_0x5a3492[_0x4ab23b]):[],_0xfa60c3=_0x1912bc[_0x5a6c17(0x2f4)](_0x598600=>String(_0x598600));break;case _0x5a6c17(0x21e):_0x389875=_0x5a3492[_0x4ab23b]!==''?JSON['parse'](_0x5a3492[_0x4ab23b]):{},_0xfa60c3=VisuMZ[_0x5a6c17(0x1f9)]({},_0x389875);break;case'ARRAYSTRUCT':_0x1912bc=_0x5a3492[_0x4ab23b]!==''?JSON[_0x5a6c17(0x256)](_0x5a3492[_0x4ab23b]):[],_0xfa60c3=_0x1912bc['map'](_0x299da4=>VisuMZ[_0x5a6c17(0x1f9)]({},JSON[_0x5a6c17(0x256)](_0x299da4)));break;default:continue;}_0x491938[_0x29dc60]=_0xfa60c3;}}else{_0xa0b5de[_0x5a6c17(0x1f9)](_0x3634b3,_0x2d4274);const _0x469179=_0x455fbc['getBrightEffectsAdvBloomSettings']();_0x469179[_0x5a6c17(0x2a6)]=_0x5acb81[_0x5a6c17(0x2db)],_0x469179['brightness']=_0x227866[_0x5a6c17(0x2c6)],_0x469179[_0x5a6c17(0x27b)]=_0x281d7d[_0x5a6c17(0x2d5)],_0x469179['duration']=_0x4cf6c3['Duration'],!_0x2410fb[_0x5a6c17(0x278)]()&&(_0x4610a3[_0x5a6c17(0x1fb)]=_0x4942ad,_0x2b8dc0[_0x5a6c17(0x265)]=_0x1b6ad3);}}return _0x491938;},(_0x162be8=>{var _0x50968b=_0x10d95b;const _0x5432e6=_0x162be8['name'];for(const _0x307766 of dependencies){if(!Imported[_0x307766]){alert(_0x50968b(0x231)[_0x50968b(0x244)](_0x5432e6,_0x307766)),SceneManager[_0x50968b(0x2e2)]();break;}}const _0x4aceec=_0x162be8[_0x50968b(0x26a)];if(_0x4aceec[_0x50968b(0x271)](/\[Version[ ](.*?)\]/i)){if(_0x50968b(0x2ce)===_0x50968b(0x2ce)){const _0xd277a=Number(RegExp['$1']);if(_0xd277a!==VisuMZ[label]['version']){if('DvYsC'===_0x50968b(0x29d))alert(_0x50968b(0x2a4)[_0x50968b(0x244)](_0x5432e6,_0xd277a)),SceneManager[_0x50968b(0x2e2)]();else var _0x5b7c00=_0x59a013[_0x50968b(0x202)][0x0],_0xd0edc2=_0x4349fc['_brightEffectsGodrayVertAngle'][0x1]-_0x5b7c00,_0x56e024=_0xa624f1[_0x50968b(0x2a0)]/_0x5753e9[_0x50968b(0x2bb)](),_0x4a6310=_0x5b7c00+_0xd0edc2*_0x56e024;}}else _0x1e0fe9[_0x50968b(0x22e)]();}if(_0x4aceec['match'](/\[Tier[ ](\d+)\]/i)){const _0x37d4a9=Number(RegExp['$1']);if(_0x37d4a9<tier){if(_0x50968b(0x236)===_0x50968b(0x260)){const _0x58d8a6=_0x4727d2['zoomScale']();let _0x5a66ac=0x0;if(_0x33a2ae[_0x50968b(0x2af)]&&_0x3609cb[_0x50968b(0x272)]()['tileFocus'])_0x5a66ac=_0xcbdf02['height']/0x2,_0x5a66ac-=_0x11e040['tileHeight']()*0.5*_0x58d8a6;else{const _0x2d13d9=_0x3c4895[_0x50968b(0x2af)]?_0xc5c0c6['mapCameraFocusTarget'](!![]):_0x4347d7,_0x3727b7=this[_0x50968b(0x263)](_0x2d13d9);_0x5a66ac=_0x2d13d9[_0x50968b(0x2ee)]()*_0x58d8a6,_0x5a66ac-=_0x3727b7['height']*0.5,_0x5a66ac-=_0x2d13d9[_0x50968b(0x243)]()*_0x58d8a6*0.5;}return _0x5a66ac;}else alert(_0x50968b(0x222)['format'](_0x5432e6,_0x37d4a9,tier)),SceneManager[_0x50968b(0x2e2)]();}else tier=Math['max'](_0x37d4a9,tier);}VisuMZ[_0x50968b(0x1f9)](VisuMZ[label][_0x50968b(0x2e0)],_0x162be8[_0x50968b(0x259)]);})(pluginData),PluginManager[_0x10d95b(0x239)](pluginData['name'],_0x10d95b(0x24c),_0x179ab6=>{var _0x344427=_0x10d95b;VisuMZ['ConvertParams'](_0x179ab6,_0x179ab6);const _0x480f6=$gameScreen[_0x344427(0x22b)]();_0x480f6[_0x344427(0x2a6)]=_0x179ab6[_0x344427(0x2db)],_0x480f6['brightness']=_0x179ab6[_0x344427(0x2c6)],_0x480f6[_0x344427(0x27b)]=_0x179ab6['Threshold'],_0x480f6[_0x344427(0x216)]=_0x179ab6[_0x344427(0x2e5)];if(!SceneManager[_0x344427(0x278)]()){if(_0x344427(0x201)!==_0x344427(0x2c8))$gameMap['_brightEffectsBloomHorzBrightness']=undefined,$gameMap['_brightEffectsBloomVertBrightness']=undefined;else{const _0x447d8d=this[_0x344427(0x273)];var _0x5117db=_0x6d12fd['getBrightEffectsTiltShiftSettings'](),_0x4a408a=_0x5117db[_0x344427(0x216)];_0x4a408a<=0x0?(_0x447d8d[_0x344427(0x2be)]=_0x5117db['pixelBlur'],_0x447d8d['currentGradientBlur']=_0x5117db[_0x344427(0x2c0)]):(_0x5117db[_0x344427(0x216)]--,_0x447d8d['currentPixelBlur']=(_0x447d8d[_0x344427(0x2be)]*(_0x4a408a-0x1)+_0x5117db[_0x344427(0x20c)])/_0x4a408a,_0x447d8d['currentGradientBlur']=(_0x447d8d[_0x344427(0x29c)]*(_0x4a408a-0x1)+_0x5117db['gradientBlur'])/_0x4a408a),_0x447d8d[_0x344427(0x2df)]=_0x447d8d['currentPixelBlur'],_0x447d8d['gradientBlur']=_0x447d8d[_0x344427(0x29c)];}}}),PluginManager['registerCommand'](pluginData[_0x10d95b(0x261)],_0x10d95b(0x27a),_0x5e265=>{var _0x218c0d=_0x10d95b;VisuMZ[_0x218c0d(0x1f9)](_0x5e265,_0x5e265);SceneManager[_0x218c0d(0x278)]()?'FlXQa'!=='LtQOV'?$gameTroop[_0x218c0d(0x26f)]():this['filters'][_0x218c0d(0x28b)](_0x41e6a7):$gameMap[_0x218c0d(0x26f)]();const _0x5ddc83=$gameScreen[_0x218c0d(0x22b)]();_0x5ddc83[_0x218c0d(0x216)]=_0x5e265[_0x218c0d(0x2e5)];}),PluginManager['registerCommand'](pluginData[_0x10d95b(0x261)],_0x10d95b(0x25e),_0x55caa0=>{var _0x21f00a=_0x10d95b;VisuMZ[_0x21f00a(0x1f9)](_0x55caa0,_0x55caa0);const _0x32c092=$gameScreen[_0x21f00a(0x28d)]();_0x32c092['visible']=_0x55caa0['Visible'],_0x32c092[_0x21f00a(0x24b)]=_0x55caa0[_0x21f00a(0x246)],_0x32c092[_0x21f00a(0x268)]=_0x55caa0[_0x21f00a(0x290)],_0x32c092[_0x21f00a(0x2cc)]=_0x55caa0['Lacunarity'],_0x32c092[_0x21f00a(0x2bd)]=_0x55caa0[_0x21f00a(0x270)],_0x32c092[_0x21f00a(0x216)]=_0x55caa0[_0x21f00a(0x2e5)],!SceneManager[_0x21f00a(0x278)]()&&($gameMap[_0x21f00a(0x229)]=undefined,$gameMap[_0x21f00a(0x2d7)]=undefined);}),PluginManager['registerCommand'](pluginData[_0x10d95b(0x261)],'GodrayReset',_0x39c622=>{var _0x4e3269=_0x10d95b;VisuMZ[_0x4e3269(0x1f9)](_0x39c622,_0x39c622);SceneManager[_0x4e3269(0x278)]()?_0x4e3269(0x1f3)==='pwPEe'?(_0x598157=_0x469d8f[_0x4e3269(0x2bb)]/0x2,_0x1ff7ba-=_0x4317e3['tileHeight']()*0.5*_0x56565c):$gameTroop[_0x4e3269(0x22e)]():_0x4e3269(0x2d4)==='VEVIn'?$gameMap[_0x4e3269(0x22e)]():_0x1df667[_0x4e3269(0x26f)]();const _0x5af871=$gameScreen[_0x4e3269(0x28d)]();_0x5af871[_0x4e3269(0x216)]=_0x39c622[_0x4e3269(0x2e5)];}),PluginManager[_0x10d95b(0x239)](pluginData[_0x10d95b(0x261)],'ColorAdjustChange',_0x149daf=>{var _0x1f73b7=_0x10d95b;VisuMZ[_0x1f73b7(0x1f9)](_0x149daf,_0x149daf);const _0x24527f=$gameScreen[_0x1f73b7(0x26e)]();_0x24527f[_0x1f73b7(0x27f)]=_0x149daf[_0x1f73b7(0x2c6)],_0x24527f['contrast']=_0x149daf[_0x1f73b7(0x2d8)],_0x24527f[_0x1f73b7(0x208)]=_0x149daf[_0x1f73b7(0x2c4)],_0x24527f[_0x1f73b7(0x216)]=_0x149daf[_0x1f73b7(0x2e5)],!SceneManager[_0x1f73b7(0x278)]()&&($gameMap['_brightEffectsColorAdjustHorzSaturate']=undefined,$gameMap[_0x1f73b7(0x287)]=undefined);}),PluginManager[_0x10d95b(0x239)](pluginData[_0x10d95b(0x261)],_0x10d95b(0x219),_0x5c8979=>{var _0x56ffd8=_0x10d95b;VisuMZ[_0x56ffd8(0x1f9)](_0x5c8979,_0x5c8979);SceneManager[_0x56ffd8(0x278)]()?$gameTroop['setupBrightEffectsColorAdjustFilter']():$gameMap[_0x56ffd8(0x238)]();const _0x30325b=$gameScreen[_0x56ffd8(0x26e)]();_0x30325b['duration']=_0x5c8979['Duration'];}),PluginManager['registerCommand'](pluginData[_0x10d95b(0x261)],_0x10d95b(0x26c),_0x5ad1a1=>{var _0xc78a3f=_0x10d95b;VisuMZ[_0xc78a3f(0x1f9)](_0x5ad1a1,_0x5ad1a1);const _0x49b3a0=$gameScreen[_0xc78a3f(0x24e)]();_0x49b3a0['pixelBlur']=_0x5ad1a1[_0xc78a3f(0x218)],_0x49b3a0[_0xc78a3f(0x2c0)]=_0x5ad1a1['GradientBlur'],_0x49b3a0[_0xc78a3f(0x216)]=_0x5ad1a1['Duration'];}),PluginManager[_0x10d95b(0x239)](pluginData['name'],_0x10d95b(0x29f),_0x576b77=>{var _0x449b80=_0x10d95b;VisuMZ[_0x449b80(0x1f9)](_0x576b77,_0x576b77);SceneManager[_0x449b80(0x278)]()?$gameTroop['setupBrightEffectsTiltShiftFilter']():$gameMap[_0x449b80(0x21f)]();const _0x35245b=$gameScreen[_0x449b80(0x24e)]();_0x35245b[_0x449b80(0x216)]=_0x576b77['Duration'];}),SceneManager[_0x10d95b(0x278)]=function(){var _0x2f0cb4=_0x10d95b;return this[_0x2f0cb4(0x212)]&&this[_0x2f0cb4(0x212)][_0x2f0cb4(0x255)]===Scene_Battle;},SceneManager[_0x10d95b(0x22a)]=function(){var _0x2d8b5d=_0x10d95b;return this[_0x2d8b5d(0x212)]&&this['_scene'][_0x2d8b5d(0x255)]===Scene_Map;},Game_Screen['prototype'][_0x10d95b(0x2ef)]=function(_0x446be4,_0x2be854,_0x978041,_0x1a3cb7){var _0x1872b1=_0x10d95b;SceneManager[_0x1872b1(0x278)]()?this[_0x1872b1(0x221)]={'bloomScale':_0x446be4,'brightness':_0x2be854,'threshold':_0x978041,'duration':_0x1a3cb7||0x0}:this['_BrightEffectsAdvBloomSettingsMap']={'bloomScale':_0x446be4,'brightness':_0x2be854,'threshold':_0x978041,'duration':_0x1a3cb7||0x0};},Game_Screen['prototype']['getBrightEffectsAdvBloomSettings']=function(){var _0x196270=_0x10d95b;return SceneManager[_0x196270(0x278)]()?(this[_0x196270(0x221)]===undefined&&$gameTroop[_0x196270(0x26f)](),this['_BrightEffectsAdvBloomSettingsBattle']):(this[_0x196270(0x24a)]===undefined&&$gameMap[_0x196270(0x26f)](),this['_BrightEffectsAdvBloomSettingsMap']);},Game_Screen[_0x10d95b(0x2b1)][_0x10d95b(0x257)]=function(_0x2d4253,_0x19402e,_0x477f57,_0x1b9d4e,_0x5539e0,_0x1c4140){var _0x438a78=_0x10d95b;SceneManager[_0x438a78(0x278)]()?this[_0x438a78(0x2ae)]={'visible':_0x2d4253,'speed':_0x19402e,'gain':_0x477f57,'lacunarity':_0x1b9d4e,'angle':_0x5539e0,'duration':_0x1c4140||0x0}:this[_0x438a78(0x275)]={'visible':_0x2d4253,'speed':_0x19402e,'gain':_0x477f57,'lacunarity':_0x1b9d4e,'angle':_0x5539e0,'duration':_0x1c4140||0x0};},Game_Screen[_0x10d95b(0x2b1)][_0x10d95b(0x28d)]=function(){var _0x2d30c2=_0x10d95b;if(SceneManager[_0x2d30c2(0x278)]())return this[_0x2d30c2(0x2ae)]===undefined&&$gameTroop[_0x2d30c2(0x22e)](),this['_BrightEffectsGodraySettingsBattle'];else{if(_0x2d30c2(0x1fe)==='yJchH')return this[_0x2d30c2(0x275)]===undefined&&$gameMap[_0x2d30c2(0x22e)](),this[_0x2d30c2(0x275)];else _0x35b0f8[_0x2d30c2(0x238)]();}},Game_Screen[_0x10d95b(0x2b1)][_0x10d95b(0x215)]=function(_0x3eec4e,_0x490a68,_0x1ce61f,_0x5e4291){var _0x543d69=_0x10d95b;SceneManager['isSceneBattle']()?this['_BrightEffectsColorAdjustSettingsBattle']={'brightness':_0x3eec4e,'contrast':_0x490a68,'saturate':_0x1ce61f,'duration':_0x5e4291||0x0}:_0x543d69(0x2ad)==='BafQe'?this[_0x543d69(0x24d)]={'brightness':_0x3eec4e,'contrast':_0x490a68,'saturate':_0x1ce61f,'duration':_0x5e4291||0x0}:_0x1b74f7['isSceneBattle']()?this[_0x543d69(0x221)]={'bloomScale':_0x569287,'brightness':_0x21fa5d,'threshold':_0x15c88c,'duration':_0x42cf96||0x0}:this['_BrightEffectsAdvBloomSettingsMap']={'bloomScale':_0x589a98,'brightness':_0x51fcb6,'threshold':_0xec7099,'duration':_0x5df340||0x0};},Game_Screen[_0x10d95b(0x2b1)][_0x10d95b(0x26e)]=function(){var _0x1cb19d=_0x10d95b;return SceneManager[_0x1cb19d(0x278)]()?(this['_BrightEffectsColorAdjustSettingsBattle']===undefined&&('NqHPM'!==_0x1cb19d(0x2b7)?(this['_brightEffectsColorAdjustHorzContrast']=_0x45ada2,this[_0x1cb19d(0x2bf)]=[_0x19d749(_0x1b91d9['$1']),_0x96410b(_0x53e1c0['$2'])]):$gameTroop[_0x1cb19d(0x238)]()),this[_0x1cb19d(0x224)]):(this['_BrightEffectsColorAdjustSettingsMap']===undefined&&$gameMap[_0x1cb19d(0x238)](),this['_BrightEffectsColorAdjustSettingsMap']);},Game_Screen[_0x10d95b(0x2b1)][_0x10d95b(0x2f1)]=function(_0x1ddb5b,_0x347908,_0x31e1f5){var _0x57853d=_0x10d95b;SceneManager[_0x57853d(0x278)]()?_0x57853d(0x2da)!==_0x57853d(0x2da)?(_0x4fa4bb[_0x57853d(0x216)]--,_0x288aa6[_0x57853d(0x2be)]=(_0x46fa72[_0x57853d(0x2be)]*(_0x1ff8bd-0x1)+_0x4f3578[_0x57853d(0x20c)])/_0x20e957,_0x5a7f71[_0x57853d(0x29c)]=(_0x3a3fa5[_0x57853d(0x29c)]*(_0x17bd60-0x1)+_0x49b0e6[_0x57853d(0x2c0)])/_0x5c0c65):this[_0x57853d(0x2e1)]={'pixelBlur':_0x1ddb5b,'gradientBlur':_0x347908,'duration':_0x31e1f5||0x0}:_0x57853d(0x267)!==_0x57853d(0x267)?(this[_0x57853d(0x294)](),this[_0x57853d(0x2d1)](),this[_0x57853d(0x25a)](),this['updateBrightEffectsTiltShiftFilter']()):this['_BrightEffectsTiltShiftSettingsMap']={'pixelBlur':_0x1ddb5b,'gradientBlur':_0x347908,'duration':_0x31e1f5||0x0};},Game_Screen['prototype'][_0x10d95b(0x24e)]=function(){var _0x1de5b8=_0x10d95b;if(SceneManager[_0x1de5b8(0x278)]())return this['_BrightEffectsTiltShiftSettingsBattle']===undefined&&$gameTroop[_0x1de5b8(0x21f)](),this[_0x1de5b8(0x2e1)];else{if('PbDRY'!=='PbDRY')_0x200023['BrightEffects']['Game_Map_setup'][_0x1de5b8(0x2f5)](this,_0xb15def),!!_0x449c6d&&this[_0x1de5b8(0x1fc)]();else return this[_0x1de5b8(0x203)]===undefined&&(_0x1de5b8(0x2a1)!==_0x1de5b8(0x237)?$gameMap[_0x1de5b8(0x21f)]():(this[_0x1de5b8(0x223)]=[_0x32592e(_0x4f779c['$1']),_0x1b738a(_0x2d8833['$2'])],this[_0x1de5b8(0x287)]=_0x3333bf)),this[_0x1de5b8(0x203)];}},VisuMZ[_0x10d95b(0x2f2)][_0x10d95b(0x253)]=Scene_Battle[_0x10d95b(0x2b1)][_0x10d95b(0x22c)],Scene_Battle[_0x10d95b(0x2b1)]['start']=function(){var _0xf8f886=_0x10d95b;VisuMZ['BrightEffects'][_0xf8f886(0x253)][_0xf8f886(0x2f5)](this),$gameTroop[_0xf8f886(0x1fc)]();},Game_Troop['prototype']['setupBrightEffectsFilters']=function(){var _0x2d761d=_0x10d95b;this[_0x2d761d(0x26f)](),this['setupBrightEffectsGodrayFilter'](),this[_0x2d761d(0x238)](),this[_0x2d761d(0x21f)]();},Game_Troop[_0x10d95b(0x2b1)][_0x10d95b(0x26f)]=function(){var _0x41d5a3=_0x10d95b;const _0x411706=VisuMZ[_0x41d5a3(0x2f2)][_0x41d5a3(0x2e0)][_0x41d5a3(0x24f)];var _0x23b0c0=_0x411706[_0x41d5a3(0x2db)],_0x1f09cd=_0x411706[_0x41d5a3(0x2c6)],_0xbf14e8=_0x411706[_0x41d5a3(0x2d5)];if(!!this[_0x41d5a3(0x2c3)]()){if(_0x41d5a3(0x210)===_0x41d5a3(0x210)){var _0x57a1e3=this[_0x41d5a3(0x2c3)]()[_0x41d5a3(0x261)];if(_0x57a1e3[_0x41d5a3(0x271)](/<BLOOM SCALE: (.*)>/i))var _0x23b0c0=Number(RegExp['$1'])||0x0;if(_0x57a1e3[_0x41d5a3(0x271)](/<BLOOM BRIGHTNESS: (.*)>/i))var _0x1f09cd=Number(RegExp['$1'])||0x0;if(_0x57a1e3[_0x41d5a3(0x271)](/<BLOOM THRESHOLD: (.*)>/i))var _0xbf14e8=Number(RegExp['$1'])||0x0;}else var _0x2c8af8=_0x4d4b24[_0x41d5a3(0x2f6)][0x0],_0x5547bb=_0x5b8184[_0x41d5a3(0x2f6)][0x1]-_0x2c8af8,_0x1f15ce=_0x1b5228[_0x41d5a3(0x286)]/_0x1f8615[_0x41d5a3(0x247)](),_0x1024aa=_0x2c8af8+_0x5547bb*_0x1f15ce;}$gameScreen['setBrightEffectsAdvBloomSettings'](_0x23b0c0,_0x1f09cd,_0xbf14e8,0x0);},Game_Troop[_0x10d95b(0x2b1)]['setupBrightEffectsGodrayFilter']=function(){var _0x4a25bd=_0x10d95b;const _0x31799f=VisuMZ[_0x4a25bd(0x2f2)][_0x4a25bd(0x2e0)]['BattleGodray'];var _0x4af043=_0x31799f['Visible'],_0x467d5f=_0x31799f[_0x4a25bd(0x246)],_0x4d1ccd=_0x31799f[_0x4a25bd(0x290)],_0x424a28=_0x31799f['Lacunarity'],_0x268edf=_0x31799f['Angle'];if(!!this[_0x4a25bd(0x2c3)]()){if('YsEdp'!==_0x4a25bd(0x1f7)){var _0x2e2ef6=this[_0x4a25bd(0x2c3)]()['name'];if(_0x2e2ef6[_0x4a25bd(0x271)](/<GODRAY>/i))_0x4a25bd(0x22d)!==_0x4a25bd(0x22d)?(this[_0x4a25bd(0x226)]=_0x59b908,this[_0x4a25bd(0x279)]=[_0x35110f(_0x3c99d9['$1']),_0x9f4d93(_0x168701['$2'])]):_0x4af043=!![];else _0x2e2ef6[_0x4a25bd(0x271)](/<NO GODRAY>/i)&&(_0x4af043=![]);_0x2e2ef6[_0x4a25bd(0x271)](/<GODRAY SPEED: (.*)>/i)&&(_0x467d5f=Number(RegExp['$1'])||0x0);_0x2e2ef6[_0x4a25bd(0x271)](/<GODRAY GAIN: (.*)>/i)&&(_0x4d1ccd=Number(RegExp['$1'])||0x0);if(_0x2e2ef6[_0x4a25bd(0x271)](/<GODRAY LACUNARITY: (.*)>/i)){if('oRuor'!=='gbFet')_0x424a28=Number(RegExp['$1'])||0x0;else return this['_BrightEffectsAdvBloomSettingsBattle']===_0x4243c7&&_0x42c2ed[_0x4a25bd(0x26f)](),this[_0x4a25bd(0x221)];}_0x2e2ef6['match'](/<GODRAY ANGLE: (.*)>/i)&&(_0x268edf=Number(RegExp['$1'])||0x0);}else var _0x280fb2=_0x978b5b[_0x4a25bd(0x227)][0x0],_0x2e8911=_0x210f13[_0x4a25bd(0x227)][0x1]-_0x280fb2,_0x2d0c03=_0x10020a[_0x4a25bd(0x286)]/_0x5eecdc[_0x4a25bd(0x247)](),_0x2096c4=_0x280fb2+_0x2e8911*_0x2d0c03;}$gameScreen['setBrightEffectsGodraySettings'](_0x4af043,_0x467d5f,_0x4d1ccd,_0x424a28,_0x268edf,0x0);},Game_Troop[_0x10d95b(0x2b1)][_0x10d95b(0x238)]=function(){var _0xdfdc47=_0x10d95b;const _0x8d87b3=VisuMZ['BrightEffects'][_0xdfdc47(0x2e0)][_0xdfdc47(0x258)];var _0x136dfa=_0x8d87b3[_0xdfdc47(0x2c6)],_0x4c9b3a=_0x8d87b3[_0xdfdc47(0x2d8)],_0xb300cc=_0x8d87b3[_0xdfdc47(0x2c4)];if(!!this[_0xdfdc47(0x2c3)]()){var _0x23112f=this[_0xdfdc47(0x2c3)]()['name'];if(_0x23112f['match'](/<COLOR ADJUST BRIGHTNESS: (.*)>/i))var _0x136dfa=Number(RegExp['$1'])||0x0;if(_0x23112f[_0xdfdc47(0x271)](/<COLOR ADJUST CONTRAST: (.*)>/i))var _0x4c9b3a=Number(RegExp['$1'])||0x0;if(_0x23112f['match'](/<COLOR ADJUST SATURATE: (.*)>/i)){if(_0xdfdc47(0x266)!==_0xdfdc47(0x266)){_0x5184db[_0xdfdc47(0x1f9)](_0x10128b,_0x261a74);_0xa142f7[_0xdfdc47(0x278)]()?_0x2b3587[_0xdfdc47(0x26f)]():_0x57a1d4[_0xdfdc47(0x26f)]();const _0x5d21c9=_0x511bb9['getBrightEffectsAdvBloomSettings']();_0x5d21c9['duration']=_0x44dfe2[_0xdfdc47(0x2e5)];}else var _0xb300cc=Number(RegExp['$1'])||0x0;}}$gameScreen[_0xdfdc47(0x215)](_0x136dfa,_0x4c9b3a,_0xb300cc,0x0);},Game_Troop[_0x10d95b(0x2b1)]['setupBrightEffectsTiltShiftFilter']=function(){var _0x438d08=_0x10d95b;const _0x219d2e=VisuMZ[_0x438d08(0x2f2)]['Settings']['BattleTiltShift'];let _0x360703=_0x219d2e[_0x438d08(0x218)],_0x22ad00=_0x219d2e[_0x438d08(0x23e)];if(!!this['troop']()){const _0x3643d7=this[_0x438d08(0x2c3)]()[_0x438d08(0x261)];_0x3643d7['match'](/<(?:TILTSHIFT|TILT SHIFT) PIXEL BLUR:[ ](\d+)>/i)&&(_0x360703=Number(RegExp['$1'])),_0x3643d7['match'](/<(?:TILTSHIFT|TILT SHIFT) (?:GRAD|GRADIENT) BLUR:[ ](\d+)>/i)&&(_0x22ad00=Number(RegExp['$1']));}$gameScreen[_0x438d08(0x2f1)](_0x360703,_0x22ad00,0x0);},VisuMZ[_0x10d95b(0x2f2)][_0x10d95b(0x20f)]=Game_Map[_0x10d95b(0x2b1)][_0x10d95b(0x23b)],Game_Map[_0x10d95b(0x2b1)][_0x10d95b(0x23b)]=function(_0x2850c8){var _0x18ec72=_0x10d95b;VisuMZ[_0x18ec72(0x2f2)][_0x18ec72(0x20f)]['call'](this,_0x2850c8),!!$dataMap&&(_0x18ec72(0x230)===_0x18ec72(0x230)?this['setupBrightEffectsFilters']():(this['_BrightEffectsColorAdjustFilter'][_0x18ec72(0x240)]=_0x165130[_0x18ec72(0x27f)],this[_0x18ec72(0x217)][_0x18ec72(0x23f)]=_0x46e3ac[_0x18ec72(0x291)],this[_0x18ec72(0x217)]['currentSaturate']=_0x52f114[_0x18ec72(0x208)]));},Game_Map[_0x10d95b(0x2b1)][_0x10d95b(0x1fc)]=function(){var _0x5a9a20=_0x10d95b;this[_0x5a9a20(0x26f)](),this[_0x5a9a20(0x22e)](),this[_0x5a9a20(0x238)](),this[_0x5a9a20(0x21f)](),$gamePlayer[_0x5a9a20(0x2de)]();},Game_Map[_0x10d95b(0x2b1)][_0x10d95b(0x26f)]=function(){var _0x5d761d=_0x10d95b;const _0x125dd4=VisuMZ[_0x5d761d(0x2f2)][_0x5d761d(0x2e0)][_0x5d761d(0x297)];var _0x5780b1=_0x125dd4['Scale'],_0x5ac89f=_0x125dd4['Brightness'],_0x4980ed=_0x125dd4[_0x5d761d(0x2d5)];this['_brightEffectsBloomHorzScale']=undefined,this['_brightEffectsBloomVertScale']=undefined,this[_0x5d761d(0x1fb)]=undefined,this['_brightEffectsBloomVertBrightness']=undefined,this['_brightEffectsBloomHorzThreshold']=undefined,this['_brightEffectsBloomVertThreshold']=undefined;if($dataMap){if(_0x5d761d(0x2b0)!==_0x5d761d(0x2c1)){var _0x1fd6b2=$dataMap[_0x5d761d(0x204)]||'';if(_0x1fd6b2[_0x5d761d(0x271)](/<BLOOM SCALE: (.*)>/i))var _0x5780b1=Number(RegExp['$1'])||0x0;if(_0x1fd6b2[_0x5d761d(0x271)](/<BLOOM BRIGHTNESS: (.*)>/i)){if(_0x5d761d(0x2b5)!=='BZCwl')_0x45f551=_0x34afa1(_0x2aee25['$1'])||0x0;else var _0x5ac89f=Number(RegExp['$1'])||0x0;}if(_0x1fd6b2[_0x5d761d(0x271)](/<BLOOM THRESHOLD: (.*)>/i)){if(_0x5d761d(0x295)!==_0x5d761d(0x295))this[_0x5d761d(0x24a)]={'bloomScale':_0x2a3f29,'brightness':_0x3d51fd,'threshold':_0x253fb9,'duration':_0x14b967||0x0};else var _0x4980ed=Number(RegExp['$1'])||0x0;}_0x1fd6b2['match'](/<BLOOM (?:HORZ|HORIZONTAL) SCALE: (.*) TO (.*)>/i)&&(_0x5d761d(0x280)!==_0x5d761d(0x280)?this['setupBrightEffectsFilters']():(this[_0x5d761d(0x226)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this['_brightEffectsBloomVertScale']=undefined));_0x1fd6b2[_0x5d761d(0x271)](/<BLOOM (?:VERT|VERTICAL) SCALE: (.*) TO (.*)>/i)&&(this['_brightEffectsBloomHorzScale']=undefined,this[_0x5d761d(0x279)]=[Number(RegExp['$1']),Number(RegExp['$2'])]);_0x1fd6b2[_0x5d761d(0x271)](/<BLOOM (?:HORZ|HORIZONTAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this['_brightEffectsBloomHorzBrightness']=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x5d761d(0x265)]=undefined);_0x1fd6b2[_0x5d761d(0x271)](/<BLOOM (?:VERT|VERTICAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this['_brightEffectsBloomHorzBrightness']=undefined,this[_0x5d761d(0x265)]=[Number(RegExp['$1']),Number(RegExp['$2'])]);_0x1fd6b2[_0x5d761d(0x271)](/<BLOOM (?:HORZ|HORIZONTAL) THRESHOLD: (.*) TO (.*)>/i)&&(this['_brightEffectsBloomHorzThreshold']=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x5d761d(0x1f6)]=undefined);if(_0x1fd6b2['match'](/<BLOOM (?:VERT|VERTICAL) THRESHOLD: (.*) TO (.*)>/i)){if('CzXKa'===_0x5d761d(0x245)){_0x2a36f9['ConvertParams'](_0x1007b1,_0xb01e7a);_0x2e171f[_0x5d761d(0x278)]()?_0x40d947[_0x5d761d(0x21f)]():_0x37353c[_0x5d761d(0x21f)]();const _0x17fc8c=_0x3fe40f['getBrightEffectsTiltShiftSettings']();_0x17fc8c[_0x5d761d(0x216)]=_0x2a22a0[_0x5d761d(0x2e5)];}else this[_0x5d761d(0x1f8)]=undefined,this[_0x5d761d(0x1f6)]=[Number(RegExp['$1']),Number(RegExp['$2'])];}}else _0x2bbc7a[_0x5d761d(0x2f2)][_0x5d761d(0x253)][_0x5d761d(0x2f5)](this),_0x4aa966['setupBrightEffectsFilters']();}$gameScreen[_0x5d761d(0x2ef)](_0x5780b1,_0x5ac89f,_0x4980ed,0x0);},Game_Map[_0x10d95b(0x2b1)][_0x10d95b(0x22e)]=function(){var _0x5548f6=_0x10d95b;const _0x3acb19=VisuMZ[_0x5548f6(0x2f2)][_0x5548f6(0x2e0)][_0x5548f6(0x228)];var _0x2b5d5a=_0x3acb19['Visible'],_0x38c6d0=_0x3acb19[_0x5548f6(0x246)],_0x4c3aa3=_0x3acb19[_0x5548f6(0x290)],_0xcc7b39=_0x3acb19['Lacunarity'],_0x12fb0c=_0x3acb19[_0x5548f6(0x270)];this['_brightEffectsGodrayHorzSpeed']=undefined,this[_0x5548f6(0x2d7)]=undefined,this[_0x5548f6(0x227)]=undefined,this['_brightEffectsGodrayVertGain']=undefined,this[_0x5548f6(0x285)]=undefined,this['_brightEffectsGodrayVertLacunarity']=undefined,this[_0x5548f6(0x2f6)]=undefined,this[_0x5548f6(0x202)]=undefined;if($dataMap){var _0x4010dc=$dataMap['note']||'';if(_0x4010dc['match'](/<GODRAY>/i))_0x2b5d5a=!![];else _0x4010dc[_0x5548f6(0x271)](/<NO GODRAY>/i)&&(_0x2b5d5a=![]);_0x4010dc['match'](/<GODRAY SPEED: (.*)>/i)&&('gFXaB'===_0x5548f6(0x2e7)?(_0x4fb064[_0x5548f6(0x1fb)]=_0xa81b91,_0x272b91['_brightEffectsBloomVertBrightness']=_0xc69d2a):_0x38c6d0=Number(RegExp['$1'])||0x0);if(_0x4010dc['match'](/<GODRAY GAIN: (.*)>/i)){if('pYhIi'===_0x5548f6(0x23d))var _0x22f212=_0x1c7e54[_0x5548f6(0x1f6)][0x0],_0x5d5af2=_0x2e7a4f['_brightEffectsBloomVertThreshold'][0x1]-_0x22f212,_0x27843e=_0x3d43f5[_0x5548f6(0x2a0)]/_0x5d9edf[_0x5548f6(0x2bb)](),_0x23f561=_0x22f212+_0x5d5af2*_0x27843e;else _0x4c3aa3=Number(RegExp['$1'])||0x0;}_0x4010dc[_0x5548f6(0x271)](/<GODRAY LACUNARITY: (.*)>/i)&&(_0xcc7b39=Number(RegExp['$1'])||0x0),_0x4010dc[_0x5548f6(0x271)](/<GODRAY ANGLE: (.*)>/i)&&(_0x12fb0c=Number(RegExp['$1'])||0x0),_0x4010dc['match'](/<GODRAY (?:HORZ|HORIZONTAL) SPEED: (.*) TO (.*)>/i)&&(this['_brightEffectsGodrayHorzSpeed']=[Number(RegExp['$1']),Number(RegExp['$2'])],this['_brightEffectsGodrayVertSpeed']=undefined),_0x4010dc[_0x5548f6(0x271)](/<GODRAY (?:VERT|VERTICAL) SPEED: (.*) TO (.*)>/i)&&(this[_0x5548f6(0x229)]=undefined,this[_0x5548f6(0x2d7)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x4010dc[_0x5548f6(0x271)](/<GODRAY (?:HORZ|HORIZONTAL) GAIN: (.*) TO (.*)>/i)&&(this[_0x5548f6(0x227)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x5548f6(0x25d)]=undefined),_0x4010dc[_0x5548f6(0x271)](/<GODRAY (?:VERT|VERTICAL) GAIN: (.*) TO (.*)>/i)&&(this['_brightEffectsGodrayHorzGain']=undefined,this[_0x5548f6(0x25d)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x4010dc['match'](/<GODRAY (?:HORZ|HORIZONTAL) LACUNARITY: (.*) TO (.*)>/i)&&(this[_0x5548f6(0x285)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this['_brightEffectsGodrayVertLacunarity']=undefined),_0x4010dc[_0x5548f6(0x271)](/<GODRAY (?:VERT|VERTICAL) LACUNARITY: (.*) TO (.*)>/i)&&(this['_brightEffectsGodrayHorzLacunarity']=undefined,this['_brightEffectsGodrayVertLacunarity']=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x4010dc[_0x5548f6(0x271)](/<GODRAY (?:HORZ|HORIZONTAL) ANGLE: (.*) TO (.*)>/i)&&(_0x5548f6(0x2cd)===_0x5548f6(0x2a7)?(this[_0x5548f6(0x2f6)]=[_0x99053a(_0x154cd1['$1']),_0x2c6b9b(_0x5de7e6['$2'])],this[_0x5548f6(0x202)]=_0x4ea28d):(this['_brightEffectsGodrayHorzAngle']=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x5548f6(0x202)]=undefined)),_0x4010dc[_0x5548f6(0x271)](/<GODRAY (?:VERT|VERTICAL) ANGLE: (.*) TO (.*)>/i)&&(this[_0x5548f6(0x2f6)]=undefined,this[_0x5548f6(0x202)]=[Number(RegExp['$1']),Number(RegExp['$2'])]);}$gameScreen[_0x5548f6(0x257)](_0x2b5d5a,_0x38c6d0,_0x4c3aa3,_0xcc7b39,_0x12fb0c,0x0);},Game_Map[_0x10d95b(0x2b1)]['setupBrightEffectsColorAdjustFilter']=function(){var _0x1036c6=_0x10d95b;const _0x482269=VisuMZ['BrightEffects'][_0x1036c6(0x2e0)][_0x1036c6(0x262)];var _0x4ba19a=_0x482269[_0x1036c6(0x2c6)],_0x1f8f76=_0x482269[_0x1036c6(0x2d8)],_0x1562f6=_0x482269[_0x1036c6(0x2c4)];this[_0x1036c6(0x2a9)]=undefined,this[_0x1036c6(0x28c)]=undefined,this[_0x1036c6(0x209)]=undefined,this['_brightEffectsColorAdjustVertContrast']=undefined,this[_0x1036c6(0x223)]=undefined,this[_0x1036c6(0x287)]=undefined;if($dataMap){var _0xd5e73b=$dataMap['note']||'';if(_0xd5e73b[_0x1036c6(0x271)](/<COLOR ADJUST BRIGHTNESS: (.*)>/i)){if(_0x1036c6(0x20e)!=='fzcKV')this[_0x1036c6(0x229)]=[_0x27efdc(_0x388424['$1']),_0x530143(_0x562230['$2'])],this['_brightEffectsGodrayVertSpeed']=_0xd408e3;else var _0x4ba19a=Number(RegExp['$1'])||0x0;}if(_0xd5e73b['match'](/<COLOR ADJUST CONTRAST: (.*)>/i)){if(_0x1036c6(0x20a)===_0x1036c6(0x2b3))this[_0x1036c6(0x224)]={'brightness':_0x59a722,'contrast':_0x403203,'saturate':_0x192525,'duration':_0x190425||0x0};else var _0x1f8f76=Number(RegExp['$1'])||0x0;}if(_0xd5e73b['match'](/<COLOR ADJUST SATURATE: (.*)>/i)){if(_0x1036c6(0x1fd)!==_0x1036c6(0x2ab))var _0x1562f6=Number(RegExp['$1'])||0x0;else{const _0x5dee90=this[_0x1036c6(0x2c3)]()[_0x1036c6(0x261)];_0x5dee90['match'](/<(?:TILTSHIFT|TILT SHIFT) PIXEL BLUR:[ ](\d+)>/i)&&(_0x1ec3df=_0x3eddaa(_0x33db51['$1'])),_0x5dee90[_0x1036c6(0x271)](/<(?:TILTSHIFT|TILT SHIFT) (?:GRAD|GRADIENT) BLUR:[ ](\d+)>/i)&&(_0x4576d3=_0x1dafe2(_0x33ec0d['$1']));}}_0xd5e73b['match'](/<COLOR ADJUST (?:HORZ|HORIZONTAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this[_0x1036c6(0x2a9)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this['_brightEffectsColorAdjustVertBrightness']=undefined);if(_0xd5e73b[_0x1036c6(0x271)](/<COLOR ADJUST (?:VERT|VERTICAL) BRIGHTNESS: (.*) TO (.*)>/i)){if(_0x1036c6(0x299)===_0x1036c6(0x299))this[_0x1036c6(0x2a9)]=undefined,this[_0x1036c6(0x28c)]=[Number(RegExp['$1']),Number(RegExp['$2'])];else var _0x79fc54=_0x134be1(_0x44e19b['$1'])||0x0;}_0xd5e73b[_0x1036c6(0x271)](/<COLOR ADJUST (?:HORZ|HORIZONTAL) CONTRAST: (.*) TO (.*)>/i)&&(_0x1036c6(0x2a3)===_0x1036c6(0x2a3)?(this[_0x1036c6(0x209)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this['_brightEffectsColorAdjustVertContrast']=undefined):this[_0x1036c6(0x2cb)][_0x1036c6(0x28b)](this[_0x1036c6(0x29a)]));_0xd5e73b[_0x1036c6(0x271)](/<COLOR ADJUST (?:VERT|VERTICAL) CONTRAST: (.*) TO (.*)>/i)&&(this[_0x1036c6(0x209)]=undefined,this[_0x1036c6(0x2bf)]=[Number(RegExp['$1']),Number(RegExp['$2'])]);_0xd5e73b[_0x1036c6(0x271)](/<COLOR ADJUST (?:HORZ|HORIZONTAL) SATURATE: (.*) TO (.*)>/i)&&(this[_0x1036c6(0x223)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this['_brightEffectsColorAdjustVertSaturate']=undefined);if(_0xd5e73b[_0x1036c6(0x271)](/<COLOR ADJUST (?:VERT|VERTICAL) SATURATE: (.*) TO (.*)>/i)){if(_0x1036c6(0x207)!=='yzMyi')this[_0x1036c6(0x223)]=undefined,this['_brightEffectsColorAdjustVertSaturate']=[Number(RegExp['$1']),Number(RegExp['$2'])];else return _0x3fda99['height']/0x2;}}$gameScreen[_0x1036c6(0x215)](_0x4ba19a,_0x1f8f76,_0x1562f6,0x0);},Game_Map[_0x10d95b(0x2b1)][_0x10d95b(0x21f)]=function(){var _0x2a8612=_0x10d95b;const _0x4fddcf=VisuMZ[_0x2a8612(0x2f2)][_0x2a8612(0x2e0)][_0x2a8612(0x292)];let _0xefad7=_0x4fddcf[_0x2a8612(0x218)],_0x50a40d=_0x4fddcf[_0x2a8612(0x23e)];if($dataMap){if(_0x2a8612(0x21d)===_0x2a8612(0x26b)){if(!!this[_0x2a8612(0x1f4)]){var _0x307806=_0x58152f[_0x2a8612(0x22b)](),_0x1fa7a4=_0x307806['duration'];_0x1fa7a4<=0x0?(this[_0x2a8612(0x1f4)][_0x2a8612(0x2a6)]=_0x307806[_0x2a8612(0x2a6)],this[_0x2a8612(0x1f4)]['brightness']=_0x307806[_0x2a8612(0x27f)],this[_0x2a8612(0x1f4)]['threshold']=_0x307806[_0x2a8612(0x27b)]):(_0x307806['duration']--,this[_0x2a8612(0x1f4)]['bloomScale']=(this[_0x2a8612(0x1f4)][_0x2a8612(0x2a6)]*(_0x1fa7a4-0x1)+_0x307806[_0x2a8612(0x2a6)])/_0x1fa7a4,this[_0x2a8612(0x1f4)]['brightness']=(this[_0x2a8612(0x1f4)][_0x2a8612(0x27f)]*(_0x1fa7a4-0x1)+_0x307806[_0x2a8612(0x27f)])/_0x1fa7a4,this['_BrightEffectsAdvBloomFilter'][_0x2a8612(0x27b)]=(this['_BrightEffectsAdvBloomFilter'][_0x2a8612(0x27b)]*(_0x1fa7a4-0x1)+_0x307806['threshold'])/_0x1fa7a4);}}else{const _0x325e0f=$dataMap[_0x2a8612(0x204)]||'';_0x325e0f[_0x2a8612(0x271)](/<(?:TILTSHIFT|TILT SHIFT) PIXEL BLUR:[ ](\d+)>/i)&&(_0xefad7=Number(RegExp['$1'])),_0x325e0f[_0x2a8612(0x271)](/<(?:TILTSHIFT|TILT SHIFT) (?:GRAD|GRADIENT) BLUR:[ ](\d+)>/i)&&(_0x50a40d=Number(RegExp['$1']));}}$gameScreen[_0x2a8612(0x2f1)](_0xefad7,_0x50a40d,0x0);},VisuMZ[_0x10d95b(0x2f2)][_0x10d95b(0x296)]=Game_CharacterBase[_0x10d95b(0x2b1)][_0x10d95b(0x264)],Game_CharacterBase[_0x10d95b(0x2b1)][_0x10d95b(0x264)]=function(_0x4ea35f,_0x5cbc63){var _0x31c002=_0x10d95b;VisuMZ['BrightEffects'][_0x31c002(0x296)]['call'](this,_0x4ea35f,_0x5cbc63),this===$gamePlayer&&this[_0x31c002(0x2de)]();},VisuMZ[_0x10d95b(0x2f2)][_0x10d95b(0x293)]=Game_Player[_0x10d95b(0x2b1)]['update'],Game_Player['prototype']['update']=function(_0x432600){var _0x3b9de2=_0x10d95b;VisuMZ[_0x3b9de2(0x2f2)][_0x3b9de2(0x293)][_0x3b9de2(0x2f5)](this,_0x432600),this['updateMapBrightEffects']();},Game_Player[_0x10d95b(0x2b1)][_0x10d95b(0x2de)]=function(){var _0x2f9be3=_0x10d95b;if(ConfigManager[_0x2f9be3(0x2d9)]===![])return;this[_0x2f9be3(0x282)](),this[_0x2f9be3(0x2ac)](),this[_0x2f9be3(0x2eb)]();},Game_Player[_0x10d95b(0x2b1)]['updateMapBrightEffectsAdvBloom']=function(){var _0x1197cb=_0x10d95b,_0x5cdd76=$gameScreen[_0x1197cb(0x22b)](),_0x23835a=_0x5cdd76[_0x1197cb(0x2a6)],_0x2c40ce=_0x5cdd76[_0x1197cb(0x27f)],_0x137dc2=_0x5cdd76[_0x1197cb(0x27b)];if($gameMap[_0x1197cb(0x226)]!==undefined){if('AnbKs'!==_0x1197cb(0x2e9))var _0x265d90=_0xd0edb3['_brightEffectsGodrayVertLacunarity'][0x0],_0xcfc4c3=_0x430276[_0x1197cb(0x213)][0x1]-_0x265d90,_0x4eda77=_0x5f2489[_0x1197cb(0x2a0)]/_0x1cdb5d[_0x1197cb(0x2bb)](),_0x601587=_0x265d90+_0xcfc4c3*_0x4eda77;else var _0x1ccaca=$gameMap['_brightEffectsBloomHorzScale'][0x0],_0x294505=$gameMap['_brightEffectsBloomHorzScale'][0x1]-_0x1ccaca,_0x42aaee=$gamePlayer['_realX']/$gameMap['width'](),_0x23835a=_0x1ccaca+_0x294505*_0x42aaee;}else{if($gameMap[_0x1197cb(0x279)]!==undefined)var _0x1ccaca=$gameMap['_brightEffectsBloomVertScale'][0x0],_0x294505=$gameMap['_brightEffectsBloomVertScale'][0x1]-_0x1ccaca,_0x42aaee=$gamePlayer[_0x1197cb(0x2a0)]/$gameMap['height'](),_0x23835a=_0x1ccaca+_0x294505*_0x42aaee;}if($gameMap['_brightEffectsBloomHorzBrightness']!==undefined)var _0x1ccaca=$gameMap[_0x1197cb(0x1fb)][0x0],_0x294505=$gameMap[_0x1197cb(0x1fb)][0x1]-_0x1ccaca,_0x42aaee=$gamePlayer[_0x1197cb(0x286)]/$gameMap['width'](),_0x2c40ce=_0x1ccaca+_0x294505*_0x42aaee;else{if($gameMap['_brightEffectsBloomVertBrightness']!==undefined){if(_0x1197cb(0x2a8)==='jLuvO')var _0x1ccaca=$gameMap[_0x1197cb(0x265)][0x0],_0x294505=$gameMap[_0x1197cb(0x265)][0x1]-_0x1ccaca,_0x42aaee=$gamePlayer[_0x1197cb(0x2a0)]/$gameMap[_0x1197cb(0x2bb)](),_0x2c40ce=_0x1ccaca+_0x294505*_0x42aaee;else this['_BrightEffectsGodraySettingsMap']={'visible':_0x3e672e,'speed':_0x4733bd,'gain':_0x1d5930,'lacunarity':_0xff0376,'angle':_0x2fadfc,'duration':_0x101954||0x0};}}if($gameMap[_0x1197cb(0x1f8)]!==undefined)var _0x1ccaca=$gameMap['_brightEffectsBloomHorzThreshold'][0x0],_0x294505=$gameMap[_0x1197cb(0x1f8)][0x1]-_0x1ccaca,_0x42aaee=$gamePlayer[_0x1197cb(0x286)]/$gameMap[_0x1197cb(0x247)](),_0x137dc2=_0x1ccaca+_0x294505*_0x42aaee;else{if($gameMap['_brightEffectsBloomVertThreshold']!==undefined)var _0x1ccaca=$gameMap['_brightEffectsBloomVertThreshold'][0x0],_0x294505=$gameMap[_0x1197cb(0x1f6)][0x1]-_0x1ccaca,_0x42aaee=$gamePlayer[_0x1197cb(0x2a0)]/$gameMap['height'](),_0x137dc2=_0x1ccaca+_0x294505*_0x42aaee;}$gameScreen['setBrightEffectsAdvBloomSettings'](_0x23835a,_0x2c40ce,_0x137dc2,_0x5cdd76['duration']);},Game_Player['prototype'][_0x10d95b(0x2ac)]=function(){var _0x182f2f=_0x10d95b,_0xb893b6=$gameScreen[_0x182f2f(0x28d)](),_0x1c55f3=_0xb893b6['visible'],_0x485e79=_0xb893b6['speed'],_0xf8e94=_0xb893b6['gain'],_0x340526=_0xb893b6[_0x182f2f(0x2cc)],_0x5d27cc=_0xb893b6['angle'];if($gameMap['_brightEffectsGodrayHorzSpeed']!==undefined)var _0x1d3fbc=$gameMap['_brightEffectsGodrayHorzSpeed'][0x0],_0x2a194f=$gameMap[_0x182f2f(0x229)][0x1]-_0x1d3fbc,_0x406b6d=$gamePlayer['_realX']/$gameMap[_0x182f2f(0x247)](),_0x485e79=_0x1d3fbc+_0x2a194f*_0x406b6d;else{if($gameMap[_0x182f2f(0x279)]!==undefined)var _0x1d3fbc=$gameMap[_0x182f2f(0x2d7)][0x0],_0x2a194f=$gameMap[_0x182f2f(0x2d7)][0x1]-_0x1d3fbc,_0x406b6d=$gamePlayer[_0x182f2f(0x2a0)]/$gameMap['height'](),_0x485e79=_0x1d3fbc+_0x2a194f*_0x406b6d;}if($gameMap['_brightEffectsGodrayHorzGain']!==undefined)var _0x1d3fbc=$gameMap[_0x182f2f(0x227)][0x0],_0x2a194f=$gameMap[_0x182f2f(0x227)][0x1]-_0x1d3fbc,_0x406b6d=$gamePlayer[_0x182f2f(0x286)]/$gameMap['width'](),_0xf8e94=_0x1d3fbc+_0x2a194f*_0x406b6d;else{if($gameMap['_brightEffectsGodrayVertGain']!==undefined){if('zHiVR'===_0x182f2f(0x29e))this['_BrightEffectsTiltShiftSettingsBattle']={'pixelBlur':_0x1fa27c,'gradientBlur':_0x1db8df,'duration':_0x1c45e7||0x0};else var _0x1d3fbc=$gameMap['_brightEffectsGodrayVertGain'][0x0],_0x2a194f=$gameMap[_0x182f2f(0x25d)][0x1]-_0x1d3fbc,_0x406b6d=$gamePlayer[_0x182f2f(0x2a0)]/$gameMap['height'](),_0xf8e94=_0x1d3fbc+_0x2a194f*_0x406b6d;}}if($gameMap[_0x182f2f(0x285)]!==undefined)var _0x1d3fbc=$gameMap['_brightEffectsGodrayHorzLacunarity'][0x0],_0x2a194f=$gameMap['_brightEffectsGodrayHorzLacunarity'][0x1]-_0x1d3fbc,_0x406b6d=$gamePlayer[_0x182f2f(0x286)]/$gameMap['width'](),_0x340526=_0x1d3fbc+_0x2a194f*_0x406b6d;else{if($gameMap['_brightEffectsGodrayVertLacunarity']!==undefined){if(_0x182f2f(0x235)===_0x182f2f(0x2f0))this[_0x182f2f(0x29a)][_0x182f2f(0x24b)]=_0x598ace[_0x182f2f(0x24b)],this[_0x182f2f(0x29a)][_0x182f2f(0x268)]=_0x5e7817[_0x182f2f(0x268)],this[_0x182f2f(0x29a)][_0x182f2f(0x2cc)]=_0x100d2e[_0x182f2f(0x2cc)],this[_0x182f2f(0x29a)][_0x182f2f(0x2bd)]=_0x246b78[_0x182f2f(0x2bd)];else var _0x1d3fbc=$gameMap[_0x182f2f(0x213)][0x0],_0x2a194f=$gameMap[_0x182f2f(0x213)][0x1]-_0x1d3fbc,_0x406b6d=$gamePlayer[_0x182f2f(0x2a0)]/$gameMap[_0x182f2f(0x2bb)](),_0x340526=_0x1d3fbc+_0x2a194f*_0x406b6d;}}if($gameMap[_0x182f2f(0x2f6)]!==undefined){if(_0x182f2f(0x283)!=='YtaNq')var _0x1d3fbc=$gameMap[_0x182f2f(0x2f6)][0x0],_0x2a194f=$gameMap['_brightEffectsGodrayHorzAngle'][0x1]-_0x1d3fbc,_0x406b6d=$gamePlayer[_0x182f2f(0x286)]/$gameMap[_0x182f2f(0x247)](),_0x5d27cc=_0x1d3fbc+_0x2a194f*_0x406b6d;else{this[_0x182f2f(0x1f4)]=new _0x33f05d['filters'][(_0x182f2f(0x28a))]();this['brightEffectsBaseOnly']()?this[_0x182f2f(0x25f)][_0x182f2f(0x2cb)][_0x182f2f(0x28b)](this['_BrightEffectsAdvBloomFilter']):this[_0x182f2f(0x2cb)][_0x182f2f(0x28b)](this[_0x182f2f(0x1f4)]);var _0x25ff04=_0x4e1104[_0x182f2f(0x22b)]();_0x25ff04&&_0x25ff04['duration']>0x0&&(this[_0x182f2f(0x1f4)][_0x182f2f(0x2a6)]=_0x25ff04[_0x182f2f(0x2a6)],this[_0x182f2f(0x1f4)][_0x182f2f(0x27f)]=_0x25ff04[_0x182f2f(0x27f)],this[_0x182f2f(0x1f4)][_0x182f2f(0x27b)]=_0x25ff04[_0x182f2f(0x27b)]);}}else{if($gameMap[_0x182f2f(0x202)]!==undefined)var _0x1d3fbc=$gameMap['_brightEffectsGodrayVertAngle'][0x0],_0x2a194f=$gameMap[_0x182f2f(0x202)][0x1]-_0x1d3fbc,_0x406b6d=$gamePlayer[_0x182f2f(0x2a0)]/$gameMap[_0x182f2f(0x2bb)](),_0x5d27cc=_0x1d3fbc+_0x2a194f*_0x406b6d;}$gameScreen[_0x182f2f(0x257)](_0x1c55f3,_0x485e79,_0xf8e94,_0x340526,_0x5d27cc,_0xb893b6['duration']);},Game_Player[_0x10d95b(0x2b1)][_0x10d95b(0x2eb)]=function(){var _0xfeaec3=_0x10d95b,_0x3a8e48=$gameScreen[_0xfeaec3(0x26e)](),_0x55665a=_0x3a8e48[_0xfeaec3(0x27f)],_0x4d1be8=_0x3a8e48[_0xfeaec3(0x291)],_0x4bec98=_0x3a8e48['saturate'];if($gameMap[_0xfeaec3(0x2a9)]!==undefined)var _0xaf59a9=$gameMap[_0xfeaec3(0x2a9)][0x0],_0x2ca34e=$gameMap[_0xfeaec3(0x2a9)][0x1]-_0xaf59a9,_0x5030ab=$gamePlayer[_0xfeaec3(0x286)]/$gameMap[_0xfeaec3(0x247)](),_0x55665a=_0xaf59a9+_0x2ca34e*_0x5030ab;else{if($gameMap['_brightEffectsColorAdjustVertBrightness']!==undefined){if(_0xfeaec3(0x2a2)===_0xfeaec3(0x2a2))var _0xaf59a9=$gameMap[_0xfeaec3(0x28c)][0x0],_0x2ca34e=$gameMap[_0xfeaec3(0x28c)][0x1]-_0xaf59a9,_0x5030ab=$gamePlayer[_0xfeaec3(0x2a0)]/$gameMap[_0xfeaec3(0x2bb)](),_0x55665a=_0xaf59a9+_0x2ca34e*_0x5030ab;else _0x599ff6[_0xfeaec3(0x2be)]=_0x57c36b[_0xfeaec3(0x20c)],_0x29839b[_0xfeaec3(0x29c)]=_0x1b28ea[_0xfeaec3(0x2c0)];}}if($gameMap[_0xfeaec3(0x209)]!==undefined){if(_0xfeaec3(0x29b)===_0xfeaec3(0x29b))var _0xaf59a9=$gameMap['_brightEffectsColorAdjustHorzContrast'][0x0],_0x2ca34e=$gameMap[_0xfeaec3(0x209)][0x1]-_0xaf59a9,_0x5030ab=$gamePlayer[_0xfeaec3(0x286)]/$gameMap[_0xfeaec3(0x247)](),_0x4d1be8=_0xaf59a9+_0x2ca34e*_0x5030ab;else this[_0xfeaec3(0x25f)][_0xfeaec3(0x2cb)][_0xfeaec3(0x28b)](this['_BrightEffectsGodrayFilter']);}else{if($gameMap['_brightEffectsColorAdjustVertContrast']!==undefined)var _0xaf59a9=$gameMap[_0xfeaec3(0x2bf)][0x0],_0x2ca34e=$gameMap[_0xfeaec3(0x2bf)][0x1]-_0xaf59a9,_0x5030ab=$gamePlayer['_realY']/$gameMap[_0xfeaec3(0x2bb)](),_0x4d1be8=_0xaf59a9+_0x2ca34e*_0x5030ab;}if($gameMap['_brightEffectsColorAdjustHorzSaturate']!==undefined)var _0xaf59a9=$gameMap['_brightEffectsColorAdjustHorzSaturate'][0x0],_0x2ca34e=$gameMap[_0xfeaec3(0x223)][0x1]-_0xaf59a9,_0x5030ab=$gamePlayer[_0xfeaec3(0x286)]/$gameMap[_0xfeaec3(0x247)](),_0x4bec98=_0xaf59a9+_0x2ca34e*_0x5030ab;else{if($gameMap[_0xfeaec3(0x287)]!==undefined)var _0xaf59a9=$gameMap['_brightEffectsColorAdjustVertSaturate'][0x0],_0x2ca34e=$gameMap['_brightEffectsColorAdjustVertSaturate'][0x1]-_0xaf59a9,_0x5030ab=$gamePlayer[_0xfeaec3(0x2a0)]/$gameMap[_0xfeaec3(0x2bb)](),_0x4bec98=_0xaf59a9+_0x2ca34e*_0x5030ab;}$gameScreen[_0xfeaec3(0x215)](_0x55665a,_0x4d1be8,_0x4bec98,_0x3a8e48[_0xfeaec3(0x216)]);},Spriteset_Base[_0x10d95b(0x1f5)]=![],Spriteset_Map[_0x10d95b(0x1f5)]=VisuMZ['BrightEffects']['Settings'][_0x10d95b(0x2dd)],Spriteset_Battle[_0x10d95b(0x1f5)]=VisuMZ[_0x10d95b(0x2f2)][_0x10d95b(0x2e0)][_0x10d95b(0x25c)],Spriteset_Base[_0x10d95b(0x2b1)][_0x10d95b(0x241)]=function(){var _0x2d04cb=_0x10d95b;return Spriteset_Base[_0x2d04cb(0x1f5)];},Spriteset_Map['prototype'][_0x10d95b(0x241)]=function(){var _0x526a85=_0x10d95b;return Spriteset_Map[_0x526a85(0x1f5)];},Spriteset_Battle[_0x10d95b(0x2b1)][_0x10d95b(0x241)]=function(){var _0x37d1e3=_0x10d95b;return Spriteset_Battle[_0x37d1e3(0x1f5)];},VisuMZ[_0x10d95b(0x2f2)]['Spriteset_Base_createOverallFilters']=Spriteset_Base[_0x10d95b(0x2b1)][_0x10d95b(0x2c7)],Spriteset_Base[_0x10d95b(0x2b1)][_0x10d95b(0x2c7)]=function(){var _0x44bbfe=_0x10d95b;VisuMZ[_0x44bbfe(0x2f2)][_0x44bbfe(0x276)][_0x44bbfe(0x2f5)](this),this[_0x44bbfe(0x250)]();},VisuMZ['BrightEffects']['Spriteset_Base_update']=Spriteset_Base[_0x10d95b(0x2b1)][_0x10d95b(0x289)],Spriteset_Base[_0x10d95b(0x2b1)][_0x10d95b(0x289)]=function(){var _0x23b910=_0x10d95b;VisuMZ[_0x23b910(0x2f2)][_0x23b910(0x27e)]['call'](this),this[_0x23b910(0x2b2)]();},Spriteset_Map[_0x10d95b(0x2b1)][_0x10d95b(0x200)]=function(){var _0x10ef12=_0x10d95b;const _0x1ee902=$gameScreen['zoomScale']();let _0x59ad7a=0x0;if(Imported[_0x10ef12(0x2af)]&&$gameScreen[_0x10ef12(0x272)]()[_0x10ef12(0x2e8)])_0x59ad7a=Graphics[_0x10ef12(0x2bb)]/0x2,_0x59ad7a-=$gameMap[_0x10ef12(0x269)]()*0.5*_0x1ee902;else{if(_0x10ef12(0x214)!==_0x10ef12(0x232)){const _0x4f95b4=Imported['VisuMZ_3_MapCameraZoom']?$gameScreen[_0x10ef12(0x2b9)](!![]):$gamePlayer,_0x214350=this[_0x10ef12(0x263)](_0x4f95b4);_0x59ad7a=_0x4f95b4['screenY']()*_0x1ee902,_0x59ad7a-=_0x214350['height']*0.5,_0x59ad7a-=_0x4f95b4[_0x10ef12(0x243)]()*_0x1ee902*0.5;}else{if(!_0x4faa27[_0x10ef12(0x2cb)][_0x10ef12(0x2b8)])return;const _0x51bded=new _0x436beb['filters'][(_0x10ef12(0x2b8))]();this[_0x10ef12(0x273)]=_0x51bded;this[_0x10ef12(0x241)]()?this[_0x10ef12(0x25f)][_0x10ef12(0x2cb)]['push'](_0x51bded):this[_0x10ef12(0x2cb)]['push'](_0x51bded);var _0x54dd2d=_0x51534b[_0x10ef12(0x24e)]();_0x54dd2d&&_0x54dd2d['duration']>0x0&&(_0x51bded[_0x10ef12(0x2be)]=_0x54dd2d[_0x10ef12(0x20c)],_0x51bded[_0x10ef12(0x29c)]=_0x54dd2d[_0x10ef12(0x2c0)]);}}return _0x59ad7a;},Spriteset_Base[_0x10d95b(0x2b1)]['getMapEnhanceScreenY']=function(){var _0x385494=_0x10d95b;return Graphics[_0x385494(0x2bb)]/0x2;},Spriteset_Base[_0x10d95b(0x2b1)][_0x10d95b(0x250)]=function(){var _0x5ad163=_0x10d95b;if(ConfigManager[_0x5ad163(0x2d9)]===![])return;this[_0x5ad163(0x2cb)]=this[_0x5ad163(0x2cb)]||[],this[_0x5ad163(0x2ed)](),this['createBrightEffectsGodrayFilter'](),this[_0x5ad163(0x225)](),this[_0x5ad163(0x2d3)](),this[_0x5ad163(0x2b2)]();},Spriteset_Base[_0x10d95b(0x2b1)]['updateBrightEffectsFilters']=function(){var _0x2fcb35=_0x10d95b;this[_0x2fcb35(0x294)](),this[_0x2fcb35(0x2d1)](),this[_0x2fcb35(0x25a)](),this['updateBrightEffectsTiltShiftFilter']();},Spriteset_Base[_0x10d95b(0x2b1)][_0x10d95b(0x2ed)]=function(){var _0x5aeb72=_0x10d95b;this['_BrightEffectsAdvBloomFilter']=new PIXI['filters'][(_0x5aeb72(0x28a))]();if(this[_0x5aeb72(0x241)]()){if(_0x5aeb72(0x21b)!=='ungrD')var _0x591629=_0x4b3b1d['_brightEffectsBloomVertBrightness'][0x0],_0x574f32=_0x593a4e[_0x5aeb72(0x265)][0x1]-_0x591629,_0x360c04=_0x37e54d[_0x5aeb72(0x2a0)]/_0x307c83[_0x5aeb72(0x2bb)](),_0x14711f=_0x591629+_0x574f32*_0x360c04;else this[_0x5aeb72(0x25f)][_0x5aeb72(0x2cb)][_0x5aeb72(0x28b)](this[_0x5aeb72(0x1f4)]);}else this[_0x5aeb72(0x2cb)]['push'](this['_BrightEffectsAdvBloomFilter']);var _0x4a424a=$gameScreen[_0x5aeb72(0x22b)]();_0x4a424a&&_0x4a424a['duration']>0x0&&(this['_BrightEffectsAdvBloomFilter'][_0x5aeb72(0x2a6)]=_0x4a424a['bloomScale'],this['_BrightEffectsAdvBloomFilter']['brightness']=_0x4a424a[_0x5aeb72(0x27f)],this['_BrightEffectsAdvBloomFilter'][_0x5aeb72(0x27b)]=_0x4a424a[_0x5aeb72(0x27b)]);},Spriteset_Base[_0x10d95b(0x2b1)]['updateBrightEffectsAdvBloomFilter']=function(){var _0x54de9a=_0x10d95b;if(!!this[_0x54de9a(0x1f4)]){var _0x3059f2=$gameScreen['getBrightEffectsAdvBloomSettings'](),_0x86a4f9=_0x3059f2[_0x54de9a(0x216)];if(_0x86a4f9<=0x0){if(_0x54de9a(0x20b)!==_0x54de9a(0x251))this['_BrightEffectsAdvBloomFilter'][_0x54de9a(0x2a6)]=_0x3059f2[_0x54de9a(0x2a6)],this['_BrightEffectsAdvBloomFilter'][_0x54de9a(0x27f)]=_0x3059f2[_0x54de9a(0x27f)],this[_0x54de9a(0x1f4)][_0x54de9a(0x27b)]=_0x3059f2['threshold'];else{if(_0x244980[_0x54de9a(0x2d9)]===![])return;this[_0x54de9a(0x2cb)]=this['filters']||[],this[_0x54de9a(0x2ed)](),this[_0x54de9a(0x2dc)](),this['createBrightEffectsColorAdjustFilter'](),this[_0x54de9a(0x2d3)](),this[_0x54de9a(0x2b2)]();}}else _0x3059f2[_0x54de9a(0x216)]--,this['_BrightEffectsAdvBloomFilter']['bloomScale']=(this[_0x54de9a(0x1f4)][_0x54de9a(0x2a6)]*(_0x86a4f9-0x1)+_0x3059f2[_0x54de9a(0x2a6)])/_0x86a4f9,this[_0x54de9a(0x1f4)][_0x54de9a(0x27f)]=(this['_BrightEffectsAdvBloomFilter'][_0x54de9a(0x27f)]*(_0x86a4f9-0x1)+_0x3059f2[_0x54de9a(0x27f)])/_0x86a4f9,this[_0x54de9a(0x1f4)][_0x54de9a(0x27b)]=(this[_0x54de9a(0x1f4)][_0x54de9a(0x27b)]*(_0x86a4f9-0x1)+_0x3059f2[_0x54de9a(0x27b)])/_0x86a4f9;}},Spriteset_Base['prototype']['createBrightEffectsGodrayFilter']=function(){var _0x354492=_0x10d95b;this[_0x354492(0x29a)]=new PIXI[(_0x354492(0x2cb))][(_0x354492(0x1fa))](),this[_0x354492(0x29a)][_0x354492(0x2e6)]=![],this[_0x354492(0x29a)][_0x354492(0x26d)]=0x0;if(this[_0x354492(0x241)]()){if(_0x354492(0x2c5)!==_0x354492(0x2c5)){_0x1aadd8[_0x354492(0x1f9)](_0x31e960,_0x26d678);_0x197808[_0x354492(0x278)]()?_0x2749b4[_0x354492(0x22e)]():_0x58fb9a[_0x354492(0x22e)]();const _0x3c30c3=_0x4d984d[_0x354492(0x28d)]();_0x3c30c3[_0x354492(0x216)]=_0x5ee50f['Duration'];}else this[_0x354492(0x25f)][_0x354492(0x2cb)]['push'](this['_BrightEffectsGodrayFilter']);}else{if(_0x354492(0x2ca)!==_0x354492(0x2ca)){_0x523fa3[_0x354492(0x1f9)](_0x52b1c1,_0x159e78);_0x42f009[_0x354492(0x278)]()?_0x6a957d['setupBrightEffectsColorAdjustFilter']():_0x3343a8[_0x354492(0x238)]();const _0x659fe0=_0x830759['getBrightEffectsColorAdjustSettings']();_0x659fe0[_0x354492(0x216)]=_0x44d925[_0x354492(0x2e5)];}else this[_0x354492(0x2cb)][_0x354492(0x28b)](this[_0x354492(0x29a)]);}var _0x19e3a9=$gameScreen[_0x354492(0x28d)]();_0x19e3a9&&_0x19e3a9[_0x354492(0x216)]>0x0&&(this[_0x354492(0x29a)][_0x354492(0x24b)]=_0x19e3a9[_0x354492(0x24b)],this['_BrightEffectsGodrayFilter'][_0x354492(0x268)]=_0x19e3a9[_0x354492(0x268)],this[_0x354492(0x29a)][_0x354492(0x2cc)]=_0x19e3a9['lacunarity'],this[_0x354492(0x29a)][_0x354492(0x2bd)]=_0x19e3a9['angle']);},Spriteset_Base[_0x10d95b(0x2b1)][_0x10d95b(0x2d1)]=function(){var _0x40c5e1=_0x10d95b;if(!!this[_0x40c5e1(0x29a)]){if(_0x40c5e1(0x2ec)===_0x40c5e1(0x2ec)){var _0x430950=$gameScreen[_0x40c5e1(0x28d)](),_0x14bcd7=_0x430950[_0x40c5e1(0x216)];if(_0x14bcd7<=0x0){if(_0x40c5e1(0x2aa)!==_0x40c5e1(0x27c))this['_BrightEffectsGodrayFilter']['speed']=_0x430950[_0x40c5e1(0x24b)],this[_0x40c5e1(0x29a)]['gain']=_0x430950[_0x40c5e1(0x268)],this[_0x40c5e1(0x29a)]['lacunarity']=_0x430950[_0x40c5e1(0x2cc)],this[_0x40c5e1(0x29a)]['angle']=_0x430950['angle'];else var _0x9f76bd=_0x1b7833[_0x40c5e1(0x25d)][0x0],_0x46a59f=_0x55855b['_brightEffectsGodrayVertGain'][0x1]-_0x9f76bd,_0x531753=_0xdaf428[_0x40c5e1(0x2a0)]/_0x84ed9e[_0x40c5e1(0x2bb)](),_0x290f80=_0x9f76bd+_0x46a59f*_0x531753;}else _0x430950[_0x40c5e1(0x216)]--,this[_0x40c5e1(0x29a)]['speed']=(this['_BrightEffectsGodrayFilter'][_0x40c5e1(0x24b)]*(_0x14bcd7-0x1)+_0x430950['speed'])/_0x14bcd7,this[_0x40c5e1(0x29a)][_0x40c5e1(0x268)]=(this[_0x40c5e1(0x29a)][_0x40c5e1(0x268)]*(_0x14bcd7-0x1)+_0x430950[_0x40c5e1(0x268)])/_0x14bcd7,this[_0x40c5e1(0x29a)][_0x40c5e1(0x2cc)]=(this['_BrightEffectsGodrayFilter'][_0x40c5e1(0x2cc)]*(_0x14bcd7-0x1)+_0x430950[_0x40c5e1(0x2cc)])/_0x14bcd7,this['_BrightEffectsGodrayFilter'][_0x40c5e1(0x2bd)]=(this['_BrightEffectsGodrayFilter'][_0x40c5e1(0x2bd)]*(_0x14bcd7-0x1)+_0x430950['angle'])/_0x14bcd7;this[_0x40c5e1(0x29a)][_0x40c5e1(0x26d)]+=this[_0x40c5e1(0x29a)]['speed'],this[_0x40c5e1(0x29a)][_0x40c5e1(0x2e6)]=_0x430950[_0x40c5e1(0x206)];}else _0x222e9e['isSceneBattle']()?this['_BrightEffectsColorAdjustSettingsBattle']={'brightness':_0x4e214b,'contrast':_0x5affab,'saturate':_0x55a5ac,'duration':_0x251b97||0x0}:this['_BrightEffectsColorAdjustSettingsMap']={'brightness':_0x111f4c,'contrast':_0x18bbb5,'saturate':_0x515715,'duration':_0x3af90e||0x0};}},Spriteset_Base[_0x10d95b(0x2b1)]['createBrightEffectsColorAdjustFilter']=function(){var _0x1d5ced=_0x10d95b;this[_0x1d5ced(0x217)]=new PIXI['filters'][(_0x1d5ced(0x2b6))]();if(this[_0x1d5ced(0x241)]())_0x1d5ced(0x274)===_0x1d5ced(0x205)?_0x26f12c=!![]:this[_0x1d5ced(0x25f)]['filters']['push'](this[_0x1d5ced(0x217)]);else{if(_0x1d5ced(0x220)===_0x1d5ced(0x220))this[_0x1d5ced(0x2cb)]['push'](this[_0x1d5ced(0x217)]);else{const _0x3cd1f6=_0x4576db[_0x1d5ced(0x204)]||'';_0x3cd1f6[_0x1d5ced(0x271)](/<(?:TILTSHIFT|TILT SHIFT) PIXEL BLUR:[ ](\d+)>/i)&&(_0x951eba=_0x3802c9(_0x2e50eb['$1'])),_0x3cd1f6[_0x1d5ced(0x271)](/<(?:TILTSHIFT|TILT SHIFT) (?:GRAD|GRADIENT) BLUR:[ ](\d+)>/i)&&(_0x432b85=_0x86746c(_0x5af8ac['$1']));}}var _0x4cc5f8=$gameScreen[_0x1d5ced(0x26e)]();_0x4cc5f8&&_0x4cc5f8[_0x1d5ced(0x216)]>0x0&&(_0x1d5ced(0x277)!=='Eslzc'?_0x46c611=![]:(this[_0x1d5ced(0x217)][_0x1d5ced(0x240)]=_0x4cc5f8[_0x1d5ced(0x27f)],this[_0x1d5ced(0x217)][_0x1d5ced(0x23f)]=_0x4cc5f8[_0x1d5ced(0x291)],this['_BrightEffectsColorAdjustFilter']['currentSaturate']=_0x4cc5f8[_0x1d5ced(0x208)]));},Spriteset_Base['prototype'][_0x10d95b(0x25a)]=function(){var _0x4956a9=_0x10d95b;if(!!this['_BrightEffectsColorAdjustFilter']){if(_0x4956a9(0x2d0)!=='zjvjY'){var _0x53e392=$gameScreen[_0x4956a9(0x26e)](),_0xf4623=_0x53e392['duration'];_0xf4623<=0x0?(this[_0x4956a9(0x217)][_0x4956a9(0x240)]=_0x53e392[_0x4956a9(0x27f)],this[_0x4956a9(0x217)][_0x4956a9(0x23f)]=_0x53e392[_0x4956a9(0x291)],this['_BrightEffectsColorAdjustFilter']['currentSaturate']=_0x53e392[_0x4956a9(0x208)]):(_0x53e392[_0x4956a9(0x216)]--,this[_0x4956a9(0x217)][_0x4956a9(0x240)]=(this[_0x4956a9(0x217)][_0x4956a9(0x240)]*(_0xf4623-0x1)+_0x53e392[_0x4956a9(0x27f)])/_0xf4623,this[_0x4956a9(0x217)][_0x4956a9(0x23f)]=(this[_0x4956a9(0x217)][_0x4956a9(0x23f)]*(_0xf4623-0x1)+_0x53e392[_0x4956a9(0x291)])/_0xf4623,this[_0x4956a9(0x217)][_0x4956a9(0x21c)]=(this['_BrightEffectsColorAdjustFilter']['currentSaturate']*(_0xf4623-0x1)+_0x53e392[_0x4956a9(0x208)])/_0xf4623),this['_BrightEffectsColorAdjustFilter'][_0x4956a9(0x27f)](this[_0x4956a9(0x217)]['currentBrightness']),this['_BrightEffectsColorAdjustFilter']['contrast'](this[_0x4956a9(0x217)][_0x4956a9(0x23f)],!![]),this[_0x4956a9(0x217)][_0x4956a9(0x208)](this[_0x4956a9(0x217)][_0x4956a9(0x21c)],!![]);}else _0x46fc4b[_0x4956a9(0x26f)]();}},Spriteset_Base[_0x10d95b(0x2b1)][_0x10d95b(0x2d3)]=function(){var _0x267193=_0x10d95b;if(!PIXI[_0x267193(0x2cb)]['TiltShiftFilter'])return;const _0x270196=new PIXI[(_0x267193(0x2cb))]['TiltShiftFilter']();this['_BrightEffectsTiltShiftFilter']=_0x270196;this['brightEffectsBaseOnly']()?_0x267193(0x1ff)!==_0x267193(0x1ff)?(_0x12b087[_0x267193(0x229)]=_0x23db8d,_0x518213[_0x267193(0x2d7)]=_0xbb117e):this['_baseSprite'][_0x267193(0x2cb)][_0x267193(0x28b)](_0x270196):this[_0x267193(0x2cb)]['push'](_0x270196);var _0x54fee2=$gameScreen[_0x267193(0x24e)]();_0x54fee2&&_0x54fee2['duration']>0x0&&(_0x270196[_0x267193(0x2be)]=_0x54fee2[_0x267193(0x20c)],_0x270196[_0x267193(0x29c)]=_0x54fee2['gradientBlur']);},Spriteset_Base[_0x10d95b(0x2b1)][_0x10d95b(0x284)]=function(){var _0x44b7b8=_0x10d95b;if(!this[_0x44b7b8(0x273)])return;const _0x523991=this[_0x44b7b8(0x200)]()+0.5;this[_0x44b7b8(0x2c2)](_0x523991),this['updateBrightEffectsTiltShiftFilterProperties']();},Spriteset_Base['prototype'][_0x10d95b(0x2c2)]=function(_0x46aec5){var _0x45b0b8=_0x10d95b;const _0x1c9dbe=0x4;if(this[_0x45b0b8(0x273)][_0x45b0b8(0x22c)]['y']>_0x46aec5){if(_0x45b0b8(0x281)==='GiQho')return this[_0x45b0b8(0x2e1)]===_0x172be1&&_0x20aa49['setupBrightEffectsTiltShiftFilter'](),this['_BrightEffectsTiltShiftSettingsBattle'];else this[_0x45b0b8(0x273)][_0x45b0b8(0x22c)]={'x':0x0,'y':Math[_0x45b0b8(0x2ba)](this[_0x45b0b8(0x273)][_0x45b0b8(0x22c)]['y']-_0x1c9dbe,_0x46aec5)},this['_BrightEffectsTiltShiftFilter'][_0x45b0b8(0x298)]={'x':0x258,'y':Math[_0x45b0b8(0x2ba)](this[_0x45b0b8(0x273)][_0x45b0b8(0x298)]['y']-_0x1c9dbe,_0x46aec5)};}else this[_0x45b0b8(0x273)]['start']['y']<_0x46aec5&&(this['_BrightEffectsTiltShiftFilter'][_0x45b0b8(0x22c)]={'x':0x0,'y':Math['min'](this['_BrightEffectsTiltShiftFilter'][_0x45b0b8(0x22c)]['y']+_0x1c9dbe,_0x46aec5)},this[_0x45b0b8(0x273)]['end']={'x':0x258,'y':Math[_0x45b0b8(0x2d2)](this[_0x45b0b8(0x273)]['end']['y']+_0x1c9dbe,_0x46aec5)});},Spriteset_Base[_0x10d95b(0x2b1)][_0x10d95b(0x2e4)]=function(){var _0x383fd1=_0x10d95b;const _0x2d97d8=this[_0x383fd1(0x273)];var _0x49301e=$gameScreen[_0x383fd1(0x24e)](),_0x1f9573=_0x49301e['duration'];if(_0x1f9573<=0x0){if(_0x383fd1(0x2e3)===_0x383fd1(0x2ea))var _0x42696b=_0x1963f9(_0x197fef['$1'])||0x0;else _0x2d97d8[_0x383fd1(0x2be)]=_0x49301e[_0x383fd1(0x20c)],_0x2d97d8['currentGradientBlur']=_0x49301e[_0x383fd1(0x2c0)];}else _0x49301e['duration']--,_0x2d97d8[_0x383fd1(0x2be)]=(_0x2d97d8['currentPixelBlur']*(_0x1f9573-0x1)+_0x49301e[_0x383fd1(0x20c)])/_0x1f9573,_0x2d97d8[_0x383fd1(0x29c)]=(_0x2d97d8[_0x383fd1(0x29c)]*(_0x1f9573-0x1)+_0x49301e[_0x383fd1(0x2c0)])/_0x1f9573;_0x2d97d8['blur']=_0x2d97d8['currentPixelBlur'],_0x2d97d8['gradientBlur']=_0x2d97d8['currentGradientBlur'];};
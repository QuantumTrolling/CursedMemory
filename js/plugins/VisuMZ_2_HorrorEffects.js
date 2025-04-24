//=============================================================================
// VisuStella MZ - HorrorEffects
// VisuMZ_2_HorrorEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_HorrorEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.HorrorEffects = VisuMZ.HorrorEffects || {};
VisuMZ.HorrorEffects.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.02] [HorrorEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Horror_Effects_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * This is a plugin for RPG Maker MZ that will allow you to add visual horror
 * effects to your game's title screen, maps, events, pictures, battle, etc.
 * You can turn on individual effects at a time or multiple simultaneously. The
 * effects include a noise effect, a glitch effect, and a TV effect, which is
 * commonly seen used in most horror films. Now, you can use these effects in
 * RPG Maker MZ, too!
 *
 * Features include all (but not limited to) the following:
 * 
 * * A noise effect filter which creates specks of dots on the screen that
 *   can obscure it at various intensity rates.
 * * A glitch effect that will cause the screen to tear at custom intervals of
 *   varying frequency and strength.
 * * A TV effect that imitates the display of a cathode ray tube television
 *   with animated lines that travel across the screen at a determined speed.
 * * Apply these effects to the map screen, battle screen, title screen, and/or
 *   various entities on the screen such as events, pictures, actors, and
 *   enemies.
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
 * Noise
 * 
 * The noise effect will cause specks of light that obscure the image the
 * filter is applied to. The intensity rate of the noise will make the image
 * more obscure and harder to see.
 *
 * ---
 *
 * Glitch
 * 
 * The glitch effect will cause bits of the screen to break up into various
 * pieces. These can be tied to a frequency and strength level that can control
 * how often the glitch effect occurs on screen.
 *
 * ---
 *
 * TV
 * 
 * This will create TV lines akin to a cathode ray tube television. The lines
 * will move vertically across the screen. These lines can have their thickness
 * levels changed and the speed at which the lines travel can also be altered.
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
 * VisuMZ_1_BattleCore
 *
 * The Horror Effects will also be available as Action Sequences in the
 * Battle Core's Action Sequence Plugin Commands. The Horror Action Sequences
 * will make use of the Battle Core's targeting system for more accurate
 * control over who and what to apply the Horror Effects for.
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
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Battle Plugin Commands ===
 * 
 * ---
 *
 * Battle: Clear All Filters
 * - Clear all Horror Effects filters on the main battle screen.
 *
 * ---
 * 
 * Battle: Color Effect Create
 * - Creates the color effect on the main battle screen.
 * 
 *   Type:
 *   - Select the Color Effect type.
 *   - Normal, Bizarro, BlackAndWhite, Browni, Desaturate, Greyscale,
 *     Kodachrome, LSD, Negative, Polaroid, Predator, Sepia, Technicolor,
 *     and Vintage
 * 
 * ---
 * 
 * Battle: Color Effect Remove
 * - Removes the color effect on the main battle screen.
 * 
 * ---
 *
 * Battle: Glitch Create
 * - Creates the glitch effect on the main battle screen.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Battle: Glitch Remove
 * - Removes the glitch effect on the main battle screen.
 *
 * ---
 *
 * Battle: Noise Create
 * - Creates the noise effect on the main battle screen.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Battle: Noise Remove
 * - Removes the noise effect on the main battle screen.
 *
 * ---
 *
 * Battle: TV Create
 * - Creates the TV effect on the main battle screen.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Battle: TV Remove
 * - Removes the TV effect on the main battle screen.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 *
 * Map: Clear All Filters
 * - Clear all Horror Effects filters on the main map screen.
 *
 * ---
 * 
 * Map: Color Effect Create
 * - Creates the color effect on the main map screen.
 * 
 *   Type:
 *   - Select the Color Effect type.
 *   - Normal, Bizarro, BlackAndWhite, Browni, Desaturate, Greyscale,
 *     Kodachrome, LSD, Negative, Polaroid, Predator, Sepia, Technicolor,
 *     and Vintage
 * 
 * ---
 * 
 * Map: Color Effect Remove
 * - Removes the color effect on the main map screen.
 * 
 * ---
 *
 * Map: Glitch Create
 * - Creates the glitch effect on the main map screen.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Map: Glitch Remove
 * - Removes the glitch effect on the main map screen.
 *
 * ---
 *
 * Map: Noise Create
 * - Creates the noise effect on the main battle screen.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Map: Noise Remove
 * - Removes the noise effect on the main map screen.
 *
 * ---
 *
 * Map: TV Create
 * - Creates the TV effect on the main map screen.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Map: TV Remove
 * - Removes the TV effect on the main map screen.
 *
 * ---
 * 
 * === Event Plugin Commands ===
 * 
 * ---
 *
 * Event: Clear All Filters
 * - Clear all Horror Effects filters on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to clear horror effects from.
 *   - Use "0" for "this" event.
 *
 * ---
 * 
 * Event: Color Effect Create
 * - Creates the color effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to create the horror effects for.
 *   - Use "0" for "this" event.
 * 
 *   Type:
 *   - Select the Color Effect type.
 *   - Normal, Bizarro, BlackAndWhite, Browni, Desaturate, Greyscale,
 *     Kodachrome, LSD, Negative, Polaroid, Predator, Sepia, Technicolor,
 *     and Vintage
 * 
 * ---
 * 
 * Event: Color Effect Remove
 * - Removes the color effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to the horror effect from.
 *   - Use "0" for "this" event.
 * 
 * ---
 *
 * Event: Glitch Create
 * - Creates the glitch effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to create the horror effects for.
 *   - Use "0" for "this" event.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Event: Glitch Remove
 * - Removes the glitch effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to the horror effect from.
 *   - Use "0" for "this" event.
 *
 * ---
 *
 * Event: Noise Create
 * - Creates the noise effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to create the horror effects for.
 *   - Use "0" for "this" event.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Event: Noise Remove
 * - Removes the noise effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to the horror effect from.
 *   - Use "0" for "this" event.
 *
 * ---
 *
 * Event: TV Create
 * - Creates the TV effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to create the horror effects for.
 *   - Use "0" for "this" event.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Event: TV Remove
 * - Removes the TV effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to the horror effect from.
 *   - Use "0" for "this" event.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Clear All Filters
 * - Clear all Horror Effects filters on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to clear horror effects from.
 *   - The ID is a number from 1 to 100.
 *
 * ---
 * 
 * Picture: Color Effect Create
 * - Creates the color effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to create the horror effects for.
 *   - The ID is a number from 1 to 100.
 * 
 *   Type:
 *   - Select the Color Effect type.
 *   - Normal, Bizarro, BlackAndWhite, Browni, Desaturate, Greyscale,
 *     Kodachrome, LSD, Negative, Polaroid, Predator, Sepia, Technicolor,
 *     and Vintage
 * 
 * ---
 * 
 * Picture: Color Effect Remove
 * - Removes the color effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to the horror effect from.
 *   - The ID is a number from 1 to 100.
 * 
 * ---
 *
 * Picture: Glitch Create
 * - Creates the glitch effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to create the horror effects for.
 *   - The ID is a number from 1 to 100.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Picture: Glitch Remove
 * - Removes the glitch effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to the horror effect from.
 *   - The ID is a number from 1 to 100.
 *
 * ---
 *
 * Picture: Noise Create
 * - Creates the noise effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to create the horror effects for.
 *   - The ID is a number from 1 to 100.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Picture: Noise Remove
 * - Removes the noise effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to the horror effect from.
 *   - The ID is a number from 1 to 100.
 *
 * ---
 *
 * Picture: TV Create
 * - Creates the TV effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to create the horror effects for.
 *   - The ID is a number from 1 to 100.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Picture: TV Remove
 * - Removes the TV effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to the horror effect from.
 *   - The ID is a number from 1 to 100.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Clear All Filters
 * - Clear all Horror Effects filters on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to clear horror effects from.
 *
 * ---
 * 
 * Actor: Color Effect Create
 * - Creates the color effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to create the horror effects for.
 * 
 *   Type:
 *   - Select the Color Effect type.
 *   - Normal, Bizarro, BlackAndWhite, Browni, Desaturate, Greyscale,
 *     Kodachrome, LSD, Negative, Polaroid, Predator, Sepia, Technicolor,
 *     and Vintage
 * 
 * ---
 * 
 * Actor: Color Effect Remove
 * - Removes the color effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to the horror effect from.
 * 
 * ---
 *
 * Actor: Glitch Create
 * - Creates the glitch effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to create the horror effects for.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Actor: Glitch Remove
 * - Removes the glitch effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to the horror effect from.
 *
 * ---
 *
 * Actor: Noise Create
 * - Creates the noise effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to create the horror effects for.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Actor: Noise Remove
 * - Removes the noise effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to the horror effect from.
 *
 * ---
 *
 * Actor: TV Create
 * - Creates the TV effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to create the horror effects for.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Actor: TV Remove
 * - Removes the TV effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to the horror effect from.
 *
 * ---
 * 
 * === Party Plugin Commands ===
 * 
 * ---
 *
 * Party: Clear All Filters
 * - Clear all Horror Effects filters on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to clear horror effects from.
 *   - Index values start at 0.
 *
 * ---
 * 
 * Party: Color Effect Create
 * - Creates the color effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to create the horror effects for.
 *   - Index values start at 0.
 * 
 *   Type:
 *   - Select the Color Effect type.
 *   - Normal, Bizarro, BlackAndWhite, Browni, Desaturate, Greyscale,
 *     Kodachrome, LSD, Negative, Polaroid, Predator, Sepia, Technicolor,
 *     and Vintage
 * 
 * ---
 * 
 * Party: Color Effect Remove
 * - Removes the color effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to the horror effect from.
 *   - Index values start at 0.
 * 
 * ---
 *
 * Party: Glitch Create
 * - Creates the glitch effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to create the horror effects for.
 *   - Index values start at 0.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Party: Glitch Remove
 * - Removes the glitch effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to the horror effect from.
 *   - Index values start at 0.
 *
 * ---
 *
 * Party: Noise Create
 * - Creates the noise effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to create the horror effects for.
 *   - Index values start at 0.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Party: Noise Remove
 * - Removes the noise effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to the horror effect from.
 *   - Index values start at 0.
 *
 * ---
 *
 * Party: TV Create
 * - Creates the TV effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to create the horror effects for.
 *   - Index values start at 0.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Party: TV Remove
 * - Removes the TV effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to the horror effect from.
 *   - Index values start at 0.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Clear All Filters
 * - Clear all Horror Effects filters on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to create the horror effects for.
 *   - Index values start at 0.
 *
 * ---
 * 
 * Enemy: Color Effect Create
 * - Creates the color effect on the target enemy(ies).
 * 
 *   Party ID(s):
 *   - The index of the party member to create the horror effects for.
 *   - Index values start at 0.
 * 
 *   Type:
 *   - Select the Color Effect type.
 *   - Normal, Bizarro, BlackAndWhite, Browni, Desaturate, Greyscale,
 *     Kodachrome, LSD, Negative, Polaroid, Predator, Sepia, Technicolor,
 *     and Vintage
 * 
 * ---
 * 
 * Enemy: Color Effect Remove
 * - Removes the color effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to the horror effect from.
 *   - Index values start at 0.
 * 
 * ---
 *
 * Enemy: Glitch Create
 * - Creates the glitch effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to create the horror effects for.
 *   - Index values start at 0.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Enemy: Glitch Remove
 * - Removes the glitch effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to the horror effect from.
 *   - Index values start at 0.
 *
 * ---
 *
 * Enemy: Noise Create
 * - Creates the noise effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to create the horror effects for.
 *   - Index values start at 0.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Enemy: Noise Remove
 * - Removes the noise effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to the horror effect from.
 *   - Index values start at 0.
 *
 * ---
 *
 * Enemy: TV Create
 * - Creates the TV effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to create the horror effects for.
 *   - Index values start at 0.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Enemy: TV Remove
 * - Removes the TV effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to the horror effect from.
 *   - Index values start at 0.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Image Settings
 * ============================================================================
 *
 * These settings will allow you to apply Horror Effects to each of the title
 * images that you can set in Database > System 1 > Title Screen Images.
 * The settings for each of them can be applied differently from one another,
 * You can apply any of the Noise, Glitch, and/or TV effects.
 *
 * ---
 *
 * Noise
 * 
 *   Noise Effect?:
 *   - Apply the target with a noise effect?
 * 
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 * 
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Glitch
 * 
 *   Glitch Effect?:
 *   - Apply the target with a glitch effect?
 * 
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 * 
 *   Glitch Offset:
 *   - Default offset value.
 * 
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 * 
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 * 
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * TV Lines
 * 
 *   TV Effect?:
 *   - Apply the target with a TV effect?
 * 
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 * 
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 * 
 *   TV Animated:
 *   - Animate the TV?
 * 
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
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
 * Version 1.02: October 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Irina and sponsored by Archeia:
 * *** Color Effect
 * **** Color effects allow for manipulation of color effects to produce horror
 *      esque effects that are otherwise unavailable or troublesome to
 *      replicate with vanilla RPG Maker MZ.
 * **** Includes: Bizarro, Black and White, Browni, Desaturate, Greyscale,
 *      Kodachrome, LSD, Negative, Polaroid, Predator, Sepia, Technicolor,
 *      and Vintage.
 * **** Available as Plugin Commands for Battle, Map, Event, Picture, Actors,
 *      Party Members, and Enemies.
 * 
 * Version 1.01: March 12, 2021
 * * Compatibility Update!
 * ** Added compatibility with the VisuStella MZ Options Core v1.10 update.
 * *** When the "Special Effects" option is set to OFF, the filters for this
 *     plugin will be shut off. They will be returned to normal when set to ON.
 * * Documentation Update!
 * ** Added the Options Core section to the "Extra Features" list.
 *
 * Version 1.00: December 7, 2020
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
 * @command BattleClear
 * @text Battle: Clear All Filters
 * @desc Clear all Horror Effects filters on the main battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleColorCreate
 * @text Battle: Color Effect Create
 * @desc Creates the color effect on the main battle screen.
 *
 * @arg type:str
 * @text Effect Type
 * @type combo
 * @option Normal
 * @option Bizarro
 * @option BlackAndWhite
 * @option Browni
 * @option Desaturate
 * @option Greyscale
 * @option Kodachrome
 * @option LSD
 * @option Negative
 * @option Polaroid
 * @option Predator
 * @option Sepia
 * @option Technicolor
 * @option Vintage
 * @desc Select the Color Effect type.
 * @default Normal
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleColorRemove
 * @text Battle: Color Effect Remove
 * @desc Removes the color effect on the main battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleGlitchCreate
 * @text Battle: Glitch Create
 * @desc Creates the glitch effect on the main battle screen.
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleGlitchRemove
 * @text Battle: Glitch Remove
 * @desc Removes the glitch effect on the main battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleNoiseCreate
 * @text Battle: Noise Create
 * @desc Creates the noise effect on the main battle screen.
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleNoiseRemove
 * @text Battle: Noise Remove
 * @desc Removes the noise effect on the main battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleTVCreate
 * @text Battle: TV Create
 * @desc Creates the TV effect on the main battle screen.
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleTVRemove
 * @text Battle: TV Remove
 * @desc Removes the TV effect on the main battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapClear
 * @text Map: Clear All Filters
 * @desc Clear all Horror Effects filters on the main map screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapColorCreate
 * @text Map: Color Effect Create
 * @desc Creates the color effect on the main map screen.
 *
 * @arg type:str
 * @text Effect Type
 * @type combo
 * @option Normal
 * @option Bizarro
 * @option BlackAndWhite
 * @option Browni
 * @option Desaturate
 * @option Greyscale
 * @option Kodachrome
 * @option LSD
 * @option Negative
 * @option Polaroid
 * @option Predator
 * @option Sepia
 * @option Technicolor
 * @option Vintage
 * @desc Select the Color Effect type.
 * @default Normal
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapColorRemove
 * @text Map: Color Effect Remove
 * @desc Removes the color effect on the main map screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapGlitchCreate
 * @text Map: Glitch Create
 * @desc Creates the glitch effect on the main map screen.
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapGlitchRemove
 * @text Map: Glitch Remove
 * @desc Removes the glitch effect on the main map screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapNoiseCreate
 * @text Map: Noise Create
 * @desc Creates the noise effect on the main map screen.
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapNoiseRemove
 * @text Map: Noise Remove
 * @desc Removes the noise effect on the main map screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapTVCreate
 * @text Map: TV Create
 * @desc Creates the TV effect on the main map screen.
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapTVRemove
 * @text Map: TV Remove
 * @desc Removes the TV effect on the main map screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Event
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventClear
 * @text Event: Clear All Filters
 * @desc Clear all Horror Effects filters on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to clear horror effects from.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventColorCreate
 * @text Event: Color Effect Create
 * @desc Creates the color effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to create the horror effects for.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @arg type:str
 * @text Effect Type
 * @type combo
 * @option Normal
 * @option Bizarro
 * @option BlackAndWhite
 * @option Browni
 * @option Desaturate
 * @option Greyscale
 * @option Kodachrome
 * @option LSD
 * @option Negative
 * @option Polaroid
 * @option Predator
 * @option Sepia
 * @option Technicolor
 * @option Vintage
 * @desc Select the Color Effect type.
 * @default Normal
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventColorRemove
 * @text Event: Color Effect Remove
 * @desc Removes the color effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to remove this horror effect from.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventGlitchCreate
 * @text Event: Glitch Create
 * @desc Creates the glitch effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to create the horror effects for.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventGlitchRemove
 * @text Event: Glitch Remove
 * @desc Removes the glitch effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to remove this horror effect from.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventNoiseCreate
 * @text Event: Noise Create
 * @desc Creates the noise effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to create the horror effects for.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventNoiseRemove
 * @text Event: Noise Remove
 * @desc Removes the noise effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to remove this horror effect from.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTVCreate
 * @text Event: TV Create
 * @desc Creates the TV effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to create the horror effects for.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTVRemove
 * @text Event: TV Remove
 * @desc Removes the TV effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to remove this horror effect from.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureClear
 * @text Picture: Clear All Filters
 * @desc Clear all Horror Effects filters on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID of the picture to clear horror effects from.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureColorCreate
 * @text Picture: Color Effect Create
 * @desc Creates the color effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID of the picture to create the horror effects for.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @arg type:str
 * @text Effect Type
 * @type combo
 * @option Normal
 * @option Bizarro
 * @option BlackAndWhite
 * @option Browni
 * @option Desaturate
 * @option Greyscale
 * @option Kodachrome
 * @option LSD
 * @option Negative
 * @option Polaroid
 * @option Predator
 * @option Sepia
 * @option Technicolor
 * @option Vintage
 * @desc Select the Color Effect type.
 * @default Normal
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureColorRemove
 * @text Picture: Color Effect Remove
 * @desc Removes the color effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID of the picture to remove this horror effect from.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureGlitchCreate
 * @text Picture: Glitch Create
 * @desc Creates the glitch effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID of the picture to create the horror effects for.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureGlitchRemove
 * @text Picture: Glitch Remove
 * @desc Removes the glitch effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID of the picture to remove this horror effect from.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureNoiseCreate
 * @text Picture: Noise Create
 * @desc Creates the noise effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID of the picture to create the horror effects for.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureNoiseRemove
 * @text Picture: Noise Remove
 * @desc Removes the noise effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID of the picture to remove this horror effect from.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTVCreate
 * @text Picture: TV Create
 * @desc Creates the TV effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID of the picture to create the horror effects for.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTVRemove
 * @text Picture: TV Remove
 * @desc Removes the TV effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID of the picture to remove this horror effect from.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Actor
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorClear
 * @text Actor: Clear All Filters
 * @desc Clear all Horror Effects filters on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to clear horror effects from.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorColorCreate
 * @text Actor: Color Effect Create
 * @desc Creates the color effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to create the horror effects for.
 * @default ["1"]
 *
 * @arg type:str
 * @text Effect Type
 * @type combo
 * @option Normal
 * @option Bizarro
 * @option BlackAndWhite
 * @option Browni
 * @option Desaturate
 * @option Greyscale
 * @option Kodachrome
 * @option LSD
 * @option Negative
 * @option Polaroid
 * @option Predator
 * @option Sepia
 * @option Technicolor
 * @option Vintage
 * @desc Select the Color Effect type.
 * @default Normal
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorColorRemove
 * @text Actor: Color Effect Remove
 * @desc Removes the color effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to remove this horror effect from.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorGlitchCreate
 * @text Actor: Glitch Create
 * @desc Creates the glitch effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to create the horror effects for.
 * @default ["1"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorGlitchRemove
 * @text Actor: Glitch Remove
 * @desc Removes the glitch effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to remove this horror effect from.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorNoiseCreate
 * @text Actor: Noise Create
 * @desc Creates the noise effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to create the horror effects for.
 * @default ["1"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorNoiseRemove
 * @text Actor: Noise Remove
 * @desc Removes the noise effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to remove this horror effect from.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorTVCreate
 * @text Actor: TV Create
 * @desc Creates the TV effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to create the horror effects for.
 * @default ["1"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorTVRemove
 * @text Actor: TV Remove
 * @desc Removes the TV effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to remove this horror effect from.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Party
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyClear
 * @text Party: Clear All Filters
 * @desc Clear all Horror Effects filters on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to clear horror effects from. Index values start at 0.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyColorCreate
 * @text Party: Color Effect Create
 * @desc Creates the color effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to create the horror effects for. Index values start at 0.
 * @default ["0"]
 *
 * @arg type:str
 * @text Effect Type
 * @type combo
 * @option Normal
 * @option Bizarro
 * @option BlackAndWhite
 * @option Browni
 * @option Desaturate
 * @option Greyscale
 * @option Kodachrome
 * @option LSD
 * @option Negative
 * @option Polaroid
 * @option Predator
 * @option Sepia
 * @option Technicolor
 * @option Vintage
 * @desc Select the Color Effect type.
 * @default Normal
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyColorRemove
 * @text Party: Color Effect Remove
 * @desc Removes the color effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to remove this horror effect from. Index values start at 0.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyGlitchCreate
 * @text Party: Glitch Create
 * @desc Creates the glitch effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to create the horror effects for. Index values start at 0.
 * @default ["0"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyGlitchRemove
 * @text Party: Glitch Remove
 * @desc Removes the glitch effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to remove this horror effect from. Index values start at 0.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyNoiseCreate
 * @text Party: Noise Create
 * @desc Creates the noise effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to create the horror effects for. Index values start at 0.
 * @default ["0"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyNoiseRemove
 * @text Party: Noise Remove
 * @desc Removes the noise effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to remove this horror effect from. Index values start at 0.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyTVCreate
 * @text Party: TV Create
 * @desc Creates the TV effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to create the horror effects for. Index values start at 0.
 * @default ["0"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyTVRemove
 * @text Party: TV Remove
 * @desc Removes the TV effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to remove this horror effect from. Index values start at 0.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Enemy
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyClear
 * @text Enemy: Clear All Filters
 * @desc Clear all Horror Effects filters on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to clear horror effects from.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyColorCreate
 * @text Enemy: Color Effect Create
 * @desc Creates the color effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to create the horror effects for.
 * @default ["0"]
 *
 * @arg type:str
 * @text Effect Type
 * @type combo
 * @option Normal
 * @option Bizarro
 * @option BlackAndWhite
 * @option Browni
 * @option Desaturate
 * @option Greyscale
 * @option Kodachrome
 * @option LSD
 * @option Negative
 * @option Polaroid
 * @option Predator
 * @option Sepia
 * @option Technicolor
 * @option Vintage
 * @desc Select the Color Effect type.
 * @default Normal
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyColorRemove
 * @text Enemy: Color Effect Remove
 * @desc Removes the color effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to remove this horror effect from.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyGlitchCreate
 * @text Enemy: Glitch Create
 * @desc Creates the glitch effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to create the horror effects for.
 * @default ["0"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyGlitchRemove
 * @text Enemy: Glitch Remove
 * @desc Removes the glitch effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to remove this horror effect from.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyNoiseCreate
 * @text Enemy: Noise Create
 * @desc Creates the noise effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to create the horror effects for.
 * @default ["0"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyNoiseRemove
 * @text Enemy: Noise Remove
 * @desc Removes the noise effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @desc The index of the enemy to remove this horror effect from.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyTVCreate
 * @text Enemy: TV Create
 * @desc Creates the TV effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to create the horror effects for.
 * @default ["0"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyTVRemove
 * @text Enemy: TV Remove
 * @desc Removes the TV effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to remove this horror effect from.
 * @default ["0"]
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
 * @param HorrorEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Title1Settings:struct
 * @text Title 1 Settings
 * @type struct<Title>
 * @desc Horror Effect Settings for the Title 1 image.
 * @default {"FilterNoise":"","Noise:eval":"true","NoiseRate:num":"0.3","NoiseAni:eval":"true","FilterGlitch":"","Glitch:eval":"true","GlitchSlices:num":"10","GlitchOffset:num":"100","GlitchAni:eval":"true","GlitchAniFreq:num":"300","GlitchAniStr:num":"30","FilterTV":"","TV:eval":"true","TVLineThickness:num":"5","TVCorner:num":"0.3","TVAni:eval":"true","TVAniSpeed:num":"0.25"}
 *
 * @param Title2Settings:struct
 * @text Title 2 Settings
 * @type struct<Title>
 * @desc Horror Effect Settings for the Title 2 image.
 * @default {"FilterNoise":"","Noise:eval":"true","NoiseRate:num":"0.3","NoiseAni:eval":"true","FilterGlitch":"","Glitch:eval":"true","GlitchSlices:num":"10","GlitchOffset:num":"100","GlitchAni:eval":"true","GlitchAniFreq:num":"300","GlitchAniStr:num":"30","FilterTV":"","TV:eval":"true","TVLineThickness:num":"5","TVCorner:num":"0.3","TVAni:eval":"true","TVAniSpeed:num":"0.25"}
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
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param FilterNoise
 * @text Noise
 *
 * @param Noise:eval
 * @text Noise Effect?
 * @parent FilterNoise
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Apply the target with a noise effect?
 * @default true
 *
 * @param NoiseRate:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @param NoiseAni:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @param FilterGlitch
 * @text Glitch
 *
 * @param Glitch:eval
 * @text Glitch Effect?
 * @parent FilterGlitch
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Apply the target with a glitch effect?
 * @default true
 *
 * @param GlitchSlices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @param GlitchOffset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @param GlitchAni:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @param GlitchAniFreq:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @param GlitchAniStr:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @param FilterTV
 * @text TV Lines
 *
 * @param TV:eval
 * @text TV Effect?
 * @parent FilterTV
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Apply the target with a TV effect?
 * @default true
 *
 * @param TVLineThickness:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @param TVCorner:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @param TVAni:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @param TVAniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 */
//=============================================================================

function _0x254f(){const _0x197e45=['PartyClear','negative','bizarro','createHorrorColor','NoiseAni','GRxZb','PictureNoiseRemove','BattleColorRemove','AjlMa','HlsjL','EnemyIndex','MNeUi','Game_BattlerBase_initialize','simrj','PictureGlitchCreate','push','ColorMatrixFilter','puEDh','PartyIndex','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','MapClear','EventGlitchRemove','ActorNoiseCreate','GlitchAni','FnhGU','_horrorFiltersGlitchSpecial','setHorrorEffectSettings','sepia','version','xjLTm','animated','rBJwR','ofndo','updateHorrorNoise','setHorrorTVSpeed','ARRAYJSON','rDVja','EnemyColorRemove','Game_Player_refresh','xTimh','jFRJw','applyTitleHorrorEffects','RemoveHorrorEffects','GlitchAniStr','QYduz','createHorrorTV','randomInt','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','reset','EventTVCreate','name','createHorrorGlitch','predator','2265MXxORT','ActorNoiseRemove','removeHorrorFilter','ZzXWb','wxcNH','QDeEp','noiseFilter','MapColorRemove','PartyTVRemove','EventColorRemove','removeHorrorNoise','glitch','filters','setHorrorGlitchAnimated','glitchFilter','MapGlitchCreate','refresh','aniStrength','Sprite_update','iBXGt','toBGR','HorrorEffects','GlitchAniFreq','parse','removeHorrorGlitch','EnemyGlitchRemove','lsd','3138834rZIVSf','GlitchOffset','BattleGlitchCreate','yvoMF','setLastPluginCommandInterpreter','vignetting','BnTSL','Game_Picture_erase','trim','BattleTVRemove','BattleTVCreate','ConvertParams','PartyNoiseRemove','Sprite_Character_initialize','5083314yJMpKb','BWSwo','BattleClear','4qldyga','DCsgE','setBattler','EnemyTVCreate','yEPBr','normal','Title2Settings','Spriteset_Battle_initialize','Title1Settings','XYUTI','ActorId','ActorTVRemove','sliceMax','ADjhx','clear','setHorrorNoiseAnimated','5822272ReDBzO','STRUCT','STR','IrKAW','splice','EnemyClear','ceil','NoiseFilter','ubivF','exit','Spriteset_Map_initialize','Game_Screen_clear','MapColorCreate','Game_CharacterBase_initMembers','max','Game_Picture_initialize','format','Sprite_Picture_initialize','technicolor','PartyNoiseCreate','sliceMin','tOcUX','EnemyNoiseRemove','EnemyGlitchCreate','removeHorrorTV','UGtja','PictureGlitchRemove','toLowerCase','ksDbV','aniFrequency','setHorrorTVCornerSize','_eventId','DORQF','8836737dUgJwb','Game_Interpreter_PluginCommand','setHorrorNoiseRate','setHorrorGlitchSlices','actor','ActorColorCreate','clearHorrorEffects','lastType','Game_System_initialize','Glitch','tvFilter','includes','update','nYlgf','ActorColorRemove','registerCommand','aniSpeed','NcHAf','Settings','xGSNv','initialize','TVCorner','MCxlI','leader','xqpWF','greyscale','XffIo','setHorrorTVLineThickness','vTQvT','PartyColorCreate','lineWidth','updateHorrorGlitch','updateHorrorColor','BfakV','description','9332ntkUQl','ARRAYSTRUCT','CRTFilter','makeDeepCopy','call','PCVTn','blackAndWhite','bNmCn','needUpdate','NoiseRate','YoDNq','LEEIK','indexOf','EventColorCreate','eknIg','refreshRequest','drSCX','gLhZP','removeHorrorEffect','EventNoiseRemove','setHorrorTVAnimated','AyKQV','noise','MLvGa','length','visible','iyyGl','_horrorFilters','PartyTVCreate','TQPvX','colorFilter','seed','eopTR','return\x200','PictureTVRemove','oxEEQ','updateHorrorEffects','command357','ARRAYFUNC','updateBitmap','16413480CESOUp','vintage','setHorrorEffectToValue','htTbL','XQBpj','createHorrorFilter','NUM','picture','time','EventId','parameters','TVAniSpeed','EventTVRemove','EnemyTVRemove','_backSprite2','polaroid','Sprite_initialize','Scene_Title_createBackground','GlitchFilter','Fmilc','createHorrorNoise','weAEC','Filter','initMembers','KIvfE','specialEffects','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ARRAYSTR','BattleColorCreate','blackandwhite','jWyVw','PLjPi','desaturate','offset','TVLineThickness','TVAni','color','createBackground','Game_Follower_refresh','QFycP','GFwXQ','Noise','zjByS','muBLi','393941zYJnrG','_horrorFiltersSource','removeHorrorColor','setHorrorGlitchOffset','OiXKb','ZGQlf','_lastPluginCommandInterpreter','lAGMy','getLastPluginCommandInterpreter','match','gnUMt','zmksN','BattleNoiseCreate','setHorrorGlitchStrength','JSON','members','kodachrome','PartyGlitchCreate','ActorTVCreate','VdkEN','toUpperCase','FHKFI','PictureId','slices','XijYH','Sprite_Battler_setBattler','PartyGlitchRemove','random','prototype','updateHorrorGlitchEffect','XqYOx','wyvfH','map','PrhGU','createHorrorEffect','synchronizeHorrorEffects','frameCount','event','status','ewEzb','fHnTD','type'];_0x254f=function(){return _0x197e45;};return _0x254f();}const _0x3b4113=_0x34e3;(function(_0x54df04,_0x15e445){const _0xe6a85f=_0x34e3,_0x1c540a=_0x54df04();while(!![]){try{const _0x5936ba=-parseInt(_0xe6a85f(0x1aa))/0x1*(-parseInt(_0xe6a85f(0x102))/0x2)+-parseInt(_0xe6a85f(0xff))/0x3+parseInt(_0xe6a85f(0x156))/0x4*(parseInt(_0xe6a85f(0xd6))/0x5)+-parseInt(_0xe6a85f(0xf1))/0x6+-parseInt(_0xe6a85f(0x133))/0x7+parseInt(_0xe6a85f(0x112))/0x8+parseInt(_0xe6a85f(0x17e))/0x9;if(_0x5936ba===_0x15e445)break;else _0x1c540a['push'](_0x1c540a['shift']());}catch(_0x2b9d16){_0x1c540a['push'](_0x1c540a['shift']());}}}(_0x254f,0xdfb2b));var label='HorrorEffects',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x413975){const _0x3b435e=_0x34e3;return _0x413975[_0x3b435e(0x1d0)]&&_0x413975[_0x3b435e(0x155)][_0x3b435e(0x13e)]('['+label+']');})[0x0];function _0x34e3(_0x215dcd,_0xef409a){const _0x254f0=_0x254f();return _0x34e3=function(_0x34e33a,_0x1ba03c){_0x34e33a=_0x34e33a-0xca;let _0x54083a=_0x254f0[_0x34e33a];return _0x54083a;},_0x34e3(_0x215dcd,_0xef409a);}VisuMZ[label]['Settings']=VisuMZ[label][_0x3b4113(0x145)]||{},VisuMZ[_0x3b4113(0xfc)]=function(_0x54bc61,_0x452f6b){const _0x4fce2d=_0x3b4113;for(const _0x3649f7 in _0x452f6b){if(_0x3649f7['match'](/(.*):(.*)/i)){const _0x3393f4=String(RegExp['$1']),_0x101627=String(RegExp['$2'])[_0x4fce2d(0x1be)]()['trim']();let _0x31e5b2,_0x2e1d8f,_0x2c115;switch(_0x101627){case _0x4fce2d(0x184):_0x31e5b2=_0x452f6b[_0x3649f7]!==''?Number(_0x452f6b[_0x3649f7]):0x0;break;case'ARRAYNUM':_0x2e1d8f=_0x452f6b[_0x3649f7]!==''?JSON[_0x4fce2d(0xed)](_0x452f6b[_0x3649f7]):[],_0x31e5b2=_0x2e1d8f['map'](_0x58aa90=>Number(_0x58aa90));break;case'EVAL':_0x31e5b2=_0x452f6b[_0x3649f7]!==''?eval(_0x452f6b[_0x3649f7]):null;break;case'ARRAYEVAL':_0x2e1d8f=_0x452f6b[_0x3649f7]!==''?JSON[_0x4fce2d(0xed)](_0x452f6b[_0x3649f7]):[],_0x31e5b2=_0x2e1d8f[_0x4fce2d(0x1ca)](_0x7442d0=>eval(_0x7442d0));break;case _0x4fce2d(0x1b8):_0x31e5b2=_0x452f6b[_0x3649f7]!==''?JSON[_0x4fce2d(0xed)](_0x452f6b[_0x3649f7]):'';break;case _0x4fce2d(0x1f7):_0x2e1d8f=_0x452f6b[_0x3649f7]!==''?JSON[_0x4fce2d(0xed)](_0x452f6b[_0x3649f7]):[],_0x31e5b2=_0x2e1d8f[_0x4fce2d(0x1ca)](_0x5b519d=>JSON['parse'](_0x5b519d));break;case'FUNC':_0x31e5b2=_0x452f6b[_0x3649f7]!==''?new Function(JSON[_0x4fce2d(0xed)](_0x452f6b[_0x3649f7])):new Function(_0x4fce2d(0x177));break;case _0x4fce2d(0x17c):_0x2e1d8f=_0x452f6b[_0x3649f7]!==''?JSON[_0x4fce2d(0xed)](_0x452f6b[_0x3649f7]):[],_0x31e5b2=_0x2e1d8f[_0x4fce2d(0x1ca)](_0x530b97=>new Function(JSON[_0x4fce2d(0xed)](_0x530b97)));break;case _0x4fce2d(0x114):_0x31e5b2=_0x452f6b[_0x3649f7]!==''?String(_0x452f6b[_0x3649f7]):'';break;case _0x4fce2d(0x199):_0x2e1d8f=_0x452f6b[_0x3649f7]!==''?JSON[_0x4fce2d(0xed)](_0x452f6b[_0x3649f7]):[],_0x31e5b2=_0x2e1d8f[_0x4fce2d(0x1ca)](_0x387584=>String(_0x387584));break;case _0x4fce2d(0x113):_0x2c115=_0x452f6b[_0x3649f7]!==''?JSON[_0x4fce2d(0xed)](_0x452f6b[_0x3649f7]):{},_0x31e5b2=VisuMZ[_0x4fce2d(0xfc)]({},_0x2c115);break;case _0x4fce2d(0x157):_0x2e1d8f=_0x452f6b[_0x3649f7]!==''?JSON[_0x4fce2d(0xed)](_0x452f6b[_0x3649f7]):[],_0x31e5b2=_0x2e1d8f[_0x4fce2d(0x1ca)](_0x439f45=>VisuMZ[_0x4fce2d(0xfc)]({},JSON[_0x4fce2d(0xed)](_0x439f45)));break;default:continue;}_0x54bc61[_0x3393f4]=_0x31e5b2;}}return _0x54bc61;},(_0x2dbaba=>{const _0x38f840=_0x3b4113,_0x39760e=_0x2dbaba[_0x38f840(0xd3)];for(const _0x22f6df of dependencies){if(!Imported[_0x22f6df]){alert(_0x38f840(0xd0)[_0x38f840(0x122)](_0x39760e,_0x22f6df)),SceneManager['exit']();break;}}const _0x2c868d=_0x2dbaba[_0x38f840(0x155)];if(_0x2c868d[_0x38f840(0x1b3)](/\[Version[ ](.*?)\]/i)){if('UhdcW'===_0x38f840(0x191))_0x3d5d1[_0x38f840(0x1c6)][_0x38f840(0x1ee)][_0x38f840(0x15a)](this,_0x2bfaf7,_0x4d046e);else{const _0x136633=Number(RegExp['$1']);_0x136633!==VisuMZ[label][_0x38f840(0x1f0)]&&(alert(_0x38f840(0x1e7)[_0x38f840(0x122)](_0x39760e,_0x136633)),SceneManager[_0x38f840(0x11b)]());}}if(_0x2c868d['match'](/\[Tier[ ](\d+)\]/i)){const _0x2cc03b=Number(RegExp['$1']);_0x2cc03b<tier?(alert(_0x38f840(0x198)[_0x38f840(0x122)](_0x39760e,_0x2cc03b,tier)),SceneManager['exit']()):tier=Math[_0x38f840(0x120)](_0x2cc03b,tier);}VisuMZ[_0x38f840(0xfc)](VisuMZ[label]['Settings'],_0x2dbaba[_0x38f840(0x188)]);})(pluginData),VisuMZ[_0x3b4113(0xeb)]['RemoveHorrorEffects']=function(_0x3cce41){const _0x3f9ac2=_0x3b4113;if(!_0x3cce41)return;_0x3cce41[_0x3f9ac2(0x168)]('noise'),_0x3cce41['removeHorrorEffect'](_0x3f9ac2(0xe1)),_0x3cce41[_0x3f9ac2(0x168)]('tv'),_0x3cce41[_0x3f9ac2(0x168)](_0x3f9ac2(0x1a2)),_0x3cce41['clearHorrorEffects']();},PluginManager['registerCommand'](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x101),_0x5c468a=>{const _0x1dffc8=_0x3b4113,_0x42a85c=[$gameSystem];for(const _0x42df64 of _0x42a85c){if(!_0x42df64)continue;VisuMZ[_0x1dffc8(0xeb)][_0x1dffc8(0xcb)](_0x42df64);}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x19a),_0x1b91d5=>{const _0x84f2fb=_0x3b4113;VisuMZ[_0x84f2fb(0xfc)](_0x1b91d5,_0x1b91d5);const _0x550184=[$gameSystem],_0xe51653=_0x84f2fb(0x1a2);for(const _0x1ea0f2 of _0x550184){if(!_0x1ea0f2)continue;_0x1ea0f2[_0x84f2fb(0x1ee)](_0xe51653,_0x1b91d5);}}),PluginManager['registerCommand'](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x1db),_0x6c5e0a=>{const _0x332cd8=_0x3b4113,_0x270f7f=[$gameSystem];for(const _0x56bd0e of _0x270f7f){if(!_0x56bd0e)continue;_0x56bd0e[_0x332cd8(0x168)](_0x332cd8(0x1a2));}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0xf3),_0x348726=>{const _0x1a7838=_0x3b4113;VisuMZ['ConvertParams'](_0x348726,_0x348726);const _0xef5ae6=[$gameSystem],_0x14cbc5=_0x1a7838(0xe1);_0x348726['sliceMin']=Math[_0x1a7838(0x118)](_0x348726['slices']/0x2),_0x348726['sliceMax']=_0x348726[_0x1a7838(0x1c1)],_0x348726[_0x1a7838(0x165)]=!![];for(const _0xcd5404 of _0xef5ae6){if(!_0xcd5404)continue;_0xcd5404['setHorrorEffectSettings'](_0x14cbc5,_0x348726);}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],'BattleGlitchRemove',_0x25d030=>{const _0x2147f8=_0x3b4113,_0x34de07=[$gameSystem];for(const _0x33ab17 of _0x34de07){if(_0x2147f8(0x176)!==_0x2147f8(0x14f)){if(!_0x33ab17)continue;_0x33ab17[_0x2147f8(0x168)]('glitch');}else _0x150f4b['prototype'][_0x2147f8(0x1cc)][_0x2147f8(0x15a)](this,_0x3d6e03);}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x1b6),_0x303efe=>{const _0x166821=_0x3b4113;VisuMZ['ConvertParams'](_0x303efe,_0x303efe);const _0x24bb33=[$gameSystem],_0x1876bb=_0x166821(0x16c);for(const _0x181f73 of _0x24bb33){if(!_0x181f73)continue;_0x181f73[_0x166821(0x1ee)](_0x1876bb,_0x303efe);}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],'BattleNoiseRemove',_0x3968b3=>{const _0x1fc1ab=_0x3b4113,_0x3bc286=[$gameSystem];for(const _0x4165c9 of _0x3bc286){if('XFhqz'!==_0x1fc1ab(0x1a6)){if(!_0x4165c9)continue;_0x4165c9[_0x1fc1ab(0x168)](_0x1fc1ab(0x16c));}else _0x54d3a8[_0x1fc1ab(0xeb)]['Game_CharacterBase_initMembers'][_0x1fc1ab(0x15a)](this),this[_0x1fc1ab(0x139)]();}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0xfb),_0x22d8bc=>{const _0x29b660=_0x3b4113;VisuMZ[_0x29b660(0xfc)](_0x22d8bc,_0x22d8bc);const _0x2a0d23=[$gameSystem],_0x39a03d='tv';for(const _0x12935e of _0x2a0d23){if(!_0x12935e)continue;_0x12935e[_0x29b660(0x1ee)](_0x39a03d,_0x22d8bc);}}),PluginManager[_0x3b4113(0x142)](pluginData['name'],_0x3b4113(0xfa),_0x3d51f4=>{const _0x51d104=[$gameSystem];for(const _0x5add70 of _0x51d104){if(!_0x5add70)continue;_0x5add70['removeHorrorEffect']('tv');}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x1e8),_0x4bee05=>{const _0x285402=_0x3b4113,_0x462b11=[$gameScreen];for(const _0x1945d7 of _0x462b11){if(!_0x1945d7)continue;VisuMZ[_0x285402(0xeb)]['RemoveHorrorEffects'](_0x1945d7);}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x11e),_0x4034de=>{const _0x87d9d1=_0x3b4113;VisuMZ[_0x87d9d1(0xfc)](_0x4034de,_0x4034de);const _0x53f5dd=[$gameScreen],_0x1bb2b0=_0x87d9d1(0x1a2);for(const _0x3835f8 of _0x53f5dd){if(!_0x3835f8)continue;_0x3835f8[_0x87d9d1(0x1ee)](_0x1bb2b0,_0x4034de);}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0xdd),_0x2da3be=>{const _0x1434f1=_0x3b4113,_0x22ca41=[$gameScreen];for(const _0x27ebe1 of _0x22ca41){if(!_0x27ebe1)continue;_0x27ebe1[_0x1434f1(0x168)]('color');}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0xe5),_0x2a4a0e=>{const _0x3c327d=_0x3b4113;VisuMZ[_0x3c327d(0xfc)](_0x2a4a0e,_0x2a4a0e);const _0x24cadb=[$gameScreen],_0x1e4f7d=_0x3c327d(0xe1);_0x2a4a0e[_0x3c327d(0x126)]=Math[_0x3c327d(0x118)](_0x2a4a0e[_0x3c327d(0x1c1)]/0x2),_0x2a4a0e[_0x3c327d(0x10e)]=_0x2a4a0e[_0x3c327d(0x1c1)],_0x2a4a0e[_0x3c327d(0x165)]=!![];for(const _0x3f83c5 of _0x24cadb){if(_0x3c327d(0x1f1)===_0x3c327d(0x1f1)){if(!_0x3f83c5)continue;_0x3f83c5[_0x3c327d(0x1ee)](_0x1e4f7d,_0x2a4a0e);}else _0x354a12[_0x3c327d(0x1c6)][_0x3c327d(0x139)][_0x3c327d(0x15a)](_0x342a25[_0x3c327d(0x14a)]()),this[_0x3c327d(0x1cd)]();}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],'MapGlitchRemove',_0x4c15c8=>{const _0x4580cd=_0x3b4113,_0x133404=[$gameScreen];for(const _0x32208c of _0x133404){if(!_0x32208c)continue;_0x32208c['removeHorrorEffect'](_0x4580cd(0xe1));}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],'MapNoiseCreate',_0x56c0ad=>{const _0x431f95=_0x3b4113;VisuMZ[_0x431f95(0xfc)](_0x56c0ad,_0x56c0ad);const _0x165f9e=[$gameScreen],_0x568759=_0x431f95(0x16c);for(const _0x10df8f of _0x165f9e){if(!_0x10df8f)continue;_0x10df8f[_0x431f95(0x1ee)](_0x568759,_0x56c0ad);}}),PluginManager['registerCommand'](pluginData[_0x3b4113(0xd3)],'MapNoiseRemove',_0x2c902e=>{const _0x254227=_0x3b4113,_0x4ac838=[$gameScreen];for(const _0x2f918c of _0x4ac838){if(!_0x2f918c)continue;_0x2f918c[_0x254227(0x168)]('noise');}}),PluginManager['registerCommand'](pluginData[_0x3b4113(0xd3)],'MapTVCreate',_0x527c6b=>{const _0x52e4d2=_0x3b4113;VisuMZ['ConvertParams'](_0x527c6b,_0x527c6b);const _0x1ae38d=[$gameScreen],_0x51c5af='tv';for(const _0x1ac813 of _0x1ae38d){if(_0x52e4d2(0x16d)===_0x52e4d2(0x16d)){if(!_0x1ac813)continue;_0x1ac813['setHorrorEffectSettings'](_0x51c5af,_0x527c6b);}else this[_0x52e4d2(0x1ab)]=_0x1bdb2e;}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],'MapTVRemove',_0x1674f3=>{const _0x37659e=_0x3b4113,_0x27b573=[$gameScreen];for(const _0x5555e1 of _0x27b573){if(_0x37659e(0x127)!==_0x37659e(0x127))_0x2b1d7f['HorrorEffects'][_0x37659e(0x123)][_0x37659e(0x15a)](this,_0x49f45b);else{if(!_0x5555e1)continue;_0x5555e1['removeHorrorEffect']('tv');}}}),PluginManager[_0x3b4113(0x142)](pluginData['name'],'EventClear',_0xd1a645=>{const _0x1f6b09=_0x3b4113;VisuMZ['ConvertParams'](_0xd1a645,_0xd1a645);const _0x3c0211=$gameTemp[_0x1f6b09(0x1b2)](),_0x152874=_0xd1a645[_0x1f6b09(0x187)][_0x1f6b09(0x1ca)](_0x1a0350=>$gameMap[_0x1f6b09(0x1cf)](_0x1a0350>0x0?_0x1a0350:_0x3c0211[_0x1f6b09(0x131)]));for(const _0x30b619 of _0x152874){if(_0x1f6b09(0x19d)===_0x1f6b09(0x19d)){if(!_0x30b619)continue;VisuMZ[_0x1f6b09(0xeb)][_0x1f6b09(0xcb)](_0x30b619);}else _0x3bd7a5[_0x1f6b09(0x1c6)][_0x1f6b09(0x1cc)]['call'](this,_0xd2c684);}}),PluginManager[_0x3b4113(0x142)](pluginData['name'],_0x3b4113(0x163),_0x23c2b9=>{const _0xa42cca=_0x3b4113;VisuMZ['ConvertParams'](_0x23c2b9,_0x23c2b9);const _0x45d14e=$gameTemp[_0xa42cca(0x1b2)](),_0x4b4181=_0x23c2b9[_0xa42cca(0x187)][_0xa42cca(0x1ca)](_0x4e1357=>$gameMap[_0xa42cca(0x1cf)](_0x4e1357>0x0?_0x4e1357:_0x45d14e[_0xa42cca(0x131)])),_0x15201b='color';for(const _0x3854c5 of _0x4b4181){if(_0xa42cca(0x1b5)!=='ravGm'){if(!_0x3854c5)continue;_0x3854c5[_0xa42cca(0x1ee)](_0x15201b,_0x23c2b9);}else{const _0x543eeb=_0x4d046c(_0x27db3b['$1']);_0x543eeb!==_0x1420b6[_0x5525d0][_0xa42cca(0x1f0)]&&(_0x434139(_0xa42cca(0x1e7)[_0xa42cca(0x122)](_0x585ba6,_0x543eeb)),_0x2e51fc[_0xa42cca(0x11b)]());}}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0xdf),_0x4b433e=>{const _0x4e0d6f=_0x3b4113,_0x2632dd=$gameTemp[_0x4e0d6f(0x1b2)](),_0x15e245=_0x4b433e[_0x4e0d6f(0x187)][_0x4e0d6f(0x1ca)](_0x8a7021=>$gameMap[_0x4e0d6f(0x1cf)](_0x8a7021>0x0?_0x8a7021:_0x2632dd[_0x4e0d6f(0x131)]));for(const _0x40d17e of _0x15e245){if(!_0x40d17e)continue;_0x40d17e[_0x4e0d6f(0x168)](_0x4e0d6f(0x1a2));}}),PluginManager['registerCommand'](pluginData[_0x3b4113(0xd3)],'EventGlitchCreate',_0x12eab1=>{const _0x2c0847=_0x3b4113;VisuMZ[_0x2c0847(0xfc)](_0x12eab1,_0x12eab1);const _0x223bf5=$gameTemp[_0x2c0847(0x1b2)](),_0x8d1df4=_0x12eab1['EventId'][_0x2c0847(0x1ca)](_0x1cf9d4=>$gameMap[_0x2c0847(0x1cf)](_0x1cf9d4>0x0?_0x1cf9d4:_0x223bf5[_0x2c0847(0x131)])),_0x13bb68=_0x2c0847(0xe1);_0x12eab1[_0x2c0847(0x126)]=Math['ceil'](_0x12eab1['slices']/0x2),_0x12eab1[_0x2c0847(0x10e)]=_0x12eab1[_0x2c0847(0x1c1)],_0x12eab1['refreshRequest']=!![];for(const _0x339cfd of _0x8d1df4){if(!_0x339cfd)continue;_0x339cfd['setHorrorEffectSettings'](_0x13bb68,_0x12eab1);}}),PluginManager[_0x3b4113(0x142)](pluginData['name'],_0x3b4113(0x1e9),_0x2aa566=>{const _0x295f8c=_0x3b4113;VisuMZ['ConvertParams'](_0x2aa566,_0x2aa566);const _0xb010aa=$gameTemp[_0x295f8c(0x1b2)](),_0x488157=_0x2aa566[_0x295f8c(0x187)]['map'](_0x30d843=>$gameMap[_0x295f8c(0x1cf)](_0x30d843>0x0?_0x30d843:_0xb010aa['_eventId']));for(const _0x9c1867 of _0x488157){if(!_0x9c1867)continue;_0x9c1867['removeHorrorEffect'](_0x295f8c(0xe1));}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],'EventNoiseCreate',_0x3de776=>{const _0x593e48=_0x3b4113;VisuMZ[_0x593e48(0xfc)](_0x3de776,_0x3de776);const _0x5d65e1=$gameTemp[_0x593e48(0x1b2)](),_0x37f15d=_0x3de776[_0x593e48(0x187)][_0x593e48(0x1ca)](_0x1f81db=>$gameMap['event'](_0x1f81db>0x0?_0x1f81db:_0x5d65e1[_0x593e48(0x131)])),_0x474d59=_0x593e48(0x16c);for(const _0x205d7b of _0x37f15d){if(_0x593e48(0x1c2)==='XijYH'){if(!_0x205d7b)continue;_0x205d7b[_0x593e48(0x1ee)](_0x474d59,_0x3de776);}else!!this['_horrorFilters'][_0x593e48(0xdc)]&&(this[_0x593e48(0xd8)](this['_horrorFilters']['noiseFilter']),this[_0x593e48(0x171)][_0x593e48(0xdc)]=_0x4e0ec5);}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x169),_0x31003e=>{const _0x266f93=_0x3b4113;VisuMZ[_0x266f93(0xfc)](_0x31003e,_0x31003e);const _0x100f52=$gameTemp[_0x266f93(0x1b2)](),_0x106005=_0x31003e[_0x266f93(0x187)][_0x266f93(0x1ca)](_0xf7b26=>$gameMap[_0x266f93(0x1cf)](_0xf7b26>0x0?_0xf7b26:_0x100f52[_0x266f93(0x131)]));for(const _0x2d27f8 of _0x106005){if(!_0x2d27f8)continue;_0x2d27f8[_0x266f93(0x168)](_0x266f93(0x16c));}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0xd2),_0x2d078c=>{const _0x4f87fd=_0x3b4113;VisuMZ[_0x4f87fd(0xfc)](_0x2d078c,_0x2d078c);const _0x2fcfb1=$gameTemp[_0x4f87fd(0x1b2)](),_0x46a68b=_0x2d078c[_0x4f87fd(0x187)]['map'](_0x6a2d57=>$gameMap[_0x4f87fd(0x1cf)](_0x6a2d57>0x0?_0x6a2d57:_0x2fcfb1[_0x4f87fd(0x131)])),_0xede330='tv';for(const _0x1abb66 of _0x46a68b){if('iXUUf'==='eCvTh')_0x44b2ac=_0x413f8e[_0x4f87fd(0x120)](_0x200ba0,_0x150d6d);else{if(!_0x1abb66)continue;_0x1abb66[_0x4f87fd(0x1ee)](_0xede330,_0x2d078c);}}}),PluginManager['registerCommand'](pluginData['name'],_0x3b4113(0x18a),_0x28a5f7=>{const _0x3aaa1a=_0x3b4113;VisuMZ[_0x3aaa1a(0xfc)](_0x28a5f7,_0x28a5f7);const _0x26f771=$gameTemp['getLastPluginCommandInterpreter'](),_0x3b38d8=_0x28a5f7[_0x3aaa1a(0x187)][_0x3aaa1a(0x1ca)](_0x3c8891=>$gameMap[_0x3aaa1a(0x1cf)](_0x3c8891>0x0?_0x3c8891:_0x26f771[_0x3aaa1a(0x131)]));for(const _0x5a7b6b of _0x3b38d8){if(_0x3aaa1a(0x166)!==_0x3aaa1a(0x12b)){if(!_0x5a7b6b)continue;_0x5a7b6b[_0x3aaa1a(0x168)]('tv');}else _0x1c25af['prototype']['setHorrorEffectSettings']['call'](this[_0x3aaa1a(0x137)](),_0xc5d448,_0x2f8e00),this[_0x3aaa1a(0x1cd)]();}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],'PictureClear',_0x59e45a=>{const _0x590010=_0x3b4113;VisuMZ[_0x590010(0xfc)](_0x59e45a,_0x59e45a);const _0x5c59fa=_0x59e45a['PictureId'][_0x590010(0x1ca)](_0x1a2ff8=>$gameScreen['picture'](_0x1a2ff8));for(const _0x49d387 of _0x5c59fa){if(_0x590010(0x1f3)!==_0x590010(0x1f3))_0x4e16c8[_0x590010(0x1c6)]['setHorrorEffectToValue'][_0x590010(0x15a)](this,_0x3296e8,_0x18c3bc,_0x4c00ce);else{if(!_0x49d387)continue;VisuMZ['HorrorEffects'][_0x590010(0xcb)](_0x49d387);}}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],'PictureColorCreate',_0x52e7d5=>{const _0x56834b=_0x3b4113;VisuMZ['ConvertParams'](_0x52e7d5,_0x52e7d5);const _0x404c5b=_0x52e7d5[_0x56834b(0x1c0)][_0x56834b(0x1ca)](_0x4f108c=>$gameScreen[_0x56834b(0x185)](_0x4f108c)),_0x45c7f5=_0x56834b(0x1a2);for(const _0x3dd088 of _0x404c5b){if(!_0x3dd088)continue;_0x3dd088[_0x56834b(0x1ee)](_0x45c7f5,_0x52e7d5);}}),PluginManager[_0x3b4113(0x142)](pluginData['name'],'PictureColorRemove',_0x4b2a75=>{const _0x18962c=_0x3b4113,_0xdcbd53=_0x4b2a75[_0x18962c(0x1c0)][_0x18962c(0x1ca)](_0x1e61a5=>$gameScreen[_0x18962c(0x185)](_0x1e61a5));for(const _0x5de5ca of _0xdcbd53){if(_0x18962c(0x1bf)===_0x18962c(0x1bf)){if(!_0x5de5ca)continue;_0x5de5ca[_0x18962c(0x168)](_0x18962c(0x1a2));}else _0x149ee1[_0x18962c(0xd4)](),_0x438392[_0x18962c(0x136)](_0x36dba6['GlitchSlices']),_0x1e0aa1[_0x18962c(0x1ad)](_0x262044['GlitchOffset']),_0x2afa80['setHorrorGlitchAnimated'](_0x557d78[_0x18962c(0x1eb)]),_0x46b300['setHorrorGlitchFrequency'](_0x5cbc69[_0x18962c(0xec)]),_0x4395d6['setHorrorGlitchStrength'](_0x8e825e['GlitchAniStr']);}}),PluginManager['registerCommand'](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x1e2),_0x3843da=>{const _0x3913c4=_0x3b4113;VisuMZ[_0x3913c4(0xfc)](_0x3843da,_0x3843da);const _0x528441=_0x3843da[_0x3913c4(0x1c0)][_0x3913c4(0x1ca)](_0x3e08c6=>$gameScreen['picture'](_0x3e08c6)),_0x5bdc8a='glitch';_0x3843da['sliceMin']=Math[_0x3913c4(0x118)](_0x3843da['slices']/0x2),_0x3843da[_0x3913c4(0x10e)]=_0x3843da['slices'],_0x3843da[_0x3913c4(0x165)]=!![];for(const _0x3f6d42 of _0x528441){if(!_0x3f6d42)continue;_0x3f6d42[_0x3913c4(0x1ee)](_0x5bdc8a,_0x3843da);}}),PluginManager['registerCommand'](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x12c),_0x19c1f5=>{const _0x36a1c5=_0x3b4113;VisuMZ['ConvertParams'](_0x19c1f5,_0x19c1f5);const _0x50dc5f=_0x19c1f5[_0x36a1c5(0x1c0)]['map'](_0x10c068=>$gameScreen[_0x36a1c5(0x185)](_0x10c068));for(const _0x1f7212 of _0x50dc5f){if(!_0x1f7212)continue;_0x1f7212[_0x36a1c5(0x168)](_0x36a1c5(0xe1));}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],'PictureNoiseCreate',_0x506d5d=>{const _0x1add17=_0x3b4113;VisuMZ[_0x1add17(0xfc)](_0x506d5d,_0x506d5d);const _0x1ad62c=_0x506d5d['PictureId'][_0x1add17(0x1ca)](_0x158898=>$gameScreen[_0x1add17(0x185)](_0x158898)),_0x3b9238='noise';for(const _0x8fb06e of _0x1ad62c){if(!_0x8fb06e)continue;_0x8fb06e[_0x1add17(0x1ee)](_0x3b9238,_0x506d5d);}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x1da),_0xafc8b0=>{const _0x3b8fb5=_0x3b4113;VisuMZ[_0x3b8fb5(0xfc)](_0xafc8b0,_0xafc8b0);const _0x1c384f=_0xafc8b0[_0x3b8fb5(0x1c0)][_0x3b8fb5(0x1ca)](_0x13ea27=>$gameScreen[_0x3b8fb5(0x185)](_0x13ea27));for(const _0x484aba of _0x1c384f){if(!_0x484aba)continue;_0x484aba[_0x3b8fb5(0x168)](_0x3b8fb5(0x16c));}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],'PictureTVCreate',_0x394435=>{const _0x5742ac=_0x3b4113;VisuMZ[_0x5742ac(0xfc)](_0x394435,_0x394435);const _0x300972=_0x394435['PictureId'][_0x5742ac(0x1ca)](_0xb607d3=>$gameScreen[_0x5742ac(0x185)](_0xb607d3)),_0x34c1e2='tv';for(const _0x24c961 of _0x300972){if(!_0x24c961)continue;_0x24c961[_0x5742ac(0x1ee)](_0x34c1e2,_0x394435);}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x178),_0x5ba876=>{const _0x3813f4=_0x3b4113;VisuMZ[_0x3813f4(0xfc)](_0x5ba876,_0x5ba876);const _0x54d65f=_0x5ba876[_0x3813f4(0x1c0)]['map'](_0x5c6904=>$gameScreen[_0x3813f4(0x185)](_0x5c6904));for(const _0x1a3dc4 of _0x54d65f){if(!_0x1a3dc4)continue;_0x1a3dc4['removeHorrorEffect']('tv');}}),PluginManager[_0x3b4113(0x142)](pluginData['name'],'ActorClear',_0x4ee788=>{const _0x57f971=_0x3b4113;VisuMZ[_0x57f971(0xfc)](_0x4ee788,_0x4ee788);const _0x3a3b88=_0x4ee788['ActorId']['map'](_0xe6b03b=>$gameActors[_0x57f971(0x137)](_0xe6b03b));for(const _0x3ba90b of _0x3a3b88){if(!_0x3ba90b)continue;VisuMZ[_0x57f971(0xeb)][_0x57f971(0xcb)](_0x3ba90b);}$gamePlayer['refresh']();}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x138),_0x164b57=>{const _0x20f41d=_0x3b4113;VisuMZ[_0x20f41d(0xfc)](_0x164b57,_0x164b57);const _0x1e9524=_0x164b57[_0x20f41d(0x10c)][_0x20f41d(0x1ca)](_0xce3aeb=>$gameActors['actor'](_0xce3aeb)),_0x175b65=_0x20f41d(0x1a2);for(const _0x3278ca of _0x1e9524){if(_0x20f41d(0x1b4)===_0x20f41d(0x1b4)){if(!_0x3278ca)continue;_0x3278ca[_0x20f41d(0x1ee)](_0x175b65,_0x164b57);}else this['_horrorFilters']['tvFilter'][_0x20f41d(0x143)]=_0xea9550;}}),PluginManager['registerCommand'](pluginData['name'],_0x3b4113(0x141),_0xd621e6=>{const _0x32495a=_0x3b4113,_0x463d63=_0xd621e6['ActorId'][_0x32495a(0x1ca)](_0x33b4b3=>$gameActors[_0x32495a(0x137)](_0x33b4b3));for(const _0x5e477a of _0x463d63){if(!_0x5e477a)continue;_0x5e477a[_0x32495a(0x168)](_0x32495a(0x1a2));}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],'ActorGlitchCreate',_0x2795bd=>{const _0x51c666=_0x3b4113;VisuMZ[_0x51c666(0xfc)](_0x2795bd,_0x2795bd);const _0x343b04=_0x2795bd[_0x51c666(0x10c)]['map'](_0x5b4618=>$gameActors[_0x51c666(0x137)](_0x5b4618)),_0x58dfb7=_0x51c666(0xe1);_0x2795bd[_0x51c666(0x126)]=Math[_0x51c666(0x118)](_0x2795bd['slices']/0x2),_0x2795bd[_0x51c666(0x10e)]=_0x2795bd[_0x51c666(0x1c1)],_0x2795bd[_0x51c666(0x165)]=!![];for(const _0x4cdff6 of _0x343b04){if(!_0x4cdff6)continue;_0x4cdff6[_0x51c666(0x1ee)](_0x58dfb7,_0x2795bd);}$gamePlayer['refresh']();}),PluginManager[_0x3b4113(0x142)](pluginData['name'],'ActorGlitchRemove',_0xafb071=>{const _0x51d7f5=_0x3b4113;VisuMZ[_0x51d7f5(0xfc)](_0xafb071,_0xafb071);const _0x5bf8aa=_0xafb071[_0x51d7f5(0x10c)][_0x51d7f5(0x1ca)](_0x104372=>$gameActors[_0x51d7f5(0x137)](_0x104372));for(const _0x288a39 of _0x5bf8aa){if(_0x51d7f5(0x164)!==_0x51d7f5(0x179)){if(!_0x288a39)continue;_0x288a39[_0x51d7f5(0x168)](_0x51d7f5(0xe1));}else return _0x3ebc78[_0x51d7f5(0x1d0)]&&_0x52823a['description'][_0x51d7f5(0x13e)]('['+_0x50bfb9+']');}$gamePlayer[_0x51d7f5(0xe6)]();}),PluginManager[_0x3b4113(0x142)](pluginData['name'],_0x3b4113(0x1ea),_0xcbc01c=>{const _0x366981=_0x3b4113;VisuMZ['ConvertParams'](_0xcbc01c,_0xcbc01c);const _0x101c52=_0xcbc01c['ActorId'][_0x366981(0x1ca)](_0x1d9127=>$gameActors[_0x366981(0x137)](_0x1d9127)),_0x4eb95e=_0x366981(0x16c);for(const _0x563fbf of _0x101c52){if(_0x366981(0x1af)===_0x366981(0x1f8))!!this['_horrorFilters'][_0x366981(0x13d)]&&(this[_0x366981(0x171)][_0x366981(0x13d)][_0x366981(0x151)]=_0xc79148);else{if(!_0x563fbf)continue;_0x563fbf[_0x366981(0x1ee)](_0x4eb95e,_0xcbc01c);}}$gamePlayer[_0x366981(0xe6)]();}),PluginManager['registerCommand'](pluginData[_0x3b4113(0xd3)],_0x3b4113(0xd7),_0x5a4790=>{const _0x5e7657=_0x3b4113;VisuMZ[_0x5e7657(0xfc)](_0x5a4790,_0x5a4790);const _0x43188d=_0x5a4790['ActorId']['map'](_0x4b4d4e=>$gameActors['actor'](_0x4b4d4e));for(const _0x26b59d of _0x43188d){if(!_0x26b59d)continue;_0x26b59d['removeHorrorEffect'](_0x5e7657(0x16c));}$gamePlayer[_0x5e7657(0xe6)]();}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x1bc),_0x1c1abc=>{const _0x5a29ec=_0x3b4113;VisuMZ['ConvertParams'](_0x1c1abc,_0x1c1abc);const _0x289317=_0x1c1abc[_0x5a29ec(0x10c)][_0x5a29ec(0x1ca)](_0x445340=>$gameActors[_0x5a29ec(0x137)](_0x445340)),_0x57fa13='tv';for(const _0x1da9dd of _0x289317){if(!_0x1da9dd)continue;_0x1da9dd[_0x5a29ec(0x1ee)](_0x57fa13,_0x1c1abc);}$gamePlayer[_0x5a29ec(0xe6)]();}),PluginManager[_0x3b4113(0x142)](pluginData['name'],_0x3b4113(0x10d),_0x4e3125=>{const _0x102c75=_0x3b4113;VisuMZ[_0x102c75(0xfc)](_0x4e3125,_0x4e3125);const _0x490b90=_0x4e3125['ActorId'][_0x102c75(0x1ca)](_0xedfa60=>$gameActors[_0x102c75(0x137)](_0xedfa60));for(const _0xc14389 of _0x490b90){if(_0x102c75(0x154)===_0x102c75(0x154)){if(!_0xc14389)continue;_0xc14389[_0x102c75(0x168)]('tv');}else!!this[_0x102c75(0x171)][_0x102c75(0x13d)]&&this[_0x102c75(0x12a)]();}$gamePlayer[_0x102c75(0xe6)]();}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x1d4),_0x38b895=>{const _0x153662=_0x3b4113;VisuMZ[_0x153662(0xfc)](_0x38b895,_0x38b895);const _0x408c28=_0x38b895[_0x153662(0x1e6)]['map'](_0x521d03=>$gameParty[_0x153662(0x1b9)]()[_0x521d03]);for(const _0x3a94bb of _0x408c28){if(!_0x3a94bb)continue;VisuMZ[_0x153662(0xeb)]['RemoveHorrorEffects'](_0x3a94bb);}$gamePlayer['refresh']();}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x150),_0x2c07bb=>{const _0x1bbe78=_0x3b4113;VisuMZ[_0x1bbe78(0xfc)](_0x2c07bb,_0x2c07bb);const _0x1d103a=_0x2c07bb['PartyIndex'][_0x1bbe78(0x1ca)](_0x45d254=>$gameParty[_0x1bbe78(0x1b9)]()[_0x45d254]),_0x3a829a=_0x1bbe78(0x1a2);for(const _0x2c5ea4 of _0x1d103a){if(!_0x2c5ea4)continue;_0x2c5ea4[_0x1bbe78(0x1ee)](_0x3a829a,_0x2c07bb);}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],'PartyColorRemove',_0x194233=>{const _0x4dd4bb=_0x3b4113,_0x75c699=_0x194233[_0x4dd4bb(0x1e6)][_0x4dd4bb(0x1ca)](_0x533380=>$gameParty[_0x4dd4bb(0x1b9)]()[_0x533380]);for(const _0x382c2c of _0x75c699){if(!_0x382c2c)continue;_0x382c2c[_0x4dd4bb(0x168)]('color');}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x1bb),_0xaf895d=>{const _0x56c016=_0x3b4113;VisuMZ[_0x56c016(0xfc)](_0xaf895d,_0xaf895d);const _0x59c769=_0xaf895d[_0x56c016(0x1e6)][_0x56c016(0x1ca)](_0x2712cc=>$gameParty[_0x56c016(0x1b9)]()[_0x2712cc]),_0x506337=_0x56c016(0xe1);_0xaf895d[_0x56c016(0x126)]=Math[_0x56c016(0x118)](_0xaf895d[_0x56c016(0x1c1)]/0x2),_0xaf895d[_0x56c016(0x10e)]=_0xaf895d[_0x56c016(0x1c1)],_0xaf895d[_0x56c016(0x165)]=!![];for(const _0x1d11d0 of _0x59c769){if('MCxlI'!==_0x56c016(0x149))_0xcaa8b7['HorrorEffects']['Spriteset_Map_initialize'][_0x56c016(0x15a)](this),this[_0x56c016(0x1ab)]=_0x5ef325;else{if(!_0x1d11d0)continue;_0x1d11d0[_0x56c016(0x1ee)](_0x506337,_0xaf895d);}}$gamePlayer[_0x56c016(0xe6)]();}),PluginManager['registerCommand'](pluginData['name'],_0x3b4113(0x1c4),_0x315915=>{const _0x173aae=_0x3b4113;VisuMZ[_0x173aae(0xfc)](_0x315915,_0x315915);const _0x3e1f6a=_0x315915['PartyIndex']['map'](_0xf7ce71=>$gameParty[_0x173aae(0x1b9)]()[_0xf7ce71]);for(const _0xd83713 of _0x3e1f6a){if(!_0xd83713)continue;_0xd83713[_0x173aae(0x168)](_0x173aae(0xe1));}$gamePlayer[_0x173aae(0xe6)]();}),PluginManager['registerCommand'](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x125),_0x3a6538=>{const _0x413a27=_0x3b4113;VisuMZ['ConvertParams'](_0x3a6538,_0x3a6538);const _0x1dae63=_0x3a6538[_0x413a27(0x1e6)]['map'](_0x275f02=>$gameParty['members']()[_0x275f02]),_0x307bc0=_0x413a27(0x16c);for(const _0x58cb6e of _0x1dae63){if(_0x413a27(0xd9)===_0x413a27(0x1dd))_0x123c6c[_0x413a27(0x1c6)]['clearHorrorEffects'][_0x413a27(0x15a)](this);else{if(!_0x58cb6e)continue;_0x58cb6e[_0x413a27(0x1ee)](_0x307bc0,_0x3a6538);}}$gamePlayer[_0x413a27(0xe6)]();}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0xfd),_0x4df388=>{const _0x2f29f1=_0x3b4113;VisuMZ[_0x2f29f1(0xfc)](_0x4df388,_0x4df388);const _0x31e12a=_0x4df388[_0x2f29f1(0x1e6)]['map'](_0x5a481c=>$gameParty[_0x2f29f1(0x1b9)]()[_0x5a481c]);for(const _0x36ad52 of _0x31e12a){if(_0x2f29f1(0x1a9)!=='MnHlr'){if(!_0x36ad52)continue;_0x36ad52[_0x2f29f1(0x168)](_0x2f29f1(0x16c));}else!!_0xa99c5[_0x2f29f1(0x14a)]()&&(_0x31d4b3[_0x2f29f1(0x1c6)]['createHorrorEffect'][_0x2f29f1(0x15a)](_0x4d8a6d[_0x2f29f1(0x14a)](),_0x5742a9),this[_0x2f29f1(0x1cd)]());}$gamePlayer['refresh']();}),PluginManager['registerCommand'](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x172),_0x255491=>{const _0x18762d=_0x3b4113;VisuMZ[_0x18762d(0xfc)](_0x255491,_0x255491);const _0x3a8e30=_0x255491[_0x18762d(0x1e6)][_0x18762d(0x1ca)](_0x5950b=>$gameParty[_0x18762d(0x1b9)]()[_0x5950b]),_0x4845dd='tv';for(const _0x1289b of _0x3a8e30){if('RmWIx'===_0x18762d(0x1dc))this[_0x18762d(0x171)][_0x18762d(0xdc)]['animated']&&(this[_0x18762d(0x171)]['noiseFilter'][_0x18762d(0x175)]=_0x5446d4[_0x18762d(0x1c5)]()*0x3);else{if(!_0x1289b)continue;_0x1289b[_0x18762d(0x1ee)](_0x4845dd,_0x255491);}}$gamePlayer['refresh']();}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0xde),_0x36c304=>{const _0x29ddb4=_0x3b4113;VisuMZ[_0x29ddb4(0xfc)](_0x36c304,_0x36c304);const _0x431db6=_0x36c304[_0x29ddb4(0x1e6)][_0x29ddb4(0x1ca)](_0x366440=>$gameParty[_0x29ddb4(0x1b9)]()[_0x366440]);for(const _0x3cadc4 of _0x431db6){if(!_0x3cadc4)continue;_0x3cadc4[_0x29ddb4(0x168)]('tv');}$gamePlayer[_0x29ddb4(0xe6)]();}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x117),_0x3127d8=>{const _0x234798=_0x3b4113;VisuMZ['ConvertParams'](_0x3127d8,_0x3127d8);const _0x4935b5=_0x3127d8[_0x234798(0x1de)]['map'](_0x4ffd9d=>$gameTroop[_0x234798(0x1b9)]()[_0x4ffd9d]);for(const _0x2056b3 of _0x4935b5){if('XYUTI'!==_0x234798(0x10b))this[_0x234798(0x171)]={},this[_0x234798(0x1ab)]=this[_0x234798(0x1ab)]||null,_0x5c8d00[_0x234798(0xeb)][_0x234798(0x18e)]['call'](this,_0x4ef9bd);else{if(!_0x2056b3)continue;VisuMZ['HorrorEffects'][_0x234798(0xcb)](_0x2056b3);}}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],'EnemyColorCreate',_0x12b74d=>{const _0x4318c8=_0x3b4113;VisuMZ[_0x4318c8(0xfc)](_0x12b74d,_0x12b74d);const _0x4c56d0=_0x12b74d[_0x4318c8(0x1de)][_0x4318c8(0x1ca)](_0x55cc59=>$gameTroop[_0x4318c8(0x1b9)]()[_0x55cc59]),_0x84e21d='color';for(const _0x2009d4 of _0x4c56d0){if(_0x4318c8(0x140)!==_0x4318c8(0x140))_0x21afb7[_0x4318c8(0xce)](),_0x320cfc[_0x4318c8(0x14e)](_0x416c32[_0x4318c8(0x1a0)]),_0x1ede8c['setHorrorTVCornerSize'](_0x5526bb[_0x4318c8(0x148)]),_0x3a65f2['setHorrorTVAnimated'](_0x40e011[_0x4318c8(0x1a1)]),_0x240ed8[_0x4318c8(0x1f6)](_0x1f407d[_0x4318c8(0x189)]);else{if(!_0x2009d4)continue;_0x2009d4[_0x4318c8(0x1ee)](_0x84e21d,_0x12b74d);}}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x1f9),_0x357625=>{const _0x2a627a=_0x3b4113,_0x59e94d=_0x357625['EnemyIndex'][_0x2a627a(0x1ca)](_0x399448=>$gameTroop[_0x2a627a(0x1b9)]()[_0x399448]);for(const _0x54e892 of _0x59e94d){if(!_0x54e892)continue;_0x54e892[_0x2a627a(0x168)]('color');}}),PluginManager[_0x3b4113(0x142)](pluginData['name'],_0x3b4113(0x129),_0x2f8e6b=>{const _0x641673=_0x3b4113;VisuMZ['ConvertParams'](_0x2f8e6b,_0x2f8e6b);const _0x26e32d=_0x2f8e6b[_0x641673(0x1de)][_0x641673(0x1ca)](_0x253d1c=>$gameTroop[_0x641673(0x1b9)]()[_0x253d1c]),_0x448cc4=_0x641673(0xe1);_0x2f8e6b['sliceMin']=Math['ceil'](_0x2f8e6b[_0x641673(0x1c1)]/0x2),_0x2f8e6b[_0x641673(0x10e)]=_0x2f8e6b['slices'],_0x2f8e6b[_0x641673(0x165)]=!![];for(const _0x4c0a9a of _0x26e32d){if(_0x641673(0x1a5)!=='QFycP')this[_0x641673(0x171)][_0x641673(0x13d)]={},this[_0x641673(0x171)]['tvFilter'][_0x641673(0x151)]=0x5,this[_0x641673(0x171)][_0x641673(0x13d)][_0x641673(0xf6)]=0.3,this['_horrorFilters'][_0x641673(0x13d)][_0x641673(0x1f2)]=!![],this[_0x641673(0x171)][_0x641673(0x13d)][_0x641673(0x143)]=0.25,this['_horrorFilters']['tvFilter'][_0x641673(0x15e)]=!![];else{if(!_0x4c0a9a)continue;_0x4c0a9a['setHorrorEffectSettings'](_0x448cc4,_0x2f8e6b);}}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0xef),_0x412786=>{const _0x5c4788=_0x3b4113;VisuMZ[_0x5c4788(0xfc)](_0x412786,_0x412786);const _0x269a7b=_0x412786[_0x5c4788(0x1de)]['map'](_0x296dbb=>$gameTroop['members']()[_0x296dbb]);for(const _0x1c3dfc of _0x269a7b){if(!_0x1c3dfc)continue;_0x1c3dfc[_0x5c4788(0x168)]('glitch');}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],'EnemyNoiseCreate',_0x2f1b3d=>{const _0x27b54c=_0x3b4113;VisuMZ[_0x27b54c(0xfc)](_0x2f1b3d,_0x2f1b3d);const _0x31cdb5=_0x2f1b3d[_0x27b54c(0x1de)][_0x27b54c(0x1ca)](_0x102947=>$gameTroop[_0x27b54c(0x1b9)]()[_0x102947]),_0x272fa3=_0x27b54c(0x16c);for(const _0x43923b of _0x31cdb5){if(!_0x43923b)continue;_0x43923b[_0x27b54c(0x1ee)](_0x272fa3,_0x2f1b3d);}}),PluginManager[_0x3b4113(0x142)](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x128),_0x10cf57=>{const _0x5d6216=_0x3b4113;VisuMZ[_0x5d6216(0xfc)](_0x10cf57,_0x10cf57);const _0xc59a7d=_0x10cf57[_0x5d6216(0x1de)]['map'](_0x520211=>$gameTroop[_0x5d6216(0x1b9)]()[_0x520211]);for(const _0x461029 of _0xc59a7d){if(!_0x461029)continue;_0x461029['removeHorrorEffect'](_0x5d6216(0x16c));}}),PluginManager['registerCommand'](pluginData[_0x3b4113(0xd3)],_0x3b4113(0x105),_0x5a2008=>{const _0x119d6d=_0x3b4113;VisuMZ[_0x119d6d(0xfc)](_0x5a2008,_0x5a2008);const _0x48e3c6=_0x5a2008[_0x119d6d(0x1de)][_0x119d6d(0x1ca)](_0x109314=>$gameTroop[_0x119d6d(0x1b9)]()[_0x109314]),_0x3d983e='tv';for(const _0xb18ec of _0x48e3c6){if(_0x119d6d(0xe9)===_0x119d6d(0xe9)){if(!_0xb18ec)continue;_0xb18ec[_0x119d6d(0x1ee)](_0x3d983e,_0x5a2008);}else this[_0x119d6d(0xd8)](this[_0x119d6d(0x171)][_0x119d6d(0x13d)]),this['_horrorFilters'][_0x119d6d(0x13d)]=_0x287cfd;}}),PluginManager['registerCommand'](pluginData['name'],_0x3b4113(0x18b),_0x397e7b=>{const _0x3d194a=_0x3b4113;VisuMZ[_0x3d194a(0xfc)](_0x397e7b,_0x397e7b);const _0x12ea5c=_0x397e7b[_0x3d194a(0x1de)][_0x3d194a(0x1ca)](_0x2ac2df=>$gameTroop[_0x3d194a(0x1b9)]()[_0x2ac2df]);for(const _0x6aeea of _0x12ea5c){if(!_0x6aeea)continue;_0x6aeea['removeHorrorEffect']('tv');}}),Game_Temp['prototype'][_0x3b4113(0xf5)]=function(_0x555497){const _0x4a7bf4=_0x3b4113;this[_0x4a7bf4(0x1b0)]=_0x555497;},Game_Temp[_0x3b4113(0x1c6)]['getLastPluginCommandInterpreter']=function(){const _0x4323be=_0x3b4113;return this[_0x4323be(0x1b0)];},VisuMZ[_0x3b4113(0xeb)]['Game_System_initialize']=Game_System['prototype'][_0x3b4113(0x147)],Game_System[_0x3b4113(0x1c6)][_0x3b4113(0x147)]=function(){const _0x283df1=_0x3b4113;VisuMZ['HorrorEffects'][_0x283df1(0x13b)][_0x283df1(0x15a)](this),this[_0x283df1(0x139)]();},Game_System[_0x3b4113(0x1c6)][_0x3b4113(0x139)]=function(){this['_horrorFilters']={};},Game_System['prototype']['createHorrorEffect']=function(_0x163b8b){const _0x3de904=_0x3b4113;this[_0x3de904(0x171)]===undefined&&this[_0x3de904(0x139)]();if(_0x163b8b[_0x3de904(0x1b3)](/noise/i)&&!this[_0x3de904(0x171)]['noiseFilter'])this['_horrorFilters'][_0x3de904(0xdc)]={},this[_0x3de904(0x171)][_0x3de904(0xdc)][_0x3de904(0x16c)]=0.3,this['_horrorFilters'][_0x3de904(0xdc)]['animated']=!![],this[_0x3de904(0x171)][_0x3de904(0xdc)][_0x3de904(0x15e)]=!![];else{if(_0x163b8b[_0x3de904(0x1b3)](/glitch/i)&&!this[_0x3de904(0x171)][_0x3de904(0xe4)])this[_0x3de904(0x171)][_0x3de904(0xe4)]={},this['_horrorFilters'][_0x3de904(0xe4)]['slices']=0xa,this[_0x3de904(0x171)]['glitchFilter'][_0x3de904(0x19f)]=0x64,this[_0x3de904(0x171)][_0x3de904(0xe4)]['sliceMin']=0x5,this[_0x3de904(0x171)][_0x3de904(0xe4)]['sliceMax']=0xa,this['_horrorFilters'][_0x3de904(0xe4)]['animated']=!![],this[_0x3de904(0x171)][_0x3de904(0xe4)][_0x3de904(0x12f)]=0x12c,this[_0x3de904(0x171)][_0x3de904(0xe4)][_0x3de904(0xe7)]=0x1e,this[_0x3de904(0x171)][_0x3de904(0xe4)][_0x3de904(0x15e)]=!![];else{if(_0x163b8b[_0x3de904(0x1b3)](/tv/i)&&!this[_0x3de904(0x171)]['tvFilter'])this[_0x3de904(0x171)]['tvFilter']={},this[_0x3de904(0x171)][_0x3de904(0x13d)][_0x3de904(0x151)]=0x5,this[_0x3de904(0x171)][_0x3de904(0x13d)][_0x3de904(0xf6)]=0.3,this[_0x3de904(0x171)][_0x3de904(0x13d)][_0x3de904(0x1f2)]=!![],this[_0x3de904(0x171)][_0x3de904(0x13d)]['aniSpeed']=0.25,this[_0x3de904(0x171)]['tvFilter'][_0x3de904(0x15e)]=!![];else _0x163b8b[_0x3de904(0x1b3)](/color/i)&&!this[_0x3de904(0x171)]['colorFilter']&&(this['_horrorFilters'][_0x3de904(0x174)]={},this[_0x3de904(0x171)][_0x3de904(0x174)][_0x3de904(0x1d3)]=_0x3de904(0x107),this[_0x3de904(0x171)][_0x3de904(0x174)]['needUpdate']=!![]);}}},Game_System[_0x3b4113(0x1c6)][_0x3b4113(0x168)]=function(_0x16ae6b){const _0x2b12a9=_0x3b4113;this[_0x2b12a9(0x171)]===undefined&&this['clearHorrorEffects'](),_0x16ae6b+=_0x2b12a9(0x194),this[_0x2b12a9(0x171)][_0x16ae6b]=undefined;},Game_System[_0x3b4113(0x1c6)][_0x3b4113(0x180)]=function(_0x395029,_0x5d5aa6,_0x3e755c){const _0x461f0d=_0x3b4113;this[_0x461f0d(0x171)]===undefined&&this[_0x461f0d(0x139)](),_0x395029+=_0x461f0d(0x194),!!this[_0x461f0d(0x171)][_0x395029]&&(this[_0x461f0d(0x171)][_0x395029][_0x5d5aa6]=_0x3e755c,this[_0x461f0d(0x171)][_0x395029]['needUpdate']=!![]);},Game_System['prototype']['setHorrorEffectSettings']=function(_0x5178ef,_0x504e7c){const _0x9338b6=_0x3b4113;this[_0x9338b6(0x171)]===undefined&&this[_0x9338b6(0x139)](),_0x5178ef+='Filter',this[_0x9338b6(0x171)][_0x5178ef]=JsonEx['makeDeepCopy'](_0x504e7c),this[_0x9338b6(0x171)][_0x5178ef][_0x9338b6(0x15e)]=!![];},VisuMZ[_0x3b4113(0xeb)][_0x3b4113(0x11d)]=Game_Screen[_0x3b4113(0x1c6)][_0x3b4113(0x110)],Game_Screen['prototype'][_0x3b4113(0x110)]=function(){const _0x4bf8ee=_0x3b4113;VisuMZ[_0x4bf8ee(0xeb)][_0x4bf8ee(0x11d)][_0x4bf8ee(0x15a)](this),this[_0x4bf8ee(0x139)]();},Game_Screen[_0x3b4113(0x1c6)][_0x3b4113(0x139)]=function(){const _0x280bbc=_0x3b4113;Game_System['prototype'][_0x280bbc(0x139)]['call'](this);},Game_Screen[_0x3b4113(0x1c6)][_0x3b4113(0x1cc)]=function(_0x4334e1){const _0x2c4e10=_0x3b4113;Game_System['prototype'][_0x2c4e10(0x1cc)]['call'](this,_0x4334e1);},Game_Screen['prototype'][_0x3b4113(0x168)]=function(_0x181331){const _0x4317e8=_0x3b4113;Game_System[_0x4317e8(0x1c6)][_0x4317e8(0x168)]['call'](this,_0x181331);},Game_Screen[_0x3b4113(0x1c6)][_0x3b4113(0x180)]=function(_0x2082c6,_0xeb0442,_0x4192ce){const _0x5295bd=_0x3b4113;Game_System['prototype'][_0x5295bd(0x180)][_0x5295bd(0x15a)](this,_0x2082c6,_0xeb0442,_0x4192ce);},Game_Screen[_0x3b4113(0x1c6)][_0x3b4113(0x1ee)]=function(_0x3a96e8,_0x16c469){const _0x130d0d=_0x3b4113;Game_System[_0x130d0d(0x1c6)]['setHorrorEffectSettings'][_0x130d0d(0x15a)](this,_0x3a96e8,_0x16c469);},VisuMZ['HorrorEffects']['Game_Picture_initialize']=Game_Picture[_0x3b4113(0x1c6)][_0x3b4113(0x147)],Game_Picture[_0x3b4113(0x1c6)]['initialize']=function(){const _0x279f2d=_0x3b4113;VisuMZ[_0x279f2d(0xeb)][_0x279f2d(0x121)][_0x279f2d(0x15a)](this),this['_horrorFilters']=this[_0x279f2d(0x171)]||{};},VisuMZ[_0x3b4113(0xeb)][_0x3b4113(0xf8)]=Game_Picture['prototype']['erase'],Game_Picture[_0x3b4113(0x1c6)]['erase']=function(){const _0x45f1b3=_0x3b4113;VisuMZ[_0x45f1b3(0xeb)]['Game_Picture_erase'][_0x45f1b3(0x15a)](this),this['clearHorrorEffects']();},Game_Picture[_0x3b4113(0x1c6)][_0x3b4113(0x139)]=function(){const _0x18ec91=_0x3b4113;Game_System[_0x18ec91(0x1c6)][_0x18ec91(0x139)][_0x18ec91(0x15a)](this);},Game_Picture[_0x3b4113(0x1c6)]['createHorrorEffect']=function(_0xdab34b){const _0x2e5ac9=_0x3b4113;Game_System[_0x2e5ac9(0x1c6)][_0x2e5ac9(0x1cc)]['call'](this,_0xdab34b);},Game_Picture[_0x3b4113(0x1c6)]['removeHorrorEffect']=function(_0x326c4e){const _0x841f26=_0x3b4113;Game_System[_0x841f26(0x1c6)][_0x841f26(0x168)][_0x841f26(0x15a)](this,_0x326c4e);},Game_Picture[_0x3b4113(0x1c6)][_0x3b4113(0x180)]=function(_0x50a6f7,_0xc80f78,_0x1c21b3){const _0x1f81c3=_0x3b4113;Game_System[_0x1f81c3(0x1c6)][_0x1f81c3(0x180)][_0x1f81c3(0x15a)](this,_0x50a6f7,_0xc80f78,_0x1c21b3);},Game_Picture[_0x3b4113(0x1c6)][_0x3b4113(0x1ee)]=function(_0x3da856,_0x3621f6){const _0x375ef8=_0x3b4113;Game_System['prototype'][_0x375ef8(0x1ee)]['call'](this,_0x3da856,_0x3621f6);},VisuMZ[_0x3b4113(0xeb)][_0x3b4113(0x1e0)]=Game_BattlerBase[_0x3b4113(0x1c6)]['initialize'],Game_BattlerBase[_0x3b4113(0x1c6)][_0x3b4113(0x147)]=function(){const _0x1b9d3f=_0x3b4113;VisuMZ[_0x1b9d3f(0xeb)]['Game_BattlerBase_initialize'][_0x1b9d3f(0x15a)](this),this['clearHorrorEffects']();},Game_BattlerBase[_0x3b4113(0x1c6)]['clearHorrorEffects']=function(){const _0x5cf469=_0x3b4113;Game_System[_0x5cf469(0x1c6)][_0x5cf469(0x139)][_0x5cf469(0x15a)](this);},Game_BattlerBase[_0x3b4113(0x1c6)][_0x3b4113(0x1cc)]=function(_0x258b4c){const _0xddd8c0=_0x3b4113;Game_System[_0xddd8c0(0x1c6)][_0xddd8c0(0x1cc)][_0xddd8c0(0x15a)](this,_0x258b4c);},Game_BattlerBase[_0x3b4113(0x1c6)]['removeHorrorEffect']=function(_0x26f6fd){const _0x3ebe65=_0x3b4113;Game_System[_0x3ebe65(0x1c6)][_0x3ebe65(0x168)][_0x3ebe65(0x15a)](this,_0x26f6fd);},Game_BattlerBase[_0x3b4113(0x1c6)][_0x3b4113(0x180)]=function(_0x5ea607,_0x5b46a0,_0x291d07){const _0x2cb16e=_0x3b4113;Game_System[_0x2cb16e(0x1c6)]['setHorrorEffectToValue'][_0x2cb16e(0x15a)](this,_0x5ea607,_0x5b46a0,_0x291d07);},Game_BattlerBase[_0x3b4113(0x1c6)][_0x3b4113(0x1ee)]=function(_0xd0b934,_0x1c4239){const _0x42a411=_0x3b4113;Game_System[_0x42a411(0x1c6)][_0x42a411(0x1ee)][_0x42a411(0x15a)](this,_0xd0b934,_0x1c4239);},VisuMZ['HorrorEffects'][_0x3b4113(0x11f)]=Game_CharacterBase[_0x3b4113(0x1c6)][_0x3b4113(0x195)],Game_CharacterBase[_0x3b4113(0x1c6)][_0x3b4113(0x195)]=function(){const _0x57bdc0=_0x3b4113;VisuMZ[_0x57bdc0(0xeb)][_0x57bdc0(0x11f)]['call'](this),this[_0x57bdc0(0x139)]();},Game_CharacterBase[_0x3b4113(0x1c6)][_0x3b4113(0x139)]=function(){const _0x164921=_0x3b4113;Game_System['prototype'][_0x164921(0x139)][_0x164921(0x15a)](this);},Game_CharacterBase[_0x3b4113(0x1c6)][_0x3b4113(0x1cc)]=function(_0x353ffa){Game_System['prototype']['createHorrorEffect']['call'](this,_0x353ffa);},Game_CharacterBase[_0x3b4113(0x1c6)][_0x3b4113(0x168)]=function(_0x9fb9b7){const _0x5181cf=_0x3b4113;Game_System[_0x5181cf(0x1c6)][_0x5181cf(0x168)]['call'](this,_0x9fb9b7);},Game_CharacterBase['prototype'][_0x3b4113(0x180)]=function(_0x34e214,_0x20e8fa,_0x274dc9){const _0x3501cc=_0x3b4113;Game_System['prototype'][_0x3501cc(0x180)][_0x3501cc(0x15a)](this,_0x34e214,_0x20e8fa,_0x274dc9);},Game_CharacterBase['prototype']['setHorrorEffectSettings']=function(_0x330ceb,_0x8805cc){const _0x59fe76=_0x3b4113;Game_System[_0x59fe76(0x1c6)][_0x59fe76(0x1ee)][_0x59fe76(0x15a)](this,_0x330ceb,_0x8805cc);},VisuMZ[_0x3b4113(0xeb)][_0x3b4113(0x1fa)]=Game_Player[_0x3b4113(0x1c6)][_0x3b4113(0xe6)],Game_Player['prototype'][_0x3b4113(0xe6)]=function(){const _0xca07d7=_0x3b4113;VisuMZ[_0xca07d7(0xeb)][_0xca07d7(0x1fa)]['call'](this),!!$gameParty[_0xca07d7(0x14a)]()&&(_0xca07d7(0x14b)===_0xca07d7(0x1d1)?!!this[_0xca07d7(0x171)][_0xca07d7(0xe4)]&&(this[_0xca07d7(0x171)][_0xca07d7(0xe4)][_0xca07d7(0x19f)]=_0x5be951):this[_0xca07d7(0x1cd)]());},Game_Player[_0x3b4113(0x1c6)][_0x3b4113(0x139)]=function(){const _0x2c0e62=_0x3b4113;!!$gameParty['leader']()&&(Game_System[_0x2c0e62(0x1c6)][_0x2c0e62(0x139)]['call']($gameParty['leader']()),this[_0x2c0e62(0x1cd)]());},Game_Player[_0x3b4113(0x1c6)][_0x3b4113(0x1cc)]=function(_0x177955){const _0x82fd85=_0x3b4113;if(!!$gameParty['leader']()){if(_0x82fd85(0x11a)===_0x82fd85(0x11a))Game_System['prototype'][_0x82fd85(0x1cc)]['call']($gameParty[_0x82fd85(0x14a)](),_0x177955),this[_0x82fd85(0x1cd)]();else{if(!_0x495bf6[_0x82fd85(0xe2)][_0x82fd85(0x119)])return;!!this['_horrorFilters'][_0x82fd85(0xdc)]&&(this[_0x82fd85(0x171)][_0x82fd85(0xdc)]['animated']&&(this[_0x82fd85(0x171)][_0x82fd85(0xdc)]['seed']=_0x5739a0[_0x82fd85(0x1c5)]()*0x3));}}},Game_Player[_0x3b4113(0x1c6)][_0x3b4113(0x168)]=function(_0x4e305b){const _0x5b999b=_0x3b4113;!!$gameParty[_0x5b999b(0x14a)]()&&(_0x5b999b(0xdb)!==_0x5b999b(0xdb)?this[_0x5b999b(0x171)]['glitchFilter'][_0x2ec33d]=![]:(Game_System[_0x5b999b(0x1c6)][_0x5b999b(0x168)]['call']($gameParty[_0x5b999b(0x14a)](),_0x4e305b),this[_0x5b999b(0x1cd)]()));},Game_Player[_0x3b4113(0x1c6)][_0x3b4113(0x180)]=function(_0x4b87b3,_0x5d6975,_0x41bcd6){const _0x3bb203=_0x3b4113;!!$gameParty[_0x3bb203(0x14a)]()&&(_0x3bb203(0x19c)!==_0x3bb203(0x19c)?(_0x3aa05d['prototype']['clearHorrorEffects']['call'](this[_0x3bb203(0x137)]()),this[_0x3bb203(0x1cd)]()):(Game_System['prototype'][_0x3bb203(0x180)][_0x3bb203(0x15a)]($gameParty[_0x3bb203(0x14a)](),_0x4b87b3,_0x5d6975,_0x41bcd6),this[_0x3bb203(0x1cd)]()));},Game_Player[_0x3b4113(0x1c6)][_0x3b4113(0x1ee)]=function(_0x40e3ff,_0x475188){const _0x2f2d59=_0x3b4113;!!$gameParty[_0x2f2d59(0x14a)]()&&(Game_System['prototype'][_0x2f2d59(0x1ee)][_0x2f2d59(0x15a)]($gameParty[_0x2f2d59(0x14a)](),_0x40e3ff,_0x475188),this['synchronizeHorrorEffects']());},Game_Player['prototype'][_0x3b4113(0x1cd)]=function(){const _0x46c0d4=_0x3b4113;this[_0x46c0d4(0x171)]=JsonEx[_0x46c0d4(0x159)]($gameParty[_0x46c0d4(0x14a)]()[_0x46c0d4(0x171)]);},VisuMZ[_0x3b4113(0xeb)][_0x3b4113(0x1a4)]=Game_Follower[_0x3b4113(0x1c6)][_0x3b4113(0xe6)],Game_Follower[_0x3b4113(0x1c6)][_0x3b4113(0xe6)]=function(){const _0x3221b8=_0x3b4113;VisuMZ[_0x3221b8(0xeb)][_0x3221b8(0x1a4)]['call'](this),!!this[_0x3221b8(0x137)]()&&this[_0x3221b8(0x1cd)]();},Game_Follower['prototype'][_0x3b4113(0x139)]=function(){const _0x26a59f=_0x3b4113;!!this[_0x26a59f(0x137)]()&&(Game_System[_0x26a59f(0x1c6)]['clearHorrorEffects']['call'](this[_0x26a59f(0x137)]()),this['synchronizeHorrorEffects']());},Game_Follower[_0x3b4113(0x1c6)][_0x3b4113(0x1cc)]=function(_0x227069){const _0xa1a0ea=_0x3b4113;if(!!this['actor']()){if(_0xa1a0ea(0x1a8)!==_0xa1a0ea(0x1d2))Game_System[_0xa1a0ea(0x1c6)][_0xa1a0ea(0x1cc)]['call'](this[_0xa1a0ea(0x137)](),_0x227069),this[_0xa1a0ea(0x1cd)]();else{if(!_0x1dffde[_0xa1a0ea(0xe2)]['NoiseFilter'])return;!this[_0xa1a0ea(0x171)][_0xa1a0ea(0xdc)]&&(this[_0xa1a0ea(0x171)][_0xa1a0ea(0xdc)]=new _0x13dac1[(_0xa1a0ea(0xe2))][(_0xa1a0ea(0x119))](),this['createHorrorFilter'](this[_0xa1a0ea(0x171)]['noiseFilter'])),this[_0xa1a0ea(0x171)][_0xa1a0ea(0xdc)][_0xa1a0ea(0x16c)]=0.3,this[_0xa1a0ea(0x171)][_0xa1a0ea(0xdc)][_0xa1a0ea(0x1f2)]=!![];}}},Game_Follower['prototype']['removeHorrorEffect']=function(_0x5403f3){const _0x21846e=_0x3b4113;!!this[_0x21846e(0x137)]()&&(Game_System[_0x21846e(0x1c6)][_0x21846e(0x168)][_0x21846e(0x15a)](this['actor'](),_0x5403f3),this[_0x21846e(0x1cd)]());},Game_Follower['prototype']['setHorrorEffectToValue']=function(_0x8ebcfb,_0x546649,_0x116892){const _0x1eb3b9=_0x3b4113;!!this[_0x1eb3b9(0x137)]()&&(Game_System[_0x1eb3b9(0x1c6)]['setHorrorEffectToValue'][_0x1eb3b9(0x15a)](this[_0x1eb3b9(0x137)](),_0x8ebcfb,_0x546649,_0x116892),this[_0x1eb3b9(0x1cd)]());},Game_Follower[_0x3b4113(0x1c6)][_0x3b4113(0x1ee)]=function(_0x30e932,_0x281e74){const _0x128452=_0x3b4113;!!this[_0x128452(0x137)]()&&(Game_System[_0x128452(0x1c6)][_0x128452(0x1ee)][_0x128452(0x15a)](this[_0x128452(0x137)](),_0x30e932,_0x281e74),this['synchronizeHorrorEffects']());},Game_Follower[_0x3b4113(0x1c6)][_0x3b4113(0x1cd)]=function(){const _0x37c645=_0x3b4113;this[_0x37c645(0x171)]=JsonEx[_0x37c645(0x159)](this[_0x37c645(0x137)]()['_horrorFilters']);},VisuMZ[_0x3b4113(0xeb)][_0x3b4113(0x134)]=Game_Interpreter['prototype'][_0x3b4113(0x17b)],Game_Interpreter[_0x3b4113(0x1c6)][_0x3b4113(0x17b)]=function(_0x4efa5c){const _0x5220d3=_0x3b4113;return $gameTemp[_0x5220d3(0xf5)](this),VisuMZ[_0x5220d3(0xeb)][_0x5220d3(0x134)][_0x5220d3(0x15a)](this,_0x4efa5c);},VisuMZ[_0x3b4113(0xeb)][_0x3b4113(0x18f)]=Scene_Title[_0x3b4113(0x1c6)][_0x3b4113(0x1a3)],Scene_Title[_0x3b4113(0x1c6)][_0x3b4113(0x1a3)]=function(){const _0x514fc1=_0x3b4113;VisuMZ['HorrorEffects'][_0x514fc1(0x18f)][_0x514fc1(0x15a)](this);if(ConfigManager[_0x514fc1(0x197)]===![])return;this[_0x514fc1(0xca)](this['_backSprite1'],VisuMZ[_0x514fc1(0xeb)][_0x514fc1(0x145)][_0x514fc1(0x10a)]),this[_0x514fc1(0xca)](this[_0x514fc1(0x18c)],VisuMZ[_0x514fc1(0xeb)][_0x514fc1(0x145)][_0x514fc1(0x108)]);},Scene_Title[_0x3b4113(0x1c6)][_0x3b4113(0xca)]=function(_0x445ee2,_0x3fd7a6){const _0x2ae59e=_0x3b4113;!!_0x445ee2&&!!_0x3fd7a6&&(_0x2ae59e(0x1bd)==='VdkEN'?(!!_0x3fd7a6[_0x2ae59e(0x1a7)]&&(_0x445ee2[_0x2ae59e(0x192)](),_0x445ee2[_0x2ae59e(0x135)](_0x3fd7a6[_0x2ae59e(0x15f)]),_0x445ee2[_0x2ae59e(0x111)](_0x3fd7a6[_0x2ae59e(0x1d8)])),!!_0x3fd7a6[_0x2ae59e(0x13c)]&&(_0x2ae59e(0x173)!==_0x2ae59e(0x173)?(this['removeHorrorFilter'](this['_horrorFilters'][_0x2ae59e(0xdc)]),this[_0x2ae59e(0x171)][_0x2ae59e(0xdc)]=_0x2b795b):(_0x445ee2[_0x2ae59e(0xd4)](),_0x445ee2[_0x2ae59e(0x136)](_0x3fd7a6['GlitchSlices']),_0x445ee2[_0x2ae59e(0x1ad)](_0x3fd7a6[_0x2ae59e(0xf2)]),_0x445ee2[_0x2ae59e(0xe3)](_0x3fd7a6[_0x2ae59e(0x1eb)]),_0x445ee2['setHorrorGlitchFrequency'](_0x3fd7a6['GlitchAniFreq']),_0x445ee2[_0x2ae59e(0x1b7)](_0x3fd7a6[_0x2ae59e(0xcc)]))),!!_0x3fd7a6['TV']&&('FSTNh'==='LYKgk'?!!this[_0x2ae59e(0x171)]['glitchFilter']&&this['removeHorrorGlitch']():(_0x445ee2[_0x2ae59e(0xce)](),_0x445ee2[_0x2ae59e(0x14e)](_0x3fd7a6[_0x2ae59e(0x1a0)]),_0x445ee2[_0x2ae59e(0x130)](_0x3fd7a6['TVCorner']),_0x445ee2[_0x2ae59e(0x16a)](_0x3fd7a6[_0x2ae59e(0x1a1)]),_0x445ee2[_0x2ae59e(0x1f6)](_0x3fd7a6[_0x2ae59e(0x189)])))):(this['updateHorrorNoise'](),this[_0x2ae59e(0x152)](),this['updateHorrorTV'](),this[_0x2ae59e(0x153)]()));},VisuMZ[_0x3b4113(0xeb)][_0x3b4113(0x18e)]=Sprite['prototype'][_0x3b4113(0x147)],Sprite[_0x3b4113(0x1c6)][_0x3b4113(0x147)]=function(_0x5ee658){const _0x336910=_0x3b4113;this[_0x336910(0x171)]={},this[_0x336910(0x1ab)]=this[_0x336910(0x1ab)]||null,VisuMZ['HorrorEffects'][_0x336910(0x18e)]['call'](this,_0x5ee658);},VisuMZ['HorrorEffects'][_0x3b4113(0xe8)]=Sprite[_0x3b4113(0x1c6)][_0x3b4113(0x13f)],Sprite[_0x3b4113(0x1c6)][_0x3b4113(0x13f)]=function(){const _0x37a007=_0x3b4113;this['synchronizeHorrorFiltersWithSource'](),VisuMZ[_0x37a007(0xeb)]['Sprite_update'][_0x37a007(0x15a)](this),this[_0x37a007(0x17a)]();},Sprite[_0x3b4113(0x1c6)][_0x3b4113(0x17a)]=function(){const _0x729585=_0x3b4113;this['updateHorrorNoise'](),this[_0x729585(0x152)](),this['updateHorrorTV'](),this['updateHorrorColor']();},Sprite[_0x3b4113(0x1c6)][_0x3b4113(0x183)]=function(_0x291e99){const _0x37f89d=_0x3b4113;this[_0x37f89d(0xe2)]=this[_0x37f89d(0xe2)]||[],this['filters'][_0x37f89d(0x1e3)](_0x291e99);},Sprite[_0x3b4113(0x1c6)]['removeHorrorFilter']=function(_0x272902){const _0x5331cc=_0x3b4113;var _0x231a4f=this['filters'][_0x5331cc(0x162)](_0x272902);this['filters'][_0x5331cc(0x116)](_0x231a4f,0x1),this[_0x5331cc(0xe2)]['length']===0x0&&(this[_0x5331cc(0xe2)]=null);},Sprite['prototype']['synchronizeHorrorFiltersWithSource']=function(){const _0x2a4277=_0x3b4113;if(ConfigManager[_0x2a4277(0x197)]===![])return;if(!PIXI[_0x2a4277(0xe2)][_0x2a4277(0x119)])return;if(!PIXI[_0x2a4277(0xe2)][_0x2a4277(0x190)])return;if(!PIXI['filters'][_0x2a4277(0x158)])return;if(!!this[_0x2a4277(0x1ab)]&&!!this['_horrorFiltersSource'][_0x2a4277(0x171)]){if(_0x2a4277(0x1f4)===_0x2a4277(0x1f4)){var _0xeccc9e=this[_0x2a4277(0x1ab)][_0x2a4277(0x171)];if(!!_0xeccc9e[_0x2a4277(0xdc)]){!this[_0x2a4277(0x171)]['noiseFilter']&&this[_0x2a4277(0x192)]();if(_0xeccc9e['noiseFilter'][_0x2a4277(0x15e)]){if(_0x2a4277(0x15d)===_0x2a4277(0x15d)){_0xeccc9e[_0x2a4277(0xdc)]['needUpdate']=![];var _0x4db4a3=[_0x2a4277(0x16c),'animated'];for(var _0x53ac17=0x0;_0x53ac17<_0x4db4a3[_0x2a4277(0x16e)];_0x53ac17++){var _0x2946bf=_0x4db4a3[_0x53ac17];this[_0x2a4277(0x171)][_0x2a4277(0xdc)][_0x2946bf]=_0xeccc9e[_0x2a4277(0xdc)][_0x2946bf];}}else!!this[_0x2a4277(0x171)][_0x2a4277(0xe4)]&&(_0x3737fc===_0x164bce&&(_0x46cee6=_0x4a9a61['ceil'](_0x38aea7/0x2)),_0x100f20===_0x17ef3d&&(_0x1a9643=_0x5158e7),this[_0x2a4277(0x171)][_0x2a4277(0xe4)][_0x2a4277(0x126)]=_0x2c1107,this[_0x2a4277(0x171)]['glitchFilter']['sliceMax']=_0x5e4cc3,this[_0x2a4277(0x171)][_0x2a4277(0xe4)][_0x2a4277(0x1c1)]=_0x1d7603,this[_0x2a4277(0x171)]['glitchFilter']['refresh']());}}else!!this[_0x2a4277(0x171)][_0x2a4277(0xdc)]&&this['removeHorrorNoise']();if(!!_0xeccc9e[_0x2a4277(0xe4)]){if(_0x2a4277(0x1df)!==_0x2a4277(0x1df))this[_0x2a4277(0x171)][_0x2a4277(0x13d)][_0x2a4277(0x1f2)]&&(this[_0x2a4277(0x171)][_0x2a4277(0x13d)]['time']+=this[_0x2a4277(0x171)][_0x2a4277(0x13d)][_0x2a4277(0x143)]);else{!this['_horrorFilters'][_0x2a4277(0xe4)]&&this[_0x2a4277(0xd4)]();if(_0xeccc9e[_0x2a4277(0xe4)][_0x2a4277(0x15e)]){_0xeccc9e[_0x2a4277(0xe4)][_0x2a4277(0x15e)]=![];var _0x4db4a3=[_0x2a4277(0x1c1),'offset',_0x2a4277(0x126),_0x2a4277(0x10e),_0x2a4277(0x1f2),_0x2a4277(0x12f),'aniStrength',_0x2a4277(0x165)];for(var _0x53ac17=0x0;_0x53ac17<_0x4db4a3[_0x2a4277(0x16e)];_0x53ac17++){if(_0x2a4277(0x100)!==_0x2a4277(0x100)){var _0x11fe11=_0x41f375[_0x5c7c05];this[_0x2a4277(0x171)][_0x2a4277(0xdc)][_0x11fe11]=_0x59799d[_0x2a4277(0xdc)][_0x11fe11];}else{var _0x2946bf=_0x4db4a3[_0x53ac17];this[_0x2a4277(0x171)]['glitchFilter'][_0x2946bf]=_0xeccc9e[_0x2a4277(0xe4)][_0x2946bf],_0x2946bf===_0x2a4277(0x165)&&(_0xeccc9e[_0x2a4277(0xe4)][_0x2946bf]=![]);}}}}}else!!this['_horrorFilters'][_0x2a4277(0xe4)]&&(_0x2a4277(0x1b1)!==_0x2a4277(0x167)?this[_0x2a4277(0xee)]():(this['_horrorFilters']['colorFilter']={},this[_0x2a4277(0x171)][_0x2a4277(0x174)][_0x2a4277(0x1d3)]='normal',this['_horrorFilters'][_0x2a4277(0x174)][_0x2a4277(0x15e)]=!![]));if(!!_0xeccc9e[_0x2a4277(0x13d)]){!this[_0x2a4277(0x171)][_0x2a4277(0x13d)]&&(_0x2a4277(0x193)!==_0x2a4277(0x193)?!!this[_0x2a4277(0x171)][_0x2a4277(0xe4)]&&(this[_0x2a4277(0x171)][_0x2a4277(0xe4)]['aniStrength']=_0x5b27a8):this[_0x2a4277(0xce)]());if(_0xeccc9e[_0x2a4277(0x13d)][_0x2a4277(0x15e)]){_0xeccc9e[_0x2a4277(0x13d)]['needUpdate']=![];var _0x4db4a3=[_0x2a4277(0x151),_0x2a4277(0xf6),'animated','aniSpeed'];for(var _0x53ac17=0x0;_0x53ac17<_0x4db4a3[_0x2a4277(0x16e)];_0x53ac17++){if(_0x2a4277(0x1c9)!==_0x2a4277(0x1c9))!!this[_0x2a4277(0x171)][_0x2a4277(0xe4)]&&(this[_0x2a4277(0x171)][_0x2a4277(0xe4)]['animated']=_0x107847);else{var _0x2946bf=_0x4db4a3[_0x53ac17];this[_0x2a4277(0x171)]['tvFilter'][_0x2946bf]=_0xeccc9e['tvFilter'][_0x2946bf];}}}}else _0x2a4277(0x1cb)!=='OjScc'?!!this[_0x2a4277(0x171)]['tvFilter']&&('gTFIz'==='gTFIz'?this[_0x2a4277(0x12a)]():this['clearHorrorEffects']()):!!this[_0x2a4277(0x137)]()&&(_0x31fc67[_0x2a4277(0x1c6)][_0x2a4277(0x1ee)][_0x2a4277(0x15a)](this[_0x2a4277(0x137)](),_0x27ab92,_0x20858a),this[_0x2a4277(0x1cd)]());if(!!_0xeccc9e['colorFilter']){!this['_horrorFilters'][_0x2a4277(0x174)]&&('IrKAW'!==_0x2a4277(0x115)?(_0xe647bc[_0x2a4277(0xeb)]['Sprite_Picture_updateBitmap']['call'](this),this[_0x2a4277(0x16f)]&&!this[_0x2a4277(0x1ab)]?this[_0x2a4277(0x1ab)]=this[_0x2a4277(0x185)]():this['_horrorFiltersSource']=_0x4d6e00):this[_0x2a4277(0x1d7)]());if(_0xeccc9e[_0x2a4277(0x174)][_0x2a4277(0x15e)]){_0xeccc9e[_0x2a4277(0x174)]['needUpdate']=![];var _0x4db4a3=[_0x2a4277(0x1d3)];for(var _0x53ac17=0x0;_0x53ac17<_0x4db4a3[_0x2a4277(0x16e)];_0x53ac17++){var _0x2946bf=_0x4db4a3[_0x53ac17];this[_0x2a4277(0x171)][_0x2a4277(0x174)][_0x2946bf]=_0xeccc9e[_0x2a4277(0x174)][_0x2946bf];}}}else!!this[_0x2a4277(0x171)][_0x2a4277(0x174)]&&(_0x2a4277(0x1ec)===_0x2a4277(0x14d)?this[_0x2a4277(0x171)]['glitchFilter'][_0x2a4277(0x1f2)]=_0x1fe3f0:this[_0x2a4277(0x1ac)]());}else this[_0x2a4277(0x171)][_0x2a4277(0xe4)]=new _0x25c818[(_0x2a4277(0xe2))][(_0x2a4277(0x190))](),this[_0x2a4277(0x183)](this[_0x2a4277(0x171)]['glitchFilter']);}},Sprite['prototype'][_0x3b4113(0x192)]=function(){const _0x332717=_0x3b4113;if(!PIXI[_0x332717(0xe2)]['NoiseFilter'])return;if(!this[_0x332717(0x171)][_0x332717(0xdc)]){if(_0x332717(0xda)!==_0x332717(0xda)){var _0x3faecf=this[_0x332717(0xe2)]['indexOf'](_0x5bd3d3);this[_0x332717(0xe2)][_0x332717(0x116)](_0x3faecf,0x1),this[_0x332717(0xe2)][_0x332717(0x16e)]===0x0&&(this[_0x332717(0xe2)]=null);}else this[_0x332717(0x171)][_0x332717(0xdc)]=new PIXI['filters']['NoiseFilter'](),this[_0x332717(0x183)](this[_0x332717(0x171)]['noiseFilter']);}this['_horrorFilters'][_0x332717(0xdc)][_0x332717(0x16c)]=0.3,this[_0x332717(0x171)][_0x332717(0xdc)][_0x332717(0x1f2)]=!![];},Sprite[_0x3b4113(0x1c6)]['removeHorrorNoise']=function(){const _0x5a8ffe=_0x3b4113;!!this['_horrorFilters'][_0x5a8ffe(0xdc)]&&(this['removeHorrorFilter'](this[_0x5a8ffe(0x171)][_0x5a8ffe(0xdc)]),this['_horrorFilters'][_0x5a8ffe(0xdc)]=undefined);},Sprite[_0x3b4113(0x1c6)][_0x3b4113(0x1f5)]=function(){const _0x1fb981=_0x3b4113;if(!PIXI[_0x1fb981(0xe2)]['NoiseFilter'])return;!!this[_0x1fb981(0x171)][_0x1fb981(0xdc)]&&(this[_0x1fb981(0x171)][_0x1fb981(0xdc)][_0x1fb981(0x1f2)]&&(this['_horrorFilters']['noiseFilter'][_0x1fb981(0x175)]=Math[_0x1fb981(0x1c5)]()*0x3));},Sprite[_0x3b4113(0x1c6)]['setHorrorNoiseRate']=function(_0xb530f){const _0x4241c9=_0x3b4113;!!this['_horrorFilters']['noiseFilter']&&(_0x4241c9(0x1ae)===_0x4241c9(0x160)?_0x51b72f[_0x4241c9(0x1c1)]=0x0:this[_0x4241c9(0x171)][_0x4241c9(0xdc)][_0x4241c9(0x16c)]=_0xb530f);},Sprite[_0x3b4113(0x1c6)][_0x3b4113(0x111)]=function(_0x2f8110){const _0x327375=_0x3b4113;!!this['_horrorFilters'][_0x327375(0xdc)]&&(this[_0x327375(0x171)][_0x327375(0xdc)]['animated']=_0x2f8110);},Sprite[_0x3b4113(0x1c6)][_0x3b4113(0xd4)]=function(){const _0x641169=_0x3b4113;if(!PIXI[_0x641169(0xe2)][_0x641169(0x190)])return;if(!this['_horrorFilters'][_0x641169(0xe4)]){if(_0x641169(0xcd)!==_0x641169(0x16b))this['_horrorFilters'][_0x641169(0xe4)]=new PIXI['filters'][(_0x641169(0x190))](),this[_0x641169(0x183)](this[_0x641169(0x171)][_0x641169(0xe4)]);else{if(!_0x2ab325['filters'][_0x641169(0x190)])return;!this[_0x641169(0x171)][_0x641169(0xe4)]&&(this['_horrorFilters'][_0x641169(0xe4)]=new _0x557c48[(_0x641169(0xe2))]['GlitchFilter'](),this['createHorrorFilter'](this[_0x641169(0x171)][_0x641169(0xe4)])),this['_horrorFilters']['glitchFilter'][_0x641169(0x1c1)]=0xa,this[_0x641169(0x171)][_0x641169(0xe4)]['offset']=0x64,this['_horrorFilters']['glitchFilter']['sliceMin']=0x5,this['_horrorFilters'][_0x641169(0xe4)][_0x641169(0x10e)]=0xa,this[_0x641169(0x171)][_0x641169(0xe4)][_0x641169(0x1f2)]=!![],this['_horrorFilters'][_0x641169(0xe4)][_0x641169(0x12f)]=0x12c,this[_0x641169(0x171)][_0x641169(0xe4)][_0x641169(0xe7)]=0x1e;}}this[_0x641169(0x171)][_0x641169(0xe4)][_0x641169(0x1c1)]=0xa,this[_0x641169(0x171)][_0x641169(0xe4)][_0x641169(0x19f)]=0x64,this[_0x641169(0x171)][_0x641169(0xe4)][_0x641169(0x126)]=0x5,this['_horrorFilters'][_0x641169(0xe4)][_0x641169(0x10e)]=0xa,this['_horrorFilters'][_0x641169(0xe4)][_0x641169(0x1f2)]=!![],this[_0x641169(0x171)]['glitchFilter'][_0x641169(0x12f)]=0x12c,this[_0x641169(0x171)][_0x641169(0xe4)]['aniStrength']=0x1e;},Sprite[_0x3b4113(0x1c6)]['removeHorrorGlitch']=function(){const _0x1abdc1=_0x3b4113;!!this[_0x1abdc1(0x171)][_0x1abdc1(0xe4)]&&(_0x1abdc1(0xf7)!=='BnTSL'?_0x438b99=_0x40de51[_0x1abdc1(0x118)](_0x4bf6b1/0x2):(this[_0x1abdc1(0xd8)](this[_0x1abdc1(0x171)][_0x1abdc1(0xe4)]),this[_0x1abdc1(0x171)][_0x1abdc1(0xe4)]=undefined));},Sprite[_0x3b4113(0x1c6)][_0x3b4113(0x152)]=function(){const _0x5153e1=_0x3b4113;if(!PIXI['filters'][_0x5153e1(0x190)])return;if(!!this[_0x5153e1(0x171)][_0x5153e1(0xe4)]){if(this[_0x5153e1(0x1ed)]&&this['_horrorFilters'][_0x5153e1(0xe4)]['animated']){var _0x305fdc=new PIXI[(_0x5153e1(0xe2))][(_0x5153e1(0x190))](),_0x1c0cf7=['slices',_0x5153e1(0x19f),'sliceMin',_0x5153e1(0x10e),_0x5153e1(0x1f2),_0x5153e1(0x12f),_0x5153e1(0xe7),_0x5153e1(0x165)];this[_0x5153e1(0x171)][_0x5153e1(0xe4)]['refreshRequest']=![];for(var _0x2a504b=0x0;_0x2a504b<_0x1c0cf7['length'];_0x2a504b++){var _0x30c62c=_0x1c0cf7[_0x2a504b];_0x305fdc[_0x30c62c]=this[_0x5153e1(0x171)][_0x5153e1(0xe4)][_0x30c62c];}var _0x47239d=this[_0x5153e1(0xe2)]['indexOf'](this['_horrorFilters'][_0x5153e1(0xe4)]);this['filters'][_0x47239d]=this[_0x5153e1(0x1c7)](_0x305fdc),this[_0x5153e1(0x171)][_0x5153e1(0xe4)]=this['filters'][_0x47239d];}if(this['_horrorFiltersGlitchSpecial']&&this[_0x5153e1(0x171)][_0x5153e1(0xe4)][_0x5153e1(0x165)]){this[_0x5153e1(0x171)]['glitchFilter'][_0x5153e1(0x165)]=![],this[_0x5153e1(0x171)][_0x5153e1(0xe4)]['animated']=![];var _0x305fdc=new PIXI['filters']['GlitchFilter'](),_0x1c0cf7=['slices',_0x5153e1(0x19f),_0x5153e1(0x126),'sliceMax',_0x5153e1(0x1f2),'aniFrequency',_0x5153e1(0xe7),'refreshRequest'];for(var _0x2a504b=0x0;_0x2a504b<_0x1c0cf7[_0x5153e1(0x16e)];_0x2a504b++){var _0x30c62c=_0x1c0cf7[_0x2a504b];_0x305fdc[_0x30c62c]=this[_0x5153e1(0x171)][_0x5153e1(0xe4)][_0x30c62c],_0x30c62c===_0x5153e1(0x165)&&(_0x5153e1(0x1e1)!=='zDoJl'?this['_horrorFilters'][_0x5153e1(0xe4)][_0x30c62c]=![]:(this['removeHorrorFilter'](this[_0x5153e1(0x171)][_0x5153e1(0x174)]),this[_0x5153e1(0x171)][_0x5153e1(0x174)]=_0x591606));}var _0x47239d=this[_0x5153e1(0xe2)][_0x5153e1(0x162)](this[_0x5153e1(0x171)][_0x5153e1(0xe4)]);_0x305fdc[_0x5153e1(0xe6)](),this[_0x5153e1(0xe2)][_0x47239d]=this[_0x5153e1(0x1c7)](_0x305fdc),this['_horrorFilters'][_0x5153e1(0xe4)]=this[_0x5153e1(0xe2)][_0x47239d];}else{if(_0x5153e1(0x103)!=='kbszh')this[_0x5153e1(0x1c7)](this[_0x5153e1(0x171)][_0x5153e1(0xe4)]);else{!this[_0x5153e1(0x171)]['noiseFilter']&&this[_0x5153e1(0x192)]();if(_0xc1ca8[_0x5153e1(0xdc)][_0x5153e1(0x15e)]){_0x181ba9[_0x5153e1(0xdc)][_0x5153e1(0x15e)]=![];var _0x12dade=[_0x5153e1(0x16c),_0x5153e1(0x1f2)];for(var _0x4e5b61=0x0;_0x4e5b61<_0x12dade[_0x5153e1(0x16e)];_0x4e5b61++){var _0x2fe97f=_0x12dade[_0x4e5b61];this['_horrorFilters']['noiseFilter'][_0x2fe97f]=_0x3a7fc8['noiseFilter'][_0x2fe97f];}}}}}},Sprite['prototype'][_0x3b4113(0x1c7)]=function(_0x9d3f37){const _0x5c51fb=_0x3b4113;if(_0x9d3f37['animated']){if('jiGJE'!=='tZmex'){var _0x49f6be=Graphics[_0x5c51fb(0x1ce)]%_0x9d3f37[_0x5c51fb(0x12f)],_0x164f3b=_0x9d3f37[_0x5c51fb(0xe7)];if(_0x49f6be<Math[_0x5c51fb(0xcf)](_0x164f3b)+0x1){var _0x23f0ec=_0x9d3f37[_0x5c51fb(0x10e)]-_0x9d3f37[_0x5c51fb(0x126)],_0x2b6d68=Math[_0x5c51fb(0xcf)](_0x23f0ec)+_0x9d3f37[_0x5c51fb(0x10e)];_0x9d3f37[_0x5c51fb(0x1c1)]=_0x2b6d68;}else _0x5c51fb(0x1fb)!==_0x5c51fb(0x1fb)?(this[_0x5c51fb(0x171)]===_0x56e084&&this[_0x5c51fb(0x139)](),_0xfe0eb+=_0x5c51fb(0x194),this['_horrorFilters'][_0x45ffa8]=_0x1664d2):_0x9d3f37[_0x5c51fb(0x1c1)]=0x0;}else _0x24dfd7['HorrorEffects'][_0x5c51fb(0x1a4)][_0x5c51fb(0x15a)](this),!!this[_0x5c51fb(0x137)]()&&this[_0x5c51fb(0x1cd)]();}else{if(_0x9d3f37[_0x5c51fb(0x1c1)]===0x0){var _0x23f0ec=_0x9d3f37[_0x5c51fb(0x10e)]-_0x9d3f37[_0x5c51fb(0x126)],_0x2b6d68=Math[_0x5c51fb(0xcf)](_0x23f0ec)+_0x9d3f37['sliceMax'];_0x9d3f37[_0x5c51fb(0x1c1)]=_0x2b6d68;}else _0x9d3f37[_0x5c51fb(0x165)]&&('DORQF'!==_0x5c51fb(0x132)?(_0x127c5a['HorrorEffects']['Game_Player_refresh'][_0x5c51fb(0x15a)](this),!!_0x419bde['leader']()&&this[_0x5c51fb(0x1cd)]()):(_0x9d3f37[_0x5c51fb(0x165)]=undefined,_0x9d3f37[_0x5c51fb(0xe6)]()));}return _0x9d3f37;},Sprite['prototype'][_0x3b4113(0x136)]=function(_0x3d6c94,_0x292fde,_0x17b02d){const _0x3ea5ae=_0x3b4113;!!this[_0x3ea5ae(0x171)][_0x3ea5ae(0xe4)]&&(_0x292fde===undefined&&(_0x3ea5ae(0x161)!==_0x3ea5ae(0x161)?this[_0x3ea5ae(0x12a)]():_0x292fde=Math['ceil'](_0x3d6c94/0x2)),_0x17b02d===undefined&&(_0x3ea5ae(0x1c8)===_0x3ea5ae(0x196)?!!this[_0x3ea5ae(0x171)][_0x3ea5ae(0xdc)]&&this[_0x3ea5ae(0xe0)]():_0x17b02d=_0x3d6c94),this[_0x3ea5ae(0x171)]['glitchFilter'][_0x3ea5ae(0x126)]=_0x292fde,this['_horrorFilters'][_0x3ea5ae(0xe4)][_0x3ea5ae(0x10e)]=_0x17b02d,this[_0x3ea5ae(0x171)][_0x3ea5ae(0xe4)][_0x3ea5ae(0x1c1)]=_0x3d6c94,this[_0x3ea5ae(0x171)][_0x3ea5ae(0xe4)][_0x3ea5ae(0xe6)]());},Sprite[_0x3b4113(0x1c6)][_0x3b4113(0x1ad)]=function(_0x51ec94){const _0x1d8c34=_0x3b4113;!!this[_0x1d8c34(0x171)]['glitchFilter']&&(this[_0x1d8c34(0x171)][_0x1d8c34(0xe4)][_0x1d8c34(0x19f)]=_0x51ec94);},Sprite[_0x3b4113(0x1c6)][_0x3b4113(0xe3)]=function(_0x41fa8d){const _0x6b11b5=_0x3b4113;!!this[_0x6b11b5(0x171)][_0x6b11b5(0xe4)]&&(this[_0x6b11b5(0x171)][_0x6b11b5(0xe4)]['animated']=_0x41fa8d);},Sprite[_0x3b4113(0x1c6)]['setHorrorGlitchFrequency']=function(_0x3cef67){const _0x425cb7=_0x3b4113;!!this[_0x425cb7(0x171)][_0x425cb7(0xe4)]&&(this['_horrorFilters'][_0x425cb7(0xe4)]['aniFrequency']=_0x3cef67);},Sprite[_0x3b4113(0x1c6)][_0x3b4113(0x1b7)]=function(_0x5953a5){const _0x41f6eb=_0x3b4113;!!this[_0x41f6eb(0x171)]['glitchFilter']&&(_0x41f6eb(0xf4)!=='yvoMF'?!!_0x14b5d5[_0x41f6eb(0x14a)]()&&(_0x112120['prototype'][_0x41f6eb(0x139)][_0x41f6eb(0x15a)](_0x3f4df2['leader']()),this[_0x41f6eb(0x1cd)]()):this['_horrorFilters'][_0x41f6eb(0xe4)][_0x41f6eb(0xe7)]=_0x5953a5);},Sprite['prototype']['createHorrorTV']=function(){const _0x1b738d=_0x3b4113;if(!PIXI['filters'][_0x1b738d(0x158)])return;!this[_0x1b738d(0x171)][_0x1b738d(0x13d)]&&(_0x1b738d(0x1e5)!==_0x1b738d(0x10f)?(this['_horrorFilters'][_0x1b738d(0x13d)]=new PIXI['filters']['CRTFilter'](),this[_0x1b738d(0x183)](this[_0x1b738d(0x171)][_0x1b738d(0x13d)])):!!this[_0x1b738d(0x171)][_0x1b738d(0xdc)]&&(this[_0x1b738d(0x171)][_0x1b738d(0xdc)][_0x1b738d(0x1f2)]=_0x2221b1)),this[_0x1b738d(0x171)]['tvFilter']['lineWidth']=0x5,this[_0x1b738d(0x171)][_0x1b738d(0x13d)][_0x1b738d(0xf6)]=0.3,this[_0x1b738d(0x171)][_0x1b738d(0x13d)][_0x1b738d(0x1f2)]=!![],this['_horrorFilters'][_0x1b738d(0x13d)][_0x1b738d(0x143)]=0.25;},Sprite[_0x3b4113(0x1c6)][_0x3b4113(0x12a)]=function(){const _0x921ef8=_0x3b4113;!!this['_horrorFilters'][_0x921ef8(0x13d)]&&(this['removeHorrorFilter'](this[_0x921ef8(0x171)][_0x921ef8(0x13d)]),this[_0x921ef8(0x171)]['tvFilter']=undefined);},Sprite[_0x3b4113(0x1c6)]['updateHorrorTV']=function(){const _0x5ce847=_0x3b4113;if(!PIXI[_0x5ce847(0xe2)]['CRTFilter'])return;!!this['_horrorFilters']['tvFilter']&&(this[_0x5ce847(0x171)][_0x5ce847(0x13d)][_0x5ce847(0x1f2)]&&(_0x5ce847(0x170)===_0x5ce847(0x12e)?_0x4e6611[_0x5ce847(0x1c6)][_0x5ce847(0x139)]['call'](this):this[_0x5ce847(0x171)][_0x5ce847(0x13d)][_0x5ce847(0x186)]+=this[_0x5ce847(0x171)]['tvFilter'][_0x5ce847(0x143)]));},Sprite[_0x3b4113(0x1c6)]['setHorrorTVLineThickness']=function(_0x5a20b6){const _0x4a6702=_0x3b4113;!!this[_0x4a6702(0x171)][_0x4a6702(0x13d)]&&(this['_horrorFilters'][_0x4a6702(0x13d)][_0x4a6702(0x151)]=_0x5a20b6);},Sprite[_0x3b4113(0x1c6)][_0x3b4113(0x130)]=function(_0x4c00fd){const _0x46a378=_0x3b4113;!!this[_0x46a378(0x171)]['tvFilter']&&(this[_0x46a378(0x171)][_0x46a378(0x13d)][_0x46a378(0xf6)]=_0x4c00fd);},Sprite[_0x3b4113(0x1c6)][_0x3b4113(0x16a)]=function(_0x1e7cd2){const _0x502974=_0x3b4113;!!this['_horrorFilters'][_0x502974(0x13d)]&&(_0x502974(0x181)===_0x502974(0x181)?this[_0x502974(0x171)][_0x502974(0x13d)][_0x502974(0x1f2)]=_0x1e7cd2:(_0x4d6a8b['HorrorEffects'][_0x502974(0xf8)][_0x502974(0x15a)](this),this[_0x502974(0x139)]()));},Sprite[_0x3b4113(0x1c6)][_0x3b4113(0x1f6)]=function(_0x296868){const _0x34e286=_0x3b4113;!!this['_horrorFilters'][_0x34e286(0x13d)]&&(_0x34e286(0x1fc)!==_0x34e286(0x1fc)?!!this['actor']()&&(_0x29d0cb[_0x34e286(0x1c6)][_0x34e286(0x1cc)]['call'](this[_0x34e286(0x137)](),_0x29e128),this[_0x34e286(0x1cd)]()):this[_0x34e286(0x171)][_0x34e286(0x13d)]['aniSpeed']=_0x296868);},Sprite[_0x3b4113(0x1c6)]['createHorrorColor']=function(){const _0x296b50=_0x3b4113;if(!PIXI[_0x296b50(0xe2)]['ColorMatrixFilter'])return;!this[_0x296b50(0x171)][_0x296b50(0x174)]&&(_0x296b50(0x146)!==_0x296b50(0x146)?(_0x5edcbd[_0x296b50(0xeb)][_0x296b50(0x11d)][_0x296b50(0x15a)](this),this[_0x296b50(0x139)]()):(this[_0x296b50(0x171)][_0x296b50(0x174)]=new PIXI[(_0x296b50(0xe2))]['ColorMatrixFilter'](),this[_0x296b50(0x183)](this[_0x296b50(0x171)][_0x296b50(0x174)])));},Sprite[_0x3b4113(0x1c6)][_0x3b4113(0x1ac)]=function(){const _0x465203=_0x3b4113;!!this['_horrorFilters']['colorFilter']&&(_0x465203(0x1d9)!==_0x465203(0x144)?(this['removeHorrorFilter'](this[_0x465203(0x171)][_0x465203(0x174)]),this[_0x465203(0x171)][_0x465203(0x174)]=undefined):this[_0x465203(0x1cd)]());},Sprite[_0x3b4113(0x1c6)][_0x3b4113(0x153)]=function(){const _0x130804=_0x3b4113;if(!PIXI['filters'][_0x130804(0x1e4)])return;if(!!this['_horrorFilters'][_0x130804(0x174)]){const _0x58690e=this[_0x130804(0x171)][_0x130804(0x174)];if(_0x58690e['lastType']!==_0x58690e[_0x130804(0x1d3)]){_0x58690e[_0x130804(0xd1)](),_0x58690e[_0x130804(0x13a)]=_0x58690e[_0x130804(0x1d3)];const _0x1dba7e=_0x58690e[_0x130804(0x1d3)];switch(_0x1dba7e[_0x130804(0x12d)]()[_0x130804(0xf9)]()){case _0x130804(0x1d6):_0x58690e[_0x130804(0xea)]();break;case _0x130804(0x19b):_0x58690e[_0x130804(0x15c)]();break;case'browni':_0x58690e['browni'](!![]);break;case _0x130804(0x19e):_0x58690e['desaturate']();break;case _0x130804(0x14c):_0x58690e[_0x130804(0x14c)](0.5,!![]);break;case _0x130804(0x1ba):_0x58690e[_0x130804(0x1ba)](!![]);break;case'lsd':_0x58690e[_0x130804(0xf0)]();break;case _0x130804(0x1d5):_0x58690e['negative']();break;case _0x130804(0x18d):_0x58690e[_0x130804(0x18d)]();break;case _0x130804(0xd5):_0x58690e['predator'](0x32);break;case _0x130804(0x1ef):_0x58690e[_0x130804(0x1ef)]();break;case _0x130804(0x124):_0x58690e[_0x130804(0x124)](!![]);break;case _0x130804(0x17f):_0x58690e['vintage'](!![]);break;default:_0x58690e[_0x130804(0xd1)]();break;}}}},VisuMZ[_0x3b4113(0xeb)]['Sprite_Character_initialize']=Sprite_Character[_0x3b4113(0x1c6)][_0x3b4113(0x147)],Sprite_Character[_0x3b4113(0x1c6)][_0x3b4113(0x147)]=function(_0x43c9ac){const _0x6ac542=_0x3b4113;VisuMZ[_0x6ac542(0xeb)][_0x6ac542(0xfe)]['call'](this,_0x43c9ac),this[_0x6ac542(0x1ab)]=_0x43c9ac,this[_0x6ac542(0x1ed)]=!![];},VisuMZ[_0x3b4113(0xeb)][_0x3b4113(0x1c3)]=Sprite_Battler[_0x3b4113(0x1c6)][_0x3b4113(0x104)],Sprite_Battler['prototype'][_0x3b4113(0x104)]=function(_0x337c66){const _0x299e80=_0x3b4113;VisuMZ['HorrorEffects'][_0x299e80(0x1c3)][_0x299e80(0x15a)](this,_0x337c66),this['_horrorFiltersSource']=_0x337c66,this['_horrorFiltersGlitchSpecial']=!![];},VisuMZ['HorrorEffects'][_0x3b4113(0x123)]=Sprite_Picture[_0x3b4113(0x1c6)][_0x3b4113(0x147)],Sprite_Picture[_0x3b4113(0x1c6)]['initialize']=function(_0x49a9c9){const _0x452bf1=_0x3b4113;VisuMZ[_0x452bf1(0xeb)]['Sprite_Picture_initialize'][_0x452bf1(0x15a)](this,_0x49a9c9);},VisuMZ[_0x3b4113(0xeb)]['Sprite_Picture_updateBitmap']=Sprite_Picture['prototype'][_0x3b4113(0x17d)],Sprite_Picture[_0x3b4113(0x1c6)][_0x3b4113(0x17d)]=function(){const _0x3a1f3d=_0x3b4113;VisuMZ[_0x3a1f3d(0xeb)]['Sprite_Picture_updateBitmap'][_0x3a1f3d(0x15a)](this),this[_0x3a1f3d(0x16f)]&&!this[_0x3a1f3d(0x1ab)]?_0x3a1f3d(0x106)==='zkWOz'?_0x51c6f8=_0xfc70ca:this[_0x3a1f3d(0x1ab)]=this['picture']():_0x3a1f3d(0x182)===_0x3a1f3d(0x15b)?_0x25af89['glitchFilter'][_0x5814b6]=![]:this[_0x3a1f3d(0x1ab)]=undefined;},VisuMZ[_0x3b4113(0xeb)][_0x3b4113(0x11c)]=Spriteset_Map[_0x3b4113(0x1c6)][_0x3b4113(0x147)],Spriteset_Map[_0x3b4113(0x1c6)]['initialize']=function(){const _0x4a8715=_0x3b4113;VisuMZ[_0x4a8715(0xeb)][_0x4a8715(0x11c)]['call'](this),this[_0x4a8715(0x1ab)]=$gameScreen;},VisuMZ[_0x3b4113(0xeb)]['Spriteset_Battle_initialize']=Spriteset_Battle[_0x3b4113(0x1c6)][_0x3b4113(0x147)],Spriteset_Battle[_0x3b4113(0x1c6)][_0x3b4113(0x147)]=function(){const _0x440d34=_0x3b4113;VisuMZ[_0x440d34(0xeb)][_0x440d34(0x109)]['call'](this),this[_0x440d34(0x1ab)]=$gameSystem;};
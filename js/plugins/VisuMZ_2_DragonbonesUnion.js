//=============================================================================
// VisuStella MZ - Dragonbones Union
// VisuMZ_2_DragonbonesUnion.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_DragonbonesUnion = true;

var VisuMZ = VisuMZ || {};
VisuMZ.DragonbonesUnion = VisuMZ.DragonbonesUnion || {};
VisuMZ.DragonbonesUnion.version = 1.22;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.22] [DragonbonesUnion]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Dragonbones_Union_VisuStella_MZ
 * @base Public_0_Dragonbones
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter Public_0_Dragonbones
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * DragonBones allows your games to use skeletal animation, a type of computer
 * animation in which a character (or object) is represented by skins/textures
 * and a digital set of interconnected bones (called the skeleton). Using a set
 * of instructions, the game will create animations based off these skins,
 * skeletons, and instructions to create beautifully smooth and light-weight
 * movements.
 *
 * This plugin gives you such control over various facets of your game: the
 * battle system, event pictures, and map sprites for characters. Various
 * plugin commands, notetags, and comment tags are added through this plugin to
 * give you as much control as you need over Dragonbones from the RPG Maker MZ
 * editor itself.
 *
 * The version of Dragonbones used for this plugin is 5.7.002b.
 * More information can be found at http://dragonbones.com/
 *
 * Features include all (but not limited to) the following:
 * 
 * - Adds Dragonbones support to RPG Maker MZ.
 * - Dragonbones armatures can be used as battler sprites.
 * - Dragonbones armatures can be attached to event pictures.
 * - Dragonbones armatures can be inserted into the map as character sprites.
 * - A variety of Plugin Parameters, Notetags, and Plugin Commands to control
 *   the Dragonbones armatures and their animations.
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
 * - Dragonbones*
 *
 * *Note* You can download this library from the below URL or from the
 * Dragonbones Union product page. Install it as a Tier 0 plugin.
 *
 * URL: https://www.npmjs.com/package/pixi5-dragonbones/v/5.7.0-2b
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Dragonbones Naming
 * ============================================================================
 *
 * If you are trying to set up a Dragonbones armature through notetags, Plugin
 * Commands, etc., and are getting the error message "Cannot Read property
 * 'parent' of null", then most likely, the incorrect Dragonbones armature name
 * is being used.
 *
 * ---
 * 
 * To find the Proper Name:
 * 
 * 1. Open up the Dragonbones armature in the Dragonbones editor.
 * 
 * ---
 * 
 * 2. Open the armature's Properties.
 * 
 * ---
 * 
 * 3. Look at what the "Name:" field lists. This is the name to use with the
 *    Dragonbones Union plugin.
 * 
 * ---
 *
 * ============================================================================
 * Dragonbones Armature Behaviors
 * ============================================================================
 *
 * Dragonbones armatures have certain behaviors when used with battlers,
 * pictures, and/or map sprites.
 *
 * ---
 *
 * 1. When a Dragonbones armature is loaded, it will play the 'idle' animation
 *    or whatever is set inside the Plugin Parameters => General Settings =>
 *    Loaded Animation field upon loading. Make your Dragonbones armatures with
 *    this in mind. At other times, the 'idle' animation will be used as a base
 *    defaulting animation.
 *
 * ---
 *
 * 2. The Dragonbones armature will always be anchored at the X, Y coordinates
 *    of the target. This X, Y coordinate point will be where the root/pivot
 *    point of the Dragonbones armature will be located.
 *
 * ---
 *
 * 3. The properties used by a sprite (ie the opacity, scale, rotation, and
 *    tint) will also be shared and/or amplified with the Dragonbones armature.
 *    The exception to this will be Blend Modes aren't supported.
 *
 * ---
 *
 * ============================================================================
 * IMPORTANT!! Dragonbones Armatures as Map Sprites
 * ============================================================================
 *
 * If you plan on using Dragonbones armatures as map sprites, please keep in
 * mind that there will be certain limitations and properties regarding them,
 * which will be listed below:
 *
 * ---
 *
 * 1. Try not to use more than 99 vertices for meshes. The reason behind this
 *    is because the Dragonbones armature is added as a sprite to the game's
 *    Tilemap. Any and all sprites added to the Tilemap have some restrictions
 *    placed on them as per Pixi JS's design. The Dragonbones armatures are no
 *    exception to this.
 *
 *    If the number of vertices exceeds 99, strange things will occur to the
 *    Dragonbones armature that are outside of this plugin's control. While it
 *    won't stop the plugin from functioning properly, expected behaviors may
 *    happen due to the threshold.
 *
 * ---
 *
 * 2. When using Dragonbones armatures that are too tall or wide, they may clip
 *    into the tile layer above or to the side due to how the Tilemap works.
 *    Things that you would see happen would include clipping into the tops of
 *    trees and structures.
 *
 * ---
 *
 * 3. Certain motions will request specific animations from the Dragonbones
 *    armature. If the animations exist, it will play those motions. If they
 *    don't, the motions may request a different animation down the line. The
 *    request orders are as follows:
 *
 *    Jumping:
 *    - jump, walk, idle
 *
 *    Rope (Climbing) (Requires: VisuMZ_1_EventsMoveCore):
 *    - ropeclimb, ladderclimb, walk, ropeidle, ladderidle, idle
 *
 *    Rope (Idle) (Requires: VisuMZ_1_EventsMoveCore):
 *    - ropeidle, ladderidle, idle
 *
 *    Ladder (Climbing):
 *    - ladderclimb, walk, ladderidle, idle
 *
 *    Ladder (Idle):
 *    - ladderidle, idle
 *
 *    Dashing:
 *    - dash, walk, idle
 *
 *    Walking:
 *    - walk, idle
 *
 *    Idle:
 *    - idle
 *
 *    Name the animations for the Dragonbones armature as such to make the most
 *    out of the motion priority lists.
 *
 * ---
 *
 * 4. You can add directional animations for your Dragonbones armature motion
 *    animations. To do so, add a number after the animation's name like such:
 *    walk2, walk4, walk6, walk8. These numbers are based off the NumPad
 *    directions to determine which way to face:
 *
 *    7 8 9
 *    4   6
 *    1 2 3
 *
 *    These numbers are added onto the priority system listed in #3 above, too.
 *    Diagonal directions also become split and added multiple times for better
 *    streamlining, with a priority given to the horizontal direction before
 *    the vertical direction. For example, dashing becomes the following:
 *
 *    Dashing (Upper Left):
 *    - dash7, dash4, dash8, dash,
 *      walk7, walk4, walk8, walk,
 *      idle7, idle4, idle8, idle
 *
 *    Dashing (Right):
 *    - dash6, dash,
 *      walk6, walk,
 *      idle6, idle
 *
 * ---
 *
 * 5. When a Dragonbones armature is moving, it will animate slower or faster
 *    depending on the character's current movement speed. At speed
 *    '4: Normal', it will animation 4x faster than what's seen in Dragonbones.
 *    At speed '6: x4 Faster', it will animate 6x faster while '1: x8 Slower'
 *    will be at x1 speed seen in Dragonbones. In other words, the speed
 *    animated is equal to the number written on the left of the
 *    movement speed.
 *
 *    When dashing, that multiplier increases by 1 in order to match movement
 *    speeds and the Dragonbones armature will do the same to follow.
 *
 * ---
 *
 * You will need to create your Dragonbones armatures with these 5 key rules in
 * mind in order to make the armatures animate smoothly within your game.
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
 * VisuMZ_3_StateTooltips
 *
 * If you are using a Dragonbones Battler and want to apply a state tooltip to
 * it, the access area of the battler will be based on the hitbox size you
 * declare for the Dragonbones Battler with notetags. This is because all
 * Dragonbones battlers do not have innate automatically calculated hitbox
 * sizes as a result of their dynamically animated nature.
 * 
 * Please refer to the notetag section of the Dragonbones Union plugin for
 * Dragonbones Battler hitboxes to learn how to apply hitbox sizes.
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
 * === Dragonbones Battler Notetags ===
 *
 * The following notetags are to be assigned to either actors and/or enemies.
 * An assigned actor/enemy will have their original sprite hidden from view in
 * favor of the Dragonbones armature to be displayed. Use these notetags to
 * declare various settings for your Dragonbones armatures.
 *
 * ---
 *
 * <Dragonbones Battler: filename>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the DragonBones associated with this actor/enemy to be 'filename'.
 * - The name will be associated with the assets used.
 * - It will be used to check for associated filenames that end with _ske.json,
 *   _tex.json, and _tex.png.
 * - The listed assets must be found in the assigned assets folder.
 *
 * Examples:
 *
 * <Dragonbones Battler: Demon>
 * <Dragonbones Battler: DragonBoy>
 * <Dragonbones Battler: Swordsman>
 * <Dragonbones Battler: Ubbie>
 *
 * ---
 *
 * <Dragonbones Battler Scale: x, y>
 *
 * <Dragonbones Battler Scale X: x>
 * <Dragonbones Battler Scale Y: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the base scale for the Dragonbones associated with this actor/enemy.
 *   This is for those instances where a Dragonbones armature is too large or
 *   small and needs to be scaled down/up.
 * - This scale will be amplified by the actor/enemy's sprite's scale value.
 * - Use the 1st notetag to assign values to both Scale X and Scale Y.
 * - Use the 2nd/3rd notetags to assign Scale X and Y values separately.
 * - Use negative values to flip the Dragonbones armature around.
 *
 * Examples:
 * 
 * <Dragonbones Battler Scale: -0.3, 0.3>
 *
 * <Dragonbones Battler Scale X: -0.3>
 * <Dragonbones Battler Scale Y: 0.3>
 *
 * ---
 *
 * <Dragonbones Battler Offset: x, y>
 *
 * <Dragonbones Battler Offset X: x>
 * <Dragonbones Battler Offset Y: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - When a Dragonbones armature is attached to an actor/enemy's sprite, it
 *   will always be attached at the root point assigned within the Dragonbones
 *   data. If a Dragonbones armature has a root point that does not fit well
 *   with your battler sprite, you can offset it using these notetags.
 * - Replace 'x' and 'y' with number values representing how many pixels you
 *   want to offset the Dragonbones armature by.
 * - Use the 1st notetag to assign values to both Offset X and Offset Y.
 * - Use the 2nd/3rd notetags to assign Offset X and Y values separately.
 * - Use negative values to offset to the left (X) or up (Y) directions.
 *
 * Examples:
 *
 * <Dragonbones Battler Offset: -10, 5>
 *
 * <Dragonbones Battler Offset X: -10>
 * <Dragonbones Battler Offset Y: 5>
 *
 * ---
 *
 * <Dragonbones Battler Size: width, height>
 *
 * <Dragonbones Battler Width: x>
 * <Dragonbones Battler Height: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Dragonbones armatures have no standard width or height. This makes it
 *   problematic when trying to calculate the sprite's width/height for Action
 *   Sequences and the like. These notetags allow you to assign a width and
 *   height value to the sprite, despite the fact the Dragonbones armatures
 *   have no such thing.
 * - Replace 'width', 'height', or 'x' with number values representing the
 *   dimension values in pixels.
 * - Use the 1st notetag to assign values to both Width and Height.
 * - Use the 2nd/3rd notetags to assign Width and Height values separately.
 * - If these notetags aren't used, then use the values defined by default in
 *   Plugin Parameters => Battler Settings => Default => Width/Height.
 *
 * Examples:
 *
 * <Dragonbones Battler Size: 50, 100>
 *
 * <Dragonbones Battler Width: 50>
 * <Dragonbones Battler Height: 100>
 *
 * ---
 *
 * <Dragonbones Battler Time Scale: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Lets you adjust the time scale for the Dragonbones armature.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 *
 * Example:
 *
 * <Dragonbones Battler Time Scale: 1.5>
 *
 * ---
 *
 * <Dragonbones Battler Motion Walk: animation>
 * <Dragonbones Battler Motion Wait: animation>
 * <Dragonbones Battler Motion Chant: animation>
 * <Dragonbones Battler Motion Guard: animation>
 * <Dragonbones Battler Motion Damage: animation>
 * <Dragonbones Battler Motion Evade: animation>
 * <Dragonbones Battler Motion Thrust: animation>
 * <Dragonbones Battler Motion Swing: animation>
 * <Dragonbones Battler Motion Missile: animation>
 * <Dragonbones Battler Motion Skill: animation>
 * <Dragonbones Battler Motion Spell: animation>
 * <Dragonbones Battler Motion Item: animation>
 * <Dragonbones Battler Motion Escape: animation>
 * <Dragonbones Battler Motion Victory: animation>
 * <Dragonbones Battler Motion Dying: animation>
 * <Dragonbones Battler Motion Abnormal: animation>
 * <Dragonbones Battler Motion Sleep: animation>
 * <Dragonbones Battler Motion Dead: animation>
 *
 * - Used for: Actor, Enemy Notetags
 * - Use these notetags to assign Dragonbones animations to play when the
 *   actor/enemy sprite is supposed to play such a motion.
 * - Replace 'animation' with the name of the Dragonbones animation.
 * - If this notetag is not used, when such a motion is rquested, it will
 *   default to attempting to play the animation name equal to the motion.
 * - Animation names do not need to be case sensitive.
 * - If no animation is found, then no animation will be played.
 *
 * Examples:
 *
 * <Dragonbones Battler Motion Wait: idle>
 * <Dragonbones Battler Motion Swing: attack>
 * <Dragonbones Battler Motion Thrust: attack>
 * <Dragonbones Battler Motion Missle: attack>
 * <Dragonbones Battler Motion Skill: special>
 * <Dragonbones Battler Motion Spell: special>
 * <Dragonbones Battler Motion Dead: defeated>
 *
 * ---
 *
 * <Dragonbones Battler Settings>
 *  Battler: filename
 *  
 *  Scale: x, y
 *
 *  Scale X: x
 *  Scale Y: x
 *
 *  Offset: x, y
 *
 *  Offset X: x
 *  Offset Y: x
 *
 *  Size: width, height
 *
 *  Width: x
 *  Height: x
 *
 *  Time Scale: x
 *
 *  Motion Walk: animation
 *  Motion Wait: animation
 *  Motion Chant: animation
 *  Motion Guard: animation
 *  Motion Damage: animation
 *  Motion Evade: animation
 *  Motion Thrust: animation
 *  Motion Swing: animation
 *  Motion Missile: animation
 *  Motion Skill: animation
 *  Motion Spell: animation
 *  Motion Item: animation
 *  Motion Escape: animation
 *  Motion Victory: animation
 *  Motion Dying: animation
 *  Motion Abnormal: animation
 *  Motion Sleep: animation
 *  Motion Dead: animation
 * </Dragonbones Battler Settings>
 *
 * - Used for: Actor, Enemy Notetags
 * - The above notetag allows to wrap up all the information you'd like to
 *   set for Dragonbones battler armatures needed inside a single notetag
 *   container.
 * - The settings are the same as the notetags listed above it.
 * - You may remove the settings you don't wish to change.
 * - The only necessary data is the 'Battler: filename' line.
 *
 * Example:
 *
 * <Dragonbones Battler Settings>
 *  Battler: Demon
 *  
 *  Scale: 0.3, 0.3
 *
 *  Size: 80, 80
 *
 *  Motion Wait: idle
 *  Motion Damage: hit
 *  Motion Swing: attack
 *  Motion Thrust: attack
 *  Motion Missile: attack
 *  Motion Skill: special
 *  Motion spell: special
 *  Motion Dead: defeated
 * </Dragonbones Battler Settings>
 *
 * ---
 * 
 * <Dragonbones Hue Affected>
 * 
 * - Used for: Enemy Notetags
 * - The above notetag enables hues to affect enemy battlers.
 * - This will bypass the Plugin Parameter default settings.
 * 
 * ---
 * 
 * <Dragonbones No Hue>
 * 
 * - Used for: Enemy Notetags
 * - The above notetag disables hues to affect enemy battlers.
 * - This will bypass the Plugin Parameter default settings.
 * 
 * ---
 *
 * === Dragonbones Map Sprite Notetags & Comment Tags ===
 *
 * You can also use Dragonbones armatures as map sprites. When used, any of the
 * original sprites before will become invisible and will be replaced with the
 * Dragonbones armature.
 *
 * These notetags can be used for actors and events. In the case of events,
 * both notetags and comment tags can be used to determine what settings to use
 * for the Dragonbones armatures.
 *
 * Be cautious when using Comment Tags for event pages since comments contain a
 * maximum line count of 6.
 *
 * ---
 *
 * <Dragonbones Sprite: filename>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Sets the DragonBones associated with this map sprite to be 'filename'.
 * - The name will be associated with the assets used.
 * - It will be used to check for associated filenames that end with _ske.json,
 *   _tex.json, and _tex.png.
 * - The listed assets must be found in the assigned assets folder.
 *
 * Examples:
 *
 * <Dragonbones Sprite: Demon>
 * <Dragonbones Sprite: DragonBoy>
 * <Dragonbones Sprite: Swordsman>
 * <Dragonbones Sprite: Ubbie>
 *
 * ---
 *
 * <Dragonbones Sprite Scale: x, y>
 *
 * <Dragonbones Sprite Scale X: x>
 * <Dragonbones Sprite Scale Y: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Sets the base scale for the Dragonbones associated with this map sprite.
 *   This is for those instances where a Dragonbones armature is too large or
 *   small and needs to be scaled down/up.
 * - This scale will be amplified by the character's sprite's scale value.
 * - Use the 1st notetag to assign values to both Scale X and Scale Y.
 * - Use the 2nd/3rd notetags to assign Scale X and Y values separately.
 * - Use negative values to flip the Dragonbones armature around.
 *
 * Examples:
 * 
 * <Dragonbones Sprite Scale: -0.3, 0.3>
 *
 * <Dragonbones Sprite Scale X: -0.3>
 * <Dragonbones Sprite Scale Y: 0.3>
 *
 * ---
 *
 * <Dragonbones Sprite Offset: x, y>
 *
 * <Dragonbones Sprite Offset X: x>
 * <Dragonbones Sprite Offset Y: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - When a Dragonbones armature is attached to an character's map sprite, it
 *   will always be attached at the root point assigned within the Dragonbones
 *   data. If a Dragonbones armature has a root point that does not fit well
 *   with your battler sprite, you can offset it using these notetags.
 * - Replace 'x' and 'y' with number values representing how many pixels you
 *   want to offset the Dragonbones armature by.
 * - Use the 1st notetag to assign values to both Offset X and Offset Y.
 * - Use the 2nd/3rd notetags to assign Offset X and Y values separately.
 * - Use negative values to offset to the left (X) or up (Y) directions.
 *
 * Examples:
 *
 * <Dragonbones Sprite Offset: -10, 5>
 *
 * <Dragonbones Sprite Offset X: -10>
 * <Dragonbones Sprite Offset Y: 5>
 *
 * ---
 *
 * <Dragonbones Sprite Time Scale: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you adjust the time scale for the Dragonbones armature.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 *
 * Example:
 *
 * <Dragonbones Sprite Time Scale: 1.5>
 *
 * ---
 * 
 * <Dragonbones Sprite Walk Rate: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you adjust the animation speed for the Dragonbones armature only
 *   when it is walking.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 * - If used with the <Dragonbones Sprite Time Scale: x>, the speed will stack
 *   multiplicatively.
 *
 * Example:
 *
 * <Dragonbones Sprite Walk Rate: 1.5>
 * 
 * ---
 * 
 * <Dragonbones Sprite Dash Rate: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you adjust the animation speed for the Dragonbones armature only
 *   when it is dashing.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 * - If used with the <Dragonbones Sprite Time Scale: x>, the speed will stack
 *   multiplicatively.
 *
 * Example:
 *
 * <Dragonbones Sprite Dash Rate: 1.5>
 * 
 * ---
 *
 * <Dragonbones Sprite Size: width, height>
 *
 * <Dragonbones Sprite Width: x>
 * <Dragonbones Sprite Height: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Dragonbones armatures have no standard width or height. This makes it
 *   problematic when trying to calculate the sprite's width/height for various
 *   plugins that use it. These notetags allow you to assign a width and
 *   height value to the sprite, despite the fact the Dragonbones armatures
 *   have no such thing.
 * - Replace 'width', 'height', or 'x' with number values representing the
 *   dimension values in pixels.
 * - Use the 1st notetag to assign values to both Width and Height.
 * - Use the 2nd/3rd notetags to assign Width and Height values separately.
 * - If these notetags aren't used, then use the values defined by default in
 *   the Plugin Parameters.
 *
 * Examples:
 *
 * <Dragonbones Sprite Size: 48, 64>
 *
 * <Dragonbones Sprite Width: 48>
 * <Dragonbones Sprite Height: 64>
 *
 * ---
 *
 * <Dragonbones Sprite Flip Left>
 * <Dragonbones Sprite Flip Right>
 *
 * <Dragonbones Sprite No Flip Left>
 * <Dragonbones Sprite No Flip Right>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets the map sprite know to flip itself when facing either the left/right
 *   directions in order to reuse animations.
 * - The 'No' variants will prevent flipping from occuring.
 * - These notetags will override settings applied in the Plugin Parameters.
 *
 * ---
 *
 * <Dragonbones Sprite Motion Idle: animation>
 * <Dragonbones Sprite Motion Walk: animation>
 * <Dragonbones Sprite Motion Dash: animation>
 * <Dragonbones Sprite Motion Jump: animation>
 * <Dragonbones Sprite Motion LadderIdle: animation>
 * <Dragonbones Sprite Motion LadderClimb: animation>
 * <Dragonbones Sprite Motion RopeIdle: animation>
 * <Dragonbones Sprite Motion RopeClimb: animation>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you set specific animations different from the ones listed in the
 *   Plugin Parameters for specific motions.
 * - Replace 'animation' with the name of the Dragonbones animation.
 * - If this notetag is not used, when such a motion is rquested, it will
 *   default to attempting to play the animation name equal to the motion.
 * - Animation names do not need to be case sensitive.
 * - If no animation is found, then no animation will be played.
 *
 * Example:
 *
 * <Dragonbones Sprite Motion Idle: stand>
 * <Dragonbones Sprite Motion Walk: move>
 * <Dragonbones Sprite Motion Dash: run>
 * <Dragonbones Sprite Motion Jump: hop>
 *
 * ---
 *
 * <Dragonbones Sprite Settings>
 *  Filename: filename
 *
 *  Scale: x, y
 *
 *  Scale X: x
 *  Scale Y: x
 *
 *  Offset: x, y
 *
 *  Offset X: x
 *  Offset Y: x
 *
 *  Time Scale: x
 * 
 *  Walk Rate: x
 *  Dash Rate: x
 *
 *  Width: x
 *  Height: x
 *
 *  Flip Left
 *  Flip Right
 *
 *  No Flip Left
 *  No Flip Right
 *
 *  Motion Idle: animation
 *  Motion Walk: animation
 *  Motion Dash: animation
 *  Motion Jump: animation
 *  Motion LadderIdle: animation
 *  Motion LadderClimb: animation
 *  Motion RopeIdle: animation
 *  Motion RopeClimb: animation
 * </Dragonbones Sprite Settings>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - The above notetag allows to wrap up all the information you'd like to
 *   set for Dragonbones battler armatures needed inside a single notetag
 *   container.
 * - The settings are the same as the notetags listed above it.
 * - You may remove the settings you don't wish to change.
 * - The only necessary data is the 'Filename: filename' line.
 *
 * Example:
 *
 * <Dragonbones Sprite Settings>
 *  Filename: Ubbie
 *
 *  Scale: 0.1, 0.1
 *
 *  Flip Right
 *
 *  Motion Idle: stand
 *  Motion Walk: walk
 * </Dragonbones Sprite Settings>
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
 * === Battler Plugin Commands ===
 * 
 * ---
 *
 * Battler: Actor Change Settings
 * - Change target actor's Dragonbones armature settings for battle.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *     Filename:
 *     - Change the armature's filename.
 *
 *     Offset X:
 *     - Change the armature's Offset X value.
 *
 *     Offset Y:
 *     - Change the armature's Offset Y value.
 *
 *     Scale X:
 *     - Change the armature's Scale X value.
 * 
 *     Scale Y:
 *     - Change the armature's Scale Y value.
 *
 *     Time Scale:
 *     - Change the armature's Time Scale value.
 *
 *     Width:
 *     - Change the battler width size.
 *
 *     Height:
 *     - Change the battler height size.
 *
 *   Motion Settings:
 *
 *     Walk:
 *     Wait:
 *     Chant:
 *     Guard:
 *     Damage:
 *     Evade:
 *     Thrust:
 *     Swing:
 *     Missile:
 *     Skill:
 *     Spell:
 *     Item:
 *     Escape:
 *     Victory:
 *     Dying:
 *     Abnormal:
 *     Sleep:
 *     Dead:
 *     - Change the animation used for this motion.
 *
 * ---
 * 
 * === Map Sprite Plugin Commands ===
 * 
 * ---
 *
 * Map Sprite: Actor Change Settings
 * - Change target actor's Dragonbones armature settings for map sprites.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *     Filename:
 *     - Change the armature's filename.
 *
 *     Offset X:
 *     - Change the armature's Offset X value.
 *
 *     Offset Y:
 *     - Change the armature's Offset Y value.
 *
 *     Scale X:
 *     - Change the armature's Scale X value.
 * 
 *     Scale Y:
 *     - Change the armature's Scale Y value.
 *
 *     Time Scale:
 *     - Change the armature's Time Scale value.
 * 
 *       Walk Rate:
 *       - Change the armature's walk animation rate.
 * 
 *       Dash Rate:
 *       - Change the armature's dash animation rate.
 *
 *     Width:
 *     - Change the battler width size.
 *
 *     Height:
 *     - Change the battler height size.
 *
 *   Flip Settings:
 *
 *     Flip Left?:
 *     Flip Right:
 *     - Flip the scale x value when facing left/right-ward directions?
 *
 *   Motion Settings:
 *
 *     Idle:
 *     Walk:
 *     Dash:
 *     Jump:
 *     Ladder (Idle):
 *     Ladder (Climb):
 *     Rope (Idle):
 *     Rope (Climb):
 *     - Base rope climbing animation name used.
 *
 * ---
 *
 * Map Sprite: Actor Play Animation
 * - Target actor plays a custom Dragonbones animation.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * NOTE: An alternative to this is to put the following code inside of a
 *       Movement Route's script call:
 *
 *       this.dragonbonesAnimation = "AnimationName";
 *
 *       Replace 'AnimationName' (keep the quotes) with the name of the
 *       Dragonbones animation.
 *
 * ---
 *
 * Map Sprite: Actor Stop Animation
 * - Stops a target actor's custom Dragonbones animation.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 * ---
 *
 * Map Sprite: Event Play Animation
 * - Target event plays a custom Dragonbones animation.
 *
 *   Event ID:
 *   - Select which Event ID to affect.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Map Sprite: Event Stop Animation
 * - Stops a target event's custom Dragonbones animation.
 *
 *   Event ID:
 *   - Select which Event ID to affect.
 *
 * ---
 *
 * Map Sprite: Follower Play Animation
 * - Target follower plays a custom Dragonbones animation.
 *
 *   Follower Index:
 *   - Select which Follower Index to affect.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Map Sprite: Follower Stop Animation
 * - Stops a target follower's custom Dragonbones animation.
 *
 *   Follower ID:
 *   - Select which Follower Index to affect.
 *
 * ---
 *
 * Map Sprite: Player Play Animation
 * - Player plays a custom Dragonbones animation.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Map Sprite: Player Stop Animation
 * - Stops player's custom Dragonbones animation.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Dragonbones Setup
 * - Setup a Dragonbones armature for a picture.
 *
 *   Picture ID:
 *   - Select which Picture ID(s) to give a Dragonbones armature.
 *
 *   Armature Filename:
 *   - What is the armature's filename?
 *
 *   Play Animation:
 *   - Play this animation once it starts.
 *
 *   Offset: X:
 *   - Default X offset value for this Dragonbones armature.
 *
 *   Offset: Y:
 *   - Default Y offset value for this Dragonbones armature.
 *
 *   Scale: X:
 *   - Default X scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 *   Scale: Y:
 *   - Default Y scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 *   Time Scale:
 *   - Default time scale for this Dragonbones armature.
 *   - Higher values play faster. Lower values play slower.
 *
 * ---
 *
 * Picture: Play Dragonbones Animation
 * - Make an existing Dragonbones armature attached to a picture play
 *   an animation.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Play Animation:
 *   - Play this animation.
 * 
 *   Finish: Revert Idle:
 *   - Revert animation to 'idle' animation after finishing?
 *
 * ---
 *
 * Picture: Offset Dragonbones
 * - Offset the X, Y attachment point of the Dragonbones armature.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Offset: X:
 *   - X offset value for this Dragonbones armature.
 *
 *   Offset: Y:
 *   - Y offset value for this Dragonbones armature.
 *
 * ---
 *
 * Picture: Scale Dragonbones
 * - Change the scaling values of the Dragonbones armature.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Scale: X:
 *   - X scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 *   Scale: Y:
 *   - Y scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 * ---
 *
 * Picture: Time Scale Dragonbones
 * - Change the speed at which Dragonbones animations play.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Time Scale:
 *   - Time scale for this Dragonbones armature.
 *   - Higher values play faster. Lower values play slower.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings that apply to all uses of Dragonbones through
 * this plugin. While the majority of these can remain unchanged, for those who
 * wish to customize the nature of the plugin to their liking can do so through
 * these Plugin Parameters.
 *
 * ---
 *
 * Assets Path
 * - The filepath to the directory that houses all the Dragonbone files.
 *
 * ---
 *
 * Defaults
 * 
 *   Loaded Animation:
 *   - The default animation to play once a Dragonbones armature is loaded.
 * 
 *   Looping Animations:
 *   - Force these animations to become looping animations even if they don't
 *     loop in Dragonbones.
 *
 * ---
 *
 * Skeletal Data
 * Texture Data
 * Texture Asset
 * 
 *   Key:
 *   - Key used to determine where needed data is stored.
 * 
 *   Extension:
 *   - Extension used to determine which files contain needed data.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battler Settings
 * ============================================================================
 *
 * Actor and Enemy sprites can have Dragonbones armatures attached to them as
 * sprites. Use these settings to make the Dragonbones armatures fit your needs
 * in battle.
 *
 * ---
 *
 * Default Settings
 * 
 *   Enemy Hue Affected?:
 *   - Affect hues for enemies with Dragonbones battlers?
 * 
 *   Offset: X:
 *   - Default X offset for battler sprites.
 * 
 *   Offset: Y:
 *   - Default Y offset for battler sprites.
 * 
 *   Scale: X:
 *   - Default scale for X used by Dragonbones battlers.
 * 
 *     Flip for Actors?:
 *     Flip for Enemies?:
 *     - Flip the scale x value into negative automatically for all actors
 *       or enemies?
 * 
 *   Scale: Y:
 *   - Default scale for Y used by Dragonbones battlers.
 * 
 *   Width:
 *   - Treat battler sprites as if they have this width.
 *   - Used for Action Sequences.
 * 
 *   Height:
 *   - Treat battler sprites as if they have this height.
 *   - Used for Action Sequences.
 *
 * ---
 * 
 * Idle Bypass
 * 
 *   List:
 *   - This is a list of animations that will not return back to the idle
 *     animation after completion.
 *   - Remove them if you want them to revert back to the idle animation
 *     after completion.
 *   - Add to the list if you want animations to stay in their final frame.
 * 
 * ---
 *
 * Default Motions
 * 
 *   Walk:
 *   Wait:
 *   Chant:
 *   Guard:
 *   Damage:
 *   Evade:
 *   Thrust:
 *   Swing:
 *   Missile:
 *   Skill:
 *   Spell:
 *   Item:
 *   Escape:
 *   Victory:
 *   Dying:
 *   Abnormal:
 *   Sleep:
 *   Dead:
 *   - Play this Dragonbones animation whenever this motion is requested
 *     by default.
 *   - Used for Action Sequences.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Map Sprite Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust the default configurations for any
 * map sprite that's using a Dragonbones armature. These settings can be
 * overwritten on per a sprite basis using notetags and comment tags, too.
 *
 * ---
 *
 * Defaults
 * 
 *   Offset: X:
 *   - Default X offset for map sprites.
 * 
 *   Offset: Y:
 *   - Default Y offset for map sprites.
 * 
 *   Scale: X:
 *   - Default scale for X used by Dragonbones map sprites.
 * 
 *     Flip Left?:
 *     Flip Right?:
 *     - Flip the scale x value when facing left/right-ward directions?
 * 
 *   Scale: Y:
 *   - Default scale for Y used by Dragonbones map sprites.
 * 
 *   Time Scale:
 *   - The rate at which animations play.
 *   - Higher numbers go faster.
 * 
 *   Width:
 *   - Treat map sprites as if they have this width.
 *   - Used for various plugins.
 * 
 *   Height:
 *   - Treat map sprites as if they have this height.
 *   - Used for various plugins.
 *
 * ---
 *
 * Motion Settings
 * 
 *   Idle:
 *   Walk:
 *   Dash:
 *   Jump:
 *   Ladder (Idle):
 *   Ladder (Climb):
 *   Rope (Idle):
 *   Rope (Climb):
 *   - Base walk animation name used.
 * 
 *   Walk Timer:
 *   - Number of frames to count as walking so that an idle animation isn't
 *     immediately forced upon stopping.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Experimental Settings
 * ============================================================================
 *
 * These settings are experimental and have not been tested extensively yet.
 *
 * ---
 *
 * Experimental Settings
 * 
 *   Enemy Stances:
 *   - Enemies can use stance motions for idling such as chanting,
 *     guarding, etc.
 *   - Requires VisuMZ_1_BattleCore!
 *   - This is not available normally since animations are not available for
 *     enemies with the base RPG Maker MZ core scripts.
 *   - Disable this to use the default animation flow for enemies.
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
 *
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * Special Thanks To
 * 
 * * Green Kel
 * * Ækashics
 * * Swift Illusion
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.22: December 15, 2022
 * * Compatibility Update!
 * ** Should now work with RPG Maker MZ version 1.6.1's updated Pixi JS version
 *    of 5.3.12 from 5.2.4. If ya don't have this plugin updated and you are
 *    using 5.3.12 onward, your battlers won't be loading.
 * 
 * Version 1.21: November 24, 2022
 * * Bug Fixes!
 * ** Custom motions now work better with non-actor participants during actions
 *    involving dragonbones battlers. Fix made by Arisu.
 * 
 * Version 1.20: November 17, 2022
 * * Bug Fixes!
 * ** "Damage" motion wasn't working properly for actors. This should now be
 *    fixed and working properly.
 * * Bug Fixes!
 * ** "Escape" motion should now work properly with Dragonbones actors. Idle
 *    motions will no longer take priority over them.
 * 
 * Version 1.19: November 10, 2022
 * * Bug Fixes!
 * ** Fixed a bug from the v1.18 update that prevented custom motions from
 *    being displayed properly with actors. Fix made by Irina.
 * 
 * Version 1.18: October 13, 2022
 * * Compatibility Update!
 * ** Plugin should be more compatible with VisuMZ_3_VisualStateEffect.
 * 
 * Version 1.17: January 27, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Added Plugin Command Parameter for "Picture: Play Dragonbones Animation":
 * *** Finish: Revert Idle?
 * **** Revert animation to 'idle' animation after finishing?
 * **** Added by Irina
 *
 * Version 1.16: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.15: June 18, 2021
 * * Compatibility Update
 * ** Compatibility update with Elements and Status Menu Core's trait hues.
 *    These will be affected by the notetags and/or Plugin Parameters applied.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Ækashics:
 * *** <Dragonbones Hue Affected>
 * *** <Dragonbones No Hue>
 * **** Determines if this enemy's Dragonbones battler is affected by hues
 *      or not. This will bypass the Plugin Parameter's default value.
 * ** New Plugin Parameter added by Irina and sponsored by Ækashics:
 * *** Plugin Parameters > Battler Settings > Default > Enemy Hue Affected?
 * **** Affect hues for enemies with Dragonbones battlers?
 * **** This will be disabled by default. Enable it or set it to true to make
 *      it work properly.
 * 
 * Version 1.14: April 2, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_3_StateTooltips plugin.
 * 
 * Version 1.13: March 19, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Experimental: Enemy Stances
 * **** Allows enemies to utilize stance motions for idling such as chanting,
 *      guarding, etc.
 * **** Requires VisuMZ_1_BattleCore!
 * **** This is not available normally since animations are not available for
 *      enemies with the base RPG Maker MZ core scripts.
 * **** Disable this to use the default animation flow for enemies.
 * 
 * Version 1.12: February 19, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause a crash upon teleporting with an altering
 *    Dragonbones armature load without a base sprite. Fix made by Irina.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Fixed a bug involving the changing of a Dragonbones battler in-battle to
 *    prevent multiple instances being added at once. Fix made by Irina.
 * 
 * Version 1.10: January 22, 2021
 * * Bug Fixes!
 * ** Upon changing map sprites, Dragonbones characters would become skewed.
 *    This should no longer happen.
 * * Documentation Update!
 * ** Updated help file for new features.
 * * New Features!
 * ** Map Sprite: Actor Change Settings new Plugin Command parameters
 * *** "Walk Rate" and "Dash Rate" modifiers added.
 * 
 * Version 1.09: November 29, 2020
 * * Bug Fixes!
 * ** Dragonbones height for actors is no longer affected by frame divisibility
 *    for SV Actors to skew the positions of height data. Fix made by Arisu.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Updated help file for new features.
 * * New Features!
 * ** Two new notetags have been added for map sprites by Irina.
 * *** <Dragonbones Sprite Walk Rate: x>
 * *** <Dragonbones Sprite Dash Rate: x>
 * **** These two new notetags allow you to animate specific Dragonbones
 *      animations at a different speed when walking or dashing. These speed
 *      multipliers will stack multiplicatively with the time scale.
 * 
 * Version 1.07: October 25, 2020
 * * Bug Fixes!
 * ** Dead animations for actors no longer keep looping upon motion refreshes.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Updated help file for new features.
 * * New Features!
 * ** New plugin parameter added by Irina.
 * *** Plugin Parameters > Battler Settings > Idle Bypass > List
 * **** This is a list of animations that will not return back to the idle
 *      animation after completion. Remove them if you want them to revert back
 *      to the idle animation after completion. Add to the list if you want
 *      animations to stay in their final frame.
 * 
 * Version 1.06: October 18, 2020
 * * Bug Fixes!
 * ** Enemies with Dragonbones battlers transforming into other enemies with
 *    Dragonbones battlers will now attach the sprites properly. Fix by Yanfly.
 * ** Enemies with Dragonbones battlers transforming into enemies without them
 *    will now remove the non-transformed bitmap.
 * * Documentation Update!
 * ** Added the 'Dragonbones Naming' section.
 * 
 * Version 1.05: October 4, 2020
 * * Bug Fixes!
 * ** Selected Dragonbones battlers will no longer leave behind a residual
 *    blink effect. Fix made by Irina.
 * ** There should be no more crashes from map events that have been previously
 *    deleted but not cleared from the map event list. Fix made by Irina.
 * 
 * Version 1.04: September 20, 2020
 * * Bug Fixes!
 * ** Hidden enemies with Dragonbones should be invisible at the start of
 *    battle. Fix made by Yanfly.
 * 
 * Version 1.03: September 13, 2020
 * * Compatibility Update!
 * ** Added compatibility with the new Battle Core v1.04 features!
 * 
 * Version 1.02: September 6, 2020
 * * Bug Fixes!
 * ** Previously, a Dragonbones battler does not show the blinking indicator if
 *    the battler is a selected target. This is now fixed. Fix made by Yanfly.
 * ** Prevents a crash now if no bitmap is detected for the main sprite.
 * 
 * Version 1.01: August 30, 2020
 * * Bug Fixes!
 * ** Erasing a picture no longer causes a crash when changing scenes. Fix made
 *    by Yanfly.
 * * Compatibility Update
 * ** Added compatibility for VisuStella MZ's Visual State Effects.
 *
 * Version 1.00: August 24, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Battler_ActorChange
 * @text Battler: Actor Change Settings
 * @desc Change target actor's Dragonbones armature settings for battle.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Filename:str
 * @text Filename
 * @parent ActorID:num
 * @desc Change the armature's filename.
 * @default name
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @parent ActorID:num
 * @desc Change the armature's Offset X value.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent ActorID:num
 * @desc Change the armature's Offset Y value.
 * @default 0
 *
 * @arg ScaleX:eval
 * @text Scale X
 * @parent ActorID:num
 * @desc Change the armature's Scale X value.
 * @default 1.0
 *
 * @arg ScaleY:eval
 * @text Scale Y
 * @parent ActorID:num
 * @desc Change the armature's Scale Y value.
 * @default 1.0
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @parent ActorID:num
 * @desc Change the armature's Time Scale value.
 * @default 1.0
 *
 * @arg Width:eval
 * @text Width
 * @parent ActorID:num
 * @desc Change the battler width size.
 * @default 64
 *
 * @arg Height:eval
 * @text Height
 * @parent ActorID:num
 * @desc Change the battler height size.
 * @default 64
 *
 * @arg DefaultMotions
 * @text Motion Settings
 *
 * @arg MotionWalk:str
 * @text Walk
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default walk
 *
 * @arg MotionWait:str
 * @text Wait
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default wait
 *
 * @arg MotionChant:str
 * @text Chant
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default chant
 *
 * @arg MotionGuard:str
 * @text Guard
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default guard
 *
 * @arg MotionDamage:str
 * @text Damage
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default damage
 *
 * @arg MotionEvade:str
 * @text Evade
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default evade
 *
 * @arg MotionThrust:str
 * @text Thrust
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default thrust
 *
 * @arg MotionSwing:str
 * @text Swing
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default swing
 *
 * @arg MotionMissile:str
 * @text Missile
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default missile
 *
 * @arg MotionSkill:str
 * @text Skill
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default skill
 *
 * @arg MotionSpell:str
 * @text Spell
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default spell
 *
 * @arg MotionItem:str
 * @text Item
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default item
 *
 * @arg MotionEscape:str
 * @text Escape
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default escape
 *
 * @arg MotionVictory:str
 * @text Victory
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default victory
 *
 * @arg MotionDying:str
 * @text Dying
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default dying
 *
 * @arg MotionAbnormal:str
 * @text Abnormal
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default abnormal
 *
 * @arg MotionSleep:str
 * @text Sleep
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default sleep
 *
 * @arg MotionDead:str
 * @text Dead
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default dead
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_ActorChange
 * @text Map Sprite: Actor Change Settings
 * @desc Change target actor's Dragonbones armature settings for map sprites.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Filename:str
 * @text Filename
 * @parent ActorID:num
 * @desc Change the armature's filename.
 * @default name
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @parent ActorID:num
 * @desc Change the armature's Offset X value.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent ActorID:num
 * @desc Change the armature's Offset Y value.
 * @default 0
 *
 * @arg ScaleX:eval
 * @text Scale X
 * @parent ActorID:num
 * @desc Change the armature's Scale X value.
 * @default 0.5
 *
 * @arg ScaleY:eval
 * @text Scale Y
 * @parent ActorID:num
 * @desc Change the armature's Scale Y value.
 * @default 0.5
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @parent ActorID:num
 * @desc Change the armature's Time Scale value.
 * @default 1.0
 *
 * @arg WalkRate:eval
 * @text Walk Rate
 * @parent TimeScale:eval
 * @desc Change the armature's walk animation rate.
 * @default 1.0
 *
 * @arg DashRate:eval
 * @text Dash Rate
 * @parent TimeScale:eval
 * @desc Change the armature's dash animation rate.
 * @default 1.0
 *
 * @arg Width:eval
 * @text Width
 * @parent ActorID:num
 * @desc Change the armature's width value.
 * @default 48
 *
 * @arg Height:eval
 * @text Height
 * @parent ActorID:num
 * @desc Change the armature's height.
 * @default 48
 *
 * @arg FlipSettings
 * @text Flip Settings
 *
 * @arg FlipLeft:eval
 * @text Flip Left?
 * @parent FlipSettings
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing left-ward directions?
 * @default false
 *
 * @arg FlipRight:eval
 * @text Flip Right?
 * @parent FlipSettings
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing right-ward directions?
 * animation is found?
 * @default false
 *
 * @arg Animations
 * @text Motion Settings
 *
 * @arg Idle:str
 * @text Idle
 * @parent Animations
 * @desc Base idle animation name used.
 * @default idle
 *
 * @arg Walk:str
 * @text Walk
 * @parent Animations
 * @desc Base walk animation name used.
 * @default walk
 *
 * @arg Dash:str
 * @text Dash
 * @parent Animations
 * @desc Base dash animation name used.
 * @default dash
 *
 * @arg Jump:str
 * @text Jump
 * @parent Animations
 * @desc Base jump animation name used.
 * @default jump
 *
 * @arg LadderIdle:str
 * @text Ladder (Idle)
 * @parent Animations
 * @desc Base ladder idle animation name used.
 * @default ladderidle
 *
 * @arg LadderClimb:str
 * @text Ladder (Climb)
 * @parent Animations
 * @desc Base ladder climbing animation name used.
 * @default ladderclimb
 *
 * @arg RopeIdle:str
 * @text Rope (Idle)
 * @parent Animations
 * @desc Base rope idle animation name used.
 * @default ropeidle
 *
 * @arg RopeClimb:str
 * @text Rope (Climb)
 * @parent Animations
 * @desc Base rope climbing animation name used.
 * @default ropecllmb
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_ActorAnimationPlay
 * @text Map Sprite: Actor Play Animation
 * @desc Target actor plays a custom Dragonbones animation.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_ActorAnimationStop
 * @text Map Sprite: Actor Stop Animation
 * @desc Stops a target actor's custom Dragonbones animation.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_EventAnimationPlay
 * @text Map Sprite: Event Play Animation
 * @desc Target event plays a custom Dragonbones animation.
 *
 * @arg EventID:eval
 * @text Event ID
 * @desc Select which Event ID to affect.
 * @default 1
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_EventAnimationStop
 * @text Map Sprite: Event Stop Animation
 * @desc Stops a target event's custom Dragonbones animation.
 *
 * @arg EventID:eval
 * @text Event ID
 * @desc Select which Event ID to affect.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_FollowerAnimationPlay
 * @text Map Sprite: Follower Play Animation
 * @desc Target follower plays a custom Dragonbones animation.
 *
 * @arg FollowerIndex:eval
 * @text Follower Index
 * @desc Select which Follower Index to affect.
 * @default 0
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_FollowerAnimationStop
 * @text Map Sprite: Follower Stop Animation
 * @desc Stops a target follower's custom Dragonbones animation.
 *
 * @arg FollowerIndex:eval
 * @text Follower ID
 * @desc Select which Follower Index to affect.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_PlayerAnimationPlay
 * @text Map Sprite: Player Play Animation
 * @desc Player plays a custom Dragonbones animation.
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_PlayerAnimationStop
 * @text Map Sprite: Player Stop Animation
 * @desc Stops player's custom Dragonbones animation.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_SetupDragonbones
 * @text Picture: Dragonbones Setup
 * @desc Setup a Dragonbones armature for a picture.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID(s) to give a Dragonbones armature.
 * @default 1
 *
 * @arg Filename:str
 * @text Armature Filename
 * @desc What is the armature's filename?
 * @default Untitled
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation once it starts.
 * @default Idle
 *
 * @arg OffsetX:eval
 * @text Offset: X
 * @desc Default X offset value for this Dragonbones armature.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset: Y
 * @desc Default Y offset value for this Dragonbones armature.
 * @default 0
 *
 * @arg ScaleX:eval
 * @text Scale: X
 * @desc Default X scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @arg ScaleY:eval
 * @text Scale: Y
 * @desc Default Y scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @desc Default time scale for this Dragonbones armature.
 * Higher values play faster. Lower values play slower.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_DragonbonesAnimation
 * @text Picture: Play Dragonbones Animation
 * @desc Make an existing Dragonbones armature attached to a picture play an animation.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @arg IdleFinish:eval
 * @text Finish: Revert Idle?
 * @parent FlipSettings
 * @type boolean
 * @on Revert
 * @off Freeze
 * @desc Revert animation to 'idle' animation after finishing?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_DragonbonesOffset
 * @text Picture: Offset Dragonbones
 * @desc Offset the X, Y attachment point of the Dragonbones armature.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg OffsetX:eval
 * @text Offset: X
 * @desc X offset value for this Dragonbones armature.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset: Y
 * @desc Y offset value for this Dragonbones armature.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_ScaleDragonbones
 * @text Picture: Scale Dragonbones
 * @desc Change the scaling values of the Dragonbones armature.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg ScaleX:eval
 * @text Scale: X
 * @desc X scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @arg ScaleY:eval
 * @text Scale: Y
 * @desc Y scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_TimeScaleDragonbones
 * @text Picture: Time Scale Dragonbones
 * @desc Change the speed at which Dragonbones animations play.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @desc Default time scale for this Dragonbones armature.
 * Higher values play faster. Lower values play slower.
 * @default 1.0
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
 * @param DragonbonesUnion
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Main
 * @text Main Settings
 *
 * @param AssetsPath:str
 * @text Assets Path
 * @parent Main
 * @desc The filepath to the directory that houses all the Dragonbone files.
 * @default ./dragonbones_assets/
 *
 * @param General:struct
 * @text General Settings
 * @parent Main
 * @type struct<General>
 * @desc A set of general settings pertaining to all uses of Dragonbones.
 * @default {"Defaults":"","LoadAnimation:str":"idle","LoopingAnimations:arraystr":"[\"idle\",\"walk\",\"wait\",\"chant\",\"guard\",\"dying\",\"abnormal\",\"sleep\",\"dash\",\"ladderidle\",\"ladderclimb\",\"ropeidle\",\"ropeclimb\"]","SkeletalData":"","SkeKey:str":"dbData","SkeExt:str":"_ske.json","TextureData":"","TexKey:str":"texData","TexExt:str":"_tex.json","TextureAsset":"","TxaKey:str":"texAsset","TxaExt:str":"_tex.png"}
 *
 * @param Battler:struct
 * @text Battler Settings
 * @parent Main
 * @type struct<Battler>
 * @desc A set of general settings pertaining to Dragonbones battlers.
 * @default {"Defaults":"","OffsetX:num":"0","OffsetY:num":"0","ScaleX:num":"1.0","FlipActors:eval":"false","FlipEnemies:eval":"false","ScaleY:num":"1.0","TimeScale:num":"1.0","Width:num":"64","Height:num":"64","IdleBypass":"","IdleBypassList:arraystr":"[\"dead\",\"escape\",\"victory\"]","DefaultMotions":"","MotionWalk:str":"walk","MotionWait:str":"wait","MotionChant:str":"chant","MotionGuard:str":"guard","MotionDamage:str":"damage","MotionEvade:str":"evade","MotionThrust:str":"thrust","MotionSwing:str":"swing","MotionMissile:str":"missile","MotionSkill:str":"skill","MotionSpell:str":"spell","MotionItem:str":"item","MotionEscape:str":"escape","MotionVictory:str":"victory","MotionDying:str":"dying","MotionAbnormal:str":"abnormal","MotionSleep:str":"sleep","MotionDead:str":"dead"}
 *
 * @param MapSprite:struct
 * @text Map Sprite Settings
 * @parent Main
 * @type struct<MapSprite>
 * @desc A set of general settings pertaining to Dragonbones map sprites.
 * @default {"Defaults":"","OffsetX:num":"0","OffsetY:num":"0","ScaleX:num":"0.5","FlipLeft:eval":"false","FlipRight:eval":"false","ScaleY:num":"0.5","TimeScale:num":"1.0","Width:num":"48","Height:num":"48","Animations":"","Idle:str":"idle","Walk:str":"walk","WalkTimer:num":"2","Dash:str":"dash","Jump:str":"jump","LadderIdle:str":"ladderidle","LadderClimb:str":"ladderclimb","RopeIdle:str":"ropeidle","RopeClimb:str":"ropecllmb"}
 * 
 * @param Experimental
 * 
 * @param EnemyStances:eval
 * @text Enemy Stances
 * @parent Experimental
 * @type boolean
 * @on Enable Stances
 * @off No Stances
 * @desc Enemies can use stance motions for idling such as
 * chanting, guarding, etc. Requires VisuMZ_1_BattleCore!
 * @default false
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
 * @param Defaults
 *
 * @param LoadAnimation:str
 * @text Loaded Animation
 * @parent Defaults
 * @desc The default animation to play once a Dragonbones armature is loaded.
 * @default idle
 *
 * @param LoopingAnimations:arraystr
 * @text Looping Animations
 * @parent Defaults
 * @type string[]
 * @desc Force these animations to become looping animations even if they don't loop in Dragonbones.
 * @default ["idle","walk","wait","chant","guard","dying","abnormal","sleep","dash","ladderidle","ladderclimb","ropeidle","ropeclimb"]
 *
 * @param SkeletalData
 * @text Skeletal Data
 *
 * @param SkeKey:str
 * @text Key
 * @parent SkeletalData
 * @desc Key used to determine where skeletal data is stored.
 * @default dbData
 *
 * @param SkeExt:str
 * @text Extension
 * @parent SkeletalData
 * @desc Extension used to determine which files contain skeletal data.
 * @default _ske.json
 *
 * @param TextureData
 * @text Texture Data
 *
 * @param TexKey:str
 * @text Key
 * @parent TextureData
 * @desc Key used to determine where texture data is stored.
 * @default texData
 *
 * @param TexExt:str
 * @text Extension
 * @parent TextureData
 * @desc Extension used to determine which files contain texture data.
 * @default _tex.json
 *
 * @param TextureAsset
 * @text Texture Asset
 *
 * @param TxaKey:str
 * @text Key
 * @parent TextureAsset
 * @desc Key used to determine where texture assets are stored.
 * @default texAsset
 *
 * @param TxaExt:str
 * @text Extension
 * @parent TextureAsset
 * @desc Extension used to determine which files contain texture assets.
 * @default _tex.png
 *
 */
/* ----------------------------------------------------------------------------
 * Battler Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battler:
 *
 * @param Defaults
 * @text Default Settings
 *
 * @param HueAffected:eval
 * @text Enemy Hue Affected?
 * @parent Defaults
 * @type boolean
 * @on Affect Hues
 * @off No Hues
 * @desc Affect hues for enemies with Dragonbones battlers?
 * @default false
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Defaults
 * @desc Default X offset for battler sprites.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Defaults
 * @desc Default Y offset for battler sprites.
 * @default 0
 *
 * @param ScaleX:num
 * @text Scale: X
 * @parent Defaults
 * @desc Default scale for X used by Dragonbones battlers.
 * @default 1.0
 *
 * @param FlipActors:eval
 * @text Flip for Actors?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value into negative automatically for all actors?
 * @default false
 *
 * @param FlipEnemies:eval
 * @text Flip for Enemies?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value into negative automatically for all enemies?
 * @default false
 *
 * @param ScaleY:num
 * @text Scale: Y
 * @parent Defaults
 * @desc Default scale for Y used by Dragonbones battlers.
 * @default 1.0
 *
 * @param TimeScale:num
 * @text Time Scale
 * @parent Defaults
 * @desc The rate at which animations play.
 * Higher numbers go faster.
 * @default 1.0
 *
 * @param Width:num
 * @text Width
 * @parent Defaults
 * @desc Treat battler sprites as if they have this width.
 * Used for Action Sequences.
 * @default 64
 *
 * @param Height:num
 * @text Height
 * @parent Defaults
 * @desc Treat battler sprites as if they have this height.
 * Used for Action Sequences.
 * @default 64
 *
 * @param IdleBypass
 * @text Idle Bypass
 *
 * @param IdleBypassList:arraystr
 * @text List
 * @parent IdleBypass
 * @type combo[]
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc This is a list of animations that will not return back to the idle animation after completion.
 * @default ["dead","escape","victory"]
 *
 * @param DefaultMotions
 * @text Default Motions
 *
 * @param MotionWalk:str
 * @text Walk
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default walk
 *
 * @param MotionWait:str
 * @text Wait
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default wait
 *
 * @param MotionChant:str
 * @text Chant
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default chant
 *
 * @param MotionGuard:str
 * @text Guard
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default guard
 *
 * @param MotionDamage:str
 * @text Damage
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default damage
 *
 * @param MotionEvade:str
 * @text Evade
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default evade
 *
 * @param MotionThrust:str
 * @text Thrust
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default thrust
 *
 * @param MotionSwing:str
 * @text Swing
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default swing
 *
 * @param MotionMissile:str
 * @text Missile
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default missile
 *
 * @param MotionSkill:str
 * @text Skill
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default skill
 *
 * @param MotionSpell:str
 * @text Spell
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default spell
 *
 * @param MotionItem:str
 * @text Item
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default item
 *
 * @param MotionEscape:str
 * @text Escape
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default escape
 *
 * @param MotionVictory:str
 * @text Victory
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default victory
 *
 * @param MotionDying:str
 * @text Dying
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default dying
 *
 * @param MotionAbnormal:str
 * @text Abnormal
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default abnormal
 *
 * @param MotionSleep:str
 * @text Sleep
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default sleep
 *
 * @param MotionDead:str
 * @text Dead
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default dead
 *
 */
/* ----------------------------------------------------------------------------
 * Map Sprite Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MapSprite:
 *
 * @param Defaults
 * @text Default Settings
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Defaults
 * @desc Default X offset for map sprites.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Defaults
 * @desc Default Y offset for map sprites.
 * @default 0
 *
 * @param ScaleX:num
 * @text Scale: X
 * @parent Defaults
 * @desc Default scale for X used by Dragonbones map sprites.
 * @default 0.5
 *
 * @param FlipLeft:eval
 * @text Flip Left?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing left-ward directions?
 * @default false
 *
 * @param FlipRight:eval
 * @text Flip Right?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing right-ward directions?
 * animation is found?
 * @default false
 *
 * @param ScaleY:num
 * @text Scale: Y
 * @parent Defaults
 * @desc Default scale for Y used by Dragonbones map sprites.
 * @default 0.5
 *
 * @param TimeScale:num
 * @text Time Scale
 * @parent Defaults
 * @desc The rate at which animations play.
 * Higher numbers go faster.
 * @default 1.0
 *
 * @param Width:num
 * @text Width
 * @parent Defaults
 * @desc Treat map sprites as if they have this width.
 * Used for various plugins.
 * @default 48
 *
 * @param Height:num
 * @text Height
 * @parent Defaults
 * @desc Treat map sprites as if they have this height.
 * Used for various plugins.
 * @default 48
 *
 * @param Animations
 * @text Motion Settings
 *
 * @param Idle:str
 * @text Idle
 * @parent Animations
 * @desc Base idle animation name used.
 * @default idle
 *
 * @param Walk:str
 * @text Walk
 * @parent Animations
 * @desc Base walk animation name used.
 * @default walk
 *
 * @param WalkTimer:num
 * @text Walk Timer
 * @parent Walk:str
 * @desc Number of frames to count as walking so that an idle animation isn't immediately forced upon stopping.
 * @default 2
 *
 * @param Dash:str
 * @text Dash
 * @parent Animations
 * @desc Base dash animation name used.
 * @default dash
 *
 * @param Jump:str
 * @text Jump
 * @parent Animations
 * @desc Base jump animation name used.
 * @default jump
 *
 * @param LadderIdle:str
 * @text Ladder (Idle)
 * @parent Animations
 * @desc Base ladder idle animation name used.
 * @default ladderidle
 *
 * @param LadderClimb:str
 * @text Ladder (Climb)
 * @parent Animations
 * @desc Base ladder climbing animation name used.
 * @default ladderclimb
 *
 * @param RopeIdle:str
 * @text Rope (Idle)
 * @parent Animations
 * @desc Base rope idle animation name used.
 * @default ropeidle
 *
 * @param RopeClimb:str
 * @text Rope (Climb)
 * @parent Animations
 * @desc Base rope climbing animation name used.
 * @default ropecllmb
 *
 */
//=============================================================================

const _0x41a585=_0x4345;function _0x4f00(){const _0x7e9ba=['dashRate','pOrWd','5021910Utkfhx','Sprite_Enemy_refreshMotion','MotionItem','Picture_DragonbonesOffset','_dragonbonesAnimation','DefaultAnimation','stateMotionIndex','playDragonbonesAnimation','Sprite_Actor_updateFrame','Sprite_Actor_startMotion','Game_Actor_performDamage','_escaping','Game_Actor_performAction','PEHIk','processEscape','ropeclimb','Game_Actor_performAttack','LoadQueue','kvBMu','SkeKey','isUndecided','sMmNP','_dragonbonesName','EVAL','Sprite_Character_updateBitmap','LoVBh','updateDragonbonesProperties','2787744QTDOAl','wait','Height','timeScale','push','parseTextureAtlasData','_targets','DashRate','_enemyId','dwXFg','qbdul','Animation','_shadowSprite','MotionDamage','call','height','setBattler','ofevr','isPlaying','createDefaultPicture','setHue','bEXHg','STR','isInputting','isTryingToEscape','shared','createArmature','_dragonbonesSpriteContainer','follower','dash','enemy','canActorPlayDragonbonesMotion','onLoadDragonbones','buildArmatureDisplay','MapSprite_EventAnimationStop','_target','27eOdjpm','MapSprite','length','index','GEVrQ','updateDragonbonesArmature','Game_Enemy_performAction','list','toUpperCase','refreshMotionDragonbones','flipRight','ARRAYNUM','DragonbonesUnion','followers','PixiFactory','GAtKb','HHOOU','texture','escape','abnormal','MotionAbnormal','MotionSwing','ARRAYJSON','Sprite_Enemy_setBattler','requestMotionRefresh','checkDragonbonesStringTags','dragonbonesData','SdOBM','picture','updateFrameDragonbonesUnion','battlerSprites','IdleFinish','animations','nAtWm','_lastPluginCommandInterpreter','Game_Event_setupPageSettings','FlipRight','format','processLoad','updateDragonbonesTimeScale','Game_Battler_requestMotion','findPictureSprite','initialize','resources','setupPageSettings','MapSprite_FollowerAnimationStop','once','_character','RopeIdle','code','isHidden','FlipActors','requestDragonbonesAnimation','initMembersDragonbonesUnion','XgGwv','isEnemy','updateCharacterFrame','disposeDragonbones','update','runQueuedCallbacks','ScaleY','GcuOF','isSceneBattle','Filename','TimeScale','toLowerCase','factory','_baseDragonbonesSprite','performActionMotions','OffsetX','erasePictureDragonbonesUnion','ZESbW','attack','Game_Enemy_performCollapse','children','setupDragonbonesDataNotetags','_hue','chant','performActionEndMembers','Idle','createBaseDragonbonesSprite','LUkjJ','ScaleX','currentDragonbonesAnimation','gqmZm','HBJnX','VisuMZ_1_EventsMoveCore','dragonbonesSpriteData','FollowerIndex','CTPkm','MotionVictory','data','addChildAt','Game_Actor_setup','LoopingAnimations','filename','Picture_TimeScaleDragonbones','initMembers','jeYEX','_pictureContainer','LrQtc','Game_Event_clearPageSettings','victory','HueAffected','setupDragonbones','MotionWalk','event','isSceneMap','wluLD','IkHUr','performDamage','add','yhaoG','FDbwf','_weaponSprite','ConvertParams','VisuMZ_1_BattleCore','setupDragonbonesData','setup','Battler_ActorChange','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','BattleManager_processEscape','VpFmh','_pictures','item','leader','YSAvf','loadComplete','bitmap','updateShadow','Game_Enemy_transform','TxaExt','realMoveSpeed','clearPageSettings','bind','parameters','isActing','Settings','MotionSpell','exit','ladderidle','MotionDead','wbwRL','ActorID','MapSprite_ActorAnimationPlay','ROOFo','SdkYb','_requestedDragonbonesAnimation','seAIZ','parse','visible','LadderClimb','Walk','RopeClimb','26755SxSgcH','includes','match','SkeExt','Scene_Battle_terminate','updateShadowDragonbonesUnion','Sprite_Enemy_updateBitmap','ARRAYFUNC','TexExt','MapSprite_ActorChange','agVri','TexKey','loadNextArmature','CxbNm','_dragonbonesFilename','Sprite_Picture_initialize','EhwYG','concat','MotionSleep','isDying','addDragonbonesChild','fKnar','Sprite_Enemy_setHue','Dash','startMotion','Sprite_Actor_updateBitmap','getLastPluginCommandInterpreter','damage','max','command357','page','lastFileName','Game_Player_refresh','guard','isGuardWaiting','Game_Actor_performCollapse','endBattle','njtgh','isDragonbonesHueAffected','Game_Interpreter_PluginCommand','tGOZN','walk','eventId','onEscapeFailure','registerCommand','DYLKy','MapSprite_ActorAnimationStop','LWXfS','cvCqN','actor','load','jump','_playtestF7Looping','Picture_DragonbonesAnimation','12oIhBLZ','updateDragonbonesAnimation','walkRate','_mainSprite','rljvk','initDragonbonesData','dispose','isActor','isMoving','Picture_ScaleDragonbones','MapSprite_EventAnimationPlay','isMagicSkill','isOnLadder','LadderIdle','OnBSf','direction','_dragonbonesFlipDirection','isCompleted','battlerHue','revertToIdle','DgjKL','skill','isJumping','Sprite_Character_updateCharacterFrame','name','AssetsPath','animationNames','testLoaded','MapSprite_FollowerAnimationPlay','CallbackQueue','Sprite_Actor','WnTIt','_spriteset','Game_Follower_refresh','offsetY','dragonbonesFlip','MotionEscape','_stateSprite','playDragonbonesMotion','MotionMissile','695094xhikUl','Oyrmm','isChanting','Battler','Sprite_Enemy_initMembers','hasDragonbonesBattler','LoadAnimation','ARRAYEVAL','offsetX','cJNoG','lastAnimationName','VXxOL','_subject','PictureID','CUfoz','972baqsJP','WalkRate','onPPQ','28430SBTnji','Game_Picture_initialize','vpdJV','performAttack','play','Sprite_Actor_initMembers','ShWqw','mNxKo','filter','BattleManager_endBattle','RFCbD','playTimes','EnemyStances','MotionWait','dead','round','updateFrame','trim','isAlive','kEfuX','updateCharacterFrameDragonbonesUnion','transform','realPictureId','913zDsPCL','omtaV','TxaKey','isGuard','OffsetY','performCollapse','complete','erasePicture','Game_Battler_requestMotionRefresh','refreshMotion','scaleY','setLastPluginCommandInterpreter','_enemy','performAction','nejrP','opacity','findTargetSprite','Loader','Game_Enemy_performDamage','DNYWX','updateDragonbones','addDragonbonesAnimationDirections','Game_Battler_performActionEndMembers','refresh','map','vemfj','dragonbonesAnimation','_dragonbonesMoveTimer','shift','xDZQS','_scene','showPicture','animation','description','updateBitmap','loadArmature','hasDragonbones','idle','OBliD','BattleManager_onEscapeFailure','isOnRope','xEzxt','vcTyO','flipLeft','ropeidle','find','MotionDying','MotionThrust','updateDragonbonesSelection','MhfPg','isAttack','nkxgi','MotionEvade','width','terminate','prepareNextLoadArmature','Game_Enemy_setup','testArmature','pNJFO','performDamageDragonbonesUnion','EventID','isSkill','525314vaGXid','FlipLeft','IdleBypassList','mVdPQ','test','FlZGB','sleep','prototype','removeChild','aiugg','isItem','General','MotionSkill','9631265ZnVusY','_dragonbonesSpriteData','return\x200','Sprite_Picture_update','_escaped','QyHaN','LoadedFilenames','setupDragonbonesDataCommentTags','battler','_dragonbones','requestMotion','FlipEnemies','scale','performCollapseDragonbonesUnion','Sprite_Actor_updateShadow','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_dragonbonesData','yWqJs','ZHxKh','Game_Screen_erasePicture','Jump','MotionChant','constructor','attachSpritesToDistortionSprite','note','JSON','setFrame','ARRAYSTR','scaleX','UHPvY','ladderclimb','status','rKldl','addChild','Width','_battler','_dragonbonesBattlerData','ibqgd','mbSER','playDragonbonesIdleAnimation','XXAzJ','MotionGuard','FUNC'];_0x4f00=function(){return _0x7e9ba;};return _0x4f00();}(function(_0xb19386,_0x2ef2ba){const _0x586caf=_0x4345,_0x251e5b=_0xb19386();while(!![]){try{const _0x2ec2d1=-parseInt(_0x586caf(0x24a))/0x1+parseInt(_0x586caf(0x2b1))/0x2*(parseInt(_0x586caf(0x222))/0x3)+parseInt(_0x586caf(0x259))/0x4*(parseInt(_0x586caf(0x1ec))/0x5)+-parseInt(_0x586caf(0x113))/0x6+-parseInt(_0x586caf(0x2be))/0x7+parseInt(_0x586caf(0x12e))/0x8*(parseInt(_0x586caf(0x152))/0x9)+-parseInt(_0x586caf(0x25c))/0xa*(-parseInt(_0x586caf(0x273))/0xb);if(_0x2ec2d1===_0x2ef2ba)break;else _0x251e5b['push'](_0x251e5b['shift']());}catch(_0x5b74ce){_0x251e5b['push'](_0x251e5b['shift']());}}}(_0x4f00,0xb0d60));var label=_0x41a585(0x15e),tier=tier||0x0,dependencies=['Dragonbones'],pluginData=$plugins[_0x41a585(0x264)](function(_0x32aa06){const _0x37926c=_0x41a585;return _0x32aa06[_0x37926c(0x105)]&&_0x32aa06[_0x37926c(0x294)][_0x37926c(0x1ed)]('['+label+']');})[0x0];VisuMZ[label][_0x41a585(0x1db)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x41a585(0x1c5)]=function(_0x231c84,_0x40f947){const _0x3bacb7=_0x41a585;for(const _0x126bdf in _0x40f947){if(_0x3bacb7(0x138)===_0x3bacb7(0x138)){if(_0x126bdf[_0x3bacb7(0x1ee)](/(.*):(.*)/i)){const _0x355a55=String(RegExp['$1']),_0x39ecd1=String(RegExp['$2'])[_0x3bacb7(0x15a)]()[_0x3bacb7(0x26d)]();let _0x1512c1,_0x1c898d,_0x35579b;switch(_0x39ecd1){case'NUM':_0x1512c1=_0x40f947[_0x126bdf]!==''?Number(_0x40f947[_0x126bdf]):0x0;break;case _0x3bacb7(0x15d):_0x1c898d=_0x40f947[_0x126bdf]!==''?JSON[_0x3bacb7(0x1e7)](_0x40f947[_0x126bdf]):[],_0x1512c1=_0x1c898d[_0x3bacb7(0x28b)](_0x338691=>Number(_0x338691));break;case _0x3bacb7(0x12a):_0x1512c1=_0x40f947[_0x126bdf]!==''?eval(_0x40f947[_0x126bdf]):null;break;case _0x3bacb7(0x251):_0x1c898d=_0x40f947[_0x126bdf]!==''?JSON['parse'](_0x40f947[_0x126bdf]):[],_0x1512c1=_0x1c898d['map'](_0x110b05=>eval(_0x110b05));break;case _0x3bacb7(0xff):_0x1512c1=_0x40f947[_0x126bdf]!==''?JSON[_0x3bacb7(0x1e7)](_0x40f947[_0x126bdf]):'';break;case _0x3bacb7(0x168):_0x1c898d=_0x40f947[_0x126bdf]!==''?JSON[_0x3bacb7(0x1e7)](_0x40f947[_0x126bdf]):[],_0x1512c1=_0x1c898d[_0x3bacb7(0x28b)](_0x13ee48=>JSON['parse'](_0x13ee48));break;case _0x3bacb7(0x110):_0x1512c1=_0x40f947[_0x126bdf]!==''?new Function(JSON['parse'](_0x40f947[_0x126bdf])):new Function(_0x3bacb7(0x2c0));break;case _0x3bacb7(0x1f3):_0x1c898d=_0x40f947[_0x126bdf]!==''?JSON[_0x3bacb7(0x1e7)](_0x40f947[_0x126bdf]):[],_0x1512c1=_0x1c898d['map'](_0x5cc1f3=>new Function(JSON[_0x3bacb7(0x1e7)](_0x5cc1f3)));break;case _0x3bacb7(0x144):_0x1512c1=_0x40f947[_0x126bdf]!==''?String(_0x40f947[_0x126bdf]):'';break;case _0x3bacb7(0x101):_0x1c898d=_0x40f947[_0x126bdf]!==''?JSON[_0x3bacb7(0x1e7)](_0x40f947[_0x126bdf]):[],_0x1512c1=_0x1c898d[_0x3bacb7(0x28b)](_0x22434c=>String(_0x22434c));break;case'STRUCT':_0x35579b=_0x40f947[_0x126bdf]!==''?JSON[_0x3bacb7(0x1e7)](_0x40f947[_0x126bdf]):{},_0x1512c1=VisuMZ[_0x3bacb7(0x1c5)]({},_0x35579b);break;case'ARRAYSTRUCT':_0x1c898d=_0x40f947[_0x126bdf]!==''?JSON['parse'](_0x40f947[_0x126bdf]):[],_0x1512c1=_0x1c898d[_0x3bacb7(0x28b)](_0x958a5=>VisuMZ[_0x3bacb7(0x1c5)]({},JSON[_0x3bacb7(0x1e7)](_0x958a5)));break;default:continue;}_0x231c84[_0x355a55]=_0x1512c1;}}else this[_0x3bacb7(0x248)](_0x3bacb7(0x20d));}return _0x231c84;},(_0x4ab78f=>{const _0x578f40=_0x41a585,_0x5677f2=_0x4ab78f['name'];for(const _0x4e7e3d of dependencies){if(!Imported[_0x4e7e3d]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x578f40(0x177)](_0x5677f2,_0x4e7e3d)),SceneManager[_0x578f40(0x1dd)]();break;}}const _0x81d7f7=_0x4ab78f[_0x578f40(0x294)];if(_0x81d7f7[_0x578f40(0x1ee)](/\[Version[ ](.*?)\]/i)){const _0x2e31b9=Number(RegExp['$1']);_0x2e31b9!==VisuMZ[label]['version']&&(alert(_0x578f40(0x1ca)[_0x578f40(0x177)](_0x5677f2,_0x2e31b9)),SceneManager[_0x578f40(0x1dd)]());}if(_0x81d7f7[_0x578f40(0x1ee)](/\[Tier[ ](\d+)\]/i)){if(_0x578f40(0x274)!==_0x578f40(0x274))_0x15d54e['scaleX']=_0x41dd5b(_0x97d64c['$1']),_0x52bcd7[_0x578f40(0x27d)]=_0x23efb7(_0x5ad52b['$2']);else{const _0x267d1a=Number(RegExp['$1']);_0x267d1a<tier?(alert(_0x578f40(0xf5)[_0x578f40(0x177)](_0x5677f2,_0x267d1a,tier)),SceneManager[_0x578f40(0x1dd)]()):tier=Math[_0x578f40(0x208)](_0x267d1a,tier);}}VisuMZ['ConvertParams'](VisuMZ[label][_0x578f40(0x1db)],_0x4ab78f['parameters']);})(pluginData);function _0x4345(_0x21079f,_0x5ab698){const _0x4f00b8=_0x4f00();return _0x4345=function(_0x434598,_0xfe9d21){_0x434598=_0x434598-0xed;let _0x27c04f=_0x4f00b8[_0x434598];return _0x27c04f;},_0x4345(_0x21079f,_0x5ab698);}function DragonbonesManager(){throw new Error('This\x20is\x20a\x20static\x20class');}DragonbonesManager[_0x41a585(0x23b)]=VisuMZ[_0x41a585(0x15e)][_0x41a585(0x1db)][_0x41a585(0x23b)],DragonbonesManager[_0x41a585(0x118)]=VisuMZ[_0x41a585(0x15e)][_0x41a585(0x1db)]['General'][_0x41a585(0x250)],DragonbonesManager[_0x41a585(0x2c4)]=[],DragonbonesManager[_0x41a585(0x124)]=[],DragonbonesManager[_0x41a585(0x23f)]=[],DragonbonesManager[_0x41a585(0x2b5)]=function(_0x557e11,_0x4b7ac8,_0x3e9122,_0x670989){const _0x405b5e=_0x41a585;if(!_0x3e9122)_0x3e9122=SceneManager['_scene'];if(!_0x670989)_0x670989=_0x405b5e(0x2ac);if(_0x3e9122[_0x670989]){const _0x46a3b9=_0x3e9122[_0x670989];_0x46a3b9&&(_0x405b5e(0x1cc)==='VpFmh'?(_0x3e9122[_0x405b5e(0x2b9)](_0x46a3b9),_0x46a3b9[_0x405b5e(0x228)]()):this[_0x405b5e(0x28e)]--);}this[_0x405b5e(0x296)](_0x557e11,DragonbonesManager['testLoaded'][_0x405b5e(0x1d8)](this,_0x557e11,_0x4b7ac8,_0x3e9122,_0x670989));},DragonbonesManager[_0x41a585(0x23d)]=function(_0x28d5fa,_0x2f5d19,_0x4500b6,_0x9ed90){const _0x21c24a=_0x41a585,_0x2518e4=this['createArmature'](_0x28d5fa);_0x2518e4&&(_0x4500b6[_0x21c24a(0x107)](_0x2518e4),_0x2518e4['x']=Graphics[_0x21c24a(0x2a8)]/0x2,_0x2518e4['y']=Graphics[_0x21c24a(0x13d)]*0x3/0x4,_0x2f5d19=_0x2f5d19||DragonbonesManager[_0x21c24a(0x118)],_0x2f5d19=_0x2f5d19[_0x21c24a(0x193)](),_0x2518e4['animation'][_0x21c24a(0x172)][_0x2f5d19]&&_0x2518e4[_0x21c24a(0x293)][_0x21c24a(0x260)](_0x2f5d19)),_0x4500b6[_0x9ed90]=_0x2518e4;},DragonbonesManager[_0x41a585(0x148)]=function(_0x409f73){const _0x8ca8b1=_0x41a585,_0x512415=dragonBones[_0x8ca8b1(0x160)][_0x8ca8b1(0x194)][_0x8ca8b1(0x14f)](_0x409f73);if(!_0x512415)return null;for(const _0x3ab267 in _0x512415['animation'][_0x8ca8b1(0x172)]){if(_0x3ab267['toLowerCase']()===_0x3ab267)continue;_0x512415[_0x8ca8b1(0x293)][_0x8ca8b1(0x172)][_0x3ab267[_0x8ca8b1(0x193)]()]=_0x512415[_0x8ca8b1(0x293)][_0x8ca8b1(0x172)][_0x3ab267],delete _0x512415[_0x8ca8b1(0x293)][_0x8ca8b1(0x172)][_0x3ab267];}for(let _0x593908=0x0;_0x593908<_0x512415[_0x8ca8b1(0x293)][_0x8ca8b1(0x23c)]['length'];_0x593908++){if(_0x8ca8b1(0x156)===_0x8ca8b1(0x156))_0x512415['animation'][_0x8ca8b1(0x23c)][_0x593908]=_0x512415[_0x8ca8b1(0x293)][_0x8ca8b1(0x23c)][_0x593908]['toLowerCase']();else{const _0x4b3a3a=this[_0x8ca8b1(0x181)][_0x8ca8b1(0x1a9)]();this[_0x8ca8b1(0x232)]=this[_0x8ca8b1(0x232)]||0x1;if(_0x4b3a3a[_0x8ca8b1(0x29e)]&&[0x1,0x4,0x7][_0x8ca8b1(0x1ed)](this['_character'][_0x8ca8b1(0x231)]()))this[_0x8ca8b1(0x232)]=-0x1;else{if(_0x4b3a3a[_0x8ca8b1(0x15c)]&&[0x9,0x6,0x3][_0x8ca8b1(0x1ed)](this[_0x8ca8b1(0x181)][_0x8ca8b1(0x231)]()))this[_0x8ca8b1(0x232)]=-0x1;else![0x8,0x2][_0x8ca8b1(0x1ed)](this[_0x8ca8b1(0x181)]['direction']())&&(this[_0x8ca8b1(0x232)]=0x1);}return this[_0x8ca8b1(0x232)];}}const _0x40ffee=VisuMZ[_0x8ca8b1(0x15e)]['Settings'][_0x8ca8b1(0x2bc)][_0x8ca8b1(0x1b0)];for(let _0x4d2590 of _0x40ffee){_0x4d2590=_0x4d2590[_0x8ca8b1(0x193)]()[_0x8ca8b1(0x26d)]();_0x512415[_0x8ca8b1(0x293)][_0x8ca8b1(0x172)][_0x4d2590]&&(_0x512415[_0x8ca8b1(0x293)][_0x8ca8b1(0x172)][_0x4d2590][_0x8ca8b1(0x267)]=0x0);for(let _0x43f6f6=0x1;_0x43f6f6<=0x9;_0x43f6f6++){const _0x55ab81=_0x4d2590+_0x43f6f6;_0x512415[_0x8ca8b1(0x293)][_0x8ca8b1(0x172)][_0x55ab81]&&(_0x8ca8b1(0x1a6)===_0x8ca8b1(0x1a6)?_0x512415[_0x8ca8b1(0x293)]['animations'][_0x55ab81][_0x8ca8b1(0x267)]=0x0:this[_0x8ca8b1(0xee)]()['playDragonbonesMotion'](_0x146ca3));}}return _0x512415[_0x8ca8b1(0x293)]['animations'][DragonbonesManager['DefaultAnimation']]&&('nzCMM'!=='nzCMM'?(_0x232df6[_0x8ca8b1(0x15e)][_0x8ca8b1(0x243)][_0x8ca8b1(0x13c)](this),this['setupDragonbonesData']()):_0x512415[_0x8ca8b1(0x293)]['play'](DragonbonesManager[_0x8ca8b1(0x118)])),_0x512415;},DragonbonesManager[_0x41a585(0x296)]=function(_0x3b7135,_0x5e8981){const _0x29c5fa=_0x41a585;_0x3b7135=_0x3b7135[_0x29c5fa(0x26d)](),DragonbonesManager[_0x29c5fa(0x124)][_0x29c5fa(0x132)](_0x3b7135),DragonbonesManager[_0x29c5fa(0x23f)][_0x29c5fa(0x132)](_0x5e8981);const _0x4f5862=PIXI[_0x29c5fa(0x284)][_0x29c5fa(0x147)];!_0x4f5862['loading']&&this['loadNextArmature']();},DragonbonesManager['loadNextArmature']=function(){const _0x73fee3=_0x41a585;DragonbonesManager[_0x73fee3(0x124)][_0x73fee3(0x154)]>0x0?this[_0x73fee3(0x2aa)]():this['runQueuedCallbacks']();},DragonbonesManager[_0x41a585(0x2aa)]=function(){const _0xedb80c=_0x41a585,_0x50400c=DragonbonesManager[_0xedb80c(0x124)]['shift']();if(this[_0xedb80c(0x2c4)][_0xedb80c(0x1ed)](_0x50400c))this['loadNextArmature']();else!this[_0xedb80c(0x2c4)][_0xedb80c(0x1ed)](_0x50400c)&&this[_0xedb80c(0x178)](_0x50400c);},DragonbonesManager['processLoad']=function(_0xcab536){const _0x4b9904=_0x41a585,_0xe83e87=PIXI['VERSION']>='5.3.12';this[_0x4b9904(0x2c4)][_0x4b9904(0x132)](_0xcab536),this['lastFileName']=_0xcab536;const _0x3452c6=VisuMZ[_0x4b9904(0x15e)][_0x4b9904(0x1db)][_0x4b9904(0x2bc)],_0x57571e=DragonbonesManager[_0x4b9904(0x23b)],_0x15485e=PIXI[_0x4b9904(0x284)]['shared'];_0x15485e[_0x4b9904(0x1c1)](_0xcab536+_0x3452c6[_0x4b9904(0x126)],_0x57571e+_0xcab536+_0x3452c6[_0x4b9904(0x1ef)]),_0x15485e[_0x4b9904(0x1c1)](_0xcab536+_0x3452c6[_0x4b9904(0x1f7)],_0x57571e+_0xcab536+_0x3452c6[_0x4b9904(0x1f4)]),_0x15485e[_0x4b9904(0x1c1)](_0xcab536+_0x3452c6[_0x4b9904(0x275)],_0x57571e+_0xcab536+_0x3452c6[_0x4b9904(0x1d5)]),_0xe83e87?'TDhRC'!=='TDhRC'?(_0x202990[_0x4b9904(0x15e)][_0x4b9904(0x19b)][_0x4b9904(0x13c)](this),this['performCollapseDragonbonesUnion']()):(_0x15485e[_0x4b9904(0x21e)](_0x15485e),_0x15485e['onComplete'][_0x4b9904(0x180)](()=>DragonbonesManager[_0x4b9904(0x1d1)](_0x15485e,_0x15485e[_0x4b9904(0x17d)]))):(_0x15485e[_0x4b9904(0x180)](_0x4b9904(0x279),DragonbonesManager['loadComplete'],this),_0x15485e['load']());},DragonbonesManager['loadComplete']=function(_0x118661,_0x24b1ee){const _0x4c2c7c=_0x41a585,_0x5f17e8=VisuMZ[_0x4c2c7c(0x15e)]['Settings'][_0x4c2c7c(0x2bc)],_0x3f907a=this[_0x4c2c7c(0x20b)],_0x34add2=dragonBones[_0x4c2c7c(0x160)][_0x4c2c7c(0x194)];_0x34add2['parseDragonBonesData'](_0x24b1ee[_0x3f907a+_0x5f17e8[_0x4c2c7c(0x126)]][_0x4c2c7c(0x1ad)]),_0x34add2[_0x4c2c7c(0x133)](_0x24b1ee[_0x3f907a+_0x5f17e8[_0x4c2c7c(0x1f7)]][_0x4c2c7c(0x1ad)],_0x24b1ee[_0x3f907a+_0x5f17e8[_0x4c2c7c(0x275)]][_0x4c2c7c(0x163)]),this[_0x4c2c7c(0x1f8)]();},DragonbonesManager[_0x41a585(0x18d)]=function(){const _0x139132=_0x41a585;while(DragonbonesManager['CallbackQueue'][_0x139132(0x154)]>0x0){const _0x3d78e3=DragonbonesManager[_0x139132(0x23f)][_0x139132(0x28f)]();if(_0x3d78e3)_0x3d78e3(this);}},PluginManager[_0x41a585(0x218)](pluginData['name'],_0x41a585(0x1c9),_0x17d289=>{const _0x4e267d=_0x41a585;if(!$gameMap)return;VisuMZ['ConvertParams'](_0x17d289,_0x17d289);const _0x20b13c=$gameActors[_0x4e267d(0x21d)](_0x17d289[_0x4e267d(0x1e1)]);if(!_0x20b13c)return;_0x20b13c['_dragonbonesBattlerData']={'battler':_0x17d289[_0x4e267d(0x191)],'scaleX':_0x17d289[_0x4e267d(0x1a4)],'scaleY':_0x17d289[_0x4e267d(0x18e)],'offsetX':_0x17d289[_0x4e267d(0x197)],'offsetY':_0x17d289[_0x4e267d(0x277)],'timeScale':_0x17d289[_0x4e267d(0x192)],'width':_0x17d289[_0x4e267d(0x108)],'height':_0x17d289[_0x4e267d(0x130)],'motion':{'walk':_0x17d289[_0x4e267d(0x1bb)],'wait':_0x17d289[_0x4e267d(0x269)],'chant':_0x17d289[_0x4e267d(0xfb)],'guard':_0x17d289['MotionGuard'],'damage':_0x17d289[_0x4e267d(0x13b)],'evade':_0x17d289['MotionEvade'],'thrust':_0x17d289['MotionThrust'],'swing':_0x17d289[_0x4e267d(0x167)],'missile':_0x17d289[_0x4e267d(0x249)],'skill':_0x17d289['MotionSkill'],'spell':_0x17d289['MotionSpell'],'item':_0x17d289[_0x4e267d(0x115)],'escape':_0x17d289[_0x4e267d(0x246)],'victory':_0x17d289['MotionVictory'],'dying':_0x17d289[_0x4e267d(0x2a1)],'abnormal':_0x17d289['MotionAbnormal'],'sleep':_0x17d289[_0x4e267d(0x1fe)],'dead':_0x17d289['MotionDead']}};}),SceneManager['isSceneBattle']=function(){const _0x14f50b=_0x41a585;return this['_scene']&&this[_0x14f50b(0x291)][_0x14f50b(0xfc)]===Scene_Battle;},SceneManager[_0x41a585(0x1bd)]=function(){const _0x19c78e=_0x41a585;return this[_0x19c78e(0x291)]&&this[_0x19c78e(0x291)][_0x19c78e(0xfc)]===Scene_Map;},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x1cb)]=BattleManager['processEscape'],BattleManager[_0x41a585(0x121)]=function(){const _0x2fbdb7=_0x41a585;this[_0x2fbdb7(0x11e)]=!![],VisuMZ['DragonbonesUnion'][_0x2fbdb7(0x1cb)][_0x2fbdb7(0x13c)](this);},VisuMZ['DragonbonesUnion'][_0x41a585(0x29a)]=BattleManager[_0x41a585(0x217)],BattleManager[_0x41a585(0x217)]=function(){const _0x1efdbe=_0x41a585;VisuMZ[_0x1efdbe(0x15e)][_0x1efdbe(0x29a)]['call'](this),setTimeout(this['clearTryEscaping'][_0x1efdbe(0x1d8)](this),0x1f4);},BattleManager['clearTryEscaping']=function(){this['_escaping']=![];},VisuMZ['DragonbonesUnion'][_0x41a585(0x265)]=BattleManager[_0x41a585(0x210)],BattleManager[_0x41a585(0x210)]=function(_0xd9df8c){const _0x2dfea4=_0x41a585;this[_0x2dfea4(0x11e)]=![],VisuMZ['DragonbonesUnion'][_0x2dfea4(0x265)][_0x2dfea4(0x13c)](this,_0xd9df8c);},BattleManager[_0x41a585(0x146)]=function(){const _0x12adf5=_0x41a585;return this['_escaping']||this[_0x12adf5(0x2c2)];},Game_BattlerBase[_0x41a585(0x2b8)]['battler']=function(){const _0x187078=_0x41a585;if(!SceneManager[_0x187078(0x190)]())return null;if(!SceneManager[_0x187078(0x291)]['_spriteset'])return null;return SceneManager[_0x187078(0x291)]['_spriteset'][_0x187078(0x283)](this);},Game_BattlerBase[_0x41a585(0x2b8)]['initDragonbonesData']=function(){const _0x569bf5=_0x41a585,_0x48133f=VisuMZ[_0x569bf5(0x15e)][_0x569bf5(0x1db)][_0x569bf5(0x24d)];this[_0x569bf5(0x10a)]={'battler':'','scaleX':_0x48133f[_0x569bf5(0x1a4)],'scaleY':_0x48133f[_0x569bf5(0x18e)],'width':_0x48133f[_0x569bf5(0x108)],'height':_0x48133f[_0x569bf5(0x130)],'offsetX':_0x48133f[_0x569bf5(0x197)],'offsetY':_0x48133f['OffsetY'],'timeScale':_0x48133f[_0x569bf5(0x192)],'motion':{'walk':_0x48133f[_0x569bf5(0x1bb)],'wait':_0x48133f[_0x569bf5(0x269)],'chant':_0x48133f[_0x569bf5(0xfb)],'guard':_0x48133f[_0x569bf5(0x10f)],'damage':_0x48133f[_0x569bf5(0x13b)],'evade':_0x48133f[_0x569bf5(0x2a7)],'thrust':_0x48133f[_0x569bf5(0x2a2)],'swing':_0x48133f[_0x569bf5(0x167)],'missile':_0x48133f[_0x569bf5(0x249)],'skill':_0x48133f[_0x569bf5(0x2bd)],'spell':_0x48133f['MotionSpell'],'item':_0x48133f[_0x569bf5(0x115)],'escape':_0x48133f[_0x569bf5(0x246)],'victory':_0x48133f[_0x569bf5(0x1ac)],'dying':_0x48133f[_0x569bf5(0x2a1)],'abnormal':_0x48133f['MotionAbnormal'],'sleep':_0x48133f[_0x569bf5(0x1fe)],'dead':_0x48133f[_0x569bf5(0x1df)]}};if(_0x48133f['FlipActors']&&this[_0x569bf5(0x229)]())this[_0x569bf5(0x10a)][_0x569bf5(0x102)]*=-0x1;if(_0x48133f[_0x569bf5(0xf1)]&&this[_0x569bf5(0x189)]())this[_0x569bf5(0x10a)][_0x569bf5(0x102)]*=-0x1;},Game_BattlerBase[_0x41a585(0x2b8)][_0x41a585(0x1c7)]=function(){const _0x58273b=_0x41a585,_0x31f831=VisuMZ[_0x58273b(0x15e)][_0x58273b(0x1db)][_0x58273b(0x24d)],_0x18cafe=(this[_0x58273b(0x229)]()?this[_0x58273b(0x21d)]():this[_0x58273b(0x14c)]())[_0x58273b(0xfe)],_0x348bff=this[_0x58273b(0x16c)]();_0x18cafe[_0x58273b(0x1ee)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:BATTLER|SKIN|NAME):[ ]*(.*)>/i)&&(_0x348bff[_0x58273b(0xee)]=String(RegExp['$1'])[_0x58273b(0x26d)]());_0x18cafe[_0x58273b(0x1ee)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER):[ ]*(.*)>/i)&&(_0x58273b(0x120)!==_0x58273b(0x120)?(_0x1a65ae[_0x58273b(0x15e)][_0x58273b(0x24e)]['call'](this),this['initMembersDragonbonesUnion']()):_0x348bff[_0x58273b(0xee)]=String(RegExp['$1'])[_0x58273b(0x26d)]());_0x18cafe[_0x58273b(0x1ee)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]SCALE:[ ](.*),[ ](.*)>/i)&&(_0x348bff[_0x58273b(0x102)]=Number(RegExp['$1']),_0x348bff[_0x58273b(0x27d)]=Number(RegExp['$2']));_0x18cafe['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:SCALEX|SCALE X):[ ](.*)>/i)&&(_0x348bff[_0x58273b(0x102)]=Number(RegExp['$1']));_0x18cafe[_0x58273b(0x1ee)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]SCALEY:[ ](.*)>/i)&&(_0x58273b(0x219)!==_0x58273b(0x219)?_0x4f5430[_0x58273b(0x124)][_0x58273b(0x154)]>0x0?this[_0x58273b(0x2aa)]():this['runQueuedCallbacks']():_0x348bff[_0x58273b(0x27d)]=Number(RegExp['$1']));_0x18cafe[_0x58273b(0x1ee)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]OFFSET:[ ](.*),[ ](.*)>/i)&&(_0x348bff[_0x58273b(0x252)]=Number(RegExp['$1']),_0x348bff[_0x58273b(0x244)]=Number(RegExp['$2']));_0x18cafe[_0x58273b(0x1ee)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:OFFSETX|OFFSET X):[ ](.*)>/i)&&(_0x58273b(0x1e0)==='wbwRL'?_0x348bff[_0x58273b(0x252)]=Number(RegExp['$1']):this['playDragonbonesMotion'](_0x58273b(0x298)));_0x18cafe[_0x58273b(0x1ee)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:OFFSETY|OFFSET Y):[ ](.*)>/i)&&(_0x348bff['offsetY']=Number(RegExp['$1']));_0x18cafe[_0x58273b(0x1ee)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:TIMESCALE|TIME SCALE):[ ](.*)>/i)&&(_0x348bff['timeScale']=Number(RegExp['$1']));_0x18cafe[_0x58273b(0x1ee)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]SIZE:[ ](.*),[ ](.*)>/i)&&('nAJUh'==='KRwGO'?(this[_0x58273b(0x11e)]=!![],_0x9a434b['DragonbonesUnion'][_0x58273b(0x1cb)]['call'](this)):(_0x348bff['width']=Number(RegExp['$1']),_0x348bff[_0x58273b(0x13d)]=Number(RegExp['$2'])));if(_0x18cafe[_0x58273b(0x1ee)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]WIDTH:[ ](.*)>/i)){if('fzToA'!=='EqCWl')_0x348bff['width']=Number(RegExp['$1']);else{const _0x28e5e8=_0xbb3761[_0x58273b(0x15e)]['Settings']['Battler'];this['_dragonbonesBattlerData']={'battler':'','scaleX':_0x28e5e8[_0x58273b(0x1a4)],'scaleY':_0x28e5e8[_0x58273b(0x18e)],'width':_0x28e5e8[_0x58273b(0x108)],'height':_0x28e5e8[_0x58273b(0x130)],'offsetX':_0x28e5e8[_0x58273b(0x197)],'offsetY':_0x28e5e8[_0x58273b(0x277)],'timeScale':_0x28e5e8['TimeScale'],'motion':{'walk':_0x28e5e8[_0x58273b(0x1bb)],'wait':_0x28e5e8[_0x58273b(0x269)],'chant':_0x28e5e8[_0x58273b(0xfb)],'guard':_0x28e5e8[_0x58273b(0x10f)],'damage':_0x28e5e8['MotionDamage'],'evade':_0x28e5e8[_0x58273b(0x2a7)],'thrust':_0x28e5e8[_0x58273b(0x2a2)],'swing':_0x28e5e8[_0x58273b(0x167)],'missile':_0x28e5e8['MotionMissile'],'skill':_0x28e5e8[_0x58273b(0x2bd)],'spell':_0x28e5e8[_0x58273b(0x1dc)],'item':_0x28e5e8[_0x58273b(0x115)],'escape':_0x28e5e8['MotionEscape'],'victory':_0x28e5e8[_0x58273b(0x1ac)],'dying':_0x28e5e8['MotionDying'],'abnormal':_0x28e5e8['MotionAbnormal'],'sleep':_0x28e5e8[_0x58273b(0x1fe)],'dead':_0x28e5e8['MotionDead']}};if(_0x28e5e8[_0x58273b(0x185)]&&this[_0x58273b(0x229)]())this[_0x58273b(0x10a)][_0x58273b(0x102)]*=-0x1;if(_0x28e5e8[_0x58273b(0xf1)]&&this[_0x58273b(0x189)]())this[_0x58273b(0x10a)][_0x58273b(0x102)]*=-0x1;}}_0x18cafe[_0x58273b(0x1ee)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]HEIGHT:[ ](.*)>/i)&&(_0x348bff['height']=Number(RegExp['$1']));const _0x14fbbe=_0x18cafe['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:ANI|MOTION)[ ](.*):[ ](.*)>/gi);if(_0x14fbbe)for(const _0x11df61 of _0x14fbbe){_0x11df61[_0x58273b(0x1ee)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:ANI|MOTION)[ ](.*):[ ](.*)>/i);const _0x11bbb1=String(RegExp['$1'])[_0x58273b(0x193)]()[_0x58273b(0x26d)](),_0x50f9e2=String(RegExp['$2'])[_0x58273b(0x26d)]();_0x348bff['motion'][_0x11bbb1]=_0x50f9e2;}if(_0x18cafe[_0x58273b(0x1ee)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER) (?:SETTINGS|SETTING)>\s*([\s\S]*)\s*<\/(?:DB|DRAGONBONE|DRAGONBONES BATTLER) (?:SETTINGS|SETTING)>/i)){const _0x4d6cf5=String(RegExp['$1']);_0x4d6cf5[_0x58273b(0x1ee)](/(?:BATTLER|SKIN|NAME|FILENAME):[ ]*(.*)/i)&&(_0x348bff[_0x58273b(0xee)]=String(RegExp['$1'])[_0x58273b(0x26d)]());_0x4d6cf5[_0x58273b(0x1ee)](/SCALE:[ ](.*),[ ](.*)/i)&&(_0x348bff[_0x58273b(0x102)]=Number(RegExp['$1']),_0x348bff[_0x58273b(0x27d)]=Number(RegExp['$2']));if(_0x4d6cf5[_0x58273b(0x1ee)](/(?:SCALEX|SCALE X):[ ](.*)/i)){if(_0x58273b(0x1a3)===_0x58273b(0x1a3))_0x348bff[_0x58273b(0x102)]=Number(RegExp['$1']);else{const _0x1fb43a=this[_0x58273b(0xef)][_0x58273b(0x293)];if(_0x1fb43a&&!_0x1fb43a[_0x58273b(0x233)])return;}}_0x4d6cf5[_0x58273b(0x1ee)](/(?:SCALEY|SCALE Y):[ ](.*)/i)&&(_0x58273b(0x128)!==_0x58273b(0x128)?_0x41d186['animation']='idle':_0x348bff[_0x58273b(0x27d)]=Number(RegExp['$1']));_0x4d6cf5[_0x58273b(0x1ee)](/OFFSET:[ ](.*),[ ](.*)/i)&&(_0x348bff['offsetX']=Number(RegExp['$1']),_0x348bff[_0x58273b(0x244)]=Number(RegExp['$2']));_0x4d6cf5['match'](/(?:OFFSETX|OFFSET X):[ ](.*)/i)&&(_0x348bff[_0x58273b(0x252)]=Number(RegExp['$1']));_0x4d6cf5[_0x58273b(0x1ee)](/(?:OFFSETY|OFFSET Y):[ ](.*)/i)&&(_0x58273b(0x236)===_0x58273b(0x24b)?this[_0x58273b(0x1e5)]=!![]:_0x348bff[_0x58273b(0x244)]=Number(RegExp['$1']));_0x4d6cf5[_0x58273b(0x1ee)](/(?:TIMESCALE|TIME SCALE):[ ](.*)/i)&&(_0x348bff[_0x58273b(0x131)]=Number(RegExp['$1']));_0x4d6cf5[_0x58273b(0x1ee)](/SIZE:[ ](.*),[ ](.*)/i)&&(_0x348bff[_0x58273b(0x2a8)]=Number(RegExp['$1']),_0x348bff[_0x58273b(0x13d)]=Number(RegExp['$2']));_0x4d6cf5['match'](/WIDTH:[ ](.*)/i)&&(_0x348bff[_0x58273b(0x2a8)]=Number(RegExp['$1']));if(_0x4d6cf5['match'](/HEIGHT:[ ](.*)/i)){if('ualnp'!==_0x58273b(0x10b))_0x348bff['height']=Number(RegExp['$1']);else{if(!_0x18ff2e)return;_0x45fe6d[_0x58273b(0x1c5)](_0x34a316,_0x441172),_0x2dc3d5[_0x58273b(0x141)](_0x2a932b['PictureID']);const _0x7016f5=_0x47b388['picture'](_0x99a2d9[_0x58273b(0x257)]),_0xd8dd58=_0x7016f5[_0x58273b(0x16c)]();_0xd8dd58[_0x58273b(0x131)]=_0x2c45f5['TimeScale'];}}const _0x2cddc5=_0x4d6cf5[_0x58273b(0x1ee)](/(?:ANI|MOTION)[ ](.*):[ ](.*)/gi);if(_0x2cddc5){if(_0x58273b(0x13f)==='ofevr')for(const _0x32158d of _0x2cddc5){_0x32158d[_0x58273b(0x1ee)](/(?:ANI|MOTION)[ ](.*):[ ](.*)/i);const _0x2c31ce=String(RegExp['$1'])['toLowerCase']()[_0x58273b(0x26d)](),_0x4f4b80=String(RegExp['$2'])[_0x58273b(0x26d)]();_0x348bff['motion'][_0x2c31ce]=_0x4f4b80;}else{_0x276edc[_0x58273b(0x2b8)]['setupDragonbonesData'][_0x58273b(0x13c)](this);const _0x513303=this[_0x58273b(0x21d)]()[_0x58273b(0xfe)];_0x31bf8d[_0x58273b(0x2b8)][_0x58273b(0x16b)][_0x58273b(0x13c)](this,_0x513303);}}}if(_0x31f831[_0x58273b(0x185)]&&this[_0x58273b(0x229)]())_0x348bff['scaleX']*=-0x1;if(_0x31f831[_0x58273b(0xf1)]&&this[_0x58273b(0x189)]())_0x348bff[_0x58273b(0x102)]*=-0x1;},Game_BattlerBase['prototype'][_0x41a585(0x16c)]=function(){const _0x41e183=_0x41a585;if(this['_dragonbonesBattlerData']!==undefined)return this[_0x41e183(0x10a)];return this[_0x41e183(0x227)](),this[_0x41e183(0x1c7)](),this[_0x41e183(0x10a)];},Game_BattlerBase[_0x41a585(0x2b8)][_0x41a585(0x24f)]=function(){const _0x576f97=_0x41a585;return this[_0x576f97(0xee)]()&&this[_0x576f97(0x16c)]()[_0x576f97(0xee)]!=='';},VisuMZ['DragonbonesUnion'][_0x41a585(0x17a)]=Game_Battler[_0x41a585(0x2b8)][_0x41a585(0xf0)],Game_Battler[_0x41a585(0x2b8)]['requestMotion']=function(_0x41f8db){const _0x149e23=_0x41a585;VisuMZ[_0x149e23(0x15e)][_0x149e23(0x17a)][_0x149e23(0x13c)](this,_0x41f8db),this['hasDragonbonesBattler']()&&(_0x149e23(0x2b6)===_0x149e23(0x2b6)?this[_0x149e23(0xee)]()['playDragonbonesMotion'](_0x41f8db):_0x3e9ed2[_0x149e23(0x102)]=_0x209049(_0x2221f6['$1']));},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x27b)]=Game_Battler[_0x41a585(0x2b8)]['requestMotionRefresh'],Game_Battler[_0x41a585(0x2b8)][_0x41a585(0x16a)]=function(){const _0x118361=_0x41a585;VisuMZ[_0x118361(0x15e)][_0x118361(0x27b)][_0x118361(0x13c)](this),this[_0x118361(0x24f)]()&&this['battler']()[_0x118361(0x10d)]();},Game_Battler[_0x41a585(0x2b8)]['requestDragonbonesAnimation']=function(_0x3842bc){const _0x29ac38=_0x41a585;if(!this[_0x29ac38(0x24f)]())return;this[_0x29ac38(0xee)]()['playDragonbonesAnimation'](_0x3842bc),[_0x29ac38(0x215),_0x29ac38(0x298)][_0x29ac38(0x1ed)](_0x3842bc)?this['_requestedDragonbonesAnimation']=![]:this[_0x29ac38(0x1e5)]=!![];},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x289)]=Game_Battler[_0x41a585(0x2b8)]['performActionEndMembers'],Game_Battler[_0x41a585(0x2b8)][_0x41a585(0x1a0)]=function(){const _0x31003b=_0x41a585;this[_0x31003b(0x24f)]()&&('dOMfp'===_0x31003b(0x2a6)?(this['_dragonbonesAnimation']=_0x4d0f06[_0x31003b(0x293)],this[_0x31003b(0x11a)]()):this[_0x31003b(0x1e5)]=![]),VisuMZ[_0x31003b(0x15e)][_0x31003b(0x289)]['call'](this);},Game_Battler['prototype'][_0x41a585(0x2ae)]=function(){const _0x4bb717=_0x41a585;if(!this[_0x4bb717(0x24f)]())return;this[_0x4bb717(0xf0)](_0x4bb717(0x207));},Game_Battler[_0x41a585(0x2b8)][_0x41a585(0xf3)]=function(){const _0x5e2ba2=_0x41a585;if(!this[_0x5e2ba2(0x24f)]())return;this[_0x5e2ba2(0xf0)](_0x5e2ba2(0x26a));},VisuMZ[_0x41a585(0x15e)]['Game_Actor_setup']=Game_Actor['prototype']['setup'],Game_Actor['prototype'][_0x41a585(0x1c8)]=function(_0x4b2e6b){const _0x3615fe=_0x41a585;VisuMZ[_0x3615fe(0x15e)][_0x3615fe(0x1af)][_0x3615fe(0x13c)](this,_0x4b2e6b),this['initDragonbonesData'](),this['setupDragonbonesData']();},VisuMZ[_0x41a585(0x15e)]['Game_Actor_performAction']=Game_Actor[_0x41a585(0x2b8)][_0x41a585(0x280)],Game_Actor[_0x41a585(0x2b8)][_0x41a585(0x280)]=function(_0x4d955e){const _0x45124e=_0x41a585;this['requestDragonbonesAnimation'](_0x45124e(0x19a)),VisuMZ[_0x45124e(0x15e)][_0x45124e(0x11f)][_0x45124e(0x13c)](this,_0x4d955e);},VisuMZ[_0x41a585(0x15e)]['Game_Actor_performAttack']=Game_Actor[_0x41a585(0x2b8)][_0x41a585(0x25f)],Game_Actor[_0x41a585(0x2b8)][_0x41a585(0x25f)]=function(){const _0x49807f=_0x41a585;this[_0x49807f(0x186)](_0x49807f(0x19a)),VisuMZ[_0x49807f(0x15e)][_0x49807f(0x123)][_0x49807f(0x13c)](this);},VisuMZ['DragonbonesUnion'][_0x41a585(0x11d)]=Game_Actor[_0x41a585(0x2b8)]['performDamage'],Game_Actor[_0x41a585(0x2b8)][_0x41a585(0x1c0)]=function(){const _0x52c23c=_0x41a585;VisuMZ[_0x52c23c(0x15e)][_0x52c23c(0x11d)][_0x52c23c(0x13c)](this),this[_0x52c23c(0x2ae)]();},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x20f)]=Game_Actor[_0x41a585(0x2b8)][_0x41a585(0x278)],Game_Actor[_0x41a585(0x2b8)][_0x41a585(0x278)]=function(){const _0x5f59de=_0x41a585;VisuMZ['DragonbonesUnion'][_0x5f59de(0x20f)][_0x5f59de(0x13c)](this),this[_0x5f59de(0xf3)]();},VisuMZ['DragonbonesUnion'][_0x41a585(0x2ab)]=Game_Enemy[_0x41a585(0x2b8)]['setup'],Game_Enemy[_0x41a585(0x2b8)][_0x41a585(0x1c8)]=function(_0x253e59,_0x25c693,_0x13016a){const _0x3aa937=_0x41a585;VisuMZ[_0x3aa937(0x15e)][_0x3aa937(0x2ab)][_0x3aa937(0x13c)](this,_0x253e59,_0x25c693,_0x13016a),this[_0x3aa937(0x227)](),this[_0x3aa937(0x1c7)]();},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x1d4)]=Game_Enemy['prototype'][_0x41a585(0x271)],Game_Enemy['prototype']['transform']=function(_0x134860){const _0x26d0d1=_0x41a585,_0x276665=this['_enemyId'];VisuMZ[_0x26d0d1(0x15e)][_0x26d0d1(0x1d4)]['call'](this,_0x134860),this[_0x26d0d1(0x136)]!==_0x276665&&(_0x26d0d1(0x263)===_0x26d0d1(0x1c3)?this[_0x26d0d1(0x2bf)]=_0x1db1e7[_0x26d0d1(0x1a9)]():(this[_0x26d0d1(0x227)](),this[_0x26d0d1(0x1c7)]()));},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x158)]=Game_Enemy['prototype'][_0x41a585(0x280)],Game_Enemy['prototype']['performAction']=function(_0x80fbb5){const _0x2a9f14=_0x41a585;VisuMZ[_0x2a9f14(0x15e)][_0x2a9f14(0x158)][_0x2a9f14(0x13c)](this,_0x80fbb5),this['performActionDragonbonesUnion'](_0x80fbb5);},Game_Enemy[_0x41a585(0x2b8)]['performActionDragonbonesUnion']=function(_0x568c8e){const _0x41a054=_0x41a585;if(!this[_0x41a054(0x24f)]())return;this[_0x41a054(0x186)]('attack');if(Imported[_0x41a054(0x1c6)])return this[_0x41a054(0x196)](_0x568c8e);if(_0x568c8e[_0x41a054(0x2a5)]())this[_0x41a054(0x186)]('attack');else{if(_0x568c8e['isGuard']())this['requestMotion']('guard');else{if(_0x568c8e[_0x41a054(0x22d)]())this['requestMotion']('spell');else{if(_0x568c8e[_0x41a054(0x2b0)]())_0x41a054(0xf8)!==_0x41a054(0x25b)?_0x568c8e['item']()[_0x41a054(0x207)]['type']>0x0?'vqYce'!=='vqYce'?this[_0x41a054(0x248)](_0x36700a):this[_0x41a054(0x186)]('attack'):this['requestMotion'](_0x41a054(0x237)):this[_0x41a054(0x16f)]();else _0x568c8e[_0x41a054(0x2bb)]()&&this[_0x41a054(0xf0)](_0x41a054(0x1ce));}}}},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x285)]=Game_Enemy[_0x41a585(0x2b8)]['performDamage'],Game_Enemy[_0x41a585(0x2b8)]['performDamage']=function(){const _0x2f5a06=_0x41a585;VisuMZ[_0x2f5a06(0x15e)][_0x2f5a06(0x285)]['call'](this),this['performDamageDragonbonesUnion']();},VisuMZ[_0x41a585(0x15e)]['Game_Enemy_performCollapse']=Game_Enemy[_0x41a585(0x2b8)][_0x41a585(0x278)],Game_Enemy['prototype'][_0x41a585(0x278)]=function(){const _0xcd4591=_0x41a585;VisuMZ[_0xcd4591(0x15e)][_0xcd4591(0x19b)][_0xcd4591(0x13c)](this),this['performCollapseDragonbonesUnion']();},VisuMZ['DragonbonesUnion'][_0x41a585(0x1f0)]=Scene_Battle[_0x41a585(0x2b8)][_0x41a585(0x2a9)],Scene_Battle[_0x41a585(0x2b8)][_0x41a585(0x2a9)]=function(){const _0x160f19=_0x41a585;this['_spriteset']['disposeDragonbones'](),VisuMZ[_0x160f19(0x15e)][_0x160f19(0x1f0)][_0x160f19(0x13c)](this);},Sprite_Battler[_0x41a585(0x2b8)][_0x41a585(0x187)]=function(){const _0x3ef49d=_0x41a585;this[_0x3ef49d(0xef)]=null,this[_0x3ef49d(0x129)]='';},Sprite_Battler[_0x41a585(0x2b8)]['setupDragonbones']=function(){const _0x8939c1=_0x41a585;this['disposeDragonbones']();const _0x2fb8d3=this[_0x8939c1(0x109)][_0x8939c1(0x16c)]();this[_0x8939c1(0x129)]=_0x2fb8d3[_0x8939c1(0xee)],armatureName=_0x2fb8d3[_0x8939c1(0xee)],DragonbonesManager[_0x8939c1(0x296)](armatureName,this[_0x8939c1(0x14e)][_0x8939c1(0x1d8)](this)),this[_0x8939c1(0x1d2)]=new Bitmap(_0x2fb8d3[_0x8939c1(0x2a8)],_0x2fb8d3['height']),this[_0x8939c1(0x225)]&&(this[_0x8939c1(0x225)]['bitmap']=new Bitmap(_0x2fb8d3['width'],_0x2fb8d3['height']));},Sprite_Battler[_0x41a585(0x2b8)][_0x41a585(0x18b)]=function(){const _0x280919=_0x41a585;this[_0x280919(0xef)]&&(this[_0x280919(0x149)]&&(_0x280919(0x10e)!=='XXAzJ'?(this[_0x280919(0xef)]=null,this[_0x280919(0x1fa)]='',this['_dragonbonesAnimation']=''):this[_0x280919(0x149)][_0x280919(0x2b9)](this[_0x280919(0xef)])),this['removeChild'](this[_0x280919(0xef)]),this['_dragonbones']['dispose'](),delete this[_0x280919(0xef)],delete this[_0x280919(0x129)]);},Sprite_Battler[_0x41a585(0x2b8)]['onLoadDragonbones']=function(){const _0x1e347f=_0x41a585,_0x1e8621=this[_0x1e347f(0x109)][_0x1e347f(0x16c)]();this[_0x1e347f(0xef)]=DragonbonesManager[_0x1e347f(0x148)](_0x1e8621['battler']),!this['_dragonbonesSpriteContainer']&&('wTqnh'!==_0x1e347f(0x2b4)?(this[_0x1e347f(0x149)]=new Sprite(),this[_0x1e347f(0x149)][_0x1e347f(0x107)](this[_0x1e347f(0xef)])):_0x567940[_0x1e347f(0x102)]=_0x4f94c7(_0x3b4fd1['$1'])),this[_0x1e347f(0x1ae)](this[_0x1e347f(0x149)],0x0),this['attachSpritesToDistortionSprite']&&(_0x1e347f(0x214)!==_0x1e347f(0x214)?this[_0x1e347f(0x10d)]():(this[_0x1e347f(0xfd)](),this['_dragonbonesSpriteContainer'][_0x1e347f(0x107)](this[_0x1e347f(0xef)]))),this[_0x1e347f(0x10d)](),this[_0x1e347f(0xef)]['x']=_0x1e8621[_0x1e347f(0x252)],this['_dragonbones']['y']=_0x1e8621[_0x1e347f(0x244)],this[_0x1e347f(0xef)][_0x1e347f(0xf2)]['x']=_0x1e8621[_0x1e347f(0x102)],this[_0x1e347f(0xef)][_0x1e347f(0xf2)]['y']=_0x1e8621[_0x1e347f(0x27d)],this[_0x1e347f(0x109)]&&this[_0x1e347f(0x109)][_0x1e347f(0x184)]()&&(_0x1e347f(0x281)!==_0x1e347f(0x281)?(_0x1e27ac[_0x1e347f(0x132)](_0x2c6d35[_0x1e347f(0x23c)][_0x1e347f(0x122)]),_0x33eaec[_0x1e347f(0x132)](_0x1dd27a[_0x1e347f(0x23c)][_0x1e347f(0x104)]),_0x153f52=_0x49f745[_0x1e347f(0x1fd)](this[_0x1e347f(0x288)](_0x2b41d0[_0x1e347f(0x23c)][_0x1e347f(0x215)]))):this[_0x1e347f(0x282)]=0x0);},Sprite_Battler[_0x41a585(0x2b8)][_0x41a585(0x248)]=function(_0x1991d2){const _0x1a0c0e=_0x41a585;if(!this[_0x1a0c0e(0xef)])return;_0x1991d2==='idle'&&('rXznQ'===_0x1a0c0e(0x1be)?_0x44b528[_0x1a0c0e(0xee)]=_0x52d152(_0x267661['$1'])[_0x1a0c0e(0x26d)]():this[_0x1a0c0e(0x109)][_0x1a0c0e(0x1ff)]()?_0x1991d2='dying':_0x1991d2='walk');const _0x398923=this[_0x1a0c0e(0x109)][_0x1a0c0e(0x16c)]();if(_0x398923['motion'][_0x1991d2]){const _0x445733=_0x398923['motion'][_0x1991d2];this[_0x1a0c0e(0x11a)](_0x445733);}},Sprite_Battler[_0x41a585(0x2b8)][_0x41a585(0x11a)]=function(_0x575a2a){const _0x1baec9=_0x41a585;_0x575a2a=_0x575a2a[_0x1baec9(0x193)]();if(!this[_0x1baec9(0xef)])return;const _0x3967e5=this[_0x1baec9(0xef)][_0x1baec9(0x293)];if(_0x3967e5['animations'][_0x575a2a]){const _0x547064=_0x3967e5['lastAnimationName'],_0x3d059f=[_0x1baec9(0x298),_0x1baec9(0x215),_0x1baec9(0x12f),'chant',_0x1baec9(0x20d),'dying',_0x1baec9(0x165),_0x1baec9(0x2b7),'dead'];if(_0x547064===_0x575a2a&&_0x3d059f[_0x1baec9(0x1ed)](_0x575a2a))return;_0x3967e5[_0x1baec9(0x260)](_0x575a2a);}},Sprite_Battler[_0x41a585(0x2b8)][_0x41a585(0x287)]=function(){this['updateDragonbonesTimeScale'](),this['updateDragonbonesAnimation'](),this['updateDragonbonesSelection']();},Sprite_Battler[_0x41a585(0x2b8)][_0x41a585(0x179)]=function(){const _0x2ddf79=_0x41a585;if(!this[_0x2ddf79(0xef)])return;let _0x4f12d3=this[_0x2ddf79(0x109)][_0x2ddf79(0x16c)]()[_0x2ddf79(0x131)];const _0x60edff=SceneManager[_0x2ddf79(0x291)];Imported['VisuMZ_0_CoreEngine']&&_0x60edff[_0x2ddf79(0x220)]&&$gameTemp['_playTestFastMode']&&('EkmqD'===_0x2ddf79(0x18f)?this[_0x2ddf79(0x181)]&&this[_0x2ddf79(0x181)][_0x2ddf79(0x297)]()?this['updateCharacterFrameDragonbonesUnion']():_0x5309de['DragonbonesUnion']['Sprite_Character_updateCharacterFrame'][_0x2ddf79(0x13c)](this):_0x4f12d3*=0x2),Imported['VisuMZ_1_OptionsCore']&&_0x60edff['_battleAniSpeedLooping']&&(_0x4f12d3*=(ConfigManager['battleAniSpeed']||0x0)+0x1),this[_0x2ddf79(0xef)][_0x2ddf79(0x293)][_0x2ddf79(0x131)]=_0x4f12d3;},Sprite_Battler['prototype'][_0x41a585(0x223)]=function(){const _0x17832b=_0x41a585;if(!this['_dragonbones'])return;const _0x56d53d=this['_dragonbones'][_0x17832b(0x293)];if(_0x56d53d['isCompleted']){const _0x2fdda5=_0x56d53d[_0x17832b(0x254)];let _0x3aa353=VisuMZ['DragonbonesUnion'][_0x17832b(0x1db)][_0x17832b(0x24d)]['IdleBypassList'];_0x3aa353===undefined&&(_0x3aa353=['dead',_0x17832b(0x164),'victory']),!_0x3aa353[_0x17832b(0x1ed)](_0x2fdda5)&&this[_0x17832b(0x10d)]();}},Sprite_Battler[_0x41a585(0x2b8)][_0x41a585(0x2a3)]=function(){return;},Sprite_Battler[_0x41a585(0x2b8)]['playDragonbonesIdleAnimation']=function(){const _0xbe0226=_0x41a585;if(!this['_dragonbones'])return;const _0x59a698=this[_0xbe0226(0x109)];if(!_0x59a698)return;if(this['_battler'][_0xbe0226(0x189)]()){const _0x522c0c=this[_0xbe0226(0xef)][_0xbe0226(0x293)];if(_0x522c0c&&!_0x522c0c['isCompleted'])return;}if(this[_0xbe0226(0x14d)]()){const _0x4befff=this[_0xbe0226(0xef)][_0xbe0226(0x293)];if(_0x4befff&&!_0x4befff[_0xbe0226(0x233)])return;}this[_0xbe0226(0x109)][_0xbe0226(0x26e)]()&&this['playDragonbonesAnimation'](_0xbe0226(0x298));const _0x1c393b=_0x59a698[_0xbe0226(0x119)]();if(_0x59a698['isInputting']()||_0x59a698[_0xbe0226(0x1da)]())this['playDragonbonesMotion']('walk');else{if(_0x1c393b===0x3){if(_0xbe0226(0x10c)===_0xbe0226(0x1b6)){if(!_0x529f53)return;if(_0x4f887e[_0xbe0226(0x291)]['constructor']!==_0x46fdba)return;_0x5e1814[_0xbe0226(0x1c5)](_0x3a6623,_0xc49640);const _0x38a5c1=_0x372651[_0xbe0226(0x15f)]()[_0xbe0226(0x14a)](_0x126cb2[_0xbe0226(0x1aa)]);if(!_0x38a5c1)return;_0x38a5c1[_0xbe0226(0x28d)]=_0x44217a[_0xbe0226(0x139)];}else this[_0xbe0226(0x248)](_0xbe0226(0x26a));}else{if(_0x1c393b===0x2){if('SxPau'!=='SxPau'){const _0x562217=this[_0xbe0226(0x272)](_0x352317),_0x174413=this[_0xbe0226(0x1cd)][_0x562217];if(!_0x174413)return;_0x174413[_0xbe0226(0x227)](),_0x174413[_0xbe0226(0x18b)]();}else this[_0xbe0226(0x248)]('sleep');}else{if(this[_0xbe0226(0x109)]['isActor']()&&BattleManager[_0xbe0226(0x146)]())this[_0xbe0226(0x248)](_0xbe0226(0x164));else{if(_0x59a698['isChanting']())_0xbe0226(0x26f)!==_0xbe0226(0x241)?this['playDragonbonesMotion'](_0xbe0226(0x19f)):_0x373cad[_0xbe0226(0x2a8)]=_0x5994d5(_0x3cf1d7['$1']);else{if(_0x59a698[_0xbe0226(0x276)]()||_0x59a698['isGuardWaiting']())this[_0xbe0226(0x248)](_0xbe0226(0x20d));else{if(_0x1c393b===0x1)this[_0xbe0226(0x248)](_0xbe0226(0x165));else{if(_0x59a698[_0xbe0226(0x1ff)]())'LoVBh'!==_0xbe0226(0x12c)?this[_0xbe0226(0x149)][_0xbe0226(0x19e)]!==_0x3beb30&&this[_0xbe0226(0x149)]['setHue'](_0x263761):this['playDragonbonesMotion'](_0xbe0226(0x298));else _0x59a698[_0xbe0226(0x127)]()?this[_0xbe0226(0x248)](_0xbe0226(0x298)):_0xbe0226(0x112)!==_0xbe0226(0x255)?this[_0xbe0226(0x248)](_0xbe0226(0x298)):(_0x202426*=this['_character'][_0xbe0226(0x1d6)](),this['_character']['isDashing']()?_0x3b9ddb*=_0x402764[_0xbe0226(0x111)]:_0x9a5ffe*=_0xfa6143[_0xbe0226(0x224)]);}}}}}}}},Sprite_Battler[_0x41a585(0x2b8)][_0x41a585(0x14d)]=function(){const _0x5df675=_0x41a585;if(!this[_0x5df675(0x109)][_0x5df675(0x229)]())return![];if(this[_0x5df675(0x109)]===BattleManager[_0x5df675(0x256)])return!![];if(this[_0x5df675(0x109)]===BattleManager[_0x5df675(0x21d)]()&&this[_0x5df675(0x109)][_0x5df675(0x145)]())return!![];if(this[_0x5df675(0x109)]['_requestedDragonbonesAnimation'])return!![];if(BattleManager[_0x5df675(0x151)]===this[_0x5df675(0x109)])return!![];if(BattleManager[_0x5df675(0x134)][_0x5df675(0x1ed)](this[_0x5df675(0x109)]))return!![];return![];},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x202)]=Sprite_Enemy[_0x41a585(0x2b8)][_0x41a585(0x142)],Sprite_Enemy['prototype']['setHue']=function(_0xbe8f54){const _0x42c9a2=_0x41a585;this[_0x42c9a2(0x212)]()?this['setDragonbonesHue'](_0xbe8f54):VisuMZ[_0x42c9a2(0x15e)][_0x42c9a2(0x202)][_0x42c9a2(0x13c)](this,_0xbe8f54);},Sprite_Enemy[_0x41a585(0x2b8)]['isDragonbonesHueAffected']=function(){const _0x1a0dab=_0x41a585;if(!this[_0x1a0dab(0x109)])return![];if(!this['_dragonbones'])return![];const _0x205c7f=this[_0x1a0dab(0x109)]['enemy']()[_0x1a0dab(0xfe)]||'';if(_0x205c7f[_0x1a0dab(0x1ee)](/<DRAGONBONES HUE AFFECTED>/i)){if('YIlTd'==='YIlTd')return!![];else _0x3f7bcb['flipRight']=![];}else{if(_0x205c7f[_0x1a0dab(0x1ee)](/<DRAGONBONES NO HUE>/i)){if(_0x1a0dab(0x201)===_0x1a0dab(0x266))this[_0x1a0dab(0xf0)]('skill');else return![];}}return VisuMZ[_0x1a0dab(0x15e)][_0x1a0dab(0x1db)][_0x1a0dab(0x24d)][_0x1a0dab(0x1b9)];},Sprite_Enemy[_0x41a585(0x2b8)]['setDragonbonesHue']=function(_0x55e3a4){const _0x1eadcd=_0x41a585;this['_dragonbonesSpriteContainer'][_0x1eadcd(0x19e)]!==_0x55e3a4&&(_0x1eadcd(0x125)==='kvBMu'?this[_0x1eadcd(0x149)][_0x1eadcd(0x142)](_0x55e3a4):(this[_0x1eadcd(0x1f1)](),_0x595121[_0x1eadcd(0x15e)][_0x1eadcd(0xf4)][_0x1eadcd(0x13c)](this),this[_0x1eadcd(0x109)]&&this[_0x1eadcd(0x109)][_0x1eadcd(0x24f)]()&&(this['_shadowSprite']['visible']=![])));},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x261)]=Sprite_Actor['prototype'][_0x41a585(0x1b3)],Sprite_Actor['prototype']['initMembers']=function(){const _0x3869bc=_0x41a585;VisuMZ[_0x3869bc(0x15e)]['Sprite_Actor_initMembers'][_0x3869bc(0x13c)](this),this[_0x3869bc(0x187)]();},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x205)]=Sprite_Actor['prototype'][_0x41a585(0x295)],Sprite_Actor[_0x41a585(0x2b8)][_0x41a585(0x295)]=function(){const _0x26d6c8=_0x41a585,_0xb6588=this[_0x26d6c8(0x109)];_0xb6588[_0x26d6c8(0x24f)]()?_0x26d6c8(0x21c)===_0x26d6c8(0x21c)?(Sprite_Battler[_0x26d6c8(0x2b8)][_0x26d6c8(0x295)][_0x26d6c8(0x13c)](this),this['_dragonbonesName']!==_0xb6588['dragonbonesData']()[_0x26d6c8(0xee)]&&this[_0x26d6c8(0x1ba)](),this['updateDragonbones']()):this[_0x26d6c8(0x248)](_0x26d6c8(0x298)):(VisuMZ['DragonbonesUnion'][_0x26d6c8(0x205)][_0x26d6c8(0x13c)](this),this[_0x26d6c8(0x2b9)](this[_0x26d6c8(0xef)]));},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x11c)]=Sprite_Actor[_0x41a585(0x2b8)]['startMotion'],Sprite_Actor[_0x41a585(0x2b8)][_0x41a585(0x204)]=function(_0x461e76){const _0x3df8c4=_0x41a585;VisuMZ[_0x3df8c4(0x15e)][_0x3df8c4(0x11c)][_0x3df8c4(0x13c)](this,_0x461e76);if(this[_0x3df8c4(0xfc)][_0x3df8c4(0x23a)]===_0x3df8c4(0x240)){if(_0x3df8c4(0x1c2)==='yhaoG')this[_0x3df8c4(0x248)](_0x461e76);else{const _0x2f8fe2=_0x122264['lastAnimationName'];let _0xe1bd8e=_0x581ae6[_0x3df8c4(0x15e)]['Settings'][_0x3df8c4(0x24d)][_0x3df8c4(0x2b3)];_0xe1bd8e===_0x3d8e0c&&(_0xe1bd8e=[_0x3df8c4(0x26a),_0x3df8c4(0x164),_0x3df8c4(0x1b8)]),!_0xe1bd8e[_0x3df8c4(0x1ed)](_0x2f8fe2)&&this[_0x3df8c4(0x10d)]();}}},VisuMZ[_0x41a585(0x15e)][_0x41a585(0xf4)]=Sprite_Actor[_0x41a585(0x2b8)][_0x41a585(0x1d3)],Sprite_Actor['prototype']['updateShadow']=function(){const _0x1b120d=_0x41a585;this[_0x1b120d(0x1f1)](),VisuMZ['DragonbonesUnion']['Sprite_Actor_updateShadow']['call'](this),this[_0x1b120d(0x109)]&&this[_0x1b120d(0x109)][_0x1b120d(0x24f)]()&&(this[_0x1b120d(0x13a)]['visible']=![]);},Sprite_Actor[_0x41a585(0x2b8)][_0x41a585(0x1f1)]=function(){const _0x15a4aa=_0x41a585;if(this[_0x15a4aa(0xfc)]!==Sprite_Actor)return;let _0x906e9f=!![];if(this[_0x15a4aa(0x109)]&&this[_0x15a4aa(0x109)][_0x15a4aa(0x24f)]())_0x906e9f=![];this[_0x15a4aa(0x225)]['visible']=_0x906e9f,this[_0x15a4aa(0x1c4)][_0x15a4aa(0x1e8)]=_0x906e9f,this[_0x15a4aa(0x247)][_0x15a4aa(0x1e8)]=_0x906e9f;},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x11b)]=Sprite_Actor['prototype'][_0x41a585(0x26c)],Sprite_Actor[_0x41a585(0x2b8)][_0x41a585(0x26c)]=function(){const _0xa8d309=_0x41a585;this[_0xa8d309(0x109)]&&this[_0xa8d309(0x109)][_0xa8d309(0x24f)]()?this[_0xa8d309(0x16f)]():VisuMZ[_0xa8d309(0x15e)][_0xa8d309(0x11b)][_0xa8d309(0x13c)](this);},Sprite_Actor['prototype'][_0x41a585(0x16f)]=function(){const _0x3d8a09=_0x41a585,_0x3a8888=this[_0x3d8a09(0x225)][_0x3d8a09(0x1d2)];if(_0x3a8888){const _0x2ed753=_0x3a8888[_0x3d8a09(0x2a8)],_0xe73076=_0x3a8888[_0x3d8a09(0x13d)];this[_0x3d8a09(0x225)]['setFrame'](0x0,0x0,_0x2ed753,_0xe73076),this['setFrame'](0x0,0x0,_0x2ed753,_0xe73076);}},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x24e)]=Sprite_Enemy['prototype'][_0x41a585(0x1b3)],Sprite_Enemy[_0x41a585(0x2b8)][_0x41a585(0x1b3)]=function(){const _0x9278a2=_0x41a585;VisuMZ[_0x9278a2(0x15e)][_0x9278a2(0x24e)][_0x9278a2(0x13c)](this),this['initMembersDragonbonesUnion']();},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x169)]=Sprite_Enemy['prototype']['setBattler'],Sprite_Enemy['prototype'][_0x41a585(0x13e)]=function(_0x324160){const _0x365410=_0x41a585;this[_0x365410(0x18b)](),VisuMZ[_0x365410(0x15e)][_0x365410(0x169)]['call'](this,_0x324160);if(_0x324160[_0x365410(0x184)]())this['opacity']=0x0;},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x1f2)]=Sprite_Enemy[_0x41a585(0x2b8)][_0x41a585(0x295)],Sprite_Enemy['prototype'][_0x41a585(0x295)]=function(){const _0x4e044a=_0x41a585,_0x51f28c=this['_battler'];_0x51f28c[_0x4e044a(0x24f)]()?_0x4e044a(0x1e3)!==_0x4e044a(0x1e6)?(Sprite_Battler[_0x4e044a(0x2b8)]['updateBitmap'][_0x4e044a(0x13c)](this),this['_dragonbonesName']!==_0x51f28c[_0x4e044a(0x16c)]()[_0x4e044a(0xee)]&&this['setupDragonbones'](),this[_0x4e044a(0x287)](),this['setHue'](this[_0x4e044a(0x27f)][_0x4e044a(0x234)]())):(this[_0x4e044a(0x19d)](),this[_0x4e044a(0xed)]()):(VisuMZ[_0x4e044a(0x15e)][_0x4e044a(0x1f2)]['call'](this),this[_0x4e044a(0x2b9)](this[_0x4e044a(0xef)]));},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x114)]=Sprite_Enemy[_0x41a585(0x2b8)]['refreshMotion'],Sprite_Enemy[_0x41a585(0x2b8)][_0x41a585(0x27c)]=function(){const _0x33b85b=_0x41a585;VisuMZ[_0x33b85b(0x15e)][_0x33b85b(0x114)][_0x33b85b(0x13c)](this);if(!VisuMZ[_0x33b85b(0x15e)][_0x33b85b(0x1db)][_0x33b85b(0x268)])return;const _0x44c8f2=this[_0x33b85b(0x109)];_0x44c8f2&&_0x44c8f2[_0x33b85b(0x24f)]()&&(_0x33b85b(0x1b4)===_0x33b85b(0x299)?_0x3a04c8[_0x33b85b(0x13d)]=_0x34824d(_0x3cc6ad['$1']):this[_0x33b85b(0x15b)]());},Sprite_Enemy['prototype'][_0x41a585(0x15b)]=function(){const _0x40db85=_0x41a585,_0x31479f=this[_0x40db85(0x109)];if(_0x31479f){const _0xb33cbe=_0x31479f[_0x40db85(0x119)]();if(_0x31479f[_0x40db85(0x145)]()||_0x31479f[_0x40db85(0x1da)]()){if(_0x40db85(0x137)===_0x40db85(0x1a7))return this[_0x40db85(0x291)]&&this[_0x40db85(0x291)][_0x40db85(0xfc)]===_0x336f9e;else this[_0x40db85(0x248)]('walk');}else{if(_0xb33cbe===0x3)this['playDragonbonesMotion'](_0x40db85(0x26a));else{if(_0xb33cbe===0x2)this[_0x40db85(0x248)](_0x40db85(0x2b7));else{if(_0x31479f[_0x40db85(0x24c)]())_0x40db85(0x199)!==_0x40db85(0x188)?this['playDragonbonesMotion'](_0x40db85(0x19f)):_0x22fcab[_0x40db85(0x13d)]=_0xe28ee8(_0x47d901['$1']);else{if(_0x31479f[_0x40db85(0x276)]()||_0x31479f[_0x40db85(0x20e)]())this[_0x40db85(0x248)]('guard');else{if(_0xb33cbe===0x1)_0x40db85(0x29c)!=='PbMDT'?this['playDragonbonesMotion'](_0x40db85(0x165)):this['_dragonbonesFlipDirection']=0x1;else{if(_0x31479f['isDying']())this['playDragonbonesMotion'](_0x40db85(0x298));else _0x31479f[_0x40db85(0x127)]()?this[_0x40db85(0x248)](_0x40db85(0x298)):this[_0x40db85(0x248)](_0x40db85(0x298));}}}}}}}},Spriteset_Battle[_0x41a585(0x2b8)][_0x41a585(0x18b)]=function(){const _0x53b4b1=_0x41a585;for(const _0x4d8199 of this[_0x53b4b1(0x170)]()){if(!_0x4d8199)continue;_0x4d8199['disposeDragonbones']();}},PluginManager[_0x41a585(0x218)](pluginData[_0x41a585(0x23a)],'Picture_SetupDragonbones',_0x30b11d=>{const _0x3a87d2=_0x41a585;if(!$gameScreen)return;VisuMZ['ConvertParams'](_0x30b11d,_0x30b11d),$gameScreen[_0x3a87d2(0x141)](_0x30b11d['PictureID']);const _0x2d715e=$gameScreen[_0x3a87d2(0x16e)](_0x30b11d[_0x3a87d2(0x257)]),_0x139231=_0x2d715e['dragonbonesData']();_0x139231[_0x3a87d2(0x1b1)]=_0x30b11d[_0x3a87d2(0x191)],_0x139231[_0x3a87d2(0x293)]=_0x30b11d[_0x3a87d2(0x139)],_0x139231['offsetX']=_0x30b11d[_0x3a87d2(0x197)],_0x139231[_0x3a87d2(0x244)]=_0x30b11d[_0x3a87d2(0x277)],_0x139231['scaleX']=_0x30b11d[_0x3a87d2(0x1a4)],_0x139231['scaleY']=_0x30b11d[_0x3a87d2(0x18e)],_0x139231[_0x3a87d2(0x131)]=_0x30b11d[_0x3a87d2(0x192)];}),PluginManager[_0x41a585(0x218)](pluginData[_0x41a585(0x23a)],_0x41a585(0x221),_0x142688=>{const _0x2ca12f=_0x41a585;if(!$gameScreen)return;VisuMZ[_0x2ca12f(0x1c5)](_0x142688,_0x142688),$gameScreen['createDefaultPicture'](_0x142688[_0x2ca12f(0x257)]);const _0xa380b5=$gameScreen['picture'](_0x142688[_0x2ca12f(0x257)]),_0x3b0217=_0xa380b5[_0x2ca12f(0x16c)](),_0x34bff2=_0x142688[_0x2ca12f(0x171)]||![];_0x3b0217[_0x2ca12f(0x293)]=_0x142688['Animation'],_0x3b0217[_0x2ca12f(0x235)]=_0x34bff2;}),PluginManager[_0x41a585(0x218)](pluginData[_0x41a585(0x23a)],_0x41a585(0x116),_0x5d8bd9=>{const _0xae9951=_0x41a585;if(!$gameScreen)return;VisuMZ[_0xae9951(0x1c5)](_0x5d8bd9,_0x5d8bd9),$gameScreen[_0xae9951(0x141)](_0x5d8bd9['PictureID']);const _0x2e3c95=$gameScreen[_0xae9951(0x16e)](_0x5d8bd9[_0xae9951(0x257)]),_0xd3d7ed=_0x2e3c95[_0xae9951(0x16c)]();_0xd3d7ed['offsetX']=_0x5d8bd9['OffsetX'],_0xd3d7ed[_0xae9951(0x244)]=_0x5d8bd9[_0xae9951(0x277)];}),PluginManager['registerCommand'](pluginData[_0x41a585(0x23a)],_0x41a585(0x22b),_0x57cb15=>{const _0x16f831=_0x41a585;if(!$gameScreen)return;VisuMZ['ConvertParams'](_0x57cb15,_0x57cb15),$gameScreen['createDefaultPicture'](_0x57cb15[_0x16f831(0x257)]);const _0x502378=$gameScreen[_0x16f831(0x16e)](_0x57cb15[_0x16f831(0x257)]),_0x3c4302=_0x502378[_0x16f831(0x16c)]();_0x3c4302['scaleX']=_0x57cb15[_0x16f831(0x1a4)],_0x3c4302['scaleY']=_0x57cb15[_0x16f831(0x18e)];}),PluginManager['registerCommand'](pluginData[_0x41a585(0x23a)],_0x41a585(0x1b2),_0x31700e=>{const _0x195f02=_0x41a585;if(!$gameScreen)return;VisuMZ['ConvertParams'](_0x31700e,_0x31700e),$gameScreen[_0x195f02(0x141)](_0x31700e[_0x195f02(0x257)]);const _0x40a090=$gameScreen[_0x195f02(0x16e)](_0x31700e[_0x195f02(0x257)]),_0x2f3db6=_0x40a090[_0x195f02(0x16c)]();_0x2f3db6[_0x195f02(0x131)]=_0x31700e[_0x195f02(0x192)];}),Game_Screen[_0x41a585(0x2b8)][_0x41a585(0x141)]=function(_0x2c1191){const _0x239a5d=_0x41a585;if(this['picture'](_0x2c1191))return;this[_0x239a5d(0x292)](_0x2c1191,'',0x0,Math[_0x239a5d(0x26b)](Graphics[_0x239a5d(0x2a8)]/0x2),Math[_0x239a5d(0x26b)](Graphics['height']/0x2),0x64,0x64,0xff,0x0);},VisuMZ[_0x41a585(0x15e)]['Game_Screen_erasePicture']=Game_Screen[_0x41a585(0x2b8)][_0x41a585(0x27a)],Game_Screen[_0x41a585(0x2b8)][_0x41a585(0x27a)]=function(_0x567848){const _0x40276a=_0x41a585;this[_0x40276a(0x198)](_0x567848),VisuMZ[_0x40276a(0x15e)][_0x40276a(0xf9)][_0x40276a(0x13c)](this,_0x567848);},Game_Screen['prototype'][_0x41a585(0x198)]=function(_0x2f6d0e){const _0x37f801=_0x41a585,_0x46c59a=this[_0x37f801(0x272)](_0x2f6d0e),_0x25f107=this[_0x37f801(0x1cd)][_0x46c59a];if(!_0x25f107)return;_0x25f107['initDragonbonesData'](),_0x25f107['disposeDragonbones']();},VisuMZ[_0x41a585(0x15e)]['Game_Picture_initialize']=Game_Picture[_0x41a585(0x2b8)][_0x41a585(0x17c)],Game_Picture[_0x41a585(0x2b8)][_0x41a585(0x17c)]=function(){const _0x3df2a3=_0x41a585;VisuMZ['DragonbonesUnion'][_0x3df2a3(0x25d)]['call'](this),this[_0x3df2a3(0x227)]();},Game_Picture[_0x41a585(0x2b8)][_0x41a585(0x227)]=function(){const _0xd283d4=_0x41a585;this[_0xd283d4(0xf6)]={'filename':'','animation':DragonbonesManager[_0xd283d4(0x118)],'scaleX':0x1,'scaleY':0x1,'offsetX':0x0,'offsetY':0x0,'timeScale':0x1,'revertToIdle':![]};},Game_Picture['prototype'][_0x41a585(0x16c)]=function(){const _0x52a4c2=_0x41a585;if(this['_dragonbonesData']!==undefined)return this[_0x52a4c2(0xf6)];return this[_0x52a4c2(0x227)](),this[_0x52a4c2(0xf6)];},Game_Picture[_0x41a585(0x2b8)][_0x41a585(0x297)]=function(){const _0x101711=_0x41a585;return this[_0x101711(0x16c)]()[_0x101711(0x1b1)]!=='';},Game_Picture[_0x41a585(0x2b8)][_0x41a585(0x18b)]=function(){const _0x2fd82f=_0x41a585;if(!SceneManager[_0x2fd82f(0x291)])return;if(!SceneManager['_scene'][_0x2fd82f(0x242)])return;const _0x4659b4=SceneManager[_0x2fd82f(0x291)][_0x2fd82f(0x242)][_0x2fd82f(0x17b)](this);if(_0x4659b4)_0x4659b4[_0x2fd82f(0x18b)]();},Spriteset_Base['prototype'][_0x41a585(0x17b)]=function(_0x1cc4d4){const _0x48be21=_0x41a585;return this[_0x48be21(0x1b5)][_0x48be21(0x19c)][_0x48be21(0x2a0)](_0x1f82fd=>_0x1f82fd&&_0x1f82fd[_0x48be21(0x16e)]()===_0x1cc4d4);},VisuMZ['DragonbonesUnion'][_0x41a585(0x1fb)]=Sprite_Picture[_0x41a585(0x2b8)]['initialize'],Sprite_Picture[_0x41a585(0x2b8)]['initialize']=function(_0x30d04f){const _0x174010=_0x41a585;this[_0x174010(0x227)](),VisuMZ[_0x174010(0x15e)]['Sprite_Picture_initialize']['call'](this,_0x30d04f);},Sprite_Picture['prototype'][_0x41a585(0x227)]=function(_0x52e711){const _0x4a045a=_0x41a585;this[_0x4a045a(0xef)]=null,this[_0x4a045a(0x1fa)]='',this[_0x4a045a(0x117)]='';},VisuMZ['DragonbonesUnion'][_0x41a585(0x2c1)]=Sprite_Picture[_0x41a585(0x2b8)]['update'],Sprite_Picture[_0x41a585(0x2b8)]['update']=function(){const _0x1a631d=_0x41a585;VisuMZ[_0x1a631d(0x15e)][_0x1a631d(0x2c1)]['call'](this),this[_0x1a631d(0x287)]();},Sprite_Picture['prototype']['disposeDragonbones']=function(){const _0x2d1b6a=_0x41a585;this[_0x2d1b6a(0xef)]&&(this[_0x2d1b6a(0x2b9)](this['_dragonbones']),this[_0x2d1b6a(0xef)][_0x2d1b6a(0x228)](),this[_0x2d1b6a(0xef)]=null,this[_0x2d1b6a(0x1fa)]='',this[_0x2d1b6a(0x117)]='');},Sprite_Picture['prototype'][_0x41a585(0x287)]=function(){const _0x55ab44=_0x41a585,_0xeea868=this[_0x55ab44(0x16e)]();if(!_0xeea868)return this['disposeDragonbones']();if(!_0xeea868[_0x55ab44(0x297)]())return this[_0x55ab44(0x18b)]();this[_0x55ab44(0x157)]();if(!this[_0x55ab44(0xef)])return;this[_0x55ab44(0x223)](),this[_0x55ab44(0x12d)](),this[_0x55ab44(0x179)]();},Sprite_Picture['prototype'][_0x41a585(0x157)]=function(){const _0x307a4b=_0x41a585,_0x59c4b0=this[_0x307a4b(0x16e)]()[_0x307a4b(0x16c)]();if(this[_0x307a4b(0x1fa)]===_0x59c4b0[_0x307a4b(0x1b1)])return;this['disposeDragonbones'](),this[_0x307a4b(0x1fa)]=_0x59c4b0['filename'],DragonbonesManager[_0x307a4b(0x296)](_0x59c4b0[_0x307a4b(0x1b1)],this[_0x307a4b(0x14e)][_0x307a4b(0x1d8)](this));},Sprite_Picture[_0x41a585(0x2b8)][_0x41a585(0x14e)]=function(){const _0x3bc97d=_0x41a585,_0x136d35=this[_0x3bc97d(0x16e)]()[_0x3bc97d(0x16c)]();this['_dragonbones']=DragonbonesManager[_0x3bc97d(0x148)](_0x136d35[_0x3bc97d(0x1b1)]),this[_0x3bc97d(0x1ae)](this[_0x3bc97d(0xef)],0x0),this[_0x3bc97d(0x223)]();},Sprite_Picture[_0x41a585(0x2b8)]['updateDragonbonesAnimation']=function(){const _0x467826=_0x41a585;if(!this[_0x467826(0xef)])return;const _0x2cde83=this[_0x467826(0x16e)]()[_0x467826(0x16c)]();this[_0x467826(0x117)]!==_0x2cde83[_0x467826(0x293)]&&(this[_0x467826(0x117)]=_0x2cde83[_0x467826(0x293)],this[_0x467826(0x11a)]());},Sprite_Picture[_0x41a585(0x2b8)][_0x41a585(0x11a)]=function(){const _0x15a66a=_0x41a585;if(!this[_0x15a66a(0xef)])return;const _0x3bbc0b=this[_0x15a66a(0xef)]['animation'],_0x592f2b=this[_0x15a66a(0x117)][_0x15a66a(0x193)]()['trim']();_0x3bbc0b['animations'][_0x592f2b]&&_0x3bbc0b[_0x15a66a(0x260)](_0x592f2b);},Sprite_Picture[_0x41a585(0x2b8)][_0x41a585(0x12d)]=function(){const _0xe076f8=_0x41a585;if(!this[_0xe076f8(0xef)])return;const _0x2e338c=this[_0xe076f8(0x16e)]()['dragonbonesData']();this[_0xe076f8(0xef)]['x']=_0x2e338c['offsetX'],this[_0xe076f8(0xef)]['y']=_0x2e338c['offsetY'],this[_0xe076f8(0xef)][_0xe076f8(0xf2)]['x']=_0x2e338c[_0xe076f8(0x102)],this['_dragonbones']['scale']['y']=_0x2e338c[_0xe076f8(0x27d)],this['_dragonbones']['animation'][_0xe076f8(0x140)]===![]&&_0x2e338c[_0xe076f8(0x235)]&&(_0x2e338c[_0xe076f8(0x293)]=_0xe076f8(0x298));},Sprite_Picture[_0x41a585(0x2b8)][_0x41a585(0x179)]=function(){const _0x56cd58=_0x41a585;if(!this[_0x56cd58(0xef)])return;const _0x7c1f40=this['picture']()['dragonbonesData']();let _0x3fb085=_0x7c1f40['timeScale'];this[_0x56cd58(0xef)][_0x56cd58(0x293)]['timeScale']=_0x3fb085;},PluginManager[_0x41a585(0x218)](pluginData[_0x41a585(0x23a)],_0x41a585(0x1f5),_0x5b5820=>{const _0x2e0505=_0x41a585;if(!$gameMap)return;VisuMZ[_0x2e0505(0x1c5)](_0x5b5820,_0x5b5820);const _0xa3f49c=$gameActors[_0x2e0505(0x21d)](_0x5b5820[_0x2e0505(0x1e1)]);if(!_0xa3f49c)return;const _0x2c991c=JsonEx['makeDeepCopy'](_0xa3f49c[_0x2e0505(0x2bf)]);_0xa3f49c[_0x2e0505(0x2bf)]={'filename':_0x5b5820['Filename'],'animation':'','scaleX':_0x5b5820['ScaleX'],'scaleY':_0x5b5820['ScaleY'],'offsetX':_0x5b5820[_0x2e0505(0x197)],'offsetY':_0x5b5820[_0x2e0505(0x277)],'timeScale':_0x5b5820[_0x2e0505(0x192)],'walkRate':_0x5b5820[_0x2e0505(0x25a)]??0x1,'dashRate':_0x5b5820[_0x2e0505(0x135)]??0x1,'width':_0x5b5820[_0x2e0505(0x108)],'height':_0x5b5820['Height'],'flipLeft':_0x5b5820[_0x2e0505(0x2b2)],'flipRight':_0x5b5820[_0x2e0505(0x176)],'animationNames':{'idle':_0x5b5820[_0x2e0505(0x1a1)],'walk':_0x5b5820[_0x2e0505(0x1ea)],'dash':_0x5b5820[_0x2e0505(0x203)],'jump':_0x5b5820['Jump'],'ladderidle':_0x5b5820[_0x2e0505(0x22f)],'ladderclimb':_0x5b5820[_0x2e0505(0x1e9)],'ropeidle':_0x5b5820[_0x2e0505(0x182)],'ropeclimb':_0x5b5820['RopeClimb']}},$gamePlayer[_0x2e0505(0x28a)]();}),PluginManager[_0x41a585(0x218)](pluginData[_0x41a585(0x23a)],_0x41a585(0x1e2),_0x227d89=>{const _0x228786=_0x41a585;if(!$gameMap)return;if(SceneManager['_scene'][_0x228786(0xfc)]!==Scene_Map)return;VisuMZ[_0x228786(0x1c5)](_0x227d89,_0x227d89);const _0x598be1=$gameActors['actor'](_0x227d89[_0x228786(0x1e1)]),_0x1afbab=_0x598be1[_0x228786(0x155)](),_0x56a5c2=_0x1afbab===0x0?$gamePlayer:$gamePlayer[_0x228786(0x15f)]()[_0x228786(0x14a)](_0x1afbab-0x1);if(!_0x56a5c2)return;_0x56a5c2[_0x228786(0x28d)]=_0x227d89['Animation'];}),PluginManager['registerCommand'](pluginData[_0x41a585(0x23a)],_0x41a585(0x21a),_0x3711f9=>{const _0x3c24db=_0x41a585;if(!$gameMap)return;if(SceneManager['_scene'][_0x3c24db(0xfc)]!==Scene_Map)return;VisuMZ['ConvertParams'](_0x3711f9,_0x3711f9);const _0x51d776=$gameActors['actor'](_0x3711f9['ActorID']),_0x16e80e=_0x51d776[_0x3c24db(0x155)](),_0x554259=_0x16e80e===0x0?$gamePlayer:$gamePlayer['followers']()[_0x3c24db(0x14a)](_0x16e80e-0x1);if(!_0x554259)return;_0x554259[_0x3c24db(0x28d)]='';}),PluginManager[_0x41a585(0x218)](pluginData[_0x41a585(0x23a)],_0x41a585(0x22c),_0x2b81b1=>{const _0x2b2eab=_0x41a585;if(!$gameMap)return;if(SceneManager[_0x2b2eab(0x291)][_0x2b2eab(0xfc)]!==Scene_Map)return;VisuMZ[_0x2b2eab(0x1c5)](_0x2b81b1,_0x2b81b1);const _0x442b43=$gameTemp['getLastPluginCommandInterpreter'](),_0x2b6cc5=$gameMap[_0x2b2eab(0x1bc)](_0x2b81b1[_0x2b2eab(0x2af)]||_0x442b43[_0x2b2eab(0x216)]());if(!_0x2b6cc5)return;_0x2b6cc5['dragonbonesAnimation']=_0x2b81b1['Animation'];}),PluginManager[_0x41a585(0x218)](pluginData[_0x41a585(0x23a)],_0x41a585(0x150),_0x3b0c0e=>{const _0x562df4=_0x41a585;if(!$gameMap)return;if(SceneManager[_0x562df4(0x291)][_0x562df4(0xfc)]!==Scene_Map)return;VisuMZ['ConvertParams'](_0x3b0c0e,_0x3b0c0e);const _0x4a930b=$gameTemp[_0x562df4(0x206)](),_0x40d209=$gameMap[_0x562df4(0x1bc)](_0x3b0c0e['EventID']||_0x4a930b['eventId']());if(!_0x40d209)return;_0x40d209[_0x562df4(0x28d)]='';}),PluginManager[_0x41a585(0x218)](pluginData[_0x41a585(0x23a)],_0x41a585(0x23e),_0x2f1b01=>{const _0x25da4f=_0x41a585;if(!$gameMap)return;if(SceneManager['_scene'][_0x25da4f(0xfc)]!==Scene_Map)return;VisuMZ[_0x25da4f(0x1c5)](_0x2f1b01,_0x2f1b01);const _0x422371=$gamePlayer[_0x25da4f(0x15f)]()[_0x25da4f(0x14a)](_0x2f1b01[_0x25da4f(0x1aa)]);if(!_0x422371)return;_0x422371[_0x25da4f(0x28d)]=_0x2f1b01[_0x25da4f(0x139)];}),PluginManager[_0x41a585(0x218)](pluginData[_0x41a585(0x23a)],_0x41a585(0x17f),_0x4b8f9b=>{const _0x5337bc=_0x41a585;if(!$gameMap)return;if(SceneManager[_0x5337bc(0x291)][_0x5337bc(0xfc)]!==Scene_Map)return;VisuMZ['ConvertParams'](_0x4b8f9b,_0x4b8f9b);const _0x4376ac=$gamePlayer[_0x5337bc(0x15f)]()[_0x5337bc(0x14a)](_0x4b8f9b[_0x5337bc(0x1aa)]);if(!_0x4376ac)return;_0x4376ac[_0x5337bc(0x28d)]='';}),PluginManager[_0x41a585(0x218)](pluginData[_0x41a585(0x23a)],'MapSprite_PlayerAnimationPlay',_0x4bdccc=>{const _0x20a2b9=_0x41a585;if(!$gameMap)return;if(SceneManager['_scene']['constructor']!==Scene_Map)return;VisuMZ['ConvertParams'](_0x4bdccc,_0x4bdccc),$gamePlayer[_0x20a2b9(0x28d)]=_0x4bdccc['Animation'];}),PluginManager[_0x41a585(0x218)](pluginData[_0x41a585(0x23a)],'MapSprite_PlayerAnimationStop',_0x37c534=>{const _0x519c0f=_0x41a585;if(!$gameMap)return;if(SceneManager[_0x519c0f(0x291)][_0x519c0f(0xfc)]!==Scene_Map)return;$gamePlayer[_0x519c0f(0x28d)]='';}),Game_Temp[_0x41a585(0x2b8)]['setLastPluginCommandInterpreter']=function(_0x187c9a){const _0x313524=_0x41a585;this[_0x313524(0x174)]=_0x187c9a;},Game_Temp[_0x41a585(0x2b8)][_0x41a585(0x206)]=function(){const _0xae17a9=_0x41a585;return this[_0xae17a9(0x174)];},Object['defineProperty'](Game_CharacterBase[_0x41a585(0x2b8)],_0x41a585(0x28d),{'get':function(){return this['dragonbonesSpriteData']()['animation'];},'set':function(_0x2d8bf5){const _0x1391e9=_0x41a585;this['dragonbonesSpriteData']()[_0x1391e9(0x293)]=_0x2d8bf5;},'configurable':!![]}),Game_CharacterBase[_0x41a585(0x2b8)][_0x41a585(0x227)]=function(){const _0x57bdcb=_0x41a585,_0x4cc2b9=VisuMZ['DragonbonesUnion'][_0x57bdcb(0x1db)][_0x57bdcb(0x153)];this['_dragonbonesSpriteData']={'filename':'','animation':'','scaleX':_0x4cc2b9[_0x57bdcb(0x1a4)],'scaleY':_0x4cc2b9['ScaleY'],'offsetX':_0x4cc2b9[_0x57bdcb(0x197)],'offsetY':_0x4cc2b9['OffsetY'],'timeScale':_0x4cc2b9[_0x57bdcb(0x192)],'walkRate':0x1,'dashRate':0x1,'width':_0x4cc2b9[_0x57bdcb(0x108)],'height':_0x4cc2b9[_0x57bdcb(0x130)],'flipLeft':_0x4cc2b9['FlipLeft'],'flipRight':_0x4cc2b9[_0x57bdcb(0x176)],'animationNames':{'idle':_0x4cc2b9[_0x57bdcb(0x1a1)],'walk':_0x4cc2b9[_0x57bdcb(0x1ea)],'dash':_0x4cc2b9[_0x57bdcb(0x203)],'jump':_0x4cc2b9[_0x57bdcb(0xfa)],'ladderidle':_0x4cc2b9[_0x57bdcb(0x22f)],'ladderclimb':_0x4cc2b9[_0x57bdcb(0x1e9)],'ropeidle':_0x4cc2b9['RopeIdle'],'ropeclimb':_0x4cc2b9[_0x57bdcb(0x1eb)]}},this[_0x57bdcb(0x28e)]===undefined&&(this[_0x57bdcb(0x28e)]=0x0);},Game_CharacterBase['prototype'][_0x41a585(0x1c7)]=function(){},Game_CharacterBase[_0x41a585(0x2b8)][_0x41a585(0x16b)]=function(_0xc3d5){const _0x460e55=_0x41a585,_0x41549c=this[_0x460e55(0x1a9)]();_0xc3d5[_0x460e55(0x1ee)](/<DRAGONBONES SPRITE:[ ]*(.*)>/i)&&(_0x460e55(0x1ab)!==_0x460e55(0x28c)?_0x41549c['filename']=String(RegExp['$1'])[_0x460e55(0x26d)]():(_0x31f656['DragonbonesUnion'][_0x460e55(0x12b)][_0x460e55(0x13c)](this),this[_0x460e55(0x287)]()));_0xc3d5['match'](/<DRAGONBONES SPRITE (?:SKIN|NAME|FILENAME):[ ]*(.*)>/i)&&(_0x41549c['filename']=String(RegExp['$1'])['trim']());_0xc3d5[_0x460e55(0x1ee)](/<DRAGONBONES SPRITE[ ]SCALE:[ ](.*),[ ](.*)>/i)&&(_0x41549c[_0x460e55(0x102)]=Number(RegExp['$1']),_0x41549c[_0x460e55(0x27d)]=Number(RegExp['$2']));_0xc3d5[_0x460e55(0x1ee)](/<DRAGONBONES SPRITE[ ](?:SCALEX|SCALE X):[ ](.*)>/i)&&(_0x41549c[_0x460e55(0x102)]=Number(RegExp['$1']));_0xc3d5[_0x460e55(0x1ee)](/<DRAGONBONES SPRITE[ ](?:SCALEY|SCALE Y):[ ](.*)>/i)&&('RIauI'!==_0x460e55(0x1e4)?_0x41549c[_0x460e55(0x27d)]=Number(RegExp['$1']):this[_0x460e55(0x178)](_0x38a369));_0xc3d5[_0x460e55(0x1ee)](/<DRAGONBONES SPRITE[ ]OFFSET:[ ](.*),[ ](.*)>/i)&&(_0x41549c['offsetX']=Number(RegExp['$1']),_0x41549c['offsetY']=Number(RegExp['$2']));_0xc3d5[_0x460e55(0x1ee)](/<DRAGONBONES SPRITE[ ](?:OFFSETX|OFFSET X):[ ](.*)>/i)&&(_0x41549c[_0x460e55(0x252)]=Number(RegExp['$1']));_0xc3d5[_0x460e55(0x1ee)](/<DRAGONBONES SPRITE[ ](?:OFFSETY|OFFSET Y):[ ](.*)>/i)&&(_0x41549c[_0x460e55(0x244)]=Number(RegExp['$1']));_0xc3d5['match'](/<DRAGONBONES SPRITE[ ]SIZE:[ ](.*),[ ](.*)>/i)&&(_0x41549c[_0x460e55(0x2a8)]=Number(RegExp['$1']),_0x41549c['height']=Number(RegExp['$2']));_0xc3d5['match'](/<DRAGONBONES SPRITE[ ]WIDTH:[ ](.*)>/i)&&(_0x41549c['width']=Number(RegExp['$1']));_0xc3d5[_0x460e55(0x1ee)](/<DRAGONBONES SPRITE[ ]HEIGHT:[ ](.*)>/i)&&(_0x41549c['height']=Number(RegExp['$1']));_0xc3d5[_0x460e55(0x1ee)](/<DRAGONBONES SPRITE[ ](?:TIMESCALE|TIME SCALE):[ ](.*)>/i)&&(_0x460e55(0x258)!==_0x460e55(0x258)?_0xd8a539[_0x460e55(0x13d)]=_0x42ead2(_0x30d29b['$1']):_0x41549c['timeScale']=Number(RegExp['$1']));_0xc3d5[_0x460e55(0x1ee)](/<DRAGONBONES SPRITE[ ](?:WALK RATE|WALKING RATE):[ ](.*)>/i)&&(_0x41549c[_0x460e55(0x224)]=Number(RegExp['$1']));_0xc3d5[_0x460e55(0x1ee)](/<DRAGONBONES SPRITE[ ](?:DASH RATE|DASHING RATE):[ ](.*)>/i)&&(_0x41549c[_0x460e55(0x111)]=Number(RegExp['$1']));_0xc3d5['match'](/<DRAGONBONES SPRITE FLIP LEFT>/i)&&(_0x41549c[_0x460e55(0x29e)]=!![]);if(_0xc3d5[_0x460e55(0x1ee)](/<DRAGONBONES SPRITE NO FLIP LEFT>/i)){if(_0x460e55(0x2ba)!=='uytAS')_0x41549c['flipLeft']=![];else{if(_0x54aa1f['lastAnimationName']===_0x2ca3b3&&_0x4a594b[_0x460e55(0x172)][_0x32e7cd][_0x460e55(0x267)]<=0x0)return;_0x491756[_0x460e55(0x260)](_0x4068bf);}}_0xc3d5[_0x460e55(0x1ee)](/<DRAGONBONES SPRITE FLIP RIGHT>/i)&&(_0x41549c[_0x460e55(0x15c)]=!![]);if(_0xc3d5[_0x460e55(0x1ee)](/<DRAGONBONES SPRITE NO FLIP RIGHT>/i)){if(_0x460e55(0xf7)!=='RrpGu')_0x41549c[_0x460e55(0x15c)]=![];else{if([0x6c,0x198][_0x460e55(0x1ed)](_0x47b65b['code'])){if(_0x23833e!=='')_0x4ef883+='\x0a';_0x5c10d5+=_0x3b363b[_0x460e55(0x1d9)][0x0];}}}const _0xe28513=_0xc3d5['match'](/<DRAGONBONES SPRITE MOTION (.*):[ ](.*)>/gi);if(_0xe28513){if(_0x460e55(0x1f6)===_0x460e55(0x103)){_0xfba2f6=_0x1f9c6c[_0x460e55(0x193)]()[_0x460e55(0x26d)]();_0x5cc01a[_0x460e55(0x293)][_0x460e55(0x172)][_0x5521aa]&&(_0x5004ed['animation'][_0x460e55(0x172)][_0xd42531][_0x460e55(0x267)]=0x0);for(let _0xa4eb1e=0x1;_0xa4eb1e<=0x9;_0xa4eb1e++){const _0x3c7805=_0x2bd81d+_0xa4eb1e;_0x366306[_0x460e55(0x293)][_0x460e55(0x172)][_0x3c7805]&&(_0x1d795d[_0x460e55(0x293)]['animations'][_0x3c7805][_0x460e55(0x267)]=0x0);}}else for(const _0x34f2b1 of _0xe28513){if(_0x460e55(0x1bf)===_0x460e55(0x1bf)){_0x34f2b1[_0x460e55(0x1ee)](/<DRAGONBONES SPRITE MOTION (.*):[ ](.*)>/i);const _0x514d97=String(RegExp['$1'])[_0x460e55(0x193)]()[_0x460e55(0x26d)](),_0x173631=String(RegExp['$2'])[_0x460e55(0x193)]()[_0x460e55(0x26d)]();_0x41549c[_0x460e55(0x23c)][_0x514d97]=_0x173631;}else{if(!_0x1acf5e)return;_0x3c1a76[_0x460e55(0x1c5)](_0x208b5a,_0x11e12f);const _0x5540b8=_0x55804a[_0x460e55(0x21d)](_0x3ca190['ActorID']);if(!_0x5540b8)return;_0x5540b8[_0x460e55(0x10a)]={'battler':_0x425b8e[_0x460e55(0x191)],'scaleX':_0x17d3c8[_0x460e55(0x1a4)],'scaleY':_0x3512c9['ScaleY'],'offsetX':_0x324db5[_0x460e55(0x197)],'offsetY':_0x2fab5d[_0x460e55(0x277)],'timeScale':_0x3b5b91[_0x460e55(0x192)],'width':_0x5461b9['Width'],'height':_0x436719[_0x460e55(0x130)],'motion':{'walk':_0x11599e['MotionWalk'],'wait':_0x45ab66[_0x460e55(0x269)],'chant':_0x2c3d4a[_0x460e55(0xfb)],'guard':_0x2ffed5[_0x460e55(0x10f)],'damage':_0x1690f3[_0x460e55(0x13b)],'evade':_0x4498d3['MotionEvade'],'thrust':_0x3568a1['MotionThrust'],'swing':_0x3b2cc0['MotionSwing'],'missile':_0x100b00[_0x460e55(0x249)],'skill':_0x1c869d[_0x460e55(0x2bd)],'spell':_0x3509d1['MotionSpell'],'item':_0x17c304[_0x460e55(0x115)],'escape':_0x8bf262[_0x460e55(0x246)],'victory':_0xa45560['MotionVictory'],'dying':_0x218e89[_0x460e55(0x2a1)],'abnormal':_0x1d63e6[_0x460e55(0x166)],'sleep':_0x5e6ad5[_0x460e55(0x1fe)],'dead':_0x575569['MotionDead']}};}}}if(_0xc3d5['match'](/<DRAGONBONES SPRITE (?:SETTINGS|SETTING)>\s*([\s\S]*)\s*<\/DRAGONBONES SPRITE (?:SETTINGS|SETTING)>/i)){const _0x7f0011=String(RegExp['$1']);_0x7f0011['match'](/(?:SKIN|NAME|FILENAME):[ ]*(.*)/i)&&(_0x41549c[_0x460e55(0x1b1)]=String(RegExp['$1'])[_0x460e55(0x26d)]());_0x7f0011[_0x460e55(0x1ee)](/SCALE:[ ](.*),[ ](.*)/i)&&(_0x41549c['scaleX']=Number(RegExp['$1']),_0x41549c[_0x460e55(0x27d)]=Number(RegExp['$2']));_0x7f0011[_0x460e55(0x1ee)](/(?:SCALEX|SCALE X):[ ](.*)/i)&&(_0x41549c[_0x460e55(0x102)]=Number(RegExp['$1']));_0x7f0011[_0x460e55(0x1ee)](/(?:SCALEY|SCALE Y):[ ](.*)/i)&&(_0x41549c[_0x460e55(0x27d)]=Number(RegExp['$1']));_0x7f0011[_0x460e55(0x1ee)](/OFFSET:[ ](.*),[ ](.*)/i)&&(_0x41549c['offsetX']=Number(RegExp['$1']),_0x41549c[_0x460e55(0x244)]=Number(RegExp['$2']));_0x7f0011['match'](/(?:OFFSETX|OFFSET X):[ ](.*)/i)&&(_0x41549c[_0x460e55(0x252)]=Number(RegExp['$1']));_0x7f0011[_0x460e55(0x1ee)](/(?:OFFSETY|OFFSET Y):[ ](.*)/i)&&(_0x41549c[_0x460e55(0x244)]=Number(RegExp['$1']));_0x7f0011[_0x460e55(0x1ee)](/(?:TIMESCALE|TIME SCALE):[ ](.*)/i)&&(_0x460e55(0x161)==='xvfgI'?this[_0x460e55(0xee)]()[_0x460e55(0x10d)]():_0x41549c[_0x460e55(0x131)]=Number(RegExp['$1']));_0x7f0011['match'](/(?:WALK RATE|WALKING RATE):[ ](.*)/i)&&(_0x460e55(0x286)!==_0x460e55(0x29d)?_0x41549c[_0x460e55(0x224)]=Number(RegExp['$1']):(_0x242fce[_0x460e55(0x15e)]['Game_Enemy_setup'][_0x460e55(0x13c)](this,_0x4e5672,_0x11970c,_0xdafa80),this[_0x460e55(0x227)](),this['setupDragonbonesData']()));_0x7f0011['match'](/(?:DASH RATE|DASHING RATE):[ ](.*)/i)&&(_0x41549c[_0x460e55(0x111)]=Number(RegExp['$1']));_0x7f0011[_0x460e55(0x1ee)](/SIZE:[ ](.*),[ ](.*)/i)&&(_0x41549c[_0x460e55(0x2a8)]=Number(RegExp['$1']),_0x41549c[_0x460e55(0x13d)]=Number(RegExp['$2']));_0x7f0011[_0x460e55(0x1ee)](/WIDTH:[ ](.*)/i)&&(_0x41549c['width']=Number(RegExp['$1']));_0x7f0011['match'](/HEIGHT:[ ](.*)/i)&&(_0x41549c[_0x460e55(0x13d)]=Number(RegExp['$1']));_0x7f0011['match'](/NO FLIP LEFT/i)&&(_0x41549c[_0x460e55(0x29e)]=![]);_0x7f0011[_0x460e55(0x1ee)](/FLIP LEFT/i)&&('mZGZf'!==_0x460e55(0x253)?_0x41549c[_0x460e55(0x29e)]=!![]:_0x47e112[_0x460e55(0x1b1)]=_0x4f1884(_0x34863e['$1'])[_0x460e55(0x26d)]());_0x7f0011[_0x460e55(0x1ee)](/NO FLIP RIGHT/i)&&(_0x460e55(0x173)==='nAtWm'?_0x41549c['flipRight']=![]:_0x52e00b['scaleY']=_0x4d58cb(_0x15ae3b['$1']));_0x7f0011[_0x460e55(0x1ee)](/FLIP RIGHT/i)&&(_0x41549c['flipRight']=!![]);const _0x56c216=_0xc3d5[_0x460e55(0x1ee)](/(?:ANI|MOTION) (.*):[ ](.*)/gi);if(_0x56c216){if('LSaKm'===_0x460e55(0x21b))_0x52bc92(_0x460e55(0xf5)[_0x460e55(0x177)](_0x293974,_0x4dd74f,_0x372d7c)),_0x1cfc0b[_0x460e55(0x1dd)]();else for(const _0x5e42af of _0x56c216){if(_0x460e55(0x162)===_0x460e55(0x2c3))this[_0x460e55(0x117)]=_0x363478,this['playDragonbonesAnimation']();else{_0x5e42af[_0x460e55(0x1ee)](/(?:ANI|MOTION) (.*):[ ](.*)/i);const _0x521af6=String(RegExp['$1'])[_0x460e55(0x193)]()[_0x460e55(0x26d)](),_0x5eca9a=String(RegExp['$2'])[_0x460e55(0x193)]()[_0x460e55(0x26d)]();_0x41549c['animationNames'][_0x521af6]=_0x5eca9a;}}}}},Game_CharacterBase['prototype'][_0x41a585(0x1a9)]=function(){const _0x446c76=_0x41a585;if(this[_0x446c76(0x2bf)]!==undefined)return this[_0x446c76(0x2bf)];return this['initDragonbonesData'](),this[_0x446c76(0x1c7)](),this[_0x446c76(0x2bf)];},Game_CharacterBase[_0x41a585(0x2b8)][_0x41a585(0x297)]=function(){const _0x4e1a34=_0x41a585;return this[_0x4e1a34(0x1a9)]()['filename']!=='';},Game_CharacterBase['prototype'][_0x41a585(0x1a5)]=function(_0x375988){const _0x4244cf=_0x41a585,_0x5e6f54=this[_0x4244cf(0x1a9)]();if(!_0x375988)return _0x5e6f54['animationNames'][_0x4244cf(0x298)];_0x5e6f54[_0x4244cf(0x293)]=_0x5e6f54[_0x4244cf(0x293)][_0x4244cf(0x193)]()[_0x4244cf(0x26d)]();if(_0x5e6f54[_0x4244cf(0x293)]!==''&&_0x375988[_0x4244cf(0x293)]['animations'][_0x5e6f54[_0x4244cf(0x293)]])return _0x5e6f54[_0x4244cf(0x293)];let _0xd1b081=[];if(this[_0x4244cf(0x238)]())_0x4244cf(0x230)!=='RaHIg'?(_0xd1b081=_0xd1b081[_0x4244cf(0x1fd)](this['addDragonbonesAnimationDirections'](_0x5e6f54[_0x4244cf(0x23c)][_0x4244cf(0x21f)])),_0xd1b081=_0xd1b081[_0x4244cf(0x1fd)](this[_0x4244cf(0x288)](_0x5e6f54[_0x4244cf(0x23c)][_0x4244cf(0x215)]))):_0x58dc2e['scaleY']=_0x5fad9b(_0x3824b6['$1']);else{if(this[_0x4244cf(0x22e)]()&&!this[_0x4244cf(0x238)]())Imported[_0x4244cf(0x1a8)]&&this[_0x4244cf(0x29b)]()?(this[_0x4244cf(0x28e)]>0x0&&(_0xd1b081[_0x4244cf(0x132)](_0x5e6f54[_0x4244cf(0x23c)][_0x4244cf(0x122)]),_0xd1b081[_0x4244cf(0x132)](_0x5e6f54['animationNames']['ladderclimb']),_0xd1b081=_0xd1b081['concat'](this[_0x4244cf(0x288)](_0x5e6f54[_0x4244cf(0x23c)][_0x4244cf(0x215)]))),_0xd1b081['push'](_0x5e6f54[_0x4244cf(0x23c)][_0x4244cf(0x29f)]),_0xd1b081[_0x4244cf(0x132)](_0x5e6f54['animationNames'][_0x4244cf(0x1de)])):(this[_0x4244cf(0x28e)]>0x0&&(_0x4244cf(0x1fc)!==_0x4244cf(0x1fc)?_0x4ac209[_0x4244cf(0x15c)]=![]:(_0xd1b081['push'](_0x5e6f54[_0x4244cf(0x23c)][_0x4244cf(0x104)]),_0xd1b081=_0xd1b081[_0x4244cf(0x1fd)](this['addDragonbonesAnimationDirections'](_0x5e6f54['animationNames'][_0x4244cf(0x215)])))),_0xd1b081[_0x4244cf(0x132)](_0x5e6f54['animationNames'][_0x4244cf(0x1de)]));else this['_dragonbonesMoveTimer']>0x0&&(this['isDashing']()&&(_0xd1b081=_0xd1b081[_0x4244cf(0x1fd)](this['addDragonbonesAnimationDirections'](_0x5e6f54[_0x4244cf(0x23c)][_0x4244cf(0x14b)]))),_0xd1b081=_0xd1b081[_0x4244cf(0x1fd)](this[_0x4244cf(0x288)](_0x5e6f54[_0x4244cf(0x23c)][_0x4244cf(0x215)])));}_0xd1b081=_0xd1b081[_0x4244cf(0x1fd)](this[_0x4244cf(0x288)](_0x5e6f54['animationNames']['idle']));for(const _0x363d64 of _0xd1b081){if(_0x375988['animation'][_0x4244cf(0x172)][_0x363d64])return _0x363d64;}return _0x5e6f54[_0x4244cf(0x23c)][_0x4244cf(0x298)];},Game_CharacterBase[_0x41a585(0x2b8)]['addDragonbonesAnimationDirections']=function(_0x3780b2){const _0x2ddc0b=_0x41a585,_0x3039e3=this['dragonbonesSpriteData'](),_0x518188=this[_0x2ddc0b(0x231)]();let _0x4a35f2=[];_0x4a35f2[_0x2ddc0b(0x132)](_0x3780b2+_0x518188);if(_0x518188===0x1){_0x4a35f2[_0x2ddc0b(0x132)](_0x3780b2+0x4);if(_0x3039e3[_0x2ddc0b(0x29e)])_0x4a35f2[_0x2ddc0b(0x132)](_0x3780b2+0x6);_0x4a35f2[_0x2ddc0b(0x132)](_0x3780b2+0x2);}if(_0x518188===0x3){if(_0x2ddc0b(0x16d)!==_0x2ddc0b(0x16d))while(_0x4d9d14[_0x2ddc0b(0x23f)][_0x2ddc0b(0x154)]>0x0){const _0x547129=_0x42d9ea[_0x2ddc0b(0x23f)][_0x2ddc0b(0x28f)]();if(_0x547129)_0x547129(this);}else{_0x4a35f2[_0x2ddc0b(0x132)](_0x3780b2+0x6);if(_0x3039e3[_0x2ddc0b(0x15c)])_0x4a35f2[_0x2ddc0b(0x132)](_0x3780b2+0x4);_0x4a35f2['push'](_0x3780b2+0x2);}}if(_0x518188===0x7){if(_0x2ddc0b(0x226)!=='rljvk')return this[_0x2ddc0b(0xee)]()&&this[_0x2ddc0b(0x16c)]()[_0x2ddc0b(0xee)]!=='';else{_0x4a35f2[_0x2ddc0b(0x132)](_0x3780b2+0x4);if(_0x3039e3['flipLeft'])_0x4a35f2[_0x2ddc0b(0x132)](_0x3780b2+0x6);_0x4a35f2[_0x2ddc0b(0x132)](_0x3780b2+0x8);}}if(_0x518188===0x9){_0x4a35f2[_0x2ddc0b(0x132)](_0x3780b2+0x6);if(_0x3039e3['flipRight'])_0x4a35f2[_0x2ddc0b(0x132)](_0x3780b2+0x4);_0x4a35f2[_0x2ddc0b(0x132)](_0x3780b2+0x8);}return _0x4a35f2[_0x2ddc0b(0x132)](_0x3780b2),_0x4a35f2;},VisuMZ[_0x41a585(0x15e)]['Game_CharacterBase_update']=Game_CharacterBase[_0x41a585(0x2b8)]['update'],Game_CharacterBase[_0x41a585(0x2b8)][_0x41a585(0x18c)]=function(){const _0xafb127=_0x41a585;VisuMZ[_0xafb127(0x15e)]['Game_CharacterBase_update'][_0xafb127(0x13c)](this),this['updateDragonbonesUnion']();},Game_CharacterBase[_0x41a585(0x2b8)]['updateDragonbonesUnion']=function(){const _0x49f1a2=_0x41a585;if(!this[_0x49f1a2(0x297)]())return;if(this[_0x49f1a2(0x22a)]()){if('pNJFO'===_0x49f1a2(0x2ad))this[_0x49f1a2(0x28e)]=VisuMZ['DragonbonesUnion'][_0x49f1a2(0x1db)]['MapSprite']['WalkTimer'];else return![];}else this[_0x49f1a2(0x28e)]--;},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x20c)]=Game_Player['prototype']['refresh'],Game_Player[_0x41a585(0x2b8)][_0x41a585(0x28a)]=function(){const _0x4e0e2a=_0x41a585;VisuMZ['DragonbonesUnion'][_0x4e0e2a(0x20c)][_0x4e0e2a(0x13c)](this),this[_0x4e0e2a(0x1c7)]();},Game_Player['prototype'][_0x41a585(0x1c7)]=function(){const _0x485eab=_0x41a585,_0x42b2bb=$gameParty[_0x485eab(0x1cf)]();if(!_0x42b2bb)this[_0x485eab(0x227)]();else{if(_0x485eab(0x2a4)==='mPHYw'){if(!this[_0x485eab(0xef)])return;const _0x2ffaaa=this['picture']()[_0x485eab(0x16c)]();this[_0x485eab(0x117)]!==_0x2ffaaa[_0x485eab(0x293)]&&(this['_dragonbonesAnimation']=_0x2ffaaa[_0x485eab(0x293)],this[_0x485eab(0x11a)]());}else this[_0x485eab(0x2bf)]=_0x42b2bb[_0x485eab(0x1a9)]();}},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x243)]=Game_Follower['prototype'][_0x41a585(0x28a)],Game_Follower[_0x41a585(0x2b8)]['refresh']=function(){const _0x4af74f=_0x41a585;VisuMZ['DragonbonesUnion']['Game_Follower_refresh']['call'](this),this[_0x4af74f(0x1c7)]();},Game_Follower[_0x41a585(0x2b8)][_0x41a585(0x1c7)]=function(){const _0x4708f0=_0x41a585,_0x12f2f0=this[_0x4708f0(0x21d)]();!_0x12f2f0?this[_0x4708f0(0x227)]():this[_0x4708f0(0x2bf)]=_0x12f2f0['dragonbonesSpriteData']();},Game_Actor['prototype'][_0x41a585(0x227)]=function(){const _0x3cce62=_0x41a585;Game_BattlerBase[_0x3cce62(0x2b8)][_0x3cce62(0x227)][_0x3cce62(0x13c)](this),Game_CharacterBase[_0x3cce62(0x2b8)]['initDragonbonesData'][_0x3cce62(0x13c)](this);},Game_Actor['prototype'][_0x41a585(0x1c7)]=function(){const _0x1b51f6=_0x41a585;Game_BattlerBase[_0x1b51f6(0x2b8)][_0x1b51f6(0x1c7)][_0x1b51f6(0x13c)](this);const _0x18be58=this['actor']()[_0x1b51f6(0xfe)];Game_CharacterBase['prototype'][_0x1b51f6(0x16b)][_0x1b51f6(0x13c)](this,_0x18be58);},Game_Actor[_0x41a585(0x2b8)]['dragonbonesSpriteData']=function(){const _0x482dd1=_0x41a585;if(this[_0x482dd1(0x2bf)]!==undefined)return this[_0x482dd1(0x2bf)];return this[_0x482dd1(0x227)](),this['setupDragonbonesData'](),this[_0x482dd1(0x2bf)];},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x1b7)]=Game_Event['prototype'][_0x41a585(0x1d7)],Game_Event[_0x41a585(0x2b8)]['clearPageSettings']=function(){const _0x3396ab=_0x41a585;VisuMZ['DragonbonesUnion'][_0x3396ab(0x1b7)]['call'](this),this['initDragonbonesData']();},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x175)]=Game_Event[_0x41a585(0x2b8)]['setupPageSettings'],Game_Event['prototype'][_0x41a585(0x17e)]=function(){const _0x480694=_0x41a585;VisuMZ['DragonbonesUnion'][_0x480694(0x175)][_0x480694(0x13c)](this),this['initDragonbonesData'](),this['setupDragonbonesData']();},Game_Event['prototype'][_0x41a585(0x1c7)]=function(){const _0x2debad=_0x41a585;this[_0x2debad(0x19d)](),this[_0x2debad(0xed)]();},Game_Event[_0x41a585(0x2b8)][_0x41a585(0x19d)]=function(){const _0xf06208=_0x41a585;if(!this[_0xf06208(0x1bc)]())return;const _0x46f3eb=this[_0xf06208(0x1bc)]()[_0xf06208(0xfe)];if(_0x46f3eb==='')return;this['checkDragonbonesStringTags'](_0x46f3eb);},Game_Event[_0x41a585(0x2b8)][_0x41a585(0xed)]=function(){const _0x42e207=_0x41a585;if(!this['event']())return;if(!this[_0x42e207(0x20a)]())return;const _0x395e5=this[_0x42e207(0x159)]();let _0x3a2b4d='';for(const _0x1b1e6b of _0x395e5){if([0x6c,0x198][_0x42e207(0x1ed)](_0x1b1e6b[_0x42e207(0x183)])){if(_0x3a2b4d!=='')_0x3a2b4d+='\x0a';_0x3a2b4d+=_0x1b1e6b[_0x42e207(0x1d9)][0x0];}}this[_0x42e207(0x16b)](_0x3a2b4d);},VisuMZ[_0x41a585(0x15e)][_0x41a585(0x213)]=Game_Interpreter[_0x41a585(0x2b8)][_0x41a585(0x209)],Game_Interpreter[_0x41a585(0x2b8)][_0x41a585(0x209)]=function(_0x11251b){const _0x5f5296=_0x41a585;return $gameTemp[_0x5f5296(0x27e)](this),VisuMZ[_0x5f5296(0x15e)][_0x5f5296(0x213)][_0x5f5296(0x13c)](this,_0x11251b);},VisuMZ['DragonbonesUnion']['Sprite_Character_initialize']=Sprite_Character[_0x41a585(0x2b8)][_0x41a585(0x17c)],Sprite_Character[_0x41a585(0x2b8)][_0x41a585(0x17c)]=function(_0x4dbb01){const _0x467783=_0x41a585;this[_0x467783(0x227)](),VisuMZ['DragonbonesUnion']['Sprite_Character_initialize'][_0x467783(0x13c)](this,_0x4dbb01),this[_0x467783(0x1a2)]();},Sprite_Character[_0x41a585(0x2b8)][_0x41a585(0x227)]=function(){const _0x1659c1=_0x41a585;this[_0x1659c1(0xef)]=null,this[_0x1659c1(0x1fa)]='',this[_0x1659c1(0x117)]='';},Sprite_Character[_0x41a585(0x2b8)][_0x41a585(0x1a2)]=function(){const _0x3ae6fb=_0x41a585;this[_0x3ae6fb(0x195)]=new Sprite(),this[_0x3ae6fb(0x107)](this['_baseDragonbonesSprite']);},VisuMZ['DragonbonesUnion'][_0x41a585(0x12b)]=Sprite_Character[_0x41a585(0x2b8)][_0x41a585(0x295)],Sprite_Character[_0x41a585(0x2b8)]['updateBitmap']=function(){const _0x461f70=_0x41a585;VisuMZ[_0x461f70(0x15e)]['Sprite_Character_updateBitmap'][_0x461f70(0x13c)](this),this['updateDragonbones']();},Sprite_Character[_0x41a585(0x2b8)][_0x41a585(0x18b)]=function(){const _0x1992cf=_0x41a585;this['_dragonbones']&&(this[_0x1992cf(0x195)][_0x1992cf(0x2b9)](this[_0x1992cf(0xef)]),this[_0x1992cf(0xef)][_0x1992cf(0x228)](),this['_dragonbones']=null,this[_0x1992cf(0x1fa)]='',this[_0x1992cf(0x117)]='');},Sprite_Character[_0x41a585(0x2b8)]['updateDragonbones']=function(){const _0x515a49=_0x41a585;if(!this[_0x515a49(0x181)])return this[_0x515a49(0x18b)]();if(!this[_0x515a49(0x181)][_0x515a49(0x297)]())return this[_0x515a49(0x18b)]();this['updateDragonbonesArmature']();if(!this[_0x515a49(0xef)])return;this[_0x515a49(0x223)](),this['updateDragonbonesProperties'](),this[_0x515a49(0x179)]();},Sprite_Character[_0x41a585(0x2b8)][_0x41a585(0x157)]=function(){const _0x4be0b5=_0x41a585,_0x385b25=this[_0x4be0b5(0x181)]['dragonbonesSpriteData']();if(this[_0x4be0b5(0x1fa)]===_0x385b25[_0x4be0b5(0x1b1)])return;this[_0x4be0b5(0x18b)](),this[_0x4be0b5(0x1fa)]=_0x385b25[_0x4be0b5(0x1b1)],DragonbonesManager[_0x4be0b5(0x296)](_0x385b25[_0x4be0b5(0x1b1)],this[_0x4be0b5(0x14e)]['bind'](this));},Sprite_Character[_0x41a585(0x2b8)][_0x41a585(0x14e)]=function(){const _0x568b91=_0x41a585,_0x141892=this[_0x568b91(0x181)][_0x568b91(0x1a9)]();this['_dragonbones']=DragonbonesManager[_0x568b91(0x148)](_0x141892[_0x568b91(0x1b1)]),this[_0x568b91(0x223)](),setTimeout(this[_0x568b91(0x200)][_0x568b91(0x1d8)](this),0x0);},Sprite_Character[_0x41a585(0x2b8)]['addDragonbonesChild']=function(){const _0x4b227c=_0x41a585;if(!this[_0x4b227c(0xef)])return;if(!this[_0x4b227c(0x195)])return;this[_0x4b227c(0x195)][_0x4b227c(0x1ae)](this['_dragonbones'],0x0);},Sprite_Character[_0x41a585(0x2b8)][_0x41a585(0x223)]=function(){const _0xb0f0e9=_0x41a585;if(!this['_dragonbones'])return;const _0x7c0784=this[_0xb0f0e9(0x181)][_0xb0f0e9(0x1a9)](),_0x2e2213=this[_0xb0f0e9(0xef)][_0xb0f0e9(0x293)];_0x2e2213['isCompleted']&&(this[_0xb0f0e9(0x181)]['dragonbonesAnimation']='',this[_0xb0f0e9(0x117)]='',_0x2e2213['lastAnimationName']='');const _0x5bed8a=this[_0xb0f0e9(0x181)]['currentDragonbonesAnimation'](this[_0xb0f0e9(0xef)]);this[_0xb0f0e9(0x117)]!==_0x5bed8a&&(_0xb0f0e9(0x106)==='rKldl'?(this[_0xb0f0e9(0x117)]=_0x5bed8a,this[_0xb0f0e9(0x11a)]()):(this[_0xb0f0e9(0x195)]=new _0x49ded1(),this[_0xb0f0e9(0x107)](this['_baseDragonbonesSprite'])));},Sprite_Character[_0x41a585(0x2b8)][_0x41a585(0x11a)]=function(){const _0x89f88c=_0x41a585;if(!this['_dragonbones'])return;const _0x3ff448=this[_0x89f88c(0xef)][_0x89f88c(0x293)],_0xd362fa=this[_0x89f88c(0x117)]['toLowerCase']()[_0x89f88c(0x26d)]();if(_0x3ff448[_0x89f88c(0x172)][_0xd362fa]){if(_0x3ff448[_0x89f88c(0x254)]===_0xd362fa&&_0x3ff448[_0x89f88c(0x172)][_0xd362fa][_0x89f88c(0x267)]<=0x0)return;_0x3ff448[_0x89f88c(0x260)](_0xd362fa);}},Sprite_Character[_0x41a585(0x2b8)][_0x41a585(0x12d)]=function(){const _0x31a2aa=_0x41a585;if(!this[_0x31a2aa(0xef)])return;const _0x26afbb=this[_0x31a2aa(0x181)][_0x31a2aa(0x1a9)]();this[_0x31a2aa(0xef)]['x']=_0x26afbb[_0x31a2aa(0x252)],this[_0x31a2aa(0xef)]['y']=_0x26afbb[_0x31a2aa(0x244)],this['_dragonbones'][_0x31a2aa(0xf2)]['x']=_0x26afbb[_0x31a2aa(0x102)]*this[_0x31a2aa(0x245)](),this['_dragonbones'][_0x31a2aa(0xf2)]['y']=_0x26afbb['scaleY'];},Sprite_Character['prototype'][_0x41a585(0x245)]=function(){const _0x4a5bc3=_0x41a585,_0x446e16=this[_0x4a5bc3(0x181)][_0x4a5bc3(0x1a9)]();this['_dragonbonesFlipDirection']=this[_0x4a5bc3(0x232)]||0x1;if(_0x446e16[_0x4a5bc3(0x29e)]&&[0x1,0x4,0x7][_0x4a5bc3(0x1ed)](this[_0x4a5bc3(0x181)][_0x4a5bc3(0x231)]()))'tEXZV'===_0x4a5bc3(0x25e)?_0x1088a9['play'](_0x38ac87):this['_dragonbonesFlipDirection']=-0x1;else{if(_0x446e16[_0x4a5bc3(0x15c)]&&[0x9,0x6,0x3][_0x4a5bc3(0x1ed)](this[_0x4a5bc3(0x181)][_0x4a5bc3(0x231)]())){if(_0x4a5bc3(0x143)===_0x4a5bc3(0x143))this[_0x4a5bc3(0x232)]=-0x1;else return this['dragonbonesSpriteData']()[_0x4a5bc3(0x293)];}else![0x8,0x2][_0x4a5bc3(0x1ed)](this['_character'][_0x4a5bc3(0x231)]())&&(this[_0x4a5bc3(0x232)]=0x1);}return this[_0x4a5bc3(0x232)];},Sprite_Character[_0x41a585(0x2b8)]['updateDragonbonesTimeScale']=function(){const _0x129b6b=_0x41a585;if(!this[_0x129b6b(0xef)])return;const _0x59be79=this['_character'][_0x129b6b(0x1a9)]();let _0x2972de=_0x59be79[_0x129b6b(0x131)];this[_0x129b6b(0x181)][_0x129b6b(0x22a)]()&&(_0x2972de*=this[_0x129b6b(0x181)][_0x129b6b(0x1d6)](),this[_0x129b6b(0x181)]['isDashing']()?_0x129b6b(0x211)!==_0x129b6b(0x211)?this['playDragonbonesMotion'](_0x129b6b(0x298)):_0x2972de*=_0x59be79['dashRate']:_0x2972de*=_0x59be79[_0x129b6b(0x224)]),this[_0x129b6b(0xef)][_0x129b6b(0x293)][_0x129b6b(0x131)]=_0x2972de;},VisuMZ['DragonbonesUnion']['Sprite_Character_updateCharacterFrame']=Sprite_Character['prototype'][_0x41a585(0x18a)],Sprite_Character['prototype'][_0x41a585(0x18a)]=function(){const _0x376ca7=_0x41a585;this['_character']&&this['_character'][_0x376ca7(0x297)]()?_0x376ca7(0x262)===_0x376ca7(0x290)?this['initDragonbonesData']():this[_0x376ca7(0x270)]():_0x376ca7(0x1f9)===_0x376ca7(0x1d0)?_0x304c8f['scaleX']=_0x5eba97(_0x43c81f['$1']):VisuMZ[_0x376ca7(0x15e)][_0x376ca7(0x239)][_0x376ca7(0x13c)](this);},Sprite_Character[_0x41a585(0x2b8)][_0x41a585(0x270)]=function(){const _0x2ffed3=_0x41a585,_0x466952=this[_0x2ffed3(0x181)][_0x2ffed3(0x1a9)](),_0x36f560=_0x466952[_0x2ffed3(0x13d)];this[_0x2ffed3(0x100)](0x0,0x0,0x0,_0x36f560);};
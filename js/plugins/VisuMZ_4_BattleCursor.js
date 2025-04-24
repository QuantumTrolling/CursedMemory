//=============================================================================
// VisuStella MZ - Battle Cursor
// VisuMZ_4_BattleCursor.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_BattleCursor = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCursor = VisuMZ.BattleCursor || {};
VisuMZ.BattleCursor.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.03] [BattleCursor]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Cursor_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you to set custom cursors when selecting allies and/or
 * enemies for targeting while in battle. This is to help with better visual
 * cues when picking a target if the flashing battler isn't enough.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Use icons, pictures, or system images as battle cursors for selected
 *   actors and enemies.
 * * Decide on how the cursor is anchored and positioned with offsets to fine
 *   tune its location.
 * * Want to animate the cursor? You can do so by following a specific image
 *   format and name schema.
 * * Oscillate the cursor back and forth from a left to right horizontal bounce
 *   or an up to down vertical bounce. Or if you want, just don't have any kind
 *   of oscillation at all!
 * * Customize the battle cursor to appear differently for various actors
 *   and/or enemies through notetags!
 * * Alter the battle cursor mid-battle through Plugin Commands, too!
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Animated Battle Cursor Instructions
 * ============================================================================
 *
 * Save your animated picture into your game project's img/pictures/ folder or
 * the img/system/ folder depending on which you want to load from.
 * 
 * The filename must be named with the following format:
 *
 * filename[HxV]
 *
 * Replace H in the filename with the number of horizontal cells it has.
 * Replace V in the filename with the number of vertical cells it has.
 * The number of total cells it has available is equal the multiplicative
 * product of the horizontal and vertical cells.
 *
 * For example:
 *
 * "Cursor_Blue[3x2]" will have 3 horizontal cells and 2 vertical cells. This
 * means there are a total of 6 cells that will be used for animating.
 *
 * Animations will be played from left to right, then up to down so please
 * arrange them as such. For example, 4x5 will play like this:
 *
 *  1  2  3  4
 *  5  6  7  8
 *  9 10 11 12
 * 13 14 15 16
 * 17 18 19 20
 *
 * Keep this in mind as you format your animated battle selection cursors.
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
 * === Cursor Appearance-Related Notetags ===
 * 
 * ---
 *
 * <Battle Cursor Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the battle select cursor into the specific icon.
 * - Replace 'x' with the icon index you wish to use.
 *
 * ---
 *
 * <Battle Cursor Picture: filename>
 * <Battle Cursor System: filename>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the battle select cursor into the specific image.
 * - The 'Picture' variant loads images from img/pictures/.
 * - The 'System' variant loads images from img/system/.
 * - Replace 'filename' with the filename of the image found in the specific
 *   target folder.
 *   - Do not include the file extension.
 *
 * ---
 *
 * <Battle Cursor Frame Delay: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - If using a 'picture' or 'system' image that has the animated format, you
 *   can adjust how much delay there is between each animated frame.
 * - Replace 'x' with a number representing the delay between frames.
 *   Lower is faster. Higher is slower.
 *
 * ---
 * 
 * === Cursor Location-Related Notetags ===
 * 
 * ---
 *
 * <Battle Cursor Anchor X: Left>
 * <Battle Cursor Anchor X: Center>
 * <Battle Cursor Anchor X: Right>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the origin/anchor X location of the battle cursor sprite for
 *   this specific actor/enemy.
 * 
 * ---
 *
 * <Battle Cursor Anchor Y: Top>
 * <Battle Cursor Anchor Y: Middle>
 * <Battle Cursor Anchor Y: Bottom>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the origin/anchor Y location of the battle cursor sprite for
 *   this specific actor/enemy.
 *
 * ---
 *
 * <Battle Cursor Position X: Left>
 * <Battle Cursor Position X: Center>
 * <Battle Cursor Position X: Right>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the position X location of where the battle cursor sprite
 *   appears on the actor or enemy sprite when targeting them.
 * 
 * ---
 *
 * <Battle Cursor Position Y: Top>
 * <Battle Cursor Position Y: Middle>
 * <Battle Cursor Position Y: Bottom>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the position Y location of where the battle cursor sprite
 *   appears on the actor or enemy sprite when targeting them.
 *
 * ---
 *
 * <Battle Cursor Offset X: +x>
 * <Battle Cursor Offset X: -x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Offsets the X position of the battle cursor sprite by pixels.
 * - Replace 'x' with a number representing the pixels to offset the battle
 *   cursor sprite by.
 *   - Negative numbers go left.
 *   - Positive numbers go right.
 *
 * ---
 *
 * <Battle Cursor Offset Y: +y>
 * <Battle Cursor Offset Y: -y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Offsets the Y position of the battle cursor sprite by pixels.
 * - Replace 'y' with a number representing the pixels to offset the battle
 *   cursor sprite by.
 *   - Negative numbers go up.
 *   - Positive numbers go down.
 *
 * ---
 *
 * === Cursor Wave-Related Notetags ===
 * 
 * ---
 *
 * <Battle Cursor No Wave>
 *
 * - Used for: Actor, Enemy Notetags
 * - Removes any oscillation from the battle cursor.
 *
 * ---
 *
 * <Battle Cursor Horizontal Wave: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - The battle cursor will oscillate back and forth horizontally from the
 *   left to the right.
 * - Replace 'x' with a number representing the pixel distance to oscillate.
 *
 * ---
 *
 * <Battle Cursor Vertical Wave: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - The battle cursor will oscillate back and forth vertically from the
 *   top to the bottom.
 * - Replace 'x' with a number representing the pixel distance to oscillate.
 *
 * ---
 *
 * <Battle Cursor Wave Speed: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Select how fast the cursor oscillates.
 * - Lower is slower. Higher is faster.
 * - Replace 'x' with a number representing the speed at which the cursor will
 *   oscillate at.
 * - Use decimal values between 0 and 1 for the best results.
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
 * === Battle Cursor Plugin Commands ===
 * 
 * ---
 *
 * Battle Cursor: Change Actor Cursor
 * - Change target actor's battle cursor settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *
 *     Icon Index:
 *     - If "icon" is selected as the appearance type, use this icon as
 *       the cursor.
 *
 *     Picture Filename:
 *     - If "picture" is selected as the appearance type, use this image from
 *       img/pictures/ as the cursor.
 *
 *     System Filename:
 *     - If "system" is selected as the appearance type, use this image from
 *       img/system/ as the cursor.
 *
 *     Frame Delay:
 *     - The frame delay for any animated "picture" or "system" cursors before
 *       moving onto the next frame.
 * 
 *   Anchor:
 *
 *     Anchor X:
 *     Anchor Y:
 *     - Select the position to determine where the cursor's Anchor
 *       is located.
 * 
 *   Position:
 *
 *     Position X:
 *     Position Y:
 *     - Select the placement to determine where the cursor's Position
 *       is located.
 * 
 *   Offset:
 * 
 *     Offset X:
 *     Offset Y:
 *     - Select how much to offset the cursor's X/Y position by.
 * 
 *   Wave:
 * 
 *     Wave Type:
 *     - Determine how the cursor moves while active.
 * 
 *     Speed:
 *     - Select how fast the cursor oscillates.
 *     - Lower is slower. Higher is faster.
 * 
 *     Distance:
 *     - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * Battle Cursor: Change Party Member Cursor
 * - Change target party member's battle cursor settings.
 *
 *   Party Index(es):
 *   - Select which party member index(es) to affect.
 *
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *
 *     Icon Index:
 *     - If "icon" is selected as the appearance type, use this icon as
 *       the cursor.
 *
 *     Picture Filename:
 *     - If "picture" is selected as the appearance type, use this image from
 *       img/pictures/ as the cursor.
 *
 *     System Filename:
 *     - If "system" is selected as the appearance type, use this image from
 *       img/system/ as the cursor.
 *
 *     Frame Delay:
 *     - The frame delay for any animated "picture" or "system" cursors before
 *       moving onto the next frame.
 * 
 *   Anchor:
 *
 *     Anchor X:
 *     Anchor Y:
 *     - Select the position to determine where the cursor's Anchor
 *       is located.
 * 
 *   Position:
 *
 *     Position X:
 *     Position Y:
 *     - Select the placement to determine where the cursor's Position
 *       is located.
 * 
 *   Offset:
 * 
 *     Offset X:
 *     Offset Y:
 *     - Select how much to offset the cursor's X/Y position by.
 * 
 *   Wave:
 * 
 *     Wave Type:
 *     - Determine how the cursor moves while active.
 * 
 *     Speed:
 *     - Select how fast the cursor oscillates.
 *     - Lower is slower. Higher is faster.
 * 
 *     Distance:
 *     - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * Battle Cursor: Change Enemy Member Cursor
 * - Change target enemy's battle cursor settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy troop index(es) to affect.
 *
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *
 *     Icon Index:
 *     - If "icon" is selected as the appearance type, use this icon as
 *       the cursor.
 *
 *     Picture Filename:
 *     - If "picture" is selected as the appearance type, use this image from
 *       img/pictures/ as the cursor.
 *
 *     System Filename:
 *     - If "system" is selected as the appearance type, use this image from
 *       img/system/ as the cursor.
 *
 *     Frame Delay:
 *     - The frame delay for any animated "picture" or "system" cursors before
 *       moving onto the next frame.
 * 
 *   Anchor:
 *
 *     Anchor X:
 *     Anchor Y:
 *     - Select the position to determine where the cursor's Anchor
 *       is located.
 * 
 *   Position:
 *
 *     Position X:
 *     Position Y:
 *     - Select the placement to determine where the cursor's Position
 *       is located.
 * 
 *   Offset:
 * 
 *     Offset X:
 *     Offset Y:
 *     - Select how much to offset the cursor's X/Y position by.
 * 
 *   Wave:
 * 
 *     Wave Type:
 *     - Determine how the cursor moves while active.
 * 
 *     Speed:
 *     - Select how fast the cursor oscillates.
 *     - Lower is slower. Higher is faster.
 * 
 *     Distance:
 *     - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor and Enemy Cursor Settings
 * ============================================================================
 *
 * These are the default battle select cursor settings for actors and enemies.
 * All actors will have the same settings as one another unless notetags are
 * used to customize their settings. The same goes for enemies.
 *
 * ---
 *
 * Appearance Type
 * 
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *     - Icon - Uses an icon as the cursor
 *     - Picture - Uses a file from img/pictures/ as the cursor
 *     - System - Uses a file from img/system/ as the cursor
 * 
 *   Icon Index:
 *   - If "icon" is selected as the appearance type, use this icon as
 *     the cursor.
 * 
 *   Picture Filename:
 *   - If "picture" is selected as the appearance type, use this image from
 *     img/pictures/ as the cursor.
 * 
 *   System Filename:
 *   - If "system" is selected as the appearance type, use this image from
 *     img/system/ as the cursor.
 * 
 *   Frame Delay:
 *   - The frame delay for any animated "picture" or "system" cursors before
 *     moving onto the next frame.
 *
 * ---
 *
 * Anchor
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Select the position to determine where the cursor's Anchor X/Y
 *     is located.
 *
 * ---
 *
 * Position
 * 
 *   Position X:
 *   Position Y:
 *   - Select the placement to determine where the cursor's Position X/Y
 *     is located.
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   Offset Y:
 *   - Select how much to offset the cursor's X position by.
 *     - X: Negative numbers go left. Positive numbers go right.
 *     - Y: Negative numbers go up. Positive numbers go down.
 *
 * ---
 *
 * Wave
 * 
 *   Wave Type:
 *   - Determine how the cursor moves while active.
 *     - Horizontal - Cursor oscillates left and right
 *     - Vertical - Cursor oscillates up and down
 *     - None - Cursor does not oscillate.
 * 
 *   Speed:
 *   - Select how fast the cursor oscillates.
 *   - Lower is slower. Higher is faster.
 * 
 *   Distance:
 *   - Select how far the cursor sprite will oscillate from its origin.
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
 * Version 1.03: December 30, 2021
 * * Compatibility Update!
 * ** Updated better compatibility with Battle Core's most recent changes.
 *    Tints should no longer affect the Battle Cursor.
 * 
 * Version 1.02: June 11, 2021
 * * Bug Fixes!
 * ** Battle Cursor now properly aligns itself when target battlers are not
 *    scaled properly and/or hovering. Fix made by Olivia.
 * 
 * Version 1.01: March 19, 2021
 * * Bug Fixes!
 * ** When using the Battle Cursor for front view actors, the cursor no longer
 *    appears out of synch from the sprite positions in the battle status
 *    window area. Fix made by Irina.
 *
 * Version 1.00: January 8, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleCursorChangeActorSettings
 * @text Battle Cursor: Change Actor Cursor
 * @desc Change target actor's battle cursor settings.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @arg pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @arg systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @arg frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @arg Anchor
 *
 * @arg anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @arg anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @arg Position
 *
 * @arg positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @arg positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @arg Offset
 *
 * @arg offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @arg offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @arg Wave
 *
 * @arg waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @arg waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @arg waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleCursorChangePartySettings
 * @text Battle Cursor: Change Party Member Cursor
 * @desc Change target party member's battle cursor settings.
 *
 * @arg PartyIndex:arraynum
 * @text Party Index(es)
 * @type number[]
 * @desc Select which party member index(es) to affect.
 * @default ["0"]
 *
 * @arg type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @arg pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @arg systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @arg frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @arg Anchor
 *
 * @arg anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @arg anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @arg Position
 *
 * @arg positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @arg positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @arg Offset
 *
 * @arg offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @arg offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @arg Wave
 *
 * @arg waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @arg waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @arg waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleCursorChangeEnemySettings
 * @text Battle Cursor: Change Enemy Member Cursor
 * @desc Change target enemy's battle cursor settings.
 * In-battle only!
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy troop index(es) to affect.
 * @default ["0"]
 *
 * @arg type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @arg pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @arg systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @arg frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @arg Anchor
 *
 * @arg anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @arg anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @arg Position
 *
 * @arg positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @arg positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @arg Offset
 *
 * @arg offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @arg offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @arg Wave
 *
 * @arg waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @arg waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @arg waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @min 1
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
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
 * @param BattleCursor
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ActorCursor:struct
 * @text Actor Cursor
 * @type struct<BattleCursor>
 * @desc Default battle select cursor settings for actors.
 * @default {"type:str":"icon","iconIndex:num":"112","pictureFilename:str":"","systemFilename:str":"","frameDelay:num":"8","Anchor":"","anchorX:str":"right","anchorY:str":"middle","Position":"","positionX:str":"left","positionY:str":"middle","Offset":"","offsetX:num":"+0","offsetY:num":"+0","Wave":"","waveType:str":"horz","waveSpeed:num":"0.05","waveDistance:num":"10"}
 *
 * @param EnemyCursor:struct
 * @text Enemy Cursor
 * @type struct<BattleCursor>
 * @desc Default battle select cursor settings for enemies.
 * @default {"type:str":"icon","iconIndex:num":"112","pictureFilename:str":"","systemFilename:str":"","frameDelay:num":"8","Anchor":"","anchorX:str":"right","anchorY:str":"middle","Position":"","positionX:str":"left","positionY:str":"middle","Offset":"","offsetX:num":"+0","offsetY:num":"+0","Wave":"","waveType:str":"horz","waveSpeed:num":"0.05","waveDistance:num":"10"}
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
 * BattleCursor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleCursor:
 *
 * @param type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @param iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @param pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @param systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @param frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @param Anchor
 *
 * @param anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @param anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @param Position
 *
 * @param positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @param positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @param Wave
 *
 * @param waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @param waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @param waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @min 1
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 */
//=============================================================================

const _0x522827=_0x1459;(function(_0x18e2b4,_0x583bc8){const _0x2eab82=_0x1459,_0x28784d=_0x18e2b4();while(!![]){try{const _0x269d1d=parseInt(_0x2eab82(0x23d))/0x1+parseInt(_0x2eab82(0x21d))/0x2+parseInt(_0x2eab82(0x235))/0x3+parseInt(_0x2eab82(0x201))/0x4+parseInt(_0x2eab82(0x203))/0x5*(parseInt(_0x2eab82(0x239))/0x6)+-parseInt(_0x2eab82(0x2a4))/0x7*(-parseInt(_0x2eab82(0x284))/0x8)+-parseInt(_0x2eab82(0x258))/0x9;if(_0x269d1d===_0x583bc8)break;else _0x28784d['push'](_0x28784d['shift']());}catch(_0x10bfe1){_0x28784d['push'](_0x28784d['shift']());}}}(_0x2b75,0xea318));var label=_0x522827(0x21b),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x522827(0x27c)](function(_0x36ecc0){const _0x1a8be2=_0x522827;return _0x36ecc0['status']&&_0x36ecc0['description'][_0x1a8be2(0x283)]('['+label+']');})[0x0];function _0x1459(_0x24753b,_0x234acb){const _0x2b75ef=_0x2b75();return _0x1459=function(_0x14598a,_0x5644e6){_0x14598a=_0x14598a-0x1eb;let _0x1a8fae=_0x2b75ef[_0x14598a];return _0x1a8fae;},_0x1459(_0x24753b,_0x234acb);}VisuMZ[label][_0x522827(0x292)]=VisuMZ[label][_0x522827(0x292)]||{},VisuMZ[_0x522827(0x232)]=function(_0x410000,_0x44842c){const _0x297c59=_0x522827;for(const _0x409428 in _0x44842c){if(_0x297c59(0x289)==='pMcbi'){if(_0x409428[_0x297c59(0x24b)](/(.*):(.*)/i)){const _0x204d6c=String(RegExp['$1']),_0x334ab8=String(RegExp['$2'])[_0x297c59(0x267)]()[_0x297c59(0x233)]();let _0x49ff1a,_0x2ce335,_0xf4ab5f;switch(_0x334ab8){case _0x297c59(0x245):_0x49ff1a=_0x44842c[_0x409428]!==''?Number(_0x44842c[_0x409428]):0x0;break;case'ARRAYNUM':_0x2ce335=_0x44842c[_0x409428]!==''?JSON[_0x297c59(0x229)](_0x44842c[_0x409428]):[],_0x49ff1a=_0x2ce335[_0x297c59(0x22e)](_0x35f5b0=>Number(_0x35f5b0));break;case _0x297c59(0x1f3):_0x49ff1a=_0x44842c[_0x409428]!==''?eval(_0x44842c[_0x409428]):null;break;case'ARRAYEVAL':_0x2ce335=_0x44842c[_0x409428]!==''?JSON[_0x297c59(0x229)](_0x44842c[_0x409428]):[],_0x49ff1a=_0x2ce335[_0x297c59(0x22e)](_0x41b00b=>eval(_0x41b00b));break;case _0x297c59(0x1ec):_0x49ff1a=_0x44842c[_0x409428]!==''?JSON[_0x297c59(0x229)](_0x44842c[_0x409428]):'';break;case _0x297c59(0x212):_0x2ce335=_0x44842c[_0x409428]!==''?JSON[_0x297c59(0x229)](_0x44842c[_0x409428]):[],_0x49ff1a=_0x2ce335[_0x297c59(0x22e)](_0x9f5523=>JSON['parse'](_0x9f5523));break;case _0x297c59(0x29a):_0x49ff1a=_0x44842c[_0x409428]!==''?new Function(JSON[_0x297c59(0x229)](_0x44842c[_0x409428])):new Function(_0x297c59(0x20f));break;case _0x297c59(0x24a):_0x2ce335=_0x44842c[_0x409428]!==''?JSON[_0x297c59(0x229)](_0x44842c[_0x409428]):[],_0x49ff1a=_0x2ce335[_0x297c59(0x22e)](_0x170efa=>new Function(JSON[_0x297c59(0x229)](_0x170efa)));break;case _0x297c59(0x206):_0x49ff1a=_0x44842c[_0x409428]!==''?String(_0x44842c[_0x409428]):'';break;case _0x297c59(0x278):_0x2ce335=_0x44842c[_0x409428]!==''?JSON[_0x297c59(0x229)](_0x44842c[_0x409428]):[],_0x49ff1a=_0x2ce335['map'](_0x149324=>String(_0x149324));break;case _0x297c59(0x28f):_0xf4ab5f=_0x44842c[_0x409428]!==''?JSON[_0x297c59(0x229)](_0x44842c[_0x409428]):{},_0x49ff1a=VisuMZ[_0x297c59(0x232)]({},_0xf4ab5f);break;case _0x297c59(0x227):_0x2ce335=_0x44842c[_0x409428]!==''?JSON['parse'](_0x44842c[_0x409428]):[],_0x49ff1a=_0x2ce335[_0x297c59(0x22e)](_0x4ef76f=>VisuMZ['ConvertParams']({},JSON[_0x297c59(0x229)](_0x4ef76f)));break;default:continue;}_0x410000[_0x204d6c]=_0x49ff1a;}}else _0x549988[_0x297c59(0x238)][_0x297c59(0x254)]['call'](this),this['_battler']&&this[_0x297c59(0x21f)]&&this[_0x297c59(0x21f)][_0x297c59(0x263)]>0x0?(this[_0x297c59(0x1fc)](),this['updateScale'](),this[_0x297c59(0x1fa)](),this[_0x297c59(0x2ac)](),this[_0x297c59(0x1f9)]()):this[_0x297c59(0x22c)]=0x0;}return _0x410000;},(_0x3f6eed=>{const _0x3b5509=_0x522827,_0x3d278b=_0x3f6eed[_0x3b5509(0x2ab)];for(const _0x5dd058 of dependencies){if(!Imported[_0x5dd058]){alert(_0x3b5509(0x225)[_0x3b5509(0x1f8)](_0x3d278b,_0x5dd058)),SceneManager[_0x3b5509(0x2a1)]();break;}}const _0x447463=_0x3f6eed[_0x3b5509(0x1fd)];if(_0x447463[_0x3b5509(0x24b)](/\[Version[ ](.*?)\]/i)){if(_0x3b5509(0x285)!==_0x3b5509(0x285))this[_0x3b5509(0x204)]=new _0x52680d(),this[_0x3b5509(0x204)]['setBase'](this),_0x28f037[_0x3b5509(0x22f)]?_0x2e6320['addChildToUiContainer'](this[_0x3b5509(0x204)]):this['addChild'](this[_0x3b5509(0x204)]);else{const _0x33aec3=Number(RegExp['$1']);_0x33aec3!==VisuMZ[label][_0x3b5509(0x213)]&&('voOsJ'==='PZPBY'?(_0x5d3e47[_0x3b5509(0x21b)]['Sprite_Enemy_initMembers']['call'](this),this[_0x3b5509(0x220)]()):(alert(_0x3b5509(0x260)[_0x3b5509(0x1f8)](_0x3d278b,_0x33aec3)),SceneManager['exit']()));}}if(_0x447463[_0x3b5509(0x24b)](/\[Tier[ ](\d+)\]/i)){const _0x3da178=Number(RegExp['$1']);_0x3da178<tier?_0x3b5509(0x257)!==_0x3b5509(0x20d)?(alert(_0x3b5509(0x2a7)[_0x3b5509(0x1f8)](_0x3d278b,_0x3da178,tier)),SceneManager[_0x3b5509(0x2a1)]()):this[_0x3b5509(0x1ee)][_0x3b5509(0x26d)]=_0x1d80d7:tier=Math[_0x3b5509(0x28e)](_0x3da178,tier);}VisuMZ[_0x3b5509(0x232)](VisuMZ[label][_0x3b5509(0x292)],_0x3f6eed['parameters']);})(pluginData),PluginManager[_0x522827(0x261)](pluginData[_0x522827(0x2ab)],'BattleCursorChangeActorSettings',_0x4cecd3=>{const _0x3e29e7=_0x522827;VisuMZ[_0x3e29e7(0x232)](_0x4cecd3,_0x4cecd3);const _0x27a532=JsonEx[_0x3e29e7(0x2aa)](_0x4cecd3);_0x27a532[_0x3e29e7(0x21a)]=undefined;const _0x597d36=_0x4cecd3['ActorIDs'][_0x3e29e7(0x22e)](_0x5df464=>$gameActors[_0x3e29e7(0x27d)](_0x5df464));for(const _0x2c7da5 of _0x597d36){if(!_0x2c7da5)continue;_0x2c7da5[_0x3e29e7(0x1fe)](_0x27a532);if(SceneManager[_0x3e29e7(0x272)]()){if(_0x3e29e7(0x266)!==_0x3e29e7(0x266))this[_0x3e29e7(0x26b)]=this['_uiContainer'];else{const _0x269d51=SceneManager[_0x3e29e7(0x224)];if(!_0x269d51)continue;const _0x11881c=_0x269d51[_0x3e29e7(0x23f)];if(!_0x11881c)continue;const _0x4d7a1b=_0x11881c[_0x3e29e7(0x297)](_0x2c7da5);if(_0x4d7a1b)_0x4d7a1b[_0x3e29e7(0x277)]();}}}}),PluginManager['registerCommand'](pluginData[_0x522827(0x2ab)],_0x522827(0x296),_0x41a0a2=>{const _0x204d90=_0x522827;VisuMZ[_0x204d90(0x232)](_0x41a0a2,_0x41a0a2);const _0x50e6c9=JsonEx[_0x204d90(0x2aa)](_0x41a0a2);_0x50e6c9[_0x204d90(0x27f)]=undefined;const _0x4d4873=_0x41a0a2[_0x204d90(0x27f)][_0x204d90(0x22e)](_0x811cb2=>$gameParty[_0x204d90(0x29b)]()[_0x811cb2]);for(const _0x576d26 of _0x4d4873){if(_0x204d90(0x241)!==_0x204d90(0x249)){if(!_0x576d26)continue;_0x576d26[_0x204d90(0x1fe)](_0x50e6c9);if(SceneManager['isSceneBattle']()){const _0x52f444=SceneManager[_0x204d90(0x224)];if(!_0x52f444)continue;const _0x27ba2e=_0x52f444['_spriteset'];if(!_0x27ba2e)continue;const _0x307fd7=_0x27ba2e[_0x204d90(0x297)](_0x576d26);if(_0x307fd7)_0x307fd7[_0x204d90(0x277)]();}}else return this[_0x204d90(0x224)]&&this[_0x204d90(0x224)][_0x204d90(0x240)]===_0x50b34d;}}),PluginManager['registerCommand'](pluginData[_0x522827(0x2ab)],_0x522827(0x21c),_0x1e7dcd=>{const _0x3707f9=_0x522827;if(!SceneManager[_0x3707f9(0x272)]())return;VisuMZ['ConvertParams'](_0x1e7dcd,_0x1e7dcd);const _0x291775=JsonEx['makeDeepCopy'](_0x1e7dcd);_0x291775[_0x3707f9(0x2a0)]=undefined;const _0x4b0a1a=_0x1e7dcd[_0x3707f9(0x2a0)][_0x3707f9(0x22e)](_0x2c8b59=>$gameTroop[_0x3707f9(0x29b)]()[_0x2c8b59]);for(const _0x8b3c5d of _0x4b0a1a){if(!_0x8b3c5d)continue;_0x8b3c5d[_0x3707f9(0x1fe)](_0x291775);if(SceneManager['isSceneBattle']()){const _0x4f5f2f=SceneManager['_scene'];if(!_0x4f5f2f)continue;const _0x179950=_0x4f5f2f[_0x3707f9(0x23f)];if(!_0x179950)continue;const _0x2bb738=_0x179950[_0x3707f9(0x297)](_0x8b3c5d);if(_0x2bb738)_0x2bb738[_0x3707f9(0x277)]();}}}),SceneManager[_0x522827(0x272)]=function(){const _0xf0a2b4=_0x522827;return this[_0xf0a2b4(0x224)]&&this[_0xf0a2b4(0x224)][_0xf0a2b4(0x240)]===Scene_Battle;},Game_BattlerBase[_0x522827(0x238)][_0x522827(0x298)]=function(){const _0x374a1f=_0x522827;return!this[_0x374a1f(0x1ee)]&&this['createBattleCursorData'](),this['_battleCursorData'];},Game_BattlerBase[_0x522827(0x238)]['createBattleCursorData']=function(){const _0xc113cc=_0x522827;this[_0xc113cc(0x1ee)]={'type':_0xc113cc(0x28a),'iconIndex':0x70,'pictureFilename':'','systemFilename':'','frameDelay':0xf4240,'anchorX':'right','anchorY':_0xc113cc(0x24c),'positionX':'left','positionY':'middle','offsetX':0x0,'offsetY':0x0,'waveType':'horz','waveSpeed':0.05,'waveDistance':0xa};},Game_BattlerBase[_0x522827(0x238)][_0x522827(0x1fe)]=function(_0x45491b){this['_battleCursorData']=_0x45491b;},Game_Battler[_0x522827(0x238)][_0x522827(0x205)]=function(_0x9cf384){const _0x3677ff=_0x522827;if(!_0x9cf384)return;const _0x3da4a0=this[_0x3677ff(0x1ee)];_0x9cf384['match'](/<BATTLE (?:SELECT CURSOR|CURSOR) ICON:[ ](.*)>/i)&&(this['_battleCursorData'][_0x3677ff(0x256)]='icon',this[_0x3677ff(0x1ee)][_0x3677ff(0x1ef)]=Number(RegExp['$1']));_0x9cf384['match'](/<BATTLE (?:SELECT CURSOR|CURSOR) PICTURE:[ ](.*)>/i)&&(this[_0x3677ff(0x1ee)]['type']=_0x3677ff(0x202),this[_0x3677ff(0x1ee)][_0x3677ff(0x293)]=String(RegExp['$1'])[_0x3677ff(0x233)]());_0x9cf384[_0x3677ff(0x24b)](/<BATTLE (?:SELECT CURSOR|CURSOR) SYSTEM:[ ](.*)>/i)&&('GNSAl'!==_0x3677ff(0x23a)?(this[_0x3677ff(0x1ee)]['type']=_0x3677ff(0x29e),this['_battleCursorData'][_0x3677ff(0x217)]=String(RegExp['$1'])['trim']()):_0x550c6a=_0xd5d0b7[_0x3677ff(0x28e)](_0xbb2a1c,_0x3a8605));_0x9cf384[_0x3677ff(0x24b)](/<BATTLE (?:SELECT CURSOR|CURSOR) FRAME DELAY:[ ](.*)>/i)&&(this['_battleCursorData'][_0x3677ff(0x262)]=Number(RegExp['$1']));if(_0x9cf384[_0x3677ff(0x24b)](/<BATTLE (?:SELECT CURSOR|CURSOR) ANCHOR X:[ ](.*)>/i)){const _0x837e2d=String(RegExp['$1'])['toLowerCase']()[_0x3677ff(0x233)]();[_0x3677ff(0x215),_0x3677ff(0x246),_0x3677ff(0x2a8)][_0x3677ff(0x283)](_0x837e2d)&&(this[_0x3677ff(0x1ee)][_0x3677ff(0x26d)]=_0x837e2d);}if(_0x9cf384[_0x3677ff(0x24b)](/<BATTLE (?:SELECT CURSOR|CURSOR) ANCHOR Y:[ ](.*)>/i)){if('ArsOC'===_0x3677ff(0x20c))this[_0x3677ff(0x28d)]=this[_0x3677ff(0x207)]['battleCursor'](),this[_0x3677ff(0x20e)](),this['loadBitmap']();else{const _0x333573=String(RegExp['$1'])[_0x3677ff(0x1ff)]()[_0x3677ff(0x233)]();[_0x3677ff(0x25f),_0x3677ff(0x24c),'bottom'][_0x3677ff(0x283)](_0x333573)&&(this[_0x3677ff(0x1ee)][_0x3677ff(0x22a)]=_0x333573);}}if(_0x9cf384[_0x3677ff(0x24b)](/<BATTLE (?:SELECT CURSOR|CURSOR) POSITION X:[ ](.*)>/i)){if(_0x3677ff(0x255)!==_0x3677ff(0x1f1)){const _0x3f2722=String(RegExp['$1'])[_0x3677ff(0x1ff)]()[_0x3677ff(0x233)]();[_0x3677ff(0x215),'center',_0x3677ff(0x2a8)]['includes'](_0x3f2722)&&(_0x3677ff(0x234)===_0x3677ff(0x234)?this[_0x3677ff(0x1ee)][_0x3677ff(0x209)]=_0x3f2722:this[_0x3677ff(0x28b)]());}else this[_0x3677ff(0x1ee)][_0x3677ff(0x2ad)]=_0x3677ff(0x26e),this['_battleCursorData'][_0x3677ff(0x291)]=_0x561fff(_0x35ef8f['$1']);}if(_0x9cf384[_0x3677ff(0x24b)](/<BATTLE (?:SELECT CURSOR|CURSOR) POSITION Y:[ ](.*)>/i)){const _0x9f6edb=String(RegExp['$1'])['toLowerCase']()[_0x3677ff(0x233)]();if([_0x3677ff(0x25f),'middle','bottom'][_0x3677ff(0x283)](_0x9f6edb)){if(_0x3677ff(0x280)===_0x3677ff(0x210)){const _0x3b1fb7=_0x5cbfcb(_0x4a9492['$1'])[_0x3677ff(0x1ff)]()[_0x3677ff(0x233)]();[_0x3677ff(0x25f),_0x3677ff(0x24c),'bottom'][_0x3677ff(0x283)](_0x3b1fb7)&&(this['_battleCursorData']['anchorY']=_0x3b1fb7);}else this[_0x3677ff(0x1ee)][_0x3677ff(0x269)]=_0x9f6edb;}}_0x9cf384['match'](/<BATTLE (?:SELECT CURSOR|CURSOR) OFFSET X:[ ](.*)>/i)&&(_0x3677ff(0x24e)!==_0x3677ff(0x24e)?this['x']+=_0x591d77:this[_0x3677ff(0x1ee)]['offsetX']=Number(RegExp['$1']));_0x9cf384[_0x3677ff(0x24b)](/<BATTLE (?:SELECT CURSOR|CURSOR) OFFSET Y:[ ](.*)>/i)&&(this['_battleCursorData'][_0x3677ff(0x251)]=Number(RegExp['$1']));if(_0x9cf384[_0x3677ff(0x24b)](/<BATTLE (?:SELECT CURSOR|CURSOR) (?:NO|NONE) WAVE>/i)){if('WYLIa'===_0x3677ff(0x275))this[_0x3677ff(0x1ee)][_0x3677ff(0x2ad)]=_0x3677ff(0x274),this[_0x3677ff(0x1ee)][_0x3677ff(0x291)]=0x1;else{if(this['_battler']===_0x5c143a)return;this['_battler']=_0x2b66e5,this['_battler']?this[_0x3677ff(0x20b)]():this[_0x3677ff(0x28d)]=null;}}if(_0x9cf384['match'](/<BATTLE (?:SELECT CURSOR|CURSOR) (?:HORZ|HORIZONTAL) WAVE:[ ](.*)>/i)){if(_0x3677ff(0x211)===_0x3677ff(0x27b))return!this[_0x3677ff(0x1ee)]&&this[_0x3677ff(0x28b)](),this[_0x3677ff(0x1ee)];else this[_0x3677ff(0x1ee)][_0x3677ff(0x2ad)]='horz',this[_0x3677ff(0x1ee)]['waveDistance']=Number(RegExp['$1']);}_0x9cf384[_0x3677ff(0x24b)](/<BATTLE (?:SELECT CURSOR|CURSOR) (?:VERT|VERTICAL) WAVE:[ ](.*)>/i)&&(_0x3677ff(0x29f)===_0x3677ff(0x2ae)?this[_0x3677ff(0x28d)]=null:(this[_0x3677ff(0x1ee)][_0x3677ff(0x2ad)]=_0x3677ff(0x2a6),this[_0x3677ff(0x1ee)][_0x3677ff(0x291)]=Number(RegExp['$1']))),_0x9cf384[_0x3677ff(0x24b)](/<BATTLE (?:SELECT CURSOR|CURSOR) WAVE SPEED:[ ](.*)>/i)&&(_0x3677ff(0x1ed)==='jmUmT'?(this['updateOpacity'](),this['updateScale'](),this[_0x3677ff(0x1fa)](),this[_0x3677ff(0x2ac)](),this['updateWave']()):this['_battleCursorData'][_0x3677ff(0x218)]=Number(RegExp['$1'])),this[_0x3677ff(0x1ee)]['frameDelay']=Math['max'](0x1,this[_0x3677ff(0x1ee)][_0x3677ff(0x262)]),this[_0x3677ff(0x1ee)][_0x3677ff(0x256)]===_0x3677ff(0x28a)&&(_0x3677ff(0x288)===_0x3677ff(0x288)?this[_0x3677ff(0x1ee)]['frameDelay']=0x186a0:(this[_0x3677ff(0x22d)]=0x1,this[_0x3677ff(0x26c)]=0x1));},Game_Actor[_0x522827(0x238)][_0x522827(0x28b)]=function(){const _0x1df3b8=_0x522827;this[_0x1df3b8(0x1ee)]=JsonEx[_0x1df3b8(0x2aa)](VisuMZ['BattleCursor']['Settings'][_0x1df3b8(0x273)]),this[_0x1df3b8(0x205)](this[_0x1df3b8(0x27d)]()[_0x1df3b8(0x21e)]);},Game_Enemy[_0x522827(0x238)]['createBattleCursorData']=function(){const _0x2b1089=_0x522827;this['_battleCursorData']=JsonEx[_0x2b1089(0x2aa)](VisuMZ[_0x2b1089(0x21b)][_0x2b1089(0x292)][_0x2b1089(0x253)]),this[_0x2b1089(0x205)](this[_0x2b1089(0x1f6)]()['note']);},Sprite_Battler[_0x522827(0x238)][_0x522827(0x220)]=function(){const _0x5dfac5=_0x522827;this[_0x5dfac5(0x204)]=new Sprite_BattleSelectCursor(),this[_0x5dfac5(0x204)]['setBase'](this),Spriteset_Battle[_0x5dfac5(0x22f)]?_0x5dfac5(0x2a9)!==_0x5dfac5(0x25d)?BattleManager[_0x5dfac5(0x26f)](this[_0x5dfac5(0x204)]):this[_0x5dfac5(0x22c)]=0x0:this[_0x5dfac5(0x248)](this[_0x5dfac5(0x204)]);},VisuMZ['BattleCursor'][_0x522827(0x214)]=Sprite_Battler[_0x522827(0x238)][_0x522827(0x22b)],Sprite_Battler[_0x522827(0x238)][_0x522827(0x22b)]=function(_0x17bf96){const _0x2eed77=_0x522827;VisuMZ['BattleCursor']['Sprite_Battler_setBattler'][_0x2eed77(0x221)](this,_0x17bf96),this[_0x2eed77(0x204)]&&(_0x2eed77(0x1f7)!=='ozhLI'?this[_0x2eed77(0x204)][_0x2eed77(0x22b)](_0x17bf96):_0x3fda10[_0x2eed77(0x26f)](this[_0x2eed77(0x204)]));},Sprite_Battler['prototype']['updateBattleSelectCursor']=function(){const _0x430ac5=_0x522827;if(!this[_0x430ac5(0x204)])return;this['_battleSelectCursorSprite'][_0x430ac5(0x20b)]();},VisuMZ['BattleCursor']['Sprite_Actor_initMembers']=Sprite_Actor[_0x522827(0x238)][_0x522827(0x29c)],Sprite_Actor['prototype']['initMembers']=function(){const _0x2fcd41=_0x522827;VisuMZ[_0x2fcd41(0x21b)]['Sprite_Actor_initMembers']['call'](this);if(Imported[_0x2fcd41(0x264)]&&this[_0x2fcd41(0x240)]===Sprite_SvEnemy){if(_0x2fcd41(0x228)===_0x2fcd41(0x1f0)){const _0xdb93cc=_0x1a8df4(_0x6a27b9['$1'])[_0x2fcd41(0x1ff)]()[_0x2fcd41(0x233)]();[_0x2fcd41(0x25f),_0x2fcd41(0x24c),_0x2fcd41(0x1fb)]['includes'](_0xdb93cc)&&(this[_0x2fcd41(0x1ee)][_0x2fcd41(0x269)]=_0xdb93cc);}else return;}this['createBattleSelectCursor']();},VisuMZ[_0x522827(0x21b)][_0x522827(0x24f)]=Sprite_Enemy[_0x522827(0x238)][_0x522827(0x29c)],Sprite_Enemy[_0x522827(0x238)]['initMembers']=function(){const _0x435ae5=_0x522827;VisuMZ[_0x435ae5(0x21b)]['Sprite_Enemy_initMembers'][_0x435ae5(0x221)](this),this[_0x435ae5(0x220)]();},VisuMZ['BattleCursor']['Spriteset_Battle_createBattleFieldContainer']=Spriteset_Battle[_0x522827(0x238)][_0x522827(0x23c)],Spriteset_Battle[_0x522827(0x238)][_0x522827(0x23c)]=function(){const _0x1dc7d5=_0x522827;VisuMZ[_0x1dc7d5(0x21b)]['Spriteset_Battle_createBattleFieldContainer'][_0x1dc7d5(0x221)](this),Spriteset_Battle[_0x1dc7d5(0x22f)]?_0x1dc7d5(0x242)!==_0x1dc7d5(0x242)?this[_0x1dc7d5(0x22c)]=this['_battler']['isSelected']()?0xff:0x0:this[_0x1dc7d5(0x26b)]=this['_uiContainer']:(this[_0x1dc7d5(0x26b)]=new Sprite(),this[_0x1dc7d5(0x28c)]['addChild'](this[_0x1dc7d5(0x26b)]));},VisuMZ['BattleCursor']['Spriteset_Battle_adjustFlippedBattlefield']=Spriteset_Battle[_0x522827(0x238)][_0x522827(0x216)],Spriteset_Battle['prototype'][_0x522827(0x216)]=function(){const _0x4f6f32=_0x522827;VisuMZ['BattleCursor'][_0x4f6f32(0x2a2)][_0x4f6f32(0x221)](this),this['_battleCursorContainer']&&this[_0x4f6f32(0x2a3)]&&(this[_0x4f6f32(0x26b)]['scale']['x']=this[_0x4f6f32(0x2a3)][_0x4f6f32(0x27a)]['x'],this[_0x4f6f32(0x26b)][_0x4f6f32(0x27a)]['y']=this[_0x4f6f32(0x2a3)][_0x4f6f32(0x27a)]['y'],this[_0x4f6f32(0x26b)]['x']=this[_0x4f6f32(0x2a3)]['x'],this['_battleCursorContainer']['y']=this[_0x4f6f32(0x2a3)]['y']);},VisuMZ[_0x522827(0x21b)][_0x522827(0x287)]=Spriteset_Battle[_0x522827(0x238)][_0x522827(0x254)],Spriteset_Battle[_0x522827(0x238)][_0x522827(0x254)]=function(){const _0x484b3d=_0x522827;VisuMZ[_0x484b3d(0x21b)]['Spriteset_Battle_update']['call'](this),this[_0x484b3d(0x281)]();},Spriteset_Battle[_0x522827(0x238)]['updateBattleCursorContainer']=function(){const _0x31b408=_0x522827;if(!this['_battleCursorContainer'])return;let _0x385a55=this[_0x31b408(0x1f2)];$gameSystem[_0x31b408(0x2a5)]()&&(_0x31b408(0x20a)!==_0x31b408(0x20a)?this[_0x31b408(0x26b)][_0x31b408(0x248)](_0x5d2516):_0x385a55=_0x385a55[_0x31b408(0x1eb)](this[_0x31b408(0x25e)]));for(const _0x3bcb18 of _0x385a55){if(!_0x3bcb18)continue;const _0x69d17a=_0x3bcb18[_0x31b408(0x204)];_0x69d17a&&(_0x31b408(0x243)===_0x31b408(0x25c)?(_0x297fbd['BattleCursor'][_0x31b408(0x214)][_0x31b408(0x221)](this,_0x494945),this[_0x31b408(0x204)]&&this[_0x31b408(0x204)][_0x31b408(0x22b)](_0x2dac66)):this[_0x31b408(0x26b)][_0x31b408(0x248)](_0x69d17a));}};function _0x2b75(){const _0x46c41c=['PQjYN','_actorSprites','top','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','registerCommand','frameDelay','width','VisuMZ_1_BattleCore','setFrame','VqhDP','toUpperCase','gYvqz','positionY','isActor','_battleCursorContainer','_frameRows','anchorX','horz','addChildToUiContainer','updateFrameColsRows','gDPaV','isSceneBattle','ActorCursor','none','WYLIa','_baseX','updateBattleSelectCursor','ARRAYSTR','tTEKc','scale','CjGMn','filter','actor','loadPicture','PartyIndex','qjUIN','updateBattleCursorContainer','setBase','includes','5424NShCFZ','ehctQ','updateScale','Spriteset_Battle_update','RPZDo','pMcbi','icon','createBattleCursorData','_battleField','_settings','max','STRUCT','create','waveDistance','Settings','pictureFilename','_baseSprite','IconSet','BattleCursorChangePartySettings','findTargetSprite','battleCursor','anchor','FUNC','members','initMembers','_frameMax','system','EdcYK','EnemyIndex','exit','Spriteset_Battle_adjustFlippedBattlefield','_battlerContainer','1239oxTVCd','isSideView','vert','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','right','Svxor','makeDeepCopy','name','updatePosition','waveType','btzYj','concat','JSON','Ftuzk','_battleCursorData','iconIndex','ZLSeK','BExTp','_enemySprites','EVAL','cos','iconHeight','enemy','VWeMF','format','updateWave','updateFrame','bottom','updateOpacity','description','setBattleCursor','toLowerCase','isSelected','2236424EVaGQT','picture','4687135tFFwkQ','_battleSelectCursorSprite','applyBattleCursorNotetags','STR','_battler','MFEZO','positionX','WMfFm','updateBattler','zQwiI','bBBBG','updateAnchor','return\x200','DcZLW','ZuVZU','ARRAYJSON','version','Sprite_Battler_setBattler','left','adjustFlippedBattlefield','systemFilename','waveSpeed','initialize','ActorIDs','BattleCursor','BattleCursorChangeEnemySettings','731250LkhkQs','note','bitmap','createBattleSelectCursor','call','extraPositionY','gYboN','_scene','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','loadSystem','ARRAYSTRUCT','ijSWx','parse','anchorY','setBattler','opacity','_frameCols','map','ANTI_TINT_UI','_distortionSprite','loadBitmap','ConvertParams','trim','IRhCx','1654287InqrWb','addLoadListener','_frameIndex','prototype','6JkFklT','ItPNc','parent','createBattleFieldContainer','1808456BFCCeS','offsetX','_spriteset','constructor','wEyJS','gSnbg','TyGNr','updateFrameIcon','NUM','center','sgUjv','addChild','RkJJo','ARRAYFUNC','match','middle','_cache','qESkz','Sprite_Enemy_initMembers','floor','offsetY','_baseY','EnemyCursor','update','teUTX','type','JgnrB','30445137dLCGoy','height','uPgwi','determineFrameColsRows','pJnhi'];_0x2b75=function(){return _0x46c41c;};return _0x2b75();}function Sprite_BattleSelectCursor(){const _0x2de232=_0x522827;this[_0x2de232(0x219)](...arguments);}Sprite_BattleSelectCursor['prototype']=Object[_0x522827(0x290)](Sprite[_0x522827(0x238)]),Sprite_BattleSelectCursor[_0x522827(0x238)]['constructor']=Sprite_BattleSelectCursor,Sprite_BattleSelectCursor['prototype'][_0x522827(0x219)]=function(){const _0x3b794=_0x522827;Sprite['prototype']['initialize'][_0x3b794(0x221)](this),this[_0x3b794(0x29c)]();},Sprite_BattleSelectCursor[_0x522827(0x238)][_0x522827(0x29c)]=function(){const _0xc26737=_0x522827;this[_0xc26737(0x207)]=null,this[_0xc26737(0x28d)]=null,this['_frameIndex']=0x0,this[_0xc26737(0x22d)]=0x1,this[_0xc26737(0x26c)]=0x1,this[_0xc26737(0x29d)]=0x1,this[_0xc26737(0x24d)]={'scale':{'x':0x1,'y':0x1}},this[_0xc26737(0x22c)]=0x0;},Sprite_BattleSelectCursor[_0x522827(0x238)][_0x522827(0x282)]=function(_0x5c65a3){const _0x4bc82c=_0x522827;this[_0x4bc82c(0x294)]=_0x5c65a3;},Sprite_BattleSelectCursor[_0x522827(0x238)][_0x522827(0x22b)]=function(_0x34ee9d){const _0x223ca9=_0x522827;if(this[_0x223ca9(0x207)]===_0x34ee9d)return;this['_battler']=_0x34ee9d,this[_0x223ca9(0x207)]?this[_0x223ca9(0x20b)]():_0x223ca9(0x279)!==_0x223ca9(0x279)?this[_0x223ca9(0x1ee)][_0x223ca9(0x262)]=_0x3d3023(_0x175275['$1']):this[_0x223ca9(0x28d)]=null;},Sprite_BattleSelectCursor[_0x522827(0x238)][_0x522827(0x20b)]=function(){const _0x2d20d5=_0x522827;this[_0x2d20d5(0x28d)]=this['_battler']['battleCursor'](),this[_0x2d20d5(0x20e)](),this[_0x2d20d5(0x231)]();},Sprite_BattleSelectCursor[_0x522827(0x238)][_0x522827(0x20e)]=function(){const _0xddeb5d=_0x522827;switch(this[_0xddeb5d(0x28d)]['anchorX']){case'left':this[_0xddeb5d(0x299)]['x']=0x0;break;case _0xddeb5d(0x246):this[_0xddeb5d(0x299)]['x']=0.5;break;case _0xddeb5d(0x2a8):this[_0xddeb5d(0x299)]['x']=0x1;break;}switch(this[_0xddeb5d(0x28d)][_0xddeb5d(0x22a)]){case _0xddeb5d(0x25f):this[_0xddeb5d(0x299)]['y']=0x0;break;case'middle':this[_0xddeb5d(0x299)]['y']=0.5;break;case _0xddeb5d(0x1fb):this[_0xddeb5d(0x299)]['y']=0x1;break;}},Sprite_BattleSelectCursor['prototype']['loadBitmap']=function(){const _0x265250=_0x522827;if(!this[_0x265250(0x28d)])return;switch(this[_0x265250(0x28d)][_0x265250(0x256)]){case _0x265250(0x28a):this['bitmap']=ImageManager[_0x265250(0x226)](_0x265250(0x295));break;case'picture':this[_0x265250(0x21f)]=ImageManager[_0x265250(0x27e)](this[_0x265250(0x28d)]['pictureFilename']),this[_0x265250(0x25b)](this[_0x265250(0x28d)][_0x265250(0x293)]);break;case _0x265250(0x29e):this[_0x265250(0x21f)]=ImageManager['loadSystem'](this['_settings']['systemFilename']),this['determineFrameColsRows'](this['_settings'][_0x265250(0x217)]);break;}this[_0x265250(0x237)]=0x0,this[_0x265250(0x21f)][_0x265250(0x236)](this[_0x265250(0x1fa)]['bind'](this,!![]));},Sprite_BattleSelectCursor['prototype']['determineFrameColsRows']=function(_0x5be2e2){const _0x262906=_0x522827;_0x5be2e2[_0x262906(0x24b)](/\[(\d+)x(\d+)\]/i)?(this[_0x262906(0x22d)]=Math[_0x262906(0x28e)](0x1,Number(RegExp['$1'])),this[_0x262906(0x26c)]=Math[_0x262906(0x28e)](0x1,Number(RegExp['$2']))):(this[_0x262906(0x22d)]=0x1,this[_0x262906(0x26c)]=0x1),this[_0x262906(0x29d)]=this[_0x262906(0x22d)]*this[_0x262906(0x26c)];},Sprite_BattleSelectCursor['prototype'][_0x522827(0x254)]=function(){const _0x2fe49d=_0x522827;Sprite[_0x2fe49d(0x238)]['update'][_0x2fe49d(0x221)](this),this['_battler']&&this[_0x2fe49d(0x21f)]&&this[_0x2fe49d(0x21f)][_0x2fe49d(0x263)]>0x0?(this[_0x2fe49d(0x1fc)](),this['updateScale'](),this[_0x2fe49d(0x1fa)](),this[_0x2fe49d(0x2ac)](),this[_0x2fe49d(0x1f9)]()):_0x2fe49d(0x247)!==_0x2fe49d(0x25a)?this[_0x2fe49d(0x22c)]=0x0:_0x44b7ea=_0x185cbb['concat'](this[_0x2fe49d(0x25e)]);},Sprite_BattleSelectCursor['prototype'][_0x522827(0x1fc)]=function(){const _0x226598=_0x522827;this['opacity']=this[_0x226598(0x207)][_0x226598(0x200)]()?0xff:0x0;},Sprite_BattleSelectCursor['prototype'][_0x522827(0x286)]=function(){const _0x31870c=_0x522827;if(!this[_0x31870c(0x23b)])return;if(this[_0x31870c(0x22c)]<=0x0)return;if(this['_cache'][_0x31870c(0x27a)]['x']===this[_0x31870c(0x23b)]['scale']['x']&&this[_0x31870c(0x24d)][_0x31870c(0x27a)]['y']===this[_0x31870c(0x23b)][_0x31870c(0x27a)]['y'])return;this[_0x31870c(0x27a)]['x']=0x1/this[_0x31870c(0x23b)][_0x31870c(0x27a)]['x'],this['scale']['y']=0x1/this[_0x31870c(0x23b)][_0x31870c(0x27a)]['y'],this[_0x31870c(0x24d)]['scale']['x']=this[_0x31870c(0x23b)][_0x31870c(0x27a)]['x'],this[_0x31870c(0x24d)][_0x31870c(0x27a)]['y']=this['parent'][_0x31870c(0x27a)]['y'];},Sprite_BattleSelectCursor[_0x522827(0x238)][_0x522827(0x1fa)]=function(_0x29b9a0){const _0x17d3ed=_0x522827;if(!_0x29b9a0){if(_0x17d3ed(0x223)===_0x17d3ed(0x223)){if(Graphics['frameCount']%this['_settings'][_0x17d3ed(0x262)]>0x0)return;}else this[_0x17d3ed(0x1ee)][_0x17d3ed(0x256)]=_0x17d3ed(0x202),this[_0x17d3ed(0x1ee)]['pictureFilename']=_0x4f0103(_0x4fde63['$1'])['trim']();}switch(this['_settings'][_0x17d3ed(0x256)]){case _0x17d3ed(0x28a):this[_0x17d3ed(0x244)]();break;case _0x17d3ed(0x202):case'system':this[_0x17d3ed(0x270)]();break;};},Sprite_BattleSelectCursor[_0x522827(0x238)][_0x522827(0x244)]=function(){const _0x78202d=_0x522827,_0x1a665d=this[_0x78202d(0x28d)]['iconIndex'],_0x3ea4a5=ImageManager['iconWidth'],_0x375bf4=ImageManager[_0x78202d(0x1f5)],_0x55c41f=_0x1a665d%0x10*_0x3ea4a5,_0x562c38=Math[_0x78202d(0x250)](_0x1a665d/0x10)*_0x375bf4;this[_0x78202d(0x265)](_0x55c41f,_0x562c38,_0x3ea4a5,_0x375bf4);},Sprite_BattleSelectCursor['prototype']['updateFrameColsRows']=function(){const _0x21ad08=_0x522827;this[_0x21ad08(0x237)]++;if(this['_frameIndex']>=this[_0x21ad08(0x29d)])this[_0x21ad08(0x237)]=0x0;var _0x362ecc=this[_0x21ad08(0x21f)]['width']/this[_0x21ad08(0x22d)],_0x272710=this['bitmap'][_0x21ad08(0x259)]/this[_0x21ad08(0x26c)],_0x222db4=this[_0x21ad08(0x237)]%this['_frameCols']*_0x362ecc,_0x5a5dab=Math[_0x21ad08(0x250)](this[_0x21ad08(0x237)]/this['_frameCols'])*_0x272710;this[_0x21ad08(0x265)](_0x222db4,_0x5a5dab,_0x362ecc,_0x272710);},Sprite_BattleSelectCursor[_0x522827(0x238)]['updatePosition']=function(){const _0x29a6ff=_0x522827;if(!this[_0x29a6ff(0x23b)])return;const _0x406471=this[_0x29a6ff(0x294)]?this[_0x29a6ff(0x294)]:this[_0x29a6ff(0x23b)];let _0x374711=_0x406471['width'],_0x356be5=_0x406471[_0x29a6ff(0x259)],_0x39cd44=_0x406471[_0x29a6ff(0x276)]??_0x406471['x'],_0x1a5952=_0x406471[_0x29a6ff(0x252)]??_0x406471['y'];Imported[_0x29a6ff(0x264)]&&_0x406471[_0x29a6ff(0x230)]&&(_0x29a6ff(0x268)===_0x29a6ff(0x268)?(_0x374711*=_0x406471[_0x29a6ff(0x230)][_0x29a6ff(0x27a)]['x'],_0x356be5*=_0x406471['_distortionSprite']['scale']['y'],_0x1a5952+=_0x406471[_0x29a6ff(0x222)]()):(this[_0x29a6ff(0x22d)]=_0x2eddb0[_0x29a6ff(0x28e)](0x1,_0x41ca83(_0x9a9f08['$1'])),this[_0x29a6ff(0x26c)]=_0x1ef354[_0x29a6ff(0x28e)](0x1,_0x39fc3f(_0x2f6016['$2']))));switch(this[_0x29a6ff(0x28d)][_0x29a6ff(0x209)]){case'left':this['x']=_0x39cd44+_0x374711/-0x2;break;case _0x29a6ff(0x246):this['x']=_0x39cd44+0x0;break;case _0x29a6ff(0x2a8):this['x']=_0x39cd44+_0x374711/0x2;break;}switch(this[_0x29a6ff(0x28d)][_0x29a6ff(0x269)]){case _0x29a6ff(0x25f):this['y']=_0x1a5952+_0x356be5*-0x1;break;case _0x29a6ff(0x24c):this['y']=_0x1a5952+_0x356be5/-0x2;break;case'bottom':this['y']=_0x1a5952+0x0;break;}_0x406471&&_0x406471[_0x29a6ff(0x207)]&&_0x406471[_0x29a6ff(0x207)][_0x29a6ff(0x26a)]()&&!$gameSystem['isSideView']()&&(this['x']-=_0x406471['x'],this['y']-=_0x406471['y']),this['x']+=this['_settings'][_0x29a6ff(0x23e)],this['y']+=this[_0x29a6ff(0x28d)][_0x29a6ff(0x251)];},Sprite_BattleSelectCursor['prototype']['updateWave']=function(){const _0x4a5d97=_0x522827,_0xed6a59=this['_settings'][_0x4a5d97(0x2ad)];if(_0xed6a59===_0x4a5d97(0x274))return;if(this[_0x4a5d97(0x28d)][_0x4a5d97(0x291)]<=0x0)return;const _0x2874bd=this[_0x4a5d97(0x28d)]['waveDistance'],_0x3faf89=this['_settings'][_0x4a5d97(0x218)],_0x22044d=Math['round'](Math[_0x4a5d97(0x1f4)](Graphics['frameCount']*_0x3faf89)*_0x2874bd);if(_0xed6a59==='horz')this['x']+=_0x22044d;else _0xed6a59===_0x4a5d97(0x2a6)&&(_0x4a5d97(0x271)===_0x4a5d97(0x208)?this[_0x4a5d97(0x1ee)][_0x4a5d97(0x269)]=_0x2d5724:this['y']+=_0x22044d);};
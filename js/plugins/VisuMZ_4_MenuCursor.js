//=============================================================================
// VisuStella MZ - Menu Cursor
// VisuMZ_4_MenuCursor.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_MenuCursor = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MenuCursor = VisuMZ.MenuCursor || {};
VisuMZ.MenuCursor.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.08] [MenuCursor]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Menu_Cursor_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Add a menu cursor that uses an icon or an image from the pictures or system
 * folder to help the player find out which windows are active quicker. The
 * subtle movements of a waving cursor can do wonders to grabbing the player's
 * attention to speed up the process of directing player focus.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Use icons, pictures, or system images as the menu cursor.
 * * Decide on how the cursor is anchored and positioned with offsets to fine
 *   tune its location.
 * * Want to animate the cursor? You can do so by following a specific image
 *   format and name schema.
 * * Oscillate the cursor back and forth from a left to right horizontal bounce
 *   or an up to down vertical bounce. Or if you want, just don't have any kind
 *   of oscillation at all!
 * * Alter the menu cursor mid-game through Plugin Commands, too!
 * * Automatically pad in-game windows to accommodate for cursor oscillation.
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
 * Animated Menu Cursor Instructions
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
 * Keep this in mind as you format your animated menu cursor.
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
 * === Menu Cursor Plugin Commands ===
 * 
 * ---
 *
 * Menu Cursor: Change Settings
 * - Changes the settings for the menu cursor's appearance.
 *
 *   Appearance Type:
 *   - Select the appearance type for the menu cursor.
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
 * Plugin Parameters: Menu Cursor Settings
 * ============================================================================
 *
 * This is where you can change the settings for the menu cursor.
 *
 * ---
 *
 * Appearance Type
 * 
 *   Appearance Type:
 *   - Select the appearance type for the menu cursor.
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
 * Plugin Parameters: Background Tiling
 * ============================================================================
 *
 * For added visual clarity, you can add a tiling background to the menu cursor
 * that can scroll, hue shift, and has a color tone.
 *
 * ---
 *
 * General
 * 
 *   Enable?:
 *   - Enable background tiling?
 * 
 *   Filename:
 *   - Filename of the parallax used for the tiling effect.
 *   - Leave empty to not use a background tile.
 *
 * ---
 *
 * Appearance
 * 
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the tiling?
 * 
 *   Buffer:
 *   - How many pixels should be used to buffer the tiling?
 * 
 *   Color Tone:
 *   - What tone do you want for the tiling?
 *   - Format: [Red, Green, Blue, Gray]
 * 
 *   Hue:
 *   - Do you wish to adjust this tiling's hue?
 * 
 *   Hue Shift:
 *   - How much do you want the hue to shift each frame?
 * 
 *   Opacity:
 *   - What is the opacity of the tiling effect?
 * 
 *   Scroll X Speed:
 *   Scroll Y Speed:
 *   - How fast should the tile effect scroll horizontally/vertically?
 *   - 0 for no scroll.
 *   - Negative values scroll the other way.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Blacklist Settings
 * ============================================================================
 * 
 * The menu cursor will not appear in these windows.
 * 
 * ---
 * 
 * Settings
 * 
 *   Window Blacklist:
 *   - Insert the names of the windows' constructors here
 *   - Example: Window_ItemCategory
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Padding Settings
 * ============================================================================
 *
 * Make some windows more padded to accommodate for the menu cursor's
 * oscillation. Because of the oscillation, the cursor would sometimes go over
 * the displayed text. These settings help pad the individual entries and shift
 * over the text to make room for the cursor to move back and forth at.
 *
 * ---
 *
 * Window Padding Settings
 * 
 *   All Windows:
 *   - How much extra item padding do you want for all windows?
 * 
 *   Window_MenuCommand:
 *   Window_MenuStatus:
 *   Window_MenuActor:
 *   Window_ItemCategory:
 *   Window_ItemList:
 *   Window_SkillType:
 *   Window_SkillList:
 *   Window_EquipCommand:
 *   Window_EquipSlot:
 *   Window_EquipItem:
 *   Window_Options:
 *   Window_SavefileList:
 *   Window_ShopCommand:
 *   Window_ShopBuy:
 *   Window_ShopSell:
 *   Window_NameInput:
 *   Window_ChoiceList:
 *   Window_EventItem:
 *   Window_PartyCommand:
 *   Window_ActorCommand:
 *   Window_BattleStatus:
 *   Window_BattleActor:
 *   Window_BattleEnemy:
 *   Window_BattleSkill:
 *   Window_BattleItem:
 *   Window_TitleCommand:
 *   Window_GameEnd:
 *   Window_DebugRange:
 *   Window_DebugEdit:
 *   Window_CommonEventMenuList:
 *   Window_QuestCommand:
 *   Window_QuestList:
 *   Window_TutorialList
 *   - How much extra item padding do you want for this window?
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
 * * Harmless
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.08: October 27, 2022
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.07: July 9, 2021
 * * Compatibility Update!
 * ** Added Item Crafting System's number window to the default list.
 * 
 * Version 1.06: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** "Background Tiling" series has been added for more visual clarity.
 * 
 * Version 1.05: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for removed feature.
 * * Feature Update!
 * ** "Window_NumberInput" for Window Padding Settings Plugin Parameter is now
 *    removed. This is due to numerous "bug reports" despite the issue of no
 *    numbers being shown having been fixed since v1.01. Since many users did
 *    not do a fresh reinstall of the plugin to fix the problem and continued
 *    to submit it as bug reports, we have decided it would be better to just
 *    hardcode the padding values for this window instead. Update by Irina.
 * 
 * Version 1.04: January 15, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * ** Added "Window_ShopNumber" to the default black list.
 * 
 * Version 1.03: January 8, 2021
 * * Bug Fixes!
 * ** Menu Cursor will no longer show if there is no index selected. Fix made
 *    by Irina.
 * 
 * Version 1.02: January 1, 2021
 * * Feature Update!
 * ** Added "Window_Status" to the default black list.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Changed the default value of the Window_NumberInput padding amount to 0
 *    from 16 so that numbers don't disappear. Fix made by Yanfly.
 *
 * Version 1.00: January 22, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCursorChangeSettings
 * @text Menu Cursor: Change Settings
 * @desc Changes the settings for the menu cursor's appearance.
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
 * @desc Select the appearance type for the menu cursor.
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
 * @default center
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
 * @default top
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
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MenuCursor
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MenuCursor:struct
 * @text Menu Cursor
 * @type struct<MenuCursor>
 * @desc Default settings for the menu cursor's appearance.
 * @default {"type:str":"icon","iconIndex:num":"112","pictureFilename:str":"","systemFilename:str":"","frameDelay:num":"8","Anchor":"","anchorX:str":"center","anchorY:str":"top","Position":"","positionX:str":"left","positionY:str":"middle","Offset":"","offsetX:num":"+0","offsetY:num":"+0","Wave":"","waveType:str":"horz","waveSpeed:num":"0.05","waveDistance:num":"10"}
 *
 * @param Tiling:struct
 * @text Background Tiling
 * @parent MenuCursor:struct
 * @type struct<Tiling>
 * @desc Background tiling settings for the menu cursor.
 * @default {"General":"","Enable:eval":"false","Filename:str":"StarlitSky","Appearance":"","BlendMode:num":"0","Buffer:num":"2","ColorTone:eval":"[0, 0, 0, 0]","Hue:num":"0","HueShift:num":"+0","Opacity:num":"255","ScrollX:num":"-1.25","ScrollY:num":"+0.5"}
 * 
 * @param CursorBlacklist:arraystr
 * @text Window Blacklist
 * @parent MenuCursor:struct
 * @type string[]
 * @desc The menu cursor will not appear in these windows.
 * @default ["Window_ItemCategory","Window_OptionsCategory","Window_Status","Window_ShopNumber","Window_ItemCraftingNumber"]
 *
 * @param WindowPadding:struct
 * @text Window Padding
 * @type struct<WindowPadding>
 * @desc Make some windows more padded to accommodate for the menu cursor's oscillation.
 * @default {"AllWindows_Padding:num":"0","Window_MenuCommand_Padding:num":"0","Window_MenuStatus_Padding:num":"0","Window_MenuActor_Padding:num":"0","Window_ItemCategory_Padding:num":"0","Window_ItemList_Padding:num":"0","Window_SkillType_Padding:num":"0","Window_SkillList_Padding:num":"0","Window_EquipCommand_Padding:num":"0","Window_EquipSlot_Padding:num":"16","Window_EquipItem_Padding:num":"0","Window_Options_Padding:num":"16","Window_SavefileList_Padding:num":"0","Window_ShopCommand_Padding:num":"0","Window_ShopBuy_Padding:num":"0","Window_ShopSell_Padding:num":"0","Window_NameInput_Padding:num":"0","Window_ChoiceList_Padding:num":"16","Window_EventItem_Padding:num":"0","Window_PartyCommand_Padding:num":"0","Window_ActorCommand_Padding:num":"0","Window_BattleStatus_Padding:num":"0","Window_BattleActor_Padding:num":"0","Window_BattleEnemy_Padding:num":"0","Window_BattleSkill_Padding:num":"0","Window_BattleItem_Padding:num":"0","Window_TitleCommand_Padding:num":"0","Window_GameEnd_Padding:num":"0","Window_DebugRange_Padding:num":"16","Window_DebugEdit_Padding:num":"16","Window_CommonEventMenuList_Padding:num":"0","Window_QuestCommand_Padding:num":"0","Window_QuestList_Padding:num":"16","Window_TutorialList_Padding:num":"16"}
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
 * MenuCursor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuCursor:
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
 * @desc Select the appearance type for the menu cursor.
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
 * @default center
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
 * @default top
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
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 */
/* ----------------------------------------------------------------------------
 * Tiling Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tiling:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable background tiling?
 * @default false
 * 
 * @param Filename:str
 * @text Filename
 * @parent General
 * @type file
 * @dir img/parallaxes/
 * @desc Filename of the parallax used for the tiling effect.
 * Leave empty to not use a background tile.
 * @default StarlitSky
 * 
 * @param Appearance
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Appearance
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the tiling?
 * @default 0
 *
 * @param Buffer:num
 * @text Buffer
 * @parent Appearance
 * @type number
 * @desc How many pixels should be used to buffer the tiling?
 * @default 2
 *
 * @param ColorTone:eval
 * @text Color Tone
 * @parent Appearance
 * @desc What tone do you want for the tiling?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @param Hue:num
 * @text Hue
 * @parent Appearance
 * @type number
 * @min 0
 * @max 360
 * @desc Do you wish to adjust this tiling's hue?
 * @default 0
 *
 * @param HueShift:num
 * @text Hue Shift
 * @parent Hue:num
 * @desc How much do you want the hue to shift each frame?
 * @default +0
 *
 * @param Opacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What is the opacity of the tiling effect?
 * @default 255
 *
 * @param ScrollX:num
 * @text Scroll X Speed
 * @parent Appearance
 * @desc How fast should the tile effect scroll horizontally?
 * 0 for no scroll. Negative values scroll the other way.
 * @default -1.25
 *
 * @param ScrollY:num
 * @text Scroll Y Speed
 * @parent Appearance
 * @desc How fast should the tile effect scroll vertically?
 * 0 for no scroll. Negative values scroll the other way.
 * @default +0.5
 *
 */
/* ----------------------------------------------------------------------------
 * Window Padding Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WindowPadding:
 *
 * @param AllWindows_Padding:num
 * @text All Windows
 * @type number
 * @desc How much extra item padding do you want for all windows?
 * @default 0
 *
 * @param Window_MenuCommand_Padding:num
 * @text Window_MenuCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_MenuStatus_Padding:num
 * @text Window_MenuStatus
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_MenuActor_Padding:num
 * @text Window_MenuActor
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ItemCategory_Padding:num
 * @text Window_ItemCategory
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ItemList_Padding:num
 * @text Window_ItemList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_SkillType_Padding:num
 * @text Window_SkillType
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_SkillList_Padding:num
 * @text Window_SkillList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_EquipCommand_Padding:num
 * @text Window_EquipCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_EquipSlot_Padding:num
 * @text Window_EquipSlot
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_EquipItem_Padding:num
 * @text Window_EquipItem
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_Options_Padding:num
 * @text Window_Options
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_SavefileList_Padding:num
 * @text Window_SavefileList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ShopCommand_Padding:num
 * @text Window_ShopCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ShopBuy_Padding:num
 * @text Window_ShopBuy
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ShopSell_Padding:num
 * @text Window_ShopSell
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_NameInput_Padding:num
 * @text Window_NameInput
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ChoiceList_Padding:num
 * @text Window_ChoiceList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_EventItem_Padding:num
 * @text Window_EventItem
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_PartyCommand_Padding:num
 * @text Window_PartyCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ActorCommand_Padding:num
 * @text Window_ActorCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleStatus_Padding:num
 * @text Window_BattleStatus
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleActor_Padding:num
 * @text Window_BattleActor
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleEnemy_Padding:num
 * @text Window_BattleEnemy
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleSkill_Padding:num
 * @text Window_BattleSkill
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleItem_Padding:num
 * @text Window_BattleItem
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_TitleCommand_Padding:num
 * @text Window_TitleCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_GameEnd_Padding:num
 * @text Window_GameEnd
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_DebugRange_Padding:num
 * @text Window_DebugRange
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_DebugEdit_Padding:num
 * @text Window_DebugEdit
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_CommonEventMenuList_Padding:num
 * @text Window_CommonEventMenuList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_QuestCommand_Padding:num
 * @text Window_QuestCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_QuestList_Padding:num
 * @text Window_QuestList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_TutorialList_Padding:num
 * @text Window_TutorialList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 */
//=============================================================================

const _0xe0f8de=_0x3a4c;(function(_0x52e6b6,_0x5624cb){const _0x3b6985=_0x3a4c,_0x15f0e1=_0x52e6b6();while(!![]){try{const _0x549577=parseInt(_0x3b6985(0x17b))/0x1*(-parseInt(_0x3b6985(0x1af))/0x2)+-parseInt(_0x3b6985(0x177))/0x3*(-parseInt(_0x3b6985(0x153))/0x4)+parseInt(_0x3b6985(0x14a))/0x5*(parseInt(_0x3b6985(0x15b))/0x6)+-parseInt(_0x3b6985(0x1a2))/0x7+-parseInt(_0x3b6985(0x164))/0x8+-parseInt(_0x3b6985(0x1be))/0x9+parseInt(_0x3b6985(0x19b))/0xa;if(_0x549577===_0x5624cb)break;else _0x15f0e1['push'](_0x15f0e1['shift']());}catch(_0x35d39d){_0x15f0e1['push'](_0x15f0e1['shift']());}}}(_0x193a,0xce00f));function _0x193a(){const _0x504fa7=['MenuCursor','jSRQe','waveSpeed','CazPa','HueShift','_updateBackgroundTilingHueShift','width','vert','STRUCT','anchorY','Window_Selectable_initialize','ARRAYFUNC','EVAL','prototype','max','create','parameters','call','makeDeepCopy','offsetY','itemPadding','Settings','offsetX','initialize','version','updateOpacity','updatePosition','updateScale','_updateBackgroundTiling','xxiMi','horz','updateFrameColsRows','scale','frameDelay','registerCommand','removeChild','_menuCursorData','lnjjh','pictureFilename','Hue','bind','addChild','BlendMode','waveType','refreshMenuCursorChildren','determineFrameColsRows','right','setHue','MenuCursorChangeSettings','_createBackgroundTiling','95VDsEdA','initMenuCursorSettings','updateAnchor','opacity','Window_updateCursor','JSON','_createCursorSprite','updateFrame','index','4209740yAnYip','_frameMax','middle','Opacity','menuCursor','format','addLoadListener','AllWindows_ItemPadding','199302DXmWcG','description','NUM','round','systemFilename','positionX','_hue','icon','%1_Padding','2540280pBkyup','Game_System_initialize','isMenuCursorBlacklisted','FlgAZ','log','height','anchor','qXBCh','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','POJQd','iconHeight','children','name','loadSystem','filter','move','loadPicture','hJpmC','iconWidth','3WMTyej','type','_cursorBgTiling','_parentWindow','2RpRMhF','ARRAYEVAL','updateWave','Tiling','ScrollX','system','includes','filters','match','updateParentWindow','loadBitmap','isVisible','parent','Filename','waveDistance','bitmap','picture','_colorFilter','VDiwK','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','createMenuCursor','toUpperCase','map','Szuou','left','push','Buffer','ARRAYSTRUCT','frameCount','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_cursorSprite','bottom','24349210jThILq','parse','_updateCursor','UnRtB','_updateBackgroundTilingScroll','Enable','exit','10878063eyMlKZ','center','iconIndex','_cache','_settings','krZSj','ScrollY','update','trim','aVgNe','updateFrameIcon','initMembers','setParentWindow','813274EnlmJo','ColorTone','_frameCols','setFrame','_frameRows','floor','Window_Base_itemPadding','setMenuCursor','top','blendMode','clamp','UXFlg','Window_createCursorSprite','_scene','constructor','5308830ZYqLyS','loadParallax','_menuCursorSprite','_updateBackgroundTilingDimensions','_frameIndex','_clientArea','active','ConvertParams','rFzOq'];_0x193a=function(){return _0x504fa7;};return _0x193a();}var label=_0xe0f8de(0x1c7),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xe0f8de(0x172)](function(_0x29472e){const _0x6d6efd=_0xe0f8de;return _0x29472e['status']&&_0x29472e[_0x6d6efd(0x15c)][_0x6d6efd(0x181)]('['+label+']');})[0x0];VisuMZ[label][_0xe0f8de(0x1dc)]=VisuMZ[label][_0xe0f8de(0x1dc)]||{},VisuMZ['ConvertParams']=function(_0x35a82c,_0xf32350){const _0x5c01dd=_0xe0f8de;for(const _0x9abf9d in _0xf32350){if(_0x5c01dd(0x1ab)===_0x5c01dd(0x1ab)){if(_0x9abf9d[_0x5c01dd(0x183)](/(.*):(.*)/i)){const _0x570514=String(RegExp['$1']),_0x479bf9=String(RegExp['$2'])[_0x5c01dd(0x190)]()[_0x5c01dd(0x1aa)]();let _0x4af74f,_0x4f905c,_0x607671;switch(_0x479bf9){case _0x5c01dd(0x15d):_0x4af74f=_0xf32350[_0x9abf9d]!==''?Number(_0xf32350[_0x9abf9d]):0x0;break;case'ARRAYNUM':_0x4f905c=_0xf32350[_0x9abf9d]!==''?JSON['parse'](_0xf32350[_0x9abf9d]):[],_0x4af74f=_0x4f905c[_0x5c01dd(0x191)](_0x489596=>Number(_0x489596));break;case _0x5c01dd(0x1d3):_0x4af74f=_0xf32350[_0x9abf9d]!==''?eval(_0xf32350[_0x9abf9d]):null;break;case _0x5c01dd(0x17c):_0x4f905c=_0xf32350[_0x9abf9d]!==''?JSON['parse'](_0xf32350[_0x9abf9d]):[],_0x4af74f=_0x4f905c[_0x5c01dd(0x191)](_0x226a04=>eval(_0x226a04));break;case _0x5c01dd(0x14f):_0x4af74f=_0xf32350[_0x9abf9d]!==''?JSON[_0x5c01dd(0x19c)](_0xf32350[_0x9abf9d]):'';break;case'ARRAYJSON':_0x4f905c=_0xf32350[_0x9abf9d]!==''?JSON[_0x5c01dd(0x19c)](_0xf32350[_0x9abf9d]):[],_0x4af74f=_0x4f905c[_0x5c01dd(0x191)](_0x438027=>JSON[_0x5c01dd(0x19c)](_0x438027));break;case'FUNC':_0x4af74f=_0xf32350[_0x9abf9d]!==''?new Function(JSON[_0x5c01dd(0x19c)](_0xf32350[_0x9abf9d])):new Function('return\x200');break;case _0x5c01dd(0x1d2):_0x4f905c=_0xf32350[_0x9abf9d]!==''?JSON['parse'](_0xf32350[_0x9abf9d]):[],_0x4af74f=_0x4f905c[_0x5c01dd(0x191)](_0x5845e3=>new Function(JSON[_0x5c01dd(0x19c)](_0x5845e3)));break;case'STR':_0x4af74f=_0xf32350[_0x9abf9d]!==''?String(_0xf32350[_0x9abf9d]):'';break;case'ARRAYSTR':_0x4f905c=_0xf32350[_0x9abf9d]!==''?JSON['parse'](_0xf32350[_0x9abf9d]):[],_0x4af74f=_0x4f905c[_0x5c01dd(0x191)](_0x3e7e64=>String(_0x3e7e64));break;case _0x5c01dd(0x1cf):_0x607671=_0xf32350[_0x9abf9d]!==''?JSON['parse'](_0xf32350[_0x9abf9d]):{},_0x4af74f=VisuMZ['ConvertParams']({},_0x607671);break;case _0x5c01dd(0x196):_0x4f905c=_0xf32350[_0x9abf9d]!==''?JSON[_0x5c01dd(0x19c)](_0xf32350[_0x9abf9d]):[],_0x4af74f=_0x4f905c[_0x5c01dd(0x191)](_0x2f0c0b=>VisuMZ[_0x5c01dd(0x1c5)]({},JSON['parse'](_0x2f0c0b)));break;default:continue;}_0x35a82c[_0x570514]=_0x4af74f;}}else try{return _0x3721e3[_0x5c01dd(0x1c7)][_0x5c01dd(0x1b5)]['call'](this);}catch(_0x2df3dc){return 0x8;}}return _0x35a82c;},(_0x2e89f6=>{const _0xb7e1fd=_0xe0f8de,_0x479d02=_0x2e89f6['name'];for(const _0x275026 of dependencies){if(_0xb7e1fd(0x16b)!=='aKjVz'){if(!Imported[_0x275026]){alert(_0xb7e1fd(0x198)[_0xb7e1fd(0x158)](_0x479d02,_0x275026)),SceneManager[_0xb7e1fd(0x1a1)]();break;}}else{const _0x52384e=_0x1ff838[_0xb7e1fd(0x1c7)][_0xb7e1fd(0x1dc)][_0xb7e1fd(0x17e)];if(!_0x52384e)return;const _0x100a4c=this[_0xb7e1fd(0x199)],_0x4b9db0=this['_cursorBgTiling'],_0x587604=_0x52384e[_0xb7e1fd(0x195)];_0x4b9db0[_0xb7e1fd(0x173)](_0x100a4c['x']+_0x587604,_0x100a4c['y']+_0x587604,_0xfd8882[_0xb7e1fd(0x1d5)](_0x100a4c[_0xb7e1fd(0x1cd)]-_0x587604*0x2,0x0),_0x5d4431['max'](_0x100a4c[_0xb7e1fd(0x169)]-_0x587604*0x2,0x0));}}const _0x2ec76e=_0x2e89f6[_0xb7e1fd(0x15c)];if(_0x2ec76e['match'](/\[Version[ ](.*?)\]/i)){if(_0xb7e1fd(0x1ba)!==_0xb7e1fd(0x1ba))this[_0xb7e1fd(0x1de)](...arguments);else{const _0x2860de=Number(RegExp['$1']);_0x2860de!==VisuMZ[label][_0xb7e1fd(0x1df)]&&(_0xb7e1fd(0x167)===_0xb7e1fd(0x18d)?(_0x17af81(_0xb7e1fd(0x16c)[_0xb7e1fd(0x158)](_0xe0a37f,_0x3ea735,_0xa5434e)),_0x4208dd[_0xb7e1fd(0x1a1)]()):(alert(_0xb7e1fd(0x18e)[_0xb7e1fd(0x158)](_0x479d02,_0x2860de)),SceneManager[_0xb7e1fd(0x1a1)]()));}}if(_0x2ec76e['match'](/\[Tier[ ](\d+)\]/i)){const _0x3a892e=Number(RegExp['$1']);if(_0x3a892e<tier)alert(_0xb7e1fd(0x16c)['format'](_0x479d02,_0x3a892e,tier)),SceneManager['exit']();else{if('cOGNQ'!=='LdtbD')tier=Math[_0xb7e1fd(0x1d5)](_0x3a892e,tier);else{if(!this['_cursorBgTiling'])return;this[_0xb7e1fd(0x1c1)](),this[_0xb7e1fd(0x19f)](),this[_0xb7e1fd(0x1cc)]();}}}VisuMZ[_0xb7e1fd(0x1c5)](VisuMZ[label][_0xb7e1fd(0x1dc)],_0x2e89f6[_0xb7e1fd(0x1d7)]);})(pluginData),PluginManager[_0xe0f8de(0x1e9)](pluginData[_0xe0f8de(0x170)],_0xe0f8de(0x148),_0x560a1c=>{const _0x4a620e=_0xe0f8de;VisuMZ[_0x4a620e(0x1c5)](_0x560a1c,_0x560a1c);const _0x4ff3c3=JsonEx[_0x4a620e(0x1d9)](_0x560a1c);$gameSystem[_0x4a620e(0x1b6)](_0x4ff3c3);}),VisuMZ[_0xe0f8de(0x1c7)]['Game_System_initialize']=Game_System[_0xe0f8de(0x1d4)][_0xe0f8de(0x1de)],Game_System[_0xe0f8de(0x1d4)][_0xe0f8de(0x1de)]=function(){const _0x11bfa8=_0xe0f8de;VisuMZ[_0x11bfa8(0x1c7)]['Game_System_initialize']['call'](this),this[_0x11bfa8(0x14b)]();},Game_System[_0xe0f8de(0x1d4)]['initMenuCursorSettings']=function(){const _0x1980ed=_0xe0f8de;this[_0x1980ed(0x1eb)]=JsonEx[_0x1980ed(0x1d9)](VisuMZ[_0x1980ed(0x1c7)][_0x1980ed(0x1dc)][_0x1980ed(0x1c7)]);},Game_System['prototype'][_0xe0f8de(0x157)]=function(){const _0x11c105=_0xe0f8de;if(this[_0x11c105(0x1eb)]===undefined)this[_0x11c105(0x14b)]();return this[_0x11c105(0x1eb)];},Game_System[_0xe0f8de(0x1d4)][_0xe0f8de(0x1b6)]=function(_0x3770e2){const _0x4cf8c1=_0xe0f8de;this[_0x4cf8c1(0x1eb)]=_0x3770e2,this[_0x4cf8c1(0x1f3)](SceneManager[_0x4cf8c1(0x1bc)]);},Game_System[_0xe0f8de(0x1d4)][_0xe0f8de(0x1f3)]=function(_0x5f094f){const _0x4acd05=_0xe0f8de;if(!_0x5f094f)return;_0x5f094f[_0x4acd05(0x18f)]&&_0x5f094f['createMenuCursor']();if(_0x5f094f[_0x4acd05(0x16f)])for(const _0x50782a of _0x5f094f[_0x4acd05(0x16f)]){_0x4acd05(0x19e)==='xgRoP'?(_0x65ba98[_0x4acd05(0x183)](/\[(\d+)x(\d+)\]/i)?(this[_0x4acd05(0x1b1)]=_0x26dec1[_0x4acd05(0x1d5)](0x1,_0x521d56(_0x31353d['$1'])),this['_frameRows']=_0xfc5d2b[_0x4acd05(0x1d5)](0x1,_0x2d53e9(_0x2be24c['$2']))):(this[_0x4acd05(0x1b1)]=0x1,this[_0x4acd05(0x1b3)]=0x1),this['_frameMax']=this[_0x4acd05(0x1b1)]*this[_0x4acd05(0x1b3)]):$gameSystem[_0x4acd05(0x1f3)](_0x50782a);}};function _0x3a4c(_0x385ed7,_0x2e2528){const _0x193a9b=_0x193a();return _0x3a4c=function(_0x3a4c6d,_0x11b454){_0x3a4c6d=_0x3a4c6d-0x146;let _0x3df94b=_0x193a9b[_0x3a4c6d];return _0x3df94b;},_0x3a4c(_0x385ed7,_0x2e2528);}function Sprite_MenuCursor(){const _0x200ad2=_0xe0f8de;this[_0x200ad2(0x1de)](...arguments);}Sprite_MenuCursor['prototype']=Object[_0xe0f8de(0x1d6)](Sprite[_0xe0f8de(0x1d4)]),Sprite_MenuCursor['prototype'][_0xe0f8de(0x1bd)]=Sprite_MenuCursor,Sprite_MenuCursor[_0xe0f8de(0x1d4)]['initialize']=function(){const _0x118bfa=_0xe0f8de;Sprite['prototype']['initialize'][_0x118bfa(0x1d8)](this),this[_0x118bfa(0x1ad)]();},Sprite_MenuCursor['prototype']['initMembers']=function(){const _0x25a822=_0xe0f8de;this[_0x25a822(0x17a)]=null,this[_0x25a822(0x1a6)]=null,this[_0x25a822(0x1c2)]=0x0,this[_0x25a822(0x1b1)]=0x1,this[_0x25a822(0x1b3)]=0x1,this[_0x25a822(0x154)]=0x1,this['_cache']={'scale':{'x':0x1,'y':0x1}},this['opacity']=0x0;},Sprite_MenuCursor[_0xe0f8de(0x1d4)][_0xe0f8de(0x1ae)]=function(_0x42a35c){const _0x17ae34=_0xe0f8de;if(this[_0x17ae34(0x17a)]===_0x42a35c)return;this[_0x17ae34(0x17a)]=_0x42a35c,this[_0x17ae34(0x17a)]?this[_0x17ae34(0x184)]():this[_0x17ae34(0x1a6)]=null;},Sprite_MenuCursor[_0xe0f8de(0x1d4)][_0xe0f8de(0x184)]=function(){const _0x4943b9=_0xe0f8de;this['_settings']=$gameSystem['menuCursor'](),this[_0x4943b9(0x14c)](),this[_0x4943b9(0x185)]();},Sprite_MenuCursor['prototype'][_0xe0f8de(0x14c)]=function(){const _0x44bf86=_0xe0f8de;switch(this['_settings']['anchorX']){case'left':this[_0x44bf86(0x16a)]['x']=0x0;break;case _0x44bf86(0x1a3):this[_0x44bf86(0x16a)]['x']=0.5;break;case'right':this['anchor']['x']=0x1;break;}switch(this[_0x44bf86(0x1a6)][_0x44bf86(0x1d0)]){case'top':this[_0x44bf86(0x16a)]['y']=0x0;break;case _0x44bf86(0x155):this[_0x44bf86(0x16a)]['y']=0.5;break;case _0x44bf86(0x19a):this[_0x44bf86(0x16a)]['y']=0x1;break;}},Sprite_MenuCursor[_0xe0f8de(0x1d4)][_0xe0f8de(0x185)]=function(){const _0x29d1b5=_0xe0f8de;if(!this['_settings'])return;switch(this[_0x29d1b5(0x1a6)][_0x29d1b5(0x178)]){case _0x29d1b5(0x162):this[_0x29d1b5(0x18a)]=ImageManager[_0x29d1b5(0x171)]('IconSet');break;case _0x29d1b5(0x18b):this[_0x29d1b5(0x18a)]=ImageManager[_0x29d1b5(0x174)](this['_settings']['pictureFilename']),this[_0x29d1b5(0x1f4)](this[_0x29d1b5(0x1a6)][_0x29d1b5(0x1ed)]);break;case _0x29d1b5(0x180):this[_0x29d1b5(0x18a)]=ImageManager[_0x29d1b5(0x171)](this['_settings']['systemFilename']),this[_0x29d1b5(0x1f4)](this[_0x29d1b5(0x1a6)][_0x29d1b5(0x15f)]);break;}this[_0x29d1b5(0x1c2)]=0x0,this['bitmap'][_0x29d1b5(0x159)](this[_0x29d1b5(0x151)][_0x29d1b5(0x1ef)](this,!![]));},Sprite_MenuCursor[_0xe0f8de(0x1d4)][_0xe0f8de(0x1f4)]=function(_0x16b9ab){const _0x5876d5=_0xe0f8de;if(_0x16b9ab[_0x5876d5(0x183)](/\[(\d+)x(\d+)\]/i)){if(_0x5876d5(0x175)===_0x5876d5(0x1a7)){const _0x31351f=_0x3b481a[_0x5876d5(0x1c7)][_0x5876d5(0x1dc)]['WindowPadding'];let _0x460fce=_0x31351f[_0x5876d5(0x15a)]||0x0;return _0x460fce+=_0x31351f[_0x5876d5(0x163)[_0x5876d5(0x158)](this[_0x5876d5(0x1bd)][_0x5876d5(0x170)])]||0x0,_0x42ab20['MenuCursor'][_0x5876d5(0x1b5)]['call'](this)+_0x460fce;}else this['_frameCols']=Math[_0x5876d5(0x1d5)](0x1,Number(RegExp['$1'])),this[_0x5876d5(0x1b3)]=Math[_0x5876d5(0x1d5)](0x1,Number(RegExp['$2']));}else _0x5876d5(0x1ca)!=='CazPa'?(this['_settings']=_0x31302d['menuCursor'](),this[_0x5876d5(0x14c)](),this[_0x5876d5(0x185)]()):(this[_0x5876d5(0x1b1)]=0x1,this[_0x5876d5(0x1b3)]=0x1);this[_0x5876d5(0x154)]=this[_0x5876d5(0x1b1)]*this[_0x5876d5(0x1b3)];},Sprite_MenuCursor[_0xe0f8de(0x1d4)][_0xe0f8de(0x1a9)]=function(){const _0x1a9b9d=_0xe0f8de;Sprite['prototype'][_0x1a9b9d(0x1a9)]['call'](this),this['_parentWindow']&&this[_0x1a9b9d(0x18a)]&&this[_0x1a9b9d(0x18a)][_0x1a9b9d(0x1cd)]>0x0?_0x1a9b9d(0x1c8)!==_0x1a9b9d(0x1c8)?this['x']+=_0x54e9f3:(this['updateOpacity'](),this[_0x1a9b9d(0x1e2)](),this[_0x1a9b9d(0x151)](),this[_0x1a9b9d(0x1e1)](),this['updateWave']()):_0x1a9b9d(0x1c6)!==_0x1a9b9d(0x16d)?this['opacity']=0x0:(_0x555cb1(_0x1a9b9d(0x18e)[_0x1a9b9d(0x158)](_0x1ac910,_0x21f6a0)),_0x1bea59[_0x1a9b9d(0x1a1)]());},Sprite_MenuCursor['prototype'][_0xe0f8de(0x1e0)]=function(){const _0x38b7cd=_0xe0f8de;this[_0x38b7cd(0x14d)]=this[_0x38b7cd(0x186)]()?0xff:0x0;},Sprite_MenuCursor[_0xe0f8de(0x1d4)][_0xe0f8de(0x186)]=function(){const _0x548c98=_0xe0f8de,_0x48e4a6=this[_0x548c98(0x17a)];if(!_0x48e4a6)return![];if(!_0x48e4a6['active'])return![];if(_0x48e4a6[_0x548c98(0x152)]()<0x0)return![];return!![];},Sprite_MenuCursor[_0xe0f8de(0x1d4)][_0xe0f8de(0x1e2)]=function(){const _0xdd6f17=_0xe0f8de;if(!this[_0xdd6f17(0x187)])return;if(this[_0xdd6f17(0x14d)]<=0x0)return;if(this[_0xdd6f17(0x1a5)]['scale']['x']===this[_0xdd6f17(0x187)][_0xdd6f17(0x1e7)]['x']&&this[_0xdd6f17(0x1a5)]['scale']['y']===this[_0xdd6f17(0x187)][_0xdd6f17(0x1e7)]['y'])return;this[_0xdd6f17(0x1e7)]['x']=0x1/this[_0xdd6f17(0x187)][_0xdd6f17(0x1e7)]['x'],this[_0xdd6f17(0x1e7)]['y']=0x1/this['parent'][_0xdd6f17(0x1e7)]['y'],this[_0xdd6f17(0x1a5)][_0xdd6f17(0x1e7)]['x']=this[_0xdd6f17(0x187)][_0xdd6f17(0x1e7)]['x'],this['_cache'][_0xdd6f17(0x1e7)]['y']=this[_0xdd6f17(0x187)][_0xdd6f17(0x1e7)]['y'];},Sprite_MenuCursor['prototype'][_0xe0f8de(0x151)]=function(_0x564392){const _0x2a728e=_0xe0f8de;if(!_0x564392){if(Graphics['frameCount']%this['_settings'][_0x2a728e(0x1e8)]>0x0)return;}switch(this[_0x2a728e(0x1a6)][_0x2a728e(0x178)]){case _0x2a728e(0x162):this[_0x2a728e(0x1ac)]();break;case'picture':case _0x2a728e(0x180):this[_0x2a728e(0x1e6)]();break;};},Sprite_MenuCursor[_0xe0f8de(0x1d4)][_0xe0f8de(0x1ac)]=function(){const _0x51dc1c=_0xe0f8de,_0xb9805d=this['_settings'][_0x51dc1c(0x1a4)],_0x22fefc=ImageManager[_0x51dc1c(0x176)],_0x12bb1a=ImageManager[_0x51dc1c(0x16e)],_0x3d9b72=_0xb9805d%0x10*_0x22fefc,_0x6959bc=Math[_0x51dc1c(0x1b4)](_0xb9805d/0x10)*_0x12bb1a;this['setFrame'](_0x3d9b72,_0x6959bc,_0x22fefc,_0x12bb1a);},Sprite_MenuCursor[_0xe0f8de(0x1d4)][_0xe0f8de(0x1e6)]=function(){const _0x544da0=_0xe0f8de;this[_0x544da0(0x1c2)]++;if(this[_0x544da0(0x1c2)]>=this[_0x544da0(0x154)])this[_0x544da0(0x1c2)]=0x0;var _0x50a580=this['bitmap'][_0x544da0(0x1cd)]/this[_0x544da0(0x1b1)],_0xf502bf=this[_0x544da0(0x18a)]['height']/this[_0x544da0(0x1b3)],_0x1ba107=this[_0x544da0(0x1c2)]%this[_0x544da0(0x1b1)]*_0x50a580,_0x4d1e56=Math[_0x544da0(0x1b4)](this[_0x544da0(0x1c2)]/this[_0x544da0(0x1b1)])*_0xf502bf;this[_0x544da0(0x1b2)](_0x1ba107,_0x4d1e56,_0x50a580,_0xf502bf);},Sprite_MenuCursor[_0xe0f8de(0x1d4)][_0xe0f8de(0x1e1)]=function(){const _0x37f542=_0xe0f8de;if(!this[_0x37f542(0x187)])return;if(!this[_0x37f542(0x17a)])return;const _0x5cf7ee=this[_0x37f542(0x17a)][_0x37f542(0x199)];if(!_0x5cf7ee){if(this['_parentWindow'][_0x37f542(0x1bd)]===Window_MenuCommand)console[_0x37f542(0x168)](this[_0x37f542(0x199)]);this[_0x37f542(0x14d)]=0x0;return;}const _0x5be622=_0x5cf7ee[_0x37f542(0x1cd)],_0x2bab31=_0x5cf7ee[_0x37f542(0x169)],_0x58c90b=this[_0x37f542(0x17a)][_0x37f542(0x1c3)],_0xb0b7b2=this[_0x37f542(0x17a)]['_padding'];switch(this[_0x37f542(0x1a6)][_0x37f542(0x160)]){case _0x37f542(0x193):this['x']=_0x5cf7ee['x'];break;case'center':this['x']=_0x5cf7ee['x']+Math[_0x37f542(0x15e)](_0x5be622/0x2);break;case _0x37f542(0x146):this['x']=_0x5cf7ee['x']+_0x5be622;break;}switch(this[_0x37f542(0x1a6)]['positionY']){case _0x37f542(0x1b7):this['y']=_0x5cf7ee['y'];break;case _0x37f542(0x155):this['y']=_0x5cf7ee['y']+Math[_0x37f542(0x15e)](_0x2bab31/0x2);break;case _0x37f542(0x19a):this['y']=_0x5cf7ee['y']+_0x2bab31;break;}this['x']+=_0x58c90b['x'],this['y']+=_0x58c90b['y'],this['x']+=this[_0x37f542(0x1a6)][_0x37f542(0x1dd)],this['y']+=this[_0x37f542(0x1a6)][_0x37f542(0x1da)],this['x']=this['x']['clamp'](_0xb0b7b2,this[_0x37f542(0x17a)]['width']-_0xb0b7b2),this['y']=this['y'][_0x37f542(0x1b9)](_0xb0b7b2,this[_0x37f542(0x17a)][_0x37f542(0x169)]-_0xb0b7b2);},Sprite_MenuCursor[_0xe0f8de(0x1d4)][_0xe0f8de(0x17d)]=function(){const _0x533f1e=_0xe0f8de,_0x27c314=this[_0x533f1e(0x1a6)][_0x533f1e(0x1f2)];if(_0x27c314==='none')return;if(this['_settings'][_0x533f1e(0x189)]<=0x0)return;const _0xc6fbd5=this['_settings']['waveDistance'],_0x42ea14=this[_0x533f1e(0x1a6)][_0x533f1e(0x1c9)],_0x397324=Math[_0x533f1e(0x15e)](Math['cos'](Graphics[_0x533f1e(0x197)]*_0x42ea14)*_0xc6fbd5);if(_0x27c314===_0x533f1e(0x1e5)){if(_0x533f1e(0x1ec)==='lnjjh')this['x']+=_0x397324;else{_0x4cbe01[_0x533f1e(0x1c5)](_0x5e1a9d,_0x52e617);const _0x4da57e=_0x3ffaf4['makeDeepCopy'](_0x4270a3);_0x348d2a[_0x533f1e(0x1b6)](_0x4da57e);}}else _0x27c314===_0x533f1e(0x1ce)&&(this['y']+=_0x397324);},VisuMZ[_0xe0f8de(0x1c7)][_0xe0f8de(0x1b5)]=Window_Base[_0xe0f8de(0x1d4)][_0xe0f8de(0x1db)],Window_Base[_0xe0f8de(0x1d4)][_0xe0f8de(0x1db)]=function(){const _0x93a424=_0xe0f8de,_0x41b6d7=VisuMZ['MenuCursor'][_0x93a424(0x1dc)]['WindowPadding'];let _0x1d9b78=_0x41b6d7[_0x93a424(0x15a)]||0x0;return _0x1d9b78+=_0x41b6d7[_0x93a424(0x163)['format'](this[_0x93a424(0x1bd)][_0x93a424(0x170)])]||0x0,VisuMZ[_0x93a424(0x1c7)]['Window_Base_itemPadding'][_0x93a424(0x1d8)](this)+_0x1d9b78;},VisuMZ[_0xe0f8de(0x1c7)]['Window_createCursorSprite']=Window[_0xe0f8de(0x1d4)][_0xe0f8de(0x150)],Window[_0xe0f8de(0x1d4)][_0xe0f8de(0x150)]=function(){const _0x5ddacf=_0xe0f8de;VisuMZ[_0x5ddacf(0x1c7)][_0x5ddacf(0x1bb)]['call'](this),this[_0x5ddacf(0x149)]();},Window[_0xe0f8de(0x1d4)][_0xe0f8de(0x149)]=function(){const _0x47a4bd=_0xe0f8de,_0x5e9953=VisuMZ[_0x47a4bd(0x1c7)]['Settings'][_0x47a4bd(0x17e)];if(!_0x5e9953)return;if(!_0x5e9953[_0x47a4bd(0x1a0)])return;if(_0x5e9953[_0x47a4bd(0x188)]==='')return;this[_0x47a4bd(0x179)]=new TilingSprite(),this[_0x47a4bd(0x179)][_0x47a4bd(0x18a)]=ImageManager[_0x47a4bd(0x1bf)](_0x5e9953['Filename']),this[_0x47a4bd(0x1c3)][_0x47a4bd(0x1f0)](this[_0x47a4bd(0x179)]),this[_0x47a4bd(0x179)]['filters']=this[_0x47a4bd(0x179)]['filters']||[],this['_cursorBgTiling']['_colorFilter']=new ColorFilter(),this[_0x47a4bd(0x179)][_0x47a4bd(0x182)][_0x47a4bd(0x194)](this['_cursorBgTiling'][_0x47a4bd(0x18c)]),this[_0x47a4bd(0x179)][_0x47a4bd(0x1b8)]=_0x5e9953[_0x47a4bd(0x1f1)],this[_0x47a4bd(0x179)][_0x47a4bd(0x14d)]=_0x5e9953[_0x47a4bd(0x156)],this[_0x47a4bd(0x179)][_0x47a4bd(0x18c)][_0x47a4bd(0x161)]=_0x5e9953[_0x47a4bd(0x1ee)]||0x0,this['_cursorBgTiling'][_0x47a4bd(0x18c)][_0x47a4bd(0x147)](_0x5e9953[_0x47a4bd(0x1ee)]||0x0),this['_cursorBgTiling'][_0x47a4bd(0x18c)]['setColorTone'](_0x5e9953[_0x47a4bd(0x1b0)]||[0x0,0x0,0x0,0x0]);},VisuMZ[_0xe0f8de(0x1c7)]['Window_updateCursor']=Window[_0xe0f8de(0x1d4)][_0xe0f8de(0x19d)],Window[_0xe0f8de(0x1d4)]['_updateCursor']=function(){const _0x346b33=_0xe0f8de;VisuMZ[_0x346b33(0x1c7)][_0x346b33(0x14e)][_0x346b33(0x1d8)](this),this[_0x346b33(0x1e3)]();},Window[_0xe0f8de(0x1d4)]['_updateBackgroundTiling']=function(){const _0x30ec5a=_0xe0f8de;if(!this[_0x30ec5a(0x179)])return;this[_0x30ec5a(0x1c1)](),this[_0x30ec5a(0x19f)](),this['_updateBackgroundTilingHueShift']();},Window[_0xe0f8de(0x1d4)]['_updateBackgroundTilingDimensions']=function(){const _0x2f901b=_0xe0f8de,_0xfeaaf6=VisuMZ[_0x2f901b(0x1c7)][_0x2f901b(0x1dc)]['Tiling'];if(!_0xfeaaf6)return;const _0x55812b=this[_0x2f901b(0x199)],_0x2e527f=this[_0x2f901b(0x179)],_0x266b54=_0xfeaaf6['Buffer'];_0x2e527f[_0x2f901b(0x173)](_0x55812b['x']+_0x266b54,_0x55812b['y']+_0x266b54,Math[_0x2f901b(0x1d5)](_0x55812b[_0x2f901b(0x1cd)]-_0x266b54*0x2,0x0),Math[_0x2f901b(0x1d5)](_0x55812b['height']-_0x266b54*0x2,0x0));},Window[_0xe0f8de(0x1d4)]['_updateBackgroundTilingScroll']=function(){const _0x51ba45=_0xe0f8de;if(!this['active'])return;const _0x5ca745=VisuMZ[_0x51ba45(0x1c7)][_0x51ba45(0x1dc)][_0x51ba45(0x17e)];if(!_0x5ca745)return;const _0x310388=this[_0x51ba45(0x179)];_0x310388['origin']['x']+=_0x5ca745[_0x51ba45(0x17f)],_0x310388['origin']['y']+=_0x5ca745[_0x51ba45(0x1a8)];},Window[_0xe0f8de(0x1d4)][_0xe0f8de(0x1cc)]=function(){const _0x2f4b7c=_0xe0f8de;if(!this[_0x2f4b7c(0x1c4)])return;const _0x56459c=VisuMZ[_0x2f4b7c(0x1c7)][_0x2f4b7c(0x1dc)][_0x2f4b7c(0x17e)];if(!_0x56459c)return;this['_cursorBgTiling'][_0x2f4b7c(0x18c)][_0x2f4b7c(0x161)]+=_0x56459c[_0x2f4b7c(0x1cb)],this[_0x2f4b7c(0x179)][_0x2f4b7c(0x18c)][_0x2f4b7c(0x147)](this[_0x2f4b7c(0x179)][_0x2f4b7c(0x18c)]['_hue']);},VisuMZ['MenuCursor'][_0xe0f8de(0x1d1)]=Window_Selectable['prototype'][_0xe0f8de(0x1de)],Window_Selectable[_0xe0f8de(0x1d4)][_0xe0f8de(0x1de)]=function(_0x125306){const _0x1ab246=_0xe0f8de;VisuMZ[_0x1ab246(0x1c7)][_0x1ab246(0x1d1)][_0x1ab246(0x1d8)](this,_0x125306),this[_0x1ab246(0x18f)]();},Window_Selectable[_0xe0f8de(0x1d4)]['createMenuCursor']=function(){const _0x57e1f1=_0xe0f8de;if(this[_0x57e1f1(0x166)]())return;this[_0x57e1f1(0x1c0)]&&(this[_0x57e1f1(0x1ea)](this[_0x57e1f1(0x1c0)]),delete this[_0x57e1f1(0x1c0)]),this[_0x57e1f1(0x1c0)]=new Sprite_MenuCursor(),this[_0x57e1f1(0x1f0)](this[_0x57e1f1(0x1c0)]),this[_0x57e1f1(0x1c0)][_0x57e1f1(0x1ae)](this);},Window_Selectable[_0xe0f8de(0x1d4)][_0xe0f8de(0x166)]=function(){const _0x279970=_0xe0f8de,_0x3a0017=VisuMZ[_0x279970(0x1c7)][_0x279970(0x1dc)]['CursorBlacklist']||[];return _0x3a0017[_0x279970(0x181)](this['constructor'][_0x279970(0x170)]);},Window_NumberInput[_0xe0f8de(0x1d4)][_0xe0f8de(0x1db)]=function(){const _0x17047c=_0xe0f8de;try{return VisuMZ[_0x17047c(0x1c7)]['Window_Base_itemPadding'][_0x17047c(0x1d8)](this);}catch(_0x41f1dd){if(_0x17047c(0x192)!==_0x17047c(0x1e4))return 0x8;else _0x2e8518[_0x17047c(0x1c7)][_0x17047c(0x165)][_0x17047c(0x1d8)](this),this['initMenuCursorSettings']();}};
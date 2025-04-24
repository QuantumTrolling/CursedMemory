//=============================================================================
// VisuStella MZ - Picture Common Events
// VisuMZ_4_PictureCommonEvents.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_PictureCommonEvents = true;

var VisuMZ = VisuMZ || {};
VisuMZ.PictureCommonEvents = VisuMZ.PictureCommonEvents || {};
VisuMZ.PictureCommonEvents.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.02] [PictureCommonEvents]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Picture_Common_Events_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * With RPG Maker MZ having better touch support, it's important that almost
 * everything can be interacted with such as pictures. Pictures on the map
 * screen can have a Common Event bound to them, which will launch once clicked
 * (assuming no other events are running). These pictures can also change the
 * Common Events bound to them and/or clear them during the game.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Functionality to bind Common Events to pictures.
 * * Change which Common Events run during a playthrough.
 * * Clear Common Events from pictures to remove any bindings.
 * * Clicked pictures can require clicking on only opaque pixels and not
 *   fully transparent ones.
 * * Include hover effects like blend mode changes and tone shifts to help
 *   players understand when a picture has been selected.
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
 * Compatibility Issues
 * ============================================================================
 *
 * This plugin will most likely have compatibility issues with anything that
 * involves clicking pictures. If you are using another plugin that does
 * something with clicking pictures on the map screen, the likelihood of
 * clashing can occur if these plugins utilize the same pictures and we will
 * not be held accountable for that as it is something within your power to
 * change by simply picking different pictures.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * In the Plugin Parameters, you will see a list of all the pictures that you
 * can bind to a Common Event. If that number is something other than 0, then
 * the number associated with it will be the Common Event that will run. If you
 * assign it to a Common Event ID that does not exist, you will get an error so
 * please be wary of that.
 * 
 * Also be warned that the player CANNOT press Picture Common Events whenever
 * an event is running (with the exception of Parallels). This is NOT a bug.
 * 
 * This is because if an event is running under the main event interpreter and
 * a Picture Common Event were to be pressed, it would interrupt the flow of
 * the event. This would result in cutscenes to be potentially bugged,
 * currently running events to also be bugged, etc.
 * 
 * As such, the ability to click and activate Picture Common Events during an
 * event (with the exception of Parallels) are disabled to prevent potential
 * problems with the game dev cycle.
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
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Change Picture Common Event
 * - Change the Common Event bound to specific picture(s).
 *
 *   Picture ID(s):
 *   - Select which Picture ID(s) to change.
 *
 *   Common Event ID:
 *   - Change the Common Event bound to specific picture(s).
 * 
 *   Custom
 * 
 *     Opaque Only?
 *     - Ignore clicks on transparent pixels and accept only opaque pixels for
 *       this specific picture.
 * 
 *       Error Margin:
 *       - Error margin when clicking for opaque pixels.
 *       - This value determines the radius.
 * 
 *     Change Tone on Hover?
 *     - Change the tone of the picture on hover?
 * 
 *       Hover Tone:
 *       - Tone settings upon hovering.
 *       - Format: [Red, Green, Blue, Gray]
 * 
 *     Blend Mode on Hover:
 *     - The blend mode used when this picture is hovered over.
 *
 * ---
 *
 * System: Clear All Picture Common Events
 * - Clears all Common Event bound to specific picture(s).
 *
 * ---
 *
 * System: Clear Picture Common Event
 * - Clears any Common Event bound to specific picture(s).
 *
 *   Picture ID(s):
 *   - Select which Picture ID(s) to clear.
 *
 * ---
 *
 * System: Erase & Clear All Pictures
 * - Erases all pictures on the screen and clears their Common Events.
 * 
 * ---
 *
 * System: Erase & Clear Picture
 * - Erases and clears any Common Events attached to specific picture(s).
 *
 *   Picture ID(s):
 *   - Select which Picture ID(s) to erase and clear.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Global Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you to adjust which Pictures will trigger
 * which Common Events upon being clicked.
 *
 * ---
 * 
 * General
 * 
 *   Opaque Only?
 *   - Ignore clicks on transparent pixels and accept only opaque pixels for
 *     the Plugin Parameter bindings.
 * 
 *     Error Margin:
 *     - Error margin when clicking for opaque pixels.
 *     - This value determines the radius.
 * 
 *   Change Tone on Hover?
 *   - Change the tone of the picture on hover?
 * 
 *     Hover Tone:
 *     - Tone settings upon hovering.
 *     - Format: [Red, Green, Blue, Gray]
 * 
 *   Blend Mode on Hover:
 *   - The blend mode used when this picture is hovered over.
 * 
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Picture Settings
 * ============================================================================
 *
 * Each of the 100 picture slots are listed in the Plugin Parameters and can
 * be assigned a default setting that is already set up at the start of the
 * game without needing to assign a Common Event to it by a Plugin Command.
 * 
 * You can still overwrite their settings through a Plugin Command.
 * 
 * ---
 *
 * Pictures #1 through #100
 * 
 *   Picture #1:
 *   through
 *   Picture #100:
 *   - Default Common Event settings to bind to this picture ID.
 *
 * ---
 * 
 * Picture Settings
 *
 *   Common Event ID:
 *   - The common event settings you wish to tie to this picture.
 * 
 *   Custom
 * 
 *     Opaque Only?
 *     - Ignore clicks on transparent pixels and accept only opaque pixels for
 *       this specific picture.
 * 
 *       Error Margin:
 *       - Error margin when clicking for opaque pixels.
 *       - This value determines the radius.
 * 
 *     Change Tone on Hover?
 *     - Change the tone of the picture on hover?
 * 
 *       Hover Tone:
 *       - Tone settings upon hovering.
 *       - Format: [Red, Green, Blue, Gray]
 * 
 *     Blend Mode on Hover:
 *     - The blend mode used when this picture is hovered over.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.02: March 17, 2022
 * * Documentation Update!
 * ** Added to "Instructions" section by Arisu:
 * *** Also be warned that the player CANNOT press Picture Common Events
 *     whenever an event is running (with the exception of Parallels). This is
 *     NOT a bug.
 * *** This is because if an event is running under the main event interpreter
 *     and a Picture Common Event were to be pressed, it would interrupt the
 *     flow of the event. This would result in cutscenes to be potentially
 *     bugged, currently running events to also be bugged, etc.
 * *** As such, the ability to click and activate Picture Common Events during
 *     an event (with the exception of Parallels) are disabled to prevent
 *     potential problems with the game dev cycle.
 * 
 * Version 1.01: November 18, 2021
 * * Compatibility Update!
 * ** Should now work properly with VisuStella MZ Picture Choices.
 *    Update made by Olivia.
 *
 * Version 1.00: September 4, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangePictureCommonEvent
 * @text System: Change Picture Common Event
 * @desc Change the Common Event bound to specific picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc Select which Picture ID(s) to change.
 * @default ["1"]
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Change the Common Event bound to specific picture(s).
 * @default 0
 *
 * @arg Custom
 *
 * @arg UseGlobal:eval
 * @text Use Global?
 * @parent Custom
 * @type boolean
 * @on Use Global Settings
 * @off Use Custom Settings
 * @desc If this uses Global Settings, 
 * then ignore the options below.
 * @default true
 *
 * @arg OpaqueOnly:eval
 * @text Opaque Only?
 * @parent Custom
 * @type boolean
 * @on Opaque Only
 * @off Allow Transparency
 * @desc Ignore clicks on transparent pixels and accept only
 * opaque pixels for this specific picture.
 * @default true
 *
 * @arg OpaqueErrorMargin:num
 * @text Error Margin
 * @parent OpaqueOnly:eval
 * @type number
 * @min 0
 * @max 10
 * @desc Error margin when clicking for opaque pixels.
 * This value determines the radius.
 * @default 3
 *
 * @arg ChangeTone:eval
 * @text Change Tone on Hover?
 * @parent Custom
 * @type boolean
 * @on Change Tone
 * @off Don't Change
 * @desc Change the tone of the picture on hover?
 * @default true
 *
 * @arg HoverTone:eval
 * @text Hover Tone
 * @parent ChangeTone:eval
 * @desc Tone settings upon hovering.
 * Format: [Red, Green, Blue, Gray]
 * @default [128, 128, 128, 0]
 *
 * @arg BlendMode:num
 * @text Blend Mode on Hover
 * @parent Custom
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used when this picture is hovered over.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearAllPictureCommonEvents
 * @text System: Clear All Picture Common Events
 * @desc Clears all Common Event bound to specific picture(s).
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearPictureCommonEvent
 * @text System: Clear Picture Common Event
 * @desc Clears any Common Event bound to specific picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc Select which Picture ID(s) to clear.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EraseClearAllPictures
 * @text System: Erase & Clear All Pictures
 * @desc Erases all pictures on the screen and clears their Common Events.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EraseClearPicture
 * @text System: Erase & Clear Picture
 * @desc Erases and clears any Common Events attached to specific picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc Select which Picture ID(s) to erase and clear.
 * @default ["1"]
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
 * @param PictureCommonEvents
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param DefaultGlobal:struct
 * @text Default Global Settings
 * @type struct<DefaultGlobal>
 * @desc Default global settings that are used in general.
 * @default {"OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_1_to_10
 * @text #1 through #10
 * @parent Default
 *
 * @param Picture1:struct
 * @text Picture #1
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture2:struct
 * @text Picture #2
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture3:struct
 * @text Picture #3
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture4:struct
 * @text Picture #4
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture5:struct
 * @text Picture #5
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture6:struct
 * @text Picture #6
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture7:struct
 * @text Picture #7
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture8:struct
 * @text Picture #8
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture9:struct
 * @text Picture #9
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture10:struct
 * @text Picture #10
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_11_to_20
 * @text #11 through #20
 * @parent Default
 *
 * @param Picture11:struct
 * @text Picture #11
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture12:struct
 * @text Picture #12
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture13:struct
 * @text Picture #13
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture14:struct
 * @text Picture #14
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture15:struct
 * @text Picture #15
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture16:struct
 * @text Picture #16
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture17:struct
 * @text Picture #17
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture18:struct
 * @text Picture #18
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture19:struct
 * @text Picture #19
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture20:struct
 * @text Picture #20
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_21_to_30
 * @text #21 through #30
 * @parent Default
 *
 * @param Picture21:struct
 * @text Picture #21
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture22:struct
 * @text Picture #22
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture23:struct
 * @text Picture #23
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture24:struct
 * @text Picture #24
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture25:struct
 * @text Picture #25
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture26:struct
 * @text Picture #26
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture27:struct
 * @text Picture #27
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture28:struct
 * @text Picture #28
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture29:struct
 * @text Picture #29
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture30:struct
 * @text Picture #30
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_31_to_40
 * @text #31 through #40
 * @parent Default
 *
 * @param Picture31:struct
 * @text Picture #31
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture32:struct
 * @text Picture #32
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture33:struct
 * @text Picture #33
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture34:struct
 * @text Picture #34
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture35:struct
 * @text Picture #35
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture36:struct
 * @text Picture #36
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture37:struct
 * @text Picture #37
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture38:struct
 * @text Picture #38
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture39:struct
 * @text Picture #39
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture40:struct
 * @text Picture #40
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_41_to_50
 * @text #41 through #50
 * @parent Default
 *
 * @param Picture41:struct
 * @text Picture #41
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture42:struct
 * @text Picture #42
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture43:struct
 * @text Picture #43
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture44:struct
 * @text Picture #44
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture45:struct
 * @text Picture #45
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture46:struct
 * @text Picture #46
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture47:struct
 * @text Picture #47
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture48:struct
 * @text Picture #48
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture49:struct
 * @text Picture #49
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture50:struct
 * @text Picture #50
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_51_to_60
 * @text #51 through #60
 * @parent Default
 *
 * @param Picture51:struct
 * @text Picture #51
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture52:struct
 * @text Picture #52
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture53:struct
 * @text Picture #53
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture54:struct
 * @text Picture #54
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture55:struct
 * @text Picture #55
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture56:struct
 * @text Picture #56
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture57:struct
 * @text Picture #57
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture58:struct
 * @text Picture #58
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture59:struct
 * @text Picture #59
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture60:struct
 * @text Picture #60
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_61_to_70
 * @text #61 through #70
 * @parent Default
 *
 * @param Picture61:struct
 * @text Picture #61
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture62:struct
 * @text Picture #62
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture63:struct
 * @text Picture #63
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture64:struct
 * @text Picture #64
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture65:struct
 * @text Picture #65
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture66:struct
 * @text Picture #66
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture67:struct
 * @text Picture #67
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture68:struct
 * @text Picture #68
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture69:struct
 * @text Picture #69
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture70:struct
 * @text Picture #70
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_71_to_80
 * @text #71 through #80
 * @parent Default
 *
 * @param Picture71:struct
 * @text Picture #71
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture72:struct
 * @text Picture #72
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture73:struct
 * @text Picture #73
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture74:struct
 * @text Picture #74
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture75:struct
 * @text Picture #75
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture76:struct
 * @text Picture #76
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture77:struct
 * @text Picture #77
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture78:struct
 * @text Picture #78
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture79:struct
 * @text Picture #79
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture80:struct
 * @text Picture #80
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_81_to_90
 * @text #81 through #90
 * @parent Default
 *
 * @param Picture81:struct
 * @text Picture #81
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture82:struct
 * @text Picture #82
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture83:struct
 * @text Picture #83
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture84:struct
 * @text Picture #84
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture85:struct
 * @text Picture #85
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture86:struct
 * @text Picture #86
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture87:struct
 * @text Picture #87
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture88:struct
 * @text Picture #88
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture89:struct
 * @text Picture #89
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture90:struct
 * @text Picture #90
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_91_to_100
 * @text #91 through #100
 * @parent Default
 *
 * @param Picture91:struct
 * @text Picture #91
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture92:struct
 * @text Picture #92
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture93:struct
 * @text Picture #93
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture94:struct
 * @text Picture #94
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture95:struct
 * @text Picture #95
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture96:struct
 * @text Picture #96
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture97:struct
 * @text Picture #97
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture98:struct
 * @text Picture #98
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture99:struct
 * @text Picture #99
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc The common event settings you wish to tie to this picture.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture100:struct
 * @text Picture #100
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc The common event settings you wish to tie to this picture.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
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
 * Default Global Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~DefaultGlobal:
 *
 * @param OpaqueOnly:eval
 * @text Opaque Only?
 * @parent Global
 * @type boolean
 * @on Opaque Only
 * @off Allow Transparency
 * @desc Ignore clicks on transparent pixels and accept only
 * opaque pixels for the Plugin Parameter bindings.
 * @default true
 *
 * @param OpaqueErrorMargin:num
 * @text Error Margin
 * @parent OpaqueOnly:eval
 * @type number
 * @min 0
 * @max 10
 * @desc Error margin when clicking for opaque pixels.
 * This value determines the radius.
 * @default 3
 *
 * @param ChangeTone:eval
 * @text Change Tone on Hover?
 * @parent Global
 * @type boolean
 * @on Change Tone
 * @off Don't Change
 * @desc Change the tone of the picture on hover?
 * @default true
 *
 * @param HoverTone:eval
 * @text Hover Tone
 * @parent ChangeTone:eval
 * @desc Tone settings upon hovering.
 * Format: [Red, Green, Blue, Gray]
 * @default [128, 128, 128, 0]
 *
 * @param BlendMode:num
 * @text Blend Mode on Hover
 * @parent Global
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used when this picture is hovered over.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Picture:
 *
 * @param CommonEventID:num
 * @text Common Event ID
 * @parent NeededData
 * @type common_event
 * @desc The common event settings you wish to tie to this picture.
 * @default 0
 *
 * @param Custom
 *
 * @param UseGlobal:eval
 * @text Use Global?
 * @parent Custom
 * @type boolean
 * @on Use Global Settings
 * @off Use Custom Settings
 * @desc If this uses Global Settings, 
 * then ignore the options below.
 * @default true
 *
 * @param OpaqueOnly:eval
 * @text Opaque Only?
 * @parent Custom
 * @type boolean
 * @on Opaque Only
 * @off Allow Transparency
 * @desc Ignore clicks on transparent pixels and accept only
 * opaque pixels for this specific picture.
 * @default true
 *
 * @param OpaqueErrorMargin:num
 * @text Error Margin
 * @parent OpaqueOnly:eval
 * @type number
 * @min 0
 * @max 10
 * @desc Error margin when clicking for opaque pixels.
 * This value determines the radius.
 * @default 3
 *
 * @param ChangeTone:eval
 * @text Change Tone on Hover?
 * @parent Custom
 * @type boolean
 * @on Change Tone
 * @off Don't Change
 * @desc Change the tone of the picture on hover?
 * @default true
 *
 * @param HoverTone:eval
 * @text Hover Tone
 * @parent ChangeTone:eval
 * @desc Tone settings upon hovering.
 * Format: [Red, Green, Blue, Gray]
 * @default [128, 128, 128, 0]
 *
 * @param BlendMode:num
 * @text Blend Mode on Hover
 * @parent Custom
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used when this picture is hovered over.
 * @default 0
 *
 */
//=============================================================================

function _0x2448(){const _0x1a53dd=['blendMode','isClickEnabled','format','checkCommonEventOpaqueOnly','pictureCommonEventData','ATuxq','anchor','hasCommonEvent','height','TkEwF','Cwfal','inBattle','Settings','PictureIDs','registerCommand','ClearAllPictureCommonEvents','initPictureCommonEvents','updatePictureCommonEventMouseOver','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','reserveCommonEvent','64EzhqDJ','opacity','picture','pictureCommonEvent','UseGlobal','NUM','callCommonEvent','TemplateSettings','isAnyButtonPressed','isAnyPictureCommonEventPressed','ChangeTone','setPictureCommonEventSettings','updateOther','return\x200','exit','_pictureContainer','1150NhBEjO','Game_System_initialize','JRvzN','vuRzn','70466RyZvgG','kHNrC','includes','isPictureCommonEventOpaqueOnly','hasPictureChoiceEvent','2227077hmMlOG','rHGCT','Sprite_Picture_updateOther','BlendMode','89439eNJkCU','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ClearPictureCommonEvent','_pictureId','prototype','version','hasPictureChoiceBinding','some','tJArq','status','_spriteset','worldTransform','_pictureCommonEvents','ZIWOn','46471Gqcyhl','contains','VisuMZ_2_PictureChoices','filter','EraseClearPicture','CommonEventID','PictureCommonEvents','getPictureCommonEventBlendMode','OfSWD','_scene','onMouseExit','width','getAlphaPixel','ConvertParams','makeDeepCopy','isPictureCommonEventPressed','OpaqueOnly','toUpperCase','checkCommonEventOpaqueErrorMargin','_pictureCommonEventMouseOver','FUNC','EVAL','match','children','description','510rHJWKD','STRUCT','setColorTone','oaZrj','ARRAYEVAL','TyTVs','name','14JuOnxS','call','applyInverse','isPressed','getPictureCommonEventErrorMargin','HoverTone','DefaultGlobal','erasePicture','isBusy','dMijw','visible','ARRAYJSON','map','ARRAYNUM','isBeingTouched','doesPictureCommonEventChangeTone','2285YjgVsa','parse','getPictureCommonEventHoverTone','bitmap','_frame','clearPictureCommonEventSettings','176860JyncJV','createPictureCommonEventData','onClick','37617QZGsgc','JSON','biHxG','parameters','OpaqueErrorMargin','constructor','max'];_0x2448=function(){return _0x1a53dd;};return _0x2448();}const _0x2600cb=_0xacec;function _0xacec(_0x3875ad,_0x898ab0){const _0x244812=_0x2448();return _0xacec=function(_0xacec7d,_0x1c0bab){_0xacec7d=_0xacec7d-0x9c;let _0x4ad597=_0x244812[_0xacec7d];return _0x4ad597;},_0xacec(_0x3875ad,_0x898ab0);}(function(_0x3483bb,_0x4be768){const _0x52e6ab=_0xacec,_0x16d8b3=_0x3483bb();while(!![]){try{const _0x4eedae=-parseInt(_0x52e6ab(0xb6))/0x1+-parseInt(_0x52e6ab(0xd6))/0x2*(parseInt(_0x52e6ab(0xef))/0x3)+-parseInt(_0x52e6ab(0xec))/0x4+-parseInt(_0x52e6ab(0xe6))/0x5*(parseInt(_0x52e6ab(0xcf))/0x6)+-parseInt(_0x52e6ab(0xa8))/0x7*(parseInt(_0x52e6ab(0x10a))/0x8)+-parseInt(_0x52e6ab(0xa4))/0x9+-parseInt(_0x52e6ab(0x11a))/0xa*(-parseInt(_0x52e6ab(0x9f))/0xb);if(_0x4eedae===_0x4be768)break;else _0x16d8b3['push'](_0x16d8b3['shift']());}catch(_0x35b512){_0x16d8b3['push'](_0x16d8b3['shift']());}}}(_0x2448,0x296f5));var label=_0x2600cb(0xbc),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2600cb(0xb9)](function(_0x411399){const _0x5b004c=_0x2600cb;return _0x411399[_0x5b004c(0xb1)]&&_0x411399[_0x5b004c(0xce)][_0x5b004c(0xa1)]('['+label+']');})[0x0];VisuMZ[label][_0x2600cb(0x102)]=VisuMZ[label][_0x2600cb(0x102)]||{},VisuMZ[_0x2600cb(0xc3)]=function(_0x5e165f,_0x34d355){const _0x23d31a=_0x2600cb;for(const _0x525bf9 in _0x34d355){if(_0x525bf9[_0x23d31a(0xcc)](/(.*):(.*)/i)){const _0x8d0fe1=String(RegExp['$1']),_0x204eb0=String(RegExp['$2'])[_0x23d31a(0xc7)]()['trim']();let _0x329d2f,_0x22e848,_0x20dafc;switch(_0x204eb0){case _0x23d31a(0x10f):_0x329d2f=_0x34d355[_0x525bf9]!==''?Number(_0x34d355[_0x525bf9]):0x0;break;case _0x23d31a(0xe3):_0x22e848=_0x34d355[_0x525bf9]!==''?JSON['parse'](_0x34d355[_0x525bf9]):[],_0x329d2f=_0x22e848[_0x23d31a(0xe2)](_0x18e216=>Number(_0x18e216));break;case _0x23d31a(0xcb):_0x329d2f=_0x34d355[_0x525bf9]!==''?eval(_0x34d355[_0x525bf9]):null;break;case _0x23d31a(0xd3):_0x22e848=_0x34d355[_0x525bf9]!==''?JSON[_0x23d31a(0xe7)](_0x34d355[_0x525bf9]):[],_0x329d2f=_0x22e848['map'](_0x4718d4=>eval(_0x4718d4));break;case _0x23d31a(0xf0):_0x329d2f=_0x34d355[_0x525bf9]!==''?JSON[_0x23d31a(0xe7)](_0x34d355[_0x525bf9]):'';break;case _0x23d31a(0xe1):_0x22e848=_0x34d355[_0x525bf9]!==''?JSON[_0x23d31a(0xe7)](_0x34d355[_0x525bf9]):[],_0x329d2f=_0x22e848[_0x23d31a(0xe2)](_0x368a1e=>JSON[_0x23d31a(0xe7)](_0x368a1e));break;case _0x23d31a(0xca):_0x329d2f=_0x34d355[_0x525bf9]!==''?new Function(JSON[_0x23d31a(0xe7)](_0x34d355[_0x525bf9])):new Function(_0x23d31a(0x117));break;case'ARRAYFUNC':_0x22e848=_0x34d355[_0x525bf9]!==''?JSON[_0x23d31a(0xe7)](_0x34d355[_0x525bf9]):[],_0x329d2f=_0x22e848[_0x23d31a(0xe2)](_0x518596=>new Function(JSON[_0x23d31a(0xe7)](_0x518596)));break;case'STR':_0x329d2f=_0x34d355[_0x525bf9]!==''?String(_0x34d355[_0x525bf9]):'';break;case'ARRAYSTR':_0x22e848=_0x34d355[_0x525bf9]!==''?JSON['parse'](_0x34d355[_0x525bf9]):[],_0x329d2f=_0x22e848[_0x23d31a(0xe2)](_0x2298a5=>String(_0x2298a5));break;case _0x23d31a(0xd0):_0x20dafc=_0x34d355[_0x525bf9]!==''?JSON['parse'](_0x34d355[_0x525bf9]):{},_0x329d2f=VisuMZ[_0x23d31a(0xc3)]({},_0x20dafc);break;case'ARRAYSTRUCT':_0x22e848=_0x34d355[_0x525bf9]!==''?JSON[_0x23d31a(0xe7)](_0x34d355[_0x525bf9]):[],_0x329d2f=_0x22e848['map'](_0x1313d4=>VisuMZ[_0x23d31a(0xc3)]({},JSON['parse'](_0x1313d4)));break;default:continue;}_0x5e165f[_0x8d0fe1]=_0x329d2f;}}return _0x5e165f;},(_0x4a2a3d=>{const _0x3b29e9=_0x2600cb,_0x1b5c49=_0x4a2a3d[_0x3b29e9(0xd5)];for(const _0x3f80f4 of dependencies){if(_0x3b29e9(0xff)===_0x3b29e9(0xff)){if(!Imported[_0x3f80f4]){if(_0x3b29e9(0xdf)===_0x3b29e9(0xd4)){if(this['_pictureCommonEvents']===_0x21735b)this[_0x3b29e9(0x106)]();return this['pictureCommonEventData'](_0x3913fd)['HoverTone'];}else{alert(_0x3b29e9(0x108)[_0x3b29e9(0xf8)](_0x1b5c49,_0x3f80f4)),SceneManager[_0x3b29e9(0x118)]();break;}}}else _0x4a19d5[_0x3b29e9(0xeb)](_0x12aa78);}const _0x25c299=_0x4a2a3d['description'];if(_0x25c299[_0x3b29e9(0xcc)](/\[Version[ ](.*?)\]/i)){const _0x3a8243=Number(RegExp['$1']);if(_0x3a8243!==VisuMZ[label][_0x3b29e9(0xad)]){if(_0x3b29e9(0xa0)===_0x3b29e9(0xb0)){this[_0x3b29e9(0xb4)]={};for(let _0x546465=0x1;_0x546465<=0x64;_0x546465++){this[_0x3b29e9(0xed)](_0x546465);}}else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x3b29e9(0xf8)](_0x1b5c49,_0x3a8243)),SceneManager[_0x3b29e9(0x118)]();}}if(_0x25c299[_0x3b29e9(0xcc)](/\[Tier[ ](\d+)\]/i)){if(_0x3b29e9(0xf1)!=='biHxG')_0x4b5bf7=_0x514f99[_0x3b29e9(0xf5)](_0x284376,_0x9d3238);else{const _0x3876b6=Number(RegExp['$1']);_0x3876b6<tier?(alert(_0x3b29e9(0xa9)[_0x3b29e9(0xf8)](_0x1b5c49,_0x3876b6,tier)),SceneManager[_0x3b29e9(0x118)]()):tier=Math['max'](_0x3876b6,tier);}}VisuMZ[_0x3b29e9(0xc3)](VisuMZ[label][_0x3b29e9(0x102)],_0x4a2a3d[_0x3b29e9(0xf2)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x2600cb(0xd5)],'ChangePictureCommonEvent',_0x4d9968=>{const _0x52dfb1=_0x2600cb;VisuMZ[_0x52dfb1(0xc3)](_0x4d9968,_0x4d9968);const _0x3e911e=_0x4d9968[_0x52dfb1(0x103)]||[0x1],_0x3d3e0b={'CommonEventID':_0x4d9968[_0x52dfb1(0xbb)],'UseGlobal':_0x4d9968[_0x52dfb1(0x10e)],'OpaqueOnly':_0x4d9968['OpaqueOnly'],'OpaqueErrorMargin':_0x4d9968[_0x52dfb1(0xf3)],'ChangeTone':_0x4d9968[_0x52dfb1(0x114)],'HoverTone':_0x4d9968[_0x52dfb1(0xdb)],'BlendMode':_0x4d9968[_0x52dfb1(0xa7)]};if(_0x3d3e0b[_0x52dfb1(0x10e)]){const _0x103f8c=VisuMZ['PictureCommonEvents'][_0x52dfb1(0x102)]['DefaultGlobal'];_0x3d3e0b[_0x52dfb1(0xc6)]=_0x103f8c[_0x52dfb1(0xc6)],_0x3d3e0b[_0x52dfb1(0xf3)]=_0x103f8c[_0x52dfb1(0xf3)],_0x3d3e0b[_0x52dfb1(0x114)]=_0x103f8c['ChangeTone'],_0x3d3e0b['HoverTone']=_0x103f8c['HoverTone'],_0x3d3e0b['BlendMode']=_0x103f8c['BlendMode'];}for(const _0x1e9dc3 of _0x3e911e){$gameSystem[_0x52dfb1(0x115)](_0x1e9dc3,JsonEx['makeDeepCopy'](_0x3d3e0b));}}),PluginManager[_0x2600cb(0x104)](pluginData[_0x2600cb(0xd5)],_0x2600cb(0x105),_0x41e468=>{const _0xbba63d=_0x2600cb;for(let _0x22042a=0x1;_0x22042a<=0x64;_0x22042a++){$gameSystem[_0xbba63d(0xeb)](_0x22042a);}}),PluginManager['registerCommand'](pluginData[_0x2600cb(0xd5)],_0x2600cb(0xaa),_0x488375=>{const _0x565384=_0x2600cb;VisuMZ[_0x565384(0xc3)](_0x488375,_0x488375);const _0xe57365=_0x488375[_0x565384(0x103)];for(const _0x30c7bf of _0xe57365){$gameSystem[_0x565384(0xeb)](_0x30c7bf);}}),PluginManager[_0x2600cb(0x104)](pluginData[_0x2600cb(0xd5)],'EraseClearAllPictures',_0x44c88b=>{const _0x4d4077=_0x2600cb;$gameSystem[_0x4d4077(0xb4)]={};for(let _0x1d9106=0x1;_0x1d9106<=0x64;_0x1d9106++){$gameScreen[_0x4d4077(0xdd)](_0x1d9106);}}),PluginManager[_0x2600cb(0x104)](pluginData['name'],_0x2600cb(0xba),_0xeede2f=>{const _0x20b6d9=_0x2600cb;VisuMZ[_0x20b6d9(0xc3)](_0xeede2f,_0xeede2f);const _0x3fd690=_0xeede2f[_0x20b6d9(0x103)];for(const _0x418a05 of _0x3fd690){'rHGCT'===_0x20b6d9(0xa5)?($gameScreen[_0x20b6d9(0xdd)](_0x418a05),$gameSystem['clearPictureCommonEventSettings'](_0x418a05)):(_0x136795['erasePicture'](_0x1b7f0d),_0x557906[_0x20b6d9(0xeb)](_0x390ebb));}}),VisuMZ[_0x2600cb(0xbc)][_0x2600cb(0x9c)]=Game_System[_0x2600cb(0xac)]['initialize'],Game_System[_0x2600cb(0xac)]['initialize']=function(){const _0x247a30=_0x2600cb;VisuMZ[_0x247a30(0xbc)][_0x247a30(0x9c)]['call'](this),this['initPictureCommonEvents']();},Game_System[_0x2600cb(0xac)][_0x2600cb(0x106)]=function(){const _0x569421=_0x2600cb;this[_0x569421(0xb4)]={};for(let _0x1211d2=0x1;_0x1211d2<=0x64;_0x1211d2++){_0x569421(0xd2)!==_0x569421(0xd2)?_0x12b7bb[_0x569421(0xdd)](_0x2a3f39):this[_0x569421(0xed)](_0x1211d2);}},VisuMZ[_0x2600cb(0xbc)][_0x2600cb(0x111)]=function(){return{'CommonEventID':0x0,'UseGlobal':!![],'OpaqueOnly':!![],'OpaqueErrorMargin':0x3,'ChangeTone':!![],'HoverTone':[0x80,0x80,0x80,0x0],'BlendMode':0x0};},Game_System['prototype'][_0x2600cb(0xed)]=function(_0x4e7aa1){const _0x368695=_0x2600cb,_0x12d5ae=VisuMZ[_0x368695(0xbc)][_0x368695(0x102)],_0x1d0779=VisuMZ[_0x368695(0xbc)][_0x368695(0x102)][_0x368695(0xdc)],_0x865e89='Picture%1'[_0x368695(0xf8)](_0x4e7aa1),_0xc9428b=JsonEx[_0x368695(0xc4)](_0x12d5ae[_0x865e89])||VisuMZ[_0x368695(0xbc)][_0x368695(0x111)]();this[_0x368695(0xb4)][_0x4e7aa1]=_0xc9428b;if(!_0xc9428b[_0x368695(0x10e)])return;_0xc9428b[_0x368695(0xc6)]=_0x1d0779[_0x368695(0xc6)],_0xc9428b[_0x368695(0xf3)]=_0x1d0779[_0x368695(0xf3)],_0xc9428b[_0x368695(0x114)]=_0x1d0779['ChangeTone'],_0xc9428b[_0x368695(0xdb)]=_0x1d0779['HoverTone'],_0xc9428b['BlendMode']=_0x1d0779[_0x368695(0xa7)];},Game_System[_0x2600cb(0xac)][_0x2600cb(0xfa)]=function(_0x2281ae){const _0x183a62=_0x2600cb;if(this[_0x183a62(0xb4)]===undefined){if(_0x183a62(0xb5)==='EnDzp'){_0xabdcf4['ConvertParams'](_0x566c94,_0x3e708b);const _0x483f2c=_0x71b952[_0x183a62(0x103)];for(const _0x2e6338 of _0x483f2c){_0x3815af[_0x183a62(0xdd)](_0x2e6338),_0x5090ab[_0x183a62(0xeb)](_0x2e6338);}}else this[_0x183a62(0x106)]();}return this['_pictureCommonEvents'][_0x2281ae]===undefined&&(_0x183a62(0x100)!=='Cwfal'?(_0x128a87['PictureCommonEvents'][_0x183a62(0xa6)][_0x183a62(0xd7)](this),this[_0x183a62(0x107)]()):this['createPictureCommonEventData'](_0x2281ae)),this['_pictureCommonEvents'][_0x2281ae];},Game_System['prototype'][_0x2600cb(0x10d)]=function(_0x28cf04){const _0x2c8881=_0x2600cb;if(this[_0x2c8881(0xb4)]===undefined)this[_0x2c8881(0x106)]();return this['pictureCommonEventData'](_0x28cf04)['CommonEventID'];},Game_System[_0x2600cb(0xac)][_0x2600cb(0xeb)]=function(_0x1ed840){const _0x3e70b2=_0x2600cb;this['_pictureCommonEvents'][_0x1ed840]=VisuMZ[_0x3e70b2(0xbc)][_0x3e70b2(0x111)]();},Game_System[_0x2600cb(0xac)][_0x2600cb(0x115)]=function(_0x358bf2,_0x1f34f0){const _0x8b9b1d=_0x2600cb;if(this[_0x8b9b1d(0xb4)]===undefined)this[_0x8b9b1d(0x106)]();this[_0x8b9b1d(0xb4)][_0x358bf2]=_0x1f34f0;},Game_System[_0x2600cb(0xac)]['isPictureCommonEventOpaqueOnly']=function(_0x238701){const _0x25e287=_0x2600cb;if(this['_pictureCommonEvents']===undefined)this['initPictureCommonEvents']();return this['pictureCommonEventData'](_0x238701)[_0x25e287(0xc6)];},Game_System[_0x2600cb(0xac)][_0x2600cb(0xda)]=function(_0x5e8565){const _0x362d4d=_0x2600cb;if(this[_0x362d4d(0xb4)]===undefined)this[_0x362d4d(0x106)]();return this[_0x362d4d(0xfa)](_0x5e8565)[_0x362d4d(0xf3)];},Game_System['prototype'][_0x2600cb(0xe5)]=function(_0x215dc8){const _0x34a23f=_0x2600cb;if(this['_pictureCommonEvents']===undefined)this[_0x34a23f(0x106)]();return this[_0x34a23f(0xfa)](_0x215dc8)[_0x34a23f(0x114)];},Game_System['prototype'][_0x2600cb(0xe8)]=function(_0x3021bf){const _0x1f9cd5=_0x2600cb;if(this['_pictureCommonEvents']===undefined)this[_0x1f9cd5(0x106)]();return this['pictureCommonEventData'](_0x3021bf)[_0x1f9cd5(0xdb)];},Game_System[_0x2600cb(0xac)][_0x2600cb(0xbd)]=function(_0x14cf29){const _0x5aafcc=_0x2600cb;if(this['_pictureCommonEvents']===undefined)this[_0x5aafcc(0x106)]();return this[_0x5aafcc(0xfa)](_0x14cf29)[_0x5aafcc(0xa7)];},VisuMZ[_0x2600cb(0xbc)]['Scene_Map_isAnyButtonPressed']=Scene_Map[_0x2600cb(0xac)][_0x2600cb(0x112)],Scene_Map[_0x2600cb(0xac)][_0x2600cb(0x112)]=function(){const _0x80c67d=_0x2600cb;return VisuMZ[_0x80c67d(0xbc)]['Scene_Map_isAnyButtonPressed']['call'](this)||this[_0x80c67d(0xb2)][_0x80c67d(0x113)]();},Sprite_Picture[_0x2600cb(0xac)][_0x2600cb(0xf7)]=function(){const _0x4bde10=_0x2600cb;if(Imported[_0x4bde10(0xb8)]&&this[_0x4bde10(0xa3)]())return!![];if($gameMessage[_0x4bde10(0xde)]())return![];if($gameParty[_0x4bde10(0x101)]())return![];if(!this[_0x4bde10(0xe0)])return![];if(this[_0x4bde10(0x10b)]<=0x0)return![];const _0x7c07ac=SceneManager[_0x4bde10(0xbf)];if(_0x7c07ac&&_0x7c07ac[_0x4bde10(0xf4)]===Scene_Map){if(_0x4bde10(0xbe)!==_0x4bde10(0xfb)){if(!_0x7c07ac['isMapTouchOk']())return![];}else{if(this[_0x4bde10(0xb4)]===_0x1b364e)this[_0x4bde10(0x106)]();this[_0x4bde10(0xb4)][_0x500881]=_0x1d046a;}}return this[_0x4bde10(0x10c)]()&&$gameSystem['pictureCommonEvent'](this[_0x4bde10(0xab)])>0x0;},Sprite_Picture[_0x2600cb(0xac)][_0x2600cb(0xa3)]=function(){const _0x4fb7de=_0x2600cb;return this[_0x4fb7de(0xae)]();},Sprite_Picture['prototype'][_0x2600cb(0xf9)]=function(){const _0x25bfc2=_0x2600cb;if(!$gameSystem[_0x25bfc2(0xa2)](this['_pictureId']))return!![];const _0x1fa10f=new Point(TouchInput['x'],TouchInput['y']),_0xe6d507=this[_0x25bfc2(0xb3)][_0x25bfc2(0xd8)](_0x1fa10f);let _0x15bfd3=Math['round'](_0xe6d507['x']+this[_0x25bfc2(0xea)]['x']+this['anchor']['x']*this[_0x25bfc2(0xe9)]['width']),_0x2d5217=Math['round'](_0xe6d507['y']+this['_frame']['y']+this[_0x25bfc2(0xfc)]['y']*this['bitmap'][_0x25bfc2(0xfe)]);return this[_0x25bfc2(0xc8)](_0x15bfd3,_0x2d5217);},Sprite_Picture[_0x2600cb(0xac)][_0x2600cb(0xc8)]=function(_0x130763,_0x447504){const _0x61e908=_0x2600cb,_0x340c9b=$gameSystem[_0x61e908(0xda)](this[_0x61e908(0xab)]),_0x4e5662=new Rectangle(0x0,0x0,this[_0x61e908(0xe9)][_0x61e908(0xc1)],this[_0x61e908(0xe9)][_0x61e908(0xfe)]);for(let _0x1423f1=-_0x340c9b;_0x1423f1<=_0x340c9b;_0x1423f1++){for(let _0x5ee016=-_0x340c9b;_0x5ee016<=_0x340c9b;_0x5ee016++){if(_0x61e908(0x9d)===_0x61e908(0x9e))_0x13cdc2[_0x61e908(0xeb)](_0x2d3aec);else{const _0x1873f3=_0x130763+_0x1423f1,_0x3677ed=_0x447504+_0x5ee016;if(!_0x4e5662[_0x61e908(0xb7)](_0x1873f3,_0x3677ed))continue;const _0x167b39=this[_0x61e908(0xe9)][_0x61e908(0xc2)](_0x1873f3,_0x3677ed);if(_0x167b39>0x0)return!![];}}}return![];},Sprite_Picture['prototype'][_0x2600cb(0xe4)]=function(){const _0x323cc=_0x2600cb,_0x2a97f1=Sprite_Clickable['prototype']['isBeingTouched'][_0x323cc(0xd7)](this);return _0x2a97f1&&this[_0x323cc(0xf9)]();},Sprite_Picture[_0x2600cb(0xac)]['onMouseEnter']=function(){const _0x443b75=_0x2600cb;Sprite_Clickable[_0x443b75(0xac)]['onMouseEnter'][_0x443b75(0xd7)](this);if(!this[_0x443b75(0xfd)]())return;this[_0x443b75(0xc9)]=!![];},Sprite_Picture['prototype']['onMouseExit']=function(){const _0x4050cd=_0x2600cb;Sprite_Clickable[_0x4050cd(0xac)][_0x4050cd(0xc0)][_0x4050cd(0xd7)](this);if(!this[_0x4050cd(0xfd)]())return;this[_0x4050cd(0xc9)]=![];},Sprite_Picture[_0x2600cb(0xac)][_0x2600cb(0xee)]=function(){const _0x56f44e=_0x2600cb;Sprite_Clickable['prototype'][_0x56f44e(0xee)][_0x56f44e(0xd7)](this),this['callCommonEvent']();},Sprite_Picture['prototype'][_0x2600cb(0x110)]=function(){const _0x29555f=_0x2600cb;if(!this['hasCommonEvent']())return;if(!this[_0x29555f(0xf9)]())return;const _0x349cca=$gameSystem[_0x29555f(0x10d)](this[_0x29555f(0xab)]);$gameTemp[_0x29555f(0x109)](_0x349cca),this[_0x29555f(0xc0)]();},Sprite_Picture[_0x2600cb(0xac)][_0x2600cb(0xfd)]=function(){const _0x4698af=_0x2600cb,_0x305d6e=$gameSystem['pictureCommonEvent'](this[_0x4698af(0xab)]);return _0x305d6e>0x0;},VisuMZ['PictureCommonEvents'][_0x2600cb(0xa6)]=Sprite_Picture['prototype'][_0x2600cb(0x116)],Sprite_Picture['prototype']['updateOther']=function(){const _0xac8cc2=_0x2600cb;VisuMZ['PictureCommonEvents'][_0xac8cc2(0xa6)][_0xac8cc2(0xd7)](this),this[_0xac8cc2(0x107)]();},Sprite_Picture[_0x2600cb(0xac)][_0x2600cb(0x107)]=function(){const _0x128f42=_0x2600cb;if(!this[_0x128f42(0xc9)])return;this[_0x128f42(0xf6)]=$gameSystem[_0x128f42(0xbd)](this[_0x128f42(0xab)])||0x0,$gameSystem['doesPictureCommonEventChangeTone'](this['_pictureId'])&&this[_0x128f42(0xd1)]($gameSystem[_0x128f42(0xe8)](this[_0x128f42(0xab)])||[0x0,0x0,0x0,0x0]);},Sprite_Picture[_0x2600cb(0xac)][_0x2600cb(0xc5)]=function(){const _0x3a5516=_0x2600cb;if(!this['picture']())return![];if(!this[_0x3a5516(0xd9)]())return![];if($gameSystem[_0x3a5516(0x10d)](this['_pictureId'])<=0x0)return![];if(!this[_0x3a5516(0xf9)]())return![];return!![];},Spriteset_Base[_0x2600cb(0xac)][_0x2600cb(0x113)]=function(){const _0x1a7453=_0x2600cb;return this[_0x1a7453(0x119)][_0x1a7453(0xcd)][_0x1a7453(0xaf)](_0x304c74=>_0x304c74[_0x1a7453(0xc5)]());};
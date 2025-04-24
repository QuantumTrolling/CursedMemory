//=============================================================================
// VisuStella MZ - Picture Choices
// VisuMZ_2_PictureChoices.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_PictureChoices = true;

var VisuMZ = VisuMZ || {};
VisuMZ.PictureChoices = VisuMZ.PictureChoices || {};
VisuMZ.PictureChoices.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.00] [PictureChoices]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Picture_Choices_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Ever wanted to create custom menus using pictures and have them work akin to
 * how "Show Choices" event commands behave? This plugin makes that possible by
 * letting you, the game dev, determine how pictures will behave when selected,
 * deselected, and tie them to the various choices in the "Show Choices" window
 * events. Create vivid menu systems with better visuals!
 *
 * Features include all (but not limited to) the following:
 * 
 * * Use Plugin Commands to determine how specific pictures (by ID or range)
 *   will behave when selected or deselected.
 * * Behaviors include easing options, position adjustments, opacity changes,
 *   blend mode differences, and tinting.
 * * Determine which pictures are bound to which choice through this plugin's
 *   newly added text codes.
 * * Hide the choice window through text codes to make the look more authentic.
 * * Works with touch controls! Hovering over pictures will select the picture
 *   and choice option!
 * * Works with keyboard controls! Even if the choice window is hidden, the
 *   keyboard will still let you scroll through the various pictures as if they
 *   were the ones arranged by the show choice options!
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
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
 * Mouse Over
 * 
 * - When the mouse is hovering a picture bound to a "Show Choices" option,
 * the Choice Window will automatically select that option in the Choice Window
 * regardless of whether or not hovering is disabled for windows. This decision
 * has been made for a more intuitive user experience.
 * 
 * Pictures without any bindings will not have any effect.
 *
 * ---
 * 
 * Mouse Click
 * 
 * - When the mouse clicks on a picture bound to a "Show Choices" option, the
 * Choice Window will select that option and then prompt an "OK" handler to
 * trigger the action as long as that option is enabled. This action will occur
 * even if click select is the default selection process for windows for a more
 * intuitive user experience.
 * 
 * Pictures without any bindings will not have any effect.
 * 
 * ---
 *
 * ============================================================================
 * Usage Instructions
 * ============================================================================
 *
 * For a quick run through on how to use this plugin properly, follow the
 * instructions listed below, separated into various steps.
 *
 * ---
 *
 * Step 1:
 *
 * - Put out "Show Picture" events where you want them. 
 * - Create their initial positions, their ID's, their images used, and their
 *   origins decided.
 *
 * ---
 * 
 * Step 2:
 * 
 * - Use Plugin Commands for "Picture Settings: Change ID(s)" or the
 *   "Picture Settings: Change Range".
 * - This is used to change how images look when selected or deselected either
 *   by mouse cursor or by keyboard.
 * 
 * *NOTE* Steps 1 and 2 are interchangeable but works best with "Show Picture"
 * before the Plugin Commands.
 * 
 * ---
 * 
 * Step 3:
 * 
 * - Use "Show Choices" event command.
 * - For each Show Choice event command, use the following notetag:
 * 
 *   <Bind Picture: id> where 'id' is the picture ID to bind that choice to.
 * 
 * - ie: <Bind Picture: 3> will have that choice be tied to picture ID 3.
 * 
 * ---
 * 
 * Step 4 (Optional):
 * 
 * - Insert <Hide Choice Window> text code somewhere in the choice list
 *   (doesn't matter where) to hide the choice list window.
 * - This step is optional.
 * 
 * ---
 * 
 * Step 5:
 * 
 * - At the very end, use the Plugin Commands "Clear: All Selection Settings"
 *   or "Clear: Picture ID(s) Selection Settings" or "Clear: Picture Range
 *   Selection Settings" to remove their on select or on deselect changes.
 * - Erase picture will do the same to them.
 * - This is to clear the binding settings so that they do not affect other
 *   "Show Choices" event commands.
 * - This step is optional IF you have the Plugin Parameter "Auto Clear" set
 *   to "true". "Auto Clear" will trigger whenever the OK Handler or Cancel
 *   Handler is processed.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Picture Choice-Related Text Codes ===
 * 
 * ---
 *
 * --------------------   -----------------------------------------------------
 * Text Code              Effect (Show Choice Text Only)
 * --------------------   -----------------------------------------------------
 * 
 * <Bind Picture: id>     Replace 'id' with a Picture ID to bind the choice to.
 *                        If the choice is selected or deselected, the bound
 *                        picture will alter its look accordingly.
 * 
 * <Hide Choice Window>   Hides the Choice Window from view. This is so that if
 *                        any Picture Choices are visible, the screen won't
 *                        look extremely repetitive. Insert this into any of
 *                        the choices. Only once is needed.
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
 * === Clear Plugin Commands ===
 * 
 * ---
 *
 * Clear: All Selection Settings
 * - Clears all selection settings for all pictures 1 through 100.
 *
 * ---
 *
 * Clear: Picture ID(s) Selection Settings
 * - Clears all selection settings for the ID'd pictures.
 *
 *   Picture ID(s):
 *   - Select which Picture ID(s) to clear.
 *
 * ---
 *
 * Clear: Picture Range Selection Settings
 * - Clears all selection settings for the picture ID's in range.
 *
 *   Starting ID:
 *   - The starting ID of the picture binds to clear.
 *
 *   Ending ID:
 *   - The ending ID of the picture binds to clear.
 *
 * ---
 * 
 * === Picture Settings Plugin Commands ===
 * 
 * ---
 *
 * Picture Settings: Change ID(s)
 * - Changes select and deselect settings for the picture ID(s).
 * 
 *   Step 1:
 *
 *     Picture ID(s):
 *     - Select which Picture ID(s) to change settings for.
 * 
 *   Step 2:
 *
 *     On Select Settings:
 *     - Picture settings when selecting that choice.
 *
 *     On Deselect Settings:
 *     - Picture settings when deselecting that choice.
 *
 * ---
 *
 * Picture Settings: Change ID(s)
 * - Changes select and deselect settings for the picture ID(s).
 * 
 *   Step 1:
 *
 *     Starting ID:
 *     - The starting ID of the picture binds to clear.
 *
 *     Ending ID:
 *     - The ending ID of the picture binds to clear.
 * 
 *   Step 2:
 *
 *     On Select Settings:
 *     - Picture settings when selecting that choice.
 *
 *     On Deselect Settings:
 *     - Picture settings when deselecting that choice.
 *
 * ---
 *
 * Picture Settings
 * - These are the settings used for "On Select" and "On Deselect" settings.
 * 
 *   Easing:
 *
 *     Duration:
 *     - Insert a number to determine duration of the changed settings when
 *       applied.
 *
 *     Easing Type:
 *     - Select which easing type you wish to apply.
 *     - Many of these choices require VisuMZ_0_CoreEngine.
 * 
 *   Position:
 *
 *     Target X:
 *     Target Y:
 *     - Insert a number to determine new X/Y position.
 *     - Use 'Unchanged' to not change the X/Y position.
 *
 *     Target Width %:
 *     Target Height %:
 *     - Insert a number to determine new width/height.
 *     - 'Unchanged' for no changes.
 *     - For 100%, use 100.
 * 
 *   Blend:
 *
 *     Target Opacity:
 *     - Insert a number to determine new opacity level.
 *     - 'Unchanged' for no changes.
 *     - Use a number between 0 and 255.
 *
 *     Blend Mode:
 *     - What kind of blend mode do you wish to apply to the picture?
 * 
 *   Tone:
 *
 *     Target Tone Red:
 *     Target Tone Green:
 *     Target Tone Blue:
 *     - Insert a number to determine new red/green/blue tone tint.
 *     - 'Unchanged' for no changes.
 *     - Use a number between -255 and 255.
 *
 *     Target Tone Gray:
 *     - Insert a number to determine new red/green/blue tone tint.
 *     - 'Unchanged' for no changes.
 *     - Use a number between 0 and 255.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The majority of the settings are unique to the Plugin Commands and not the
 * Plugin Parameters. However, the Plugin Parameters can be used as a quality
 * of life to reduce the amount of work needed if one wants to enable the
 * "Auto Clear" option to reduce steps needed.
 *
 * ---
 *
 * General
 * 
 *   Auto Clear:
 *   - Automatically clear picture selection settings after each Show Choice
 *     command is done?
 *   - Erase picture will do the same to them.
 *   - This is to clear the binding settings so that they do not affect other
 *     "Show Choices" event commands.
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
 * * Irina
 * * Arisu
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.00 Official Release Date: July 5, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command ClearAll
 * @text Clear: All Selection Settings
 * @desc Clears all selection settings for all pictures 1 through 100.
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command ClearPictureID
 * @text Clear: Picture ID(s) Selection Settings
 * @desc Clears all selection settings for the ID'd pictures.
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
 * @command ClearPictureRange
 * @text Clear: Picture Range Selection Settings
 * @desc Clears all selection settings for the picture ID's in range.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the picture binds to clear.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the picture binds to clear.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command ChangePictureChoiceSettingsOne
 * @text Picture Settings: Change ID(s)
 * @desc Changes select and deselect settings for the picture ID(s).
 * 
 * @arg Step1
 * @text Step 1
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @parent Step1
 * @type number[]
 * @min 1
 * @max 100
 * @desc Select which Picture ID(s) to change settings for.
 * @default ["1"]
 * 
 * @arg Step2
 * @text Step 2
 *
 * @arg OnSelectSettings:struct
 * @text On Select Settings
 * @parent Step2
 * @type struct<Picture>
 * @desc Picture settings when selecting that choice.
 * @default {"Easing":"","Duration:num":"10","easingType:str":"Linear","Position":"","TargetX:str":"Unchanged","TargetY:str":"Unchanged","TargetScaleX:str":"Unchanged","TargetScaleY:str":"Unchanged","Blend":"","TargetOpacity:str":"Unchanged","BlendMode:num":"-1","Tone":"","TargetToneRed:str":"Unchanged","TargetToneGreen:str":"Unchanged","TargetToneBlue:str":"Unchanged","TargetToneGray:str":"Unchanged"}
 *
 * @arg OnDeselectSettings:struct
 * @text On Deselect Settings
 * @parent Step2
 * @type struct<Picture>
 * @desc Picture settings when deselecting that choice.
 * @default {"Easing":"","Duration:num":"10","easingType:str":"Linear","Position":"","TargetX:str":"Unchanged","TargetY:str":"Unchanged","TargetScaleX:str":"Unchanged","TargetScaleY:str":"Unchanged","Blend":"","TargetOpacity:str":"Unchanged","BlendMode:num":"-1","Tone":"","TargetToneRed:str":"Unchanged","TargetToneGreen:str":"Unchanged","TargetToneBlue:str":"Unchanged","TargetToneGray:str":"Unchanged"}
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command ChangePictureChoiceSettingsRange
 * @text Picture Settings: Change Range
 * @desc Changes select and deselect settings for the picture ID's in range.
 * 
 * @arg Step1
 * @text Step 1
 *
 * @arg StartID:num
 * @text Starting ID
 * @parent Step1
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to change settings for.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @parent Step1
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to change settings for.
 * @default 100
 * 
 * @arg Step2
 * @text Step 2
 *
 * @arg OnSelectSettings:struct
 * @text On Select Settings
 * @parent Step2
 * @type struct<Picture>
 * @desc Picture settings when selecting that choice.
 * @default {"Easing":"","Duration:num":"10","easingType:str":"Linear","Position":"","TargetX:str":"Unchanged","TargetY:str":"Unchanged","TargetScaleX:str":"Unchanged","TargetScaleY:str":"Unchanged","Blend":"","TargetOpacity:str":"Unchanged","BlendMode:num":"-1","Tone":"","TargetToneRed:str":"Unchanged","TargetToneGreen:str":"Unchanged","TargetToneBlue:str":"Unchanged","TargetToneGray:str":"Unchanged"}
 *
 * @arg OnDeselectSettings:struct
 * @text On Deselect Settings
 * @parent Step2
 * @type struct<Picture>
 * @desc Picture settings when deselecting that choice.
 * @default {"Easing":"","Duration:num":"10","easingType:str":"Linear","Position":"","TargetX:str":"Unchanged","TargetY:str":"Unchanged","TargetScaleX:str":"Unchanged","TargetScaleY:str":"Unchanged","Blend":"","TargetOpacity:str":"Unchanged","BlendMode:num":"-1","Tone":"","TargetToneRed:str":"Unchanged","TargetToneGreen:str":"Unchanged","TargetToneBlue:str":"Unchanged","TargetToneGray:str":"Unchanged"}
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
 * @param PictureChoices
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoClear:eval
 * @text Auto Clear
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically clear picture selection settings after
 * each Show Choice command is done?
 * @default true
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
 * Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Picture:
 *
 * @param Easing
 *
 * @param Duration:num
 * @text Duration
 * @parent Easing
 * @desc Insert a number to determine duration of the
 * changed settings when applied.
 * @default 10
 *
 * @param easingType:str
 * @text Easing Type
 * @parent Easing
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
 * Many of these choices require VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @param Position
 *
 * @param TargetX:str
 * @text Target X
 * @parent Position
 * @desc Insert a number to determine new X position.
 * Use 'Unchanged' to not change the X position.
 * @default Unchanged
 *
 * @param TargetY:str
 * @text Target Y
 * @parent Position
 * @desc Insert a number to determine new Y position.
 * Use 'Unchanged' to not change the Y position.
 * @default Unchanged
 *
 * @param TargetScaleX:str
 * @text Target Width %
 * @parent Position
 * @desc Insert a number to determine new width.
 * 'Unchanged' for no changes. For 100%, use 100.
 * @default Unchanged
 *
 * @param TargetScaleY:str
 * @text Target Height %
 * @parent Position
 * @desc Insert a number to determine new height.
 * 'Unchanged' for no changes. For 100%, use 100.
 * @default Unchanged
 * 
 * @param Blend
 *
 * @param TargetOpacity:str
 * @text Target Opacity
 * @parent Blend
 * @desc Insert a number to determine new opacity level.
 * 'Unchanged' for no changes. Use a number between 0 and 255.
 * @default Unchanged
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option -1 - Unchanged
 * @value -1
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default -1
 * 
 * @param Tone
 * @text Tone/Tint
 *
 * @param TargetToneRed:str
 * @text Target Tone Red
 * @parent Tone
 * @desc Insert a number to determine new red tone tint.
 * 'Unchanged' for no changes. Use a number between -255 and 255.
 * @default Unchanged
 *
 * @param TargetToneGreen:str
 * @text Target Tone Green
 * @parent Tone
 * @desc Insert a number to determine new green tone tint.
 * 'Unchanged' for no changes. Use a number between -255 and 255.
 * @default Unchanged
 *
 * @param TargetToneBlue:str
 * @text Target Tone Blue
 * @parent Tone
 * @desc Insert a number to determine new blue tone tint.
 * 'Unchanged' for no changes. Use a number between -255 and 255.
 * @default Unchanged
 *
 * @param TargetToneGray:str
 * @text Target Tone Gray
 * @parent Tone
 * @desc Insert a number to determine new gray tone tint.
 * 'Unchanged' for no changes. Use a number between 0 and 255.
 * @default Unchanged
 *
 */
//=============================================================================

const _0xeadbb3=_0x3003;(function(_0x2af72f,_0x262d79){const _0x27d6c8=_0x3003,_0x5cdc76=_0x2af72f();while(!![]){try{const _0x27dc10=-parseInt(_0x27d6c8(0x1eb))/0x1*(-parseInt(_0x27d6c8(0x1f2))/0x2)+parseInt(_0x27d6c8(0x1ff))/0x3+parseInt(_0x27d6c8(0x194))/0x4+-parseInt(_0x27d6c8(0x19c))/0x5*(-parseInt(_0x27d6c8(0x192))/0x6)+-parseInt(_0x27d6c8(0x170))/0x7+-parseInt(_0x27d6c8(0x15f))/0x8*(parseInt(_0x27d6c8(0x1b6))/0x9)+-parseInt(_0x27d6c8(0x197))/0xa*(-parseInt(_0x27d6c8(0x1c9))/0xb);if(_0x27dc10===_0x262d79)break;else _0x5cdc76['push'](_0x5cdc76['shift']());}catch(_0x8119a8){_0x5cdc76['push'](_0x5cdc76['shift']());}}}(_0x53a8,0xbc162));var label=_0xeadbb3(0x1ee),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xeadbb3(0x18f)](function(_0xe21236){const _0x486f35=_0xeadbb3;return _0xe21236['status']&&_0xe21236[_0x486f35(0x18e)][_0x486f35(0x1a5)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0xeadbb3(0x1ce)]||{},VisuMZ[_0xeadbb3(0x186)]=function(_0x379453,_0x5ecdcd){const _0x4ff47f=_0xeadbb3;for(const _0x4bfcb8 in _0x5ecdcd){if(_0x4bfcb8[_0x4ff47f(0x1e8)](/(.*):(.*)/i)){const _0x46bef9=String(RegExp['$1']),_0x35bb0a=String(RegExp['$2'])[_0x4ff47f(0x1b0)]()[_0x4ff47f(0x19d)]();let _0x788a1b,_0x5c8452,_0x1540f1;switch(_0x35bb0a){case _0x4ff47f(0x172):_0x788a1b=_0x5ecdcd[_0x4bfcb8]!==''?Number(_0x5ecdcd[_0x4bfcb8]):0x0;break;case _0x4ff47f(0x195):_0x5c8452=_0x5ecdcd[_0x4bfcb8]!==''?JSON['parse'](_0x5ecdcd[_0x4bfcb8]):[],_0x788a1b=_0x5c8452[_0x4ff47f(0x1be)](_0x242a4d=>Number(_0x242a4d));break;case _0x4ff47f(0x1bb):_0x788a1b=_0x5ecdcd[_0x4bfcb8]!==''?eval(_0x5ecdcd[_0x4bfcb8]):null;break;case _0x4ff47f(0x1b4):_0x5c8452=_0x5ecdcd[_0x4bfcb8]!==''?JSON[_0x4ff47f(0x162)](_0x5ecdcd[_0x4bfcb8]):[],_0x788a1b=_0x5c8452['map'](_0x305de3=>eval(_0x305de3));break;case _0x4ff47f(0x16f):_0x788a1b=_0x5ecdcd[_0x4bfcb8]!==''?JSON[_0x4ff47f(0x162)](_0x5ecdcd[_0x4bfcb8]):'';break;case'ARRAYJSON':_0x5c8452=_0x5ecdcd[_0x4bfcb8]!==''?JSON[_0x4ff47f(0x162)](_0x5ecdcd[_0x4bfcb8]):[],_0x788a1b=_0x5c8452['map'](_0x38c5e4=>JSON['parse'](_0x38c5e4));break;case'FUNC':_0x788a1b=_0x5ecdcd[_0x4bfcb8]!==''?new Function(JSON[_0x4ff47f(0x162)](_0x5ecdcd[_0x4bfcb8])):new Function(_0x4ff47f(0x180));break;case _0x4ff47f(0x1ca):_0x5c8452=_0x5ecdcd[_0x4bfcb8]!==''?JSON['parse'](_0x5ecdcd[_0x4bfcb8]):[],_0x788a1b=_0x5c8452['map'](_0x25e4a3=>new Function(JSON[_0x4ff47f(0x162)](_0x25e4a3)));break;case _0x4ff47f(0x199):_0x788a1b=_0x5ecdcd[_0x4bfcb8]!==''?String(_0x5ecdcd[_0x4bfcb8]):'';break;case'ARRAYSTR':_0x5c8452=_0x5ecdcd[_0x4bfcb8]!==''?JSON[_0x4ff47f(0x162)](_0x5ecdcd[_0x4bfcb8]):[],_0x788a1b=_0x5c8452['map'](_0x264df0=>String(_0x264df0));break;case _0x4ff47f(0x1bc):_0x1540f1=_0x5ecdcd[_0x4bfcb8]!==''?JSON[_0x4ff47f(0x162)](_0x5ecdcd[_0x4bfcb8]):{},_0x788a1b=VisuMZ[_0x4ff47f(0x186)]({},_0x1540f1);break;case _0x4ff47f(0x1aa):_0x5c8452=_0x5ecdcd[_0x4bfcb8]!==''?JSON[_0x4ff47f(0x162)](_0x5ecdcd[_0x4bfcb8]):[],_0x788a1b=_0x5c8452['map'](_0x3bf266=>VisuMZ[_0x4ff47f(0x186)]({},JSON['parse'](_0x3bf266)));break;default:continue;}_0x379453[_0x46bef9]=_0x788a1b;}}return _0x379453;},(_0x384465=>{const _0x5378d1=_0xeadbb3,_0x385a9b=_0x384465[_0x5378d1(0x1c1)];for(const _0x311972 of dependencies){if(_0x5378d1(0x190)!==_0x5378d1(0x179)){if(!Imported[_0x311972]){if(_0x5378d1(0x1d2)===_0x5378d1(0x1d2)){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x5378d1(0x1ac)](_0x385a9b,_0x311972)),SceneManager['exit']();break;}else _0x3a4131[_0x5378d1(0x1d0)](_0x19cb86,_0x530faf,![]),_0x162646[_0x5378d1(0x1f7)](_0x161f94,_0x123672,!![]);}}else _0x2e3211[_0x5378d1(0x1d4)]();}const _0x3b28af=_0x384465[_0x5378d1(0x18e)];if(_0x3b28af[_0x5378d1(0x1e8)](/\[Version[ ](.*?)\]/i)){const _0x47ded8=Number(RegExp['$1']);_0x47ded8!==VisuMZ[label]['version']&&(_0x5378d1(0x1f5)!=='mXTcd'?(alert(_0x5378d1(0x1fa)[_0x5378d1(0x1ac)](_0x385a9b,_0x47ded8)),SceneManager[_0x5378d1(0x15e)]()):(this[_0x5378d1(0x1fb)]===_0x1ec5b9&&this[_0x5378d1(0x1d4)](),this[_0x5378d1(0x17e)]===_0x112d65&&this[_0x5378d1(0x1d4)](),this[_0x5378d1(0x1fb)]===_0x5bb873&&this['clearPictureChoices'](),delete this['_pictureChoiceBinding'][_0x4440ed],delete this[_0x5378d1(0x1fb)][_0x1477c8],delete this[_0x5378d1(0x17e)][_0x263af1]));}if(_0x3b28af[_0x5378d1(0x1e8)](/\[Tier[ ](\d+)\]/i)){const _0x4eee89=Number(RegExp['$1']);_0x4eee89<tier?'LosOS'==='ECLMS'?this[_0x5378d1(0x1d4)]():(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x5378d1(0x1ac)](_0x385a9b,_0x4eee89,tier)),SceneManager['exit']()):tier=Math['max'](_0x4eee89,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x384465['parameters']);})(pluginData),PluginManager[_0xeadbb3(0x169)](pluginData[_0xeadbb3(0x1c1)],_0xeadbb3(0x1e6),_0x1bc470=>{const _0x57a638=_0xeadbb3;$gameScreen[_0x57a638(0x1d4)]();}),PluginManager[_0xeadbb3(0x169)](pluginData['name'],_0xeadbb3(0x173),_0x50e2a6=>{const _0x3e7789=_0xeadbb3;VisuMZ[_0x3e7789(0x186)](_0x50e2a6,_0x50e2a6);const _0x589f59=_0x50e2a6[_0x3e7789(0x1ef)];for(const _0x4725f4 of _0x589f59){$gameScreen['clearPictureChoiceID'](_0x4725f4);}}),PluginManager[_0xeadbb3(0x169)](pluginData[_0xeadbb3(0x1c1)],_0xeadbb3(0x1a3),_0x5ac07c=>{const _0x15f99f=_0xeadbb3;VisuMZ[_0x15f99f(0x186)](_0x5ac07c,_0x5ac07c);const _0x3a23f7=Math[_0x15f99f(0x1af)](_0x5ac07c[_0x15f99f(0x182)],_0x5ac07c['EndingID']),_0x50d804=Math['max'](_0x5ac07c[_0x15f99f(0x182)],_0x5ac07c['EndingID']);for(let _0x57dad0=_0x3a23f7;_0x57dad0<=_0x50d804;_0x57dad0++){$gameScreen[_0x15f99f(0x18c)](_0x57dad0);}}),PluginManager['registerCommand'](pluginData[_0xeadbb3(0x1c1)],_0xeadbb3(0x185),_0x17a8c5=>{const _0x5b8d36=_0xeadbb3;VisuMZ['ConvertParams'](_0x17a8c5,_0x17a8c5);const _0x484a7c=_0x17a8c5[_0x5b8d36(0x1ef)],_0x2b6219=_0x17a8c5[_0x5b8d36(0x1f6)],_0x38f069=_0x17a8c5[_0x5b8d36(0x18d)];for(const _0x2b314d of _0x484a7c){$gameScreen['setPictureChoiceSelectedSettings'](_0x2b314d,_0x2b6219,![]),$gameScreen[_0x5b8d36(0x1f7)](_0x2b314d,_0x38f069,!![]);}}),PluginManager[_0xeadbb3(0x169)](pluginData['name'],_0xeadbb3(0x1db),_0x4d80bc=>{const _0x4ccac8=_0xeadbb3;VisuMZ['ConvertParams'](_0x4d80bc,_0x4d80bc);const _0x49ca36=Math[_0x4ccac8(0x1af)](_0x4d80bc[_0x4ccac8(0x182)],_0x4d80bc[_0x4ccac8(0x1e9)]),_0x52192d=Math['max'](_0x4d80bc[_0x4ccac8(0x182)],_0x4d80bc['EndingID']),_0xfa4e34=_0x4d80bc[_0x4ccac8(0x1f6)],_0x21bdd5=_0x4d80bc['OnDeselectSettings'];for(let _0x2342d=_0x49ca36;_0x2342d<=_0x52192d;_0x2342d++){$gameScreen[_0x4ccac8(0x1d0)](_0x2342d,_0xfa4e34,![]),$gameScreen[_0x4ccac8(0x1f7)](_0x2342d,_0x21bdd5,!![]);}}),VisuMZ['PictureChoices']['Game_Screen_initialize']=Game_Screen['prototype'][_0xeadbb3(0x1b1)],Game_Screen[_0xeadbb3(0x1d7)][_0xeadbb3(0x1b1)]=function(){const _0x18eb34=_0xeadbb3;VisuMZ['PictureChoices'][_0x18eb34(0x168)]['call'](this),this[_0x18eb34(0x1d4)]();},Game_Screen['prototype'][_0xeadbb3(0x1d4)]=function(){const _0x21f59e=_0xeadbb3;this[_0x21f59e(0x1a7)]={},this[_0x21f59e(0x1fb)]={},this['_pictureChoiceDeselected']={};},Game_Screen['prototype'][_0xeadbb3(0x18c)]=function(_0x1747b5){const _0x9461f2=_0xeadbb3;this[_0x9461f2(0x1fb)]===undefined&&this['clearPictureChoices']();this[_0x9461f2(0x17e)]===undefined&&(_0x9461f2(0x165)==='DjTba'?this[_0x9461f2(0x1d4)]():(_0x4023d1(_0x9461f2(0x1a0)[_0x9461f2(0x1ac)](_0x4476ae,_0x550585,_0x2164e8)),_0x3bd304[_0x9461f2(0x15e)]()));if(this[_0x9461f2(0x1fb)]===undefined){if(_0x9461f2(0x1c2)===_0x9461f2(0x1c2))this[_0x9461f2(0x1d4)]();else{_0x1af418[_0x9461f2(0x186)](_0x5f0427,_0xb5812f);const _0x3ec811=_0x57e533[_0x9461f2(0x1ef)],_0x54d479=_0x3aa8d1[_0x9461f2(0x1f6)],_0x5e4fa7=_0x47133f['OnDeselectSettings'];for(const _0x1e602d of _0x3ec811){_0x2e657d['setPictureChoiceSelectedSettings'](_0x1e602d,_0x54d479,![]),_0x7ec0b2[_0x9461f2(0x1f7)](_0x1e602d,_0x5e4fa7,!![]);}}}delete this['_pictureChoiceBinding'][_0x1747b5],delete this[_0x9461f2(0x1fb)][_0x1747b5],delete this['_pictureChoiceDeselected'][_0x1747b5];},VisuMZ[_0xeadbb3(0x1ee)][_0xeadbb3(0x1d6)]=Game_Screen['prototype']['erasePicture'],Game_Screen[_0xeadbb3(0x1d7)][_0xeadbb3(0x196)]=function(_0x1905f5){const _0x5be268=_0xeadbb3;VisuMZ[_0x5be268(0x1ee)][_0x5be268(0x1d6)][_0x5be268(0x16b)](this,_0x1905f5),this[_0x5be268(0x18c)](_0x1905f5);},Game_Screen[_0xeadbb3(0x1d7)][_0xeadbb3(0x1cc)]=function(_0x201a74){const _0x2b1655=_0xeadbb3;this['_pictureChoiceSelected']===undefined&&(_0x2b1655(0x163)!==_0x2b1655(0x1a1)?this[_0x2b1655(0x1d4)]():(_0x19fcd2[_0x2b1655(0x1ee)][_0x2b1655(0x1d6)]['call'](this,_0x45ad60),this['clearPictureChoiceID'](_0x377ea0)));const _0x2d5497=this[_0x2b1655(0x1a7)];return _0x2d5497[_0x201a74]??-0x2;},Game_Screen[_0xeadbb3(0x1d7)]['addPictureChoiceBinding']=function(_0x55531f,_0x15966f){const _0x395a1e=_0xeadbb3;if(this[_0x395a1e(0x1fb)]===undefined){if(_0x395a1e(0x203)==='TKksM'){this[_0x395a1e(0x17e)]===_0x5ddf9c&&this['clearPictureChoices']();const _0x4ccb2d=this['_pictureChoiceSelected'];_0x4ccb2d[_0x491a78]=_0x502b6c[_0x395a1e(0x1ad)](_0x37de11);}else this[_0x395a1e(0x1d4)]();}const _0x17e569=this[_0x395a1e(0x1a7)];_0x17e569[_0x55531f]=_0x15966f;},Game_Screen['prototype'][_0xeadbb3(0x1ab)]=function(_0x4f3da7){const _0x187aa0=_0xeadbb3;this[_0x187aa0(0x17e)]===undefined&&this[_0x187aa0(0x1d4)]();const _0x3e439a=this[_0x187aa0(0x1fb)];return _0x3e439a[_0x4f3da7]=_0x3e439a[_0x4f3da7]||{'Duration':0xa,'easingType':_0x187aa0(0x17f),'TargetX':_0x187aa0(0x1bd),'TargetY':'Unchanged','TargetScaleX':_0x187aa0(0x1bd),'TargetScaleY':_0x187aa0(0x1bd),'TargetOpacity':'Unchanged','BlendMode':-0x1,'TargetToneRed':_0x187aa0(0x1bd),'TargetToneGreen':_0x187aa0(0x1bd),'TargetToneBlue':_0x187aa0(0x1bd),'TargetToneGray':_0x187aa0(0x1bd)},_0x3e439a[_0x4f3da7];},Game_Screen['prototype'][_0xeadbb3(0x1d0)]=function(_0x20a0b2,_0x562f47){const _0x3a46cf=_0xeadbb3;this[_0x3a46cf(0x17e)]===undefined&&(_0x3a46cf(0x1d1)===_0x3a46cf(0x1da)?this[_0x3a46cf(0x1d4)]():this[_0x3a46cf(0x1d4)]());const _0x495c60=this[_0x3a46cf(0x1fb)];_0x495c60[_0x20a0b2]=JsonEx[_0x3a46cf(0x1ad)](_0x562f47);},Game_Screen[_0xeadbb3(0x1d7)][_0xeadbb3(0x1c6)]=function(_0x439e3c){const _0x458268=_0xeadbb3;this[_0x458268(0x17e)]===undefined&&this[_0x458268(0x1d4)]();const _0x4666cf=this[_0x458268(0x17e)];return _0x4666cf[_0x439e3c]=_0x4666cf[_0x439e3c]||{'Duration':0xa,'easingType':_0x458268(0x17f),'TargetX':'Unchanged','TargetY':'Unchanged','TargetScaleX':_0x458268(0x1bd),'TargetScaleY':'Unchanged','TargetOpacity':'Unchanged','BlendMode':-0x1,'TargetToneRed':_0x458268(0x1bd),'TargetToneGreen':'Unchanged','TargetToneBlue':_0x458268(0x1bd),'TargetToneGray':_0x458268(0x1bd)},_0x4666cf[_0x439e3c];},Game_Screen['prototype']['setPictureChoiceDeselectedSettings']=function(_0x32dfa7,_0x4d7d4a){const _0x296447=_0xeadbb3;this[_0x296447(0x17e)]===undefined&&(_0x296447(0x1e7)!=='LxdmB'?(this[_0x296447(0x176)][0x0]=_0x2e46f6(_0x1cbb08[_0x296447(0x1fd)])[_0x296447(0x1f9)](-0xff,0xff),_0xb0a0a2=!![]):this[_0x296447(0x1d4)]());const _0x78c34=this[_0x296447(0x17e)];_0x78c34[_0x32dfa7]=JsonEx['makeDeepCopy'](_0x4d7d4a);},Game_Screen[_0xeadbb3(0x1d7)][_0xeadbb3(0x205)]=function(_0x3fac37,_0x450658){const _0x474846=_0xeadbb3,_0x491c0e=this[_0x474846(0x1d9)](_0x3fac37);if(!_0x491c0e)return;const _0x3b841a=this[_0x474846(0x1ab)](_0x3fac37);_0x491c0e[_0x474846(0x189)](_0x3b841a,_0x450658);},Game_Screen['prototype'][_0xeadbb3(0x1a6)]=function(_0x36a6b3,_0x4beb1c){const _0x4fef9e=_0xeadbb3,_0x200ec5=this[_0x4fef9e(0x1d9)](_0x36a6b3);if(!_0x200ec5)return;const _0x495b45=this[_0x4fef9e(0x1c6)](_0x36a6b3);_0x200ec5[_0x4fef9e(0x189)](_0x495b45,_0x4beb1c);},VisuMZ[_0xeadbb3(0x1ee)][_0xeadbb3(0x1b5)]=Game_Screen[_0xeadbb3(0x1d7)][_0xeadbb3(0x1a2)],Game_Screen[_0xeadbb3(0x1d7)]['showPicture']=function(_0xa1948d,_0x59a470,_0x49fd94,_0x2ab25a,_0x11dfa4,_0x2da65e,_0x2447c7,_0x31c4be,_0x2547fd){const _0x1f9c59=_0xeadbb3;this[_0x1f9c59(0x17e)]===undefined&&(_0x1f9c59(0x1e1)!==_0x1f9c59(0x1e1)?(_0x22ae18(_0x1f9c59(0x1fa)['format'](_0x449228,_0x466dee)),_0x4c3cf6[_0x1f9c59(0x15e)]()):this['clearPictureChoices']()),VisuMZ[_0x1f9c59(0x1ee)][_0x1f9c59(0x1b5)][_0x1f9c59(0x16b)](this,_0xa1948d,_0x59a470,_0x49fd94,_0x2ab25a,_0x11dfa4,_0x2da65e,_0x2447c7,_0x31c4be,_0x2547fd),this[_0x1f9c59(0x17e)][_0xa1948d]&&this[_0x1f9c59(0x1a6)](_0xa1948d,!![]);},Game_Picture[_0xeadbb3(0x1d7)]['applyPictureChoiceSettings']=function(_0xb0e308,_0xbdf5d1){const _0x20a505=_0xeadbb3;if(!_0xb0e308)return;if(Imported['VisuMZ_0_CoreEngine'])this[_0x20a505(0x17b)]=0x0,this[_0x20a505(0x1f4)](_0xb0e308['easingType']);else{if('FHAQW'===_0x20a505(0x206))_0x5a68e0[_0x20a505(0x1ee)][_0x20a505(0x1ce)][_0x20a505(0x1e0)]&&_0x1daaa0[_0x20a505(0x1d4)]();else{const _0x3c3913=_0xb0e308['easingType'][_0x20a505(0x193)]()['trim']();this[_0x20a505(0x17b)]=[_0x20a505(0x1a9),'insine','outsine',_0x20a505(0x167)][_0x20a505(0x1cf)](_0x3c3913)||0x0;}}if(_0xb0e308[_0x20a505(0x1de)][_0x20a505(0x193)]()[_0x20a505(0x19d)]()!==_0x20a505(0x184))this[_0x20a505(0x1f0)]=eval(_0xb0e308[_0x20a505(0x1de)]);if(_0xb0e308['TargetY'][_0x20a505(0x193)]()[_0x20a505(0x19d)]()!==_0x20a505(0x184))this[_0x20a505(0x202)]=eval(_0xb0e308['TargetY']);if(_0xb0e308['TargetScaleX'][_0x20a505(0x193)]()[_0x20a505(0x19d)]()!=='unchanged')this[_0x20a505(0x1a8)]=eval(_0xb0e308[_0x20a505(0x17a)]);if(_0xb0e308[_0x20a505(0x1ed)][_0x20a505(0x193)]()[_0x20a505(0x19d)]()!==_0x20a505(0x184))this[_0x20a505(0x16a)]=eval(_0xb0e308['TargetScaleY']);if(_0xb0e308['TargetOpacity'][_0x20a505(0x193)]()[_0x20a505(0x19d)]()!==_0x20a505(0x184))this['_targetOpacity']=eval(_0xb0e308[_0x20a505(0x1e4)]);if(_0xb0e308[_0x20a505(0x1dc)]>=0x0)this[_0x20a505(0x1e5)]=_0xb0e308[_0x20a505(0x1dc)];let _0x4c20c2=![];if(!this[_0x20a505(0x1a4)])this[_0x20a505(0x1a4)]=[0x0,0x0,0x0,0x0];this[_0x20a505(0x176)]=this[_0x20a505(0x1a4)][_0x20a505(0x175)]();_0xb0e308[_0x20a505(0x1fd)]['toLowerCase']()[_0x20a505(0x19d)]()!=='unchanged'&&(this[_0x20a505(0x176)][0x0]=eval(_0xb0e308[_0x20a505(0x1fd)])[_0x20a505(0x1f9)](-0xff,0xff),_0x4c20c2=!![]);_0xb0e308[_0x20a505(0x1bf)][_0x20a505(0x193)]()[_0x20a505(0x19d)]()!==_0x20a505(0x184)&&(this[_0x20a505(0x176)][0x1]=eval(_0xb0e308[_0x20a505(0x1bf)])['clamp'](-0xff,0xff),_0x4c20c2=!![]);_0xb0e308[_0x20a505(0x1df)]['toLowerCase']()[_0x20a505(0x19d)]()!==_0x20a505(0x184)&&(this['_toneTarget'][0x2]=eval(_0xb0e308[_0x20a505(0x1df)])[_0x20a505(0x1f9)](-0xff,0xff),_0x4c20c2=!![]);_0xb0e308[_0x20a505(0x17c)][_0x20a505(0x193)]()['trim']()!=='unchanged'&&('jChZu'!==_0x20a505(0x204)?_0x286f74[_0x20a505(0x18c)](_0x56985a):(this['_toneTarget'][0x3]=eval(_0xb0e308[_0x20a505(0x17c)])[_0x20a505(0x1f9)](0x0,0xff),_0x4c20c2=!![]));if(_0x4c20c2)this['_toneDuration']=_0xb0e308['Duration']||0x0;this[_0x20a505(0x166)]=_0xb0e308[_0x20a505(0x1f1)]||0x0,this['_wholeDuration']=_0xb0e308[_0x20a505(0x1f1)]||0x0;if(_0xbdf5d1||this[_0x20a505(0x166)]<=0x0){this[_0x20a505(0x166)]=0x1,this['_wholeDuration']=0x1;if(_0x4c20c2)this[_0x20a505(0x200)]=0x1;this[_0x20a505(0x178)]();}},Sprite_Clickable[_0xeadbb3(0x1d7)][_0xeadbb3(0x19b)]=function(){const _0x4f7f99=_0xeadbb3;if(this[_0x4f7f99(0x1b2)][_0x4f7f99(0x1c1)]!=='Sprite_Picture')return![];const _0x3998c7=SceneManager[_0x4f7f99(0x1e3)];if(_0x3998c7&&!_0x3998c7[_0x4f7f99(0x201)])return![];if(!_0x3998c7[_0x4f7f99(0x201)][_0x4f7f99(0x1ea)])return![];return $gameScreen[_0x4f7f99(0x1cc)](this[_0x4f7f99(0x181)])>=0x0;},VisuMZ[_0xeadbb3(0x1ee)][_0xeadbb3(0x161)]=Sprite_Clickable[_0xeadbb3(0x1d7)][_0xeadbb3(0x177)],Sprite_Clickable['prototype'][_0xeadbb3(0x177)]=function(){const _0x299ab3=_0xeadbb3;VisuMZ['PictureChoices']['Sprite_Clickable_onMouseEnter'][_0x299ab3(0x16b)](this),this['hasPictureChoiceBinding']()&&(_0x299ab3(0x1ec)===_0x299ab3(0x1d8)?(this[_0x299ab3(0x176)][0x3]=_0x5874bb(_0x46252b['TargetToneGray'])[_0x299ab3(0x1f9)](0x0,0xff),_0x2aa80a=!![]):this[_0x299ab3(0x1f8)]());},Sprite_Clickable[_0xeadbb3(0x1d7)]['onMouseEnterPictureChoice']=function(){const _0x5a3ce0=_0xeadbb3,_0x20beb0=SceneManager[_0x5a3ce0(0x1e3)],_0x19180f=_0x20beb0[_0x5a3ce0(0x201)],_0xc6da5b=$gameScreen['getPictureChoiceBinding'](this['_pictureId']);_0x19180f[_0x5a3ce0(0x198)](_0xc6da5b);},VisuMZ[_0xeadbb3(0x1ee)][_0xeadbb3(0x191)]=Sprite_Clickable['prototype'][_0xeadbb3(0x1b3)],Sprite_Clickable[_0xeadbb3(0x1d7)][_0xeadbb3(0x1b3)]=function(){const _0x6356af=_0xeadbb3;VisuMZ[_0x6356af(0x1ee)][_0x6356af(0x191)][_0x6356af(0x16b)](this),this[_0x6356af(0x19b)]()&&(this['onMouseEnterPictureChoice'](),this[_0x6356af(0x1c5)]());},Sprite_Clickable[_0xeadbb3(0x1d7)][_0xeadbb3(0x1c5)]=function(){const _0x447859=_0xeadbb3,_0x2184f4=SceneManager[_0x447859(0x1e3)],_0x1413ff=_0x2184f4[_0x447859(0x201)],_0x13ab7d=$gameScreen[_0x447859(0x1cc)](this[_0x447859(0x181)]);_0x1413ff[_0x447859(0x16e)](_0x13ab7d),_0x1413ff[_0x447859(0x19a)]();},VisuMZ[_0xeadbb3(0x1ee)][_0xeadbb3(0x1b9)]=Window_ChoiceList[_0xeadbb3(0x1d7)]['makeCommandList'],Window_ChoiceList[_0xeadbb3(0x1d7)][_0xeadbb3(0x183)]=function(){const _0x588b73=_0xeadbb3;VisuMZ[_0x588b73(0x1ee)][_0x588b73(0x1b9)][_0x588b73(0x16b)](this),this['applyHideChoiceWindow'](),this[_0x588b73(0x1ae)]();},Window_ChoiceList[_0xeadbb3(0x1d7)][_0xeadbb3(0x1e2)]=function(){const _0x5bf2de=_0xeadbb3;this['scale']['x']=this[_0x5bf2de(0x16c)]['y']=0x1;const _0x4bdeae=/<HIDE CHOICE WINDOW>/i;this[_0x5bf2de(0x17d)]=![];const _0x4890a0=$gameMessage[_0x5bf2de(0x15d)]();for(const _0x6fdad4 of _0x4890a0){if(_0x5bf2de(0x1c0)===_0x5bf2de(0x18a)){if(this[_0x5bf2de(0x1b2)]['name']!==_0x5bf2de(0x1f3))return![];const _0xfc5bf8=_0xca488e[_0x5bf2de(0x1e3)];if(_0xfc5bf8&&!_0xfc5bf8['_choiceListWindow'])return![];if(!_0xfc5bf8[_0x5bf2de(0x201)][_0x5bf2de(0x1ea)])return![];return _0x2e8ce8[_0x5bf2de(0x1cc)](this['_pictureId'])>=0x0;}else{if(_0x6fdad4[_0x5bf2de(0x1e8)](_0x4bdeae)){if(_0x5bf2de(0x1ba)!==_0x5bf2de(0x188)){this[_0x5bf2de(0x16c)]['x']=this[_0x5bf2de(0x16c)]['y']=0x0,this[_0x5bf2de(0x17d)]=!![];break;}else _0x5728b2[_0x5bf2de(0x18c)](_0x183ae0);}}}for(const _0x3aae32 of this['_list']){if(_0x5bf2de(0x187)!==_0x5bf2de(0x160)){if(!_0x3aae32)continue;if(_0x3aae32['name'][_0x5bf2de(0x1e8)](_0x4bdeae)){if('pZcEy'!==_0x5bf2de(0x19e))_0x3aae32[_0x5bf2de(0x1c1)]=_0x3aae32['name']['replace'](_0x4bdeae,'')['trim']();else{this[_0x5bf2de(0x1fb)]===_0x22ff01&&this['clearPictureChoices']();const _0x2a9280=this[_0x5bf2de(0x1a7)];return _0x2a9280[_0x220f59]??-0x2;}}}else{this[_0x5bf2de(0x166)]=0x1,this[_0x5bf2de(0x19f)]=0x1;if(_0x6d0f27)this[_0x5bf2de(0x200)]=0x1;this['update']();}}},Window_ChoiceList['prototype'][_0xeadbb3(0x1ae)]=function(){const _0x5bf838=_0xeadbb3;let _0x528f11=/<BIND (?:PICTURE|PICTURES):[ ](\d+)>/i;for(const _0x3159dd of this['_list']){if(!_0x3159dd)continue;if(_0x3159dd[_0x5bf838(0x1c1)][_0x5bf838(0x1e8)](_0x528f11)){if(_0x5bf838(0x1c7)!==_0x5bf838(0x1c7))_0x1270a5['PictureChoices'][_0x5bf838(0x191)]['call'](this),this[_0x5bf838(0x19b)]()&&(this[_0x5bf838(0x1f8)](),this['onClickPictureChoice']());else{const _0x5b13f8=Number(RegExp['$1']),_0x5829e2=this['_list'][_0x5bf838(0x1cf)](_0x3159dd);$gameScreen[_0x5bf838(0x1c4)](_0x5b13f8,_0x5829e2),_0x3159dd[_0x5bf838(0x1c1)]=_0x3159dd[_0x5bf838(0x1c1)][_0x5bf838(0x1c8)](_0x528f11,'')[_0x5bf838(0x19d)]();}}}},VisuMZ['PictureChoices'][_0xeadbb3(0x1c3)]=Window_ChoiceList[_0xeadbb3(0x1d7)][_0xeadbb3(0x18b)],Window_ChoiceList['prototype'][_0xeadbb3(0x18b)]=function(){const _0x4f9013=_0xeadbb3;VisuMZ[_0x4f9013(0x1ee)][_0x4f9013(0x1c3)][_0x4f9013(0x16b)](this),this[_0x4f9013(0x1cb)]();},VisuMZ[_0xeadbb3(0x1ee)][_0xeadbb3(0x164)]=Window_ChoiceList[_0xeadbb3(0x1d7)][_0xeadbb3(0x1cd)],Window_ChoiceList[_0xeadbb3(0x1d7)]['callCancelHandler']=function(){const _0x335ee8=_0xeadbb3;VisuMZ[_0x335ee8(0x1ee)][_0x335ee8(0x164)]['call'](this),this[_0x335ee8(0x1cb)]();},Window_ChoiceList[_0xeadbb3(0x1d7)][_0xeadbb3(0x1cb)]=function(){const _0x544b5c=_0xeadbb3;VisuMZ['PictureChoices']['Settings'][_0x544b5c(0x1e0)]&&(_0x544b5c(0x1dd)!==_0x544b5c(0x1dd)?this[_0x544b5c(0x1d4)]():$gameScreen[_0x544b5c(0x1d4)]());},VisuMZ[_0xeadbb3(0x1ee)][_0xeadbb3(0x1d5)]=Window_Selectable['prototype'][_0xeadbb3(0x16e)],Window_Selectable[_0xeadbb3(0x1d7)]['select']=function(_0x1aca31){const _0x3c8a69=_0xeadbb3;VisuMZ[_0x3c8a69(0x1ee)][_0x3c8a69(0x1d5)][_0x3c8a69(0x16b)](this,_0x1aca31),this[_0x3c8a69(0x1b2)]['name']==='Window_ChoiceList'&&this[_0x3c8a69(0x1b8)](_0x1aca31);},Window_ChoiceList[_0xeadbb3(0x1d7)][_0xeadbb3(0x198)]=function(_0x5a7405){const _0xf1bb9a=_0xeadbb3,_0x1f1e1d=this[_0xf1bb9a(0x1fe)]();this[_0xf1bb9a(0x16e)](_0x5a7405),this[_0xf1bb9a(0x1fe)]()!==_0x1f1e1d&&this[_0xf1bb9a(0x1d3)]();},VisuMZ['PictureChoices'][_0xeadbb3(0x174)]=Window_ChoiceList[_0xeadbb3(0x1d7)][_0xeadbb3(0x171)],Window_ChoiceList[_0xeadbb3(0x1d7)][_0xeadbb3(0x171)]=function(){const _0x7ea194=_0xeadbb3;this[_0x7ea194(0x16d)]=!![],VisuMZ[_0x7ea194(0x1ee)][_0x7ea194(0x174)][_0x7ea194(0x16b)](this),this[_0x7ea194(0x16d)]=undefined;},Window_ChoiceList[_0xeadbb3(0x1d7)][_0xeadbb3(0x1b8)]=function(_0x4f700c){const _0x16e815=_0xeadbb3;for(let _0x11a1fc=0x0;_0x11a1fc<0x64;_0x11a1fc++){if(_0x16e815(0x1b7)!==_0x16e815(0x1fc)){const _0x21c465=$gameScreen[_0x16e815(0x1cc)](_0x11a1fc);if(_0x21c465<0x0)continue;const _0x19b31b=$gameScreen[_0x16e815(0x1d9)](_0x11a1fc);if(!_0x19b31b)continue;const _0x4ab61e=this[_0x16e815(0x16d)];_0x21c465===_0x4f700c?$gameScreen[_0x16e815(0x205)](_0x11a1fc,_0x4ab61e):$gameScreen['applyPictureChoiceDeselectSettings'](_0x11a1fc,_0x4ab61e);}else this[_0x16e815(0x176)][0x2]=_0x3ff752(_0x59c2ac[_0x16e815(0x1df)])[_0x16e815(0x1f9)](-0xff,0xff),_0x42e6a7=!![];}};function _0x3003(_0x2fcf8a,_0x41b06b){const _0x53a8d9=_0x53a8();return _0x3003=function(_0x3003c9,_0x2f3ba8){_0x3003c9=_0x3003c9-0x15d;let _0x5e2d6a=_0x53a8d9[_0x3003c9];return _0x5e2d6a;},_0x3003(_0x2fcf8a,_0x41b06b);}function _0x53a8(){const _0x45685b=['gdqNK','picture','LDtln','ChangePictureChoiceSettingsRange','BlendMode','MQcij','TargetX','TargetToneBlue','AutoClear','mqjML','applyHideChoiceWindow','_scene','TargetOpacity','_blendMode','ClearAll','LxdmB','match','EndingID','active','449mJYKsk','TobhB','TargetScaleY','PictureChoices','PictureIDs','_targetX','Duration','6354TIFbHj','Sprite_Picture','setEasingType','tciHo','OnSelectSettings','setPictureChoiceDeselectedSettings','onMouseEnterPictureChoice','clamp','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_pictureChoiceSelected','LiegV','TargetToneRed','index','1184139kZFahv','_toneDuration','_choiceListWindow','_targetY','DQeVG','jChZu','applyPictureChoiceSelectSettings','mQcRr','choices','exit','150352wrzwiL','wKJZS','Sprite_Clickable_onMouseEnter','parse','jeTKR','Window_ChoiceList_callCancelHandler','DjTba','_duration','inoutsine','Game_Screen_initialize','registerCommand','_targetScaleY','call','scale','_instantPictureChoiceSelect','select','JSON','7228200izqgCM','selectDefault','NUM','ClearPictureID','Window_ChoiceList_selectDefault','clone','_toneTarget','onMouseEnter','update','lDwSf','TargetScaleX','_easingType','TargetToneGray','_pictureChoicesHidden','_pictureChoiceDeselected','Linear','return\x200','_pictureId','StartID','makeCommandList','unchanged','ChangePictureChoiceSettingsOne','ConvertParams','GKOuL','LbYmq','applyPictureChoiceSettings','wZfFb','callOkHandler','clearPictureChoiceID','OnDeselectSettings','description','filter','ArdSc','Sprite_Clickable_onClick','4916892KXgHXB','toLowerCase','2082984fvbUYl','ARRAYNUM','erasePicture','24880LkgotZ','pictureChoiceSelect','STR','processOk','hasPictureChoiceBinding','5ccldTF','trim','tFpoZ','_wholeDuration','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','oFiPY','showPicture','ClearPictureRange','_tone','includes','applyPictureChoiceDeselectSettings','_pictureChoiceBinding','_targetScaleX','linear','ARRAYSTRUCT','getPictureChoiceSelectedSettings','format','makeDeepCopy','applyPictureChoiceBindings','min','toUpperCase','initialize','constructor','onClick','ARRAYEVAL','Game_Screen_showPicture','666EvINoN','FAlWv','onSelectPictureChoices','Window_ChoiceList_makeCommandList','vYmAf','EVAL','STRUCT','Unchanged','map','TargetToneGreen','LIaIw','name','dztcB','Window_ChoiceList_callOkHandler','addPictureChoiceBinding','onClickPictureChoice','getPictureChoiceDeselectedSettings','YIOZv','replace','143rfuXLr','ARRAYFUNC','autoClearPictureChoices','getPictureChoiceBinding','callCancelHandler','Settings','indexOf','setPictureChoiceSelectedSettings','sAFfh','hzCdJ','playCursorSound','clearPictureChoices','Window_Selectable_select','Game_Screen_erasePicture','prototype'];_0x53a8=function(){return _0x45685b;};return _0x53a8();}
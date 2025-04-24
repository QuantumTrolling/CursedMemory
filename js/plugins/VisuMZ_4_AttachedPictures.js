//=============================================================================
// VisuStella MZ - Attached Pictures
// VisuMZ_4_AttachedPictures.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_AttachedPictures = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AttachedPictures = VisuMZ.AttachedPictures || {};
VisuMZ.AttachedPictures.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.01] [AttachedPictures]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Page
 * @orderAfter VisuMZ_1_MessageCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * This plugin allows you to attach Pictures to the Message Window or other
 * Pictures. This means that their positions, effects, and the like become
 * relative to the attached target's, including their position and properties.
 * Use this to display busts on Message Windows or piece together actor busts
 * with a basic body image, a set of eyes, and a mouth. Add some flavor by
 * letting pictures interact with the Message Window in different ways as well
 * as make your actor busts more vivid.
 *
 * This plugin allows you to attach pictures to the Message Window. This means
 * that their positions, effects, and the like become relative to the Message
 * Window's position. Use this to display busts, special effects on an actor's
 * face, or add some flavor by letting pictures interact with the Message
 * Window in different ways.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Pictures attached to other pictures will appear relative to the target
 *   picture's position, origin, and share its other properties like scaling,
 *   opacity, tint, and rotation.
 * * Pictures attached to the Message Window will appear relative to the
 *   Message Window's position.
 * * Control these pictures with event commands, such as movement, rotation,
 *   tint, and any kind of picture-related Plugin Command.
 * * Use pictures as Message Window busts, special effects, or anything you can
 *   think of.
 * * Create a bust system for your actors displaying various emotions without
 *   needing a whole picture for each emotional combination.
 * * Change the attached pictures throughout the game. Add to the Message
 *   Window or remove from it with Plugin Commands!
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
 * VisuMZ_4_PictureCmnEvts
 * 
 * Attached Pictures (for both pictures attached to other pictures or pictures
 * that are attached to the Message Window) will no longer trigger click
 * effects in order to reduce lag. Instead, the click area is now bound only to
 * the base picture it is attached to, if it is a picture. This does not apply
 * to the Message Window as it would not work with the Message Window anyway.
 * 
 * ---
 *
 * ============================================================================
 * Instructions - Message Pictures
 * ============================================================================
 *
 * Here are the instructions on how to use this plugin.
 *
 * ---
 *
 * Step 1:
 * 
 * Option A:
 * 
 * - Open up the Plugin Parameters for this plugin.
 * - Modify the Message Window > Default Attached ID Plugin Parameter.
 * - This marks the Picture ID's attached to the Message Window by default.
 * - Default Picture ID values: 61, 62, 63, 64, 65, 66, 67, 68, 69, 70
 * - Remember these ID's.
 * 
 * OR
 * 
 * Option B:
 * 
 * - Use the Plugin Command: "Message: Attach Picture(s)"
 * - Add specific Picture ID's to be attached to the Message Window.
 * - Remember these ID's.
 *
 * ---
 *
 * Step 2:
 * 
 * - Create an event or edit an existing one.
 * - Create a "Show Picture" event using one of the ID's attached to the
 *   Message Window from Step 1.
 * - Modify the specific ID's with "Move Picture", "Rotate Picture",
 *   "Tint Picture", or "Erase Picture" event commands.
 * - The effects will be applied to picture(s) attached to the Message Window.
 *
 * ---
 *
 * Things to Note:
 * 
 * - The picture coordinates are relative to the Message Window's upper left
 * corner. This means if your picture has an X coordinate of 100, and a Y
 * coordinate of 50, it will be 100 pixels across and 50 pixels down from the
 * upper left corner of the Message Window while paying heed to the picture's
 * anchor/origin position.
 * 
 * - Pictures will be layered in the order of smallest ID towards the bottom to
 * largest ID towards the top, just like it would on the main map.
 * 
 * - Pictures will only be positioned relative to the Message Window. Any
 * supplemental windows like the Name Window, Choice Window, and Number Input
 * Window will appear above the pictures. Keep this in mind as you use them.
 * There is no changing this.
 * 
 * - Removing a picture from being attached to the Message Window while it is
 * visible will place it back to the main screen.
 * 
 * - The opposite is also true. If you attach a picture to the Message Window
 * while it is already on the main screen, it will be attached to the Message
 * Window suddenly.
 * 
 * - If the Message Window is closing or is invisible, all attached pictures
 * to the Message Window will disappear until it is fully opened again.
 * 
 * - If the Message Window changes positions (ie from the bottom to the middle)
 * then all attached pictures will be transported relative to the new location.
 * 
 * - Pictures cannot be simultaneously attached to Message Windows and other
 * Pictures at the same time. The attachment will go towards whichever command
 * last attaches them. Attached Pictures also cannot be attached to other
 * Attached Pictures regardless of their sources.
 *
 * ---
 *
 * ============================================================================
 * Instructions - Pictures Attached to Other Pictures
 * ============================================================================
 *
 * Here are the instructions on how to use this plugin.
 *
 * ---
 *
 * Step 1:
 * 
 * - Use the Plugin Command: "Picture: Attach Picture(s)"
 * - Add "Attach Picture ID(s)" to be attached to the "Target Picture ID".
 * - Remember these ID's.
 *
 * ---
 *
 * Step 2:
 * 
 * - Create an event or edit an existing one.
 * - Create a "Show Picture" event using one of the ID's attached to the
 *   target Picture from Step 1.
 * - Create a "Show Picture" event using the target picture ID from Step 1.
 * - Modify the specific ID's with "Move Picture", "Rotate Picture",
 *   "Tint Picture", or "Erase Picture" event commands.
 * - The effects will be applied to picture(s) attached to the target Picture.
 *
 * ---
 *
 * Things to Note:
 * 
 * - The picture coordinates of the attached pictures are relative to the
 * origin point determined by the target picture. This means if the target
 * picture uses the "Upper Left" origin point, any attached pictures will use
 * that as their 0, 0. If they use a "Center" origin point, then the attached
 * pictures will use the target picture's center.
 * 
 * - Attached pictures will be layered in the order of smallest ID towards the
 * bottom to largest ID towards the top, just like it would on the main map.
 * 
 * - Attached pictures will always be on top of the picture it is attached to
 * regardless of their ID's. This means if picture 5 is attached to picture 20,
 * the attached picture 5 will appear on top of picture 20.
 * 
 * - Attached pictures of base pictures with higher ID's will appear above
 * other attached pictures and base pictures of lower ID's. This means if
 * picture 5 is attached to picture 20, it will appear on top of picture 90
 * that is attached to picture 15.
 * 
 * - Removing a picture from being attached to the target picture while it is
 * visible will place it back to the main screen.
 * 
 * - The opposite is also true. If you attach a picture to a target picture
 * while it is already on the main screen, it will be attached to the target
 * picture suddenly.
 * 
 * - If the target picture is stretched via scale, has its opacity changed,
 * rotating, or is tinted, attached pictures will adopt those properties. In
 * regards to opacity changes, each layer can be visibly seen apart from one
 * another. There is nothing we can do about this as it's a Pixi-related issue.
 * 
 * - The attached pictures won't be shown if the target picture is erased.
 * 
 * - Pictures cannot be simultaneously attached to Message Windows and other
 * Pictures at the same time. The attachment will go towards whichever command
 * last attaches them. Attached Pictures also cannot be attached to other
 * Attached Pictures regardless of their sources.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Attach Picture(s)
 * - Select which Picture ID's to attach to the Message Window.
 *
 *   Picture ID(s):
 *   - Select which Picture ID's to attach to the Message Window.
 *
 * ---
 *
 * Message: Remove Picture(s)
 * - Select which Picture ID's to remove from the Message Window.
 *
 *   Picture ID(s):
 *   - Select which Picture ID's to remove from the Message Window.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Attach Picture(s)
 * - Select which Picture ID's to attach to another picture.
 *
 *   Picture ID(s):
 *   - Select which Picture ID's to attach to another picture.
 * 
 *   Target Picture ID:
 *   - Select which Picture ID to attach the above picture(s) to.
 *
 * ---
 *
 * Picture: Remove Picture(s)
 * - Select which Picture ID's to remove from any other pictures.
 *
 *   Picture ID(s):
 *   - Select which Picture ID's to remove from any other pictures.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings available to this plugin.
 *
 * ---
 *
 * Message Window
 * 
 *   Default Attached ID(s):
 *   - Select which Picture ID's to default to being attached to
 *     Message Window.
 *   - Can be updated with Plugin Commands.
 * 
 *   Container Position:
 *   - Select the position of the picture container.
 *   - Pictures will still appear behind supplemental windows.
 *     - 0 - Behind Window Skin
 *     - 1 - In Front of Window Skin
 *     - 2 - In Front of Window Text
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
 * Version 1.01: December 2, 2021
 * * Documentation Update!
 * ** Added section under "VisuStella MZ Compatibility" for Picture Common
 *    Events explaining the new feature update.
 * * Feature Update!
 * ** Attached pictures are no longer affected by Picture Common Event click
 *    triggers in order to reduce lag. Update made by Arisu.
 * 
 * Version 1.00 Official Release Date: December 10, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageAddPicture
 * @text Message: Attach Picture(s)
 * @desc Select which Picture ID's to attach to the Message Window.
 *
 * @arg PictureID:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc Select which Picture ID's to attach to the Message Window.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageRemovePicture
 * @text Message: Remove Picture(s)
 * @desc Select which Picture ID's to remove from the Message Window.
 *
 * @arg PictureID:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc Select which Picture ID's to remove from the Message Window.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureAddPicture
 * @text Picture: Attach Picture(s)
 * @desc Select which Picture ID's to attach to another picture.
 *
 * @arg PictureID:arraynum
 * @text Attach Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc Select which Picture ID's to attach to another picture.
 * @default ["1"]
 *
 * @arg TargetID:num
 * @text Target Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to attach the above picture(s) to.
 * @default 2
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRemovePicture
 * @text Picture: Remove Picture(s)
 * @desc Select which Picture ID's to remove from any other pictures.
 *
 * @arg PictureID:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc Select which Picture ID's to remove from any other pictures.
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
 * @param AttachedPictures
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param MsgWindow
 * @text Message Window
 *
 * @param PictureIDs:arraynum
 * @text Default Attached ID(s)
 * @parent MsgWindow
 * @type number[]
 * @min 1
 * @max 100
 * @desc Select which Picture ID's to default to being attached
 * to Message Window. Can be updated with Plugin Commands.
 * @default ["61","62","63","64","65","66","67","68","69","70"]
 *
 * @param ContainerPosition:num
 * @text Container Position
 * @parent MsgWindow
 * @type select
 * @option 0 - Behind Window Skin
 * @value 0
 * @option 1 - In Front of Window Skin
 * @value 1
 * @option 2 - In Front of Window Text
 * @value 2
 * @desc Select the position of the picture container.
 * Pictures will still appear behind supplemental windows.
 * @default 1
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
//=============================================================================

const _0x301953=_0x50a1;(function(_0x4a97d0,_0x2c6646){const _0x10fd6a=_0x50a1,_0x1b71b5=_0x4a97d0();while(!![]){try{const _0x234f03=-parseInt(_0x10fd6a(0xd8))/0x1*(parseInt(_0x10fd6a(0xe7))/0x2)+-parseInt(_0x10fd6a(0xd1))/0x3+parseInt(_0x10fd6a(0xa1))/0x4*(-parseInt(_0x10fd6a(0xfb))/0x5)+parseInt(_0x10fd6a(0xd2))/0x6+-parseInt(_0x10fd6a(0xce))/0x7+-parseInt(_0x10fd6a(0xd3))/0x8+parseInt(_0x10fd6a(0x105))/0x9;if(_0x234f03===_0x2c6646)break;else _0x1b71b5['push'](_0x1b71b5['shift']());}catch(_0x903f65){_0x1b71b5['push'](_0x1b71b5['shift']());}}}(_0x22c1,0x4ce79));function _0x50a1(_0x45f0fb,_0xe373e8){const _0x22c1dc=_0x22c1();return _0x50a1=function(_0x50a1bb,_0x29f98d){_0x50a1bb=_0x50a1bb-0x9f;let _0x4bf86a=_0x22c1dc[_0x50a1bb];return _0x4bf86a;},_0x50a1(_0x45f0fb,_0xe373e8);}var label=_0x301953(0x108),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x301953(0xfa)](function(_0x35ec04){const _0x4c95dc=_0x301953;return _0x35ec04[_0x4c95dc(0xdf)]&&_0x35ec04[_0x4c95dc(0xf5)][_0x4c95dc(0xa9)]('['+label+']');})[0x0];VisuMZ[label][_0x301953(0x106)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x301953(0xb9)]=function(_0x2ebd28,_0x465688){const _0x2dac83=_0x301953;for(const _0x2911b6 in _0x465688){if(_0x2911b6[_0x2dac83(0xb7)](/(.*):(.*)/i)){const _0x157d55=String(RegExp['$1']),_0x30eafb=String(RegExp['$2'])[_0x2dac83(0xb0)]()[_0x2dac83(0xfd)]();let _0x20cd26,_0x55ce6c,_0xa05ccb;switch(_0x30eafb){case _0x2dac83(0x10b):_0x20cd26=_0x465688[_0x2911b6]!==''?Number(_0x465688[_0x2911b6]):0x0;break;case _0x2dac83(0xf8):_0x55ce6c=_0x465688[_0x2911b6]!==''?JSON[_0x2dac83(0xc1)](_0x465688[_0x2911b6]):[],_0x20cd26=_0x55ce6c[_0x2dac83(0xa5)](_0x489240=>Number(_0x489240));break;case _0x2dac83(0x9f):_0x20cd26=_0x465688[_0x2911b6]!==''?eval(_0x465688[_0x2911b6]):null;break;case _0x2dac83(0xca):_0x55ce6c=_0x465688[_0x2911b6]!==''?JSON[_0x2dac83(0xc1)](_0x465688[_0x2911b6]):[],_0x20cd26=_0x55ce6c[_0x2dac83(0xa5)](_0x2bd793=>eval(_0x2bd793));break;case'JSON':_0x20cd26=_0x465688[_0x2911b6]!==''?JSON[_0x2dac83(0xc1)](_0x465688[_0x2911b6]):'';break;case _0x2dac83(0xeb):_0x55ce6c=_0x465688[_0x2911b6]!==''?JSON[_0x2dac83(0xc1)](_0x465688[_0x2911b6]):[],_0x20cd26=_0x55ce6c['map'](_0x12351a=>JSON['parse'](_0x12351a));break;case _0x2dac83(0xc7):_0x20cd26=_0x465688[_0x2911b6]!==''?new Function(JSON[_0x2dac83(0xc1)](_0x465688[_0x2911b6])):new Function(_0x2dac83(0xf9));break;case _0x2dac83(0xbe):_0x55ce6c=_0x465688[_0x2911b6]!==''?JSON[_0x2dac83(0xc1)](_0x465688[_0x2911b6]):[],_0x20cd26=_0x55ce6c[_0x2dac83(0xa5)](_0x44381e=>new Function(JSON[_0x2dac83(0xc1)](_0x44381e)));break;case _0x2dac83(0x109):_0x20cd26=_0x465688[_0x2911b6]!==''?String(_0x465688[_0x2911b6]):'';break;case _0x2dac83(0xbc):_0x55ce6c=_0x465688[_0x2911b6]!==''?JSON[_0x2dac83(0xc1)](_0x465688[_0x2911b6]):[],_0x20cd26=_0x55ce6c[_0x2dac83(0xa5)](_0x4a297a=>String(_0x4a297a));break;case _0x2dac83(0xa2):_0xa05ccb=_0x465688[_0x2911b6]!==''?JSON['parse'](_0x465688[_0x2911b6]):{},_0x20cd26=VisuMZ[_0x2dac83(0xb9)]({},_0xa05ccb);break;case'ARRAYSTRUCT':_0x55ce6c=_0x465688[_0x2911b6]!==''?JSON['parse'](_0x465688[_0x2911b6]):[],_0x20cd26=_0x55ce6c[_0x2dac83(0xa5)](_0x2c5add=>VisuMZ[_0x2dac83(0xb9)]({},JSON[_0x2dac83(0xc1)](_0x2c5add)));break;default:continue;}_0x2ebd28[_0x157d55]=_0x20cd26;}}return _0x2ebd28;},(_0xf561a0=>{const _0x54f596=_0x301953,_0x38c232=_0xf561a0[_0x54f596(0xe6)];for(const _0x29e49b of dependencies){if(_0x54f596(0x101)!=='ImPBs')_0x55950b[_0x54f596(0xae)](_0x1369df);else{if(!Imported[_0x29e49b]){alert(_0x54f596(0xf0)[_0x54f596(0xcc)](_0x38c232,_0x29e49b)),SceneManager['exit']();break;}}}const _0x167780=_0xf561a0[_0x54f596(0xf5)];if(_0x167780[_0x54f596(0xb7)](/\[Version[ ](.*?)\]/i)){const _0x4d92c8=Number(RegExp['$1']);_0x4d92c8!==VisuMZ[label]['version']&&(alert(_0x54f596(0xc4)[_0x54f596(0xcc)](_0x38c232,_0x4d92c8)),SceneManager['exit']());}if(_0x167780['match'](/\[Tier[ ](\d+)\]/i)){const _0x17b93a=Number(RegExp['$1']);_0x17b93a<tier?_0x54f596(0xb3)===_0x54f596(0xb3)?(alert(_0x54f596(0xba)[_0x54f596(0xcc)](_0x38c232,_0x17b93a,tier)),SceneManager[_0x54f596(0x103)]()):(_0x94058b[_0x54f596(0x108)][_0x54f596(0xb6)]['call'](this,_0x54ae56),this[_0x54f596(0x100)]()):tier=Math[_0x54f596(0xb5)](_0x17b93a,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0xf561a0[_0x54f596(0xdc)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x301953(0xe6)],_0x301953(0xe5),_0x375915=>{const _0x43f0a9=_0x301953;VisuMZ[_0x43f0a9(0xb9)](_0x375915,_0x375915);const _0x3375e1=_0x375915[_0x43f0a9(0xa6)];for(const _0x47dc06 of _0x3375e1){$gameSystem[_0x43f0a9(0xa8)](_0x47dc06);}}),PluginManager['registerCommand'](pluginData[_0x301953(0xe6)],'MessageRemovePicture',_0x50af82=>{const _0x3f3370=_0x301953;VisuMZ[_0x3f3370(0xb9)](_0x50af82,_0x50af82);const _0x16d7c2=_0x50af82[_0x3f3370(0xa6)];for(const _0x301380 of _0x16d7c2){_0x3f3370(0xab)!=='aCSQj'?$gameSystem['removeAttachedMessagePictureID'](_0x301380):_0x4c7bfc[_0x3f3370(0xff)][_0x3f3370(0xe0)][_0x3f3370(0xe9)](this);}}),PluginManager[_0x301953(0xcd)](pluginData[_0x301953(0xe6)],_0x301953(0xda),_0x1215e0=>{const _0x7377ac=_0x301953;VisuMZ['ConvertParams'](_0x1215e0,_0x1215e0);const _0x34092c=_0x1215e0[_0x7377ac(0xa6)],_0x2761f7=_0x1215e0[_0x7377ac(0xad)][_0x7377ac(0xef)](0x1,0x64);for(const _0x23e886 of _0x34092c){$gameSystem['addAttachedBasePictureID'](_0x23e886,_0x2761f7);}}),PluginManager['registerCommand'](pluginData['name'],_0x301953(0xe3),_0x402971=>{const _0x1ff839=_0x301953;VisuMZ['ConvertParams'](_0x402971,_0x402971);const _0x8e6646=_0x402971[_0x1ff839(0xa6)];for(const _0x4a948c of _0x8e6646){'IhqTH'!=='IhqTH'?(this['_attachedMessagePictures']===_0x5f0532&&this[_0x1ff839(0xdd)](),this[_0x1ff839(0xd7)][_0x1ff839(0xa9)](_0x2973fc)&&this[_0x1ff839(0xd7)][_0x1ff839(0xee)](_0xbf8592)):$gameSystem[_0x1ff839(0xcf)](_0x4a948c);}}),VisuMZ[_0x301953(0x108)]['Game_System_initialize']=Game_System[_0x301953(0xff)][_0x301953(0xfc)],Game_System[_0x301953(0xff)]['initialize']=function(){const _0x3c0315=_0x301953;VisuMZ[_0x3c0315(0x108)][_0x3c0315(0xbd)][_0x3c0315(0xe9)](this),this[_0x3c0315(0xdd)]();},Game_System[_0x301953(0xff)][_0x301953(0xdd)]=function(){const _0x53fef2=_0x301953;this[_0x53fef2(0xd5)]=[],this[_0x53fef2(0xb1)]={},this[_0x53fef2(0xd7)]=Window_Message['DEFAULT_MESSAGE_PICTURE_IDS']['clone']();},Game_System[_0x301953(0xff)][_0x301953(0xc6)]=function(_0x315258){const _0x445ec8=_0x301953;return this[_0x445ec8(0x10c)](_0x315258)||this[_0x445ec8(0xa7)](_0x315258);},Game_System[_0x301953(0xff)][_0x301953(0x104)]=function(){const _0xf1fa8d=_0x301953;return this[_0xf1fa8d(0xd5)]===undefined&&this[_0xf1fa8d(0xdd)](),this[_0xf1fa8d(0xd5)];},Game_System[_0x301953(0xff)][_0x301953(0x10c)]=function(_0x99c62b){const _0x2d3820=_0x301953;return this[_0x2d3820(0xd5)]===undefined&&this['initAttachedPictures'](),this['_attachedBasePictures'][_0x2d3820(0xa9)](_0x99c62b);},Game_System[_0x301953(0xff)]['getAttachedBasePictureTarget']=function(_0x310fd8){const _0x2ced74=_0x301953;return this[_0x2ced74(0xb1)]===undefined&&this['initAttachedPictures'](),this['_attachedBasePictureTargets'][_0x310fd8];},Game_System[_0x301953(0xff)][_0x301953(0xf7)]=function(_0x4f80bc,_0x149a49){const _0x2e6b93=_0x301953;this[_0x2e6b93(0xd5)]===undefined&&(_0x2e6b93(0xbf)==='wHDaQ'?_0x3eeb56[_0x2e6b93(0xf7)](_0x56c4bc,_0x1fdc9f):this['initAttachedPictures']()),!this[_0x2e6b93(0xd5)][_0x2e6b93(0xa9)](_0x4f80bc)&&(this[_0x2e6b93(0xd5)][_0x2e6b93(0xf1)](_0x4f80bc),this[_0x2e6b93(0xb1)][_0x4f80bc]=_0x149a49),this[_0x2e6b93(0xae)](_0x4f80bc);},Game_System[_0x301953(0xff)][_0x301953(0xcf)]=function(_0x2819ca){const _0xa94268=_0x301953;this[_0xa94268(0xd5)]===undefined&&this['initAttachedPictures'](),this[_0xa94268(0xd5)][_0xa94268(0xa9)](_0x2819ca)&&(_0xa94268(0xac)===_0xa94268(0xac)?(this[_0xa94268(0xd5)]['remove'](_0x2819ca),delete this['_attachedBasePictureTargets'][_0x2819ca]):this[_0xa94268(0xaf)]());},Game_System[_0x301953(0xff)][_0x301953(0xe2)]=function(){const _0x91ec57=_0x301953;return this['_attachedMessagePictures']===undefined&&(_0x91ec57(0xea)!==_0x91ec57(0xea)?(_0x106f2e(_0x91ec57(0xba)[_0x91ec57(0xcc)](_0x4a8f15,_0x2932fd,_0x1044da)),_0x11745c['exit']()):this[_0x91ec57(0xdd)]()),this[_0x91ec57(0xd7)];},Game_System[_0x301953(0xff)][_0x301953(0xa7)]=function(_0x689b13){const _0x2d8293=_0x301953;return this[_0x2d8293(0xd7)]===undefined&&this[_0x2d8293(0xdd)](),this['_attachedMessagePictures']['includes'](_0x689b13);},Game_System[_0x301953(0xff)]['addAttachedMessagePictureID']=function(_0x46ced8){const _0x54a009=_0x301953;this[_0x54a009(0xd7)]===undefined&&this[_0x54a009(0xdd)](),!this['_attachedMessagePictures'][_0x54a009(0xa9)](_0x46ced8)&&this[_0x54a009(0xd7)][_0x54a009(0xf1)](_0x46ced8),this[_0x54a009(0xcf)](_0x46ced8);},Game_System[_0x301953(0xff)]['removeAttachedMessagePictureID']=function(_0x27d27a){const _0x471174=_0x301953;if(this[_0x471174(0xd7)]===undefined){if(_0x471174(0xdb)!==_0x471174(0xdb))return this[_0x471174(0xd5)]===_0x4b7c30&&this[_0x471174(0xdd)](),this[_0x471174(0xd5)][_0x471174(0xa9)](_0x3e822b);else this[_0x471174(0xdd)]();}this[_0x471174(0xd7)]['includes'](_0x27d27a)&&this[_0x471174(0xd7)][_0x471174(0xee)](_0x27d27a);},VisuMZ[_0x301953(0x108)]['Sprite_Picture_initialize']=Sprite_Picture[_0x301953(0xff)][_0x301953(0xfc)],Sprite_Picture[_0x301953(0xff)][_0x301953(0xfc)]=function(_0x541eab){const _0xef08ff=_0x301953;VisuMZ[_0xef08ff(0x108)][_0xef08ff(0xb6)][_0xef08ff(0xe9)](this,_0x541eab),this['createAttachedPictures']();},Sprite_Picture[_0x301953(0xff)][_0x301953(0x100)]=function(){const _0x4f5023=_0x301953;if(this[_0x4f5023(0x10a)]!==Sprite_Picture)return;this[_0x4f5023(0xf2)]=new Sprite(),this[_0x4f5023(0xd9)](this[_0x4f5023(0xf2)]);for(let _0x52b587=0x1;_0x52b587<=0x64;_0x52b587++){this[_0x4f5023(0xf2)][_0x4f5023(0xd9)](new Sprite_AttachPicture(_0x52b587,this[_0x4f5023(0xe4)]));}},VisuMZ[_0x301953(0x108)]['Sprite_Picture_updateBitmap']=Sprite_Picture['prototype'][_0x301953(0xe0)],Sprite_Picture[_0x301953(0xff)]['updateBitmap']=function(){const _0x16ba4d=_0x301953;this[_0x16ba4d(0x10a)]===Sprite_Picture&&$gameSystem[_0x16ba4d(0xc6)](this[_0x16ba4d(0xe4)])?this['hideAttachedPicture']():VisuMZ['AttachedPictures'][_0x16ba4d(0xb8)][_0x16ba4d(0xe9)](this);},Sprite_Picture['prototype']['hideAttachedPicture']=function(){const _0x4e5729=_0x301953;this[_0x4e5729(0xed)]=![],this[_0x4e5729(0xaa)]='';};function Sprite_AttachPicture(){this['initialize'](...arguments);}Sprite_AttachPicture[_0x301953(0xff)]=Object[_0x301953(0xec)](Sprite_Picture[_0x301953(0xff)]),Sprite_AttachPicture[_0x301953(0xff)][_0x301953(0x10a)]=Sprite_AttachPicture,Sprite_AttachPicture[_0x301953(0xff)][_0x301953(0xfc)]=function(_0x17dfd1,_0xbb7723){const _0x2654e2=_0x301953;this[_0x2654e2(0xb4)]=_0xbb7723,Sprite_Picture[_0x2654e2(0xff)][_0x2654e2(0xfc)]['call'](this,_0x17dfd1);},Sprite_AttachPicture[_0x301953(0xff)][_0x301953(0xe0)]=function(){const _0x5646eb=_0x301953;this[_0x5646eb(0xc8)]()?Sprite_Picture[_0x5646eb(0xff)][_0x5646eb(0xe0)]['call'](this):this['hideAttachedPicture']();},Sprite_AttachPicture[_0x301953(0xff)][_0x301953(0xc8)]=function(){const _0x1baee4=_0x301953;return $gameSystem[_0x1baee4(0x10c)](this[_0x1baee4(0xe4)])&&$gameSystem[_0x1baee4(0xcb)](this[_0x1baee4(0xb4)])===this[_0x1baee4(0xc9)];},Sprite_AttachPicture['prototype']['isClickEnabled']=function(){return![];},Sprite_AttachPicture[_0x301953(0xff)][_0x301953(0xc0)]=function(){return![];},Sprite_AttachPicture['prototype']['onMouseEnter']=function(){},Sprite_AttachPicture[_0x301953(0xff)][_0x301953(0xe1)]=function(){},Sprite_AttachPicture[_0x301953(0xff)][_0x301953(0xd4)]=function(){},Sprite_AttachPicture[_0x301953(0xff)][_0x301953(0xd6)]=function(){};function _0x22c1(){const _0x1da1a6=['trim','PictureIDs','prototype','createAttachedPictures','ImPBs','WMEFv','exit','getAttachedBasePictures','13981158FwyuSx','Settings','updateMessagePictureContainerVisibility','AttachedPictures','STR','constructor','NUM','isAttachedBasePicture','DEFAULT_MESSAGE_PICTURE_IDS','EVAL','ContainerPosition','20EHmwTy','STRUCT','OXpPZ','indexOf','map','PictureID','isAttachedMessagePicture','addAttachedMessagePictureID','includes','_pictureName','oaugT','VOulR','TargetID','removeAttachedMessagePictureID','hideAttachedPicture','toUpperCase','_attachedBasePictureTargets','Window_Message_initialize','WAmGn','_parentID','max','Sprite_Picture_initialize','match','Sprite_Picture_updateBitmap','ConvertParams','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','onMouseEnter','ARRAYSTR','Game_System_initialize','ARRAYFUNC','QJcnn','isBeingTouched','parse','addChildAt','OpiJU','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Window_Message_update','isPictureAttached','FUNC','isUsingAttachedPicture','_pictureID','ARRAYEVAL','getAttachedBasePictureTarget','format','registerCommand','1800757pnWIOh','removeAttachedBasePictureID','children','616518WxkcvE','897552doLgXr','4423400YSzWEh','onPress','_attachedBasePictures','onClick','_attachedMessagePictures','137lxJjUz','addChild','PictureAddPicture','bmJBN','parameters','initAttachedPictures','_container','status','updateBitmap','onMouseExit','getAttachedMessagePictures','PictureRemovePicture','_pictureId','MessageAddPicture','name','3486nyzkPP','createMessagePictureContainer','call','ncZCu','ARRAYJSON','create','visible','remove','clamp','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','push','_pictureContainer','MESSAGE_PICTURE_CONTAINER_LOCATION','update','description','isClickEnabled','addAttachedBasePictureID','ARRAYNUM','return\x200','filter','133580ZgRVbM','initialize'];_0x22c1=function(){return _0x1da1a6;};return _0x22c1();}function Sprite_MessagePicture(){const _0x2e3f59=_0x301953;this[_0x2e3f59(0xfc)](...arguments);}Sprite_MessagePicture[_0x301953(0xff)]=Object['create'](Sprite_Picture[_0x301953(0xff)]),Sprite_MessagePicture[_0x301953(0xff)]['constructor']=Sprite_MessagePicture,Sprite_MessagePicture['prototype'][_0x301953(0xe0)]=function(){const _0x28a515=_0x301953;!$gameSystem['isAttachedMessagePicture'](this[_0x28a515(0xe4)])?_0x28a515(0xa3)==='xSDVP'?this[_0x28a515(0xdd)]():this['hideAttachedPicture']():_0x28a515(0xc3)===_0x28a515(0x102)?(this[_0x28a515(0xd5)][_0x28a515(0xee)](_0x502575),delete this['_attachedBasePictureTargets'][_0x10ca8f]):Sprite_Picture['prototype'][_0x28a515(0xe0)][_0x28a515(0xe9)](this);},Sprite_MessagePicture['prototype'][_0x301953(0xf6)]=function(){return![];},Sprite_MessagePicture[_0x301953(0xff)]['isBeingTouched']=function(){return![];},Sprite_MessagePicture[_0x301953(0xff)][_0x301953(0xbb)]=function(){},Sprite_MessagePicture['prototype'][_0x301953(0xe1)]=function(){},Sprite_MessagePicture[_0x301953(0xff)][_0x301953(0xd4)]=function(){},Sprite_MessagePicture[_0x301953(0xff)][_0x301953(0xd6)]=function(){},Window_Message[_0x301953(0x10d)]=VisuMZ[_0x301953(0x108)][_0x301953(0x106)][_0x301953(0xfe)],Window_Message[_0x301953(0xf3)]=VisuMZ[_0x301953(0x108)]['Settings'][_0x301953(0xa0)],VisuMZ[_0x301953(0x108)][_0x301953(0xb2)]=Window_Message['prototype'][_0x301953(0xfc)],Window_Message['prototype'][_0x301953(0xfc)]=function(_0x4e28ff){const _0x45a138=_0x301953;VisuMZ[_0x45a138(0x108)][_0x45a138(0xb2)][_0x45a138(0xe9)](this,_0x4e28ff),this[_0x45a138(0xe8)]();},Window_Message[_0x301953(0xff)][_0x301953(0xe8)]=function(){const _0x4f1498=_0x301953;this[_0x4f1498(0xf2)]=new Sprite();switch(Window_Message[_0x4f1498(0xf3)]){case 0x0:const _0x34f9b3=this[_0x4f1498(0xd0)][_0x4f1498(0xa4)](this[_0x4f1498(0xde)]);this[_0x4f1498(0xc2)](this['_pictureContainer'],_0x34f9b3);break;case 0x1:this['addChildToBack'](this[_0x4f1498(0xf2)]);break;default:this[_0x4f1498(0xd9)](this[_0x4f1498(0xf2)]);break;}for(let _0x40717d=0x1;_0x40717d<=0x64;_0x40717d++){this[_0x4f1498(0xf2)]['addChild'](new Sprite_MessagePicture(_0x40717d));}},VisuMZ[_0x301953(0x108)][_0x301953(0xc5)]=Window_Message[_0x301953(0xff)][_0x301953(0xf4)],Window_Message[_0x301953(0xff)]['update']=function(){const _0x156fbe=_0x301953;VisuMZ[_0x156fbe(0x108)]['Window_Message_update'][_0x156fbe(0xe9)](this),this[_0x156fbe(0x107)]();},Window_Message['prototype'][_0x301953(0x107)]=function(){const _0x549daf=_0x301953;if(!this[_0x549daf(0xf2)])return;this[_0x549daf(0xf2)][_0x549daf(0xed)]=this['openness']>=0xff;};
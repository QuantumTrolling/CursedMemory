//=============================================================================
// VisuStella MZ - Weakness Popups
// VisuMZ_4_WeaknessPopups.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_WeaknessPopups = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaknessPopups = VisuMZ.WeaknessPopups || {};
VisuMZ.WeaknessPopups.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.06] [WeaknessPopups]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weakness_Popups_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * When striking enemies with elemental attacks, it's difficult for the player
 * to know at first glance if he or she has hit a weakness or resistance,
 * especially if they are unfamiliar with how much damage the enemy should take
 * normally. This plugin creates popups that appear upon being hit at various
 * elemental rates, from 200% to 101% for Weaknesses, 99% to 1% for resistance,
 * 0% for immunity, and under that for absorption.
 * 
 * Critical hits also gain an extra popup effect to indicate landing a critical
 * hit in case they've missed the extra flash that comes with one by default.
 * This plugin helps relay information to the player in a more visible form.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create popups that appear in battle whenever battlers take elemental
 *   damage that results in weaknesses, resistances, immunities, or absorption.
 * * Critical hits will also generate popups.
 * * Popups can use images or generate bitmap text on the spot.
 * * Move the popups through various means like scaling and acceleration.
 * * Elemental rates can generate different popups depending on the rate.
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
 * If you decide to use front view with the VisuStella MZ Battle Core, Weakness
 * Popups will show up for actors above the Battle Status Window. Normally,
 * they would not appear in front view without the Battle Core because normal
 * damage popups don't appear there either.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Popup Settings
 * ============================================================================
 *
 * Popups are created from a similar template. These are used for Critical Hits
 * and Elemental Rates. The Critical Hit popups will only appear once critical
 * hits are applied in battle. Elemental Rate popups will only appear once
 * certain damage thresholds are met through the element rate calculations.
 *
 * ---
 *
 * General
 * 
 *   Enabled:
 *   - Is this popup enabled?
 *
 * ---
 *
 * Custom Image
 * 
 *   Filename:
 *   - Select an image from img/system/ to use as a custom image popup.
 *   - If you use this, ignore the Render settings.
 *
 * ---
 *
 * Render
 * 
 *   Text:
 *   - Type in the text you want displayed for the popup.
 * 
 *   Bitmap Width:
 *   Bitmap Height:
 *   - What is the maximum width/height of this popup?
 * 
 *   Font Name:
 *   - What font do you wish to use for this popup?
 * 
 *   Font Size:
 *   - What's the font size to use for the popup text?
 * 
 *   Bold?:
 *   Italic?
 *   - Do you wish to make the text bold/italic?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Outline Size:
 *   - What size do you want to use for the outline?
 * 
 *   Outline Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Offset
 * 
 *   Offset: X:
 *   Offset: Y:
 *   - How much do you wish to offset the X/Y position by?
 * 
 *   Variance:
 *   - How much variance should be given to offset X?
 *
 * ---
 *
 * Scale
 * 
 *   Duration:
 *   - How many frames should it take the scaling to reach the target scale?
 * 
 *   Starting Scale: X:
 *   Starting Scale: Y:
 *   - What scale X/Y value should the popup start at?
 * 
 *   Target Scale: X:
 *   Target Scale: Y:
 *   - What scale X/Y value should the popup end at?
 *
 * ---
 *
 * Acceleration
 * 
 *   Starting Speed: X:
 *   Starting Speed: Y:
 *   - How much should the starting X/Y speed of the popup be?
 * 
 *   Delta Speed: X:
 *   Delta Speed: Y:
 *   - How much should the growing X/Y speed of the popup be?
 *
 * ---
 *
 * Fading
 * 
 *   Opaque Duration:
 *   - How many frames should the popup stay opaque?
 * 
 *   Fade Duration:
 *   - After the opaque duration wears off, how many frames will it take for
 *     the popup to vanish?
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
 * Version 1.06: October 27, 2022
 * * Bug Fixes!
 * ** Fixed a bug where "HP Drain" damage type would not proc weakness popups.
 *    Fix made by Olivia.
 * 
 * Version 1.05: December 30, 2021
 * * Bug Fixes!
 * ** Corrected a bug that caused 0 damage/healing when this plugin is on.
 *    Fix made by Olivia.
 * 
 * Version 1.04: December 23, 2021
 * * Compatibility Update!
 * ** Weakness Popups now ignore the notetags involving caster element damage
 *    when calculating the type of popup to display. Update made by Olivia.
 * 
 * Version 1.03: June 4, 2021
 * * Compatibility Update!
 * ** Added automatic offset for those using UI Areas and Widths with different
 *    values from their screen resolutions once the Action Sequence Camera
 *    plugin is enabled. Update made by Irina.
 * 
 * Version 1.02: March 5, 2021
 * * Bug Fixes!
 * ** Weakness Popups for front view actors will no longer appear at the top
 *    of the screen. Fix made by Irina.
 * ** Weakness Popups will no longer shift positions prior to an actor's status
 *    window positioning anchor. Fix made by Irina.
 * * Documentation Update!
 * ** Added "Extra Features" section for more clarity on what having the Battle
 *    Core enables for Front View games.
 * 
 * Version 1.01: January 1, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** Plugin Parameters for the Popup Settings now have a Variance factor for
 *    Offset X and Offset Y. Added by Yanfly.
 *
 * Version 1.00: November 27, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param WeaknessPopups
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Critical
 *
 * @param Critical:struct
 * @text Critical Popup Settings
 * @parent Critical
 * @type struct<Popup>
 * @desc Settings for the Critical Popup!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"CRITICAL!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ec008c","outlineSize:num":"5","outlineColor:str":"rgba(255, 255, 255, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"-25","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 * 
 * @param Element
 * @text Element Rates
 *
 * @param Element200:struct
 * @text Rate >= 200%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 200%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element175:struct
 * @text Rate >= 175%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 150%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"46","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element150:struct
 * @text Rate >= 150%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 150%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"44","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element125:struct
 * @text Rate >= 125%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 125%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"42","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element110:struct
 * @text Rate >= 110%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 110%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"40","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element105:struct
 * @text Rate >= 105%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 105%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"38","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element101:struct
 * @text Rate >= 101%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 105%!
 * @default {"General":"","enabled:eval":"false","Image":"","filename:str":"","Render":"","text:str":"DISABLED","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"2","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element99:struct
 * @text Rate <= 99%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 95%!
 * @default {"General":"","enabled:eval":"false","Image":"","filename:str":"","Render":"","text:str":"DISABLED","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"2","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element95:struct
 * @text Rate <= 95%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 95%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"38","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element90:struct
 * @text Rate <= 90%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 90%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"40","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element75:struct
 * @text Rate <= 75%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 75%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"42","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element50:struct
 * @text Rate <= 50%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 50%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"44","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element25:struct
 * @text Rate <= 25%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 25%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"46","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element0:struct
 * @text Rate = 0%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is exactly 0%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"IMMUNE!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#6dcff6","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param ElementNegative:struct
 * @text Rate < 0%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is under 0%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"ABSORB!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#bd8cbf","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
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
 * Popup Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Popup:
 *
 * @param General
 *
 * @param enabled:eval
 * @text Enabled
 * @parent General
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Is this popup enabled?
 * @default true
 *
 * @param Image
 * @text Custom Image
 *
 * @param filename:str
 * @text Filename
 * @parent Image
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Select an image from img/system/ to use as a custom image
 * popup. If you use this, ignore the Render settings.
 * @default 
 *
 * @param Render
 *
 * @param text:str
 * @text Text
 * @parent Render
 * @desc Type in the text you want displayed for the popup.
 * @default Text!
 *
 * @param bitmapWidth:num
 * @text Bitmap Width
 * @parent Render
 * @type number
 * @min 1
 * @desc What is the maximum width of this popup?
 * @default 600
 *
 * @param bitmapHeight:num
 * @text Bitmap Height
 * @parent Render
 * @type number
 * @min 1
 * @desc What is the maximum height of this popup?
 * @default 200
 *
 * @param fontFace:str
 * @text Font Name
 * @parent Render
 * @desc What font do you wish to use for this popup?
 * @default Impact
 *
 * @param fontSize:num
 * @text Font Size
 * @parent fontFace:str
 * @type number
 * @min 1
 * @desc What's the font size to use for the popup text?
 * @default 48
 *
 * @param fontBold:eval
 * @text Bold?
 * @parent fontFace:str
 * @type boolean
 * @on Bold
 * @off Normal
 * @desc Do you wish to make the text bold?
 * @default true
 *
 * @param fontItalic:eval
 * @text Italic?
 * @parent fontFace:str
 * @type boolean
 * @on Italic
 * @off Normal
 * @desc Do you wish to make the text italic?
 * @default false
 *
 * @param textColor:str
 * @text Text Color
 * @parent Render
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param outlineSize:num
 * @text Outline Size
 * @parent Render
 * @type number
 * @min 0
 * @desc What size do you want to use for the outline?
 * @default 5
 *
 * @param outlineColor:str
 * @text Outline Color
 * @parent outlineSize:num
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1)
 *
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset: X
 * @parent Offset
 * @desc How much do you wish to offset the X position by?
 * @default 0
 *
 * @param offsetXvariance:num
 * @text Variance
 * @type number
 * @parent offsetX:num
 * @desc How much variance should be given to offset X?
 * @default 0
 *
 * @param offsetY:num
 * @text Offset: Y
 * @parent Offset
 * @desc How much do you wish to offset the Y position by?
 * @default 0
 *
 * @param offsetYvariance:num
 * @text Variance
 * @type number
 * @parent offsetY:num
 * @desc How much variance should be given to offset Y?
 * @default 0
 *
 * @param Scale
 *
 * @param scaleDuration:num
 * @text Duration
 * @parent Scale
 * @type number
 * @min 1
 * @desc How many frames should it take the scaling to reach the target scale?
 * @default 20
 *
 * @param startScaleX:num
 * @text Starting Scale: X
 * @parent Scale
 * @desc What scale X value should the popup start at?
 * @default 2.0
 *
 * @param startScaleY:num
 * @text Starting Scale: Y
 * @parent Scale
 * @desc What scale Y value should the popup start at?
 * @default 2.0
 *
 * @param targetScaleX:num
 * @text Target Scale: X
 * @parent Scale
 * @desc What scale X value should the popup end at?
 * @default 1.0
 *
 * @param targetScaleY:num
 * @text Target Scale: Y
 * @parent Scale
 * @desc What scale Y value should the popup end at?
 * @default 1.0
 *
 * @param Acceleration
 *
 * @param startSpeedX:num
 * @text Starting Speed: X
 * @parent Acceleration
 * @desc How much should the starting X speed of the popup be?
 * Negative: Left, Positive: Right
 * @default 0
 *
 * @param startSpeedY:num
 * @text Starting Speed: Y
 * @parent Acceleration
 * @desc How much should the starting Y speed of the popup be?
 * Negative: Up, Positive: Down
 * @default 0
 *
 * @param deltaSpeedX:num
 * @text Delta Speed: X
 * @parent Acceleration
 * @desc How much should the growing X speed of the popup be?
 * Negative: Left, Positive: Right
 * @default -0.10
 *
 * @param deltaSpeedY:num
 * @text Delta Speed: Y
 * @parent Acceleration
 * @desc How much should the growing Y speed of the popup be?
 * Negative: Up, Positive: Down
 * @default 0
 *
 * @param Fading
 *
 * @param opaqueDuration:num
 * @text Opaque Duration
 * @parent Fading
 * @type number
 * @min 1
 * @desc How many frames should the popup stay opaque?
 * @default 40
 *
 * @param fadeDuration:num
 * @text Fade Duration
 * @parent Fading
 * @type number
 * @min 1
 * @desc After the opaque duration wears off, how many frames will
 * it take for the popup to vanish?
 * @default 20
 *
 */
//=============================================================================

function _0x3b88(){const _0x55c40f=['VisuMZ_3_ActSeqCamera','_battleField','center','dHdHF','initialize','calcUserElementDamageRate','_scene','ConvertParams','fontItalic','ncSHg','Game_Action_calcUserElementDamagePlus','_baseY','_opaqueDuration','_battler','prototype','calcUserElementDamageFlat','STRUCT','1784761LBDNub','ElementNegative','createBitmapImage','updateWeaknessPopupsContainer','calcElementRate','Element150','_distortionSprite','loadWeaknessPopupBitmap','exit','WeaknessPopups','Spriteset_Battle_adjustFlippedBattlefield','fontBold','ceil','Element105','isActor','Game_Action_calcUserElementDamageFlat','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','startScaleX','parameters','destroy','_statusWindow','map','Element101','_data','JSON','startScaleY','randomInt','fontFace','2042070zWguRq','offsetYvariance','opacity','version','createBitmap','_speedX','max','parent','oixPw','createWeaknessPopupsForElementRate','getWeaknessPopupData','isDamage','bitmapWidth','none','startSpeedY','mEnEz','#%1','_spriteset','Spriteset_Battle_update','DefaultPopupSettings','executeDamage','boxWidth','match','_baseX','targetScaleX','36pEBdaH','scaleDuration','initMembers','bypassUserElementBonus','EVAL','_scaleDuration','fontSize','offsetXvariance','outlineColor','extraPositionY','_targetScaleY','BattleCore','toUpperCase','format','Element99','ARRAYJSON','offsetY','Sqjjj','deltaSpeedY','updatePosition','call','Settings','parse','scale','createWeaknessPopupType','_fadeDuration','initPosition','calcUserElementDamagePlus','result','18jlEpgF','308808vQbzUO','eRHir','centerFrontViewSprite','jLQZW','ARRAYNUM','_damageContainer','Element95','_weaknessPopupsContainer','outlineSize','jYlog','Element0','enabled','create','YSWaG','Element25','bWqIf','bitmapHeight','trim','status','anchor','517021tNJaWO','return\x200','text','height','ARRAYSTRUCT','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Element175','offsetX','bitmap','description','Element200','#ffffff','createWeaknessPopupsContainer','3203627KZAuyF','addChild','createBattleField','Element125','Game_Action_calcUserElementDamageRate','TyVva','name','_weaknessPopupContainer','bhJXK','loadSystem','111852AataIv','startSpeedX','BzrdW','createWeaknessPopups','getWeaknessPopupContainer','5gWdBic','11859drQVgZ','createWeaknessPopup','extraPositionX','Element75','adjustFlippedBattlefield','isSceneBattle','100lOZDat','findTargetSprite','updateScaling','VisuMZ_1_BattleCore','boxHeight','_speedY','includes','constructor','isSideView','filename','textColor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Impact','update','_targetScaleX','Game_Action_executeDamage','STR','width','index','rgba(1,\x201,\x201,\x201)','VNZQm','isFlipped','getColor','ARRAYEVAL','createWeaknessPopupsForCritical','targetScaleY','Spriteset_Battle_createBattleField'];_0x3b88=function(){return _0x55c40f;};return _0x3b88();}const _0x32caae=_0x4672;(function(_0x8eaf32,_0x191092){const _0x5bfdfe=_0x4672,_0x5cf25a=_0x8eaf32();while(!![]){try{const _0x5ec725=-parseInt(_0x5bfdfe(0x1d9))/0x1+parseInt(_0x5bfdfe(0x1a7))/0x2*(parseInt(_0x5bfdfe(0x1f6))/0x3)+-parseInt(_0x5bfdfe(0x1f0))/0x4*(parseInt(_0x5bfdfe(0x1f5))/0x5)+-parseInt(_0x5bfdfe(0x18e))/0x6+-parseInt(_0x5bfdfe(0x1e6))/0x7+-parseInt(_0x5bfdfe(0x1c5))/0x8*(parseInt(_0x5bfdfe(0x1c4))/0x9)+parseInt(_0x5bfdfe(0x1fc))/0xa*(parseInt(_0x5bfdfe(0x172))/0xb);if(_0x5ec725===_0x191092)break;else _0x5cf25a['push'](_0x5cf25a['shift']());}catch(_0x2fcba2){_0x5cf25a['push'](_0x5cf25a['shift']());}}}(_0x3b88,0x42c40));var label=_0x32caae(0x17b),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x3f375b){const _0x14a636=_0x32caae;return _0x3f375b[_0x14a636(0x1d7)]&&_0x3f375b[_0x14a636(0x1e2)][_0x14a636(0x202)]('['+label+']');})[0x0];function _0x4672(_0x506f6a,_0x4ad0bb){const _0x3b88f2=_0x3b88();return _0x4672=function(_0x467288,_0x2e5294){_0x467288=_0x467288-0x15b;let _0x22db75=_0x3b88f2[_0x467288];return _0x22db75;},_0x4672(_0x506f6a,_0x4ad0bb);}VisuMZ[label][_0x32caae(0x1bc)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x32caae(0x168)]=function(_0x56f11b,_0x1372f8){const _0x2d99a3=_0x32caae;for(const _0x39bb61 in _0x1372f8){if(_0x2d99a3(0x1eb)!==_0x2d99a3(0x164)){if(_0x39bb61[_0x2d99a3(0x1a4)](/(.*):(.*)/i)){const _0x520171=String(RegExp['$1']),_0xcd364f=String(RegExp['$2'])[_0x2d99a3(0x1b3)]()[_0x2d99a3(0x1d6)]();let _0x506673,_0x4cb285,_0x46c37b;switch(_0xcd364f){case'NUM':_0x506673=_0x1372f8[_0x39bb61]!==''?Number(_0x1372f8[_0x39bb61]):0x0;break;case _0x2d99a3(0x1c9):_0x4cb285=_0x1372f8[_0x39bb61]!==''?JSON[_0x2d99a3(0x1bd)](_0x1372f8[_0x39bb61]):[],_0x506673=_0x4cb285[_0x2d99a3(0x187)](_0xdb7bd5=>Number(_0xdb7bd5));break;case _0x2d99a3(0x1ab):_0x506673=_0x1372f8[_0x39bb61]!==''?eval(_0x1372f8[_0x39bb61]):null;break;case _0x2d99a3(0x15d):_0x4cb285=_0x1372f8[_0x39bb61]!==''?JSON[_0x2d99a3(0x1bd)](_0x1372f8[_0x39bb61]):[],_0x506673=_0x4cb285[_0x2d99a3(0x187)](_0x278cd1=>eval(_0x278cd1));break;case _0x2d99a3(0x18a):_0x506673=_0x1372f8[_0x39bb61]!==''?JSON[_0x2d99a3(0x1bd)](_0x1372f8[_0x39bb61]):'';break;case _0x2d99a3(0x1b6):_0x4cb285=_0x1372f8[_0x39bb61]!==''?JSON[_0x2d99a3(0x1bd)](_0x1372f8[_0x39bb61]):[],_0x506673=_0x4cb285[_0x2d99a3(0x187)](_0x239588=>JSON[_0x2d99a3(0x1bd)](_0x239588));break;case'FUNC':_0x506673=_0x1372f8[_0x39bb61]!==''?new Function(JSON['parse'](_0x1372f8[_0x39bb61])):new Function(_0x2d99a3(0x1da));break;case'ARRAYFUNC':_0x4cb285=_0x1372f8[_0x39bb61]!==''?JSON[_0x2d99a3(0x1bd)](_0x1372f8[_0x39bb61]):[],_0x506673=_0x4cb285[_0x2d99a3(0x187)](_0x30d9a0=>new Function(JSON[_0x2d99a3(0x1bd)](_0x30d9a0)));break;case _0x2d99a3(0x20c):_0x506673=_0x1372f8[_0x39bb61]!==''?String(_0x1372f8[_0x39bb61]):'';break;case'ARRAYSTR':_0x4cb285=_0x1372f8[_0x39bb61]!==''?JSON[_0x2d99a3(0x1bd)](_0x1372f8[_0x39bb61]):[],_0x506673=_0x4cb285[_0x2d99a3(0x187)](_0x16d30e=>String(_0x16d30e));break;case _0x2d99a3(0x171):_0x46c37b=_0x1372f8[_0x39bb61]!==''?JSON[_0x2d99a3(0x1bd)](_0x1372f8[_0x39bb61]):{},_0x506673=VisuMZ['ConvertParams']({},_0x46c37b);break;case _0x2d99a3(0x1dd):_0x4cb285=_0x1372f8[_0x39bb61]!==''?JSON[_0x2d99a3(0x1bd)](_0x1372f8[_0x39bb61]):[],_0x506673=_0x4cb285[_0x2d99a3(0x187)](_0x347ba0=>VisuMZ[_0x2d99a3(0x168)]({},JSON[_0x2d99a3(0x1bd)](_0x347ba0)));break;default:continue;}_0x56f11b[_0x520171]=_0x506673;}}else return _0xa04ab1[_0x2d99a3(0x1d7)]&&_0x357b80[_0x2d99a3(0x1e2)]['includes']('['+_0x3de23a+']');}return _0x56f11b;},(_0x3085d5=>{const _0x5b79b4=_0x32caae,_0x50a82f=_0x3085d5[_0x5b79b4(0x1ec)];for(const _0xa717ce of dependencies){if('siXqx'!=='siXqx'){if(!this[_0x5b79b4(0x1cc)])return;if(!this[_0x5b79b4(0x1ca)])return;this['_weaknessPopupsContainer']['x']=this[_0x5b79b4(0x1ca)]['x'],this[_0x5b79b4(0x1cc)]['y']=this[_0x5b79b4(0x1ca)]['y'];if(!_0x4bd08f[_0x5b79b4(0x161)])return;const _0x2318ac=_0x18ca03['ceil']((_0x4272c0[_0x5b79b4(0x20d)]-_0xf58874[_0x5b79b4(0x1a3)])/0x2),_0x1792d8=_0x389b2f['ceil']((_0x49832f['height']-_0x4bff71[_0x5b79b4(0x200)])/0x2);this['_weaknessPopupsContainer']['x']+=_0x2318ac,this['_weaknessPopupsContainer']['y']+=_0x1792d8;}else{if(!Imported[_0xa717ce]){alert(_0x5b79b4(0x182)['format'](_0x50a82f,_0xa717ce)),SceneManager['exit']();break;}}}const _0x12eb7c=_0x3085d5['description'];if(_0x12eb7c['match'](/\[Version[ ](.*?)\]/i)){if(_0x5b79b4(0x19d)!=='mEnEz'){if(_0x4c8da3['bypassUserElementBonus'])return 0x0;return _0x44ef76['WeaknessPopups'][_0x5b79b4(0x181)][_0x5b79b4(0x1bb)](this,_0x4b0d3f,_0x1cb4ae);}else{const _0x57a9f1=Number(RegExp['$1']);_0x57a9f1!==VisuMZ[label][_0x5b79b4(0x191)]&&(alert(_0x5b79b4(0x1de)[_0x5b79b4(0x1b4)](_0x50a82f,_0x57a9f1)),SceneManager['exit']());}}if(_0x12eb7c[_0x5b79b4(0x1a4)](/\[Tier[ ](\d+)\]/i)){const _0x1e1568=Number(RegExp['$1']);_0x1e1568<tier?(alert(_0x5b79b4(0x207)[_0x5b79b4(0x1b4)](_0x50a82f,_0x1e1568,tier)),SceneManager[_0x5b79b4(0x17a)]()):tier=Math[_0x5b79b4(0x194)](_0x1e1568,tier);}VisuMZ[_0x5b79b4(0x168)](VisuMZ[label]['Settings'],_0x3085d5[_0x5b79b4(0x184)]);})(pluginData),ColorManager[_0x32caae(0x15c)]=function(_0x58783f){const _0x5f562b=_0x32caae;_0x58783f=String(_0x58783f);if(_0x58783f[_0x5f562b(0x1a4)](/#(.*)/i)){if('YdsFI'===_0x5f562b(0x1ee))_0x52910a=_0x5f562b(0x1e3);else return _0x5f562b(0x19e)[_0x5f562b(0x1b4)](String(RegExp['$1']));}else return this[_0x5f562b(0x206)](Number(_0x58783f));},SceneManager[_0x32caae(0x1fb)]=function(){const _0x3018ce=_0x32caae;return this[_0x3018ce(0x167)]&&this['_scene'][_0x3018ce(0x203)]===Scene_Battle;},VisuMZ[_0x32caae(0x17b)][_0x32caae(0x20b)]=Game_Action[_0x32caae(0x16f)][_0x32caae(0x1a2)],Game_Action[_0x32caae(0x16f)][_0x32caae(0x1a2)]=function(_0x15ca72,_0x19ddba){const _0x337711=_0x32caae;VisuMZ[_0x337711(0x17b)][_0x337711(0x20b)][_0x337711(0x1bb)](this,_0x15ca72,_0x19ddba),this[_0x337711(0x1f3)](_0x15ca72,_0x19ddba);},Game_Action[_0x32caae(0x16f)][_0x32caae(0x1f3)]=function(_0xacbb48,_0x1af241){const _0x3b8a59=_0x32caae;if(!SceneManager[_0x3b8a59(0x1fb)]())return;if(!this[_0x3b8a59(0x199)]()&&!this['isDrain']())return;this[_0x3b8a59(0x15e)](_0xacbb48,_0x1af241),this[_0x3b8a59(0x197)](_0xacbb48,_0x1af241);},Game_Action['prototype'][_0x32caae(0x15e)]=function(_0x5f45f1,_0x69c5b3){const _0x2d8fcb=_0x32caae,_0xf11cc=_0x5f45f1[_0x2d8fcb(0x1c3)]();if(!_0xf11cc['critical'])return;const _0x3e689a=SceneManager[_0x2d8fcb(0x167)][_0x2d8fcb(0x19f)];if(!_0x3e689a)return;_0x3e689a['createWeaknessPopupType'](_0x5f45f1,'Critical');},Game_Action['prototype']['createWeaknessPopupsForElementRate']=function(_0x362891,_0x1ef9b5){const _0x495895=_0x32caae,_0x48ccb8=SceneManager[_0x495895(0x167)][_0x495895(0x19f)];if(!_0x48ccb8)return;$gameTemp[_0x495895(0x1aa)]=!![];const _0x27d514=this[_0x495895(0x176)](_0x362891);$gameTemp[_0x495895(0x1aa)]=![];let _0x2224e5=_0x495895(0x19b);if(_0x27d514===0x0)_0x2224e5=_0x495895(0x1cf);else{if(_0x27d514<0x0)'YIurT'!==_0x495895(0x16a)?_0x2224e5=_0x495895(0x173):_0x2d9bbb=_0x571e80['max'](_0x43b6e6,_0x4657d6);else{if(_0x27d514>=0x2)'jYlog'!==_0x495895(0x1ce)?(this[_0x495895(0x16e)]=_0x4eba7d,this['_data']=_0x4a66af,this[_0x495895(0x1a9)](),_0xad8a0a[_0x495895(0x16f)][_0x495895(0x165)]['call'](this),this[_0x495895(0x192)](),this[_0x495895(0x1c1)]()):_0x2224e5='Element200';else{if(_0x27d514>=1.75)_0x2224e5=_0x495895(0x1df);else{if(_0x27d514>=1.5)_0x495895(0x210)!==_0x495895(0x210)?_0x25f56d=_0x495895(0x173):_0x2224e5=_0x495895(0x177);else{if(_0x27d514>=1.25)_0x495895(0x196)!=='oixPw'?this[_0x495895(0x1e1)]=_0x23baa1[_0x495895(0x1ef)](this['_data']['filename']):_0x2224e5=_0x495895(0x1e9);else{if(_0x27d514>=1.1)_0x2224e5='Element110';else{if(_0x27d514>=1.05)_0x2224e5=_0x495895(0x17f);else{if(_0x27d514>=1.01)_0x2224e5=_0x495895(0x188);else{if(_0x27d514<=0.25)_0x2224e5='Element25';else{if(_0x27d514<=0.5)_0x2224e5=_0x495895(0x1f9);else{if(_0x27d514<=0.75)_0x2224e5='Element90';else{if(_0x27d514<=0.9)_0x2224e5=_0x495895(0x1cb);else _0x27d514<=0.99&&(_0x495895(0x1f2)!==_0x495895(0x1d2)?_0x2224e5=_0x495895(0x1b5):_0x5f04ee=_0x495895(0x1d3));}}}}}}}}}}}}_0x48ccb8[_0x495895(0x1bf)](_0x362891,_0x2224e5);},VisuMZ['WeaknessPopups'][_0x32caae(0x16b)]=Game_Action[_0x32caae(0x16f)][_0x32caae(0x1c2)],Game_Action[_0x32caae(0x16f)][_0x32caae(0x1c2)]=function(_0x106175,_0x240b8e){const _0x343b49=_0x32caae;if($gameTemp[_0x343b49(0x1aa)])return 0x0;return VisuMZ[_0x343b49(0x17b)][_0x343b49(0x16b)]['call'](this,_0x106175,_0x240b8e);},VisuMZ['WeaknessPopups'][_0x32caae(0x1ea)]=Game_Action['prototype'][_0x32caae(0x166)],Game_Action[_0x32caae(0x16f)][_0x32caae(0x166)]=function(_0x206215,_0x99b189){const _0x4076e8=_0x32caae;if($gameTemp[_0x4076e8(0x1aa)])return 0x1;return VisuMZ[_0x4076e8(0x17b)][_0x4076e8(0x1ea)][_0x4076e8(0x1bb)](this,_0x206215,_0x99b189);},VisuMZ['WeaknessPopups']['Game_Action_calcUserElementDamageFlat']=Game_Action[_0x32caae(0x16f)][_0x32caae(0x170)],Game_Action[_0x32caae(0x16f)][_0x32caae(0x170)]=function(_0x2fd051,_0x42d39a){const _0x15dbec=_0x32caae;if($gameTemp[_0x15dbec(0x1aa)])return 0x0;return VisuMZ[_0x15dbec(0x17b)][_0x15dbec(0x181)]['call'](this,_0x2fd051,_0x42d39a);};function Sprite_WeaknessPopup(){this['initialize'](...arguments);}Sprite_WeaknessPopup[_0x32caae(0x16f)]=Object[_0x32caae(0x1d1)](Sprite[_0x32caae(0x16f)]),Sprite_WeaknessPopup[_0x32caae(0x16f)]['constructor']=Sprite_WeaknessPopup,Sprite_WeaknessPopup[_0x32caae(0x16f)][_0x32caae(0x165)]=function(_0x1f969e,_0xfe28ff){const _0x404d5b=_0x32caae;this[_0x404d5b(0x16e)]=_0x1f969e,this['_data']=_0xfe28ff,this[_0x404d5b(0x1a9)](),Sprite[_0x404d5b(0x16f)][_0x404d5b(0x165)][_0x404d5b(0x1bb)](this),this[_0x404d5b(0x192)](),this[_0x404d5b(0x1c1)]();},Sprite_WeaknessPopup[_0x32caae(0x16f)][_0x32caae(0x192)]=function(){const _0x7e0aee=_0x32caae;this[_0x7e0aee(0x189)]['filename']?this['loadWeaknessPopupBitmap']():_0x7e0aee(0x1c8)!=='jLQZW'?(_0x5bbcfb[_0x7e0aee(0x17b)][_0x7e0aee(0x20b)]['call'](this,_0x3c5372,_0x6cc35e),this[_0x7e0aee(0x1f3)](_0x250ff3,_0x630265)):this[_0x7e0aee(0x174)]();},Sprite_WeaknessPopup[_0x32caae(0x16f)][_0x32caae(0x179)]=function(){const _0x31504=_0x32caae;this[_0x31504(0x1e1)]=ImageManager[_0x31504(0x1ef)](this[_0x31504(0x189)][_0x31504(0x205)]);},Sprite_WeaknessPopup[_0x32caae(0x16f)][_0x32caae(0x174)]=function(){const _0x47695c=_0x32caae;this[_0x47695c(0x1e1)]=new Bitmap(this[_0x47695c(0x189)][_0x47695c(0x19a)],this['_data'][_0x47695c(0x1d5)]),this[_0x47695c(0x1e1)]['fontFace']=this[_0x47695c(0x189)][_0x47695c(0x18d)],this[_0x47695c(0x1e1)][_0x47695c(0x1ad)]=this['_data'][_0x47695c(0x1ad)],this['bitmap'][_0x47695c(0x17d)]=this[_0x47695c(0x189)]['fontBold'],this[_0x47695c(0x1e1)]['fontItalic']=this[_0x47695c(0x189)][_0x47695c(0x169)],this[_0x47695c(0x1e1)]['textColor']=ColorManager[_0x47695c(0x15c)](this[_0x47695c(0x189)][_0x47695c(0x206)]),this[_0x47695c(0x1e1)][_0x47695c(0x1cd)]=this['_data'][_0x47695c(0x1cd)],this[_0x47695c(0x1e1)][_0x47695c(0x1af)]=this[_0x47695c(0x189)][_0x47695c(0x1af)],this[_0x47695c(0x1e1)]['drawText'](this[_0x47695c(0x189)][_0x47695c(0x1db)],0x0,0x0,this[_0x47695c(0x1e1)]['width'],this[_0x47695c(0x1e1)][_0x47695c(0x1dc)],_0x47695c(0x163));},Sprite_WeaknessPopup[_0x32caae(0x16f)]['initMembers']=function(){const _0x25fe12=_0x32caae;this[_0x25fe12(0x193)]=this[_0x25fe12(0x189)][_0x25fe12(0x1f1)],this['_speedY']=this[_0x25fe12(0x189)][_0x25fe12(0x19c)],this[_0x25fe12(0x16d)]=this['_data']['opaqueDuration'],this[_0x25fe12(0x1c0)]=this[_0x25fe12(0x189)]['fadeDuration'],this[_0x25fe12(0x1ac)]=this[_0x25fe12(0x189)][_0x25fe12(0x1a8)];},Sprite_WeaknessPopup['prototype']['initPosition']=function(){const _0xb1bd91=_0x32caae,_0x587363=SceneManager[_0xb1bd91(0x167)][_0xb1bd91(0x186)];if(!$gameSystem[_0xb1bd91(0x204)]()&&this[_0xb1bd91(0x16e)][_0xb1bd91(0x16e)][_0xb1bd91(0x180)]()){if(_0xb1bd91(0x1b8)!==_0xb1bd91(0x1b8)){const _0x20b7ce=_0x127dd1[_0xb1bd91(0x167)][_0xb1bd91(0x186)];!_0x56ad82[_0xb1bd91(0x204)]()&&this[_0xb1bd91(0x16e)]['_battler'][_0xb1bd91(0x180)]()&&(_0x8d6df7[_0xb1bd91(0x1ff)]&&_0x20b7ce['centerFrontViewSprite'](this[_0xb1bd91(0x16e)][_0xb1bd91(0x16e)][_0xb1bd91(0x20e)]()));this['x']=this[_0xb1bd91(0x16e)]['_baseX']??this[_0xb1bd91(0x16e)]['x'],this['x']+=this[_0xb1bd91(0x189)][_0xb1bd91(0x1e0)],this['y']=this[_0xb1bd91(0x16e)]['_baseY']??this[_0xb1bd91(0x16e)]['y'],this['y']-=this['_battler'][_0xb1bd91(0x1dc)]*this[_0xb1bd91(0x16e)][_0xb1bd91(0x1be)]['y'],this['y']+=this[_0xb1bd91(0x189)][_0xb1bd91(0x1b7)];if(_0xa7e1e3[_0xb1bd91(0x1ff)]&&_0x1949a8['BattleCore']['version']>=1.38){this['x']+=this[_0xb1bd91(0x16e)][_0xb1bd91(0x1f8)]();const _0x485e74=this[_0xb1bd91(0x16e)][_0xb1bd91(0x178)][_0xb1bd91(0x1be)]['y'];this['y']+=this[_0xb1bd91(0x16e)][_0xb1bd91(0x1b0)]();}const _0x4a0b4b=this[_0xb1bd91(0x189)][_0xb1bd91(0x1ae)]||0x0,_0xade8a2=this['_data'][_0xb1bd91(0x18f)]||0x0;this['x']+=_0x396555[_0xb1bd91(0x18c)](_0x4a0b4b*0x2)-_0x4a0b4b,this['y']+=_0x5626d4['randomInt'](_0xade8a2*0x2)-_0xade8a2,this['anchor']['x']=0.5,this[_0xb1bd91(0x1d8)]['y']=0.5,this['scale']['x']=this[_0xb1bd91(0x189)][_0xb1bd91(0x183)],this[_0xb1bd91(0x1be)]['y']=this[_0xb1bd91(0x189)][_0xb1bd91(0x18b)],this[_0xb1bd91(0x20a)]=this[_0xb1bd91(0x189)]['targetScaleX'],this[_0xb1bd91(0x1b1)]=this[_0xb1bd91(0x189)]['targetScaleY'];}else Imported[_0xb1bd91(0x1ff)]&&_0x587363[_0xb1bd91(0x1c7)](this[_0xb1bd91(0x16e)][_0xb1bd91(0x16e)]['index']());}this['x']=this[_0xb1bd91(0x16e)][_0xb1bd91(0x1a5)]??this[_0xb1bd91(0x16e)]['x'],this['x']+=this[_0xb1bd91(0x189)]['offsetX'],this['y']=this[_0xb1bd91(0x16e)][_0xb1bd91(0x16c)]??this['_battler']['y'],this['y']-=this['_battler'][_0xb1bd91(0x1dc)]*this[_0xb1bd91(0x16e)][_0xb1bd91(0x1be)]['y'],this['y']+=this[_0xb1bd91(0x189)][_0xb1bd91(0x1b7)];if(Imported[_0xb1bd91(0x1ff)]&&VisuMZ[_0xb1bd91(0x1b2)][_0xb1bd91(0x191)]>=1.38){this['x']+=this['_battler'][_0xb1bd91(0x1f8)]();const _0x259491=this['_battler'][_0xb1bd91(0x178)]['scale']['y'];this['y']+=this[_0xb1bd91(0x16e)][_0xb1bd91(0x1b0)]();}const _0x4da2e6=this[_0xb1bd91(0x189)]['offsetXvariance']||0x0,_0x302c87=this['_data'][_0xb1bd91(0x18f)]||0x0;this['x']+=Math[_0xb1bd91(0x18c)](_0x4da2e6*0x2)-_0x4da2e6,this['y']+=Math[_0xb1bd91(0x18c)](_0x302c87*0x2)-_0x302c87,this['anchor']['x']=0.5,this[_0xb1bd91(0x1d8)]['y']=0.5,this[_0xb1bd91(0x1be)]['x']=this[_0xb1bd91(0x189)][_0xb1bd91(0x183)],this[_0xb1bd91(0x1be)]['y']=this['_data'][_0xb1bd91(0x18b)],this[_0xb1bd91(0x20a)]=this[_0xb1bd91(0x189)][_0xb1bd91(0x1a6)],this[_0xb1bd91(0x1b1)]=this[_0xb1bd91(0x189)][_0xb1bd91(0x15f)];},Sprite_WeaknessPopup['prototype'][_0x32caae(0x209)]=function(){const _0x2c3404=_0x32caae;Sprite['prototype'][_0x2c3404(0x209)][_0x2c3404(0x1bb)](this),this['updatePosition'](),this[_0x2c3404(0x1fe)](),this['updateOpacity']();},Sprite_WeaknessPopup[_0x32caae(0x16f)][_0x32caae(0x1ba)]=function(){const _0x5c71a6=_0x32caae;this['x']+=this[_0x5c71a6(0x193)],this['y']+=this[_0x5c71a6(0x201)],this[_0x5c71a6(0x193)]+=this[_0x5c71a6(0x189)]['deltaSpeedX'],this[_0x5c71a6(0x201)]+=this['_data'][_0x5c71a6(0x1b9)];},Sprite_WeaknessPopup[_0x32caae(0x16f)]['updateScaling']=function(){const _0x1e7e61=_0x32caae;if(this[_0x1e7e61(0x1ac)]>0x0){const _0x1df556=this[_0x1e7e61(0x1ac)];this[_0x1e7e61(0x1be)]['x']=(this[_0x1e7e61(0x1be)]['x']*(_0x1df556-0x1)+this[_0x1e7e61(0x20a)])/_0x1df556,this[_0x1e7e61(0x1be)]['y']=(this['scale']['y']*(_0x1df556-0x1)+this['_targetScaleY'])/_0x1df556,this[_0x1e7e61(0x1ac)]--;}else this[_0x1e7e61(0x1be)]['x']=0x1,this[_0x1e7e61(0x1be)]['y']=0x1;},Sprite_WeaknessPopup[_0x32caae(0x16f)]['updateOpacity']=function(){const _0x4a5697=_0x32caae;if(this[_0x4a5697(0x16d)]-->0x0)return;if(this['_fadeDuration']>0x0){const _0x1f6fcd=this[_0x4a5697(0x1c0)];this['opacity']=(this[_0x4a5697(0x190)]*(_0x1f6fcd-0x1)+0x0)/_0x1f6fcd,this['_fadeDuration']--;}else{const _0x223a85=this[_0x4a5697(0x195)];if(_0x223a85){if(_0x4a5697(0x1d4)===_0x4a5697(0x1d4))_0x223a85['removeChild'](this),this[_0x4a5697(0x185)]();else return{'enabled':!![],'filename':'','text':'TEXT','bitmapWidth':0x258,'bitmapHeight':0xc8,'fontFace':_0x4a5697(0x208),'fontSize':0x24,'fontBold':![],'fontItalic':![],'textColor':_0x4a5697(0x1e4),'outlineSize':0x5,'outlineColor':_0x4a5697(0x20f),'offsetX':0x0,'offsetY':0x0,'scaleDuration':0x14,'startScaleX':0x2,'startScaleY':0x2,'targetScaleX':0x1,'targetScaleY':0x1,'startSpeedX':0x0,'startSpeedY':0x0,'deltaSpeedX':0x0,'deltaSpeedY':0x0,'opaqueDuration':0x28,'fadeDuration':0x14};}}},VisuMZ[_0x32caae(0x17b)][_0x32caae(0x160)]=Spriteset_Battle[_0x32caae(0x16f)]['createBattleField'],Spriteset_Battle[_0x32caae(0x16f)][_0x32caae(0x1e8)]=function(){const _0x4494b5=_0x32caae;VisuMZ['WeaknessPopups'][_0x4494b5(0x160)]['call'](this),this[_0x4494b5(0x1e5)]();},Spriteset_Battle['prototype'][_0x32caae(0x1e5)]=function(){const _0x31ed48=_0x32caae;if(this[_0x31ed48(0x1cc)])return;this[_0x31ed48(0x1cc)]=new Sprite(),this[_0x31ed48(0x1cc)]['x']=this[_0x31ed48(0x162)]['x'],this[_0x31ed48(0x1cc)]['y']=this['_battleField']['y'];const _0x38ad06=Math[_0x31ed48(0x17e)]((Graphics[_0x31ed48(0x20d)]-Graphics['boxWidth'])/0x2),_0x321391=Math[_0x31ed48(0x17e)]((Graphics[_0x31ed48(0x1dc)]-Graphics[_0x31ed48(0x200)])/0x2);this[_0x31ed48(0x1cc)]['x']+=_0x38ad06,this['_weaknessPopupsContainer']['y']+=_0x321391,this[_0x31ed48(0x1e7)](this[_0x31ed48(0x1cc)]);},VisuMZ[_0x32caae(0x17b)][_0x32caae(0x17c)]=Spriteset_Battle[_0x32caae(0x16f)][_0x32caae(0x1fa)],Spriteset_Battle[_0x32caae(0x16f)][_0x32caae(0x1fa)]=function(){const _0x3a8d61=_0x32caae;VisuMZ[_0x3a8d61(0x17b)][_0x3a8d61(0x17c)][_0x3a8d61(0x1bb)](this);!this[_0x3a8d61(0x1cc)]&&(_0x3a8d61(0x1c6)===_0x3a8d61(0x1c6)?this[_0x3a8d61(0x1e5)]():_0x434334=_0x3a8d61(0x1df));if(!this[_0x3a8d61(0x15b)]())return;this[_0x3a8d61(0x1cc)][_0x3a8d61(0x1be)]['x']=-0x1,this[_0x3a8d61(0x1cc)]['x']=this[_0x3a8d61(0x162)]['x']+this[_0x3a8d61(0x162)][_0x3a8d61(0x20d)];},VisuMZ[_0x32caae(0x17b)]['Spriteset_Battle_update']=Spriteset_Battle[_0x32caae(0x16f)][_0x32caae(0x209)],Spriteset_Battle['prototype'][_0x32caae(0x209)]=function(){const _0x2364d9=_0x32caae;VisuMZ[_0x2364d9(0x17b)][_0x2364d9(0x1a0)][_0x2364d9(0x1bb)](this),this[_0x2364d9(0x175)]();},Spriteset_Battle[_0x32caae(0x16f)][_0x32caae(0x175)]=function(){const _0x2cc03b=_0x32caae;if(!this['_weaknessPopupsContainer'])return;if(!this['_damageContainer'])return;this[_0x2cc03b(0x1cc)]['x']=this[_0x2cc03b(0x1ca)]['x'],this[_0x2cc03b(0x1cc)]['y']=this[_0x2cc03b(0x1ca)]['y'];if(!Imported[_0x2cc03b(0x161)])return;const _0x459729=Math[_0x2cc03b(0x17e)]((Graphics['width']-Graphics[_0x2cc03b(0x1a3)])/0x2),_0x3cbbe7=Math[_0x2cc03b(0x17e)]((Graphics['height']-Graphics[_0x2cc03b(0x200)])/0x2);this['_weaknessPopupsContainer']['x']+=_0x459729,this['_weaknessPopupsContainer']['y']+=_0x3cbbe7;},Spriteset_Battle[_0x32caae(0x16f)]['createWeaknessPopupType']=function(_0x3e843a,_0x4bfce1){const _0x3cd5f0=_0x32caae;if(!_0x3e843a)return;if(!this[_0x3cd5f0(0x1cc)])return;const _0x2851af=this[_0x3cd5f0(0x198)](_0x4bfce1);if(!_0x2851af)return;if(!_0x2851af[_0x3cd5f0(0x1d0)])return;this[_0x3cd5f0(0x1f7)](_0x3e843a,_0x2851af);},VisuMZ['WeaknessPopups'][_0x32caae(0x1a1)]=function(){const _0x3a8a9f=_0x32caae;return{'enabled':!![],'filename':'','text':'TEXT','bitmapWidth':0x258,'bitmapHeight':0xc8,'fontFace':_0x3a8a9f(0x208),'fontSize':0x24,'fontBold':![],'fontItalic':![],'textColor':'#ffffff','outlineSize':0x5,'outlineColor':_0x3a8a9f(0x20f),'offsetX':0x0,'offsetY':0x0,'scaleDuration':0x14,'startScaleX':0x2,'startScaleY':0x2,'targetScaleX':0x1,'targetScaleY':0x1,'startSpeedX':0x0,'startSpeedY':0x0,'deltaSpeedX':0x0,'deltaSpeedY':0x0,'opaqueDuration':0x28,'fadeDuration':0x14};},Spriteset_Battle['prototype'][_0x32caae(0x198)]=function(_0x336de6){const _0x1f86e6=_0x32caae,_0x1ffb09=VisuMZ[_0x1f86e6(0x17b)]['Settings'];if(!_0x1ffb09)return null;return _0x1ffb09[_0x336de6];},Spriteset_Battle[_0x32caae(0x16f)][_0x32caae(0x1f7)]=function(_0x4d2049,_0x4e17e4){const _0x35b96b=_0x32caae;if(!_0x4d2049)return;if(!_0x4e17e4)return;if(!_0x4e17e4[_0x35b96b(0x1d0)])return;if(!this[_0x35b96b(0x1cc)])return;if(!Imported[_0x35b96b(0x1ff)]&&_0x4d2049[_0x35b96b(0x180)]()&&!$gameSystem[_0x35b96b(0x204)]())return;const _0x19ad61=this[_0x35b96b(0x1fd)](_0x4d2049);if(!_0x19ad61)return;const _0x270dec=new Sprite_WeaknessPopup(_0x19ad61,_0x4e17e4),_0x57e1ea=this[_0x35b96b(0x1f4)](_0x19ad61);_0x57e1ea[_0x35b96b(0x1e7)](_0x270dec);},Spriteset_Battle[_0x32caae(0x16f)][_0x32caae(0x1f4)]=function(_0x240f3f){const _0x24115e=_0x32caae;return!$gameSystem['isSideView']()&&_0x240f3f[_0x24115e(0x16e)][_0x24115e(0x180)]()?SceneManager[_0x24115e(0x167)][_0x24115e(0x186)][_0x24115e(0x1ed)]:this[_0x24115e(0x1cc)];},VisuMZ[_0x32caae(0x17b)]['Window_BattleStatus_createDamageContainer']=Window_BattleStatus[_0x32caae(0x16f)]['_createDamageContainer'],Window_BattleStatus[_0x32caae(0x16f)]['_createDamageContainer']=function(){const _0x541bff=_0x32caae;this['_createWeaknessPopupContainer'](),VisuMZ['WeaknessPopups']['Window_BattleStatus_createDamageContainer'][_0x541bff(0x1bb)](this);},Window_BattleStatus[_0x32caae(0x16f)]['_createWeaknessPopupContainer']=function(){const _0x41a52e=_0x32caae;this['_weaknessPopupContainer']=new Sprite(),this[_0x41a52e(0x1e7)](this[_0x41a52e(0x1ed)]);};
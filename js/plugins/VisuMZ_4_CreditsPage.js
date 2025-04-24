//=============================================================================
// VisuStella MZ - Credits Page
// VisuMZ_4_CreditsPage.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_CreditsPage = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CreditsPage = VisuMZ.CreditsPage || {};
VisuMZ.CreditsPage.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.00] [CreditsPage]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Page
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds a 'Credits' command to the title screen and Main Menu scene
 * that will bring up a scene with a credits page made the way you want. Both
 * categories and text codes can be used for the credits page to allow for more
 * customization options.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Adds "Credits" to the Title and/or Main Menu command windows.
 * * Create any number of credits categories to display names in.
 * * Credits pages can use text codes to allow for lots of customization.
 * * Normal scrolling and fast scrolling can be done with the keyboard.
 * * Mouse scrolling is also possible via touch controls.
 * * Access the "Credits" page from the game via Plugin Command.
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
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Scene Plugin Commands ===
 * 
 * ---
 *
 * Scene: Open Credits Page
 * - Opens Credits Page.
 * - CANNOT be used inside of battle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Enable Credits Page in Menu?
 * - Enables/disables Credits Page inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Credits Page inside the main menu.
 *
 * ---
 *
 * System: Show Credits Page in Menu?
 * - Shows/hides Credits Page inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Credits Page inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Credits Categories Settings
 * ============================================================================
 *
 * Categories used for the various credits displayed.
 *
 * ---
 *
 * Category
 * 
 *   Category Name:
 *   - The name of this category when displayed.
 * 
 *   Icon:
 *   - Icon used for this category.
 *   - Use 0 for no icon.
 * 
 *   Credits Text:
 *   - Text displayed for this category.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Set up the main menu defaults.
 *
 * ---
 *
 * Main Menu Settings
 * 
 *   Command Name:
 *   - Name of the 'Credits Page' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Credits Page' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Credits Page' option to the Main Menu by default?
 * 
 *   Show in Title Command?:
 *   - Add 'Credits Page' the Title Command Window?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_CreditsPage.
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
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These settings let you adjust the text displayed for this plugin.
 *
 * ---
 *
 * Button Assist Window
 * 
 *   Slow Scroll:
 *   - Text used for slow scrolling.
 * 
 *   Fast Scroll:
 *   - Text used for fast scrolling.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * These settings let you adjust the windows displayed for this plugin.
 *
 * ---
 *
 * Window_CreditsCategory
 * 
 *   Style:
 *   - How do you wish to draw commands for this window?
 *     - Text Only
 *     - Icon Only
 *     - Icon + Text
 *     - Automatic
 * 
 *   Text Align:
 *   - Text alignment for this window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Window_CreditsDisplay
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *     Buffers > Top Buffer:
 *     Buffers > Bottom Buffer:
 *     - How many lines should the top/bottom be buffered from?
 * 
 *   Center Width:
 *   - What's the center width for the text?
 *   - Use 0 for the full window width.
 * 
 *     Scrolling > Slow > Scroll Speed:
 *     - What speed will Up/Down scroll the window at?
 *     - Lower is slower. Higher is faster.
 * 
 *     Scrolling > Slow > Sound Frequency:
 *     - How frequent will Up/Down scrolling make sounds?
 *     - Lower is quicker. Higher is later.
 * 
 *     Scrolling > Fast > Scroll Speed:
 *     - What speed will PageUp/PageDn scroll the window at?
 *     - Lower is slower. Higher is faster.
 * 
 *     Scrolling > Fast > Sound Frequency:
 *     - How frequent will PageUp/PageDn scrolling make sounds?
 *     - Lower is quicker. Higher is later.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
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
 * Version 1.00 Official Release Date: December 19, 2022
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
 * @command SceneOpenCreditsPage
 * @text Scene: Open Credits Page
 * @desc Opens Credits Page.
 * CANNOT be used inside of battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableCreditsPageMenu
 * @text System: Enable Credits Page in Menu?
 * @desc Enables/disables Credits Page inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Credits Page inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowCreditsPageMenu
 * @text System: Show Credits Page in Menu?
 * @desc Shows/hides Credits Page inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Credits Page inside the main menu.
 * @default true
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
 * @param CreditsPage
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Credits:arraystruct
 * @text Credits Categories
 * @type struct<Credits>[]
 * @desc Categories used for the various credits displayed.
 * @default ["{\"Name:str\":\"Production\",\"Icon:num\":\"87\",\"Text:json\":\"\\\"\\\\\\\\c[6]Producer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Director\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Scenario Writer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Marketing Director\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Publisher\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Software Provided By\\\\\\\\c[0]\\\\n\\\\\\\\{Yoji Ojima\\\\\\\\}\\\\n\\\\\\\\{Enterbrain\\\\\\\\}\\\\n\\\\\\\\{Kadokawa\\\\\\\\}\\\\n\\\\\\\\{Gotcha Gotcha Games\\\\\\\\}\\\\n\\\\n\\\\n\\\"\"}","{\"Name:str\":\"Cast\",\"Icon:num\":\"82\",\"Text:json\":\"\\\"\\\\\\\\c[6]Main Cast\\\\\\\\c[0]\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Supporting Cast\\\\\\\\c[0]\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\"\"}","{\"Name:str\":\"Graphics\",\"Icon:num\":\"70\",\"Text:json\":\"\\\"\\\\\\\\c[6]Art Director\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Character Designer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Map Designer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Monster Designer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Pixel Artist\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Background Illustrator\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]UI Designer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]CG Designer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]VFX Designer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\"\"}","{\"Name:str\":\"Sound\",\"Icon:num\":\"80\",\"Text:json\":\"\\\"\\\\\\\\c[6]Music Composer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Sound Artist\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Audio Design\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\"\"}","{\"Name:str\":\"Programmers\",\"Icon:num\":\"83\",\"Text:json\":\"\\\"\\\\\\\\c[6]Main Programmer\\\\\\\\c[0]\\\\n\\\\\\\\{Yoji Ojima\\\\\\\\} - RPG Maker MZ\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Gameplay Designer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Battle Designer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]UX Director\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[24]VisuStella MZ\\\\\\\\c[0]\\\\n\\\\\\\\{Yanfly\\\\\\\\}\\\\n\\\\\\\\{Arisu\\\\\\\\}\\\\n\\\\\\\\{Olivia\\\\\\\\}\\\\n\\\\\\\\{Irina\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Other Plugins\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\"\"}","{\"Name:str\":\"Special\",\"Icon:num\":\"79\",\"Text:json\":\"\\\"\\\\\\\\c[6]Special Thanks\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\"\"}"]
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Main Menu settings for Credits Page.
 * @default {"Name:str":"Credits","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true","ShowTitleCommand:eval":"true"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_CreditsPage.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"ButtonAssist":"","SlowScroll:str":"Scroll","FastScroll:str":"Fast Scroll"}
 *
 * @param Window:struct
 * @text Windows Settings
 * @type struct<Window>
 * @desc These settings let you adjust the windows displayed for this plugin.
 * @default {"CategoryWindow":"","CategoryWindow_Style:str":"auto","CategoryWindow_TextAlign:str":"center","CategoryWindow_BgType:num":"0","CategoryWindow_RectJS:func":"\"const ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","DisplayWindow":"","DisplayWindow_BgType:num":"0","DisplayWindow_CenterWidth:num":"816","Scrolling":"","Slow":"","SlowScrollSpeed:num":"8","SlowSoundFreq:num":"8","Fast":"","FastScrollSpeed:num":"32","FastSoundFreq:num":"4","DisplayWindow_RectJS:func":"\"const ww = Graphics.boxWidth;\\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true);\\nconst wx = 0;\\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, true);\\nreturn new Rectangle(wx, wy, ww, wh);\"","DisplayWindow_Buffers":"","DisplayWindow_BufferTop:num":"1","DisplayWindow_BufferBottom:num":"1"}
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
/*~struct~Credits:
 *
 * @param Name:str
 * @text Category Name
 * @desc The name of this category when displayed.
 * @default Untitled
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param Text:json
 * @text Credits Text
 * @type note
 * @desc Text displayed for this category.
 * Text codes allowed.
 * @default "Test1\nTest2\nTest3"
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Credits' option in the Main Menu.
 * @default Credits
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Credits' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Credits' option to the Main Menu by default?
 * @default true
 *
 * @param ShowTitleCommand:eval
 * @text Show in Title Command?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add 'Credits Page' the Title Command Window?
 * @default true
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
 * @require 1
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @require 1
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param SlowScroll:str
 * @text Slow Scroll
 * @parent ButtonAssist
 * @desc Text used for slow scrolling.
 * @default Scroll
 *
 * @param FastScroll:str
 * @text Fast Scroll
 * @parent ButtonAssist
 * @desc Text used for fast scrolling.
 * @default Fast Scroll
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param CategoryWindow
 * @text Window_CreditsCategory
 *
 * @param CategoryWindow_Style:str
 * @text Style
 * @parent CategoryWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands for this window?
 * @default auto
 *
 * @param CategoryWindow_TextAlign:str
 * @text Text Align
 * @parent CategoryWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for this window?
 * @default center
 *
 * @param CategoryWindow_BgType:num
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
 * @param CategoryWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(1, true);\nconst wx = 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param DisplayWindow
 * @text Window_CreditsDisplay
 *
 * @param DisplayWindow_BgType:num
 * @text Background Type
 * @parent DisplayWindow
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
 * @param DisplayWindow_Buffers
 * @text Buffers
 * @parent DisplayWindow
 *
 * @param DisplayWindow_BufferTop:num
 * @text Top Buffer
 * @parent DisplayWindow_Buffers
 * @type number
 * @desc How many lines should the top be buffered from?
 * @default 1
 *
 * @param DisplayWindow_BufferBottom:num
 * @text Bottom Buffer
 * @parent DisplayWindow_Buffers
 * @type number
 * @desc How many lines should the bottom be buffered from?
 * @default 1
 *
 * @param DisplayWindow_CenterWidth:num
 * @text Center Width
 * @parent DisplayWindow
 * @type number
 * @desc What's the center width for the text?
 * Use 0 for the full window width.
 * @default 816
 *
 * @param Scrolling
 * @parent DisplayWindow
 *
 * @param Slow
 * @parent Scrolling
 *
 * @param SlowScrollSpeed:num
 * @text Scroll Speed
 * @parent Slow
 * @type number
 * @min 1
 * @desc What speed will Up/Down scroll the window at?
 * Lower is slower. Higher is faster.
 * @default 8
 *
 * @param SlowSoundFreq:num
 * @text Sound Frequency
 * @parent Slow
 * @type number
 * @min 1
 * @desc How frequent will Up/Down scrolling make sounds?
 * Lower is quicker. Higher is later.
 * @default 8
 *
 * @param Fast
 * @parent Scrolling
 *
 * @param FastScrollSpeed:num
 * @text Scroll Speed
 * @parent Fast
 * @type number
 * @min 1
 * @desc What speed will PageUp/PageDn scroll the window at?
 * Lower is slower. Higher is faster.
 * @default 32
 *
 * @param FastSoundFreq:num
 * @text Sound Frequency
 * @parent Fast
 * @type number
 * @min 1
 * @desc How frequent will PageUp/PageDn scrolling make sounds?
 * Lower is quicker. Higher is later.
 * @default 4
 *
 * @param DisplayWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent DisplayWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth;\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true);\nconst wx = 0;\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, true);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x119b02=_0x52c1;(function(_0x3f8cba,_0x4a518d){const _0x475e51=_0x52c1,_0x38e2a4=_0x3f8cba();while(!![]){try{const _0x4c4a42=parseInt(_0x475e51(0x1e2))/0x1*(parseInt(_0x475e51(0x219))/0x2)+-parseInt(_0x475e51(0x1fc))/0x3+parseInt(_0x475e51(0x1f5))/0x4*(-parseInt(_0x475e51(0x1fe))/0x5)+-parseInt(_0x475e51(0x1fb))/0x6*(-parseInt(_0x475e51(0x1ef))/0x7)+-parseInt(_0x475e51(0x174))/0x8*(parseInt(_0x475e51(0x18d))/0x9)+-parseInt(_0x475e51(0x1db))/0xa*(parseInt(_0x475e51(0x206))/0xb)+-parseInt(_0x475e51(0x233))/0xc*(-parseInt(_0x475e51(0x1be))/0xd);if(_0x4c4a42===_0x4a518d)break;else _0x38e2a4['push'](_0x38e2a4['shift']());}catch(_0x39633a){_0x38e2a4['push'](_0x38e2a4['shift']());}}}(_0x1470,0xedd2e));var label=_0x119b02(0x17d),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x119b02(0x255)](function(_0x43cbde){const _0x1f93c0=_0x119b02;return _0x43cbde[_0x1f93c0(0x164)]&&_0x43cbde['description'][_0x1f93c0(0x22e)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x119b02(0x23f)]||{},VisuMZ[_0x119b02(0x250)]=function(_0x13f42c,_0x600ee){const _0xf99e6c=_0x119b02;for(const _0x3290f1 in _0x600ee){if(_0x3290f1['match'](/(.*):(.*)/i)){if('NTpzF'===_0xf99e6c(0x1f4))this[_0xf99e6c(0x18c)](...arguments);else{const _0x2d335f=String(RegExp['$1']),_0x465b31=String(RegExp['$2'])[_0xf99e6c(0x1cf)]()[_0xf99e6c(0x230)]();let _0x56854e,_0x4cfe06,_0x422952;switch(_0x465b31){case _0xf99e6c(0x20a):_0x56854e=_0x600ee[_0x3290f1]!==''?Number(_0x600ee[_0x3290f1]):0x0;break;case _0xf99e6c(0x1fd):_0x4cfe06=_0x600ee[_0x3290f1]!==''?JSON[_0xf99e6c(0x254)](_0x600ee[_0x3290f1]):[],_0x56854e=_0x4cfe06[_0xf99e6c(0x1df)](_0x290c8a=>Number(_0x290c8a));break;case _0xf99e6c(0x1b2):_0x56854e=_0x600ee[_0x3290f1]!==''?eval(_0x600ee[_0x3290f1]):null;break;case _0xf99e6c(0x222):_0x4cfe06=_0x600ee[_0x3290f1]!==''?JSON[_0xf99e6c(0x254)](_0x600ee[_0x3290f1]):[],_0x56854e=_0x4cfe06[_0xf99e6c(0x1df)](_0x3a8522=>eval(_0x3a8522));break;case'JSON':_0x56854e=_0x600ee[_0x3290f1]!==''?JSON[_0xf99e6c(0x254)](_0x600ee[_0x3290f1]):'';break;case _0xf99e6c(0x252):_0x4cfe06=_0x600ee[_0x3290f1]!==''?JSON['parse'](_0x600ee[_0x3290f1]):[],_0x56854e=_0x4cfe06[_0xf99e6c(0x1df)](_0x5c04e0=>JSON[_0xf99e6c(0x254)](_0x5c04e0));break;case _0xf99e6c(0x1f8):_0x56854e=_0x600ee[_0x3290f1]!==''?new Function(JSON[_0xf99e6c(0x254)](_0x600ee[_0x3290f1])):new Function(_0xf99e6c(0x17f));break;case _0xf99e6c(0x19d):_0x4cfe06=_0x600ee[_0x3290f1]!==''?JSON[_0xf99e6c(0x254)](_0x600ee[_0x3290f1]):[],_0x56854e=_0x4cfe06['map'](_0x285291=>new Function(JSON[_0xf99e6c(0x254)](_0x285291)));break;case'STR':_0x56854e=_0x600ee[_0x3290f1]!==''?String(_0x600ee[_0x3290f1]):'';break;case _0xf99e6c(0x1d0):_0x4cfe06=_0x600ee[_0x3290f1]!==''?JSON[_0xf99e6c(0x254)](_0x600ee[_0x3290f1]):[],_0x56854e=_0x4cfe06[_0xf99e6c(0x1df)](_0x574991=>String(_0x574991));break;case'STRUCT':_0x422952=_0x600ee[_0x3290f1]!==''?JSON[_0xf99e6c(0x254)](_0x600ee[_0x3290f1]):{},_0x56854e=VisuMZ[_0xf99e6c(0x250)]({},_0x422952);break;case'ARRAYSTRUCT':_0x4cfe06=_0x600ee[_0x3290f1]!==''?JSON[_0xf99e6c(0x254)](_0x600ee[_0x3290f1]):[],_0x56854e=_0x4cfe06[_0xf99e6c(0x1df)](_0x4109c2=>VisuMZ[_0xf99e6c(0x250)]({},JSON[_0xf99e6c(0x254)](_0x4109c2)));break;default:continue;}_0x13f42c[_0x2d335f]=_0x56854e;}}}return _0x13f42c;},(_0x2f2af6=>{const _0x2a097f=_0x119b02,_0x38362e=_0x2f2af6[_0x2a097f(0x1b1)];for(const _0x5c6d9a of dependencies){if(_0x2a097f(0x1c7)===_0x2a097f(0x170)){if(!_0x5496b2[_0x2a097f(0x1f3)])return;if(this[_0x2a097f(0x236)](_0x2a097f(0x177))>=0x0)return;const _0x49a851=_0x52dcba[_0x2a097f(0x185)],_0x4f3acd=!![];this[_0x2a097f(0x1ce)](_0x49a851,_0x2a097f(0x177),_0x4f3acd);const _0x4b81b2=this['findSymbol'](_0x2a097f(0x24b));if(_0x4b81b2>0x0){const _0x7275b2=this[_0x2a097f(0x23a)][_0x2a097f(0x22b)]();this[_0x2a097f(0x23a)]['splice'](_0x4b81b2,0x0,_0x7275b2);}}else{if(!Imported[_0x5c6d9a]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x2a097f(0x1fa)](_0x38362e,_0x5c6d9a)),SceneManager[_0x2a097f(0x1ab)]();break;}}}const _0x489c29=_0x2f2af6['description'];if(_0x489c29[_0x2a097f(0x175)](/\[Version[ ](.*?)\]/i)){if(_0x2a097f(0x184)!=='xuEwU'){const _0x510a31=Number(RegExp['$1']);if(_0x510a31!==VisuMZ[label][_0x2a097f(0x1bd)]){if(_0x2a097f(0x163)==='zyCqO')alert(_0x2a097f(0x203)[_0x2a097f(0x1fa)](_0x38362e,_0x510a31)),SceneManager['exit']();else{const _0x495392=_0x538966[_0x2a097f(0x172)](this[_0x2a097f(0x22f)],_0x3bbf2f['CENTER_WIDTH']||this[_0x2a097f(0x22f)]),_0x22e72b=_0x3000ba[_0x2a097f(0x21e)]((this[_0x2a097f(0x22f)]-_0x495392)/0x2),_0x515107=this[_0x2a097f(0x21b)]()*_0x378d6e[_0x2a097f(0x1ea)];this[_0x2a097f(0x1d3)](_0x315095,_0x22e72b,_0x515107,_0x495392);}}}else _0x5ba56a[_0x2a097f(0x17d)][_0x2a097f(0x215)][_0x2a097f(0x1ec)](this),this[_0x2a097f(0x226)][_0x2a097f(0x1dd)](_0x2a097f(0x177),this[_0x2a097f(0x1dc)][_0x2a097f(0x207)](this));}if(_0x489c29[_0x2a097f(0x175)](/\[Tier[ ](\d+)\]/i)){const _0x4d168a=Number(RegExp['$1']);if(_0x4d168a<tier)alert(_0x2a097f(0x239)[_0x2a097f(0x1fa)](_0x38362e,_0x4d168a,tier)),SceneManager['exit']();else{if('AuChb'!=='AuChb'){const _0x213071=_0x58507d(_0xdcc536['$1']);_0x213071<_0x5057a1?(_0x3396f4(_0x2a097f(0x239)[_0x2a097f(0x1fa)](_0x3933bc,_0x213071,_0x140b78)),_0x5d1b2b['exit']()):_0xda0bac=_0x380401[_0x2a097f(0x1c1)](_0x213071,_0xfc145d);}else tier=Math[_0x2a097f(0x1c1)](_0x4d168a,tier);}}VisuMZ[_0x2a097f(0x250)](VisuMZ[label][_0x2a097f(0x23f)],_0x2f2af6['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x119b02(0x1b1)],'SceneOpenCreditsPage',_0x3e0851=>{const _0x70f6ae=_0x119b02;if(SceneManager[_0x70f6ae(0x247)]())return;SceneManager[_0x70f6ae(0x23b)](Scene_CreditsPage);}),PluginManager[_0x119b02(0x1cb)](pluginData[_0x119b02(0x1b1)],_0x119b02(0x201),_0x4eeec5=>{const _0x29c365=_0x119b02;VisuMZ['ConvertParams'](_0x4eeec5,_0x4eeec5),$gameSystem['setMainMenuCreditsPageEnabled'](_0x4eeec5[_0x29c365(0x1bc)]);}),PluginManager[_0x119b02(0x1cb)](pluginData[_0x119b02(0x1b1)],_0x119b02(0x191),_0x3139b1=>{const _0x2c7c9d=_0x119b02;VisuMZ[_0x2c7c9d(0x250)](_0x3139b1,_0x3139b1),$gameSystem[_0x2c7c9d(0x212)](_0x3139b1[_0x2c7c9d(0x228)]);}),TextManager['CreditsPageMenuCommand']=VisuMZ[_0x119b02(0x17d)][_0x119b02(0x23f)][_0x119b02(0x1f6)][_0x119b02(0x1b3)],TextManager['CreditsPageScroll']=VisuMZ['CreditsPage'][_0x119b02(0x23f)][_0x119b02(0x1a7)][_0x119b02(0x162)],TextManager[_0x119b02(0x202)]=VisuMZ['CreditsPage']['Settings'][_0x119b02(0x1a7)][_0x119b02(0x190)],SceneManager['isSceneBattle']=function(){const _0x39a809=_0x119b02;return this[_0x39a809(0x229)]&&this[_0x39a809(0x229)]['constructor']===Scene_Battle;},VisuMZ['CreditsPage'][_0x119b02(0x198)]=Game_System[_0x119b02(0x1c4)]['initialize'],Game_System[_0x119b02(0x1c4)][_0x119b02(0x18c)]=function(){const _0x54e3aa=_0x119b02;VisuMZ[_0x54e3aa(0x17d)][_0x54e3aa(0x198)][_0x54e3aa(0x1ec)](this),this[_0x54e3aa(0x1a1)]();},Game_System['prototype'][_0x119b02(0x1a1)]=function(){const _0x3bba2a=_0x119b02;this[_0x3bba2a(0x186)]={'shown':VisuMZ[_0x3bba2a(0x17d)][_0x3bba2a(0x23f)]['MainMenu'][_0x3bba2a(0x20e)],'enabled':VisuMZ[_0x3bba2a(0x17d)][_0x3bba2a(0x23f)]['MainMenu'][_0x3bba2a(0x1d1)]};},Game_System[_0x119b02(0x1c4)][_0x119b02(0x1c3)]=function(){const _0x33da6c=_0x119b02;if(this['_CreditsPage_MainMenu']===undefined)this[_0x33da6c(0x1a1)]();return this[_0x33da6c(0x186)][_0x33da6c(0x1c9)];},Game_System[_0x119b02(0x1c4)][_0x119b02(0x212)]=function(_0x3fe490){const _0x324aaa=_0x119b02;if(this[_0x324aaa(0x186)]===undefined)this[_0x324aaa(0x1a1)]();this[_0x324aaa(0x186)]['shown']=_0x3fe490;},Game_System['prototype']['isMainMenuCreditsPageEnabled']=function(){const _0x430dbd=_0x119b02;if(this[_0x430dbd(0x186)]===undefined)this[_0x430dbd(0x1a1)]();return this['_CreditsPage_MainMenu'][_0x430dbd(0x245)];},Game_System[_0x119b02(0x1c4)][_0x119b02(0x218)]=function(_0x1762d6){const _0x31f2f1=_0x119b02;if(this[_0x31f2f1(0x186)]===undefined)this[_0x31f2f1(0x1a1)]();this[_0x31f2f1(0x186)]['enabled']=_0x1762d6;},VisuMZ[_0x119b02(0x17d)][_0x119b02(0x215)]=Scene_Title['prototype'][_0x119b02(0x1b4)],Scene_Title[_0x119b02(0x1c4)][_0x119b02(0x1b4)]=function(){const _0x2abb4f=_0x119b02;VisuMZ[_0x2abb4f(0x17d)][_0x2abb4f(0x215)][_0x2abb4f(0x1ec)](this),this[_0x2abb4f(0x226)][_0x2abb4f(0x1dd)](_0x2abb4f(0x177),this[_0x2abb4f(0x1dc)][_0x2abb4f(0x207)](this));},Scene_Title[_0x119b02(0x1c4)][_0x119b02(0x1dc)]=function(){const _0x7208e0=_0x119b02;this['_commandWindow'][_0x7208e0(0x19a)](),SceneManager[_0x7208e0(0x23b)](Scene_CreditsPage);},VisuMZ[_0x119b02(0x17d)]['Scene_Menu_createCommandWindow']=Scene_Menu[_0x119b02(0x1c4)][_0x119b02(0x1b4)],Scene_Menu['prototype'][_0x119b02(0x1b4)]=function(){const _0x2736fd=_0x119b02;VisuMZ[_0x2736fd(0x17d)]['Scene_Menu_createCommandWindow'][_0x2736fd(0x1ec)](this);const _0x2e5d2b=this[_0x2736fd(0x226)];_0x2e5d2b['setHandler']('creditsPage',this[_0x2736fd(0x1dc)][_0x2736fd(0x207)](this));},Scene_Menu[_0x119b02(0x1c4)]['commandCreditsPage']=function(){SceneManager['push'](Scene_CreditsPage);};function Scene_CreditsPage(){this['initialize'](...arguments);}Scene_CreditsPage['prototype']=Object[_0x119b02(0x1ba)](Scene_MenuBase[_0x119b02(0x1c4)]),Scene_CreditsPage['prototype'][_0x119b02(0x21c)]=Scene_CreditsPage,Scene_CreditsPage[_0x119b02(0x1c4)]['initialize']=function(){const _0x18851a=_0x119b02;Scene_MenuBase[_0x18851a(0x1c4)]['initialize'][_0x18851a(0x1ec)](this);},Scene_CreditsPage['prototype'][_0x119b02(0x220)]=function(){return 0x0;},Scene_CreditsPage[_0x119b02(0x1c4)][_0x119b02(0x1ba)]=function(){const _0x2d8841=_0x119b02;Scene_MenuBase[_0x2d8841(0x1c4)][_0x2d8841(0x1ba)][_0x2d8841(0x1ec)](this),this[_0x2d8841(0x217)](),this[_0x2d8841(0x16c)]();},Scene_CreditsPage['prototype'][_0x119b02(0x217)]=function(){const _0x29a336=_0x119b02,_0x3a37b4=this[_0x29a336(0x18f)](),_0x568910=new Window_CreditsCategory(_0x3a37b4);_0x568910[_0x29a336(0x1dd)](_0x29a336(0x1d2),this[_0x29a336(0x1e6)][_0x29a336(0x207)](this)),this['addWindow'](_0x568910),this['_categoryWindow']=_0x568910,_0x568910[_0x29a336(0x1d6)](Window_CreditsCategory[_0x29a336(0x189)]);},Scene_CreditsPage[_0x119b02(0x1c4)]['categoryWindowRect']=function(){const _0x480493=_0x119b02;if(VisuMZ['CreditsPage'][_0x480493(0x23f)][_0x480493(0x181)][_0x480493(0x17a)]){if(_0x480493(0x1a3)===_0x480493(0x1a3))return VisuMZ[_0x480493(0x17d)][_0x480493(0x23f)]['Window'][_0x480493(0x17a)][_0x480493(0x1ec)](this);else{const _0x35ad92=this[_0x480493(0x246)](_0x581025),_0x4a2abb=this['textSizeEx'](_0x4915e0)[_0x480493(0x188)];return _0x4a2abb<=_0x35ad92['width']?_0x480493(0x1b0):_0x480493(0x22a);}}const _0x8bce49=Graphics[_0x480493(0x1e5)],_0x537618=this['calcWindowHeight'](0x1,!![]),_0x2be298=0x0,_0x59b40e=this[_0x480493(0x1da)]();return new Rectangle(_0x2be298,_0x59b40e,_0x8bce49,_0x537618);},Scene_CreditsPage[_0x119b02(0x1c4)]['createTextWindow']=function(){const _0x4a3e37=_0x119b02,_0x2d9e2a=this[_0x4a3e37(0x1ae)](),_0x56923b=new Window_CreditsDisplay(_0x2d9e2a);this[_0x4a3e37(0x20d)](_0x56923b),this['_textWindow']=_0x56923b,this[_0x4a3e37(0x180)]['setDisplayWindow'](_0x56923b),_0x56923b[_0x4a3e37(0x1d6)](Window_CreditsDisplay[_0x4a3e37(0x189)]);},Scene_CreditsPage[_0x119b02(0x1c4)][_0x119b02(0x1ae)]=function(){const _0x1f4838=_0x119b02;if(VisuMZ['CreditsPage']['Settings']['Window'][_0x1f4838(0x24e)])return VisuMZ[_0x1f4838(0x17d)][_0x1f4838(0x23f)]['Window'][_0x1f4838(0x24e)][_0x1f4838(0x1ec)](this);const _0x155d9a=Graphics['boxWidth'],_0x561e55=this['mainAreaHeight']()-this[_0x1f4838(0x1ff)](0x1,!![]),_0xb89195=0x0,_0x4e2c2b=this['mainAreaTop']()+this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0xb89195,_0x4e2c2b,_0x155d9a,_0x561e55);},Scene_CreditsPage[_0x119b02(0x1c4)]['buttonAssistKey1']=function(){const _0x4309be=_0x119b02;return TextManager[_0x4309be(0x1af)](_0x4309be(0x1e3),_0x4309be(0x214));},Scene_CreditsPage[_0x119b02(0x1c4)]['buttonAssistKey3']=function(){const _0x1151c3=_0x119b02;return TextManager[_0x1151c3(0x1af)]('up','down');},Scene_CreditsPage[_0x119b02(0x1c4)][_0x119b02(0x1bf)]=function(){return'';},Scene_CreditsPage[_0x119b02(0x1c4)][_0x119b02(0x225)]=function(){const _0xa8737e=_0x119b02;return TextManager[_0xa8737e(0x202)];},Scene_CreditsPage[_0x119b02(0x1c4)]['buttonAssistText3']=function(){return TextManager['CreditsPageScroll'];},Scene_CreditsPage[_0x119b02(0x1c4)][_0x119b02(0x1e0)]=function(){const _0x49038d=_0x119b02;Scene_MenuBase[_0x49038d(0x1c4)][_0x49038d(0x1e0)]['call'](this),this[_0x49038d(0x178)](this[_0x49038d(0x16a)]()),this['createCustomBackgroundImages']();},Scene_CreditsPage[_0x119b02(0x1c4)]['getBackgroundOpacity']=function(){const _0x2ced79=_0x119b02;return VisuMZ[_0x2ced79(0x17d)]['Settings'][_0x2ced79(0x1f0)]['SnapshotOpacity'];},Scene_CreditsPage[_0x119b02(0x1c4)]['createCustomBackgroundImages']=function(){const _0x439736=_0x119b02,_0x49ac5d=VisuMZ[_0x439736(0x17d)][_0x439736(0x23f)][_0x439736(0x1f0)];if(_0x49ac5d&&(_0x49ac5d[_0x439736(0x238)]!==''||_0x49ac5d[_0x439736(0x1a9)]!=='')){if(_0x439736(0x1c5)==='pEETb')this[_0x439736(0x18a)]=new Sprite(ImageManager['loadTitle1'](_0x49ac5d[_0x439736(0x238)])),this[_0x439736(0x1d4)]=new Sprite(ImageManager[_0x439736(0x256)](_0x49ac5d['BgFilename2'])),this[_0x439736(0x169)](this['_backSprite1']),this[_0x439736(0x169)](this[_0x439736(0x1d4)]),this['_backSprite1'][_0x439736(0x211)][_0x439736(0x1eb)](this[_0x439736(0x240)]['bind'](this,this['_backSprite1'])),this[_0x439736(0x1d4)][_0x439736(0x211)]['addLoadListener'](this[_0x439736(0x240)]['bind'](this,this[_0x439736(0x1d4)]));else{const _0x4824c2=this[_0x439736(0x234)];_0x4824c2[_0x439736(0x16b)](_0x2e95e5,0x0,_0x51200d['y'],_0x4824c2['innerWidth'],_0x439736(0x1d9));}}},Scene_CreditsPage['prototype'][_0x119b02(0x240)]=function(_0x3508dd){const _0x8f92ae=_0x119b02;this[_0x8f92ae(0x22d)](_0x3508dd),this[_0x8f92ae(0x248)](_0x3508dd);},VisuMZ[_0x119b02(0x17d)][_0x119b02(0x241)]=Window_MenuCommand[_0x119b02(0x1c4)][_0x119b02(0x22c)],Window_MenuCommand[_0x119b02(0x1c4)]['addOriginalCommands']=function(){const _0x28659c=_0x119b02;VisuMZ[_0x28659c(0x17d)][_0x28659c(0x241)]['call'](this),this['addCreditsPageCommand']();},Window_MenuCommand['prototype'][_0x119b02(0x19c)]=function(){const _0x7b0ccd=_0x119b02;if(!this[_0x7b0ccd(0x1a4)]())return;if(!this['isCreditsPageCommandVisible']())return;const _0x45f9f3=TextManager['CreditsPageMenuCommand'],_0x2a0847=this[_0x7b0ccd(0x227)]();this['addCommand'](_0x45f9f3,'creditsPage',_0x2a0847);},Window_MenuCommand['prototype'][_0x119b02(0x1a4)]=function(){const _0x185115=_0x119b02;return Imported[_0x185115(0x1b7)]?![]:!![];},Window_MenuCommand['prototype']['isCreditsPageCommandVisible']=function(){const _0x529a7b=_0x119b02;return $gameSystem[_0x529a7b(0x1c3)]();},Window_MenuCommand['prototype']['isCreditsPageCommandEnabled']=function(){return $gameSystem['isMainMenuCreditsPageEnabled']();},Window_TitleCommand[_0x119b02(0x1f3)]=VisuMZ[_0x119b02(0x17d)][_0x119b02(0x23f)][_0x119b02(0x1f6)][_0x119b02(0x173)],VisuMZ[_0x119b02(0x17d)][_0x119b02(0x1e4)]=Window_TitleCommand['prototype']['makeCommandList'],Window_TitleCommand[_0x119b02(0x1c4)]['makeCommandList']=function(){const _0x260501=_0x119b02;VisuMZ[_0x260501(0x17d)][_0x260501(0x1e4)][_0x260501(0x1ec)](this),this['addCreditsCommand']();},Window_TitleCommand[_0x119b02(0x1c4)][_0x119b02(0x197)]=function(){const _0x288593=_0x119b02;if(!Window_TitleCommand[_0x288593(0x1f3)])return;if(this[_0x288593(0x236)](_0x288593(0x177))>=0x0)return;const _0x4b2d50=TextManager[_0x288593(0x185)],_0x426806=!![];this['addCommand'](_0x4b2d50,'creditsPage',_0x426806);const _0x1139b0=this[_0x288593(0x236)]('options');if(_0x1139b0>0x0){if('zErtE'!==_0x288593(0x1ca)){const _0x383dc7=this[_0x288593(0x23a)][_0x288593(0x22b)]();this['_list'][_0x288593(0x18b)](_0x547bc3,0x0,_0x383dc7);}else{const _0x29b0c5=this[_0x288593(0x23a)]['pop']();this[_0x288593(0x23a)][_0x288593(0x18b)](_0x1139b0,0x0,_0x29b0c5);}}};function Window_CreditsCategory(){const _0x1f4c98=_0x119b02;this[_0x1f4c98(0x18c)](...arguments);}Window_CreditsCategory['prototype']=Object[_0x119b02(0x1ba)](Window_HorzCommand[_0x119b02(0x1c4)]),Window_CreditsCategory[_0x119b02(0x1c4)][_0x119b02(0x21c)]=Window_CreditsCategory,Window_CreditsCategory[_0x119b02(0x189)]=VisuMZ[_0x119b02(0x17d)][_0x119b02(0x23f)]['Window'][_0x119b02(0x1cd)],Window_CreditsCategory['TEXT_ALIGN']=VisuMZ[_0x119b02(0x17d)][_0x119b02(0x23f)][_0x119b02(0x181)][_0x119b02(0x1bb)],Window_CreditsCategory[_0x119b02(0x1f1)]=VisuMZ['CreditsPage']['Settings']['Window'][_0x119b02(0x19b)],Window_CreditsCategory[_0x119b02(0x1c4)][_0x119b02(0x18c)]=function(_0x13ffd9){const _0x1258c8=_0x119b02;Window_HorzCommand[_0x1258c8(0x1c4)][_0x1258c8(0x18c)][_0x1258c8(0x1ec)](this,_0x13ffd9),this[_0x1258c8(0x243)](_0x13ffd9);},Window_CreditsCategory[_0x119b02(0x1c4)][_0x119b02(0x17e)]=function(){const _0x53a9fa=_0x119b02;Window_Command['prototype']['callUpdateHelp']['call'](this);if(this[_0x53a9fa(0x234)])this['updateCommandNameWindow']();if(this[_0x53a9fa(0x168)])this[_0x53a9fa(0x232)]();},Window_CreditsCategory['prototype'][_0x119b02(0x242)]=function(){const _0x46086e=_0x119b02;return VisuMZ[_0x46086e(0x17d)]['Settings']['Credits']['length'];},Window_CreditsCategory[_0x119b02(0x1c4)][_0x119b02(0x195)]=function(){return![];},Window_CreditsCategory[_0x119b02(0x1c4)][_0x119b02(0x1a6)]=function(){return![];},Window_CreditsCategory[_0x119b02(0x1c4)][_0x119b02(0x1ed)]=function(){},Window_CreditsCategory[_0x119b02(0x1c4)][_0x119b02(0x183)]=function(_0x3010e2){this['_displayWindow']=_0x3010e2,this['updateDisplayWindow']();},Window_CreditsCategory[_0x119b02(0x1c4)]['updateDisplayWindow']=function(){const _0x578e25=_0x119b02;if(!this[_0x578e25(0x168)])return;this[_0x578e25(0x168)][_0x578e25(0x21f)](this[_0x578e25(0x210)]());},Window_CreditsCategory[_0x119b02(0x1c4)][_0x119b02(0x243)]=function(_0x3309fc){const _0x25c62b=_0x119b02,_0x5cc31f=new Rectangle(0x0,0x0,_0x3309fc[_0x25c62b(0x188)],_0x3309fc[_0x25c62b(0x213)]);this[_0x25c62b(0x234)]=new Window_Base(_0x5cc31f),this[_0x25c62b(0x234)][_0x25c62b(0x1d5)]=0x0,this[_0x25c62b(0x169)](this[_0x25c62b(0x234)]),this[_0x25c62b(0x1e1)]();},Window_CreditsCategory[_0x119b02(0x1c4)][_0x119b02(0x1e1)]=function(){const _0x32d67b=_0x119b02,_0x379412=this[_0x32d67b(0x234)];_0x379412[_0x32d67b(0x24f)][_0x32d67b(0x1c2)]();const _0x565508=this[_0x32d67b(0x221)](this[_0x32d67b(0x18e)]());if(_0x565508===_0x32d67b(0x22a)){if(_0x32d67b(0x24d)!==_0x32d67b(0x17c)){const _0x40fd0f=this[_0x32d67b(0x246)](this[_0x32d67b(0x18e)]());let _0x2e1bc6=this[_0x32d67b(0x24c)](this[_0x32d67b(0x18e)]());_0x2e1bc6=_0x2e1bc6[_0x32d67b(0x1f9)](/\\I\[(\d+)\]/gi,''),_0x379412['resetFontSettings'](),this['commandNameWindowDrawBackground'](_0x2e1bc6,_0x40fd0f),this[_0x32d67b(0x24a)](_0x2e1bc6,_0x40fd0f),this['commandNameWindowCenter'](_0x2e1bc6,_0x40fd0f);}else return![];}},Window_CreditsCategory[_0x119b02(0x1c4)][_0x119b02(0x165)]=function(_0x1b28ff,_0x15f283){},Window_CreditsCategory[_0x119b02(0x1c4)]['commandNameWindowDrawText']=function(_0x297c73,_0x53586a){const _0x12ca78=_0x119b02,_0x14adf0=this[_0x12ca78(0x234)];_0x14adf0['drawText'](_0x297c73,0x0,_0x53586a['y'],_0x14adf0[_0x12ca78(0x22f)],'center');},Window_CreditsCategory[_0x119b02(0x1c4)][_0x119b02(0x1aa)]=function(_0x404344,_0x6d8205){const _0x5be6aa=_0x119b02,_0x11d402=this[_0x5be6aa(0x234)],_0x5416be=$gameSystem[_0x5be6aa(0x20b)](),_0x22b34b=_0x6d8205['x']+Math['floor'](_0x6d8205['width']/0x2)+_0x5416be;_0x11d402['x']=_0x11d402[_0x5be6aa(0x188)]/-0x2+_0x22b34b,_0x11d402['y']=Math['floor'](_0x6d8205[_0x5be6aa(0x213)]/0x2);},Window_CreditsCategory[_0x119b02(0x1c4)]['makeCommandList']=function(){const _0x26743c=_0x119b02,_0x169330=VisuMZ[_0x26743c(0x17d)]['Settings'][_0x26743c(0x196)];for(const _0x5712bd of _0x169330){const _0x3a5071=_0x26743c(0x1e7),_0x2f2b01=_0x5712bd[_0x26743c(0x17b)]||0x0;let _0x5af239=_0x5712bd[_0x26743c(0x1b3)];_0x2f2b01>0x0&&this[_0x26743c(0x1d7)]()!==_0x26743c(0x1f2)&&(_0x5af239='\x5cI[%1]%2'[_0x26743c(0x1fa)](_0x2f2b01,_0x5af239)),this[_0x26743c(0x1ce)](_0x5af239,_0x3a5071,!![],_0x5712bd);}},Window_CreditsCategory[_0x119b02(0x1c4)][_0x119b02(0x16e)]=function(){const _0x455e1e=_0x119b02;return Window_CreditsCategory[_0x455e1e(0x171)];},Window_CreditsCategory[_0x119b02(0x1c4)][_0x119b02(0x21a)]=function(_0x1fd520){const _0x3a43f1=_0x119b02,_0x158db5=this[_0x3a43f1(0x221)](_0x1fd520);if(_0x158db5===_0x3a43f1(0x1b0)){if('sDbpB'===_0x3a43f1(0x1f7))this[_0x3a43f1(0x179)](_0x1fd520);else{this[_0x3a43f1(0x24c)](_0x29e26e)[_0x3a43f1(0x175)](/\\I\[(\d+)\]/i);const _0x36477c=_0x43bbf2(_0x50f97d['$1'])||0x0,_0x24361e=this[_0x3a43f1(0x246)](_0x5276ec),_0x361dbd=_0x24361e['x']+_0x46dc06['floor']((_0x24361e[_0x3a43f1(0x188)]-_0x356b3b['iconWidth'])/0x2),_0x26da73=_0x24361e['y']+(_0x24361e['height']-_0x4c641a[_0x3a43f1(0x19e)])/0x2;this['drawIcon'](_0x36477c,_0x361dbd,_0x26da73);}}else _0x158db5===_0x3a43f1(0x22a)?this[_0x3a43f1(0x21d)](_0x1fd520):Window_HorzCommand['prototype'][_0x3a43f1(0x21a)][_0x3a43f1(0x1ec)](this,_0x1fd520);},Window_CreditsCategory['prototype'][_0x119b02(0x1d7)]=function(){const _0x44b704=_0x119b02;return Window_CreditsCategory[_0x44b704(0x1f1)];},Window_CreditsCategory['prototype'][_0x119b02(0x221)]=function(_0x11d0c2){const _0x4b3981=_0x119b02;if(_0x11d0c2<0x0)return'text';const _0x3d6fbf=this[_0x4b3981(0x1d7)]();if(_0x3d6fbf!==_0x4b3981(0x192)){if('BZIOg'!=='wMvWZ')return _0x3d6fbf;else _0x58f4fe[_0x4b3981(0x17d)][_0x4b3981(0x241)][_0x4b3981(0x1ec)](this),this[_0x4b3981(0x19c)]();}else{if(this['maxItems']()>0x0){if('fbPub'===_0x4b3981(0x208)){const _0x6013d6=this['commandName'](_0x11d0c2);if(_0x6013d6['match'](/\\I\[(\d+)\]/i)){if(_0x4b3981(0x253)!==_0x4b3981(0x253))return _0x2c0025[_0x4b3981(0x17d)]['Settings'][_0x4b3981(0x196)][_0x4b3981(0x1b5)];else{const _0x411099=this[_0x4b3981(0x246)](_0x11d0c2),_0x584675=this[_0x4b3981(0x16d)](_0x6013d6)['width'];return _0x584675<=_0x411099[_0x4b3981(0x188)]?_0x4b3981(0x1b0):_0x4b3981(0x22a);}}}else this[_0x4b3981(0x1de)](![]);}}return _0x4b3981(0x1f2);},Window_CreditsCategory[_0x119b02(0x1c4)][_0x119b02(0x179)]=function(_0x13bfa5){const _0x6eddb9=_0x119b02,_0x15017d=this[_0x6eddb9(0x246)](_0x13bfa5),_0x33ffbe=this[_0x6eddb9(0x24c)](_0x13bfa5),_0x52940f=this[_0x6eddb9(0x16d)](_0x33ffbe)[_0x6eddb9(0x188)];this[_0x6eddb9(0x176)](this[_0x6eddb9(0x1b6)](_0x13bfa5));const _0x165a1a=this[_0x6eddb9(0x16e)]();if(_0x165a1a==='right')this[_0x6eddb9(0x1d3)](_0x33ffbe,_0x15017d['x']+_0x15017d[_0x6eddb9(0x188)]-_0x52940f,_0x15017d['y'],_0x52940f);else{if(_0x165a1a==='center'){const _0x3fa2eb=_0x15017d['x']+Math['floor']((_0x15017d['width']-_0x52940f)/0x2);this[_0x6eddb9(0x1d3)](_0x33ffbe,_0x3fa2eb,_0x15017d['y'],_0x52940f);}else this[_0x6eddb9(0x1d3)](_0x33ffbe,_0x15017d['x'],_0x15017d['y'],_0x52940f);}},Window_CreditsCategory[_0x119b02(0x1c4)][_0x119b02(0x21d)]=function(_0x3b4145){const _0x3cf843=_0x119b02;this[_0x3cf843(0x24c)](_0x3b4145)[_0x3cf843(0x175)](/\\I\[(\d+)\]/i);const _0x583c92=Number(RegExp['$1'])||0x0,_0x55879f=this[_0x3cf843(0x246)](_0x3b4145),_0x4a4cfc=_0x55879f['x']+Math['floor']((_0x55879f[_0x3cf843(0x188)]-ImageManager['iconWidth'])/0x2),_0x4b1043=_0x55879f['y']+(_0x55879f['height']-ImageManager[_0x3cf843(0x19e)])/0x2;this[_0x3cf843(0x1a2)](_0x583c92,_0x4a4cfc,_0x4b1043);};function _0x52c1(_0x7c6d8c,_0x88e9e4){const _0x147001=_0x1470();return _0x52c1=function(_0x52c1cc,_0x15b1d8){_0x52c1cc=_0x52c1cc-0x162;let _0x38c590=_0x147001[_0x52c1cc];return _0x38c590;},_0x52c1(_0x7c6d8c,_0x88e9e4);}function _0x1470(){const _0x4e7644=['Enable','version','323557ysOeKs','buttonAssistKey4','scrollToTop','max','clear','isMainMenuCreditsPageVisible','prototype','pEETb','origin','xVOjn','innerHeight','shown','zErtE','registerCommand','Text','CategoryWindow_BgType','addCommand','toUpperCase','ARRAYSTR','EnableMainMenu','cancel','drawTextEx','_backSprite2','opacity','setBackgroundType','commandStyle','BOTTOM_LINE_BUFFER','center','mainAreaTop','717490GCwNOd','commandCreditsPage','setHandler','processFastScroll','map','createBackground','updateCommandNameWindow','1367SudRCg','pageup','Window_TitleCommand_makeCommandList','boxWidth','popScene','category','activate','SLOW_SOUND_FREQUENCY','TOP_LINE_BUFFER','addLoadListener','call','playOkSound','processCursorMove','66157OIPuVR','BgSettings','COMMAND_STYLE','text','CREDITS_ADD_COMMAND','sBcGi','1192CBQkNX','MainMenu','sDbpB','FUNC','replace','format','876GbyxGw','4000416LbaQiP','ARRAYNUM','27595SBPQix','calcWindowHeight','SlowScrollSpeed','SystemEnableCreditsPageMenu','CreditsPageFastScroll','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','FastScrollSpeed','home','264QQFEhL','bind','fbPub','clamp','NUM','windowPadding','_category','addWindow','ShowMainMenu','isAutoColorAffected','currentExt','bitmap','setMainMenuCreditsPageVisible','height','pagedown','Scene_Title_createCommandWindow','CENTER_WIDTH','createCategoryWindow','setMainMenuCreditsPageEnabled','2122PrSqbv','drawItem','lineHeight','constructor','drawItemStyleIcon','floor','setCategory','helpAreaHeight','commandStyleCheck','ARRAYEVAL','FastSoundFreq','createContents','buttonAssistText1','_commandWindow','isCreditsPageCommandEnabled','Show','_scene','icon','pop','addOriginalCommands','scaleSprite','includes','innerWidth','trim','scrollToBottom','updateDisplayWindow','2004NByAmx','_commandNameWindow','setScrollAccel','findSymbol','isPressed','BgFilename1','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_list','push','calculateTextHeight','DisplayWindow_BufferTop','resetWordWrap','Settings','adjustSprite','Window_MenuCommand_addOriginalCommands','maxCols','createCommandNameWindow','refresh','enabled','itemLineRect','isSceneBattle','centerSprite','processSlowScroll','commandNameWindowDrawText','options','commandName','HRUWg','DisplayWindow_RectJS','contents','ConvertParams','isTriggered','ARRAYJSON','NIERA','parse','filter','loadTitle2','SlowScroll','zyCqO','status','commandNameWindowDrawBackground','DisplayWindow_BufferBottom','smoothScrollBy','_displayWindow','addChild','getBackgroundOpacity','drawText','createTextWindow','textSizeEx','itemTextAlign','FAST_SOUND_FREQUENCY','WoGns','TEXT_ALIGN','min','ShowTitleCommand','32wGGmlf','match','changePaintOpacity','creditsPage','setBackgroundOpacity','drawItemStyleIconText','CategoryWindow_RectJS','Icon','pYxwO','CreditsPage','callUpdateHelp','return\x200','_categoryWindow','Window','SlowSoundFreq','setDisplayWindow','HvoVc','CreditsPageMenuCommand','_CreditsPage_MainMenu','_allTextHeight','width','BG_TYPE','_backSprite1','splice','initialize','2953035XqEbcL','index','categoryWindowRect','FastScroll','SystemShowCreditsPageMenu','auto','DisplayWindow_BgType','contentsHeight','isUseModernControls','Credits','addCreditsCommand','Game_System_initialize','SLOW_SCROLL_SPEED','close','CategoryWindow_Style','addCreditsPageCommand','ARRAYFUNC','iconHeight','DisplayWindow_CenterWidth','drawAllText','initCreditsPageMainMenu','drawIcon','RlTGY','addCreditsPageCommandAutomatically','zvKRs','isHoverEnabled','Vocab','playCursorSound','BgFilename2','commandNameWindowCenter','exit','frameCount','drawMessageText','textWindowRect','getInputMultiButtonStrings','iconText','name','EVAL','Name','createCommandWindow','length','isCommandEnabled','VisuMZ_1_MainMenuCore','resetFontSettings','VisuMZ_1_MessageCore','create','CategoryWindow_TextAlign'];_0x1470=function(){return _0x4e7644;};return _0x1470();}function Window_CreditsDisplay(){const _0x4d90e3=_0x119b02;this[_0x4d90e3(0x18c)](...arguments);}Window_CreditsDisplay[_0x119b02(0x1c4)]=Object[_0x119b02(0x1ba)](Window_Selectable[_0x119b02(0x1c4)]),Window_CreditsDisplay[_0x119b02(0x1c4)]['constructor']=Window_CreditsDisplay,Window_CreditsDisplay[_0x119b02(0x189)]=VisuMZ[_0x119b02(0x17d)][_0x119b02(0x23f)][_0x119b02(0x181)][_0x119b02(0x193)],Window_CreditsDisplay[_0x119b02(0x1ea)]=VisuMZ[_0x119b02(0x17d)][_0x119b02(0x23f)][_0x119b02(0x181)][_0x119b02(0x23d)]??0x1,Window_CreditsDisplay[_0x119b02(0x1d8)]=VisuMZ['CreditsPage'][_0x119b02(0x23f)][_0x119b02(0x181)][_0x119b02(0x166)]??0x1,Window_CreditsDisplay[_0x119b02(0x216)]=VisuMZ[_0x119b02(0x17d)][_0x119b02(0x23f)][_0x119b02(0x181)][_0x119b02(0x19f)]??0x1,Window_CreditsDisplay['SLOW_SCROLL_SPEED']=VisuMZ[_0x119b02(0x17d)][_0x119b02(0x23f)][_0x119b02(0x181)][_0x119b02(0x200)]||0x1,Window_CreditsDisplay['FAST_SCROLL_SPEED']=VisuMZ[_0x119b02(0x17d)]['Settings'][_0x119b02(0x181)][_0x119b02(0x204)]||0x1,Window_CreditsDisplay['SLOW_SOUND_FREQUENCY']=VisuMZ['CreditsPage'][_0x119b02(0x23f)]['Window'][_0x119b02(0x182)]||0x1,Window_CreditsDisplay[_0x119b02(0x16f)]=VisuMZ[_0x119b02(0x17d)]['Settings'][_0x119b02(0x181)][_0x119b02(0x223)]||0x1,Window_CreditsDisplay['prototype'][_0x119b02(0x18c)]=function(_0x2b9932){const _0x44f81f=_0x119b02;this['_category']=VisuMZ[_0x44f81f(0x17d)][_0x44f81f(0x23f)][_0x44f81f(0x196)][0x0],Window_Selectable[_0x44f81f(0x1c4)]['initialize'][_0x44f81f(0x1ec)](this,_0x2b9932),this['_allTextHeight']=0x0,this[_0x44f81f(0x244)](),this[_0x44f81f(0x1e8)]();},Window_CreditsDisplay['prototype'][_0x119b02(0x20f)]=function(){return![];},Window_CreditsDisplay[_0x119b02(0x1c4)]['refresh']=function(){const _0x230012=_0x119b02;this[_0x230012(0x23c)](),this[_0x230012(0x224)](),this[_0x230012(0x1a0)]();},Window_CreditsDisplay[_0x119b02(0x1c4)][_0x119b02(0x23c)]=function(){const _0x12ed20=_0x119b02,_0x1f5b44=this[_0x12ed20(0x20c)][_0x12ed20(0x1cc)];this['_allTextHeight']=0x0,this['_allTextHeight']=this['textSizeEx'](_0x1f5b44)[_0x12ed20(0x213)];const _0x14aada=this[_0x12ed20(0x21b)](),_0x3b8a4a=Window_CreditsDisplay[_0x12ed20(0x1ea)]*_0x14aada,_0x3a651f=Window_CreditsDisplay['BOTTOM_LINE_BUFFER']*_0x14aada;this['_allTextHeight']+=_0x3b8a4a+_0x3a651f;},Window_CreditsDisplay[_0x119b02(0x1c4)][_0x119b02(0x194)]=function(){const _0x3264e7=_0x119b02;return Math[_0x3264e7(0x1c1)](this[_0x3264e7(0x187)],0x1);},Window_CreditsDisplay[_0x119b02(0x1c4)][_0x119b02(0x21f)]=function(_0x5a905a){const _0x20e5f3=_0x119b02;if(_0x5a905a===this[_0x20e5f3(0x20c)])return;this['_category']=_0x5a905a,this['refresh']();},Window_CreditsDisplay[_0x119b02(0x1c4)][_0x119b02(0x1a0)]=function(){const _0x5b71bb=_0x119b02,_0x3c8638=this[_0x5b71bb(0x20c)][_0x5b71bb(0x1cc)];this[_0x5b71bb(0x1b8)](),this[_0x5b71bb(0x1ad)](_0x3c8638);if(Imported[_0x5b71bb(0x1b9)])this[_0x5b71bb(0x23e)]();this['scrollToTop']();},Window_CreditsDisplay[_0x119b02(0x1c4)]['drawMessageText']=function(_0x507d47){const _0x345f7d=_0x119b02,_0x454427=Math[_0x345f7d(0x172)](this[_0x345f7d(0x22f)],Window_CreditsDisplay[_0x345f7d(0x216)]||this[_0x345f7d(0x22f)]),_0x2ca95e=Math['floor']((this[_0x345f7d(0x22f)]-_0x454427)/0x2),_0x4d4e8b=this['lineHeight']()*Window_CreditsDisplay[_0x345f7d(0x1ea)];this[_0x345f7d(0x1d3)](_0x507d47,_0x2ca95e,_0x4d4e8b,_0x454427);},Window_CreditsDisplay[_0x119b02(0x1c4)]['updateOrigin']=function(){},Window_CreditsDisplay['prototype'][_0x119b02(0x1ee)]=function(){const _0x1c398d=_0x119b02;if(!this['active'])return;if(Input['isPressed']('down'))this[_0x1c398d(0x249)](!![]);else{if(Input[_0x1c398d(0x237)]('up'))this['processSlowScroll'](![]);else{if(Input[_0x1c398d(0x237)]('pagedown'))this[_0x1c398d(0x1de)](!![]);else{if(Input[_0x1c398d(0x237)](_0x1c398d(0x1e3)))this['processFastScroll'](![]);else{if(Input[_0x1c398d(0x251)](_0x1c398d(0x205)))_0x1c398d(0x1a5)!==_0x1c398d(0x1a5)?this[_0x1c398d(0x1c0)](!![]):this[_0x1c398d(0x1c0)](!![]);else Input[_0x1c398d(0x251)]('end')&&this['scrollToBottom'](!![]);}}}}},Window_CreditsDisplay[_0x119b02(0x1c4)]['processSlowScroll']=function(_0xcbfbee){const _0x2210e6=_0x119b02;let _0x11582d=this[_0x2210e6(0x1c6)]['y'];this[_0x2210e6(0x1c6)]['y']+=(_0xcbfbee?0x1:-0x1)*Window_CreditsDisplay[_0x2210e6(0x199)];let _0x2e70f3=Math[_0x2210e6(0x1c1)](0x0,this['_allTextHeight']-this[_0x2210e6(0x1c8)]);this[_0x2210e6(0x1c6)]['y']=this[_0x2210e6(0x1c6)]['y'][_0x2210e6(0x209)](0x0,_0x2e70f3);if(_0x11582d!==this[_0x2210e6(0x1c6)]['y']&&Graphics[_0x2210e6(0x1ac)]%Window_CreditsDisplay[_0x2210e6(0x1e9)]===0x0)this[_0x2210e6(0x1a8)]();},Window_CreditsDisplay[_0x119b02(0x1c4)]['processFastScroll']=function(_0x287015){const _0xe033e6=_0x119b02;let _0xc3045f=this[_0xe033e6(0x1c6)]['y'];this['origin']['y']+=(_0x287015?0x1:-0x1)*Window_CreditsDisplay['FAST_SCROLL_SPEED'];let _0x988762=Math[_0xe033e6(0x1c1)](0x0,this[_0xe033e6(0x187)]-this[_0xe033e6(0x1c8)]);this[_0xe033e6(0x1c6)]['y']=this[_0xe033e6(0x1c6)]['y'][_0xe033e6(0x209)](0x0,_0x988762);if(_0xc3045f!==this[_0xe033e6(0x1c6)]['y']&&Graphics[_0xe033e6(0x1ac)]%Window_CreditsDisplay[_0xe033e6(0x16f)]===0x0)this[_0xe033e6(0x1a8)]();},Window_CreditsDisplay[_0x119b02(0x1c4)][_0x119b02(0x1c0)]=function(_0x2c4250){const _0xbab0d7=_0x119b02;let _0x26a462=this['origin']['y'];this[_0xbab0d7(0x1c6)]['y']=0x0;if(_0x2c4250&&_0x26a462!==this[_0xbab0d7(0x1c6)]['y'])this[_0xbab0d7(0x1a8)]();},Window_CreditsDisplay[_0x119b02(0x1c4)][_0x119b02(0x231)]=function(_0x50a943){const _0x3417a3=_0x119b02;let _0x339c82=this['origin']['y'],_0x25b983=Math['max'](0x0,this[_0x3417a3(0x187)]-this[_0x3417a3(0x1c8)]);this[_0x3417a3(0x1c6)]['y']=_0x25b983;if(_0x50a943&&_0x339c82!==this['origin']['y'])this[_0x3417a3(0x1a8)]();},Window_CreditsDisplay[_0x119b02(0x1c4)][_0x119b02(0x167)]=function(_0x5058b5,_0x711282){const _0x3a24d0=_0x119b02;this[_0x3a24d0(0x1c6)]['y']+=_0x711282;let _0x4e37d3=Math[_0x3a24d0(0x1c1)](0x0,this[_0x3a24d0(0x187)]-this[_0x3a24d0(0x1c8)]);this[_0x3a24d0(0x1c6)]['y']=this[_0x3a24d0(0x1c6)]['y']['clamp'](0x0,_0x4e37d3);},Window_CreditsDisplay[_0x119b02(0x1c4)][_0x119b02(0x235)]=function(_0x4b727d,_0x5b0d93){const _0x23d647=_0x119b02;this['origin']['y']+=_0x5b0d93;let _0x10e7cc=Math['max'](0x0,this[_0x23d647(0x187)]-this[_0x23d647(0x1c8)]);this['origin']['y']=this['origin']['y'][_0x23d647(0x209)](0x0,_0x10e7cc);};
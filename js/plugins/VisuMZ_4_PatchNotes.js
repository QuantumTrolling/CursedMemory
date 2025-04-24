//=============================================================================
// VisuStella MZ - Patch Notes
// VisuMZ_4_PatchNotes.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_PatchNotes = true;

var VisuMZ = VisuMZ || {};
VisuMZ.PatchNotes = VisuMZ.PatchNotes || {};
VisuMZ.PatchNotes.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.00] [PatchNotes]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Page
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin grants your players the ability to access Patch Notes from the
 * game itself. Being able to tell your players what you've changed from inside
 * the game can make all the difference in the player experience. This plugin
 * lets players access Patch Notes from the title screen, the main menu, or
 * from a Plugin Command ran inside the game.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Adds "Patch Notes" to the Title and/or Main Menu command windows.
 * * Create any number of patch notes listings to display various patches in.
 * * Patch Note listings can use text codes to allow for lots of customization.
 * * Normal scrolling and fast scrolling can be done with the keyboard.
 * * Mouse scrolling is also possible via touch controls.
 * * Access the "Patch Notes" page from the game via Plugin Command.
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
 * Scene: Open Patch Notes
 * - Opens Patch Notes.
 * - CANNOT be used inside of battle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Enable Patch Notes in Menu?
 * - Enables/disables Patch Notes inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Patch Notes inside the main menu.
 *
 * ---
 *
 * System: Show Patch Notes in Menu?
 * - Shows/hides Patch Notes inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Patch Notes inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Patch notes displayed in the menu.
 *
 * ---
 *
 * Patch Notes
 * 
 *   Title:
 *   - The name of this patch note listed.
 *   - Text codes allowed.
 * 
 *   Credits Text:
 *   - Text displayed for this patch note listing.
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
 *   - Name of the 'Patch Notes' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Patch Notes' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Patch Notes' option to the Main Menu by default?
 * 
 *   Show in Title Command?:
 *   - Add 'Patch Notes' the Title Command Window?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_PatchNotes.
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
 * List Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Display Window
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
 * Version 1.00 Official Release Date: December 21, 2022
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
 * @command SceneOpenPatchNotes
 * @text Scene: Open Patch Notes
 * @desc Opens Patch Notes.
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
 * @command SystemEnablePatchNotesMenu
 * @text System: Enable PatchNotes in Menu?
 * @desc Enables/disables PatchNotes menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables PatchNotes menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowPatchNotesMenu
 * @text System: Show PatchNotes in Menu?
 * @desc Shows/hides PatchNotes menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides PatchNotes menu inside the main menu.
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
 * @param PatchNotes
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param PatchNotes:arraystruct
 * @text Patch Notes
 * @type struct<PatchNote>[]
 * @desc Patch notes displayed in the menu.
 * @default ["{\"Title:str\":\"\\\\I[164]【2023.01.01】 Happy New Year\",\"Text:json\":\"\\\"\\\\\\\\{Happy New Year Update\\\\\\\\}\\\\n\\\\n\\\\\\\\c[5]Gameplay Changes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[6]Balance Changes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[24]Buffs\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[2]Nerfs\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[27]Bug Fixes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[4]Additional Notes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\"\"}","{\"Title:str\":\"\\\\I[163]【2022.12.31】 New Year's Eve\",\"Text:json\":\"\\\"\\\\\\\\{New Year's Eve Update\\\\\\\\}\\\\n\\\\n\\\\\\\\c[5]Gameplay Changes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[6]Balance Changes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[24]Buffs\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[2]Nerfs\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[27]Bug Fixes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[4]Additional Notes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\"\"}","{\"Title:str\":\"\\\\I[162]【2022.12.01】 Sample Patch Notes\",\"Text:json\":\"\\\"\\\\\\\\{Sample Patch Notes Update\\\\\\\\}\\\\n\\\\n\\\\\\\\c[5]Gameplay Changes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[6]Balance Changes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[24]Buffs\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[2]Nerfs\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[27]Bug Fixes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[4]Additional Notes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\"\"}"]
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Main Menu settings for Patch Notes.
 * @default {"Name:str":"Patch Notes","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true","ShowTitleCommand:eval":"true"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Patch Notes.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"ButtonAssist":"","SlowScroll:str":"Scroll","FastScroll:str":"Fast Scroll"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc These settings let you adjust the windows displayed for this plugin.
 * @default {"CommandWindow":"","CommandWindow_BgType:num":"0","CommandWindow_RectJS:func":"\"const fw = Math.max(720, Math.floor(Graphics.boxWidth * 0.75));\\n\\nconst ww = Math.max(fw - 300, 480);\\nconst wh = this.calcWindowHeight(10, true);\\nconst wx = Math.floor((Graphics.boxWidth - ww) / 2);\\nconst wy = Math.floor((Graphics.boxHeight - wh) / 2);\\n\\nreturn new Rectangle(wx, wy, ww, wh);\"","DisplayWindow":"","DisplayWindow_BgType:num":"0","DisplayWindow_Buffers":"","DisplayWindow_BufferTop:num":"1","DisplayWindow_BufferBottom:num":"1","DisplayWindow_CenterWidth:num":"816","Scrolling":"","Slow":"","SlowScrollSpeed:num":"8","SlowSoundFreq:num":"8","Fast":"","FastScrollSpeed:num":"32","FastSoundFreq:num":"4","DisplayWindow_RectJS:func":"\"const ww = Graphics.boxWidth;\\nconst wh = this.mainAreaHeight();\\nconst wx = 0;\\nconst wy = this.mainAreaTop();\\n\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * PatchNote Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PatchNote:
 *
 * @param Title:str
 * @text Patch Note Title
 * @desc The name of this patch note listed.
 * Text codes allowed.
 * @default \I[83]【YYYY.MM.DD】 Patch Notes
 *
 * @param Text:json
 * @text Credits Text
 * @type note
 * @desc Text displayed for this patch note listing.
 * Text codes allowed.
 * @default "\\c[5]Gameplay Changes\\c[0]\n\n\\c[5]Gameplay Changes\\c[0]\n•Insert text here\n•Insert text here\n•Insert text here\n•Insert text here\n\n\\c[6]Balance Changes\\c[0]\n•Insert text here\n•Insert text here\n•Insert text here\n•Insert text here\n\n\\c[24]Buffs\\c[0]\n•Insert text here\n•Insert text here\n•Insert text here\n•Insert text here\n\n\\c[2]Nerfs\\c[0]\n•Insert text here\n•Insert text here\n•Insert text here\n•Insert text here\n\n\\c[27]Bug Fixes\\c[0]\n•Insert text here\n•Insert text here\n•Insert text here\n•Insert text here\n\n\\c[4]Additional Notes\\c[0]\n•Insert text here\n•Insert text here\n•Insert text here\n•Insert text here"
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
 * @desc Name of the 'Patch Notes' option in the Main Menu.
 * @default Patch Notes
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Patch Notes' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Patch Notes' option to the Main Menu by default?
 * @default true
 *
 * @param ShowTitleCommand:eval
 * @text Show in Title Command?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Patch Notes' the Title Command Window?
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
 * @param CommandWindow
 * @text List Window
 *
 * @param CommandWindow_BgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const fw = Math.max(720, Math.floor(Graphics.boxWidth * 0.75));\n\nconst ww = Math.max(fw - 300, 480);\nconst wh = this.calcWindowHeight(10, true);\nconst wx = Math.floor((Graphics.boxWidth - ww) / 2);\nconst wy = Math.floor((Graphics.boxHeight - wh) / 2);\n\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param DisplayWindow
 * @text Display Window
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
 * @default "const ww = Graphics.boxWidth;\nconst wh = this.mainAreaHeight();\nconst wx = 0;\nconst wy = this.mainAreaTop();\n\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x15ce70=_0x5d6c;(function(_0x22a390,_0x55c9e6){const _0xecccbc=_0x5d6c,_0x1e42cb=_0x22a390();while(!![]){try{const _0x1435b2=-parseInt(_0xecccbc(0x1c8))/0x1+-parseInt(_0xecccbc(0x157))/0x2+-parseInt(_0xecccbc(0x14a))/0x3*(-parseInt(_0xecccbc(0x1c6))/0x4)+parseInt(_0xecccbc(0x14b))/0x5+-parseInt(_0xecccbc(0x1e4))/0x6*(parseInt(_0xecccbc(0x1a9))/0x7)+parseInt(_0xecccbc(0x1b0))/0x8*(-parseInt(_0xecccbc(0x149))/0x9)+parseInt(_0xecccbc(0x1b6))/0xa;if(_0x1435b2===_0x55c9e6)break;else _0x1e42cb['push'](_0x1e42cb['shift']());}catch(_0x497200){_0x1e42cb['push'](_0x1e42cb['shift']());}}}(_0x3204,0xd0939));function _0x3204(){const _0x17cda8=['show','_PatchNotes_MainMenu','pagedown','addLoadListener','activate','2940340asVqRJ','map','PatchNotes','refresh','height','innerHeight','buttonAssistText3','playCursorSound','pXqtl','down','FastScroll','SlowScroll','BgFilename1','addChild','DisplayWindow_RectJS','ShowTitleCommand','buttonAssistText1','scaleSprite','oVrsN','includes','resetTextColor','changePaintOpacity','IyEoa','constructor','return\x200','MainMenu','_list','filter','TOP_LINE_BUFFER','pop','BOTTOM_LINE_BUFFER','resetFontSettings','ygoMZ','Name','setMainMenuPatchNotesEnabled','loadTitle2','STRUCT','pvXNV','name','buttonAssistKey1','splice','isSceneBattle','buttonAssistKey3','isPressed','JFoFa','format','FastSoundFreq','Show','status','Window_MenuCommand_addOriginalCommands','addPatchNotesCommandAutomatically','DisplayWindow_BufferTop','boxWidth','ARRAYFUNC','FUNC','isMainMenuPatchNotesVisible','_backSprite2','commandPatchNotes','cancel','getInputMultiButtonStrings','ShowMainMenu','PATCHNOTES_ADD_COMMAND','createCommandWindow','scrollToBottom','DisplayWindow_CenterWidth','processCursorMove','qJCbM','currentExt','version','patchNotes','addPatchNotesCommand','FAST_SOUND_FREQUENCY','EnableMainMenu','bind','FAST_SCROLL_SPEED','onCommandPatchNotes','createContents','bitmap','scrollToTop','drawMessageText','SystemEnablePatchNotesMenu','create','21SqvJZU','frameCount','active','_displayWindow','exit','BG_TYPE','buttonAssistKey4','4552muTFhm','SnapshotOpacity','onDisplayCancel','Settings','NUM','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','12294840seUezN','Game_System_initialize','initPatchNotesMainMenu','push','origin','isPatchNotesCommandVisible','deactivate','setHandler','clamp','registerCommand','Window','Vocab','options','match','updateOrigin','addOriginalCommands','1864140GtkXWu','call','883612LfBNdd','CENTER_WIDTH','_backSprite1','innerWidth','ARRAYNUM','DisplayWindow_BufferBottom','BgFilename2','Scene_Title_createCommandWindow','centerSprite','ARRAYSTRUCT','tWPjr','Scene_Menu_createCommandWindow','NjziJ','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','processSlowScroll','contentsHeight','setScrollAccel','qILam','DisplayWindow_BgType','EVAL','setText','commandWindowRect','CommandWindow_RectJS','trim','setBackgroundType','rhQwG','createBackground','isMainMenuPatchNotesEnabled','919662dUzRXL','PatchNotesFastScroll','close','JLzTR','prototype','Text','calculateTextHeight','LIST','nPHLv','parse','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','xQDKC','min','toUpperCase','adjustSprite','drawItem','Window_TitleCommand_makeCommandList','commandName','_allTextHeight','useDigitGroupingEx','loadTitle1','addWindow','isPatchNotesCommandEnabled','ARRAYSTR','displayWindowRect','itemLineRect','isCommandEnabled','drawAllText','shown','pageup','floor','createDisplayWindow','max','lineHeight','drawTextEx','mainAreaTop','BgSettings','kiWso','smoothScrollBy','calcWindowHeight','mainAreaHeight','ARRAYEVAL','_text','JSON','enabled','_scene','createCustomBackgroundImages','helpAreaHeight','end','findSymbol','_commandWindow','parameters','tWWKf','SLOW_SCROLL_SPEED','Title','isTriggered','isAutoColorAffected','PatchNotesMenuCommand','hide','CommandWindow_BgType','processFastScroll','2871MFZsxv','6aeqezY','8439495VggaHm','initialize','PatchNotesScroll','addCommand','makeCommandList','SLOW_SOUND_FREQUENCY','ConvertParams'];_0x3204=function(){return _0x17cda8;};return _0x3204();}var label=_0x15ce70(0x159),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x15ce70(0x172)](function(_0x4e9aa7){const _0x156105=_0x15ce70;return _0x4e9aa7[_0x156105(0x187)]&&_0x4e9aa7['description'][_0x156105(0x16a)]('['+label+']');})[0x0];VisuMZ[label][_0x15ce70(0x1b3)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x15ce70(0x151)]=function(_0x23b85b,_0x40704d){const _0x46d536=_0x15ce70;for(const _0x5d44eb in _0x40704d){if(_0x5d44eb['match'](/(.*):(.*)/i)){if(_0x46d536(0x1d2)==='tWPjr'){const _0x5bbb80=String(RegExp['$1']),_0x23a83b=String(RegExp['$2'])[_0x46d536(0x1f1)]()[_0x46d536(0x1df)]();let _0x270c82,_0x3bcb14,_0xc4d4e0;switch(_0x23a83b){case _0x46d536(0x1b4):_0x270c82=_0x40704d[_0x5d44eb]!==''?Number(_0x40704d[_0x5d44eb]):0x0;break;case _0x46d536(0x1cc):_0x3bcb14=_0x40704d[_0x5d44eb]!==''?JSON[_0x46d536(0x1ed)](_0x40704d[_0x5d44eb]):[],_0x270c82=_0x3bcb14['map'](_0x2107d2=>Number(_0x2107d2));break;case _0x46d536(0x1db):_0x270c82=_0x40704d[_0x5d44eb]!==''?eval(_0x40704d[_0x5d44eb]):null;break;case _0x46d536(0x20d):_0x3bcb14=_0x40704d[_0x5d44eb]!==''?JSON[_0x46d536(0x1ed)](_0x40704d[_0x5d44eb]):[],_0x270c82=_0x3bcb14[_0x46d536(0x158)](_0x6b745=>eval(_0x6b745));break;case _0x46d536(0x20f):_0x270c82=_0x40704d[_0x5d44eb]!==''?JSON['parse'](_0x40704d[_0x5d44eb]):'';break;case'ARRAYJSON':_0x3bcb14=_0x40704d[_0x5d44eb]!==''?JSON[_0x46d536(0x1ed)](_0x40704d[_0x5d44eb]):[],_0x270c82=_0x3bcb14['map'](_0x47f69a=>JSON[_0x46d536(0x1ed)](_0x47f69a));break;case _0x46d536(0x18d):_0x270c82=_0x40704d[_0x5d44eb]!==''?new Function(JSON['parse'](_0x40704d[_0x5d44eb])):new Function(_0x46d536(0x16f));break;case _0x46d536(0x18c):_0x3bcb14=_0x40704d[_0x5d44eb]!==''?JSON[_0x46d536(0x1ed)](_0x40704d[_0x5d44eb]):[],_0x270c82=_0x3bcb14[_0x46d536(0x158)](_0x1b42a2=>new Function(JSON[_0x46d536(0x1ed)](_0x1b42a2)));break;case'STR':_0x270c82=_0x40704d[_0x5d44eb]!==''?String(_0x40704d[_0x5d44eb]):'';break;case _0x46d536(0x1fb):_0x3bcb14=_0x40704d[_0x5d44eb]!==''?JSON[_0x46d536(0x1ed)](_0x40704d[_0x5d44eb]):[],_0x270c82=_0x3bcb14[_0x46d536(0x158)](_0xa2199a=>String(_0xa2199a));break;case _0x46d536(0x17b):_0xc4d4e0=_0x40704d[_0x5d44eb]!==''?JSON[_0x46d536(0x1ed)](_0x40704d[_0x5d44eb]):{},_0x270c82=VisuMZ[_0x46d536(0x151)]({},_0xc4d4e0);break;case _0x46d536(0x1d1):_0x3bcb14=_0x40704d[_0x5d44eb]!==''?JSON[_0x46d536(0x1ed)](_0x40704d[_0x5d44eb]):[],_0x270c82=_0x3bcb14[_0x46d536(0x158)](_0x5c0fab=>VisuMZ[_0x46d536(0x151)]({},JSON[_0x46d536(0x1ed)](_0x5c0fab)));break;default:continue;}_0x23b85b[_0x5bbb80]=_0x270c82;}else{const _0x40c32c=_0x5e9a3e[_0x46d536(0x21a)]||'',_0x1ee144=_0x1a9978['Text']||'';this['addCommand'](_0x40c32c,_0x46d536(0x19c),!![],_0x1ee144);}}}return _0x23b85b;},(_0x27b8b9=>{const _0x45b461=_0x15ce70,_0x467997=_0x27b8b9[_0x45b461(0x17d)];for(const _0x1fdbc9 of dependencies){if(!Imported[_0x1fdbc9]){if('tWWKf'===_0x45b461(0x218)){alert(_0x45b461(0x1b5)[_0x45b461(0x184)](_0x467997,_0x1fdbc9)),SceneManager[_0x45b461(0x1ad)]();break;}else return _0x252add[_0x45b461(0x1e3)]();}}const _0x280e9c=_0x27b8b9['description'];if(_0x280e9c['match'](/\[Version[ ](.*?)\]/i)){const _0x1e1f60=Number(RegExp['$1']);_0x1e1f60!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x45b461(0x184)](_0x467997,_0x1e1f60)),SceneManager['exit']());}if(_0x280e9c[_0x45b461(0x1c3)](/\[Tier[ ](\d+)\]/i)){if(_0x45b461(0x17c)!==_0x45b461(0x17c))this[_0x45b461(0x216)][_0x45b461(0x1e6)](),_0x2b7e96[_0x45b461(0x1b9)](_0x281a0e);else{const _0x3af03d=Number(RegExp['$1']);if(_0x3af03d<tier){if(_0x45b461(0x1e7)==='EVYKR')return _0xf4402d['PatchNotesScroll'];else alert(_0x45b461(0x1ee)[_0x45b461(0x184)](_0x467997,_0x3af03d,tier)),SceneManager[_0x45b461(0x1ad)]();}else tier=Math[_0x45b461(0x204)](_0x3af03d,tier);}}VisuMZ[_0x45b461(0x151)](VisuMZ[label][_0x45b461(0x1b3)],_0x27b8b9[_0x45b461(0x217)]);})(pluginData),PluginManager[_0x15ce70(0x1bf)](pluginData[_0x15ce70(0x17d)],'SceneOpenPatchNotes',_0x5cbf8e=>{const _0x4ea9f7=_0x15ce70;if(SceneManager[_0x4ea9f7(0x180)]())return;SceneManager[_0x4ea9f7(0x1b9)](Scene_PatchNotes);}),PluginManager[_0x15ce70(0x1bf)](pluginData[_0x15ce70(0x17d)],_0x15ce70(0x1a7),_0x36f163=>{const _0x1b45d1=_0x15ce70;VisuMZ[_0x1b45d1(0x151)](_0x36f163,_0x36f163),$gameSystem[_0x1b45d1(0x179)](_0x36f163['Enable']);}),PluginManager[_0x15ce70(0x1bf)](pluginData['name'],'SystemShowPatchNotesMenu',_0x5421a8=>{const _0x15a56b=_0x15ce70;VisuMZ[_0x15a56b(0x151)](_0x5421a8,_0x5421a8),$gameSystem['setMainMenuPatchNotesVisible'](_0x5421a8[_0x15a56b(0x186)]);}),TextManager[_0x15ce70(0x21d)]=VisuMZ['PatchNotes'][_0x15ce70(0x1b3)][_0x15ce70(0x170)][_0x15ce70(0x178)],TextManager[_0x15ce70(0x14d)]=VisuMZ[_0x15ce70(0x159)][_0x15ce70(0x1b3)]['Vocab'][_0x15ce70(0x162)],TextManager[_0x15ce70(0x1e5)]=VisuMZ[_0x15ce70(0x159)]['Settings'][_0x15ce70(0x1c1)][_0x15ce70(0x161)],SceneManager['isSceneBattle']=function(){const _0xf35b1a=_0x15ce70;return this['_scene']&&this[_0xf35b1a(0x211)][_0xf35b1a(0x16e)]===Scene_Battle;},VisuMZ[_0x15ce70(0x159)][_0x15ce70(0x1b7)]=Game_System[_0x15ce70(0x1e8)][_0x15ce70(0x14c)],Game_System['prototype'][_0x15ce70(0x14c)]=function(){const _0x3ef639=_0x15ce70;VisuMZ[_0x3ef639(0x159)]['Game_System_initialize'][_0x3ef639(0x1c7)](this),this[_0x3ef639(0x1b8)]();},Game_System[_0x15ce70(0x1e8)][_0x15ce70(0x1b8)]=function(){const _0x349d8b=_0x15ce70;this[_0x349d8b(0x153)]={'shown':VisuMZ[_0x349d8b(0x159)]['Settings']['MainMenu'][_0x349d8b(0x193)],'enabled':VisuMZ[_0x349d8b(0x159)]['Settings'][_0x349d8b(0x170)][_0x349d8b(0x19f)]};},Game_System['prototype']['isMainMenuPatchNotesVisible']=function(){const _0x479e08=_0x15ce70;if(this[_0x479e08(0x153)]===undefined)this[_0x479e08(0x1b8)]();return this[_0x479e08(0x153)]['shown'];},Game_System[_0x15ce70(0x1e8)]['setMainMenuPatchNotesVisible']=function(_0x2ce9af){const _0x352e2c=_0x15ce70;if(this[_0x352e2c(0x153)]===undefined)this[_0x352e2c(0x1b8)]();this['_PatchNotes_MainMenu'][_0x352e2c(0x200)]=_0x2ce9af;},Game_System[_0x15ce70(0x1e8)][_0x15ce70(0x1e3)]=function(){const _0x4a1f4b=_0x15ce70;if(this[_0x4a1f4b(0x153)]===undefined)this[_0x4a1f4b(0x1b8)]();return this[_0x4a1f4b(0x153)][_0x4a1f4b(0x210)];},Game_System['prototype'][_0x15ce70(0x179)]=function(_0xa7ff97){const _0x5d18ed=_0x15ce70;if(this['_PatchNotes_MainMenu']===undefined)this[_0x5d18ed(0x1b8)]();this['_PatchNotes_MainMenu'][_0x5d18ed(0x210)]=_0xa7ff97;},VisuMZ[_0x15ce70(0x159)][_0x15ce70(0x1cf)]=Scene_Title[_0x15ce70(0x1e8)][_0x15ce70(0x195)],Scene_Title[_0x15ce70(0x1e8)][_0x15ce70(0x195)]=function(){const _0x588c12=_0x15ce70;VisuMZ['PatchNotes'][_0x588c12(0x1cf)][_0x588c12(0x1c7)](this),this[_0x588c12(0x216)][_0x588c12(0x1bd)](_0x588c12(0x19c),this[_0x588c12(0x190)]['bind'](this));},Scene_Title[_0x15ce70(0x1e8)][_0x15ce70(0x190)]=function(){const _0x12037c=_0x15ce70;this[_0x12037c(0x216)][_0x12037c(0x1e6)](),SceneManager[_0x12037c(0x1b9)](Scene_PatchNotes);},VisuMZ[_0x15ce70(0x159)][_0x15ce70(0x1d3)]=Scene_Menu[_0x15ce70(0x1e8)][_0x15ce70(0x195)],Scene_Menu[_0x15ce70(0x1e8)][_0x15ce70(0x195)]=function(){const _0x3f1e6f=_0x15ce70;VisuMZ[_0x3f1e6f(0x159)][_0x3f1e6f(0x1d3)][_0x3f1e6f(0x1c7)](this);const _0x12bd2a=this[_0x3f1e6f(0x216)];_0x12bd2a[_0x3f1e6f(0x1bd)](_0x3f1e6f(0x19c),this[_0x3f1e6f(0x190)][_0x3f1e6f(0x1a0)](this));},Scene_Menu[_0x15ce70(0x1e8)][_0x15ce70(0x190)]=function(){const _0x38bb87=_0x15ce70;SceneManager[_0x38bb87(0x1b9)](Scene_PatchNotes);};function Scene_PatchNotes(){const _0x3d3370=_0x15ce70;this[_0x3d3370(0x14c)](...arguments);}Scene_PatchNotes[_0x15ce70(0x1e8)]=Object[_0x15ce70(0x1a8)](Scene_MenuBase['prototype']),Scene_PatchNotes[_0x15ce70(0x1e8)][_0x15ce70(0x16e)]=Scene_PatchNotes,Scene_PatchNotes['prototype'][_0x15ce70(0x14c)]=function(){const _0x47288d=_0x15ce70;Scene_MenuBase[_0x47288d(0x1e8)][_0x47288d(0x14c)][_0x47288d(0x1c7)](this);},Scene_PatchNotes[_0x15ce70(0x1e8)][_0x15ce70(0x213)]=function(){return 0x0;},Scene_PatchNotes['prototype'][_0x15ce70(0x1a8)]=function(){const _0x170a9d=_0x15ce70;Scene_MenuBase['prototype'][_0x170a9d(0x1a8)][_0x170a9d(0x1c7)](this),this[_0x170a9d(0x195)](),this['createDisplayWindow']();},Scene_PatchNotes[_0x15ce70(0x1e8)][_0x15ce70(0x195)]=function(){const _0x47b6d1=_0x15ce70,_0x231dfe=this[_0x47b6d1(0x1dd)](),_0x588774=new Window_PatchNotesList(_0x231dfe);_0x588774['setHandler'](_0x47b6d1(0x19c),this[_0x47b6d1(0x1a2)][_0x47b6d1(0x1a0)](this)),_0x588774[_0x47b6d1(0x1bd)](_0x47b6d1(0x191),this['popScene']['bind'](this)),this[_0x47b6d1(0x1f9)](_0x588774),this[_0x47b6d1(0x216)]=_0x588774,_0x588774[_0x47b6d1(0x1e0)](Window_PatchNotesList[_0x47b6d1(0x1ae)]);},Scene_PatchNotes[_0x15ce70(0x1e8)][_0x15ce70(0x1dd)]=function(){const _0x348ad2=_0x15ce70;if(VisuMZ[_0x348ad2(0x159)][_0x348ad2(0x1b3)][_0x348ad2(0x1c0)][_0x348ad2(0x1de)])return VisuMZ['PatchNotes'][_0x348ad2(0x1b3)][_0x348ad2(0x1c0)][_0x348ad2(0x1de)]['call'](this);const _0x5cae3b=Math[_0x348ad2(0x204)](0x2d0,Math[_0x348ad2(0x202)](Graphics[_0x348ad2(0x18b)]*0.75)),_0x105508=Math[_0x348ad2(0x204)](_0x5cae3b-0x12c,0x1e0),_0x2395d6=this[_0x348ad2(0x20b)](0xa,!![]),_0x59fb71=Math[_0x348ad2(0x202)]((Graphics[_0x348ad2(0x18b)]-_0x105508)/0x2),_0x44564b=Math['floor']((Graphics['boxHeight']-_0x2395d6)/0x2);return new Rectangle(_0x59fb71,_0x44564b,_0x105508,_0x2395d6);},Scene_PatchNotes[_0x15ce70(0x1e8)][_0x15ce70(0x203)]=function(){const _0x3e961b=_0x15ce70,_0xb6de9a=this[_0x3e961b(0x1fc)](),_0xf59558=new Window_PatchNotesDisplay(_0xb6de9a);_0xf59558[_0x3e961b(0x146)](),_0xf59558[_0x3e961b(0x1bc)](),_0xf59558[_0x3e961b(0x1bd)](_0x3e961b(0x191),this['onDisplayCancel']['bind'](this)),this[_0x3e961b(0x1f9)](_0xf59558),this[_0x3e961b(0x1ac)]=_0xf59558,_0xf59558[_0x3e961b(0x1e0)](Window_PatchNotesDisplay[_0x3e961b(0x1ae)]);},Scene_PatchNotes['prototype'][_0x15ce70(0x1fc)]=function(){const _0x1e9ff0=_0x15ce70;if(VisuMZ['PatchNotes'][_0x1e9ff0(0x1b3)][_0x1e9ff0(0x1c0)][_0x1e9ff0(0x165)]){if('rhQwG'===_0x1e9ff0(0x1e1))return VisuMZ[_0x1e9ff0(0x159)]['Settings'][_0x1e9ff0(0x1c0)][_0x1e9ff0(0x165)]['call'](this);else this[_0x1e9ff0(0x196)](!![]);}const _0xef0ea1=Graphics[_0x1e9ff0(0x18b)],_0xeb747e=this[_0x1e9ff0(0x20c)](),_0x58f517=0x0,_0x172cf7=this[_0x1e9ff0(0x207)]();return new Rectangle(_0x58f517,_0x172cf7,_0xef0ea1,_0xeb747e);},Scene_PatchNotes[_0x15ce70(0x1e8)]['onCommandPatchNotes']=function(){const _0x141c80=_0x15ce70,_0x2823f0=this[_0x141c80(0x216)][_0x141c80(0x19a)]();this[_0x141c80(0x1ac)][_0x141c80(0x1dc)](_0x2823f0),this[_0x141c80(0x216)][_0x141c80(0x146)](),this[_0x141c80(0x216)][_0x141c80(0x1bc)](),this['_displayWindow']['show'](),this[_0x141c80(0x1ac)][_0x141c80(0x156)]();},Scene_PatchNotes[_0x15ce70(0x1e8)][_0x15ce70(0x1b2)]=function(){const _0x558757=_0x15ce70;this[_0x558757(0x216)][_0x558757(0x152)](),this[_0x558757(0x216)]['activate'](),this['_displayWindow'][_0x558757(0x146)](),this['_displayWindow'][_0x558757(0x1bc)]();},Scene_PatchNotes['prototype'][_0x15ce70(0x17e)]=function(){const _0x28eb69=_0x15ce70;if(this[_0x28eb69(0x1ac)]&&this['_displayWindow'][_0x28eb69(0x1ab)]){if(_0x28eb69(0x1d4)!==_0x28eb69(0x1d4))_0x275cd4[_0x28eb69(0x1e8)][_0x28eb69(0x1a8)][_0x28eb69(0x1c7)](this),this[_0x28eb69(0x195)](),this[_0x28eb69(0x203)]();else return TextManager[_0x28eb69(0x192)](_0x28eb69(0x201),_0x28eb69(0x154));}else{if(_0x28eb69(0x1ec)!==_0x28eb69(0x1ec)){const _0x4bf22b=this['_commandWindow'][_0x28eb69(0x19a)]();this[_0x28eb69(0x1ac)][_0x28eb69(0x1dc)](_0x4bf22b),this[_0x28eb69(0x216)][_0x28eb69(0x146)](),this['_commandWindow']['deactivate'](),this[_0x28eb69(0x1ac)][_0x28eb69(0x152)](),this[_0x28eb69(0x1ac)][_0x28eb69(0x156)]();}else return'';}},Scene_PatchNotes['prototype'][_0x15ce70(0x181)]=function(){const _0x7ea019=_0x15ce70;if(this[_0x7ea019(0x1ac)]&&this[_0x7ea019(0x1ac)][_0x7ea019(0x1ab)])return TextManager[_0x7ea019(0x192)]('up','down');else{if(_0x7ea019(0x199)==='BxpPO'){_0x4bd302[_0x7ea019(0x159)][_0x7ea019(0x1d3)][_0x7ea019(0x1c7)](this);const _0x8d3801=this['_commandWindow'];_0x8d3801[_0x7ea019(0x1bd)](_0x7ea019(0x19c),this[_0x7ea019(0x190)]['bind'](this));}else return'';}},Scene_PatchNotes['prototype'][_0x15ce70(0x1af)]=function(){const _0x4c34c4=_0x15ce70;return this[_0x4c34c4(0x1ac)]&&this[_0x4c34c4(0x1ac)]['active']?'':Scene_MenuBase['prototype'][_0x4c34c4(0x1af)][_0x4c34c4(0x1c7)](this);},Scene_PatchNotes[_0x15ce70(0x1e8)][_0x15ce70(0x167)]=function(){const _0x242f63=_0x15ce70;return TextManager[_0x242f63(0x1e5)];},Scene_PatchNotes[_0x15ce70(0x1e8)][_0x15ce70(0x15d)]=function(){return TextManager['PatchNotesScroll'];},Scene_PatchNotes[_0x15ce70(0x1e8)]['createBackground']=function(){const _0x1c3a2f=_0x15ce70;Scene_MenuBase['prototype'][_0x1c3a2f(0x1e2)][_0x1c3a2f(0x1c7)](this),this['setBackgroundOpacity'](this['getBackgroundOpacity']()),this[_0x1c3a2f(0x212)]();},Scene_PatchNotes[_0x15ce70(0x1e8)]['getBackgroundOpacity']=function(){const _0x146a00=_0x15ce70;return VisuMZ[_0x146a00(0x159)][_0x146a00(0x1b3)][_0x146a00(0x208)][_0x146a00(0x1b1)];},Scene_PatchNotes['prototype'][_0x15ce70(0x212)]=function(){const _0x534a46=_0x15ce70,_0x1e5d0c=VisuMZ[_0x534a46(0x159)][_0x534a46(0x1b3)][_0x534a46(0x208)];if(_0x1e5d0c&&(_0x1e5d0c['BgFilename1']!==''||_0x1e5d0c[_0x534a46(0x1ce)]!=='')){if(_0x534a46(0x183)==='JFoFa')this[_0x534a46(0x1ca)]=new Sprite(ImageManager[_0x534a46(0x1f8)](_0x1e5d0c[_0x534a46(0x163)])),this['_backSprite2']=new Sprite(ImageManager[_0x534a46(0x17a)](_0x1e5d0c[_0x534a46(0x1ce)])),this[_0x534a46(0x164)](this[_0x534a46(0x1ca)]),this['addChild'](this[_0x534a46(0x18f)]),this[_0x534a46(0x1ca)]['bitmap']['addLoadListener'](this[_0x534a46(0x1f2)][_0x534a46(0x1a0)](this,this['_backSprite1'])),this['_backSprite2'][_0x534a46(0x1a4)][_0x534a46(0x155)](this[_0x534a46(0x1f2)][_0x534a46(0x1a0)](this,this[_0x534a46(0x18f)]));else{const _0x236f3d=_0x1d6e37(_0x187ab1['$1']);_0x236f3d!==_0x5273c6[_0x2a89d2][_0x534a46(0x19b)]&&(_0x14ad2c(_0x534a46(0x1d5)['format'](_0x5b1ff8,_0x236f3d)),_0x3c113b['exit']());}}},Scene_PatchNotes['prototype'][_0x15ce70(0x1f2)]=function(_0x4a8394){const _0x29d27d=_0x15ce70;this[_0x29d27d(0x168)](_0x4a8394),this[_0x29d27d(0x1d0)](_0x4a8394);},VisuMZ[_0x15ce70(0x159)][_0x15ce70(0x188)]=Window_MenuCommand[_0x15ce70(0x1e8)]['addOriginalCommands'],Window_MenuCommand[_0x15ce70(0x1e8)][_0x15ce70(0x1c5)]=function(){const _0x3e91b7=_0x15ce70;VisuMZ[_0x3e91b7(0x159)][_0x3e91b7(0x188)]['call'](this),this['addPatchNotesCommand']();},Window_MenuCommand[_0x15ce70(0x1e8)]['addPatchNotesCommand']=function(){const _0x1eeead=_0x15ce70;if(!this[_0x1eeead(0x189)]())return;if(!this['isPatchNotesCommandVisible']())return;const _0x3593de=TextManager[_0x1eeead(0x21d)],_0x46794c=this[_0x1eeead(0x1fa)]();this[_0x1eeead(0x14e)](_0x3593de,'patchNotes',_0x46794c);},Window_MenuCommand[_0x15ce70(0x1e8)][_0x15ce70(0x189)]=function(){return Imported['VisuMZ_1_MainMenuCore']?![]:!![];},Window_MenuCommand[_0x15ce70(0x1e8)][_0x15ce70(0x1bb)]=function(){const _0x47a376=_0x15ce70;return $gameSystem[_0x47a376(0x18e)]();},Window_MenuCommand['prototype'][_0x15ce70(0x1fa)]=function(){const _0x1e3f09=_0x15ce70;return $gameSystem[_0x1e3f09(0x1e3)]();},Window_TitleCommand[_0x15ce70(0x194)]=VisuMZ[_0x15ce70(0x159)]['Settings']['MainMenu'][_0x15ce70(0x166)],VisuMZ[_0x15ce70(0x159)][_0x15ce70(0x1f4)]=Window_TitleCommand[_0x15ce70(0x1e8)][_0x15ce70(0x14f)],Window_TitleCommand['prototype']['makeCommandList']=function(){const _0x52fd4b=_0x15ce70;VisuMZ['PatchNotes'][_0x52fd4b(0x1f4)][_0x52fd4b(0x1c7)](this),this['addPatchNotesCommand']();},Window_TitleCommand[_0x15ce70(0x1e8)][_0x15ce70(0x19d)]=function(){const _0x5a9f1d=_0x15ce70;if(!Window_TitleCommand[_0x5a9f1d(0x194)])return;if(this['findSymbol'](_0x5a9f1d(0x19c))>=0x0)return;const _0x4b812c=TextManager[_0x5a9f1d(0x21d)],_0x247093=!![];this['addCommand'](_0x4b812c,_0x5a9f1d(0x19c),_0x247093);const _0x240025=this[_0x5a9f1d(0x215)](_0x5a9f1d(0x1c2));if(_0x240025>0x0){if('uaSyh'!=='uaSyh')return _0x24156b[_0x5a9f1d(0x187)]&&_0x2015c6['description'][_0x5a9f1d(0x16a)]('['+_0x542a15+']');else{const _0x5dfce0=this[_0x5a9f1d(0x171)][_0x5a9f1d(0x174)]();this[_0x5a9f1d(0x171)][_0x5a9f1d(0x17f)](_0x240025,0x0,_0x5dfce0);}}};function _0x5d6c(_0x31b88f,_0x3e255d){const _0x320454=_0x3204();return _0x5d6c=function(_0x5d6c8d,_0x375f72){_0x5d6c8d=_0x5d6c8d-0x146;let _0x1b56a5=_0x320454[_0x5d6c8d];return _0x1b56a5;},_0x5d6c(_0x31b88f,_0x3e255d);}function Window_PatchNotesList(){this['initialize'](...arguments);}Window_PatchNotesList[_0x15ce70(0x1e8)]=Object['create'](Window_Command['prototype']),Window_PatchNotesList['prototype'][_0x15ce70(0x16e)]=Window_PatchNotesList,Window_PatchNotesList['BG_TYPE']=VisuMZ[_0x15ce70(0x159)][_0x15ce70(0x1b3)][_0x15ce70(0x1c0)][_0x15ce70(0x147)],Window_PatchNotesList['LIST']=VisuMZ[_0x15ce70(0x159)][_0x15ce70(0x1b3)]['PatchNotes'],Window_PatchNotesList[_0x15ce70(0x1e8)]['initialize']=function(_0x11d4f7){const _0x127798=_0x15ce70;Window_Command[_0x127798(0x1e8)][_0x127798(0x14c)][_0x127798(0x1c7)](this,_0x11d4f7);},Window_PatchNotesList['prototype']['useDigitGrouping']=function(){return![];},Window_PatchNotesList[_0x15ce70(0x1e8)][_0x15ce70(0x1f7)]=function(){return![];},Window_PatchNotesList['prototype']['makeCommandList']=function(){const _0x233cae=_0x15ce70;for(const _0x46e644 of Window_PatchNotesList[_0x233cae(0x1eb)]){if('SzoCP'===_0x233cae(0x177))return _0x3b45a1[_0x233cae(0x204)](this[_0x233cae(0x1f6)],0x1);else{const _0x39de7d=_0x46e644[_0x233cae(0x21a)]||'',_0x4d1b82=_0x46e644[_0x233cae(0x1e9)]||'';this[_0x233cae(0x14e)](_0x39de7d,_0x233cae(0x19c),!![],_0x4d1b82);}}},Window_PatchNotesList[_0x15ce70(0x1e8)][_0x15ce70(0x1f3)]=function(_0x2aef1f){const _0x548777=_0x15ce70,_0x1cd46a=this[_0x548777(0x1fd)](_0x2aef1f);this[_0x548777(0x16b)](),this[_0x548777(0x16c)](this[_0x548777(0x1fe)](_0x2aef1f)),this[_0x548777(0x206)](this[_0x548777(0x1f5)](_0x2aef1f),_0x1cd46a['x'],_0x1cd46a['y'],_0x1cd46a['width']);};function Window_PatchNotesDisplay(){const _0x2246d2=_0x15ce70;this[_0x2246d2(0x14c)](...arguments);}Window_PatchNotesDisplay[_0x15ce70(0x1e8)]=Object[_0x15ce70(0x1a8)](Window_Selectable[_0x15ce70(0x1e8)]),Window_PatchNotesDisplay[_0x15ce70(0x1e8)][_0x15ce70(0x16e)]=Window_PatchNotesDisplay,Window_PatchNotesDisplay[_0x15ce70(0x1ae)]=VisuMZ[_0x15ce70(0x159)][_0x15ce70(0x1b3)]['Window'][_0x15ce70(0x1da)],Window_PatchNotesDisplay[_0x15ce70(0x173)]=VisuMZ[_0x15ce70(0x159)][_0x15ce70(0x1b3)][_0x15ce70(0x1c0)][_0x15ce70(0x18a)]??0x1,Window_PatchNotesDisplay[_0x15ce70(0x175)]=VisuMZ[_0x15ce70(0x159)][_0x15ce70(0x1b3)][_0x15ce70(0x1c0)][_0x15ce70(0x1cd)]??0x1,Window_PatchNotesDisplay['CENTER_WIDTH']=VisuMZ[_0x15ce70(0x159)][_0x15ce70(0x1b3)][_0x15ce70(0x1c0)][_0x15ce70(0x197)]??0x1,Window_PatchNotesDisplay['SLOW_SCROLL_SPEED']=VisuMZ[_0x15ce70(0x159)]['Settings'][_0x15ce70(0x1c0)]['SlowScrollSpeed']||0x1,Window_PatchNotesDisplay[_0x15ce70(0x1a1)]=VisuMZ['PatchNotes'][_0x15ce70(0x1b3)]['Window']['FastScrollSpeed']||0x1,Window_PatchNotesDisplay[_0x15ce70(0x150)]=VisuMZ[_0x15ce70(0x159)]['Settings'][_0x15ce70(0x1c0)]['SlowSoundFreq']||0x1,Window_PatchNotesDisplay[_0x15ce70(0x19e)]=VisuMZ[_0x15ce70(0x159)][_0x15ce70(0x1b3)][_0x15ce70(0x1c0)][_0x15ce70(0x185)]||0x1,Window_PatchNotesDisplay['prototype'][_0x15ce70(0x14c)]=function(_0x3fdb6a){const _0x52e132=_0x15ce70;this[_0x52e132(0x20e)]='',Window_Selectable[_0x52e132(0x1e8)][_0x52e132(0x14c)][_0x52e132(0x1c7)](this,_0x3fdb6a),this[_0x52e132(0x1f6)]=0x0,this[_0x52e132(0x15a)](),this[_0x52e132(0x156)]();},Window_PatchNotesDisplay[_0x15ce70(0x1e8)][_0x15ce70(0x21c)]=function(){return!![];},Window_PatchNotesDisplay[_0x15ce70(0x1e8)][_0x15ce70(0x15a)]=function(){const _0x47f93d=_0x15ce70;this['calculateTextHeight'](),this[_0x47f93d(0x1a3)](),this[_0x47f93d(0x1ff)]();},Window_PatchNotesDisplay[_0x15ce70(0x1e8)][_0x15ce70(0x1ea)]=function(){const _0x4ee77c=_0x15ce70,_0xa440=this[_0x4ee77c(0x20e)];this[_0x4ee77c(0x1f6)]=0x0,this[_0x4ee77c(0x1f6)]=this['textSizeEx'](_0xa440)[_0x4ee77c(0x15b)];const _0x91d851=this[_0x4ee77c(0x205)](),_0x6b8c44=Window_PatchNotesDisplay[_0x4ee77c(0x173)]*_0x91d851,_0x2eff99=Window_PatchNotesDisplay['BOTTOM_LINE_BUFFER']*_0x91d851;this[_0x4ee77c(0x1f6)]+=_0x6b8c44+_0x2eff99;},Window_PatchNotesDisplay[_0x15ce70(0x1e8)][_0x15ce70(0x1d7)]=function(){const _0x366228=_0x15ce70;return Math['max'](this[_0x366228(0x1f6)],0x1);},Window_PatchNotesDisplay['prototype'][_0x15ce70(0x1dc)]=function(_0x3b8458){const _0x4e35f1=_0x15ce70;if(_0x3b8458===this[_0x4e35f1(0x20e)])return;this[_0x4e35f1(0x20e)]=_0x3b8458,this['refresh']();},Window_PatchNotesDisplay['prototype'][_0x15ce70(0x1ff)]=function(){const _0x3d63e0=_0x15ce70,_0x112283=this[_0x3d63e0(0x20e)];this[_0x3d63e0(0x176)](),this['drawMessageText'](_0x112283);if(Imported['VisuMZ_1_MessageCore'])this['resetWordWrap']();this[_0x3d63e0(0x1a5)]();},Window_PatchNotesDisplay[_0x15ce70(0x1e8)][_0x15ce70(0x1a6)]=function(_0x25dc83){const _0x38d658=_0x15ce70,_0x4c32b6=Math[_0x38d658(0x1f0)](this[_0x38d658(0x1cb)],Window_PatchNotesDisplay[_0x38d658(0x1c9)]||this[_0x38d658(0x1cb)]),_0x39bf2d=Math[_0x38d658(0x202)]((this['innerWidth']-_0x4c32b6)/0x2),_0x53cf6c=this[_0x38d658(0x205)]()*Window_PatchNotesDisplay['TOP_LINE_BUFFER'];this['drawTextEx'](_0x25dc83,_0x39bf2d,_0x53cf6c,_0x4c32b6);},Window_PatchNotesDisplay[_0x15ce70(0x1e8)][_0x15ce70(0x1c4)]=function(){},Window_PatchNotesDisplay['prototype'][_0x15ce70(0x198)]=function(){const _0x452a09=_0x15ce70;if(!this[_0x452a09(0x1ab)])return;if(Input['isPressed'](_0x452a09(0x160)))this[_0x452a09(0x1d6)](!![]);else{if(Input[_0x452a09(0x182)]('up'))this[_0x452a09(0x1d6)](![]);else{if(Input[_0x452a09(0x182)](_0x452a09(0x154))){if(_0x452a09(0x169)===_0x452a09(0x209)){const _0x1d6b66=_0x3cde00(_0x402a65['$1']);_0x1d6b66<_0x2b12c5?(_0x3a9537(_0x452a09(0x1ee)[_0x452a09(0x184)](_0x504cf1,_0x1d6b66,_0x4fb822)),_0x11b558['exit']()):_0x4e41e6=_0x28e6e5[_0x452a09(0x204)](_0x1d6b66,_0x3972da);}else this[_0x452a09(0x148)](!![]);}else{if(Input['isPressed'](_0x452a09(0x201))){if(_0x452a09(0x15f)!==_0x452a09(0x1ef))this[_0x452a09(0x148)](![]);else{if(this['_PatchNotes_MainMenu']===_0x4168dd)this[_0x452a09(0x1b8)]();return this[_0x452a09(0x153)][_0x452a09(0x210)];}}else{if(Input[_0x452a09(0x21b)]('home'))this[_0x452a09(0x1a5)](!![]);else{if(Input[_0x452a09(0x21b)](_0x452a09(0x214))){if(_0x452a09(0x16d)===_0x452a09(0x1d9))return this[_0x452a09(0x1ac)]&&this[_0x452a09(0x1ac)][_0x452a09(0x1ab)]?_0x2e2aa3[_0x452a09(0x192)]('up',_0x452a09(0x160)):'';else this[_0x452a09(0x196)](!![]);}}}}}}},Window_PatchNotesDisplay[_0x15ce70(0x1e8)][_0x15ce70(0x1d6)]=function(_0x50840e){const _0x2dba99=_0x15ce70;let _0x5bc539=this['origin']['y'];this['origin']['y']+=(_0x50840e?0x1:-0x1)*Window_PatchNotesDisplay[_0x2dba99(0x219)];let _0x53174a=Math[_0x2dba99(0x204)](0x0,this['_allTextHeight']-this[_0x2dba99(0x15c)]);this[_0x2dba99(0x1ba)]['y']=this[_0x2dba99(0x1ba)]['y'][_0x2dba99(0x1be)](0x0,_0x53174a);if(_0x5bc539!==this[_0x2dba99(0x1ba)]['y']&&Graphics[_0x2dba99(0x1aa)]%Window_PatchNotesDisplay[_0x2dba99(0x150)]===0x0)this[_0x2dba99(0x15e)]();},Window_PatchNotesDisplay[_0x15ce70(0x1e8)]['processFastScroll']=function(_0x1ad9a9){const _0x4fbfbf=_0x15ce70;let _0x119ddd=this[_0x4fbfbf(0x1ba)]['y'];this[_0x4fbfbf(0x1ba)]['y']+=(_0x1ad9a9?0x1:-0x1)*Window_PatchNotesDisplay[_0x4fbfbf(0x1a1)];let _0x34958c=Math['max'](0x0,this[_0x4fbfbf(0x1f6)]-this[_0x4fbfbf(0x15c)]);this['origin']['y']=this[_0x4fbfbf(0x1ba)]['y'][_0x4fbfbf(0x1be)](0x0,_0x34958c);if(_0x119ddd!==this[_0x4fbfbf(0x1ba)]['y']&&Graphics[_0x4fbfbf(0x1aa)]%Window_PatchNotesDisplay[_0x4fbfbf(0x19e)]===0x0)this[_0x4fbfbf(0x15e)]();},Window_PatchNotesDisplay[_0x15ce70(0x1e8)][_0x15ce70(0x1a5)]=function(_0x34c7d4){const _0x2e9a80=_0x15ce70;let _0x48aab5=this[_0x2e9a80(0x1ba)]['y'];this[_0x2e9a80(0x1ba)]['y']=0x0;if(_0x34c7d4&&_0x48aab5!==this[_0x2e9a80(0x1ba)]['y'])this[_0x2e9a80(0x15e)]();},Window_PatchNotesDisplay['prototype'][_0x15ce70(0x196)]=function(_0x246d9d){const _0x543e93=_0x15ce70;let _0xe3bbd9=this[_0x543e93(0x1ba)]['y'],_0x5ac67e=Math[_0x543e93(0x204)](0x0,this[_0x543e93(0x1f6)]-this['innerHeight']);this[_0x543e93(0x1ba)]['y']=_0x5ac67e;if(_0x246d9d&&_0xe3bbd9!==this[_0x543e93(0x1ba)]['y'])this[_0x543e93(0x15e)]();},Window_PatchNotesDisplay[_0x15ce70(0x1e8)][_0x15ce70(0x20a)]=function(_0x296243,_0x29903d){const _0x4cebd2=_0x15ce70;this[_0x4cebd2(0x1ba)]['y']+=_0x29903d;let _0x35e1db=Math[_0x4cebd2(0x204)](0x0,this['_allTextHeight']-this[_0x4cebd2(0x15c)]);this[_0x4cebd2(0x1ba)]['y']=this[_0x4cebd2(0x1ba)]['y']['clamp'](0x0,_0x35e1db);},Window_PatchNotesDisplay[_0x15ce70(0x1e8)][_0x15ce70(0x1d8)]=function(_0x407aa2,_0x424c1c){const _0x1229d4=_0x15ce70;this[_0x1229d4(0x1ba)]['y']+=_0x424c1c;let _0x180e55=Math[_0x1229d4(0x204)](0x0,this[_0x1229d4(0x1f6)]-this[_0x1229d4(0x15c)]);this[_0x1229d4(0x1ba)]['y']=this[_0x1229d4(0x1ba)]['y'][_0x1229d4(0x1be)](0x0,_0x180e55);};
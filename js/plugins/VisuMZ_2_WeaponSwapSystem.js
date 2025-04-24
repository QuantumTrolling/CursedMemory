//=============================================================================
// VisuStella MZ - Weapon Swap System
// VisuMZ_2_WeaponSwapSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_WeaponSwapSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaponSwapSystem = VisuMZ.WeaponSwapSystem || {};
VisuMZ.WeaponSwapSystem.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.10] [WeaponSwapSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weapon_Swap_System_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds in a Weapon Swap System. Actors can equip a different
 * weapon for each weapon type available for use. These weapons can be swapped
 * to and from during the middle of a battle. Swapping weapons can let the
 * player's team adapt to certain situations better or giving them the ability
 * to hit certain weapon weaknesses in battle.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actors can equip multiple weapons, one for each weapon type.
 * * These weapons can be switched during the middle of battle.
 * * Choose to display only equippable weapon types in the Equip Menu or all
 *   of the possible weapon types.
 * * Have certain skills switch over to different equipped weapons when
 *   performing them.
 * * Shortcut keys to allow switching between weapon types easily when
 *   selecting commands.
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
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_ItemsEquipsCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
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
 * Dual Wielding
 * 
 * Dual Wielding properties have been disabled to allow for the Weapon Swap
 * System. There are too many conflicts between it and the Weapon Swap System.
 * There is simply no way around it.
 *
 * ---
 * 
 * Required Weapons
 * 
 * RPG Maker MZ's skills allowed for Required Weapons and needed the actor to
 * have any of the said weapon type(s) equipped upon usage. This function has
 * now been changed. Now, as long as the actor has any of the weapon types
 * available and a weapon attached to it, the actor will be able to use the
 * skill without needing to switch to that weapon first.
 * 
 * When using the skill, the actor will switch to the first available weapon
 * type if needed as long as it is a requirement.
 * 
 * ---
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
 * VisuMZ_1_ItemsEquipsCore
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
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
 * === Skill Usage-Related Notetags ===
 * 
 * ---
 *
 * <Require Any Weapon>
 *
 * - Used for: Skill Notetags
 * - Requires the actor to have any weapon equipped in order to use the skill,
 *   regardless of the weapon's type.
 * - This does not affect enemies.
 *
 * ---
 *
 * <Switch to Weapon Type: id>
 * <Switch to Weapon Type: name>
 *
 * - Used for: Skill Notetags
 * - When using the skill, the actor will switch to the equipped weapon of the
 *   matching type.
 * - Replace 'id' with a number representing the weapon type's ID.
 * - Replace 'name' with the name of the weapon type.
 * - Weapon types are not the same as weapons. Weapon types are found in the
 *   Database > Types tab.
 * - This does not affect enemies.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * There's not too many mechanics that can be modified through the Plugin
 * Parameters, but the setting here will at least let you ease up on testing
 * battles from the database.
 *
 * ---
 *
 * Battle Test
 * 
 *   Equip All Weapons?:
 *   - Do you want to equip one of each weapon type during battle tests for
 *     all actors?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * The following Plugin Parameters are dedicated towards modifying the UI
 * elements added through this plugin.
 *
 * ---
 *
 * Attack Command
 * 
 *   Change Attack Icon?:
 *   - Change the Attack command to show the weapon?
 *   - Or have it represent the Attack skill?
 * 
 *   Swap Shortcut?:
 *   - Allow shortcut to switch weapons while selecting the Attack command?
 * 
 *     Show Arrows?:
 *     - Show arrows to the left and right of the Attack command for an easy
 *       reminder of the shortcut?
 *
 * ---
 *
 * Swap Command
 * 
 *   Show Command?:
 *   - Show the Swap weapon command in the Actor Command Window?
 *   - The Swap weapon command will be listed by default after the Attack
 *     command.
 *     - If you do not have the Attack command, it will not be shown unless you
 *       add "Weapon Swap" to the battle command list.
 * 
 * 
 *   Swap Icon:
 *   - What icon do you wish to use to represent the Swap command for the
 *     Actor Command Window?
 * 
 *   Swap Name:
 *   - What text do you want to use to represent the Swap command for the
 *     Actor Command Window?
 * 
 *   Help: Swap:
 *   - Help text for Swap command.
 *
 * ---
 *
 * Equip Scene
 * 
 *   Show Unequippable?:
 *   - Show all weapon types in the equip scene?
 *   - Or only just the equippable ones?
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
 * Version 1.10: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused item duplication with the "Clear Equipment"
 *    command found in the equip scene. Fix made by Irina.
 * ** Fixed a bug that caused the optimize command to not factor in the weapons
 *    held by the current actor. Fix made by Irina.
 * 
 * Version 1.09: December 9, 2021
 * * Compatibility Update!
 * ** Changing classes via the Class Change System plugin should no longer dupe
 *    weapons under specific circumstances. Update made by Olivia.
 * * Feature Update!
 * ** Upon an actor's turn to input a command, if the actor is barefisted while
 *    having available swap weapons, it will default the choice to the first
 *    available slot. Update made by Olivia.
 * ** The barefisted equip would occur before because when navigating the equip
 *    menu, the switched weapon type would change to whatever is selected. If
 *    you go to a slot without any weapons equipped, it would be as having a
 *    barehanded setup.
 * 
 * Version 1.08: July 9, 2021
 * * Bug Fixes!
 * ** Removed a potential equipment duplication exploit with changing classes.
 *    Fix made by Olivia.
 * 
 * Version 1.07: July 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: June 25, 2021
 * * Bug Fixes!
 * ** Have the "Shortcut" plugin parameter off will no longer cause crashes.
 *    Fix made by Olivia.
 * 
 * Version 1.05: June 4, 2021
 * * Bug Fixes!
 * ** Fixed weapon swap notetags to have them occur naturally. Fix by Arisu.
 * 
 * Version 1.04: May 28, 2021
 * * Bug Fixes!
 * ** Cache clear will now occur when using automatic switching to update any
 *    cached stats for actors. Fix made by Olivia.
 * 
 * Version 1.03: May 21, 2021
 * * Bug Fixes!
 * ** Weapon type requirements for skills will the weapon type to be equipped
 *    as one of the available slots. Fix made by Olivia.
 * 
 * Version 1.02: April 16, 2021
 * * Bug Fixes!
 * ** Shortcut arrows should no longer be visible when an actor has only one
 *    weapon to swap to and from. Fix made by Olivia.
 * * Compatibility Update!
 * ** Weapon Swap System should now be compatible with the Item and Equip
 *    Core's non-removable types setting. Update made by Irina.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Shortcut arrow now accounts for changes in the actor command window size
 *    when updated post-initialization. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Documentation updated for the "UI Settings Plugin Parameters":
 * *** The Swap weapon command will be listed by default after the Attack
 *     command.
 * **** If you do not have the Attack command, it will not be shown unless you
 *      add "Weapon Swap" to the battle command list.
 * * New Features!
 * ** New Plugin Parameters added by Olivia!
 * *** Plugin Parameters > UI Settings > Help: Swap
 * **** Help text for Swap command.
 *
 * Version 1.00 Official Release Date: May 3, 2021
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
 * @param WeaponSwapSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings for the Weapon Swap System.
 * @default {"Testing":"","BattleTestAllWeapons:eval":"true"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc UI settings for the Weapon Swap System.
 * @default {"AttackCommand":"","ChangeAttackIcon:eval":"true","SwapShortcut:eval":"true","ShowShortcutArrows:eval":"true","SwapCommand":"","ShowSwapCommand:eval":"false","SwapCommandIcon:num":"76","SwapCommandName:str":"Swap","EquipScene":"","ShowUnequippable:eval":"false"}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Testing
 * @text Battle Test
 *
 * @param BattleTestAllWeapons:eval
 * @text Equip All Weapons?
 * @parent Testing
 * @type boolean
 * @on All Weapons
 * @off Just Settings
 * @desc Do you want to equip one of each weapon type during
 * battle tests for all actors?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param AttackCommand
 * @text Attack Command
 *
 * @param ChangeAttackIcon:eval
 * @text Change Attack Icon?
 * @parent AttackCommand
 * @type boolean
 * @on Represent Weapon
 * @off Represent Skill Icon
 * @desc Change the Attack command to show the weapon?
 * Or have it represent the Attack skill?
 * @default true
 *
 * @param SwapShortcut:eval
 * @text Swap Shortcut?
 * @parent AttackCommand
 * @type boolean
 * @on Allow Shortcut
 * @off Don't Use
 * @desc Allow shortcut to switch weapons while selecting
 * the Attack command?
 * @default true
 *
 * @param ShowShortcutArrows:eval
 * @text Show Arrows?
 * @parent SwapShortcut:eval
 * @type boolean
 * @on Show Arrows
 * @off Hide Arrows
 * @desc Show arrows to the left and right of the Attack
 * command for an easy reminder of the shortcut?
 * @default true
 *
 * @param SwapCommand
 * @text Swap Command
 *
 * @param ShowSwapCommand:eval
 * @text Show Command?
 * @parent SwapCommand
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show the Swap weapon command in the
 * Actor Command Window?
 * @default true
 *
 * @param SwapCommandIcon:num
 * @text Swap Icon
 * @parent SwapCommand
 * @desc What icon do you wish to use to represent the
 * Swap command for the Actor Command Window?
 * @default 76
 *
 * @param SwapCommandName:str
 * @text Swap Name
 * @parent SwapCommand
 * @desc What text do you want to use to represent the
 * Swap command for the Actor Command Window?
 * @default Swap
 *
 * @param BattleHelpSwap:json
 * @text Help: Swap
 * @parent SwapCommand
 * @type note
 * @desc Help text for Swap command.
 * @default "Switch out the current weapon."
 *
 * @param EquipScene
 * @text Equip Scene
 *
 * @param ShowUnequippable:eval
 * @text Show Unequippable?
 * @parent EquipScene
 * @type boolean
 * @on All Weapons
 * @off Equippable Weapons
 * @desc Show all weapon types in the equip scene?
 * Or only just the equippable ones?
 * @default false
 *
 */
//=============================================================================

const _0x431701=_0x258a;function _0x258a(_0x32aef0,_0x5da29d){const _0x413b57=_0x413b();return _0x258a=function(_0x258a1e,_0x2a7a25){_0x258a1e=_0x258a1e-0x161;let _0x325fa4=_0x413b57[_0x258a1e];return _0x325fa4;},_0x258a(_0x32aef0,_0x5da29d);}(function(_0x5a22cb,_0x244ec5){const _0x438c9a=_0x258a,_0x66a6e7=_0x5a22cb();while(!![]){try{const _0x415536=-parseInt(_0x438c9a(0x278))/0x1*(parseInt(_0x438c9a(0x165))/0x2)+parseInt(_0x438c9a(0x1b7))/0x3+-parseInt(_0x438c9a(0x175))/0x4+parseInt(_0x438c9a(0x1b3))/0x5+parseInt(_0x438c9a(0x1c3))/0x6+parseInt(_0x438c9a(0x20c))/0x7*(parseInt(_0x438c9a(0x22d))/0x8)+-parseInt(_0x438c9a(0x24e))/0x9;if(_0x415536===_0x244ec5)break;else _0x66a6e7['push'](_0x66a6e7['shift']());}catch(_0x2594d1){_0x66a6e7['push'](_0x66a6e7['shift']());}}}(_0x413b,0x595b5));var label=_0x431701(0x21f),tier=tier||0x0,dependencies=[_0x431701(0x1ab),_0x431701(0x180)],pluginData=$plugins[_0x431701(0x238)](function(_0xa4297b){const _0x2bf859=_0x431701;return _0xa4297b[_0x2bf859(0x1bb)]&&_0xa4297b['description'][_0x2bf859(0x26a)]('['+label+']');})[0x0];function _0x413b(){const _0x426b07=['Window_ActorCommand','hMmRN','isEquipChangeOk','setup','1539570GAlxEG','wzIAZ','constructor','\x5cI[%1]%2','1438971HhRZpt','Window_EquipItem_setSlotId','_weaponSwapShortcutSprite_Left','JSON','status','_swappingWeapon','JtaXr','gXpZI','swapWeaponPrevious','_itemWindow','getAllEquippedSwapWeapons','_currentweapontype','2943930oFNOXv','lJqmG','WEAPON_SWAP_SHORTCUT_ENABLE','Game_Battler_requestMotionRefresh','loadSystem','Window_EquipSlot_itemAt','qWIRt','callUpdateHelp','itemAtWeaponSwap','DniHP','Game_Actor_isDualWield','isDualWield','remove','cursorRight','requiredWtypeId2','WEAPON_SWAP_SHOW_COMMAND','playEquip','Scene_Battle_createActorCommandWindow','Window_EquipItem_includes','tradeItemWithParty','call','Window_ActorCommand_updateHelp','isEnabledWeaponSwap','iconIndex','RegExp','_wtypeID','gainItem','addChild','STR','onWeaponSwap','log','length','TBZqI','STRUCT','prototype','commandStyle','setFrame','cursorLeft','BEwaa','refreshMotion','ARRAYEVAL','WEAPON_SWAP_SHORTCUT_ARROWS','TkIoX','zHJbd','NUM','Window_EquipItem_initialize','CLTiV','MCCrF','requestMotionRefresh','concat','Window_EquipSlot_maxItems','contentsOpacity','updateSwapToNextAvailableWeapon','BattleTestAllWeapons','height','swapWeaponCmd','GHFxL','replace','NqMHT','_helpWindow','Window_EquipSlot_equipSlotIndex','setupBattleTestMembers','ConvertParams','anchor','QHUhz','DkWVq','YlGyX','meetsAnyWeaponEquippedCondition','KrEMi','getSwapWeapon','optimizeSwappableWeapons','ANhCc','HTHQH','7EmCSIS','push','equipSlots','alterAttackCommand','_firstOfEachWeaponType','isWeapon','weapons','qSXNG','_cache','processShiftRemoveShortcut','SwitchWpnTypeNum','maxItemsWeaponSwap','findSymbol','jlCJV','Window_StatusBase_actorSlotName','isClearEquipOk','SwitchWpnTypeStr','Window_EquipSlot_isEnabled','ARRAYJSON','WeaponSwapSystem','parameters','setObject','ARRAYFUNC','equipSlotIndex','ARRAYSTRUCT','nonRemovableEtypes','addCommand','Mechanics','opacity','bind','Window_ActorCommand_setup','parse','map','2874608AElzZV','optimizeEquipments','zRpAC','ChangeAttackIcon','Window','setSwapWeapon','tpFEz','cjKQO','Game_Party_setupBattleTestMembers','Settings','format','filter','MISSING\x20WEAPON\x20TYPE:\x20%1','_checkingWeaponSwaps','Game_Actor_isClearEquipOk','WEAPON_SWAP_BATTLE_TEST_ALL_WEAPONS','ThJMp','Game_BattlerBase_meetsSkillConditions','AJmtQ','bitmap','etypeId','calcEquipItemPerformance','FUNC','isWeaponSwapShortcutEnabled','ARRAYSTR','createActorCommandWindow','canWeaponSwap','clearSwappableWeapons','unshift','createWeaponSwapTypes','Switch\x20out\x20the\x20current\x20weapon.','text','GWhKm','4535874pvWARw','ERVMV','ShowUnequippable','executeEquipChange','klNbt','toUpperCase','jLwGV','setSlotId','YidTa','_wtypeIDs','swapWeaponNext','_weaponSwapShortcutSprite_Right','Game_Action_applyGlobal','rugav','isWeaponSwapShortcutVisible','ARRAYNUM','rnrxU','clearEquipments','actor','attack','updateArrows','trim','enKyf','subject','Game_Actor_clearEquipments','wQSei','Window_ActorCommand_addAttackCommand','itemAt','includes','initWeaponSwapSystem','changeEquip','_scene','nmcAd','getWtypeIdWithName','swapWeaponHelp','_actor','weaponSwapTypes','object','indexOf','initialize','getFirstOfEachWeaponType','UnbaV','5PzABoZ','setHandler','Sprite_Actor_refreshMotion','addWeaponSwapCommand','FXPQu','_slotId','battleCommandName','WLQSY','version','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','removeWeaponSwapCommand','changeWeapon','bjJOx','switchToWeaponType','round','EVAL','SuOIC','RequireAnyWpn','battler','_currentWeaponType','weaponTypes','note','return\x200','_swapWeapons','visible','249974qfXLsg','applyGlobal','refresh','Game_Actor_optimizeEquipments','BARE\x20HANDS','performWeaponSwap','TYSKl','item','Window_EquipItem_isEnabled','activate','isEnabled','SwapCommandIcon','actorSlotNameWeaponSwap','_tempActor','jKkcy','playOkSound','570504NXhCXC','isSkill','performAttack','_equips','maxItems','WEAPON_SWAP_CHANGE_ATTACK_ICON','parent','_list','requiredWtypeId1','Game_Actor_isOptimizeEquipOk','updateHelp','VisuMZ_1_ItemsEquipsCore','ZQrAh','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','match','max','actorSlotName','padding','swapWeaponIcon','TcCEt','Window_Base_playOkSound','UJOSq','SwapCommandName','name','JsaFB','aRCYO','meetsSkillConditions','wtypeId','weaponSwap','itemRect','Game_Actor_equipSlots','isEquipWtypeOk','applyWeaponSwapAction','NAwOk','setText','RTxOT','Window_ActorCommand_initialize','isOptimizeEquipOk','exit','_statusWindow','UVnEP','rQVSV','processWeaponSwapRelease','aSKyJ','UoNtQ','width','Game_Actor_changeEquip','WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS','createWeaponSwapShortcutSprites','eWTVU','commandWeaponSwap','Game_Actor_releaseUnequippableItems','updateWeaponSwapShortcutSprites','BfTVi','VisuMZ_1_BattleCore','initEquips','currentSymbol','bestEquipWeapon'];_0x413b=function(){return _0x426b07;};return _0x413b();}VisuMZ[label][_0x431701(0x236)]=VisuMZ[label][_0x431701(0x236)]||{},VisuMZ[_0x431701(0x201)]=function(_0x15f686,_0x5c7afa){const _0x583363=_0x431701;for(const _0x4901a6 in _0x5c7afa){if(_0x4901a6[_0x583363(0x183)](/(.*):(.*)/i)){const _0x619cb3=String(RegExp['$1']),_0x3e04e9=String(RegExp['$2'])[_0x583363(0x253)]()[_0x583363(0x263)]();let _0x2973c9,_0x508922,_0x36e6e8;switch(_0x3e04e9){case _0x583363(0x1ef):_0x2973c9=_0x5c7afa[_0x4901a6]!==''?Number(_0x5c7afa[_0x4901a6]):0x0;break;case _0x583363(0x25d):_0x508922=_0x5c7afa[_0x4901a6]!==''?JSON[_0x583363(0x22b)](_0x5c7afa[_0x4901a6]):[],_0x2973c9=_0x508922[_0x583363(0x22c)](_0xfd2bb5=>Number(_0xfd2bb5));break;case _0x583363(0x287):_0x2973c9=_0x5c7afa[_0x4901a6]!==''?eval(_0x5c7afa[_0x4901a6]):null;break;case _0x583363(0x1eb):_0x508922=_0x5c7afa[_0x4901a6]!==''?JSON['parse'](_0x5c7afa[_0x4901a6]):[],_0x2973c9=_0x508922[_0x583363(0x22c)](_0x47e46b=>eval(_0x47e46b));break;case _0x583363(0x1ba):_0x2973c9=_0x5c7afa[_0x4901a6]!==''?JSON[_0x583363(0x22b)](_0x5c7afa[_0x4901a6]):'';break;case _0x583363(0x21e):_0x508922=_0x5c7afa[_0x4901a6]!==''?JSON[_0x583363(0x22b)](_0x5c7afa[_0x4901a6]):[],_0x2973c9=_0x508922[_0x583363(0x22c)](_0x419422=>JSON['parse'](_0x419422));break;case _0x583363(0x243):_0x2973c9=_0x5c7afa[_0x4901a6]!==''?new Function(JSON[_0x583363(0x22b)](_0x5c7afa[_0x4901a6])):new Function(_0x583363(0x162));break;case _0x583363(0x222):_0x508922=_0x5c7afa[_0x4901a6]!==''?JSON[_0x583363(0x22b)](_0x5c7afa[_0x4901a6]):[],_0x2973c9=_0x508922[_0x583363(0x22c)](_0x12a8f2=>new Function(JSON[_0x583363(0x22b)](_0x12a8f2)));break;case _0x583363(0x1df):_0x2973c9=_0x5c7afa[_0x4901a6]!==''?String(_0x5c7afa[_0x4901a6]):'';break;case _0x583363(0x245):_0x508922=_0x5c7afa[_0x4901a6]!==''?JSON['parse'](_0x5c7afa[_0x4901a6]):[],_0x2973c9=_0x508922[_0x583363(0x22c)](_0x5157f4=>String(_0x5157f4));break;case _0x583363(0x1e4):_0x36e6e8=_0x5c7afa[_0x4901a6]!==''?JSON[_0x583363(0x22b)](_0x5c7afa[_0x4901a6]):{},_0x2973c9=VisuMZ[_0x583363(0x201)]({},_0x36e6e8);break;case _0x583363(0x224):_0x508922=_0x5c7afa[_0x4901a6]!==''?JSON[_0x583363(0x22b)](_0x5c7afa[_0x4901a6]):[],_0x2973c9=_0x508922[_0x583363(0x22c)](_0xf562a2=>VisuMZ[_0x583363(0x201)]({},JSON['parse'](_0xf562a2)));break;default:continue;}_0x15f686[_0x619cb3]=_0x2973c9;}}return _0x15f686;},(_0x400785=>{const _0x3753b8=_0x431701,_0x807057=_0x400785[_0x3753b8(0x18c)];for(const _0x494335 of dependencies){if(!Imported[_0x494335]){if(_0x3753b8(0x233)===_0x3753b8(0x234))return![];else{alert(_0x3753b8(0x281)['format'](_0x807057,_0x494335)),SceneManager[_0x3753b8(0x19b)]();break;}}}const _0x3b7947=_0x400785['description'];if(_0x3b7947['match'](/\[Version[ ](.*?)\]/i)){if(_0x3753b8(0x18a)!==_0x3753b8(0x204)){const _0x417458=Number(RegExp['$1']);_0x417458!==VisuMZ[label][_0x3753b8(0x280)]&&(_0x3753b8(0x22f)===_0x3753b8(0x256)?this[_0x3753b8(0x1d6)](_0x8dc361,null):(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x3753b8(0x237)](_0x807057,_0x417458)),SceneManager['exit']()));}else this['_statusWindow'][_0x3753b8(0x167)]();}if(_0x3b7947['match'](/\[Tier[ ](\d+)\]/i)){const _0x420f09=Number(RegExp['$1']);if(_0x420f09<tier)alert(_0x3753b8(0x182)[_0x3753b8(0x237)](_0x807057,_0x420f09,tier)),SceneManager['exit']();else{if(_0x3753b8(0x25e)===_0x3753b8(0x25e))tier=Math[_0x3753b8(0x184)](_0x420f09,tier);else return this[_0x3753b8(0x171)](_0x35cc3d,_0x5d8d38);}}VisuMZ[_0x3753b8(0x201)](VisuMZ[label]['Settings'],_0x400785[_0x3753b8(0x220)]);})(pluginData),VisuMZ[_0x431701(0x21f)][_0x431701(0x1db)]={'RequireAnyWpn':/<(?:REQUIRE|REQUIRES) ANY (?:WEAPON|WEAPONS)>/i,'SwitchWpnTypeNum':/<(?:SWITCH|SWITCHES) TO (?:WEAPON|WEAPON TYPE|WTYPE):[ ](\d+)>/i,'SwitchWpnTypeStr':/<(?:SWITCH|SWITCHES) TO (?:WEAPON|WEAPON TYPE|WTYPE):[ ](\d+)>/i},DataManager['getFirstOfEachWeaponType']=function(){const _0x55acfd=_0x431701;if(this[_0x55acfd(0x210)])return this[_0x55acfd(0x210)];this[_0x55acfd(0x210)]=[];for(let _0x3b39df=0x1;_0x3b39df<$dataSystem[_0x55acfd(0x28c)][_0x55acfd(0x1e2)];_0x3b39df++){const _0x5dea3d=$dataWeapons[_0x55acfd(0x238)](_0x410eed=>_0x410eed&&_0x410eed['wtypeId']===_0x3b39df),_0x4e08f3=_0x5dea3d[0x0]||null;!_0x4e08f3&&(_0x55acfd(0x18d)==='JsaFB'?console['log'](_0x55acfd(0x239)['format']($dataSystem[_0x55acfd(0x28c)][_0x3b39df][_0x55acfd(0x1fc)](/\\I\[(\d+)\]/gi,''))):(_0x41d129-=_0x3e7c29,this['_wtypeID']=0x0,_0x4d3422[_0x55acfd(0x21f)][_0x55acfd(0x1b8)][_0x55acfd(0x1d7)](this,_0x2ca669))),this['_firstOfEachWeaponType'][_0x55acfd(0x20d)](_0x4e08f3);}return this[_0x55acfd(0x210)][_0x55acfd(0x1cf)](null)['remove'](undefined),this[_0x55acfd(0x210)];},DataManager[_0x431701(0x26f)]=function(_0x5ec76a){const _0x21c40e=_0x431701;_0x5ec76a=_0x5ec76a[_0x21c40e(0x253)]()['trim'](),this[_0x21c40e(0x257)]=this['_wtypeIDs']||{};if(this['_wtypeIDs'][_0x5ec76a])return this[_0x21c40e(0x257)][_0x5ec76a];for(let _0x11e426=0x1;_0x11e426<0x64;_0x11e426++){if(!$dataSystem[_0x21c40e(0x28c)][_0x11e426])continue;let _0x42546c=$dataSystem[_0x21c40e(0x28c)][_0x11e426][_0x21c40e(0x253)]()[_0x21c40e(0x263)]();_0x42546c=_0x42546c[_0x21c40e(0x1fc)](/\x1I\[(\d+)\]/gi,''),_0x42546c=_0x42546c[_0x21c40e(0x1fc)](/\\I\[(\d+)\]/gi,''),this[_0x21c40e(0x257)][_0x42546c]=_0x11e426;}return this[_0x21c40e(0x257)][_0x21c40e(0x169)]=0x0,this['_wtypeIDs'][_0x5ec76a]||0x0;},ImageManager['swapWeaponIcon']=VisuMZ['WeaponSwapSystem'][_0x431701(0x236)]['UI'][_0x431701(0x170)],TextManager[_0x431701(0x1fa)]=VisuMZ[_0x431701(0x21f)][_0x431701(0x236)]['UI'][_0x431701(0x18b)],TextManager[_0x431701(0x270)]=VisuMZ[_0x431701(0x21f)][_0x431701(0x236)]['UI']['BattleHelpSwap']??_0x431701(0x24b),VisuMZ[_0x431701(0x21f)][_0x431701(0x25a)]=Game_Action[_0x431701(0x1e5)][_0x431701(0x166)],Game_Action[_0x431701(0x1e5)][_0x431701(0x166)]=function(){const _0x143c48=_0x431701;VisuMZ[_0x143c48(0x21f)][_0x143c48(0x25a)][_0x143c48(0x1d7)](this),this[_0x143c48(0x265)]()&&this[_0x143c48(0x265)]()['isActor']()&&this[_0x143c48(0x176)]()&&(_0x143c48(0x18e)!==_0x143c48(0x188)?this[_0x143c48(0x265)]()[_0x143c48(0x195)](this[_0x143c48(0x16c)]()):(this[_0x143c48(0x285)](_0x56d262),this[_0x143c48(0x283)](null)));},VisuMZ['WeaponSwapSystem'][_0x431701(0x23e)]=Game_BattlerBase[_0x431701(0x1e5)]['meetsSkillConditions'],Game_BattlerBase['prototype'][_0x431701(0x18f)]=function(_0x4c59b0){const _0x5c6c4c=_0x431701;return VisuMZ['WeaponSwapSystem'][_0x5c6c4c(0x23e)][_0x5c6c4c(0x1d7)](this,_0x4c59b0)&&this[_0x5c6c4c(0x206)](_0x4c59b0);},Game_BattlerBase[_0x431701(0x1e5)]['meetsAnyWeaponEquippedCondition']=function(_0x1c5d71){return!![];},VisuMZ[_0x431701(0x21f)][_0x431701(0x1c6)]=Game_Battler[_0x431701(0x1e5)][_0x431701(0x1f3)],Game_Battler[_0x431701(0x1e5)]['requestMotionRefresh']=function(){const _0x2b28a0=_0x431701;if(this[_0x2b28a0(0x28a)]()&&this[_0x2b28a0(0x1bc)]){if(_0x2b28a0(0x1cc)===_0x2b28a0(0x1b0)){const _0x406efd=this[_0x2b28a0(0x212)]()[0x0];_0x406efd&&_0x2d970d&&(this[_0x2b28a0(0x1bc)]=!![],this[_0x2b28a0(0x177)]());}else return;}else _0x2b28a0(0x27f)!==_0x2b28a0(0x27f)?this[_0x2b28a0(0x1e0)](!![]):VisuMZ[_0x2b28a0(0x21f)]['Game_Battler_requestMotionRefresh']['call'](this);},Game_Actor[_0x431701(0x23c)]=VisuMZ['WeaponSwapSystem'][_0x431701(0x236)][_0x431701(0x227)][_0x431701(0x1f8)],VisuMZ[_0x431701(0x21f)]['Game_Actor_initEquips']=Game_Actor['prototype'][_0x431701(0x1ac)],Game_Actor[_0x431701(0x1e5)][_0x431701(0x1ac)]=function(_0x3a361f){const _0x46bb52=_0x431701;VisuMZ[_0x46bb52(0x21f)]['Game_Actor_initEquips'][_0x46bb52(0x1d7)](this,_0x3a361f),this[_0x46bb52(0x26b)]();},Game_Actor['prototype'][_0x431701(0x26b)]=function(){const _0x4cdbe7=_0x431701;this[_0x4cdbe7(0x163)]={};for(let _0xc2deda=0x1;_0xc2deda<$dataSystem[_0x4cdbe7(0x28c)]['length'];_0xc2deda++){'NAwOk'===_0x4cdbe7(0x196)?this[_0x4cdbe7(0x163)][_0xc2deda]=0x0:this['_weaponSwapShortcutSprite_Right']['x']=this[_0x4cdbe7(0x1a2)];}this[_0x4cdbe7(0x28b)]=0x0;for(const _0x64c5a7 of this['weapons']()){if(_0x4cdbe7(0x1bd)!==_0x4cdbe7(0x267)){if(!_0x64c5a7)continue;const _0x1c9a6c=_0x64c5a7[_0x4cdbe7(0x190)];this['_swapWeapons'][_0x1c9a6c]=_0x64c5a7['id'],this[_0x4cdbe7(0x28b)]=this[_0x4cdbe7(0x28b)]||_0x1c9a6c;}else{if(this[_0x4cdbe7(0x212)]()[_0x4cdbe7(0x1e2)]>0x0)return;const _0x1c40fc=this[_0x4cdbe7(0x1c1)](),_0x3d2443=_0x1c40fc[0x0]||null,_0x283695=_0x3d2443?_0x3d2443[_0x4cdbe7(0x190)]:0x0;this['switchToWeaponType'](_0x283695);}}},Game_Actor[_0x431701(0x1e5)][_0x431701(0x247)]=function(){const _0x2b01bc=_0x431701;return this[_0x2b01bc(0x20e)]()[_0x2b01bc(0x26a)](0x1);},VisuMZ[_0x431701(0x21f)][_0x431701(0x1cd)]=Game_Actor[_0x431701(0x1e5)][_0x431701(0x1ce)],Game_Actor[_0x431701(0x1e5)]['isDualWield']=function(){return![];},VisuMZ[_0x431701(0x21f)][_0x431701(0x193)]=Game_Actor[_0x431701(0x1e5)]['equipSlots'],Game_Actor[_0x431701(0x1e5)]['equipSlots']=function(){const _0xb5d5a6=_0x431701;let _0x46b444=VisuMZ[_0xb5d5a6(0x21f)]['Game_Actor_equipSlots'][_0xb5d5a6(0x1d7)](this);return _0x46b444[_0xb5d5a6(0x26a)](0x1)&&(_0x46b444[_0xb5d5a6(0x1cf)](0x1),_0x46b444[_0xb5d5a6(0x249)](0x1)),_0x46b444;},Game_Actor[_0x431701(0x1e5)]['weaponSwapTypes']=function(){const _0x3fe6bd=_0x431701;let _0x4dfbf3=_0x3fe6bd(0x272);if(this['checkCacheKey'](_0x4dfbf3))return this[_0x3fe6bd(0x214)][_0x4dfbf3];return this['_cache'][_0x4dfbf3]=this[_0x3fe6bd(0x24a)](),this[_0x3fe6bd(0x214)][_0x4dfbf3];},Game_Actor['prototype'][_0x431701(0x24a)]=function(){const _0x17acf1=_0x431701,_0x4919bc=[],_0x3da6c7=$dataSystem[_0x17acf1(0x28c)]['length'];for(let _0x4a28a2=0x1;_0x4a28a2<_0x3da6c7;_0x4a28a2++){if(this[_0x17acf1(0x194)](_0x4a28a2))_0x4919bc[_0x17acf1(0x20d)](_0x4a28a2);}return _0x4919bc;},Game_Actor[_0x431701(0x1e5)][_0x431701(0x208)]=function(_0xe7f7bd){const _0x1d1c57=_0x431701;if(this['_swapWeapons']===undefined){if(_0x1d1c57(0x252)!==_0x1d1c57(0x252)){const _0x4c2e45=this[_0x1d1c57(0x17c)][_0x51bed1];_0x4c2e45['name']=_0x2f75be;}else this[_0x1d1c57(0x26b)]();}return this[_0x1d1c57(0x163)][_0xe7f7bd]=this['_swapWeapons'][_0xe7f7bd]||0x0,$dataWeapons[this[_0x1d1c57(0x163)][_0xe7f7bd]]||null;},Game_Actor['prototype'][_0x431701(0x1c1)]=function(){const _0x392b6c=_0x431701;return this[_0x392b6c(0x272)]()['map'](_0x1dba26=>this[_0x392b6c(0x208)](_0x1dba26))[_0x392b6c(0x1cf)](null)[_0x392b6c(0x1cf)](undefined);},Game_Actor[_0x431701(0x1e5)][_0x431701(0x232)]=function(_0x245c5a,_0x25fc7c){const _0x230d85=_0x431701;this[_0x230d85(0x163)]===undefined&&this['initWeaponSwapSystem'](),this[_0x230d85(0x163)][_0x245c5a]=_0x25fc7c,this[_0x230d85(0x167)]();},Game_Actor[_0x431701(0x1e5)][_0x431701(0x258)]=function(){const _0x30b147=_0x431701;this[_0x30b147(0x163)]===undefined&&this['initWeaponSwapSystem']();const _0x31a347=this[_0x30b147(0x28b)],_0x794428=this[_0x30b147(0x272)]();let _0x78a32b=_0x794428[_0x30b147(0x274)](this['_currentWeaponType']);for(;;){if(_0x30b147(0x16b)!==_0x30b147(0x25b)){_0x78a32b++;if(_0x78a32b>=_0x794428['length'])_0x78a32b=0x0;if(this[_0x30b147(0x208)](_0x794428[_0x78a32b]))break;}else return this['itemAtWeaponSwap'](_0x27e260);}const _0x1ff1ea=_0x794428[_0x78a32b];this['switchToWeaponType'](_0x1ff1ea),_0x1ff1ea!==_0x31a347&&(_0x30b147(0x1e9)!=='njuKJ'?this[_0x30b147(0x1e0)](!![]):(this[_0x30b147(0x285)](_0x18a0ee),this[_0x30b147(0x283)](this[_0x30b147(0x1ae)](_0x41f493))));},Game_Actor[_0x431701(0x1e5)][_0x431701(0x1bf)]=function(){const _0x279efa=_0x431701;this[_0x279efa(0x163)]===undefined&&this[_0x279efa(0x26b)]();const _0x397413=this[_0x279efa(0x28b)],_0xa04857=this[_0x279efa(0x272)]();let _0x291ea4=_0xa04857[_0x279efa(0x274)](this[_0x279efa(0x28b)]);for(;;){_0x291ea4--;if(_0x291ea4<0x0)_0x291ea4=_0xa04857[_0x279efa(0x1e2)]-0x1;if(this[_0x279efa(0x208)](_0xa04857[_0x291ea4]))break;}const _0x24b46e=_0xa04857[_0x291ea4];this[_0x279efa(0x285)](_0x24b46e),_0x24b46e!==_0x397413&&this[_0x279efa(0x1e0)](!![]);},Game_Actor['prototype'][_0x431701(0x1e0)]=function(_0x3baf4c){const _0x336a61=_0x431701,_0x5ed583=this[_0x336a61(0x212)]()[0x0];_0x5ed583&&_0x3baf4c&&(this[_0x336a61(0x1bc)]=!![],this[_0x336a61(0x177)]());},Game_Actor[_0x431701(0x1e5)]['switchToWeaponType']=function(_0x5bf692){const _0x353638=_0x431701;if(this[_0x353638(0x163)]===undefined){if(_0x353638(0x27c)!=='FXPQu'){let _0x356de3='';if(_0x1fc346['WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS'])_0x356de3=_0x516cd8['weaponTypes'][_0x395ab4+0x1]||'';else{const _0x17df92=_0x344875[_0x353638(0x272)]()[_0x16251d];_0x356de3=_0x3776af[_0x353638(0x28c)][_0x17df92]||'';}return _0x356de3=_0x356de3[_0x353638(0x1fc)](/\\I\[(\d+)\]/gi,''),_0x356de3;}else this[_0x353638(0x26b)]();}_0x5bf692=_0x5bf692||0x0;if(!this[_0x353638(0x247)]())return;if(!this[_0x353638(0x194)](_0x5bf692))return;this[_0x353638(0x28b)]=_0x5bf692,this[_0x353638(0x163)][_0x5bf692]=this['_swapWeapons'][_0x5bf692]||0x0;const _0x5c0d67=$dataWeapons[this[_0x353638(0x163)][_0x5bf692]]||null;this[_0x353638(0x178)][0x0][_0x353638(0x221)](_0x5c0d67),this[_0x353638(0x214)]={};},VisuMZ[_0x431701(0x21f)][_0x431701(0x1a3)]=Game_Actor[_0x431701(0x1e5)][_0x431701(0x26c)],Game_Actor[_0x431701(0x1e5)]['changeEquip']=function(_0x3f3cd4,_0x1861a7){const _0x4f118f=_0x431701;if(DataManager[_0x4f118f(0x211)](_0x1861a7)||_0x3f3cd4===0x0&&this[_0x4f118f(0x247)]()){if(_0x4f118f(0x1f1)!==_0x4f118f(0x1f1))return _0x44dfa2[_0x4f118f(0x1c5)]&&this['currentSymbol']()===_0x4f118f(0x261)&&this[_0x4f118f(0x271)]&&this['_actor'][_0x4f118f(0x247)]()&&this['_actor']['getAllEquippedSwapWeapons']()[_0x4f118f(0x1e2)]>0x1;else this['changeWeapon'](_0x1861a7);}else VisuMZ[_0x4f118f(0x21f)]['Game_Actor_changeEquip']['call'](this,_0x3f3cd4,_0x1861a7);},Game_Actor['prototype'][_0x431701(0x283)]=function(_0x1959b6){const _0x47c80f=_0x431701;if(!!_0x1959b6){const _0x3ceb50=_0x1959b6[_0x47c80f(0x190)];this[_0x47c80f(0x285)](_0x3ceb50);const _0x53e9d9=this[_0x47c80f(0x212)]()[0x0];!!_0x53e9d9?this[_0x47c80f(0x1d6)](_0x1959b6,_0x53e9d9):this[_0x47c80f(0x1d6)](_0x1959b6,null),this[_0x47c80f(0x232)](_0x3ceb50,_0x1959b6['id']),this[_0x47c80f(0x285)](_0x3ceb50);}else{if(!!this[_0x47c80f(0x212)]()[0x0]){const _0x10cb2b=this[_0x47c80f(0x212)]()[0x0],_0x4780bf=_0x10cb2b[_0x47c80f(0x190)];this['switchToWeaponType'](_0x4780bf),this[_0x47c80f(0x1d6)](null,_0x10cb2b),this[_0x47c80f(0x232)](_0x4780bf,0x0),this[_0x47c80f(0x1f7)]();}}this[_0x47c80f(0x167)]();},Game_Actor['prototype'][_0x431701(0x1f7)]=function(){const _0x1157aa=_0x431701;if(this[_0x1157aa(0x212)]()[_0x1157aa(0x1e2)]>0x0)return;const _0x3e2371=this[_0x1157aa(0x1c1)](),_0x3f1bbc=_0x3e2371[0x0]||null,_0x5e3c37=_0x3f1bbc?_0x3f1bbc['wtypeId']:0x0;this['switchToWeaponType'](_0x5e3c37);},Game_Actor[_0x431701(0x1e5)][_0x431701(0x19f)]=function(_0x347f85){const _0x11c145=_0x431701;if(this[_0x11c145(0x23a)]||_0x347f85||this[_0x11c145(0x172)])return;this[_0x11c145(0x23a)]=!![];let _0x31af82=![];for(let _0x5460b2=0x1;_0x5460b2<$dataSystem[_0x11c145(0x28c)][_0x11c145(0x1e2)];_0x5460b2++){if(_0x11c145(0x1c4)===_0x11c145(0x1a6)){if(this[_0x11c145(0x210)])return this['_firstOfEachWeaponType'];this[_0x11c145(0x210)]=[];for(let _0x5e1b21=0x1;_0x5e1b21<_0x477dfb[_0x11c145(0x28c)][_0x11c145(0x1e2)];_0x5e1b21++){const _0x2fec2e=_0x4854ee['filter'](_0x593177=>_0x593177&&_0x593177[_0x11c145(0x190)]===_0x5e1b21),_0x467c86=_0x2fec2e[0x0]||null;!_0x467c86&&_0x9c7479[_0x11c145(0x1e1)](_0x11c145(0x239)[_0x11c145(0x237)](_0x21b6e8[_0x11c145(0x28c)][_0x5e1b21][_0x11c145(0x1fc)](/\\I\[(\d+)\]/gi,''))),this[_0x11c145(0x210)][_0x11c145(0x20d)](_0x467c86);}return this[_0x11c145(0x210)][_0x11c145(0x1cf)](null)['remove'](_0x18b923),this['_firstOfEachWeaponType'];}else{if(this[_0x11c145(0x194)](_0x5460b2))continue;const _0x5d05d8=this[_0x11c145(0x208)](_0x5460b2);if(!_0x5d05d8)continue;this[_0x11c145(0x163)][_0x5460b2]=0x0,$gameParty[_0x11c145(0x1dd)](_0x5d05d8,0x1),_0x31af82=!![],this[_0x11c145(0x178)][0x0][_0x11c145(0x273)]()===_0x5d05d8&&this['_equips'][0x0][_0x11c145(0x221)](null);}}if(_0x31af82){if('MhsLm'===_0x11c145(0x1f2)){if(!this[_0x11c145(0x247)]())return;if(!_0x5124f7[_0x11c145(0x21f)][_0x11c145(0x23b)][_0x11c145(0x1d7)](this,0x0))return;for(let _0x4f35a7=0x1;_0x4f35a7<_0x26b3b0[_0x11c145(0x28c)][_0x11c145(0x1e2)];_0x4f35a7++){const _0x28219c=this[_0x11c145(0x208)](_0x4f35a7);_0x28219c&&(this[_0x11c145(0x285)](_0x4f35a7),this[_0x11c145(0x283)](null));}this['refresh']();}else{const _0x5a9e5e=this[_0x11c145(0x212)]()[0x0]||null;this[_0x11c145(0x28b)]=_0x5a9e5e?_0x5a9e5e['wtypeId']:0x0,this[_0x11c145(0x167)]();}}this[_0x11c145(0x23a)]=undefined;},VisuMZ['WeaponSwapSystem'][_0x431701(0x1a8)]=Game_Actor[_0x431701(0x1e5)]['releaseUnequippableItems'],Game_Actor[_0x431701(0x1e5)]['releaseUnequippableItems']=function(_0x343551){const _0x46c063=_0x431701;this[_0x46c063(0x19f)](_0x343551),VisuMZ[_0x46c063(0x21f)]['Game_Actor_releaseUnequippableItems'][_0x46c063(0x1d7)](this,_0x343551);},Game_Actor[_0x431701(0x1e5)]['setupBattleTestWeapons']=function(){const _0x3157f4=_0x431701,_0x3a46ff=this[_0x3157f4(0x28b)],_0x3d2bd8=DataManager[_0x3157f4(0x276)]();for(const _0x1185de of this[_0x3157f4(0x272)]()){if(this[_0x3157f4(0x208)](_0x1185de))continue;const _0x4f16f5=_0x3d2bd8[_0x1185de-0x1];_0x4f16f5&&('lLZUc'!=='lLZUc'?this[_0x3157f4(0x265)]()['applyWeaponSwapAction'](this[_0x3157f4(0x16c)]()):this['setSwapWeapon'](_0x1185de,_0x4f16f5['id']));}this[_0x3157f4(0x285)](_0x3a46ff);},Game_Actor[_0x431701(0x1e5)][_0x431701(0x206)]=function(_0x1c6c83){const _0x35d7a9=_0x431701;if(_0x1c6c83&&_0x1c6c83[_0x35d7a9(0x161)][_0x35d7a9(0x183)](VisuMZ[_0x35d7a9(0x21f)][_0x35d7a9(0x1db)][_0x35d7a9(0x289)])){if(_0x35d7a9(0x1fd)!==_0x35d7a9(0x24d))return!!this['weapons']()[0x0];else{const _0x2c9bef=_0x3ea14e[_0x35d7a9(0x238)](_0x396d0a=>_0x396d0a&&_0x396d0a[_0x35d7a9(0x190)]===_0x5bdb9d),_0x3538cc=_0x2c9bef[0x0]||null;!_0x3538cc&&_0x4a21b6[_0x35d7a9(0x1e1)](_0x35d7a9(0x239)[_0x35d7a9(0x237)](_0x5bc61a[_0x35d7a9(0x28c)][_0x38eb6b][_0x35d7a9(0x1fc)](/\\I\[(\d+)\]/gi,''))),this[_0x35d7a9(0x210)][_0x35d7a9(0x20d)](_0x3538cc);}}else return _0x35d7a9(0x219)===_0x35d7a9(0x213)?!![]:!![];},Game_Actor['prototype']['isSkillWtypeOk']=function(_0x2a67c7){const _0x11a8ba=_0x431701,_0xc80cbc=_0x2a67c7[_0x11a8ba(0x17d)],_0x92f5d2=_0x2a67c7[_0x11a8ba(0x1d1)];if(_0xc80cbc===0x0&&_0x92f5d2===0x0)return!![];if(_0xc80cbc>0x0&&!this[_0x11a8ba(0x208)](_0xc80cbc))return![];if(_0x92f5d2>0x0&&!this[_0x11a8ba(0x208)](_0x92f5d2))return![];return!![];},Game_Actor[_0x431701(0x1e5)][_0x431701(0x195)]=function(_0x1f24a3){const _0x1a3a52=_0x431701;if(!DataManager['isSkill'](_0x1f24a3))return;const _0xb3e3f6=VisuMZ[_0x1a3a52(0x21f)][_0x1a3a52(0x1db)];if(_0x1f24a3[_0x1a3a52(0x161)][_0x1a3a52(0x183)](_0xb3e3f6[_0x1a3a52(0x216)])){if('glJha'!==_0x1a3a52(0x1fb)){this[_0x1a3a52(0x285)](Number(RegExp['$1']));return;}else this[_0x1a3a52(0x271)][_0x1a3a52(0x258)]();}else{if(_0x1f24a3[_0x1a3a52(0x161)][_0x1a3a52(0x183)](_0xb3e3f6[_0x1a3a52(0x21c)])){const _0x3c8883=DataManager[_0x1a3a52(0x26f)](RegExp['$1']);this[_0x1a3a52(0x285)](_0x3c8883);return;}}if(this[_0x1a3a52(0x1c2)]===_0x1f24a3[_0x1a3a52(0x17d)]||this[_0x1a3a52(0x1c2)]===_0x1f24a3[_0x1a3a52(0x1d1)])return;if(_0x1f24a3[_0x1a3a52(0x17d)]>0x0)this[_0x1a3a52(0x285)](_0x1f24a3[_0x1a3a52(0x17d)]);else _0x1f24a3[_0x1a3a52(0x1d1)]>0x0&&this[_0x1a3a52(0x285)](_0x1f24a3['requiredWtypeId2']);},VisuMZ[_0x431701(0x21f)][_0x431701(0x168)]=Game_Actor[_0x431701(0x1e5)]['optimizeEquipments'],Game_Actor[_0x431701(0x1e5)][_0x431701(0x22e)]=function(){const _0x296454=_0x431701;VisuMZ[_0x296454(0x21f)][_0x296454(0x168)][_0x296454(0x1d7)](this),this['optimizeSwappableWeapons']();},VisuMZ[_0x431701(0x21f)][_0x431701(0x17e)]=Game_Actor[_0x431701(0x1e5)]['isOptimizeEquipOk'],Game_Actor['prototype'][_0x431701(0x19a)]=function(_0x4924ea){const _0x591de7=_0x431701;if(this['canWeaponSwap']()&&_0x4924ea===0x0)return![];return VisuMZ['WeaponSwapSystem'][_0x591de7(0x17e)]['call'](this,_0x4924ea);},Game_Actor[_0x431701(0x1e5)][_0x431701(0x209)]=function(){const _0x5d3e5c=_0x431701;if(!this[_0x5d3e5c(0x247)]())return;if(!VisuMZ[_0x5d3e5c(0x21f)]['Game_Actor_isOptimizeEquipOk'][_0x5d3e5c(0x1d7)](this,0x0))return;const _0x1b4b47=this['_currentWeaponType'];for(const _0x3ac270 of this[_0x5d3e5c(0x272)]()){if('cftkX'!==_0x5d3e5c(0x19e))this[_0x5d3e5c(0x285)](_0x3ac270),this[_0x5d3e5c(0x283)](this[_0x5d3e5c(0x1ae)](_0x3ac270));else{_0x1d6064[_0x5d3e5c(0x21f)][_0x5d3e5c(0x1d4)][_0x5d3e5c(0x1d7)](this);const _0x525364=this['_actorCommandWindow'];_0x525364[_0x5d3e5c(0x279)](_0x5d3e5c(0x191),this['commandWeaponSwap']['bind'](this));}}this[_0x5d3e5c(0x285)](_0x1b4b47),this[_0x5d3e5c(0x167)]();},Game_Actor[_0x431701(0x1e5)][_0x431701(0x1ae)]=function(_0x5d1bea){const _0x260991=_0x431701,_0x349d5e=$gameParty[_0x260991(0x212)]()[_0x260991(0x1f4)](this[_0x260991(0x212)]()),_0x28df4d=_0x349d5e[_0x260991(0x238)](_0xc7e956=>_0xc7e956[_0x260991(0x190)]===_0x5d1bea);let _0x20c7d8=null,_0x5568cf=-0x3e8;for(let _0x5928f5=0x0;_0x5928f5<_0x28df4d['length'];_0x5928f5++){const _0x301279=this[_0x260991(0x242)](_0x28df4d[_0x5928f5]);_0x301279>_0x5568cf&&(_0x5568cf=_0x301279,_0x20c7d8=_0x28df4d[_0x5928f5]);}return _0x20c7d8;},VisuMZ['WeaponSwapSystem'][_0x431701(0x266)]=Game_Actor[_0x431701(0x1e5)]['clearEquipments'],Game_Actor[_0x431701(0x1e5)][_0x431701(0x25f)]=function(){const _0x34e05c=_0x431701;VisuMZ[_0x34e05c(0x21f)][_0x34e05c(0x266)][_0x34e05c(0x1d7)](this),this['clearSwappableWeapons']();},VisuMZ[_0x431701(0x21f)][_0x431701(0x23b)]=Game_Actor[_0x431701(0x1e5)][_0x431701(0x21b)],Game_Actor[_0x431701(0x1e5)][_0x431701(0x21b)]=function(_0x5eaade){const _0x1b9075=_0x431701;if(this['canWeaponSwap']()&&_0x5eaade===0x0)return![];return VisuMZ['WeaponSwapSystem'][_0x1b9075(0x23b)][_0x1b9075(0x1d7)](this,_0x5eaade);},Game_Actor[_0x431701(0x1e5)][_0x431701(0x248)]=function(){const _0x20401d=_0x431701;if(!this[_0x20401d(0x247)]())return;if(!VisuMZ[_0x20401d(0x21f)][_0x20401d(0x23b)][_0x20401d(0x1d7)](this,0x0))return;for(let _0x156fed=0x1;_0x156fed<$dataSystem[_0x20401d(0x28c)][_0x20401d(0x1e2)];_0x156fed++){if(_0x20401d(0x181)==='vEFba')_0x4dd6b0(_0x20401d(0x182)[_0x20401d(0x237)](_0xb7a493,_0x2d2eb6,_0xe7f555)),_0x41ce31[_0x20401d(0x19b)]();else{const _0x3524f2=this['getSwapWeapon'](_0x156fed);_0x3524f2&&('ThJMp'===_0x20401d(0x23d)?(this[_0x20401d(0x285)](_0x156fed),this['changeWeapon'](null)):this[_0x20401d(0x16a)](!![]));}}this['refresh']();},VisuMZ[_0x431701(0x21f)][_0x431701(0x235)]=Game_Party[_0x431701(0x1e5)][_0x431701(0x200)],Game_Party['prototype'][_0x431701(0x200)]=function(){const _0x435661=_0x431701;VisuMZ['WeaponSwapSystem'][_0x435661(0x235)]['call'](this);for(const _0x2dd563 of this['allMembers']()){if(!_0x2dd563)continue;_0x2dd563['setupBattleTestWeapons']();}this['_inBattle']=!![];},Scene_Equip['prototype'][_0x431701(0x251)]=function(){const _0x48ad88=_0x431701,_0x4ab4b3=this[_0x48ad88(0x260)](),_0x1f17b4=this[_0x48ad88(0x1c0)][_0x48ad88(0x27d)],_0x98ff7a=this[_0x48ad88(0x1c0)]['item']();_0x4ab4b3[_0x48ad88(0x26c)](_0x1f17b4,_0x98ff7a);},VisuMZ[_0x431701(0x21f)]['Scene_Battle_createActorCommandWindow']=Scene_Battle['prototype']['createActorCommandWindow'],Scene_Battle['prototype'][_0x431701(0x246)]=function(){const _0x22e1eb=_0x431701;VisuMZ[_0x22e1eb(0x21f)][_0x22e1eb(0x1d4)][_0x22e1eb(0x1d7)](this);const _0x4259e0=this['_actorCommandWindow'];_0x4259e0['setHandler']('weaponSwap',this['commandWeaponSwap'][_0x22e1eb(0x229)](this));},Scene_Battle['prototype'][_0x431701(0x1a7)]=function(){const _0xd26794=_0x431701,_0x4ca98a=BattleManager[_0xd26794(0x260)]();_0x4ca98a['swapWeaponNext'](),this['_actorCommandWindow'][_0xd26794(0x16e)](),this['_actorCommandWindow']['refresh']();},VisuMZ[_0x431701(0x21f)][_0x431701(0x27a)]=Sprite_Actor['prototype'][_0x431701(0x1ea)],Sprite_Actor[_0x431701(0x1e5)][_0x431701(0x1ea)]=function(){const _0x40f7a6=_0x431701;this[_0x40f7a6(0x271)]&&this[_0x40f7a6(0x271)][_0x40f7a6(0x1bc)]&&(this[_0x40f7a6(0x271)][_0x40f7a6(0x1bc)]=undefined),VisuMZ[_0x40f7a6(0x21f)][_0x40f7a6(0x27a)][_0x40f7a6(0x1d7)](this);},VisuMZ[_0x431701(0x21f)][_0x431701(0x189)]=Window_Base['prototype']['playOkSound'],Window_Base['prototype'][_0x431701(0x174)]=function(){const _0x1d64f3=_0x431701;if(this[_0x1d64f3(0x1b5)][_0x1d64f3(0x18c)]===_0x1d64f3(0x1af)&&this[_0x1d64f3(0x1ad)]()==='weaponSwap')_0x1d64f3(0x1e3)===_0x1d64f3(0x1e3)?SoundManager[_0x1d64f3(0x1d3)]():_0x4e678c=_0x4252ff[_0x1d64f3(0x184)](_0x29bfaa,_0x49ef08);else{if(_0x1d64f3(0x1be)!==_0x1d64f3(0x24f))VisuMZ['WeaponSwapSystem'][_0x1d64f3(0x189)][_0x1d64f3(0x1d7)](this);else return _0x1723f8-=_0x3847ea,_0x15e555[_0x1d64f3(0x21f)][_0x1d64f3(0x21a)][_0x1d64f3(0x1d7)](this,_0xf094bd,_0x2f2467);}},VisuMZ[_0x431701(0x21f)][_0x431701(0x21a)]=Window_StatusBase[_0x431701(0x1e5)][_0x431701(0x185)],Window_StatusBase[_0x431701(0x1e5)][_0x431701(0x185)]=function(_0x4ba958,_0x29db37){const _0x2c84d5=_0x431701;return _0x4ba958&&_0x4ba958[_0x2c84d5(0x247)]()?_0x2c84d5(0x288)!==_0x2c84d5(0x288)?_0xbc5840[_0x2c84d5(0x21f)][_0x2c84d5(0x1f5)]['call'](this):this[_0x2c84d5(0x171)](_0x4ba958,_0x29db37):VisuMZ['WeaponSwapSystem']['Window_StatusBase_actorSlotName'][_0x2c84d5(0x1d7)](this,_0x4ba958,_0x29db37);},Window_StatusBase[_0x431701(0x1e5)]['actorSlotNameWeaponSwap']=function(_0x276c2e,_0x14c686){const _0x2b8f90=_0x431701;let _0x3a994c=_0x276c2e[_0x2b8f90(0x272)]()[_0x2b8f90(0x1e2)]-0x1;Window_EquipSlot[_0x2b8f90(0x1a4)]&&(_0x3a994c=$dataSystem['weaponTypes'][_0x2b8f90(0x1e2)]-0x2);if(_0x14c686>_0x3a994c)return _0x14c686-=_0x3a994c,VisuMZ['WeaponSwapSystem'][_0x2b8f90(0x21a)][_0x2b8f90(0x1d7)](this,_0x276c2e,_0x14c686);else{let _0x28be9f='';if(Window_EquipSlot['WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS'])_0x28be9f=$dataSystem[_0x2b8f90(0x28c)][_0x14c686+0x1]||'';else{if(_0x2b8f90(0x1c9)!=='jTjNN'){const _0x321a71=_0x276c2e['weaponSwapTypes']()[_0x14c686];_0x28be9f=$dataSystem[_0x2b8f90(0x28c)][_0x321a71]||'';}else this[_0x2b8f90(0x232)](_0x24f134,_0x5b04d6['id']);}return _0x28be9f=_0x28be9f[_0x2b8f90(0x1fc)](/\\I\[(\d+)\]/gi,''),_0x28be9f;}},Window_EquipSlot[_0x431701(0x1a4)]=VisuMZ[_0x431701(0x21f)][_0x431701(0x236)]['UI'][_0x431701(0x250)],VisuMZ[_0x431701(0x21f)]['Window_EquipSlot_maxItems']=Window_EquipSlot['prototype'][_0x431701(0x179)],Window_EquipSlot[_0x431701(0x1e5)]['maxItems']=function(){const _0x273477=_0x431701;return this['_actor']&&this[_0x273477(0x271)][_0x273477(0x247)]()?this[_0x273477(0x217)]():VisuMZ[_0x273477(0x21f)]['Window_EquipSlot_maxItems'][_0x273477(0x1d7)](this);},Window_EquipSlot[_0x431701(0x1e5)][_0x431701(0x217)]=function(){const _0x2173fd=_0x431701;let _0x1d1c89=this['_actor']['equipSlots']()[_0x2173fd(0x1e2)]-0x1;if(Window_EquipSlot[_0x2173fd(0x1a4)])_0x1d1c89+=$dataSystem['weaponTypes'][_0x2173fd(0x1e2)]-0x1;else{if(_0x2173fd(0x1b4)===_0x2173fd(0x1ee)){const _0x28beec=this[_0x2173fd(0x208)](_0xd482c8);_0x28beec&&(this[_0x2173fd(0x285)](_0x3adbe7),this[_0x2173fd(0x283)](null));}else _0x1d1c89+=this[_0x2173fd(0x271)][_0x2173fd(0x272)]()[_0x2173fd(0x1e2)];}return _0x1d1c89;},VisuMZ[_0x431701(0x21f)][_0x431701(0x1c8)]=Window_EquipSlot[_0x431701(0x1e5)][_0x431701(0x269)],Window_EquipSlot[_0x431701(0x1e5)][_0x431701(0x269)]=function(_0x237c0a){const _0x360470=_0x431701;if(this[_0x360470(0x271)]&&this['_actor'][_0x360470(0x247)]()){if(_0x360470(0x20b)==='rGjQR')_0x52e456[_0x360470(0x21f)][_0x360470(0x1f0)][_0x360470(0x1d7)](this,_0x3009a3),this[_0x360470(0x1dc)]=0x0;else return this[_0x360470(0x1cb)](_0x237c0a);}else return VisuMZ[_0x360470(0x21f)][_0x360470(0x1c8)][_0x360470(0x1d7)](this,_0x237c0a);},Window_EquipSlot['prototype'][_0x431701(0x1cb)]=function(_0x50aade){const _0x1004fa=_0x431701;let _0x566551=this['_actor'][_0x1004fa(0x272)]()[_0x1004fa(0x1e2)]-0x1;Window_EquipSlot[_0x1004fa(0x1a4)]&&(_0x566551=$dataSystem[_0x1004fa(0x28c)][_0x1004fa(0x1e2)]-0x2);if(_0x50aade>_0x566551)return _0x50aade-=_0x566551,VisuMZ['WeaponSwapSystem'][_0x1004fa(0x1c8)][_0x1004fa(0x1d7)](this,_0x50aade);else{let _0x2bd3d9=this[_0x1004fa(0x271)][_0x1004fa(0x272)]()[_0x50aade];return Window_EquipSlot[_0x1004fa(0x1a4)]&&(_0x1004fa(0x173)!==_0x1004fa(0x23f)?_0x2bd3d9=_0x50aade+0x1:this[_0x1004fa(0x271)][_0x1004fa(0x1bc)]=_0x57f7fb),this[_0x1004fa(0x271)][_0x1004fa(0x208)](_0x2bd3d9);}},VisuMZ[_0x431701(0x21f)]['Window_EquipSlot_isEnabled']=Window_EquipSlot[_0x431701(0x1e5)][_0x431701(0x16f)],Window_EquipSlot[_0x431701(0x1e5)]['isEnabled']=function(_0x5f3abd){const _0x2d9c1d=_0x431701;return this[_0x2d9c1d(0x271)]&&this[_0x2d9c1d(0x271)][_0x2d9c1d(0x247)]()?this[_0x2d9c1d(0x1d9)](_0x5f3abd):VisuMZ['WeaponSwapSystem'][_0x2d9c1d(0x21d)][_0x2d9c1d(0x1d7)](this,_0x5f3abd);},Window_EquipSlot[_0x431701(0x1e5)]['isEnabledWeaponSwap']=function(_0x4b355d){const _0x5f5d62=_0x431701;let _0x7f2a3e=this[_0x5f5d62(0x271)][_0x5f5d62(0x272)]()['length']-0x1;Window_EquipSlot[_0x5f5d62(0x1a4)]&&(_0x7f2a3e=$dataSystem[_0x5f5d62(0x28c)]['length']-0x2);if(_0x4b355d>_0x7f2a3e)return _0x4b355d-=_0x7f2a3e,VisuMZ[_0x5f5d62(0x21f)]['Window_EquipSlot_isEnabled']['call'](this,_0x4b355d);else{if(!this[_0x5f5d62(0x271)][_0x5f5d62(0x1b1)](0x0)){if('dgKJO'!==_0x5f5d62(0x20a))return![];else this[_0x5f5d62(0x1bc)]=!![],this['performAttack']();}else return Window_EquipSlot[_0x5f5d62(0x1a4)]?this['_actor'][_0x5f5d62(0x272)]()[_0x5f5d62(0x26a)](_0x4b355d+0x1):!![];}},Window_EquipSlot[_0x431701(0x1e5)][_0x431701(0x215)]=function(){const _0x488683=_0x431701;SoundManager[_0x488683(0x1d3)]();const _0x238a5f=SceneManager[_0x488683(0x26d)][_0x488683(0x271)];this[_0x488683(0x1c0)][_0x488683(0x27d)]>0x0?_0x238a5f['changeEquip'](this['_itemWindow'][_0x488683(0x27d)],null):(_0x238a5f[_0x488683(0x285)](this[_0x488683(0x1c0)][_0x488683(0x1dc)]),_0x238a5f[_0x488683(0x283)](null));this[_0x488683(0x167)](),this[_0x488683(0x1c0)]['refresh'](),this[_0x488683(0x1ca)]();const _0x56cf4e=SceneManager[_0x488683(0x26d)]['_statusWindow'];if(_0x56cf4e)_0x56cf4e[_0x488683(0x167)]();},VisuMZ[_0x431701(0x21f)][_0x431701(0x1ff)]=Window_EquipSlot[_0x431701(0x1e5)][_0x431701(0x223)],Window_EquipSlot[_0x431701(0x1e5)]['equipSlotIndex']=function(){const _0x1b9cda=_0x431701;let _0x54a6f2=VisuMZ[_0x1b9cda(0x21f)]['Window_EquipSlot_equipSlotIndex'],_0x59ce47=this[_0x1b9cda(0x271)][_0x1b9cda(0x272)]()[_0x1b9cda(0x1e2)]-0x1;return Window_EquipSlot[_0x1b9cda(0x1a4)]&&(_0x59ce47=$dataSystem[_0x1b9cda(0x28c)]['length']-0x2),Math[_0x1b9cda(0x184)](0x0,_0x54a6f2-_0x59ce47);},VisuMZ[_0x431701(0x21f)][_0x431701(0x1f0)]=Window_EquipItem[_0x431701(0x1e5)][_0x431701(0x275)],Window_EquipItem[_0x431701(0x1e5)][_0x431701(0x275)]=function(_0x2fee6d){const _0x5da33c=_0x431701;VisuMZ['WeaponSwapSystem'][_0x5da33c(0x1f0)]['call'](this,_0x2fee6d),this[_0x5da33c(0x1dc)]=0x0;},VisuMZ[_0x431701(0x21f)]['Window_EquipItem_setSlotId']=Window_EquipItem[_0x431701(0x1e5)][_0x431701(0x255)],Window_EquipItem[_0x431701(0x1e5)][_0x431701(0x255)]=function(_0x261ee2){const _0x39a5a4=_0x431701;if(!this[_0x39a5a4(0x271)])return VisuMZ[_0x39a5a4(0x21f)][_0x39a5a4(0x1b8)]['call'](this,_0x261ee2);let _0x3c050a=this['_actor']['weaponSwapTypes']()['length']-0x1;Window_EquipSlot[_0x39a5a4(0x1a4)]&&('CXyZj'===_0x39a5a4(0x19d)?(_0x1185c2[_0x39a5a4(0x21f)][_0x39a5a4(0x168)]['call'](this),this[_0x39a5a4(0x209)]()):_0x3c050a=$dataSystem[_0x39a5a4(0x28c)][_0x39a5a4(0x1e2)]-0x2),_0x261ee2>_0x3c050a?'Pklhu'===_0x39a5a4(0x26e)?(this[_0x39a5a4(0x271)]&&this[_0x39a5a4(0x271)][_0x39a5a4(0x1bc)]&&(this[_0x39a5a4(0x271)][_0x39a5a4(0x1bc)]=_0x2e5464),_0xdbe8e[_0x39a5a4(0x21f)][_0x39a5a4(0x27a)][_0x39a5a4(0x1d7)](this)):(_0x261ee2-=_0x3c050a,this[_0x39a5a4(0x1dc)]=0x0,VisuMZ[_0x39a5a4(0x21f)]['Window_EquipItem_setSlotId']['call'](this,_0x261ee2)):(Window_EquipSlot[_0x39a5a4(0x1a4)]?this[_0x39a5a4(0x1dc)]=_0x261ee2+0x1:this[_0x39a5a4(0x1dc)]=this[_0x39a5a4(0x271)][_0x39a5a4(0x272)]()[_0x261ee2],_0x261ee2=0x0,VisuMZ[_0x39a5a4(0x21f)][_0x39a5a4(0x1b8)][_0x39a5a4(0x1d7)](this,_0x261ee2),this[_0x39a5a4(0x271)][_0x39a5a4(0x285)](this['_wtypeID']),this[_0x39a5a4(0x19c)]&&this['_statusWindow'][_0x39a5a4(0x167)]());},VisuMZ[_0x431701(0x21f)][_0x431701(0x1d5)]=Window_EquipItem[_0x431701(0x1e5)]['includes'],Window_EquipItem[_0x431701(0x1e5)][_0x431701(0x26a)]=function(_0x441ce3){const _0x103d1a=_0x431701;if(_0x441ce3===null){if(_0x103d1a(0x1a1)==='UZdVJ')_0x3dd888['playEquip']();else return!this['nonRemovableEtypes']()[_0x103d1a(0x26a)](this['etypeId']());}else return this['_slotId']===0x0&&this['_wtypeID']!==0x0?_0x441ce3['wtypeId']===this[_0x103d1a(0x1dc)]:VisuMZ[_0x103d1a(0x21f)]['Window_EquipItem_includes'][_0x103d1a(0x1d7)](this,_0x441ce3);},VisuMZ['WeaponSwapSystem'][_0x431701(0x16d)]=Window_EquipItem[_0x431701(0x1e5)][_0x431701(0x16f)],Window_EquipItem[_0x431701(0x1e5)][_0x431701(0x16f)]=function(_0x49322){const _0x4b6da4=_0x431701;if(!_0x49322){if(_0x4b6da4(0x1aa)===_0x4b6da4(0x205)){this['_swapWeapons']===_0xd04e9b&&this[_0x4b6da4(0x26b)]();_0x4afc83=_0x5e9e20||0x0;if(!this['canWeaponSwap']())return;if(!this[_0x4b6da4(0x194)](_0x4cce1a))return;this[_0x4b6da4(0x28b)]=_0x1c74ec,this['_swapWeapons'][_0x406998]=this[_0x4b6da4(0x163)][_0x1b26ff]||0x0;const _0x1c32b5=_0x35463e[this['_swapWeapons'][_0x132850]]||null;this[_0x4b6da4(0x178)][0x0]['setObject'](_0x1c32b5),this['_cache']={};}else return!this['nonRemovableEtypes']()[_0x4b6da4(0x26a)](this[_0x4b6da4(0x241)]());}return VisuMZ[_0x4b6da4(0x21f)][_0x4b6da4(0x16d)][_0x4b6da4(0x1d7)](this,_0x49322);},Window_ActorCommand[_0x431701(0x17a)]=VisuMZ[_0x431701(0x21f)][_0x431701(0x236)]['UI'][_0x431701(0x230)],Window_ActorCommand[_0x431701(0x1c5)]=VisuMZ['WeaponSwapSystem'][_0x431701(0x236)]['UI']['SwapShortcut'],Window_ActorCommand[_0x431701(0x1ec)]=VisuMZ[_0x431701(0x21f)][_0x431701(0x236)]['UI']['ShowShortcutArrows'],Window_ActorCommand[_0x431701(0x1d2)]=VisuMZ['WeaponSwapSystem'][_0x431701(0x236)]['UI']['ShowSwapCommand'],VisuMZ[_0x431701(0x21f)][_0x431701(0x199)]=Window_ActorCommand[_0x431701(0x1e5)][_0x431701(0x275)],Window_ActorCommand[_0x431701(0x1e5)][_0x431701(0x275)]=function(_0x1bd50a){const _0x5ec21c=_0x431701;VisuMZ[_0x5ec21c(0x21f)][_0x5ec21c(0x199)][_0x5ec21c(0x1d7)](this,_0x1bd50a),this[_0x5ec21c(0x1a5)]();},VisuMZ[_0x431701(0x21f)][_0x431701(0x268)]=Window_ActorCommand[_0x431701(0x1e5)]['addAttackCommand'],Window_ActorCommand[_0x431701(0x1e5)]['addAttackCommand']=function(){const _0x205f19=_0x431701;if(this[_0x205f19(0x271)])this[_0x205f19(0x271)]['updateSwapToNextAvailableWeapon']();VisuMZ['WeaponSwapSystem'][_0x205f19(0x268)]['call'](this);if(!this['_actor'][_0x205f19(0x247)]())return;this[_0x205f19(0x20f)]();if(this[_0x205f19(0x218)](_0x205f19(0x191))>=0x0)return;this[_0x205f19(0x27b)]();},Window_ActorCommand['prototype'][_0x431701(0x20f)]=function(){const _0xfd6dbe=_0x431701,_0x37d920=$dataSkills[this['_actor']['attackSkillId']()];if(!_0x37d920)return;if(!this['canAddSkillCommand'](_0x37d920))return;if(!Window_ActorCommand[_0xfd6dbe(0x17a)])return;const _0x54effa=this[_0xfd6dbe(0x271)][_0xfd6dbe(0x212)]()[0x0];if(!_0x54effa)return;const _0x41b2c7=this[_0xfd6dbe(0x1e6)](),_0x359f00=DataManager[_0xfd6dbe(0x27e)](_0x37d920),_0x5c9d54=_0x54effa[_0xfd6dbe(0x1da)],_0x39be58=_0x41b2c7===_0xfd6dbe(0x24c)?_0x359f00:_0xfd6dbe(0x1b6)['format'](_0x5c9d54,_0x359f00),_0x50ef31=this[_0xfd6dbe(0x218)](_0xfd6dbe(0x261));if(_0x50ef31>=0x0){const _0x2bb88b=this[_0xfd6dbe(0x17c)][_0x50ef31];_0x2bb88b['name']=_0x39be58;}},Window_ActorCommand['prototype'][_0x431701(0x27b)]=function(_0x57d613){const _0x415f1f=_0x431701;if(!Window_ActorCommand[_0x415f1f(0x1d2)]&&!_0x57d613)return;if(this[_0x415f1f(0x271)][_0x415f1f(0x272)]()[_0x415f1f(0x1e2)]<=0x1)return;this[_0x415f1f(0x218)](_0x415f1f(0x191))>=0x0&&this['removeWeaponSwapCommand']();const _0x1ab031=this['commandStyle'](),_0x391b61=TextManager['swapWeaponCmd'],_0x23902b=ImageManager[_0x415f1f(0x187)],_0x2f2d1a=_0x1ab031==='text'?_0x391b61:_0x415f1f(0x1b6)[_0x415f1f(0x237)](_0x23902b,_0x391b61);this[_0x415f1f(0x226)](_0x2f2d1a,_0x415f1f(0x191));},Window_ActorCommand[_0x431701(0x1e5)][_0x431701(0x282)]=function(){const _0x8cbb4a=_0x431701;while(this['findSymbol'](_0x8cbb4a(0x191))>=0x0){const _0x444c3d=this['findSymbol'](_0x8cbb4a(0x191));this[_0x8cbb4a(0x17c)]['splice'](_0x444c3d,0x1);}},Window_ActorCommand[_0x431701(0x1e5)][_0x431701(0x244)]=function(){const _0x32fc2f=_0x431701;return Window_ActorCommand['WEAPON_SWAP_SHORTCUT_ENABLE']&&this[_0x32fc2f(0x1ad)]()===_0x32fc2f(0x261)&&this[_0x32fc2f(0x271)]&&this['_actor'][_0x32fc2f(0x247)]()&&this[_0x32fc2f(0x271)][_0x32fc2f(0x1c1)]()[_0x32fc2f(0x1e2)]>0x1;},Window_ActorCommand[_0x431701(0x1e5)][_0x431701(0x1d0)]=function(_0x4be130){const _0x12bfbe=_0x431701;if(this['isWeaponSwapShortcutEnabled']()){if('TldlV'==='FLUsY'){const _0x5a9ec8=[],_0x3f368c=_0x950933['weaponTypes'][_0x12bfbe(0x1e2)];for(let _0x1d2455=0x1;_0x1d2455<_0x3f368c;_0x1d2455++){if(this[_0x12bfbe(0x194)](_0x1d2455))_0x5a9ec8[_0x12bfbe(0x20d)](_0x1d2455);}return _0x5a9ec8;}else this[_0x12bfbe(0x16a)](!![]);}else Window_Command[_0x12bfbe(0x1e5)]['cursorRight']['call'](this,_0x4be130);},Window_ActorCommand[_0x431701(0x1e5)]['cursorLeft']=function(_0x29d453){const _0x45a638=_0x431701;if(this['isWeaponSwapShortcutEnabled']()){if(_0x45a638(0x203)!==_0x45a638(0x264))this[_0x45a638(0x16a)](![]);else{if(!this[_0x45a638(0x247)]())return;if(!_0x2d0282['WeaponSwapSystem'][_0x45a638(0x17e)][_0x45a638(0x1d7)](this,0x0))return;const _0x1d234d=this[_0x45a638(0x28b)];for(const _0x541e51 of this[_0x45a638(0x272)]()){this[_0x45a638(0x285)](_0x541e51),this[_0x45a638(0x283)](this[_0x45a638(0x1ae)](_0x541e51));}this[_0x45a638(0x285)](_0x1d234d),this[_0x45a638(0x167)]();}}else'jLwGV'!==_0x45a638(0x254)?_0x2836c6[_0x45a638(0x21f)]['Game_Actor_changeEquip'][_0x45a638(0x1d7)](this,_0x5a3c9b,_0x49d45e):Window_Command[_0x45a638(0x1e5)][_0x45a638(0x1e8)][_0x45a638(0x1d7)](this,_0x29d453);},Window_ActorCommand[_0x431701(0x1e5)][_0x431701(0x16a)]=function(_0x4585d7){const _0x13b8aa=_0x431701;if(_0x4585d7){if(_0x13b8aa(0x198)!==_0x13b8aa(0x198)){if(this[_0x13b8aa(0x247)]()&&_0x314213===0x0)return![];return _0x146ad1[_0x13b8aa(0x21f)][_0x13b8aa(0x17e)][_0x13b8aa(0x1d7)](this,_0x4278fe);}else this[_0x13b8aa(0x271)][_0x13b8aa(0x258)]();}else{if(_0x13b8aa(0x277)!==_0x13b8aa(0x277)){this[_0x13b8aa(0x285)](_0x50f64a(_0x4cb726['$1']));return;}else this[_0x13b8aa(0x271)][_0x13b8aa(0x1bf)]();}SoundManager[_0x13b8aa(0x1d3)](),this[_0x13b8aa(0x167)]();},Window_ActorCommand[_0x431701(0x1e5)][_0x431701(0x1a5)]=function(){const _0x4f40ad=_0x431701;if(!Window_ActorCommand[_0x4f40ad(0x1c5)])return;if(!Window_ActorCommand[_0x4f40ad(0x1ec)])return;const _0xbfd107=[new Sprite(),new Sprite()];for(const _0x178981 of _0xbfd107){_0x4f40ad(0x284)==='bjJOx'?(this[_0x4f40ad(0x1de)](_0x178981),_0x178981['opacity']=0x0,_0x178981[_0x4f40ad(0x202)]['y']=0.5,_0x178981[_0x4f40ad(0x240)]=ImageManager[_0x4f40ad(0x1c7)](_0x4f40ad(0x231))):_0x5b3728[_0x4f40ad(0x26c)](this[_0x4f40ad(0x1c0)][_0x4f40ad(0x27d)],null);}_0xbfd107[0x0][_0x4f40ad(0x202)]['x']=0x0,_0xbfd107[0x0]['setFrame'](0x78,0x24,0x18,0x18),_0xbfd107[0x0]['x']=0x0,this['_weaponSwapShortcutSprite_Left']=_0xbfd107[0x0],_0xbfd107[0x1][_0x4f40ad(0x202)]['x']=0x1,_0xbfd107[0x1][_0x4f40ad(0x1e7)](0x90,0x24,0x18,0x18),_0xbfd107[0x1]['x']=this['width'],this[_0x4f40ad(0x259)]=_0xbfd107[0x1];},Window_ActorCommand[_0x431701(0x1e5)]['updateArrows']=function(){const _0x3aa09a=_0x431701;Window_Scrollable[_0x3aa09a(0x1e5)][_0x3aa09a(0x262)][_0x3aa09a(0x1d7)](this),this[_0x3aa09a(0x1a9)]();},Window_ActorCommand[_0x431701(0x1e5)][_0x431701(0x1a9)]=function(){const _0x47e7d2=_0x431701;if(!Window_ActorCommand[_0x47e7d2(0x1c5)])return;if(!Window_ActorCommand['WEAPON_SWAP_SHORTCUT_ARROWS'])return;VisuMZ[_0x47e7d2(0x21f)]['updateShortcutOpacity'][_0x47e7d2(0x1d7)](this[_0x47e7d2(0x1b9)]),VisuMZ[_0x47e7d2(0x21f)]['updateShortcutOpacity']['call'](this[_0x47e7d2(0x259)]);},Window_ActorCommand[_0x431701(0x1e5)][_0x431701(0x25c)]=function(){const _0x292a86=_0x431701;if(!this['_actor'])return![];if(this[_0x292a86(0x1ad)]()!==_0x292a86(0x261))return![];if(this[_0x292a86(0x271)][_0x292a86(0x272)]()['length']<=0x1)return![];return this[_0x292a86(0x271)][_0x292a86(0x1c1)]()[_0x292a86(0x1e2)]>0x1;},VisuMZ['WeaponSwapSystem']['updateShortcutOpacity']=function(){const _0xe909d2=_0x431701;if(!this[_0xe909d2(0x17b)][_0xe909d2(0x164)]||this[_0xe909d2(0x17b)][_0xe909d2(0x1f6)]<0xff||this['parent']['openness']<0xff)this[_0xe909d2(0x228)]=0x0;else{if(this[_0xe909d2(0x17b)][_0xe909d2(0x25c)]()){if('TrZmh'===_0xe909d2(0x207)){if(!_0x2df03d)return!this[_0xe909d2(0x225)]()[_0xe909d2(0x26a)](this[_0xe909d2(0x241)]());return _0x544067['WeaponSwapSystem'][_0xe909d2(0x16d)][_0xe909d2(0x1d7)](this,_0x40405);}else{var _0x334a3c=this[_0xe909d2(0x17b)][_0xe909d2(0x192)](this[_0xe909d2(0x17b)]['findSymbol'](_0xe909d2(0x261))),_0x24d374=_0x334a3c['y']+this[_0xe909d2(0x17b)][_0xe909d2(0x186)];_0x24d374>0x0&&_0x24d374<this['parent'][_0xe909d2(0x1f9)]-this['parent']['padding']*0x2&&(_0x24d374+=Math[_0xe909d2(0x286)](this[_0xe909d2(0x17b)]['lineHeight']()/0x2),this[_0xe909d2(0x228)]=0xff,this['y']=_0x24d374);}}else _0xe909d2(0x1a0)!==_0xe909d2(0x1ed)?this['opacity']-=0x20:_0x3cd112=_0x2f9a40[_0xe909d2(0x28c)][_0x3e1ee4+0x1]||'';}},VisuMZ[_0x431701(0x21f)][_0x431701(0x22a)]=Window_ActorCommand[_0x431701(0x1e5)][_0x431701(0x1b2)],Window_ActorCommand['prototype'][_0x431701(0x1b2)]=function(_0x2d416c){const _0x507cb3=_0x431701;VisuMZ[_0x507cb3(0x21f)]['Window_ActorCommand_setup'][_0x507cb3(0x1d7)](this,_0x2d416c),this[_0x507cb3(0x259)]&&(this[_0x507cb3(0x259)]['x']=this[_0x507cb3(0x1a2)]);},VisuMZ['WeaponSwapSystem']['Settings'][_0x431701(0x1d8)]=Window_ActorCommand['prototype']['updateHelp'],Window_ActorCommand[_0x431701(0x1e5)][_0x431701(0x17f)]=function(){const _0x52841a=_0x431701,_0xa7aa14=this['currentSymbol']();switch(_0xa7aa14){case _0x52841a(0x191):this[_0x52841a(0x1fe)][_0x52841a(0x197)](TextManager[_0x52841a(0x270)]);break;default:VisuMZ[_0x52841a(0x21f)][_0x52841a(0x236)][_0x52841a(0x1d8)]['call'](this);break;}};
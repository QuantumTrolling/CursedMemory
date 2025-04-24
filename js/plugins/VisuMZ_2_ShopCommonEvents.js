//=============================================================================
// VisuStella MZ - Shop Events
// VisuMZ_2_ShopCommonEvents.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ShopCommonEvents = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ShopCommonEvents = VisuMZ.ShopCommonEvents || {};
VisuMZ.ShopCommonEvents.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.01] [ShopCommonEvents]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Shop_Common_Events_VisuStella_MZ
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows for shop items, weapons, and/or armors to launch common
 * events upon buying or selling them, either as a one-time event or repeating.
 * These launched Common Events will take the player outside of the shop to
 * process the Common Events before (optionally) returning back, giving your
 * player's party members a chance to comment on his or her purchases.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Items, weapons, and armors can launch Common Events went bought or sold.
 * * These launched Common Events can occur once or repeat multiple times.
 * * Store the quantity of an item bought or sold into variables to allow for
 *   some more dynamic Common Events.
 * * Use switches to function as requirements to determine if the Common Events
 *   will launch, either by having all switches enabled or any one of a set.
 * * A plugin command that will return the player back to the previous shop
 *   with all of the shop settings intact.
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
 * Launching Common Events
 * 
 * When launching a Common Event, through either buying or selling, any of the
 * event commands part of the initial shop launch will be cached away until the
 * player exits the shop normally.
 * 
 * However, if the Common Event finishes without returning the player back to
 * the shop without usage of the Plugin Command, then any of the cached event
 * commands will be lost.
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
 * === Shop Common Event-Related Notetags ===
 * 
 * ---
 *
 * <Once Buy Common Event: id>
 * <Repeat Buy Common Event: id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - This will cause a specific Common Event to launch when bought.
 * - Replace 'id' with a number representing the ID of the Common Event that
 *   you wish to launch upon this item being bought.
 * - The "Once" notetag variant will only occur once when bought.
 *   - Any subsequent purchases of the item will not launch the Common Event.
 * - The "Repeat" notetag variant will occur repeatedly when bought.
 * - If both "Once" and "Repeat" notetags are present in the item, then the
 *   "Once" variant will take priority first. Any subsequent purchases will go
 *   to the "Repeat" variant.
 * - Any switche requirement notetags need to be met in order for either
 *   notetag to have any effect.
 *
 * ---
 *
 * <Once Sell Common Event: id>
 * <Repeat Sell Common Event: id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - This will cause a specific Common Event to launch when sold.
 * - Replace 'id' with a number representing the ID of the Common Event that
 *   you wish to launch upon this item being sold.
 * - The "Once" notetag variant will only occur once when sold.
 *   - Any subsequent sellings of the item will not launch the Common Event.
 * - The "Repeat" notetag variant will occur repeatedly when sold.
 * - If both "Once" and "Repeat" notetags are present in the item, then the
 *   "Once" variant will take priority first. Any subsequent sellings will go
 *   to the "Repeat" variant.
 * - Any switche requirement notetags need to be met in order for either
 *   notetag to have any effect.
 *
 * ---
 * 
 * === Requirement Switch-Related Notetags ===
 * 
 * ---
 *
 * <Once Buy Common Event Switch: id>
 * <Once Buy Common Event All Switches: id, id, id>
 * <Once Buy Common Event Any Switches: id, id, id>
 *
 * <Repeat Buy Common Event Switch: id>
 * <Repeat Buy Common Event All Switches: id, id, id>
 * <Repeat Buy Common Event Any Switches: id, id, id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires the respective Buy Common Events to have these Switches enabled
 *   in the "ON" position in order for them to launch.
 *   - "Once" variant will only affect the "Once" notetag buy variants.
 *   - "Repeat" variant will only affect the "Repeat" notetag buy variants.
 * - The "All" variant will require all listed Switch ID's to be "ON".
 * - The "Any" variant will require only one listed Switch ID to be "ON".
 * - Replace 'id' with a number representing the Switch ID that needs to be in
 *   the "ON" position for the requirement to be met.
 *   - Insert multiple 'id' to require more Switch ID's.
 *
 * ---
 *
 * <Once Sell Common Event Switch: id>
 * <Once Sell Common Event All Switches: id, id, id>
 * <Once Sell Common Event Any Switches: id, id, id>
 *
 * <Repeat Sell Common Event Switch: id>
 * <Repeat Sell Common Event All Switches: id, id, id>
 * <Repeat Sell Common Event Any Switches: id, id, id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires the respective Sell Common Events to have these Switches enabled
 *   in the "ON" position in order for them to launch.
 *   - "Once" variant will only affect the "Once" notetag sell variants.
 *   - "Repeat" variant will only affect the "Repeat" notetag sell variants.
 * - The "All" variant will require all listed Switch ID's to be "ON".
 * - The "Any" variant will require only one listed Switch ID to be "ON".
 * - Replace 'id' with a number representing the Switch ID that needs to be in
 *   the "ON" position for the requirement to be met.
 *   - Insert multiple 'id' to require more Switch ID's.
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
 * === Return Plugin Commands ===
 * 
 * ---
 *
 * Return: To Last Shop
 * - Return to the last shop if coming from a Shop Common Event.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are primarily settings to automatically record the quantity/amount
 * of an item, weapon, or armor bought or sold in the shop in case you want to
 * have a dynamic Common Event dependent on them.
 *
 * ---
 *
 * General Settings
 * 
 *   Variable: Buy Quantity:
 *   - When buying, register amount bought to this variable.
 *   - 0 to not use this feature.
 * 
 *   Variable: Sell Quantity:
 *   - When Selling, register amount sold to this variable.
 *   - 0 to not use this feature.
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
 * * Arisu
 * * Olivia
 * * Irina
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.01: September 17, 2021
 * * Bug Fixes!
 * ** Prevents canceling purchases from launching Common Events. Fix by Arisu.
 *
 * Version 1.00 Official Release Date: October 4, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ReturnToLastShop
 * @text Return: To Last Shop
 * @desc Return to the last shop if coming from a Shop Common Event.
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
 * @param ShopCommonEvents
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BuyVariable:num
 * @text Variable: Buy Quantity
 * @type variable
 * @desc When buying, register amount bought to this variable.
 * 0 to not use this feature.
 * @default 0
 *
 * @param SellVariable:num
 * @text Variable: Sell Quantity
 * @type variable
 * @desc When Selling, register amount sold to this variable.
 * 0 to not use this feature.
 * @default 0
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

function _0x1ae1(){const _0x460eca=['_ShopBuyEvents','HjGLT','_item','constructor','endNumberInput','OtLdq','value','status','isWeapon','split','armors','trGIL','version','STRUCT','9850419QVPsmH','FUNC','isItem','registerShopSellEvent','push','initShopCommonEvents','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','SellVariable','registerLastShopCommonEventsSettings','ARRAYSTR','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','currentSymbol','IMkKY','BuyEventRepeat','grwdq','isArmor','STR','_goods','isSceneMap','exit','_scene','return\x200','45996dIDffd','AnySw','%1%2','AjnGc','_ShopCommonEventNumberOk','1518664FMyjqR','Scene_Shop_onNumberOk','Scene_Shop_endNumberInput','parse','6283356YccyeR','_numberWindow','includes','ReturnToLastShop','itemHasShopCommonEvent','_interpreter','goto','onNumberOk','items','8XaIMxD','RegExp','1476896ILoErz','Settings','cEsLk','ShopCommonEvents','weapons','initialize','Game_System_initialize','oKcsW','36YftZCE','parameters','_purchaseOnly','format','meetsShopCommonEventSwitches','prototype','SellEventOnce','buy','ARRAYEVAL','map','SellEventRepeat','trim','hasShopBuyEventOccurred','KHjYb','ARRAYJSON','ZcxlD','prepareNextScene','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Repeat','OkbKh','hasShopSellEventOccurred','BuyEventOnce','ItemsEquipsCore','AllSw','call','gPVck','JSON','EVAL','sell','dpOnp','name','ConvertParams','_ShopSellEvents','processShopCommonEvent','toUpperCase','match','description','restoreLastShopCommonEventsSettings','wxmni','filter','ARRAYSTRUCT','483695aqTQDV','registerShopBuyEvent','_lastShopCommonEventsSettings','1863411RddixE','ARRAYFUNC','_commandWindow','note'];_0x1ae1=function(){return _0x460eca;};return _0x1ae1();}const _0x39b75e=_0x58ad;(function(_0x45fb51,_0x3edb5f){const _0x49005c=_0x58ad,_0x3b3f4f=_0x45fb51();while(!![]){try{const _0x5da417=parseInt(_0x49005c(0x186))/0x1*(-parseInt(_0x49005c(0x132))/0x2)+-parseInt(_0x49005c(0x15e))/0x3+-parseInt(_0x49005c(0x12a))/0x4+parseInt(_0x49005c(0x15b))/0x5+parseInt(_0x49005c(0x18f))/0x6+parseInt(_0x49005c(0x18b))/0x7+parseInt(_0x49005c(0x128))/0x8*(parseInt(_0x49005c(0x170))/0x9);if(_0x5da417===_0x3edb5f)break;else _0x3b3f4f['push'](_0x3b3f4f['shift']());}catch(_0x21413f){_0x3b3f4f['push'](_0x3b3f4f['shift']());}}}(_0x1ae1,0x9b8bf));var label='ShopCommonEvents',tier=tier||0x0,dependencies=['VisuMZ_1_ItemsEquipsCore'],pluginData=$plugins[_0x39b75e(0x159)](function(_0x883951){const _0x73ea40=_0x39b75e;return _0x883951[_0x73ea40(0x169)]&&_0x883951['description'][_0x73ea40(0x191)]('['+label+']');})[0x0];function _0x58ad(_0xeb3e58,_0x2b75e8){const _0x1ae10b=_0x1ae1();return _0x58ad=function(_0x58add2,_0x28369d){_0x58add2=_0x58add2-0x128;let _0x2a86e7=_0x1ae10b[_0x58add2];return _0x2a86e7;},_0x58ad(_0xeb3e58,_0x2b75e8);}VisuMZ[label][_0x39b75e(0x12b)]=VisuMZ[label][_0x39b75e(0x12b)]||{},VisuMZ[_0x39b75e(0x151)]=function(_0x327d4f,_0x233955){const _0x6d8423=_0x39b75e;for(const _0x3ac7c1 in _0x233955){if(_0x3ac7c1[_0x6d8423(0x155)](/(.*):(.*)/i)){if(_0x6d8423(0x131)!=='oKcsW')_0x5c9eee(_0x6d8423(0x17a)[_0x6d8423(0x135)](_0x1357d1,_0x45c58)),_0x2e5246[_0x6d8423(0x183)]();else{const _0x2d8039=String(RegExp['$1']),_0x32fec6=String(RegExp['$2'])[_0x6d8423(0x154)]()[_0x6d8423(0x13d)]();let _0x5e4c23,_0x35a5c3,_0x3eb66a;switch(_0x32fec6){case'NUM':_0x5e4c23=_0x233955[_0x3ac7c1]!==''?Number(_0x233955[_0x3ac7c1]):0x0;break;case'ARRAYNUM':_0x35a5c3=_0x233955[_0x3ac7c1]!==''?JSON[_0x6d8423(0x18e)](_0x233955[_0x3ac7c1]):[],_0x5e4c23=_0x35a5c3['map'](_0x58a540=>Number(_0x58a540));break;case _0x6d8423(0x14d):_0x5e4c23=_0x233955[_0x3ac7c1]!==''?eval(_0x233955[_0x3ac7c1]):null;break;case _0x6d8423(0x13a):_0x35a5c3=_0x233955[_0x3ac7c1]!==''?JSON[_0x6d8423(0x18e)](_0x233955[_0x3ac7c1]):[],_0x5e4c23=_0x35a5c3[_0x6d8423(0x13b)](_0x2243ee=>eval(_0x2243ee));break;case _0x6d8423(0x14c):_0x5e4c23=_0x233955[_0x3ac7c1]!==''?JSON[_0x6d8423(0x18e)](_0x233955[_0x3ac7c1]):'';break;case _0x6d8423(0x140):_0x35a5c3=_0x233955[_0x3ac7c1]!==''?JSON[_0x6d8423(0x18e)](_0x233955[_0x3ac7c1]):[],_0x5e4c23=_0x35a5c3['map'](_0x29f1da=>JSON[_0x6d8423(0x18e)](_0x29f1da));break;case _0x6d8423(0x171):_0x5e4c23=_0x233955[_0x3ac7c1]!==''?new Function(JSON['parse'](_0x233955[_0x3ac7c1])):new Function(_0x6d8423(0x185));break;case _0x6d8423(0x15f):_0x35a5c3=_0x233955[_0x3ac7c1]!==''?JSON[_0x6d8423(0x18e)](_0x233955[_0x3ac7c1]):[],_0x5e4c23=_0x35a5c3[_0x6d8423(0x13b)](_0x21d93d=>new Function(JSON['parse'](_0x21d93d)));break;case _0x6d8423(0x180):_0x5e4c23=_0x233955[_0x3ac7c1]!==''?String(_0x233955[_0x3ac7c1]):'';break;case _0x6d8423(0x179):_0x35a5c3=_0x233955[_0x3ac7c1]!==''?JSON[_0x6d8423(0x18e)](_0x233955[_0x3ac7c1]):[],_0x5e4c23=_0x35a5c3[_0x6d8423(0x13b)](_0x51c4ac=>String(_0x51c4ac));break;case _0x6d8423(0x16f):_0x3eb66a=_0x233955[_0x3ac7c1]!==''?JSON['parse'](_0x233955[_0x3ac7c1]):{},_0x5e4c23=VisuMZ[_0x6d8423(0x151)]({},_0x3eb66a);break;case _0x6d8423(0x15a):_0x35a5c3=_0x233955[_0x3ac7c1]!==''?JSON[_0x6d8423(0x18e)](_0x233955[_0x3ac7c1]):[],_0x5e4c23=_0x35a5c3[_0x6d8423(0x13b)](_0x163283=>VisuMZ['ConvertParams']({},JSON['parse'](_0x163283)));break;default:continue;}_0x327d4f[_0x2d8039]=_0x5e4c23;}}}return _0x327d4f;},(_0x3c044d=>{const _0x4d2b12=_0x39b75e,_0xa6805c=_0x3c044d[_0x4d2b12(0x150)];for(const _0x25cb63 of dependencies){if(!Imported[_0x25cb63]){alert(_0x4d2b12(0x176)[_0x4d2b12(0x135)](_0xa6805c,_0x25cb63)),SceneManager['exit']();break;}}const _0x12638b=_0x3c044d[_0x4d2b12(0x156)];if(_0x12638b[_0x4d2b12(0x155)](/\[Version[ ](.*?)\]/i)){const _0x77b439=Number(RegExp['$1']);_0x77b439!==VisuMZ[label][_0x4d2b12(0x16e)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x4d2b12(0x135)](_0xa6805c,_0x77b439)),SceneManager[_0x4d2b12(0x183)]());}if(_0x12638b['match'](/\[Tier[ ](\d+)\]/i)){const _0x5b8433=Number(RegExp['$1']);if(_0x5b8433<tier){if(_0x4d2b12(0x158)!=='iUsLi')alert(_0x4d2b12(0x143)[_0x4d2b12(0x135)](_0xa6805c,_0x5b8433,tier)),SceneManager[_0x4d2b12(0x183)]();else{if(_0x5e172c[_0x4d2b12(0x155)](_0x4197bf[_0x4d2b12(0x147)])&&!_0x4e8cb5[_0x4d2b12(0x13e)](this[_0x4d2b12(0x164)])&&this[_0x4d2b12(0x136)](!![]))return!![];else{if(_0x16389d[_0x4d2b12(0x155)](_0x2e2708[_0x4d2b12(0x17d)])&&this['meetsShopCommonEventSwitches'](![]))return!![];}}}else tier=Math['max'](_0x5b8433,tier);}VisuMZ[_0x4d2b12(0x151)](VisuMZ[label][_0x4d2b12(0x12b)],_0x3c044d[_0x4d2b12(0x133)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x39b75e(0x150)],_0x39b75e(0x192),_0x5ddfea=>{const _0x42a367=_0x39b75e;if(!SceneManager[_0x42a367(0x182)]())return;if(!$gameSystem[_0x42a367(0x15d)])return;SceneManager[_0x42a367(0x174)](Scene_Shop),$gameSystem[_0x42a367(0x157)]();}),VisuMZ[_0x39b75e(0x12d)][_0x39b75e(0x129)]={'BuyEventOnce':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]BUY[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'BuyEventRepeat':/<(?:REPEAT|REPEATING|RECURRING)[ ]BUY[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'SellEventOnce':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]SELL[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'SellEventRepeat':/<(?:REPEAT|REPEATING|RECURRING)[ ]SELL[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'buyOnceAllSw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]BUY[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'buyOnceAnySw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]BUY[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i,'buyRepeatAllSw':/<(?:REPEAT|REPEATING|RECURRING)[ ]BUY[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'buyRepeatAnySw':/<(?:REPEAT|REPEATING|RECURRING)[ ]BUY[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i,'sellOnceAllSw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]SELL[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'sellOnceAnySw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]SELL[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i,'sellRepeatAllSw':/<(?:REPEAT|REPEATING|RECURRING)[ ]SELL[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'sellRepeatAnySw':/<(?:REPEAT|REPEATING|RECURRING)[ ]SELL[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i},SceneManager[_0x39b75e(0x182)]=function(){const _0x2fbf8d=_0x39b75e;return this[_0x2fbf8d(0x184)]&&this[_0x2fbf8d(0x184)]['constructor']===Scene_Map;},VisuMZ[_0x39b75e(0x12d)][_0x39b75e(0x130)]=Game_System[_0x39b75e(0x137)]['initialize'],Game_System['prototype'][_0x39b75e(0x12f)]=function(){const _0x2baa74=_0x39b75e;VisuMZ[_0x2baa74(0x12d)][_0x2baa74(0x130)][_0x2baa74(0x14a)](this),this[_0x2baa74(0x175)]();},Game_System['prototype'][_0x39b75e(0x175)]=function(){this['_ShopBuyEvents']={'items':[],'weapons':[],'armors':[]},this['_ShopSellEvents']={'items':[],'weapons':[],'armors':[]};},Game_System[_0x39b75e(0x137)][_0x39b75e(0x15c)]=function(_0xb71f08){const _0x5f49a9=_0x39b75e;if(this['_ShopBuyEvents']===undefined)this[_0x5f49a9(0x175)]();let _0x2f815c=[];if(DataManager['isItem'](_0xb71f08))_0x5f49a9(0x163)!==_0x5f49a9(0x167)?_0x2f815c=this[_0x5f49a9(0x162)]['items']:_0x2fbc3d[_0x5f49a9(0x148)][_0x5f49a9(0x18d)]['call'](this);else{if(DataManager[_0x5f49a9(0x16a)](_0xb71f08))_0x2f815c=this['_ShopBuyEvents'][_0x5f49a9(0x12e)];else DataManager[_0x5f49a9(0x17f)](_0xb71f08)&&(_0x2f815c=this[_0x5f49a9(0x162)][_0x5f49a9(0x16c)]);}if(!_0x2f815c['includes'](_0xb71f08['id'])){if(_0x5f49a9(0x17c)===_0x5f49a9(0x17c))_0x2f815c[_0x5f49a9(0x174)](_0xb71f08['id']);else return this[_0x5f49a9(0x184)]&&this[_0x5f49a9(0x184)][_0x5f49a9(0x165)]===_0x35b21b;}},Game_System['prototype']['hasShopBuyEventOccurred']=function(_0x436193){const _0x44deb7=_0x39b75e;if(this['_ShopBuyEvents']===undefined)this[_0x44deb7(0x175)]();let _0x1e96c0=[];if(DataManager[_0x44deb7(0x172)](_0x436193))_0x1e96c0=this[_0x44deb7(0x162)][_0x44deb7(0x197)];else{if(DataManager[_0x44deb7(0x16a)](_0x436193))_0x1e96c0=this[_0x44deb7(0x162)]['weapons'];else DataManager[_0x44deb7(0x17f)](_0x436193)&&(_0x1e96c0=this[_0x44deb7(0x162)]['armors']);}return _0x1e96c0[_0x44deb7(0x191)](_0x436193['id']);},Game_System[_0x39b75e(0x137)]['registerShopSellEvent']=function(_0xa53eb2){const _0x11a497=_0x39b75e;if(this[_0x11a497(0x152)]===undefined)this[_0x11a497(0x175)]();let _0x5b1d7e=[];if(DataManager[_0x11a497(0x172)](_0xa53eb2))_0x5b1d7e=this[_0x11a497(0x152)][_0x11a497(0x197)];else{if(DataManager[_0x11a497(0x16a)](_0xa53eb2))_0x5b1d7e=this[_0x11a497(0x152)][_0x11a497(0x12e)];else DataManager['isArmor'](_0xa53eb2)&&('kwaKr'!=='lmddx'?_0x5b1d7e=this[_0x11a497(0x152)][_0x11a497(0x16c)]:_0x135a82=_0x4bbf83(_0x3fd309['$1'])||0x1);}!_0x5b1d7e['includes'](_0xa53eb2['id'])&&_0x5b1d7e[_0x11a497(0x174)](_0xa53eb2['id']);},Game_System[_0x39b75e(0x137)][_0x39b75e(0x146)]=function(_0x54ac8c){const _0x328c40=_0x39b75e;if(this[_0x328c40(0x152)]===undefined)this[_0x328c40(0x175)]();let _0x1165dd=[];if(DataManager[_0x328c40(0x172)](_0x54ac8c))_0x1165dd=this[_0x328c40(0x152)][_0x328c40(0x197)];else{if(DataManager['isWeapon'](_0x54ac8c)){if(_0x328c40(0x12c)===_0x328c40(0x13f))return!![];else _0x1165dd=this[_0x328c40(0x152)][_0x328c40(0x12e)];}else DataManager['isArmor'](_0x54ac8c)&&(_0x1165dd=this[_0x328c40(0x152)][_0x328c40(0x16c)]);}return _0x1165dd[_0x328c40(0x191)](_0x54ac8c['id']);},Game_System[_0x39b75e(0x137)][_0x39b75e(0x178)]=function(){const _0x57e2ef=_0x39b75e,_0x5a9751=SceneManager[_0x57e2ef(0x184)];this[_0x57e2ef(0x15d)]={'_goods':_0x5a9751[_0x57e2ef(0x181)],'_purchaseOnly':_0x5a9751[_0x57e2ef(0x134)],'_interpreter':$gameMap[_0x57e2ef(0x194)]};},Game_System[_0x39b75e(0x137)][_0x39b75e(0x157)]=function(){const _0x3a225a=_0x39b75e,_0x5170aa=this[_0x3a225a(0x15d)],_0x2e2741=_0x5170aa['_goods']||[],_0x50eed6=_0x5170aa[_0x3a225a(0x134)]||![];SceneManager[_0x3a225a(0x142)](_0x2e2741,_0x50eed6),$gameMap['_interpreter']=_0x5170aa[_0x3a225a(0x194)]||new Game_Interpreter(),delete this[_0x3a225a(0x15d)];},VisuMZ[_0x39b75e(0x12d)]['Scene_Shop_onNumberOk']=Scene_Shop[_0x39b75e(0x137)][_0x39b75e(0x196)],Scene_Shop['prototype'][_0x39b75e(0x196)]=function(){const _0x1bf898=_0x39b75e;this[_0x1bf898(0x18a)]=!![],VisuMZ[_0x1bf898(0x12d)][_0x1bf898(0x18c)][_0x1bf898(0x14a)](this),this[_0x1bf898(0x18a)]=![];},VisuMZ['ItemsEquipsCore'][_0x39b75e(0x18d)]=Scene_Shop[_0x39b75e(0x137)][_0x39b75e(0x166)],Scene_Shop[_0x39b75e(0x137)][_0x39b75e(0x166)]=function(){const _0x5342d1=_0x39b75e;if(this[_0x5342d1(0x193)]()){if(_0x5342d1(0x189)===_0x5342d1(0x189))this['processShopCommonEvent']();else{if(this[_0x5342d1(0x136)](!![])&&_0x1af79e['match'](_0x18058b['BuyEventOnce'])&&!_0x55ecac[_0x5342d1(0x13e)](this['_item']))_0x7db905=_0x52216a(_0x419cf9['$1'])||0x1,_0x246ebc[_0x5342d1(0x15c)](this['_item']);else this['meetsShopCommonEventSwitches'](![])&&_0x370b53['match'](_0x9df618[_0x5342d1(0x17d)])&&(_0x3b632e=_0x3ab6d1(_0x14753d['$1'])||0x1);}}else VisuMZ[_0x5342d1(0x148)][_0x5342d1(0x18d)][_0x5342d1(0x14a)](this);},Scene_Shop[_0x39b75e(0x137)][_0x39b75e(0x136)]=function(_0x1ba555){const _0x50e545=_0x39b75e,_0x4a23eb=this[_0x50e545(0x160)][_0x50e545(0x17b)](),_0x7b3d58=this[_0x50e545(0x164)]?this[_0x50e545(0x164)][_0x50e545(0x161)]:'',_0x482d49=VisuMZ[_0x50e545(0x12d)][_0x50e545(0x129)],_0xcd359c=_0x50e545(0x188)[_0x50e545(0x135)](_0x4a23eb,_0x1ba555?'Once':_0x50e545(0x144));if(_0x7b3d58[_0x50e545(0x155)](_0x482d49[_0xcd359c+_0x50e545(0x149)])){const _0x2407a5=RegExp['$1'][_0x50e545(0x16b)](',')[_0x50e545(0x13b)](_0x5336f3=>Number(_0x5336f3));for(const _0x677e4b of _0x2407a5){if($gameSwitches[_0x50e545(0x168)](_0x677e4b)===![])return![];}}if(_0x7b3d58['match'](_0x482d49[_0xcd359c+_0x50e545(0x187)])){const _0x114814=RegExp['$1'][_0x50e545(0x16b)](',')['map'](_0x53ec8e=>Number(_0x53ec8e));for(const _0x326a19 of _0x114814){if(_0x50e545(0x14f)==='dpOnp'){if($gameSwitches[_0x50e545(0x168)](_0x326a19)===!![])return!![];}else _0x377d5e[_0x50e545(0x174)](_0x191068['id']);}return![];}return!![];},Scene_Shop[_0x39b75e(0x137)][_0x39b75e(0x193)]=function(){const _0x420c5a=_0x39b75e;if(!this[_0x420c5a(0x18a)])return![];const _0x11f7c1=this[_0x420c5a(0x160)]['currentSymbol'](),_0x230809=this[_0x420c5a(0x164)]?this[_0x420c5a(0x164)]['note']:'',_0x450672=VisuMZ[_0x420c5a(0x12d)][_0x420c5a(0x129)];if(_0x11f7c1===_0x420c5a(0x139)){if(_0x230809[_0x420c5a(0x155)](_0x450672[_0x420c5a(0x147)])&&!$gameSystem[_0x420c5a(0x13e)](this[_0x420c5a(0x164)])&&this['meetsShopCommonEventSwitches'](!![]))return!![];else{if(_0x230809[_0x420c5a(0x155)](_0x450672['BuyEventRepeat'])&&this[_0x420c5a(0x136)](![])){if('knCcx'===_0x420c5a(0x14b))_0x5b4da3['ShopCommonEvents'][_0x420c5a(0x130)][_0x420c5a(0x14a)](this),this[_0x420c5a(0x175)]();else return!![];}}}else{if(_0x11f7c1===_0x420c5a(0x14e)){if(_0x230809[_0x420c5a(0x155)](_0x450672[_0x420c5a(0x138)])&&!$gameSystem[_0x420c5a(0x146)](this['_item'])&&this[_0x420c5a(0x136)](!![])){if('trGIL'!==_0x420c5a(0x16d))_0x1ff330=this['_ShopBuyEvents'][_0x420c5a(0x12e)];else return!![];}else{if(_0x230809[_0x420c5a(0x155)](_0x450672[_0x420c5a(0x13c)])&&this['meetsShopCommonEventSwitches'](![]))return'tpmmh'==='NCilU'?!![]:!![];}}}return![];},Scene_Shop[_0x39b75e(0x137)][_0x39b75e(0x153)]=function(){const _0x4a29d5=_0x39b75e,_0x331f3d=this[_0x4a29d5(0x160)][_0x4a29d5(0x17b)](),_0x44e892=this[_0x4a29d5(0x164)]?this['_item']['note']:'',_0x1b015e=VisuMZ['ShopCommonEvents']['RegExp'];let _0x40bd59=0x0;if(_0x331f3d===_0x4a29d5(0x139)){if(_0x4a29d5(0x141)!==_0x4a29d5(0x141)){if(this['meetsShopCommonEventSwitches'](!![])&&_0x165bfc[_0x4a29d5(0x155)](_0x2f8e19[_0x4a29d5(0x138)])&&!_0x435407[_0x4a29d5(0x146)](this['_item']))_0xd457e8=_0x2ed5d6(_0x16d2a4['$1'])||0x1,_0x47360c[_0x4a29d5(0x173)](this[_0x4a29d5(0x164)]);else this[_0x4a29d5(0x136)](![])&&_0x1d2c9b[_0x4a29d5(0x155)](_0x566cb1[_0x4a29d5(0x13c)])&&(_0x1829fc=_0x39f187(_0x4c2f86['$1'])||0x1);}else{if(this['meetsShopCommonEventSwitches'](!![])&&_0x44e892['match'](_0x1b015e[_0x4a29d5(0x147)])&&!$gameSystem[_0x4a29d5(0x13e)](this[_0x4a29d5(0x164)]))_0x40bd59=Number(RegExp['$1'])||0x1,$gameSystem[_0x4a29d5(0x15c)](this[_0x4a29d5(0x164)]);else this[_0x4a29d5(0x136)](![])&&_0x44e892[_0x4a29d5(0x155)](_0x1b015e[_0x4a29d5(0x17d)])&&('ZedBZ'!==_0x4a29d5(0x17e)?_0x40bd59=Number(RegExp['$1'])||0x1:_0x49ae5d=this['_ShopBuyEvents'][_0x4a29d5(0x16c)]);}}else{if(_0x331f3d==='sell'){if(this[_0x4a29d5(0x136)](!![])&&_0x44e892[_0x4a29d5(0x155)](_0x1b015e[_0x4a29d5(0x138)])&&!$gameSystem[_0x4a29d5(0x146)](this[_0x4a29d5(0x164)]))_0x40bd59=Number(RegExp['$1'])||0x1,$gameSystem[_0x4a29d5(0x173)](this['_item']);else this['meetsShopCommonEventSwitches'](![])&&_0x44e892[_0x4a29d5(0x155)](_0x1b015e[_0x4a29d5(0x13c)])&&('AXZrD'===_0x4a29d5(0x145)?_0x32fa66=this['_ShopSellEvents'][_0x4a29d5(0x16c)]:_0x40bd59=Number(RegExp['$1'])||0x1);}}if(_0x40bd59<=0x0){VisuMZ[_0x4a29d5(0x148)][_0x4a29d5(0x18d)][_0x4a29d5(0x14a)](this);return;}const _0x21565a=VisuMZ['ShopCommonEvents']['Settings'],_0x16c8a2=_0x331f3d===_0x4a29d5(0x139)?_0x21565a['BuyVariable']:_0x21565a[_0x4a29d5(0x177)];_0x16c8a2>0x0&&$gameVariables['setValue'](_0x16c8a2,this[_0x4a29d5(0x190)]['number']()),$gameSystem[_0x4a29d5(0x178)](),$gameMap[_0x4a29d5(0x194)]=new Game_Interpreter(),$gameTemp['reserveCommonEvent'](_0x40bd59),SceneManager[_0x4a29d5(0x195)](Scene_Map);};
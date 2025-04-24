//=============================================================================
// VisuStella MZ - More Shop Currencies
// VisuMZ_2_MoreCurrencies.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_MoreCurrencies = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MoreCurrencies = VisuMZ.MoreCurrencies || {};
VisuMZ.MoreCurrencies.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.01] [MoreCurrencies]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/More_Currencies_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin expands the shop scene's functionality by allowing the game dev
 * to create items that can be sold for items and/or variables instead of gold.
 * Or you know what? Throw gold in there, too. Any combination of the them! By
 * doing so, gold no longer becomes the default currency for every shop, as
 * some special shops may require a different type of trade.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Items can be bought using items, weapons, armors, variables, gold, or any
 *   of the combinations listed.
 * * Sell items this way, too!
 * * Sold item listing window will now show the amount the player can get back
 *   per unit sold.
 * * Shop scene's calculation window is now updated to show the transaction
 *   details from how much the player owns to how much will be spent to what
 *   kind of result there will be.
 * * Proxy system support allows for shops to sell the same items but using
 *   different types of currencies.
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
 * * VisuMZ_0_CoreEngine
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
 * Window_ShopNumber
 * 
 * The visual contents of this window have been completely overhauled to show
 * the details of what transactions are happening. This includes how much or
 * many of a resource the player owns, how much will be involved in the actual
 * transaction, and the net outcome after the transaction has taken place.
 * 
 * Naturally, this means that things will have to shift around in order for the
 * space to make any sense.
 *
 * ---
 *
 * Proxy Items
 * 
 * Proxy Items are temporary substitutes for another. When they are acquired
 * through shopping, they will turn into the item, weapon, or armor they are a
 * proxy for. Only the icon, name, help description, and status details will
 * match up. Everything else will remain separate such as the notetag data and
 * the trading list. This allows you to effectively have multiple ways to
 * trade the same item using different item combinations.
 * 
 * For more details, look inside of the Notetags section for Proxy items.
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
 * === Cost-Related Notetags ===
 * 
 * ---
 *
 * <Item id Buy Cost: x>
 * <Item name Buy Cost: x>
 * 
 * <Item id Sell Cost: x>
 * <Item name Sell Cost: x>
 * 
 * <Item id Cost: x>
 * <Item name Cost: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - The "buy" variant determines the item and quantity needed to purchase this
 *   object in the shop.
 * - The "sell" variant determines the item and quantity acquired when selling
 *   this object in the shop.
 * - The neither variant will determine both buy/sell transactions related to
 *   the item and quantities when selling.
 *   - Selling the object will yield a lower quantity determined by the sell
 *     rate found in Plugin Parameters > General > Automatic Sell Rate.
 *   - This variant cannot be used with the Buy/Sell notetag variants. If
 *     either the buy or sell notetag variants are detected, this doesn't work.
 * - Replace 'id' with a number representing the ID of the item to be taken
 *   (when bought) or acquired (when sold).
 * - Replace 'name' with the name of the item to be taken (when bought) or
 *   acquired (when sold).
 * - Replace 'x' with the quantity of the item that will be taken (when bought)
 *   or acquired (when sold).
 * - Insert multiple copies of these notetags to add more item costs.
 *
 * ---
 *
 * <Weapon id Buy Cost: x>
 * <Weapon name Buy Cost: x>
 * 
 * <Weapon id Sell Cost: x>
 * <Weapon name Sell Cost: x>
 * 
 * <Weapon id Cost: x>
 * <Weapon name Cost: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - The "buy" variant determines the weapon and quantity needed to purchase
 *   this object in the shop.
 * - The "sell" variant determines the weapon and quantity acquired when
 *   selling this object in the shop.
 * - The neither variant will determine both buy/sell transactions related to
 *   the weapon and quantities when selling.
 *   - Selling the object will yield a lower quantity determined by the sell
 *     rate found in Plugin Parameters > General > Automatic Sell Rate.
 *   - This variant cannot be used with the Buy/Sell notetag variants. If
 *     either the buy or sell notetag variants are detected, this doesn't work.
 * - Replace 'id' with a number representing the ID of the weapon to be taken
 *   (when bought) or acquired (when sold).
 * - Replace 'name' with the name of the weapon to be taken (when bought) or
 *   acquired (when sold).
 * - Replace 'x' with the quantity of the weapon that will be taken (when
 *   bought) or acquired (when sold).
 * - Insert multiple copies of these notetags to add more weapon costs.
 *
 * ---
 *
 * <Armor id Buy Cost: x>
 * <Armor name Buy Cost: x>
 * 
 * <Armor id Sell Cost: x>
 * <Armor name Sell Cost: x>
 * 
 * <Armor id Cost: x>
 * <Armor name Cost: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - The "buy" variant determines the armor and quantity needed to purchase
 *   this object in the shop.
 * - The "sell" variant determines the armor and quantity acquired when
 *   selling this object in the shop.
 * - The neither variant will determine both buy/sell transactions related to
 *   the armor and quantities when selling.
 *   - Selling the object will yield a lower quantity determined by the sell
 *     rate found in Plugin Parameters > General > Automatic Sell Rate.
 *   - This variant cannot be used with the Buy/Sell notetag variants. If
 *     either the buy or sell notetag variants are detected, this doesn't work.
 * - Replace 'id' with a number representing the ID of the armor to be taken
 *   (when bought) or acquired (when sold).
 * - Replace 'name' with the name of the armor to be taken (when bought) or
 *   acquired (when sold).
 * - Replace 'x' with the quantity of the armor that will be taken (when
 *   bought) or acquired (when sold).
 * - Insert multiple copies of these notetags to add more armor costs.
 *
 * ---
 *
 * <Variable id Buy Cost: x>
 * 
 * <Variable id Sell Cost: x>
 * 
 * <Variable id Cost: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - The "buy" variant determines the variable and quantity needed to purchase
 *   this object in the shop.
 * - The "sell" variant determines the variable and quantity acquired when
 *   selling this object in the shop.
 * - The neither variant will determine both buy/sell transactions related to
 *   the variable and quantities when selling.
 *   - Selling the object will yield a lower quantity determined by the sell
 *     rate found in Plugin Parameters > General > Automatic Sell Rate.
 *   - This variant cannot be used with the Buy/Sell notetag variants. If
 *     either the buy or sell notetag variants are detected, this doesn't work.
 * - Replace 'id' with a number representing the ID of the variable to be taken
 *   (when bought) or acquired (when sold).
 * - Replace 'name' with the name of the variable to be taken (when bought) or
 *   acquired (when sold).
 * - Replace 'x' with the quantity of the variable that will be taken (when
 *   bought) or acquired (when sold).
 * - Insert multiple copies of these notetags to add more variable costs.
 *
 * ---
 * 
 * === Proxy Notetags ===
 * 
 * ---
 * 
 * <Proxy: id>
 * <Proxy: name>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - REQUIRES the most up to date VisuMZ Items and Equips Core!
 * - Turns this item, weapon, or armor into a proxy for another item, allowing
 *   you to create trades with different components using the above notetag
 *   contents and yield the same item.
 * - The proxy item itself will take on the name, icon, and description of the
 *   original item it is supposed to represent.
 * - No other properties are carried over from the original.
 * - When viewed through the Window_ShopStatus window, the contents will
 *   reference the original item and not the proxy item.
 * - Proxy items themselves cannot be acquired. This includes event commands,
 *   item drops, or equips.
 * - When bought, the item yielded won't be the proxy item but the item it is
 *   a proxy for.
 * - Replace 'id' with a number representing the item, weapon, or armor ID of
 *   the same item type. If the proxy is an item, this will reference an item.
 *   If the proxy is a weapon, this will reference a weapon. Same for armors.
 * - Replace 'name' with text representing the item, weapon, or armor's name.
 *   The referenced item needs to be the same item type as the proxy. Item for
 *   item, weapon for weapon, armor for armor.
 * - Insert multiple copies of these notetags to add more variables costs.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Default settings for More Currencies.
 *
 * ---
 *
 * General
 * 
 *   Automatic Sell Rate:
 *   - When using the plain "Cost" notetags, use this sell rate.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Owned:
 *   - Text used for how much of an item is owned.
 * 
 *   Shift:
 *   - Text used for the change in value.
 * 
 *   Net:
 *   - Text used for the net result.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Listing Settings
 * ============================================================================
 *
 * Settings for the currency listings.
 *
 * ---
 *
 * Listing
 * 
 *   Listing Order:
 *   - Determines the order the trade components are listed.
 * 
 *   Show Sell Window:
 *   - Show listed items in the sell window?
 * 
 *   List Font Size:
 *   - Font size used for listed items.
 * 
 *   List Padding:
 *   - Pixel padding between listed items.
 *
 * ---
 *
 * Text Format
 * 
 *   Item Format:
 *   Weapon Format:
 *   Armor Format:
 *   Variable Format:
 *   - Text format used for listed items.
 *   - %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name
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
 * Version 1.01: February 17, 2022
 * * Bug Fixes!
 * ** Item, Weapon, Armor Cost Notetags should no work properly. Fix by Irina.
 * * Documentation Update!
 * ** Added documentation for the following notetags:
 * *** <Variable id Buy Cost: x>
 * *** <Variable id Sell Cost: x>
 * *** <Variable id Cost: x>
 * 
 * Version 1.00 Official Release Date: March 7, 2022
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
 * @param MoreCurrencies
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc Default settings for More Currencies.
 * @default {"General":"","AutoSellRate:num":"0.50","Vocab":"","NumWindowOwned:str":"Owned","NumWindowShift:str":"Change","NumWindowNet:str":"Net"}
 *
 * @param Listing:struct
 * @text Listing Settings
 * @type struct<Listing>
 * @desc Settings for the currency listings.
 * @default {"Listing":"","ListOrder:arraystr":"[\"item\",\"weapon\",\"armor\",\"variable\",\"gold\"]","ShowSell:eval":"true","BuyFontSize:num":"22","BuyPadding:num":"16","Format":"","ItemBuyFmt:str":"%1%3","WeaponBuyFmt:str":"%1%3","ArmorsBuyFmt:str":"%1%3","VariableBuyFmt:str":"%1%4"}
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
/*~struct~General:
 *
 * @param General
 *
 * @param AutoSellRate:num
 * @text Automatic Sell Rate
 * @parent General
 * @desc When using the plain "Cost" notetags, use this sell rate.
 * @default 0.50
 * 
 * @param Vocab
 * @text Vocabulary
 *
 * @param NumWindowOwned:str
 * @text Owned
 * @parent Vocab
 * @desc Text used for how much of an item is owned.
 * @default Owned
 *
 * @param NumWindowShift:str
 * @text Shift
 * @parent Vocab
 * @desc Text used for the change in value.
 * @default Change
 *
 * @param NumWindowNet:str
 * @text Net
 * @parent Vocab
 * @desc Text used for the net result.
 * @default Net
 *
 */
/* ----------------------------------------------------------------------------
 * Listing Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Listing:
 *
 * @param Listing
 *
 * @param ListOrder:arraystr
 * @text Listing Order
 * @parent Listing
 * @type select[]
 * @option item
 * @option weapon
 * @option armor
 * @option variable
 * @option gold
 * @desc Determines the order the trade components are listed.
 * @default ["item","weapon","armor","variable","gold"]
 *
 * @param ShowSell:eval
 * @text Show Sell Window
 * @parent Listing
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show listed items in the sell window?
 * @default true
 *
 * @param BuyFontSize:num
 * @text List Font Size
 * @parent Listing
 * @type number
 * @min 1
 * @desc Font size used for listed items.
 * @default 22
 *
 * @param BuyPadding:num
 * @text List Padding
 * @parent Listing
 * @type number
 * @min 1
 * @desc Pixel padding between listed items.
 * @default 16
 * 
 * @param Format
 * @text Text Format
 *
 * @param ItemBuyFmt:str
 * @text Item Format
 * @parent Format
 * @desc Text format used for listed items.
 * %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name
 * @default %1%3
 *
 * @param WeaponBuyFmt:str
 * @text Weapon Format
 * @parent Format
 * @desc Text format used for listed weapons.
 * %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name
 * @default %1%3
 *
 * @param ArmorsBuyFmt:str
 * @text Armors Format
 * @parent Format
 * @desc Text format used for listed armors.
 * %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name
 * @default %1%3
 *
 * @param VariableBuyFmt:str
 * @text Variable Format
 * @parent Format
 * @desc Text format used for listed variables.
 * %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name
 * @default %1%4
 *
 */
//=============================================================================

function _0x14d1(_0x5d6069,_0x20c1dd){const _0x50f4f7=_0x50f4();return _0x14d1=function(_0x14d183,_0xbc353){_0x14d183=_0x14d183-0x10f;let _0x579246=_0x50f4f7[_0x14d183];return _0x579246;},_0x14d1(_0x5d6069,_0x20c1dd);}const _0x2cea41=_0x14d1;(function(_0xd347cf,_0x51e447){const _0x5c8899=_0x14d1,_0x30bca9=_0xd347cf();while(!![]){try{const _0x5bf585=-parseInt(_0x5c8899(0x10f))/0x1+parseInt(_0x5c8899(0x1a8))/0x2+parseInt(_0x5c8899(0x1aa))/0x3*(-parseInt(_0x5c8899(0x1b7))/0x4)+-parseInt(_0x5c8899(0x1b6))/0x5*(-parseInt(_0x5c8899(0x1e4))/0x6)+parseInt(_0x5c8899(0x180))/0x7*(-parseInt(_0x5c8899(0x1a0))/0x8)+-parseInt(_0x5c8899(0x18f))/0x9*(parseInt(_0x5c8899(0x16a))/0xa)+parseInt(_0x5c8899(0x178))/0xb;if(_0x5bf585===_0x51e447)break;else _0x30bca9['push'](_0x30bca9['shift']());}catch(_0x4504e2){_0x30bca9['push'](_0x30bca9['shift']());}}}(_0x50f4,0xd8f7b));var label=_0x2cea41(0x1e7),tier=tier||0x0,dependencies=[_0x2cea41(0x193),'VisuMZ_1_ItemsEquipsCore'],pluginData=$plugins[_0x2cea41(0x1ea)](function(_0x42a5ca){const _0x56a28f=_0x2cea41;return _0x42a5ca[_0x56a28f(0x1ce)]&&_0x42a5ca[_0x56a28f(0x183)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x2cea41(0x148)]=VisuMZ[label][_0x2cea41(0x148)]||{},VisuMZ['ConvertParams']=function(_0x4c9750,_0x595ae4){const _0xa8c816=_0x2cea41;for(const _0x93995b in _0x595ae4){if(_0x93995b[_0xa8c816(0x17c)](/(.*):(.*)/i)){if(_0xa8c816(0x186)===_0xa8c816(0x186)){const _0x3def46=String(RegExp['$1']),_0x377fad=String(RegExp['$2'])[_0xa8c816(0x134)]()['trim']();let _0x5ba5d0,_0x107b58,_0x24ee0d;switch(_0x377fad){case _0xa8c816(0x15a):_0x5ba5d0=_0x595ae4[_0x93995b]!==''?Number(_0x595ae4[_0x93995b]):0x0;break;case _0xa8c816(0x185):_0x107b58=_0x595ae4[_0x93995b]!==''?JSON['parse'](_0x595ae4[_0x93995b]):[],_0x5ba5d0=_0x107b58['map'](_0x1f6660=>Number(_0x1f6660));break;case _0xa8c816(0x166):_0x5ba5d0=_0x595ae4[_0x93995b]!==''?eval(_0x595ae4[_0x93995b]):null;break;case'ARRAYEVAL':_0x107b58=_0x595ae4[_0x93995b]!==''?JSON[_0xa8c816(0x20f)](_0x595ae4[_0x93995b]):[],_0x5ba5d0=_0x107b58[_0xa8c816(0x1e0)](_0x2e97df=>eval(_0x2e97df));break;case _0xa8c816(0x1ed):_0x5ba5d0=_0x595ae4[_0x93995b]!==''?JSON[_0xa8c816(0x20f)](_0x595ae4[_0x93995b]):'';break;case _0xa8c816(0x1c5):_0x107b58=_0x595ae4[_0x93995b]!==''?JSON['parse'](_0x595ae4[_0x93995b]):[],_0x5ba5d0=_0x107b58['map'](_0x3593ee=>JSON[_0xa8c816(0x20f)](_0x3593ee));break;case _0xa8c816(0x1e9):_0x5ba5d0=_0x595ae4[_0x93995b]!==''?new Function(JSON[_0xa8c816(0x20f)](_0x595ae4[_0x93995b])):new Function(_0xa8c816(0x1e6));break;case _0xa8c816(0x177):_0x107b58=_0x595ae4[_0x93995b]!==''?JSON['parse'](_0x595ae4[_0x93995b]):[],_0x5ba5d0=_0x107b58[_0xa8c816(0x1e0)](_0x1b7bc4=>new Function(JSON[_0xa8c816(0x20f)](_0x1b7bc4)));break;case _0xa8c816(0x203):_0x5ba5d0=_0x595ae4[_0x93995b]!==''?String(_0x595ae4[_0x93995b]):'';break;case _0xa8c816(0x1fe):_0x107b58=_0x595ae4[_0x93995b]!==''?JSON[_0xa8c816(0x20f)](_0x595ae4[_0x93995b]):[],_0x5ba5d0=_0x107b58[_0xa8c816(0x1e0)](_0x4b1bd8=>String(_0x4b1bd8));break;case'STRUCT':_0x24ee0d=_0x595ae4[_0x93995b]!==''?JSON['parse'](_0x595ae4[_0x93995b]):{},_0x5ba5d0=VisuMZ[_0xa8c816(0x19d)]({},_0x24ee0d);break;case _0xa8c816(0x1da):_0x107b58=_0x595ae4[_0x93995b]!==''?JSON[_0xa8c816(0x20f)](_0x595ae4[_0x93995b]):[],_0x5ba5d0=_0x107b58[_0xa8c816(0x1e0)](_0x21d441=>VisuMZ[_0xa8c816(0x19d)]({},JSON[_0xa8c816(0x20f)](_0x21d441)));break;default:continue;}_0x4c9750[_0x3def46]=_0x5ba5d0;}else{const _0x2dff8d=_0xcd3f95?_0x3fd6ea(_0x5865d8):_0x10af9c[_0xa8c816(0x13f)](_0x1548c8);if(!_0x2dff8d)return;_0x438508&&(_0x42eae9[_0xa8c816(0x154)]=_0x587a3e[_0xa8c816(0x154)]||{},_0x3557b9[_0xa8c816(0x154)][_0x2dff8d]=_0x20bee2),_0x2acf35&&(_0x33e0ec[_0xa8c816(0x159)]=_0x40ca9f[_0xa8c816(0x159)]||{},_0x495408[_0xa8c816(0x159)][_0x2dff8d]=_0x2bf2bd[_0xa8c816(0x165)](_0x31e2cd*(_0x4297d6?_0x2a6fbd:0x1)));}}}return _0x4c9750;},(_0x12fb92=>{const _0x470194=_0x2cea41,_0x2011fd=_0x12fb92['name'];for(const _0x2e46e2 of dependencies){if(_0x470194(0x1bb)!=='hnQtF'){if(!Imported[_0x2e46e2]){alert(_0x470194(0x20c)[_0x470194(0x1f1)](_0x2011fd,_0x2e46e2)),SceneManager['exit']();break;}}else{_0x4888c8[_0x470194(0x1e7)][_0x470194(0x1ab)][_0x470194(0x164)](this,_0x3bb33d);if(_0x1faee0<=0x0)return;_0x5b4b8d[_0x470194(0x13a)]=!![],_0x52af26=this[_0x470194(0x114)]['item'](),_0x908ee[_0x470194(0x13a)]=![],_0x251eb0[_0x470194(0x1e7)][_0x470194(0x1e5)](_0x43ed08,-_0x3af139);}}const _0x179c03=_0x12fb92[_0x470194(0x183)];if(_0x179c03[_0x470194(0x17c)](/\[Version[ ](.*?)\]/i)){if(_0x470194(0x15e)===_0x470194(0x15e)){const _0x5c5eb7=Number(RegExp['$1']);_0x5c5eb7!==VisuMZ[label][_0x470194(0x122)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x470194(0x1f1)](_0x2011fd,_0x5c5eb7)),SceneManager[_0x470194(0x1f9)]());}else{const _0x2c60af=_0x470194(0x16d),_0x317084=_0x2d4bfa[_0x470194(0x167)][_0x470194(0x148)][_0x470194(0x179)][_0x470194(0x1cf)],_0x52a7f1=_0x2e71c1['currencyUnit'];return _0x2c60af[_0x470194(0x1f1)](_0x39f93c,_0x317084>0x0?_0x470194(0x161)[_0x470194(0x1f1)](_0x317084):'',_0x317084>0x0?'':_0x52a7f1);}}if(_0x179c03[_0x470194(0x17c)](/\[Tier[ ](\d+)\]/i)){const _0x3dbc72=Number(RegExp['$1']);_0x3dbc72<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x470194(0x1f1)](_0x2011fd,_0x3dbc72,tier)),SceneManager[_0x470194(0x1f9)]()):'rfRej'===_0x470194(0x13c)?tier=Math[_0x470194(0x1c3)](_0x3dbc72,tier):this[_0x470194(0x18d)](_0x502b5d,_0x42b9fc,_0x221a1f);}VisuMZ[_0x470194(0x19d)](VisuMZ[label][_0x470194(0x148)],_0x12fb92[_0x470194(0x17e)]);})(pluginData);if(VisuMZ[_0x2cea41(0x129)][_0x2cea41(0x122)]<1.37){let text='';text+='VisuMZ_1_ItemsEquipsCore\x20needs\x20to\x20be\x20updated\x20',text+=_0x2cea41(0x1ef),alert(text),SceneManager[_0x2cea41(0x1f9)]();}VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x200)]={'SubCost':/<(ITEM|WEAPON|ARMOR|VARIABLE)[ ](.*?)[ ]COST:[ ](\d+)>/gi,'SubBuyCost':/<(ITEM|WEAPON|ARMOR|VARIABLE)[ ](.*?)[ ]BUY COST:[ ](\d+)>/gi,'SubSellCost':/<(ITEM|WEAPON|ARMOR|VARIABLE)[ ](.*?)[ ]SELL COST:[ ](\d+)>/gi},VisuMZ['MoreCurrencies'][_0x2cea41(0x1be)]=Scene_Boot[_0x2cea41(0x111)][_0x2cea41(0x1a2)],Scene_Boot[_0x2cea41(0x111)]['onDatabaseLoaded']=function(){const _0x1a9012=_0x2cea41;DataManager[_0x1a9012(0x1af)](),VisuMZ[_0x1a9012(0x1e7)][_0x1a9012(0x1be)][_0x1a9012(0x164)](this),this[_0x1a9012(0x13e)]();},Scene_Boot[_0x2cea41(0x111)][_0x2cea41(0x13e)]=function(){const _0x19581c=_0x2cea41;this[_0x19581c(0x190)]();},Scene_Boot[_0x2cea41(0x111)]['process_VisuMZ_MoreCurrencies_Notetags']=function(){const _0x5640bb=_0x2cea41;if(VisuMZ[_0x5640bb(0x1a6)])return;const _0x52209d=[$dataItems,$dataWeapons,$dataArmors];for(const _0x57b50f of _0x52209d){for(const _0x1e352e of _0x57b50f){if(!_0x1e352e)continue;VisuMZ[_0x5640bb(0x1e7)][_0x5640bb(0x194)](_0x1e352e);}}},VisuMZ['MoreCurrencies']['ParseItemNotetags']=VisuMZ[_0x2cea41(0x14d)],VisuMZ[_0x2cea41(0x14d)]=function(_0x380ee7){const _0x27eba4=_0x2cea41;VisuMZ[_0x27eba4(0x1e7)]['ParseItemNotetags'][_0x27eba4(0x164)](this,_0x380ee7),VisuMZ[_0x27eba4(0x1e7)]['ParseNotetagCosts'](_0x380ee7);},VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x138)]=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x2cea41(0x138)]=function(_0x4580f9){const _0x4ed172=_0x2cea41;VisuMZ[_0x4ed172(0x1e7)][_0x4ed172(0x138)][_0x4ed172(0x164)](this,_0x4580f9),VisuMZ[_0x4ed172(0x1e7)][_0x4ed172(0x194)](_0x4580f9);},VisuMZ['MoreCurrencies'][_0x2cea41(0x145)]=VisuMZ[_0x2cea41(0x145)],VisuMZ[_0x2cea41(0x145)]=function(_0x324c9d){const _0x52d0fb=_0x2cea41;VisuMZ[_0x52d0fb(0x1e7)][_0x52d0fb(0x145)][_0x52d0fb(0x164)](this,_0x324c9d),VisuMZ[_0x52d0fb(0x1e7)][_0x52d0fb(0x194)](_0x324c9d);},VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x194)]=function(_0x42d309){const _0x1b6df0=_0x2cea41;if(!_0x42d309)return;const _0x3191dd=VisuMZ[_0x1b6df0(0x1e7)]['RegExp'],_0xffc263=_0x42d309[_0x1b6df0(0x208)];if(!_0xffc263['match'](_0x3191dd['SubCost'])&&!_0xffc263['match'](_0x3191dd[_0x1b6df0(0x118)])&&!_0xffc263[_0x1b6df0(0x17c)](_0x3191dd[_0x1b6df0(0x1df)]))return;const _0x4e91b0=DataManager[_0x1b6df0(0x1c1)](_0x42d309);_0x4e91b0[_0x42d309['id']]=_0x4e91b0[_0x42d309['id']]||{},_0xffc263[_0x1b6df0(0x17c)](_0x3191dd[_0x1b6df0(0x118)])||_0xffc263[_0x1b6df0(0x17c)](_0x3191dd['SubSellCost'])?(this[_0x1b6df0(0x17a)](_0x42d309,_0x4e91b0[_0x42d309['id']],_0x1b6df0(0x118)),this[_0x1b6df0(0x17a)](_0x42d309,_0x4e91b0[_0x42d309['id']],_0x1b6df0(0x1df))):this[_0x1b6df0(0x17a)](_0x42d309,_0x4e91b0[_0x42d309['id']],_0x1b6df0(0x146));},VisuMZ['MoreCurrencies'][_0x2cea41(0x17a)]=function(_0x23f4ef,_0x375ff0,_0x49e18e){const _0x5c08a7=_0x2cea41,_0x475095=VisuMZ[_0x5c08a7(0x1e7)]['RegExp'],_0x187ca1=_0x23f4ef['note'],_0x231eb4=_0x187ca1[_0x5c08a7(0x17c)](_0x475095[_0x49e18e]);if(_0x231eb4)for(const _0x40a0e2 of _0x231eb4){if('VHCTh'!==_0x5c08a7(0x130))this['ParseNotetagLineSubCosts'](_0x40a0e2,_0x375ff0,_0x49e18e);else return _0x14dbe1[_0x5c08a7(0x165)](this['totalPriceY']()+this[_0x5c08a7(0x16f)]()*0x2);}},VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x152)]=function(_0xe6907e,_0x5e1436,_0x5edb92){const _0x32d843=_0x2cea41,_0x10df0d=VisuMZ['MoreCurrencies']['RegExp'];_0xe6907e[_0x32d843(0x17c)](_0x10df0d[_0x5edb92]);const _0x1c187a=[_0x32d843(0x146),'SubBuyCost'][_0x32d843(0x151)](_0x5edb92),_0x175a05=['SubCost',_0x32d843(0x1df)][_0x32d843(0x151)](_0x5edb92),_0x15f8da=_0x5edb92===_0x32d843(0x146),_0x4d7c6b=DataManager[_0x32d843(0x1b8)],_0x5e8671=String(RegExp['$1'])[_0x32d843(0x134)]()[_0x32d843(0x140)](),_0x323b11=String(RegExp['$2'])[_0x32d843(0x140)](),_0xe5410f=Number(RegExp['$3'])||0x0,_0x4a0212=/^\d+$/[_0x32d843(0x15b)](_0x323b11);if(_0x5e8671===_0x32d843(0x12f)){const _0x31cf82=_0x4a0212?Number(_0x323b11):DataManager[_0x32d843(0x1b5)](_0x323b11);if(!_0x31cf82)return;_0x1c187a&&(_0x5e1436['buyItemCosts']=_0x5e1436['buyItemCosts']||{},_0x5e1436[_0x32d843(0x1b2)][_0x31cf82]=_0xe5410f),_0x175a05&&(_0x5e1436['sellItemCosts']=_0x5e1436[_0x32d843(0x139)]||{},_0x5e1436['sellItemCosts'][_0x31cf82]=Math[_0x32d843(0x165)](_0xe5410f*(_0x15f8da?_0x4d7c6b:0x1)));}else{if(_0x5e8671===_0x32d843(0x150)){const _0x49f30f=_0x4a0212?Number(_0x323b11):DataManager[_0x32d843(0x13f)](_0x323b11);if(!_0x49f30f)return;if(_0x1c187a){if(_0x32d843(0x1a3)!=='uGKvZ')return this[_0x32d843(0x1fc)][_0x32d843(0x14f)];else _0x5e1436[_0x32d843(0x154)]=_0x5e1436[_0x32d843(0x154)]||{},_0x5e1436[_0x32d843(0x154)][_0x49f30f]=_0xe5410f;}_0x175a05&&(_0x5e1436[_0x32d843(0x159)]=_0x5e1436[_0x32d843(0x159)]||{},_0x5e1436['sellWeaponCosts'][_0x49f30f]=Math[_0x32d843(0x165)](_0xe5410f*(_0x15f8da?_0x4d7c6b:0x1)));}else{if(_0x5e8671==='ARMOR'){if(_0x32d843(0x1ba)===_0x32d843(0x1a1)){if(!_0x5e4858)return;const _0x389194=_0x5768e5[_0x32d843(0x1e7)][_0x32d843(0x200)],_0x1aef72=_0x4e0856[_0x32d843(0x208)];if(!_0x1aef72[_0x32d843(0x17c)](_0x389194['SubCost'])&&!_0x1aef72[_0x32d843(0x17c)](_0x389194[_0x32d843(0x118)])&&!_0x1aef72[_0x32d843(0x17c)](_0x389194['SubSellCost']))return;const _0x5bb527=_0x34c62e[_0x32d843(0x1c1)](_0x177403);_0x5bb527[_0x344f16['id']]=_0x5bb527[_0x2aec1e['id']]||{},_0x1aef72[_0x32d843(0x17c)](_0x389194[_0x32d843(0x118)])||_0x1aef72[_0x32d843(0x17c)](_0x389194['SubSellCost'])?(this[_0x32d843(0x17a)](_0x2468b8,_0x5bb527[_0x55a958['id']],'SubBuyCost'),this[_0x32d843(0x17a)](_0x2f37ec,_0x5bb527[_0x3ed866['id']],_0x32d843(0x1df))):this[_0x32d843(0x17a)](_0x4a9b6e,_0x5bb527[_0x1cfbc9['id']],'SubCost');}else{const _0x55d2e0=_0x4a0212?Number(_0x323b11):DataManager[_0x32d843(0x1c4)](_0x323b11);if(!_0x55d2e0)return;_0x1c187a&&(_0x5e1436[_0x32d843(0x1ec)]=_0x5e1436['buyArmorCosts']||{},_0x5e1436[_0x32d843(0x1ec)][_0x55d2e0]=_0xe5410f),_0x175a05&&('wunCl'!=='wunCl'?(_0x2b585a[_0x32d843(0x1c6)]=_0x6f70f7[_0x32d843(0x1c6)]||{},_0x1b607d['sellArmorCosts'][_0x89dc65]=_0x490e28[_0x32d843(0x165)](_0x3550c9*(_0x5a8ffb?_0x3b1286:0x1))):(_0x5e1436[_0x32d843(0x1c6)]=_0x5e1436[_0x32d843(0x1c6)]||{},_0x5e1436[_0x32d843(0x1c6)][_0x55d2e0]=Math[_0x32d843(0x165)](_0xe5410f*(_0x15f8da?_0x4d7c6b:0x1))));}}else{if(_0x5e8671==='VARIABLE'){const _0x40b54e=Number(_0x323b11);if(!_0x40b54e)return;_0x1c187a&&(_0x5e1436['buyVariableCosts']=_0x5e1436['buyVariableCosts']||{},_0x5e1436[_0x32d843(0x1a4)][_0x40b54e]=_0xe5410f),_0x175a05&&(_0x5e1436[_0x32d843(0x205)]=_0x5e1436[_0x32d843(0x205)]||{},_0x5e1436['sellVariableCosts'][_0x40b54e]=Math[_0x32d843(0x165)](_0xe5410f*(_0x15f8da?_0x4d7c6b:0x1)));}}}}},DataManager[_0x2cea41(0x1b8)]=VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x148)][_0x2cea41(0x197)][_0x2cea41(0x123)],DataManager[_0x2cea41(0x1b5)]=function(_0x23c157){const _0x557e1f=_0x2cea41;_0x23c157=_0x23c157['toUpperCase']()[_0x557e1f(0x140)](),this[_0x557e1f(0x191)]=this['_itemIDs']||{};if(this[_0x557e1f(0x191)][_0x23c157])return this['_itemIDs'][_0x23c157];for(const _0x580958 of $dataItems){if(!_0x580958)continue;this[_0x557e1f(0x191)][_0x580958['name']['toUpperCase']()[_0x557e1f(0x140)]()]=_0x580958['id'];}return this[_0x557e1f(0x191)][_0x23c157]||0x0;},DataManager[_0x2cea41(0x13f)]=function(_0x4287a8){const _0x2bbc2c=_0x2cea41;_0x4287a8=_0x4287a8['toUpperCase']()['trim'](),this['_weaponIDs']=this[_0x2bbc2c(0x117)]||{};if(this[_0x2bbc2c(0x117)][_0x4287a8])return this[_0x2bbc2c(0x117)][_0x4287a8];for(const _0x4e1d13 of $dataWeapons){if(_0x2bbc2c(0x1d0)!==_0x2bbc2c(0x135)){if(!_0x4e1d13)continue;this[_0x2bbc2c(0x117)][_0x4e1d13[_0x2bbc2c(0x12b)][_0x2bbc2c(0x134)]()[_0x2bbc2c(0x140)]()]=_0x4e1d13['id'];}else{const _0x473316=_0x2dda7c[0x0];this[_0x2bbc2c(0x1d7)]();const _0x16209c=_0x5ab6fd[_0x2bbc2c(0x20d)][_0x2bbc2c(0x201)][_0x2bbc2c(0x1e1)](),_0x65ff6a=_0x16209c===_0x2bbc2c(0x11f);this[_0x2bbc2c(0x125)](_0x33fea6,_0x65ff6a?'-':'+');if(_0x473316===_0x2bbc2c(0x1fd))this[_0x2bbc2c(0x120)](_0xe495a,_0x29ade0,_0x65ff6a);else _0x473316===_0x2bbc2c(0x173)?this['drawMoreCurrenciesVariable'](_0x4a9b91,_0x5c91a5,_0x65ff6a):this['drawMoreCurrenciesItem'](_0x3ce643,_0x1d37f8,_0x65ff6a);}}return this[_0x2bbc2c(0x117)][_0x4287a8]||0x0;},DataManager['getArmorIdWithName']=function(_0x530694){const _0x1d5d5a=_0x2cea41;_0x530694=_0x530694[_0x1d5d5a(0x134)]()['trim'](),this[_0x1d5d5a(0x162)]=this[_0x1d5d5a(0x162)]||{};if(this[_0x1d5d5a(0x162)][_0x530694])return this[_0x1d5d5a(0x162)][_0x530694];for(const _0x3faf75 of $dataArmors){if(!_0x3faf75)continue;this[_0x1d5d5a(0x162)][_0x3faf75[_0x1d5d5a(0x12b)][_0x1d5d5a(0x134)]()[_0x1d5d5a(0x140)]()]=_0x3faf75['id'];}return this[_0x1d5d5a(0x162)][_0x530694]||0x0;},DataManager[_0x2cea41(0x1af)]=function(){const _0x5c84ae=_0x2cea41;this[_0x5c84ae(0x1fc)]=this[_0x5c84ae(0x1fc)]||{'items':{},'weapons':{},'armors':{}};},DataManager[_0x2cea41(0x1c1)]=function(_0x1ae6bf){const _0x2e4f6a=_0x2cea41;if(DataManager[_0x2e4f6a(0x137)](_0x1ae6bf))return this[_0x2e4f6a(0x1fc)][_0x2e4f6a(0x181)];else{if(DataManager[_0x2e4f6a(0x1b0)](_0x1ae6bf))return this[_0x2e4f6a(0x1fc)][_0x2e4f6a(0x14f)];else return DataManager[_0x2e4f6a(0x18a)](_0x1ae6bf)?this[_0x2e4f6a(0x1fc)]['armors']:_0x2e4f6a(0x171)===_0x2e4f6a(0x133)?!![]:{};}},TextManager[_0x2cea41(0x124)]=VisuMZ['MoreCurrencies']['Settings'][_0x2cea41(0x1bf)][_0x2cea41(0x18c)],TextManager[_0x2cea41(0x168)]={'item':VisuMZ['MoreCurrencies'][_0x2cea41(0x148)][_0x2cea41(0x1bf)][_0x2cea41(0x175)],'weapon':VisuMZ['MoreCurrencies'][_0x2cea41(0x148)]['Listing']['WeaponBuyFmt'],'armor':VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x148)][_0x2cea41(0x1bf)][_0x2cea41(0x1d1)],'variable':VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x148)][_0x2cea41(0x1bf)]['VariableBuyFmt']},TextManager[_0x2cea41(0x11e)]={'owned':VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x148)][_0x2cea41(0x197)][_0x2cea41(0x1ff)]||'Owned','shift':VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x148)][_0x2cea41(0x197)][_0x2cea41(0x18b)]||_0x2cea41(0x15f),'net':VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x148)][_0x2cea41(0x197)]['NumWindowNet']||_0x2cea41(0x184)},SceneManager[_0x2cea41(0x12a)]=function(){const _0x258d53=_0x2cea41;return this[_0x258d53(0x20d)]&&this[_0x258d53(0x20d)]['constructor']===Scene_Shop;},VisuMZ[_0x2cea41(0x1e7)]['Scene_Shop_maxBuy']=Scene_Shop[_0x2cea41(0x111)][_0x2cea41(0x20a)],Scene_Shop['prototype'][_0x2cea41(0x20a)]=function(){const _0x2976f1=_0x2cea41;let _0x33869c=[VisuMZ[_0x2976f1(0x1e7)][_0x2976f1(0x132)][_0x2976f1(0x164)](this)];return $gameTemp['_bypassProxy']=!![],item=this[_0x2976f1(0x114)][_0x2976f1(0x127)](),_0x33869c=_0x33869c['concat'](VisuMZ[_0x2976f1(0x1e7)][_0x2976f1(0x1dd)](item)),$gameTemp['_bypassProxy']=![],Math['min'](..._0x33869c);},VisuMZ[_0x2cea41(0x1e7)]['GetMaxBuysForObj']=function(_0x481c4c){const _0x520b71=_0x2cea41;if(!_0x481c4c)return[];const _0x21f8e7=DataManager['getMoreCurrenciesObjLibrary'](_0x481c4c),_0x496c7e=_0x21f8e7[_0x481c4c['id']];if(!_0x496c7e)return[];const _0x242e03=[];for(const _0x47f8f4 in _0x496c7e[_0x520b71(0x1b2)]){const _0x1bb5c1=Number(_0x47f8f4)||0x0;if(!_0x1bb5c1)continue;const _0x45581a=$dataItems[_0x1bb5c1];if(!_0x45581a)continue;const _0x27362d=_0x496c7e[_0x520b71(0x1b2)][_0x47f8f4]||0x1,_0x5d1890=$gameParty[_0x520b71(0x1c7)](_0x45581a),_0x451772=Math['floor'](_0x5d1890/_0x27362d);_0x242e03[_0x520b71(0x1b9)](_0x451772);}for(const _0xacb27c in _0x496c7e['buyWeaponCosts']){if(_0x520b71(0x1f0)===_0x520b71(0x1f0)){const _0x4fce6d=Number(_0xacb27c)||0x0;if(!_0x4fce6d)continue;const _0x4e0622=$dataWeapons[_0x4fce6d];if(!_0x4e0622)continue;const _0x542c65=_0x496c7e[_0x520b71(0x154)][_0xacb27c]||0x1,_0x38c9e2=$gameParty[_0x520b71(0x1c7)](_0x4e0622),_0x4d94c8=Math[_0x520b71(0x165)](_0x38c9e2/_0x542c65);_0x242e03[_0x520b71(0x1b9)](_0x4d94c8);}else{const _0x13b2b4=_0x44860a[_0x520b71(0x1e7)]['RegExp'],_0x4e6d7b=_0x3f85d4[_0x520b71(0x208)],_0x567f61=_0x4e6d7b['match'](_0x13b2b4[_0x14a47a]);if(_0x567f61)for(const _0x4c3864 of _0x567f61){this[_0x520b71(0x152)](_0x4c3864,_0xe3dd5f,_0x29e043);}}}for(const _0x4eae28 in _0x496c7e[_0x520b71(0x1ec)]){const _0x97878b=Number(_0x4eae28)||0x0;if(!_0x97878b)continue;const _0x5e394b=$dataArmors[_0x97878b];if(!_0x5e394b)continue;const _0x524bc0=_0x496c7e['buyArmorCosts'][_0x4eae28]||0x1,_0x25f7ff=$gameParty[_0x520b71(0x1c7)](_0x5e394b),_0x14a489=Math['floor'](_0x25f7ff/_0x524bc0);_0x242e03[_0x520b71(0x1b9)](_0x14a489);}for(const _0x2d9547 in _0x496c7e['buyVariableCosts']){if(_0x520b71(0x1fa)!==_0x520b71(0x1fa))_0x2656ea[_0x520b71(0x159)]=_0x30660c[_0x520b71(0x159)]||{},_0x4f0639['sellWeaponCosts'][_0xff5190]=_0x5f08d6[_0x520b71(0x165)](_0x476b29*(_0x1d5f96?_0x2e4cb7:0x1));else{const _0x48930d=Number(_0x2d9547)||0x0;if(!_0x48930d)continue;const _0x418b97=_0x496c7e[_0x520b71(0x1a4)][_0x2d9547]||0x1,_0x189ce5=$gameVariables[_0x520b71(0x16b)](_0x48930d),_0x4f6a17=Math[_0x520b71(0x165)](_0x189ce5/_0x418b97);_0x242e03[_0x520b71(0x1b9)](_0x4f6a17);}}return _0x242e03;},VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x1ab)]=Scene_Shop[_0x2cea41(0x111)][_0x2cea41(0x195)],Scene_Shop[_0x2cea41(0x111)][_0x2cea41(0x195)]=function(_0x537d8e){const _0x248e4c=_0x2cea41;VisuMZ[_0x248e4c(0x1e7)][_0x248e4c(0x1ab)][_0x248e4c(0x164)](this,_0x537d8e);if(_0x537d8e<=0x0)return;$gameTemp['_bypassProxy']=!![],item=this[_0x248e4c(0x114)][_0x248e4c(0x127)](),$gameTemp['_bypassProxy']=![],VisuMZ[_0x248e4c(0x1e7)][_0x248e4c(0x1e5)](item,-_0x537d8e);},VisuMZ['MoreCurrencies'][_0x2cea41(0x19a)]=Scene_Shop[_0x2cea41(0x111)][_0x2cea41(0x1db)],Scene_Shop['prototype'][_0x2cea41(0x1db)]=function(_0x4f71d5){const _0x2e808b=_0x2cea41;VisuMZ[_0x2e808b(0x1e7)][_0x2e808b(0x19a)][_0x2e808b(0x164)](this,_0x4f71d5);if(_0x4f71d5<=0x0)return;$gameTemp[_0x2e808b(0x13a)]=!![],item=this['_sellWindow']['item'](),$gameTemp['_bypassProxy']=![],VisuMZ[_0x2e808b(0x1e7)][_0x2e808b(0x1e5)](item,_0x4f71d5);},VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x1e5)]=function(_0x27ce90,_0x2073f1){const _0xe06c5b=_0x2cea41;if(!_0x27ce90)return[];const _0x5b91f1=DataManager[_0xe06c5b(0x1c1)](_0x27ce90),_0x25d4f8=_0x5b91f1[_0x27ce90['id']];if(!_0x25d4f8)return[];let _0x5229da={};_0x5229da=_0x2073f1<0x0?_0x25d4f8[_0xe06c5b(0x1b2)]:_0x25d4f8[_0xe06c5b(0x139)];for(const _0x5e4c31 in _0x5229da){if(_0xe06c5b(0x17f)===_0xe06c5b(0x17f)){const _0x1faacd=Number(_0x5e4c31)||0x0;if(!_0x1faacd)continue;const _0x54afeb=$dataItems[_0x1faacd];if(!_0x54afeb)continue;const _0x2c48a9=_0x5229da[_0x5e4c31]||0x1,_0x15326d=_0x2c48a9*_0x2073f1;$gameParty['gainItem'](_0x54afeb,_0x15326d);}else{if(_0x446682[_0xe06c5b(0x1bc)]){const _0x1d903e=_0x3a5a19[_0xe06c5b(0x20d)][_0xe06c5b(0x114)],_0x49f4f5=_0x1d903e['visualGoldDisplayPadding'](),_0x4a278b=_0x1d903e[_0xe06c5b(0x13b)]();_0x4e3965[_0xe06c5b(0x1b9)](_0x46b28b[_0xe06c5b(0x16e)][_0xe06c5b(0x11a)](0x0,_0x49f4f5,_0x4a278b));}else _0x1a5bc3[_0xe06c5b(0x1b9)](_0x732e22[_0xe06c5b(0x1e7)][_0xe06c5b(0x13d)](0x0));}}_0x5229da=_0x2073f1<0x0?_0x25d4f8[_0xe06c5b(0x154)]:_0x25d4f8['sellWeaponCosts'];for(const _0x33aaff in _0x5229da){const _0x11c397=Number(_0x33aaff)||0x0;if(!_0x11c397)continue;const _0x16878e=$dataWeapons[_0x11c397];if(!_0x16878e)continue;const _0x3b986c=_0x5229da[_0x33aaff]||0x1,_0xff2919=_0x3b986c*_0x2073f1;$gameParty[_0xe06c5b(0x15d)](_0x16878e,_0xff2919);}_0x5229da=_0x2073f1<0x0?_0x25d4f8['buyArmorCosts']:_0x25d4f8['sellArmorCosts'];for(const _0x304eec in _0x5229da){const _0x1b8508=Number(_0x304eec)||0x0;if(!_0x1b8508)continue;const _0x10e1ca=$dataArmors[_0x1b8508];if(!_0x10e1ca)continue;const _0x545d7b=_0x5229da[_0x304eec]||0x1,_0x4ec4a2=_0x545d7b*_0x2073f1;$gameParty[_0xe06c5b(0x15d)](_0x10e1ca,_0x4ec4a2);}_0x5229da=_0x2073f1<0x0?_0x25d4f8['buyVariableCosts']:_0x25d4f8[_0xe06c5b(0x205)];for(const _0x4c9b45 in _0x5229da){if(_0xe06c5b(0x149)===_0xe06c5b(0x149)){const _0x12efff=Number(_0x4c9b45)||0x0;if(!_0x12efff)continue;const _0x3e426a=_0x5229da[_0x4c9b45]||0x1,_0x170220=_0x3e426a*_0x2073f1,_0x4f6d6a=$gameVariables['value'](_0x12efff)+_0x170220;$gameVariables['setValue'](_0x12efff,_0x4f6d6a);}else return this[_0xe06c5b(0x13d)](_0x4c3056);}},Window_Base[_0x2cea41(0x20e)]=VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x148)]['Listing'][_0x2cea41(0x155)],Window_Base[_0x2cea41(0x196)]=VisuMZ['MoreCurrencies']['Settings'][_0x2cea41(0x1bf)]['ListOrder'],Window_Base[_0x2cea41(0x111)][_0x2cea41(0x153)]=function(_0x14f112,_0x2c32fa,_0x433cef,_0xc3c4b2){const _0x36c748=_0x2cea41;_0x433cef=_0x433cef||![];let _0x296466=[];for(const _0x315e22 of Window_Base[_0x36c748(0x196)]){if('qEnQU'===_0x36c748(0x187)){const _0x5167ea=VisuMZ[_0x36c748(0x1e7)][_0x36c748(0x12e)](_0x14f112,_0x315e22,_0x433cef,_0xc3c4b2);if(_0x5167ea)_0x296466=_0x296466['concat'](_0x5167ea);}else{const _0x1bf54e=this['itemPadding']();let _0x530629=_0x1bf54e*0x2;const _0x240f47=this['innerWidth']-_0x530629-_0x1bf54e*0x3,_0x4ff6cf=_0x530629+_0x32bc0b['ceil'](_0x240f47/0x3),_0x116f78=_0x53eb69[_0x36c748(0x165)](_0x240f47*0x2/0x3/0x3),_0x4c209e=_0x5b2107[_0x36c748(0x1c3)](this['textWidth'](_0x36c748(0x112)),this[_0x36c748(0x142)](_0x36c748(0x202)));this['resetFontSettings'](),this[_0x36c748(0x189)](_0x596ec3[_0x36c748(0x182)]());const _0x53ba57=['owned',_0x36c748(0x1b3),_0x36c748(0x1cb)];for(let _0x19d744=0x0;_0x19d744<0x3;_0x19d744++){const _0x4f066f=_0x53ba57[_0x19d744],_0x575aa2=_0x5c87c6[_0x36c748(0x11e)][_0x4f066f];this[_0x36c748(0x192)](_0x575aa2,_0x4ff6cf+_0x116f78*_0x19d744+_0x4c209e,_0x591f64,_0x116f78-_0x4c209e,_0x36c748(0x1ac));}}}const _0x4a2ac4=_0x36c748(0x1f5)[_0x36c748(0x1f1)](TextManager[_0x36c748(0x124)]),_0x13b65f='\x5cFS[%1]'[_0x36c748(0x1f1)]($gameSystem[_0x36c748(0x1eb)]());_0x296466['remove'](''),_0x296466=_0x296466[_0x36c748(0x1e0)](_0x370c72=>_0x4a2ac4+_0x370c72+_0x13b65f);if(_0x296466[_0x36c748(0x176)]===0x0){if(_0x36c748(0x1cc)!==_0x36c748(0x1cc)){const _0x3bb6a9=_0x2ed293[_0x36c748(0x1e7)][_0x36c748(0x12e)](_0x49d0f6,_0x4c3744,_0x32f01e,_0x50d1fc);if(_0x3bb6a9)_0x3bcd07=_0x1cf534['concat'](_0x3bb6a9);}else{if(Imported[_0x36c748(0x1bc)]){if('jARzX'!=='Znmzp'){const _0x5e39f6=SceneManager[_0x36c748(0x20d)]['_buyWindow'],_0x13ee13=_0x5e39f6[_0x36c748(0x170)](),_0x2c3465=_0x5e39f6[_0x36c748(0x13b)]();_0x296466[_0x36c748(0x1b9)](VisuMZ[_0x36c748(0x16e)][_0x36c748(0x11a)](0x0,_0x13ee13,_0x2c3465));}else{let _0x1f42d4='';_0x1f42d4+=_0x36c748(0x1f4),_0x1f42d4+=_0x36c748(0x1ef),_0x309f89(_0x1f42d4),_0x103841[_0x36c748(0x1f9)]();}}else _0x296466['push'](VisuMZ['MoreCurrencies'][_0x36c748(0x13d)](0x0));}}_0x296466[_0x36c748(0x143)]();for(const _0x31da2a of _0x296466){if(_0x36c748(0x19e)===_0x36c748(0x147))_0x392440['prepareMoreCurrenciesObj'](),_0x8d1ec4[_0x36c748(0x1e7)]['Scene_Boot_onDatabaseLoaded'][_0x36c748(0x164)](this),this['process_VisuMZ_MoreCurrencies']();else{if(_0x31da2a==='')continue;this['resetFontSettings']();const _0x58eaf9=this[_0x36c748(0x207)](_0x31da2a)[_0x36c748(0x19f)],_0x394f6e=_0x2c32fa['x']+_0x2c32fa['width']-_0x58eaf9,_0x2da6ce=_0x2c32fa['y'];this['drawTextEx'](_0x31da2a,_0x394f6e,_0x2da6ce,_0x58eaf9),_0x2c32fa[_0x36c748(0x19f)]-=_0x58eaf9+Window_Base[_0x36c748(0x20e)];}}this[_0x36c748(0x1d7)]();},VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x12e)]=function(_0xed8ae3,_0x582986,_0x334bd5,_0x477eb1){const _0xe1350a=_0x2cea41;_0x582986=_0x582986['toLowerCase']()[_0xe1350a(0x140)]();switch(_0x582986){case _0xe1350a(0x127):case _0xe1350a(0x1de):case _0xe1350a(0x1f8):return this[_0xe1350a(0x1ca)](_0xed8ae3,_0x582986,_0x334bd5,_0x477eb1);case _0xe1350a(0x173):return this[_0xe1350a(0x1c0)](_0xed8ae3,_0x582986,_0x334bd5,_0x477eb1);case _0xe1350a(0x1fd):return[this['CreateSubGoldCostText'](_0xed8ae3,_0x582986,_0x334bd5,_0x477eb1)];default:return[];}},VisuMZ['MoreCurrencies']['CreateSubItemCostTexts']=function(_0x21c6ec,_0x164484,_0x58956a,_0x1bdcc3){const _0x541a16=_0x2cea41,_0x1a42fd=DataManager[_0x541a16(0x1c1)](_0x21c6ec),_0x41c6a3=_0x1a42fd[_0x21c6ec['id']];if(!_0x41c6a3)return[];const _0x2792fc=_0x58956a?_0x541a16(0x17d):_0x541a16(0x11f),_0x5e137a=_0x541a16(0x128)[_0x541a16(0x1f1)](_0x2792fc,_0x164484[_0x541a16(0x20b)](0x0)[_0x541a16(0x134)]()+_0x164484['slice'](0x1));if(!_0x41c6a3[_0x5e137a])return[];let _0x52a342=[];if(_0x164484===_0x541a16(0x127))_0x52a342=$dataItems;if(_0x164484===_0x541a16(0x1de))_0x52a342=$dataWeapons;if(_0x164484===_0x541a16(0x1f8))_0x52a342=$dataArmors;const _0x5bbf3b=TextManager[_0x541a16(0x168)][_0x164484],_0x575059=[];for(const _0x236b42 in _0x41c6a3[_0x5e137a]){const _0x43a2e1=Number(_0x236b42),_0xee6415=_0x52a342[_0x43a2e1];if(!_0xee6415)continue;const _0x2140f5=_0x41c6a3[_0x5e137a][_0x236b42]*_0x1bdcc3,_0x289069=$gameParty[_0x541a16(0x1c7)](_0xee6415),_0x1eec37=_0xee6415[_0x541a16(0x12d)]?'\x5cI[%1]'[_0x541a16(0x1f1)](_0xee6415[_0x541a16(0x12d)]):'',_0x450e3c=_0xee6415['name'],_0x3c770c=_0x5bbf3b['format'](_0x2140f5,_0x289069,_0x1eec37,_0x450e3c);_0x575059[_0x541a16(0x1b9)](_0x3c770c);}return _0x575059;},VisuMZ['MoreCurrencies'][_0x2cea41(0x1c0)]=function(_0x16a0e5,_0x192cb1,_0x4c845a,_0x3f754d){const _0x2e8355=_0x2cea41,_0x4a2286=DataManager[_0x2e8355(0x1c1)](_0x16a0e5),_0x36eacc=_0x4a2286[_0x16a0e5['id']];if(!_0x36eacc)return[];const _0x25d6e9=_0x4c845a?_0x2e8355(0x17d):'buy',_0x137268=_0x2e8355(0x128)[_0x2e8355(0x1f1)](_0x25d6e9,_0x192cb1['charAt'](0x0)[_0x2e8355(0x134)]()+_0x192cb1['slice'](0x1));if(!_0x36eacc[_0x137268])return[];const _0x3d307b=TextManager[_0x2e8355(0x168)][_0x192cb1],_0x4525c8=[];for(const _0x4fe36b in _0x36eacc[_0x137268]){const _0x3a8edd=Number(_0x4fe36b);if($dataSystem['variables'][_0x2e8355(0x176)]<=_0x3a8edd)continue;const _0x29bc98=_0x36eacc[_0x137268][_0x4fe36b]*_0x3f754d,_0x419b65=$gameVariables['value'](_0x3a8edd);let _0x4ea409='',_0x1867cd=$dataSystem[_0x2e8355(0x119)][_0x3a8edd];_0x1867cd[_0x2e8355(0x17c)](/\\I\[(\d+)\]/i)&&(_0x4ea409=_0x2e8355(0x161)['format'](Number(RegExp['$1'])));_0x1867cd=_0x1867cd[_0x2e8355(0x169)](/<(.*)>/gi,'');const _0x2ece84=_0x3d307b[_0x2e8355(0x1f1)](_0x29bc98,_0x419b65,_0x4ea409,_0x1867cd);_0x4525c8[_0x2e8355(0x1b9)](_0x2ece84);}return _0x4525c8;},VisuMZ[_0x2cea41(0x1e7)]['CreateSubGoldCostText']=function(_0x1ac82e,_0x22429b,_0x17930c,_0x59e22b){const _0x54ab00=_0x2cea41,_0x5deb9b=SceneManager[_0x54ab00(0x20d)][_0x54ab00(0x114)],_0x2322ce=_0x5deb9b[_0x54ab00(0x1f3)](_0x1ac82e),_0x3a2a47=SceneManager[_0x54ab00(0x20d)][_0x54ab00(0x1d3)](_0x1ac82e),_0x4fee02=Math[_0x54ab00(0x19c)]((_0x17930c?_0x3a2a47:_0x2322ce)*_0x59e22b);if(_0x4fee02===0x0)return'';if(Imported[_0x54ab00(0x1bc)]){if(_0x54ab00(0x1d4)===_0x54ab00(0x1d4)){const _0x36c52e=_0x5deb9b[_0x54ab00(0x170)](),_0x6ecec9=_0x5deb9b[_0x54ab00(0x13b)]();return VisuMZ[_0x54ab00(0x16e)][_0x54ab00(0x11a)](_0x4fee02,_0x36c52e,_0x6ecec9);}else return _0x637fd2[_0x54ab00(0x165)](this[_0x54ab00(0x14b)]-this[_0x54ab00(0x16f)]()*6.5);}else{if('SrClY'!==_0x54ab00(0x115))_0x2ee7c5[_0x54ab00(0x1b2)]=_0xd9ea37['buyItemCosts']||{},_0x1535ba['buyItemCosts'][_0x4bdce1]=_0xec9c2f;else return this['CreateGoldCostText'](_0x4fee02);}},VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x13d)]=function(_0x5ac186){const _0x20c60e=_0x2cea41,_0x28873e='%1%2%3',_0x5cf44e=VisuMZ[_0x20c60e(0x167)][_0x20c60e(0x148)]['Gold'][_0x20c60e(0x1cf)],_0x4c7173=TextManager[_0x20c60e(0x1bd)];return _0x28873e[_0x20c60e(0x1f1)](_0x5ac186,_0x5cf44e>0x0?'\x5cI[%1]'['format'](_0x5cf44e):'',_0x5cf44e>0x0?'':_0x4c7173);},VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x204)]=Window_ShopBuy[_0x2cea41(0x111)][_0x2cea41(0x1ae)],Window_ShopBuy[_0x2cea41(0x111)][_0x2cea41(0x1ae)]=function(_0x15edd2,_0xec9018){if(!_0x15edd2)return;this['drawItemMoreCurrencies'](_0x15edd2,_0xec9018,![],0x1);},VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x16c)]=Window_ShopBuy['prototype'][_0x2cea41(0x1e3)],Window_ShopBuy[_0x2cea41(0x111)]['isEnabled']=function(_0x3d9a87){const _0x5f0a3c=_0x2cea41;if(!VisuMZ[_0x5f0a3c(0x1e7)]['Window_ShopBuy_isEnabled'][_0x5f0a3c(0x164)](this,_0x3d9a87))return![];return VisuMZ['MoreCurrencies'][_0x5f0a3c(0x209)](_0x3d9a87);},VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x209)]=function(_0x45ceaf){const _0x287063=_0x2cea41;if(!_0x45ceaf)return![];const _0x2d3249=DataManager[_0x287063(0x1c1)](_0x45ceaf),_0x188416=_0x2d3249[_0x45ceaf['id']];if(!_0x188416)return!![];for(const _0x1c8b40 in _0x188416[_0x287063(0x1b2)]){const _0x4c6dff=Number(_0x1c8b40)||0x0;if(!_0x4c6dff)continue;const _0x2c02d9=$dataItems[_0x4c6dff];if(!_0x2c02d9)continue;const _0x7d8cd8=_0x188416[_0x287063(0x1b2)][_0x1c8b40];if(_0x7d8cd8>$gameParty['numItems'](_0x2c02d9))return![];}for(const _0x2ae4e5 in _0x188416[_0x287063(0x154)]){if(_0x287063(0x14c)===_0x287063(0x11d))_0x56a7bf=_0x287063(0x161)[_0x287063(0x1f1)](_0x93601(_0x482cf1['$1']));else{const _0x4c313a=Number(_0x2ae4e5)||0x0;if(!_0x4c313a)continue;const _0x484a8f=$dataWeapons[_0x4c313a];if(!_0x484a8f)continue;const _0x387934=_0x188416['buyWeaponCosts'][_0x2ae4e5];if(_0x387934>$gameParty[_0x287063(0x1c7)](_0x484a8f))return![];}}for(const _0x25c7ae in _0x188416[_0x287063(0x1ec)]){const _0x10df69=Number(_0x25c7ae)||0x0;if(!_0x10df69)continue;const _0x33c0ea=$dataArmors[_0x10df69];if(!_0x33c0ea)continue;const _0xb9729e=_0x188416[_0x287063(0x1ec)][_0x25c7ae];if(_0xb9729e>$gameParty[_0x287063(0x1c7)](_0x33c0ea))return![];}for(const _0xfb96f1 in _0x188416[_0x287063(0x1a4)]){const _0x129b5c=Number(_0xfb96f1)||0x0;if(!_0x129b5c)continue;const _0x49afed=_0x188416['buyVariableCosts'][_0xfb96f1];if(_0x49afed>$gameVariables[_0x287063(0x16b)](_0x129b5c))return![];}return!![];},Window_ShopSell['MORE_CURRENCIES_SHOW_SELL_VALUE']=VisuMZ['MoreCurrencies']['Settings']['Listing'][_0x2cea41(0x1d6)],VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x163)]=Window_ItemList[_0x2cea41(0x111)][_0x2cea41(0x1e8)],Window_ItemList[_0x2cea41(0x111)][_0x2cea41(0x1e8)]=function(_0x44c8ab,_0x57cd8a,_0x1470fb,_0x4bb37e){const _0x550dd7=_0x2cea41;VisuMZ['MoreCurrencies']['Window_ItemList_drawItemNumber'][_0x550dd7(0x164)](this,_0x44c8ab,_0x57cd8a,_0x1470fb,_0x4bb37e);if(this[_0x550dd7(0x18e)]&&this[_0x550dd7(0x18e)]()){if(_0x550dd7(0x144)!==_0x550dd7(0x144)){const _0x543dbd=_0x525d1b(_0x451e64);if(!_0x543dbd)return;_0x2a076c&&(_0x53eb08['buyVariableCosts']=_0x5d99a1['buyVariableCosts']||{},_0x4a9ff6['buyVariableCosts'][_0x543dbd]=_0x2ff227),_0x201112&&(_0x1ee694[_0x550dd7(0x205)]=_0x44b4b8[_0x550dd7(0x205)]||{},_0x25fc23[_0x550dd7(0x205)][_0x543dbd]=_0x4fd45e[_0x550dd7(0x165)](_0x3bc0c4*(_0x200e21?_0x5f3a1e:0x1)));}else this['drawSellPrice'](_0x44c8ab,_0x57cd8a,_0x1470fb,_0x4bb37e);}},Window_ItemList[_0x2cea41(0x111)][_0x2cea41(0x18e)]=function(){const _0x4702df=_0x2cea41;return this['constructor']===Window_ShopSell&&Window_ShopSell[_0x4702df(0x110)];},Window_ShopSell[_0x2cea41(0x111)][_0x2cea41(0x121)]=function(_0x23c148,_0x248301,_0x55b4ae,_0x346085){const _0x113805=_0x2cea41,_0x2fb06c=VisuMZ[_0x113805(0x129)][_0x113805(0x148)][_0x113805(0x1a7)],_0x3e298e=_0x2fb06c[_0x113805(0x1c8)],_0x3a507c=_0x3e298e[_0x113805(0x1f1)]($gameParty['maxItems'](_0x23c148));this[_0x113805(0x188)][_0x113805(0x141)]=_0x2fb06c[_0x113805(0x11b)];const _0x23fb7b=this[_0x113805(0x142)](_0x3a507c);_0x346085-=_0x23fb7b+Window_Base[_0x113805(0x20e)];const _0x33418b=new Rectangle(_0x248301,_0x55b4ae,_0x346085,this['lineHeight']());this['drawItemMoreCurrencies'](_0x23c148,_0x33418b,!![],0x1);},Window_ShopNumber[_0x2cea41(0x111)][_0x2cea41(0x1cd)]=function(){const _0x3c46ed=_0x2cea41;return Math[_0x3c46ed(0x165)](this[_0x3c46ed(0x136)]()+this[_0x3c46ed(0x16f)]()*0x2);},Window_ShopNumber[_0x2cea41(0x111)]['totalPriceY']=function(){const _0xd9b7ba=_0x2cea41;return Math[_0xd9b7ba(0x165)](this[_0xd9b7ba(0x14b)]-this['lineHeight']()*6.5);},Window_ShopNumber['prototype'][_0x2cea41(0x1a9)]=function(){const _0x23acd4=_0x2cea41;return Math[_0x23acd4(0x165)](this[_0x23acd4(0x1cd)]()+this['lineHeight']()*0x2);},Window_ShopNumber[_0x2cea41(0x111)][_0x2cea41(0x1fb)]=function(){const _0x551a84=_0x2cea41,_0x4e954c=VisuMZ[_0x551a84(0x1e7)][_0x551a84(0x1d5)](this['_item']);let _0x1bd52c=this[_0x551a84(0x136)]();_0x1bd52c-=this[_0x551a84(0x16f)]()*_0x4e954c[_0x551a84(0x176)],this[_0x551a84(0x158)](_0x1bd52c);for(const _0x464c40 of _0x4e954c){_0x1bd52c+=this[_0x551a84(0x16f)]();if(!_0x464c40)continue;this[_0x551a84(0x11c)](_0x464c40,_0x1bd52c);};},Window_ShopNumber[_0x2cea41(0x111)][_0x2cea41(0x158)]=function(_0x44d23a){const _0x3d6f45=_0x2cea41,_0x1db579=this['itemPadding']();let _0x1a3798=_0x1db579*0x2;const _0x51bf75=this[_0x3d6f45(0x1c2)]-_0x1a3798-_0x1db579*0x3,_0x3ab43=_0x1a3798+Math[_0x3d6f45(0x1f6)](_0x51bf75/0x3),_0x25edcd=Math[_0x3d6f45(0x165)](_0x51bf75*0x2/0x3/0x3),_0x4ce7e9=Math[_0x3d6f45(0x1c3)](this[_0x3d6f45(0x142)](_0x3d6f45(0x112)),this['textWidth']('\x20=\x20'));this[_0x3d6f45(0x1d7)](),this['changeTextColor'](ColorManager['systemColor']());const _0x6cd62e=[_0x3d6f45(0x1ee),_0x3d6f45(0x1b3),_0x3d6f45(0x1cb)];for(let _0x2cabb3=0x0;_0x2cabb3<0x3;_0x2cabb3++){const _0x4ca0f5=_0x6cd62e[_0x2cabb3],_0xeebf67=TextManager[_0x3d6f45(0x11e)][_0x4ca0f5];this['drawText'](_0xeebf67,_0x3ab43+_0x25edcd*_0x2cabb3+_0x4ce7e9,_0x44d23a,_0x25edcd-_0x4ce7e9,_0x3d6f45(0x1ac));}},Window_ShopNumber[_0x2cea41(0x111)][_0x2cea41(0x125)]=function(_0x559328,_0x43f17c){const _0x4e5b2a=_0x2cea41,_0x151adf=this[_0x4e5b2a(0x12c)]();let _0x13dad3=_0x151adf*0x2;const _0x51d670=this['innerWidth']-_0x13dad3-_0x151adf*0x3,_0x5300c0=_0x13dad3+Math['ceil'](_0x51d670/0x3),_0x89457=Math[_0x4e5b2a(0x165)](_0x51d670*0x2/0x3/0x3);_0x43f17c='\x20%1'['format'](_0x43f17c),this[_0x4e5b2a(0x192)](_0x43f17c,_0x5300c0+_0x89457*0x1,_0x559328,_0x89457,'left'),this['drawText']('\x20=',_0x5300c0+_0x89457*0x2,_0x559328,_0x89457,'left');},Window_ShopNumber[_0x2cea41(0x111)][_0x2cea41(0x11c)]=function(_0xa5d30,_0x25bca7){const _0x4dbffd=_0x2cea41,_0x1e6fd4=_0xa5d30[0x0];this[_0x4dbffd(0x1d7)]();const _0x254db1=SceneManager[_0x4dbffd(0x20d)][_0x4dbffd(0x201)][_0x4dbffd(0x1e1)](),_0x540a5a=_0x254db1===_0x4dbffd(0x11f);this[_0x4dbffd(0x125)](_0x25bca7,_0x540a5a?'-':'+');if(_0x1e6fd4===_0x4dbffd(0x1fd))this[_0x4dbffd(0x120)](_0xa5d30,_0x25bca7,_0x540a5a);else{if(_0x1e6fd4===_0x4dbffd(0x173))this[_0x4dbffd(0x18d)](_0xa5d30,_0x25bca7,_0x540a5a);else{if(_0x4dbffd(0x131)===_0x4dbffd(0x1dc)){const _0x214c60=_0xe2939c?_0x292585(_0x5b8979):_0x1c77e2[_0x4dbffd(0x1b5)](_0x46de04);if(!_0x214c60)return;_0x35e4fe&&(_0x4c2289['buyItemCosts']=_0x5c3230[_0x4dbffd(0x1b2)]||{},_0xcaa49b[_0x4dbffd(0x1b2)][_0x214c60]=_0x1b05bb),_0x1dc928&&(_0x3c47de[_0x4dbffd(0x139)]=_0x135832[_0x4dbffd(0x139)]||{},_0x22b87a[_0x4dbffd(0x139)][_0x214c60]=_0x3dcf15['floor'](_0x4a1c05*(_0x24c108?_0x3a8c3d:0x1)));}else this[_0x4dbffd(0x1c9)](_0xa5d30,_0x25bca7,_0x540a5a);}}},Window_ShopNumber[_0x2cea41(0x111)][_0x2cea41(0x126)]=function(){return!![];},Window_ShopNumber[_0x2cea41(0x111)]['visualGoldDisplayNoCost']=function(){return![];},Window_ShopNumber[_0x2cea41(0x111)][_0x2cea41(0x120)]=function(_0x56a0ac,_0x191855,_0xd026f1){const _0x297edc=_0x2cea41,_0x5d97e6=this[_0x297edc(0x12c)]();let _0x550484=_0x5d97e6*0x2;const _0x29b6e0=this[_0x297edc(0x1c2)]-_0x550484-_0x5d97e6*0x3,_0x1167a3=_0x550484+Math[_0x297edc(0x1f6)](_0x29b6e0/0x3),_0x2ed02a=Math['floor'](_0x29b6e0*0x2/0x3/0x3),_0x1e737f=Math[_0x297edc(0x1c3)](this['textWidth'](_0x297edc(0x112)),this['textWidth'](_0x297edc(0x202))),_0x3d14d3=_0x56a0ac[0x0],_0x5d1fb8=_0x56a0ac[0x1],_0x27fc1e=_0x5d1fb8*this[_0x297edc(0x113)],_0x456f2a=VisuMZ[_0x297edc(0x167)][_0x297edc(0x148)][_0x297edc(0x179)][_0x297edc(0x1cf)];if(_0x456f2a>0x0){const _0xa5aff3=_0x191855+(this[_0x297edc(0x16f)]()-ImageManager[_0x297edc(0x1f7)])/0x2;this[_0x297edc(0x1a5)](_0x456f2a,_0x550484,_0xa5aff3);const _0x31b5e3=ImageManager[_0x297edc(0x198)]+0x4;_0x550484+=_0x31b5e3;}this[_0x297edc(0x189)](ColorManager['systemColor']()),this['drawText'](TextManager[_0x297edc(0x1bd)],_0x550484,_0x191855,_0x2ed02a,'left');const _0x41f415=$gameParty['gold']();this[_0x297edc(0x199)](_0x41f415,TextManager[_0x297edc(0x1bd)],_0x1167a3,_0x191855,_0x2ed02a);const _0x457ccf=_0x1167a3+_0x2ed02a*0x1+_0x1e737f,_0x1b4b6b=_0x2ed02a-_0x1e737f;this[_0x297edc(0x199)](_0x27fc1e,TextManager[_0x297edc(0x1bd)],_0x457ccf,_0x191855,_0x1b4b6b);const _0x1c859e=_0x1167a3+_0x2ed02a*0x2+_0x1e737f,_0x53bf0b=_0x2ed02a-_0x1e737f,_0x4d20da=Math['min'](_0x41f415+_0x27fc1e*(_0xd026f1?-0x1:0x1),$gameParty[_0x297edc(0x116)]());this[_0x297edc(0x199)](_0x4d20da,TextManager[_0x297edc(0x1bd)],_0x1c859e,_0x191855,_0x53bf0b);},Window_ShopNumber[_0x2cea41(0x111)]['drawMoreCurrenciesVariable']=function(_0x3321de,_0x216809,_0x180bab){const _0x5c6d3c=_0x2cea41,_0x5cb2c1=this[_0x5c6d3c(0x12c)]();let _0x444849=_0x5cb2c1*0x2;const _0x2a09da=this[_0x5c6d3c(0x1c2)]-_0x444849-_0x5cb2c1*0x3,_0x3bc1f5=_0x444849+Math['ceil'](_0x2a09da/0x3),_0x5bd834=Math[_0x5c6d3c(0x165)](_0x2a09da*0x2/0x3/0x3),_0xb9920a=Math[_0x5c6d3c(0x1c3)](this[_0x5c6d3c(0x142)](_0x5c6d3c(0x112)),this[_0x5c6d3c(0x142)](_0x5c6d3c(0x202))),_0x4c324a=_0x3321de[0x0],_0x585711=_0x3321de[0x1],_0x5d306=_0x3321de[0x2],_0x5c0b42=_0x585711*this['_number'];let _0x42d184=0x0;const _0xa709c4=$dataSystem[_0x5c6d3c(0x119)][_0x5d306];_0xa709c4['match'](/\\I\[(\d+)\]/i)&&(_0x42d184=Number(RegExp['$1']));const _0x19de92=_0x42d184>0x0?ImageManager['iconWidth']+0x4:0x0;this[_0x5c6d3c(0x156)](_0xa709c4,_0x444849,_0x216809,_0x2a09da,'left');const _0x575f11=_0x3bc1f5+_0x5bd834*0x0,_0x28f494=_0x5bd834-_0x19de92,_0x456419=$gameVariables[_0x5c6d3c(0x16b)](_0x5d306);this['drawText'](_0x456419,_0x575f11,_0x216809,_0x28f494,_0x5c6d3c(0x1f2)),this[_0x5c6d3c(0x1a5)](_0x42d184,_0x575f11+_0x28f494+0x4,_0x216809);const _0x15f889=_0x3bc1f5+_0x5bd834*0x1+_0xb9920a,_0x2224a9=_0x5bd834-_0xb9920a-_0x19de92;this[_0x5c6d3c(0x192)](_0x5c0b42,_0x15f889,_0x216809,_0x2224a9,'right'),this[_0x5c6d3c(0x1a5)](_0x42d184,_0x15f889+_0x2224a9+0x4,_0x216809);const _0x8215d7=_0x3bc1f5+_0x5bd834*0x2+_0xb9920a,_0x13f21f=_0x5bd834-_0xb9920a-_0x19de92,_0x1fcfbc=_0x456419+_0x5c0b42*(_0x180bab?-0x1:0x1);this[_0x5c6d3c(0x192)](_0x1fcfbc,_0x8215d7,_0x216809,_0x13f21f,_0x5c6d3c(0x1f2)),this[_0x5c6d3c(0x1a5)](_0x42d184,_0x8215d7+_0x13f21f+0x4,_0x216809);},Window_ShopNumber[_0x2cea41(0x111)][_0x2cea41(0x1c9)]=function(_0x1ec7d8,_0x5a7911,_0x2e2439){const _0x3a322c=_0x2cea41,_0x4d0a36=this[_0x3a322c(0x12c)]();let _0x58511a=_0x4d0a36*0x2;const _0x5cae0d=this[_0x3a322c(0x1c2)]-_0x58511a-_0x4d0a36*0x3,_0x18382d=_0x58511a+Math['ceil'](_0x5cae0d/0x3),_0x2829e5=Math['floor'](_0x5cae0d*0x2/0x3/0x3),_0x510480=Math['max'](this[_0x3a322c(0x142)]('\x20+\x20'),this[_0x3a322c(0x142)](_0x3a322c(0x202))),_0x42444d=_0x1ec7d8[0x0],_0x2883d2=_0x1ec7d8[0x1],_0xeb7a35=_0x2883d2*this[_0x3a322c(0x113)];let _0x4d902a=_0x42444d['iconIndex'];const _0x4c6d67=_0x4d902a>0x0?ImageManager['iconWidth']+0x4:0x0;this[_0x3a322c(0x157)](_0x42444d,_0x58511a,_0x5a7911,_0x5cae0d);const _0x2a00b0=_0x18382d+_0x2829e5*0x0,_0x33c7dc=_0x2829e5-_0x4c6d67,_0x31c260=$gameParty[_0x3a322c(0x1c7)](_0x42444d);this[_0x3a322c(0x192)](_0x31c260,_0x2a00b0,_0x5a7911,_0x33c7dc,_0x3a322c(0x1f2)),this[_0x3a322c(0x1a5)](_0x4d902a,_0x2a00b0+_0x33c7dc+0x4,_0x5a7911);const _0x2d5fb5=_0x18382d+_0x2829e5*0x1+_0x510480,_0x1e3365=_0x2829e5-_0x510480-_0x4c6d67;this[_0x3a322c(0x192)](_0xeb7a35,_0x2d5fb5,_0x5a7911,_0x1e3365,_0x3a322c(0x1f2)),this[_0x3a322c(0x1a5)](_0x4d902a,_0x2d5fb5+_0x1e3365+0x4,_0x5a7911);const _0x39e8e4=_0x18382d+_0x2829e5*0x2+_0x510480,_0x2c5a5e=_0x2829e5-_0x510480-_0x4c6d67,_0x404a79=_0x31c260+_0xeb7a35*(_0x2e2439?-0x1:0x1);this[_0x3a322c(0x192)](_0x404a79,_0x39e8e4,_0x5a7911,_0x2c5a5e,_0x3a322c(0x1f2)),this[_0x3a322c(0x1a5)](_0x4d902a,_0x39e8e4+_0x2c5a5e+0x4,_0x5a7911);},Window_ShopNumber[_0x2cea41(0x111)]['drawCurrentItemName']=function(){const _0x166fa=_0x2cea41,_0x1811d0=[this[_0x166fa(0x1ad)],0x1],_0x28ac5a=this['itemNameY'](),_0x4d4137=SceneManager[_0x166fa(0x20d)][_0x166fa(0x201)]['currentSymbol'](),_0x2673a3=_0x4d4137===_0x166fa(0x11f);this['drawMoreCurrenciesItem'](_0x1811d0,_0x28ac5a,!_0x2673a3);const _0x27e8ea=_0x2673a3?'+':'-';this['drawMoreCurrenciesMathMarks'](_0x28ac5a,_0x27e8ea);},Window_ShopNumber[_0x2cea41(0x111)]['drawMultiplicationSign']=function(){},Window_ShopNumber['prototype']['drawNumber']=function(){},Window_ShopNumber[_0x2cea41(0x111)][_0x2cea41(0x14a)]=function(){const _0x1d2e5b=_0x2cea41;if(!this[_0x1d2e5b(0x1ad)])return 0x1;let _0x41cbbe=String($gameParty['maxItems'](this['_item']));if(this[_0x1d2e5b(0x15c)]()){if(_0x1d2e5b(0x210)==='JCuBk'){_0x5be33c=_0x2a0125[_0x1d2e5b(0x206)]()['trim']();switch(_0x1e3a23){case'item':case'weapon':case _0x1d2e5b(0x1f8):return this[_0x1d2e5b(0x1d9)](_0x2babae,_0x5bc77e,_0x4d9766);case _0x1d2e5b(0x173):return this[_0x1d2e5b(0x1d2)](_0x95494d,_0x41b28d,_0x2d8773);case _0x1d2e5b(0x1fd):return[this['GetShopNumberIngredientGold']()];}}else _0x41cbbe=VisuMZ['GroupDigits'](_0x41cbbe);}return _0x41cbbe[_0x1d2e5b(0x176)];},Window_ShopNumber[_0x2cea41(0x111)][_0x2cea41(0x19b)]=function(){const _0x4f8062=_0x2cea41,_0x300369=this[_0x4f8062(0x12c)]();let _0x320678=_0x300369*0x2;const _0x3ff937=this[_0x4f8062(0x1c2)]-_0x320678-_0x300369*0x3,_0x3c6046=_0x320678+Math[_0x4f8062(0x1f6)](_0x3ff937/0x3),_0x17d0bb=this['itemNameY'](),_0x3cb9c4=Math[_0x4f8062(0x165)](_0x3ff937*0x2/0x3/0x3),_0x4d8d1b=Math[_0x4f8062(0x1c3)](this['textWidth'](_0x4f8062(0x112)),this[_0x4f8062(0x142)](_0x4f8062(0x202))),_0x1c7e05=this[_0x4f8062(0x1ad)]?.[_0x4f8062(0x12d)]>0x0?ImageManager['iconWidth']:0x0,_0x58e577=this[_0x4f8062(0x174)](),_0x3b3732=new Rectangle(Math[_0x4f8062(0x165)](_0x3c6046+_0x3cb9c4*0x2-this[_0x4f8062(0x174)]()-_0x1c7e05+this['itemPadding']()/0x2-0x2),_0x17d0bb,this[_0x4f8062(0x174)](),this[_0x4f8062(0x16f)]());return _0x3b3732;},VisuMZ[_0x2cea41(0x1e7)]['MakeShopNumberIngredients']=function(_0x3fee87){const _0x2b1b43=_0x2cea41;let _0x10114c=[];const _0x359a2a=SceneManager[_0x2b1b43(0x20d)][_0x2b1b43(0x201)][_0x2b1b43(0x1e1)]()===_0x2b1b43(0x17d);for(const _0xd2cd44 of Window_Base[_0x2b1b43(0x196)]){const _0x370c02=this['GetShopNumberIngredientType'](_0x3fee87,_0xd2cd44,_0x359a2a);if(_0xd2cd44===_0x2b1b43(0x1fd)&&SceneManager[_0x2b1b43(0x20d)][_0x2b1b43(0x17b)][_0x2b1b43(0x160)]<=0x0)continue;if(_0x370c02)_0x10114c=_0x10114c[_0x2b1b43(0x1b1)](_0x370c02);};if(_0x10114c[_0x2b1b43(0x176)]===0x0){if(_0x2b1b43(0x14e)!==_0x2b1b43(0x14e)){const _0x507813=_0x195819+(this[_0x2b1b43(0x16f)]()-_0x1e17f1[_0x2b1b43(0x1f7)])/0x2;this[_0x2b1b43(0x1a5)](_0x1f21a6,_0x1e4cf7,_0x507813);const _0x3fd832=_0x203083[_0x2b1b43(0x198)]+0x4;_0x540788+=_0x3fd832;}else _0x10114c['push'](['gold',0x0]);}return _0x10114c;},VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x172)]=function(_0x2ee3ed,_0xd22e69,_0x2de793){const _0x331dcc=_0x2cea41;_0xd22e69=_0xd22e69['toLowerCase']()[_0x331dcc(0x140)]();switch(_0xd22e69){case _0x331dcc(0x127):case _0x331dcc(0x1de):case _0x331dcc(0x1f8):return this[_0x331dcc(0x1d9)](_0x2ee3ed,_0xd22e69,_0x2de793);case _0x331dcc(0x173):return this[_0x331dcc(0x1d2)](_0x2ee3ed,_0xd22e69,_0x2de793);case _0x331dcc(0x1fd):return[this[_0x331dcc(0x1d8)]()];}},VisuMZ['MoreCurrencies'][_0x2cea41(0x1d9)]=function(_0x18e4c8,_0x1bc211,_0x2e14c8){const _0x233758=_0x2cea41,_0x10f9f1=DataManager[_0x233758(0x1c1)](_0x18e4c8),_0xae919e=_0x10f9f1[_0x18e4c8['id']];if(!_0xae919e)return[];const _0x375cfa=_0x2e14c8?_0x233758(0x17d):'buy',_0x2d189f=_0x233758(0x128)[_0x233758(0x1f1)](_0x375cfa,_0x1bc211['charAt'](0x0)[_0x233758(0x134)]()+_0x1bc211[_0x233758(0x1e2)](0x1));if(!_0xae919e[_0x2d189f])return[];let _0x5d6cd6=[];if(_0x1bc211==='item')_0x5d6cd6=$dataItems;if(_0x1bc211===_0x233758(0x1de))_0x5d6cd6=$dataWeapons;if(_0x1bc211===_0x233758(0x1f8))_0x5d6cd6=$dataArmors;const _0xa29851=[];for(const _0x54c0ba in _0xae919e[_0x2d189f]){if(_0x233758(0x1b4)==='Pnawk'){const _0x1d7af2=Number(_0x54c0ba),_0xfeddbe=_0x5d6cd6[_0x1d7af2];if(!_0xfeddbe)continue;const _0x4bcac9=[_0xfeddbe];_0x4bcac9[_0x233758(0x1b9)](_0xae919e[_0x2d189f][_0x54c0ba]),_0xa29851[_0x233758(0x1b9)](_0x4bcac9);}else this[_0x233758(0x17a)](_0x4c3ee5,_0x319ec3[_0xa4a914['id']],_0x233758(0x118)),this[_0x233758(0x17a)](_0x3c5e3f,_0x3d3fe0[_0x36f939['id']],_0x233758(0x1df));}return _0xa29851;},VisuMZ['MoreCurrencies']['GetShopNumberIngredientVariables']=function(_0x2733d8,_0xd7809e,_0x1a90ab){const _0x25584f=_0x2cea41,_0x31296c=DataManager['getMoreCurrenciesObjLibrary'](_0x2733d8),_0x9da84e=_0x31296c[_0x2733d8['id']];if(!_0x9da84e)return[];const _0x378ff2=_0x1a90ab?_0x25584f(0x17d):_0x25584f(0x11f),_0x47f390=_0x25584f(0x128)[_0x25584f(0x1f1)](_0x378ff2,_0xd7809e['charAt'](0x0)[_0x25584f(0x134)]()+_0xd7809e[_0x25584f(0x1e2)](0x1));if(!_0x9da84e[_0x47f390])return[];const _0x1b82c0=[];for(const _0xb9cdf1 in _0x9da84e[_0x47f390]){const _0xc6ae1d=Number(_0xb9cdf1);if($dataSystem[_0x25584f(0x119)][_0x25584f(0x176)]<=_0xc6ae1d)continue;const _0x52a1c3=[_0x25584f(0x173)];_0x52a1c3[_0x25584f(0x1b9)](_0x9da84e[_0x47f390][_0xb9cdf1]),_0x52a1c3[_0x25584f(0x1b9)](_0xc6ae1d),_0x1b82c0['push'](_0x52a1c3);}return _0x1b82c0;},VisuMZ[_0x2cea41(0x1e7)][_0x2cea41(0x1d8)]=function(){const _0x52c396=_0x2cea41,_0x42dfba=SceneManager['_scene'][_0x52c396(0x17b)][_0x52c396(0x160)];return[_0x52c396(0x1fd),_0x42dfba];};function _0x50f4(){const _0xce903f=['CreateSubCostText','ITEM','mwrRT','qDNJf','Scene_Shop_maxBuy','bbCXQ','toUpperCase','xzAzd','totalPriceY','isItem','ParseWeaponNotetags','sellItemCosts','_bypassProxy','visualGoldDisplayNoCost','rfRej','CreateGoldCostText','process_VisuMZ_MoreCurrencies','getWeaponIdWithName','trim','fontSize','textWidth','reverse','CFomf','ParseArmorNotetags','SubCost','wOPld','Settings','QxVDc','maxDigits','innerHeight','vccCO','ParseItemNotetags','Pxuge','weapons','WEAPON','includes','ParseNotetagLineSubCosts','drawItemMoreCurrencies','buyWeaponCosts','BuyPadding','drawTextEx','drawItemName','drawCategories','sellWeaponCosts','NUM','test','useDigitGrouping','gainItem','rWAQU','Change','_price','\x5cI[%1]','_armorIDs','Window_ItemList_drawItemNumber','call','floor','EVAL','CoreEngine','MoreCurrenciesFmt','replace','1790ZLDqhx','value','Window_ShopBuy_isEnabled','%1%2%3','VisualGoldDisplay','lineHeight','visualGoldDisplayPadding','ijIQA','GetShopNumberIngredientType','variable','cursorWidth','ItemBuyFmt','length','ARRAYFUNC','24064018KyFBzG','Gold','ParseNotetagSubCosts','_numberWindow','match','sell','parameters','qXJgA','34741namlmH','items','systemColor','description','Net','ARRAYNUM','BdgUz','qEnQU','contents','changeTextColor','isArmor','NumWindowShift','BuyFontSize','drawMoreCurrenciesVariable','showMoreCurrenciesSellValue','41607KlRzVz','process_VisuMZ_MoreCurrencies_Notetags','_itemIDs','drawText','VisuMZ_0_CoreEngine','ParseNotetagCosts','doBuy','MORE_CURRENCIES_ORDER','General','iconWidth','drawCurrencyValue','Scene_Shop_doSell','itemRect','round','ConvertParams','eNjet','width','1704SEprvG','zOgSJ','onDatabaseLoaded','uGKvZ','buyVariableCosts','drawIcon','ParseAllNotetags','ItemScene','489804jhorrE','buttonY','447jcZznR','Scene_Shop_doBuy','center','_item','drawItemCost','prepareMoreCurrenciesObj','isWeapon','concat','buyItemCosts','shift','Pnawk','getItemIdWithName','91435uZCPgp','4476kMyrkP','MORE_CURRENCIES_DEFAULT_SELL_RATE','push','aZBNi','yuKLV','VisuMZ_3_VisualGoldDisplay','currencyUnit','Scene_Boot_onDatabaseLoaded','Listing','CreateSubVariableCostTexts','getMoreCurrenciesObjLibrary','innerWidth','max','getArmorIdWithName','ARRAYJSON','sellArmorCosts','numItems','ItemQuantityFmt','drawMoreCurrenciesItem','CreateSubItemCostTexts','net','FpICp','itemNameY','status','GoldIcon','jEigj','ArmorsBuyFmt','GetShopNumberIngredientVariables','sellPriceOfItem','fYPKp','MakeShopNumberIngredients','ShowSell','resetFontSettings','GetShopNumberIngredientGold','GetShopNumberIngredientItems','ARRAYSTRUCT','doSell','JKeqG','GetMaxBuysForObj','weapon','SubSellCost','map','currentSymbol','slice','isEnabled','390ABHUIV','ChangeQuantityForObj','return\x200','MoreCurrencies','drawItemNumber','FUNC','filter','mainFontSize','buyArmorCosts','JSON','owned','in\x20order\x20for\x20VisuMZ_3_OneTimePurchase\x20to\x20work.','wEJVE','format','right','price','VisuMZ_1_ItemsEquipsCore\x20needs\x20to\x20be\x20updated\x20','\x5cFS[%1]','ceil','iconHeight','armor','exit','kkyGA','drawTotalPrice','_moreCurrencyCosts','gold','ARRAYSTR','NumWindowOwned','RegExp','_commandWindow','\x20=\x20','STR','Window_ShopBuy_drawItemCost','sellVariableCosts','toLowerCase','textSizeEx','note','CheckMeetBuyRequirements','maxBuy','charAt','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_scene','MORE_CURRENCIES_PADDING','parse','fipOv','681129MNivVX','MORE_CURRENCIES_SHOW_SELL_VALUE','prototype','\x20+\x20','_number','_buyWindow','SrClY','maxGold','_weaponIDs','SubBuyCost','variables','CreateVisualGoldText','ItemQuantityFontSize','drawMoreCurrenciesPriceData','yubuu','MoreCurrenciesNumberWindow','buy','drawMoreCurrenciesGold','drawSellPrice','version','AutoSellRate','MoreCurrenciesFontSize','drawMoreCurrenciesMathMarks','visualGoldDisplayAutosize','item','%1%2Costs','ItemsEquipsCore','isSceneShop','name','itemPadding','iconIndex'];_0x50f4=function(){return _0xce903f;};return _0x50f4();}
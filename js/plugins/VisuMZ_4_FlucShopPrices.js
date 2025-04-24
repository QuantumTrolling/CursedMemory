//=============================================================================
// VisuStella MZ - Fluctuating Shop Prices
// VisuMZ_4_FlucShopPrices.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_FlucShopPrices = true;

var VisuMZ = VisuMZ || {};
VisuMZ.FlucShopPrices = VisuMZ.FlucShopPrices || {};
VisuMZ.FlucShopPrices.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.00] [FlucShopPrices]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Fluctuating_Shop_Prices_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Does your gave have a live, ever-evolving market? Do the prices of items
 * change over time depending on how your player influences the game? This
 * plugin allows you to create fluctuating price systems via RPG Maker MZ's
 * variable system. These variables are able to change factors such as the base
 * price, the base padding, rates, and flat additions.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Notetags that allow management of the base, plus, rate, and flat modifiers
 *   towards buy and/or sell prices.
 * * JavaScript modifications for those who wish to finalize their calculations
 *   with a bit more control.
 * * Determine if the sell version of the notetags are affected by the standard
 *   sell rate.
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
 * Buy and Sell Prices
 * 
 * If any item, weapon, or armor has fluctuating prices through the aid of this
 * plugin's notetags, will have these plugin's price altering affects override
 * the default prices found in the database.
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
 * When using any notetags from Fluctuating Shop Prices, they will bypass any
 * of the <Price: x>, <Sell Price: x>, and/or the JavaScript versions. That's
 * because the fluctuating price notetags will take priority for better control
 * and consistency.
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
 * === Price-Related Notetags ===
 * 
 * ---
 *
 * <Price Base Variable: x>
 * <Buy Base Variable: x>
 * <Sell Base Variable: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the 'base' price for the affected item, weapon, or armor.
 *   - By default, the price formula goes (base + plus) * rate + flat
 * - With 'Price', the notetag will affect both 'Buy' and 'Sell' prices.
 *   - 'Buy' version of the notetag will only affect price when buying.
 *   - 'Sell' version of the notetag will only affect price when selling.
 *   - When selling, the base price is affected by the Sell Price Rate modifier
 *     if you decide to let it affect it. These settings can be altered in the
 *     Plugin Parameters.
 * - Replace 'x' with the ID of the game variable whose value determines the
 *   'base' price of this item, weapon, or armor.
 *
 * ---
 *
 * <Price Plus Variable: x>
 * <Buy Plus Variable: x>
 * <Sell Plus Variable: x>
 *
 * <Price Plus Variable: x, x, x>
 * <Buy Plus Variable: x, x, x>
 * <Sell Plus Variable: x, x, x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the 'plus' price for the affected item, weapon, or armor.
 *   - By default, the price formula goes (base + plus) * rate + flat
 * - With 'Price', the notetag will affect both 'Buy' and 'Sell' prices.
 *   - 'Buy' version of the notetag will only affect price when buying.
 *   - 'Sell' version of the notetag will only affect price when selling.
 *   - When selling, the plus price is affected by the Sell Price Rate modifier
 *     if you decide to let it affect it. These settings can be altered in the
 *     Plugin Parameters.
 * - Replace 'x' with the ID of the game variable whose value determines the
 *   'plus' price of this item, weapon, or armor.
 *   - Insert multiple 'x' for more variables to contribute additively to the
 *     total 'plus' value amount when determining the price.
 * - By default, finalized prices will round up.
 *
 * ---
 *
 * <Price Rate Variable: x>
 * <Buy Rate Variable: x>
 * <Sell Rate Variable: x>
 *
 * <Price Plus Variable: x, x, x>
 * <Buy Plus Variable: x, x, x>
 * <Sell Plus Variable: x, x, x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the 'rate' price for the affected item, weapon, or armor.
 *   - By default, the price formula goes (base + plus) * rate + flat
 * - With 'Price', the notetag will affect both 'Buy' and 'Sell' prices.
 *   - 'Buy' version of the notetag will only affect price when buying.
 *   - 'Sell' version of the notetag will only affect price when selling.
 *   - When selling, the rate price is normally NOT affected by the Sell Price
 *     Rate modifier unless you decide to let it affect it. These settings can
 *     be altered in the Plugin Parameters.
 * - Replace 'x' with the ID of the game variable whose value determines the
 *   'rate' price of this item, weapon, or armor.
 *   - Insert multiple 'x' for more variables to contribute multiplicatively to
 *     the total 'rate' value amount when determining the price.
 * - When the value of the marked variable is called upon, divide the value by
 *   100 in order to determine the rate.
 *   - This means that if this variable's value is 250, it will have a
 *     multiplier rate of 2.50 and not 250.0.
 * - By default, finalized prices will round up.
 *
 * ---
 *
 * <Price Flat Variable: x>
 * <Buy Flat Variable: x>
 * <Sell Flat Variable: x>
 *
 * <Price Flat Variable: x, x, x>
 * <Buy Flat Variable: x, x, x>
 * <Sell Flat Variable: x, x, x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the 'flat' price for the affected item, weapon, or armor.
 *   - By default, the price formula goes (base + plus) * rate + flat
 * - With 'Price', the notetag will affect both 'Buy' and 'Sell' prices.
 *   - 'Buy' version of the notetag will only affect price when buying.
 *   - 'Sell' version of the notetag will only affect price when selling.
 *   - When selling, the flat price is affected by the Sell Price Rate modifier
 *     if you decide to let it affect it. These settings can be altered in the
 *     Plugin Parameters.
 * - Replace 'x' with the ID of the game variable whose value determines the
 *   'flat' price of this item, weapon, or armor.
 *   - Insert multiple 'x' for more variables to contribute additively to the
 *     total 'flat' value amount when determining the price.
 * - By default, finalized prices will round up.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings used for this plugin in order to help govern
 * and determine how price fluctuations function for buying and selling.
 *
 * ---
 *
 * Sell Rates
 * 
 *   Base Price Affected?:
 *   - Affect 'base' price with the sell rate?
 *   - Affected prices will sell for lower.
 * 
 *   Plus Price Affected?:
 *   - Affect 'plus' modifier with the sell rate?
 *   - Affected modifier will sell for lower.
 * 
 *   Rate Price Affected?:
 *   - Affect 'rate' modifier with the sell rate?
 *   - Affected modifier will sell for lower.
 * 
 *   Flat Price Affected?:
 *   - Affect 'flat' modifier with the sell rate?
 *   - Affected modifier will sell for lower.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Finalize Buy:
 *   - What is the code that will be ran before finalizing the buy price?
 * 
 *   JS: Finalize Sell:
 *   - What is the code that will be ran before finalizing the sell price?
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
 * Version 1.00 Official Release Date: October 8, 2021
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
 * @param FlucShopPrices
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param SellRates
 * @text Sell Rates
 *
 * @param SellRateBase:eval
 * @text Base Price Affected?
 * @parent SellRates
 * @type boolean
 * @on Affect
 * @off Normal
 * @desc Affect 'base' price with the sell rate?
 * Affected prices will sell for lower.
 * @default true
 *
 * @param SellRatePlus:eval
 * @text Plus Price Affected?
 * @parent SellRates
 * @type boolean
 * @on Affect
 * @off Normal
 * @desc Affect 'plus' modifier with the sell rate?
 * Affected modifier will sell for lower.
 * @default true
 *
 * @param SellRateRate:eval
 * @text Rate Price Affected?
 * @parent SellRates
 * @type boolean
 * @on Affect
 * @off Normal
 * @desc Affect 'rate' modifier with the sell rate?
 * Affected modifier will sell for lower.
 * @default false
 *
 * @param SellRateFlat:eval
 * @text Flat Price Affected?
 * @parent SellRates
 * @type boolean
 * @on Affect
 * @off Normal
 * @desc Affect 'flat' modifier with the sell rate?
 * Affected modifier will sell for lower.
 * @default true
 * 
 * @param JavaScript
 *
 * @param FinalizeBuyJS:func
 * @text JS: Finalize Buy
 * @parent JavaScript
 * @type note
 * @desc What is the code that will be ran before finalizing the buy price?
 * @default "// Declare Variables\nlet base = arguments[0];\nlet plus = arguments[1];\nlet rate = arguments[2];\nlet flat = arguments[3];\n\n// Calculations\nlet price = (base + plus) * rate + flat;\n\n// Return Price\nprice = Math.max(price, 0);\nprice = Math.ceil(price);\nreturn price;"
 *
 * @param FinalizeSellJS:func
 * @text JS: Finalize Sell
 * @parent JavaScript
 * @type note
 * @desc What is the code that will be ran before finalizing the sell price?
 * @default "// Declare Variables\nlet base = arguments[0];\nlet plus = arguments[1];\nlet rate = arguments[2];\nlet flat = arguments[3];\n\n// Calculations\nlet price = (base + plus) * rate + flat;\n\n// Return Price\nprice = Math.max(price, 0);\nprice = Math.ceil(price);\nreturn price;"
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

function _0x11bd(){const _0x296302=['9weainn','Settings','filter','24OGcsLd','44eKODTf','447iWBVos','13255EbNlel','max','SellRatePlus','IYJVE','EVAL','SellRateFlat','format','SELL_PLUS_PRICE_RATE_AFFECTED','Window_ShopBuy_price','price','8167944TCalUK','rdNfu','1485337pfrhQm','split','IRuLe','priceFluctuationBase','value','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Scene_Shop_sellingPrice','map','SELL_FLAT_PRICE_RATE_AFFECTED','ConvertParams','parse','status','HhMaD','20805dZCUBA','884yBzKpg','name','BmsyG','FUNC','SellRateBase','sellFluctuationRate','XnZFs','RcXMQ','sellingPrice','oXUkR','ARRAYNUM','BuyPlusVar','ARRAYSTR','OCJrr','ARRAYSTRUCT','5708406OclaJB','sellFluctuationBase','call','round','sellFluctuationPlus','toUpperCase','OSEjd','match','trim','BuyBaseVar','remove','RegExp','BuyFlatVar','ARRAYJSON','description','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','NUM','SELL_BASE_PRICE_RATE_AFFECTED','sEaQm','priceFluctuationRate','ceil','sellFluctuationFlat','STR','WJQJW','14990kirPYk','SellPlusVar','note','ARRAYEVAL','JSON','SellRateRate','SellRateVar','279230gnXpxg','ARRAYFUNC','TRpFp','FlucShopPrices','SellBaseVar','FinalizeSellJS','sellPriceRate','SELL_RATE_PRICE_RATE_AFFECTED','FinalizeBuyJS','priceFluctuationPlus','priceFluctuationFlat','_item','exit','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','prototype','STRUCT','BuyRateVar','includes'];_0x11bd=function(){return _0x296302;};return _0x11bd();}const _0x1eb003=_0x53d3;function _0x53d3(_0x3278ce,_0x4fe6b6){const _0x11bdae=_0x11bd();return _0x53d3=function(_0x53d3ec,_0x481244){_0x53d3ec=_0x53d3ec-0x164;let _0x30ccbe=_0x11bdae[_0x53d3ec];return _0x30ccbe;},_0x53d3(_0x3278ce,_0x4fe6b6);}(function(_0x45bc64,_0x67bda2){const _0x48e198=_0x53d3,_0x50bc25=_0x45bc64();while(!![]){try{const _0x47cc15=parseInt(_0x48e198(0x171))/0x1+parseInt(_0x48e198(0x199))/0x2*(parseInt(_0x48e198(0x1b7))/0x3)+-parseInt(_0x48e198(0x172))/0x4*(-parseInt(_0x48e198(0x1b8))/0x5)+parseInt(_0x48e198(0x181))/0x6+-parseInt(_0x48e198(0x164))/0x7*(-parseInt(_0x48e198(0x1b5))/0x8)+parseInt(_0x48e198(0x1b2))/0x9*(parseInt(_0x48e198(0x1a0))/0xa)+-parseInt(_0x48e198(0x1b6))/0xb*(parseInt(_0x48e198(0x1c2))/0xc);if(_0x47cc15===_0x67bda2)break;else _0x50bc25['push'](_0x50bc25['shift']());}catch(_0x248a84){_0x50bc25['push'](_0x50bc25['shift']());}}}(_0x11bd,0x968e8));var label=_0x1eb003(0x1a3),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1eb003(0x1b4)](function(_0x4bfad0){const _0x2be635=_0x1eb003;return _0x4bfad0['status']&&_0x4bfad0[_0x2be635(0x18f)][_0x2be635(0x1b1)]('['+label+']');})[0x0];VisuMZ[label][_0x1eb003(0x1b3)]=VisuMZ[label][_0x1eb003(0x1b3)]||{},VisuMZ[_0x1eb003(0x16d)]=function(_0x516b7f,_0x1dec5d){const _0xa479ac=_0x1eb003;for(const _0x5b9f42 in _0x1dec5d){if(_0x5b9f42[_0xa479ac(0x188)](/(.*):(.*)/i)){if(_0xa479ac(0x1a2)!==_0xa479ac(0x1a2)){let _0x275fd7=0x0;const _0x1656a3=_0x2bbe49[_0xa479ac(0x1a3)]['RegExp'],_0x2be1f5=_0x4d5dde[_0xa479ac(0x19b)]||'';if(_0x2be1f5[_0xa479ac(0x188)](_0x1656a3[_0xa479ac(0x17d)])){const _0x3dd71c=_0x4867c2(_0x2fd7e8['$1'])[_0xa479ac(0x165)](',')[_0xa479ac(0x16b)](_0x4b83ad=>_0xdb1c80(_0x4b83ad)||0x0)[_0xa479ac(0x18b)](0x0);for(const _0x231630 of _0x3dd71c){_0x275fd7+=_0x3133f3[_0xa479ac(0x168)](_0x231630)||0x0;}}return _0x275fd7;}else{const _0x1c37b5=String(RegExp['$1']),_0xb61fb8=String(RegExp['$2'])[_0xa479ac(0x186)]()[_0xa479ac(0x189)]();let _0x75689f,_0x206665,_0x2914e9;switch(_0xb61fb8){case _0xa479ac(0x191):_0x75689f=_0x1dec5d[_0x5b9f42]!==''?Number(_0x1dec5d[_0x5b9f42]):0x0;break;case _0xa479ac(0x17c):_0x206665=_0x1dec5d[_0x5b9f42]!==''?JSON[_0xa479ac(0x16e)](_0x1dec5d[_0x5b9f42]):[],_0x75689f=_0x206665[_0xa479ac(0x16b)](_0x4cfd6c=>Number(_0x4cfd6c));break;case _0xa479ac(0x1bc):_0x75689f=_0x1dec5d[_0x5b9f42]!==''?eval(_0x1dec5d[_0x5b9f42]):null;break;case _0xa479ac(0x19c):_0x206665=_0x1dec5d[_0x5b9f42]!==''?JSON[_0xa479ac(0x16e)](_0x1dec5d[_0x5b9f42]):[],_0x75689f=_0x206665[_0xa479ac(0x16b)](_0xb2bf07=>eval(_0xb2bf07));break;case _0xa479ac(0x19d):_0x75689f=_0x1dec5d[_0x5b9f42]!==''?JSON['parse'](_0x1dec5d[_0x5b9f42]):'';break;case _0xa479ac(0x18e):_0x206665=_0x1dec5d[_0x5b9f42]!==''?JSON['parse'](_0x1dec5d[_0x5b9f42]):[],_0x75689f=_0x206665[_0xa479ac(0x16b)](_0x164649=>JSON[_0xa479ac(0x16e)](_0x164649));break;case _0xa479ac(0x175):_0x75689f=_0x1dec5d[_0x5b9f42]!==''?new Function(JSON[_0xa479ac(0x16e)](_0x1dec5d[_0x5b9f42])):new Function('return\x200');break;case _0xa479ac(0x1a1):_0x206665=_0x1dec5d[_0x5b9f42]!==''?JSON[_0xa479ac(0x16e)](_0x1dec5d[_0x5b9f42]):[],_0x75689f=_0x206665[_0xa479ac(0x16b)](_0x2e5eea=>new Function(JSON[_0xa479ac(0x16e)](_0x2e5eea)));break;case _0xa479ac(0x197):_0x75689f=_0x1dec5d[_0x5b9f42]!==''?String(_0x1dec5d[_0x5b9f42]):'';break;case _0xa479ac(0x17e):_0x206665=_0x1dec5d[_0x5b9f42]!==''?JSON[_0xa479ac(0x16e)](_0x1dec5d[_0x5b9f42]):[],_0x75689f=_0x206665[_0xa479ac(0x16b)](_0x5d0d94=>String(_0x5d0d94));break;case _0xa479ac(0x1af):_0x2914e9=_0x1dec5d[_0x5b9f42]!==''?JSON['parse'](_0x1dec5d[_0x5b9f42]):{},_0x75689f=VisuMZ[_0xa479ac(0x16d)]({},_0x2914e9);break;case _0xa479ac(0x180):_0x206665=_0x1dec5d[_0x5b9f42]!==''?JSON[_0xa479ac(0x16e)](_0x1dec5d[_0x5b9f42]):[],_0x75689f=_0x206665[_0xa479ac(0x16b)](_0x4af17d=>VisuMZ[_0xa479ac(0x16d)]({},JSON[_0xa479ac(0x16e)](_0x4af17d)));break;default:continue;}_0x516b7f[_0x1c37b5]=_0x75689f;}}}return _0x516b7f;},(_0x311b59=>{const _0xc1a5d2=_0x1eb003,_0x117f17=_0x311b59[_0xc1a5d2(0x173)];for(const _0x30789a of dependencies){if('sEaQm'===_0xc1a5d2(0x193)){if(!Imported[_0x30789a]){alert(_0xc1a5d2(0x169)[_0xc1a5d2(0x1be)](_0x117f17,_0x30789a)),SceneManager[_0xc1a5d2(0x1ac)]();break;}}else{const _0x226eed=_0x325e1d(_0x530ce5['$1']);_0x226eed<_0x14619a?(_0x183417(_0xc1a5d2(0x1ad)[_0xc1a5d2(0x1be)](_0xa86c64,_0x226eed,_0x277dc1)),_0x2b581c[_0xc1a5d2(0x1ac)]()):_0x7762a9=_0x3b8c0e[_0xc1a5d2(0x1b9)](_0x226eed,_0x358962);}}const _0x520d5b=_0x311b59[_0xc1a5d2(0x18f)];if(_0x520d5b[_0xc1a5d2(0x188)](/\[Version[ ](.*?)\]/i)){if(_0xc1a5d2(0x1c3)!==_0xc1a5d2(0x1bb)){const _0x526376=Number(RegExp['$1']);if(_0x526376!==VisuMZ[label]['version']){if('IgVyU'!=='IgVyU'){const _0x57bf1f=_0x17612c(_0x4fa509['$1'])[_0xc1a5d2(0x165)](',')[_0xc1a5d2(0x16b)](_0x43e8b4=>_0x26e763(_0x43e8b4)||0x0)[_0xc1a5d2(0x18b)](0x0);for(const _0x3840d2 of _0x57bf1f){_0x43aa0c*=(_0x2d10b7[_0xc1a5d2(0x168)](_0x3840d2)||0x0)*0.01;}}else alert(_0xc1a5d2(0x190)['format'](_0x117f17,_0x526376)),SceneManager['exit']();}}else{let _0xb1e790=_0x2a52e3[_0xc1a5d2(0x1a3)][_0xc1a5d2(0x1c0)]['call'](this,_0x1c2b96);const _0x203d01=_0x12c321[_0xc1a5d2(0x1a3)]['RegExp'],_0x4a890f=_0x1ad0cb[_0xc1a5d2(0x19b)]||'';if(_0x4a890f[_0xc1a5d2(0x188)](_0x203d01[_0xc1a5d2(0x18a)])){const _0x15317a=_0x4d09fc(_0x1ad56a['$1']);_0xb1e790=_0x312075[_0xc1a5d2(0x168)](_0x15317a)||0x0;}return _0xb1e790;}}if(_0x520d5b[_0xc1a5d2(0x188)](/\[Tier[ ](\d+)\]/i)){const _0xe07443=Number(RegExp['$1']);if(_0xe07443<tier)alert(_0xc1a5d2(0x1ad)[_0xc1a5d2(0x1be)](_0x117f17,_0xe07443,tier)),SceneManager[_0xc1a5d2(0x1ac)]();else{if(_0xc1a5d2(0x166)==='IRuLe')tier=Math[_0xc1a5d2(0x1b9)](_0xe07443,tier);else return _0x1d4367[_0xc1a5d2(0x16f)]&&_0x2c7441[_0xc1a5d2(0x18f)][_0xc1a5d2(0x1b1)]('['+_0x8df8e9+']');}}VisuMZ[_0xc1a5d2(0x16d)](VisuMZ[label][_0xc1a5d2(0x1b3)],_0x311b59['parameters']);})(pluginData),VisuMZ[_0x1eb003(0x1a3)][_0x1eb003(0x18c)]={'BuyBaseVar':/<(?:BUY|BUY PRICE|PRICE) BASE (?:VAR|VARIABLE|VARIABLES):[ ](.*)>/i,'BuyPlusVar':/<(?:BUY|BUY PRICE|PRICE) PLUS (?:VAR|VARIABLE|VARIABLES):[ ](.*)>/i,'BuyRateVar':/<(?:BUY|BUY PRICE|PRICE) RATE (?:VAR|VARIABLE|VARIABLES):[ ](.*)>/i,'BuyFlatVar':/<(?:BUY|BUY PRICE|PRICE) FLAT (?:VAR|VARIABLE|VARIABLES):[ ](.*)>/i,'SellBaseVar':/<(?:SELL|SELL PRICE|PRICE) BASE (?:VAR|VARIABLE|VARIABLES):[ ](.*)>/i,'SellPlusVar':/<(?:SELL|SELL PRICE|PRICE) PLUS (?:VAR|VARIABLE|VARIABLES):[ ](.*)>/i,'SellRateVar':/<(?:SELL|SELL PRICE|PRICE) RATE (?:VAR|VARIABLE|VARIABLES):[ ](.*)>/i,'SellFlatVar':/<(?:SELL|SELL PRICE|PRICE) FLAT (?:VAR|VARIABLE|VARIABLES):[ ](.*)>/i},Scene_Shop[_0x1eb003(0x192)]=VisuMZ[_0x1eb003(0x1a3)][_0x1eb003(0x1b3)][_0x1eb003(0x176)],Scene_Shop[_0x1eb003(0x1bf)]=VisuMZ['FlucShopPrices'][_0x1eb003(0x1b3)][_0x1eb003(0x1ba)],Scene_Shop[_0x1eb003(0x1a7)]=VisuMZ[_0x1eb003(0x1a3)][_0x1eb003(0x1b3)][_0x1eb003(0x19e)],Scene_Shop[_0x1eb003(0x16c)]=VisuMZ[_0x1eb003(0x1a3)]['Settings'][_0x1eb003(0x1bd)],VisuMZ[_0x1eb003(0x1a3)][_0x1eb003(0x16a)]=Scene_Shop[_0x1eb003(0x1ae)][_0x1eb003(0x17a)],Scene_Shop[_0x1eb003(0x1ae)]['sellingPrice']=function(){const _0x2491e8=_0x1eb003;let _0x2f4ff8=this[_0x2491e8(0x1ab)];if(!_0x2f4ff8)return 0x0;let _0x2d05c1=this[_0x2491e8(0x182)](_0x2f4ff8),_0x260e14=this[_0x2491e8(0x185)](_0x2f4ff8),_0xc1ccbf=this[_0x2491e8(0x177)](_0x2f4ff8),_0x238cf3=this['sellFluctuationFlat'](_0x2f4ff8);if(VisuMZ[_0x2491e8(0x1a3)]['Settings'][_0x2491e8(0x1a5)])return _0x2491e8(0x179)===_0x2491e8(0x179)?VisuMZ[_0x2491e8(0x1a3)]['Settings'][_0x2491e8(0x1a5)][_0x2491e8(0x183)](this,_0x2d05c1,_0x260e14,_0xc1ccbf,_0x238cf3):_0x1ab0c3[_0x2491e8(0x1a3)][_0x2491e8(0x1b3)][_0x2491e8(0x1a5)][_0x2491e8(0x183)](this,_0x540e88,_0x118df9,_0x45f7fc,_0x3e0ac7);return Math[_0x2491e8(0x184)](Math[_0x2491e8(0x195)]((_0x2d05c1+_0x260e14)*_0xc1ccbf+_0x238cf3));},Scene_Shop['prototype'][_0x1eb003(0x182)]=function(_0x2858c9){const _0x4ffe51=_0x1eb003;let _0x111519=VisuMZ[_0x4ffe51(0x1a3)][_0x4ffe51(0x16a)][_0x4ffe51(0x183)](this);const _0x1095b6=VisuMZ['FlucShopPrices'][_0x4ffe51(0x18c)],_0x2932f7=_0x2858c9[_0x4ffe51(0x19b)]||'';if(_0x2932f7['match'](_0x1095b6[_0x4ffe51(0x1a4)])){const _0x40ff97=Number(RegExp['$1']);_0x111519=$gameVariables[_0x4ffe51(0x168)](_0x40ff97)||0x0,Scene_Shop[_0x4ffe51(0x192)]&&(_0x4ffe51(0x187)!==_0x4ffe51(0x17f)?_0x111519*=this[_0x4ffe51(0x1a6)]?this[_0x4ffe51(0x1a6)]():0.5:_0x1c6940*=(_0x2913a6[_0x4ffe51(0x168)](_0x3b8270)||0x0)*0.01);}return _0x111519;},Scene_Shop[_0x1eb003(0x1ae)][_0x1eb003(0x185)]=function(_0x47cfb7){const _0x26b2fa=_0x1eb003;let _0x76940c=0x0;const _0x2a17d2=VisuMZ['FlucShopPrices'][_0x26b2fa(0x18c)],_0x668cf=_0x47cfb7[_0x26b2fa(0x19b)]||'';if(_0x668cf['match'](_0x2a17d2[_0x26b2fa(0x19a)])){const _0x13edce=String(RegExp['$1'])['split'](',')[_0x26b2fa(0x16b)](_0x129b6d=>Number(_0x129b6d)||0x0)['remove'](0x0);for(const _0x1b07fd of _0x13edce){if(_0x26b2fa(0x170)!==_0x26b2fa(0x170)){const _0x3bb19d=_0x5b24c8(_0x8a658d['$1']);_0x3b78d5=_0x3fc98c['value'](_0x3bb19d)||0x0;}else _0x76940c+=$gameVariables[_0x26b2fa(0x168)](_0x1b07fd)||0x0;}Scene_Shop[_0x26b2fa(0x1bf)]&&(_0x76940c*=this['sellPriceRate']?this[_0x26b2fa(0x1a6)]():0.5);}return _0x76940c;},Scene_Shop[_0x1eb003(0x1ae)]['sellFluctuationRate']=function(_0x2499b4){const _0x389c83=_0x1eb003;let _0x3054a0=0x1;const _0x1fcdf3=VisuMZ[_0x389c83(0x1a3)][_0x389c83(0x18c)],_0x35fae3=_0x2499b4['note']||'';if(_0x35fae3[_0x389c83(0x188)](_0x1fcdf3[_0x389c83(0x19f)])){const _0x21c080=String(RegExp['$1'])[_0x389c83(0x165)](',')[_0x389c83(0x16b)](_0x3af4cd=>Number(_0x3af4cd)||0x0)['remove'](0x0);for(const _0x5ce6c3 of _0x21c080){if('UfnlH'!=='rVevA')_0x3054a0*=($gameVariables[_0x389c83(0x168)](_0x5ce6c3)||0x0)*0.01;else{const _0x4db0a2=_0x3ca928(_0xecdea7['$1']);_0x38cfe3=_0x571fa5[_0x389c83(0x168)](_0x4db0a2)||0x0,_0xb51d72[_0x389c83(0x192)]&&(_0x4553ff*=this['sellPriceRate']?this['sellPriceRate']():0.5);}}Scene_Shop[_0x389c83(0x1a7)]&&(_0x3054a0*=this[_0x389c83(0x1a6)]?this[_0x389c83(0x1a6)]():0.5);}return _0x3054a0;},Scene_Shop['prototype'][_0x1eb003(0x196)]=function(_0x56cc8e){const _0x21f650=_0x1eb003;let _0x234a85=0x0;const _0x418f92=VisuMZ[_0x21f650(0x1a3)]['RegExp'],_0x38d4b3=_0x56cc8e[_0x21f650(0x19b)]||'';if(_0x38d4b3[_0x21f650(0x188)](_0x418f92['SellFlatVar'])){const _0x1e8971=String(RegExp['$1'])[_0x21f650(0x165)](',')[_0x21f650(0x16b)](_0x1bc8e4=>Number(_0x1bc8e4)||0x0)[_0x21f650(0x18b)](0x0);for(const _0x525e90 of _0x1e8971){_0x234a85+=$gameVariables[_0x21f650(0x168)](_0x525e90)||0x0;}Scene_Shop[_0x21f650(0x16c)]&&(_0x234a85*=this[_0x21f650(0x1a6)]?this[_0x21f650(0x1a6)]():0.5);}return _0x234a85;},VisuMZ[_0x1eb003(0x1a3)]['Window_ShopBuy_price']=Window_ShopBuy['prototype'][_0x1eb003(0x1c1)],Window_ShopBuy[_0x1eb003(0x1ae)][_0x1eb003(0x1c1)]=function(_0x463ff6){const _0x5a270b=_0x1eb003;if(!_0x463ff6)return 0x0;let _0x3230a1=this[_0x5a270b(0x167)](_0x463ff6),_0x4192d6=this[_0x5a270b(0x1a9)](_0x463ff6),_0xb6bc85=this[_0x5a270b(0x194)](_0x463ff6),_0x5153f0=this[_0x5a270b(0x1aa)](_0x463ff6);if(VisuMZ[_0x5a270b(0x1a3)][_0x5a270b(0x1b3)][_0x5a270b(0x1a8)])return VisuMZ[_0x5a270b(0x1a3)][_0x5a270b(0x1b3)]['FinalizeBuyJS'][_0x5a270b(0x183)](this,_0x3230a1,_0x4192d6,_0xb6bc85,_0x5153f0);return Math[_0x5a270b(0x184)](Math[_0x5a270b(0x195)]((_0x3230a1+_0x4192d6)*_0xb6bc85+_0x5153f0));},Window_ShopBuy[_0x1eb003(0x1ae)][_0x1eb003(0x167)]=function(_0xe740d9){const _0x473b71=_0x1eb003;let _0x29f478=VisuMZ[_0x473b71(0x1a3)][_0x473b71(0x1c0)][_0x473b71(0x183)](this,_0xe740d9);const _0xaf00a6=VisuMZ['FlucShopPrices'][_0x473b71(0x18c)],_0x4f36b1=_0xe740d9[_0x473b71(0x19b)]||'';if(_0x4f36b1[_0x473b71(0x188)](_0xaf00a6['BuyBaseVar'])){const _0x2c528a=Number(RegExp['$1']);_0x29f478=$gameVariables[_0x473b71(0x168)](_0x2c528a)||0x0;}return _0x29f478;},Window_ShopBuy[_0x1eb003(0x1ae)][_0x1eb003(0x1a9)]=function(_0x38cdad){const _0x3ae3f5=_0x1eb003;let _0x35a74e=0x0;const _0x41fd6c=VisuMZ[_0x3ae3f5(0x1a3)][_0x3ae3f5(0x18c)],_0x1b2167=_0x38cdad[_0x3ae3f5(0x19b)]||'';if(_0x1b2167[_0x3ae3f5(0x188)](_0x41fd6c[_0x3ae3f5(0x17d)])){const _0x55ff6b=String(RegExp['$1'])[_0x3ae3f5(0x165)](',')['map'](_0x25836d=>Number(_0x25836d)||0x0)[_0x3ae3f5(0x18b)](0x0);for(const _0x17e12d of _0x55ff6b){'hYsbI'!=='hYsbI'?_0x100463*=this['sellPriceRate']?this[_0x3ae3f5(0x1a6)]():0.5:_0x35a74e+=$gameVariables[_0x3ae3f5(0x168)](_0x17e12d)||0x0;}}return _0x35a74e;},Window_ShopBuy['prototype'][_0x1eb003(0x194)]=function(_0xc16cc1){const _0xfe6546=_0x1eb003;let _0x156d17=0x1;const _0x5856ed=VisuMZ['FlucShopPrices'][_0xfe6546(0x18c)],_0x2bdd86=_0xc16cc1[_0xfe6546(0x19b)]||'';if(_0x2bdd86[_0xfe6546(0x188)](_0x5856ed[_0xfe6546(0x1b0)])){if(_0xfe6546(0x174)===_0xfe6546(0x174)){const _0x5bf4f3=String(RegExp['$1'])[_0xfe6546(0x165)](',')[_0xfe6546(0x16b)](_0x44e3d1=>Number(_0x44e3d1)||0x0)[_0xfe6546(0x18b)](0x0);for(const _0x5d78af of _0x5bf4f3){if(_0xfe6546(0x17b)===_0xfe6546(0x198)){const _0x2ff8bb=_0xbd4b1b(_0x1c8b47['$1'])[_0xfe6546(0x165)](',')[_0xfe6546(0x16b)](_0x473d51=>_0x3876e3(_0x473d51)||0x0)[_0xfe6546(0x18b)](0x0);for(const _0x19aaa8 of _0x2ff8bb){_0x1a29a6+=_0x44657b[_0xfe6546(0x168)](_0x19aaa8)||0x0;}}else _0x156d17*=($gameVariables[_0xfe6546(0x168)](_0x5d78af)||0x0)*0.01;}}else _0x31502f*=this['sellPriceRate']?this[_0xfe6546(0x1a6)]():0.5;}return _0x156d17;},Window_ShopBuy[_0x1eb003(0x1ae)][_0x1eb003(0x1aa)]=function(_0x4880da){const _0x1754b7=_0x1eb003;let _0x53deea=0x0;const _0x389e2d=VisuMZ['FlucShopPrices']['RegExp'],_0x1f4f22=_0x4880da['note']||'';if(_0x1f4f22['match'](_0x389e2d[_0x1754b7(0x18d)])){if('UDEnY'===_0x1754b7(0x178))_0x220efc(_0x1754b7(0x1ad)['format'](_0x4a0ebc,_0xc94148,_0x2ada27)),_0x541838[_0x1754b7(0x1ac)]();else{const _0x2709fb=String(RegExp['$1'])[_0x1754b7(0x165)](',')[_0x1754b7(0x16b)](_0x3bbd6b=>Number(_0x3bbd6b)||0x0)[_0x1754b7(0x18b)](0x0);for(const _0x228117 of _0x2709fb){_0x53deea+=$gameVariables[_0x1754b7(0x168)](_0x228117)||0x0;}}}return _0x53deea;};
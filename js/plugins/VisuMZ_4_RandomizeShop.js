//=============================================================================
// VisuStella MZ - Randomize Shop
// VisuMZ_4_RandomizeShop.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_RandomizeShop = true;

var VisuMZ = VisuMZ || {};
VisuMZ.RandomizeShop = VisuMZ.RandomizeShop || {};
VisuMZ.RandomizeShop.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.00] [RandomizeShop]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Randomize_Shop_VisuStella_MZ
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Ever wanted to create NPC's that sold a random assortment of items each time
 * you encounter them randomly through a dungeon? This plugin not only makes
 * that possible, but also stores their randomized shop data so that you can
 * recall it at any time or refresh their listing through the usage of Plugin
 * Commands geared towards this very facet.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Multiple Plugin Commands geared towards the creation of randomized shop
 *   listings with a variety of settings to choose from.
 * * Shop contents are stored based on the events that they were created with.
 * * If the player leaves a shop too learn, they can return to the last
 *   instance of the same shop with the same items that were randomized.
 * * Shop contents can also be remotely created, refreshed, or recalled.
 * * Experienced JavaScript users can create their own randomized shop contents
 *   through the Plugin Commands.
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
 * Instructions - Quick Start
 * ============================================================================
 * 
 * Here are some instructions to get yourself started quickly on using the
 * Randomize Shop feature.
 * 
 * ---
 * 
 * Step 1: Create An Event with a Plugin Command
 * 
 * 1. Create a new event on a map.
 * 2. Open it up.
 * 3. Add a new Plugin Command: "This Event: Create New Randomized Shop".
 * 
 * ---
 * 
 * Step 2: Populate Shop Goods
 * 
 * 1. Keep the Plugin Command opened.
 * 2. Add ID's to the "Item ID(s)", "Weapon ID(s)", and "Armor ID(s)".
 * 3. For the "Total #", add in how many items to acquire out of the pool for
 *    each category of items, weapons, and armors.
 * 4. Adjust the remaining "Settings" accordingly.
 * 5. For "Open After?", set that to true to immediately open the shop.
 * 6. Click OK to save the contents of the Plugin Command.
 * 
 * ---
 * 
 * Step 3: Add in a Self Switch
 * 
 * 1. After the Plugin Command is inserted, add in a Self Switch.
 * 2. Set Self Switch "A" to ON.
 * 3. Click OK to save the contents of the Self Switch.
 * 
 * ---
 * 
 * Step 4: New Page
 * 
 * 1. Create a new page for the event.
 * 2. Make the new page require Self Switch "A" to be ON in order to appear.
 * 3. Remember to give the new event page a graphic.
 * 
 * ---
 * 
 * Step 5: Add the "Open" Plugin Command
 * 
 * 1. Add a new Plugin Command: "This Event: Open Last Shop".
 * 2. Click OK to save the contents of the Plugin Command.
 * 4. Save the event.
 * 5. Save your game and Play Test it.
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
 * === Remote Event Plugin Commands ===
 * 
 * ---
 *
 * Remote Event: Create New Randomized Shop
 * - Creates a new shop instance registered for remote event with
 *   randomized items.
 * 
 *   Remote:
 * 
 *     Map ID:
 *     - ID of map, remote event is on.
 *     - Use 0 for this map.
 *     - You may use JavaScript code.
 * 
 *     Event ID:
 *     - ID of remote event.
 *     - You may use JavaScript code.
 * 
 *   Shop:
 * 
 *     Item ID(s)
 *     - Select which items can appear in the random pool.
 * 
 *       Total #:
 *       - How many items will appear from the list?
 *       - You may use JavaScript code.
 * 
 *     Weapon ID(s)
 *     - Select which weapons can appear in the random pool.
 * 
 *       Total #:
 *       - How many weapons will appear from the list?
 *       - You may use JavaScript code.
 * 
 *     Armor ID(s)
 *     - Select which armors can appear in the random pool.
 * 
 *       Total #:
 *       - How many armors will appear from the list?
 *       - You may use JavaScript code.
 * 
 *   Settings:
 *
 *     Open After?:
 *     - Open the shop after creating data?
 *
 *     Absolute Maximum:
 *     - Absolute maximum number of items in shop.
 *     - If there are more, trim at random.
 *
 *     Allow Duplicates?:
 *     - Allow duplicate entries of items, weapons, and armors?
 *     - This is primarily used for other plugins.
 *     - Prices for duplicate items will be equal to the price of the first
 *       instance of that item type.
 *       - This is how it is, even in vanilla RPG Maker MZ.
 *
 *     Purchase Only?:
 *     - Make the shop purchase-only?
 *
 *     Price Variance?:
 *     - Allow the shop to have variance in prices from their base values?
 * 
 *       Variance Rate:
 *       - What variance rate do you wish to use?
 *       - 0.0 = 0%, 0.1 = 10%; 1.0 = 100%
 *
 *     Price Rate:
 *     - Final price rate (applied after everything else).
 *     - 0.0 = 0%, 0.1 = 10%; 1.0 = 100%
 *
 * ---
 *
 * Remote Event: Create New JS Shop
 * - Creates a new shop instance registered for remote event
 *   with items determined through JavaScript.
 * 
 *   Remote:
 * 
 *     Map ID:
 *     - ID of map, remote event is on.
 *     - Use 0 for this map.
 *     - You may use JavaScript code.
 * 
 *     Event ID:
 *     - ID of remote event.
 *     - You may use JavaScript code.
 * 
 *   Shop:
 * 
 *     JS: Goods:
 *     - Code used to determine the goods that appear in remote shop.
 * 
 *   Settings:
 *
 *     Open After?:
 *     - Open the shop after creating data?
 *
 *     Purchase Only?:
 *     - Make the shop purchase-only?
 *
 *     Price Variance?:
 *     - Allow the shop to have variance in prices from their base values?
 * 
 *       Variance Rate:
 *       - What variance rate do you wish to use?
 *       - 0.0 = 0%, 0.1 = 10%; 1.0 = 100%
 *
 *     Price Rate:
 *     - Final price rate (applied after everything else).
 *     - 0.0 = 0%, 0.1 = 10%; 1.0 = 100%
 *
 * ---
 *
 * Remote Event: Open Last Shop
 * - Reopens the last shop for remote event, retaining any and all randomized
 *   items in their order and main shop settings.
 * 
 *   Remote:
 * 
 *     Map ID:
 *     - ID of map, remote event is on.
 *     - Use 0 for this map.
 *     - You may use JavaScript code.
 * 
 *     Event ID:
 *     - ID of remote event.
 *     - You may use JavaScript code.
 *
 * ---
 * 
 * === This Event Plugin Commands ===
 * 
 * ---
 *
 * This Event: Create New Randomized Shop
 * - Creates a new shop instance registered for this event
 *   with randomized items.
 * 
 *   Shop:
 * 
 *     Item ID(s)
 *     - Select which items can appear in the random pool.
 * 
 *       Total #:
 *       - How many items will appear from the list?
 *       - You may use JavaScript code.
 * 
 *     Weapon ID(s)
 *     - Select which weapons can appear in the random pool.
 * 
 *       Total #:
 *       - How many weapons will appear from the list?
 *       - You may use JavaScript code.
 * 
 *     Armor ID(s)
 *     - Select which armors can appear in the random pool.
 * 
 *       Total #:
 *       - How many armors will appear from the list?
 *       - You may use JavaScript code.
 * 
 *   Settings:
 *
 *     Open After?:
 *     - Open the shop after creating data?
 *
 *     Absolute Maximum:
 *     - Absolute maximum number of items in shop.
 *     - If there are more, trim at random.
 *
 *     Allow Duplicates?:
 *     - Allow duplicate entries of items, weapons, and armors?
 *     - This is primarily used for other plugins.
 *     - Prices for duplicate items will be equal to the price of the first
 *       instance of that item type.
 *       - This is how it is, even in vanilla RPG Maker MZ.
 *
 *     Purchase Only?:
 *     - Make the shop purchase-only?
 *
 *     Price Variance?:
 *     - Allow the shop to have variance in prices from their base values?
 * 
 *       Variance Rate:
 *       - What variance rate do you wish to use?
 *       - 0.0 = 0%, 0.1 = 10%; 1.0 = 100%
 *
 *     Price Rate:
 *     - Final price rate (applied after everything else).
 *     - 0.0 = 0%, 0.1 = 10%; 1.0 = 100%
 *
 * ---
 *
 * This Event: Create New JS Shop
 * - Creates a new shop instance registered for this event
 *   with items determined through JavaScript.
 * 
 *   Shop:
 * 
 *     JS: Goods:
 *     - Code used to determine the goods that appear in this shop.
 * 
 *   Settings:
 *
 *     Open After?:
 *     - Open the shop after creating data?
 *
 *     Purchase Only?:
 *     - Make the shop purchase-only?
 *
 *     Price Variance?:
 *     - Allow the shop to have variance in prices from their base values?
 * 
 *       Variance Rate:
 *       - What variance rate do you wish to use?
 *       - 0.0 = 0%, 0.1 = 10%; 1.0 = 100%
 *
 *     Price Rate:
 *     - Final price rate (applied after everything else).
 *     - 0.0 = 0%, 0.1 = 10%; 1.0 = 100%
 *
 * ---
 *
 * This Event: Open Last Shop
 * - Reopens the last shop for this event, retaining any and all randomized
 *   items in their order and main shop settings.
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
 * Version 1.00 Official Release Date: March 11, 2022
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RemoteEventCreateNewRandomizedShop
 * @text Remote Event: Create New Randomized Shop
 * @desc Creates a new shop instance registered for remote event
 * with randomized items.
 * 
 * @arg Remote
 * @text Target Remote Event
 *
 * @arg MapID:eval
 * @text Map ID
 * @parent Remote
 * @desc ID of map, remote event is on. Use 0 for this map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventID:eval
 * @text Event ID
 * @parent Remote
 * @desc ID of remote event.
 * You may use JavaScript code.
 * @default 1
 * 
 * @arg Shop
 * 
 * @arg ItemIDs:arraynum
 * @text Item ID(s)
 * @parent Shop
 * @type item[]
 * @desc Select which items can appear in the random pool.
 * @default []
 *
 * @arg ItemRandTotal:eval
 * @text Total #
 * @parent ItemIDs:arraynum
 * @desc How many items will appear from the list?
 * You may use JavaScript code.
 * @default 8
 * 
 * @arg WeaponIDs:arraynum
 * @text Weapon ID(s)
 * @parent Shop
 * @type weapon[]
 * @desc Select which weapon can appear in the random pool.
 * @default []
 *
 * @arg WeaponRandTotal:eval
 * @text Total #
 * @parent WeaponIDs:arraynum
 * @desc How many weapons will appear from the list?
 * You may use JavaScript code.
 * @default 8
 * 
 * @arg ArmorIDs:arraynum
 * @text Armor ID(s)
 * @parent Shop
 * @type armor[]
 * @desc Select which armors can appear in the random pool.
 * @default []
 *
 * @arg ArmorRandTotal:eval
 * @text Total #
 * @parent ArmorIDs:arraynum
 * @desc How many armors will appear from the list?
 * You may use JavaScript code.
 * @default 8
 * 
 * @arg Settings
 * @text Settings
 *
 * @arg OpenAfter:eval
 * @text Open After?
 * @parent Settings
 * @type boolean
 * @on Open
 * @off Just Store Data
 * @desc Open the shop after creating data?
 * @default false
 *
 * @arg AbsoluteMax:eval
 * @text Absolute Maximum
 * @parent Settings
 * @desc Absolute maximum number of items in shop.
 * If there are more, trim at random.
 * @default 16
 *
 * @arg AllowDuplicates:eval
 * @text Allow Duplicates?
 * @parent Settings
 * @type boolean
 * @on Allow Duplicates
 * @off Only Unique Entries
 * @desc Allow duplicate entries of items, weapons, and armors?
 * @default false
 *
 * @arg PurchaseOnly:eval
 * @text Purchase Only?
 * @parent Settings
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 *
 * @arg AllowVariance:eval
 * @text Price Variance?
 * @parent Settings
 * @type boolean
 * @on Allow Variance
 * @off Default Base Prices
 * @desc Allow the shop to have variance in prices from their base values?
 * @default false
 *
 * @arg PriceVariance:eval
 * @text Variance Rate
 * @parent AllowVariance:eval
 * @desc What variance rate do you wish to use?
 * 0.0 = 0%, 0.1 = 10%; 1.0 = 100%
 * @default 0.20
 *
 * @arg PriceRate:eval
 * @text Price Rate
 * @parent Settings
 * @desc Final price rate (applied after everything else).
 * 0.0 = 0%, 0.1 = 10%; 1.0 = 100%
 * @default 1.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RemoteEventCreateNewJsShop
 * @text Remote Event: Create New JS Shop
 * @desc Creates a new shop instance registered for remote event
 * with items determined through JavaScript.
 * 
 * @arg Remote
 * @text Target Remote Event
 *
 * @arg MapID:eval
 * @text Map ID
 * @parent Remote
 * @desc ID of map, remote event is on. Use 0 for this map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventID:eval
 * @text Event ID
 * @parent Remote
 * @desc ID of remote event.
 * You may use JavaScript code.
 * @default 1
 * 
 * @arg Shop
 * 
 * @arg GoodsJS:func
 * @text JS: Goods
 * @parent Shop
 * @type note
 * @desc Code used to determine the goods that appear in remote shop.
 * @default "// Declare Goods\nlet goods = [];\n\n// Fill Goods\ngoods.push($dataItems[7]);\ngoods.push($dataItems[8]);\ngoods.push($dataItems[9]);\n\n// Return Goods\nreturn goods;"
 * 
 * @arg Settings
 * @text Settings
 *
 * @arg OpenAfter:eval
 * @text Open After?
 * @parent Settings
 * @type boolean
 * @on Open
 * @off Just Store Data
 * @desc Open the shop after creating data?
 * @default false
 *
 * @arg PurchaseOnly:eval
 * @text Purchase Only?
 * @parent Settings
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 *
 * @arg AllowVariance:eval
 * @text Price Variance?
 * @parent Settings
 * @type boolean
 * @on Allow Variance
 * @off Default Base Prices
 * @desc Allow the shop to have variance in prices from their base values?
 * @default false
 *
 * @arg PriceVariance:eval
 * @text Variance Rate
 * @parent AllowVariance:eval
 * @desc What variance rate do you wish to use?
 * 0.0 = 0%, 0.1 = 10%; 1.0 = 100%
 * @default 0.20
 *
 * @arg PriceRate:eval
 * @text Price Rate
 * @parent Settings
 * @desc Final price rate (applied after everything else).
 * 0.0 = 0%, 0.1 = 10%; 1.0 = 100%
 * @default 1.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RemoteEventReopenLastShop
 * @text Remote Event: Open Last Shop
 * @desc Reopens the last shop for remote event, retaining any and all
 * randomized items in their order and main shop settings.
 * 
 * @arg Remote
 * @text Target Remote Event
 *
 * @arg MapID:eval
 * @text Map ID
 * @parent Remote
 * @desc ID of map, remote event is on. Use 0 for this map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventID:eval
 * @text Event ID
 * @parent Remote
 * @desc ID of remote event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ThisEventCreateNewRandomizedShop
 * @text This Event: Create New Randomized Shop
 * @desc Creates a new shop instance registered for this event
 * with randomized items.
 * 
 * @arg Shop
 * 
 * @arg ItemIDs:arraynum
 * @text Item ID(s)
 * @parent Shop
 * @type item[]
 * @desc Select which items can appear in the random pool.
 * @default []
 *
 * @arg ItemRandTotal:eval
 * @text Total #
 * @parent ItemIDs:arraynum
 * @desc How many items will appear from the list?
 * You may use JavaScript code.
 * @default 8
 * 
 * @arg WeaponIDs:arraynum
 * @text Weapon ID(s)
 * @parent Shop
 * @type weapon[]
 * @desc Select which weapon can appear in the random pool.
 * @default []
 *
 * @arg WeaponRandTotal:eval
 * @text Total #
 * @parent WeaponIDs:arraynum
 * @desc How many weapons will appear from the list?
 * You may use JavaScript code.
 * @default 8
 * 
 * @arg ArmorIDs:arraynum
 * @text Armor ID(s)
 * @parent Shop
 * @type armor[]
 * @desc Select which armors can appear in the random pool.
 * @default []
 *
 * @arg ArmorRandTotal:eval
 * @text Total #
 * @parent ArmorIDs:arraynum
 * @desc How many armors will appear from the list?
 * You may use JavaScript code.
 * @default 8
 * 
 * @arg Settings
 * @text Settings
 *
 * @arg OpenAfter:eval
 * @text Open After?
 * @parent Settings
 * @type boolean
 * @on Open
 * @off Just Store Data
 * @desc Open the shop after creating data?
 * @default true
 *
 * @arg AbsoluteMax:eval
 * @text Absolute Maximum
 * @parent Settings
 * @desc Absolute maximum number of items in shop.
 * If there are more, trim at random.
 * @default 16
 *
 * @arg AllowDuplicates:eval
 * @text Allow Duplicates?
 * @parent Settings
 * @type boolean
 * @on Allow Duplicates
 * @off Only Unique Entries
 * @desc Allow duplicate entries of items, weapons, and armors?
 * @default false
 *
 * @arg PurchaseOnly:eval
 * @text Purchase Only?
 * @parent Settings
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 *
 * @arg AllowVariance:eval
 * @text Price Variance?
 * @parent Settings
 * @type boolean
 * @on Allow Variance
 * @off Default Base Prices
 * @desc Allow the shop to have variance in prices from their base values?
 * @default false
 *
 * @arg PriceVariance:eval
 * @text Variance Rate
 * @parent AllowVariance:eval
 * @desc What variance rate do you wish to use?
 * 0.0 = 0%, 0.1 = 10%; 1.0 = 100%
 * @default 0.20
 *
 * @arg PriceRate:eval
 * @text Price Rate
 * @parent Settings
 * @desc Final price rate (applied after everything else).
 * 0.0 = 0%, 0.1 = 10%; 1.0 = 100%
 * @default 1.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ThisEventCreateNewJsShop
 * @text This Event: Create New JS Shop
 * @desc Creates a new shop instance registered for this event
 * with items determined through JavaScript.
 * 
 * @arg Shop
 * 
 * @arg GoodsJS:func
 * @text JS: Goods
 * @parent Shop
 * @type note
 * @desc Code used to determine the goods that appear in this shop.
 * @default "// Declare Goods\nlet goods = [];\n\n// Fill Goods\ngoods.push($dataItems[7]);\ngoods.push($dataItems[8]);\ngoods.push($dataItems[9]);\n\n// Return Goods\nreturn goods;"
 * 
 * @arg Settings
 * @text Settings
 *
 * @arg OpenAfter:eval
 * @text Open After?
 * @parent Settings
 * @type boolean
 * @on Open
 * @off Just Store Data
 * @desc Open the shop after creating data?
 * @default true
 *
 * @arg PurchaseOnly:eval
 * @text Purchase Only?
 * @parent Settings
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 *
 * @arg AllowVariance:eval
 * @text Price Variance?
 * @parent Settings
 * @type boolean
 * @on Allow Variance
 * @off Default Base Prices
 * @desc Allow the shop to have variance in prices from their base values?
 * @default false
 *
 * @arg PriceVariance:eval
 * @text Variance Rate
 * @parent AllowVariance:eval
 * @desc What variance rate do you wish to use?
 * 0.0 = 0%, 0.1 = 10%; 1.0 = 100%
 * @default 0.20
 *
 * @arg PriceRate:eval
 * @text Price Rate
 * @parent Settings
 * @desc Final price rate (applied after everything else).
 * 0.0 = 0%, 0.1 = 10%; 1.0 = 100%
 * @default 1.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ThisEventReopenLastShop
 * @text This Event: Open Last Shop
 * @desc Reopens the last shop for this event, retaining any and all
 * randomized items in their order and main shop settings.
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
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

function _0x4595(_0x5e1113,_0x370ff8){const _0x359669=_0x3596();return _0x4595=function(_0x459542,_0x400d42){_0x459542=_0x459542-0x1c2;let _0x334bd7=_0x359669[_0x459542];return _0x334bd7;},_0x4595(_0x5e1113,_0x370ff8);}const _0x33e0a4=_0x4595;(function(_0x3c450a,_0x1e8fd7){const _0x5151fd=_0x4595,_0x400610=_0x3c450a();while(!![]){try{const _0x399fc3=-parseInt(_0x5151fd(0x1c2))/0x1+-parseInt(_0x5151fd(0x239))/0x2*(-parseInt(_0x5151fd(0x21f))/0x3)+parseInt(_0x5151fd(0x21e))/0x4*(-parseInt(_0x5151fd(0x1fa))/0x5)+-parseInt(_0x5151fd(0x1d0))/0x6*(-parseInt(_0x5151fd(0x20b))/0x7)+-parseInt(_0x5151fd(0x1e3))/0x8*(-parseInt(_0x5151fd(0x22f))/0x9)+-parseInt(_0x5151fd(0x1fe))/0xa*(-parseInt(_0x5151fd(0x21b))/0xb)+-parseInt(_0x5151fd(0x1f2))/0xc*(-parseInt(_0x5151fd(0x241))/0xd);if(_0x399fc3===_0x1e8fd7)break;else _0x400610['push'](_0x400610['shift']());}catch(_0x791db9){_0x400610['push'](_0x400610['shift']());}}}(_0x3596,0x1bb15));var label=_0x33e0a4(0x1e0),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x33e0a4(0x206)](function(_0x28beef){const _0x44d300=_0x33e0a4;return _0x28beef['status']&&_0x28beef[_0x44d300(0x232)]['includes']('['+label+']');})[0x0];function _0x3596(){const _0x2aa20a=['CalculatePrice','description','AbsoluteMax','PriceRate','push','iNOqO','_mapEventStoredShops','CreateGoodsFromData','2MaQpkH','CreateGoods','_interpreter','Game_Interpreter_PluginCommand','storeLastShopKeyFromGenericEvent','_lastPluginCommandInterpreter','Game_System_initialize','JSON','143RXoIiU','initStoredShopData','DlCwG','return\x200','MAP-%1\x20EVENT-%2','EventID','length','ARRAYEVAL','175190cnPCgm','parse','value','setLastShopKey','%1IDs','AllowDuplicates','EKXoM','wBFuF','constructor','getLastShopKey','Viheb','sortGoods','initialize','_lastShopkey','1338jkyeTr','goods','prepare','yrFni','abs','PZdRj','isItemVisible','ftFVD','AllowVariance','EVAL','MapID','Settings','Scene_Base_terminate','aEGJZ','XVepE','Scene_Shop_prepare','RandomizeShop','KwVnf','skbqj','64NjppMc','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Weapon','NUM','applyVariance','map','PurchaseOnly','_purchaseOnly','ARRAYSTRUCT','saveKeyStoredShop','MrHYA','saveMapEventStoredShop','concat','storeLastShopKey','exit','28164ioOPNc','getMapEventStoredShop','getKeyStoredShop','Armor','clone','Wbewq','isSceneMap','floor','20OQQwci','iQhGZ','Item','ARRAYSTR','498820etYHaP','VVGIK','PriceVariance','call','viNHj','STR','ThisEventReopenLastShop','storeShopDataToSystem','filter','STRUCT','RemoteEventCreateNewJsShop','prepareNextScene','storeLastShopKeyFromInterpreter','14SxugcO','ARRAYNUM','format','price','OpenAfter','setLastPluginCommandInterpreter','match','max','JBvgW','ceil','hmyis','randomInt','terminate','GoodsJS','purchaseOnly','registerCommand','11ebLDde','version','CreateGoodsFromJS','9884wYqjwW','472602taoieV','prototype','sort','GDHlp','command357','RemoteEventReopenLastShop','remove','getLastPluginCommandInterpreter','_goods','getMapEventStoredShops','mapId','ThisEventCreateNewJsShop','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','eventId','name','ARRAYJSON','72927BALtDK','ConvertParams'];_0x3596=function(){return _0x2aa20a;};return _0x3596();}VisuMZ[label][_0x33e0a4(0x1db)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x33e0a4(0x230)]=function(_0x30a3f9,_0x31f240){const _0xc01de9=_0x33e0a4;for(const _0x1c302a in _0x31f240){if('yrFni'!==_0xc01de9(0x1d3)){if(this[_0xc01de9(0x237)]===_0x3edf23)this['initStoredShopData']();const _0x69f75d=_0xc01de9(0x245)[_0xc01de9(0x20d)](_0x3feb2f,_0x4c0b81);this[_0xc01de9(0x1ec)](_0x69f75d,_0x5788ff,_0x2f625c);}else{if(_0x1c302a['match'](/(.*):(.*)/i)){const _0x391ca0=String(RegExp['$1']),_0x18d7b7=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x373e79,_0x25940b,_0x3e5df8;switch(_0x18d7b7){case _0xc01de9(0x1e6):_0x373e79=_0x31f240[_0x1c302a]!==''?Number(_0x31f240[_0x1c302a]):0x0;break;case _0xc01de9(0x20c):_0x25940b=_0x31f240[_0x1c302a]!==''?JSON['parse'](_0x31f240[_0x1c302a]):[],_0x373e79=_0x25940b[_0xc01de9(0x1e8)](_0x34394f=>Number(_0x34394f));break;case _0xc01de9(0x1d9):_0x373e79=_0x31f240[_0x1c302a]!==''?eval(_0x31f240[_0x1c302a]):null;break;case _0xc01de9(0x248):_0x25940b=_0x31f240[_0x1c302a]!==''?JSON['parse'](_0x31f240[_0x1c302a]):[],_0x373e79=_0x25940b[_0xc01de9(0x1e8)](_0x513176=>eval(_0x513176));break;case _0xc01de9(0x240):_0x373e79=_0x31f240[_0x1c302a]!==''?JSON[_0xc01de9(0x1c3)](_0x31f240[_0x1c302a]):'';break;case _0xc01de9(0x22e):_0x25940b=_0x31f240[_0x1c302a]!==''?JSON['parse'](_0x31f240[_0x1c302a]):[],_0x373e79=_0x25940b['map'](_0x15b5a1=>JSON[_0xc01de9(0x1c3)](_0x15b5a1));break;case'FUNC':_0x373e79=_0x31f240[_0x1c302a]!==''?new Function(JSON['parse'](_0x31f240[_0x1c302a])):new Function(_0xc01de9(0x244));break;case'ARRAYFUNC':_0x25940b=_0x31f240[_0x1c302a]!==''?JSON[_0xc01de9(0x1c3)](_0x31f240[_0x1c302a]):[],_0x373e79=_0x25940b[_0xc01de9(0x1e8)](_0x5a7e79=>new Function(JSON[_0xc01de9(0x1c3)](_0x5a7e79)));break;case _0xc01de9(0x203):_0x373e79=_0x31f240[_0x1c302a]!==''?String(_0x31f240[_0x1c302a]):'';break;case _0xc01de9(0x1fd):_0x25940b=_0x31f240[_0x1c302a]!==''?JSON[_0xc01de9(0x1c3)](_0x31f240[_0x1c302a]):[],_0x373e79=_0x25940b[_0xc01de9(0x1e8)](_0x2c7266=>String(_0x2c7266));break;case _0xc01de9(0x207):_0x3e5df8=_0x31f240[_0x1c302a]!==''?JSON[_0xc01de9(0x1c3)](_0x31f240[_0x1c302a]):{},_0x373e79=VisuMZ[_0xc01de9(0x230)]({},_0x3e5df8);break;case _0xc01de9(0x1eb):_0x25940b=_0x31f240[_0x1c302a]!==''?JSON[_0xc01de9(0x1c3)](_0x31f240[_0x1c302a]):[],_0x373e79=_0x25940b[_0xc01de9(0x1e8)](_0x389afc=>VisuMZ[_0xc01de9(0x230)]({},JSON[_0xc01de9(0x1c3)](_0x389afc)));break;default:continue;}_0x30a3f9[_0x391ca0]=_0x373e79;}}}return _0x30a3f9;},(_0x1af7f1=>{const _0x4fe637=_0x33e0a4,_0xe103bd=_0x1af7f1[_0x4fe637(0x22d)];for(const _0x46107e of dependencies){if(!Imported[_0x46107e]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x4fe637(0x20d)](_0xe103bd,_0x46107e)),SceneManager[_0x4fe637(0x1f1)]();break;}}const _0x4fc3f0=_0x1af7f1[_0x4fe637(0x232)];if(_0x4fc3f0[_0x4fe637(0x211)](/\[Version[ ](.*?)\]/i)){const _0xfb1372=Number(RegExp['$1']);_0xfb1372!==VisuMZ[label][_0x4fe637(0x21c)]&&(alert(_0x4fe637(0x22b)['format'](_0xe103bd,_0xfb1372)),SceneManager['exit']());}if(_0x4fc3f0[_0x4fe637(0x211)](/\[Tier[ ](\d+)\]/i)){if('bykSc'===_0x4fe637(0x1c8)){const _0x2094cc=_0x65f9a4['parse']('['+_0x56d01d['$1'][_0x4fe637(0x211)](/\d+/g)+']');for(const _0x255b11 of _0x2094cc){if(!_0x1795d[_0x4fe637(0x1c4)](_0x255b11))return!![];}return![];}else{const _0x2a09d2=Number(RegExp['$1']);if(_0x2a09d2<tier){if(_0x4fe637(0x202)==='viNHj')alert(_0x4fe637(0x1e4)[_0x4fe637(0x20d)](_0xe103bd,_0x2a09d2,tier)),SceneManager[_0x4fe637(0x1f1)]();else{let _0x55d0d4=this[_0x4fe637(0x238)](_0x4fe637(0x1fc),_0x2f6012),_0x30514d=this['CreateGoodsFromData'](_0x4fe637(0x1e5),_0x4814df),_0x474f51=this[_0x4fe637(0x238)](_0x4fe637(0x1f5),_0x20cb71),_0x449b50=_0x55d0d4[_0x4fe637(0x1ef)](_0x30514d)[_0x4fe637(0x1ef)](_0x474f51);const _0x43e02b=_0x3c81ad[_0x4fe637(0x212)](_0x4938b3[_0x4fe637(0x233)],0x1);while(_0x449b50[_0x4fe637(0x247)]>_0x43e02b){const _0x273e5b=_0x449b50[_0x219d8c[_0x4fe637(0x216)](_0x449b50[_0x4fe637(0x247)])];_0x449b50[_0x4fe637(0x225)](_0x273e5b);}this[_0x4fe637(0x1cd)](_0x449b50);if(_0x449b50[_0x4fe637(0x247)]>0x0)_0x449b50[0x0][0x4]=_0x4c7d47[_0x4fe637(0x1e9)];return _0x449b50;}}else{if(_0x4fe637(0x1cc)!=='Viheb'){const _0x408155=_0xf3b1d4[_0x4fe637(0x1d8)],_0x1ef198=_0x2f991c[_0x4fe637(0x200)],_0x1657cc=_0x13a52c[_0x4fe637(0x234)];let _0x497363=_0x133332['price']||0x0;return _0x408155&&(_0x497363=this[_0x4fe637(0x1e7)](_0x497363,_0x1ef198)),_0x497363*=_0x1657cc,_0x3f4ecc[_0x4fe637(0x214)](_0x497363);}else tier=Math['max'](_0x2a09d2,tier);}}}VisuMZ[_0x4fe637(0x230)](VisuMZ[label][_0x4fe637(0x1db)],_0x1af7f1['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData['name'],'RemoteEventCreateNewRandomizedShop',_0x3cf331=>{const _0x451665=_0x33e0a4;if(!SceneManager[_0x451665(0x1f8)]())return;VisuMZ[_0x451665(0x230)](_0x3cf331,_0x3cf331);const _0x3b7656=_0x3cf331['MapID']===0x0?$gameMap['mapId']():_0x3cf331[_0x451665(0x1da)],_0x3fc69d=_0x3cf331[_0x451665(0x246)]===0x0?$gameMap['_interpreter']['eventId']():_0x3cf331['EventID'],_0xcbb912=VisuMZ[_0x451665(0x1e0)][_0x451665(0x23a)](_0x3cf331),_0x4249fb=_0x3cf331['PurchaseOnly'];if(_0x3cf331['OpenAfter']){if(_0x451665(0x1de)==='FiXlq'){if(!_0x5ef4f9['isSceneMap']())return;_0x132969[_0x451665(0x230)](_0x4818bc,_0x3b7279);const _0x5d299e=_0x1e4b9c[_0x451665(0x1da)]===0x0?_0x5ced18['mapId']():_0x4911ec['MapID'],_0x331f90=_0x39276e[_0x451665(0x246)]===0x0?_0x4944b9['_interpreter'][_0x451665(0x22c)]():_0x2baad1[_0x451665(0x246)],_0x14fb28=_0x272ac9[_0x451665(0x1f3)](_0x5d299e,_0x331f90),_0x1a5099=_0x14fb28[_0x451665(0x1d1)],_0xb769ee=_0x14fb28[_0x451665(0x219)];_0x421de7[_0x451665(0x235)](_0x5e02d9),_0x2d7636[_0x451665(0x209)](_0x1a5099,_0xb769ee),_0x1e7b88[_0x451665(0x1f0)](_0x5d299e,_0x331f90);}else SceneManager[_0x451665(0x235)](Scene_Shop),SceneManager['prepareNextScene'](_0xcbb912,_0x4249fb),$gameTemp[_0x451665(0x1f0)](_0x3b7656,_0x3fc69d);}else{if('CEPiv'==='FRssV'){const _0x1d4976=_0x398810[_0x451665(0x1c3)]('['+_0x297e8f['$1']['match'](/\d+/g)+']');for(const _0x355550 of _0x1d4976){if(_0x158ed5[_0x451665(0x1c4)](_0x355550))return![];}return!![];}else{$gameTemp[_0x451665(0x1f0)](_0x3b7656,_0x3fc69d);const _0x4a5f8b=$gameTemp[_0x451665(0x1cb)]();$gameSystem['saveKeyStoredShop'](_0x4a5f8b,_0xcbb912,_0x4249fb);}}}),PluginManager[_0x33e0a4(0x21a)](pluginData[_0x33e0a4(0x22d)],_0x33e0a4(0x208),_0x11f109=>{const _0x33f544=_0x33e0a4;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x33f544(0x230)](_0x11f109,_0x11f109);const _0x155ba2=_0x11f109[_0x33f544(0x1da)]===0x0?$gameMap[_0x33f544(0x229)]():_0x11f109['MapID'],_0x297dbb=_0x11f109[_0x33f544(0x246)]===0x0?$gameMap[_0x33f544(0x23b)]['eventId']():_0x11f109[_0x33f544(0x246)],_0x2e0388=VisuMZ[_0x33f544(0x1e0)]['CreateGoodsFromJS'](_0x11f109),_0x330f99=_0x11f109[_0x33f544(0x1e9)];if(_0x11f109[_0x33f544(0x20f)])SceneManager[_0x33f544(0x235)](Scene_Shop),SceneManager[_0x33f544(0x209)](_0x2e0388,_0x330f99),$gameTemp['storeLastShopKey'](_0x155ba2,_0x297dbb);else{if(_0x33f544(0x1e2)!==_0x33f544(0x1e2)){const _0x3e111a=this['_goods'][_0x33f544(0x1f6)](),_0x5cdfeb=this[_0x33f544(0x1ea)]||![];_0xba6425[_0x33f544(0x1ec)](_0x486bdf,_0x3e111a,_0x5cdfeb);}else{$gameTemp[_0x33f544(0x1f0)](_0x155ba2,_0x297dbb);const _0xde305e=$gameTemp['getLastShopKey']();$gameSystem['saveKeyStoredShop'](_0xde305e,_0x2e0388,_0x330f99);}}}),PluginManager['registerCommand'](pluginData[_0x33e0a4(0x22d)],_0x33e0a4(0x224),_0x3f2104=>{const _0x1494d5=_0x33e0a4;if(!SceneManager[_0x1494d5(0x1f8)]())return;VisuMZ['ConvertParams'](_0x3f2104,_0x3f2104);const _0x1253bb=_0x3f2104[_0x1494d5(0x1da)]===0x0?$gameMap[_0x1494d5(0x229)]():_0x3f2104[_0x1494d5(0x1da)],_0xd45bb4=_0x3f2104[_0x1494d5(0x246)]===0x0?$gameMap['_interpreter'][_0x1494d5(0x22c)]():_0x3f2104[_0x1494d5(0x246)],_0x351652=$gameSystem[_0x1494d5(0x1f3)](_0x1253bb,_0xd45bb4),_0x5592e3=_0x351652[_0x1494d5(0x1d1)],_0x2eb015=_0x351652[_0x1494d5(0x219)];SceneManager[_0x1494d5(0x235)](Scene_Shop),SceneManager['prepareNextScene'](_0x5592e3,_0x2eb015),$gameTemp['storeLastShopKey'](_0x1253bb,_0xd45bb4);}),PluginManager[_0x33e0a4(0x21a)](pluginData[_0x33e0a4(0x22d)],'ThisEventCreateNewRandomizedShop',_0x30df31=>{const _0x2548db=_0x33e0a4;if(!SceneManager[_0x2548db(0x1f8)]())return;VisuMZ[_0x2548db(0x230)](_0x30df31,_0x30df31);const _0xd45153=VisuMZ[_0x2548db(0x1e0)][_0x2548db(0x23a)](_0x30df31),_0x4e12f7=_0x30df31['PurchaseOnly'];if(_0x30df31['OpenAfter']){if(_0x2548db(0x1ff)!==_0x2548db(0x1d7)){SceneManager[_0x2548db(0x235)](Scene_Shop),SceneManager[_0x2548db(0x209)](_0xd45153,_0x4e12f7);const _0x5888b7=$gameTemp[_0x2548db(0x226)]();$gameTemp[_0x2548db(0x20a)](_0x5888b7);}else{const _0x363b18=_0x2bbe81[_0x2548db(0x229)](),_0x281738=_0x48467f['eventId']();this[_0x2548db(0x1f0)](_0x363b18,_0x281738);}}else{if(_0x2548db(0x1f7)!==_0x2548db(0x1dd)){const _0x35d497=$gameTemp[_0x2548db(0x226)]();$gameTemp[_0x2548db(0x20a)](_0x35d497);const _0x2d3907=$gameTemp[_0x2548db(0x1cb)]();$gameSystem[_0x2548db(0x1ec)](_0x2d3907,_0xd45153,_0x4e12f7);}else{const _0x5eac3a=_0xf2899d(_0xf7f57['$1']);_0x5eac3a!==_0x38feee[_0x49a1a8][_0x2548db(0x21c)]&&(_0x2a907e(_0x2548db(0x22b)['format'](_0x2e71ab,_0x5eac3a)),_0x515881[_0x2548db(0x1f1)]());}}}),PluginManager[_0x33e0a4(0x21a)](pluginData[_0x33e0a4(0x22d)],_0x33e0a4(0x22a),_0x37ad4e=>{const _0x483cea=_0x33e0a4;if(!SceneManager[_0x483cea(0x1f8)]())return;VisuMZ[_0x483cea(0x230)](_0x37ad4e,_0x37ad4e);const _0x5acff3=VisuMZ['RandomizeShop'][_0x483cea(0x21d)](_0x37ad4e),_0x375547=_0x37ad4e[_0x483cea(0x1e9)];if(_0x37ad4e['OpenAfter']){SceneManager[_0x483cea(0x235)](Scene_Shop),SceneManager[_0x483cea(0x209)](_0x5acff3,_0x375547);const _0x2b09a7=$gameTemp['getLastPluginCommandInterpreter']();$gameTemp['storeLastShopKeyFromInterpreter'](_0x2b09a7);}else{if('iNOqO'!==_0x483cea(0x236))return _0x42334f[0x0]!==_0x1aff6f[0x0]?_0x4ecf91[0x0]-_0x35094b[0x0]:_0x433cdf[0x1]-_0x4770a[0x1];else{const _0x973116=$gameTemp['getLastPluginCommandInterpreter']();$gameTemp[_0x483cea(0x20a)](_0x973116);const _0x3b3615=$gameTemp[_0x483cea(0x1cb)]();$gameSystem[_0x483cea(0x1ec)](_0x3b3615,_0x5acff3,_0x375547);}}}),PluginManager[_0x33e0a4(0x21a)](pluginData['name'],_0x33e0a4(0x204),_0x12344f=>{const _0x3d2b51=_0x33e0a4;if(!SceneManager[_0x3d2b51(0x1f8)]())return;VisuMZ['ConvertParams'](_0x12344f,_0x12344f);const _0x5be08b=$gameTemp[_0x3d2b51(0x226)](),_0xccae5b=$gameMap['mapId'](),_0x43789a=_0x5be08b[_0x3d2b51(0x22c)](),_0x4b1b12=$gameSystem[_0x3d2b51(0x1f3)](_0xccae5b,_0x43789a),_0x56accc=_0x4b1b12['goods'],_0x5cfac1=_0x4b1b12['purchaseOnly'];SceneManager['push'](Scene_Shop),SceneManager[_0x3d2b51(0x209)](_0x56accc,_0x5cfac1);}),VisuMZ[_0x33e0a4(0x1e0)][_0x33e0a4(0x23a)]=function(_0x34d451){const _0x4fc884=_0x33e0a4;let _0x496a03=this['CreateGoodsFromData'](_0x4fc884(0x1fc),_0x34d451),_0x24afeb=this[_0x4fc884(0x238)](_0x4fc884(0x1e5),_0x34d451),_0x4546f5=this[_0x4fc884(0x238)](_0x4fc884(0x1f5),_0x34d451),_0x13d5aa=_0x496a03['concat'](_0x24afeb)[_0x4fc884(0x1ef)](_0x4546f5);const _0x5590df=Math[_0x4fc884(0x212)](_0x34d451[_0x4fc884(0x233)],0x1);while(_0x13d5aa[_0x4fc884(0x247)]>_0x5590df){if(_0x4fc884(0x243)!=='ZRsCQ'){const _0x31e69a=_0x13d5aa[Math[_0x4fc884(0x216)](_0x13d5aa[_0x4fc884(0x247)])];_0x13d5aa[_0x4fc884(0x225)](_0x31e69a);}else _0x544677[_0x4fc884(0x221)]((_0x4a8d04,_0x3e7ab7)=>{return _0x4a8d04[0x0]!==_0x3e7ab7[0x0]?_0x4a8d04[0x0]-_0x3e7ab7[0x0]:_0x4a8d04[0x1]-_0x3e7ab7[0x1];});}this[_0x4fc884(0x1cd)](_0x13d5aa);if(_0x13d5aa['length']>0x0)_0x13d5aa[0x0][0x4]=_0x34d451['PurchaseOnly'];return _0x13d5aa;},VisuMZ[_0x33e0a4(0x1e0)][_0x33e0a4(0x1d6)]=function(_0x6de792){const _0xdcf547=_0x33e0a4;if(!_0x6de792)return![];const _0xbcc181=_0x6de792['note']||'';if(_0xbcc181[_0xdcf547(0x211)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xdcf547(0x222)==='GDHlp'){const _0x36af26=JSON[_0xdcf547(0x1c3)]('['+RegExp['$1'][_0xdcf547(0x211)](/\d+/g)+']');for(const _0x2aa87f of _0x36af26){if(!$gameSwitches[_0xdcf547(0x1c4)](_0x2aa87f))return![];}return!![];}else{const _0x4f1bcc=_0x405f86['parse']('['+_0x32cc9b['$1']['match'](/\d+/g)+']');for(const _0x573e30 of _0x4f1bcc){if(!_0x8b543a[_0xdcf547(0x1c4)](_0x573e30))return![];}return!![];}}if(_0xbcc181['match'](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4ba45f=JSON[_0xdcf547(0x1c3)]('['+RegExp['$1'][_0xdcf547(0x211)](/\d+/g)+']');for(const _0x44e99a of _0x4ba45f){if(_0xdcf547(0x1fb)===_0xdcf547(0x1c9)){const _0x5f3551=_0x13ad1e['getLastPluginCommandInterpreter']();_0x3ad1a5['storeLastShopKeyFromInterpreter'](_0x5f3551);const _0x35a3c8=_0x188567[_0xdcf547(0x1cb)]();_0x2b514e['saveKeyStoredShop'](_0x35a3c8,_0x25a2fd,_0x8126d2);}else{if(!$gameSwitches[_0xdcf547(0x1c4)](_0x44e99a))return![];}}return!![];}if(_0xbcc181[_0xdcf547(0x211)](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2e7d1b=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x7fe7e3 of _0x2e7d1b){if(_0xdcf547(0x1d5)!==_0xdcf547(0x1d5)){_0x269e38[_0xdcf547(0x1f0)](_0x47b185,_0x2d9243);const _0x29d64a=_0x17e1f0['getLastShopKey']();_0x1addfc[_0xdcf547(0x1ec)](_0x29d64a,_0x4f0b59,_0x4d8a35);}else{if($gameSwitches['value'](_0x7fe7e3))return!![];}}return![];}if(_0xbcc181['match'](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1c0f17=JSON['parse']('['+RegExp['$1'][_0xdcf547(0x211)](/\d+/g)+']');for(const _0x32aaf3 of _0x1c0f17){if(!$gameSwitches['value'](_0x32aaf3))return!![];}return![];}if(_0xbcc181[_0xdcf547(0x211)](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xe05e6c=JSON[_0xdcf547(0x1c3)]('['+RegExp['$1'][_0xdcf547(0x211)](/\d+/g)+']');for(const _0x3037d0 of _0xe05e6c){if(_0xdcf547(0x213)!==_0xdcf547(0x213))return _0x42cb43[0x0]-_0x443ee8[0x0];else{if(!$gameSwitches[_0xdcf547(0x1c4)](_0x3037d0))return!![];}}return![];}if(_0xbcc181[_0xdcf547(0x211)](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xdcf547(0x1ed)===_0xdcf547(0x1ed)){const _0x1f20ed=JSON[_0xdcf547(0x1c3)]('['+RegExp['$1'][_0xdcf547(0x211)](/\d+/g)+']');for(const _0x4962e0 of _0x1f20ed){if($gameSwitches['value'](_0x4962e0))return![];}return!![];}else{if(_0x1ae054[_0xdcf547(0x1c4)](_0x44f889))return![];}}return!![];},VisuMZ[_0x33e0a4(0x1e0)]['CreateGoodsFromData']=function(_0x324560,_0x3c8fc8){const _0x4c1c8a=_0x33e0a4,_0x45af0f=_0x3c8fc8[_0x4c1c8a(0x1c6)[_0x4c1c8a(0x20d)](_0x324560)]||[],_0x10710d=['Item',_0x4c1c8a(0x1e5),_0x4c1c8a(0x1f5)]['indexOf'](_0x324560),_0x3bf900=[$dataItems,$dataWeapons,$dataArmors][_0x10710d],_0x3c68f7=_0x3c8fc8['%1RandTotal'[_0x4c1c8a(0x20d)](_0x324560)]||0x0,_0x4f6aa4=_0x3c8fc8[_0x4c1c8a(0x1c7)];let _0x5254b8=[];while(_0x3c68f7>_0x5254b8['length']){if(_0x45af0f[_0x4c1c8a(0x247)]<=0x0)break;const _0x486e31=_0x45af0f[Math[_0x4c1c8a(0x216)](_0x45af0f[_0x4c1c8a(0x247)])],_0x3be8a3=_0x3bf900[_0x486e31];if(_0x3be8a3&&this[_0x4c1c8a(0x1d6)](_0x3be8a3)){let _0x4a4f9d=this[_0x4c1c8a(0x231)](_0x3be8a3,_0x3c8fc8);const _0x4c8910=[_0x10710d,_0x486e31,_0x4a4f9d===_0x3be8a3[_0x4c1c8a(0x20e)]?0x0:0x1,_0x4a4f9d];_0x5254b8[_0x4c1c8a(0x235)](_0x4c8910);}(!_0x3be8a3||!_0x4f6aa4||!this['isItemVisible'](_0x3be8a3))&&_0x45af0f['remove'](_0x486e31);}return _0x5254b8;},VisuMZ[_0x33e0a4(0x1e0)][_0x33e0a4(0x21d)]=function(_0x1c5892){const _0x248601=_0x33e0a4,_0x3bad13=_0x1c5892[_0x248601(0x218)]();let _0x2d6ffd=[];for(const _0x5e4ddf of _0x3bad13){if(!_0x5e4ddf)continue;let _0x51cf0e=0x0;if(DataManager['isWeapon'](_0x5e4ddf))_0x51cf0e=0x1;if(DataManager['isArmor'](_0x5e4ddf))_0x51cf0e=0x2;const _0x2f6964=_0x5e4ddf['id'];let _0xf24084=this[_0x248601(0x231)](_0x5e4ddf,_0x1c5892);const _0x5327c0=[_0x51cf0e,_0x2f6964,_0xf24084===_0x5e4ddf[_0x248601(0x20e)]?0x0:0x1,_0xf24084];_0x2d6ffd[_0x248601(0x235)](_0x5327c0);}this['sortGoods'](_0x2d6ffd);if(_0x2d6ffd['length']>0x0)_0x2d6ffd[0x0][0x4]=_0x1c5892[_0x248601(0x1e9)];return _0x2d6ffd;},VisuMZ[_0x33e0a4(0x1e0)][_0x33e0a4(0x231)]=function(_0x39018c,_0x4ba852){const _0x12c9e0=_0x33e0a4,_0x448108=_0x4ba852[_0x12c9e0(0x1d8)],_0x3634f2=_0x4ba852[_0x12c9e0(0x200)],_0x1ac633=_0x4ba852[_0x12c9e0(0x234)];let _0x293a4f=_0x39018c[_0x12c9e0(0x20e)]||0x0;return _0x448108&&(_0x293a4f=this['applyVariance'](_0x293a4f,_0x3634f2)),_0x293a4f*=_0x1ac633,Math[_0x12c9e0(0x214)](_0x293a4f);},VisuMZ[_0x33e0a4(0x1e0)]['applyVariance']=function(_0x1560e4,_0x1b4868){const _0x617699=_0x33e0a4,_0x1645c1=Math[_0x617699(0x1f9)](Math['max'](Math[_0x617699(0x1d4)](_0x1560e4)*_0x1b4868,0x0)),_0x360019=Math[_0x617699(0x216)](_0x1645c1+0x1)+Math[_0x617699(0x216)](_0x1645c1+0x1)-_0x1645c1;return _0x1560e4>=0x0?_0x1560e4+_0x360019:_0x1560e4-_0x360019;},VisuMZ[_0x33e0a4(0x1e0)]['sortGoods']=function(_0x3da77c){_0x3da77c['sort']((_0x3e1fdf,_0xfc1ed4)=>{const _0x194d22=_0x4595;if(_0x194d22(0x215)!==_0x194d22(0x215)){if(!_0xdb5901[_0x194d22(0x1f8)]())return;_0x17934e[_0x194d22(0x230)](_0x35fc47,_0x1aeb90);const _0x305a29=_0x19b297['MapID']===0x0?_0x1a4141[_0x194d22(0x229)]():_0x34b19f[_0x194d22(0x1da)],_0x5548d2=_0x29d0a7[_0x194d22(0x246)]===0x0?_0x1eab08[_0x194d22(0x23b)]['eventId']():_0x55e45f['EventID'],_0x46469e=_0x2f773f[_0x194d22(0x1e0)][_0x194d22(0x23a)](_0x2179a4),_0x2a9ade=_0x50a748[_0x194d22(0x1e9)];if(_0x4475c8['OpenAfter'])_0x297f6e[_0x194d22(0x235)](_0x499b70),_0x36b637['prepareNextScene'](_0x46469e,_0x2a9ade),_0x41185c[_0x194d22(0x1f0)](_0x305a29,_0x5548d2);else{_0x3f60fa[_0x194d22(0x1f0)](_0x305a29,_0x5548d2);const _0x4135e7=_0x13bdc0[_0x194d22(0x1cb)]();_0xb622ba[_0x194d22(0x1ec)](_0x4135e7,_0x46469e,_0x2a9ade);}}else{if(_0x3e1fdf[0x0]!==_0xfc1ed4[0x0]){if(_0x194d22(0x1e1)==='lwQlF'){if(this[_0x194d22(0x237)]===_0x5247b6)this['initStoredShopData']();this[_0x194d22(0x237)][_0x58897c]={'goods':_0x13ba63[_0x194d22(0x1f6)](),'purchaseOnly':_0x1a3045};}else return _0x3e1fdf[0x0]-_0xfc1ed4[0x0];}else return _0x3e1fdf[0x1]-_0xfc1ed4[0x1];}});},SceneManager[_0x33e0a4(0x1f8)]=function(){return this['_scene']&&this['_scene']['constructor']===Scene_Map;},Game_Temp['prototype'][_0x33e0a4(0x210)]=function(_0x86a0a9){const _0x307378=_0x33e0a4;this[_0x307378(0x23e)]=_0x86a0a9;},Game_Temp[_0x33e0a4(0x220)][_0x33e0a4(0x226)]=function(){const _0x4621b5=_0x33e0a4;return this[_0x4621b5(0x23e)];},VisuMZ['RandomizeShop'][_0x33e0a4(0x23c)]=Game_Interpreter[_0x33e0a4(0x220)][_0x33e0a4(0x223)],Game_Interpreter[_0x33e0a4(0x220)][_0x33e0a4(0x223)]=function(_0x4861b5){const _0x45afcf=_0x33e0a4;return $gameTemp[_0x45afcf(0x210)](this),VisuMZ[_0x45afcf(0x1e0)][_0x45afcf(0x23c)][_0x45afcf(0x201)](this,_0x4861b5);},Game_Temp[_0x33e0a4(0x220)][_0x33e0a4(0x1cb)]=function(){const _0x4bf916=_0x33e0a4;return this[_0x4bf916(0x1cf)]||'';},Game_Temp['prototype'][_0x33e0a4(0x1c5)]=function(_0x5d2493){const _0x2133cd=_0x33e0a4;this[_0x2133cd(0x1cf)]=_0x5d2493;},Game_Temp[_0x33e0a4(0x220)][_0x33e0a4(0x1f0)]=function(_0x1c3e4a,_0x491e04){const _0x52a168=_0x33e0a4,_0x62e0fd=_0x52a168(0x245)[_0x52a168(0x20d)](_0x1c3e4a,_0x491e04);this['setLastShopKey'](_0x62e0fd);},Game_Temp[_0x33e0a4(0x220)][_0x33e0a4(0x23d)]=function(){const _0x187bb2=_0x33e0a4;if(!$gameMap)return;const _0x459ad9=$gameMap[_0x187bb2(0x229)](),_0x442938=$gameMap['_interpreter'][_0x187bb2(0x22c)]();this[_0x187bb2(0x1f0)](_0x459ad9,_0x442938);},Game_Temp[_0x33e0a4(0x220)][_0x33e0a4(0x20a)]=function(_0x252d58){const _0x5c5fe5=_0x33e0a4,_0x4d37e4=$gameMap[_0x5c5fe5(0x229)](),_0x1b08bc=_0x252d58[_0x5c5fe5(0x22c)]();this[_0x5c5fe5(0x1f0)](_0x4d37e4,_0x1b08bc);},VisuMZ['RandomizeShop'][_0x33e0a4(0x23f)]=Game_System[_0x33e0a4(0x220)][_0x33e0a4(0x1ce)],Game_System[_0x33e0a4(0x220)][_0x33e0a4(0x1ce)]=function(){const _0x2a16cd=_0x33e0a4;VisuMZ[_0x2a16cd(0x1e0)][_0x2a16cd(0x23f)][_0x2a16cd(0x201)](this),this[_0x2a16cd(0x242)]();},Game_System[_0x33e0a4(0x220)][_0x33e0a4(0x242)]=function(){const _0x475d08=_0x33e0a4;this[_0x475d08(0x237)]=this[_0x475d08(0x237)]||{};},Game_System[_0x33e0a4(0x220)][_0x33e0a4(0x228)]=function(){const _0x10e2f6=_0x33e0a4;if(this[_0x10e2f6(0x237)]===undefined)this[_0x10e2f6(0x242)]();return this[_0x10e2f6(0x237)];},Game_System['prototype']['getMapEventStoredShop']=function(_0x2efa97,_0x533381){const _0x5b0255=_0x33e0a4;if(this[_0x5b0255(0x237)]===undefined)this[_0x5b0255(0x242)]();const _0x3988fa='MAP-%1\x20EVENT-%2'[_0x5b0255(0x20d)](_0x2efa97,_0x533381);return this['getKeyStoredShop'](_0x3988fa);},Game_System[_0x33e0a4(0x220)][_0x33e0a4(0x1f4)]=function(_0x10bba3){const _0x16260b=_0x33e0a4;if(this[_0x16260b(0x237)]===undefined)this[_0x16260b(0x242)]();return this[_0x16260b(0x237)][_0x10bba3]=this[_0x16260b(0x237)][_0x10bba3]||{'goods':[],'purchaseOnly':![]},this[_0x16260b(0x237)][_0x10bba3];},Game_System['prototype'][_0x33e0a4(0x1ee)]=function(_0x52cb26,_0x86342,_0x409a79,_0x79af6a){const _0x29202a=_0x33e0a4;if(this[_0x29202a(0x237)]===undefined)this[_0x29202a(0x242)]();const _0x5d7f07=_0x29202a(0x245)[_0x29202a(0x20d)](_0x52cb26,_0x86342);this[_0x29202a(0x1ec)](_0x5d7f07,_0x409a79,_0x79af6a);},Game_System['prototype'][_0x33e0a4(0x1ec)]=function(_0x4c0152,_0x4619f1,_0x54c37b){const _0x240061=_0x33e0a4;if(this[_0x240061(0x237)]===undefined)this[_0x240061(0x242)]();this[_0x240061(0x237)][_0x4c0152]={'goods':_0x4619f1['clone'](),'purchaseOnly':_0x54c37b};},VisuMZ[_0x33e0a4(0x1e0)]['Scene_Shop_prepare']=Scene_Shop[_0x33e0a4(0x220)][_0x33e0a4(0x1d2)],Scene_Shop[_0x33e0a4(0x220)][_0x33e0a4(0x1d2)]=function(_0x52b970,_0x521275){const _0x4cbc1c=_0x33e0a4;VisuMZ[_0x4cbc1c(0x1e0)][_0x4cbc1c(0x1df)][_0x4cbc1c(0x201)](this,_0x52b970,_0x521275),$gameTemp[_0x4cbc1c(0x23d)]();},VisuMZ['RandomizeShop'][_0x33e0a4(0x1dc)]=Scene_Base[_0x33e0a4(0x220)][_0x33e0a4(0x217)],Scene_Base['prototype']['terminate']=function(){const _0x29fbec=_0x33e0a4;this[_0x29fbec(0x1ca)]===Scene_Shop&&this[_0x29fbec(0x205)](),VisuMZ['RandomizeShop'][_0x29fbec(0x1dc)][_0x29fbec(0x201)](this);},Scene_Shop[_0x33e0a4(0x220)]['storeShopDataToSystem']=function(){const _0x44180e=_0x33e0a4,_0x4fd8bd=$gameTemp[_0x44180e(0x1cb)]();if(_0x4fd8bd!==''){const _0x364c89=this[_0x44180e(0x227)][_0x44180e(0x1f6)](),_0x12993f=this['_purchaseOnly']||![];$gameSystem[_0x44180e(0x1ec)](_0x4fd8bd,_0x364c89,_0x12993f);}};
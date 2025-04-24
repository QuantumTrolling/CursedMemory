//=============================================================================
// VisuStella MZ - Steal Items
// VisuMZ_3_StealItems.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_StealItems = true;

var VisuMZ = VisuMZ || {};
VisuMZ.StealItems = VisuMZ.StealItems || {};
VisuMZ.StealItems.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.07] [StealItems]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Steal_Items_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Thieves with the ability to steal items from enemies aren't an uncommon
 * class in RPG's. This plugin lets you set up enemies with items that can be
 * stolen from with different types of effects that can occur upon stealing.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create a pool of stealable items for each enemy.
 * * Make skills or items that have stealing properties attached to them.
 * * Some skills/items can be dedicated towards stealing specific types of loot
 *   (Gold, Items, Weapons, and/or Armor).
 * * Have different success rates for skills and items.
 * * Actors can gain trait effects that increase or decrease success rates.
 * * Enemies can gain resistance towards stealing.
 * * JavaScript uses can enable special effects to occur upon successfully
 *   stealing, failing, or emptying out an enemy's loot.
 * * Automatically translate drop items from the database into stealable loot.
 * * If weapons or armors are stolen, they can debuff the enemy and lower their
 *   parameters by their base bonuses.
 * * Use a Snatch effect to directly target a specific item to be stolen from
 *   the enemy.
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
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
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
 * Gold and Item Drop Removals
 * 
 * This is an optional effect that can be enabled from the Plugin Parameters.
 * 
 * If you have enabled Automatic Gold Drop and Item Drop inclusions from the
 * plugin parameters as well as enabled their respective "Loot Removal" plugin
 * parameters, then once the gold/items have been stolen a target enemy, that
 * enemy will not drop the specific gold value or specific item drop during the
 * victory aftermath phase.
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
 * === Steal Action-Related Notetags ===
 * 
 * The following are notetags that are used to place on skills/items that you
 * want to have stealing properties for.
 * 
 * ---
 *
 * <Steal>
 * <Steal type>
 * <Steal type, type, type>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 *
 * ---
 *
 * <Steal type: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties with increased/decreased
 *   multiplicative success rates.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate multiplicatively by.
 * 
 * ---
 *
 * <Steal type: +x%>
 * <Steal type: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties with increased/decreased
 *   additive success rates.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate additively by.
 *
 * ---
 * 
 * <Snatch>
 * <Targeting Steal>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the steal action from targeting a random item from the stealable
 *   types pool to a specific item that the player can select.
 * - If the snatch attempt fails, it will not attempt to steal other items.
 * - Both the <Snatch> and <Targeting Steal> notetags do the same thing.
 * - This does not work with abilities that target multiple enemies, random
 *   enemies, or actors.
 * - Use this in addition to the <Steal>, <Steal type>, or
 *   <Steal type, type, type> notetags as this does not have any steal
 *   properties on its own.
 * 
 * ---
 * 
 * === JavaScript Notetags: Steal Action-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * apply special effects for steal-related skills/items.
 * 
 * ---
 *
 * <JS Steal Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to all steal target types.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Gold Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Gold Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable gold type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Item Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Item Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable item type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Weapon Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Weapon Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable weapon type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Armor Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Armor Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable armor type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS On Steal Success>
 *  code
 *  code
 *  code
 * </JS On Steal Success>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code upon successfully stealing.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 * - The 'item' variable represents the item that was stolen if there is one.
 *   This will return a null value if gold was stolen instead.
 * - The 'gold' variable represents the gold quantity that was stolen if any.
 *   This will return a 0 value if there was no gold stolen.
 *
 * ---
 *
 * <JS On Steal Failure>
 *  code
 *  code
 *  code
 * </JS On Steal Failure>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code upon failing a stealth attempt.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was the theft target.
 *
 * ---
 *
 * <JS On Steal Empty>
 *  code
 *  code
 *  code
 * </JS On Steal Empty>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code if there was nothing to steal.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was the theft target.
 *
 * ---
 * 
 * === Steal Loot Setup-Related Notetags ===
 * 
 * The following notetags are made for enemies and used to set up the loot that
 * can be stolen.
 * 
 * ---
 *
 * <Steal Gold value: x%>
 * 
 * <Steal Item id: x%>
 * <Steal Item name: x%>
 * 
 * <Steal Weapon id: x%>
 * <Steal Weapon name: x%>
 * 
 * <Steal Armor id: x%>
 * <Steal Armor name: x%>
 *
 * - Used for: Enemy Notetags
 * - Sets up droppable loot for the enemy.
 * - When setting up gold loot, replace 'value' with the amount of gold that
 *   will be stolen from this loot entry.
 * - When setting up items, weapons, or armors, replace 'id' with the ID of the
 *   item, weapon, or armor for the loot entry.
 * - When setting up items, weapons, or armors, replace 'name' with the name of
 *   the item, weapon, or armor for the loot entry.
 * - Replace 'x' with a number value representing the base percent chance of
 *   successfully stealing this loot entry.
 * - Insert multiple notetags for multiple loot entries to be stolen.
 *
 * ---
 *
 * <Steal>
 *  Gold value: x%
 * 
 *  Item id: x%
 *  Item name: x%
 * 
 *  Weapon id: x%
 *  Weapon name: x%
 * 
 *  Armor id: x%
 *  Armor name: x%
 * </Steal>
 *
 * - Used for: Enemy Notetags
 * - Sets up a batch setup of droppable loot for the enemy.
 * - When setting up gold loot, replace 'value' with the amount of gold that
 *   will be stolen from this loot entry.
 * - When setting up items, weapons, or armors, replace 'id' with the ID of the
 *   item, weapon, or armor for the loot entry.
 * - When setting up items, weapons, or armors, replace 'name' with the name of
 *   the item, weapon, or armor for the loot entry.
 * - Replace 'x' with a number value representing the base percent chance of
 *   successfully stealing this loot entry.
 * - Insert/remove multiple copies of the loot entries inside the <Steal>
 *   notetags to add more or reduce entries.
 *
 * ---
 * 
 * === Steal Rate Traits-Related Notetags ===
 * 
 * The following notetags are made for trait objects that can alter the
 * success rates of steal skills/items.
 * 
 * ---
 *
 * <Steal Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Alters the steal rate for the stealing actor multiplicatively.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate multiplicatively by.
 * 
 * ---
 *
 * <Steal Rate: +x%>
 * <Steal Rate: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Alters the steal rate for the stealing actor multiplicatively.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate additively by.
 *
 * ---
 *
 * <Steal Resist: +x%>
 * <Steal Resist: -x%>
 *
 * - Used for: Enemy Notetags
 * - Alters the steal resistance for enemies. Higher numbers mean higher steal
 *   resistance.
 * - Replace 'x' with a number representing the percent value to alter the
 *   steal resistance by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Automatic Settings
 * ============================================================================
 *
 * Automatic settings pertaining to the steal mechanics of the game.
 *
 * ---
 *
 * Settings
 * 
 *   Add Gold Drop?:
 *   - Automatically include enemy gold drop into stealable items?
 * 
 *     Success Rate:
 *     - If automatically include gold drop, what is the steal rate?
 *     - Use a number between 0 and 1.
 * 
 *     Loot Removal:
 *     - If using automatic gold, remove the rewards from the enemy gold
 *       when defeated?
 * 
 *   Add Item Drops?:
 *   - Automatically include enemy item drop into stealable items?
 * 
 *     Success Modifier:
 *     - If automatically include item drops, how much do you want to alter
 *       their drop modifiers by?
 * 
 *     Loot Removal:
 *     - If using automatic drops, remove the rewards from the enemy items
 *       when defeated?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * Settings pertaining to the steal-related messages that appear in the Battle
 * Log Window.
 *
 * ---
 *
 * Settings
 * 
 *   Show Messages:
 *   - Show messages regarding stolen items in the Battle Log window?
 * 
 *   Steal Item:
 *   - Message displayed when stealing an item.
 *   - %1 - Item's Name, %2 - Item's Icon
 * 
 *   Steal Gold:
 *   - Message displayed when stealing gold.
 *   - %1 - Gold Name, %2 - Gold Amount
 * 
 *   Steal Fail:
 *   - Message displayed when a steal attempt fails.
 * 
 *   Steal Empty:
 *   - Message displayed when there is nothing to steal.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Special game mechanics related to stealing.
 *
 * ---
 *
 * General
 * 
 *   Equip Debuff:
 *   - When weapons/armors are stolen, decrease the enemy's parameters based
 *     on the weapon/armor parameters?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Bonus Steal %:
 *   - Code used to determine an additive bonus steal rate.
 * 
 *   JS: Steal Resist %:
 *   - Code used to determine an additive steal resistance.
 * 
 *   JS: On Steal Success:
 *   - What kind of code do you want to run when stealing succeeds?
 * 
 *   JS: On Steal Failure:
 *   - What kind of code do you want to run when stealing fails?
 * 
 *   JS: On Steal Empty:
 *   - What kind of code do you want to run when there is nothing to steal?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Popup Settings
 * ============================================================================
 *
 * Popup settings related to stealing.
 *
 * ---
 *
 * Success
 * 
 * Failure
 * 
 * Empty
 * 
 *   Text:
 *   - Text displayed upon stealing an item.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Snatch Settings
 * ============================================================================
 *
 * These are the settings for the effect when used with the <Snatch> notetag.
 * When snatching an item, the player can target a specific item in the enemy's
 * loot to be stolen from. The success rates and lists of items will be visible
 * at the expense of only being able to steal just that item.
 *
 * ---
 *
 * Gold
 * 
 *   Icon:
 *   - Icon used to represent gold.
 *   - Ignore if VisuMZ_0_CoreEngine is present.
 * 
 *   Name Format:
 *   - Name format on how gold is displayed.
 *   - %1 - Icon, %2 - Quantity, %3 - Current Name
 * 
 *   Help Text:
 *   - Text that's displayed in the help window when gold is selected in the
 *     Snatch window.
 *
 * ---
 *
 * Success Rate
 * 
 *   Display Success Rate:
 *   - Display success rates in the Snatch window?
 * 
 *   Already Stolen:
 *   - Text displayed when an item has already been stolen.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Sound Settings
 * ============================================================================
 *
 * Determine the sound effects played related to stealing.
 *
 * ---
 *
 * Successful Gold Steal
 * 
 * Successful Item Steal
 * 
 * Successful Weapon Steal
 * 
 * Successful Armor Steal
 * 
 * Failure
 * 
 * Empty
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
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
 * Version 1.07: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.06: January 13, 2022
 * * Compatibility Update!
 * ** Better compatibility update with Extra Enemy Drops. Update made by Irina.
 * 
 * Version 1.05: July 23, 2021
 * * Bug Fixes!
 * ** Fixed <JS Steal Armor Rate> notetag. It did not work properly.
 * * Documentation Update!
 * ** Added notes for the various <JS Steal Rate> notetags:
 * *** The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 * *** This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * 
 * Version 1.04: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.03: June 4, 2021
 * * Bug Fixes!
 * ** <JS Steal Rate> should now work properly. Fix by Arisu.
 * * Documentation Update!
 * ** Added clarity to <JS Steal Rate> to mention it affects all types.
 * ** Help file updated for new features.
 * * New Features!
 * ** New JS notetags added by Arisu.
 * *** <JS Steal Gold Rate>
 * *** <JS Steal Item Rate>
 * *** <JS Steal Weapon Rate>
 * *** <JS Steal Armor Rate>
 * **** Similar to the <JS Steal Rate> notetag but works only for specific
 *      categories of items.
 * 
 * Version 1.02: April 2, 2021
 * * Feature Update!
 * ** Success rate calculation should no longer be skewed by JavaScript's float
 *    value math quirks. Update made by Yanfly.
 * 
 * Version 1.01: December 11, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00: December 9, 2020
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
 * @param StealItems
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Auto:struct
 * @text Automatic Settings
 * @type struct<Auto>
 * @desc Automatic settings pertaining to the steal mechanics of the game.
 * @default {"AutoGold:eval":"true","GoldRate:num":"0.50","GoldRemoval:eval":"true","AutoItem:eval":"true","ItemRate:num":"1.50","ItemRemoval:eval":"true"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings pertaining to the steal-related messages that appear in the Battle Log Window.
 * @default {"ShowMessages:eval":"true","StealItem:str":"Stole %2%1!","StealGold:str":"Stole %2 \\C[16]%1\\C[0]!","StealFail:str":"Steal attempt unsuccessful!","StealEmpty:str":"Nothing to steal!"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Special game mechanics related to stealing.
 * @default {"General":"","EquipDebuff:eval":"true","JavaScript":"","JsBonusSteal:func":"\"// Declare Variables\\nconst user = this;\\nlet bonusRate = 0;\\n\\n// Calculate Bonus Rate\\nbonusRate = (user.luk / (512 + user.luk)) / 3;\\n\\n// Return Bonus Rate\\nreturn bonusRate;\"","JsStealResist:func":"\"// Declare Variables\\nconst user = this;\\nlet resistRate = 0;\\n\\n// Calculate Resist Rate\\nresistRate = (user.luk / (512 + user.luk)) / 8;\\n\\n// Return Resist Rate\\nreturn resistRate;\"","JsOnStealSuccess:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\"","JsOnStealFail:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\"","JsOnStealEmpty:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\""}
 *
 * @param Popup:struct
 * @text Popup Settings
 * @type struct<Popup>
 * @desc Popup settings related to stealing.
 * @default {"Success":"","SuccessPopupText:str":"STOLEN","SuccessItemName:eval":"true","SuccessTextColor:str":"0","SuccessFlashColor:eval":"[255, 255, 255, 0]","SuccessFlashDuration:num":"60","Failure":"","FailurePopupText:str":"FAILED","FailureTextColor:str":"8","FailureFlashColor:eval":"[255, 255, 255, 0]","FailureFlashDuration:num":"60","Empty":"","EmptyPopupText:str":"EMPTY","EmptyTextColor:str":"8","EmptyFlashColor:eval":"[255, 255, 255, 0]","EmptyFlashDuration:num":"60"}
 *
 * @param Snatch:struct
 * @text Snatch Settings
 * @type struct<Snatch>
 * @desc Settings related to the snatch mechanic.
 * @default {"Gold":"","GoldIcon:num":"314","GoldNameFmt:str":"%1%2\\C[16]%3\\C[0]","GoldHelp:json":"\"Steal gold from this target!\"","Success":"","DisplaySuccess:eval":"true","AlreadyStolen:str":"Stolen"}
 *
 * @param Sound:struct
 * @text Sound Settings
 * @type struct<Sound>
 * @desc Determine the sound effects played related to stealing.
 * @default {"Successful":"","SuccessGold":"","gold_name:str":"Shop2","gold_volume:num":"90","gold_pitch:num":"120","gold_pan:num":"0","SuccessItem":"","item_name:str":"Item1","item_volume:num":"90","item_pitch:num":"120","item_pan:num":"0","SuccessWeapon":"","weapon_name:str":"Equip1","weapon_volume:num":"90","weapon_pitch:num":"120","weapon_pan:num":"0","SuccessArmor":"","armor_name:str":"Equip2","armor_volume:num":"90","armor_pitch:num":"120","armor_pan:num":"0","Failure":"","fail_name:str":"Buzzer2","fail_volume:num":"90","fail_pitch:num":"120","fail_pan:num":"0","Empty":"","empty_name:str":"Evasion1","empty_volume:num":"90","empty_pitch:num":"120","empty_pan:num":"0"}
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
 * Auto Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Auto:
 *
 * @param AutoGold:eval
 * @text Add Gold Drop?
 * @parent Auto
 * @type boolean
 * @on Include
 * @off Don't Include
 * @desc Automatically include enemy gold drop into stealable items?
 * @default true
 *
 * @param GoldRate:num
 * @text Success Rate
 * @parent AutoGold:eval
 * @desc If automatically include gold drop, what is the steal rate?
 * Use a number between 0 and 1.
 * @default 0.50
 *
 * @param GoldRemoval:eval
 * @text Loot Removal
 * @parent AutoGold:eval
 * @type boolean
 * @on Remove
 * @off Keep
 * @desc If using automatic gold, remove the rewards from the
 * enemy gold when defeated?
 * @default true
 *
 * @param AutoItem:eval
 * @text Add Item Drops?
 * @parent Auto
 * @type boolean
 * @on Include
 * @off Don't Include
 * @desc Automatically include enemy item drop into stealable items?
 * @default true
 *
 * @param ItemRate:num
 * @text Success Modifier
 * @parent AutoItem:eval
 * @desc If automatically include item drops, how much do you want
 * to alter their drop modifiers by?
 * @default 1.50
 *
 * @param ItemRemoval:eval
 * @text Loot Removal
 * @parent AutoItem:eval
 * @type boolean
 * @on Remove
 * @off Keep
 * @desc If using automatic drops, remove the rewards from the
 * enemy items when defeated?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param ShowMessages:eval
 * @text Show Messages
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show messages regarding stolen items in the Battle Log window?
 * @default true
 * 
 * @param StealItem:str
 * @text Steal Item
 * @desc Message displayed when stealing an item.
 * %1 - Item's Name, %2 - Item's Icon
 * @default Stole %2%1!
 * 
 * @param StealGold:str
 * @text Steal Gold
 * @desc Message displayed when stealing gold.
 * %1 - Gold Name, %2 - Gold Amount
 * @default Stole %2 \C[16]%1\C[0]!
 * 
 * @param StealFail:str
 * @text Steal Fail
 * @desc Message displayed when a steal attempt fails.
 * @default Steal attempt unsuccessful!
 * 
 * @param StealEmpty:str
 * @text Steal Empty
 * @desc Message displayed when there is nothing to steal.
 * @default Nothing to steal!
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 *
 * @param EquipDebuff:eval
 * @text Equip Debuff
 * @parent General
 * @type boolean
 * @on Debuff
 * @off No Effects
 * @desc When weapons/armors are stolen, decrease the enemy's
 * parameters based on the weapon/armor parameters?
 * @default true
 *
 * @param JavaScript
 *
 * @param JsBonusSteal:func
 * @text JS: Bonus Steal %
 * @parent JavaScript
 * @type note
 * @desc Code used to determine an additive bonus steal rate.
 * @default "// Declare Variables\nconst user = this;\nlet bonusRate = 0;\n\n// Calculate Bonus Rate\nbonusRate = (user.luk / (512 + user.luk)) / 3;\n\n// Return Bonus Rate\nreturn bonusRate;"
 *
 * @param JsStealResist:func
 * @text JS: Steal Resist %
 * @parent JavaScript
 * @type note
 * @desc Code used to determine an additive steal resistance.
 * @default "// Declare Variables\nconst user = this;\nlet resistRate = 0;\n\n// Calculate Resist Rate\nresistRate = (user.luk / (512 + user.luk)) / 8;\n\n// Return Resist Rate\nreturn resistRate;"
 *
 * @param JsOnStealSuccess:func
 * @text JS: On Steal Success
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when stealing succeeds?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 * @param JsOnStealFail:func
 * @text JS: On Steal Failure
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when stealing fails?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 * @param JsOnStealEmpty:func
 * @text JS: On Steal Empty
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when there is nothing to steal?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Popup:
 *
 * @param Success
 *
 * @param SuccessPopupText:str
 * @text Text
 * @parent Success
 * @desc Text displayed upon successfully stealing an item.
 * @default STOLEN
 *
 * @param SuccessItemName:eval
 * @text Show Item Name
 * @parent SuccessPopupText:str
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the name of the item that is stolen, too?
 * @default true
 *
 * @param SuccessTextColor:str
 * @text Text Color
 * @parent Success
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param SuccessFlashColor:eval
 * @text Flash Color
 * @parent Success
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param SuccessFlashDuration:num
 * @text Flash Duration
 * @parent Success
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Failure
 *
 * @param FailurePopupText:str
 * @text Text
 * @parent Failure
 * @desc Text displayed upon failing a steal attempt.
 * @default FAILED
 *
 * @param FailureTextColor:str
 * @text Text Color
 * @parent Failure
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 * @param FailureFlashColor:eval
 * @text Flash Color
 * @parent Failure
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param FailureFlashDuration:num
 * @text Flash Duration
 * @parent Failure
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Empty
 *
 * @param EmptyPopupText:str
 * @text Text
 * @parent Empty
 * @desc Text displayed upon there is nothing to steal.
 * @default EMPTY
 *
 * @param EmptyTextColor:str
 * @text Text Color
 * @parent Empty
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 * @param EmptyFlashColor:eval
 * @text Flash Color
 * @parent Empty
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param EmptyFlashDuration:num
 * @text Flash Duration
 * @parent Empty
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Snatch Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Snatch:
 *
 * @param Gold
 *
 * @param GoldIcon:num
 * @text Icon
 * @parent Gold
 * @desc Icon used to represent gold.
 * Ignore if VisuMZ_0_CoreEngine is present.
 * @default 314
 *
 * @param GoldNameFmt:str
 * @text Name Format
 * @parent Gold
 * @desc Name format on how gold is displayed.
 * %1 - Icon, %2 - Quantity, %3 - Current Name
 * @default %1%2\C[16]%3\C[0]
 *
 * @param GoldHelp:json
 * @text Help Text
 * @type note
 * @parent Gold
 * @desc Text that's displayed in the help window when gold is selected in the Snatch window.
 * @default "Steal gold from this target!"
 *
 * @param Success
 * @text Success Rate
 *
 * @param DisplaySuccess:eval
 * @text Display Success Rate
 * @parent Success
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display success rates in the Snatch window?
 * @default true
 *
 * @param AlreadyStolen:str
 * @text Already Stolen
 * @parent Success
 * @desc Text displayed when an item has already been stolen.
 * @default Stolen
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param Successful
 * 
 * @param SuccessGold
 * @text Gold Steal
 * @parent Successful
 *
 * @param gold_name:str
 * @text Filename
 * @parent SuccessGold
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Shop2
 *
 * @param gold_volume:num
 * @text Volume
 * @parent SuccessGold
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param gold_pitch:num
 * @text Pitch
 * @parent SuccessGold
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param gold_pan:num
 * @text Pan
 * @parent SuccessGold
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessItem
 * @text Item Steal
 * @parent Successful
 *
 * @param item_name:str
 * @text Filename
 * @parent SuccessItem
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Item1
 *
 * @param item_volume:num
 * @text Volume
 * @parent SuccessItem
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param item_pitch:num
 * @text Pitch
 * @parent SuccessItem
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param item_pan:num
 * @text Pan
 * @parent SuccessItem
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessWeapon
 * @text Weapon Steal
 * @parent Successful
 *
 * @param weapon_name:str
 * @text Filename
 * @parent SuccessWeapon
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip1
 *
 * @param weapon_volume:num
 * @text Volume
 * @parent SuccessWeapon
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param weapon_pitch:num
 * @text Pitch
 * @parent SuccessWeapon
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param weapon_pan:num
 * @text Pan
 * @parent SuccessWeapon
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessArmor
 * @text Armor Steal
 * @parent Successful
 *
 * @param armor_name:str
 * @text Filename
 * @parent SuccessArmor
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip2
 *
 * @param armor_volume:num
 * @text Volume
 * @parent SuccessArmor
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param armor_pitch:num
 * @text Pitch
 * @parent SuccessArmor
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param armor_pan:num
 * @text Pan
 * @parent SuccessArmor
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Failure
 *
 * @param fail_name:str
 * @text Filename
 * @parent Failure
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Buzzer2
 *
 * @param fail_volume:num
 * @text Volume
 * @parent Failure
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param fail_pitch:num
 * @text Pitch
 * @parent Failure
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param fail_pan:num
 * @text Pan
 * @parent Failure
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Empty
 *
 * @param empty_name:str
 * @text Filename
 * @parent Empty
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Evasion1
 *
 * @param empty_volume:num
 * @text Volume
 * @parent Empty
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param empty_pitch:num
 * @text Pitch
 * @parent Empty
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param empty_pan:num
 * @text Pan
 * @parent Empty
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
//=============================================================================

const _0xc7dc99=_0x2e0d;(function(_0x1750f2,_0xf77f28){const _0x11054e=_0x2e0d,_0x124d4a=_0x1750f2();while(!![]){try{const _0x5a147c=-parseInt(_0x11054e(0xd6))/0x1+parseInt(_0x11054e(0xa1))/0x2+-parseInt(_0x11054e(0xe2))/0x3+parseInt(_0x11054e(0x130))/0x4*(-parseInt(_0x11054e(0x11e))/0x5)+parseInt(_0x11054e(0x14a))/0x6+parseInt(_0x11054e(0xe9))/0x7+-parseInt(_0x11054e(0x167))/0x8*(-parseInt(_0x11054e(0x8c))/0x9);if(_0x5a147c===_0xf77f28)break;else _0x124d4a['push'](_0x124d4a['shift']());}catch(_0x3c7beb){_0x124d4a['push'](_0x124d4a['shift']());}}}(_0x274d,0xe53ae));var label=_0xc7dc99(0xbb),tier=tier||0x0,dependencies=[_0xc7dc99(0x195)],pluginData=$plugins['filter'](function(_0x228825){const _0xcb97ff=_0xc7dc99;return _0x228825[_0xcb97ff(0x100)]&&_0x228825[_0xcb97ff(0x94)][_0xcb97ff(0x15c)]('['+label+']');})[0x0];VisuMZ[label][_0xc7dc99(0x147)]=VisuMZ[label][_0xc7dc99(0x147)]||{},VisuMZ[_0xc7dc99(0x110)]=function(_0x51d3e1,_0x32cfc8){const _0x1fdb0a=_0xc7dc99;for(const _0x42549a in _0x32cfc8){if(_0x42549a[_0x1fdb0a(0xc7)](/(.*):(.*)/i)){const _0x4b4beb=String(RegExp['$1']),_0x161e6f=String(RegExp['$2'])[_0x1fdb0a(0x168)]()[_0x1fdb0a(0x101)]();let _0x2e4970,_0x530507,_0x546594;switch(_0x161e6f){case _0x1fdb0a(0xce):_0x2e4970=_0x32cfc8[_0x42549a]!==''?Number(_0x32cfc8[_0x42549a]):0x0;break;case _0x1fdb0a(0x11a):_0x530507=_0x32cfc8[_0x42549a]!==''?JSON[_0x1fdb0a(0xc5)](_0x32cfc8[_0x42549a]):[],_0x2e4970=_0x530507[_0x1fdb0a(0x186)](_0x140778=>Number(_0x140778));break;case _0x1fdb0a(0x129):_0x2e4970=_0x32cfc8[_0x42549a]!==''?eval(_0x32cfc8[_0x42549a]):null;break;case _0x1fdb0a(0xa6):_0x530507=_0x32cfc8[_0x42549a]!==''?JSON[_0x1fdb0a(0xc5)](_0x32cfc8[_0x42549a]):[],_0x2e4970=_0x530507[_0x1fdb0a(0x186)](_0x4cbb42=>eval(_0x4cbb42));break;case'JSON':_0x2e4970=_0x32cfc8[_0x42549a]!==''?JSON[_0x1fdb0a(0xc5)](_0x32cfc8[_0x42549a]):'';break;case _0x1fdb0a(0x89):_0x530507=_0x32cfc8[_0x42549a]!==''?JSON['parse'](_0x32cfc8[_0x42549a]):[],_0x2e4970=_0x530507[_0x1fdb0a(0x186)](_0x96db35=>JSON[_0x1fdb0a(0xc5)](_0x96db35));break;case _0x1fdb0a(0xe7):_0x2e4970=_0x32cfc8[_0x42549a]!==''?new Function(JSON[_0x1fdb0a(0xc5)](_0x32cfc8[_0x42549a])):new Function(_0x1fdb0a(0x172));break;case _0x1fdb0a(0x10e):_0x530507=_0x32cfc8[_0x42549a]!==''?JSON['parse'](_0x32cfc8[_0x42549a]):[],_0x2e4970=_0x530507[_0x1fdb0a(0x186)](_0x37cf6f=>new Function(JSON[_0x1fdb0a(0xc5)](_0x37cf6f)));break;case _0x1fdb0a(0xd5):_0x2e4970=_0x32cfc8[_0x42549a]!==''?String(_0x32cfc8[_0x42549a]):'';break;case _0x1fdb0a(0x106):_0x530507=_0x32cfc8[_0x42549a]!==''?JSON['parse'](_0x32cfc8[_0x42549a]):[],_0x2e4970=_0x530507[_0x1fdb0a(0x186)](_0x3f8756=>String(_0x3f8756));break;case _0x1fdb0a(0x15e):_0x546594=_0x32cfc8[_0x42549a]!==''?JSON[_0x1fdb0a(0xc5)](_0x32cfc8[_0x42549a]):{},_0x2e4970=VisuMZ[_0x1fdb0a(0x110)]({},_0x546594);break;case _0x1fdb0a(0x11b):_0x530507=_0x32cfc8[_0x42549a]!==''?JSON[_0x1fdb0a(0xc5)](_0x32cfc8[_0x42549a]):[],_0x2e4970=_0x530507[_0x1fdb0a(0x186)](_0x115039=>VisuMZ[_0x1fdb0a(0x110)]({},JSON[_0x1fdb0a(0xc5)](_0x115039)));break;default:continue;}_0x51d3e1[_0x4b4beb]=_0x2e4970;}}return _0x51d3e1;},(_0x56bf73=>{const _0x40ca63=_0xc7dc99,_0x43588f=_0x56bf73[_0x40ca63(0x18f)];for(const _0x367a70 of dependencies){if(!Imported[_0x367a70]){alert(_0x40ca63(0xfc)['format'](_0x43588f,_0x367a70)),SceneManager[_0x40ca63(0x188)]();break;}}const _0x58fd28=_0x56bf73[_0x40ca63(0x94)];if(_0x58fd28[_0x40ca63(0xc7)](/\[Version[ ](.*?)\]/i)){const _0x4823db=Number(RegExp['$1']);_0x4823db!==VisuMZ[label][_0x40ca63(0x150)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x43588f,_0x4823db)),SceneManager[_0x40ca63(0x188)]());}if(_0x58fd28[_0x40ca63(0xc7)](/\[Tier[ ](\d+)\]/i)){const _0x4291a1=Number(RegExp['$1']);_0x4291a1<tier?(alert(_0x40ca63(0x10f)[_0x40ca63(0xf4)](_0x43588f,_0x4291a1,tier)),SceneManager[_0x40ca63(0x188)]()):tier=Math[_0x40ca63(0xed)](_0x4291a1,tier);}VisuMZ[_0x40ca63(0x110)](VisuMZ[label][_0x40ca63(0x147)],_0x56bf73[_0x40ca63(0xa8)]);})(pluginData),VisuMZ[_0xc7dc99(0xbb)][_0xc7dc99(0x170)]=Scene_Boot[_0xc7dc99(0xd4)]['onDatabaseLoaded'],Scene_Boot[_0xc7dc99(0xd4)][_0xc7dc99(0xec)]=function(){const _0x204130=_0xc7dc99;VisuMZ['StealItems'][_0x204130(0x170)][_0x204130(0xa7)](this),this[_0x204130(0xad)]();},Scene_Boot[_0xc7dc99(0xd4)][_0xc7dc99(0xad)]=function(){const _0x14bd95=_0xc7dc99;if(VisuMZ[_0x14bd95(0xb2)])return;this['process_VisuMZ_StealItems_JS']();},VisuMZ[_0xc7dc99(0xbb)][_0xc7dc99(0x17a)]={'StealAction1':/<STEAL>/i,'StealAction2':/<STEAL[ ](.*)>/gi,'Snatch':/<(?:SNATCH|TARGETING STEAL)>/i,'JsStealRate':/<JS STEAL RATE>\s*([\s\S]*)\s*<\/JS STEAL RATE>/i,'JsStealRateGold':/<JS STEAL GOLD RATE>\s*([\s\S]*)\s*<\/JS STEAL GOLD RATE>/i,'JsStealRateItem':/<JS STEAL ITEM RATE>\s*([\s\S]*)\s*<\/JS STEAL ITEM RATE>/i,'JsStealRateWeapon':/<JS STEAL WEAPON RATE>\s*([\s\S]*)\s*<\/JS STEAL WEAPON RATE>/i,'JsStealRateArmor':/<JS STEAL ARMOR RATE>\s*([\s\S]*)\s*<\/JS STEAL ARMOR RATE>/i,'JsOnStealSuccess':/<JS ON STEAL SUCCESS>\s*([\s\S]*)\s*<\/JS ON STEAL SUCCESS>/i,'JsOnStealFail':/<JS ON STEAL FAILURE>\s*([\s\S]*)\s*<\/JS ON STEAL FAILURE>/i,'JsOnStealNothing':/<JS ON STEAL EMPTY>\s*([\s\S]*)\s*<\/JS ON STEAL EMPTY>/i,'StealableItemSingle':/<STEAL[ ](.*):[ ](.*)([%％])>/gi,'StealableItemBatch':/<STEAL>\s*([\s\S]*)\s*<\/STEAL>/i,'StealRate':/<STEAL RATE:[ ](\d+)([%％])>/i,'StealPlus':/<STEAL RATE:[ ]([\+\-]\d+)([%％])>/i,'StealResist':/<STEAL RESIST:[ ]([\+\-]\d+)([%％])>/i},Scene_Boot[_0xc7dc99(0xd4)][_0xc7dc99(0xf8)]=function(){const _0x1ce2c1=_0xc7dc99,_0x7c407=$dataSkills['concat']($dataItems);for(const _0xb05051 of _0x7c407){if(!_0xb05051)continue;VisuMZ['StealItems'][_0x1ce2c1(0xb8)](_0xb05051);}},VisuMZ[_0xc7dc99(0xbb)][_0xc7dc99(0xe8)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0xc7dc99(0xe8)]=function(_0x28ef2f){const _0x4e772d=_0xc7dc99;VisuMZ[_0x4e772d(0xbb)][_0x4e772d(0xe8)]['call'](this,_0x28ef2f),VisuMZ[_0x4e772d(0xbb)][_0x4e772d(0xb8)](_0x28ef2f);},VisuMZ[_0xc7dc99(0xbb)][_0xc7dc99(0xe3)]=VisuMZ['ParseItemNotetags'],VisuMZ['ParseItemNotetags']=function(_0x5a7ed3){const _0x4edc4b=_0xc7dc99;VisuMZ['StealItems'][_0x4edc4b(0xe3)][_0x4edc4b(0xa7)](this,_0x5a7ed3),VisuMZ[_0x4edc4b(0xbb)][_0x4edc4b(0xb8)](_0x5a7ed3);},VisuMZ[_0xc7dc99(0xbb)][_0xc7dc99(0xb8)]=function(_0x461247){const _0x3e7923=_0xc7dc99,_0x8ea361=VisuMZ[_0x3e7923(0xbb)][_0x3e7923(0x17a)];let _0x5a8866=_0x3e7923(0xf9),_0x5973b9=_0x8ea361[_0x3e7923(0xf9)];VisuMZ[_0x3e7923(0xbb)][_0x3e7923(0xda)](_0x461247,_0x5a8866,_0x5973b9),_0x5a8866=_0x3e7923(0x177),_0x5973b9=_0x8ea361[_0x3e7923(0x177)],VisuMZ[_0x3e7923(0xbb)][_0x3e7923(0xda)](_0x461247,_0x5a8866,_0x5973b9),_0x5a8866=_0x3e7923(0x107),_0x5973b9=_0x8ea361[_0x3e7923(0x107)],VisuMZ[_0x3e7923(0xbb)][_0x3e7923(0xda)](_0x461247,_0x5a8866,_0x5973b9),_0x5a8866=_0x3e7923(0xbf),_0x5973b9=_0x8ea361[_0x3e7923(0xbf)],VisuMZ[_0x3e7923(0xbb)][_0x3e7923(0xda)](_0x461247,_0x5a8866,_0x5973b9),_0x5a8866='JsStealRateArmor',_0x5973b9=_0x8ea361['JsStealRateArmor'],VisuMZ[_0x3e7923(0xbb)][_0x3e7923(0xda)](_0x461247,_0x5a8866,_0x5973b9),_0x5a8866=_0x3e7923(0xc2),_0x5973b9=_0x8ea361[_0x3e7923(0xc2)],VisuMZ[_0x3e7923(0xbb)][_0x3e7923(0x96)](_0x461247,_0x5a8866,_0x5973b9),_0x5a8866=_0x3e7923(0x171),_0x5973b9=_0x8ea361[_0x3e7923(0x171)],VisuMZ[_0x3e7923(0xbb)][_0x3e7923(0x96)](_0x461247,_0x5a8866,_0x5973b9),_0x5a8866=_0x3e7923(0x111),_0x5973b9=_0x8ea361[_0x3e7923(0x111)],VisuMZ[_0x3e7923(0xbb)][_0x3e7923(0x96)](_0x461247,_0x5a8866,_0x5973b9);},VisuMZ[_0xc7dc99(0xbb)]['JS']={},VisuMZ[_0xc7dc99(0xbb)][_0xc7dc99(0xda)]=function(_0x4e305d,_0xa204c9,_0x447b24){const _0x2de900=_0xc7dc99,_0x314e2f=_0x4e305d['note'];if(_0x314e2f['match'](_0x447b24)){const _0x327463=String(RegExp['$1']),_0x51bc0a='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Rate\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x327463),_0x3d9ada=VisuMZ['StealItems'][_0x2de900(0x153)](_0x4e305d,_0xa204c9);VisuMZ[_0x2de900(0xbb)]['JS'][_0x3d9ada]=new Function(_0x51bc0a);}},VisuMZ['StealItems']['createOnStealJS']=function(_0x1545cd,_0x1eccad,_0x1e010e){const _0x356634=_0xc7dc99,_0x32326a=_0x1545cd[_0x356634(0xe0)];if(_0x32326a['match'](_0x1e010e)){const _0x1c3c27=String(RegExp['$1']),_0x13b7c4=_0x356634(0xd9)[_0x356634(0xf4)](_0x1c3c27),_0x2dca39=VisuMZ[_0x356634(0xbb)][_0x356634(0x153)](_0x1545cd,_0x1eccad);VisuMZ[_0x356634(0xbb)]['JS'][_0x2dca39]=new Function(_0x13b7c4);}},VisuMZ[_0xc7dc99(0xbb)][_0xc7dc99(0x153)]=function(_0x148787,_0xf6a24f){const _0x3bb6bb=_0xc7dc99;if(VisuMZ[_0x3bb6bb(0x153)])return VisuMZ[_0x3bb6bb(0x153)](_0x148787,_0xf6a24f);let _0x239a16='';if($dataActors[_0x3bb6bb(0x15c)](_0x148787))_0x239a16='Actor-%1-%2'[_0x3bb6bb(0xf4)](_0x148787['id'],_0xf6a24f);if($dataClasses[_0x3bb6bb(0x15c)](_0x148787))_0x239a16='Class-%1-%2'['format'](_0x148787['id'],_0xf6a24f);if($dataSkills[_0x3bb6bb(0x15c)](_0x148787))_0x239a16=_0x3bb6bb(0xd8)[_0x3bb6bb(0xf4)](_0x148787['id'],_0xf6a24f);if($dataItems[_0x3bb6bb(0x15c)](_0x148787))_0x239a16='Item-%1-%2'[_0x3bb6bb(0xf4)](_0x148787['id'],_0xf6a24f);if($dataWeapons[_0x3bb6bb(0x15c)](_0x148787))_0x239a16=_0x3bb6bb(0x17d)[_0x3bb6bb(0xf4)](_0x148787['id'],_0xf6a24f);if($dataArmors[_0x3bb6bb(0x15c)](_0x148787))_0x239a16='Armor-%1-%2'[_0x3bb6bb(0xf4)](_0x148787['id'],_0xf6a24f);if($dataEnemies[_0x3bb6bb(0x15c)](_0x148787))_0x239a16='Enemy-%1-%2'[_0x3bb6bb(0xf4)](_0x148787['id'],_0xf6a24f);if($dataStates['includes'](_0x148787))_0x239a16=_0x3bb6bb(0x118)['format'](_0x148787['id'],_0xf6a24f);return _0x239a16;},DataManager['getItemIdWithName']=function(_0x525cad){const _0x3d3732=_0xc7dc99;_0x525cad=_0x525cad['toUpperCase']()['trim'](),this[_0x3d3732(0xcf)]=this[_0x3d3732(0xcf)]||{};if(this[_0x3d3732(0xcf)][_0x525cad])return this[_0x3d3732(0xcf)][_0x525cad];for(const _0x313505 of $dataItems){if(!_0x313505)continue;this[_0x3d3732(0xcf)][_0x313505['name'][_0x3d3732(0x168)]()[_0x3d3732(0x101)]()]=_0x313505['id'];}return this[_0x3d3732(0xcf)][_0x525cad]||0x0;},DataManager[_0xc7dc99(0x114)]=function(_0x131589){const _0x29cb65=_0xc7dc99;_0x131589=_0x131589['toUpperCase']()[_0x29cb65(0x101)](),this[_0x29cb65(0x105)]=this[_0x29cb65(0x105)]||{};if(this[_0x29cb65(0x105)][_0x131589])return this['_weaponIDs'][_0x131589];for(const _0x462acd of $dataWeapons){if(!_0x462acd)continue;this['_weaponIDs'][_0x462acd[_0x29cb65(0x18f)]['toUpperCase']()[_0x29cb65(0x101)]()]=_0x462acd['id'];}return this['_weaponIDs'][_0x131589]||0x0;},DataManager[_0xc7dc99(0xa2)]=function(_0x55c483){const _0x337b05=_0xc7dc99;_0x55c483=_0x55c483[_0x337b05(0x168)]()[_0x337b05(0x101)](),this['_armorIDs']=this[_0x337b05(0xb9)]||{};if(this['_armorIDs'][_0x55c483])return this['_armorIDs'][_0x55c483];for(const _0x3dfd2f of $dataArmors){if(!_0x3dfd2f)continue;this[_0x337b05(0xb9)][_0x3dfd2f['name']['toUpperCase']()[_0x337b05(0x101)]()]=_0x3dfd2f['id'];}return this['_armorIDs'][_0x55c483]||0x0;},ImageManager[_0xc7dc99(0x181)]=Imported['VisuMZ_0_CoreEngine']?VisuMZ[_0xc7dc99(0xab)]['Settings'][_0xc7dc99(0xc3)][_0xc7dc99(0xdb)]:VisuMZ['StealItems'][_0xc7dc99(0x147)][_0xc7dc99(0x156)][_0xc7dc99(0xdb)],TextManager[_0xc7dc99(0x18b)]=VisuMZ[_0xc7dc99(0xbb)][_0xc7dc99(0x147)][_0xc7dc99(0x156)][_0xc7dc99(0x97)],TextManager[_0xc7dc99(0xff)]=VisuMZ['StealItems'][_0xc7dc99(0x147)]['Snatch']['GoldHelp'],TextManager[_0xc7dc99(0x162)]=VisuMZ[_0xc7dc99(0xbb)][_0xc7dc99(0x147)]['Snatch'][_0xc7dc99(0x137)],VisuMZ[_0xc7dc99(0xbb)][_0xc7dc99(0x8f)]=Game_Action[_0xc7dc99(0xd4)][_0xc7dc99(0x103)],Game_Action[_0xc7dc99(0xd4)][_0xc7dc99(0x103)]=function(_0x46903d){const _0x5c2635=_0xc7dc99;VisuMZ[_0x5c2635(0xbb)][_0x5c2635(0x8f)][_0x5c2635(0xa7)](this,_0x46903d),this[_0x5c2635(0x140)](_0x46903d);},Game_Action[_0xc7dc99(0xd4)]['startStealItemsUserEffect']=function(_0x22e5c3){const _0x18cea7=_0xc7dc99;if(!this[_0x18cea7(0x175)]())return;if(!_0x22e5c3[_0x18cea7(0x15d)]())return;if(this[_0x18cea7(0xdf)]()[_0x18cea7(0x15d)]())return;const _0x520bb7=VisuMZ[_0x18cea7(0xbb)][_0x18cea7(0xb3)](this,_0x22e5c3);if(_0x520bb7[_0x18cea7(0x15a)][_0x18cea7(0x10c)]<=0x0)return;const _0x441b4a=_0x22e5c3['getStealableItems']();if(_0x441b4a[_0x18cea7(0x10c)]<=0x0)return;let _0x342f69=[];this[_0x18cea7(0xd7)]()?_0x342f69=this[_0x18cea7(0x14e)](_0x22e5c3):_0x342f69=_0x441b4a[_0x18cea7(0xfb)](_0x2f2278=>{const _0x96eedc=_0x18cea7;return _0x520bb7[_0x96eedc(0x15a)][_0x96eedc(0x15c)](_0x2f2278[_0x96eedc(0x9a)]);});_0x342f69=_0x342f69[_0x18cea7(0xfb)](_0x3b04d9=>{const _0xef16a5=_0x18cea7;return!_0x3b04d9[_0xef16a5(0xee)];});if(_0x342f69[_0x18cea7(0x10c)]<=0x0)return this[_0x18cea7(0xd1)](_0x22e5c3);this['processStealItemsAttempt'](_0x22e5c3,_0x520bb7,_0x342f69);},VisuMZ[_0xc7dc99(0xbb)][_0xc7dc99(0xb3)]=function(_0x1797ee,_0x43f4da){const _0x1e01b0=_0xc7dc99,_0x38420f=VisuMZ[_0x1e01b0(0xbb)][_0x1e01b0(0x17a)],_0x558015=_0x1797ee['item']()[_0x1e01b0(0xe0)];let _0x443780=[],_0x58b8ec={'all':_0x1797ee[_0x1e01b0(0xdf)]()[_0x1e01b0(0xba)](),'gold':0x1,'item':0x1,'weapon':0x1,'armor':0x1},_0x49673e={'all':_0x1797ee[_0x1e01b0(0xdf)]()['stealPlus']()-_0x43f4da[_0x1e01b0(0xb6)](),'gold':0x0,'item':0x0,'weapon':0x0,'armor':0x0};_0x558015['match'](_0x38420f[_0x1e01b0(0x127)])&&(_0x443780=['GOLD',_0x1e01b0(0xf1),'WEAPON','ARMOR']);const _0x1a566c=_0x558015[_0x1e01b0(0xc7)](_0x38420f[_0x1e01b0(0xca)]);if(_0x1a566c)for(const _0x49a520 of _0x1a566c){if(!_0x49a520)continue;if(_0x49a520[_0x1e01b0(0xc7)](/ALL/i)){_0x443780=[_0x1e01b0(0x14d),'ITEM',_0x1e01b0(0x17c),_0x1e01b0(0x12b)];if(_0x49a520[_0x1e01b0(0xc7)](/([\+\-]\d+)([%％])/i))_0x49673e[_0x1e01b0(0xd2)]+=Number(RegExp['$1'])*0.01;else _0x49a520[_0x1e01b0(0xc7)](/(\d+)([%％])/i)&&(_0x58b8ec[_0x1e01b0(0xd2)]*=Number(RegExp['$1'])*0.01);}if(_0x49a520['match'](/GOLD/i)){_0x443780[_0x1e01b0(0x93)](_0x1e01b0(0x14d));if(_0x49a520['match'](/([\+\-]\d+)([%％])/i))_0x49673e[_0x1e01b0(0x125)]+=Number(RegExp['$1'])*0.01;else _0x49a520[_0x1e01b0(0xc7)](/(\d+)([%％])/i)&&(_0x58b8ec[_0x1e01b0(0x125)]*=Number(RegExp['$1'])*0.01);}if(_0x49a520[_0x1e01b0(0xc7)](/ITEM/i)){_0x443780['push']('ITEM');if(_0x49a520[_0x1e01b0(0xc7)](/([\+\-]\d+)([%％])/i))_0x49673e[_0x1e01b0(0x175)]+=Number(RegExp['$1'])*0.01;else _0x49a520['match'](/(\d+)([%％])/i)&&(_0x58b8ec[_0x1e01b0(0x175)]*=Number(RegExp['$1'])*0.01);}if(_0x49a520[_0x1e01b0(0xc7)](/WEAPON/i)){_0x443780[_0x1e01b0(0x93)]('WEAPON');if(_0x49a520[_0x1e01b0(0xc7)](/([\+\-]\d+)([%％])/i))_0x49673e[_0x1e01b0(0x8e)]+=Number(RegExp['$1'])*0.01;else _0x49a520[_0x1e01b0(0xc7)](/(\d+)([%％])/i)&&(_0x58b8ec[_0x1e01b0(0x8e)]*=Number(RegExp['$1'])*0.01);}if(_0x49a520['match'](/ARMOR/i)){_0x443780[_0x1e01b0(0x93)]('ARMOR');if(_0x49a520[_0x1e01b0(0xc7)](/([\+\-]\d+)([%％])/i))_0x49673e[_0x1e01b0(0x192)]+=Number(RegExp['$1'])*0.01;else _0x49a520[_0x1e01b0(0xc7)](/(\d+)([%％])/i)&&(_0x58b8ec[_0x1e01b0(0x192)]*=Number(RegExp['$1'])*0.01);}}let _0x59c9a3=VisuMZ[_0x1e01b0(0xbb)][_0x1e01b0(0x153)](_0x1797ee[_0x1e01b0(0x175)](),'JsStealRate');return VisuMZ[_0x1e01b0(0xbb)]['JS'][_0x59c9a3]&&(_0x58b8ec['all']=VisuMZ[_0x1e01b0(0xbb)]['JS'][_0x59c9a3][_0x1e01b0(0xa7)](_0x1797ee,_0x1797ee['subject'](),_0x43f4da,_0x58b8ec[_0x1e01b0(0xd2)])),_0x59c9a3=VisuMZ['StealItems'][_0x1e01b0(0x153)](_0x1797ee[_0x1e01b0(0x175)](),'JsStealRateGold'),VisuMZ[_0x1e01b0(0xbb)]['JS'][_0x59c9a3]&&(_0x58b8ec[_0x1e01b0(0x125)]=VisuMZ[_0x1e01b0(0xbb)]['JS'][_0x59c9a3][_0x1e01b0(0xa7)](_0x1797ee,_0x1797ee['subject'](),_0x43f4da,_0x58b8ec['gold'])),_0x59c9a3=VisuMZ[_0x1e01b0(0xbb)][_0x1e01b0(0x153)](_0x1797ee[_0x1e01b0(0x175)](),_0x1e01b0(0x107)),VisuMZ[_0x1e01b0(0xbb)]['JS'][_0x59c9a3]&&(_0x58b8ec[_0x1e01b0(0x175)]=VisuMZ[_0x1e01b0(0xbb)]['JS'][_0x59c9a3][_0x1e01b0(0xa7)](_0x1797ee,_0x1797ee[_0x1e01b0(0xdf)](),_0x43f4da,_0x58b8ec['item'])),_0x59c9a3=VisuMZ[_0x1e01b0(0xbb)][_0x1e01b0(0x153)](_0x1797ee['item'](),_0x1e01b0(0xbf)),VisuMZ[_0x1e01b0(0xbb)]['JS'][_0x59c9a3]&&(_0x58b8ec[_0x1e01b0(0x8e)]=VisuMZ[_0x1e01b0(0xbb)]['JS'][_0x59c9a3][_0x1e01b0(0xa7)](_0x1797ee,_0x1797ee[_0x1e01b0(0xdf)](),_0x43f4da,_0x58b8ec[_0x1e01b0(0x8e)])),_0x59c9a3=VisuMZ[_0x1e01b0(0xbb)]['createKeyJS'](_0x1797ee[_0x1e01b0(0x175)](),_0x1e01b0(0x176)),VisuMZ[_0x1e01b0(0xbb)]['JS'][_0x59c9a3]&&(_0x58b8ec[_0x1e01b0(0x192)]=VisuMZ[_0x1e01b0(0xbb)]['JS'][_0x59c9a3][_0x1e01b0(0xa7)](_0x1797ee,_0x1797ee['subject'](),_0x43f4da,_0x58b8ec[_0x1e01b0(0x192)])),{'types':_0x443780,'rate':_0x58b8ec,'plus':_0x49673e};},VisuMZ[_0xc7dc99(0xbb)][_0xc7dc99(0x194)]=function(_0x39ae8b){const _0x265edf=_0xc7dc99;var _0x23ea90,_0x5a8ad5,_0x5646f4;for(_0x5646f4=_0x39ae8b[_0x265edf(0x10c)]-0x1;_0x5646f4>0x0;_0x5646f4--){_0x23ea90=Math[_0x265edf(0x12d)](Math['random']()*(_0x5646f4+0x1)),_0x5a8ad5=_0x39ae8b[_0x5646f4],_0x39ae8b[_0x5646f4]=_0x39ae8b[_0x23ea90],_0x39ae8b[_0x23ea90]=_0x5a8ad5;}return _0x39ae8b;},Game_Action[_0xc7dc99(0xd4)]['processStealItemsAttempt']=function(_0x57558a,_0x1a02ac,_0x496290){const _0x1cebac=_0xc7dc99;VisuMZ['StealItems'][_0x1cebac(0x194)](_0x496290),this[_0x1cebac(0x17e)](_0x57558a);for(const _0x4fea58 of _0x496290){if(!_0x4fea58)continue;let _0x3fd621=_0x1a02ac['rate'][_0x1cebac(0xd2)]*_0x4fea58[_0x1cebac(0x117)],_0x5a9502=_0x1a02ac[_0x1cebac(0x182)]['all'];_0x3fd621*=_0x1a02ac[_0x1cebac(0x117)][_0x4fea58[_0x1cebac(0x9a)][_0x1cebac(0x15b)]()],_0x5a9502+=_0x1a02ac[_0x1cebac(0x182)][_0x4fea58[_0x1cebac(0x9a)]['toLowerCase']()];const _0x3dc65e=_0x3fd621+_0x5a9502;if(Math[_0x1cebac(0x14c)]()<_0x3dc65e)return this[_0x1cebac(0x16e)](_0x57558a,_0x4fea58);}this['processStealItemsFailure'](_0x57558a);},Game_Action[_0xc7dc99(0xd4)]['isSnatchEffect']=function(){const _0x278a8c=_0xc7dc99;if(!this[_0x278a8c(0x138)]())return![];if(!this[_0x278a8c(0x113)]())return![];if(!this['needsSelection']())return![];const _0x4b5d2e=VisuMZ['StealItems']['RegExp'],_0x165025=this['item']()[_0x278a8c(0xe0)];return _0x165025[_0x278a8c(0xc7)](_0x4b5d2e[_0x278a8c(0x156)])&&(_0x165025[_0x278a8c(0xc7)](_0x4b5d2e[_0x278a8c(0x127)])||_0x165025[_0x278a8c(0xc7)](_0x4b5d2e[_0x278a8c(0xca)]));},Game_Action['prototype']['registerSnatchTarget']=function(_0x34fa8f,_0x17ae92){const _0x26c2d4=_0xc7dc99;this[_0x26c2d4(0xf6)]=_0x34fa8f[_0x26c2d4(0x9b)]();const _0xa523d5=_0x34fa8f[_0x26c2d4(0x13b)]();this[_0x26c2d4(0xfd)]=_0xa523d5['indexOf'](_0x17ae92);},Game_Action[_0xc7dc99(0xd4)]['getSnatchTarget']=function(_0x359dda){const _0x39fff8=_0xc7dc99;if(_0x359dda[_0x39fff8(0x9b)]()!==this[_0x39fff8(0xf6)])return[];this['_snatchItemIndex']=this[_0x39fff8(0xfd)]||0x0;const _0x560cf4=_0x359dda['getStealableItems']();return[_0x560cf4[this['_snatchItemIndex']]];},Game_Action[_0xc7dc99(0xd4)][_0xc7dc99(0x16e)]=function(_0x16548,_0x239dc1){const _0x5dbe2f=_0xc7dc99;_0x239dc1[_0x5dbe2f(0xee)]=!![],this[_0x5dbe2f(0x116)](_0x16548,_0x239dc1),this[_0x5dbe2f(0xa0)](_0x239dc1),this[_0x5dbe2f(0xdc)](_0x16548,_0x239dc1),this[_0x5dbe2f(0x180)](_0x16548,_0x239dc1),this[_0x5dbe2f(0x133)](_0x16548,_0x239dc1);},Game_Action[_0xc7dc99(0xd4)][_0xc7dc99(0x116)]=function(_0x3385e4,_0x123de0){const _0x7a1a20=_0xc7dc99,_0x45e53c=VisuMZ['StealItems'][_0x7a1a20(0x147)][_0x7a1a20(0xfa)];let _0x27acb8=_0x45e53c['StealItem'],_0x3ef14e='';if(_0x123de0[_0x7a1a20(0x9a)]===_0x7a1a20(0x14d)){$gameParty['gainGold'](_0x123de0['id']);if(Imported[_0x7a1a20(0xa3)]){const _0x1722d1=Window_Base[_0x7a1a20(0xb7)],_0x197a10=VisuMZ[_0x7a1a20(0x166)][_0x7a1a20(0xf7)](_0x123de0['id'],_0x1722d1,![]);_0x3ef14e=_0x27acb8['format'](_0x197a10,'');}else _0x27acb8=_0x45e53c[_0x7a1a20(0xc1)],_0x3ef14e=_0x27acb8['format'](TextManager[_0x7a1a20(0xef)],_0x123de0['id']);if(Imported['VisuMZ_4_ExtraEnemyDrops']){const _0x418608=VisuMZ[_0x7a1a20(0xbb)][_0x7a1a20(0x147)][_0x7a1a20(0x13d)];_0x418608[_0x7a1a20(0xf2)]&&_0x418608[_0x7a1a20(0xe1)]&&(_0x3385e4['_visualDrops']=_0x3385e4[_0x7a1a20(0x8a)]||{},_0x3385e4[_0x7a1a20(0x8a)]['gold']=0x0);}}else{if(_0x123de0[_0x7a1a20(0x9a)]===_0x7a1a20(0xf1)){const _0x55e51e=$dataItems[_0x123de0['id']];if(!_0x55e51e)return;$gameParty[_0x7a1a20(0x9f)](_0x55e51e,0x1);const _0xb2ab07='\x5cI[%1]'['format'](_0x55e51e['iconIndex']);_0x3ef14e=_0x27acb8[_0x7a1a20(0xf4)](_0x55e51e[_0x7a1a20(0x18f)],_0xb2ab07);}else{if(_0x123de0[_0x7a1a20(0x9a)]==='WEAPON'){const _0x118abd=$dataWeapons[_0x123de0['id']];if(!_0x118abd)return;$gameParty['gainItem'](_0x118abd,0x1);const _0x562407='\x5cI[%1]'['format'](_0x118abd[_0x7a1a20(0x16b)]);_0x3ef14e=_0x27acb8['format'](_0x118abd['name'],_0x562407);}else{if(_0x123de0['type']===_0x7a1a20(0x12b)){const _0x492f4c=$dataArmors[_0x123de0['id']];if(!_0x492f4c)return;$gameParty[_0x7a1a20(0x9f)](_0x492f4c,0x1);const _0x7387e5=_0x7a1a20(0x18a)[_0x7a1a20(0xf4)](_0x492f4c[_0x7a1a20(0x16b)]);_0x3ef14e=_0x27acb8[_0x7a1a20(0xf4)](_0x492f4c[_0x7a1a20(0x18f)],_0x7387e5);}}}}if(_0x45e53c[_0x7a1a20(0xeb)]){const _0xca023e=SceneManager['_scene'][_0x7a1a20(0x109)];if(_0xca023e&&_0x3ef14e!=='')_0xca023e[_0x7a1a20(0x148)](_0x3ef14e);}},Game_Action[_0xc7dc99(0xd4)][_0xc7dc99(0xa0)]=function(_0x3e679f){const _0x1ee0db=_0xc7dc99,_0x5d3cdd=VisuMZ['StealItems'][_0x1ee0db(0x147)][_0x1ee0db(0x187)];if(!_0x5d3cdd)return;const _0x1c7248=_0x3e679f['type'][_0x1ee0db(0x15b)]()['trim'](),_0x29f9ef={'name':_0x5d3cdd[_0x1ee0db(0x98)[_0x1ee0db(0xf4)](_0x1c7248)]||'','volume':_0x5d3cdd[_0x1ee0db(0x124)[_0x1ee0db(0xf4)](_0x1c7248)]||0x0,'pitch':_0x5d3cdd[_0x1ee0db(0x13c)['format'](_0x1c7248)]||0x0,'pan':_0x5d3cdd['%1_pan'[_0x1ee0db(0xf4)](_0x1c7248)]||0x0};if(_0x29f9ef[_0x1ee0db(0x18f)]!=='')AudioManager[_0x1ee0db(0x122)](_0x29f9ef);},Game_Action[_0xc7dc99(0xd4)][_0xc7dc99(0xdc)]=function(_0x55ca4e,_0x4f7364){const _0x5f291b=_0xc7dc99;if(!_0x4f7364)return;if(!_0x55ca4e)return;const _0x1547ae=VisuMZ[_0x5f291b(0xbb)][_0x5f291b(0x147)][_0x5f291b(0x196)];if(!_0x1547ae)return;if(_0x1547ae['SuccessPopupText']==='')return;const _0x363f75=_0x1547ae['SuccessPopupText'],_0x241de9={'textColor':_0x1547ae[_0x5f291b(0x12c)]||0x0,'flashColor':_0x1547ae[_0x5f291b(0x159)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x1547ae[_0x5f291b(0xaa)]||0x3c};_0x55ca4e['setupTextPopup'](_0x363f75,_0x241de9);if(_0x1547ae[_0x5f291b(0x14f)]&&_0x4f7364['type']!==_0x5f291b(0x14d)){let _0x41a937=null;if(_0x4f7364['type']===_0x5f291b(0xf1))_0x41a937=$dataItems[_0x4f7364['id']];else{if(_0x4f7364['type']===_0x5f291b(0x17c))_0x41a937=$dataWeapons[_0x4f7364['id']];else _0x4f7364[_0x5f291b(0x9a)]==='ARMOR'&&(_0x41a937=$dataArmors[_0x4f7364['id']]);}_0x41a937&&_0x55ca4e[_0x5f291b(0x15f)](_0x41a937[_0x5f291b(0x16b)],_0x41a937[_0x5f291b(0x18f)],_0x241de9);}},Game_Action[_0xc7dc99(0xd4)][_0xc7dc99(0x180)]=function(_0x2c47df,_0x3a1ef3){const _0x45f734=_0xc7dc99;if(!_0x2c47df)return;const _0x3794b9=VisuMZ[_0x45f734(0xbb)]['Settings']['Mechanics'];if(!_0x3794b9)return;if(!_0x3794b9[_0x45f734(0x119)])return;if(![_0x45f734(0x17c),_0x45f734(0x12b)][_0x45f734(0x15c)](_0x3a1ef3['type']))return;let _0x2e6743=null;if(_0x3a1ef3[_0x45f734(0x9a)]==='WEAPON')_0x2e6743=$dataWeapons[_0x3a1ef3['id']];else _0x3a1ef3[_0x45f734(0x9a)]===_0x45f734(0x12b)&&(_0x2e6743=$dataArmors[_0x3a1ef3['id']]);if(!_0x2e6743)return;for(let _0x4bcf00=0x0;_0x4bcf00<0x8;_0x4bcf00++){const _0x53d8e2=_0x2e6743['params'][_0x4bcf00];_0x2c47df[_0x45f734(0x144)](_0x4bcf00,-_0x53d8e2);}},Game_Action[_0xc7dc99(0xd4)][_0xc7dc99(0x133)]=function(_0x466541,_0x460305){const _0x4d0607=_0xc7dc99;if(!_0x466541)return;let _0x46c078=null,_0x5a7ad4=0x0;if(_0x460305[_0x4d0607(0x9a)]==='GOLD')_0x5a7ad4=_0x460305['id'];else{if(_0x460305['type']===_0x4d0607(0xf1))_0x46c078=$dataItems[_0x460305['id']];else{if(_0x460305[_0x4d0607(0x9a)]===_0x4d0607(0x17c))_0x46c078=$dataWeapons[_0x460305['id']];else _0x460305[_0x4d0607(0x9a)]==='ARMOR'&&(_0x46c078=$dataArmors[_0x460305['id']]);}}const _0x48344e=VisuMZ[_0x4d0607(0xbb)][_0x4d0607(0x147)][_0x4d0607(0x13a)];_0x48344e&&_0x48344e['JsOnStealSuccess']&&_0x48344e[_0x4d0607(0xc2)][_0x4d0607(0xa7)](this,this['subject'](),_0x466541,_0x46c078,_0x5a7ad4);const _0x7496e1=VisuMZ[_0x4d0607(0xbb)]['createKeyJS'](this[_0x4d0607(0x175)](),_0x4d0607(0xc2));VisuMZ[_0x4d0607(0xbb)]['JS'][_0x7496e1]&&VisuMZ['StealItems']['JS'][_0x7496e1][_0x4d0607(0xa7)](this,this[_0x4d0607(0xdf)](),_0x466541,_0x46c078,_0x5a7ad4);},Game_Action['prototype']['processStealItemsFailure']=function(_0x2625f1){const _0x184f30=_0xc7dc99;this[_0x184f30(0x9d)](_0x2625f1),this[_0x184f30(0xe4)](),this[_0x184f30(0xbe)](_0x2625f1),this[_0x184f30(0x112)](_0x2625f1);},Game_Action[_0xc7dc99(0xd4)][_0xc7dc99(0x9d)]=function(_0x2d066c){const _0x35dc85=_0xc7dc99,_0x3dc65f=VisuMZ[_0x35dc85(0xbb)][_0x35dc85(0x147)][_0x35dc85(0xfa)];if(_0x3dc65f['ShowMessages']){const _0x9b027=_0x3dc65f['StealFail'],_0x30489c=SceneManager[_0x35dc85(0x10b)][_0x35dc85(0x109)];if(_0x30489c&&_0x9b027!=='')_0x30489c['addStealText'](_0x9b027);}},Game_Action[_0xc7dc99(0xd4)][_0xc7dc99(0xe4)]=function(){const _0x29674d=_0xc7dc99,_0x42e334=VisuMZ['StealItems'][_0x29674d(0x147)][_0x29674d(0x187)];if(!_0x42e334)return;const _0x2b1242=_0x29674d(0x108),_0x438021={'name':_0x42e334[_0x29674d(0x98)[_0x29674d(0xf4)](_0x2b1242)]||'','volume':_0x42e334['%1_volume'['format'](_0x2b1242)]||0x0,'pitch':_0x42e334[_0x29674d(0x13c)[_0x29674d(0xf4)](_0x2b1242)]||0x0,'pan':_0x42e334[_0x29674d(0x11d)['format'](_0x2b1242)]||0x0};if(_0x438021[_0x29674d(0x18f)]!=='')AudioManager[_0x29674d(0x122)](_0x438021);},Game_Action['prototype'][_0xc7dc99(0xbe)]=function(_0x257add){const _0x2a0762=_0xc7dc99;if(!_0x257add)return;const _0xc5d3f3=VisuMZ[_0x2a0762(0xbb)]['Settings'][_0x2a0762(0x196)];if(!_0xc5d3f3)return;if(_0xc5d3f3[_0x2a0762(0xb4)]==='')return;const _0x2c3800=_0xc5d3f3['FailurePopupText'],_0x25eb44={'textColor':_0xc5d3f3[_0x2a0762(0x115)]||0x0,'flashColor':_0xc5d3f3['FailureFlashColor']||[0x0,0x0,0x0,0x0],'flashDuration':_0xc5d3f3[_0x2a0762(0x11f)]||0x3c};_0x257add['setupTextPopup'](_0x2c3800,_0x25eb44);},Game_Action['prototype'][_0xc7dc99(0x112)]=function(_0x1326cc){const _0x174ae7=_0xc7dc99;if(!_0x1326cc)return;const _0x4e4b2f=VisuMZ[_0x174ae7(0xbb)][_0x174ae7(0x147)][_0x174ae7(0x13a)];_0x4e4b2f&&_0x4e4b2f[_0x174ae7(0x171)]&&_0x4e4b2f[_0x174ae7(0x171)][_0x174ae7(0xa7)](this,this[_0x174ae7(0xdf)](),_0x1326cc);const _0x2948a1=VisuMZ[_0x174ae7(0xbb)][_0x174ae7(0x153)](this[_0x174ae7(0x175)](),_0x174ae7(0x171));VisuMZ[_0x174ae7(0xbb)]['JS'][_0x2948a1]&&VisuMZ['StealItems']['JS'][_0x2948a1]['call'](this,this[_0x174ae7(0xdf)](),_0x1326cc);},Game_Action[_0xc7dc99(0xd4)][_0xc7dc99(0xd1)]=function(_0x3df1f0){const _0x57b511=_0xc7dc99;this[_0x57b511(0x123)](_0x3df1f0),this[_0x57b511(0x12e)](),this[_0x57b511(0x128)](_0x3df1f0),this[_0x57b511(0x18e)](_0x3df1f0);},Game_Action[_0xc7dc99(0xd4)][_0xc7dc99(0x123)]=function(_0x4afae6){const _0x3e2035=_0xc7dc99,_0x305cad=VisuMZ[_0x3e2035(0xbb)][_0x3e2035(0x147)]['BattleLog'];if(_0x305cad['ShowMessages']){const _0x4614bf=_0x305cad['StealEmpty'],_0x3e5c87=SceneManager['_scene'][_0x3e2035(0x109)];if(_0x3e5c87&&_0x4614bf!=='')_0x3e5c87['addStealText'](_0x4614bf);}},Game_Action[_0xc7dc99(0xd4)][_0xc7dc99(0x12e)]=function(){const _0x1a72f5=_0xc7dc99,_0x19fa38=VisuMZ[_0x1a72f5(0xbb)][_0x1a72f5(0x147)][_0x1a72f5(0x187)];if(!_0x19fa38)return;const _0x4f5348='empty',_0x2a03c8={'name':_0x19fa38[_0x1a72f5(0x98)[_0x1a72f5(0xf4)](_0x4f5348)]||'','volume':_0x19fa38[_0x1a72f5(0x124)['format'](_0x4f5348)]||0x0,'pitch':_0x19fa38['%1_pitch'['format'](_0x4f5348)]||0x0,'pan':_0x19fa38['%1_pan'[_0x1a72f5(0xf4)](_0x4f5348)]||0x0};if(_0x2a03c8[_0x1a72f5(0x18f)]!=='')AudioManager['playSe'](_0x2a03c8);},Game_Action[_0xc7dc99(0xd4)][_0xc7dc99(0x128)]=function(_0x26e7a1){const _0x427b5f=_0xc7dc99;if(!_0x26e7a1)return;const _0x342a6c=VisuMZ[_0x427b5f(0xbb)]['Settings'][_0x427b5f(0x196)];if(!_0x342a6c)return;if(_0x342a6c['FailurePopupText']==='')return;const _0x11e71f=_0x342a6c[_0x427b5f(0x18c)],_0x30b4d4={'textColor':_0x342a6c['EmptyTextColor']||0x0,'flashColor':_0x342a6c[_0x427b5f(0x141)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x342a6c[_0x427b5f(0x143)]||0x3c};_0x26e7a1[_0x427b5f(0x16c)](_0x11e71f,_0x30b4d4);},Game_Action['prototype'][_0xc7dc99(0x18e)]=function(_0x32d813){const _0x9b44d3=_0xc7dc99;if(!_0x32d813)return;const _0x5e5363=VisuMZ['StealItems']['Settings'][_0x9b44d3(0x13a)];_0x5e5363&&_0x5e5363['JsOnStealEmpty']&&_0x5e5363[_0x9b44d3(0x92)][_0x9b44d3(0xa7)](this,this[_0x9b44d3(0xdf)](),_0x32d813);const _0x47da50=VisuMZ[_0x9b44d3(0xbb)][_0x9b44d3(0x153)](this[_0x9b44d3(0x175)](),_0x9b44d3(0x111));VisuMZ[_0x9b44d3(0xbb)]['JS'][_0x47da50]&&VisuMZ[_0x9b44d3(0xbb)]['JS'][_0x47da50][_0x9b44d3(0xa7)](this,this['subject'](),_0x32d813);},VisuMZ[_0xc7dc99(0xbb)][_0xc7dc99(0x151)]=Game_BattlerBase['prototype'][_0xc7dc99(0x12a)],Game_BattlerBase[_0xc7dc99(0xd4)][_0xc7dc99(0x12a)]=function(){const _0x368852=_0xc7dc99;this[_0x368852(0xdd)]={},VisuMZ[_0x368852(0xbb)][_0x368852(0x151)][_0x368852(0xa7)](this);},Game_BattlerBase[_0xc7dc99(0xd4)][_0xc7dc99(0x120)]=function(_0x1b0c81){const _0xbfff8a=_0xc7dc99;return this[_0xbfff8a(0xdd)]=this['_cache']||{},this[_0xbfff8a(0xdd)][_0x1b0c81]!==undefined;},Game_BattlerBase['prototype']['stealRate']=function(){const _0xe3a30c=_0xc7dc99;let _0x52c29a='stealRate';if(this[_0xe3a30c(0x120)](_0x52c29a))return this[_0xe3a30c(0xdd)][_0x52c29a];return this[_0xe3a30c(0xdd)][_0x52c29a]=this[_0xe3a30c(0x16d)](),this[_0xe3a30c(0xdd)][_0x52c29a];},Game_BattlerBase[_0xc7dc99(0xd4)][_0xc7dc99(0x16d)]=function(){const _0x307998=_0xc7dc99,_0x2bd217=VisuMZ['StealItems'][_0x307998(0x17a)];let _0x4c1da9=0x1;for(const _0x5c83ca of this[_0x307998(0x9e)]()){if(!_0x5c83ca)continue;const _0x5aa28b=_0x5c83ca[_0x307998(0xe0)];_0x5aa28b['match'](_0x2bd217['StealRate'])&&(_0x4c1da9*=Number(RegExp['$1'])*0.01);}return Math[_0x307998(0xed)](0x0,_0x4c1da9);},Game_BattlerBase['prototype'][_0xc7dc99(0x13e)]=function(){const _0x50f6db=_0xc7dc99;let _0x45d472=_0x50f6db(0x13e);if(this[_0x50f6db(0x120)](_0x45d472))return this[_0x50f6db(0xdd)][_0x45d472];return this[_0x50f6db(0xdd)][_0x45d472]=this[_0x50f6db(0xfe)](),this['_cache'][_0x45d472];},Game_BattlerBase[_0xc7dc99(0xd4)][_0xc7dc99(0xfe)]=function(){const _0x34ac9e=_0xc7dc99,_0x78b2c0=VisuMZ[_0x34ac9e(0xbb)][_0x34ac9e(0x17a)];let _0x559fb3=0x0;const _0x1937ed=VisuMZ[_0x34ac9e(0xbb)][_0x34ac9e(0x147)][_0x34ac9e(0x13a)];_0x1937ed&&_0x1937ed[_0x34ac9e(0x95)]&&(_0x559fb3+=_0x1937ed[_0x34ac9e(0x95)][_0x34ac9e(0xa7)](this));for(const _0x5edd2e of this[_0x34ac9e(0x9e)]()){if(!_0x5edd2e)continue;const _0x4aa142=_0x5edd2e[_0x34ac9e(0xe0)];_0x4aa142[_0x34ac9e(0xc7)](_0x78b2c0[_0x34ac9e(0xe6)])&&(_0x559fb3+=Number(RegExp['$1'])*0.01);}return _0x559fb3;},Game_BattlerBase[_0xc7dc99(0xd4)]['stealResist']=function(){const _0x7b9649=_0xc7dc99;let _0x99aa67=_0x7b9649(0xb6);if(this[_0x7b9649(0x120)](_0x99aa67))return this[_0x7b9649(0xdd)][_0x99aa67];return this[_0x7b9649(0xdd)][_0x99aa67]=this[_0x7b9649(0xac)](),this[_0x7b9649(0xdd)][_0x99aa67];},Game_BattlerBase['prototype'][_0xc7dc99(0xac)]=function(){const _0x46f648=_0xc7dc99,_0x4010df=VisuMZ[_0x46f648(0xbb)][_0x46f648(0x17a)];let _0x43b2c5=0x0;const _0x5d0c89=VisuMZ[_0x46f648(0xbb)][_0x46f648(0x147)][_0x46f648(0x13a)];_0x5d0c89&&_0x5d0c89[_0x46f648(0x165)]&&(_0x43b2c5+=_0x5d0c89['JsStealResist']['call'](this));for(const _0x4cec5f of this[_0x46f648(0x9e)]()){if(!_0x4cec5f)continue;const _0x64404d=_0x4cec5f[_0x46f648(0xe0)];_0x64404d[_0x46f648(0xc7)](_0x4010df[_0x46f648(0x16f)])&&(_0x43b2c5+=Number(RegExp['$1'])*0.01);}return _0x43b2c5;},VisuMZ['StealItems'][_0xc7dc99(0x136)]=Game_Enemy['prototype'][_0xc7dc99(0x185)],Game_Enemy[_0xc7dc99(0xd4)][_0xc7dc99(0x185)]=function(_0x29f1de,_0x3fa76d,_0x5008bf){const _0x2c2423=_0xc7dc99;VisuMZ[_0x2c2423(0xbb)]['Game_Enemy_setup'][_0x2c2423(0xa7)](this,_0x29f1de,_0x3fa76d,_0x5008bf),!Imported[_0x2c2423(0x145)]&&this[_0x2c2423(0x9c)]();},VisuMZ['StealItems']['Game_Enemy_setupEnemyLevels']=Game_Enemy[_0xc7dc99(0xd4)][_0xc7dc99(0x8d)],Game_Enemy['prototype'][_0xc7dc99(0x8d)]=function(){const _0x59fc97=_0xc7dc99;VisuMZ[_0x59fc97(0xbb)][_0x59fc97(0x88)][_0x59fc97(0xa7)](this),this['setupStealableItems']();},Game_Enemy[_0xc7dc99(0xd4)][_0xc7dc99(0x13b)]=function(){const _0x4397b6=_0xc7dc99;if(this[_0x4397b6(0x8b)]===undefined)this['setupStealableItems']();return this[_0x4397b6(0x8b)];},Game_Enemy['prototype'][_0xc7dc99(0x9c)]=function(){const _0x442572=_0xc7dc99,_0x3f6bf8=this[_0x442572(0x191)]();if(!_0x3f6bf8)return;this[_0x442572(0x8b)]=VisuMZ[_0x442572(0xbb)]['StealableItems'](this,_0x3f6bf8);},VisuMZ[_0xc7dc99(0xbb)][_0xc7dc99(0x173)]={},VisuMZ[_0xc7dc99(0xbb)]['StealableItems']=function(_0x32f513,_0x34fe72){const _0xbd46a8=_0xc7dc99;if(!_0x34fe72)return[];if(VisuMZ[_0xbd46a8(0xbb)][_0xbd46a8(0x173)][_0x34fe72['id']])return JsonEx[_0xbd46a8(0x91)](VisuMZ[_0xbd46a8(0xbb)][_0xbd46a8(0x173)][_0x34fe72['id']]);VisuMZ[_0xbd46a8(0xbb)][_0xbd46a8(0x173)][_0x34fe72['id']]=[];const _0x30e31a=VisuMZ[_0xbd46a8(0xbb)]['Settings'][_0xbd46a8(0x13d)],_0xf3b4bb=VisuMZ[_0xbd46a8(0xbb)][_0xbd46a8(0x17a)],_0x2fe8db=_0x34fe72[_0xbd46a8(0xe0)];if(_0x30e31a[_0xbd46a8(0xf2)]&&_0x34fe72[_0xbd46a8(0x125)]>0x0){const _0x281716={'type':_0xbd46a8(0x14d),'id':_0x34fe72['gold'],'rate':_0x30e31a[_0xbd46a8(0xcd)],'stolen':![],'drop':!![]};VisuMZ[_0xbd46a8(0xbb)][_0xbd46a8(0x173)][_0x34fe72['id']][_0xbd46a8(0x93)](_0x281716);}if(_0x30e31a[_0xbd46a8(0x155)]){const _0x1dec9e=_0x34fe72[_0xbd46a8(0xf0)];for(const _0x1702ac of _0x1dec9e){if(_0x1702ac){const _0x3499d6={'type':'none','id':_0x1702ac[_0xbd46a8(0xb0)],'rate':0x1/Math['max'](0x1,_0x1702ac[_0xbd46a8(0x12f)])*_0x30e31a[_0xbd46a8(0xa9)],'stolen':![],'drop':!![],'dropIndex':_0x1dec9e['indexOf'](_0x1702ac)};_0x3499d6[_0xbd46a8(0x9a)]=['none',_0xbd46a8(0xf1),'WEAPON',_0xbd46a8(0x12b)][_0x1702ac[_0xbd46a8(0xde)]];if(_0x3499d6['type']===_0xbd46a8(0x157))continue;VisuMZ['StealItems']['StealData'][_0x34fe72['id']][_0xbd46a8(0x93)](_0x3499d6);}}}const _0x2513e5=_0x2fe8db[_0xbd46a8(0xc7)](_0xf3b4bb[_0xbd46a8(0x16a)]);if(_0x2513e5)for(const _0x3f4c54 of _0x2513e5){if(!_0x3f4c54)continue;_0x3f4c54[_0xbd46a8(0xc7)](_0xf3b4bb[_0xbd46a8(0x16a)]);const _0x1b5aae=String(RegExp['$1'])['trim'](),_0x10e7f2=Number(RegExp['$2'])*0.01,_0x2adf23=VisuMZ[_0xbd46a8(0xbb)][_0xbd46a8(0xcb)](_0x1b5aae,_0x10e7f2);if(!!_0x2adf23)VisuMZ[_0xbd46a8(0xbb)][_0xbd46a8(0x173)][_0x34fe72['id']][_0xbd46a8(0x93)](_0x2adf23);}if(_0x2fe8db[_0xbd46a8(0xc7)](_0xf3b4bb[_0xbd46a8(0xb1)])){const _0x5acd15=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x37e162 of _0x5acd15){if(_0x37e162['match'](/(.*):[ ](.*)([%％])/i)){const _0x5c6036=String(RegExp['$1'])[_0xbd46a8(0x101)](),_0x50241b=Number(RegExp['$2'])*0.01,_0x1d20cc=VisuMZ[_0xbd46a8(0xbb)]['ParseStealObject'](_0x5c6036,_0x50241b);if(!!_0x1d20cc)VisuMZ[_0xbd46a8(0xbb)][_0xbd46a8(0x173)][_0x34fe72['id']]['push'](_0x1d20cc);}}}return JsonEx[_0xbd46a8(0x91)](VisuMZ[_0xbd46a8(0xbb)]['StealData'][_0x34fe72['id']]);},VisuMZ[_0xc7dc99(0xbb)][_0xc7dc99(0xcb)]=function(_0x5b2abd,_0x389fc8){const _0x3ce007=_0xc7dc99,_0x1172f1={'type':_0x3ce007(0x157),'id':0x0,'rate':_0x389fc8,'stolen':![],'drop':![]};_0x5b2abd[_0x3ce007(0xc7)](/GOLD[ ](\d+)/i)&&(_0x1172f1[_0x3ce007(0x9a)]=_0x3ce007(0x14d),_0x1172f1['id']=Number(RegExp['$1']));if(_0x5b2abd['match'](/ITEM[ ](\d+)/i))_0x1172f1['type']=_0x3ce007(0xf1),_0x1172f1['id']=Number(RegExp['$1']);else _0x5b2abd[_0x3ce007(0xc7)](/ITEM[ ](.*)/i)&&(_0x1172f1['type']=_0x3ce007(0xf1),_0x1172f1['id']=DataManager[_0x3ce007(0xf3)](RegExp['$1']));if(_0x5b2abd[_0x3ce007(0xc7)](/WEAPON[ ](\d+)/i))_0x1172f1[_0x3ce007(0x9a)]=_0x3ce007(0x17c),_0x1172f1['id']=Number(RegExp['$1']);else _0x5b2abd['match'](/WEAPON[ ](.*)/i)&&(_0x1172f1[_0x3ce007(0x9a)]=_0x3ce007(0x17c),_0x1172f1['id']=DataManager[_0x3ce007(0x114)](RegExp['$1']));if(_0x5b2abd[_0x3ce007(0xc7)](/ARMOR[ ](\d+)/i))_0x1172f1[_0x3ce007(0x9a)]=_0x3ce007(0x12b),_0x1172f1['id']=Number(RegExp['$1']);else _0x5b2abd[_0x3ce007(0xc7)](/ARMOR[ ](.*)/i)&&(_0x1172f1[_0x3ce007(0x9a)]=_0x3ce007(0x12b),_0x1172f1['id']=DataManager['getArmorIdWithName'](RegExp['$1']));return _0x1172f1;},VisuMZ[_0xc7dc99(0xbb)][_0xc7dc99(0xc0)]=Game_Enemy[_0xc7dc99(0xd4)]['gold'],Game_Enemy[_0xc7dc99(0xd4)]['gold']=function(){const _0x4b2e29=_0xc7dc99,_0x51500c=VisuMZ[_0x4b2e29(0xbb)][_0x4b2e29(0x147)][_0x4b2e29(0x13d)];if(_0x51500c[_0x4b2e29(0xf2)]&&_0x51500c[_0x4b2e29(0xe1)]){const _0x2e42a4=this['getStealableItems']();for(const _0x276918 of _0x2e42a4){if(!_0x276918)continue;if(_0x276918['drop']&&_0x276918['type']==='GOLD'){if(_0x276918['stolen'])return 0x0;}}}return VisuMZ[_0x4b2e29(0xbb)][_0x4b2e29(0xc0)]['call'](this);},VisuMZ['StealItems'][_0xc7dc99(0x126)]=Game_Enemy[_0xc7dc99(0xd4)]['makeDropItems'],Game_Enemy['prototype'][_0xc7dc99(0x121)]=function(){const _0x3a043b=_0xc7dc99,_0xd437ae=JsonEx['makeDeepCopy'](this['enemy']()[_0x3a043b(0xf0)]),_0x4bf1f8=VisuMZ[_0x3a043b(0xbb)]['Settings'][_0x3a043b(0x13d)];if(_0x4bf1f8[_0x3a043b(0x155)]&&_0x4bf1f8['ItemRemoval']){const _0x9d0e3f=this[_0x3a043b(0x13b)]();for(const _0x15a493 of _0x9d0e3f){if(!_0x15a493)continue;if(_0x15a493['drop']&&_0x15a493[_0x3a043b(0x9a)]!==_0x3a043b(0x14d)){if(!_0x15a493['stolen'])continue;const _0x4a96e2=_0x15a493[_0x3a043b(0x18d)],_0x105307=this['enemy']()[_0x3a043b(0xf0)][_0x4a96e2];_0x105307[_0x3a043b(0xde)]=0x0;}}}let _0x580c0e=VisuMZ[_0x3a043b(0xbb)][_0x3a043b(0x126)][_0x3a043b(0xa7)](this);return this[_0x3a043b(0x191)]()[_0x3a043b(0xf0)]=_0xd437ae,_0x580c0e;},VisuMZ[_0xc7dc99(0xbb)]['Scene_Battle_createEnemyWindow']=Scene_Battle['prototype']['createEnemyWindow'],Scene_Battle[_0xc7dc99(0xd4)]['createEnemyWindow']=function(){const _0x435386=_0xc7dc99;VisuMZ[_0x435386(0xbb)][_0x435386(0x132)]['call'](this),this['createStealSnatchWindow']();},Scene_Battle[_0xc7dc99(0xd4)][_0xc7dc99(0x139)]=function(){const _0x1774bb=_0xc7dc99,_0xebd523=this[_0x1774bb(0xea)]();this['_stealSnatchWindow']=new Window_StealSnatch(_0xebd523),this[_0x1774bb(0x160)][_0x1774bb(0xc8)](this[_0x1774bb(0x161)]),this[_0x1774bb(0x160)][_0x1774bb(0x131)]('ok',this[_0x1774bb(0xbd)]['bind'](this)),this[_0x1774bb(0x160)][_0x1774bb(0x131)](_0x1774bb(0xa4),this[_0x1774bb(0x164)][_0x1774bb(0xaf)](this)),this[_0x1774bb(0x169)](this[_0x1774bb(0x160)]);},VisuMZ[_0xc7dc99(0xbb)][_0xc7dc99(0x90)]=Scene_Battle[_0xc7dc99(0xd4)]['isAnyInputWindowActive'],Scene_Battle[_0xc7dc99(0xd4)][_0xc7dc99(0xbc)]=function(){const _0x45ca72=_0xc7dc99;if(this[_0x45ca72(0x160)]&&this[_0x45ca72(0x160)][_0x45ca72(0x154)])return!![];return VisuMZ[_0x45ca72(0xbb)]['Scene_Battle_isAnyInputWindowActive'][_0x45ca72(0xa7)](this);},VisuMZ[_0xc7dc99(0xbb)][_0xc7dc99(0xb5)]=Scene_Battle[_0xc7dc99(0xd4)][_0xc7dc99(0x10a)],Scene_Battle[_0xc7dc99(0xd4)][_0xc7dc99(0x10a)]=function(){const _0xbb247c=_0xc7dc99;VisuMZ[_0xbb247c(0xbb)][_0xbb247c(0xb5)][_0xbb247c(0xa7)](this),this['_stealSnatchWindow']&&(this['_stealSnatchWindow'][_0xbb247c(0x14b)](),this[_0xbb247c(0x160)][_0xbb247c(0x99)]());},VisuMZ[_0xc7dc99(0xbb)]['Scene_Battle_onEnemyOk']=Scene_Battle[_0xc7dc99(0xd4)]['onEnemyOk'],Scene_Battle[_0xc7dc99(0xd4)][_0xc7dc99(0x17b)]=function(){const _0x1c065a=_0xc7dc99,_0x3eaffd=BattleManager[_0x1c065a(0x142)]();this[_0x1c065a(0x160)]&&_0x3eaffd[_0x1c065a(0xd7)]()?this[_0x1c065a(0x17f)]():VisuMZ[_0x1c065a(0xbb)][_0x1c065a(0x178)][_0x1c065a(0xa7)](this);},Scene_Battle[_0xc7dc99(0xd4)][_0xc7dc99(0x17f)]=function(){const _0x3d6669=_0xc7dc99,_0x29588c=$gameTroop['members']()[this['_enemyWindow'][_0x3d6669(0xd0)]()],_0x66a9aa=BattleManager['inputtingAction']();this[_0x3d6669(0x160)][_0x3d6669(0x104)](_0x29588c,_0x66a9aa),this[_0x3d6669(0x160)][_0x3d6669(0x12a)](),this['_stealSnatchWindow'][_0x3d6669(0x152)](),this['_stealSnatchWindow'][_0x3d6669(0x189)]();},Scene_Battle[_0xc7dc99(0xd4)]['onStealSnatchOk']=function(){const _0x371cc4=_0xc7dc99,_0x365b65=BattleManager[_0x371cc4(0x142)](),_0x20d729=$gameTroop[_0x371cc4(0x179)]()[this[_0x371cc4(0xc4)]['enemyIndex']()],_0x3ae559=this[_0x371cc4(0x160)]['item']();_0x365b65[_0x371cc4(0xae)](_0x20d729,_0x3ae559),VisuMZ[_0x371cc4(0xbb)][_0x371cc4(0x178)][_0x371cc4(0xa7)](this);},Scene_Battle[_0xc7dc99(0xd4)]['onStealSnatchCancel']=function(){const _0x1164e6=_0xc7dc99;this[_0x1164e6(0x160)][_0x1164e6(0x99)](),this['_stealSnatchWindow']['deactivate'](),this[_0x1164e6(0xc4)]['show'](),this[_0x1164e6(0xc4)][_0x1164e6(0x189)](),Imported[_0x1164e6(0x195)]&&this[_0x1164e6(0xc4)][_0x1164e6(0x134)]();},Window_BattleLog['prototype']['addStealText']=function(_0x429242){const _0x28820c=_0xc7dc99;this[_0x28820c(0x135)][_0x28820c(0x93)](_0x429242),this[_0x28820c(0x12a)]();};function _0x2e0d(_0x189eb1,_0x513007){const _0x274d85=_0x274d();return _0x2e0d=function(_0x2e0ddc,_0x36b988){_0x2e0ddc=_0x2e0ddc-0x88;let _0x5235ae=_0x274d85[_0x2e0ddc];return _0x5235ae;},_0x2e0d(_0x189eb1,_0x513007);}function _0x274d(){const _0x2ca932=['enemyIndex','processStealItemsNothing','all','drawTextEx','prototype','STR','1247839dEOOge','isSnatchEffect','Skill-%1-%2','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20gold\x20=\x20arguments[3];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','createStealRateJS','GoldIcon','processStealItemsSuccessPopup','_cache','kind','subject','note','GoldRemoval','3400632EwFzQC','ParseItemNotetags','processStealItemsFailureSFX','setHelpWindowItem','StealPlus','FUNC','ParseSkillNotetags','4629037PikYWm','itemWindowRect','ShowMessages','onDatabaseLoaded','max','stolen','currencyUnit','dropItems','ITEM','AutoGold','getItemIdWithName','format','initialize','_snatchEnemyIndex','CreateVisualGoldText','process_VisuMZ_StealItems_JS','JsStealRate','BattleLog','filter','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_snatchItemIndex','createStealPlus','snatchGoldHelpText','status','trim','numberWidth','applyItemUserEffect','setDetails','_weaponIDs','ARRAYSTR','JsStealRateItem','fail','_logWindow','hideSubInputWindows','_scene','length','setText','ARRAYFUNC','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ConvertParams','JsOnStealNothing','processStealItemsFailureJS','isForOpponent','getWeaponIdWithName','FailureTextColor','processStealItemsSuccessLogWindow','rate','State-%1-%2','EquipDebuff','ARRAYNUM','ARRAYSTRUCT','DisplaySuccess','%1_pan','696225TpHMrb','FailureFlashDuration','checkCacheKey','makeDropItems','playSe','processStealItemsNothingLogWindow','%1_volume','gold','Game_Enemy_makeDropItems','StealAction1','processStealItemsNothingPopup','EVAL','refresh','ARMOR','SuccessTextColor','floor','processStealItemsNothingSFX','denominator','8EBPXsW','setHandler','Scene_Battle_createEnemyWindow','processStealItemsSuccessJS','autoSelect','_lines','Game_Enemy_setup','AlreadyStolen','isForOne','createStealSnatchWindow','Mechanics','getStealableItems','%1_pitch','Auto','stealPlus','clamp','startStealItemsUserEffect','EmptyFlashColor','inputtingAction','EmptyFlashDuration','addParam','VisuMZ_3_EnemyLevels','textWidth','Settings','addStealText','textSizeEx','3737658kMeXPN','deactivate','random','GOLD','getSnatchTarget','SuccessItemName','version','Game_BattlerBase_refresh','show','createKeyJS','active','AutoItem','Snatch','none','makeItemList','SuccessFlashColor','types','toLowerCase','includes','isEnemy','STRUCT','setupIconTextPopup','_stealSnatchWindow','_helpWindow','snatchAlreadyStolen','_action','onStealSnatchCancel','JsStealResist','VisualGoldDisplay','14520znySMj','toUpperCase','addWindow','StealableItemSingle','iconIndex','setupTextPopup','createStealRate','processStealItemsSuccess','StealResist','Scene_Boot_onDatabaseLoaded','JsOnStealFail','return\x200','StealData','setItem','item','JsStealRateArmor','JsStealRateGold','Scene_Battle_onEnemyOk','members','RegExp','onEnemyOk','WEAPON','Weapon-%1-%2','makeSuccess','startStealSnatchSelection','processStealItemsSuccessEquipDebuff','snatchGoldIcon','plus','_enemy','isEnabled','setup','map','Sound','exit','activate','\x5cI[%1]','snatchGoldNameFmt','EmptyPopupText','dropIndex','processStealItemsNothingJS','name','_data','enemy','armor','drawItemNumber','ShuffleArray','VisuMZ_1_BattleCore','Popup','Game_Enemy_setupEnemyLevels','ARRAYJSON','_visualDrops','_stealableItems','9342FvRlxs','setupEnemyLevels','weapon','Game_Action_applyItemUserEffect','Scene_Battle_isAnyInputWindowActive','makeDeepCopy','JsOnStealEmpty','push','description','JsBonusSteal','createOnStealJS','GoldNameFmt','%1_name','hide','type','index','setupStealableItems','processStealItemsFailureLogWindow','traitObjects','gainItem','processStealItemsSuccessSFX','861190ikEJWu','getArmorIdWithName','VisuMZ_3_VisualGoldDisplay','cancel','drawItemName','ARRAYEVAL','call','parameters','ItemRate','SuccessFlashDuration','CoreEngine','createStealResist','process_VisuMZ_StealItems','registerSnatchTarget','bind','dataId','StealableItemBatch','ParseAllNotetags','DetermineStealData','FailurePopupText','Scene_Battle_hideSubInputWindows','stealResist','VISUAL_GOLD_DISPLAY_PAD_ZERO_DEFAULT','Parse_Notetags_JS','_armorIDs','stealRate','StealItems','isAnyInputWindowActive','onStealSnatchOk','processStealItemsFailurePopup','JsStealRateWeapon','Game_Enemy_gold','StealGold','JsOnStealSuccess','Gold','_enemyWindow','parse','88.88%','match','setHelpWindow','width','StealAction2','ParseStealObject','_numberWidth','GoldRate','NUM','_itemIDs'];_0x274d=function(){return _0x2ca932;};return _0x274d();}function Window_StealSnatch(){const _0x365be2=_0xc7dc99;this[_0x365be2(0xf5)](...arguments);}Window_StealSnatch[_0xc7dc99(0xd4)]=Object['create'](Window_ItemList[_0xc7dc99(0xd4)]),Window_StealSnatch['prototype']['constructor']=Window_StealSnatch,Window_StealSnatch[_0xc7dc99(0xd4)]['initialize']=function(_0x122b9b){const _0x12ba6f=_0xc7dc99;Window_ItemList['prototype'][_0x12ba6f(0xf5)][_0x12ba6f(0xa7)](this,_0x122b9b),this['hide'](),this[_0x12ba6f(0x183)]=null,this[_0x12ba6f(0x163)]=null;},Window_StealSnatch['prototype'][_0xc7dc99(0x104)]=function(_0x5d4f5f,_0x284128){const _0x37e8a5=_0xc7dc99;this[_0x37e8a5(0x183)]=_0x5d4f5f,this[_0x37e8a5(0x163)]=_0x284128,this['refresh'](),this['show'](),this['forceSelect'](0x0);},Window_StealSnatch[_0xc7dc99(0xd4)][_0xc7dc99(0x158)]=function(){const _0x124c3e=_0xc7dc99;this['_data']=[];if(!this[_0x124c3e(0x183)])return;const _0x2912b5=VisuMZ[_0x124c3e(0xbb)][_0x124c3e(0xb3)](this[_0x124c3e(0x163)],this[_0x124c3e(0x183)]);if(_0x2912b5[_0x124c3e(0x15a)][_0x124c3e(0x10c)]<=0x0)return;this[_0x124c3e(0x190)]=this[_0x124c3e(0x183)][_0x124c3e(0x13b)]()[_0x124c3e(0xfb)](_0x3a3729=>{const _0x4a4543=_0x124c3e;return _0x2912b5[_0x4a4543(0x15a)][_0x4a4543(0x15c)](_0x3a3729[_0x4a4543(0x9a)]);});},Window_StealSnatch['prototype'][_0xc7dc99(0x184)]=function(_0x52d9a6){return _0x52d9a6&&!_0x52d9a6['stolen'];},Window_StealSnatch[_0xc7dc99(0xd4)][_0xc7dc99(0x102)]=function(){const _0x5d0351=_0xc7dc99;if(this[_0x5d0351(0xcc)])return this[_0x5d0351(0xcc)];return this['_numberWidth']=this[_0x5d0351(0x146)](_0x5d0351(0xc6)),this[_0x5d0351(0xcc)]=Math[_0x5d0351(0xed)](this[_0x5d0351(0xcc)],this[_0x5d0351(0x149)](TextManager[_0x5d0351(0x162)])[_0x5d0351(0xc9)]),this[_0x5d0351(0xcc)];},Window_StealSnatch[_0xc7dc99(0xd4)][_0xc7dc99(0xa5)]=function(_0x1a0c25,_0x41db55,_0x24c787,_0xda177f){const _0x2737ac=_0xc7dc99;if(!_0x1a0c25)return;switch(_0x1a0c25[_0x2737ac(0x9a)]['toUpperCase']()[_0x2737ac(0x101)]()){case _0x2737ac(0x14d):const _0x333311=TextManager[_0x2737ac(0x18b)][_0x2737ac(0xf4)]('\x5cI[%1]'[_0x2737ac(0xf4)](ImageManager['snatchGoldIcon']),_0x1a0c25['id'],TextManager[_0x2737ac(0xef)]);this[_0x2737ac(0xd3)](_0x333311,_0x41db55,_0x24c787);break;case _0x2737ac(0xf1):Window_Base[_0x2737ac(0xd4)][_0x2737ac(0xa5)][_0x2737ac(0xa7)](this,$dataItems[_0x1a0c25['id']],_0x41db55,_0x24c787,_0xda177f);break;case'WEAPON':Window_Base[_0x2737ac(0xd4)][_0x2737ac(0xa5)][_0x2737ac(0xa7)](this,$dataWeapons[_0x1a0c25['id']],_0x41db55,_0x24c787,_0xda177f);break;case _0x2737ac(0x12b):Window_Base[_0x2737ac(0xd4)][_0x2737ac(0xa5)][_0x2737ac(0xa7)](this,$dataArmors[_0x1a0c25['id']],_0x41db55,_0x24c787,_0xda177f);break;}},Window_StealSnatch['prototype'][_0xc7dc99(0x193)]=function(_0xcab7b0,_0x24609c,_0x273a27,_0x399d42){const _0x8c5a3d=_0xc7dc99;if(_0xcab7b0[_0x8c5a3d(0xee)]){const _0x14ab07=TextManager['snatchAlreadyStolen'];_0x24609c+=_0x399d42-this[_0x8c5a3d(0x149)](_0x14ab07)[_0x8c5a3d(0xc9)],this[_0x8c5a3d(0xd3)](_0x14ab07,_0x24609c,_0x273a27);}else{if(VisuMZ['StealItems'][_0x8c5a3d(0x147)][_0x8c5a3d(0x156)][_0x8c5a3d(0x11c)]){const _0x46ffb7=VisuMZ[_0x8c5a3d(0xbb)][_0x8c5a3d(0xb3)](this[_0x8c5a3d(0x163)],this[_0x8c5a3d(0x183)]);let _0x48f0f9=_0x46ffb7['rate'][_0x8c5a3d(0xd2)]*_0xcab7b0['rate'],_0xa3adc=_0x46ffb7[_0x8c5a3d(0x182)]['all'];_0x48f0f9*=_0x46ffb7['rate'][_0xcab7b0[_0x8c5a3d(0x9a)][_0x8c5a3d(0x15b)]()],_0xa3adc+=_0x46ffb7[_0x8c5a3d(0x182)][_0xcab7b0['type'][_0x8c5a3d(0x15b)]()];let _0x87582=(_0x48f0f9+_0xa3adc)[_0x8c5a3d(0x13f)](0x0,0x1)*0x64;_0x87582>0x0&&_0x87582<0x64&&(_0x87582=_0x87582['toFixed'](0x2)),_0x87582=String(_0x87582)+'%',_0x24609c+=_0x399d42-this['textSizeEx'](_0x87582)[_0x8c5a3d(0xc9)],this['drawTextEx'](_0x87582,_0x24609c,_0x273a27);}}},Window_StealSnatch['prototype'][_0xc7dc99(0xe5)]=function(_0x2e2e8f){const _0x2f95a3=_0xc7dc99;if(this[_0x2f95a3(0x161)])switch(_0x2e2e8f[_0x2f95a3(0x9a)][_0x2f95a3(0x168)]()[_0x2f95a3(0x101)]()){case _0x2f95a3(0x14d):this[_0x2f95a3(0x161)][_0x2f95a3(0x10d)](TextManager[_0x2f95a3(0xff)]);break;case'ITEM':this[_0x2f95a3(0x161)][_0x2f95a3(0x174)]($dataItems[_0x2e2e8f['id']]);break;case _0x2f95a3(0x17c):this['_helpWindow'][_0x2f95a3(0x174)]($dataWeapons[_0x2e2e8f['id']]);break;case _0x2f95a3(0x12b):this[_0x2f95a3(0x161)][_0x2f95a3(0x174)]($dataArmors[_0x2e2e8f['id']]);break;}};
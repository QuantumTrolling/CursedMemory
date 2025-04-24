//=============================================================================
// VisuStella MZ - Extra Enemy Drops
// VisuMZ_4_ExtraEnemyDrops.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_ExtraEnemyDrops = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ExtraEnemyDrops = VisuMZ.ExtraEnemyDrops || {};
VisuMZ.ExtraEnemyDrops.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.08] [ExtraEnemyDrops]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Extra_Enemy_Drops_VisuStella_MZ
 * @base VisuMZ_4_ExtraEnemyDrops
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * By default, RPG Maker MZ limits enemies to only drop up to 3 items max and
 * at very limited drop rates. This plugin allows you to add more than 3 items
 * at drop and at custom rates that aren't limited to a demoninator value.
 * 
 * This plugin also gives the functionality to force specific drops or give any
 * additional bonus drops to make some battles give different rewards despite
 * having the same types of enemies encountered before.
 * 
 * And if you have the VisuStella Battle Core, drops can be visible on the
 * battlefield and spring out of the enemies as they collapse!
 *
 * Features include all (but not limited to) the following:
 * 
 * * More than 3 drops per enemy can be given.
 * * Drop probability is a percentile value and not a demoniator setting.
 * * Make Conditional Drops that only appear depending on the events that took
 *   place during the battle.
 * * JavaScript notetags that let you make conditional drops based on code.
 * * New plugin commands to allow for forced drops and/or bonus drops.
 * * Forced drops will override any existing drops made from the enemy troop.
 * * Bonus drops will be additional drops in addition to those dropped from the
 *   enemy troop.
 * * If you have the Battle Core, drops become visible on the battlefield.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Forced Enemy Drops
 * 
 * - If forced enemy drops are used (through a Plugin Command), then all other
 * drop-related functions will be ignored in favor of the forced enemy drops.
 * This is because all forced drops are made to favor a specific set of drops
 * ordered by the game developer.
 * 
 * - This will prevent visual drops from appearing, too. Any visual drops that
 * have already been made present will also disappear.
 *
 * ---
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
 * Visual Drops (Battle Core)
 *
 * - Drops become visible on the battlefield. Once an enemy is defeated, visual
 * drops will appear out of their former position. These drops are shown as
 * icons, representing the EXP, Gold, and Drop Items an enemy will yield if the
 * battle is won.
 * 
 * - This feature can be disabled.
 * 
 * - If this feature is enabled, there is a slight change to the drop system.
 * Previously, drops are determined at the end of battle. Now, to visibly
 * appear upon the defeat of an enemy, they are then determined at the moment
 * of their death.
 * 
 * - What this means is, if an EXP or Gold boost is applied after they've been
 * defeated, it will not be retroactive and apply to the drops that become
 * visible on the battlefield. As a result, the player has to be tactical in
 * when they defeat the enemies after applying the EXP and Gold buffs.
 * 
 * - Depending on the Plugin Parameter settings, if an enemy revives, their
 * drops can be reset. If the reset is allowed, the player can acquire a whole
 * different set of drops upon the enemy's subsequent defeats. This feature can
 * be turned off.
 * 
 * - A reviving enemy will cause its visual drops to disappear.
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
 * === General Drop-Related Notetags ===
 * 
 * The following notetags are related to giving enemies additional drops with
 * more control over probability rates.
 * 
 * ---
 *
 * <Item Drop id: x%>
 * <Item Drop id To id: x%>
 * <Item Drop name: x%>
 * 
 * <Weapon Drop id: x%>
 * <Weapon Drop id To id: x%>
 * <Weapon Drop name: x%>
 * 
 * <Armor Drop id: x%>
 * <Armor Drop id To id: x%>
 * <Armor Drop name: x%>
 *
 * - Used for: Enemy Notetags
 * - Gives the enemy 'x' percent chance to drop the designated item, weapon,
 *   or armor.
 * - Replace 'id' with the ID of the item, weapon, or armor you wish to assign
 *   to the enemy as a potential drop.
 *   - For 'id To id' variants, insert the starting ID and ending ID for the
 *     items, weapons, and/or armors you wish to add as a batch. This will
 *     ignore any entries without a name or with ----- in its name.
 * - With the 'name' notetag variant, replace 'name' with the name of the item,
 *   weapon, or armor you wish to assign to the enemy as a potential drop.
 * - Replace 'x' with a number representing the percentile probability chance
 *   of successfully acquiring that item as a drop.
 * - Insert multiple copies of these notetags if you wish to include more drops
 *   for the enemies.
 * 
 * Examples:
 * 
 * <Item Drop 5: 20%>
 * <Item Drop 5 To 10: 20%>
 * <Item Drop Potion: 30%>
 * 
 * <Weapon Drop 27: 45%>
 * <Weapon Drop 27 To 37: 45%>
 * <Weapon Drop Blade of Reckoning: 55%>
 * 
 * <Armor Drop 19: 72%>
 * <Armor Drop 19 To 23: 72%>
 * <Armor Drop Flame Shield: 90%>
 *
 * ---
 *
 * <Drops>
 *  Item id: x%
 *  Item id To id: x%
 *  Item name: x%
 *  Weapon id: x%
 *  Weapon id To id: x%
 *  Weapon name: x%
 *  Armor id: x%
 *  Armor id To id: x%
 *  Armor name: x%
 * </Drops>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Creates a batch list of item, weapon, armor drops.
 * - This isn't any different than creating individual copies of the above
 *   notetags as far as results go, but some may prefer this approach to make
 *   the drop table look "cleaner".
 * - Replace 'id' with the ID of the item, weapon, or armor you wish to assign
 *   to the enemy as a potential drop.
 *   - For 'id To id' variants, insert the starting ID and ending ID for the
 *     items, weapons, and/or armors you wish to add as a batch. This will
 *     ignore any entries without a name or with ----- in its name.
 * - With the 'name' notetag variant, replace 'name' with the name of the item,
 *   weapon, or armor you wish to assign to the enemy as a potential drop.
 * - Replace 'x' with a number representing the percentile probability chance
 *   of successfully acquiring that item as a drop.
 * 
 * Example:
 *
 * <Drops>
 *  Item 5: 20%
 *  Item Potion: 30%
 *  Weapon 27: 45%
 *  Weapon Blade of Reckoning: 55%
 *  Armor 72: 72%
 *  Armor Flame Shield: 90%
 * </Drops>
 *
 * ---
 * 
 * === Conditional Drop-Related Notetags ===
 * 
 * Conditional drops are drops that only appear once specific conditions have
 * been met. For each condition met, their chances of dropping can be raised
 * higher or lower.
 * 
 * ---
 * 
 * <Conditional Item id Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Item id Drop>
 * 
 * <Conditional Item id To id Drops>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Item id To id Drops>
 * 
 * <Conditional Item name Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Item name Drop>
 * 
 * <Conditional Weapon id Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Weapon id Drop>
 * 
 * <Conditional Weapon id To id Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Weapon id To id Drop>
 * 
 * <Conditional Weapon name Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Weapon name Drop>
 * 
 * <Conditional Armor id Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Armor id Drop>
 * 
 * <Conditional Armor id To id Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Armor id To id Drop>
 * 
 * <Conditional Armor name Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Armor name Drop>
 *
 * - Used for: Enemy Notetags
 * - Create conditional item, weapon, and/or armor drops for this enemy.
 * - Insert multiples of these notetags if you want more than one conditional
 *   drop for this enemy.
 * - Use the associated item, weapon, or armor type notetag for the type of
 *   conditional drop you want for the enemy.
 * - Replace 'id' with the ID number of the item, weapon, or armor to drop.
 *   - For 'id To id' variants, insert the starting ID and ending ID for the
 *     items, weapons, and/or armors you wish to add as a batch. This will
 *     ignore any entries without a name or with ----- in its name.
 * - Replace 'name' with the name of the item, weapon, or armor to drop.
 * - Replace 'condition' with any of the conditions listed in below section.
 * - Replace 'x' with the increase or decrease in percentage drop chance.
 * 
 * ---
 * 
 * -=-=- Condition List -=-=-
 *
 * Replace 'condition' in the notetags in the above section with any of the
 * following to make conditions. These conditions are also used in the Plugin
 * Parameters for the default conditions, too.
 * 
 * ---
 *
 * x >= y
 * x > y
 * x === y
 * x !== y
 * x < y
 * x <= y
 * 
 * - Replace 'x' and 'y' with any of the following:
 *
 * - 'Switch x' (replace 'x' with a number) for switch x's current state.
 * - 'TRUE', 'FALSE', 'ON', 'OFF' for the opposite x/y value.
 * - Using any of these boolean modifiers must be paired with '===' or '!=='
 *
 * - 'Variable x' (replace 'x' with a number) for variable x's current value.
 * - A numeric value representing a hard number.
 * - '50%' or any other percentile number to represent a rate.
 * - '0.5' or any other float number to represent a rate.
 * 
 * - 'Item id Count' for the number of specific items the party owns.
 *   - Replace 'id' with the ID of the item.
 * - 'Item name Count' for the number of specific items the party owns.
 *   - Replace 'name' with the ID of the item.
 * 
 * - 'Weapon id Count' for the number of specific weapons the party owns.
 *   - Replace 'id' with the ID of the weapon.
 * - 'Weapon name Count' for the number of specific weapons the party owns.
 *   - Replace 'name' with the ID of the weapon.
 * 
 * - 'Armor id Count' for the number of specific armors the party owns.
 *   - Replace 'id' with the ID of the armor.
 * - 'Armor name Count' for the number of specific armors the party owns.
 *   - Replace 'name' with the ID of the armor.
 * 
 * - 'Alive Members' for the number of alive party members when drops are
 *   being determined.
 * 
 * - 'Battle Members' for the number of participating party members in battle.
 * 
 * - 'Battle Turns' for the number of turns passed in battle when drops are
 *   being determined.
 * 
 * - 'Dead Members' for the number of dead party members when drops are
 *   being determined.
 * 
 * - 'Death Turn' for the turn the enemy died. If an enemy was revived during
 *   battle, then take the most recent turn the enemy has died.
 * 
 * - 'Enemy Level' for the current level of the enemy if using the 'level'
 *   property for the Game_Enemy object.
 * 
 * - 'Party Gold' for the party's current gold value when drops are
 *   being determined.
 * 
 * - 'Party Members' for the number of total party members in battle.
 * 
 * - 'Times type id Struck' for the number of times the enemy was struck
 *   with 'type' 'id' during battle.
 * - Replace 'type' with 'Element' for the number of times the enemy was struck
 *   with specific elemental damage.
 * - Replace 'type' with 'Item' for the number of times the enemy was struck
 *   with a specific item.
 * - Replace 'type' with 'Skill' for the number of times the enemy was struck
 *   with a specific skill.
 * - Replace 'type' with 'SType' for the number of times the enemy was struck
 *   by any skill of a specifici skill type.
 * - Replace 'type' with 'State' for the number of times the enemy was struck
 *   with a specific state.
 * - Replace 'id' with the type's ID.
 * 
 * - 'Times type name Struck' for the number of times the enemy was struck
 *   with 'type' 'name' during battle.
 * - Replace 'type' with 'Element' for the number of times the enemy was struck
 *   with specific elemental damage.
 * - Replace 'type' with 'Item' for the number of times the enemy was struck
 *   with a specific item.
 * - Replace 'type' with 'Skill' for the number of times the enemy was struck
 *   with a specific skill.
 * - Replace 'type' with 'SType' for the number of times the enemy was struck
 *   by any skill of a specifici skill type.
 * - Replace 'type' with 'State' for the number of times the enemy was struck
 *   with a specific state.
 * - Replace 'name' with the type's name in the database.
 * 
 * ---
 * 
 * Always
 * 
 * - This condition is always met. Use this to set a base drop chance.
 * 
 * ---
 * 
 * Random x%
 * 
 * - Offers a random 'x' chance to increase/decrease drop chance.
 * 
 * ---
 * 
 * Last Strike type id
 * Last Strike type name
 * 
 * - Checks the condition to see if the last struck action against the enemy
 *   was done by a specific action.
 * - Replace 'type' with 'Element' for the last struck element.
 * - Replace 'type' with 'Item' for the last struck item if it was an item.
 *   This will override the 'Skill' and 'SType' types.
 * - Replace 'type' with 'Skill' for the last struck skill if it was a skill.
 *   This will override the 'Item' type.
 * - Replace 'type' with 'SType' for the last struck skill type if it was
 *   a skill. This will override the 'Item' type.
 * - Replace 'type' with 'State' for the last struck state.
 * 
 * ---
 * 
 * Examples:
 * 
 * The following are some examples on how these conditional drops are used:
 * 
 * ---
 * 
 * <Conditional Item Potion Drop>
 *  Always: +20%
 *  Death Turn <= 3: +50%
 * </Conditional Item Potion Drop>
 * 
 * - Conditional drop is the Potion item.
 * - It has a base chance of 20%.
 * - If the enemy was defeated during or before turn 3, increase the drop
 *   chance by another 50%.
 * 
 * ---
 * 
 * <Conditional Weapon Mithril Sword Drop>
 *  Always: +100%
 *  Times SType Magic Struck: -10%
 *  Times SType Spell Struck: -10%
 * </Conditional Weapon Mithril Sword Drop>
 * 
 * - Conditional drop is the Mithril Sword weapon.
 * - It starts off with a 100% chance of a drop.
 * - Each time the enemy is struck with 'Magic' or 'Spell' type attacks,
 *   the drop chance decreases by 10%.
 * 
 * ---
 * 
 * <Conditional Armor Elemental Cloak Drop>
 *  Times Element Fire Struck: +10%
 *  Times Element Ice Struck: +10%
 *  Times Element Thunder Struck: +10%
 *  Times Element Physical Struck: -20%
 *  Times Skill Element Force Struck: +50%
 * </Conditional Armor Elemental Cloak Drop>
 * 
 * - Conditional drop is the Elemental Cloak armor.
 * - Each time the enemy is struck by 'Fire', 'Ice', or 'Thunder' damage,
 *   increase the drop chance by 10%.
 * - Each time the enemy is struck by 'Physical' damage, decrease the drop
 *   chance by 10%.
 * - Each time the enemy is struck by the specific skill 'Element Force',
 *   increase the drop chance by +50%.
 * 
 * ---
 *
 * === JavaScript Notetags: Drops ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional enemy drop manipulation.
 *
 * ---
 *
 * <JS Drops>
 *  code
 *  code
 *  drops.push($dataItems[1]);
 *  drops.push($dataWeapons[2]);
 *  drops.push($dataArmors[3]);
 * </JS Drops>
 *
 * - Used for: Enemy Notetags
 * - Replace 'code' with JavaScript code to make conditional checks in order
 *   to determine which items, weapons, and/or armors would be added to the
 *   drop pool.
 * - The 'drops' variable is an array which contains all of the currently
 *   existing drops from the enemy this notetag is on. It will be returned as
 *   an array upon running the notetag's JavaScript code.
 * - Add to or remove from the 'drops' variable to change up its contents.
 *
 * ---
 * 
 * === Visual Drop-Related Notetags ===
 * 
 * For those who want to customize how some items, weapons, or armors appear as
 * visual drops, use the following notetags.
 * 
 * ---
 *
 * <Visual Drop Icon: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Forces the drop item, weapon, or armor to appear as a different icon.
 * - Replace 'x' with the ID of the icon you wish to show.
 *
 * ---
 *
 * <Visual Drop Rarity: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Sets the item, weapon, or armor drop to be a specific rarity.
 * - Replace 'x' with a rarity value between 0 and 10. The settings applied to
 *   the visual drop will be based on their Plugin Parameter settings.
 * - This is mutually exclusive from the <Visual Drop Tint Color: r, g, b, k>
 *   and <Visual Drop Tint Duration: x> notetags.
 *
 * ---
 *
 * <Visual Drop Tint Color: r, g, b, k>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Sets the tint of visual drop item when it's visible on the battlefield.
 * - Replace 'r' with a red value between -255 and 255.
 * - Replace 'g' with a green value between -255 and 255.
 * - Replace 'b' with a blue value between -255 and 255.
 * - Replace 'k' with a gray value between 0 and 255.
 * - This does not work with the <Visual Drop Rarity: x> notetag.
 *
 * ---
 *
 * <Visual Drop Tint Duration: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Sets the duration of the tint effect.
 * - Replace 'x' with the number of frames to tint the visual drop. The lower
 *   the number, the faster the tint pulses. The higher the number, the slower
 *   the tint pulses.
 *
 * ---
 *
 * <Visual Drop Spawn SFX: filename>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - When the item, weapon, or armor's visual drop spawns on the battlefield,
 *   play a sound effect.
 * - Replace 'filename' with the name of a sound effect from the game project's
 *   /audio/se/ folder. Do not include the file extension.
 * - Example: <Visual Drop Spawn SFX: Float1>
 *
 * ---
 *
 * <Visual Drop Bounce Height: x%>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Alters how bouncy this visual drop is as it spawns on the battlefield.
 * - Replace 'x' with a percentage value on how much higher the visual drop
 *   should bounce than normal (whatever is set in the Plugin Parameters).
 *
 * ---
 *
 * <Visual Drop Bounce SFX: filename>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - When the item, weapon, or armor's visual drop bounces on the battlefield,
 *   play a sound effect.
 * - Replace 'filename' with the name of a sound effect from the game project's
 *   /audio/se/ folder. Do not include the file extension.
 * - Example: <Visual Drop Bounce SFX: Float1>
 *
 * ---
 *
 * <Visual Drop Flag: Rainbow>
 * <Visual Drop Flag: Additive>
 * <Visual Drop Flag: Multiply>
 * <Visual Drop Flag: Screen>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adds visual effects to visual drop when it's on the battlefield.
 * - The 'Rainbow' effect causes the icon's hue to constantly change.
 * - The 'Additive', 'Multiply', and 'Screen', effects are blend modes.
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
 * === Bonus Reward Plugin Commands ===
 * 
 * ---
 *
 * Bonus Rewards: Clear
 * - Clears all bonus drops.
 *
 * ---
 *
 * Bonus Rewards: Set EXP
 * - Determines additional EXP the player will get in battle by this value.
 *
 *   EXP:
 *   - Determines additional EXP the player will get in battle by this value.
 *
 * ---
 *
 * Bonus Rewards: Set Gold
 * - Determines additional Gold the player will get in battle by this value.
 *
 *   Gold:
 *   - Determines additional Gold the player will get in battle by this value.
 *
 * ---
 *
 * Bonus Rewards: Add Item
 * - Adds the bonus drop the player earns from this battle to have the
 *   following item given at a specific quantity.
 *
 *   Item ID:
 *   - Which item do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the bonus drop to give the player.
 *
 * ---
 *
 * Bonus Rewards: Add Weapon
 * - Adds the bonus drop the player earns from this battle to have the
 *   following weapon given at a specific quantity.
 *
 *   Weapon ID:
 *   - Which weapon do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the bonus drop to give the player.
 *
 * ---
 *
 * Bonus Rewards: Add Armor
 * - Adds the bonus drop the player earns from this battle to have the
 *   following armor given at a specific quantity.
 *
 *   Armor ID:
 *   - Which armor do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the bonus drop to give the player.
 *
 * ---
 * 
 * === Forced Reward Plugin Commands ===
 * 
 * ---
 *
 * Forced Rewards: Clear
 * - Clears all forced drops.
 *
 * ---
 *
 * Forced Rewards: Set EXP
 * - Change the amount of EXP the player will get in battle to this value.
 *
 *   EXP:
 *   - Change the amount of EXP the player will get in battle to this value.
 *
 * ---
 *
 * Forced Rewards: Set Gold
 * - Change the amount of Gold the player will get in battle to this value.
 *
 *   Gold:
 *   - Change the amount of Gold the player will get in battle to this value.
 *
 * ---
 *
 * Forced Rewards: Add Item
 * - Adds the forced drop the player earns from this battle to have the
 *   following item given at a specific quantity.
 *
 *   Item ID:
 *   - Which item do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the forced drop to give the player.
 *
 * ---
 *
 * Forced Rewards: Add Weapon
 * - Adds the forced drop the player earns from this battle to have the
 *   following weapon given at a specific quantity.
 *
 *   Weapon ID:
 *   - Which weapon do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the forced drop to give the player.
 *
 * ---
 *
 * Forced Rewards: Add Armor
 * - Adds the forced drop the player earns from this battle to have the
 *   following armor given at a specific quantity.
 *
 *   Armor ID:
 *   - Which armor do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the forced drop to give the player.
 *
 * ---
 * 
 * === Visual Drop Plugin Commands ===
 * 
 * ---
 *
 * Visual Drops: Visibility
 * - Sets the visibility of visual drops during battle.
 *
 *   Visible:
 *   - Show visual drops during battle?
 *   - This will be reset at the start of next battle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These settings govern the way Visual Drops are handled. These are global
 * rules that apply to all Visual Drops made through this plugin, from the
 * calculations made to determine their radius distance to the number of
 * bounces the drops make to whether or not the drops have shadows.
 *
 * ---
 *
 * General
 * 
 *   Enable?
 *   - Enable Visual Drops?
 *   - You know you want to.
 * 
 *   Reviving Resets Drops:
 *   - Do reviving enemies reset drops?
 *   - For more information, read the Extra Features section.
 *
 * ---
 *
 * Position
 * 
 *   Base Radius:
 *   - Base radius amount for drops.
 * 
 *   +Radius Per Drop:
 *   - Increase radius by this much per extra drop.
 * 
 *   Spin Degrees:
 *   - How many degrees do you want the icon to spin in its largest bounce?
 *   - Use 0 for no spin.
 * 
 *   Delay Between Drops:
 *   - How many milliseconds to delay the appearance of each visual drop?
 *   - Use 0 for no delay.
 * 
 *   Field of View Y:
 *   - What's the distortion rate for the field of view for the item
 *     positioning distribution.
 *
 * ---
 *
 * Bounce
 * 
 *   Bounce Duration:
 *   - Duration of the highest bounce.
 * 
 *   Bounce Total:
 *   - How many times do you want visual drops to bounce?
 *   - Use 0 for no bounces.
 * 
 *   Bounce Height:
 *   - The maximum height for the visual drops to fly out at.
 *   - This will decrease with each bounce.
 * 
 *   Bounce Reduction:
 *   - The rate at which each bounce reduces the duration and height by.
 *
 * ---
 *
 * Bounce SFX
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
 * Icons
 * 
 *   Offset Y Rate:
 *   - At which rate do you want to offset the visual drop icons off the
 *     ground by?
 * 
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 * ---
 *
 * Shadow
 * 
 *   Show Shadow:
 *   - Show the shadow sprite?
 * 
 *   Shadow Filename:
 *   - Filename used for the visual drop shadow.
 * 
 *   Shadow Offset X:
 *   - Offset the shadow sprite X by this amount.
 *   - Negative numbers go left. Positive numbers go right.
 * 
 *   Shadow Offset Y:
 *   - Offset the shadow sprite Y by this amount.
 *   - Negative numbers go up. Positive numbers go down.
 * 
 *   Shadow Opacity:
 *   - Opacity level of the shadow.
 *   - 0 for transparent. 255 for opaque.
 *
 * ---
 *
 * Opacity
 * 
 *   Fade After Bounce:
 *   - Fade out the visual drops after they finish bouncing?
 * 
 *   Fade After Delay:
 *   - How many milliseconds to delay the fading by if the above option is
 *     selected?
 * 
 *   Opacity Fade Speed:
 *   - What speed should the opacity level fade out by?
 *   - Higher numbers are faster.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: EXP Settings
 * ============================================================================
 *
 * EXP can be depicted as a visual drop from the enemy. Depending on how much
 * EXP the enemy would give, a different setting can be used, determining the
 * icon used and which rarity effect to apply.
 *
 * ---
 *
 * General
 * 
 *   Show EXP Drop:
 *   - Show visual drops for EXP?
 *
 * ---
 *
 * Settings 1 through 10
 * 
 *   EXP Value:
 *   - How much EXP minimum to use this setting?
 * 
 *   Icon:
 *   - Which icon to use for this setting?
 * 
 *   Rarity:
 *   - Which rarity to use for this setting?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold can be depicted as a visual drop from the enemy. Depending on how much
 * Gold the enemy would give, a different setting can be used, determining the
 * icon used and which rarity effect to apply.
 *
 * ---
 *
 * General
 * 
 *   Show Gold Drop:
 *   - Show visual drops for Gold?
 *
 * ---
 *
 * Settings 1 through 10
 * 
 *   Gold Value:
 *   - How much Gold minimum to use this setting?
 * 
 *   Icon:
 *   - Which icon to use for this setting?
 * 
 *   Rarity:
 *   - Which rarity to use for this setting?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Drops Settings
 * ============================================================================
 *
 * These are the usual enemy drops that you're used to. These will factor in
 * extra drops, conditional drops, and drops added through JavaScript as well.
 * You can choose to have the enemy drops reveal their real icons or keep it
 * a surprise for when the player finally access the Victory Aftermath screen.
 *
 * ---
 *
 * General
 * 
 *   Show Enemy Drops:
 *   - Show visual drops for enemy drops?
 * 
 *   Use Unique Icons:
 *   - Show the icons of the drops?
 *   - If not, use the ones below.
 *
 * ---
 *
 * Common Icons
 * 
 *   Common Item Icon:
 *   Common Weapon Icon:
 *   Common Armor Icon:
 *   - What icon do you want to use for common items, weapons, and armors?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Rarity Settings
 * ============================================================================
 *
 * Visual Drop rarities are found in 11 tiers, No Rarity and Rarities 1 through
 * 10. How you use these rarities is up to you, the game dev. However, items of
 * a matching rarity level will display the same tints, durations, and flags.
 * Although more flags can be added later through notetags, matching rarities
 * will exhibit a common ground of flags.
 *
 * ---
 *
 * General
 * 
 *   Show Rarities:
 *   - Show visual effects for different rarities?
 *
 * ---
 *
 * No Rarity and Rarities 1 through 10
 * 
 *   Tint:
 *   - Tone settings for this rarity.
 *   - Format: [Red, Green, Blue, Gray]
 * 
 *   Duration:
 *   - What duration do you want for this rarity?
 * 
 *   Flags:
 *   - What flags do you want to apply to this rarity?
 *   - Flags:
 *     - Rainbow
 *     - Additive
 *     - Multiply
 *     - Screen
 *     - Bounce Height x%
 *     - Bounce SFX: filename 
 *     - Spawn SFX: filename
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
 * Version 1.08: January 13, 2022
 * * Feature Update!
 * ** Using a space at the start of a line inbetween batch notetags will no
 *    longer cause the contents inside to not work. Update made by Olivia.
 *
 * Version 1.07: June 18, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.06: March 19, 2021
 * * Bug Fixes!
 * ** Console no longer displays debug messages from last version.
 *    Fix made by Irina.
 * 
 * Version 1.05: February 12, 2021
 * * Bug Fixes!
 * ** Opacity Fade Speed Plugin Parameter now allows you to alter the value
 *    up to 255 now. Fix made by Irina.
 * ** EXP Setting 10 and Gold Setting 10 will no longer be hard limited.
 *    Fix made by Irina.
 * 
 * Version 1.04: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Many of the notetags now have a batch variant to add items, weapons, or
 *    armors into the drop pool en masse. Updated by Yanfly.
 * 
 * Version 1.03: November 22, 2020
 * * Compatibility Update!
 * ** Non-conditional drops should be more compatible with other plugins.
 *    Update made by Yanfly.
 * 
 * Version 1.02: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.01: October 18, 2020
 * * Feature Update!
 * ** Bounce SFX pitch plugin parameter is now uncapped.
 *
 * Version 1.00: October 9, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusRewardsClear
 * @text Bonus Rewards: Clear
 * @desc Clears all bonus drops.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusExpSet
 * @text Bonus Rewards: Set EXP
 * @desc Determines additional EXP the player will get in battle by this value.
 *
 * @arg value:eval
 * @text EXP
 * @desc Determines additional EXP the player will get in battle by this value.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusGoldSet
 * @text Bonus Rewards: Set Gold
 * @desc Determines additional Gold the player will get in battle by this value.
 *
 * @arg value:eval
 * @text Gold
 * @desc Determines additional Gold the player will get in battle by this value.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusAddItem
 * @text Bonus Rewards: Add Item
 * @desc Adds the bonus drop the player earns from this battle to have
 * the following item given at a specific quantity.
 *
 * @arg id:num
 * @text Item ID
 * @type item
 * @desc Which item do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the bonus drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusAddWeapon
 * @text Bonus Rewards: Add Weapon
 * @desc Adds the bonus drop the player earns from this battle to have
 * the following weapon given at a specific quantity.
 *
 * @arg id:num
 * @text Weapon ID
 * @type weapon
 * @desc Which weapon do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the bonus drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusAddArmor
 * @text Bonus Rewards: Add Armor
 * @desc Adds the bonus drop the player earns from this battle to have
 * the following armor given at a specific quantity.
 *
 * @arg id:num
 * @text Armor ID
 * @type armor
 * @desc Which armor do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the bonus drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedRewardsClear
 * @text Forced Rewards: Clear
 * @desc Clears all forced drops.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedExpSet
 * @text Forced Rewards: Set EXP
 * @desc Change the amount of EXP the player will get in battle to this value.
 *
 * @arg value:eval
 * @text EXP
 * @desc Change the amount of EXP the player will get in battle to this value.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedGoldSet
 * @text Forced Rewards: Set Gold
 * @desc Change the amount of Gold the player will get in battle to this value.
 *
 * @arg value:eval
 * @text Gold
 * @desc Change the amount of Gold the player will get in battle to this value.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedAddItem
 * @text Forced Rewards: Add Item
 * @desc Adds the forced drop the player earns from this battle to have
 * the following item given at a specific quantity.
 *
 * @arg id:num
 * @text Item ID
 * @type item
 * @desc Which item do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the forced drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedAddWeapon
 * @text Forced Rewards: Add Weapon
 * @desc Adds the forced drop the player earns from this battle to have
 * the following weapon given at a specific quantity.
 *
 * @arg id:num
 * @text Weapon ID
 * @type weapon
 * @desc Which weapon do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the forced drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedAddArmor
 * @text Forced Rewards: Add Armor
 * @desc Adds the forced drop the player earns from this battle to have
 * the following armor given at a specific quantity.
 *
 * @arg id:num
 * @text Armor ID
 * @type armor
 * @desc Which armor do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the forced drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VisualDropVisible
 * @text Visual Drops: Visibility
 * @desc Sets the visibility of visual drops during battle.
 *
 * @arg Visible:eval
 * @text Visible
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual drops during battle?
 * This will be reset at the start of next battle.
 * @default true
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
 * @param Template
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param VisualDrops
 * @text Visual Drops
 *
 * @param General:struct
 * @text General Settings
 * @parent VisualDrops
 * @type struct<General>
 * @desc General settings regarding Visual Drops.
 * @default {"General":"","Enable:eval":"true","resetOnRevive:eval":"true","Position":"","radius:num":"20","radiusPerIcon:num":"5","angle:num":"1800","msDelay:num":"250","yRateFoV:num":"0.44","Bounce":"","duration:num":"60","bounces:num":"10","height:num":"100","bounceReduction:num":"0.75","SFX":"","sfxFilename:str":"Coin","sfxVolume:num":"90","sfxPitch:num":"100","sfxPan:num":"0","Icons":"","iconOffsetRate:num":"-1.75","iconJumpEasing:str":"Linear","Shadow":"","showShadow:eval":"true","shadowFilename:str":"Shadow1","shadowOffsetX:num":"0","shadowOffsetY:num":"8","shadowOpacity:num":"255","Opacity":"","fadeAfterBounce:eval":"false","fadeAfterDelay:num":"2000","opacityFadeOut:num":"8"}
 *
 * @param Exp:struct
 * @text EXP Settings
 * @parent VisualDrops
 * @type struct<Exp>
 * @desc Settings regarding EXP for Visual Drops.
 * @default {"General":"","show:eval":"true","Setting1":"","Value1:num":"1","Icon1:num":"73","Rarity1:num":"0","Setting2":"","Value2:num":"50","Icon2:num":"73","Rarity2:num":"1","Setting3":"","Value3:num":"100","Icon3:num":"89","Rarity3:num":"2","Setting4":"","Value4:num":"500","Icon4:num":"89","Rarity4:num":"3","Setting5":"","Value5:num":"1000","Icon5:num":"88","Rarity5:num":"4","Setting6":"","Value6:num":"2500","Icon6:num":"88","Rarity6:num":"5","Setting7":"","Value7:num":"5000","Icon7:num":"87","Rarity7:num":"6","Setting8":"","Value8:num":"10000","Icon8:num":"87","Rarity8:num":"7","Setting9":"","Value9:num":"25000","Icon9:num":"84","Rarity9:num":"8","Setting10":"","Value10:num":"50000","Icon10:num":"84","Rarity10:num":"9"}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @parent VisualDrops
 * @type struct<Gold>
 * @desc Settings regarding Gold for Visual Drops.
 * @default {"General":"","show:eval":"true","Setting1":"","Value1:num":"1","Icon1:num":"314","Rarity1:num":"0","Setting2":"","Value2:num":"50","Icon2:num":"314","Rarity2:num":"1","Setting3":"","Value3:num":"100","Icon3:num":"196","Rarity3:num":"2","Setting4":"","Value4:num":"500","Icon4:num":"196","Rarity4:num":"3","Setting5":"","Value5:num":"1000","Icon5:num":"313","Rarity5:num":"4","Setting6":"","Value6:num":"5000","Icon6:num":"313","Rarity6:num":"5","Setting7":"","Value7:num":"10000","Icon7:num":"303","Rarity7:num":"6","Setting8":"","Value8:num":"50000","Icon8:num":"303","Rarity8:num":"7","Setting9":"","Value9:num":"100000","Icon9:num":"300","Rarity9:num":"8","Setting10":"","Value10:num":"500000","Icon10:num":"300","Rarity10:num":"9"}
 *
 * @param Drop:struct
 * @text Enemy Drops Settings
 * @parent VisualDrops
 * @type struct<Drop>
 * @desc Settings regarding enemy drops for Visual Drops.
 * @default {"General":"","show:eval":"true","uniqueIcons:eval":"true","CommonIcons":"","commonItemIcon:num":"208","commonWeaponIcon:num":"210","commonArmorsIcon:num":"210"}
 *
 * @param Rarity:struct
 * @text Rarity Settings
 * @parent VisualDrops
 * @type struct<Rarity>
 * @desc Settings regarding enemy drops for Visual Drops.
 * @default {"General":"","show:eval":"true","Setting0":"","Tint0:eval":"[0, 0, 0, 0]","Duration0:num":"180","Flags0:arraystr":"[]","Setting1":"","Tint1:eval":"[0, 30, 60, 20]","Duration1:num":"180","Flags1:arraystr":"[]","Setting2":"","Tint2:eval":"[30, 60, 0, 40]","Duration2:num":"160","Flags2:arraystr":"[]","Setting3":"","Tint3:eval":"[60, 0, 30, 60]","Duration3:num":"140","Flags3:arraystr":"[]","Setting4":"","Tint4:eval":"[0, 60, 60, 80]","Duration4:num":"120","Flags4:arraystr":"[]","Setting5":"","Tint5:eval":"[60, 60, 0, 100]","Duration5:num":"100","Flags5:arraystr":"[]","Setting6":"","Tint6:eval":"[60, 0, 60, 120]","Duration6:num":"80","Flags6:arraystr":"[]","Setting7":"","Tint7:eval":"[0, 0, 60, 140]","Duration7:num":"70","Flags7:arraystr":"[]","Setting8":"","Tint8:eval":"[0, 60, 0, 160]","Duration8:num":"60","Flags8:arraystr":"[]","Setting9":"","Tint9:eval":"[60, 0, 0, 180]","Duration9:num":"50","Flags9:arraystr":"[]","Setting10":"","Tint10:eval":"[0, 0, 0, 0]","Duration10:num":"40","Flags10:arraystr":"[\"Rainbow\"]","SpecialEffects":"","RainbowHueSpeed:num":"4"}
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
 * @param Enable:eval
 * @text Enable Visual Drops?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Visual Drops?
 * You know you want to.
 * @default true
 *
 * @param resetOnRevive:eval
 * @text Reviving Resets Drops 
 * @parent General
 * @type boolean
 * @on Resets
 * @off Already Set
 * @desc Do reviving enemies reset drops?
 * @default true
 * 
 * @param Position
 *
 * @param radius:num
 * @text Base Radius
 * @parent Position
 * @type number
 * @min 1
 * @desc Base radius amount for drops.
 * @default 20
 *
 * @param radiusPerIcon:num
 * @text +Radius Per Drop
 * @parent Position
 * @type number
 * @min 0
 * @desc Increase radius by this much per extra drop.
 * @default 5
 *
 * @param angle:num
 * @text Spin Degrees
 * @parent Position
 * @type number
 * @min 0
 * @desc How many degrees do you want the icon to spin in its
 * largest bounce? Use 0 for no spin.
 * @default 1800
 *
 * @param msDelay:num
 * @text Delay Between Drops
 * @parent Position
 * @type number
 * @min 0
 * @desc How many milliseconds to delay the appearance of each
 * visual drop? Use 0 for no delay.
 * @default 250
 *
 * @param yRateFoV:num
 * @text Field of View Y
 * @parent Position
 * @desc What's the distortion rate for the field of view
 * for the item positioning distribution.
 * @default 0.44
 * 
 * @param Bounce
 *
 * @param duration:num
 * @text Bounce Duration
 * @parent Bounce
 * @type number
 * @min 1
 * @desc Duration of the highest bounce.
 * @default 60
 *
 * @param bounces:num
 * @text Bounce Total
 * @parent Bounce
 * @type number
 * @min 0
 * @desc How many times do you want visual drops to bounce?
 * Use 0 for no bounces.
 * @default 10
 *
 * @param height:num
 * @text Bounce Height
 * @parent Bounce
 * @type number
 * @min 0
 * @desc The maximum height for the visual drops to fly out at.
 * This will decrease with each bounce.
 * @default 100
 *
 * @param bounceReduction:num
 * @text Bounce Reduction
 * @parent Bounce
 * @desc The rate at which each bounce reduces the duration
 * and height by.
 * @default 0.75
 * 
 * @param SFX
 * @text Bounce SFX
 *
 * @param sfxFilename:str
 * @text Filename
 * @parent SFX
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Coin
 *
 * @param sfxVolume:num
 * @text Volume
 * @parent SFX
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param sfxPitch:num
 * @text Pitch
 * @parent SFX
 * @type number
 * @max 100
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param sfxPan:num
 * @text Pan
 * @parent SFX
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Icons
 *
 * @param iconOffsetRate:num
 * @text Offset Y Rate
 * @parent Icons
 * @desc At which rate do you want to offset the visual drop
 * icons off the ground by?
 * @default -1.75
 *
 * @param iconJumpEasing:str
 * @text Movement Easing
 * @parent Icons
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @param Shadow
 *
 * @param showShadow:eval
 * @text Show Shadow
 * @parent Shadow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the shadow sprite?
 * @default true
 *
 * @param shadowFilename:str
 * @text Shadow Filename
 * @parent Shadow
 * @type file
 * @dir img/system/
 * @desc Filename used for the visual drop shadow.
 * @default Shadow1
 *
 * @param shadowOffsetX:num
 * @text Shadow Offset X
 * @parent Shadow
 * @desc Offset the shadow sprite X by this amount.
 * Negative numbers go left. Positive numbers go right.
 * @default 0
 *
 * @param shadowOffsetY:num
 * @text Shadow Offset Y
 * @parent Shadow
 * @desc Offset the shadow sprite Y by this amount.
 * Negative numbers go up. Positive numbers go down.
 * @default 8
 *
 * @param shadowOpacity:num
 * @text Shadow Opacity
 * @parent Shadow
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity level of the shadow.
 * 0 for transparent. 255 for opaque.
 * @default 255
 * 
 * @param Opacity
 *
 * @param fadeAfterBounce:eval
 * @text Fade After Bounce
 * @parent Opacity
 * @type boolean
 * @on Fade
 * @off Keep
 * @desc Fade out the visual drops after they finish bouncing?
 * @default false
 *
 * @param fadeAfterDelay:num
 * @text Fade After Delay
 * @parent Opacity
 * @type number
 * @min 0
 * @desc How many milliseconds to delay the fading by if the
 * above option is selected?
 * @default 2000
 *
 * @param opacityFadeOut:num
 * @text Opacity Fade Speed
 * @parent Opacity
 * @type number
 * @max 255
 * @desc What speed should the opacity level fade out by?
 * Higher numbers are faster.
 * @default 8
 *
 */
/* ----------------------------------------------------------------------------
 * EXP Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exp:
 * 
 * @param General
 *
 * @param show:eval
 * @text Show EXP Drop
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual drops for EXP?
 * @default true
 * 
 * @param Setting1
 * @text Setting 1
 *
 * @param Value1:num
 * @text EXP Value
 * @parent Setting1
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 1
 *
 * @param Icon1:num
 * @text Icon
 * @parent Setting1
 * @desc Which icon to use for this setting?
 * @default 73
 *
 * @param Rarity1:num
 * @text Rarity
 * @parent Setting1
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 0
 * 
 * @param Setting2
 * @text Setting 2
 *
 * @param Value2:num
 * @text EXP Value
 * @parent Setting2
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 50
 *
 * @param Icon2:num
 * @text Icon
 * @parent Setting2
 * @desc Which icon to use for this setting?
 * @default 73
 *
 * @param Rarity2:num
 * @text Rarity
 * @parent Setting2
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 1
 * 
 * @param Setting3
 * @text Setting 3
 *
 * @param Value3:num
 * @text EXP Value
 * @parent Setting3
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 100
 *
 * @param Icon3:num
 * @text Icon
 * @parent Setting3
 * @desc Which icon to use for this setting?
 * @default 89
 *
 * @param Rarity3:num
 * @text Rarity
 * @parent Setting3
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 2
 * 
 * @param Setting4
 * @text Setting 4
 *
 * @param Value4:num
 * @text EXP Value
 * @parent Setting4
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 500
 *
 * @param Icon4:num
 * @text Icon
 * @parent Setting4
 * @desc Which icon to use for this setting?
 * @default 89
 *
 * @param Rarity4:num
 * @text Rarity
 * @parent Setting4
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 3
 * 
 * @param Setting5
 * @text Setting 5
 *
 * @param Value5:num
 * @text EXP Value
 * @parent Setting5
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 1000
 *
 * @param Icon5:num
 * @text Icon
 * @parent Setting5
 * @desc Which icon to use for this setting?
 * @default 88
 *
 * @param Rarity5:num
 * @text Rarity
 * @parent Setting5
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 4
 * 
 * @param Setting6
 * @text Setting 6
 *
 * @param Value6:num
 * @text EXP Value
 * @parent Setting6
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 2500
 *
 * @param Icon6:num
 * @text Icon
 * @parent Setting6
 * @desc Which icon to use for this setting?
 * @default 88
 *
 * @param Rarity6:num
 * @text Rarity
 * @parent Setting6
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 5
 * 
 * @param Setting7
 * @text Setting 7
 *
 * @param Value7:num
 * @text EXP Value
 * @parent Setting7
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 5000
 *
 * @param Icon7:num
 * @text Icon
 * @parent Setting7
 * @desc Which icon to use for this setting?
 * @default 87
 *
 * @param Rarity7:num
 * @text Rarity
 * @parent Setting7
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 6
 * 
 * @param Setting8
 * @text Setting 8
 *
 * @param Value8:num
 * @text EXP Value
 * @parent Setting8
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 10000
 *
 * @param Icon8:num
 * @text Icon
 * @parent Setting8
 * @desc Which icon to use for this setting?
 * @default 87
 *
 * @param Rarity8:num
 * @text Rarity
 * @parent Setting8
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 7
 * 
 * @param Setting9
 * @text Setting 9
 *
 * @param Value9:num
 * @text EXP Value
 * @parent Setting9
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 25000
 *
 * @param Icon9:num
 * @text Icon
 * @parent Setting9
 * @desc Which icon to use for this setting?
 * @default 84
 *
 * @param Rarity9:num
 * @text Rarity
 * @parent Setting9
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 8
 * 
 * @param Setting10
 * @text Setting 10
 *
 * @param Value10:num
 * @text EXP Value
 * @parent Setting10
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 50000
 *
 * @param Icon10:num
 * @text Icon
 * @parent Setting10
 * @desc Which icon to use for this setting?
 * @default 84
 *
 * @param Rarity10:num
 * @text Rarity
 * @parent Setting10
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 9
 *
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param General
 *
 * @param show:eval
 * @text Show Gold Drop
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual drops for Gold?
 * @default true
 * 
 * @param Setting1
 * @text Setting 1
 *
 * @param Value1:num
 * @text Gold Value
 * @parent Setting1
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 1
 *
 * @param Icon1:num
 * @text Icon
 * @parent Setting1
 * @desc Which icon to use for this setting?
 * @default 314
 *
 * @param Rarity1:num
 * @text Rarity
 * @parent Setting1
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 0
 * 
 * @param Setting2
 * @text Setting 2
 *
 * @param Value2:num
 * @text Gold Value
 * @parent Setting2
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 50
 *
 * @param Icon2:num
 * @text Icon
 * @parent Setting2
 * @desc Which icon to use for this setting?
 * @default 314
 *
 * @param Rarity2:num
 * @text Rarity
 * @parent Setting2
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 1
 * 
 * @param Setting3
 * @text Setting 3
 *
 * @param Value3:num
 * @text Gold Value
 * @parent Setting3
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 100
 *
 * @param Icon3:num
 * @text Icon
 * @parent Setting3
 * @desc Which icon to use for this setting?
 * @default 196
 *
 * @param Rarity3:num
 * @text Rarity
 * @parent Setting3
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 2
 * 
 * @param Setting4
 * @text Setting 4
 *
 * @param Value4:num
 * @text Gold Value
 * @parent Setting4
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 500
 *
 * @param Icon4:num
 * @text Icon
 * @parent Setting4
 * @desc Which icon to use for this setting?
 * @default 196
 *
 * @param Rarity4:num
 * @text Rarity
 * @parent Setting4
 * @type number
 * @desc Which rarity to use for this setting?
 * @default 3
 * 
 * @param Setting5
 * @text Setting 5
 *
 * @param Value5:num
 * @text Gold Value
 * @parent Setting5
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 1000
 *
 * @param Icon5:num
 * @text Icon
 * @parent Setting5
 * @desc Which icon to use for this setting?
 * @default 313
 *
 * @param Rarity5:num
 * @text Rarity
 * @parent Setting5
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 4
 * 
 * @param Setting6
 * @text Setting 6
 *
 * @param Value6:num
 * @text Gold Value
 * @parent Setting6
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 5000
 *
 * @param Icon6:num
 * @text Icon
 * @parent Setting6
 * @desc Which icon to use for this setting?
 * @default 313
 *
 * @param Rarity6:num
 * @text Rarity
 * @parent Setting6
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 5
 * 
 * @param Setting7
 * @text Setting 7
 *
 * @param Value7:num
 * @text Gold Value
 * @parent Setting7
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 10000
 *
 * @param Icon7:num
 * @text Icon
 * @parent Setting7
 * @desc Which icon to use for this setting?
 * @default 303
 *
 * @param Rarity7:num
 * @text Rarity
 * @parent Setting7
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 6
 * 
 * @param Setting8
 * @text Setting 8
 *
 * @param Value8:num
 * @text Gold Value
 * @parent Setting8
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 50000
 *
 * @param Icon8:num
 * @text Icon
 * @parent Setting8
 * @desc Which icon to use for this setting?
 * @default 303
 *
 * @param Rarity8:num
 * @text Rarity
 * @parent Setting8
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 7
 * 
 * @param Setting9
 * @text Setting 9
 *
 * @param Value9:num
 * @text Gold Value
 * @parent Setting9
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 100000
 *
 * @param Icon9:num
 * @text Icon
 * @parent Setting9
 * @desc Which icon to use for this setting?
 * @default 300
 *
 * @param Rarity9:num
 * @text Rarity
 * @parent Setting9
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 8
 * 
 * @param Setting10
 * @text Setting 10
 *
 * @param Value10:num
 * @text Gold Value
 * @parent Setting10
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 500000
 *
 * @param Icon10:num
 * @text Icon
 * @parent Setting10
 * @desc Which icon to use for this setting?
 * @default 300
 *
 * @param Rarity10:num
 * @text Rarity
 * @parent Setting10
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 9
 *
 */
/* ----------------------------------------------------------------------------
 * Drop Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Drop:
 *
 * @param General
 *
 * @param show:eval
 * @text Show Enemy Drops
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual drops for enemy drops?
 * @default true
 *
 * @param uniqueIcons:eval
 * @text Use Unique Icons
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the icons of the drops?
 * If not, use the ones below.
 * @default true
 *
 * @param CommonIcons
 * @text Common Icons
 *
 * @param commonItemIcon:num
 * @text Common Item Icon
 * @parent CommonIcons
 * @desc What icon do you want to use for common items?
 * @default 208
 *
 * @param commonWeaponIcon:num
 * @text Common Weapon Icon
 * @parent CommonIcons
 * @desc What icon do you want to use for common weapons?
 * @default 210
 *
 * @param commonArmorsIcon:num
 * @text Common Armor Icon
 * @parent CommonIcons
 * @desc What icon do you want to use for common armors?
 * @default 210
 *
 */
/* ----------------------------------------------------------------------------
 * Rarity Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Rarity:
 *
 * @param General
 *
 * @param show:eval
 * @text Show Rarities
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual effects for different rarities?
 * @default true
 * 
 * @param Setting0
 * @text No Rarity
 *
 * @param Tint0:eval
 * @text Tint
 * @parent Setting0
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @param Duration0:num
 * @text Duration
 * @parent Setting0
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 180
 *
 * @param Flags0:arraystr
 * @text Flags
 * @parent Setting0
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting1
 * @text Rarity 1
 *
 * @param Tint1:eval
 * @text Tint
 * @parent Setting1
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 30, 60, 20]
 *
 * @param Duration1:num
 * @text Duration
 * @parent Setting1
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 180
 *
 * @param Flags1:arraystr
 * @text Flags
 * @parent Setting1
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting2
 * @text Rarity 2
 *
 * @param Tint2:eval
 * @text Tint
 * @parent Setting2
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [30, 60, 0, 40]
 *
 * @param Duration2:num
 * @text Duration
 * @parent Setting2
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 160
 *
 * @param Flags2:arraystr
 * @text Flags
 * @parent Setting2
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting3
 * @text Rarity 3
 *
 * @param Tint3:eval
 * @text Tint
 * @parent Setting3
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [60, 0, 30, 60]
 *
 * @param Duration3:num
 * @text Duration
 * @parent Setting3
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 140
 *
 * @param Flags3:arraystr
 * @text Flags
 * @parent Setting3
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting4
 * @text Rarity 4
 *
 * @param Tint4:eval
 * @text Tint
 * @parent Setting4
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 60, 60, 80]
 *
 * @param Duration4:num
 * @text Duration
 * @parent Setting4
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 120
 *
 * @param Flags4:arraystr
 * @text Flags
 * @parent Setting4
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting5
 * @text Rarity 5
 *
 * @param Tint5:eval
 * @text Tint
 * @parent Setting5
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [60, 60, 0, 100]
 *
 * @param Duration5:num
 * @text Duration
 * @parent Setting5
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 100
 *
 * @param Flags5:arraystr
 * @text Flags
 * @parent Setting5
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting6
 * @text Rarity 6
 *
 * @param Tint6:eval
 * @text Tint
 * @parent Setting6
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [60, 0, 60, 120]
 *
 * @param Duration6:num
 * @text Duration
 * @parent Setting6
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 80
 *
 * @param Flags6:arraystr
 * @text Flags
 * @parent Setting6
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting7
 * @text Rarity 7
 *
 * @param Tint7:eval
 * @text Tint
 * @parent Setting7
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 60, 140]
 *
 * @param Duration7:num
 * @text Duration
 * @parent Setting7
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 70
 *
 * @param Flags7:arraystr
 * @text Flags
 * @parent Setting7
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting8
 * @text Rarity 8
 *
 * @param Tint8:eval
 * @text Tint
 * @parent Setting8
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 60, 0, 160]
 *
 * @param Duration8:num
 * @text Duration
 * @parent Setting8
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 60
 *
 * @param Flags8:arraystr
 * @text Flags
 * @parent Setting8
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting9
 * @text Rarity 9
 *
 * @param Tint9:eval
 * @text Tint
 * @parent Setting9
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [60, 0, 0, 180]
 *
 * @param Duration9:num
 * @text Duration
 * @parent Setting9
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 50
 *
 * @param Flags9:arraystr
 * @text Flags
 * @parent Setting9
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting10
 * @text Rarity 10
 *
 * @param Tint10:eval
 * @text Tint
 * @parent Setting10
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @param Duration10:num
 * @text Duration
 * @parent Setting10
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 40
 *
 * @param Flags10:arraystr
 * @text Flags
 * @parent Setting10
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default ["Rainbow"]
 * 
 * @param SpecialEffects
 * @text Special Effects
 *
 * @param RainbowHueSpeed:num
 * @text Rainbow Hue Speed
 * @parent SpecialEffects
 * @type number
 * @min 1
 * @desc How fast do you want the Rainbow effect to change hue?
 * @default 4
 *
 */
//=============================================================================

function _0x25fd(_0x155c48,_0x481a67){const _0x28cd18=_0x28cd();return _0x25fd=function(_0x25fda1,_0x103a18){_0x25fda1=_0x25fda1-0x1cc;let _0x2fadbf=_0x28cd18[_0x25fda1];return _0x2fadbf;},_0x25fd(_0x155c48,_0x481a67);}const _0x2afbfb=_0x25fd;function _0x28cd(){const _0x59d5a5=['loadSystem','addExtraEnemyDropsBatch','initialize','VisuMZ_0_CoreEngine','round','addForcedWeaponDrop','show','item','_data','TintDuration0','123pDOyrn','Drop','getArmorIdWithName','Game_Enemy_gold','targetY','shadowOpacity','clearForcedRewards','floor','117tLoEUF','blendMode','_rotationConstant','Game_Troop_clear','numItems','VisuMZ_1_ElementStatusCore','NUM','enemy','flags','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20drops\x20=\x20arguments[0];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Array\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20drops;\x0a\x20\x20\x20\x20','timesStruckItem','updateJumpHeight','32524PKPbsI','playSe','setForcedExp','iconJumpEasing','ITEM','setFlags','none','Game_Troop_expTotal','children','opacityRate','1825460XBxKHf','ForcedAddItem','registerDeathTurn','getStateIdWithName','Game_Enemy_setup','VisualDropVisible','_battlerContainer','EVAL','pow','random','parse','isAlive','initMembers','showShadow','createConditionalDropsTrackedData','Tint%1','_weaponIDs','push','shadowOffsetY','expTotal','lastStruckState','getDeathTurn','split','Rarity','Game_Action_applyItemUserEffect','SKILLS','sortDrops','WEAPON','Duration%1','aliveMembers','Game_BattlerBase_addNewState','rarityTint','resetOnRevive','ForcedAddArmor','prototype','level','constructor','setFrame','getDatabaseItem','setColorTone','opacityFadeOut','format','JSON','Game_Enemy_makeDropItems','rarityDuration','bounces','concat','sfxPitch','false','ExtraEnemyDrops','_elementIDs','timesStruckState','270552vSchoT','1687434BcddYy','updateRotation','createInitialPosition','angle','_conditionalDropsTrackedData','updatePosition','Exp','isSkill','_iconSprite','WEAPONS','275530ncEAVT','setBonusExp','ARMOR','Duration0','charAt','sin','note','ARMORS','updateFlagData','lastStruckElement','_bonusRewards','applyEasing','addExtraEnemyDropsJS','find','length','commonArmorsIcon','bind','Game_Enemy_exp','rarityFrames','convertConditionToCode','max','_forcedRewards','ParseEnemyNotetags','addBonusWeaponDrop','resetVisualDrops','onBattleStart','updateTint','getItemIdWithName','BOUNCE\x20HEIGHT\x20%1%','gold','name','min','Item','getDatabaseKind','RAINBOW','_shadowSprite','_spriteset','true','parameters','Game_BattlerBase_eraseState','createSprites','Scene_Boot_onDatabaseLoaded','iconHeight','getExpGoldDropIcon','iconIndex','timesStruckSType','IconSet','ARRAYSTRUCT','2dlRhyc','bounceReduction','anchor','clamp','shift','Gold','clear','setTargetDestination','isEnemy','_stypeIDs','ARRAYEVAL','Flags%1','registerCommand','startSpecialSFX','addChild','sfxPan','timesStruck%1s','_baseX','lastStruckType','SCREEN','deathTurn','ARRAYFUNC','setBonusGold','createVisualDrops','STR','getDatabaseItemID','update','ParseAllNotetags','iconOffsetRate','getElementIdWithName','drops','createDrops','msDelay','Linear','members','ConvertParams','getDatabase','filter','addTimesStruck','_visualDrops','Settings','STATE','checkValidDrop','ForcedAddWeapon','hue','addBonusArmorDrop','process_VisuMZ_ExtraEnemyDrops_Notetags','_itemIDs','onDatabaseLoaded','_skillIDs','isSceneBattle','applyItemUserEffect','deathStateId','applyTimesStruck','battleMembers','createShadowSprite','trim','BonusRewardsClear','MULTIPLY','sfxVolume','setRarity','makeDeepCopy','version','_scene','process_VisuMZ_ExtraEnemyDrops_Drops_Notetags','BonusAddItem','timesStruckSkills','slice','elementId','dropItems','randomInt','lastStruckItem','_baseY','STRUCT','lastStruck%1','calculatePosition','jumpHeight','Spriteset_Battle_createLowerLayer','duration','createLowerLayer','343zJKzOI','restoreVisualDrops','dataId','BonusAddArmor','Game_Troop_makeDropItems','updateFlags','SPAWN\x20SFX:\x20%1','targetOpacity','VisualDrops','timesStruck%1','setForcedGold','quantity','getConditionalDropsTrackedData','isItem','ForcedGoldSet','addVisualDrops','opacity','isArmor','Element','battler','exp','SType','process_VisuMZ_ExtraEnemyDrops_JS_Notetags','baseX','map','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','makeDropItems','SKILL','Flags0','33416OeGzKp','calculateJumpHeight','replace','height','Tint0','includes','ApplyEasing','damage','_armorIDs','addNewState','startFadeOut','toUpperCase','elements','expRate','BonusExpSet','_visualDropsVisible','isStateAffected','addForcedItemDrop','eraseState','ForcedRewardsClear','lastStruckSType','STATES','BattleManager_initMembers','yRateFoV','dropItemRate','call','baseY','denominator','getItemDropIcons','_visualDropSprites','status','deadMembers','turnCount','createJS','Game_Battler_onBattleStart','getStypeIdWithName','isDead','addExtraEnemyDropsConditional','targetX','shadowFilename','match','setHue','kind','goldRate','VisuMZ_1_BattleCore','value','attackElements','General','getWeaponIdWithName','Enable','radiusPerIcon','description','ITEMS','addBonusItemDrop','updateOpacity','setup','addExtraEnemyDropsSingles','_stateIDs','Skill','sfxFilename','createIconSprite','findTargetDropSprite','createChildren','12232913QjrFZR','isWeapon','skillTypes','exit','meetsExtraEnemyDropsCondition','Visible','clearBonusRewards','getSkillIdWithName','addForcedArmorDrop','addExtraEnemyDrops','updateDuration','Game_Troop_goldTotal','commonItemIcon'];_0x28cd=function(){return _0x59d5a5;};return _0x28cd();}(function(_0x1d84a2,_0x2bb2ff){const _0xbc3b24=_0x25fd,_0x51f0f8=_0x1d84a2();while(!![]){try{const _0x71a31f=parseInt(_0xbc3b24(0x246))/0x1*(parseInt(_0xbc3b24(0x20b))/0x2)+-parseInt(_0xbc3b24(0x309))/0x3*(parseInt(_0xbc3b24(0x1cd))/0x4)+-parseInt(_0xbc3b24(0x1d7))/0x5+-parseInt(_0xbc3b24(0x20c))/0x6+-parseInt(_0xbc3b24(0x296))/0x7*(-parseInt(_0xbc3b24(0x2b3))/0x8)+parseInt(_0xbc3b24(0x311))/0x9*(-parseInt(_0xbc3b24(0x216))/0xa)+parseInt(_0xbc3b24(0x2f2))/0xb;if(_0x71a31f===_0x2bb2ff)break;else _0x51f0f8['push'](_0x51f0f8['shift']());}catch(_0x1ee327){_0x51f0f8['push'](_0x51f0f8['shift']());}}}(_0x28cd,0x3ce49));var label=_0x2afbfb(0x208),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2afbfb(0x26b)](function(_0x2c4356){const _0x1e499e=_0x2afbfb;return _0x2c4356[_0x1e499e(0x2d1)]&&_0x2c4356[_0x1e499e(0x2e6)][_0x1e499e(0x2b8)]('['+label+']');})[0x0];VisuMZ[label][_0x2afbfb(0x26e)]=VisuMZ[label][_0x2afbfb(0x26e)]||{},VisuMZ[_0x2afbfb(0x269)]=function(_0x14542f,_0xc0b128){const _0x28a649=_0x2afbfb;for(const _0x1b9bcc in _0xc0b128){if(_0x1b9bcc[_0x28a649(0x2db)](/(.*):(.*)/i)){const _0x4d718d=String(RegExp['$1']),_0x2995fc=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x205fda,_0x203610,_0x53ad74;switch(_0x2995fc){case _0x28a649(0x317):_0x205fda=_0xc0b128[_0x1b9bcc]!==''?Number(_0xc0b128[_0x1b9bcc]):0x0;break;case'ARRAYNUM':_0x203610=_0xc0b128[_0x1b9bcc]!==''?JSON['parse'](_0xc0b128[_0x1b9bcc]):[],_0x205fda=_0x203610[_0x28a649(0x2ae)](_0x5967c4=>Number(_0x5967c4));break;case _0x28a649(0x1de):_0x205fda=_0xc0b128[_0x1b9bcc]!==''?eval(_0xc0b128[_0x1b9bcc]):null;break;case _0x28a649(0x250):_0x203610=_0xc0b128[_0x1b9bcc]!==''?JSON[_0x28a649(0x1e1)](_0xc0b128[_0x1b9bcc]):[],_0x205fda=_0x203610[_0x28a649(0x2ae)](_0x3a8af5=>eval(_0x3a8af5));break;case _0x28a649(0x201):_0x205fda=_0xc0b128[_0x1b9bcc]!==''?JSON['parse'](_0xc0b128[_0x1b9bcc]):'';break;case'ARRAYJSON':_0x203610=_0xc0b128[_0x1b9bcc]!==''?JSON[_0x28a649(0x1e1)](_0xc0b128[_0x1b9bcc]):[],_0x205fda=_0x203610[_0x28a649(0x2ae)](_0x290c37=>JSON[_0x28a649(0x1e1)](_0x290c37));break;case'FUNC':_0x205fda=_0xc0b128[_0x1b9bcc]!==''?new Function(JSON[_0x28a649(0x1e1)](_0xc0b128[_0x1b9bcc])):new Function('return\x200');break;case _0x28a649(0x25b):_0x203610=_0xc0b128[_0x1b9bcc]!==''?JSON[_0x28a649(0x1e1)](_0xc0b128[_0x1b9bcc]):[],_0x205fda=_0x203610[_0x28a649(0x2ae)](_0x1cce5c=>new Function(JSON[_0x28a649(0x1e1)](_0x1cce5c)));break;case _0x28a649(0x25e):_0x205fda=_0xc0b128[_0x1b9bcc]!==''?String(_0xc0b128[_0x1b9bcc]):'';break;case'ARRAYSTR':_0x203610=_0xc0b128[_0x1b9bcc]!==''?JSON[_0x28a649(0x1e1)](_0xc0b128[_0x1b9bcc]):[],_0x205fda=_0x203610[_0x28a649(0x2ae)](_0x5f5b8f=>String(_0x5f5b8f));break;case _0x28a649(0x28f):_0x53ad74=_0xc0b128[_0x1b9bcc]!==''?JSON[_0x28a649(0x1e1)](_0xc0b128[_0x1b9bcc]):{},_0x205fda=VisuMZ[_0x28a649(0x269)]({},_0x53ad74);break;case _0x28a649(0x245):_0x203610=_0xc0b128[_0x1b9bcc]!==''?JSON['parse'](_0xc0b128[_0x1b9bcc]):[],_0x205fda=_0x203610[_0x28a649(0x2ae)](_0x4f549c=>VisuMZ[_0x28a649(0x269)]({},JSON[_0x28a649(0x1e1)](_0x4f549c)));break;default:continue;}_0x14542f[_0x4d718d]=_0x205fda;}}return _0x14542f;},(_0x211b0c=>{const _0x44424a=_0x2afbfb,_0x579cae=_0x211b0c['name'];for(const _0x416009 of dependencies){if(!Imported[_0x416009]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x44424a(0x200)](_0x579cae,_0x416009)),SceneManager[_0x44424a(0x2f5)]();break;}}const _0x58161b=_0x211b0c[_0x44424a(0x2e6)];if(_0x58161b['match'](/\[Version[ ](.*?)\]/i)){const _0x30c2ee=Number(RegExp['$1']);_0x30c2ee!==VisuMZ[label][_0x44424a(0x284)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x44424a(0x200)](_0x579cae,_0x30c2ee)),SceneManager[_0x44424a(0x2f5)]());}if(_0x58161b[_0x44424a(0x2db)](/\[Tier[ ](\d+)\]/i)){const _0xa255df=Number(RegExp['$1']);_0xa255df<tier?(alert(_0x44424a(0x2af)['format'](_0x579cae,_0xa255df,tier)),SceneManager[_0x44424a(0x2f5)]()):tier=Math[_0x44424a(0x22a)](_0xa255df,tier);}VisuMZ[_0x44424a(0x269)](VisuMZ[label]['Settings'],_0x211b0c[_0x44424a(0x23c)]);})(pluginData),PluginManager[_0x2afbfb(0x252)](pluginData[_0x2afbfb(0x234)],_0x2afbfb(0x27f),_0x1d2b54=>{const _0xf8f3c4=_0x2afbfb;VisuMZ[_0xf8f3c4(0x269)](_0x1d2b54,_0x1d2b54),$gameTroop[_0xf8f3c4(0x2f8)]();}),PluginManager[_0x2afbfb(0x252)](pluginData[_0x2afbfb(0x234)],_0x2afbfb(0x2c1),_0x29ec67=>{const _0x4c404e=_0x2afbfb;VisuMZ[_0x4c404e(0x269)](_0x29ec67,_0x29ec67);const _0x7533af=_0x29ec67[_0x4c404e(0x2e0)];$gameTroop[_0x4c404e(0x217)](_0x7533af);}),PluginManager[_0x2afbfb(0x252)](pluginData[_0x2afbfb(0x234)],'BonusGoldSet',_0x1c2d79=>{const _0x28943c=_0x2afbfb;VisuMZ[_0x28943c(0x269)](_0x1c2d79,_0x1c2d79);const _0x3c2e79=_0x1c2d79[_0x28943c(0x2e0)];$gameTroop[_0x28943c(0x25c)](_0x3c2e79);}),PluginManager[_0x2afbfb(0x252)](pluginData[_0x2afbfb(0x234)],_0x2afbfb(0x287),_0x232712=>{const _0x4b3d22=_0x2afbfb;VisuMZ[_0x4b3d22(0x269)](_0x232712,_0x232712);const _0x2e54c7=_0x232712['id'],_0x5708b0=_0x232712[_0x4b3d22(0x2a1)];$gameTroop[_0x4b3d22(0x2e8)](_0x2e54c7,_0x5708b0);}),PluginManager[_0x2afbfb(0x252)](pluginData[_0x2afbfb(0x234)],'BonusAddWeapon',_0x80db97=>{const _0x178409=_0x2afbfb;VisuMZ[_0x178409(0x269)](_0x80db97,_0x80db97);const _0x20d0df=_0x80db97['id'],_0x1a7394=_0x80db97[_0x178409(0x2a1)];$gameTroop[_0x178409(0x22d)](_0x20d0df,_0x1a7394);}),PluginManager[_0x2afbfb(0x252)](pluginData['name'],_0x2afbfb(0x299),_0x3e7e3a=>{const _0x12efb1=_0x2afbfb;VisuMZ[_0x12efb1(0x269)](_0x3e7e3a,_0x3e7e3a);const _0x4bd79d=_0x3e7e3a['id'],_0x51d533=_0x3e7e3a['quantity'];$gameTroop[_0x12efb1(0x273)](_0x4bd79d,_0x51d533);}),PluginManager[_0x2afbfb(0x252)](pluginData[_0x2afbfb(0x234)],_0x2afbfb(0x2c6),_0x2fa9f7=>{const _0x4c83e8=_0x2afbfb;VisuMZ[_0x4c83e8(0x269)](_0x2fa9f7,_0x2fa9f7),$gameTroop[_0x4c83e8(0x30f)]();}),PluginManager['registerCommand'](pluginData[_0x2afbfb(0x234)],'ForcedExpSet',_0x33199e=>{const _0x1bbca5=_0x2afbfb;VisuMZ[_0x1bbca5(0x269)](_0x33199e,_0x33199e);const _0x479037=_0x33199e[_0x1bbca5(0x2e0)];$gameTroop[_0x1bbca5(0x1cf)](_0x479037);}),PluginManager['registerCommand'](pluginData[_0x2afbfb(0x234)],_0x2afbfb(0x2a4),_0x21c901=>{const _0x3e8d54=_0x2afbfb;VisuMZ[_0x3e8d54(0x269)](_0x21c901,_0x21c901);const _0x4bd313=_0x21c901[_0x3e8d54(0x2e0)];$gameTroop[_0x3e8d54(0x2a0)](_0x4bd313);}),PluginManager['registerCommand'](pluginData['name'],_0x2afbfb(0x1d8),_0x5e9e57=>{const _0x1e7579=_0x2afbfb;VisuMZ[_0x1e7579(0x269)](_0x5e9e57,_0x5e9e57);const _0x933cb0=_0x5e9e57['id'],_0x3beb7d=_0x5e9e57['quantity'];$gameTroop[_0x1e7579(0x2c4)](_0x933cb0,_0x3beb7d);}),PluginManager[_0x2afbfb(0x252)](pluginData[_0x2afbfb(0x234)],_0x2afbfb(0x271),_0x5de647=>{const _0x3a74da=_0x2afbfb;VisuMZ['ConvertParams'](_0x5de647,_0x5de647);const _0x17fead=_0x5de647['id'],_0x4cc81e=_0x5de647[_0x3a74da(0x2a1)];$gameTroop[_0x3a74da(0x304)](_0x17fead,_0x4cc81e);}),PluginManager[_0x2afbfb(0x252)](pluginData[_0x2afbfb(0x234)],_0x2afbfb(0x1f8),_0xa6c595=>{const _0x4f1968=_0x2afbfb;VisuMZ[_0x4f1968(0x269)](_0xa6c595,_0xa6c595);const _0x573111=_0xa6c595['id'],_0x3fe075=_0xa6c595['quantity'];$gameTroop['addForcedArmorDrop'](_0x573111,_0x3fe075);}),PluginManager['registerCommand'](pluginData[_0x2afbfb(0x234)],_0x2afbfb(0x1dc),_0x4887c6=>{const _0x5c77f4=_0x2afbfb;VisuMZ[_0x5c77f4(0x269)](_0x4887c6,_0x4887c6);const _0x22c1a9=_0x4887c6[_0x5c77f4(0x2f7)];BattleManager[_0x5c77f4(0x2c2)]=_0x22c1a9;}),VisuMZ[_0x2afbfb(0x208)][_0x2afbfb(0x23f)]=Scene_Boot[_0x2afbfb(0x1f9)][_0x2afbfb(0x276)],Scene_Boot['prototype'][_0x2afbfb(0x276)]=function(){const _0x2131c5=_0x2afbfb;VisuMZ[_0x2131c5(0x208)]['Scene_Boot_onDatabaseLoaded'][_0x2131c5(0x2cc)](this),this[_0x2131c5(0x274)]();},Scene_Boot[_0x2afbfb(0x1f9)]['process_VisuMZ_ExtraEnemyDrops_Notetags']=function(){const _0x3df468=_0x2afbfb;if(VisuMZ[_0x3df468(0x261)])return;this[_0x3df468(0x286)](),this[_0x3df468(0x2ac)]();},Scene_Boot[_0x2afbfb(0x1f9)]['process_VisuMZ_ExtraEnemyDrops_Drops_Notetags']=function(){const _0x2a4e9d=_0x2afbfb;for(const _0x19e6bf of $dataEnemies){if(!_0x19e6bf)continue;VisuMZ[_0x2a4e9d(0x208)][_0x2a4e9d(0x265)](_0x19e6bf);}},Scene_Boot[_0x2afbfb(0x1f9)][_0x2afbfb(0x2ac)]=function(){const _0x3f2cd9=_0x2afbfb;for(const _0x50d126 of $dataEnemies){if(!_0x50d126)continue;if(_0x50d126['note'][_0x3f2cd9(0x2db)](/<JS DROPS>\s*([\s\S]*)\s*<\/JS DROPS>/i)){const _0xe37578=String(RegExp['$1']);VisuMZ[_0x3f2cd9(0x208)][_0x3f2cd9(0x2d4)](_0x50d126,_0xe37578);}}},VisuMZ['ExtraEnemyDrops']['ParseEnemyNotetags']=VisuMZ[_0x2afbfb(0x22c)],VisuMZ[_0x2afbfb(0x22c)]=function(_0x3acf6f){const _0xca0a18=_0x2afbfb;VisuMZ[_0xca0a18(0x208)]['ParseEnemyNotetags'][_0xca0a18(0x2cc)](this,_0x3acf6f),VisuMZ[_0xca0a18(0x208)][_0xca0a18(0x265)](_0x3acf6f);if(_0x3acf6f[_0xca0a18(0x21c)][_0xca0a18(0x2db)](/<JS DROPS>\s*([\s\S]*)\s*<\/JS DROPS>/i)){const _0x417305=String(RegExp['$1']);VisuMZ[_0xca0a18(0x208)][_0xca0a18(0x2d4)](_0x3acf6f,_0x417305);}},VisuMZ[_0x2afbfb(0x208)]['createDrops']=function(_0x4e4ecc){const _0x50236a=_0x2afbfb,_0x4a45ce=_0x4e4ecc[_0x50236a(0x21c)],_0x1cece9=_0x4a45ce[_0x50236a(0x2db)](/<(.*?) (?:DROP|DROPS)[ ](.*):[ ](\d+)([%％])>/gi);if(_0x1cece9)for(const _0x34d323 of _0x1cece9){const _0x1457a6={'kind':0x0,'dataId':0x0,'denominator':0x1};if(_0x34d323['match'](/<(.*?) (?:DROP|DROPS)[ ](\d+)[ ](?:THROUGH|to)[ ](\d+):[ ](\d+)([%％])>/i)){const _0x4aa02c=VisuMZ['ExtraEnemyDrops'][_0x50236a(0x237)](RegExp['$1']),_0x5d220c=Number(RegExp['$2']),_0x33b14e=Number(RegExp['$3']),_0x3be507=0x1/(Number(RegExp['$4'])*0.01);if(_0x4aa02c>0x0)for(let _0x61950=_0x5d220c;_0x61950<=_0x33b14e;_0x61950++){const _0x1d27fe={'kind':_0x4aa02c,'dataId':_0x61950,'denominator':_0x3be507};VisuMZ[_0x50236a(0x208)][_0x50236a(0x270)](_0x1d27fe)&&_0x4e4ecc[_0x50236a(0x28b)][_0x50236a(0x1e8)](_0x1d27fe);}continue;}else{if(_0x34d323['match'](/<(.*?) (?:DROP|DROPS)[ ](\d+):[ ](\d+)([%％])>/i))_0x1457a6[_0x50236a(0x2dd)]=VisuMZ[_0x50236a(0x208)]['getDatabaseKind'](RegExp['$1']),_0x1457a6[_0x50236a(0x298)]=Number(RegExp['$2']),_0x1457a6[_0x50236a(0x2ce)]=0x1/(Number(RegExp['$3'])*0.01);else{if(_0x34d323[_0x50236a(0x2db)](/<(.*?) (?:DROP|DROPS)[ ](.*):[ ](\d+)([%％])>/i))_0x1457a6[_0x50236a(0x2dd)]=VisuMZ[_0x50236a(0x208)]['getDatabaseKind'](RegExp['$1']),_0x1457a6[_0x50236a(0x298)]=VisuMZ[_0x50236a(0x208)][_0x50236a(0x25f)](RegExp['$1'],RegExp['$2']),_0x1457a6['denominator']=0x1/(Number(RegExp['$3'])*0.01);else continue;}}if(_0x1457a6[_0x50236a(0x2dd)]<0x0||_0x1457a6[_0x50236a(0x298)]<0x0)continue;_0x4e4ecc[_0x50236a(0x28b)]['push'](_0x1457a6);}if(_0x4a45ce[_0x50236a(0x2db)](/<(?:DROP|DROPS)>\s*([\s\S]*)\s*<\/(?:DROP|DROPS)>/i)){const _0x5c6c1a=String(RegExp['$1']),_0x34d422=_0x5c6c1a[_0x50236a(0x2db)](/(.*?)[ ](.*):[ ](\d+)([%％])/gi);if(_0x34d422)for(let _0x40559a of _0x34d422){_0x40559a=_0x40559a[_0x50236a(0x27e)]();const _0x2702c2={'kind':0x0,'dataId':0x0,'denominator':0x1};if(_0x40559a[_0x50236a(0x2db)](/(.*?)[ ](\d+)[ ](?:THROUGH|to)[ ](\d+):[ ](\d+)([%％])/i)){const _0x3c9d1d=VisuMZ[_0x50236a(0x208)][_0x50236a(0x237)](RegExp['$1']),_0x5ddbce=Number(RegExp['$2']),_0x34e5d7=Number(RegExp['$3']),_0xc89333=0x1/(Number(RegExp['$4'])*0.01);if(_0x3c9d1d>0x0)for(let _0x2b84b2=_0x5ddbce;_0x2b84b2<=_0x34e5d7;_0x2b84b2++){const _0x4a7236={'kind':_0x3c9d1d,'dataId':_0x2b84b2,'denominator':_0xc89333};VisuMZ[_0x50236a(0x208)][_0x50236a(0x270)](_0x4a7236)&&_0x4e4ecc[_0x50236a(0x28b)][_0x50236a(0x1e8)](_0x4a7236);}continue;}else{if(_0x40559a['match'](/(.*?)[ ](\d+):[ ](\d+)([%％])/i))_0x2702c2[_0x50236a(0x2dd)]=VisuMZ[_0x50236a(0x208)][_0x50236a(0x237)](RegExp['$1']),_0x2702c2[_0x50236a(0x298)]=Number(RegExp['$2']),_0x2702c2[_0x50236a(0x2ce)]=0x1/(Number(RegExp['$3'])*0.01);else{if(_0x40559a[_0x50236a(0x2db)](/(.*?)[ ](.*):[ ](\d+)([%％])/i))_0x2702c2['kind']=VisuMZ['ExtraEnemyDrops'][_0x50236a(0x237)](RegExp['$1']),_0x2702c2[_0x50236a(0x298)]=VisuMZ[_0x50236a(0x208)][_0x50236a(0x25f)](RegExp['$1'],RegExp['$2']),_0x2702c2[_0x50236a(0x2ce)]=0x1/(Number(RegExp['$3'])*0.01);else continue;}}if(_0x2702c2[_0x50236a(0x2dd)]<0x0||_0x2702c2[_0x50236a(0x298)]<0x0)continue;_0x4e4ecc[_0x50236a(0x28b)][_0x50236a(0x1e8)](_0x2702c2);}}},VisuMZ[_0x2afbfb(0x208)][_0x2afbfb(0x270)]=function(_0x481a37){const _0x367f19=_0x2afbfb;if(!_0x481a37)return![];const _0x4351ba=_0x481a37['kind'],_0x6b325c=_0x481a37[_0x367f19(0x298)];let _0xa1df59=null;if(_0x4351ba===0x1)_0xa1df59=$dataItems[_0x6b325c];else{if(_0x4351ba===0x2)_0xa1df59=$dataWeapons[_0x6b325c];else _0x4351ba===0x3?_0xa1df59=$dataArmors[_0x6b325c]:_0xa1df59=null;}if(!_0xa1df59)return![];if(_0xa1df59[_0x367f19(0x234)][_0x367f19(0x27e)]()==='')return![];if(_0xa1df59[_0x367f19(0x234)][_0x367f19(0x2db)](/-----/i))return![];return!![];},VisuMZ[_0x2afbfb(0x208)]['JS']={},VisuMZ[_0x2afbfb(0x208)][_0x2afbfb(0x2d4)]=function(_0x4babac,_0x32dd60){const _0x2ea8ea=_0x2afbfb,_0x20a2ff=_0x2ea8ea(0x31a)[_0x2ea8ea(0x200)](_0x32dd60),_0x4449ab=_0x4babac['id'];VisuMZ[_0x2ea8ea(0x208)]['JS'][_0x4449ab]=new Function(_0x20a2ff);},DataManager['getItemIdWithName']=function(_0x5dc1b9){const _0xecc50d=_0x2afbfb;_0x5dc1b9=_0x5dc1b9[_0xecc50d(0x2be)]()[_0xecc50d(0x27e)](),this['_itemIDs']=this[_0xecc50d(0x275)]||{};if(this['_itemIDs'][_0x5dc1b9])return this[_0xecc50d(0x275)][_0x5dc1b9];for(const _0x2e1ebc of $dataItems){if(!_0x2e1ebc)continue;this['_itemIDs'][_0x2e1ebc['name'][_0xecc50d(0x2be)]()[_0xecc50d(0x27e)]()]=_0x2e1ebc['id'];}return this['_itemIDs'][_0x5dc1b9]||0x0;},DataManager[_0x2afbfb(0x2e3)]=function(_0x334c9e){const _0x4d1df2=_0x2afbfb;_0x334c9e=_0x334c9e[_0x4d1df2(0x2be)]()[_0x4d1df2(0x27e)](),this[_0x4d1df2(0x1e7)]=this[_0x4d1df2(0x1e7)]||{};if(this['_weaponIDs'][_0x334c9e])return this[_0x4d1df2(0x1e7)][_0x334c9e];for(const _0xa9c274 of $dataWeapons){if(!_0xa9c274)continue;this[_0x4d1df2(0x1e7)][_0xa9c274[_0x4d1df2(0x234)][_0x4d1df2(0x2be)]()['trim']()]=_0xa9c274['id'];}return this[_0x4d1df2(0x1e7)][_0x334c9e]||0x0;},DataManager[_0x2afbfb(0x30b)]=function(_0x14557e){const _0xf4f59b=_0x2afbfb;_0x14557e=_0x14557e[_0xf4f59b(0x2be)]()[_0xf4f59b(0x27e)](),this[_0xf4f59b(0x2bb)]=this[_0xf4f59b(0x2bb)]||{};if(this[_0xf4f59b(0x2bb)][_0x14557e])return this[_0xf4f59b(0x2bb)][_0x14557e];for(const _0x337dcf of $dataArmors){if(!_0x337dcf)continue;this['_armorIDs'][_0x337dcf['name'][_0xf4f59b(0x2be)]()[_0xf4f59b(0x27e)]()]=_0x337dcf['id'];}return this['_armorIDs'][_0x14557e]||0x0;},DataManager['getSkillIdWithName']=function(_0x3bbda2){const _0x8f559c=_0x2afbfb;_0x3bbda2=_0x3bbda2[_0x8f559c(0x2be)]()[_0x8f559c(0x27e)](),this['_skillIDs']=this[_0x8f559c(0x277)]||{};if(this[_0x8f559c(0x277)][_0x3bbda2])return this['_skillIDs'][_0x3bbda2];for(const _0x26376b of $dataSkills){if(!_0x26376b)continue;this['_skillIDs'][_0x26376b['name'][_0x8f559c(0x2be)]()['trim']()]=_0x26376b['id'];}return this[_0x8f559c(0x277)][_0x3bbda2]||0x0;},DataManager[_0x2afbfb(0x2d6)]=function(_0x1498ec){const _0x50ca14=_0x2afbfb;_0x1498ec=_0x1498ec[_0x50ca14(0x2be)]()['trim'](),this[_0x50ca14(0x24f)]=this[_0x50ca14(0x24f)]||{};if(this[_0x50ca14(0x24f)][_0x1498ec])return this[_0x50ca14(0x24f)][_0x1498ec];for(let _0x3c889b=0x1;_0x3c889b<0x64;_0x3c889b++){if(!$dataSystem[_0x50ca14(0x2f4)][_0x3c889b])continue;let _0x504ab8=$dataSystem['skillTypes'][_0x3c889b][_0x50ca14(0x2be)]()['trim']();_0x504ab8=_0x504ab8[_0x50ca14(0x2b5)](/\x1I\[(\d+)\]/gi,''),_0x504ab8=_0x504ab8['replace'](/\\I\[(\d+)\]/gi,''),this[_0x50ca14(0x24f)][_0x504ab8]=_0x3c889b;}return this[_0x50ca14(0x24f)][_0x1498ec]||0x0;},DataManager['getStateIdWithName']=function(_0x2e2897){const _0x5701ad=_0x2afbfb;_0x2e2897=_0x2e2897[_0x5701ad(0x2be)]()[_0x5701ad(0x27e)](),this['_stateIDs']=this[_0x5701ad(0x2ec)]||{};if(this[_0x5701ad(0x2ec)][_0x2e2897])return this[_0x5701ad(0x2ec)][_0x2e2897];for(const _0xf9f20e of $dataStates){if(!_0xf9f20e)continue;this['_stateIDs'][_0xf9f20e[_0x5701ad(0x234)][_0x5701ad(0x2be)]()['trim']()]=_0xf9f20e['id'];}return this['_stateIDs'][_0x2e2897]||0x0;},DataManager['getElementIdWithName']=function(_0x57a765){const _0x2ef0b0=_0x2afbfb;_0x57a765=_0x57a765[_0x2ef0b0(0x2be)]()[_0x2ef0b0(0x27e)](),this[_0x2ef0b0(0x209)]=this[_0x2ef0b0(0x209)]||{};if(this['_elementIDs'][_0x57a765])return this[_0x2ef0b0(0x209)][_0x57a765];let _0x198b2f=0x1;for(const _0x4bd8bd of $dataSystem[_0x2ef0b0(0x2bf)]){if(!_0x4bd8bd)continue;let _0x558cff=_0x4bd8bd[_0x2ef0b0(0x2be)]();_0x558cff=_0x558cff['replace'](/\x1I\[(\d+)\]/gi,''),_0x558cff=_0x558cff[_0x2ef0b0(0x2b5)](/\\I\[(\d+)\]/gi,''),this[_0x2ef0b0(0x209)][_0x558cff]=_0x198b2f,_0x198b2f++;}return this[_0x2ef0b0(0x209)][_0x57a765]||0x0;},SceneManager[_0x2afbfb(0x278)]=function(){const _0x16c054=_0x2afbfb;return this['_scene']&&this[_0x16c054(0x285)][_0x16c054(0x1fb)]===Scene_Battle;},VisuMZ[_0x2afbfb(0x208)][_0x2afbfb(0x1ef)]=Game_Action[_0x2afbfb(0x1f9)][_0x2afbfb(0x279)],Game_Action[_0x2afbfb(0x1f9)][_0x2afbfb(0x279)]=function(_0x1fe6fd){const _0x157e5f=_0x2afbfb;_0x1fe6fd[_0x157e5f(0x27b)](this),VisuMZ[_0x157e5f(0x208)][_0x157e5f(0x1ef)][_0x157e5f(0x2cc)](this,_0x1fe6fd);},VisuMZ[_0x2afbfb(0x208)]['Game_Battler_onBattleStart']=Game_Battler[_0x2afbfb(0x1f9)][_0x2afbfb(0x22f)],Game_Battler[_0x2afbfb(0x1f9)][_0x2afbfb(0x22f)]=function(_0x3b3794){const _0x1557bc=_0x2afbfb;VisuMZ['ExtraEnemyDrops'][_0x1557bc(0x2d5)][_0x1557bc(0x2cc)](this,_0x3b3794),this[_0x1557bc(0x1e5)]();},Game_Battler[_0x2afbfb(0x1f9)][_0x2afbfb(0x1e5)]=function(){const _0x16bb93=_0x2afbfb;this[_0x16bb93(0x210)]={'deathTurn':0x0,'timesStruckSkills':{},'timesStruckSTypes':{},'timesStruckItems':{},'timesStruckStates':{},'timesStruckElements':{},'lastStruckType':_0x16bb93(0x1d3),'lastStruckSkill':0x0,'lastStruckSType':0x0,'lastStruckItem':0x0,'lastStruckState':0x0,'lastStruckElement':0x0};},Game_Battler[_0x2afbfb(0x1f9)][_0x2afbfb(0x2a2)]=function(){const _0x3ccd35=_0x2afbfb;return this['_conditionalDropsTrackedData']===undefined&&this[_0x3ccd35(0x1e5)](),this[_0x3ccd35(0x210)];},Game_Battler[_0x2afbfb(0x1f9)]['getDeathTurn']=function(){const _0x418d8a=_0x2afbfb;return this[_0x418d8a(0x2a2)]()['deathTurn']||0x0;},Game_Battler['prototype']['addTimesStruck']=function(_0x5c3305,_0x12a61a,_0x252bdd){const _0x42da3c=_0x2afbfb,_0x3f4e9b=this[_0x42da3c(0x2a2)]();_0x252bdd=_0x252bdd||0x1;const _0x5196e7=_0x42da3c(0x256)[_0x42da3c(0x200)](_0x5c3305);if(!_0x3f4e9b[_0x5196e7])return;_0x3f4e9b[_0x5196e7][_0x12a61a]=_0x3f4e9b[_0x5196e7][_0x12a61a]||0x0,_0x3f4e9b[_0x5196e7][_0x12a61a]+=_0x252bdd;const _0x349578=_0x42da3c(0x290)[_0x42da3c(0x200)](_0x5c3305);_0x3f4e9b[_0x349578]=_0x12a61a,['Item',_0x42da3c(0x2ed)][_0x42da3c(0x2b8)](_0x5c3305)&&(_0x3f4e9b[_0x42da3c(0x258)]=_0x5c3305);},Game_Battler['prototype']['timesStruckSkill']=function(_0x44e130){const _0x4b9a54=_0x2afbfb,_0x512943=this['getConditionalDropsTrackedData']()[_0x4b9a54(0x288)];return _0x512943[_0x44e130]||0x0;},Game_Battler[_0x2afbfb(0x1f9)][_0x2afbfb(0x243)]=function(_0x2d66a3){const _0x2320dd=_0x2afbfb,_0x128aea=this[_0x2320dd(0x2a2)]()['timesStruckSTypes'];return _0x128aea[_0x2d66a3]||0x0;},Game_Battler['prototype'][_0x2afbfb(0x31b)]=function(_0x336eeb){const _0x3177eb=_0x2afbfb,_0x97e441=this[_0x3177eb(0x2a2)]()['timesStruckItems'];return _0x97e441[_0x336eeb]||0x0;},Game_Battler[_0x2afbfb(0x1f9)][_0x2afbfb(0x20a)]=function(_0xddc0a2){const _0x2464c1=this['getConditionalDropsTrackedData']()['timesStruckStates'];return _0x2464c1[_0xddc0a2]||0x0;},Game_Battler[_0x2afbfb(0x1f9)]['timesStruckElement']=function(_0x5e02d0){const _0x2dcd34=_0x2afbfb,_0x134539=this[_0x2dcd34(0x2a2)]()['timesStruckElements'];return _0x134539[_0x5e02d0]||0x0;},Game_Battler['prototype'][_0x2afbfb(0x27b)]=function(_0x1b4702){const _0x1e17ee=_0x2afbfb,_0x437714=_0x1b4702['item']();if(!_0x437714)return;if(_0x1b4702['isItem']())this[_0x1e17ee(0x26c)]('Item',_0x437714['id']);else{if(_0x1b4702[_0x1e17ee(0x213)]())this['addTimesStruck']('Skill',_0x437714['id']),this[_0x1e17ee(0x26c)](_0x1e17ee(0x2ab),_0x437714['stypeId']);else return;}let _0x55dca2=[];if(Imported[_0x1e17ee(0x316)])_0x55dca2=_0x1b4702[_0x1e17ee(0x2bf)]();else _0x1b4702[_0x1e17ee(0x306)]()[_0x1e17ee(0x2ba)][_0x1e17ee(0x28a)]<0x0?_0x55dca2=_0x1b4702['subject']()[_0x1e17ee(0x2e1)]():_0x55dca2=[_0x1b4702['item']()['damage']['elementId']];while(_0x55dca2['length']>0x0){const _0x51a22e=_0x55dca2[_0x1e17ee(0x24a)]();if(_0x51a22e>0x0)this['addTimesStruck'](_0x1e17ee(0x2a8),_0x51a22e);}},Game_Battler[_0x2afbfb(0x1f9)][_0x2afbfb(0x1d9)]=function(){const _0x1278cb=_0x2afbfb,_0x15cbae=this['getConditionalDropsTrackedData']();_0x15cbae[_0x1278cb(0x25a)]=this[_0x1278cb(0x2d3)]();},VisuMZ[_0x2afbfb(0x208)][_0x2afbfb(0x1f5)]=Game_BattlerBase[_0x2afbfb(0x1f9)][_0x2afbfb(0x2bc)],Game_BattlerBase[_0x2afbfb(0x1f9)][_0x2afbfb(0x2bc)]=function(_0x1ab30a){const _0x111721=_0x2afbfb,_0x45692e=this['isStateAffected'](_0x1ab30a);VisuMZ[_0x111721(0x208)][_0x111721(0x1f5)][_0x111721(0x2cc)](this,_0x1ab30a),this[_0x111721(0x2c3)](_0x1ab30a)&&(this['addTimesStruck']('State',_0x1ab30a),!_0x45692e&&_0x1ab30a===this[_0x111721(0x27a)]()&&this[_0x111721(0x1d9)]());},VisuMZ[_0x2afbfb(0x208)][_0x2afbfb(0x202)]=Game_Enemy[_0x2afbfb(0x1f9)][_0x2afbfb(0x2b0)],Game_Enemy[_0x2afbfb(0x1f9)][_0x2afbfb(0x2b0)]=function(){const _0x3fc4bc=_0x2afbfb;let _0x30f143=VisuMZ['ExtraEnemyDrops']['Game_Enemy_makeDropItems'][_0x3fc4bc(0x2cc)](this);return _0x30f143=this[_0x3fc4bc(0x2fb)](_0x30f143),VisuMZ['ExtraEnemyDrops']['sortDrops'](_0x30f143);},Game_Enemy[_0x2afbfb(0x1f9)][_0x2afbfb(0x2fb)]=function(_0x474cda){const _0x1c3a8c=_0x2afbfb;return _0x474cda=this[_0x1c3a8c(0x2eb)](_0x474cda),_0x474cda=this[_0x1c3a8c(0x300)](_0x474cda),_0x474cda=this[_0x1c3a8c(0x2d8)](_0x474cda),_0x474cda=this['addExtraEnemyDropsJS'](_0x474cda),_0x474cda;},Game_Enemy[_0x2afbfb(0x1f9)]['addExtraEnemyDropsSingles']=function(_0x1e14d6){const _0xed46d4=_0x2afbfb;return _0x1e14d6;const _0x1e65a5=this[_0xed46d4(0x318)]()['note'],_0x446242=this[_0xed46d4(0x2cb)](),_0x2c42d6=_0x1e65a5[_0xed46d4(0x2db)](/<(.*?) DROP[ ](.*):[ ](\d+)([%％])>/gi);if(_0x2c42d6)for(const _0x2b27c3 of _0x2c42d6){let _0x141a3e=$dataItems,_0xdcde52=null,_0x25ab8a=0x0;if(_0x2b27c3[_0xed46d4(0x2db)](/<(.*?) DROP[ ](\d+):[ ](\d+)([%％])>/i))_0x141a3e=VisuMZ['ExtraEnemyDrops']['getDatabase'](RegExp['$1']),_0xdcde52=_0x141a3e[Number(RegExp['$2'])],_0x25ab8a=Number(RegExp['$3'])*0.01;else _0x2b27c3['match'](/<(.*?) DROP[ ](.*):[ ](\d+)([%％])>/i)&&(_0xdcde52=VisuMZ[_0xed46d4(0x208)][_0xed46d4(0x1fd)](RegExp['$1'],RegExp['$2']),_0x25ab8a=Number(RegExp['$3'])*0.01);_0xdcde52&&Math[_0xed46d4(0x1e0)]()<_0x25ab8a*_0x446242&&_0x1e14d6[_0xed46d4(0x1e8)](_0xdcde52);}return _0x1e14d6;},Game_Enemy[_0x2afbfb(0x1f9)][_0x2afbfb(0x300)]=function(_0xe8494e){const _0x410bcc=_0x2afbfb;return _0xe8494e;const _0x4cdf52=this['enemy']()['note'],_0x3a5cb2=this[_0x410bcc(0x2cb)]();if(_0x4cdf52[_0x410bcc(0x2db)](/<(?:DROP|DROPS)>\s*([\s\S]*)\s*<\/(?:DROP|DROPS)>/i)){const _0x353b6e=String(RegExp['$1']),_0x22743b=_0x353b6e['match'](/(.*?)[ ](.*):[ ](\d+)([%％])/gi);if(_0x22743b){let _0x158113=$dataItems;for(const _0x48ecfb of _0x22743b){let _0x47a5a1=null,_0x4027e3=0x0;if(_0x48ecfb[_0x410bcc(0x2db)](/(.*?)[ ](\d+):[ ](\d+)([%％])/i))_0x158113=VisuMZ[_0x410bcc(0x208)]['getDatabase'](RegExp['$1']),_0x47a5a1=_0x158113[Number(RegExp['$2'])],_0x4027e3=Number(RegExp['$3'])*0.01;else _0x48ecfb[_0x410bcc(0x2db)](/(.*?)[ ](.*):[ ](\d+)([%％])/i)&&(_0x47a5a1=VisuMZ['ExtraEnemyDrops'][_0x410bcc(0x1fd)](RegExp['$1'],RegExp['$2']),_0x4027e3=Number(RegExp['$3'])*0.01);_0x47a5a1&&Math['random']()<_0x4027e3*_0x3a5cb2&&_0xe8494e[_0x410bcc(0x1e8)](_0x47a5a1);}}}return _0xe8494e;},VisuMZ[_0x2afbfb(0x208)]['getDatabase']=function(_0x13396b){const _0x3f8af4=_0x2afbfb;_0x13396b=_0x13396b[_0x3f8af4(0x2be)]()[_0x3f8af4(0x27e)]();if(['I',_0x3f8af4(0x1d1),_0x3f8af4(0x2e7)][_0x3f8af4(0x2b8)](_0x13396b))return $dataItems;if(['W',_0x3f8af4(0x1f2),_0x3f8af4(0x215)][_0x3f8af4(0x2b8)](_0x13396b))return $dataWeapons;if(['A',_0x3f8af4(0x218),_0x3f8af4(0x21d)][_0x3f8af4(0x2b8)](_0x13396b))return $dataArmors;if(['S',_0x3f8af4(0x2b1),_0x3f8af4(0x1f0)]['includes'](_0x13396b))return $dataSkills;if(['T',_0x3f8af4(0x26f),'STATES']['includes'](_0x13396b))return $dataStates;return $dataItems;},VisuMZ[_0x2afbfb(0x208)][_0x2afbfb(0x237)]=function(_0x314828){const _0x381816=_0x2afbfb;_0x314828=_0x314828[_0x381816(0x2be)]()['trim']();if(['I','ITEM','ITEMS']['includes'](_0x314828))return 0x1;if(['W','WEAPON',_0x381816(0x215)][_0x381816(0x2b8)](_0x314828))return 0x2;if(['A',_0x381816(0x218),_0x381816(0x21d)]['includes'](_0x314828))return 0x3;return 0x0;},VisuMZ[_0x2afbfb(0x208)][_0x2afbfb(0x1fd)]=function(_0x2400c5,_0x1820c4){const _0x4b4e78=_0x2afbfb;_0x2400c5=_0x2400c5[_0x4b4e78(0x2be)]()[_0x4b4e78(0x27e)]();if(['I',_0x4b4e78(0x1d1),_0x4b4e78(0x2e7)][_0x4b4e78(0x2b8)](_0x2400c5))return $dataItems[DataManager[_0x4b4e78(0x231)](_0x1820c4)];if(['W',_0x4b4e78(0x1f2),'WEAPONS'][_0x4b4e78(0x2b8)](_0x2400c5))return $dataWeapons[DataManager[_0x4b4e78(0x2e3)](_0x1820c4)];if(['A',_0x4b4e78(0x218),'ARMORS'][_0x4b4e78(0x2b8)](_0x2400c5))return $dataArmors[DataManager[_0x4b4e78(0x30b)](_0x1820c4)];if(['S',_0x4b4e78(0x2b1),_0x4b4e78(0x1f0)]['includes'](_0x2400c5))return $dataSkills[DataManager[_0x4b4e78(0x2f9)](_0x1820c4)];if(['T',_0x4b4e78(0x26f),_0x4b4e78(0x2c8)][_0x4b4e78(0x2b8)](_0x2400c5))return $dataStates[DataManager[_0x4b4e78(0x1da)](_0x1820c4)];return null;},VisuMZ[_0x2afbfb(0x208)][_0x2afbfb(0x25f)]=function(_0x558a15,_0x439f4e){const _0x4e7e93=_0x2afbfb;_0x558a15=_0x558a15[_0x4e7e93(0x2be)]()[_0x4e7e93(0x27e)]();if(['I',_0x4e7e93(0x1d1),_0x4e7e93(0x2e7)]['includes'](_0x558a15))return $dataItems[DataManager[_0x4e7e93(0x231)](_0x439f4e)]['id'];if(['W',_0x4e7e93(0x1f2),'WEAPONS'][_0x4e7e93(0x2b8)](_0x558a15))return $dataWeapons[DataManager[_0x4e7e93(0x2e3)](_0x439f4e)]['id'];if(['A','ARMOR',_0x4e7e93(0x21d)]['includes'](_0x558a15))return $dataArmors[DataManager[_0x4e7e93(0x30b)](_0x439f4e)]['id'];return 0x0;},VisuMZ[_0x2afbfb(0x208)][_0x2afbfb(0x1f1)]=function(_0x51cfb0){const _0x27edf4=_0x2afbfb;_0x51cfb0['sort']((_0x1c9324,_0x4d6985)=>_0x1c9324['id']-_0x4d6985['id']);const _0x257611=_0x51cfb0[_0x27edf4(0x26b)](_0x16a02f=>DataManager[_0x27edf4(0x2a3)](_0x16a02f)),_0x2cc98a=_0x51cfb0[_0x27edf4(0x26b)](_0x13f226=>DataManager[_0x27edf4(0x2f3)](_0x13f226)),_0x5ede15=_0x51cfb0['filter'](_0x33d1a=>DataManager[_0x27edf4(0x2a7)](_0x33d1a));let _0x10690f=_0x257611[_0x27edf4(0x205)](_0x2cc98a)[_0x27edf4(0x205)](_0x5ede15);return _0x10690f;},Game_Enemy['prototype'][_0x2afbfb(0x222)]=function(_0x2804a9){const _0x40b4fc=_0x2afbfb,_0x5eb147=this[_0x40b4fc(0x318)]()['id'];if(!VisuMZ[_0x40b4fc(0x208)]['JS'][_0x5eb147])return _0x2804a9;return VisuMZ['ExtraEnemyDrops']['JS'][_0x5eb147][_0x40b4fc(0x2cc)](this,_0x2804a9);},Game_Enemy[_0x2afbfb(0x1f9)][_0x2afbfb(0x2d8)]=function(_0x13725d){const _0x5a6c21=_0x2afbfb,_0x1db8f1=this[_0x5a6c21(0x318)]()[_0x5a6c21(0x21c)]['split'](/[\r\n]+/);let _0x68742c=null,_0x5d32ff=0x0;for(const _0x1e95fc of _0x1db8f1){if(!_0x1e95fc)continue;if(!_0x68742c&&_0x1e95fc[_0x5a6c21(0x2db)](/<CONDITIONAL (ITEM|WEAPON|ARMOR) (\d+)[ ](?:THROUGH|to)[ ](\d+) (?:DROP|DROPS)>/i)){const _0x252b85=VisuMZ[_0x5a6c21(0x208)][_0x5a6c21(0x26a)](RegExp['$1']),_0x591122=Number(RegExp['$2']),_0x3d8a38=Number(RegExp['$3']);_0x68742c=[];for(let _0xb3c991=_0x591122;_0xb3c991<=_0x3d8a38;_0xb3c991++){const _0x1c2688=_0x252b85[_0xb3c991]||null;_0x1c2688&&_0x1c2688[_0x5a6c21(0x234)][_0x5a6c21(0x27e)]()!==''&&!_0x1c2688[_0x5a6c21(0x234)]['match'](/-----/i)&&_0x68742c['push'](_0x1c2688);}_0x5d32ff=0x0;}else{if(!_0x68742c&&_0x1e95fc[_0x5a6c21(0x2db)](/<CONDITIONAL (ITEM|WEAPON|ARMOR) (\d+) (?:DROP|DROPS)>/i)){const _0x2d0c4e=VisuMZ[_0x5a6c21(0x208)]['getDatabase'](RegExp['$1']);_0x68742c=[_0x2d0c4e[Number(RegExp['$2'])]||null],_0x5d32ff=0x0;}else{if(!_0x68742c&&_0x1e95fc['match'](/<CONDITIONAL (ITEM|WEAPON|ARMOR) (.*) (?:DROP|DROPS)>/i))_0x68742c=[VisuMZ['ExtraEnemyDrops']['getDatabaseItem'](RegExp['$1'],RegExp['$2'])],_0x5d32ff=0x0;else{if(_0x68742c&&_0x1e95fc[_0x5a6c21(0x2db)](/<\/CONDITIONAL (.*) (?:DROP|DROPS)>/i)){for(const _0x111f8e of _0x68742c){if(Math[_0x5a6c21(0x1e0)]()<_0x5d32ff)_0x13725d[_0x5a6c21(0x1e8)](_0x111f8e);}_0x68742c=null,_0x5d32ff=0x0;}else{if(_0x68742c&&_0x1e95fc['match'](/(.*):[ ]([\+\-]\d+)([%％])/i)){const _0x278c47=String(RegExp['$1']),_0x1335e7=Number(RegExp['$2'])*0.01;this[_0x5a6c21(0x2f6)](_0x278c47)&&(_0x5d32ff+=_0x1335e7);}}}}}}return _0x13725d;},Game_Enemy[_0x2afbfb(0x1f9)][_0x2afbfb(0x2f6)]=function(_0x34a5fb){const _0x3a9d7a=_0x2afbfb;if(_0x34a5fb[_0x3a9d7a(0x2db)](/\bALWAYS\b/i))return!![];else{if(_0x34a5fb[_0x3a9d7a(0x2db)](/\bRANDOM[ ](\d+)([%％])\b/i)){const _0x3d73f1=Number(RegExp['$1'])*0.01;return Math[_0x3a9d7a(0x1e0)]()<_0x3d73f1;}else{if(_0x34a5fb[_0x3a9d7a(0x2db)](/\bLAST (?:STRIKE|STRUCK)[ ](ELEMENT|ITEM|SKILL|STYPE|STATE)[ ](\d+)\b/i)){let _0x134f52=String(RegExp['$1'])['toLowerCase']();const _0x1a5da3=Number(RegExp['$2']);_0x134f52=_0x134f52['charAt'](0x0)[_0x3a9d7a(0x2be)]()+_0x134f52[_0x3a9d7a(0x289)](0x1);if(_0x134f52[_0x3a9d7a(0x2db)](/STYPE/i))_0x134f52=_0x3a9d7a(0x2ab);const _0x595002=this[_0x3a9d7a(0x2a2)]();if(_0x134f52===_0x3a9d7a(0x236)&&_0x595002['lastStruckType']!==_0x3a9d7a(0x236))return![];if(_0x134f52===_0x3a9d7a(0x2ed)&&_0x595002[_0x3a9d7a(0x258)]!==_0x3a9d7a(0x2ed))return![];if(_0x134f52===_0x3a9d7a(0x2ab)&&_0x595002['lastStruckType']!==_0x3a9d7a(0x2ed))return![];const _0xaf6e58=_0x3a9d7a(0x290)[_0x3a9d7a(0x200)](_0x134f52);return _0x595002[_0xaf6e58]===_0x1a5da3;}else{if(_0x34a5fb['match'](/\bLAST (?:STRIKE|STRUCK)[ ](ELEMENT|ITEM|SKILL|STYPE|STATE)[ ](.*)\b/i)){let _0x443fcb=String(RegExp['$1'])['toLowerCase']();const _0x40ab02=String(RegExp['$2']),_0x1919f8=this[_0x3a9d7a(0x2a2)]();let _0x3e8cf3=0x0;switch(_0x443fcb['toUpperCase']()[_0x3a9d7a(0x27e)]()){case'ELEMENT':_0x3e8cf3=DataManager[_0x3a9d7a(0x263)](_0x40ab02);return _0x1919f8[_0x3a9d7a(0x21f)]===_0x3e8cf3;case'ITEM':if(_0x1919f8[_0x3a9d7a(0x258)]!==_0x3a9d7a(0x236))return![];_0x3e8cf3=DataManager[_0x3a9d7a(0x231)](_0x40ab02);return _0x1919f8[_0x3a9d7a(0x28d)]===_0x3e8cf3;case _0x3a9d7a(0x2b1):if(_0x1919f8[_0x3a9d7a(0x258)]!=='Skill')return![];_0x3e8cf3=DataManager['getSkillIdWithName'](_0x40ab02);return _0x1919f8['lastStruckSkill']===_0x3e8cf3;case'STYPE':if(_0x1919f8[_0x3a9d7a(0x258)]!==_0x3a9d7a(0x2ed))return![];_0x3e8cf3=DataManager[_0x3a9d7a(0x2d6)](_0x40ab02);return _0x1919f8[_0x3a9d7a(0x2c7)]===_0x3e8cf3;case'STATE':_0x3e8cf3=DataManager[_0x3a9d7a(0x1da)](_0x40ab02);return _0x1919f8[_0x3a9d7a(0x1eb)]===_0x3e8cf3;default:return![];}}else{let _0xfbda70=VisuMZ[_0x3a9d7a(0x208)][_0x3a9d7a(0x229)](this,_0x34a5fb);try{return eval(_0xfbda70);}catch(_0x3e677e){return![];}}}}}},VisuMZ[_0x2afbfb(0x208)][_0x2afbfb(0x229)]=function(_0x2be360,_0x222107){const _0xd66670=_0x2afbfb;while(_0x222107[_0xd66670(0x2db)](/\b\\V\[(\d+)\]\b/gi)){_0x222107=_0x222107['replace'](/\b\\V\[(\d+)\]\b/gi,(_0x17b9b4,_0x386afc)=>$gameVariables[_0xd66670(0x2e0)](parseInt(_0x386afc)));}while(_0x222107[_0xd66670(0x2db)](/\bVARIABLE (\d+)\b/gi)){_0x222107=_0x222107[_0xd66670(0x2b5)](/\bVARIABLE (\d+)\b/gi,(_0x8fe809,_0x2531da)=>$gameVariables[_0xd66670(0x2e0)](parseInt(_0x2531da)));}return _0x222107=_0x222107[_0xd66670(0x2b5)](/\\S\[(\d+)\] ON/gi,(_0xc99d5e,_0x226871)=>String($gameSwitches['value'](parseInt(_0x226871))===!![])),_0x222107=_0x222107[_0xd66670(0x2b5)](/\\S\[(\d+)\] OFF/gi,(_0x246812,_0x562df8)=>String($gameSwitches[_0xd66670(0x2e0)](parseInt(_0x562df8))===![])),_0x222107=_0x222107[_0xd66670(0x2b5)](/\\S\[(\d+)\]/gi,(_0x18d615,_0x17dbc3)=>String($gameSwitches[_0xd66670(0x2e0)](parseInt(_0x17dbc3)))),_0x222107=_0x222107[_0xd66670(0x2b5)](/SWITCH (\d+) ON/gi,(_0x3ac75b,_0x758bfe)=>String($gameSwitches[_0xd66670(0x2e0)](parseInt(_0x758bfe))===!![])),_0x222107=_0x222107[_0xd66670(0x2b5)](/SWITCH (\d+) OFF/gi,(_0x2b687d,_0x5a37a9)=>String($gameSwitches[_0xd66670(0x2e0)](parseInt(_0x5a37a9))===![])),_0x222107=_0x222107['replace'](/SWITCH (\d+)/gi,(_0x44271f,_0xd1f326)=>String($gameSwitches['value'](parseInt(_0xd1f326)))),_0x222107=_0x222107['replace'](/\bON\b/gi,_0xd66670(0x23b)),_0x222107=_0x222107[_0xd66670(0x2b5)](/\bOFF\b/gi,_0xd66670(0x207)),_0x222107=_0x222107[_0xd66670(0x2b5)](/\bTRUE\b/gi,_0xd66670(0x23b)),_0x222107=_0x222107[_0xd66670(0x2b5)](/\bFALSE\b/gi,'false'),_0x222107=_0x222107[_0xd66670(0x2b5)](/\b(ITEM|WEAPON|ARMOR)[ ](\d+)[ ]COUNT\b/gi,(_0x2682b2,_0x1353b3,_0x73d6eb)=>{const _0xf61439=_0xd66670,_0x53936c=VisuMZ[_0xf61439(0x208)][_0xf61439(0x26a)](_0x1353b3),_0x53151d=_0x53936c[Number(_0x73d6eb)]||null;return _0x53151d?$gameParty[_0xf61439(0x315)](_0x53151d):0x0;}),_0x222107=_0x222107['replace'](/\b(ITEM|WEAPON|ARMOR)[ ](.*)[ ]COUNT\b/gi,(_0x5bc914,_0x1d56f4,_0x45d2c1)=>{const _0x37802c=_0xd66670,_0x1132f4=VisuMZ['ExtraEnemyDrops'][_0x37802c(0x1fd)](_0x1d56f4,_0x45d2c1);return _0x1132f4?$gameParty[_0x37802c(0x315)](_0x1132f4):0x0;}),_0x222107=_0x222107[_0xd66670(0x2b5)](/\bTIMES[ ](ELEMENT|ITEM|SKILL|STYPE|STATE)[ ](\d+)[ ](?:STRIKE|STRUCK)\b/gi,(_0x47d4c3,_0x11454d,_0x1139fd)=>{const _0x3f4cc0=_0xd66670;let _0x48f54=_0x11454d;const _0x39ff3a=_0x1139fd;_0x48f54=_0x48f54[_0x3f4cc0(0x21a)](0x0)[_0x3f4cc0(0x2be)]()+_0x48f54[_0x3f4cc0(0x289)](0x1);if(_0x48f54['match'](/STYPE/i))_0x48f54=_0x3f4cc0(0x2ab);const _0x647a51='timesStruck%1'[_0x3f4cc0(0x200)](_0x48f54);if(_0x2be360[_0x647a51])return _0x2be360[_0x647a51](_0x39ff3a);return 0x0;}),_0x222107=_0x222107[_0xd66670(0x2b5)](/\bTIMES[ ](ELEMENT|ITEM|SKILL|STYPE|STATE)[ ](.*)[ ](?:STRIKE|STRUCK)\b/gi,(_0x4c51c9,_0x42d691,_0x42af98)=>{const _0x206c71=_0xd66670;let _0x2b399f=_0x42d691;const _0x28debd=_0x42af98;let _0x2c1f67=0x0;switch(_0x2b399f[_0x206c71(0x2be)]()['trim']()){case'ELEMENT':_0x2c1f67=DataManager[_0x206c71(0x263)](_0x28debd);break;case _0x206c71(0x1d1):_0x2c1f67=DataManager['getItemIdWithName'](_0x28debd);break;case'SKILL':_0x2c1f67=DataManager[_0x206c71(0x2f9)](_0x28debd);break;case'STYPE':_0x2c1f67=DataManager[_0x206c71(0x2d6)](_0x28debd);break;case _0x206c71(0x26f):_0x2c1f67=DataManager[_0x206c71(0x1da)](_0x28debd);break;default:return 0x0;}_0x2b399f=_0x2b399f[_0x206c71(0x21a)](0x0)[_0x206c71(0x2be)]()+_0x2b399f[_0x206c71(0x289)](0x1);if(_0x2b399f['match'](/STYPE/i))_0x2b399f=_0x206c71(0x2ab);const _0x51fcc8=_0x206c71(0x29f)['format'](_0x2b399f);if(_0x2be360[_0x51fcc8])return _0x2be360[_0x51fcc8](_0x2c1f67);return 0x0;}),_0x222107=_0x222107[_0xd66670(0x2b5)](/\bALIVE MEMBERS\b/gi,$gameParty[_0xd66670(0x1f4)]()[_0xd66670(0x224)]),_0x222107=_0x222107['replace'](/\bBATTLE MEMBERS\b/gi,$gameParty[_0xd66670(0x27c)]()['length']),_0x222107=_0x222107[_0xd66670(0x2b5)](/\bBATTLE TURNS\b/gi,$gameTroop['turnCount']()),_0x222107=_0x222107[_0xd66670(0x2b5)](/\bDEAD MEMBERS\b/gi,$gameParty[_0xd66670(0x2d2)]()[_0xd66670(0x224)]),_0x222107=_0x222107[_0xd66670(0x2b5)](/\bDEATH TURN\b/gi,_0x2be360[_0xd66670(0x1ec)]()||0x1),_0x222107=_0x222107['replace'](/\bENEMY LEVEL\b/gi,_0x2be360[_0xd66670(0x1fa)]||0x1),_0x222107=_0x222107[_0xd66670(0x2b5)](/\bPARTY GOLD\b/gi,$gameParty[_0xd66670(0x233)]()),_0x222107=_0x222107['replace'](/\bPARTY MEMBERS\b/gi,$gameParty[_0xd66670(0x268)]()['length']),_0x222107;},VisuMZ[_0x2afbfb(0x208)]['Game_Troop_clear']=Game_Troop[_0x2afbfb(0x1f9)]['clear'],Game_Troop['prototype'][_0x2afbfb(0x24c)]=function(){const _0x545bc9=_0x2afbfb;VisuMZ['ExtraEnemyDrops'][_0x545bc9(0x314)][_0x545bc9(0x2cc)](this),this[_0x545bc9(0x30f)](),this['clearBonusRewards']();},Game_Troop[_0x2afbfb(0x1f9)][_0x2afbfb(0x30f)]=function(){const _0x247654=_0x2afbfb;this[_0x247654(0x22b)]={'exp':undefined,'gold':undefined,'drops':undefined};},Game_Troop[_0x2afbfb(0x1f9)][_0x2afbfb(0x2f8)]=function(){const _0xfc8659=_0x2afbfb;this[_0xfc8659(0x220)]={'exp':0x0,'gold':0x0,'drops':[]};},VisuMZ[_0x2afbfb(0x208)]['Game_Troop_expTotal']=Game_Troop[_0x2afbfb(0x1f9)]['expTotal'],Game_Troop[_0x2afbfb(0x1f9)][_0x2afbfb(0x1ea)]=function(){const _0x33d3e1=_0x2afbfb;if(this[_0x33d3e1(0x22b)]===undefined)this[_0x33d3e1(0x30f)]();if(this[_0x33d3e1(0x220)]===undefined)this[_0x33d3e1(0x2f8)]();let _0x2b99ff=this['expRate']?this[_0x33d3e1(0x2c0)]():0x1,_0x38de32=this['_forcedRewards']['exp']===undefined?VisuMZ[_0x33d3e1(0x208)][_0x33d3e1(0x1d4)]['call'](this):this[_0x33d3e1(0x22b)][_0x33d3e1(0x2aa)]*_0x2b99ff;return Math[_0x33d3e1(0x303)](Math['max'](_0x38de32+(this[_0x33d3e1(0x220)][_0x33d3e1(0x2aa)]||0x0),0x0));},VisuMZ[_0x2afbfb(0x208)][_0x2afbfb(0x2fd)]=Game_Troop['prototype']['goldTotal'],Game_Troop[_0x2afbfb(0x1f9)]['goldTotal']=function(){const _0x1ed9ac=_0x2afbfb;if(this[_0x1ed9ac(0x22b)]===undefined)this[_0x1ed9ac(0x30f)]();if(this[_0x1ed9ac(0x220)]===undefined)this[_0x1ed9ac(0x2f8)]();let _0x15aa16=this[_0x1ed9ac(0x2de)]?this[_0x1ed9ac(0x2de)]():0x1,_0x3fa2d7=this[_0x1ed9ac(0x22b)][_0x1ed9ac(0x233)]===undefined?VisuMZ['ExtraEnemyDrops'][_0x1ed9ac(0x2fd)]['call'](this):this['_forcedRewards'][_0x1ed9ac(0x233)]*_0x15aa16;return Math[_0x1ed9ac(0x303)](Math[_0x1ed9ac(0x22a)](_0x3fa2d7+(this[_0x1ed9ac(0x220)][_0x1ed9ac(0x233)]||0x0)*this[_0x1ed9ac(0x2de)](),0x0));},VisuMZ[_0x2afbfb(0x208)][_0x2afbfb(0x29a)]=Game_Troop[_0x2afbfb(0x1f9)][_0x2afbfb(0x2b0)],Game_Troop[_0x2afbfb(0x1f9)][_0x2afbfb(0x2b0)]=function(){const _0x50e7c2=_0x2afbfb;if(this[_0x50e7c2(0x22b)]===undefined)this[_0x50e7c2(0x30f)]();if(this[_0x50e7c2(0x220)]===undefined)this[_0x50e7c2(0x2f8)]();let _0x26775e=this[_0x50e7c2(0x22b)][_0x50e7c2(0x264)]===undefined?VisuMZ['ExtraEnemyDrops'][_0x50e7c2(0x29a)][_0x50e7c2(0x2cc)](this):this[_0x50e7c2(0x22b)][_0x50e7c2(0x264)];return _0x26775e[_0x50e7c2(0x205)](this[_0x50e7c2(0x220)][_0x50e7c2(0x264)]);},Game_Troop['prototype'][_0x2afbfb(0x1cf)]=function(_0x29f4eb){const _0x168731=_0x2afbfb;if(this['_forcedRewards']===undefined)this[_0x168731(0x30f)]();if(this[_0x168731(0x220)]===undefined)this[_0x168731(0x2f8)]();this[_0x168731(0x22b)][_0x168731(0x2aa)]=Math[_0x168731(0x22a)](0x0,Math[_0x168731(0x303)](_0x29f4eb));},Game_Troop[_0x2afbfb(0x1f9)][_0x2afbfb(0x217)]=function(_0x2011ab){const _0x692eb7=_0x2afbfb;if(this[_0x692eb7(0x22b)]===undefined)this['clearForcedRewards']();if(this[_0x692eb7(0x220)]===undefined)this[_0x692eb7(0x2f8)]();this[_0x692eb7(0x220)][_0x692eb7(0x2aa)]=Math[_0x692eb7(0x22a)](0x0,Math[_0x692eb7(0x303)](_0x2011ab));},Game_Troop[_0x2afbfb(0x1f9)][_0x2afbfb(0x2a0)]=function(_0x589e52){const _0x49d66d=_0x2afbfb;if(this[_0x49d66d(0x22b)]===undefined)this[_0x49d66d(0x30f)]();if(this['_bonusRewards']===undefined)this[_0x49d66d(0x2f8)]();this[_0x49d66d(0x22b)][_0x49d66d(0x233)]=Math['max'](0x0,Math['round'](_0x589e52));},Game_Troop[_0x2afbfb(0x1f9)]['setBonusGold']=function(_0x161d45){const _0x215d0c=_0x2afbfb;if(this[_0x215d0c(0x22b)]===undefined)this[_0x215d0c(0x30f)]();if(this[_0x215d0c(0x220)]===undefined)this[_0x215d0c(0x2f8)]();this[_0x215d0c(0x220)]['gold']=Math[_0x215d0c(0x22a)](0x0,Math[_0x215d0c(0x303)](_0x161d45));},Game_Troop[_0x2afbfb(0x1f9)][_0x2afbfb(0x2c4)]=function(_0x32635d,_0x3e8f10){const _0x3e9e01=_0x2afbfb;if(this[_0x3e9e01(0x22b)]===undefined)this['clearForcedRewards']();if(this[_0x3e9e01(0x220)]===undefined)this['clearBonusRewards']();_0x3e8f10=_0x3e8f10||0x1,this[_0x3e9e01(0x22b)][_0x3e9e01(0x264)]=this[_0x3e9e01(0x22b)][_0x3e9e01(0x264)]||[];while(_0x3e8f10--){const _0x962a0b=$dataItems[_0x32635d];if(_0x962a0b)this['_forcedRewards'][_0x3e9e01(0x264)][_0x3e9e01(0x1e8)](_0x962a0b);}},Game_Troop['prototype'][_0x2afbfb(0x304)]=function(_0x66e0d1,_0x42c5c0){const _0x535410=_0x2afbfb;if(this[_0x535410(0x22b)]===undefined)this['clearForcedRewards']();if(this[_0x535410(0x220)]===undefined)this['clearBonusRewards']();_0x42c5c0=_0x42c5c0||0x1,this[_0x535410(0x22b)][_0x535410(0x264)]=this[_0x535410(0x22b)][_0x535410(0x264)]||[];while(_0x42c5c0--){const _0x5b6a93=$dataWeapons[_0x66e0d1];if(_0x5b6a93)this[_0x535410(0x22b)][_0x535410(0x264)][_0x535410(0x1e8)](_0x5b6a93);}},Game_Troop['prototype'][_0x2afbfb(0x2fa)]=function(_0x1afcd7,_0x4b66da){const _0x8379b1=_0x2afbfb;if(this[_0x8379b1(0x22b)]===undefined)this[_0x8379b1(0x30f)]();if(this['_bonusRewards']===undefined)this[_0x8379b1(0x2f8)]();_0x4b66da=_0x4b66da||0x1,this[_0x8379b1(0x22b)][_0x8379b1(0x264)]=this['_forcedRewards'][_0x8379b1(0x264)]||[];while(_0x4b66da--){const _0x28b0f1=$dataArmors[_0x1afcd7];if(_0x28b0f1)this[_0x8379b1(0x22b)][_0x8379b1(0x264)][_0x8379b1(0x1e8)](_0x28b0f1);}},Game_Troop[_0x2afbfb(0x1f9)][_0x2afbfb(0x2e8)]=function(_0xce5852,_0x1d7b99){const _0x296dd6=_0x2afbfb;if(this[_0x296dd6(0x22b)]===undefined)this[_0x296dd6(0x30f)]();if(this['_bonusRewards']===undefined)this[_0x296dd6(0x2f8)]();_0x1d7b99=_0x1d7b99||0x1;while(_0x1d7b99--){const _0x578440=$dataItems[_0xce5852];if(_0x578440)this['_bonusRewards'][_0x296dd6(0x264)][_0x296dd6(0x1e8)](_0x578440);}},Game_Troop['prototype']['addBonusWeaponDrop']=function(_0x23e8af,_0x5e084e){const _0x1554a0=_0x2afbfb;if(this[_0x1554a0(0x22b)]===undefined)this['clearForcedRewards']();if(this['_bonusRewards']===undefined)this[_0x1554a0(0x2f8)]();_0x5e084e=_0x5e084e||0x1;while(_0x5e084e--){const _0x5ef686=$dataWeapons[_0x23e8af];if(_0x5ef686)this[_0x1554a0(0x220)][_0x1554a0(0x264)][_0x1554a0(0x1e8)](_0x5ef686);}},Game_Troop['prototype'][_0x2afbfb(0x273)]=function(_0x4231f8,_0x539984){const _0x10a741=_0x2afbfb;if(this[_0x10a741(0x22b)]===undefined)this[_0x10a741(0x30f)]();if(this[_0x10a741(0x220)]===undefined)this['clearBonusRewards']();_0x539984=_0x539984||0x1;while(_0x539984--){const _0x4a8465=$dataArmors[_0x4231f8];if(_0x4a8465)this[_0x10a741(0x220)][_0x10a741(0x264)][_0x10a741(0x1e8)](_0x4a8465);}},Game_Troop[_0x2afbfb(0x1f9)]['hasForcedDrops']=function(){const _0x36970a=_0x2afbfb;if(this[_0x36970a(0x22b)]===undefined)this[_0x36970a(0x30f)]();return this[_0x36970a(0x22b)][_0x36970a(0x264)]!==undefined;};if(Imported[_0x2afbfb(0x2df)]&&VisuMZ[_0x2afbfb(0x208)]['Settings'][_0x2afbfb(0x2e2)][_0x2afbfb(0x2e4)]){VisuMZ[_0x2afbfb(0x29e)]=VisuMZ[_0x2afbfb(0x29e)]||{},VisuMZ[_0x2afbfb(0x29e)]['BattleManager_initMembers']=BattleManager[_0x2afbfb(0x1e3)],BattleManager[_0x2afbfb(0x1e3)]=function(){const _0x358c87=_0x2afbfb;$gameTemp[_0x358c87(0x2d0)]=[],BattleManager[_0x358c87(0x2c2)]=!![],VisuMZ[_0x358c87(0x29e)][_0x358c87(0x2c9)][_0x358c87(0x2cc)](this);},VisuMZ[_0x2afbfb(0x29e)][_0x2afbfb(0x1f5)]=Game_BattlerBase[_0x2afbfb(0x1f9)][_0x2afbfb(0x2bc)],Game_BattlerBase[_0x2afbfb(0x1f9)][_0x2afbfb(0x2bc)]=function(_0x5a9402){const _0x3badaf=_0x2afbfb,_0x218ca5=this['isAlive']();VisuMZ[_0x3badaf(0x29e)][_0x3badaf(0x1f5)]['call'](this,_0x5a9402);if(!Imported[_0x3badaf(0x2df)])return;if(!this['isEnemy']())return;if(!SceneManager[_0x3badaf(0x278)]())return;const _0x5ba824=SceneManager[_0x3badaf(0x285)][_0x3badaf(0x23a)];if(!_0x5ba824)return;_0x218ca5&&this['isDead']()&&_0x5ba824[_0x3badaf(0x25d)](this);},VisuMZ['VisualDrops'][_0x2afbfb(0x23d)]=Game_BattlerBase[_0x2afbfb(0x1f9)][_0x2afbfb(0x2c5)],Game_BattlerBase[_0x2afbfb(0x1f9)]['eraseState']=function(_0x179b17){const _0x405801=_0x2afbfb,_0x546c77=this[_0x405801(0x2d7)]();VisuMZ[_0x405801(0x29e)][_0x405801(0x23d)][_0x405801(0x2cc)](this,_0x179b17);if(!Imported[_0x405801(0x2df)])return;if(!this[_0x405801(0x24e)]())return;if(!SceneManager[_0x405801(0x278)]())return;const _0x503a45=SceneManager['_scene'][_0x405801(0x23a)];if(!_0x503a45)return;if(_0x546c77&&this[_0x405801(0x1e2)]()){_0x503a45['removeVisualDrops'](this);if(VisuMZ['ExtraEnemyDrops'][_0x405801(0x26e)][_0x405801(0x2e2)][_0x405801(0x1f7)])this['resetVisualDrops']();}},VisuMZ[_0x2afbfb(0x29e)][_0x2afbfb(0x1db)]=Game_Enemy[_0x2afbfb(0x1f9)][_0x2afbfb(0x2ea)],Game_Enemy[_0x2afbfb(0x1f9)][_0x2afbfb(0x2ea)]=function(_0x181576,_0x11132f,_0x1cdbd8){const _0x20952c=_0x2afbfb;VisuMZ[_0x20952c(0x29e)][_0x20952c(0x1db)][_0x20952c(0x2cc)](this,_0x181576,_0x11132f,_0x1cdbd8);},Game_Enemy['prototype'][_0x2afbfb(0x22e)]=function(){const _0x28650b=_0x2afbfb;this[_0x28650b(0x26d)]={};},VisuMZ[_0x2afbfb(0x29e)][_0x2afbfb(0x227)]=Game_Enemy[_0x2afbfb(0x1f9)]['exp'],Game_Enemy[_0x2afbfb(0x1f9)][_0x2afbfb(0x2aa)]=function(){const _0x1ba340=_0x2afbfb;this[_0x1ba340(0x26d)]=this[_0x1ba340(0x26d)]||{};if(this[_0x1ba340(0x26d)][_0x1ba340(0x2aa)]!==undefined)return this[_0x1ba340(0x26d)][_0x1ba340(0x2aa)];return this['_visualDrops'][_0x1ba340(0x2aa)]=VisuMZ['VisualDrops'][_0x1ba340(0x227)][_0x1ba340(0x2cc)](this),this[_0x1ba340(0x26d)][_0x1ba340(0x2aa)];},VisuMZ[_0x2afbfb(0x29e)]['Game_Enemy_gold']=Game_Enemy[_0x2afbfb(0x1f9)]['gold'],Game_Enemy[_0x2afbfb(0x1f9)][_0x2afbfb(0x233)]=function(){const _0x474dea=_0x2afbfb;this[_0x474dea(0x26d)]=this[_0x474dea(0x26d)]||{};if(this[_0x474dea(0x26d)]['gold']!==undefined)return this[_0x474dea(0x26d)]['gold'];return this[_0x474dea(0x26d)][_0x474dea(0x233)]=VisuMZ[_0x474dea(0x29e)][_0x474dea(0x30c)][_0x474dea(0x2cc)](this),this[_0x474dea(0x26d)][_0x474dea(0x233)];},VisuMZ[_0x2afbfb(0x29e)]['Game_Enemy_makeDropItems']=Game_Enemy[_0x2afbfb(0x1f9)][_0x2afbfb(0x2b0)],Game_Enemy[_0x2afbfb(0x1f9)][_0x2afbfb(0x2b0)]=function(){const _0x5cee60=_0x2afbfb;this[_0x5cee60(0x26d)]=this[_0x5cee60(0x26d)]||{};if(this['_visualDrops'][_0x5cee60(0x264)]!==undefined)return this[_0x5cee60(0x26d)]['drops'];return this[_0x5cee60(0x26d)][_0x5cee60(0x264)]=VisuMZ[_0x5cee60(0x29e)]['Game_Enemy_makeDropItems'][_0x5cee60(0x2cc)](this),this[_0x5cee60(0x26d)]['drops'];},Spriteset_Battle[_0x2afbfb(0x1f9)]['removeVisualDrops']=function(_0xe431a7){const _0x5ad3fe=_0x2afbfb;if(!_0xe431a7)return;$gameTemp[_0x5ad3fe(0x2d0)]=$gameTemp['_visualDropSprites']||[];const _0x535a0a=[];for(const _0x1a2beb of $gameTemp[_0x5ad3fe(0x2d0)]){if(!_0x1a2beb)continue;if(_0x1a2beb[_0x5ad3fe(0x318)]!==_0xe431a7)continue;const _0x29726f=this[_0x5ad3fe(0x2f0)](_0x1a2beb);if(!_0x29726f)continue;_0x29726f[_0x5ad3fe(0x2bd)](),_0x535a0a[_0x5ad3fe(0x1e8)](_0x1a2beb);}for(const _0x5acff7 of _0x535a0a){$gameTemp['_visualDropSprites']['remove'](_0x5acff7);}},Spriteset_Battle['prototype']['findTargetDropSprite']=function(_0xe8f512){const _0x46c4c5=_0x2afbfb;return this[_0x46c4c5(0x1dd)][_0x46c4c5(0x1d5)][_0x46c4c5(0x223)](_0x103d48=>_0x103d48[_0x46c4c5(0x307)]===_0xe8f512);},Spriteset_Battle[_0x2afbfb(0x1f9)][_0x2afbfb(0x25d)]=function(_0x52c451){const _0x159770=_0x2afbfb,_0x5aa021=VisuMZ['ExtraEnemyDrops']['Settings'];if(!_0x52c451)return;let _0x1b5656=[];_0x5aa021[_0x159770(0x212)][_0x159770(0x305)]&&_0x1b5656[_0x159770(0x1e8)](VisuMZ[_0x159770(0x29e)][_0x159770(0x241)](_0x52c451,_0x159770(0x212)));_0x5aa021[_0x159770(0x24b)][_0x159770(0x305)]&&_0x1b5656[_0x159770(0x1e8)](VisuMZ['VisualDrops']['getExpGoldDropIcon'](_0x52c451,_0x159770(0x24b)));_0x5aa021[_0x159770(0x30a)][_0x159770(0x305)]&&(_0x1b5656=_0x1b5656['concat'](VisuMZ[_0x159770(0x29e)][_0x159770(0x2cf)](_0x52c451)));const _0x5f56a1=VisuMZ[_0x159770(0x29e)][_0x159770(0x23e)](_0x52c451,_0x1b5656);$gameTemp[_0x159770(0x2d0)]=$gameTemp['_visualDropSprites']||[];let _0x1e0423=0x0;for(const _0x485b46 of _0x5f56a1){if(!_0x485b46)continue;$gameTemp['_visualDropSprites'][_0x159770(0x1e8)](_0x485b46[_0x159770(0x307)]),setTimeout(this[_0x159770(0x2a5)][_0x159770(0x226)](this,_0x485b46),_0x1e0423),_0x1e0423+=_0x5aa021[_0x159770(0x2e2)][_0x159770(0x266)];}},Spriteset_Battle[_0x2afbfb(0x1f9)][_0x2afbfb(0x2a5)]=function(_0x1dc885){const _0x4a8ca3=_0x2afbfb;if(!SceneManager[_0x4a8ca3(0x278)]())return;this[_0x4a8ca3(0x1dd)][_0x4a8ca3(0x254)](_0x1dc885),_0x1dc885[_0x4a8ca3(0x253)]();},VisuMZ[_0x2afbfb(0x29e)][_0x2afbfb(0x241)]=function(_0xa1c4fe,_0x1caae1){const _0x33b54=_0x2afbfb;if(!_0xa1c4fe)return 0x0;const _0x525502=VisuMZ[_0x33b54(0x208)][_0x33b54(0x26e)][_0x1caae1],_0x40ac28=VisuMZ[_0x33b54(0x208)][_0x33b54(0x26e)][_0x33b54(0x1ee)],_0x3b8b66=_0x1caae1==='Exp'?_0xa1c4fe['exp']():_0xa1c4fe[_0x33b54(0x233)]();let _0x49f494=0x0,_0x547ce7=0x0,_0x1af1af=_0x40ac28[_0x33b54(0x2b7)],_0x81c350=_0x40ac28[_0x33b54(0x219)],_0x12f438=JsonEx[_0x33b54(0x283)](_0x40ac28[_0x33b54(0x2b2)]);for(let _0x519d20=0x1;_0x519d20<=0xa;_0x519d20++){const _0x36de50='Value%1'['format'](_0x519d20),_0x465c82='Icon%1'[_0x33b54(0x200)](_0x519d20),_0x61644='Rarity%1'[_0x33b54(0x200)](_0x519d20);if(_0x525502[_0x36de50]<_0x49f494)continue;if(_0x3b8b66<_0x525502[_0x36de50])continue;_0x49f494=_0x525502[_0x36de50],_0x547ce7=_0x525502[_0x465c82];const _0x5aa80d=_0x525502[_0x61644][_0x33b54(0x249)](0x0,0xa);_0x1af1af=_0x40ac28['Tint%1'[_0x33b54(0x200)](_0x5aa80d)]||[0x0,0x0,0x0,0x0],_0x81c350=_0x40ac28[_0x33b54(0x1f3)[_0x33b54(0x200)](_0x5aa80d)]||0x1,_0x12f438=_0x40ac28[_0x33b54(0x251)[_0x33b54(0x200)](_0x5aa80d)]||[];}return[_0x547ce7,_0x1af1af,_0x81c350,_0x12f438];},VisuMZ[_0x2afbfb(0x29e)]['getItemDropIcons']=function(_0x459af5){const _0x43ceba=_0x2afbfb,_0x6ed24d=[],_0xe54863=_0x459af5[_0x43ceba(0x2b0)](),_0x3c4194=VisuMZ['ExtraEnemyDrops'][_0x43ceba(0x26e)][_0x43ceba(0x30a)],_0x9fa6ce=VisuMZ[_0x43ceba(0x208)][_0x43ceba(0x26e)][_0x43ceba(0x1ee)];for(const _0x450022 of _0xe54863){if(!_0x450022)continue;const _0x3e2ef4=[];if(_0x450022[_0x43ceba(0x21c)][_0x43ceba(0x2db)](/<VISUAL DROP ICON:[ ](\d+)>/i))_0x3e2ef4['push'](Number(RegExp['$1'])||0x0);else{if(_0x3c4194['uniqueIcons'])_0x3e2ef4[_0x43ceba(0x1e8)](_0x450022[_0x43ceba(0x242)]);else{if(DataManager[_0x43ceba(0x2a3)](_0x450022))_0x3e2ef4['push'](_0x3c4194[_0x43ceba(0x2fe)]);else{if(DataManager[_0x43ceba(0x2f3)](_0x450022))_0x3e2ef4[_0x43ceba(0x1e8)](_0x3c4194['commonWeaponIcon']);else DataManager[_0x43ceba(0x2a7)](_0x450022)&&_0x3e2ef4['push'](_0x3c4194[_0x43ceba(0x225)]);}}}if(_0x450022['note'][_0x43ceba(0x2db)](/<VISUAL DROP RARITY:[ ](\d+)>/i)){const _0x1c9e1e=Number(RegExp['$1'])[_0x43ceba(0x249)](0x0,0xa);_0x3e2ef4[_0x43ceba(0x1e8)](_0x9fa6ce[_0x43ceba(0x1e6)[_0x43ceba(0x200)](_0x1c9e1e)]||[0x0,0x0,0x0,0x0]),_0x3e2ef4[_0x43ceba(0x1e8)](_0x9fa6ce[_0x43ceba(0x1f3)[_0x43ceba(0x200)](_0x1c9e1e)]||0xb4),_0x3e2ef4['push'](_0x9fa6ce[_0x43ceba(0x251)['format'](_0x1c9e1e)]||[]);}else{if(_0x450022[_0x43ceba(0x21c)][_0x43ceba(0x2db)](/<VISUAL DROP TINT COLOR:[ ](.*)>/i)){let _0x213a87=String(RegExp['$1'])[_0x43ceba(0x1ed)](',')[_0x43ceba(0x2ae)](_0x5812b9=>Number(_0x5812b9)[_0x43ceba(0x249)](-0xff,0xff));while(_0x213a87[_0x43ceba(0x224)]<0x4)_0x213a87[_0x43ceba(0x1e8)](0x0);_0x3e2ef4[_0x43ceba(0x1e8)](_0x213a87);}else _0x3e2ef4[_0x43ceba(0x1e8)](_0x9fa6ce['Tint0']);_0x450022[_0x43ceba(0x21c)][_0x43ceba(0x2db)](/<VISUAL DROP TINT DURATION:[ ](\d+)>/i)?_0x3e2ef4['push'](Number(RegExp['$1'])||0xb4):_0x3e2ef4['push'](_0x9fa6ce[_0x43ceba(0x308)]),_0x3e2ef4[_0x43ceba(0x1e8)](JsonEx[_0x43ceba(0x283)](_0x9fa6ce['Flags0']));}const _0x3e9e06=_0x450022[_0x43ceba(0x21c)][_0x43ceba(0x2db)](/<VISUAL DROP FLAG:[ ](.*)>/gi);if(_0x3e9e06)for(const _0x24428a of _0x3e9e06){_0x24428a['match'](/<VISUAL DROP FLAG:[ ](.*)>/i);const _0x9836ef=String(RegExp['$1']);_0x3e2ef4[_0x3e2ef4[_0x43ceba(0x224)]-0x1][_0x43ceba(0x1e8)](_0x9836ef);}if(_0x450022[_0x43ceba(0x21c)]['match'](/<VISUAL DROP SFX:[ ](.*)>/i)){const _0x1b4983='SPAWN\x20SFX:\x20%1'[_0x43ceba(0x200)](String(RegExp['$1']));_0x3e2ef4[_0x3e2ef4[_0x43ceba(0x224)]-0x1]['push'](_0x1b4983);}if(_0x450022[_0x43ceba(0x21c)][_0x43ceba(0x2db)](/<VISUAL DROP SPAWN SFX:[ ](.*)>/i)){const _0x2f8d75=_0x43ceba(0x29c)[_0x43ceba(0x200)](String(RegExp['$1']));_0x3e2ef4[_0x3e2ef4[_0x43ceba(0x224)]-0x1][_0x43ceba(0x1e8)](_0x2f8d75);}if(_0x450022['note'][_0x43ceba(0x2db)](/<VISUAL DROP BOUNCE HEIGHT:[ ](\d+)([%％])>/i)){const _0x198396=_0x43ceba(0x232)[_0x43ceba(0x200)](Number(RegExp['$1']));_0x3e2ef4[_0x3e2ef4['length']-0x1]['push'](_0x198396);}if(_0x450022['note']['match'](/<VISUAL DROP BOUNCE SFX:[ ](.*)>/i)){const _0xc0bda5='BOUNCE\x20SFX:\x20%1'[_0x43ceba(0x200)](String(RegExp['$1']));_0x3e2ef4[_0x3e2ef4[_0x43ceba(0x224)]-0x1][_0x43ceba(0x1e8)](_0xc0bda5);}_0x6ed24d[_0x43ceba(0x1e8)](_0x3e2ef4);}return _0x6ed24d;},VisuMZ[_0x2afbfb(0x29e)][_0x2afbfb(0x23e)]=function(_0x502570,_0x1c1101){const _0x189c90=_0x2afbfb;_0x1c1101=_0x1c1101[_0x189c90(0x26b)](_0x163cef=>_0x163cef[0x0]!==0x0);if(_0x1c1101[_0x189c90(0x224)]<=0x0)return[];const _0x1f4705=VisuMZ[_0x189c90(0x208)][_0x189c90(0x26e)][_0x189c90(0x2e2)],_0x7b09a6=0x168/_0x1c1101['length'],_0x46ccde=_0x502570[_0x189c90(0x2a9)](),_0xc152cd=[];let _0x5257ab=Math[_0x189c90(0x28c)](0x168);for(const _0x57cd3f of _0x1c1101){if(_0x57cd3f[0x0]<=0x0)continue;const _0x228e71=new Sprite_VisualDrop(_0x502570,_0x57cd3f);_0xc152cd[_0x189c90(0x1e8)](_0x228e71);if(_0x46ccde&&_0x1c1101[_0x189c90(0x224)]>0x1){const _0x4fedc5=_0x1f4705['radius']+_0x1f4705[_0x189c90(0x2e5)]*_0x1c1101[_0x189c90(0x224)],_0x3be7da=_0x4fedc5*Math['cos'](_0x5257ab*Math['PI']/0xb4),_0x40f901=_0x4fedc5*(Math[_0x189c90(0x21b)](_0x5257ab*Math['PI']/0xb4)*_0x1f4705[_0x189c90(0x2ca)]);_0x228e71['setTargetDestination'](_0x3be7da+_0x46ccde[_0x189c90(0x257)],_0x40f901+_0x46ccde[_0x189c90(0x28e)]),_0x5257ab+=_0x7b09a6;}}return _0xc152cd;},VisuMZ['VisualDrops']['Spriteset_Battle_createLowerLayer']=Spriteset_Battle[_0x2afbfb(0x1f9)][_0x2afbfb(0x295)],Spriteset_Battle['prototype'][_0x2afbfb(0x295)]=function(){const _0x2edd22=_0x2afbfb;VisuMZ[_0x2edd22(0x29e)][_0x2edd22(0x293)][_0x2edd22(0x2cc)](this),this[_0x2edd22(0x297)]();},Spriteset_Battle[_0x2afbfb(0x1f9)][_0x2afbfb(0x297)]=function(){const _0x213651=_0x2afbfb;$gameTemp['_visualDropSprites']=$gameTemp['_visualDropSprites']||[];for(const _0x45f80c of $gameTemp[_0x213651(0x2d0)]){if(!_0x45f80c)continue;const _0x3ccf05=new Sprite_VisualDrop(_0x45f80c[_0x213651(0x318)],_0x45f80c[_0x213651(0x242)],_0x45f80c);this[_0x213651(0x1dd)][_0x213651(0x254)](_0x3ccf05);}};function Sprite_VisualDrop(){const _0x305ea1=_0x2afbfb;this[_0x305ea1(0x301)](...arguments);}Sprite_VisualDrop['prototype']=Object['create'](Sprite[_0x2afbfb(0x1f9)]),Sprite_VisualDrop[_0x2afbfb(0x1f9)]['constructor']=Sprite_VisualDrop,Sprite_VisualDrop[_0x2afbfb(0x1f9)][_0x2afbfb(0x301)]=function(_0x39d10e,_0x16fc99,_0x218d47){const _0x23aeb5=_0x2afbfb;_0x218d47?(this[_0x23aeb5(0x307)]=_0x218d47,this['_baseX']=this['_data']['baseX'],this[_0x23aeb5(0x28e)]=this[_0x23aeb5(0x307)][_0x23aeb5(0x2cd)]):this[_0x23aeb5(0x307)]=this[_0x23aeb5(0x20e)](_0x39d10e,_0x16fc99),Sprite['prototype'][_0x23aeb5(0x301)][_0x23aeb5(0x2cc)](this),this[_0x23aeb5(0x2f1)]();},Sprite_VisualDrop[_0x2afbfb(0x1f9)][_0x2afbfb(0x20e)]=function(_0x373ed1,_0x19d612){const _0x4dfee4=_0x2afbfb,_0x14e6e4=VisuMZ['ExtraEnemyDrops'][_0x4dfee4(0x26e)][_0x4dfee4(0x2e2)],_0x313d39=_0x373ed1[_0x4dfee4(0x2a9)]();_0x19d612=JsonEx[_0x4dfee4(0x283)](_0x19d612);const _0x59c147={'enemy':_0x373ed1,'iconIndex':_0x19d612[0x0],'duration':_0x14e6e4[_0x4dfee4(0x294)],'angle':_0x14e6e4[_0x4dfee4(0x20f)],'jumpHeight':0x0,'bounces':_0x14e6e4[_0x4dfee4(0x204)],'bounceSFX':_0x14e6e4[_0x4dfee4(0x2ee)],'targetX':_0x313d39['_baseX'],'targetY':_0x313d39[_0x4dfee4(0x28e)],'targetOpacity':0xff,'opacityModifier':0x1,'rarityFrames':0x0,'rarityTint':_0x19d612[0x1]||[0x0,0x0,0x0,0x0],'rarityDuration':_0x19d612[0x2]||0xb4,'flags':_0x19d612[0x3]||[]};this['_baseX']=_0x313d39[_0x4dfee4(0x257)],this[_0x4dfee4(0x28e)]=_0x313d39['_baseY'],_0x59c147[_0x4dfee4(0x2ad)]=this[_0x4dfee4(0x257)],_0x59c147['baseY']=this['_baseY'],_0x59c147[_0x4dfee4(0x319)]=_0x59c147[_0x4dfee4(0x319)][_0x4dfee4(0x2ae)](_0x443ba7=>String(_0x443ba7));for(const _0x3c0cf6 of _0x59c147[_0x4dfee4(0x319)]){if(!_0x3c0cf6)continue;if(_0x3c0cf6[_0x4dfee4(0x2db)](/BOUNCE SFX: (.*)/i)){const _0x1d3ae0=String(RegExp['$1']);_0x59c147['bounceSFX']=_0x1d3ae0;}}return _0x59c147;},Sprite_VisualDrop[_0x2afbfb(0x1f9)]['createChildren']=function(){const _0x483a99=_0x2afbfb;this[_0x483a99(0x27d)](),this['createIconSprite'](),this[_0x483a99(0x2e9)](!![]);},Sprite_VisualDrop[_0x2afbfb(0x1f9)]['createShadowSprite']=function(){const _0x22eb29=_0x2afbfb,_0x248ece=VisuMZ[_0x22eb29(0x208)][_0x22eb29(0x26e)]['General'];if(!_0x248ece[_0x22eb29(0x1e4)])return;this[_0x22eb29(0x239)]=new Sprite(),this['_shadowSprite']['bitmap']=ImageManager['loadSystem'](_0x248ece[_0x22eb29(0x2da)]),this[_0x22eb29(0x239)]['anchor']['x']=0.5,this['_shadowSprite']['anchor']['y']=0x1,this['_shadowSprite']['x']=_0x248ece['shadowOffsetX'],this[_0x22eb29(0x239)]['y']=_0x248ece[_0x22eb29(0x1e9)],this[_0x22eb29(0x239)][_0x22eb29(0x2a6)]=_0x248ece[_0x22eb29(0x30e)],this[_0x22eb29(0x254)](this['_shadowSprite']);},Sprite_VisualDrop[_0x2afbfb(0x1f9)][_0x2afbfb(0x2ef)]=function(){const _0x560938=_0x2afbfb,_0x1d91d5=VisuMZ[_0x560938(0x208)]['Settings'][_0x560938(0x2e2)];this[_0x560938(0x214)]=new Sprite(),this[_0x560938(0x214)]['bitmap']=ImageManager[_0x560938(0x2ff)](_0x560938(0x244)),this[_0x560938(0x214)][_0x560938(0x248)]['x']=0.5,this[_0x560938(0x214)][_0x560938(0x248)]['y']=0.5,this[_0x560938(0x214)][_0x560938(0x2cd)]=Math[_0x560938(0x303)](ImageManager['iconHeight']/_0x1d91d5[_0x560938(0x262)]),this[_0x560938(0x214)]['y']=this[_0x560938(0x214)][_0x560938(0x2cd)];const _0x4758c6=this[_0x560938(0x307)][_0x560938(0x242)],_0x268b94=ImageManager['iconWidth'],_0x401e5d=ImageManager[_0x560938(0x240)],_0x1e3099=_0x4758c6%0x10*_0x268b94,_0x3fafa0=Math[_0x560938(0x310)](_0x4758c6/0x10)*_0x401e5d;this[_0x560938(0x214)][_0x560938(0x1fc)](_0x1e3099,_0x3fafa0,_0x268b94,_0x401e5d),this['addChild'](this[_0x560938(0x214)]);},Sprite_VisualDrop['prototype'][_0x2afbfb(0x24d)]=function(_0x18e23b,_0x197cf0){const _0x55fb26=_0x2afbfb;this[_0x55fb26(0x307)]['targetX']=Math[_0x55fb26(0x303)](_0x18e23b),this[_0x55fb26(0x307)][_0x55fb26(0x30d)]=Math[_0x55fb26(0x303)](_0x197cf0);},Sprite_VisualDrop[_0x2afbfb(0x1f9)][_0x2afbfb(0x282)]=function(_0x2a5588){const _0x4e04dd=_0x2afbfb,_0x381f9e=VisuMZ[_0x4e04dd(0x208)][_0x4e04dd(0x26e)][_0x4e04dd(0x1ee)],_0x48cd45=(_0x381f9e[_0x4e04dd(0x1e6)[_0x4e04dd(0x200)](_0x2a5588)]||[0x0,0x0,0x0,0x0])[_0x4e04dd(0x2ae)](_0xd6f43a=>Number(_0xd6f43a)[_0x4e04dd(0x249)](-0xff,0xff)),_0x3f6eba=_0x381f9e[_0x4e04dd(0x1f3)['format'](_0x2a5588)]||0x0;this['setTintInformation'](_0x48cd45,_0x3f6eba);},Sprite_VisualDrop['prototype']['setTintInformation']=function(_0xc2389e,_0x5b3da9){const _0x37401b=_0x2afbfb;this[_0x37401b(0x307)]['rarityTint']=JsonEx[_0x37401b(0x283)](_0xc2389e),this[_0x37401b(0x307)][_0x37401b(0x203)]=_0x5b3da9;},Sprite_VisualDrop[_0x2afbfb(0x1f9)][_0x2afbfb(0x1d2)]=function(_0x1af65e){const _0x4f133a=_0x2afbfb;this[_0x4f133a(0x307)][_0x4f133a(0x319)]=JsonEx[_0x4f133a(0x283)](_0x1af65e)['map'](_0x5096a8=>String(_0x5096a8));},Sprite_VisualDrop[_0x2afbfb(0x1f9)][_0x2afbfb(0x2bd)]=function(){const _0x4b1abd=_0x2afbfb;this[_0x4b1abd(0x307)]['targetOpacity']=0x0;},Sprite_VisualDrop[_0x2afbfb(0x1f9)][_0x2afbfb(0x253)]=function(){const _0x55e49b=_0x2afbfb;for(const _0x2d3d34 of this[_0x55e49b(0x307)]['flags']){if(!_0x2d3d34)continue;if(_0x2d3d34['match'](/\bSPAWN SFX:[ ](.*)\b/i)){const _0xe9427f={'name':String(RegExp['$1']),'volume':0x5a,'pitch':0x64,'pan':0x0};AudioManager[_0x55e49b(0x1ce)](_0xe9427f);}}},Sprite_VisualDrop[_0x2afbfb(0x1f9)]['update']=function(){const _0x58e96e=_0x2afbfb;Sprite[_0x58e96e(0x1f9)][_0x58e96e(0x260)][_0x58e96e(0x2cc)](this),this['updateOpacity']();if(this['opacity']<=0x0)return;this[_0x58e96e(0x29b)](),this[_0x58e96e(0x20d)](),this[_0x58e96e(0x1cc)](),this['calculatePosition'](),this[_0x58e96e(0x211)](),this['updateTint'](),this['updateDuration']();},Sprite_VisualDrop[_0x2afbfb(0x1f9)][_0x2afbfb(0x29b)]=function(){const _0x5e701d=_0x2afbfb;for(const _0x4a1cef of this[_0x5e701d(0x307)][_0x5e701d(0x319)]){if(!_0x4a1cef)continue;this[_0x5e701d(0x21e)](_0x4a1cef);}},Sprite_VisualDrop['prototype'][_0x2afbfb(0x21e)]=function(_0x2c5542){const _0x546d83=_0x2afbfb,_0x5b8015=VisuMZ['ExtraEnemyDrops'][_0x546d83(0x26e)]['Rarity'];switch(_0x2c5542[_0x546d83(0x2be)]()[_0x546d83(0x27e)]()){case _0x546d83(0x238):this[_0x546d83(0x307)][_0x546d83(0x272)]=this['_data'][_0x546d83(0x272)]||0x0,this[_0x546d83(0x307)]['hue']+=_0x5b8015['RainbowHueSpeed'],this[_0x546d83(0x214)][_0x546d83(0x2dc)](this[_0x546d83(0x307)]['hue']);break;case'ADDITIVE':this[_0x546d83(0x214)][_0x546d83(0x312)]=0x1;break;case _0x546d83(0x280):this[_0x546d83(0x214)][_0x546d83(0x312)]=0x2;break;case _0x546d83(0x259):this[_0x546d83(0x214)][_0x546d83(0x312)]=0x3;break;};},Sprite_VisualDrop[_0x2afbfb(0x1f9)][_0x2afbfb(0x2e9)]=function(_0x5e5b3f){const _0x48bdfe=_0x2afbfb,_0x368b8e=VisuMZ['ExtraEnemyDrops'][_0x48bdfe(0x26e)][_0x48bdfe(0x2e2)],_0x2db185=this[_0x48bdfe(0x307)][_0x48bdfe(0x29d)]['clamp'](0x0,0xff)*this[_0x48bdfe(0x1d6)]();if(this['opacity']>_0x2db185)this[_0x48bdfe(0x2a6)]=Math[_0x48bdfe(0x22a)](this[_0x48bdfe(0x2a6)]-_0x368b8e[_0x48bdfe(0x1ff)],_0x2db185);else this[_0x48bdfe(0x2a6)]<_0x2db185&&(this[_0x48bdfe(0x2a6)]=Math[_0x48bdfe(0x235)](this[_0x48bdfe(0x2a6)]+_0x368b8e[_0x48bdfe(0x1ff)],_0x2db185));if(_0x5e5b3f)this[_0x48bdfe(0x2a6)]=_0x2db185;},Sprite_VisualDrop[_0x2afbfb(0x1f9)][_0x2afbfb(0x1d6)]=function(){const _0x1d409f=_0x2afbfb;if(!BattleManager['_visualDropsVisible'])return 0x0;if($gameTroop['hasForcedDrops']())return 0x0;return this[_0x1d409f(0x307)]['opacityModifier'];},Sprite_VisualDrop['prototype'][_0x2afbfb(0x20d)]=function(){const _0x3c7197=_0x2afbfb;this['_data']['duration']>0x0?this[_0x3c7197(0x214)][_0x3c7197(0x20f)]-=this['rotationConstant']():this[_0x3c7197(0x214)][_0x3c7197(0x20f)]=0x0;},Sprite_VisualDrop[_0x2afbfb(0x1f9)]['rotationConstant']=function(){const _0x34ea7c=_0x2afbfb;if(this[_0x34ea7c(0x313)]!==undefined)return this[_0x34ea7c(0x313)];const _0x2ffdd6=VisuMZ[_0x34ea7c(0x208)][_0x34ea7c(0x26e)][_0x34ea7c(0x2e2)];return this[_0x34ea7c(0x313)]=_0x2ffdd6[_0x34ea7c(0x20f)]/_0x2ffdd6[_0x34ea7c(0x294)],this[_0x34ea7c(0x313)];},Sprite_VisualDrop['prototype']['updateJumpHeight']=function(){const _0x4169df=_0x2afbfb;this[_0x4169df(0x307)]['duration']>0x0?this[_0x4169df(0x307)][_0x4169df(0x292)]=this['calculateJumpHeight']():this[_0x4169df(0x307)]['jumpHeight']=0x0,this['_iconSprite']['y']=this['_iconSprite']['baseY']-this[_0x4169df(0x307)][_0x4169df(0x292)];},Sprite_VisualDrop['prototype'][_0x2afbfb(0x2b4)]=function(){const _0x34216f=_0x2afbfb,_0x4c8de2=VisuMZ['ExtraEnemyDrops'][_0x34216f(0x26e)][_0x34216f(0x2e2)],_0x567171=_0x4c8de2[_0x34216f(0x204)],_0x1f6470=this[_0x34216f(0x307)][_0x34216f(0x204)],_0x26e17d=Math[_0x34216f(0x1df)](_0x4c8de2[_0x34216f(0x247)],_0x567171-_0x1f6470),_0x3b3c98=Math['round'](_0x4c8de2[_0x34216f(0x2b6)]*_0x26e17d),_0x5c3261=Math[_0x34216f(0x303)](_0x4c8de2[_0x34216f(0x294)]*_0x26e17d),_0x4f2945=this['_data'][_0x34216f(0x294)],_0x64a2d3=_0x4f2945,_0x2bd730=_0x5c3261-_0x64a2d3,_0x3fb008=_0x5c3261/0x2,_0xea2a14=_0x3b3c98,_0x4c6c62=-_0xea2a14/Math[_0x34216f(0x1df)](_0x3fb008,0x2),_0x201e04=_0x4c6c62*Math['pow'](_0x2bd730-_0x3fb008,0x2)+_0xea2a14;let _0x21020d=0x1;for(const _0x30f261 of this['_data'][_0x34216f(0x319)]){if(!_0x30f261)continue;_0x30f261[_0x34216f(0x2db)](/BOUNCE HEIGHT (\d+)([%％])/i)&&(_0x21020d*=Number(RegExp['$1'])/0x64);}return _0x201e04*_0x21020d;},Sprite_VisualDrop[_0x2afbfb(0x1f9)][_0x2afbfb(0x291)]=function(){const _0x16c5ca=_0x2afbfb;if(this['_data'][_0x16c5ca(0x294)]>0x0){const _0x9429aa=VisuMZ[_0x16c5ca(0x208)][_0x16c5ca(0x26e)][_0x16c5ca(0x2e2)],_0x2eccdd=this[_0x16c5ca(0x307)][_0x16c5ca(0x294)],_0x3437d=_0x9429aa[_0x16c5ca(0x294)],_0x4c89f4=_0x9429aa[_0x16c5ca(0x1d0)];Imported[_0x16c5ca(0x302)]?(this[_0x16c5ca(0x257)]=this['applyEasing'](this[_0x16c5ca(0x257)],this[_0x16c5ca(0x307)][_0x16c5ca(0x2d9)],_0x2eccdd,_0x3437d,_0x4c89f4),this[_0x16c5ca(0x28e)]=this[_0x16c5ca(0x221)](this[_0x16c5ca(0x28e)],this[_0x16c5ca(0x307)][_0x16c5ca(0x30d)],_0x2eccdd,_0x3437d,_0x4c89f4)):(this[_0x16c5ca(0x257)]=(this['_baseX']*(_0x2eccdd-0x1)+this[_0x16c5ca(0x307)][_0x16c5ca(0x2d9)])/_0x2eccdd,this[_0x16c5ca(0x28e)]=(this[_0x16c5ca(0x28e)]*(_0x2eccdd-0x1)+this['_data'][_0x16c5ca(0x30d)])/_0x2eccdd);}else this[_0x16c5ca(0x257)]=this[_0x16c5ca(0x307)][_0x16c5ca(0x2d9)],this[_0x16c5ca(0x28e)]=this[_0x16c5ca(0x307)][_0x16c5ca(0x30d)];this[_0x16c5ca(0x307)][_0x16c5ca(0x2ad)]=this[_0x16c5ca(0x257)],this[_0x16c5ca(0x307)][_0x16c5ca(0x2cd)]=this[_0x16c5ca(0x28e)];},Sprite_VisualDrop[_0x2afbfb(0x1f9)][_0x2afbfb(0x221)]=function(_0x248f11,_0x1243b1,_0x4b89e8,_0x4096d4,_0x5b9125){const _0x179cfe=_0x2afbfb,_0x1fcc34=VisuMZ[_0x179cfe(0x2b9)]((_0x4096d4-_0x4b89e8)/_0x4096d4,_0x5b9125||_0x179cfe(0x267)),_0x30b50c=VisuMZ[_0x179cfe(0x2b9)]((_0x4096d4-_0x4b89e8+0x1)/_0x4096d4,_0x5b9125||_0x179cfe(0x267)),_0x2278ac=(_0x248f11-_0x1243b1*_0x1fcc34)/(0x1-_0x1fcc34);return _0x2278ac+(_0x1243b1-_0x2278ac)*_0x30b50c;},Sprite_VisualDrop[_0x2afbfb(0x1f9)][_0x2afbfb(0x211)]=function(){const _0xbd68e0=_0x2afbfb;this['x']=this[_0xbd68e0(0x257)],this['y']=this[_0xbd68e0(0x28e)];},Sprite_VisualDrop[_0x2afbfb(0x1f9)][_0x2afbfb(0x230)]=function(){const _0x527366=_0x2afbfb;if(!VisuMZ['ExtraEnemyDrops'][_0x527366(0x26e)][_0x527366(0x1ee)]['show'])return;const _0x2296a9=this[_0x527366(0x307)];_0x2296a9[_0x527366(0x228)]++;const _0x3c8f0c=_0x2296a9[_0x527366(0x228)]%_0x2296a9[_0x527366(0x203)],_0x54d609=_0x2296a9[_0x527366(0x203)]-_0x3c8f0c,_0x477b15=_0x2296a9['rarityDuration']/0x2,_0xc85c92=0x1,_0x2fd65b=-_0xc85c92/Math[_0x527366(0x1df)](_0x477b15,0x2),_0x277d5a=_0x2fd65b*Math['pow'](_0x54d609-_0x477b15,0x2)+_0xc85c92,_0x1ad884=_0x2296a9[_0x527366(0x1f6)][_0x527366(0x2ae)](_0x30562a=>_0x30562a*_0x277d5a);this[_0x527366(0x214)][_0x527366(0x1fe)](_0x1ad884);},Sprite_VisualDrop[_0x2afbfb(0x1f9)][_0x2afbfb(0x2fc)]=function(){const _0x3c93da=_0x2afbfb;this['_data'][_0x3c93da(0x294)]--;if(this['_data'][_0x3c93da(0x294)]===0x0&&this[_0x3c93da(0x307)][_0x3c93da(0x204)]>=0x0){this[_0x3c93da(0x307)][_0x3c93da(0x204)]-=0x1;const _0x56ece5=VisuMZ[_0x3c93da(0x208)]['Settings'][_0x3c93da(0x2e2)],_0x1cc8eb=_0x56ece5[_0x3c93da(0x204)],_0x301318=this['_data'][_0x3c93da(0x204)],_0x519a71=Math[_0x3c93da(0x1df)](_0x56ece5[_0x3c93da(0x247)],_0x1cc8eb-_0x301318);if(this['_data']['bounces']>=0x0)this['_data'][_0x3c93da(0x294)]=Math[_0x3c93da(0x303)](_0x56ece5[_0x3c93da(0x294)]*_0x519a71);else _0x56ece5['fadeAfterBounce']&&setTimeout(this['startFadeOut'][_0x3c93da(0x226)](this),_0x56ece5['fadeAfterDelay']);if(_0x56ece5[_0x3c93da(0x2ee)]){const _0x4fe96f={'name':this[_0x3c93da(0x307)]['bounceSFX'],'volume':Math[_0x3c93da(0x303)](_0x56ece5[_0x3c93da(0x281)]*_0x519a71),'pitch':_0x56ece5[_0x3c93da(0x206)],'pan':_0x56ece5[_0x3c93da(0x255)]};AudioManager[_0x3c93da(0x1ce)](_0x4fe96f);}}};};
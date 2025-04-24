//=============================================================================
// VisuStella MZ - Battle System BTB - Brave Turn Battle
// VisuMZ_2_BattleSystemBTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemBTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemBTB = VisuMZ.BattleSystemBTB || {};
VisuMZ.BattleSystemBTB.version = 1.14;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.14] [BattleSystemBTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_BTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Brave Turn Battle (BTB) system plays off RPG Maker MZ's default battle
 * system with a twist of allowing actors (and enemies) to use up actions from
 * the future or save up for later. These actions will be queued and delivered
 * all in one go! Any borrowed actions from the future will result in following
 * turns without any actions to use. Should a player decide to save up their
 * actions instead through Guarding, they can charge actions with less
 * repercussions. Players will have to be brave about how to go about the
 * battle system strategically.
 * 
 * Because multiple actions can be queued up all at once, they can result in
 * the creation of an action fusion. Some skills (and items) can appear instead
 * of the originally queued actions to result in stronger, better, and more
 * awesome effects, all of which, can be defined by the game dev.
 * 
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "btb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Puts a twist on the Default Turn Battle system by allowing brave players
 *   to borrow actions from the future turns or save them up for later turns.
 * * Brave Points, a new currency, are added to mark how many saved turns there
 *   are for each battler.
 * * Certain actions can cost more Brave Points than others.
 * * Effects that allow battlers to alter the Brave Points of their targets.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Action fusion system which takes any of the queued up skills and/or items
 *   to bring forth new ones.
 * * Action fusion combinations can be either flexible or strict.
 * * Flexible action fusion combinations can have their actions queued up in
 *   any order to bring forth the result.
 * * Strict action fusion combinations must require their actions to be queued
 *   up in a specific order in order to bring forth the result.
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
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
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
 * Turn Order Display
 * 
 * The Turn Order Display will capture the battle's currently active battler
 * and any battlers found in the active battlers array for the BattleManager.
 * This does not overwrite any functions, but the Turn Order Display may or may
 * not conflict with any existing HUD elements that are already positioned on
 * the screen. If so, you can choose to offset the Turn Order Display or move
 * it to a different part of the screen through the plugin parameters.
 * 
 * ---
 * 
 * Brave Points and the Brave Command
 * 
 * Abbreviated to "BP", Brave Points are a new currency available through the
 * Brave Turn Battle system. Battlers require at least 0 BP in order to perform
 * any actions for that turn. By default, each action consumes 1 BP. At the end
 * of each turn, each battler regenerates 1 BP. With the normal flow of battle,
 * this results in a net balance.
 * 
 * However, the player can activate the "Brave Command" located right above the
 * Guard Command. This lets the battler create an extra action to perform. When
 * used, the flow of battle will result in a negative net of BP. When BP is at
 * -1 or under, that battler's turn is skipped until it raises back to 0. This
 * effectively means that the "Brave Command" will borrow actions from future
 * turns.
 * 
 * The Guard Command, however will never consume any BP for its actions even if
 * replaced as it is always determined by the battler's current guard skill.
 * This means that when used, the Guard Command lets a battler save up BP for
 * future turns, allowing BP to go net positive for the turn.
 * 
 * By strategically deciding when to borrow actions or save up for them, whole
 * new strategies can be created for battle.
 * 
 * The game dev has control over how many max actions can be borrowed at once,
 * the maximum and minimum amounts for BP to go to, how much BP will cost at
 * default, and how much BP can be regenerated by default. These settings can
 * all be made within the Plugin Parameters.
 * 
 * ---
 *
 * Action Times +
 * 
 * While the Brave Turn Battle system is active, the "Action Times +" trait
 * is disabled. This is to prevent any conflicts with the Brave system. If the
 * Brave Turn Battle system is disabled during the course of the game, then the
 * "Action Times +" will resume working like normal.
 *
 * ---
 * 
 * Can Input
 * 
 * As mentioned in the "Brave Points and the Brave Command" above, if BP is
 * under 0, then that battler cannot input or act for that turn. The battler
 * would have to wait for BP regenerate back up to 0 first.
 * 
 * ---
 * 
 * Can Guard
 * 
 * The Guard action is only enabled when there's one action to use for that
 * turn. This means that if the "Brave Command" is used to generate new actions
 * to perform during that turn, the Guard Command will be disabled. It can be
 * enabled once again if the player cancels out the Brave Command until the
 * action count reaches 1.
 * 
 * ---
 * 
 * Enemy Brave Actions
 * 
 * Enemies can also use the "Brave Command" by faking it. By making a dummy
 * skill with the <BTB Multiple Actions: id, id, id, id> skill notetag or the
 * <BTB Multiple Actions: name, name, name, name> skill notetag, you can have
 * the enemy perform the exact skills you want in a multi-action queue.
 * 
 * Enemies that use this will also suffer from heavy BP expenditure and wait on
 * subsequent turns until they have enough BP to perform actions again.
 * 
 * This is also how you can have enemies perform Action Fusions. For the queued
 * skills, load up the Action Fusion's skill combination you want for the enemy
 * to perform.
 * 
 * ---
 *
 * ============================================================================
 * Action Fusions
 * ============================================================================
 *
 * This feature deserves its own section as it's quite indepth with how it
 * works. Action Fusions can be performed by either the actor and/or enemy
 * (though this can be disabled in the Plugin Parameters or through traits).
 * In order for them to occur, the queued up action list must have a certain
 * combination of skills/items for the Action Fusion to occur.
 *
 * ---
 * 
 * Fusion Types
 * 
 * There are two types of Action Fusions: Flexible and Strict. Flexible Action
 * Fusions can use a combination of skills/items in any order (thus flexible),
 * while Strict Action Fusions must have their skill/item combinations queued
 * up in the exact order they're listed (thus strict).
 * 
 * They all share the following properties:
 * 
 * Skill Action Fusions can only use skills for combinations. This means that
 * Action Fusions made as a skill database object cannot have item requirements
 * for the combinations.
 * 
 * Item Action Fusions can only use items for combinations. This means that
 * Action Fusions made as an item database object cannot have skills for the
 * combination requirements.
 * 
 * Skills and items that have selectable targets need to have matching targets
 * to be a part of the same Action Fusion combination. For example, if "Quad
 * Attack" requires "Attack", "Attack", "Attack", "Attack", then the player
 * would have to target the same enemy for each of the "Attack" actions. This
 * is to prevent the cases where the player wants to spread out the damage
 * evenly across various enemies without forming it into a single target "Quad
 * Attack" against one.
 * 
 * Skills and items that do not have selectable targets are combination targets
 * for any and all candidates. This means an area of effect "Flame" spell can
 * combine with any target selectable or otherwise skill.
 * 
 * When an Action Fusion is performed, it will not consume the resources for
 * the database object itself, but instead, from each of the skills/items used
 * to bring it out. This means the skill costs of the Action Fusion itself are
 * irrelevant, but the skill costs of the combinations do matter and will be
 * consumed instead. The same applies to items.
 * 
 * If the Action Fusion skill/item is used directly, its resource consumption
 * will be performed as if it was not an Action Fusion skill/item. The "Quad
 * Attack" skill will use its regular MP and TP costs while the "Double Elixir"
 * item will consume itself.
 * 
 * If a queue could potentially meet the demands of multiple Action Fusions,
 * then the Action Fusion with the highest database ID will be given priority,
 * as to make it less complicated. This means if the "Double Attack" Action
 * Fusion and "Triple Attack" Action Fusion were to occur at the same time,
 * if the "Triple Attack" skill has a higher ID than "Double Attack", then
 * "Triple Attack" will take priority instead.
 * 
 * The battler must be able to pay the actions of each of the queued actions
 * used to form the Action Fusion. This means if a battler would run out of MP
 * or items for the cost, it will just simply not occur.
 * 
 * An Action Fusion can have multiple combinations that create it as long as
 * there are multiple notetags that determine the Action Fusion. As an example,
 * the "Flame Strike" can occur with the "Attack" and "Flame" combination or
 * the "Strike" and "Flame" combination.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Examples:
 * 
 *   ---
 * 
 *   Fire Strike
 * 
 *   <BTB Flexible Fusion: Attack, Fire>
 * 
 *   This Action Fusion will occur if a battler has the "Attack" and "Fire"
 *   actions queued up in any order. "Attack" can come before "Fire" or "Fire"
 *   can come before "Attack" and it would still call upon "Fire Strike".
 * 
 *   ---
 * 
 *   Flame Strike
 * 
 *   <BTB Flexible Fusion: Attack, Flame>
 *   <BTB Flexible Fusion: Strike, Flame>
 * 
 *   This Action Fusion will occur if a battler has "Attack" and "Flame",
 *   "Flame" and "Attack", "Strike" and "Flame", or "Flame" and "Strike" in its
 *   action queue.
 * 
 *   ---
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Example:
 * 
 *   ---
 * 
 *   Shadow Flare Blade
 * 
 *   <BTB Strict Fusion: Shade II, Fire II, Attack>
 * 
 *   The battler must queue up "Shade II", "Fire II", and "Attack" in that
 *   exact order or else "Shadow Flare Blade" will not occur. Even if the
 *   battler changed the order to "Fire II", "Shade II", and "Attack", the
 *   Action Fusion will not occur.
 * 
 *   ---
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
 * VisuMZ_3_BoostAction
 * 
 * The Boost Actions plugin cannot be used together with Battle System - BTB.
 * If the Battle System is switched to using Battle System - BTB, then the
 * Boost Actions plugin will shut itself off.
 * 
 * The reason why these plugins cannot work together is because their mechanics
 * play off too similarly to each other and cause conflicts. We, the plugin
 * developer team, highly recommend that you utilize Battle System - BTB's
 * Brave system instead of the Boost system to make the best use of the battle
 * system in effect.
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
 * === General BTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <BTB Help>
 *  description
 *  description
 * </BTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under BTB.
 * - This is primarily used if the skill behaves differently in BTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to BTB.
 *
 * ---
 *
 * <BTB Cannot Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command disabled.
 *
 * ---
 *
 * <BTB Hide Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command hidden along with their
 *   BP values.
 *
 * ---
 * 
 * === BTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the BTB Turn Order Display
 * 
 * ---
 *
 * <BTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <BTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <BTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Brave Points Cost-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB BP Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Determines how much BP the battler uses when performing this action.
 * - Replace 'x' with a number value to determine its BP cost.
 *
 * ---
 *
 * <BTB Hide BP Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Prevents the BP cost from being shown for this action.
 *
 * ---
 * 
 * === Brave Point Manipulation-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB User Set BP: x>
 * <BTB Target Set BP: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the user/target's current BP to a specific value.
 * - Replace 'x' with a number value to determine how much you want the user
 *   or target's BP to be set to.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 *
 * <BTB User Gain BP: +x>
 * <BTB Target Gain BP: +x>
 *
 * <BTB User Lose BP: -x>
 * <BTB Target Lose BP: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to alter how much BP the user/target has.
 * - Replace 'x' with a number value to determine how much BP is gained/lost
 *   for the user/target.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 * 
 * === JavaScript Notetags: Brave Point Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over Brave Point alteration.
 * 
 * ---
 *
 * <JS BTB User BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB User BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the user's final
 *   BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the user's BP.
 *   This value also starts off as the user's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 *
 * <JS BTB Target BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB Target BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the current
 *   target's final BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the target's BP.
 *   This value also starts off as the target's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 * 
 * === Brave Point Managment-Related Notetags ===
 * 
 * The following notetags are used to for battlers to manage their BP settings
 * throughout the course of the fight.
 * 
 * ---
 *
 * <BTB Initial BP: +x>
 * <BTB Initial BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter that battler's initial BP at the start of battle.
 * - Replace 'x' with a number value representing how much you want to alter
 *   the affected battler's initial BP at the start of battle.
 *
 * ---
 *
 * <BTB BP Regen: +x>
 * <BTB BP Degen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter the amount of BP regenerated at the end of each battle turn.
 * - Replace 'x' with a number value representing how much BP is regenerated
 *   (or decreased). 
 *   - Use a positive number for gaining BP at the end of each turn.
 *   - Use a negative number for losing BP at the end of each turn.
 *
 * ---
 *
 * <BTB Maximum BP: +x>
 * <BTB Maximum BP: -x>
 *
 * <BTB Minimum BP: +x>
 * <BTB Minimum BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase or decrease the maximum/minimum BP that battler can have by 'x'.
 * - Replace 'x' with a number value representing the amount to change the
 *   battler's maximum/minimum BP by.
 * - These numbers cannot exceed or go under the designated amounts set by the
 *   hard cap in this plugin's Plugin Parameters.
 *
 * ---
 * 
 * === Multiple Action-Related Notetags ===
 * 
 * These notetags allow you to determine how multiple actions are handled
 * through the Brave Turn Battle system.
 * 
 * ---
 *
 * <BTB Maximum Actions: +x>
 * <BTB Maximum Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase/decrease the maximum number of actions that battler can have
 *   through the Brave Command.
 * - Replace 'x' with a number value representing the amount of maximum actions
 *   to increase/decrease by.
 * - This value cannot make a battler go below 1 maximum action.
 * - This value cannot make a battler go above the hard cap set in this
 *   plugin's Plugin Parameters.
 *
 * ---
 *
 * <BTB Multiple Actions: id, id>
 * <BTB Multiple Actions: id, id, id>
 * <BTB Multiple Actions: id, id, id, id>
 *
 * <BTB Multiple Actions: name, name>
 * <BTB Multiple Actions: name, name, name>
 * <BTB Multiple Actions: name, name, name, name>
 *
 * - Used for: Skill Notetags
 * - When an enemy (NOT ACTOR) uses this skill, the game will appear as if the
 *   enemy is using the Brave Command to load up multiple actions at a time.
 * - Replace 'id' with the database ID of the skill to use in the multiple
 *   action queue.
 * - Replace 'name' with the name of the skill to use in the enemy's multiple
 *   action queue.
 * 
 * ---
 * 
 * === Action Fusion-Related Notetags ===
 * 
 * For more details, please refer to the Action Fusion dedicated section listed
 * earlier in the documentation.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 *
 * <BTB Cannot Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler cannot perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
 *
 * ---
 *
 * <BTB Enable Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler is allowed to perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change BTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change BTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Actor: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change BTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change BTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: BTB Turn Order Visibility
 * - Determine the visibility of the BTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the BTB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings regarding Battle System BTB. These range from how Brave
 * Points (BP) appear in-game to how their costs are displayed.
 *
 * ---
 *
 * Brave Points
 * 
 *   Full Name:
 *   - What is the full name of "Brave Points" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Brave Points" in your game?
 * 
 *   Icon:
 *   - What icon do you wish to use to represent Brave Points?
 * 
 *   Cost Format:
 *   - How are Brave Point costs displayed?
 *   - %1 - Cost, %2 - BP Text, %3 - Icon
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the BP Cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the BP cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the BP cost for the Guard command?
 * 
 *   Reduce Shown BP Cost:
 *   - Reduce shown BP costs by this much.
 *   - Used to match traditional games.
 * 
 *   Show Cost: 0 BP:
 *   - Show the BP cost when the cost is 0 BP?
 *   - Shown BP Cost reduction is applied.
 * 
 *   Show Cost: 1 BP:
 *   - Show the BP cost when the cost is 1 BP?
 *   - Shown BP Cost reduction is applied.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Adjust the mechanics settings for the Battle System BTB. Mechanics range
 * from how speed is handled to Brave action caps, how Brave Points are
 * managed, and Action Fusions.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Brave Action Max
 * 
 *   Default:
 *   - What is the default number of max actions a battler can have from the
 *     Brave system?
 * 
 *   Hard Cap:
 *   - What is the absolute highest for maximum actions a battler can have
 *     from the Brave system?
 *
 * ---
 *
 * Brave Points > Limits
 * 
 *   Default Maximum:
 *   - What is the default maximum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Default Minimum:
 *   - What is the default minimum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Hard Cap Maximum:
 *   - What is the absolute maximum number of Brave Points a battler can have
 *     at a time?
 * 
 *   Hard Cap Minimum:
 *   - What is the absolute minimum number of Brave Points a battler can have
 *     at a time?
 *
 * ---
 *
 * Brave Points > Costs
 * 
 *   Default Skill Cost:
 *   - How many Brave Points does a skill cost by default?
 * 
 *   Default Item Cost:
 *   - How many Brave Points does an item cost by default?
 * 
 *   Predicted Cost:
 *   - What is considered predicted cost?
 *
 * ---
 *
 * Brave Points > Start Battle
 * 
 *   Neutral:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     neutral?
 * 
 *   Favored:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     favored?
 *
 * ---
 *
 * Brave Points > Regeneration
 * 
 *   Base Recovery:
 *   - How many Brave Points are regenerated at the end of each turn?
 * 
 *   Needs to be Alive?:
 *   - Do battlers need to be alive to regenerate Brave Points?
 *
 * ---
 *
 * Action Fusions
 * 
 *   Actor Access?:
 *   - Allow actors access to Action Fusions?
 * 
 *   Enemy Access?:
 *   - Allow enemies access to Action Fusions?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Brave Animations Settings
 * ============================================================================
 *
 * Animation when applying/canceling Brave effects.
 *
 * ---
 *
 * On Brave
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Cancel Brave
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Enemy Brave
 * 
 *   Show Activation?:
 *   - Show the enemy activating Brave?
 * 
 *   Wait Frames:
 *   - This is the number of frames to wait between activations.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System BTB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Center Horizontal?:
 *   - Reposition the Turn Order Display to always be centered if it is a
 *     'top' or 'bottom' position?
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Max Horizontal:
 *   - Maximum slots you want to display for top and bottom Turn Order Display
 *     positions?
 * 
 *   Max Vertical:
 *   - Maximum slots you want to display for left and right Turn Order Display
 *     positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings Settings
 * ============================================================================
 *
 * Settings regarding the windows of the Battle System BTB. These mostly adjust
 * how certain aspects of the Brave Turn Battle system appear in-game.
 *
 * ---
 *
 * Window_ActorCommand
 * 
 *   Command Text:
 *   - What is the text that appears for the Brave command?
 * 
 *   Show Command?:
 *   - Show the Brave command in the Actor Command Window?
 * 
 *   Page Up/Dn Shortcuts?:
 *   - Use Page Up/Down for shortcuts on activating Brave?
 * 
 *   JS: Draw Counters:
 *   - Code used to determine how the action counters are displayed on
 *     the window.
 * 
 *     Action Slot:
 *     - This is the text used to represent a non-selected action slot.
 * 
 *     Current Action:
 *     - This is the text used to represent the current action slot.
 *
 * ---
 *
 * Window_BattleStatus
 * 
 *   Display Format:
 *   - How are actor Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon
 * 
 *   Predict Format:
 *   - How are predicted Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 *
 * ---
 *
 * Window_BattleStatus > Text Colors
 * 
 *   Neutral Color:
 *   - Text code color for neutral number values.
 * 
 *   Positive Color:
 *   - Text code color for positive number values.
 * 
 *   Negative Color:
 *   - Text code color for negative number values.
 *
 * ---
 *
 * Window_BattleStatus > Style Settings > Default Style
 *
 * Window_BattleStatus > Style Settings > List Style
 *
 * Window_BattleStatus > Style Settings > XP Style
 *
 * Window_BattleStatus > Style Settings > Portrait Style
 *
 * Window_BattleStatus > Style Settings > Border Style
 *
 * Window_BattleStatus > Style Settings > Alignment Style
 * 
 *   Show Display?:
 *   - Show the actor's BP values in the Battle Status Window?
 * 
 *   Alignment:
 *   - How do you want the actor BP values to be aligned?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the actor BP display X/Y by how many pixels?
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
 * Version 1.14: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.13: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the BTB Turn Order faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.12: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused a crash due to removing actors midway in battle.
 *    Fix made by Olivia.
 * 
 * Version 1.11: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 * 
 * Version 1.10: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.09: March 3, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: May 21, 2021
 * * Bug Fixes!
 * ** Using items and skills outside of battle will no longer have BP
 *    restrictions imposed upon them. Fix made by Olivia.
 * 
 * Version 1.06: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_3_BoostAction plugin.
 * 
 * Version 1.05: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.04: March 5, 2021
 * * Bug Fixes!
 * ** <BTB User Set BP: x>, <BTB User Gain BP: +x>, <BTB User Lose BP: -x>
 *    notetags should no work properly. Fix made by Arisu.
 * 
 * Version 1.03: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * 
 * Version 1.02: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Brave Point preview in the battle status will now be bound by the
 *    absolute minimum hard card and the maximum soft cap. Fixed by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Yanfly.
 * *** <BTB Enable Fusion>
 *
 * Version 1.00: January 4, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorIcon
 * @text Actor: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorFace
 * @text Actor: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the BTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderClearActorGraphic
 * @text Actor: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderEnemyIcon
 * @text Enemy: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderEnemyFace
 * @text Enemy: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: BTB Turn Order Visibility
 * @desc Determine the visibility of the BTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the BTB Turn Order Display.
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
 * @param BattleSystemBTB
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
 * @desc General settings regarding Battle System BTB.
 * @default {"BravePoints":"","BravePointsFull:str":"Brave Points","BravePointsAbbr:str":"BP","BravePointsIcon:num":"73","BravePointCostFmt:str":"\\FS[22]\\C[4]%1\\C[6]%2\\C[0]","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","ReduceShownBPCost:num":"0","Show_0_BP_Cost:eval":"true","Show_1_BP_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Adjust the mechanics settings for the Battle System BTB.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","ActionMax":"","MaxActionsDefault:num":"4","MaxActionsHardCap:num":"9","BravePoints":"","BravePointsLimits":"","MaxBravePointsDefault:num":"3","MinBravePointsDefault:num":"-4","MaxBravePointsHardCap:num":"9","MinBravePointsHardCap:num":"-9","BravePointsCosts":"","BravePointSkillCost:num":"1","BravePointItemCost:num":"1","BravePointPredictedCost:num":"1","BravePointsStartBattle":"","BravePointStartNeutral:num":"0","BravePointStartFavor:num":"3","BravePointsRegen":"","BravePointRegenBase:num":"1","BravePointsRegenAlive:eval":"true","ActionFusions":"","ActorActionFusions:eval":"true","EnemyActionFusions:eval":"true"}
 *
 * @param BraveAnimation:struct
 * @text Brave Animations
 * @type struct<BraveAnimation>
 * @desc Animation when applying/canceling Brave effects.
 * @default {"OnBrave":"","BraveAnimationID:num":"12","BraveMirror:eval":"false","BraveMute:eval":"false","CancelBrave":"","CancelAnimationID:num":"62","CancelMirror:eval":"false","CancelMute:eval":"false"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System BTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Settings regarding the windows of the Battle System BTB.
 * @default {"Window_ActorCommand":"","CommandName:str":"Brave","ShowCommand:eval":"true","BraveShortcuts:eval":"true","DrawActionCountersJS:func":"\"// Declare Constants\\nconst sprite = arguments[0];\\nconst parentWindow = arguments[1];\\nconst actor = arguments[2];\\n\\n// Set Location\\nsprite.x = Math.round(parentWindow.width / 2);\\nsprite.y = 0;\\nsprite.anchor.x = 0.5\\nsprite.anchor.y = 0.5\\n\\n// Create Text\\nconst textSlot = TextManager.btbActionSlot;\\nconst textCurrent = TextManager.btbActionCurrent;\\nlet text = textSlot.repeat(actor.numActions());\\nconst index = actor._actionInputIndex;\\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\\n\\n// Create and Draw Bitmap\\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\\nbitmap.fontSize = 36;\\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\\nsprite.bitmap = bitmap;\"","ActionSlot:str":"○","ActionCurrent:str":"◉","Window_BattleStatus":"","StatusDisplayFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1","StatusPredictFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1\\FS[16] → \\FS[22]%4","TextColors":"","NeutralColor:num":"0","PositiveColor:num":"4","NegativeColor:num":"2","Styles":"","DefaultStyle":"","default_display:eval":"true","default_align:str":"right","default_offsetX:num":"16","default_offsetY:num":"0","ListStyle":"","list_display:eval":"true","list_align:str":"left","list_offsetX:num":"-8","list_offsetY:num":"0","XPStyle":"","xp_display:eval":"true","xp_align:str":"right","xp_offsetX:num":"16","xp_offsetY:num":"0","PortraitStyle":"","portrait_display:eval":"true","portrait_align:str":"right","portrait_offsetX:num":"-8","portrait_offsetY:num":"56","BorderStyle":"","border_display:eval":"true","border_align:str":"right","border_offsetX:num":"16","border_offsetY:num":"0"}
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
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsFull:str
 * @text Full Name
 * @parent BravePoints
 * @desc What is the full name of "Brave Points" in your game?
 * @default Brave Points
 *
 * @param BravePointsAbbr:str
 * @text Abbreviation
 * @parent BravePoints
 * @desc What is the abbreviation of "Brave Points" in your game?
 * @default BP
 *
 * @param BravePointsIcon:num
 * @text Icon
 * @parent BravePoints
 * @desc What icon do you wish to use to represent Brave Points?
 * @default 73
 *
 * @param BravePointCostFmt:str
 * @text Cost Format
 * @parent BravePoints
 * @desc How are Brave Point costs displayed?
 * %1 - Cost, %2 - BP Text, %3 - Icon
 * @default \FS[22]\C[4]%1\C[6]%2\C[0]
 *
 * @param DisplayedCosts
 * @text Displayed Costs
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @parent DisplayedCosts
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the BP Cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Guard command?
 * @default false
 *
 * @param ReduceShownBPCost:num
 * @text Reduce Shown BP Cost
 * @parent DisplayedCosts
 * @type number
 * @desc Reduce shown BP costs by this much.
 * Used to match traditional games.
 * @default 0
 *
 * @param Show_0_BP_Cost:eval
 * @text Show Cost: 0 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 0 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 * @param Show_1_BP_Cost:eval
 * @text Show Cost: 1 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 1 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ActionMax
 * @text Brave Action Max
 *
 * @param MaxActionsDefault:num
 * @text Default
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the default number of max actions a battler can 
 * have from the Brave system?
 * @default 4
 *
 * @param MaxActionsHardCap:num
 * @text Hard Cap
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the absolute highest for maximum actions a battler
 * can have from the Brave system?
 * @default 9
 *
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsLimits
 * @text Limits
 * @parent BravePoints
 *
 * @param MaxBravePointsDefault:num
 * @text Default Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the default maximum number of Brave Points a
 * battler can have at a time?
 * @default 3
 *
 * @param MinBravePointsDefault:num
 * @text Default Minimum
 * @parent BravePointsLimits
 * @desc What is the default minimum number of Brave Points a
 * battler can have at a time?
 * @default -4
 *
 * @param MaxBravePointsHardCap:num
 * @text Hard Cap Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the absolute maximum number of Brave Points a
 * battler can have at a time?
 * @default 9
 *
 * @param MinBravePointsHardCap:num
 * @text Hard Cap Minimum
 * @parent BravePointsLimits
 * @desc What is the absolute minimum number of Brave Points a
 * battler can have at a time?
 * @default -9
 *
 * @param BravePointsCosts
 * @text Costs
 * @parent BravePoints
 *
 * @param BravePointSkillCost:num
 * @text Default Skill Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does a skill cost by default?
 * @default 1
 *
 * @param BravePointItemCost:num
 * @text Default Item Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does an item cost by default?
 * @default 1
 *
 * @param BravePointPredictedCost:num
 * @text Predicted Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc What is considered predicted cost?
 * @default 1
 *
 * @param BravePointsStartBattle
 * @text Start Battle
 * @parent BravePoints
 *
 * @param BravePointStartNeutral:num
 * @text Neutral
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is neutral?
 * @default 0
 *
 * @param BravePointStartFavor:num
 * @text Favored
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is favored?
 * @default 3
 *
 * @param BravePointsRegen
 * @text Regeneration
 * @parent BravePoints
 *
 * @param BravePointRegenBase:num
 * @text Base Recovery
 * @parent BravePointsRegen
 * @type number
 * @min 0
 * @desc How many Brave Points are regenerated at the end
 * of each turn?
 * @default 1
 *
 * @param BravePointsRegenAlive:eval
 * @text Needs to be Alive?
 * @parent BravePointsRegen
 * @type boolean
 * @on Alive
 * @off Can Be Dead
 * @desc Do battlers need to be alive to regenerate Brave Points?
 * @default true
 *
 * @param ActionFusions
 * @text Action Fusions
 *
 * @param ActorActionFusions:eval
 * @text Actor Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow actors access to Action Fusions?
 * @default true
 *
 * @param EnemyActionFusions:eval
 * @text Enemy Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow enemies access to Action Fusions?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * BraveAnimation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BraveAnimation:
 *
 * @param OnBrave
 * @text On Brave
 *
 * @param BraveAnimationID:num
 * @text Animation ID
 * @parent OnBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param BraveMirror:eval
 * @text Mirror Animation
 * @parent OnBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BraveMute:eval
 * @text Mute Animation
 * @parent OnBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param CancelBrave
 * @text Cancel Brave
 *
 * @param CancelAnimationID:num
 * @text Animation ID
 * @parent CancelBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 62
 *
 * @param CancelMirror:eval
 * @text Mirror Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param CancelMute:eval
 * @text Mute Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param EnemyBrave
 * @text Enemy Brave
 *
 * @param ShowEnemyBrave:eval
 * @text Show Activation?
 * @parent EnemyBrave
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy activating Brave?
 * @default true
 *
 * @param WaitFrames:num
 * @text Wait Frames
 * @parent EnemyBrave
 * @type number
 * @desc This is the number of frames to wait between activations.
 * @default 20
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param CenterHorz:eval
 * @text Center Horizontal?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Center
 * @off Stay
 * @desc Reposition the Turn Order Display to always be centered
 * if it is a 'top' or 'bottom' position?
 * @default true
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 96
 * 
 * @param Slots
 *
 * @param MaxHorzSprites:num
 * @text Max Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param MaxVertSprites:num
 * @text Max Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param Window_ActorCommand
 *
 * @param CommandName:str
 * @text Command Text
 * @parent Window_ActorCommand
 * @desc What is the text that appears for the Brave command?
 * @default Brave
 *
 * @param ShowCommand:eval
 * @text Show Command?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Brave command in the Actor Command Window?
 * @default true
 *
 * @param BraveShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Use Shortcuts
 * @off Don't Use
 * @desc Use Page Up/Down for shortcuts on activating Brave?
 * @default true
 *
 * @param DrawActionCountersJS:func
 * @text JS: Draw Counters
 * @parent Window_ActorCommand
 * @type note
 * @desc Code used to determine how the action counters are
 * displayed on the window.
 * @default "// Declare Constants\nconst sprite = arguments[0];\nconst parentWindow = arguments[1];\nconst actor = arguments[2];\n\n// Set Location\nsprite.x = Math.round(parentWindow.width / 2);\nsprite.y = 0;\nsprite.anchor.x = 0.5\nsprite.anchor.y = 0.5\n\n// Create Text\nconst textSlot = TextManager.btbActionSlot;\nconst textCurrent = TextManager.btbActionCurrent;\nlet text = textSlot.repeat(actor.numActions());\nconst index = actor._actionInputIndex;\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\n\n// Create and Draw Bitmap\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\nbitmap.fontSize = 36;\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\nsprite.bitmap = bitmap;"
 *
 * @param ActionSlot:str
 * @text Action Slot
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent a non-selected action slot.
 * @default ○
 *
 * @param ActionCurrent:str
 * @text Current Action
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent the current action slot.
 * @default ◉
 *
 * @param Window_BattleStatus
 *
 * @param StatusDisplayFmt:str
 * @text Display Format
 * @parent Window_BattleStatus
 * @desc How are actor Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1
 *
 * @param StatusPredictFmt:str
 * @text Predict Format
 * @parent Window_BattleStatus
 * @desc How are predicted Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1\FS[16] → \FS[22]%4
 *
 * @param TextColors
 * @text Text Colors
 * @parent Window_BattleStatus
 *
 * @param NeutralColor:num
 * @text Neutral Color
 * @parent TextColors
 * @desc Text code color for neutral number values.
 * @default 0
 *
 * @param PositiveColor:num
 * @text Positive Color
 * @parent TextColors
 * @desc Text code color for positive number values.
 * @default 4
 *
 * @param NegativeColor:num
 * @text Negative Color
 * @parent TextColors
 * @desc Text code color for negative number values.
 * @default 2
 *
 * @param Styles
 * @text Style Settings
 * @parent Window_BattleStatus
 *
 * @param DefaultStyle
 * @text Default Style
 * @parent Styles
 *
 * @param default_display:eval
 * @text Show Display?
 * @parent DefaultStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param default_align:str
 * @text Alignment
 * @parent DefaultStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param default_offsetX:num
 * @text Offset X
 * @parent DefaultStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param default_offsetY:num
 * @text Offset Y
 * @parent DefaultStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param ListStyle
 * @text List Style
 * @parent Styles
 *
 * @param list_display:eval
 * @text Show Display?
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param list_align:str
 * @text Alignment
 * @parent ListStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default left
 *
 * @param list_offsetX:num
 * @text Offset X
 * @parent ListStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param list_offsetY:num
 * @text Offset Y
 * @parent ListStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param XPStyle
 * @text XP Style
 * @parent Styles
 *
 * @param xp_display:eval
 * @text Show Display?
 * @parent XPStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param xp_align:str
 * @text Alignment
 * @parent XPStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param xp_offsetX:num
 * @text Offset X
 * @parent XPStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param xp_offsetY:num
 * @text Offset Y
 * @parent XPStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param PortraitStyle
 * @text Portrait Style
 * @parent Styles
 *
 * @param portrait_display:eval
 * @text Show Display?
 * @parent PortraitStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param portrait_align:str
 * @text Alignment
 * @parent PortraitStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param portrait_offsetX:num
 * @text Offset X
 * @parent PortraitStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param portrait_offsetY:num
 * @text Offset Y
 * @parent PortraitStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 56
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Styles
 *
 * @param border_display:eval
 * @text Show Display?
 * @parent BorderStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param border_align:str
 * @text Alignment
 * @parent BorderStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param border_offsetX:num
 * @text Offset X
 * @parent BorderStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param border_offsetY:num
 * @text Offset Y
 * @parent BorderStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 */
//=============================================================================

const _0x5b1aaf=_0xf1b5;(function(_0x246ff3,_0x24d875){const _0x17d233=_0xf1b5,_0x65f61e=_0x246ff3();while(!![]){try{const _0xf4c300=parseInt(_0x17d233(0x3a1))/0x1*(parseInt(_0x17d233(0x40e))/0x2)+parseInt(_0x17d233(0x465))/0x3+-parseInt(_0x17d233(0x33d))/0x4+parseInt(_0x17d233(0x34f))/0x5+-parseInt(_0x17d233(0x336))/0x6+parseInt(_0x17d233(0x205))/0x7*(parseInt(_0x17d233(0x30b))/0x8)+-parseInt(_0x17d233(0x3d2))/0x9;if(_0xf4c300===_0x24d875)break;else _0x65f61e['push'](_0x65f61e['shift']());}catch(_0x31eb80){_0x65f61e['push'](_0x65f61e['shift']());}}}(_0xe178,0x9702f));var label=_0x5b1aaf(0x207),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5b1aaf(0x1cc)](function(_0x1d61aa){const _0x175d5d=_0x5b1aaf;return _0x1d61aa['status']&&_0x1d61aa[_0x175d5d(0x309)][_0x175d5d(0x306)]('['+label+']');})[0x0];VisuMZ[label][_0x5b1aaf(0x241)]=VisuMZ[label][_0x5b1aaf(0x241)]||{},VisuMZ['ConvertParams']=function(_0x3cc757,_0x20928f){const _0x58a3ac=_0x5b1aaf;for(const _0x55f012 in _0x20928f){if(_0x55f012[_0x58a3ac(0x1fe)](/(.*):(.*)/i)){if(_0x58a3ac(0x338)!==_0x58a3ac(0x338)){this['x']=this[_0x58a3ac(0x307)],this['y']=this[_0x58a3ac(0x209)];if(this[_0x58a3ac(0x1f4)]<0xff&&!this[_0x58a3ac(0x365)]&&this[_0x58a3ac(0x1d2)]<=0x0){const _0x354d53=this[_0x58a3ac(0x3fa)]();_0x354d53&&(this['_fadeTarget']=_0x354d53[_0x58a3ac(0x30e)]()&&_0x354d53[_0x58a3ac(0x3bb)]()?0xff:0x0);}}else{const _0x17b03e=String(RegExp['$1']),_0x3a6498=String(RegExp['$2'])[_0x58a3ac(0x469)]()[_0x58a3ac(0x463)]();let _0x556829,_0x4c18dd,_0x381af9;switch(_0x3a6498){case _0x58a3ac(0x1b1):_0x556829=_0x20928f[_0x55f012]!==''?Number(_0x20928f[_0x55f012]):0x0;break;case _0x58a3ac(0x208):_0x4c18dd=_0x20928f[_0x55f012]!==''?JSON[_0x58a3ac(0x333)](_0x20928f[_0x55f012]):[],_0x556829=_0x4c18dd[_0x58a3ac(0x223)](_0x365a39=>Number(_0x365a39));break;case _0x58a3ac(0x426):_0x556829=_0x20928f[_0x55f012]!==''?eval(_0x20928f[_0x55f012]):null;break;case _0x58a3ac(0x41a):_0x4c18dd=_0x20928f[_0x55f012]!==''?JSON[_0x58a3ac(0x333)](_0x20928f[_0x55f012]):[],_0x556829=_0x4c18dd['map'](_0x133b0b=>eval(_0x133b0b));break;case _0x58a3ac(0x3cb):_0x556829=_0x20928f[_0x55f012]!==''?JSON['parse'](_0x20928f[_0x55f012]):'';break;case'ARRAYJSON':_0x4c18dd=_0x20928f[_0x55f012]!==''?JSON[_0x58a3ac(0x333)](_0x20928f[_0x55f012]):[],_0x556829=_0x4c18dd[_0x58a3ac(0x223)](_0x9ae35b=>JSON[_0x58a3ac(0x333)](_0x9ae35b));break;case _0x58a3ac(0x1d7):_0x556829=_0x20928f[_0x55f012]!==''?new Function(JSON[_0x58a3ac(0x333)](_0x20928f[_0x55f012])):new Function(_0x58a3ac(0x305));break;case _0x58a3ac(0x442):_0x4c18dd=_0x20928f[_0x55f012]!==''?JSON[_0x58a3ac(0x333)](_0x20928f[_0x55f012]):[],_0x556829=_0x4c18dd[_0x58a3ac(0x223)](_0x5ea21f=>new Function(JSON[_0x58a3ac(0x333)](_0x5ea21f)));break;case _0x58a3ac(0x3af):_0x556829=_0x20928f[_0x55f012]!==''?String(_0x20928f[_0x55f012]):'';break;case'ARRAYSTR':_0x4c18dd=_0x20928f[_0x55f012]!==''?JSON[_0x58a3ac(0x333)](_0x20928f[_0x55f012]):[],_0x556829=_0x4c18dd[_0x58a3ac(0x223)](_0x5119e4=>String(_0x5119e4));break;case _0x58a3ac(0x2d5):_0x381af9=_0x20928f[_0x55f012]!==''?JSON['parse'](_0x20928f[_0x55f012]):{},_0x556829=VisuMZ[_0x58a3ac(0x267)]({},_0x381af9);break;case _0x58a3ac(0x293):_0x4c18dd=_0x20928f[_0x55f012]!==''?JSON[_0x58a3ac(0x333)](_0x20928f[_0x55f012]):[],_0x556829=_0x4c18dd['map'](_0xd55e66=>VisuMZ[_0x58a3ac(0x267)]({},JSON[_0x58a3ac(0x333)](_0xd55e66)));break;default:continue;}_0x3cc757[_0x17b03e]=_0x556829;}}}return _0x3cc757;},(_0x2a8174=>{const _0x476fef=_0x5b1aaf,_0x2cb0df=_0x2a8174['name'];for(const _0x2e04a3 of dependencies){if(!Imported[_0x2e04a3]){alert(_0x476fef(0x387)[_0x476fef(0x268)](_0x2cb0df,_0x2e04a3)),SceneManager[_0x476fef(0x1b0)]();break;}}const _0x2f16c3=_0x2a8174[_0x476fef(0x309)];if(_0x2f16c3['match'](/\[Version[ ](.*?)\]/i)){const _0x54b997=Number(RegExp['$1']);if(_0x54b997!==VisuMZ[label]['version']){if(_0x476fef(0x2fb)==='BdGFj'){const _0x430d13=_0xb54550['BattleSystemBTB'][_0x476fef(0x241)][_0x476fef(0x20f)],_0x28f119=this[_0x476fef(0x312)]();return _0x430d13[_0x476fef(0x46c)[_0x476fef(0x268)](_0x28f119)]||0x0;}else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x2cb0df,_0x54b997)),SceneManager['exit']();}}if(_0x2f16c3[_0x476fef(0x1fe)](/\[Tier[ ](\d+)\]/i)){if(_0x476fef(0x1a2)!==_0x476fef(0x234)){const _0x3f8b93=Number(RegExp['$1']);_0x3f8b93<tier?(alert(_0x476fef(0x342)[_0x476fef(0x268)](_0x2cb0df,_0x3f8b93,tier)),SceneManager['exit']()):tier=Math[_0x476fef(0x317)](_0x3f8b93,tier);}else this['x']=this[_0x476fef(0x2ad)]+(_0x2445b7['RepositionTopHelpX']||0x0),this['y']=this[_0x476fef(0x38a)]+(_0x12487f[_0x476fef(0x1d5)]||0x0);}VisuMZ[_0x476fef(0x267)](VisuMZ[label][_0x476fef(0x241)],_0x2a8174[_0x476fef(0x1e4)]);})(pluginData),PluginManager[_0x5b1aaf(0x286)](pluginData[_0x5b1aaf(0x2f3)],'BtbTurnOrderActorIcon',_0x14b9e6=>{const _0x1b5f59=_0x5b1aaf;VisuMZ[_0x1b5f59(0x267)](_0x14b9e6,_0x14b9e6);const _0x3375ef=_0x14b9e6[_0x1b5f59(0x2cf)],_0x41d820=_0x14b9e6['IconIndex'];for(const _0x86a430 of _0x3375ef){const _0x3c83da=$gameActors[_0x1b5f59(0x24d)](_0x86a430);if(!_0x3c83da)continue;_0x3c83da[_0x1b5f59(0x33c)]=_0x1b5f59(0x27d),_0x3c83da['_btbTurnOrderIconIndex']=_0x41d820;}}),PluginManager[_0x5b1aaf(0x286)](pluginData[_0x5b1aaf(0x2f3)],_0x5b1aaf(0x28c),_0x55ea06=>{const _0x264506=_0x5b1aaf;VisuMZ[_0x264506(0x267)](_0x55ea06,_0x55ea06);const _0x45035a=_0x55ea06[_0x264506(0x2cf)],_0x2eb38f=_0x55ea06[_0x264506(0x248)],_0x539ed4=_0x55ea06[_0x264506(0x256)];for(const _0x18aa55 of _0x45035a){if('mmOiW'!==_0x264506(0x41c)){const _0x25b433=$gameActors['actor'](_0x18aa55);if(!_0x25b433)continue;_0x25b433['_btbTurnOrderGraphicType']='face',_0x25b433[_0x264506(0x3d6)]=_0x2eb38f,_0x25b433['_btbTurnOrderFaceIndex']=_0x539ed4;}else this['_btbTurnOrderIconIndex']=this[_0x264506(0x1b9)]();}}),PluginManager[_0x5b1aaf(0x286)](pluginData[_0x5b1aaf(0x2f3)],'BtbTurnOrderClearActorGraphic',_0x5890e2=>{const _0x5ab423=_0x5b1aaf;VisuMZ[_0x5ab423(0x267)](_0x5890e2,_0x5890e2);const _0x54529e=_0x5890e2['Actors'];for(const _0x5a52e9 of _0x54529e){if(_0x5ab423(0x239)!==_0x5ab423(0x239))_0x581584['BattleSystemBTB'][_0x5ab423(0x26b)]['call'](this),this[_0x5ab423(0x28e)]()&&this[_0x5ab423(0x354)]()&&!this[_0x5ab423(0x25a)]&&_0x30061d[_0x5ab423(0x425)]()&&this['selectNextCommand']();else{const _0x28d4f1=$gameActors[_0x5ab423(0x24d)](_0x5a52e9);if(!_0x28d4f1)continue;_0x28d4f1[_0x5ab423(0x277)]();}}}),PluginManager[_0x5b1aaf(0x286)](pluginData[_0x5b1aaf(0x2f3)],_0x5b1aaf(0x344),_0x434127=>{const _0x137bde=_0x5b1aaf;VisuMZ[_0x137bde(0x267)](_0x434127,_0x434127);const _0x5386fb=_0x434127[_0x137bde(0x350)],_0x564a86=_0x434127[_0x137bde(0x202)];for(const _0x154dc0 of _0x5386fb){const _0x1674ff=$gameTroop[_0x137bde(0x26c)]()[_0x154dc0];if(!_0x1674ff)continue;_0x1674ff[_0x137bde(0x33c)]='icon',_0x1674ff['_btbTurnOrderIconIndex']=_0x564a86;}}),PluginManager[_0x5b1aaf(0x286)](pluginData['name'],_0x5b1aaf(0x2e3),_0x16e9d1=>{const _0x21b54c=_0x5b1aaf;VisuMZ[_0x21b54c(0x267)](_0x16e9d1,_0x16e9d1);const _0x454dd1=_0x16e9d1[_0x21b54c(0x350)],_0x5a777e=_0x16e9d1[_0x21b54c(0x248)],_0x4d099d=_0x16e9d1['FaceIndex'];for(const _0x32929e of _0x454dd1){const _0x9a864d=$gameTroop[_0x21b54c(0x26c)]()[_0x32929e];if(!_0x9a864d)continue;_0x9a864d[_0x21b54c(0x33c)]=_0x21b54c(0x2b0),_0x9a864d[_0x21b54c(0x3d6)]=_0x5a777e,_0x9a864d[_0x21b54c(0x32e)]=_0x4d099d;}}),PluginManager[_0x5b1aaf(0x286)](pluginData[_0x5b1aaf(0x2f3)],_0x5b1aaf(0x275),_0x2ce2ae=>{const _0x8e044c=_0x5b1aaf;VisuMZ[_0x8e044c(0x267)](_0x2ce2ae,_0x2ce2ae);const _0x50835a=_0x2ce2ae[_0x8e044c(0x350)];for(const _0x3f8adb of _0x50835a){const _0xdc0dd2=$gameTroop['members']()[_0x3f8adb];if(!_0xdc0dd2)continue;_0xdc0dd2[_0x8e044c(0x277)]();}}),PluginManager[_0x5b1aaf(0x286)](pluginData[_0x5b1aaf(0x2f3)],_0x5b1aaf(0x2be),_0x1c0a91=>{const _0x3427c6=_0x5b1aaf;VisuMZ[_0x3427c6(0x267)](_0x1c0a91,_0x1c0a91);const _0x59f9bc=_0x1c0a91[_0x3427c6(0x3ef)];$gameSystem['setBattleSystemBTBTurnOrderVisible'](_0x59f9bc);}),VisuMZ['BattleSystemBTB'][_0x5b1aaf(0x30f)]={'EnemyMultiAction':/<BTB (?:MULTI|MULTIPLE) (?:ACTION|ACTIONS):[ ](.*)>/i,'BravePointCost':/<BTB (?:BRAVE|BP) COST:[ ](\d+)>/i,'BravePointSetUser':/<BTB USER SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointSetTarget':/<BTB TARGET SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointAlterUser':/<BTB USER (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointAlterTarget':/<BTB TARGET (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'HideBravePointCost':/<BTB HIDE (?:BRAVE|BP) COST>/i,'BTB_Help':/<BTB HELP>\s*([\s\S]*)\s*<\/BTB HELP>/i,'FusionFlex':/<BTB (?:FLEX|FLEXIBLE) FUSION:[ ](.*)>/gi,'FusionStrict':/<BTB (?:STRICT|EXACT) FUSION:[ ](.*)>/gi,'JsBravePointsUser':/<JS BTB USER (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB USER (?:BRAVE|BP)>/i,'JsBravePointsTarget':/<JS BTB TARGET (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB TARGET (?:BRAVE|BP)>/i,'BravePointBattleStart':/<BTB INITIAL (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointRegen':/<BTB (?:BRAVE|BP) (?:REGEN|DEGEN):[ ]([\+\-]\d+)>/i,'MaxBravePoints':/<BTB (?:MAXIMUM|MAX) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MinBravePoints':/<BTB (?:MINIMUM|MIN) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MaxActions':/<BTB (?:MAXIMUM|MAX) (?:ACTION|ACTIONS):[ ]([\+\-]\d+)>/i,'CannotBrave':/<BTB CANNOT BRAVE>/i,'HideBrave':/<BTB HIDE BRAVE>/i,'CannotFusion':/<BTB CANNOT FUSION>/i,'EnableFusion':/<BTB ENABLE FUSION>/i},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x301)]=Scene_Boot[_0x5b1aaf(0x25e)][_0x5b1aaf(0x20c)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0xb09125=_0x5b1aaf;VisuMZ[_0xb09125(0x207)][_0xb09125(0x301)]['call'](this),this[_0xb09125(0x1b4)]();},Scene_Boot['prototype'][_0x5b1aaf(0x1b4)]=function(){const _0x434fd8=_0x5b1aaf;this[_0x434fd8(0x341)](),this[_0x434fd8(0x410)]();},Scene_Boot[_0x5b1aaf(0x25e)]['process_VisuMZ_BattleSystemBTB_Notetags']=function(){const _0x49f44c=_0x5b1aaf;if(VisuMZ[_0x49f44c(0x257)])return;const _0x18186d=$dataSkills['concat']($dataItems);for(const _0x28cc5d of _0x18186d){if('txyHo'==='TkSKD'){let _0x3c1bdc=this[_0x49f44c(0x29b)](),_0x79cfec=this[_0x49f44c(0x264)](),_0x4876d6=_0x470611[_0x49f44c(0x258)];_0x2414d9['bitmap']=new _0x1d059f(_0x3c1bdc,_0x79cfec);const _0x17ec31='#000000',_0x149fb9=_0x448352[_0x49f44c(0x254)](_0x4c811f['%1BorderColor'[_0x49f44c(0x268)](_0x2adca4)]);_0x5dd639[_0x49f44c(0x220)][_0x49f44c(0x1e0)](0x0,0x0,_0x3c1bdc,_0x79cfec,_0x17ec31),_0x3c1bdc-=0x2,_0x79cfec-=0x2,_0x3a0556[_0x49f44c(0x220)]['fillRect'](0x1,0x1,_0x3c1bdc,_0x79cfec,_0x149fb9),_0x3c1bdc-=_0x4876d6*0x2,_0x79cfec-=_0x4876d6*0x2,_0x54ef72['bitmap'][_0x49f44c(0x1e0)](0x1+_0x4876d6,0x1+_0x4876d6,_0x3c1bdc,_0x79cfec,_0x17ec31),_0x3c1bdc-=0x2,_0x79cfec-=0x2,_0x4876d6+=0x1,_0x57d128[_0x49f44c(0x220)][_0x49f44c(0x415)](0x1+_0x4876d6,0x1+_0x4876d6,_0x3c1bdc,_0x79cfec);}else{if(!_0x28cc5d)continue;DataManager[_0x49f44c(0x43e)](_0x28cc5d);}}},VisuMZ[_0x5b1aaf(0x207)]['JS']={},Scene_Boot['prototype']['process_VisuMZ_BattleSystemBTB_JS']=function(){const _0x3bf727=_0x5b1aaf;if(VisuMZ[_0x3bf727(0x257)])return;const _0x595ab3=VisuMZ[_0x3bf727(0x207)][_0x3bf727(0x30f)],_0x4157d3=$dataSkills[_0x3bf727(0x3c7)](dataItems);for(const _0x5c5e1c of _0x4157d3){if(!_0x5c5e1c)continue;VisuMZ[_0x3bf727(0x207)][_0x3bf727(0x413)](_0x5c5e1c,_0x3bf727(0x320)),VisuMZ[_0x3bf727(0x207)]['Parse_Notetags_BravePointsUserJS'](_0x5c5e1c,_0x3bf727(0x355));}},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x413)]=function(_0x1ecee8,_0x40e021){const _0x54127e=_0x5b1aaf,_0x5f45d3=VisuMZ[_0x54127e(0x207)]['RegExp'][_0x40e021],_0x45f7fd=_0x1ecee8[_0x54127e(0x226)];if(_0x45f7fd[_0x54127e(0x1fe)](_0x5f45d3)){const _0x35e2b4=String(RegExp['$1']),_0x472782=_0x54127e(0x27f)[_0x54127e(0x268)](_0x35e2b4),_0x12d935=VisuMZ[_0x54127e(0x207)][_0x54127e(0x1bd)](_0x1ecee8,_0x40e021);VisuMZ[_0x54127e(0x207)]['JS'][_0x12d935]=new Function(_0x472782);}},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x1bd)]=function(_0x2da550,_0x148166){const _0x23ce53=_0x5b1aaf;if(VisuMZ[_0x23ce53(0x1bd)])return VisuMZ['createKeyJS'](_0x2da550,_0x148166);let _0x1ce870='';if($dataActors['includes'](_0x2da550))_0x1ce870='Actor-%1-%2'['format'](_0x2da550['id'],_0x148166);if($dataClasses[_0x23ce53(0x306)](_0x2da550))_0x1ce870=_0x23ce53(0x389)[_0x23ce53(0x268)](_0x2da550['id'],_0x148166);if($dataSkills[_0x23ce53(0x306)](_0x2da550))_0x1ce870='Skill-%1-%2'['format'](_0x2da550['id'],_0x148166);if($dataItems[_0x23ce53(0x306)](_0x2da550))_0x1ce870=_0x23ce53(0x29c)['format'](_0x2da550['id'],_0x148166);if($dataWeapons[_0x23ce53(0x306)](_0x2da550))_0x1ce870='Weapon-%1-%2'['format'](_0x2da550['id'],_0x148166);if($dataArmors['includes'](_0x2da550))_0x1ce870=_0x23ce53(0x274)['format'](_0x2da550['id'],_0x148166);if($dataEnemies[_0x23ce53(0x306)](_0x2da550))_0x1ce870=_0x23ce53(0x3dd)[_0x23ce53(0x268)](_0x2da550['id'],_0x148166);if($dataStates[_0x23ce53(0x306)](_0x2da550))_0x1ce870='State-%1-%2'[_0x23ce53(0x268)](_0x2da550['id'],_0x148166);return _0x1ce870;},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x3b1)]=VisuMZ[_0x5b1aaf(0x3b1)],VisuMZ[_0x5b1aaf(0x3b1)]=function(_0x59c798){const _0x1f3a76=_0x5b1aaf;VisuMZ[_0x1f3a76(0x207)][_0x1f3a76(0x3b1)]['call'](this,_0x59c798),DataManager[_0x1f3a76(0x43e)](_0x59c798),VisuMZ[_0x1f3a76(0x207)][_0x1f3a76(0x413)](_0x59c798,_0x1f3a76(0x320)),VisuMZ[_0x1f3a76(0x207)]['Parse_Notetags_BravePointsUserJS'](_0x59c798,_0x1f3a76(0x355));},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x2d9)]=VisuMZ[_0x5b1aaf(0x2d9)],VisuMZ['ParseItemNotetags']=function(_0xb38a24){const _0x20d009=_0x5b1aaf;VisuMZ['BattleSystemBTB']['ParseItemNotetags'][_0x20d009(0x2b4)](this,_0xb38a24),DataManager['btbRegisterFusions'](_0xb38a24),VisuMZ[_0x20d009(0x207)]['Parse_Notetags_BravePointsUserJS'](_0xb38a24,_0x20d009(0x320)),VisuMZ[_0x20d009(0x207)][_0x20d009(0x413)](_0xb38a24,'JsBravePointsTarget');},DataManager[_0x5b1aaf(0x441)]=function(_0x45d84b){const _0x5a74d1=_0x5b1aaf;_0x45d84b=_0x45d84b['toUpperCase']()[_0x5a74d1(0x463)](),this['_skillIDs']=this[_0x5a74d1(0x42c)]||{};if(this[_0x5a74d1(0x42c)][_0x45d84b])return this[_0x5a74d1(0x42c)][_0x45d84b];for(const _0x3111b3 of $dataSkills){if(!_0x3111b3)continue;this[_0x5a74d1(0x42c)][_0x3111b3[_0x5a74d1(0x2f3)][_0x5a74d1(0x469)]()[_0x5a74d1(0x463)]()]=_0x3111b3['id'];}return this['_skillIDs'][_0x45d84b]||0x0;},DataManager['getItemIdWithName']=function(_0x35bd38){const _0x18c3ad=_0x5b1aaf;_0x35bd38=_0x35bd38[_0x18c3ad(0x469)]()[_0x18c3ad(0x463)](),this[_0x18c3ad(0x200)]=this[_0x18c3ad(0x200)]||{};if(this[_0x18c3ad(0x200)][_0x35bd38])return this[_0x18c3ad(0x200)][_0x35bd38];for(const _0x2f5585 of $dataItems){if(_0x18c3ad(0x2eb)===_0x18c3ad(0x2cb))this['calculateTargetPositions']();else{if(!_0x2f5585)continue;this[_0x18c3ad(0x200)][_0x2f5585[_0x18c3ad(0x2f3)][_0x18c3ad(0x469)]()[_0x18c3ad(0x463)]()]=_0x2f5585['id'];}}return this[_0x18c3ad(0x200)][_0x35bd38]||0x0;},DataManager[_0x5b1aaf(0x1a8)]={},DataManager[_0x5b1aaf(0x308)]={},DataManager[_0x5b1aaf(0x359)]={},DataManager[_0x5b1aaf(0x213)]={},DataManager[_0x5b1aaf(0x43e)]=function(_0x36aef3){const _0x33587f=_0x5b1aaf;if(!_0x36aef3)return;const _0x18637a=VisuMZ[_0x33587f(0x207)]['RegExp'],_0x5de765=_0x36aef3[_0x33587f(0x226)],_0x515dd3=DataManager[_0x33587f(0x1ea)](_0x36aef3),_0x4b25c6=_0x5de765[_0x33587f(0x1fe)](_0x18637a['FusionFlex']);if(_0x4b25c6)for(const _0x23b73f of _0x4b25c6){if(_0x33587f(0x21c)!==_0x33587f(0x21c))_0x3188e4[_0x33587f(0x207)]['Window_Base_drawItemNumber'][_0x33587f(0x2b4)](this,_0x2d99b7,_0x502c79,_0x27d387,_0x448296);else{if(!_0x23b73f)continue;_0x23b73f[_0x33587f(0x1fe)](_0x18637a[_0x33587f(0x1a3)]);const _0x1ed63a=String(RegExp['$1'])[_0x33587f(0x21e)](','),_0x157a96=this[_0x33587f(0x431)](_0x1ed63a,_0x515dd3)['sort']((_0x3c21bb,_0xb91954)=>_0x3c21bb-_0xb91954);if(_0x157a96[_0x33587f(0x3b2)]<=0x1)continue;const _0x56611d=_0x157a96[_0x33587f(0x35a)]('-'),_0x42e209=_0x515dd3?DataManager[_0x33587f(0x1a8)]:DataManager[_0x33587f(0x359)];_0x42e209[_0x56611d]=_0x36aef3['id'];}}const _0x52049d=_0x5de765[_0x33587f(0x1fe)](_0x18637a['FusionStrict']);if(_0x52049d)for(const _0x46dc72 of _0x52049d){if(_0x33587f(0x292)===_0x33587f(0x292)){if(!_0x46dc72)continue;_0x46dc72[_0x33587f(0x1fe)](_0x18637a[_0x33587f(0x255)]);const _0x620760=String(RegExp['$1'])['split'](','),_0x469120=this['btbParseFusionData'](_0x620760,_0x515dd3);if(_0x469120[_0x33587f(0x3b2)]<=0x1)continue;const _0x414304=_0x469120[_0x33587f(0x35a)]('-'),_0xa3c1ac=_0x515dd3?DataManager[_0x33587f(0x1a8)]:DataManager[_0x33587f(0x359)];_0xa3c1ac[_0x414304]=_0x36aef3['id'];}else this['drawItemNumberBTB'](_0x555a61,_0x29fb5b,_0x417ba4,_0x37c827);}},DataManager['btbParseFusionData']=function(_0x504383,_0x590549){const _0x295275=_0x5b1aaf,_0x12705b=[];for(let _0x3c5eaa of _0x504383){_0x3c5eaa=(String(_0x3c5eaa)||'')[_0x295275(0x463)]();const _0x40ecc3=/^\d+$/[_0x295275(0x315)](_0x3c5eaa);if(_0x40ecc3)_0x12705b[_0x295275(0x2fd)](Number(_0x3c5eaa));else _0x590549?_0x12705b[_0x295275(0x2fd)](DataManager[_0x295275(0x441)](_0x3c5eaa)):_0x12705b[_0x295275(0x2fd)](DataManager[_0x295275(0x3eb)](_0x3c5eaa));}return _0x12705b;},ImageManager['btbBravePointsIcon']=VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x241)][_0x5b1aaf(0x214)]['BravePointsIcon'],ImageManager[_0x5b1aaf(0x265)]=ImageManager[_0x5b1aaf(0x265)]||0x9,ImageManager[_0x5b1aaf(0x3a6)]=ImageManager[_0x5b1aaf(0x3a6)]||0x6,TextManager[_0x5b1aaf(0x1da)]=VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x241)][_0x5b1aaf(0x214)]['BravePointsFull'],TextManager[_0x5b1aaf(0x2b3)]=VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x241)][_0x5b1aaf(0x214)][_0x5b1aaf(0x374)],TextManager['btbCostFormat']=VisuMZ[_0x5b1aaf(0x207)]['Settings']['General'][_0x5b1aaf(0x2cd)],TextManager[_0x5b1aaf(0x1bc)]=VisuMZ['BattleSystemBTB'][_0x5b1aaf(0x241)][_0x5b1aaf(0x20f)][_0x5b1aaf(0x464)],TextManager[_0x5b1aaf(0x2b2)]=VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x241)][_0x5b1aaf(0x20f)][_0x5b1aaf(0x35e)],TextManager[_0x5b1aaf(0x416)]=VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x241)]['Window'][_0x5b1aaf(0x437)],SceneManager[_0x5b1aaf(0x263)]=function(){const _0x599c24=_0x5b1aaf;return this['_scene']&&this[_0x599c24(0x36a)]['constructor']===Scene_Battle;},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x2e8)]=BattleManager['battleSys'],BattleManager['battleSys']=function(){const _0x42bd7f=_0x5b1aaf;if(this[_0x42bd7f(0x28e)]())return _0x42bd7f(0x32f);return VisuMZ[_0x42bd7f(0x207)][_0x42bd7f(0x2e8)][_0x42bd7f(0x2b4)](this);},BattleManager[_0x5b1aaf(0x28e)]=function(){const _0x1a3d9f=_0x5b1aaf;return $gameSystem[_0x1a3d9f(0x468)]()===_0x1a3d9f(0x32f);},VisuMZ['BattleSystemBTB'][_0x5b1aaf(0x398)]=BattleManager[_0x5b1aaf(0x2a5)],BattleManager[_0x5b1aaf(0x2a5)]=function(){const _0xc7bd0b=_0x5b1aaf;if(this[_0xc7bd0b(0x28e)]())return![];return VisuMZ[_0xc7bd0b(0x207)][_0xc7bd0b(0x398)]['call'](this);},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x3d1)]=BattleManager[_0x5b1aaf(0x237)],BattleManager[_0x5b1aaf(0x237)]=function(){const _0x2a178b=_0x5b1aaf;if(this[_0x2a178b(0x28e)]())return![];return VisuMZ[_0x2a178b(0x207)][_0x2a178b(0x3d1)][_0x2a178b(0x2b4)](this);},VisuMZ['BattleSystemBTB'][_0x5b1aaf(0x420)]=BattleManager['isTurnBased'],BattleManager[_0x5b1aaf(0x3d5)]=function(){const _0x9868d4=_0x5b1aaf;if(this[_0x9868d4(0x28e)]())return!![];return VisuMZ[_0x9868d4(0x207)][_0x9868d4(0x420)][_0x9868d4(0x2b4)](this);},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x26b)]=BattleManager[_0x5b1aaf(0x20e)],BattleManager[_0x5b1aaf(0x20e)]=function(){const _0x2e11d7=_0x5b1aaf;VisuMZ['BattleSystemBTB'][_0x2e11d7(0x26b)][_0x2e11d7(0x2b4)](this),this['isBTB']()&&this[_0x2e11d7(0x354)]()&&!this[_0x2e11d7(0x25a)]&&$gameParty['canInput']()&&(_0x2e11d7(0x22f)===_0x2e11d7(0x2f4)?(this['_ogWindowLayerX']=_0x5d4391[_0x2e11d7(0x266)]((_0x193893[_0x2e11d7(0x38f)]-_0xdb7a5b['min'](_0x3d74e7[_0x2e11d7(0x397)],_0x28eb0a[_0x2e11d7(0x38f)]))/0x2),this[_0x2e11d7(0x380)]=_0x7f5516[_0x2e11d7(0x266)]((_0x418864[_0x2e11d7(0x2f8)]-_0x402805['min'](_0x1631ff[_0x2e11d7(0x39e)],_0x4f39b1[_0x2e11d7(0x2f8)]))/0x2)):this['selectNextCommand']());},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x25c)]=BattleManager[_0x5b1aaf(0x1f2)],BattleManager[_0x5b1aaf(0x1f2)]=function(){const _0x319973=_0x5b1aaf;VisuMZ[_0x319973(0x207)][_0x319973(0x25c)][_0x319973(0x2b4)](this),this[_0x319973(0x3c3)]();},BattleManager[_0x5b1aaf(0x3c3)]=function(){const _0x1d80bf=_0x5b1aaf;if(!SceneManager[_0x1d80bf(0x263)]())return;if(!this[_0x1d80bf(0x28e)]())return;const _0x9b028f=SceneManager['_scene'];if(!_0x9b028f)return;const _0x3640fd=_0x9b028f[_0x1d80bf(0x2c7)];if(!_0x3640fd)return;_0x3640fd[_0x1d80bf(0x242)]();},VisuMZ[_0x5b1aaf(0x207)]['BattleManager_makeActionOrders']=BattleManager[_0x5b1aaf(0x217)],BattleManager[_0x5b1aaf(0x217)]=function(){const _0x34dda4=_0x5b1aaf;VisuMZ[_0x34dda4(0x207)][_0x34dda4(0x1f7)][_0x34dda4(0x2b4)](this),this[_0x34dda4(0x28e)]()&&(this[_0x34dda4(0x22d)]=this[_0x34dda4(0x22d)][_0x34dda4(0x1cc)](_0x512d36=>_0x512d36&&_0x512d36['_actions'][_0x34dda4(0x3b2)]>0x0),this[_0x34dda4(0x222)]());},BattleManager[_0x5b1aaf(0x3a0)]=function(){const _0x39f184=_0x5b1aaf;if(!this[_0x39f184(0x28e)]())return;if(!SceneManager[_0x39f184(0x263)]())return;const _0x15d737=this['_actionBattlers'];for(const _0x152be7 of _0x15d737){_0x152be7[_0x39f184(0x216)]();}_0x15d737['sort']((_0x2a7037,_0x1c97ee)=>_0x1c97ee[_0x39f184(0x440)]()-_0x2a7037['speed']()),this[_0x39f184(0x28e)]()&&this[_0x39f184(0x222)]();},BattleManager[_0x5b1aaf(0x366)]=function(){const _0x43603a=_0x5b1aaf;if(!this['isBTB']())return;this[_0x43603a(0x22d)]=this[_0x43603a(0x22d)]||[],this[_0x43603a(0x22d)]=this['_actionBattlers'][_0x43603a(0x1cc)](_0x5c271e=>_0x5c271e&&_0x5c271e['isAppeared']()&&_0x5c271e[_0x43603a(0x30e)]()),this[_0x43603a(0x222)]();},BattleManager[_0x5b1aaf(0x222)]=function(_0x22376a){const _0x978dd3=_0x5b1aaf;if(!this['isBTB']())return;const _0x3e3439=SceneManager['_scene']['_btbTurnOrderWindow'];if(!_0x3e3439)return;_0x3e3439[_0x978dd3(0x1a7)](_0x22376a);},VisuMZ['BattleSystemBTB'][_0x5b1aaf(0x310)]=BattleManager[_0x5b1aaf(0x236)],BattleManager[_0x5b1aaf(0x236)]=function(){const _0x3929ea=_0x5b1aaf;BattleManager[_0x3929ea(0x28e)]()&&this[_0x3929ea(0x2ff)]&&this[_0x3929ea(0x2ff)]['processActionFusionsBTB'](),VisuMZ[_0x3929ea(0x207)][_0x3929ea(0x310)][_0x3929ea(0x2b4)](this);},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x3d8)]=Game_System[_0x5b1aaf(0x25e)]['initialize'],Game_System['prototype'][_0x5b1aaf(0x22e)]=function(){const _0x964bb2=_0x5b1aaf;VisuMZ['BattleSystemBTB']['Game_System_initialize'][_0x964bb2(0x2b4)](this),this['initBattleSystemBTB']();},Game_System['prototype']['initBattleSystemBTB']=function(){const _0x21fd43=_0x5b1aaf;this[_0x21fd43(0x460)]=!![];},Game_System[_0x5b1aaf(0x25e)]['isBattleSystemBTBTurnOrderVisible']=function(){const _0x33edb4=_0x5b1aaf;if(this['_btbTurnOrderVisible']===undefined){if(_0x33edb4(0x378)===_0x33edb4(0x378))this['initBattleSystemBTB']();else{const _0x438c17=this[_0x33edb4(0x29b)](),_0xd7f081=this['bitmapHeight']();_0x278b60['bitmap']=new _0x57a52b(_0x438c17,_0xd7f081);const _0x5e82d1=_0x55bbea[_0x33edb4(0x254)](_0x28731f['%1BgColor1'['format'](_0x587f53)]),_0x40ae71=_0xde6612[_0x33edb4(0x254)](_0x3f8836['%1BgColor2'[_0x33edb4(0x268)](_0x3713c9)]);_0x1c1544[_0x33edb4(0x220)][_0x33edb4(0x2ef)](0x0,0x0,_0x438c17,_0xd7f081,_0x5e82d1,_0x40ae71,!![]);}}return this[_0x33edb4(0x460)];},Game_System[_0x5b1aaf(0x25e)]['setBattleSystemBTBTurnOrderVisible']=function(_0x369cab){const _0x32a3a4=_0x5b1aaf;this[_0x32a3a4(0x460)]===undefined&&this['initBattleSystemBTB'](),this[_0x32a3a4(0x460)]=_0x369cab;},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x3ab)]=Game_Action[_0x5b1aaf(0x25e)][_0x5b1aaf(0x436)],Game_Action[_0x5b1aaf(0x25e)]['applyItemUserEffect']=function(_0x20aef9){const _0x3dd790=_0x5b1aaf;VisuMZ[_0x3dd790(0x207)][_0x3dd790(0x3ab)]['call'](this,_0x20aef9),this[_0x3dd790(0x2f6)](_0x20aef9);},Game_Action[_0x5b1aaf(0x25e)][_0x5b1aaf(0x2f6)]=function(_0x492f8f){const _0x47a20a=_0x5b1aaf;if(!BattleManager[_0x47a20a(0x28e)]())return;if(this[_0x47a20a(0x1b7)]())this[_0x47a20a(0x29f)](_0x492f8f);},Game_Action[_0x5b1aaf(0x25e)]['applyItemBattleSystemBTBUserEffect']=function(_0x1f450b){const _0x57791a=_0x5b1aaf,_0xda528e=VisuMZ[_0x57791a(0x207)][_0x57791a(0x30f)],_0x58cae4=this['item']()[_0x57791a(0x226)],_0x382085=this[_0x57791a(0x1b7)]();if(this[_0x57791a(0x2ce)]()){if(_0x57791a(0x3e2)!=='gDdqa')_0x5d053c['makeActionOrders']();else{if(_0x58cae4[_0x57791a(0x1fe)](_0xda528e[_0x57791a(0x2d4)])){if(_0x57791a(0x1ce)==='AhhMG'){const _0x5af3ca=Number(RegExp['$1']);this['subject']()[_0x57791a(0x46b)](_0x5af3ca);}else{const _0xe530fb=_0xacafe3['BattleSystemBTB'][_0x57791a(0x30f)],_0x5e8562=_0xe530fb[_0x57791a(0x335)];return this[_0x57791a(0x23c)]()['some'](_0x5d1a2e=>_0x5d1a2e&&_0x5d1a2e[_0x57791a(0x226)]['match'](_0x5e8562));}}if(_0x58cae4[_0x57791a(0x1fe)](_0xda528e[_0x57791a(0x364)])){const _0x1614be=Number(RegExp['$1']);this[_0x57791a(0x2ce)]()[_0x57791a(0x3f4)](_0x1614be);}const _0x33d246=_0x57791a(0x320),_0x2074a7=VisuMZ['BattleSystemBTB'][_0x57791a(0x1bd)](_0x382085,_0x33d246);if(VisuMZ['BattleSystemBTB']['JS'][_0x2074a7]){const _0x574629=VisuMZ[_0x57791a(0x207)]['JS'][_0x2074a7][_0x57791a(0x2b4)](this,this[_0x57791a(0x2ce)](),_0x1f450b,this[_0x57791a(0x2ce)]()[_0x57791a(0x3ec)]());this[_0x57791a(0x2ce)]()[_0x57791a(0x46b)](_0x574629);}}}if(_0x1f450b){if(_0x58cae4[_0x57791a(0x1fe)](_0xda528e[_0x57791a(0x349)])){const _0xffbc51=Number(RegExp['$1']);_0x1f450b[_0x57791a(0x46b)](_0xffbc51);}if(_0x58cae4[_0x57791a(0x1fe)](_0xda528e[_0x57791a(0x1f8)])){const _0x5e0c35=Number(RegExp['$1']);_0x1f450b[_0x57791a(0x3f4)](_0x5e0c35);}const _0x1b4714=_0x57791a(0x355),_0x2ff3fe=VisuMZ[_0x57791a(0x207)][_0x57791a(0x1bd)](_0x382085,_0x1b4714);if(VisuMZ[_0x57791a(0x207)]['JS'][_0x2ff3fe]){const _0x2056ac=VisuMZ['BattleSystemBTB']['JS'][_0x2ff3fe][_0x57791a(0x2b4)](this,this['subject'](),_0x1f450b,_0x1f450b[_0x57791a(0x3ec)]());_0x1f450b[_0x57791a(0x46b)](_0x2056ac);}}},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x2e4)]=Game_Action[_0x5b1aaf(0x25e)][_0x5b1aaf(0x440)],Game_Action[_0x5b1aaf(0x25e)][_0x5b1aaf(0x440)]=function(){const _0x12bbbd=_0x5b1aaf;return BattleManager[_0x12bbbd(0x28e)]()?VisuMZ[_0x12bbbd(0x207)][_0x12bbbd(0x241)][_0x12bbbd(0x393)][_0x12bbbd(0x401)][_0x12bbbd(0x2b4)](this):VisuMZ['BattleSystemBTB'][_0x12bbbd(0x2e4)]['call'](this);},VisuMZ[_0x5b1aaf(0x207)]['Game_Action_allowRandomSpeed']=Game_Action['prototype']['allowRandomSpeed'],Game_Action[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1fb)]=function(){const _0x36d5fe=_0x5b1aaf;if(BattleManager['isBTB']()){if(_0x36d5fe(0x3a5)!==_0x36d5fe(0x3a5)){const _0x3ab7e7=_0x1db32d[_0x36d5fe(0x241)],_0xb76904=this[_0x36d5fe(0x357)](),_0x3d82ab=_0x3ab7e7[_0x36d5fe(0x372)],_0x5ea24e=_0x3ab7e7[_0x36d5fe(0x36b)],_0x27417c=_0x34e941[_0x36d5fe(0x36a)][_0x36d5fe(0x232)];if(!_0x27417c)return;const _0x73805=this[_0x36d5fe(0x433)]();this['_positionDuration']=_0x3ab7e7[_0x36d5fe(0x43b)],this[_0x36d5fe(0x307)]=_0xb76904?_0x3ab7e7['SpriteThin']*_0x73805:0x0,this[_0x36d5fe(0x209)]=_0xb76904?0x0:_0x3ab7e7['SpriteThin']*_0x73805,_0x73805>0x0&&(this[_0x36d5fe(0x307)]+=_0xb76904?_0x5ea24e:0x0,this[_0x36d5fe(0x209)]+=_0xb76904?0x0:_0x5ea24e),_0x3d82ab?this[_0x36d5fe(0x307)]=_0xb76904?_0x27417c[_0x36d5fe(0x38f)]-this[_0x36d5fe(0x307)]-_0x3ab7e7['SpriteThin']:0x0:this[_0x36d5fe(0x209)]=_0xb76904?0x0:_0x27417c[_0x36d5fe(0x2f8)]-this[_0x36d5fe(0x209)]-_0x3ab7e7['SpriteThin'];}else return VisuMZ[_0x36d5fe(0x207)]['Settings'][_0x36d5fe(0x393)][_0x36d5fe(0x1dd)];}else return VisuMZ[_0x36d5fe(0x207)]['Game_Action_allowRandomSpeed'][_0x36d5fe(0x2b4)](this);},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x1ee)]=Game_Action['prototype'][_0x5b1aaf(0x23f)],Game_Action[_0x5b1aaf(0x25e)][_0x5b1aaf(0x23f)]=function(_0xdb49f7){const _0x1858e3=_0x5b1aaf;VisuMZ[_0x1858e3(0x207)][_0x1858e3(0x1ee)][_0x1858e3(0x2b4)](this,_0xdb49f7),BattleManager[_0x1858e3(0x3a0)]();},VisuMZ['BattleSystemBTB'][_0x5b1aaf(0x287)]=Game_Action['prototype'][_0x5b1aaf(0x2e5)],Game_Action['prototype'][_0x5b1aaf(0x2e5)]=function(_0x5d1624){const _0x4d4e2d=_0x5b1aaf;VisuMZ['BattleSystemBTB'][_0x4d4e2d(0x287)]['call'](this,_0x5d1624),BattleManager[_0x4d4e2d(0x3a0)]();},Game_Action[_0x5b1aaf(0x25e)][_0x5b1aaf(0x3f5)]=function(_0x22c2c6){const _0x2db494=_0x5b1aaf;this[_0x2db494(0x454)]=_0x22c2c6;},Game_Action[_0x5b1aaf(0x25e)][_0x5b1aaf(0x332)]=function(){const _0x5353cc=_0x5b1aaf;if(this['_actionFusionRecipe']===undefined)return 0x0;return this[_0x5353cc(0x454)][_0x5353cc(0x21e)]('-')[_0x5353cc(0x3b2)]-0x1;},Game_Action['prototype']['getActionFusionRecipeSkills']=function(){const _0x2dcae7=_0x5b1aaf;if(this[_0x2dcae7(0x454)]===undefined)return[];return this[_0x2dcae7(0x454)]['split']('-')[_0x2dcae7(0x223)](_0x5f02e8=>$dataSkills[Number(_0x5f02e8)]);},Game_Action[_0x5b1aaf(0x25e)][_0x5b1aaf(0x3f2)]=function(){const _0x3a9199=_0x5b1aaf;if(this[_0x3a9199(0x454)]===undefined)return[];return this[_0x3a9199(0x454)][_0x3a9199(0x21e)]('-')[_0x3a9199(0x223)](_0x4addee=>$dataItems[Number(_0x4addee)]);},Game_BattlerBase['prototype']['bravePoints']=function(){const _0x4f4c11=_0x5b1aaf;return this[_0x4f4c11(0x28f)]||0x0;},Game_BattlerBase['BTB_MAX_ACTIONS_DEFAULT']=VisuMZ['BattleSystemBTB']['Settings']['Mechanics']['MaxActionsDefault'],Game_BattlerBase[_0x5b1aaf(0x34d)]=VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x241)]['Mechanics'][_0x5b1aaf(0x1ff)],Game_BattlerBase[_0x5b1aaf(0x25e)][_0x5b1aaf(0x314)]=function(){const _0x1c70fb=_0x5b1aaf;if(this['cannotBraveTrait']())return 0x1;if(this[_0x1c70fb(0x2f5)]())return 0x1;const _0x2625be=VisuMZ[_0x1c70fb(0x207)]['RegExp'],_0x331a1f=_0x2625be['MaxActions'];let _0x19baef=Game_BattlerBase['BTB_MAX_ACTIONS_DEFAULT'];const _0x168c0c=this['traitObjects']();for(const _0x6e9447 of _0x168c0c){if(!_0x6e9447)continue;const _0x128b6f=_0x6e9447[_0x1c70fb(0x226)];_0x128b6f[_0x1c70fb(0x1fe)](_0x331a1f)&&('SrEtg'!=='SrEtg'?(_0x4f5cfb[_0x1c70fb(0x25e)][_0x1c70fb(0x250)][_0x1c70fb(0x2b4)](this),this['updateHomePosition'](),this['updatePosition'](),this[_0x1c70fb(0x238)](),this[_0x1c70fb(0x1a9)](),this[_0x1c70fb(0x391)]()):_0x19baef+=Number(RegExp['$1']));}return _0x19baef[_0x1c70fb(0x42e)](0x1,Game_BattlerBase[_0x1c70fb(0x34d)]);},Game_BattlerBase[_0x5b1aaf(0x3b7)]=VisuMZ[_0x5b1aaf(0x207)]['Settings'][_0x5b1aaf(0x393)][_0x5b1aaf(0x2a7)],Game_BattlerBase[_0x5b1aaf(0x330)]=VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x241)][_0x5b1aaf(0x393)][_0x5b1aaf(0x1b6)],Game_BattlerBase[_0x5b1aaf(0x22b)]=VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x241)]['Mechanics'][_0x5b1aaf(0x3b4)],Game_BattlerBase[_0x5b1aaf(0x1aa)]=VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x241)][_0x5b1aaf(0x393)][_0x5b1aaf(0x3e7)],Game_BattlerBase[_0x5b1aaf(0x25e)][_0x5b1aaf(0x3b9)]=function(){const _0x32e723=_0x5b1aaf,_0x4c3377=VisuMZ[_0x32e723(0x207)][_0x32e723(0x30f)],_0xac9b75=_0x4c3377[_0x32e723(0x1ed)];let _0x2b50dc=Game_BattlerBase[_0x32e723(0x3b7)];const _0x2184a3=this['traitObjects']();for(const _0x1f1161 of _0x2184a3){if(!_0x1f1161)continue;const _0x55f010=_0x1f1161['note'];_0x55f010[_0x32e723(0x1fe)](_0xac9b75)&&(_0x32e723(0x21d)!==_0x32e723(0x43a)?_0x2b50dc+=Number(RegExp['$1']):this[_0x32e723(0x2fd)](_0x32e723(0x291),_0xa9ece0));}return Math[_0x32e723(0x2cc)](_0x2b50dc,Game_BattlerBase[_0x32e723(0x22b)]);},Game_BattlerBase[_0x5b1aaf(0x25e)][_0x5b1aaf(0x2c2)]=function(){const _0x124388=_0x5b1aaf,_0x3a229f=VisuMZ[_0x124388(0x207)][_0x124388(0x30f)],_0x553ffd=_0x3a229f['MinBravePoints'];let _0x37919a=Game_BattlerBase['BTB_MIN_BRAVEPOINTS_DEFAULT'];const _0xe958f0=this['traitObjects']();for(const _0x586230 of _0xe958f0){if(!_0x586230)continue;const _0xa51ff0=_0x586230[_0x124388(0x226)];_0xa51ff0[_0x124388(0x1fe)](_0x553ffd)&&(_0x37919a+=Number(RegExp['$1']));}return Math[_0x124388(0x317)](_0x37919a,Game_BattlerBase[_0x124388(0x1aa)]);},Game_BattlerBase[_0x5b1aaf(0x25e)][_0x5b1aaf(0x46b)]=function(_0x4d9d36){const _0x2eb1c0=_0x5b1aaf;this['_bravePoints']=Math[_0x2eb1c0(0x2cc)](_0x4d9d36,this[_0x2eb1c0(0x3b9)]()),this[_0x2eb1c0(0x42b)]();},Game_BattlerBase[_0x5b1aaf(0x25e)][_0x5b1aaf(0x3f4)]=function(_0x6d67a7){const _0x1d4bc5=_0x5b1aaf;_0x6d67a7+=this[_0x1d4bc5(0x28f)]||0x0,this[_0x1d4bc5(0x46b)](_0x6d67a7);},Game_BattlerBase[_0x5b1aaf(0x25e)][_0x5b1aaf(0x3a4)]=function(_0x5cbe56){const _0x471f75=_0x5b1aaf;this[_0x471f75(0x3f4)](-_0x5cbe56);},Game_BattlerBase['prototype'][_0x5b1aaf(0x2f1)]=function(_0x5dcc42){const _0x9eba3d=_0x5b1aaf,_0x50940a=VisuMZ[_0x9eba3d(0x207)][_0x9eba3d(0x241)][_0x9eba3d(0x393)];if(!_0x5dcc42)return _0x50940a[_0x9eba3d(0x22c)];if(DataManager[_0x9eba3d(0x1ea)](_0x5dcc42)){if(_0x5dcc42['id']===this[_0x9eba3d(0x284)]())return 0x0;if(this[_0x9eba3d(0x2d2)]()&&this[_0x9eba3d(0x2d2)]()[_0x9eba3d(0x1b7)]()===_0x5dcc42&&this[_0x9eba3d(0x2d2)]()[_0x9eba3d(0x240)]){if('fTgIQ'!=='fTgIQ'){if(!_0x4bd060)return![];if(!_0x11080b[_0x9eba3d(0x28e)]())return![];if(!this[_0x9eba3d(0x312)])return![];if(_0x5148aa[_0x9eba3d(0x2f5)]())return![];const _0x147c55=_0x1a3b20[_0x9eba3d(0x207)][_0x9eba3d(0x241)][_0x9eba3d(0x20f)],_0x2c164b=this[_0x9eba3d(0x312)]();return _0x147c55['%1_display'[_0x9eba3d(0x268)](_0x2c164b)];}else return 0x0;}}const _0x2578fe=VisuMZ['BattleSystemBTB'][_0x9eba3d(0x30f)],_0xe9131f=_0x5dcc42[_0x9eba3d(0x226)];if(_0xe9131f[_0x9eba3d(0x1fe)](_0x2578fe['BravePointCost'])){if(_0x9eba3d(0x371)==='dszlW'){const _0x5426e7=_0x13e8f6['Settings'];this[_0x9eba3d(0x1d2)]=_0x5426e7['UpdateFrames'],this[_0x9eba3d(0x1c0)]=_0x682161;}else return Number(RegExp['$1']);}let _0x299406=0x0;if(DataManager[_0x9eba3d(0x1ea)](_0x5dcc42)){if(_0x9eba3d(0x243)!=='BURzi')_0x299406=_0x50940a[_0x9eba3d(0x1df)];else{const _0x2e6e5d=_0x2f37bc[_0x9eba3d(0x241)],_0x3eaafc=this[_0x9eba3d(0x357)]()?_0x2e6e5d['MaxHorzSprites']:_0x2e6e5d[_0x9eba3d(0x1d4)];return _0x3eaafc+0x1;}}else DataManager['isItem'](_0x5dcc42)&&(_0x299406=_0x50940a['BravePointItemCost']);return _0x299406[_0x9eba3d(0x42e)](0x0,Game_BattlerBase['BTB_MAX_BRAVEPOINTS_HARD_CAP']);},VisuMZ[_0x5b1aaf(0x207)]['Game_BattlerBase_canUse']=Game_BattlerBase[_0x5b1aaf(0x25e)][_0x5b1aaf(0x3fd)],Game_BattlerBase['prototype'][_0x5b1aaf(0x3fd)]=function(_0x25a2cb){const _0x51976a=_0x5b1aaf;if(_0x25a2cb&&SceneManager[_0x51976a(0x263)]()&&BattleManager['isBTB']()){const _0xbde891=this['bravePointsCost'](_0x25a2cb);if(this[_0x51976a(0x3ec)]()-_0xbde891<this[_0x51976a(0x2c2)]())return![];}return VisuMZ[_0x51976a(0x207)][_0x51976a(0x1c2)][_0x51976a(0x2b4)](this,_0x25a2cb);},Game_BattlerBase[_0x5b1aaf(0x25e)][_0x5b1aaf(0x2a3)]=function(_0x1a1f33){const _0xef88e2=_0x5b1aaf;if(!BattleManager[_0xef88e2(0x28e)]())return;const _0x564055=this[_0xef88e2(0x2f1)](_0x1a1f33);this['loseBravePoints'](_0x564055);},VisuMZ[_0x5b1aaf(0x207)]['Game_Battler_useItem']=Game_Battler[_0x5b1aaf(0x25e)]['useItem'],Game_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1b3)]=function(_0x5ea22b){const _0x1c9128=_0x5b1aaf;if(this[_0x1c9128(0x1f6)](_0x5ea22b)){this['useItemBTB'](_0x5ea22b);return;}VisuMZ['BattleSystemBTB'][_0x1c9128(0x44d)]['call'](this,_0x5ea22b),this[_0x1c9128(0x2a3)](_0x5ea22b);},Game_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1f6)]=function(_0x58db4a){const _0x5b687e=_0x5b1aaf;if(!BattleManager['isBTB']())return![];if(!SceneManager[_0x5b687e(0x263)]())return![];if(!this[_0x5b687e(0x35f)]())return![];if(this!==BattleManager[_0x5b687e(0x2ff)])return![];if(!this[_0x5b687e(0x2d2)]())return![];if(!this[_0x5b687e(0x2d2)]()['item']())return![];if(this[_0x5b687e(0x2d2)]()[_0x5b687e(0x1b7)]()!==_0x58db4a)return![];if(this[_0x5b687e(0x2d2)]()[_0x5b687e(0x1ea)]())return this[_0x5b687e(0x2d2)]()[_0x5b687e(0x2ec)]()[_0x5b687e(0x3b2)]>0x0;else{if(this['currentAction']()[_0x5b687e(0x45c)]()){if(_0x5b687e(0x3aa)!==_0x5b687e(0x2de))return this[_0x5b687e(0x2d2)]()[_0x5b687e(0x3f2)]()[_0x5b687e(0x3b2)]>0x0;else{this['_turnOrderInnerSprite']=new _0x2093f1(),this[_0x5b687e(0x1c7)](this[_0x5b687e(0x204)]),this['_turnOrderContainer']=[];for(let _0x12c000=0x0;_0x12c000<_0x43a30a[_0x5b687e(0x45b)]();_0x12c000++){const _0x5351fe=new _0x4549d6(_0x1c7a76,_0x12c000);this[_0x5b687e(0x204)][_0x5b687e(0x1a5)](_0x5351fe),this[_0x5b687e(0x419)][_0x5b687e(0x2fd)](_0x5351fe);}for(let _0x79be52=0x0;_0x79be52<_0x2d64bf[_0x5b687e(0x26c)]()['length'];_0x79be52++){const _0x1a73e8=new _0x2a36ca(_0x2b713d,_0x79be52);this[_0x5b687e(0x204)][_0x5b687e(0x1a5)](_0x1a73e8),this[_0x5b687e(0x419)][_0x5b687e(0x2fd)](_0x1a73e8);}}}else return _0x5b687e(0x229)===_0x5b687e(0x229)?![]:_0x59062e[_0x5b687e(0x207)][_0x5b687e(0x241)]['Mechanics'][_0x5b687e(0x1dd)];}},Game_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x32c)]=function(_0x2ac360){const _0x2acd63=_0x5b1aaf;if(!SceneManager[_0x2acd63(0x263)]())return;DataManager[_0x2acd63(0x1ea)](_0x2ac360)?'gNMBM'!==_0x2acd63(0x3c5)?this['btbPaySkillFusionCosts']():this[_0x2acd63(0x233)]()?this[_0x2acd63(0x2b7)]&&!this[_0x2acd63(0x2b7)][_0x2acd63(0x2f5)]()&&this[_0x2acd63(0x2b7)]['canBrave']()&&_0x4ed3b8[_0x2acd63(0x36a)][_0x2acd63(0x26d)]():_0x300b03[_0x2acd63(0x207)][_0x2acd63(0x418)][_0x2acd63(0x2b4)](this):this['btbPayItemFusionCosts']();},Game_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x424)]=function(){const _0x1c7cd8=_0x5b1aaf,_0x153c45=this[_0x1c7cd8(0x2d2)]()['getActionFusionRecipeSkills']();if(!_0x153c45)return;for(const _0x17b970 of _0x153c45){if(_0x1c7cd8(0x373)!==_0x1c7cd8(0x373))return _0x2d38c1[_0x1c7cd8(0x3ee)]&&_0x442af1['description'][_0x1c7cd8(0x306)]('['+_0x330fde+']');else{if(!_0x17b970)continue;if(!this[_0x1c7cd8(0x3fd)](_0x17b970))return![];VisuMZ[_0x1c7cd8(0x207)][_0x1c7cd8(0x44d)][_0x1c7cd8(0x2b4)](this,_0x17b970),this['payBravePointsCost'](_0x17b970);}}return!![];},Game_Battler['prototype'][_0x5b1aaf(0x31f)]=function(){const _0x32e0ac=_0x5b1aaf,_0x28af03=this['currentAction']()['getActionFusionRecipeItems']();if(!_0x28af03)return;for(const _0x46d84e of _0x28af03){if(!_0x46d84e)continue;if(!this[_0x32e0ac(0x3fd)](_0x46d84e))return![];VisuMZ[_0x32e0ac(0x207)][_0x32e0ac(0x44d)][_0x32e0ac(0x2b4)](this,_0x46d84e),this[_0x32e0ac(0x2a3)](_0x46d84e);}return!![];},Game_BattlerBase[_0x5b1aaf(0x25e)][_0x5b1aaf(0x458)]=function(){const _0x3ff37d=_0x5b1aaf,_0xd27bb8=this['bravePoints']()-this[_0x3ff37d(0x2b9)]()+this['calcRegenBravePoints']();return _0xd27bb8['clamp'](Game_BattlerBase[_0x3ff37d(0x1aa)],this[_0x3ff37d(0x3b9)]());},Game_BattlerBase['prototype'][_0x5b1aaf(0x2b9)]=function(){const _0x15e6aa=_0x5b1aaf;let _0x3849b8=0x0;for(const _0x12e6f3 of this[_0x15e6aa(0x1e8)]){if(_0x15e6aa(0x45e)!==_0x15e6aa(0x45e)){if(!_0x2a639f&&_0x52b2fc['id']===_0x2d3482['attackSkillId']())return _0x55fad4;if(!_0x290077&&_0x2ab772['id']===_0x38fb5a[_0x15e6aa(0x284)]())return _0x1b4522;}else{if(!_0x12e6f3)continue;const _0x15310d=_0x12e6f3[_0x15e6aa(0x1b7)]();_0x3849b8+=this[_0x15e6aa(0x2f1)](_0x15310d);}}return _0x3849b8;},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x24c)]=Game_BattlerBase['prototype'][_0x5b1aaf(0x425)],Game_BattlerBase['prototype'][_0x5b1aaf(0x425)]=function(){const _0x528f5=_0x5b1aaf;return BattleManager['isBTB']()&&this['bravePoints']()<0x0?![]:VisuMZ[_0x528f5(0x207)][_0x528f5(0x24c)][_0x528f5(0x2b4)](this);},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x2b6)]=Game_BattlerBase[_0x5b1aaf(0x25e)]['canGuard'],Game_BattlerBase['prototype']['canGuard']=function(){const _0x595504=_0x5b1aaf;if(BattleManager['isBTB']()&&this[_0x595504(0x1c5)]()>0x1){if(_0x595504(0x39d)===_0x595504(0x40d))_0x1ec107['bitmap']=_0xd1389[_0x595504(0x3e5)](_0x1c1558[_0x1800b7]);else return![];}else return VisuMZ[_0x595504(0x207)][_0x595504(0x2b6)][_0x595504(0x2b4)](this);},Game_BattlerBase['prototype'][_0x5b1aaf(0x272)]=function(){const _0x5393a4=_0x5b1aaf;if(this[_0x5393a4(0x394)]())return![];return this['numActions']()<this[_0x5393a4(0x314)]()&&this[_0x5393a4(0x28f)]>this[_0x5393a4(0x2c2)]();},Game_BattlerBase[_0x5b1aaf(0x25e)][_0x5b1aaf(0x394)]=function(){const _0xfb2707=_0x5b1aaf,_0x3b4bdd=VisuMZ['BattleSystemBTB'][_0xfb2707(0x30f)],_0x13aba1=_0x3b4bdd[_0xfb2707(0x39a)];return this['traitObjects']()[_0xfb2707(0x42d)](_0x3916be=>_0x3916be&&_0x3916be[_0xfb2707(0x226)]['match'](_0x13aba1));},Game_BattlerBase[_0x5b1aaf(0x25e)][_0x5b1aaf(0x2f5)]=function(){const _0x28b6ed=_0x5b1aaf,_0x2490fb=VisuMZ[_0x28b6ed(0x207)][_0x28b6ed(0x30f)],_0x5845d9=_0x2490fb['HideBrave'];return this[_0x28b6ed(0x23c)]()[_0x28b6ed(0x42d)](_0x315113=>_0x315113&&_0x315113[_0x28b6ed(0x226)][_0x28b6ed(0x1fe)](_0x5845d9));},Game_BattlerBase[_0x5b1aaf(0x25e)][_0x5b1aaf(0x277)]=function(){const _0x25f892=_0x5b1aaf;delete this[_0x25f892(0x33c)],delete this[_0x25f892(0x3d6)],delete this[_0x25f892(0x32e)],delete this['_btbTurnOrderIconIndex'];},Game_BattlerBase[_0x5b1aaf(0x25e)][_0x5b1aaf(0x26a)]=function(){const _0x230016=_0x5b1aaf;return this[_0x230016(0x33c)]===undefined&&(this[_0x230016(0x33c)]=this[_0x230016(0x38d)]()),this[_0x230016(0x33c)];},Game_BattlerBase[_0x5b1aaf(0x25e)][_0x5b1aaf(0x38d)]=function(){const _0x4b58c1=_0x5b1aaf;return Window_BTB_TurnOrder[_0x4b58c1(0x241)][_0x4b58c1(0x2b5)];},Game_BattlerBase['prototype'][_0x5b1aaf(0x32b)]=function(){const _0x3adbf3=_0x5b1aaf;return this[_0x3adbf3(0x3d6)]===undefined&&(this['_btbTurnOrderFaceName']=this[_0x3adbf3(0x31c)]()),this[_0x3adbf3(0x3d6)];},Game_BattlerBase[_0x5b1aaf(0x25e)]['createTurnOrderBTBGraphicFaceName']=function(){const _0xb26e0c=_0x5b1aaf;return Window_BTB_TurnOrder[_0xb26e0c(0x241)][_0xb26e0c(0x1ab)];},Game_BattlerBase[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1c4)]=function(){const _0x389b0a=_0x5b1aaf;if(this[_0x389b0a(0x32e)]===undefined){if(_0x389b0a(0x1e9)!==_0x389b0a(0x30c))this[_0x389b0a(0x32e)]=this[_0x389b0a(0x2d3)]();else{const _0x54883e=_0x1834d1(_0x1e4183['$1']),_0x1ac815=_0x389b0a(0x27f)[_0x389b0a(0x268)](_0x54883e),_0x305cf3=_0x195c77[_0x389b0a(0x207)]['createKeyJS'](_0x3e84db,_0x33bf92);_0xdf26e2['BattleSystemBTB']['JS'][_0x305cf3]=new _0x4a07(_0x1ac815);}}return this['_btbTurnOrderFaceIndex'];},Game_BattlerBase['prototype'][_0x5b1aaf(0x2d3)]=function(){const _0x1a8a21=_0x5b1aaf;return Window_BTB_TurnOrder[_0x1a8a21(0x241)]['EnemyBattlerFaceIndex'];},Game_BattlerBase[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1a6)]=function(){const _0x5c7b3d=_0x5b1aaf;return this['_btbTurnOrderIconIndex']===undefined&&(this[_0x5c7b3d(0x3f3)]=this[_0x5c7b3d(0x1b9)]()),this[_0x5c7b3d(0x3f3)];},Game_BattlerBase[_0x5b1aaf(0x25e)]['createTurnOrderBTBGraphicIconIndex']=function(){const _0x420efb=_0x5b1aaf;return Window_BTB_TurnOrder[_0x420efb(0x241)][_0x420efb(0x1af)];},Game_BattlerBase['prototype'][_0x5b1aaf(0x2c8)]=function(_0x409042){this['_btbTurnOrderIconIndex']=_0x409042;},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x21b)]=Game_BattlerBase[_0x5b1aaf(0x25e)]['hide'],Game_BattlerBase[_0x5b1aaf(0x25e)][_0x5b1aaf(0x3c6)]=function(){const _0x3e29cc=_0x5b1aaf;VisuMZ[_0x3e29cc(0x207)]['Game_BattlerBase_hide'][_0x3e29cc(0x2b4)](this),BattleManager[_0x3e29cc(0x366)]();},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x2e6)]=Game_BattlerBase['prototype'][_0x5b1aaf(0x25d)],Game_BattlerBase['prototype'][_0x5b1aaf(0x25d)]=function(){const _0x4e0166=_0x5b1aaf;VisuMZ['BattleSystemBTB'][_0x4e0166(0x2e6)][_0x4e0166(0x2b4)](this),BattleManager[_0x4e0166(0x366)]();},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x363)]=Game_Battler[_0x5b1aaf(0x25e)]['performCollapse'],Game_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1fa)]=function(){const _0x3841eb=_0x5b1aaf;VisuMZ[_0x3841eb(0x207)]['Game_Battler_performCollapse'][_0x3841eb(0x2b4)](this),BattleManager['removeActionBattlersBTB']();},VisuMZ['BattleSystemBTB']['Game_Battler_makeActionTimes']=Game_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x2c6)],Game_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x2c6)]=function(){const _0x15bb25=_0x5b1aaf;return BattleManager[_0x15bb25(0x28e)]()?'esPOp'===_0x15bb25(0x3cd)?_0x5bcb90[_0x15bb25(0x207)][_0x15bb25(0x362)]['call'](this):0x1:VisuMZ[_0x15bb25(0x207)][_0x15bb25(0x279)]['call'](this);},VisuMZ[_0x5b1aaf(0x207)]['Game_Battler_onBattleStart']=Game_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1fc)],Game_Battler['prototype'][_0x5b1aaf(0x1fc)]=function(_0x28d6f2){const _0x3077d9=_0x5b1aaf;VisuMZ[_0x3077d9(0x207)][_0x3077d9(0x246)][_0x3077d9(0x2b4)](this,_0x28d6f2),this[_0x3077d9(0x299)](_0x28d6f2);},Game_Battler[_0x5b1aaf(0x25e)]['onBattleStartBTB']=function(_0x20fa9e){const _0x942ae=_0x5b1aaf;if(!BattleManager[_0x942ae(0x28e)]())return;const _0x5a916e=VisuMZ['BattleSystemBTB']['Settings']['Mechanics'],_0x3f5266=VisuMZ['BattleSystemBTB'][_0x942ae(0x30f)];let _0x39dfda=_0x20fa9e?_0x5a916e[_0x942ae(0x3dc)]:_0x5a916e[_0x942ae(0x311)];const _0x488600=this['traitObjects']();for(const _0x2196c9 of _0x488600){if(_0x942ae(0x3a2)!==_0x942ae(0x3a2))return _0x29c54b(_0x387da8['$1']);else{if(!_0x2196c9)continue;const _0x399fc4=_0x2196c9['note'];if(_0x399fc4[_0x942ae(0x1fe)](_0x3f5266['BravePointBattleStart'])){if(_0x942ae(0x3ae)===_0x942ae(0x33f))return _0x515686(_0x5adb8c['$1']);else _0x39dfda+=Number(RegExp['$1']);}}}this[_0x942ae(0x46b)](_0x39dfda);},Game_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x26d)]=function(){const _0x513594=_0x5b1aaf;this['_actions']['push'](new Game_Action(this));const _0x8e3c1d=VisuMZ['BattleSystemBTB'][_0x513594(0x241)][_0x513594(0x345)];if(_0x8e3c1d[_0x513594(0x2e0)]){if(_0x513594(0x2ae)===_0x513594(0x2ae)){const _0x56d941=_0x513594(0x388),_0x2f12fc=_0x8e3c1d[_0x513594(0x298)[_0x513594(0x268)](_0x56d941)],_0xd14a96=_0x8e3c1d['%1Mirror'[_0x513594(0x268)](_0x56d941)],_0xeba2bb=_0x8e3c1d[_0x513594(0x466)[_0x513594(0x268)](_0x56d941)];$gameTemp[_0x513594(0x21f)]([this],_0x2f12fc,_0xd14a96,_0xeba2bb);}else this['_btbTurnOrderFaceName']=this[_0x513594(0x31c)]();}},Game_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x3e3)]=function(){const _0x2cd18c=_0x5b1aaf;if(this[_0x2cd18c(0x1e8)][_0x2cd18c(0x3b2)]<=0x1)return;this[_0x2cd18c(0x1e8)]['pop']();const _0x77f9a3=VisuMZ[_0x2cd18c(0x207)][_0x2cd18c(0x241)][_0x2cd18c(0x345)];if(_0x77f9a3[_0x2cd18c(0x3c4)]){const _0x5d0096=_0x2cd18c(0x3b3),_0xf10dd1=_0x77f9a3[_0x2cd18c(0x298)[_0x2cd18c(0x268)](_0x5d0096)],_0x244507=_0x77f9a3[_0x2cd18c(0x3f0)[_0x2cd18c(0x268)](_0x5d0096)],_0x5a7ae2=_0x77f9a3[_0x2cd18c(0x466)[_0x2cd18c(0x268)](_0x5d0096)];$gameTemp['requestFauxAnimation']([this],_0xf10dd1,_0x244507,_0x5a7ae2);}},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x368)]=Game_Battler['prototype'][_0x5b1aaf(0x2c0)],Game_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x2c0)]=function(){const _0x303a55=_0x5b1aaf;VisuMZ[_0x303a55(0x207)][_0x303a55(0x368)][_0x303a55(0x2b4)](this),this[_0x303a55(0x396)]();},Game_Battler['prototype']['onTurnEndBTB']=function(){const _0x42cd0c=_0x5b1aaf;if(!BattleManager[_0x42cd0c(0x28e)]())return;if(!$gameParty['inBattle']())return;this[_0x42cd0c(0x2aa)]();},Game_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x2aa)]=function(){const _0x179cd5=_0x5b1aaf,_0x57385c=VisuMZ[_0x179cd5(0x207)][_0x179cd5(0x241)][_0x179cd5(0x393)],_0x93f0b3=_0x57385c[_0x179cd5(0x1f3)];if(_0x93f0b3&&!this[_0x179cd5(0x30e)]())return;const _0x838e31=this[_0x179cd5(0x356)]();this[_0x179cd5(0x3f4)](_0x838e31);},Game_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x356)]=function(){const _0x17ebbc=_0x5b1aaf,_0x438e9c=VisuMZ[_0x17ebbc(0x207)][_0x17ebbc(0x30f)],_0x29b0c2=VisuMZ['BattleSystemBTB'][_0x17ebbc(0x241)]['Mechanics'];let _0xedb2f1=_0x29b0c2['BravePointRegenBase']||0x0;const _0x25df22=this[_0x17ebbc(0x23c)]();for(const _0x5a7565 of _0x25df22){if(_0x17ebbc(0x434)===_0x17ebbc(0x434)){if(!_0x5a7565)continue;const _0x45fb32=_0x5a7565[_0x17ebbc(0x226)];if(_0x45fb32[_0x17ebbc(0x1fe)](_0x438e9c[_0x17ebbc(0x2d8)])){if('ddtsa'!=='sukXt')_0xedb2f1+=Number(RegExp['$1']);else{const _0x3aa80d=_0x5e7fe0['BattleSystemBTB']['JS'][_0x5605d8][_0x17ebbc(0x2b4)](this,this['subject'](),_0x429022,_0x491057[_0x17ebbc(0x3ec)]());_0x54512c[_0x17ebbc(0x46b)](_0x3aa80d);}}}else{if(!_0x2b308d[_0x17ebbc(0x263)]())return;if(!this[_0x17ebbc(0x28e)]())return;const _0x4e2aa6=_0x275c58[_0x17ebbc(0x36a)];if(!_0x4e2aa6)return;const _0x33cde4=_0x4e2aa6[_0x17ebbc(0x2c7)];if(!_0x33cde4)return;_0x33cde4['requestRefresh']();}}return _0xedb2f1;},Game_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x3b5)]=function(){const _0x5bbf7f=_0x5b1aaf;if(!this[_0x5bbf7f(0x3da)]())return;if(this[_0x5bbf7f(0x1c5)]()<=0x1)return;if(!this[_0x5bbf7f(0x2d2)]())return;if(!this[_0x5bbf7f(0x2d2)]()['item']())return;const _0x18807f=this[_0x5bbf7f(0x245)]();if(_0x18807f[_0x5bbf7f(0x3b2)]<=0x0)return;let _0x23a81d='',_0x38b696=0x0;const _0x226bad=this['currentAction']()[_0x5bbf7f(0x1ea)](),_0x495b43=_0x226bad?DataManager[_0x5bbf7f(0x1a8)]:DataManager[_0x5bbf7f(0x359)],_0x3f8a56=_0x226bad?DataManager[_0x5bbf7f(0x308)]:DataManager['_btbItemStrictFusion'];for(const _0x135f8b of _0x18807f){if(!_0x135f8b)continue;if(_0x495b43[_0x135f8b]&&_0x495b43[_0x135f8b]>=_0x38b696){if(this['canPayActionFusionCombination'](_0x135f8b)){if(_0x5bbf7f(0x43d)!==_0x5bbf7f(0x353))_0x23a81d=_0x135f8b,_0x38b696=_0x495b43[_0x135f8b];else{const _0x2f21f5=this[_0x5bbf7f(0x44c)];this['x']=(this['x']*(_0x2f21f5-0x1)+this[_0x5bbf7f(0x307)])/_0x2f21f5,this['y']=(this['y']*(_0x2f21f5-0x1)+this[_0x5bbf7f(0x209)])/_0x2f21f5,this[_0x5bbf7f(0x44c)]--;}}}_0x3f8a56[_0x135f8b]&&_0x3f8a56[_0x135f8b]>=_0x38b696&&(_0x5bbf7f(0x2ab)===_0x5bbf7f(0x2ab)?this[_0x5bbf7f(0x304)](_0x135f8b)&&(_0x5bbf7f(0x445)!==_0x5bbf7f(0x445)?_0x22c9d4=!![]:(_0x23a81d=_0x135f8b,_0x38b696=_0x495b43[_0x135f8b])):this[_0x5bbf7f(0x454)]=_0x33a0c7);}if(_0x38b696<=0x0)return;this['removeActionFusionIngredients'](_0x23a81d),this[_0x5bbf7f(0x2d2)]()[_0x5bbf7f(0x3f5)](_0x23a81d);if(_0x226bad){if('PuCuz'!=='QoIIt')this['currentAction']()[_0x5bbf7f(0x23f)](_0x38b696);else{const _0x249b99=this['actor']()[_0x5bbf7f(0x226)];if(_0x249b99[_0x5bbf7f(0x1fe)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0x27157b(_0x385303['$1']);return _0x1fc444[_0x5bbf7f(0x241)][_0x5bbf7f(0x319)];}}else this['currentAction']()[_0x5bbf7f(0x2e5)](_0x38b696);},Game_Battler['prototype']['canProcessActionFusionsBTB']=function(){const _0x2a20c3=_0x5b1aaf;if(this['cannotFusionNotetagBTB']())return![];const _0xd47c2f=VisuMZ[_0x2a20c3(0x207)]['Settings']['Mechanics'];if(this[_0x2a20c3(0x35f)]()){if(_0x2a20c3(0x2f9)==='RtrZs'){const _0x415609=_0x4edc36[_0x2a20c3(0x207)]['JS'][_0x41d4b9]['call'](this,this[_0x2a20c3(0x2ce)](),_0x3c50ff,this['subject']()[_0x2a20c3(0x3ec)]());this[_0x2a20c3(0x2ce)]()['setBravePoints'](_0x415609);}else{if(_0xd47c2f['ActorActionFusions']===undefined)return!![];return _0xd47c2f[_0x2a20c3(0x2e7)];}}else{if(_0xd47c2f['EnemyActionFusions']===undefined)return!![];return _0xd47c2f[_0x2a20c3(0x375)];}},Game_BattlerBase['prototype'][_0x5b1aaf(0x1d3)]=function(){const _0x241669=_0x5b1aaf,_0x3e4613=VisuMZ[_0x241669(0x207)][_0x241669(0x30f)],_0x4f9dc2=this[_0x241669(0x23c)]();for(const _0xa739b5 of _0x4f9dc2){if(!_0xa739b5)continue;const _0x24f103=_0xa739b5[_0x241669(0x226)];if(_0x24f103[_0x241669(0x1fe)](_0x3e4613['CannotFusion']))return!![];if(_0x24f103['match'](_0x3e4613[_0x241669(0x1c8)]))return![];}return![];},Game_Battler['prototype']['getActionFusionCombinationsBTB']=function(){const _0x57b0ba=_0x5b1aaf,_0x43e394=this[_0x57b0ba(0x2d2)](),_0x972e39=this['_actions'],_0x37c648=_0x972e39[_0x57b0ba(0x1cc)](_0xfbfd91=>this[_0x57b0ba(0x1c3)](_0x43e394,_0xfbfd91)),_0x395264=_0x37c648[_0x57b0ba(0x223)](_0x5785ec=>_0x5785ec[_0x57b0ba(0x1b7)]()['id']),_0x499e62=VisuMZ[_0x57b0ba(0x207)]['formFlexCombo'](_0x43e394['item']()['id'],_0x395264);let _0x42edfd=String(_0x43e394[_0x57b0ba(0x1b7)]()['id']);for(let _0x1e0964=0x1;_0x1e0964<_0x972e39[_0x57b0ba(0x3b2)];_0x1e0964++){const _0x3e7f64=_0x972e39[_0x1e0964];if(this[_0x57b0ba(0x1c3)](_0x43e394,_0x3e7f64))'vCOyI'===_0x57b0ba(0x212)?_0x2ac077[_0x57b0ba(0x216)]():(_0x42edfd=_0x57b0ba(0x3a8)[_0x57b0ba(0x268)](_0x42edfd,_0x3e7f64['item']()['id']),_0x499e62[_0x57b0ba(0x2fd)](_0x42edfd));else{if('epVDE'!==_0x57b0ba(0x1c1))break;else this[_0x57b0ba(0x2ad)]=this[_0x57b0ba(0x2a8)],this['_homeY']=this[_0x57b0ba(0x3ba)];}}return _0x499e62[_0x57b0ba(0x1cc)]((_0x41577a,_0x4bd559,_0x268415)=>_0x268415['indexOf'](_0x41577a)===_0x4bd559);},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x1be)]=function(_0xa66db9,_0x59a5ec){const _0x43d002=[],_0x33814e=function(_0x3e2446,_0xb1850b){const _0x426f63=_0xf1b5;if(_0x426f63(0x2bd)!==_0x426f63(0x430))for(var _0x6950cf=0x0;_0x6950cf<_0xb1850b['length'];_0x6950cf++){'vKymg'===_0x426f63(0x390)?(_0x43d002[_0x426f63(0x2fd)](_0x3e2446+'-'+_0xb1850b[_0x6950cf]),_0x33814e(_0x3e2446+'-'+_0xb1850b[_0x6950cf],_0xb1850b[_0x426f63(0x290)](_0x6950cf+0x1))):(this['_graphicSv']=_0x1f416e[_0x426f63(0x37e)](),_0x26d59d=_0x135148[_0x426f63(0x42a)](this[_0x426f63(0x40c)]),_0x2cf905[_0x426f63(0x1d8)](this['changeSvActorGraphicBitmap'][_0x426f63(0x1ae)](this,_0x4dbeda)));}else this['performBrave']();};return _0x33814e(_0xa66db9,_0x59a5ec),_0x43d002;},Game_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1c3)]=function(_0x59951c,_0x1a8374){const _0x489f9a=_0x5b1aaf;if(!_0x59951c||!_0x1a8374)return![];if(_0x59951c===_0x1a8374)return![];if(!_0x59951c['item']()||!_0x1a8374[_0x489f9a(0x1b7)]())return![];if(_0x59951c[_0x489f9a(0x1ea)]()!==_0x1a8374['isSkill']())return![];return!![];},Game_Battler['prototype'][_0x5b1aaf(0x304)]=function(_0x306844){const _0xfe29f2=_0x5b1aaf,_0x376fea=this['currentAction']()[_0xfe29f2(0x1ea)](),_0x18cb43=JsonEx['makeDeepCopy'](this);_0x18cb43['_tempBattler']=!![],_0x18cb43[_0xfe29f2(0x2d2)]()[_0xfe29f2(0x3f5)](_0x306844);if(_0x376fea){if(_0xfe29f2(0x3e0)!==_0xfe29f2(0x2db))return _0x18cb43[_0xfe29f2(0x424)]();else this[_0xfe29f2(0x329)](0xff);}else{if(_0xfe29f2(0x228)!==_0xfe29f2(0x318)){const _0x1c7ea4=JsonEx['makeDeepCopy']($gameParty[_0xfe29f2(0x45a)]),_0x2df072=JsonEx[_0xfe29f2(0x225)]($gameParty[_0xfe29f2(0x2ba)]),_0x282deb=JsonEx['makeDeepCopy']($gameParty[_0xfe29f2(0x33a)]);let _0x40f6ed=_0x18cb43[_0xfe29f2(0x31f)]();return $gameParty[_0xfe29f2(0x45a)]=_0x1c7ea4,$gameParty[_0xfe29f2(0x2ba)]=_0x2df072,$gameParty[_0xfe29f2(0x33a)]=_0x282deb,_0x40f6ed;}else{const _0x2ff177=this[_0xfe29f2(0x1b7)](),_0x437bbf=_0x383b99[_0xfe29f2(0x32d)]();if(_0x437bbf)_0x437bbf['setItem'](_0x2ff177?_0x2ff177['id']:null);_0x25c491[_0xfe29f2(0x25e)][_0xfe29f2(0x1ec)]['call'](this);}}},Game_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x3ff)]=function(_0x2b1637){const _0x5eda40=_0x5b1aaf,_0x43287f=this[_0x5eda40(0x2d2)](),_0x22c5ce=_0x2b1637[_0x5eda40(0x21e)]('-')[_0x5eda40(0x223)](_0x5d3b88=>Number(_0x5d3b88));_0x22c5ce[_0x5eda40(0x3ac)]();const _0x537e11=this[_0x5eda40(0x1e8)],_0x11249d=[];for(const _0x2991c6 of _0x537e11){if(_0x5eda40(0x453)===_0x5eda40(0x407))this[_0x5eda40(0x424)]();else{if(this[_0x5eda40(0x1c3)](_0x43287f,_0x2991c6)){if(_0x22c5ce[_0x5eda40(0x306)](_0x2991c6['item']()['id'])){if(_0x5eda40(0x3c1)===_0x5eda40(0x3c1))_0x11249d['push'](_0x2991c6),_0x22c5ce[_0x5eda40(0x281)](_0x22c5ce[_0x5eda40(0x3b0)](_0x2991c6[_0x5eda40(0x1b7)]()['id']),0x1);else{if(!_0x58a922[_0x5eda40(0x28e)]())return;if(this['numActions']()<=0x0)return;this[_0x5eda40(0x289)]=![],this['bravePoints']()<0x0&&this[_0x5eda40(0x438)]();}}}}}for(const _0x4bf055 of _0x11249d){_0x5eda40(0x41f)==='VwUah'?_0x325e99+=_0x1ab4e2(_0x9b748d['$1']):_0x537e11['remove'](_0x4bf055);}},Game_Actor['prototype'][_0x5b1aaf(0x46b)]=function(_0x2a0335){const _0x586cfb=_0x5b1aaf;Game_Battler[_0x586cfb(0x25e)][_0x586cfb(0x46b)][_0x586cfb(0x2b4)](this,_0x2a0335);if(!SceneManager[_0x586cfb(0x263)]())return;if(!BattleManager[_0x586cfb(0x429)]()[_0x586cfb(0x306)](this))return;BattleManager[_0x586cfb(0x3c3)]();},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x2ea)]=Game_Actor[_0x5b1aaf(0x25e)][_0x5b1aaf(0x28a)],Game_Actor[_0x5b1aaf(0x25e)][_0x5b1aaf(0x28a)]=function(){const _0x3b5ee2=_0x5b1aaf;VisuMZ[_0x3b5ee2(0x207)]['Game_Actor_makeActions'][_0x3b5ee2(0x2b4)](this);if(BattleManager[_0x3b5ee2(0x28e)]()&&this[_0x3b5ee2(0x3ec)]()<0x0){if('BHTjb'!==_0x3b5ee2(0x219)){const _0x542cec=_0x295364[_0x3b5ee2(0x241)];if([_0x3b5ee2(0x322)][_0x3b5ee2(0x306)](_0x542cec[_0x3b5ee2(0x1fd)]))return;this['x']=this[_0x3b5ee2(0x2ad)],this['y']=this[_0x3b5ee2(0x38a)];const _0x2ecc24=_0x3a517f[_0x3b5ee2(0x36a)]['_windowLayer'];this['x']+=_0x2ecc24['x'],this['y']+=_0x2ecc24['y'];}else this[_0x3b5ee2(0x438)]();}},Game_Actor[_0x5b1aaf(0x25e)][_0x5b1aaf(0x38d)]=function(){const _0x3ecced=_0x5b1aaf,_0x38f20c=this[_0x3ecced(0x24d)]()[_0x3ecced(0x226)];if(_0x38f20c['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x3ecced(0x2b0);else{if(_0x38f20c[_0x3ecced(0x1fe)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0x3ecced(0x27d);}return Window_BTB_TurnOrder['Settings']['ActorBattlerType'];},Game_Actor['prototype'][_0x5b1aaf(0x31c)]=function(){const _0x16380c=_0x5b1aaf,_0x31e5cf=this['actor']()[_0x16380c(0x226)];if(_0x31e5cf['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this['faceName']();},Game_Actor[_0x5b1aaf(0x25e)]['createTurnOrderBTBGraphicFaceIndex']=function(){const _0x1f72ad=_0x5b1aaf,_0x9984a3=this[_0x1f72ad(0x24d)]()[_0x1f72ad(0x226)];if(_0x9984a3[_0x1f72ad(0x1fe)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if('owLHc'!==_0x1f72ad(0x24e)){if(!this[_0x1f72ad(0x204)])return;const _0x10bbaa=this[_0x1f72ad(0x204)][_0x1f72ad(0x2bc)];if(!_0x10bbaa)return;_0x10bbaa[_0x1f72ad(0x406)](this['compareBattlerSprites'][_0x1f72ad(0x1ae)](this));}else return Number(RegExp['$2']);}return this['faceIndex']();},Game_Actor['prototype'][_0x5b1aaf(0x1b9)]=function(){const _0x3eef11=_0x5b1aaf,_0x2d4632=this['actor']()[_0x3eef11(0x226)];if(_0x2d4632[_0x3eef11(0x1fe)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_BTB_TurnOrder[_0x3eef11(0x241)][_0x3eef11(0x319)];},Game_Actor[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1c3)]=function(_0x2b1b6d,_0x140e80){const _0x5e2289=_0x5b1aaf;if(!Game_Battler[_0x5e2289(0x25e)][_0x5e2289(0x1c3)][_0x5e2289(0x2b4)](this,_0x2b1b6d,_0x140e80))return![];if(_0x2b1b6d['needsSelection']()&&_0x140e80['needsSelection']()){if(_0x5e2289(0x260)===_0x5e2289(0x260)){if(_0x2b1b6d[_0x5e2289(0x404)]()!==_0x140e80[_0x5e2289(0x404)]())return![];if(_0x2b1b6d[_0x5e2289(0x3d7)]!==_0x140e80[_0x5e2289(0x3d7)])return![];}else{const _0x491f21=this['battler']();if(!_0x491f21)return;if(!_0x491f21['isEnemy']())return;if(this[_0x5e2289(0x249)]===_0x491f21['battlerHue']())return;this[_0x5e2289(0x249)]=_0x491f21[_0x5e2289(0x201)](),this[_0x5e2289(0x43c)][_0x5e2289(0x383)](_0x491f21[_0x5e2289(0x443)]()?0x0:this[_0x5e2289(0x249)]);}}return!![];},Game_Enemy[_0x5b1aaf(0x25e)][_0x5b1aaf(0x38d)]=function(){const _0x991d5f=_0x5b1aaf,_0x33d453=this[_0x991d5f(0x38c)]()[_0x991d5f(0x226)];if(_0x33d453[_0x991d5f(0x1fe)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'dZWNb'!==_0x991d5f(0x3bc)?_0x991d5f(0x2b0):_0x39667b[_0x991d5f(0x207)][_0x991d5f(0x2b6)][_0x991d5f(0x2b4)](this);else{if(_0x33d453[_0x991d5f(0x1fe)](/<BTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x991d5f(0x39f)!==_0x991d5f(0x3d3))return'icon';else{_0x46d7a3[_0x991d5f(0x207)][_0x991d5f(0x1e5)]['call'](this,_0x4205c8);const _0xdb2bf3=this[_0x991d5f(0x24d)](_0xf49d42);if(this['showBravePoints'](_0xdb2bf3)){const _0x450b17=this[_0x991d5f(0x44f)](_0x369445),_0x3f5424=_0x216f19['optDisplayTp']?0x4:0x3,_0x5bf9f9=_0x3f5424*0x80+(_0x3f5424-0x1)*0x8+0x4;let _0xb4b887=_0x450b17['x']+this[_0x991d5f(0x384)];_0x6cc088['BattleCore'][_0x991d5f(0x241)][_0x991d5f(0x2c3)]['ShowFacesListStyle']?_0xb4b887=_0x450b17['x']+_0x2965e1[_0x991d5f(0x3f1)]+0x8:_0xb4b887+=_0xbf9a65[_0x991d5f(0x3c8)];const _0x3e1340=_0x4c9fda[_0x991d5f(0x266)](_0x4143fb[_0x991d5f(0x2cc)](_0x450b17['x']+_0x450b17[_0x991d5f(0x38f)]-_0x5bf9f9,_0xb4b887));let _0x357014=_0x3e1340+0x88,_0x50a189=_0x450b17['y'];_0x357014+=0x88*(_0x5df95d[_0x991d5f(0x3ce)]?0x3:0x2),_0x357014+=this[_0x991d5f(0x3e1)](),_0x50a189+=this['getOffsetY_BTB']();const _0xa82b6b=this[_0x991d5f(0x417)]();if(_0x357014>_0x450b17['x']+_0x450b17['width'])return;this[_0x991d5f(0x3cf)](_0xdb2bf3,_0x357014,_0x50a189,_0x450b17[_0x991d5f(0x38f)],_0xa82b6b);}}}}return Window_BTB_TurnOrder['Settings'][_0x991d5f(0x2b5)];},Game_Enemy[_0x5b1aaf(0x25e)][_0x5b1aaf(0x31c)]=function(){const _0xe53fd1=_0x5b1aaf,_0x55fedc=this[_0xe53fd1(0x38c)]()[_0xe53fd1(0x226)];if(_0x55fedc[_0xe53fd1(0x1fe)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_BTB_TurnOrder['Settings'][_0xe53fd1(0x1ab)];},Game_Enemy['prototype']['createTurnOrderBTBGraphicFaceIndex']=function(){const _0x191c0a=_0x5b1aaf,_0x2aca37=this[_0x191c0a(0x38c)]()[_0x191c0a(0x226)];if(_0x2aca37[_0x191c0a(0x1fe)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_BTB_TurnOrder[_0x191c0a(0x241)][_0x191c0a(0x1e2)];},Game_Enemy[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1b9)]=function(){const _0x3ff295=_0x5b1aaf,_0x58d86a=this[_0x3ff295(0x38c)]()[_0x3ff295(0x226)];if(_0x58d86a[_0x3ff295(0x1fe)](/<BTB TURN ORDER ICON:[ ](\d+)>/i)){if('krdNo'!==_0x3ff295(0x23a))return Number(RegExp['$1']);else{if(!_0x500927['isBTB']())return;const _0x4b1d0d=this['_actorCommandWindow'];if(!_0x4b1d0d)return;_0x4b1d0d[_0x3ff295(0x2e1)](_0x3ff295(0x44a),this['commandBrave'][_0x3ff295(0x1ae)](this)),_0x4b1d0d[_0x3ff295(0x2e1)](_0x3ff295(0x37c),this[_0x3ff295(0x360)][_0x3ff295(0x1ae)](this));}}return Window_BTB_TurnOrder[_0x3ff295(0x241)][_0x3ff295(0x1af)];},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x2ee)]=Game_Enemy[_0x5b1aaf(0x25e)]['makeActions'],Game_Enemy[_0x5b1aaf(0x25e)][_0x5b1aaf(0x28a)]=function(){const _0x26b0d7=_0x5b1aaf;VisuMZ[_0x26b0d7(0x207)][_0x26b0d7(0x2ee)][_0x26b0d7(0x2b4)](this),this[_0x26b0d7(0x40a)](),this[_0x26b0d7(0x38b)]();},Game_Enemy[_0x5b1aaf(0x25e)][_0x5b1aaf(0x40a)]=function(){const _0x5adec5=_0x5b1aaf;if(!BattleManager[_0x5adec5(0x28e)]())return;if(this[_0x5adec5(0x1c5)]()<=0x0)return;this[_0x5adec5(0x289)]=![],this[_0x5adec5(0x3ec)]()<0x0&&this[_0x5adec5(0x438)]();},Game_Enemy[_0x5b1aaf(0x25e)][_0x5b1aaf(0x38b)]=function(){const _0x1b3006=_0x5b1aaf;if(!BattleManager[_0x1b3006(0x28e)]())return;if(this[_0x1b3006(0x1c5)]()<=0x0)return;const _0x377796=this['_actions'][0x0];if(!_0x377796)return;const _0xd32451=_0x377796[_0x1b3006(0x1b7)]();if(!_0xd32451)return;const _0x1e0b24=VisuMZ[_0x1b3006(0x207)][_0x1b3006(0x30f)],_0x230963=_0xd32451[_0x1b3006(0x226)];let _0x324c68=[];if(_0x230963[_0x1b3006(0x1fe)](_0x1e0b24['EnemyMultiAction'])){const _0x2cf3db=String(RegExp['$1'])[_0x1b3006(0x21e)](',');for(let _0x3ccb6a of _0x2cf3db){_0x3ccb6a=(String(_0x3ccb6a)||'')[_0x1b3006(0x463)]();const _0x269c89=/^\d+$/['test'](_0x3ccb6a);_0x269c89?_0x324c68['push'](Number(_0x3ccb6a)):_0x1b3006(0x324)===_0x1b3006(0x324)?_0x324c68[_0x1b3006(0x2fd)](DataManager[_0x1b3006(0x441)](_0x3ccb6a)):(_0x12a8d8[_0x1b3006(0x207)][_0x1b3006(0x3d8)]['call'](this),this['initBattleSystemBTB']());}}if(_0x324c68[_0x1b3006(0x3b2)]<=0x0)return;while(_0x324c68['length']>this[_0x1b3006(0x314)]()){if(_0x1b3006(0x351)!==_0x1b3006(0x351)){_0x117e8d[_0x1b3006(0x289)]=!![];let _0x4019a7=_0x5dd39a['braveAnimationTimes']();const _0x36400=_0x287ec8[_0x1b3006(0x207)][_0x1b3006(0x241)]['BraveAnimation'],_0x43c34a=_0x36400[_0x1b3006(0x2e0)],_0x36184e=_0x36400[_0x1b3006(0x1e7)];while(_0x4019a7--){this[_0x1b3006(0x2fd)]('showNormalAnimation',[_0x596581],_0x43c34a),_0x4019a7>0x0?this[_0x1b3006(0x2fd)]('waitCount',_0x36184e):this[_0x1b3006(0x2fd)]('waitForAnimation');}this[_0x1b3006(0x2fd)](_0x1b3006(0x461),_0x3fecb4,_0x195a3e,_0x4f412f);}else _0x324c68[_0x1b3006(0x367)]();}if(_0x324c68['length']<=0x0)return;this[_0x1b3006(0x438)]();for(const _0x377601 of _0x324c68){const _0x196309=new Game_Action(this);_0x196309['setSkill'](_0x377601),_0x196309[_0x1b3006(0x334)]=!![],this[_0x1b3006(0x1e8)][_0x1b3006(0x2fd)](_0x196309);}},Game_Enemy['prototype'][_0x5b1aaf(0x444)]=function(){const _0x3ea471=_0x5b1aaf;let _0x10e05f=this[_0x3ea471(0x1c5)]();for(const _0x5b4e76 of this[_0x3ea471(0x1e8)]){if(!_0x5b4e76)continue;_0x10e05f+=_0x5b4e76[_0x3ea471(0x332)]();}return _0x10e05f-0x1;},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x36d)]=Game_Unit['prototype'][_0x5b1aaf(0x28a)],Game_Unit[_0x5b1aaf(0x25e)]['makeActions']=function(){const _0x223907=_0x5b1aaf;VisuMZ[_0x223907(0x207)][_0x223907(0x36d)]['call'](this);if(BattleManager['isBTB']()&&this===$gameTroop&&SceneManager[_0x223907(0x263)]()){if('bzyHS'===_0x223907(0x211)){if(!_0x1e93d5[_0x223907(0x28e)]())return;if(this[_0x223907(0x1b7)]())this[_0x223907(0x29f)](_0x42fc4);}else BattleManager['makeActionOrders']();}},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x2f0)]=Game_Party[_0x5b1aaf(0x25e)]['removeActor'],Game_Party[_0x5b1aaf(0x25e)][_0x5b1aaf(0x2d0)]=function(_0x303c9c){const _0x26a949=_0x5b1aaf;VisuMZ[_0x26a949(0x207)][_0x26a949(0x2f0)][_0x26a949(0x2b4)](this,_0x303c9c);if(SceneManager['isSceneBattle']()&&BattleManager[_0x26a949(0x28e)]()){if(_0x26a949(0x427)!==_0x26a949(0x22a))BattleManager['_actionBattlers']['remove']($gameActors[_0x26a949(0x24d)](_0x303c9c));else{_0xdc25ec[_0x26a949(0x207)]['Window_BattleStatus_drawItemStatusXPStyle']['call'](this,_0x88bee4);const _0x23fb64=this[_0x26a949(0x24d)](_0x188c5b);if(this[_0x26a949(0x39c)](_0x23fb64)){const _0xef85e0=this[_0x26a949(0x36f)](_0x33f09e);let _0x379497=_0xef85e0['x'],_0x1bbebd=_0xef85e0['y'];_0x379497+=this[_0x26a949(0x3e1)](),_0x1bbebd+=this['getOffsetY_BTB']();const _0xe16dbf=this[_0x26a949(0x417)]();this[_0x26a949(0x3cf)](_0x23fb64,_0x379497,_0x1bbebd,_0xef85e0[_0x26a949(0x38f)],_0xe16dbf);}}}},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x247)]=Scene_Battle[_0x5b1aaf(0x25e)][_0x5b1aaf(0x28b)],Scene_Battle[_0x5b1aaf(0x25e)]['onDisabledPartyCommandSelection']=function(){const _0x154051=_0x5b1aaf;BattleManager['isBTB']()?this[_0x154051(0x2c9)]():VisuMZ[_0x154051(0x207)]['Scene_Battle_onDisabledPartyCommandSelection'][_0x154051(0x2b4)](this);},VisuMZ[_0x5b1aaf(0x207)]['Scene_Battle_createActorCommandWindow']=Scene_Battle[_0x5b1aaf(0x25e)][_0x5b1aaf(0x24a)],Scene_Battle[_0x5b1aaf(0x25e)]['createActorCommandWindow']=function(){const _0x29d193=_0x5b1aaf;VisuMZ['BattleSystemBTB'][_0x29d193(0x31a)][_0x29d193(0x2b4)](this),this[_0x29d193(0x1a1)]();},Scene_Battle[_0x5b1aaf(0x25e)]['createActorCommandWindowBTB']=function(){const _0x3c5fc4=_0x5b1aaf;if(!BattleManager['isBTB']())return;const _0x548cce=this[_0x3c5fc4(0x39b)];if(!_0x548cce)return;_0x548cce[_0x3c5fc4(0x2e1)](_0x3c5fc4(0x44a),this['commandBrave'][_0x3c5fc4(0x1ae)](this)),_0x548cce[_0x3c5fc4(0x2e1)](_0x3c5fc4(0x37c),this[_0x3c5fc4(0x360)][_0x3c5fc4(0x1ae)](this));},Scene_Battle['prototype'][_0x5b1aaf(0x26e)]=function(){this['performBrave']();},Scene_Battle['prototype'][_0x5b1aaf(0x360)]=function(){const _0x15d5a4=_0x5b1aaf,_0x411de2=BattleManager['actor']();if(!_0x411de2)this['commandCancel']();else{if(_0x411de2[_0x15d5a4(0x1c5)]()<=0x1)this[_0x15d5a4(0x400)]();else{if(_0x411de2[_0x15d5a4(0x1f0)]>0x0)this[_0x15d5a4(0x400)]();else{if(_0x15d5a4(0x2e9)===_0x15d5a4(0x230)){const _0xd18e01=this[_0x15d5a4(0x36f)](_0x47b6c8);let _0x4c9edb=_0xd18e01['x'],_0x478c92=_0xd18e01['y'];_0x4c9edb+=this[_0x15d5a4(0x3e1)](),_0x478c92+=this[_0x15d5a4(0x38e)]();const _0x2479b3=this[_0x15d5a4(0x417)]();this[_0x15d5a4(0x3cf)](_0x55ee12,_0x4c9edb,_0x478c92,_0xd18e01['width'],_0x2479b3);}else this['reduceBrave']();}}}},Scene_Battle[_0x5b1aaf(0x25e)]['performBrave']=function(){const _0x2ba84e=_0x5b1aaf,_0x1959ed=BattleManager[_0x2ba84e(0x24d)]();if(!_0x1959ed)return;_0x1959ed[_0x2ba84e(0x26d)]();const _0x34bbfe=this[_0x2ba84e(0x39b)][_0x2ba84e(0x449)],_0x3477f8=this[_0x2ba84e(0x39b)][_0x2ba84e(0x2e2)],_0x4d208c=this[_0x2ba84e(0x39b)][_0x2ba84e(0x1e3)]();this[_0x2ba84e(0x39b)][_0x2ba84e(0x34b)](_0x1959ed),this[_0x2ba84e(0x39b)][_0x2ba84e(0x369)](_0x4d208c),this['_actorCommandWindow'][_0x2ba84e(0x449)]=_0x34bbfe,this[_0x2ba84e(0x39b)][_0x2ba84e(0x2e2)]=_0x3477f8;},Scene_Battle[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1d6)]=function(){const _0x52355d=_0x5b1aaf,_0x291d25=BattleManager[_0x52355d(0x24d)]();if(!_0x291d25)return;_0x291d25[_0x52355d(0x3e3)]();const _0x54f60a=this[_0x52355d(0x39b)][_0x52355d(0x449)],_0x576b88=this[_0x52355d(0x39b)]['_scrollY'],_0x13c008=this[_0x52355d(0x39b)]['index']();this[_0x52355d(0x39b)][_0x52355d(0x34b)](_0x291d25),this['_actorCommandWindow'][_0x52355d(0x369)](_0x13c008),this['_actorCommandWindow'][_0x52355d(0x449)]=_0x54f60a,this['_actorCommandWindow'][_0x52355d(0x2e2)]=_0x576b88;},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x3be)]=Scene_Battle[_0x5b1aaf(0x25e)][_0x5b1aaf(0x2c5)],Scene_Battle[_0x5b1aaf(0x25e)]['createAllWindows']=function(){const _0x2ea260=_0x5b1aaf;VisuMZ[_0x2ea260(0x207)][_0x2ea260(0x3be)]['call'](this),this['createBTBTurnOrderWindow']();},Scene_Battle[_0x5b1aaf(0x25e)][_0x5b1aaf(0x40b)]=function(){const _0x36af1b=_0x5b1aaf;if(!BattleManager[_0x36af1b(0x28e)]())return;this[_0x36af1b(0x232)]=new Window_BTB_TurnOrder();const _0x52b906=this[_0x36af1b(0x450)](this[_0x36af1b(0x352)]);this[_0x36af1b(0x3fe)](this[_0x36af1b(0x232)],_0x52b906),this[_0x36af1b(0x2c1)](),BattleManager[_0x36af1b(0x222)](!![]);},Scene_Battle[_0x5b1aaf(0x25e)]['repositionLogWindowBTB']=function(){const _0x43370e=_0x5b1aaf,_0x144d62=Window_BTB_TurnOrder[_0x43370e(0x241)];if(_0x144d62['DisplayPosition']!==_0x43370e(0x322))return;if(!_0x144d62[_0x43370e(0x35b)])return;if(!this[_0x43370e(0x276)])return;const _0x5e36cc=this['_btbTurnOrderWindow']['y']-Math[_0x43370e(0x266)]((Graphics[_0x43370e(0x2f8)]-Graphics[_0x43370e(0x39e)])/0x2),_0x3ee640=_0x5e36cc+this[_0x43370e(0x232)]['height'];this['_logWindow']['y']=_0x3ee640+_0x144d62[_0x43370e(0x402)];};function Sprite_BTB_TurnOrder_Battler(){const _0x2e7ab5=_0x5b1aaf;this[_0x2e7ab5(0x22e)](...arguments);}function _0xf1b5(_0x2a6abc,_0x23d54c){const _0xe17815=_0xe178();return _0xf1b5=function(_0xf1b57e,_0x5808a9){_0xf1b57e=_0xf1b57e-0x1a0;let _0x57ce63=_0xe17815[_0xf1b57e];return _0x57ce63;},_0xf1b5(_0x2a6abc,_0x23d54c);}Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)]=Object[_0x5b1aaf(0x428)](Sprite_Clickable[_0x5b1aaf(0x25e)]),Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x316)]=Sprite_BTB_TurnOrder_Battler,Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x22e)]=function(_0x8410ee,_0x5b7ece){const _0x459722=_0x5b1aaf;this['initMembers'](_0x8410ee,_0x5b7ece),Sprite_Clickable['prototype'][_0x459722(0x22e)][_0x459722(0x2b4)](this),this[_0x459722(0x1f4)]=0x0,this[_0x459722(0x3e9)](),this['checkOpacity']();},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x3cc)]=function(_0x478c82,_0x4ac9b3){const _0xa7b4f6=_0x5b1aaf;this[_0xa7b4f6(0x221)]=_0x478c82,this[_0xa7b4f6(0x1ca)]=_0x4ac9b3;const _0x47f822=Window_BTB_TurnOrder[_0xa7b4f6(0x241)],_0x44f5da=this[_0xa7b4f6(0x357)](),_0xb6fd20=this[_0xa7b4f6(0x2ed)]();this[_0xa7b4f6(0x44c)]=0x0,this[_0xa7b4f6(0x307)]=_0x44f5da?_0x47f822[_0xa7b4f6(0x414)]*_0xb6fd20:0x0,this['_positionTargetY']=_0x44f5da?0x0:_0x47f822[_0xa7b4f6(0x414)]*_0xb6fd20,this[_0xa7b4f6(0x1d2)]=0x0,this[_0xa7b4f6(0x1c0)]=0xff,this[_0xa7b4f6(0x36c)]=![],this[_0xa7b4f6(0x37b)]=![],this[_0xa7b4f6(0x280)]=0x0,this['_containerHeight']=0x0;},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)]['createChildren']=function(){const _0x3f59cb=_0x5b1aaf;this[_0x3f59cb(0x3ed)](),this[_0x3f59cb(0x210)](),this[_0x3f59cb(0x3bd)](),this[_0x3f59cb(0x3db)](),this[_0x3f59cb(0x1dc)]();},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5b1aaf(0x3ed)]=function(){const _0x4bba60=_0x5b1aaf;this['x']=this[_0x4bba60(0x307)],this['y']=this[_0x4bba60(0x209)];},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5b1aaf(0x357)]=function(){const _0x35c70a=_0x5b1aaf,_0x3b83ba=Window_BTB_TurnOrder['Settings'],_0x163dad=[_0x35c70a(0x322),'bottom'][_0x35c70a(0x306)](_0x3b83ba[_0x35c70a(0x1fd)]);return _0x163dad;},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x29b)]=function(){const _0xc7c90f=_0x5b1aaf,_0x271239=Window_BTB_TurnOrder[_0xc7c90f(0x241)];return this[_0xc7c90f(0x357)]()?_0x271239[_0xc7c90f(0x414)]:_0x271239[_0xc7c90f(0x215)];},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)]['bitmapHeight']=function(){const _0x30f343=_0x5b1aaf,_0x498dfa=Window_BTB_TurnOrder[_0x30f343(0x241)];return this['isHorz']()?_0x498dfa[_0x30f343(0x215)]:_0x498dfa[_0x30f343(0x414)];},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5b1aaf(0x24b)]=function(){const _0x5f3cb8=_0x5b1aaf;this['bitmap']=new Bitmap(0x48,0x24);const _0x247b6f=this[_0x5f3cb8(0x3fa)]()?this[_0x5f3cb8(0x3fa)]()[_0x5f3cb8(0x2f3)]():_0x5f3cb8(0x446)[_0x5f3cb8(0x268)](this[_0x5f3cb8(0x221)],this[_0x5f3cb8(0x1ca)]);this[_0x5f3cb8(0x220)][_0x5f3cb8(0x43f)](_0x247b6f,0x0,0x0,0x48,0x24,_0x5f3cb8(0x1eb));},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)]['createBackgroundSprite']=function(){const _0x2ac112=_0x5b1aaf;if(!Window_BTB_TurnOrder[_0x2ac112(0x241)]['ShowMarkerBg'])return;const _0x554da1=Window_BTB_TurnOrder['Settings'],_0x220827=this[_0x2ac112(0x221)]===$gameParty?_0x2ac112(0x347):_0x2ac112(0x326),_0x4a467c=_0x2ac112(0x37f)[_0x2ac112(0x268)](_0x220827),_0x16f051=new Sprite();_0x16f051[_0x2ac112(0x2dd)]['x']=this[_0x2ac112(0x2dd)]['x'],_0x16f051['anchor']['y']=this[_0x2ac112(0x2dd)]['y'];if(_0x554da1[_0x4a467c])_0x2ac112(0x3fb)!==_0x2ac112(0x3fb)?(_0x9e76ec[_0x2ac112(0x207)]['Game_Action_setItem']['call'](this,_0x76ee29),_0x2a33dd[_0x2ac112(0x3a0)]()):_0x16f051[_0x2ac112(0x220)]=ImageManager[_0x2ac112(0x3e5)](_0x554da1[_0x4a467c]);else{const _0x109010=this[_0x2ac112(0x29b)](),_0x3f9b37=this[_0x2ac112(0x264)]();_0x16f051[_0x2ac112(0x220)]=new Bitmap(_0x109010,_0x3f9b37);const _0x4ef28d=ColorManager[_0x2ac112(0x254)](_0x554da1[_0x2ac112(0x224)[_0x2ac112(0x268)](_0x220827)]),_0x4dc32a=ColorManager[_0x2ac112(0x254)](_0x554da1[_0x2ac112(0x1d0)[_0x2ac112(0x268)](_0x220827)]);_0x16f051['bitmap'][_0x2ac112(0x2ef)](0x0,0x0,_0x109010,_0x3f9b37,_0x4ef28d,_0x4dc32a,!![]);}this[_0x2ac112(0x451)]=_0x16f051,this['addChild'](this[_0x2ac112(0x451)]);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5b1aaf(0x3bd)]=function(){const _0x49eeff=_0x5b1aaf,_0x4566e0=new Sprite();_0x4566e0[_0x49eeff(0x2dd)]['x']=this[_0x49eeff(0x2dd)]['x'],_0x4566e0[_0x49eeff(0x2dd)]['y']=this[_0x49eeff(0x2dd)]['y'],this[_0x49eeff(0x43c)]=_0x4566e0,this[_0x49eeff(0x1a5)](this[_0x49eeff(0x43c)]),this[_0x49eeff(0x2af)]();},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)]['createBorderSprite']=function(){const _0x512f3f=_0x5b1aaf;if(!Window_BTB_TurnOrder['Settings']['ShowMarkerBorder'])return;const _0x241532=Window_BTB_TurnOrder[_0x512f3f(0x241)],_0x466ddd=this[_0x512f3f(0x221)]===$gameParty?_0x512f3f(0x347):'Enemy',_0xc5e081=_0x512f3f(0x244)[_0x512f3f(0x268)](_0x466ddd),_0x12dc8d=new Sprite();_0x12dc8d['anchor']['x']=this[_0x512f3f(0x2dd)]['x'],_0x12dc8d[_0x512f3f(0x2dd)]['y']=this[_0x512f3f(0x2dd)]['y'];if(_0x241532[_0xc5e081])_0x12dc8d['bitmap']=ImageManager[_0x512f3f(0x3e5)](_0x241532[_0xc5e081]);else{if(_0x512f3f(0x448)==='ZmLfP'){let _0x49dff2=this[_0x512f3f(0x29b)](),_0x56880b=this['bitmapHeight'](),_0x5853af=_0x241532[_0x512f3f(0x258)];_0x12dc8d['bitmap']=new Bitmap(_0x49dff2,_0x56880b);const _0x214a90=_0x512f3f(0x379),_0x433af7=ColorManager['getColor'](_0x241532[_0x512f3f(0x439)[_0x512f3f(0x268)](_0x466ddd)]);_0x12dc8d[_0x512f3f(0x220)][_0x512f3f(0x1e0)](0x0,0x0,_0x49dff2,_0x56880b,_0x214a90),_0x49dff2-=0x2,_0x56880b-=0x2,_0x12dc8d[_0x512f3f(0x220)][_0x512f3f(0x1e0)](0x1,0x1,_0x49dff2,_0x56880b,_0x433af7),_0x49dff2-=_0x5853af*0x2,_0x56880b-=_0x5853af*0x2,_0x12dc8d['bitmap'][_0x512f3f(0x1e0)](0x1+_0x5853af,0x1+_0x5853af,_0x49dff2,_0x56880b,_0x214a90),_0x49dff2-=0x2,_0x56880b-=0x2,_0x5853af+=0x1,_0x12dc8d[_0x512f3f(0x220)][_0x512f3f(0x415)](0x1+_0x5853af,0x1+_0x5853af,_0x49dff2,_0x56880b);}else _0x10293a['drawText'](this['_letter'][_0x512f3f(0x463)](),0x0,_0x1949d0/0x2,_0x3d853b,_0x1b6965/0x2,_0x512f3f(0x1eb));}this[_0x512f3f(0x451)]=_0x12dc8d,this[_0x512f3f(0x1a5)](this['_backgroundSprite']),this[_0x512f3f(0x38f)]=this[_0x512f3f(0x451)]['width'],this[_0x512f3f(0x2f8)]=this['_backgroundSprite'][_0x512f3f(0x2f8)];},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1dc)]=function(){const _0x592070=_0x5b1aaf,_0x32a523=Window_BTB_TurnOrder[_0x592070(0x241)];if(!_0x32a523['EnemyBattlerDrawLetter'])return;if(this['_unit']===$gameParty)return;const _0x37a328=this[_0x592070(0x29b)](),_0x39d9c9=this[_0x592070(0x264)](),_0x2f811a=new Sprite();_0x2f811a[_0x592070(0x2dd)]['x']=this[_0x592070(0x2dd)]['x'],_0x2f811a[_0x592070(0x2dd)]['y']=this['anchor']['y'],_0x2f811a[_0x592070(0x220)]=new Bitmap(_0x37a328,_0x39d9c9),this[_0x592070(0x34e)]=_0x2f811a,this['addChild'](this[_0x592070(0x34e)]);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5b1aaf(0x3fa)]=function(){const _0xd570bd=_0x5b1aaf;return this[_0xd570bd(0x221)]?this[_0xd570bd(0x221)][_0xd570bd(0x26c)]()[this['_index']]:null;},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x250)]=function(){const _0x46620d=_0x5b1aaf;Sprite_Clickable['prototype'][_0x46620d(0x250)][_0x46620d(0x2b4)](this),this[_0x46620d(0x253)](),this['updatePosition'](),this[_0x46620d(0x376)](),this[_0x46620d(0x34a)](),this[_0x46620d(0x3de)](),this['updateGraphicHue'](),this[_0x46620d(0x395)](),this['updateSelectionEffect']();},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5b1aaf(0x253)]=function(){const _0x2b0c66=_0x5b1aaf,_0x36d316=this['containerPosition']();if(this['_position']===_0x36d316)return;this[_0x2b0c66(0x20d)]=_0x36d316;this['opacity']<0xff&&this['battler']()&&_0x36d316!==this[_0x2b0c66(0x2ed)]()&&this[_0x2b0c66(0x329)](0xff);if(_0x36d316===this[_0x2b0c66(0x2ed)]()&&this[_0x2b0c66(0x1d2)]<=0x0&&this['opacity']>0x0)this[_0x2b0c66(0x329)](0x0);else{if(this[_0x2b0c66(0x1d2)]<=0x0&&this['opacity']<0xff){if(_0x2b0c66(0x382)===_0x2b0c66(0x382))this[_0x2b0c66(0x376)]();else{const _0xd11e5e=this[_0x2b0c66(0x3f9)]();if(!_0xd11e5e)return;let _0x3c1d96=![];if(this['_containerWidth']!==_0xd11e5e['width'])_0x3c1d96=!![];else this[_0x2b0c66(0x27b)]!==_0xd11e5e['height']&&(_0x3c1d96=!![]);_0x3c1d96&&this[_0x2b0c66(0x300)]();}}}this[_0x2b0c66(0x300)]();},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5b1aaf(0x467)]=function(){const _0x49cde5=_0x5b1aaf,_0x112b00=this['containerWindow']();if(!_0x112b00)return;let _0x236458=![];if(this['_containerWidth']!==_0x112b00[_0x49cde5(0x38f)])_0x236458=!![];else this[_0x49cde5(0x27b)]!==_0x112b00[_0x49cde5(0x2f8)]&&(_0x236458=!![]);_0x236458&&(_0x49cde5(0x447)===_0x49cde5(0x323)?(_0x7e77b8[_0x49cde5(0x2fd)](_0x1021cd+'-'+_0x29485a[_0x11a836]),_0x236338(_0x81a479+'-'+_0x598a0d[_0x3c4f0d],_0x20a2e2[_0x49cde5(0x290)](_0x3c19ae+0x1))):this[_0x49cde5(0x300)]());},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x300)]=function(){const _0x4b484d=_0x5b1aaf,_0x16c794=Window_BTB_TurnOrder[_0x4b484d(0x241)],_0x4ca627=this[_0x4b484d(0x357)](),_0x434f7c=_0x16c794['OrderDirection'],_0x301ec3=_0x16c794[_0x4b484d(0x36b)],_0x20cb4f=SceneManager[_0x4b484d(0x36a)]['_btbTurnOrderWindow'];if(!_0x20cb4f)return;const _0x4c7e77=this['containerPosition']();this[_0x4b484d(0x44c)]=_0x16c794[_0x4b484d(0x43b)],this[_0x4b484d(0x307)]=_0x4ca627?_0x16c794[_0x4b484d(0x414)]*_0x4c7e77:0x0,this[_0x4b484d(0x209)]=_0x4ca627?0x0:_0x16c794[_0x4b484d(0x414)]*_0x4c7e77;_0x4c7e77>0x0&&(this[_0x4b484d(0x307)]+=_0x4ca627?_0x301ec3:0x0,this[_0x4b484d(0x209)]+=_0x4ca627?0x0:_0x301ec3);if(_0x434f7c){if(_0x4b484d(0x405)==='ATRTh')this[_0x4b484d(0x307)]=_0x4ca627?_0x20cb4f['width']-this[_0x4b484d(0x307)]-_0x16c794[_0x4b484d(0x414)]:0x0;else{const _0x4960b0=_0x4b484d(0x3b3),_0x483eba=_0x5ee251[_0x4b484d(0x298)[_0x4b484d(0x268)](_0x4960b0)],_0x13b696=_0x19cb87[_0x4b484d(0x3f0)['format'](_0x4960b0)],_0x4d2b7b=_0x150fb5[_0x4b484d(0x466)[_0x4b484d(0x268)](_0x4960b0)];_0x5238e8['requestFauxAnimation']([this],_0x483eba,_0x13b696,_0x4d2b7b);}}else this[_0x4b484d(0x209)]=_0x4ca627?0x0:_0x20cb4f[_0x4b484d(0x2f8)]-this[_0x4b484d(0x209)]-_0x16c794[_0x4b484d(0x414)];},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x2fe)]=function(){const _0x134906=_0x5b1aaf;if(this['_fadeDuration']>0x0)return;if(this[_0x134906(0x44c)]>0x0){const _0x4fbf8a=this[_0x134906(0x44c)];this['x']=(this['x']*(_0x4fbf8a-0x1)+this['_positionTargetX'])/_0x4fbf8a,this['y']=(this['y']*(_0x4fbf8a-0x1)+this[_0x134906(0x209)])/_0x4fbf8a,this['_positionDuration']--;}if(this[_0x134906(0x44c)]<=0x0){this['x']=this['_positionTargetX'],this['y']=this[_0x134906(0x209)];if(this[_0x134906(0x1f4)]<0xff&&!this[_0x134906(0x365)]&&this[_0x134906(0x1d2)]<=0x0){const _0xa265e6=this[_0x134906(0x3fa)]();_0xa265e6&&(this[_0x134906(0x1c0)]=_0xa265e6[_0x134906(0x30e)]()&&_0xa265e6['isAppeared']()?0xff:0x0);}}},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x2ed)]=function(){const _0x37163a=_0x5b1aaf,_0x2d16cf=Window_BTB_TurnOrder[_0x37163a(0x241)],_0x5a8f1a=this['isHorz']()?_0x2d16cf[_0x37163a(0x227)]:_0x2d16cf['MaxVertSprites'];return _0x5a8f1a+0x1;},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x3f9)]=function(){const _0x1d9b4b=_0x5b1aaf;return SceneManager[_0x1d9b4b(0x36a)][_0x1d9b4b(0x232)];},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x433)]=function(){const _0x2d17bc=_0x5b1aaf,_0x548bf3=this[_0x2d17bc(0x3fa)]();if(!_0x548bf3)return this[_0x2d17bc(0x2ed)]();if(_0x548bf3===BattleManager[_0x2d17bc(0x2ff)])return _0x2d17bc(0x2a0)==='Ulfjv'?_0x4f93d7[_0x2d17bc(0x433)]()-_0x5a04a5[_0x2d17bc(0x433)]():0x0;if(BattleManager['_actionBattlers']['includes'](_0x548bf3)){const _0x39fb17=BattleManager['_actionBattlers'][_0x2d17bc(0x3b0)](_0x548bf3)+0x1;return _0x39fb17;}return this[_0x2d17bc(0x2ed)]();},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)]['startFade']=function(_0x324072){const _0x53ca78=_0x5b1aaf,_0x465e21=Window_BTB_TurnOrder[_0x53ca78(0x241)];this[_0x53ca78(0x1d2)]=_0x465e21[_0x53ca78(0x43b)],this[_0x53ca78(0x1c0)]=_0x324072;},Sprite_BTB_TurnOrder_Battler['prototype']['checkOpacity']=function(){const _0x4e87fc=_0x5b1aaf,_0x5d7d47=this[_0x4e87fc(0x3fa)]();if(!_0x5d7d47)return;if(this[_0x4e87fc(0x36c)]===_0x5d7d47[_0x4e87fc(0x30e)]()&&this[_0x4e87fc(0x37b)]===_0x5d7d47[_0x4e87fc(0x3bb)]())return;this['_isAlive']=_0x5d7d47['isAlive'](),this[_0x4e87fc(0x37b)]=_0x5d7d47[_0x4e87fc(0x3bb)]();let _0x16bbd8=this['_isAlive']&&this[_0x4e87fc(0x37b)]?0xff:0x0;this[_0x4e87fc(0x329)](_0x16bbd8);},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x34a)]=function(){const _0x169aef=_0x5b1aaf;if(this['_fadeDuration']>0x0){const _0x193f09=this['_fadeDuration'];this[_0x169aef(0x1f4)]=(this[_0x169aef(0x1f4)]*(_0x193f09-0x1)+this[_0x169aef(0x1c0)])/_0x193f09,this[_0x169aef(0x1d2)]--,this['_fadeDuration']<=0x0&&(this[_0x169aef(0x253)](),this[_0x169aef(0x44c)]=0x0,this[_0x169aef(0x2fe)](),this[_0x169aef(0x1f4)]=this[_0x169aef(0x1c0)]);}if(this[_0x169aef(0x365)])return;BattleManager[_0x169aef(0x270)]===_0x169aef(0x278)&&(this[_0x169aef(0x365)]=!![],this[_0x169aef(0x329)](0x0));},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x3de)]=function(){const _0x555939=_0x5b1aaf,_0x20dc91=this[_0x555939(0x3fa)]();if(!_0x20dc91)return;const _0x264f56=Window_BTB_TurnOrder[_0x555939(0x241)],_0x1adca5=this[_0x555939(0x221)]===$gameParty?_0x555939(0x347):_0x555939(0x326);let _0x59c623=_0x20dc91[_0x555939(0x26a)]();if(_0x20dc91[_0x555939(0x35f)]()&&_0x59c623===_0x555939(0x38c))'AgTjz'===_0x555939(0x35d)?_0x59c623=_0x555939(0x2b0):(_0x5be8bf['BattleSystemBTB'][_0x555939(0x31a)][_0x555939(0x2b4)](this),this['createActorCommandWindowBTB']());else _0x20dc91[_0x555939(0x23b)]()&&_0x59c623===_0x555939(0x1db)&&(_0x555939(0x3ad)==='TEcQg'?this['updateTurnOrderBTB']():_0x59c623=_0x555939(0x38c));if(this[_0x555939(0x377)]!==_0x59c623)return _0x555939(0x1e1)!==_0x555939(0x1e1)?(_0x1688e2=_0x286cdf[_0x555939(0x207)][_0x555939(0x2a9)][_0x555939(0x2b4)](this,_0x16cd56,_0x294fe5,_0xe22bc5),_0x25256c=this['makeAdditionalCostTextBTB'](_0x40d027,_0x29b026,_0x320f25),_0x3097cc):this[_0x555939(0x2af)]();switch(this[_0x555939(0x377)]){case'face':if(this['_graphicFaceName']!==_0x20dc91[_0x555939(0x32b)]())return this['processUpdateGraphic']();if(this['_graphicFaceIndex']!==_0x20dc91['TurnOrderBTBGraphicFaceIndex']())return this['processUpdateGraphic']();break;case _0x555939(0x27d):if(this[_0x555939(0x302)]!==_0x20dc91[_0x555939(0x1a6)]())return this[_0x555939(0x2af)]();break;case _0x555939(0x38c):if(_0x20dc91[_0x555939(0x443)]()){if(this['_graphicSv']!==_0x20dc91[_0x555939(0x37e)]()){if(_0x555939(0x41e)===_0x555939(0x295)){if(!_0x5d7bb3[_0x555939(0x28e)]())return;if(!_0x54d6ca[_0x555939(0x381)]())return;this[_0x555939(0x2aa)]();}else return this[_0x555939(0x2af)]();}}else{if(this['_graphicEnemy']!==_0x20dc91['battlerName']())return this['processUpdateGraphic']();}break;case'svactor':if(_0x20dc91[_0x555939(0x35f)]()){if(this['_graphicSv']!==_0x20dc91[_0x555939(0x37a)]())return _0x555939(0x2fa)===_0x555939(0x2fa)?this[_0x555939(0x2af)]():this[_0x555939(0x2af)]();}else{if(this[_0x555939(0x1a4)]!==_0x20dc91[_0x555939(0x37a)]())return this[_0x555939(0x2af)]();}break;}},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x2af)]=function(){const _0x1d37bb=_0x5b1aaf,_0x43f50a=this[_0x1d37bb(0x3fa)]();if(!_0x43f50a)return;this[_0x1d37bb(0x377)]=_0x43f50a['TurnOrderBTBGraphicType']();if(_0x43f50a[_0x1d37bb(0x35f)]()&&this[_0x1d37bb(0x377)]==='enemy')this[_0x1d37bb(0x377)]='face';else _0x43f50a[_0x1d37bb(0x23b)]()&&this['_graphicType']==='svactor'&&(this['_graphicType']=_0x1d37bb(0x38c));let _0x2cbdf2;switch(this[_0x1d37bb(0x377)]){case _0x1d37bb(0x2b0):this[_0x1d37bb(0x385)]=_0x43f50a[_0x1d37bb(0x32b)](),this[_0x1d37bb(0x399)]=_0x43f50a[_0x1d37bb(0x1c4)](),_0x2cbdf2=ImageManager[_0x1d37bb(0x2b1)](this[_0x1d37bb(0x385)]),_0x2cbdf2[_0x1d37bb(0x1d8)](this[_0x1d37bb(0x3ca)][_0x1d37bb(0x1ae)](this,_0x2cbdf2));break;case _0x1d37bb(0x27d):this[_0x1d37bb(0x302)]=_0x43f50a[_0x1d37bb(0x1b9)](),_0x2cbdf2=ImageManager[_0x1d37bb(0x3e5)](_0x1d37bb(0x3d9)),_0x2cbdf2[_0x1d37bb(0x1d8)](this[_0x1d37bb(0x23d)]['bind'](this,_0x2cbdf2));break;case _0x1d37bb(0x38c):if(_0x43f50a[_0x1d37bb(0x443)]()){if(_0x1d37bb(0x3a7)==='zVheJ')this[_0x1d37bb(0x40c)]=_0x43f50a[_0x1d37bb(0x37e)](),_0x2cbdf2=ImageManager[_0x1d37bb(0x42a)](this[_0x1d37bb(0x40c)]),_0x2cbdf2['addLoadListener'](this['changeSvActorGraphicBitmap'][_0x1d37bb(0x1ae)](this,_0x2cbdf2));else{const _0x59859b=_0x4ea2f7[_0x1d37bb(0x207)]['RegExp'][_0x3c9f14],_0x189a32=_0x358403[_0x1d37bb(0x226)];if(_0x189a32[_0x1d37bb(0x1fe)](_0x59859b)){const _0x57ddda=_0x2137aa(_0x3ebab2['$1']),_0x171e69=_0x1d37bb(0x27f)['format'](_0x57ddda),_0x3f63e1=_0x1524b1[_0x1d37bb(0x207)][_0x1d37bb(0x1bd)](_0x5071d7,_0x1f7856);_0x27226a[_0x1d37bb(0x207)]['JS'][_0x3f63e1]=new _0x3397b3(_0x171e69);}}}else{if($gameSystem[_0x1d37bb(0x30a)]()){if(_0x1d37bb(0x32a)!==_0x1d37bb(0x32a)){if(this['isBTB']())return!![];return _0xfc42c4[_0x1d37bb(0x207)][_0x1d37bb(0x420)][_0x1d37bb(0x2b4)](this);}else this[_0x1d37bb(0x1a4)]=_0x43f50a['battlerName'](),_0x2cbdf2=ImageManager[_0x1d37bb(0x3c2)](this[_0x1d37bb(0x1a4)]),_0x2cbdf2[_0x1d37bb(0x1d8)](this[_0x1d37bb(0x3bf)][_0x1d37bb(0x1ae)](this,_0x2cbdf2));}else _0x1d37bb(0x432)===_0x1d37bb(0x432)?(this[_0x1d37bb(0x1a4)]=_0x43f50a['battlerName'](),_0x2cbdf2=ImageManager['loadEnemy'](this[_0x1d37bb(0x1a4)]),_0x2cbdf2[_0x1d37bb(0x1d8)](this[_0x1d37bb(0x3bf)][_0x1d37bb(0x1ae)](this,_0x2cbdf2))):this[_0x1d37bb(0x233)]()?this['_actor']&&!this['_actor']['hideBraveTrait']()&&this[_0x1d37bb(0x2b7)][_0x1d37bb(0x1c5)]()>0x1&&_0x217bc6['_scene'][_0x1d37bb(0x1d6)]():_0x26e30e['BattleSystemBTB'][_0x1d37bb(0x3d4)][_0x1d37bb(0x2b4)](this);}break;case _0x1d37bb(0x1db):this[_0x1d37bb(0x40c)]=_0x43f50a[_0x1d37bb(0x37a)](),_0x2cbdf2=ImageManager[_0x1d37bb(0x42a)](this['_graphicSv']),_0x2cbdf2[_0x1d37bb(0x1d8)](this[_0x1d37bb(0x346)][_0x1d37bb(0x1ae)](this,_0x2cbdf2));break;}},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x3ca)]=function(_0x490e94){const _0x509fb9=_0x5b1aaf,_0x8a79be=this[_0x509fb9(0x399)],_0x1b7813=this[_0x509fb9(0x29b)](),_0x3322a1=this['bitmapHeight'](),_0x38839a=Math['max'](_0x1b7813,_0x3322a1);this[_0x509fb9(0x43c)][_0x509fb9(0x220)]=new Bitmap(_0x1b7813,_0x3322a1);const _0x1774f0=this[_0x509fb9(0x43c)]['bitmap'],_0x5f27f4=ImageManager['faceWidth'],_0x478b9f=ImageManager['faceHeight'],_0x39bdf6=_0x38839a/Math['max'](_0x5f27f4,_0x478b9f),_0xbf4fde=ImageManager[_0x509fb9(0x3f1)],_0x1e5379=ImageManager[_0x509fb9(0x412)],_0x28f806=_0x8a79be%0x4*_0x5f27f4+(_0x5f27f4-_0xbf4fde)/0x2,_0x38ea7b=Math[_0x509fb9(0x337)](_0x8a79be/0x4)*_0x478b9f+(_0x478b9f-_0x1e5379)/0x2,_0x3528a7=(_0x1b7813-_0x5f27f4*_0x39bdf6)/0x2,_0x3e7d7f=(_0x3322a1-_0x478b9f*_0x39bdf6)/0x2;_0x1774f0[_0x509fb9(0x29d)](_0x490e94,_0x28f806,_0x38ea7b,_0xbf4fde,_0x1e5379,_0x3528a7,_0x3e7d7f,_0x38839a,_0x38839a);},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x23d)]=function(_0x25ff45){const _0x31df55=_0x5b1aaf,_0x58ee14=this[_0x31df55(0x302)],_0x5bb61a=this[_0x31df55(0x29b)](),_0x2b5ae7=this['bitmapHeight']();this[_0x31df55(0x43c)][_0x31df55(0x220)]=new Bitmap(_0x5bb61a,_0x2b5ae7);const _0x46b8f4=this[_0x31df55(0x43c)][_0x31df55(0x220)],_0x356b07=ImageManager[_0x31df55(0x3c8)],_0x4f506f=ImageManager[_0x31df55(0x2d6)],_0x55f7fb=Math[_0x31df55(0x2cc)](_0x356b07,_0x4f506f,_0x5bb61a,_0x2b5ae7),_0x795484=_0x58ee14%0x10*_0x356b07,_0x2beb49=Math[_0x31df55(0x337)](_0x58ee14/0x10)*_0x4f506f,_0xe1eea1=Math[_0x31df55(0x337)](Math[_0x31df55(0x317)](_0x5bb61a-_0x55f7fb,0x0)/0x2),_0x1fa70e=Math[_0x31df55(0x337)](Math['max'](_0x2b5ae7-_0x55f7fb,0x0)/0x2);_0x46b8f4['blt'](_0x25ff45,_0x795484,_0x2beb49,_0x356b07,_0x4f506f,_0xe1eea1,_0x1fa70e,_0x55f7fb,_0x55f7fb);},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x346)]=function(_0x1cd036){const _0x465de2=_0x5b1aaf,_0x3eeae3=this[_0x465de2(0x29b)](),_0x54b896=this[_0x465de2(0x264)](),_0x29af1b=Math[_0x465de2(0x2cc)](_0x3eeae3,_0x54b896);this['_graphicSprite'][_0x465de2(0x220)]=new Bitmap(_0x3eeae3,_0x54b896);const _0x2fb3b8=this[_0x465de2(0x43c)][_0x465de2(0x220)],_0x40e145=this[_0x465de2(0x40c)][_0x465de2(0x1fe)](/\$/i),_0x262b07=_0x40e145?0x1:ImageManager['svActorHorzCells'],_0x33bfac=_0x40e145?0x1:ImageManager[_0x465de2(0x3a6)],_0x4e0434=_0x1cd036[_0x465de2(0x38f)]/_0x262b07,_0x512afc=_0x1cd036['height']/_0x33bfac,_0x2c3ce7=Math[_0x465de2(0x2cc)](0x1,_0x29af1b/_0x4e0434,_0x29af1b/_0x512afc),_0x4ba8ff=_0x4e0434*_0x2c3ce7,_0x4518a0=_0x512afc*_0x2c3ce7,_0x4ab255=Math[_0x465de2(0x266)]((_0x3eeae3-_0x4ba8ff)/0x2),_0x1051d9=Math[_0x465de2(0x266)]((_0x54b896-_0x4518a0)/0x2);_0x2fb3b8[_0x465de2(0x29d)](_0x1cd036,0x0,0x0,_0x4e0434,_0x512afc,_0x4ab255,_0x1051d9,_0x4ba8ff,_0x4518a0);},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x3bf)]=function(_0x2a0013){const _0x17563c=_0x5b1aaf,_0x3c58ac=Window_BTB_TurnOrder['Settings'],_0x4bb338=this[_0x17563c(0x29b)](),_0x334e33=this[_0x17563c(0x264)](),_0x12c062=Math[_0x17563c(0x2cc)](_0x4bb338,_0x334e33);this['_graphicSprite'][_0x17563c(0x220)]=new Bitmap(_0x4bb338,_0x334e33);const _0x28b0fa=this[_0x17563c(0x43c)][_0x17563c(0x220)],_0x43e0c8=Math[_0x17563c(0x2cc)](0x1,_0x12c062/_0x2a0013[_0x17563c(0x38f)],_0x12c062/_0x2a0013[_0x17563c(0x2f8)]),_0x45b71c=_0x2a0013[_0x17563c(0x38f)]*_0x43e0c8,_0x4cc75a=_0x2a0013[_0x17563c(0x2f8)]*_0x43e0c8,_0x4ec5ae=Math[_0x17563c(0x266)]((_0x4bb338-_0x45b71c)/0x2),_0x4303cb=Math[_0x17563c(0x266)]((_0x334e33-_0x4cc75a)/0x2);_0x28b0fa['blt'](_0x2a0013,0x0,0x0,_0x2a0013[_0x17563c(0x38f)],_0x2a0013[_0x17563c(0x2f8)],_0x4ec5ae,_0x4303cb,_0x45b71c,_0x4cc75a);},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x3f8)]=function(){const _0x2b9bcf=_0x5b1aaf,_0x16e103=this['battler']();if(!_0x16e103)return;if(!_0x16e103[_0x2b9bcf(0x23b)]())return;if(this[_0x2b9bcf(0x249)]===_0x16e103[_0x2b9bcf(0x201)]())return;this[_0x2b9bcf(0x249)]=_0x16e103[_0x2b9bcf(0x201)](),this[_0x2b9bcf(0x43c)][_0x2b9bcf(0x383)](_0x16e103[_0x2b9bcf(0x443)]()?0x0:this[_0x2b9bcf(0x249)]);},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)][_0x5b1aaf(0x395)]=function(){const _0x438318=_0x5b1aaf;if(!this[_0x438318(0x34e)])return;const _0x39af4f=this[_0x438318(0x3fa)]();if(!_0x39af4f)return;if(this[_0x438318(0x411)]===_0x39af4f['_letter']&&this[_0x438318(0x1b5)]===_0x39af4f[_0x438318(0x1b5)])return;this[_0x438318(0x411)]=_0x39af4f[_0x438318(0x411)],this[_0x438318(0x1b5)]=_0x39af4f[_0x438318(0x1b5)];const _0x58d86d=Window_BTB_TurnOrder[_0x438318(0x241)],_0x415d39=this['isHorz'](),_0x270a0b=this[_0x438318(0x29b)](),_0x31176e=this[_0x438318(0x264)](),_0x20d587=this[_0x438318(0x34e)][_0x438318(0x220)];_0x20d587['clear']();if(!this[_0x438318(0x1b5)])return;_0x20d587['fontFace']=_0x58d86d[_0x438318(0x313)]||$gameSystem[_0x438318(0x386)](),_0x20d587[_0x438318(0x303)]=_0x58d86d[_0x438318(0x1cf)]||0x10,_0x415d39?_0x20d587['drawText'](this['_letter'][_0x438318(0x463)](),0x0,_0x31176e/0x2,_0x270a0b,_0x31176e/0x2,_0x438318(0x1eb)):_0x20d587[_0x438318(0x43f)](this['_letter'][_0x438318(0x463)](),0x0,0x2,_0x270a0b-0x8,_0x31176e-0x4,_0x438318(0x2a6));},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5b1aaf(0x328)]=function(){const _0x5bdb8b=_0x5b1aaf,_0x2fbd25=this[_0x5bdb8b(0x3fa)]();if(!_0x2fbd25)return;const _0x211bb1=_0x2fbd25['battler']();if(!_0x211bb1)return;const _0x3a1856=_0x211bb1[_0x5bdb8b(0x27e)]();if(!_0x3a1856)return;this[_0x5bdb8b(0x2f2)](_0x3a1856[_0x5bdb8b(0x456)]);},Sprite_BTB_TurnOrder_Battler[_0x5b1aaf(0x25e)]['getStateTooltipBattler']=function(){const _0x39eb1c=_0x5b1aaf;return this[_0x39eb1c(0x3fa)]();},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x2a9)]=Window_Base['prototype'][_0x5b1aaf(0x1e6)],Window_Base['prototype']['makeAdditionalSkillCostText']=function(_0x1a4541,_0x53fc47,_0x52c578){const _0x378562=_0x5b1aaf;return _0x52c578=VisuMZ[_0x378562(0x207)]['Window_Base_makeAdditionalSkillCostText'][_0x378562(0x2b4)](this,_0x1a4541,_0x53fc47,_0x52c578),_0x52c578=this[_0x378562(0x288)](_0x1a4541,_0x53fc47,_0x52c578),_0x52c578;},VisuMZ['BattleSystemBTB'][_0x5b1aaf(0x1a0)]=Window_Base[_0x5b1aaf(0x25e)][_0x5b1aaf(0x2a1)],Window_Base['prototype']['drawItemNumber']=function(_0x4a6973,_0x384cd7,_0x4f281f,_0x4e80fb){const _0x60882f=_0x5b1aaf;if(BattleManager[_0x60882f(0x28e)]()&&this[_0x60882f(0x316)]===Window_BattleItem){if(_0x60882f(0x27c)!==_0x60882f(0x46a))this[_0x60882f(0x348)](_0x4a6973,_0x384cd7,_0x4f281f,_0x4e80fb);else{if(!_0xd5d0cb[_0x60882f(0x25e)][_0x60882f(0x1c3)][_0x60882f(0x2b4)](this,_0x12d3aa,_0x1fa6d4))return![];if(_0x417a58[_0x60882f(0x3c0)]()&&_0x31b3ea[_0x60882f(0x3c0)]()){if(_0x2f3261['isForFriend']()!==_0xbf39c7['isForFriend']())return![];if(_0x4ccbee[_0x60882f(0x3d7)]!==_0x21369a[_0x60882f(0x3d7)])return![];}return!![];}}else VisuMZ[_0x60882f(0x207)]['Window_Base_drawItemNumber']['call'](this,_0x4a6973,_0x384cd7,_0x4f281f,_0x4e80fb);this[_0x60882f(0x340)]();},Window_Base[_0x5b1aaf(0x25e)][_0x5b1aaf(0x348)]=function(_0x253e0b,_0x17215c,_0x525148,_0x4d1042){const _0x31dd69=_0x5b1aaf,_0x55c857=VisuMZ[_0x31dd69(0x207)][_0x31dd69(0x241)][_0x31dd69(0x214)],_0x318e69=BattleManager[_0x31dd69(0x2b7)]||$gameParty[_0x31dd69(0x26c)]()[0x0],_0x24da1e=this['makeAdditionalCostTextBTB'](_0x318e69,_0x253e0b,''),_0x48cf3c=this[_0x31dd69(0x3f6)](_0x24da1e)[_0x31dd69(0x38f)],_0x57588a=_0x55c857['CostPosition'];let _0x502cba=_0x17215c+_0x4d1042-_0x48cf3c;if(_0x24da1e==='')VisuMZ[_0x31dd69(0x207)][_0x31dd69(0x1a0)]['call'](this,_0x253e0b,_0x17215c,_0x525148,_0x4d1042);else{if(this[_0x31dd69(0x462)](_0x253e0b)){if(_0x31dd69(0x1f5)===_0x31dd69(0x1f5)){this[_0x31dd69(0x340)]();const _0x435da2=VisuMZ[_0x31dd69(0x297)]['Settings'][_0x31dd69(0x2a4)];this['contents'][_0x31dd69(0x303)]=_0x435da2[_0x31dd69(0x2b8)];if(_0x57588a){const _0x2d5cba=_0x435da2[_0x31dd69(0x45d)],_0x4b65d8=_0x2d5cba['format']($gameParty[_0x31dd69(0x34c)](_0x253e0b)),_0x2f5429=this[_0x31dd69(0x27a)](_0x4b65d8+this['skillCostSeparator']());_0x502cba-=_0x2f5429;}else _0x31dd69(0x325)!=='zdApU'?_0x4d1042-=this[_0x31dd69(0x27a)](this[_0x31dd69(0x283)]())+_0x48cf3c:(this['initMembers'](_0x463092,_0x5c2d5d),_0x57ea8a['prototype'][_0x31dd69(0x22e)][_0x31dd69(0x2b4)](this),this[_0x31dd69(0x1f4)]=0x0,this[_0x31dd69(0x3e9)](),this[_0x31dd69(0x376)]());VisuMZ[_0x31dd69(0x207)][_0x31dd69(0x1a0)]['call'](this,_0x253e0b,_0x17215c,_0x525148,_0x4d1042);}else{if(_0x17b1a4[_0x31dd69(0x1bd)])return _0x4d6aea[_0x31dd69(0x1bd)](_0x589e32,_0x451a6b);let _0x5693e5='';if(_0x255ebd[_0x31dd69(0x306)](_0x1cb66d))_0x5693e5=_0x31dd69(0x31d)['format'](_0x54718d['id'],_0x21ea49);if(_0x261e3d[_0x31dd69(0x306)](_0x1b03f1))_0x5693e5=_0x31dd69(0x389)[_0x31dd69(0x268)](_0x5f2acf['id'],_0x459436);if(_0x27078a[_0x31dd69(0x306)](_0x710a95))_0x5693e5=_0x31dd69(0x21a)['format'](_0x14edd6['id'],_0x185533);if(_0x3ace81[_0x31dd69(0x306)](_0x1d693e))_0x5693e5=_0x31dd69(0x29c)['format'](_0x3b7a4b['id'],_0x5b329c);if(_0x4ddca7[_0x31dd69(0x306)](_0x50b4da))_0x5693e5='Weapon-%1-%2'[_0x31dd69(0x268)](_0x237078['id'],_0x5e4121);if(_0xd47c61['includes'](_0xad0cf7))_0x5693e5=_0x31dd69(0x274)[_0x31dd69(0x268)](_0x5ef08b['id'],_0x5e2b0b);if(_0x4c2b3c['includes'](_0xc709d7))_0x5693e5=_0x31dd69(0x3dd)['format'](_0x46aadd['id'],_0x59a801);if(_0x3a8738['includes'](_0x14e999))_0x5693e5='State-%1-%2'[_0x31dd69(0x268)](_0x474446['id'],_0xebffe6);return _0x5693e5;}}}this[_0x31dd69(0x2d7)](_0x24da1e,_0x502cba,_0x525148);},Window_Base[_0x5b1aaf(0x25e)]['makeAdditionalCostTextBTB']=function(_0xf76fde,_0x187ac8,_0x54e7a0){const _0x3a82cc=_0x5b1aaf;if(!BattleManager[_0x3a82cc(0x28e)]())return _0x54e7a0;if(!_0xf76fde)return _0x54e7a0;if(!_0x187ac8)return _0x54e7a0;if(_0x187ac8[_0x3a82cc(0x226)]['match'](VisuMZ[_0x3a82cc(0x207)][_0x3a82cc(0x30f)]['HideBravePointCost']))return _0x54e7a0;let _0x16f8f8=_0xf76fde[_0x3a82cc(0x2f1)](_0x187ac8);const _0x151a82=VisuMZ[_0x3a82cc(0x207)]['Settings'][_0x3a82cc(0x214)],_0x597e28=_0x151a82[_0x3a82cc(0x392)],_0x27b7d5=_0x151a82[_0x3a82cc(0x3a9)],_0x286caf=_0x151a82[_0x3a82cc(0x435)],_0xd08d9c=_0x151a82[_0x3a82cc(0x421)]||0x0,_0x314244=_0x151a82[_0x3a82cc(0x408)],_0x486416=_0x151a82['Show_1_BP_Cost'];if(DataManager['isSkill'](_0x187ac8)&&this[_0x3a82cc(0x316)]===Window_ActorCommand){if(!_0x27b7d5&&_0x187ac8['id']===_0xf76fde[_0x3a82cc(0x327)]())return _0x54e7a0;if(!_0x286caf&&_0x187ac8['id']===_0xf76fde[_0x3a82cc(0x284)]())return _0x54e7a0;}_0x16f8f8-=_0xd08d9c;if(_0x16f8f8<0x0)return _0x54e7a0;if(!_0x314244&&_0x16f8f8===0x0)return _0x54e7a0;if(!_0x486416&&_0x16f8f8===0x1)return _0x54e7a0;const _0x342a9e=_0x3a82cc(0x321)[_0x3a82cc(0x268)](ImageManager[_0x3a82cc(0x1ef)]),_0x3e578b=TextManager['btbBravePointsAbbr'];let _0x1a7703=TextManager[_0x3a82cc(0x2c4)][_0x3a82cc(0x268)](_0x16f8f8,_0x3e578b,_0x342a9e);if(_0x54e7a0==='')_0x54e7a0+=_0x1a7703;else{if(_0x597e28){if(_0x3a82cc(0x35c)!==_0x3a82cc(0x35c))return this[_0x3a82cc(0x2af)]();else _0x54e7a0=_0x1a7703+this[_0x3a82cc(0x283)]()+_0x54e7a0;}else{if(_0x3a82cc(0x20b)!==_0x3a82cc(0x23e))_0x54e7a0=_0x54e7a0+this['skillCostSeparator']()+_0x1a7703;else{if(this[_0x3a82cc(0x1e8)][_0x3a82cc(0x3b2)]<=0x1)return;this['_actions']['pop']();const _0x254c50=_0x4114cf[_0x3a82cc(0x207)][_0x3a82cc(0x241)][_0x3a82cc(0x345)];if(_0x254c50['CancelAnimationID']){const _0x521e1d=_0x3a82cc(0x3b3),_0x383d63=_0x254c50[_0x3a82cc(0x298)[_0x3a82cc(0x268)](_0x521e1d)],_0x346e23=_0x254c50[_0x3a82cc(0x3f0)[_0x3a82cc(0x268)](_0x521e1d)],_0x5a580a=_0x254c50[_0x3a82cc(0x466)['format'](_0x521e1d)];_0xe8c3f3[_0x3a82cc(0x21f)]([this],_0x383d63,_0x346e23,_0x5a580a);}}}}return _0x54e7a0;},Window_Selectable[_0x5b1aaf(0x25e)][_0x5b1aaf(0x30d)]=function(){return![];},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x1c9)]=Window_Selectable[_0x5b1aaf(0x25e)]['select'],Window_Selectable['prototype']['select']=function(_0x3b6377){const _0x1d9dc5=_0x5b1aaf;VisuMZ[_0x1d9dc5(0x207)]['Window_Selectable_select']['call'](this,_0x3b6377),this[_0x1d9dc5(0x30d)]()&&this['active']&&this[_0x1d9dc5(0x1ec)]();},Window_Selectable[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1ec)]=function(){BattleManager['sortActionOrdersBTB']();},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x2da)]=Window_Help['prototype'][_0x5b1aaf(0x2e5)],Window_Help[_0x5b1aaf(0x25e)][_0x5b1aaf(0x2e5)]=function(_0x334cd8){const _0x29b5e2=_0x5b1aaf;BattleManager['isBTB']()&&_0x334cd8&&_0x334cd8[_0x29b5e2(0x226)]&&_0x334cd8[_0x29b5e2(0x226)]['match'](VisuMZ[_0x29b5e2(0x207)][_0x29b5e2(0x30f)][_0x29b5e2(0x1ba)])?this[_0x29b5e2(0x3e8)](String(RegExp['$1'])):VisuMZ[_0x29b5e2(0x207)]['Window_Help_setItem'][_0x29b5e2(0x2b4)](this,_0x334cd8);},VisuMZ['BattleSystemBTB']['Window_BattleLog_startAction']=Window_BattleLog[_0x5b1aaf(0x25e)][_0x5b1aaf(0x236)],Window_BattleLog['prototype'][_0x5b1aaf(0x236)]=function(_0x3cbf18,_0x41e0f6,_0x189711){const _0x398e38=_0x5b1aaf;if(this[_0x398e38(0x45f)](_0x3cbf18))this[_0x398e38(0x1cd)](_0x3cbf18,_0x41e0f6,_0x189711);else{if(_0x398e38(0x2d1)!==_0x398e38(0x252))VisuMZ[_0x398e38(0x207)][_0x398e38(0x1b8)][_0x398e38(0x2b4)](this,_0x3cbf18,_0x41e0f6,_0x189711);else{if(this['constructor']!==_0x40b4de)return![];if(!_0x13f3e6[_0x398e38(0x263)]())return![];if(!_0x4c5b9[_0x398e38(0x28e)]())return![];return _0x3902ff[_0x398e38(0x207)][_0x398e38(0x241)]['Window'][_0x398e38(0x261)];}}},Window_BattleLog[_0x5b1aaf(0x25e)][_0x5b1aaf(0x461)]=function(_0x215dc3,_0x222241,_0x3ae53f){const _0x57d066=_0x5b1aaf;VisuMZ['BattleSystemBTB'][_0x57d066(0x1b8)][_0x57d066(0x2b4)](this,_0x215dc3,_0x222241,_0x3ae53f);},Window_BattleLog['prototype']['showBraveAnimationBTB']=function(_0x153fb){const _0x363898=_0x5b1aaf;if(!BattleManager[_0x363898(0x28e)]())return![];if(!_0x153fb)return![];if(!_0x153fb[_0x363898(0x23b)]())return![];if(_0x153fb['_braveStartupAnimation'])return![];const _0x2f73c6=VisuMZ[_0x363898(0x207)]['Settings']['BraveAnimation'];if(!_0x2f73c6['ShowEnemyBrave'])return![];if(_0x2f73c6['BraveAnimationID']<=0x0)return![];return VisuMZ[_0x363898(0x207)][_0x363898(0x241)][_0x363898(0x345)]['ShowEnemyBrave'];},Window_BattleLog[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1cd)]=function(_0x422ab2,_0x2a79ec,_0x1a249b){const _0x2acb14=_0x5b1aaf;_0x422ab2[_0x2acb14(0x289)]=!![];let _0x4487d4=_0x422ab2[_0x2acb14(0x444)]();const _0x2b102f=VisuMZ[_0x2acb14(0x207)][_0x2acb14(0x241)][_0x2acb14(0x345)],_0x49cf1e=_0x2b102f[_0x2acb14(0x2e0)],_0x4a4640=_0x2b102f[_0x2acb14(0x1e7)];while(_0x4487d4--){this['push'](_0x2acb14(0x1c6),[_0x422ab2],_0x49cf1e),_0x4487d4>0x0?this[_0x2acb14(0x2fd)]('waitCount',_0x4a4640):'ESXMF'!==_0x2acb14(0x3f7)?(_0x4d3a46['BattleSystemBTB'][_0x2acb14(0x246)]['call'](this,_0x20f0a3),this[_0x2acb14(0x299)](_0x3519c7)):this[_0x2acb14(0x2fd)](_0x2acb14(0x1de));}this[_0x2acb14(0x2fd)]('startActionBTB',_0x422ab2,_0x2a79ec,_0x1a249b);},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x3d0)]=Window_ActorCommand['prototype'][_0x5b1aaf(0x24f)],Window_ActorCommand[_0x5b1aaf(0x25e)][_0x5b1aaf(0x24f)]=function(){const _0x441e3f=_0x5b1aaf;this[_0x441e3f(0x25b)](),VisuMZ['BattleSystemBTB'][_0x441e3f(0x3d0)][_0x441e3f(0x2b4)](this);},Window_ActorCommand[_0x5b1aaf(0x25e)][_0x5b1aaf(0x25b)]=function(){const _0x2bdd05=_0x5b1aaf;if(!this[_0x2bdd05(0x296)]())return;const _0x2ab787=this[_0x2bdd05(0x271)](),_0x4093f3=TextManager[_0x2bdd05(0x1bc)],_0x388ed6=ImageManager[_0x2bdd05(0x1ef)],_0x19af39=_0x2ab787===_0x2bdd05(0x423)?_0x4093f3:_0x2bdd05(0x259)['format'](_0x388ed6,_0x4093f3);this[_0x2bdd05(0x231)](_0x19af39,_0x2bdd05(0x44a),this['_actor'][_0x2bdd05(0x272)]()),BattleManager[_0x2bdd05(0x3c3)]();},Window_ActorCommand[_0x5b1aaf(0x25e)][_0x5b1aaf(0x296)]=function(){const _0x6246b6=_0x5b1aaf;if(!BattleManager[_0x6246b6(0x28e)]())return![];if(!VisuMZ[_0x6246b6(0x207)][_0x6246b6(0x241)][_0x6246b6(0x20f)][_0x6246b6(0x262)])return![];if(this[_0x6246b6(0x2b7)]&&this[_0x6246b6(0x2b7)][_0x6246b6(0x2f5)]())return![];return!![];},VisuMZ[_0x5b1aaf(0x207)]['Window_Selectable_cursorPagedown']=Window_Selectable['prototype'][_0x5b1aaf(0x40f)],Window_Selectable[_0x5b1aaf(0x25e)]['cursorPagedown']=function(){const _0xb329db=_0x5b1aaf;if(this[_0xb329db(0x233)]()){if(_0xb329db(0x409)!==_0xb329db(0x409))_0x984306+=_0x450307(_0x249851['$1']);else{if(this[_0xb329db(0x2b7)]&&!this['_actor']['hideBraveTrait']()&&this[_0xb329db(0x2b7)][_0xb329db(0x272)]()){if('KJale'===_0xb329db(0x339))SceneManager[_0xb329db(0x36a)][_0xb329db(0x26d)]();else{this[_0xb329db(0x32c)](_0x1d7935);return;}}}}else VisuMZ[_0xb329db(0x207)]['Window_Selectable_cursorPagedown']['call'](this);},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x3d4)]=Window_Selectable[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1cb)],Window_Selectable[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1cb)]=function(){const _0x23e164=_0x5b1aaf;if(this[_0x23e164(0x233)]()){if(_0x23e164(0x422)!==_0x23e164(0x422))return this[_0x23e164(0x2af)]();else this[_0x23e164(0x2b7)]&&!this[_0x23e164(0x2b7)][_0x23e164(0x2f5)]()&&this['_actor'][_0x23e164(0x1c5)]()>0x1&&SceneManager['_scene'][_0x23e164(0x1d6)]();}else VisuMZ['BattleSystemBTB'][_0x23e164(0x3d4)][_0x23e164(0x2b4)](this);},Window_Selectable['prototype'][_0x5b1aaf(0x233)]=function(){const _0x519b2b=_0x5b1aaf;if(this['constructor']!==Window_ActorCommand)return![];if(!SceneManager[_0x519b2b(0x263)]())return![];if(!BattleManager['isBTB']())return![];return VisuMZ[_0x519b2b(0x207)][_0x519b2b(0x241)]['Window']['BraveShortcuts'];},VisuMZ['BattleSystemBTB'][_0x5b1aaf(0x2ac)]=Window_ActorCommand['prototype']['makeCommandList'],Window_ActorCommand[_0x5b1aaf(0x25e)][_0x5b1aaf(0x331)]=function(){const _0x297949=_0x5b1aaf;VisuMZ[_0x297949(0x207)][_0x297949(0x2ac)][_0x297949(0x2b4)](this),this[_0x297949(0x358)]();},VisuMZ['BattleSystemBTB'][_0x5b1aaf(0x33b)]=Window_Base[_0x5b1aaf(0x25e)][_0x5b1aaf(0x218)],Window_Base[_0x5b1aaf(0x25e)][_0x5b1aaf(0x218)]=function(){const _0x34d9da=_0x5b1aaf;VisuMZ['BattleSystemBTB'][_0x34d9da(0x33b)][_0x34d9da(0x2b4)](this),SceneManager['isSceneBattle']()&&this['destroyBTBActionCounters']&&('sVkek'===_0x34d9da(0x282)?this['destroyBTBActionCounters']():this[_0x34d9da(0x1cd)](_0x16576f,_0x573ce8,_0xacead5));},Window_ActorCommand[_0x5b1aaf(0x25e)][_0x5b1aaf(0x2dc)]=function(){const _0x56dd7c=_0x5b1aaf;if(!this[_0x56dd7c(0x361)])return;this[_0x56dd7c(0x361)][_0x56dd7c(0x220)]&&this['_btbActionSprite']['bitmap'][_0x56dd7c(0x3e6)](),this['removeChild'](this[_0x56dd7c(0x361)]),delete this['_btbActionSprite'];},Window_ActorCommand[_0x5b1aaf(0x25e)][_0x5b1aaf(0x358)]=function(){const _0x20c465=_0x5b1aaf;if(!BattleManager[_0x20c465(0x28e)]())return;if(!this[_0x20c465(0x2b7)])return;this['destroyBTBActionCounters']();if(this[_0x20c465(0x2b7)][_0x20c465(0x2f5)]())return;this[_0x20c465(0x361)]=new Sprite(),this[_0x20c465(0x1a5)](this[_0x20c465(0x361)]),this['modifyBTBActionCounterSprite']();},Window_ActorCommand[_0x5b1aaf(0x25e)][_0x5b1aaf(0x2bf)]=function(){const _0x315730=_0x5b1aaf,_0xc96636=VisuMZ['BattleSystemBTB']['Settings'][_0x315730(0x20f)][_0x315730(0x1bf)];_0xc96636?_0xc96636[_0x315730(0x2b4)](this,this[_0x315730(0x361)],this,this['_actor']):this[_0x315730(0x1d9)][_0x315730(0x2b4)](this,this[_0x315730(0x361)],this,this['_actor']);},Window_ActorCommand[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1d9)]=function(){const _0x1cc5c7=_0x5b1aaf,_0x4c3ffe=arguments[0x0],_0xf5c68=arguments[0x1],_0x5eefcf=arguments[0x2];_0x4c3ffe['x']=Math['round'](_0xf5c68[_0x1cc5c7(0x38f)]/0x2),_0x4c3ffe['y']=0x0,_0x4c3ffe[_0x1cc5c7(0x2dd)]['x']=0.5,_0x4c3ffe['anchor']['y']=0.5;const _0x15e803=TextManager['btbActionSlot'],_0x28ea3b=TextManager[_0x1cc5c7(0x416)];let _0x4300c4=_0x15e803['repeat'](_0x5eefcf['numActions']());const _0x480701=_0x5eefcf['_actionInputIndex'];_0x4300c4=_0x4300c4['substring'](0x0,_0x480701)+_0x28ea3b+_0x4300c4[_0x1cc5c7(0x370)](_0x480701+0x1);const _0x3a310e=new Bitmap(_0xf5c68[_0x1cc5c7(0x38f)],_0xf5c68[_0x1cc5c7(0x3ea)]());_0x3a310e['fontSize']=0x24,_0x3a310e[_0x1cc5c7(0x43f)](_0x4300c4,0x0,0x0,_0x3a310e[_0x1cc5c7(0x38f)],_0x3a310e[_0x1cc5c7(0x2f8)],_0x1cc5c7(0x1eb)),_0x4c3ffe[_0x1cc5c7(0x220)]=_0x3a310e;},Window_ActorCommand[_0x5b1aaf(0x25e)][_0x5b1aaf(0x30d)]=function(){return BattleManager['isBTB']();},Window_ActorCommand[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1ec)]=function(){const _0x57ba85=_0x5b1aaf,_0xae23e9=BattleManager['inputtingAction']();if(_0xae23e9){const _0x3d52a5=this[_0x57ba85(0x31e)]();switch(_0x3d52a5){case _0x57ba85(0x3a3):_0xae23e9[_0x57ba85(0x2df)]();break;case _0x57ba85(0x29a):_0xae23e9[_0x57ba85(0x1ad)]();break;case _0x57ba85(0x2f7):_0xae23e9[_0x57ba85(0x23f)](this[_0x57ba85(0x3b6)]());break;default:_0xae23e9[_0x57ba85(0x23f)](null);break;}}Window_Command[_0x57ba85(0x25e)][_0x57ba85(0x1ec)][_0x57ba85(0x2b4)](this);},Window_Base['prototype'][_0x5b1aaf(0x3cf)]=function(_0x3cb499,_0x4a02e5,_0x3bcfb9,_0x549033,_0x5e6edc){const _0x283940=_0x5b1aaf;if(!_0x3cb499)return;if(!BattleManager[_0x283940(0x28e)]())return;const _0x3ceec9=VisuMZ[_0x283940(0x207)][_0x283940(0x241)][_0x283940(0x20f)],_0x3dd826=BattleManager[_0x283940(0x31b)]()?_0x3ceec9[_0x283940(0x2a2)]:_0x3ceec9[_0x283940(0x41b)],_0x20df00=_0x3ceec9[_0x283940(0x26f)],_0x5563ce=_0x3ceec9['PositiveColor'],_0x1c142f=_0x3ceec9['NegativeColor'];let _0x95dfee=0x0,_0x1a466a=0x0;_0x1a466a=_0x3cb499[_0x283940(0x3ec)]();if(_0x1a466a>0x0)_0x95dfee=_0x5563ce;if(_0x1a466a===0x0)_0x95dfee=_0x20df00;if(_0x1a466a<0x0)_0x95dfee=_0x1c142f;const _0x4d3387=_0x283940(0x1f1)[_0x283940(0x268)](_0x95dfee,_0x1a466a),_0x5d9fd6=_0x283940(0x321)[_0x283940(0x268)](ImageManager['btbBravePointsIcon']);_0x1a466a=_0x3cb499['predictedBravePoints']();if(_0x1a466a>0x0)_0x95dfee=_0x5563ce;if(_0x1a466a===0x0)_0x95dfee=_0x20df00;_0x1a466a<0x0&&(_0x95dfee=_0x1c142f);const _0x2d3e76=_0x283940(0x1f1)[_0x283940(0x268)](_0x95dfee,_0x1a466a);let _0x42b49f=_0x3dd826[_0x283940(0x268)](_0x4d3387,TextManager[_0x283940(0x2b3)],_0x5d9fd6,_0x2d3e76);const _0x1d12ff=this[_0x283940(0x3f6)](_0x42b49f)['width'];if(_0x5e6edc===_0x283940(0x1eb))_0x283940(0x25f)!==_0x283940(0x25f)?_0x58e2e9=_0x47ea16['x']+_0x35c6cc['faceWidth']+0x8:_0x4a02e5+=Math[_0x283940(0x266)]((_0x549033-_0x1d12ff)/0x2);else _0x5e6edc===_0x283940(0x2a6)&&(_0x283940(0x3e4)===_0x283940(0x3e4)?_0x4a02e5+=Math[_0x283940(0x266)](_0x549033-_0x1d12ff):_0x362f9a[_0x283940(0x306)](_0x3aefd8['item']()['id'])&&(_0x4aa3f9[_0x283940(0x2fd)](_0x8391b8),_0x1f3383['splice'](_0x110a4b[_0x283940(0x3b0)](_0x31964c[_0x283940(0x1b7)]()['id']),0x1)));this[_0x283940(0x2d7)](_0x42b49f,_0x4a02e5,_0x3bcfb9,_0x549033);},Window_StatusBase[_0x5b1aaf(0x25e)]['showBravePoints']=function(_0x1fca80){const _0x34eb0b=_0x5b1aaf;if(!_0x1fca80)return![];if(!BattleManager['isBTB']())return![];if(!this['battleLayoutStyle'])return![];if(_0x1fca80[_0x34eb0b(0x2f5)]())return![];const _0x246347=VisuMZ['BattleSystemBTB']['Settings']['Window'],_0x3283ac=this['battleLayoutStyle']();return _0x246347[_0x34eb0b(0x203)[_0x34eb0b(0x268)](_0x3283ac)];},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x1e5)]=Window_BattleStatus[_0x5b1aaf(0x25e)][_0x5b1aaf(0x37d)],Window_BattleStatus[_0x5b1aaf(0x25e)]['drawItemStatusListStyle']=function(_0x30d1d4){const _0x514950=_0x5b1aaf;VisuMZ[_0x514950(0x207)][_0x514950(0x1e5)]['call'](this,_0x30d1d4);const _0x1015e2=this[_0x514950(0x24d)](_0x30d1d4);if(this[_0x514950(0x39c)](_0x1015e2)){const _0x82fe65=this['itemLineRect'](_0x30d1d4),_0x89de74=$dataSystem[_0x514950(0x3ce)]?0x4:0x3,_0x243a89=_0x89de74*0x80+(_0x89de74-0x1)*0x8+0x4;let _0x1f7209=_0x82fe65['x']+this[_0x514950(0x384)];VisuMZ[_0x514950(0x1d1)][_0x514950(0x241)][_0x514950(0x2c3)][_0x514950(0x3fc)]?_0x1f7209=_0x82fe65['x']+ImageManager[_0x514950(0x3f1)]+0x8:_0x1f7209+=ImageManager[_0x514950(0x3c8)];const _0x37209c=Math[_0x514950(0x266)](Math['min'](_0x82fe65['x']+_0x82fe65[_0x514950(0x38f)]-_0x243a89,_0x1f7209));let _0x11bd87=_0x37209c+0x88,_0xc30ed2=_0x82fe65['y'];_0x11bd87+=0x88*($dataSystem['optDisplayTp']?0x3:0x2),_0x11bd87+=this[_0x514950(0x3e1)](),_0xc30ed2+=this[_0x514950(0x38e)]();const _0x274e1a=this[_0x514950(0x417)]();if(_0x11bd87>_0x82fe65['x']+_0x82fe65['width'])return;this[_0x514950(0x3cf)](_0x1015e2,_0x11bd87,_0xc30ed2,_0x82fe65[_0x514950(0x38f)],_0x274e1a);}},VisuMZ[_0x5b1aaf(0x207)][_0x5b1aaf(0x3b8)]=Window_BattleStatus[_0x5b1aaf(0x25e)][_0x5b1aaf(0x403)],Window_BattleStatus[_0x5b1aaf(0x25e)][_0x5b1aaf(0x403)]=function(_0x2d7a0d){const _0xd2bc50=_0x5b1aaf;VisuMZ[_0xd2bc50(0x207)]['Window_BattleStatus_drawItemStatusXPStyle']['call'](this,_0x2d7a0d);const _0xe34296=this[_0xd2bc50(0x24d)](_0x2d7a0d);if(this[_0xd2bc50(0x39c)](_0xe34296)){if(_0xd2bc50(0x2ca)!==_0xd2bc50(0x29e)){const _0x3ea576=this[_0xd2bc50(0x36f)](_0x2d7a0d);let _0xd89271=_0x3ea576['x'],_0x5001a4=_0x3ea576['y'];_0xd89271+=this['getOffsetX_BTB'](),_0x5001a4+=this[_0xd2bc50(0x38e)]();const _0xa9504d=this[_0xd2bc50(0x417)]();this[_0xd2bc50(0x3cf)](_0xe34296,_0xd89271,_0x5001a4,_0x3ea576[_0xd2bc50(0x38f)],_0xa9504d);}else return this[_0xd2bc50(0x2af)]();}},Window_BattleStatus['prototype'][_0x5b1aaf(0x36f)]=function(_0x595c83){const _0x8e4173=_0x5b1aaf,_0x34579d=this[_0x8e4173(0x273)](_0x595c83);if(_0x34579d[_0x8e4173(0x38f)]<ImageManager[_0x8e4173(0x3f1)])return _0x34579d;let _0x48807c=Math[_0x8e4173(0x266)]((_0x34579d[_0x8e4173(0x38f)]-ImageManager[_0x8e4173(0x3f1)])/0x2);return _0x34579d[_0x8e4173(0x38f)]=ImageManager[_0x8e4173(0x3f1)],_0x34579d['x']+=_0x48807c,_0x34579d;},Window_BattleStatus[_0x5b1aaf(0x25e)][_0x5b1aaf(0x417)]=function(){const _0x163e54=_0x5b1aaf,_0x5ef4a3=VisuMZ['BattleSystemBTB'][_0x163e54(0x241)][_0x163e54(0x20f)],_0x46406a=this['battleLayoutStyle']();return _0x5ef4a3[_0x163e54(0x455)[_0x163e54(0x268)](_0x46406a)]||0x0;},Window_BattleStatus[_0x5b1aaf(0x25e)][_0x5b1aaf(0x3e1)]=function(){const _0x5125e4=_0x5b1aaf,_0x3aae7b=VisuMZ[_0x5125e4(0x207)][_0x5125e4(0x241)][_0x5125e4(0x20f)],_0x2c365e=this[_0x5125e4(0x312)]();return _0x3aae7b['%1_offsetX'[_0x5125e4(0x268)](_0x2c365e)]||0x0;},Window_BattleStatus[_0x5b1aaf(0x25e)]['getOffsetY_BTB']=function(){const _0x1d6b34=_0x5b1aaf,_0x45d67b=VisuMZ[_0x1d6b34(0x207)]['Settings']['Window'],_0xe0b32e=this[_0x1d6b34(0x312)]();return _0x45d67b['%1_offsetY'[_0x1d6b34(0x268)](_0xe0b32e)]||0x0;},Window_BattleSkill[_0x5b1aaf(0x25e)][_0x5b1aaf(0x30d)]=function(){const _0x6cfde9=_0x5b1aaf;return BattleManager[_0x6cfde9(0x28e)]();},Window_BattleSkill[_0x5b1aaf(0x25e)]['applyBattleItemWindowBTB']=function(){const _0x2931c9=_0x5b1aaf,_0x868066=this[_0x2931c9(0x1b7)](),_0x184466=BattleManager[_0x2931c9(0x32d)]();if(_0x184466)_0x184466[_0x2931c9(0x23f)](_0x868066?_0x868066['id']:null);Window_SkillList[_0x2931c9(0x25e)][_0x2931c9(0x1ec)][_0x2931c9(0x2b4)](this);},Window_BattleItem[_0x5b1aaf(0x25e)]['isBattleItemWindowBTB']=function(){const _0x289151=_0x5b1aaf;return BattleManager[_0x289151(0x28e)]();},Window_BattleItem['prototype']['applyBattleItemWindowBTB']=function(){const _0x1c2734=_0x5b1aaf,_0x26f777=this['item'](),_0x5af896=BattleManager['inputtingAction']();if(_0x5af896)_0x5af896[_0x1c2734(0x2e5)](_0x26f777?_0x26f777['id']:null);Window_ItemList['prototype'][_0x1c2734(0x1ec)]['call'](this);};function _0xe178(){const _0x41af1b=['resetFontSettings','process_VisuMZ_BattleSystemBTB_Notetags','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','updatePadding','BtbTurnOrderEnemyIcon','BraveAnimation','changeSvActorGraphicBitmap','Actor','drawItemNumberBTB','BravePointSetTarget','updateOpacity','setup','numItems','BTB_MAX_ACTIONS_HARD_CAP','_letterSprite','5060365WRYlcl','Enemies','DsaBw','_windowLayer','erDBB','isSkipPartyCommandWindow','JsBravePointsTarget','calcRegenBravePoints','isHorz','createBTBActionCounters','_btbItemFlexFusion','join','RepositionLogWindow','iSULG','AgTjz','ActionSlot','isActor','commandCancelBTB','_btbActionSprite','Game_Action_allowRandomSpeed','Game_Battler_performCollapse','BravePointAlterUser','_isBattleOver','removeActionBattlersBTB','pop','Game_Battler_onTurnEnd','select','_scene','SubjectDistance','_isAlive','Game_Unit_makeActions','left','itemRectPortraitBTB','substring','EwyHo','OrderDirection','tMjMH','BravePointsAbbr','EnemyActionFusions','checkOpacity','_graphicType','EMZOc','#000000','battlerName','_isAppeared','cancel','drawItemStatusListStyle','svBattlerName','%1SystemBg','_ogWindowLayerY','inBattle','oQcnC','setHue','padding','_graphicFaceName','mainFontFace','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Brave','Class-%1-%2','_homeY','makeMultiActionsBTB','enemy','createTurnOrderBTBGraphicType','getOffsetY_BTB','width','vKymg','updateVisibility','CostPosition','Mechanics','cannotBraveTrait','updateLetter','onTurnEndBTB','boxWidth','BattleManager_isTpb','_graphicFaceIndex','CannotBrave','_actorCommandWindow','showBravePoints','bBjyY','boxHeight','eqxsE','sortActionOrdersBTB','179ZSmowJ','rmwre','attack','loseBravePoints','mNAnB','svActorVertCells','zVheJ','%1-%2','ShowCostForAttack','RzUsw','Game_Action_applyItemUserEffect','shift','DKUJh','zljwm','STR','indexOf','ParseSkillNotetags','length','Cancel','MaxBravePointsHardCap','processActionFusionsBTB','currentExt','BTB_MAX_BRAVEPOINTS_DEFAULT','Window_BattleStatus_drawItemStatusXPStyle','maxBravePoints','_targetHomeY','isAppeared','yvDpO','createGraphicSprite','Scene_Battle_createAllWindows','changeEnemyGraphicBitmap','needsSelection','KVpOk','loadSvEnemy','refreshStatusBTB','CancelAnimationID','zTBbr','hide','concat','iconWidth','createBattlerSprites','changeFaceGraphicBitmap','JSON','initMembers','GYlby','optDisplayTp','drawActorBravePoints','Window_ActorCommand_addGuardCommand','BattleManager_isActiveTpb','6842610mgQTEB','NTDef','Window_Selectable_cursorPageup','isTurnBased','_btbTurnOrderFaceName','_targetIndex','Game_System_initialize','IconSet','canProcessActionFusionsBTB','createBorderSprite','BravePointStartFavor','Enemy-%1-%2','updateGraphic','visible','OQISQ','getOffsetX_BTB','gDdqa','cancelBrave','foWyz','loadSystem','destroy','MinBravePointsHardCap','setText','createChildren','lineHeight','getItemIdWithName','bravePoints','createInitialPositions','status','Visible','%1Mirror','faceWidth','getActionFusionRecipeItems','_btbTurnOrderIconIndex','gainBravePoints','setActionFusionBTB','textSizeEx','ESXMF','updateGraphicHue','containerWindow','battler','KzAVq','ShowFacesListStyle','canUse','addChildAt','removeActionFusionIngredients','commandCancel','CalcActionSpeedJS','ScreenBuffer','drawItemStatusXPStyle','isForFriend','ATRTh','sort','EgECY','Show_0_BP_Cost','eHFQk','checkActionsBTB','createBTBTurnOrderWindow','_graphicSv','kgTvH','12526lxNAPu','cursorPagedown','process_VisuMZ_BattleSystemBTB_JS','_letter','faceHeight','Parse_Notetags_BravePointsUserJS','SpriteThin','clearRect','btbActionCurrent','getAlignmentBTB','Window_Selectable_cursorPagedown','_turnOrderContainer','ARRAYEVAL','StatusDisplayFmt','vstPA','EcwYQ','EFIQI','HQQvr','BattleManager_isTurnBased','ReduceShownBPCost','EmVCo','text','btbPaySkillFusionCosts','canInput','EVAL','qXJLT','create','allBattleMembers','loadSvActor','refresh','_skillIDs','some','clamp','_helpWindow','fUtTE','btbParseFusionData','KrnBe','containerPosition','ojMaF','ShowCostForGuard','applyItemUserEffect','ActionCurrent','clearActions','%1BorderColor','VLzpJ','UpdateFrames','_graphicSprite','rtaYx','btbRegisterFusions','drawText','speed','getSkillIdWithName','ARRAYFUNC','hasSvBattler','braveAnimationTimes','xvhZw','%1\x20%2\x20%3','nScQI','ZmLfP','_scrollX','brave','CenterHorz','_positionDuration','Game_Battler_useItem','DEQzO','itemLineRect','getChildIndex','_backgroundSprite','_fullWidth','GhPSg','_actionFusionRecipe','%1_align','_blendColor','bottom','predictedBravePoints','_ogWindowLayerX','_items','maxBattleMembers','isItem','ItemQuantityFmt','XvQCC','showBraveAnimationBTB','_btbTurnOrderVisible','startActionBTB','isDrawItemNumber','trim','CommandName','1183221txfYyK','%1Mute','checkTargetPositions','getBattleSystem','toUpperCase','SaJDu','setBravePoints','%1_offsetX','Window_Base_drawItemNumber','createActorCommandWindowBTB','wphVx','FusionFlex','_graphicEnemy','addChild','TurnOrderBTBGraphicIconIndex','updateTurnOrder','_btbSkillFlexFusion','updateBattleContainerOrder','BTB_MIN_BRAVEPOINTS_HARD_CAP','EnemyBattlerFaceName','ZFXzJ','setGuard','bind','EnemyBattlerIcon','exit','NUM','compareBattlerSprites','useItem','process_VisuMZ_BattleSystemBTB','_plural','MinBravePointsDefault','item','Window_BattleLog_startAction','createTurnOrderBTBGraphicIconIndex','BTB_Help','windowRect','btbBraveCommand','createKeyJS','formFlexCombo','DrawActionCountersJS','_fadeTarget','KJPDc','Game_BattlerBase_canUse','canActionFusionWithBTB','TurnOrderBTBGraphicFaceIndex','numActions','showNormalAnimation','addInnerChild','EnableFusion','Window_Selectable_select','_index','cursorPageup','filter','queueBraveAnimationsBTB','AhhMG','EnemyBattlerFontSize','%1BgColor2','BattleCore','_fadeDuration','cannotFusionNotetagBTB','MaxVertSprites','RepositionTopHelpY','reduceBrave','FUNC','addLoadListener','modifyBTBActionCounterSprite_Fallback','btbBravePointsFull','svactor','createLetterSprite','AllowRandomSpeed','waitForAnimation','BravePointSkillCost','fillRect','ZPPth','EnemyBattlerFaceIndex','index','parameters','Window_BattleStatus_drawItemStatusListStyle','makeAdditionalSkillCostText','WaitFrames','_actions','zkYpj','isSkill','center','applyBattleItemWindowBTB','MaxBravePoints','Game_Action_setSkill','btbBravePointsIcon','_actionInputIndex','\x5cC[%1]%2\x5cC[0]','startTurn','BravePointsRegenAlive','opacity','jMjnz','btbMatchesCurrentFusionAction','BattleManager_makeActionOrders','BravePointAlterTarget','createBattlerRect','performCollapse','allowRandomSpeed','onBattleStart','DisplayPosition','match','MaxActionsHardCap','_itemIDs','battlerHue','IconIndex','%1_display','_turnOrderInnerSprite','1322594VTmpDM','ceil','BattleSystemBTB','ARRAYNUM','_positionTargetY','initHomePositions','GtceA','onDatabaseLoaded','_position','startInput','Window','createBackgroundSprite','CysNp','uYNDe','_btbItemStrictFusion','General','SpriteLength','makeSpeed','makeActionOrders','close','BHTjb','Skill-%1-%2','Game_BattlerBase_hide','RItWw','jFaIb','split','requestFauxAnimation','bitmap','_unit','updateTurnOrderBTB','map','%1BgColor1','makeDeepCopy','note','MaxHorzSprites','MuZvz','bVHTC','zCwuW','BTB_MAX_BRAVEPOINTS_HARD_CAP','BravePointPredictedCost','_actionBattlers','initialize','tHuQH','fLDVD','addCommand','_btbTurnOrderWindow','isUsePageUpDnShortcutBTB','AmlpJ','faceIndex','startAction','isActiveTpb','updateSidePosition','lDyoO','fTWxp','isEnemy','traitObjects','changeIconGraphicBitmap','RLPbw','setSkill','_guardUnleash','Settings','requestRefresh','SSryQ','%1SystemBorder','getActionFusionCombinationsBTB','Game_Battler_onBattleStart','Scene_Battle_onDisabledPartyCommandSelection','FaceName','_graphicHue','createActorCommandWindow','createTestBitmap','Game_BattlerBase_canInput','actor','owLHc','addGuardCommand','update','_homeDuration','QaeGZ','checkPosition','getColor','FusionStrict','FaceIndex','ParseAllNotetags','BorderThickness','\x5cI[%1]%2','_surprise','addBraveCommand','BattleManager_startTurn','appear','prototype','Nzypo','qLrtc','BraveShortcuts','ShowCommand','isSceneBattle','bitmapHeight','svActorHorzCells','round','ConvertParams','format','recalculateHome','TurnOrderBTBGraphicType','BattleManager_startInput','members','performBrave','commandBrave','NeutralColor','_phase','commandStyle','canBrave','itemRect','Armor-%1-%2','BtbTurnOrderClearEnemyGraphic','_logWindow','clearTurnOrderBTBGraphics','battleEnd','Game_Battler_makeActionTimes','textWidth','_containerHeight','Iattr','icon','mainSprite','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_containerWidth','splice','sVkek','skillCostSeparator','guardSkillId','DisplayOffsetX','registerCommand','Game_Action_setItem','makeAdditionalCostTextBTB','_braveStartupAnimation','makeActions','onDisabledPartyCommandSelection','BtbTurnOrderActorFace','KxEeA','isBTB','_bravePoints','slice','waitCount','eqtTm','ARRAYSTRUCT','TurnOrder','crnLf','canAddBraveCommand','ItemsEquipsCore','%1AnimationID','onBattleStartBTB','guard','bitmapWidth','Item-%1-%2','blt','nOhCV','applyItemBattleSystemBTBUserEffect','bypZy','drawItemNumber','StatusPredictFmt','payBravePointsCost','ItemScene','isTpb','right','MaxBravePointsDefault','_targetHomeX','Window_Base_makeAdditionalSkillCostText','regenerateBravePoints','BwygK','Window_ActorCommand_makeCommandList','_homeX','PiHMa','processUpdateGraphic','face','loadFace','btbActionSlot','btbBravePointsAbbr','call','EnemyBattlerType','Game_BattlerBase_canGuard','_actor','ItemQuantityFontSize','predictedBravePointCost','_weapons','isBattleSystemBTBTurnOrderVisible','children','EcIpV','SystemTurnOrderVisibility','modifyBTBActionCounterSprite','onTurnEnd','repositionLogWindowBTB','minBravePoints','BattleLayout','btbCostFormat','createAllWindows','makeActionTimes','_statusWindow','setBTBGraphicIconIndex','selectNextCommand','WvXaD','iRxBt','min','BravePointCostFmt','subject','Actors','removeActor','HomMh','currentAction','createTurnOrderBTBGraphicFaceIndex','BravePointSetUser','STRUCT','iconHeight','drawTextEx','BravePointRegen','ParseItemNotetags','Window_Help_setItem','xGFPM','destroyBTBActionCounters','anchor','htXuE','setAttack','BraveAnimationID','setHandler','_scrollY','BtbTurnOrderEnemyFace','Game_Action_speed','setItem','Game_BattlerBase_appear','ActorActionFusions','BattleManager_battleSys','MMXqB','Game_Actor_makeActions','WPerA','getActionFusionRecipeSkills','defaultPosition','Game_Enemy_makeActions','gradientFillRect','Game_Party_removeActor','bravePointsCost','setBlendColor','name','SSzQq','hideBraveTrait','applyBattleSystemBTBUserEffect','singleSkill','height','gGUGf','AXgwq','kIqlu','RepositionTopForHelp','push','updatePosition','_subject','calculateTargetPositions','Scene_Boot_onDatabaseLoaded','_graphicIconIndex','fontSize','canPayActionFusionCombination','return\x200','includes','_positionTargetX','_btbSkillStrictFusion','description','isSideView','8JMCVeH','CUoKJ','isBattleItemWindowBTB','isAlive','RegExp','BattleManager_startAction','BravePointStartNeutral','battleLayoutStyle','EnemyBattlerFontFace','maxBraveActions','test','constructor','max','IIpZL','ActorBattlerIcon','Scene_Battle_createActorCommandWindow','isInputting','createTurnOrderBTBGraphicFaceName','Actor-%1-%2','currentSymbol','btbPayItemFusionCosts','JsBravePointsUser','\x5cI[%1]','top','aLNZq','YZJUl','fACaM','Enemy','attackSkillId','updateSelectionEffect','startFade','InoGz','TurnOrderBTBGraphicFaceName','useItemBTB','inputtingAction','_btbTurnOrderFaceIndex','BTB','BTB_MIN_BRAVEPOINTS_DEFAULT','makeCommandList','getTotalActionFusionRecipes','parse','_bypassAiValidCheck','HideBrave','7307412JIqHgV','floor','MunmD','KJale','_armors','Window_Base_close','_btbTurnOrderGraphicType','479056exdLfv','_fullHeight','VArNb'];_0xe178=function(){return _0x41af1b;};return _0xe178();}function Window_BTB_TurnOrder(){const _0x1149c1=_0x5b1aaf;this[_0x1149c1(0x22e)](...arguments);}Window_BTB_TurnOrder['prototype']=Object['create'](Window_Base[_0x5b1aaf(0x25e)]),Window_BTB_TurnOrder[_0x5b1aaf(0x25e)][_0x5b1aaf(0x316)]=Window_BTB_TurnOrder,Window_BTB_TurnOrder[_0x5b1aaf(0x241)]=VisuMZ[_0x5b1aaf(0x207)]['Settings'][_0x5b1aaf(0x294)],Window_BTB_TurnOrder[_0x5b1aaf(0x25e)][_0x5b1aaf(0x22e)]=function(){const _0x297dce=_0x5b1aaf,_0x124cd8=this[_0x297dce(0x1bb)]();this[_0x297dce(0x20a)](_0x124cd8),Window_Base[_0x297dce(0x25e)]['initialize'][_0x297dce(0x2b4)](this,_0x124cd8),this['createBattlerSprites'](),this[_0x297dce(0x391)](),this[_0x297dce(0x1f4)]=0x0;},Window_BTB_TurnOrder[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1bb)]=function(){const _0x1c6f8b=_0x5b1aaf;return this[_0x1c6f8b(0x1f9)]($gameParty['maxBattleMembers'](),0x9,!![]);},Window_BTB_TurnOrder[_0x5b1aaf(0x25e)][_0x5b1aaf(0x20a)]=function(_0x5a9185){const _0x558232=_0x5b1aaf;this[_0x558232(0x2a8)]=this[_0x558232(0x2ad)]=_0x5a9185['x'],this[_0x558232(0x3ba)]=this[_0x558232(0x38a)]=_0x5a9185['y'],this[_0x558232(0x452)]=_0x5a9185[_0x558232(0x38f)],this[_0x558232(0x33e)]=_0x5a9185[_0x558232(0x2f8)],this[_0x558232(0x251)]=0x0;},Window_BTB_TurnOrder[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1f9)]=function(_0x1f8270,_0x111e92,_0x4b248a){const _0x4e6a86=_0x5b1aaf,_0x330116=Window_BTB_TurnOrder[_0x4e6a86(0x241)],_0x43f58f=this['isHorz']()?_0x330116[_0x4e6a86(0x227)]:_0x330116[_0x4e6a86(0x1d4)],_0x53e44e=Math[_0x4e6a86(0x2cc)](_0x43f58f,_0x1f8270+_0x111e92),_0x3636c3=SceneManager[_0x4e6a86(0x36a)][_0x4e6a86(0x2c7)][_0x4e6a86(0x2f8)],_0x18d03f=SceneManager[_0x4e6a86(0x36a)][_0x4e6a86(0x42f)][_0x4e6a86(0x2f8)],_0x32c37c=_0x330116[_0x4e6a86(0x36b)],_0x436551=Graphics[_0x4e6a86(0x2f8)]-_0x3636c3-_0x18d03f;let _0x344d7c=0x0,_0x4439d6=0x0,_0x41d5c7=0x0,_0x2c700e=0x0;switch(_0x330116[_0x4e6a86(0x1fd)]){case _0x4e6a86(0x322):_0x344d7c=_0x330116['SpriteThin']*_0x53e44e+_0x32c37c,_0x4439d6=_0x330116[_0x4e6a86(0x215)],_0x41d5c7=Math[_0x4e6a86(0x206)]((Graphics['width']-_0x344d7c)/0x2),_0x2c700e=_0x330116['ScreenBuffer'];break;case'bottom':_0x344d7c=_0x330116[_0x4e6a86(0x414)]*_0x53e44e+_0x32c37c,_0x4439d6=_0x330116[_0x4e6a86(0x215)],_0x41d5c7=Math[_0x4e6a86(0x206)]((Graphics['width']-_0x344d7c)/0x2),_0x2c700e=Graphics[_0x4e6a86(0x2f8)]-_0x3636c3-_0x4439d6-_0x330116['ScreenBuffer'];break;case _0x4e6a86(0x36e):_0x344d7c=_0x330116[_0x4e6a86(0x215)],_0x4439d6=_0x330116['SpriteThin']*_0x53e44e+_0x32c37c,_0x41d5c7=_0x330116[_0x4e6a86(0x402)],_0x2c700e=Math[_0x4e6a86(0x206)]((_0x436551-_0x4439d6)/0x2),_0x2c700e+=_0x18d03f;break;case'right':_0x344d7c=_0x330116['SpriteLength'],_0x4439d6=_0x330116['SpriteThin']*_0x53e44e+_0x32c37c,_0x41d5c7=Graphics[_0x4e6a86(0x38f)]-_0x344d7c-_0x330116['ScreenBuffer'],_0x2c700e=Math['ceil']((_0x436551-_0x4439d6)/0x2),_0x2c700e+=_0x18d03f;break;}if(!_0x4b248a){const _0x441858=Window_BTB_TurnOrder['Settings'][_0x4e6a86(0x372)];let _0x578d9f=Math[_0x4e6a86(0x2cc)](_0x43f58f,Math[_0x4e6a86(0x2cc)]($gameParty[_0x4e6a86(0x45b)]()+0x8)-_0x53e44e);switch(_0x330116[_0x4e6a86(0x1fd)]){case _0x4e6a86(0x322):case _0x4e6a86(0x457):_0x441858&&(_0x41d5c7-=_0x578d9f*_0x330116[_0x4e6a86(0x414)]);break;}}return _0x41d5c7+=_0x330116[_0x4e6a86(0x285)],_0x2c700e+=_0x330116['DisplayOffsetY'],new Rectangle(_0x41d5c7,_0x2c700e,_0x344d7c,_0x4439d6);},Window_BTB_TurnOrder[_0x5b1aaf(0x25e)][_0x5b1aaf(0x343)]=function(){const _0x1dec41=_0x5b1aaf;this[_0x1dec41(0x384)]=0x0;},Window_BTB_TurnOrder['prototype'][_0x5b1aaf(0x357)]=function(){const _0x42db0a=_0x5b1aaf,_0x52702a=Window_BTB_TurnOrder[_0x42db0a(0x241)],_0x27e840=[_0x42db0a(0x322),_0x42db0a(0x457)][_0x42db0a(0x306)](_0x52702a[_0x42db0a(0x1fd)]);return _0x27e840;},Window_BTB_TurnOrder['prototype'][_0x5b1aaf(0x3c9)]=function(){const _0x502f4b=_0x5b1aaf;this['_turnOrderInnerSprite']=new Sprite(),this[_0x502f4b(0x1c7)](this[_0x502f4b(0x204)]),this[_0x502f4b(0x419)]=[];for(let _0x4c841e=0x0;_0x4c841e<$gameParty[_0x502f4b(0x45b)]();_0x4c841e++){const _0x2eed1e=new Sprite_BTB_TurnOrder_Battler($gameParty,_0x4c841e);this[_0x502f4b(0x204)][_0x502f4b(0x1a5)](_0x2eed1e),this[_0x502f4b(0x419)][_0x502f4b(0x2fd)](_0x2eed1e);}for(let _0x76db0=0x0;_0x76db0<$gameTroop[_0x502f4b(0x26c)]()[_0x502f4b(0x3b2)];_0x76db0++){const _0x58725c=new Sprite_BTB_TurnOrder_Battler($gameTroop,_0x76db0);this[_0x502f4b(0x204)][_0x502f4b(0x1a5)](_0x58725c),this[_0x502f4b(0x419)][_0x502f4b(0x2fd)](_0x58725c);}},Window_BTB_TurnOrder[_0x5b1aaf(0x25e)][_0x5b1aaf(0x250)]=function(){const _0xfc08a8=_0x5b1aaf;Window_Base['prototype'][_0xfc08a8(0x250)][_0xfc08a8(0x2b4)](this),this['updateHomePosition'](),this[_0xfc08a8(0x2fe)](),this[_0xfc08a8(0x238)](),this[_0xfc08a8(0x1a9)](),this[_0xfc08a8(0x391)]();},Window_BTB_TurnOrder[_0x5b1aaf(0x25e)]['updateHomePosition']=function(){const _0x1b3356=_0x5b1aaf;if(this['_homeDuration']>0x0){const _0x1914aa=this[_0x1b3356(0x251)];this['_homeX']=(this[_0x1b3356(0x2ad)]*(_0x1914aa-0x1)+this[_0x1b3356(0x2a8)])/_0x1914aa,this[_0x1b3356(0x38a)]=(this[_0x1b3356(0x38a)]*(_0x1914aa-0x1)+this[_0x1b3356(0x3ba)])/_0x1914aa,this[_0x1b3356(0x251)]--,this[_0x1b3356(0x251)]<=0x0&&(this[_0x1b3356(0x2ad)]=this[_0x1b3356(0x2a8)],this[_0x1b3356(0x38a)]=this[_0x1b3356(0x3ba)]);}},Window_BTB_TurnOrder[_0x5b1aaf(0x25e)][_0x5b1aaf(0x2fe)]=function(){const _0x136c49=_0x5b1aaf,_0xfc8149=Window_BTB_TurnOrder[_0x136c49(0x241)];if(_0xfc8149[_0x136c49(0x1fd)]!=='top')return;if(!_0xfc8149[_0x136c49(0x2fc)])return;const _0x12cc5a=SceneManager[_0x136c49(0x36a)][_0x136c49(0x42f)];if(!_0x12cc5a)return;if(_0x12cc5a[_0x136c49(0x3df)])this['x']=this[_0x136c49(0x2ad)]+(_0xfc8149['RepositionTopHelpX']||0x0),this['y']=this[_0x136c49(0x38a)]+(_0xfc8149[_0x136c49(0x1d5)]||0x0);else{if(_0x136c49(0x28d)===_0x136c49(0x28d))this['x']=this[_0x136c49(0x2ad)],this['y']=this['_homeY'];else{if(this['btbMatchesCurrentFusionAction'](_0x1a4534)){this['useItemBTB'](_0x2da64d);return;}_0x32b7a3['BattleSystemBTB'][_0x136c49(0x44d)][_0x136c49(0x2b4)](this,_0x25e064),this[_0x136c49(0x2a3)](_0x385ee6);}}const _0x32cdeb=SceneManager[_0x136c49(0x36a)][_0x136c49(0x352)];this[_0x136c49(0x459)]===undefined&&(this[_0x136c49(0x459)]=Math[_0x136c49(0x266)]((Graphics[_0x136c49(0x38f)]-Math[_0x136c49(0x2cc)](Graphics['boxWidth'],_0x32cdeb[_0x136c49(0x38f)]))/0x2),this[_0x136c49(0x380)]=Math[_0x136c49(0x266)]((Graphics['height']-Math[_0x136c49(0x2cc)](Graphics[_0x136c49(0x39e)],_0x32cdeb['height']))/0x2)),this['x']+=_0x32cdeb['x']-this[_0x136c49(0x459)],this['y']+=_0x32cdeb['y']-this[_0x136c49(0x380)];},Window_BTB_TurnOrder[_0x5b1aaf(0x25e)][_0x5b1aaf(0x238)]=function(){const _0x3272c3=_0x5b1aaf,_0x5dc529=Window_BTB_TurnOrder[_0x3272c3(0x241)];if([_0x3272c3(0x322)][_0x3272c3(0x306)](_0x5dc529[_0x3272c3(0x1fd)]))return;this['x']=this[_0x3272c3(0x2ad)],this['y']=this[_0x3272c3(0x38a)];const _0x39b3db=SceneManager[_0x3272c3(0x36a)][_0x3272c3(0x352)];this['x']+=_0x39b3db['x'],this['y']+=_0x39b3db['y'];},Window_BTB_TurnOrder[_0x5b1aaf(0x25e)][_0x5b1aaf(0x1a9)]=function(){const _0x64ff12=_0x5b1aaf;if(!this[_0x64ff12(0x204)])return;const _0x1bc7d9=this[_0x64ff12(0x204)][_0x64ff12(0x2bc)];if(!_0x1bc7d9)return;_0x1bc7d9[_0x64ff12(0x406)](this[_0x64ff12(0x1b2)][_0x64ff12(0x1ae)](this));},Window_BTB_TurnOrder[_0x5b1aaf(0x25e)]['compareBattlerSprites']=function(_0x3f25b8,_0x88b062){const _0x52d918=_0x5b1aaf,_0x2df840=this['isHorz'](),_0x3fe93c=Window_BTB_TurnOrder[_0x52d918(0x241)][_0x52d918(0x372)];if(_0x2df840&&!_0x3fe93c)return _0x3f25b8['x']-_0x88b062['x'];else{if(_0x2df840&&_0x3fe93c)return _0x88b062['x']-_0x3f25b8['x'];else{if(!_0x2df840&&_0x3fe93c){if('zuOlW'===_0x52d918(0x1ac))_0x355876[_0x52d918(0x43f)](this[_0x52d918(0x411)][_0x52d918(0x463)](),0x0,0x2,_0xa7064a-0x8,_0x43b551-0x4,_0x52d918(0x2a6));else return _0x3f25b8['y']-_0x88b062['y'];}else{if(!_0x2df840&&!_0x3fe93c){if(_0x52d918(0x41d)===_0x52d918(0x41d))return _0x88b062['y']-_0x3f25b8['y'];else this['commandCancel']();}}}}},Window_BTB_TurnOrder[_0x5b1aaf(0x25e)][_0x5b1aaf(0x391)]=function(){const _0x56dbe1=_0x5b1aaf;this[_0x56dbe1(0x3df)]=$gameSystem[_0x56dbe1(0x2bb)]();},Window_BTB_TurnOrder['prototype'][_0x5b1aaf(0x1a7)]=function(_0x1143fe){const _0x2c9ac1=_0x5b1aaf;this[_0x2c9ac1(0x419)][_0x2c9ac1(0x406)]((_0x2561c5,_0x43a86b)=>{const _0x5778cd=_0x2c9ac1;return _0x2561c5[_0x5778cd(0x433)]()-_0x43a86b['containerPosition']();}),this['recalculateHome']();if(!_0x1143fe)return;for(const _0x24e5f0 of this[_0x2c9ac1(0x419)]){if(!_0x24e5f0)continue;_0x24e5f0[_0x2c9ac1(0x250)](),_0x24e5f0[_0x2c9ac1(0x44c)]=0x0;}},Window_BTB_TurnOrder[_0x5b1aaf(0x25e)][_0x5b1aaf(0x269)]=function(){const _0x29b02d=_0x5b1aaf;if(!this['isHorz']())return;const _0x2b8a45=VisuMZ[_0x29b02d(0x207)][_0x29b02d(0x241)][_0x29b02d(0x294)];if(!_0x2b8a45[_0x29b02d(0x44b)])return;const _0x568555=$gameParty['members']()[_0x29b02d(0x1cc)](_0x31cf24=>_0x31cf24&&_0x31cf24[_0x29b02d(0x30e)]()&&_0x31cf24['isAppeared']())[_0x29b02d(0x3b2)],_0x3ec987=$gameTroop[_0x29b02d(0x26c)]()[_0x29b02d(0x1cc)](_0x45b6e5=>_0x45b6e5&&_0x45b6e5[_0x29b02d(0x30e)]()&&_0x45b6e5[_0x29b02d(0x3bb)]())[_0x29b02d(0x3b2)],_0x4416ec=this[_0x29b02d(0x1f9)](_0x568555,_0x3ec987);this[_0x29b02d(0x2a8)]=_0x4416ec['x'],this[_0x29b02d(0x3ba)]=_0x4416ec['y'];if(this[_0x29b02d(0x2a8)]!==this[_0x29b02d(0x2ad)]||this[_0x29b02d(0x3ba)]!==this[_0x29b02d(0x38a)]){if(_0x29b02d(0x44e)===_0x29b02d(0x44e))this[_0x29b02d(0x251)]=_0x2b8a45[_0x29b02d(0x43b)];else{const _0x5be6fe=this['actor']()[_0x29b02d(0x226)];if(_0x5be6fe['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0xa04b23(_0x13d06f['$2']);return this[_0x29b02d(0x235)]();}}};
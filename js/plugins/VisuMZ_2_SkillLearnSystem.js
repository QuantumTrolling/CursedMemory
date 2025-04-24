//=============================================================================
// VisuStella MZ - Skill Learn System
// VisuMZ_2_SkillLearnSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_SkillLearnSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillLearnSystem = VisuMZ.SkillLearnSystem || {};
VisuMZ.SkillLearnSystem.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.10] [SkillLearnSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Learn_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin lets your game's actors have an alternative way of learning
 * skills aside from leveling up. Instead, they can learn skills through the
 * in-game skill menu, where they can trade gold, items, or the brand new
 * resources made available by this plugin: Ability Points and/or Skill Points.
 * 
 * Ability Points and Skill Points are new resources provided by this plugin
 * that can be acquired in a variety of ways, of which, you can set through its
 * mechanical settings in the Plugin Parameters. These can be through leveling
 * up, performing actions, and/or defeating enemies.
 * 
 * When learning skills through this plugin's in-game system, skills can have
 * a variety of costs and requirements. These requirements can come in the form
 * of needing to be at a certain level, having specific skills learned, and/or
 * having certain switches on.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actors can now learn new skills from the in-game skill menu under the
 *   new "Learn" command.
 * * In this new menu, actors can spend various resources to learn new skills.
 * * These resources can be Ability Points, Skill Points, items, and more.
 * * Ability Points and Skill Points are brand new resources added through this
 *   plugin which can be acquired through a variety a means ranging from
 *   participating in battle, defeating enemies, and/or leveling up.
 * * Learnable skills may have requirements that need to be first met even if
 *   the actor has the available resources.
 * * Skill learning requirements can include levels, having other skills
 *   learned, and/or enabled switches.
 * * Play animations upon learning a new skill inside the menu.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * Battle Test
 *
 * When doing a battle test through the database, all of an actor's learnable
 * skills through the Skill Learn System's notetags will become available for
 * the test battle to reduce the need to manually add them.
 *
 * ---
 *
 * VisuMZ_3_VictoryAftermath
 *
 * If VisuStella MZ's Victory Aftermath plugin is installed, the amount of
 * Skill Points and Ability Points earned can be visibly shown in the rewards
 * window.
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
 * === Ability Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting AP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Ability Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Ability Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting AP: x>
 * <Class name Starting AP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Ability Points the actor starts with in a
 *   specific class if Ability Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Ability Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Ability Points for.
 * - Replace 'name' with the name of the class to set starting Ability
 *   Points for.
 *
 * ---
 *
 * <AP Gain: x>
 * <User AP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Ability Points.
 * - Replace 'x' with a number representing the amount of Ability Points for
 *   the user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Ability Points gain from
 *   the Plugin Parameters.
 *
 * ---
 *
 * <Target AP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Ability Points.
 * - Replace 'x' with a number representing the amount of Ability Points for
 *   the target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <AP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Ability Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Ability Points to
 *   grant the player's party each.
 * - This effect will take over the "Per Enemy" Ability Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <AP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Ability Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Ability
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Ability Points are directly added, lost, or set.
 *
 * ---
 * 
 * === Skill Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting SP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Skill Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Skill Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting SP: x>
 * <Class name Starting SP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Skill Points the actor starts with in a specific
 *   class if Skill Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Skill Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Skill Points for.
 * - Replace 'name' with the name of the class to set starting Skill
 *   Points for.
 *
 * ---
 *
 * <SP Gain: x>
 * <User SP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Skill Points.
 * - Replace 'x' with a number representing the amount of Skill Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Skill Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target SP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Skill Points.
 * - Replace 'x' with a number representing the amount of Skill Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <SP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Skill Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Skill Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Skill Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <SP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Skill Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Skill
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Skill Points are directly added, lost, or set.
 *
 * ---
 * 
 * === Learnable Skills-Related Notetags ===
 * 
 * ---
 *
 * <Learn Skill: id>
 * <Learn Skills: id, id, id>
 * 
 * <Learn Skill: name>
 * <Learn Skills: name, name, name>
 *
 * - Used for: Class Notetags
 * - Determines what skills the class can learn through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the skill that can be
 *   learned through the Skill Learn System menu.
 * - Replace 'name' with the name of the skill that can be learned through the
 *   Skill Learn System menu.
 * - Multiple entries are permited.
 *
 * ---
 *
 * <Learn Skills>
 *  id
 *  id
 *  id
 *  name
 *  name
 *  name
 * </Learn Skills>
 *
 * - Used for: Class
 * - Determines what skills the class can learn through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the skill that can be
 *   learned through the Skill Learn System menu.
 * - Replace 'name' with the name of the skill that can be learned through the
 *   Skill Learn System menu.
 * - Multiple middle entries are permited.
 *
 * ---
 * 
 * === Skill Learn Cost-Related Notetags ===
 * 
 * ---
 *
 * <Learn AP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the Ability Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Ability Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Ability Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn CP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Determines the Class Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn JP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Determines the Job Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn SP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the Skill Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn Item id Cost: x>
 * <Learn Item name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the items needed to be consumed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the item needed to be 
 *   consumed.
 * - Replace 'name' with the name of the item needed to be consumed.
 * - Replace 'x' with a number representing the amount of the item needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Weapon id Cost: x>
 * <Learn Weapon name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the weapons needed to be consumed for an actor to learn the
 *   skill through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the weapon needed to be 
 *   consumed.
 * - Replace 'name' with the name of the weapon needed to be consumed.
 * - Replace 'x' with a number representing the amount of the weapon needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Armor id Cost: x>
 * <Learn Armor name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the armors needed to be consumed for an actor to learn the
 *   skill through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the armor needed to be 
 *   consumed.
 * - Replace 'name' with the name of the armor needed to be consumed.
 * - Replace 'x' with a number representing the amount of the armor needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Gold Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the gold cost needed for an actor to learn the skill through
 *   the Skill Learn System.
 * - Replace 'x' with a number representing the amount of gold needed to learn
 *   this skill.
 * - If this notetag is not used, then the gold cost will default to the value
 *   found in the settings.
 *
 * ---
 *
 * <Learn Skill Costs>
 *  AP: x
 * 
 *  SP: x
 * 
 *  Item id: x
 *  Item name: x
 * 
 *  Weapon id: x
 *  Weapon name: x
 * 
 *  Armor id: x
 *  Armor name: x
 *  
 *  Gold: x
 * </Learn Skill Costs>
 *
 * - Used for: Skill Notetags
 * - Determines a group of resources needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'id' with the ID's of items, weapons, armors to be consumed.
 * - Replace 'name' with the names of items, weapons, armors to be consumed.
 * - Replace 'x' with the quantities of the designated resource to be consumed.
 * - Insert multiple entries of items, weapons, and armors inside the notetags
 *   to add more resource entries.
 *
 * ---
 * 
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic Ability Point and Skill Point costs.
 * 
 * ---
 *
 * <JS Learn AP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn AP Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Ability Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Ability
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn AP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn CP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn CP Cost>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Class Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn CP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn JP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn JP Cost>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Job Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn JP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn SP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn SP Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Skill Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn SP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 * 
 * === Show Condition-Related Notetags ===
 * 
 * ---
 *
 * <Learn Show Level: x>
 *
 * - Used for: Skill Notetags
 * - Actors must be at least the required level in order for the skill to even
 *   appear visibly in the Skill Learn System menu.
 * - Replace 'x' with a number representing the required level for the actor
 *   in order for the skill to visibly appear.
 *
 * ---
 *
 * <Learn Show Skill: id>
 * <Learn Show Skill: name>
 * 
 * <Learn Show All Skills: id, id, id>
 * <Learn Show All Skills: name, name, name>
 * 
 * <Learn Show Any Skills: id, id, id>
 * <Learn Show Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - The actor must have already learned the above skills in order for the
 *   learnable skill to appear visibly in the Skill Learn System menu.
 * - Replace 'id' with a number representing the ID of the skill required to be
 *   known by the actor in order to appear visibly in the menu.
 * - Replace 'name' with the name of the skill required to be known by the
 *   actor in order to appear visibly in the menu.
 * - The 'All' notetag variant requires all of the listed skills to be known
 *   before the learnable skill will appear visibly in the menu.
 * - The 'Any' notetag variant requires any of the listed skills to be known
 *   before the learnable skill will appear visibly in the menu.
 *
 * ---
 *
 * <Learn Show Switch: x>
 * 
 * <Learn Show All Switches: x, x, x>
 * 
 * <Learn Show Any Switches: x, x, x>
 *
 * - Used for: Skill Notetags
 * - The switches must be in the ON position in order for the learnable skill
 *   to appear visibly in the Skill Learn System menu.
 * - Replace 'x' with a number representing the ID of the switch required to be
 *   in the ON position in order to appear visibly in the menu.
 * - The 'All' notetag variant requires all of the switches to be in the ON
 *   position before the learnable skill will appear visibly in the menu.
 * - The 'Any' notetag variant requires any of the switches to be in the ON
 *   position before the learnable skill will appear visibly in the menu.
 *
 * ---
 * 
 * === JavaScript Notetags: Show Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic determined show conditions.
 * 
 * ---
 *
 * <JS Learn Show>
 *  code
 *  code
 *  visible = code;
 * </JS Learn Show>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to determine if the skill will be
 *   visibly shown in the Skill Learn System menu.
 * - The 'visible' variable must result in a 'true' or 'false' value to
 *   determine if the skill will be visible.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - Any other show conditions must be met, too.
 *
 * ---
 *
 * <JS Learn Show List Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Show List Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is shown in the Skill Learn System skill list.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 *
 * <JS Learn Show Detail Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Show Detail Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is selected and the Detailed Skill Learn System
 *   resource cost window is opened.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 * 
 * === Require Condition-Related Notetags ===
 * 
 * ---
 *
 * <Learn Require Level: x>
 *
 * - Used for: Skill Notetags
 * - Actors must be at least the required level in order for the skill to be
 *   enabled in the Skill Learn System menu.
 * - Replace 'x' with a number representing the required level for the actor
 *   in order for the skill to visibly appear.
 *
 * ---
 *
 * <Learn Require Skill: id>
 * <Learn Require Skill: name>
 * 
 * <Learn Require All Skills: id, id, id>
 * <Learn Require All Skills: name, name, name>
 * 
 * <Learn Require Any Skills: id, id, id>
 * <Learn Require Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - The actor must have already learned the above skills in order for the
 *   learnable skill to be enabled in the Skill Learn System menu.
 * - Replace 'id' with a number representing the ID of the skill required to be
 *   known by the actor in order to be enabled in the menu.
 * - Replace 'name' with the name of the skill required to be known by the
 *   actor in order to be enabled in the menu.
 * - The 'All' notetag variant requires all of the listed skills to be known
 *   before the learnable skill will be enabled in the menu.
 * - The 'Any' notetag variant requires any of the listed skills to be known
 *   before the learnable skill will be enabled in the menu.
 *
 * ---
 *
 * <Learn Require Switch: x>
 * 
 * <Learn Require All Switches: x, x, x>
 * 
 * <Learn Require Any Switches: x, x, x>
 *
 * - Used for: Skill Notetags
 * - The switches must be in the ON position in order for the learnable skill
 *   to be enabled in the Skill Learn System menu.
 * - Replace 'x' with a number representing the ID of the switch required to be
 *   in the ON position in order to be enabled in the menu.
 * - The 'All' notetag variant requires all of the switches to be in the ON
 *   position before the learnable skill will be enabled in the menu.
 * - The 'Any' notetag variant requires any of the switches to be in the ON
 *   position before the learnable skill will be enabled in the menu.
 *
 * ---
 * 
 * === JavaScript Notetags: Requirement Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic determined learning requirement conditions.
 * 
 * ---
 *
 * <JS Learn Requirements>
 *  code
 *  code
 *  enabled = code;
 * </JS Learn Requirements>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to determine if the skill will be
 *   enabled for learning in the Skill Learn System menu.
 * - The 'enabled' variable must result in a 'true' or 'false' value to
 *   determine if the skill will be enabled.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - Any other requirement conditions must be met, too.
 *
 * ---
 *
 * <JS Learn Requirements List Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Requirements List Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is shown in the Skill Learn System skill list
 *   as long as the requirements have to be met.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 *
 * <JS Learn Requirements Detail Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Requirements Detail Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is selected and the Detailed Skill Learn System
 *   resource cost window is opened as long as the requirements have to be met.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 * 
 * === Animation-Related Notetags ===
 * 
 * ---
 *
 * <Learn Skill Animation: id>
 * <Learn Skill Animation: id, id, id>
 * 
 * - Used for: Skill Notetags
 * - Plays the animation(s) when this skill is learned through the Skill Learn
 *   System's menu.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 *
 * ---
 * 
 * <Learn Skill Fade Speed: x>
 * 
 * - Used for: Skill Notetags
 * - This determines the speed at which the skill's icon fades in during the
 *   skill learning animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
 * 
 * ---
 * 
 * <Learn Skill Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Skill Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   skill's icon during learning instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of learning skills, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === JavaScript Notetags: On Learning Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * produce special effects when the skill is learned.
 * 
 * ---
 *
 * <JS On Learn Skill>
 *  code
 *  code
 *  code
 * </JS On Learn Skill>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform the desired actions when
 *   the skill is learned.
 * - This will apply to any time the skill is learned by an actor, even if it
 *   is through natural leveling or through the Skill Learn System menu.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
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
 * === Ability Points Plugin Commands ===
 * 
 * ---
 *
 * Ability Points: Gain
 * - The target actor(s) gains Ability Points.
 * - Gained amounts are affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Add
 * - The target actor(s) receives Ability Points.
 * - Received amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Lose
 * - The target actor(s) loses Ability Points.
 * - Lost amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Set
 * - Changes the exact Ability Points for the target actor(s).
 * - Changed amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === Skill Points Plugin Commands ===
 * 
 * ---
 *
 * Skill Points: Gain
 * - The target actor(s) gains Skill Points.
 * - Gained amounts are affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Add
 * - The target actor(s) receives Skill Points.
 * - Received amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Lose
 * - The target actor(s) loses Skill Points.
 * - Lost amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Set
 * - Changes the exact Skill Points for the target actor(s).
 * - Changed amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Show Skill Learn in Skill Menu?
 * - Shows/hides Skill Learn inside the skill menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Skill Learn inside the skill menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for the Skill Learn System. These determine the settings
 * that are used for the Skill Learn System menu's main screen.
 *
 * ---
 *
 * Visual
 * 
 *   Displayed Costs:
 *   - Select which cost types to display in the skill entry.
 *   - This also determines the order they are displayed.
 *     - AP - Ability Points
 *     - SP - Skill Points
 *     - Item - Item Costs
 *     - Weapon - Weapon Costs
 *     - Armor - Armor Costs
 *     - Gold - Gold Costs
 * 
 *   JS: Draw Status:
 *   - JavaScript code used to draw in Window_SkillStatus when the Skill Learn
 *     System is active.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Learned Text:
 *   - This is the text that appears if the skill has been learned.
 *   - You may use text codes.
 * 
 *   Requirements
 * 
 *     Requirement Header:
 *     - Header for requirements.
 *     - %1 - Requirements (all of them)
 * 
 *     Separation Format:
 *     - This determines how the requirements are separated.
 *     - %1 - Previous Requirement, %2 - Second Requirement
 * 
 *     Level Format:
 *     - This how level is displayed.
 *     - %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * 
 *     Skill Format:
 *     - This how required skills are displayed.
 *     - %1 - Icon, %2 - Skill Name
 * 
 *     Switch Format:
 *     - This how required switches are displayed.
 *     - %1 - Switch Name
 * 
 *   Costs
 * 
 *     Separation Format:
 *     - This determines how the costs are separated from one another.
 *     - %1 - Previous Cost, %2 - Second Cost
 * 
 *     Item Format:
 *     - Determine how items are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Item Name
 * 
 *     Weapon Format:
 *     - Determine how weapons are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Weapon Name
 * 
 *     Armor Format:
 *     - Determine how armors are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Armor Name
 * 
 *     Gold Format:
 *     - Determine how gold is displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Currency Vocabulary
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Access Settings
 * ============================================================================
 *
 * Menu Access settings for Skill Learn System. The Skill Learn System is
 * accessible normally through the in-game Skill menu.
 *
 * ---
 *
 * Main Access Settings
 * 
 *   Command Name:
 *   - Name of the 'Skill Learn' option in the Menu.
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Skill Learn?
 * 
 *   Show in Menu?:
 *   - Add the 'Skill Learn' option to the Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Animation settings for the Skill Learn System. By default, an animation will
 * be played upon learning a skill through the Skill Learn System's menu in
 * order to provide player feedback about learning the said skill.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when learning a skill?
 * 
 *   Show Windows?:
 *   - Show windows during a skill learn animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when learning.
 *
 * ---
 *
 * Skill Sprite
 * 
 *   Scale:
 *   - How big do you want the skill sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the icon to fade in?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Sound Settings
 * ============================================================================
 *
 * Settings for the sound effect played when learning a new skill through the
 * Skill Learn System.
 *
 * ---
 *
 * Settings
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
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings for the Skill Learn System. There are two new windows added
 * into the Skill menu through this plugin: the Detail Window and the Confirm
 * Window.
 * 
 * The Detail Window will list the required costs of learning a skill in detail
 * in case the icons provided are not clear enough to show what's needed.
 * 
 * The Confirm Window is a window that appears towards the bottom to let the
 * player make a confirmation before deciding to learn the skill.
 *
 * ---
 *
 * Detail Window
 * 
 *   Requirements
 * 
 *     Requirement Title:
 *     - Text used when drawing the learning requirements.
 *     - %1 - Skill Icon, %2 - Skill Name
 * 
 *     Requirement Met:
 *     - This how met requirements look.
 *     - %1 - Requirement Text
 * 
 *     Requirement Not Met:
 *     - This how met requirements look.
 *     - %1 - Requirement Text
 * 
 *     Requirement Level:
 *     - This how level is displayed.
 *     - %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * 
 *     Requirement Skill:
 *     - This how required skills are displayed.
 *     - %1 - Icon, %2 - Skill Name
 * 
 *     Requirement Switch:
 *     - This how required switches are displayed.
 *     - %1 - Switch Name
 * 
 *   Costs
 * 
 *     Cost Title:
 *     - Text used when drawing the learning costs.
 *     - %1 - Skill Icon, %2 - Skill Name
 * 
 *     Cost Name:
 *     - Text used to label the resource being consumed.
 * 
 *     Cost Quantity:
 *     - Text used to label the cost of the resource.
 * 
 *     Cost of Owned:
 *     - Text used to label the amount of the resource in possession.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Confirm Window
 * 
 *   Confirm Text:
 *   - Text used for the Confirm command.
 *   - Text codes can be used.
 * 
 *   Cancel Text:
 *   - Text used for the Cancel command.
 *   - Text codes can be used.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Ability Points Settings
 * ============================================================================
 *
 * Ability Points are an actor-only resource used as a currency for this
 * plugin. You can determine how they appear in-game, how they're earned, and
 * what kind of mechanics are involved with them. Ability Points can also be 
 * used in other VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Ability Points:
 *   - Do you want Ability Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Ability Points an actor can have?
 *   - Use 0 for unlimited Ability Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Ability Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Ability Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Ability Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Ability Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Ability Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Ability Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Ability Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Ability Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much AP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Ability Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Ability Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawAbilityPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorAbilityPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Ability Points aren't shared or if you want the Ability
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Points Settings
 * ============================================================================
 *
 * Skill Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Skill Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Skill Points:
 *   - Do you want Skill Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Skill Points an actor can have?
 *   - Use 0 for unlimited Skill Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Skill Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Skill Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Skill Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Skill Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Skill Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Skill Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Skill Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Skill Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much SP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Skill Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Skill Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawSkillPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorSkillPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Skill Points aren't shared or if you want the Skill
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
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
 * Version 1.10: December 15, 2022
 * * Bug Fixes!
 * ** Fixed a visual listing bug effect when 'CP' and 'JP' are listed under
 *    costs but the VisuMZ Class Change System plugin isn't present. Fix made
 *    by Olivia.
 * 
 * Version 1.09: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: March 24, 2022
 * * Documentation Update!
 * ** Fixed a typo for missing a "/" in the <Learn Skills> group notetag.
 * 
 * Version 1.07: February 10, 2022
 * * Bug Fixes!
 * ** Costs for CP and JP will have better fail safes to not automatically
 *    reduce to 0 under specific conditions when learning skills. Fix by Arisu.
 * 
 * Version 1.06: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Learn Skill Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      skill's icon during learning instead.
 * 
 * Version 1.04: December 18, 2020
 * * Bug Fixes!
 * ** Notetags that utilize multiple numeric ID's instead of skill names should
 *    now be working properly. Fix made by Yanfly.
 * 
 * Version 1.03: December 11, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** The Plugin Parameter for "Displayed Costs" have been updated to contain
 *    compatibility for a future plugin.
 * ** The Plugin Parameter for "JS: Draw Status" has been updated to contain
 *    compatibility for a future plugin.
 * *** To quickly acquire the new changes for the above Plugin Parameters,
 *     delete the "General" settings from the main Plugin Parameters page, then
 *     open them up again. These settings will be defaulted to the new
 *     additions added for the plugin. Warning! Old settings will be lost.
 * * New Features!
 * ** Added <Learn CP Cost: x>, <Learn JP Cost: x>, <JS Learn CP Cost>,
 *    <JS Learn JP Cost> notetags. Added by Arisu.
 * 
 * Version 1.02: November 29, 2020
 * * Bug Fixes!
 * ** The plugin should no longer be dependent on Skills & States Core. Fix
 *    made by Arisu.
 * 
 * Version 1.01: November 22, 2020
 * * Bug Fixes!
 * ** Game no longer crashes when displaying AP/SP rewards for those without
 *    the Victory Aftermath plugin. Fix made by Yanfly.
 *
 * Version 1.00: November 30, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsGain
 * @text Ability Points: Gain
 * @desc The target actor(s) gains Ability Points.
 * Gained amounts are affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsAdd
 * @text Ability Points: Add
 * @desc The target actor(s) receives Ability Points.
 * Received amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsLose
 * @text Ability Points: Lose
 * @desc The target actor(s) loses Ability Points.
 * Lost amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsSet
 * @text Ability Points: Set
 * @desc Changes the exact Ability Points for the target actor(s).
 * Changed amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsGain
 * @text Skill Points: Gain
 * @desc The target actor(s) gains Skill Points.
 * Gained amounts are affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsAdd
 * @text Skill Points: Add
 * @desc The target actor(s) receives Skill Points.
 * Received amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsLose
 * @text Skill Points: Lose
 * @desc The target actor(s) loses Skill Points.
 * Lost amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsSet
 * @text Skill Points: Set
 * @desc Changes the exact Skill Points for the target actor(s).
 * Changed amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowSkillLearnSystemMenu
 * @text System: Show Skill Learn in Skill Menu?
 * @desc Shows/hides Skill Learn inside the skill menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Skill Learn inside the skill menu.
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
 * @param SkillLearnSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Scene_SkillLearn
 *
 * @param General:struct
 * @text General Settings
 * @parent Scene_SkillLearn
 * @type struct<General>
 * @desc General settings for the Skill Learn System.
 * @default {"Visual":"","DisplayedCosts:arraystr":"[\"AP\",\"SP\",\"Item\",\"Weapon\",\"Armor\",\"Gold\"]","StatusWindowDrawJS:func":"\"// Draw Face\\nconst fx = this.colSpacing() / 2;\\nconst fh = this.innerHeight;\\nconst fy = fh / 2 - this.lineHeight() * 1.5;\\nthis.drawActorFace(this._actor, fx + 1, 0, 144, fh);\\nthis.drawActorSimpleStatus(this._actor, fx + 180, fy);\\n\\n// Return if Window Size is Too Small\\nlet sx = (this.colSpacing() / 2) + 180 + 180 + 180;\\nlet sw = this.innerWidth - sx - 2;\\nif (sw < 300) return;\\n\\n// Draw Costs\\n// Compatibility Target\\nconst costs = this.getSkillLearnDisplayedCosts();\\nconst maxEntries = Math.floor(this.innerHeight / this.lineHeight());\\nconst maxCol = Math.ceil(costs.length / maxEntries);\\nlet cx = sx;\\nlet cy = Math.max(Math.round((this.innerHeight - (this.lineHeight() * Math.ceil(costs.length / maxCol))) / 2), 0);\\nconst by = cy;\\nlet cw = (this.innerWidth - cx - (this.itemPadding() * 2 * maxCol)) / maxCol;\\nif (maxCol === 1) {\\n    cw = Math.min(ImageManager.faceWidth, cw);\\n    cx += Math.round((this.innerWidth - cx - (this.itemPadding() * 2) - cw) / 2);\\n}\\nfor (const cost of costs) {\\n    switch (cost) {\\n\\n        case 'AP':\\n            this.drawActorAbilityPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            break;\\n\\n        case 'CP':\\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\\n                this.drawActorClassPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            }\\n            break;\\n\\n        case 'JP':\\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\\n                this.drawActorJobPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            }\\n            break;\\n\\n        case 'SP':\\n            this.drawActorSkillPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            break;\\n\\n        case 'Gold':\\n            this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, cx, cy, cw);\\n            break;\\n\\n        default:\\n            continue;\\n    }\\n    cy += this.lineHeight();\\n    if (cy + this.lineHeight() > this.innerHeight) {\\n        cy = by;\\n        cx += cw + (this.itemPadding() * 2);\\n    }\\n}\"","Vocabulary":"","Learned:str":"Learned","Requirements":"","RequireFmt:str":"Requires %1","ReqSeparateFmt:str":"%1, %2","ReqLevelFmt:str":"\\C[16]%3\\C[0]%1","ReqSkillFmt:str":"%1\\C[16]%2\\C[0]","ReqSwitchFmt:str":"\\C[16]%1\\C[0]","Costs":"","SeparationFmt:str":"%1  %2","ItemFmt:str":"×%1%2","WeaponFmt:str":"×%1%2","ArmorFmt:str":"×%1%2","GoldFmt:str":"×%1%2"}
 *
 * @param MenuAccess:struct
 * @text Menu Access Settings
 * @parent Scene_SkillLearn
 * @type struct<MenuAccess>
 * @desc Menu Access settings for Skill Learn System.
 * @default {"Name:str":"Learn","Icon:num":"87","ShowMenu:eval":"true"}
 *
 * @param Animation:struct
 * @text Animation Settings
 * @parent Scene_SkillLearn
 * @type struct<Animation>
 * @desc Animation settings for the Skill Learn System.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"true","Animations:arraynum":"[\"40\",\"48\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Learn Sound Effect
 * @parent Scene_SkillLearn
 * @type struct<Sound>
 * @desc Settings for the sound effect played when learning a new skill through the Skill Learn System.
 * @default {"name:str":"Skill3","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param Window:struct
 * @text Window Settings
 * @parent Scene_SkillLearn
 * @type struct<Window>
 * @desc Window settings for the Skill Learn System.
 * @default {"DetailWindow":"","Requirements":"","RequirementTitle:str":"\\C[16]%1%2 Requirements\\C[0]","ReqMetFmt:str":"\\C[24]✔ %1\\C[0]","ReqNotMetFmt:str":"\\C[0]✘ %1\\C[0]","ReqLevelFmt:str":"\\I[87]%2 %1 Reached","ReqSkillFmt:str":"%1%2 Learned","ReqSwitchFmt:str":"\\I[160]%1","Costs":"","LearningTitle:str":"\\C[16]Learning\\C[0] %1%2","IngredientName:str":"\\C[16]Resource\\C[0]","IngredientCost:str":"\\C[16]Cost\\C[0]","IngredientOwned:str":"\\C[16]Owned\\C[0]","DetailWindow_BgType:num":"0","DetailWindow_RectJS:func":"\"const skillWindowRect = this.itemWindowRect();\\nconst wx = skillWindowRect.x;\\nconst wy = skillWindowRect.y;\\nconst ww = skillWindowRect.width;\\nconst wh = skillWindowRect.height - this.calcWindowHeight(2, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","ConfirmWindow":"","ConfirmCmd:str":"\\I[164]Learn","CancelCmd:str":"\\I[168]Cancel","ConfirmWindow_BgType:num":"0","ConfirmWindow_RectJS:func":"\"const skillWindowRect = this.itemWindowRect();\\nconst ww = skillWindowRect.width;\\nconst wh = this.calcWindowHeight(2, false);\\nconst wx = skillWindowRect.x;\\nconst wy = skillWindowRect.y + skillWindowRect.height - wh;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param Resources
 *
 * @param AbilityPoints:struct
 * @text Ability Points Settings
 * @parent Resources
 * @type struct<AbilityPoints>
 * @desc Settings for Ability Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"true","DefaultCost:num":"0","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"78","Vocabulary":"","FullText:str":"Ability Points","AbbrText:str":"AP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"10 + Math.randomInt(5)","PerLevelUp:str":"0","PerEnemy:str":"50 + Math.randomInt(10)","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"true","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"true","AftermathText:str":"+%1 %2"}
 *
 * @param SkillPoints:struct
 * @text Skill Points Settings
 * @parent Resources
 * @type struct<SkillPoints>
 * @desc Settings for Skill Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"false","DefaultCost:num":"1","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"79","Vocabulary":"","FullText:str":"Skill Points","AbbrText:str":"SP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"0","PerLevelUp:str":"100","PerEnemy:str":"0","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"false","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"false","AftermathText:str":"+%1 %2"}
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
 * @param Visual
 * 
 * @param DisplayedCosts:arraystr
 * @text Displayed Costs
 * @parent Visual
 * @type select[]
 * @option AP - Ability Points
 * @value AP
 * @option CP - Class Points (Requires VisuMZ_2_ClassChangeSystem)
 * @value CP
 * @option JP - Job Points (Requires VisuMZ_2_ClassChangeSystem)
 * @value JP
 * @option SP - Skill Points
 * @value SP
 * @option Item - Item Costs
 * @value Item
 * @option Weapon - Weapon Costs
 * @value Weapon
 * @option Armor - Armor Costs
 * @value Armor
 * @option Gold - Gold Costs
 * @value Gold
 * @desc Select which cost types to display in the skill entry.
 * This also determines the order they are displayed.
 * @default ["AP","SP","Item","Weapon","Armor","Gold"]
 *
 * @param StatusWindowDrawJS:func
 * @text JS: Draw Status
 * @parent Visual
 * @type note
 * @desc JavaScript code used to draw in Window_SkillStatus when the Skill Learn System is active.
 * @default "// Draw Face\nconst fx = this.colSpacing() / 2;\nconst fh = this.innerHeight;\nconst fy = fh / 2 - this.lineHeight() * 1.5;\nthis.drawActorFace(this._actor, fx + 1, 0, 144, fh);\nthis.drawActorSimpleStatus(this._actor, fx + 180, fy);\n\n// Return if Window Size is Too Small\nlet sx = (this.colSpacing() / 2) + 180 + 180 + 180;\nlet sw = this.innerWidth - sx - 2;\nif (sw < 300) return;\n\n// Draw Costs\n// Compatibility Target\nconst costs = this.getSkillLearnDisplayedCosts();\nconst maxEntries = Math.floor(this.innerHeight / this.lineHeight());\nconst maxCol = Math.ceil(costs.length / maxEntries);\nlet cx = sx;\nlet cy = Math.max(Math.round((this.innerHeight - (this.lineHeight() * Math.ceil(costs.length / maxCol))) / 2), 0);\nconst by = cy;\nlet cw = (this.innerWidth - cx - (this.itemPadding() * 2 * maxCol)) / maxCol;\nif (maxCol === 1) {\n    cw = Math.min(ImageManager.faceWidth, cw);\n    cx += Math.round((this.innerWidth - cx - (this.itemPadding() * 2) - cw) / 2);\n}\nfor (const cost of costs) {\n    switch (cost) {\n\n        case 'AP':\n            this.drawActorAbilityPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            break;\n\n        case 'CP':\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\n                this.drawActorClassPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            }\n            break;\n\n        case 'JP':\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\n                this.drawActorJobPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            }\n            break;\n\n        case 'SP':\n            this.drawActorSkillPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            break;\n\n        case 'Gold':\n            this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, cx, cy, cw);\n            break;\n\n        default:\n            continue;\n    }\n    cy += this.lineHeight();\n    if (cy + this.lineHeight() > this.innerHeight) {\n        cy = by;\n        cx += cw + (this.itemPadding() * 2);\n    }\n}"
 *
 * @param Vocabulary
 *
 * @param Learned:str
 * @text Learned Text
 * @parent Vocabulary
 * @desc This is the text that appears if the skill has been
 * learned. You may use text codes.
 * @default Learned
 *
 * @param Requirements
 * @parent Vocabulary
 *
 * @param RequireFmt:str
 * @text Requirement Header
 * @parent Requirements
 * @desc Header for requirements.
 * %1 - Requirements (all of them)
 * @default Requires %1
 *
 * @param ReqSeparateFmt:str
 * @text Separation Format
 * @parent Requirements
 * @desc This determines how the requirements are separated.
 * %1 - Previous Requirement, %2 - Second Requirement
 * @default %1, %2
 *
 * @param ReqLevelFmt:str
 * @text Level Format
 * @parent Requirements
 * @desc This how level is displayed.
 * %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * @default \C[16]%3\C[0]%1
 *
 * @param ReqSkillFmt:str
 * @text Skill Format
 * @parent Requirements
 * @desc This how required skills are displayed.
 * %1 - Icon, %2 - Skill Name
 * @default %1\C[16]%2\C[0]
 *
 * @param ReqSwitchFmt:str
 * @text Switch Format
 * @parent Requirements
 * @desc This how required switches are displayed.
 * %1 - Switch Name
 * @default \C[16]%1\C[0]
 *
 * @param Costs
 * @parent Vocabulary
 *
 * @param SeparationFmt:str
 * @text Separation Format
 * @parent Costs
 * @desc This determines how the costs are separated from one another.
 * %1 - Previous Cost, %2 - Second Cost
 * @default %1  %2
 *
 * @param ItemFmt:str
 * @text Item Format
 * @parent Costs
 * @desc Determine how items are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Item Name
 * @default ×%1%2
 *
 * @param WeaponFmt:str
 * @text Weapon Format
 * @parent Costs
 * @desc Determine how weapons are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Weapon Name
 * @default ×%1%2
 *
 * @param ArmorFmt:str
 * @text Armor Format
 * @parent Costs
 * @desc Determine how armors are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Armor Name
 * @default ×%1%2
 *
 * @param GoldFmt:str
 * @text Gold Format
 * @parent Costs
 * @desc Determine how gold is displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Currency Vocabulary
 * @default ×%1%2
 *
 */
/* ----------------------------------------------------------------------------
 * MenuAccess Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuAccess:
 *
 * @param Name:str
 * @text Command Name
 * @desc Name of the 'Skill Learn' option in the Menu.
 * @default Learn
 *
 * @param Icon:num
 * @text Icon
 * @desc What is the icon you want to use to represent Skill Learn?
 * @default 87
 *
 * @param ShowMenu:eval
 * @text Show in Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Skill Learn' option to the Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Animation:
 *
 * @param General
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @parent General
 * @type boolean
 * @on Show
 * @off Skip
 * @desc Show animations when learning a skill?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during a skill learn animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when learning.
 * @default ["40","48"]
 *
 * @param Sprite
 * @text Skill Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the skill sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the icon to fade in?
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Skill3
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param DetailWindow
 * @text Detail Window
 * 
 * @param Requirements
 * @parent DetailWindow
 *
 * @param RequirementTitle:str
 * @text Requirement Title
 * @parent Requirements
 * @desc Text used when drawing the learning requirements.
 * %1 - Skill Icon, %2 - Skill Name
 * @default \C[16]%1%2 Requirements\C[0]
 *
 * @param ReqMetFmt:str
 * @text Requirement Met
 * @parent Requirements
 * @desc This how met requirements look.
 * %1 - Requirement Text
 * @default \C[24]✔ %1\C[0]
 *
 * @param ReqNotMetFmt:str
 * @text Requirement Not Met
 * @parent Requirements
 * @desc This how met requirements look.
 * %1 - Requirement Text
 * @default \C[0]✘ %1\C[0]
 *
 * @param ReqLevelFmt:str
 * @text Requirement Level
 * @parent Requirements
 * @desc This how level is displayed.
 * %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * @default \I[87]%2 %1 Reached
 *
 * @param ReqSkillFmt:str
 * @text Requirement Skill
 * @parent Requirements
 * @desc This how required skills are displayed.
 * %1 - Icon, %2 - Skill Name
 * @default %1%2 Learned
 *
 * @param ReqSwitchFmt:str
 * @text Requirement Switch
 * @parent Requirements
 * @desc This how required switches are displayed.
 * %1 - Switch Name
 * @default \I[160]%1
 * 
 * @param Costs
 * @parent DetailWindow
 *
 * @param LearningTitle:str
 * @text Cost Title
 * @parent Costs
 * @desc Text used when drawing the learning costs.
 * %1 - Skill Icon, %2 - Skill Name
 * @default \C[16]Learning\C[0] %1%2
 *
 * @param IngredientName:str
 * @text Cost Name
 * @parent Costs
 * @desc Text used to label the resource being consumed.
 * @default \C[16]Resource\C[0]
 *
 * @param IngredientCost:str
 * @text Cost Quantity
 * @parent Costs
 * @desc Text used to label the cost of the resource.
 * @default \C[16]Cost\C[0]
 *
 * @param IngredientOwned:str
 * @text Cost of Owned
 * @parent Costs
 * @desc Text used to label the amount of the resource in possession.
 * @default \C[16]Owned\C[0]
 *
 * @param DetailWindow_BgType:num
 * @text Background Type
 * @parent DetailWindow
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
 * @param DetailWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent DetailWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const skillWindowRect = this.itemWindowRect();\nconst wx = skillWindowRect.x;\nconst wy = skillWindowRect.y;\nconst ww = skillWindowRect.width;\nconst wh = skillWindowRect.height - this.calcWindowHeight(2, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ConfirmWindow
 * @text Confirm Window
 *
 * @param ConfirmCmd:str
 * @text Confirm Text
 * @parent ConfirmWindow
 * @desc Text used for the Confirm command.
 * Text codes can be used.
 * @default \I[164]Learn
 *
 * @param CancelCmd:str
 * @text Cancel Text
 * @parent ConfirmWindow
 * @desc Text used for the Cancel command.
 * Text codes can be used.
 * @default \I[168]Cancel
 *
 * @param ConfirmWindow_BgType:num
 * @text Background Type
 * @parent ConfirmWindow
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
 * @param ConfirmWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent ConfirmWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const skillWindowRect = this.itemWindowRect();\nconst ww = skillWindowRect.width;\nconst wh = this.calcWindowHeight(2, false);\nconst wx = skillWindowRect.x;\nconst wy = skillWindowRect.y + skillWindowRect.height - wh;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Ability Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AbilityPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Ability Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Ability Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default true
 *
 * @param DefaultCost:num
 * @text Default Cost
 * @parent Mechanics
 * @type number
 * @desc What's the default AP cost of a skill when trying to learn
 * it through the Skill Learn System?
 * @default 0
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Ability Points an actor can have?
 * Use 0 for unlimited Ability Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Ability Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Ability Points?
 * @default 78
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Ability Points appears in-game.
 * @default Ability Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Ability Points appears in-game.
 * @default AP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[5]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Ability Points should an actor gain per action?
 * You may use code.
 * @default 10 + Math.randomInt(5)
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Ability Points should an actor gain per level up?
 * You may use code.
 * @default 0
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Ability Points should an actor gain per enemy?
 * You may use code.
 * @default 50 + Math.randomInt(10)
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Ability Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much AP an actor has earned in battle during the
 * victory phase?
 * @default true
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Ability Points as
 * the main acquired resource in the actor windows?
 * @default true
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Skill Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Skill Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param DefaultCost:num
 * @text Default Cost
 * @parent Mechanics
 * @type number
 * @desc What's the default SP cost of a skill when trying to learn
 * it through the Skill Learn System?
 * @default 1
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Skill Points an actor can have?
 * Use 0 for unlimited Skill Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Skill Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Skill Points?
 * @default 79
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Skill Points appears in-game.
 * @default Skill Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Skill Points appears in-game.
 * @default SP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[4]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Skill Points should an actor gain per action?
 * You may use code.
 * @default 0
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Skill Points should an actor gain per level up?
 * You may use code.
 * @default 100
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Skill Points should an actor gain per enemy?
 * You may use code.
 * @default 0
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Skill Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much SP an actor has earned in battle during the
 * victory phase?
 * @default false
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Skill Points as
 * the main acquired resource in the actor windows?
 * @default false
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
//=============================================================================

const _0x1841c2=_0x5250;(function(_0x30cea8,_0x3b5370){const _0x3ad3f9=_0x5250,_0xbeb0f8=_0x30cea8();while(!![]){try{const _0x2bdfe8=-parseInt(_0x3ad3f9(0x3c2))/0x1+parseInt(_0x3ad3f9(0x35e))/0x2+-parseInt(_0x3ad3f9(0x266))/0x3+-parseInt(_0x3ad3f9(0x387))/0x4+parseInt(_0x3ad3f9(0x2b8))/0x5+-parseInt(_0x3ad3f9(0x3e8))/0x6*(parseInt(_0x3ad3f9(0x341))/0x7)+parseInt(_0x3ad3f9(0x35d))/0x8;if(_0x2bdfe8===_0x3b5370)break;else _0xbeb0f8['push'](_0xbeb0f8['shift']());}catch(_0xa9dee7){_0xbeb0f8['push'](_0xbeb0f8['shift']());}}}(_0x4adc,0x2c3e3));var label=_0x1841c2(0x203),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1841c2(0x201)](function(_0x44a08d){const _0x502d19=_0x1841c2;return _0x44a08d['status']&&_0x44a08d[_0x502d19(0x23d)]['includes']('['+label+']');})[0x0];function _0x5250(_0x50968c,_0x5529d0){const _0x4adc5a=_0x4adc();return _0x5250=function(_0x5250d2,_0x4150d9){_0x5250d2=_0x5250d2-0x1b4;let _0x143d60=_0x4adc5a[_0x5250d2];return _0x143d60;},_0x5250(_0x50968c,_0x5529d0);}VisuMZ[label][_0x1841c2(0x1fa)]=VisuMZ[label][_0x1841c2(0x1fa)]||{},VisuMZ[_0x1841c2(0x311)]=function(_0x3a84f5,_0x9d7b2c){const _0x96bd4a=_0x1841c2;for(const _0x15165d in _0x9d7b2c){if(_0x15165d[_0x96bd4a(0x225)](/(.*):(.*)/i)){if('KqCSP'!=='KqCSP')return this[_0x96bd4a(0x239)](_0x560862);else{const _0x37dcef=String(RegExp['$1']),_0x49f5b0=String(RegExp['$2'])[_0x96bd4a(0x380)]()[_0x96bd4a(0x28e)]();let _0x60f934,_0x3b75c7,_0x53590f;switch(_0x49f5b0){case'NUM':_0x60f934=_0x9d7b2c[_0x15165d]!==''?Number(_0x9d7b2c[_0x15165d]):0x0;break;case _0x96bd4a(0x40a):_0x3b75c7=_0x9d7b2c[_0x15165d]!==''?JSON[_0x96bd4a(0x1b4)](_0x9d7b2c[_0x15165d]):[],_0x60f934=_0x3b75c7['map'](_0x42d5db=>Number(_0x42d5db));break;case'EVAL':_0x60f934=_0x9d7b2c[_0x15165d]!==''?eval(_0x9d7b2c[_0x15165d]):null;break;case'ARRAYEVAL':_0x3b75c7=_0x9d7b2c[_0x15165d]!==''?JSON[_0x96bd4a(0x1b4)](_0x9d7b2c[_0x15165d]):[],_0x60f934=_0x3b75c7[_0x96bd4a(0x460)](_0x36683c=>eval(_0x36683c));break;case _0x96bd4a(0x1e4):_0x60f934=_0x9d7b2c[_0x15165d]!==''?JSON[_0x96bd4a(0x1b4)](_0x9d7b2c[_0x15165d]):'';break;case _0x96bd4a(0x38c):_0x3b75c7=_0x9d7b2c[_0x15165d]!==''?JSON[_0x96bd4a(0x1b4)](_0x9d7b2c[_0x15165d]):[],_0x60f934=_0x3b75c7[_0x96bd4a(0x460)](_0x213cd1=>JSON['parse'](_0x213cd1));break;case _0x96bd4a(0x33e):_0x60f934=_0x9d7b2c[_0x15165d]!==''?new Function(JSON[_0x96bd4a(0x1b4)](_0x9d7b2c[_0x15165d])):new Function(_0x96bd4a(0x208));break;case _0x96bd4a(0x36d):_0x3b75c7=_0x9d7b2c[_0x15165d]!==''?JSON[_0x96bd4a(0x1b4)](_0x9d7b2c[_0x15165d]):[],_0x60f934=_0x3b75c7[_0x96bd4a(0x460)](_0x4f0305=>new Function(JSON['parse'](_0x4f0305)));break;case _0x96bd4a(0x1cb):_0x60f934=_0x9d7b2c[_0x15165d]!==''?String(_0x9d7b2c[_0x15165d]):'';break;case _0x96bd4a(0x357):_0x3b75c7=_0x9d7b2c[_0x15165d]!==''?JSON['parse'](_0x9d7b2c[_0x15165d]):[],_0x60f934=_0x3b75c7['map'](_0x14260e=>String(_0x14260e));break;case _0x96bd4a(0x37c):_0x53590f=_0x9d7b2c[_0x15165d]!==''?JSON[_0x96bd4a(0x1b4)](_0x9d7b2c[_0x15165d]):{},_0x60f934=VisuMZ[_0x96bd4a(0x311)]({},_0x53590f);break;case _0x96bd4a(0x2a6):_0x3b75c7=_0x9d7b2c[_0x15165d]!==''?JSON['parse'](_0x9d7b2c[_0x15165d]):[],_0x60f934=_0x3b75c7['map'](_0x116b1f=>VisuMZ['ConvertParams']({},JSON[_0x96bd4a(0x1b4)](_0x116b1f)));break;default:continue;}_0x3a84f5[_0x37dcef]=_0x60f934;}}}return _0x3a84f5;},(_0x119432=>{const _0x5e5fb0=_0x1841c2,_0x3d4f4a=_0x119432[_0x5e5fb0(0x34f)];for(const _0x564b28 of dependencies){if(_0x5e5fb0(0x361)===_0x5e5fb0(0x361)){if(!Imported[_0x564b28]){if(_0x5e5fb0(0x2a3)===_0x5e5fb0(0x2a3)){alert(_0x5e5fb0(0x23b)['format'](_0x3d4f4a,_0x564b28)),SceneManager[_0x5e5fb0(0x2ed)]();break;}else{_0x4bad6b=_0x2d78c3||_0x5e5fb0(0x1d7);const _0x4d6e26=_0x5e5fb0(0x305)['format'](_0x231dc8[_0x5e5fb0(0x459)]),_0x2e1f38=_0x3a3c6d['abilityPointsFmt'],_0x130d7e=_0x2e1f38[_0x5e5fb0(0x21c)](_0x4a5c3d,_0x508a0a[_0x5e5fb0(0x3fe)],_0x4d6e26,_0x27e9c9['abilityPointsFull']),_0x6474d2=this[_0x5e5fb0(0x300)](_0x130d7e)['width'];if(_0x233847===_0x5e5fb0(0x1d7))_0x20de99+=0x0;else _0xdf4373===_0x5e5fb0(0x3a2)?_0x32d82b+=_0x52bde0[_0x5e5fb0(0x240)]((_0x33e5f9-_0x6474d2)/0x2):_0xec0ac6+=_0x1daa76-_0x6474d2;this[_0x5e5fb0(0x3a9)](_0x130d7e,_0x38afb5,_0x478f43);}}}else{const _0x277d2e=_0x29779b[_0x5e5fb0(0x2b3)];if(_0x277d2e[_0x5e5fb0(0x225)](_0x3caf4b)){const _0xa025db=_0x4c4d69(_0x13e263['$1']),_0x560b52=_0x5e5fb0(0x1e1)[_0x5e5fb0(0x21c)](_0xa025db),_0x3aee28=_0x4d9e7a['SkillLearnSystem']['createKeyJS'](_0x2fb048,_0x48ac4d);_0x458ce3[_0x5e5fb0(0x203)]['JS'][_0x3aee28]=new _0x1c1dc5(_0x560b52);}}}const _0x4b4435=_0x119432[_0x5e5fb0(0x23d)];if(_0x4b4435[_0x5e5fb0(0x225)](/\[Version[ ](.*?)\]/i)){const _0x33f7ab=Number(RegExp['$1']);_0x33f7ab!==VisuMZ[label]['version']&&(alert(_0x5e5fb0(0x24e)[_0x5e5fb0(0x21c)](_0x3d4f4a,_0x33f7ab)),SceneManager['exit']());}if(_0x4b4435[_0x5e5fb0(0x225)](/\[Tier[ ](\d+)\]/i)){if(_0x5e5fb0(0x285)===_0x5e5fb0(0x2aa))return _0x9498ce(_0x44c0d4['$1']);else{const _0x273ea3=Number(RegExp['$1']);if(_0x273ea3<tier){if(_0x5e5fb0(0x1f0)===_0x5e5fb0(0x1b9)){if(!_0x173122[_0x5e5fb0(0x203)]['JS'][_0x49a3c0][_0x5e5fb0(0x324)](this,this,_0x1a6313))return![];}else alert(_0x5e5fb0(0x448)[_0x5e5fb0(0x21c)](_0x3d4f4a,_0x273ea3,tier)),SceneManager[_0x5e5fb0(0x2ed)]();}else tier=Math[_0x5e5fb0(0x354)](_0x273ea3,tier);}}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x119432[_0x5e5fb0(0x30c)]);})(pluginData),PluginManager[_0x1841c2(0x396)](pluginData[_0x1841c2(0x34f)],'AbilityPointsGain',_0x2b8121=>{const _0x1fca1b=_0x1841c2;VisuMZ[_0x1fca1b(0x311)](_0x2b8121,_0x2b8121);const _0x455427=_0x2b8121[_0x1fca1b(0x27f)][_0x1fca1b(0x460)](_0x36445d=>$gameActors['actor'](_0x36445d)),_0x16afde=_0x2b8121[_0x1fca1b(0x3f6)],_0x5ab228=_0x2b8121['Points'];for(const _0x444eb2 of _0x455427){if(!_0x444eb2)continue;for(const _0x410b19 of _0x16afde){_0x444eb2['gainAbilityPoints'](_0x5ab228,_0x410b19);}}}),PluginManager['registerCommand'](pluginData[_0x1841c2(0x34f)],_0x1841c2(0x320),_0x9b251f=>{const _0x2ba8f7=_0x1841c2;VisuMZ[_0x2ba8f7(0x311)](_0x9b251f,_0x9b251f);const _0x295aa7=_0x9b251f['Actors'][_0x2ba8f7(0x460)](_0x3afb15=>$gameActors[_0x2ba8f7(0x2ff)](_0x3afb15)),_0x43fe65=_0x9b251f['Classes'],_0x5e4291=_0x9b251f['Points'];for(const _0x3c40a8 of _0x295aa7){if(_0x2ba8f7(0x1bc)===_0x2ba8f7(0x323))return this['_stypeId']===_0x2ba8f7(0x3c9);else{if(!_0x3c40a8)continue;for(const _0x2a1831 of _0x43fe65){_0x3c40a8['addAbilityPoints'](_0x5e4291,_0x2a1831);}}}}),PluginManager[_0x1841c2(0x396)](pluginData[_0x1841c2(0x34f)],_0x1841c2(0x453),_0x5bd4d8=>{const _0x966f83=_0x1841c2;VisuMZ[_0x966f83(0x311)](_0x5bd4d8,_0x5bd4d8);const _0x24abe7=_0x5bd4d8[_0x966f83(0x27f)]['map'](_0x1a1822=>$gameActors[_0x966f83(0x2ff)](_0x1a1822)),_0x444071=_0x5bd4d8['Classes'],_0x359b92=_0x5bd4d8[_0x966f83(0x3cf)];for(const _0x409e72 of _0x24abe7){if(!_0x409e72)continue;for(const _0x2b156d of _0x444071){_0x409e72[_0x966f83(0x315)](_0x359b92,_0x2b156d);}}}),PluginManager[_0x1841c2(0x396)](pluginData[_0x1841c2(0x34f)],_0x1841c2(0x2e8),_0x31f882=>{const _0x24cbcd=_0x1841c2;VisuMZ[_0x24cbcd(0x311)](_0x31f882,_0x31f882);const _0xc49b0a=_0x31f882[_0x24cbcd(0x27f)][_0x24cbcd(0x460)](_0x2d3698=>$gameActors[_0x24cbcd(0x2ff)](_0x2d3698)),_0x384220=_0x31f882[_0x24cbcd(0x3f6)],_0x4eaa8e=_0x31f882[_0x24cbcd(0x3cf)];for(const _0x56d3c1 of _0xc49b0a){if(!_0x56d3c1)continue;for(const _0x2aba41 of _0x384220){if('AlCRc'===_0x24cbcd(0x2df)){let _0x45a14b=0x0;const _0x515a6b=/^\d+$/[_0x24cbcd(0x3ad)](_0x4c6b2e);_0x515a6b?_0x45a14b=_0x1c77ca(_0x3d8852):_0x45a14b=_0x44ff77['getSkillIdWithName'](_0x3c2d87);const _0xdb36f4=_0x127169[_0x45a14b];if(_0xdb36f4){const _0x402587=_0x3e9159[_0x24cbcd(0x3db)][_0x24cbcd(0x21c)]('\x5cI[%1]'[_0x24cbcd(0x21c)](_0xdb36f4[_0x24cbcd(0x1ba)]),_0xdb36f4['name']),_0x310bfd=_0x4f1570[_0x24cbcd(0x3d3)](_0x45a14b)?_0x312863:_0x1b61a5;_0x410ad0+=_0x310bfd[_0x24cbcd(0x21c)](_0x402587)+'\x0a';}}else _0x56d3c1['setAbilityPoints'](_0x4eaa8e,_0x2aba41);}}}),PluginManager[_0x1841c2(0x396)](pluginData['name'],_0x1841c2(0x25e),_0x4fc139=>{const _0x3c5f16=_0x1841c2;VisuMZ['ConvertParams'](_0x4fc139,_0x4fc139);const _0x404d62=_0x4fc139[_0x3c5f16(0x27f)]['map'](_0x22fdf2=>$gameActors[_0x3c5f16(0x2ff)](_0x22fdf2)),_0x2702ac=_0x4fc139['Classes'],_0x55d793=_0x4fc139[_0x3c5f16(0x3cf)];for(const _0x195401 of _0x404d62){if('VhqKo'!==_0x3c5f16(0x200)){const _0x40bd99=_0x51d3fc[_0x3c5f16(0x2b3)];if(_0x40bd99[_0x3c5f16(0x225)](_0x44437b)){const _0x10b77f=_0x59b213(_0x1c1760['$1']),_0x38c7f5=_0x3c5f16(0x3b1)[_0x3c5f16(0x21c)](_0x10b77f),_0xcd876e=_0xe46c65[_0x3c5f16(0x203)][_0x3c5f16(0x3b4)](_0x198186,_0x479558);_0x1e42aa['SkillLearnSystem']['JS'][_0xcd876e]=new _0x482836(_0x38c7f5);}}else{if(!_0x195401)continue;for(const _0x3de0e7 of _0x2702ac){if('oPXHS'==='fCVPB'){const _0x2edc9f=_0x43a106(_0x392ca3['$1'])[_0x3c5f16(0x2f8)](',')['map'](_0x5ef54c=>_0x468c6f(_0x5ef54c));for(const _0x91e8e0 of _0x2edc9f){if(!_0x5b2593[_0x3c5f16(0x31d)](_0x91e8e0))return![];}}else _0x195401[_0x3c5f16(0x44b)](_0x55d793,_0x3de0e7);}}}}),PluginManager['registerCommand'](pluginData['name'],_0x1841c2(0x33f),_0x1e0a16=>{const _0x146248=_0x1841c2;VisuMZ[_0x146248(0x311)](_0x1e0a16,_0x1e0a16);const _0x3779a6=_0x1e0a16[_0x146248(0x27f)][_0x146248(0x460)](_0x40c6ed=>$gameActors[_0x146248(0x2ff)](_0x40c6ed)),_0x2b03bd=_0x1e0a16[_0x146248(0x3f6)],_0x3a6f70=_0x1e0a16['Points'];for(const _0x54d479 of _0x3779a6){if(!_0x54d479)continue;for(const _0x589317 of _0x2b03bd){_0x54d479[_0x146248(0x359)](_0x3a6f70,_0x589317);}}}),PluginManager[_0x1841c2(0x396)](pluginData['name'],_0x1841c2(0x281),_0x358b7c=>{const _0x334aab=_0x1841c2;VisuMZ[_0x334aab(0x311)](_0x358b7c,_0x358b7c);const _0x3c6bd9=_0x358b7c[_0x334aab(0x27f)][_0x334aab(0x460)](_0xe20b33=>$gameActors['actor'](_0xe20b33)),_0x471824=_0x358b7c[_0x334aab(0x3f6)],_0x281859=_0x358b7c[_0x334aab(0x3cf)];for(const _0x2a1c7a of _0x3c6bd9){if(!_0x2a1c7a)continue;for(const _0x4bffc9 of _0x471824){_0x2a1c7a['loseSkillPoints'](_0x281859,_0x4bffc9);}}}),PluginManager[_0x1841c2(0x396)](pluginData[_0x1841c2(0x34f)],'SkillPointsSet',_0x4b5328=>{const _0x142531=_0x1841c2;VisuMZ[_0x142531(0x311)](_0x4b5328,_0x4b5328);const _0x1f6305=_0x4b5328[_0x142531(0x27f)]['map'](_0x26005c=>$gameActors[_0x142531(0x2ff)](_0x26005c)),_0x44aaa2=_0x4b5328['Classes'],_0x5d33f1=_0x4b5328[_0x142531(0x3cf)];for(const _0x5dbf45 of _0x1f6305){if(_0x142531(0x241)!==_0x142531(0x2e9)){if(!_0x5dbf45)continue;for(const _0x486cc2 of _0x44aaa2){_0x5dbf45[_0x142531(0x2c4)](_0x5d33f1,_0x486cc2);}}else{if(_0x10e05c[_0x142531(0x1d3)]())_0x1ad592[_0x142531(0x24a)](_0x449bae);}}}),PluginManager[_0x1841c2(0x396)](pluginData[_0x1841c2(0x34f)],'SystemShowSkillLearnSystemMenu',_0x4a5d1c=>{const _0x57aad6=_0x1841c2;VisuMZ[_0x57aad6(0x311)](_0x4a5d1c,_0x4a5d1c),$gameSystem[_0x57aad6(0x30d)](_0x4a5d1c[_0x57aad6(0x260)]);}),VisuMZ[_0x1841c2(0x203)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x1841c2(0x20d)][_0x1841c2(0x265)],Scene_Boot[_0x1841c2(0x20d)][_0x1841c2(0x265)]=function(){VisuMZ['SkillLearnSystem']['Scene_Boot_onDatabaseLoaded']['call'](this),this['process_VisuMZ_SkillLearnSystem_Notetags']();},Scene_Boot[_0x1841c2(0x20d)][_0x1841c2(0x333)]=function(){const _0x6fcee2=_0x1841c2;if(VisuMZ[_0x6fcee2(0x2be)])return;this[_0x6fcee2(0x376)]();},VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x337)]={'StartingAbilityPoints':/<STARTING (?:ABILITY POINTS|AP):[ ](.*)>/i,'StartClassAbilityPoints':/<CLASS (.*) STARTING (?:ABILITY POINTS|AP):[ ](.*)>/gi,'UserGainAbilityPoints':/<(?:ABILITY POINTS|AP|USER ABILITY POINTS|USER AP) GAIN:[ ](.*)>/i,'TargetGainAbilityPoints':/<TARGET (?:ABILITY POINTS|AP) GAIN:[ ](.*)>/i,'EnemyAbilityPoints':/<(?:ABILITY POINTS|AP):[ ](.*)>/i,'AbilityPointsRate':/<(?:ABILITY POINTS|AP) RATE:[ ](\d+)([%％])>/i,'StartingSkillPoints':/<STARTING (?:SKILL POINTS|SP):[ ](.*)>/i,'StartClassSkillPoints':/<CLASS (.*) STARTING (?:SKILL POINTS|SP):[ ](.*)>/gi,'UserGainSkillPoints':/<(?:SKILL POINTS|SP|USER SKILL POINTS|USER SP) GAIN:[ ](.*)>/i,'TargetGainSkillPoints':/<TARGET (?:SKILL POINTS|SP) GAIN:[ ](.*)>/i,'EnemySkillPoints':/<(?:SKILL POINTS|SP):[ ](.*)>/i,'SkillPointsRate':/<(?:SKILL POINTS|SP) RATE:[ ](\d+)([%％])>/i,'LearnSkillA':/<LEARN (?:SKILL|SKILLS):[ ](.*)>/gi,'LearnSkillB':/<LEARN (?:SKILL|SKILLS)>\s*([\s\S]*)\s*<\/LEARN (?:SKILL|SKILLS)>/i,'LearnApCost':/<LEARN (?:ABILITY POINTS|AP) COST:[ ](\d+)>/i,'LearnCpCost':/<LEARN (?:CLASS POINTS|CP) COST:[ ](\d+)>/i,'LearnJpCost':/<LEARN (?:JOB POINTS|JP) COST:[ ](\d+)>/i,'LearnSpCost':/<LEARN (?:SKILL POINTS|SP) COST:[ ](\d+)>/i,'LearnItemCost':/<LEARN ITEM (.*) COST:[ ](\d+)>/gi,'LearnWeaponCost':/<LEARN WEAPON (.*) COST:[ ](\d+)>/gi,'LearnArmorCost':/<LEARN ARMOR (.*) COST:[ ](\d+)>/gi,'LearnGoldCost':/<LEARN GOLD COST:[ ](\d+)>/i,'LearnCostBatch':/<LEARN SKILL (?:COST|COSTS)>\s*([\s\S]*)\s*<\/LEARN SKILL (?:COST|COSTS)>/i,'LearnShowLevel':/<LEARN SHOW LEVEL:[ ](\d+)>/i,'LearnShowSkillsAll':/<LEARN SHOW (?:SKILL|SKILLS|ALL SKILL|ALL SKILLS):[ ](.*)>/i,'LearnShowSkillsAny':/<LEARN SHOW ANY (?:SKILL|SKILLS):[ ](.*)>/i,'LearnShowSwitchesAll':/<LEARN SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ](.*)>/i,'LearnShowSwitchesAny':/<LEARN SHOW ANY (?:SWITCH|SWITCHES):[ ](.*)>/i,'LearnReqLevel':/<LEARN REQUIRE LEVEL:[ ](\d+)>/i,'LearnReqSkillsAll':/<LEARN REQUIRE (?:SKILL|SKILLS|ALL SKILL|ALL SKILLS):[ ](.*)>/i,'LearnReqSkillsAny':/<LEARN REQUIRE ANY (?:SKILL|SKILLS):[ ](.*)>/i,'LearnReqSwitchesAll':/<LEARN REQUIRE (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ](.*)>/i,'LearnReqSwitchesAny':/<LEARN REQUIRE ANY (?:SWITCH|SWITCHES):[ ](.*)>/i,'animationIDs':/<LEARN SKILL (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<LEARN SKILL FADE SPEED:[ ](\d+)>/i,'learnPicture':/<LEARN SKILL (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'jsLearnApCost':/<JS LEARN (?:ABILITY POINTS|AP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:ABILITY POINTS|AP) COST>/i,'jsLearnCpCost':/<JS LEARN (?:CLASS POINTS|CP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:CLASS POINTS|CP) COST>/i,'jsLearnJpCost':/<JS LEARN (?:JOB POINTS|JP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:JOB POINTS|JP) COST>/i,'jsLearnSpCost':/<JS LEARN (?:SKILL POINTS|SP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:SKILL POINTS|SP) COST>/i,'jsLearnShow':/<JS LEARN (?:SHOW|VISIBLE)>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE)>/i,'jsLearnShowListTxt':/<JS LEARN (?:SHOW|VISIBLE) LIST TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE) LIST TEXT>/i,'jsLearnShowDetailTxt':/<JS LEARN (?:SHOW|VISIBLE) DETAIL TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE) DETAIL TEXT>/i,'jsLearnReq':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS)>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS)>/i,'jsLearnReqListTxt':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS) LIST TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS) LIST TEXT>/i,'jsLearnReqDetailTxt':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS) DETAIL TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS) DETAIL TEXT>/i,'jsOnLearn':/<JS ON LEARN SKILL>\s*([\s\S]*)\s*<\/JS ON LEARN SKILL>/i},VisuMZ['SkillLearnSystem']['JS']={},Scene_Boot['prototype'][_0x1841c2(0x376)]=function(){const _0x4774e1=_0x1841c2,_0x27da9f=$dataActors[_0x4774e1(0x3af)]($dataSkills);for(const _0x13e7bb of _0x27da9f){if(!_0x13e7bb)continue;VisuMZ[_0x4774e1(0x203)][_0x4774e1(0x2f1)](_0x13e7bb);}},VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x204)]=VisuMZ[_0x1841c2(0x204)],VisuMZ[_0x1841c2(0x204)]=function(_0x5386bd){const _0x232223=_0x1841c2;VisuMZ['SkillLearnSystem'][_0x232223(0x204)][_0x232223(0x324)](this,_0x5386bd),VisuMZ[_0x232223(0x203)][_0x232223(0x2f1)](_0x5386bd);},VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x2f1)]=function(_0x4e4f69){const _0x5358b7=_0x1841c2,_0x2fbe68=VisuMZ[_0x5358b7(0x203)][_0x5358b7(0x337)];VisuMZ[_0x5358b7(0x203)][_0x5358b7(0x2ec)](_0x4e4f69,_0x5358b7(0x349),_0x2fbe68[_0x5358b7(0x349)]),VisuMZ[_0x5358b7(0x203)][_0x5358b7(0x2ec)](_0x4e4f69,_0x5358b7(0x27d),_0x2fbe68[_0x5358b7(0x27d)]),VisuMZ[_0x5358b7(0x203)]['createCostJS'](_0x4e4f69,_0x5358b7(0x44d),_0x2fbe68[_0x5358b7(0x44d)]),VisuMZ['SkillLearnSystem'][_0x5358b7(0x2ec)](_0x4e4f69,_0x5358b7(0x20e),_0x2fbe68[_0x5358b7(0x20e)]),VisuMZ[_0x5358b7(0x203)][_0x5358b7(0x456)](_0x4e4f69,_0x5358b7(0x2a1),_0x2fbe68[_0x5358b7(0x2a1)]),VisuMZ[_0x5358b7(0x203)]['createConditionJS'](_0x4e4f69,'jsLearnReq',_0x2fbe68['jsLearnReq']),VisuMZ['SkillLearnSystem']['createTextJS'](_0x4e4f69,_0x5358b7(0x340),_0x2fbe68['jsLearnShowListTxt']),VisuMZ[_0x5358b7(0x203)][_0x5358b7(0x319)](_0x4e4f69,_0x5358b7(0x3eb),_0x2fbe68[_0x5358b7(0x3eb)]),VisuMZ[_0x5358b7(0x203)][_0x5358b7(0x319)](_0x4e4f69,_0x5358b7(0x250),_0x2fbe68[_0x5358b7(0x250)]),VisuMZ['SkillLearnSystem']['createTextJS'](_0x4e4f69,_0x5358b7(0x27a),_0x2fbe68[_0x5358b7(0x27a)]),VisuMZ[_0x5358b7(0x203)][_0x5358b7(0x2fd)](_0x4e4f69,_0x5358b7(0x2a2),_0x2fbe68[_0x5358b7(0x2a2)]);},VisuMZ['SkillLearnSystem'][_0x1841c2(0x2ec)]=function(_0x9356a0,_0x55f459,_0x35daf4){const _0x16c2af=_0x1841c2,_0xbee832=_0x9356a0[_0x16c2af(0x2b3)];if(_0xbee832['match'](_0x35daf4)){if(_0x16c2af(0x314)!=='WuJAp'){const _0x3d731b=String(RegExp['$1']),_0x3356e2=_0x16c2af(0x1e1)[_0x16c2af(0x21c)](_0x3d731b),_0x1053f9=VisuMZ[_0x16c2af(0x203)][_0x16c2af(0x3b4)](_0x9356a0,_0x55f459);VisuMZ[_0x16c2af(0x203)]['JS'][_0x1053f9]=new Function(_0x3356e2);}else _0x1c8f45=_0x18515a,_0x164d1b+=_0x3eaf70+this[_0x16c2af(0x433)]()*0x2;}},VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x456)]=function(_0x57a0e9,_0x170063,_0x335c0e){const _0x5798db=_0x1841c2,_0x10e166=_0x57a0e9['note'];if(_0x10e166[_0x5798db(0x225)](_0x335c0e)){const _0x3b2d99=String(RegExp['$1']),_0x2c2f3a=_0x5798db(0x381)[_0x5798db(0x21c)](_0x3b2d99),_0x190c4c=VisuMZ['SkillLearnSystem'][_0x5798db(0x3b4)](_0x57a0e9,_0x170063);VisuMZ['SkillLearnSystem']['JS'][_0x190c4c]=new Function(_0x2c2f3a);}},VisuMZ['SkillLearnSystem'][_0x1841c2(0x2b5)]=function(_0x5207fe,_0x403f17,_0x430d95){const _0x376f29=_0x1841c2,_0x2a8d4e=_0x5207fe['note'];if(_0x2a8d4e[_0x376f29(0x225)](_0x430d95)){if(_0x376f29(0x1d8)!==_0x376f29(0x31e)){const _0x193403=String(RegExp['$1']),_0x498f31=_0x376f29(0x1f6)[_0x376f29(0x21c)](_0x193403),_0x121ffb=VisuMZ[_0x376f29(0x203)][_0x376f29(0x3b4)](_0x5207fe,_0x403f17);VisuMZ[_0x376f29(0x203)]['JS'][_0x121ffb]=new Function(_0x498f31);}else _0x4be175=_0x59103d['format'](_0x32a5d2,_0x17fa0e);}},VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x319)]=function(_0x16b447,_0x22324b,_0x534dc7){const _0x5918f4=_0x1841c2,_0x573ca6=_0x16b447[_0x5918f4(0x2b3)];if(_0x573ca6[_0x5918f4(0x225)](_0x534dc7)){const _0x53bb5a=String(RegExp['$1']),_0x3512c0=_0x5918f4(0x404)[_0x5918f4(0x21c)](_0x53bb5a),_0x3285f7=VisuMZ['SkillLearnSystem'][_0x5918f4(0x3b4)](_0x16b447,_0x22324b);VisuMZ[_0x5918f4(0x203)]['JS'][_0x3285f7]=new Function(_0x3512c0);}},VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x2fd)]=function(_0x385e4e,_0x2a637f,_0x2ae1ae){const _0xa2f7a6=_0x1841c2,_0x280830=_0x385e4e[_0xa2f7a6(0x2b3)];if(_0x280830[_0xa2f7a6(0x225)](_0x2ae1ae)){if(_0xa2f7a6(0x1c2)===_0xa2f7a6(0x2f6))return _0x3e9667=_0x13d0b5[_0xa2f7a6(0x343)],_0x4a83ca['format'](_0x366c11,_0x5efe09['skillPointsAbbr'],_0xa2f7a6(0x305)[_0xa2f7a6(0x21c)](_0x5b4db4[_0xa2f7a6(0x3f3)]),_0x5dcb0b['skillPointsFull']);else{const _0x19a23d=String(RegExp['$1']),_0x44032b=_0xa2f7a6(0x3b1)[_0xa2f7a6(0x21c)](_0x19a23d),_0x4ae043=VisuMZ[_0xa2f7a6(0x203)][_0xa2f7a6(0x3b4)](_0x385e4e,_0x2a637f);VisuMZ['SkillLearnSystem']['JS'][_0x4ae043]=new Function(_0x44032b);}}},VisuMZ['SkillLearnSystem'][_0x1841c2(0x3b4)]=function(_0x2d80ba,_0x1c6ae5){const _0x3230b6=_0x1841c2;if(VisuMZ[_0x3230b6(0x3b4)])return VisuMZ[_0x3230b6(0x3b4)](_0x2d80ba,_0x1c6ae5);let _0x3895e5='';if($dataActors[_0x3230b6(0x3ee)](_0x2d80ba))_0x3895e5='Actor-%1-%2'[_0x3230b6(0x21c)](_0x2d80ba['id'],_0x1c6ae5);if($dataClasses[_0x3230b6(0x3ee)](_0x2d80ba))_0x3895e5=_0x3230b6(0x22c)[_0x3230b6(0x21c)](_0x2d80ba['id'],_0x1c6ae5);if($dataSkills['includes'](_0x2d80ba))_0x3895e5=_0x3230b6(0x271)[_0x3230b6(0x21c)](_0x2d80ba['id'],_0x1c6ae5);if($dataItems[_0x3230b6(0x3ee)](_0x2d80ba))_0x3895e5=_0x3230b6(0x2a4)[_0x3230b6(0x21c)](_0x2d80ba['id'],_0x1c6ae5);if($dataWeapons[_0x3230b6(0x3ee)](_0x2d80ba))_0x3895e5='Weapon-%1-%2'[_0x3230b6(0x21c)](_0x2d80ba['id'],_0x1c6ae5);if($dataArmors[_0x3230b6(0x3ee)](_0x2d80ba))_0x3895e5=_0x3230b6(0x38a)[_0x3230b6(0x21c)](_0x2d80ba['id'],_0x1c6ae5);if($dataEnemies[_0x3230b6(0x3ee)](_0x2d80ba))_0x3895e5=_0x3230b6(0x215)['format'](_0x2d80ba['id'],_0x1c6ae5);if($dataStates[_0x3230b6(0x3ee)](_0x2d80ba))_0x3895e5=_0x3230b6(0x3bc)['format'](_0x2d80ba['id'],_0x1c6ae5);return _0x3895e5;},DataManager['getClassIdWithName']=function(_0x22f580){const _0x46eace=_0x1841c2;_0x22f580=_0x22f580['toUpperCase']()[_0x46eace(0x28e)](),this[_0x46eace(0x252)]=this[_0x46eace(0x252)]||{};if(this['_classIDs'][_0x22f580])return this[_0x46eace(0x252)][_0x22f580];for(const _0x323864 of $dataClasses){if(_0x46eace(0x373)===_0x46eace(0x316)){let _0x361441=0x0;const _0x2d5148=/^\d+$/['test'](_0x46b0b1);_0x2d5148?_0x361441=_0x571ca3(_0x49914b):_0x361441=_0xe69a90['getSkillIdWithName'](_0x28716e);const _0x37581e=_0x50a923[_0x361441];if(_0x37581e){const _0x5c2115=_0x5ded24[_0x46eace(0x3db)][_0x46eace(0x21c)](_0x46eace(0x305)['format'](_0x37581e[_0x46eace(0x1ba)]),_0x37581e['name']),_0x5c7c7c=_0x2bc21f[_0x46eace(0x3d3)](_0x361441)?_0x72c013:_0x43a410;_0x4f991b+=_0x5c7c7c[_0x46eace(0x21c)](_0x5c2115)+'\x0a';}}else{if(!_0x323864)continue;let _0x205b79=_0x323864['name'];_0x205b79=_0x205b79['replace'](/\x1I\[(\d+)\]/gi,''),_0x205b79=_0x205b79[_0x46eace(0x277)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0x205b79[_0x46eace(0x380)]()[_0x46eace(0x28e)]()]=_0x323864['id'];}}return this[_0x46eace(0x252)][_0x22f580]||0x0;},DataManager['getSkillIdWithName']=function(_0x52ad02){const _0x52edab=_0x1841c2;_0x52ad02=_0x52ad02[_0x52edab(0x380)]()['trim'](),this['_skillIDs']=this[_0x52edab(0x1b7)]||{};if(this[_0x52edab(0x1b7)][_0x52ad02])return this[_0x52edab(0x1b7)][_0x52ad02];for(const _0x1ca1f6 of $dataSkills){if(!_0x1ca1f6)continue;this[_0x52edab(0x1b7)][_0x1ca1f6[_0x52edab(0x34f)][_0x52edab(0x380)]()[_0x52edab(0x28e)]()]=_0x1ca1f6['id'];}return this[_0x52edab(0x1b7)][_0x52ad02]||0x0;},DataManager['getItemIdWithName']=function(_0x49b979){const _0x470c54=_0x1841c2;_0x49b979=_0x49b979[_0x470c54(0x380)]()[_0x470c54(0x28e)](),this['_itemIDs']=this['_itemIDs']||{};if(this[_0x470c54(0x263)][_0x49b979])return this[_0x470c54(0x263)][_0x49b979];for(const _0x1a8255 of $dataItems){if(_0x470c54(0x29b)===_0x470c54(0x415)){if(!_0x1a84ec['inBattle']())return;if(!this[_0x470c54(0x25a)]()[_0x470c54(0x2d1)]())return;const _0x5348cf=_0x375761[_0x470c54(0x203)][_0x470c54(0x1fa)][_0x470c54(0x443)];let _0xea1052=0x0;try{_0xea1052=_0x266a4d(_0x5348cf['PerAction']);}catch(_0x42a24d){if(_0x4ae932[_0x470c54(0x1d3)]())_0x3b2748['log'](_0x42a24d);}this[_0x470c54(0x25a)]()[_0x470c54(0x44b)](_0xea1052);}else{if(!_0x1a8255)continue;this['_itemIDs'][_0x1a8255[_0x470c54(0x34f)]['toUpperCase']()[_0x470c54(0x28e)]()]=_0x1a8255['id'];}}return this[_0x470c54(0x263)][_0x49b979]||0x0;},DataManager[_0x1841c2(0x291)]=function(_0x456131){const _0x1d4d74=_0x1841c2;_0x456131=_0x456131[_0x1d4d74(0x380)]()[_0x1d4d74(0x28e)](),this[_0x1d4d74(0x2db)]=this[_0x1d4d74(0x2db)]||{};if(this[_0x1d4d74(0x2db)][_0x456131])return this[_0x1d4d74(0x2db)][_0x456131];for(const _0x1f8fe0 of $dataWeapons){if(!_0x1f8fe0)continue;this['_weaponIDs'][_0x1f8fe0[_0x1d4d74(0x34f)][_0x1d4d74(0x380)]()[_0x1d4d74(0x28e)]()]=_0x1f8fe0['id'];}return this['_weaponIDs'][_0x456131]||0x0;},DataManager[_0x1841c2(0x308)]=function(_0x487152){const _0xfa18aa=_0x1841c2;_0x487152=_0x487152[_0xfa18aa(0x380)]()[_0xfa18aa(0x28e)](),this['_armorIDs']=this[_0xfa18aa(0x1e7)]||{};if(this[_0xfa18aa(0x1e7)][_0x487152])return this['_armorIDs'][_0x487152];for(const _0x3129e4 of $dataArmors){if(!_0x3129e4)continue;this['_armorIDs'][_0x3129e4['name'][_0xfa18aa(0x380)]()[_0xfa18aa(0x28e)]()]=_0x3129e4['id'];}return this[_0xfa18aa(0x1e7)][_0x487152]||0x0;},DataManager['getSkillLearnSkillsFromClass']=function(_0x1d395d){const _0x57d449=_0x1841c2;if(!$dataClasses[_0x1d395d])return[];const _0x3d82a1=[],_0x4c4864=$dataClasses[_0x1d395d][_0x57d449(0x2b3)],_0x37ad4c=VisuMZ[_0x57d449(0x203)]['RegExp'],_0xada90b=_0x4c4864[_0x57d449(0x225)](_0x37ad4c['LearnSkillA']);if(_0xada90b)for(const _0x3607b9 of _0xada90b){if(_0x57d449(0x3cc)!==_0x57d449(0x3cc))_0x1f0c92=_0x427cf4||this['currentClass']()['id'];else{if(!_0x3607b9)continue;_0x3607b9[_0x57d449(0x225)](_0x37ad4c[_0x57d449(0x356)]);const _0x3d7f60=String(RegExp['$1'])[_0x57d449(0x2f8)](',')[_0x57d449(0x460)](_0x42fc25=>_0x42fc25[_0x57d449(0x28e)]());;for(let _0x5c4215 of _0x3d7f60){if(_0x57d449(0x445)===_0x57d449(0x445)){_0x5c4215=(String(_0x5c4215)||'')[_0x57d449(0x28e)]();const _0x18b466=/^\d+$/['test'](_0x5c4215);_0x18b466?_0x57d449(0x3f1)!==_0x57d449(0x1e2)?_0x3d82a1['push'](Number(_0x5c4215)):(_0x48dc41[_0x57d449(0x203)][_0x57d449(0x204)][_0x57d449(0x324)](this,_0x339914),_0x10980b['SkillLearnSystem']['Parse_Notetags_CreateJS'](_0x13e379)):_0x3d82a1[_0x57d449(0x43a)](DataManager[_0x57d449(0x269)](_0x5c4215));}else return _0x1169f7[_0x57d449(0x203)]['Settings'][_0x57d449(0x443)][_0x57d449(0x1eb)];}}}const _0x17f272=_0x4c4864['match'](_0x37ad4c[_0x57d449(0x1b5)]);if(_0x17f272)for(const _0x31d56f of _0x17f272){if(_0x57d449(0x33a)==='bEOSk'){if(!_0x31d56f)continue;_0x31d56f['match'](_0x37ad4c['LearnSkillA']);const _0xd55c81=String(RegExp['$1'])[_0x57d449(0x2f8)](/[\r\n]+/);for(let _0x28b714 of _0xd55c81){_0x28b714=(String(_0x28b714)||'')['trim']();const _0x17ecfe=/^\d+$/['test'](_0x28b714);_0x17ecfe?_0x3d82a1['push'](Number(_0x28b714)):_0x3d82a1['push'](DataManager[_0x57d449(0x269)](_0x28b714));}}else _0x221d5b['id']=_0x9f2456[_0x57d449(0x308)](_0x2e406d);}return _0x3d82a1[_0x57d449(0x45b)]((_0x515b6f,_0x5c8876)=>_0x515b6f-_0x5c8876)[_0x57d449(0x201)]((_0x52971e,_0x4dd97e,_0x4a5f0e)=>_0x4a5f0e[_0x57d449(0x38f)](_0x52971e)===_0x4dd97e);},DataManager[_0x1841c2(0x3ed)]=function(_0x255945){const _0x7b77e9=_0x1841c2;if(!_0x255945)return 0x0;if(!DataManager[_0x7b77e9(0x1e6)](_0x255945))return 0x0;const _0x50a23c=VisuMZ[_0x7b77e9(0x203)][_0x7b77e9(0x337)],_0x8821c1=_0x255945[_0x7b77e9(0x2b3)];if(_0x8821c1[_0x7b77e9(0x225)](_0x50a23c[_0x7b77e9(0x3c7)]))return Number(RegExp['$1']);if(_0x8821c1[_0x7b77e9(0x225)](_0x50a23c[_0x7b77e9(0x307)])){if(_0x7b77e9(0x3e2)!=='VEHKG'){const _0x183f86=String(RegExp['$1'])[_0x7b77e9(0x2f8)](/[\r\n]+/);for(const _0x1aeab5 of _0x183f86){if(_0x7b77e9(0x329)!==_0x7b77e9(0x321)){if(_0x1aeab5[_0x7b77e9(0x225)](/(?:ABILITY POINTS|AP):[ ](\d+)/gi)){if(_0x7b77e9(0x366)===_0x7b77e9(0x392)){const _0x4eea58=_0x4da325(_0x3c6179['$1']);this[_0x7b77e9(0x25a)]()[_0x7b77e9(0x249)](_0x4eea58);}else return Number(RegExp['$1']);}}else return _0x3c2aea['SkillLearnSystem'][_0x7b77e9(0x1fa)][_0x7b77e9(0x22d)][_0x7b77e9(0x1eb)];}}else _0x4a12b4=_0x35210f[_0x7b77e9(0x201)](_0x151da0=>_0x151da0['isAlive']());}const _0x10bef5=VisuMZ[_0x7b77e9(0x203)]['createKeyJS'](_0x255945,_0x7b77e9(0x349));if(VisuMZ[_0x7b77e9(0x203)]['JS'][_0x10bef5]){if(_0x7b77e9(0x3da)!==_0x7b77e9(0x3da))_0xe6bf00=_0x1eb052[_0x7b77e9(0x269)](_0x2545ea);else{const _0x32dd48=SceneManager[_0x7b77e9(0x39e)][_0x7b77e9(0x2b9)]();return VisuMZ[_0x7b77e9(0x203)]['JS'][_0x10bef5][_0x7b77e9(0x324)](this,_0x32dd48,_0x255945);}}return VisuMZ[_0x7b77e9(0x203)][_0x7b77e9(0x1fa)]['AbilityPoints'][_0x7b77e9(0x1ca)]||0x0;},DataManager[_0x1841c2(0x1fe)]=function(_0x395ed2){const _0x4316eb=_0x1841c2;if(!_0x395ed2)return 0x0;if(!DataManager[_0x4316eb(0x1e6)](_0x395ed2))return 0x0;const _0x4014bc=VisuMZ[_0x4316eb(0x203)][_0x4316eb(0x337)],_0x18146d=_0x395ed2['note'];if(_0x18146d[_0x4316eb(0x225)](_0x4014bc[_0x4316eb(0x3dc)])){if(_0x4316eb(0x420)!==_0x4316eb(0x213))return Number(RegExp['$1']);else _0x4e3a65=_0x4a47b8['skillLearnReqSwitchFmt']['format'](_0x1d410a['switches'][_0x40984f]||''),_0x3d8269[_0x4316eb(0x1c5)]>0x0&&(_0x43baee!==''?_0x1043e3=_0x2ac180['format'](_0x2e805b,_0x566864):_0x5ea6f0=_0x5bf6f7);}if(_0x18146d[_0x4316eb(0x225)](_0x4014bc['LearnCostBatch'])){const _0x2bad54=String(RegExp['$1'])[_0x4316eb(0x2f8)](/[\r\n]+/);for(const _0x5af56c of _0x2bad54){if(_0x4316eb(0x3e7)!=='jrdpK'){if(_0x5af56c[_0x4316eb(0x225)](/(?:CLASS POINTS|CP):[ ](\d+)/gi))return Number(RegExp['$1']);}else _0x5c13e3[_0x4316eb(0x43a)](_0x221184[_0x4316eb(0x269)](_0x695571));}}const _0x176911=VisuMZ[_0x4316eb(0x203)][_0x4316eb(0x3b4)](_0x395ed2,'jsLearnCpCost');if(VisuMZ[_0x4316eb(0x203)]['JS'][_0x176911]){if(_0x4316eb(0x224)===_0x4316eb(0x33b)){const _0x58e305=_0x16645d(_0x4ec439['$1']),_0x5a1e09=_0x4316eb(0x3b1)[_0x4316eb(0x21c)](_0x58e305),_0x1bda0b=_0x1d60b9[_0x4316eb(0x203)][_0x4316eb(0x3b4)](_0x3bd162,_0x1e7022);_0x3fb249[_0x4316eb(0x203)]['JS'][_0x1bda0b]=new _0xc5007b(_0x5a1e09);}else{const _0x5bfe37=SceneManager[_0x4316eb(0x39e)][_0x4316eb(0x2b9)]();return VisuMZ[_0x4316eb(0x203)]['JS'][_0x176911][_0x4316eb(0x324)](this,_0x5bfe37,_0x395ed2)||0x0;}}return VisuMZ['ClassChangeSystem'][_0x4316eb(0x1fa)]['ClassPoints'][_0x4316eb(0x1ca)]||0x0;},DataManager[_0x1841c2(0x220)]=function(_0x49e272){const _0x12fa54=_0x1841c2;if(!_0x49e272)return 0x0;if(!DataManager[_0x12fa54(0x1e6)](_0x49e272))return 0x0;const _0x1ea655=VisuMZ[_0x12fa54(0x203)]['RegExp'],_0xe9283b=_0x49e272[_0x12fa54(0x2b3)];if(_0xe9283b[_0x12fa54(0x225)](_0x1ea655[_0x12fa54(0x253)]))return Number(RegExp['$1']);if(_0xe9283b[_0x12fa54(0x225)](_0x1ea655[_0x12fa54(0x307)])){const _0x4e64fc=String(RegExp['$1'])[_0x12fa54(0x2f8)](/[\r\n]+/);for(const _0x13c867 of _0x4e64fc){if(_0x13c867[_0x12fa54(0x225)](/(?:JOB POINTS|JP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x281e69=VisuMZ[_0x12fa54(0x203)]['createKeyJS'](_0x49e272,_0x12fa54(0x44d));if(VisuMZ[_0x12fa54(0x203)]['JS'][_0x281e69]){if(_0x12fa54(0x42e)===_0x12fa54(0x2cd)){const _0x3b034d=_0x4da3b9(_0xc7c586['$1'])[_0x12fa54(0x2f8)](',')['map'](_0x19ad23=>_0x19ad23[_0x12fa54(0x28e)]());;for(const _0x14763d of _0x3b034d){let _0xa27367=0x0;const _0x57c398=/^\d+$/[_0x12fa54(0x3ad)](_0x14763d);_0x57c398?_0xa27367=_0x24d450(_0x14763d):_0xa27367=_0x3a13ac[_0x12fa54(0x269)](_0x14763d);if(!this[_0x12fa54(0x2e3)]['isLearnedSkill'](_0xa27367))return![];}}else{const _0x113a12=SceneManager[_0x12fa54(0x39e)][_0x12fa54(0x2b9)]();return VisuMZ['SkillLearnSystem']['JS'][_0x281e69]['call'](this,_0x113a12,_0x49e272);}}return VisuMZ[_0x12fa54(0x3ec)][_0x12fa54(0x1fa)][_0x12fa54(0x2b2)][_0x12fa54(0x1ca)]||0x0;},DataManager['getSkillLearnSkillPointCost']=function(_0x4d5cc4){const _0x3ef3bb=_0x1841c2;if(!_0x4d5cc4)return 0x0;if(!DataManager['isSkill'](_0x4d5cc4))return 0x0;const _0x19f9bf=VisuMZ[_0x3ef3bb(0x203)][_0x3ef3bb(0x337)],_0x1f3456=_0x4d5cc4[_0x3ef3bb(0x2b3)];if(_0x1f3456[_0x3ef3bb(0x225)](_0x19f9bf[_0x3ef3bb(0x212)]))return Number(RegExp['$1']);if(_0x1f3456[_0x3ef3bb(0x225)](_0x19f9bf[_0x3ef3bb(0x307)])){if(_0x3ef3bb(0x3a3)!==_0x3ef3bb(0x3a3))return 0x2;else{const _0x2cb023=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x48f003 of _0x2cb023){if(_0x3ef3bb(0x455)!=='Rygcq'){if(_0x48f003[_0x3ef3bb(0x225)](/(?:SKILL POINTS|SP):[ ](\d+)/gi))return Number(RegExp['$1']);}else this[_0x3ef3bb(0x28f)][_0x3ef3bb(0x2a7)]=!![],this[_0x3ef3bb(0x353)]=![],_0x1a0978['playSkillLearn'](),this[_0x3ef3bb(0x2b9)]()[_0x3ef3bb(0x246)](this['item']()),this[_0x3ef3bb(0x3d1)](),this[_0x3ef3bb(0x274)]['refresh'](),this[_0x3ef3bb(0x222)][_0x3ef3bb(0x3e0)]();}}}const _0x6dcbec=VisuMZ[_0x3ef3bb(0x203)][_0x3ef3bb(0x3b4)](_0x4d5cc4,_0x3ef3bb(0x20e));if(VisuMZ[_0x3ef3bb(0x203)]['JS'][_0x6dcbec]){if(_0x3ef3bb(0x3d5)===_0x3ef3bb(0x3d5)){const _0x366813=SceneManager[_0x3ef3bb(0x39e)]['user']();return VisuMZ[_0x3ef3bb(0x203)]['JS'][_0x6dcbec]['call'](this,_0x366813,_0x4d5cc4);}else{const _0x11a848=_0x39ab22(_0x223f7d['$1'])[_0x3ef3bb(0x2f8)](',')[_0x3ef3bb(0x460)](_0x17e665=>_0x2ab511(_0x17e665));for(const _0x553baf of _0x11a848){const _0x53f09a=_0x275b9f['switches'][_0x553baf],_0x270a64=_0x252794[_0x3ef3bb(0x31d)](_0x553baf)?_0x55805e:_0x1998f0;_0x10f110+=_0x270a64[_0x3ef3bb(0x21c)](_0x53f09a)+'\x0a';}}}return VisuMZ[_0x3ef3bb(0x203)][_0x3ef3bb(0x1fa)][_0x3ef3bb(0x443)][_0x3ef3bb(0x1ca)]||0x0;},DataManager[_0x1841c2(0x3e3)]=function(_0x4ae0d5){const _0x38c89=_0x1841c2;if(!_0x4ae0d5)return 0x0;if(!DataManager['isSkill'](_0x4ae0d5))return 0x0;const _0x34c3f4=VisuMZ['SkillLearnSystem'][_0x38c89(0x337)],_0x7affd9=_0x4ae0d5[_0x38c89(0x2b3)],_0x2c0906=[],_0x463a35=_0x7affd9[_0x38c89(0x225)](_0x34c3f4[_0x38c89(0x1c1)]);if(_0x463a35)for(const _0x3559db of _0x463a35){if('zyTBl'===_0x38c89(0x3bd))this['contents'][_0x38c89(0x290)](),this[_0x38c89(0x403)](),this['shouldDrawRequirements']()?this[_0x38c89(0x423)]():this[_0x38c89(0x328)]();else{if(!_0x3559db)continue;_0x3559db['match'](_0x34c3f4[_0x38c89(0x1c1)]);const _0x5ebeda=String(RegExp['$1']),_0x2a9fac={'id':0x0,'quantity':Number(RegExp['$2'])},_0x1c39c8=/^\d+$/[_0x38c89(0x3ad)](_0x5ebeda);_0x1c39c8?_0x2a9fac['id']=Number(_0x5ebeda):'uLtme'!==_0x38c89(0x43b)?(_0x5ca23c['SkillLearnSystem']['Game_System_initialize'][_0x38c89(0x324)](this),this[_0x38c89(0x330)]()):_0x2a9fac['id']=DataManager[_0x38c89(0x3d4)](_0x5ebeda),_0x2a9fac['id']>0x0&&_0x2c0906['push'](_0x2a9fac);}}if(_0x7affd9['match'](_0x34c3f4[_0x38c89(0x307)])){const _0x36b9a8=String(RegExp['$1'])[_0x38c89(0x2f8)](/[\r\n]+/);for(const _0x1b1c07 of _0x36b9a8){if(_0x1b1c07['match'](/ITEM[ ](.*):[ ](\d+)/gi)){if(_0x38c89(0x398)!==_0x38c89(0x398)){const _0xd962e1=_0x35d7a0['makeDeepCopy'](_0x26fb3d[_0x38c89(0x203)][_0x38c89(0x1fa)][_0x38c89(0x294)][_0x38c89(0x2d3)]);return!_0x5bb422['VisuMZ_2_ClassChangeSystem']&&(_0xd962e1[_0x38c89(0x1fb)]('CP'),_0xd962e1['remove']('JP')),_0xd962e1[_0x38c89(0x1fb)](_0x38c89(0x1dd))[_0x38c89(0x1fb)](_0x38c89(0x236))[_0x38c89(0x1fb)](_0x38c89(0x3f5));}else{const _0x6954a8=String(RegExp['$1']),_0x48e2d8={'id':0x0,'quantity':Number(RegExp['$2'])},_0x3ced8b=/^\d+$/[_0x38c89(0x3ad)](_0x6954a8);_0x3ced8b?_0x38c89(0x3a8)===_0x38c89(0x3a8)?_0x48e2d8['id']=Number(_0x6954a8):this[_0x38c89(0x3fa)]():_0x48e2d8['id']=DataManager[_0x38c89(0x3d4)](_0x6954a8),_0x48e2d8['id']>0x0&&(_0x38c89(0x2bb)===_0x38c89(0x2bb)?_0x2c0906['push'](_0x48e2d8):_0x1c1884[_0x38c89(0x289)](_0x1d6290,_0x124030));}}}}return _0x2c0906;},DataManager[_0x1841c2(0x3a0)]=function(_0x4f8315){const _0x543aa7=_0x1841c2;if(!_0x4f8315)return 0x0;if(!DataManager['isSkill'](_0x4f8315))return 0x0;const _0x5f496f=VisuMZ[_0x543aa7(0x203)][_0x543aa7(0x337)],_0x440b3b=_0x4f8315[_0x543aa7(0x2b3)],_0x410367=[],_0x4f0a52=_0x440b3b[_0x543aa7(0x225)](_0x5f496f[_0x543aa7(0x39d)]);if(_0x4f0a52){if(_0x543aa7(0x41b)===_0x543aa7(0x41b))for(const _0x5a2d96 of _0x4f0a52){if(_0x543aa7(0x3ac)===_0x543aa7(0x3ac)){if(!_0x5a2d96)continue;_0x5a2d96[_0x543aa7(0x225)](_0x5f496f[_0x543aa7(0x39d)]);const _0x5da017=String(RegExp['$1']),_0x2fab91={'id':0x0,'quantity':Number(RegExp['$2'])},_0x29391b=/^\d+$/[_0x543aa7(0x3ad)](_0x5da017);_0x29391b?_0x2fab91['id']=Number(_0x5da017):_0x2fab91['id']=DataManager[_0x543aa7(0x291)](_0x5da017),_0x2fab91['id']>0x0&&_0x410367[_0x543aa7(0x43a)](_0x2fab91);}else{if(_0x45dbe6[_0x543aa7(0x225)](/(?:CLASS POINTS|CP):[ ](\d+)/gi))return _0x17d7fc(_0x2ac4b0['$1']);}}else _0x53ef41=_0x396cd5(_0x1ebdd2[_0x543aa7(0x3c4)]);}if(_0x440b3b[_0x543aa7(0x225)](_0x5f496f[_0x543aa7(0x307)])){if(_0x543aa7(0x436)!==_0x543aa7(0x206)){const _0x55db18=String(RegExp['$1'])[_0x543aa7(0x2f8)](/[\r\n]+/);for(const _0x82970f of _0x55db18){if(_0x82970f[_0x543aa7(0x225)](/WEAPON[ ](.*):[ ](\d+)/gi)){const _0x20978a=String(RegExp['$1']),_0x5f45f1={'id':0x0,'quantity':Number(RegExp['$2'])},_0x3d9b5b=/^\d+$/[_0x543aa7(0x3ad)](_0x20978a);_0x3d9b5b?_0x5f45f1['id']=Number(_0x20978a):_0x5f45f1['id']=DataManager[_0x543aa7(0x291)](_0x20978a),_0x5f45f1['id']>0x0&&_0x410367[_0x543aa7(0x43a)](_0x5f45f1);}}}else _0x518bc1['push'](_0xc590bf(_0x33dca6));}return _0x410367;},DataManager['getSkillLearnArmorCost']=function(_0x11a345){const _0x74abd4=_0x1841c2;if(!_0x11a345)return 0x0;if(!DataManager[_0x74abd4(0x1e6)](_0x11a345))return 0x0;const _0x4d4589=VisuMZ[_0x74abd4(0x203)][_0x74abd4(0x337)],_0x3d5135=_0x11a345[_0x74abd4(0x2b3)],_0x506640=[],_0x53e08c=_0x3d5135[_0x74abd4(0x225)](_0x4d4589[_0x74abd4(0x41e)]);if(_0x53e08c)for(const _0x1d1928 of _0x53e08c){if(!_0x1d1928)continue;_0x1d1928[_0x74abd4(0x225)](_0x4d4589[_0x74abd4(0x41e)]);const _0x26e366=String(RegExp['$1']),_0x2b4eca={'id':0x0,'quantity':Number(RegExp['$2'])},_0xa59a1=/^\d+$/['test'](_0x26e366);_0xa59a1?_0x2b4eca['id']=Number(_0x26e366):_0x2b4eca['id']=DataManager[_0x74abd4(0x308)](_0x26e366),_0x2b4eca['id']>0x0&&_0x506640['push'](_0x2b4eca);}if(_0x3d5135['match'](_0x4d4589[_0x74abd4(0x307)])){if('osSPw'===_0x74abd4(0x41f)){const _0x40a403=String(RegExp['$1'])[_0x74abd4(0x2f8)](/[\r\n]+/);for(const _0x2358ee of _0x40a403){if(_0x2358ee[_0x74abd4(0x225)](/ARMOR[ ](.*):[ ](\d+)/gi)){if(_0x74abd4(0x1f2)===_0x74abd4(0x1f2)){const _0x3c1104=String(RegExp['$1']),_0x1d9f62={'id':0x0,'quantity':Number(RegExp['$2'])},_0x1ae5f6=/^\d+$/[_0x74abd4(0x3ad)](_0x3c1104);_0x1ae5f6?_0x1d9f62['id']=Number(_0x3c1104):_0x74abd4(0x386)!==_0x74abd4(0x386)?_0x540f2b['id']=_0x4a44b6['getItemIdWithName'](_0x1544a8):_0x1d9f62['id']=DataManager['getArmorIdWithName'](_0x3c1104),_0x1d9f62['id']>0x0&&_0x506640['push'](_0x1d9f62);}else this['_SkillLearnSystem_preventLevelUpGain']=!![],_0x5df257['SkillLearnSystem'][_0x74abd4(0x370)]['call'](this,_0x50434b,_0x2fd73b),this[_0x74abd4(0x351)]=_0x3c4636;}}}else{if(!_0x353d65[_0x74abd4(0x31d)](_0x4910a0))return![];}}return _0x506640;},DataManager[_0x1841c2(0x458)]=function(_0x29ac03){const _0x1621c0=_0x1841c2;if(!_0x29ac03)return 0x0;if(!DataManager[_0x1621c0(0x1e6)](_0x29ac03))return 0x0;const _0x2b7d79=VisuMZ[_0x1621c0(0x203)]['RegExp'],_0x2daac1=_0x29ac03[_0x1621c0(0x2b3)];if(_0x2daac1['match'](_0x2b7d79[_0x1621c0(0x384)]))return Number(RegExp['$1']);if(_0x2daac1[_0x1621c0(0x225)](_0x2b7d79[_0x1621c0(0x307)])){if('lnXeR'===_0x1621c0(0x1f3)){const _0x4c8fcc=String(RegExp['$1'])[_0x1621c0(0x2f8)](/[\r\n]+/);for(const _0x1b4bfc of _0x4c8fcc){if(_0x1b4bfc[_0x1621c0(0x225)](/GOLD:[ ](\d+)/gi)){if(_0x1621c0(0x35c)!==_0x1621c0(0x35c)){_0xc06695=(_0x22e2c1(_0x50973c)||'')[_0x1621c0(0x28e)]();const _0x4b6b68=/^\d+$/['test'](_0x38143e);_0x4b6b68?_0x4824ae[_0x1621c0(0x43a)](_0x58988a(_0x2de39c)):_0x1762f5['push'](_0x5a919a[_0x1621c0(0x269)](_0x44b94a));}else return Number(RegExp['$1']);}}}else _0x5798a4>0x0&&(_0x7b665d*=this[_0x1621c0(0x295)]()),this[_0x1621c0(0x359)](_0x4e9389,_0x105dec);}return 0x0;},TextManager[_0x1841c2(0x3e4)]=VisuMZ[_0x1841c2(0x203)]['Settings'][_0x1841c2(0x35a)][_0x1841c2(0x318)],ImageManager[_0x1841c2(0x459)]=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)][_0x1841c2(0x22d)][_0x1841c2(0x318)],ImageManager[_0x1841c2(0x3f3)]=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)][_0x1841c2(0x443)]['Icon'],SoundManager[_0x1841c2(0x2f3)]=function(){const _0x3f5cf6=_0x1841c2;AudioManager[_0x3f5cf6(0x232)](VisuMZ[_0x3f5cf6(0x203)][_0x3f5cf6(0x1fa)]['Sound']);},TextManager[_0x1841c2(0x21f)]=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)]['General'][_0x1841c2(0x369)],TextManager[_0x1841c2(0x3f7)]=VisuMZ[_0x1841c2(0x203)]['Settings'][_0x1841c2(0x294)][_0x1841c2(0x346)],TextManager[_0x1841c2(0x35f)]=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)][_0x1841c2(0x294)][_0x1841c2(0x3d0)],TextManager[_0x1841c2(0x32b)]=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)][_0x1841c2(0x294)]['ReqLevelFmt'],TextManager[_0x1841c2(0x297)]=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)]['General'][_0x1841c2(0x2e4)],TextManager[_0x1841c2(0x1ee)]=VisuMZ['SkillLearnSystem'][_0x1841c2(0x1fa)]['General'][_0x1841c2(0x21e)],TextManager['skillLearnSeparationFmt']=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)]['General'][_0x1841c2(0x39a)],TextManager['skillLearnItemFmt']=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)][_0x1841c2(0x294)][_0x1841c2(0x44f)],TextManager['skillLearnWeaponFmt']=VisuMZ['SkillLearnSystem']['Settings']['General'][_0x1841c2(0x45f)],TextManager[_0x1841c2(0x302)]=VisuMZ['SkillLearnSystem'][_0x1841c2(0x1fa)][_0x1841c2(0x294)]['ArmorFmt'],TextManager[_0x1841c2(0x230)]=VisuMZ[_0x1841c2(0x203)]['Settings'][_0x1841c2(0x294)][_0x1841c2(0x3c8)],TextManager[_0x1841c2(0x1c9)]=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)]['MenuAccess'][_0x1841c2(0x202)],TextManager[_0x1841c2(0x1c4)]=VisuMZ['SkillLearnSystem'][_0x1841c2(0x1fa)][_0x1841c2(0x22a)][_0x1841c2(0x425)],TextManager['skillLearnReqMet']=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)][_0x1841c2(0x22a)][_0x1841c2(0x2f7)],TextManager['skillLearnReqNotMet']=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)]['Window'][_0x1841c2(0x29f)],TextManager[_0x1841c2(0x2bf)]=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)][_0x1841c2(0x22a)][_0x1841c2(0x258)],TextManager[_0x1841c2(0x3db)]=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)]['Window']['ReqSkillFmt'],TextManager[_0x1841c2(0x2c6)]=VisuMZ[_0x1841c2(0x203)]['Settings'][_0x1841c2(0x22a)][_0x1841c2(0x21e)],TextManager[_0x1841c2(0x40e)]=VisuMZ['SkillLearnSystem'][_0x1841c2(0x1fa)][_0x1841c2(0x22a)][_0x1841c2(0x31b)],TextManager['skillLearningName']=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)]['Window'][_0x1841c2(0x3a4)],TextManager[_0x1841c2(0x233)]=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)][_0x1841c2(0x22a)]['IngredientCost'],TextManager[_0x1841c2(0x228)]=VisuMZ['SkillLearnSystem'][_0x1841c2(0x1fa)][_0x1841c2(0x22a)][_0x1841c2(0x306)],TextManager[_0x1841c2(0x31c)]=VisuMZ['SkillLearnSystem'][_0x1841c2(0x1fa)]['Window'][_0x1841c2(0x3ca)],TextManager['skillLearnCancelCmd']=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)][_0x1841c2(0x22a)][_0x1841c2(0x432)],TextManager[_0x1841c2(0x360)]=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)][_0x1841c2(0x22d)]['FullText'],TextManager[_0x1841c2(0x3fe)]=VisuMZ['SkillLearnSystem'][_0x1841c2(0x1fa)][_0x1841c2(0x22d)]['AbbrText'],TextManager[_0x1841c2(0x342)]=VisuMZ['SkillLearnSystem'][_0x1841c2(0x1fa)]['AbilityPoints'][_0x1841c2(0x24d)],TextManager[_0x1841c2(0x1f1)]=VisuMZ['SkillLearnSystem'][_0x1841c2(0x1fa)][_0x1841c2(0x443)]['FullText'],TextManager[_0x1841c2(0x1ec)]=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)][_0x1841c2(0x443)][_0x1841c2(0x332)],TextManager[_0x1841c2(0x343)]=VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x1fa)][_0x1841c2(0x443)][_0x1841c2(0x24d)],VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x335)]=BattleManager[_0x1841c2(0x279)],BattleManager[_0x1841c2(0x279)]=function(){const _0x504c2d=_0x1841c2;VisuMZ[_0x504c2d(0x203)][_0x504c2d(0x335)][_0x504c2d(0x324)](this),this[_0x504c2d(0x2eb)](),this['gainRewardsAbilityPoints'](),this[_0x504c2d(0x3ae)](),this[_0x504c2d(0x444)]();},VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x28a)]=BattleManager[_0x1841c2(0x461)],BattleManager[_0x1841c2(0x461)]=function(){const _0x22b0bb=_0x1841c2;VisuMZ['SkillLearnSystem']['BattleManager_displayRewards']['call'](this),this[_0x22b0bb(0x2d4)](),this[_0x22b0bb(0x447)]();},BattleManager['makeRewardsAbilityPoints']=function(){const _0x35af3b=_0x1841c2;this['_rewards'][_0x35af3b(0x27c)]=$gameTroop[_0x35af3b(0x3f2)]();},BattleManager[_0x1841c2(0x2d4)]=function(){const _0x36108c=_0x1841c2;if(!this[_0x36108c(0x23a)]())return;$gameMessage[_0x36108c(0x37e)]();const _0x261d30=$gameParty['members'](),_0x457703=VisuMZ['SkillLearnSystem'][_0x36108c(0x1fa)][_0x36108c(0x22d)],_0xf1a05d=_0x457703[_0x36108c(0x2e1)];for(const _0x20d6d5 of _0x261d30){if(!_0x20d6d5)continue;const _0x49f106=_0xf1a05d[_0x36108c(0x21c)](_0x20d6d5[_0x36108c(0x34f)](),_0x20d6d5['earnedAbilityPoints'](),TextManager['abilityPointsAbbr'],TextManager[_0x36108c(0x342)]);$gameMessage[_0x36108c(0x344)]('\x5c.'+_0x49f106);}},BattleManager[_0x1841c2(0x210)]=function(){const _0x39c3cb=_0x1841c2;this[_0x39c3cb(0x3c1)]['abilityPoints']=this['_rewards'][_0x39c3cb(0x27c)]||0x0;let _0x30afbd=$gameParty['allMembers']();VisuMZ[_0x39c3cb(0x203)][_0x39c3cb(0x1fa)][_0x39c3cb(0x22d)][_0x39c3cb(0x43c)]&&(_0x30afbd=_0x30afbd[_0x39c3cb(0x201)](_0x1d393f=>_0x1d393f['isAlive']()));for(const _0x4910be of _0x30afbd){if(_0x39c3cb(0x273)===_0x39c3cb(0x273)){if(!_0x4910be)continue;if(!$dataSystem[_0x39c3cb(0x362)]&&!_0x4910be[_0x39c3cb(0x3df)]())continue;_0x4910be[_0x39c3cb(0x249)](this[_0x39c3cb(0x3c1)]['abilityPoints']),_0x4910be[_0x39c3cb(0x2fe)](this['_rewards'][_0x39c3cb(0x27c)]);}else this[_0x39c3cb(0x1be)](_0x5bb884,_0x5b1d0e,_0x27bb49,_0x366a81);}},BattleManager[_0x1841c2(0x23a)]=function(){const _0x57ba7b=_0x1841c2;return VisuMZ[_0x57ba7b(0x203)][_0x57ba7b(0x1fa)][_0x57ba7b(0x22d)][_0x57ba7b(0x1eb)];},BattleManager[_0x1841c2(0x3ae)]=function(){const _0x65d9a5=_0x1841c2;this['_rewards'][_0x65d9a5(0x2cb)]=$gameTroop[_0x65d9a5(0x42d)]();},BattleManager[_0x1841c2(0x447)]=function(){const _0x5acf3a=_0x1841c2;if(!this[_0x5acf3a(0x41a)]())return;$gameMessage[_0x5acf3a(0x37e)]();const _0x49b48c=$gameParty[_0x5acf3a(0x3f8)](),_0x7f55e7=VisuMZ['SkillLearnSystem']['Settings'][_0x5acf3a(0x443)],_0x560b4b=_0x7f55e7[_0x5acf3a(0x2e1)];for(const _0x463cd5 of _0x49b48c){if(!_0x463cd5)continue;const _0x15114f=_0x560b4b[_0x5acf3a(0x21c)](_0x463cd5[_0x5acf3a(0x34f)](),_0x463cd5[_0x5acf3a(0x299)](),TextManager[_0x5acf3a(0x1ec)],TextManager[_0x5acf3a(0x343)]);$gameMessage[_0x5acf3a(0x344)]('\x5c.'+_0x15114f);}},BattleManager[_0x1841c2(0x444)]=function(){const _0x587a45=_0x1841c2;this[_0x587a45(0x3c1)][_0x587a45(0x2cb)]=this[_0x587a45(0x3c1)]['skillPoints']||0x0;let _0x24361a=$gameParty['allMembers']();VisuMZ[_0x587a45(0x203)]['Settings'][_0x587a45(0x443)][_0x587a45(0x43c)]&&(_0x24361a=_0x24361a[_0x587a45(0x201)](_0x2a7525=>_0x2a7525[_0x587a45(0x42a)]()));for(const _0x427fac of _0x24361a){if(!_0x427fac)continue;if(!$dataSystem[_0x587a45(0x362)]&&!_0x427fac[_0x587a45(0x3df)]())continue;_0x427fac['gainSkillPoints'](this['_rewards']['skillPoints']),_0x427fac[_0x587a45(0x2a5)](this[_0x587a45(0x3c1)][_0x587a45(0x2cb)]);}},BattleManager[_0x1841c2(0x41a)]=function(){const _0x534c35=_0x1841c2;return VisuMZ[_0x534c35(0x203)][_0x534c35(0x1fa)][_0x534c35(0x443)]['ShowVictory'];},VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x3e6)]=Game_System[_0x1841c2(0x20d)]['initialize'],Game_System['prototype'][_0x1841c2(0x243)]=function(){const _0xf9da1e=_0x1841c2;VisuMZ[_0xf9da1e(0x203)][_0xf9da1e(0x3e6)][_0xf9da1e(0x324)](this),this[_0xf9da1e(0x330)]();},Game_System[_0x1841c2(0x20d)][_0x1841c2(0x330)]=function(){const _0x2dc306=_0x1841c2;this[_0x2dc306(0x439)]=VisuMZ['SkillLearnSystem'][_0x2dc306(0x1fa)][_0x2dc306(0x35a)]['ShowMenu'];},Game_System['prototype'][_0x1841c2(0x41d)]=function(){const _0x181faf=_0x1841c2;if(this['_SkillLearnSystem_MenuAccess']===undefined){if(_0x181faf(0x39f)!==_0x181faf(0x2d7))this[_0x181faf(0x330)]();else{const _0x3ed67f=_0x5e0e19(_0x156811['$1']);this[_0x181faf(0x25a)]()[_0x181faf(0x44b)](_0x3ed67f);}}return this[_0x181faf(0x439)];},Game_System[_0x1841c2(0x20d)]['setSkillLearnSystemMenuAccess']=function(_0x76cabd){const _0x1e3d07=_0x1841c2;this[_0x1e3d07(0x439)]===undefined&&('Bbzet'===_0x1e3d07(0x3c0)?(this[_0x1e3d07(0x36c)]=this[_0x1e3d07(0x296)](),this['_earnedSkillPoints']=this[_0x1e3d07(0x293)]()):this[_0x1e3d07(0x330)]()),this['_SkillLearnSystem_MenuAccess']=_0x76cabd;},VisuMZ[_0x1841c2(0x203)]['Game_Action_applyItemUserEffect']=Game_Action[_0x1841c2(0x20d)][_0x1841c2(0x334)],Game_Action[_0x1841c2(0x20d)][_0x1841c2(0x334)]=function(_0x34fafe){const _0x3cd170=_0x1841c2;VisuMZ[_0x3cd170(0x203)][_0x3cd170(0x43d)][_0x3cd170(0x324)](this,_0x34fafe),this[_0x3cd170(0x313)](_0x34fafe);},Game_Action[_0x1841c2(0x20d)][_0x1841c2(0x313)]=function(_0x32f131){const _0x33161b=_0x1841c2;if(this[_0x33161b(0x451)]())this['applyItemSkillLearnSystemUserEffect'](_0x32f131);},Game_Action[_0x1841c2(0x20d)][_0x1841c2(0x3ba)]=function(_0x24600c){const _0x5eff3d=_0x1841c2,_0x5cbeec=VisuMZ['SkillLearnSystem']['RegExp'],_0x4e5ef1=this[_0x5eff3d(0x451)]()[_0x5eff3d(0x2b3)];if($gameParty[_0x5eff3d(0x31f)]()){if(this['subject']()['isActor']()&&_0x4e5ef1['match'](_0x5cbeec['UserGainAbilityPoints'])){if(_0x5eff3d(0x231)===_0x5eff3d(0x231)){const _0x1acf33=eval(RegExp['$1']);this['subject']()[_0x5eff3d(0x249)](_0x1acf33);}else _0x523d56=_0x3951d9[_0x5eff3d(0x354)](_0x19f153,_0x38b0e4);}else _0x5eff3d(0x292)!=='jOhNs'?this[_0x5eff3d(0x242)]():_0x477da5+=_0x2ab29a[_0x5eff3d(0x240)]((_0x58302b-_0x20f081)/0x2);if(_0x24600c[_0x5eff3d(0x2d1)]()&&_0x4e5ef1[_0x5eff3d(0x225)](_0x5cbeec[_0x5eff3d(0x364)])){const _0x57181c=eval(RegExp['$1']);_0x24600c[_0x5eff3d(0x249)](_0x57181c);}}if($gameParty[_0x5eff3d(0x31f)]()){if(this[_0x5eff3d(0x25a)]()[_0x5eff3d(0x2d1)]()&&_0x4e5ef1[_0x5eff3d(0x225)](_0x5cbeec[_0x5eff3d(0x3fb)])){if(_0x5eff3d(0x3b0)===_0x5eff3d(0x26d)){if(!this[_0x5eff3d(0x2af)])return;if(this[_0x5eff3d(0x2af)][_0x5eff3d(0x431)]())return;this[_0x5eff3d(0x3a5)](),this[_0x5eff3d(0x3d7)](this[_0x5eff3d(0x38e)]['shift']());}else{const _0x2436c6=eval(RegExp['$1']);this['subject']()[_0x5eff3d(0x44b)](_0x2436c6);}}else'SANYH'===_0x5eff3d(0x42b)?this['applySkillPoints']():(this[_0x5eff3d(0x3ab)](_0xc57a98[_0x5eff3d(0x31c)],'ok',this[_0x5eff3d(0x2ef)]()),this[_0x5eff3d(0x3ab)](_0x3a0043[_0x5eff3d(0x3b9)],_0x5eff3d(0x441)));if(_0x24600c[_0x5eff3d(0x2d1)]()&&_0x4e5ef1[_0x5eff3d(0x225)](_0x5cbeec[_0x5eff3d(0x20f)])){const _0x234b10=eval(RegExp['$1']);_0x24600c[_0x5eff3d(0x44b)](_0x234b10);}}if(_0x4e5ef1[_0x5eff3d(0x225)](/<NOTETAG>/i)){}},Game_Action[_0x1841c2(0x20d)][_0x1841c2(0x242)]=function(){const _0x1fb21c=_0x1841c2;if(!$gameParty[_0x1fb21c(0x31f)]())return;if(!this[_0x1fb21c(0x25a)]()[_0x1fb21c(0x2d1)]())return;const _0x1554d4=VisuMZ['SkillLearnSystem'][_0x1fb21c(0x1fa)][_0x1fb21c(0x22d)];let _0x1adf6b=0x0;try{if(_0x1fb21c(0x275)!==_0x1fb21c(0x3e1))_0x1adf6b=eval(_0x1554d4[_0x1fb21c(0x422)]);else{if(_0x244207[_0x1fb21c(0x203)][_0x1fb21c(0x1fa)][_0x1fb21c(0x22a)][_0x1fb21c(0x3bf)])return _0x2e684c[_0x1fb21c(0x203)][_0x1fb21c(0x1fa)]['Window']['ConfirmWindow_RectJS']['call'](this);const _0x381e43=this[_0x1fb21c(0x254)](),_0x3cfe53=_0x381e43[_0x1fb21c(0x23e)],_0x4fd81d=this[_0x1fb21c(0x235)](0x2,![]),_0x3bc787=_0x381e43['x'],_0x23bf15=_0x381e43['y']+_0x381e43['height']-_0x4fd81d;return new _0x4adb3a(_0x3bc787,_0x23bf15,_0x3cfe53,_0x4fd81d);}}catch(_0x5b2450){if($gameTemp[_0x1fb21c(0x1d3)]())console[_0x1fb21c(0x24a)](_0x5b2450);}this[_0x1fb21c(0x25a)]()['gainAbilityPoints'](_0x1adf6b);},Game_Action['prototype'][_0x1841c2(0x205)]=function(){const _0x2ac948=_0x1841c2;if(!$gameParty[_0x2ac948(0x31f)]())return;if(!this[_0x2ac948(0x25a)]()[_0x2ac948(0x2d1)]())return;const _0x587f22=VisuMZ[_0x2ac948(0x203)]['Settings'][_0x2ac948(0x443)];let _0x1367d2=0x0;try{_0x1367d2=eval(_0x587f22[_0x2ac948(0x422)]);}catch(_0xbd71ec){if($gameTemp['isPlaytest']())console[_0x2ac948(0x24a)](_0xbd71ec);}this[_0x2ac948(0x25a)]()[_0x2ac948(0x44b)](_0x1367d2);},VisuMZ[_0x1841c2(0x203)]['Game_Battler_onBattleStart']=Game_Battler['prototype'][_0x1841c2(0x238)],Game_Battler[_0x1841c2(0x20d)][_0x1841c2(0x238)]=function(_0xa61a4f){const _0x33cc7a=_0x1841c2;VisuMZ[_0x33cc7a(0x203)][_0x33cc7a(0x259)]['call'](this,_0xa61a4f),this[_0x33cc7a(0x2d1)]()&&(this[_0x33cc7a(0x36c)]=this[_0x33cc7a(0x296)](),this['_earnedSkillPoints']=this[_0x33cc7a(0x293)]());},VisuMZ[_0x1841c2(0x203)]['Game_Actor_setup']=Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x350)],Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x350)]=function(_0x25c466){const _0xd2f174=_0x1841c2;VisuMZ[_0xd2f174(0x203)][_0xd2f174(0x429)][_0xd2f174(0x324)](this,_0x25c466),this[_0xd2f174(0x411)](),this['gainStartingAbilityPoints'](),this[_0xd2f174(0x1e9)](),this[_0xd2f174(0x3b3)]();},VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x370)]=Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x1ef)],Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x1ef)]=function(_0x4f781a,_0x1d2662){const _0x5d1534=_0x1841c2;this[_0x5d1534(0x351)]=!![],VisuMZ['SkillLearnSystem'][_0x5d1534(0x370)]['call'](this,_0x4f781a,_0x1d2662),this[_0x5d1534(0x351)]=undefined;},VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x430)]=Game_Actor['prototype'][_0x1841c2(0x26f)],Game_Actor[_0x1841c2(0x20d)]['levelUp']=function(){const _0x4c0a5d=_0x1841c2;VisuMZ[_0x4c0a5d(0x203)][_0x4c0a5d(0x430)][_0x4c0a5d(0x324)](this),this[_0x4c0a5d(0x219)](this['currentClass']()['id']),this[_0x4c0a5d(0x37a)](this[_0x4c0a5d(0x322)]()['id']);},Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x411)]=function(){this['_abilityPoints']={};},Game_Actor['prototype'][_0x1841c2(0x244)]=function(){const _0x4f1346=_0x1841c2,_0x7f70b5=VisuMZ[_0x4f1346(0x203)][_0x4f1346(0x337)],_0x133dcb=this[_0x4f1346(0x2ff)]()['note'];if(_0x133dcb[_0x4f1346(0x225)](_0x7f70b5[_0x4f1346(0x26e)])){if('ZGibe'===_0x4f1346(0x434)){const _0xddb1b4=eval(RegExp['$1']);this[_0x4f1346(0x249)](_0xddb1b4);}else _0x1b1334+=_0x16ccfa-_0x5c0297;}const _0x5c04af=VisuMZ['SkillLearnSystem'][_0x4f1346(0x1fa)]['AbilityPoints'];if(!_0x5c04af['SharedResource'])return;const _0x3d16a6=_0x133dcb[_0x4f1346(0x225)](_0x7f70b5[_0x4f1346(0x26a)]);if(_0x3d16a6)for(const _0x46b39e of _0x3d16a6){if(!_0x46b39e)continue;_0x46b39e[_0x4f1346(0x225)](_0x7f70b5[_0x4f1346(0x26a)]);const _0x900200=String(RegExp['$1']),_0x1f1113=eval(RegExp['$2']),_0x2ff8b7=/^\d+$/['test'](_0x900200);let _0x2a84a0=0x0;if(_0x2ff8b7){if(_0x4f1346(0x28c)!=='QnDIx')_0x2a84a0=Number(_0x900200);else return![];}else _0x2a84a0=DataManager[_0x4f1346(0x2c0)](_0x900200);this[_0x4f1346(0x249)](_0x1f1113,_0x2a84a0);}},Game_Actor['prototype'][_0x1841c2(0x296)]=function(_0x1b56bf){const _0x5f0d77=_0x1841c2;this['_abilityPoints']===undefined&&this[_0x5f0d77(0x411)]();const _0x723547=VisuMZ['SkillLearnSystem'][_0x5f0d77(0x1fa)][_0x5f0d77(0x22d)];if(_0x723547[_0x5f0d77(0x3f0)]){if(_0x5f0d77(0x402)===_0x5f0d77(0x402))_0x1b56bf=0x0;else{const _0x10a293=_0x476017[_0x5f0d77(0x39e)][_0x5f0d77(0x2b9)]();return _0x4d4531[_0x5f0d77(0x203)]['JS'][_0x5ec269][_0x5f0d77(0x324)](this,_0x10a293,_0x435c6e);}}else{if(_0x5f0d77(0x21b)===_0x5f0d77(0x2e0)){const _0x14a2ce=_0x269ed3[_0x5f0d77(0x203)]['JS'][_0x114c36][_0x5f0d77(0x324)](this,_0x1dfa6e,_0x25dd1b);_0x355ec1+=_0x14a2ce+'\x0a';}else _0x1b56bf=_0x1b56bf||this['currentClass']()['id'];}return this[_0x5f0d77(0x377)][_0x1b56bf]=this[_0x5f0d77(0x377)][_0x1b56bf]||0x0,Math['round'](this[_0x5f0d77(0x377)][_0x1b56bf]);},Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x352)]=function(_0x3b453a,_0x2016c8){const _0x296d35=_0x1841c2;if(this['_abilityPoints']===undefined){if(_0x296d35(0x2c8)===_0x296d35(0x2c8))this[_0x296d35(0x411)]();else return _0xb087fa(_0x215a29['$1']);}const _0xa8e659=VisuMZ['SkillLearnSystem']['Settings'][_0x296d35(0x22d)];_0xa8e659[_0x296d35(0x3f0)]?_0x2016c8=0x0:_0x2016c8=_0x2016c8||this[_0x296d35(0x322)]()['id'];this[_0x296d35(0x377)][_0x2016c8]=this[_0x296d35(0x377)][_0x2016c8]||0x0,this[_0x296d35(0x377)][_0x2016c8]=Math[_0x296d35(0x240)](_0x3b453a||0x0);const _0x516724=_0xa8e659['MaxResource']||Number[_0x296d35(0x336)];this[_0x296d35(0x377)][_0x2016c8]=this[_0x296d35(0x377)][_0x2016c8][_0x296d35(0x2c3)](0x0,_0x516724);},Game_Actor[_0x1841c2(0x20d)]['gainAbilityPoints']=function(_0x550c31,_0x450697){const _0x4283d4=_0x1841c2;if(_0x550c31>0x0){if(_0x4283d4(0x3c5)!=='qdKXa')return _0x20fedf[_0x4283d4(0x203)]['JS'][_0x5c8f91][_0x4283d4(0x324)](this,this[_0x4283d4(0x2e3)],_0x378820);else _0x550c31*=this[_0x4283d4(0x3a6)]();}this[_0x4283d4(0x43f)](_0x550c31,_0x450697);},Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x2fe)]=function(_0x12c590){const _0x2383f7=_0x1841c2;if(!Imported[_0x2383f7(0x2d2)])return;_0x12c590>0x0&&(_0x12c590*=this[_0x2383f7(0x3a6)]()),this[_0x2383f7(0x2ce)](_0x12c590,'Ability');},Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x43f)]=function(_0x4e5b67,_0x507547){const _0x2974f1=_0x1841c2,_0x250607=VisuMZ[_0x2974f1(0x203)][_0x2974f1(0x1fa)]['AbilityPoints'];if(_0x250607['SharedResource']){if('VLKAy'===_0x2974f1(0x1b8))_0x507547=0x0;else{const _0x340181=_0x45d030(_0x38ef9c['$1']),_0x4ac6e3=_0x2779f8[_0x2974f1(0x2bf)][_0x2974f1(0x21c)](_0x340181,_0x2229f9[_0x2974f1(0x368)],_0x17fbd8[_0x2974f1(0x22e)]),_0x4f4bd4=_0x1c75d0[_0x2974f1(0x368)]>=_0x340181?_0x4a4120:_0x1bbf3e;_0x4ff110+=_0x4f4bd4[_0x2974f1(0x21c)](_0x4ac6e3)+'\x0a';}}else _0x507547=_0x507547||this[_0x2974f1(0x322)]()['id'];_0x4e5b67+=this[_0x2974f1(0x296)](_0x507547),this[_0x2974f1(0x352)](_0x4e5b67,_0x507547);},Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x315)]=function(_0x3086f0,_0x285a94){this['addAbilityPoints'](-_0x3086f0,_0x285a94);},Game_Actor[_0x1841c2(0x20d)]['abilityPointsRate']=function(){const _0xac5da2=_0x1841c2;return this[_0xac5da2(0x3fc)]()[_0xac5da2(0x2a0)]((_0x3bbf21,_0x5369c6)=>{const _0x188774=_0xac5da2;if(_0x188774(0x2ad)!==_0x188774(0x1da)){if(_0x5369c6&&_0x5369c6[_0x188774(0x2b3)]['match'](VisuMZ[_0x188774(0x203)][_0x188774(0x337)][_0x188774(0x45c)])){if(_0x188774(0x3ef)===_0x188774(0x1d9)){const _0x104fe5=_0x5ab1db[_0xabd503];_0x5d860d=_0x177e1d['skillLearnReqSkillFmt'][_0x188774(0x21c)]('\x5cI[%1]'[_0x188774(0x21c)](_0x104fe5[_0x188774(0x1ba)]),_0x104fe5[_0x188774(0x34f)]),_0x587e2a[_0x188774(0x1c5)]>0x0&&(_0xd062ca!==''?_0x34dc0e=_0x106a9e['format'](_0x3a64e0,_0x164382):_0x58b91a=_0x5627a5);}else return _0x3bbf21*(Number(RegExp['$1'])*0.01);}else return _0x3bbf21;}else _0x51f79d=_0x3ca7a6(_0x25acff);},0x1);},Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x219)]=function(_0x4f0eba){const _0x11ffc7=_0x1841c2;if(this['_SkillLearnSystem_preventLevelUpGain'])return;const _0x51879b=VisuMZ[_0x11ffc7(0x203)]['Settings'][_0x11ffc7(0x22d)];let _0x45017a=0x0;try{_0x45017a=eval(_0x51879b[_0x11ffc7(0x3c4)]);}catch(_0x3439a3){if($gameTemp['isPlaytest']())console[_0x11ffc7(0x24a)](_0x3439a3);}this[_0x11ffc7(0x249)](_0x45017a,_0x4f0eba);},Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x2d8)]=function(){const _0x5013f0=_0x1841c2;return this[_0x5013f0(0x36c)]=this[_0x5013f0(0x36c)]||0x0,this[_0x5013f0(0x296)]()-this[_0x5013f0(0x36c)];},Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x1e9)]=function(){const _0x3979de=_0x1841c2;this[_0x3979de(0x37d)]={};},Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x3b3)]=function(){const _0x4b1918=_0x1841c2,_0x4e0da4=VisuMZ[_0x4b1918(0x203)][_0x4b1918(0x337)],_0x2dfebc=this[_0x4b1918(0x2ff)]()[_0x4b1918(0x2b3)];if(_0x2dfebc['match'](_0x4e0da4[_0x4b1918(0x35b)])){if(_0x4b1918(0x3cb)==='XJwEJ')_0x31c105=_0x23eed9[_0x4b1918(0x21c)](_0x4a4381,_0x9bc7f0);else{const _0x257260=eval(RegExp['$1']);this[_0x4b1918(0x44b)](_0x257260);}}const _0x43f4b2=VisuMZ[_0x4b1918(0x203)]['Settings'][_0x4b1918(0x443)];if(!_0x43f4b2['SharedResource'])return;const _0x3004fe=_0x2dfebc[_0x4b1918(0x225)](_0x4e0da4[_0x4b1918(0x1b6)]);if(_0x3004fe){if(_0x4b1918(0x2f9)==='IgUKs')for(const _0x4e67f8 of _0x3004fe){if(_0x4b1918(0x286)==='DfJGW'){if(!_0x4e67f8)continue;_0x4e67f8[_0x4b1918(0x225)](_0x4e0da4[_0x4b1918(0x1b6)]);const _0x23bd38=String(RegExp['$1']),_0x5bd417=eval(RegExp['$2']),_0x422e2d=/^\d+$/[_0x4b1918(0x3ad)](_0x23bd38);let _0x1f99cf=0x0;_0x422e2d?_0x4b1918(0x428)===_0x4b1918(0x428)?_0x1f99cf=Number(_0x23bd38):this[_0x4b1918(0x2da)]():_0x1f99cf=DataManager[_0x4b1918(0x2c0)](_0x23bd38),this[_0x4b1918(0x44b)](_0x5bd417,_0x1f99cf);}else _0x265e28=_0xdf1f87(_0x50f6bd[_0x4b1918(0x422)]);}else return this[_0x4b1918(0x2e3)]&&!this[_0x4b1918(0x2e3)][_0x4b1918(0x24b)](_0x1ba656);}},Game_Actor['prototype'][_0x1841c2(0x293)]=function(_0x2a07ef){const _0x2f88d0=_0x1841c2;if(this[_0x2f88d0(0x37d)]===undefined){if(_0x2f88d0(0x339)===_0x2f88d0(0x339))this[_0x2f88d0(0x1e9)]();else{if(_0x1a893f[_0x2f88d0(0x1d3)]())_0x2abeaa[_0x2f88d0(0x24a)](_0x5eed14);}}const _0x192d61=VisuMZ[_0x2f88d0(0x203)][_0x2f88d0(0x1fa)][_0x2f88d0(0x443)];return _0x192d61[_0x2f88d0(0x3f0)]?_0x2a07ef=0x0:_0x2a07ef=_0x2a07ef||this[_0x2f88d0(0x322)]()['id'],this[_0x2f88d0(0x37d)][_0x2a07ef]=this[_0x2f88d0(0x37d)][_0x2a07ef]||0x0,Math[_0x2f88d0(0x240)](this[_0x2f88d0(0x37d)][_0x2a07ef]);},Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x2c4)]=function(_0x148147,_0x48ae65){const _0x1bfd24=_0x1841c2;this[_0x1bfd24(0x37d)]===undefined&&this[_0x1bfd24(0x1e9)]();const _0x56bd0c=VisuMZ['SkillLearnSystem'][_0x1bfd24(0x1fa)][_0x1bfd24(0x443)];_0x56bd0c[_0x1bfd24(0x3f0)]?_0x48ae65=0x0:_0x48ae65=_0x48ae65||this[_0x1bfd24(0x322)]()['id'];this['_skillPoints'][_0x48ae65]=this[_0x1bfd24(0x37d)][_0x48ae65]||0x0,this['_skillPoints'][_0x48ae65]=Math[_0x1bfd24(0x240)](_0x148147||0x0);const _0x5e9b39=_0x56bd0c[_0x1bfd24(0x1d6)]||Number[_0x1bfd24(0x336)];this['_skillPoints'][_0x48ae65]=this[_0x1bfd24(0x37d)][_0x48ae65]['clamp'](0x0,_0x5e9b39);},Game_Actor[_0x1841c2(0x20d)]['gainSkillPoints']=function(_0x3f4fcf,_0xc36ba8){const _0x496db0=_0x1841c2;_0x3f4fcf>0x0&&(_0x3f4fcf*=this[_0x496db0(0x295)]()),this[_0x496db0(0x359)](_0x3f4fcf,_0xc36ba8);},Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x2a5)]=function(_0x3321f9){const _0x122f6c=_0x1841c2;if(!Imported[_0x122f6c(0x2d2)])return;_0x3321f9>0x0&&(_0x3321f9*=this['skillPointsRate']()),this[_0x122f6c(0x2ce)](_0x3321f9,'Skill');},Game_Actor['prototype'][_0x1841c2(0x359)]=function(_0x2b266c,_0x3b5a2b){const _0x594a88=_0x1841c2,_0x25cf47=VisuMZ[_0x594a88(0x203)]['Settings'][_0x594a88(0x443)];if(_0x25cf47[_0x594a88(0x3f0)])_0x3b5a2b=0x0;else{if(_0x594a88(0x325)!=='MpjrX')_0x3b5a2b=_0x3b5a2b||this['currentClass']()['id'];else return _0x47b83b['SkillLearnSystem'][_0x594a88(0x1fa)][_0x594a88(0x22a)][_0x594a88(0x3bf)]['call'](this);}_0x2b266c+=this[_0x594a88(0x293)](_0x3b5a2b),this[_0x594a88(0x2c4)](_0x2b266c,_0x3b5a2b);},Game_Actor[_0x1841c2(0x20d)]['loseSkillPoints']=function(_0x5c7c78,_0x8cade8){const _0x52622b=_0x1841c2;this[_0x52622b(0x359)](-_0x5c7c78,_0x8cade8);},Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x295)]=function(){const _0x27bea6=_0x1841c2;return this[_0x27bea6(0x3fc)]()[_0x27bea6(0x2a0)]((_0x3ef3f7,_0x93d6a8)=>{const _0xb13854=_0x27bea6;if(_0xb13854(0x389)===_0xb13854(0x2de)){if(!this[_0xb13854(0x353)])return;this['updateSkillLearnSpriteOpacity'](),this[_0xb13854(0x2ca)](),this['isFinishedSkillLearnAnimating']()&&this[_0xb13854(0x1e5)]();}else{if(_0x93d6a8&&_0x93d6a8[_0xb13854(0x2b3)][_0xb13854(0x225)](VisuMZ[_0xb13854(0x203)]['RegExp'][_0xb13854(0x2ea)]))return _0x3ef3f7*(Number(RegExp['$1'])*0.01);else{if('SuZOe'!==_0xb13854(0x304))return _0x3ef3f7;else{const _0x4bf716=_0x5c7102(_0x574bf2['$1']),_0x48f9fa='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Visible\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x4bf716),_0x156679=_0x52ee4a['SkillLearnSystem'][_0xb13854(0x3b4)](_0x2c9b07,_0x191cce);_0x81d40d[_0xb13854(0x203)]['JS'][_0x156679]=new _0x1661c5(_0x48f9fa);}}}},0x1);},Game_Actor[_0x1841c2(0x20d)]['levelUpGainSkillPoints']=function(_0x31920f){const _0x3d92e2=_0x1841c2;if(this['_SkillLearnSystem_preventLevelUpGain'])return;const _0x391784=VisuMZ['SkillLearnSystem'][_0x3d92e2(0x1fa)][_0x3d92e2(0x443)];let _0x584cc1=0x0;try{_0x584cc1=eval(_0x391784[_0x3d92e2(0x3c4)]);}catch(_0x4a4ea0){if(_0x3d92e2(0x301)!==_0x3d92e2(0x301)){const _0x49ebd1=_0x1cfe3e['_scene']['item'](),_0x3e349a=_0x134d64['_scene'][_0x3d92e2(0x2b9)]();return _0x3e349a&&!_0x3e349a[_0x3d92e2(0x24b)](_0x49ebd1);}else{if($gameTemp[_0x3d92e2(0x1d3)]())console[_0x3d92e2(0x24a)](_0x4a4ea0);}}this[_0x3d92e2(0x44b)](_0x584cc1,_0x31920f);},Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x299)]=function(){const _0x5ec0ca=_0x1841c2;return this[_0x5ec0ca(0x37b)]=this[_0x5ec0ca(0x37b)]||0x0,this[_0x5ec0ca(0x293)]()-this[_0x5ec0ca(0x37b)];},Game_Actor['prototype'][_0x1841c2(0x24b)]=function(_0x1ddac4){const _0xe4abf4=_0x1841c2;if(!_0x1ddac4)return![];const _0x3f6287=VisuMZ[_0xe4abf4(0x203)][_0xe4abf4(0x3b4)](_0x1ddac4,'jsLearnReq');if(VisuMZ['SkillLearnSystem']['JS'][_0x3f6287]){if(!VisuMZ[_0xe4abf4(0x203)]['JS'][_0x3f6287][_0xe4abf4(0x324)](this,this,_0x1ddac4))return![];}const _0x3e3cb9=VisuMZ[_0xe4abf4(0x203)][_0xe4abf4(0x337)],_0x32f67e=_0x1ddac4['note'];if(_0x32f67e[_0xe4abf4(0x225)](_0x3e3cb9['LearnReqLevel'])){const _0x7b4450=Number(RegExp['$1']);if(_0x7b4450>this[_0xe4abf4(0x368)])return![];}if(_0x32f67e[_0xe4abf4(0x225)](_0x3e3cb9['LearnReqSkillsAll'])){if('KJWny'!==_0xe4abf4(0x401)){const _0x32a8c7=String(RegExp['$1'])[_0xe4abf4(0x2f8)](',')[_0xe4abf4(0x460)](_0x501aeb=>_0x501aeb[_0xe4abf4(0x28e)]());for(const _0x37f076 of _0x32a8c7){let _0x5e9581=0x0;const _0x5638c8=/^\d+$/[_0xe4abf4(0x3ad)](_0x37f076);_0x5638c8?_0x5e9581=Number(_0x37f076):_0x5e9581=DataManager['getSkillIdWithName'](_0x37f076);if(!this[_0xe4abf4(0x3d3)](_0x5e9581))return![];}}else _0x554f76[_0xe4abf4(0x203)][_0xe4abf4(0x28a)]['call'](this),this[_0xe4abf4(0x2d4)](),this[_0xe4abf4(0x447)]();}if(_0x32f67e[_0xe4abf4(0x225)](_0x3e3cb9[_0xe4abf4(0x2d0)])){const _0x3b9128=String(RegExp['$1'])[_0xe4abf4(0x2f8)](',')[_0xe4abf4(0x460)](_0x355791=>_0x355791['trim']());let _0x8b46a1=![];for(const _0x2f67ab of _0x3b9128){let _0x53955e=0x0;const _0xa3ff16=/^\d+$/[_0xe4abf4(0x3ad)](_0x2f67ab);_0xa3ff16?_0xe4abf4(0x264)!==_0xe4abf4(0x1c3)?_0x53955e=Number(_0x2f67ab):_0x33cde8=_0x30e9a4(_0x8dd61c):_0x53955e=DataManager[_0xe4abf4(0x269)](_0x2f67ab);if($dataSkills[_0x53955e])console[_0xe4abf4(0x24a)]($dataSkills[_0x53955e][_0xe4abf4(0x34f)],this['isLearnedSkill'](_0x53955e));if(this['isLearnedSkill'](_0x53955e)){_0x8b46a1=!![];break;}}if(!_0x8b46a1)return![];}if(_0x32f67e[_0xe4abf4(0x225)](_0x3e3cb9[_0xe4abf4(0x418)])){const _0x4ae505=String(RegExp['$1'])['split'](',')[_0xe4abf4(0x460)](_0x352dc6=>Number(_0x352dc6));for(const _0x287e9e of _0x4ae505){if('JmUdj'===_0xe4abf4(0x391)){if(!$gameSwitches[_0xe4abf4(0x31d)](_0x287e9e))return![];}else _0x2c353a=_0x5c3cee[_0xe4abf4(0x269)](_0x3c3d5a);}}if(_0x32f67e['match'](_0x3e3cb9[_0xe4abf4(0x38d)])){if(_0xe4abf4(0x262)!==_0xe4abf4(0x262)){const _0x30b017=_0x4b245a(_0x45a50a['$1'])['split'](/[\r\n]+/);for(const _0x153799 of _0x30b017){if(_0x153799['match'](/(?:JOB POINTS|JP):[ ](\d+)/gi))return _0x2b1b9e(_0x5ce69a['$1']);}}else{const _0x2b8da3=String(RegExp['$1'])[_0xe4abf4(0x2f8)](',')['map'](_0xd3434d=>Number(_0xd3434d));let _0x15f226=![];for(const _0x27761d of _0x2b8da3){if($gameSwitches[_0xe4abf4(0x31d)](_0x27761d)){_0x15f226=!![];break;}}if(!_0x15f226)return![];}}return!![];},Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x36e)]=function(_0x2653bd){const _0x3cab3d=_0x1841c2;if(!_0x2653bd)return![];const _0x103985=DataManager[_0x3cab3d(0x3ed)](_0x2653bd);if(_0x103985>this[_0x3cab3d(0x296)]())return![];const _0x25ad03=DataManager['getSkillLearnSkillPointCost'](_0x2653bd);if(_0x25ad03>this['getSkillPoints']())return![];const _0x46201a=DataManager[_0x3cab3d(0x458)](_0x2653bd);if(_0x46201a>$gameParty[_0x3cab3d(0x278)]())return![];if(Imported[_0x3cab3d(0x2d2)]){if(_0x3cab3d(0x39c)!==_0x3cab3d(0x39c))this['initAbilityPoints']();else{const _0x1ec707=DataManager[_0x3cab3d(0x1fe)](_0x2653bd);if(_0x1ec707>this[_0x3cab3d(0x406)]())return![];const _0x76fe9b=DataManager[_0x3cab3d(0x220)](_0x2653bd);if(_0x76fe9b>this['getJobPoints']())return![];}}const _0x3c0091=DataManager[_0x3cab3d(0x3e3)](_0x2653bd);for(const _0x385c5d of _0x3c0091){if('ZSMLO'===_0x3cab3d(0x1bb)){const _0x415691=_0x4ca524[_0x3cab3d(0x2b3)];if(_0x415691['match'](_0x460538)){const _0x3addd6=_0x246ea0(_0x2b0e94['$1']),_0x29a857=_0x3cab3d(0x404)[_0x3cab3d(0x21c)](_0x3addd6),_0x469ecf=_0x10480e[_0x3cab3d(0x203)][_0x3cab3d(0x3b4)](_0x10f272,_0x1dbb63);_0x592448['SkillLearnSystem']['JS'][_0x469ecf]=new _0x5501a0(_0x29a857);}}else{if(!_0x385c5d)continue;const _0x4346a9=$dataItems[_0x385c5d['id']];if(_0x4346a9&&_0x385c5d[_0x3cab3d(0x32c)]>$gameParty['numItems'](_0x4346a9))return![];}}const _0x2ace70=DataManager['getSkillLearnWeaponCost'](_0x2653bd);for(const _0x15f9d4 of _0x2ace70){if(!_0x15f9d4)continue;const _0x4b2c09=$dataWeapons[_0x15f9d4['id']];if(_0x4b2c09&&_0x15f9d4[_0x3cab3d(0x32c)]>$gameParty['numItems'](_0x4b2c09))return![];}const _0x1b0cd8=DataManager['getSkillLearnArmorCost'](_0x2653bd);for(const _0x1cac1b of _0x1b0cd8){if('Mhzsh'!==_0x3cab3d(0x3b2))_0x325768['id']=_0x50c8e7[_0x3cab3d(0x308)](_0x4d70af);else{if(!_0x1cac1b)continue;const _0x277289=$dataArmors[_0x1cac1b['id']];if(_0x277289&&_0x1cac1b[_0x3cab3d(0x32c)]>$gameParty[_0x3cab3d(0x29a)](_0x277289))return![];}}return!![];},Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x246)]=function(_0x3f42d3){const _0x3ea29f=_0x1841c2;if(!_0x3f42d3)return;const _0x42bc75=DataManager[_0x3ea29f(0x3ed)](_0x3f42d3);this[_0x3ea29f(0x315)](_0x42bc75);const _0x4e87b3=DataManager['getSkillLearnSkillPointCost'](_0x3f42d3);this[_0x3ea29f(0x289)](_0x4e87b3);const _0x234e0d=DataManager[_0x3ea29f(0x458)](_0x3f42d3);$gameParty[_0x3ea29f(0x3b8)](_0x234e0d);if(Imported[_0x3ea29f(0x2d2)]){if(_0x3ea29f(0x1cc)!==_0x3ea29f(0x1cc))this[_0x3ea29f(0x1f4)]();else{const _0x265952=DataManager['getSkillLearnClassPointCost'](_0x3f42d3);this[_0x3ea29f(0x283)](_0x265952);const _0x2d6f63=DataManager[_0x3ea29f(0x220)](_0x3f42d3);this[_0x3ea29f(0x211)](_0x2d6f63);}}const _0x59b354=DataManager[_0x3ea29f(0x3e3)](_0x3f42d3);for(const _0x2f0cf6 of _0x59b354){if(!_0x2f0cf6)continue;const _0x4528d2=$dataItems[_0x2f0cf6['id']],_0xf55b9b=_0x2f0cf6[_0x3ea29f(0x32c)];$gameParty['loseItem'](_0x4528d2,_0xf55b9b);}const _0x49543e=DataManager[_0x3ea29f(0x3a0)](_0x3f42d3);for(const _0x6ac8b2 of _0x49543e){if(_0x3ea29f(0x348)!=='rYcpn')_0x3ed0f1['id']=_0x6e83c4[_0x3ea29f(0x3d4)](_0x48ac75);else{if(!_0x6ac8b2)continue;const _0x50b516=$dataWeapons[_0x6ac8b2['id']],_0x3ab666=_0x6ac8b2['quantity'];$gameParty[_0x3ea29f(0x22b)](_0x50b516,_0x3ab666);}}const _0x27bae4=DataManager['getSkillLearnArmorCost'](_0x3f42d3);for(const _0xdd8e8f of _0x27bae4){if(_0x3ea29f(0x1f9)==='jISAW'){if(!_0xdd8e8f)continue;const _0x43ad6a=$dataArmors[_0xdd8e8f['id']],_0x5d9310=_0xdd8e8f['quantity'];$gameParty['loseItem'](_0x43ad6a,_0x5d9310);}else{this[_0x3ea29f(0x22f)]['x']=_0x3a5092[_0x3ea29f(0x240)](_0x5da413[_0x3ea29f(0x23e)]/0x2);const _0x356a5f=_0x20bfe9[_0x3ea29f(0x240)](_0x37ac03[_0x3ea29f(0x34d)]*this[_0x3ea29f(0x22f)][_0x3ea29f(0x409)]['y']);this['_skillLearnIconSprite']['y']=_0x18a606[_0x3ea29f(0x240)]((_0x44db19[_0x3ea29f(0x399)]+_0x356a5f)/0x2);}}this[_0x3ea29f(0x25c)](_0x3f42d3['id']),this['refresh']();},VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x2f5)]=Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x25c)],Game_Actor[_0x1841c2(0x20d)][_0x1841c2(0x25c)]=function(_0x215d29){const _0x4de2a5=_0x1841c2,_0x403466=!this[_0x4de2a5(0x3d3)](_0x215d29);VisuMZ[_0x4de2a5(0x203)]['Game_Actor_learnSkill'][_0x4de2a5(0x324)](this,_0x215d29);if(_0x403466&&this['isLearnedSkill'](_0x215d29)){const _0x51bbbd=$dataSkills[_0x215d29],_0x130424=VisuMZ['SkillLearnSystem'][_0x4de2a5(0x3b4)](_0x51bbbd,'jsOnLearn');VisuMZ['SkillLearnSystem']['JS'][_0x130424]&&(_0x4de2a5(0x3bb)===_0x4de2a5(0x2cc)?_0x857441['addAbilityPoints'](_0x35763a,_0x3793fe):VisuMZ[_0x4de2a5(0x203)]['JS'][_0x130424][_0x4de2a5(0x324)](this,this,_0x51bbbd));}},Game_Actor['prototype'][_0x1841c2(0x2e6)]=function(){const _0x501ba0=_0x1841c2,_0x5137ef=DataManager[_0x501ba0(0x1ed)](this[_0x501ba0(0x322)]()['id']);for(const _0x511159 of _0x5137ef){const _0x1dc097=$dataSkills[_0x511159];if(!_0x1dc097)continue;if(_0x1dc097[_0x501ba0(0x34f)][_0x501ba0(0x28e)]()==='')continue;if(_0x1dc097[_0x501ba0(0x34f)][_0x501ba0(0x225)](/-----/i))continue;this[_0x501ba0(0x25c)](_0x511159);}},Game_Enemy[_0x1841c2(0x20d)][_0x1841c2(0x27c)]=function(){const _0x1f8307=_0x1841c2,_0x5c70f2=VisuMZ['SkillLearnSystem'][_0x1f8307(0x1fa)][_0x1f8307(0x22d)],_0x3a0c7b=VisuMZ['SkillLearnSystem'][_0x1f8307(0x337)],_0x1c81d1=this[_0x1f8307(0x42f)]()[_0x1f8307(0x2b3)];if(_0x1c81d1[_0x1f8307(0x225)](_0x3a0c7b[_0x1f8307(0x2f2)])){if(_0x1f8307(0x221)!==_0x1f8307(0x2b4))try{if(_0x1f8307(0x1dc)===_0x1f8307(0x3e9)){const _0x2d1e9b=this[_0x1f8307(0x226)](_0x3393b0),_0x427fda=this[_0x1f8307(0x300)](_0x2d1e9b)[_0x1f8307(0x23e)];_0xdf22ec+=_0x35cdf2-_0x427fda,this['drawTextEx'](_0x2d1e9b,_0x10d4a5,_0x36b5b4);}else return eval(RegExp['$1']);}catch(_0x364919){if($gameTemp[_0x1f8307(0x1d3)]())console[_0x1f8307(0x24a)](_0x364919);return 0x0;}else{_0x29c555=_0x3676be||'left';const _0x1b913c=_0x1f8307(0x305)[_0x1f8307(0x21c)](_0x520fc5[_0x1f8307(0x3f3)]),_0x5abc05=_0x345120['skillPointsFmt'],_0x1532df=_0x5abc05[_0x1f8307(0x21c)](_0x5a73be,_0x290d63[_0x1f8307(0x1ec)],_0x1b913c,_0x344d1b[_0x1f8307(0x1f1)]),_0x202610=this['textSizeEx'](_0x1532df)[_0x1f8307(0x23e)];if(_0x53174===_0x1f8307(0x1d7))_0x10f158+=0x0;else _0x2e3c1f===_0x1f8307(0x3a2)?_0x3462ae+=_0x1cb90c[_0x1f8307(0x240)]((_0x41fa7b-_0x202610)/0x2):_0x39c73a+=_0x448f76-_0x202610;this[_0x1f8307(0x3a9)](_0x1532df,_0x44f4a2,_0x599648);}}try{return _0x1f8307(0x2c5)!==_0x1f8307(0x37f)?eval(_0x5c70f2[_0x1f8307(0x2d6)]):(_0x329367=_0x5384c7[_0x1f8307(0x33c)],_0x2574e7[_0x1f8307(0x21c)](_0x2c11b2,_0x2fad62[_0x1f8307(0x2c2)],_0x1f8307(0x305)[_0x1f8307(0x21c)](_0x2e78e4[_0x1f8307(0x32e)]),_0x315c85['classPointsFull']));}catch(_0x3d6144){if(_0x1f8307(0x371)===_0x1f8307(0x371)){if($gameTemp[_0x1f8307(0x1d3)]())console[_0x1f8307(0x24a)](_0x3d6144);return 0x0;}else _0x3aba04[_0x1f8307(0x1fb)]('CP'),_0x4becb7[_0x1f8307(0x1fb)]('JP');}},Game_Enemy[_0x1841c2(0x20d)][_0x1841c2(0x2cb)]=function(){const _0x27cdfb=_0x1841c2,_0x3f83d6=VisuMZ[_0x27cdfb(0x203)]['Settings'][_0x27cdfb(0x443)],_0x24c989=VisuMZ['SkillLearnSystem'][_0x27cdfb(0x337)],_0x1aee9a=this[_0x27cdfb(0x42f)]()['note'];if(_0x1aee9a[_0x27cdfb(0x225)](_0x24c989[_0x27cdfb(0x1f7)]))try{return eval(RegExp['$1']);}catch(_0x30986f){if($gameTemp['isPlaytest']())console[_0x27cdfb(0x24a)](_0x30986f);return 0x0;}try{if(_0x27cdfb(0x2fb)==='Bwbaa')return eval(_0x3f83d6[_0x27cdfb(0x2d6)]);else{const _0x359970=_0x9cf33d[_0x27cdfb(0x203)][_0x27cdfb(0x1fa)][_0x27cdfb(0x443)];_0x359970['SharedResource']?_0x3752c9=0x0:_0x2577ec=_0xfcc7b0||this['currentClass']()['id'],_0x2b21b6+=this[_0x27cdfb(0x293)](_0xcec6bb),this['setSkillPoints'](_0x4a2fe2,_0x58c6b6);}}catch(_0x2c4867){if($gameTemp[_0x27cdfb(0x1d3)]())console[_0x27cdfb(0x24a)](_0x2c4867);return 0x0;}},VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x3ea)]=Game_Party['prototype'][_0x1841c2(0x3cd)],Game_Party[_0x1841c2(0x20d)][_0x1841c2(0x3cd)]=function(){const _0x1396d7=_0x1841c2;VisuMZ[_0x1396d7(0x203)]['Game_Party_setupBattleTestMembers'][_0x1396d7(0x324)](this),this[_0x1396d7(0x2fa)]();},Game_Party[_0x1841c2(0x20d)][_0x1841c2(0x2fa)]=function(){const _0x34cca0=_0x1841c2;for(const _0x10eae0 of this[_0x34cca0(0x3ce)]()){if(!_0x10eae0)continue;_0x10eae0[_0x34cca0(0x2e6)]();}},Game_Troop[_0x1841c2(0x20d)][_0x1841c2(0x3f2)]=function(){const _0x2ad1ad=_0x1841c2;return this[_0x2ad1ad(0x2b7)]()[_0x2ad1ad(0x2a0)]((_0x317a8a,_0x24d6cc)=>_0x317a8a+_0x24d6cc['abilityPoints'](),0x0);},Game_Troop[_0x1841c2(0x20d)][_0x1841c2(0x42d)]=function(){const _0x343784=_0x1841c2;return this[_0x343784(0x2b7)]()['reduce']((_0x226933,_0x4fe802)=>_0x226933+_0x4fe802[_0x343784(0x2cb)](),0x0);},VisuMZ[_0x1841c2(0x203)]['Scene_Skill_create']=Scene_Skill[_0x1841c2(0x20d)][_0x1841c2(0x449)],Scene_Skill[_0x1841c2(0x20d)][_0x1841c2(0x449)]=function(){const _0x50ac2d=_0x1841c2;VisuMZ[_0x50ac2d(0x203)][_0x50ac2d(0x365)]['call'](this),this[_0x50ac2d(0x3b5)]();},Scene_Skill[_0x1841c2(0x20d)]['createSkillLearnSystemWindows']=function(){const _0x163b8e=_0x1841c2;this[_0x163b8e(0x417)](),this[_0x163b8e(0x1c7)]();},Scene_Skill['prototype'][_0x1841c2(0x417)]=function(){const _0x3c8314=_0x1841c2,_0xe83803=this[_0x3c8314(0x23f)]();this[_0x3c8314(0x1d5)]=new Window_SkillLearnIngredients(_0xe83803),this[_0x3c8314(0x426)](this[_0x3c8314(0x1d5)]),this['_skillLearnIngredientsWindow'][_0x3c8314(0x2c1)]();const _0x4244da=VisuMZ[_0x3c8314(0x203)][_0x3c8314(0x1fa)][_0x3c8314(0x22a)][_0x3c8314(0x1df)];this['_skillLearnIngredientsWindow'][_0x3c8314(0x280)](_0x4244da);},Scene_Skill[_0x1841c2(0x20d)]['skillLearnIngredientsWindowRect']=function(){const _0x309b90=_0x1841c2;if(VisuMZ[_0x309b90(0x203)]['Settings'][_0x309b90(0x22a)]['DetailWindow_RectJS'])return VisuMZ[_0x309b90(0x203)]['Settings'][_0x309b90(0x22a)][_0x309b90(0x303)][_0x309b90(0x324)](this);const _0x30177b=this[_0x309b90(0x254)](),_0x42658a=_0x30177b['x'],_0x2030f7=_0x30177b['y'],_0x3cb901=_0x30177b[_0x309b90(0x23e)],_0x54d1f6=_0x30177b[_0x309b90(0x399)]-this[_0x309b90(0x235)](0x2,![]);return new Rectangle(_0x42658a,_0x2030f7,_0x3cb901,_0x54d1f6);},Scene_Skill[_0x1841c2(0x20d)]['createSkillLearnConfirmWindow']=function(){const _0x388c94=_0x1841c2,_0x58e5f6=this['skillLearnConfirmWindow']();this[_0x388c94(0x310)]=new Window_SkillLearnConfirm(_0x58e5f6),this['addWindow'](this['_skillLearnConfirmWindow']),this[_0x388c94(0x310)]['setHandler']('ok',this[_0x388c94(0x45a)][_0x388c94(0x1e0)](this)),this[_0x388c94(0x310)][_0x388c94(0x21d)](_0x388c94(0x441),this['onSkillLearnConfirmCancel']['bind'](this)),this[_0x388c94(0x310)][_0x388c94(0x2c1)]();const _0xf7e08a=VisuMZ['SkillLearnSystem']['Settings'][_0x388c94(0x22a)]['ConfirmWindow_BgType'];this[_0x388c94(0x310)][_0x388c94(0x280)](_0xf7e08a);},Scene_Skill[_0x1841c2(0x20d)][_0x1841c2(0x442)]=function(){const _0x334735=_0x1841c2;if(VisuMZ['SkillLearnSystem'][_0x334735(0x1fa)][_0x334735(0x22a)][_0x334735(0x3bf)])return VisuMZ[_0x334735(0x203)][_0x334735(0x1fa)][_0x334735(0x22a)][_0x334735(0x3bf)][_0x334735(0x324)](this);const _0x588cb0=this[_0x334735(0x254)](),_0x29752b=_0x588cb0[_0x334735(0x23e)],_0x1a1e1c=this[_0x334735(0x235)](0x2,![]),_0xf25034=_0x588cb0['x'],_0x3334d5=_0x588cb0['y']+_0x588cb0[_0x334735(0x399)]-_0x1a1e1c;return new Rectangle(_0xf25034,_0x3334d5,_0x29752b,_0x1a1e1c);},VisuMZ[_0x1841c2(0x203)]['Scene_Skill_onItemOk']=Scene_Skill['prototype'][_0x1841c2(0x25d)],Scene_Skill[_0x1841c2(0x20d)][_0x1841c2(0x25d)]=function(){const _0x2d0aa0=_0x1841c2;if(this[_0x2d0aa0(0x274)]['isSkillLearnMode']()){if(_0x2d0aa0(0x331)===_0x2d0aa0(0x331))this['onSkillLearnItemOk']();else return _0x56c12b(_0x52129f['$1']);}else VisuMZ[_0x2d0aa0(0x203)][_0x2d0aa0(0x309)][_0x2d0aa0(0x324)](this);},Scene_Skill['prototype'][_0x1841c2(0x1f4)]=function(){const _0x32b79c=_0x1841c2;this[_0x32b79c(0x274)]['hide'](),this['_skillLearnIngredientsWindow'][_0x32b79c(0x3ff)](),this[_0x32b79c(0x1d5)]['refresh'](),this['_skillLearnConfirmWindow']['show'](),this[_0x32b79c(0x310)][_0x32b79c(0x3e0)](),this['_skillLearnConfirmWindow'][_0x32b79c(0x3d6)](),this['_skillLearnConfirmWindow'][_0x32b79c(0x20c)](0x0);},Scene_Skill[_0x1841c2(0x20d)][_0x1841c2(0x45a)]=function(){const _0x38f3b2=_0x1841c2;VisuMZ[_0x38f3b2(0x203)][_0x38f3b2(0x1fa)][_0x38f3b2(0x28d)]['ShowAnimations']?this[_0x38f3b2(0x23c)]():this['finishSkillLearnAnimation']();},Scene_Skill[_0x1841c2(0x20d)][_0x1841c2(0x3d1)]=function(){const _0x385a99=_0x1841c2;this['_itemWindow']['show'](),this[_0x385a99(0x274)]['activate'](),this[_0x385a99(0x1d5)][_0x385a99(0x2c1)](),this['_skillLearnConfirmWindow'][_0x385a99(0x2c1)]();},Scene_Skill['prototype'][_0x1841c2(0x2ab)]=function(){const _0x3808a1=_0x1841c2;this['_windowLayer'][_0x3808a1(0x2a7)]=!![],this[_0x3808a1(0x353)]=![],SoundManager[_0x3808a1(0x2f3)](),this[_0x3808a1(0x2b9)]()[_0x3808a1(0x246)](this['item']()),this['onSkillLearnConfirmCancel'](),this[_0x3808a1(0x274)]['refresh'](),this[_0x3808a1(0x222)]['refresh']();},VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x3a7)]=Scene_Skill[_0x1841c2(0x20d)][_0x1841c2(0x317)],Scene_Skill[_0x1841c2(0x20d)][_0x1841c2(0x317)]=function(){const _0x56e095=_0x1841c2;VisuMZ[_0x56e095(0x203)][_0x56e095(0x3a7)][_0x56e095(0x324)](this),this[_0x56e095(0x29d)]();},Scene_Skill[_0x1841c2(0x20d)][_0x1841c2(0x23c)]=function(){const _0xfc1c81=_0x1841c2;this[_0xfc1c81(0x353)]=!![],this[_0xfc1c81(0x229)]=0x14,this['_windowLayer'][_0xfc1c81(0x2a7)]=VisuMZ['SkillLearnSystem'][_0xfc1c81(0x1fa)]['Animation'][_0xfc1c81(0x390)]||![],this[_0xfc1c81(0x43e)]();},Scene_Skill[_0x1841c2(0x20d)][_0x1841c2(0x43e)]=function(){const _0x5aee31=_0x1841c2;this[_0x5aee31(0x22f)]=new Sprite(),this['addChild'](this['_skillLearnIconSprite']),this[_0x5aee31(0x223)](),this[_0x5aee31(0x427)](),this['setSkillLearnSkillSpritePosition'](),this[_0x5aee31(0x256)](),this[_0x5aee31(0x312)](),this['createSkillLearnAnimation'](this[_0x5aee31(0x38e)][_0x5aee31(0x44e)]());},Scene_Skill[_0x1841c2(0x20d)]['setSkillLearnSkillSpriteBitmap']=function(){const _0x46f0ff=_0x1841c2,_0x3afb05=VisuMZ[_0x46f0ff(0x203)][_0x46f0ff(0x337)],_0x28b9e7=this[_0x46f0ff(0x451)]()[_0x46f0ff(0x2b3)];this['_learnPicture']='';if(_0x28b9e7[_0x46f0ff(0x225)](_0x3afb05[_0x46f0ff(0x2b1)]))this['_learnPicture']=String(RegExp['$1']);else{if(_0x28b9e7[_0x46f0ff(0x225)](_0x3afb05['bigPicture'])){if(_0x46f0ff(0x27b)!==_0x46f0ff(0x27b))return this[_0x46f0ff(0x32f)]()?0x1:_0x3ff39[_0x46f0ff(0x203)][_0x46f0ff(0x2d5)][_0x46f0ff(0x324)](this);else this['_learnPicture']=String(RegExp['$1']);}}this[_0x46f0ff(0x209)]=new Sprite();this[_0x46f0ff(0x2ee)]?this[_0x46f0ff(0x209)]['bitmap']=ImageManager[_0x46f0ff(0x363)](this[_0x46f0ff(0x2ee)]):(this['_skillLearnBitmapSprite'][_0x46f0ff(0x2fc)]=ImageManager[_0x46f0ff(0x20a)](_0x46f0ff(0x282)),this[_0x46f0ff(0x209)][_0x46f0ff(0x2fc)][_0x46f0ff(0x29c)]=![]);this[_0x46f0ff(0x209)][_0x46f0ff(0x3f9)]['x']=0.5,this[_0x46f0ff(0x209)][_0x46f0ff(0x3f9)]['y']=0.5;if(!this['_learnPicture']){if(_0x46f0ff(0x30b)===_0x46f0ff(0x30b)){const _0x44fa2e=VisuMZ[_0x46f0ff(0x203)][_0x46f0ff(0x1fa)][_0x46f0ff(0x28d)]['Scale']||0x8;this['_skillLearnBitmapSprite']['scale']['x']=_0x44fa2e,this[_0x46f0ff(0x209)][_0x46f0ff(0x409)]['y']=_0x44fa2e;}else{const _0x2e4154=_0x4a4948[_0x46f0ff(0x39e)];if(!_0x2e4154)return![];const _0x2087e5=_0x2e4154[_0x46f0ff(0x274)];if(!_0x2087e5)return![];return _0x2087e5[_0x46f0ff(0x32f)]&&_0x2087e5[_0x46f0ff(0x32f)]();}}this[_0x46f0ff(0x22f)][_0x46f0ff(0x36a)](this[_0x46f0ff(0x209)]);},Scene_Skill[_0x1841c2(0x20d)][_0x1841c2(0x427)]=function(){const _0x38317c=_0x1841c2;if(this[_0x38317c(0x2ee)])return;const _0x3ebdfa=this[_0x38317c(0x451)](),_0x50437b=_0x3ebdfa['iconIndex'],_0x3e4a1f=ImageManager[_0x38317c(0x412)],_0x4e3140=ImageManager['iconHeight'],_0x286ec5=_0x50437b%0x10*_0x3e4a1f,_0x1bc28a=Math['floor'](_0x50437b/0x10)*_0x4e3140;this[_0x38317c(0x209)]['setFrame'](_0x286ec5,_0x1bc28a,_0x3e4a1f,_0x4e3140);},Scene_Skill['prototype'][_0x1841c2(0x36b)]=function(){const _0x5618b5=_0x1841c2;this[_0x5618b5(0x22f)]['x']=Math[_0x5618b5(0x240)](Graphics['width']/0x2);const _0x279317=Math[_0x5618b5(0x240)](ImageManager[_0x5618b5(0x34d)]*this[_0x5618b5(0x22f)]['scale']['y']);this['_skillLearnIconSprite']['y']=Math[_0x5618b5(0x240)]((Graphics[_0x5618b5(0x399)]+_0x279317)/0x2);},Scene_Skill[_0x1841c2(0x20d)][_0x1841c2(0x256)]=function(){const _0x3f4a9e=_0x1841c2;this['_skillLearnIconSpriteOpacitySpeed']=VisuMZ[_0x3f4a9e(0x203)][_0x3f4a9e(0x1fa)][_0x3f4a9e(0x28d)][_0x3f4a9e(0x1ff)]||0x1,this[_0x3f4a9e(0x451)]()[_0x3f4a9e(0x2b3)]['match'](VisuMZ[_0x3f4a9e(0x203)]['RegExp'][_0x3f4a9e(0x400)])&&('JyPvc'!=='JyPvc'?_0x44a196[_0x3f4a9e(0x43a)](_0x2bc3fa):this[_0x3f4a9e(0x347)]=Math['max'](Number(RegExp['$1']),0x1)),this[_0x3f4a9e(0x22f)][_0x3f4a9e(0x1fd)]=0x0;},Scene_Skill['prototype'][_0x1841c2(0x312)]=function(){const _0x210adf=_0x1841c2;this[_0x210adf(0x38e)]=[],this[_0x210adf(0x451)]()['note']['match'](VisuMZ['SkillLearnSystem'][_0x210adf(0x337)][_0x210adf(0x237)])?_0x210adf(0x358)!==_0x210adf(0x358)?this[_0x210adf(0x22f)]['opacity']+=this['_skillLearnIconSpriteOpacitySpeed']:this[_0x210adf(0x38e)]=RegExp['$1'][_0x210adf(0x2f8)](',')['map'](_0x54a2fa=>Number(_0x54a2fa)):this[_0x210adf(0x38e)]=this['_skillLearnAnimationIDs'][_0x210adf(0x3af)](VisuMZ['SkillLearnSystem'][_0x210adf(0x1fa)][_0x210adf(0x28d)][_0x210adf(0x437)]);},Scene_Skill[_0x1841c2(0x20d)][_0x1841c2(0x3d7)]=function(_0x2f9af3){const _0x81b339=_0x1841c2,_0x308982=$dataAnimations[_0x2f9af3];if(!_0x308982)return;const _0x2d5557=this[_0x81b339(0x45d)](_0x308982);this[_0x81b339(0x2af)]=new(_0x2d5557?Sprite_AnimationMV:Sprite_Animation)();const _0x24313d=[this['_skillLearnIconSprite']],_0x29a881=0x0;this['_skillLearnAnimationSprite'][_0x81b339(0x350)](_0x24313d,_0x308982,![],_0x29a881,null),this[_0x81b339(0x36a)](this[_0x81b339(0x2af)]);},Scene_Skill[_0x1841c2(0x20d)][_0x1841c2(0x45d)]=function(_0x2d7cd1){return!!_0x2d7cd1['frames'];},Scene_Skill[_0x1841c2(0x20d)]['updateSkillLearnAnimation']=function(){const _0x29e069=_0x1841c2;if(!this['_skillLearnAnimationPlaying'])return;this[_0x29e069(0x1bd)](),this['updateSkillLearnAnimationSprite']();if(this['isFinishedSkillLearnAnimating']()){if(_0x29e069(0x3d8)!==_0x29e069(0x3d8)){if(_0x5bb12e['isPlaytest']())_0x570576[_0x29e069(0x24a)](_0x2560ed);}else this[_0x29e069(0x1e5)]();}},Scene_Skill[_0x1841c2(0x20d)]['updateSkillLearnSpriteOpacity']=function(){const _0x2ca72a=_0x1841c2;this[_0x2ca72a(0x22f)][_0x2ca72a(0x1fd)]+=this[_0x2ca72a(0x347)];},Scene_Skill[_0x1841c2(0x20d)][_0x1841c2(0x2ca)]=function(){const _0x27d3a9=_0x1841c2;if(!this['_skillLearnAnimationSprite'])return;if(this[_0x27d3a9(0x2af)]['isPlaying']())return;this[_0x27d3a9(0x3a5)](),this['createSkillLearnAnimation'](this[_0x27d3a9(0x38e)][_0x27d3a9(0x44e)]());},Scene_Skill[_0x1841c2(0x20d)][_0x1841c2(0x3a5)]=function(){const _0x783426=_0x1841c2;if(!this[_0x783426(0x2af)])return;this[_0x783426(0x3dd)](this[_0x783426(0x2af)]),this[_0x783426(0x2af)][_0x783426(0x388)](),this[_0x783426(0x2af)]=undefined;},Scene_Skill[_0x1841c2(0x20d)]['destroySkillLearnSprite']=function(){const _0x533882=_0x1841c2;if(!this[_0x533882(0x22f)])return;this[_0x533882(0x3dd)](this[_0x533882(0x22f)]),this['_skillLearnIconSprite'][_0x533882(0x388)](),this['_skillLearnIconSprite']=undefined;},Scene_Skill[_0x1841c2(0x20d)][_0x1841c2(0x33d)]=function(){const _0x2c1e16=_0x1841c2;if(TouchInput[_0x2c1e16(0x416)]())return!![];if(Input[_0x2c1e16(0x414)]('ok'))return!![];if(Input[_0x2c1e16(0x414)](_0x2c1e16(0x441)))return!![];if(this[_0x2c1e16(0x22f)][_0x2c1e16(0x1fd)]<0xff)return![];if(this['_skillLearnAnimationSprite'])return![];return this[_0x2c1e16(0x229)]--<=0x0;},Scene_Skill[_0x1841c2(0x20d)][_0x1841c2(0x1e5)]=function(){const _0x52bc7d=_0x1841c2;this[_0x52bc7d(0x3a5)](),this[_0x52bc7d(0x374)](),this['finishSkillLearnAnimation'](),TouchInput['clear'](),Input[_0x52bc7d(0x290)]();},Window_Base[_0x1841c2(0x20d)][_0x1841c2(0x3a1)]=function(_0x3cdcc2,_0x3381d9,_0x489cdb,_0x18bc2d,_0x20c945){const _0x251c48=_0x1841c2;_0x20c945=_0x20c945||_0x251c48(0x1d7);const _0x5bb06a=_0x251c48(0x305)[_0x251c48(0x21c)](ImageManager['abilityPointsIcon']),_0x2f75e9=TextManager[_0x251c48(0x342)],_0x2885b2=_0x2f75e9[_0x251c48(0x21c)](_0x3cdcc2,TextManager['abilityPointsAbbr'],_0x5bb06a,TextManager[_0x251c48(0x360)]),_0x1989bf=this['textSizeEx'](_0x2885b2)[_0x251c48(0x23e)];if(_0x20c945==='left')_0x251c48(0x40d)===_0x251c48(0x40d)?_0x3381d9+=0x0:this[_0x251c48(0x328)]();else _0x20c945==='center'?_0x3381d9+=Math[_0x251c48(0x240)]((_0x18bc2d-_0x1989bf)/0x2):_0x3381d9+=_0x18bc2d-_0x1989bf;this[_0x251c48(0x3a9)](_0x2885b2,_0x3381d9,_0x489cdb);},Window_Base['prototype']['drawActorAbilityPoints']=function(_0x2466d1,_0x57ef35,_0x2ca9c9,_0x25278d,_0x1f0f3d,_0x4e4f60){const _0x2cced1=_0x2466d1['getAbilityPoints'](_0x57ef35);this['drawAbilityPoints'](_0x2cced1,_0x2ca9c9,_0x25278d,_0x1f0f3d,_0x4e4f60);},Window_Base[_0x1841c2(0x20d)]['drawSkillPoints']=function(_0x46a8eb,_0x1500f9,_0x515c5f,_0x3cf504,_0x2bb152){const _0x54638e=_0x1841c2;_0x2bb152=_0x2bb152||_0x54638e(0x1d7);const _0x42c815=_0x54638e(0x305)['format'](ImageManager[_0x54638e(0x3f3)]),_0x511ea6=TextManager['skillPointsFmt'],_0x2524d5=_0x511ea6[_0x54638e(0x21c)](_0x46a8eb,TextManager[_0x54638e(0x1ec)],_0x42c815,TextManager[_0x54638e(0x1f1)]),_0x27da7a=this[_0x54638e(0x300)](_0x2524d5)[_0x54638e(0x23e)];if(_0x2bb152===_0x54638e(0x1d7))_0x1500f9+=0x0;else _0x2bb152===_0x54638e(0x3a2)?_0x1500f9+=Math[_0x54638e(0x240)]((_0x3cf504-_0x27da7a)/0x2):_0x1500f9+=_0x3cf504-_0x27da7a;this['drawTextEx'](_0x2524d5,_0x1500f9,_0x515c5f);},Window_Base[_0x1841c2(0x20d)][_0x1841c2(0x2cf)]=function(_0x3be072,_0x4c8c81,_0x33a767,_0x1c8472,_0x111fe6,_0x40152d){const _0x34016e=_0x1841c2,_0x2e7901=_0x3be072[_0x34016e(0x293)](_0x4c8c81);this[_0x34016e(0x326)](_0x2e7901,_0x33a767,_0x1c8472,_0x111fe6,_0x40152d);},VisuMZ[_0x1841c2(0x203)]['Window_SkillType_makeCommandList']=Window_SkillType[_0x1841c2(0x20d)][_0x1841c2(0x1cd)],Window_SkillType[_0x1841c2(0x20d)][_0x1841c2(0x1cd)]=function(){const _0x5d66e6=_0x1841c2;VisuMZ[_0x5d66e6(0x203)][_0x5d66e6(0x372)]['call'](this),this['addSkillLearnSystemCommand']();},Window_SkillType[_0x1841c2(0x20d)]['addSkillLearnSystemCommand']=function(){const _0x443200=_0x1841c2;if(!$gameSystem[_0x443200(0x41d)]())return;if(!this[_0x443200(0x2e3)])return;let _0x566e03=this[_0x443200(0x44c)]();const _0x5a4051=this[_0x443200(0x2e3)][_0x443200(0x1d0)]()[0x0];this['addCommand'](_0x566e03,'skill',!![],'skillLearn');},Window_SkillType[_0x1841c2(0x20d)][_0x1841c2(0x44c)]=function(){const _0x535beb=_0x1841c2;let _0xf0e734=TextManager[_0x535beb(0x1c9)];if(_0xf0e734[_0x535beb(0x225)](/\\I\[(\d+)\]/i))return _0xf0e734;if(!Imported[_0x535beb(0x288)])return _0xf0e734;if(this[_0x535beb(0x1e8)]()===_0x535beb(0x2bd))return _0xf0e734;const _0x15796f=TextManager[_0x535beb(0x3e4)];return _0x535beb(0x395)[_0x535beb(0x21c)](_0x15796f,_0xf0e734);},VisuMZ['SkillLearnSystem'][_0x1841c2(0x367)]=Window_SkillStatus['prototype'][_0x1841c2(0x3e0)],Window_SkillStatus['prototype'][_0x1841c2(0x3e0)]=function(){const _0x5ccd67=_0x1841c2;this['resetFontSettings']();if(this[_0x5ccd67(0x32f)]())this[_0x5ccd67(0x2da)]();else{if(_0x5ccd67(0x29e)!=='MDAnB')VisuMZ['SkillLearnSystem'][_0x5ccd67(0x367)][_0x5ccd67(0x324)](this);else{const _0x3c1755=_0x2571cf['_scene'][_0x5ccd67(0x2b9)]();return _0x56954c[_0x5ccd67(0x203)]['JS'][_0x264402][_0x5ccd67(0x324)](this,_0x3c1755,_0x4868a7);}}},Window_SkillStatus[_0x1841c2(0x20d)]['isSkillLearnMode']=function(){const _0xbc9bbc=_0x1841c2,_0x47bcc6=SceneManager[_0xbc9bbc(0x39e)];if(!_0x47bcc6)return![];const _0x310a25=_0x47bcc6[_0xbc9bbc(0x274)];if(!_0x310a25)return![];return _0x310a25[_0xbc9bbc(0x32f)]&&_0x310a25[_0xbc9bbc(0x32f)]();},Window_SkillStatus[_0x1841c2(0x20d)]['refreshSkillLearnSystem']=function(){const _0x3b4895=_0x1841c2;if(!this[_0x3b4895(0x2e3)])return;Window_StatusBase[_0x3b4895(0x20d)][_0x3b4895(0x3e0)][_0x3b4895(0x324)](this);if(VisuMZ['SkillLearnSystem']['Settings'][_0x3b4895(0x294)]['StatusWindowDrawJS']){VisuMZ[_0x3b4895(0x203)][_0x3b4895(0x1fa)][_0x3b4895(0x294)][_0x3b4895(0x218)][_0x3b4895(0x324)](this);return;}const _0x238c94=this[_0x3b4895(0x20b)]()/0x2,_0x37bee1=this[_0x3b4895(0x214)],_0x56aed9=_0x37bee1/0x2-this[_0x3b4895(0x1d4)]()*1.5;this[_0x3b4895(0x1d2)](this[_0x3b4895(0x2e3)],_0x238c94+0x1,0x0,0x90,_0x37bee1),this[_0x3b4895(0x2dd)](this[_0x3b4895(0x2e3)],_0x238c94+0xb4,_0x56aed9);let _0x52d0f0=this[_0x3b4895(0x20b)]()/0x2+0xb4+0xb4+0xb4,_0x3adf9e=this[_0x3b4895(0x457)]-_0x52d0f0-0x2;if(_0x3adf9e<0x12c)return;const _0x200d3e=this[_0x3b4895(0x1e3)](),_0x52f5fc=Math[_0x3b4895(0x338)](this[_0x3b4895(0x214)]/this[_0x3b4895(0x1d4)]()),_0x39367c=Math[_0x3b4895(0x2d9)](_0x200d3e[_0x3b4895(0x1c5)]/_0x52f5fc);let _0xee31c3=_0x52d0f0,_0x580c17=Math[_0x3b4895(0x354)](Math['round']((this[_0x3b4895(0x214)]-this[_0x3b4895(0x1d4)]()*Math[_0x3b4895(0x2d9)](_0x200d3e[_0x3b4895(0x1c5)]/_0x39367c))/0x2),0x0);const _0x402db2=_0x580c17;let _0x537922=(this[_0x3b4895(0x457)]-_0xee31c3-this['itemPadding']()*0x2*_0x39367c)/_0x39367c;_0x39367c===0x1&&(_0x537922=Math['min'](ImageManager[_0x3b4895(0x3fd)],_0x537922),_0xee31c3+=Math[_0x3b4895(0x240)]((this['innerWidth']-_0xee31c3-this[_0x3b4895(0x433)]()*0x2-_0x537922)/0x2));for(const _0x24da9d of _0x200d3e){if(_0x3b4895(0x410)!=='CzIrs')_0x5ba33b[_0x3b4895(0x203)][_0x3b4895(0x429)][_0x3b4895(0x324)](this,_0xfc9c5c),this[_0x3b4895(0x411)](),this[_0x3b4895(0x244)](),this['initSkillPoints'](),this['gainStartingSkillPoints']();else{switch(_0x24da9d){case'AP':this[_0x3b4895(0x25b)](this[_0x3b4895(0x2e3)],this[_0x3b4895(0x2e3)][_0x3b4895(0x322)]()['id'],_0xee31c3,_0x580c17,_0x537922,_0x3b4895(0x27e));break;case'CP':Imported[_0x3b4895(0x2d2)]&&(_0x3b4895(0x327)!=='QRidN'?this[_0x3b4895(0x2ac)](this[_0x3b4895(0x2e3)],this[_0x3b4895(0x2e3)][_0x3b4895(0x322)]()['id'],_0xee31c3,_0x580c17,_0x537922,_0x3b4895(0x27e)):(_0x50672f=_0x253b84[_0x3b4895(0x203)]['JS'][_0x517e06][_0x3b4895(0x324)](this,this['_actor'],_0x5a16d7),_0x309599['length']>0x0&&(_0x560933!==''?_0x4f73d7=_0x17654f['format'](_0x4d1141,_0x4cd38d):_0x7f7f28=_0x2ba64c)));break;case'JP':Imported[_0x3b4895(0x2d2)]&&this['drawActorJobPoints'](this['_actor'],this[_0x3b4895(0x2e3)][_0x3b4895(0x322)]()['id'],_0xee31c3,_0x580c17,_0x537922,_0x3b4895(0x27e));break;case'SP':this['drawActorSkillPoints'](this[_0x3b4895(0x2e3)],this[_0x3b4895(0x2e3)][_0x3b4895(0x322)]()['id'],_0xee31c3,_0x580c17,_0x537922,_0x3b4895(0x27e));break;case _0x3b4895(0x40f):this[_0x3b4895(0x424)]($gameParty[_0x3b4895(0x278)](),TextManager[_0x3b4895(0x40c)],_0xee31c3,_0x580c17,_0x537922);break;default:continue;}_0x580c17+=this['lineHeight'](),_0x580c17+this[_0x3b4895(0x1d4)]()>this[_0x3b4895(0x214)]&&(_0x3b4895(0x2f0)===_0x3b4895(0x2f0)?(_0x580c17=_0x402db2,_0xee31c3+=_0x537922+this['itemPadding']()*0x2):(this['createSkillLearnIngredientsWindow'](),this[_0x3b4895(0x1c7)]()));}}},Window_SkillStatus[_0x1841c2(0x20d)][_0x1841c2(0x1e3)]=function(){const _0x59326a=_0x1841c2,_0x34b01b=JsonEx[_0x59326a(0x257)](VisuMZ['SkillLearnSystem'][_0x59326a(0x1fa)][_0x59326a(0x294)][_0x59326a(0x2d3)]);return!Imported[_0x59326a(0x2d2)]&&(_0x34b01b[_0x59326a(0x1fb)]('CP'),_0x34b01b[_0x59326a(0x1fb)]('JP')),_0x34b01b[_0x59326a(0x1fb)](_0x59326a(0x1dd))['remove'](_0x59326a(0x236))['remove'](_0x59326a(0x3f5));},Window_SkillList[_0x1841c2(0x20d)][_0x1841c2(0x32f)]=function(){const _0x471dc8=_0x1841c2;return this[_0x471dc8(0x1ea)]===_0x471dc8(0x3c9);},VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x26c)]=Window_SkillList['prototype'][_0x1841c2(0x421)],Window_SkillList[_0x1841c2(0x20d)][_0x1841c2(0x421)]=function(_0x118a49){const _0x49a565=_0x1841c2,_0x4c4856=this['isSkillLearnMode']();VisuMZ[_0x49a565(0x203)][_0x49a565(0x26c)]['call'](this,_0x118a49);if(_0x4c4856!==this[_0x49a565(0x32f)]()){const _0x14a299=SceneManager[_0x49a565(0x39e)];if(!_0x14a299)return;const _0x26caaf=_0x14a299[_0x49a565(0x222)];if(_0x26caaf)_0x26caaf[_0x49a565(0x3e0)]();}},VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x2d5)]=Window_SkillList['prototype'][_0x1841c2(0x435)],Window_SkillList[_0x1841c2(0x20d)][_0x1841c2(0x435)]=function(){const _0x470d04=_0x1841c2;if(this[_0x470d04(0x32f)]()){if(_0x470d04(0x446)===_0x470d04(0x446))return 0x1;else _0xa5f38=_0x3c3c6f['skillLearnSeparationFmt'][_0x470d04(0x21c)](_0x25f01d,_0x29222c);}else{if(_0x470d04(0x2c9)!==_0x470d04(0x2c9))_0x4b141c(_0x470d04(0x24e)['format'](_0x542c1d,_0x33f4d0)),_0x237f04['exit']();else return VisuMZ[_0x470d04(0x203)][_0x470d04(0x2d5)][_0x470d04(0x324)](this);}},VisuMZ[_0x1841c2(0x203)]['Window_SkillList_makeItemList']=Window_SkillList[_0x1841c2(0x20d)][_0x1841c2(0x355)],Window_SkillList[_0x1841c2(0x20d)][_0x1841c2(0x355)]=function(){const _0x30bbdb=_0x1841c2;this[_0x30bbdb(0x2e3)]&&this['isSkillLearnMode']()?this[_0x30bbdb(0x3fa)]():VisuMZ['SkillLearnSystem'][_0x30bbdb(0x1db)][_0x30bbdb(0x324)](this);},Window_SkillList[_0x1841c2(0x20d)][_0x1841c2(0x3fa)]=function(){const _0x25820a=_0x1841c2,_0x148c19=DataManager[_0x25820a(0x1ed)](this[_0x25820a(0x2e3)][_0x25820a(0x322)]()['id']);this[_0x25820a(0x24c)]=_0x148c19[_0x25820a(0x460)](_0x57b4f8=>$dataSkills[_0x57b4f8])[_0x25820a(0x201)](_0x2babdc=>this[_0x25820a(0x3ee)](_0x2babdc));},VisuMZ['SkillLearnSystem']['Window_SkillList_includes']=Window_SkillList[_0x1841c2(0x20d)][_0x1841c2(0x3ee)],Window_SkillList['prototype']['includes']=function(_0x457bd5){const _0x382446=_0x1841c2;if(this[_0x382446(0x32f)]()){if(_0x382446(0x1c0)===_0x382446(0x26b))_0x6d736=_0x5f17ab[_0x382446(0x269)](_0x42490f);else return this['skillLearnIncludes'](_0x457bd5);}else return VisuMZ[_0x382446(0x203)][_0x382446(0x3aa)]['call'](this,_0x457bd5);},Window_SkillList['prototype']['skillLearnIncludes']=function(_0x18d990){const _0x1c01d5=_0x1841c2;if(!_0x18d990)return![];if(_0x18d990[_0x1c01d5(0x34f)][_0x1c01d5(0x1c5)]<=0x0)return![];if(_0x18d990[_0x1c01d5(0x34f)][_0x1c01d5(0x225)](/-----/i))return![];const _0x15ddd2=VisuMZ[_0x1c01d5(0x203)][_0x1c01d5(0x3b4)](_0x18d990,_0x1c01d5(0x2a1));if(VisuMZ[_0x1c01d5(0x203)]['JS'][_0x15ddd2]){if('LQJgd'!=='aPYqg'){if(!VisuMZ[_0x1c01d5(0x203)]['JS'][_0x15ddd2][_0x1c01d5(0x324)](this,this['_actor'],_0x18d990))return![];}else this[_0x1c01d5(0x22f)]=new _0x302fc9(),this[_0x1c01d5(0x36a)](this[_0x1c01d5(0x22f)]),this['setSkillLearnSkillSpriteBitmap'](),this['setSkillLearnSkillSpriteFrame'](),this[_0x1c01d5(0x36b)](),this[_0x1c01d5(0x256)](),this[_0x1c01d5(0x312)](),this[_0x1c01d5(0x3d7)](this[_0x1c01d5(0x38e)][_0x1c01d5(0x44e)]());}const _0x2c2e89=VisuMZ[_0x1c01d5(0x203)][_0x1c01d5(0x337)],_0x50f860=_0x18d990[_0x1c01d5(0x2b3)];if(_0x50f860[_0x1c01d5(0x225)](_0x2c2e89['LearnShowLevel'])){const _0x2568ef=Number(RegExp['$1']);if(_0x2568ef>this[_0x1c01d5(0x2e3)][_0x1c01d5(0x368)])return![];}if(_0x50f860['match'](_0x2c2e89['LearnShowSkillsAll'])){if(_0x1c01d5(0x32d)!==_0x1c01d5(0x1bf)){const _0x5ee2cb=String(RegExp['$1'])[_0x1c01d5(0x2f8)](',')[_0x1c01d5(0x460)](_0x411a86=>_0x411a86['trim']());;for(const _0x162998 of _0x5ee2cb){if(_0x1c01d5(0x248)===_0x1c01d5(0x248)){let _0x450e36=0x0;const _0x4a30d9=/^\d+$/[_0x1c01d5(0x3ad)](_0x162998);_0x4a30d9?_0x450e36=Number(_0x162998):_0x1c01d5(0x385)!==_0x1c01d5(0x385)?_0x25d8a7=0x0:_0x450e36=DataManager[_0x1c01d5(0x269)](_0x162998);if(!this['_actor']['isLearnedSkill'](_0x450e36))return![];}else _0x4bb800=_0x597c87(_0x241e60);}}else _0x11d90c[_0x1c01d5(0x43a)](_0x55dd57['getSkillIdWithName'](_0x25a44b));}if(_0x50f860[_0x1c01d5(0x225)](_0x2c2e89['LearnShowSkillsAny'])){const _0x55cf47=String(RegExp['$1'])[_0x1c01d5(0x2f8)](',')['map'](_0x55ad31=>_0x55ad31[_0x1c01d5(0x28e)]());;let _0x507be7=![];for(const _0x505c7f of _0x55cf47){let _0x389ee7=0x0;const _0xf11ec2=/^\d+$/['test'](_0x505c7f);_0xf11ec2?_0x389ee7=Number(_0x505c7f):_0x389ee7=DataManager[_0x1c01d5(0x269)](_0x505c7f);if(this[_0x1c01d5(0x2e3)][_0x1c01d5(0x3d3)](_0x389ee7)){_0x507be7=!![];break;}}if(!_0x507be7)return![];}if(_0x50f860[_0x1c01d5(0x225)](_0x2c2e89['LearnShowSwitchesAll'])){const _0x571e83=String(RegExp['$1'])[_0x1c01d5(0x2f8)](',')[_0x1c01d5(0x460)](_0x434cdc=>Number(_0x434cdc));for(const _0x2c0120 of _0x571e83){if(_0x1c01d5(0x1f8)===_0x1c01d5(0x1f8)){if(!$gameSwitches['value'](_0x2c0120))return![];}else return _0x32b2de=_0x574456[_0x1c01d5(0x342)],_0x55c625[_0x1c01d5(0x21c)](_0x8f41c3,_0x59a139['abilityPointsAbbr'],_0x1c01d5(0x305)[_0x1c01d5(0x21c)](_0x4d391e[_0x1c01d5(0x459)]),_0x2c0b3c['abilityPointsFull']);}}if(_0x50f860['match'](_0x2c2e89[_0x1c01d5(0x261)])){const _0x50fb25=String(RegExp['$1'])[_0x1c01d5(0x2f8)](',')[_0x1c01d5(0x460)](_0x47c534=>Number(_0x47c534));let _0x27152f=![];for(const _0x2e6f5c of _0x50fb25){if($gameSwitches[_0x1c01d5(0x31d)](_0x2e6f5c)){if('NmBJe'==='NmBJe'){_0x27152f=!![];break;}else _0x7800ce=_0x55d9eb;}}if(!_0x27152f)return![];}return _0x18d990;},VisuMZ[_0x1841c2(0x203)][_0x1841c2(0x227)]=Window_SkillList[_0x1841c2(0x20d)][_0x1841c2(0x375)],Window_SkillList['prototype'][_0x1841c2(0x375)]=function(_0x24bd11){const _0x583b2c=_0x1841c2;return this[_0x583b2c(0x2e3)]&&this[_0x583b2c(0x32f)]()?this[_0x583b2c(0x239)](_0x24bd11):VisuMZ[_0x583b2c(0x203)][_0x583b2c(0x227)][_0x583b2c(0x324)](this,_0x24bd11);},VisuMZ[_0x1841c2(0x203)]['Window_SkillList_drawItem']=Window_SkillList[_0x1841c2(0x20d)][_0x1841c2(0x247)],Window_SkillList[_0x1841c2(0x20d)]['drawItem']=function(_0x33cae2){const _0xa7dd15=_0x1841c2;this[_0xa7dd15(0x2dc)]=this[_0xa7dd15(0x32f)](),VisuMZ[_0xa7dd15(0x203)][_0xa7dd15(0x3b6)][_0xa7dd15(0x324)](this,_0x33cae2),this['_skillLearnSystem_drawItemMode']=![];},Window_SkillList[_0x1841c2(0x20d)][_0x1841c2(0x239)]=function(_0x43641a){const _0x5d859f=_0x1841c2;if(!_0x43641a)return![];if(_0x43641a[_0x5d859f(0x34f)][_0x5d859f(0x1c5)]<=0x0)return![];if(_0x43641a[_0x5d859f(0x34f)][_0x5d859f(0x225)](/-----/i))return![];if(this[_0x5d859f(0x2e3)][_0x5d859f(0x3d3)](_0x43641a['id']))return![];if(this[_0x5d859f(0x2dc)]){if(!this['_actor'][_0x5d859f(0x24b)](_0x43641a))return![];return this[_0x5d859f(0x2e3)][_0x5d859f(0x36e)](_0x43641a);}return!![];},VisuMZ['SkillLearnSystem']['Window_SkillList_drawSkillCost']=Window_SkillList[_0x1841c2(0x20d)][_0x1841c2(0x450)],Window_SkillList['prototype'][_0x1841c2(0x450)]=function(_0x50e7b0,_0x975da7,_0xa22b70,_0x109614){const _0x329512=_0x1841c2;if(this[_0x329512(0x32f)]()){if(_0x329512(0x45e)==='QaxyP')this['shouldDrawSkillLearnRequirements'](_0x50e7b0)?this[_0x329512(0x1be)](_0x50e7b0,_0x975da7,_0xa22b70,_0x109614):this[_0x329512(0x2b6)](_0x50e7b0,_0x975da7,_0xa22b70,_0x109614);else return _0x1aa8c4(_0x2ec3a9['$1']);}else{if('ySxQQ'!=='btcOV')VisuMZ[_0x329512(0x203)][_0x329512(0x251)][_0x329512(0x324)](this,_0x50e7b0,_0x975da7,_0xa22b70,_0x109614);else{const _0x3c2934=this[_0x329512(0x23f)]();this[_0x329512(0x1d5)]=new _0x4de5ad(_0x3c2934),this['addWindow'](this[_0x329512(0x1d5)]),this['_skillLearnIngredientsWindow']['hide']();const _0x508acf=_0x544b25[_0x329512(0x203)][_0x329512(0x1fa)][_0x329512(0x22a)][_0x329512(0x1df)];this[_0x329512(0x1d5)][_0x329512(0x280)](_0x508acf);}}},Window_SkillList[_0x1841c2(0x20d)]['shouldDrawSkillLearnRequirements']=function(_0x7796ab){const _0x3e6080=_0x1841c2;return this['_actor']&&!this[_0x3e6080(0x2e3)][_0x3e6080(0x24b)](_0x7796ab);},Window_SkillList['prototype']['drawSkillLearnRequirements']=function(_0x503538,_0x247ee5,_0x2cc173,_0x47e844){const _0x1d8103=_0x1841c2,_0x46d3a4=this[_0x1d8103(0x226)](_0x503538),_0x48c234=this[_0x1d8103(0x300)](_0x46d3a4)['width'];_0x247ee5+=_0x47e844-_0x48c234,this[_0x1d8103(0x3a9)](_0x46d3a4,_0x247ee5,_0x2cc173);},Window_SkillList['prototype'][_0x1841c2(0x226)]=function(_0x2d0a92){const _0x59994f=_0x1841c2,_0x2389b2=VisuMZ['SkillLearnSystem'][_0x59994f(0x1fa)][_0x59994f(0x294)],_0x545352=TextManager['skillLearnReqSeparatorFmt'],_0x1ec3fd=VisuMZ[_0x59994f(0x203)][_0x59994f(0x337)],_0x2c7eb4=_0x2d0a92[_0x59994f(0x2b3)];let _0x2b5752='',_0x2b7a16='';const _0x2ac31c=[_0x59994f(0x284),'SKILLS',_0x59994f(0x267),'CUSTOM'];for(const _0x47a224 of _0x2ac31c){switch(_0x47a224){case _0x59994f(0x284):if(_0x2c7eb4[_0x59994f(0x225)](_0x1ec3fd[_0x59994f(0x382)])){if('Fyike'!==_0x59994f(0x272)){const _0x5788b8=Number(RegExp['$1']);_0x2b7a16=TextManager[_0x59994f(0x32b)][_0x59994f(0x21c)](_0x5788b8,TextManager[_0x59994f(0x368)],TextManager[_0x59994f(0x22e)]),_0x2b7a16[_0x59994f(0x1c5)]>0x0&&('LhVlA'!==_0x59994f(0x2a8)?_0x2b5752!==''?_0x2b5752=_0x545352['format'](_0x2b5752,_0x2b7a16):_0x2b5752=_0x2b7a16:(this[_0x59994f(0x347)]=_0xc7d03e['SkillLearnSystem'][_0x59994f(0x1fa)][_0x59994f(0x28d)][_0x59994f(0x1ff)]||0x1,this['item']()['note'][_0x59994f(0x225)](_0x517345[_0x59994f(0x203)]['RegExp'][_0x59994f(0x400)])&&(this['_skillLearnIconSpriteOpacitySpeed']=_0x1c16ef[_0x59994f(0x354)](_0x22561b(_0x564350['$1']),0x1)),this[_0x59994f(0x22f)][_0x59994f(0x1fd)]=0x0));}else this[_0x59994f(0x3c1)][_0x59994f(0x27c)]=_0x37fd32['abilityPointsTotal']();}break;case'SKILLS':if(_0x2c7eb4[_0x59994f(0x225)](_0x1ec3fd['LearnReqSkillsAll'])){const _0x5c8138=String(RegExp['$1'])['split'](',')[_0x59994f(0x460)](_0x3b5369=>_0x3b5369[_0x59994f(0x28e)]());;for(const _0x4398bb of _0x5c8138){if(_0x59994f(0x34c)===_0x59994f(0x2f4))_0x2bac9e[_0x59994f(0x203)][_0x59994f(0x1db)][_0x59994f(0x324)](this);else{let _0x31bf69=0x0;const _0x1e296b=/^\d+$/[_0x59994f(0x3ad)](_0x4398bb);_0x1e296b?_0x31bf69=Number(_0x4398bb):_0x31bf69=DataManager[_0x59994f(0x269)](_0x4398bb);if($dataSkills[_0x31bf69]){if(_0x59994f(0x440)===_0x59994f(0x234))_0xeec5c6=_0xde7f5b[_0x59994f(0x2c7)][_0x59994f(0x21c)](_0x1b53f6,_0x996d9e);else{const _0x377cff=$dataSkills[_0x31bf69];_0x2b7a16=TextManager[_0x59994f(0x297)]['format'](_0x59994f(0x305)[_0x59994f(0x21c)](_0x377cff[_0x59994f(0x1ba)]),_0x377cff['name']),_0x2b7a16['length']>0x0&&(_0x2b5752!==''?_0x2b5752=_0x545352[_0x59994f(0x21c)](_0x2b5752,_0x2b7a16):_0x2b5752=_0x2b7a16);}}}}}if(_0x2c7eb4[_0x59994f(0x225)](_0x1ec3fd[_0x59994f(0x2d0)])){if(_0x59994f(0x383)===_0x59994f(0x393)){const _0x4d1367=!this[_0x59994f(0x3d3)](_0x3c6c96);_0x4f8158[_0x59994f(0x203)]['Game_Actor_learnSkill'][_0x59994f(0x324)](this,_0x43ade9);if(_0x4d1367&&this[_0x59994f(0x3d3)](_0x2e078a)){const _0x215a21=_0x30a426[_0x5b15fe],_0xe3241e=_0x43b3ce['SkillLearnSystem'][_0x59994f(0x3b4)](_0x215a21,_0x59994f(0x2a2));_0x460d9e[_0x59994f(0x203)]['JS'][_0xe3241e]&&_0x597d15[_0x59994f(0x203)]['JS'][_0xe3241e][_0x59994f(0x324)](this,this,_0x215a21);}}else{const _0x3bd318=String(RegExp['$1'])[_0x59994f(0x2f8)](',')[_0x59994f(0x460)](_0x413504=>_0x413504[_0x59994f(0x28e)]());;for(const _0x3cfc83 of _0x3bd318){if(_0x59994f(0x276)===_0x59994f(0x276)){let _0x451fb7=0x0;const _0x5786e9=/^\d+$/['test'](_0x3cfc83);_0x5786e9?_0x451fb7=Number(_0x3cfc83):_0x451fb7=DataManager[_0x59994f(0x269)](_0x3cfc83);if($dataSkills[_0x451fb7]){const _0x7d9f9b=$dataSkills[_0x451fb7];_0x2b7a16=TextManager[_0x59994f(0x297)][_0x59994f(0x21c)](_0x59994f(0x305)[_0x59994f(0x21c)](_0x7d9f9b[_0x59994f(0x1ba)]),_0x7d9f9b[_0x59994f(0x34f)]),_0x2b7a16[_0x59994f(0x1c5)]>0x0&&(_0x2b5752!==''?_0x2b5752=_0x545352[_0x59994f(0x21c)](_0x2b5752,_0x2b7a16):_0x2b5752=_0x2b7a16);}}else return _0x2b4654=_0xfa7668[_0x59994f(0x230)],_0x22ec2f[_0x59994f(0x21c)](_0x2ac476,_0x5cece8[_0x59994f(0x39b)]?'\x5cI[%1]'['format'](_0x3d4cb9[_0x59994f(0x41c)][_0x59994f(0x1fa)][_0x59994f(0x40f)]['GoldIcon']):_0x29032b[_0x59994f(0x40c)],_0x31bf0f['currencyUnit']);}}}break;case _0x59994f(0x267):if(_0x2c7eb4[_0x59994f(0x225)](_0x1ec3fd[_0x59994f(0x418)])){const _0x34c1b7=String(RegExp['$1'])[_0x59994f(0x2f8)](',')['map'](_0x5c9e17=>_0x5c9e17['trim']());;for(const _0x342b59 of _0x34c1b7){if($dataSystem[_0x59994f(0x378)][_0x342b59]){if('iDuKs'==='rGjci')return this[_0x59994f(0x37b)]=this['_earnedSkillPoints']||0x0,this[_0x59994f(0x293)]()-this[_0x59994f(0x37b)];else{_0x2b7a16=TextManager['skillLearnReqSwitchFmt'][_0x59994f(0x21c)]($dataSystem[_0x59994f(0x378)][_0x342b59]||'');if(_0x2b7a16['length']>0x0){if(_0x59994f(0x454)===_0x59994f(0x397)){if(!_0x56342f)return![];if(_0x41608c[_0x59994f(0x34f)]['length']<=0x0)return![];if(_0x3a0631['name'][_0x59994f(0x225)](/-----/i))return![];if(this[_0x59994f(0x2e3)]['isLearnedSkill'](_0x831429['id']))return![];if(this[_0x59994f(0x2dc)]){if(!this['_actor'][_0x59994f(0x24b)](_0x1b7a65))return![];return this['_actor'][_0x59994f(0x36e)](_0xe4505b);}return!![];}else{if(_0x2b5752!=='')_0x2b5752=_0x545352['format'](_0x2b5752,_0x2b7a16);else{if(_0x59994f(0x1de)===_0x59994f(0x1de))_0x2b5752=_0x2b7a16;else{const _0x109244=_0x234a98[_0x59994f(0x293)](_0x5a06b5);this[_0x59994f(0x326)](_0x109244,_0x578116,_0x5313db,_0x39ee60,_0x51c6d6);}}}}}}}}if(_0x2c7eb4['match'](_0x1ec3fd[_0x59994f(0x38d)])){const _0x26759e=String(RegExp['$1'])[_0x59994f(0x2f8)](',')[_0x59994f(0x460)](_0x1da1c1=>_0x1da1c1[_0x59994f(0x28e)]());;for(const _0x13f464 of _0x26759e){$dataSystem[_0x59994f(0x378)][_0x13f464]&&(_0x2b7a16=TextManager[_0x59994f(0x1ee)][_0x59994f(0x21c)]($dataSystem[_0x59994f(0x378)][_0x13f464]||''),_0x2b7a16['length']>0x0&&(_0x2b5752!==''?_0x59994f(0x1c8)!==_0x59994f(0x3e5)?_0x2b5752=_0x545352[_0x59994f(0x21c)](_0x2b5752,_0x2b7a16):_0x25bd36['id']=_0x342108(_0x3bcc12):_0x2b5752=_0x2b7a16));}}break;case _0x59994f(0x32a):const _0x1ce0ed=VisuMZ[_0x59994f(0x203)]['createKeyJS'](_0x2d0a92,_0x59994f(0x250));VisuMZ[_0x59994f(0x203)]['JS'][_0x1ce0ed]&&(_0x2b7a16=VisuMZ[_0x59994f(0x203)]['JS'][_0x1ce0ed]['call'](this,this[_0x59994f(0x2e3)],_0x2d0a92),_0x2b7a16[_0x59994f(0x1c5)]>0x0&&(_0x2b5752!==''?_0x2b5752=_0x545352[_0x59994f(0x21c)](_0x2b5752,_0x2b7a16):_0x59994f(0x38b)===_0x59994f(0x38b)?_0x2b5752=_0x2b7a16:_0x2a86c5=_0x248e8c(_0x480e66)));break;}}return _0x2b5752=TextManager[_0x59994f(0x3f7)]['format'](_0x2b5752),_0x2b5752['trim']();},Window_SkillList[_0x1841c2(0x20d)][_0x1841c2(0x2b6)]=function(_0x5576b9,_0x18e851,_0x4259c7,_0x18a5fd){const _0x583a6e=_0x1841c2,_0x2a69d5=this['getSkillLearnCostText'](_0x5576b9),_0x1e27dd=this[_0x583a6e(0x300)](_0x2a69d5)[_0x583a6e(0x23e)];_0x18e851+=_0x18a5fd-_0x1e27dd,this['drawTextEx'](_0x2a69d5,_0x18e851,_0x4259c7);},Window_SkillList[_0x1841c2(0x20d)][_0x1841c2(0x2e5)]=function(_0x415d88){const _0xf4e9fb=_0x1841c2;if(this[_0xf4e9fb(0x2e3)]&&this[_0xf4e9fb(0x2e3)][_0xf4e9fb(0x3d3)](_0x415d88['id']))return TextManager[_0xf4e9fb(0x21f)];const _0x96e5bc=VisuMZ['SkillLearnSystem'][_0xf4e9fb(0x1fa)][_0xf4e9fb(0x294)],_0x2df72a=TextManager[_0xf4e9fb(0x2c7)];let _0x39d4b7='';const _0x37a50b=JsonEx[_0xf4e9fb(0x257)](_0x96e5bc[_0xf4e9fb(0x2d3)]);_0x37a50b[_0xf4e9fb(0x43a)](_0xf4e9fb(0x1d1));for(const _0x70d66e of _0x37a50b){if(!_0x70d66e)continue;const _0x3050af=this[_0xf4e9fb(0x452)](_0x415d88,_0x70d66e)[_0xf4e9fb(0x28e)]();if(_0x3050af[_0xf4e9fb(0x1c5)]>0x0){if(_0x39d4b7!==''){if(_0xf4e9fb(0x2ae)!==_0xf4e9fb(0x216))_0x39d4b7=_0x2df72a[_0xf4e9fb(0x21c)](_0x39d4b7,_0x3050af);else{const _0x57ed96=_0xe6dd4d(_0x18e656['$1']);_0x47f55e[_0xf4e9fb(0x249)](_0x57ed96);}}else _0x39d4b7=_0x3050af;}}return _0x39d4b7[_0xf4e9fb(0x28e)]();},Window_SkillList['prototype'][_0x1841c2(0x452)]=function(_0x1b37d8,_0x2598f9){const _0x5a04ed=_0x1841c2;let _0x4379bc=0x0,_0xc09b68='',_0x5eb36d='';switch(_0x2598f9[_0x5a04ed(0x380)]()[_0x5a04ed(0x28e)]()){case'AP':_0x4379bc=DataManager['getSkillLearnAbilityPointCost'](_0x1b37d8);if(_0x4379bc>0x0){if('jhOSH'!==_0x5a04ed(0x255))return _0xc09b68=TextManager[_0x5a04ed(0x342)],_0xc09b68[_0x5a04ed(0x21c)](_0x4379bc,TextManager['abilityPointsAbbr'],_0x5a04ed(0x305)['format'](ImageManager[_0x5a04ed(0x459)]),TextManager[_0x5a04ed(0x360)]);else{const _0xf7363c=_0xec9663[_0x5a04ed(0x3db)]['format']('\x5cI[%1]'[_0x5a04ed(0x21c)](_0x401be5[_0x5a04ed(0x1ba)]),_0x3bc8d0[_0x5a04ed(0x34f)]),_0x333c7a=_0x20cc7c[_0x5a04ed(0x3d3)](_0x201c33)?_0x5c82c3:_0x2638ea;_0x42d833+=_0x333c7a['format'](_0xf7363c)+'\x0a';}}break;case'SP':_0x4379bc=DataManager[_0x5a04ed(0x40b)](_0x1b37d8);if(_0x4379bc>0x0)return _0xc09b68=TextManager[_0x5a04ed(0x343)],_0xc09b68[_0x5a04ed(0x21c)](_0x4379bc,TextManager['skillPointsAbbr'],_0x5a04ed(0x305)[_0x5a04ed(0x21c)](ImageManager[_0x5a04ed(0x3f3)]),TextManager[_0x5a04ed(0x1f1)]);break;case _0x5a04ed(0x207):_0x4379bc=DataManager[_0x5a04ed(0x3e3)](_0x1b37d8),_0xc09b68=TextManager['skillLearnItemFmt'];for(const _0x1ba971 of _0x4379bc){if(!_0x1ba971)continue;const _0xac8834=$dataItems[_0x1ba971['id']];if(!_0xac8834)continue;const _0x909a17=_0xc09b68['format'](_0x1ba971[_0x5a04ed(0x32c)],_0x5a04ed(0x305)[_0x5a04ed(0x21c)](_0xac8834[_0x5a04ed(0x1ba)]),_0xac8834[_0x5a04ed(0x34f)]);_0x5eb36d!==''?_0x5eb36d=TextManager[_0x5a04ed(0x2c7)]['format'](_0x5eb36d,_0x909a17):'iklqp'===_0x5a04ed(0x30e)?(this[_0x5a04ed(0x274)][_0x5a04ed(0x2c1)](),this[_0x5a04ed(0x1d5)][_0x5a04ed(0x3ff)](),this[_0x5a04ed(0x1d5)][_0x5a04ed(0x3e0)](),this['_skillLearnConfirmWindow'][_0x5a04ed(0x3ff)](),this[_0x5a04ed(0x310)][_0x5a04ed(0x3e0)](),this['_skillLearnConfirmWindow'][_0x5a04ed(0x3d6)](),this[_0x5a04ed(0x310)][_0x5a04ed(0x20c)](0x0)):_0x5eb36d=_0x909a17;}return _0x5eb36d;case _0x5a04ed(0x1c6):_0x4379bc=DataManager[_0x5a04ed(0x3a0)](_0x1b37d8),_0xc09b68=TextManager[_0x5a04ed(0x34e)];for(const _0x30a2cc of _0x4379bc){if(!_0x30a2cc)continue;const _0x17d1e6=$dataWeapons[_0x30a2cc['id']];if(!_0x17d1e6)continue;const _0x2d5eaa=_0xc09b68[_0x5a04ed(0x21c)](_0x30a2cc[_0x5a04ed(0x32c)],'\x5cI[%1]'['format'](_0x17d1e6[_0x5a04ed(0x1ba)]),_0x17d1e6['name']);_0x5eb36d!==''?_0x5eb36d=TextManager[_0x5a04ed(0x2c7)][_0x5a04ed(0x21c)](_0x5eb36d,_0x2d5eaa):_0x5eb36d=_0x2d5eaa;}return _0x5eb36d;case _0x5a04ed(0x245):_0x4379bc=DataManager[_0x5a04ed(0x287)](_0x1b37d8),_0xc09b68=TextManager[_0x5a04ed(0x302)];for(const _0x2fb122 of _0x4379bc){if(!_0x2fb122)continue;const _0x19ed78=$dataArmors[_0x2fb122['id']];if(!_0x19ed78)continue;const _0x1f34da=_0xc09b68[_0x5a04ed(0x21c)](_0x2fb122['quantity'],_0x5a04ed(0x305)[_0x5a04ed(0x21c)](_0x19ed78['iconIndex']),_0x19ed78[_0x5a04ed(0x34f)]);_0x5eb36d!==''?_0x5eb36d=TextManager[_0x5a04ed(0x2c7)][_0x5a04ed(0x21c)](_0x5eb36d,_0x1f34da):_0x5a04ed(0x21a)===_0x5a04ed(0x34a)?this[_0x5a04ed(0x243)](...arguments):_0x5eb36d=_0x1f34da;}return _0x5eb36d;case _0x5a04ed(0x394):_0x4379bc=DataManager['getSkillLearnGoldCost'](_0x1b37d8);if(_0x4379bc>0x0)return _0xc09b68=TextManager[_0x5a04ed(0x230)],_0xc09b68[_0x5a04ed(0x21c)](_0x4379bc,Imported['VisuMZ_0_CoreEngine']?_0x5a04ed(0x305)[_0x5a04ed(0x21c)](VisuMZ[_0x5a04ed(0x41c)][_0x5a04ed(0x1fa)][_0x5a04ed(0x40f)][_0x5a04ed(0x2a9)]):TextManager[_0x5a04ed(0x40c)],TextManager['currencyUnit']);break;case'CUSTOM':const _0xf97357=VisuMZ[_0x5a04ed(0x203)][_0x5a04ed(0x3b4)](_0x1b37d8,_0x5a04ed(0x340));if(VisuMZ[_0x5a04ed(0x203)]['JS'][_0xf97357])return VisuMZ[_0x5a04ed(0x203)]['JS'][_0xf97357][_0x5a04ed(0x324)](this,this[_0x5a04ed(0x2e3)],_0x1b37d8);break;case'CP':if(Imported[_0x5a04ed(0x2d2)]){_0x4379bc=DataManager[_0x5a04ed(0x1fe)](_0x1b37d8);if(_0x4379bc>0x0)return _0xc09b68=TextManager['classPointsFmt'],_0xc09b68['format'](_0x4379bc,TextManager[_0x5a04ed(0x2c2)],'\x5cI[%1]'[_0x5a04ed(0x21c)](ImageManager[_0x5a04ed(0x32e)]),TextManager[_0x5a04ed(0x36f)]);break;}case'JP':if(Imported[_0x5a04ed(0x2d2)]){if(_0x5a04ed(0x1f5)===_0x5a04ed(0x2bc)){const _0x1ff91f=_0x383122[_0x5a04ed(0x39e)];if(!_0x1ff91f)return![];const _0x26f41d=_0x1ff91f[_0x5a04ed(0x2b9)]();if(!_0x26f41d)return![];const _0x30e010=_0x1ff91f[_0x5a04ed(0x451)]();if(!_0x30e010)return![];if(!_0x26f41d['meetRequirementsForSkillLearnSystem'](_0x30e010))return![];return _0x26f41d['canPayForSkillLearnSystem'](_0x30e010);}else{_0x4379bc=DataManager['getSkillLearnJobPointCost'](_0x1b37d8);if(_0x4379bc>0x0)return _0xc09b68=TextManager[_0x5a04ed(0x3f4)],_0xc09b68[_0x5a04ed(0x21c)](_0x4379bc,TextManager[_0x5a04ed(0x419)],_0x5a04ed(0x305)[_0x5a04ed(0x21c)](ImageManager[_0x5a04ed(0x1fc)]),TextManager[_0x5a04ed(0x405)]);break;}}}return'';},Window_ActorCommand[_0x1841c2(0x20d)]['isSkillLearnMode']=function(){return![];};function Window_SkillLearnIngredients(){const _0x377f6c=_0x1841c2;this[_0x377f6c(0x243)](...arguments);}Window_SkillLearnIngredients['prototype']=Object[_0x1841c2(0x449)](Window_Base['prototype']),Window_SkillLearnIngredients[_0x1841c2(0x20d)][_0x1841c2(0x345)]=Window_SkillLearnIngredients,Window_SkillLearnIngredients['prototype']['initialize']=function(_0x4fdfcc){const _0x33036d=_0x1841c2;Window_Base[_0x33036d(0x20d)]['initialize'][_0x33036d(0x324)](this,_0x4fdfcc);},Window_SkillLearnIngredients[_0x1841c2(0x20d)][_0x1841c2(0x3e0)]=function(){const _0x5cacf6=_0x1841c2;this[_0x5cacf6(0x270)]['clear'](),this[_0x5cacf6(0x403)]();if(this[_0x5cacf6(0x3d9)]()){if(_0x5cacf6(0x438)===_0x5cacf6(0x379))return _0x32b67f&&_0x13cf27[_0x5cacf6(0x2b3)][_0x5cacf6(0x225)](_0x1796dc[_0x5cacf6(0x203)][_0x5cacf6(0x337)][_0x5cacf6(0x45c)])?_0x40789e*(_0x5d0555(_0x301373['$1'])*0.01):_0x11f38c;else this['drawRequirements']();}else this[_0x5cacf6(0x328)]();},Window_SkillLearnIngredients[_0x1841c2(0x20d)]['drawTextExCenterAlign']=function(_0x550479,_0x170f22,_0x5ac301,_0x260817){const _0x362f3f=_0x1841c2,_0x102e3d=this[_0x362f3f(0x300)](_0x550479)[_0x362f3f(0x23e)],_0x3337c4=_0x170f22+Math[_0x362f3f(0x240)]((_0x260817-_0x102e3d)/0x2);this[_0x362f3f(0x3a9)](_0x550479,_0x3337c4,_0x5ac301);},Window_SkillLearnIngredients[_0x1841c2(0x20d)][_0x1841c2(0x28b)]=function(_0x583ae3,_0x28c5be,_0x1f6d07,_0x253c6d){const _0x29927b=_0x1841c2,_0x4c665e=this[_0x29927b(0x300)](_0x583ae3)[_0x29927b(0x23e)],_0x48bbb6=_0x28c5be+Math[_0x29927b(0x240)](_0x253c6d-_0x4c665e);this[_0x29927b(0x3a9)](_0x583ae3,_0x48bbb6,_0x1f6d07);},Window_SkillLearnIngredients[_0x1841c2(0x20d)][_0x1841c2(0x3d9)]=function(){const _0x2f62f0=_0x1841c2,_0x96f4c0=SceneManager[_0x2f62f0(0x39e)][_0x2f62f0(0x451)](),_0x484b32=SceneManager['_scene'][_0x2f62f0(0x2b9)]();return _0x484b32&&!_0x484b32[_0x2f62f0(0x24b)](_0x96f4c0);},Window_SkillLearnIngredients['prototype']['drawRequirements']=function(){const _0x3a885b=_0x1841c2,_0x3b55e3=SceneManager[_0x3a885b(0x39e)][_0x3a885b(0x451)](),_0x32cc7b=VisuMZ[_0x3a885b(0x203)][_0x3a885b(0x337)],_0x58f807=_0x3b55e3['note'],_0x5d249d=SceneManager[_0x3a885b(0x39e)][_0x3a885b(0x2b9)](),_0x307f5c=this[_0x3a885b(0x1d4)](),_0x4645d2=TextManager[_0x3a885b(0x408)],_0x37e6d0=TextManager['skillLearnReqNotMet'];let _0x5825d5=0x0,_0x58e93b=0x0;const _0x5e0c01=_0x3a885b(0x305)[_0x3a885b(0x21c)](_0x3b55e3[_0x3a885b(0x1ba)]),_0x3190e1=TextManager[_0x3a885b(0x1c4)][_0x3a885b(0x21c)](_0x5e0c01,_0x3b55e3['name']);this[_0x3a885b(0x2ba)](_0x3190e1,_0x5825d5,_0x58e93b,this[_0x3a885b(0x457)]),_0x58e93b+=Math[_0x3a885b(0x240)](_0x307f5c*1.5);let _0x654c7e='';if(_0x58f807[_0x3a885b(0x225)](_0x32cc7b[_0x3a885b(0x382)])){const _0x227602=Number(RegExp['$1']),_0x2ccc1a=TextManager[_0x3a885b(0x2bf)][_0x3a885b(0x21c)](_0x227602,TextManager[_0x3a885b(0x368)],TextManager[_0x3a885b(0x22e)]),_0x2924e7=_0x5d249d['level']>=_0x227602?_0x4645d2:_0x37e6d0;_0x654c7e+=_0x2924e7[_0x3a885b(0x21c)](_0x2ccc1a)+'\x0a';}if(_0x58f807[_0x3a885b(0x225)](_0x32cc7b[_0x3a885b(0x217)])){const _0x3deaba=String(RegExp['$1'])[_0x3a885b(0x2f8)](',')[_0x3a885b(0x460)](_0x537e75=>_0x537e75['trim']());;for(const _0x54fbaf of _0x3deaba){let _0x28f81b=0x0;const _0x5957a1=/^\d+$/[_0x3a885b(0x3ad)](_0x54fbaf);_0x5957a1?_0x28f81b=Number(_0x54fbaf):_0x28f81b=DataManager['getSkillIdWithName'](_0x54fbaf);const _0x54057f=$dataSkills[_0x28f81b];if(_0x54057f){const _0x7a5b4b=TextManager[_0x3a885b(0x3db)][_0x3a885b(0x21c)]('\x5cI[%1]'[_0x3a885b(0x21c)](_0x54057f[_0x3a885b(0x1ba)]),_0x54057f['name']),_0x3a1d07=_0x5d249d['isLearnedSkill'](_0x28f81b)?_0x4645d2:_0x37e6d0;_0x654c7e+=_0x3a1d07['format'](_0x7a5b4b)+'\x0a';}}}if(_0x58f807[_0x3a885b(0x225)](_0x32cc7b[_0x3a885b(0x2d0)])){const _0x39a4f4=String(RegExp['$1'])['split'](',')[_0x3a885b(0x460)](_0x20d343=>_0x20d343[_0x3a885b(0x28e)]());;for(const _0x570554 of _0x39a4f4){let _0x3b7695=0x0;const _0x398f1a=/^\d+$/['test'](_0x570554);_0x398f1a?_0x3a885b(0x3be)===_0x3a885b(0x3be)?_0x3b7695=Number(_0x570554):_0x4d2672+=0x0:_0x3b7695=DataManager[_0x3a885b(0x269)](_0x570554);const _0x4c5de8=$dataSkills[_0x3b7695];if(_0x4c5de8){const _0x4e495f=TextManager[_0x3a885b(0x3db)][_0x3a885b(0x21c)](_0x3a885b(0x305)['format'](_0x4c5de8[_0x3a885b(0x1ba)]),_0x4c5de8['name']),_0x5b9f77=_0x5d249d[_0x3a885b(0x3d3)](_0x3b7695)?_0x4645d2:_0x37e6d0;_0x654c7e+=_0x5b9f77['format'](_0x4e495f)+'\x0a';}}}if(_0x58f807[_0x3a885b(0x225)](_0x32cc7b[_0x3a885b(0x418)])){if(_0x3a885b(0x44a)!==_0x3a885b(0x1cf)){const _0x20411e=String(RegExp['$1'])[_0x3a885b(0x2f8)](',')[_0x3a885b(0x460)](_0xdcc1cc=>Number(_0xdcc1cc));for(const _0x557dce of _0x20411e){if('DSkdA'!==_0x3a885b(0x2b0)){const _0x1adb06=this[_0x3a885b(0x442)]();this[_0x3a885b(0x310)]=new _0x569559(_0x1adb06),this['addWindow'](this['_skillLearnConfirmWindow']),this[_0x3a885b(0x310)][_0x3a885b(0x21d)]('ok',this[_0x3a885b(0x45a)][_0x3a885b(0x1e0)](this)),this[_0x3a885b(0x310)][_0x3a885b(0x21d)](_0x3a885b(0x441),this['onSkillLearnConfirmCancel'][_0x3a885b(0x1e0)](this)),this[_0x3a885b(0x310)][_0x3a885b(0x2c1)]();const _0x155111=_0x378808[_0x3a885b(0x203)][_0x3a885b(0x1fa)][_0x3a885b(0x22a)][_0x3a885b(0x2e2)];this[_0x3a885b(0x310)]['setBackgroundType'](_0x155111);}else{const _0x183d6f=$dataSystem['switches'][_0x557dce],_0x3d8a9f=$gameSwitches['value'](_0x557dce)?_0x4645d2:_0x37e6d0;_0x654c7e+=_0x3d8a9f[_0x3a885b(0x21c)](_0x183d6f)+'\x0a';}}}else{const _0x1e603b=this[_0x3a885b(0x300)](_0x7d231d)[_0x3a885b(0x23e)],_0x1dbe91=_0x192aaa+_0x3d9465['round']((_0x51add0-_0x1e603b)/0x2);this['drawTextEx'](_0x1de5e1,_0x1dbe91,_0x5e80ac);}}if(_0x58f807[_0x3a885b(0x225)](_0x32cc7b[_0x3a885b(0x38d)])){const _0x1a7c84=String(RegExp['$1'])[_0x3a885b(0x2f8)](',')[_0x3a885b(0x460)](_0x494bfb=>Number(_0x494bfb));for(const _0x49da1f of _0x1a7c84){const _0x435b59=$dataSystem[_0x3a885b(0x378)][_0x49da1f],_0x40eb4b=$gameSwitches['value'](_0x49da1f)?_0x4645d2:_0x37e6d0;_0x654c7e+=_0x40eb4b['format'](_0x435b59)+'\x0a';}}const _0x561f63=VisuMZ[_0x3a885b(0x203)]['createKeyJS'](_0x3b55e3,'jsLearnReqDetailTxt');if(VisuMZ['SkillLearnSystem']['JS'][_0x561f63]){if('NWCyi'===_0x3a885b(0x2e7))return _0x28eccb=_0x31de28[_0x3a885b(0x3f4)],_0x114759[_0x3a885b(0x21c)](_0x592751,_0x2cb800['jobPointsAbbr'],_0x3a885b(0x305)[_0x3a885b(0x21c)](_0x201ceb[_0x3a885b(0x1fc)]),_0x5037f1[_0x3a885b(0x405)]);else{const _0xeb225e=VisuMZ[_0x3a885b(0x203)]['JS'][_0x561f63][_0x3a885b(0x324)](this,_0x5d249d,_0x3b55e3);_0x654c7e+=_0xeb225e+'\x0a';}}this[_0x3a885b(0x2ba)](_0x654c7e,_0x5825d5,_0x58e93b,this[_0x3a885b(0x457)]);},Window_SkillLearnIngredients['prototype'][_0x1841c2(0x328)]=function(){const _0x25745e=_0x1841c2,_0x2904bd=SceneManager[_0x25745e(0x39e)]['item'](),_0x5203f5=SceneManager[_0x25745e(0x39e)][_0x25745e(0x2b9)](),_0xe27b6d=this['getSkillLearnDisplayedCosts']();let _0xa00fc2=0x0,_0x48f5f7=0x0;const _0xb0e0a5=this[_0x25745e(0x1d4)](),_0x1092ed=Math[_0x25745e(0x240)](this[_0x25745e(0x457)]/0x2),_0x3fc2cc=Math[_0x25745e(0x240)](this[_0x25745e(0x457)]/0x4),_0x2fbb56=0x0,_0x264e6b=_0x1092ed,_0x3a08fc=_0x1092ed+_0x3fc2cc,_0x32e6cd=_0x25745e(0x305)[_0x25745e(0x21c)](_0x2904bd['iconIndex']),_0x548d41=TextManager[_0x25745e(0x40e)]['format'](_0x32e6cd,_0x2904bd[_0x25745e(0x34f)]);this[_0x25745e(0x2ba)](_0x548d41,_0xa00fc2,_0x48f5f7,this[_0x25745e(0x457)]),_0x48f5f7+=_0xb0e0a5,this[_0x25745e(0x2ba)](TextManager[_0x25745e(0x34b)],_0x2fbb56,_0x48f5f7,_0x1092ed),this['drawTextExCenterAlign'](TextManager[_0x25745e(0x233)],_0x264e6b,_0x48f5f7,_0x3fc2cc),this[_0x25745e(0x2ba)](TextManager[_0x25745e(0x228)],_0x3a08fc,_0x48f5f7,_0x3fc2cc),_0x48f5f7+=_0xb0e0a5;const _0x4f1287=_0x2fbb56+this[_0x25745e(0x433)]();for(const _0x24a54a of _0xe27b6d){if('vuRBN'!==_0x25745e(0x42c))this[_0x25745e(0x38e)]=_0x5bdb26['$1'][_0x25745e(0x2f8)](',')[_0x25745e(0x460)](_0x3a7ff2=>_0x46774e(_0x3a7ff2));else{this[_0x25745e(0x403)]();let _0x53b590='',_0x3265b5=0x0,_0x2b5ec5=0x0,_0x10b1be='';switch(_0x24a54a[_0x25745e(0x380)]()[_0x25745e(0x28e)]()){case'AP':_0x3265b5=DataManager[_0x25745e(0x3ed)](_0x2904bd);if(_0x3265b5<=0x0)continue;this[_0x25745e(0x3a1)](_0x3265b5,_0x264e6b,_0x48f5f7,_0x3fc2cc,_0x25745e(0x27e)),_0x53b590='\x5cI[%1]%2'[_0x25745e(0x21c)](ImageManager[_0x25745e(0x459)],TextManager[_0x25745e(0x360)]),this['drawTextEx'](_0x53b590,_0x4f1287,_0x48f5f7),_0x2b5ec5=_0x5203f5[_0x25745e(0x296)](),this['drawAbilityPoints'](_0x2b5ec5,_0x3a08fc,_0x48f5f7,_0x3fc2cc-this[_0x25745e(0x433)](),_0x25745e(0x27e));break;case'SP':_0x3265b5=DataManager[_0x25745e(0x40b)](_0x2904bd);if(_0x3265b5<=0x0)continue;this[_0x25745e(0x326)](_0x3265b5,_0x264e6b,_0x48f5f7,_0x3fc2cc,_0x25745e(0x27e)),_0x53b590=_0x25745e(0x395)[_0x25745e(0x21c)](ImageManager[_0x25745e(0x3f3)],TextManager[_0x25745e(0x1f1)]),this[_0x25745e(0x3a9)](_0x53b590,_0x4f1287,_0x48f5f7),_0x2b5ec5=_0x5203f5[_0x25745e(0x293)](),this[_0x25745e(0x326)](_0x2b5ec5,_0x3a08fc,_0x48f5f7,_0x3fc2cc-this[_0x25745e(0x433)](),'right');break;case _0x25745e(0x394):_0x3265b5=DataManager['getSkillLearnGoldCost'](_0x2904bd);if(_0x3265b5<=0x0)continue;this[_0x25745e(0x424)](_0x3265b5,TextManager[_0x25745e(0x40c)],_0x264e6b,_0x48f5f7,_0x3fc2cc);const _0x557190=Imported[_0x25745e(0x39b)]?'\x5cI[%1]'['format'](VisuMZ[_0x25745e(0x41c)]['Settings'][_0x25745e(0x40f)][_0x25745e(0x2a9)]):TextManager[_0x25745e(0x40c)];_0x53b590=_0x25745e(0x3c6)[_0x25745e(0x21c)](_0x557190,TextManager[_0x25745e(0x40c)]),this['drawTextEx'](_0x53b590,_0x4f1287,_0x48f5f7),_0x2b5ec5=$gameParty['gold'](),this[_0x25745e(0x424)](_0x2b5ec5,TextManager['currencyUnit'],_0x3a08fc,_0x48f5f7,_0x3fc2cc-this['itemPadding']());break;case'ITEM':const _0x318a8e=DataManager[_0x25745e(0x3e3)](_0x2904bd);if(_0x318a8e['length']<=0x0)continue;for(const _0x29be4f of _0x318a8e){if(!_0x29be4f)continue;const _0x25f000=$dataItems[_0x29be4f['id']];_0x10b1be=TextManager[_0x25745e(0x31a)],this[_0x25745e(0x1ce)](_0x25f000,_0x4f1287,_0x48f5f7,_0x1092ed-_0x4f1287),_0x53b590=_0x10b1be[_0x25745e(0x21c)](_0x29be4f[_0x25745e(0x32c)],_0x25745e(0x305)[_0x25745e(0x21c)](_0x25f000[_0x25745e(0x1ba)]),_0x25f000[_0x25745e(0x34f)]),this['drawTextExRightAlign'](_0x53b590,_0x264e6b,_0x48f5f7,_0x3fc2cc),_0x53b590=_0x10b1be[_0x25745e(0x21c)]($gameParty['numItems'](_0x25f000),_0x25745e(0x305)[_0x25745e(0x21c)](_0x25f000[_0x25745e(0x1ba)]),_0x25f000[_0x25745e(0x34f)]),this[_0x25745e(0x28b)](_0x53b590,_0x3a08fc,_0x48f5f7,_0x3fc2cc-this['itemPadding']()),_0x48f5f7+=_0xb0e0a5;if(_0x48f5f7+_0xb0e0a5>this[_0x25745e(0x214)])return;}continue;break;case _0x25745e(0x1c6):const _0x32281f=DataManager[_0x25745e(0x3a0)](_0x2904bd);if(_0x32281f['length']<=0x0)continue;for(const _0x36faa6 of _0x32281f){if('OGPtF'!=='NtnSF'){if(!_0x36faa6)continue;const _0x32e1af=$dataWeapons[_0x36faa6['id']];_0x10b1be=TextManager[_0x25745e(0x34e)],this[_0x25745e(0x1ce)](_0x32e1af,_0x4f1287,_0x48f5f7,_0x1092ed-_0x4f1287),_0x53b590=_0x10b1be['format'](_0x36faa6[_0x25745e(0x32c)],_0x25745e(0x305)[_0x25745e(0x21c)](_0x32e1af[_0x25745e(0x1ba)]),_0x32e1af[_0x25745e(0x34f)]),this[_0x25745e(0x28b)](_0x53b590,_0x264e6b,_0x48f5f7,_0x3fc2cc),_0x53b590=_0x10b1be[_0x25745e(0x21c)]($gameParty[_0x25745e(0x29a)](_0x32e1af),_0x25745e(0x305)[_0x25745e(0x21c)](_0x32e1af['iconIndex']),_0x32e1af[_0x25745e(0x34f)]),this[_0x25745e(0x28b)](_0x53b590,_0x3a08fc,_0x48f5f7,_0x3fc2cc-this[_0x25745e(0x433)]()),_0x48f5f7+=_0xb0e0a5;if(_0x48f5f7+_0xb0e0a5>this[_0x25745e(0x214)])return;}else this[_0x25745e(0x353)]=!![],this['_skillLearnAnimationWait']=0x14,this['_windowLayer'][_0x25745e(0x2a7)]=_0x409590[_0x25745e(0x203)]['Settings'][_0x25745e(0x28d)]['ShowWindows']||![],this[_0x25745e(0x43e)]();}continue;break;case _0x25745e(0x245):const _0x4fcb12=DataManager[_0x25745e(0x287)](_0x2904bd);if(_0x4fcb12['length']<=0x0)continue;for(const _0x9ec97e of _0x4fcb12){if(!_0x9ec97e)continue;const _0xf6cf30=$dataArmors[_0x9ec97e['id']];_0x10b1be=TextManager[_0x25745e(0x302)],this[_0x25745e(0x1ce)](_0xf6cf30,_0x4f1287,_0x48f5f7,_0x1092ed-_0x4f1287),_0x53b590=_0x10b1be['format'](_0x9ec97e[_0x25745e(0x32c)],_0x25745e(0x305)[_0x25745e(0x21c)](_0xf6cf30[_0x25745e(0x1ba)]),_0xf6cf30[_0x25745e(0x34f)]),this[_0x25745e(0x28b)](_0x53b590,_0x264e6b,_0x48f5f7,_0x3fc2cc),_0x53b590=_0x10b1be[_0x25745e(0x21c)]($gameParty['numItems'](_0xf6cf30),'\x5cI[%1]'[_0x25745e(0x21c)](_0xf6cf30[_0x25745e(0x1ba)]),_0xf6cf30[_0x25745e(0x34f)]),this[_0x25745e(0x28b)](_0x53b590,_0x3a08fc,_0x48f5f7,_0x3fc2cc-this[_0x25745e(0x433)]()),_0x48f5f7+=_0xb0e0a5;if(_0x48f5f7+_0xb0e0a5>this[_0x25745e(0x214)])return;}continue;break;case _0x25745e(0x32a):const _0x17610d=VisuMZ[_0x25745e(0x203)][_0x25745e(0x3b4)](_0x2904bd,_0x25745e(0x3eb));if(VisuMZ[_0x25745e(0x203)]['JS'][_0x17610d])_0x53b590=VisuMZ[_0x25745e(0x203)]['JS'][_0x17610d][_0x25745e(0x324)](this,_0x5203f5,_0x2904bd),this[_0x25745e(0x3a9)](_0x53b590,_0x4f1287,_0x48f5f7);else continue;break;case'CP':if(Imported['VisuMZ_2_ClassChangeSystem']){if(_0x25745e(0x3b7)==='GLrLy')_0x125fd8=_0x219771;else{_0x3265b5=DataManager[_0x25745e(0x1fe)](_0x2904bd)||0x0;if(_0x3265b5<=0x0)continue;this[_0x25745e(0x407)](_0x3265b5,_0x264e6b,_0x48f5f7,_0x3fc2cc,'right'),_0x53b590=_0x25745e(0x395)[_0x25745e(0x21c)](ImageManager[_0x25745e(0x32e)],TextManager[_0x25745e(0x36f)]),this[_0x25745e(0x3a9)](_0x53b590,_0x4f1287,_0x48f5f7),_0x2b5ec5=_0x5203f5[_0x25745e(0x406)](),this['drawClassPoints'](_0x2b5ec5,_0x3a08fc,_0x48f5f7,_0x3fc2cc-this[_0x25745e(0x433)](),_0x25745e(0x27e));}}else continue;break;case'JP':if(Imported[_0x25745e(0x2d2)]){_0x3265b5=DataManager[_0x25745e(0x220)](_0x2904bd)||0x0;if(_0x3265b5<=0x0)continue;this['drawJobPoints'](_0x3265b5,_0x264e6b,_0x48f5f7,_0x3fc2cc,'right'),_0x53b590=_0x25745e(0x395)['format'](ImageManager[_0x25745e(0x1fc)],TextManager[_0x25745e(0x405)]),this[_0x25745e(0x3a9)](_0x53b590,_0x4f1287,_0x48f5f7),_0x2b5ec5=_0x5203f5[_0x25745e(0x3c3)](),this[_0x25745e(0x30a)](_0x2b5ec5,_0x3a08fc,_0x48f5f7,_0x3fc2cc-this['itemPadding'](),_0x25745e(0x27e));}else{if(_0x25745e(0x413)==='KHoaH')_0x3f25a5!==''?_0x2a7446=_0x4b9fc9[_0x25745e(0x21c)](_0x876dda,_0x2ba415):_0x59a3e2=_0x5109c5;else continue;}break;default:continue;}_0x48f5f7+=_0xb0e0a5;if(_0x48f5f7+_0xb0e0a5>this['innerHeight'])return;}}},Window_SkillLearnIngredients[_0x1841c2(0x20d)][_0x1841c2(0x1e3)]=function(){const _0x1b302f=_0x1841c2,_0x216b22=JsonEx[_0x1b302f(0x257)](VisuMZ['SkillLearnSystem'][_0x1b302f(0x1fa)][_0x1b302f(0x294)]['DisplayedCosts']);return _0x216b22['push'](_0x1b302f(0x1d1)),_0x216b22;},Window_SkillLearnIngredients[_0x1841c2(0x20d)][_0x1841c2(0x30f)]=function(){return![];};function Window_SkillLearnConfirm(){const _0x5dcfed=_0x1841c2;this[_0x5dcfed(0x243)](...arguments);}function _0x4adc(){const _0x554477=['Learned','addChild','setSkillLearnSkillSpritePosition','_earnedAbilityPoints','ARRAYFUNC','canPayForSkillLearnSystem','classPointsFull','Game_Actor_changeClass','MJyMu','Window_SkillType_makeCommandList','ZZmpe','destroySkillLearnSprite','isEnabled','process_VisuMZ_SkillLearnSystem_JS','_abilityPoints','switches','xoTek','levelUpGainSkillPoints','_earnedSkillPoints','STRUCT','_skillPoints','newPage','DbNQn','toUpperCase','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Visible\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','LearnReqLevel','dTwXF','LearnGoldCost','DgAtl','WUrks','988752JSAccz','destroy','KkIYs','Armor-%1-%2','mxjmR','ARRAYJSON','LearnReqSwitchesAny','_skillLearnAnimationIDs','indexOf','ShowWindows','JmUdj','lZJzn','WGUIs','GOLD','\x5cI[%1]%2','registerCommand','AxwoW','vbADM','height','SeparationFmt','VisuMZ_0_CoreEngine','TwISw','LearnWeaponCost','_scene','UtjBc','getSkillLearnWeaponCost','drawAbilityPoints','center','UwYyq','IngredientName','destroySkillLearnAnimationSprite','abilityPointsRate','Scene_Skill_update','fZvIp','drawTextEx','Window_SkillList_includes','addCommand','BTblR','test','makeRewardsSkillPoints','concat','tIKTV','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Mhzsh','gainStartingSkillPoints','createKeyJS','createSkillLearnSystemWindows','Window_SkillList_drawItem','Ujkcp','loseGold','skillLearnCancelCmd','applyItemSkillLearnSystemUserEffect','haNCA','State-%1-%2','BJyvA','lXsQr','ConfirmWindow_RectJS','bTVoL','_rewards','167558hRbWWd','getJobPoints','PerLevelUp','qdKXa','%1%2','LearnApCost','GoldFmt','skillLearn','ConfirmCmd','UNLnt','dllWf','setupBattleTestMembers','allMembers','Points','ReqSeparateFmt','onSkillLearnConfirmCancel','playOkSound','isLearnedSkill','getItemIdWithName','MQHMW','activate','createSkillLearnAnimation','BPmhP','shouldDrawRequirements','YtjPN','skillLearnReqListSkill','LearnCpCost','removeChild','itemHeight','isBattleMember','refresh','lRwbV','NwqOw','getSkillLearnItemCost','skillLearnIcon','dSABd','Game_System_initialize','LhmEF','51810kzzeEi','mbDzc','Game_Party_setupBattleTestMembers','jsLearnShowDetailTxt','ClassChangeSystem','getSkillLearnAbilityPointCost','includes','WHkOq','SharedResource','PStit','abilityPointsTotal','skillPointsIcon','jobPointsFmt','Armor','Classes','skillLearnReqHeaderFmt','members','anchor','makeSkillLearnList','UserGainSkillPoints','traitObjects','faceWidth','abilityPointsAbbr','show','opacitySpeed','UybfW','FJOmA','resetFontSettings','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20text\x20=\x20\x27\x27;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Text\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20text;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','jobPointsFull','getClassPoints','drawClassPoints','skillLearnReqMet','scale','ARRAYNUM','getSkillLearnSkillPointCost','currencyUnit','PSujD','skillLearningTitle','Gold','CzIrs','initAbilityPoints','iconWidth','SPYTx','isTriggered','HJhAD','isReleased','createSkillLearnIngredientsWindow','LearnReqSwitchesAll','jobPointsAbbr','skillPointsVisible','pqlYN','CoreEngine','isSkillLearnSystemMenuAccess','LearnArmorCost','osSPw','Fbkle','setStypeId','PerAction','drawRequirements','drawCurrencyValue','RequirementTitle','addWindow','setSkillLearnSkillSpriteFrame','AXZno','Game_Actor_setup','isAlive','SANYH','vuRBN','skillPointsTotal','CHHAH','enemy','Game_Actor_levelUp','isPlaying','CancelCmd','itemPadding','ZGibe','maxCols','CQqef','Animations','GfcZh','_SkillLearnSystem_MenuAccess','push','uLtme','AliveActors','Game_Action_applyItemUserEffect','createSkillLearnSkillSprite','addAbilityPoints','zRCoe','cancel','skillLearnConfirmWindow','SkillPoints','gainRewardsSkillPoints','KlfSx','LrjMV','displayRewardsSkillPoints','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','create','DFKZM','gainSkillPoints','skillLearnSystemCommandName','jsLearnJpCost','shift','ItemFmt','drawSkillCost','item','createSkillLearnCostText','AbilityPointsLose','WZITa','JSAId','createVisibleJS','innerWidth','getSkillLearnGoldCost','abilityPointsIcon','onSkillLearnConfirmOk','sort','AbilityPointsRate','isMVAnimation','QaxyP','WeaponFmt','map','displayRewards','parse','LearnSkillB','StartClassSkillPoints','_skillIDs','VLKAy','SFVjk','iconIndex','MzjsB','oySxJ','updateSkillLearnSpriteOpacity','drawSkillLearnRequirements','WRdIZ','xfurQ','LearnItemCost','KOQMG','nFjAY','skillLearnReqTitle','length','WEAPON','createSkillLearnConfirmWindow','ARioT','skillLearnCmd','DefaultCost','STR','CrHEk','makeCommandList','drawItemName','OJBZf','skillTypes','Custom','drawActorFace','isPlaytest','lineHeight','_skillLearnIngredientsWindow','MaxResource','left','Lewjw','AMeEc','NwBNp','Window_SkillList_makeItemList','uxyWL','Item','bDZLj','DetailWindow_BgType','bind','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20cost\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Cost\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20cost;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','mxbYd','getSkillLearnDisplayedCosts','JSON','processFinishSkillLearnAnimation','isSkill','_armorIDs','commandStyle','initSkillPoints','_stypeId','ShowVictory','skillPointsAbbr','getSkillLearnSkillsFromClass','skillLearnReqSwitchFmt','changeClass','sLEKe','skillPointsFull','EVTcF','lnXeR','onSkillLearnItemOk','moOvp','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Condition\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','EnemySkillPoints','sAJEM','jISAW','Settings','remove','jobPointsIcon','opacity','getSkillLearnClassPointCost','FadeSpeed','VhqKo','filter','Name','SkillLearnSystem','ParseSkillNotetags','applySkillPoints','EPGxR','ITEM','return\x200','_skillLearnBitmapSprite','loadSystem','colSpacing','select','prototype','jsLearnSpCost','TargetGainSkillPoints','gainRewardsAbilityPoints','loseJobPoints','LearnSpCost','lJMeu','innerHeight','Enemy-%1-%2','xrYNv','LearnReqSkillsAll','StatusWindowDrawJS','levelUpGainAbilityPoints','pGvnP','cLoMK','format','setHandler','ReqSwitchFmt','skillLearnAlreadyLearned','getSkillLearnJobPointCost','tHIsE','_statusWindow','setSkillLearnSkillSpriteBitmap','wHADi','match','getSkillLearnRequirementText','Window_SkillList_isEnabled','skillLearningOwned','_skillLearnAnimationWait','Window','loseItem','Class-%1-%2','AbilityPoints','levelA','_skillLearnIconSprite','skillLearnGoldFmt','ZHuMy','playStaticSe','skillLearningCost','rWUoD','calcWindowHeight','Weapon','animationIDs','onBattleStart','isSkillLearnEnabled','abilityPointsVisible','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','startSkillLearnAnimation','description','width','skillLearnIngredientsWindowRect','round','CFEer','applyAbilityPoints','initialize','gainStartingAbilityPoints','ARMOR','processPayForSkillLearnSystem','drawItem','PznUL','gainAbilityPoints','log','meetRequirementsForSkillLearnSystem','_data','TextFmt','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','changePaintOpacity','jsLearnReqListTxt','Window_SkillList_drawSkillCost','_classIDs','LearnJpCost','itemWindowRect','oOPbs','setSkillLearnSkillSpriteOpacity','makeDeepCopy','ReqLevelFmt','Game_Battler_onBattleStart','subject','drawActorAbilityPoints','learnSkill','onItemOk','SkillPointsGain','resetTextColor','Show','LearnShowSwitchesAny','uSxMD','_itemIDs','ytIYl','onDatabaseLoaded','336015ieuRLJ','SWITCHES','commandName','getSkillIdWithName','StartClassAbilityPoints','MMeZx','Window_SkillList_setStypeId','IrOXZ','StartingAbilityPoints','levelUp','contents','Skill-%1-%2','nUWSQ','ZFfpZ','_itemWindow','itsTH','pldBN','replace','gold','makeRewards','jsLearnReqDetailTxt','QPtny','abilityPoints','jsLearnCpCost','right','Actors','setBackgroundType','SkillPointsLose','IconSet','loseClassPoints','LEVEL','IgabU','DfJGW','getSkillLearnArmorCost','VisuMZ_1_SkillsStatesCore','loseSkillPoints','BattleManager_displayRewards','drawTextExRightAlign','KjlWS','Animation','trim','_windowLayer','clear','getWeaponIdWithName','uNlFt','getSkillPoints','General','skillPointsRate','getAbilityPoints','skillLearnReqSkillFmt','isCommandEnabled','earnedSkillPoints','numItems','IukOC','smooth','updateSkillLearnAnimation','drcFg','ReqNotMetFmt','reduce','jsLearnShow','jsOnLearn','CLdqO','Item-%1-%2','gainSkillPointsForMulticlasses','ARRAYSTRUCT','visible','hSRil','GoldIcon','PVcoX','finishSkillLearnAnimation','drawActorClassPoints','tBacf','izALW','_skillLearnAnimationSprite','DSkdA','learnPicture','JobPoints','note','eEzMH','createConditionJS','drawSkillLearnCost','deadMembers','1752295kojGFp','user','drawTextExCenterAlign','feFzr','EeBZs','text','ParseAllNotetags','skillLearnReqListLevel','getClassIdWithName','hide','classPointsAbbr','clamp','setSkillPoints','bqjlC','skillLearnReqListSwitch','skillLearnSeparationFmt','gJWDJ','EcFXm','updateSkillLearnAnimationSprite','skillPoints','QMnKZ','slXJx','gainMulticlassRewardPoints','drawActorSkillPoints','LearnReqSkillsAny','isActor','VisuMZ_2_ClassChangeSystem','DisplayedCosts','displayRewardsAbilityPoints','Window_SkillList_maxCols','PerEnemy','wYaMp','earnedAbilityPoints','ceil','refreshSkillLearnSystem','_weaponIDs','_skillLearnSystem_drawItemMode','drawActorSimpleStatus','BEUfD','KZfrA','tUAay','VictoryText','ConfirmWindow_BgType','_actor','ReqSkillFmt','getSkillLearnCostText','onLoadBattleTestSkillLearnSystem','vVLOe','AbilityPointsSet','ETTFZ','SkillPointsRate','makeRewardsAbilityPoints','createCostJS','exit','_learnPicture','isConfirmEnabled','gkpyf','Parse_Notetags_CreateJS','EnemyAbilityPoints','playSkillLearn','XeoGa','Game_Actor_learnSkill','yrpmb','ReqMetFmt','split','IgUKs','setupBattleTestMembersSkillLearnSystem','Bwbaa','bitmap','createActionJS','gainAbilityPointsForMulticlasses','actor','textSizeEx','ZAvjX','skillLearnArmorFmt','DetailWindow_RectJS','XcabX','\x5cI[%1]','IngredientOwned','LearnCostBatch','getArmorIdWithName','Scene_Skill_onItemOk','drawJobPoints','gkefp','parameters','setSkillLearnSystemMenuAccess','dDlvl','showVisualGoldDisplay','_skillLearnConfirmWindow','ConvertParams','createSkillLearnAnimationIDs','applySkillLearnSystemUserEffect','EVzDd','loseAbilityPoints','LfEKi','update','Icon','createTextJS','skillLearnItemFmt','LearningTitle','skillLearnConfirmCmd','value','dmfPA','inBattle','AbilityPointsAdd','UuaAC','currentClass','fcXaR','call','TPgMs','drawSkillPoints','xFEwM','drawIngredients','aoFww','CUSTOM','skillLearnReqLevelFmt','quantity','VKaZN','classPointsIcon','isSkillLearnMode','initSkillLearnSystemMenuAccess','wJnWC','AbbrText','process_VisuMZ_SkillLearnSystem_Notetags','applyItemUserEffect','BattleManager_makeRewards','MAX_SAFE_INTEGER','RegExp','floor','nzwHO','bEOSk','tqSqt','classPointsFmt','isFinishedSkillLearnAnimating','FUNC','SkillPointsAdd','jsLearnShowListTxt','7LTwytg','abilityPointsFmt','skillPointsFmt','add','constructor','RequireFmt','_skillLearnIconSpriteOpacitySpeed','rYcpn','jsLearnApCost','VOYNY','skillLearningName','NIDfW','iconHeight','skillLearnWeaponFmt','name','setup','_SkillLearnSystem_preventLevelUpGain','setAbilityPoints','_skillLearnAnimationPlaying','max','makeItemList','LearnSkillA','ARRAYSTR','ssQlZ','addSkillPoints','MenuAccess','StartingSkillPoints','IRALb','247768bfTEyD','670350BQJILt','skillLearnReqSeparatorFmt','abilityPointsFull','lLhyD','optExtraExp','loadPicture','TargetGainAbilityPoints','Scene_Skill_create','JjpKl','Window_SkillStatus_refresh','level'];_0x4adc=function(){return _0x554477;};return _0x4adc();}Window_SkillLearnConfirm[_0x1841c2(0x20d)]=Object[_0x1841c2(0x449)](Window_HorzCommand[_0x1841c2(0x20d)]),Window_SkillLearnConfirm[_0x1841c2(0x20d)][_0x1841c2(0x345)]=Window_SkillLearnConfirm,Window_SkillLearnConfirm[_0x1841c2(0x20d)][_0x1841c2(0x243)]=function(_0x3fc896){const _0x527f14=_0x1841c2;Window_HorzCommand[_0x527f14(0x20d)][_0x527f14(0x243)][_0x527f14(0x324)](this,_0x3fc896);},Window_SkillLearnConfirm[_0x1841c2(0x20d)]['maxCols']=function(){return 0x2;},Window_SkillLearnConfirm[_0x1841c2(0x20d)][_0x1841c2(0x3de)]=function(){const _0x19ba7d=_0x1841c2;return this[_0x19ba7d(0x214)];},Window_SkillLearnConfirm['prototype'][_0x1841c2(0x1cd)]=function(){const _0x1df99e=_0x1841c2;this[_0x1df99e(0x3ab)](TextManager[_0x1df99e(0x31c)],'ok',this[_0x1df99e(0x2ef)]()),this[_0x1df99e(0x3ab)](TextManager[_0x1df99e(0x3b9)],_0x1df99e(0x441));},Window_SkillLearnConfirm[_0x1841c2(0x20d)][_0x1841c2(0x2ef)]=function(){const _0x5492db=_0x1841c2,_0x29a06a=SceneManager['_scene'];if(!_0x29a06a)return![];const _0x14f9b5=_0x29a06a[_0x5492db(0x2b9)]();if(!_0x14f9b5)return![];const _0x5d8247=_0x29a06a['item']();if(!_0x5d8247)return![];if(!_0x14f9b5[_0x5492db(0x24b)](_0x5d8247))return![];return _0x14f9b5[_0x5492db(0x36e)](_0x5d8247);},Window_SkillLearnConfirm[_0x1841c2(0x20d)][_0x1841c2(0x247)]=function(_0x2dd6d9){const _0x5522a4=_0x1841c2,_0x45dd42=this['itemLineRect'](_0x2dd6d9);this[_0x5522a4(0x25f)](),this[_0x5522a4(0x24f)](this[_0x5522a4(0x298)](_0x2dd6d9));const _0x5152ad=this[_0x5522a4(0x268)](_0x2dd6d9),_0x183571=this[_0x5522a4(0x300)](_0x5152ad)[_0x5522a4(0x23e)];_0x45dd42['x']+=Math['round']((_0x45dd42[_0x5522a4(0x23e)]-_0x183571)/0x2),this[_0x5522a4(0x3a9)](_0x5152ad,_0x45dd42['x'],_0x45dd42['y'],_0x183571);},Window_SkillLearnConfirm[_0x1841c2(0x20d)][_0x1841c2(0x3d2)]=function(){const _0x58edd8=_0x1841c2;if(this['currentSymbol']()==='ok'){}else Window_HorzCommand['prototype']['playOkSound'][_0x58edd8(0x324)](this);};
//=============================================================================
// VisuStella MZ - Database Inheritance
// VisuMZ_4_DatabaseInherit.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_DatabaseInherit = true;

var VisuMZ = VisuMZ || {};
VisuMZ.DatabaseInherit = VisuMZ.DatabaseInherit || {};
VisuMZ.DatabaseInherit.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.03] [DatabaseInherit]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Database_Inheritance_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Populating a database can be extremely time consuming regardless of how much
 * you plan for it. One of the biggest offenders to making the process so time
 * consuming is the lack of inheritance features. By default, RPG Maker MZ is
 * unable to have objects directly inherit properties from parent objects,
 * meaning that each and every database object has to be created from scratch
 * or be the result of a copy/paste template before going forward.
 * 
 * This plugin allows you to mark specific database objects with inheritance
 * notetags, making it more efficient to carry over properties. Each database
 * object is able to inherit notetags, traits, effects, parameters, and more.
 * 
 * *NOTE:* This plugin preloads the database entries on a one by one basis so
 * there will be a larger loading time than normal. The loading time is
 * dependent on the size of your database and the amount of data that needs to
 * be inherited across each object type.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Inherit properties from database objects through notetags.
 * * Carry over notetags, properties, damage formulas, parameters, enemy action
 *   patterns, traits, and effects.
 * * Define the properties you don't want inherited through plugin parameters.
 * * 64 different notetags to give you full control over what is inherited on
 *   an object to object basis.
 * * Use plugin parameters to determine how damage formulas and parameters are
 *   extended from one to another.
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
 * Understanding Inheritance
 * ============================================================================
 *
 * This section will explain how inheritance works through this plugin.
 * 
 * *NOTE:* This plugin preloads the database entries on a one by one basis so
 * there will be a larger loading time than normal. The loading time is
 * dependent on the size of your database and the amount of data that needs to
 * be inherited across each object type.
 *
 * ---
 * 
 * 1. Use notetags (mentioned in the Notetags section) to determine which
 * database object properties you want carried over to an object. The notetags
 * will determine the parent object (where the properties are coming from).
 * The child object (the target object that will receive the parent's various
 * properties) is the one with the notetag itself.
 * 
 * ---
 *
 * 2. When all database JSON data is finished loading, the inheritance starts
 * by first loading up notetags. These will include the meta data that is
 * automatically parsed through RPG Maker MZ's default parser. The note box
 * itself will then be extended by the parent object's notetags AFTER the child
 * object's notes.
 * 
 * The meta settings can be changed in the Plugin Parameters.
 *
 * ---
 * 
 * 3. Once the notetags are parsed, the parent's properties are then carried
 * over, too. These properties range from the generic prices of items, MP costs
 * of skills, to the priority settings of states. The plugin parameters will
 * determine which object properties will overwrite the child object's settings
 * or extend them. When a property is extended, it is added upon.
 * 
 * These settings can be changed in the Plugin Parameters.
 * 
 * ---
 * 
 * 4. If there are damage formulas present, the damage formula will be extended
 * upon from the parent object to the child object additively while containing
 * their own separate subsets for the damage formula. The damage
 * formula for the child object will be added on at the end. In other words:
 * 
 *   Parent Damage Formula: a.atk * 4 - b.def * 2
 *   Child Damage Formula: a.atk * 2 - b.def * 1
 * 
 *   Parent Damage Formula + Child Damage Formula
 * 
 *   (a.atk * 4 - b.def * 2) + (a.atk * 2 - b.def * 1)
 * 
 * The extension settings can be changed in the Plugin Parameters.
 * 
 * ---
 * 
 * 5. If a database object has parameters (weapons, armors, enemies), their
 * parameters can be inherited from a parent object and extended. By default,
 * the extension will be adding from the parent's parameter value to the child
 * object's parameter value.
 * 
 *   Parent MaxHP: 500
 *   Child MaxHP: 100
 * 
 *   Parent MaxHP + Child MaxHP
 * 
 *   (500) + (100)
 * 
 * The extension settings can be changed in the Plugin Parameters.
 * 
 * ---
 * 
 * 6. Next, we go to Enemy Action Patterns if the objects are enemies. These
 * action patterns will be extended upon each other. The parent object's action
 * patterns will be created first while the child object's action patterns will
 * be added on afterwards. Keep this in mind as you create the the action lists
 * in case the order of the action patterns matter.
 * 
 * ---
 * 
 * 7. Traits and Effects are extended at the final step. The database objects
 * that use traits are Actors, Classes, Weapons, Armors, Skills, and States.
 * The database objects that use effects are Skills and Items. These properties
 * will not overwrite the existing ones, but instead, be added on. The parent
 * object's properties will be made first with the child properties sorted
 * after. Keep this in mind as you create the traits and effects in case the
 * order of the traits and effects matter.
 * 
 * ---
 *
 * ============================================================================
 * WARNING! Inheritance Order Matters!
 * ============================================================================
 * 
 * Due to the flexible nature of the notetags allow you to inherit objects that
 * are listed before and after an object's position in the database, you must
 * be wary of when the inheritance occurs or else you may not acquire al the
 * desired inherited properties.
 * 
 * *NOTE:* This plugin preloads the database entries on a one by one basis so
 * there will be a larger loading time than normal. The loading time is
 * dependent on the size of your database and the amount of data that needs to
 * be inherited across each object type.
 * 
 * ---
 * 
 * The plugin will go through each database object one by one, from lowest ID
 * to highest ID, and applying inheritance. This means, if a child inherits
 * properties from a parent object with a higher ID, that child will only
 * inherit the properties of the parent BEFORE inheritance is applied to the
 * parent.
 *
 * ---
 * 
 * So what does this mean? Let's use a few items as an example.
 * 
 * Item ID 5 has an original price of 400. Inherits from Item ID 20.
 * Item ID 10 has an original price of 200.
 * Item ID 20 has an original price of 100. Inherits from Item ID 10.
 * 
 * ---
 * 
 * If Item ID 5 inherits the price of Item ID 20, its price becomes 500,
 * because it's 400 + 100.
 * 
 * ---
 * 
 * This will be true even if Item ID 20 will inherit properties from elsewhere
 * because its ID is larger than the child's. For example, if Item ID 20 is to
 * inherit the price from Item ID 10, its price becomes 300. However, Item ID 5
 * will have its price remain at 500 because of 400 + 100. It does NOT become
 * 400 + 200 + 100.
 * 
 * ---
 * 
 * Order matters.
 * 
 * If you're unsure of what this means, then follow this golden rule to make
 * sure objects will always have their data inherited properly:
 * 
 *   Inherit from Lower ID's
 * 
 * Follow that and you can trace how properties are inherited.
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
 * === Everything-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Everything From: id>
 * <Inherit Everything From: id, id, id>
 *
 * <Inherit Everything From: name>
 * <Inherit Everything From: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags, basic properties, damage formulas, parameters,
 *   action patterns, traits, and effects from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Everything>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags, basic properties, damage formulas, parameters,
 *   action patterns, traits, and effects from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Everything>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags, basic properties, damage formulas, parameters,
 *   action patterns, traits, and effects from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Everything>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags, basic properties, damage formulas, parameters,
 *   action patterns, traits, and effects from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Everything>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags, basic properties, damage formulas, parameters,
 *   action patterns, traits, and effects from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 * 
 * === Notetag Inheritance-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Notetags From: id>
 * <Inherit Notetags From: id, id, id>
 *
 * <Inherit Notetags From: name>
 * <Inherit Notetags From: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Notetags>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Notetags>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Notetags>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Notetags>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 * 
 * === Basic Property Inheritance-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Properties From: id>
 * <Inherit Properties From: id, id, id>
 *
 * <Inherit Properties From: name>
 * <Inherit Properties From: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit basic properties determined by the plugin parameters.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 * - If there are multiple parent objects, the inheritance for overwritten
 *   properties will come from the last listed parent object.
 *
 * ---
 *
 * <Inherit First Properties>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit basic properties determined by the plugin parameters.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 * - If there are multiple parent objects, the inheritance for overwritten
 *   properties will come from the last listed parent object.
 *
 * ---
 *
 * <Inherit Last Properties>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit basic properties determined by the plugin parameters.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 * - If there are multiple parent objects, the inheritance for overwritten
 *   properties will come from the last listed parent object.
 *
 * ---
 *
 * <Inherit Previous Properties>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit basic properties determined by the plugin parameters.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 * - If there are multiple parent objects, the inheritance for overwritten
 *   properties will come from the last listed parent object.
 *
 * ---
 *
 * <Inherit Next Properties>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit basic properties determined by the plugin parameters.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 * - If there are multiple parent objects, the inheritance for overwritten
 *   properties will come from the last listed parent object.
 *
 * ---
 * 
 * === Damage Formula Inheritance-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Damage Formula From: id>
 * <Inherit Properties From: id, id, id>
 *
 * <Inherit Damage Formula From: name>
 * <Inherit Damage Formula From: name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This will inherit and extend the damage formula from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Damage Formula>
 *
 * - Used for: Skill, Item Notetags
 * - This will inherit and extend the damage formula from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Damage Formula>
 *
 * - Used for: Skill, Item Notetags
 * - This will inherit and extend the damage formula from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Damage Formula>
 *
 * - Used for: Skill, Item Notetags
 * - This will inherit and extend the damage formula from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Damage Formula>
 *
 * - Used for: Skill, Item Notetags
 * - This will inherit and extend the damage formula from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 * 
 * === Parameters Inheritance-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Parameters From: id>
 * <Inherit Parameters From: id, id, id>
 *
 * <Inherit Parameters From: name>
 * <Inherit Parameters From: name, name, name>
 *
 * - Used for: Weapon, Armor, Enemy Notetags
 * - This will inherit and extend the parameters from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Parameters>
 *
 * - Used for: Weapon, Armor, Enemy Notetags
 * - This will inherit and extend the parameters from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Parameters>
 *
 * - Used for: Weapon, Armor, Enemy Notetags
 * - This will inherit and extend the parameters from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Parameters>
 *
 * - Used for: Weapon, Armor, Enemy Notetags
 * - This will inherit and extend the parameters from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Parameters>
 *
 * - Used for: Weapon, Armor, Enemy Notetags
 * - This will inherit and extend the parameters from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 * 
 * === Enemy Action Patterns-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Action Patterns From: id>
 * <Inherit Action Patterns From: id, id, id>
 *
 * <Inherit Action Patterns From: name>
 * <Inherit Action Patterns From: name, name, name>
 *
 * - Used for: Enemy Notetags
 * - This will inherit and extend the action patterns from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Action Patterns>
 *
 * - Used for: Enemy Notetags
 * - This will inherit and extend the action patterns from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Action Patterns>
 *
 * - Used for: Enemy Notetags
 * - This will inherit and extend the action patterns from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Action Patterns>
 *
 * - Used for: Enemy Notetags
 * - This will inherit and extend the action patterns from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Action Patterns>
 *
 * - Used for: Enemy Notetags
 * - This will inherit and extend the action patterns from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 * 
 * === Trait Inheritance-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Traits From: id>
 * <Inherit Traits From: id, id, id>
 *
 * <Inherit Traits From: name>
 * <Inherit Traits From: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, and State Notetags
 * - This will inherit and extend the traits from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Traits>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, and State Notetags
 * - This will inherit and extend the traits from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Traits>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, and State Notetags
 * - This will inherit and extend the traits from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Traits>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, and State Notetags
 * - This will inherit and extend the traits from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Traits>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, and State Notetags
 * - This will inherit and extend the traits from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 * 
 * === Effects Inheritance-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Effects From: id>
 * <Inherit Effects From: id, id, id>
 *
 * <Inherit Effects From: name>
 * <Inherit Effects From: name, name, name>
 *
 * - Used for: Skill and Item Notetags
 * - This will inherit and extend the effects from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Effects>
 *
 * - Used for: Skill and Item Notetags
 * - This will inherit and extend the effects from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Effects>
 *
 * - Used for: Skill and Item Notetags
 * - This will inherit and extend the effects from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Effects>
 *
 * - Used for: Skill and Item Notetags
 * - This will inherit and extend the effects from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Effects>
 *
 * - Used for: Skill and Item Notetags
 * - This will inherit and extend the effects from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Inheritance Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control which properties will inherit
 * in what way, and how they're extended.
 *
 * ---
 *
 * Notetags
 * 
 *   Inherit Meta Flags:
 *   - Inherit meta flags added by notetags?
 *
 * ---
 *
 * Properties
 * 
 *   JS: Overwritten:
 *   - A list of JavaScript object keys containing data that will be
 *     overwritten when inherited.
 * 
 *   JS: Extended:
 *   - A list of JavaScript object keys containing data that will be
 *     extended/added to when inherited.
 *
 * ---
 *
 * Damage Formulas
 * 
 *   Damage Format:
 *   - How are damage formulas extended?
 *   - %1 - Parent Damage Formula, %2 - Child Damage Formula
 *
 * ---
 *
 * Parameters Formulas
 * 
 *   Parameter Format:
 *   - How are parameters extended?
 *   - %1 - Parent Parameter Value, %2 - Child Parameter Value
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
 * Version 1.03: April 16, 2021
 * * Bug Fixes!
 * ** Damage formula inheritance should now properly work. Fix made by Arisu.
 *
 * Version 1.02: December 18, 2020
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.01: December 11, 2020
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.00: December 4, 2020
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
 * @param DatabaseInherit
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Notetags
 *
 * @param MetaNotetags:eval
 * @text Inherit Meta Flags
 * @parent Notetags
 * @type boolean
 * @on Inherit Meta
 * @off Ignore Meta
 * @desc Inherit meta flags added by notetags?
 * @default true
 * 
 * @param Properties
 *
 * @param OverwriteProperties:arraystr
 * @text JS: Overwritten
 * @parent Properties
 * @type string[]
 * @desc A list of JavaScript object keys containing data that
 * will be overwritten when inherited.
 * @default ["-----General-----","scope","occasion","hitType","etypeId","","-----Skills-----","stypeId","requiredWtypeId1","requiredWtypeId2","","-----Items-----","consumable","itypeId","","-----Weapons-----","wtypeId","","-----Armors-----","atypeId","","-----Enemies-----","dropItems","","-----States-----","restriction","motion","overlay","removeAtBattleEnd","removeByRestriction","autoRemovalTiming","removeByDamage","removeByWalking","","-----Tilesets-----","flags","mode",""]
 *
 * @param ExtendedProperties:arraystr
 * @text JS: Extended
 * @parent Properties
 * @type string[]
 * @desc A list of JavaScript object keys containing data that
 * will be extended/added to when inherited.
 * @default ["-----General-----","speed","tpGain","price","","-----Skills-----","mpCost","tpCost","","-----Enemies-----","exp","gold","","-----States-----","priority","minTurns","maxTurns","chanceByDamage","stepsToRemove",""]
 * 
 * @param Damage
 * @text Damage Formulas
 *
 * @param DamageFmt:str
 * @text Damage Format
 * @parent Damage
 * @desc How are damage formulas extended?
 * %1 - Parent Damage Formula, %2 - Child Damage Formula
 * @default (%1) + (%2)
 * 
 * @param Parameters
 * @text Parameters Formulas
 *
 * @param ParameterFmt:str
 * @text Parameter Format
 * @parent Parameters
 * @desc How are parameters extended?
 * %1 - Parent Parameter Value, %2 - Child Parameter Value
 * @default (%1) + (%2)
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

const _0x3c75=['bJYTZ','NUM','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ruHRd','match','exit','Xnhtk','formula','4961jvhERJ','ARRAYSTR','fWTkC','ARRAYNUM','filter','MkqFI','InheritParameters','OVcMU','status','getTilesetIdWithName','name','STRUCT','_weaponIDs','Settings','damage','isPlaytest','683648dAOrQt','111hRFSDI','ARRAYEVAL','STR','InheritTarget','_actorIDs','998065FzLCLu','341861hvyhBV','ExtendedProperties','makeDeepCopy','JokNm','SmbkZ','CheckLoop','process_VisuMZ_DatabaseInherit_Notetags','1708699bPtRpJ','_skillIDs','InheritNotetags','note','MetaNotetags','meta','trim','getItemIdWithName','InheritProperties','IqFxg','STCAU','ezBKQ','params','concat','split','rglhs','DamageFmt','call','673vqwhfU','ARRAYFUNC','yrDqr','getEnemyIdWithName','InheritTraits','getActorIdWithName','ngfqV','log','getClassIdWithName','KUYqd','effects','UipeH','upLjB','688031JPWLLs','description','_armorIDs','FUNC','_enemyIDs','getArmorIdWithName','RegExp','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','toUpperCase','TmazM','lmqAW','plBZj','1DaVAUN','length','InheritNext','process_VisuMZ_DatabaseInherit','_classIDs','_stateIDs','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','TLKmG','InheritLast','format','getWeaponIdWithName','OverwriteProperties','_tilesetIDs','ParameterFmt','wkoaF','FUJPz','XnPuc','InheritDamageFormula','Scene_Boot_onDatabaseLoaded','map','InheritPrev','actions','traits','getSkillIdWithName','JSON','lDmdd','jrxrZ','1225clAkcM','CLHtV','parse','getStateIdWithName','zQFRf','ARRAYSTRUCT','return\x200','InheritActionPatterns','getParentObjIndex','replace','MpWSV','prototype','qvKtF','hVqgY','XvHxE','_itemIDs','DatabaseInherit','PSDPQ','UDvvW','ConvertParams','max','InheritEffects','InheritFirst'];const _0x488a73=_0x2ece;function _0x2ece(_0x307c1c,_0xdc1fb){_0x307c1c=_0x307c1c-0xc3;let _0x3c7522=_0x3c75[_0x307c1c];return _0x3c7522;}(function(_0x178418,_0x54c185){const _0x5c3042=_0x2ece;while(!![]){try{const _0x52d664=parseInt(_0x5c3042(0x131))*parseInt(_0x5c3042(0x120))+parseInt(_0x5c3042(0x130))+parseInt(_0x5c3042(0x137))+-parseInt(_0x5c3042(0x101))*parseInt(_0x5c3042(0xcd))+-parseInt(_0x5c3042(0xda))+-parseInt(_0x5c3042(0x136))+parseInt(_0x5c3042(0xe6))*parseInt(_0x5c3042(0x13e));if(_0x52d664===_0x54c185)break;else _0x178418['push'](_0x178418['shift']());}catch(_0x36889c){_0x178418['push'](_0x178418['shift']());}}}(_0x3c75,0xbd0d6));var label='DatabaseInherit',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x488a73(0x124)](function(_0xb6baab){const _0x1210f5=_0x488a73;return _0xb6baab[_0x1210f5(0x128)]&&_0xb6baab[_0x1210f5(0xdb)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x488a73(0x12d)]=VisuMZ[label][_0x488a73(0x12d)]||{},VisuMZ[_0x488a73(0x114)]=function(_0x2e0734,_0x36ec71){const _0x42e3c7=_0x488a73;for(const _0x24a516 in _0x36ec71){if(_0x42e3c7(0xca)!==_0x42e3c7(0xca)){function _0x459818(){const _0x30010e=_0x42e3c7;_0x35b2c1=_0x593c1b[_0x30010e(0x115)](_0x18bc47,_0x40a717);}}else{if(_0x24a516[_0x42e3c7(0x11c)](/(.*):(.*)/i)){if(_0x42e3c7(0xff)===_0x42e3c7(0xff)){const _0x39b353=String(RegExp['$1']),_0x15db93=String(RegExp['$2'])[_0x42e3c7(0xe2)]()[_0x42e3c7(0x144)]();let _0x11bd96,_0xcabff5,_0x1855b6;switch(_0x15db93){case _0x42e3c7(0x119):_0x11bd96=_0x36ec71[_0x24a516]!==''?Number(_0x36ec71[_0x24a516]):0x0;break;case _0x42e3c7(0x123):_0xcabff5=_0x36ec71[_0x24a516]!==''?JSON['parse'](_0x36ec71[_0x24a516]):[],_0x11bd96=_0xcabff5[_0x42e3c7(0xf9)](_0x5bb2c6=>Number(_0x5bb2c6));break;case'EVAL':_0x11bd96=_0x36ec71[_0x24a516]!==''?eval(_0x36ec71[_0x24a516]):null;break;case _0x42e3c7(0x132):_0xcabff5=_0x36ec71[_0x24a516]!==''?JSON[_0x42e3c7(0x103)](_0x36ec71[_0x24a516]):[],_0x11bd96=_0xcabff5[_0x42e3c7(0xf9)](_0xdc2adb=>eval(_0xdc2adb));break;case _0x42e3c7(0xfe):_0x11bd96=_0x36ec71[_0x24a516]!==''?JSON[_0x42e3c7(0x103)](_0x36ec71[_0x24a516]):'';break;case'ARRAYJSON':_0xcabff5=_0x36ec71[_0x24a516]!==''?JSON[_0x42e3c7(0x103)](_0x36ec71[_0x24a516]):[],_0x11bd96=_0xcabff5[_0x42e3c7(0xf9)](_0x421fa9=>JSON[_0x42e3c7(0x103)](_0x421fa9));break;case _0x42e3c7(0xdd):_0x11bd96=_0x36ec71[_0x24a516]!==''?new Function(JSON[_0x42e3c7(0x103)](_0x36ec71[_0x24a516])):new Function(_0x42e3c7(0x107));break;case _0x42e3c7(0xce):_0xcabff5=_0x36ec71[_0x24a516]!==''?JSON['parse'](_0x36ec71[_0x24a516]):[],_0x11bd96=_0xcabff5[_0x42e3c7(0xf9)](_0x56f8d0=>new Function(JSON[_0x42e3c7(0x103)](_0x56f8d0)));break;case _0x42e3c7(0x133):_0x11bd96=_0x36ec71[_0x24a516]!==''?String(_0x36ec71[_0x24a516]):'';break;case _0x42e3c7(0x121):_0xcabff5=_0x36ec71[_0x24a516]!==''?JSON['parse'](_0x36ec71[_0x24a516]):[],_0x11bd96=_0xcabff5[_0x42e3c7(0xf9)](_0x5eaa21=>String(_0x5eaa21));break;case _0x42e3c7(0x12b):_0x1855b6=_0x36ec71[_0x24a516]!==''?JSON['parse'](_0x36ec71[_0x24a516]):{},_0x11bd96=VisuMZ[_0x42e3c7(0x114)]({},_0x1855b6);break;case _0x42e3c7(0x106):_0xcabff5=_0x36ec71[_0x24a516]!==''?JSON[_0x42e3c7(0x103)](_0x36ec71[_0x24a516]):[],_0x11bd96=_0xcabff5['map'](_0x25497a=>VisuMZ[_0x42e3c7(0x114)]({},JSON[_0x42e3c7(0x103)](_0x25497a)));break;default:continue;}_0x2e0734[_0x39b353]=_0x11bd96;}else{function _0x47755c(){const _0xc59602=_0x42e3c7,_0x320cd4=_0x12b7f6['DatabaseInherit']['Settings'][_0xc59602(0xcb)];_0x51cea8[_0xc59602(0x12e)][_0xc59602(0x11f)]=_0x320cd4[_0xc59602(0xef)](_0x41fc4e[_0xc59602(0x12e)][_0xc59602(0x11f)]||'0',_0x120167[_0xc59602(0x12e)][_0xc59602(0x11f)]||'0');}}}}}return _0x2e0734;},(_0x13b607=>{const _0xdd72c4=_0x488a73,_0x53c14c=_0x13b607[_0xdd72c4(0x12a)];for(const _0x42fa99 of dependencies){if(!Imported[_0x42fa99]){if(_0xdd72c4(0x125)===_0xdd72c4(0xf6)){function _0x4e13ea(){return _0x5c236d;}}else{alert(_0xdd72c4(0x11a)['format'](_0x53c14c,_0x42fa99)),SceneManager[_0xdd72c4(0x11d)]();break;}}}const _0x1f413c=_0x13b607[_0xdd72c4(0xdb)];if(_0x1f413c[_0xdd72c4(0x11c)](/\[Version[ ](.*?)\]/i)){if(_0xdd72c4(0x13a)!==_0xdd72c4(0x13a)){function _0x268f7e(){const _0x343872=_0xdd72c4,_0x23f844=_0x15e149[_0x343872(0xef)](_0x2da3af[_0x343872(0xc7)][_0x6dbdc2]||0x0,_0x3f2848[_0x343872(0xc7)][_0x3399ef]||0x0);try{_0x3187d[_0x343872(0xc7)][_0x2c6f8e]=_0x575eb2(_0x23f844);}catch(_0x16f48a){if(_0xce93f8[_0x343872(0x12f)]())_0x45f02f[_0x343872(0xd4)](_0x16f48a);_0x379315['params'][_0x7c696f]+=_0x4bd8e8[_0x343872(0xc7)][_0x24442b];}}}else{const _0xac4a72=Number(RegExp['$1']);if(_0xac4a72!==VisuMZ[label]['version']){if(_0xdd72c4(0x122)===_0xdd72c4(0x122))alert(_0xdd72c4(0xec)[_0xdd72c4(0xef)](_0x53c14c,_0xac4a72)),SceneManager[_0xdd72c4(0x11d)]();else{function _0x3861b1(){return _0x49a459['getStateIdWithName'](_0x36d214)||_0x398fb3;}}}}}if(_0x1f413c[_0xdd72c4(0x11c)](/\[Tier[ ](\d+)\]/i)){const _0x4b20d1=Number(RegExp['$1']);if(_0x4b20d1<tier){if(_0xdd72c4(0x112)===_0xdd72c4(0x112))alert(_0xdd72c4(0xe1)[_0xdd72c4(0xef)](_0x53c14c,_0x4b20d1,tier)),SceneManager[_0xdd72c4(0x11d)]();else{function _0x5f49be(){const _0x17d27e=_0xdd72c4;_0x4377dd[_0x17d27e(0x111)]['InheritEffects'](_0x2b4fb8,_0x5a5682);}}}else{if(_0xdd72c4(0xed)==='XtKnH'){function _0x243d3d(){const _0x229a2a=_0xdd72c4,_0x1cd7ea=_0x4cd9ad(_0x3160bc['$1']);_0x1cd7ea<_0x2515b1?(_0x4a03c8(_0x229a2a(0xe1)[_0x229a2a(0xef)](_0x4c77a6,_0x1cd7ea,_0x5958ad)),_0x287a41['exit']()):_0x44c57f=_0x1b947a[_0x229a2a(0x115)](_0x1cd7ea,_0x55cdb9);}}else tier=Math[_0xdd72c4(0x115)](_0x4b20d1,tier);}}VisuMZ[_0xdd72c4(0x114)](VisuMZ[label][_0xdd72c4(0x12d)],_0x13b607['parameters']);})(pluginData),VisuMZ['DatabaseInherit'][_0x488a73(0xf8)]=Scene_Boot[_0x488a73(0x10c)]['onDatabaseLoaded'],Scene_Boot[_0x488a73(0x10c)]['onDatabaseLoaded']=function(){const _0x18d1c0=_0x488a73;this[_0x18d1c0(0xe9)](),VisuMZ[_0x18d1c0(0x111)][_0x18d1c0(0xf8)][_0x18d1c0(0xcc)](this);},Scene_Boot['prototype'][_0x488a73(0xe9)]=function(){const _0x3feaff=_0x488a73;this[_0x3feaff(0x13d)](!![]),this[_0x3feaff(0x13d)](![]);},VisuMZ[_0x488a73(0x111)][_0x488a73(0xe0)]={'InheritTarget':/<INHERIT (.*) FROM:[ ](.*)>/gi,'InheritFirst':/<INHERIT (?:FIRST|INITIAL) (.*)>/gi,'InheritLast':/<INHERIT (?:LAST|FINAL) (.*)>/gi,'InheritPrev':/<INHERIT (?:PREV|PREVIOUS) (.*)>/gi,'InheritNext':/<INHERIT (?:NEXT|FOLLOWING) (.*)>/gi},Scene_Boot[_0x488a73(0x10c)]['process_VisuMZ_DatabaseInherit_Notetags']=function(_0x2f4443){const _0x28cbea=_0x488a73,_0x2e25df=[$dataActors,$dataClasses,$dataSkills,$dataItems,$dataWeapons,$dataArmors,$dataEnemies,$dataStates,$dataTilesets],_0x266614=VisuMZ[_0x28cbea(0x111)][_0x28cbea(0xe0)],_0x76ef83=[_0x266614[_0x28cbea(0x134)],_0x266614[_0x28cbea(0x117)],_0x266614[_0x28cbea(0xee)],_0x266614[_0x28cbea(0xfa)],_0x266614[_0x28cbea(0xe8)]];for(const _0x3efa3b of _0x2e25df){if(!_0x3efa3b)continue;for(const _0xd82878 of _0x3efa3b){if('gtzrn'===_0x28cbea(0xf5)){function _0x26b86b(){return;}}else{if(!_0xd82878)continue;const _0x1a2d51=_0xd82878[_0x28cbea(0x141)];for(const _0x3adb2c of _0x76ef83){if(_0x28cbea(0x118)===_0x28cbea(0xe3)){function _0x566362(){const _0xcb6f7d=_0x28cbea;_0x1e1c89[_0xcb6f7d(0x11c)](/(?:NOTETAG|NOTETAGS|ALL|EVERYTHING)/i)&&_0x4fe72e[_0xcb6f7d(0x111)][_0xcb6f7d(0x140)](_0x27b0bc,_0x593999);}}else{const _0x2644dd=_0x1a2d51[_0x28cbea(0x11c)](_0x3adb2c);if(_0x2644dd)for(const _0x40f631 of _0x2644dd){VisuMZ[_0x28cbea(0x111)][_0x28cbea(0x13c)](_0x40f631,_0x3adb2c,_0xd82878,_0x3efa3b,_0x2f4443);}}}}}}},VisuMZ[_0x488a73(0x111)][_0x488a73(0x13c)]=function(_0x46b504,_0x328fc1,_0x1bccda,_0xff0747,_0x358f62){const _0x2e3ed6=_0x488a73,_0x3d97fd=VisuMZ[_0x2e3ed6(0x111)][_0x2e3ed6(0xe0)];let _0x22b975='',_0x3b8976=[0x0];_0x46b504[_0x2e3ed6(0x11c)](_0x328fc1);if(_0x328fc1===_0x3d97fd[_0x2e3ed6(0x134)])_0x22b975=String(RegExp['$1']),_0x3b8976=String(RegExp['$2'])[_0x2e3ed6(0xc9)](',');else{if(_0x328fc1===_0x3d97fd[_0x2e3ed6(0x117)])_0x22b975=String(RegExp['$1']),_0x3b8976=['1'];else{if(_0x328fc1===_0x3d97fd[_0x2e3ed6(0xee)]){if(_0x2e3ed6(0xc4)===_0x2e3ed6(0x10b)){function _0x108f58(){const _0x5808f8=_0x2e3ed6;return _0x3979d7[_0x5808f8(0x145)](_0x1ad88)||_0x6f256f;}}else _0x22b975=String(RegExp['$1']),_0x3b8976=[_0xff0747[_0xff0747['length']-0x1]['id']];}else{if(_0x328fc1===_0x3d97fd[_0x2e3ed6(0xfa)])_0x22b975=String(RegExp['$1']),_0x3b8976=[_0xff0747[_0x1bccda['id']-0x1]['id']];else{if(_0x328fc1===_0x3d97fd['InheritNext'])_0x22b975=String(RegExp['$1']),_0x3b8976=[_0xff0747[_0x1bccda['id']+0x1]['id']];else return;}}}}for(const _0x2c7c79 of _0x3b8976){if(_0x2e3ed6(0x10d)==='NSvpX'){function _0x551197(){_0xeaa51e=_0x9dc4f7(_0xd4f78b['$1']),_0x4f2784=['1'];}}else{const _0x217775=VisuMZ[_0x2e3ed6(0x111)]['getParentObjIndex'](_0x2c7c79,_0xff0747);if(_0x217775<=0x0)return;const _0x52cf67=_0xff0747[_0x217775];if(!_0x52cf67)return;if(_0x52cf67===_0x1bccda)return;if(_0x358f62){if('plBZj'===_0x2e3ed6(0xe5))_0x22b975[_0x2e3ed6(0x11c)](/(?:NOTETAG|NOTETAGS|ALL|EVERYTHING)/i)&&VisuMZ['DatabaseInherit'][_0x2e3ed6(0x140)](_0x1bccda,_0x52cf67);else{function _0x26761e(){const _0x51d1fe=_0x2e3ed6;_0x4667b5[_0x51d1fe(0x111)][_0x51d1fe(0x108)](_0x2a4503,_0x46ccbd);}}}else{_0x22b975[_0x2e3ed6(0x11c)](/(?:PROPERTY|PROPERTIES|ALL|EVERYTHING)/i)&&VisuMZ['DatabaseInherit'][_0x2e3ed6(0xc3)](_0x1bccda,_0x52cf67);if(_0x22b975[_0x2e3ed6(0x11c)](/(?:DAMAGE FORMULA|DAMAGEFORMULA|DAMAGE|ALL|EVERYTHING)/i)){if(_0x2e3ed6(0xd6)!==_0x2e3ed6(0xd6)){function _0x319090(){const _0x264fd1=_0x2e3ed6;_0x137f76[_0x264fd1(0x111)][_0x264fd1(0xf7)](_0x1c84f5,_0x49c1ca);}}else VisuMZ[_0x2e3ed6(0x111)]['InheritDamageFormula'](_0x1bccda,_0x52cf67);}_0x22b975['match'](/(?:PARAMETERS|PARAMS|STATS|ALL|EVERYTHING)/i)&&VisuMZ[_0x2e3ed6(0x111)][_0x2e3ed6(0x126)](_0x1bccda,_0x52cf67);_0x22b975[_0x2e3ed6(0x11c)](/(?:ACTIONS|PATTERNS|ACTION PATTERNS|ALL|EVERYTHING)/i)&&VisuMZ[_0x2e3ed6(0x111)][_0x2e3ed6(0x108)](_0x1bccda,_0x52cf67);if(_0x22b975[_0x2e3ed6(0x11c)](/(?:TRAIT|TRAITS|ALL|EVERYTHING)/i)){if(_0x2e3ed6(0x127)!==_0x2e3ed6(0x11e))VisuMZ['DatabaseInherit']['InheritTraits'](_0x1bccda,_0x52cf67);else{function _0x43c480(){return _0x1cd90d['getArmorIdWithName'](_0x9ca0c1)||_0x41b567;}}}_0x22b975['match'](/(?:EFFECT|EFFECTS|ALL|EVERYTHING)/i)&&VisuMZ[_0x2e3ed6(0x111)][_0x2e3ed6(0x116)](_0x1bccda,_0x52cf67);}}}},VisuMZ[_0x488a73(0x111)][_0x488a73(0x109)]=function(_0x1345f9,_0x35fd14){const _0x1718b3=_0x488a73,_0xf43ab4=Number(_0x1345f9)||0x0;_0x1345f9=String(_0x1345f9);if(_0x35fd14===$dataActors){if(_0x1718b3(0xe4)===_0x1718b3(0xe4))return DataManager[_0x1718b3(0xd2)](_0x1345f9)||_0xf43ab4;else{function _0x46e928(){const _0x325ab5=_0x1718b3;if(_0x4295be[_0x58d089]!==_0x55fa59&&_0x9fc5d6[_0x330763]!==_0x27472c)try{_0x386018[_0x3c467f]+=_0x2e4be8[_0x1a3665];}catch(_0x1df97e){if(_0x397adc[_0x325ab5(0x12f)]())_0x394fda[_0x325ab5(0xd4)](_0x1df97e);_0x11199e[_0x24c5b0]=_0x3ebf37[_0x325ab5(0x139)](_0x2112dd[_0x4d62c0]);}}}}else{if(_0x35fd14===$dataClasses)return DataManager[_0x1718b3(0xd5)](_0x1345f9)||_0xf43ab4;else{if(_0x35fd14===$dataSkills)return DataManager[_0x1718b3(0xfd)](_0x1345f9)||_0xf43ab4;else{if(_0x35fd14===$dataItems)return DataManager['getItemIdWithName'](_0x1345f9)||_0xf43ab4;else{if(_0x35fd14===$dataWeapons){if(_0x1718b3(0xc6)!==_0x1718b3(0xc6)){function _0x4cff95(){const _0x32a31b=_0x1718b3;if(_0x280014[_0x32a31b(0x12f)]())_0xdc7f54[_0x32a31b(0xd4)](_0x240daa);_0xf5f646[_0x32a31b(0xc7)][_0x2569c4]+=_0x44d18d[_0x32a31b(0xc7)][_0x1d3112];}}else return DataManager[_0x1718b3(0xf0)](_0x1345f9)||_0xf43ab4;}else{if(_0x35fd14===$dataArmors)return DataManager['getArmorIdWithName'](_0x1345f9)||_0xf43ab4;else{if(_0x35fd14===$dataEnemies)return DataManager[_0x1718b3(0xd0)](_0x1345f9)||_0xf43ab4;else{if(_0x35fd14===$dataStates){if('zQFRf'!==_0x1718b3(0x105)){function _0x5b37ce(){const _0x1361a3=_0x1718b3;_0x31f134(_0x1361a3(0xe1)[_0x1361a3(0xef)](_0x5bd88b,_0x1f6183,_0x1d2f7f)),_0x5ca68d[_0x1361a3(0x11d)]();}}else return DataManager[_0x1718b3(0x104)](_0x1345f9)||_0xf43ab4;}else{if(_0x35fd14===$dataTilesets){if(_0x1718b3(0x102)===_0x1718b3(0x102))return DataManager[_0x1718b3(0x129)](_0x1345f9)||_0xf43ab4;else{function _0x344ab9(){const _0x10723d=_0x1718b3;_0x4449dc[_0x10723d(0xc7)][_0x3cf139]=_0x2d7e40(_0x5e8522);}}}else{if(_0x1718b3(0x11b)==='ruHRd')return _0xf43ab4;else{function _0x427b3e(){_0x2b58bd[_0x5a8826]+=_0x3e44a8[_0x1b669d];}}}}}}}}}}}},VisuMZ[_0x488a73(0x111)][_0x488a73(0x140)]=function(_0x5d9442,_0x589abc){const _0x51ca71=_0x488a73;if(_0x589abc[_0x51ca71(0x143)]&&VisuMZ[_0x51ca71(0x111)][_0x51ca71(0x12d)][_0x51ca71(0x142)])for(const _0x48805d in _0x589abc[_0x51ca71(0x143)]){if(_0x51ca71(0x10f)!=='XvHxE'){function _0x2ebb5b(){return _0x2c6538['getClassIdWithName'](_0x268608)||_0x9966bd;}}else{if(_0x5d9442[_0x51ca71(0x143)][_0x48805d])continue;_0x5d9442['meta'][_0x48805d]=JsonEx[_0x51ca71(0x139)](_0x589abc[_0x51ca71(0x143)][_0x48805d]);}}let _0x510d20=_0x589abc[_0x51ca71(0x141)]||'';_0x510d20=_0x510d20[_0x51ca71(0x10a)](/<INHERIT (.*)(.*)>/gi,''),_0x5d9442['note']=(_0x5d9442[_0x51ca71(0x141)]||'')+'\x0a'+_0x510d20;},VisuMZ['DatabaseInherit'][_0x488a73(0xc3)]=function(_0x448cf6,_0x4ae478){const _0x51e611=_0x488a73,_0x323128=VisuMZ['DatabaseInherit'][_0x51e611(0x12d)],_0x546509=_0x323128[_0x51e611(0xf1)],_0x1c5627=_0x323128[_0x51e611(0x138)];for(const _0xb82b62 of _0x546509){if(_0x51e611(0xc5)===_0x51e611(0x113)){function _0x4f5e91(){return _0x107696['getActorIdWithName'](_0x51af70)||_0x25d30f;}}else _0x448cf6[_0xb82b62]!==undefined&&_0x4ae478[_0xb82b62]!==undefined&&(_0x448cf6[_0xb82b62]=JsonEx['makeDeepCopy'](_0x4ae478[_0xb82b62]));}for(const _0x20b513 of _0x1c5627){if(_0x448cf6[_0x20b513]!==undefined&&_0x4ae478[_0x20b513]!==undefined){if(_0x51e611(0xf4)!==_0x51e611(0xf4)){function _0x12400b(){const _0x50e7df=_0x51e611;_0x22b57c=_0x3bbd9b(_0x386fc6['$1']),_0xd09f61=_0x3ba2dc(_0x4fab6b['$2'])[_0x50e7df(0xc9)](',');}}else try{if(_0x51e611(0xd8)!==_0x51e611(0x10e))_0x448cf6[_0x20b513]+=_0x4ae478[_0x20b513];else{function _0x52eb95(){const _0x24a4cc=_0x51e611;return _0x33a097[_0x24a4cc(0xf0)](_0x13ddd5)||_0xe91d6c;}}}catch(_0x5041db){if($gameTemp[_0x51e611(0x12f)]())console[_0x51e611(0xd4)](_0x5041db);_0x448cf6[_0x20b513]=JsonEx[_0x51e611(0x139)](_0x4ae478[_0x20b513]);}}}},VisuMZ[_0x488a73(0x111)][_0x488a73(0xf7)]=function(_0x346146,_0x4c456c){const _0x386deb=_0x488a73;if(_0x346146[_0x386deb(0x12e)]===undefined)return;if(_0x4c456c[_0x386deb(0x12e)]===undefined)return;if(_0x346146[_0x386deb(0x12e)]!==undefined&&_0x4c456c[_0x386deb(0x12e)]!==undefined){if(_0x386deb(0x13b)!=='SmbkZ'){function _0x222255(){const _0x4978cb=_0x386deb;_0x3a259b=_0x5ee550(_0x421c72['$1']),_0x2e6f8c=[_0x3d90b9[_0x4097e6[_0x4978cb(0xe7)]-0x1]['id']];}}else{const _0x511651=VisuMZ[_0x386deb(0x111)][_0x386deb(0x12d)][_0x386deb(0xcb)];_0x346146[_0x386deb(0x12e)][_0x386deb(0x11f)]=_0x511651[_0x386deb(0xef)](_0x4c456c['damage'][_0x386deb(0x11f)]||'0',_0x346146[_0x386deb(0x12e)][_0x386deb(0x11f)]||'0');}}},VisuMZ[_0x488a73(0x111)][_0x488a73(0x126)]=function(_0x43f372,_0x1c7243){const _0x5a2961=_0x488a73;if(_0x43f372['traits']===undefined)return;if(_0x1c7243[_0x5a2961(0xfc)]===undefined)return;if(_0x43f372[_0x5a2961(0xc7)]!==undefined&&_0x1c7243['params']!==undefined){const _0x42e3e7=VisuMZ[_0x5a2961(0x111)][_0x5a2961(0x12d)][_0x5a2961(0xf3)],_0x568da4=_0x43f372[_0x5a2961(0xc7)][_0x5a2961(0xe7)];for(let _0x1c8453=0x0;_0x1c8453<_0x568da4;_0x1c8453++){const _0x36c1f6=_0x42e3e7[_0x5a2961(0xef)](_0x1c7243[_0x5a2961(0xc7)][_0x1c8453]||0x0,_0x43f372['params'][_0x1c8453]||0x0);try{_0x43f372[_0x5a2961(0xc7)][_0x1c8453]=eval(_0x36c1f6);}catch(_0x46c483){if($gameTemp['isPlaytest']())console[_0x5a2961(0xd4)](_0x46c483);_0x43f372[_0x5a2961(0xc7)][_0x1c8453]+=_0x1c7243['params'][_0x1c8453];}}}},VisuMZ['DatabaseInherit'][_0x488a73(0x108)]=function(_0x3a88b7,_0x254ef0){const _0x38519e=_0x488a73;if(_0x3a88b7[_0x38519e(0xfb)]===undefined)return;if(_0x254ef0[_0x38519e(0xfb)]===undefined)return;_0x3a88b7['actions']=_0x254ef0[_0x38519e(0xfb)][_0x38519e(0xc8)](_0x3a88b7['actions']);},VisuMZ['DatabaseInherit'][_0x488a73(0xd1)]=function(_0xd265f2,_0x321681){const _0x5f442b=_0x488a73;if(_0xd265f2[_0x5f442b(0xfc)]===undefined)return;if(_0x321681[_0x5f442b(0xfc)]===undefined)return;_0xd265f2[_0x5f442b(0xfc)]=_0x321681[_0x5f442b(0xfc)][_0x5f442b(0xc8)](_0xd265f2[_0x5f442b(0xfc)]);},VisuMZ['DatabaseInherit']['InheritEffects']=function(_0x4d4b1b,_0xd0031e){const _0x3d9806=_0x488a73;if(_0x4d4b1b['effects']===undefined)return;if(_0xd0031e[_0x3d9806(0xd7)]===undefined)return;_0x4d4b1b['effects']=_0xd0031e[_0x3d9806(0xd7)]['concat'](_0x4d4b1b[_0x3d9806(0xd7)]);},DataManager[_0x488a73(0xd2)]=function(_0x301f20){const _0xb60ff2=_0x488a73;_0x301f20=_0x301f20[_0xb60ff2(0xe2)]()[_0xb60ff2(0x144)](),this[_0xb60ff2(0x135)]=this['_actorIDs']||{};if(this[_0xb60ff2(0x135)][_0x301f20])return this[_0xb60ff2(0x135)][_0x301f20];for(const _0xd8983d of $dataActors){if(_0xb60ff2(0xd3)!==_0xb60ff2(0xcf)){if(!_0xd8983d)continue;this[_0xb60ff2(0x135)][_0xd8983d[_0xb60ff2(0x12a)][_0xb60ff2(0xe2)]()[_0xb60ff2(0x144)]()]=_0xd8983d['id'];}else{function _0x9ca9c(){const _0x4e83a0=_0xb60ff2;_0x409005[_0x4e83a0(0x111)][_0x4e83a0(0xc3)](_0x49e3ba,_0x2b5b61);}}}return this[_0xb60ff2(0x135)][_0x301f20]||0x0;},DataManager[_0x488a73(0xd5)]=function(_0x18d016){const _0x5cf32e=_0x488a73;_0x18d016=_0x18d016[_0x5cf32e(0xe2)]()[_0x5cf32e(0x144)](),this[_0x5cf32e(0xea)]=this['_classIDs']||{};if(this[_0x5cf32e(0xea)][_0x18d016])return this[_0x5cf32e(0xea)][_0x18d016];for(const _0x4f0127 of $dataClasses){if(!_0x4f0127)continue;let _0xfc6065=_0x4f0127[_0x5cf32e(0x12a)];_0xfc6065=_0xfc6065['replace'](/\x1I\[(\d+)\]/gi,''),_0xfc6065=_0xfc6065[_0x5cf32e(0x10a)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0xfc6065[_0x5cf32e(0xe2)]()['trim']()]=_0x4f0127['id'];}return this[_0x5cf32e(0xea)][_0x18d016]||0x0;},DataManager[_0x488a73(0xfd)]=function(_0x3ebba9){const _0x2ee378=_0x488a73;_0x3ebba9=_0x3ebba9[_0x2ee378(0xe2)]()[_0x2ee378(0x144)](),this['_skillIDs']=this['_skillIDs']||{};if(this['_skillIDs'][_0x3ebba9])return this[_0x2ee378(0x13f)][_0x3ebba9];for(const _0x3a9e6d of $dataSkills){if(!_0x3a9e6d)continue;this[_0x2ee378(0x13f)][_0x3a9e6d[_0x2ee378(0x12a)][_0x2ee378(0xe2)]()[_0x2ee378(0x144)]()]=_0x3a9e6d['id'];}return this[_0x2ee378(0x13f)][_0x3ebba9]||0x0;},DataManager[_0x488a73(0x145)]=function(_0x109337){const _0x20feeb=_0x488a73;_0x109337=_0x109337['toUpperCase']()['trim'](),this[_0x20feeb(0x110)]=this['_itemIDs']||{};if(this[_0x20feeb(0x110)][_0x109337])return this[_0x20feeb(0x110)][_0x109337];for(const _0x15efac of $dataItems){if(!_0x15efac)continue;this[_0x20feeb(0x110)][_0x15efac['name'][_0x20feeb(0xe2)]()[_0x20feeb(0x144)]()]=_0x15efac['id'];}return this[_0x20feeb(0x110)][_0x109337]||0x0;},DataManager[_0x488a73(0xf0)]=function(_0x334d1f){const _0x26dd5f=_0x488a73;_0x334d1f=_0x334d1f[_0x26dd5f(0xe2)]()[_0x26dd5f(0x144)](),this[_0x26dd5f(0x12c)]=this[_0x26dd5f(0x12c)]||{};if(this[_0x26dd5f(0x12c)][_0x334d1f])return this[_0x26dd5f(0x12c)][_0x334d1f];for(const _0x5596a1 of $dataWeapons){if(!_0x5596a1)continue;this[_0x26dd5f(0x12c)][_0x5596a1[_0x26dd5f(0x12a)]['toUpperCase']()[_0x26dd5f(0x144)]()]=_0x5596a1['id'];}return this['_weaponIDs'][_0x334d1f]||0x0;},DataManager[_0x488a73(0xdf)]=function(_0x2574bb){const _0x3d5f14=_0x488a73;_0x2574bb=_0x2574bb['toUpperCase']()[_0x3d5f14(0x144)](),this['_armorIDs']=this[_0x3d5f14(0xdc)]||{};if(this[_0x3d5f14(0xdc)][_0x2574bb])return this['_armorIDs'][_0x2574bb];for(const _0x4a5b99 of $dataArmors){if(!_0x4a5b99)continue;this[_0x3d5f14(0xdc)][_0x4a5b99[_0x3d5f14(0x12a)][_0x3d5f14(0xe2)]()['trim']()]=_0x4a5b99['id'];}return this[_0x3d5f14(0xdc)][_0x2574bb]||0x0;},DataManager[_0x488a73(0xd0)]=function(_0x5a8c6d){const _0x50f9c2=_0x488a73;_0x5a8c6d=_0x5a8c6d[_0x50f9c2(0xe2)]()['trim'](),this[_0x50f9c2(0xde)]=this['_enemyIDs']||{};if(this['_enemyIDs'][_0x5a8c6d])return this[_0x50f9c2(0xde)][_0x5a8c6d];for(const _0x2d5e99 of $dataEnemies){if(!_0x2d5e99)continue;this[_0x50f9c2(0xde)][_0x2d5e99[_0x50f9c2(0x12a)]['toUpperCase']()['trim']()]=_0x2d5e99['id'];}return this[_0x50f9c2(0xde)][_0x5a8c6d]||0x0;},DataManager['getStateIdWithName']=function(_0x3f532b){const _0x126463=_0x488a73;_0x3f532b=_0x3f532b[_0x126463(0xe2)]()[_0x126463(0x144)](),this[_0x126463(0xeb)]=this[_0x126463(0xeb)]||{};if(this[_0x126463(0xeb)][_0x3f532b])return this[_0x126463(0xeb)][_0x3f532b];for(const _0x2f7703 of $dataStates){if('xDCsO'!=='Jolqo'){if(!_0x2f7703)continue;this[_0x126463(0xeb)][_0x2f7703[_0x126463(0x12a)][_0x126463(0xe2)]()[_0x126463(0x144)]()]=_0x2f7703['id'];}else{function _0x36c190(){const _0x4b80f7=_0x126463;if(_0x51fadf['traits']===_0x523ae8)return;if(_0x4536f1[_0x4b80f7(0xfc)]===_0x1b7e2c)return;_0x1b3da9[_0x4b80f7(0xfc)]=_0x58e373['traits'][_0x4b80f7(0xc8)](_0xee6651[_0x4b80f7(0xfc)]);}}}return this[_0x126463(0xeb)][_0x3f532b]||0x0;},DataManager[_0x488a73(0x129)]=function(_0x2febbd){const _0xf9740c=_0x488a73;_0x2febbd=_0x2febbd['toUpperCase']()['trim'](),this[_0xf9740c(0xf2)]=this[_0xf9740c(0xf2)]||{};if(this[_0xf9740c(0xf2)][_0x2febbd])return this[_0xf9740c(0xf2)][_0x2febbd];for(const _0x320647 of $dataTilesets){if(_0xf9740c(0xd9)===_0xf9740c(0x100)){function _0x545be9(){const _0x31f53b=_0xf9740c;try{_0x2de762[_0x250d45]+=_0x2efa78[_0x128a2a];}catch(_0x1b4d51){if(_0x333d64[_0x31f53b(0x12f)]())_0x32c90a[_0x31f53b(0xd4)](_0x1b4d51);_0x1ea5e7[_0x2a4a44]=_0xfbb64b[_0x31f53b(0x139)](_0x3f2722[_0x3a279b]);}}}else{if(!_0x320647)continue;this[_0xf9740c(0xf2)][_0x320647[_0xf9740c(0x12a)][_0xf9740c(0xe2)]()[_0xf9740c(0x144)]()]=_0x320647['id'];}}return this[_0xf9740c(0xf2)][_0x2febbd]||0x0;};
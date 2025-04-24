//=============================================================================
// VisuStella MZ - Class Change System
// VisuMZ_2_ClassChangeSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ClassChangeSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ClassChangeSystem = VisuMZ.ClassChangeSystem || {};
VisuMZ.ClassChangeSystem.version = 1.14;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.14] [ClassChangeSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Class_Change_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds the ability for your player to freely change the classes of
 * actors outside of battle from a menu. When changing into different classes,
 * players adjust the game's actors to a different playstyle with different
 * skills, equipment, and traits to make them behave differently.
 * 
 * Multiclassing is also possible. Actors can possess one class to many, from
 * two to ten to as many as you've set up in the Plugin Parameters. Adjust the
 * rulings for how multiclasses behave in your game. Let actors inherit a small
 * percentage of parameters from the multiclasses, skills, equipment access,
 * and more!
 *
 * Features include all (but not limited to) the following:
 * 
 * * A custom scene to let actors change their classes inside of.
 * * When class changing, determine if levels are maintained across all classes
 *   or if each class has their own levels to raise.
 * * Multiclasses allow actors to have more than one class at a time.
 * * Determine the rulings for each multiclass tier through the Plugin
 *   Parameters to gain control over how they influence your game.
 * * Restrict certain multiclass tiers from being able to change classes.
 * * Allow only some classes to be equippable to specific multiclass tiers.
 * * Unlock new classes automatically by reaching certain class levels or when
 *   certain resources have reached certain thresholds.
 * * These resources the new Class Points and Job Points.
 * * Class Points and Job Points are brand new resources added through this
 *   plugin which can be acquired through a variety a means ranging from
 *   participating in battle, defeating enemies, and/or leveling up.
 * * Also unlock classes through Plugin Commands!
 * * Actors can have class specific graphics depending on their primary class.
 *   Appearance changes range from faces, map sprites, battlers, and portraits
 *   used by other VisuStella MZ plugins.
 * * Play an animation on the actor inside the Class Change scene when changing
 *   classes.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Class Specific Graphics
 * 
 * If an actor has class specific graphics, they will overwrite the face
 * graphic, map character sprite graphic, battler graphic, and any portraits
 * that have been added through the VisuStella MZ plugins. The class specific
 * graphics will take priority over the default graphics.
 * 
 * ---
 * 
 * Change Actor Images Event Command
 * 
 * When changing an actor's graphics through the "Change Actor Images" event
 * command, these changes will take priority over the Class Specific Graphics.
 * If you want to remove these priority graphics, set the "Change Actor Images"
 * images to "(None)".
 * 
 * Keep in mind that this means you cannot make an "invisible" graphic through
 * the "(None)" selection anymore. Instead, you need to make a work around by
 * making a custom graphic image that is fully transparent.
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
 * VisuMZ_3_VictoryAftermath
 *
 * If VisuStella MZ's Victory Aftermath plugin is installed, the amount of
 * Job Points and Class Points earned can be visibly shown in the rewards
 * window.
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 * VisuMZ_1_MainMenuCore
 *
 * If the Battle Core and/or the Main Menu Core is installed, the Class Change
 * System also gives access to notetags that alter their battle portraits
 * and/or menu portraits based on whatever class an actor is.
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
 * Core Engine VisuStella MZ
 * 
 * The Core Engine will determine if icons are displayed next to class names
 * for menus. If you do not wish to use them, then you will need to disable
 * them via the Plugin Parameters:
 * 
 *   Core Engine > Plugin Parameters > UI Settings > Text Code > Class Names
 * 
 * Then, set that value to false.
 * 
 * ---
 *
 * ============================================================================
 * Clarification
 * ============================================================================
 *
 * This section is to add clarification on some questions you may have
 * regarding the Class Change System.
 *
 * ---
 *
 * Q. Why do my actors have access to random skill(s) of x class(es)?
 * 
 * A. Are those classes a part of the classes that have already been unlocked?
 * Are the skills learned at level 1 for those classes? And are those classes
 * sharing a particular Skill Type? Then that's your answer.
 * 
 * When classes are unlocked, they are unlocked at level 1. When unlocked at
 * level 1, all of the skills at level 1 are also learned by that actor. And if
 * the classes all share a Skill Type, those skills will also become available
 * to that Skill Type.
 * 
 * If you don't want your classes to have access to all of the skills of the
 * same Skill Type, then give them different Skill Types unique to each class
 * and change the Skill Types of the skills taught for those classes to that
 * class's unique Skill Type.
 *
 * ---
 * 
 * Q. Why does the <Passive State: x> notetag from Skills and States Core apply
 * even if my actor does not have access to the parent skill?
 * 
 * A. Skills with the <Passive State: x> notetag only have a requirement of the
 * skills needing to be learned. It does not have a requirement of the skills
 * needing to be accessible through the Skill Types.
 * 
 * Even without the Class Change System, if you teach an actor a skill that
 * has a Skill Type the actor does not have access to, that actor will still
 * benefit from the <Passive State: x> notetag.
 * 
 * To make it apply only when a certain class is present, you will need to
 * utilize the Passive Condition notetags found in the Skills and States Core.
 * 
 * ---
 * 
 * Q. How do I get the data on which classes and multiclasses an actor has?
 * 
 * A. You would have to use the following code to acquire their data:
 * 
 *   actor.multiclasses()
 *   - This returns an array of all of the multiclasses an actor has.
 *   - This includes the actor's primary class.
 * 
 *   actor.multiclass(x)
 *   - This returns the class data (not ID) of whatever class the actor has
 *     in x multiclass slot.
 *   - An x value of 1 would yield the primary class.
 * 
 *   actor.multiclassId(x)
 *   - This returns the class ID (not data) of whatever class the actor has
 *     in x multiclass slot.
 *   - An x value of 1 would yield the primary class's ID.
 * 
 * ---
 * 
 * Q. How come my subclasses don't gain levels or EXP when I use event commands
 *    on my actors?
 * 
 * A. EXP Reward Rates for subclasses only apply to battle rewards. The event
 *    commands do not affect class settings in case the game dev wishes to fine
 *    tune the amount of EXP each class.
 * 
 * ---
 * 
 * Q. How come subclasses do not appear in the Skill Learn System?
 * 
 * A. That's because class-based resources and requirements are different
 *    depending on the primary class and how they're set up. To avoid
 *    conflicting with subclass resources and requirements, the Skill Learn
 *    System only makes it available for the primary class to learn skills from
 *    at a time. To learn skills from a subclass through the Skill Learn System
 *    the player would have to change to the subclass' class as the primary and
 *    then learn from it.
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
 * === Class Basics-Related Notetags ===
 * 
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Class Notetags
 * - Assigns an icon index for the class to 'x'.
 * - Replace 'x' with a number representing the index value on the IconSet
 *   image in the img/system/ folder for the icon you want to assign.
 * - If this notetag is not used, the icon index will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 *
 * ---
 *
 * <Help Description>
 *  text
 *  text
 * </Help Description>
 *
 * - Used for: Class Notetags
 * - Assigns a help description to the class.
 * - Replace 'text' with text you want displayed when this class is selected
 *   in the Class Change scene's class list.
 * - If this notetag is not used, the help description will default to the
 *   setting found in the Class Change System's Plugin Parameters.
 *
 * ---
 *
 * <Class Change Animation: x>
 *
 * - Used for: Class Notetags
 * - Assigns an animation for the class when the actor changes to that class.
 * - Replace 'x' with a number representing the ID of the animation found in
 *   the database to play when the actor changes to that class.
 * - If this notetag is not used, the animation will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 *
 * ---
 * 
 * <Class Change Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Class Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   class's icon during for the Class Change scene.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of class changing, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === Class Specific Graphics-Related Notetags ===
 * 
 * ---
 *
 * <Class id Face: filename, index>
 * 
 * <Class name Face: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific face graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/faces/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * 
 * Examples: 
 * 
 *   <Class 1 Face: Actor2, 0>
 * 
 *   <Class Swordsman Face: Actor2, 0>
 *
 * ---
 *
 * <Class id Character: filename, index>
 * 
 * <Class name Character: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific map character sprite graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/characters/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * 
 * Examples: 
 * 
 *   <Class 1 Character: Actor2, 0>
 * 
 *   <Class Swordsman Character: Actor2, 0>
 *
 * ---
 *
 * <Class id Battler: filename>
 * 
 * <Class name Battler: filename>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific sideview battler graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/sv_actors/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Battler: Actor2_1>
 * 
 *   <Class Swordsman Battler: Actor2_1>
 *
 * ---
 *
 * <Class id Menu Portrait: filename>
 * 
 * <Class name Menu Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_MainMenuCore!
 * - Gives this actor a class specific menu portrait graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Menu Portrait: Actor2_1>
 * 
 *   <Class Swordsman Menu Portrait: Actor2_1>
 *
 * ---
 *
 * <Class id Battle Portrait: filename>
 * 
 * <Class name Battle Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_BattleCore!
 * - Gives this actor a class specific battle portrait graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Battle Portrait: Actor2_1>
 * 
 *   <Class Swordsman Battle Portrait: Actor2_1>
 *
 * ---
 * 
 * === Class Unlocking-Related Notetags ===
 * 
 * ---
 *
 * <Unlocked Classes: id>
 * <Unlocked Classes: id, id, id>
 * 
 * <Unlocked Classes: name>
 * <Unlocked Classes: name, name, name>
 *
 * - Used for: Actor Notetags
 * - Allows this actor to start with certain classes unlocked. These classes
 *   are unlocked in addition to the ones found in the Plugin Parameters.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Insert multiple data entries to unlock more classes.
 *
 * ---
 *
 * <Auto Unlock Requirements>
 *  Class id: Level x
 *  Class name: Level x
 * 
 *  Class id: x AP
 *  Class name: x AP
 * 
 *  Class id: x CP
 *  Class name: x CP
 * 
 *  Class id: x JP
 *  Class name: x JP
 * 
 *  Class id: x SP
 *  Class name: x SP
 * 
 *  AP: x
 *  CP: x
 *  JP: x
 *  SP: x
 * </Auto Unlock Requirements>
 *
 * - Used for: Class Notetags
 * - Have this class unlock automatically whenever all of the conditions have
 *   been met after a battle is over or upon entering the Class Change scene.
 * - Insert/delete any number of copies of the middle conditions as needed.
 * - For 'id' conditions, replace 'id' with a number representing class's ID.
 * - For 'name' conditions, replace 'name' with the class's name.
 * - For 'AP', 'CP', 'JP', 'SP' conditions that have class markers, they
 *   require that many of the resource as the 'x' value for that class.
 *   These are best used with resource types that are class specific.
 * - For 'AP', 'CP', 'JP', 'SP' conditions that have class markers, they
 *   require that many of the resource as the 'x' value for the current class.
 *   These are best used with resource types that are shared.
 * - 'AP' and 'SP' conditions require VisuMZ_2_SkillLearnSystem.
 * 
 * Examples:
 * 
 * <Auto Unlock Requirements>
 *  Class 4: Level 20
 *  Class 6: Level 15
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: Level 20
 *  Class Spellblade: Level 15
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: 200 JP
 *  Class Spellblade: 100 JP
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: 200 JP
 *  CP: 500
 * </Auto Unlock Requirements>
 *
 * ---
 * 
 * === Category-Related Notetags ===
 * 
 * ---
 *
 * <Starting Multiclasses: x>
 *
 * - Used for: Actor Notetags
 * - Lets the actor start with 'x' amount of class slots to assign.
 * - Replace 'x' with a number value representing the number of slots the
 *   actor can assign classes to.
 * - If this notetag is not used, the slot values will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 * - Slot values cannot go under 1 or exceed the maximum number of layers found
 *   in the "Multiclass Settings" Plugin Parameters.
 *
 * ---
 *
 * <Starting Tier x Class: id>
 * 
 * <Starting Tier x Class: name>
 *
 * - Used for: Actor Notetags
 * - If an actor has multiclass slots, determine which subclasses are assigned
 *   to them at the start.
 * - Replace 'x' with a number value representing the multiclass slot to assign
 *   to. '1' is the primary slot. '2' is the second slot.
 * - For 'id' conditions, replace 'id' with a number representing class's ID.
 * - For 'name' conditions, replace 'name' with the class's name.
 * - Insert multiple copies of this notetag to assign multiple classes to
 *   different slots.
 * 
 * Example:
 * 
 * <Starting Tier 2 Class: Sorcerer>
 * 
 * <Starting Tier 3 Class: Priest>
 *
 * ---
 *
 * <Restrict Class Change Tier: x>
 * <Restrict Class Change Tiers: x, x, x>
 *
 * - Used for: Actor Notetags
 * - This makes an actor unable to change the class found in any of the listed
 *   tier slots unless this effect is cancelled by Plugin Commands.
 * - Replace 'x' with a number representing the tier slot(s) to restrict.
 *
 * ---
 *
 * <Class Change Tier Only: x>
 * <Class Change Tiers Only: x, x, x>
 *
 * - Used for: Class Notetags
 * - This makes the specific class only assignable to specific class tiers.
 * - Replace 'x' with a number representing the tier slot(s) that this class
 *   can be assigned and equipped to.
 *
 * ---
 * 
 * === Class Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting CP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Class Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Class Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting CP: x>
 * <Class name Starting CP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Class Points the actor starts with in a specific
 *   class if Class Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Class Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Class Points for.
 * - Replace 'name' with the name of the class to set starting Class Points
 *   for.
 *
 * ---
 *
 * <CP Gain: x>
 * <User CP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Class Points.
 * - Replace 'x' with a number representing the amount of Class Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Class Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target CP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Class Points.
 * - Replace 'x' with a number representing the amount of Class Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <CP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Class Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Class Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Class Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Class Points Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Class Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Class
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Class Points are directly added, lost, or set.
 *
 * ---
 * 
 * === Job Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting JP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Job Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Job Points to
 *   start out with.
 *
 * ---
 *
 * <Class id Starting JP: x>
 * <Class name Starting JP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Job Points the actor starts with in a specific
 *   class if Job Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Job Points to
 *   start out with.
 * - Replace 'id' with the ID of the class to set starting Job Points for.
 * - Replace 'name' with the name of the class to set starting Job Points for.
 *
 * ---
 *
 * <JP Gain: x>
 * <User JP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Job Points.
 * - Replace 'x' with a number representing the amount of Job Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Job Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target JP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Job Points.
 * - Replace 'x' with a number representing the amount of Job Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <JP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Job Points the enemy will give the player's party
 *   upon being defeated.
 * - Replace 'x' with a number representing the amount of Job Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Job Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Job Points Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Job Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Job Points
 *   that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Job Points are directly added, lost, or set.
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
 * === Unlock Class Plugin Commands ===
 * 
 * ---
 *
 * Unlock Class: Add For Actor(s)
 * - Unlock class(es) for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to unlock class(es) for.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be unlocked.
 *
 * ---
 *
 * Unlock Class: Add For Global
 * - Unlock class(es) for all party members.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be unlocked.
 *
 * ---
 *
 * Unlock Class: Remove From Actor(s)
 * - Remove unlock class(es) for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to remove an unlocked class(es) for.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be removed from the unlocked status.
 *
 * ---
 *
 * Unlock Class: Remove From Global
 * - Remove unlock class(es) for all party members.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be removed from the unlocked status.
 *
 * ---
 * 
 * === Change Restriction Plugin Commands ===
 * 
 * ---
 *
 * Change Restriction: Add Tier Restriction
 * - Add restrictions to prevent class changing specific tier(s) to
 *   target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to restrict class tier(s) for.
 *
 *   Tiers(s):
 *   - Select which class tier(s) to restrict changing for.
 *
 * ---
 *
 * Change Restriction: Remove Tier Restriction
 * - Remove restrictions to allow class changing specific tier(s) for
 *   target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to remove class tier(s) restrictions for.
 *
 *   Tiers(s):
 *   - Select which class tier(s) to remove restrictions for.
 *
 * ---
 * 
 * === Multiclass Plugin Commands ===
 * 
 * ---
 *
 * Multiclass: Change Actor(s) Multiclass
 * - Changes a specific multiclass for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Tier:
 *   - Which multiclass tier to change for the target actor(s)?
 *
 *   Class ID:
 *   - Which class should go into this multiclass tier slot?
 *
 * ---
 *
 * Multiclass: Raise Limit for Actor(s)
 * - Raise the multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Raise Limit By:
 *   - Raise the multiclass limit for target actor(s) by this much.
 *
 * ---
 *
 * Multiclass: Lower Limit for Actor(s)
 * - Lower the multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Reduce Limit By:
 *   - Lower the multiclass limit for target actor(s) by this much.
 *
 * ---
 *
 * Multiclass: Set Limit for Actor(s)
 * - Set multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Set Limit To:
 *   - Set multiclass limit for target actor(s) to this much.
 *
 * ---
 * 
 * === Class Points Plugin Commands ===
 * 
 * ---
 *
 * Class Points: Gain
 * - The target actor(s) gains Class Points.
 * - Gained amounts are affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Add
 * - The target actor(s) receives Class Points.
 * - Received amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Lose
 * - The target actor(s) loses Class Points.
 * - Lost amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Set
 * - Changes the exact Class Points for the target actor(s).
 * - Changed amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === Job Points Plugin Commands ===
 * 
 * ---
 *
 * Job Points: Gain
 * - The target actor(s) gains Job Points.
 * - Gained amounts are affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Add
 * - The target actor(s) receives Job Points.
 * - Received amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Lose
 * - The target actor(s) loses Job Points.
 * - Lost amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Set
 * - Changes the exact Job Points for the target actor(s).
 * - Changed amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Enable Class Change in Menu?
 * - Enables/disables Class Change inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Class Change inside the main menu.
 *
 * ---
 *
 * System: Show Class Change in Menu?
 * - Shows/hides Class Change inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Class Change inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for Class Change System.
 *
 * ---
 *
 * Basics
 * 
 *   Default Help:
 *   - Default help description for all classes.
 *   - %1 - Class Name
 * 
 *   Default Icon:
 *   - Default icon used for all classes.
 * 
 *   Maintain Levels?:
 *   - Make each class have the same level or make each class have
 *     their own level?
 * 
 *   Change-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing classes with MaxHP/MaxMP values.
 *
 * ---
 *
 * Class Unlocking
 * 
 *   Always Unlocked:
 *   - Which classes are always unlocked and available?
 * 
 *   Starting Multiclasses:
 *   - How many classes can actors use at the start by default?
 *   - Use 1 for just the primary class.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ClassChange.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Class Change Sound Settings
 * ============================================================================
 *
 * Sound effect played when changing classes through Scene_ClassChange.
 *
 * ---
 *
 * Class Change Sound Settings
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
 * Plugin Parameters: Main Access Settings
 * ============================================================================
 *
 * Menu Access settings for Class Change.
 *
 * ---
 *
 * Main Menu Settings
 * 
 *   Command Name:
 *   - Name of the 'ClassChangeSystem' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'ClassChangeSystem' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'ClassChangeSystem' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Multiclass Settings
 * ============================================================================
 *
 * Multiclass settings for this plugin. Each tier allows you to have separate
 * settings. The order the tiers are inserted will represent the settings that
 * will be applied to those tiers when classes are assigned in those slots.
 * 
 * The majority of these settings do not apply to Tier 1 because Tier 1 is the
 * primary class. However, Tier 1 must exist in these Plugin Parameters to
 * provide settings for the Class Change scene.
 *
 * ---
 *
 * General
 * 
 *   Class Tier Name:
 *   - Name of this class tier.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Help Description:
 *   - Help description when this multiclass slot is picked.
 *
 * ---
 *
 * Base Parameter Bonuses
 * 
 *   MaxHP:
 *   MaxMP:
 *   ATK:
 *   DEF:
 *   MAT:
 *   MDF:
 *   AGI:
 *   LUK:
 *   - How little of this class tier's parameter should be added to base stats?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Reward Rates
 * 
 *   EXP:
 *   - How much EXP does a class in this tier earn?
 *   - Does not apply to Tier 1. Only for Battle Rewards.
 * 
 *   Resources:
 *   - Resource rate (ie. CP, JP) earned for this tier.
 *   - Does not apply to Tier 1. Only for Battle Rewards.
 *
 * ---
 *
 * Inherit Traits > Rates
 * 
 *   Element Rates?:
 *   - Inherit the element rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Debuff Rates?:
 *   - Inherit the debuff rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   State Rates?:
 *   - Inherit the state rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   State Resistance?:
 *   - Inherit the state resistances from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Param Rates
 * 
 *   Base-Param Rates?:
 *   - Inherit Base Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   X-Param Rates?:
 *   - Inherit X-Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   S-Param Rates?:
 *   - Inherit S-Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Attack
 * 
 *   Attack Elements?:
 *   - Inherit the attack elements from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Attack States?:
 *   - Inherit the attack states from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Skills
 * 
 *   Added STypes?:
 *   - Inherit the added STypes from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Added Skills?:
 *   - Inherit the added skills from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Equipment
 * 
 *   Equippable Weapons?:
 *   - Inherit the equippable weapons from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Equippable Armors?:
 *   - Inherit the equippable armors from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings for Scene_ClassChange. These adjust the overall layout of
 * the scene as well as how some of the content inside of the windows look. Not
 * all aspects of the scene are fully customizable due to mechanical limits.
 *
 * ---
 *
 * Scene_ClassChange
 * 
 *   Recommended Layout?:
 *   - Use the recommended Menu Layout provided by this plugin?
 * 
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu
 *     scene layout?
 * 
 *   Displayed Resources:
 *   - Select which resources to display in Scene_Class's class lists.
 *   - Non-shared resources appear in the lists up to a limit of 2.
 * 
 *   Confirm Animation ID:
 *   - Play this animation when a class change has been made.
 * 
 *     Primary Offset X:
 *     Primary Offset Y:
 *     Subclass Offset X:
 *     Subclass Offset Y:
 *     - Adjust the offsets for the class change animation.
 * 
 *   Show Class Level?
 *   - Show the class level when displaying classes?
 *   - Used for the windows in the Class Change menu.
 *
 * ---
 *
 * Window_ClassStatus
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Param Font Size:
 *   - The font size used for parameter values.
 * 
 *   Show Menu Portraits?:
 *   - If Main Menu Core is installed, display the Menu Portraits instead of
 *     the actor's face in the status window?
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *   Back Rectangle Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 *   JS: Portrait Upper:
 *   - If Menu Portraits are available, this is code used to draw the upper
 *     data like this in the Status Window.
 * 
 *   JS: Face Upper:
 *   - If faces used used, this is code used to draw the upper data like this
 *     in the Status Window.
 * 
 *   JS: Parameter Lower:
 *   - Code to determine how parameters are drawn in the Status Window.
 *
 * ---
 *
 * Window_ClassTier
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   No Class Assigned:
 *   - Text used when no class is assigned to the slot.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing classes?
 * 
 *   Button Assist Text:
 *   - Text used for the Button Assist Window
 * 
 *   JS: Extra Data:
 *   - Code used to draw extra data if there is enough room.
 *   - This does not apply to basic class data and icons.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Window_ClassList
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Unassign Class:
 *   - Text used for an empty class slot.
 * 
 *     Help Description:
 *     - Help description for unassigning a class.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Class Points Settings
 * ============================================================================
 *
 * Class Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Class Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Class Points:
 *   - Do you want Class Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Class Points an actor can have?
 *   - Use 0 for unlimited Class Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Class Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Class Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Class Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Class Points appears in-game.
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
 *   - How many Class Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Class Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Class Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Class Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much CP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Class Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Class Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawClassPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorClassPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Class Points aren't shared or if you want the Class
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
 * Plugin Parameters: Job Points Settings
 * ============================================================================
 *
 * Job Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Job Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Job Points:
 *   - Do you want Job Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Job Points an actor can have?
 *   - Use 0 for unlimited Job Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Job Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Job Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Job Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Job Points appears in-game.
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
 *   - How many Job Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Job Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Job Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Job Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much JP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Job Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Job Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawJobPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorJobPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Job Points aren't shared or if you want the Job
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
 * Version 1.14: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Window Settings > Show Class Level?
 * **** Show the class level when displaying classes?
 * **** Used for the windows in the Class Change menu.
 * 
 * Version 1.13: May 2, 2022
 * * Bug Fixes!
 * ** Fixed a bug where the element rate traits of subclasses did not apply.
 *    Fix made by Olivia.
 * 
 * Version 1.12: April 14, 2022
 * * Bug Fixes!
 * ** Fixed a problem with certain face index values not registering properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Added a better bitmap loading system for face graphics. Update by Irina.
 * 
 * Version 1.11: October 21, 2021
 * * Bug Fixes!
 * ** Fixed a problem with the <CP: x> notetags not working properly. Fix made
 *    by Irina.
 * 
 * Version 1.10: September 10, 2021
 * * Documentation Update!
 * ** VisuStella MZ Compatibility
 * *** Core Engine VisuStella MZ
 * **** The Core Engine will determine if icons are displayed next to class
 *      names for menus. If you do not wish to use them, then you will need to
 *      disable them via the Plugin Parameters:
 * **** Core Engine > Plugin Parameters > UI Settings > Text Code > Class Names
 * **** Then, set that value to false.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.09: September 3, 2021
 * * Documentation Update!
 * ** Added line "This does not apply to basic class data and icons." for
 *    JS: Extra Data. That JavaScript entry does not affect how class names
 *    are written out.
 * * Feature Update!
 * ** Those using \I[x] in class names will automatically have those converted
 *    into <Icon: x> notetags. Update made by Irina.
 * ** The \I[x] text code will be automatically removed from the tier selection
 *    since it's already in the form of a big icon. Update made by Irina.
 * 
 * Version 1.08: August 13, 2021
 * * Bug Fixes!
 * ** Fixed a bug that pertained to specific subclass traits clearing cache
 *    during a multi-hit attack and causing MaxHP/MaxMP inconsistencies. Fix
 *    made by Arisu.
 * 
 * Version 1.07: April 30, 2021
 * * Bug Fixes!
 * ** Multiclasses with Adjust HP/MP settings should now properly adjust
 *    without the Core Engine installed. Fix made by Arisu.
 * ** Those without Victory Aftermath should no longer experience crashes when
 *    gaining Class Points or Job Points after battle. Fix made by Olivia.
 * ** With the Maintained Levels setting enabled, all unlocked multiclasses
 *    will also acquire skills upon leveling up and not just when switching to
 *    the classes manually. Fix made by Olivia.
 * * Feature Update!
 * ** During battle, equipment types belonging multiclasses will not be
 *    unequipped to prevent odd happenings. Update change by Arisu.
 * 
 * Version 1.06: April 16, 2021
 * * Bug Fixes!
 * ** Map based character sprite changes should now be reflected instantly.
 *    Fix made by Olivia.
 * * Documentation Update!
 * ** Added two more entries to the Clarification section. Updated by Arisu.
 * 
 * Version 1.05: February 12, 2021
 * * Bug Fixes!
 * ** Param bonuses for subclasses are no longer based on the current level but
 *    instead, the level for the subclass. Fix made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: January 8, 2021
 * * Bug Fixes!
 * ** Leveling up should now automatically cache the current class level.
 *    Fix made by Irina.
 * 
 * Version 1.03: January 1, 2021
 * * Bug Fixes!
 * ** General Settings should now have default values when added. If you are
 *    still getting an error when starting a new game, please open up the
 *    General Settings in the Plugin Parameters and hit OK. Fix made by Yanfly.
 * 
 * Version 1.02: December 25, 2020
 * * Bug Fixes!
 * ** Added a refresh after setting up new actors to recalculate any cached
 *    parameter values, skills, and passive states. Fix made by Yanfly.
 * ** Equipment duplication glitch should no longer occur.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Class Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      class icon for the Class Change scene.
 * ** New Plugin Parameters added by Yanfly.
 * *** Window Settings > Scene_ClassChange > Confirm Animation ID > Offset X
 * *** Window Settings > Scene_ClassChange > Confirm Animation ID > Offset Y
 * **** Offsets have been added to let you adjust where the animation occurs
 *      for primary and subclass changing.
 * 
 * Version 1.01: December 18, 2020
 * * Bug Fixes!
 * ** Class specific character graphics no longer default to index 0 when no
 *    index is found or declared by notetags. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added "Clarification" section to the documentation to explain some things
 *    that users might not understand correctly.
 * * Feature Update!
 * ** The button assist text for the "SHIFT" removal is now offset towards the
 *    left a bit for more room. Update made by Yanfly.
 *
 * Version 1.00 Official Release Date: January 11, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockForActor
 * @text Unlock Class: Add For Actor(s)
 * @desc Unlock class(es) for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to unlock class(es) for.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be unlocked.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockForGlobal
 * @text Unlock Class: Add For Global
 * @desc Unlock class(es) for all party members.
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be unlocked.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockRemoveActor
 * @text Unlock Class: Remove From Actor(s)
 * @desc Remove unlock class(es) for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to remove an unlocked class(es) for.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be removed from the unlocked status.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockRemoveGlobal
 * @text Unlock Class: Remove From Global
 * @desc Remove unlock class(es) for all party members.
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be removed from the unlocked status.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassChangeAddRestrictTier
 * @text Change Restriction: Add Tier Restriction
 * @desc Add restrictions to prevent class changing specific tier(s)
 * to target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to restrict class tier(s) for.
 * @default ["1"]
 *
 * @arg Tiers:arraynum
 * @text Tiers(s)
 * @type number[]
 * @desc Select which class tier(s) to restrict changing for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassChangeRemoveRestrictTier
 * @text Change Restriction: Remove Tier Restriction
 * @desc Remove restrictions to allow class changing specific tier(s)
 * for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to remove class tier(s) restrictions for.
 * @default ["1"]
 *
 * @arg Tiers:arraynum
 * @text Tiers(s)
 * @type number[]
 * @desc Select which class tier(s) to remove restrictions for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassChangeActorClass
 * @text Multiclass: Change Actor(s) Multiclass
 * @desc Changes a specific multiclass for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Tier:num
 * @text Tier
 * @type number
 * @min 1
 * @desc Which multiclass tier to change for the target actor(s)?
 * @default 2
 *
 * @arg ClassID:num
 * @text Class ID
 * @type class
 * @desc Which class should go into this multiclass tier slot?
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassRaiseLimit
 * @text Multiclass: Raise Limit for Actor(s)
 * @desc Raise the multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Raise Limit By
 * @type number
 * @min 1
 * @desc Raise the multiclass limit for target actor(s) by this much.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassLowerLimit
 * @text Multiclass: Lower Limit for Actor(s)
 * @desc Lower the multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Reduce Limit By
 * @type number
 * @min 1
 * @desc Lower the multiclass limit for target actor(s) by this much.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassSetLimit
 * @text Multiclass: Set Limit for Actor(s)
 * @desc Set multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Set Limit To
 * @type number
 * @min 1
 * @desc Set multiclass limit for target actor(s) to this much.
 * @default 2
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsGain
 * @text Class Points: Gain
 * @desc The target actor(s) gains Class Points.
 * Gained amounts are affected by Class Point bonus rates.
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
 * @desc Select which Class ID(s) to gain Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsAdd
 * @text Class Points: Add
 * @desc The target actor(s) receives Class Points.
 * Received amounts are NOT affected by Class Point bonus rates.
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
 * @desc Select which Class ID(s) to receive Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsLose
 * @text Class Points: Lose
 * @desc The target actor(s) loses Class Points.
 * Lost amounts are NOT affected by Class Point bonus rates.
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
 * @desc Select which Class ID(s) to lose Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsSet
 * @text Class Points: Set
 * @desc Changes the exact Class Points for the target actor(s).
 * Changed amounts are NOT affected by Class Point bonus rates.
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
 * @desc Select which Class ID(s) to change Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsGain
 * @text Job Points: Gain
 * @desc The target actor(s) gains Job Points.
 * Gained amounts are affected by Job Point bonus rates.
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
 * @desc Select which Class ID(s) to gain Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsAdd
 * @text Job Points: Add
 * @desc The target actor(s) receives Job Points.
 * Received amounts are NOT affected by Job Point bonus rates.
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
 * @desc Select which Class ID(s) to receive Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsLose
 * @text Job Points: Lose
 * @desc The target actor(s) loses Job Points.
 * Lost amounts are NOT affected by Job Point bonus rates.
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
 * @desc Select which Class ID(s) to lose Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsSet
 * @text Job Points: Set
 * @desc Changes the exact Job Points for the target actor(s).
 * Changed amounts are NOT affected by Job Point bonus rates.
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
 * @desc Select which Class ID(s) to change Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableClassChangeSystemMenu
 * @text System: Enable Class Change in Menu?
 * @desc Enables/disables Class Change inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Class Change inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowClassChangeSystemMenu
 * @text System: Show Class Change in Menu?
 * @desc Shows/hides Class Change inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Class Change inside the main menu.
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
 * @param ClassChangeSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param ClassChange
 * @text Class Change
 *
 * @param General:struct
 * @text General Settings
 * @parent ClassChange
 * @type struct<General>
 * @desc General settings for Class Change System.
 * @default {"Basics":"","HelpDescription:json":"\"The %1 class.\"","Icon:num":"96","MaintainLevels:eval":"false","ChangeAdjusHpMp:eval":"true","Unlock":"","AlwaysUnlocked:arraynum":"[\"1\",\"2\",\"3\",\"4\"]","StartingMulticlasses:num":"2"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @parent ClassChange
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ClassChange.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param ChangeClassSound:struct
 * @text Change Class Sound
 * @parent ClassChange
 * @type struct<Sound>
 * @desc Sound effect played when changing classes through Scene_ClassChange.
 * @default {"name:str":"Equip2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param MainMenu:struct
 * @text Menu Access Settings
 * @parent ClassChange
 * @type struct<MenuAccess>
 * @desc Menu Access settings for Class Change.
 * @default {"Name:str":"Class","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 *
 * @param Multiclass:arraystruct
 * @text Multiclass Settings
 * @parent ClassChange
 * @type struct<Multiclass>[]
 * @desc Multiclass settings for this plugin. Each tier allows you to have separate settings.
 * @default ["{\"Name:str\":\"Primary\",\"TextColor:str\":\"6\",\"HelpDescription:json\":\"\\\"Units gain all the benefits of its primary class.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"1.00\",\"paramRate1:num\":\"1.00\",\"paramRate2:num\":\"1.00\",\"paramRate3:num\":\"1.00\",\"paramRate4:num\":\"1.00\",\"paramRate5:num\":\"1.00\",\"paramRate6:num\":\"1.00\",\"paramRate7:num\":\"1.00\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"true\",\"DebuffRates:eval\":\"true\",\"StateRates:eval\":\"true\",\"StateResistance:eval\":\"true\",\"Param\":\"\",\"ParamRates:eval\":\"true\",\"XParamRates:eval\":\"true\",\"SParamRates:eval\":\"true\",\"Attack\":\"\",\"AttackElements:eval\":\"true\",\"AttackStates:eval\":\"true\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"Subclass\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"3rd Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"4th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"5th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"6th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"7th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"8th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"9th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"10th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}"]
 *
 * @param Window:struct
 * @text Window Settings
 * @parent ClassChange
 * @type struct<Window>
 * @desc Window settings for Scene_ClassChange.
 * @default {"Scene":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/right","DisplayedResources:arraystr":"[\"AP\",\"CP\",\"JP\",\"SP\"]","ConfirmAnimationID:num":"120","ConfirmAniPrimaryOffsetX:num":"0","ConfirmAniPrimaryOffsetY:num":"0","ConfirmAniSubclassOffsetX:num":"0","ConfirmAniSubclassOffsetY:num":"0","Window_ClassStatus":"","Window_ClassStatus_BgType:num":"0","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawBackRect:eval":"true","BackRectColor:str":"19","Window_ClassStatus_RectJS:func":"\"const ww = Math.floor(Graphics.boxWidth / 2);\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? 0 : ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth / 2;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorLevel(this._actor, x1, lineHeight * 1);\\nthis.placeBasicGauges(this._actor, x1, lineHeight * 2);\\nthis.drawActorResources(x2, lineHeight * 0, this.innerWidth / 2);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorResources(x, dataY + this.lineHeight() * 1, ImageManager.faceWidth);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Reset\\n    this.resetFontSettings();\\n\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","Window_ClassTier":"","Window_ClassTier_BgType:num":"0","VocabNoClassAssigned:str":"No Class Assigned","ShiftShortcutKey:eval":"true","ShiftButtonAssistText:str":"Unassign","Window_ClassTier_ExtraJS:func":"\"// Declare Arguments\\nconst classID = arguments[0];\\nconst tier = arguments[1];\\nconst settings = arguments[2];\\nconst rect = arguments[3];\\nconst targetClass = $dataClasses[classID];\\nconst wordWrap = Imported.VisuMZ_1_MessageCore;\\nconst removeIcons = true;\\nconst fontSize = 22;\\n\\n// Create Coordinates\\nlet x = rect.x + (this.itemPadding() * 4);\\nlet y = rect.y + (this.lineHeight() * 3.25);\\nlet width = rect.width - (this.itemPadding() * 8);\\n\\n// Skill Type Access\\nif (settings.AddedStypes && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\\n    let stypes = targetClass.traits.\\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_STYPE_ADD).\\n        map(trait => $dataSystem.skillTypes[trait.dataId]).\\n        join(', ');\\n    let text = '\\\\\\\\C[16]%1:\\\\\\\\C[0] \\\\\\\\FS[%3]%2'.format(TextManager.skill, stypes, fontSize || 22);\\n    if (removeIcons) text = text.replace(/\\\\\\\\I\\\\[(\\\\d+)\\\\]/gi, '');\\n    if (wordWrap) text = '<WordWrap>' + text;\\n    this.drawTextEx(text, x, y, width);\\n    y += this.lineHeight();\\n}\\n\\n// Weapon Access\\nif (settings.EquipWeapons && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\\n    let stypes = targetClass.traits.\\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE).\\n        map(trait => $dataSystem.weaponTypes[trait.dataId]).\\n        join(', ');\\n    let text = '\\\\\\\\C[16]%1:\\\\\\\\C[0] \\\\\\\\FS[%3]%2'.format(TextManager.weapon, stypes, fontSize || 22);\\n    if (removeIcons) text = text.replace(/\\\\\\\\I\\\\[(\\\\d+)\\\\]/gi, '');\\n    if (wordWrap) text = '<WordWrap>' + text;\\n    this.drawTextEx(text, x, y, width);\\n    y += this.lineHeight();\\n}\"","Window_ClassTier_RectJS:func":"\"const ww = Graphics.boxWidth - this._statusWindow.width;\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_ClassList":"","Window_ClassList_BgType:num":"0","VocabUnassignClass:str":"Unassign Class","UnassignHelpDescription:json":"\"Remove any classes for this slot.\"","Window_ClassList_RectJS:func":"\"const ww = Graphics.boxWidth - this._statusWindow.width;\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param Resources
 *
 * @param ClassPoints:struct
 * @text Class Points Settings
 * @parent Resources
 * @type struct<ClassPoints>
 * @desc Settings for Class Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"true","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"87","Vocabulary":"","FullText:str":"Class Points","AbbrText:str":"CP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"0","PerLevelUp:str":"100","PerEnemy:str":"0","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"false","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"false","AftermathText:str":"+%1 %2"}
 *
 * @param JobPoints:struct
 * @text Job Points Settings
 * @parent Resources
 * @type struct<JobPoints>
 * @desc Settings for Job Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"false","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"188","Vocabulary":"","FullText:str":"Job Points","AbbrText:str":"JP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"10 + Math.randomInt(10)","PerLevelUp:str":"0","PerEnemy:str":"50 + Math.randomInt(50)","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"true","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"true","AftermathText:str":"+%1 %2"}
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
 * @param Basics
 *
 * @param HelpDescription:json
 * @text Default Help
 * @parent Basics
 * @type note
 * @desc Default help description for all classes.
 * %1 - Class Name
 * @default "The %1 class."
 *
 * @param Icon:num
 * @text Default Icon
 * @parent Basics
 * @desc Default icon used for all classes.
 * @default 96
 *
 * @param MaintainLevels:eval
 * @text Maintain Levels?
 * @parent Basics
 * @type boolean
 * @on Each Class Same Level
 * @off Each Class Separate
 * @desc Make each class have the same level or
 * make each class have their own level?
 * @default false
 *
 * @param ChangeAdjusHpMp:eval
 * @text Change-Adjust HP/MP
 * @parent Basics
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing classes with MaxHP/MaxMP values.
 * @default true
 * 
 * @param Unlock
 * @text Class Unlocking
 *
 * @param AlwaysUnlocked:arraynum
 * @text Always Unlocked
 * @parent Unlock
 * @type class[]
 * @desc Which classes are always unlocked and available?
 * @default ["1","2","3","4"]
 *
 * @param StartingMulticlasses:num
 * @text Starting Multiclasses
 * @parent Unlock
 * @type number
 * @min 1
 * @desc How many classes can actors use at the start by default?
 * Use 1 for just the primary class.
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Access Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuAccess:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Template' option in the Main Menu.
 * @default Class
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Template' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Template' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Multiclass Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Multiclass:
 *
 * @param Name:str
 * @text Class Tier Name
 * @desc Name of this class tier.
 * @default Untitled
 * 
 * @param TextColor:str
 * @text Text Color
 * @parent Name:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param HelpDescription:json
 * @text Help Description
 * @parent Name:str
 * @type note
 * @desc Help description when this multiclass slot is picked.
 * @default "Assign a class to this slot."
 * 
 * @param BaseParameters
 * @text Base Parameter Bonuses
 * 
 * @param paramRate0:num
 * @text MaxHP
 * @parent BaseParameters
 * @desc How little of this class tier's MaxHP should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate1:num
 * @text MaxMP
 * @parent BaseParameters
 * @desc How little of this class tier's MaxMP should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate2:num
 * @text ATK
 * @parent BaseParameters
 * @desc How little of this class tier's ATK should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate3:num
 * @text DEF
 * @parent BaseParameters
 * @desc How little of this class tier's DEF should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate4:num
 * @text MAT
 * @parent BaseParameters
 * @desc How little of this class tier's MAT should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate5:num
 * @text MDF
 * @parent BaseParameters
 * @desc How little of this class tier's MDF should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate6:num
 * @text AGI
 * @parent BaseParameters
 * @desc How little of this class tier's AGI should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate7:num
 * @text LUK
 * @parent BaseParameters
 * @desc How little of this class tier's LUK should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param Rewards
 * @text Reward Rates
 * 
 * @param expRate:num
 * @text EXP
 * @parent Rewards
 * @desc How much EXP does a class in this tier earn?
 * Does not apply to Tier 1. Only for Battle Rewards.
 * @default 0.25
 * 
 * @param resourceRate:num
 * @text Resources
 * @parent Rewards
 * @desc Resource rate (ie. CP, JP) earned for this tier.
 * Does not apply to Tier 1. Only for Battle Rewards.
 * @default 0.25
 * 
 * @param Traits
 * @text Inherit Traits
 * 
 * @param Rates
 * @parent Traits
 *
 * @param ElementRates:eval
 * @text Element Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the element rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param DebuffRates:eval
 * @text Debuff Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the debuff rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param StateRates:eval
 * @text State Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the state rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param StateResistance:eval
 * @text State Resistance?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the state resistances from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Param
 * @text Param Rates
 * @parent Traits
 *
 * @param ParamRates:eval
 * @text Base-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit Base Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param XParamRates:eval
 * @text X-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit X-Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param SParamRates:eval
 * @text S-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit S-Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Attack
 * @parent Traits
 *
 * @param AttackElements:eval
 * @text Attack Elements?
 * @parent Attack
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the attack elements from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param AttackStates:eval
 * @text Attack States?
 * @parent Attack
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the attack states from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Skills
 * @parent Traits
 *
 * @param AddedStypes:eval
 * @text Added STypes?
 * @parent Skills
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the added STypes from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 * @param AddedSkills:eval
 * @text Added Skills?
 * @parent Skills
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the added skills from this class tier?
 * Does not apply to Tier 1.
 * @default true
 * 
 * @param Equip
 * @text Equipment
 * @parent Traits
 *
 * @param EquipWeapons:eval
 * @text Equippable Weapons?
 * @parent Equip
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the equippable weapons from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 * @param EquipArmors:eval
 * @text Equippable Armors?
 * @parent Equip
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the equippable armors from this class tier?
 * Does not apply to Tier 1.
 * @default true
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
 * @default Equip2
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
 * @max 100
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
 * @param Scene
 * @text Scene_ClassChange
 *
 * @param EnableLayout:eval
 * @text Recommended Layout?
 * @parent Scene
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the recommended Menu Layout provided by this plugin?
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent Scene
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 * 
 * @param DisplayedResources:arraystr
 * @text Displayed Resources
 * @parent Scene
 * @type select[]
 * @option AP - Ability Points (Requires VisuMZ_2_SkillLearnSystem)
 * @value AP
 * @option CP - Class Points
 * @value CP
 * @option JP - Job Points
 * @value JP
 * @option SP - Skill Points (Requires VisuMZ_2_SkillLearnSystem)
 * @value SP
 * @desc Select which resources to display in Scene_Class's class
 * lists. Non-shared (limit: 2) resources appear in the lists.
 * @default ["AP","CP","JP","SP"]
 *
 * @param ConfirmAnimationID:num
 * @text Confirm Animation ID
 * @parent Scene
 * @type animation
 * @desc Play this animation when a class change has been made.
 * @default 120
 *
 * @param ConfirmAniPrimaryOffsetX:num
 * @text Primary Offset X
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset X of primary class animations.
 * Negative for left. Positive for right.
 * @default 0
 *
 * @param ConfirmAniPrimaryOffsetY:num
 * @text Primary Offset Y
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset Y of primary class animations.
 * Negative for up. Positive for down.
 * @default 0
 *
 * @param ConfirmAniSubclassOffsetX:num
 * @text Subclass Offset X
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset X of subclass animations.
 * Negative for left. Positive for right.
 * @default 0
 *
 * @param ConfirmAniSubclassOffsetY:num
 * @text Subclass Offset Y
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset Y of subclass animations.
 * Negative for up. Positive for down.
 * @default 0
 *
 * @param ShowClassLevel:eval
 * @text Show Class Level?
 * @parent Scene
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the class level when displaying classes?
 * Used for the windows in the Class Change menu.
 * @default true
 *
 * @param Window_ClassStatus
 *
 * @param Window_ClassStatus_BgType:num
 * @text Background Type
 * @parent Window_ClassStatus
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
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent Window_ClassStatus
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent Window_ClassStatus
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent Window_ClassStatus
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Window_ClassStatus_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassStatus
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.floor(Graphics.boxWidth / 2);\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? 0 : ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent Window_ClassStatus
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth / 2;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorLevel(this._actor, x1, lineHeight * 1);\nthis.placeBasicGauges(this._actor, x1, lineHeight * 2);\nthis.drawActorResources(x2, lineHeight * 0, this.innerWidth / 2);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent Window_ClassStatus
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorResources(x, dataY + this.lineHeight() * 1, ImageManager.faceWidth);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent Window_ClassStatus
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Reset\n    this.resetFontSettings();\n\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param Window_ClassTier
 *
 * @param Window_ClassTier_BgType:num
 * @text Background Type
 * @parent Window_ClassTier
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
 * @param VocabNoClassAssigned:str
 * @text No Class Assigned
 * @parent Window_ClassTier
 * @desc Text used when no class is assigned to the slot.
 * @default No Class Assigned
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent Window_ClassTier
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing classes?
 * @default true
 *
 * @param ShiftButtonAssistText:str
 * @text Button Assist Text
 * @parent ShiftShortcutKey:eval
 * @desc Text used for the Button Assist Window
 * @default Unassign
 *
 * @param Window_ClassTier_ExtraJS:func
 * @text JS: Extra Data
 * @parent Window_ClassTier
 * @type note
 * @desc Code used to draw extra data if there is enough room.
 * This does not apply to basic class data and icons.
 * @default "// Declare Arguments\nconst classID = arguments[0];\nconst tier = arguments[1];\nconst settings = arguments[2];\nconst rect = arguments[3];\nconst targetClass = $dataClasses[classID];\nconst wordWrap = Imported.VisuMZ_1_MessageCore;\nconst removeIcons = true;\nconst fontSize = 22;\n\n// Create Coordinates\nlet x = rect.x + (this.itemPadding() * 4);\nlet y = rect.y + (this.lineHeight() * 3.25);\nlet width = rect.width - (this.itemPadding() * 8);\n\n// Skill Type Access\nif (settings.AddedStypes && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\n    let stypes = targetClass.traits.\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_STYPE_ADD).\n        map(trait => $dataSystem.skillTypes[trait.dataId]).\n        join(', ');\n    let text = '\\\\C[16]%1:\\\\C[0] \\\\FS[%3]%2'.format(TextManager.skill, stypes, fontSize || 22);\n    if (removeIcons) text = text.replace(/\\\\I\\[(\\d+)\\]/gi, '');\n    if (wordWrap) text = '<WordWrap>' + text;\n    this.drawTextEx(text, x, y, width);\n    y += this.lineHeight();\n}\n\n// Weapon Access\nif (settings.EquipWeapons && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\n    let stypes = targetClass.traits.\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE).\n        map(trait => $dataSystem.weaponTypes[trait.dataId]).\n        join(', ');\n    let text = '\\\\C[16]%1:\\\\C[0] \\\\FS[%3]%2'.format(TextManager.weapon, stypes, fontSize || 22);\n    if (removeIcons) text = text.replace(/\\\\I\\[(\\d+)\\]/gi, '');\n    if (wordWrap) text = '<WordWrap>' + text;\n    this.drawTextEx(text, x, y, width);\n    y += this.lineHeight();\n}"
 *
 * @param Window_ClassTier_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassTier
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._statusWindow.width;\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param Window_ClassList
 *
 * @param Window_ClassList_BgType:num
 * @text Background Type
 * @parent Window_ClassList
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
 * @param VocabUnassignClass:str
 * @text Unassign Class
 * @parent Window_ClassList
 * @desc Text used for an empty class slot.
 * @default Unassign Class
 *
 * @param UnassignHelpDescription:json
 * @text Help Description
 * @parent VocabUnassignClass:str
 * @type note
 * @desc Help description for unassigning a class.
 * @default "Remove any classes for this slot."
 *
 * @param Window_ClassList_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassList
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._statusWindow.width;\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Class Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ClassPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Class Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Class Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Class Points an actor can have?
 * Use 0 for unlimited Class Points.
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
 * @desc Do you wish to show Class Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Class Points?
 * @default 87
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Class Points appears in-game.
 * @default Class Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Class Points appears in-game.
 * @default CP
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
 * @desc How many Class Points should an actor gain per action?
 * You may use code.
 * @default 0
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Class Points should an actor gain per level up?
 * You may use code.
 * @default 100
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Class Points should an actor gain per enemy?
 * You may use code.
 * @default 0
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Class Points from
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
 * @desc Show how much CP an actor has earned in battle during the
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
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Class Points as
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
 * Job Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~JobPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Job Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Job Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Job Points an actor can have?
 * Use 0 for unlimited Job Points.
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
 * @desc Do you wish to show Job Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Job Points?
 * @default 188
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Job Points appears in-game.
 * @default Job Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Job Points appears in-game.
 * @default JP
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
 * @desc How many Job Points should an actor gain per action?
 * You may use code.
 * @default 10 + Math.randomInt(10)
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Job Points should an actor gain per level up?
 * You may use code.
 * @default 0
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Job Points should an actor gain per enemy?
 * You may use code.
 * @default 50 + Math.randomInt(50)
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Job Points from
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
 * @desc Show how much JP an actor has earned in battle during the
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
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Job Points as
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
//=============================================================================

const _0x25643f=_0x536c;(function(_0x176c2c,_0x284c57){const _0xf2cc31=_0x536c,_0x342343=_0x176c2c();while(!![]){try{const _0x5f13d9=parseInt(_0xf2cc31(0x18d))/0x1+parseInt(_0xf2cc31(0x3ba))/0x2+parseInt(_0xf2cc31(0x134))/0x3*(-parseInt(_0xf2cc31(0x20f))/0x4)+-parseInt(_0xf2cc31(0xb2))/0x5+-parseInt(_0xf2cc31(0xd4))/0x6*(parseInt(_0xf2cc31(0x107))/0x7)+parseInt(_0xf2cc31(0x196))/0x8*(-parseInt(_0xf2cc31(0x3dc))/0x9)+parseInt(_0xf2cc31(0x1e3))/0xa;if(_0x5f13d9===_0x284c57)break;else _0x342343['push'](_0x342343['shift']());}catch(_0x48f5dd){_0x342343['push'](_0x342343['shift']());}}}(_0x1981,0x5cb01));var label='ClassChangeSystem',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x25643f(0x33f)](function(_0x241f43){const _0x2bc392=_0x25643f;return _0x241f43['status']&&_0x241f43[_0x2bc392(0x1bc)][_0x2bc392(0xf5)]('['+label+']');})[0x0];VisuMZ[label][_0x25643f(0x193)]=VisuMZ[label][_0x25643f(0x193)]||{},VisuMZ['ConvertParams']=function(_0x309103,_0x9ac00d){const _0x347ecf=_0x25643f;for(const _0x1a7c50 in _0x9ac00d){if('XHIgy'===_0x347ecf(0x123))_0x35b88d=_0x3b2670(_0x2a1ef0['$1']);else{if(_0x1a7c50[_0x347ecf(0x187)](/(.*):(.*)/i)){if(_0x347ecf(0x38d)!=='joqjY'){const _0x3d8acc=String(RegExp['$1']),_0x1888e4=String(RegExp['$2'])[_0x347ecf(0x101)]()['trim']();let _0xd36fd2,_0x46878b,_0x47aef4;switch(_0x1888e4){case'NUM':_0xd36fd2=_0x9ac00d[_0x1a7c50]!==''?Number(_0x9ac00d[_0x1a7c50]):0x0;break;case _0x347ecf(0x29f):_0x46878b=_0x9ac00d[_0x1a7c50]!==''?JSON[_0x347ecf(0x1b7)](_0x9ac00d[_0x1a7c50]):[],_0xd36fd2=_0x46878b['map'](_0x1a4af9=>Number(_0x1a4af9));break;case _0x347ecf(0x289):_0xd36fd2=_0x9ac00d[_0x1a7c50]!==''?eval(_0x9ac00d[_0x1a7c50]):null;break;case'ARRAYEVAL':_0x46878b=_0x9ac00d[_0x1a7c50]!==''?JSON[_0x347ecf(0x1b7)](_0x9ac00d[_0x1a7c50]):[],_0xd36fd2=_0x46878b['map'](_0x385e8d=>eval(_0x385e8d));break;case _0x347ecf(0xfa):_0xd36fd2=_0x9ac00d[_0x1a7c50]!==''?JSON['parse'](_0x9ac00d[_0x1a7c50]):'';break;case _0x347ecf(0x2c9):_0x46878b=_0x9ac00d[_0x1a7c50]!==''?JSON[_0x347ecf(0x1b7)](_0x9ac00d[_0x1a7c50]):[],_0xd36fd2=_0x46878b[_0x347ecf(0x402)](_0x5d8ea8=>JSON[_0x347ecf(0x1b7)](_0x5d8ea8));break;case'FUNC':_0xd36fd2=_0x9ac00d[_0x1a7c50]!==''?new Function(JSON[_0x347ecf(0x1b7)](_0x9ac00d[_0x1a7c50])):new Function(_0x347ecf(0xac));break;case _0x347ecf(0x2dc):_0x46878b=_0x9ac00d[_0x1a7c50]!==''?JSON['parse'](_0x9ac00d[_0x1a7c50]):[],_0xd36fd2=_0x46878b[_0x347ecf(0x402)](_0x245d48=>new Function(JSON[_0x347ecf(0x1b7)](_0x245d48)));break;case _0x347ecf(0x34e):_0xd36fd2=_0x9ac00d[_0x1a7c50]!==''?String(_0x9ac00d[_0x1a7c50]):'';break;case'ARRAYSTR':_0x46878b=_0x9ac00d[_0x1a7c50]!==''?JSON[_0x347ecf(0x1b7)](_0x9ac00d[_0x1a7c50]):[],_0xd36fd2=_0x46878b[_0x347ecf(0x402)](_0x40b12f=>String(_0x40b12f));break;case _0x347ecf(0x266):_0x47aef4=_0x9ac00d[_0x1a7c50]!==''?JSON['parse'](_0x9ac00d[_0x1a7c50]):{},_0xd36fd2=VisuMZ[_0x347ecf(0x13a)]({},_0x47aef4);break;case _0x347ecf(0x1dc):_0x46878b=_0x9ac00d[_0x1a7c50]!==''?JSON[_0x347ecf(0x1b7)](_0x9ac00d[_0x1a7c50]):[],_0xd36fd2=_0x46878b[_0x347ecf(0x402)](_0x5081cf=>VisuMZ['ConvertParams']({},JSON['parse'](_0x5081cf)));break;default:continue;}_0x309103[_0x3d8acc]=_0xd36fd2;}else _0x1ac946[_0x347ecf(0x242)][_0x347ecf(0x38f)][_0x347ecf(0x2c8)](this),this[_0x347ecf(0x15d)]();}}}return _0x309103;},(_0x5508c4=>{const _0x583eb1=_0x25643f,_0x956318=_0x5508c4[_0x583eb1(0x285)];for(const _0x3546fb of dependencies){if(!Imported[_0x3546fb]){alert(_0x583eb1(0x3a8)[_0x583eb1(0x323)](_0x956318,_0x3546fb)),SceneManager['exit']();break;}}const _0x1350da=_0x5508c4[_0x583eb1(0x1bc)];if(_0x1350da[_0x583eb1(0x187)](/\[Version[ ](.*?)\]/i)){const _0x537de8=Number(RegExp['$1']);if(_0x537de8!==VisuMZ[label]['version']){if(_0x583eb1(0x273)!==_0x583eb1(0x273))return this[_0x583eb1(0xd0)](_0x12a05b(_0x52bf87));else alert(_0x583eb1(0x2f9)[_0x583eb1(0x323)](_0x956318,_0x537de8)),SceneManager[_0x583eb1(0x2cb)]();}}if(_0x1350da[_0x583eb1(0x187)](/\[Tier[ ](\d+)\]/i)){const _0x2a90e4=Number(RegExp['$1']);_0x2a90e4<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x583eb1(0x323)](_0x956318,_0x2a90e4,tier)),SceneManager['exit']()):_0x583eb1(0x29a)!==_0x583eb1(0x29a)?this[_0x583eb1(0x13b)]=_0x2d113e:tier=Math[_0x583eb1(0x34b)](_0x2a90e4,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x583eb1(0x193)],_0x5508c4[_0x583eb1(0x213)]);})(pluginData),PluginManager['registerCommand'](pluginData['name'],'ClassUnlockForActor',_0x1205f2=>{const _0x33ff31=_0x25643f;VisuMZ[_0x33ff31(0x13a)](_0x1205f2,_0x1205f2);const _0x4bdf57=_0x1205f2[_0x33ff31(0x32e)][_0x33ff31(0x402)](_0x3d2334=>$gameActors[_0x33ff31(0xef)](_0x3d2334)),_0x50754d=_0x1205f2[_0x33ff31(0x3ab)];for(const _0x5a3e56 of _0x4bdf57){if(!_0x5a3e56)continue;for(const _0x3e9bf0 of _0x50754d){_0x5a3e56[_0x33ff31(0x1d0)](_0x3e9bf0);}}}),PluginManager[_0x25643f(0x178)](pluginData['name'],_0x25643f(0x3b8),_0x3efa01=>{const _0x4fb36f=_0x25643f;VisuMZ[_0x4fb36f(0x13a)](_0x3efa01,_0x3efa01);const _0x2ddc40=_0x3efa01[_0x4fb36f(0x3ab)];for(const _0x361922 of _0x2ddc40){$gameParty[_0x4fb36f(0x1d0)](_0x361922);}}),PluginManager['registerCommand'](pluginData[_0x25643f(0x285)],_0x25643f(0xd7),_0x44402e=>{const _0x1b80bc=_0x25643f;VisuMZ[_0x1b80bc(0x13a)](_0x44402e,_0x44402e);const _0x53335f=_0x44402e[_0x1b80bc(0x32e)][_0x1b80bc(0x402)](_0x130d1d=>$gameActors['actor'](_0x130d1d)),_0x5b3e41=_0x44402e[_0x1b80bc(0x3ab)];for(const _0x2339d7 of _0x53335f){if(_0x1b80bc(0x30a)===_0x1b80bc(0xee))_0x1bb386=this[_0x1b80bc(0x28c)](_0x53576e);else{if(!_0x2339d7)continue;for(const _0x46af73 of _0x5b3e41){if(_0x1b80bc(0x1da)===_0x1b80bc(0x292))return this[_0x1b80bc(0x145)](_0x561844,_0x480878);else _0x2339d7[_0x1b80bc(0x3b7)](_0x46af73);}}}}),PluginManager[_0x25643f(0x178)](pluginData[_0x25643f(0x285)],'ClassUnlockRemoveGlobal',_0x135d34=>{const _0xc8d960=_0x25643f;VisuMZ[_0xc8d960(0x13a)](_0x135d34,_0x135d34);const _0x361565=_0x135d34[_0xc8d960(0x3ab)];for(const _0x2d1c75 of _0x361565){$gameParty['removeUnlockedClass'](_0x2d1c75);}}),PluginManager[_0x25643f(0x178)](pluginData[_0x25643f(0x285)],_0x25643f(0x18e),_0x27047f=>{const _0x576368=_0x25643f;VisuMZ[_0x576368(0x13a)](_0x27047f,_0x27047f);const _0x2308f0=_0x27047f['Actors'][_0x576368(0x402)](_0xb9fbd9=>$gameActors[_0x576368(0xef)](_0xb9fbd9)),_0x5c2abf=_0x27047f[_0x576368(0x347)];for(const _0x4a245a of _0x2308f0){if(_0x576368(0xa9)==='fZZoh'){if(this['isActor']())this[_0x576368(0x175)]='StateResistance';let _0x372c39=_0x53e749[_0x576368(0x22e)][_0x576368(0x2a2)][_0x576368(0x2c8)](this);if(this[_0x576368(0x198)]())this[_0x576368(0x175)]=_0x19cfff;return _0x372c39;}else{if(!_0x4a245a)continue;for(const _0x228ac5 of _0x5c2abf){_0x4a245a['addClassChangeTierRestriction'](_0x228ac5);}}}}),PluginManager['registerCommand'](pluginData[_0x25643f(0x285)],'ClassChangeRemoveRestrictTier',_0x47504f=>{const _0x4c3713=_0x25643f;VisuMZ['ConvertParams'](_0x47504f,_0x47504f);const _0x110202=_0x47504f['Actors'][_0x4c3713(0x402)](_0x3c2d77=>$gameActors[_0x4c3713(0xef)](_0x3c2d77)),_0x4d75b5=_0x47504f[_0x4c3713(0x347)];for(const _0x456fce of _0x110202){if(!_0x456fce)continue;for(const _0x43804b of _0x4d75b5){_0x456fce[_0x4c3713(0x152)](_0x43804b);}}}),PluginManager[_0x25643f(0x178)](pluginData[_0x25643f(0x285)],_0x25643f(0x261),_0x441261=>{const _0xeb3cf3=_0x25643f;VisuMZ[_0xeb3cf3(0x13a)](_0x441261,_0x441261);const _0x21d778=_0x441261[_0xeb3cf3(0x32e)]['map'](_0x177b4a=>$gameActors['actor'](_0x177b4a)),_0x1918c8=_0x441261[_0xeb3cf3(0x27f)],_0x139d22=_0x441261[_0xeb3cf3(0x1bf)];for(const _0x5baafe of _0x21d778){if(_0xeb3cf3(0x25f)===_0xeb3cf3(0x25f)){if(!_0x5baafe)continue;_0x5baafe[_0xeb3cf3(0x183)](_0x139d22,_0x1918c8);}else _0x2634c1>0x0&&(_0x51f32d*=this[_0xeb3cf3(0x2e5)]()),this[_0xeb3cf3(0x3f9)](_0x52c632,_0x23e173);}}),PluginManager[_0x25643f(0x178)](pluginData['name'],_0x25643f(0x12d),_0x5b9500=>{const _0x343be0=_0x25643f;VisuMZ[_0x343be0(0x13a)](_0x5b9500,_0x5b9500);const _0x138183=_0x5b9500[_0x343be0(0x32e)][_0x343be0(0x402)](_0x57ff99=>$gameActors[_0x343be0(0xef)](_0x57ff99)),_0x528897=_0x5b9500['Limit'];for(const _0x20b10e of _0x138183){if(!_0x20b10e)continue;_0x20b10e[_0x343be0(0x3ac)](_0x528897);}}),PluginManager[_0x25643f(0x178)](pluginData[_0x25643f(0x285)],_0x25643f(0x12b),_0x51c128=>{const _0x3ad0f9=_0x25643f;VisuMZ[_0x3ad0f9(0x13a)](_0x51c128,_0x51c128);const _0xd26289=_0x51c128[_0x3ad0f9(0x32e)]['map'](_0x5df4fa=>$gameActors[_0x3ad0f9(0xef)](_0x5df4fa)),_0x3b523f=_0x51c128['Limit'];for(const _0x16791a of _0xd26289){if(_0x3ad0f9(0x340)===_0x3ad0f9(0x340)){if(!_0x16791a)continue;_0x16791a[_0x3ad0f9(0x17a)](_0x3b523f);}else this['_multiclasses'][_0x3e8380]=_0x37bd6a(_0x232d3e);}}),PluginManager[_0x25643f(0x178)](pluginData['name'],_0x25643f(0xf6),_0x1d03c1=>{const _0x709118=_0x25643f;VisuMZ[_0x709118(0x13a)](_0x1d03c1,_0x1d03c1);const _0x23076a=_0x1d03c1['Actors'][_0x709118(0x402)](_0x6a168f=>$gameActors['actor'](_0x6a168f)),_0x14d5f7=_0x1d03c1[_0x709118(0x37c)];for(const _0x27fb98 of _0x23076a){if(_0x709118(0xb0)===_0x709118(0x338))this[_0x709118(0x100)]=_0x290b10(_0xea4936['$1']);else{if(!_0x27fb98)continue;_0x27fb98[_0x709118(0x17e)](_0x14d5f7);}}}),PluginManager[_0x25643f(0x178)](pluginData['name'],'ClassPointsGain',_0x1881ee=>{const _0x3854f2=_0x25643f;VisuMZ[_0x3854f2(0x13a)](_0x1881ee,_0x1881ee);const _0x13dca2=_0x1881ee['Actors']['map'](_0x3dcd1=>$gameActors['actor'](_0x3dcd1)),_0xe2f929=_0x1881ee[_0x3854f2(0x3ab)],_0x364343=_0x1881ee[_0x3854f2(0x1b3)];for(const _0x3d7acf of _0x13dca2){if(!_0x3d7acf)continue;for(const _0x21a8c0 of _0xe2f929){if(_0x3854f2(0xa6)===_0x3854f2(0xa6))_0x3d7acf[_0x3854f2(0x221)](_0x364343,_0x21a8c0);else return _0x35d592[_0x3854f2(0x2cc)]&&_0x59ab55[_0x3854f2(0x1bc)][_0x3854f2(0xf5)]('['+_0x4fe1a2+']');}}}),PluginManager[_0x25643f(0x178)](pluginData[_0x25643f(0x285)],_0x25643f(0x19b),_0x3926e3=>{const _0x2b0e33=_0x25643f;VisuMZ[_0x2b0e33(0x13a)](_0x3926e3,_0x3926e3);const _0x28bd77=_0x3926e3[_0x2b0e33(0x32e)][_0x2b0e33(0x402)](_0xbfa2bb=>$gameActors[_0x2b0e33(0xef)](_0xbfa2bb)),_0x48169c=_0x3926e3[_0x2b0e33(0x3ab)],_0x2fad6f=_0x3926e3[_0x2b0e33(0x1b3)];for(const _0x9ab268 of _0x28bd77){if(!_0x9ab268)continue;for(const _0x3520c7 of _0x48169c){_0x9ab268[_0x2b0e33(0x3f9)](_0x2fad6f,_0x3520c7);}}}),PluginManager[_0x25643f(0x178)](pluginData[_0x25643f(0x285)],_0x25643f(0x11c),_0x37d6b9=>{const _0x282ae8=_0x25643f;VisuMZ[_0x282ae8(0x13a)](_0x37d6b9,_0x37d6b9);const _0x5b648b=_0x37d6b9['Actors'][_0x282ae8(0x402)](_0x38b6b0=>$gameActors['actor'](_0x38b6b0)),_0x1e5711=_0x37d6b9[_0x282ae8(0x3ab)],_0x313940=_0x37d6b9[_0x282ae8(0x1b3)];for(const _0x4c921b of _0x5b648b){if('AAHbN'===_0x282ae8(0xc9)){const _0x320e9e=this[_0x282ae8(0x388)](_0x5b879d);return _0x320e9e?_0x320e9e['id']:0x0;}else{if(!_0x4c921b)continue;for(const _0x5ac42b of _0x1e5711){'xqoxM'===_0x282ae8(0x382)?_0x4c921b[_0x282ae8(0x2ad)](_0x313940,_0x5ac42b):this[_0x282ae8(0x315)]();}}}}),PluginManager['registerCommand'](pluginData[_0x25643f(0x285)],_0x25643f(0x305),_0x1dbc99=>{const _0x658569=_0x25643f;VisuMZ[_0x658569(0x13a)](_0x1dbc99,_0x1dbc99);const _0x2bd01c=_0x1dbc99[_0x658569(0x32e)][_0x658569(0x402)](_0x24fcb6=>$gameActors['actor'](_0x24fcb6)),_0xc6e619=_0x1dbc99[_0x658569(0x3ab)],_0x2dcacd=_0x1dbc99[_0x658569(0x1b3)];for(const _0x207c24 of _0x2bd01c){if(_0x658569(0x2b5)!==_0x658569(0x2b5)){const _0x4e894c=new _0x96612b(),_0x5b8644=_0x56bc75[_0x658569(0x22e)][_0x658569(0x193)][_0x658569(0x208)];if(_0x2600a5<=0x1){const _0x372da5=this[_0x658569(0x3f1)];_0x4e894c['x']=_0x372da5['x']+_0x227e5f[_0x658569(0x185)](_0x372da5[_0x658569(0x1e4)]/0x2),_0x4e894c['y']=_0x372da5['y']+_0x252ac0[_0x658569(0x185)](_0x372da5['height']/0x2),_0x4e894c['x']+=_0x5b8644[_0x658569(0x3a4)]||0x0,_0x4e894c['y']+=_0x5b8644['ConfirmAniPrimaryOffsetY']||0x0;}else{const _0x354fd3=this[_0x658569(0x364)],_0x39adda=_0x354fd3[_0x658569(0x2c3)](_0x354fd3[_0x658569(0x3d7)]()),_0x24ce79=_0x354fd3[_0x658569(0x105)]||0x0;_0x4e894c['x']=_0x354fd3['x']+_0x39adda['x']+_0x5f0f3f[_0x658569(0x185)](_0x39adda[_0x658569(0x1e4)]/0x2)+_0x24ce79,_0x4e894c['y']=_0x354fd3['y']+_0x39adda['y']+_0x5e6bab['round'](_0x39adda[_0x658569(0x3cb)]/0x2)+_0x24ce79,_0x4e894c['x']+=_0x5b8644[_0x658569(0x2dd)]||0x0,_0x4e894c['y']+=_0x5b8644[_0x658569(0x136)]||0x0;}return _0x4e894c['x']+=this[_0x658569(0x263)]['x'],_0x4e894c['y']+=this[_0x658569(0x263)]['y'],_0x4e894c;}else{if(!_0x207c24)continue;for(const _0x30eba9 of _0xc6e619){_0x658569(0x1af)===_0x658569(0x2c6)?_0x429709=_0x1834a4[_0x658569(0x2ee)](_0x56cc77):_0x207c24[_0x658569(0x25c)](_0x2dcacd,_0x30eba9);}}}}),PluginManager[_0x25643f(0x178)](pluginData[_0x25643f(0x285)],_0x25643f(0xe3),_0x53bc9f=>{const _0x46bf87=_0x25643f;VisuMZ[_0x46bf87(0x13a)](_0x53bc9f,_0x53bc9f);const _0x119838=_0x53bc9f[_0x46bf87(0x32e)]['map'](_0x449c93=>$gameActors[_0x46bf87(0xef)](_0x449c93)),_0x2394ab=_0x53bc9f[_0x46bf87(0x3ab)],_0x34c395=_0x53bc9f['Points'];for(const _0x21e28d of _0x119838){if(!_0x21e28d)continue;for(const _0x534b3b of _0x2394ab){_0x21e28d[_0x46bf87(0x290)](_0x34c395,_0x534b3b);}}}),PluginManager['registerCommand'](pluginData[_0x25643f(0x285)],_0x25643f(0x308),_0x426e5a=>{const _0xfae4ee=_0x25643f;VisuMZ[_0xfae4ee(0x13a)](_0x426e5a,_0x426e5a);const _0x4f9674=_0x426e5a[_0xfae4ee(0x32e)][_0xfae4ee(0x402)](_0x82f01e=>$gameActors[_0xfae4ee(0xef)](_0x82f01e)),_0x2b487a=_0x426e5a['Classes'],_0x543b68=_0x426e5a[_0xfae4ee(0x1b3)];for(const _0x2ae855 of _0x4f9674){if(_0xfae4ee(0x3c7)===_0xfae4ee(0x3c7)){if(!_0x2ae855)continue;for(const _0x350b0a of _0x2b487a){_0x2ae855[_0xfae4ee(0x117)](_0x543b68,_0x350b0a);}}else this['addCommand']('',_0xfae4ee(0x339),!![],null);}}),PluginManager['registerCommand'](pluginData[_0x25643f(0x285)],_0x25643f(0xd8),_0xd599a8=>{const _0x1f5dfa=_0x25643f;VisuMZ[_0x1f5dfa(0x13a)](_0xd599a8,_0xd599a8);const _0x352dde=_0xd599a8['Actors'][_0x1f5dfa(0x402)](_0x77eb5b=>$gameActors[_0x1f5dfa(0xef)](_0x77eb5b)),_0x5c0b7b=_0xd599a8[_0x1f5dfa(0x3ab)],_0x2a104a=_0xd599a8['Points'];for(const _0x357041 of _0x352dde){if(!_0x357041)continue;for(const _0x2b3eea of _0x5c0b7b){_0x1f5dfa(0x227)==='RiCUK'?_0x3dcca4[_0x1f5dfa(0x3b7)](_0x437575):_0x357041['loseJobPoints'](_0x2a104a,_0x2b3eea);}}}),PluginManager['registerCommand'](pluginData['name'],_0x25643f(0x329),_0x46b17d=>{const _0x16c114=_0x25643f;VisuMZ[_0x16c114(0x13a)](_0x46b17d,_0x46b17d);const _0x3a3fbf=_0x46b17d['Actors'][_0x16c114(0x402)](_0x20d6ee=>$gameActors[_0x16c114(0xef)](_0x20d6ee)),_0x367734=_0x46b17d[_0x16c114(0x3ab)],_0x530631=_0x46b17d[_0x16c114(0x1b3)];for(const _0x845624 of _0x3a3fbf){if(!_0x845624)continue;for(const _0x223d72 of _0x367734){if(_0x16c114(0x272)==='KZdXy')return 0x0;else _0x845624['setJobPoints'](_0x530631,_0x223d72);}}}),PluginManager['registerCommand'](pluginData['name'],_0x25643f(0x35c),_0x2c0d47=>{const _0x517869=_0x25643f;VisuMZ[_0x517869(0x13a)](_0x2c0d47,_0x2c0d47),$gameSystem['setMainMenuClassChangeSystemEnabled'](_0x2c0d47[_0x517869(0x269)]);}),PluginManager[_0x25643f(0x178)](pluginData[_0x25643f(0x285)],'SystemShowClassChangeSystemMenu',_0x36f0d5=>{const _0x4fc64a=_0x25643f;VisuMZ['ConvertParams'](_0x36f0d5,_0x36f0d5),$gameSystem[_0x4fc64a(0x385)](_0x36f0d5[_0x4fc64a(0x15e)]);}),VisuMZ[_0x25643f(0x22e)]['functionName']=function(){const _0x22526d=_0x25643f;try{}catch(_0x3cb1a7){if('pyDie'!=='oEHrH'){if($gameTemp[_0x22526d(0x3ea)]())console['log'](_0x3cb1a7);}else this[_0x22526d(0x2e1)](_0x4028f0['paramchangeTextColor'](_0x1fe910)),_0x5d2031=(_0x36626e>0x0?_0x22526d(0x26a):_0x22526d(0x286))['format'](_0x9292b),this[_0x22526d(0x401)](_0x13a2c4,_0x38a23e+_0x16590,_0x55fc6f,_0x25f7d3,_0x22526d(0x1b5));}},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x222)]=Scene_Boot[_0x25643f(0x242)][_0x25643f(0x1ab)],Scene_Boot[_0x25643f(0x242)]['onDatabaseLoaded']=function(){const _0x3c34d4=_0x25643f;VisuMZ['ClassChangeSystem']['Scene_Boot_onDatabaseLoaded'][_0x3c34d4(0x2c8)](this),this[_0x3c34d4(0x3cc)]();},Scene_Boot['prototype']['process_VisuMZ_ClassChangeSystem']=function(){const _0x5780fe=_0x25643f;this[_0x5780fe(0x1ee)]();},VisuMZ[_0x25643f(0x22e)]['RegExp']={'StartingClassPoints':/<STARTING (?:CLASS POINTS|CP):[ ](.*)>/i,'StartClassClassPoints':/<CLASS (.*) STARTING (?:CLASS POINTS|CP):[ ](.*)>/gi,'UserGainClassPoints':/<(?:CLASS POINTS|CP|USER CLASS POINTS|USER CP) GAIN:[ ](.*)>/i,'TargetGainClassPoints':/<TARGET (?:CLASS POINTS|CP) GAIN:[ ](.*)>/i,'EnemyClassPoints':/<(?:CLASS POINTS|CP):[ ](.*)>/i,'ClassPointsRate':/<(?:CLASS POINTS|CP) RATE:[ ](\d+)([%％])>/i,'StartingJobPoints':/<STARTING (?:JOB POINTS|JP):[ ](.*)>/i,'StartClassJobPoints':/<CLASS (.*) STARTING (?:JOB POINTS|JP):[ ](.*)>/gi,'UserGainJobPoints':/<(?:JOB POINTS|JP|USER JOB POINTS|USER JP) GAIN:[ ](.*)>/i,'TargetGainJobPoints':/<TARGET (?:JOB POINTS|JP) GAIN:[ ](.*)>/i,'EnemyJobPoints':/<(?:JOB POINTS|JP):[ ](.*)>/i,'JobPointsRate':/<(?:JOB POINTS|JP) RATE:[ ](\d+)([%％])>/i,'ClassDescription':/<(?:HELP|DESCRIPTION|HELP DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|DESCRIPTION|HELP DESCRIPTION)>/i,'ClassIcon':/<(?:ICON|ICON INDEX):[ ](\d+)>/i,'classPicture':/<(?:CLASS|CLASS CHANGE) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'ClassFaceName':/<(.*)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'ClassCharaName':/<(.*)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'ClassBattlerName':/<(.*)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'ClassMenuPortrait':/<(.*)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'ClassBattlePortrait':/<(.*)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'ActorUnlockedClasses':/<(?:UNLOCK|UNLOCKED) (?:CLASS|CLASSES):[ ](.*)>/gi,'AutoUnlockRequirements':/<(?:AUTO|AUTOMATIC) UNLOCK REQUIREMENTS>\s*([\s\S]*)\s*<\/(?:AUTO|AUTOMATIC) UNLOCK REQUIREMENTS>/i,'StartingMulticlasses':/<STARTING MULTICLASSES:[ ](\d+)>/i,'StartingClassTier':/<STARTING TIER[ ](\d+)[ ]CLASS:[ ](.*)>/gi,'RestrictClassChangeTier':/<RESTRICT CLASS CHANGE (?:TIER|TIERS):[ ](.*)>/gi,'TierOnlyClass':/<CLASS CHANGE (?:TIER|TIERS) ONLY:[ ](.*)>/gi,'ClassChangeAnimation':/<CLASS CHANGE ANIMATION:[ ](\d+)>/i},Scene_Boot[_0x25643f(0x242)][_0x25643f(0x1ee)]=function(){const _0x98c86d=_0x25643f;if(VisuMZ['ParseAllNotetags'])return;for(const _0x5b01e0 of $dataActors){if(_0x98c86d(0x386)!=='KTQZr'){if(!_0x5b01e0)continue;ImageManager[_0x98c86d(0x33a)](_0x5b01e0);}else _0x426a7a[_0x98c86d(0x1d6)]();}for(const _0x9f5900 of $dataClasses){if(!_0x9f5900)continue;VisuMZ[_0x98c86d(0x22e)][_0x98c86d(0x3e2)](_0x9f5900);}},VisuMZ[_0x25643f(0x22e)]['JS']={},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x23b)]=function(_0x328fcd,_0xc2e944,_0x4d9952){const _0x5186a8=_0x25643f,_0xc5733e=_0x328fcd['note'];if(_0xc5733e[_0x5186a8(0x187)](_0x4d9952)){if(_0x5186a8(0x23d)!=='CqinQ')this[_0x5186a8(0x192)](_0x9d88f7,_0x255074);else{const _0x11c48c=String(RegExp['$1']),_0x80509e=_0x5186a8(0x11f)[_0x5186a8(0x323)](_0x11c48c),_0x10a934=VisuMZ['ClassChangeSystem']['createKeyJS'](_0x328fcd,_0xc2e944);VisuMZ[_0x5186a8(0x22e)]['JS'][_0x10a934]=new Function(_0x80509e);}}},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x259)]=function(_0x3f39cb,_0x61f4a3){const _0x249629=_0x25643f;let _0x4b0c12='';if($dataActors[_0x249629(0xf5)](_0x3f39cb))_0x4b0c12=_0x249629(0x389)[_0x249629(0x323)](_0x3f39cb['id'],_0x61f4a3);if($dataClasses[_0x249629(0xf5)](_0x3f39cb))_0x4b0c12=_0x249629(0x3e5)[_0x249629(0x323)](_0x3f39cb['id'],_0x61f4a3);if($dataSkills[_0x249629(0xf5)](_0x3f39cb))_0x4b0c12='Skill-%1-%2'[_0x249629(0x323)](_0x3f39cb['id'],_0x61f4a3);if($dataItems[_0x249629(0xf5)](_0x3f39cb))_0x4b0c12='Item-%1-%2'[_0x249629(0x323)](_0x3f39cb['id'],_0x61f4a3);if($dataWeapons[_0x249629(0xf5)](_0x3f39cb))_0x4b0c12=_0x249629(0xe7)[_0x249629(0x323)](_0x3f39cb['id'],_0x61f4a3);if($dataArmors['includes'](_0x3f39cb))_0x4b0c12=_0x249629(0x18b)[_0x249629(0x323)](_0x3f39cb['id'],_0x61f4a3);if($dataEnemies[_0x249629(0xf5)](_0x3f39cb))_0x4b0c12=_0x249629(0x3df)[_0x249629(0x323)](_0x3f39cb['id'],_0x61f4a3);if($dataStates[_0x249629(0xf5)](_0x3f39cb))_0x4b0c12=_0x249629(0x1ec)[_0x249629(0x323)](_0x3f39cb['id'],_0x61f4a3);return _0x4b0c12;},VisuMZ['ClassChangeSystem'][_0x25643f(0x28f)]=VisuMZ[_0x25643f(0x28f)],VisuMZ[_0x25643f(0x28f)]=function(_0x1eba37){const _0x120462=_0x25643f;VisuMZ[_0x120462(0x22e)]['ParseActorNotetags'][_0x120462(0x2c8)](this,_0x1eba37),ImageManager['registerActorClassImages'](_0x1eba37);},VisuMZ['ClassChangeSystem'][_0x25643f(0x395)]=VisuMZ[_0x25643f(0x395)],VisuMZ['ParseClassNotetags']=function(_0x3da194){const _0x2f7aff=_0x25643f;VisuMZ['ClassChangeSystem'][_0x2f7aff(0x395)][_0x2f7aff(0x2c8)](this,_0x3da194),VisuMZ[_0x2f7aff(0x22e)]['Parse_Notetags_Basic'](_0x3da194),VisuMZ[_0x2f7aff(0x22e)]['Parse_ClassIcons'](_0x3da194);},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x3e2)]=function(_0x462ee8){const _0x3c1312=_0x25643f;_0x462ee8[_0x3c1312(0x384)]=ImageManager[_0x3c1312(0x309)]||0x0,_0x462ee8[_0x3c1312(0x1bc)]=TextManager[_0x3c1312(0x104)][_0x3c1312(0x323)](_0x462ee8['name']||'');const _0x43cfb8=VisuMZ[_0x3c1312(0x22e)][_0x3c1312(0x287)],_0x25d7bf=_0x462ee8[_0x3c1312(0x1f7)];_0x25d7bf[_0x3c1312(0x187)](_0x43cfb8[_0x3c1312(0x377)])&&(_0x462ee8[_0x3c1312(0x384)]=Number(RegExp['$1'])),_0x25d7bf[_0x3c1312(0x187)](_0x43cfb8[_0x3c1312(0x11e)])&&(_0x462ee8['description']=String(RegExp['$1']));},VisuMZ['ClassChangeSystem'][_0x25643f(0x111)]=function(_0x33a7b1){const _0x4c0806=_0x25643f;if(_0x33a7b1[_0x4c0806(0x285)][_0x4c0806(0x187)](/\\I\[(\d+)\]/i)){if('TTcsV'===_0x4c0806(0x3b6))_0x33a7b1[_0x4c0806(0x384)]=Number(RegExp['$1']);else{let _0x5c0589=_0x10dbee[_0x4c0806(0x242)][_0x4c0806(0x318)][_0x4c0806(0x2c8)](this);if(this[_0x4c0806(0x3aa)]){const _0x259a5c=this[_0x4c0806(0x3aa)]['totalMulticlass']()||0x1;_0x5c0589=_0x32defc['max'](_0x5c0589,this[_0x4c0806(0x147)]/_0x259a5c);}return _0x5c0589;}}if(Imported['VisuMZ_0_CoreEngine']){if(VisuMZ[_0x4c0806(0x1a5)]['Settings']['UI'][_0x4c0806(0x16b)]){const _0x1b6677='\x5cI[%1]%2';_0x33a7b1[_0x4c0806(0x285)]=_0x1b6677[_0x4c0806(0x323)](_0x33a7b1[_0x4c0806(0x384)],_0x33a7b1['name']);}else'LLZFd'!==_0x4c0806(0xad)?_0x4eb5ce=_0x532b12||this['currentClass']()['id']:(_0x33a7b1['name']=_0x33a7b1[_0x4c0806(0x285)][_0x4c0806(0x1a6)](/\x1I\[(\d+)\]/gi,''),_0x33a7b1[_0x4c0806(0x285)]=_0x33a7b1[_0x4c0806(0x285)][_0x4c0806(0x1a6)](/\\I\[(\d+)\]/gi,''));}},DataManager[_0x25643f(0x3d2)]=function(_0xe621fe){const _0x40582d=_0x25643f;if(!_0xe621fe)return[];let _0x3e49a4=[];return _0x3e49a4=_0x3e49a4[_0x40582d(0x3d0)](_0xe621fe[_0x40582d(0x223)]()['map'](_0x2ebfc1=>_0x2ebfc1['id'])),_0x3e49a4=_0x3e49a4['concat'](_0xe621fe[_0x40582d(0x39a)]()),_0x3e49a4=_0x3e49a4[_0x40582d(0x3d0)]($gameParty[_0x40582d(0x39a)]()),_0x3e49a4=_0x3e49a4['concat'](VisuMZ[_0x40582d(0x22e)][_0x40582d(0x193)][_0x40582d(0x294)][_0x40582d(0x129)]),_0x3e49a4=_0x3e49a4[_0x40582d(0x33f)]((_0x430f99,_0x4f725c,_0x14de10)=>_0x14de10[_0x40582d(0x399)](_0x430f99)===_0x4f725c),_0x3e49a4['sort'](function(_0x13f4be,_0x2dbfad){return _0x13f4be-_0x2dbfad;}),_0x3e49a4['map'](_0x1f3057=>$dataClasses[_0x1f3057])[_0x40582d(0x306)](null);},DataManager[_0x25643f(0x1cf)]=function(_0x347b1c){const _0x235414=_0x25643f,_0x2d7931=[],_0x5ad558=DataManager['getActorUnlockedClasses'](_0x347b1c);for(const _0x1eadc6 of $dataClasses){if(_0x235414(0x2f4)!=='FiejV'){if(!_0x1eadc6)continue;if(_0x5ad558['includes'](_0x1eadc6))continue;this[_0x235414(0x2e4)](_0x347b1c,_0x1eadc6)&&_0x2d7931['push'](_0x1eadc6['id']);}else{_0x2391a6=(_0x48d391(_0x512f84)||'')[_0x235414(0x124)]();const _0x4cc9f5=/^\d+$/['test'](_0x1a7e29);_0x4cc9f5?this[_0x235414(0x20d)][_0x235414(0x151)](_0x4c5e3e(_0x311fbb)):this[_0x235414(0x20d)][_0x235414(0x151)](_0x5a3ac5[_0x235414(0x2ee)](_0x30df44));}}return _0x2d7931;},DataManager['isClassAutoUnlockRequirementsMet']=function(_0x278361,_0x1bb3c7){const _0x4b6bd4=_0x25643f;if(!_0x278361)return![];if(!_0x1bb3c7)return![];const _0x1b0280=VisuMZ[_0x4b6bd4(0x22e)][_0x4b6bd4(0x287)],_0x5b717=_0x1bb3c7[_0x4b6bd4(0x1f7)];if(_0x5b717[_0x4b6bd4(0x187)](_0x1b0280[_0x4b6bd4(0x15a)])){if(_0x4b6bd4(0x26b)==='FlPgh'){if(this[_0x4b6bd4(0x2ba)]())return _0x428203[_0x4b6bd4(0x400)];return _0x204f7f[_0x4b6bd4(0x242)]['buttonAssistText3']['call'](this);}else{const _0x171e1f=String(RegExp['$1'])[_0x4b6bd4(0x1ca)](/[\r\n]+/);for(const _0x17f38d of _0x171e1f){let _0x2703bd=0x0;if(_0x17f38d[_0x4b6bd4(0x187)](/(.*):[ ](.*)/i)){if(_0x4b6bd4(0x3d5)!==_0x4b6bd4(0x3d5))_0x1c804f+=0x0;else{const _0x1ab181=String(RegExp['$1']),_0x346e2a=String(RegExp['$2']);if(_0x1ab181[_0x4b6bd4(0x187)](/CLASS[ ](\d+)/i))_0x2703bd=Number(RegExp['$1']);else{if(_0x1ab181[_0x4b6bd4(0x187)](/CLASS[ ](.*)/i))_0x4b6bd4(0x2a5)===_0x4b6bd4(0x2a5)?_0x2703bd=this[_0x4b6bd4(0x2ee)](RegExp['$1']):_0x1285dc!==''?this[_0x4b6bd4(0x1ac)]=_0x2206b6:this[_0x4b6bd4(0x1ac)]=_0x581672;else{if(_0x1ab181[_0x4b6bd4(0x187)](/\b(?:AP|CP|JP|SP)\b/i)){if(_0x4b6bd4(0x207)!==_0x4b6bd4(0x207)){if(this[_0x4b6bd4(0xa5)]===_0x46e81c)this[_0x4b6bd4(0x2ed)]();_0x48c2e4-=0x1;if(_0x1f9189<=0x0&&_0x62406<=0x0)return;this[_0x4b6bd4(0x1d0)](_0x1556ac);const _0x122f37=this['_multiclasses'][_0x4b6bd4(0xba)];for(let _0x56ad55=0x0;_0x56ad55<_0x122f37;_0x56ad55++){this['_multiclasses'][_0x56ad55]===_0x358f42&&(this[_0x4b6bd4(0xa5)][_0x56ad55]=0x0);}this[_0x4b6bd4(0xa5)][0x0]=this[_0x4b6bd4(0x1c0)]()['id'];if(_0x5b5299<=0x0){this[_0x4b6bd4(0xd2)](_0x36da19);return;}const _0x319f8c=_0x54c4a6[_0x4b6bd4(0xea)](this);_0x319f8c['_tempActor']=!![],this['_multiclasses'][_0x75ae28]=_0x252abb,this[_0x4b6bd4(0x1cc)](),this[_0x4b6bd4(0x3d3)](),this[_0x4b6bd4(0x240)](_0x319f8c),this[_0x4b6bd4(0x1cc)]();}else{const _0x5f2b79=_0x1ab181[_0x4b6bd4(0x101)]()[_0x4b6bd4(0x124)](),_0x218d3d=Number(_0x346e2a)||0x0;if(Imported[_0x4b6bd4(0x1c2)]){if('AOOwt'===_0x4b6bd4(0xab))this['_actor']=_0x31791b,this[_0x4b6bd4(0x3d3)]();else{if(_0x5f2b79==='AP'){const _0x35816e=_0x278361[_0x4b6bd4(0x3d9)]();if(_0x35816e<_0x218d3d)return![];}else{if(_0x5f2b79==='SP'){if(_0x4b6bd4(0x1e6)!=='YZCKZ'){const _0x1bc768=_0x278361['getSkillPoints']();if(_0x1bc768<_0x218d3d)return![];}else _0x386bf1=_0x322a7f||this[_0x4b6bd4(0x1c0)]()['id'];}}}}if(Imported[_0x4b6bd4(0x394)]){if(_0x4b6bd4(0x1fe)===_0x4b6bd4(0x1fe)){if(_0x5f2b79==='CP'){if(_0x4b6bd4(0x2b1)!=='vtzyL'){const _0x5c18dd=_0x5ca256(_0x3ea074['$1']);_0x5c18dd<_0x402051?(_0x38eafe(_0x4b6bd4(0x3fc)[_0x4b6bd4(0x323)](_0x10d562,_0x5c18dd,_0x33159e)),_0x3fed73[_0x4b6bd4(0x2cb)]()):_0x56611c=_0x402063[_0x4b6bd4(0x34b)](_0x5c18dd,_0x431442);}else{const _0x5583f2=_0x278361[_0x4b6bd4(0x1fc)]();if(_0x5583f2<_0x218d3d)return![];}}else{if(_0x5f2b79==='JP'){if(_0x4b6bd4(0x2c7)!==_0x4b6bd4(0x2c7)){if(_0x565794['isPlaytest']())_0x55d190[_0x4b6bd4(0x354)](_0x264b12);return 0x0;}else{const _0x419872=_0x278361['getJobPoints']();if(_0x419872<_0x218d3d)return![];}}}}else this['_tp']=(this[_0x4b6bd4(0x3ad)]+_0x4068c7)['clamp'](0x0,this[_0x4b6bd4(0x31e)]());}}}}}if(_0x346e2a['match'](/LEVEL[ ](\d+)/i)){const _0x43e9db=Number(RegExp['$1']);if(_0x278361[_0x4b6bd4(0x25d)](_0x2703bd)<_0x43e9db)return![];}else{if(_0x346e2a[_0x4b6bd4(0x187)](/(\d+)[ ]CP/i)){if(_0x4b6bd4(0xd6)===_0x4b6bd4(0xfb)){this['changeClass'](_0x418bf2);return;}else{const _0x4c7cc5=Number(RegExp['$1']);if(_0x278361[_0x4b6bd4(0x1fc)](_0x2703bd)<_0x4c7cc5)return![];}}else{if(_0x346e2a[_0x4b6bd4(0x187)](/(\d+)[ ]JP/i)){const _0x4ddb15=Number(RegExp['$1']);if(_0x278361['getJobPoints'](_0x2703bd)<_0x4ddb15)return![];}else{if(_0x346e2a[_0x4b6bd4(0x187)](/(\d+)[ ]AP/i)){if(_0x4b6bd4(0x2ac)!==_0x4b6bd4(0x2e0)){if(!Imported[_0x4b6bd4(0x1c2)])continue;const _0x36b1b1=Number(RegExp['$1']);if(_0x278361[_0x4b6bd4(0x3d9)](_0x2703bd)<_0x36b1b1)return![];}else return _0xaa56a[_0x4b6bd4(0x24f)]&&_0x327571[_0x4b6bd4(0x1a5)][_0x4b6bd4(0x193)]['UI']['LvExpGauge'];}else{if(_0x346e2a['match'](/(\d+)[ ]SP/i)){if(_0x4b6bd4(0x239)!==_0x4b6bd4(0x342)){const _0x30f9ab=Number(RegExp['$1']);if(_0x278361[_0x4b6bd4(0x33e)](_0x2703bd)<_0x30f9ab)return![];}else{const _0x4c4741='\x5cI[%1]%2';_0x49f7f2['name']=_0x4c4741[_0x4b6bd4(0x323)](_0x372c48[_0x4b6bd4(0x384)],_0x369472[_0x4b6bd4(0x285)]);}}}}}}}}}return!![];}}return![];},DataManager[_0x25643f(0x22b)]=function(_0x57b8cb){const _0xa7523f=_0x25643f;if(!_0x57b8cb)return[];const _0x12d603=VisuMZ[_0xa7523f(0x22e)][_0xa7523f(0x287)],_0x11e876=_0x57b8cb[_0xa7523f(0x1f7)];let _0x7bf195=[];const _0xef6c5f=_0x11e876[_0xa7523f(0x187)](_0x12d603[_0xa7523f(0x23f)]);if(_0xef6c5f){if(_0xa7523f(0x132)===_0xa7523f(0x19f)){if(this['subject']()['isActor']()&&_0x39ef7c[_0xa7523f(0x187)](_0x3ab853['UserGainJobPoints'])){const _0x1fef09=_0xd70c6c(_0x112898['$1']);this[_0xa7523f(0x226)]()[_0xa7523f(0x290)](_0x1fef09);}else this['applyJobPoints']();if(_0x673450['isActor']()&&_0x2be980[_0xa7523f(0x187)](_0x156987[_0xa7523f(0x106)])){const _0x59080d=_0x5988de(_0x285cda['$1']);_0x3114dc[_0xa7523f(0x290)](_0x59080d);}}else{for(const _0x1cb7c0 of _0xef6c5f){if(!_0x1cb7c0)continue;_0x1cb7c0[_0xa7523f(0x187)](_0x12d603['TierOnlyClass']);const _0x55c0b7=String(RegExp['$1'])[_0xa7523f(0x1ca)](',')[_0xa7523f(0x402)](_0x2ee6f0=>Number(_0x2ee6f0))[_0xa7523f(0x306)](null)[_0xa7523f(0x306)](undefined)[_0xa7523f(0x306)](NaN);_0x7bf195=_0x7bf195[_0xa7523f(0x3d0)](_0x55c0b7);}return _0x7bf195;}}else{const _0x3565a5=VisuMZ[_0xa7523f(0x22e)][_0xa7523f(0x193)][_0xa7523f(0x19d)][_0xa7523f(0xba)];return Array[_0xa7523f(0x3eb)]({'length':_0x3565a5},(_0x57d836,_0x42b526)=>_0x42b526+0x1);}},DataManager[_0x25643f(0x2ee)]=function(_0xcf979b){const _0x30bdb0=_0x25643f;_0xcf979b=_0xcf979b['toUpperCase']()['trim'](),this['_classIDs']=this['_classIDs']||{};if(this[_0x30bdb0(0x12c)][_0xcf979b])return this[_0x30bdb0(0x12c)][_0xcf979b];for(const _0x4f7291 of $dataClasses){if(!_0x4f7291)continue;let _0x1f8926=_0x4f7291['name'];_0x1f8926=_0x1f8926[_0x30bdb0(0x1a6)](/\x1I\[(\d+)\]/gi,''),_0x1f8926=_0x1f8926[_0x30bdb0(0x1a6)](/\\I\[(\d+)\]/gi,''),this[_0x30bdb0(0x12c)][_0x1f8926['toUpperCase']()['trim']()]=_0x4f7291['id'];}return this[_0x30bdb0(0x12c)][_0xcf979b]||0x0;},ImageManager[_0x25643f(0x1b6)]=VisuMZ[_0x25643f(0x22e)][_0x25643f(0x193)][_0x25643f(0x3b9)][_0x25643f(0x39d)],ImageManager[_0x25643f(0xf3)]=VisuMZ[_0x25643f(0x22e)][_0x25643f(0x193)]['JobPoints']['Icon'],ImageManager['classIcon']=VisuMZ['ClassChangeSystem'][_0x25643f(0x193)][_0x25643f(0x294)][_0x25643f(0x39d)],ImageManager['actorClassFaceName']={},ImageManager[_0x25643f(0x1b4)]={},ImageManager['actorClassCharacterName']={},ImageManager['actorClassCharacterIndex']={},ImageManager[_0x25643f(0xd5)]={},ImageManager['actorClassMenuPortrait']={},ImageManager[_0x25643f(0x378)]={},ImageManager[_0x25643f(0x33a)]=function(_0x1b242f){const _0xdfdf6e=_0x25643f;if(!_0x1b242f)return;const _0x17fc8d=VisuMZ[_0xdfdf6e(0x22e)][_0xdfdf6e(0x287)],_0x19ccda=_0x1b242f[_0xdfdf6e(0x1f7)],_0x202c67=_0x1b242f['id'],_0x461504=_0x19ccda[_0xdfdf6e(0x187)](_0x17fc8d[_0xdfdf6e(0x115)]);if(_0x461504){if(_0xdfdf6e(0x397)===_0xdfdf6e(0x397))for(const _0x194ef8 of _0x461504){if('APico'!==_0xdfdf6e(0x35a)){if(!_0x194ef8)continue;_0x194ef8[_0xdfdf6e(0x187)](_0x17fc8d[_0xdfdf6e(0x115)]);const _0x24e51b=String(RegExp['$1']),_0x54e46d=String(RegExp['$2'])[_0xdfdf6e(0x124)](),_0x454eb8=Number(RegExp['$3']);let _0x37f8d6=0x0;if(_0x24e51b[_0xdfdf6e(0x187)](/CLASS[ ](\d+)/i))_0x37f8d6=Number(RegExp['$1']);else _0x24e51b['match'](/CLASS[ ](.*)/i)?_0x37f8d6=DataManager[_0xdfdf6e(0x2ee)](RegExp['$1']):_0xdfdf6e(0x181)!=='Ahnqt'?this[_0xdfdf6e(0x1a8)]():_0x37f8d6=DataManager[_0xdfdf6e(0x2ee)](_0x24e51b);if(_0x37f8d6>0x0){const _0x2918c0='Actor-%1-Class-%2'[_0xdfdf6e(0x323)](_0x202c67,_0x37f8d6);ImageManager[_0xdfdf6e(0x358)][_0x2918c0]=_0x54e46d,ImageManager['actorClassFaceIndex'][_0x2918c0]=_0x454eb8;}}else return this[_0xdfdf6e(0x145)](_0x500a0b,_0x6af841+0x1);}else _0x475a65=0x0;}const _0x2eaaf3=_0x19ccda[_0xdfdf6e(0x187)](_0x17fc8d[_0xdfdf6e(0x343)]);if(_0x2eaaf3)for(const _0x6aff2 of _0x2eaaf3){if(_0xdfdf6e(0x29c)==='fMSSr'){const _0x161d8b=this['_cache']||{};this[_0xdfdf6e(0x355)](_0x511857[_0xdfdf6e(0x217)]),this[_0xdfdf6e(0x141)]=_0x161d8b;}else{if(!_0x6aff2)continue;_0x6aff2['match'](_0x17fc8d[_0xdfdf6e(0x343)]);const _0x1a4649=String(RegExp['$1']),_0x2d9936=String(RegExp['$2'])['trim'](),_0x3f81b4=Number(RegExp['$3']);let _0x170ef1=0x0;if(_0x1a4649[_0xdfdf6e(0x187)](/CLASS[ ](\d+)/i))_0x170ef1=Number(RegExp['$1']);else _0x1a4649[_0xdfdf6e(0x187)](/CLASS[ ](.*)/i)?_0x170ef1=DataManager['getClassIdWithName'](RegExp['$1']):'EdfYj'!=='XGhqL'?_0x170ef1=DataManager[_0xdfdf6e(0x2ee)](_0x1a4649):this['_rewards'][_0xdfdf6e(0x16e)]=_0x432c8a[_0xdfdf6e(0x199)]();if(_0x170ef1>0x0){if(_0xdfdf6e(0x37f)!=='evAQp')_0x39acee[_0xdfdf6e(0x2ad)](_0x40b243,_0x177a7c);else{const _0x2a998e='Actor-%1-Class-%2'[_0xdfdf6e(0x323)](_0x202c67,_0x170ef1);ImageManager['actorClassCharacterName'][_0x2a998e]=_0x2d9936,ImageManager[_0xdfdf6e(0x166)][_0x2a998e]=_0x3f81b4;}}}}const _0x2b5229=_0x19ccda['match'](_0x17fc8d[_0xdfdf6e(0x3f5)]);if(_0x2b5229)for(const _0x9680d3 of _0x2b5229){if(!_0x9680d3)continue;_0x9680d3[_0xdfdf6e(0x187)](_0x17fc8d['ClassBattlerName']);const _0x126741=String(RegExp['$1']),_0x574712=String(RegExp['$2'])[_0xdfdf6e(0x124)]();let _0xd0e9c2=0x0;if(_0x126741[_0xdfdf6e(0x187)](/CLASS[ ](\d+)/i))_0xd0e9c2=Number(RegExp['$1']);else _0x126741['match'](/CLASS[ ](.*)/i)?_0xdfdf6e(0x205)!==_0xdfdf6e(0x205)?(_0x2506ca[_0xdfdf6e(0x285)]=_0x1cdc18[_0xdfdf6e(0x285)][_0xdfdf6e(0x1a6)](/\x1I\[(\d+)\]/gi,''),_0xc95523[_0xdfdf6e(0x285)]=_0x42684a[_0xdfdf6e(0x285)][_0xdfdf6e(0x1a6)](/\\I\[(\d+)\]/gi,'')):_0xd0e9c2=DataManager[_0xdfdf6e(0x2ee)](RegExp['$1']):'xoBTm'===_0xdfdf6e(0x367)?_0xd0e9c2=DataManager[_0xdfdf6e(0x2ee)](_0x126741):_0x1383a7=0x0;if(_0xd0e9c2>0x0){const _0x1562f2=_0xdfdf6e(0x31a)[_0xdfdf6e(0x323)](_0x202c67,_0xd0e9c2);ImageManager[_0xdfdf6e(0xd5)][_0x1562f2]=_0x574712;}}const _0x30a209=_0x19ccda['match'](_0x17fc8d[_0xdfdf6e(0x130)]);if(_0x30a209)for(const _0xd1937 of _0x30a209){if(!_0xd1937)continue;_0xd1937[_0xdfdf6e(0x187)](_0x17fc8d[_0xdfdf6e(0x130)]);const _0xaa4c07=String(RegExp['$1']),_0x44b808=String(RegExp['$2'])[_0xdfdf6e(0x124)]();let _0x1686b1=0x0;if(_0xaa4c07['match'](/CLASS[ ](\d+)/i))_0x1686b1=Number(RegExp['$1']);else _0xaa4c07[_0xdfdf6e(0x187)](/CLASS[ ](.*)/i)?_0x1686b1=DataManager[_0xdfdf6e(0x2ee)](RegExp['$1']):_0x1686b1=DataManager[_0xdfdf6e(0x2ee)](_0xaa4c07);if(_0x1686b1>0x0){const _0x5e4117=_0xdfdf6e(0x31a)[_0xdfdf6e(0x323)](_0x202c67,_0x1686b1);ImageManager[_0xdfdf6e(0x393)][_0x5e4117]=_0x44b808;}}const _0x286ec4=_0x19ccda[_0xdfdf6e(0x187)](_0x17fc8d[_0xdfdf6e(0x3a1)]);if(_0x286ec4){if('AJsQt'===_0xdfdf6e(0x38b))for(const _0x25fc42 of _0x286ec4){if(!_0x25fc42)continue;_0x25fc42[_0xdfdf6e(0x187)](_0x17fc8d[_0xdfdf6e(0x3a1)]);const _0x1325a5=String(RegExp['$1']),_0x46bec4=String(RegExp['$2'])[_0xdfdf6e(0x124)]();let _0x5b6d7e=0x0;if(_0x1325a5['match'](/CLASS[ ](\d+)/i))_0xdfdf6e(0x26f)===_0xdfdf6e(0x26f)?_0x5b6d7e=Number(RegExp['$1']):_0x40c95f[_0xdfdf6e(0x183)](0x0,this['_tier']);else{if(_0x1325a5[_0xdfdf6e(0x187)](/CLASS[ ](.*)/i))_0x5b6d7e=DataManager[_0xdfdf6e(0x2ee)](RegExp['$1']);else{if(_0xdfdf6e(0x17d)!==_0xdfdf6e(0xe6))_0x5b6d7e=DataManager[_0xdfdf6e(0x2ee)](_0x1325a5);else{if(this[_0xdfdf6e(0x198)]())this[_0xdfdf6e(0x175)]=_0xdfdf6e(0x14b);let _0x3aa8a4=_0x247f24[_0xdfdf6e(0x22e)]['Game_BattlerBase_elementRate'][_0xdfdf6e(0x2c8)](this,_0x4b41bb);if(this[_0xdfdf6e(0x198)]())this[_0xdfdf6e(0x175)]=_0x3c519f;return _0x3aa8a4;}}}if(_0x5b6d7e>0x0){const _0x320c62=_0xdfdf6e(0x31a)[_0xdfdf6e(0x323)](_0x202c67,_0x5b6d7e);ImageManager[_0xdfdf6e(0x378)][_0x320c62]=_0x46bec4;}}else return _0x516e1c['classChange_multiclass_ShiftHelp'];}},ImageManager['getActorClassFaceName']=function(_0x3e5626){const _0x310d9b=_0x25643f;if(!_0x3e5626)return'';const _0x5e1e6c=_0x310d9b(0x31a)[_0x310d9b(0x323)](_0x3e5626[_0x310d9b(0x1c8)](),_0x3e5626[_0x310d9b(0x1c0)]()['id']);return ImageManager[_0x310d9b(0x358)][_0x5e1e6c]??'';},ImageManager[_0x25643f(0x2d2)]=function(_0x4de4cd){const _0x13e684=_0x25643f;if(!_0x4de4cd)return undefined;const _0x45b672=_0x13e684(0x31a)[_0x13e684(0x323)](_0x4de4cd[_0x13e684(0x1c8)](),_0x4de4cd[_0x13e684(0x1c0)]()['id']);return ImageManager[_0x13e684(0x1b4)][_0x45b672]??undefined;},ImageManager['getActorClassCharacterName']=function(_0x3b79ac){const _0x10e2ae=_0x25643f;if(!_0x3b79ac)return'';const _0xb83422=_0x10e2ae(0x31a)[_0x10e2ae(0x323)](_0x3b79ac[_0x10e2ae(0x1c8)](),_0x3b79ac[_0x10e2ae(0x1c0)]()['id']);return ImageManager[_0x10e2ae(0x3c1)][_0xb83422]??'';},ImageManager[_0x25643f(0x298)]=function(_0x5d592e){const _0x409941=_0x25643f;if(!_0x5d592e)return undefined;const _0x13f52b='Actor-%1-Class-%2'[_0x409941(0x323)](_0x5d592e[_0x409941(0x1c8)](),_0x5d592e[_0x409941(0x1c0)]()['id']);return ImageManager[_0x409941(0x166)][_0x13f52b]??undefined;},ImageManager[_0x25643f(0x23e)]=function(_0x5431ca){const _0x2844f8=_0x25643f;if(!_0x5431ca)return'';const _0x4dbea5=_0x2844f8(0x31a)['format'](_0x5431ca['actorId'](),_0x5431ca[_0x2844f8(0x1c0)]()['id']);return ImageManager['actorClassBattlerName'][_0x4dbea5]??'';},ImageManager['getActorClassMenuPortrait']=function(_0x8226a8){const _0xdcc382=_0x25643f;if(!_0x8226a8)return'';const _0x34b9ec=_0xdcc382(0x31a)[_0xdcc382(0x323)](_0x8226a8[_0xdcc382(0x1c8)](),_0x8226a8[_0xdcc382(0x1c0)]()['id']);return ImageManager[_0xdcc382(0x393)][_0x34b9ec]??'';},ImageManager[_0x25643f(0x1ea)]=function(_0xba416c){const _0x1c5c92=_0x25643f;if(!_0xba416c)return'';const _0x5a6ef2='Actor-%1-Class-%2'[_0x1c5c92(0x323)](_0xba416c[_0x1c5c92(0x1c8)](),_0xba416c[_0x1c5c92(0x1c0)]()['id']);return ImageManager[_0x1c5c92(0x378)][_0x5a6ef2]??'';},SoundManager[_0x25643f(0x1d6)]=function(_0x2a8c3a){const _0x439aad=_0x25643f;AudioManager[_0x439aad(0x374)](VisuMZ[_0x439aad(0x22e)][_0x439aad(0x193)][_0x439aad(0x2fe)]);},TextManager[_0x25643f(0x36f)]=VisuMZ[_0x25643f(0x22e)][_0x25643f(0x193)]['MainMenu'][_0x25643f(0x32d)],TextManager[_0x25643f(0x12a)]=VisuMZ[_0x25643f(0x22e)][_0x25643f(0x193)][_0x25643f(0x3b9)][_0x25643f(0x26e)],TextManager[_0x25643f(0x279)]=VisuMZ[_0x25643f(0x22e)][_0x25643f(0x193)][_0x25643f(0x3b9)]['AbbrText'],TextManager['classPointsFmt']=VisuMZ['ClassChangeSystem'][_0x25643f(0x193)][_0x25643f(0x3b9)]['TextFmt'],TextManager['jobPointsFull']=VisuMZ['ClassChangeSystem']['Settings'][_0x25643f(0x268)][_0x25643f(0x26e)],TextManager[_0x25643f(0x333)]=VisuMZ['ClassChangeSystem'][_0x25643f(0x193)][_0x25643f(0x268)][_0x25643f(0x328)],TextManager[_0x25643f(0x19a)]=VisuMZ[_0x25643f(0x22e)][_0x25643f(0x193)][_0x25643f(0x268)]['TextFmt'],TextManager[_0x25643f(0x104)]=VisuMZ[_0x25643f(0x22e)][_0x25643f(0x193)][_0x25643f(0x294)]['HelpDescription'],TextManager['classChange_multiclass_noClass']=VisuMZ[_0x25643f(0x22e)][_0x25643f(0x193)][_0x25643f(0x208)][_0x25643f(0x1f9)],TextManager[_0x25643f(0x400)]=VisuMZ[_0x25643f(0x22e)][_0x25643f(0x193)][_0x25643f(0x208)][_0x25643f(0x31d)],TextManager['classChange_multiclass_remove']=VisuMZ[_0x25643f(0x22e)][_0x25643f(0x193)][_0x25643f(0x208)]['VocabUnassignClass'],TextManager[_0x25643f(0x30b)]=VisuMZ[_0x25643f(0x22e)][_0x25643f(0x193)]['Window'][_0x25643f(0x1e1)],ColorManager[_0x25643f(0x1e9)]=function(_0x60ac94){const _0x3125e5=_0x25643f;return _0x60ac94=String(_0x60ac94),_0x60ac94[_0x3125e5(0x187)](/#(.*)/i)?_0x3125e5(0xb1)[_0x3125e5(0x323)](String(RegExp['$1'])):_0x3125e5(0x33c)!==_0x3125e5(0x33c)?this[_0x3125e5(0xb7)]:this[_0x3125e5(0xd0)](Number(_0x60ac94));},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x197)]=BattleManager[_0x25643f(0x173)],BattleManager[_0x25643f(0x173)]=function(){const _0x54916e=_0x25643f;VisuMZ['ClassChangeSystem'][_0x54916e(0x197)][_0x54916e(0x2c8)](this),this['makeRewardsClassPoints'](),this[_0x54916e(0x154)](),this[_0x54916e(0x128)](),this[_0x54916e(0x2bf)]();},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x37d)]=BattleManager[_0x25643f(0x22d)],BattleManager[_0x25643f(0x22d)]=function(){const _0x13d69f=_0x25643f;VisuMZ[_0x13d69f(0x22e)][_0x13d69f(0x37d)][_0x13d69f(0x2c8)](this),this['displayRewardsClassPoints'](),this[_0x13d69f(0x243)]();},VisuMZ['ClassChangeSystem'][_0x25643f(0x2be)]=BattleManager[_0x25643f(0x3fa)],BattleManager[_0x25643f(0x3fa)]=function(){const _0x29c133=_0x25643f;VisuMZ[_0x29c133(0x22e)][_0x29c133(0x2be)][_0x29c133(0x2c8)](this);const _0x220730=this[_0x29c133(0x174)][_0x29c133(0x376)];for(const _0x344710 of $gameParty[_0x29c133(0x3fb)]()){_0x29c133(0x25b)!==_0x29c133(0x25b)?this['drawParamText'](_0x990c15+_0x5e4544,_0x20a55f,_0x1fa49c,_0x11b29c,![]):_0x344710['gainMulticlassExp'](_0x220730);}},VisuMZ[_0x25643f(0x22e)]['BattleManager_endBattle']=BattleManager[_0x25643f(0x1fb)],BattleManager[_0x25643f(0x1fb)]=function(_0x3819a2){const _0x13218e=_0x25643f;VisuMZ[_0x13218e(0x22e)][_0x13218e(0x280)][_0x13218e(0x2c8)](this,_0x3819a2);for(const _0x4cd4eb of $gameParty[_0x13218e(0x3fb)]()){_0x4cd4eb['checkForAutoClassUnlocks']();}},BattleManager[_0x25643f(0x293)]=function(){const _0x14c393=_0x25643f;this[_0x14c393(0x174)][_0x14c393(0x16e)]=$gameTroop[_0x14c393(0x199)]();},BattleManager[_0x25643f(0x310)]=function(){const _0x3efc4f=_0x25643f;if(!this[_0x3efc4f(0x135)]())return;$gameMessage[_0x3efc4f(0xcb)]();const _0x531374=$gameParty[_0x3efc4f(0xc6)](),_0x27f1c3=VisuMZ[_0x3efc4f(0x22e)][_0x3efc4f(0x193)][_0x3efc4f(0x3b9)],_0x67f50=_0x27f1c3[_0x3efc4f(0x10c)];for(const _0x22a646 of _0x531374){if(_0x3efc4f(0xae)!=='qIgdB'){if(this['_multiclasses']===_0x4b19d2)this[_0x3efc4f(0x2ed)]();return this['_multiclasses'][0x0]=this[_0x3efc4f(0x1c0)]()['id'],this[_0x3efc4f(0xa5)][_0x3efc4f(0x399)](_0x8354f9)+0x1;}else{if(!_0x22a646)continue;const _0x45d262=_0x67f50[_0x3efc4f(0x323)](_0x22a646[_0x3efc4f(0x285)](),_0x22a646[_0x3efc4f(0x403)](),TextManager[_0x3efc4f(0x279)],TextManager[_0x3efc4f(0x359)]);$gameMessage[_0x3efc4f(0x1eb)]('\x5c.'+_0x45d262);}}},BattleManager[_0x25643f(0x154)]=function(){const _0x292e47=_0x25643f;this[_0x292e47(0x174)][_0x292e47(0x16e)]=this[_0x292e47(0x174)][_0x292e47(0x16e)]||0x0;let _0x2d209a=$gameParty[_0x292e47(0x3fb)]();VisuMZ[_0x292e47(0x22e)][_0x292e47(0x193)][_0x292e47(0x3b9)][_0x292e47(0x1db)]&&(_0x2d209a=_0x2d209a[_0x292e47(0x33f)](_0x4ba1b6=>_0x4ba1b6[_0x292e47(0x1a4)]()));for(const _0x35396d of _0x2d209a){if(!_0x35396d)continue;if(!$dataSystem[_0x292e47(0x2fb)]&&!_0x35396d['isBattleMember']())continue;_0x35396d[_0x292e47(0x221)](this[_0x292e47(0x174)][_0x292e47(0x16e)]),_0x35396d[_0x292e47(0x176)](this[_0x292e47(0x174)]['classPoints']);}},BattleManager['classPointsVisible']=function(){const _0x3c0a2f=_0x25643f;return VisuMZ[_0x3c0a2f(0x22e)][_0x3c0a2f(0x193)][_0x3c0a2f(0x3b9)][_0x3c0a2f(0x21a)];},BattleManager[_0x25643f(0x128)]=function(){const _0x9fca84=_0x25643f;this[_0x9fca84(0x174)][_0x9fca84(0x1cd)]=$gameTroop['jobPointsTotal']();},BattleManager['displayRewardsJobPoints']=function(){const _0x107fb7=_0x25643f;if(!this[_0x107fb7(0x35e)]())return;$gameMessage[_0x107fb7(0xcb)]();const _0x418d88=$gameParty[_0x107fb7(0xc6)](),_0x3acb5a=VisuMZ[_0x107fb7(0x22e)]['Settings'][_0x107fb7(0x268)],_0x2573f9=_0x3acb5a[_0x107fb7(0x10c)];for(const _0x2b1ed9 of _0x418d88){if(_0x107fb7(0x284)!==_0x107fb7(0x139)){if(!_0x2b1ed9)continue;const _0x34fe65=_0x2573f9['format'](_0x2b1ed9['name'](),_0x2b1ed9[_0x107fb7(0x300)](),TextManager[_0x107fb7(0x333)],TextManager[_0x107fb7(0x19a)]);$gameMessage[_0x107fb7(0x1eb)]('\x5c.'+_0x34fe65);}else this['_backSprite1']=new _0x5598f1(_0x394905['loadTitle1'](_0x1a4b2c[_0x107fb7(0x291)]||'')),this['_backSprite2']=new _0x29148c(_0x124aa0[_0x107fb7(0x2a4)](_0x15094f['BgFilename2']||'')),this[_0x107fb7(0x14a)](this['_backSprite1']),this[_0x107fb7(0x14a)](this['_backSprite2']),this[_0x107fb7(0x102)][_0x107fb7(0x144)]['addLoadListener'](this['adjustSprite']['bind'](this,this[_0x107fb7(0x102)])),this[_0x107fb7(0x1ef)]['bitmap']['addLoadListener'](this[_0x107fb7(0x3bd)][_0x107fb7(0x149)](this,this['_backSprite2']));}},BattleManager[_0x25643f(0x2bf)]=function(){const _0x1f8c82=_0x25643f;this[_0x1f8c82(0x174)][_0x1f8c82(0x1cd)]=this[_0x1f8c82(0x174)][_0x1f8c82(0x1cd)]||0x0;let _0xbad3de=$gameParty['allMembers']();if(VisuMZ['ClassChangeSystem'][_0x1f8c82(0x193)][_0x1f8c82(0x268)][_0x1f8c82(0x1db)]){if(_0x1f8c82(0x11a)!==_0x1f8c82(0x11a))return this[_0x1f8c82(0x364)]&&this['_classTierWindow'][_0x1f8c82(0x2ea)];else _0xbad3de=_0xbad3de[_0x1f8c82(0x33f)](_0xc20458=>_0xc20458['isAlive']());}for(const _0x5acb49 of _0xbad3de){if(_0x1f8c82(0x2c2)===_0x1f8c82(0x2c2)){if(!_0x5acb49)continue;if(!$dataSystem[_0x1f8c82(0x2fb)]&&!_0x5acb49[_0x1f8c82(0x163)]())continue;_0x5acb49['gainJobPoints'](this[_0x1f8c82(0x174)][_0x1f8c82(0x1cd)]),_0x5acb49[_0x1f8c82(0x194)](this[_0x1f8c82(0x174)]['jobPoints']);}else this[_0x1f8c82(0x1a8)]();}},BattleManager[_0x25643f(0x35e)]=function(){const _0xb0fbf6=_0x25643f;return VisuMZ[_0xb0fbf6(0x22e)][_0xb0fbf6(0x193)][_0xb0fbf6(0x268)][_0xb0fbf6(0x21a)];},VisuMZ['ClassChangeSystem'][_0x25643f(0x373)]=Game_System[_0x25643f(0x242)]['initialize'],Game_System[_0x25643f(0x242)][_0x25643f(0x299)]=function(){const _0x52340e=_0x25643f;VisuMZ[_0x52340e(0x22e)][_0x52340e(0x373)]['call'](this),this[_0x52340e(0x3cf)]();},Game_System[_0x25643f(0x242)][_0x25643f(0x3cf)]=function(){const _0x52b87e=_0x25643f;this[_0x52b87e(0xe4)]={'shown':VisuMZ[_0x52b87e(0x22e)][_0x52b87e(0x193)]['MainMenu'][_0x52b87e(0x204)],'enabled':VisuMZ[_0x52b87e(0x22e)]['Settings'][_0x52b87e(0x36d)][_0x52b87e(0x31c)]};},Game_System[_0x25643f(0x242)][_0x25643f(0x159)]=function(){const _0x108b03=_0x25643f;if(this['_ClassChangeSystem_MainMenu']===undefined)this[_0x108b03(0x326)]();return this[_0x108b03(0xe4)][_0x108b03(0x38a)];},Game_System['prototype'][_0x25643f(0x385)]=function(_0x1e43e2){const _0x386a91=_0x25643f;if(this[_0x386a91(0xe4)]===undefined)this[_0x386a91(0x326)]();this[_0x386a91(0xe4)][_0x386a91(0x38a)]=_0x1e43e2;},Game_System[_0x25643f(0x242)]['isMainMenuClassChangeSystemEnabled']=function(){const _0x49adbf=_0x25643f;if(this[_0x49adbf(0xe4)]===undefined)this[_0x49adbf(0x326)]();return this[_0x49adbf(0xe4)][_0x49adbf(0x275)];},Game_System['prototype'][_0x25643f(0x317)]=function(_0x39d7bb){const _0x11ea23=_0x25643f;if(this[_0x11ea23(0xe4)]===undefined)this[_0x11ea23(0x326)]();this[_0x11ea23(0xe4)][_0x11ea23(0x275)]=_0x39d7bb;},VisuMZ['ClassChangeSystem'][_0x25643f(0x3c4)]=Game_Action[_0x25643f(0x242)][_0x25643f(0x407)],Game_Action['prototype'][_0x25643f(0x407)]=function(_0x64f227){const _0xb1068d=_0x25643f;VisuMZ[_0xb1068d(0x22e)]['Game_Action_applyItemUserEffect'][_0xb1068d(0x2c8)](this,_0x64f227),this['applyClassChangeSystemUserEffect'](_0x64f227);},Game_Action[_0x25643f(0x242)][_0x25643f(0x271)]=function(_0x109bc1){const _0x26e949=_0x25643f;if(this['item']())this[_0x26e949(0x346)](_0x109bc1);},Game_Action['prototype']['applyItemClassChangeSystemUserEffect']=function(_0x412932){const _0x2235e9=_0x25643f,_0x515f21=VisuMZ[_0x2235e9(0x22e)]['RegExp'],_0x458a64=this[_0x2235e9(0x360)]()[_0x2235e9(0x1f7)];if($gameParty['inBattle']()){if(this[_0x2235e9(0x226)]()[_0x2235e9(0x198)]()&&_0x458a64['match'](_0x515f21[_0x2235e9(0x214)])){if(_0x2235e9(0x17f)===_0x2235e9(0x17f)){const _0x52486e=eval(RegExp['$1']);this[_0x2235e9(0x226)]()[_0x2235e9(0x221)](_0x52486e);}else this[_0x2235e9(0x141)]&&this[_0x2235e9(0x198)]()&&_0x356d19['inBattle']()?this[_0x2235e9(0x3ad)]=(this['_tp']+_0x4be53e)['clamp'](0x0,this[_0x2235e9(0x31e)]()):_0x577f01['ClassChangeSystem'][_0x2235e9(0x20b)]['call'](this,_0x1173ba);}else this[_0x2235e9(0xc5)]();if(_0x412932['isActor']()&&_0x458a64['match'](_0x515f21[_0x2235e9(0x380)])){const _0x281db1=eval(RegExp['$1']);_0x412932[_0x2235e9(0x221)](_0x281db1);}}if($gameParty[_0x2235e9(0x1fd)]()){if(this[_0x2235e9(0x226)]()[_0x2235e9(0x198)]()&&_0x458a64[_0x2235e9(0x187)](_0x515f21[_0x2235e9(0x312)])){const _0x250ea1=eval(RegExp['$1']);this[_0x2235e9(0x226)]()[_0x2235e9(0x290)](_0x250ea1);}else this[_0x2235e9(0x383)]();if(_0x412932[_0x2235e9(0x198)]()&&_0x458a64[_0x2235e9(0x187)](_0x515f21[_0x2235e9(0x106)])){const _0x32f5dd=eval(RegExp['$1']);_0x412932[_0x2235e9(0x290)](_0x32f5dd);}}if(_0x458a64[_0x2235e9(0x187)](/<NOTETAG>/i)){}},Game_Action['prototype'][_0x25643f(0xc5)]=function(){const _0x3412ea=_0x25643f;if(!$gameParty[_0x3412ea(0x1fd)]())return;if(!this[_0x3412ea(0x226)]()[_0x3412ea(0x198)]())return;const _0x187196=VisuMZ[_0x3412ea(0x22e)][_0x3412ea(0x193)][_0x3412ea(0x3b9)];let _0x1cc271=0x0;try{_0x1cc271=eval(_0x187196['PerAction']);}catch(_0x384b37){if($gameTemp[_0x3412ea(0x3ea)]())console['log'](_0x384b37);}this[_0x3412ea(0x226)]()[_0x3412ea(0x221)](_0x1cc271);},Game_Action[_0x25643f(0x242)]['applyJobPoints']=function(){const _0x46f9ad=_0x25643f;if(!$gameParty[_0x46f9ad(0x1fd)]())return;if(!this[_0x46f9ad(0x226)]()[_0x46f9ad(0x198)]())return;const _0x594aed=VisuMZ['ClassChangeSystem'][_0x46f9ad(0x193)][_0x46f9ad(0x268)];let _0x21a521=0x0;try{_0x46f9ad(0x1d5)===_0x46f9ad(0x1d5)?_0x21a521=eval(_0x594aed['PerAction']):this[_0x46f9ad(0xbe)]={};}catch(_0x8d9920){if($gameTemp[_0x46f9ad(0x3ea)]())console[_0x46f9ad(0x354)](_0x8d9920);}this[_0x46f9ad(0x226)]()['gainJobPoints'](_0x21a521);},VisuMZ[_0x25643f(0x22e)]['Game_Battler_gainSilentTp']=Game_Battler[_0x25643f(0x242)]['gainSilentTp'],Game_Battler[_0x25643f(0x242)][_0x25643f(0x2ef)]=function(_0x260f47){const _0x42775b=_0x25643f;this[_0x42775b(0x141)]&&this[_0x42775b(0x198)]()&&$gameParty[_0x42775b(0x1fd)]()?this[_0x42775b(0x3ad)]=(this['_tp']+_0x260f47)['clamp'](0x0,this['maxTp']()):VisuMZ['ClassChangeSystem'][_0x42775b(0x20b)][_0x42775b(0x2c8)](this,_0x260f47);},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x22f)]=Game_Actor[_0x25643f(0x242)]['equips'],Game_Actor['prototype']['equips']=function(){const _0x17d976=_0x25643f;return VisuMZ[_0x17d976(0x22e)][_0x17d976(0x39c)](this)?VisuMZ[_0x17d976(0xda)]['Game_Actor_equips']['call'](this):VisuMZ['ClassChangeSystem'][_0x17d976(0x22f)][_0x17d976(0x2c8)](this);},VisuMZ[_0x25643f(0x22e)]['antiEquipsCacheClear_BattleCore_ClassChangeSystem']=function(_0x259885){const _0x304f7d=_0x25643f;return Imported[_0x304f7d(0x2eb)]&&_0x259885[_0x304f7d(0x198)]()&&_0x259885[_0x304f7d(0x175)]!==undefined&&_0x259885===BattleManager[_0x304f7d(0x2de)]&&$gameParty[_0x304f7d(0x1fd)]();},VisuMZ[_0x25643f(0x22e)]['Game_Battler_onBattleStart']=Game_Battler[_0x25643f(0x242)][_0x25643f(0xb4)],Game_Battler['prototype'][_0x25643f(0xb4)]=function(_0x336c10){const _0x11832e=_0x25643f;VisuMZ[_0x11832e(0x22e)][_0x11832e(0x31b)]['call'](this,_0x336c10);if(this[_0x11832e(0x198)]()){if(_0x11832e(0x3e7)===_0x11832e(0x316))return _0x30a0d8['isMainMenuClassChangeSystemEnabled']();else this['_earnedClassPoints']=this['getClassPoints'](),this[_0x11832e(0x3e1)]=this[_0x11832e(0xa7)]();}},Game_Actor[_0x25643f(0x9f)]=VisuMZ['ClassChangeSystem'][_0x25643f(0x193)]['General']['ChangeAdjusHpMp'],VisuMZ[_0x25643f(0x22e)]['Game_Actor_setup']=Game_Actor[_0x25643f(0x242)][_0x25643f(0xb9)],Game_Actor[_0x25643f(0x242)][_0x25643f(0xb9)]=function(_0x4642d1){const _0x4723b9=_0x25643f;VisuMZ['ClassChangeSystem'][_0x4723b9(0x3dd)][_0x4723b9(0x2c8)](this,_0x4642d1),this[_0x4723b9(0x1a9)](),this[_0x4723b9(0x14f)](),this[_0x4723b9(0x315)](),this[_0x4723b9(0x1b0)](),this[_0x4723b9(0x404)]();},Game_Actor[_0x25643f(0x242)]['setupClassChangeSystem']=function(){const _0x5f37f5=_0x25643f;this[_0x5f37f5(0x26d)](),this['initMulticlass'](),this[_0x5f37f5(0x28a)](),this['initClassChangeRestrictions'](),this[_0x5f37f5(0x1df)](),this['refresh'](),this['clearParamPlus'](),this[_0x5f37f5(0xdf)]();},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x114)]=Game_Actor[_0x25643f(0x242)]['changeClass'],Game_Actor[_0x25643f(0x242)][_0x25643f(0xd2)]=function(_0x42ede8,_0x50d5f5){const _0x211e3f=_0x25643f;_0x50d5f5=this[_0x211e3f(0x2b2)]();_0x50d5f5&&(this[_0x211e3f(0x303)]=this[_0x211e3f(0x303)]||{},this[_0x211e3f(0x303)][_0x42ede8]=this[_0x211e3f(0x303)][this[_0x211e3f(0x257)]]||0x0,_0x50d5f5=![]);this['_ClassChangeSystem_preventLevelUpGain']=!![];const _0x2b4159=JsonEx[_0x211e3f(0xea)](this);_0x2b4159['_tempActor']=!![],VisuMZ[_0x211e3f(0x22e)][_0x211e3f(0x114)][_0x211e3f(0x2c8)](this,_0x42ede8,_0x50d5f5),this[_0x211e3f(0x240)](_0x2b4159),this[_0x211e3f(0x1cc)](),this[_0x211e3f(0x1a7)](_0x42ede8),this[_0x211e3f(0x155)]=undefined;if($gamePlayer)$gamePlayer[_0x211e3f(0x3d3)]();},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x2c4)]=Game_Actor[_0x25643f(0x242)][_0x25643f(0x24d)],Game_Actor[_0x25643f(0x242)][_0x25643f(0x24d)]=function(_0x1b6db6,_0x75b111){const _0x24a75c=_0x25643f;if(this['_tempActor'])return![];return VisuMZ[_0x24a75c(0x22e)]['Game_Actor_tradeItemWithParty'][_0x24a75c(0x2c8)](this,_0x1b6db6,_0x75b111);},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x334)]=Game_Actor[_0x25643f(0x242)][_0x25643f(0x2ab)],Game_Actor[_0x25643f(0x242)]['releaseUnequippableItems']=function(_0x31e5dd){const _0x7e5725=_0x25643f;if($gameParty[_0x7e5725(0x1fd)]())return;VisuMZ[_0x7e5725(0x22e)][_0x7e5725(0x334)][_0x7e5725(0x2c8)](this,_0x31e5dd);},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x21f)]=Game_Actor['prototype'][_0x25643f(0x162)],Game_Actor[_0x25643f(0x242)]['levelUp']=function(){const _0x4fd238=_0x25643f;VisuMZ[_0x4fd238(0x22e)][_0x4fd238(0x21f)][_0x4fd238(0x2c8)](this);const _0x4b7dc9=this[_0x4fd238(0x1c0)]()['id'];this[_0x4fd238(0xd1)](_0x4b7dc9),this[_0x4fd238(0x1b2)](_0x4b7dc9),this[_0x4fd238(0x3f8)]=this[_0x4fd238(0x3f8)]||{},this[_0x4fd238(0x3f8)][_0x4b7dc9]=this['level'],this[_0x4fd238(0x2b2)]()&&(_0x4fd238(0x301)===_0x4fd238(0x237)?_0x42b812['unlockClass'](_0x11ea46):this['updateClassLearnedSkills']());},Game_Actor[_0x25643f(0x242)][_0x25643f(0x240)]=function(_0x280eb8){const _0x1a24a5=_0x25643f;if(!Game_Actor[_0x1a24a5(0x9f)])return;const _0x4908ac=Math[_0x1a24a5(0x185)](_0x280eb8['hpRate']()*this[_0x1a24a5(0x3d6)]),_0x422d95=Math[_0x1a24a5(0x185)](_0x280eb8[_0x1a24a5(0x2bc)]()*this[_0x1a24a5(0x3c0)]);if(this['hp']>0x0)this[_0x1a24a5(0x3e6)](_0x4908ac);if(this['mp']>0x0)this[_0x1a24a5(0x16c)](_0x422d95);},Game_Actor[_0x25643f(0x242)][_0x25643f(0x1a9)]=function(){const _0xa74c98=_0x25643f;this[_0xa74c98(0xbe)]={};},Game_Actor[_0x25643f(0x242)][_0x25643f(0x14f)]=function(){const _0x27fbbc=_0x25643f,_0x20bb80=VisuMZ[_0x27fbbc(0x22e)]['RegExp'],_0x11a7f6=this['actor']()[_0x27fbbc(0x1f7)];if(_0x11a7f6[_0x27fbbc(0x187)](_0x20bb80[_0x27fbbc(0x274)])){if('lGHmQ'!==_0x27fbbc(0x1bb))_0x158f4d=_0x2973dc(_0x16bd84['$1']);else{const _0x5bc7c4=eval(RegExp['$1']);this['gainClassPoints'](_0x5bc7c4);}}const _0x24eb54=VisuMZ[_0x27fbbc(0x22e)]['Settings'][_0x27fbbc(0x3b9)];if(!_0x24eb54[_0x27fbbc(0x232)])return;const _0x332e49=_0x11a7f6[_0x27fbbc(0x187)](_0x20bb80[_0x27fbbc(0x336)]);if(_0x332e49){if(_0x27fbbc(0x3d8)===_0x27fbbc(0x3d8))for(const _0x55b14f of _0x332e49){if(!_0x55b14f)continue;_0x55b14f['match'](_0x20bb80[_0x27fbbc(0x336)]);const _0x4d7666=String(RegExp['$1']),_0x579c17=eval(RegExp['$2']),_0x2fe94a=/^\d+$/[_0x27fbbc(0x201)](_0x4d7666);let _0x24e2a7=0x0;_0x2fe94a?_0x27fbbc(0x39b)==='Ecign'?_0x24e2a7=Number(_0x4d7666):_0x4c7cbc[_0x27fbbc(0x242)][_0x27fbbc(0x299)][_0x27fbbc(0x2c8)](this,_0x4ac8f6):_0x24e2a7=DataManager[_0x27fbbc(0x2ee)](_0x4d7666),this['gainClassPoints'](_0x579c17,_0x24e2a7);}else{const _0x110b05=_0x319aba[_0x27fbbc(0x22e)][_0x27fbbc(0x287)],_0x3c99c9=_0x10c99e[_0x27fbbc(0x1f7)];if(_0x3c99c9[_0x27fbbc(0x187)](_0x110b05[_0x27fbbc(0xd3)]))return _0x3102ba(_0x29a99a['$1']);}}},Game_Actor[_0x25643f(0x242)][_0x25643f(0x1fc)]=function(_0xc57d11){const _0x4c3b20=_0x25643f;this[_0x4c3b20(0xbe)]===undefined&&this[_0x4c3b20(0x1a9)]();const _0x4a3a13=VisuMZ['ClassChangeSystem'][_0x4c3b20(0x193)][_0x4c3b20(0x3b9)];if(_0x4a3a13[_0x4c3b20(0x232)])_0x4c3b20(0x405)==='kTIOf'?_0xc57d11=0x0:(_0x3bb571['ConvertParams'](_0x4465ee,_0x222ad1),_0x2b3f4b['setMainMenuClassChangeSystemEnabled'](_0x2a6bb5[_0x4c3b20(0x269)]));else{if(_0x4c3b20(0xdd)!==_0x4c3b20(0xdd))return _0x466380-_0x19749f;else _0xc57d11=_0xc57d11||this[_0x4c3b20(0x1c0)]()['id'];}return this[_0x4c3b20(0xbe)][_0xc57d11]=this[_0x4c3b20(0xbe)][_0xc57d11]||0x0,Math[_0x4c3b20(0x185)](this[_0x4c3b20(0xbe)][_0xc57d11]);},Game_Actor[_0x25643f(0x242)][_0x25643f(0x25c)]=function(_0x5787d3,_0x165e64){const _0x406337=_0x25643f;this[_0x406337(0xbe)]===undefined&&this[_0x406337(0x1a9)]();const _0xc06fd=VisuMZ['ClassChangeSystem'][_0x406337(0x193)][_0x406337(0x3b9)];_0xc06fd[_0x406337(0x232)]?_0x165e64=0x0:_0x165e64=_0x165e64||this[_0x406337(0x1c0)]()['id'];this[_0x406337(0xbe)][_0x165e64]=this[_0x406337(0xbe)][_0x165e64]||0x0,this[_0x406337(0xbe)][_0x165e64]=Math[_0x406337(0x185)](_0x5787d3||0x0);const _0x513ca6=_0xc06fd['MaxResource']||Number['MAX_SAFE_INTEGER'];this[_0x406337(0xbe)][_0x165e64]=this[_0x406337(0xbe)][_0x165e64][_0x406337(0x281)](0x0,_0x513ca6);},Game_Actor[_0x25643f(0x242)][_0x25643f(0x221)]=function(_0x3f1c80,_0x3605ee){const _0x412fe4=_0x25643f;_0x3f1c80>0x0&&(_0x3f1c80*=this[_0x412fe4(0x2e5)]()),this[_0x412fe4(0x3f9)](_0x3f1c80,_0x3605ee);},Game_Actor[_0x25643f(0x242)]['gainClassPointsForMulticlasses']=function(_0x2048a3){const _0x1e65b1=_0x25643f;if(!Imported['VisuMZ_2_ClassChangeSystem'])return;_0x2048a3>0x0&&(_0x1e65b1(0x146)===_0x1e65b1(0x146)?_0x2048a3*=this[_0x1e65b1(0x2e5)]():_0x5f4b75[_0x1e65b1(0x186)]()),this[_0x1e65b1(0x224)](_0x2048a3,_0x1e65b1(0x212));},Game_Actor[_0x25643f(0x242)][_0x25643f(0x3f9)]=function(_0x415848,_0x3b4f2c){const _0x1639cc=_0x25643f,_0x92f24e=VisuMZ[_0x1639cc(0x22e)][_0x1639cc(0x193)][_0x1639cc(0x3b9)];if(_0x92f24e[_0x1639cc(0x232)])_0x3b4f2c=0x0;else{if(_0x1639cc(0x11b)!==_0x1639cc(0x11b)){const _0x9b483b=_0x303ec0[_0x1639cc(0x22e)]['Settings'][_0x1639cc(0x19d)];if(!_0x9b483b)return;const _0x2e4217=_0x9b483b[this[_0x1639cc(0x1e2)]()-0x1];if(!_0x2e4217)return;this[_0x1639cc(0x253)][_0x1639cc(0xe5)](_0x2e4217[_0x1639cc(0x188)]);}else _0x3b4f2c=_0x3b4f2c||this[_0x1639cc(0x1c0)]()['id'];}_0x415848+=this['getClassPoints'](_0x3b4f2c),this[_0x1639cc(0x25c)](_0x415848,_0x3b4f2c);},Game_Actor[_0x25643f(0x242)][_0x25643f(0x2ad)]=function(_0xde38c8,_0x4b8627){this['addClassPoints'](-_0xde38c8,_0x4b8627);},Game_Actor[_0x25643f(0x242)]['classPointsRate']=function(){const _0x324159=_0x25643f;return this[_0x324159(0x349)]()[_0x324159(0x234)]((_0x38aabe,_0x3c83c9)=>{const _0x377b6e=_0x324159;if(_0x3c83c9&&_0x3c83c9[_0x377b6e(0x1f7)][_0x377b6e(0x187)](VisuMZ['ClassChangeSystem'][_0x377b6e(0x287)]['ClassPointsRate']))return _0x38aabe*(Number(RegExp['$1'])*0.01);else{if(_0x377b6e(0xc1)!=='elGhP')return _0x38aabe;else _0x1085e1['ClassChangeSystem'][_0x377b6e(0x28f)]['call'](this,_0x50882d),_0xb46bee[_0x377b6e(0x33a)](_0x14eeaa);}},0x1);},Game_Actor['prototype'][_0x25643f(0xd1)]=function(_0x4f3807){const _0x5ed250=_0x25643f;if(this[_0x5ed250(0x155)])return;const _0x271b9f=VisuMZ[_0x5ed250(0x22e)][_0x5ed250(0x193)]['ClassPoints'];let _0x286f99=0x0;try{_0x286f99=eval(_0x271b9f['PerLevelUp']);}catch(_0x50b482){if(_0x5ed250(0x3bc)===_0x5ed250(0x3bc)){if($gameTemp[_0x5ed250(0x3ea)]())console[_0x5ed250(0x354)](_0x50b482);}else return _0x69231e[_0x5ed250(0x22e)][_0x5ed250(0x193)][_0x5ed250(0x294)][_0x5ed250(0x125)];}this['gainClassPoints'](_0x286f99,_0x4f3807);},Game_Actor['prototype'][_0x25643f(0x403)]=function(){const _0x270340=_0x25643f;return this['_earnedClassPoints']=this[_0x270340(0x1a0)]||0x0,this[_0x270340(0x1fc)]()-this['_earnedClassPoints'];},Game_Actor['prototype'][_0x25643f(0x315)]=function(){const _0x6462c7=_0x25643f;this[_0x6462c7(0x3ed)]={};},Game_Actor[_0x25643f(0x242)]['gainStartingJobPoints']=function(){const _0x21c27b=_0x25643f,_0xf3c88e=VisuMZ[_0x21c27b(0x22e)][_0x21c27b(0x287)],_0x1a3b23=this[_0x21c27b(0xef)]()['note'];if(_0x1a3b23['match'](_0xf3c88e[_0x21c27b(0xf8)])){if(_0x21c27b(0xf9)!=='JhCXg'){const _0x2d3bff=_0x21c27b(0x31a)[_0x21c27b(0x323)](_0x59161d,_0x2eeb94);_0x1ebdf5[_0x21c27b(0x378)][_0x2d3bff]=_0x492d20;}else{const _0x4de756=eval(RegExp['$1']);this[_0x21c27b(0x290)](_0x4de756);}}const _0x4e6977=VisuMZ['ClassChangeSystem'][_0x21c27b(0x193)]['JobPoints'];if(!_0x4e6977[_0x21c27b(0x232)])return;const _0x5b01b2=_0x1a3b23['match'](_0xf3c88e[_0x21c27b(0x352)]);if(_0x5b01b2)for(const _0x5a14f4 of _0x5b01b2){if(_0x21c27b(0x195)!==_0x21c27b(0xe0)){if(!_0x5a14f4)continue;_0x5a14f4[_0x21c27b(0x187)](_0xf3c88e[_0x21c27b(0x352)]);const _0x416f7d=String(RegExp['$1']),_0x4a03db=eval(RegExp['$2']),_0x5f5cff=/^\d+$/[_0x21c27b(0x201)](_0x416f7d);let _0xc8e499=0x0;_0x5f5cff?_0xc8e499=Number(_0x416f7d):_0xc8e499=DataManager['getClassIdWithName'](_0x416f7d),this['gainJobPoints'](_0x4a03db,_0xc8e499);}else _0x42b01e=_0x358e3f[_0x21c27b(0x34b)](_0x36ca63,_0x3eb114);}},Game_Actor[_0x25643f(0x242)][_0x25643f(0xa7)]=function(_0x33c16c){const _0x3eb770=_0x25643f;this[_0x3eb770(0x3ed)]===undefined&&this[_0x3eb770(0x315)]();const _0x22c295=VisuMZ[_0x3eb770(0x22e)][_0x3eb770(0x193)][_0x3eb770(0x268)];return _0x22c295[_0x3eb770(0x232)]?_0x33c16c=0x0:_0x33c16c=_0x33c16c||this[_0x3eb770(0x1c0)]()['id'],this[_0x3eb770(0x3ed)][_0x33c16c]=this[_0x3eb770(0x3ed)][_0x33c16c]||0x0,Math['round'](this[_0x3eb770(0x3ed)][_0x33c16c]);},Game_Actor[_0x25643f(0x242)][_0x25643f(0x366)]=function(_0x170eb0,_0x4fbb8a){const _0x16b747=_0x25643f;if(this['_jobPoints']===undefined){if(_0x16b747(0x3ff)!==_0x16b747(0x3ff))return this[_0x16b747(0x27e)]===_0x1e3460&&this[_0x16b747(0x1a8)](),this[_0x16b747(0x27e)][_0x16b747(0xf5)](_0x2a19d8);else this[_0x16b747(0x315)]();}const _0xbd2e2b=VisuMZ['ClassChangeSystem'][_0x16b747(0x193)][_0x16b747(0x268)];if(_0xbd2e2b[_0x16b747(0x232)]){if('yCmiR'!==_0x16b747(0x3c6)){if(this[_0x16b747(0x2b0)]!==_0x4ec1c3)return this[_0x16b747(0x2b0)];return this['_highestTier']=_0x5c4416[_0x16b747(0x9e)](),this['_highestTier'];}else _0x4fbb8a=0x0;}else _0x4fbb8a=_0x4fbb8a||this['currentClass']()['id'];this[_0x16b747(0x3ed)][_0x4fbb8a]=this[_0x16b747(0x3ed)][_0x4fbb8a]||0x0,this[_0x16b747(0x3ed)][_0x4fbb8a]=Math[_0x16b747(0x185)](_0x170eb0||0x0);const _0x4dfedb=_0xbd2e2b['MaxResource']||Number[_0x16b747(0x39f)];this[_0x16b747(0x3ed)][_0x4fbb8a]=this['_jobPoints'][_0x4fbb8a][_0x16b747(0x281)](0x0,_0x4dfedb);},Game_Actor[_0x25643f(0x242)]['gainJobPoints']=function(_0x285ad2,_0x2158bf){const _0x2296ea=_0x25643f;_0x285ad2>0x0&&(_0x285ad2*=this[_0x2296ea(0x28b)]()),this[_0x2296ea(0x117)](_0x285ad2,_0x2158bf);},Game_Actor[_0x25643f(0x242)][_0x25643f(0x194)]=function(_0xcc5925){const _0x16920e=_0x25643f;if(!Imported[_0x16920e(0x394)])return;_0xcc5925>0x0&&(_0xcc5925*=this['jobPointsRate']()),this[_0x16920e(0x224)](_0xcc5925,_0x16920e(0x21b));},Game_Actor[_0x25643f(0x242)]['addJobPoints']=function(_0x497fbf,_0x41814b){const _0x32f2af=_0x25643f,_0x46ec3b=VisuMZ['ClassChangeSystem'][_0x32f2af(0x193)][_0x32f2af(0x268)];_0x46ec3b['SharedResource']?_0x41814b=0x0:_0x41814b=_0x41814b||this[_0x32f2af(0x1c0)]()['id'],_0x497fbf+=this[_0x32f2af(0xa7)](_0x41814b),this['setJobPoints'](_0x497fbf,_0x41814b);},Game_Actor[_0x25643f(0x242)][_0x25643f(0xb5)]=function(_0x3f7b9c,_0xce34d5){const _0x38f617=_0x25643f;this[_0x38f617(0x117)](-_0x3f7b9c,_0xce34d5);},Game_Actor[_0x25643f(0x242)]['jobPointsRate']=function(){return this['traitObjects']()['reduce']((_0x55f0b7,_0x5d00b7)=>{const _0x56ac7d=_0x536c;if(_0x56ac7d(0x190)!==_0x56ac7d(0x270))return _0x5d00b7&&_0x5d00b7[_0x56ac7d(0x1f7)][_0x56ac7d(0x187)](VisuMZ[_0x56ac7d(0x22e)][_0x56ac7d(0x287)][_0x56ac7d(0x379)])?_0x56ac7d(0x3c2)!=='kTHWC'?_0x19df3c-_0x31f83e:_0x55f0b7*(Number(RegExp['$1'])*0.01):_0x55f0b7;else{if(this[_0x56ac7d(0x198)]())this[_0x56ac7d(0x175)]=_0x56ac7d(0x103);let _0x27495c=_0x4e08aa[_0x56ac7d(0x22e)][_0x56ac7d(0x122)]['call'](this,_0x2fa733);if(this['isActor']())this[_0x56ac7d(0x175)]=_0x53d7b3;return _0x27495c;}},0x1);},Game_Actor[_0x25643f(0x242)]['levelUpGainJobPoints']=function(_0x2142c5){const _0x3c7f73=_0x25643f;if(this[_0x3c7f73(0x155)])return;const _0x4535e4=VisuMZ[_0x3c7f73(0x22e)]['Settings'][_0x3c7f73(0x268)];let _0x5c3c16=0x0;try{if('ETPvY'!==_0x3c7f73(0xbb))return _0x236393(_0x43616e[_0x3c7f73(0x28e)]);else _0x5c3c16=eval(_0x4535e4[_0x3c7f73(0x191)]);}catch(_0x4a4060){if($gameTemp['isPlaytest']())console['log'](_0x4a4060);}this['gainJobPoints'](_0x5c3c16,_0x2142c5);},Game_Actor[_0x25643f(0x242)][_0x25643f(0x300)]=function(){const _0x2e9c42=_0x25643f;return this[_0x2e9c42(0x3e1)]=this['_earnedJobPoints']||0x0,this[_0x2e9c42(0xa7)]()-this[_0x2e9c42(0x3e1)];},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x143)]=Game_Actor[_0x25643f(0x242)][_0x25643f(0x282)],Game_Actor['prototype'][_0x25643f(0x282)]=function(_0x163ed5,_0x41d98f){const _0x5282d1=_0x25643f;_0x163ed5!==''?(this[_0x5282d1(0xdb)]=_0x163ed5,this['_priorityFaceIndex']=_0x41d98f):(this[_0x5282d1(0xdb)]=undefined,this['_priorityFaceIndex']=undefined);},VisuMZ['ClassChangeSystem'][_0x25643f(0x2ff)]=Game_Actor['prototype'][_0x25643f(0x356)],Game_Actor[_0x25643f(0x242)][_0x25643f(0x356)]=function(){const _0x5b1b41=_0x25643f;if(this[_0x5b1b41(0xdb)]!==undefined)return this[_0x5b1b41(0xdb)];return ImageManager['getActorClassFaceName'](this)||VisuMZ[_0x5b1b41(0x22e)][_0x5b1b41(0x2ff)][_0x5b1b41(0x2c8)](this);},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x2b7)]=Game_Actor[_0x25643f(0x242)][_0x25643f(0x131)],Game_Actor['prototype']['faceIndex']=function(){const _0x33ffa2=_0x25643f;if(this[_0x33ffa2(0x390)]!==undefined)return _0x33ffa2(0x372)!==_0x33ffa2(0x350)?this['_priorityFaceIndex']:_0x2c1ed4&&_0x3fa173[_0x33ffa2(0x1f7)]['match'](_0x57a6c1[_0x33ffa2(0x22e)]['RegExp'][_0x33ffa2(0x379)])?_0x2fc031*(_0x186036(_0x4ecb42['$1'])*0.01):_0x212fef;const _0x338e1c=ImageManager['getActorClassFaceIndex'](this);if(_0x338e1c!==undefined)return _0x338e1c;return VisuMZ['ClassChangeSystem'][_0x33ffa2(0x2b7)]['call'](this);},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x2b8)]=Game_Actor[_0x25643f(0x242)][_0x25643f(0xa0)],Game_Actor[_0x25643f(0x242)][_0x25643f(0xa0)]=function(_0x62ccdf,_0x4f8c8b){const _0x62bd8b=_0x25643f;_0x62ccdf!==''?(this[_0x62bd8b(0x391)]=_0x62ccdf,this[_0x62bd8b(0x1b9)]=_0x4f8c8b):'ikeCk'!==_0x62bd8b(0x324)?(this[_0x62bd8b(0x391)]=undefined,this[_0x62bd8b(0x1b9)]=undefined):_0x528959=_0x5a6ad1(_0x584470[_0x62bd8b(0x262)]);},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x127)]=Game_Actor[_0x25643f(0x242)]['characterName'],Game_Actor['prototype'][_0x25643f(0x177)]=function(){const _0x3952ab=_0x25643f;if(this[_0x3952ab(0x391)]!==undefined){if(_0x3952ab(0x1c1)!==_0x3952ab(0x1c1)){const _0x3b7183=_0x58d5c4(_0x5f1bd0['$1']);_0x3b7183!==_0x3b00e5[_0x1778c1][_0x3952ab(0x2b9)]&&(_0x7ec4ab(_0x3952ab(0x2f9)[_0x3952ab(0x323)](_0x1c31c6,_0x3b7183)),_0x3690cb[_0x3952ab(0x2cb)]());}else return this[_0x3952ab(0x391)];}return ImageManager[_0x3952ab(0x15b)](this)||VisuMZ[_0x3952ab(0x22e)][_0x3952ab(0x127)][_0x3952ab(0x2c8)](this);},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x1ce)]=Game_Actor[_0x25643f(0x242)][_0x25643f(0x3f4)],Game_Actor['prototype']['characterIndex']=function(){const _0x2564d1=_0x25643f;if(this[_0x2564d1(0x1b9)]!==undefined){if(_0x2564d1(0x2e7)!=='FpGga')return this[_0x2564d1(0x1b9)];else _0x23fddd[_0x2564d1(0xa8)](++_0x4603f3,0x0,_0x5617f3);}const _0x52587e=ImageManager[_0x2564d1(0x298)](this);if(_0x52587e!==undefined)return _0x52587e;return VisuMZ[_0x2564d1(0x22e)][_0x2564d1(0x1ce)][_0x2564d1(0x2c8)](this);},VisuMZ['ClassChangeSystem'][_0x25643f(0x3de)]=Game_Actor[_0x25643f(0x242)][_0x25643f(0x2f1)],Game_Actor[_0x25643f(0x242)][_0x25643f(0x2f1)]=function(_0x1d2069){const _0x166860=_0x25643f;if(_0x1d2069!=='')this[_0x166860(0x13b)]=_0x1d2069;else{if('uhrtA'!==_0x166860(0x112))this[_0x166860(0x13b)]=undefined;else{const _0x4a813c=_0x5445bf(_0x28acad['$1']);_0x2c23b5['gainJobPoints'](_0x4a813c);}}},VisuMZ['ClassChangeSystem'][_0x25643f(0x277)]=Game_Actor[_0x25643f(0x242)][_0x25643f(0x396)],Game_Actor['prototype'][_0x25643f(0x396)]=function(){const _0x11b115=_0x25643f;if(this['_priorityBattlerName']!==undefined){if(_0x11b115(0x230)!==_0x11b115(0x230))_0x374a6e=_0x35028c(_0x25a190['$1']);else return this[_0x11b115(0x13b)];}return ImageManager[_0x11b115(0x23e)](this)||VisuMZ['ClassChangeSystem'][_0x11b115(0x277)][_0x11b115(0x2c8)](this);;},VisuMZ['ClassChangeSystem'][_0x25643f(0x233)]=Game_Actor[_0x25643f(0x242)]['setMenuImage'],Game_Actor['prototype'][_0x25643f(0x2b6)]=function(_0x21311b){const _0x3f1ac0=_0x25643f;_0x21311b!==''?this['_priorityMenuImage']=_0x21311b:this[_0x3f1ac0(0x1ac)]=undefined;},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x24e)]=Game_Actor[_0x25643f(0x242)][_0x25643f(0x29e)],Game_Actor['prototype'][_0x25643f(0x29e)]=function(){const _0x13c9b0=_0x25643f;if(this[_0x13c9b0(0x1ac)]!==undefined){if('HpBpl'!=='HpBpl')this['unlockClass'](_0x32ebf7);else return this['_priorityMenuImage'];}return ImageManager[_0x13c9b0(0x1a3)](this)||VisuMZ[_0x13c9b0(0x22e)][_0x13c9b0(0x24e)]['call'](this);;},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x295)]=Game_Actor[_0x25643f(0x242)][_0x25643f(0x2d8)],Game_Actor[_0x25643f(0x242)][_0x25643f(0x2d8)]=function(_0x3693c1){const _0x4866c5=_0x25643f;_0x3693c1!==''?this[_0x4866c5(0xb7)]=_0x3693c1:this[_0x4866c5(0xb7)]=undefined;if(SceneManager[_0x4866c5(0xc4)]()&&$gameParty[_0x4866c5(0x2d5)]()['includes'](this)){const _0x39cbf3=SceneManager[_0x4866c5(0x1cb)][_0x4866c5(0x3f1)];if(_0x39cbf3)_0x39cbf3[_0x4866c5(0x392)](this);}},VisuMZ['ClassChangeSystem'][_0x25643f(0x16d)]=Game_Actor[_0x25643f(0x242)][_0x25643f(0xe9)],Game_Actor[_0x25643f(0x242)][_0x25643f(0xe9)]=function(){const _0x1e5a81=_0x25643f;if(this['_priorityBattlePortrait']!==undefined)return this['_priorityBattlePortrait'];return ImageManager['getActorClassBattlePortrait'](this)||VisuMZ[_0x1e5a81(0x22e)][_0x1e5a81(0x16d)][_0x1e5a81(0x2c8)](this);;},Game_Actor[_0x25643f(0x242)][_0x25643f(0x26d)]=function(){const _0x351612=_0x25643f;this[_0x351612(0x20d)]=[this['currentClass']()['id']];const _0x4dacb8=VisuMZ[_0x351612(0x22e)][_0x351612(0x287)],_0x51c920=this[_0x351612(0xef)]()[_0x351612(0x1f7)],_0x24008d=_0x51c920[_0x351612(0x187)](_0x4dacb8['ActorUnlockedClasses']);if(_0x24008d){if(_0x351612(0x302)===_0x351612(0x302))for(const _0x21068a of _0x24008d){if(_0x351612(0x32b)!==_0x351612(0x32b))try{return _0x3a288f(_0x29f79f['$1']);}catch(_0x6a5a33){if(_0x26a458[_0x351612(0x3ea)]())_0x38033e[_0x351612(0x354)](_0x6a5a33);return 0x0;}else{if(!_0x21068a)continue;_0x21068a['match'](_0x4dacb8[_0x351612(0xaa)]);const _0x491b63=String(RegExp['$1'])[_0x351612(0x1ca)](',');for(let _0x749fff of _0x491b63){if(_0x351612(0x218)!==_0x351612(0x3ae)){_0x749fff=(String(_0x749fff)||'')[_0x351612(0x124)]();const _0x1f79b6=/^\d+$/[_0x351612(0x201)](_0x749fff);if(_0x1f79b6){if('ydzIR'!=='ydzIR')return _0x30af39['uiInputPosition'];else this[_0x351612(0x20d)][_0x351612(0x151)](Number(_0x749fff));}else this['_unlockedClasses'][_0x351612(0x151)](DataManager[_0x351612(0x2ee)](_0x749fff));}else{const _0x4dea10=_0x3a4276[_0x351612(0x3d9)]();if(_0x4dea10<_0x118399)return![];}}}}else{if(_0x46cd31[_0x351612(0x3ea)]())_0x4e3c36['log'](_0x324ec4);}}},Game_Actor['prototype'][_0x25643f(0x39a)]=function(){const _0x5832f8=_0x25643f;if(this[_0x5832f8(0x20d)]===undefined)this[_0x5832f8(0x26d)]();return this[_0x5832f8(0x20d)];},Game_Actor[_0x25643f(0x242)][_0x25643f(0x1d0)]=function(_0x2c55d1){const _0x11dd14=_0x25643f;if(this['_unlockedClasses']===undefined)this['initClassChangeUnlocks']();if(this['_unlockedClasses'][_0x11dd14(0xf5)](_0x2c55d1))return;this['_unlockedClasses'][_0x11dd14(0x151)](_0x2c55d1),this[_0x11dd14(0x20d)][_0x11dd14(0x306)](0x0),this['_unlockedClasses'][_0x11dd14(0x322)](function(_0x39103e,_0x4d63ef){return _0x39103e-_0x4d63ef;});},Game_Actor[_0x25643f(0x242)]['removeUnlockedClass']=function(_0x45ad93){const _0x4e79ba=_0x25643f;if(this[_0x4e79ba(0x20d)]===undefined)this[_0x4e79ba(0x26d)]();if(!this[_0x4e79ba(0x20d)][_0x4e79ba(0xf5)](_0x45ad93))return;this['_unlockedClasses'][_0x4e79ba(0x306)](_0x45ad93)[_0x4e79ba(0x306)](null),this['_unlockedClasses'][_0x4e79ba(0x322)](function(_0x4afe03,_0x3fa5fc){const _0x37cdd1=_0x4e79ba;if(_0x37cdd1(0x1f4)!==_0x37cdd1(0x1f4))this[_0x37cdd1(0xe1)](_0x332fb6),this[_0x37cdd1(0x30c)](_0x40384c);else return _0x4afe03-_0x3fa5fc;});},Game_Actor[_0x25643f(0x242)][_0x25643f(0x1a7)]=function(_0x480ac1){const _0x450199=_0x25643f;this[_0x450199(0x1d0)](_0x480ac1);},Game_Actor[_0x25643f(0x242)]['initMulticlass']=function(){const _0x3cf842=_0x25643f;this[_0x3cf842(0x100)]=VisuMZ['ClassChangeSystem']['Settings'][_0x3cf842(0x294)][_0x3cf842(0x3fe)],this[_0x3cf842(0xa5)]=[this[_0x3cf842(0x257)]];const _0x51fa21=this['actor']()[_0x3cf842(0x1f7)],_0x1e3cf8=VisuMZ[_0x3cf842(0x22e)][_0x3cf842(0x287)];_0x51fa21['match'](_0x1e3cf8[_0x3cf842(0x3fe)])&&(this['_multiclassTiers']=Number(RegExp['$1']));const _0x4b8082=_0x51fa21['match'](_0x1e3cf8[_0x3cf842(0x1f3)]);if(_0x4b8082){if('NxbJl'!==_0x3cf842(0x2ca))for(const _0x52e5c3 of _0x4b8082){if(!_0x52e5c3)continue;_0x52e5c3['match'](_0x1e3cf8['StartingClassTier']);const _0x2b56e8=Number(RegExp['$1'])-0x1;if(_0x2b56e8+0x1>this[_0x3cf842(0x100)])continue;let _0x1f4bf1=(String(RegExp['$2'])||'')['trim']();const _0x4cacf5=/^\d+$/[_0x3cf842(0x201)](_0x1f4bf1);_0x4cacf5?this['_multiclasses'][_0x2b56e8]=Number(_0x1f4bf1):this[_0x3cf842(0xa5)][_0x2b56e8]=DataManager['getClassIdWithName'](_0x1f4bf1);}else{if(_0x317f80==='AP'){const _0x32ab76=_0x53f05f[_0x3cf842(0x3d9)]();if(_0x32ab76<_0x1d7a4c)return![];}else{if(_0x2676b3==='SP'){const _0x398964=_0x1710a5[_0x3cf842(0x33e)]();if(_0x398964<_0x1a15e0)return![];}}}}this[_0x3cf842(0x1cc)](),this[_0x3cf842(0x100)]=this[_0x3cf842(0x100)][_0x3cf842(0x281)](0x1,VisuMZ[_0x3cf842(0x22e)]['Settings']['Multiclass'][_0x3cf842(0xba)]||0x1);for(const _0x24bfcc of this[_0x3cf842(0xa5)]){this[_0x3cf842(0x1d0)](_0x24bfcc);}},Game_Actor[_0x25643f(0x242)]['getMulticlasses']=function(){const _0x3f2195=_0x25643f;if(this[_0x3f2195(0xa5)]===undefined)this[_0x3f2195(0x2ed)]();return this['_multiclasses'][0x0]=this['_classId'],this[_0x3f2195(0xa5)][_0x3f2195(0x33f)](_0x5e9d93=>!!$dataClasses[_0x5e9d93])[_0x3f2195(0x402)](_0x229628=>$dataClasses[_0x229628]);},Game_Actor['prototype']['multiclasses']=function(){const _0x3d5cf9=_0x25643f;return this[_0x3d5cf9(0x223)]();},Game_Actor[_0x25643f(0x242)][_0x25643f(0x388)]=function(_0x119fcd){const _0xcb1e38=_0x25643f;if(this[_0xcb1e38(0xa5)]===undefined)this[_0xcb1e38(0x2ed)]();return _0x119fcd-=0x1,$dataClasses[this[_0xcb1e38(0xa5)][_0x119fcd]]||null;},Game_Actor[_0x25643f(0x242)][_0x25643f(0x2e3)]=function(_0x2abc01){const _0x3a84fd=_0x25643f;return this[_0x3a84fd(0x388)](_0x2abc01);},Game_Actor[_0x25643f(0x242)]['multiclassId']=function(_0x3eee1a){const _0x1f1c53=_0x25643f,_0x2bba74=this[_0x1f1c53(0x388)](_0x3eee1a);return _0x2bba74?_0x2bba74['id']:0x0;},Game_Actor[_0x25643f(0x242)]['totalMulticlass']=function(){const _0x2ddf0c=_0x25643f;if(this['_multiclassTiers']===undefined)this[_0x2ddf0c(0x2ed)]();return this[_0x2ddf0c(0x100)]=this['_multiclassTiers'][_0x2ddf0c(0x281)](0x1,VisuMZ['ClassChangeSystem']['Settings'][_0x2ddf0c(0x19d)][_0x2ddf0c(0xba)]||0x1),this[_0x2ddf0c(0x100)];},Game_Actor[_0x25643f(0x242)][_0x25643f(0x17e)]=function(_0x39d9ef){const _0x4959a7=_0x25643f;if(this[_0x4959a7(0x100)]===undefined)this['initMulticlass']();this[_0x4959a7(0x100)]=_0x39d9ef[_0x4959a7(0x281)](0x1,VisuMZ[_0x4959a7(0x22e)]['Settings'][_0x4959a7(0x19d)][_0x4959a7(0xba)]||0x1);},Game_Actor['prototype']['addMulticlassTiers']=function(_0x1e7184){const _0x4d4b4f=_0x25643f;_0x1e7184+=this[_0x4d4b4f(0x120)](),this['setMulticlassTiers'](_0x1e7184);},Game_Actor[_0x25643f(0x242)][_0x25643f(0x17a)]=function(_0x4a4598){const _0x2076a1=_0x25643f;_0x4a4598=this['totalMulticlass']()-_0x4a4598,this[_0x2076a1(0x17e)](_0x4a4598);},Game_Actor['prototype'][_0x25643f(0x1cc)]=function(){const _0x3b658e=_0x25643f;if(this[_0x3b658e(0xa5)]===undefined)this['initMulticlass']();let _0x2642ff=![];const _0x55e768=this[_0x3b658e(0x120)]();while(this[_0x3b658e(0xa5)][_0x3b658e(0xba)]>_0x55e768){_0x2642ff=!![],this['_multiclasses'][_0x3b658e(0x142)]();}this[_0x3b658e(0xa5)][0x0]=this['currentClass']()['id'];const _0x5c22fc=this[_0x3b658e(0xa5)]['length'];for(let _0x2e9997=0x1;_0x2e9997<_0x5c22fc;_0x2e9997++){this[_0x3b658e(0xa5)][_0x2e9997]===this[_0x3b658e(0x1c0)]()['id']&&(this[_0x3b658e(0xa5)][_0x2e9997]=0x0,_0x2642ff=!![]);}if(_0x2642ff)this[_0x3b658e(0x3d3)]();},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x38c)]=Game_BattlerBase[_0x25643f(0x242)][_0x25643f(0x24c)],Game_BattlerBase[_0x25643f(0x242)]['elementRate']=function(_0x5d15f4){const _0x1193b0=_0x25643f;if(this[_0x1193b0(0x198)]())this['_multiclassCheck']=_0x1193b0(0x14b);let _0x6ad91a=VisuMZ['ClassChangeSystem'][_0x1193b0(0x38c)][_0x1193b0(0x2c8)](this,_0x5d15f4);if(this['isActor']())this[_0x1193b0(0x175)]=undefined;return _0x6ad91a;},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x9c)]=Game_BattlerBase['prototype'][_0x25643f(0x2fa)],Game_BattlerBase['prototype'][_0x25643f(0x2fa)]=function(_0x1763e0){const _0x2d957c=_0x25643f;if(this[_0x2d957c(0x198)]())this[_0x2d957c(0x175)]=_0x2d957c(0x1a1);let _0x3cfe21=VisuMZ[_0x2d957c(0x22e)]['Game_BattlerBase_debuffRate'][_0x2d957c(0x2c8)](this,_0x1763e0);if(this[_0x2d957c(0x198)]())this[_0x2d957c(0x175)]=undefined;return _0x3cfe21;},VisuMZ['ClassChangeSystem'][_0x25643f(0x25e)]=Game_BattlerBase[_0x25643f(0x242)][_0x25643f(0x109)],Game_BattlerBase[_0x25643f(0x242)][_0x25643f(0x109)]=function(_0x3c5170){const _0x57ea98=_0x25643f;if(this['isActor']())this[_0x57ea98(0x175)]=_0x57ea98(0x2ce);let _0x160cf2=VisuMZ[_0x57ea98(0x22e)][_0x57ea98(0x25e)][_0x57ea98(0x2c8)](this,_0x3c5170);if(this['isActor']())this[_0x57ea98(0x175)]=undefined;return _0x160cf2;},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x2a2)]=Game_BattlerBase[_0x25643f(0x242)][_0x25643f(0x288)],Game_BattlerBase[_0x25643f(0x242)][_0x25643f(0x288)]=function(){const _0x5e1147=_0x25643f;if(this[_0x5e1147(0x198)]())this[_0x5e1147(0x175)]=_0x5e1147(0x37a);let _0xfbabdc=VisuMZ[_0x5e1147(0x22e)]['Game_BattlerBase_stateResistSet'][_0x5e1147(0x2c8)](this);if(this[_0x5e1147(0x198)]())this[_0x5e1147(0x175)]=undefined;return _0xfbabdc;},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x122)]=Game_BattlerBase[_0x25643f(0x242)][_0x25643f(0x27a)],Game_BattlerBase[_0x25643f(0x242)]['paramRate']=function(_0x4aa54d){const _0x122fa9=_0x25643f;if(this['isActor']())this[_0x122fa9(0x175)]='ParamRates';let _0x16b119=VisuMZ[_0x122fa9(0x22e)]['Game_BattlerBase_paramRate'][_0x122fa9(0x2c8)](this,_0x4aa54d);if(this[_0x122fa9(0x198)]())this[_0x122fa9(0x175)]=undefined;return _0x16b119;},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x3d4)]=Game_BattlerBase[_0x25643f(0x242)]['xparam'],Game_BattlerBase[_0x25643f(0x242)][_0x25643f(0x1f5)]=function(_0x1f9258){const _0x4842c7=_0x25643f;if(this['isActor']())this['_multiclassCheck']=_0x4842c7(0x264);let _0x2a6e23=VisuMZ['ClassChangeSystem'][_0x4842c7(0x3d4)][_0x4842c7(0x2c8)](this,_0x1f9258);if(this['isActor']())this[_0x4842c7(0x175)]=undefined;return _0x2a6e23;},VisuMZ['ClassChangeSystem'][_0x25643f(0x1f0)]=Game_BattlerBase['prototype']['sparam'],Game_BattlerBase[_0x25643f(0x242)][_0x25643f(0x184)]=function(_0x26fcde){const _0x269d58=_0x25643f;if(this[_0x269d58(0x198)]())this['_multiclassCheck']=_0x269d58(0x231);let _0x2e9607=VisuMZ[_0x269d58(0x22e)][_0x269d58(0x1f0)]['call'](this,_0x26fcde);if(this[_0x269d58(0x198)]())this[_0x269d58(0x175)]=undefined;return _0x2e9607;},VisuMZ['ClassChangeSystem'][_0x25643f(0x3b5)]=Game_BattlerBase[_0x25643f(0x242)][_0x25643f(0xff)],Game_BattlerBase[_0x25643f(0x242)][_0x25643f(0xff)]=function(){const _0x36b943=_0x25643f;if(this[_0x36b943(0x198)]())this[_0x36b943(0x175)]=_0x36b943(0x307);let _0x31bc13=VisuMZ[_0x36b943(0x22e)][_0x36b943(0x3b5)]['call'](this);if(this[_0x36b943(0x198)]())this[_0x36b943(0x175)]=undefined;return _0x31bc13;},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x3e8)]=Game_BattlerBase[_0x25643f(0x242)]['attackStates'],Game_BattlerBase[_0x25643f(0x242)][_0x25643f(0x168)]=function(){const _0x17ddaf=_0x25643f;if(this['isActor']())this[_0x17ddaf(0x175)]=_0x17ddaf(0x362);let _0x39af8a=VisuMZ[_0x17ddaf(0x22e)][_0x17ddaf(0x3e8)]['call'](this);if(this['isActor']())this[_0x17ddaf(0x175)]=undefined;return _0x39af8a;},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x1f2)]=Game_BattlerBase[_0x25643f(0x242)][_0x25643f(0x30d)],Game_BattlerBase[_0x25643f(0x242)][_0x25643f(0x30d)]=function(_0x192f1c){const _0x5f4e86=_0x25643f;if(this['isActor']())this[_0x5f4e86(0x175)]=_0x5f4e86(0x362);let _0x3bf6b1=VisuMZ['ClassChangeSystem'][_0x5f4e86(0x1f2)][_0x5f4e86(0x2c8)](this,_0x192f1c);if(this[_0x5f4e86(0x198)]())this[_0x5f4e86(0x175)]=undefined;return _0x3bf6b1;},VisuMZ['ClassChangeSystem']['Game_BattlerBase_addedSkillTypes']=Game_BattlerBase['prototype'][_0x25643f(0x3b0)],Game_BattlerBase[_0x25643f(0x242)][_0x25643f(0x3b0)]=function(){const _0x3a0725=_0x25643f;if(this[_0x3a0725(0x198)]())this[_0x3a0725(0x175)]=_0x3a0725(0x1c5);let _0x2aff1c=VisuMZ[_0x3a0725(0x22e)]['Game_BattlerBase_addedSkillTypes'][_0x3a0725(0x2c8)](this);if(this[_0x3a0725(0x198)]())this[_0x3a0725(0x175)]=undefined;return _0x2aff1c;},VisuMZ['ClassChangeSystem'][_0x25643f(0x10f)]=Game_BattlerBase['prototype'][_0x25643f(0x172)],Game_BattlerBase['prototype'][_0x25643f(0x172)]=function(){const _0x5380e2=_0x25643f;if(this['isActor']())this[_0x5380e2(0x175)]='AddedSkills';let _0x5c106c=VisuMZ[_0x5380e2(0x22e)][_0x5380e2(0x10f)]['call'](this);if(this['isActor']())this[_0x5380e2(0x175)]=undefined;return _0x5c106c;},VisuMZ[_0x25643f(0x22e)]['Game_BattlerBase_isEquipWtypeOk']=Game_BattlerBase['prototype']['isEquipWtypeOk'],Game_BattlerBase[_0x25643f(0x242)][_0x25643f(0x2c0)]=function(_0x2fc4f4){const _0x2b9cb2=_0x25643f;if(this[_0x2b9cb2(0x198)]())this['_multiclassCheck']=_0x2b9cb2(0x1d8);let _0x3e47b1=VisuMZ[_0x2b9cb2(0x22e)][_0x2b9cb2(0x16f)][_0x2b9cb2(0x2c8)](this,_0x2fc4f4);if(this[_0x2b9cb2(0x198)]())this[_0x2b9cb2(0x175)]=undefined;return _0x3e47b1;},VisuMZ[_0x25643f(0x22e)]['Game_BattlerBase_isEquipAtypeOk']=Game_BattlerBase[_0x25643f(0x242)][_0x25643f(0x38e)],Game_BattlerBase[_0x25643f(0x242)]['isEquipAtypeOk']=function(_0x3892c5){const _0x47b1bc=_0x25643f;if(this[_0x47b1bc(0x198)]())this[_0x47b1bc(0x175)]=_0x47b1bc(0x313);let _0x22720d=VisuMZ[_0x47b1bc(0x22e)]['Game_BattlerBase_isEquipAtypeOk'][_0x47b1bc(0x2c8)](this,_0x3892c5);if(this[_0x47b1bc(0x198)]())this[_0x47b1bc(0x175)]=undefined;return _0x22720d;},VisuMZ['ClassChangeSystem'][_0x25643f(0x10e)]=Game_Actor[_0x25643f(0x242)]['traitObjects'],Game_Actor['prototype']['traitObjects']=function(){const _0x47db06=_0x25643f;let _0x33f203=VisuMZ[_0x47db06(0x22e)][_0x47db06(0x10e)][_0x47db06(0x2c8)](this);return this[_0x47db06(0x175)]&&(_0x33f203=this['applyMulticlassObjects'](_0x33f203)),_0x33f203;},Game_Actor[_0x25643f(0x242)][_0x25643f(0x28c)]=function(_0x242bd8){const _0x11489f=_0x25643f;if(this[_0x11489f(0xa5)]===undefined)this['initMulticlass']();const _0x4a4c39=this[_0x11489f(0x175)];let _0x2b7db1=_0x242bd8[_0x11489f(0x399)](this[_0x11489f(0x1c0)]());const _0x34fe4b=VisuMZ[_0x11489f(0x22e)][_0x11489f(0x193)]['Multiclass'],_0x322b02=_0x34fe4b[_0x11489f(0xba)];for(let _0x2de184=0x1;_0x2de184<_0x322b02;_0x2de184++){if('Bnqdk'===_0x11489f(0x3f6))_0x37c7b1=_0x2406ce(_0x1837b7['$1']);else{let _0x2f5425=$dataClasses[this[_0x11489f(0xa5)][_0x2de184]||0x0];if(!_0x2f5425)continue;if(_0x2f5425===this[_0x11489f(0x1c0)]())continue;const _0x11dcbd=_0x34fe4b[_0x2de184];if(!_0x11dcbd)continue;_0x11dcbd[this['_multiclassCheck']]&&_0x242bd8[_0x11489f(0xa8)](++_0x2b7db1,0x0,_0x2f5425);}}return _0x242bd8;},Game_Actor['prototype']['gainMulticlassRewardPoints']=function(_0xa6ada0,_0x6e465){const _0x27b0e5=_0x25643f;if(_0xa6ada0<=0x0)return;if(!_0x6e465)return;if(!$dataSystem[_0x27b0e5(0x2fb)]&&!this['isBattleMember']())return;this[_0x27b0e5(0x223)]();const _0x15e125=VisuMZ[_0x27b0e5(0x22e)][_0x27b0e5(0x193)][_0x27b0e5(0x19d)],_0x50ead6=_0x15e125[_0x27b0e5(0xba)];for(let _0x31c5ca=0x1;_0x31c5ca<_0x50ead6;_0x31c5ca++){if('zASLV'!==_0x27b0e5(0x2aa)){const _0x5b903e=_0xebe66c(_0x5ef5a3['$1']);if(_0x2e5f01[_0x27b0e5(0x33e)](_0x3a553c)<_0x5b903e)return![];}else{let _0x33cf09=$dataClasses[this[_0x27b0e5(0xa5)][_0x31c5ca]||0x0];if(!_0x33cf09)continue;if(_0x33cf09===this[_0x27b0e5(0x1c0)]())continue;const _0x2a0777=_0x15e125[_0x31c5ca];if(!_0x2a0777)continue;if(this[_0x27b0e5(0x398)[_0x27b0e5(0x323)](_0x6e465)]){const _0x42746e=_0x2a0777[_0x27b0e5(0x3bf)],_0x418df7=_0x42746e*_0xa6ada0;this[_0x27b0e5(0x398)['format'](_0x6e465)](_0x418df7,this['_multiclasses'][_0x31c5ca]);}}}},Game_Actor[_0x25643f(0x242)][_0x25643f(0x2cd)]=function(_0xf924b3){const _0x1b0956=_0x25643f;if(!_0xf924b3)return;if(this[_0x1b0956(0x2b2)]())return;this[_0x1b0956(0x223)]();const _0x18a09f=VisuMZ[_0x1b0956(0x22e)]['Settings'][_0x1b0956(0x19d)],_0x52b0df=_0x18a09f[_0x1b0956(0xba)];for(let _0x33ca23=0x1;_0x33ca23<_0x52b0df;_0x33ca23++){let _0x4dd3d1=$dataClasses[this[_0x1b0956(0xa5)][_0x33ca23]||0x0];if(!_0x4dd3d1)continue;if(_0x4dd3d1===this[_0x1b0956(0x1c0)]())continue;const _0x176470=_0x18a09f[_0x33ca23];if(!_0x176470)continue;const _0x10789b=_0x176470[_0x1b0956(0x158)],_0x2a9284=Math[_0x1b0956(0x185)](_0xf924b3*_0x10789b*this['finalExpRate']()),_0x278bfb=this[_0x1b0956(0xa5)][_0x33ca23];this[_0x1b0956(0x303)][_0x278bfb]=this['_exp'][_0x278bfb]||0x0;const _0x427385=this[_0x1b0956(0x303)][_0x278bfb]+_0x2a9284;this[_0x1b0956(0x28d)](_0x427385,_0x278bfb);}},Game_Actor['prototype'][_0x25643f(0x183)]=function(_0x7ce80f,_0x63d858){const _0x2bc26c=_0x25643f;if(this['_multiclasses']===undefined)this[_0x2bc26c(0x2ed)]();_0x63d858-=0x1;if(_0x7ce80f<=0x0&&_0x63d858<=0x0)return;this[_0x2bc26c(0x1d0)](_0x7ce80f);const _0x44ff9a=this[_0x2bc26c(0xa5)]['length'];for(let _0x355d90=0x0;_0x355d90<_0x44ff9a;_0x355d90++){_0x2bc26c(0x381)!=='ejoYj'?this[_0x2bc26c(0xa5)][_0x355d90]===_0x7ce80f&&(this[_0x2bc26c(0xa5)][_0x355d90]=0x0):(_0x5e0c92[_0x2bc26c(0x22e)][_0x2bc26c(0x189)][_0x2bc26c(0x2c8)](this),this[_0x2bc26c(0x26d)]());}this['_multiclasses'][0x0]=this[_0x2bc26c(0x1c0)]()['id'];if(_0x63d858<=0x0){if(_0x2bc26c(0x1d3)!==_0x2bc26c(0x1d3))this[_0x2bc26c(0x2e1)](_0x199b00[_0x2bc26c(0x1d2)]()),this[_0x2bc26c(0x401)](_0xf9ea5d[_0x2bc26c(0x156)](_0x361770),_0x3c8375+_0x516924,_0xec090f,_0x47ae89),this['resetTextColor']();else{this['changeClass'](_0x7ce80f);return;}}const _0x9df62c=JsonEx[_0x2bc26c(0xea)](this);_0x9df62c['_tempActor']=!![],this[_0x2bc26c(0xa5)][_0x63d858]=_0x7ce80f,this[_0x2bc26c(0x1cc)](),this['refresh'](),this[_0x2bc26c(0x240)](_0x9df62c),this['checkMulticlasses']();},Game_Actor['prototype'][_0x25643f(0x1e5)]=function(_0x564152){const _0x20a40b=_0x25643f;if(this['_multiclasses']===undefined)this[_0x20a40b(0x2ed)]();return this[_0x20a40b(0xa5)][0x0]=this['currentClass']()['id'],this['_multiclasses'][_0x20a40b(0x399)](_0x564152)+0x1;},Game_Actor[_0x25643f(0x242)][_0x25643f(0x28a)]=function(){const _0x147b93=_0x25643f;this[_0x147b93(0x3f8)]={},this[_0x147b93(0x3f8)][this[_0x147b93(0x1c0)]()['id']]=this[_0x147b93(0xfc)];},Game_Actor[_0x25643f(0x242)]['maintainLevels']=function(){const _0x502fa9=_0x25643f;return VisuMZ['ClassChangeSystem'][_0x502fa9(0x193)][_0x502fa9(0x294)]['MaintainLevels'];},Game_Actor[_0x25643f(0x242)][_0x25643f(0x25d)]=function(_0x2753cd){const _0x408ace=_0x25643f;if(this['maintainLevels']())return this[_0x408ace(0xfc)];return this[_0x408ace(0x3cd)](_0x2753cd),this['_classLevel'][_0x2753cd];},Game_Actor[_0x25643f(0x242)][_0x25643f(0x28d)]=function(_0x521f6a,_0x58e5d4){const _0x23aabf=_0x25643f;if(this['maintainLevels']())return this[_0x23aabf(0x2e6)](_0x521f6a);this['_exp'][_0x58e5d4]=Math[_0x23aabf(0x34b)](_0x521f6a,0x0),this[_0x23aabf(0x3cd)](_0x58e5d4);if(_0x58e5d4===this[_0x23aabf(0x1c0)]()['id'])this[_0x23aabf(0x3d3)]();},Game_Actor[_0x25643f(0x242)][_0x25643f(0x3cd)]=function(_0x52036b){const _0x238af3=_0x25643f;if(this[_0x238af3(0x2b2)]())return;this[_0x238af3(0x303)][_0x52036b]=this[_0x238af3(0x303)][_0x52036b]||0x0,this[_0x238af3(0x3f8)]=this['_classLevel']||{},this['_classLevel'][_0x52036b]=this[_0x238af3(0x3f8)][_0x52036b]||0x1;while(!(this['_classLevel'][_0x52036b]>=this[_0x238af3(0x238)]())&&this[_0x238af3(0x303)][_0x52036b]>=this[_0x238af3(0xcd)](_0x52036b,this[_0x238af3(0x3f8)][_0x52036b])){'OjhqO'==='OjhqO'?(this['_classLevel'][_0x52036b]+=0x1,this['classLevelUp'](_0x52036b)):_0x444ec1*=this[_0x238af3(0x2e5)]();}while(this[_0x238af3(0x303)][_0x52036b]<this[_0x238af3(0x2d0)](_0x52036b,this[_0x238af3(0x3f8)][_0x52036b])){this['_classLevel'][_0x52036b]-=0x1;}this[_0x238af3(0x1df)]();},Game_Actor[_0x25643f(0x242)][_0x25643f(0x145)]=function(_0x423ac4,_0xc82601){const _0x5c641b=_0x25643f,_0x168cd8=$dataClasses[_0x423ac4],_0x2f2e3c=_0x168cd8[_0x5c641b(0x1fa)][0x0],_0x2f30b4=_0x168cd8['expParams'][0x1],_0x320c3e=_0x168cd8['expParams'][0x2],_0x3cd76b=_0x168cd8[_0x5c641b(0x1fa)][0x3];return Math['round'](_0x2f2e3c*Math[_0x5c641b(0x251)](_0xc82601-0x1,0.9+_0x320c3e/0xfa)*_0xc82601*(_0xc82601+0x1)/(0x6+Math['pow'](_0xc82601,0x2)/0x32/_0x3cd76b)+(_0xc82601-0x1)*_0x2f30b4);},Game_Actor[_0x25643f(0x242)][_0x25643f(0xcd)]=function(_0x15834f,_0x3e60fe){const _0x587609=_0x25643f;return this[_0x587609(0x145)](_0x15834f,_0x3e60fe+0x1);},Game_Actor[_0x25643f(0x242)][_0x25643f(0x2d0)]=function(_0x1c7d31,_0x1ddcb5){return this['expForClassLevel'](_0x1c7d31,_0x1ddcb5);},Game_Actor[_0x25643f(0x242)][_0x25643f(0x1f8)]=function(_0x3896e0){const _0x441735=_0x25643f;this[_0x441735(0xd1)](_0x3896e0),this[_0x441735(0x1b2)](_0x3896e0),Imported['VisuMZ_2_SkillLearnSystem']&&(this[_0x441735(0x35b)](_0x3896e0),this[_0x441735(0x2bb)](_0x3896e0));},Game_Actor[_0x25643f(0x242)]['updateClassLearnedSkills']=function(){const _0x15261c=_0x25643f;if(this['_updateClassLearnedSkills'])return;this[_0x15261c(0x351)]=!![];const _0xdd0410=DataManager[_0x15261c(0x3d2)](this);for(const _0x54b719 of _0xdd0410){if(!_0x54b719)continue;const _0x77e81f=_0x54b719[_0x15261c(0x30e)];if(!_0x77e81f)continue;for(const _0x428b50 of _0x77e81f){if(_0x15261c(0xa1)!==_0x15261c(0x2a0)){if(this[_0x15261c(0x2f6)](_0x428b50[_0x15261c(0x217)]))continue;if(this[_0x15261c(0x25d)](_0x54b719['id'])>=_0x428b50[_0x15261c(0xfc)]){const _0x38d4d6=this[_0x15261c(0x141)]||{};this['learnSkill'](_0x428b50[_0x15261c(0x217)]),this[_0x15261c(0x141)]=_0x38d4d6;}}else for(const _0x7b4544 of _0x2cf968){this[_0x15261c(0x1d0)](_0x7b4544);}}}this[_0x15261c(0x351)]=![];},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x203)]=Game_Actor['prototype'][_0x25643f(0x2d9)],Game_Actor['prototype'][_0x25643f(0x2d9)]=function(_0x4906c2){const _0x3432b6=_0x25643f;let _0x560f46=VisuMZ[_0x3432b6(0x22e)][_0x3432b6(0x203)][_0x3432b6(0x2c8)](this,_0x4906c2);this[_0x3432b6(0x223)]();const _0x455be9=VisuMZ[_0x3432b6(0x22e)][_0x3432b6(0x193)][_0x3432b6(0x19d)],_0x25c669='paramRate%1'['format'](_0x4906c2),_0xc31b5c=_0x455be9[_0x3432b6(0xba)];for(let _0x1ee8b0=0x1;_0x1ee8b0<_0xc31b5c;_0x1ee8b0++){if(_0x3432b6(0x297)!=='BfLrf'){let _0x3e2b1d=$dataClasses[this['_multiclasses'][_0x1ee8b0]||0x0];if(!_0x3e2b1d)continue;if(_0x3e2b1d===this[_0x3432b6(0x1c0)]())continue;const _0x97bd5f=_0x455be9[_0x1ee8b0];if(!_0x97bd5f)continue;const _0x59773d=_0x97bd5f[_0x25c669];_0x560f46+=_0x59773d*this[_0x3432b6(0x2c1)](this[_0x3432b6(0xa5)][_0x1ee8b0],_0x4906c2);}else _0x4256ba['ClassChangeSystem']['BattleManager_displayRewards'][_0x3432b6(0x2c8)](this),this['displayRewardsClassPoints'](),this[_0x3432b6(0x243)]();}return _0x560f46;},Game_Actor[_0x25643f(0x242)][_0x25643f(0x2c1)]=function(_0x484bd5,_0x9e337f){const _0xf021d9=_0x25643f,_0x56747f=$dataClasses[_0x484bd5],_0x42da2d=this[_0xf021d9(0x25d)](_0x484bd5);if(_0x42da2d>0x63){const _0x2b153f=_0x56747f[_0xf021d9(0x406)][_0x9e337f][0x63],_0x10d2a5=_0x56747f[_0xf021d9(0x406)][_0x9e337f][0x62];return _0x2b153f+(_0x2b153f-_0x10d2a5)*(_0x42da2d-0x63);}else return _0x56747f[_0xf021d9(0x406)][_0x9e337f][_0x42da2d];},Game_Actor[_0x25643f(0x242)][_0x25643f(0x246)]=function(_0x33cab1){const _0x465985=_0x25643f;if(this[_0x465985(0x3f8)][_0x33cab1]>=this[_0x465985(0x238)]())return 0x1;const _0x2beb28=this[_0x465985(0x25d)](_0x33cab1),_0x2dc0ae=this[_0x465985(0xcd)](_0x33cab1,_0x2beb28)-this['currentClassLevelExp'](_0x33cab1,_0x2beb28);this[_0x465985(0x303)][_0x33cab1]=this[_0x465985(0x303)][_0x33cab1]||0x0;const _0x1b0a03=this[_0x465985(0x303)][_0x33cab1]-this[_0x465985(0x2d0)](_0x33cab1,_0x2beb28);return(_0x1b0a03/_0x2dc0ae)[_0x465985(0x281)](0x0,0x1);},Game_Actor[_0x25643f(0x242)]['checkForAutoClassUnlocks']=function(){const _0x4b7290=_0x25643f;for(;;){const _0x578e5c=DataManager['checkForNewUnlockedClasses'](this);if(_0x578e5c[_0x4b7290(0xba)]>0x0)for(const _0x584898 of _0x578e5c){this[_0x4b7290(0x1d0)](_0x584898);}else break;}},Game_Actor[_0x25643f(0x242)][_0x25643f(0x1a8)]=function(){const _0x11c60d=_0x25643f;let _0x28459c=[];const _0x58ddc5=VisuMZ[_0x11c60d(0x22e)][_0x11c60d(0x287)],_0x53f547=this[_0x11c60d(0xef)]()[_0x11c60d(0x1f7)],_0x2daacf=_0x53f547['match'](_0x58ddc5['RestrictClassChangeTier']);if(_0x2daacf)for(const _0x2b2555 of _0x2daacf){if(!_0x2b2555)continue;_0x2b2555[_0x11c60d(0x187)](_0x58ddc5['RestrictClassChangeTier']);const _0x7b212e=String(RegExp['$1'])[_0x11c60d(0x1ca)](',')[_0x11c60d(0x402)](_0x5c4d8e=>Number(_0x5c4d8e));_0x28459c=_0x28459c['concat'](_0x7b212e);}_0x28459c=_0x28459c[_0x11c60d(0x33f)]((_0x116415,_0x432ad5,_0x245fa0)=>_0x245fa0['indexOf'](_0x116415)===_0x432ad5),_0x28459c['remove'](null)[_0x11c60d(0x306)](undefined),_0x28459c[_0x11c60d(0x322)]((_0x46b397,_0x1946e1)=>_0x46b397-_0x1946e1),this['_classChangeTierRestrictions']=_0x28459c;},Game_Actor[_0x25643f(0x242)][_0x25643f(0x1de)]=function(_0x490d36){const _0x92559c=_0x25643f;return this['_classChangeTierRestrictions']===undefined&&this[_0x92559c(0x1a8)](),this[_0x92559c(0x27e)][_0x92559c(0xf5)](_0x490d36);},Game_Actor[_0x25643f(0x242)][_0x25643f(0x3e9)]=function(_0x7c5c86){const _0x2b2a3a=_0x25643f;this[_0x2b2a3a(0x27e)]===undefined&&this['initClassChangeRestrictions']();if(this[_0x2b2a3a(0x27e)][_0x2b2a3a(0xf5)](_0x7c5c86))return;this[_0x2b2a3a(0x27e)][_0x2b2a3a(0x151)](_0x7c5c86),this['_classChangeTierRestrictions']['sort']((_0x15cc27,_0x448f10)=>_0x15cc27-_0x448f10);},Game_Actor[_0x25643f(0x242)]['removeClassChangeTierRestriction']=function(_0x2b2902){const _0x5022ca=_0x25643f;this['_classChangeTierRestrictions']===undefined&&this['initClassChangeRestrictions']();if(!this['_classChangeTierRestrictions']['includes'](_0x2b2902))return;this[_0x5022ca(0x27e)][_0x5022ca(0x306)](_0x2b2902),this['_classChangeTierRestrictions'][_0x5022ca(0x322)]((_0x2739e6,_0x58f385)=>_0x2739e6-_0x58f385);},Game_Enemy[_0x25643f(0x242)][_0x25643f(0x16e)]=function(){const _0x1529f5=_0x25643f,_0x1f3b0d=VisuMZ['ClassChangeSystem']['Settings'][_0x1529f5(0x3b9)],_0x56018e=VisuMZ[_0x1529f5(0x22e)][_0x1529f5(0x287)],_0x4a8d6c=this['enemy']()[_0x1529f5(0x1f7)];if(_0x4a8d6c[_0x1529f5(0x187)](_0x56018e[_0x1529f5(0xec)]))try{return eval(RegExp['$1']);}catch(_0x363a17){if(_0x1529f5(0x1be)!==_0x1529f5(0x1be)){let _0x11a5e7=_0x4b34dc['ClassChangeSystem'][_0x1529f5(0x10e)][_0x1529f5(0x2c8)](this);return this[_0x1529f5(0x175)]&&(_0x11a5e7=this[_0x1529f5(0x28c)](_0x11a5e7)),_0x11a5e7;}else{if($gameTemp[_0x1529f5(0x3ea)]())console[_0x1529f5(0x354)](_0x363a17);return 0x0;}}try{return eval(_0x1f3b0d['PerEnemy']);}catch(_0x24acf1){if(_0x1529f5(0x26c)!==_0x1529f5(0x26c))return _0x27c6be[_0x1529f5(0x2eb)]&&_0x1bbfab[_0x1529f5(0x198)]()&&_0x51f604[_0x1529f5(0x175)]!==_0x2901de&&_0x3426f3===_0x4b4c64[_0x1529f5(0x2de)]&&_0x2b0857[_0x1529f5(0x1fd)]();else{if($gameTemp['isPlaytest']())console[_0x1529f5(0x354)](_0x24acf1);return 0x0;}}},Game_Enemy[_0x25643f(0x242)][_0x25643f(0x1cd)]=function(){const _0xb47b92=_0x25643f,_0x2fe060=VisuMZ['ClassChangeSystem'][_0xb47b92(0x193)][_0xb47b92(0x268)],_0x3a3cd9=VisuMZ[_0xb47b92(0x22e)][_0xb47b92(0x287)],_0x5cb0ea=this[_0xb47b92(0xa2)]()[_0xb47b92(0x1f7)];if(_0x5cb0ea['match'](_0x3a3cd9[_0xb47b92(0x3db)]))try{return eval(RegExp['$1']);}catch(_0x116a41){if(_0xb47b92(0x164)!==_0xb47b92(0x2ae)){if($gameTemp[_0xb47b92(0x3ea)]())console['log'](_0x116a41);return 0x0;}else{const _0x28bf0a=_0x28f3c6[_0x3ca5c0-0x1];_0x28bf0a&&(this[_0xb47b92(0x2e1)](_0xe68aae['getColor'](_0x28bf0a[_0xb47b92(0x1d7)])),this[_0xb47b92(0x401)](_0x28bf0a[_0xb47b92(0x32d)],_0x3c795d['x'],_0x1e4e2b['y'],_0x31e19f[_0xb47b92(0x1e4)],'center'),this['resetTextColor']());}}try{if('EWebK'===_0xb47b92(0x2f8))this[_0xb47b92(0x253)][_0xb47b92(0xe5)](_0x3a0c6d[_0xb47b92(0x30b)]);else return eval(_0x2fe060['PerEnemy']);}catch(_0x5a3389){if($gameTemp[_0xb47b92(0x3ea)]())console[_0xb47b92(0x354)](_0x5a3389);return 0x0;}},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x189)]=Game_Party[_0x25643f(0x242)][_0x25643f(0x299)],Game_Party[_0x25643f(0x242)]['initialize']=function(){const _0x1760c1=_0x25643f;VisuMZ['ClassChangeSystem'][_0x1760c1(0x189)][_0x1760c1(0x2c8)](this),this[_0x1760c1(0x26d)]();},Game_Party[_0x25643f(0x242)]['initClassChangeUnlocks']=function(){const _0x5a1115=_0x25643f;this[_0x5a1115(0x20d)]=[];},Game_Party[_0x25643f(0x242)][_0x25643f(0x39a)]=function(){const _0x12fa82=_0x25643f;if(this[_0x12fa82(0x20d)]===undefined)this[_0x12fa82(0x26d)]();return this[_0x12fa82(0x20d)];},Game_Party['prototype'][_0x25643f(0x1d0)]=function(_0xe766f7){const _0x124cc1=_0x25643f;for(const _0x3231ba of this[_0x124cc1(0x3fb)]()){if('uQnPy'!=='uQnPy')_0x149937=_0x34dcaf||this[_0x124cc1(0x1c0)]()['id'];else{if(!_0x3231ba)continue;_0x3231ba[_0x124cc1(0x1d0)](_0xe766f7);}}if(this['_unlockedClasses']===undefined)this[_0x124cc1(0x26d)]();if(this[_0x124cc1(0x20d)][_0x124cc1(0xf5)](_0xe766f7))return;this[_0x124cc1(0x20d)][_0x124cc1(0x151)](_0xe766f7),this[_0x124cc1(0x20d)][_0x124cc1(0x322)](function(_0xa9f205,_0x1254fa){const _0x4d28e9=_0x124cc1;if(_0x4d28e9(0x3e0)==='cxuWd')return _0xa9f205-_0x1254fa;else _0x1cbe60[_0x4d28e9(0x242)][_0x4d28e9(0x179)][_0x4d28e9(0x2c8)](this),this[_0x4d28e9(0x165)](),this[_0x4d28e9(0x1b8)](),this['createClassTierWindow'](),this['createClassListWindow'](),this[_0x4d28e9(0x2af)](),this['refreshActor']();});},Game_Party[_0x25643f(0x242)]['removeUnlockedClass']=function(_0x366511){const _0x3b0d03=_0x25643f;for(const _0x229414 of this[_0x3b0d03(0x3fb)]()){if(!_0x229414)continue;_0x229414[_0x3b0d03(0x3b7)](_0x366511);}if(this[_0x3b0d03(0x20d)]===undefined)this[_0x3b0d03(0x26d)]();if(!this[_0x3b0d03(0x20d)][_0x3b0d03(0xf5)](_0x366511))return;this[_0x3b0d03(0x20d)][_0x3b0d03(0x306)](_0x366511)['remove'](null),this[_0x3b0d03(0x20d)][_0x3b0d03(0x322)](function(_0xa8bc81,_0x3ea535){return _0xa8bc81-_0x3ea535;});},Game_Party[_0x25643f(0x242)][_0x25643f(0x9e)]=function(){const _0x4aa16f=_0x25643f,_0x4f4350=this[_0x4aa16f(0x3fb)]();return Math[_0x4aa16f(0x34b)](...this[_0x4aa16f(0xc6)]()[_0x4aa16f(0x402)](_0x49b0c3=>_0x49b0c3[_0x4aa16f(0x120)]()));},Game_Troop[_0x25643f(0x242)][_0x25643f(0x199)]=function(){const _0x32868b=_0x25643f;return this[_0x32868b(0x3a2)]()[_0x32868b(0x234)]((_0x848692,_0x4e7667)=>_0x848692+_0x4e7667[_0x32868b(0x16e)](),0x0);},Game_Troop[_0x25643f(0x242)]['jobPointsTotal']=function(){const _0x540947=_0x25643f;return this[_0x540947(0x3a2)]()[_0x540947(0x234)]((_0x1d3c88,_0x51ef29)=>_0x1d3c88+_0x51ef29[_0x540947(0x1cd)](),0x0);},VisuMZ['ClassChangeSystem'][_0x25643f(0x3a7)]=Scene_Menu[_0x25643f(0x242)][_0x25643f(0xc8)],Scene_Menu[_0x25643f(0x242)][_0x25643f(0xc8)]=function(){const _0x164f64=_0x25643f;VisuMZ[_0x164f64(0x22e)][_0x164f64(0x3a7)][_0x164f64(0x2c8)](this);const _0x4b8b68=this[_0x164f64(0x2e8)];_0x4b8b68[_0x164f64(0x161)](_0x164f64(0x22e),this['commandPersonal'][_0x164f64(0x149)](this));},VisuMZ[_0x25643f(0x22e)]['Scene_Menu_onPersonalOk']=Scene_Menu[_0x25643f(0x242)]['onPersonalOk'],Scene_Menu['prototype'][_0x25643f(0x267)]=function(){const _0x461b0a=_0x25643f;this['_commandWindow'][_0x461b0a(0x311)]()===_0x461b0a(0x22e)?SceneManager[_0x461b0a(0x151)](Scene_ClassChange):_0x461b0a(0xa4)===_0x461b0a(0x256)?_0x13f08d[_0x461b0a(0x374)](_0x1a0448[_0x461b0a(0x22e)][_0x461b0a(0x193)][_0x461b0a(0x2fe)]):VisuMZ[_0x461b0a(0x22e)][_0x461b0a(0xc2)][_0x461b0a(0x2c8)](this);};function Scene_ClassChange(){const _0x270f03=_0x25643f;this[_0x270f03(0x299)](...arguments);}Scene_ClassChange[_0x25643f(0x242)]=Object[_0x25643f(0x179)](Scene_MenuBase['prototype']),Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x3d1)]=Scene_ClassChange,Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x299)]=function(){const _0x38a73a=_0x25643f;Scene_MenuBase[_0x38a73a(0x242)][_0x38a73a(0x299)]['call'](this),this[_0x38a73a(0x1bd)]=this[_0x38a73a(0x1bd)]||[];},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x118)]=function(){return!![];},Scene_ClassChange['prototype']['arePageButtonsEnabled']=function(){const _0x17ebb8=_0x25643f;if(this[_0x17ebb8(0xc0)]()>0x1)return this['_classTierWindow']&&this[_0x17ebb8(0x364)][_0x17ebb8(0x2ea)];else{if(_0x17ebb8(0x32a)===_0x17ebb8(0x32a))return this[_0x17ebb8(0x20c)]&&this['_classListWindow']['active'];else{const _0x34f2e6=this[_0x17ebb8(0x3f1)];_0x33b8a8['x']=_0x34f2e6['x']+_0x584ac5['round'](_0x34f2e6[_0x17ebb8(0x1e4)]/0x2),_0x29a270['y']=_0x34f2e6['y']+_0xa78bec[_0x17ebb8(0x185)](_0x34f2e6[_0x17ebb8(0x3cb)]/0x2),_0x11c55b['x']+=_0x11b756[_0x17ebb8(0x3a4)]||0x0,_0x134d15['y']+=_0x454caa[_0x17ebb8(0x2f7)]||0x0;}}},Scene_ClassChange[_0x25643f(0x242)]['update']=function(){const _0x2d0647=_0x25643f;Scene_MenuBase[_0x2d0647(0x242)]['update']['call'](this),this['updateClassChangeAnimations']();},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x138)]=function(){return!![];},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x2d4)]=function(){const _0x3ce53d=_0x25643f;if(ConfigManager[_0x3ce53d(0x260)]&&ConfigManager['uiHelpPosition']!==undefined)return _0x3ce53d(0x126)==='mnnvQ'?ConfigManager[_0x3ce53d(0x36b)]:_0x35095d[_0x3ce53d(0xda)]['Game_Actor_equips'][_0x3ce53d(0x2c8)](this);else{if(this[_0x3ce53d(0x3a9)]())return this[_0x3ce53d(0x32c)]()[_0x3ce53d(0x187)](/LOWER/i);else _0x3ce53d(0x33b)!==_0x3ce53d(0x3c3)?Scene_MenuBase[_0x3ce53d(0x242)][_0x3ce53d(0xc3)][_0x3ce53d(0x2c8)](this):this['initialize'](...arguments);}},Scene_ClassChange[_0x25643f(0x242)]['isRightInputMode']=function(){const _0x3f712e=_0x25643f;if(ConfigManager[_0x3f712e(0x260)]&&ConfigManager['uiInputPosition']!==undefined){if(_0x3f712e(0x2d1)===_0x3f712e(0x2d1))return ConfigManager[_0x3f712e(0xbf)];else _0x1b3b27['addClassPoints'](_0x5f5063,_0x38ba56);}else{if(this[_0x3f712e(0x3a9)]())return this[_0x3f712e(0x32c)]()['match'](/RIGHT/i);else'JtvYe'!==_0x3f712e(0x2f2)?(_0x1dff06[_0x3f712e(0x242)]['initialize']['call'](this,_0x262a77),this[_0x3f712e(0x2da)](),this[_0x3f712e(0x235)]()):Scene_MenuBase[_0x3f712e(0x242)][_0x3f712e(0xc3)][_0x3f712e(0x2c8)](this);}},Scene_ClassChange[_0x25643f(0x242)]['updatedLayoutStyle']=function(){const _0x1ca695=_0x25643f;return VisuMZ[_0x1ca695(0x22e)][_0x1ca695(0x193)][_0x1ca695(0x208)][_0x1ca695(0x3c8)];},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x3a9)]=function(){const _0x1b76c9=_0x25643f;return VisuMZ['ClassChangeSystem'][_0x1b76c9(0x193)][_0x1b76c9(0x208)]['EnableLayout'];},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x179)]=function(){const _0x500fdc=_0x25643f;Scene_MenuBase['prototype'][_0x500fdc(0x179)]['call'](this),this[_0x500fdc(0x165)](),this['createStatusWindow'](),this[_0x500fdc(0xb6)](),this[_0x500fdc(0x17c)](),this[_0x500fdc(0x2af)](),this['refreshActor']();},Scene_ClassChange['prototype'][_0x25643f(0x1b8)]=function(){const _0x5e7ae8=_0x25643f,_0x33b447=this['statusWindowRect']();this[_0x5e7ae8(0x3f1)]=new Window_ClassStatus(_0x33b447),this['addWindow'](this[_0x5e7ae8(0x3f1)]),this[_0x5e7ae8(0x3f1)]['setBackgroundType'](VisuMZ[_0x5e7ae8(0x22e)][_0x5e7ae8(0x193)][_0x5e7ae8(0x208)][_0x5e7ae8(0x3f0)]);},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x1c7)]=function(){const _0x780abc=_0x25643f,_0x62ed9c=VisuMZ['ClassChangeSystem'][_0x780abc(0x193)][_0x780abc(0x208)];if(_0x62ed9c['Window_ClassStatus_RectJS']){if(_0x780abc(0xdc)===_0x780abc(0x2b3))this[_0x780abc(0x314)]!==_0x265e66&&(this[_0x780abc(0x314)]=_0x5f3d71,this[_0x780abc(0x3d3)]());else return _0x62ed9c[_0x780abc(0x2a8)]['call'](this);}const _0x119a9a=Math['floor'](Graphics['boxWidth']/0x2),_0x5b6d3c=this[_0x780abc(0x121)](),_0x298adc=this[_0x780abc(0xc3)]()?0x0:_0x119a9a,_0x3f93da=this['mainAreaTop']();return new Rectangle(_0x298adc,_0x3f93da,_0x119a9a,_0x5b6d3c);},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0xb6)]=function(){const _0x56ba8e=_0x25643f,_0x50915d=this[_0x56ba8e(0x19c)](),_0x5b5066=new Window_ClassTier(_0x50915d);_0x5b5066[_0x56ba8e(0x19e)](this[_0x56ba8e(0x253)]),_0x5b5066['setBackgroundType'](VisuMZ[_0x56ba8e(0x22e)][_0x56ba8e(0x193)][_0x56ba8e(0x208)]['Window_ClassTier_BgType']),this[_0x56ba8e(0x18a)](_0x5b5066),this[_0x56ba8e(0x364)]=_0x5b5066,_0x5b5066['setHandler']('cancel',this['popScene']['bind'](this)),this[_0x56ba8e(0xc0)]()>0x1&&(_0x5b5066[_0x56ba8e(0x161)](_0x56ba8e(0x332),this[_0x56ba8e(0x3f7)][_0x56ba8e(0x149)](this)),_0x5b5066[_0x56ba8e(0x161)]('pageup',this[_0x56ba8e(0xce)][_0x56ba8e(0x149)](this))),_0x5b5066[_0x56ba8e(0x161)](_0x56ba8e(0x283),this[_0x56ba8e(0x304)][_0x56ba8e(0x149)](this));},Scene_ClassChange['prototype'][_0x25643f(0x19c)]=function(){const _0x219396=_0x25643f,_0x29cc6f=VisuMZ[_0x219396(0x22e)][_0x219396(0x193)][_0x219396(0x208)];if(_0x29cc6f[_0x219396(0xfe)])return _0x29cc6f['Window_ClassTier_RectJS'][_0x219396(0x2c8)](this);const _0x1711c7=Graphics[_0x219396(0x249)]-this[_0x219396(0x3f1)][_0x219396(0x1e4)],_0xd0137e=this[_0x219396(0x121)](),_0x4e2289=this[_0x219396(0xc3)]()?_0x1711c7:0x0,_0x5c36c0=this[_0x219396(0x32f)]();return new Rectangle(_0x4e2289,_0x5c36c0,_0x1711c7,_0xd0137e);},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x17c)]=function(){const _0x4f2e27=_0x25643f,_0x14f1cf=this[_0x4f2e27(0x2a3)](),_0x8f965c=new Window_ClassList(_0x14f1cf);_0x8f965c[_0x4f2e27(0x19e)](this[_0x4f2e27(0x253)]),_0x8f965c['setStatusWindow'](this['_statusWindow']),_0x8f965c[_0x4f2e27(0xb8)](VisuMZ['ClassChangeSystem'][_0x4f2e27(0x193)][_0x4f2e27(0x208)][_0x4f2e27(0x3bb)]),this['addWindow'](_0x8f965c),this[_0x4f2e27(0x20c)]=_0x8f965c,_0x8f965c['setHandler']('cancel',this[_0x4f2e27(0x361)][_0x4f2e27(0x149)](this)),this[_0x4f2e27(0xc0)]()<=0x1&&(_0x8f965c[_0x4f2e27(0x161)]('pagedown',this[_0x4f2e27(0x3f7)][_0x4f2e27(0x149)](this)),_0x8f965c[_0x4f2e27(0x161)](_0x4f2e27(0x2e9),this[_0x4f2e27(0xce)]['bind'](this))),_0x8f965c[_0x4f2e27(0x161)](_0x4f2e27(0x339),this['onClassListOk'][_0x4f2e27(0x149)](this));},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x2a3)]=function(){const _0x272b35=_0x25643f,_0x5cb241=VisuMZ[_0x272b35(0x22e)][_0x272b35(0x193)][_0x272b35(0x208)];if(_0x5cb241['Window_ClassList_RectJS']){if(_0x272b35(0x3a6)===_0x272b35(0x3a6))return _0x5cb241[_0x272b35(0xeb)][_0x272b35(0x2c8)](this);else{const _0x187692=this[_0x272b35(0x364)][_0x272b35(0x1e2)]();this[_0x272b35(0x20c)]['setTier'](_0x187692),this['_classListWindow'][_0x272b35(0x157)](),this[_0x272b35(0x20c)][_0x272b35(0x368)](),this[_0x272b35(0x20c)][_0x272b35(0xca)](0x0),this[_0x272b35(0x364)][_0x272b35(0x369)](),this['_classTierWindow'][_0x272b35(0x235)](),this[_0x272b35(0x248)]();}}const _0x5837c8=Graphics[_0x272b35(0x249)]-this[_0x272b35(0x3f1)][_0x272b35(0x1e4)],_0x4740da=this[_0x272b35(0x121)](),_0x3e8a44=this[_0x272b35(0xc3)]()?_0x5837c8:0x0,_0x519dec=this[_0x272b35(0x32f)]();return new Rectangle(_0x3e8a44,_0x519dec,_0x5837c8,_0x4740da);},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0xc0)]=function(){const _0x4cb9fd=_0x25643f;if(this['_highestTier']!==undefined)return this[_0x4cb9fd(0x2b0)];return this[_0x4cb9fd(0x2b0)]=$gameParty['highestMulticlassTier'](),this['_highestTier'];},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x2af)]=function(){const _0x364de3=_0x25643f;if(this[_0x364de3(0xc0)]()>0x1){if('HqAUl'!==_0x364de3(0xaf))this[_0x364de3(0x364)][_0x364de3(0xca)](0x0),this[_0x364de3(0x364)][_0x364de3(0x157)](),this[_0x364de3(0x364)][_0x364de3(0x368)](),this['_classListWindow'][_0x364de3(0x369)](),this['_classListWindow'][_0x364de3(0x235)]();else{this[_0x364de3(0xbe)]===_0xf63ba2&&this[_0x364de3(0x1a9)]();const _0x48752f=_0x3a5025['ClassChangeSystem'][_0x364de3(0x193)][_0x364de3(0x3b9)];return _0x48752f[_0x364de3(0x232)]?_0x204e44=0x0:_0x78722e=_0x1810b4||this[_0x364de3(0x1c0)]()['id'],this['_classPoints'][_0x3a1b12]=this['_classPoints'][_0x38e70a]||0x0,_0x38f180[_0x364de3(0x185)](this[_0x364de3(0xbe)][_0x6e31d1]);}}else{if(_0x364de3(0x1a2)!==_0x364de3(0x1a2)){if(!_0x58cca7)return _0x3096c0;const _0x107db5='Actor-%1-Class-%2'['format'](_0x9e810[_0x364de3(0x1c8)](),_0x1072a7['currentClass']()['id']);return _0x34001c[_0x364de3(0x1b4)][_0x107db5]??_0x12b2d3;}else this[_0x364de3(0x20c)][_0x364de3(0xca)](0x0),this[_0x364de3(0x20c)][_0x364de3(0x34f)](0x1),this['_classListWindow']['show'](),this[_0x364de3(0x20c)][_0x364de3(0x368)](),this['_classTierWindow'][_0x364de3(0x369)](),this[_0x364de3(0x364)][_0x364de3(0x235)]();}},Scene_ClassChange[_0x25643f(0x242)]['refreshActor']=function(){const _0x13b052=_0x25643f,_0x2af13d=this[_0x13b052(0xef)]();_0x2af13d[_0x13b052(0x186)](),this[_0x13b052(0x3f1)][_0x13b052(0x3a0)](_0x2af13d),this[_0x13b052(0x364)]['setActor'](_0x2af13d),this[_0x13b052(0x20c)][_0x13b052(0x3a0)](_0x2af13d);},Scene_ClassChange[_0x25643f(0x242)]['onActorChange']=function(){const _0x4ad445=_0x25643f;Scene_MenuBase['prototype']['onActorChange'][_0x4ad445(0x2c8)](this),this[_0x4ad445(0x3fd)](),this['determineActiveWindow']();},Scene_ClassChange['prototype'][_0x25643f(0x304)]=function(){const _0x36a81d=_0x25643f,_0x486ff9=this[_0x36a81d(0x364)][_0x36a81d(0x1e2)]();this[_0x36a81d(0x20c)]['setTier'](_0x486ff9),this[_0x36a81d(0x20c)][_0x36a81d(0x157)](),this[_0x36a81d(0x20c)][_0x36a81d(0x368)](),this[_0x36a81d(0x20c)][_0x36a81d(0xca)](0x0),this['_classTierWindow']['hide'](),this[_0x36a81d(0x364)][_0x36a81d(0x235)](),this[_0x36a81d(0x248)]();},Scene_ClassChange['prototype'][_0x25643f(0x361)]=function(){const _0x301382=_0x25643f;this['highestTier']()>0x1?(this[_0x301382(0x364)][_0x301382(0x157)](),this['_classTierWindow'][_0x301382(0x368)](),this[_0x301382(0x20c)][_0x301382(0x369)](),this[_0x301382(0x20c)][_0x301382(0x235)](),this[_0x301382(0x3f1)][_0x301382(0x14e)](null)):this[_0x301382(0x2df)]();},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x2b4)]=function(){const _0x77de3b=_0x25643f,_0x1db721=this[_0x77de3b(0x20c)]['_tier'],_0x2013f0=this[_0x77de3b(0x20c)][_0x77de3b(0x1e2)](),_0x14b4f3=this[_0x77de3b(0x20c)][_0x77de3b(0x3d7)](),_0x4f629b=_0x2013f0?_0x2013f0['id']:0x0;this[_0x77de3b(0x3aa)]['changeMulticlass'](_0x4f629b,_0x1db721),this['_classTierWindow'][_0x77de3b(0x3d3)](),this[_0x77de3b(0x20c)]['refresh'](),this[_0x77de3b(0x3f1)]['setTempActor'](null),this['startClassChangeAnimation'](_0x4f629b,_0x1db721),this[_0x77de3b(0x2af)]();if(this[_0x77de3b(0x364)][_0x77de3b(0x2ea)]){if(_0x77de3b(0x140)!==_0x77de3b(0x215))this['_classTierWindow'][_0x77de3b(0x345)](_0x1db721-0x1);else{if(this['_helpWindow']){if(this[_0x77de3b(0x1e2)]()){const _0x286053=_0x2bcf69[_0x77de3b(0x22e)][_0x77de3b(0x193)][_0x77de3b(0x19d)];if(!_0x286053)return;const _0x10e6dc=_0x286053[this[_0x77de3b(0x1e2)]()-0x1];if(!_0x10e6dc)return;this[_0x77de3b(0x253)][_0x77de3b(0xe5)](_0x10e6dc[_0x77de3b(0x188)]);}else this['_helpWindow'][_0x77de3b(0xe5)]('');}}}else this['_classListWindow'][_0x77de3b(0x2ea)]&&this[_0x77de3b(0x20c)][_0x77de3b(0x345)](_0x14b4f3);},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x1c3)]=function(_0xa47b45,_0x4c9733){const _0x5b611b=_0x25643f,_0xc22fe9=this[_0x5b611b(0x278)](_0x4c9733);this[_0x5b611b(0x348)](_0xa47b45,_0x4c9733,_0xc22fe9);},Scene_ClassChange[_0x25643f(0x242)]['createAnimationDummySprite']=function(_0x65e9f9){const _0x32b1ae=_0x25643f,_0x55b0f5=new Sprite(),_0x27af26=VisuMZ['ClassChangeSystem'][_0x32b1ae(0x193)][_0x32b1ae(0x208)];if(_0x65e9f9<=0x1){const _0x4e8f02=this[_0x32b1ae(0x3f1)];_0x55b0f5['x']=_0x4e8f02['x']+Math[_0x32b1ae(0x185)](_0x4e8f02['width']/0x2),_0x55b0f5['y']=_0x4e8f02['y']+Math[_0x32b1ae(0x185)](_0x4e8f02[_0x32b1ae(0x3cb)]/0x2),_0x55b0f5['x']+=_0x27af26[_0x32b1ae(0x3a4)]||0x0,_0x55b0f5['y']+=_0x27af26[_0x32b1ae(0x2f7)]||0x0;}else{if('HJqef'!=='HJqef')_0xbe5e83=_0x1ab0b9(_0x253656['$1']);else{const _0xc2f5d7=this[_0x32b1ae(0x364)],_0x18fe65=_0xc2f5d7[_0x32b1ae(0x2c3)](_0xc2f5d7[_0x32b1ae(0x3d7)]()),_0x2ed88f=_0xc2f5d7['padding']||0x0;_0x55b0f5['x']=_0xc2f5d7['x']+_0x18fe65['x']+Math['round'](_0x18fe65['width']/0x2)+_0x2ed88f,_0x55b0f5['y']=_0xc2f5d7['y']+_0x18fe65['y']+Math[_0x32b1ae(0x185)](_0x18fe65['height']/0x2)+_0x2ed88f,_0x55b0f5['x']+=_0x27af26[_0x32b1ae(0x2dd)]||0x0,_0x55b0f5['y']+=_0x27af26[_0x32b1ae(0x136)]||0x0;}}return _0x55b0f5['x']+=this['_windowLayer']['x'],_0x55b0f5['y']+=this['_windowLayer']['y'],_0x55b0f5;},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x348)]=function(_0x3e308f,_0x17f67c,_0x4881c7){const _0x38e494=_0x25643f,_0x5cac6e=this[_0x38e494(0xf2)](_0x3e308f),_0x1ce916=$dataAnimations[_0x5cac6e];if(!_0x1ce916)return;const _0x329bc2=this[_0x38e494(0x27d)](_0x1ce916),_0x52fa58=new(_0x329bc2?Sprite_AnimationMV:Sprite_Animation)(),_0x12d0a3=[_0x4881c7],_0x25faa4=0x0;_0x52fa58[_0x38e494(0xb9)](_0x12d0a3,_0x1ce916,![],_0x25faa4,null),_0x52fa58[_0x38e494(0xf7)]=_0x17f67c,this[_0x38e494(0x14a)](_0x4881c7),this[_0x38e494(0x14a)](_0x52fa58),this[_0x38e494(0x1bd)][_0x38e494(0x151)](_0x52fa58);},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0xf2)]=function(_0x274139){const _0x478dc6=_0x25643f,_0x4a613b=$dataClasses[_0x274139];if(_0x4a613b){if('pgHWx'!=='oadQb'){const _0x5afd88=VisuMZ[_0x478dc6(0x22e)][_0x478dc6(0x287)],_0x4eacfa=_0x4a613b[_0x478dc6(0x1f7)];if(_0x4eacfa[_0x478dc6(0x187)](_0x5afd88['ClassChangeAnimation']))return Number(RegExp['$1']);}else this[_0x478dc6(0xb7)]=_0x33c1a0;}return VisuMZ[_0x478dc6(0x22e)]['Settings'][_0x478dc6(0x208)][_0x478dc6(0x150)];},Scene_ClassChange[_0x25643f(0x242)]['isMVAnimation']=function(_0xf51550){const _0x17e973=_0x25643f;return!!_0xf51550[_0x17e973(0x27c)];},Scene_ClassChange['prototype'][_0x25643f(0x370)]=function(){const _0x511ab9=_0x25643f,_0x359e3f=[];for(const _0x3ab7fb of this[_0x511ab9(0x1bd)]){if(!_0x3ab7fb)continue;if(_0x3ab7fb['isPlaying']())continue;_0x359e3f[_0x511ab9(0x151)](_0x3ab7fb);}for(const _0x149468 of _0x359e3f){if('gUVOZ'==='dxRMf')return![];else{if(!_0x149468)continue;for(const _0x219715 of _0x149468[_0x511ab9(0x206)]){this[_0x511ab9(0x2d3)](_0x219715);}this['_animations']['remove'](_0x149468),this[_0x511ab9(0x2d3)](_0x149468);}};},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x248)]=function(){const _0x424039=_0x25643f,_0x12d4ce=[];for(const _0x55b5d9 of this[_0x424039(0x1bd)]){if(!_0x55b5d9)continue;if(_0x55b5d9[_0x424039(0xf7)]<=0x1)continue;_0x12d4ce['push'](_0x55b5d9);}for(const _0xdb1eec of _0x12d4ce){if(!_0xdb1eec)continue;for(const _0x592519 of _0xdb1eec['_targets']){this[_0x424039(0x2d3)](_0x592519);}this[_0x424039(0x1bd)][_0x424039(0x306)](_0xdb1eec),this[_0x424039(0x2d3)](_0xdb1eec);};},Scene_ClassChange['prototype'][_0x25643f(0x2ba)]=function(){const _0x36fb1c=_0x25643f;if(!this['_classTierWindow'])return![];if(!this[_0x36fb1c(0x364)]['active'])return![];return this[_0x36fb1c(0x364)]['isShiftRemoveShortcutEnabled']();},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x387)]=function(){const _0x2cc61b=_0x25643f;if(this['buttonAssistSlotWindowShift']()){if(_0x2cc61b(0x2d7)===_0x2cc61b(0x2d7))return TextManager[_0x2cc61b(0x335)](_0x2cc61b(0x2d6));else _0x24f460=_0x4c5a99||this['currentClass']()['id'];}return Scene_MenuBase[_0x2cc61b(0x242)]['buttonAssistKey3'][_0x2cc61b(0x2c8)](this);},Scene_ClassChange['prototype'][_0x25643f(0x210)]=function(){const _0x3f20dd=_0x25643f;if(this[_0x3f20dd(0x2ba)]())return TextManager[_0x3f20dd(0x400)];return Scene_MenuBase['prototype']['buttonAssistText3'][_0x3f20dd(0x2c8)](this);},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x3a5)]=function(){const _0x212e91=_0x25643f;if(this['buttonAssistSlotWindowShift']())return this[_0x212e91(0x337)][_0x212e91(0x1e4)]/0x5/-0x3;return Scene_MenuBase[_0x212e91(0x242)][_0x212e91(0x3a5)][_0x212e91(0x2c8)](this);},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x3b2)]=function(){const _0xf1ae44=_0x25643f;Scene_MenuBase['prototype']['createBackground'][_0xf1ae44(0x2c8)](this),this['setBackgroundOpacity'](this[_0xf1ae44(0x13d)]()),this[_0xf1ae44(0x34a)]();},Scene_ClassChange['prototype']['getBackgroundOpacity']=function(){const _0x578296=_0x25643f;return VisuMZ[_0x578296(0x22e)][_0x578296(0x193)]['BgSettings']['SnapshotOpacity'];},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x34a)]=function(){const _0x17113b=_0x25643f,_0xcd39e9=VisuMZ[_0x17113b(0x22e)][_0x17113b(0x193)]['BgSettings'];_0xcd39e9&&(_0xcd39e9[_0x17113b(0x291)]!==''||_0xcd39e9['BgFilename2']!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x17113b(0x3b1)](_0xcd39e9['BgFilename1']||'')),this['_backSprite2']=new Sprite(ImageManager[_0x17113b(0x2a4)](_0xcd39e9[_0x17113b(0x1ff)]||'')),this[_0x17113b(0x14a)](this[_0x17113b(0x102)]),this['addChild'](this[_0x17113b(0x1ef)]),this['_backSprite1'][_0x17113b(0x144)][_0x17113b(0x1d1)](this[_0x17113b(0x3bd)][_0x17113b(0x149)](this,this[_0x17113b(0x102)])),this[_0x17113b(0x1ef)][_0x17113b(0x144)][_0x17113b(0x1d1)](this[_0x17113b(0x3bd)]['bind'](this,this[_0x17113b(0x1ef)])));},Scene_ClassChange[_0x25643f(0x242)][_0x25643f(0x3bd)]=function(_0x50fd48){const _0x1dfb93=_0x25643f;this[_0x1dfb93(0xe1)](_0x50fd48),this[_0x1dfb93(0x30c)](_0x50fd48);},Window_Base[_0x25643f(0x209)]=VisuMZ['ClassChangeSystem'][_0x25643f(0x193)]['Window'][_0x25643f(0x2a1)]??!![],Window_Base[_0x25643f(0x242)][_0x25643f(0x20a)]=function(_0x41ba9a,_0xb68fd6,_0x41b821,_0x582de2,_0x215d81){const _0x2d8f6a=_0x25643f;_0x215d81=_0x215d81||_0x2d8f6a(0x1b5);const _0x114260=_0x2d8f6a(0x365)[_0x2d8f6a(0x323)](ImageManager[_0x2d8f6a(0x1b6)]),_0x2bece6=TextManager[_0x2d8f6a(0x359)],_0x37edae=_0x2bece6[_0x2d8f6a(0x323)](_0x41ba9a,TextManager[_0x2d8f6a(0x279)],_0x114260,TextManager[_0x2d8f6a(0x12a)]),_0xb08034=this[_0x2d8f6a(0x119)](_0x37edae)[_0x2d8f6a(0x1e4)];if(_0x215d81===_0x2d8f6a(0x1b5))_0xb68fd6+=0x0;else _0x215d81===_0x2d8f6a(0x18c)?_0xb68fd6+=Math[_0x2d8f6a(0x185)]((_0x582de2-_0xb08034)/0x2):_0x2d8f6a(0x31f)!==_0x2d8f6a(0x1e8)?_0xb68fd6+=_0x582de2-_0xb08034:(_0x1c5ae2=this[_0x2d8f6a(0x3aa)]['param'](_0x5f1392),_0x20929e=this['_tempActor'][_0x2d8f6a(0x156)](_0x194ce8),_0x184ee2=this[_0x2d8f6a(0x258)][_0x2d8f6a(0x156)](_0x245d4e));this['drawTextEx'](_0x37edae,_0xb68fd6,_0x41b821);},Window_Base[_0x25643f(0x242)]['drawActorClassPoints']=function(_0x1869ca,_0x13ff29,_0x4891a8,_0x137ac1,_0x2232c1,_0x113785){const _0x1e85d9=_0x25643f,_0x49dd9f=_0x1869ca[_0x1e85d9(0x1fc)](_0x13ff29);this['drawClassPoints'](_0x49dd9f,_0x4891a8,_0x137ac1,_0x2232c1,_0x113785);},Window_Base[_0x25643f(0x242)][_0x25643f(0x2c5)]=function(_0x5c2863,_0xd1921d,_0x45ed91,_0x72c9cc,_0x41ce97){const _0x395d1f=_0x25643f;_0x41ce97=_0x41ce97||_0x395d1f(0x1b5);const _0x27ffef=_0x395d1f(0x365)[_0x395d1f(0x323)](ImageManager['jobPointsIcon']),_0x2540b2=TextManager['jobPointsFmt'],_0x300c5b=_0x2540b2[_0x395d1f(0x323)](_0x5c2863,TextManager[_0x395d1f(0x333)],_0x27ffef,TextManager['jobPointsFull']),_0x3bf21c=this['textSizeEx'](_0x300c5b)[_0x395d1f(0x1e4)];if(_0x41ce97===_0x395d1f(0x1b5))_0xd1921d+=0x0;else _0x41ce97===_0x395d1f(0x18c)?_0xd1921d+=Math[_0x395d1f(0x185)]((_0x72c9cc-_0x3bf21c)/0x2):_0xd1921d+=_0x72c9cc-_0x3bf21c;this[_0x395d1f(0x220)](_0x300c5b,_0xd1921d,_0x45ed91);},Window_Base[_0x25643f(0x242)][_0x25643f(0x2f5)]=function(_0x37e313,_0x31cb59,_0x28b10d,_0x1b10d2,_0x1fb5d7,_0x1ea109){const _0x2ac6de=_0x25643f,_0x467014=_0x37e313[_0x2ac6de(0xa7)](_0x31cb59);this[_0x2ac6de(0x2c5)](_0x467014,_0x28b10d,_0x1b10d2,_0x1fb5d7,_0x1ea109);},Window_Base['prototype']['drawClassLevel']=function(_0x3ce0fa,_0x98a3bd,_0x3b4fd7,_0x7eb887){const _0x1fa7e5=_0x25643f;if(!Window_Base[_0x1fa7e5(0x209)])return;if(!$dataClasses[_0x98a3bd])return;if(this['isClassExpGaugeDrawn']()){if(_0x1fa7e5(0x320)===_0x1fa7e5(0x13e)){const _0x1a99e6=_0x3eb27e[_0x1fa7e5(0x1ed)](_0x4a6825[_0x1fa7e5(0x29e)]()),_0x364c5c=this['innerWidth']-_0x1a99e6[_0x1fa7e5(0x1e4)];_0x270cdf+=_0x364c5c/0x2;if(_0x364c5c<0x0)_0x550382-=_0x364c5c;_0x3a13db[_0x1fa7e5(0x242)]['drawItemActorMenuImage'][_0x1fa7e5(0x2c8)](this,_0x79e6c1,_0x208f8f,_0x20978d,_0x4a745f,_0x255847);}else this[_0x1fa7e5(0x15f)](_0x3ce0fa,_0x98a3bd,_0x3b4fd7,_0x7eb887);}this[_0x1fa7e5(0x2e1)](ColorManager[_0x1fa7e5(0x1d2)]()),this[_0x1fa7e5(0x401)](TextManager[_0x1fa7e5(0xde)],_0x3b4fd7,_0x7eb887,0x30),this['resetTextColor'](),this[_0x1fa7e5(0x401)](_0x3ce0fa[_0x1fa7e5(0x25d)](_0x98a3bd),_0x3b4fd7+0x54,_0x7eb887,0x24,'right');},Window_Base['prototype'][_0x25643f(0x241)]=function(){const _0x26b916=_0x25643f;return Imported['VisuMZ_0_CoreEngine']&&VisuMZ[_0x26b916(0x1a5)][_0x26b916(0x193)]['UI'][_0x26b916(0x2fd)];},Window_Base[_0x25643f(0x242)][_0x25643f(0x15f)]=function(_0x5b199e,_0x49468a,_0x1de013,_0x37273c){const _0x5c798d=_0x25643f;if(!_0x5b199e)return;if(!_0x5b199e[_0x5c798d(0x198)]())return;const _0x16ecdd=0x80,_0x3a34ec=_0x5b199e['classExpRate'](_0x49468a);let _0x5ec0a3=ColorManager[_0x5c798d(0x2bd)](),_0x201672=ColorManager[_0x5c798d(0x2cf)]();_0x3a34ec>=0x1&&(_0x5ec0a3=ColorManager[_0x5c798d(0x14d)](),_0x201672=ColorManager['maxLvGaugeColor2']()),this[_0x5c798d(0xc7)](_0x1de013,_0x37273c,_0x16ecdd,_0x3a34ec,_0x5ec0a3,_0x201672);},VisuMZ[_0x25643f(0x22e)][_0x25643f(0x3a3)]=Window_MenuCommand[_0x25643f(0x242)][_0x25643f(0x169)],Window_MenuCommand[_0x25643f(0x242)][_0x25643f(0x169)]=function(){const _0x11e00c=_0x25643f;VisuMZ['ClassChangeSystem'][_0x11e00c(0x3a3)][_0x11e00c(0x2c8)](this),this[_0x11e00c(0x1ae)]();},Window_MenuCommand[_0x25643f(0x242)][_0x25643f(0x1ae)]=function(){const _0x4cc10d=_0x25643f;if(!this[_0x4cc10d(0x24a)]())return;if(!this[_0x4cc10d(0x331)]())return;const _0x125d57=TextManager[_0x4cc10d(0x36f)],_0x3fc8bd=this['isClassChangeCommandEnabled']();this[_0x4cc10d(0x170)](_0x125d57,_0x4cc10d(0x22e),_0x3fc8bd);},Window_MenuCommand[_0x25643f(0x242)][_0x25643f(0x24a)]=function(){const _0x2fb6bc=_0x25643f;return Imported[_0x2fb6bc(0xcf)]?![]:!![];},Window_MenuCommand[_0x25643f(0x242)]['isClassChangeCommandVisible']=function(){const _0x5494d3=_0x25643f;return $gameSystem[_0x5494d3(0x159)]();},Window_MenuCommand[_0x25643f(0x242)]['isClassChangeCommandEnabled']=function(){return $gameSystem['isMainMenuClassChangeSystemEnabled']();};function Window_ClassStatus(){this['initialize'](...arguments);}Window_ClassStatus[_0x25643f(0x242)]=Object['create'](Window_StatusBase[_0x25643f(0x242)]),Window_ClassStatus[_0x25643f(0x242)]['constructor']=Window_ClassStatus,Window_ClassStatus[_0x25643f(0x242)][_0x25643f(0x299)]=function(_0x2be40c){const _0x421d25=_0x25643f;Window_StatusBase[_0x421d25(0x242)][_0x421d25(0x299)][_0x421d25(0x2c8)](this,_0x2be40c),this['_actor']=null,this[_0x421d25(0x258)]=null,this[_0x421d25(0x3d3)]();},Window_ClassStatus[_0x25643f(0x242)][_0x25643f(0x3a0)]=function(_0x231f3f){const _0x274eb5=_0x25643f;this[_0x274eb5(0x3aa)]!==_0x231f3f&&(this['_actor']=_0x231f3f,this[_0x274eb5(0x3d3)]());},Window_ClassStatus[_0x25643f(0x242)][_0x25643f(0x3be)]=function(){return 0x0;},Window_ClassStatus[_0x25643f(0x242)]['setTempActor']=function(_0x22d140){const _0x3faa74=_0x25643f;this[_0x3faa74(0x258)]!==_0x22d140&&(this['_tempActor']=_0x22d140,this[_0x3faa74(0x3d3)]());},Window_ClassStatus[_0x25643f(0x242)][_0x25643f(0x3d3)]=function(){const _0x4cd8d5=_0x25643f;this[_0x4cd8d5(0x34d)](),this[_0x4cd8d5(0x116)]();if(this['_actor'])this['_actor'][_0x4cd8d5(0x3d3)]();this['prepareRefreshItemsEquipsCoreLayout']();},Window_ClassStatus['prototype']['prepareRefreshItemsEquipsCoreLayout']=function(){const _0x23b0c2=_0x25643f;this[_0x23b0c2(0x219)]['clear']();if(!this[_0x23b0c2(0x3aa)])return;if(this[_0x23b0c2(0xb3)]()){const _0x1a6963=ImageManager[_0x23b0c2(0x1ed)](this[_0x23b0c2(0x3aa)][_0x23b0c2(0x29e)]());_0x1a6963[_0x23b0c2(0x1d1)](this[_0x23b0c2(0x2e2)][_0x23b0c2(0x149)](this));}else _0x23b0c2(0x3b4)===_0x23b0c2(0x36c)?(this[_0x23b0c2(0x314)]=0x1,_0x2fbdf4['prototype'][_0x23b0c2(0x299)]['call'](this,_0x4dbe07)):this[_0x23b0c2(0x3f2)]();},Window_ClassStatus[_0x25643f(0x242)]['isMainMenuCoreMenuImageOptionAvailable']=function(){const _0x39fef4=_0x25643f;return Imported['VisuMZ_1_MainMenuCore']&&this[_0x39fef4(0x3aa)]['getMenuImage']()!==''&&VisuMZ[_0x39fef4(0x22e)]['Settings'][_0x39fef4(0x208)][_0x39fef4(0x325)];},Window_ClassStatus[_0x25643f(0x242)]['onMenuImageLoad']=function(){const _0x31a47b=_0x25643f;VisuMZ[_0x31a47b(0x22e)][_0x31a47b(0x193)][_0x31a47b(0x208)]['DrawPortraitJS']['call'](this),this[_0x31a47b(0x3e4)]();},Window_ClassStatus[_0x25643f(0x242)][_0x25643f(0x34c)]=function(_0x3bf54e,_0x89a2f8,_0x40dc20,_0x303d53,_0x58db82){const _0x195a3c=_0x25643f,_0x43f8d0=ImageManager[_0x195a3c(0x1ed)](_0x3bf54e[_0x195a3c(0x29e)]()),_0x4f7288=this[_0x195a3c(0x13f)]-_0x43f8d0[_0x195a3c(0x1e4)];_0x89a2f8+=_0x4f7288/0x2;if(_0x4f7288<0x0)_0x303d53-=_0x4f7288;Window_StatusBase[_0x195a3c(0x242)][_0x195a3c(0x34c)]['call'](this,_0x3bf54e,_0x89a2f8,_0x40dc20,_0x303d53,_0x58db82);},Window_ClassStatus['prototype'][_0x25643f(0x3f2)]=function(){const _0x55f8cb=_0x25643f;VisuMZ[_0x55f8cb(0x22e)][_0x55f8cb(0x193)][_0x55f8cb(0x208)]['DrawFaceJS'][_0x55f8cb(0x2c8)](this),this[_0x55f8cb(0x3e4)]();},Window_ClassStatus[_0x25643f(0x242)]['drawParameterList']=function(){const _0x7c8767=_0x25643f;this[_0x7c8767(0x116)](),VisuMZ['ClassChangeSystem']['Settings']['Window'][_0x7c8767(0x167)]['call'](this);},Window_ClassStatus[_0x25643f(0x242)][_0x25643f(0x216)]=function(){const _0x4769ee=_0x25643f;if(Imported[_0x4769ee(0x24f)])return VisuMZ[_0x4769ee(0x1a5)][_0x4769ee(0x193)][_0x4769ee(0x20e)][_0x4769ee(0x182)];else{if(_0x4769ee(0x200)==='HbDBF')_0x15e399=_0x45ae80(_0x4cd113[_0x4769ee(0x262)]);else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}},Window_ClassStatus[_0x25643f(0x242)][_0x25643f(0x363)]=function(){const _0x55bd24=_0x25643f;return VisuMZ[_0x55bd24(0x22e)][_0x55bd24(0x193)][_0x55bd24(0x208)][_0x55bd24(0x3ef)];},Window_ClassStatus['prototype'][_0x25643f(0x1d4)]=function(){const _0x3ea882=_0x25643f;return Imported['VisuMZ_0_CoreEngine']&&VisuMZ[_0x3ea882(0x1a5)][_0x3ea882(0x193)][_0x3ea882(0x20e)][_0x3ea882(0x35d)];},Window_ClassStatus['prototype'][_0x25643f(0x3ce)]=function(_0x33aea4,_0x40213f,_0x541a79,_0x3e6a6c,_0xf69da5){const _0x36b2ba=_0x25643f;if(Imported[_0x36b2ba(0xcf)]){if(_0x36b2ba(0x255)!==_0x36b2ba(0x23c))switch(this[_0x36b2ba(0x37b)]()){case _0x36b2ba(0x3f3):break;case'sprite':this['drawItemActorSprite'](_0x33aea4,_0x40213f,_0x541a79,_0x3e6a6c,_0xf69da5);break;case _0x36b2ba(0x148):this['drawItemActorSvBattler'](_0x33aea4,_0x40213f,_0x541a79,_0x3e6a6c,_0xf69da5);break;default:this[_0x36b2ba(0xbc)](_0x33aea4,_0x40213f,_0x541a79,_0x3e6a6c,_0xf69da5);break;}else return _0x123a4d(_0x31d80e['$1']);}else _0x36b2ba(0x3ca)!=='mKiFl'?_0x1fca01=_0x37b0b9[_0x36b2ba(0x2ee)](_0x370fa9):this['prepareDrawActorFace'](_0x33aea4,_0x40213f,_0x541a79,_0x3e6a6c,_0xf69da5);},Window_ClassStatus['prototype']['prepareDrawActorFace']=function(_0x92a748,_0x45ee22,_0x234271,_0x1e4021,_0x995641){const _0x184c6a=_0x25643f,_0x43ec09=ImageManager[_0x184c6a(0x10a)](_0x92a748[_0x184c6a(0x356)]());_0x43ec09['addLoadListener'](Window_StatusBase[_0x184c6a(0x242)][_0x184c6a(0x3ce)]['bind'](this,_0x92a748,_0x45ee22,_0x234271,_0x1e4021,_0x995641));},Window_ClassStatus[_0x25643f(0x242)][_0x25643f(0x10d)]=function(_0x504a3c,_0x5008f7){const _0x4b7707=_0x25643f,_0x4927d9=this[_0x4b7707(0xd9)]();this[_0x4b7707(0x2e1)](ColorManager['systemColor']());if(Imported['VisuMZ_0_CoreEngine']){const _0x2f8800=VisuMZ['CoreEngine'][_0x4b7707(0x193)]['UI'][_0x4b7707(0x3da)];this[_0x4b7707(0x401)](_0x2f8800,_0x504a3c,_0x5008f7,_0x4927d9,_0x4b7707(0x18c));}else'XGWgV'!=='qcUzd'?this[_0x4b7707(0x401)]('→',_0x504a3c,_0x5008f7,_0x4927d9,_0x4b7707(0x18c)):(this[_0x4b7707(0xd1)](_0x15859d),this[_0x4b7707(0x1b2)](_0x12a032),_0xef0952['VisuMZ_2_SkillLearnSystem']&&(this[_0x4b7707(0x35b)](_0x475a25),this[_0x4b7707(0x2bb)](_0x428a7b)));},Window_ClassStatus['prototype'][_0x25643f(0xd9)]=function(){return 0x20;},Window_ClassStatus[_0x25643f(0x242)][_0x25643f(0x29b)]=function(_0x1a96bc,_0x273e69,_0x399427,_0x4e040f){const _0x5d01c5=_0x25643f,_0x5e501d=this[_0x5d01c5(0x247)]();if(Imported[_0x5d01c5(0x24f)])this[_0x5d01c5(0xcc)](_0x273e69+_0x5e501d,_0x399427,_0x4e040f,_0x1a96bc,![]);else{if(_0x5d01c5(0x321)===_0x5d01c5(0xbd))try{return _0x26ae80(_0x1d44f['$1']);}catch(_0x370905){if(_0x2f0930[_0x5d01c5(0x3ea)]())_0x196ae3[_0x5d01c5(0x354)](_0x370905);return 0x0;}else this[_0x5d01c5(0x2e1)](ColorManager['systemColor']()),this[_0x5d01c5(0x401)](TextManager[_0x5d01c5(0x156)](_0x1a96bc),_0x273e69+_0x5e501d,_0x399427,_0x4e040f),this[_0x5d01c5(0x17b)]();}},Window_ClassStatus[_0x25643f(0x242)][_0x25643f(0x2ec)]=function(_0x39ab73,_0x12bd96,_0xefabef,_0x1c1d0c){const _0x196a2b=_0x25643f,_0x40daf1=this[_0x196a2b(0x247)]();let _0x3bd363=0x0;Imported[_0x196a2b(0x24f)]?_0x3bd363=this[_0x196a2b(0x3aa)]['paramValueByName'](_0x39ab73,!![]):_0x3bd363=this[_0x196a2b(0x3aa)][_0x196a2b(0x156)](_0x39ab73);const _0x10ec18=_0x3bd363;this[_0x196a2b(0x401)](_0x3bd363,_0x12bd96,_0xefabef,_0x1c1d0c-_0x40daf1,_0x196a2b(0x2f0)),this[_0x196a2b(0x17b)]();},Window_ClassStatus['prototype'][_0x25643f(0x2a9)]=function(_0x4c5f5a,_0x768edb,_0x38ae08,_0x550cd8){const _0x34db0b=_0x25643f,_0x3b9baa=this[_0x34db0b(0x247)]();let _0x18fd5b=0x0,_0x990de3=0x0,_0x34bb12='';if(this[_0x34db0b(0x258)]){if(_0x34db0b(0x1e7)!==_0x34db0b(0x1ba)){Imported['VisuMZ_0_CoreEngine']?(_0x18fd5b=this[_0x34db0b(0x3aa)]['paramValueByName'](_0x4c5f5a,![]),_0x990de3=this['_tempActor'][_0x34db0b(0x24b)](_0x4c5f5a,![]),_0x34bb12=this['_tempActor'][_0x34db0b(0x24b)](_0x4c5f5a,!![])):_0x34db0b(0x244)!==_0x34db0b(0x10b)?(_0x18fd5b=this[_0x34db0b(0x3aa)][_0x34db0b(0x156)](_0x4c5f5a),_0x990de3=this[_0x34db0b(0x258)][_0x34db0b(0x156)](_0x4c5f5a),_0x34bb12=this[_0x34db0b(0x258)][_0x34db0b(0x156)](_0x4c5f5a)):this[_0x34db0b(0x2d3)](_0x30c8ba);const _0x370d3a=_0x18fd5b,_0x48279c=_0x990de3;diffValue=_0x48279c-_0x370d3a,this[_0x34db0b(0x2e1)](ColorManager[_0x34db0b(0x2a7)](diffValue)),this[_0x34db0b(0x401)](_0x34bb12,_0x768edb,_0x38ae08,_0x550cd8-_0x3b9baa,_0x34db0b(0x2f0));}else _0x4da1ad=_0x3d8ec5(_0x148094['$1']);}this[_0x34db0b(0x17b)]();},Window_ClassStatus['prototype'][_0x25643f(0x30f)]=function(_0x3dd435,_0x2c94a7,_0x6da754,_0x100043){const _0xeeb988=_0x25643f,_0x3982ef=this['itemPadding']();let _0x4f7af7=0x0,_0x3bd022=0x0,_0x3f46df=![];if(this[_0xeeb988(0x258)]){if(Imported[_0xeeb988(0x24f)])_0x4f7af7=this['_actor'][_0xeeb988(0x24b)](_0x3dd435,![]),_0x3bd022=this[_0xeeb988(0x258)][_0xeeb988(0x24b)](_0x3dd435,![]),_0x3f46df=String(this[_0xeeb988(0x3aa)][_0xeeb988(0x24b)](_0x3dd435,!![]))[_0xeeb988(0x187)](/([%％])/i);else{if('XCyqk'!=='lzman')_0x4f7af7=this[_0xeeb988(0x3aa)][_0xeeb988(0x156)](_0x3dd435),_0x3bd022=this[_0xeeb988(0x258)][_0xeeb988(0x156)](_0x3dd435),_0x3f46df=_0x4f7af7%0x1!==0x0||_0x3bd022%0x1!==0x0;else return _0x1518b5*(_0x54b816(_0x27f28b['$1'])*0.01);}const _0x3b97ed=_0x4f7af7,_0x1eddf4=_0x3bd022,_0x157d33=_0x1eddf4-_0x3b97ed;let _0x5defc8=_0x157d33;if(_0x3f46df)_0x5defc8=Math[_0xeeb988(0x185)](_0x157d33*0x64)+'%';_0x157d33!==0x0&&(this[_0xeeb988(0x2e1)](ColorManager[_0xeeb988(0x2a7)](_0x157d33)),_0x5defc8=(_0x157d33>0x0?'(+%1)':'(%1)')[_0xeeb988(0x323)](_0x5defc8),this['drawText'](_0x5defc8,_0x2c94a7+_0x3982ef,_0x6da754,_0x100043,_0xeeb988(0x1b5)));}this[_0xeeb988(0x17b)]();},Window_ClassStatus['prototype'][_0x25643f(0x153)]=function(_0xc06de5,_0x3755aa,_0x450327,_0x55909b,_0x1a1d69){const _0x4a7017=_0x25643f;if(VisuMZ[_0x4a7017(0x22e)][_0x4a7017(0x193)][_0x4a7017(0x208)][_0x4a7017(0x16a)]===![])return;_0x1a1d69=Math['max'](_0x1a1d69||0x1,0x1);while(_0x1a1d69--){_0x55909b=_0x55909b||this[_0x4a7017(0x11d)](),this[_0x4a7017(0x219)][_0x4a7017(0x1f1)]=0xa0;const _0x5dba72=ColorManager[_0x4a7017(0x13c)]();this[_0x4a7017(0x219)][_0x4a7017(0x1c4)](_0xc06de5+0x1,_0x3755aa+0x1,_0x450327-0x2,_0x55909b-0x2,_0x5dba72),this[_0x4a7017(0x219)][_0x4a7017(0x1f1)]=0xff;}},ColorManager[_0x25643f(0x13c)]=function(){const _0x4283fb=_0x25643f,_0x3d3f85=VisuMZ[_0x4283fb(0x22e)][_0x4283fb(0x193)][_0x4283fb(0x208)];let _0x123fc4=_0x3d3f85[_0x4283fb(0x228)]!==undefined?_0x3d3f85[_0x4283fb(0x228)]:0x13;return ColorManager[_0x4283fb(0x1e9)](_0x123fc4);},Window_ClassStatus[_0x25643f(0x242)]['drawActorResources']=function(_0x254f7c,_0x56eb1a,_0x4811bb){const _0x4969a9=_0x25643f,_0x566a4c=VisuMZ[_0x4969a9(0x22e)][_0x4969a9(0x193)][_0x4969a9(0x208)][_0x4969a9(0x330)],_0x2afb9d=this[_0x4969a9(0x3aa)]['currentClass']()['id'];for(const _0xfcd5f8 of _0x566a4c){if(_0x4969a9(0x23a)==='RhqKM')_0x213669=!![],this[_0x4969a9(0xa5)][_0x4969a9(0x142)]();else switch(_0xfcd5f8[_0x4969a9(0x101)]()[_0x4969a9(0x124)]()){case'AP':if(!Imported[_0x4969a9(0x1c2)])continue;this[_0x4969a9(0x357)](this['_actor'],_0x2afb9d,_0x254f7c,_0x56eb1a,_0x4811bb,_0x4969a9(0x2f0)),_0x56eb1a+=this[_0x4969a9(0x11d)]();break;case'CP':if(!Imported[_0x4969a9(0x394)])continue;this['drawActorClassPoints'](this['_actor'],_0x2afb9d,_0x254f7c,_0x56eb1a,_0x4811bb,_0x4969a9(0x2f0)),_0x56eb1a+=this[_0x4969a9(0x11d)]();break;case'JP':if(!Imported[_0x4969a9(0x394)])continue;this[_0x4969a9(0x2f5)](this[_0x4969a9(0x3aa)],_0x2afb9d,_0x254f7c,_0x56eb1a,_0x4811bb,_0x4969a9(0x2f0)),_0x56eb1a+=this[_0x4969a9(0x11d)]();break;case'SP':if(!Imported[_0x4969a9(0x1c2)])continue;this['drawActorSkillPoints'](this[_0x4969a9(0x3aa)],_0x2afb9d,_0x254f7c,_0x56eb1a,_0x4811bb,'right'),_0x56eb1a+=this['lineHeight']();break;}}};function Window_ClassCommand(){const _0xa66839=_0x25643f;this[_0xa66839(0x299)](...arguments);}function _0x1981(){const _0x391fee=['updatedLayoutStyle','Name','Actors','mainAreaTop','DisplayedResources','isClassChangeCommandVisible','pagedown','jobPointsAbbr','Game_Actor_releaseUnequippableItems','getInputButtonString','StartClassClassPoints','_buttonAssistWindow','libQx','classChange','registerActorClassImages','vqLqr','sSztT','drawExtraContents','getSkillPoints','filter','UaeRG','MryfQ','yjKno','ClassCharaName','ShiftShortcutKey','smoothSelect','applyItemClassChangeSystemUserEffect','Tiers','createClassChangeAnimation','traitObjects','createCustomBackgroundImages','max','drawItemActorMenuImage','hideAdditionalSprites','STR','setTier','XSDrl','_updateClassLearnedSkills','StartClassJobPoints','IconSet','log','learnSkill','faceName','drawActorAbilityPoints','actorClassFaceName','classPointsFmt','DSrgO','levelUpGainAbilityPoints','SystemEnableClassChangeSystemMenu','DrawIcons','jobPointsVisible','TRAIT_EQUIP_ATYPE','item','onClassListCancel','AttackStates','paramValueFontSize','_classTierWindow','\x5cI[%1]','setJobPoints','xoBTm','activate','hide','loadSystem','uiHelpPosition','ziLbL','MainMenu','kKJMy','classChangeMenuCommand','updateClassChangeAnimations','bAokQ','IeqnV','Game_System_initialize','playStaticSe','setStatusWindow','exp','ClassIcon','actorClassBattlePortrait','JobPointsRate','StateResistance','graphicType','Limit','BattleManager_displayRewards','jFQfs','evAQp','TargetGainClassPoints','wYgWl','xqoxM','applyJobPoints','iconIndex','setMainMenuClassChangeSystemVisible','NwIkr','buttonAssistKey3','getMulticlassAtTier','Actor-%1-%2','shown','AJsQt','Game_BattlerBase_elementRate','lKfCF','isEquipAtypeOk','processCursorMove','_priorityFaceIndex','_priorityCharacterName','refreshActorPortrait','actorClassMenuPortrait','VisuMZ_2_ClassChangeSystem','ParseClassNotetags','battlerName','rEyTv','gain%1Points','indexOf','getUnlockedClasses','Ecign','antiEquipsCacheClear_BattleCore_ClassChangeSystem','Icon','changePaintOpacity','MAX_SAFE_INTEGER','setActor','ClassBattlePortrait','deadMembers','Window_MenuCommand_addOriginalCommands','ConfirmAniPrimaryOffsetX','buttonAssistOffset3','QtpAu','Scene_Menu_createCommandWindow','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','isUseSkillsStatesCoreUpdatedLayout','_actor','Classes','addMulticlassTiers','_tp','HnNoH','updateHelp','addedSkillTypes','loadTitle1','createBackground','armorTypes','CBnWF','Game_BattlerBase_attackElements','TTcsV','removeUnlockedClass','ClassUnlockForGlobal','ClassPoints','380702LUrsHY','Window_ClassList_BgType','JhAKj','adjustSprite','colSpacing','resourceRate','mmp','actorClassCharacterName','kTHWC','NcyrZ','Game_Action_applyItemUserEffect','processShiftRemoveShortcut','yCmiR','ztpGY','LayoutStyle','floor','mKiFl','height','process_VisuMZ_ClassChangeSystem','updateClassLevel','drawActorFace','initClassChangeSystemMainMenu','concat','constructor','getActorUnlockedClasses','refresh','Game_BattlerBase_xparam','rNIIA','mhp','index','IMVBN','getAbilityPoints','ParamArrow','EnemyJobPoints','36WqESLB','Game_Actor_setup','Game_Actor_setBattlerImage','Enemy-%1-%2','cxuWd','_earnedJobPoints','Parse_Notetags_Basic','isWordWrapEnabled','drawParameterList','Class-%1-%2','setHp','kmbcW','Game_BattlerBase_attackStates','addClassChangeTierRestriction','isPlaytest','from','apply','_jobPoints','gradientFillRect','ParamValueFontSize','Window_ClassStatus_BgType','_statusWindow','refreshNoMenuImage','none','characterIndex','ClassBattlerName','rDOXb','nextActor','_classLevel','addClassPoints','gainExp','allMembers','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','refreshActor','StartingMulticlasses','KUOaz','classChange_multiclass_ShiftHelp','drawText','map','earnedClassPoints','setupClassChangeSystem','kTIOf','params','applyItemUserEffect','skillTypes','Game_BattlerBase_debuffRate','LJbID','highestMulticlassTier','CLASS_CHANGE_ADJUST_HP_MP','setCharacterImage','Fqdzb','enemy','Lfipb','WOqzc','_multiclasses','pDsHT','getJobPoints','splice','TISOT','ActorUnlockedClasses','gcynJ','return\x200','LLZFd','qIgdB','HCLmg','ecqKn','#%1','3281610ScRrmV','isMainMenuCoreMenuImageOptionAvailable','onBattleStart','loseJobPoints','createClassTierWindow','_priorityBattlePortrait','setBackgroundType','setup','length','ETPvY','prepareDrawActorFace','BqFFh','_classPoints','uiInputPosition','highestTier','FgJCa','Scene_Menu_onPersonalOk','isRightInputMode','isSceneBattle','applyClassPoints','members','drawGauge','createCommandWindow','JneMb','forceSelect','newPage','drawParamText','nextClassLevelExp','previousActor','VisuMZ_1_MainMenuCore','textColor','levelUpGainClassPoints','changeClass','ClassChangeAnimation','751470VJFVXu','actorClassBattlerName','YvpBS','ClassUnlockRemoveActor','JobPointsLose','rightArrowWidth','BattleCore','_priorityFaceName','nojNF','FdGvi','levelA','recoverAll','MowoG','scaleSprite','drawBigItemImage','JobPointsGain','_ClassChangeSystem_MainMenu','setText','vSrpk','Weapon-%1-%2','updateStatusWindow','getBattlePortraitFilename','makeDeepCopy','Window_ClassList_RectJS','EnemyClassPoints','isEnabled','ZSgjJ','actor','itemRectWithPadding','drawClassLevel','getClassChangeAnimationID','jobPointsIcon','dimColor1','includes','MulticlassSetLimit','_classChangeTier','StartingJobPoints','JhCXg','JSON','iDwkO','level','_list','Window_ClassTier_RectJS','attackElements','_multiclassTiers','toUpperCase','_backSprite1','ParamRates','classDescription','padding','TargetGainJobPoints','28pOmBWa','visibleResources','stateRate','loadFace','rMIJU','VictoryText','drawRightArrow','Game_Actor_traitObjects','Game_BattlerBase_addedSkills','drawActorClassPoints','Parse_ClassIcons','TuDjx','refreshCursor','Game_Actor_changeClass','ClassFaceName','resetFontSettings','addJobPoints','needsPageButtons','textSizeEx','SeepG','tBPns','ClassPointsLose','lineHeight','ClassDescription','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','totalMulticlass','mainAreaHeight','Game_BattlerBase_paramRate','hprNZ','trim','MaintainLevels','mnnvQ','Game_Actor_characterName','makeRewardsJobPoints','AlwaysUnlocked','classPointsFull','MulticlassLowerLimit','_classIDs','MulticlassRaiseLimit','isTriggered','xMtXR','ClassMenuPortrait','faceIndex','uXASl','imageSmoothingEnabled','3ImmXWx','classPointsVisible','ConfirmAniSubclassOffsetY','VisuMZ_1_MessageCore','isRecommendedLayout','cLSvO','ConvertParams','_priorityBattlerName','getClassChangeBackColor2','getBackgroundOpacity','IvSKy','innerWidth','EjSry','_cache','pop','Game_Actor_setFaceImage','bitmap','expForClassLevel','LWyRR','innerHeight','svbattler','bind','addChild','ElementRates','TRAIT_STYPE_ADD','maxLvGaugeColor1','setTempActor','gainStartingClassPoints','ConfirmAnimationID','push','removeClassChangeTierRestriction','drawItemDarkRect','gainRewardsClassPoints','_ClassChangeSystem_preventLevelUpGain','param','show','expRate','isMainMenuClassChangeSystemVisible','AutoUnlockRequirements','getActorClassCharacterName','weaponTypes','checkShiftRemoveShortcut','Show','drawClassExpGauge','dataId','setHandler','levelUp','isBattleMember','iMWHr','createHelpWindow','actorClassCharacterIndex','DrawParamJS','attackStates','addOriginalCommands','DrawBackRect','TextCodeClassNames','setMp','Game_Actor_getBattlePortraitFilename','classPoints','Game_BattlerBase_isEquipWtypeOk','addCommand','hpRate','addedSkills','makeRewards','_rewards','_multiclassCheck','gainClassPointsForMulticlasses','characterName','registerCommand','create','loseMulticlassTiers','resetTextColor','createClassListWindow','mDRbI','setMulticlassTiers','GPnAV','classChange_multiclass_noClass','Ahnqt','ExtDisplayedParams','changeMulticlass','sparam','round','checkForAutoClassUnlocks','match','HelpDescription','Game_Party_initialize','addWindow','Armor-%1-%2','center','132119HzCYvc','ClassChangeAddRestrictTier','VHwtA','pxfng','PerLevelUp','drawBigItemIcon','Settings','gainJobPointsForMulticlasses','gJrgk','163736ONOXbf','BattleManager_makeRewards','isActor','classPointsTotal','jobPointsFmt','ClassPointsAdd','classTierWindowRect','Multiclass','setHelpWindow','zVLKT','_earnedClassPoints','DebuffRates','NGpRl','getActorClassMenuPortrait','isAlive','CoreEngine','replace','naturalUnlockClass','initClassChangeRestrictions','initClassPoints','TpdIV','onDatabaseLoaded','_priorityMenuImage','blt','addClassChangeSystemCommand','Napsh','gainStartingJobPoints','weapon','levelUpGainJobPoints','Points','actorClassFaceIndex','left','classPointsIcon','parse','createStatusWindow','_priorityCharacterIndex','PBfvd','lGHmQ','description','_animations','DDZAz','ClassID','currentClass','LZutQ','VisuMZ_2_SkillLearnSystem','startClassChangeAnimation','fillRect','AddedStypes','canShiftRemoveClass','statusWindowRect','actorId','snjYP','split','_scene','checkMulticlasses','jobPoints','Game_Actor_characterIndex','checkForNewUnlockedClasses','unlockClass','addLoadListener','systemColor','OGBJS','isUseParamNamesWithIcons','dehcu','playClassChange','TextColor','EquipWeapons','\x5cC[16]%1:\x5cC[0]\x20\x5cFS[%3]%2','aiacT','AliveActors','ARRAYSTRUCT','ZxkAB','isClassChangeTierRestricted','updateClassLearnedSkills','bigPicture','UnassignHelpDescription','currentExt','14785520XrWLDN','width','findMulticlassTier','dWMZz','jJlaP','rkdKX','getColor','getActorClassBattlePortrait','add','State-%1-%2','loadPicture','process_VisuMZ_ClassChangeSystem_Notetags','_backSprite2','Game_BattlerBase_sparam','paintOpacity','Game_BattlerBase_attackStatesRate','StartingClassTier','hYWeo','xparam','min','note','classLevelUp','VocabNoClassAssigned','expParams','endBattle','getClassPoints','inBattle','oQawA','BgFilename2','bzTTt','test','isShiftRemoveShortcutEnabled','Game_Actor_paramBase','ShowMainMenu','gqdgE','_targets','cXxAN','Window','CLASS_CHANGE_SHOW_CLASS_LEVEL','drawClassPoints','Game_Battler_gainSilentTp','_classListWindow','_unlockedClasses','Param','728812faArgm','buttonAssistText3','qvGMr','Class','parameters','UserGainClassPoints','woueO','actorParams','skillId','cUqTz','contents','ShowVictory','Job','iconWidth','drawClassResources','classPicture','Game_Actor_levelUp','drawTextEx','gainClassPoints','Scene_Boot_onDatabaseLoaded','getMulticlasses','gainMulticlassRewardPoints','iconHeight','subject','rowTC','BackRectColor','_context','SkillLearnSystem','getClassChangeTiersOnly','drawPicture','displayRewards','ClassChangeSystem','Game_Actor_equips','rauhu','SParamRates','SharedResource','Game_Actor_setMenuImage','reduce','deactivate','playOkSound','mGYFc','maxLevel','lLJHt','JLqpr','createJS','algFt','CqinQ','getActorClassBattlerName','TierOnlyClass','classAdjustHpMp','isClassExpGaugeDrawn','prototype','displayRewardsJobPoints','wxgIj','VfunY','classExpRate','itemPadding','forceRemoveClassChangeAnimations','boxWidth','addClassChangeSystemCommandAutomatically','paramValueByName','elementRate','tradeItemWithParty','Game_Actor_getMenuImage','VisuMZ_0_CoreEngine','traits','pow','puhiv','_helpWindow','drawFadedItemBackground','fKpsc','AcBfW','_classId','_tempActor','createKeyJS','lcJZF','ciBGD','setClassPoints','classLevel','Game_BattlerBase_stateRate','GhxFx','uiMenuStyle','MulticlassChangeActorClass','PerAction','_windowLayer','XParamRates','classChange_multiclass_remove','STRUCT','onPersonalOk','JobPoints','Enable','(+%1)','DkFGn','wXNIC','initClassChangeUnlocks','FullText','NOhgb','JosOw','applyClassChangeSystemUserEffect','OwAlE','bVpxO','StartingClassPoints','enabled','SRcwQ','Game_Actor_battlerName','createAnimationDummySprite','classPointsAbbr','paramRate','dJIiF','frames','isMVAnimation','_classChangeTierRestrictions','Tier','BattleManager_endBattle','clamp','setFaceImage','tier','RcvIf','name','(%1)','RegExp','stateResistSet','EVAL','initClassLevels','jobPointsRate','applyMulticlassObjects','changeClassExp','PerEnemy','ParseActorNotetags','gainJobPoints','BgFilename1','tIeqw','makeRewardsClassPoints','General','Game_Actor_setBattlePortrait','join','pKkWC','getActorClassCharacterIndex','initialize','iQdKO','drawUpdatedParamName','hOsBI','drawItem','getMenuImage','ARRAYNUM','cOpsZ','ShowClassLevel','Game_BattlerBase_stateResistSet','classListWindowRect','loadTitle2','TUzbT','ext','paramchangeTextColor','Window_ClassStatus_RectJS','drawUpdatedAfterParamValue','zASLV','releaseUnequippableItems','SDwnh','loseClassPoints','FiKua','determineActiveWindow','_highestTier','vtzyL','maintainLevels','vvetI','onClassListOk','xbceK','setMenuImage','Game_Actor_faceIndex','Game_Actor_setCharacterImage','version','buttonAssistSlotWindowShift','levelUpGainSkillPoints','mpRate','expGaugeColor1','BattleManager_gainExp','gainRewardsJobPoints','isEquipWtypeOk','paramBaseForClass','SpAmX','itemRect','Game_Actor_tradeItemWithParty','drawJobPoints','xHHYF','uFYKC','call','ARRAYJSON','dOxOx','exit','status','gainMulticlassExp','StateRates','expGaugeColor2','currentClassLevelExp','WpTAk','getActorClassFaceIndex','removeChild','isBottomHelpMode','battleMembers','shift','aPKIN','setBattlePortrait','paramBase','deselect','code','ARRAYFUNC','ConfirmAniSubclassOffsetX','_subject','popScene','TGRsS','changeTextColor','onMenuImageLoad','multiclass','isClassAutoUnlockRequirementsMet','classPointsRate','changeExp','tFLNF','_commandWindow','pageup','active','VisuMZ_1_BattleCore','drawUpdatedBeforeParamValue','initMulticlass','getClassIdWithName','gainSilentTp','right','setBattlerImage','JtvYe','kKwOK','OQmdd','drawActorJobPoints','isLearnedSkill','ConfirmAniPrimaryOffsetY','AfOTv','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','debuffRate','optExtraExp','TRAIT_EQUIP_WTYPE','LvExpGauge','ChangeClassSound','Game_Actor_faceName','earnedJobPoints','yxduy','VDLhB','_exp','onMulticlassOk','ClassPointsSet','remove','AttackElements','JobPointsAdd','classIcon','YwPxR','classChange_multiclass_remove_help','centerSprite','attackStatesRate','learnings','drawUpdatedParamValueDiff','displayRewardsClassPoints','currentSymbol','UserGainJobPoints','EquipArmors','_tier','initJobPoints','xkxSk','setMainMenuClassChangeSystemEnabled','itemHeight','oORql','Actor-%1-Class-%2','Game_Battler_onBattleStart','EnableMainMenu','ShiftButtonAssistText','maxTp','DSEFq','TehsG','DTwgB','sort','format','cHMKa','MenuPortraits','initClassChangeSystem','<WordWrap>','AbbrText','JobPointsSet','qVQeb','IlSrL'];_0x1981=function(){return _0x391fee;};return _0x1981();}function _0x536c(_0x165933,_0x24d359){const _0x1981c4=_0x1981();return _0x536c=function(_0x536cff,_0x23cacc){_0x536cff=_0x536cff-0x9c;let _0x3d7a30=_0x1981c4[_0x536cff];return _0x3d7a30;},_0x536c(_0x165933,_0x24d359);}Window_ClassCommand[_0x25643f(0x242)]=Object['create'](Window_Command[_0x25643f(0x242)]),Window_ClassCommand[_0x25643f(0x242)]['constructor']=Window_ClassCommand,Window_ClassCommand[_0x25643f(0x242)][_0x25643f(0x299)]=function(_0x5b1249){const _0x4d94a3=_0x25643f;Window_Command['prototype'][_0x4d94a3(0x299)][_0x4d94a3(0x2c8)](this,_0x5b1249),this[_0x4d94a3(0x2da)](),this[_0x4d94a3(0x235)]();},Window_ClassCommand[_0x25643f(0x242)][_0x25643f(0x318)]=function(){const _0x313f93=_0x25643f;return this[_0x313f93(0x11d)]()*0x3+0x8;},Window_ClassCommand[_0x25643f(0x242)][_0x25643f(0x3a0)]=function(_0x3eb620){const _0x52e069=_0x25643f;this[_0x52e069(0x3aa)]!==_0x3eb620&&(_0x52e069(0x319)!==_0x52e069(0xa3)?(this[_0x52e069(0x3aa)]=_0x3eb620,this[_0x52e069(0x3d3)]()):_0x5c8d1b=this[_0x52e069(0x3aa)][_0x52e069(0x24b)](_0x23d41b,!![]));},Window_ClassCommand[_0x25643f(0x242)][_0x25643f(0x3d3)]=function(){const _0x17570b=_0x25643f;Window_Command['prototype'][_0x17570b(0x3d3)]['call'](this),this[_0x17570b(0x113)]();if(this[_0x17570b(0x2ea)])this[_0x17570b(0x3af)]();},Window_ClassCommand['prototype']['drawFadedItemBackground']=function(_0x2aaab8,_0x192485){const _0x2eb426=_0x25643f;_0x192485=_0x192485||0x1,this['changePaintOpacity'](![]);const _0x44043f=ColorManager[_0x2eb426(0xf4)](),_0x3e7b80=ColorManager['dimColor2'](),_0x338c41=_0x2aaab8['width']/0x2,_0x3d6a35=this[_0x2eb426(0x11d)]();while(_0x192485--){if(_0x2eb426(0x245)!=='ROLei')this[_0x2eb426(0x219)][_0x2eb426(0x3ee)](_0x2aaab8['x'],_0x2aaab8['y'],_0x338c41,_0x3d6a35,_0x3e7b80,_0x44043f),this['contents'][_0x2eb426(0x3ee)](_0x2aaab8['x']+_0x338c41,_0x2aaab8['y'],_0x338c41,_0x3d6a35,_0x44043f,_0x3e7b80);else return this[_0x2eb426(0x390)];}this[_0x2eb426(0x39e)](!![]);},Window_ClassCommand[_0x25643f(0x242)][_0x25643f(0xe2)]=function(_0x4fe37e,_0xa9a259,_0x959ac){const _0x30fe29=_0x25643f;if(!_0xa9a259)return;const _0x390b11=VisuMZ['ClassChangeSystem'][_0x30fe29(0x287)],_0x40e6fc=_0xa9a259[_0x30fe29(0x1f7)];let _0x15dd4f='';if(_0x40e6fc[_0x30fe29(0x187)](_0x390b11[_0x30fe29(0x21e)]))_0x15dd4f=String(RegExp['$1']);else{if(_0x40e6fc[_0x30fe29(0x187)](_0x390b11[_0x30fe29(0x1e0)])){if(_0x30fe29(0x9d)==='XZbTh'){const _0x2dc336=_0x2b8da9['_scene'][_0x30fe29(0x3f1)];if(_0x2dc336)_0x2dc336['refreshActorPortrait'](this);}else _0x15dd4f=String(RegExp['$1']);}}if(_0x15dd4f){if('jFQfs'===_0x30fe29(0x37e)){const _0x23714c=ImageManager[_0x30fe29(0x1ed)](_0x15dd4f);_0x23714c[_0x30fe29(0x1d1)](this[_0x30fe29(0x22c)][_0x30fe29(0x149)](this,_0x4fe37e,_0x23714c));}else return _0x47ff36[_0x30fe29(0xfe)][_0x30fe29(0x2c8)](this);}else{if(_0x30fe29(0x211)===_0x30fe29(0x211))this[_0x30fe29(0x192)](_0xa9a259,_0x959ac);else{if(!this[_0x30fe29(0x3aa)])return;const _0x533b27=this[_0x30fe29(0xf0)](_0x2d7c8b),_0xd736cd=this[_0x30fe29(0xfd)][_0x2e3d8b][_0x30fe29(0x2a6)]||0x1,_0x119882=this['_actor'][_0x30fe29(0x388)](_0xd736cd),_0x4639f0=_0x119882?_0x119882['id']:0x0,_0x5d0254=_0x4c83e7[_0x30fe29(0x22e)][_0x30fe29(0x193)]['Multiclass'];if(!_0x5d0254)return;const _0x24a1ab=_0x5d0254[_0xd736cd-0x1];if(!_0x24a1ab)return;let _0x3807f6=_0x533b27['x'],_0x2d6352=_0x533b27['y'],_0x157396=_0x533b27[_0x30fe29(0x1e4)]-this[_0x30fe29(0x247)]()*0x2,_0x516bb8=_0x533b27[_0x30fe29(0x3cb)],_0x5630d2=_0x576012[_0x30fe29(0x1f6)](_0x157396,_0x516bb8,this['lineHeight']()*0x3);_0x5630d2=_0x5c28e6['floor'](_0x5630d2/_0x5836a4['iconWidth'])*_0x517cac[_0x30fe29(0x21c)],_0x3807f6+=_0x5630d2+this[_0x30fe29(0x247)]()*0x4,this[_0x30fe29(0x116)](),this[_0x30fe29(0x17b)](),this[_0x30fe29(0x254)](_0x533b27),this[_0x30fe29(0x39e)](this[_0x30fe29(0xed)](_0xd736cd)),this['drawBigItemImage'](_0x22d5a8,_0x119882,_0x533b27),this[_0x30fe29(0x2e1)](_0x591505['getColor'](_0x24a1ab['TextColor'])),this[_0x30fe29(0x401)](_0x24a1ab['Name'],_0x533b27['x'],_0x533b27['y'],_0x533b27[_0x30fe29(0x1e4)],_0x30fe29(0x18c)),this['resetTextColor']();if(!_0x119882){this['changePaintOpacity'](![]);const _0x3b9ab2=_0xac4151['round'](_0x533b27['y']+this[_0x30fe29(0x11d)]()+(_0x533b27[_0x30fe29(0x3cb)]-this[_0x30fe29(0x11d)]()*0x2)/0x2);this[_0x30fe29(0x401)](_0x4b3e8f[_0x30fe29(0x180)],_0x533b27['x'],_0x3b9ab2,_0x533b27[_0x30fe29(0x1e4)],'center');return;}_0x2d6352+=this[_0x30fe29(0x11d)]();let _0x81a4ef=_0x119882[_0x30fe29(0x285)];_0x81a4ef=_0x81a4ef[_0x30fe29(0x1a6)](/\x1I\[(\d+)\]/gi,''),_0x81a4ef=_0x81a4ef[_0x30fe29(0x1a6)](/\\I\[(\d+)\]/gi,''),this[_0x30fe29(0x401)](_0x81a4ef,_0x3807f6,_0x2d6352,_0x533b27[_0x30fe29(0x1e4)]-_0x3807f6),_0x2d6352+=this[_0x30fe29(0x11d)](),this[_0x30fe29(0xf1)](this['_actor'],_0x4639f0,_0x3807f6,_0x2d6352-0x4),_0x2d6352+=this[_0x30fe29(0x11d)](),this[_0x30fe29(0x21d)](_0x4639f0,_0x533b27),this['drawExtraContents'](_0x4639f0,_0xd736cd,_0x24a1ab,_0x533b27);}}},Window_ClassCommand[_0x25643f(0x242)][_0x25643f(0x22c)]=function(_0x5581af,_0x21b2ae){const _0x3877d9=_0x25643f,_0x107fc8=this[_0x3877d9(0xf0)](_0x5581af);let _0x2f4e61=_0x107fc8['x']+this[_0x3877d9(0x247)](),_0x1bde07=_0x107fc8['y']+0x4,_0xb710ff=_0x107fc8[_0x3877d9(0x1e4)]-this[_0x3877d9(0x247)]()*0x2,_0x54a316=Math['min'](this[_0x3877d9(0x11d)]()*0x3,_0x107fc8[_0x3877d9(0x3cb)])-0x4,_0x2ad979=Math[_0x3877d9(0x1f6)](_0xb710ff,_0x54a316);const _0x533669=_0x2ad979/_0x21b2ae[_0x3877d9(0x1e4)],_0x25479f=_0x2ad979/_0x21b2ae[_0x3877d9(0x3cb)],_0x1e8302=Math[_0x3877d9(0x1f6)](_0x533669,_0x25479f,0x1);let _0x5645b1=Math[_0x3877d9(0x185)](_0x21b2ae[_0x3877d9(0x1e4)]*_0x1e8302),_0x108fa5=Math[_0x3877d9(0x185)](_0x21b2ae[_0x3877d9(0x3cb)]*_0x1e8302);_0x2f4e61+=Math[_0x3877d9(0x185)]((_0x2ad979-_0x5645b1)/0x2),_0x1bde07+=Math[_0x3877d9(0x185)]((_0x2ad979-_0x108fa5)/0x2);const _0x49dd=_0x21b2ae[_0x3877d9(0x1e4)],_0x42670d=_0x21b2ae['height'];this['contents'][_0x3877d9(0x229)][_0x3877d9(0x133)]=!![],this['contents'][_0x3877d9(0x1ad)](_0x21b2ae,0x0,0x0,_0x49dd,_0x42670d,_0x2f4e61,_0x1bde07,_0x5645b1,_0x108fa5),this[_0x3877d9(0x219)][_0x3877d9(0x229)][_0x3877d9(0x133)]=!![];},Window_ClassCommand[_0x25643f(0x242)]['drawBigItemIcon']=function(_0x103b0b,_0x598275){const _0x4d2c2a=_0x25643f;if(!_0x103b0b)return;const _0x4a8694=_0x103b0b[_0x4d2c2a(0x384)];let _0x2c878a=_0x598275['x']+this['itemPadding'](),_0x5038ac=_0x598275['y']+0x4,_0x55ae25=_0x598275['width']-this[_0x4d2c2a(0x247)]()*0x2,_0x45511e=Math[_0x4d2c2a(0x1f6)](this['lineHeight']()*0x3,_0x598275[_0x4d2c2a(0x3cb)]),_0x5ac3f4=Math[_0x4d2c2a(0x1f6)](_0x55ae25,_0x45511e);_0x5ac3f4=Math[_0x4d2c2a(0x3c9)](_0x5ac3f4/ImageManager[_0x4d2c2a(0x21c)])*ImageManager[_0x4d2c2a(0x21c)],_0x5038ac+=(_0x45511e-_0x5ac3f4)/0x2;const _0x154b35=ImageManager[_0x4d2c2a(0x36a)](_0x4d2c2a(0x353)),_0x836f6e=ImageManager['iconWidth'],_0x4a3e24=ImageManager[_0x4d2c2a(0x225)],_0x1af92f=_0x4a8694%0x10*_0x836f6e,_0x1f5100=Math['floor'](_0x4a8694/0x10)*_0x4a3e24;this[_0x4d2c2a(0x219)][_0x4d2c2a(0x229)]['imageSmoothingEnabled']=![],this[_0x4d2c2a(0x219)][_0x4d2c2a(0x1ad)](_0x154b35,_0x1af92f,_0x1f5100,_0x836f6e,_0x4a3e24,_0x2c878a,_0x5038ac,_0x5ac3f4,_0x5ac3f4),this['contents'][_0x4d2c2a(0x229)][_0x4d2c2a(0x133)]=!![];},Window_ClassCommand[_0x25643f(0x242)][_0x25643f(0x108)]=function(){const _0x399744=_0x25643f;return VisuMZ[_0x399744(0x22e)]['Settings']['Window'][_0x399744(0x330)]||[];},Window_ClassCommand['prototype'][_0x25643f(0x21d)]=function(_0x3f58cf,_0x2e0ea3){const _0x7b841d=_0x25643f,_0x9f48db=this['visibleResources']();let _0x2520b6=_0x2e0ea3['y']+this[_0x7b841d(0x11d)](),_0x10c6c4=0x0;const _0x41068e=_0x2e0ea3[_0x7b841d(0x1e4)]-this[_0x7b841d(0x247)]()*0x2;for(const _0x78cbc8 of _0x9f48db){if(_0x7b841d(0x25a)===_0x7b841d(0x25a)){if(_0x10c6c4>=0x2)return;switch(_0x78cbc8){case'AP':if(!Imported[_0x7b841d(0x1c2)])continue;let _0x50a4e5=VisuMZ[_0x7b841d(0x22a)][_0x7b841d(0x193)]['AbilityPoints'];if(!_0x50a4e5)continue;if(_0x50a4e5[_0x7b841d(0x232)])continue;this[_0x7b841d(0x357)](this[_0x7b841d(0x3aa)],_0x3f58cf,_0x2e0ea3['x'],_0x2520b6,_0x41068e,_0x7b841d(0x2f0)),_0x2520b6+=this[_0x7b841d(0x11d)](),_0x10c6c4++;break;case'CP':if(!Imported[_0x7b841d(0x394)])continue;let _0x12a424=VisuMZ['ClassChangeSystem'][_0x7b841d(0x193)][_0x7b841d(0x3b9)];if(!_0x12a424)continue;if(_0x12a424[_0x7b841d(0x232)])continue;this[_0x7b841d(0x110)](this[_0x7b841d(0x3aa)],_0x3f58cf,_0x2e0ea3['x'],_0x2520b6,_0x41068e,_0x7b841d(0x2f0)),_0x2520b6+=this[_0x7b841d(0x11d)](),_0x10c6c4++;break;case'JP':if(!Imported[_0x7b841d(0x394)])continue;let _0x52593a=VisuMZ[_0x7b841d(0x22e)][_0x7b841d(0x193)][_0x7b841d(0x268)];if(!_0x52593a)continue;if(_0x52593a[_0x7b841d(0x232)])continue;this[_0x7b841d(0x2f5)](this['_actor'],_0x3f58cf,_0x2e0ea3['x'],_0x2520b6,_0x41068e,_0x7b841d(0x2f0)),_0x2520b6+=this['lineHeight'](),_0x10c6c4++;break;case'SP':if(!Imported['VisuMZ_2_SkillLearnSystem'])continue;let _0x253abf=VisuMZ['SkillLearnSystem']['Settings']['SkillPoints'];if(!_0x253abf)continue;if(_0x253abf[_0x7b841d(0x232)])continue;this['drawActorSkillPoints'](this[_0x7b841d(0x3aa)],_0x3f58cf,_0x2e0ea3['x'],_0x2520b6,_0x41068e,_0x7b841d(0x2f0)),_0x2520b6+=this[_0x7b841d(0x11d)](),_0x10c6c4++;break;}}else{if(!_0x381345)return'';const _0x532884=_0x7b841d(0x31a)[_0x7b841d(0x323)](_0x38b2fa[_0x7b841d(0x1c8)](),_0x19773e['currentClass']()['id']);return _0x43c8b1[_0x7b841d(0x393)][_0x532884]??'';}}};function Window_ClassTier(){const _0x146413=_0x25643f;this[_0x146413(0x299)](...arguments);}Window_ClassTier[_0x25643f(0x242)]=Object[_0x25643f(0x179)](Window_ClassCommand[_0x25643f(0x242)]),Window_ClassTier[_0x25643f(0x242)]['constructor']=Window_ClassTier,Window_ClassTier[_0x25643f(0x242)][_0x25643f(0x299)]=function(_0x1ed23b){const _0x4fd6fb=_0x25643f;Window_ClassCommand[_0x4fd6fb(0x242)][_0x4fd6fb(0x299)][_0x4fd6fb(0x2c8)](this,_0x1ed23b);},Window_ClassTier['prototype'][_0x25643f(0x3e3)]=function(){return this['_wordWrap'];},Window_ClassTier['prototype'][_0x25643f(0x318)]=function(){const _0x1b653a=_0x25643f;let _0x27abba=Window_ClassCommand[_0x1b653a(0x242)][_0x1b653a(0x318)][_0x1b653a(0x2c8)](this);if(this['_actor']){if(_0x1b653a(0x276)===_0x1b653a(0x18f)){if(!this[_0x1b653a(0x2ea)])return![];if(!_0x118531[_0x1b653a(0x22e)][_0x1b653a(0x193)][_0x1b653a(0x208)][_0x1b653a(0x344)])return![];return!![];}else{const _0x5bafba=this[_0x1b653a(0x3aa)]['totalMulticlass']()||0x1;_0x27abba=Math['max'](_0x27abba,this[_0x1b653a(0x147)]/_0x5bafba);}}return _0x27abba;},Window_ClassTier[_0x25643f(0x242)][_0x25643f(0x3af)]=function(){const _0x57d01d=_0x25643f;if(this[_0x57d01d(0x253)]){if(_0x57d01d(0x36e)!==_0x57d01d(0x12f)){if(this[_0x57d01d(0x1e2)]()){const _0xcabe8c=VisuMZ['ClassChangeSystem'][_0x57d01d(0x193)][_0x57d01d(0x19d)];if(!_0xcabe8c)return;const _0x4055f5=_0xcabe8c[this['currentExt']()-0x1];if(!_0x4055f5)return;this['_helpWindow'][_0x57d01d(0xe5)](_0x4055f5[_0x57d01d(0x188)]);}else this[_0x57d01d(0x253)][_0x57d01d(0xe5)]('');}else{if(this[_0x57d01d(0x20d)]===_0x4a4d6f)this[_0x57d01d(0x26d)]();return this[_0x57d01d(0x20d)];}}},Window_ClassTier[_0x25643f(0x242)]['makeCommandList']=function(){const _0x183f20=_0x25643f;if(!this[_0x183f20(0x3aa)])return;const _0x3873cf=this[_0x183f20(0x3aa)]['totalMulticlass'](),_0x3b11ab=VisuMZ[_0x183f20(0x22e)]['Settings'][_0x183f20(0x19d)];for(let _0x30939b=0x0;_0x30939b<_0x3873cf;_0x30939b++){const _0x293194=_0x3b11ab[_0x30939b];if(!_0x293194)continue;const _0x21d627=_0x293194['Name'],_0x2cdc9a=_0x30939b+0x1,_0x13132f=this[_0x183f20(0xed)](_0x2cdc9a);this[_0x183f20(0x170)](_0x21d627,_0x183f20(0x283),_0x13132f,_0x2cdc9a);}},Window_ClassTier['prototype'][_0x25643f(0xed)]=function(_0x32faed){const _0x418e2a=_0x25643f;if(this[_0x418e2a(0x3aa)][_0x418e2a(0x1de)](_0x32faed))return![];return _0x32faed>0x0;},Window_ClassTier[_0x25643f(0x242)][_0x25643f(0x29d)]=function(_0x13619f){const _0x12907a=_0x25643f;if(!this['_actor'])return;const _0x57de62=this['itemRectWithPadding'](_0x13619f),_0x3f6bc3=this[_0x12907a(0xfd)][_0x13619f]['ext']||0x1,_0x45b47e=this[_0x12907a(0x3aa)][_0x12907a(0x388)](_0x3f6bc3),_0x1cdfc0=_0x45b47e?_0x45b47e['id']:0x0,_0xdf542d=VisuMZ[_0x12907a(0x22e)]['Settings'][_0x12907a(0x19d)];if(!_0xdf542d)return;const _0x3fd361=_0xdf542d[_0x3f6bc3-0x1];if(!_0x3fd361)return;let _0x260b92=_0x57de62['x'],_0x54a99c=_0x57de62['y'],_0x428885=_0x57de62[_0x12907a(0x1e4)]-this[_0x12907a(0x247)]()*0x2,_0x36f373=_0x57de62[_0x12907a(0x3cb)],_0x12f20a=Math[_0x12907a(0x1f6)](_0x428885,_0x36f373,this[_0x12907a(0x11d)]()*0x3);_0x12f20a=Math[_0x12907a(0x3c9)](_0x12f20a/ImageManager['iconWidth'])*ImageManager[_0x12907a(0x21c)],_0x260b92+=_0x12f20a+this[_0x12907a(0x247)]()*0x4,this[_0x12907a(0x116)](),this[_0x12907a(0x17b)](),this[_0x12907a(0x254)](_0x57de62),this['changePaintOpacity'](this['isEnabled'](_0x3f6bc3)),this[_0x12907a(0xe2)](_0x13619f,_0x45b47e,_0x57de62),this[_0x12907a(0x2e1)](ColorManager[_0x12907a(0x1e9)](_0x3fd361[_0x12907a(0x1d7)])),this[_0x12907a(0x401)](_0x3fd361[_0x12907a(0x32d)],_0x57de62['x'],_0x57de62['y'],_0x57de62[_0x12907a(0x1e4)],_0x12907a(0x18c)),this[_0x12907a(0x17b)]();if(!_0x45b47e){this[_0x12907a(0x39e)](![]);const _0x456eee=Math[_0x12907a(0x185)](_0x57de62['y']+this[_0x12907a(0x11d)]()+(_0x57de62[_0x12907a(0x3cb)]-this[_0x12907a(0x11d)]()*0x2)/0x2);this[_0x12907a(0x401)](TextManager['classChange_multiclass_noClass'],_0x57de62['x'],_0x456eee,_0x57de62[_0x12907a(0x1e4)],_0x12907a(0x18c));return;}_0x54a99c+=this['lineHeight']();let _0x3885c3=_0x45b47e[_0x12907a(0x285)];_0x3885c3=_0x3885c3['replace'](/\x1I\[(\d+)\]/gi,''),_0x3885c3=_0x3885c3[_0x12907a(0x1a6)](/\\I\[(\d+)\]/gi,''),this[_0x12907a(0x401)](_0x3885c3,_0x260b92,_0x54a99c,_0x57de62[_0x12907a(0x1e4)]-_0x260b92),_0x54a99c+=this[_0x12907a(0x11d)](),this[_0x12907a(0xf1)](this[_0x12907a(0x3aa)],_0x1cdfc0,_0x260b92,_0x54a99c-0x4),_0x54a99c+=this[_0x12907a(0x11d)](),this[_0x12907a(0x21d)](_0x1cdfc0,_0x57de62),this[_0x12907a(0x33d)](_0x1cdfc0,_0x3f6bc3,_0x3fd361,_0x57de62);},Window_ClassTier[_0x25643f(0x242)][_0x25643f(0x33d)]=function(){const _0x426c26=_0x25643f,_0x34de22=VisuMZ[_0x426c26(0x22e)][_0x426c26(0x193)][_0x426c26(0x208)]['Window_ClassTier_ExtraJS'];if(_0x34de22){_0x34de22[_0x426c26(0x3ec)](this,arguments);return;}const _0x3be284=arguments[0x0],_0x5eca26=arguments[0x1],_0x7cda8=arguments[0x2],_0x30f4dc=arguments[0x3],_0x511ec7=$dataClasses[_0x3be284],_0x39f840=Imported[_0x426c26(0x137)],_0x1d78e5=!![],_0x20f611=0x16;let _0x3c210d=_0x30f4dc['x']+this[_0x426c26(0x247)]()*0x4,_0x2ffc40=_0x30f4dc['y']+this['lineHeight']()*3.25,_0x4b1530=_0x30f4dc[_0x426c26(0x1e4)]-this['itemPadding']()*0x8;if(_0x7cda8[_0x426c26(0x1c5)]&&_0x2ffc40+this[_0x426c26(0x11d)]()<=_0x30f4dc['y']+_0x30f4dc['height']){let _0x538db2=_0x511ec7[_0x426c26(0x250)][_0x426c26(0x33f)](_0x2888cc=>_0x2888cc[_0x426c26(0x2db)]===Game_BattlerBase[_0x426c26(0x14c)])[_0x426c26(0x402)](_0x5395c2=>$dataSystem[_0x426c26(0x408)][_0x5395c2[_0x426c26(0x160)]])['join'](',\x20'),_0x2b4ada='\x5cC[16]%1:\x5cC[0]\x20\x5cFS[%3]%2'[_0x426c26(0x323)](TextManager['skill'],_0x538db2,_0x20f611||0x16);if(_0x1d78e5)_0x2b4ada=_0x2b4ada['replace'](/\\I\[(\d+)\]/gi,'');if(_0x39f840)_0x2b4ada='<WordWrap>'+_0x2b4ada;this[_0x426c26(0x220)](_0x2b4ada,_0x3c210d,_0x2ffc40,_0x4b1530),_0x2ffc40+=this[_0x426c26(0x11d)]();}if(_0x7cda8[_0x426c26(0x1d8)]&&_0x2ffc40+this[_0x426c26(0x11d)]()<=_0x30f4dc['y']+_0x30f4dc[_0x426c26(0x3cb)]){let _0x199e47=_0x511ec7[_0x426c26(0x250)]['filter'](_0x225402=>_0x225402[_0x426c26(0x2db)]===Game_BattlerBase[_0x426c26(0x2fc)])[_0x426c26(0x402)](_0x46b0d9=>$dataSystem[_0x426c26(0x15c)][_0x46b0d9[_0x426c26(0x160)]])[_0x426c26(0x296)](',\x20'),_0x29e0ae='\x5cC[16]%1:\x5cC[0]\x20\x5cFS[%3]%2'[_0x426c26(0x323)](TextManager[_0x426c26(0x1b1)],_0x199e47,_0x20f611||0x16);if(_0x1d78e5)_0x29e0ae=_0x29e0ae[_0x426c26(0x1a6)](/\\I\[(\d+)\]/gi,'');if(_0x39f840)_0x29e0ae=_0x426c26(0x327)+_0x29e0ae;this[_0x426c26(0x220)](_0x29e0ae,_0x3c210d,_0x2ffc40,_0x4b1530),_0x2ffc40+=this['lineHeight']();}if(_0x7cda8[_0x426c26(0x313)]&&_0x2ffc40+this[_0x426c26(0x11d)]()<=_0x30f4dc['y']+_0x30f4dc[_0x426c26(0x3cb)]){if(_0x426c26(0x371)===_0x426c26(0x371)){let _0x206043=_0x511ec7[_0x426c26(0x250)][_0x426c26(0x33f)](_0x2613bf=>_0x2613bf[_0x426c26(0x2db)]===Game_BattlerBase[_0x426c26(0x35f)])[_0x426c26(0x402)](_0x5228d5=>$dataSystem[_0x426c26(0x3b3)][_0x5228d5[_0x426c26(0x160)]])[_0x426c26(0x296)](',\x20'),_0x12e11a=_0x426c26(0x1d9)['format'](TextManager['armor'],_0x206043,_0x20f611||0x16);if(_0x1d78e5)_0x12e11a=_0x12e11a[_0x426c26(0x1a6)](/\\I\[(\d+)\]/gi,'');if(_0x39f840)_0x12e11a=_0x426c26(0x327)+_0x12e11a;this[_0x426c26(0x220)](_0x12e11a,_0x3c210d,_0x2ffc40,_0x4b1530),_0x2ffc40+=this[_0x426c26(0x11d)]();}else{if(!_0x460710[_0x426c26(0x9f)])return;const _0x4abcd2=_0x59ca28[_0x426c26(0x185)](_0x1baac4[_0x426c26(0x171)]()*this[_0x426c26(0x3d6)]),_0x32f15e=_0x335360[_0x426c26(0x185)](_0x5283de['mpRate']()*this[_0x426c26(0x3c0)]);if(this['hp']>0x0)this['setHp'](_0x4abcd2);if(this['mp']>0x0)this['setMp'](_0x32f15e);}}},Window_ClassTier[_0x25643f(0x242)][_0x25643f(0x38f)]=function(){const _0x4bcacf=_0x25643f;Window_ClassCommand['prototype'][_0x4bcacf(0x38f)][_0x4bcacf(0x2c8)](this),this[_0x4bcacf(0x15d)]();},Window_ClassTier['prototype'][_0x25643f(0x15d)]=function(){const _0x316a9a=_0x25643f;if(!this[_0x316a9a(0x202)]())return;if(!this['_actor'])return;Input[_0x316a9a(0x12e)](_0x316a9a(0x2d6))&&(this[_0x316a9a(0x3aa)]&&(this[_0x316a9a(0x1c6)](this[_0x316a9a(0x3d7)]())?(this[_0x316a9a(0x3c5)](),this[_0x316a9a(0x3af)]()):_0x316a9a(0x2f3)!=='qizfw'?this['playBuzzerSound']():this[_0x316a9a(0x174)]['jobPoints']=_0x1847b4['jobPointsTotal']()));},Window_ClassTier['prototype'][_0x25643f(0x202)]=function(){const _0x3ea69c=_0x25643f;if(!this[_0x3ea69c(0x2ea)])return![];if(!VisuMZ[_0x3ea69c(0x22e)]['Settings'][_0x3ea69c(0x208)][_0x3ea69c(0x344)])return![];return!![];},Window_ClassTier['prototype']['canShiftRemoveClass']=function(_0x275281){const _0x1eaa55=_0x25643f;if(!this['_actor'])return;const _0xa68616=this[_0x1eaa55(0x3d7)]()+0x1;if(_0xa68616<=0x1)return![];if(this[_0x1eaa55(0x3aa)][_0x1eaa55(0x1de)](_0xa68616))return![];if(!this[_0x1eaa55(0x3aa)]['getMulticlassAtTier'](_0xa68616)){if(_0x1eaa55(0x1c9)===_0x1eaa55(0x252))this[_0x1eaa55(0x3f2)]();else return![];}return!![];;},Window_ClassTier[_0x25643f(0x242)]['processShiftRemoveShortcut']=function(){const _0x107924=_0x25643f;SoundManager[_0x107924(0x1d6)](),this[_0x107924(0x3aa)]['changeMulticlass'](0x0,this[_0x107924(0x3d7)]()+0x1),this[_0x107924(0x3d3)](),SceneManager[_0x107924(0x1cb)]['_statusWindow'][_0x107924(0x3d3)]();};function Window_ClassList(){const _0x2dd6aa=_0x25643f;this[_0x2dd6aa(0x299)](...arguments);}Window_ClassList[_0x25643f(0x242)]=Object[_0x25643f(0x179)](Window_ClassCommand[_0x25643f(0x242)]),Window_ClassList['prototype'][_0x25643f(0x3d1)]=Window_ClassList,Window_ClassList['prototype']['initialize']=function(_0x5c650b){const _0xd47111=_0x25643f;this['_tier']=0x1,Window_ClassCommand['prototype']['initialize'][_0xd47111(0x2c8)](this,_0x5c650b);},Window_ClassList[_0x25643f(0x242)][_0x25643f(0x236)]=function(){const _0x2c3b6f=_0x25643f;SoundManager[_0x2c3b6f(0x1d6)]();},Window_ClassList[_0x25643f(0x242)][_0x25643f(0x375)]=function(_0x48830f){const _0x6b9738=_0x25643f;this[_0x6b9738(0x3f1)]=_0x48830f,this['callUpdateHelp']();},Window_ClassList[_0x25643f(0x242)]['updateHelp']=function(){const _0x1042e2=_0x25643f;if(this[_0x1042e2(0x253)]){if(_0x1042e2(0x27b)!=='dJIiF'){const _0x4420c1=this[_0x1042e2(0xef)]();_0x4420c1[_0x1042e2(0x186)](),this[_0x1042e2(0x3f1)][_0x1042e2(0x3a0)](_0x4420c1),this[_0x1042e2(0x364)][_0x1042e2(0x3a0)](_0x4420c1),this['_classListWindow'][_0x1042e2(0x3a0)](_0x4420c1);}else this[_0x1042e2(0x1e2)]()?this[_0x1042e2(0x253)]['setItem'](this[_0x1042e2(0x1e2)]()):_0x1042e2(0x341)!==_0x1042e2(0x341)?this[_0x1042e2(0x1a9)]():this['_helpWindow'][_0x1042e2(0xe5)](TextManager['classChange_multiclass_remove_help']);}if(this[_0x1042e2(0x3aa)]&&this[_0x1042e2(0x3f1)]){if('ZxkAB'!==_0x1042e2(0x1dd))return this[_0x1042e2(0x32c)]()['match'](/LOWER/i);else this['updateStatusWindow']();}},Window_ClassList['prototype'][_0x25643f(0xe8)]=function(){const _0x44a8d7=_0x25643f,_0x238da8=this[_0x44a8d7(0x1e2)](),_0x35904e=JsonEx[_0x44a8d7(0xea)](this[_0x44a8d7(0x3aa)]);_0x35904e[_0x44a8d7(0x258)]=!![],_0x238da8!==this[_0x44a8d7(0x3aa)][_0x44a8d7(0x1c0)]()&&(_0x238da8?'uAcJX'!==_0x44a8d7(0x1aa)?_0x35904e['changeMulticlass'](_0x238da8['id'],this['_tier']):(this[_0x44a8d7(0x35b)](_0x3d44a9),this[_0x44a8d7(0x2bb)](_0x1cec20)):_0x35904e['changeMulticlass'](0x0,this[_0x44a8d7(0x314)])),this[_0x44a8d7(0x3f1)][_0x44a8d7(0x14e)](_0x35904e);},Window_ClassList[_0x25643f(0x242)][_0x25643f(0x34f)]=function(_0x2d4381){const _0x5cd7ab=_0x25643f;this[_0x5cd7ab(0x314)]!==_0x2d4381&&(this[_0x5cd7ab(0x314)]=_0x2d4381,this[_0x5cd7ab(0x3d3)]());},Window_ClassList['prototype']['makeCommandList']=function(){const _0x304d5c=_0x25643f;if(!this[_0x304d5c(0x3aa)])return;if(this['_tier']<=0x0)return;const _0x10de1b=DataManager[_0x304d5c(0x3d2)](this[_0x304d5c(0x3aa)]);for(const _0x5ad9ef of _0x10de1b){if(!_0x5ad9ef)continue;let _0x15603d=_0x5ad9ef['name'];_0x15603d=_0x15603d[_0x304d5c(0x1a6)](/\x1I\[(\d+)\]/gi,''),_0x15603d=_0x15603d[_0x304d5c(0x1a6)](/\\I\[(\d+)\]/gi,'');const _0x46b0ec=this['isEnabled'](_0x5ad9ef);this[_0x304d5c(0x170)](_0x15603d,'classChange',_0x46b0ec,_0x5ad9ef);}this['_tier']>0x1&&this[_0x304d5c(0x170)]('',_0x304d5c(0x339),!![],null);},Window_ClassList[_0x25643f(0x242)][_0x25643f(0xed)]=function(_0x52b30e){const _0x57d35d=_0x25643f;if(this['_actor'][_0x57d35d(0x1de)](this[_0x57d35d(0x314)]))return![];if(this[_0x57d35d(0x314)]>0x1&&_0x52b30e===this['_actor']['currentClass']())return![];if(_0x52b30e){const _0x1543d3=this[_0x57d35d(0x3aa)][_0x57d35d(0x1e5)](_0x52b30e['id']);if(_0x1543d3>0x0&&this['_actor'][_0x57d35d(0x1de)](_0x1543d3))return![];const _0x1cc38d=DataManager[_0x57d35d(0x22b)](_0x52b30e);if(!_0x1cc38d[_0x57d35d(0xf5)](this[_0x57d35d(0x314)]))return![];}return this[_0x57d35d(0x314)]>0x0;},Window_ClassList['prototype'][_0x25643f(0x29d)]=function(_0x509448){const _0x1e4f3e=_0x25643f;if(!this[_0x1e4f3e(0x3aa)])return;const _0x3adf58=this[_0x1e4f3e(0xf0)](_0x509448),_0x39dd2c=this[_0x1e4f3e(0x314)],_0x426b31=this['_list'][_0x509448]['ext'],_0x16ed3b=_0x426b31?_0x426b31['id']:0x0,_0x184fed=VisuMZ[_0x1e4f3e(0x22e)][_0x1e4f3e(0x193)][_0x1e4f3e(0x19d)];if(!_0x184fed)return;const _0xe93767=_0x184fed[_0x39dd2c-0x1];if(!_0xe93767)return;let _0x2d3a66=_0x3adf58['x'],_0x3180b2=_0x3adf58['y'],_0x5638d0=_0x3adf58[_0x1e4f3e(0x1e4)]-this[_0x1e4f3e(0x247)]()*0x2,_0x209a9=_0x3adf58[_0x1e4f3e(0x3cb)],_0x54d9b2=Math[_0x1e4f3e(0x1f6)](_0x5638d0,_0x209a9,this[_0x1e4f3e(0x11d)]()*0x3);_0x54d9b2=Math['floor'](_0x54d9b2/ImageManager[_0x1e4f3e(0x21c)])*ImageManager[_0x1e4f3e(0x21c)],_0x2d3a66+=_0x54d9b2+this[_0x1e4f3e(0x247)]()*0x4,this[_0x1e4f3e(0x116)](),this[_0x1e4f3e(0x17b)](),this[_0x1e4f3e(0x254)](_0x3adf58),this[_0x1e4f3e(0x39e)](this['isEnabled'](_0x426b31));if(!_0x426b31){if('YbiNf'==='YbiNf'){this['changePaintOpacity'](![]);const _0x3d463f=Math[_0x1e4f3e(0x185)](_0x3adf58['y']+this[_0x1e4f3e(0x11d)]()+(_0x3adf58[_0x1e4f3e(0x3cb)]-this[_0x1e4f3e(0x11d)]()*0x2)/0x2);this['drawText'](TextManager[_0x1e4f3e(0x265)],_0x3adf58['x'],_0x3d463f,_0x3adf58[_0x1e4f3e(0x1e4)],'center');return;}else _0x32efe3[_0x1e4f3e(0x384)]=_0x4b27db(_0x89377['$1']);}this[_0x1e4f3e(0xe2)](_0x509448,_0x426b31,_0x3adf58);const _0x3b576d=this['_actor'][_0x1e4f3e(0x1e5)](_0x16ed3b);if(_0x3b576d>0x0){const _0x1a0d02=_0x184fed[_0x3b576d-0x1];_0x1a0d02&&(this[_0x1e4f3e(0x2e1)](ColorManager[_0x1e4f3e(0x1e9)](_0x1a0d02[_0x1e4f3e(0x1d7)])),this[_0x1e4f3e(0x401)](_0x1a0d02[_0x1e4f3e(0x32d)],_0x3adf58['x'],_0x3adf58['y'],_0x3adf58[_0x1e4f3e(0x1e4)],_0x1e4f3e(0x18c)),this['resetTextColor']());}this[_0x1e4f3e(0x39e)](this[_0x1e4f3e(0xed)](_0x426b31)),_0x3180b2+=this[_0x1e4f3e(0x11d)]();let _0x515abc=_0x426b31[_0x1e4f3e(0x285)];_0x515abc=_0x515abc[_0x1e4f3e(0x1a6)](/\x1I\[(\d+)\]/gi,''),_0x515abc=_0x515abc[_0x1e4f3e(0x1a6)](/\\I\[(\d+)\]/gi,''),this[_0x1e4f3e(0x401)](_0x515abc,_0x2d3a66,_0x3180b2,_0x3adf58[_0x1e4f3e(0x1e4)]-_0x2d3a66),_0x3180b2+=this[_0x1e4f3e(0x11d)](),this[_0x1e4f3e(0xf1)](this[_0x1e4f3e(0x3aa)],_0x16ed3b,_0x2d3a66,_0x3180b2-0x4),_0x3180b2+=this[_0x1e4f3e(0x11d)](),this[_0x1e4f3e(0x21d)](_0x16ed3b,_0x3adf58);};
//=============================================================================
// VisuStella MZ - Boost Action
// VisuMZ_3_BoostAction.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BoostAction = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BoostAction = VisuMZ.BoostAction || {};
VisuMZ.BoostAction.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.06] [BoostAction]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Boost_Action_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_MessageCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds Boost Points, a mechanic which augments the potency of
 * skills and/or items based on the type of notetag they have. The newly added
 * mechanic allows actors and/or enemies to temporarily power themselves up for
 * the current turn by using the Boost Points resource. Boost Points are gained
 * at the end of each turn if the battler did not use any Boost Points. While
 * Boosted, actions can deal more damage, hit more times, make buffs/debuffs or
 * states last longer, and more!
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add a new battle resource to your game: Boost Points!
 * * Determine how many Boost Points can be stored at a time!
 * * Also determine how many Boost Points can be used at a time!
 * * Determine how Boosting affects skills and items through the different
 *   kinds of notetags provided through this plug.
 * * Enemies can Boost, too! As long as the proper notetags are in place!
 * * Utilize Shortcut Keys to quickly Boost skills and/or items.
 * * Boosting skills and/or items can also affect the text displayed in the
 *   Help Window, too!
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
 * * VisuMZ_1_SkillsStatesCore
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_3_WeaknessDisplay
 *
 * The "Analyze" ability in the VisuStella MZ Weakness Display can be Boosted
 * through this plugin and reveal multiple weaknesses at a time.
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
 * VisuMZ_1_BattleCore
 * 
 * When using Action Sequences, Boost effects for damage, turn extensions,
 * analyze, etc. will not occur for anything other than the Action Sequence:
 * "MECH: Action Effect" in order to maintain controlled effects. However, if
 * you do want to apply bonuses for Boosts, utilize "MECH: Boost Store Data" to
 * store inside a variable how many times Boosts were used. This can be used
 * however which way you want it to as long as it is manageable through events
 * and Common Events.
 * 
 * ---
 *
 * VisuMZ_2_BattleSystemBTB
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
 * VisuMZ_3_ActiveChainSkills
 * 
 * Boosts now carry over across the entire chain and granting bonuses to all
 * chained skills instead of just the first skill of the chain. The bonus
 * effects of the boosts will end when the chains end.
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
 * === Boost Effect-Related Notetags ===
 * 
 * ---
 *
 * <Boost Damage>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the damage dealt by this skill/item.
 * - The amount of damage increased will be determined by the Plugin Parameter
 *   Mechanical settings for Damage Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Turns>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the duration of skills, buffs, and debuffs added by
 *   this skill/item.
 * - The amount of turns increased will be determined by the Plugin Parameter
 *   Mechanical settings for Turn Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Repeat>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the number of repeated hits dealt by this skill/item.
 * - The amount of hits increased will be determined by the Plugin Parameter
 *   Mechanical settings for Repeated Hits Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Effect Gain>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the number of Boost Points acquired through the
 *   <Target Boost Points: +x> and <User Boost Points: +x> notetags.
 * - The power of the effect will be determined by the Plugin Parameter
 *   Mechanical settings for Effect Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Analyze>
 *
 * - Used for: Skill, Item Notetags
 * - Requires VisuMZ_3_WeaknessDisplay!
 * - Boosts will alter the number of revealed weaknesses by this skill/item.
 * - The amount of weaknesses revealed will be determined by the Plugin
 *   Parameter Mechanical settings for Analyze Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 * 
 * ---
 * 
 * === Boost Points Gain/Loss-Related Notetags ===
 * 
 * ---
 *
 * <User Boost Points: +x>
 * <User Boost Points: -x>
 *
 * <Target Boost Points: +x>
 * <Target Boost Points: -x>
 *
 * - Used for: Skill, Item Notetags
 * - The user/target will gain/lose Boost Points if this skill/item connects.
 * - Replace 'x' with a number representing the number of Boost Points for the
 *   user/target to gain/lose.
 *
 * ---
 *
 * <Boost Points Battle Start: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Determines how many extra (or less) Boost Points the battler will start
 *   a new battle with.
 * - Replace 'x' with a number representing the amount of Boost Points to
 *   increase or decrease the starting Boost Points value by multiplicatively.
 *
 * ---
 *
 * <Boost Points Battle Start: +x>
 * <Boost Points Battle Start: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Determines how many extra (or less) Boost Points the battler will start
 *   a new battle with.
 * - Replace 'x' with a number representing the amount of Boost Points to
 *   increase or decrease the starting Boost Points value by additively.
 *
 * ---
 * 
 * === Boost Point Requirements-Related Notetags ===
 * 
 * The following are notetags that make skills/items require a certain amount
 * of Boost Points to be in "use" before they can become enabled.
 * 
 * ---
 *
 * <Require x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at least x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require >= x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at least x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require > x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require more than x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require = x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require exactly x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require < x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require less than x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require <= x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at most x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 * 
 * === Boosting-Related Notetags ===
 * 
 * ---
 *
 * <Boost Stealed>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - As long as the battler is affected by a trait object with this notetag,
 *   the battler cannot Boost.
 *
 * ---
 * 
 * === Enemy-Related Notetags ===
 * 
 * ---
 *
 * <Boost Skill id: Full>
 * <Boost name: Full>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will use as many Boost
 *   Points as it can to cast it.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: At Least x>
 * <Boost name: At Least x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only use Boost Points
 *   after reaching 'x' Boost Points and will use as much as it can.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: At Most x>
 * <Boost name: At Most x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only as many Boost
 *   Points as it can unless the Boost Points spent go over 'x'.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: Exactly x>
 * <Boost name: Exactly x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only use 'x' Boost
 *   Points when Boosting for the skill.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 * 
 * === Regeneration-Related Notetags ===
 * 
 * ---
 *
 * <Boost Points Regen: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the amount of Boost Points gained when regenerating Boost Points
 *   (as long as the battler can).
 * - Replace 'x' with a number value representing the amount of Boost Points
 *   to increase or decrease the regenerated amount by multiplicatively.
 *
 * ---
 *
 * <Boost Points Regen: +x>
 * <Boost Points Regen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the amount of Boost Points gained when regenerating Boost Points
 *   (as long as the battler can).
 * - Replace 'x' with a number value representing the amount of Boost Points
 *   to increase or decrease the regenerated amount by additively.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Boosting-Related Text Codes ===
 *
 * These text codes are used for Help Window descriptions. When Boosting, the
 * text displayed in the Help Window can change to reflect the amount boosted.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Help Window Text Only)
 * ------------------   -------------------------------------------------------
 * 
 * \boostDamage[x]      This will apply damage modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * \boostTurn[x]        This will apply turn modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * \boostRepeat[x]      This will apply repeat hit modifiers to number x based
 *                      on the actor's currently used Boost amount.
 * 
 * \boostEffect[x]      This will apply Boost Point effect modifiers to number
 *                      x based on the actor's currently used Boost amount.
 * 
 * \boostAnalyze[x]     This will apply analyze modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Help Window Text Only)
 * ------------------   -------------------------------------------------------
 * 
 * \boost[text]         The text inside the brackets won't appear unless at
 *                      least 1 Boost is used.
 * 
 * \boost0[text]        The text inside the brackets won't appear unless if any
 *                      Boost is used.
 * 
 * \boost>=x[text]      The text inside the brackets will only appear if at
 *                      least x Boosts are used.
 * 
 * \boost>x[text]       The text inside the brackets will only appear if more
 *                      than x Boosts are used.
 * 
 * \boost=x[text]       The text inside the brackets will only appear if
 *                      exactly x Boosts are used.
 * 
 * \boost<x[text]       The text inside the brackets will only appear if less
 *                      than x Boosts are used.
 * 
 * \boost<=x[text]      The text inside the brackets will only appear if at
 *                      most x Boosts are used.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * These Plugin Parameters govern the mechanics behind Boost Points and
 * Boosting for this RPG Maker MZ plugin.
 *
 * ---
 *
 * Boost Points
 * 
 *   Max Stored:
 *   - Maximum Boost Points that can be stored at any time.
 * 
 *   Max Usable:
 *   - How many Boost Points can be usable at a time?
 * 
 *   Start Battle:
 *   - How many Boost Points as a base do you want battlers to start
 *     battles with?
 * 
 *   Regeneration:
 *   - How many Boost Points do you want battlers to regenerate each
 *     turn applicable?
 * 
 *     Always Regen?:
 *     - Always regenerate Boost Points each turn?
 *     - Otherwise, regenerate on turns when Boost Points weren't used.
 * 
 *     Death Regen?:
 *     - Regenerate Boost Points while dead?
 *     - Otherwise, don't.
 * 
 *   Death Removal?:
 *   - Remove all stored Boost Points on death?
 *   - Otherwise, keep them.
 *
 * ---
 *
 * Boost Animations
 * 
 *   Animation ID's:
 *   - Animation IDs start from 0 Boosts to max.
 *   - These animations play when Boosting/Unboosting.
 * 
 *   Animation Delay:
 *   - How many milliseconds to play between animations when enemies
 *     Boost actions?
 *
 * ---
 *
 * Boost Modifiers
 * 
 *   Damage:
 * 
 *     Multipliers:
 *     - Damage multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Damage> notetag.
 * 
 *     Addition:
 *     - Damage addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Damage> notetag.
 * 
 *   State/Buff Turns:
 * 
 *     Multipliers:
 *     - Turn multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Turns> notetag.
 * 
 *     Addition:
 *     - Turn addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Turns> notetag.
 * 
 *   Repeated Hits:
 * 
 *     Multipliers:
 *     - Repeat multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Repeat> notetag.
 * 
 *     Addition:
 *     - Repeat addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Repeat> notetag.
 * 
 *   Effect:
 * 
 *     Multipliers:
 *     - Effect multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Effect Gain> notetag.
 * 
 *     Addition:
 *     - Effect addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Effect Gain> notetag.
 * 
 *   Analyze:
 * 
 *     Multipliers:
 *     - Analyze multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Analyze> notetag.
 * 
 *     Addition:
 *     - Analyze addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Analyze> notetag.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * These Plugin Parameter settings govern the visual elements related to Boost
 * Points and Boosting.
 *
 * ---
 *
 * Icons
 * 
 *   Boost Icon:
 *   - What icon do you wish to represent Boosting and
 *     Boost Point availability?
 * 
 *   Empty Icon:
 *   - What icon do you wish to represent Unboosting and
 *     Boost Point absence?
 * 
 *   Icon Size Rate:
 *   - What size do you wish the icons to be displayed at?
 *   - Use a number between 0 and 1 for the best results.
 * 
 *   Smooth Icons?:
 *   - Do you wish to smooth out the icons or pixelate them?
 *
 * ---
 *
 * Vocab
 * 
 *   Boost Command:
 *   - This is the text used for the "Boost" command displayed in the
 *     Actor Command Window.
 * 
 *     Show?:
 *     - Show this command in the Actor Command Window?
 * 
 *   Unboost Command:
 *   - This is the text used for the "Unboost" command displayed in the
 *     Actor Command Window.
 * 
 *     Show?:
 *     - Show this command in the Actor Command Window?
 *
 * ---
 *
 * Shortcut Controls
 * 
 *   Page Up/Dn Shortcuts?:
 *   - Enable Page Up/Down keys to adjust Boost points as a shortcut?
 * 
 *   Bypassed Windows:
 *   - These are constructor names for windows that the shortcut key will not
 *     work on.
 *
 * ---
 *
 * Battle Status
 * 
 *   Show Boost Points?:
 *   - Show Boost Points in the Battle Status Window?
 * 
 *   Auto-Position?:
 *   - Automatically position the Boost Points?
 *   - If not, it'll position it to the upper left.
 * 
 *   Offset X/Y:
 *   - How much to offset the Boost icons X/Y position by?
 *   - For X: Negative goes left. Positive goes right.
 *   - For Y: Negative goes up. Positive goes down.
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
 * Version 1.06: December 15, 2022
 * * Bug Fixes!
 * ** Fixed a crash that would occur with <Seal Attack> notetag on any actor
 *    that focuses on auto-battle. Fix made by Olivia.
 * * Compatibility Update!
 * ** Added better compatibility with Active Chain Skills. Boosts now carry
 *    over across the entire chain and granting bonuses to all chained skills
 *    instead of just the first skill of the chain. The bonus effects of the
 *    boosts will end when the chains end.
 * * Documentation Update!
 * ** Added section to "VisuStella MZ Compatibility"
 * *** VisuMZ_3_ActiveChainSkills
 * **** Boosts now carry over across the entire chain and granting bonuses to
 *      all chained skills instead of just the first skill of the chain. The
 *      bonus effects of the boosts will end when the chains end.
 * 
 * Version 1.05: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: August 27, 2021
 * * Compatibility Update!
 * ** Boost text should now work properly with VisuStella MZ's Party System
 *    switching. Update made by Olivia.
 * 
 * Version 1.03: June 25, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 23, 2021
 * * Bug Fixes!
 * ** Boost icons should no longer disappear after a single battle. Fix made
 *    by Olivia.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** <User Boost Points: +x> notetag should now work properly. Fix by Olivia.
 * 
 * Version 1.00 Official Release Date: May 5, 2021
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
 * @param BoostAction
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Settings for the Boost Action mechanics.
 * @default {"BoostPoints":"","MaxStored:num":"5","Usable:num":"3","StartBattle:num":"1","Regen:num":"1","AlwaysRegen:eval":"false","DeathRegen:eval":"false","DeathRemoval:eval":"true","Animations":"","Animations:arraynum":"[\"12\",\"13\",\"15\",\"14\",\"2\",\"51\",\"52\",\"53\",\"67\",\"66\",\"107\"]","AnimationDelay:num":"800","Modifiers":"","Damage":"","DmgMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","DmgAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Turns":"","TurnMultiply:arraynum":"[\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\"]","TurnAddition:arraynum":"[\"0\",\"2\",\"4\",\"6\",\"8\",\"10\",\"12\",\"14\",\"16\",\"18\",\"20\"]","Repeat":"","RepeatMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","RepeatAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Effect":"","EffectMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","EffectAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Analyze":"","AnalyzeMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","AnalyzeAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Settings for the Boost Action UI.
 * @default {"Icons":"","BoostIcon:num":"163","EmptyIcon:num":"161","IconSizeRate:num":"0.5","SmoothIcons:eval":"true","Vocab":"","BoostCmd:str":"Boost","ShowBoostCmd:eval":"true","UnboostCmd:str":"Unboost","ShowUnboostCmd:eval":"true","Controls":"","PgUpDnShortcuts:eval":"true","BypassConstructors:arraystr":"[\"Window_BattleActor\",\"Window_BattleEnemy\",\"Window_BattleItem\",\"Window_PartyBattleSwitch\"]","BattleStatus":"","BattleStatusShow:eval":"true","BattleStatusAutoPosition:eval":"true","BattleStatusOffsetX:num":"+0","BattleStatusOffsetY:num":"+0"}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param BoostPoints
 * @text Boost Points
 *
 * @param MaxStored:num
 * @text Max Stored
 * @parent BoostPoints
 * @type number
 * @min 1
 * @desc Maximum Boost Points that can be stored at any time.
 * @default 5
 *
 * @param Usable:num
 * @text Max Usable
 * @parent BoostPoints
 * @type number
 * @min 1
 * @desc How many Boost Points can be usable at a time?
 * @default 3
 *
 * @param StartBattle:num
 * @text Start Battle
 * @parent BoostPoints
 * @type number
 * @desc How many Boost Points as a base do you want battlers
 * to start battles with?
 * @default 1
 *
 * @param Regen:num
 * @text Regeneration
 * @parent BoostPoints
 * @type number
 * @desc How many Boost Points do you want battlers to regenerate
 * each turn applicable?
 * @default 1
 *
 * @param AlwaysRegen:eval
 * @text Always Regen?
 * @parent Regen:num
 * @type boolean
 * @on Always
 * @off Other
 * @desc Always regenerate Boost Points each turn? Otherwise,
 * regenerate on turns when Boost Points weren't used.
 * @default false
 *
 * @param DeathRegen:eval
 * @text Death Regen?
 * @parent Regen:num
 * @type boolean
 * @on Regen on Death
 * @off No Regen
 * @desc Regenerate Boost Points while dead?
 * Otherwise, don't.
 * @default false
 *
 * @param DeathRemoval:eval
 * @text Death Removal?
 * @parent BoostPoints
 * @type boolean
 * @on Remove on Death
 * @off No Removal
 * @desc Remove all stored Boost Points on death?
 * Otherwise, keep them.
 * @default true
 * 
 * @param Animations
 * @text Boost Animations
 *
 * @param Animations:arraynum
 * @text Animation ID's
 * @parent Animations
 * @type animation[]
 * @desc Animation IDs start from 0 Boosts to max.
 * These animations play when Boosting/Unboosting.
 * @default ["12","13","15","14","2","51","52","53","67","66","107"]
 *
 * @param AnimationDelay:num
 * @text Animation Delay
 * @parent Animations
 * @type number
 * @desc How many milliseconds to play between animations when
 * enemies Boost actions?
 * @default 1000
 * 
 * @param Modifiers
 * @text Boost Modifiers
 * 
 * @param Damage
 * @parent Modifiers
 *
 * @param DmgMultiply:arraynum
 * @text Multipliers
 * @parent Damage
 * @type string[]
 * @desc Damage multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Damage> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param DmgAddition:arraynum
 * @text Addition
 * @parent Damage
 * @type string[]
 * @desc Damage addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Damage> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Turns
 * @parent Modifiers
 * @text State/Buff Turns
 *
 * @param TurnMultiply:arraynum
 * @text Multipliers
 * @parent Turns
 * @type string[]
 * @desc Turn multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Turns> notetag.
 * @default ["1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0"]
 *
 * @param TurnAddition:arraynum
 * @text Addition
 * @parent Turns
 * @type string[]
 * @desc Turn addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Turns> notetag.
 * @default ["0","2","4","6","8","10","12","14","16","18","20"]
 * 
 * @param Repeat
 * @parent Modifiers
 * @text Repeated Hits
 *
 * @param RepeatMultiply:arraynum
 * @text Multipliers
 * @parent Repeat
 * @type string[]
 * @desc Repeat multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Repeat> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param RepeatAddition:arraynum
 * @text Addition
 * @parent Repeat
 * @type string[]
 * @desc Repeat addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Repeat> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Effect
 * @parent Modifiers
 *
 * @param EffectMultiply:arraynum
 * @text Multipliers
 * @parent Effect
 * @type string[]
 * @desc Effect multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Effect Gain> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param EffectAddition:arraynum
 * @text Addition
 * @parent Effect
 * @type string[]
 * @desc Effect addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Effect Gain> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Analyze
 * @parent Modifiers
 *
 * @param AnalyzeMultiply:arraynum
 * @text Multipliers
 * @parent Analyze
 * @type string[]
 * @desc Analyze multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Analyze> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param AnalyzeAddition:arraynum
 * @text Addition
 * @parent Analyze
 * @type string[]
 * @desc Analyze addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Analyze> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param Icons
 *
 * @param BoostIcon:num
 * @text Boost Icon
 * @parent Icons
 * @desc What icon do you wish to represent Boosting
 * and Boost Point availability?
 * @default 163
 *
 * @param EmptyIcon:num
 * @text Empty Icon
 * @parent Icons
 * @desc What icon do you wish to represent Unboosting
 * and Boost Point absence?
 * @default 161
 *
 * @param IconSizeRate:num
 * @text Icon Size Rate
 * @parent Icons
 * @desc What size do you wish the icons to be displayed at?
 * Use a number between 0 and 1 for the best results.
 * @default 0.5
 *
 * @param SmoothIcons:eval
 * @text Smooth Icons?
 * @parent Icons
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Do you wish to smooth out the icons or pixelate them?
 * @default true
 * 
 * @param Vocab
 *
 * @param BoostCmd:str
 * @text Boost Command
 * @parent Vocab
 * @desc This is the text used for the "Boost" command
 * displayed in the Actor Command Window.
 * @default Boost
 *
 * @param ShowBoostCmd:eval
 * @text Show?
 * @parent BoostCmd:str
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show this command in the Actor Command Window?
 * @default true
 *
 * @param UnboostCmd:str
 * @text Unboost Command
 * @parent Vocab
 * @desc This is the text used for the "Unboost" command
 * displayed in the Actor Command Window.
 * @default Unboost
 *
 * @param ShowUnboostCmd:eval
 * @text Show?
 * @parent UnboostCmd:str
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show this command in the Actor Command Window?
 * @default true
 * 
 * @param Controls
 * @text Shortcut Controls
 *
 * @param PgUpDnShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Controls
 * @type boolean
 * @on Enable Shortcuts
 * @off Disable Shortcuts
 * @desc Enable Page Up/Down keys to adjust Boost points
 * as a shortcut?
 * @default true
 *
 * @param BypassConstructors:arraystr
 * @text Bypassed Windows
 * @parent Controls
 * @type string[]
 * @desc These are constructor names for windows that the shortcut
 * key will not work on.
 * @default ["Window_BattleActor","Window_BattleEnemy","Window_BattleItem","Window_PartyBattleSwitch"]
 * 
 * @param BattleStatus
 * @text Battle Status
 *
 * @param BattleStatusShow:eval
 * @text Show Boost Points?
 * @parent BattleStatus
 * @type boolean
 * @on Show Boost Points
 * @off Hide Boost Points
 * @desc Show Boost Points in the Battle Status Window?
 * @default true
 *
 * @param BattleStatusAutoPosition:eval
 * @text Auto-Position?
 * @parent BattleStatus
 * @type boolean
 * @on Auto-Position
 * @off Manual Position
 * @desc Automatically position the Boost Points?
 * If not, it'll position it to the upper left.
 * @default true
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How much to offset the Boost icons X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How much to offset the Boost icons Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 */
//=============================================================================

const _0x24db6c=_0x3657;(function(_0x5c2854,_0x30c520){const _0x323b64=_0x3657,_0x5b3e57=_0x5c2854();while(!![]){try{const _0x567efc=-parseInt(_0x323b64(0x1b7))/0x1*(-parseInt(_0x323b64(0x1e6))/0x2)+-parseInt(_0x323b64(0x20a))/0x3+-parseInt(_0x323b64(0x26a))/0x4+parseInt(_0x323b64(0x2ba))/0x5*(parseInt(_0x323b64(0x2d7))/0x6)+-parseInt(_0x323b64(0x17d))/0x7*(parseInt(_0x323b64(0x1f6))/0x8)+-parseInt(_0x323b64(0x1cd))/0x9+-parseInt(_0x323b64(0x273))/0xa*(-parseInt(_0x323b64(0x1c2))/0xb);if(_0x567efc===_0x30c520)break;else _0x5b3e57['push'](_0x5b3e57['shift']());}catch(_0x37ecce){_0x5b3e57['push'](_0x5b3e57['shift']());}}}(_0x24c5,0x1ec28));function _0x24c5(){const _0x33b15c=['loadBitmap','Turn','ZJIys','round','Game_Action_numRepeats','Repeat','bpRegenAdded','MPyfB','aJsxh','ljsiL','meetsBoostShortcutRequirements','_storedBoostPoints','1110ofHHsO','sFHct','zmcPm','vMZjI','height','commandUnboost','cursorPagedown','addActor','Damage','maxTurns','wrJwU','VisuMZ_0_CoreEngine','refresh','traitObjects','BOOST_POINTS_DISPLAY_OFFSET_Y','UaIJI','isDead','iconHeight','parse','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','lRFbC','yqOct','reset','boostIcon','convertBoostDamageEscape','replace','EVAL','_bpTurnFlat','match','BattleStatusShow','convertBoost0Escape','sCnKb','ARRAYEVAL','update','fyOGi','BattleManager_endAction','nnMdZ','return\x200','vfjIp','Game_BattlerBase_initialize','canUseBoostShortcut','note','__Game_Action_applyItemUserEffect','isSceneBattle','boostTransferBitmap','\x5cI[%1]%2','drawItemStatusBoostPoints','apply','status','constructor','loadSystem','commandBoost','HVoQD','setBoostSubject','addState','applyBoostPointTurns','startChangeBoostPointsAnimation','IconSizeRate','BoostRepeat','processtoUseBoostPoints','addBoostCommand','VisuMZ_2_BattleSystemBTB','processTurn','activate','convertBoostLessEscape','1953XSOhsX','default','eaUeA','faceWidth','CDwNY','isBTB','mxQXx','eIvYr','endActionBoostPoints','BOOST_ACTION_SHOW','clamp','_helpWindow','BypassConstructors','selectNextCommand','Skill\x20','randomInt','BOOST_POINTS_START_BATTLE','regenerateTp','boostCommandName','setupBoostAI','bpRegenMultipliers','DmgAddition','yvdda','XPOxs','WqLOS','iconWidth','split','drawItemStatusBoostPointsAuto','format','resize','initialize','convertBoostEqualEscape','Game_Party_removeActor','ARRAYSTRUCT','bmSJz','BattleManager_setup','addBuff','greater','HLtcc','_actor','processEnemyBPUsage','oTkAf','UNxOf','_logWindow','processEnemyUseBoost','_customModified','setupBattleBoostPointsMultiplier','setToUseBoostPoints','length','aAiVg','boostMultiplier','requestFauxAnimation','isBoostSealed','BoostCmd','Uitzd','BoostPointsRegenFlat','drawItemStatus','applyBPEffects','16unBOFZ','ULjIk','ShowUnboostCmd','Game_Action_applyGuard','_scene','Amount','currentSymbol','JTCdn','ojkRx','convertEscapeCharacters','addCommand','2904121ebqBES','canUndoBoostPoints','Settings','dCNgT','_actorCommandWindow','resetStateCounts','callUpdateHelp','boostIconsheetBitmap','inBattle','Game_Battler_regenerateAll','STRUCT','1107081yicGQZ','map','convertBoostAnalyzeEscape','BoostIcon','BOOST_POINTS_REGEN_ALWAYS','PgUpDnShortcuts','_bpSubject','wjXGz','BoostBattleStartFlat','wBktI','toUseBoostPoints','BOOST_POINTS_DISPLAY_BATTLE_STATUS','storedBoostPoints','actor%1-boostPoints','UNBOOST_ACTION_SHOW','setupBattleBoostPoints','Game_BattlerBase_resetStateCounts','EiAof','convertBoostGreaterEscape','Mechanics','_toUseBoostPoints','CvLfx','setFrame','VUvVT','VisuMZ_1_SkillsStatesCore','25044QNBqdP','Analyze','actor','_subject','playOkSound','UserBoostPoints','BoostSealed','canUseBoostPoints','lineHeight','list','initBoostAction','ICON_SIZE_RATE','Scene_Battle_createActorCommandWindow','BOOST_POINTS_TURN_REGEN','prototype','NAdkm','1968ZVHrCw','CCVDy','numRepeats','LWGdB','partyChangeRefresh','createActorCommandWindow','BOOST_POINTS_ANIMATION_DELAY','EnemyBoostSkillName','description','Game_Enemy_setup','item','jdvSs','applyBoostPointRepeats','EsTwy','QZwqD','IconSet','create','convertBoostTurnEscape','unboost','EffectAddition','495510RzKzMl','meetstoUseBoostPointsRequirement','BOOST_POINTS_MAX_TOUSE','_boostAI','toUpperCase','Regen','BoostBattleStartRate','Equal','Scene_Battle_selectNextCommand','GreaterEqual','cOmaf','version','portrait','clear','BpEffect','BattleLayout','itemRectWithPadding','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','placeBoostPoints','trim','max','Uwciq','BattleManager_processTurn','bitmap','call','add','_iconIndex','unboostIcon','lHoMQ','itemRect','enemy','UnboostCmd','VisuMZ_1_MessageCore','dimAa','ugNVA','BP\x20Effect','Game_Battler_addDebuff','Scene_Battle_startActorCommandSelection','_slot','Game_Action_apply','VisuMZ_1_BattleCore','BoostAction','BattleCore','NUM','nXcFt','text','PlOoj','Game_Battler_addBuff','endAction','smooth','ceil','gainToUseBoostPoints','tWUqO','Window_Selectable_cursorPageup','convertBoostRepeatEscape','_icons','addLoadListener','EnemyBoostSkillID','zoTJM','regenerateAll','dxnIS','ARRAYSTR','addUnboostCommand','AlwaysRegen','Require','bind','Game_Party_partyChangeRefresh','lGowz','_bpTurnRate','BOOST_POINTS_MULTIPLIERS','cXrHv','floor','boostPointsRegenValue','UjMgU','boostSmooth','initMembers','setStoredBoostPoints','_inBattle','BOOST_POINTS_DISPLAY_AUTO_POS','yIsBx','BOOST_POINTS_ADDITION','_stateTurns','hbKjz','fcIQH','updateFrame','commandStyle','RegExp','boost','DeathRegen','AnalyzeAddition','Window_BattleStatus_drawItemStatus','PZSbt','SmoothIcons','ConvertParams','BOOST_ACTION_BYPASS_CONSTRUCTORS','drawItemStatusBoostPointsDefault','703972cHApaB','RefreshHelpWindowInBattle','applyBoostPointDamage','scale','name','ARRAYNUM','IfXIT','addDebuff','exit','10PASDvo','applyItemUserEffect','oKJGu','updateIcon','_battler','urBsU','TurnMultiply','BOOST_POINTS_ANIMATIONS','allowBoostAction','Window_Base_convertEscapeCharacters','width','vKHsp','cursorPageup','_waitCount','SgoqN','XHSAV','BoostPointsRegenRate','blt','YPkrH','vFLQg','boostAddition','actorId','ySuhb','OzDmM','setupBattleBoostPointsAdded','mLuig','AnimationDelay','convertBoostEffectEscape','JSON','convertBoostEscapeCharacters','_boostIconSheet','calculateBPtoUse','cHxbP','BoostGainPoints','minTurns','unboostCommandName','Game_Battler_addState','LessEqual','BOOST_POINTS_DEATH_REGEN','members','_turnUsedBoostPoints','addChild','SDcNw','Game_Battler_removeBattleStates','includes','convertBoostGreaterEqualEscape','cwIhM','Game_Party_addActor','isHidden','BOOST_POINTS_MAX_STORED','addGuardCommand','EmptyIcon','subject','createInnerSprite','setup','regenerateBoostPoints','MaxStored','DmgMultiply','KPICi','setHandler','BoostDamage','startActorCommandSelection','AnalyzeMultiply','Game_BattlerBase_meetsUsableItemConditions','BOOST_ACTION_SHORTCUT_PAGEUP_PAGEDN','isActor','Window_ActorCommand_addGuardCommand','fYmIm','optDisplayTp','show','convertBoostLessEqualEscape','5255xekwCK','xnncR','zZCma','ShowBoostCmd','YtIFW','GFdqb','removeBattleStates','Window_Selectable_cursorPagedown','meetsUsableItemConditions','convertBoostUpEscape','EffectMultiply','gainStoredBoostPoints','rvhqe','MAuTN','toLowerCase','BOOST_POINTS_DISPLAY_OFFSET_X','clearBoostSubject'];_0x24c5=function(){return _0x33b15c;};return _0x24c5();}var label=_0x24db6c(0x233),tier=tier||0x0,dependencies=[_0x24db6c(0x2e2),_0x24db6c(0x232),_0x24db6c(0x1e5),_0x24db6c(0x22a)],pluginData=$plugins['filter'](function(_0x239d8a){const _0x34fef6=_0x24db6c;return _0x239d8a[_0x34fef6(0x16c)]&&_0x239d8a[_0x34fef6(0x1fe)][_0x34fef6(0x29f)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x24db6c(0x1c4)]||{},VisuMZ[_0x24db6c(0x267)]=function(_0x4d86a2,_0x549d4b){const _0x5f3ea3=_0x24db6c;for(const _0x79fb47 in _0x549d4b){if(_0x5f3ea3(0x21f)!==_0x5f3ea3(0x1b3)){if(_0x79fb47['match'](/(.*):(.*)/i)){if('eejBV'!==_0x5f3ea3(0x2f6)){const _0x4be1f7=String(RegExp['$1']),_0x2fca0a=String(RegExp['$2'])[_0x5f3ea3(0x20e)]()[_0x5f3ea3(0x21d)]();let _0x33f3fd,_0x341131,_0xfe1313;switch(_0x2fca0a){case _0x5f3ea3(0x235):_0x33f3fd=_0x549d4b[_0x79fb47]!==''?Number(_0x549d4b[_0x79fb47]):0x0;break;case _0x5f3ea3(0x26f):_0x341131=_0x549d4b[_0x79fb47]!==''?JSON[_0x5f3ea3(0x2e9)](_0x549d4b[_0x79fb47]):[],_0x33f3fd=_0x341131[_0x5f3ea3(0x1ce)](_0x28799a=>Number(_0x28799a));break;case _0x5f3ea3(0x2f1):_0x33f3fd=_0x549d4b[_0x79fb47]!==''?eval(_0x549d4b[_0x79fb47]):null;break;case _0x5f3ea3(0x2f7):_0x341131=_0x549d4b[_0x79fb47]!==''?JSON[_0x5f3ea3(0x2e9)](_0x549d4b[_0x79fb47]):[],_0x33f3fd=_0x341131[_0x5f3ea3(0x1ce)](_0x2955ed=>eval(_0x2955ed));break;case _0x5f3ea3(0x28f):_0x33f3fd=_0x549d4b[_0x79fb47]!==''?JSON[_0x5f3ea3(0x2e9)](_0x549d4b[_0x79fb47]):'';break;case'ARRAYJSON':_0x341131=_0x549d4b[_0x79fb47]!==''?JSON[_0x5f3ea3(0x2e9)](_0x549d4b[_0x79fb47]):[],_0x33f3fd=_0x341131[_0x5f3ea3(0x1ce)](_0x5943eb=>JSON[_0x5f3ea3(0x2e9)](_0x5943eb));break;case'FUNC':_0x33f3fd=_0x549d4b[_0x79fb47]!==''?new Function(JSON[_0x5f3ea3(0x2e9)](_0x549d4b[_0x79fb47])):new Function(_0x5f3ea3(0x2fc));break;case'ARRAYFUNC':_0x341131=_0x549d4b[_0x79fb47]!==''?JSON[_0x5f3ea3(0x2e9)](_0x549d4b[_0x79fb47]):[],_0x33f3fd=_0x341131[_0x5f3ea3(0x1ce)](_0x53a9dd=>new Function(JSON[_0x5f3ea3(0x2e9)](_0x53a9dd)));break;case'STR':_0x33f3fd=_0x549d4b[_0x79fb47]!==''?String(_0x549d4b[_0x79fb47]):'';break;case _0x5f3ea3(0x247):_0x341131=_0x549d4b[_0x79fb47]!==''?JSON[_0x5f3ea3(0x2e9)](_0x549d4b[_0x79fb47]):[],_0x33f3fd=_0x341131[_0x5f3ea3(0x1ce)](_0x20dcfd=>String(_0x20dcfd));break;case _0x5f3ea3(0x1cc):_0xfe1313=_0x549d4b[_0x79fb47]!==''?JSON['parse'](_0x549d4b[_0x79fb47]):{},_0x33f3fd=VisuMZ[_0x5f3ea3(0x267)]({},_0xfe1313);break;case _0x5f3ea3(0x19e):_0x341131=_0x549d4b[_0x79fb47]!==''?JSON[_0x5f3ea3(0x2e9)](_0x549d4b[_0x79fb47]):[],_0x33f3fd=_0x341131[_0x5f3ea3(0x1ce)](_0x1b8c7e=>VisuMZ[_0x5f3ea3(0x267)]({},JSON[_0x5f3ea3(0x2e9)](_0x1b8c7e)));break;default:continue;}_0x4d86a2[_0x4be1f7]=_0x33f3fd;}else return this[_0x5f3ea3(0x19c)](_0x4bbfb1(arguments[0x1]),_0x598876(arguments[0x2]));}}else _0x9888ff*=_0x254c74(_0x3877ef['$1'])*0.01;}return _0x4d86a2;},(_0x11585d=>{const _0x306188=_0x24db6c,_0x25d64e=_0x11585d[_0x306188(0x26e)];for(const _0xb97c67 of dependencies){if(!Imported[_0xb97c67]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x25d64e,_0xb97c67)),SceneManager[_0x306188(0x272)]();break;}}const _0x3c2116=_0x11585d[_0x306188(0x1fe)];if(_0x3c2116[_0x306188(0x2f3)](/\[Version[ ](.*?)\]/i)){if('ysVBM'!==_0x306188(0x281)){const _0x303848=Number(RegExp['$1']);_0x303848!==VisuMZ[label][_0x306188(0x215)]&&(alert(_0x306188(0x2ea)['format'](_0x25d64e,_0x303848)),SceneManager[_0x306188(0x272)]());}else return'';}if(_0x3c2116[_0x306188(0x2f3)](/\[Tier[ ](\d+)\]/i)){if('OLGNB'===_0x306188(0x183))return this[_0x306188(0x1df)](_0x3a349b(arguments[0x1]),_0x1ae8a6(arguments[0x2]));else{const _0x1493d7=Number(RegExp['$1']);if(_0x1493d7<tier)alert(_0x306188(0x21b)[_0x306188(0x199)](_0x25d64e,_0x1493d7,tier)),SceneManager[_0x306188(0x272)]();else{if('NpSKt'!==_0x306188(0x25d))tier=Math[_0x306188(0x21e)](_0x1493d7,tier);else return this[_0x306188(0x1e1)]===_0xc4e066&&this['initBoostAction'](),this['_toUseBoostPoints'];}}}VisuMZ['ConvertParams'](VisuMZ[label][_0x306188(0x1c4)],_0x11585d['parameters']);})(pluginData),VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x260)]={'BoostDamage':/<(?:BP|BOOST) (?:DMG|DAMAGE)>/i,'BoostTurns':/<(?:BP|BOOST) (?:TURN|TURNS)>/i,'BoostRepeat':/<(?:BP|BOOST) (?:REPEAT|REPEATS|HIT|HITS)>/i,'BoostAnalyze':/<(?:BP|BOOST) (?:ANALYZE|ANALYSIS)>/i,'TargetBoostPoints':/<TARGET (?:BP|BOOST POINT|BOOST POINTS): ([\+\-]\d+)>/i,'UserBoostPoints':/<USER (?:BP|BOOST POINT|BOOST POINTS): ([\+\-]\d+)>/i,'BoostGainPoints':/<(?:BP|BOOST) (?:BP|BOOST POINT|BOOST POINTS|POINT|POINTS|EFFECT|EFFECTS) (?:EFFECT|GAIN|LOSS)>/i,'Require':{'Amount':/<REQUIRE (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'GreaterEqual':/<REQUIRE >= (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Greater':/<REQUIRE > (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Equal':/<REQUIRE = (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Less':/<REQUIRE < (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'LessEqual':/<REQUIRE <= (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i},'BoostSealed':/<(?:BP|BOOST) (?:SEAL|SEALED)>/i,'BoostBattleStartRate':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) BATTLE START: (\d+)([%％])>/i,'BoostBattleStartFlat':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) BATTLE START: ([\+\-]\d+)>/i,'BoostPointsRegenRate':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) REGEN: (\d+)([%％])>/i,'BoostPointsRegenFlat':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) REGEN: ([\+\-]\d+)>/i,'EnemyBoostSkillID':/<BOOST SKILL (\d+):[ ](.*)>/i,'EnemyBoostSkillName':/<BOOST (.*):[ ](.*)>/i},ImageManager['boostIcon']=VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)]['UI'][_0x24db6c(0x1d0)],ImageManager[_0x24db6c(0x225)]=VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)]['UI'][_0x24db6c(0x2a6)],ImageManager['boostSmooth']=VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)]['UI'][_0x24db6c(0x266)],ImageManager[_0x24db6c(0x1c9)]=function(){const _0x48a004=_0x24db6c;if(!this[_0x48a004(0x291)]){this[_0x48a004(0x291)]=new Bitmap();const _0x3e626c=ImageManager[_0x48a004(0x16e)](_0x48a004(0x205));_0x3e626c[_0x48a004(0x242)](this['boostTransferBitmap'][_0x48a004(0x24b)](this,_0x3e626c));}return this[_0x48a004(0x291)];},ImageManager[_0x24db6c(0x303)]=function(_0x487084){const _0x1219ae=_0x24db6c;this[_0x1219ae(0x291)]['resize'](_0x487084[_0x1219ae(0x27d)],_0x487084[_0x1219ae(0x2db)]),this[_0x1219ae(0x291)][_0x1219ae(0x284)](_0x487084,0x0,0x0,_0x487084[_0x1219ae(0x27d)],_0x487084[_0x1219ae(0x2db)],0x0,0x0),this[_0x1219ae(0x291)][_0x1219ae(0x23b)]=ImageManager['boostSmooth'],this['_boostIconSheet']['_customModified']=![];},TextManager[_0x24db6c(0x18f)]=VisuMZ[_0x24db6c(0x233)]['Settings']['UI'][_0x24db6c(0x1b2)],TextManager['unboostCommandName']=VisuMZ['BoostAction'][_0x24db6c(0x1c4)]['UI'][_0x24db6c(0x229)],VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1a0)]=BattleManager[_0x24db6c(0x2a9)],BattleManager[_0x24db6c(0x2a9)]=function(_0x4e3f1b,_0x49ee48,_0x2a5903){const _0x493b5f=_0x24db6c;VisuMZ[_0x493b5f(0x233)][_0x493b5f(0x1a0)][_0x493b5f(0x222)](this,_0x4e3f1b,_0x49ee48,_0x2a5903),$gameParty['setupBattleBoostPoints'](),$gameTroop['setupBattleBoostPoints']();},VisuMZ['BoostAction'][_0x24db6c(0x220)]=BattleManager[_0x24db6c(0x17a)],BattleManager[_0x24db6c(0x17a)]=function(){const _0x21aff8=_0x24db6c;this[_0x21aff8(0x1a9)](),VisuMZ[_0x21aff8(0x233)][_0x21aff8(0x220)][_0x21aff8(0x222)](this);},BattleManager[_0x24db6c(0x1a9)]=function(){const _0x39c8e9=_0x24db6c;var _0x271c3e=this[_0x39c8e9(0x1e9)],_0x29118f=_0x271c3e['currentAction']();if(!!_0x271c3e&&_0x271c3e['isEnemy']()&&!!_0x29118f&&_0x29118f['isSkill']()&&_0x271c3e['storedBoostPoints']()>0x0&&!_0x271c3e['isBoostSealed']()){if(_0x39c8e9(0x1ae)===_0x39c8e9(0x201)){const _0xa63e9e=_0x5195a0[_0x39c8e9(0x233)][_0x39c8e9(0x260)];if(!!this[_0x39c8e9(0x2a7)]()&&!!this[_0x39c8e9(0x200)]()&&this[_0x39c8e9(0x200)]()[_0x39c8e9(0x300)][_0x39c8e9(0x2f3)](_0xa63e9e['BoostRepeat'])){var _0x1662a5=this[_0x39c8e9(0x2a7)]()[_0x39c8e9(0x1af)](_0x39c8e9(0x2d0));_0x58eb6e=_0x55467c['round'](_0x24be88*_0x1662a5),_0x217bf8+=this[_0x39c8e9(0x2a7)]()['boostAddition']('Repeat');}return _0x7a80bc;}else _0x271c3e[_0x39c8e9(0x177)](_0x29118f[_0x39c8e9(0x200)]());}},BattleManager['allowBoostAction']=function(){const _0x5d2ce6=_0x24db6c;if(Imported[_0x5d2ce6(0x179)]&&this[_0x5d2ce6(0x182)]())return![];return!![];},VisuMZ[_0x24db6c(0x233)]['Game_Action_numRepeats']=Game_Action[_0x24db6c(0x1f4)][_0x24db6c(0x1f8)],Game_Action[_0x24db6c(0x1f4)][_0x24db6c(0x1f8)]=function(){const _0x5e6a09=_0x24db6c;var _0x4826b4=VisuMZ[_0x5e6a09(0x233)][_0x5e6a09(0x2cf)][_0x5e6a09(0x222)](this);_0x4826b4=this['applyBoostPointRepeats'](_0x4826b4);return Math[_0x5e6a09(0x2ce)](_0x4826b4);;},Game_Action[_0x24db6c(0x1f4)][_0x24db6c(0x202)]=function(_0x32a80a){const _0x22b2e4=_0x24db6c,_0x334b4c=VisuMZ[_0x22b2e4(0x233)][_0x22b2e4(0x260)];if(!!this[_0x22b2e4(0x2a7)]()&&!!this['item']()&&this['item']()['note'][_0x22b2e4(0x2f3)](_0x334b4c[_0x22b2e4(0x176)])){var _0x248f1e=this[_0x22b2e4(0x2a7)]()[_0x22b2e4(0x1af)](_0x22b2e4(0x2d0));_0x32a80a=Math['round'](_0x32a80a*_0x248f1e),_0x32a80a+=this['subject']()[_0x22b2e4(0x287)](_0x22b2e4(0x2d0));}return _0x32a80a;},VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1ba)]=Game_Action['prototype']['applyGuard'],Game_Action[_0x24db6c(0x1f4)]['applyGuard']=function(_0x1d2690,_0x5336de){const _0x44fc82=_0x24db6c;return _0x1d2690=this[_0x44fc82(0x26c)](_0x1d2690),VisuMZ[_0x44fc82(0x233)][_0x44fc82(0x1ba)][_0x44fc82(0x222)](this,_0x1d2690,_0x5336de);},Game_Action[_0x24db6c(0x1f4)]['applyBoostPointDamage']=function(_0x50d92f){const _0x535a12=_0x24db6c,_0x5288c3=VisuMZ[_0x535a12(0x233)][_0x535a12(0x260)];if(!!this[_0x535a12(0x2a7)]()&&this[_0x535a12(0x200)]()[_0x535a12(0x300)][_0x535a12(0x2f3)](_0x5288c3[_0x535a12(0x2af)])){var _0x3094ce=this[_0x535a12(0x2a7)]()[_0x535a12(0x1af)](_0x535a12(0x2df));_0x50d92f=Math[_0x535a12(0x2ce)](_0x50d92f*_0x3094ce),_0x50d92f+=this[_0x535a12(0x2a7)]()[_0x535a12(0x287)](_0x535a12(0x2df));}return _0x50d92f;},VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x231)]=Game_Action[_0x24db6c(0x1f4)][_0x24db6c(0x16b)],Game_Action[_0x24db6c(0x1f4)][_0x24db6c(0x16b)]=function(_0x900d45){const _0x4243c7=_0x24db6c;this[_0x4243c7(0x173)](![]),VisuMZ[_0x4243c7(0x233)][_0x4243c7(0x231)][_0x4243c7(0x222)](this,_0x900d45),this[_0x4243c7(0x173)](!![]);},Game_Action['prototype'][_0x24db6c(0x173)]=function(_0x4d8490){const _0x5c89e7=_0x24db6c,_0x602efc=VisuMZ[_0x5c89e7(0x233)][_0x5c89e7(0x260)];if(!!this[_0x5c89e7(0x2a7)]()&&this['item']()[_0x5c89e7(0x300)][_0x5c89e7(0x2f3)](_0x602efc['BoostTurns'])){if(_0x5c89e7(0x29d)!=='SDcNw')return![];else{var _0x219bc3=this[_0x5c89e7(0x2a7)]()[_0x5c89e7(0x1af)](_0x5c89e7(0x2cc));$gameTemp[_0x5c89e7(0x24e)]=_0x219bc3,$gameTemp['_bpTurnFlat']=this[_0x5c89e7(0x2a7)]()[_0x5c89e7(0x287)](_0x5c89e7(0x2cc));}}_0x4d8490&&('gTLiS'!=='gTLiS'?(_0x5be49c['BoostAction'][_0x5c89e7(0x1cb)][_0x5c89e7(0x222)](this),_0x49d346[_0x5c89e7(0x299)]&&this[_0x5c89e7(0x2e7)]()&&_0x329a99['inBattle']()&&this[_0x5c89e7(0x2aa)]()):($gameTemp['_bpTurnRate']=undefined,$gameTemp[_0x5c89e7(0x2f2)]=undefined));},VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x301)]=Game_Action[_0x24db6c(0x1f4)][_0x24db6c(0x274)],Game_Action[_0x24db6c(0x1f4)]['applyItemUserEffect']=function(_0x33f7d4){const _0x40d53f=_0x24db6c;VisuMZ[_0x40d53f(0x233)][_0x40d53f(0x301)][_0x40d53f(0x222)](this,_0x33f7d4),this[_0x40d53f(0x1b6)](_0x33f7d4);},Game_Action[_0x24db6c(0x1f4)]['applyBPEffects']=function(_0x125651){const _0x37bb85=_0x24db6c,_0x2271ca=VisuMZ['BoostAction'][_0x37bb85(0x260)];if(!!_0x125651&&this[_0x37bb85(0x200)]()['note'][_0x37bb85(0x2f3)](_0x2271ca['TargetBoostPoints'])){var _0x56f91e=parseInt(RegExp['$1']);this['item']()[_0x37bb85(0x300)]['match'](_0x2271ca[_0x37bb85(0x294)])&&(_0x56f91e=Math['round'](this[_0x37bb85(0x2a7)]()[_0x37bb85(0x1af)]('BP\x20Effect')*_0x56f91e),_0x56f91e+=this[_0x37bb85(0x2a7)]()['boostAddition'](_0x37bb85(0x22d))),_0x125651[_0x37bb85(0x2c5)](_0x56f91e);}if(!!this[_0x37bb85(0x2a7)]()&&this['item']()[_0x37bb85(0x300)][_0x37bb85(0x2f3)](_0x2271ca[_0x37bb85(0x1eb)])){if(_0x37bb85(0x170)!=='hBOQa'){var _0x56f91e=parseInt(RegExp['$1']);this[_0x37bb85(0x200)]()[_0x37bb85(0x300)][_0x37bb85(0x2f3)](_0x2271ca[_0x37bb85(0x294)])&&(_0x37bb85(0x17f)!==_0x37bb85(0x1a3)?(_0x56f91e=Math[_0x37bb85(0x2ce)](this[_0x37bb85(0x2a7)]()[_0x37bb85(0x1af)](_0x37bb85(0x22d))*_0x56f91e),_0x56f91e+=this[_0x37bb85(0x2a7)]()[_0x37bb85(0x287)]('BP\x20Effect')):(this[_0x37bb85(0x26d)]['x']=_0x430a8e[_0x37bb85(0x1f1)],this[_0x37bb85(0x26d)]['y']=_0x2add25[_0x37bb85(0x1f1)])),this[_0x37bb85(0x2a7)]()[_0x37bb85(0x2c5)](_0x56f91e);}else this[_0x37bb85(0x224)]=_0x21f576[_0x37bb85(0x225)],this['x']=_0x59e943[_0x37bb85(0x196)]*(this[_0x37bb85(0x230)]-0x1);}},Game_BattlerBase[_0x24db6c(0x2a4)]=VisuMZ[_0x24db6c(0x233)]['Settings']['Mechanics'][_0x24db6c(0x2ab)],Game_BattlerBase[_0x24db6c(0x20c)]=VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)][_0x24db6c(0x1e0)]['Usable'],Game_BattlerBase[_0x24db6c(0x299)]=VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)]['Mechanics'][_0x24db6c(0x262)],Game_BattlerBase['BOOST_POINTS_DEATH_REMOVE']=VisuMZ['BoostAction']['Settings'][_0x24db6c(0x1e0)]['DeathRemoval'],Game_BattlerBase[_0x24db6c(0x1d1)]=VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)][_0x24db6c(0x1e0)][_0x24db6c(0x249)],Game_BattlerBase['BOOST_POINTS_TURN_REGEN']=VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)][_0x24db6c(0x1e0)][_0x24db6c(0x20f)],Game_BattlerBase['BOOST_POINTS_START_BATTLE']=VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)]['Mechanics']['StartBattle'],VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x2fe)]=Game_BattlerBase['prototype']['initialize'],Game_BattlerBase[_0x24db6c(0x1f4)][_0x24db6c(0x19b)]=function(){const _0x16b686=_0x24db6c;VisuMZ['BoostAction'][_0x16b686(0x2fe)][_0x16b686(0x222)](this),this[_0x16b686(0x1f0)]();},Game_BattlerBase['prototype'][_0x24db6c(0x1f0)]=function(){const _0x31a6d7=_0x24db6c;this['_storedBoostPoints']=this[_0x31a6d7(0x2d6)]||0x0,this['_toUseBoostPoints']=this[_0x31a6d7(0x1e1)]||0x0,this[_0x31a6d7(0x29b)]=this[_0x31a6d7(0x29b)]||0x0;},Game_BattlerBase['prototype'][_0x24db6c(0x1d9)]=function(){const _0x290a0c=_0x24db6c;return this['_storedBoostPoints']===undefined&&this[_0x290a0c(0x1f0)](),this[_0x290a0c(0x2d6)];},Game_BattlerBase[_0x24db6c(0x1f4)]['setStoredBoostPoints']=function(_0xd5e9f2){const _0x3d419e=_0x24db6c;if(this[_0x3d419e(0x2d6)]===undefined){if('CCVDy'!==_0x3d419e(0x1f7)){if(this[_0x3d419e(0x2d5)]()){const _0x3391a2=_0x14daf[_0x3d419e(0x1e8)]();_0x3391a2&&_0x3391a2[_0x3d419e(0x1c3)]()&&(_0x262584['_scene'][_0x3d419e(0x2dc)](!![]),this[_0x3d419e(0x2e3)](),this['callUpdateHelp']()),_0x21ebe1['clear']();}else _0x3f8059[_0x3d419e(0x233)][_0x3d419e(0x23f)]['call'](this);}else this[_0x3d419e(0x1f0)]();}_0xd5e9f2=Math['round'](_0xd5e9f2),this[_0x3d419e(0x2d6)]=_0xd5e9f2['clamp'](0x0,Game_BattlerBase[_0x3d419e(0x2a4)]),this['refresh']();},Game_BattlerBase['prototype'][_0x24db6c(0x1d7)]=function(){const _0x27d342=_0x24db6c;return this[_0x27d342(0x1e1)]===undefined&&this[_0x27d342(0x1f0)](),this[_0x27d342(0x1e1)];},Game_BattlerBase[_0x24db6c(0x1f4)][_0x24db6c(0x1ac)]=function(_0x54fa6a){const _0x3ef196=_0x24db6c;if(this[_0x3ef196(0x1e1)]===undefined){if(_0x3ef196(0x2d3)===_0x3ef196(0x194))return this['convertBoostDamageEscape'](_0x20749d(arguments[0x1]));else this[_0x3ef196(0x1f0)]();}_0x54fa6a=Math[_0x3ef196(0x2ce)](_0x54fa6a),this[_0x3ef196(0x1e1)]=_0x54fa6a[_0x3ef196(0x187)](0x0,Game_BattlerBase[_0x3ef196(0x20c)]),this[_0x3ef196(0x2e3)]();},Game_BattlerBase[_0x24db6c(0x1f4)][_0x24db6c(0x252)]=function(){const _0x24387d=_0x24db6c;if(!Game_BattlerBase[_0x24387d(0x299)]&&(this['isDead']()||this[_0x24387d(0x2a3)]())){if(_0x24387d(0x184)===_0x24387d(0x184))return 0x0;else this[_0x24387d(0x291)][_0x24387d(0x19a)](_0x57af66['width'],_0x3da905[_0x24387d(0x2db)]),this[_0x24387d(0x291)][_0x24387d(0x284)](_0x107099,0x0,0x0,_0x7a913c[_0x24387d(0x27d)],_0x2244b9[_0x24387d(0x2db)],0x0,0x0),this[_0x24387d(0x291)][_0x24387d(0x23b)]=_0x5284fa[_0x24387d(0x254)],this[_0x24387d(0x291)][_0x24387d(0x1aa)]=![];}else{if(_0x24387d(0x1d6)!==_0x24387d(0x1d6)){this[_0x24387d(0x228)]()['_boostAI']={};var _0x4cb6e8=this['enemy']()['note'][_0x24387d(0x197)](/[\r\n]+/);for(var _0x5a4f82=0x0;_0x5a4f82<_0x4cb6e8['length'];_0x5a4f82++){var _0x1b90dd=_0x4cb6e8[_0x5a4f82];if(_0x1b90dd[_0x24387d(0x2f3)](_0x86bd21[_0x24387d(0x243)])){var _0xf09e44=_0x24387d(0x18b)+_0x3bb480(_0x44a758['$1']),_0xdaf0aa=_0x3890b4(_0x3ddeb9['$2'])['toLowerCase']();this[_0x24387d(0x228)]()[_0x24387d(0x20d)][_0xf09e44]=_0xdaf0aa;}else{if(_0x1b90dd[_0x24387d(0x2f3)](_0x44b1e8[_0x24387d(0x1fd)])){var _0x2290e3=_0x3cf084(_0x26826b['$1']),_0xdaf0aa=_0x59f701(_0x531e8e['$2'])['toLowerCase']();this['enemy']()[_0x24387d(0x20d)][_0x2290e3]=_0xdaf0aa;}}}}else{var _0x56a697=Game_BattlerBase[_0x24387d(0x1f3)];return _0x56a697=this[_0x24387d(0x191)](_0x56a697),_0x56a697=this['bpRegenAdded'](_0x56a697),_0x56a697;}}},Game_BattlerBase[_0x24db6c(0x1f4)]['isBoostSealed']=function(){const _0x3bc080=_0x24db6c,_0x4b9a81=this[_0x3bc080(0x2e4)](),_0x17e468=VisuMZ[_0x3bc080(0x233)][_0x3bc080(0x260)];return _0x4b9a81['some'](_0x4ee29a=>_0x4ee29a&&_0x4ee29a[_0x3bc080(0x300)][_0x3bc080(0x2f3)](_0x17e468[_0x3bc080(0x1ec)]));},VisuMZ['BoostAction'][_0x24db6c(0x1dd)]=Game_BattlerBase[_0x24db6c(0x1f4)][_0x24db6c(0x1c7)],Game_BattlerBase['prototype'][_0x24db6c(0x1c7)]=function(_0x2051b9){const _0x64f9b6=_0x24db6c;var _0x58e160=this[_0x64f9b6(0x25b)][_0x2051b9]||0x0;VisuMZ[_0x64f9b6(0x233)][_0x64f9b6(0x1dd)][_0x64f9b6(0x222)](this,_0x2051b9);if(!!$gameTemp[_0x64f9b6(0x24e)]){if(_0x64f9b6(0x2e6)!==_0x64f9b6(0x2e6))var _0xa157d2=_0x2f05ec[_0x64f9b6(0x1e7)];else{$gameTemp[_0x64f9b6(0x2f2)]=$gameTemp[_0x64f9b6(0x2f2)]||0x0;var _0x11f1a6=$dataStates[_0x2051b9],_0x57f3dc=Math[_0x64f9b6(0x2ce)](_0x11f1a6[_0x64f9b6(0x2e0)]*$gameTemp[_0x64f9b6(0x24e)])+$gameTemp[_0x64f9b6(0x2f2)],_0x25f768=Math[_0x64f9b6(0x2ce)](_0x11f1a6[_0x64f9b6(0x295)]*$gameTemp['_bpTurnRate'])+$gameTemp[_0x64f9b6(0x2f2)],_0xd683a6=0x1+Math['max'](_0x57f3dc-_0x25f768,0x0);const _0x14de06=this['getStateReapplyRulings'](_0x11f1a6)[_0x64f9b6(0x2c8)]()['trim']();switch(_0x14de06){case _0x64f9b6(0x2ed):this[_0x64f9b6(0x25b)][_0x2051b9]=_0x25f768+Math[_0x64f9b6(0x18c)](_0xd683a6);break;case _0x64f9b6(0x1a2):const _0x3f35e0=this[_0x64f9b6(0x25b)][_0x2051b9],_0x2a26b4=_0x25f768+Math['randomInt'](_0xd683a6);this['_stateTurns'][_0x2051b9]=Math['max'](_0x3f35e0,_0x2a26b4);break;case _0x64f9b6(0x223):this[_0x64f9b6(0x25b)][_0x2051b9]=_0x25f768+Math[_0x64f9b6(0x18c)](_0xd683a6)+_0x58e160;break;}}}},VisuMZ['BoostAction']['Game_BattlerBase_meetsUsableItemConditions']=Game_BattlerBase[_0x24db6c(0x1f4)][_0x24db6c(0x2c2)],Game_BattlerBase[_0x24db6c(0x1f4)][_0x24db6c(0x2c2)]=function(_0x52cef7){const _0x1b14c7=_0x24db6c;if(VisuMZ[_0x1b14c7(0x233)][_0x1b14c7(0x2b2)][_0x1b14c7(0x222)](this,_0x52cef7)){if('MPyfB'!==_0x1b14c7(0x2d2)){let _0x37b437=_0x1e2a1d*(_0x57f745-0x1);_0x48d76a(_0x22aff7[_0x1b14c7(0x1b0)][_0x1b14c7(0x24b)](_0x2ce022,[this],_0x6bb6e1,![],![]),_0x37b437);}else return this[_0x1b14c7(0x20b)](_0x52cef7);}else return![];},Game_BattlerBase[_0x24db6c(0x1f4)]['meetstoUseBoostPointsRequirement']=function(_0xcc77ce){const _0x2c8fb5=_0x24db6c,_0x5d29b0=VisuMZ[_0x2c8fb5(0x233)][_0x2c8fb5(0x260)];var _0x656a80=_0xcc77ce['note'];if(_0x656a80[_0x2c8fb5(0x2f3)](_0x5d29b0[_0x2c8fb5(0x24a)][_0x2c8fb5(0x1bc)])||_0x656a80['match'](_0x5d29b0['Require'][_0x2c8fb5(0x213)])){if(_0x2c8fb5(0x2bf)===_0x2c8fb5(0x2bf)){var _0x1f918a=parseInt(RegExp['$1']);if(this[_0x2c8fb5(0x2b4)]()){if(_0x2c8fb5(0x226)===_0x2c8fb5(0x226))return this[_0x2c8fb5(0x1d7)]()>=_0x1f918a;else this[_0x2c8fb5(0x277)]=_0x4e3c53;}else return _0x2c8fb5(0x2c7)===_0x2c8fb5(0x2c7)?this[_0x2c8fb5(0x1d9)]()>=_0x1f918a:this[_0x2c8fb5(0x2b9)](_0x3f3c8e(arguments[0x1]),_0x5ee120(arguments[0x2]));}else _0x22c05a=this[_0x2c8fb5(0x1d9)]();}else{if(_0xcc77ce[_0x2c8fb5(0x300)][_0x2c8fb5(0x2f3)](_0x5d29b0[_0x2c8fb5(0x24a)][_0x2c8fb5(0x213)])){if('EUvam'==='dQQYg')this[_0x2c8fb5(0x19b)](...arguments);else{var _0x1f918a=parseInt(RegExp['$1']);return this[_0x2c8fb5(0x2b4)]()?this[_0x2c8fb5(0x1d7)]()>_0x1f918a:this[_0x2c8fb5(0x1d9)]()>_0x1f918a;}}else{if(_0xcc77ce[_0x2c8fb5(0x300)][_0x2c8fb5(0x2f3)](_0x5d29b0[_0x2c8fb5(0x24a)][_0x2c8fb5(0x211)])){if(_0x2c8fb5(0x282)!=='ZeXhW'){var _0x1f918a=parseInt(RegExp['$1']);if(this[_0x2c8fb5(0x2b4)]())return this['toUseBoostPoints']()===_0x1f918a;else{if(_0x2c8fb5(0x275)!==_0x2c8fb5(0x238))return this[_0x2c8fb5(0x1d9)]()===_0x1f918a;else{if(!!this[_0x2c8fb5(0x1d3)]){var _0x2eff7f=this[_0x2c8fb5(0x1d3)][_0x2c8fb5(0x1af)](_0x2c8fb5(0x2cc));_0x28ac7a=_0x3baa76['round'](_0xeabf6d*_0x2eff7f),_0x4f9c6c+=this[_0x2c8fb5(0x1d3)][_0x2c8fb5(0x287)](_0x2c8fb5(0x2cc));}return _0x4fa4a2;}}}else return this[_0x2c8fb5(0x1d7)]()<=_0x4fcce1;}else{if(_0xcc77ce['note'][_0x2c8fb5(0x2f3)](_0x5d29b0['Require']['Less'])){var _0x1f918a=parseInt(RegExp['$1']);if(this[_0x2c8fb5(0x2b4)]())return this['toUseBoostPoints']()<_0x1f918a;else{if('oTkAf'!==_0x2c8fb5(0x1a6))_0x51bd5e[_0x2c8fb5(0x233)][_0x2c8fb5(0x22f)][_0x2c8fb5(0x222)](this),this[_0x2c8fb5(0x188)]&&this['_helpWindow']['setBoostSubject'](_0x14e6dc[_0x2c8fb5(0x1e8)]());else return this['storedBoostPoints']()<_0x1f918a;}}else{if(_0xcc77ce['note'][_0x2c8fb5(0x2f3)](_0x5d29b0[_0x2c8fb5(0x24a)][_0x2c8fb5(0x298)])){if(_0x2c8fb5(0x2bc)!==_0x2c8fb5(0x2a1)){var _0x1f918a=parseInt(RegExp['$1']);if(this[_0x2c8fb5(0x2b4)]()){if('lRFbC'!==_0x2c8fb5(0x2eb))_0x51a5ba[_0x2c8fb5(0x1f4)][_0x2c8fb5(0x1ea)][_0x2c8fb5(0x222)](this);else return this[_0x2c8fb5(0x1d7)]()<=_0x1f918a;}else return this[_0x2c8fb5(0x1d9)]()<=_0x1f918a;}else return _0x54e23a;}else{if(_0x2c8fb5(0x203)==='gIYqx'){const _0x2b6e82=new _0x595ba7(_0x1b6351);this[_0x2c8fb5(0x29c)](_0x2b6e82),this[_0x2c8fb5(0x241)]['push'](_0x2b6e82);}else return!![];}}}}}},Game_Battler[_0x24db6c(0x24f)]={'Damage':VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)][_0x24db6c(0x1e0)][_0x24db6c(0x2ac)],'Turn':VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)]['Mechanics'][_0x24db6c(0x279)],'Repeat':VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)][_0x24db6c(0x1e0)]['RepeatMultiply'],'BpEffect':VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)][_0x24db6c(0x1e0)][_0x24db6c(0x2c4)],'Analyze':VisuMZ[_0x24db6c(0x233)]['Settings']['Mechanics'][_0x24db6c(0x2b1)]},Game_Battler[_0x24db6c(0x25a)]={'Damage':VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)]['Mechanics'][_0x24db6c(0x192)],'Turn':VisuMZ['BoostAction']['Settings'][_0x24db6c(0x1e0)]['TurnAddition'],'Repeat':VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)][_0x24db6c(0x1e0)]['RepeatAddition'],'BpEffect':VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)][_0x24db6c(0x1e0)][_0x24db6c(0x209)],'Analyze':VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)][_0x24db6c(0x1e0)][_0x24db6c(0x263)]},Game_Battler[_0x24db6c(0x27a)]=VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)][_0x24db6c(0x1e0)]['Animations'],Game_Battler[_0x24db6c(0x1f4)][_0x24db6c(0x2c5)]=function(_0x21a180){const _0x96c59=_0x24db6c;this['setStoredBoostPoints'](this[_0x96c59(0x1d9)]()+_0x21a180);},Game_Battler[_0x24db6c(0x1f4)][_0x24db6c(0x23d)]=function(_0x1fa3fa){const _0xbe35c2=_0x24db6c;this['setToUseBoostPoints'](this[_0xbe35c2(0x1d7)]()+_0x1fa3fa);},Game_Battler[_0x24db6c(0x1f4)]['boostMultiplier']=function(_0x1fc60e){const _0x502e59=_0x24db6c,_0x59df3d=Game_Battler[_0x502e59(0x24f)];if(_0x1fc60e[_0x502e59(0x2f3)](/Damage/i))var _0x3dac1a=_0x59df3d[_0x502e59(0x2df)];else{if(_0x1fc60e['match'](/Turn/i)){if('ROWsS'===_0x502e59(0x2bb))return this[_0x502e59(0x1d9)]()<_0x278174;else var _0x3dac1a=_0x59df3d[_0x502e59(0x2cc)];}else{if(_0x1fc60e[_0x502e59(0x2f3)](/Repeat/i))var _0x3dac1a=_0x59df3d[_0x502e59(0x2d0)];else{if(_0x1fc60e['match'](/BP Effect/i)){if(_0x502e59(0x286)!==_0x502e59(0x2be))var _0x3dac1a=_0x59df3d[_0x502e59(0x218)];else return _0x3e8caf;}else{if(_0x1fc60e[_0x502e59(0x2f3)](/Analyze/i))var _0x3dac1a=_0x59df3d[_0x502e59(0x1e7)];else return this[_0x502e59(0x1d7)]();}}}}var _0x38c643=this[_0x502e59(0x1d7)]();return _0x3dac1a[_0x38c643]||_0x3dac1a[0x0];},Game_Battler[_0x24db6c(0x1f4)][_0x24db6c(0x287)]=function(_0x4d5dee){const _0x214838=_0x24db6c,_0x2ed833=Game_Battler[_0x214838(0x25a)];if(_0x4d5dee['match'](/Damage/i)){if(_0x214838(0x270)!==_0x214838(0x270))this[_0x214838(0x1c6)][_0x214838(0x17b)]();else var _0x33f778=_0x2ed833['Damage'];}else{if(_0x4d5dee[_0x214838(0x2f3)](/Turn/i)){if(_0x214838(0x246)===_0x214838(0x19f))this[_0x214838(0x1c6)]['activate']();else var _0x33f778=_0x2ed833[_0x214838(0x2cc)];}else{if(_0x4d5dee['match'](/Repeat/i))var _0x33f778=_0x2ed833[_0x214838(0x2d0)];else{if(_0x4d5dee[_0x214838(0x2f3)](/BP Effect/i)){if(_0x214838(0x1f5)!=='NAdkm'){if(!this[_0x214838(0x291)]){this[_0x214838(0x291)]=new _0x1ca719();const _0x39ee64=_0x4b4056[_0x214838(0x16e)](_0x214838(0x205));_0x39ee64['addLoadListener'](this[_0x214838(0x303)]['bind'](this,_0x39ee64));}return this[_0x214838(0x291)];}else var _0x33f778=_0x2ed833[_0x214838(0x218)];}else{if(_0x4d5dee[_0x214838(0x2f3)](/Analyze/i))var _0x33f778=_0x2ed833[_0x214838(0x1e7)];else{if(_0x214838(0x236)==='nXcFt')return this[_0x214838(0x1d7)]();else this[_0x214838(0x224)]=_0xe6df8[_0x214838(0x2ee)];}}}}}var _0x4e87e6=this[_0x214838(0x1d7)]();return parseInt(_0x33f778[_0x4e87e6]||_0x33f778[0x0]);},Game_Battler['prototype'][_0x24db6c(0x1dc)]=function(){const _0x12902f=_0x24db6c;var _0x2cd744=Game_BattlerBase[_0x12902f(0x18d)];_0x2cd744=this[_0x12902f(0x1ab)](_0x2cd744),_0x2cd744=this[_0x12902f(0x28b)](_0x2cd744),_0x2cd744=Math[_0x12902f(0x2ce)](_0x2cd744),this[_0x12902f(0x256)](_0x2cd744);},Game_Battler[_0x24db6c(0x1f4)][_0x24db6c(0x1ab)]=function(_0x1931fc){const _0x57ceee=_0x24db6c,_0x256376=this[_0x57ceee(0x2e4)](),_0x401a1f=VisuMZ[_0x57ceee(0x233)]['RegExp'];for(const _0x14450b of _0x256376){if(_0x57ceee(0x2ec)!==_0x57ceee(0x2ec))_0x360cb1[_0x57ceee(0x2f2)]=_0x3e10b0[_0x57ceee(0x2f2)]||0x0,_0x4d72a3=_0x1db65e['round'](_0x135b04['_bpTurnRate']*_0x1834c7)+_0xc8f65['_bpTurnFlat'];else{if(!_0x14450b)continue;_0x14450b[_0x57ceee(0x300)][_0x57ceee(0x2f3)](_0x401a1f[_0x57ceee(0x210)])&&('sRqDt'!==_0x57ceee(0x265)?_0x1931fc*=Number(RegExp['$1'])*0.01:this[_0x57ceee(0x2c5)](this['boostPointsRegenValue']()));}}return _0x1931fc;},Game_Battler[_0x24db6c(0x1f4)][_0x24db6c(0x28b)]=function(_0xdc34ce){const _0x50afae=_0x24db6c,_0x5a4b41=this[_0x50afae(0x2e4)](),_0x356d4e=VisuMZ[_0x50afae(0x233)][_0x50afae(0x260)];for(const _0x42efd3 of _0x5a4b41){if(!_0x42efd3)continue;_0x42efd3['note'][_0x50afae(0x2f3)](_0x356d4e[_0x50afae(0x1d5)])&&(_0x50afae(0x1f9)==='HUzVT'?(_0x520c3b['BoostAction'][_0x50afae(0x1f2)][_0x50afae(0x222)](this),this[_0x50afae(0x1c6)][_0x50afae(0x2ae)]('boost',this[_0x50afae(0x16f)][_0x50afae(0x24b)](this)),this[_0x50afae(0x1c6)][_0x50afae(0x2ae)](_0x50afae(0x208),this[_0x50afae(0x2dc)][_0x50afae(0x24b)](this))):_0xdc34ce+=Number(RegExp['$1']));}return _0xdc34ce;},Game_Battler[_0x24db6c(0x1f4)][_0x24db6c(0x174)]=function(){const _0x1d9cad=_0x24db6c;var _0x33cf24=this[_0x1d9cad(0x1d7)]()['clamp'](0x0,Game_BattlerBase['BOOST_POINTS_MAX_TOUSE']);const _0x35264d=Game_Battler[_0x1d9cad(0x27a)];var _0x3f21be=Number(_0x35264d[_0x33cf24]||_0x35264d[0x0]);_0x3f21be>0x0&&$gameTemp[_0x1d9cad(0x1b0)]([this],_0x3f21be,![],![]);},Game_Battler['prototype']['canUseBoostPoints']=function(){const _0x182fab=_0x24db6c;if(this[_0x182fab(0x1b1)]())return![];return this[_0x182fab(0x1d7)]()<Game_BattlerBase[_0x182fab(0x20c)]&&this['storedBoostPoints']()>0x0;},Game_Battler[_0x24db6c(0x1f4)][_0x24db6c(0x1c3)]=function(){const _0x11e39b=_0x24db6c;return this[_0x11e39b(0x1d7)]()>0x0;},VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x29e)]=Game_Battler['prototype'][_0x24db6c(0x2c0)],Game_Battler['prototype'][_0x24db6c(0x2c0)]=function(){const _0x3e696e=_0x24db6c;VisuMZ[_0x3e696e(0x233)]['Game_Battler_removeBattleStates']['call'](this),this[_0x3e696e(0x2d6)]=0x0,this[_0x3e696e(0x1e1)]=0x0;},VisuMZ['BoostAction']['Game_Battler_regenerateTp']=Game_Battler[_0x24db6c(0x1f4)][_0x24db6c(0x18e)],Game_Battler['prototype'][_0x24db6c(0x18e)]=function(){const _0x16dac9=_0x24db6c;VisuMZ['BoostAction']['Game_Battler_regenerateTp'][_0x16dac9(0x222)](this),this[_0x16dac9(0x2aa)]();},VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1cb)]=Game_Battler[_0x24db6c(0x1f4)][_0x24db6c(0x245)],Game_Battler[_0x24db6c(0x1f4)][_0x24db6c(0x245)]=function(){const _0x570568=_0x24db6c;VisuMZ[_0x570568(0x233)]['Game_Battler_regenerateAll'][_0x570568(0x222)](this),Game_BattlerBase[_0x570568(0x299)]&&this[_0x570568(0x2e7)]()&&$gameParty[_0x570568(0x1ca)]()&&this['regenerateBoostPoints']();},Game_Battler[_0x24db6c(0x1f4)][_0x24db6c(0x2aa)]=function(){const _0x5d2b8d=_0x24db6c;(Game_BattlerBase[_0x5d2b8d(0x1d1)]||this[_0x5d2b8d(0x29b)]<=0x0)&&(_0x5d2b8d(0x22b)!==_0x5d2b8d(0x244)?this[_0x5d2b8d(0x2c5)](this[_0x5d2b8d(0x252)]()):this['_subject'][_0x5d2b8d(0x185)]()),this[_0x5d2b8d(0x29b)]=0x0;},VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x2fa)]=BattleManager['endAction'],BattleManager[_0x24db6c(0x23a)]=function(){const _0x31e5f1=_0x24db6c;this[_0x31e5f1(0x1e9)]&&this[_0x31e5f1(0x1e9)][_0x31e5f1(0x185)](),VisuMZ[_0x31e5f1(0x233)][_0x31e5f1(0x2fa)][_0x31e5f1(0x222)](this);},Game_Battler[_0x24db6c(0x1f4)][_0x24db6c(0x185)]=function(){const _0x5cc239=_0x24db6c;if(Imported['VisuMZ_3_ActiveChainSkills']&&$gameTemp['getActiveChainSkillSelected']()){if(_0x5cc239(0x28a)!==_0x5cc239(0x2b6))return;else return _0xa298dc;}this[_0x5cc239(0x29b)]+=this[_0x5cc239(0x1d7)](),this[_0x5cc239(0x1ac)](0x0);},Game_Battler[_0x24db6c(0x1f4)][_0x24db6c(0x191)]=function(_0x174013){const _0xe09d92=_0x24db6c,_0x1620f4=this[_0xe09d92(0x2e4)](),_0x131a74=VisuMZ[_0xe09d92(0x233)][_0xe09d92(0x260)];for(const _0x3e1568 of _0x1620f4){if(!_0x3e1568)continue;if(_0x3e1568[_0xe09d92(0x300)]['match'](_0x131a74[_0xe09d92(0x283)])){if(_0xe09d92(0x181)!=='QoFmI')_0x174013*=Number(RegExp['$1'])*0.01;else return!!this[_0xe09d92(0x1d3)]&&this[_0xe09d92(0x1d3)][_0xe09d92(0x1d7)]()>_0x47797e?_0x15cfe5:'';}}return _0x174013;},Game_Battler[_0x24db6c(0x1f4)][_0x24db6c(0x2d1)]=function(_0x14a27c){const _0x1a6b9f=_0x24db6c,_0xe18b81=this[_0x1a6b9f(0x2e4)](),_0x50a1e1=VisuMZ[_0x1a6b9f(0x233)][_0x1a6b9f(0x260)];for(const _0x3a022e of _0xe18b81){if(_0x1a6b9f(0x1e4)!==_0x1a6b9f(0x1e4))return'';else{if(!_0x3a022e)continue;_0x3a022e[_0x1a6b9f(0x300)][_0x1a6b9f(0x2f3)](_0x50a1e1[_0x1a6b9f(0x1b4)])&&(_0x14a27c+=Number(RegExp['$1']));}}return _0x14a27c;},VisuMZ['BoostAction'][_0x24db6c(0x297)]=Game_Battler['prototype'][_0x24db6c(0x172)],Game_Battler[_0x24db6c(0x1f4)]['addState']=function(_0xb1f278){const _0x39b11e=_0x24db6c;var _0x14e701=this[_0x39b11e(0x2e7)]();VisuMZ[_0x39b11e(0x233)]['Game_Battler_addState'][_0x39b11e(0x222)](this,_0xb1f278);if(Game_BattlerBase['BOOST_POINTS_DEATH_REMOVE']&&!_0x14e701&&this[_0x39b11e(0x2e7)]()){if(_0x39b11e(0x23e)===_0x39b11e(0x23e))this[_0x39b11e(0x256)](0x0);else{if(_0x22c078['VisuMZ_3_ActiveChainSkills']&&_0x4ff242['getActiveChainSkillSelected']())return;this['_turnUsedBoostPoints']+=this[_0x39b11e(0x1d7)](),this[_0x39b11e(0x1ac)](0x0);}}},VisuMZ['BoostAction'][_0x24db6c(0x239)]=Game_Battler[_0x24db6c(0x1f4)][_0x24db6c(0x1a1)],Game_Battler[_0x24db6c(0x1f4)][_0x24db6c(0x1a1)]=function(_0xe79669,_0x5b63aa){const _0x4471d0=_0x24db6c;!!$gameTemp['_bpTurnRate']&&($gameTemp['_bpTurnFlat']=$gameTemp[_0x4471d0(0x2f2)]||0x0,_0x5b63aa=Math[_0x4471d0(0x2ce)]($gameTemp[_0x4471d0(0x24e)]*_0x5b63aa)+$gameTemp[_0x4471d0(0x2f2)]),VisuMZ['BoostAction'][_0x4471d0(0x239)][_0x4471d0(0x222)](this,_0xe79669,_0x5b63aa);},VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x22e)]=Game_Battler[_0x24db6c(0x1f4)][_0x24db6c(0x271)],Game_Battler['prototype'][_0x24db6c(0x271)]=function(_0x306193,_0xf681f3){const _0x567a22=_0x24db6c;!!$gameTemp[_0x567a22(0x24e)]&&($gameTemp[_0x567a22(0x2f2)]=$gameTemp[_0x567a22(0x2f2)]||0x0,_0xf681f3=Math[_0x567a22(0x2ce)]($gameTemp[_0x567a22(0x24e)]*_0xf681f3)+$gameTemp[_0x567a22(0x2f2)]),VisuMZ['BoostAction']['Game_Battler_addDebuff'][_0x567a22(0x222)](this,_0x306193,_0xf681f3);},Game_Enemy[_0x24db6c(0x1fc)]=VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)][_0x24db6c(0x1e0)][_0x24db6c(0x28d)],VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1ff)]=Game_Enemy[_0x24db6c(0x1f4)]['setup'],Game_Enemy[_0x24db6c(0x1f4)][_0x24db6c(0x2a9)]=function(_0x413362,_0xac17af,_0x11f86f){const _0x4bfb52=_0x24db6c;VisuMZ[_0x4bfb52(0x233)]['Game_Enemy_setup']['call'](this,_0x413362,_0xac17af,_0x11f86f),this[_0x4bfb52(0x190)]();},Game_Enemy['prototype'][_0x24db6c(0x190)]=function(){const _0x1a306c=_0x24db6c,_0x5d15d0=VisuMZ['BoostAction'][_0x1a306c(0x260)];if(this[_0x1a306c(0x228)]()[_0x1a306c(0x20d)]===undefined){if(_0x1a306c(0x259)!==_0x1a306c(0x259))this[_0x1a306c(0x188)][_0x1a306c(0x2ca)]();else{this[_0x1a306c(0x228)]()[_0x1a306c(0x20d)]={};var _0x479c74=this[_0x1a306c(0x228)]()[_0x1a306c(0x300)][_0x1a306c(0x197)](/[\r\n]+/);for(var _0x47909e=0x0;_0x47909e<_0x479c74[_0x1a306c(0x1ad)];_0x47909e++){var _0x8d2a99=_0x479c74[_0x47909e];if(_0x8d2a99[_0x1a306c(0x2f3)](_0x5d15d0[_0x1a306c(0x243)])){var _0x1b53d4=_0x1a306c(0x18b)+parseInt(RegExp['$1']),_0x4d4021=String(RegExp['$2'])['toLowerCase']();this[_0x1a306c(0x228)]()[_0x1a306c(0x20d)][_0x1b53d4]=_0x4d4021;}else{if(_0x8d2a99[_0x1a306c(0x2f3)](_0x5d15d0[_0x1a306c(0x1fd)])){var _0x476a16=String(RegExp['$1']),_0x4d4021=String(RegExp['$2'])[_0x1a306c(0x2c8)]();this[_0x1a306c(0x228)]()[_0x1a306c(0x20d)][_0x476a16]=_0x4d4021;}}}}}},Game_Enemy[_0x24db6c(0x1f4)][_0x24db6c(0x177)]=function(_0x444b29){const _0x587226=_0x24db6c;this[_0x587226(0x190)]();var _0x14c6c5=this[_0x587226(0x292)](_0x444b29);_0x14c6c5>0x0&&(this[_0x587226(0x1a5)](_0x14c6c5),this[_0x587226(0x174)]());},Game_Enemy[_0x24db6c(0x1f4)][_0x24db6c(0x292)]=function(_0x5ce86b){const _0x5f4548=_0x24db6c;if(this[_0x5f4548(0x1d9)]()<=0x0)return 0x0;var _0x57723e=_0x5ce86b[_0x5f4548(0x26e)],_0x15a39b=_0x5f4548(0x18b)+_0x5ce86b['id'],_0xfcc34=0x0;if(this['enemy']()[_0x5f4548(0x20d)][_0x57723e]||this[_0x5f4548(0x228)]()['_boostAI'][_0x15a39b]){var _0x24dc1a=this[_0x5f4548(0x228)]()[_0x5f4548(0x20d)][_0x57723e]||this[_0x5f4548(0x228)]()['_boostAI'][_0x15a39b];if(_0x24dc1a['match'](/(?:ALL|FULL)/i))_0xfcc34=this[_0x5f4548(0x1d9)]();else{if(_0x24dc1a['match'](/AT LEAST (\d+)/i)){var _0x3047c2=parseInt(RegExp['$1']);this['storedBoostPoints']()>=_0x3047c2&&(_0x5f4548(0x1bf)!==_0x5f4548(0x1bf)?this['drawItemStatusBoostPointsAuto'](_0x25cc62):_0xfcc34=this[_0x5f4548(0x1d9)]());}else{if(_0x24dc1a[_0x5f4548(0x2f3)](/AT MOST (\d+)/i)){var _0x3047c2=parseInt(RegExp['$1']);this[_0x5f4548(0x1d9)]()<=_0x3047c2&&(_0x5f4548(0x28c)!=='mLuig'?(_0x4f0a5b['BoostAction'][_0x5f4548(0x1ff)][_0x5f4548(0x222)](this,_0x216458,_0x2bbbe7,_0x5c7863),this[_0x5f4548(0x190)]()):_0xfcc34=this[_0x5f4548(0x1d9)]());}else{if(_0x24dc1a[_0x5f4548(0x2f3)](/EXACTLY (\d+)/i)){var _0x3047c2=parseInt(RegExp['$1']);this[_0x5f4548(0x1d9)]()===_0x3047c2&&(_0xfcc34=_0x3047c2);}}}}}return _0xfcc34[_0x5f4548(0x187)](0x0,Game_BattlerBase['BOOST_POINTS_MAX_TOUSE']);},Game_Enemy[_0x24db6c(0x1f4)]['processEnemyBPUsage']=function(_0x4cd805){const _0x49b1ad=_0x24db6c;_0x4cd805=_0x4cd805['clamp'](0x0,this[_0x49b1ad(0x1d9)]()),_0x4cd805=_0x4cd805[_0x49b1ad(0x187)](0x0,Game_BattlerBase[_0x49b1ad(0x20c)]),this[_0x49b1ad(0x2c5)](-_0x4cd805),this['gainToUseBoostPoints'](_0x4cd805);},Game_Enemy['prototype'][_0x24db6c(0x174)]=function(){const _0x2939b1=_0x24db6c;var _0x1d6f32=0x0,_0x5c30d7=this[_0x2939b1(0x1d7)]()[_0x2939b1(0x187)](0x0,Game_BattlerBase['BOOST_POINTS_MAX_TOUSE']);const _0xe82ca6=Game_Battler[_0x2939b1(0x27a)],_0x2ca68a=Game_Enemy[_0x2939b1(0x1fc)],_0x502304=0x3e8/0x3c;for(var _0x58dfd7=0x1;_0x58dfd7<=_0x5c30d7;_0x58dfd7++){var _0x1238bd=_0xe82ca6[_0x58dfd7]||_0xe82ca6[0x0];if(_0x1238bd>0x0){let _0x5e02c8=_0x2ca68a*(_0x58dfd7-0x1);setTimeout($gameTemp[_0x2939b1(0x1b0)]['bind']($gameTemp,[this],_0x1238bd,![],![]),_0x5e02c8);}_0x1d6f32+=_0x2ca68a/_0x502304;}_0x1d6f32=Math[_0x2939b1(0x23c)](_0x1d6f32),SceneManager[_0x2939b1(0x1bb)][_0x2939b1(0x1a8)][_0x2939b1(0x280)]=_0x1d6f32;},Game_Unit[_0x24db6c(0x1f4)]['setupBattleBoostPoints']=function(){const _0x22a84b=_0x24db6c;var _0x53233a=this[_0x22a84b(0x257)];this[_0x22a84b(0x257)]=![];for(const _0x4dca62 of this[_0x22a84b(0x29a)]()){if(!_0x4dca62)continue;_0x4dca62[_0x22a84b(0x1dc)]();}this[_0x22a84b(0x257)]=_0x53233a;},VisuMZ[_0x24db6c(0x233)]['Game_Party_addActor']=Game_Party['prototype']['addActor'],Game_Party[_0x24db6c(0x1f4)][_0x24db6c(0x2de)]=function(_0x2ff090){const _0x289114=_0x24db6c;VisuMZ[_0x289114(0x233)][_0x289114(0x2a2)][_0x289114(0x222)](this,_0x2ff090),setTimeout(VisuMZ[_0x289114(0x233)][_0x289114(0x26b)][_0x289114(0x24b)](this),0x32);},VisuMZ['BoostAction'][_0x24db6c(0x19d)]=Game_Party[_0x24db6c(0x1f4)]['removeActor'],Game_Party['prototype']['removeActor']=function(_0x2e9a6e){const _0x3607ba=_0x24db6c;VisuMZ['BoostAction'][_0x3607ba(0x19d)]['call'](this,_0x2e9a6e),setTimeout(VisuMZ['BoostAction'][_0x3607ba(0x26b)]['bind'](this),0x32);},VisuMZ[_0x24db6c(0x233)]['Game_Party_partyChangeRefresh']=Game_Party[_0x24db6c(0x1f4)][_0x24db6c(0x1fa)],Game_Party[_0x24db6c(0x1f4)][_0x24db6c(0x1fa)]=function(){const _0x4e2717=_0x24db6c;VisuMZ['BoostAction'][_0x4e2717(0x24c)][_0x4e2717(0x222)](this),setTimeout(VisuMZ[_0x4e2717(0x233)]['RefreshHelpWindowInBattle'][_0x4e2717(0x24b)](this),0x32);},VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x26b)]=function(){const _0x4349d8=_0x24db6c;if(!SceneManager[_0x4349d8(0x302)]())return;const _0x56e97e=SceneManager[_0x4349d8(0x1bb)]['_helpWindow'];if(!_0x56e97e)return;_0x56e97e[_0x4349d8(0x171)](BattleManager[_0x4349d8(0x1e8)]()),_0x56e97e[_0x4349d8(0x2e3)]();},VisuMZ[_0x24db6c(0x233)]['Scene_Battle_createActorCommandWindow']=Scene_Battle['prototype']['createActorCommandWindow'],Scene_Battle[_0x24db6c(0x1f4)][_0x24db6c(0x1fb)]=function(){const _0x29f382=_0x24db6c;VisuMZ[_0x29f382(0x233)][_0x29f382(0x1f2)]['call'](this),this[_0x29f382(0x1c6)][_0x29f382(0x2ae)]('boost',this['commandBoost'][_0x29f382(0x24b)](this)),this[_0x29f382(0x1c6)]['setHandler']('unboost',this[_0x29f382(0x2dc)][_0x29f382(0x24b)](this));},Scene_Battle[_0x24db6c(0x1f4)][_0x24db6c(0x16f)]=function(_0x441900){const _0x5eab94=_0x24db6c;BattleManager['actor']()['gainStoredBoostPoints'](-0x1),BattleManager[_0x5eab94(0x1e8)]()[_0x5eab94(0x23d)](0x1),BattleManager[_0x5eab94(0x1e8)]()[_0x5eab94(0x174)](),this[_0x5eab94(0x188)][_0x5eab94(0x2e3)]();if(!_0x441900){if(_0x5eab94(0x193)===_0x5eab94(0x193))this[_0x5eab94(0x1c6)][_0x5eab94(0x17b)]();else{const _0x67b53e=this['actor'](_0x4f5999),_0x2bbab7=this[_0x5eab94(0x21a)](_0x279043);let _0x225962=_0x2bbab7['x']-0x4+_0x367706[_0x5eab94(0x2c9)],_0x2e90d4=_0x2bbab7['y']+0x4+_0x5c6920[_0x5eab94(0x2e5)];this['placeBoostPoints'](_0x67b53e,_0x225962,_0x2e90d4);}}this['_actorCommandWindow'][_0x5eab94(0x2e3)]();},Scene_Battle[_0x24db6c(0x1f4)][_0x24db6c(0x2dc)]=function(_0x239dfb){const _0x13419f=_0x24db6c;BattleManager[_0x13419f(0x1e8)]()[_0x13419f(0x23d)](-0x1),BattleManager[_0x13419f(0x1e8)]()[_0x13419f(0x2c5)](0x1),BattleManager[_0x13419f(0x1e8)]()[_0x13419f(0x174)](),this['_helpWindow']['refresh'](),!_0x239dfb&&this[_0x13419f(0x1c6)]['activate'](),this[_0x13419f(0x1c6)][_0x13419f(0x2e3)]();},VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x212)]=Scene_Battle[_0x24db6c(0x1f4)][_0x24db6c(0x18a)],Scene_Battle[_0x24db6c(0x1f4)][_0x24db6c(0x18a)]=function(){const _0x46a4fe=_0x24db6c;this[_0x46a4fe(0x188)]&&(_0x46a4fe(0x24d)===_0x46a4fe(0x250)?(this[_0x46a4fe(0x178)](),this['addUnboostCommand']()):this[_0x46a4fe(0x188)]['clearBoostSubject']()),VisuMZ[_0x46a4fe(0x233)][_0x46a4fe(0x212)][_0x46a4fe(0x222)](this);},VisuMZ[_0x24db6c(0x233)]['Scene_Battle_startActorCommandSelection']=Scene_Battle[_0x24db6c(0x1f4)][_0x24db6c(0x2b0)],Scene_Battle['prototype'][_0x24db6c(0x2b0)]=function(){const _0x290f6b=_0x24db6c;VisuMZ[_0x290f6b(0x233)][_0x290f6b(0x22f)][_0x290f6b(0x222)](this),this[_0x290f6b(0x188)]&&this[_0x290f6b(0x188)][_0x290f6b(0x171)](BattleManager[_0x290f6b(0x1e8)]());};function Sprite_BoostContainer(){const _0x3e3dbd=_0x24db6c;this[_0x3e3dbd(0x19b)](...arguments);}function _0x3657(_0x5cf928,_0x28d715){const _0x24c510=_0x24c5();return _0x3657=function(_0x36578f,_0x2eb6b3){_0x36578f=_0x36578f-0x16b;let _0x467504=_0x24c510[_0x36578f];return _0x467504;},_0x3657(_0x5cf928,_0x28d715);}Sprite_BoostContainer[_0x24db6c(0x1f4)]=Object[_0x24db6c(0x206)](Sprite[_0x24db6c(0x1f4)]),Sprite_BoostContainer[_0x24db6c(0x1f4)][_0x24db6c(0x16d)]=Sprite_BoostContainer,Sprite_BoostContainer[_0x24db6c(0x1f1)]=VisuMZ[_0x24db6c(0x233)]['Settings']['UI'][_0x24db6c(0x175)],Sprite_BoostContainer[_0x24db6c(0x1f4)][_0x24db6c(0x19b)]=function(){const _0x524614=_0x24db6c;Sprite[_0x524614(0x1f4)][_0x524614(0x19b)][_0x524614(0x222)](this),this[_0x524614(0x255)](),this['createChildSprites']();},Sprite_BoostContainer[_0x24db6c(0x1f4)]['initMembers']=function(){const _0x1bed9e=_0x24db6c;this[_0x1bed9e(0x26d)]['x']=Sprite_BoostContainer['ICON_SIZE_RATE'],this[_0x1bed9e(0x26d)]['y']=Sprite_BoostContainer[_0x1bed9e(0x1f1)];},Sprite_BoostContainer[_0x24db6c(0x1f4)]['createChildSprites']=function(){const _0x41271a=_0x24db6c;this[_0x41271a(0x241)]=[];for(let _0x94a352=0x1;_0x94a352<=Game_BattlerBase[_0x41271a(0x2a4)];_0x94a352++){const _0x247fb9=new Sprite_BoostIcon(_0x94a352);this[_0x41271a(0x29c)](_0x247fb9),this['_icons']['push'](_0x247fb9);}},Sprite_BoostContainer['prototype'][_0x24db6c(0x2a9)]=function(_0x36c81a){const _0x23eda6=_0x24db6c;if(!this[_0x23eda6(0x241)])return;for(const _0xbeea42 of this[_0x23eda6(0x241)]){if(_0x23eda6(0x1a7)!==_0x23eda6(0x1a7))return this[_0x23eda6(0x240)](_0x13aff2(arguments[0x1]));else _0xbeea42[_0x23eda6(0x2a9)](_0x36c81a);}};function Sprite_BoostIcon(){const _0x2d7584=_0x24db6c;this[_0x2d7584(0x19b)](...arguments);}Sprite_BoostIcon['prototype']=Object[_0x24db6c(0x206)](Sprite[_0x24db6c(0x1f4)]),Sprite_BoostIcon[_0x24db6c(0x1f4)]['constructor']=Sprite_BoostIcon,Sprite_BoostIcon[_0x24db6c(0x1f4)]['initialize']=function(_0x181b18){const _0x4045d5=_0x24db6c;this[_0x4045d5(0x230)]=_0x181b18,Sprite[_0x4045d5(0x1f4)][_0x4045d5(0x19b)]['call'](this),this[_0x4045d5(0x255)](),this[_0x4045d5(0x2cb)]();},Sprite_BoostIcon[_0x24db6c(0x1f4)][_0x24db6c(0x255)]=function(){const _0x5cf8e0=_0x24db6c;this[_0x5cf8e0(0x224)]=ImageManager[_0x5cf8e0(0x225)],this['x']=ImageManager['iconWidth']*(this['_slot']-0x1);},Sprite_BoostIcon['prototype']['loadBitmap']=function(){const _0x474513=_0x24db6c;this[_0x474513(0x221)]=ImageManager[_0x474513(0x1c9)](),this[_0x474513(0x1e3)](0x0,0x0,0x0,0x0);},Sprite_BoostIcon[_0x24db6c(0x1f4)][_0x24db6c(0x2a9)]=function(_0x497207){this['_battler']!==_0x497207&&(this['_battler']=_0x497207);},Sprite_BoostIcon[_0x24db6c(0x1f4)][_0x24db6c(0x2f8)]=function(){const _0x259ea2=_0x24db6c;Sprite['prototype'][_0x259ea2(0x2f8)][_0x259ea2(0x222)](this),this[_0x259ea2(0x276)](),this[_0x259ea2(0x25e)]();},Sprite_BoostIcon[_0x24db6c(0x1f4)][_0x24db6c(0x276)]=function(){const _0x4bc58f=_0x24db6c;if(this[_0x4bc58f(0x277)]){if(_0x4bc58f(0x2da)!==_0x4bc58f(0x2da))return this['storedBoostPoints']()>_0x4f5cd1;else{let _0x1a3f34=this[_0x4bc58f(0x277)][_0x4bc58f(0x1d9)]();_0x1a3f34>=this[_0x4bc58f(0x230)]?this['_iconIndex']=ImageManager[_0x4bc58f(0x2ee)]:this[_0x4bc58f(0x224)]=ImageManager['unboostIcon'];}}else this[_0x4bc58f(0x224)]=0x0;},Sprite_BoostIcon[_0x24db6c(0x1f4)][_0x24db6c(0x25e)]=function(){const _0x3a9546=_0x24db6c,_0x3a1f65=ImageManager['iconWidth'],_0x1d1775=ImageManager[_0x3a9546(0x2e8)],_0x33cafa=this['_iconIndex']%0x10*_0x3a1f65,_0x406129=Math[_0x3a9546(0x251)](this['_iconIndex']/0x10)*_0x1d1775;this['setFrame'](_0x33cafa,_0x406129,_0x3a1f65,_0x1d1775);},VisuMZ[_0x24db6c(0x233)]['Window_Base_convertEscapeCharacters']=Window_Base[_0x24db6c(0x1f4)][_0x24db6c(0x1c0)],Window_Base[_0x24db6c(0x1f4)][_0x24db6c(0x1c0)]=function(_0x5bd150){const _0x10b7ee=_0x24db6c;return _0x5bd150=VisuMZ['BoostAction'][_0x10b7ee(0x27c)][_0x10b7ee(0x222)](this,_0x5bd150),_0x5bd150=this[_0x10b7ee(0x290)](_0x5bd150),_0x5bd150;},Window_Base[_0x24db6c(0x1f4)][_0x24db6c(0x290)]=function(_0x1d257a){const _0x518f4e=_0x24db6c;return _0x1d257a=_0x1d257a[_0x518f4e(0x2f0)](/\x1b(?:BP|BOOST)DMG\[(\d+)\]/gi,function(){const _0x38168e=_0x518f4e;return this[_0x38168e(0x2ef)](parseInt(arguments[0x1]));}[_0x518f4e(0x24b)](this)),_0x1d257a=_0x1d257a[_0x518f4e(0x2f0)](/\x1b(?:BP|BOOST)DAMAGE\[(\d+)\]/gi,function(){const _0x520bb4=_0x518f4e;return this[_0x520bb4(0x2ef)](parseInt(arguments[0x1]));}['bind'](this)),_0x1d257a=_0x1d257a['replace'](/\x1b(?:BP|BOOST)TURN\[(\d+)\]/gi,function(){const _0x3ab658=_0x518f4e;return this[_0x3ab658(0x207)](parseInt(arguments[0x1]));}[_0x518f4e(0x24b)](this)),_0x1d257a=_0x1d257a[_0x518f4e(0x2f0)](/\x1b(?:BP|BOOST)TURNS\[(\d+)\]/gi,function(){const _0x2a4595=_0x518f4e;if('quHyN'!==_0x2a4595(0x204))return this[_0x2a4595(0x207)](parseInt(arguments[0x1]));else{var _0x5c2aab=this['_bpSubject'][_0x2a4595(0x1af)](_0x2a4595(0x2df));_0x92fee7=_0x47dd03['round'](_0x165db3*_0x5c2aab),_0x420444+=this[_0x2a4595(0x1d3)]['boostAddition']('Damage');}}[_0x518f4e(0x24b)](this)),_0x1d257a=_0x1d257a['replace'](/\x1b(?:BP|BOOST)REP\[(\d+)\]/gi,function(){const _0x307f45=_0x518f4e;if(_0x307f45(0x2d4)===_0x307f45(0x25c))this[_0x307f45(0x188)][_0x307f45(0x171)](_0x25fca5[_0x307f45(0x1e8)]());else return this['convertBoostRepeatEscape'](parseInt(arguments[0x1]));}['bind'](this)),_0x1d257a=_0x1d257a['replace'](/\x1b(?:BP|BOOST)REPEAT\[(\d+)\]/gi,function(){const _0x80f30a=_0x518f4e;return this[_0x80f30a(0x240)](parseInt(arguments[0x1]));}['bind'](this)),_0x1d257a=_0x1d257a[_0x518f4e(0x2f0)](/\x1b(?:BP|BOOST)REPEATS\[(\d+)\]/gi,function(){return this['convertBoostRepeatEscape'](parseInt(arguments[0x1]));}[_0x518f4e(0x24b)](this)),_0x1d257a=_0x1d257a[_0x518f4e(0x2f0)](/\x1b(?:BP|BOOST)HITS\[(\d+)\]/gi,function(){const _0x70e296=_0x518f4e;return this[_0x70e296(0x240)](parseInt(arguments[0x1]));}[_0x518f4e(0x24b)](this)),_0x1d257a=_0x1d257a[_0x518f4e(0x2f0)](/\x1b(?:BP|BOOST)ANALYZE\[(\d+)\]/gi,function(){const _0x5ae6ab=_0x518f4e;return _0x5ae6ab(0x27e)!==_0x5ae6ab(0x253)?this[_0x5ae6ab(0x1cf)](parseInt(arguments[0x1])):!!this[_0x5ae6ab(0x1d3)]&&this[_0x5ae6ab(0x1d3)][_0x5ae6ab(0x1d7)]()===_0x21246a?_0x1aaf9f:'';}[_0x518f4e(0x24b)](this)),_0x1d257a=_0x1d257a[_0x518f4e(0x2f0)](/\x1b(?:BP|BOOST)EFFECT\[(\d+)\]/gi,function(){const _0x19afc8=_0x518f4e;return'OHQAb'===_0x19afc8(0x1be)?'':this[_0x19afc8(0x28e)](parseInt(arguments[0x1]));}['bind'](this)),_0x1d257a=_0x1d257a[_0x518f4e(0x2f0)](/\x1b(?:BP|BOOST)\[(.*?)\]/gi,function(){const _0x2663c0=_0x518f4e;return this[_0x2663c0(0x2c3)](String(arguments[0x1]));}[_0x518f4e(0x24b)](this)),_0x1d257a=_0x1d257a[_0x518f4e(0x2f0)](/\x1b(?:BP|BOOST)0\[(.*?)\]/gi,function(){const _0x526ea3=_0x518f4e;if(_0x526ea3(0x1d4)==='twuJG')this['_slot']=_0x582120,_0x21a756['prototype'][_0x526ea3(0x19b)][_0x526ea3(0x222)](this),this[_0x526ea3(0x255)](),this[_0x526ea3(0x2cb)]();else return this['convertBoost0Escape'](String(arguments[0x1]));}['bind'](this)),_0x1d257a=_0x1d257a[_0x518f4e(0x2f0)](/\x1b(?:BP|BOOST)=(\d+)\[(.*?)\]/gi,function(){const _0x29ed90=_0x518f4e;return this[_0x29ed90(0x19c)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x518f4e(0x24b)](this)),_0x1d257a=_0x1d257a[_0x518f4e(0x2f0)](/\x1b(?:BP|BOOST)=(\d+)\[(.*?)\]/gi,function(){return this['convertBoostEqualEscape'](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x518f4e(0x24b)](this)),_0x1d257a=_0x1d257a[_0x518f4e(0x2f0)](/\x1b(?:BP|BOOST)\<=(\d+)\[(.*?)\]/gi,function(){const _0x56f25d=_0x518f4e;if(_0x56f25d(0x289)==='ySuhb')return this[_0x56f25d(0x2b9)](parseInt(arguments[0x1]),String(arguments[0x2]));else{var _0x129cdd=this[_0x56f25d(0x1d7)]()['clamp'](0x0,_0x652b9b['BOOST_POINTS_MAX_TOUSE']);const _0x63f1da=_0x41210e[_0x56f25d(0x27a)];var _0x3792be=_0x5daab9(_0x63f1da[_0x129cdd]||_0x63f1da[0x0]);_0x3792be>0x0&&_0x4b494a[_0x56f25d(0x1b0)]([this],_0x3792be,![],![]);}}['bind'](this)),_0x1d257a=_0x1d257a['replace'](/\x1b(?:BP|BOOST)\<(\d+)\[(.*?)\]/gi,function(){const _0xa2088d=_0x518f4e;return this[_0xa2088d(0x17c)](parseInt(arguments[0x1]),String(arguments[0x2]));}['bind'](this)),_0x1d257a=_0x1d257a[_0x518f4e(0x2f0)](/\x1b(?:BP|BOOST)\>=(\d+)\[(.*?)\]/gi,function(){const _0x139522=_0x518f4e;return _0x139522(0x2d9)==='zmcPm'?this[_0x139522(0x2a0)](parseInt(arguments[0x1]),String(arguments[0x2])):'';}[_0x518f4e(0x24b)](this)),_0x1d257a=_0x1d257a[_0x518f4e(0x2f0)](/\x1b(?:BP|BOOST)\>(\d+)\[(.*?)\]/gi,function(){const _0x31f2c2=_0x518f4e;if(_0x31f2c2(0x1de)!==_0x31f2c2(0x1de)){const _0x1b85e6=_0x16f616(_0x366376['$1']);_0x1b85e6<_0x5597d6?(_0x16fa9d('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x31f2c2(0x199)](_0xb1536d,_0x1b85e6,_0x339a7c)),_0x56c946[_0x31f2c2(0x272)]()):_0x27eba6=_0x22b995[_0x31f2c2(0x21e)](_0x1b85e6,_0x3eddf4);}else return this[_0x31f2c2(0x1df)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x518f4e(0x24b)](this)),_0x1d257a;},Window_Base[_0x24db6c(0x1f4)][_0x24db6c(0x2ef)]=function(_0x4ee9af){const _0x1bbac5=_0x24db6c;if(!!this[_0x1bbac5(0x1d3)]){var _0x3ad65a=this[_0x1bbac5(0x1d3)][_0x1bbac5(0x1af)](_0x1bbac5(0x2df));_0x4ee9af=Math['round'](_0x4ee9af*_0x3ad65a),_0x4ee9af+=this[_0x1bbac5(0x1d3)]['boostAddition']('Damage');}return _0x4ee9af;},Window_Base['prototype'][_0x24db6c(0x207)]=function(_0x121ae0){const _0x1d455b=_0x24db6c;if(!!this[_0x1d455b(0x1d3)]){if('cjcmv'!==_0x1d455b(0x2ad)){var _0x274af6=this[_0x1d455b(0x1d3)]['boostMultiplier'](_0x1d455b(0x2cc));_0x121ae0=Math['round'](_0x121ae0*_0x274af6),_0x121ae0+=this['_bpSubject'][_0x1d455b(0x287)]('Turn');}else{var _0x1add12=_0x4b3e22(_0x160bb0['$1']);return this[_0x1d455b(0x2b4)]()?this[_0x1d455b(0x1d7)]()>_0x1add12:this[_0x1d455b(0x1d9)]()>_0x1add12;}}return _0x121ae0;},Window_Base['prototype']['convertBoostRepeatEscape']=function(_0x4a868a){const _0x1b75d3=_0x24db6c;if(!!this[_0x1b75d3(0x1d3)]){if('OfFwi'!==_0x1b75d3(0x278)){var _0xf22182=this[_0x1b75d3(0x1d3)][_0x1b75d3(0x1af)]('Repeat');_0x4a868a=Math[_0x1b75d3(0x2ce)](_0x4a868a*_0xf22182),_0x4a868a+=this[_0x1b75d3(0x1d3)]['boostAddition'](_0x1b75d3(0x2d0));}else{var _0xba739b=_0x5cdb6e[_0x1b75d3(0x233)][_0x1b75d3(0x2cf)][_0x1b75d3(0x222)](this);_0xba739b=this['applyBoostPointRepeats'](_0xba739b);return _0x72e63[_0x1b75d3(0x2ce)](_0xba739b);;}}return _0x4a868a;},Window_Base[_0x24db6c(0x1f4)][_0x24db6c(0x1cf)]=function(_0x22200a){const _0x29d7cb=_0x24db6c;if(!!this[_0x29d7cb(0x1d3)]){var _0x239257=this[_0x29d7cb(0x1d3)]['boostMultiplier'](_0x29d7cb(0x1e7));_0x22200a=Math[_0x29d7cb(0x2ce)](_0x22200a*_0x239257),_0x22200a+=this['_bpSubject']['boostAddition'](_0x29d7cb(0x1e7));}return _0x22200a;},Window_Base[_0x24db6c(0x1f4)][_0x24db6c(0x28e)]=function(_0x318f35){const _0x1f1f29=_0x24db6c;if(!!this['_bpSubject']){var _0x1e775b=this[_0x1f1f29(0x1d3)][_0x1f1f29(0x1af)]('BP\x20Effect');_0x318f35=Math[_0x1f1f29(0x2ce)](_0x318f35*_0x1e775b),_0x318f35+=this[_0x1f1f29(0x1d3)][_0x1f1f29(0x287)](_0x1f1f29(0x22d));}return _0x318f35;},Window_Base[_0x24db6c(0x1f4)][_0x24db6c(0x2c3)]=function(_0x44d26d){const _0x3f79eb=_0x24db6c;if(!!this[_0x3f79eb(0x1d3)]&&this['_bpSubject'][_0x3f79eb(0x1d7)]()>0x0)return _0x44d26d;else{if(_0x3f79eb(0x2fb)!=='nnMdZ')this[_0x3f79eb(0x1a9)](),_0x50b219[_0x3f79eb(0x233)][_0x3f79eb(0x220)][_0x3f79eb(0x222)](this);else return'';}},Window_Base['prototype'][_0x24db6c(0x2f5)]=function(_0x3e5ff6){const _0x17fed9=_0x24db6c;return!this[_0x17fed9(0x1d3)]||this[_0x17fed9(0x1d3)][_0x17fed9(0x1d7)]()<=0x0?'RCUtX'!==_0x17fed9(0x2d8)?_0x3e5ff6:![]:'';},Window_Base['prototype'][_0x24db6c(0x19c)]=function(_0x5c8afd,_0x1789f7){const _0x4c0d31=_0x24db6c;if(!!this[_0x4c0d31(0x1d3)]&&this[_0x4c0d31(0x1d3)]['toUseBoostPoints']()===_0x5c8afd){if(_0x4c0d31(0x2c6)===_0x4c0d31(0x2c6))return _0x1789f7;else(_0x32155d[_0x4c0d31(0x1d1)]||this[_0x4c0d31(0x29b)]<=0x0)&&this[_0x4c0d31(0x2c5)](this['boostPointsRegenValue']()),this['_turnUsedBoostPoints']=0x0;}else return'';},Window_Base['prototype'][_0x24db6c(0x19c)]=function(_0x3cc12d,_0x3171ed){const _0x4ab274=_0x24db6c;return!!this[_0x4ab274(0x1d3)]&&this['_bpSubject']['toUseBoostPoints']()===_0x3cc12d?_0x3171ed:'';},Window_Base[_0x24db6c(0x1f4)][_0x24db6c(0x2b9)]=function(_0x1da77d,_0x2acc1c){const _0x4a91e7=_0x24db6c;return!!this[_0x4a91e7(0x1d3)]&&this[_0x4a91e7(0x1d3)][_0x4a91e7(0x1d7)]()<=_0x1da77d?'roWbX'!==_0x4a91e7(0x285)?_0x2acc1c:this['toUseBoostPoints']()<_0xd43602:'lQypU'===_0x4a91e7(0x2f9)?this[_0x4a91e7(0x1cf)](_0x4bdb14(arguments[0x1])):'';},Window_Base[_0x24db6c(0x1f4)][_0x24db6c(0x17c)]=function(_0x8e0df0,_0x4e4d62){const _0xf17942=_0x24db6c;if(!!this[_0xf17942(0x1d3)]&&this[_0xf17942(0x1d3)][_0xf17942(0x1d7)]()<_0x8e0df0){if(_0xf17942(0x195)!==_0xf17942(0x195)){if(!_0x2ccd5d[_0xf17942(0x299)]&&(this['isDead']()||this[_0xf17942(0x2a3)]()))return 0x0;else{var _0x58e70a=_0x2f3394['BOOST_POINTS_TURN_REGEN'];return _0x58e70a=this['bpRegenMultipliers'](_0x58e70a),_0x58e70a=this[_0xf17942(0x2d1)](_0x58e70a),_0x58e70a;}}else return _0x4e4d62;}else return'';},Window_Base['prototype'][_0x24db6c(0x2a0)]=function(_0x32542b,_0x2c56c8){const _0x577985=_0x24db6c;if(!!this[_0x577985(0x1d3)]&&this[_0x577985(0x1d3)][_0x577985(0x1d7)]()>=_0x32542b)return _0x2c56c8;else{if(_0x577985(0x214)===_0x577985(0x2cd))var _0x18b286=_0x2f4d8e[_0x577985(0x1e7)];else return'';}},Window_Base[_0x24db6c(0x1f4)][_0x24db6c(0x1df)]=function(_0x466b49,_0x30eb4c){const _0x1f4dcd=_0x24db6c;if(!!this[_0x1f4dcd(0x1d3)]&&this[_0x1f4dcd(0x1d3)][_0x1f4dcd(0x1d7)]()>_0x466b49)return _0x30eb4c;else{if('gqmoG'===_0x1f4dcd(0x2e1))this['_iconIndex']=_0x3e8db8[_0x1f4dcd(0x225)];else return'';}},Window_Selectable[_0x24db6c(0x2b3)]=VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)]['UI'][_0x24db6c(0x1d2)],Window_Selectable[_0x24db6c(0x268)]=VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)]['UI'][_0x24db6c(0x189)],Window_Selectable[_0x24db6c(0x1f4)][_0x24db6c(0x2ff)]=function(){const _0x4c64dc=_0x24db6c,_0x2fcaa0=this[_0x4c64dc(0x16d)][_0x4c64dc(0x26e)];if(Window_Selectable['BOOST_ACTION_BYPASS_CONSTRUCTORS'][_0x4c64dc(0x29f)](_0x2fcaa0)){if('CHpEI'!==_0x4c64dc(0x1c5))return![];else{var _0x473777=this[_0x4c64dc(0x2a7)]()[_0x4c64dc(0x1af)]('Damage');_0x59ca4d=_0x3a1c3a[_0x4c64dc(0x2ce)](_0x432134*_0x473777),_0x2fb56c+=this[_0x4c64dc(0x2a7)]()['boostAddition'](_0x4c64dc(0x2df));}}else return!![];},Window_Selectable[_0x24db6c(0x1f4)][_0x24db6c(0x2d5)]=function(){const _0x4ecd45=_0x24db6c;if(!SceneManager[_0x4ecd45(0x302)]())return![];if(!Window_Selectable[_0x4ecd45(0x2b3)])return![];if(!BattleManager['allowBoostAction']())return![];return this['canUseBoostShortcut']();},VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x2c1)]=Window_Selectable[_0x24db6c(0x1f4)]['cursorPagedown'],Window_Selectable[_0x24db6c(0x1f4)][_0x24db6c(0x2dd)]=function(){const _0x590bea=_0x24db6c;if(this[_0x590bea(0x2d5)]()){if('XgeNr'==='jhEaU'){const _0x5dcb8e=_0x422d28[_0x590bea(0x1e8)]();_0x5dcb8e&&_0x5dcb8e[_0x590bea(0x1ed)]()&&(_0x39b1d2[_0x590bea(0x1bb)][_0x590bea(0x16f)](!![]),this['refresh'](),this[_0x590bea(0x1c8)]()),_0x3042f8['clear']();}else{const _0x32e095=BattleManager[_0x590bea(0x1e8)]();_0x32e095&&_0x32e095[_0x590bea(0x1ed)]()&&(SceneManager[_0x590bea(0x1bb)]['commandBoost'](!![]),this[_0x590bea(0x2e3)](),this[_0x590bea(0x1c8)]()),Input[_0x590bea(0x217)]();}}else VisuMZ[_0x590bea(0x233)][_0x590bea(0x2c1)]['call'](this);},VisuMZ['BoostAction'][_0x24db6c(0x23f)]=Window_Selectable[_0x24db6c(0x1f4)][_0x24db6c(0x27f)],Window_Selectable[_0x24db6c(0x1f4)][_0x24db6c(0x27f)]=function(){const _0x31ef9b=_0x24db6c;if(this[_0x31ef9b(0x2d5)]()){if(_0x31ef9b(0x22c)===_0x31ef9b(0x293)){var _0x55228b=_0xd35322(_0x220de4['$1']);return this[_0x31ef9b(0x2b4)]()?this['toUseBoostPoints']()>=_0x55228b:this[_0x31ef9b(0x1d9)]()>=_0x55228b;}else{const _0x5c6033=BattleManager['actor']();_0x5c6033&&_0x5c6033['canUndoBoostPoints']()&&(SceneManager[_0x31ef9b(0x1bb)][_0x31ef9b(0x2dc)](!![]),this[_0x31ef9b(0x2e3)](),this[_0x31ef9b(0x1c8)]()),Input[_0x31ef9b(0x217)]();}}else{if(_0x31ef9b(0x2fd)!==_0x31ef9b(0x1e2))VisuMZ[_0x31ef9b(0x233)][_0x31ef9b(0x23f)][_0x31ef9b(0x222)](this);else{const _0x5ce06f=_0x89bc8f(_0x3a99c5['$1']);_0x5ce06f!==_0xd3f5b0[_0xffd8f2][_0x31ef9b(0x215)]&&(_0x51dc27(_0x31ef9b(0x2ea)[_0x31ef9b(0x199)](_0x36878f,_0x5ce06f)),_0x1994fb['exit']());}}},Window_Help[_0x24db6c(0x1f4)][_0x24db6c(0x171)]=function(_0x12feee){this['_bpSubject']=_0x12feee;},Window_Help[_0x24db6c(0x1f4)][_0x24db6c(0x2ca)]=function(){this['_bpSubject']=undefined;},Window_StatusBase[_0x24db6c(0x1f4)]['shouldDrawBoostIcons']=function(){const _0xf4a79b=_0x24db6c;return BattleManager[_0xf4a79b(0x27b)]();},Window_StatusBase[_0x24db6c(0x1f4)][_0x24db6c(0x21c)]=function(_0x3b3266,_0x5096e1,_0x42fe5f){const _0x4d4cbb=_0x24db6c;if(!this['shouldDrawBoostIcons']())return;const _0x298d0f=_0x4d4cbb(0x1da)[_0x4d4cbb(0x199)](_0x3b3266[_0x4d4cbb(0x288)]()),_0x3bdcec=this[_0x4d4cbb(0x2a8)](_0x298d0f,Sprite_BoostContainer);_0x3bdcec[_0x4d4cbb(0x2a9)](_0x3b3266),_0x3bdcec['move'](_0x5096e1,_0x42fe5f),_0x3bdcec[_0x4d4cbb(0x2b8)]();},Window_ActorCommand[_0x24db6c(0x186)]=VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)]['UI'][_0x24db6c(0x2bd)],Window_ActorCommand[_0x24db6c(0x1db)]=VisuMZ['BoostAction'][_0x24db6c(0x1c4)]['UI'][_0x24db6c(0x1b9)],VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x2b5)]=Window_ActorCommand['prototype']['addGuardCommand'],Window_ActorCommand[_0x24db6c(0x1f4)][_0x24db6c(0x2a5)]=function(){const _0x5c43b7=_0x24db6c;BattleManager['allowBoostAction']()&&(this[_0x5c43b7(0x178)](),this['addUnboostCommand']()),VisuMZ[_0x5c43b7(0x233)]['Window_ActorCommand_addGuardCommand'][_0x5c43b7(0x222)](this);},Window_ActorCommand[_0x24db6c(0x1f4)][_0x24db6c(0x178)]=function(){const _0x79719c=_0x24db6c;if(!Window_ActorCommand[_0x79719c(0x186)])return;const _0x344d22=this[_0x79719c(0x25f)](),_0x5b2b4c=TextManager['boostCommandName'],_0x2e6e6b=ImageManager[_0x79719c(0x2ee)],_0x113f94=_0x344d22===_0x79719c(0x237)?_0x5b2b4c:_0x79719c(0x304)[_0x79719c(0x199)](_0x2e6e6b,_0x5b2b4c);var _0x53229d=this[_0x79719c(0x1a4)][_0x79719c(0x1ed)]();this[_0x79719c(0x1c1)](_0x113f94,_0x79719c(0x261),_0x53229d);},Window_ActorCommand[_0x24db6c(0x1f4)][_0x24db6c(0x248)]=function(){const _0x6da55b=_0x24db6c;if(!Window_ActorCommand[_0x6da55b(0x1db)])return;const _0xa4c237=this[_0x6da55b(0x25f)](),_0x2c5669=TextManager[_0x6da55b(0x296)],_0x59eeb7=ImageManager[_0x6da55b(0x225)],_0x59f79b=_0xa4c237==='text'?_0x2c5669:_0x6da55b(0x304)[_0x6da55b(0x199)](_0x59eeb7,_0x2c5669);var _0x458121=this[_0x6da55b(0x1a4)][_0x6da55b(0x1c3)]();this[_0x6da55b(0x1c1)](_0x59f79b,_0x6da55b(0x208),_0x458121);},Window_ActorCommand['prototype']['playOkSound']=function(){const _0x1d8d7b=_0x24db6c;this['currentSymbol']()!==_0x1d8d7b(0x261)&&this[_0x1d8d7b(0x1bd)]()!==_0x1d8d7b(0x208)&&Window_Selectable[_0x1d8d7b(0x1f4)][_0x1d8d7b(0x1ea)][_0x1d8d7b(0x222)](this);},Window_BattleStatus[_0x24db6c(0x1d8)]=VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)]['UI'][_0x24db6c(0x2f4)],Window_BattleStatus[_0x24db6c(0x258)]=VisuMZ[_0x24db6c(0x233)]['Settings']['UI']['BattleStatusAutoPosition'],Window_BattleStatus[_0x24db6c(0x2c9)]=VisuMZ['BoostAction'][_0x24db6c(0x1c4)]['UI']['BattleStatusOffsetX'],Window_BattleStatus['BOOST_POINTS_DISPLAY_OFFSET_Y']=VisuMZ[_0x24db6c(0x233)][_0x24db6c(0x1c4)]['UI']['BattleStatusOffsetY'],VisuMZ[_0x24db6c(0x233)]['Window_BattleStatus_drawItemStatus']=Window_BattleStatus[_0x24db6c(0x1f4)][_0x24db6c(0x1b5)],Window_BattleStatus[_0x24db6c(0x1f4)][_0x24db6c(0x1b5)]=function(_0x51aee1){const _0x2f2c80=_0x24db6c;VisuMZ[_0x2f2c80(0x233)][_0x2f2c80(0x264)]['call'](this,_0x51aee1),this[_0x2f2c80(0x305)](_0x51aee1);},Window_BattleStatus['prototype']['drawItemStatusBoostPoints']=function(_0x10cb3d){const _0x3ac6d2=_0x24db6c;if(!Window_BattleStatus[_0x3ac6d2(0x1d8)])return;const _0x576d80=this[_0x3ac6d2(0x1e8)](_0x10cb3d);if(!_0x576d80)return;if(!Window_BattleStatus[_0x3ac6d2(0x258)])this[_0x3ac6d2(0x269)](_0x10cb3d);else{if('ULjIk'!==_0x3ac6d2(0x1b8))return![];else this[_0x3ac6d2(0x198)](_0x10cb3d);}},Window_BattleStatus[_0x24db6c(0x1f4)]['drawItemStatusBoostPointsDefault']=function(_0x3adc03){const _0x59cbe9=_0x24db6c,_0x192a02=this['actor'](_0x3adc03),_0x1fed23=this[_0x59cbe9(0x21a)](_0x3adc03);let _0xf9dd23=_0x1fed23['x']-0x4+Window_BattleStatus[_0x59cbe9(0x2c9)],_0x1e8634=_0x1fed23['y']+0x4+Window_BattleStatus[_0x59cbe9(0x2e5)];this['placeBoostPoints'](_0x192a02,_0xf9dd23,_0x1e8634);},Window_BattleStatus[_0x24db6c(0x1f4)][_0x24db6c(0x198)]=function(_0x55b021){const _0x45010f=_0x24db6c,_0x1d4580=this[_0x45010f(0x1e8)](_0x55b021),_0x4840cf=this[_0x45010f(0x227)](_0x55b021),_0x20449e=Math[_0x45010f(0x23c)](ImageManager[_0x45010f(0x196)]*Game_BattlerBase[_0x45010f(0x2a4)]*Sprite_BoostContainer[_0x45010f(0x1f1)]),_0x4b17d3=Math['ceil'](ImageManager['iconHeight']*Sprite_BoostContainer[_0x45010f(0x1f1)]);let _0x311522=_0x4840cf['x']+0x4,_0x34b022=_0x4840cf['y']+0x4;const _0x350da4=this['battleLayoutStyle']();switch(_0x350da4){case _0x45010f(0x1ef):VisuMZ[_0x45010f(0x234)][_0x45010f(0x1c4)][_0x45010f(0x219)]['ShowFacesListStyle']?_0x311522+=ImageManager[_0x45010f(0x180)]+0x8:_0x311522+=ImageManager[_0x45010f(0x196)]+0x8;_0x311522+=0x88,_0x311522+=0x88*0x2;$dataSystem[_0x45010f(0x2b7)]&&(_0x311522+=0x88);_0x34b022+=Math[_0x45010f(0x21e)](0x0,Math[_0x45010f(0x2ce)]((this[_0x45010f(0x1ee)]()-_0x4b17d3)/0x2));break;case'xp':case _0x45010f(0x17e):case'border':_0x311522=Math[_0x45010f(0x2ce)](_0x4840cf['x']+(_0x4840cf['width']-_0x20449e)/0x2);break;case _0x45010f(0x216):_0x311522=Math[_0x45010f(0x2ce)](_0x4840cf['x']+(_0x4840cf['width']-_0x20449e)/0x2);const _0x51d3e1=$dataSystem[_0x45010f(0x2b7)]?0x4:0x3;_0x34b022=Math['round'](_0x4840cf['y']+_0x4840cf[_0x45010f(0x2db)]-0x4-this[_0x45010f(0x1ee)]()*_0x51d3e1);break;}_0x311522+=Window_BattleStatus[_0x45010f(0x2c9)],_0x34b022+=Window_BattleStatus['BOOST_POINTS_DISPLAY_OFFSET_Y'],this['placeBoostPoints'](_0x1d4580,_0x311522,_0x34b022);};
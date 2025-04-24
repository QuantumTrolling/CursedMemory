//=============================================================================
// VisuStella MZ - Anti-Damage Barriers
// VisuMZ_3_AntiDmgBarriers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_AntiDmgBarriers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AntiDmgBarriers = VisuMZ.AntiDmgBarriers || {};
VisuMZ.AntiDmgBarriers.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.05] [AntiDmgBarriers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Anti-Damage_Barriers_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @base VisuMZ_1_ElementStatusCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_ElementStatusCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ does not have many options for damage mitigation. There are
 * only raw defensive parameters, elemental rates, and direct damage modifiers.
 * This plugin introduces six categories of Anti-Damage Barriers made in the
 * form of states to allow you to create more ways for the player's party to
 * defend themselves with.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Cancellation Barriers that can block out damage entirely if the damage is
 *   above or below a certain threshold.
 * * Nullification Barriers that block out damage entirely, but have a limited
 *   amount of times they can block damage for.
 * * Reduction Barriers that can stack additively with one another to provide
 *   percentile reduction values.
 * * Absorption Barriers which contain an exact number of points of damage that
 *   they can soak up.
 * * MP Barriers that disperses a percentage of the damage towards a battler's
 *   MP pool as long as they have enough MP.
 * * TP Barriers that function similarly to MP Barriers except they disperse
 *   the damage dealt instead to the TP pool.
 * * The ability to set barriers to block specific types of damage ranging from
 *   all, certain hits, physical hits, magical hits, and even elemental hits.
 * * Skill and trait effects that can bypass barriers.
 * * Make certain barrier types fragile and will break upon receiving specific
 *   types of damage (elemental, physical, magical, etc).
 * * Nullification and Absorption Barriers can regenerate themselves and/or
 *   decay over time.
 * * Playing specific animations whenever barriers tank a hit or break.
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
 * * VisuMZ_1_ElementStatusCore
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
 * How Barriers Work
 * ============================================================================
 *
 * When an action successfully hits an actor, damage is calculated. Barriers do
 * not block damage that comes directly from event commands, plugin commands,
 * script calls, percentile HP action effects, or damage over time states.
 * 
 * Barrier states cannot be enabled in passive state form. This is due to their
 * nature of needing to be applied and their automatic nature of being removed
 * upon running out. Barrier states need to be directly applied through adding
 * a state upon the target battler. As passive states are neither applied nor
 * removed, barrier state effects cannot apply to them naturally.
 * 
 * Instead, they must come directly from a damage formula source. Before that
 * damage is applied to a battler, the following series of events happen:
 *
 * ---
 * 
 * === HP Damage Check ===
 * 
 * Check to see if the action is dealing HP damage. This does not apply for MP
 * or TP damage. If no HP damage is being dealt, ignore the rest.
 * 
 * ---
 * 
 * === State Breakers ===
 * 
 * Some states can have the unique trait of dispersing upon receiving specific
 * kinds of damage using the notetags from this plugin. These range from
 * breaking under any kind of damage, certain hit damage, physical damage,
 * magical magical, and elemental damage. If the damage to be dealt is
 * affiliated with any of the listed and the state is vulnerable to that kind
 * of damage, immediately destroy the state before the damage calculations are
 * made. This will affect any of the states remaining.
 * 
 * ---
 * 
 * === Barrier Ignore ===
 * 
 * Check if the action itself (skill or item), if the attacking battler, or if
 * the defending battler has any notetags that would cause them to ignore any
 * barrier effects. If there are, ignore the rest.
 * 
 * ---
 * 
 * === Cancellation Barriers ===
 * 
 * Check for any Cancellation Barriers. Cancellation Barriers come in two
 * different types: Over and Under. The value listed for a Cancel Over Barrier
 * will cancel damage equal to or over a specific amount. The reverse is true
 * for a Cancel Under Barrier as it will cancel damage equal to or under a
 * specific amount. If damage is blocked here, it is blocked entirely and the
 * rest of the steps do not need any calculations made.
 * 
 * ---
 * 
 * === Nullification Barriers ===
 * 
 * Next, check for any Nullification Barriers. These Barriers have a charge to
 * them displayed separate from their turn count. Any matching damage dealt
 * while a Nullification Barrier is active will be reduced entirely to 0 at the
 * cost of one of the Nullification Barrier's charges. If the Nullification
 * Barrier's charges reach 0, that state is automatically removed. If damage
 * is blocked here, it is blocked entirely and the rest of the steps do not 
 * need any calculations made.
 * 
 * If a battler has multiple Nullification Barriers, then charges will be
 * removed from Nullification Barriers with the least amount of turns remaining
 * to the ones with the most amount of turns remaining (or indefinite). If two
 * Nullification Barriers have an equal amount of turns remaining, then the
 * charge will be deducted from the one with the higher priority. If both
 * priorities are the same, then the charge will be deducted will be the one
 * with a lower database ID.
 * 
 * Renewing a Nullification Barrier's state will recalculate its charge count.
 * 
 * ---
 * 
 * === Battle Core's Pre-Damage Step ===
 * 
 * Here, the Battle Core's Pre-Damage Step takes effect. This means any of the
 * <JS Pre-Damage> and related notetags will take effect and any damage
 * modifications made from them will be carried forward.
 * 
 * ---
 * 
 * === Reduction Barriers ===
 * 
 * After applying the Battle Core's Pre-Damage Step, the Reduction Barriers
 * will have their turn. Reduction Barriers can stack with each other and they
 * stack additively. This means if you have a Reduction Barrier state worth
 * 10% and another one that is worth 20% on the same battler, then a total of
 * 30% damage will be reduced. If damage reaches zero, skip the remaining
 * Barrier calculations.
 * 
 * ---
 * 
 * === Absorption Barriers ===
 * 
 * Absorption Barrier states have a set value that they can absorb. This value
 * can be a static number or it can be calculated by a formula. The barrier
 * value an Absorption Barrier has will trade damage 1 for 1. Once the
 * Absorption Barrier reaches 0, it will automatically remove itself. If damage
 * reaches zero, skip the remaining Barrier calculations.
 * 
 * If there is 500 incoming damage and an Absorption Barrier of 100 is present,
 * then 400 damage will go through and the Absorption Barrier is reduced to 0,
 * thus removing itself.
 * 
 * If there is 100 incoming damage and an Absorption Barrier of 500 is present,
 * then 0 damage will go through and the Absorption Barrier is reduced to 400.
 * The Absorption Barrier will remain.
 * 
 * If a battler has multiple Absorption Barriers, then barriers will be removed
 * from Absorption Barriers with the least amount of turns remaining to the
 * ones with the most amount of turns remaining (or indefinite). If two
 * Absorption Barriers have an equal amount of turns remaining, then the
 * barriers deducted from the one with the higher priority. If both priorities
 * are the same, then the barrier deducted from will be the one with a lower
 * database ID.
 * 
 * Renewing an Absorption Barrier's state will recalculate its barrier count.
 * 
 * ---
 * 
 * === MP-Dispersion Barriers ===
 * 
 * If any MP-Dispersion Barriers are present, then it's time for them to take
 * effect. MP Barriers can block a percentage of the damage using MP, trading
 * off 1 for 1. If an MP Barrier has a value of 20%, then 20% of the damage
 * will be redirected to MP (or less if there's insufficient MP). If a battler
 * runs out of MP after this step, the MP-Dispersion Barrier will automatically
 * remove itself. If damage reaches zero, skip the remaining Barrier
 * calculations.
 * 
 * ---
 * 
 * === TP-Dispersion Barriers ===
 * 
 * If any TP-Dispersion Barriers are present, then it's time for them to take
 * effect. TP Barriers can block a percentage of the damage using TP, trading
 * off 1 for 1. If a TP Barrier has a value of 20%, then 20% of the damage
 * will be redirected to TP (or less if there's insufficient TP). If a battler
 * runs out of TP after this step, the TP-Dispersion Barrier will automatically
 * remove itself.
 * 
 * Some battlers might gain TP upon being hit. This gained TP does not apply
 * to the TP-Dispersion Barrier as it is generated after being hit.
 * 
 * ---
 * 
 * === Final Damage ===
 * 
 * After a long, long journey, any remaining damage will be dealt to the target
 * battler (unless there's other plugins affecting damage further).
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
 * === Cancellation Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Barrier Cancel Damage Over: x>
 * <hitType Barrier Cancel Damage Over: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into a Cancellation Barrier that blocks all damage equal
 *   to or over a specific amount determined by a formula.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the damage threshold that
 *   will be blocked by this barrier type.
 * - Replace 'formula' with a calculation that determines how much damage will
 *   be the barrier's threshold.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All Barrier Cancel Damage Over: 1000>
 *   <Physical Barrier Cancel Damage Over: 500>
 *   <Magical Barrier Cancel Damage Over: user.def + target.mdf>
 *   <Element Fire Cancel Damage Over: Math.randomInt(300)>
 *   <Element Wind, Ice Barrier Cancel Damage Over: $gameVariables.value(42)>
 *
 * ---
 *
 * <hitType Barrier Cancel Damage Under: x>
 * <hitType Barrier Cancel Damage Under: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into a Cancellation Barrier that blocks all damage equal
 *   to or under a specific amount determined by a formula.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the damage threshold that
 *   will be blocked by this barrier type.
 * - Replace 'formula' with a calculation that determines how much damage will
 *   be the barrier's threshold.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All Barrier Cancel Damage Under: 100>
 *   <Physical Barrier Cancel Damage Under: 200>
 *   <Magical Barrier Cancel Damage Under: user.def + target.mdf>
 *   <Element Fire Barrier Cancel Damage Under: Math.randomInt(500)>
 *   <Element Wind, Ice Barrier Cancel Damage Under: $gameVariables.value(42)>
 *
 * ---
 * 
 * === Nullification Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Nullify Barrier: x>
 * <hitType Nullify Barrier: formula>
 *
 * - Used for: State Notetags
 * - Nullification Barriers block all damage at the cost of one charge.
 * - If a Nullification Barrier runs out of charges, it will automatically
 *   remove itself from the battler.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the number of charges the
 *   Nullification Barrier will have.
 * - Replace 'formula' with a calculation that determines how much damage will
 *   be the barrier's charges.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * - Note! This effect is incompatible with the Absorption Barrier effect and
 *   both cannot be placed on the same state. They can, however, be placed on
 *   two separate states.
 * 
 *   Examples:
 * 
 *   <All Nullify Barrier: 3>
 *   <Physical Nullify Barrier: 5>
 *   <Magical Nullify Barrier: user.level + target.level>
 *   <Element Fire Nullify Barrier: Math.randomInt(10)>
 *   <Element Wind, Ice Nullify Barrier: $gameVariables.value(42)>
 *
 * ---
 *
 * <Nullify Barrier Degen: x>
 * <Nullify Barrier Degen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the charges for the Nullification Barrier to decay by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to decay by.
 * - Replace 'formula' with a calculation that determines how many charges it
 *   will decay by.
 *   - 'target' will be the battler the Nullification Barrier is on.
 * 
 *   Examples:
 *
 *   <Nullify Barrier Degen: 1>
 *   <Nullify Barrier Degen: Math.randomInt(3)>
 *
 * ---
 *
 * <Nullify Barrier Regen: x>
 * <Nullify Barrier Regen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the charges for the Nullification Barrier to raise by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to regen by.
 * - Replace 'formula' with a calculation that determines how many charges it
 *   will regen by.
 *   - 'target' will be the battler the Nullification Barrier is on.
 * 
 *   Examples:
 *
 *   <Nullify Barrier Regen: 1>
 *   <Nullify Barrier Regen: Math.randomInt(3)>
 *
 * ---
 * 
 * === Reduction Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Reduce Barrier: x%>
 * <hitType Reduce Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns the state into a Reduction Barrier. Reduction Barriers reduce
 *   incoming damage by a percentile.
 * - If a battler has multiple Reduction Barriers, they stack additively.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a percentile number indicating the amount of damage it
 *   will reduce by.
 * - Replace 'formula' with a calculation that determines the percentage of
 *   damage that will be reduced by.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All Reduce Barrier: 20%>
 *   <Physical Reduce Barrier: 40%>
 *   <Magical Reduce Barrier: user.hpRate()>
 *   <Element Fire Reduce Barrier: Math.random() * 0.50>
 *   <Element Wind, Ice Reduce Barrier: $gameVariables.value(42) * 0.01>
 *
 * ---
 * 
 * === Absorption Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Absorb Barrier: x>
 * <hitType Absorb Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns the state into an Absorption Barrier which contains a visible
 *   barrier that will block damage 1 for 1.
 * - If the Absorption Barrier's value is reduced to 0, it will automatically
 *   remove itself.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the barrier value the
 *   Absorption Barrier state has upon being applied.
 * - Replace 'formula' with a calculation that determines what barrier value
 *   Absorption Barrier state has upon being applied.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * - Note! This effect is incompatible with the Nullification Barrier effect
 *   and both cannot be placed on the same state. They can, however, be placed
 *   on two separate states.
 * 
 *   Examples:
 * 
 *   <All Absorb Barrier: 300>
 *   <Physical Absorb Barrier: 500>
 *   <Magical Absorb Barrier: user.def + target.mdf>
 *   <Element Fire Absorb Barrier: Math.randomInt(1000)>
 *   <Element Wind, Ice Absorb Barrier: $gameVariables.value(42)>
 *
 * ---
 *
 * <Absorb Barrier Degen: x>
 * <Absorb Barrier Degen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the barrier for the Absorption Barrier to decay by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to decay by.
 * - Replace 'formula' with a calculation that determines how much barrier it
 *   will decay by.
 *   - 'target' will be the battler the Absorption Barrier is on.
 * 
 *   Examples:
 *
 *   <Absorb Barrier Degen: 1>
 *   <Absorb Barrier Degen: Math.randomInt(3)>
 *
 * ---
 *
 * <Absorb Barrier Regen: x>
 * <Absorb Barrier Regen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the barrier for the Absorption Barrier to regen by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to regen by.
 * - Replace 'formula' with a calculation that determines how much barrier it
 *   will regen by.
 *   - 'target' will be the battler the Absorption Barrier is on.
 * 
 *   Examples:
 *
 *   <Absorb Barrier Regen: 1>
 *   <Absorb Barrier Regen: Math.randomInt(3)>
 *
 * ---
 * 
 * === MP Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType MP Barrier: x%>
 * <hitType MP Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into an MP-Dispersion Barrier state where a portion of
 *   the incoming damage can be dispersed into the affected battler's MP pool.
 * - Damage will be dispersed 1 for 1 with MP. If there is insufficient MP,
 *   the damage dispersion percentile will be reduced to account for MP.
 * - If MP reaches 0, the state will automatically remove itself.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a percentile number indicating the amount of damage that
 *   is dispersed into the battler's MP pool.
 * - Replace 'formula' with a calculation that determines the percentage of
 *   damage that will be dispersed into the MP pool.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All MP Barrier: 20%>
 *   <Physical MP Barrier: 40%>
 *   <Magical MP Barrier: user.hpRate()>
 *   <Element Fire MP Barrier: Math.random() * 0.50>
 *   <Element Wind, Ice MP Barrier: $gameVariables.value(42) * 0.01>
 *
 * ---
 * 
 * === TP Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType TP Barrier: x%>
 * <hitType TP Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into a TP-Dispersion Barrier state where a portion of
 *   the incoming damage can be dispersed into the affected battler's TP pool.
 * - Damage will be dispersed 1 for 1 with TP. If there is insufficient TP,
 *   the damage dispersion percentile will be reduced to account for TP.
 * - If TP reaches 0, the state will automatically remove itself.
 * - TP can be generated upon being hit. This gained TP does not apply to the
 *   TP-Dispersion Barrier as it is generated after being hit.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a percentile number indicating the amount of damage that
 *   is dispersed into the battler's TP pool.
 * - Replace 'formula' with a calculation that determines the percentage of
 *   damage that will be dispersed into the TP pool.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All TP Barrier: 20%>
 *   <Physical TP Barrier: 40%>
 *   <Magical TP Barrier: user.hpRate()>
 *   <Element Fire TP Barrier: Math.random() * 0.50>
 *   <Element Wind, Ice TP Barrier: $gameVariables.value(42) * 0.01>
 *
 * ---
 * 
 * === Barrier Bypass-Related Notetags ===
 * 
 * ---
 *
 * <Ignore Barriers>
 *
 * - Used for: Skill, Item Notetags
 * - Causes this skill or item to completely ignore any barriers on the target.
 *
 * ---
 *
 * <Ignore Barriers as User>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If an attacker with this notetag on any of its trait objects attacks a
 *   target with barriers, ignore the target's barriers.
 *
 * ---
 *
 * <Ignore Barriers as Target>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a target battler has this notetag on any of its trait objects receives
 *   an attack, any barriers on the target battler will be ignored.
 *
 * ---
 * 
 * === Break State-Related Notetags ===
 * 
 * ---
 *
 * <hitType Breaks State>
 *
 * - Used for: State Notetags
 * - If an attack hits a battler with this state and state's notetag, as long
 *   as the damage type matches, automatically remove the state.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - This can be used for states that aren't barriers.
 * - This occurs before most of the pre-damage phase.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Absorption Barriers
 * ============================================================================
 *
 * Settings for the Absorption Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text popup stating how much barrier was lost.
 *   - %1 - Barrier
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
 * Plugin Parameters: Cancellation Barriers
 * ============================================================================
 *
 * Settings for the Cancellation Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: MP-Dispersion Barriers
 * ============================================================================
 *
 * Settings for the MP-Dispersion Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Nullification Barriers
 * ============================================================================
 *
 * Settings for the Nullificaton Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Reduction Barriers
 * ============================================================================
 *
 * Settings for the Reduction Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: TP-Dispersion Barriers
 * ============================================================================
 *
 * Settings for the TP-Dispersion Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text popup stating how much TP was lost.
 *   - %1 - TP Lost, %2 - TP Text
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
 * Version 1.05: November 11, 2021
 * * Documentation Update
 * ** Added snip in "How Barriers Work" section:
 * *** Barrier states cannot be enabled in passive state form. This is due to
 *     their nature of needing to be applied and their automatic nature of
 *     being removed upon running out. Barrier states need to be directly
 *     applied through adding a state upon the target battler. As passive
 *     states are neither applied nor removed, barrier state effects cannot
 *     apply to them naturally.
 * 
 * Version 1.04: July 2, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.03: March 12, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Absorption Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > Absorption Settings > Break > Enemy Flip?
 * *** Plugin Parameters > Cancellation Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > Cancellation Settings > Break > Enemy Flip?
 * *** Plugin Parameters > MP-Dispersion Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > MP-Dispersion Settings > Break > Enemy Flip?
 * *** Plugin Parameters > Nullification Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > Nullification Settings > Break > Enemy Flip?
 * *** Plugin Parameters > Reduction Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > Reduction Settings > Break > Enemy Flip?
 * *** Plugin Parameters > TP-Dispersion Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > TP-Dispersion Settings > Break > Enemy Flip?
 * **** Flip the animation for enemies?
 * 
 * Version 1.02: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.01: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00: November 4, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PluginCommandFunctionName
 * @text Category: Function Name
 * @desc Plugin Command Description Text
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg option:num
 * @text Option Text
 * @type number
 * @max 1
 * @desc Change the value to this number
 * @default 42069
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableAntiDmgBarriersMenu
 * @text System: Enable AntiDmgBarriers in Menu?
 * @desc Enables/disables AntiDmgBarriers menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables AntiDmgBarriers menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowAntiDmgBarriersMenu
 * @text System: Show AntiDmgBarriers in Menu?
 * @desc Shows/hides AntiDmgBarriers menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides AntiDmgBarriers menu inside the main menu.
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
 * @param AntiDmgBarriers
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Absorb:struct
 * @text Absorption Barriers
 * @type struct<Absorb>
 * @desc Settings for the Absorption Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"4","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"5","BreakMirror:eval":"false","BreakMute:eval":"false","Popups":"","PopupText:str":"-%1","TextColor:str":"27","FlashColor:eval":"[255, 0, 255, 160]","FlashDuration:num":"60"}
 *
 * @param Cancel:struct
 * @text Cancellation Barriers
 * @type struct<Cancel>
 * @desc Settings for the Cancellation Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"119","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"15","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param MP:struct
 * @text MP-Dispersion Barriers
 * @type struct<MP>
 * @desc Settings for the MP-Dispersion Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"62","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"81","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param Nullify:struct
 * @text Nullification Barriers
 * @type struct<Nullify>
 * @desc Settings for the Nullificaton Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"58","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"11","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param Reduce:struct
 * @text Reduction Barriers
 * @type struct<Reduce>
 * @desc Settings for the Reduction Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"53","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"14","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param TP:struct
 * @text TP-Dispersion Barriers
 * @type struct<TP>
 * @desc Settings for the TP-Dispersion Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"91","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"45","BreakMirror:eval":"false","BreakMute:eval":"false","Popups":"","PopupText:str":"-%1 %2","TextColor:str":"29","FlashColor:eval":"[0, 255, 0, 160]","FlashDuration:num":"60"}
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
 * Absorption Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Absorb:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 4
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 5
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text popup stating how much barrier was lost.
 * %1 - Barrier
 * @default -%1
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 255, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Cancellation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cancel:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 119
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 15
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * MP Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MP:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 62
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 61
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Nullify Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Nullify:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 58
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 11
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Reduction Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Reduce:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 53
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 14
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * TP Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TP:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 91
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 45
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text popup stating how much TP was lost.
 * %1 - TP Lost, %2 - TP Text
 * @default -%1 %2
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
//=============================================================================

function _0x58e3(){const _0x187d96=['AntiDmgBarriers','includes','hasAntiDmgBarriersNotetag','createJsTargets','_antiDamageBarrierTp','isAntiDamageBarrierIgnoredAsSubject','TpBarrier','698259jJHWCa','CancelUnder','phZyw','104BJUsUr','VisuMZ_1_ElementStatusCore','trim','MpBarrier','concat','onAntiDamageNullificationBarrier','TextColor','regenerateAntiDamageBarriers','AbsorbBarrier','LmeCR','initAntiDamageBarrierDataForState','jXDro','FsUIz','Game_BattlerBase_initMembers','DJkry','AbUdn','applyMpBarrier','isAntiDamageBarrierIgnored','stateTurns','split','14670OmNSDE','CancelOver','qHYQY','log','mZPYm','STR','removeState','states','QMDTr','parse','displayAbsorptionBarrierPopup','addState','ANY','VisuMZ_1_SkillsStatesCore','RzZFK','getAntiDamageBarrierStates','initAntiDamageBarriers','sNqZA','traitObjects','CoflI','_antiDamageBarrierReduction','RegExp','IgnoreAllBarrierAsAttacker','CalculateCharges','match','onAntiDamageBarrierEffect','replace','%1Mute','FlashColor','applyReductionBarrier','clearJsTargets','onAntiDamageAbsorptionBarrier','isHpEffect','dORif','Reduce','jywUh','applyCancelUnderBarrier','nlEju','_subject','AqSxH','user','NullBarrier','skills','_antiDamageBarrierCancelUnder','Xksly','applyNullificationBarrier','831519otcPei','max','getAntiDamageBarrierCancelUnder','elements','ARRAYEVAL','getAntiDamageBarrierReduction','clamp','Game_Action_applyBattleCoreJS','StateMatchesBreakEffect','isStateAffected','setStateDisplay','yzama','%1EnemyFlip','VisuMZ_1_BattleCore','2ZaCWCJ','RHlge','qMytm','ceil','parameters','Hdfcv','applyBattleCoreJS','ReduceBarrier','xAsVB','requestFauxAnimation','IgnoreAllBarrierAsDefender','ARRAYSTR','ZdqRH','ARRAYFUNC','pMAzZ','prototype','jjzoY','exit','HiNSi','JSON','matchesAntiDamageBarrierElementType','getAntiDamageBarrierTp','target','sort','osGBi','ARRAYSTRUCT','setAntiDamageBarrierMp','pKStA','map','min','BreakState','regenerateAntiDamageBarrierState','AUDjI','_antiDamageBarrierMp','gainMp','ALL','name','672eApjxM','TijvW','applyCancelOverBarrier','KbOTI','getAntiDamageBarrierCancelOver','296271yRLRtP','Cancel','qTujk','isAlive','FUNC','applyPostAntiDamageBarriers','_antiDamageBarrierCancelOver','awCLm','SpivY','note','mzRaA','vVDnD','Absorb','regenerateAll','call','Game_Battler_addState','isSceneBattle','WDrgy','onAntiDamageMpBarrier','processBreakStateEffect','subject','fYMvi','VisuMZ_0_CoreEngine','priority','1397968guAmfz','matchesAntiDamageBarrierType','applyBreakStateEffects','getStateDisplay','displayTpBarrierPopup','matchesAntiDamageBarrier','return\x200','ConvertParams','102yUhDfI','IgnoreAllBarrier','applyPreAntiDamageBarriers','osrra','autoRemovalTiming','format','2820TwmISo','PBRay','item','getAntiDamageBarrierMp','NUM','DAMAGE','eZTdb','applyTpBarrier','applyAbsorptionBarrier','PopupText','Break','aExMI','initMembers','%1AnimationID','setAntiDamageBarrierCancelUnder','FlashDuration','MAX_SAFE_INTEGER','isAntiDamageBarrierIgnoredAsTarget','341qdiiwa','status','setAntiDamageBarrierReduction','QOknk','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Settings','%1Mirror','BarrierDegen','toUpperCase','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','onAntiDamageReductionBarrier','setAntiDamageBarrierCancelOver','isCertainHit','some','fFlxQ','Nullify','Game_Battler_regenerateAll','cGfdq','PreDamage%1JS','STRUCT','uZMFv','version','UlMZZ','mIhTA','Intact','description'];_0x58e3=function(){return _0x187d96;};return _0x58e3();}const _0x2e38d7=_0x4aa9;(function(_0x37efc5,_0x4abada){const _0x2a02a9=_0x4aa9,_0x5a45ec=_0x37efc5();while(!![]){try{const _0x50d28c=-parseInt(_0x2a02a9(0x138))/0x1+-parseInt(_0x2a02a9(0x10e))/0x2*(-parseInt(_0x2a02a9(0xbb))/0x3)+parseInt(_0x2a02a9(0x150))/0x4+parseInt(_0x2a02a9(0x15e))/0x5*(parseInt(_0x2a02a9(0x158))/0x6)+parseInt(_0x2a02a9(0x133))/0x7*(parseInt(_0x2a02a9(0xbe))/0x8)+parseInt(_0x2a02a9(0x100))/0x9+-parseInt(_0x2a02a9(0xd2))/0xa*(parseInt(_0x2a02a9(0x9a))/0xb);if(_0x50d28c===_0x4abada)break;else _0x5a45ec['push'](_0x5a45ec['shift']());}catch(_0x4996a5){_0x5a45ec['push'](_0x5a45ec['shift']());}}}(_0x58e3,0x53eac));var label=_0x2e38d7(0xb4),tier=tier||0x0,dependencies=[_0x2e38d7(0x14e),_0x2e38d7(0x10d),_0x2e38d7(0xdf),_0x2e38d7(0xbf)],pluginData=$plugins['filter'](function(_0xcfe474){const _0x4e4096=_0x2e38d7;return _0xcfe474[_0x4e4096(0x9b)]&&_0xcfe474['description'][_0x4e4096(0xb5)]('['+label+']');})[0x0];function _0x4aa9(_0x45f5e0,_0x2844ca){const _0x58e30d=_0x58e3();return _0x4aa9=function(_0x4aa90a,_0x7f87f4){_0x4aa90a=_0x4aa90a-0x92;let _0xf17dcf=_0x58e30d[_0x4aa90a];return _0xf17dcf;},_0x4aa9(_0x45f5e0,_0x2844ca);}VisuMZ[label][_0x2e38d7(0x9f)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x2e38d7(0x157)]=function(_0xfb94ff,_0x1939e8){const _0x591356=_0x2e38d7;for(const _0x4fe296 in _0x1939e8){if(_0x4fe296['match'](/(.*):(.*)/i)){const _0x118a09=String(RegExp['$1']),_0x115de6=String(RegExp['$2'])[_0x591356(0xa2)]()[_0x591356(0xc0)]();let _0x4673f9,_0x462dcc,_0x14922d;switch(_0x115de6){case _0x591356(0x162):_0x4673f9=_0x1939e8[_0x4fe296]!==''?Number(_0x1939e8[_0x4fe296]):0x0;break;case'ARRAYNUM':_0x462dcc=_0x1939e8[_0x4fe296]!==''?JSON[_0x591356(0xdb)](_0x1939e8[_0x4fe296]):[],_0x4673f9=_0x462dcc['map'](_0xc40c0e=>Number(_0xc40c0e));break;case'EVAL':_0x4673f9=_0x1939e8[_0x4fe296]!==''?eval(_0x1939e8[_0x4fe296]):null;break;case _0x591356(0x104):_0x462dcc=_0x1939e8[_0x4fe296]!==''?JSON[_0x591356(0xdb)](_0x1939e8[_0x4fe296]):[],_0x4673f9=_0x462dcc[_0x591356(0x12a)](_0x277b58=>eval(_0x277b58));break;case _0x591356(0x121):_0x4673f9=_0x1939e8[_0x4fe296]!==''?JSON[_0x591356(0xdb)](_0x1939e8[_0x4fe296]):'';break;case'ARRAYJSON':_0x462dcc=_0x1939e8[_0x4fe296]!==''?JSON[_0x591356(0xdb)](_0x1939e8[_0x4fe296]):[],_0x4673f9=_0x462dcc[_0x591356(0x12a)](_0x3df1e8=>JSON['parse'](_0x3df1e8));break;case _0x591356(0x13c):_0x4673f9=_0x1939e8[_0x4fe296]!==''?new Function(JSON[_0x591356(0xdb)](_0x1939e8[_0x4fe296])):new Function(_0x591356(0x156));break;case _0x591356(0x11b):_0x462dcc=_0x1939e8[_0x4fe296]!==''?JSON[_0x591356(0xdb)](_0x1939e8[_0x4fe296]):[],_0x4673f9=_0x462dcc['map'](_0x3207e9=>new Function(JSON['parse'](_0x3207e9)));break;case _0x591356(0xd7):_0x4673f9=_0x1939e8[_0x4fe296]!==''?String(_0x1939e8[_0x4fe296]):'';break;case _0x591356(0x119):_0x462dcc=_0x1939e8[_0x4fe296]!==''?JSON[_0x591356(0xdb)](_0x1939e8[_0x4fe296]):[],_0x4673f9=_0x462dcc['map'](_0x7a06a8=>String(_0x7a06a8));break;case _0x591356(0xad):_0x14922d=_0x1939e8[_0x4fe296]!==''?JSON[_0x591356(0xdb)](_0x1939e8[_0x4fe296]):{},_0x4673f9=VisuMZ['ConvertParams']({},_0x14922d);break;case _0x591356(0x127):_0x462dcc=_0x1939e8[_0x4fe296]!==''?JSON['parse'](_0x1939e8[_0x4fe296]):[],_0x4673f9=_0x462dcc['map'](_0x20bc9e=>VisuMZ[_0x591356(0x157)]({},JSON[_0x591356(0xdb)](_0x20bc9e)));break;default:continue;}_0xfb94ff[_0x118a09]=_0x4673f9;}}return _0xfb94ff;},(_0x558659=>{const _0x5d9c0a=_0x2e38d7,_0x29f18a=_0x558659[_0x5d9c0a(0x132)];for(const _0x1d9d77 of dependencies){if(!Imported[_0x1d9d77]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x5d9c0a(0x15d)](_0x29f18a,_0x1d9d77)),SceneManager[_0x5d9c0a(0x11f)]();break;}}const _0x300d83=_0x558659[_0x5d9c0a(0xb3)];if(_0x300d83[_0x5d9c0a(0xea)](/\[Version[ ](.*?)\]/i)){if(_0x5d9c0a(0xb0)===_0x5d9c0a(0xb0)){const _0x3450c5=Number(RegExp['$1']);if(_0x3450c5!==VisuMZ[label][_0x5d9c0a(0xaf)]){if(_0x5d9c0a(0xda)===_0x5d9c0a(0xd4))return this[_0x5d9c0a(0xa6)]();else alert(_0x5d9c0a(0x9e)[_0x5d9c0a(0x15d)](_0x29f18a,_0x3450c5)),SceneManager[_0x5d9c0a(0x11f)]();}}else{const _0xa5a83a=_0x529f2d[_0x5d9c0a(0xb4)]['CalculateCharges'](_0x4ef443['$2']);this[_0x5d9c0a(0x128)](_0x169f25,_0xa5a83a||0x0);}}if(_0x300d83['match'](/\[Tier[ ](\d+)\]/i)){if(_0x5d9c0a(0x13f)==='kBPBa')this[_0x5d9c0a(0x12d)](_0x2271f7);else{const _0x4255b6=Number(RegExp['$1']);_0x4255b6<tier?(alert(_0x5d9c0a(0xa3)[_0x5d9c0a(0x15d)](_0x29f18a,_0x4255b6,tier)),SceneManager[_0x5d9c0a(0x11f)]()):_0x5d9c0a(0x140)!==_0x5d9c0a(0x93)?tier=Math[_0x5d9c0a(0x101)](_0x4255b6,tier):_0x234d5c[_0x5d9c0a(0x152)](this);}}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x558659[_0x5d9c0a(0x112)]);})(pluginData),VisuMZ[_0x2e38d7(0xb4)][_0x2e38d7(0xe7)]={'IgnoreAllBarrier':/<IGNORE (?:ALL BARRIER|ALL BARRIERS|BARRIER|BARRIERS)>/gi,'IgnoreAllBarrierAsAttacker':/<IGNORE (?:ALL BARRIER|ALL BARRIERS|BARRIER|BARRIERS) AS (?:ATTACKER|USER)>/gi,'IgnoreAllBarrierAsDefender':/<IGNORE (?:ALL BARRIER|ALL BARRIERS|BARRIER|BARRIERS) AS (?:TARGET|DEFENDER)>/gi,'CancelOver':/<(.*)[ ]BARRIER CANCEL[ ](?:DMG OVER|DAMAGE OVER|OVER):[ ](.*)>/gi,'CancelUnder':/<(.*)[ ]BARRIER CANCEL[ ](?:DMG UNDER|DAMAGE UNDER|UNDER):[ ](.*)>/gi,'NullBarrier':/<(.*)[ ](?:NULLIFY|NULL|NULLIFICATION)[ ]BARRIER:[ ](.*)>/gi,'ReduceBarrier':/<(.*)[ ](?:CUT|REDUCE|REDUCTION)[ ]BARRIER:[ ](.*)>/gi,'AbsorbBarrier':/<(.*)[ ](?:ABSORB|ABSORPTION)[ ]BARRIER:[ ](.*)>/gi,'MpBarrier':/<(.*)[ ](?:MP|MAGIC|MANA)[ ]BARRIER:[ ](.*)>/gi,'TpBarrier':/<(.*)[ ](?:TP|TECH|LIMIT)[ ]BARRIER:[ ](.*)>/gi,'BreakState':/<(.*)[ ](?:BREAK|BREAKS)[ ]STATE>/gi,'BarrierDegen':/<(?:ABSORB|ABSORPTION|NULLIFY|NULL|NULLIFICATION)[ ]BARRIER[ ](?:DECAY|DEGEN):[ ](.*)>/gi,'BarrierRegen':/<(?:ABSORB|ABSORPTION|NULLIFY|NULL|NULLIFICATION)[ ]BARRIER[ ](?:REGENERATION|REGEN):[ ](.*)>/gi},DataManager[_0x2e38d7(0xb6)]=function(_0x2576c1){const _0x4dc3df=_0x2e38d7;if(!_0x2576c1)return![];const _0x4bcd94=VisuMZ[_0x4dc3df(0xb4)][_0x4dc3df(0xe7)],_0x4f7531=_0x2576c1[_0x4dc3df(0x141)]||'';for(const _0x1a765f in _0x4bcd94){if('WDrgy'!==_0x4dc3df(0x149))_0x55fa61[_0x4dc3df(0xfa)]=_0xb54d21[_0x4dc3df(0xf8)]||_0x1f7be1,_0x29e947['target']=_0x4aeaae,_0x2310ea['a']=_0x28bf69[_0x4dc3df(0xfa)],_0x11f89f['b']=_0x42a416[_0x4dc3df(0x124)];else{if(_0x4f7531[_0x4dc3df(0xea)](_0x4bcd94[_0x1a765f]))return!![];}}return![];},VisuMZ[_0x2e38d7(0xb4)][_0x2e38d7(0x107)]=Game_Action[_0x2e38d7(0x11d)][_0x2e38d7(0x114)],Game_Action[_0x2e38d7(0x11d)]['applyBattleCoreJS']=function(_0xb3bb1c,_0x15ea88,_0x16b2ad,_0x169dde){const _0x415556=_0x2e38d7,_0x1d84f8=_0xb3bb1c===_0x415556(0xac)&&this[_0x415556(0xf2)]()&&_0x16b2ad>0x0;if(_0x1d84f8){if(_0x415556(0xca)===_0x415556(0x13a)){if(this[_0x415556(0x160)]()&&this[_0x415556(0x160)]()['note'][_0x415556(0xea)](_0x4044cb['AntiDmgBarriers'][_0x415556(0xe7)][_0x415556(0x159)]))return!![];if(this['isAntiDamageBarrierIgnoredAsSubject']())return!![];if(this[_0x415556(0x99)](_0x155212))return!![];return![];}else _0x15ea88[_0x415556(0x152)](this);}return _0x1d84f8&&('PBRay'===_0x415556(0x15f)?_0x16b2ad=this[_0x415556(0x15a)](_0x15ea88,_0x16b2ad):_0x503720+=_0x169074['AntiDmgBarriers'][_0x415556(0xe9)](_0x256854['$1'])),_0x16b2ad=VisuMZ[_0x415556(0xb4)]['Game_Action_applyBattleCoreJS'][_0x415556(0x146)](this,_0xb3bb1c,_0x15ea88,_0x16b2ad,_0x169dde),_0x1d84f8&&(_0x16b2ad=this[_0x415556(0x13d)](_0x15ea88,_0x16b2ad)),_0x16b2ad;},Game_Action[_0x2e38d7(0x11d)][_0x2e38d7(0x15a)]=function(_0x3447cc,_0x2a20b9){const _0x274e14=_0x2e38d7;if(this[_0x274e14(0xcf)](_0x3447cc))return _0x2a20b9;if(this[_0x274e14(0x135)](_0x3447cc,_0x2a20b9))return 0x0;if(this['applyCancelUnderBarrier'](_0x3447cc,_0x2a20b9))return 0x0;if(this[_0x274e14(0xff)](_0x3447cc))return 0x0;return _0x2a20b9;},Game_Action['prototype'][_0x2e38d7(0x13d)]=function(_0x26bd47,_0x4466ef){const _0x1627e6=_0x2e38d7;if(this[_0x1627e6(0xcf)](_0x26bd47))return _0x4466ef;if(_0x4466ef<=0x0)return _0x4466ef;return _0x4466ef=this[_0x1627e6(0xef)](_0x26bd47,_0x4466ef),_0x4466ef=this['applyAbsorptionBarrier'](_0x26bd47,_0x4466ef),_0x4466ef=this['applyMpBarrier'](_0x26bd47,_0x4466ef),_0x4466ef=this[_0x1627e6(0x165)](_0x26bd47,_0x4466ef),_0x4466ef;},Game_Action[_0x2e38d7(0x11d)][_0x2e38d7(0xcf)]=function(_0x2a1aa9){const _0x93852d=_0x2e38d7;if(this[_0x93852d(0x160)]()&&this[_0x93852d(0x160)]()[_0x93852d(0x141)]['match'](VisuMZ[_0x93852d(0xb4)][_0x93852d(0xe7)][_0x93852d(0x159)])){if(_0x93852d(0xa8)===_0x93852d(0x11a)){const _0x181b1c=_0x29075c['id'];this['mp']<=0x0&&this['removeState'](_0x181b1c),this[_0x93852d(0xeb)]('MP',this['mp']>0x0);}else return!![];}if(this[_0x93852d(0xb9)]())return!![];if(this['isAntiDamageBarrierIgnoredAsTarget'](_0x2a1aa9)){if(_0x93852d(0x10f)===_0x93852d(0x10f))return!![];else{const _0x10ac39=_0x26a781(_0x2b993d['$1']);_0x10ac39!==_0x26afab[_0x5adc71][_0x93852d(0xaf)]&&(_0x1aa6be(_0x93852d(0x9e)[_0x93852d(0x15d)](_0x51e020,_0x10ac39)),_0x1430b7[_0x93852d(0x11f)]());}}return![];},Game_Action['prototype'][_0x2e38d7(0xb9)]=function(){const _0x476688=_0x2e38d7,_0x4404ef=this[_0x476688(0x14c)]()[_0x476688(0xe4)](),_0x26966e=VisuMZ['AntiDmgBarriers']['RegExp'][_0x476688(0xe8)];return _0x4404ef[_0x476688(0xa7)](_0x32630b=>_0x32630b&&_0x32630b[_0x476688(0x141)]&&_0x32630b[_0x476688(0x141)]['match'](_0x26966e));},Game_Action[_0x2e38d7(0x11d)][_0x2e38d7(0x99)]=function(_0x975e24){const _0x1d1a53=_0x2e38d7,_0x54f211=_0x975e24[_0x1d1a53(0xe4)](),_0x4e60ae=VisuMZ[_0x1d1a53(0xb4)][_0x1d1a53(0xe7)][_0x1d1a53(0x118)];return _0x54f211[_0x1d1a53(0xa7)](_0x5c03a6=>_0x5c03a6&&_0x5c03a6[_0x1d1a53(0x141)]&&_0x5c03a6[_0x1d1a53(0x141)][_0x1d1a53(0xea)](_0x4e60ae));},Game_Action[_0x2e38d7(0x11d)]['applyNullificationBarrier']=function(_0x52200e){const _0x5f113e=_0x2e38d7,_0xaac547=_0x52200e[_0x5f113e(0xe1)]();for(const _0x493ab6 of _0xaac547){if(!_0x493ab6)continue;if(this['matchesAntiDamageBarrier'](_0x493ab6,_0x5f113e(0xfb)))return _0x52200e[_0x5f113e(0xc3)](_0x493ab6),!![];}return![];},Game_Action['prototype'][_0x2e38d7(0x135)]=function(_0x5c2ace,_0x23d83f){const _0x56c431=_0x2e38d7,_0x5d0955=_0x5c2ace[_0x56c431(0xd9)]();for(const _0x29de27 of _0x5d0955){if(_0x56c431(0x110)!=='qMytm')this[_0x56c431(0x10a)](_0x424f89['id'],_0x22d6d7);else{if(!_0x29de27)continue;if(_0x23d83f<_0x5c2ace['getAntiDamageBarrierCancelOver'](_0x29de27['id']))continue;if(this[_0x56c431(0x155)](_0x29de27,_0x56c431(0xd3)))return _0x5c2ace['onAntiDamageCancelBarrier'](_0x29de27),!![];}}return![];},Game_Action[_0x2e38d7(0x11d)][_0x2e38d7(0xf6)]=function(_0x1f0abe,_0x101d9f){const _0x79386a=_0x2e38d7,_0x44fc40=_0x1f0abe['states']();for(const _0x353f69 of _0x44fc40){if(!_0x353f69)continue;if(_0x101d9f>_0x1f0abe[_0x79386a(0x102)](_0x353f69['id']))continue;if(this[_0x79386a(0x155)](_0x353f69,'CancelUnder'))return _0x1f0abe['onAntiDamageCancelBarrier'](_0x353f69),!![];}return![];},Game_Action['prototype']['applyReductionBarrier']=function(_0x424e93,_0x439e7f){const _0x5bcd19=_0x2e38d7;if(_0x439e7f<=0x0)return _0x439e7f;const _0xecff6=_0x424e93['states']();let _0x101afd=0x0;for(const _0x4f1dcf of _0xecff6){if(!_0x4f1dcf)continue;this[_0x5bcd19(0x155)](_0x4f1dcf,_0x5bcd19(0x115))&&(_0x101afd+=_0x424e93[_0x5bcd19(0x105)](_0x4f1dcf['id']));}return _0x101afd>0x0&&(console[_0x5bcd19(0xd5)](_0x439e7f,_0x101afd),_0x439e7f*=(0x1-_0x101afd)[_0x5bcd19(0x106)](0x0,0x1),_0x424e93[_0x5bcd19(0xa4)]()),_0x439e7f;},Game_Action[_0x2e38d7(0x11d)][_0x2e38d7(0x166)]=function(_0x89ec3e,_0x5c3c64){const _0x25e305=_0x2e38d7;if(_0x5c3c64<=0x0)return _0x5c3c64;const _0x2a9498=_0x89ec3e[_0x25e305(0xe1)]();for(const _0x3807db of _0x2a9498){if(_0x25e305(0xab)!==_0x25e305(0xab))this[_0x25e305(0xe2)]();else{if(!_0x3807db)continue;if(this[_0x25e305(0x155)](_0x3807db,'AbsorbBarrier')){let _0x3804b9=Number(_0x89ec3e[_0x25e305(0x153)](_0x3807db['id']))||0x0;const _0x3cda7c=Math[_0x25e305(0x12b)](_0x5c3c64,_0x3804b9);_0x5c3c64-=_0x3cda7c,_0x3804b9-=_0x3cda7c,_0x89ec3e[_0x25e305(0x10a)](_0x3807db['id'],_0x3804b9);_0x3cda7c>0x0&&(_0x89ec3e[_0x25e305(0xdc)](_0x3cda7c,_0x3807db),_0x89ec3e[_0x25e305(0xf1)](_0x3807db));if(_0x5c3c64<=0x0){if(_0x25e305(0xcc)===_0x25e305(0xcc))break;else this['initAntiDamageBarriers']();}}}}return _0x5c3c64;},Game_Action[_0x2e38d7(0x11d)]['applyMpBarrier']=function(_0x350486,_0x36a6c2){const _0x3fdd22=_0x2e38d7;if(_0x36a6c2<=0x0)return _0x36a6c2;const _0x564285=_0x350486[_0x3fdd22(0xd9)]();let _0x5abefd=_0x350486['mp'];for(const _0x19cdcb of _0x564285){if(!_0x19cdcb)continue;if(this[_0x3fdd22(0x155)](_0x19cdcb,_0x3fdd22(0xc1))){if(_0x3fdd22(0x113)===_0x3fdd22(0xc7)){const _0x2722cc=this['traitObjects']()[_0x3fdd22(0xc2)](this[_0x3fdd22(0xfc)]()),_0x3bae4d=_0x12cb7b[_0x3fdd22(0xb4)][_0x3fdd22(0xe7)][_0x3fdd22(0x159)];return _0x2722cc[_0x3fdd22(0xa7)](_0x266b00=>_0x266b00&&_0x266b00[_0x3fdd22(0x141)]&&_0x266b00[_0x3fdd22(0x141)][_0x3fdd22(0xea)](_0x3bae4d));}else{const _0x54dd98=_0x350486[_0x3fdd22(0x161)](_0x19cdcb['id']),_0xa93954=Math[_0x3fdd22(0x12b)](Math[_0x3fdd22(0x111)](_0x36a6c2*_0x54dd98),_0x350486['mp']);_0x36a6c2-=_0xa93954,_0x350486[_0x3fdd22(0x130)](-_0xa93954);_0xa93954>0x0&&(_0x3fdd22(0xc9)===_0x3fdd22(0xc9)?_0x350486[_0x3fdd22(0x14a)](_0x19cdcb):this[_0x3fdd22(0xd8)](_0x17af49));if(_0x36a6c2<=0x0)break;}}}return _0x36a6c2;},Game_Action[_0x2e38d7(0x11d)]['applyTpBarrier']=function(_0x570e1f,_0x5110d9){const _0x1b1a4a=_0x2e38d7;if(_0x5110d9<=0x0)return _0x5110d9;const _0x52ce42=_0x570e1f['states']();let _0x461c85=_0x570e1f['mp'];for(const _0x2c5f1a of _0x52ce42){if(!_0x2c5f1a)continue;if(this[_0x1b1a4a(0x155)](_0x2c5f1a,_0x1b1a4a(0xba))){const _0x567152=_0x570e1f[_0x1b1a4a(0x123)](_0x2c5f1a['id']),_0x19fe25=Math[_0x1b1a4a(0x12b)](Math['ceil'](_0x5110d9*_0x567152),_0x570e1f['tp']);_0x5110d9-=_0x19fe25,_0x570e1f['gainTp'](-_0x19fe25);_0x19fe25>0x0&&(_0x570e1f['displayTpBarrierPopup'](_0x19fe25),_0x570e1f['onAntiDamageTpBarrier'](_0x2c5f1a));if(_0x5110d9<=0x0)break;}}return _0x5110d9;},Game_Action[_0x2e38d7(0x11d)][_0x2e38d7(0x155)]=function(_0x357484,_0x266009){const _0x360ec4=_0x2e38d7,_0x62245a=VisuMZ[_0x360ec4(0xb4)][_0x360ec4(0xe7)][_0x266009];if(!_0x62245a)return![];const _0x5df56b=_0x357484[_0x360ec4(0x141)][_0x360ec4(0xea)](_0x62245a);if(_0x5df56b)for(const _0x31623f of _0x5df56b){if(_0x360ec4(0xe3)===_0x360ec4(0xe3)){_0x31623f[_0x360ec4(0xea)](_0x62245a);const _0x2fd278=String(RegExp['$1']);if(this[_0x360ec4(0x151)](_0x2fd278))return!![];}else _0x523550['push'](_0x1fd924['id']);}return![];},Game_Action[_0x2e38d7(0x11d)][_0x2e38d7(0x151)]=function(_0x3a8e0a){const _0x2bac01=_0x2e38d7;_0x3a8e0a=_0x3a8e0a['toUpperCase']()[_0x2bac01(0xc0)]();if([_0x2bac01(0x131),_0x2bac01(0xde),_0x2bac01(0x163)][_0x2bac01(0xb5)](_0x3a8e0a)){if(_0x2bac01(0x120)==='Ovdhd')_0x525cd2[_0x2bac01(0xb4)][_0x2bac01(0xcb)]['call'](this),this['initAntiDamageBarriers']();else return!![];}else{if(_0x3a8e0a[_0x2bac01(0xea)](/ELEMENT/i))return this[_0x2bac01(0x122)](_0x3a8e0a);else{if(_0x3a8e0a[_0x2bac01(0xea)](/CERTAIN/i))return this[_0x2bac01(0xa6)]();else{if(_0x3a8e0a[_0x2bac01(0xea)](/PHYSICAL/i)){if(_0x2bac01(0x143)!=='HgJam')return this['isPhysical']();else{if(!_0x5694fc[_0x2bac01(0x148)]())return;const _0x1710b4=_0x51cf15[_0x2bac01(0xb4)]['Settings'][_0x3b97de];if(!_0x1710b4)return;const _0x21f216=_0x196da2?'Intact':_0x2bac01(0x92);if(_0x1710b4[_0x2bac01(0x95)[_0x2bac01(0x15d)](_0x21f216)]>0x0){const _0x52bbd8=[this],_0xb62895=_0x1710b4[_0x2bac01(0x95)['format'](_0x21f216)];let _0x3962c2=_0x1710b4[_0x2bac01(0xa0)[_0x2bac01(0x15d)](_0x21f216)];_0x1710b4[_0x2bac01(0x10c)[_0x2bac01(0x15d)](_0x21f216)]&&(_0x3962c2=!_0x3962c2);const _0x3f11b5=_0x1710b4[_0x2bac01(0xed)[_0x2bac01(0x15d)](_0x21f216)];_0x363268['requestFauxAnimation'](_0x52bbd8,_0xb62895,_0x3962c2,_0x3f11b5);}}}else{if(_0x3a8e0a[_0x2bac01(0xea)](/MAGICAL/i)){if(_0x2bac01(0xf3)===_0x2bac01(0x126)){const _0x1c85ca=_0x56f783['id'];this['tp']<=0x0&&this[_0x2bac01(0xd8)](_0x1c85ca),this[_0x2bac01(0xeb)]('TP',this['tp']>0x0);}else return this['isMagical']();}}}}}},Game_Action[_0x2e38d7(0x11d)]['matchesAntiDamageBarrierElementType']=function(_0x40a494){const _0x5934f6=_0x2e38d7,_0x59b926=this[_0x5934f6(0x103)]();if(_0x40a494['match'](/ELEMENT[ ]*(\d+(?:\s*,\s*\d+)*)/i)){const _0x10d30f=JSON[_0x5934f6(0xdb)]('['+RegExp['$1'][_0x5934f6(0xea)](/\d+/g)+']');return _0x59b926['some'](_0x354908=>_0x10d30f['includes'](_0x354908));}else{if(_0x40a494[_0x5934f6(0xea)](/ELEMENT[ ](.*)/i)){if(_0x5934f6(0x9d)===_0x5934f6(0x15b)){_0x3a1ee4[_0x5934f6(0xea)](_0x54c007);const _0x4f8bc4=_0x5378c4(_0x1a50a1['$1']);if(this['matchesAntiDamageBarrierType'](_0x4f8bc4))return!![];}else{const _0x3efa1e=String(RegExp['$1'])[_0x5934f6(0xd1)](','),_0x213cdb=_0x3efa1e[_0x5934f6(0x12a)](_0xd29f09=>DataManager['getElementIdWithName'](_0xd29f09));return _0x59b926[_0x5934f6(0xa7)](_0x66baee=>_0x213cdb[_0x5934f6(0xb5)](_0x66baee));}}}return![];},VisuMZ[_0x2e38d7(0xb4)]['Game_BattlerBase_initMembers']=Game_BattlerBase['prototype'][_0x2e38d7(0x94)],Game_BattlerBase[_0x2e38d7(0x11d)][_0x2e38d7(0x94)]=function(){const _0x11be5a=_0x2e38d7;VisuMZ['AntiDmgBarriers'][_0x11be5a(0xcb)][_0x11be5a(0x146)](this),this[_0x11be5a(0xe2)]();},Game_BattlerBase[_0x2e38d7(0x11d)][_0x2e38d7(0xe2)]=function(){const _0x67d7f2=_0x2e38d7;this[_0x67d7f2(0x13e)]={},this['_antiDamageBarrierCancelUnder']={},this[_0x67d7f2(0xe6)]={},this[_0x67d7f2(0x12f)]={},this[_0x67d7f2(0xb8)]={};},Game_BattlerBase[_0x2e38d7(0x11d)][_0x2e38d7(0x137)]=function(_0x518617){const _0x4fefb3=_0x2e38d7;if(!this[_0x4fefb3(0x109)](_0x518617))return 0x0;return this['_antiDamageBarrierCancelOver']===undefined&&('hfPJy'===_0x4fefb3(0xf5)?(_0x2b2ab8[_0x4fefb3(0xb4)]['Game_Battler_regenerateAll'][_0x4fefb3(0x146)](this),this[_0x4fefb3(0x13b)]()&&this[_0x4fefb3(0xc5)]()):this[_0x4fefb3(0xe2)]()),this[_0x4fefb3(0x13e)][_0x518617]||0x0;},Game_BattlerBase[_0x2e38d7(0x11d)][_0x2e38d7(0xa5)]=function(_0x3adaa7,_0x562bec){const _0x5a6081=_0x2e38d7;this[_0x5a6081(0x13e)]===undefined&&this[_0x5a6081(0xe2)](),this[_0x5a6081(0x13e)][_0x3adaa7]=_0x562bec;},Game_BattlerBase['prototype'][_0x2e38d7(0x102)]=function(_0x4ec155){const _0x162018=_0x2e38d7;if(!this[_0x162018(0x109)](_0x4ec155))return 0x0;return this[_0x162018(0xfd)]===undefined&&this[_0x162018(0xe2)](),this[_0x162018(0xfd)][_0x4ec155]||0x0;},Game_BattlerBase[_0x2e38d7(0x11d)][_0x2e38d7(0x96)]=function(_0x470cc7,_0x2a0b73){const _0x1c6db4=_0x2e38d7;this[_0x1c6db4(0xfd)]===undefined&&(_0x1c6db4(0xbd)===_0x1c6db4(0xbd)?this['initAntiDamageBarriers']():(this[_0x1c6db4(0x13e)]===_0xea70d3&&this[_0x1c6db4(0xe2)](),this[_0x1c6db4(0x13e)][_0x16d8c0]=_0x32a250)),this[_0x1c6db4(0xfd)][_0x470cc7]=_0x2a0b73;},Game_BattlerBase[_0x2e38d7(0x11d)][_0x2e38d7(0x105)]=function(_0x49bee0){const _0x1ca74b=_0x2e38d7;if(!this[_0x1ca74b(0x109)](_0x49bee0))return 0x0;return this[_0x1ca74b(0xe6)]===undefined&&this[_0x1ca74b(0xe2)](),this[_0x1ca74b(0xe6)][_0x49bee0]||0x0;},Game_BattlerBase[_0x2e38d7(0x11d)][_0x2e38d7(0x9c)]=function(_0x269555,_0x33eb84){const _0xe12bf6=_0x2e38d7;this[_0xe12bf6(0xe6)]===undefined&&this[_0xe12bf6(0xe2)](),this[_0xe12bf6(0xe6)][_0x269555]=_0x33eb84;},Game_BattlerBase['prototype'][_0x2e38d7(0x161)]=function(_0x64d8af){const _0x32febf=_0x2e38d7;if(!this['isStateAffected'](_0x64d8af))return 0x0;return this[_0x32febf(0x12f)]===undefined&&this['initAntiDamageBarriers'](),this[_0x32febf(0x12f)][_0x64d8af]||0x0;},Game_BattlerBase['prototype'][_0x2e38d7(0x128)]=function(_0x425a55,_0x4cb067){const _0x335e78=_0x2e38d7;this[_0x335e78(0x12f)]===undefined&&this[_0x335e78(0xe2)](),this[_0x335e78(0x12f)][_0x425a55]=_0x4cb067;},Game_BattlerBase[_0x2e38d7(0x11d)][_0x2e38d7(0x123)]=function(_0x5c586c){const _0x182358=_0x2e38d7;if(!this[_0x182358(0x109)](_0x5c586c))return 0x0;return this[_0x182358(0xb8)]===undefined&&this[_0x182358(0xe2)](),this[_0x182358(0xb8)][_0x5c586c]||0x0;},Game_BattlerBase[_0x2e38d7(0x11d)]['setAntiDamageBarrierTp']=function(_0x2e4f6b,_0xf6b96e){const _0x449bc3=_0x2e38d7;this[_0x449bc3(0xb8)]===undefined&&this[_0x449bc3(0xe2)](),this[_0x449bc3(0xb8)][_0x2e4f6b]=_0xf6b96e;},Game_BattlerBase[_0x2e38d7(0x11d)]['ignoreAllAntiDamageBarriers']=function(){const _0x17cac8=_0x2e38d7,_0x1774f6=this[_0x17cac8(0xe4)]()[_0x17cac8(0xc2)](this[_0x17cac8(0xfc)]()),_0x29a293=VisuMZ[_0x17cac8(0xb4)]['RegExp'][_0x17cac8(0x159)];return _0x1774f6[_0x17cac8(0xa7)](_0x29df9b=>_0x29df9b&&_0x29df9b['note']&&_0x29df9b[_0x17cac8(0x141)][_0x17cac8(0xea)](_0x29a293));},Game_BattlerBase[_0x2e38d7(0x11d)][_0x2e38d7(0xe1)]=function(){const _0x57b602=_0x2e38d7,_0x3e9109=Number[_0x57b602(0x98)],_0x53f1db=this[_0x57b602(0xd9)]()[_0x57b602(0x125)]((_0x50cd44,_0x592918)=>{const _0x3b61ad=_0x57b602;if(_0x3b61ad(0x11c)===_0x3b61ad(0x11c)){const _0x4f131c=_0x50cd44[_0x3b61ad(0x15c)]===0x0?_0x3e9109:this[_0x3b61ad(0xd0)](_0x50cd44['id']),_0x3a321a=_0x592918['autoRemovalTiming']===0x0?_0x3e9109:this[_0x3b61ad(0xd0)](_0x592918['id']);if(_0x4f131c!==_0x3a321a){if(_0x3b61ad(0x134)!==_0x3b61ad(0xd6))return _0x4f131c-_0x3a321a;else{if(!_0x54ca37[_0x3b61ad(0x148)]())return![];const _0x3915bd=_0x4a8e26[_0x3b61ad(0xb4)][_0x3b61ad(0x9f)]['TP'];if(!_0x3915bd)return;if(_0x3915bd['PopupText']==='')return;const _0x35d4f8=_0x3915bd['PopupText'][_0x3b61ad(0x15d)](_0x103c70,_0x378696['tp']),_0xbf4ef={'textColor':_0x3915bd[_0x3b61ad(0xc4)],'flashColor':_0x3915bd[_0x3b61ad(0xee)],'flashDuration':_0x3915bd[_0x3b61ad(0x97)]};this['setupTextPopup'](_0x35d4f8,_0xbf4ef);}}const _0x3c031d=_0x50cd44[_0x3b61ad(0x14f)],_0x20abfb=_0x592918[_0x3b61ad(0x14f)];if(_0x3c031d!==_0x20abfb)return _0x20abfb-_0x3c031d;return _0x50cd44['id']-_0x592918['id'];}else this['_antiDamageBarrierCancelOver']={},this[_0x3b61ad(0xfd)]={},this[_0x3b61ad(0xe6)]={},this[_0x3b61ad(0x12f)]={},this[_0x3b61ad(0xb8)]={};});return _0x53f1db;},VisuMZ[_0x2e38d7(0xb4)][_0x2e38d7(0xb7)]=function(_0xe717ce){const _0x503a33=_0x2e38d7;window['user']=BattleManager[_0x503a33(0xf8)]||_0xe717ce,window[_0x503a33(0x124)]=_0xe717ce,window['a']=window['user'],window['b']=window[_0x503a33(0x124)];},VisuMZ[_0x2e38d7(0xb4)][_0x2e38d7(0xf0)]=function(){const _0x41e375=_0x2e38d7;window[_0x41e375(0xfa)]=undefined,window[_0x41e375(0x124)]=undefined,window['a']=undefined,window['b']=undefined;},VisuMZ[_0x2e38d7(0xb4)][_0x2e38d7(0xe9)]=function(_0x1ad86f){const _0x22a23b=_0x2e38d7;_0x1ad86f=_0x1ad86f[_0x22a23b(0xec)](/\b(\d+)([%％])/gi,(_0x268791,_0x55fd16)=>(Number(_0x55fd16)||0x0)*0.01);try{return eval(_0x1ad86f);}catch(_0x25e22e){if($gameTemp['isPlaytest']())console[_0x22a23b(0xd5)](_0x25e22e);return 0x0;}},VisuMZ['AntiDmgBarriers'][_0x2e38d7(0x147)]=Game_Battler[_0x2e38d7(0x11d)]['addState'],Game_Battler['prototype'][_0x2e38d7(0xdd)]=function(_0x322ec0){const _0x34f1fc=_0x2e38d7;VisuMZ[_0x34f1fc(0xb4)][_0x34f1fc(0x147)][_0x34f1fc(0x146)](this,_0x322ec0),this['initAntiDamageBarrierDataForState'](_0x322ec0);},Game_Battler[_0x2e38d7(0x11d)][_0x2e38d7(0xc8)]=function(_0x43d7d9){const _0x51f7e1=_0x2e38d7;if(!this[_0x51f7e1(0x109)](_0x43d7d9))return;const _0x3fc9c0=$dataStates[_0x43d7d9];if(!_0x3fc9c0)return;const _0x414e73=VisuMZ['AntiDmgBarriers'][_0x51f7e1(0xe7)],_0x37f07d=_0x3fc9c0['note'];VisuMZ[_0x51f7e1(0xb4)][_0x51f7e1(0xb7)](this);if(_0x37f07d[_0x51f7e1(0xea)](_0x414e73['NullBarrier'])){const _0x45db99=VisuMZ[_0x51f7e1(0xb4)]['CalculateCharges'](RegExp['$2']);this[_0x51f7e1(0x10a)](_0x43d7d9,_0x45db99||0x1);}if(_0x37f07d['match'](_0x414e73['CancelOver'])){if(_0x51f7e1(0xe5)==='uSnzh'){if(this['isAntiDamageBarrierIgnored'](_0x2ebf5b))return _0x5a417e;if(_0x399384<=0x0)return _0x16a9e2;return _0x49b17b=this['applyReductionBarrier'](_0x261caf,_0x1bb1c1),_0x31d97a=this[_0x51f7e1(0x166)](_0x271773,_0x4843b8),_0x2ea380=this[_0x51f7e1(0xce)](_0x50ab20,_0x5135da),_0x9a5201=this['applyTpBarrier'](_0x12a6b9,_0x5d8cdb),_0x492f23;}else{const _0x2d0e01=VisuMZ['AntiDmgBarriers']['CalculateCharges'](RegExp['$2']);this['setAntiDamageBarrierCancelOver'](_0x43d7d9,_0x2d0e01||0x0);}}if(_0x37f07d[_0x51f7e1(0xea)](_0x414e73[_0x51f7e1(0xbc)])){if(_0x51f7e1(0xe0)!=='fbbVh'){const _0x15da06=VisuMZ[_0x51f7e1(0xb4)][_0x51f7e1(0xe9)](RegExp['$2']);this[_0x51f7e1(0x96)](_0x43d7d9,_0x15da06||0x0);}else this[_0x51f7e1(0xd8)](_0x463c59);}if(_0x37f07d['match'](_0x414e73[_0x51f7e1(0x115)])){if(_0x51f7e1(0x116)===_0x51f7e1(0xb1))this[_0x51f7e1(0xc5)]();else{const _0x1467c9=VisuMZ[_0x51f7e1(0xb4)][_0x51f7e1(0xe9)](RegExp['$2']);this[_0x51f7e1(0x9c)](_0x43d7d9,_0x1467c9||0x0);}}if(_0x37f07d[_0x51f7e1(0xea)](_0x414e73[_0x51f7e1(0xc6)])){const _0x31d30f=VisuMZ[_0x51f7e1(0xb4)][_0x51f7e1(0xe9)](RegExp['$2']);this['setStateDisplay'](_0x43d7d9,_0x31d30f||0x0);}if(_0x37f07d[_0x51f7e1(0xea)](_0x414e73[_0x51f7e1(0xc1)])){const _0x29d683=VisuMZ[_0x51f7e1(0xb4)]['CalculateCharges'](RegExp['$2']);this[_0x51f7e1(0x128)](_0x43d7d9,_0x29d683||0x0);}if(_0x37f07d['match'](_0x414e73['TpBarrier'])){if(_0x51f7e1(0xfe)===_0x51f7e1(0xfe)){const _0x29ef1a=VisuMZ[_0x51f7e1(0xb4)]['CalculateCharges'](RegExp['$2']);this['setAntiDamageBarrierTp'](_0x43d7d9,_0x29ef1a||0x0);}else _0x332014['onAntiDamageMpBarrier'](_0x378f5f);}VisuMZ[_0x51f7e1(0xb4)]['clearJsTargets']();},Game_Battler[_0x2e38d7(0x11d)][_0x2e38d7(0xeb)]=function(_0x2859f3,_0x53426b){const _0x3f18c8=_0x2e38d7;if(!SceneManager['isSceneBattle']())return;const _0x2c0800=VisuMZ['AntiDmgBarriers'][_0x3f18c8(0x9f)][_0x2859f3];if(!_0x2c0800)return;const _0x57a936=_0x53426b?_0x3f18c8(0xb2):'Break';if(_0x2c0800['%1AnimationID'['format'](_0x57a936)]>0x0){const _0xfed818=[this],_0x188a03=_0x2c0800[_0x3f18c8(0x95)[_0x3f18c8(0x15d)](_0x57a936)];let _0x13abdb=_0x2c0800['%1Mirror'[_0x3f18c8(0x15d)](_0x57a936)];if(_0x2c0800[_0x3f18c8(0x10c)[_0x3f18c8(0x15d)](_0x57a936)]){if(_0x3f18c8(0x11e)===_0x3f18c8(0x10b)){if(!this[_0x3f18c8(0x109)](_0x1bbce))return 0x0;return this[_0x3f18c8(0xfd)]===_0x1ca8f7&&this[_0x3f18c8(0xe2)](),this[_0x3f18c8(0xfd)][_0x5e1693]||0x0;}else _0x13abdb=!_0x13abdb;}const _0x1dc8bb=_0x2c0800[_0x3f18c8(0xed)[_0x3f18c8(0x15d)](_0x57a936)];$gameTemp[_0x3f18c8(0x117)](_0xfed818,_0x188a03,_0x13abdb,_0x1dc8bb);}},Game_Battler[_0x2e38d7(0x11d)][_0x2e38d7(0x14b)]=function(_0x441c22){const _0x191d6b=_0x2e38d7;if(!_0x441c22)return;const _0x69d385=_0x441c22['id'],_0x43c5ea=VisuMZ[_0x191d6b(0xb4)][_0x191d6b(0xe7)],_0x57d79d=_0x441c22[_0x191d6b(0x141)];this[_0x191d6b(0xd8)](_0x69d385);if(_0x57d79d[_0x191d6b(0xea)](_0x43c5ea[_0x191d6b(0xfb)]))this[_0x191d6b(0xeb)](_0x191d6b(0xa9),![]);else{if(_0x57d79d['match'](_0x43c5ea[_0x191d6b(0xd3)]))this[_0x191d6b(0xeb)](_0x191d6b(0x139),![]);else{if(_0x57d79d['match'](_0x43c5ea[_0x191d6b(0xbc)]))this['onAntiDamageBarrierEffect'](_0x191d6b(0x139),![]);else{if(_0x57d79d[_0x191d6b(0xea)](_0x43c5ea[_0x191d6b(0x115)]))this[_0x191d6b(0xeb)](_0x191d6b(0xf4),![]);else{if(_0x57d79d[_0x191d6b(0xea)](_0x43c5ea['AbsorbBarrier']))_0x191d6b(0x164)!==_0x191d6b(0x136)?this['onAntiDamageBarrierEffect'](_0x191d6b(0x144),![]):_0x1b5f53=this[_0x191d6b(0x13d)](_0x1bc7d7,_0x169a2a);else{if(_0x57d79d[_0x191d6b(0xea)](_0x43c5ea['MpBarrier']))this[_0x191d6b(0xeb)]('MP',![]);else _0x57d79d[_0x191d6b(0xea)](_0x43c5ea[_0x191d6b(0xba)])&&this['onAntiDamageBarrierEffect']('TP',![]);}}}}}},Game_Battler[_0x2e38d7(0x11d)][_0x2e38d7(0xc3)]=function(_0x1eb5dc){const _0x4d54ce=_0x2e38d7,_0xeb0228=_0x1eb5dc['id'];let _0x505157=(Number(this['getStateDisplay'](_0xeb0228))||0x0)-0x1;this[_0x4d54ce(0x10a)](_0xeb0228,_0x505157),_0x505157<=0x0&&this[_0x4d54ce(0xd8)](_0xeb0228),this[_0x4d54ce(0xeb)](_0x4d54ce(0xa9),_0x505157>0x0);},Game_Battler[_0x2e38d7(0x11d)]['onAntiDamageCancelBarrier']=function(_0x6a3272){const _0x5210fe=_0x2e38d7;this[_0x5210fe(0xeb)](_0x5210fe(0x139),!![]);},Game_Battler['prototype'][_0x2e38d7(0xa4)]=function(){const _0x290b94=_0x2e38d7;this[_0x290b94(0xeb)](_0x290b94(0xf4),!![]);},Game_Battler[_0x2e38d7(0x11d)]['displayAbsorptionBarrierPopup']=function(_0x1863a5,_0x4375fa){const _0x4014b2=_0x2e38d7;if(!SceneManager[_0x4014b2(0x148)]())return![];const _0x3ec3a7=VisuMZ[_0x4014b2(0xb4)][_0x4014b2(0x9f)][_0x4014b2(0x144)];if(!_0x3ec3a7)return;if(_0x3ec3a7[_0x4014b2(0x167)]==='')return;const _0x329609=_0x3ec3a7[_0x4014b2(0x167)][_0x4014b2(0x15d)](_0x1863a5),_0x33eb20={'textColor':_0x3ec3a7['TextColor'],'flashColor':_0x3ec3a7[_0x4014b2(0xee)],'flashDuration':_0x3ec3a7['FlashDuration']};this['setupTextPopup'](_0x329609,_0x33eb20);},Game_Battler['prototype'][_0x2e38d7(0xf1)]=function(_0x2ec21b){const _0x1ec239=_0x2e38d7,_0x1fba70=_0x2ec21b['id'];let _0x108022=Number(this[_0x1ec239(0x153)](_0x1fba70))||0x0;if(_0x108022<=0x0){if(_0x1ec239(0x129)===_0x1ec239(0x142)){const _0x464145=_0x567a04[_0x1ec239(0xb4)][_0x1ec239(0xe9)](_0x2b5a92['$2']);this['setStateDisplay'](_0x28acde,_0x464145||0x1);}else this[_0x1ec239(0xd8)](_0x1fba70);}this['onAntiDamageBarrierEffect'](_0x1ec239(0x144),_0x108022>0x0);},Game_Battler[_0x2e38d7(0x11d)]['onAntiDamageMpBarrier']=function(_0x4dc3f0){const _0x1be72b=_0x2e38d7,_0x209887=_0x4dc3f0['id'];if(this['mp']<=0x0){if(_0x1be72b(0xf9)!==_0x1be72b(0xf7))this[_0x1be72b(0xd8)](_0x209887);else{if(!_0x1c2972)return![];const _0x3faf57=_0x24061b[_0x1be72b(0xb4)][_0x1be72b(0xe7)],_0x38e44d=_0x31da33[_0x1be72b(0x141)]||'';for(const _0x784f2b in _0x3faf57){if(_0x38e44d[_0x1be72b(0xea)](_0x3faf57[_0x784f2b]))return!![];}return![];}}this[_0x1be72b(0xeb)]('MP',this['mp']>0x0);},Game_Battler[_0x2e38d7(0x11d)][_0x2e38d7(0x154)]=function(_0x5d8ff9){const _0x16f07a=_0x2e38d7;if(!SceneManager[_0x16f07a(0x148)]())return![];const _0x43031e=VisuMZ[_0x16f07a(0xb4)]['Settings']['TP'];if(!_0x43031e)return;if(_0x43031e[_0x16f07a(0x167)]==='')return;const _0x53700b=_0x43031e[_0x16f07a(0x167)]['format'](_0x5d8ff9,TextManager['tp']),_0x5b98e4={'textColor':_0x43031e[_0x16f07a(0xc4)],'flashColor':_0x43031e[_0x16f07a(0xee)],'flashDuration':_0x43031e['FlashDuration']};this['setupTextPopup'](_0x53700b,_0x5b98e4);},Game_Battler[_0x2e38d7(0x11d)]['onAntiDamageTpBarrier']=function(_0x5d20ed){const _0x26254f=_0x2e38d7,_0x4b8d2e=_0x5d20ed['id'];this['tp']<=0x0&&this[_0x26254f(0xd8)](_0x4b8d2e),this[_0x26254f(0xeb)]('TP',this['tp']>0x0);},Game_Battler[_0x2e38d7(0x11d)][_0x2e38d7(0x152)]=function(_0x74093c){const _0x5d77a6=_0x2e38d7;if(!_0x74093c)return;if(!_0x74093c[_0x5d77a6(0x160)]())return;let _0x7948aa=[];for(const _0x43641f of this[_0x5d77a6(0xd9)]()){if('fawaT'===_0x5d77a6(0xcd))this['onAntiDamageBarrierEffect']('Cancel',![]);else{if(!_0x43641f)continue;if(!this[_0x5d77a6(0x109)](_0x43641f['id']))continue;VisuMZ['AntiDmgBarriers'][_0x5d77a6(0x108)](_0x43641f,_0x74093c)&&_0x7948aa['push'](_0x43641f['id']);}}for(const _0x5d8273 of _0x7948aa){const _0x22189c=$dataStates[_0x5d8273];if(!_0x22189c)continue;this[_0x5d77a6(0x14b)](_0x22189c);}},VisuMZ['AntiDmgBarriers'][_0x2e38d7(0x108)]=function(_0x1d15f4,_0x49bd05){const _0x436b2b=_0x2e38d7,_0x48998e=VisuMZ['AntiDmgBarriers']['RegExp'][_0x436b2b(0x12c)],_0x327e7b=_0x1d15f4[_0x436b2b(0x141)]['match'](_0x48998e);if(_0x327e7b)for(const _0x4d7cb6 of _0x327e7b){if(!_0x4d7cb6)continue;_0x4d7cb6[_0x436b2b(0xea)](_0x48998e);const _0x1f10d3=String(RegExp['$1']);if(_0x49bd05[_0x436b2b(0x151)](_0x1f10d3))return!![];}return![];},VisuMZ['AntiDmgBarriers'][_0x2e38d7(0xaa)]=Game_Battler[_0x2e38d7(0x11d)]['regenerateAll'],Game_Battler['prototype'][_0x2e38d7(0x145)]=function(){const _0x1b1c7e=_0x2e38d7;VisuMZ[_0x1b1c7e(0xb4)][_0x1b1c7e(0xaa)][_0x1b1c7e(0x146)](this),this[_0x1b1c7e(0x13b)]()&&this[_0x1b1c7e(0xc5)]();},Game_Battler[_0x2e38d7(0x11d)][_0x2e38d7(0xc5)]=function(){const _0x80e9df=_0x2e38d7;VisuMZ['AntiDmgBarriers'][_0x80e9df(0xb7)](this);const _0x26d9f4=VisuMZ[_0x80e9df(0xb4)][_0x80e9df(0xe7)];for(const _0x2e9ea8 of this['states']()){if(_0x80e9df(0x12e)==='fUzLD'){if(!this['isStateAffected'](_0x532b5e))return 0x0;return this[_0x80e9df(0x13e)]===_0x15ff6b&&this[_0x80e9df(0xe2)](),this[_0x80e9df(0x13e)][_0x10d9f2]||0x0;}else{if(!_0x2e9ea8)continue;const _0x120edf=_0x2e9ea8[_0x80e9df(0x141)];(_0x120edf['match'](_0x26d9f4[_0x80e9df(0xfb)])||_0x120edf[_0x80e9df(0xea)](_0x26d9f4['AbsorbBarrier']))&&this['regenerateAntiDamageBarrierState'](_0x2e9ea8);}}VisuMZ[_0x80e9df(0xb4)][_0x80e9df(0xf0)]();},Game_Battler[_0x2e38d7(0x11d)][_0x2e38d7(0x12d)]=function(_0x5bd806){const _0x4a6271=_0x2e38d7,_0x227f87=VisuMZ[_0x4a6271(0xb4)][_0x4a6271(0xe7)],_0x1c6c8a=_0x5bd806[_0x4a6271(0x141)];let _0x2ec1f1=0x0;_0x1c6c8a['match'](_0x227f87[_0x4a6271(0xa1)])&&('eXMva'===_0x4a6271(0x14d)?this[_0x4a6271(0xe2)]():_0x2ec1f1-=VisuMZ[_0x4a6271(0xb4)][_0x4a6271(0xe9)](RegExp['$1']));_0x1c6c8a['match'](_0x227f87['BarrierRegen'])&&(_0x2ec1f1+=VisuMZ[_0x4a6271(0xb4)]['CalculateCharges'](RegExp['$1']));let _0x477b71=Number(this['getStateDisplay'](_0x5bd806['id']));_0x477b71+=_0x2ec1f1,_0x477b71>0x0?_0x4a6271(0xae)===_0x4a6271(0xae)?this[_0x4a6271(0x10a)](_0x5bd806['id'],_0x477b71):(this[_0x4a6271(0xfd)]===_0x32ac90&&this[_0x4a6271(0xe2)](),this[_0x4a6271(0xfd)][_0x24d34b]=_0x330baa):this[_0x4a6271(0x14b)](_0x5bd806);};
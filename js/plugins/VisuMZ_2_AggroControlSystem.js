//=============================================================================
// VisuStella MZ - Aggro Control System
// VisuMZ_2_AggroControlSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_AggroControlSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AggroControlSystem = VisuMZ.AggroControlSystem || {};
VisuMZ.AggroControlSystem.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.08] [AggroControlSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Aggro_Control_System_VisuStella_MZ
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A common mechanic found in many RPG's nowadays is the ability to steer the
 * way enemies target party members. This can be in the form of provocations, 
 * taunts, and aggro.
 *
 * Provocations come in the form of states, where when a unit applies a provoke
 * state on a target, the target must attack the provoker when using single
 * target skills. This plugin provides support for multiple provocations and
 * such provocations will be given focus based on the state's priority value.
 *
 * Taunts are a third way to steer an opponent to focus on a party member. The
 * taunt effects can be split up into global, physical, magical, or certain hit
 * only taunts and these can be applied to almost any trait object.
 *
 * Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Three different ways to influencing which targets enemies should attack:
 *   Provoke, taunt, and aggro.
 * * Provoke and taunt effects work both ways for actors and enemies.
 * * Aggro effects accumulate through battle and can be manipulated through
 *   notetag values, Plugin Commands, and/or Plugin Parameters.
 * * Provoked battlers can have provoke lines displayed to indicate which
 *   unit has provoked them.
 * * Taunting units can have animations played on them repeatedly to quickly
 *   relay information to the player about their taunt properties.
 * * Gauges that can be displayed over the heads of actor sprites to display
 *   how much aggro that actor holds in comparison to the other actors.
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
 * VisuMZ_0_CoreEngine
 * VisuMZ_1_BattleCore
 *
 * - Provoke Priority Lines and Taunt animations become available if these
 *   plugins are installed.
 *
 * ---
 *
 * ============================================================================
 * How Aggro, Provoke, and Taunts Work
 * ============================================================================
 *
 * This section will explain how aggro, provoke, and taunts work.
 *
 * ---
 *
 * Provoke
 *
 * - Provocations come in the form of states, where when a unit applies a
 * provoke state on a target, the target must attack the provoker when using
 * single target skills. This plugin provides support for multiple provocations
 * and such provocations will be given focus based on the state's database
 * priority value.
 *
 * - The provoke will last only as long as the duration of the state itself. If
 * the state's duration is refreshed by reapplying the Provoke state, then the
 * provoker of that state will then switch over to the one applying the newly
 * added state.
 *
 * - When an actor selects a target for an action and the actor is provoked by
 * an enemy on the other team, the player's choice selection becomes limited to
 * only the provoker.
 *
 * - Provoke can be bypassed through the <Bypass Provoke> notetag.
 *
 * ---
 *
 * Taunts
 *
 * - Taunts are a third way to steer an opponent to focus on a party member.
 * The taunt effects can be split up into global, physical, magical, or certain
 * hit only taunts and these can be applied to almost any trait object.
 *
 * - When an actor selects a target and the enemy team has a taunting unit,
 * the player's choice selection becomes limited to only the targets with the
 * associated taunt type.
 *
 * - Taunts can be bypassed through the <Bypass Taunt> notetag.
 *
 * ---
 *
 * Aggro
 *
 * - Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * - Skills and items can raise its user's aggro value through notetags and/or
 * how much damage they've dealt or healed. Skills and items can also change a
 * target's aggro value through notetags, too.
 *
 * - Through the Plugin Parameters, you can set Aggro to automatically raised
 * based on how much damage or healing dealt by a user.
 *
 * - Some enemies can be bypass forced aggro target through the <Bypass Aggro>
 * notetag while other enemies can be forced to target the highest aggro target
 * through the <Target Highest Aggro> notetag;
 *
 * ---
 *
 * Priorities
 *
 * - Priority will be given in the order of provokes, taunts, and then aggro.
 * This means if an enemy is provoked, the opposing side has a taunt, and there
 * is a member with high aggro, then the enemy will always attack the provoker
 * first before targeting a taunting unit before targeting the unit with high
 * aggro values.
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
 * === Provoke-Related Notetags ===
 *
 * The following notetags enable you to utilize the Provoke effects added by
 * this plugin. Provoked targets can only attack the provoking unit for single
 * target actions.
 *
 * ---
 *
 * <Provoke>
 *
 * - Used for: State Notetags
 * - Causes the state affected unit to be able to only attack the caster of the
 *   provoke state for single target actions.
 * - If multiple provoke states are applied, then the provoker is the one who
 *   applied the highest priority provoke state.
 *
 * ---
 *
 * <Bypass Provoke>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Makes the affected unit to ignore any and all provoke effects applied by
 *   any provoke states, allowing them to target foes as if they are unaffected
 *   by provoke states altogether.
 *
 * ---
 * 
 * <Bypass Provoke>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass provoke effects applied by any provoke states,
 *   allowing this action to target foes as if the user is unaffected by any
 *   provoke effects altogether.
 * 
 * ---
 * 
 * <Provoke Height Origin: x%>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Sets the provoke height origin point to x% of the sprite's height.
 * - This is the landing point for the provoke trails.
 * - Replace 'x' with a number presenting what rate of the sprite's height to
 *   set as the provoke height origin point.
 * 
 * ---
 *
 * === Taunt-Related Notetags ===
 *
 * ---
 *
 * <Taunt>
 * <All Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Physical Taunt>
 * <Magical Taunt>
 * <Certain Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions
 *   respectively.
 * - Add/remove any combination of the above to cause the affected unit to
 *   become the target of those types of actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Bypass Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The affected unit will ignore any and all taunt effects created by the
 *   opposing team, allowing them to use single target actions as if no
 *   taunters exist on the opposing team.
 *
 * ---
 * 
 * <Bypass Taunt>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass taunt effects created by the opposing team,
 *   allowing the user to use single target actions as if no taunters exist on
 *   the opposing team.
 * 
 * ---
 *
 * === Aggro-Related Notetags ===
 *
 * ---
 *
 * <User Aggro: +x>
 * <User Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the user's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <Target Aggro: +x>
 * <Target Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the target's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
 *
 * ---
 *
 * <Aggro: +x>
 * <Aggro: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to passively have increased/decreased aggro
 *   values independent of the amount of aggro it earns in battle.
 * - Replace 'x' with the amount of aggro this object increases/decreases by.
 *
 * ---
 *
 * <Aggro Multiplier: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to increase the amount of perceived aggro it has
 *   by the aggro multiplier.
 * - Replace 'x' with a number representing the percentage to increase/decrease
 *   the perceived aggro by.
 * - If multiple of these traits exist across different trait objects, the
 *   effects are increased multiplicatively.
 *
 * ---
 *
 * <Bypass Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will decide targets by aggro weight
 *   instead of always picking the highest aggro unit(s).
 * - If used on trait objects, the affected unit will decide targets by aggro
 *   weight instead of always picking the highest aggro unit(s).
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 * 
 * <Bypass Highest Aggro>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass highest aggro effects and instead focuses on
 *   targets by aggro weight instead.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 * 
 * ---
 *
 * <Target Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will always decide its targets by
 *   the highest aggro value.
 * - If used on trait objects, the affected unit will always decide on targets
 *   by the highest aggro value.
 * - If the <Bypass Highest Aggro> notetag exists, this effect is ignored.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 *
 * === JavaScript Notetags: Aggro-Related ===
 *
 * ---
 *
 * <JS User Aggro>
 *  code
 *  code
 *  value = code
 * </JS User Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change the user's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <JS Target Aggro>
 *  code
 *  code
 *  value = code
 * </JS Target Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change target's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
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
 * Actor: Change Aggro
 * - Changes target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Actor: Set Aggro
 * - Set target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Aggro
 * - Changes target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Enemy: Set Aggro
 * - Set target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Provoke Settings
 * ============================================================================
 *
 * The Provoke Settings Plugin Parameters adjust the visual aspects related to
 * the provoke effect. These settings will require VisuMZ_1_BattleCore to be
 * installed in order for them to work due to dependencies. 
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 *   Show Priority Lines?:
 *   - Show priority target lines for this plugin?
 *   - Requires VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Line Settings
 * 
 *   Arc Height:
 *   - How tall should the line arc in pixels?
 * 
 *   Blend Mode:
 *   - The blend mode used for the sprite.
 * 
 *   Height Origin:
 *   - The rate from the battler's sprite base to determine where the line
 *     starts from.
 * 
 *   Line Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Opacity:
 *   - The highest possible opacity for active provoke lines.
 * 
 *   Opacity Speed:
 *   - The speed at which opacity fluctuates for the line sprite.
 * 
 *   Parts:
 *   - The number of joint parts to split up the sprite as.
 * 
 *   Parts Size:
 *   - The number in pixels for the diameter of each part.
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Provoke Origin' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Taunt Settings
 * ============================================================================
 *
 * Battlers with specific taunt types can have animations playing on them over
 * and over to relay information to the player. These settings require you to
 * have both VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore installed in your
 * project's plugin list in order to use.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine & VisuMZ_1_BattleCore
 * 
 *   Show Animations?:
 *   - Show animations for each of the taunt effects?
 *   - Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Animation ID's
 * 
 *   Physical Taunt:
 *   - The animation ID used for physical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Magical Taunt:
 *   - The animation ID used for magical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Certain Hit Taunt:
 *   - The animation ID used for certain hit taunts.
 *   - Use 0 or 'None' to bypass this type.
 *
 * ---
 *
 * Animation Settings
 * 
 *   Cycle Time:
 *   - The amount of frames to wait before each animation cycle.
 *   - WARNING: Lower numbers can jeopardize game performance.
 * 
 *   Mirror Actor Ani?:
 *   - Mirror animations played on actors?
 * 
 *   Mute Animation SFX?:
 *   - Mute sounds played by animations?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Aggro Settings
 * ============================================================================
 *
 * This lets you adjust the settings for this plugin's Aggro mechanics. Most of
 * these settings focus on the visual gauge display of the Aggro gauge, but you
 * can also change up the settings for how aggro is utilized.
 *
 * ---
 *
 * General
 * 
 *   Priority: Highest TGR:
 *   - When enemies target actors for an single target attack, always target
 *     the highest members or make it weighted?
 *
 *   Aggro Per Damage:
 *   - The amount of aggro generated per point of HP damage dealt to an enemy.
 *
 *   Aggro Per Heal:
 *   - The amount of aggro generated per point of HP recovered to an ally.
 *
 * ---
 *
 * Gauge
 * 
 *   Visible Battler Gauge:
 *   - Display an aggro gauge over an SV actor's head to show current aggro
 *     level compared to other party members.
 * 
 *   Visible Status Gauge:
 *   - Display an aggro gauge in the Battle Status Window to show the current
 *     aggro level compared to others.
 * 
 *   Gauge Color 1:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Width:
 *   - Width in pixels you want the gauge to be.
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the Aggro Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the Aggro Gauge to be scaled?
 * 
 *   Battler Gauge
 * 
 *     Offset X:
 *     Offset Y:
 *     - How many pixels to offset the Aggro Gauge's X/Y by?
 * 
 *   Battle Status Gauge
 * 
 *     Offset X:
 *     Offset Y:
 *     - How many pixels to offset the Aggro Gauge's X/Y by?
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Aggro Gauge' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
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
 * Version 1.08: April 16, 2021
 * * Feature Update!
 * ** Highest and lowest TGR members are now cached on an action by action
 *    basis for reduce needed computations. Update made by Irina.
 * 
 * Version 1.07: April 9, 2021
 * * Bug Fixes!
 * ** Provoke effect now takes into consideration when Provoke is applied by
 *    a weapon effect that comes off a counter attack from an actor. Fix made
 *    by Olivia.
 * 
 * Version 1.06: March 12, 2021
 * * Bug Fixes!
 * ** Subsequent battles or changing scenes should no longer clear the custom
 *    rendered bitmap used for the provoke trail. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for the Skill and Item versions of the following
 *    notetags into the help file and wiki:
 * *** <Bypass Provoke>
 * *** <Bypass Taunt>
 * *** <Bypass Highest Aggro>
 * 
 * Version 1.05: March 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Aggro Settings > Battle Status Gauge
 * **** These settings allow you to offset the Aggro Gauge in the Battle Status
 *      Window from its original position.
 * 
 * Version 1.04: February 26, 2021
 * * Bug Fixes!
 * ** Fixed positioning of gauge for List Style battle layouts without faces.
 *    Fix made by Olivia.
 * 
 * Version 1.03: February 5, 2021
 * * Feature Update!
 * ** Aggro is now cleared at the end of each battle in addition to the start
 *    of each battle. Update made by Olivia.
 *
 * Version 1.02: November 1, 2020
 * * Compatibility Update!
 * ** Plugin is made more compatible with other plugins.
 * 
 * Version 1.01: October 4, 2020
 * * Bug Fixes!
 * ** Provoke lines should now be placed correctly if the UI area is smaller
 *    than the resolution area.
 * ** The Plugin Commands should no longer cause crashes. Fix made by Irina.
 *
 * Version 1.00: September 28, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeAggro
 * @text Actor: Change Aggro
 * @desc Changes target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSetAggro
 * @text Actor: Set Aggro
 * @desc Set target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeAggro
 * @text Enemy: Change Aggro
 * @desc Changes target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySetAggro
 * @text Enemy: Set Aggro
 * @desc Set target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
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
 * @param AggroControl
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Provoke:struct
 * @text Provoke Settings
 * @type struct<Provoke>
 * @desc Settings related to the Provoke mechanic.
 * These settings require VisuMZ_1_BattleCore.
 * @default {"VisuMZ_1_BattleCore":"","ShowLines:eval":"true","LineSettings":"","ArcHeight:num":"125","BlendMode:num":"1","HeightOrigin:num":"0.8","LineColor:str":"#ff0000","Opacity:num":"255","OpacitySpeed:num":"4","Parts:num":"256","PartsSize:num":"5","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Provoke Origin"}
 *
 * @param Taunt:struct
 * @text Taunt Settings
 * @type struct<Taunt>
 * @desc Settings related to the Taunt mechanic.
 * @default {"Dependency":"VisuMZ_1_BattleCore","ShowAnimation:eval":"true","AnimationID":"","AniPhysical:num":"1","AniMagical:num":"2","AniCertain:num":"3","AnimationSettings":"","CycleTime:num":"60","MirrorActorAni:eval":"true","MuteAnimations:eval":"true"}
 *
 * @param Aggro:struct
 * @text Aggro Settings
 * @type struct<Aggro>
 * @desc Settings related to the Aggro mechanic.
 * @default {"General":"","PriorityHighest:eval":"true","AggroPerDmg:num":"0.1","AggroPerHeal:num":"0.5","Gauge":"","VisibleGauge:eval":"false","StatusGauge:eval":"true","GaugeColor1:str":"#959595","GaugeColor2:str":"#ffffff","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"+0","OffsetY:num":"+2","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Aggro Gauge"}
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
 * Provoke Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Provoke:
 *
 * @param VisuMZ_1_BattleCore
 *
 * @param ShowLines:eval
 * @text Show Priority Lines?
 * @parent VisuMZ_1_BattleCore
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show priority target lines for this plugin?
 * Requires VisuMZ_1_BattleCore.
 * @default true
 *
 * @param LineSettings
 * @text Line Settings
 *
 * @param ArcHeight:num
 * @text Arc Height
 * @parent LineSettings
 * @type number
 * @desc How tall should the line arc in pixels?
 * @default 125
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent LineSettings
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for the sprite.
 * @default 1
 *
 * @param HeightOrigin:num
 * @text Height Origin
 * @parent LineSettings
 * @desc The rate from the battler's sprite base to determine where the line starts from.
 * @default 0.8
 *
 * @param LineColor:str
 * @text Line Color
 * @parent LineSettings
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ff0000
 *
 * @param Opacity:num
 * @text Opacity
 * @parent LineSettings
 * @type number
 * @min 1
 * @max 255
 * @desc The highest possible opacity for active provoke lines.
 * @default 255
 *
 * @param OpacitySpeed:num
 * @text Opacity Speed
 * @parent Opacity:num
 * @type number
 * @min 1
 * @desc The speed at which opacity fluctuates for the line sprite.
 * @default 4
 *
 * @param Parts:num
 * @text Parts
 * @parent LineSettings
 * @type number
 * @min 1
 * @desc The number of joint parts to split up the sprite as.
 * @default 256
 *
 * @param PartsSize:num
 * @text Parts Size
 * @parent Parts:num
 * @type number
 * @min 1
 * @desc The number in pixels for the diameter of each part.
 * @default 5
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Provoke Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Provoke Origin' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Provoke Origin
 *
 */
/* ----------------------------------------------------------------------------
 * Taunt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Taunt:
 *
 * @param Dependency
 * @text VisuMZ_0_CoreEngine
 * @default VisuMZ_1_BattleCore
 *
 * @param ShowAnimation:eval
 * @text Show Animations?
 * @parent Dependency
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show animations for each of the taunt effects?
 * Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 * @default true
 *
 * @param AnimationID
 * @text Animation ID's
 *
 * @param AniPhysical:num
 * @text Physical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for physical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 13
 *
 * @param AniMagical:num
 * @text Magical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for magical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 14
 *
 * @param AniCertain:num
 * @text Certain Hit Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for certain hit taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 15
 *
 * @param AnimationSettings
 * @text Animation Settings
 *
 * @param CycleTime:num
 * @text Cycle Time
 * @parent AnimationSettings
 * @type number
 * @min 1
 * @desc The amount of frames to wait before each animation cycle.
 * WARNING: Lower numbers can jeopardize game performance.
 * @default 60
 *
 * @param MirrorActorAni:eval
 * @text Mirror Actor Ani?
 * @parent AnimationSettings
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations played on actors?
 * @default true
 *
 * @param MuteAnimations:eval
 * @text Mute Animation SFX?
 * @parent AnimationSettings
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute sounds played by animations?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Aggro Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Aggro:
 *
 * @param General
 *
 * @param PriorityHighest:eval
 * @text Priority: Highest TGR
 * @parent General
 * @type boolean
 * @on Always
 * @off Weighted
 * @desc When enemies target actors for an single target attack,
 * always target the highest members or make it weighted?
 * @default true
 *
 * @param AggroPerDmg:num
 * @text Aggro Per Damage
 * @parent General
 * @desc The amount of aggro generated per point of HP damage dealt to an enemy.
 * @default 0.1
 *
 * @param AggroPerHeal:num
 * @text Aggro Per Heal
 * @parent General
 * @desc The amount of aggro generated per point of HP recovered to an ally.
 * @default 0.5
 *
 * @param Gauge
 *
 * @param VisibleGauge:eval
 * @text Visible Battler Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge over an SV actor's head to show
 * current aggro level compared to other party members.
 * @default false
 *
 * @param StatusGauge:eval
 * @text Visible Status Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge in the Battle Status Window
 * to show the current aggro level compared to others.
 * @default true
 *
 * @param GaugeColor1:str
 * @text Gauge Color 1
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #959595
 *
 * @param GaugeColor2:str
 * @text Gauge Color 2
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Gauge
 * @desc How large/small do you want the Aggro Gauge to be scaled?
 * @default 0.5
 * 
 * @param BattlerGauge
 * @text Battler Gauge
 * @parent Gauge
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent BattlerGauge
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent BattlerGauge
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * Negative goes up. Positive goes down.
 * @default +2
 * 
 * @param BattleStatus
 * @text Battle Status Gauge
 * @parent Gauge
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Aggro Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Aggro Gauge
 *
 */
//=============================================================================

const _0xdb8f=['call','_animationCycleTime','battleUIOffsetY','Game_BattlerBase_sparam','indexOf','map','CeiEZ','220958kVIxZN','max','nameX','_statusType','Game_Action_targetsForAlive','zbZob','_certainHitTauntAnimation','provokeOrigin','isAggroType','ARRAYSTRUCT','blendMode','733868YcuRjJ','isEnemy','Scale','currentMaxValueAggroControl','description','aliveMembers','applyGlobal','dzXhD','certainHitTaunt','updateSubPositions','padding','executeHpDamageAggroControl','gaugeRate','taunting','scope','applyProvokeFilters','Sprite_Actor_update','physicalTaunt','min','MuteAnimations','setFrame','format','_targetIndex','drawCircle','isAggroGaugeShown','646757ZilbIz','nameY','HeightOrigin','_colorCache','addAggroControlSystemCommands','updateAggroControl','bitmapWidth','filter','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_damageContainer','Game_Battler_onBattleEnd','isSideView','onBattleEnd','Settings','ZxLhl','STR','bjgqH','inputtingAction','createChildSprites','BattleLayout','XBUxo','BattleCore','_aggroGaugeSprite','tgrMin','Game_Battler_addState','Sprite_Gauge_gaugeColor2','_subject','_statusWindow','inBattle','battleAggro','createBattleFieldAggroControl','drawValue','getNextTauntAnimation','createStateSprite','bypassHighestAggro','Battle\x20Enemy\x20%1','ConfigManager_applyData','refresh','setBattler','baseAggro','isSceneBattle','parse','applyItemUserEffectAggroControl','placeActorName','updateAggroGaugeSprite','YsJRX','Window_Options_addGeneralOptions','registerCommand','item','actorId','traitObjects','sparam','constructor','_%1TauntAnimation','_magicalTauntAnimation','drawAggroGauge','_targetY','initTauntAnimations','AggroPerDmg','Spriteset_Battle_createBattleField','_homeX','Sprite_Gauge_drawValue','EnemySetAggro','_cache','HdbcP','updateBattlerPositions','aggroGaugeColor2','match','msRAx','leftwardAnimation','isProvokeAffected','_mirrorActorTauntAnimations','765728TViyyj','_battleField','Sprite_Battler_update','ShowLines','CycleTime','createBattleField','aggroGaugeY','index','provokeBitmap','_spriteset','certainHitTauntMembers','XDBCl','Game_Action_applyItemUserEffect','iconWidth','Klgvg','Game_Action_applyGlobal','startNewTauntAnimation','updateOpacityAggroControl','magicalTauntMembers','isMagical','gaugeColor1','physicalTauntMembers','_targetX','SKKcc','bypassProvoke','name','highestTgrMember','provoke-line-color','AdjustOptionsRect','magicalTaunt','optDisplayTp','jgwXJ','isPhysical','DyvbS','includes','applySubjectAggro','_menuAggroType','ActorChangeAggro','FksKO','stateHasProvoke','createProvokeHeightOrigin','updateTauntAnimations','Dhsbo','EVAL','jHXUE','JSEDQ','opacity','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Scene_Options_maxCommands','zWGro','initAggroControl','AnchorY','initialize','EnemyIndex','LineColor','Aggro','svyYB','isAtbGaugeVisible','create','addState','battleLayoutStyle','_muteTauntAnimations','itemRect','rlLhw','AggroPerHeal','battler','OffsetY','DAzfa','VisuMZ_0_CoreEngine','reduce','push','getColorDataFromPluginParameters','bind','Sprite_Battler_setBattler','AnchorX','checkCacheKey','AniMagical','#%1','clearAggro','gaugeX','tauntTargetsForAlive','EnemyChangeAggro','makeProvokeTarget','_tauntAnimationTimer','getColor','Game_BattlerBase_initMembers','VisuMZ_1_BattleCore','isTargetHighestTGR','list','JLOFJ','initMembers','xjJQt','findTgrMember','setAggro','alwaysTargetHighestAggro','round','states','_tauntAnimationCycle','yPKHt','aHjzG','Taunt','addChild','Sprite_Actor_createStateSprite','_provokeBitmap','partsSize','ARRAYNUM','some','provokeHeightOrigin','_enemies','_counterAttackingTarget','time','MWRfT','updateChildrenOpacity','friendsUnit','AniPhysical','%1Taunt','Sprite_Gauge_currentValue','AggroControlSystem','ARRAYSTR','aggro-gauge-color-1','87951EpeVem','gaugeHeight','convertStringToBattleTarget','randomInt','tNruw','createProvokeSprite','_aggro','_provokeSprite','BattleManager_endAction','BattleManager_invokeCounterAttack','isCertainHit','_lowestTgrMember','boxHeight','showVisualAtbGauge','isAlive','provoker','matchTauntType','PartsSize','ConvertParams','LAMir','tgr','onBattleStart','endAction','50777rshgkm','Sprite_Gauge_gaugeX','height','boxWidth','currentValue','FkdCc','physical','Sprite_Gauge_gaugeColor1','update','Sprite_Battler_initialize','_provokeContainer','Parts','shift','bypassTaunt','note','invokeMagicReflection','clearProvokers','applyTauntFilters','magical','GaugeColor1','createAggroGauge','return\x200','members','VisuMZ_2_BattleSystemATB','trim','clamp','invokeCounterAttack','JSON','_mainSprite','maxCommands','isBypassProvoke','currentMaxValue','isBypassTaunt','17gguEmU','3zoHVvv','clearTgrCache','maxSprites','placeGauge','HITTYPE_PHYSICAL','_physicalTauntAnimation','abs','subject','actor','updateOpacity','smoothTarget','fAUnL','parentContainer','applyProvokeEffect','AddOption','isDead','_highestTgrMember','LTKoK','MirrorActorAni','pYDyX','Sprite_Gauge_update','Spriteset_Battle_update','ArcHeight','anchor','addCommand','isBypassHighestAggro','parameters','Opacity','aggroGaugeColor1','isTauntAffected','ijaZn','_customModified','aggroGauge','_opacitySpeed','_provoker','ShowFacesListStyle','Sprite_Gauge_currentMaxValue','gainAggro','_sprites','aggroMultiplier','pow','isPlaytest','iCNuc','Urnag','scale','targetsForAlive','Window_StatusBase_placeActorName','STRUCT','isStateAffected','WpZpP','OptionName','1hlubfH','visible','quBhr','executeHpDamage','version','width','ActorID','addAggroControlSystemAggroCommand','randomTauntTarget','ARRAYEVAL','addGeneralOptions','tgrSumFromGroup','_scene','bitmapHeight','battleUIOffsetX','Game_BattlerBase_refresh','prototype','525143TilDdv','ConfigManager_makeData','lowestTgrMember','currentValueAggroControl','_homeY','exit','tgrMax','lezZb','Provoke','ARRAYFUNC','aggro','hitType','ARRAYJSON','HITTYPE_MAGICAL','random','HITTYPE_CERTAIN','fvfbW','BlendMode','gaugeColor2','applyItemUserEffect','OpacitySpeed','ShowAnimation','Sprite_Gauge_gaugeRate','randomTarget','_battler','isShowPriorityLines','length','makeData','fxKhQ','log','provokeLineColor','BattleManager_invokeMagicReflection','convertBattleTargetToString','VbScv','Window_BattleEnemy_refresh','textColor','faceWidth','isActor','addAggroControlSystemProvokeCommand','heightOrigin'];const _0x2428cf=_0x2ff2;function _0x2ff2(_0x1ed598,_0x2eb8a9){_0x1ed598=_0x1ed598-0xb9;let _0xdb8fe5=_0xdb8f[_0x1ed598];return _0xdb8fe5;}(function(_0xbdae16,_0x17d733){const _0x4f375f=_0x2ff2;while(!![]){try{const _0x3e7d83=-parseInt(_0x4f375f(0x20a))+parseInt(_0x4f375f(0x153))+parseInt(_0x4f375f(0x223))+parseInt(_0x4f375f(0x1ff))*-parseInt(_0x4f375f(0x18c))+parseInt(_0x4f375f(0x18b))*parseInt(_0x4f375f(0x16a))+parseInt(_0x4f375f(0xdb))+parseInt(_0x4f375f(0x1bf))*-parseInt(_0x4f375f(0x1d0));if(_0x3e7d83===_0x17d733)break;else _0xbdae16['push'](_0xbdae16['shift']());}catch(_0x4b1251){_0xbdae16['push'](_0xbdae16['shift']());}}}(_0xdb8f,0x6bda0));var label='AggroControlSystem',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2428cf(0x22a)](function(_0xfbdd4f){const _0xdfc67c=_0x2428cf;return _0xfbdd4f['status']&&_0xfbdd4f['description'][_0xdfc67c(0xfd)]('['+label+']');})[0x0];VisuMZ[label][_0x2428cf(0x230)]=VisuMZ[label][_0x2428cf(0x230)]||{},VisuMZ[_0x2428cf(0x165)]=function(_0x571da9,_0x20d739){const _0x136c95=_0x2428cf;for(const _0x16418b in _0x20d739){if(_0x16418b[_0x136c95(0xd6)](/(.*):(.*)/i)){if(_0x136c95(0xe6)==='bOGxZ'){function _0x5d72a6(){const _0x456c2d=_0x136c95;if(this[_0x456c2d(0x159)]===_0xebb0aa)this[_0x456c2d(0x129)]();this[_0x456c2d(0x159)]=_0x54d8a3[_0x456c2d(0x200)](0x1,_0x123a49[_0x456c2d(0x13a)](this[_0x456c2d(0x159)]));}}else{const _0x50038a=String(RegExp['$1']),_0x146631=String(RegExp['$2'])['toUpperCase']()[_0x136c95(0x182)]();let _0x2d803a,_0x1357fa,_0x389744;switch(_0x146631){case'NUM':_0x2d803a=_0x20d739[_0x16418b]!==''?Number(_0x20d739[_0x16418b]):0x0;break;case _0x136c95(0x144):_0x1357fa=_0x20d739[_0x16418b]!==''?JSON[_0x136c95(0xbc)](_0x20d739[_0x16418b]):[],_0x2d803a=_0x1357fa[_0x136c95(0x1fd)](_0x36ddc7=>Number(_0x36ddc7));break;case _0x136c95(0x106):_0x2d803a=_0x20d739[_0x16418b]!==''?eval(_0x20d739[_0x16418b]):null;break;case _0x136c95(0x1c8):_0x1357fa=_0x20d739[_0x16418b]!==''?JSON[_0x136c95(0xbc)](_0x20d739[_0x16418b]):[],_0x2d803a=_0x1357fa[_0x136c95(0x1fd)](_0x5e01b8=>eval(_0x5e01b8));break;case _0x136c95(0x185):_0x2d803a=_0x20d739[_0x16418b]!==''?JSON[_0x136c95(0xbc)](_0x20d739[_0x16418b]):'';break;case _0x136c95(0x1dc):_0x1357fa=_0x20d739[_0x16418b]!==''?JSON[_0x136c95(0xbc)](_0x20d739[_0x16418b]):[],_0x2d803a=_0x1357fa[_0x136c95(0x1fd)](_0x1f69d8=>JSON[_0x136c95(0xbc)](_0x1f69d8));break;case'FUNC':_0x2d803a=_0x20d739[_0x16418b]!==''?new Function(JSON[_0x136c95(0xbc)](_0x20d739[_0x16418b])):new Function(_0x136c95(0x17f));break;case _0x136c95(0x1d9):_0x1357fa=_0x20d739[_0x16418b]!==''?JSON['parse'](_0x20d739[_0x16418b]):[],_0x2d803a=_0x1357fa['map'](_0xdef838=>new Function(JSON[_0x136c95(0xbc)](_0xdef838)));break;case _0x136c95(0x232):_0x2d803a=_0x20d739[_0x16418b]!==''?String(_0x20d739[_0x16418b]):'';break;case _0x136c95(0x151):_0x1357fa=_0x20d739[_0x16418b]!==''?JSON[_0x136c95(0xbc)](_0x20d739[_0x16418b]):[],_0x2d803a=_0x1357fa[_0x136c95(0x1fd)](_0x4f743b=>String(_0x4f743b));break;case _0x136c95(0x1bb):_0x389744=_0x20d739[_0x16418b]!==''?JSON[_0x136c95(0xbc)](_0x20d739[_0x16418b]):{},_0x2d803a=VisuMZ[_0x136c95(0x165)]({},_0x389744);break;case _0x136c95(0x208):_0x1357fa=_0x20d739[_0x16418b]!==''?JSON[_0x136c95(0xbc)](_0x20d739[_0x16418b]):[],_0x2d803a=_0x1357fa[_0x136c95(0x1fd)](_0x14a1b8=>VisuMZ[_0x136c95(0x165)]({},JSON[_0x136c95(0xbc)](_0x14a1b8)));break;default:continue;}_0x571da9[_0x50038a]=_0x2d803a;}}}return _0x571da9;},(_0x740059=>{const _0x482baa=_0x2428cf,_0x426483=_0x740059['name'];for(const _0x245cd6 of dependencies){if(!Imported[_0x245cd6]){if(_0x482baa(0x108)!==_0x482baa(0x1ec)){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x482baa(0x21f)](_0x426483,_0x245cd6)),SceneManager[_0x482baa(0x1d5)]();break;}else{function _0x57ae12(){const _0x290a91=_0x482baa;if(!this[_0x290a91(0x207)]())return;if(!_0x411b74[_0x290a91(0x131)])return;const _0x532377=this[_0x290a91(0x1e8)][_0x290a91(0x11c)]();if(this[_0x290a91(0xff)])this[_0x290a91(0x109)]=0xff;else _0x532377&&_0x532377[_0x290a91(0x109)]>0x0?this[_0x290a91(0x109)]=0xff:this[_0x290a91(0x109)]=0x0;}}}}const _0x36e1ea=_0x740059[_0x482baa(0x20e)];if(_0x36e1ea[_0x482baa(0xd6)](/\[Version[ ](.*?)\]/i)){if('WpZpP'!==_0x482baa(0x1bd)){function _0x3e9ad6(){const _0x3370d0=_0x482baa;if(this[_0x3370d0(0x1ae)]===_0x232673)this[_0x3370d0(0x17a)]();const _0x44d373=_0x138796[_0x3370d0(0x1f0)](this);this[_0x3370d0(0x1ae)][_0x11b687]=_0x44d373,!this[_0x3370d0(0x1ae)][_0x360edd]&&delete this[_0x3370d0(0x1ae)][_0x1d2038];}}else{const _0x260d62=Number(RegExp['$1']);if(_0x260d62!==VisuMZ[label][_0x482baa(0x1c3)]){if(_0x482baa(0xe9)!=='PUMcK')alert(_0x482baa(0x22b)[_0x482baa(0x21f)](_0x426483,_0x260d62)),SceneManager[_0x482baa(0x1d5)]();else{function _0x10f949(){const _0x3e6699=_0x482baa,_0x50ea00=!![];return this[_0x3e6699(0x137)](_0xef99bc,_0x50ea00);}}}}}if(_0x36e1ea[_0x482baa(0xd6)](/\[Tier[ ](\d+)\]/i)){const _0x38bf9f=Number(RegExp['$1']);_0x38bf9f<tier?(alert(_0x482baa(0x10a)['format'](_0x426483,_0x38bf9f,tier)),SceneManager[_0x482baa(0x1d5)]()):tier=Math['max'](_0x38bf9f,tier);}VisuMZ[_0x482baa(0x165)](VisuMZ[label]['Settings'],_0x740059[_0x482baa(0x1a6)]);})(pluginData),PluginManager[_0x2428cf(0xc2)](pluginData[_0x2428cf(0xf4)],_0x2428cf(0x100),_0x3de6b1=>{const _0x2f98fd=_0x2428cf;if(!$gameParty[_0x2f98fd(0x23f)]())return;VisuMZ[_0x2f98fd(0x165)](_0x3de6b1,_0x3de6b1);const _0x293676=$gameActors[_0x2f98fd(0x194)](_0x3de6b1[_0x2f98fd(0x1c5)]),_0x2bf1f5=_0x3de6b1[_0x2f98fd(0x112)];if(_0x293676)_0x293676['gainAggro'](_0x2bf1f5);}),PluginManager[_0x2428cf(0xc2)](pluginData[_0x2428cf(0xf4)],'ActorSetAggro',_0x21900e=>{const _0x4891f4=_0x2428cf;if(!$gameParty[_0x4891f4(0x23f)]())return;VisuMZ[_0x4891f4(0x165)](_0x21900e,_0x21900e);const _0x258acf=$gameActors[_0x4891f4(0x194)](_0x21900e[_0x4891f4(0x1c5)]),_0x4125a5=_0x21900e[_0x4891f4(0x112)];if(_0x258acf)_0x258acf[_0x4891f4(0x138)](_0x4125a5);}),PluginManager[_0x2428cf(0xc2)](pluginData[_0x2428cf(0xf4)],_0x2428cf(0x12c),_0x50605f=>{const _0x1ce493=_0x2428cf;if(!$gameParty[_0x1ce493(0x23f)]())return;VisuMZ[_0x1ce493(0x165)](_0x50605f,_0x50605f);const _0x4d079f=$gameTroop[_0x1ce493(0x180)]()[_0x50605f['EnemyIndex']],_0xf6eea7=_0x50605f[_0x1ce493(0x112)];if(_0x4d079f)_0x4d079f[_0x1ce493(0x1b1)](_0xf6eea7);}),PluginManager['registerCommand'](pluginData[_0x2428cf(0xf4)],_0x2428cf(0xd1),_0x1a3205=>{const _0x150b1d=_0x2428cf;if(!$gameParty[_0x150b1d(0x23f)]())return;VisuMZ[_0x150b1d(0x165)](_0x1a3205,_0x1a3205);const _0x199885=$gameTroop[_0x150b1d(0x180)]()[_0x1a3205[_0x150b1d(0x110)]],_0x2acfaa=_0x1a3205[_0x150b1d(0x112)];if(_0x199885)_0x199885[_0x150b1d(0x138)](_0x2acfaa);}),DataManager[_0x2428cf(0x102)]=function(_0x28b090){const _0x2d406e=_0x2428cf;if(!_0x28b090)return![];return _0x28b090[_0x2d406e(0x178)][_0x2d406e(0xd6)](/<PROVOKE>/i);},DataManager[_0x2428cf(0x188)]=function(_0x126e0a){const _0x318ea4=_0x2428cf;if(!_0x126e0a)return![];return _0x126e0a[_0x318ea4(0x178)][_0x318ea4(0xd6)](/<BYPASS PROVOKE>/i);},DataManager[_0x2428cf(0x18a)]=function(_0x321361){const _0x472f07=_0x2428cf;if(!_0x321361)return![];return _0x321361['note'][_0x472f07(0xd6)](/<BYPASS TAUNT>/i);},DataManager[_0x2428cf(0x1a5)]=function(_0x296e7d){const _0x76b6a3=_0x2428cf;if(!_0x296e7d)return![];return _0x296e7d[_0x76b6a3(0x178)][_0x76b6a3(0xd6)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},DataManager['alwaysTargetHighestAggro']=function(_0x5418f8){if(!_0x5418f8)return![];return _0x5418f8['note']['match'](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},ImageManager[_0x2428cf(0xe3)]=function(){const _0x39404f=_0x2428cf;if(this[_0x39404f(0x142)])return this[_0x39404f(0x142)];return this[_0x39404f(0x142)]=new Bitmap(0x64,0x64),this[_0x39404f(0x142)][_0x39404f(0x221)](0x32,0x32,0x32,ColorManager[_0x39404f(0x1ee)]()),this['_provokeBitmap'][_0x39404f(0x1ab)]=![],this['_provokeBitmap'];},ConfigManager['aggroGauge']=!![],ConfigManager[_0x2428cf(0x206)]=!![],VisuMZ['AggroControlSystem'][_0x2428cf(0x1d1)]=ConfigManager[_0x2428cf(0x1eb)],ConfigManager['makeData']=function(){const _0x28257a=_0x2428cf,_0x3978b3=VisuMZ[_0x28257a(0x150)]['ConfigManager_makeData'][_0x28257a(0x1f8)](this);return _0x3978b3[_0x28257a(0x1ac)]=this['aggroGauge'],_0x3978b3['provokeOrigin']=this['provokeOrigin'],_0x3978b3;},VisuMZ[_0x2428cf(0x150)][_0x2428cf(0x247)]=ConfigManager['applyData'],ConfigManager['applyData']=function(_0x1b9c3b){const _0x2c21ca=_0x2428cf;VisuMZ['AggroControlSystem'][_0x2c21ca(0x247)][_0x2c21ca(0x1f8)](this,_0x1b9c3b);_0x2c21ca(0x1ac)in _0x1b9c3b?this['aggroGauge']=_0x1b9c3b['aggroGauge']:this[_0x2c21ca(0x1ac)]=!![];if('provokeOrigin'in _0x1b9c3b){if(_0x2c21ca(0x157)!==_0x2c21ca(0x157)){function _0x139e72(){const _0x3640bf=_0x2c21ca;_0x55df1d(this[_0x3640bf(0x158)][_0x3640bf(0x123)](this),0x3e8);}}else this[_0x2c21ca(0x206)]=_0x1b9c3b[_0x2c21ca(0x206)];}else this[_0x2c21ca(0x206)]=!![];},TextManager['aggroGauge']=VisuMZ['AggroControlSystem'][_0x2428cf(0x230)][_0x2428cf(0x112)][_0x2428cf(0x1be)],TextManager['provokeOrigin']=VisuMZ[_0x2428cf(0x150)][_0x2428cf(0x230)][_0x2428cf(0x1d8)][_0x2428cf(0x1be)],ColorManager[_0x2428cf(0x122)]=function(_0x52d122,_0x187e2a){const _0x38fdf3=_0x2428cf;return _0x187e2a=String(_0x187e2a),this[_0x38fdf3(0x226)]=this[_0x38fdf3(0x226)]||{},_0x187e2a[_0x38fdf3(0xd6)](/#(.*)/i)?this[_0x38fdf3(0x226)][_0x52d122]=_0x38fdf3(0x128)[_0x38fdf3(0x21f)](String(RegExp['$1'])):this[_0x38fdf3(0x226)][_0x52d122]=this[_0x38fdf3(0x1f3)](Number(_0x187e2a)),this[_0x38fdf3(0x226)][_0x52d122];},ColorManager[_0x2428cf(0x12f)]=function(_0x200301){const _0x4c9bc7=_0x2428cf;return _0x200301=String(_0x200301),_0x200301['match'](/#(.*)/i)?_0x4c9bc7(0x128)[_0x4c9bc7(0x21f)](String(RegExp['$1'])):this[_0x4c9bc7(0x1f3)](Number(_0x200301));},ColorManager[_0x2428cf(0x1ee)]=function(){const _0x101fd5=_0x2428cf,_0x1e4751=_0x101fd5(0xf6);this[_0x101fd5(0x226)]=this['_colorCache']||{};if(this[_0x101fd5(0x226)][_0x1e4751])return this[_0x101fd5(0x226)][_0x1e4751];const _0x442eaf=VisuMZ['AggroControlSystem'][_0x101fd5(0x230)][_0x101fd5(0x1d8)][_0x101fd5(0x111)];return this[_0x101fd5(0x122)](_0x1e4751,_0x442eaf);},ColorManager[_0x2428cf(0x1a8)]=function(){const _0x16346d=_0x2428cf,_0x4448f0=_0x16346d(0x152);this['_colorCache']=this['_colorCache']||{};if(this[_0x16346d(0x226)][_0x4448f0])return this['_colorCache'][_0x4448f0];const _0x1f40e2=VisuMZ['AggroControlSystem'][_0x16346d(0x230)]['Aggro'][_0x16346d(0x17d)];return this[_0x16346d(0x122)](_0x4448f0,_0x1f40e2);},ColorManager[_0x2428cf(0xd5)]=function(){const _0x34609b=_0x2428cf,_0x4c056a='aggro-gauge-color-2';this['_colorCache']=this[_0x34609b(0x226)]||{};if(this[_0x34609b(0x226)][_0x4c056a])return this['_colorCache'][_0x4c056a];const _0x152d6d=VisuMZ[_0x34609b(0x150)][_0x34609b(0x230)][_0x34609b(0x112)]['GaugeColor2'];return this[_0x34609b(0x122)](_0x4c056a,_0x152d6d);},SceneManager[_0x2428cf(0xbb)]=function(){const _0x58bffc=_0x2428cf;return this[_0x58bffc(0x1cb)]&&this[_0x58bffc(0x1cb)][_0x58bffc(0xc7)]===Scene_Battle;},BattleManager[_0x2428cf(0x1f0)]=function(_0x126843){const _0x55205b=_0x2428cf;let _0x1c95c1=this[_0x55205b(0x23d)];if(this[_0x55205b(0x148)]){if(_0x55205b(0x11e)===_0x55205b(0x11e))_0x1c95c1=this['_counterAttackingTarget'];else{function _0x25af99(){const _0x15e690=_0x55205b;if(this[_0x15e690(0x159)]===_0x1b8ba0)this['clearAggro']();this[_0x15e690(0x159)]=_0x36ed91[_0x15e690(0x200)](0x1,this[_0x15e690(0x159)]+_0x3d2143['round'](_0xfcfdff));}}}if(!_0x1c95c1)return null;if(_0x1c95c1['isActor']()&&_0x126843[_0x55205b(0x20b)]())return'Battle\x20Actor\x20%1'[_0x55205b(0x21f)](_0x1c95c1['actorId']());else{if(_0x1c95c1[_0x55205b(0x20b)]()&&_0x126843[_0x55205b(0x1f5)]()){if('dZxbS'===_0x55205b(0x1f1)){function _0x2d3f79(){return null;}}else return _0x55205b(0x246)[_0x55205b(0x21f)](_0x1c95c1['index']());}}return null;},BattleManager[_0x2428cf(0x155)]=function(_0x116fbc){const _0x2b750f=_0x2428cf;if(!_0x116fbc)return null;if(_0x116fbc[_0x2b750f(0xd6)](/BATTLE ACTOR (\d+)/i))return $gameActors[_0x2b750f(0x194)](Number(RegExp['$1']));else{if(_0x116fbc[_0x2b750f(0xd6)](/BATTLE ENEMY (\d+)/i)){if('pYDyX'===_0x2b750f(0x19f))return $gameTroop[_0x2b750f(0x180)]()[Number(RegExp['$1'])];else{function _0x4b73df(){const _0x439a73=_0x2b750f;if(!_0x42f64c)return![];return _0x4d4eac[_0x439a73(0x178)][_0x439a73(0xd6)](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);}}}}return null;},BattleManager[_0x2428cf(0x132)]=function(){const _0x497566=_0x2428cf;return VisuMZ[_0x497566(0x150)]['Settings'][_0x497566(0x112)]['PriorityHighest'];},VisuMZ[_0x2428cf(0x150)][_0x2428cf(0x203)]=Game_Action[_0x2428cf(0x1cf)]['targetsForAlive'],Game_Action[_0x2428cf(0x1cf)][_0x2428cf(0x1b9)]=function(_0x43a0c9){const _0x44267e=_0x2428cf;if(this[_0x44267e(0xd9)]())return this[_0x44267e(0x12d)]();else{if(this[_0x44267e(0x1a9)]())return this[_0x44267e(0x12b)](_0x43a0c9);else{if(this['isAggroAffected']())return[_0x43a0c9[_0x44267e(0xf5)]()];else{if(_0x44267e(0x136)!=='xjJQt'){function _0x20e90e(){const _0x36e847=_0x44267e;this[_0x36e847(0x129)]();}}else return VisuMZ['AggroControlSystem'][_0x44267e(0x203)][_0x44267e(0x1f8)](this,_0x43a0c9);}}}},Game_Action[_0x2428cf(0x1cf)][_0x2428cf(0xd9)]=function(){const _0x62f3dd=_0x2428cf;if(this[_0x62f3dd(0xc3)]()[_0x62f3dd(0x218)]!==0x1)return![];if(DataManager[_0x62f3dd(0x188)](this[_0x62f3dd(0xc3)]()))return![];if(this[_0x62f3dd(0x193)]()[_0x62f3dd(0xf3)]())return![];return this[_0x62f3dd(0x193)]()[_0x62f3dd(0xd9)]();},Game_Action[_0x2428cf(0x1cf)][_0x2428cf(0x12d)]=function(){const _0x28dc42=_0x2428cf;return[this[_0x28dc42(0x193)]()['provoker']()];},Game_Action[_0x2428cf(0x1cf)][_0x2428cf(0x1a9)]=function(){const _0x45d760=_0x2428cf;if(this[_0x45d760(0xc3)]()[_0x45d760(0x218)]!==0x1)return![];if(DataManager[_0x45d760(0x18a)](this[_0x45d760(0xc3)]()))return![];if(this[_0x45d760(0x193)]()[_0x45d760(0x177)]())return![];const _0x3f84ca=this['opponentsUnit']();if(this[_0x45d760(0xfb)]()&&_0x3f84ca[_0x45d760(0xf0)]()[_0x45d760(0x1ea)]>0x0)return!![];if(this[_0x45d760(0xee)]()&&_0x3f84ca[_0x45d760(0xed)]()[_0x45d760(0x1ea)]>0x0)return!![];if(this[_0x45d760(0x15d)]()&&_0x3f84ca[_0x45d760(0xe5)]()[_0x45d760(0x1ea)]>0x0)return!![];return![];},Game_Action['prototype'][_0x2428cf(0x12b)]=function(_0xdeadea){const _0x13a1e3=_0x2428cf;if(this[_0x13a1e3(0x220)]<0x0)return[_0xdeadea[_0x13a1e3(0x1c7)](this[_0x13a1e3(0xc3)]()[_0x13a1e3(0x1db)])];else{if('ijaZn'===_0x13a1e3(0x1aa)){const _0x24f307=_0xdeadea[_0x13a1e3(0x196)](this[_0x13a1e3(0x220)]);if(_0x24f307['matchTauntType'](this[_0x13a1e3(0xc3)]()[_0x13a1e3(0x1db)])){if(_0x13a1e3(0x1fe)!==_0x13a1e3(0x1fe)){function _0x44306a(){const _0x4407da=_0x13a1e3;this['_enemies']=_0x26a7a5[_0x4407da(0xf0)]();}}else return[_0x24f307];}else{if('XnuPF'!=='AAyiI')return[_0xdeadea[_0x13a1e3(0x1c7)]()];else{function _0x48a356(){const _0x2b3dd9=_0x13a1e3;if(this['constructor']!==_0x4a5986)return;if(!this['isAggroGaugeVisible']())return;if(!_0xf7b95f[_0x2b3dd9(0xbb)]())return;const _0x4503c1=_0x4861d2[_0x2b3dd9(0x150)][_0x2b3dd9(0x230)][_0x2b3dd9(0x112)],_0x140605=new _0x177a8d();_0x140605['anchor']['x']=_0x4503c1['AnchorX'],_0x140605[_0x2b3dd9(0x1a3)]['y']=_0x4503c1[_0x2b3dd9(0x10e)];const _0x4c5c52=_0x5a4b62[_0x2b3dd9(0x1cf)][_0x2b3dd9(0x229)]();_0x140605['scale']['x']=_0x140605[_0x2b3dd9(0x1b8)]['y']=_0x4503c1[_0x2b3dd9(0x20c)],this[_0x2b3dd9(0x239)]=_0x140605,this[_0x2b3dd9(0x140)](_0x140605);}}}}else{function _0x1f79cb(){const _0x557674=_0x13a1e3;return this[_0x557674(0x20f)]()[_0x557674(0x22a)](_0x599e0f=>_0x599e0f&&_0x599e0f[_0x557674(0xf8)]());}}}},Game_Action[_0x2428cf(0x1cf)]['isAggroAffected']=function(){const _0x490a95=_0x2428cf;if(this['item']()['scope']!==0x1)return![];if(this[_0x490a95(0x220)]>=0x0)return![];if(DataManager[_0x490a95(0x1a5)](this['item']()))return![];if(this[_0x490a95(0x193)]()[_0x490a95(0x245)]())return![];if(DataManager[_0x490a95(0x139)](this['item']()))return!![];if(this['subject']()[_0x490a95(0x139)]())return!![];return BattleManager[_0x490a95(0x132)]();},VisuMZ[_0x2428cf(0x150)][_0x2428cf(0xea)]=Game_Action[_0x2428cf(0x1cf)][_0x2428cf(0x210)],Game_Action['prototype']['applyGlobal']=function(){const _0x47198f=_0x2428cf;VisuMZ[_0x47198f(0x150)][_0x47198f(0xea)][_0x47198f(0x1f8)](this),this['applySubjectAggro']();},Game_Action[_0x2428cf(0x1cf)][_0x2428cf(0xfe)]=function(){const _0x58571c=_0x2428cf,_0x443a48=this['item']()[_0x58571c(0x178)];if(_0x443a48[_0x58571c(0xd6)](/<(?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT): ([\+\-]\d+)>/i)){const _0x45b9e6=Number(RegExp['$1']);this['subject']()['gainAggro'](_0x45b9e6);}if(_0x443a48[_0x58571c(0xd6)](/<JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>\s*([\s\S]*)\s*<\/JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>/i)){if('zWGro'!==_0x58571c(0x10c)){function _0x257941(){const _0x257a00=_0x58571c;if(this[_0x257a00(0x222)]())this[_0x257a00(0xca)](_0x5383de[_0x257a00(0xe2)]());_0x4a15d7[_0x257a00(0x150)][_0x257a00(0x1ba)]['call'](this,_0x1afde0,_0x5ab256,_0x164cd6);}}else{const _0x3d4a36=String(RegExp['$1']),_0x301543=this[_0x58571c(0x193)](),_0x491fb0=this[_0x58571c(0xc3)](),_0xe3d0bd=this['subject'](),_0x361c6c=_0xe3d0bd;let _0x1cb77a=_0x301543[_0x58571c(0x240)]();try{eval(_0x3d4a36);}catch(_0x1331da){if($gameTemp[_0x58571c(0x1b5)]())console['log'](_0x1331da);}_0x301543['setAggro'](_0x1cb77a);}}},VisuMZ[_0x2428cf(0x150)]['Game_Action_applyItemUserEffect']=Game_Action[_0x2428cf(0x1cf)]['applyItemUserEffect'],Game_Action['prototype'][_0x2428cf(0x1e3)]=function(_0x345518){const _0x5e0c83=_0x2428cf;VisuMZ[_0x5e0c83(0x150)][_0x5e0c83(0xe7)][_0x5e0c83(0x1f8)](this,_0x345518),this[_0x5e0c83(0xbd)](_0x345518);},Game_Action[_0x2428cf(0x1cf)][_0x2428cf(0xbd)]=function(_0x249052){const _0x40442b=_0x2428cf;if(!this[_0x40442b(0xc3)]())return;if(!SceneManager[_0x40442b(0xbb)]())return;const _0x5419bc=this[_0x40442b(0xc3)]()[_0x40442b(0x178)];if(_0x5419bc[_0x40442b(0xd6)](/<TARGET (?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)){if('RPBdM'===_0x40442b(0x16f)){function _0x4481f4(){const _0x27647a=_0x40442b;return _0xc179c5=_0x565a7b(_0x163449),this[_0x27647a(0x226)]=this[_0x27647a(0x226)]||{},_0x5cf3f1[_0x27647a(0xd6)](/#(.*)/i)?this['_colorCache'][_0x34f8cb]=_0x27647a(0x128)[_0x27647a(0x21f)](_0x517161(_0x1370d9['$1'])):this[_0x27647a(0x226)][_0x368162]=this[_0x27647a(0x1f3)](_0x45ad5b(_0x45d8f1)),this[_0x27647a(0x226)][_0x8e0c7b];}}else{const _0x4fa0ea=Number(RegExp['$1']);_0x249052[_0x40442b(0x1b1)](_0x4fa0ea);}}if(_0x5419bc[_0x40442b(0xd6)](/<JS TARGET (?:AGGRO|ENMITY|THREAT)>\s*([\s\S]*)\s*<\/JS TARGET (?:AGGRO|ENMITY|THREAT)>/i)){if(_0x40442b(0x1e0)!==_0x40442b(0x233)){const _0x51255f=String(RegExp['$1']),_0x156387=this[_0x40442b(0x193)](),_0x3a07a0=this['item'](),_0x3af51d=this[_0x40442b(0x193)](),_0x51e0a7=_0x249052;let _0x2e7a80=_0x249052['battleAggro']();try{eval(_0x51255f);}catch(_0x174a45){if($gameTemp[_0x40442b(0x1b5)]())console[_0x40442b(0x1ed)](_0x174a45);}_0x249052[_0x40442b(0x138)](_0x2e7a80);}else{function _0x49d8a1(){const _0x38a047=_0x40442b;if(!_0x11ac91[_0x38a047(0x23f)]())return;_0x55984a['ConvertParams'](_0xb85af8,_0x44cc6b);const _0x474798=_0x58aa87['actor'](_0x1c52fb['ActorID']),_0x19c55d=_0x1facce[_0x38a047(0x112)];if(_0x474798)_0x474798[_0x38a047(0x1b1)](_0x19c55d);}}}},VisuMZ[_0x2428cf(0x150)]['Game_Action_executeHpDamage']=Game_Action['prototype'][_0x2428cf(0x1c2)],Game_Action['prototype'][_0x2428cf(0x1c2)]=function(_0x699042,_0x57cbc5){const _0x39d374=_0x2428cf;VisuMZ[_0x39d374(0x150)]['Game_Action_executeHpDamage'][_0x39d374(0x1f8)](this,_0x699042,_0x57cbc5),this[_0x39d374(0x215)](_0x699042,_0x57cbc5);},Game_Action[_0x2428cf(0x1cf)][_0x2428cf(0x215)]=function(_0x32d4a0,_0x55322e){const _0x387420=_0x2428cf,_0x116b7b=VisuMZ[_0x387420(0x150)][_0x387420(0x230)][_0x387420(0x112)];if(_0x55322e>0x0&&_0x32d4a0[_0x387420(0x1f5)]()!==this['subject']()[_0x387420(0x1f5)]()){if(_0x387420(0xfc)===_0x387420(0x1b6)){function _0x8594d2(){const _0x382f45=_0x387420;return this[_0x382f45(0x207)]()?this[_0x382f45(0x20d)]():_0x1751ed['AggroControlSystem'][_0x382f45(0x1b0)][_0x382f45(0x1f8)](this);}}else{const _0x481cd9=_0x116b7b[_0x387420(0xcd)];this[_0x387420(0x193)]()['gainAggro'](_0x481cd9*_0x55322e);}}if(_0x55322e<0x0&&_0x32d4a0['isActor']()===this[_0x387420(0x193)]()['isActor']()){if(_0x387420(0xd3)!==_0x387420(0x105)){const _0x7f292d=_0x116b7b[_0x387420(0x11b)];this[_0x387420(0x193)]()['gainAggro'](_0x7f292d*Math[_0x387420(0x192)](_0x55322e));}else{function _0x3544c7(){const _0x5eea11=_0x387420;_0x1e7ee1[_0x5eea11(0x150)][_0x5eea11(0x141)][_0x5eea11(0x1f8)](this),this[_0x5eea11(0x17e)]();}}}},VisuMZ['AggroControlSystem'][_0x2428cf(0x130)]=Game_BattlerBase['prototype'][_0x2428cf(0x135)],Game_BattlerBase['prototype'][_0x2428cf(0x135)]=function(){const _0x277ede=_0x2428cf;this['_cache']={},VisuMZ['AggroControlSystem']['Game_BattlerBase_initMembers'][_0x277ede(0x1f8)](this),this[_0x277ede(0x10d)]();},Game_BattlerBase[_0x2428cf(0x1cf)][_0x2428cf(0x10d)]=function(){const _0x42e0c1=_0x2428cf;this['clearProvokers'](),this[_0x42e0c1(0x129)]();},Game_BattlerBase[_0x2428cf(0x1cf)]['clearProvokers']=function(){const _0x5640bd=_0x2428cf;this[_0x5640bd(0x1ae)]={};},VisuMZ[_0x2428cf(0x150)][_0x2428cf(0x1ce)]=Game_BattlerBase[_0x2428cf(0x1cf)][_0x2428cf(0x248)],Game_BattlerBase[_0x2428cf(0x1cf)]['refresh']=function(){const _0x2efc0f=_0x2428cf;this[_0x2efc0f(0xd2)]={},VisuMZ[_0x2efc0f(0x150)][_0x2efc0f(0x1ce)][_0x2efc0f(0x1f8)](this);},Game_BattlerBase['prototype'][_0x2428cf(0x126)]=function(_0x2d7222){const _0x53bf88=_0x2428cf;return this[_0x53bf88(0xd2)]=this[_0x53bf88(0xd2)]||{},this['_cache'][_0x2d7222]!==undefined;},Game_BattlerBase['prototype']['provoker']=function(){const _0x4b6c91=_0x2428cf;for(const _0x5e199c of this[_0x4b6c91(0x13b)]()){if(DataManager[_0x4b6c91(0x102)](_0x5e199c)){if(this['_provoker']===undefined)this[_0x4b6c91(0x17a)]();const _0x4a9679=this[_0x4b6c91(0x1ae)][_0x5e199c['id']],_0x3ae45b=BattleManager[_0x4b6c91(0x155)](_0x4a9679);if(_0x3ae45b&&_0x3ae45b[_0x4b6c91(0x161)]())return _0x3ae45b;}}return null;},Game_BattlerBase[_0x2428cf(0x1cf)]['isProvokeAffected']=function(){const _0x2f2ead=_0x2428cf;return!!this[_0x2f2ead(0x162)]();},Game_BattlerBase[_0x2428cf(0x1cf)]['bypassProvoke']=function(){const _0x38c777=_0x2428cf;return this['traitObjects']()[_0x38c777(0x145)](_0xf0ade6=>_0xf0ade6&&_0xf0ade6[_0x38c777(0x178)]['match'](/<BYPASS PROVOKE>/i));},Game_BattlerBase[_0x2428cf(0x1cf)][_0x2428cf(0x146)]=function(){const _0x58b433=_0x2428cf;let _0x27c949='provokeHeightOrigin';if(this[_0x58b433(0x126)](_0x27c949))return this['_cache'][_0x27c949];return this['_cache'][_0x27c949]=this[_0x58b433(0x103)](),this[_0x58b433(0xd2)][_0x27c949];},Game_BattlerBase[_0x2428cf(0x1cf)][_0x2428cf(0x103)]=function(){const _0x44dd09=_0x2428cf,_0x5b0d7=this[_0x44dd09(0x1f5)]()?this[_0x44dd09(0x194)]()[_0x44dd09(0x178)]:this[_0x44dd09(0x20b)]()?this['enemy']()[_0x44dd09(0x178)]:'';if(_0x5b0d7['match'](/<PROVOKE HEIGHT ORIGIN: (\d+)([%％])>/i))return Number(RegExp['$1'])*0.01;return VisuMZ[_0x44dd09(0x150)][_0x44dd09(0x230)]['Provoke'][_0x44dd09(0x225)];},Game_BattlerBase[_0x2428cf(0x1cf)][_0x2428cf(0x163)]=function(_0x77a870){const _0x77790a=_0x2428cf;switch(_0x77a870){case Game_Action[_0x77790a(0x190)]:return this['physicalTaunt']();break;case Game_Action[_0x77790a(0x1dd)]:return this[_0x77790a(0xf8)]();break;case Game_Action['HITTYPE_CERTAIN']:return this[_0x77790a(0x212)]();break;}},Game_BattlerBase[_0x2428cf(0x1cf)][_0x2428cf(0x217)]=function(){const _0x5eefdb=_0x2428cf;return this[_0x5eefdb(0x21b)]()||this[_0x5eefdb(0xf8)]()||this[_0x5eefdb(0x212)]();},Game_BattlerBase[_0x2428cf(0x1cf)]['physicalTaunt']=function(){const _0xf492d3=_0x2428cf;return this[_0xf492d3(0xc5)]()['some'](_0x3d76aa=>_0x3d76aa&&_0x3d76aa[_0xf492d3(0x178)]['match'](/<(?:TAUNT|PHYSICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x2428cf(0x1cf)]['magicalTaunt']=function(){const _0x192ec7=_0x2428cf;return this['traitObjects']()[_0x192ec7(0x145)](_0x469322=>_0x469322&&_0x469322[_0x192ec7(0x178)]['match'](/<(?:TAUNT|MAGICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase['prototype'][_0x2428cf(0x212)]=function(){const _0x155340=_0x2428cf;return this[_0x155340(0xc5)]()['some'](_0x222d05=>_0x222d05&&_0x222d05[_0x155340(0x178)][_0x155340(0xd6)](/<(?:TAUNT|CERTAIN TAUNT|CERTAIN HIT TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x2428cf(0x1cf)][_0x2428cf(0x177)]=function(){const _0x5ecdeb=_0x2428cf;return this[_0x5ecdeb(0xc5)]()[_0x5ecdeb(0x145)](_0x26673a=>_0x26673a&&_0x26673a[_0x5ecdeb(0x178)]['match'](/<BYPASS TAUNT>/i));},Game_BattlerBase[_0x2428cf(0x1cf)][_0x2428cf(0x129)]=function(){this['_aggro']=0x1;},VisuMZ[_0x2428cf(0x150)][_0x2428cf(0x1fb)]=Game_BattlerBase[_0x2428cf(0x1cf)][_0x2428cf(0xc6)],Game_BattlerBase[_0x2428cf(0x1cf)][_0x2428cf(0xc6)]=function(_0x3f60c8){const _0x250ed7=_0x2428cf;let _0x13b68f=VisuMZ[_0x250ed7(0x150)][_0x250ed7(0x1fb)][_0x250ed7(0x1f8)](this,_0x3f60c8);if(_0x3f60c8===0x0){if(this[_0x250ed7(0x159)]===undefined)this[_0x250ed7(0x129)]();_0x13b68f*=this[_0x250ed7(0x1da)]();}return _0x13b68f;},Game_BattlerBase['prototype'][_0x2428cf(0x138)]=function(_0x2e6a9e){const _0x5d7399=_0x2428cf;if(this[_0x5d7399(0x159)]===undefined)this[_0x5d7399(0x129)]();this['_aggro']=Math['max'](0x1,Math[_0x5d7399(0x13a)](this[_0x5d7399(0x159)]));},Game_BattlerBase[_0x2428cf(0x1cf)][_0x2428cf(0x1b1)]=function(_0x3c73fd){const _0x4c8162=_0x2428cf;if(this[_0x4c8162(0x159)]===undefined)this[_0x4c8162(0x129)]();this['_aggro']=Math['max'](0x1,this[_0x4c8162(0x159)]+Math[_0x4c8162(0x13a)](_0x3c73fd));},Game_BattlerBase[_0x2428cf(0x1cf)]['loseAggro']=function(_0x58e880){const _0x1f8f09=_0x2428cf;this[_0x1f8f09(0x1b1)](-_0x58e880);},Game_BattlerBase['prototype']['aggro']=function(){const _0x5a126e=_0x2428cf;if(this[_0x5a126e(0x19b)]())return 0x0;return this[_0x5a126e(0xba)]()*this['aggroMultiplier']();},Game_BattlerBase[_0x2428cf(0x1cf)][_0x2428cf(0x240)]=function(){const _0x5767bd=_0x2428cf;return this[_0x5767bd(0x159)]===undefined&&this[_0x5767bd(0x129)](),this[_0x5767bd(0x159)];},Game_BattlerBase[_0x2428cf(0x1cf)][_0x2428cf(0xba)]=function(){const _0x30c0a0=_0x2428cf;return this[_0x30c0a0(0xc5)]()[_0x30c0a0(0x120)]((_0x29d4b2,_0x585303)=>{const _0x3b4969=_0x30c0a0;if(_0x3b4969(0x1c1)===_0x3b4969(0x1c1))return _0x585303&&_0x585303['note'][_0x3b4969(0xd6)](/<(?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)?_0x29d4b2+Number(RegExp['$1'])/0x64:_0x29d4b2;else{function _0x15aed1(){this['_aggro']=0x1;}}},this[_0x30c0a0(0x240)]());},Game_BattlerBase[_0x2428cf(0x1cf)][_0x2428cf(0x1b3)]=function(){const _0x30c855=_0x2428cf;return this[_0x30c855(0xc5)]()[_0x30c855(0x120)]((_0x3f5492,_0x55eaeb)=>{const _0x206b61=_0x30c855;if(_0x55eaeb&&_0x55eaeb[_0x206b61(0x178)][_0x206b61(0xd6)](/<(?:AGGRO|ENMITY|THREAT) MULTIPLIER: (\d+)%>/i)){if(_0x206b61(0x13d)===_0x206b61(0x13d))return _0x3f5492+Number(RegExp['$1'])/0x64;else{function _0x342b05(){const _0x2e8af5=_0x206b61;_0x2c3b28[_0x2e8af5(0x150)]['Sprite_Actor_update']['call'](this),this[_0x2e8af5(0xbf)]();}}}else return _0x3f5492;},0x1);},Game_BattlerBase[_0x2428cf(0x1cf)][_0x2428cf(0x245)]=function(){const _0x436d51=_0x2428cf;return this['traitObjects']()['some'](_0x27602b=>_0x27602b&&_0x27602b[_0x436d51(0x178)][_0x436d51(0xd6)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},Game_BattlerBase['prototype'][_0x2428cf(0x139)]=function(){const _0x5b0b78=_0x2428cf;return this[_0x5b0b78(0xc5)]()['some'](_0x4e0228=>_0x4e0228&&_0x4e0228[_0x5b0b78(0x178)][_0x5b0b78(0xd6)](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},VisuMZ[_0x2428cf(0x150)]['Game_Battler_onBattleStart']=Game_Battler['prototype'][_0x2428cf(0x168)],Game_Battler[_0x2428cf(0x1cf)]['onBattleStart']=function(_0x23bd41){const _0xfa8a66=_0x2428cf;VisuMZ['AggroControlSystem']['Game_Battler_onBattleStart'][_0xfa8a66(0x1f8)](this,_0x23bd41),this[_0xfa8a66(0x129)]();},VisuMZ[_0x2428cf(0x150)][_0x2428cf(0x22d)]=Game_Battler[_0x2428cf(0x1cf)][_0x2428cf(0x22f)],Game_Battler[_0x2428cf(0x1cf)][_0x2428cf(0x22f)]=function(){const _0xf0f8e5=_0x2428cf;VisuMZ[_0xf0f8e5(0x150)][_0xf0f8e5(0x22d)][_0xf0f8e5(0x1f8)](this),this[_0xf0f8e5(0x129)]();},VisuMZ[_0x2428cf(0x150)][_0x2428cf(0x23b)]=Game_Battler[_0x2428cf(0x1cf)]['addState'],Game_Battler[_0x2428cf(0x1cf)][_0x2428cf(0x116)]=function(_0x4fc48c){const _0xcc5025=_0x2428cf;VisuMZ[_0xcc5025(0x150)][_0xcc5025(0x23b)]['call'](this,_0x4fc48c),this['applyProvokeEffect'](_0x4fc48c);},Game_Battler[_0x2428cf(0x1cf)][_0x2428cf(0x199)]=function(_0x2a804c){const _0x5b59ac=_0x2428cf;if(this[_0x5b59ac(0x1bc)](_0x2a804c)){if(_0x5b59ac(0x197)===_0x5b59ac(0x197)){if(this['_provoker']===undefined)this[_0x5b59ac(0x17a)]();const _0x4b2800=BattleManager[_0x5b59ac(0x1f0)](this);this['_provoker'][_0x2a804c]=_0x4b2800,!this['_provoker'][_0x2a804c]&&delete this[_0x5b59ac(0x1ae)][_0x2a804c];}else{function _0x1b92bf(){const _0x30d5b4=_0x5b59ac;return _0x39f41f['AggroControlSystem'][_0x30d5b4(0x171)][_0x30d5b4(0x1f8)](this);}}}},VisuMZ[_0x2428cf(0x150)][_0x2428cf(0x15c)]=BattleManager[_0x2428cf(0x184)],BattleManager[_0x2428cf(0x184)]=function(_0x1f602b,_0x16d5ce){const _0x384fdc=_0x2428cf;this[_0x384fdc(0x148)]=_0x16d5ce,VisuMZ[_0x384fdc(0x150)][_0x384fdc(0x15c)][_0x384fdc(0x1f8)](this,_0x1f602b,_0x16d5ce),this[_0x384fdc(0x148)]=undefined;},VisuMZ[_0x2428cf(0x150)]['BattleManager_invokeMagicReflection']=BattleManager['invokeMagicReflection'],BattleManager[_0x2428cf(0x179)]=function(_0x69ad93,_0x5688b4){const _0x145174=_0x2428cf;this[_0x145174(0x148)]=_0x5688b4,VisuMZ[_0x145174(0x150)][_0x145174(0x1ef)][_0x145174(0x1f8)](this,_0x69ad93,_0x5688b4),this[_0x145174(0x148)]=undefined;},Game_Unit[_0x2428cf(0x1cf)][_0x2428cf(0xf0)]=function(){const _0x5ce0e3=_0x2428cf;return this[_0x5ce0e3(0x20f)]()[_0x5ce0e3(0x22a)](_0x41f83a=>_0x41f83a&&_0x41f83a[_0x5ce0e3(0x21b)]());},Game_Unit[_0x2428cf(0x1cf)][_0x2428cf(0xed)]=function(){const _0x2f714b=_0x2428cf;return this['aliveMembers']()['filter'](_0x5cbb2a=>_0x5cbb2a&&_0x5cbb2a[_0x2f714b(0xf8)]());},Game_Unit['prototype'][_0x2428cf(0xe5)]=function(){const _0x70330c=_0x2428cf;return this['aliveMembers']()[_0x70330c(0x22a)](_0x4ad6a7=>_0x4ad6a7&&_0x4ad6a7[_0x70330c(0x212)]());},Game_Unit['prototype']['randomTauntTarget']=function(_0x1a9856){const _0x1e2c6d=_0x2428cf;let _0x4c76df=[];switch(_0x1a9856){case Game_Action[_0x1e2c6d(0x190)]:_0x4c76df=this['physicalTauntMembers']();break;case Game_Action[_0x1e2c6d(0x1dd)]:_0x4c76df=this['magicalTauntMembers']();break;case Game_Action[_0x1e2c6d(0x1df)]:_0x4c76df=this[_0x1e2c6d(0xe5)]();break;}let _0x40398c=Math[_0x1e2c6d(0x1de)]()*this[_0x1e2c6d(0x1ca)](_0x4c76df),_0x3535d2=null;if(BattleManager[_0x1e2c6d(0x132)]()){const _0x220356=!![];return this[_0x1e2c6d(0x137)](_0x4c76df,_0x220356);}else{if('pNwqx'===_0x1e2c6d(0x113)){function _0x29369e(){const _0x2bd18c=_0x1e2c6d,_0x513362=this[_0x2bd18c(0x1d6)](),_0x20cd92=this['aliveMembers']()[_0x2bd18c(0x22a)](_0x1bebd9=>_0x1bebd9['tgr']===_0x513362);this[_0x2bd18c(0x19c)]=_0x20cd92[_0x1b3175['randomInt'](_0x20cd92[_0x2bd18c(0x1ea)])]||this['randomTarget']();}}else{for(const _0x37ef1c of _0x4c76df){_0x40398c-=_0x37ef1c[_0x1e2c6d(0x167)],_0x40398c<=0x0&&!_0x3535d2&&(_0x3535d2=_0x37ef1c);}return _0x3535d2||this['randomTarget']();}}},Game_Unit[_0x2428cf(0x1cf)][_0x2428cf(0x1ca)]=function(_0x8f8d4a){const _0x55e4bf=_0x2428cf;return _0x8f8d4a[_0x55e4bf(0x120)]((_0x4f58d1,_0x247d19)=>_0x4f58d1+_0x247d19[_0x55e4bf(0x167)],0x0);},Game_Unit['prototype'][_0x2428cf(0x1d6)]=function(){const _0x232a77=_0x2428cf,_0x7d079a=this['aliveMembers']()[_0x232a77(0x1fd)](_0x7792db=>_0x7792db['tgr']);return Math[_0x232a77(0x200)](..._0x7d079a);},Game_Unit['prototype'][_0x2428cf(0x23a)]=function(){const _0x154194=_0x2428cf,_0x38096f=this[_0x154194(0x20f)]()[_0x154194(0x1fd)](_0x309217=>_0x309217[_0x154194(0x167)]);return Math[_0x154194(0x21c)](..._0x38096f);},Game_Unit[_0x2428cf(0x1cf)][_0x2428cf(0x18d)]=function(){const _0x17d60c=_0x2428cf;this[_0x17d60c(0x19c)]=undefined,this[_0x17d60c(0x15e)]=undefined;},Game_Unit[_0x2428cf(0x1cf)][_0x2428cf(0xf5)]=function(){const _0x35be3c=_0x2428cf;if(!this[_0x35be3c(0x19c)]){const _0x1ef88b=this[_0x35be3c(0x1d6)](),_0x5ed360=this[_0x35be3c(0x20f)]()[_0x35be3c(0x22a)](_0x312987=>_0x312987['tgr']===_0x1ef88b);this[_0x35be3c(0x19c)]=_0x5ed360[Math[_0x35be3c(0x156)](_0x5ed360[_0x35be3c(0x1ea)])]||this[_0x35be3c(0x1e7)]();}return this[_0x35be3c(0x19c)];},Game_Unit[_0x2428cf(0x1cf)][_0x2428cf(0x1d2)]=function(){const _0x492a18=_0x2428cf;if(!this[_0x492a18(0x15e)]){const _0x1b4419=this[_0x492a18(0x23a)](),_0x321d7a=this[_0x492a18(0x20f)]()['filter'](_0xf36dd7=>_0xf36dd7[_0x492a18(0x167)]===_0x1b4419);this[_0x492a18(0x15e)]=_0x321d7a[Math[_0x492a18(0x156)](_0x321d7a[_0x492a18(0x1ea)])]||this[_0x492a18(0x1e7)]();}return this[_0x492a18(0x15e)];},VisuMZ[_0x2428cf(0x150)][_0x2428cf(0x15b)]=BattleManager[_0x2428cf(0x169)],BattleManager[_0x2428cf(0x169)]=function(){const _0x185ec0=_0x2428cf;VisuMZ['AggroControlSystem']['BattleManager_endAction'][_0x185ec0(0x1f8)](this),$gameParty[_0x185ec0(0x18d)](),$gameTroop[_0x185ec0(0x18d)]();},Game_Unit[_0x2428cf(0x1cf)][_0x2428cf(0x137)]=function(_0x47e686,_0x33ac13){const _0x285dd6=_0x2428cf,_0xe50038=_0x47e686[_0x285dd6(0x1fd)](_0x5605c7=>_0x5605c7['tgr']),_0x1ec3c8=_0x33ac13?Math[_0x285dd6(0x200)](..._0xe50038):Math[_0x285dd6(0x21c)](..._0xe50038),_0x27dc20=_0x47e686[_0x285dd6(0x22a)](_0x2a669b=>_0x2a669b[_0x285dd6(0x167)]===_0x1ec3c8);return _0x27dc20[Math[_0x285dd6(0x156)](_0x27dc20[_0x285dd6(0x1ea)])]||this[_0x285dd6(0x1e7)]();},VisuMZ[_0x2428cf(0x150)][_0x2428cf(0x10b)]=Scene_Options['prototype']['maxCommands'],Scene_Options[_0x2428cf(0x1cf)][_0x2428cf(0x187)]=function(){const _0x4504ba=_0x2428cf;let _0x47a725=VisuMZ['AggroControlSystem'][_0x4504ba(0x10b)]['call'](this);const _0xa407ab=VisuMZ[_0x4504ba(0x150)][_0x4504ba(0x230)];if(_0xa407ab[_0x4504ba(0x1d8)][_0x4504ba(0x19a)]&&_0xa407ab[_0x4504ba(0x1d8)][_0x4504ba(0xf7)])_0x47a725++;if(_0xa407ab[_0x4504ba(0x112)][_0x4504ba(0x19a)]&&_0xa407ab[_0x4504ba(0x112)][_0x4504ba(0xf7)])_0x47a725++;return _0x47a725;},Sprite_Battler['_animationCycleTime']=VisuMZ[_0x2428cf(0x150)][_0x2428cf(0x230)][_0x2428cf(0x13f)][_0x2428cf(0xdf)],Sprite_Battler[_0x2428cf(0x191)]=VisuMZ[_0x2428cf(0x150)][_0x2428cf(0x230)][_0x2428cf(0x13f)][_0x2428cf(0x14d)],Sprite_Battler[_0x2428cf(0xc9)]=VisuMZ[_0x2428cf(0x150)][_0x2428cf(0x230)][_0x2428cf(0x13f)][_0x2428cf(0x127)],Sprite_Battler['_certainHitTauntAnimation']=VisuMZ[_0x2428cf(0x150)][_0x2428cf(0x230)][_0x2428cf(0x13f)]['AniCertain'],Sprite_Battler['_mirrorActorTauntAnimations']=VisuMZ['AggroControlSystem'][_0x2428cf(0x230)][_0x2428cf(0x13f)][_0x2428cf(0x19e)],Sprite_Battler[_0x2428cf(0x118)]=VisuMZ['AggroControlSystem'][_0x2428cf(0x230)][_0x2428cf(0x13f)][_0x2428cf(0x21d)],VisuMZ[_0x2428cf(0x150)]['Sprite_Battler_initialize']=Sprite_Battler['prototype'][_0x2428cf(0x10f)],Sprite_Battler[_0x2428cf(0x1cf)]['initialize']=function(_0x31bc64){const _0x5b3e02=_0x2428cf;VisuMZ[_0x5b3e02(0x150)][_0x5b3e02(0x173)][_0x5b3e02(0x1f8)](this,_0x31bc64),this[_0x5b3e02(0x1e9)]()&&setTimeout(this[_0x5b3e02(0x158)]['bind'](this),0x3e8);},VisuMZ['AggroControlSystem']['Sprite_Battler_initMembers']=Sprite_Battler[_0x2428cf(0x1cf)]['initMembers'],Sprite_Battler[_0x2428cf(0x1cf)]['initMembers']=function(){const _0x2af4a6=_0x2428cf;VisuMZ['AggroControlSystem']['Sprite_Battler_initMembers'][_0x2af4a6(0x1f8)](this),this[_0x2af4a6(0xcc)]();},Sprite_Battler[_0x2428cf(0x1cf)]['initTauntAnimations']=function(){const _0x1d7f43=_0x2428cf;this[_0x1d7f43(0x12e)]=VisuMZ[_0x1d7f43(0x150)][_0x1d7f43(0x230)][_0x1d7f43(0x13f)]['CycleTime'],this['_tauntAnimationCycle']=[_0x1d7f43(0x170),_0x1d7f43(0x17c),'certainHit'];},Sprite_Battler[_0x2428cf(0x1cf)]['isShowPriorityLines']=function(){const _0x59640d=_0x2428cf;if(!Imported[_0x59640d(0x131)])return![];if(![Sprite_Actor,Sprite_Enemy][_0x59640d(0xfd)](this['constructor']))return![];return ConfigManager['provokeOrigin']&&VisuMZ[_0x59640d(0x150)][_0x59640d(0x230)][_0x59640d(0x1d8)][_0x59640d(0xde)];},Sprite_Battler['prototype'][_0x2428cf(0x158)]=function(){const _0x35af4d=_0x2428cf;if(!SceneManager[_0x35af4d(0xbb)]())return;this[_0x35af4d(0x15a)]=new Sprite_ProvokeTrail(this),this[_0x35af4d(0x15a)][_0x35af4d(0x198)]()[_0x35af4d(0x140)](this[_0x35af4d(0x15a)]);},VisuMZ[_0x2428cf(0x150)][_0x2428cf(0x124)]=Sprite_Battler[_0x2428cf(0x1cf)]['setBattler'],Sprite_Battler[_0x2428cf(0x1cf)][_0x2428cf(0xb9)]=function(_0x506e4f){const _0x272e17=_0x2428cf;VisuMZ[_0x272e17(0x150)][_0x272e17(0x124)][_0x272e17(0x1f8)](this,_0x506e4f);if(this[_0x272e17(0x239)])this[_0x272e17(0x239)][_0x272e17(0x1e8)]=_0x506e4f;},VisuMZ[_0x2428cf(0x150)][_0x2428cf(0xdd)]=Sprite_Battler[_0x2428cf(0x1cf)][_0x2428cf(0x172)],Sprite_Battler['prototype'][_0x2428cf(0x172)]=function(){const _0x441f32=_0x2428cf;VisuMZ[_0x441f32(0x150)][_0x441f32(0xdd)]['call'](this),this['updateTauntAnimations']();},Sprite_Battler[_0x2428cf(0x1cf)][_0x2428cf(0x104)]=function(){const _0xbf101a=_0x2428cf;if(!Imported[_0xbf101a(0x11f)])return;if(!Imported[_0xbf101a(0x131)])return;if(!VisuMZ[_0xbf101a(0x150)][_0xbf101a(0x230)][_0xbf101a(0x13f)][_0xbf101a(0x1e5)])return;if(!this[_0xbf101a(0x1e8)])return;this[_0xbf101a(0x12e)]--,this[_0xbf101a(0x12e)]<=0x0&&this[_0xbf101a(0xeb)]();},Sprite_Battler[_0x2428cf(0x1cf)]['startNewTauntAnimation']=function(){const _0x37859d=_0x2428cf;this['_tauntAnimationTimer']=Sprite_Battler[_0x37859d(0x1f9)];if(!this[_0x37859d(0x1e8)])return;if(!this[_0x37859d(0x1e8)][_0x37859d(0x217)]())return;const _0x64203c=[this[_0x37859d(0x1e8)]],_0x28dc57=this['getNextTauntAnimation'](),_0xf56f2b=this[_0x37859d(0x1e8)][_0x37859d(0x1f5)]()&&Sprite_Battler[_0x37859d(0xda)],_0x9b8091=Sprite_Battler[_0x37859d(0x118)];$gameTemp['requestFauxAnimation'](_0x64203c,_0x28dc57,_0xf56f2b,_0x9b8091);},Sprite_Battler[_0x2428cf(0x1cf)][_0x2428cf(0x243)]=function(){const _0x29617a=_0x2428cf;let _0xcc6806=this['_tauntAnimationCycle'][_0x29617a(0x1ea)];while(_0xcc6806){if(_0x29617a(0x1b7)!==_0x29617a(0x1b7)){function _0x1e4f69(){const _0x1591a5=_0x29617a;let _0x2a3967=_0x2975c8[_0x1591a5(0x150)][_0x1591a5(0x1e6)][_0x1591a5(0x1f8)](this);if(this['isAggroType']()&&this['_battler']){if(this[_0x1591a5(0x1e8)][_0x1591a5(0x19b)]())return 0x0;if(this['_battler']['isAlive']()&&this[_0x1591a5(0x1e8)][_0x1591a5(0x14c)]()[_0x1591a5(0x20f)]()[_0x1591a5(0x1ea)]===0x1)return 0x1;}return _0x2a3967[_0x1591a5(0x183)](0x0,0x1);}}else{const _0x3804e4=this[_0x29617a(0x13c)][_0x29617a(0x176)]();this['_tauntAnimationCycle']['push'](_0x3804e4);const _0x2a4c06=_0x29617a(0x14e)[_0x29617a(0x21f)](_0x3804e4);if(this[_0x29617a(0x1e8)][_0x2a4c06]()){const _0xdfc9c9=_0x29617a(0xc8)[_0x29617a(0x21f)](_0x3804e4),_0x5f12fb=Sprite_Battler[_0xdfc9c9];if(_0x5f12fb)return _0x5f12fb;}_0xcc6806--;}}return Sprite_Battler[_0x29617a(0x205)];},VisuMZ['AggroControlSystem']['Sprite_Actor_createStateSprite']=Sprite_Actor[_0x2428cf(0x1cf)][_0x2428cf(0x244)],Sprite_Actor[_0x2428cf(0x1cf)][_0x2428cf(0x244)]=function(){const _0x4a21ba=_0x2428cf;VisuMZ[_0x4a21ba(0x150)]['Sprite_Actor_createStateSprite'][_0x4a21ba(0x1f8)](this),this[_0x4a21ba(0x17e)]();},Sprite_Actor['prototype'][_0x2428cf(0x17e)]=function(){const _0x29d519=_0x2428cf;if(this['constructor']!==Sprite_Actor)return;if(!this['isAggroGaugeVisible']())return;if(!SceneManager[_0x29d519(0xbb)]())return;const _0x30d2c6=VisuMZ['AggroControlSystem'][_0x29d519(0x230)][_0x29d519(0x112)],_0x4cdba8=new Sprite_Gauge();_0x4cdba8[_0x29d519(0x1a3)]['x']=_0x30d2c6[_0x29d519(0x125)],_0x4cdba8['anchor']['y']=_0x30d2c6[_0x29d519(0x10e)];const _0x5a4aa5=Sprite_Gauge[_0x29d519(0x1cf)][_0x29d519(0x229)]();_0x4cdba8[_0x29d519(0x1b8)]['x']=_0x4cdba8['scale']['y']=_0x30d2c6['Scale'],this[_0x29d519(0x239)]=_0x4cdba8,this[_0x29d519(0x140)](_0x4cdba8);},Sprite_Actor[_0x2428cf(0x1cf)]['isAggroGaugeVisible']=function(){const _0xce8e99=_0x2428cf;if(Imported[_0xce8e99(0x131)]&&this[_0xce8e99(0xc7)]===Sprite_SvEnemy)return![];return ConfigManager[_0xce8e99(0x1ac)]&&VisuMZ[_0xce8e99(0x150)]['Settings'][_0xce8e99(0x112)]['VisibleGauge'];},VisuMZ[_0x2428cf(0x150)][_0x2428cf(0x21a)]=Sprite_Actor[_0x2428cf(0x1cf)]['update'],Sprite_Actor[_0x2428cf(0x1cf)][_0x2428cf(0x172)]=function(){const _0x90ae45=_0x2428cf;VisuMZ[_0x90ae45(0x150)][_0x90ae45(0x21a)]['call'](this),this[_0x90ae45(0xbf)]();},Sprite_Actor[_0x2428cf(0x1cf)][_0x2428cf(0xbf)]=function(){const _0x430a94=_0x2428cf;if(!this[_0x430a94(0x1e8)])return;if(!this[_0x430a94(0x239)])return;const _0x8a7cc0=VisuMZ[_0x430a94(0x150)][_0x430a94(0x230)][_0x430a94(0x112)],_0x29d8c3=this[_0x430a94(0x239)];let _0x3e175b=_0x8a7cc0['OffsetX'];if(this['_battler'][_0x430a94(0x1cd)]){if(_0x430a94(0xc0)!==_0x430a94(0xc0)){function _0x39210a(){const _0x43711c=_0x430a94;let _0x2adf3d=_0x5d3aea['AggroControlSystem'][_0x43711c(0x1fb)]['call'](this,_0x2f1f05);if(_0x43e617===0x0){if(this[_0x43711c(0x159)]===_0x127481)this[_0x43711c(0x129)]();_0x2adf3d*=this[_0x43711c(0x1da)]();}return _0x2adf3d;}}else _0x3e175b+=this['_battler'][_0x430a94(0x1cd)]();}let _0xf897d=_0x8a7cc0[_0x430a94(0x11d)];this['_battler']['battleUIOffsetY']&&(_0xf897d+=this[_0x430a94(0x1e8)][_0x430a94(0x1fa)]()),_0x29d8c3['x']=_0x3e175b,_0x29d8c3['y']=-this['height']+_0xf897d,this['_battler']&&_0x29d8c3[_0x430a94(0x202)]!==_0x430a94(0x1da)&&(_0x29d8c3[_0x430a94(0x1c0)]=!![],_0x29d8c3['setup'](this['_battler'],_0x430a94(0x1da))),this[_0x430a94(0x1b8)]['x']<0x0&&(_0x29d8c3[_0x430a94(0x1b8)]['x']=-Math[_0x430a94(0x192)](_0x29d8c3[_0x430a94(0x1b8)]['x']));},Sprite_Gauge['prototype'][_0x2428cf(0x207)]=function(){const _0x501f7b=_0x2428cf;return this[_0x501f7b(0x1e8)]&&this['_statusType']===_0x501f7b(0x1da);},VisuMZ[_0x2428cf(0x150)]['Sprite_Gauge_gaugeX']=Sprite_Gauge[_0x2428cf(0x1cf)][_0x2428cf(0x12a)],Sprite_Gauge[_0x2428cf(0x1cf)]['gaugeX']=function(){const _0x36ae72=_0x2428cf;if(this[_0x36ae72(0x207)]()){if(_0x36ae72(0x134)!==_0x36ae72(0x134)){function _0x3d7810(){return _0x4c76e2(_0x19da8f['$1'])*0.01;}}else return 0x0;}else return VisuMZ[_0x36ae72(0x150)][_0x36ae72(0x16b)][_0x36ae72(0x1f8)](this);},VisuMZ['AggroControlSystem'][_0x2428cf(0x1e6)]=Sprite_Gauge[_0x2428cf(0x1cf)]['gaugeRate'],Sprite_Gauge['prototype'][_0x2428cf(0x216)]=function(){const _0x5b50ab=_0x2428cf;let _0x81539=VisuMZ[_0x5b50ab(0x150)][_0x5b50ab(0x1e6)][_0x5b50ab(0x1f8)](this);if(this[_0x5b50ab(0x207)]()&&this[_0x5b50ab(0x1e8)]){if(_0x5b50ab(0xd7)!==_0x5b50ab(0xd7)){function _0x3ed033(){if(!_0x5bce3f)return![];return _0x315271['note']['match'](/<BYPASS TAUNT>/i);}}else{if(this[_0x5b50ab(0x1e8)][_0x5b50ab(0x19b)]())return 0x0;if(this[_0x5b50ab(0x1e8)][_0x5b50ab(0x161)]()&&this[_0x5b50ab(0x1e8)][_0x5b50ab(0x14c)]()[_0x5b50ab(0x20f)]()[_0x5b50ab(0x1ea)]===0x1)return 0x1;}}return _0x81539[_0x5b50ab(0x183)](0x0,0x1);},VisuMZ[_0x2428cf(0x150)][_0x2428cf(0x14f)]=Sprite_Gauge[_0x2428cf(0x1cf)][_0x2428cf(0x16e)],Sprite_Gauge[_0x2428cf(0x1cf)][_0x2428cf(0x16e)]=function(){const _0x465f63=_0x2428cf;return this['isAggroType']()?this[_0x465f63(0x1d3)]():VisuMZ[_0x465f63(0x150)][_0x465f63(0x14f)][_0x465f63(0x1f8)](this);},Sprite_Gauge[_0x2428cf(0x1cf)][_0x2428cf(0x1d3)]=function(){const _0x48d8fd=_0x2428cf,_0x5c1268=this[_0x48d8fd(0x1e8)][_0x48d8fd(0x14c)](),_0x22cc60=this[_0x48d8fd(0x1e8)][_0x48d8fd(0x167)]-_0x5c1268[_0x48d8fd(0x23a)](),_0x2b1217=_0x5c1268[_0x48d8fd(0x1d6)]()-_0x5c1268[_0x48d8fd(0x23a)]();if(_0x22cc60>=_0x2b1217)return 0x64;return _0x22cc60/Math[_0x48d8fd(0x200)](_0x2b1217,0x1)*0x64;},VisuMZ[_0x2428cf(0x150)]['Sprite_Gauge_currentMaxValue']=Sprite_Gauge[_0x2428cf(0x1cf)][_0x2428cf(0x189)],Sprite_Gauge['prototype'][_0x2428cf(0x189)]=function(){const _0x1a9e5a=_0x2428cf;return this[_0x1a9e5a(0x207)]()?this[_0x1a9e5a(0x20d)]():VisuMZ[_0x1a9e5a(0x150)][_0x1a9e5a(0x1b0)][_0x1a9e5a(0x1f8)](this);},Sprite_Gauge['prototype'][_0x2428cf(0x20d)]=function(){return 0x64;},VisuMZ[_0x2428cf(0x150)]['Sprite_Gauge_gaugeColor1']=Sprite_Gauge[_0x2428cf(0x1cf)][_0x2428cf(0xef)],Sprite_Gauge[_0x2428cf(0x1cf)]['gaugeColor1']=function(){const _0x56058f=_0x2428cf;return this['isAggroType']()?ColorManager[_0x56058f(0x1a8)]():VisuMZ[_0x56058f(0x150)]['Sprite_Gauge_gaugeColor1']['call'](this);},VisuMZ[_0x2428cf(0x150)][_0x2428cf(0x23c)]=Sprite_Gauge[_0x2428cf(0x1cf)][_0x2428cf(0x1e2)],Sprite_Gauge[_0x2428cf(0x1cf)][_0x2428cf(0x1e2)]=function(){const _0x1c391b=_0x2428cf;return this[_0x1c391b(0x207)]()?ColorManager[_0x1c391b(0xd5)]():VisuMZ[_0x1c391b(0x150)][_0x1c391b(0x23c)]['call'](this);},VisuMZ['AggroControlSystem'][_0x2428cf(0x1a0)]=Sprite_Gauge[_0x2428cf(0x1cf)][_0x2428cf(0x172)],Sprite_Gauge[_0x2428cf(0x1cf)]['update']=function(){const _0x8754ef=_0x2428cf;VisuMZ[_0x8754ef(0x150)][_0x8754ef(0x1a0)][_0x8754ef(0x1f8)](this),this[_0x8754ef(0xec)]();},Sprite_Gauge[_0x2428cf(0x1cf)][_0x2428cf(0xec)]=function(){const _0x110842=_0x2428cf;if(!this[_0x110842(0x207)]())return;if(!Imported[_0x110842(0x131)])return;const _0x34c8ce=this[_0x110842(0x1e8)][_0x110842(0x11c)]();if(this[_0x110842(0xff)])this[_0x110842(0x109)]=0xff;else _0x34c8ce&&_0x34c8ce[_0x110842(0x109)]>0x0?this[_0x110842(0x109)]=0xff:this[_0x110842(0x109)]=0x0;},VisuMZ[_0x2428cf(0x150)][_0x2428cf(0xd0)]=Sprite_Gauge[_0x2428cf(0x1cf)][_0x2428cf(0x242)],Sprite_Gauge[_0x2428cf(0x1cf)][_0x2428cf(0x242)]=function(){const _0x10408d=_0x2428cf;if(this[_0x10408d(0x207)]())return;VisuMZ[_0x10408d(0x150)][_0x10408d(0xd0)][_0x10408d(0x1f8)](this);};function Sprite_ProvokeTrail(){const _0x53429d=_0x2428cf;this[_0x53429d(0x10f)](...arguments);}Sprite_ProvokeTrail['prototype']=Object[_0x2428cf(0x115)](Sprite[_0x2428cf(0x1cf)]),Sprite_ProvokeTrail[_0x2428cf(0x1cf)][_0x2428cf(0xc7)]=Sprite_ProvokeTrail,Sprite_ProvokeTrail[_0x2428cf(0x1cf)][_0x2428cf(0x10f)]=function(_0x3f9a75){const _0x5f4dad=_0x2428cf;this[_0x5f4dad(0x186)]=_0x3f9a75,Sprite[_0x5f4dad(0x1cf)][_0x5f4dad(0x10f)][_0x5f4dad(0x1f8)](this),this['initMembers'](),this[_0x5f4dad(0x235)]();},Sprite_ProvokeTrail[_0x2428cf(0x1cf)][_0x2428cf(0x135)]=function(){const _0x454f6b=_0x2428cf,_0x444875=VisuMZ[_0x454f6b(0x150)]['Settings'][_0x454f6b(0x1d8)];this[_0x454f6b(0x1a3)]['x']=0.5,this[_0x454f6b(0x1a3)]['y']=0.5,this[_0x454f6b(0xcf)]=0x0,this[_0x454f6b(0x1d4)]=0x0,this[_0x454f6b(0xf1)]=0x0,this['_targetY']=0x0,this[_0x454f6b(0x109)]=0x0,this[_0x454f6b(0x1ad)]=_0x444875[_0x454f6b(0x1e4)],this[_0x454f6b(0x209)]=_0x444875[_0x454f6b(0x1e1)];},Sprite_ProvokeTrail[_0x2428cf(0x1cf)][_0x2428cf(0x18e)]=function(){const _0x459b65=_0x2428cf;return VisuMZ[_0x459b65(0x150)][_0x459b65(0x230)][_0x459b65(0x1d8)][_0x459b65(0x175)];},Sprite_ProvokeTrail['prototype'][_0x2428cf(0x143)]=function(){const _0x664754=_0x2428cf;return VisuMZ['AggroControlSystem'][_0x664754(0x230)][_0x664754(0x1d8)][_0x664754(0x164)]/0x64;},Sprite_ProvokeTrail['prototype']['createChildSprites']=function(){const _0x3651a7=_0x2428cf;this[_0x3651a7(0x1b2)]=[];let _0x467c1f=0x0;for(let _0xc6ebb6=0x0;_0xc6ebb6<=this['maxSprites']();_0xc6ebb6++){const _0x14c5b9=new Sprite();_0x14c5b9['bitmap']=ImageManager['provokeBitmap'](),_0x14c5b9['anchor']['x']=0.5,_0x14c5b9[_0x3651a7(0x1a3)]['y']=0.5,_0x14c5b9[_0x3651a7(0x1b8)]['x']=_0x14c5b9[_0x3651a7(0x1b8)]['y']=this[_0x3651a7(0x143)](),_0x14c5b9[_0x3651a7(0x109)]=_0x467c1f,_0x14c5b9[_0x3651a7(0x209)]=this[_0x3651a7(0x209)],this['addChild'](_0x14c5b9),this[_0x3651a7(0x1b2)][_0x3651a7(0x121)](_0x14c5b9),_0x467c1f+=this[_0x3651a7(0x1ad)];if(_0x467c1f>=0xff)_0x467c1f=0x0;}},Sprite_ProvokeTrail['prototype'][_0x2428cf(0xd8)]=function(){const _0x5121eb=_0x2428cf;return this[_0x5121eb(0x186)][_0x5121eb(0xc7)]===Sprite_Actor;},Sprite_ProvokeTrail[_0x2428cf(0x1cf)][_0x2428cf(0x198)]=function(){const _0x1696ca=_0x2428cf;return SceneManager[_0x1696ca(0x1cb)][_0x1696ca(0xe4)][_0x1696ca(0x174)];},Sprite_ProvokeTrail[_0x2428cf(0x1cf)][_0x2428cf(0x172)]=function(){const _0x45f71c=_0x2428cf;Sprite[_0x45f71c(0x1cf)][_0x45f71c(0x172)][_0x45f71c(0x1f8)](this),this['updateBattlerPositions'](),this['updateSubPositions'](),this[_0x45f71c(0x195)](),this[_0x45f71c(0x14b)]();},Sprite_ProvokeTrail[_0x2428cf(0x1cf)][_0x2428cf(0x1f7)]=function(){const _0x5be431=_0x2428cf;return VisuMZ['AggroControlSystem'][_0x5be431(0x230)]['Provoke'][_0x5be431(0x225)];},Sprite_ProvokeTrail[_0x2428cf(0x1cf)][_0x2428cf(0xd4)]=function(){const _0x539bc7=_0x2428cf;if(!this[_0x539bc7(0x186)][_0x539bc7(0x1e8)])return;if(!this['_mainSprite']['_battler']['provoker']())return;const _0x135c87=this['_mainSprite'][_0x539bc7(0x1e8)][_0x539bc7(0x162)]()['battler']();if(!_0x135c87)return;const _0x2a534c=this[_0x539bc7(0x186)][_0x539bc7(0x1e8)][_0x539bc7(0x146)](),_0x18c642=this['_mainSprite']['_battler'][_0x539bc7(0x162)]()[_0x539bc7(0x146)]();this['_homeX']=this[_0x539bc7(0x186)]['x'],this[_0x539bc7(0x1d4)]=this[_0x539bc7(0x186)]['y']-this[_0x539bc7(0x186)][_0x539bc7(0x16c)]*_0x2a534c,this['_targetX']=_0x135c87['x'],this[_0x539bc7(0xcb)]=_0x135c87['y']-_0x135c87[_0x539bc7(0x16c)]*_0x18c642,this['_homeX']+=Math[_0x539bc7(0x13a)]((Graphics[_0x539bc7(0x1c4)]-Graphics[_0x539bc7(0x16d)])/0x2),this[_0x539bc7(0x1d4)]+=Math[_0x539bc7(0x13a)]((Graphics['height']-Graphics[_0x539bc7(0x15f)])/0x2),this['_targetX']+=Math[_0x539bc7(0x13a)]((Graphics[_0x539bc7(0x1c4)]-Graphics[_0x539bc7(0x16d)])/0x2),this[_0x539bc7(0xcb)]+=Math['round']((Graphics[_0x539bc7(0x16c)]-Graphics[_0x539bc7(0x15f)])/0x2);if(!$gameSystem[_0x539bc7(0x22e)]()){if(_0x539bc7(0x211)!==_0x539bc7(0x211)){function _0x308978(){const _0x2ef862=_0x539bc7;return this['traitObjects']()[_0x2ef862(0x145)](_0x475cfa=>_0x475cfa&&_0x475cfa[_0x2ef862(0x178)][_0x2ef862(0xd6)](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));}}else{if(_0x135c87['_battler'][_0x539bc7(0x1f5)]())visible=!![],this['_targetX']+=SceneManager[_0x539bc7(0x1cb)]['_statusWindow']['x'],this['_targetY']+=SceneManager[_0x539bc7(0x1cb)][_0x539bc7(0x23e)]['y'];else _0x135c87[_0x539bc7(0x1e8)][_0x539bc7(0x20b)]()&&(visible=!![],this[_0x539bc7(0xcf)]+=SceneManager['_scene'][_0x539bc7(0x23e)]['x'],this[_0x539bc7(0x1d4)]+=SceneManager[_0x539bc7(0x1cb)][_0x539bc7(0x23e)]['y']);}}},Sprite_ProvokeTrail[_0x2428cf(0x1cf)]['arcHeight']=function(){const _0x424d35=_0x2428cf;return VisuMZ['AggroControlSystem'][_0x424d35(0x230)][_0x424d35(0x1d8)][_0x424d35(0x1a2)];},Sprite_ProvokeTrail[_0x2428cf(0x1cf)][_0x2428cf(0x213)]=function(){const _0x577c42=_0x2428cf;if(!this[_0x577c42(0x186)][_0x577c42(0x1e8)])return;if(!this[_0x577c42(0x186)]['_battler'][_0x577c42(0x162)]())return;if(!this[_0x577c42(0x1b2)])return;if(this[_0x577c42(0x1b2)][_0x577c42(0x1ea)]<=0x0)return;const _0x9c38fd=(this[_0x577c42(0xf1)]-this[_0x577c42(0xcf)])/this['maxSprites'](),_0x599ee3=(this['_targetY']-this[_0x577c42(0x1d4)])/this[_0x577c42(0x18e)]();for(let _0x5f4e47=0x0;_0x5f4e47<=this[_0x577c42(0x18e)]();_0x5f4e47++){if(_0x577c42(0x11a)==='rlLhw'){const _0x88166=this['_sprites'][_0x5f4e47];if(!_0x88166)continue;_0x88166['x']=this[_0x577c42(0xcf)]+_0x9c38fd*_0x5f4e47;const _0x4afdd2=this[_0x577c42(0x18e)]()-_0x5f4e47,_0x1bbcc2=this[_0x577c42(0x18e)]()/0x2,_0xd67d91=this['arcHeight'](),_0x58f1f7=-_0xd67d91/Math['pow'](_0x1bbcc2,0x2),_0x4db684=_0x58f1f7*Math[_0x577c42(0x1b4)](_0x4afdd2-_0x1bbcc2,0x2)+_0xd67d91;_0x88166['y']=this[_0x577c42(0x1d4)]+_0x599ee3*_0x5f4e47-_0x4db684;}else{function _0x146986(){const _0x405470=_0x577c42,_0x1f596c=_0x4c11e9['inputtingAction'](),_0x5bdd59=_0x285485[_0x405470(0x194)]();if(!_0x1f596c)return![];if(!_0x5bdd59)return![];if(_0x198db1[_0x405470(0x188)](_0x1f596c[_0x405470(0xc3)]()))return![];if(_0x5bdd59[_0x405470(0xf3)]())return![];return _0x5bdd59[_0x405470(0xd9)]()?(this['_enemies']=[_0x5bdd59['provoker']()],!![]):![];}}}},Sprite_ProvokeTrail[_0x2428cf(0x1cf)]['maxOpacity']=function(){const _0x2fd33a=_0x2428cf;return VisuMZ[_0x2fd33a(0x150)]['Settings'][_0x2fd33a(0x1d8)][_0x2fd33a(0x1a7)];},Sprite_ProvokeTrail[_0x2428cf(0x1cf)]['updateOpacity']=function(){const _0x266056=_0x2428cf,_0x3fdd56=this[_0x266056(0x186)][_0x266056(0x1e8)];if(!_0x3fdd56)this[_0x266056(0x109)]=0x0;else{if(_0x3fdd56[_0x266056(0x161)]()&&_0x3fdd56[_0x266056(0x162)]()){if(_0x266056(0x13e)!==_0x266056(0x13e)){function _0x2084a7(){const _0x26c31f=_0x266056,_0x464769=this[_0x26c31f(0x13c)][_0x26c31f(0x176)]();this[_0x26c31f(0x13c)][_0x26c31f(0x121)](_0x464769);const _0x5286fb=_0x26c31f(0x14e)[_0x26c31f(0x21f)](_0x464769);if(this[_0x26c31f(0x1e8)][_0x5286fb]()){const _0x13af9a='_%1TauntAnimation'[_0x26c31f(0x21f)](_0x464769),_0x55992d=_0x56a1e3[_0x13af9a];if(_0x55992d)return _0x55992d;}_0x50ffcb--;}}else this['opacity']=0xff;}else this[_0x266056(0x109)]=0x0;}},Sprite_ProvokeTrail[_0x2428cf(0x1cf)][_0x2428cf(0x14b)]=function(){const _0x1462f5=_0x2428cf;if(!this['_mainSprite'][_0x1462f5(0x1e8)])return;if(!this[_0x1462f5(0x186)][_0x1462f5(0x1e8)][_0x1462f5(0x162)]())return;if(!this[_0x1462f5(0x1b2)])return;if(this[_0x1462f5(0x1b2)][_0x1462f5(0x1ea)]<=0x0)return;for(let _0x2fe44e=0x0;_0x2fe44e<=this['maxSprites']();_0x2fe44e++){if('iQygg'!=='UZulO'){const _0x5c479c=this[_0x1462f5(0x1b2)][this[_0x1462f5(0xd8)]()?this[_0x1462f5(0x18e)]()-_0x2fe44e:_0x2fe44e];if(!_0x5c479c)continue;_0x5c479c['opacity']-=this['_opacitySpeed'];if(_0x5c479c[_0x1462f5(0x109)]<=0x0)_0x5c479c[_0x1462f5(0x109)]=0xff;}else{function _0x1f5b24(){const _0x5bd5da=_0x1462f5;return this[_0x5bd5da(0xc5)]()['some'](_0x5a41d4=>_0x5a41d4&&_0x5a41d4[_0x5bd5da(0x178)]['match'](/<BYPASS TAUNT>/i));}}}},VisuMZ[_0x2428cf(0x150)]['Spriteset_Battle_createBattleField']=Spriteset_Battle[_0x2428cf(0x1cf)][_0x2428cf(0xe0)],Spriteset_Battle[_0x2428cf(0x1cf)][_0x2428cf(0xe0)]=function(){const _0x3e00ba=_0x2428cf;VisuMZ['AggroControlSystem'][_0x3e00ba(0xce)]['call'](this),this[_0x3e00ba(0x241)]();},Spriteset_Battle[_0x2428cf(0x1cf)]['createBattleFieldAggroControl']=function(){const _0x5f4558=_0x2428cf;if(!Imported[_0x5f4558(0x131)])return;const _0x2915c8=this[_0x5f4558(0xdc)]['x'],_0x1785ce=this[_0x5f4558(0xdc)]['y'],_0x49bcc7=this[_0x5f4558(0xdc)][_0x5f4558(0x1c4)],_0x441059=this[_0x5f4558(0xdc)][_0x5f4558(0x16c)];this['_provokeContainer']=new Sprite(),this['_provokeContainer'][_0x5f4558(0x21e)](0x0,0x0,_0x49bcc7,_0x441059),this[_0x5f4558(0x174)]['x']=_0x2915c8,this[_0x5f4558(0x174)]['y']=_0x1785ce;if(Imported[_0x5f4558(0x131)]){const _0x3226c5=this['children'][_0x5f4558(0x1fc)](this[_0x5f4558(0x22c)]);this['addChildAt'](this[_0x5f4558(0x174)],_0x3226c5);}else{if('SKKcc'!==_0x5f4558(0xf2)){function _0x542092(){const _0x41efa6=_0x5f4558;return this[_0x41efa6(0x207)]()?0x0:_0x4860b2[_0x41efa6(0x150)][_0x41efa6(0x16b)][_0x41efa6(0x1f8)](this);}}else this[_0x5f4558(0x140)](this[_0x5f4558(0x174)]);}},VisuMZ['AggroControlSystem'][_0x2428cf(0x1a1)]=Spriteset_Battle[_0x2428cf(0x1cf)][_0x2428cf(0x172)],Spriteset_Battle[_0x2428cf(0x1cf)][_0x2428cf(0x172)]=function(){const _0x5d7434=_0x2428cf;VisuMZ[_0x5d7434(0x150)][_0x5d7434(0x1a1)][_0x5d7434(0x1f8)](this),this[_0x5d7434(0x228)]();},Spriteset_Battle[_0x2428cf(0x1cf)][_0x2428cf(0x228)]=function(){const _0x267c79=_0x2428cf;if(!this['_provokeContainer'])return;if(!this[_0x267c79(0x22c)])return;this[_0x267c79(0x174)]['x']=this[_0x267c79(0x22c)]['x'],this[_0x267c79(0x174)]['y']=this['_damageContainer']['y'];},VisuMZ['AggroControlSystem']['Window_BattleEnemy_refresh']=Window_BattleEnemy[_0x2428cf(0x1cf)]['refresh'],Window_BattleEnemy[_0x2428cf(0x1cf)]['refresh']=function(){const _0x3ac89d=_0x2428cf;if(this[_0x3ac89d(0x219)]()){if('FksKO'!==_0x3ac89d(0x101)){function _0xc8a27d(){const _0x50e00a=_0x3ac89d,_0x2379fa=_0x33f35d[_0x50e00a(0x1ac)],_0x2fc4d5=_0x50e00a(0x1ac);this[_0x50e00a(0x1a4)](_0x2379fa,_0x2fc4d5);}}else Imported[_0x3ac89d(0x131)]&&this['sortEnemies'](),Window_Selectable[_0x3ac89d(0x1cf)][_0x3ac89d(0x248)][_0x3ac89d(0x1f8)](this);}else{if(this[_0x3ac89d(0x17b)]()){if(_0x3ac89d(0x231)===_0x3ac89d(0x231))Imported[_0x3ac89d(0x131)]&&this['sortEnemies'](),Window_Selectable['prototype']['refresh'][_0x3ac89d(0x1f8)](this);else{function _0x298de2(){return 0x64;}}}else VisuMZ[_0x3ac89d(0x150)][_0x3ac89d(0x1f2)]['call'](this);}},Window_BattleEnemy[_0x2428cf(0x1cf)][_0x2428cf(0x219)]=function(){const _0x5ee99c=_0x2428cf,_0x2978cb=BattleManager['inputtingAction'](),_0x40e810=BattleManager[_0x5ee99c(0x194)]();if(!_0x2978cb)return![];if(!_0x40e810)return![];if(DataManager['isBypassProvoke'](_0x2978cb[_0x5ee99c(0xc3)]()))return![];if(_0x40e810[_0x5ee99c(0xf3)]())return![];return _0x40e810[_0x5ee99c(0xd9)]()?(this[_0x5ee99c(0x147)]=[_0x40e810[_0x5ee99c(0x162)]()],!![]):![];},Window_BattleEnemy[_0x2428cf(0x1cf)]['applyTauntFilters']=function(){const _0x485f61=_0x2428cf,_0x2030c4=BattleManager[_0x485f61(0x234)](),_0x5ad598=BattleManager['actor'](),_0x3ce371=$gameTroop;if(!_0x2030c4)return![];if(!_0x5ad598)return![];if(!_0x2030c4[_0x485f61(0xc3)]())return![];if(DataManager[_0x485f61(0x18a)](_0x2030c4['item']()))return![];if(_0x5ad598[_0x485f61(0x177)]())return![];if(_0x2030c4['isPhysical']()&&_0x3ce371[_0x485f61(0xf0)]()[_0x485f61(0x1ea)]>0x0){if(_0x485f61(0x237)===_0x485f61(0x237))this[_0x485f61(0x147)]=_0x3ce371[_0x485f61(0xf0)]();else{function _0xd2cbdd(){const _0x368c75=_0x485f61;return this[_0x368c75(0x1f3)](_0xca8f77(_0x539882));}}}else{if(_0x2030c4[_0x485f61(0xee)]()&&_0x3ce371['magicalTauntMembers']()['length']>0x0)this[_0x485f61(0x147)]=_0x3ce371[_0x485f61(0xed)]();else{if(_0x2030c4[_0x485f61(0x15d)]()&&_0x3ce371[_0x485f61(0xe5)]()[_0x485f61(0x1ea)]>0x0){if(_0x485f61(0x14a)===_0x485f61(0x166)){function _0x5c9d47(){const _0x462a15=_0x485f61;return[_0x1b8dbf[_0x462a15(0xf5)]()];}}else this[_0x485f61(0x147)]=_0x3ce371['certainHitTauntMembers']();}else{if(_0x485f61(0x1d7)===_0x485f61(0x1d7))return![];else{function _0x1f8860(){const _0x3150e0=_0x485f61;if(this['battleLayoutStyle']()===_0x3150e0(0x133)){let _0x15d5ca=this[_0x3150e0(0x119)](_0x255584);_0x20a3f4=_0x233322[_0x3150e0(0x13a)](_0x15d5ca['y']+(_0x15d5ca['height']-_0x532fee[_0x3150e0(0x1cf)][_0x3150e0(0x1cc)]())/0x2);}}}}}}return!![];},VisuMZ['AggroControlSystem']['Window_Options_addGeneralOptions']=Window_Options[_0x2428cf(0x1cf)][_0x2428cf(0x1c9)],Window_Options[_0x2428cf(0x1cf)][_0x2428cf(0x1c9)]=function(){const _0x1b390e=_0x2428cf;VisuMZ['AggroControlSystem'][_0x1b390e(0xc1)][_0x1b390e(0x1f8)](this),this[_0x1b390e(0x227)]();},Window_Options[_0x2428cf(0x1cf)][_0x2428cf(0x227)]=function(){const _0x160e12=_0x2428cf;if(VisuMZ['AggroControlSystem'][_0x160e12(0x230)][_0x160e12(0x1d8)][_0x160e12(0x19a)]){if('jgwXJ'===_0x160e12(0xfa))this['addAggroControlSystemProvokeCommand']();else{function _0x2ef0b4(){const _0x55535c=_0x160e12,_0x3a5a89=_0xb047c0['map'](_0x4f598e=>_0x4f598e[_0x55535c(0x167)]),_0x5ad16d=_0x3748f7?_0x48ed10[_0x55535c(0x200)](..._0x3a5a89):_0x1b6562[_0x55535c(0x21c)](..._0x3a5a89),_0x11ce7f=_0xbebad7[_0x55535c(0x22a)](_0x721b0c=>_0x721b0c['tgr']===_0x5ad16d);return _0x11ce7f[_0x57190d[_0x55535c(0x156)](_0x11ce7f[_0x55535c(0x1ea)])]||this['randomTarget']();}}}VisuMZ[_0x160e12(0x150)][_0x160e12(0x230)]['Aggro'][_0x160e12(0x19a)]&&this['addAggroControlSystemAggroCommand']();},Window_Options['prototype'][_0x2428cf(0x1f6)]=function(){const _0x6aeec2=_0x2428cf,_0xe4cdb8=TextManager[_0x6aeec2(0x206)],_0x5e9400=_0x6aeec2(0x206);this[_0x6aeec2(0x1a4)](_0xe4cdb8,_0x5e9400);},Window_Options[_0x2428cf(0x1cf)][_0x2428cf(0x1c6)]=function(){const _0x2ae823=_0x2428cf,_0x5e8513=TextManager[_0x2ae823(0x1ac)],_0x2e597d=_0x2ae823(0x1ac);this['addCommand'](_0x5e8513,_0x2e597d);},VisuMZ[_0x2428cf(0x150)]['Window_StatusBase_placeActorName']=Window_StatusBase[_0x2428cf(0x1cf)][_0x2428cf(0xbe)],Window_StatusBase['prototype']['placeActorName']=function(_0x18ffe9,_0x4c8fea,_0x583b48){const _0x466e5e=_0x2428cf;if(this[_0x466e5e(0x222)]())this['drawAggroGauge'](_0x18ffe9['index']());VisuMZ[_0x466e5e(0x150)][_0x466e5e(0x1ba)][_0x466e5e(0x1f8)](this,_0x18ffe9,_0x4c8fea,_0x583b48);},Window_StatusBase[_0x2428cf(0x1cf)][_0x2428cf(0x222)]=function(){const _0x13eaff=_0x2428cf;if(![Window_BattleActor,Window_BattleStatus]['includes'](this[_0x13eaff(0xc7)]))return![];if(!SceneManager[_0x13eaff(0xbb)]())return![];return ConfigManager[_0x13eaff(0x1ac)]&&VisuMZ[_0x13eaff(0x150)][_0x13eaff(0x230)][_0x13eaff(0x112)]['StatusGauge'];},Window_StatusBase[_0x2428cf(0x1cf)]['placeAggroGauge']=function(_0x5187c2,_0x56a8b6,_0x456000){const _0xe26f2c=_0x2428cf;this[_0xe26f2c(0x18f)](_0x5187c2,_0xe26f2c(0x1da),_0x56a8b6,_0x456000);},Window_BattleStatus[_0x2428cf(0x1cf)]['drawAggroGauge']=function(_0x52c4b1){const _0x11d97c=_0x2428cf,_0x16005f=this['actor'](_0x52c4b1),_0x2d0b10=this['aggroGaugeX'](_0x52c4b1),_0x3ddae1=this[_0x11d97c(0xe1)](_0x52c4b1),_0x424e55='actor%1-gauge-aggro'[_0x11d97c(0x21f)](_0x16005f[_0x11d97c(0xc4)]()),_0x1cc125=this['createInnerSprite'](_0x424e55,Sprite_Gauge),_0x1a643d=VisuMZ['AggroControlSystem'][_0x11d97c(0x230)]['Aggro'];_0x1cc125['x']=_0x2d0b10+(_0x1a643d['BattleStatusOffsetX']||0x0),_0x1cc125['y']=_0x3ddae1+(_0x1a643d['BattleStatusOffsetY']||0x0),_0x1cc125[_0x11d97c(0xff)]=!![],_0x1cc125['setup'](_0x16005f,'aggro'),_0x1cc125[_0x11d97c(0x1c0)]=!![];},Window_BattleStatus['prototype']['aggroGaugeX']=function(_0x1db31c){const _0x4fc5f6=_0x2428cf;let _0x318aaf=this['itemRectWithPadding'](_0x1db31c),_0xe077e=this[_0x4fc5f6(0x201)](_0x318aaf);if(Imported[_0x4fc5f6(0x131)]){let _0x3eb850=this['itemRect'](_0x1db31c);if(this[_0x4fc5f6(0x117)]()==='list'){const _0x45d109=$dataSystem[_0x4fc5f6(0xf9)]?0x4:0x3,_0x131e69=_0x45d109*0x80+(_0x45d109-0x1)*0x8+0x4,_0x2a6b72=this[_0x4fc5f6(0x194)](_0x1db31c);let _0x2755dc=_0x3eb850['x']+this[_0x4fc5f6(0x214)];if(VisuMZ[_0x4fc5f6(0x238)][_0x4fc5f6(0x230)][_0x4fc5f6(0x236)][_0x4fc5f6(0x1af)]){if(_0x4fc5f6(0x204)!==_0x4fc5f6(0x19d))_0x2755dc=_0x3eb850['x']+ImageManager[_0x4fc5f6(0x1f4)]+0x8;else{function _0xfc2194(){const _0x127269=_0x4fc5f6;this[_0x127269(0x109)]=0x0;}}}else _0x2755dc+=ImageManager[_0x4fc5f6(0xe8)];_0xe077e=Math['round'](Math[_0x4fc5f6(0x21c)](_0x3eb850['x']+_0x3eb850[_0x4fc5f6(0x1c4)]-_0x131e69,_0x2755dc)),_0xe077e-=0x4;}else _0xe077e=Math[_0x4fc5f6(0x13a)](_0x3eb850['x']+(_0x3eb850[_0x4fc5f6(0x1c4)]-0x80)/0x2);}return _0xe077e;},Window_BattleStatus[_0x2428cf(0x1cf)][_0x2428cf(0xe1)]=function(_0x2087a4){const _0x10de97=_0x2428cf,_0x3e179a=this[_0x10de97(0x119)](_0x2087a4);let _0x4768db=this[_0x10de97(0x224)](_0x3e179a);if(Imported[_0x10de97(0x131)]){if(_0x10de97(0x107)===_0x10de97(0x107)){if(this['battleLayoutStyle']()===_0x10de97(0x133)){let _0x156649=this[_0x10de97(0x119)](_0x2087a4);_0x4768db=Math[_0x10de97(0x13a)](_0x156649['y']+(_0x156649['height']-Sprite_Name[_0x10de97(0x1cf)]['bitmapHeight']())/0x2);}}else{function _0x391c40(){const _0x25391f=_0x10de97;if(_0x58d305['_battler'][_0x25391f(0x1f5)]())_0xdb60f4=!![],this['_targetX']+=_0x355778[_0x25391f(0x1cb)][_0x25391f(0x23e)]['x'],this[_0x25391f(0xcb)]+=_0x2a2aaf[_0x25391f(0x1cb)][_0x25391f(0x23e)]['y'];else _0xc70991[_0x25391f(0x1e8)][_0x25391f(0x20b)]()&&(_0x255c64=!![],this[_0x25391f(0xcf)]+=_0x3716bf[_0x25391f(0x1cb)][_0x25391f(0x23e)]['x'],this[_0x25391f(0x1d4)]+=_0x2103d7[_0x25391f(0x1cb)][_0x25391f(0x23e)]['y']);}}}if(this[_0x10de97(0x114)]())_0x4768db-=Sprite_Gauge[_0x10de97(0x1cf)][_0x10de97(0x154)]()-0x1;return _0x4768db;},Window_BattleStatus['prototype']['isAtbGaugeVisible']=function(){const _0x14cf74=_0x2428cf;if(!BattleManager['isTpb']())return![];if(Imported[_0x14cf74(0x181)])return this[_0x14cf74(0x160)](_0x14cf74(0x149));return!![];};
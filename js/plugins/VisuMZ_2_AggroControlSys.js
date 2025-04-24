//=============================================================================
// VisuStella MZ - Aggro Control System
// VisuMZ_2_AggroControlSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_AggroControlSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AggroControlSystem = VisuMZ.AggroControlSystem || {};
VisuMZ.AggroControlSystem.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.11] [AggroControlSystem]
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
 * Version 1.11: November 17, 2022
 * * Bug Fixes!
 * ** <JS User Aggro> and <JS Target Aggro> should now work properly.
 *    Fix made by Arisu.
 * 
 * Version 1.10: August 25, 2022
 * * Documentation Update!
 * ** Added note to the <Provoke> notetag:
 * *** States with <Provoke> on them will automatically remove themselves if
 *     the provoker dies. Update made by Arisu.
 * * Feature Update!
 * ** States with <Provoke> on them will automatically remove themselves if the
 *    provoker dies. Update made by Arisu.
 * 
 * Version 1.09: June 2, 2022
 * * Bug Fixes!
 * ** Filename has been shortened from VisuMZ_2_AggroControlSystem.js to
 *    VisuMZ_2_AggroControlSys.js due to deployment reasons. For some mobile
 *    devices, keeping the name as long as VisuMZ_2_AggroControlSystem.js
 *    causes problems, but VisuMZ_2_AggroControlSys.js is fine. Take note of
 *    this while you are updating.
 * ** 'user' and 'target' now works properly with the JS notetags.
 *    Fix made by Irina.
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

const _0x21ac3c=_0x6da8;(function(_0x5033aa,_0x46715f){const _0x2a5715=_0x6da8,_0xb51e41=_0x5033aa();while(!![]){try{const _0x2c8304=-parseInt(_0x2a5715(0x2e8))/0x1+-parseInt(_0x2a5715(0x2d8))/0x2*(parseInt(_0x2a5715(0x2d1))/0x3)+-parseInt(_0x2a5715(0x2f7))/0x4*(parseInt(_0x2a5715(0x233))/0x5)+parseInt(_0x2a5715(0x24f))/0x6*(-parseInt(_0x2a5715(0x285))/0x7)+-parseInt(_0x2a5715(0x281))/0x8+-parseInt(_0x2a5715(0x263))/0x9+-parseInt(_0x2a5715(0x316))/0xa*(-parseInt(_0x2a5715(0x270))/0xb);if(_0x2c8304===_0x46715f)break;else _0xb51e41['push'](_0xb51e41['shift']());}catch(_0x43c92b){_0xb51e41['push'](_0xb51e41['shift']());}}}(_0x1e24,0x65c1f));function _0x6da8(_0x1d1289,_0x384e94){const _0x1e2455=_0x1e24();return _0x6da8=function(_0x6da8dd,_0x185e0d){_0x6da8dd=_0x6da8dd-0x1c8;let _0x3dadf3=_0x1e2455[_0x6da8dd];return _0x3dadf3;},_0x6da8(_0x1d1289,_0x384e94);}var label='AggroControlSystem',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x21ac3c(0x2db)](function(_0x44220d){const _0x1b4fba=_0x21ac3c;return _0x44220d['status']&&_0x44220d[_0x1b4fba(0x312)][_0x1b4fba(0x2e6)]('['+label+']');})[0x0];function _0x1e24(){const _0x37aeb3=['Scale','ArcHeight','endAction','Qnojs','sparam','update','provokeBitmap','Game_Action_applyGlobal','provoke-line-color','requestFauxAnimation','Scene_Options_maxCommands','updateOpacityAggroControl','_provokeSprite','registerCommand','ZNqfW','status','GVoWC','tetcB','updateAggroGaugeSprite','faceWidth','bitmapHeight','createInnerSprite','wNqJa','BattleManager_endAction','Sprite_Gauge_currentMaxValue','isCertainHit','cWTOT','magicalTauntMembers','%1Taunt','SMEkv','create','isPlaytest','invokeCounterAttack','isProvokeAffected','STR','Spriteset_Battle_createBattleField','physical','version','currentMaxValueAggroControl','isAggroGaugeShown','Parts','ykutU','anchor','provokeLineColor','certainHit','actor%1-gauge-aggro','tgrSumFromGroup','isShowPriorityLines','LineColor','bitmapWidth','aggroGauge','isAggroGaugeVisible','getColor','Spriteset_Battle_update','STRUCT','_provokeBitmap','currentValue','Battle\x20Actor\x20%1','ARRAYFUNC','refresh','isBypassTaunt','startNewTauntAnimation','Sprite_Battler_initialize','_aggro','createStateSprite','277707ziyGMq','magical','Game_Action_targetsForAlive','placeAggroGauge','pSAwO','abs','aggroMultiplier','14ZVyqQZ','friendsUnit','match','filter','Sprite_Gauge_gaugeX','WQgQU','AggroControlSystem','_muteTauntAnimations','setup','addAggroControlSystemProvokeCommand','inBattle','AdjustOptionsRect','nameY','updateBattlerPositions','includes','_colorCache','253613MfRjkL','nameX','battleUIOffsetY','hitType','addAggroControlSystemAggroCommand','ARRAYSTRUCT','isPhysical','bcmky','bAeZQ','#%1','maxCommands','blendMode','randomTarget','isEnemy','qNRfF','116taJHwY','checkCacheKey','createChildSprites','BattleManager_invokeMagicReflection','sortEnemies','AnhcI','AniPhysical','createBattleFieldAggroControl','inputtingAction','max','BattleCore','currentValueAggroControl','BattleLayout','Sprite_Battler_initMembers','_homeY','random','OpacitySpeed','lowestTgrMember','_customModified','VisibleGauge','clearAggro','EnemyIndex','_magicalTauntAnimation','bypassHighestAggro','Taunt','removeDeadProvokerStates','onBattleEnd','description','reduce','aggro','tRTxX','568130MsApgZ','applyProvokeFilters','parameters','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','dcfkH','uwKCD','createAggroGauge','HITTYPE_MAGICAL','Aggro','MuteAnimations','enemy','initTauntAnimations','targetsForAlive','OffsetX','shhCE','provoker','EnemySetAggro','opponentsUnit','_homeX','EVAL','bypassTaunt','ActorChangeAggro','subject','mgXLV','bitmap','isAtbGaugeVisible','executeHpDamage','battleLayoutStyle','shift','ConfigManager_makeData','BattleManager_invokeCounterAttack','Sprite_Actor_createStateSprite','xsTSx','_battler','battler','maxSprites','push','IqSLN','_enemies','isActor','jKzDQ','textColor','smoothTarget','bind','initialize','value','AggroPerDmg','_lowestTgrMember','Sprite_Actor_update','Vixgh','GaugeColor1','tgrMax','boxWidth','Sprite_Gauge_gaugeColor1','convertStringToBattleTarget','itemRect','HITTYPE_CERTAIN','Rkswy','_targetIndex','applySubjectAggro','initAggroControl','cjVPG','ConvertParams','updateSubPositions','wCcQs','Game_Battler_onBattleEnd','Sprite_Gauge_update','ARRAYEVAL','_certainHitTauntAnimation','_aggroGaugeSprite','randomInt','clearTgrCache','feecN','onBattleStart','qIgjF','states','Window_Options_addGeneralOptions','boxHeight','AggroPerHeal','members','_%1TauntAnimation','gaugeColor2','SEbJI','_animationCycleTime','tgrMin','highestTgrMember','LKLlx','parentContainer','partsSize','user','battleAggro','round','setBattler','crosp','PriorityHighest','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','gainAggro','setAggro','currentMaxValue','provokeOrigin','_provokeContainer','index','AddOption','UwqPl','Battle\x20Enemy\x20%1','loseAggro','magicalTaunt','physicalTauntMembers','addCommand','NMGjC','makeProvokeTarget','isMagical','ufrIg','actorId','_menuAggroType','mklrC','isBypassProvoke','applyProvokeEffect','gaugeRate','ActorID','constructor','physicalTaunt','_highestTgrMember','OptionName','placeActorName','note','format','_sprites','Game_Action_executeHpDamage','Game_BattlerBase_initMembers','applyItemUserEffectAggroControl','reVuT','auiML','Sprite_Battler_update','CycleTime','applyData','HITTYPE_PHYSICAL','isAlive','_opacitySpeed','Sprite_Gauge_gaugeColor2','isTargetHighestTGR','_counterAttackingTarget','placeGauge','_scene','actor','VisuMZ_1_BattleCore','isSideView','updateOpacity','_battleField','stateHasProvoke','ActorSetAggro','name','isBypassHighestAggro','setFrame','removeState','createBattleField','Game_Battler_onBattleStart','_targetX','traitObjects','aliveMembers','aggro-gauge-color-1','yiYBx','uaIQC','_physicalTauntAnimation','min','_targetY','aggro-gauge-color-2','initMembers','addState','isTauntAffected','QTLls','list','YRnaw','ALQdU','JSON','Sprite_Gauge_drawValue','map','drawAggroGauge','yYTqb','applyItemUserEffect','prototype','Provoke','updateTauntAnimations','addChild','addGeneralOptions','_statusWindow','executeHpDamageAggroControl','_provoker','arcHeight','getColorDataFromPluginParameters','AniMagical','padding','isSceneBattle','isAggroType','62215OEnoys','scale','pow','provokeHeightOrigin','tgr','HsBlf','itemRectWithPadding','KsNGU','_tauntAnimationTimer','leftwardAnimation','applyTauntFilters','yWGyN','Game_BattlerBase_refresh','convertBattleTargetToString','jpGyX','target','bypassProvoke','Game_Action_applyItemUserEffect','length','battleUIOffsetX','return\x200','Window_StatusBase_placeActorName','height','visible','taunting','aggroGaugeX','OffsetY','parse','4610526QdLxuR','getNextTauntAnimation','MirrorActorAni','ARRAYNUM','aggroGaugeColor1','BlendMode','_cache','opacity','VisuMZ_2_BattleSystemATB','HeightOrigin','ARRAYSTR','AnchorY','updateChildrenOpacity','createProvokeSprite','BobAV','applyGlobal','ConfigManager_applyData','log','GaugeColor2','scope','473706ZEZwyN','Settings','_damageContainer','certainHitTaunt','_tauntAnimationCycle','_subject','gaugeHeight','randomTauntTarget','Unfqb','gaugeX','some','updateAggroControl','_mainSprite','583hBFsmg','optDisplayTp','call','Window_BattleEnemy_refresh','Game_Battler_addState','gaugeColor1','clearProvokers','findTgrMember','item','isDead','certainHitTauntMembers','Sprite_Gauge_gaugeRate','PartsSize','bnwpl','ARRAYJSON','exit','Game_BattlerBase_sparam','4086336olXJLQ','MPdlM','AnchorX','ShowFacesListStyle','7qovkLq','matchTauntType','width','baseAggro','VisuMZ_0_CoreEngine','PHOGy','alwaysTargetHighestAggro','invokeMagicReflection','makeData','FCLkx','isAggroAffected'];_0x1e24=function(){return _0x37aeb3;};return _0x1e24();}VisuMZ[label][_0x21ac3c(0x264)]=VisuMZ[label][_0x21ac3c(0x264)]||{},VisuMZ['ConvertParams']=function(_0x3fee0b,_0x4dbf92){const _0x4fcc5=_0x21ac3c;for(const _0x4689b9 in _0x4dbf92){if(_0x4689b9[_0x4fcc5(0x2da)](/(.*):(.*)/i)){const _0x31acff=String(RegExp['$1']),_0x50f42e=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x5eea8b,_0x1327d3,_0xef3d17;switch(_0x50f42e){case'NUM':_0x5eea8b=_0x4dbf92[_0x4689b9]!==''?Number(_0x4dbf92[_0x4689b9]):0x0;break;case _0x4fcc5(0x252):_0x1327d3=_0x4dbf92[_0x4689b9]!==''?JSON[_0x4fcc5(0x24e)](_0x4dbf92[_0x4689b9]):[],_0x5eea8b=_0x1327d3[_0x4fcc5(0x221)](_0xe79393=>Number(_0xe79393));break;case _0x4fcc5(0x329):_0x5eea8b=_0x4dbf92[_0x4689b9]!==''?eval(_0x4dbf92[_0x4689b9]):null;break;case _0x4fcc5(0x359):_0x1327d3=_0x4dbf92[_0x4689b9]!==''?JSON['parse'](_0x4dbf92[_0x4689b9]):[],_0x5eea8b=_0x1327d3[_0x4fcc5(0x221)](_0x16c197=>eval(_0x16c197));break;case _0x4fcc5(0x21f):_0x5eea8b=_0x4dbf92[_0x4689b9]!==''?JSON[_0x4fcc5(0x24e)](_0x4dbf92[_0x4689b9]):'';break;case _0x4fcc5(0x27e):_0x1327d3=_0x4dbf92[_0x4689b9]!==''?JSON['parse'](_0x4dbf92[_0x4689b9]):[],_0x5eea8b=_0x1327d3[_0x4fcc5(0x221)](_0x184661=>JSON['parse'](_0x184661));break;case'FUNC':_0x5eea8b=_0x4dbf92[_0x4689b9]!==''?new Function(JSON[_0x4fcc5(0x24e)](_0x4dbf92[_0x4689b9])):new Function(_0x4fcc5(0x247));break;case _0x4fcc5(0x2ca):_0x1327d3=_0x4dbf92[_0x4689b9]!==''?JSON['parse'](_0x4dbf92[_0x4689b9]):[],_0x5eea8b=_0x1327d3[_0x4fcc5(0x221)](_0x468682=>new Function(JSON[_0x4fcc5(0x24e)](_0x468682)));break;case _0x4fcc5(0x2b2):_0x5eea8b=_0x4dbf92[_0x4689b9]!==''?String(_0x4dbf92[_0x4689b9]):'';break;case _0x4fcc5(0x259):_0x1327d3=_0x4dbf92[_0x4689b9]!==''?JSON[_0x4fcc5(0x24e)](_0x4dbf92[_0x4689b9]):[],_0x5eea8b=_0x1327d3[_0x4fcc5(0x221)](_0x1b2d86=>String(_0x1b2d86));break;case _0x4fcc5(0x2c6):_0xef3d17=_0x4dbf92[_0x4689b9]!==''?JSON[_0x4fcc5(0x24e)](_0x4dbf92[_0x4689b9]):{},_0x5eea8b=VisuMZ['ConvertParams']({},_0xef3d17);break;case _0x4fcc5(0x2ed):_0x1327d3=_0x4dbf92[_0x4689b9]!==''?JSON[_0x4fcc5(0x24e)](_0x4dbf92[_0x4689b9]):[],_0x5eea8b=_0x1327d3[_0x4fcc5(0x221)](_0x5865e5=>VisuMZ[_0x4fcc5(0x354)]({},JSON[_0x4fcc5(0x24e)](_0x5865e5)));break;default:continue;}_0x3fee0b[_0x31acff]=_0x5eea8b;}}return _0x3fee0b;},(_0x3178dc=>{const _0x58c2ba=_0x21ac3c,_0x21a738=_0x3178dc[_0x58c2ba(0x208)];for(const _0x41dbd6 of dependencies){if(_0x58c2ba(0x29e)===_0x58c2ba(0x29e)){if(!Imported[_0x41dbd6]){alert(_0x58c2ba(0x1d0)[_0x58c2ba(0x1ef)](_0x21a738,_0x41dbd6)),SceneManager[_0x58c2ba(0x27f)]();break;}}else _0x2b9d6b[_0x58c2ba(0x2de)][_0x58c2ba(0x2ce)]['call'](this,_0x5d08eb),this[_0x58c2ba(0x2bf)]()&&_0xee31cc(this[_0x58c2ba(0x25c)][_0x58c2ba(0x341)](this),0x3e8);}const _0xa7248b=_0x3178dc[_0x58c2ba(0x312)];if(_0xa7248b['match'](/\[Version[ ](.*?)\]/i)){if(_0x58c2ba(0x315)===_0x58c2ba(0x315)){const _0xc5dc5a=Number(RegExp['$1']);_0xc5dc5a!==VisuMZ[label][_0x58c2ba(0x2b5)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x21a738,_0xc5dc5a)),SceneManager[_0x58c2ba(0x27f)]());}else{const _0x30675a=_0x58c2ba(0x211);this['_colorCache']=this[_0x58c2ba(0x2e7)]||{};if(this[_0x58c2ba(0x2e7)][_0x30675a])return this[_0x58c2ba(0x2e7)][_0x30675a];const _0x54ea7d=_0x197d6f['AggroControlSystem'][_0x58c2ba(0x264)][_0x58c2ba(0x31e)]['GaugeColor1'];return this[_0x58c2ba(0x22e)](_0x30675a,_0x54ea7d);}}if(_0xa7248b['match'](/\[Tier[ ](\d+)\]/i)){const _0x1d23f8=Number(RegExp['$1']);if(_0x1d23f8<tier)alert(_0x58c2ba(0x319)['format'](_0x21a738,_0x1d23f8,tier)),SceneManager[_0x58c2ba(0x27f)]();else{if(_0x58c2ba(0x21b)!==_0x58c2ba(0x21b))return this[_0x58c2ba(0x20f)]()['some'](_0x5c0c73=>_0x5c0c73&&_0x5c0c73[_0x58c2ba(0x1ee)][_0x58c2ba(0x2da)](/<(?:TAUNT|MAGICAL TAUNT|ALL TAUNT)>/i));else tier=Math[_0x58c2ba(0x300)](_0x1d23f8,tier);}}VisuMZ['ConvertParams'](VisuMZ[label][_0x58c2ba(0x264)],_0x3178dc[_0x58c2ba(0x318)]);})(pluginData),PluginManager[_0x21ac3c(0x29d)](pluginData[_0x21ac3c(0x208)],_0x21ac3c(0x32b),_0x5dd4c0=>{const _0x228c42=_0x21ac3c;if(!$gameParty[_0x228c42(0x2e2)]())return;VisuMZ['ConvertParams'](_0x5dd4c0,_0x5dd4c0);const _0x2903db=$gameActors[_0x228c42(0x201)](_0x5dd4c0[_0x228c42(0x1e8)]),_0x308da5=_0x5dd4c0[_0x228c42(0x31e)];if(_0x2903db)_0x2903db[_0x228c42(0x1d1)](_0x308da5);}),PluginManager['registerCommand'](pluginData['name'],_0x21ac3c(0x207),_0x1d3335=>{const _0x326f2b=_0x21ac3c;if(!$gameParty[_0x326f2b(0x2e2)]())return;VisuMZ['ConvertParams'](_0x1d3335,_0x1d3335);const _0x404676=$gameActors[_0x326f2b(0x201)](_0x1d3335[_0x326f2b(0x1e8)]),_0x5f59b3=_0x1d3335[_0x326f2b(0x31e)];if(_0x404676)_0x404676[_0x326f2b(0x1d2)](_0x5f59b3);}),PluginManager[_0x21ac3c(0x29d)](pluginData[_0x21ac3c(0x208)],'EnemyChangeAggro',_0x231bb4=>{const _0x350370=_0x21ac3c;if(!$gameParty['inBattle']())return;VisuMZ[_0x350370(0x354)](_0x231bb4,_0x231bb4);const _0x2d359a=$gameTroop['members']()[_0x231bb4[_0x350370(0x30c)]],_0x3757ad=_0x231bb4['Aggro'];if(_0x2d359a)_0x2d359a[_0x350370(0x1d1)](_0x3757ad);}),PluginManager[_0x21ac3c(0x29d)](pluginData['name'],_0x21ac3c(0x326),_0xe2b101=>{const _0x2700ab=_0x21ac3c;if(!$gameParty[_0x2700ab(0x2e2)]())return;VisuMZ[_0x2700ab(0x354)](_0xe2b101,_0xe2b101);const _0x170cf4=$gameTroop['members']()[_0xe2b101[_0x2700ab(0x30c)]],_0x30dbff=_0xe2b101[_0x2700ab(0x31e)];if(_0x170cf4)_0x170cf4[_0x2700ab(0x1d2)](_0x30dbff);}),DataManager[_0x21ac3c(0x206)]=function(_0x43b41c){if(!_0x43b41c)return![];return _0x43b41c['note']['match'](/<PROVOKE>/i);},DataManager[_0x21ac3c(0x1e5)]=function(_0x5377df){const _0x5975=_0x21ac3c;if(!_0x5377df)return![];return _0x5377df['note'][_0x5975(0x2da)](/<BYPASS PROVOKE>/i);},DataManager[_0x21ac3c(0x2cc)]=function(_0x34a9c4){const _0xd8f86a=_0x21ac3c;if(!_0x34a9c4)return![];return _0x34a9c4[_0xd8f86a(0x1ee)][_0xd8f86a(0x2da)](/<BYPASS TAUNT>/i);},DataManager['isBypassHighestAggro']=function(_0x39429c){const _0x53d1f2=_0x21ac3c;if(!_0x39429c)return![];return _0x39429c[_0x53d1f2(0x1ee)][_0x53d1f2(0x2da)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},DataManager['alwaysTargetHighestAggro']=function(_0x3b518d){const _0x2ba394=_0x21ac3c;if(!_0x3b518d)return![];return _0x3b518d[_0x2ba394(0x1ee)][_0x2ba394(0x2da)](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},ImageManager[_0x21ac3c(0x296)]=function(){const _0x17f119=_0x21ac3c;if(this['_provokeBitmap'])return this['_provokeBitmap'];return this[_0x17f119(0x2c7)]=new Bitmap(0x64,0x64),this[_0x17f119(0x2c7)]['drawCircle'](0x32,0x32,0x32,ColorManager['provokeLineColor']()),this[_0x17f119(0x2c7)][_0x17f119(0x309)]=![],this[_0x17f119(0x2c7)];},ConfigManager[_0x21ac3c(0x2c2)]=!![],ConfigManager['provokeOrigin']=!![],VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x333)]=ConfigManager[_0x21ac3c(0x28d)],ConfigManager[_0x21ac3c(0x28d)]=function(){const _0x4c8e0d=_0x21ac3c,_0x1d652c=VisuMZ[_0x4c8e0d(0x2de)]['ConfigManager_makeData'][_0x4c8e0d(0x272)](this);return _0x1d652c[_0x4c8e0d(0x2c2)]=this[_0x4c8e0d(0x2c2)],_0x1d652c[_0x4c8e0d(0x1d4)]=this[_0x4c8e0d(0x1d4)],_0x1d652c;},VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x25f)]=ConfigManager['applyData'],ConfigManager[_0x21ac3c(0x1f8)]=function(_0x77f265){const _0x128117=_0x21ac3c;VisuMZ[_0x128117(0x2de)][_0x128117(0x25f)][_0x128117(0x272)](this,_0x77f265),_0x128117(0x2c2)in _0x77f265?this[_0x128117(0x2c2)]=_0x77f265['aggroGauge']:_0x128117(0x2aa)!=='QFJJH'?this[_0x128117(0x2c2)]=!![]:this[_0x128117(0x256)]=0x0,_0x128117(0x1d4)in _0x77f265?this[_0x128117(0x1d4)]=_0x77f265[_0x128117(0x1d4)]:this[_0x128117(0x1d4)]=!![];},TextManager['aggroGauge']=VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x264)][_0x21ac3c(0x31e)][_0x21ac3c(0x1ec)],TextManager[_0x21ac3c(0x1d4)]=VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x264)][_0x21ac3c(0x226)][_0x21ac3c(0x1ec)],ColorManager[_0x21ac3c(0x22e)]=function(_0x32adca,_0x51f0b4){const _0x2914c1=_0x21ac3c;return _0x51f0b4=String(_0x51f0b4),this[_0x2914c1(0x2e7)]=this['_colorCache']||{},_0x51f0b4[_0x2914c1(0x2da)](/#(.*)/i)?this[_0x2914c1(0x2e7)][_0x32adca]=_0x2914c1(0x2f1)['format'](String(RegExp['$1'])):this[_0x2914c1(0x2e7)][_0x32adca]=this[_0x2914c1(0x33f)](Number(_0x51f0b4)),this[_0x2914c1(0x2e7)][_0x32adca];},ColorManager[_0x21ac3c(0x2c4)]=function(_0x2e5c16){const _0x1d6b19=_0x21ac3c;return _0x2e5c16=String(_0x2e5c16),_0x2e5c16[_0x1d6b19(0x2da)](/#(.*)/i)?_0x1d6b19(0x2f1)[_0x1d6b19(0x1ef)](String(RegExp['$1'])):this['textColor'](Number(_0x2e5c16));},ColorManager[_0x21ac3c(0x2bb)]=function(){const _0x5dc1c2=_0x21ac3c,_0x4e5a61=_0x5dc1c2(0x298);this['_colorCache']=this[_0x5dc1c2(0x2e7)]||{};if(this[_0x5dc1c2(0x2e7)][_0x4e5a61])return this['_colorCache'][_0x4e5a61];const _0x2a5485=VisuMZ[_0x5dc1c2(0x2de)][_0x5dc1c2(0x264)][_0x5dc1c2(0x226)][_0x5dc1c2(0x2c0)];return this[_0x5dc1c2(0x22e)](_0x4e5a61,_0x2a5485);},ColorManager[_0x21ac3c(0x253)]=function(){const _0x30aa2f=_0x21ac3c,_0x280f73='aggro-gauge-color-1';this[_0x30aa2f(0x2e7)]=this[_0x30aa2f(0x2e7)]||{};if(this[_0x30aa2f(0x2e7)][_0x280f73])return this[_0x30aa2f(0x2e7)][_0x280f73];const _0x50380e=VisuMZ[_0x30aa2f(0x2de)][_0x30aa2f(0x264)][_0x30aa2f(0x31e)][_0x30aa2f(0x348)];return this['getColorDataFromPluginParameters'](_0x280f73,_0x50380e);},ColorManager['aggroGaugeColor2']=function(){const _0x54e40b=_0x21ac3c,_0x126893=_0x54e40b(0x217);this[_0x54e40b(0x2e7)]=this[_0x54e40b(0x2e7)]||{};if(this[_0x54e40b(0x2e7)][_0x126893])return this['_colorCache'][_0x126893];const _0x110cf6=VisuMZ[_0x54e40b(0x2de)][_0x54e40b(0x264)]['Aggro'][_0x54e40b(0x261)];return this[_0x54e40b(0x22e)](_0x126893,_0x110cf6);},SceneManager[_0x21ac3c(0x231)]=function(){const _0x4feeef=_0x21ac3c;return this[_0x4feeef(0x200)]&&this[_0x4feeef(0x200)]['constructor']===Scene_Battle;},BattleManager[_0x21ac3c(0x240)]=function(_0x360524){const _0xe4e844=_0x21ac3c;let _0x5459b2=this[_0xe4e844(0x268)];this[_0xe4e844(0x1fe)]&&(_0x5459b2=this[_0xe4e844(0x1fe)]);if(!_0x5459b2)return'zrhWm'==='FbNLp'?_0x39a5cb[_0xe4e844(0x29f)]&&_0x44bf82['description'][_0xe4e844(0x2e6)]('['+_0xe12749+']'):null;if(_0x5459b2[_0xe4e844(0x33d)]()&&_0x360524[_0xe4e844(0x2f5)]()){if(_0xe4e844(0x2dd)!==_0xe4e844(0x2dd))_0xd10cd3[_0xe4e844(0x2de)][_0xe4e844(0x1f6)][_0xe4e844(0x272)](this),this['updateTauntAnimations']();else return _0xe4e844(0x2c9)[_0xe4e844(0x1ef)](_0x5459b2[_0xe4e844(0x1e2)]());}else{if(_0x5459b2[_0xe4e844(0x2f5)]()&&_0x360524[_0xe4e844(0x33d)]())return _0xe4e844(0x360)!==_0xe4e844(0x324)?_0xe4e844(0x1d9)[_0xe4e844(0x1ef)](_0x5459b2[_0xe4e844(0x1d6)]()):this[_0xe4e844(0x1ea)]()||this[_0xe4e844(0x1db)]()||this[_0xe4e844(0x266)]();}return null;},BattleManager[_0x21ac3c(0x34c)]=function(_0x15f722){const _0x185b1c=_0x21ac3c;if(!_0x15f722)return null;if(_0x15f722['match'](/BATTLE ACTOR (\d+)/i)){if(_0x185b1c(0x35e)===_0x185b1c(0x35e))return $gameActors[_0x185b1c(0x201)](Number(RegExp['$1']));else this['addChild'](this['_provokeContainer']);}else{if(_0x15f722[_0x185b1c(0x2da)](/BATTLE ENEMY (\d+)/i))return $gameTroop[_0x185b1c(0x365)]()[Number(RegExp['$1'])];}return null;},BattleManager[_0x21ac3c(0x1fd)]=function(){const _0x27ec2a=_0x21ac3c;return VisuMZ[_0x27ec2a(0x2de)][_0x27ec2a(0x264)][_0x27ec2a(0x31e)][_0x27ec2a(0x1cf)];},VisuMZ['AggroControlSystem'][_0x21ac3c(0x2d3)]=Game_Action['prototype'][_0x21ac3c(0x322)],Game_Action['prototype']['targetsForAlive']=function(_0x6d50cc){const _0x5a47e1=_0x21ac3c;if(this[_0x5a47e1(0x2b1)]())return _0x5a47e1(0x28a)===_0x5a47e1(0x28a)?this[_0x5a47e1(0x1df)]():(this[_0x5a47e1(0x255)]=this[_0x5a47e1(0x255)]||{},this['_cache'][_0x57a01f]!==_0x8b3e99);else{if(this[_0x5a47e1(0x21a)]()){if('uLKOd'!==_0x5a47e1(0x21e))return this['tauntTargetsForAlive'](_0x6d50cc);else{const _0x376f40=_0xb65fee[_0x5a47e1(0x344)];this[_0x5a47e1(0x32c)]()[_0x5a47e1(0x1d1)](_0x376f40*_0x2478f1);}}else return this[_0x5a47e1(0x28f)]()?[_0x6d50cc[_0x5a47e1(0x36b)]()]:VisuMZ['AggroControlSystem'][_0x5a47e1(0x2d3)][_0x5a47e1(0x272)](this,_0x6d50cc);}},Game_Action['prototype']['isProvokeAffected']=function(){const _0x3193b3=_0x21ac3c;if(this[_0x3193b3(0x278)]()['scope']!==0x1)return![];if(DataManager['isBypassProvoke'](this['item']()))return![];if(this['subject']()['bypassProvoke']())return![];return this['subject']()[_0x3193b3(0x2b1)]();},Game_Action[_0x21ac3c(0x225)][_0x21ac3c(0x1df)]=function(){const _0x2f9aa3=_0x21ac3c;return[this[_0x2f9aa3(0x32c)]()[_0x2f9aa3(0x325)]()];},Game_Action['prototype'][_0x21ac3c(0x21a)]=function(){const _0xc7defc=_0x21ac3c;if(this[_0xc7defc(0x278)]()[_0xc7defc(0x262)]!==0x1)return![];if(DataManager[_0xc7defc(0x2cc)](this['item']()))return![];if(this[_0xc7defc(0x32c)]()[_0xc7defc(0x32a)]())return![];const _0x5e78bf=this[_0xc7defc(0x327)]();if(this[_0xc7defc(0x2ee)]()&&_0x5e78bf[_0xc7defc(0x1dc)]()['length']>0x0)return!![];if(this[_0xc7defc(0x1e0)]()&&_0x5e78bf['magicalTauntMembers']()[_0xc7defc(0x245)]>0x0)return!![];if(this['isCertainHit']()&&_0x5e78bf['certainHitTauntMembers']()['length']>0x0)return!![];return![];},Game_Action[_0x21ac3c(0x225)]['tauntTargetsForAlive']=function(_0xbd71f7){const _0x505c02=_0x21ac3c;if(this[_0x505c02(0x350)]<0x0)return[_0xbd71f7[_0x505c02(0x26a)](this['item']()['hitType'])];else{const _0x52eb93=_0xbd71f7[_0x505c02(0x340)](this['_targetIndex']);if(_0x52eb93[_0x505c02(0x286)](this[_0x505c02(0x278)]()[_0x505c02(0x2eb)])){if(_0x505c02(0x2b9)===_0x505c02(0x336))_0xc5d36f=this[_0x505c02(0x1fe)];else return[_0x52eb93];}else return[_0xbd71f7[_0x505c02(0x26a)]()];}},Game_Action[_0x21ac3c(0x225)][_0x21ac3c(0x28f)]=function(){const _0x2be3a2=_0x21ac3c;if(this['item']()[_0x2be3a2(0x262)]!==0x1)return![];if(this[_0x2be3a2(0x350)]>=0x0)return![];if(DataManager['isBypassHighestAggro'](this[_0x2be3a2(0x278)]()))return![];if(this['subject']()[_0x2be3a2(0x30e)]())return![];if(DataManager[_0x2be3a2(0x28b)](this[_0x2be3a2(0x278)]()))return!![];if(this[_0x2be3a2(0x32c)]()[_0x2be3a2(0x28b)]())return!![];return BattleManager[_0x2be3a2(0x1fd)]();},VisuMZ['AggroControlSystem'][_0x21ac3c(0x297)]=Game_Action[_0x21ac3c(0x225)][_0x21ac3c(0x25e)],Game_Action[_0x21ac3c(0x225)][_0x21ac3c(0x25e)]=function(){const _0xc71d7c=_0x21ac3c;VisuMZ[_0xc71d7c(0x2de)]['Game_Action_applyGlobal']['call'](this),this[_0xc71d7c(0x351)]();},Game_Action['prototype'][_0x21ac3c(0x351)]=function(){const _0x43cf30=_0x21ac3c,_0x300005=this['item']()[_0x43cf30(0x1ee)];if(_0x300005[_0x43cf30(0x2da)](/<(?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT): ([\+\-]\d+)>/i)){if(_0x43cf30(0x28e)===_0x43cf30(0x28e)){const _0x43e98b=Number(RegExp['$1']);this[_0x43cf30(0x32c)]()[_0x43cf30(0x1d1)](_0x43e98b);}else this[_0x43cf30(0x33c)]=_0x5274b4[_0x43cf30(0x2ab)]();}if(_0x300005[_0x43cf30(0x2da)](/<JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>\s*([\s\S]*)\s*<\/JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>/i)){const _0xd759b4=String(RegExp['$1']);window[_0x43cf30(0x1ca)]=this[_0x43cf30(0x32c)](),window['item']=this[_0x43cf30(0x278)](),window['a']=this['subject'](),window['b']=a,window['value']=user[_0x43cf30(0x1cb)]();try{_0x43cf30(0x31a)!==_0x43cf30(0x31a)?this[_0x43cf30(0x33c)]=_0x1c3c18[_0x43cf30(0x1dc)]():eval(_0xd759b4);}catch(_0x42e9ae){if(_0x43cf30(0x2a6)===_0x43cf30(0x356))return _0x3371fe['AggroControlSystem'][_0x43cf30(0x1fc)][_0x43cf30(0x272)](this);else{if($gameTemp['isPlaytest']())console[_0x43cf30(0x260)](_0x42e9ae);}}user['setAggro'](window[_0x43cf30(0x343)]),window['user']=undefined,window[_0x43cf30(0x242)]=undefined,window[_0x43cf30(0x278)]=undefined,window['a']=undefined,window['b']=undefined,window[_0x43cf30(0x343)]=undefined;}},VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x244)]=Game_Action[_0x21ac3c(0x225)][_0x21ac3c(0x224)],Game_Action[_0x21ac3c(0x225)]['applyItemUserEffect']=function(_0x3d92d9){const _0x338bd8=_0x21ac3c;VisuMZ[_0x338bd8(0x2de)][_0x338bd8(0x244)][_0x338bd8(0x272)](this,_0x3d92d9),this['applyItemUserEffectAggroControl'](_0x3d92d9);},Game_Action[_0x21ac3c(0x225)][_0x21ac3c(0x1f3)]=function(_0x3783fc){const _0x16fd31=_0x21ac3c;if(!this[_0x16fd31(0x278)]())return;if(!SceneManager[_0x16fd31(0x231)]())return;const _0x31e573=this[_0x16fd31(0x278)]()[_0x16fd31(0x1ee)];if(_0x31e573[_0x16fd31(0x2da)](/<TARGET (?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)){if(_0x16fd31(0x213)==='wkNmn'){if(this[_0x16fd31(0x1e9)]!==_0x32efdd)return;if(!this[_0x16fd31(0x2c3)]())return;if(!_0x18dd13['isSceneBattle']())return;const _0x1bb1b1=_0x223c4c[_0x16fd31(0x2de)]['Settings']['Aggro'],_0x472082=new _0x1ec64a();_0x472082[_0x16fd31(0x2ba)]['x']=_0x1bb1b1['AnchorX'],_0x472082[_0x16fd31(0x2ba)]['y']=_0x1bb1b1[_0x16fd31(0x25a)];const _0x6a8e82=_0x28b85d[_0x16fd31(0x225)][_0x16fd31(0x2c1)]();_0x472082['scale']['x']=_0x472082[_0x16fd31(0x234)]['y']=_0x1bb1b1['Scale'],this[_0x16fd31(0x35b)]=_0x472082,this[_0x16fd31(0x228)](_0x472082);}else{const _0x2b5eec=Number(RegExp['$1']);_0x3783fc[_0x16fd31(0x1d1)](_0x2b5eec);}}if(_0x31e573[_0x16fd31(0x2da)](/<JS TARGET (?:AGGRO|ENMITY|THREAT)>\s*([\s\S]*)\s*<\/JS TARGET (?:AGGRO|ENMITY|THREAT)>/i)){const _0x4cb37b=String(RegExp['$1']);window[_0x16fd31(0x1ca)]=this['subject'](),window[_0x16fd31(0x242)]=_0x3783fc,window[_0x16fd31(0x278)]=this['item'](),window['a']=this[_0x16fd31(0x32c)](),window['b']=_0x3783fc,window['value']=_0x3783fc[_0x16fd31(0x1cb)]();try{eval(_0x4cb37b);}catch(_0x2a3ec1){if($gameTemp[_0x16fd31(0x2af)]())console[_0x16fd31(0x260)](_0x2a3ec1);}_0x3783fc[_0x16fd31(0x1d2)](window[_0x16fd31(0x343)]),window[_0x16fd31(0x1ca)]=undefined,window[_0x16fd31(0x242)]=undefined,window['item']=undefined,window['a']=undefined,window['b']=undefined,window['value']=undefined;}},VisuMZ[_0x21ac3c(0x2de)]['Game_Action_executeHpDamage']=Game_Action['prototype'][_0x21ac3c(0x330)],Game_Action[_0x21ac3c(0x225)][_0x21ac3c(0x330)]=function(_0x4b92ca,_0x1dc4f3){const _0x5ac795=_0x21ac3c;VisuMZ['AggroControlSystem'][_0x5ac795(0x1f1)]['call'](this,_0x4b92ca,_0x1dc4f3),this[_0x5ac795(0x22b)](_0x4b92ca,_0x1dc4f3);},Game_Action[_0x21ac3c(0x225)][_0x21ac3c(0x22b)]=function(_0xdb72ce,_0x5e1401){const _0x2cb996=_0x21ac3c,_0x12aaa2=VisuMZ[_0x2cb996(0x2de)][_0x2cb996(0x264)][_0x2cb996(0x31e)];if(_0x5e1401>0x0&&_0xdb72ce[_0x2cb996(0x33d)]()!==this[_0x2cb996(0x32c)]()[_0x2cb996(0x33d)]()){if(_0x2cb996(0x1f4)!==_0x2cb996(0x1f4))return this[_0x2cb996(0x232)]()?this[_0x2cb996(0x302)]():_0x27b64a[_0x2cb996(0x2de)]['Sprite_Gauge_currentValue'][_0x2cb996(0x272)](this);else{const _0x28347c=_0x12aaa2[_0x2cb996(0x344)];this[_0x2cb996(0x32c)]()[_0x2cb996(0x1d1)](_0x28347c*_0x5e1401);}}if(_0x5e1401<0x0&&_0xdb72ce[_0x2cb996(0x33d)]()===this[_0x2cb996(0x32c)]()[_0x2cb996(0x33d)]()){const _0x513ba0=_0x12aaa2[_0x2cb996(0x364)];this[_0x2cb996(0x32c)]()[_0x2cb996(0x1d1)](_0x513ba0*Math[_0x2cb996(0x2d6)](_0x5e1401));}},VisuMZ['AggroControlSystem'][_0x21ac3c(0x1f2)]=Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x218)],Game_BattlerBase[_0x21ac3c(0x225)]['initMembers']=function(){const _0x4e72bf=_0x21ac3c;this['_cache']={},VisuMZ[_0x4e72bf(0x2de)]['Game_BattlerBase_initMembers'][_0x4e72bf(0x272)](this),this[_0x4e72bf(0x352)]();},Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x352)]=function(){const _0x5480c6=_0x21ac3c;this[_0x5480c6(0x276)](),this[_0x5480c6(0x30b)]();},Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x276)]=function(){this['_provoker']={};},VisuMZ['AggroControlSystem'][_0x21ac3c(0x23f)]=Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x2cb)],Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x2cb)]=function(){const _0x33eb5b=_0x21ac3c;this[_0x33eb5b(0x255)]={},VisuMZ[_0x33eb5b(0x2de)]['Game_BattlerBase_refresh'][_0x33eb5b(0x272)](this),this[_0x33eb5b(0x310)]();},Game_BattlerBase['prototype'][_0x21ac3c(0x2f8)]=function(_0x27e3eb){const _0x321143=_0x21ac3c;return this[_0x321143(0x255)]=this[_0x321143(0x255)]||{},this[_0x321143(0x255)][_0x27e3eb]!==undefined;},Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x325)]=function(){const _0xe7dbc=_0x21ac3c;for(const _0x4203d0 of this['states']()){if(_0xe7dbc(0x34f)===_0xe7dbc(0x34f)){if(DataManager[_0xe7dbc(0x206)](_0x4203d0)){if(this[_0xe7dbc(0x22c)]===undefined)this['clearProvokers']();const _0x2e495d=this[_0xe7dbc(0x22c)][_0x4203d0['id']],_0x2dd9fd=BattleManager[_0xe7dbc(0x34c)](_0x2e495d);if(_0x2dd9fd&&_0x2dd9fd[_0xe7dbc(0x1fa)]())return _0x2dd9fd;}}else return![];}return null;},Game_BattlerBase['prototype'][_0x21ac3c(0x2b1)]=function(){const _0x40a84f=_0x21ac3c;return!!this[_0x40a84f(0x325)]();},Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x243)]=function(){const _0x2228ff=_0x21ac3c;return this['traitObjects']()[_0x2228ff(0x26d)](_0x1b1c4a=>_0x1b1c4a&&_0x1b1c4a[_0x2228ff(0x1ee)][_0x2228ff(0x2da)](/<BYPASS PROVOKE>/i));},Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x236)]=function(){const _0x1cf79d=_0x21ac3c;let _0x4b94e6=_0x1cf79d(0x236);if(this[_0x1cf79d(0x2f8)](_0x4b94e6))return this[_0x1cf79d(0x255)][_0x4b94e6];return this[_0x1cf79d(0x255)][_0x4b94e6]=this['createProvokeHeightOrigin'](),this[_0x1cf79d(0x255)][_0x4b94e6];},Game_BattlerBase[_0x21ac3c(0x225)]['createProvokeHeightOrigin']=function(){const _0x28cfb0=_0x21ac3c,_0x4ba94d=this[_0x28cfb0(0x33d)]()?this[_0x28cfb0(0x201)]()[_0x28cfb0(0x1ee)]:this[_0x28cfb0(0x2f5)]()?this[_0x28cfb0(0x320)]()[_0x28cfb0(0x1ee)]:'';if(_0x4ba94d[_0x28cfb0(0x2da)](/<PROVOKE HEIGHT ORIGIN: (\d+)([%％])>/i))return Number(RegExp['$1'])*0.01;return VisuMZ[_0x28cfb0(0x2de)]['Settings'][_0x28cfb0(0x226)][_0x28cfb0(0x258)];},Game_BattlerBase[_0x21ac3c(0x225)]['removeDeadProvokerStates']=function(){const _0x56e9b6=_0x21ac3c;for(const _0x3496b3 of this[_0x56e9b6(0x361)]()){if(DataManager[_0x56e9b6(0x206)](_0x3496b3)){if(this['_provoker']===undefined)this['clearProvokers']();const _0x32f683=this[_0x56e9b6(0x22c)][_0x3496b3['id']],_0x139a20=BattleManager[_0x56e9b6(0x34c)](_0x32f683);_0x139a20&&_0x139a20[_0x56e9b6(0x279)]()&&this['removeState'](_0x3496b3['id']);}}},Game_BattlerBase[_0x21ac3c(0x225)]['matchTauntType']=function(_0x1d5f2c){const _0x44985f=_0x21ac3c;switch(_0x1d5f2c){case Game_Action[_0x44985f(0x1f9)]:return this[_0x44985f(0x1ea)]();break;case Game_Action[_0x44985f(0x31d)]:return this[_0x44985f(0x1db)]();break;case Game_Action[_0x44985f(0x34e)]:return this[_0x44985f(0x266)]();break;}},Game_BattlerBase['prototype'][_0x21ac3c(0x24b)]=function(){const _0x4da369=_0x21ac3c;return this['physicalTaunt']()||this[_0x4da369(0x1db)]()||this[_0x4da369(0x266)]();},Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x1ea)]=function(){const _0x5b4d39=_0x21ac3c;return this['traitObjects']()[_0x5b4d39(0x26d)](_0x167f18=>_0x167f18&&_0x167f18[_0x5b4d39(0x1ee)][_0x5b4d39(0x2da)](/<(?:TAUNT|PHYSICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x1db)]=function(){const _0x845ed5=_0x21ac3c;return this[_0x845ed5(0x20f)]()[_0x845ed5(0x26d)](_0xa65703=>_0xa65703&&_0xa65703[_0x845ed5(0x1ee)][_0x845ed5(0x2da)](/<(?:TAUNT|MAGICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x266)]=function(){const _0x15d7a9=_0x21ac3c;return this['traitObjects']()[_0x15d7a9(0x26d)](_0x2ceaba=>_0x2ceaba&&_0x2ceaba[_0x15d7a9(0x1ee)][_0x15d7a9(0x2da)](/<(?:TAUNT|CERTAIN TAUNT|CERTAIN HIT TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x32a)]=function(){const _0x2a533e=_0x21ac3c;return this['traitObjects']()[_0x2a533e(0x26d)](_0x2525b7=>_0x2525b7&&_0x2525b7['note'][_0x2a533e(0x2da)](/<BYPASS TAUNT>/i));},Game_BattlerBase['prototype'][_0x21ac3c(0x30b)]=function(){const _0x17cd06=_0x21ac3c;this[_0x17cd06(0x2cf)]=0x1;},VisuMZ[_0x21ac3c(0x2de)]['Game_BattlerBase_sparam']=Game_BattlerBase['prototype']['sparam'],Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x294)]=function(_0x35cde9){const _0x1d03a0=_0x21ac3c;let _0x1989bb=VisuMZ[_0x1d03a0(0x2de)][_0x1d03a0(0x280)][_0x1d03a0(0x272)](this,_0x35cde9);if(_0x35cde9===0x0){if(this[_0x1d03a0(0x2cf)]===undefined)this[_0x1d03a0(0x30b)]();_0x1989bb*=this[_0x1d03a0(0x314)]();}return _0x1989bb;},Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x1d2)]=function(_0x5df528){const _0x439224=_0x21ac3c;if(this['_aggro']===undefined)this[_0x439224(0x30b)]();this[_0x439224(0x2cf)]=Math[_0x439224(0x300)](0x1,Math['round'](this[_0x439224(0x2cf)]));},Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x1d1)]=function(_0x23de63){const _0x30520c=_0x21ac3c;if(this[_0x30520c(0x2cf)]===undefined)this['clearAggro']();this[_0x30520c(0x2cf)]=Math['max'](0x1,this[_0x30520c(0x2cf)]+Math['round'](_0x23de63));},Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x1da)]=function(_0x4d0770){const _0x353191=_0x21ac3c;this[_0x353191(0x1d1)](-_0x4d0770);},Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x314)]=function(){const _0x3f1463=_0x21ac3c;if(this[_0x3f1463(0x279)]())return 0x0;return this[_0x3f1463(0x288)]()*this[_0x3f1463(0x2d7)]();},Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x1cb)]=function(){const _0x56613b=_0x21ac3c;return this['_aggro']===undefined&&this[_0x56613b(0x30b)](),this[_0x56613b(0x2cf)];},Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x288)]=function(){const _0x417f91=_0x21ac3c;return this[_0x417f91(0x20f)]()[_0x417f91(0x313)]((_0x3662e,_0x3357ce)=>{const _0x1b92ad=_0x417f91;if(_0x3357ce&&_0x3357ce[_0x1b92ad(0x1ee)][_0x1b92ad(0x2da)](/<(?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i))return _0x1b92ad(0x2f0)!=='FLDBD'?_0x3662e+Number(RegExp['$1'])/0x64:this[_0x1b92ad(0x26f)]['constructor']===_0x455c33;else{if(_0x1b92ad(0x1ce)===_0x1b92ad(0x1f5))this[_0x1b92ad(0x26f)]=_0x41cd9d,_0x350f5a['prototype']['initialize']['call'](this),this[_0x1b92ad(0x218)](),this[_0x1b92ad(0x2f9)]();else return _0x3662e;}},this['battleAggro']());},Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x2d7)]=function(){const _0x5327fc=_0x21ac3c;return this[_0x5327fc(0x20f)]()[_0x5327fc(0x313)]((_0x528eec,_0x182b88)=>{const _0x4b6af2=_0x5327fc;return _0x182b88&&_0x182b88[_0x4b6af2(0x1ee)][_0x4b6af2(0x2da)](/<(?:AGGRO|ENMITY|THREAT) MULTIPLIER: (\d+)%>/i)?_0x528eec+Number(RegExp['$1'])/0x64:_0x4b6af2(0x25d)!=='BobAV'?_0x4bd95b:_0x528eec;},0x1);},Game_BattlerBase[_0x21ac3c(0x225)]['bypassHighestAggro']=function(){const _0x260663=_0x21ac3c;return this[_0x260663(0x20f)]()[_0x260663(0x26d)](_0x2a9431=>_0x2a9431&&_0x2a9431['note'][_0x260663(0x2da)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},Game_BattlerBase[_0x21ac3c(0x225)][_0x21ac3c(0x28b)]=function(){const _0x257019=_0x21ac3c;return this['traitObjects']()['some'](_0x4ca62a=>_0x4ca62a&&_0x4ca62a[_0x257019(0x1ee)][_0x257019(0x2da)](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},VisuMZ['AggroControlSystem'][_0x21ac3c(0x20d)]=Game_Battler['prototype'][_0x21ac3c(0x35f)],Game_Battler[_0x21ac3c(0x225)]['onBattleStart']=function(_0x25aa26){const _0x521175=_0x21ac3c;VisuMZ['AggroControlSystem']['Game_Battler_onBattleStart'][_0x521175(0x272)](this,_0x25aa26),this[_0x521175(0x30b)]();},VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x357)]=Game_Battler['prototype'][_0x21ac3c(0x311)],Game_Battler[_0x21ac3c(0x225)][_0x21ac3c(0x311)]=function(){const _0x5127dc=_0x21ac3c;VisuMZ[_0x5127dc(0x2de)][_0x5127dc(0x357)]['call'](this),this[_0x5127dc(0x30b)]();},VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x274)]=Game_Battler[_0x21ac3c(0x225)][_0x21ac3c(0x219)],Game_Battler[_0x21ac3c(0x225)][_0x21ac3c(0x219)]=function(_0x21183e){const _0x53c3d3=_0x21ac3c;VisuMZ[_0x53c3d3(0x2de)]['Game_Battler_addState']['call'](this,_0x21183e),this[_0x53c3d3(0x1e6)](_0x21183e);},Game_Battler[_0x21ac3c(0x225)][_0x21ac3c(0x1e6)]=function(_0x457239){const _0x200035=_0x21ac3c;if(this['isStateAffected'](_0x457239)){if(this['_provoker']===undefined)this[_0x200035(0x276)]();const _0x27c8b1=BattleManager[_0x200035(0x240)](this);this[_0x200035(0x22c)][_0x457239]=_0x27c8b1,!this[_0x200035(0x22c)][_0x457239]&&delete this[_0x200035(0x22c)][_0x457239];}},VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x334)]=BattleManager[_0x21ac3c(0x2b0)],BattleManager[_0x21ac3c(0x2b0)]=function(_0x4febda,_0x511739){const _0x48f1fe=_0x21ac3c;this['_counterAttackingTarget']=_0x511739,VisuMZ[_0x48f1fe(0x2de)]['BattleManager_invokeCounterAttack'][_0x48f1fe(0x272)](this,_0x4febda,_0x511739),this[_0x48f1fe(0x1fe)]=undefined;},VisuMZ['AggroControlSystem'][_0x21ac3c(0x2fa)]=BattleManager[_0x21ac3c(0x28c)],BattleManager[_0x21ac3c(0x28c)]=function(_0x7a6f2b,_0x1f630e){const _0x18b6e9=_0x21ac3c;this['_counterAttackingTarget']=_0x1f630e,VisuMZ[_0x18b6e9(0x2de)]['BattleManager_invokeMagicReflection'][_0x18b6e9(0x272)](this,_0x7a6f2b,_0x1f630e),this['_counterAttackingTarget']=undefined;},Game_Unit['prototype'][_0x21ac3c(0x1dc)]=function(){const _0x6bc80e=_0x21ac3c;return this[_0x6bc80e(0x210)]()['filter'](_0x2b8e77=>_0x2b8e77&&_0x2b8e77[_0x6bc80e(0x1ea)]());},Game_Unit[_0x21ac3c(0x225)][_0x21ac3c(0x2ab)]=function(){const _0x557a28=_0x21ac3c;return this[_0x557a28(0x210)]()[_0x557a28(0x2db)](_0x1ef768=>_0x1ef768&&_0x1ef768[_0x557a28(0x1db)]());},Game_Unit[_0x21ac3c(0x225)][_0x21ac3c(0x27a)]=function(){const _0x2b7fa7=_0x21ac3c;return this[_0x2b7fa7(0x210)]()[_0x2b7fa7(0x2db)](_0x523d35=>_0x523d35&&_0x523d35[_0x2b7fa7(0x266)]());},Game_Unit[_0x21ac3c(0x225)][_0x21ac3c(0x26a)]=function(_0x3edca3){const _0x1f3cb6=_0x21ac3c;let _0x5bf568=[];switch(_0x3edca3){case Game_Action[_0x1f3cb6(0x1f9)]:_0x5bf568=this[_0x1f3cb6(0x1dc)]();break;case Game_Action[_0x1f3cb6(0x31d)]:_0x5bf568=this[_0x1f3cb6(0x2ab)]();break;case Game_Action[_0x1f3cb6(0x34e)]:_0x5bf568=this[_0x1f3cb6(0x27a)]();break;}let _0x2902c6=Math[_0x1f3cb6(0x306)]()*this[_0x1f3cb6(0x2be)](_0x5bf568),_0x12bf68=null;if(BattleManager[_0x1f3cb6(0x1fd)]()){if(_0x1f3cb6(0x2f6)===_0x1f3cb6(0x2f6)){const _0x10eb2c=!![];return this[_0x1f3cb6(0x277)](_0x5bf568,_0x10eb2c);}else return this['traitObjects']()[_0x1f3cb6(0x26d)](_0x3d339b=>_0x3d339b&&_0x3d339b[_0x1f3cb6(0x1ee)]['match'](/<BYPASS TAUNT>/i));}else{if(_0x1f3cb6(0x241)===_0x1f3cb6(0x2d5)){if(!this[_0x1f3cb6(0x26f)]['_battler'])return;if(!this[_0x1f3cb6(0x26f)][_0x1f3cb6(0x337)][_0x1f3cb6(0x325)]())return;const _0xbd140f=this['_mainSprite']['_battler'][_0x1f3cb6(0x325)]()[_0x1f3cb6(0x338)]();if(!_0xbd140f)return;const _0x2373ee=this[_0x1f3cb6(0x26f)][_0x1f3cb6(0x337)]['provokeHeightOrigin'](),_0xe265c1=this[_0x1f3cb6(0x26f)][_0x1f3cb6(0x337)][_0x1f3cb6(0x325)]()['provokeHeightOrigin']();this[_0x1f3cb6(0x328)]=this[_0x1f3cb6(0x26f)]['x'],this[_0x1f3cb6(0x305)]=this[_0x1f3cb6(0x26f)]['y']-this[_0x1f3cb6(0x26f)][_0x1f3cb6(0x249)]*_0x2373ee,this[_0x1f3cb6(0x20e)]=_0xbd140f['x'],this[_0x1f3cb6(0x216)]=_0xbd140f['y']-_0xbd140f['height']*_0xe265c1,this[_0x1f3cb6(0x328)]+=_0x36ee45['round']((_0x25dbe0['width']-_0x192be2['boxWidth'])/0x2),this[_0x1f3cb6(0x305)]+=_0x55884b[_0x1f3cb6(0x1cc)]((_0x210522[_0x1f3cb6(0x249)]-_0x5aee5c[_0x1f3cb6(0x363)])/0x2),this[_0x1f3cb6(0x20e)]+=_0x7daf06[_0x1f3cb6(0x1cc)]((_0x1d33fd[_0x1f3cb6(0x287)]-_0x10b0a3['boxWidth'])/0x2),this[_0x1f3cb6(0x216)]+=_0x565941[_0x1f3cb6(0x1cc)]((_0x44da0a[_0x1f3cb6(0x249)]-_0x2507ea[_0x1f3cb6(0x363)])/0x2);if(!_0x42870f['isSideView']()){if(_0xbd140f[_0x1f3cb6(0x337)][_0x1f3cb6(0x33d)]())_0x3e15d8=!![],this[_0x1f3cb6(0x20e)]+=_0x1ed5ba['_scene'][_0x1f3cb6(0x22a)]['x'],this[_0x1f3cb6(0x216)]+=_0x143161[_0x1f3cb6(0x200)]['_statusWindow']['y'];else _0xbd140f[_0x1f3cb6(0x337)][_0x1f3cb6(0x2f5)]()&&(_0x34bd27=!![],this[_0x1f3cb6(0x328)]+=_0x39ab1f[_0x1f3cb6(0x200)][_0x1f3cb6(0x22a)]['x'],this[_0x1f3cb6(0x305)]+=_0x3f10a1[_0x1f3cb6(0x200)][_0x1f3cb6(0x22a)]['y']);}}else{for(const _0x35b741 of _0x5bf568){_0x2902c6-=_0x35b741[_0x1f3cb6(0x237)],_0x2902c6<=0x0&&!_0x12bf68&&(_0x12bf68=_0x35b741);}return _0x12bf68||this['randomTarget']();}}},Game_Unit[_0x21ac3c(0x225)][_0x21ac3c(0x2be)]=function(_0x1a0896){const _0x20051e=_0x21ac3c;return _0x1a0896[_0x20051e(0x313)]((_0x23f7b9,_0x36f1a0)=>_0x23f7b9+_0x36f1a0[_0x20051e(0x237)],0x0);},Game_Unit['prototype'][_0x21ac3c(0x349)]=function(){const _0x492a10=_0x21ac3c,_0x4ced17=this[_0x492a10(0x210)]()[_0x492a10(0x221)](_0x1c80ea=>_0x1c80ea[_0x492a10(0x237)]);return Math[_0x492a10(0x300)](..._0x4ced17);},Game_Unit[_0x21ac3c(0x225)]['tgrMin']=function(){const _0x5da270=_0x21ac3c,_0x4c1e17=this[_0x5da270(0x210)]()[_0x5da270(0x221)](_0x5ad87d=>_0x5ad87d[_0x5da270(0x237)]);return Math[_0x5da270(0x215)](..._0x4c1e17);},Game_Unit['prototype'][_0x21ac3c(0x35d)]=function(){const _0x24f4aa=_0x21ac3c;this[_0x24f4aa(0x1eb)]=undefined,this[_0x24f4aa(0x345)]=undefined;},Game_Unit[_0x21ac3c(0x225)][_0x21ac3c(0x36b)]=function(){const _0x7f9b09=_0x21ac3c;if(!this[_0x7f9b09(0x1eb)]){if(_0x7f9b09(0x36c)!==_0x7f9b09(0x2ef)){const _0x4f63aa=this[_0x7f9b09(0x349)](),_0x4a5d05=this[_0x7f9b09(0x210)]()[_0x7f9b09(0x2db)](_0x1d9743=>_0x1d9743[_0x7f9b09(0x237)]===_0x4f63aa);this['_highestTgrMember']=_0x4a5d05[Math['randomInt'](_0x4a5d05[_0x7f9b09(0x245)])]||this[_0x7f9b09(0x2f4)]();}else _0x38a7bf[_0x7f9b09(0x2de)]['Game_Battler_addState'][_0x7f9b09(0x272)](this,_0x24075f),this[_0x7f9b09(0x1e6)](_0x3f1e1b);}return this[_0x7f9b09(0x1eb)];},Game_Unit[_0x21ac3c(0x225)][_0x21ac3c(0x308)]=function(){const _0x1840f4=_0x21ac3c;if(!this['_lowestTgrMember']){const _0x430f7c=this['tgrMin'](),_0x105d7d=this['aliveMembers']()[_0x1840f4(0x2db)](_0x1aad0b=>_0x1aad0b['tgr']===_0x430f7c);this[_0x1840f4(0x345)]=_0x105d7d[Math['randomInt'](_0x105d7d[_0x1840f4(0x245)])]||this[_0x1840f4(0x2f4)]();}return this[_0x1840f4(0x345)];},VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x2a7)]=BattleManager[_0x21ac3c(0x292)],BattleManager['endAction']=function(){const _0x227325=_0x21ac3c;VisuMZ[_0x227325(0x2de)][_0x227325(0x2a7)]['call'](this),$gameParty[_0x227325(0x35d)](),$gameTroop['clearTgrCache']();},Game_Unit[_0x21ac3c(0x225)][_0x21ac3c(0x277)]=function(_0x5dd397,_0x23df7d){const _0x1432af=_0x21ac3c,_0x2ba8b3=_0x5dd397[_0x1432af(0x221)](_0x4e1b42=>_0x4e1b42['tgr']),_0x95e189=_0x23df7d?Math[_0x1432af(0x300)](..._0x2ba8b3):Math[_0x1432af(0x215)](..._0x2ba8b3),_0x2845de=_0x5dd397[_0x1432af(0x2db)](_0x177ccc=>_0x177ccc[_0x1432af(0x237)]===_0x95e189);return _0x2845de[Math[_0x1432af(0x35c)](_0x2845de['length'])]||this['randomTarget']();},VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x29a)]=Scene_Options[_0x21ac3c(0x225)][_0x21ac3c(0x2f2)],Scene_Options[_0x21ac3c(0x225)][_0x21ac3c(0x2f2)]=function(){const _0x1ceb7d=_0x21ac3c;let _0x294913=VisuMZ['AggroControlSystem'][_0x1ceb7d(0x29a)][_0x1ceb7d(0x272)](this);const _0x105aaf=VisuMZ[_0x1ceb7d(0x2de)][_0x1ceb7d(0x264)];if(_0x105aaf[_0x1ceb7d(0x226)]['AddOption']&&_0x105aaf[_0x1ceb7d(0x226)][_0x1ceb7d(0x2e3)])_0x294913++;if(_0x105aaf['Aggro'][_0x1ceb7d(0x1d7)]&&_0x105aaf['Aggro']['AdjustOptionsRect'])_0x294913++;return _0x294913;},Sprite_Battler['_animationCycleTime']=VisuMZ['AggroControlSystem'][_0x21ac3c(0x264)][_0x21ac3c(0x30f)][_0x21ac3c(0x1f7)],Sprite_Battler[_0x21ac3c(0x214)]=VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x264)][_0x21ac3c(0x30f)][_0x21ac3c(0x2fd)],Sprite_Battler[_0x21ac3c(0x30d)]=VisuMZ['AggroControlSystem']['Settings'][_0x21ac3c(0x30f)][_0x21ac3c(0x22f)],Sprite_Battler[_0x21ac3c(0x35a)]=VisuMZ['AggroControlSystem'][_0x21ac3c(0x264)][_0x21ac3c(0x30f)]['AniCertain'],Sprite_Battler['_mirrorActorTauntAnimations']=VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x264)][_0x21ac3c(0x30f)][_0x21ac3c(0x251)],Sprite_Battler[_0x21ac3c(0x2df)]=VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x264)][_0x21ac3c(0x30f)][_0x21ac3c(0x31f)],VisuMZ['AggroControlSystem'][_0x21ac3c(0x2ce)]=Sprite_Battler[_0x21ac3c(0x225)][_0x21ac3c(0x342)],Sprite_Battler['prototype'][_0x21ac3c(0x342)]=function(_0x2fa1a8){const _0x338998=_0x21ac3c;VisuMZ['AggroControlSystem'][_0x338998(0x2ce)]['call'](this,_0x2fa1a8);if(this[_0x338998(0x2bf)]()){if(_0x338998(0x32d)==='mgXLV')setTimeout(this[_0x338998(0x25c)][_0x338998(0x341)](this),0x3e8);else return 0x0;}},VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x304)]=Sprite_Battler[_0x21ac3c(0x225)][_0x21ac3c(0x218)],Sprite_Battler[_0x21ac3c(0x225)]['initMembers']=function(){const _0x2cb646=_0x21ac3c;VisuMZ[_0x2cb646(0x2de)][_0x2cb646(0x304)][_0x2cb646(0x272)](this),this[_0x2cb646(0x321)]();},Sprite_Battler[_0x21ac3c(0x225)]['initTauntAnimations']=function(){const _0x53fced=_0x21ac3c;this[_0x53fced(0x23b)]=VisuMZ[_0x53fced(0x2de)][_0x53fced(0x264)][_0x53fced(0x30f)][_0x53fced(0x1f7)],this[_0x53fced(0x267)]=[_0x53fced(0x2b4),_0x53fced(0x2d2),_0x53fced(0x2bc)];},Sprite_Battler['prototype'][_0x21ac3c(0x2bf)]=function(){const _0x50e0f0=_0x21ac3c;if(!Imported[_0x50e0f0(0x202)])return![];if(![Sprite_Actor,Sprite_Enemy]['includes'](this[_0x50e0f0(0x1e9)]))return![];return ConfigManager[_0x50e0f0(0x1d4)]&&VisuMZ['AggroControlSystem'][_0x50e0f0(0x264)][_0x50e0f0(0x226)]['ShowLines'];},Sprite_Battler[_0x21ac3c(0x225)][_0x21ac3c(0x25c)]=function(){const _0x33cde8=_0x21ac3c;if(!SceneManager[_0x33cde8(0x231)]())return;this['_provokeSprite']=new Sprite_ProvokeTrail(this),this[_0x33cde8(0x29c)]['parentContainer']()[_0x33cde8(0x228)](this[_0x33cde8(0x29c)]);},VisuMZ[_0x21ac3c(0x2de)]['Sprite_Battler_setBattler']=Sprite_Battler['prototype'][_0x21ac3c(0x1cd)],Sprite_Battler[_0x21ac3c(0x225)][_0x21ac3c(0x1cd)]=function(_0x44598b){const _0x4091da=_0x21ac3c;VisuMZ['AggroControlSystem']['Sprite_Battler_setBattler'][_0x4091da(0x272)](this,_0x44598b);if(this[_0x4091da(0x35b)])this['_aggroGaugeSprite'][_0x4091da(0x337)]=_0x44598b;},VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x1f6)]=Sprite_Battler['prototype'][_0x21ac3c(0x295)],Sprite_Battler[_0x21ac3c(0x225)]['update']=function(){const _0x12809e=_0x21ac3c;VisuMZ[_0x12809e(0x2de)][_0x12809e(0x1f6)]['call'](this),this[_0x12809e(0x227)]();},Sprite_Battler[_0x21ac3c(0x225)][_0x21ac3c(0x227)]=function(){const _0x4e6b49=_0x21ac3c;if(!Imported[_0x4e6b49(0x289)])return;if(!Imported['VisuMZ_1_BattleCore'])return;if(!VisuMZ[_0x4e6b49(0x2de)]['Settings'][_0x4e6b49(0x30f)]['ShowAnimation'])return;if(!this[_0x4e6b49(0x337)])return;this[_0x4e6b49(0x23b)]--,this[_0x4e6b49(0x23b)]<=0x0&&this['startNewTauntAnimation']();},Sprite_Battler[_0x21ac3c(0x225)][_0x21ac3c(0x2cd)]=function(){const _0x500fcf=_0x21ac3c;this[_0x500fcf(0x23b)]=Sprite_Battler[_0x500fcf(0x369)];if(!this[_0x500fcf(0x337)])return;if(!this[_0x500fcf(0x337)][_0x500fcf(0x24b)]())return;const _0x532572=[this[_0x500fcf(0x337)]],_0x23150b=this[_0x500fcf(0x250)](),_0xeb857a=this[_0x500fcf(0x337)]['isActor']()&&Sprite_Battler['_mirrorActorTauntAnimations'],_0x5cd3d5=Sprite_Battler[_0x500fcf(0x2df)];$gameTemp[_0x500fcf(0x299)](_0x532572,_0x23150b,_0xeb857a,_0x5cd3d5);},Sprite_Battler[_0x21ac3c(0x225)][_0x21ac3c(0x250)]=function(){const _0x2cf676=_0x21ac3c;let _0x5ee4ac=this[_0x2cf676(0x267)][_0x2cf676(0x245)];while(_0x5ee4ac){if('TRMRg'===_0x2cf676(0x33b))return'Battle\x20Enemy\x20%1'[_0x2cf676(0x1ef)](_0x50a660['index']());else{const _0x228598=this['_tauntAnimationCycle'][_0x2cf676(0x332)]();this[_0x2cf676(0x267)][_0x2cf676(0x33a)](_0x228598);const _0x49b5c9=_0x2cf676(0x2ac)[_0x2cf676(0x1ef)](_0x228598);if(this[_0x2cf676(0x337)][_0x49b5c9]()){if(_0x2cf676(0x2a1)==='ioNZN'){const _0x36da9c=_0x5d34d2[_0x2cf676(0x340)](this[_0x2cf676(0x350)]);return _0x36da9c[_0x2cf676(0x286)](this[_0x2cf676(0x278)]()[_0x2cf676(0x2eb)])?[_0x36da9c]:[_0x3b8062[_0x2cf676(0x26a)]()];}else{const _0x30a93b=_0x2cf676(0x366)[_0x2cf676(0x1ef)](_0x228598),_0x34a3fe=Sprite_Battler[_0x30a93b];if(_0x34a3fe)return _0x34a3fe;}}_0x5ee4ac--;}}return Sprite_Battler[_0x2cf676(0x35a)];},VisuMZ['AggroControlSystem'][_0x21ac3c(0x335)]=Sprite_Actor[_0x21ac3c(0x225)]['createStateSprite'],Sprite_Actor[_0x21ac3c(0x225)][_0x21ac3c(0x2d0)]=function(){const _0x2607c4=_0x21ac3c;VisuMZ[_0x2607c4(0x2de)][_0x2607c4(0x335)][_0x2607c4(0x272)](this),this[_0x2607c4(0x31c)]();},Sprite_Actor['prototype'][_0x21ac3c(0x31c)]=function(){const _0x226cb8=_0x21ac3c;if(this[_0x226cb8(0x1e9)]!==Sprite_Actor)return;if(!this[_0x226cb8(0x2c3)]())return;if(!SceneManager['isSceneBattle']())return;const _0x148bfe=VisuMZ[_0x226cb8(0x2de)]['Settings'][_0x226cb8(0x31e)],_0x148081=new Sprite_Gauge();_0x148081[_0x226cb8(0x2ba)]['x']=_0x148bfe[_0x226cb8(0x283)],_0x148081[_0x226cb8(0x2ba)]['y']=_0x148bfe[_0x226cb8(0x25a)];const _0x13717e=Sprite_Gauge['prototype'][_0x226cb8(0x2c1)]();_0x148081[_0x226cb8(0x234)]['x']=_0x148081[_0x226cb8(0x234)]['y']=_0x148bfe[_0x226cb8(0x290)],this[_0x226cb8(0x35b)]=_0x148081,this[_0x226cb8(0x228)](_0x148081);},Sprite_Actor[_0x21ac3c(0x225)][_0x21ac3c(0x2c3)]=function(){const _0x195010=_0x21ac3c;if(Imported['VisuMZ_1_BattleCore']&&this[_0x195010(0x1e9)]===Sprite_SvEnemy)return![];return ConfigManager[_0x195010(0x2c2)]&&VisuMZ[_0x195010(0x2de)][_0x195010(0x264)][_0x195010(0x31e)][_0x195010(0x30a)];},VisuMZ['AggroControlSystem'][_0x21ac3c(0x346)]=Sprite_Actor[_0x21ac3c(0x225)][_0x21ac3c(0x295)],Sprite_Actor[_0x21ac3c(0x225)][_0x21ac3c(0x295)]=function(){const _0x17f522=_0x21ac3c;VisuMZ[_0x17f522(0x2de)][_0x17f522(0x346)][_0x17f522(0x272)](this),this[_0x17f522(0x2a2)]();},Sprite_Actor[_0x21ac3c(0x225)][_0x21ac3c(0x2a2)]=function(){const _0x5d9050=_0x21ac3c;if(!this[_0x5d9050(0x337)])return;if(!this['_aggroGaugeSprite'])return;const _0x137f2e=VisuMZ[_0x5d9050(0x2de)]['Settings'][_0x5d9050(0x31e)],_0x4f21f6=this[_0x5d9050(0x35b)];let _0x79c00c=_0x137f2e[_0x5d9050(0x323)];this['_battler'][_0x5d9050(0x246)]&&(_0x79c00c+=this[_0x5d9050(0x337)][_0x5d9050(0x246)]());let _0x48d513=_0x137f2e[_0x5d9050(0x24d)];this[_0x5d9050(0x337)][_0x5d9050(0x2ea)]&&(_0x5d9050(0x282)!==_0x5d9050(0x368)?_0x48d513+=this[_0x5d9050(0x337)][_0x5d9050(0x2ea)]():(_0x52b790['AggroControlSystem']['Sprite_Actor_update'][_0x5d9050(0x272)](this),this[_0x5d9050(0x2a2)]())),_0x4f21f6['x']=_0x79c00c,_0x4f21f6['y']=-this[_0x5d9050(0x249)]+_0x48d513,this[_0x5d9050(0x337)]&&_0x4f21f6['_statusType']!==_0x5d9050(0x314)&&(_0x4f21f6[_0x5d9050(0x24a)]=!![],_0x4f21f6[_0x5d9050(0x2e0)](this[_0x5d9050(0x337)],'aggro')),this[_0x5d9050(0x234)]['x']<0x0&&(_0x4f21f6[_0x5d9050(0x234)]['x']=-Math[_0x5d9050(0x2d6)](_0x4f21f6[_0x5d9050(0x234)]['x']));},Sprite_Gauge[_0x21ac3c(0x225)]['isAggroType']=function(){const _0xce11b4=_0x21ac3c;return this[_0xce11b4(0x337)]&&this['_statusType']===_0xce11b4(0x314);},VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x2dc)]=Sprite_Gauge[_0x21ac3c(0x225)][_0x21ac3c(0x26c)],Sprite_Gauge['prototype'][_0x21ac3c(0x26c)]=function(){const _0x37b943=_0x21ac3c;if(this['isAggroType']()){if(_0x37b943(0x223)!==_0x37b943(0x2fc))return 0x0;else{if(_0x1cf788[_0x37b943(0x206)](_0x55dc1)){if(this[_0x37b943(0x22c)]===_0x95bca4)this[_0x37b943(0x276)]();const _0x3fbad4=this[_0x37b943(0x22c)][_0x56fbf0['id']],_0x3cd168=_0xea9464[_0x37b943(0x34c)](_0x3fbad4);_0x3cd168&&_0x3cd168['isDead']()&&this[_0x37b943(0x20b)](_0x16aa4f['id']);}}}else return VisuMZ[_0x37b943(0x2de)][_0x37b943(0x2dc)][_0x37b943(0x272)](this);},VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x27b)]=Sprite_Gauge['prototype']['gaugeRate'],Sprite_Gauge[_0x21ac3c(0x225)][_0x21ac3c(0x1e7)]=function(){const _0x2f2de3=_0x21ac3c;let _0x58b27a=VisuMZ['AggroControlSystem'][_0x2f2de3(0x27b)][_0x2f2de3(0x272)](this);if(this[_0x2f2de3(0x232)]()&&this[_0x2f2de3(0x337)]){if(_0x2f2de3(0x212)!==_0x2f2de3(0x212))_0x5e5cdb['AggroControlSystem'][_0x2f2de3(0x358)][_0x2f2de3(0x272)](this),this[_0x2f2de3(0x29b)]();else{if(this[_0x2f2de3(0x337)][_0x2f2de3(0x279)]())return 0x0;if(this['_battler'][_0x2f2de3(0x1fa)]()&&this[_0x2f2de3(0x337)]['friendsUnit']()[_0x2f2de3(0x210)]()['length']===0x1)return 0x1;}}return _0x58b27a['clamp'](0x0,0x1);},VisuMZ[_0x21ac3c(0x2de)]['Sprite_Gauge_currentValue']=Sprite_Gauge[_0x21ac3c(0x225)][_0x21ac3c(0x2c8)],Sprite_Gauge[_0x21ac3c(0x225)]['currentValue']=function(){const _0xb39318=_0x21ac3c;if(this[_0xb39318(0x232)]()){if(_0xb39318(0x353)===_0xb39318(0x353))return this['currentValueAggroControl']();else this[_0xb39318(0x2fb)]();}else return VisuMZ[_0xb39318(0x2de)]['Sprite_Gauge_currentValue'][_0xb39318(0x272)](this);},Sprite_Gauge[_0x21ac3c(0x225)][_0x21ac3c(0x302)]=function(){const _0x48c3f4=_0x21ac3c,_0x47e67c=this[_0x48c3f4(0x337)][_0x48c3f4(0x2d9)](),_0x142f06=this['_battler'][_0x48c3f4(0x237)]-_0x47e67c[_0x48c3f4(0x36a)](),_0x1f1703=_0x47e67c['tgrMax']()-_0x47e67c['tgrMin']();if(_0x142f06>=_0x1f1703)return 0x64;return _0x142f06/Math[_0x48c3f4(0x300)](_0x1f1703,0x1)*0x64;},VisuMZ[_0x21ac3c(0x2de)]['Sprite_Gauge_currentMaxValue']=Sprite_Gauge[_0x21ac3c(0x225)][_0x21ac3c(0x1d3)],Sprite_Gauge[_0x21ac3c(0x225)][_0x21ac3c(0x1d3)]=function(){const _0x537218=_0x21ac3c;return this[_0x537218(0x232)]()?this[_0x537218(0x2b6)]():VisuMZ[_0x537218(0x2de)][_0x537218(0x2a8)][_0x537218(0x272)](this);},Sprite_Gauge[_0x21ac3c(0x225)][_0x21ac3c(0x2b6)]=function(){return 0x64;},VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x34b)]=Sprite_Gauge[_0x21ac3c(0x225)][_0x21ac3c(0x275)],Sprite_Gauge[_0x21ac3c(0x225)]['gaugeColor1']=function(){const _0x46d748=_0x21ac3c;return this['isAggroType']()?ColorManager[_0x46d748(0x253)]():VisuMZ[_0x46d748(0x2de)][_0x46d748(0x34b)][_0x46d748(0x272)](this);},VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x1fc)]=Sprite_Gauge['prototype']['gaugeColor2'],Sprite_Gauge[_0x21ac3c(0x225)][_0x21ac3c(0x367)]=function(){const _0x59cf2b=_0x21ac3c;if(this['isAggroType']())return ColorManager['aggroGaugeColor2']();else{if(_0x59cf2b(0x293)===_0x59cf2b(0x23a)){if(this[_0x59cf2b(0x278)]()[_0x59cf2b(0x262)]!==0x1)return![];if(this[_0x59cf2b(0x350)]>=0x0)return![];if(_0x293ab8[_0x59cf2b(0x209)](this['item']()))return![];if(this[_0x59cf2b(0x32c)]()[_0x59cf2b(0x30e)]())return![];if(_0xc3d133[_0x59cf2b(0x28b)](this[_0x59cf2b(0x278)]()))return!![];if(this[_0x59cf2b(0x32c)]()[_0x59cf2b(0x28b)]())return!![];return _0x361f67[_0x59cf2b(0x1fd)]();}else return VisuMZ[_0x59cf2b(0x2de)][_0x59cf2b(0x1fc)][_0x59cf2b(0x272)](this);}},VisuMZ['AggroControlSystem'][_0x21ac3c(0x358)]=Sprite_Gauge['prototype'][_0x21ac3c(0x295)],Sprite_Gauge[_0x21ac3c(0x225)][_0x21ac3c(0x295)]=function(){const _0x5a6f30=_0x21ac3c;VisuMZ[_0x5a6f30(0x2de)][_0x5a6f30(0x358)][_0x5a6f30(0x272)](this),this[_0x5a6f30(0x29b)]();},Sprite_Gauge['prototype'][_0x21ac3c(0x29b)]=function(){const _0x13365a=_0x21ac3c;if(!this[_0x13365a(0x232)]())return;if(!Imported[_0x13365a(0x202)])return;const _0x52a27e=this[_0x13365a(0x337)][_0x13365a(0x338)]();if(this['_menuAggroType'])this[_0x13365a(0x256)]=0xff;else _0x52a27e&&_0x52a27e['opacity']>0x0?this['opacity']=0xff:_0x13365a(0x27d)===_0x13365a(0x1de)?this[_0x13365a(0x2cf)]=0x1:this['opacity']=0x0;},VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x220)]=Sprite_Gauge['prototype']['drawValue'],Sprite_Gauge[_0x21ac3c(0x225)]['drawValue']=function(){const _0x24d98f=_0x21ac3c;if(this['isAggroType']())return;VisuMZ[_0x24d98f(0x2de)][_0x24d98f(0x220)]['call'](this);};function Sprite_ProvokeTrail(){const _0x108e40=_0x21ac3c;this[_0x108e40(0x342)](...arguments);}Sprite_ProvokeTrail[_0x21ac3c(0x225)]=Object[_0x21ac3c(0x2ae)](Sprite['prototype']),Sprite_ProvokeTrail['prototype'][_0x21ac3c(0x1e9)]=Sprite_ProvokeTrail,Sprite_ProvokeTrail[_0x21ac3c(0x225)][_0x21ac3c(0x342)]=function(_0x5f5948){const _0x28f007=_0x21ac3c;this['_mainSprite']=_0x5f5948,Sprite['prototype'][_0x28f007(0x342)][_0x28f007(0x272)](this),this[_0x28f007(0x218)](),this[_0x28f007(0x2f9)]();},Sprite_ProvokeTrail[_0x21ac3c(0x225)][_0x21ac3c(0x218)]=function(){const _0x283089=_0x21ac3c,_0xed3375=VisuMZ[_0x283089(0x2de)][_0x283089(0x264)][_0x283089(0x226)];this['anchor']['x']=0.5,this['anchor']['y']=0.5,this['_homeX']=0x0,this['_homeY']=0x0,this[_0x283089(0x20e)]=0x0,this['_targetY']=0x0,this[_0x283089(0x256)]=0x0,this[_0x283089(0x1fb)]=_0xed3375[_0x283089(0x307)],this[_0x283089(0x2f3)]=_0xed3375[_0x283089(0x254)];},Sprite_ProvokeTrail[_0x21ac3c(0x225)][_0x21ac3c(0x339)]=function(){const _0x581f01=_0x21ac3c;return VisuMZ[_0x581f01(0x2de)][_0x581f01(0x264)][_0x581f01(0x226)][_0x581f01(0x2b8)];},Sprite_ProvokeTrail['prototype'][_0x21ac3c(0x1c9)]=function(){const _0x476f13=_0x21ac3c;return VisuMZ[_0x476f13(0x2de)][_0x476f13(0x264)][_0x476f13(0x226)][_0x476f13(0x27c)]/0x64;},Sprite_ProvokeTrail[_0x21ac3c(0x225)][_0x21ac3c(0x2f9)]=function(){const _0x5097ab=_0x21ac3c;this[_0x5097ab(0x1f0)]=[];let _0x18dcc2=0x0;for(let _0x16762a=0x0;_0x16762a<=this['maxSprites']();_0x16762a++){if('jKzDQ'===_0x5097ab(0x33e)){const _0x39a446=new Sprite();_0x39a446['bitmap']=ImageManager['provokeBitmap'](),_0x39a446[_0x5097ab(0x2ba)]['x']=0.5,_0x39a446[_0x5097ab(0x2ba)]['y']=0.5,_0x39a446[_0x5097ab(0x234)]['x']=_0x39a446[_0x5097ab(0x234)]['y']=this['partsSize'](),_0x39a446[_0x5097ab(0x256)]=_0x18dcc2,_0x39a446[_0x5097ab(0x2f3)]=this[_0x5097ab(0x2f3)],this['addChild'](_0x39a446),this['_sprites']['push'](_0x39a446),_0x18dcc2+=this[_0x5097ab(0x1fb)];if(_0x18dcc2>=0xff)_0x18dcc2=0x0;}else{const _0x2b5cbd=this[_0x5097ab(0x349)](),_0x562122=this[_0x5097ab(0x210)]()[_0x5097ab(0x2db)](_0x362d72=>_0x362d72[_0x5097ab(0x237)]===_0x2b5cbd);this[_0x5097ab(0x1eb)]=_0x562122[_0x1b59cb[_0x5097ab(0x35c)](_0x562122['length'])]||this[_0x5097ab(0x2f4)]();}}},Sprite_ProvokeTrail[_0x21ac3c(0x225)][_0x21ac3c(0x23c)]=function(){const _0x15bdf5=_0x21ac3c;return this[_0x15bdf5(0x26f)][_0x15bdf5(0x1e9)]===Sprite_Actor;},Sprite_ProvokeTrail[_0x21ac3c(0x225)][_0x21ac3c(0x1c8)]=function(){const _0x9c6d6b=_0x21ac3c;return SceneManager[_0x9c6d6b(0x200)]['_spriteset'][_0x9c6d6b(0x1d5)];},Sprite_ProvokeTrail[_0x21ac3c(0x225)]['update']=function(){const _0x512f21=_0x21ac3c;Sprite[_0x512f21(0x225)]['update'][_0x512f21(0x272)](this),this['updateBattlerPositions'](),this[_0x512f21(0x355)](),this[_0x512f21(0x204)](),this['updateChildrenOpacity']();},Sprite_ProvokeTrail['prototype']['heightOrigin']=function(){const _0x185e9a=_0x21ac3c;return VisuMZ['AggroControlSystem'][_0x185e9a(0x264)]['Provoke'][_0x185e9a(0x258)];},Sprite_ProvokeTrail[_0x21ac3c(0x225)][_0x21ac3c(0x2e5)]=function(){const _0x433bc8=_0x21ac3c;if(!this[_0x433bc8(0x26f)][_0x433bc8(0x337)])return;if(!this[_0x433bc8(0x26f)][_0x433bc8(0x337)][_0x433bc8(0x325)]())return;const _0x27b5a1=this['_mainSprite'][_0x433bc8(0x337)]['provoker']()['battler']();if(!_0x27b5a1)return;const _0x148246=this[_0x433bc8(0x26f)][_0x433bc8(0x337)][_0x433bc8(0x236)](),_0x53de93=this[_0x433bc8(0x26f)]['_battler'][_0x433bc8(0x325)]()[_0x433bc8(0x236)]();this[_0x433bc8(0x328)]=this[_0x433bc8(0x26f)]['x'],this[_0x433bc8(0x305)]=this[_0x433bc8(0x26f)]['y']-this[_0x433bc8(0x26f)][_0x433bc8(0x249)]*_0x148246,this[_0x433bc8(0x20e)]=_0x27b5a1['x'],this[_0x433bc8(0x216)]=_0x27b5a1['y']-_0x27b5a1[_0x433bc8(0x249)]*_0x53de93,this[_0x433bc8(0x328)]+=Math[_0x433bc8(0x1cc)]((Graphics['width']-Graphics[_0x433bc8(0x34a)])/0x2),this[_0x433bc8(0x305)]+=Math[_0x433bc8(0x1cc)]((Graphics[_0x433bc8(0x249)]-Graphics[_0x433bc8(0x363)])/0x2),this['_targetX']+=Math[_0x433bc8(0x1cc)]((Graphics['width']-Graphics[_0x433bc8(0x34a)])/0x2),this[_0x433bc8(0x216)]+=Math['round']((Graphics[_0x433bc8(0x249)]-Graphics[_0x433bc8(0x363)])/0x2);if(!$gameSystem[_0x433bc8(0x203)]()){if(_0x27b5a1[_0x433bc8(0x337)][_0x433bc8(0x33d)]())visible=!![],this[_0x433bc8(0x20e)]+=SceneManager[_0x433bc8(0x200)][_0x433bc8(0x22a)]['x'],this[_0x433bc8(0x216)]+=SceneManager['_scene']['_statusWindow']['y'];else _0x27b5a1[_0x433bc8(0x337)]['isEnemy']()&&(visible=!![],this['_homeX']+=SceneManager['_scene'][_0x433bc8(0x22a)]['x'],this[_0x433bc8(0x305)]+=SceneManager['_scene'][_0x433bc8(0x22a)]['y']);}},Sprite_ProvokeTrail['prototype'][_0x21ac3c(0x22d)]=function(){const _0x508151=_0x21ac3c;return VisuMZ[_0x508151(0x2de)][_0x508151(0x264)][_0x508151(0x226)][_0x508151(0x291)];},Sprite_ProvokeTrail['prototype'][_0x21ac3c(0x355)]=function(){const _0x688f9=_0x21ac3c;if(!this[_0x688f9(0x26f)]['_battler'])return;if(!this['_mainSprite']['_battler'][_0x688f9(0x325)]())return;if(!this[_0x688f9(0x1f0)])return;if(this[_0x688f9(0x1f0)][_0x688f9(0x245)]<=0x0)return;const _0x922c75=(this[_0x688f9(0x20e)]-this[_0x688f9(0x328)])/this[_0x688f9(0x339)](),_0x59b7fa=(this[_0x688f9(0x216)]-this['_homeY'])/this[_0x688f9(0x339)]();for(let _0x23385a=0x0;_0x23385a<=this['maxSprites']();_0x23385a++){if(_0x688f9(0x347)!==_0x688f9(0x347))_0x251a00['AggroControlSystem'][_0x688f9(0x273)][_0x688f9(0x272)](this);else{const _0x1e8f82=this[_0x688f9(0x1f0)][_0x23385a];if(!_0x1e8f82)continue;_0x1e8f82['x']=this['_homeX']+_0x922c75*_0x23385a;const _0x937924=this[_0x688f9(0x339)]()-_0x23385a,_0x4e0412=this[_0x688f9(0x339)]()/0x2,_0x265205=this[_0x688f9(0x22d)](),_0x3ddc3e=-_0x265205/Math[_0x688f9(0x235)](_0x4e0412,0x2),_0x21a183=_0x3ddc3e*Math[_0x688f9(0x235)](_0x937924-_0x4e0412,0x2)+_0x265205;_0x1e8f82['y']=this[_0x688f9(0x305)]+_0x59b7fa*_0x23385a-_0x21a183;}}},Sprite_ProvokeTrail['prototype']['maxOpacity']=function(){const _0x325849=_0x21ac3c;return VisuMZ[_0x325849(0x2de)][_0x325849(0x264)][_0x325849(0x226)]['Opacity'];},Sprite_ProvokeTrail[_0x21ac3c(0x225)][_0x21ac3c(0x204)]=function(){const _0x3cf2ec=_0x21ac3c,_0x5cef53=this[_0x3cf2ec(0x26f)]['_battler'];if(!_0x5cef53)this[_0x3cf2ec(0x256)]=0x0;else{if(_0x5cef53['isAlive']()&&_0x5cef53['provoker']())this['opacity']=0xff;else{if(_0x3cf2ec(0x23e)!==_0x3cf2ec(0x23e)){if(!_0x5df018['inBattle']())return;_0x5f190f[_0x3cf2ec(0x354)](_0x4d1830,_0x23d2ab);const _0x48fc48=_0x451ffb[_0x3cf2ec(0x201)](_0xedaa15['ActorID']),_0x5175a1=_0x325afb['Aggro'];if(_0x48fc48)_0x48fc48[_0x3cf2ec(0x1d1)](_0x5175a1);}else this[_0x3cf2ec(0x256)]=0x0;}}},Sprite_ProvokeTrail[_0x21ac3c(0x225)][_0x21ac3c(0x25b)]=function(){const _0x3ecfd9=_0x21ac3c;if(!this[_0x3ecfd9(0x26f)]['_battler'])return;if(!this[_0x3ecfd9(0x26f)][_0x3ecfd9(0x337)][_0x3ecfd9(0x325)]())return;if(!this[_0x3ecfd9(0x1f0)])return;if(this[_0x3ecfd9(0x1f0)][_0x3ecfd9(0x245)]<=0x0)return;for(let _0x8d7b7=0x0;_0x8d7b7<=this[_0x3ecfd9(0x339)]();_0x8d7b7++){const _0x878406=this[_0x3ecfd9(0x1f0)][this[_0x3ecfd9(0x23c)]()?this[_0x3ecfd9(0x339)]()-_0x8d7b7:_0x8d7b7];if(!_0x878406)continue;_0x878406[_0x3ecfd9(0x256)]-=this['_opacitySpeed'];if(_0x878406[_0x3ecfd9(0x256)]<=0x0)_0x878406['opacity']=0xff;}},VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x2b3)]=Spriteset_Battle[_0x21ac3c(0x225)][_0x21ac3c(0x20c)],Spriteset_Battle['prototype'][_0x21ac3c(0x20c)]=function(){const _0x49b3ed=_0x21ac3c;VisuMZ[_0x49b3ed(0x2de)][_0x49b3ed(0x2b3)][_0x49b3ed(0x272)](this),this['createBattleFieldAggroControl']();},Spriteset_Battle[_0x21ac3c(0x225)][_0x21ac3c(0x2fe)]=function(){const _0x541875=_0x21ac3c;if(!Imported[_0x541875(0x202)])return;const _0x1ab5dd=this[_0x541875(0x205)]['x'],_0x24b783=this['_battleField']['y'],_0x2d22ec=this['_battleField'][_0x541875(0x287)],_0x21306c=this[_0x541875(0x205)][_0x541875(0x249)];this['_provokeContainer']=new Sprite(),this[_0x541875(0x1d5)][_0x541875(0x20a)](0x0,0x0,_0x2d22ec,_0x21306c),this[_0x541875(0x1d5)]['x']=_0x1ab5dd,this['_provokeContainer']['y']=_0x24b783;if(Imported[_0x541875(0x202)]){const _0x24c610=this['children']['indexOf'](this['_damageContainer']);this['addChildAt'](this['_provokeContainer'],_0x24c610);}else{if(_0x541875(0x21d)===_0x541875(0x2ad))return _0x7f470d;else this[_0x541875(0x228)](this[_0x541875(0x1d5)]);}},VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x2c5)]=Spriteset_Battle[_0x21ac3c(0x225)][_0x21ac3c(0x295)],Spriteset_Battle[_0x21ac3c(0x225)]['update']=function(){const _0x18e40d=_0x21ac3c;VisuMZ[_0x18e40d(0x2de)][_0x18e40d(0x2c5)][_0x18e40d(0x272)](this),this[_0x18e40d(0x26e)]();},Spriteset_Battle[_0x21ac3c(0x225)][_0x21ac3c(0x26e)]=function(){const _0x30ead5=_0x21ac3c;if(!this['_provokeContainer'])return;if(!this[_0x30ead5(0x265)])return;this['_provokeContainer']['x']=this['_damageContainer']['x'],this[_0x30ead5(0x1d5)]['y']=this[_0x30ead5(0x265)]['y'];},VisuMZ[_0x21ac3c(0x2de)]['Window_BattleEnemy_refresh']=Window_BattleEnemy[_0x21ac3c(0x225)][_0x21ac3c(0x2cb)],Window_BattleEnemy[_0x21ac3c(0x225)]['refresh']=function(){const _0x34610d=_0x21ac3c;if(this[_0x34610d(0x317)]()){if(Imported[_0x34610d(0x202)]){if('GVoWC'===_0x34610d(0x2a0))this[_0x34610d(0x2fb)]();else return this[_0x34610d(0x33f)](_0x2561b5(_0x4db3b8));}Window_Selectable[_0x34610d(0x225)]['refresh']['call'](this);}else this[_0x34610d(0x23d)]()?(Imported[_0x34610d(0x202)]&&this[_0x34610d(0x2fb)](),Window_Selectable['prototype'][_0x34610d(0x2cb)][_0x34610d(0x272)](this)):VisuMZ['AggroControlSystem'][_0x34610d(0x273)][_0x34610d(0x272)](this);},Window_BattleEnemy[_0x21ac3c(0x225)][_0x21ac3c(0x317)]=function(){const _0x4f0027=_0x21ac3c,_0x330a01=BattleManager[_0x4f0027(0x2ff)](),_0x104af7=BattleManager[_0x4f0027(0x201)]();if(!_0x330a01)return![];if(!_0x104af7)return![];if(DataManager[_0x4f0027(0x1e5)](_0x330a01[_0x4f0027(0x278)]()))return![];if(_0x104af7['bypassProvoke']())return![];return _0x104af7[_0x4f0027(0x2b1)]()?(this[_0x4f0027(0x33c)]=[_0x104af7[_0x4f0027(0x325)]()],!![]):![];},Window_BattleEnemy['prototype'][_0x21ac3c(0x23d)]=function(){const _0x408378=_0x21ac3c,_0x5966db=BattleManager[_0x408378(0x2ff)](),_0xba23b8=BattleManager[_0x408378(0x201)](),_0x598bfc=$gameTroop;if(!_0x5966db)return![];if(!_0xba23b8)return![];if(!_0x5966db[_0x408378(0x278)]())return![];if(DataManager[_0x408378(0x2cc)](_0x5966db['item']()))return![];if(_0xba23b8['bypassTaunt']())return![];if(_0x5966db[_0x408378(0x2ee)]()&&_0x598bfc[_0x408378(0x1dc)]()[_0x408378(0x245)]>0x0)this['_enemies']=_0x598bfc[_0x408378(0x1dc)]();else{if(_0x5966db[_0x408378(0x1e0)]()&&_0x598bfc[_0x408378(0x2ab)]()[_0x408378(0x245)]>0x0){if(_0x408378(0x1e4)==='mklrC')this['_enemies']=_0x598bfc[_0x408378(0x2ab)]();else{const _0x279911=!![];return this[_0x408378(0x277)](_0x158434,_0x279911);}}else{if(_0x5966db[_0x408378(0x2a9)]()&&_0x598bfc['certainHitTauntMembers']()['length']>0x0)this[_0x408378(0x33c)]=_0x598bfc[_0x408378(0x27a)]();else return![];}}return!![];},VisuMZ['AggroControlSystem'][_0x21ac3c(0x362)]=Window_Options[_0x21ac3c(0x225)][_0x21ac3c(0x229)],Window_Options[_0x21ac3c(0x225)][_0x21ac3c(0x229)]=function(){const _0x2bd8f3=_0x21ac3c;VisuMZ[_0x2bd8f3(0x2de)][_0x2bd8f3(0x362)][_0x2bd8f3(0x272)](this),this['addAggroControlSystemCommands']();},Window_Options['prototype']['addAggroControlSystemCommands']=function(){const _0x5ee95f=_0x21ac3c;if(VisuMZ['AggroControlSystem']['Settings']['Provoke'][_0x5ee95f(0x1d7)]){if(_0x5ee95f(0x238)===_0x5ee95f(0x1d8)){this[_0x5ee95f(0x1f0)]=[];let _0x4107d0=0x0;for(let _0x8154a5=0x0;_0x8154a5<=this[_0x5ee95f(0x339)]();_0x8154a5++){const _0xadaf44=new _0x259351();_0xadaf44[_0x5ee95f(0x32e)]=_0x1894df[_0x5ee95f(0x296)](),_0xadaf44[_0x5ee95f(0x2ba)]['x']=0.5,_0xadaf44[_0x5ee95f(0x2ba)]['y']=0.5,_0xadaf44[_0x5ee95f(0x234)]['x']=_0xadaf44[_0x5ee95f(0x234)]['y']=this[_0x5ee95f(0x1c9)](),_0xadaf44[_0x5ee95f(0x256)]=_0x4107d0,_0xadaf44[_0x5ee95f(0x2f3)]=this[_0x5ee95f(0x2f3)],this[_0x5ee95f(0x228)](_0xadaf44),this[_0x5ee95f(0x1f0)]['push'](_0xadaf44),_0x4107d0+=this[_0x5ee95f(0x1fb)];if(_0x4107d0>=0xff)_0x4107d0=0x0;}}else this[_0x5ee95f(0x2e1)]();}VisuMZ[_0x5ee95f(0x2de)][_0x5ee95f(0x264)][_0x5ee95f(0x31e)][_0x5ee95f(0x1d7)]&&this[_0x5ee95f(0x2ec)]();},Window_Options[_0x21ac3c(0x225)]['addAggroControlSystemProvokeCommand']=function(){const _0x28d033=_0x21ac3c,_0x5a1b30=TextManager[_0x28d033(0x1d4)],_0x1c7ec6=_0x28d033(0x1d4);this[_0x28d033(0x1dd)](_0x5a1b30,_0x1c7ec6);},Window_Options[_0x21ac3c(0x225)][_0x21ac3c(0x2ec)]=function(){const _0x1a52a1=_0x21ac3c,_0x5e84a7=TextManager[_0x1a52a1(0x2c2)],_0x5ae96a=_0x1a52a1(0x2c2);this[_0x1a52a1(0x1dd)](_0x5e84a7,_0x5ae96a);},VisuMZ[_0x21ac3c(0x2de)][_0x21ac3c(0x248)]=Window_StatusBase[_0x21ac3c(0x225)][_0x21ac3c(0x1ed)],Window_StatusBase[_0x21ac3c(0x225)][_0x21ac3c(0x1ed)]=function(_0x1d7b33,_0x239045,_0x450e18){const _0xf2a18b=_0x21ac3c;if(this[_0xf2a18b(0x2b7)]())this[_0xf2a18b(0x222)](_0x1d7b33[_0xf2a18b(0x1d6)]());VisuMZ[_0xf2a18b(0x2de)][_0xf2a18b(0x248)][_0xf2a18b(0x272)](this,_0x1d7b33,_0x239045,_0x450e18);},Window_StatusBase['prototype'][_0x21ac3c(0x2b7)]=function(){const _0xaec12d=_0x21ac3c;if(![Window_BattleActor,Window_BattleStatus][_0xaec12d(0x2e6)](this[_0xaec12d(0x1e9)]))return![];if(!SceneManager[_0xaec12d(0x231)]())return![];return ConfigManager[_0xaec12d(0x2c2)]&&VisuMZ[_0xaec12d(0x2de)][_0xaec12d(0x264)][_0xaec12d(0x31e)]['StatusGauge'];},Window_StatusBase[_0x21ac3c(0x225)][_0x21ac3c(0x2d4)]=function(_0x41f344,_0x10e3eb,_0x2ad928){const _0x497770=_0x21ac3c;this[_0x497770(0x1ff)](_0x41f344,'aggro',_0x10e3eb,_0x2ad928);},Window_BattleStatus[_0x21ac3c(0x225)]['drawAggroGauge']=function(_0x146b4c){const _0x35d60f=_0x21ac3c,_0x75013=this[_0x35d60f(0x201)](_0x146b4c),_0x4c8716=this[_0x35d60f(0x24c)](_0x146b4c),_0x163e79=this['aggroGaugeY'](_0x146b4c),_0x2a1a8e=_0x35d60f(0x2bd)[_0x35d60f(0x1ef)](_0x75013['actorId']()),_0x6cbb0c=this[_0x35d60f(0x2a5)](_0x2a1a8e,Sprite_Gauge),_0x35ae65=VisuMZ[_0x35d60f(0x2de)]['Settings'][_0x35d60f(0x31e)];_0x6cbb0c['x']=_0x4c8716+(_0x35ae65['BattleStatusOffsetX']||0x0),_0x6cbb0c['y']=_0x163e79+(_0x35ae65['BattleStatusOffsetY']||0x0),_0x6cbb0c[_0x35d60f(0x1e3)]=!![],_0x6cbb0c['setup'](_0x75013,'aggro'),_0x6cbb0c[_0x35d60f(0x24a)]=!![];},Window_BattleStatus[_0x21ac3c(0x225)]['aggroGaugeX']=function(_0x2c3356){const _0x1807a7=_0x21ac3c;let _0x54d68d=this[_0x1807a7(0x239)](_0x2c3356),_0x1f8793=this[_0x1807a7(0x2e9)](_0x54d68d);if(Imported[_0x1807a7(0x202)]){if(_0x1807a7(0x1e1)===_0x1807a7(0x26b))return this[_0x1807a7(0x20f)]()[_0x1807a7(0x313)]((_0x59b0d0,_0xd52480)=>{const _0xa43659=_0x1807a7;return _0xd52480&&_0xd52480[_0xa43659(0x1ee)][_0xa43659(0x2da)](/<(?:AGGRO|ENMITY|THREAT) MULTIPLIER: (\d+)%>/i)?_0x59b0d0+_0x2a3cce(_0x18493d['$1'])/0x64:_0x59b0d0;},0x1);else{let _0x42707e=this[_0x1807a7(0x34d)](_0x2c3356);if(this[_0x1807a7(0x331)]()===_0x1807a7(0x21c)){const _0xa36ed6=$dataSystem[_0x1807a7(0x271)]?0x4:0x3,_0x388735=_0xa36ed6*0x80+(_0xa36ed6-0x1)*0x8+0x4,_0x4b6235=this['actor'](_0x2c3356);let _0x1ee3ad=_0x42707e['x']+this[_0x1807a7(0x230)];VisuMZ[_0x1807a7(0x301)][_0x1807a7(0x264)][_0x1807a7(0x303)][_0x1807a7(0x284)]?_0x1ee3ad=_0x42707e['x']+ImageManager[_0x1807a7(0x2a3)]+0x8:_0x1ee3ad+=ImageManager['iconWidth'],_0x1f8793=Math['round'](Math[_0x1807a7(0x215)](_0x42707e['x']+_0x42707e['width']-_0x388735,_0x1ee3ad)),_0x1f8793-=0x4;}else _0x1f8793=Math[_0x1807a7(0x1cc)](_0x42707e['x']+(_0x42707e[_0x1807a7(0x287)]-0x80)/0x2);}}return _0x1f8793;},Window_BattleStatus['prototype']['aggroGaugeY']=function(_0x3a8222){const _0x474eb8=_0x21ac3c,_0x55962b=this[_0x474eb8(0x34d)](_0x3a8222);let _0x45a1d9=this[_0x474eb8(0x2e4)](_0x55962b);if(Imported['VisuMZ_1_BattleCore']){if(_0x474eb8(0x31b)===_0x474eb8(0x31b)){if(this[_0x474eb8(0x331)]()===_0x474eb8(0x21c)){if('fGNAK'!=='AuDbN'){let _0x35bbc4=this[_0x474eb8(0x34d)](_0x3a8222);_0x45a1d9=Math['round'](_0x35bbc4['y']+(_0x35bbc4[_0x474eb8(0x249)]-Sprite_Name[_0x474eb8(0x225)][_0x474eb8(0x2a4)]())/0x2);}else _0xf4b582[_0x474eb8(0x2de)][_0x474eb8(0x2c5)][_0x474eb8(0x272)](this),this[_0x474eb8(0x26e)]();}}else _0x7d3bd1+=this[_0x474eb8(0x337)][_0x474eb8(0x2ea)]();}if(this[_0x474eb8(0x32f)]())_0x45a1d9-=Sprite_Gauge[_0x474eb8(0x225)][_0x474eb8(0x269)]()-0x1;return _0x45a1d9;},Window_BattleStatus['prototype']['isAtbGaugeVisible']=function(){const _0x2495eb=_0x21ac3c;if(!BattleManager['isTpb']())return![];if(Imported[_0x2495eb(0x257)])return this['showVisualAtbGauge']('time');return!![];};
//=============================================================================
// VisuStella MZ - Auto Skill Triggers
// VisuMZ_3_AutoSkillTriggers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_AutoSkillTriggers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AutoSkillTriggers = VisuMZ.AutoSkillTriggers || {};
VisuMZ.AutoSkillTriggers.version = 1.12;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.12] [AutoSkillTriggers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Auto_Skill_Triggers_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Sometimes you want some skills that only occur after a specific condition
 * triggers (ie. death, receiving specific elemental damage, or allies
 * performing skills of a specific type). These skill triggers are now made
 * possible through this plugin.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Skill triggers that launch at the start of battle or winning a battle.
 * * Skills that let actors/enemies do one last hurrah before dying.
 * * Skills that function as a reaction to the user performing specific actions
 *   ranging from basic attacks, guarding, items, physical attacks, magical
 *   attacks, certain hit attacks, skills from specific skill types, or actions
 *   that inflict any specific kind of elemental damage.
 * * A total of 60 different auto triggers for a variety of situations.
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
 * - VisuMZ_1_BattleCore
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
 * Battle System - FTB
 * Battle System - ETB
 * Battle System - PTB
 * 
 * These battle systems are incompatible with Auto Skill Triggers. This is due
 * to their turn structures, making them highly incompatible with the way that
 * Auto Skill Triggers work.
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
 * === Skill Trigger-Related Notetags ===
 *
 * <No Auto Skill Trigger>
 *
 * - Used for: Skill, Item State Notetags
 * - This prevents Auto Skill Triggers from occurring upon using this
 *   skill or item.
 *
 * ---
 *
 * <Auto Trigger: condition>
 *
 * <Auto Trigger x%: condition>
 *
 * - Used for: Skill Notetags
 * - Turns this skill into an Auto Trigger Skill, where it will automatically
 *   be used if the 'condition' has been met.
 * - If using the x% variant, the Auto Trigger has a x% chance to occur.
 *   - Replace 'x' with a number value representing the chance to succeed.
 * - Skill must be usable normally outside of the occasion in order to trigger.
 * - This marked skill cannot trigger any other Auto Skill Triggers in order to
 *   prevent an infinite loop.
 * - Skills can have multiple Auto Triggers and will trigger upon meeting the
 *   conditions of any of them.
 * - Replace 'condition' with any of the below keywords:
 * 
 *   *Note1*: Being the target of an action means the potential target must be
 *     a part of the original scope, regardless of how the targets are changed
 *     up later by Action Sequences.
 * 
 * Keywords:
 * 
 *   ---
 * 
 *   Battle Start
 *   - Triggers skill when the battle starts.
 * 
 *   Battle Win
 *   - Triggers skill when the battle is won.
 * 
 *   Death
 *   - Triggers skill moments before the user's death.
 *   - If the user recovers enough HP from the skill trigger, then the
 *     user won't die. However, any other Death triggered effects will
 *     still continue to prompt.
 * 
 *   ---
 * 
 *   Attack User
 *   - Triggers skill when the user uses a basic attack.
 * 
 *   Guard User
 *   - Triggers skill when the user guards.
 * 
 *   Item User
 *   - Triggers skill when the user uses any item.
 * 
 *   Physical User
 *   - Triggers skill when the user performs any physical action.
 * 
 *   Magical User
 *   - Triggers skill when the user performs any magical action.
 * 
 *   Certain Hit User
 *   - Triggers skill when the user performs a certain hit action.
 * 
 *   Skill Type name User
 *   - Triggers skill when the user performs a skill of the named
 *     Skill Type.
 * 
 *   Element name User
 *   - Triggers skill when the user performs an action with the named
 *     element type.
 * 
 *   ---
 * 
 *   Attack Target
 *   - Triggers skill when user is the target of a basic attack.
 *   - See Note1 Above.
 * 
 *   Guard Target
 *   - Triggers skill when user is the target of a guard action.
 *   - See Note1 Above.
 * 
 *   Item Target
 *   - Triggers skill when user is the target of an item action.
 *   - See Note1 Above.
 * 
 *   Physical Target
 *   - Triggers skill when user is the target of a physical action.
 *   - See Note1 Above.
 * 
 *   Magical Target
 *   - Triggers skill when user is the target of a magical action.
 *   - See Note1 Above.
 * 
 *   Certain Hit Target
 *   - Triggers skill when user is the target of a certain hit action.
 *   - See Note1 Above.
 * 
 *   Skill Type name Target
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type.
 *   - See Note1 Above.
 * 
 *   Element name Target
 *   - Triggers skill when user is the target of of an action with the named
 *     element type.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Ally
 *   - Triggers skill when user is the target of a basic attack
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Ally
 *   - Triggers skill when user is the target of a guard action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Ally
 *   - Triggers skill when user is the target of an item action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Ally
 *   - Triggers skill when user is the target of a physical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Ally
 *   - Triggers skill when user is the target of a magical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Ally
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Ally
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Ally
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Enemy
 *   - Triggers skill when user is the target of a basic attack
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Enemy
 *   - Triggers skill when user is the target of a guard action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Enemy
 *   - Triggers skill when user is the target of an item action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Enemy
 *   - Triggers skill when user is the target of a physical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Enemy
 *   - Triggers skill when user is the target of a magical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Enemy
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Enemy
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Enemy
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Friends
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Guard Friends
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Item Friends
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Physical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Magical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Certain Hit Friends
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Skill Type name Friends
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team.
 * 
 *   Element name Friends
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team.
 * 
 *   ---
 * 
 *   Attack Friends Only
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Guard Friends Only
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Item Friends Only
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Physical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Magical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Certain Hit Friends Only
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Skill Type name Friends Only
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   Element name Friends Only
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   ---
 * 
 *   Attack Opponents
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Guard Opponents
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Item Opponents
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Physical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Magical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Certain Hit Opponents
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Skill Type name Opponents
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   Element name Opponents
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   ---
 * 
 * Examples:
 * 
 *   <Auto Trigger: Battle Start>
 *   <Auto Trigger: Death>
 *   <Auto Trigger: Attack User>
 *   <Auto Trigger: Guard User>
 *   <Auto Trigger: Physical Target>
 *   <Auto Trigger: Magical Target>
 *   <Auto Trigger: Certain Hit Ally>
 *   <Auto Trigger: Item Enemy>
 *   <Auto Trigger: Skill Type Magic Ally>
 *   <Auto Trigger: Skill Type Special Enemy>
 *   <Auto Trigger: Element Fire Friends>
 *   <Auto Trigger: Element Ice Opponents>
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
 * Version 1.12: June 30, 2022
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.11: March 10, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.10: December 16, 2021
 * * Compatibility Update!
 * ** Auto Skill Triggers is now disabled with the following battle systems:
 *    ETB, FTB, and PTB. This is due to the way their turn structures work,
 *    making them highly incompatible with one another.
 * ** We may revisit this in the future, but for now, Auto Skill Triggers are
 *    to be disabled by code when any of the battle systems are detected.
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section.
 * 
 * Version 1.09: June 25, 2021
 * * Feature Update!
 * ** Added failsafe for those using illegal syntax charactes inside of their
 *    database type names which conflict with notetag creation. Fix by Irina.
 * 
 * Version 1.08: March 19, 2021
 * * Bug Fixes!
 * ** Death Triggers that cannot be used will no longer cause the battler to
 *    become immortal. Fix made by Irina.
 * 
 * Version 1.07: March 12, 2021
 * * Bug Fixes!
 * ** Battle Start auto-triggers should now work properly for actors when using
 *    auto-skills set up to be battle screen only. Fix made by Irina.
 * 
 * Version 1.06: February 12, 2021
 * * Optimization Update!
 * ** Skills that cannot be used will no longer be checked for auto triggers.
 *    Update made by Olivia.
 * 
 * Version 1.05: January 22, 2021
 * * Bug Fixes!
 * ** Triggers involving the user should now work properly. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Arisu:
 * *** <Auto Trigger x%: condition>
 * **** If using the x% variant, the Auto Trigger has a x% chance to occur.
 * **** Replace 'x' with a number value representing the chance to succeed.
 * 
 * Version 1.04: December 25, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for Battle System - STB.
 * 
 * Version 1.03: November 22, 2020
 * * Bug Fixes!
 * ** Auto Skill Triggers no long clear battler speed in TPB. Fixed by Yanfly.
 * 
 * Version 1.02: November 1, 2020
 * * Bug Fixes!
 * ** Stunned enemies will have their auto triggers bypassed. Fix made
 *    by Olivia.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Skills and Items used outside of battle should no longer crash the game.
 *    Fix made by Yanfly.
 * ** Specific trigger types should no longer crash the game.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release Date: October 28, 2020
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
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

const _0x52d166=_0x59b6;function _0xcefe(){const _0x554038=['CreateNotetag','hasDeathTransform','_deathAutoSkillTriggerPerformed','CreateNotetags','includes','isEnemy','BattleManager_checkBattleEnd','onDeath','constructAutoSkillTriggerOTB','162000TwYARd','ExaKE','hasDeathAutoSkillTrigger','_subject','meetsDeathAutoSkillTrigger','getSkillTypeNameFromID','_onBattleWinAutoSkillTriggerOn','ARRAYNUM','match','on%1Element%2','_actionBattlers','vJPdl','onAllActionsEnd','CnFIW','(?:SKILL\x20TYPE\x20%1\x20%2|STYPE\x20%1\x20%2)','TARGET','ARRAYFUNC','getSkillTypes','MyfVZ','on%1SType%2','isAutoSkillTrigger','EVAL','onBattleStart','refresh','ConvertParams','_forcedBattlers','Ljffs','on%2SType%1','ARRAYEVAL','_autoSkillTrigger','forceAction','isBattleSys','OPPONENTS','forceAutoSkillTrigger','Cannot\x20create\x20%1\x20and\x20%2\x20notetags','ARRAYSTRUCT','isMagical','ygOzK','ONDEATH','User','816575uWEgle','\x20\x20\x20','245691bjQRfc','on%1Magical','toUpperCase','isItem','(?:GUARD\x20%1|GUARD\x20%1)','JGXSG','44624yMKODO','parameters','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','return\x200','STRUCT','8264UaDMJs','description','oCktT','AutoSkillTriggers','485307cgxQGU','<AUTO\x20TRIGGER\x20(.*)([%％]):[\x20]%1>','stripNameTextCodes','random','revive','_savedAutoSkillTriggerActions','on%1Item','TaTIW','VisuMZ_1_BattleCore','otbAddActions','push','isActor','on%1Physical','(?:BATTLE\x20START|START\x20BATTLE|BATTLECRY|BATTLE\x20CRY|FANFARE|SNEAK\x20ATTACK)','map','Settings','JxiqK','ARRAYJSON','MEdXb','processAutoSkillTriggers','PpVKv','JSON','onBattleEnd','MloBH','pop','_inBattle','constructor','max','(?:CERTAIN\x20%1|CERTAIN\x20HIT\x20%1)','Scene_Boot_onDatabaseLoaded','processAutoSkillTrigger','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','<AUTO\x20TRIGGER:[\x20]%1>','applyAutoSkillTriggers','isAttack','STR','item','Game_Battler_clearTpbChargeTime','log','on%1Guard','indexOf','wpQKI','Friends','Opponents','occasion','Game_Unit_onBattleStart','opponentsUnit','lAMNT','name','adjustTurnOrderAutoSkillTrigger','ARRAYSTR','Game_Battler_onBattleEnd','processDeathAutoSkillTriggerEffects','FRIENDS','_targets','returnSavedAutoSkillTriggerActions','Game_Action_clear','FTB','83874HsjNbn','isSkill','_actions','Target','elements','on%1Certain','_scene','(?:PHYSICAL\x20%1|PHYSICAL\x20ATTACK\x20%1)','status','performAutoSkillTriggers','50vCJZAM','exit','===\x20This\x20Message\x20Only\x20Appears\x20in\x20Play\x20Test\x20===','ENEMY','addNewState','Ally','isAlive','isValid','getAutoSkillTriggerSTypes','_autoSkillTriggerBypassTpbClear','isAutoSkillTriggerCompatible','YmKRM','isAllDead','getAutoSkillTriggerElements','parse','FmnuS','subject','on%1Attack','friendsUnit','USER','endAction','_action','uMAkQ','Game_BattlerBase_revive','_currentTurn','length','damage','Game_Action_isValid','vSvjI','GMWEJ','ETB','getElementNameFromID','FUNC','(?:ELEMENT\x20%1\x20%2|ELE\x20%1\x20%2)','isOTB','canUse','process_VisuMZ_AutoSkillTriggers_Notetags','canMove','processOnBattleWinAutoSkillTriggers','note','BattleManager_endAction','Enemy','ALLY','Game_Action_applyGlobal','hasLifeStateAutoLifeEffect','replace','isActiveChainSkillsUiVisible','(?:ITEM\x20%1|ITEM\x20%1)','lgbyI','aliveMembers','trim','clear','ldyoN','1015wsRCJj','skills','Game_BattlerBase_isImmortal','VisuMZ_1_ElementStatusCore','checkDeathAutoSkillTriggerRemoval','isPhysical','on%2Element%1','clearDeathAutoSkillTrigger','checkBattleEnd','unshift','clearTpbChargeTime','FriendsOnly','setAutoSkillTrigger','isImmortal','isGuard','isSceneBattle','clone','_CHANCE','Game_BattlerBase_addNewState','FOGhj','isOptionValid','OTtvy','prototype','format','VisuMZ_3_InputComboSkills','canActivateDeathAutoSkillTrigger','(?:DEATH|DEATHRATTLE|DEATH\x20RATTLE|LASTWORD|LAST\x20WORD|FINAL\x20ATTACK)','elementId','Game_Battler_onBattleStart','NUM','_instance','FRIENDS\x20ONLY','VisuMZ_2_BattleSystemOTB','constructAutoSkillTrigger','15ooxxke','_deathAutoSkillTriggerActive','call','skillTypes','onDatabaseLoaded','VisuMZ_1_SkillsStatesCore','filter','RqGAP','applyGlobal','isCertainHit','RegExp','PTB','attackElements','canPerformInputComboSkills'];_0xcefe=function(){return _0x554038;};return _0xcefe();}(function(_0x581740,_0x17c782){const _0x1c3845=_0x59b6,_0x570e7c=_0x581740();while(!![]){try{const _0x2cd616=parseInt(_0x1c3845(0x163))/0x1+parseInt(_0x1c3845(0x1ac))/0x2*(parseInt(_0x1c3845(0x122))/0x3)+-parseInt(_0x1c3845(0x169))/0x4+-parseInt(_0x1c3845(0x161))/0x5+-parseInt(_0x1c3845(0x139))/0x6+parseInt(_0x1c3845(0x100))/0x7*(parseInt(_0x1c3845(0x16e))/0x8)+parseInt(_0x1c3845(0x172))/0x9*(-parseInt(_0x1c3845(0x1b6))/0xa);if(_0x2cd616===_0x17c782)break;else _0x570e7c['push'](_0x570e7c['shift']());}catch(_0x136064){_0x570e7c['push'](_0x570e7c['shift']());}}}(_0xcefe,0x20bbb));var label=_0x52d166(0x171),tier=tier||0x0,dependencies=[_0x52d166(0x17a)],pluginData=$plugins[_0x52d166(0x128)](function(_0x2e8918){const _0x12997c=_0x52d166;return _0x2e8918[_0x12997c(0x1b4)]&&_0x2e8918[_0x12997c(0x16f)][_0x12997c(0x134)]('['+label+']');})[0x0];function _0x59b6(_0x748c83,_0x37ec04){const _0xcefe9e=_0xcefe();return _0x59b6=function(_0x59b603,_0x2415f4){_0x59b603=_0x59b603-0xe8;let _0x5a1495=_0xcefe9e[_0x59b603];return _0x5a1495;},_0x59b6(_0x748c83,_0x37ec04);}VisuMZ[label][_0x52d166(0x181)]=VisuMZ[label][_0x52d166(0x181)]||{},VisuMZ[_0x52d166(0x151)]=function(_0x2d07c8,_0x5233f9){const _0x3f95cc=_0x52d166;for(const _0x144c10 in _0x5233f9){if(_0x144c10[_0x3f95cc(0x141)](/(.*):(.*)/i)){const _0x1af063=String(RegExp['$1']),_0x567558=String(RegExp['$2'])[_0x3f95cc(0x165)]()['trim']();let _0x545f29,_0x11afed,_0x14f3bc;switch(_0x567558){case _0x3f95cc(0x11d):_0x545f29=_0x5233f9[_0x144c10]!==''?Number(_0x5233f9[_0x144c10]):0x0;break;case _0x3f95cc(0x140):_0x11afed=_0x5233f9[_0x144c10]!==''?JSON[_0x3f95cc(0x1c4)](_0x5233f9[_0x144c10]):[],_0x545f29=_0x11afed[_0x3f95cc(0x180)](_0x4f91c6=>Number(_0x4f91c6));break;case _0x3f95cc(0x14e):_0x545f29=_0x5233f9[_0x144c10]!==''?eval(_0x5233f9[_0x144c10]):null;break;case _0x3f95cc(0x155):_0x11afed=_0x5233f9[_0x144c10]!==''?JSON[_0x3f95cc(0x1c4)](_0x5233f9[_0x144c10]):[],_0x545f29=_0x11afed['map'](_0x369ef0=>eval(_0x369ef0));break;case _0x3f95cc(0x187):_0x545f29=_0x5233f9[_0x144c10]!==''?JSON[_0x3f95cc(0x1c4)](_0x5233f9[_0x144c10]):'';break;case _0x3f95cc(0x183):_0x11afed=_0x5233f9[_0x144c10]!==''?JSON[_0x3f95cc(0x1c4)](_0x5233f9[_0x144c10]):[],_0x545f29=_0x11afed[_0x3f95cc(0x180)](_0x5ca838=>JSON[_0x3f95cc(0x1c4)](_0x5ca838));break;case _0x3f95cc(0xeb):_0x545f29=_0x5233f9[_0x144c10]!==''?new Function(JSON[_0x3f95cc(0x1c4)](_0x5233f9[_0x144c10])):new Function(_0x3f95cc(0x16c));break;case _0x3f95cc(0x149):_0x11afed=_0x5233f9[_0x144c10]!==''?JSON[_0x3f95cc(0x1c4)](_0x5233f9[_0x144c10]):[],_0x545f29=_0x11afed[_0x3f95cc(0x180)](_0x5a64e7=>new Function(JSON[_0x3f95cc(0x1c4)](_0x5a64e7)));break;case _0x3f95cc(0x195):_0x545f29=_0x5233f9[_0x144c10]!==''?String(_0x5233f9[_0x144c10]):'';break;case _0x3f95cc(0x1a4):_0x11afed=_0x5233f9[_0x144c10]!==''?JSON[_0x3f95cc(0x1c4)](_0x5233f9[_0x144c10]):[],_0x545f29=_0x11afed[_0x3f95cc(0x180)](_0x58fbc8=>String(_0x58fbc8));break;case _0x3f95cc(0x16d):_0x14f3bc=_0x5233f9[_0x144c10]!==''?JSON[_0x3f95cc(0x1c4)](_0x5233f9[_0x144c10]):{},_0x545f29=VisuMZ['ConvertParams']({},_0x14f3bc);break;case _0x3f95cc(0x15c):_0x11afed=_0x5233f9[_0x144c10]!==''?JSON[_0x3f95cc(0x1c4)](_0x5233f9[_0x144c10]):[],_0x545f29=_0x11afed['map'](_0x343315=>VisuMZ[_0x3f95cc(0x151)]({},JSON[_0x3f95cc(0x1c4)](_0x343315)));break;default:continue;}_0x2d07c8[_0x1af063]=_0x545f29;}}return _0x2d07c8;},(_0x243bdd=>{const _0x29043e=_0x52d166,_0x421c23=_0x243bdd[_0x29043e(0x1a2)];for(const _0x4e5cc7 of dependencies){if(!Imported[_0x4e5cc7]){if(_0x29043e(0x115)===_0x29043e(0x179))_0x3d72c2[_0x29043e(0x171)][_0x29043e(0x133)]();else{alert(_0x29043e(0x16b)['format'](_0x421c23,_0x4e5cc7)),SceneManager[_0x29043e(0x1b7)]();break;}}}const _0x320d5f=_0x243bdd[_0x29043e(0x16f)];if(_0x320d5f[_0x29043e(0x141)](/\[Version[ ](.*?)\]/i)){const _0x234a4c=Number(RegExp['$1']);_0x234a4c!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x29043e(0x117)](_0x421c23,_0x234a4c)),SceneManager[_0x29043e(0x1b7)]());}if(_0x320d5f[_0x29043e(0x141)](/\[Tier[ ](\d+)\]/i)){if(_0x29043e(0xe8)!==_0x29043e(0xe8))_0x80f8db[_0x29043e(0x171)][_0x29043e(0x18f)][_0x29043e(0x124)](this),this[_0x29043e(0xef)]();else{const _0xf28e16=Number(RegExp['$1']);_0xf28e16<tier?(alert(_0x29043e(0x191)['format'](_0x421c23,_0xf28e16,tier)),SceneManager[_0x29043e(0x1b7)]()):'CBKqF'==='CBKqF'?tier=Math[_0x29043e(0x18d)](_0xf28e16,tier):this[_0x29043e(0x1b5)](_0xd16990,_0x29043e(0xf4));}}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x243bdd[_0x29043e(0x16a)]);})(pluginData),VisuMZ[_0x52d166(0x171)][_0x52d166(0x18f)]=Scene_Boot[_0x52d166(0x116)][_0x52d166(0x126)],Scene_Boot['prototype'][_0x52d166(0x126)]=function(){const _0x21b78f=_0x52d166;VisuMZ['AutoSkillTriggers'][_0x21b78f(0x18f)]['call'](this),this[_0x21b78f(0xef)]();},Scene_Boot[_0x52d166(0x116)]['process_VisuMZ_AutoSkillTriggers_Notetags']=function(){const _0xcf5933=_0x52d166;VisuMZ[_0xcf5933(0x171)]['CreateNotetags']();},VisuMZ[_0x52d166(0x171)][_0x52d166(0x12c)]={},VisuMZ[_0x52d166(0x171)][_0x52d166(0x133)]=function(){const _0x594965=_0x52d166;let _0x552b4a=[[_0x594965(0x160),_0x594965(0x1c9)],[_0x594965(0x1af),_0x594965(0x148)],[_0x594965(0x1bb),_0x594965(0xf5)],[_0x594965(0xf4),_0x594965(0x1b9)],[_0x594965(0x19c),_0x594965(0x1a7)],[_0x594965(0x10b),_0x594965(0x11f)],[_0x594965(0x19d),_0x594965(0x159)]],_0x1bf893=[['onBattleStart',_0x594965(0x17f)],['onBattleWin','(?:BATTLE\x20WIN|WIN\x20BATTLE|VICTORY|VICTORY\x20CRY|VICTORYCRY)'],[_0x594965(0x137),_0x594965(0x11a)]];for(const _0x340b6d of _0x552b4a){if(!_0x340b6d)continue;_0x1bf893[_0x594965(0x17c)]([_0x594965(0x1c7)[_0x594965(0x117)](_0x340b6d[0x0]),'(?:ATTACK\x20%1|STRIKE\x20%1)'[_0x594965(0x117)](_0x340b6d[0x1])]),_0x1bf893[_0x594965(0x17c)]([_0x594965(0x199)[_0x594965(0x117)](_0x340b6d[0x0]),_0x594965(0x167)[_0x594965(0x117)](_0x340b6d[0x1])]),_0x1bf893['push']([_0x594965(0x178)[_0x594965(0x117)](_0x340b6d[0x0]),_0x594965(0xfa)[_0x594965(0x117)](_0x340b6d[0x1])]),_0x1bf893[_0x594965(0x17c)]([_0x594965(0x17e)[_0x594965(0x117)](_0x340b6d[0x0]),_0x594965(0x1b3)[_0x594965(0x117)](_0x340b6d[0x1])]),_0x1bf893[_0x594965(0x17c)](['on%1Magical'[_0x594965(0x117)](_0x340b6d[0x0]),'(?:MAGICAL\x20%1|MAGICAL\x20ATTACK\x20%1)'['format'](_0x340b6d[0x1])]),_0x1bf893['push']([_0x594965(0x1b1)[_0x594965(0x117)](_0x340b6d[0x0]),_0x594965(0x18e)[_0x594965(0x117)](_0x340b6d[0x1])]);}for(const _0x5a5cb7 of $dataSystem[_0x594965(0x125)]){if(!_0x5a5cb7)continue;let _0x36094a=DataManager['stripNameTextCodes'](_0x5a5cb7);for(const _0x2888e2 of _0x552b4a){if(!_0x2888e2)continue;_0x1bf893[_0x594965(0x17c)]([_0x594965(0x154)[_0x594965(0x117)](_0x36094a[_0x594965(0xf8)](/[ ]/gi,''),_0x2888e2[0x0]),_0x594965(0x147)[_0x594965(0x117)](_0x36094a,_0x2888e2[0x1])]);}}for(const _0x339398 of $dataSystem['elements']){if(!_0x339398)continue;let _0x29edac=DataManager[_0x594965(0x174)](_0x339398);for(const _0xa6ac24 of _0x552b4a){if(_0x594965(0x129)!=='kpuwk'){if(!_0xa6ac24)continue;_0x1bf893[_0x594965(0x17c)]([_0x594965(0x106)[_0x594965(0x117)](_0x29edac[_0x594965(0xf8)](/[ ]/gi,''),_0xa6ac24[0x0]),_0x594965(0xec)[_0x594965(0x117)](_0x29edac,_0xa6ac24[0x1])]);}else this[_0x594965(0x177)]=this[_0x594965(0x1ae)]['clone']();}}for(const _0x45d58e of _0x1bf893){if('RZBmW'==='iygZn'){_0x33c2ad[_0x594965(0x171)][_0x594965(0x19f)]['call'](this,_0x5c7170);if(this[_0x594965(0x18c)]===_0x32f798)this[_0x594965(0x13f)]=![];}else this[_0x594965(0x130)](_0x45d58e[0x0],_0x45d58e[0x1]);}},VisuMZ[_0x52d166(0x171)][_0x52d166(0x130)]=function(_0x1601ad,_0x232418){const _0x528966=_0x52d166;_0x1601ad=_0x1601ad['toUpperCase']()[_0x528966(0xfd)]();const _0xbe749c=_0x528966(0x192)[_0x528966(0x117)](_0x232418),_0x2db83e=_0x1601ad+_0x528966(0x111),_0x1ea777=_0x528966(0x173)[_0x528966(0x117)](_0x232418);try{VisuMZ[_0x528966(0x171)][_0x528966(0x12c)][_0x1601ad]=new RegExp(_0xbe749c,'i'),VisuMZ[_0x528966(0x171)][_0x528966(0x12c)][_0x2db83e]=new RegExp(_0x1ea777,'i');}catch(_0x4a2c57){_0x528966(0xff)!==_0x528966(0xff)?_0x4c698e=!![]:Utils[_0x528966(0x114)]('test')&&(console[_0x528966(0x198)](_0x528966(0x1b8)),console['log'](_0x528966(0x15b)[_0x528966(0x117)](_0xbe749c,_0x1ea777)),console[_0x528966(0x198)]('Type\x20name\x20has\x20invalid\x20characters\x20that\x20cannot\x20be\x20used.'),console['log'](_0x528966(0x162)));}},DataManager['getSkillTypeNameFromID']=function(_0x24de54){const _0xc831b8=_0x52d166;return this[_0xc831b8(0x174)]($dataSystem['skillTypes'][_0x24de54]);},DataManager[_0x52d166(0x174)]=function(_0x35d147){const _0x2011f8=_0x52d166;if(!_0x35d147)return'';return _0x35d147=_0x35d147[_0x2011f8(0xf8)](/\\V\[(\d+)\]/gi,''),_0x35d147=_0x35d147[_0x2011f8(0xf8)](/\\I\[(\d+)\]/gi,''),_0x35d147=_0x35d147['replace'](/\\C\[(\d+)\]/gi,''),_0x35d147=_0x35d147[_0x2011f8(0xf8)](/\\N\[(\d+)\]/gi,''),_0x35d147=_0x35d147['replace'](/\\P\[(\d+)\]/gi,''),(_0x35d147||'')[_0x2011f8(0x165)]()[_0x2011f8(0xfd)]();},DataManager[_0x52d166(0xea)]=function(_0x5adf5a){const _0x5120b6=_0x52d166;return this[_0x5120b6(0x174)]($dataSystem['elements'][_0x5adf5a]);},BattleManager[_0x52d166(0x1c0)]=function(){const _0x47bd96=_0x52d166;if(this[_0x47bd96(0x158)](_0x47bd96(0xe9)))return![];if(this[_0x47bd96(0x158)](_0x47bd96(0x1ab)))return![];if(this[_0x47bd96(0x158)](_0x47bd96(0x12d)))return![];if(Imported['VisuMZ_3_ActiveChainSkills']){const _0x3e23a6=SceneManager[_0x47bd96(0x1b2)];if(_0x3e23a6&&_0x3e23a6[_0x47bd96(0xf9)]())return![];}if(Imported[_0x47bd96(0x118)]){const _0xdd4ba3=SceneManager[_0x47bd96(0x1b2)];if(_0xdd4ba3&&_0xdd4ba3['canPerformInputComboSkills']())return![];}return!![];},VisuMZ[_0x52d166(0x171)][_0x52d166(0xf3)]=BattleManager[_0x52d166(0x1ca)],BattleManager['endAction']=function(){const _0x2e691e=_0x52d166,_0x58bc57=this[_0x2e691e(0x1cb)]&&this[_0x2e691e(0x1cb)][_0x2e691e(0x14d)](),_0x2d1d68=this[_0x2e691e(0x13c)];_0x58bc57&&(_0x2e691e(0x19b)!==_0x2e691e(0x1a1)?this[_0x2e691e(0x13c)][_0x2e691e(0x1bf)]=!![]:(this[_0x2e691e(0x123)]=![],this[_0x2e691e(0x132)]=![])),VisuMZ['AutoSkillTriggers'][_0x2e691e(0xf3)][_0x2e691e(0x124)](this),_0x2d1d68&&_0x58bc57&&_0x2d1d68[_0x2e691e(0x1a9)]();},VisuMZ[_0x52d166(0x171)][_0x52d166(0x136)]=BattleManager['checkBattleEnd'],BattleManager[_0x52d166(0x108)]=function(){const _0x60fe22=_0x52d166;if($gameTroop[_0x60fe22(0x1c2)]())$gameParty[_0x60fe22(0xf1)]();if(this[_0x60fe22(0x152)][_0x60fe22(0x1cf)]>0x0)return![];return VisuMZ['AutoSkillTriggers'][_0x60fe22(0x136)][_0x60fe22(0x124)](this);},VisuMZ[_0x52d166(0x171)][_0x52d166(0x1aa)]=Game_Action[_0x52d166(0x116)]['clear'],Game_Action[_0x52d166(0x116)][_0x52d166(0xfe)]=function(){const _0x61da39=_0x52d166;VisuMZ[_0x61da39(0x171)][_0x61da39(0x1aa)]['call'](this),this['setAutoSkillTrigger'](![]);},Game_Action[_0x52d166(0x116)][_0x52d166(0x10c)]=function(_0x35b195){const _0x53f7e3=_0x52d166;this[_0x53f7e3(0x156)]=_0x35b195;},Game_Action[_0x52d166(0x116)]['isAutoSkillTrigger']=function(){const _0x3c257a=_0x52d166;return!!this[_0x3c257a(0x156)];},VisuMZ['AutoSkillTriggers'][_0x52d166(0x1d1)]=Game_Action[_0x52d166(0x116)][_0x52d166(0x1bd)],Game_Action[_0x52d166(0x116)][_0x52d166(0x1bd)]=function(){const _0x5e855c=_0x52d166;let _0x1b7551=VisuMZ[_0x5e855c(0x171)][_0x5e855c(0x1d1)]['call'](this),_0x86642f=this[_0x5e855c(0x196)]()?this[_0x5e855c(0x196)]()[_0x5e855c(0x19e)]:-0x1;if(this[_0x5e855c(0x196)]()&&this['isAutoSkillTrigger']()){if(_0x5e855c(0xfb)==='lgbyI')return this[_0x5e855c(0x196)]()[_0x5e855c(0x19e)]=0x0,_0x1b7551=_0x1b7551&&this['subject']()[_0x5e855c(0xee)](this['item']()),this[_0x5e855c(0x196)]()[_0x5e855c(0x19e)]=_0x86642f,_0x1b7551;else{let _0x19624f=[];if(_0x5385d1[_0x5e855c(0x103)])_0x19624f=this['elements']();else{if(this['item']()[_0x5e855c(0x1d0)][_0x5e855c(0x11b)]<0x0){const _0x14fac6=this[_0x5e855c(0x1c6)]();_0x19624f=_0x14fac6['attackElements']();}else _0x19624f=[this[_0x5e855c(0x196)]()[_0x5e855c(0x1d0)][_0x5e855c(0x11b)]];}return _0x19624f[_0x5e855c(0x180)](_0x1386ce=>_0x4f5cc7[_0x5e855c(0xea)](_0x1386ce));}}else{if(_0x5e855c(0x168)!==_0x5e855c(0x1c1))return _0x1b7551;else _0x48266c=_0x5b7378['getSkillTypes'](this[_0x5e855c(0x196)]());}},VisuMZ[_0x52d166(0x171)][_0x52d166(0xf6)]=Game_Action[_0x52d166(0x116)][_0x52d166(0x12a)],Game_Action[_0x52d166(0x116)][_0x52d166(0x12a)]=function(){const _0x4381c5=_0x52d166;VisuMZ[_0x4381c5(0x171)][_0x4381c5(0xf6)][_0x4381c5(0x124)](this),this[_0x4381c5(0x193)]();},Game_Action[_0x52d166(0x116)]['getAutoSkillTriggerSTypes']=function(){const _0x1dfb51=_0x52d166;if(!this[_0x1dfb51(0x1ad)]())return[];let _0x2c5919=[];if(Imported[_0x1dfb51(0x127)]){if('oCktT'!==_0x1dfb51(0x170)){if(this[_0x1dfb51(0x1bf)]){this[_0x1dfb51(0x1bf)]=_0x52fda5;return;}_0xe7b6b[_0x1dfb51(0x171)][_0x1dfb51(0x197)][_0x1dfb51(0x124)](this);}else _0x2c5919=DataManager[_0x1dfb51(0x14a)](this[_0x1dfb51(0x196)]());}else _0x2c5919[_0x1dfb51(0x17c)](this[_0x1dfb51(0x196)]()['stypeId']);return _0x2c5919['map'](_0x3e4d12=>DataManager[_0x1dfb51(0x13e)](_0x3e4d12));},Game_Action['prototype']['getAutoSkillTriggerElements']=function(){const _0x5de586=_0x52d166;let _0x26f5fb=[];if(Imported[_0x5de586(0x103)]){if(_0x5de586(0x186)!==_0x5de586(0x186)){if(this['_deathAutoSkillTriggerActive'])return!![];return _0x5e000b[_0x5de586(0x171)]['Game_BattlerBase_isImmortal'][_0x5de586(0x124)](this);}else _0x26f5fb=this[_0x5de586(0x1b0)]();}else{if(this[_0x5de586(0x196)]()['damage'][_0x5de586(0x11b)]<0x0){const _0x3bc331=this['subject']();_0x26f5fb=_0x3bc331['attackElements']();}else{if('pbSuw'!==_0x5de586(0x153))_0x26f5fb=[this[_0x5de586(0x196)]()[_0x5de586(0x1d0)][_0x5de586(0x11b)]];else{if(!_0x36e77c)return'';return _0x42cca6=_0x1cd8fb[_0x5de586(0xf8)](/\\V\[(\d+)\]/gi,''),_0x30633b=_0x5563a9[_0x5de586(0xf8)](/\\I\[(\d+)\]/gi,''),_0x26b998=_0x16955c[_0x5de586(0xf8)](/\\C\[(\d+)\]/gi,''),_0x3f8579=_0x1d82c9[_0x5de586(0xf8)](/\\N\[(\d+)\]/gi,''),_0x4c234e=_0x1b27c5[_0x5de586(0xf8)](/\\P\[(\d+)\]/gi,''),(_0xd3bd4b||'')[_0x5de586(0x165)]()[_0x5de586(0xfd)]();}}}return _0x26f5fb[_0x5de586(0x180)](_0x4367b4=>DataManager[_0x5de586(0xea)](_0x4367b4));},Game_Action[_0x52d166(0x116)][_0x52d166(0x193)]=function(){const _0x2993f1=_0x52d166;if(!SceneManager[_0x2993f1(0x10f)]())return;if(!BattleManager['isAutoSkillTriggerCompatible']())return;if(!this['item']())return;if(this[_0x2993f1(0x196)]()[_0x2993f1(0xf2)]['match'](/<NO AUTO SKILL TRIGGER>/i))return;if(this[_0x2993f1(0x196)]()[_0x2993f1(0xf2)]['match'](/<AUTO TRIGGER:[ ](.*)>/i))return;const _0x17ef15=this['subject'](),_0x20c923=BattleManager[_0x2993f1(0x1a8)][_0x2993f1(0x128)]((_0x58300e,_0x1a707c,_0x57fe24)=>_0x57fe24[_0x2993f1(0x19a)](_0x58300e)===_0x1a707c),_0x1ab670=_0x17ef15[_0x2993f1(0x1c8)]()['aliveMembers'](),_0x3e2804=_0x17ef15[_0x2993f1(0x1a0)]()['aliveMembers']();this['performAutoSkillTriggers'](_0x17ef15,'User');for(const _0x328749 of _0x20c923){this[_0x2993f1(0x1b5)](_0x328749,_0x2993f1(0x1af));if(_0x328749[_0x2993f1(0x17d)]()===_0x17ef15['isActor']())this[_0x2993f1(0x1b5)](_0x328749,_0x2993f1(0x1bb));else _0x328749[_0x2993f1(0x17d)]()!==_0x17ef15[_0x2993f1(0x17d)]()&&this[_0x2993f1(0x1b5)](_0x328749,_0x2993f1(0xf4));}for(const _0x195b4b of _0x1ab670){_0x2993f1(0x182)!=='JxiqK'?_0x9b6c4c[_0x2993f1(0x1a9)]():(this[_0x2993f1(0x1b5)](_0x195b4b,'Friends'),_0x195b4b!==_0x17ef15&&this[_0x2993f1(0x1b5)](_0x195b4b,_0x2993f1(0x10b)));}for(const _0x322e83 of _0x3e2804){if(_0x2993f1(0x144)!==_0x2993f1(0x14b))this[_0x2993f1(0x1b5)](_0x322e83,_0x2993f1(0x19d));else{if(!this[_0x2993f1(0xf0)]())return;if(!_0x549bfc[_0x2993f1(0x10f)]())return;this['_deathAutoSkillTriggerActive']=!![],this[_0x2993f1(0x190)]('onDeath');}}},Game_Action[_0x52d166(0x116)][_0x52d166(0x1b5)]=function(_0x331cd1,_0x52ed2e){const _0x11f0c3=_0x52d166;if(!_0x331cd1)return;if(!BattleManager[_0x11f0c3(0x1c0)]())return;if(this[_0x11f0c3(0x194)]())_0x331cd1[_0x11f0c3(0x190)](_0x11f0c3(0x1c7)[_0x11f0c3(0x117)](_0x52ed2e));if(this[_0x11f0c3(0x10e)]())_0x331cd1[_0x11f0c3(0x190)](_0x11f0c3(0x199)[_0x11f0c3(0x117)](_0x52ed2e));if(this[_0x11f0c3(0x166)]())_0x331cd1[_0x11f0c3(0x190)](_0x11f0c3(0x178)[_0x11f0c3(0x117)](_0x52ed2e));if(this[_0x11f0c3(0x105)]())_0x331cd1['processAutoSkillTrigger'](_0x11f0c3(0x17e)[_0x11f0c3(0x117)](_0x52ed2e));if(this[_0x11f0c3(0x15d)]())_0x331cd1[_0x11f0c3(0x190)](_0x11f0c3(0x164)[_0x11f0c3(0x117)](_0x52ed2e));if(this[_0x11f0c3(0x12b)]())_0x331cd1[_0x11f0c3(0x190)](_0x11f0c3(0x1b1)['format'](_0x52ed2e));const _0x3db646=this[_0x11f0c3(0x1be)]();for(let _0x599c7c of _0x3db646){if(_0x11f0c3(0x189)!==_0x11f0c3(0x189)){this['performAutoSkillTriggers'](_0x2b9da9,_0x11f0c3(0x1af));if(_0x2829cb['isActor']()===_0x2c13bd[_0x11f0c3(0x17d)]())this[_0x11f0c3(0x1b5)](_0x1d8f24,_0x11f0c3(0x1bb));else _0x35dccb[_0x11f0c3(0x17d)]()!==_0x7b43a6[_0x11f0c3(0x17d)]()&&this[_0x11f0c3(0x1b5)](_0x3b9188,_0x11f0c3(0xf4));}else{if(!_0x599c7c)continue;_0x599c7c=_0x599c7c['replace'](/[ ]/gi,''),_0x331cd1['processAutoSkillTrigger'](_0x11f0c3(0x14c)[_0x11f0c3(0x117)](_0x52ed2e,_0x599c7c));}}const _0xa917f2=this[_0x11f0c3(0x1c3)]();for(let _0x31f6a4 of _0xa917f2){if(_0x11f0c3(0x13a)===_0x11f0c3(0x13a)){if(!_0x31f6a4)continue;_0x31f6a4=_0x31f6a4['replace'](/[ ]/gi,''),_0x331cd1[_0x11f0c3(0x190)](_0x11f0c3(0x142)[_0x11f0c3(0x117)](_0x52ed2e,_0x31f6a4));}else{this['forceAutoSkillTrigger'](_0x4383d9['id']);const _0x4aee8e=_0x133ec5[_0x11f0c3(0x143)]['clone'](),_0x15b6bc=_0x491b5b['_subject'];_0x4efca3['_subject']=null,_0x1b94e4['forceAction'](this),_0x50afb4[_0x11f0c3(0x143)]=_0x4aee8e,_0x302f12[_0x11f0c3(0x13c)]=_0x15b6bc;}}},VisuMZ[_0x52d166(0x171)][_0x52d166(0x112)]=Game_BattlerBase[_0x52d166(0x116)][_0x52d166(0x1ba)],Game_BattlerBase[_0x52d166(0x116)][_0x52d166(0x1ba)]=function(_0x437c84){const _0xb14f3b=_0x52d166;if(this[_0xb14f3b(0x119)](_0x437c84))return this[_0xb14f3b(0x1a6)]();VisuMZ[_0xb14f3b(0x171)]['Game_BattlerBase_addNewState'][_0xb14f3b(0x124)](this,_0x437c84);},Game_BattlerBase[_0x52d166(0x116)][_0x52d166(0x119)]=function(_0x5c5bad){const _0x50b0f8=_0x52d166;if(_0x5c5bad!==this['deathStateId']())return![];if(Imported['VisuMZ_3_LifeStateEffects']){if(_0x50b0f8(0x113)!==_0x50b0f8(0x113))return!!this[_0x50b0f8(0x156)];else{if(this[_0x50b0f8(0xf7)]())return![];if(this[_0x50b0f8(0x135)]()&&this[_0x50b0f8(0x131)]())return![];}}return this[_0x50b0f8(0x13b)]();},Game_BattlerBase[_0x52d166(0x116)][_0x52d166(0x13b)]=function(){const _0xbc05a5=_0x52d166;if(!SceneManager[_0xbc05a5(0x10f)]())return![];if(!this[_0xbc05a5(0xf0)]())return![];if(this[_0xbc05a5(0x132)])return![];return this[_0xbc05a5(0x101)]()['some'](_0x4bd6fb=>this[_0xbc05a5(0x13d)](_0x4bd6fb));},Game_BattlerBase['prototype']['meetsDeathAutoSkillTrigger']=function(_0x3c45ae){const _0x5b9184=_0x52d166,_0x3aa5a4=VisuMZ[_0x5b9184(0x171)]['RegExp'][_0x5b9184(0x15f)];return _0x3c45ae&&_0x3c45ae[_0x5b9184(0xf2)]['match'](_0x3aa5a4)&&this[_0x5b9184(0xee)](_0x3c45ae);},VisuMZ['AutoSkillTriggers'][_0x52d166(0x102)]=Game_BattlerBase['prototype'][_0x52d166(0x10d)],Game_BattlerBase['prototype'][_0x52d166(0x10d)]=function(){const _0x5d2ebb=_0x52d166;if(this['_deathAutoSkillTriggerActive'])return!![];return VisuMZ[_0x5d2ebb(0x171)]['Game_BattlerBase_isImmortal'][_0x5d2ebb(0x124)](this);},Game_Battler['prototype'][_0x52d166(0x190)]=function(_0x36f1a4){const _0x20114e=_0x52d166;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x20114e(0x1c0)]())return;_0x36f1a4=_0x36f1a4[_0x20114e(0x165)]()[_0x20114e(0xfd)]();const _0x1604fe=VisuMZ[_0x20114e(0x171)][_0x20114e(0x12c)][_0x36f1a4],_0xbf410e=_0x36f1a4+'_CHANCE',_0x25ab3d=VisuMZ[_0x20114e(0x171)][_0x20114e(0x12c)][_0xbf410e];if(!_0x1604fe&&!_0x25ab3d)return;if(!this[_0x20114e(0xf0)]())return;for(const _0x5f3a6c of this[_0x20114e(0x101)]()){if(!_0x5f3a6c)continue;if(!this[_0x20114e(0xee)](_0x5f3a6c))continue;let _0x38fd39=![];if(_0x5f3a6c[_0x20114e(0xf2)][_0x20114e(0x141)](_0x1604fe))_0x38fd39=!![];else{if(_0x5f3a6c[_0x20114e(0xf2)][_0x20114e(0x141)](_0x25ab3d)){if(_0x20114e(0x1cc)!==_0x20114e(0x1cc)){let _0x2d2b94=_0x39b6ec['AutoSkillTriggers'][_0x20114e(0x1d1)][_0x20114e(0x124)](this),_0x4bdb38=this[_0x20114e(0x196)]()?this[_0x20114e(0x196)]()[_0x20114e(0x19e)]:-0x1;return this[_0x20114e(0x196)]()&&this['isAutoSkillTrigger']()?(this['item']()[_0x20114e(0x19e)]=0x0,_0x2d2b94=_0x2d2b94&&this['subject']()['canUse'](this[_0x20114e(0x196)]()),this[_0x20114e(0x196)]()[_0x20114e(0x19e)]=_0x4bdb38,_0x2d2b94):_0x2d2b94;}else{const _0x58062e=(Number(RegExp['$1'])||0x0)*0.01;_0x38fd39=Math[_0x20114e(0x175)]()<_0x58062e;}}}if(_0x38fd39){if(Imported['VisuMZ_2_BattleSystemOTB']&&BattleManager[_0x20114e(0xed)]())this[_0x20114e(0x138)](_0x5f3a6c);else{if(_0x20114e(0x146)===_0x20114e(0x146))this[_0x20114e(0x121)](_0x5f3a6c);else{const _0x58ebdd=_0x5e460e['_scene'];if(_0x58ebdd&&_0x58ebdd[_0x20114e(0x12f)]())return![];}}}}},Game_Battler[_0x52d166(0x116)][_0x52d166(0x121)]=function(_0x592940){const _0x2d246e=_0x52d166;this[_0x2d246e(0x15a)](_0x592940['id']);const _0x1206b8=BattleManager[_0x2d246e(0x143)]['clone'](),_0x401662=BattleManager[_0x2d246e(0x13c)];BattleManager[_0x2d246e(0x13c)]=null,BattleManager[_0x2d246e(0x157)](this),BattleManager[_0x2d246e(0x143)]=_0x1206b8,BattleManager[_0x2d246e(0x13c)]=_0x401662;},Game_Battler['prototype']['constructAutoSkillTriggerOTB']=function(_0x370c80){const _0x17fa0a=_0x52d166;if(!this[_0x17fa0a(0xf0)]())return;this[_0x17fa0a(0x15a)](_0x370c80['id']),this[_0x17fa0a(0x17b)](0x1,!![]);const _0x17086f=BattleManager[_0x17fa0a(0x143)];_0x17086f[_0x17fa0a(0x109)](_0x17086f['pop']());const _0x4f3a95=SceneManager[_0x17fa0a(0x1b2)]['_otbTurnOrderWindow'];_0x4f3a95&&_0x4f3a95[_0x17fa0a(0x1a3)](this);},Game_Battler[_0x52d166(0x116)][_0x52d166(0x15a)]=function(_0x34b1f8){const _0x1a1a68=_0x52d166;if(!BattleManager[_0x1a1a68(0x1c0)]())return;!this[_0x1a1a68(0x177)]&&(this[_0x1a1a68(0x177)]=this[_0x1a1a68(0x1ae)][_0x1a1a68(0x110)]());this[_0x1a1a68(0x157)](_0x34b1f8,-0x2);if(!this['_actions'])return;const _0x5da70c=this[_0x1a1a68(0x1ae)][this['_actions'][_0x1a1a68(0x1cf)]-0x1];_0x5da70c[_0x1a1a68(0x10c)](!![]);},Game_Battler['prototype'][_0x52d166(0x1a9)]=function(){const _0x3bb7e4=_0x52d166;if(!BattleManager['isAutoSkillTriggerCompatible']())return;if(!this[_0x3bb7e4(0x177)])return;if(this[_0x3bb7e4(0x1ae)][_0x3bb7e4(0x1cf)]>0x0)return;this['_actions']=this[_0x3bb7e4(0x177)],this['_savedAutoSkillTriggerActions']=undefined;},VisuMZ[_0x52d166(0x171)][_0x52d166(0x1a5)]=Game_Battler['prototype'][_0x52d166(0x188)],Game_Battler[_0x52d166(0x116)]['onBattleEnd']=function(){const _0x27e5c1=_0x52d166;this[_0x27e5c1(0x177)]=undefined,VisuMZ[_0x27e5c1(0x171)][_0x27e5c1(0x1a5)][_0x27e5c1(0x124)](this);},VisuMZ[_0x52d166(0x171)]['Game_Battler_clearTpbChargeTime']=Game_Battler[_0x52d166(0x116)][_0x52d166(0x10a)],Game_Battler[_0x52d166(0x116)][_0x52d166(0x10a)]=function(){const _0x4ae7c9=_0x52d166;if(this[_0x4ae7c9(0x1bf)]){if(_0x4ae7c9(0x184)===_0x4ae7c9(0x1d2))this[_0x4ae7c9(0x1b5)](_0x31a67e,_0x4ae7c9(0x1bb));else{this[_0x4ae7c9(0x1bf)]=undefined;return;}}VisuMZ[_0x4ae7c9(0x171)][_0x4ae7c9(0x197)][_0x4ae7c9(0x124)](this);},VisuMZ[_0x52d166(0x171)]['Game_Battler_onBattleStart']=Game_Battler[_0x52d166(0x116)][_0x52d166(0x14f)],Game_Battler[_0x52d166(0x116)][_0x52d166(0x14f)]=function(_0x2aa245){const _0x47f7b1=_0x52d166;this[_0x47f7b1(0x177)]=undefined,$gameParty[_0x47f7b1(0x18b)]=!![],VisuMZ[_0x47f7b1(0x171)][_0x47f7b1(0x11c)][_0x47f7b1(0x124)](this,_0x2aa245),this[_0x47f7b1(0x190)]('onBattleStart'),this[_0x47f7b1(0x107)]();},VisuMZ[_0x52d166(0x171)][_0x52d166(0x1cd)]=Game_BattlerBase[_0x52d166(0x116)][_0x52d166(0x176)],Game_BattlerBase[_0x52d166(0x116)][_0x52d166(0x176)]=function(){const _0x4a0512=_0x52d166;VisuMZ['AutoSkillTriggers'][_0x4a0512(0x1cd)][_0x4a0512(0x124)](this),this[_0x4a0512(0x107)]();},Game_Battler['prototype'][_0x52d166(0x107)]=function(){const _0x51fa01=_0x52d166;this['_deathAutoSkillTriggerActive']=![],this[_0x51fa01(0x132)]=![];},Game_Battler['prototype']['processDeathAutoSkillTriggerEffects']=function(){const _0x2b3317=_0x52d166;if(!this[_0x2b3317(0xf0)]())return;if(!SceneManager[_0x2b3317(0x10f)]())return;this[_0x2b3317(0x123)]=!![],this[_0x2b3317(0x190)](_0x2b3317(0x137));};const _Game_Battler_onAllActionsEnd_=Game_Battler['prototype'][_0x52d166(0x145)];Game_Battler[_0x52d166(0x116)][_0x52d166(0x145)]=function(){const _0x4a100d=_0x52d166;_Game_Battler_onAllActionsEnd_[_0x4a100d(0x124)](this),this[_0x4a100d(0x104)]();},Game_Battler[_0x52d166(0x116)][_0x52d166(0x104)]=function(){const _0x2d2c10=_0x52d166;if(!this[_0x2d2c10(0x123)])return;if(this[_0x2d2c10(0x132)])return;const _0x98e6e9=BattleManager[_0x2d2c10(0x152)];for(const _0x3849c3 of _0x98e6e9){if(_0x2d2c10(0x15e)!==_0x2d2c10(0x15e)){const _0x2586fe=this[_0x2d2c10(0x1c6)]();_0x102023=_0x2586fe[_0x2d2c10(0x12e)]();}else{if(!_0x3849c3)continue;if(_0x3849c3[0x0]===this)return;}}this[_0x2d2c10(0x123)]=![],this['_deathAutoSkillTriggerPerformed']=!![],this[_0x2d2c10(0x150)]();if(this[_0x2d2c10(0x1bc)]())this[_0x2d2c10(0x107)]();},VisuMZ[_0x52d166(0x171)][_0x52d166(0x19f)]=Game_Unit[_0x52d166(0x116)]['onBattleStart'],Game_Unit['prototype'][_0x52d166(0x14f)]=function(_0x56a749){const _0x5adb5b=_0x52d166;VisuMZ[_0x5adb5b(0x171)][_0x5adb5b(0x19f)]['call'](this,_0x56a749);if(this[_0x5adb5b(0x18c)]===Game_Party)this[_0x5adb5b(0x13f)]=![];},Game_Unit[_0x52d166(0x116)][_0x52d166(0x185)]=function(_0x2cafa4,_0x4484fd){const _0x5c949c=_0x52d166;_0x4484fd=_0x4484fd||null;const _0x13f557=this[_0x5c949c(0xfc)]()[_0x5c949c(0x128)](_0x5ebb6c=>_0x5ebb6c!==_0x4484fd);for(const _0x55778e of _0x13f557){if(_0x5c949c(0x1c5)===_0x5c949c(0x1c5)){if(!_0x55778e)continue;_0x55778e[_0x5c949c(0x190)](_0x2cafa4);}else this['_subject'][_0x5c949c(0x1bf)]=!![];}},Game_Party['prototype'][_0x52d166(0xf1)]=function(){const _0x31668a=_0x52d166;if(this[_0x31668a(0x13f)])return;this[_0x31668a(0x13f)]=!![],this['processAutoSkillTriggers']('onBattleWin');};Imported[_0x52d166(0x120)]&&(Window_OTB_TurnOrder[_0x52d166(0x116)][_0x52d166(0x1a3)]=function(_0x5db5e8){const _0x1c9dca=_0x52d166;let _0x5ccc31=null;for(const _0x232fcf of this[_0x1c9dca(0x1ce)]){if(!_0x232fcf)continue;if(_0x232fcf['battler']()!==_0x5db5e8)continue;_0x5ccc31=_0x232fcf,_0x232fcf[_0x1c9dca(0x11e)]=_0x232fcf['_instance']||0x0,_0x232fcf[_0x1c9dca(0x11e)]++;}_0x5ccc31[_0x1c9dca(0x11e)]=0x0,_0x5ccc31['_positionDuration']=0x258,_0x5ccc31['x']=this['_subjectX'],this[_0x1c9dca(0x1ce)][_0x1c9dca(0x109)](this['_currentTurn'][_0x1c9dca(0x18a)]()),this['requestUpdateTurnOrders']();});;
//=============================================================================
// VisuStella MZ - Life State Effects
// VisuMZ_3_LifeStateEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_LifeStateEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.LifeStateEffects = VisuMZ.LifeStateEffects || {};
VisuMZ.LifeStateEffects.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.04] [LifeStateEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Life_State_Effects_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Life State Effects plugin allow for trait objects and/or states to
 * create specific, though, commonly used effects found in many traditional
 * JRPG's, such as Auto Life, Doom, and Guts. These mechanical effects add a
 * whole new layer of strategy when it comes to status effects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Auto Life effect, which is a state effect that recovers a percentage of
 *   the user's HP and disappears upon triggering.
 * * Curse effect, which prevents HP, MP, and/or TP recovery.
 * * Doom effect, which is a state effect that will kill the affected battler
 *   once the state's timer wears off and expires.
 * * Fragile effect, which causes any time a user receives HP damage from a
 *   direct action, that user will instantly lose all HP.
 * * Guts, which prevents HP from dropping below 1, unless the battler's HP is
 *   at 1, itself.
 * * Undead, which causes normal HP healing to inflict damage instead, instant
 *   death effects to fully restore HP, and Drain effects to be inverted.
 * * Death Transformations, for specificly notetag-marked enemies, will cause
 *   them to undergo a transformation once they die in battle and be reborn
 *   anew with full HP/MP as something else.
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
 * - VisuMZ_1_SkillsStatesCore
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === State-Only Effects ===
 * 
 * ---
 *
 * <Auto Life: x%>
 *
 * - Used for: State Notetags
 * - When the affected battler dies with this state present, this state will
 *   automatically remove itself (and any other states with <Auto Life: x%>) to
 *   restore that much HP% for the battler.
 * - Replace 'x' with a number representing that percentage of HP to heal the
 *   battler upon dying.
 *
 * ---
 *
 * <Doom>
 *
 * - Used for: State Notetags
 * - When this state expires naturally (without direct removal), kill the
 *   affected battler.
 *
 * ---
 * 
 * === Trait-Object Effects ===
 * 
 * ---
 *
 * <Curse HP>
 * <Curse MP>
 * <Curse TP>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Prevents the affected battler from being able to recover HP, MP, and/or TP
 *   depending on which notetag is being used.
 *
 * ---
 *
 * <Fragile>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - If a battler affected by <Fragile> receives a direct attack and takes any
 *   HP damage (as opposed to event command damage or regeneration damage),
 *   then instantly kill the affected battler.
 *
 * ---
 *
 * <Guts>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - This will prevent the battler from taking any fatal damage and leaves them
 *   with only 1 HP. However, if the battler has 1 HP and receives damage, then
 *   the battler will actually die.
 *
 * ---
 *
 * <Undead>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - If the battler receives HP Healing, it receives damage instead.
 * - If the battler is a target of an instant death skill or item, then the
 *   battler will recover full HP.
 * - If the battler is the target of an HP Drain action, then the battler will
 *   drain HP from the attacker instead.
 *
 * ---
 * 
 * === Enemy-Only Effects ===
 * 
 * ---
 * 
 * <Death Transform>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Death Transform>
 * 
 * - Used for: Enemy Notetags
 * - Upon death, the enemy will transform into another enemy with full HP/MP.
 * - Replace 'name' with the name of the enemy to transform into.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(: ) and just type in the 'name' instead.
 * 
 * Examples:
 * 
 * <Death Transform>
 *  Slime
 * </Death Transform>
 * 
 * <Death Transform>
 *  Slime: 75
 *  Goblin: 25
 * </Death Transform>
 * 
 * <Death Transform>
 *  Slime: 10
 *  Goblin
 * </Death Transform>
 * 
 * <Death Transform>
 *  Slime
 *  Goblin
 * </Death Transform>
 * 
 * ---
 * 
 * <Transform Animation: x>
 * 
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_0_CoreEngine!
 * - Plays an animation on the transforming enemy upon a successful transform.
 * - This goes on the TARGET enemy that will be transformed into.
 * - This does NOT go on the enemy that is being transformed from.
 * - Replace 'x' with a number representing the ID of the animation you wish to
 *   play on the transforming enemy.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Effect Settings
 * ============================================================================
 * 
 * Auto-Life Settings
 * Curse Settings
 * Doom Settings
 * Fragile Settings
 * Guts Settings
 * Undead Settings
 * Transform Settings
 *
 * When certain effects trigger, you can have an animation play (if the
 * VisuStella MZ Core Engine is also installed) and/or a popup appear, too.
 * Each of the six effects provided by this plugin have animation and popup
 * effects that can be adjusted.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Requires VisuMZ_0_CoreEngine.
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
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
 * Version 1.04: March 10, 2022
 * * Documentation Update!
 * ** Added new bullet point to feature list.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags & Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** Death Transformation
 * **** When an enemy dies (and only works for enemies), transform them into
 *      another enemy with full HP/MP. This can be from a random pool of
 *      enemies, a weighted pool of enemies, a mix, or a single specific enemy.
 * **** Animations and popups will play upon a death transformation. Unique
 *      animations can also be set for specific target transformations.
 * 
 * Version 1.03: June 24, 2021
 * * Bug Fixes!
 * ** Doom expiration should no longer affect temporary actors during
 *    calculations and causing crashes. Fix made by Olivia.
 * 
 * Version 1.02: March 12, 2021
 * * Bug Fixes!
 * ** When Doom is applied but the battler later gains state resistance to
 *    Doom, Doom will no longer instantly kill the battler. Fix made by Irina.
 * 
 * Version 1.01: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent an infinite loop with Doom. Fix made by Olivia.
 *
 * Version 1.00: October 7, 2020
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
 * @param LifeStateEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoLife:struct
 * @text Auto Life Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Auto Life effect.
 * @default {"Animation":"","AnimationID:num":"50","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"AUTOLIFE","TextColor:str":"0","FlashColor:eval":"[0, 255, 128, 160]","FlashDuration:num":"60"}
 *
 * @param Curse:struct
 * @text Curse Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Curse effect.
 * @default {"Animation":"","AnimationID:num":"54","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"CURSE","TextColor:str":"0","FlashColor:eval":"[0, 0, 128, 160]","FlashDuration:num":"60"}
 *
 * @param Doom:struct
 * @text Doom Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Doom effect.
 * @default {"Animation":"","AnimationID:num":"65","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"DOOM","TextColor:str":"0","FlashColor:eval":"[128, 0, 0, 160]","FlashDuration:num":"60"}
 *
 * @param Fragile:struct
 * @text Fragile Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Fragile effect.
 * @default {"Animation":"","AnimationID:num":"60","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"FRAGILE","TextColor:str":"0","FlashColor:eval":"[255, 0, 0, 160]","FlashDuration:num":"60"}
 *
 * @param Guts:struct
 * @text Guts Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Guts effect.
 * @default {"Animation":"","AnimationID:num":"51","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"GUTS","TextColor:str":"0","FlashColor:eval":"[255, 255, 255, 160]","FlashDuration:num":"60"}
 *
 * @param Undead:struct
 * @text Undead Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Undead effect.
 * @default {"Animation":"","AnimationID:num":"58","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"UNDEAD","TextColor:str":"0","FlashColor:eval":"[128, 128, 128, 160]","FlashDuration:num":"60"}
 *
 * @param Transform:struct
 * @text Transform Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Transform effect.
 * This also affects event commands for transformation.
 * @default {"Animation":"","AnimationID:num":"49","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"TRANSFORM","TextColor:str":"0","FlashColor:eval":"[255, 255, 0, 160]","FlashDuration:num":"60"}
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
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Effect:
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Requires VisuMZ_0_CoreEngine.
 * @default 0
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default TEXT
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
//=============================================================================

function _0x528c(_0x4a163c,_0x1c770f){const _0x3a4964=_0x3a49();return _0x528c=function(_0x528c85,_0x25d47b){_0x528c85=_0x528c85-0x115;let _0x2d2641=_0x3a4964[_0x528c85];return _0x2d2641;},_0x528c(_0x4a163c,_0x1c770f);}const _0x5c4c7a=_0x528c;(function(_0x4a8a9e,_0x170446){const _0xe1537d=_0x528c,_0x3cadb2=_0x4a8a9e();while(!![]){try{const _0x55e915=-parseInt(_0xe1537d(0x163))/0x1*(parseInt(_0xe1537d(0x157))/0x2)+parseInt(_0xe1537d(0x19f))/0x3*(parseInt(_0xe1537d(0x185))/0x4)+parseInt(_0xe1537d(0x1c4))/0x5+parseInt(_0xe1537d(0x118))/0x6*(parseInt(_0xe1537d(0x180))/0x7)+parseInt(_0xe1537d(0x1c6))/0x8*(parseInt(_0xe1537d(0x174))/0x9)+-parseInt(_0xe1537d(0x199))/0xa*(-parseInt(_0xe1537d(0x17f))/0xb)+-parseInt(_0xe1537d(0x194))/0xc;if(_0x55e915===_0x170446)break;else _0x3cadb2['push'](_0x3cadb2['shift']());}catch(_0x4fa579){_0x3cadb2['push'](_0x3cadb2['shift']());}}}(_0x3a49,0x34c0a));var label=_0x5c4c7a(0x197),tier=tier||0x0,dependencies=[_0x5c4c7a(0x149),_0x5c4c7a(0x1b1)],pluginData=$plugins[_0x5c4c7a(0x184)](function(_0xb1cd00){const _0x69c52b=_0x5c4c7a;return _0xb1cd00[_0x69c52b(0x16b)]&&_0xb1cd00[_0x69c52b(0x141)][_0x69c52b(0x1a6)]('['+label+']');})[0x0];function _0x3a49(){const _0x186dd6=['executeHpDamage','format','addNewState','Curse','performCollapse','isDead','isHpEffect','VisuMZ_1_SkillsStatesCore','gainMp','getDeathTransformEnemyID','Game_Battler_gainHpCurse','yHGpE','isStateAffected','NUM','Doom','eaQGf','traitObjects','gainTp','match','ARRAYEVAL','skills','_processingVisuMzDoomEffect','eraseState','UFIYl','getEnemyIdWithName','applyDeathTransform','1021215lacEim','playPostTransformationAnimation','2264144MObfaC','hasLifeStateFragileEffect','refresh','hasLifeStateAutoLifeEffect','684nagpUC','NLqiA','LifeStateEffects_Fragile','Undead','STRUCT','isEnemy','Transform','undead','hpDamage','hasLifeStateCurseTpEffect','Game_Action_executeDamage','itemEffectAddAttackState','map','_enemyIDs','Game_BattlerBase_eraseState','doom','dataId','parameters','ceil','transformAni','noHealMp','removeStatesAuto','Guts','return\x200','executeDamage','fPDry','prototype','ConvertParams','_motion','wwlAg','hasLifeStateCurseMpEffect','call','yGjvP','hasLifeStateCurseHpEffect','hasDeathTransform','checkCacheKey','mmp','battler','Game_Battler_gainHp','startDamagePopup','mhp','description','guts','ARRAYFUNC','_cache','remove','setHp','RWyck','postTransformationAnimation','VisuMZ_1_BattleCore','performDeathTransform','Game_BattlerBase_addNewState','hpAffected','removeState','_removeStatesAutoInEffect','onLifeStateAutoLifeEffect','ABGuJ','Mute','addState','autoLife','Game_BattlerBase_setHp','_result','EVAL','24MBAtby','LifeStateEffects_CurseMp','Game_Action_executeHpDamage','Game_Action_itemEffectAddAttackState','FUNC','DBiVi','Game_Action_itemEffectAddNormalState','_allowUndeadHpHeal','Settings','gainHp','hasLifeStateUndeadEffect','concat','1850GXsLxt','max','AutoLife','toUpperCase','Game_Enemy_transform','NQGWT','DBMLY','ARRAYSTRUCT','status','hOxGI','isDrain','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','parse','bkQoo','clearResult','Game_Battler_gainTp','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','9pLXxPh','ARRAYSTR','transform','LifeStateEffects_Guts','setupTextPopup','some','enemy','isSceneBattle','fragile','dead','deathStateId','55pRzTYD','18641glfiwG','requestFauxAnimation','CDVQr','hasLifeStateGutsEffect','filter','8IGpvXH','BylEp','TZKev','VisuMZ_0_CoreEngine','RegExp','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','split','subject','Game_Battler_removeStatesAuto','ARRAYJSON','smfUq','requestMotion','note','rKdzU','exit','10715376ZpTron','DecCm','onLifeStateDoomEffect','LifeStateEffects','onLifeStateEffect','266870GVuokx','Mirror','Game_Battler_addState','trim','LifeStateEffects_CurseHp','deathTransform','310416dKBoiX','_tempBattler','noHealHp','PopupText','itemEffectAddNormalState','AnimationID','PzHtY','includes','Game_Battler_gainMpCurse','eSqSI','name'];_0x3a49=function(){return _0x186dd6;};return _0x3a49();}VisuMZ[label][_0x5c4c7a(0x15f)]=VisuMZ[label][_0x5c4c7a(0x15f)]||{},VisuMZ['ConvertParams']=function(_0x525763,_0x5af0f4){const _0x40abeb=_0x5c4c7a;for(const _0x17a607 in _0x5af0f4){if('PmTAf'===_0x40abeb(0x1b5)){if(!_0x22be91[_0x40abeb(0x17b)]())return![];if(this['hp']<=0x1)return![];const _0x4b65cd=_0x40abeb(0x177);if(this[_0x40abeb(0x13b)](_0x4b65cd))return this[_0x40abeb(0x144)][_0x4b65cd];const _0x4f123e=this[_0x40abeb(0x1ba)]()[_0x40abeb(0x162)](this[_0x40abeb(0x1be)]());return this[_0x40abeb(0x144)][_0x4b65cd]=_0x4f123e['some'](_0x3efba3=>_0x3efba3&&_0x3efba3[_0x40abeb(0x191)]['match'](_0x4917ac[_0x40abeb(0x197)][_0x40abeb(0x189)][_0x40abeb(0x142)])),this[_0x40abeb(0x144)][_0x4b65cd];}else{if(_0x17a607[_0x40abeb(0x1bc)](/(.*):(.*)/i)){const _0x570458=String(RegExp['$1']),_0x3f2680=String(RegExp['$2'])['toUpperCase']()[_0x40abeb(0x19c)]();let _0xe6957,_0x49eaa5,_0x5cbe9b;switch(_0x3f2680){case _0x40abeb(0x1b7):_0xe6957=_0x5af0f4[_0x17a607]!==''?Number(_0x5af0f4[_0x17a607]):0x0;break;case'ARRAYNUM':_0x49eaa5=_0x5af0f4[_0x17a607]!==''?JSON[_0x40abeb(0x16f)](_0x5af0f4[_0x17a607]):[],_0xe6957=_0x49eaa5[_0x40abeb(0x124)](_0x337851=>Number(_0x337851));break;case _0x40abeb(0x156):_0xe6957=_0x5af0f4[_0x17a607]!==''?eval(_0x5af0f4[_0x17a607]):null;break;case _0x40abeb(0x1bd):_0x49eaa5=_0x5af0f4[_0x17a607]!==''?JSON[_0x40abeb(0x16f)](_0x5af0f4[_0x17a607]):[],_0xe6957=_0x49eaa5['map'](_0x222e15=>eval(_0x222e15));break;case'JSON':_0xe6957=_0x5af0f4[_0x17a607]!==''?JSON[_0x40abeb(0x16f)](_0x5af0f4[_0x17a607]):'';break;case _0x40abeb(0x18e):_0x49eaa5=_0x5af0f4[_0x17a607]!==''?JSON['parse'](_0x5af0f4[_0x17a607]):[],_0xe6957=_0x49eaa5[_0x40abeb(0x124)](_0x51d0ff=>JSON[_0x40abeb(0x16f)](_0x51d0ff));break;case _0x40abeb(0x15b):_0xe6957=_0x5af0f4[_0x17a607]!==''?new Function(JSON['parse'](_0x5af0f4[_0x17a607])):new Function(_0x40abeb(0x12f));break;case _0x40abeb(0x143):_0x49eaa5=_0x5af0f4[_0x17a607]!==''?JSON['parse'](_0x5af0f4[_0x17a607]):[],_0xe6957=_0x49eaa5[_0x40abeb(0x124)](_0x2a0e3b=>new Function(JSON[_0x40abeb(0x16f)](_0x2a0e3b)));break;case'STR':_0xe6957=_0x5af0f4[_0x17a607]!==''?String(_0x5af0f4[_0x17a607]):'';break;case _0x40abeb(0x175):_0x49eaa5=_0x5af0f4[_0x17a607]!==''?JSON['parse'](_0x5af0f4[_0x17a607]):[],_0xe6957=_0x49eaa5[_0x40abeb(0x124)](_0xcb92a8=>String(_0xcb92a8));break;case _0x40abeb(0x11c):_0x5cbe9b=_0x5af0f4[_0x17a607]!==''?JSON[_0x40abeb(0x16f)](_0x5af0f4[_0x17a607]):{},_0xe6957=VisuMZ['ConvertParams']({},_0x5cbe9b);break;case _0x40abeb(0x16a):_0x49eaa5=_0x5af0f4[_0x17a607]!==''?JSON[_0x40abeb(0x16f)](_0x5af0f4[_0x17a607]):[],_0xe6957=_0x49eaa5[_0x40abeb(0x124)](_0x2584f0=>VisuMZ[_0x40abeb(0x133)]({},JSON[_0x40abeb(0x16f)](_0x2584f0)));break;default:continue;}_0x525763[_0x570458]=_0xe6957;}}}return _0x525763;},(_0x7f51a7=>{const _0x333762=_0x5c4c7a,_0x42f8f8=_0x7f51a7['name'];for(const _0x1ff4d5 of dependencies){if(_0x333762(0x135)===_0x333762(0x15c))this[_0x333762(0x183)]()&&_0xdb4213<=0x0&&(this[_0x333762(0x198)](_0x333762(0x12e)),_0x44ba3d=0x1),_0x3c05d1[_0x333762(0x197)][_0x333762(0x154)][_0x333762(0x137)](this,_0x3822f7);else{if(!Imported[_0x1ff4d5]){alert(_0x333762(0x173)[_0x333762(0x1ab)](_0x42f8f8,_0x1ff4d5)),SceneManager['exit']();break;}}}const _0x526d09=_0x7f51a7['description'];if(_0x526d09[_0x333762(0x1bc)](/\[Version[ ](.*?)\]/i)){if('NEnsX'==='hDWrx')_0x1f090a>0x0&&this[_0x333762(0x139)]()&&(_0x5f3abc=0x0,this['onLifeStateEffect']('Curse')),_0x576568[_0x333762(0x197)][_0x333762(0x1b4)][_0x333762(0x137)](this,_0x3beb34);else{const _0x1ad608=Number(RegExp['$1']);_0x1ad608!==VisuMZ[label]['version']&&(alert(_0x333762(0x18a)[_0x333762(0x1ab)](_0x42f8f8,_0x1ad608)),SceneManager[_0x333762(0x193)]());}}if(_0x526d09[_0x333762(0x1bc)](/\[Tier[ ](\d+)\]/i)){if(_0x333762(0x18f)!=='smfUq')_0x12b7e3*=-0x1,this[_0x333762(0x198)](_0x333762(0x11b));else{const _0x31971b=Number(RegExp['$1']);_0x31971b<tier?'ClIEj'!==_0x333762(0x170)?(alert(_0x333762(0x16e)[_0x333762(0x1ab)](_0x42f8f8,_0x31971b,tier)),SceneManager[_0x333762(0x193)]()):(_0x10a4e7=0x0,this[_0x333762(0x198)](_0x333762(0x1ad))):tier=Math[_0x333762(0x164)](_0x31971b,tier);}}VisuMZ[_0x333762(0x133)](VisuMZ[label][_0x333762(0x15f)],_0x7f51a7[_0x333762(0x129)]);})(pluginData),VisuMZ[_0x5c4c7a(0x197)][_0x5c4c7a(0x189)]={'guts':/<(?:GUTS)>/i,'undead':/<(?:UNDEAD|ZOMBIE|DAMAGE FROM HEALING)>/i,'fragile':/<(?:FRAGILE|ONE HIT KILL|DEATH ON HP DAMAGE)>/i,'noHealHp':/<(?:CANNOT HEAL HP|CANNOT RECOVER HP|CURSE HP)>/i,'noHealMp':/<(?:CANNOT HEAL MP|CANNOT RECOVER MP|CURSE MP)>/i,'noHealTp':/<(?:CANNOT HEAL TP|CANNOT RECOVER TP|CURSE TP)>/i,'autoLife':/<(?:AUTOLIFE|AUTO LIFE):[ ](\d+)([%％])>/i,'doom':/<(?:DOOM|DEATH SENTENCE)>/i,'deathTransform':/<DEATH (?:TRANSFORM|TRANSFORMATION)>\s*([\s\S]*)\s*<\/DEATH (?:TRANSFORM|TRANSFORMATION)>/i,'transformAni':/<(?:TRANSFORM|TRANSFORMATION) ANIMATION:[ ](\d+)>/i},DataManager['getEnemyIdWithName']=function(_0xd23265){const _0x5e2a6d=_0x5c4c7a;_0xd23265=_0xd23265[_0x5e2a6d(0x166)]()['trim'](),this[_0x5e2a6d(0x125)]=this[_0x5e2a6d(0x125)]||{};if(this[_0x5e2a6d(0x125)][_0xd23265])return this[_0x5e2a6d(0x125)][_0xd23265];for(const _0x2b8dfb of $dataEnemies){if(!_0x2b8dfb)continue;this[_0x5e2a6d(0x125)][_0x2b8dfb[_0x5e2a6d(0x1a9)]['toUpperCase']()['trim']()]=_0x2b8dfb['id'];}return this[_0x5e2a6d(0x125)][_0xd23265]||0x0;},Game_Battler['prototype'][_0x5c4c7a(0x198)]=function(_0x1952df){const _0x5ea8a1=_0x5c4c7a;if(!SceneManager[_0x5ea8a1(0x17b)]())return![];const _0x5c0e29=VisuMZ['LifeStateEffects'][_0x5ea8a1(0x15f)][_0x1952df];if(!_0x5c0e29)return;if(_0x1952df===_0x5ea8a1(0x11e)&&this['postTransformationAnimation']()>0x0){}else{if(Imported['VisuMZ_0_CoreEngine']&&_0x5c0e29[_0x5ea8a1(0x1a4)]>0x0){if(_0x5ea8a1(0x186)!==_0x5ea8a1(0x16c)){const _0x4e4637=[this],_0xcf1382=_0x5c0e29['AnimationID'],_0x3847a1=_0x5c0e29[_0x5ea8a1(0x19a)],_0x21ff7d=_0x5c0e29['Mute'];$gameTemp[_0x5ea8a1(0x181)](_0x4e4637,_0xcf1382,_0x3847a1,_0x21ff7d);}else this[_0x5ea8a1(0x14e)]=!![],_0x574141['LifeStateEffects'][_0x5ea8a1(0x18d)]['call'](this,_0x579f45),this[_0x5ea8a1(0x14e)]=_0x1819e5;}}if(_0x5c0e29[_0x5ea8a1(0x1a2)]!==''){if(_0x5ea8a1(0x1a5)==='uDUtV'){const _0x3ae3de=this[_0x5ea8a1(0x17e)]();_0xe900f6[_0x5ea8a1(0x197)][_0x5ea8a1(0x14b)][_0x5ea8a1(0x137)](this,_0x3ae3de);}else{const _0x1dc295={'textColor':_0x5c0e29['TextColor'],'flashColor':_0x5c0e29['FlashColor'],'flashDuration':_0x5c0e29['FlashDuration']};this[_0x5ea8a1(0x178)](_0x5c0e29['PopupText'],_0x1dc295);}}},VisuMZ['LifeStateEffects'][_0x5c4c7a(0x14b)]=Game_BattlerBase['prototype']['addNewState'],Game_BattlerBase[_0x5c4c7a(0x132)][_0x5c4c7a(0x1ac)]=function(_0x3d0ea0){const _0x5cba65=_0x5c4c7a;if(_0x3d0ea0===this[_0x5cba65(0x17e)]()){if(this[_0x5cba65(0x117)]())return this['onLifeStateAutoLifeEffect']();if(this[_0x5cba65(0x11d)]()&&this[_0x5cba65(0x13a)]())return _0x5cba65(0x187)===_0x5cba65(0x187)?this[_0x5cba65(0x14a)]():![];}VisuMZ[_0x5cba65(0x197)]['Game_BattlerBase_addNewState'][_0x5cba65(0x137)](this,_0x3d0ea0);},Game_BattlerBase[_0x5c4c7a(0x132)][_0x5c4c7a(0x117)]=function(){const _0x35b9bb=_0x5c4c7a;if(!SceneManager['isSceneBattle']())return![];const _0x16594b='LifeStateEffects_AutoLife';if(this[_0x35b9bb(0x13b)](_0x16594b))return this[_0x35b9bb(0x144)][_0x16594b];const _0x464177=this[_0x35b9bb(0x1ba)]()[_0x35b9bb(0x162)](this[_0x35b9bb(0x1be)]());return this[_0x35b9bb(0x144)][_0x16594b]=_0x464177[_0x35b9bb(0x179)](_0x1f1457=>_0x1f1457&&_0x1f1457[_0x35b9bb(0x191)]['match'](VisuMZ[_0x35b9bb(0x197)][_0x35b9bb(0x189)]['autoLife'])),this['_cache'][_0x16594b];},Game_Battler[_0x5c4c7a(0x132)][_0x5c4c7a(0x14f)]=function(){const _0x57c60e=_0x5c4c7a,_0x9bd3a9=JsonEx['makeDeepCopy'](this['_result']),_0xeedb05=VisuMZ[_0x57c60e(0x197)]['RegExp'][_0x57c60e(0x153)];let _0x1db5cc=this['states']()[_0x57c60e(0x124)](_0x480518=>_0x480518&&_0x480518[_0x57c60e(0x191)]['match'](_0xeedb05)?Number(RegExp['$1'])*0.01:0x0);const _0x511d6e=_0x1db5cc['reduce']((_0x3d8d3a,_0x1ff441)=>_0x3d8d3a+_0x1ff441,0x0);let _0x4a59eb=Math[_0x57c60e(0x12a)](_0x511d6e*this['mhp']);_0x4a59eb=_0x4a59eb['clamp'](0x0,this[_0x57c60e(0x140)]);if(_0x4a59eb<=0x0)return;this[_0x57c60e(0x146)](_0x4a59eb),this[_0x57c60e(0x171)](),this[_0x57c60e(0x155)][_0x57c60e(0x120)]=-_0x4a59eb,this[_0x57c60e(0x155)][_0x57c60e(0x14c)]=!![],this[_0x57c60e(0x13f)]();for(const _0x35bcb4 of this['states']()){if(!_0x35bcb4)continue;_0x35bcb4['note'][_0x57c60e(0x1bc)](_0xeedb05)&&this[_0x57c60e(0x14d)](_0x35bcb4['id']);}this[_0x57c60e(0x198)](_0x57c60e(0x165)),this[_0x57c60e(0x155)]=_0x9bd3a9;},VisuMZ['LifeStateEffects'][_0x5c4c7a(0x18d)]=Game_Battler[_0x5c4c7a(0x132)][_0x5c4c7a(0x12d)],Game_Battler[_0x5c4c7a(0x132)][_0x5c4c7a(0x12d)]=function(_0x3cb154){const _0x4f1302=_0x5c4c7a;this['_removeStatesAutoInEffect']=!![],VisuMZ[_0x4f1302(0x197)][_0x4f1302(0x18d)]['call'](this,_0x3cb154),this[_0x4f1302(0x14e)]=undefined;},VisuMZ[_0x5c4c7a(0x197)]['Game_BattlerBase_eraseState']=Game_BattlerBase[_0x5c4c7a(0x132)][_0x5c4c7a(0x1c0)],Game_BattlerBase[_0x5c4c7a(0x132)][_0x5c4c7a(0x1c0)]=function(_0x2bf626){const _0x26ac55=_0x5c4c7a,_0x14ea75=this[_0x26ac55(0x1b6)](_0x2bf626);VisuMZ[_0x26ac55(0x197)][_0x26ac55(0x126)][_0x26ac55(0x137)](this,_0x2bf626);const _0x31d879=$dataStates[_0x2bf626];this[_0x26ac55(0x14e)]&&_0x31d879&&_0x31d879[_0x26ac55(0x191)]['match'](VisuMZ[_0x26ac55(0x197)]['RegExp'][_0x26ac55(0x127)])&&_0x14ea75&&this[_0x26ac55(0x196)]();},Game_Battler[_0x5c4c7a(0x132)]['onLifeStateDoomEffect']=function(){const _0x5340d7=_0x5c4c7a;if(this[_0x5340d7(0x1bf)])return;if(this[_0x5340d7(0x1a0)])return;this[_0x5340d7(0x1bf)]=!![],this[_0x5340d7(0x146)](0x0),this[_0x5340d7(0x116)](),this[_0x5340d7(0x1bf)]=undefined;if(!this[_0x5340d7(0x1af)]())return;this['onLifeStateEffect'](_0x5340d7(0x1b8)),this[_0x5340d7(0x1ae)](),this[_0x5340d7(0x190)](_0x5340d7(0x17d));const _0xea4f97=this[_0x5340d7(0x13d)]();_0xea4f97&&(_0x5340d7(0x168)===_0x5340d7(0x1c1)?_0x3fd819[_0x5340d7(0x197)][_0x5340d7(0x15d)]['call'](this,_0x22d58a,_0xe8cc08):_0xea4f97[_0x5340d7(0x134)]=_0x5340d7(0x17d));},Game_BattlerBase[_0x5c4c7a(0x132)][_0x5c4c7a(0x115)]=function(){const _0x309937=_0x5c4c7a;if(!SceneManager['isSceneBattle']())return![];const _0x56c9f8=_0x309937(0x11a);if(this[_0x309937(0x13b)](_0x56c9f8))return this[_0x309937(0x144)][_0x56c9f8];const _0x381519=this['traitObjects']()[_0x309937(0x162)](this[_0x309937(0x1be)]());return this[_0x309937(0x144)][_0x56c9f8]=_0x381519[_0x309937(0x179)](_0x1c9690=>_0x1c9690&&_0x1c9690[_0x309937(0x191)][_0x309937(0x1bc)](VisuMZ[_0x309937(0x197)]['RegExp'][_0x309937(0x17c)])),this[_0x309937(0x144)][_0x56c9f8];},VisuMZ[_0x5c4c7a(0x197)][_0x5c4c7a(0x159)]=Game_Action[_0x5c4c7a(0x132)][_0x5c4c7a(0x1aa)],Game_Action[_0x5c4c7a(0x132)]['executeHpDamage']=function(_0x3e5b8f,_0x26d7ed){const _0x28676b=_0x5c4c7a;VisuMZ[_0x28676b(0x197)]['Game_Action_executeHpDamage'][_0x28676b(0x137)](this,_0x3e5b8f,_0x26d7ed),_0x26d7ed>0x0&&_0x3e5b8f[_0x28676b(0x115)]()&&(_0x3e5b8f[_0x28676b(0x146)](0x0),_0x3e5b8f[_0x28676b(0x198)]('Fragile'));},Game_BattlerBase[_0x5c4c7a(0x132)][_0x5c4c7a(0x183)]=function(){const _0x25721a=_0x5c4c7a;if(!SceneManager[_0x25721a(0x17b)]())return![];if(this['hp']<=0x1)return![];const _0x33ce9f=_0x25721a(0x177);if(this[_0x25721a(0x13b)](_0x33ce9f))return this['_cache'][_0x33ce9f];const _0x10900b=this[_0x25721a(0x1ba)]()[_0x25721a(0x162)](this[_0x25721a(0x1be)]());return this[_0x25721a(0x144)][_0x33ce9f]=_0x10900b['some'](_0x318c7a=>_0x318c7a&&_0x318c7a['note'][_0x25721a(0x1bc)](VisuMZ[_0x25721a(0x197)]['RegExp'][_0x25721a(0x142)])),this[_0x25721a(0x144)][_0x33ce9f];},VisuMZ[_0x5c4c7a(0x197)]['Game_BattlerBase_setHp']=Game_BattlerBase[_0x5c4c7a(0x132)]['setHp'],Game_BattlerBase[_0x5c4c7a(0x132)]['setHp']=function(_0x2b7abd){const _0x47afa9=_0x5c4c7a;if(this[_0x47afa9(0x183)]()&&_0x2b7abd<=0x0){if(_0x47afa9(0x169)!=='DBMLY'){if(!_0x4df96f['isSceneBattle']())return![];const _0x3516b1='LifeStateEffects_Fragile';if(this[_0x47afa9(0x13b)](_0x3516b1))return this[_0x47afa9(0x144)][_0x3516b1];const _0x3f980b=this[_0x47afa9(0x1ba)]()[_0x47afa9(0x162)](this[_0x47afa9(0x1be)]());return this[_0x47afa9(0x144)][_0x3516b1]=_0x3f980b['some'](_0x41824d=>_0x41824d&&_0x41824d[_0x47afa9(0x191)][_0x47afa9(0x1bc)](_0xb8e69d[_0x47afa9(0x197)][_0x47afa9(0x189)][_0x47afa9(0x17c)])),this[_0x47afa9(0x144)][_0x3516b1];}else this[_0x47afa9(0x198)](_0x47afa9(0x12e)),_0x2b7abd=0x1;}VisuMZ[_0x47afa9(0x197)][_0x47afa9(0x154)][_0x47afa9(0x137)](this,_0x2b7abd);},Game_BattlerBase[_0x5c4c7a(0x132)][_0x5c4c7a(0x161)]=function(){const _0x4aabdd=_0x5c4c7a;if(this[_0x4aabdd(0x15e)])return![];const _0x4c234='LifeStateEffects_Undead';if(this[_0x4aabdd(0x13b)](_0x4c234))return this[_0x4aabdd(0x144)][_0x4c234];const _0x3d74f9=this[_0x4aabdd(0x1ba)]()[_0x4aabdd(0x162)](this[_0x4aabdd(0x1be)]());return this[_0x4aabdd(0x144)][_0x4c234]=_0x3d74f9[_0x4aabdd(0x179)](_0x14a586=>_0x14a586&&_0x14a586['note'][_0x4aabdd(0x1bc)](VisuMZ[_0x4aabdd(0x197)][_0x4aabdd(0x189)][_0x4aabdd(0x11f)])),this[_0x4aabdd(0x144)][_0x4c234];},VisuMZ['LifeStateEffects']['Game_Battler_gainHp']=Game_Battler[_0x5c4c7a(0x132)][_0x5c4c7a(0x160)],Game_Battler['prototype'][_0x5c4c7a(0x160)]=function(_0x31a626){const _0x52c564=_0x5c4c7a;if(this[_0x52c564(0x161)]()&&_0x31a626>0x0){if('uNEiN'===_0x52c564(0x1a8)){if(this[_0x52c564(0x117)]())return this[_0x52c564(0x14f)]();if(this[_0x52c564(0x11d)]()&&this['hasDeathTransform']())return this[_0x52c564(0x14a)]();}else _0x31a626*=-0x1,this[_0x52c564(0x198)](_0x52c564(0x11b));}VisuMZ[_0x52c564(0x197)][_0x52c564(0x13e)][_0x52c564(0x137)](this,_0x31a626);},VisuMZ[_0x5c4c7a(0x197)][_0x5c4c7a(0x122)]=Game_Action['prototype']['executeDamage'],Game_Action['prototype'][_0x5c4c7a(0x130)]=function(_0x40dedc,_0x4ba70b){const _0x33223d=_0x5c4c7a;if(this[_0x33223d(0x16d)]()&&this[_0x33223d(0x1b0)]()&&_0x4ba70b>0x0){if(_0x33223d(0x119)!==_0x33223d(0x182))this[_0x33223d(0x18c)]()['hasLifeStateUndeadEffect']()&&(this[_0x33223d(0x18c)]()[_0x33223d(0x15e)]=!![]),_0x40dedc[_0x33223d(0x161)]()&&('ABGuJ'===_0x33223d(0x150)?(_0x4ba70b*=-0x1,_0x40dedc['_allowUndeadHpHeal']=!![],_0x40dedc[_0x33223d(0x198)]('Undead')):_0x158c4c[_0x33223d(0x15e)]=!![]);else{const _0x4a32a9=_0x295cf4[_0x33223d(0x197)][_0x33223d(0x189)],_0x35411c=this['enemy']()['note']||'';return _0x35411c[_0x33223d(0x1bc)](_0x4a32a9[_0x33223d(0x12b)])?_0xbf59f6(_0x5e0ed9['$1']):0x0;}}VisuMZ['LifeStateEffects'][_0x33223d(0x122)][_0x33223d(0x137)](this,_0x40dedc,_0x4ba70b),_0x40dedc['_allowUndeadHpHeal']=undefined,this[_0x33223d(0x18c)]()[_0x33223d(0x15e)]=undefined;},VisuMZ[_0x5c4c7a(0x197)][_0x5c4c7a(0x15a)]=Game_Action['prototype'][_0x5c4c7a(0x123)],Game_Action[_0x5c4c7a(0x132)]['itemEffectAddAttackState']=function(_0x84b191,_0x43b569){const _0x248ae7=_0x5c4c7a;_0x84b191['hasLifeStateUndeadEffect']()&&(_0x84b191['_allowUndeadHpHeal']=!![]),VisuMZ[_0x248ae7(0x197)][_0x248ae7(0x15a)][_0x248ae7(0x137)](this,_0x84b191,_0x43b569),_0x84b191[_0x248ae7(0x15e)]=undefined;},VisuMZ[_0x5c4c7a(0x197)][_0x5c4c7a(0x19b)]=Game_Battler[_0x5c4c7a(0x132)][_0x5c4c7a(0x152)],Game_Battler['prototype'][_0x5c4c7a(0x152)]=function(_0x2b9ca6){const _0x74c7a6=_0x5c4c7a;_0x2b9ca6===this[_0x74c7a6(0x17e)]()&&this['_allowUndeadHpHeal']?(this['gainHp'](this[_0x74c7a6(0x140)]),this[_0x74c7a6(0x198)](_0x74c7a6(0x11b))):VisuMZ['LifeStateEffects'][_0x74c7a6(0x19b)][_0x74c7a6(0x137)](this,_0x2b9ca6);},VisuMZ[_0x5c4c7a(0x197)][_0x5c4c7a(0x15d)]=Game_Action[_0x5c4c7a(0x132)][_0x5c4c7a(0x1a3)],Game_Action['prototype'][_0x5c4c7a(0x1a3)]=function(_0x3e4438,_0x1e7204){const _0x5f465e=_0x5c4c7a;_0x1e7204[_0x5f465e(0x128)]===_0x3e4438[_0x5f465e(0x17e)]()&&_0x3e4438[_0x5f465e(0x161)]()?_0x5f465e(0x192)!==_0x5f465e(0x192)?(this[_0x5f465e(0x160)](this['mhp']),this[_0x5f465e(0x198)]('Undead')):(_0x3e4438['_allowUndeadHpHeal']=!![],_0x3e4438[_0x5f465e(0x160)](_0x3e4438[_0x5f465e(0x140)]),_0x3e4438[_0x5f465e(0x15e)]=undefined,_0x3e4438['onLifeStateEffect'](_0x5f465e(0x11b))):_0x5f465e(0x131)==='fPDry'?VisuMZ[_0x5f465e(0x197)][_0x5f465e(0x15d)][_0x5f465e(0x137)](this,_0x3e4438,_0x1e7204):(_0x4f9147=0x0,this[_0x5f465e(0x198)](_0x5f465e(0x1ad)));},Game_BattlerBase[_0x5c4c7a(0x132)][_0x5c4c7a(0x139)]=function(){const _0x30c81f=_0x5c4c7a,_0x45bfde=_0x30c81f(0x19d);if(this[_0x30c81f(0x13b)](_0x45bfde))return this[_0x30c81f(0x144)][_0x45bfde];const _0x6096d8=this[_0x30c81f(0x1ba)]()[_0x30c81f(0x162)](this['skills']());return this[_0x30c81f(0x144)][_0x45bfde]=_0x6096d8[_0x30c81f(0x179)](_0x25c21e=>_0x25c21e&&_0x25c21e[_0x30c81f(0x191)]['match'](VisuMZ[_0x30c81f(0x197)][_0x30c81f(0x189)][_0x30c81f(0x1a1)])),this[_0x30c81f(0x144)][_0x45bfde];},Game_BattlerBase[_0x5c4c7a(0x132)][_0x5c4c7a(0x136)]=function(){const _0x302eb4=_0x5c4c7a,_0x49bbc6=_0x302eb4(0x158);if(this['checkCacheKey'](_0x49bbc6))return this[_0x302eb4(0x144)][_0x49bbc6];const _0x10e824=this['traitObjects']()[_0x302eb4(0x162)](this[_0x302eb4(0x1be)]());return this['_cache'][_0x49bbc6]=_0x10e824[_0x302eb4(0x179)](_0x13a2ff=>_0x13a2ff&&_0x13a2ff[_0x302eb4(0x191)][_0x302eb4(0x1bc)](VisuMZ[_0x302eb4(0x197)][_0x302eb4(0x189)][_0x302eb4(0x12c)])),this['_cache'][_0x49bbc6];},Game_BattlerBase[_0x5c4c7a(0x132)][_0x5c4c7a(0x121)]=function(){const _0x30d1e9=_0x5c4c7a,_0x1db193='LifeStateEffects_CurseTp';if(this[_0x30d1e9(0x13b)](_0x1db193))return this[_0x30d1e9(0x144)][_0x1db193];const _0x211621=this['traitObjects']()['concat'](this[_0x30d1e9(0x1be)]());return this[_0x30d1e9(0x144)][_0x1db193]=_0x211621[_0x30d1e9(0x179)](_0x5ef55b=>_0x5ef55b&&_0x5ef55b[_0x30d1e9(0x191)][_0x30d1e9(0x1bc)](VisuMZ[_0x30d1e9(0x197)][_0x30d1e9(0x189)]['noHealTp'])),this[_0x30d1e9(0x144)][_0x1db193];},VisuMZ[_0x5c4c7a(0x197)][_0x5c4c7a(0x1b4)]=Game_Battler[_0x5c4c7a(0x132)][_0x5c4c7a(0x160)],Game_Battler[_0x5c4c7a(0x132)]['gainHp']=function(_0x5c5fc2){const _0x3b1bea=_0x5c4c7a;_0x5c5fc2>0x0&&this[_0x3b1bea(0x139)]()&&(_0x5c5fc2=0x0,this[_0x3b1bea(0x198)]('Curse')),VisuMZ[_0x3b1bea(0x197)][_0x3b1bea(0x1b4)]['call'](this,_0x5c5fc2);},VisuMZ[_0x5c4c7a(0x197)]['Game_Battler_gainMpCurse']=Game_Battler[_0x5c4c7a(0x132)][_0x5c4c7a(0x1b2)],Game_Battler['prototype']['gainMp']=function(_0x34b1ea){const _0x40d010=_0x5c4c7a;_0x34b1ea>0x0&&this[_0x40d010(0x136)]()&&(_0x34b1ea=0x0,this[_0x40d010(0x198)]('Curse')),VisuMZ['LifeStateEffects'][_0x40d010(0x1a7)]['call'](this,_0x34b1ea);},VisuMZ[_0x5c4c7a(0x197)][_0x5c4c7a(0x172)]=Game_Battler['prototype'][_0x5c4c7a(0x1bb)],Game_Battler[_0x5c4c7a(0x132)]['gainTp']=function(_0x16f66e){const _0x53baf3=_0x5c4c7a;_0x16f66e>0x0&&this[_0x53baf3(0x121)]()&&(_0x16f66e=0x0,this[_0x53baf3(0x198)](_0x53baf3(0x1ad))),VisuMZ[_0x53baf3(0x197)][_0x53baf3(0x172)][_0x53baf3(0x137)](this,_0x16f66e);},Game_BattlerBase[_0x5c4c7a(0x132)][_0x5c4c7a(0x13a)]=function(){return![];},Game_Enemy[_0x5c4c7a(0x132)][_0x5c4c7a(0x13a)]=function(){const _0x46a719=_0x5c4c7a;return this[_0x46a719(0x17a)]()[_0x46a719(0x191)][_0x46a719(0x1bc)](VisuMZ[_0x46a719(0x197)][_0x46a719(0x189)]['deathTransform']);},Game_Enemy[_0x5c4c7a(0x132)][_0x5c4c7a(0x14a)]=function(){const _0xbda90e=_0x5c4c7a,_0xcb7a3b=this[_0xbda90e(0x1b3)]();if(_0xcb7a3b>0x0)_0xbda90e(0x1b9)!=='eaQGf'?(this[_0xbda90e(0x16d)]()&&this[_0xbda90e(0x1b0)]()&&_0x3d410e>0x0&&(this['subject']()[_0xbda90e(0x161)]()&&(this[_0xbda90e(0x18c)]()[_0xbda90e(0x15e)]=!![]),_0x2bcebe[_0xbda90e(0x161)]()&&(_0x51a58c*=-0x1,_0x5d65d2[_0xbda90e(0x15e)]=!![],_0x4d269f[_0xbda90e(0x198)]('Undead'))),_0x390601[_0xbda90e(0x197)][_0xbda90e(0x122)][_0xbda90e(0x137)](this,_0x21c91c,_0x5c7902),_0x5dee0c[_0xbda90e(0x15e)]=_0x2f9d0d,this[_0xbda90e(0x18c)]()[_0xbda90e(0x15e)]=_0x3a140e):this['applyDeathTransform'](_0xcb7a3b);else{const _0x1fb1e3=this[_0xbda90e(0x17e)]();VisuMZ[_0xbda90e(0x197)]['Game_BattlerBase_addNewState'][_0xbda90e(0x137)](this,_0x1fb1e3);}},Game_Enemy[_0x5c4c7a(0x132)][_0x5c4c7a(0x1b3)]=function(){const _0x4b9f04=_0x5c4c7a,_0x583fa7=VisuMZ[_0x4b9f04(0x197)][_0x4b9f04(0x189)],_0x415c4c=this[_0x4b9f04(0x17a)]()[_0x4b9f04(0x191)]||'';if(_0x415c4c[_0x4b9f04(0x1bc)](_0x583fa7[_0x4b9f04(0x19e)])){const _0x6fa748=String(RegExp['$1'])[_0x4b9f04(0x18b)](/[\r\n]+/)[_0x4b9f04(0x145)](''),_0xec7b00=DataManager['processRandomizedData'](_0x6fa748);return _0xec7b00['match'](/ENEMY[ ](\d+)/i)?_0x4b9f04(0x138)!=='qXXqy'?Number(RegExp['$1']):0x0:DataManager[_0x4b9f04(0x1c2)](_0xec7b00);}return 0x0;},Game_Enemy[_0x5c4c7a(0x132)][_0x5c4c7a(0x1c3)]=function(_0x4aa27f){const _0x8d8481=_0x5c4c7a;this[_0x8d8481(0x176)](Number(_0x4aa27f)),this[_0x8d8481(0x144)]={},this[_0x8d8481(0x146)](this['mhp']),this['setMp'](this[_0x8d8481(0x13c)]);},VisuMZ[_0x5c4c7a(0x197)][_0x5c4c7a(0x167)]=Game_Enemy[_0x5c4c7a(0x132)]['transform'],Game_Enemy[_0x5c4c7a(0x132)][_0x5c4c7a(0x176)]=function(_0x41029d){const _0xe659b4=_0x5c4c7a;VisuMZ[_0xe659b4(0x197)][_0xe659b4(0x167)][_0xe659b4(0x137)](this,_0x41029d),this[_0xe659b4(0x198)](_0xe659b4(0x11e)),this[_0xe659b4(0x1c5)]();},Game_Enemy[_0x5c4c7a(0x132)]['playPostTransformationAnimation']=function(){const _0x406bab=_0x5c4c7a;if(!Imported[_0x406bab(0x188)])return;const _0x324f53=this[_0x406bab(0x148)]();if(_0x324f53>0x0){if(_0x406bab(0x147)==='RWyck'){const _0x23606c=VisuMZ[_0x406bab(0x197)][_0x406bab(0x15f)]['Transform'],_0x4819c6=[this],_0x16168d=_0x23606c[_0x406bab(0x19a)]||![],_0x15ce9d=_0x23606c[_0x406bab(0x151)]||![];$gameTemp[_0x406bab(0x181)](_0x4819c6,_0x324f53,_0x16168d,_0x15ce9d);}else this[_0x406bab(0x1c3)](_0x540e9c);}},Game_BattlerBase['prototype'][_0x5c4c7a(0x148)]=function(){return 0x0;},Game_Enemy['prototype'][_0x5c4c7a(0x148)]=function(){const _0x4c6852=_0x5c4c7a,_0x3a7cb3=VisuMZ[_0x4c6852(0x197)]['RegExp'],_0x510d1c=this['enemy']()[_0x4c6852(0x191)]||'';if(_0x510d1c[_0x4c6852(0x1bc)](_0x3a7cb3[_0x4c6852(0x12b)])){if('ZdGVp'===_0x4c6852(0x195))_0x5dc92c=0x0,this[_0x4c6852(0x198)](_0x4c6852(0x1ad));else return Number(RegExp['$1']);}else return 0x0;};
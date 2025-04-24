//=============================================================================
// VisuStella MZ - Break Shields
// VisuMZ_4_BreakShields.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_BreakShields = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BreakShields = VisuMZ.BreakShields || {};
VisuMZ.BreakShields.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.02] [BreakShields]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Break_Shields_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin introduces a new mechanic called Break Shields. Actors and/or
 * enemies can have them. Whenever a battler is struck with an elemental
 * weakness, their Break Shield is reduced by 1 (unless modified by a notetag).
 * Once the battler's Break Shield reaches a score of 0, a state is then
 * applied to the battler (usually a stun state). Once the Break state wears
 * off, the battler will regain their Break Shields again. This can be used to
 * create complex battle depth for your game.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Control how Break Shields are calculated alongside how many hits are
 *   required for each actor and/or enemy to enter the Break Stun state.
 * * Display the Break Shields on the screen and relay the information to your
 *   players through icons.
 * * Play animations when hitting a weakness and reducing Break Shields.
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 *
 * Two of the animation Plugin Parameters require the Core Engine to play them.
 * This is due to how the Core Engine allows playing animations without halting
 * the battle system to allow for a seamless flow despite relaying the Break
 * Shield reduction visual feedback.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins. Here is a list
 * of the ones this plugin is not compatible with.
 *
 * ---
 *
 * VisuMZ_2_BattleSystemSTB
 * 
 * The Break Shields plugin can be used together with Battle System - STB.
 * However, it cannot be used together with the STB Exploit system. This is
 * because both Break Shields and the Exploit system function under similar
 * mechanics and will conflict. However, if STB's Exploit system is turned off,
 * then you can use all of the Break Shield plugin's features fully.
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
 * === Break Shield Calculation-Related Notetags ===
 * 
 * ---
 *
 * <Break Shields: x>
 *
 * - Used for: Actor, Class, Enemy Notetags
 * - Declares the base amount of Break Shields this battler will have.
 * - This will ignore the default setting from the Plugin Parameters.
 * - Replace 'x' with a number representing the base amount of Break Shields to
 *   give this battler.
 * - If both the Actor and Class database object has this notetag, priority
 *   will be given to the Class before the Actor.
 *
 * ---
 *
 * <Break Shields: +x>
 * <Break Shields: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Allows trait objects to alter the amount of Break Shields battlers have
 *   whenever their Break Shields are reset.
 * - Replace 'x' with a number representing the Break Shields to increase or
 *   decrease the amount by.
 * - Total Break Shields cannot go under 1 and cannot go whatever the maximum
 *   is declared inside the Plugin Parameters.
 *
 * ---
 * 
 * === Break Shield Alteration-Related Notetags ===
 * 
 * ---
 *
 * <Break Reduce: x>
 *
 * - Used for: Skill, Item Notetags
 * - Reduces the target's Break Shield by x if this action hits a weakness.
 * - This will ignore the default setting from the Plugin Parameters.
 * - Replace 'x' with a number to determine how many Break Shields to reduce.
 * - If Break Shields reach 0, the target will enter a Stun state.
 *
 * ---
 *
 * <Change Break Shield: x>
 *
 * - Used for: Skill, Item Notetags
 * - This will change the target battler's Break Shield value to x if the
 *   battler isn't currently stunned.
 * - No effect if you don't use this notetag.
 * - Replace 'x' with a number value to change the target battler's Break
 *   Shield value to.
 *
 * ---
 *
 * <Increase Break Shield: +x>
 * <Decrease Break Shield: -x>
 *
 * - Used for: Skill, Item Notetags
 * - This will either increase the target battler's break shield by x or
 *   decrease the target battler's break shield by x.
 * - Happens after the Change Break Shield notetag.
 * - No effect if you don't use this notetag.
 * - Replace 'x' with a number value representing the amount to alter the
 *   target's Break Shields by.
 *
 * ---
 * 
 * === Element-Related Notetags ===
 * 
 * ---
 *
 * <Protect Element: id>
 * <Protect Elements: id, id, id>
 * 
 * <Protect Element: name>
 * <Protect Elements: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Specified element(s) will be guarded and Break Shields cannot be reduced
 *   when struck with that element (as long as the requirement is above 100%).
 * - The element rate for those will cap at 100%, preventing extra damage from
 *   being dealt despite having weaknesses, although custom JS effects will
 *   bypass this.
 * - Replace 'id' with a number value representing the ID(s) of the element(s).
 * - Replace 'name' with the name(s) of the element(s).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Customize the mechanical settings for Break Shields.
 *
 * ---
 *
 * Break Shields
 * 
 *   Affect: Actors?:
 *   - Do Break Shields affect actors?
 * 
 *   Affect: Enemies?:
 *   - Do Break Shields affect actors?
 * 
 *   Base Shield Value:
 *   - The starting amount of shields a battler has.
 *   - Can be altered through notetags.
 * 
 *   Maximum Shields:
 *   - The maximum amount of shields a battler can have.
 *   - This is a hard cap.
 * 
 *   Stun State ID:
 *   - This is the state to be applied when all Break Shields are reduced to 0.
 *
 * ---
 *
 * Animation
 * 
 *   Reduce Animation ID:
 *   - Play this animation when Break Shields are reduced.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Stun Animation ID:
 *   - Play this animation when Break Stun is achieved.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 * ---
 *
 * Weaknesses
 * 
 *   Minimum Rate:
 *   - What is the minimum element rate for an attack to be considered striking
 *     a weakness?
 * 
 *   Default Reduction:
 *   - Default reduction amount for Break Shields when striking an elemental
 *     weakness.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * Customize the UI settings for Break Shields.
 *
 * ---
 *
 * Icons
 * 
 *   Break Shield Icon:
 *   - Icon used to represent Break Shields.
 * 
 *   Stun State Icon:
 *   - Icon used to represent Break Stun if the Break Stun state does NOT have
 *     an icon assigned to it.
 * 
 *     Show Turns?:
 *     - Show how many turns are remaining with the Break Stun?
 * 
 *   Protect Icon:
 *   - Icon used to represent Protected Elements.
 *   - Used for other plugins.
 * 
 *   Font Size:
 *   - What is the font size used to display the turns and Break Shields
 *     remaining?
 *
 * ---
 *
 * Battlers > Actors/Enemies
 * 
 *   Show Battler Icon?:
 *   - Show Break Shield icons on the SV_Actor/enemy battlers?
 * 
 *   Position:
 *   - Where on the battler would you like to place the icon?
 * 
 *   Offset X:
 *   - How much to offset the icon X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the icon Y position by?
 *   - Negative goes up. Positive goes down.
 * 
 *   Name: Attach Shields (Enemies Only)
 *   - Attach the Break Shield icon to the enemy name?
 *   - Overrides direct attachment.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *     Attach: Offset X:
 *     - How much to offset the attached icon's X position by?
 *     - Negative goes left. Positive goes right.
 * 
 *     Attach: Offset Y:
 *     - How much to offset the attached icon's Y position by?
 *     - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Battle Status
 * 
 *   Show Break Shields?:
 *   - Show Break Shield icons in the Battle Status?
 * 
 *   Auto-Position?:
 *   - Automatically position the Break Shield icon?
 *   - If not, it'll position it to the upper left.
 * 
 *   Offset X:
 *   - How much to offset the icon X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the icon Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Menu Status
 * 
 *   Show Break Shields?:
 *   - Show Break Shield icons in the menu scenes?
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
 * Version 1.02: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 *
 * Version 1.01: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.00 Official Release Date: April 30, 2021
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
 * @param BreakShields
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
 * @desc Customize the mechanical settings for Break Shields.
 * @default {"BreakShields":"","AffectActors:eval":"true","AffectEnemies:eval":"true","Base:num":"1","Max:num":"99","StunState:num":"13","Animation":"","ReduceAniID:num":"2","StunAniID:num":"15","Weaknesses":"","MinRate:num":"1.05","Reduction:num":"1"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Customize the UI settings for Break Shields.
 * @default {"Icons":"","ShieldIcon:num":"81","StunIcon:num":"6","ShowStunTurns:eval":"false","ProtectIcon:num":"128","FontSize:num":"22","Battlers":"","Actors":"","ActorDisplayIcon:eval":"false","ActorDisplayPosition:str":"bottom center","ActorOffsetX:num":"+0","ActorOffsetY:num":"+8","Enemies":"","EnemyDisplayIcon:eval":"true","EnemyDisplayPosition:str":"bottom center","EnemyOffsetX:num":"+0","EnemyOffsetY:num":"+8","NameAttachShieldIcon:eval":"true","AttachShieldOffsetX:num":"+0","AttachShieldOffsetY:num":"+0","BattleStatus":"","BattleStatusDisplayIcons:eval":"true","BattleStatusAutoPosition:eval":"true","BattleStatusOffsetX:num":"+0","BattleStatusOffsetY:num":"+0","MenuStatus":"","MenuStatusBreakShieldIcons:eval":"true"}
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
 * @param BreakShields
 * @text Break Shields
 *
 * @param AffectActors:eval
 * @text Affect: Actors?
 * @parent BreakShields
 * @type boolean
 * @on Yes
 * @off No
 * @desc Do Break Shields affect actors?
 * @default true
 *
 * @param AffectEnemies:eval
 * @text Affect: Enemies?
 * @parent BreakShields
 * @type boolean
 * @on Yes
 * @off No
 * @desc Do Break Shields affect actors?
 * @default true
 *
 * @param Base:num
 * @text Base Shield Value
 * @parent BreakShields
 * @type number
 * @min 1
 * @desc The starting amount of shields a battler has.
 * Can be altered through notetags.
 * @default 1
 *
 * @param Max:num
 * @text Maximum Shields
 * @parent BreakShields
 * @type number
 * @min 1
 * @desc The maximum amount of shields a battler can have.
 * This is a hard cap.
 * @default 99
 *
 * @param StunState:num
 * @text Stun State ID
 * @parent BreakShields
 * @type state
 * @desc This is the state to be applied when all Break Shields
 * are reduced to 0.
 * @default 13
 *
 * @param Animation
 *
 * @param ReduceAniID:num
 * @text Reduce Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when Break Shields are reduced.
 * Requires VisuMZ_0_CoreEngine.
 * @default 2
 *
 * @param StunAniID:num
 * @text Stun Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when Break Stun is achieved.
 * Requires VisuMZ_0_CoreEngine.
 * @default 15
 *
 * @param Weaknesses
 *
 * @param MinRate:num
 * @text Minimum Rate
 * @parent Weaknesses
 * @desc What is the minimum element rate for an attack to be
 * considered striking a weakness?
 * @default 1.05
 *
 * @param Reduction:num
 * @text Default Reduction
 * @parent Weaknesses
 * @type number
 * @min 1
 * @desc Default reduction amount for Break Shields when striking
 * an elemental weakness.
 * @default 1
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
 * @param ShieldIcon:num
 * @text Break Shield Icon
 * @parent Icons
 * @desc Icon used to represent Break Shields.
 * @default 81
 *
 * @param StunIcon:num
 * @text Stun State Icon
 * @parent Icons
 * @desc Icon used to represent Break Stun if the Break Stun state
 * does NOT have an icon assigned to it.
 * @default 6
 *
 * @param ShowStunTurns:eval
 * @text Show Turns?
 * @parent StunIcon:num
 * @type boolean
 * @on Show Turns
 * @off Hide Turns
 * @desc Show how many turns are remaining with the Break Stun?
 * @default false
 *
 * @param ProtectIcon:num
 * @text Protect Icon
 * @parent Icons
 * @desc Icon used to represent Protected Elements.
 * Used for other plugins.
 * @default 128
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Icons
 * @number
 * @min 1
 * @desc What is the font size used to display the turns and
 * Break Shields remaining?
 * @default 22
 *
 * @param Battlers
 * 
 * @param Actors
 * @parent Battlers
 *
 * @param ActorDisplayIcon:eval
 * @text Show Battler Icon?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons on the SV_Actor battlers?
 * @default false
 *
 * @param ActorDisplayPosition:str
 * @text Position
 * @parent Actors
 * @type combo
 * @option top left
 * @option top center
 * @option top right
 * @option middle left
 * @option middle center
 * @option middle right
 * @option bottom left
 * @option bottom center
 * @option bottom right
 * @desc Where on the battler would you like to place the icon?
 * @default bottom center
 *
 * @param ActorOffsetX:num
 * @text Offset X
 * @parent Actors
 * @desc How much to offset the icon X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param ActorOffsetY:num
 * @text Offset Y
 * @parent Actors
 * @desc How much to offset the icon Y position by?
 * Negative goes up. Positive goes down.
 * @default +8
 * 
 * @param Enemies
 * @parent Battlers
 *
 * @param EnemyDisplayIcon:eval
 * @text Show Battler Icon?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons on the enemy battlers?
 * @default true
 *
 * @param EnemyDisplayPosition:str
 * @text Position
 * @parent Enemies
 * @type combo
 * @option top left
 * @option top center
 * @option top right
 * @option middle left
 * @option middle center
 * @option middle right
 * @option bottom left
 * @option bottom center
 * @option bottom right
 * @desc Where on the battler would you like to place the icon?
 * @default bottom center
 *
 * @param EnemyOffsetX:num
 * @text Offset X
 * @parent Enemies
 * @desc How much to offset the icon X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param EnemyOffsetY:num
 * @text Offset Y
 * @parent Enemies
 * @desc How much to offset the icon Y position by?
 * Negative goes up. Positive goes down.
 * @default +8
 *
 * @param NameAttachShieldIcon:eval
 * @text Name: Attach Shields
 * @parent Enemies
 * @type boolean
 * @on Attach
 * @off Normal Position
 * @desc Attach the Break Shield icon to the enemy name?
 * Overrides direct attachment. Requires VisuMZ_1_BattleCore!
 * @default true
 *
 * @param AttachShieldOffsetX:num
 * @text Attach: Offset X
 * @parent NameAttachShieldIcon:eval
 * @desc How much to offset the attached icon's X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param AttachShieldOffsetY:num
 * @text Attach: Offset Y
 * @parent NameAttachShieldIcon:eval
 * @desc How much to offset the attached icon's Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param BattleStatus
 * @text Battle Status
 *
 * @param BattleStatusDisplayIcons:eval
 * @text Show Break Shields?
 * @parent BattleStatus
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons in the Battle Status?
 * @default true
 *
 * @param BattleStatusAutoPosition:eval
 * @text Auto-Position?
 * @parent BattleStatus
 * @type boolean
 * @on Auto-Position
 * @off Manual Position
 * @desc Automatically position the Break Shield icon?
 * If not, it'll position it to the upper left.
 * @default true
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How much to offset the icon X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How much to offset the icon Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param MenuStatus
 * @text Menu Status
 *
 * @param MenuStatusBreakShieldIcons:eval
 * @text Show Break Shields?
 * @parent MenuStatus
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons in the menu scenes?
 * @default true
 *
 */
//=============================================================================

const _0x1e170f=_0x568d;(function(_0x15d1ee,_0x402526){const _0x24691f=_0x568d,_0x1ed9c1=_0x15d1ee();while(!![]){try{const _0x488f88=-parseInt(_0x24691f(0x160))/0x1+parseInt(_0x24691f(0x1d6))/0x2+-parseInt(_0x24691f(0x189))/0x3*(parseInt(_0x24691f(0x16b))/0x4)+-parseInt(_0x24691f(0x1b7))/0x5*(-parseInt(_0x24691f(0x16e))/0x6)+-parseInt(_0x24691f(0x1d2))/0x7+parseInt(_0x24691f(0x15a))/0x8*(-parseInt(_0x24691f(0x153))/0x9)+-parseInt(_0x24691f(0x17c))/0xa*(-parseInt(_0x24691f(0x19c))/0xb);if(_0x488f88===_0x402526)break;else _0x1ed9c1['push'](_0x1ed9c1['shift']());}catch(_0x4a0d6f){_0x1ed9c1['push'](_0x1ed9c1['shift']());}}}(_0x4974,0x45c7a));var label=_0x1e170f(0x1f9),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1e170f(0x15f)](function(_0x1a6523){const _0xe15e84=_0x1e170f;return _0x1a6523['status']&&_0x1a6523[_0xe15e84(0x136)]['includes']('['+label+']');})[0x0];function _0x568d(_0x342db4,_0x2a333c){const _0x497481=_0x4974();return _0x568d=function(_0x568d12,_0x275f8f){_0x568d12=_0x568d12-0xea;let _0x4f8841=_0x497481[_0x568d12];return _0x4f8841;},_0x568d(_0x342db4,_0x2a333c);}VisuMZ[label][_0x1e170f(0x1e4)]=VisuMZ[label][_0x1e170f(0x1e4)]||{},VisuMZ[_0x1e170f(0x181)]=function(_0x32d749,_0x37b93c){const _0x5acfe5=_0x1e170f;for(const _0x5d9ae4 in _0x37b93c){if(_0x5d9ae4[_0x5acfe5(0x163)](/(.*):(.*)/i)){if(_0x5acfe5(0x1ed)===_0x5acfe5(0x1ed)){const _0x894898=String(RegExp['$1']),_0x3f8b5a=String(RegExp['$2'])['toUpperCase']()[_0x5acfe5(0x12f)]();let _0x49285c,_0x6af5c,_0x1cda38;switch(_0x3f8b5a){case'NUM':_0x49285c=_0x37b93c[_0x5d9ae4]!==''?Number(_0x37b93c[_0x5d9ae4]):0x0;break;case _0x5acfe5(0x11d):_0x6af5c=_0x37b93c[_0x5d9ae4]!==''?JSON[_0x5acfe5(0x172)](_0x37b93c[_0x5d9ae4]):[],_0x49285c=_0x6af5c[_0x5acfe5(0x19f)](_0x8eeb3c=>Number(_0x8eeb3c));break;case _0x5acfe5(0x162):_0x49285c=_0x37b93c[_0x5d9ae4]!==''?eval(_0x37b93c[_0x5d9ae4]):null;break;case'ARRAYEVAL':_0x6af5c=_0x37b93c[_0x5d9ae4]!==''?JSON['parse'](_0x37b93c[_0x5d9ae4]):[],_0x49285c=_0x6af5c['map'](_0x4e976e=>eval(_0x4e976e));break;case'JSON':_0x49285c=_0x37b93c[_0x5d9ae4]!==''?JSON['parse'](_0x37b93c[_0x5d9ae4]):'';break;case _0x5acfe5(0x175):_0x6af5c=_0x37b93c[_0x5d9ae4]!==''?JSON[_0x5acfe5(0x172)](_0x37b93c[_0x5d9ae4]):[],_0x49285c=_0x6af5c[_0x5acfe5(0x19f)](_0x3cc360=>JSON[_0x5acfe5(0x172)](_0x3cc360));break;case'FUNC':_0x49285c=_0x37b93c[_0x5d9ae4]!==''?new Function(JSON[_0x5acfe5(0x172)](_0x37b93c[_0x5d9ae4])):new Function(_0x5acfe5(0x1d7));break;case _0x5acfe5(0x10f):_0x6af5c=_0x37b93c[_0x5d9ae4]!==''?JSON[_0x5acfe5(0x172)](_0x37b93c[_0x5d9ae4]):[],_0x49285c=_0x6af5c[_0x5acfe5(0x19f)](_0x30ffde=>new Function(JSON['parse'](_0x30ffde)));break;case _0x5acfe5(0x1d5):_0x49285c=_0x37b93c[_0x5d9ae4]!==''?String(_0x37b93c[_0x5d9ae4]):'';break;case'ARRAYSTR':_0x6af5c=_0x37b93c[_0x5d9ae4]!==''?JSON[_0x5acfe5(0x172)](_0x37b93c[_0x5d9ae4]):[],_0x49285c=_0x6af5c['map'](_0x40d893=>String(_0x40d893));break;case _0x5acfe5(0x1e6):_0x1cda38=_0x37b93c[_0x5d9ae4]!==''?JSON[_0x5acfe5(0x172)](_0x37b93c[_0x5d9ae4]):{},_0x49285c=VisuMZ['ConvertParams']({},_0x1cda38);break;case _0x5acfe5(0x131):_0x6af5c=_0x37b93c[_0x5d9ae4]!==''?JSON[_0x5acfe5(0x172)](_0x37b93c[_0x5d9ae4]):[],_0x49285c=_0x6af5c[_0x5acfe5(0x19f)](_0x5f4399=>VisuMZ[_0x5acfe5(0x181)]({},JSON['parse'](_0x5f4399)));break;default:continue;}_0x32d749[_0x894898]=_0x49285c;}else return![];}}return _0x32d749;},(_0x15379d=>{const _0x1d2fb2=_0x1e170f,_0x5e996b=_0x15379d['name'];for(const _0x1ac64f of dependencies){if(!Imported[_0x1ac64f]){alert(_0x1d2fb2(0x1d4)['format'](_0x5e996b,_0x1ac64f)),SceneManager[_0x1d2fb2(0x141)]();break;}}const _0x394edd=_0x15379d[_0x1d2fb2(0x136)];if(_0x394edd['match'](/\[Version[ ](.*?)\]/i)){const _0x3aa23a=Number(RegExp['$1']);_0x3aa23a!==VisuMZ[label][_0x1d2fb2(0x1d9)]&&(_0x1d2fb2(0x14e)===_0x1d2fb2(0x14e)?(alert(_0x1d2fb2(0x1e3)[_0x1d2fb2(0x149)](_0x5e996b,_0x3aa23a)),SceneManager['exit']()):this['x']=_0xde4479[_0x1d2fb2(0x127)](_0x2cd7a6['width']/-0x2));}if(_0x394edd['match'](/\[Tier[ ](\d+)\]/i)){const _0x4df49f=Number(RegExp['$1']);if(_0x4df49f<tier){if(_0x1d2fb2(0x134)!==_0x1d2fb2(0x18d))alert(_0x1d2fb2(0x194)[_0x1d2fb2(0x149)](_0x5e996b,_0x4df49f,tier)),SceneManager[_0x1d2fb2(0x141)]();else{if(!_0x47ea28[_0x1d2fb2(0x121)]()){const _0x9742e9=_0x1cda26[_0x1d2fb2(0x1f9)]['RegExp'];this[_0x1d2fb2(0x10a)]()[_0x1d2fb2(0x197)]['match'](_0x9742e9['SetBreakShield'])&&(_0x263d64[_0x1d2fb2(0x1a1)](_0x3d4b2b(_0x2b3d61['$1'])),_0x19debb['_needRefreshAllEnemyWeaknessWindows']=!![]),this[_0x1d2fb2(0x10a)]()[_0x1d2fb2(0x197)][_0x1d2fb2(0x163)](_0x9742e9[_0x1d2fb2(0xfb)])&&(_0x15f778[_0x1d2fb2(0xf7)](_0x599076(_0x12f975['$1'])),_0x59ccb4[_0x1d2fb2(0x142)]=!![]);}}}else _0x1d2fb2(0x106)!=='xNVmW'?(this[_0x1d2fb2(0x1e2)]!==_0x492560&&(this[_0x1d2fb2(0x1e2)]=_0x19300b),this[_0x1d2fb2(0x17a)]=_0x3256f4):tier=Math[_0x1d2fb2(0xff)](_0x4df49f,tier);}VisuMZ[_0x1d2fb2(0x181)](VisuMZ[label][_0x1d2fb2(0x1e4)],_0x15379d[_0x1d2fb2(0x111)]);})(pluginData),VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0xeb)]={'BreakReduce':/<BREAK (?:REDUCE|REDUCTION):[ ](\d+)>/i,'SetBreakShield':/<(?:SET|CHANGE) BREAK (?:SHIELD|SHIELDS): (\d+)>/i,'AlterBreakShield':/<(?:INCREASE|DECREASE|ALTER) BREAK (?:SHIELD|SHIELDS): ([\+\-]\d+)>/i,'ProtectedElements':/<PROTECT (?:ELEMENT|ELEMENTS):[ ](.*)>/i,'AddedBreakShields':/<BREAK (?:SHIELD|SHIELDS): ([\+\-]\d+)>/i,'BaseBreakShields':/<BREAK (?:SHIELD|SHIELDS): (\d+)>/i},DataManager[_0x1e170f(0x1c3)]=function(_0x2aaebc){const _0xa2f6c0=_0x1e170f;_0x2aaebc=_0x2aaebc[_0xa2f6c0(0x1c1)]()[_0xa2f6c0(0x12f)](),this['_elementIDs']=this['_elementIDs']||{};if(this['_elementIDs'][_0x2aaebc])return this['_elementIDs'][_0x2aaebc];let _0x481270=0x1;for(const _0x2c2fd5 of $dataSystem[_0xa2f6c0(0x1c5)]){if(_0xa2f6c0(0xfc)===_0xa2f6c0(0x1a6))this['drawItemStatusBreakBattleCore'](_0x3ce2df);else{if(!_0x2c2fd5)continue;let _0x423d7f=_0x2c2fd5[_0xa2f6c0(0x1c1)]();_0x423d7f=_0x423d7f[_0xa2f6c0(0x179)](/\x1I\[(\d+)\]/gi,''),_0x423d7f=_0x423d7f['replace'](/\\I\[(\d+)\]/gi,''),this[_0xa2f6c0(0x166)][_0x423d7f]=_0x481270,_0x481270++;}}return this[_0xa2f6c0(0x166)][_0x2aaebc]||0x0;},ImageManager[_0x1e170f(0x1b3)]=VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x1e4)]['UI'][_0x1e170f(0x10d)],ImageManager[_0x1e170f(0x1be)]=VisuMZ['BreakShields'][_0x1e170f(0x1e4)]['UI'][_0x1e170f(0x137)],ImageManager[_0x1e170f(0x1af)]=VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x1e4)]['UI']['ShowStunTurns'],ImageManager[_0x1e170f(0x17f)]=VisuMZ['BreakShields'][_0x1e170f(0x1e4)]['UI'][_0x1e170f(0x132)],SceneManager[_0x1e170f(0x1a5)]=function(){const _0x3e60aa=_0x1e170f;return this[_0x3e60aa(0x1cc)]&&this[_0x3e60aa(0x1cc)][_0x3e60aa(0x1ec)]===Scene_Battle;},VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x152)]=BattleManager['setup'],BattleManager[_0x1e170f(0x174)]=function(_0x38316b,_0x1427a7,_0x44ccf4){const _0x4a8811=_0x1e170f;VisuMZ[_0x4a8811(0x1f9)]['BattleManager_setup'][_0x4a8811(0x13f)](this,_0x38316b,_0x1427a7,_0x44ccf4),$gameParty[_0x4a8811(0x1a0)](),$gameTroop[_0x4a8811(0x1a0)]();},Game_Action[_0x1e170f(0x184)]=VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x1e4)][_0x1e170f(0x104)][_0x1e170f(0x125)],Game_Action[_0x1e170f(0x156)]=VisuMZ[_0x1e170f(0x1f9)]['Settings']['Mechanics']['Reduction'],VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x1c8)]=Game_Action[_0x1e170f(0x188)][_0x1e170f(0x1c0)],Game_Action['prototype'][_0x1e170f(0x1c0)]=function(_0x1b9940,_0x44bd82){const _0x4eeb52=_0x1e170f;VisuMZ[_0x4eeb52(0x1f9)][_0x4eeb52(0x1c8)]['call'](this,_0x1b9940,_0x44bd82),!!_0x1b9940&&_0x44bd82>0x0&&_0x1b9940[_0x4eeb52(0x14c)]()&&this[_0x4eeb52(0x1a4)]()&&(_0x4eeb52(0x139)!==_0x4eeb52(0x177)?this['executeBreakShieldReduction'](_0x1b9940,_0x44bd82):this['createBreakShieldIconSprite']());},Game_Action[_0x1e170f(0x188)]['executeBreakShieldReduction']=function(_0x24aadd,_0x382c31){const _0x1f3a19=_0x1e170f;if(!_0x24aadd[_0x1f3a19(0x121)]()){if(_0x1f3a19(0x122)===_0x1f3a19(0x100))_0x2c08b3[_0x1f3a19(0x1f9)]['Sprite_Actor_initMembers'][_0x1f3a19(0x13f)](this),this[_0x1f3a19(0x165)]()&&this['createBreakShieldIconSprite']();else{var _0x5aed35=this[_0x1f3a19(0x140)](_0x24aadd);if(_0x5aed35>=Game_Action[_0x1f3a19(0x184)]){if(_0x1f3a19(0xf8)==='XIWKU')this[_0x1f3a19(0x130)][_0x1f3a19(0x174)](this[_0x1f3a19(0x1e2)],![]);else{var _0x382c31=-0x1*this[_0x1f3a19(0x1d8)]();_0x24aadd[_0x1f3a19(0x144)](),_0x24aadd[_0x1f3a19(0xf7)](_0x382c31);}}}}},Game_Action[_0x1e170f(0x188)]['itemBreakShieldReduction']=function(){const _0x100325=_0x1e170f,_0x54804f=VisuMZ[_0x100325(0x1f9)][_0x100325(0xeb)];return this['item']()[_0x100325(0x197)][_0x100325(0x163)](_0x54804f['BreakReduce'])?parseInt(RegExp['$1']):Game_Action[_0x100325(0x156)];},VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x198)]=Game_Action[_0x1e170f(0x188)][_0x1e170f(0x199)],Game_Action[_0x1e170f(0x188)]['applyItemUserEffect']=function(_0x7054e7){const _0x4126d2=_0x1e170f;VisuMZ[_0x4126d2(0x1f9)][_0x4126d2(0x198)][_0x4126d2(0x13f)](this,_0x7054e7),!!_0x7054e7&&_0x7054e7[_0x4126d2(0x14c)]()&&this[_0x4126d2(0x1b2)](_0x7054e7);},Game_Action[_0x1e170f(0x188)][_0x1e170f(0x1b2)]=function(_0x2e96f7){const _0x17dfcd=_0x1e170f;if(!_0x2e96f7[_0x17dfcd(0x121)]()){const _0xe5673b=VisuMZ[_0x17dfcd(0x1f9)]['RegExp'];this[_0x17dfcd(0x10a)]()['note']['match'](_0xe5673b[_0x17dfcd(0x1a9)])&&(_0x2e96f7['setBreakShield'](parseInt(RegExp['$1'])),$gameTemp[_0x17dfcd(0x142)]=!![]),this[_0x17dfcd(0x10a)]()[_0x17dfcd(0x197)][_0x17dfcd(0x163)](_0xe5673b['AlterBreakShield'])&&('VeTIC'===_0x17dfcd(0x103)?_0x490391&&_0x100aa9[_0x17dfcd(0x148)]():(_0x2e96f7[_0x17dfcd(0xf7)](parseInt(RegExp['$1'])),$gameTemp[_0x17dfcd(0x142)]=!![]));}},VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x14d)]=Game_BattlerBase[_0x1e170f(0x188)][_0x1e170f(0x18f)],Game_BattlerBase['prototype'][_0x1e170f(0x18f)]=function(_0x55159e){const _0x4dacdc=_0x1e170f;var _0x3700fa=VisuMZ[_0x4dacdc(0x1f9)][_0x4dacdc(0x14d)][_0x4dacdc(0x13f)](this,_0x55159e);if(this[_0x4dacdc(0x1b6)]()[_0x4dacdc(0x13a)](_0x55159e)){if(_0x4dacdc(0x1ba)==='jeCGe'){const _0x3245b4=_0x84e182(_0x2bbd4d['$1']);_0x3245b4!==_0x5c776e[_0x1655e1][_0x4dacdc(0x1d9)]&&(_0x1a2ae6(_0x4dacdc(0x1e3)[_0x4dacdc(0x149)](_0x46762c,_0x3245b4)),_0x948590['exit']());}else return Math[_0x4dacdc(0x118)](0x1,_0x3700fa);}else return _0x3700fa;},Game_BattlerBase[_0x1e170f(0x188)]['originalElementRate']=function(_0x177418){const _0x10891f=_0x1e170f;return VisuMZ[_0x10891f(0x1f9)]['Game_BattlerBase_elementRate'][_0x10891f(0x13f)](this,_0x177418);},Game_Battler['BREAK_SHIELDS_BASE']=VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x1e4)]['Mechanics']['Base'],Game_Battler['BREAK_SHIELDS_MAX']=VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x1e4)]['Mechanics'][_0x1e170f(0x18c)],Game_Battler['BREAK_SHIELDS_STUN_STATE']=VisuMZ['BreakShields']['Settings'][_0x1e170f(0x104)][_0x1e170f(0x180)],Game_Battler['BREAK_SHIELDS_REDUCE_ANIMATION']=VisuMZ['BreakShields'][_0x1e170f(0x1e4)][_0x1e170f(0x104)]['ReduceAniID'],Game_Battler[_0x1e170f(0x193)]=VisuMZ[_0x1e170f(0x1f9)]['Settings'][_0x1e170f(0x104)]['StunAniID'],Game_Battler[_0x1e170f(0x128)]=VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x1e4)]['Mechanics'][_0x1e170f(0x191)],Game_Battler[_0x1e170f(0x158)]=VisuMZ[_0x1e170f(0x1f9)]['Settings'][_0x1e170f(0x104)]['AffectEnemies'],VisuMZ['BreakShields'][_0x1e170f(0x1fc)]=Game_Battler[_0x1e170f(0x188)][_0x1e170f(0x169)],Game_Battler[_0x1e170f(0x188)]['removeBattleStates']=function(){const _0x540ebd=_0x1e170f;VisuMZ['BreakShields']['Game_Battler_removeBattleStates'][_0x540ebd(0x13f)](this),this['resetBreakShield']();},Game_Battler[_0x1e170f(0x188)][_0x1e170f(0x14c)]=function(){return![];},Game_Battler['prototype'][_0x1e170f(0x148)]=function(){const _0x1caff9=_0x1e170f;this[_0x1caff9(0x14c)]()&&this[_0x1caff9(0x1a1)](this[_0x1caff9(0x1ce)]());},Game_Battler[_0x1e170f(0x188)][_0x1e170f(0x159)]=function(){const _0x1235d2=_0x1e170f;return Game_Battler[_0x1235d2(0x150)];},Game_Battler['prototype'][_0x1e170f(0x1ce)]=function(){const _0x2925f5=_0x1e170f;var _0x27325d=this[_0x2925f5(0x159)]();return _0x27325d=this[_0x2925f5(0x1a7)](_0x27325d),_0x27325d[_0x2925f5(0x1f0)](0x1,Game_Battler[_0x2925f5(0x101)]);},Game_Battler['prototype'][_0x1e170f(0x1a7)]=function(_0x309dfa){const _0x202247=_0x1e170f,_0x6d09ae=VisuMZ[_0x202247(0x1f9)][_0x202247(0xeb)];for(const _0x243c97 of this[_0x202247(0x1da)]()){if(_0x202247(0x1b8)==='GfFxG')return _0x243062[_0x202247(0x1f9)][_0x202247(0x14d)][_0x202247(0x13f)](this,_0x1874f1);else{if(!_0x243c97)continue;_0x243c97[_0x202247(0x197)][_0x202247(0x163)](_0x6d09ae[_0x202247(0x18a)])&&(_0x309dfa+=Number(RegExp['$1'])||0x0);}}return _0x309dfa;},Game_Battler[_0x1e170f(0x188)][_0x1e170f(0x11a)]=function(){const _0x5f1fe7=_0x1e170f;return this[_0x5f1fe7(0xfa)]===undefined&&this['setBreakShield'](this[_0x5f1fe7(0x1ce)]()),this['_currentBreakShield'];},Game_Battler[_0x1e170f(0x188)][_0x1e170f(0x1a1)]=function(_0x536c3f){const _0x5e10b3=_0x1e170f;this[_0x5e10b3(0x14c)]()&&(this[_0x5e10b3(0xfa)]=Math[_0x5e10b3(0x1ab)](_0x536c3f),this[_0x5e10b3(0xfa)]=this[_0x5e10b3(0xfa)]['clamp'](0x0,Game_Battler['BREAK_SHIELDS_MAX']),this[_0x5e10b3(0xfa)]<=0x0&&this[_0x5e10b3(0x164)](),this[_0x5e10b3(0x16d)]());},Game_Battler[_0x1e170f(0x188)][_0x1e170f(0xf7)]=function(_0x1c460d){const _0x49d7fd=_0x1e170f;this['setBreakShield'](this[_0x49d7fd(0x11a)]()+_0x1c460d);},Game_Battler['prototype'][_0x1e170f(0x164)]=function(){const _0x175d60=_0x1e170f;this['setBreakShield'](this[_0x175d60(0x1ce)]());var _0x13eb2c=Game_Battler[_0x175d60(0x15c)];this[_0x175d60(0x1f6)](_0x13eb2c),this[_0x175d60(0xfd)]();},Game_Battler[_0x1e170f(0x188)][_0x1e170f(0x121)]=function(){const _0x3bf940=_0x1e170f;return this[_0x3bf940(0x13b)](Game_Battler['BREAK_SHIELDS_STUN_STATE']);},Game_Battler[_0x1e170f(0x188)][_0x1e170f(0x144)]=function(){const _0x263f53=_0x1e170f;if(Imported[_0x263f53(0x1ee)]&&Game_Battler[_0x263f53(0x19b)]){var _0x22e589=Game_Battler[_0x263f53(0x19b)];$gameTemp[_0x263f53(0x1b9)]([this],_0x22e589,![],![]);}},Game_Battler['prototype']['startBreakShieldBrokenAnimation']=function(){const _0x5e0427=_0x1e170f;if(Imported['VisuMZ_0_CoreEngine']&&Game_Battler[_0x5e0427(0x193)]){if(_0x5e0427(0x1f3)!==_0x5e0427(0x1c6)){var _0x4e6fd2=Game_Battler['BREAK_SHIELDS_STUN_ANIMATION'];$gameTemp[_0x5e0427(0x1b9)]([this],_0x4e6fd2,![],![]);}else return this['_scene']&&this['_scene'][_0x5e0427(0x1ec)]===_0x798298;}},Game_Battler[_0x1e170f(0x188)][_0x1e170f(0x1b6)]=function(){const _0x4c2987=_0x1e170f,_0x13a4c6=VisuMZ[_0x4c2987(0x1f9)][_0x4c2987(0xeb)];let _0x4a4bf9=[];for(const _0xa5cca8 of this[_0x4c2987(0x1da)]()){if('qkafr'===_0x4c2987(0x1f8)){if(!_0xa5cca8)continue;if(_0xa5cca8[_0x4c2987(0x197)][_0x4c2987(0x163)](_0x13a4c6[_0x4c2987(0x151)])){const _0x4b2aae=RegExp['$1'][_0x4c2987(0x138)](',')[_0x4c2987(0x19f)](_0x10f901=>_0x10f901['trim']());for(const _0x52537a of _0x4b2aae){if(_0x4c2987(0x167)===_0x4c2987(0x195))_0x3f463c=_0x1492c8['x']+_0x34c38a['width']-_0xe51d01['iconWidth'];else{const _0x1b227a=/^\d+$/[_0x4c2987(0x1e8)](_0x52537a);if(_0x1b227a)_0x4a4bf9[_0x4c2987(0x11f)](Number(_0x52537a));else{const _0x266e06=DataManager[_0x4c2987(0x1c3)](_0x52537a);if(_0x266e06)_0x4a4bf9['push'](_0x266e06);}}}}}else _0x5e8dfd=_0x4a0d79(_0x3664ab['$1']);}return _0x4a4bf9['sort'](function(_0x47d556,_0x53f860){return _0x47d556-_0x53f860;}),_0x4a4bf9;},Game_Actor[_0x1e170f(0x188)][_0x1e170f(0x14c)]=function(){const _0x422c5d=_0x1e170f;if(Imported[_0x422c5d(0x10e)]&&BattleManager['isSTB']()&&BattleManager['isSTBExploitSystemEnabled']()){if('KDvDM'!==_0x422c5d(0x1bd))return this[_0x422c5d(0xf2)]()?!![]:![];else{const _0x296a5c=_0x4dcc0b[_0x422c5d(0x1fe)],_0x394c07=_0x216d79[_0x422c5d(0x1cd)],_0x32534d=this[_0x422c5d(0x1eb)]%0x10*_0x296a5c,_0x520adc=_0x239264[_0x422c5d(0x127)](this[_0x422c5d(0x1eb)]/0x10)*_0x394c07;this['setFrame'](_0x32534d,_0x520adc,_0x296a5c,_0x394c07);}}return Game_Battler['BREAK_SHIELDS_ACTORS'];},Game_Actor['prototype'][_0x1e170f(0x159)]=function(){const _0x11be1=_0x1e170f,_0x3affa6=VisuMZ[_0x11be1(0x1f9)][_0x11be1(0xeb)];let _0x49c1d5=Game_Battler['prototype'][_0x11be1(0x159)]['call'](this);if(!!this[_0x11be1(0x1a3)]()&&this[_0x11be1(0x1a3)]()['note']['match'](_0x3affa6[_0x11be1(0x19a)]))_0x11be1(0x1d0)==='jeURd'?this[_0x11be1(0x196)]='':_0x49c1d5=parseInt(RegExp['$1']);else{if(this['actor']()&&this['actor']()[_0x11be1(0x197)][_0x11be1(0x163)](_0x3affa6[_0x11be1(0x19a)])){if(_0x11be1(0x1ac)!==_0x11be1(0x1ac)){var _0x38a514=_0x911c05[_0x11be1(0x19b)];_0x41df86[_0x11be1(0x1b9)]([this],_0x38a514,![],![]);}else _0x49c1d5=parseInt(RegExp['$1']);}}return Math['max'](0x1,_0x49c1d5);},VisuMZ[_0x1e170f(0x1f9)]['Game_Actor_refresh']=Game_Actor[_0x1e170f(0x188)]['refresh'],Game_Actor[_0x1e170f(0x188)][_0x1e170f(0x16d)]=function(){const _0x1abf0e=_0x1e170f;VisuMZ['BreakShields'][_0x1abf0e(0x19e)][_0x1abf0e(0x13f)](this),!$gameParty[_0x1abf0e(0x113)]()&&!this[_0x1abf0e(0xf6)]&&(this[_0x1abf0e(0xf6)]=!![],this['resetBreakShield'](),this[_0x1abf0e(0xf6)]=undefined);},Game_Enemy[_0x1e170f(0x188)][_0x1e170f(0x14c)]=function(){const _0x3fdec1=_0x1e170f;if(Imported[_0x3fdec1(0x10e)]&&BattleManager[_0x3fdec1(0x147)]()&&BattleManager[_0x3fdec1(0x202)]())return this['stbCannotBeExploited']()?!![]:![];return Game_Battler[_0x3fdec1(0x158)];},Game_Enemy[_0x1e170f(0x188)][_0x1e170f(0x159)]=function(){const _0x5984bc=_0x1e170f,_0x5911f6=VisuMZ['BreakShields'][_0x5984bc(0xeb)];let _0x36a0aa=Game_Battler['prototype'][_0x5984bc(0x159)]['call'](this);return this['enemy']()&&this['enemy']()[_0x5984bc(0x197)][_0x5984bc(0x163)](_0x5911f6[_0x5984bc(0x19a)])&&(_0x36a0aa=parseInt(RegExp['$1'])),Math[_0x5984bc(0xff)](0x1,_0x36a0aa);},Game_Unit['prototype'][_0x1e170f(0x1a0)]=function(){const _0x56ed8c=_0x1e170f;var _0x254797=this['_inBattle'];this[_0x56ed8c(0x117)]=![];for(const _0x397e6f of this[_0x56ed8c(0x168)]()){_0x397e6f&&_0x397e6f[_0x56ed8c(0x148)]();}this[_0x56ed8c(0x117)]=_0x254797;},Sprite_Battler[_0x1e170f(0x188)][_0x1e170f(0x18e)]=function(){const _0x49fd1c=_0x1e170f;this['_breakShieldSprite']=new Sprite_BreakShieldIcon(),this[_0x49fd1c(0x170)](this[_0x49fd1c(0x130)]);},Sprite_Actor[_0x1e170f(0x1b5)]=VisuMZ['BreakShields'][_0x1e170f(0x1e4)]['UI'][_0x1e170f(0x124)],Sprite_Actor[_0x1e170f(0x1f2)]=VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x1e4)]['UI'][_0x1e170f(0x110)],Sprite_Actor[_0x1e170f(0x183)]=VisuMZ[_0x1e170f(0x1f9)]['Settings']['UI'][_0x1e170f(0x12a)],Sprite_Actor[_0x1e170f(0x13c)]=VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x1e4)]['UI']['ActorOffsetY'],VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x187)]=Sprite_Actor[_0x1e170f(0x188)][_0x1e170f(0x17b)],Sprite_Actor[_0x1e170f(0x188)][_0x1e170f(0x17b)]=function(){const _0x37aa0c=_0x1e170f;VisuMZ['BreakShields'][_0x37aa0c(0x187)][_0x37aa0c(0x13f)](this),this[_0x37aa0c(0x165)]()&&('SktJD'===_0x37aa0c(0x1a2)?this[_0x37aa0c(0x18e)]():this[_0x37aa0c(0x143)](_0x17d2ca));},Sprite_Actor[_0x1e170f(0x188)][_0x1e170f(0x165)]=function(){const _0x559a10=_0x1e170f;return Sprite_Actor[_0x559a10(0x1b5)]&&this['constructor']===Sprite_Actor;},VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x1bc)]=Sprite_Actor[_0x1e170f(0x188)][_0x1e170f(0x14a)],Sprite_Actor[_0x1e170f(0x188)][_0x1e170f(0x14a)]=function(_0x54b6c6){const _0x234505=_0x1e170f;VisuMZ['BreakShields'][_0x234505(0x1bc)]['call'](this,_0x54b6c6);if(this[_0x234505(0x130)]){if(_0x234505(0x1fd)!==_0x234505(0x1fd)){if(!_0x5868b3)return![];if(!_0x84d786[_0x234505(0x105)])return![];if(_0x26d7a1['isActor']())return _0x8f9e2b[_0x234505(0x128)];else return _0x212408[_0x234505(0x154)]()?_0x2c3d87[_0x234505(0x158)]:!![];}else this[_0x234505(0x130)]['setup'](this[_0x234505(0x1ff)],!![]);}},Sprite_Enemy[_0x1e170f(0x1b5)]=VisuMZ[_0x1e170f(0x1f9)]['Settings']['UI'][_0x1e170f(0x190)],Sprite_Enemy[_0x1e170f(0x1f2)]=VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x1e4)]['UI']['EnemyDisplayPosition'],Sprite_Enemy[_0x1e170f(0x183)]=VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x1e4)]['UI'][_0x1e170f(0x12c)],Sprite_Enemy[_0x1e170f(0x13c)]=VisuMZ['BreakShields'][_0x1e170f(0x1e4)]['UI'][_0x1e170f(0x1db)],Sprite_Enemy[_0x1e170f(0x1f1)]=VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x1e4)]['UI'][_0x1e170f(0x15b)],Sprite_Enemy[_0x1e170f(0x1df)]=VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x1e4)]['UI'][_0x1e170f(0x1fb)],Sprite_Enemy[_0x1e170f(0x14b)]=VisuMZ[_0x1e170f(0x1f9)]['Settings']['UI']['AttachShieldOffsetY'],VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x116)]=Sprite_Enemy[_0x1e170f(0x188)][_0x1e170f(0x17b)],Sprite_Enemy[_0x1e170f(0x188)]['initMembers']=function(){const _0x1f3c68=_0x1e170f;VisuMZ['BreakShields'][_0x1f3c68(0x116)][_0x1f3c68(0x13f)](this);if(this['isBreakShieldIconDisplayed']()){if(_0x1f3c68(0x1aa)!==_0x1f3c68(0x1aa)){const _0x42e676=_0x479a86[_0x1f3c68(0x1f9)]['RegExp'];let _0x5ed409=_0x46241d['prototype'][_0x1f3c68(0x159)][_0x1f3c68(0x13f)](this);return this[_0x1f3c68(0x1e9)]()&&this[_0x1f3c68(0x1e9)]()[_0x1f3c68(0x197)][_0x1f3c68(0x163)](_0x42e676[_0x1f3c68(0x19a)])&&(_0x5ed409=_0xab217e(_0xa0d8a1['$1'])),_0x1b1596[_0x1f3c68(0xff)](0x1,_0x5ed409);}else this['createBreakShieldIconSprite']();}},Sprite_Enemy[_0x1e170f(0x188)]['isBreakShieldIconDisplayed']=function(){const _0xa0edca=_0x1e170f;if(Imported['VisuMZ_1_BattleCore']&&Sprite_Enemy['BREAK_SHIELD_BATTLER_ATTACH_ICON_NAME']){if(_0xa0edca(0x13d)===_0xa0edca(0x18b))_0x38668a[_0xa0edca(0x1a1)](_0x5c4931(_0x9135b4['$1'])),_0x3a6127['_needRefreshAllEnemyWeaknessWindows']=!![];else return![];}else return Sprite_Enemy[_0xa0edca(0x1b5)];},VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x1ea)]=Sprite_Enemy[_0x1e170f(0x188)][_0x1e170f(0x14a)],Sprite_Enemy['prototype']['setBattler']=function(_0x272b96){const _0x8988ba=_0x1e170f;VisuMZ[_0x8988ba(0x1f9)][_0x8988ba(0x1ea)][_0x8988ba(0x13f)](this,_0x272b96),this[_0x8988ba(0x130)]&&(_0x8988ba(0x19d)===_0x8988ba(0x119)?(this[_0x8988ba(0x130)]=new _0x3dd2c6(),this[_0x8988ba(0x170)](this[_0x8988ba(0x130)])):this[_0x8988ba(0x130)][_0x8988ba(0x174)](this[_0x8988ba(0x1ca)],!![]));};function Sprite_BreakShieldIcon(){this['initialize'](...arguments);}Sprite_BreakShieldIcon[_0x1e170f(0x188)]=Object[_0x1e170f(0x17e)](Sprite[_0x1e170f(0x188)]),Sprite_BreakShieldIcon[_0x1e170f(0x188)][_0x1e170f(0x1ec)]=Sprite_BreakShieldIcon,Sprite_BreakShieldIcon[_0x1e170f(0x188)][_0x1e170f(0x15d)]=function(){const _0x4219de=_0x1e170f;Sprite['prototype'][_0x4219de(0x15d)][_0x4219de(0x13f)](this),this['initMembers'](),this[_0x4219de(0x171)](),this[_0x4219de(0x120)]();},Sprite_BreakShieldIcon[_0x1e170f(0x188)][_0x1e170f(0x17b)]=function(){const _0x1ce99d=_0x1e170f;this[_0x1ce99d(0x1e2)]=null,this['_autoPositioning']=![],this[_0x1ce99d(0x1eb)]=0x0,this[_0x1ce99d(0x196)]='',this[_0x1ce99d(0xf0)]='',this['anchor']['x']=0.5,this[_0x1ce99d(0x1de)]['y']=0.5;},Sprite_BreakShieldIcon[_0x1e170f(0x188)]['loadBitmap']=function(){const _0x44b0e4=_0x1e170f;this[_0x44b0e4(0x11c)]=ImageManager[_0x44b0e4(0x115)](_0x44b0e4(0x107)),this[_0x44b0e4(0x161)](0x0,0x0,0x0,0x0);},Sprite_BreakShieldIcon[_0x1e170f(0x188)]['createNumberDisplay']=function(){const _0x3ad5d3=_0x1e170f;this['_numberSprite']=new Sprite(),this[_0x3ad5d3(0x201)][_0x3ad5d3(0x11c)]=new Bitmap(ImageManager[_0x3ad5d3(0x1fe)],ImageManager[_0x3ad5d3(0x1cd)]),this['_numberSprite'][_0x3ad5d3(0x1de)]['x']=0.5,this['_numberSprite'][_0x3ad5d3(0x1de)]['y']=0.5,this[_0x3ad5d3(0x170)](this[_0x3ad5d3(0x201)]);},Sprite_BreakShieldIcon[_0x1e170f(0x188)]['setup']=function(_0x52dc88,_0x57e6a3){const _0x1b17cf=_0x1e170f;this['_battler']!==_0x52dc88&&(_0x1b17cf(0x1bf)===_0x1b17cf(0x1bf)?this['_battler']=_0x52dc88:this['applyBreakStun']()),this[_0x1b17cf(0x17a)]=_0x57e6a3;},Sprite_BreakShieldIcon['prototype'][_0x1e170f(0x1cb)]=function(){const _0x6aafdb=_0x1e170f;Sprite[_0x6aafdb(0x188)]['update'][_0x6aafdb(0x13f)](this),this[_0x6aafdb(0x11e)]()?(this[_0x6aafdb(0xee)]=0xff,this['updateIcon'](),this[_0x6aafdb(0x1a8)](),this[_0x6aafdb(0x1dd)](),this[_0x6aafdb(0x1b0)]()):_0x6aafdb(0x129)==='pfHXO'?this[_0x6aafdb(0xee)]=0x0:(_0x22e282(_0x6aafdb(0x1e3)[_0x6aafdb(0x149)](_0x34ff17,_0x2bdd7f)),_0x34e2cc['exit']());},Sprite_BreakShieldIcon[_0x1e170f(0x188)][_0x1e170f(0x11e)]=function(){const _0x2b4698=_0x1e170f;return this[_0x2b4698(0x1e2)]&&this[_0x2b4698(0x1e2)][_0x2b4698(0x135)]()&&this[_0x2b4698(0x1e2)][_0x2b4698(0x14c)]();},Sprite_BreakShieldIcon[_0x1e170f(0x188)][_0x1e170f(0x126)]=function(){const _0x3ba2b6=_0x1e170f;if(this[_0x3ba2b6(0x1e2)]['isDead']()){const _0x3bf2dd=$dataStates[this[_0x3ba2b6(0x1e2)][_0x3ba2b6(0x1c2)]()];_0x3bf2dd&&_0x3bf2dd['iconIndex']>0x0?_0x3ba2b6(0xf1)!==_0x3ba2b6(0xf1)?(_0x359022=_0x2ff0d5+_0x10dea3-0x4,_0x2178e2=_0x1e9d04-_0x23c3f6):this['_iconIndex']=_0x3bf2dd[_0x3ba2b6(0xed)]:this[_0x3ba2b6(0x1eb)]=0x0,this['_numberValue']='';}else{if(this['_battler'][_0x3ba2b6(0x121)]()){const _0x4dd6a3=$dataStates[Game_Battler[_0x3ba2b6(0x15c)]];_0x4dd6a3&&_0x4dd6a3[_0x3ba2b6(0xed)]>0x0?_0x3ba2b6(0x1f5)==='Bjrqg'?(this[_0x3ba2b6(0x11c)]=_0x4a03dd[_0x3ba2b6(0x115)](_0x3ba2b6(0x107)),this[_0x3ba2b6(0x161)](0x0,0x0,0x0,0x0)):this['_iconIndex']=_0x4dd6a3[_0x3ba2b6(0xed)]:'ITWlf'!==_0x3ba2b6(0x1ad)?this[_0x3ba2b6(0x1eb)]=ImageManager[_0x3ba2b6(0x1be)]:(_0x4ff123['BreakShields'][_0x3ba2b6(0x1bc)][_0x3ba2b6(0x13f)](this,_0x766cd2),this[_0x3ba2b6(0x130)]&&this[_0x3ba2b6(0x130)][_0x3ba2b6(0x174)](this[_0x3ba2b6(0x1ff)],!![]));if(ImageManager[_0x3ba2b6(0x1af)]){if(_0x3ba2b6(0x112)!==_0x3ba2b6(0x112))this[_0x3ba2b6(0x14c)]()&&(this['_currentBreakShield']=_0x3b0d7c['ceil'](_0x404412),this[_0x3ba2b6(0xfa)]=this[_0x3ba2b6(0xfa)][_0x3ba2b6(0x1f0)](0x0,_0x46a667[_0x3ba2b6(0x101)]),this[_0x3ba2b6(0xfa)]<=0x0&&this[_0x3ba2b6(0x164)](),this[_0x3ba2b6(0x16d)]());else{this['_numberValue']=this[_0x3ba2b6(0x1e2)]['_stateTurns'][_0x4dd6a3['id']]||0x0;if(this[_0x3ba2b6(0x196)]<=0x0)this[_0x3ba2b6(0x196)]='';}}else this[_0x3ba2b6(0x196)]='';}else this[_0x3ba2b6(0x1eb)]=ImageManager[_0x3ba2b6(0x1b3)],this[_0x3ba2b6(0x196)]=this['_battler'][_0x3ba2b6(0x11a)]();}},Sprite_BreakShieldIcon[_0x1e170f(0x188)]['updateFrame']=function(){const _0x2cd0fa=_0x1e170f,_0x26113c=ImageManager['iconWidth'],_0x4c6371=ImageManager[_0x2cd0fa(0x1cd)],_0x37e4a9=this['_iconIndex']%0x10*_0x26113c,_0x1973fe=Math[_0x2cd0fa(0x127)](this[_0x2cd0fa(0x1eb)]/0x10)*_0x4c6371;this[_0x2cd0fa(0x161)](_0x37e4a9,_0x1973fe,_0x26113c,_0x4c6371);},Sprite_BreakShieldIcon['prototype'][_0x1e170f(0x1dd)]=function(){const _0x346216=_0x1e170f;if(this['_displayValue']===this[_0x346216(0x196)])return;this[_0x346216(0xf0)]=this[_0x346216(0x196)];const _0x27d34b=this['_numberSprite'][_0x346216(0x11c)];_0x27d34b[_0x346216(0x146)]=$gameSystem[_0x346216(0x109)](),_0x27d34b[_0x346216(0xf9)]=VisuMZ[_0x346216(0x1f9)][_0x346216(0x1e4)]['UI'][_0x346216(0xfe)],_0x27d34b[_0x346216(0x17d)](),_0x27d34b['drawText'](this[_0x346216(0xf0)],0x0,0x0,_0x27d34b[_0x346216(0x10c)],_0x27d34b[_0x346216(0x13e)],_0x346216(0x178));},Sprite_BreakShieldIcon[_0x1e170f(0x188)][_0x1e170f(0x1b0)]=function(){const _0x38ce32=_0x1e170f;if(!this[_0x38ce32(0x17a)])return;if(!SceneManager[_0x38ce32(0x1a5)]())return;if(!SceneManager[_0x38ce32(0x1cc)][_0x38ce32(0x1d1)])return;const _0x785616=SceneManager[_0x38ce32(0x1cc)][_0x38ce32(0x1d1)][_0x38ce32(0x1ae)](this[_0x38ce32(0x1e2)]);if(!_0x785616)return;const _0x3f84e8=this[_0x38ce32(0x1e2)]['isActor']()?Sprite_Actor:Sprite_Enemy,_0xa5626d=_0x3f84e8[_0x38ce32(0x1f2)];this['x']=0x0;if(_0xa5626d[_0x38ce32(0x163)](/left/i))this['x']=Math[_0x38ce32(0x127)](_0x785616[_0x38ce32(0x10c)]/-0x2);else _0xa5626d[_0x38ce32(0x163)](/right/i)&&(this['x']=Math[_0x38ce32(0x1ab)](_0x785616[_0x38ce32(0x10c)]/0x2));this['x']+=_0x3f84e8[_0x38ce32(0x183)],this['y']=0x0;if(_0xa5626d[_0x38ce32(0x163)](/top/i))this['y']=_0x785616[_0x38ce32(0x13e)]*-0x1;else{if(_0xa5626d[_0x38ce32(0x163)](/middle/i)){if('ecBwU'!==_0x38ce32(0x10b))this['y']=Math[_0x38ce32(0x15e)](_0x785616['height']*-0.5);else{const _0x1c130f=this['actor'](_0x596193),_0x409e43=this[_0x38ce32(0x12d)](_0x127b80),_0x1f9b11=_0x74e502['round'](_0x356420[_0x38ce32(0x1fe)]/0x2);let _0x1ce749=_0x409e43['x']+_0x1f9b11-0x4+_0x9d8967[_0x38ce32(0x1e0)],_0x24c833=_0x409e43['y']+_0x1f9b11+0x4+_0x2338a9[_0x38ce32(0x176)];this[_0x38ce32(0x12e)](_0x1c130f,_0x1ce749,_0x24c833);}}}this['y']+=_0x3f84e8[_0x38ce32(0x13c)];};function _0x4974(){const _0x493557=['setBreakShield','SktJD','currentClass','isHpEffect','isSceneBattle','ZGKth','addedBreakShields','updateFrame','SetBreakShield','COjId','ceil','huuyI','Tvtom','findTargetSprite','breakShield_StunTurns','updateAutoPosition','breakShields','applyChangeBreakShield','breakShield_ShieldIcon','drawItemStatusBreakShields','BREAK_SHIELD_BATTLER_DISPLAY_ICON','getProtectedWeaknessElements','1205bcnvwn','FpmXk','requestFauxAnimation','qSQJq','drawActorIcons','Sprite_Actor_setBattler','BcnRI','breakShield_StunIcon','mekrS','executeDamage','toUpperCase','deathStateId','getElementIdWithName','shouldDisplayBreakShields','elements','lmcsq','VisuMZ_1_BattleCore','Game_Action_executeDamage','lineHeight','_enemy','update','_scene','iconHeight','topBreakShield','reduceRedundancy','LAGPK','_spriteset','1196671irinRh','updateBreakShieldIconSprite','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','STR','15536arFWUW','return\x200','itemBreakShieldReduction','version','traitObjects','EnemyOffsetY','textWidth','updateNumber','anchor','BREAK_SHIELD_BATTLER_ATTACH_OFFSET_X','BREAK_SHIELDS_DISPLAY_OFFSET_X','kahXu','_battler','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Settings','nameY','STRUCT','Window_StatusBase_drawActorIcons','test','enemy','Sprite_Enemy_setBattler','_iconIndex','constructor','JgdVy','VisuMZ_0_CoreEngine','border','clamp','BREAK_SHIELD_BATTLER_ATTACH_ICON_NAME','BREAK_SHIELD_BATTLER_DISPLAY_POSITION','DsCry','actor','CCCCE','addState','show','qkafr','BreakShields','isActor','AttachShieldOffsetX','Game_Battler_removeBattleStates','tAMWN','iconWidth','_actor','move','_numberSprite','isSTBExploitSystemEnabled','VisuMZ_4_MultiLayerHpGauge','RegExp','_enemyId','iconIndex','opacity','showMultiLayerHpGauge','_displayValue','wZSQj','stbCannotBeExploited','default','BREAK_SHIELDS_DISPLAY_ICONS','_lineHeight','_resettingBreakShield','alterBreakShield','rCgPW','fontSize','_currentBreakShield','AlterBreakShield','tdYdr','startBreakShieldBrokenAnimation','FontSize','max','JeJHW','BREAK_SHIELDS_MAX','WPsyP','ccfgO','Mechanics','BREAK_SHIELDS_MENU_ICONS','xNVmW','IconSet','BattleStatusOffsetY','numberFontFace','item','spBuz','width','ShieldIcon','VisuMZ_2_BattleSystemSTB','ARRAYFUNC','ActorDisplayPosition','parameters','buOae','inBattle','createAttachedSprites','loadSystem','Sprite_Enemy_initMembers','_inBattle','min','zfxNk','currentBreakShield','Window_BattleStatus_drawItemStatus','bitmap','ARRAYNUM','shouldDisplay','push','createNumberDisplay','isBreakStunned','pladD','BattleStatusAutoPosition','ActorDisplayIcon','MinRate','updateIcon','floor','BREAK_SHIELDS_ACTORS','pfHXO','ActorOffsetX','itemRect','EnemyOffsetX','itemRectWithPadding','placeBreakShieldIcon','trim','_breakShieldSprite','ARRAYSTRUCT','ProtectIcon','SETTINGS','ryJQt','isAppeared','description','StunIcon','split','ZbBPf','contains','isStateAffected','BREAK_SHIELD_BATTLER_DISPLAY_OFFSET_Y','ASumv','height','call','calcElementRate','exit','_needRefreshAllEnemyWeaknessWindows','drawItemStatusBreakShieldsDefault','startBreakShieldReduceAnimation','MultiLayerHpGauge','fontFace','isSTB','resetBreakShield','format','setBattler','BREAK_SHIELD_BATTLER_ATTACH_OFFSET_Y','isAffectedByBreakShield','Game_BattlerBase_elementRate','inTMR','BREAK_SHIELDS_DISPLAY_AUTO','BREAK_SHIELDS_BASE','ProtectedElements','BattleManager_setup','9tJimAl','isEnemy','Sprite_EnemyName_updateAttachedSprites','BREAK_SHIELDS_DEFAULT_REDUCTION','createInnerSprite','BREAK_SHIELDS_ENEMIES','baseBreakShield','834832UKNRFJ','NameAttachShieldIcon','BREAK_SHIELDS_STUN_STATE','initialize','round','filter','472457iihlEl','setFrame','EVAL','match','applyBreakStun','isBreakShieldIconDisplayed','_elementIDs','qUean','members','removeBattleStates','battler','10096uceNvC','ShowFacesListStyle','refresh','3696PYOuDC','Sprite_EnemyName_createAttachedSprites','addChild','loadBitmap','parse','actorId','setup','ARRAYJSON','BREAK_SHIELDS_DISPLAY_OFFSET_Y','STjdv','center','replace','_autoPositioning','initMembers','20naYPKy','clear','create','breakShield_ProtectIcon','StunState','ConvertParams','BattleCore','BREAK_SHIELD_BATTLER_DISPLAY_OFFSET_X','BREAK_SHIELDS_MINIMUM_WEAKNESS_RATE','JrTFv','updateBreakShieldMultiLayerHpGauge','Sprite_Actor_initMembers','prototype','627vQFFGi','AddedBreakShields','DXlAR','Max','FYXCP','createBreakShieldIconSprite','elementRate','EnemyDisplayIcon','AffectActors','updateAttachedSprites','BREAK_SHIELDS_STUN_ANIMATION','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','hFkQq','_numberValue','note','Game_Action_applyItemUserEffect','applyItemUserEffect','BaseBreakShields','BREAK_SHIELDS_REDUCE_ANIMATION','7726807hRdXIi','CstZW','Game_Actor_refresh','map','resetBreakShields'];_0x4974=function(){return _0x493557;};return _0x4974();}Imported['VisuMZ_1_BattleCore']&&Sprite_Enemy[_0x1e170f(0x1f1)]&&(VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x16f)]=Sprite_EnemyName['prototype'][_0x1e170f(0x114)],Sprite_EnemyName[_0x1e170f(0x188)][_0x1e170f(0x114)]=function(){const _0x79ae4f=_0x1e170f;VisuMZ[_0x79ae4f(0x1f9)][_0x79ae4f(0x16f)][_0x79ae4f(0x13f)](this),this[_0x79ae4f(0x130)]=new Sprite_BreakShieldIcon(),this['addChild'](this[_0x79ae4f(0x130)]);},VisuMZ['BreakShields'][_0x1e170f(0x155)]=Sprite_EnemyName[_0x1e170f(0x188)][_0x1e170f(0x192)],Sprite_EnemyName[_0x1e170f(0x188)][_0x1e170f(0x192)]=function(){const _0x299c34=_0x1e170f;VisuMZ['BreakShields'][_0x299c34(0x155)][_0x299c34(0x13f)](this),this['updateBreakShieldIconSprite']();},Sprite_EnemyName[_0x1e170f(0x188)][_0x1e170f(0x1d3)]=function(){const _0x536abb=_0x1e170f;if(!this[_0x536abb(0x130)])return;this[_0x536abb(0x1e2)]!==this[_0x536abb(0x130)][_0x536abb(0x1e2)]&&this[_0x536abb(0x130)]['setup'](this[_0x536abb(0x1e2)],![]);const _0x573393=this[_0x536abb(0x1dc)]();this[_0x536abb(0xf5)]=this['_lineHeight']||Window_Base[_0x536abb(0x188)][_0x536abb(0x1c9)](),this['_breakShieldSprite']['x']=Math[_0x536abb(0x15e)]((_0x573393+ImageManager[_0x536abb(0x1fe)])/-0x2)-0x8,this['_breakShieldSprite']['y']=this[_0x536abb(0xf5)]/0x2,this[_0x536abb(0x130)]['x']+=Sprite_Enemy[_0x536abb(0x1df)]||0x0,this[_0x536abb(0x130)]['y']+=Sprite_Enemy[_0x536abb(0x14b)]||0x0,this[_0x536abb(0x186)]();},Sprite_EnemyName['prototype']['updateBreakShieldMultiLayerHpGauge']=function(){const _0x4104e4=_0x1e170f;if(!Imported[_0x4104e4(0xea)])return;if(!this[_0x4104e4(0x1e2)][_0x4104e4(0xef)]())return;if(!Sprite_MultiLayerHpStates[_0x4104e4(0x133)]['breakShields'])return;const _0x19f652=VisuMZ[_0x4104e4(0x145)]['Compatibility'][_0x4104e4(0x16a)][_0x4104e4(0x1cf)];if(_0x19f652[_0x4104e4(0x1b1)]&&Sprite_MultiLayerHpStates[_0x4104e4(0x133)][_0x4104e4(0x1f7)]){if(_0x4104e4(0x102)!==_0x4104e4(0x185))this[_0x4104e4(0x130)]['y']+=Graphics['height']*0xa;else{if(_0x2c64c2[_0x4104e4(0x10e)]&&_0x11b53c[_0x4104e4(0x147)]()&&_0x15a70[_0x4104e4(0x202)]())return this[_0x4104e4(0xf2)]()?!![]:![];return _0x18338a[_0x4104e4(0x128)];}}});;Window_StatusBase[_0x1e170f(0x105)]=VisuMZ['BreakShields'][_0x1e170f(0x1e4)]['UI']['MenuStatusBreakShieldIcons'],VisuMZ[_0x1e170f(0x1f9)][_0x1e170f(0x1e7)]=Window_StatusBase[_0x1e170f(0x188)][_0x1e170f(0x1bb)],Window_StatusBase['prototype']['drawActorIcons']=function(_0x2ad0be,_0xfe1cb1,_0x22d4f4,_0x3e0128){const _0x1ee743=_0x1e170f;_0x3e0128=_0x3e0128||0x90;if(this['shouldDisplayBreakShields'](_0x2ad0be)){const _0x18fc5e=_0xfe1cb1+Math['round'](ImageManager[_0x1ee743(0x1fe)]/0x2),_0x31f18d=_0x22d4f4+Math[_0x1ee743(0x15e)](ImageManager[_0x1ee743(0x1cd)]/0x2)+0x2;this[_0x1ee743(0x12e)](_0x2ad0be,_0x18fc5e,_0x31f18d),_0xfe1cb1+=ImageManager[_0x1ee743(0x1fe)],_0x3e0128-=ImageManager[_0x1ee743(0x1fe)];}VisuMZ[_0x1ee743(0x1f9)][_0x1ee743(0x1e7)]['call'](this,_0x2ad0be,_0xfe1cb1,_0x22d4f4,_0x3e0128);},Window_StatusBase[_0x1e170f(0x188)][_0x1e170f(0x1c4)]=function(_0x38e673){const _0x13cbd1=_0x1e170f;if(!_0x38e673)return![];if(!Window_StatusBase[_0x13cbd1(0x105)])return![];if(_0x38e673[_0x13cbd1(0x1fa)]())return Game_Battler[_0x13cbd1(0x128)];else return _0x38e673['isEnemy']()?Game_Battler[_0x13cbd1(0x158)]:!![];},Window_StatusBase[_0x1e170f(0x188)][_0x1e170f(0x12e)]=function(_0x624b10,_0x14be07,_0x13cbd7){const _0x5555f0=_0x1e170f,_0x521d61=(_0x624b10[_0x5555f0(0x1fa)]()?_0x624b10[_0x5555f0(0x173)]():enemy[_0x5555f0(0xec)])||0x0,_0x4b8247='actor%1-breakShieldIcon'['format'](_0x521d61),_0x2d58b9=this[_0x5555f0(0x157)](_0x4b8247,Sprite_BreakShieldIcon);_0x2d58b9[_0x5555f0(0x174)](_0x624b10,![]),_0x2d58b9[_0x5555f0(0x200)](_0x14be07,_0x13cbd7),_0x2d58b9[_0x5555f0(0x1f7)]();},Window_BattleStatus[_0x1e170f(0xf4)]=VisuMZ['BreakShields'][_0x1e170f(0x1e4)]['UI']['BattleStatusDisplayIcons'],Window_BattleStatus['BREAK_SHIELDS_DISPLAY_AUTO']=VisuMZ['BreakShields'][_0x1e170f(0x1e4)]['UI'][_0x1e170f(0x123)],Window_BattleStatus['BREAK_SHIELDS_DISPLAY_OFFSET_X']=VisuMZ[_0x1e170f(0x1f9)]['Settings']['UI']['BattleStatusOffsetX'],Window_BattleStatus[_0x1e170f(0x176)]=VisuMZ[_0x1e170f(0x1f9)]['Settings']['UI'][_0x1e170f(0x108)],VisuMZ[_0x1e170f(0x1f9)]['Window_BattleStatus_drawItemStatus']=Window_BattleStatus[_0x1e170f(0x188)]['drawItemStatus'],Window_BattleStatus[_0x1e170f(0x188)]['drawItemStatus']=function(_0x4f83af){const _0xd6e4d0=_0x1e170f;VisuMZ[_0xd6e4d0(0x1f9)][_0xd6e4d0(0x11b)][_0xd6e4d0(0x13f)](this,_0x4f83af),this[_0xd6e4d0(0x1b4)](_0x4f83af);},Window_BattleStatus[_0x1e170f(0x188)][_0x1e170f(0x1b4)]=function(_0x184ed2){const _0x4f5855=_0x1e170f;if(!Window_BattleStatus['BREAK_SHIELDS_DISPLAY_ICONS'])return;if(!Game_Battler[_0x4f5855(0x128)])return;const _0x8a8acc=this[_0x4f5855(0x1f4)](_0x184ed2);if(!_0x8a8acc[_0x4f5855(0x14c)]())return;if(!Window_BattleStatus[_0x4f5855(0x14f)])this['drawItemStatusBreakShieldsDefault'](_0x184ed2);else{if(!Imported[_0x4f5855(0x1c7)])this[_0x4f5855(0x143)](_0x184ed2);else{if(_0x4f5855(0x1e1)!==_0x4f5855(0x1e1)){const _0x53b91e=(_0x3e4feb[_0x4f5855(0x1fa)]()?_0x2f4154[_0x4f5855(0x173)]():_0x425533['_enemyId'])||0x0,_0x570a61='actor%1-breakShieldIcon'[_0x4f5855(0x149)](_0x53b91e),_0x33a40a=this[_0x4f5855(0x157)](_0x570a61,_0x3f938a);_0x33a40a[_0x4f5855(0x174)](_0x12b182,![]),_0x33a40a[_0x4f5855(0x200)](_0x20fed7,_0x11e97b),_0x33a40a[_0x4f5855(0x1f7)]();}else this['drawItemStatusBreakBattleCore'](_0x184ed2);}}},Window_BattleStatus[_0x1e170f(0x188)][_0x1e170f(0x143)]=function(_0x53ea75){const _0x850c88=_0x1e170f,_0x16310d=this['actor'](_0x53ea75),_0x364aea=this[_0x850c88(0x12d)](_0x53ea75),_0x51111c=Math[_0x850c88(0x15e)](ImageManager['iconWidth']/0x2);let _0x4b474b=_0x364aea['x']+_0x51111c-0x4+Window_BattleStatus['BREAK_SHIELDS_DISPLAY_OFFSET_X'],_0x2f1abe=_0x364aea['y']+_0x51111c+0x4+Window_BattleStatus[_0x850c88(0x176)];this[_0x850c88(0x12e)](_0x16310d,_0x4b474b,_0x2f1abe);},Window_BattleStatus[_0x1e170f(0x188)]['drawItemStatusBreakBattleCore']=function(_0x13ed4d){const _0x58b553=_0x1e170f,_0x28388f=this[_0x58b553(0x1f4)](_0x13ed4d),_0x2c44ca=this[_0x58b553(0x12b)](_0x13ed4d),_0x16e70d=Math[_0x58b553(0x15e)](_0x2c44ca['x']+(_0x2c44ca[_0x58b553(0x10c)]-0x80)/0x2),_0x32c4e0=this[_0x58b553(0x1e5)](_0x2c44ca),_0x494931=Math[_0x58b553(0x15e)](ImageManager[_0x58b553(0x1fe)]/0x2);let _0x4d5a84=_0x16e70d-_0x494931-0x4,_0x4c68ea=_0x32c4e0+_0x494931;_0x4d5a84-ImageManager[_0x58b553(0x1fe)]/0x2<_0x2c44ca['x']&&(_0x4d5a84=_0x16e70d+_0x494931-0x4,_0x4c68ea=_0x32c4e0-_0x494931);let _0x4bedc7=_0x2c44ca['x']+_0x494931+0x4,_0x191d9f=_0x2c44ca['y']+_0x494931+0x4;const _0x228a7d=this['battleLayoutStyle']();switch(_0x228a7d){case'list':!VisuMZ[_0x58b553(0x182)][_0x58b553(0x1e4)]['BattleLayout'][_0x58b553(0x16c)]&&(_0x4bedc7=_0x2c44ca['x']+_0x2c44ca[_0x58b553(0x10c)]-ImageManager[_0x58b553(0x1fe)]);break;case'xp':case'portrait':case _0x58b553(0xf3):case _0x58b553(0x1ef):_0x4bedc7=_0x4d5a84,_0x191d9f=_0x4c68ea+ImageManager[_0x58b553(0x1cd)];break;}_0x4bedc7+=Window_BattleStatus['BREAK_SHIELDS_DISPLAY_OFFSET_X'],_0x191d9f+=Window_BattleStatus[_0x58b553(0x176)],this['placeBreakShieldIcon'](_0x28388f,_0x4bedc7,_0x191d9f);};
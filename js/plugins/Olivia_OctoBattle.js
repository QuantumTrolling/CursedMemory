//=============================================================================
// Olivia Engine - Octo Battle - for RPG Maker MV version 1.6.1
// Olivia_OctoBattle.js
//=============================================================================
 /*:
 * @plugindesc <OctoBattle> for RPG Maker MV version 1.6.1.
 * @author Fallen Angel Olivia
 *
 * @help
 * This is a RPG Maker MV compilation plugin using eight various battle-related
 * plugins to make an indepth battle system. The plugins are:
 *
 * 1) Weakness Display Plugin
 * 2) Break Shield System Plugin
 * 3) Boost Point System Plugin
 * 4) Weapon Swap System Plugin
 * 5) Side Battle Status UI Plugin
 * 6) Victory Sequence UI Plugin
 * 7) Battle Effects Pack Plugin
 * 8) Order Turn Battle Plugin
 *
 * Weakness Display Plugin: The features create a display in battle to show an
 * enemy's elemental weaknesses. These weaknesses will start off hidden and
 * will be slowly revealed whenever they receive elemental damage of the
 * correct type. Choose to display the enemy's HP status, too.
 *
 * Break Shield System Plugin: These features creates a new mechanic called a
 * Break Shield. Actors and/or enemies can have them. Whenever a battler is
 * struck with an elemental weakness, their Break Shield is reduced by 1
 * (unless modified by a notetag). Once the battler's Break Shield reaches
 * a score of 0, a state is then applied to the battler (usually a stun state).
 * Once the Break state wears off, the battler will regain their Break Shields
 * again. This can be used to create complex battle depth for your game.
 *
 * Boost Point System Plugin: These features add Boost Points to your game.
 * This is a newly added mechanic that allows actors and enemies to temporarily
 * power themselves up for the current turn by using a new resource called
 * Boost Points. Boost Points are acquired at the end of each turn if the
 * battler did not use Boost Points. While Boosted, actions can either deal
 * more damage, hit more times, make buff/debuff effects last longer, and more.
 *
 * Weapon Swap System Plugin: This will give your game's actors the function
 * to swap weapons in the middle of the fight. Up to one of each weapon type
 * can be equipped at a time and they can be switched out each turn. Swapping
 * weapons can let the player team adapt to certain situations better or giving
 * them the ability to hit certain weapon weaknesses in battle.
 *
 * Side Battle Status UI Plugin: This changes the UI of the battle system to
 * something more minimalistic. The menus are placed towards the player's party
 * to let the player focus their attention to the center of the screen instead
 * of to the lower ledges of the screen.
 *
 * Victory Sequence UI Plugin: This makes the battle system's victory sequence
 * only a single screen. It puts together all of the reward information gained
 * from battle onto a compact screen to display everything at once before the
 * player goes back to the map scene.
 *
 * Battle Effects Pack Plugin: This adds many new features to battle. These
 * new features include colored damage popups and two new popups: Weak and
 * Break, buff and debuff turn stacking, buff and debuff maximum turn control,
 * state maximum turn control, follow up skill actions, extra skill lists, and
 * many unique notetag effects.
 *
 * Order Turn Battle Plugin: This changes the battle system to have a turn
 * order system where battlers act immediately after inputting actions. These
 * actions can influence the order position of battlers in the current turn or
 * the next turn. The turn order is displayed to the top of the screen and gives
 * the player a clear understanding on whose turn it will be making it easier
 * for the player to formulate strategies and adapt to the situation in battle.
 *
 * Some of the features in this plugin requires YEP Battle Engine Core. Please
 * go to Yanfly's website to download it and install it:
 * http://yanfly.moe/2015/10/10/yep-3-battle-engine-core/
 * 
 * ------------
 * Instructions
 * ------------
 *
 * If you are using this plugin, please do not use the other 8 plugins listed
 * or else there will be errors. If you have configured the plugin parameters
 * for those individual plugins, you will unfortunately have to reconfigure
 * them for this one again. I'm afraid there is not anything I can do about that
 * and I must apologize for it.
 *
 * For the best compatibility, place this plugin close to the BOTTOM of your
 * plugin list. This is to ensure the features of this plugin will be used and
 * that other plugins do not override this one.
 *
 * -----------------
 * Plugin Parameters
 * -----------------
 *
 * There are many plugin parameters found in this plugin. They are separated by
 * sections each related to their own plugin. Those features can be turned on
 * and off if you don't wish to use every feature out of the eight. When an
 * entire feature is turned off, everything about that is turned off. Please
 * carefully set up your game!
 *
 * --------
 * Notetags
 * --------
 * 
 * Skill and Item Notetags:
 *
 * <Analyze Weakness: x>
 * This will reveal x weaknesses that the player has not currently
 * revealed yet from the target enemy.
 *
 * <Break Reduce: x>
 * Reduces the target's Break Shield by x if this action hits a weakness.
 * If you do not use this notetag, x will be the default value found in
 * the plugin's parameters.
 *
 * <Change Break Shield: x>
 * This will change the target battler's Break Shield value to x if the
 * battler isn't currently stunned. No effect if you don't use this notetag.
 *
 * <Increase Break Shield: +x>
 * <Decrease Break Shield: -x>
 * This will either increase the target battler's break shield by x or
 * decrease the target battler's break shield by x. Happens after the
 * Change Break Shield notetag. No effect if you don't use this notetag.
 *
 * <Require x BP>
 * This will make the action require at least x BP to use for actors.
 * If for enemies, then at least x BP must be stored. This will not
 * make the enemies use the BP until you use the enemy BP use notetags.
 *
 * <Require > x BP>
 * <Require >= x BP>
 * <Require = x BP>
 * <Require <= x BP>
 * <Require < x BP>
 * This will make the action require greater than, greater than or equal to,
 * equal to exactly, less than or equal to, or less than x BP for the skill
 * to be used for actors. If for enemies, this will be the BP stored. This
 * will not make the enemies use the BP until you use the enemy BP use notetag.
 *
 * <Target BP: +x>
 * <Target BP: -x>
 * The target will gain or lose BP equal to x. This is a BP effect.
 *
 * <User BP: +x>
 * <User BP: -x>
 * The user will gain or lose BP equal to x. This is a BP effect.
 *
 * <Boost Damage>
 * If the action's user is using BP, this will boost the damage multiplier
 * for this action by the multiplier set in the plugin parameters.
 *
 * <Boost Turns>
 * If the action's user is using BP, this will boost the state/buff turns
 * for this action by the multiplier set in the plugin parameters.
 *
 * <Boost Repeats>
 * If the action's user is using BP, this will boost the number of repeated
 * hits for this action by the multiplier set in the plugin parameters.
 *
 * <Boost Analyze>
 * If the action's user is using BP, this will boost the number of weaknesses
 * revealed for this action by the multiplier set in the plugin parameters.
 *
 * <Boost BP Effect>
 * If the action's user is using BP, this will boost the number of BP effects
 * for this action by the multiplier set in the plugin parameters.
 *
 * <Switch to Weapon: x>
 * <Switch to Weapon: text>
 * When the actor uses this skill or item, the actor will switch to this
 * weapon if it is equipped when the skill cost is paid. x is the weapon
 * type ID and text is the weapon name. If you use the weapon name, type
 * it out exactly since it is case sensitive. This notetag does not make
 * the weapon a requirement. To make it a requirement, use the database's
 * "Required Weapon" dropdown lists to enforce the requirement.
 *
 * <Bypass Target Change>
 * <Divine>
 * Makes this skill/item immune to the target scope change notetag effects.
 *
 * <JP x5>
 * <EXP x10>
 * <Gold x200>
 * Replace the numbers. Changes the multipliers for the rewards found in the
 * current battle. JP will require Yanfly's Job Points plugin to have an effect.
 * After the battle is over, the multipliers will reset. The multipliers do not
 * stack and will overwrite each other, even if they are different types.
 *
 * <OTB User Next Turn: +x>
 * <OTB User Next Turn: -x>
 * Change the user's turn order position for the next turn upon using this
 * skill or item. This will only occur once upon usage, no matter how many times
 * the battler hits the target.
 *
 * <OTB Target Current Turn: +x>
 * <OTB Target Current Turn: -x>
 * <OTB Target Next Turn: +x>
 * <OTB Target Next Turn: -x>
 * <OTB Target Follow Turn: +x>
 * <OTB Target Follow Turn: -x>
 * Change the target's turn order position for the current turn, the next turn,
 * or the following turn. If you are using the 'Follow' version of the notetag,
 * the turn it will modify will depend on if the target has acted during the
 * current turn. If it has acted, then it will affect the next turn, otherwise,
 * the current turn. Successfully attacking the target multiple times will also
 * affect the target multiple times.
 *
 * <OTB User Add Current Turn Actions: x>
 * <OTB User Add Next Turn Actions: x>
 * Add x actions to the current turn or the next turn for the user. This will
 * only be added once no matter how many times the battler hits the target.
 *
 * <OTB Target Add Current Turn Actions: x>
 * <OTB Target Add Next Turn Actions: x>
 * Add x actions to the current turn or the next turn for the target. If the
 * target is targeted multiple times, the target will gain actions multiple
 * times so please be cautious when using this.
 *
 *
 *
 * Skill Notetags:
 *
 * <Require Any Weapon>
 * Requires any kind of weapon to be equipped in order to use it.
 *
 * <Require Weapon Types: x>
 * <Require Weapon Types: x, x, x>
 * Insert multiple x to add more weapon types. All of the weapon types must
 * be equipped in order for this skill to be used.
 * 
 * <Destroy Weapon>
 * Destroys the actor's currently equipped weapon after it is finished using a
 * skill with this notetag.
 *
 * <Extra Skill List: x>
 * <Extra Skill List: x, x, x>
 * Puts the skills x in a new window as a list to select from, turning this
 * skill into a folder during battle. This does not work outside of battle.
 * The actor must have access to all of the listed skills in order to use them.
 *
 *
 *
 * Actor, Class, and Enemy Notetags:
 * 
 * <Break Shields: x>
 * x is the base number of Break Shields the battler starts with.
 * If you do not use this notetag, x will be the default value found in
 * the plugin's parameters.
 *
 *
 *
 * Class, Weapon, Armor, and State Notetags:
 * 
 * <Break Shields: +x>
 * <Break Shields: -x>
 * x is the increased/decreased amount of Break Shields applied to how
 * much the battler will start with. If you do not use this notetag,
 * then no extra Break Shields will be added.
 *
 * <Protect Element: x>
 * <Protect Elements: x, x, x, x, x>
 * x element will be guarded. A maximum of 100% damage will be dealt to
 * the battler if that element is protected. This will also prevent the
 * Break Shields from reducing for that element. Insert more x's to
 * protect more elements.
 *
 * 
 *
 * 
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 * <BP Battle Start: x%>
 * <BP Battle Start: +x>
 * <BP Battle Start: -x>
 * Changes the amount of BP the battler starts with in battle by a
 * percentage (x%) or by a flat amount (+x or -x);
 *
 * <BP Regen: x%>
 * <BP Regen: +x>
 * <BP Regen: -x>
 * Changes the amount of BP the battler regens each turn in battle by a
 * percentage (x%) or by a flat amount (+x or -x);
 *
 * <Skill Target Change: Self to All>
 * <Item Target Change: Self to All>
 * Changes skills/items with the self scope to become an all scope in battle.
 * Does not affect skills/items with the <Bypass Target Change> notetag.
 *
 * <Skill Target Change Allies: All to One>
 * <Skill Target Change Enemies: All to One>
 * <Item Target Change Allies: All to One>
 * <Item Target Change Enemies: All to One>
 * Changes skills/items with the all allies/enemies scope to become 1 ally/enemy
 * scope in battle. Does not affect skills/items with the <Bypass Target Change>
 * notetag.
 *
 * <Skill Target Change Allies: One to All>
 * <Skill Target Change Enemies: One to All>
 * <Item Target Change Allies: One to All>
 * <Item Target Change Enemies: One to All>
 * Changes skills/items with the 1 ally/enemy scope to become all allies/enemies
 * scope in battle. Does not affect skills/items with the <Bypass Target Change>
 * notetag.
 *
 *
 * 
 *
 * Enemy Notetags:
 *
 * <Show HP Gauge>
 * This will show the enemy's HP gauge by default and ignore the plugin
 * parameter's default settings.
 *
 * <Hide HP Gauge>
 * This will hide the enemy's HP gauge by default and ignore the plugin
 * parameter's default settings.
 *
 * <No HP Gauge>
 * This will hide the enemy's HP gauge no matter what.
 *
 * <Boost Skill x: Full>
 * <Boost skillname: Full>
 * Whenever the enemy uses skill x (or the skillname if you use that),
 * it will use as much BP as it can for the skill when it performs it.
 *
 * <Boost Skill x: At Least y>
 * <Boost skillname: At Least y>
 * Whenever the enemy uses skill x (or the skillname if you use that),
 * it will use BP after reaching y BP and use as much as it can.
 *
 * <Boost Skill x: At Most y>
 * <Boost skillname: At Most y>
 * Whenever the enemy uses skill x (or the skillname if you use that),
 * it will use as much BP as it can unless BP is over y BP.
 *
 *
 *
 *
 * State Notetags:
 *
 * <Boost Sealed>
 * If a battler is affected by a state with this notetag, they cannot boost.
 *
 * <All Element Damage Rate: x%>
 * Makes the battler receive x% multiplier from all elements.
 *
 * <Break Popup>
 * If a battler receives a state with this notetag, the Break Popup will appear.
 * It will take priority over the Weak Popup.
 *
 * <Buff Immunity: x>
 * <Buff Immunity: x, x, x>
 * <Debuff Immunity: x>
 * <Debuff Immunity: x, x, x>
 * Replace x with the parameter ID to make the battler immune to receiving buffs
 * or debuffs of that parameter. This does not remove already applied buffs or
 * debuffs. It only stops the battler from receiving them.
 * 0: Max HP
 * 1: Max MP
 * 2: Attack
 * 3: Defense
 * 4: Magic Attack
 * 5: Magic Defense
 * 6: Agility
 * 7: Luck
 *
 * <Damage Color: r, g, b, a>
 * If the battler receives HP damage while affected by a state with this notetag
 * the popup color will change.
 * r = red (0-255)
 * g = green (0-255)
 * b = blue (0-255)
 * a = alpha (0-255)
 *
 * <Item Seal>
 * If an actor is affected by a state with this notetag, they cannot use items
 * from the actor command menu.
 *
 * <Max Turns: x>
 * Sets the maximum number of turns this state can be to x. This is used for
 * Yanfly's Buffs and States Core if you allow state turn stacking.
 *
 * <No Weak Popup>
 * If the battler is hit with an elemental weakness while affected by a state
 * with this notetag, the Weak popup will not appear.
 *
 * <Physical Follow Up Skill: x>
 * <Magical Follow Up Skill: x>
 * <Certain Follow Up Skill: x>
 * <Follow Up Skill: x>
 * This requires Yanfly's Battle Engine Core to work. This makes the battler
 * affected by this state to perform skill ID x after the current skill is
 * finished being used.
 * Physical - Requires battler to perform physical type skill
 * Magical  - Requires battler to perform magical type skill
 * Certain  - Requires battler to perform certain hit type skill
 * n/a      - Requires battler to perform physical or magical type skill
 *
 * <State Immunity: x>
 * <State Immunity: x, x, x>
 * Insert the IDs of the states that the battler cannot receive if they are
 * affected by a state with this notetag. They do not become resistant to it,
 * meaning if the states have already been applied, they will not suddenly
 * disappear, but they will not be able to be applied until this state is gone.
 *
 *
 *
 * ---------------
 * Action Sequence
 * ---------------
 *
 * If you are using YEP Battle Engine Core, there is an action sequence that
 * lets you switch weapons for the actor in the middle of an action sequence:
 *
 * Weapon Swap: targets, x
 * or
 * Weapon Swap: targets, text
 * or
 * Swap Weapon: targets, x
 * or
 * Swap Weapon: targets, text
 *
 * Use x with the weapon type ID in the Database Type tab. Or use text and
 * replace it with the name of the weapon type. If you use the name of the
 * weapon type, type it out exactly as it is spelled because it is case
 * sensitive.
 *
 *
 *
 * ---------------
 * Plugin Commands
 * ---------------
 *
 * If you want to turn on or off the victory sequence or the music, use these
 * plugin commands:
 *
 * EnableVictoryAftermath
 * DisableVictoryAftermath
 * This turns on or off the victory sequence. This one matches Yanfly's plugin
 * command so you don't have to change your game's plugin command call if you
 * are switching over.
 *
 * EnableVictoryMusic
 * DisableVictoryMusic
 * This turns on or off the victory BGM and ME. This one matches Yanfly's
 * plugin command so you don't have to change your game's plugin command call
 * if you are switching over.
 *
 *
 *
 * ------------
 * Script Calls
 * ------------
 *
 * BattleManager.revealWeakness(x)
 * Replace x with the number of weaknesses that are to be revealed for all
 * enemies in the battle.
 *
 * BattleManager.revealWeaknessByVariable(x)
 * Replace x with the variable ID. The x value determines how many weaknesses
 * are revealed for all enemies in the battle.
 *
 *
 *
 * ----------
 * Text Codes
 * ----------
 *
 * You can put these in a skill or item's help description and it will change
 * the text depending on how much BP the current actor is using.
 *
 * \bpDamage[x]
 * This will apply BP damage multipliers to number x based on the
 * actor's currently used BP amount.
 *
 * \bpTurn[x]
 * This will apply BP turn multipliers to number x based on the
 * actor's currently used BP amount.
 *
 * \bpRepeat[x]
 * This will apply BP repeat multipliers to number x based on the
 * actor's currently used BP amount.
 *
 * \bpAnalyze[x]
 * This will apply BP analyze multipliers to number x based on the
 * actor's currently used BP amount.
 *
 * \bpEffect[x]
 * This will apply BP effect multipliers to number x based on the
 * actor's currently used BP amount.
 *
 * \bp[text]
 * The text inside the brackets won't appear unless
 * at least 1 BP is used.
 *
 * \bp0[text]
 * The text inside the brackets will only appear if
 * no BP is being used.
 *
 * \bp>x[text]
 * The text inside the brackets will only appear if
 * more than x BP is being used.
 *
 * \bp>=x[text]
 * The text inside the brackets will only appear if
 * more than or exactly x BP is being used.
 *
 * \bp=x[text]
 * The text inside the brackets will only appear if
 * exactly x BP is being used.
 *
 * \bp<=x[text]
 * The text inside the brackets will only appear if
 * less than or exactly x BP is being used.
 *
 * \bp<x[text]
 * The text inside the brackets will only appear if
 * less than x BP is being used.
 *
 *
 *
 * -------------------
 * W A R N I N G ! ! !
 * -------------------
 *
 * This plugin is made for RPG Maker MV versions 1.6.1 and below. If you update
 * RPG Maker MV past that and this plugin breaks, I am NOT responsible for it.
 *
 * -------------
 * Compatibility
 * -------------
 *
 * This plugin is compatible with the following plugins:
 *
 * - YEP Core Engine
 * - YEP Battle Engine Core
 * - YEP Action Sequence Packs 1, 2, 3
 * - YEP Animated Sideview Enemies
 * - YEP Counter Control
 * - YEP Battle AI Core
 * - YEP Battle Select Cursor
 * - YEP Buffs & States Core
 * - YEP Damage Core
 * - YEP Element Core
 * - YEP Target Core
 * - YEP Skill Core
 * - YEP Instant Cast
 * - YEP Item Core
 * - YEP Equip Core
 * - YEP Party System
 * - YEP Actor Party Switch
 * - YEP Job Points
 * - YEP Base Troop Events
 * - YEP Swap Enemies
 *
 * Place this plugin under those in the Plugin Manager list. Otherwise, the
 * effects of the plugins under this plugin may not work properly. I am NOT
 * responsible for the compatibility of plugins not shown in the above list.
 *
 * ------------
 * Terms of Use
 * ------------
 * 
 * 1. These plugins may be used in free or commercial games.
 * 2. 'Fallen Angel Olivia' and 'Yanfly' must be given credit in your games.
 * 3. You are allowed to edit the code.
 * 4. Do NOT change the filename, parameters, and information of the plugin.
 * 5. You are NOT allowed to redistribute these Plugins.
 * 6. You may NOT take code for your own released Plugins without credit.
 *
 * -------
 * Credits
 * -------
 *
 * If you are using this plugin, credit the following people:
 * 
 * - Fallen Angel Olivia
 * - Yanfly
 *
 * @param 
 * @param 
 * @param ATTENTION!!!
 * @default READ THE HELP FILE
 * @param 
 * @param 
 *
 * @param Weakness Display
 * @text Weakness Display System
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Weakness Display. Everything under this will be affected.
 * @default true
 *
 * @param Weakness Element Data
 * @text Element Data
 * @parent Weakness Display
 * 
 * @param Shown Elements
 * @parent Weakness Element Data
 * @type number[]
 * @desc This is a list of all the element ID's that are displayed on the list.
 * @default ["1","2","3","4","5","6","7","8","9"]
 *
 * @param Element Icons
 * @parent Weakness Element Data
 * @type number[]
 * @desc Icon ID's used for the "Shown Elements" plugin parameter.
 * @default ["76","64","65","66","67","68","69","70","71"]
 *
 * @param Unknown Weakness Icon
 * @text Unrevealed Icon
 * @parent Weakness Element Data
 * @type number
 * @desc Icon ID used for an unrevealed element
 * @default 16
 *
 * @param Weakness Window Data
 * @text Visual Display
 * @parent Weakness Display
 *
 * @param Weakness Always Show
 * @text Always Show?
 * @parent Weakness Window Data
 * @type boolean
 * @on On
 * @off Off
 * @desc Always show the weakness display? Otherwise, it is hidden until enemy is selected or attacked.
 * @default true
 *
 * @param Weakness Hide Duration
 * @text Hide After Duration
 * @parent Weakness Always Show
 * @type number
 * @desc If the Weakness Display isn't always shown, hide after this many frames of it being visible.
 * @default 180
 *
 * @param Weakness Show Break Shield
 * @text Show Break Shield?
 * @parent Weakness Window Data
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the Break Shield for the enemy?
 * @default true
 *
 * @param Weakness Stun Duration
 * @text Show Stun Duration?
 * @parent Weakness Show Break Shield
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the number of turns left for the Break Stun?
 * @default false
 *
 * @param Weakness Show HP Gauge
 * @text Show HP Gauge?
 * @parent Weakness Window Data
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the HP gauge for the enemy by default?
 * @default true
 *
 * @param HP Gauge Minimum Width
 * @text Minimum Width
 * @parent Weakness Show HP Gauge
 * @type number
 * @desc This is the minimum width of the HP gauge if the gauge is smaller than the enemy name
 * @default 100
 *
 * @param HP Gauge Padding
 * @text Gauge Padding
 * @parent Weakness Show HP Gauge
 * @type number
 * @desc This is how much padding on both sides to give the HP gauge after calculating the width
 * @default 25
 *
 * @param Weakness Show Name
 * @text Show Name?
 * @parent Weakness Window Data
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the name of the enemy?
 * @default true
 *
 * @param Name Font Size
 * @text Font Size
 * @parent Weakness Show Name
 * @number
 * @min 1
 * @desc Font size used for enemy name
 * @default 22
 *
 * @param 50% HP Color
 * @parent Weakness Show Name
 * @type number
 * @desc Text color ID of the name when the enemy is at 50% HP or less.
 * @default 17
 *
 * @param 25% HP Color
 * @parent Weakness Show Name
 * @type number
 * @desc Text color ID of the name when the enemy is at 25% HP or less.
 * @default 2
 *
 * @param Weakness Show States
 * @text Show States?
 * @parent Weakness Window Data
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the states applied to the enemy? Will move the states sprite from the top of the enemy to here
 * @default true
 *
 * @param Small Weakness Icons
 * @parent Weakness Window Data
 * @type boolean
 * @on On
 * @off Off
 * @desc Draw smaller icons?
 * @default true
 *
 * @param Weak Icon Size
 * @parent Small Weakness Icons
 * @desc Rate of how much to shrink the weakness icons.
 * @default 0.6
 *
 * @param
 * @param
 *
 * @param Break Shield System
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Break Shield system. Everything under this will be affected.
 * @default true
 *
 * @param Break Shield Access
 * @text Access
 * @parent Break Shield System 
 *
 * @param Actor Shields
 * @parent Break Shield Access
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Break Shield system for actors
 * @default false
 *
 * @param Draw Menu Shields
 * @text Draw In Menus?
 * @parent Actor Shields
 * @type boolean
 * @on On
 * @off Off
 * @desc If enabled, will draw break shields in the menu where states are drawn.
 * @default true
 *
 * @param Enemy Shields
 * @parent Break Shield Access
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Break Shield system for enemies
 * @default true
 *
 * @param Break Shield Mechanics
 * @text Mechanics
 * @parent Break Shield System 
 *
 * @param Base Shield Value
 * @parent Break Shield Mechanics
 * @type number
 * @min 1
 * @desc The minimum amount of shields a battler can have
 * @default 1
 *
 * @param Break Reduction
 * @parent Break Shield Mechanics
 * @desc The default value of the item or skill when it goes to reduce Break Shield points
 * @default 1
 *
 * @param Element Weakness Rate
 * @parent Break Shield Mechanics
 * @desc The element weakness rate must be greater than this value to break a Break Shield point
 * @default 1.1
 *
 * @param Max Break Shields
 * @parent Break Shield Mechanics
 * @type number
 * @min 1
 * @desc The maximum amount of shields a battler can have
 * @default 99
 *
 * @param Stun State ID
 * @parent Break Shield Mechanics
 * @type state
 * @desc The state ID used for the stun state that is applied when Break Shields reach 0
 * @default 4
 *
 * @param Break Shield Visual
 * @text Visuals
 * @parent Break Shield System 
 *
 * @param Shield Icon
 * @parent Break Shield Visual
 * @type number
 * @min 1
 * @desc The icon ID used for representing Break Shields
 * @default 81
 *
 * @param Stun Icon
 * @parent Break Shield Visual
 * @type number
 * @min 1
 * @desc The icon ID used for representing Break Stun
 * @default 6
 *
 * @param Protect Weakness Icon
 * @parent Break Shield Visual
 * @type number
 * @min 1
 * @desc The icon ID used for representing a protected weakness. Protect Weakness Icon will be drawn on top of lower icon
 * @default 81
 *
 * @param Reduce Animation
 * @parent Break Shield Visual
 * @type animation
 * @desc The animation ID used for the moment an enemy's Break Shields is reduced. Use 0 for no animation.
 * @default 2
 *
 * @param Break Animation
 * @parent Break Shield Visual
 * @type animation
 * @desc The animation ID used for the moment an enemy's Break Shields reach 0. Use 0 for no animation.
 * @default 56
 *
 * @param Icon Font Size
 * @parent Break Shield Visual
 * @type number
 * @min 1
 * @desc The font size of the text used to display the shields left or duration of the turn.
 * @default 22
 *
 * @param Show Actor Shields
 * @parent Break Shield Visual
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the actor shields next to their name in the status window?
 * @default true
 *
 * @param Show Enemy Shields
 * @parent Break Shield Visual
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the enemy shields next to their name in the target window?
 * @default true
 *
 * @param
 * @param
 *
 * @param Boost Point System
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Boost Point system. Everything under this will be affected.
 * @default true
 *
 * @param Boost Point Battle Control
 * @text Battle Control
 * @parent Boost Point System 
 *
 * @param Boost Point Boost Command
 * @text Boost Command
 * @parent Boost Point Battle Control
 * @desc How command for how Boost is displayed
 * @default Boost
 *
 * @param Boost Point Boost Command Show
 * @text Show Command?
 * @parent Boost Point Boost Command
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the Boost Command in the Actor Command Window?
 * @default true
 *
 * @param Boost Point Unboost Command
 * @text Unboost Command
 * @parent Boost Point Battle Control
 * @desc How command for how Unboost is displayed
 * @default Unboost
 *
 * @param Boost Point Unboost Command Show
 * @text Show Command?
 * @parent Boost Point Unboost Command
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the Unboost Command in the Actor Command Window?
 * @default true
 *
 * @param Boost Point LR Buttons
 * @text Use L and R Buttons?
 * @parent Boost Point Battle Control
 * @type boolean
 * @on On
 * @off Off
 * @desc Use L and R buttons (Q and W keys) to control boosting?
 * @default true
 *
 * @param Boost Point Mechanics
 * @text Mechanics
 * @parent Boost Point System 
 *
 * @param Boost Point Start Battle
 * @text Start Battle BP
 * @parent Boost Point Mechanics
 * @type number
 * @desc The amount of BP battlers start each battle with
 * @default 1
 *
 * @param Boost Point Regen
 * @text Regen BP
 * @parent Boost Point Mechanics
 * @type number
 * @desc The amount of BP battlers regenerate each turn
 * @default 1
 *
 * @param Boost Point Always Regen
 * @text Always Regenerate
 * @parent Boost Point Regen
 * @type boolean
 * @on On
 * @off Off
 * @desc Always regenerate BP. Otherwise, regenerate BP when BP wasn't used that turn.
 * @default false
 *
 * @param Boost Point Maximum Stored
 * @text Max Stored BP
 * @parent Boost Point Mechanics
 * @type number
 * @desc The most amount of BP a battler can hold onto at any time
 * @default 5
 *
 * @param Boost Point Maximum Use
 * @text Max Used BP
 * @parent Boost Point Mechanics
 * @type number
 * @desc The most amount of BP a battler can use at once.
 * @default 3
 *
 * @param Boost Point Death Removal
 * @text Death Removal
 * @parent Boost Point Mechanics
 * @type boolean
 * @on On
 * @off Off
 * @desc Remove all BP upon death?
 * @default true
 *
 * @param Boost Point Death Regen
 * @text Death Regen
 * @parent Boost Point Mechanics
 * @type boolean
 * @on On
 * @off Off
 * @desc Can regen BP while dead or hidden?
 * @default false
 *
 * @param Boost Point Multipliers
 * @text Multipliers
 * @parent Boost Point System 
 *
 * @param Boost Point Damage Multipliers
 * @text Damage Multipliers
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The multipliers for each BP used from 0 to max. This is the percentage of the multiplier.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0"]
 *
 * @param Boost Point Damage Addition
 * @text Damage Addition
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The addition for each BP used from 0 to max. This is the integer version of the bonus.
 * @default ["0","0","0","0","0","0","0","0","0","0"]
 *
 * @param Boost Point Repeat Multipliers
 * @text Repeat Multipliers
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The multipliers for each BP used from 0 to max. This is the percentage of the multiplier.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0"]
 *
 * @param Boost Point Repeat Addition
 * @text Repeat Addition
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The addition for each BP used from 0 to max. This is the integer version of the bonus.
 * @default ["0","0","0","0","0","0","0","0","0","0"]
 *
 * @param Boost Point Turn Multipliers
 * @text Turn Multipliers
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The multipliers for each BP used from 0 to max. This is the percentage of the multiplier.
 * @default ["1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0"]
 *
 * @param Boost Point Turn Addition
 * @text Turn Addition
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The addition for each BP used from 0 to max. This is the integer version of the bonus.
 * @default ["0","2","4","6","8","10","12","14","16","18"]
 *
 * @param Boost Point Analyze Multipliers
 * @text Analyze Multipliers
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The multipliers for each BP used from 0 to max. This is the percentage of the multiplier.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0"]
 *
 * @param Boost Point Analyze Addition
 * @text Analyze Addition
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The addition for each BP used from 0 to max. This is the integer version of the bonus.
 * @default ["0","0","0","0","0","0","0","0","0","0"]
 *
 * @param Boost Point BP Effect Multipliers
 * @text BP Effect Multipliers
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The multipliers for each BP used from 0 to max. This is the percentage of the multiplier.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0"]
 *
 * @param Boost Point BP Addition
 * @text BP Addition
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The addition for each BP used from 0 to max. This is the integer version of the bonus.
 * @default ["0","0","0","0","0","0","0","0","0","0"]
 *
 * @param Boost Point Visuals
 * @text Visuals
 * @parent Boost Point System 
 *
 * @param Boost Point Animations
 * @text Animations
 * @parent Boost Point Visuals
 * @type animation[]
 * @desc Choose animations to play when changing to different levels of BP
 * @default ["12","13","15","14","2","51","52","53","67","66"]
 *
 * @param Boost Point Show Icons
 * @text Show Icons?
 * @parent Boost Point Visuals
 * @type boolean
 * @on On
 * @off Off
 * @desc Show boost point icons in the party status menu in battle?
 * @default true
 *
 * @param Boost Point Icon Filled
 * @text Boost Icon
 * @parent Boost Point Show Icons
 * @type number
 * @desc Icon ID used to represent a Boost slot
 * @default 160
 *
 * @param Boost Point Icon Empty
 * @text Empty Icon
 * @parent Boost Point Show Icons
 * @type number
 * @desc Icon ID used to represent an empty slot
 * @default 161
 *
 * @param Small Boost Icons
 * @parent Boost Point Show Icons
 * @type boolean
 * @on On
 * @off Off
 * @desc Draw smaller icons?
 * @default true
 *
 * @param Boost Icon Size
 * @parent Small Boost Icons
 * @desc Rate of how much to shrink the Boost icons
 * @default 0.5
 *
 * @param Boost Point Small Text
 * @text Text
 * @parent Small Boost Icons
 * @desc Text used to accompany small Boost icons
 * @default Boost
 *
 * @param Boost Point Small Text Align
 * @text Text Alignment
 * @parent Small Boost Icons
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment used for the small Boost text
 * @default right
 *
 * @param
 * @param
 *
 * @param Weapon Swap System
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Weapon Swap System. Everything under this will be affected.
 * @default true
 *
 * @param Weapon Swap Battle Control
 * @text Battle Control
 * @parent Weapon Swap System 
 *
 * @param Weapon Swap Command
 * @text Swap Command
 * @parent Weapon Swap Battle Control
 * @desc How command for how Weapon Swap is displayed
 * @default WpnSwap
 *
 * @param Weapon Swap Show Command
 * @text Show Command?
 * @parent Weapon Swap Command
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the Weapon Swap Command in the Actor Command Window?
 * @default false
 *
 * @param Weapon Swap Arrow Buttons
 * @text Use Arrow Swapping?
 * @parent Weapon Swap Battle Control
 * @type boolean
 * @on On
 * @off Off
 * @desc Use Arrow Keys to control weapon swapping?
 * @default true
 *
 * @param Weapon Swap Show Arrows
 * @text Show Swap Arrows?
 * @parent Weapon Swap Battle Control
 * @type boolean
 * @on On
 * @off Off
 * @desc Show arrows on the attack command?
 * @default true
 *
 * @param Weapon Swap Battle Test
 * @text Battle Test Weapons
 * @parent Weapon Swap Battle Control
 * @type boolean
 * @on On
 * @off Off
 * @desc In battle test, give all party members a copy of each weapon?
 * @default true
 *
 * @param Weapon Swap Visual
 * @text Visuals
 * @parent  Weapon Swap System
 *
 * @param Weapon Swap Battle Icons
 * @text Show Battle Icons
 * @parent Weapon Swap Visual
 * @type boolean
 * @on On
 * @off Off
 * @desc Show icons of currently equipped weapons in battle?
 * @default true
 *
 * @param Weapon Swap Battle Action
 * @text Show Battle Action
 * @parent Weapon Swap Visual
 * @type boolean
 * @on On
 * @off Off
 * @desc Show animation of actor switching weapons? Sideview only
 * @default true
 *
 * @param Weapon Swap Equip Core Window
 * @text Extend Equip Stat Window
 * @parent Weapon Swap Visual
 * @type boolean
 * @on On
 * @off Off
 * @desc Require Yanfly's Equip Core. Extend the stat compare window
 * @default true
 *
 * @param Weapon Swap Text Hit
 * @text Text Hit Rate
 * @parent Weapon Swap Equip Core Window
 * @desc How to display this extra parameter
 * @default ACC
 *
 * @param Weapon Swap Text Evasion
 * @text Text Evasion
 * @parent Weapon Swap Equip Core Window
 * @desc How to display this extra parameter
 * @default EVA
 *
 * @param Weapon Swap Text Critical
 * @text Text Critical
 * @parent Weapon Swap Equip Core Window
 * @desc How to display this extra parameter
 * @default CRI
 *
 * @param
 * @param
 *
 * @param Side Battle UI
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Side Battle UI
 * @default true
 *
 * @param Warning Side Battle UI
 * @text !!!!! WARNING !!!!!
 * @parent Side Battle UI
 * @default Requires YEP_BattleEngineCore
 *
 * @param Side UI Position Sprites
 * @text Position Sprites
 * @parent Side Battle UI
 *
 * @param Side Battle Position Actors
 * @text Position Actors
 * @parent Side UI Position Sprites
 * @type boolean
 * @on On
 * @off Off
 * @desc Position actor sprites on the screen using the formula below?
 * @default true
 *
 * @param Side Battle Actor X
 * @text Formula for X
 * @parent Side Battle Position Actors
 * @desc Formula used for X screen position
 * @default Graphics.boxWidth * 0.5 + 128 + index * 64
 *
 * @param Side Battle Actor Y
 * @text Formula for Y
 * @parent Side Battle Position Actors
 * @desc Formula used for Y screen position
 * @default Graphics.boxHeight - 128 - ($gameParty.maxBattleMembers() - index - 1) * 48
 *
 * @param Side Battle Position Enemies
 * @text Position Enemies
 * @parent Side UI Position Sprites
 * @type boolean
 * @on On
 * @off Off
 * @desc Position enemy sprites on the screen using the formula below?
 * @default true
 *
 * @param Side Battle Enemy X
 * @text Formula for X
 * @parent Side Battle Position Enemies
 * @desc Formula used for X screen position
 * @default x
 *
 * @param Side Battle Enemy Y
 * @text Formula for Y
 * @parent Side Battle Position Enemies
 * @desc Formula used for Y screen position
 * @default Graphics.boxHeight - 444 - 128 + y
 *
 * @param Side UI Status Window
 * @text Status Window
 * @parent Side Battle UI
 *
 * @param Side Battle Ceiling Distance
 * @text Ceiling Distance
 * @parent Side UI Status Window
 * @type number
 * @desc How many pixels from the top of the screen to leave as room for the status windows?
 * @default 0
 *
 * @param Side Battle Gauge Height
 * @text Gauge Height
 * @parent Side UI Status Window
 * @type number
 * @desc How high should the gauges of the windows be pixels
 * @default 6
 *
 * @param Side Battle Gauge Width
 * @text Gauge Width
 * @parent Side UI Status Window
 * @type number
 * @desc How wide should the gauges of the windows be in pixels
 * @default 160
 *
 * @param Side Battle Status Move Active
 * @text Move Distance: Active
 * @parent Side UI Status Window
 * @type number
 * @desc Move the status window this many pixels when the battler is the active battler
 * @default 48
 *
 * @param Side Battle Status Move Selected
 * @text Move Distance: Selected
 * @parent Side UI Status Window
 * @type number
 * @desc Move the status window this many pixels when the battler is selected for a skill or item target
 * @default 24
 *
 * @param Side Battle Status Move Speed
 * @text Move Distance: Speed
 * @parent Side UI Status Window
 * @type number
 * @desc The move speed for the window when animating
 * @default 4
 *
 * @param Side Battle Status States Max
 * @text States Max
 * @parent Side UI Status Window
 * @type number
 * @desc Maximum number of states to draw on the status windows
 * @default 4
 *
 * @param Side Battle Status Scale
 * @text Window Scale
 * @parent Side UI Status Window
 * @desc Scale the size of the contents of the status windows down by this much
 * @default 0.6
 *
 * @param Side Battle Status Width
 * @text Window Width
 * @parent Side UI Status Window
 * @type number
 * @desc How wide should the status windows be on the screen
 * @default 200
 *
 * @param Side UI Window Settings
 * @text Window Settings
 * @parent Side Battle UI
 *
 * @param Side Battle Dim Help Window
 * @text Dim Help Window
 * @parent Side UI Window Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Dim the help window background
 * @default true
 *
 * @param Side Battle Command Window Width
 * @text Command Window Width
 * @parent Side UI Window Settings
 * @type number
 * @min 1
 * @desc Width in pixels for battle command windows
 * @default 160
 *
 * @param Side Battle List Window Max
 * @text List Window Rows
 * @parent Side UI Window Settings
 * @type number
 * @min 1
 * @desc Maximum number of rows to use for each of the list windows
 * @default 8
 *
 * @param Side Battle List Window Width
 * @text List Window Width
 * @parent Side UI Window Settings
 * @type number
 * @min 1
 * @desc Width in pixels for battle list windows
 * @default 320
 *
 * @param Side Battle Command Window Scale
 * @text Window Scale
 * @parent Side UI Window Settings
 * @desc Scale the size of the contents of the command and list windows down by this much
 * @default 0.8
 *
 * @param Side Battle Window Masking
 * @text Window Masking Effect
 * @parent Side Battle UI
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the window masking effect
 * @default false
 *
 * @param
 * @param
 *
 * @param Victory Screen UI
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Victory Screen UI. Everything under this will be affected.
 * @default true
 *
 * @param Victory Screen Audio
 * @text Audio
 * @parent Victory Screen UI
 *
 * @param Victory Screen Level Sound
 * @text Level Sound
 * @parent Victory Screen Audio
 * @type file
 * @dir audio/se/
 * @desc Filename for the sound effect used when a level up occurs
 * @default Skill2
 *
 * @param Victory Screen Level Sound Volume
 * @text Volume
 * @parent Victory Screen Level Sound
 * @type number
 * @desc Volume of this sound effect
 * @default 90
 *
 * @param Victory Screen Level Sound Pitch
 * @text Pitch
 * @parent Victory Screen Level Sound
 * @type number
 * @desc Pitch of this sound effect
 * @default 100
 *
 * @param Victory Screen Level Sound Pan
 * @text Pan
 * @parent Victory Screen Level Sound
 * @type number
 * @desc Pan of this sound effect
 * @default 0
 *
 * @param Victory Screen BGM
 * @text BGM
 * @parent Victory Screen Audio
 * @type file
 * @dir audio/bgm/
 * @desc Filename for the BGM used during the victory sequence
 * @default Ship3
 *
 * @param Victory Screen BGM Volume
 * @text Volume
 * @parent Victory Screen BGM
 * @type number
 * @desc Volume of this sound effect
 * @default 90
 *
 * @param Victory Screen BGM Pitch
 * @text Pitch
 * @parent Victory Screen BGM
 * @type number
 * @desc Pitch of this sound effect
 * @default 100
 *
 * @param Victory Screen BGM Pan
 * @text Pan
 * @parent Victory Screen BGM
 * @type number
 * @desc Pan of this sound effect
 * @default 0
 *
 * @param Victory Screen Transition
 * @text Transition
 * @parent Victory Screen UI
 *
 * @param Victory Screen Transition Power
 * @text Transition Power
 * @parent Victory Screen Transition
 * @type number
 * @min 1
 * @desc Transition power when entering victory sequence. Use higher numbers to make transition faster.
 * @default 8
 *
 * @param Victory Screen Hide Window Delay
 * @text Hide Window Delay
 * @parent Victory Screen Transition
 * @type number
 * @desc Milliseconds used to wait before hiding the status windows
 * @default 500
 *
 * @param Victory Screen Display Delay
 * @text Display Delay
 * @parent Victory Screen Transition
 * @type number
 * @desc Milliseconds used to wait before showing the display
 * @default 1000
 *
 * @param Victory Screen Zoom
 * @text Zoom?
 * @parent Victory Screen Transition
 * @type boolean
 * @on On
 * @off Off
 * @desc Zoom in to the party during the transition?
 * @default true
 *
 * @param Victory Screen Zoom X
 * @text X
 * @parent Victory Screen Zoom
 * @type number
 * @desc X coordinate to zoom in at
 * @default 700
 *
 * @param Victory Screen Zoom Y
 * @text Y
 * @parent Victory Screen Zoom
 * @type number
 * @desc Y coordinate to zoom in at
 * @default 460
 *
 * @param Victory Screen Zoom Scale
 * @text Scale
 * @parent Victory Screen Zoom
 * @desc Scale to zoom in at
 * @default 2.0
 *
 * @param Victory Screen Zoom Duration
 * @text Duration
 * @parent Victory Screen Zoom
 * @type number
 * @desc Duration in frames for the whole zoom
 * @default 300
 *
 * @param Victory Screen Background
 * @text Background
 * @parent Victory Screen UI
 *
 * @param Victory Screen Background Dimmer Height
 * @text Dim Start Rate
 * @parent Victory Screen Background
 * @desc The veritcal portion of the screen to start dimming at
 * @default 0.2
 *
 * @param Victory Screen Background Side Thickness
 * @text Side Thickness
 * @parent Victory Screen Background
 * @type number
 * @desc Amount of distance between the side of the screen and the contents
 * @default 96
 *
 * @param Victory Screen Background Middle Thickness
 * @text Middle Thickness
 * @parent Victory Screen Background
 * @type number
 * @desc Amount of distance between content in the middle of the screen
 * @default 96
 *
 * @param Victory Screen Background Text Items
 * @text Item Reward Text
 * @parent Victory Screen Background
 * @desc Text used to display the items received from battle
 * @default Items Obtained
 *
 * @param Victory Screen Background Text Items Font Size
 * @text Font Size
 * @parent Victory Screen Background Text Items
 * @type number
 * @min 1
 * @desc Font size used for Item Reward Text
 * @default 36
 *
 * @param Victory Screen Background Text Victory
 * @text Victory Text
 * @parent Victory Screen Background
 * @desc Text to display for Victory screen title
 * @default Victory!
 *
 * @param Victory Screen Background Text Victory Font Size
 * @text Font Size
 * @parent Victory Screen Background Text Victory
 * @type number
 * @min 1
 * @desc Font size used for Victory Text
 * @default 60
 *
 * @param Victory Screen Rewards
 * @text Rewards
 * @parent Victory Screen Background
 *
 * @param Victory Screen Rewards Category Font Size
 * @text Category Font Size
 * @parent Victory Screen Rewards
 * @type number
 * @min 1
 * @desc Font size used for reward categories
 * @default 20
 *
 * @param Victory Screen Rewards Category Font Color
 * @text Category Font Color
 * @parent Victory Screen Rewards
 * @type number
 * @desc Text color used for reward categories
 * @default 8
 *
 * @param Victory Screen Rewards Results Font Size
 * @text Results Font Size
 * @parent Victory Screen Rewards
 * @type number
 * @min 1
 * @desc Font size used for reward results
 * @default 28
 *
 * @param Victory Screen Rewards Results Font Color
 * @text Results Font Color
 * @parent Victory Screen Rewards
 * @type number
 * @desc Text color used for reward results
 * @default 0
 *
 * @param Victory Screen Status Windows
 * @text Status Windows
 * @parent Victory Screen UI
 *
 * @param Victory Screen Status Actor Font Size
 * @text Actor Name Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size used for actor names
 * @default 20
 *
 * @param Victory Screen Status Level Font Size
 * @text Level Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size used for levels
 * @default 20
 *
 * @param Victory Screen Status Level Format
 * @text Level Format
 * @parent Victory Screen Status Windows
 * @desc Text format used for levels. %1 is 
 * @default Lv.%1
 *
 * @param Victory Screen Status JP Font Size
 * @text JP Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size used for JP
 * @default 16
 *
 * @param Victory Screen Status EXP Font Size
 * @text EXP Label Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size used for the EXP label
 * @default 16
 *
 * @param Victory Screen Status Update Duration
 * @text Update Duration
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Duration in frames for updating actors in the status windows
 * @default 180
 *
 * @param Victory Screen Status Current EXP Font Size
 * @text Current EXP Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size for current EXP
 * @default 20
 *
 * @param Victory Screen Status Current EXP Font Color
 * @text Current EXP Font Color
 * @parent Victory Screen Status Windows
 * @type number
 * @desc Text color for current EXP
 * @default 0
 *
 * @param Victory Screen Status Next EXP Font Size
 * @text Next EXP Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size for next level's EXP
 * @default 18
 *
 * @param Victory Screen Status Next EXP Font Color
 * @text Next EXP Font Color
 * @parent Victory Screen Status Windows
 * @type number
 * @desc Font color for next level's EXP
 * @default 8
 *
 * @param Victory Screen Status Exp Gauge Height
 * @text Gauge Height
 * @parent Victory Screen Status Windows
 * @type number
 * @min 3
 * @desc Height for EXP gauge
 * @default 18
 *
 * @param Victory Screen Status Exp Gauge Color 1
 * @text Gauge Color 1
 * @parent Victory Screen Status Windows
 * @type number
 * @desc Text color 1 for EXP gauge
 * @default 30
 *
 * @param Victory Screen Status Exp Gauge Color 2
 * @text Gauge Color 2
 * @parent Victory Screen Status Windows
 * @type number
 * @desc Text color 2 for EXP gauge
 * @default 31
 *
 * @param Victory Screen Status Level Up Text
 * @text Level Up Text
 * @parent Victory Screen Status Windows
 * @desc Text to display when a level is reached
 * @default Level Up!
 *
 * @param Victory Screen Status Level Up Font Size
 * @text Level Up Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size for Level Up Text
 * @default 36
 *
 * @param Victory Screen Status Level Up Color
 * @text Level Up Font Color
 * @parent Victory Screen Status Windows
 * @type number
 * @desc Text color for Level Up Text
 * @default 17
 *
 * @param Victory Screen Continue Button
 * @text Continue Button
 * @parent Victory Screen UI
 *
 * @param Victory Screen Continue Duration
 * @text Duration
 * @parent Victory Screen Continue Button
 * @type number
 * @min 1
 * @desc Duration in frames to wait before continue button appears
 * @default 180
 *
 * @param Victory Screen Continue Text
 * @text Text
 * @parent Victory Screen Continue Button
 * @desc Text to display to show at the bottom of the screen when ready to exit battle
 * @default Press \c[27]Z\c[0] or \c[27]X\c[0] to continue
 *
 * @param 
 * @param 
 *
 * @param Battle Effects Pack
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Battle Effects Pack. Everything under this will be affected.
 * @default true
 *
 * @param Battle Effects Weak Popups
 * @text Weak Popups
 * @parent Battle Effects Pack
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Weak Popups
 * @default true
 *
 * @param Battle Effects Weak Popup Require Rate
 * @text Required Rate
 * @parent Battle Effects Weak Popups
 * @desc Required rate of elemental damage for weak popup to appear
 * @default 1.1
 *
 * @param Battle Effects Weak Popup Cell X
 * @text Cell X
 * @parent Battle Effects Weak Popups
 * @type number
 * @desc Starting cell column for X
 * @default 4
 *
 * @param Battle Effects Weak Popup Cell Width
 * @text Cell Width
 * @parent Battle Effects Weak Popups
 * @type number
 * @desc Number of cells for this popup's width
 * @default 3
 *
 * @param Battle Effects Weak Popup Cell X Factor
 * @text X Factor
 * @parent Battle Effects Weak Popups
 * @desc Rate of buffer for the popup's X position
 * @default 0.25
 *
 * @param Battle Effects Weak Popup Cell Y Factor
 * @text Y Factor
 * @parent Battle Effects Weak Popups
 * @desc Rate of buffer for the popup's Y position
 * @default 0.60
 *
 * @param Battle Effects Weak Popup Move X Base
 * @text Move X Base
 * @parent Battle Effects Weak Popups
 * @desc Base horizontal movement of the popup
 * @default -0.04
 *
 * @param Battle Effects Weak Popup Move X Rate
 * @text Move X Rate
 * @parent Battle Effects Weak Popups
 * @desc Rate of change for horizontal movement
 * @default 1.1
 *
 * @param Battle Effects Weak Popup Move Y Base
 * @text Move Y Base
 * @parent Battle Effects Weak Popups
 * @desc Base vertical movement of the popup
 * @default 0
 *
 * @param Battle Effects Weak Popup Move Y Rate
 * @text Move Y Rate
 * @parent Battle Effects Weak Popups
 * @desc Rate of change for vertical movement
 * @default 0
 *
 * @param Battle Effects Break Popups
 * @text Break Popups
 * @parent Battle Effects Pack
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Break Popups
 * @default true
 *
 * @param Battle Effects Break Popup Cell X
 * @text Cell X
 * @parent Battle Effects Break Popups
 * @type number
 * @desc Starting cell column for X
 * @default 7
 *
 * @param Battle Effects Break Popup Cell Width
 * @text Cell Width
 * @parent Battle Effects Break Popups
 * @type number
 * @desc Number of cells for this popup's width
 * @default 3
 *
 * @param Battle Effects Break Popup Cell X Factor
 * @text X Factor
 * @parent Battle Effects Break Popups
 * @desc Rate of buffer for the popup's X position
 * @default 0.25
 *
 * @param Battle Effects Break Popup Cell Y Factor
 * @text Y Factor
 * @parent Battle Effects Break Popups
 * @desc Rate of buffer for the popup's Y position
 * @default 0.60
 *
 * @param Battle Effects Break Popup Move X Base
 * @text Move X Base
 * @parent Battle Effects Break Popups
 * @desc Base horizontal movement of the popup
 * @default -0.04
 *
 * @param Battle Effects Break Popup Move X Rate
 * @text Move X Rate
 * @parent Battle Effects Break Popups
 * @desc Rate of change for horizontal movement
 * @default 1.1
 *
 * @param Battle Effects Break Popup Move Y Base
 * @text Move Y Base
 * @parent Battle Effects Break Popups
 * @desc Base vertical movement of the popup
 * @default 0
 *
 * @param Battle Effects Break Popup Move Y Rate
 * @text Move Y Rate
 * @parent Battle Effects Break Popups
 * @desc Rate of change for vertical movement
 * @default 0
 *
 * @param Stacking Buff/Debuffs
 * @parent Battle Effects Pack
 *
 * @param Battle Effects Stack Buff Turns
 * @text Stack Buff Turns
 * @parent Stacking Buff/Debuffs
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable stacking buff turns
 * @default true
 *
 * @param Battle Effects Max Buff Turns
 * @text Max Buff Turns
 * @parent Battle Effects Stack Buff Turns
 * @desc Max number of turns for stacking buffs
 * @default 9
 *
 * @param Battle Effects Stack Debuff Turns
 * @text Stack Debuff Turns
 * @parent Stacking Buff/Debuffs
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable stacking debuff turns
 * @default true
 *
 * @param Battle Effects Max Debuff Turns
 * @text Max Debuff Turns
 * @parent Battle Effects Stack Debuff Turns
 * @desc Max number of turns for stacking debuffs
 * @default 9
 *
 * @param
 * @param
 *
 * @param Order Turn Battle
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Order Turn Battle System. Everything under this will be affected.
 * @default true
 *
 * @param Warning OTB 
 * @text !!!!! WARNING !!!!!
 * @parent Order Turn Battle
 * @default Requires YEP_BattleEngineCore
 *
 * @param OTB Force Battle System
 * @text Force Battle System?
 * @parent Order Turn Battle
 * @type boolean
 * @on On
 * @off Off
 * @desc Forces the OTB battle system no matter what your Battle Engine Core setting is.
 * @default true
 *
 * @param OTB Mechancs
 * @text Mechanics
 * @parent Order Turn Battle
 *
 * @param OTB Mechanics Action Speed Convert
 * @text Action Speed Convert
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Converts action speed into a <OTB User Next Turn: +x> notetag for items and skills
 * @default true
 *
 * @param OTB Mechanics Buff Debuff AGI Convert
 * @text Buff/Debuff AGI Convert
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Convert AGI buffs/debuffs into <OTB Target Next Turn: +x> notetag for items and skills
 * @default true
 *
 * @param OTB Mechanics Added Action Times
 * @text Added Action Times
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Allow Added Action Times in this battle system?
 * @default true
 *
 * @param OTB Mechanics Action Time Order Randomize
 * @text Randomize Position
 * @parent OTB Mechanics Added Action Times
 * @type boolean
 * @on On
 * @off Off
 * @desc Randomize the positions of newly added actions in the turn order after the first initial position?
 * @default true
 *
 * @param OTB Mechanics Enable Party Window
 * @text Enable Party Window?
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Gives access to the Party Command Window (Fight/Escape window)
 * @default false
 *
 * @param OTB Mechanics Escape Actor Window
 * @text Escape in Actor Window
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Add the Escape command in the actor window?
 * @default true
 *
 * @param OTB Mechanics Remove Restrict Current
 * @text Current Turn Wakeup
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Add battlers back to the current turn's order when they wake up from a restriction state?
 * @default true
 *
 * @param OTB Mechanics Remove Restrict Next
 * @text Next Turn Wakeup
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Add battlers back to the next turn's order when they wake up from a restriction state?
 * @default true
 *
 * @param OTB Mechanics Static AGI Calculation
 * @text Static AGI Calculation
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc If on, calculate speed on static AGI. If off, calculate speed on random AGI.
 * @default true
 *
 * @param OTB Mechanics Stun Wakeup First
 * @text Stun Wakeup First
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc If on, when waking up from a stun, be first in position on the next turn
 * @default true
 *
 * @param OTB Mechanics Stun Wakeup Clamp
 * @text Clamp Turn Effects
 * @parent OTB Mechanics Stun Wakeup First
 * @type boolean
 * @on On
 * @off Off
 * @desc Prevent others from going past waking battlers for turn manipulation effects
 * @default true
 *
 * @param OTB Visuals
 * @text Visuals
 * @parent Order Turn Battle
 *
 * @param OTB Sprite Background Colors
 * @text Sprite Background Colors
 * @parent OTB Visuals
 *
 * @param OTB Background Actor Color
 * @text Actors
 * @parent OTB Sprite Background Colors
 * @desc Background color used for actors in the turn order
 * @default rgba(128, 160, 255, 0.6)
 *
 * @param OTB Background Enemy Color
 * @text Enemies
 * @parent OTB Sprite Background Colors
 * @desc Background color used for enemies in the turn order
 * @default rgba(255, 100, 80, 0.6)
 *
 * @param OTB Turn Order Display
 * @text Turn Order Display
 * @parent OTB Visuals
 *
 * @param OTB Display X
 * @text Display X
 * @parent OTB Turn Order Display
 * @type number
 * @desc The x position of the Turn Order Display
 * @default 48
 *
 * @param OTB Display Y
 * @text Display Y
 * @parent OTB Turn Order Display
 * @type number
 * @desc The y position of the Turn Order Display
 * @default 18
 *
 * @param OTB Display Help Window Move Y
 * @text Move to Y (During)
 * @parent OTB Turn Order Display
 * @type number
 * @desc Move to this Y position when Help Window is open
 * @default 18
 *
 * @param OTB Display Help Window Move Speed
 * @text Move Speed (During)
 * @parent OTB Turn Order Display
 * @type number
 * @desc Move speed when Help Window is open
 * @default 16
 *
 * @param OTB Display Current Text
 * @text Current Turn Text
 * @parent OTB Turn Order Display
 * @desc Text to display for current turn
 * @default CURRENT
 *
 * @param OTB Display Current Size
 * @text Font Size
 * @parent OTB Display Current Text
 * @type number
 * @desc Font size for current turn text
 * @default 20
 *
 * @param OTB Display Next Text
 * @text Next Turn Text
 * @parent OTB Turn Order Display
 * @desc Text to display for next turn
 * @default NEXT
 *
 * @param OTB Display Next Size
 * @text Font Size
 * @parent OTB Display Next Text
 * @type number
 * @desc Font size for next turn text
 * @default 20
 *
 * @param OTB Sprite Properties
 * @text Sprite Properties
 * @parent OTB Visuals
 *
 * @param OTB Sprite Move Duration
 * @text Move Duration
 * @parent OTB Sprite Properties
 * @type number
 * @min 1
 * @desc Number of frames to move the sprite
 * @default 20
 *
 * @param OTB Sprite Opacity Speed
 * @text Opacity Speed
 * @parent OTB Sprite Properties
 * @type number
 * @min 1
 * @desc How fast the sprite changes its opacity
 * @default 16
 *
 * @param OTB Battle Scene Properties
 * @text Battle Scene
 * @parent OTB Visuals
 *
 * @param OTB Help Window Y
 * @text Help Window Y
 * @parent OTB Battle Scene Properties
 * @type number
 * @desc Y coordinate of the help window
 * @default 92
 *
 * @param OTB Log Window Y
 * @text Log Window Y
 * @parent OTB Battle Scene Properties
 * @type number
 * @desc Y coordinate of the log window
 * @default 92
 *
 * @param
 * @param
 *
 */
//=============================================================================

var Imported = Imported || {};
Imported.Olivia_OctoBattle = true;
var Olivia = Olivia || {};
Olivia.OctoBattle = Olivia.OctoBattle || {};
var parameters = $plugins.filter(function(plugin) {
    return plugin.description.contains('<OctoBattle>');
})[0].parameters;

Olivia.OctoBattle.WeaknessDisplay = {
    'Enabled': eval(parameters["Weakness Display"]),
    'ShownElements': JSON.parse(parameters["Shown Elements"]),
    'ElementIcons': JSON.parse(parameters["Element Icons"]),
    'UnknownIcon': Number(parameters["Unknown Weakness Icon"]),
    'AlwaysShow': eval(parameters["Weakness Always Show"]),
    'HideDuration': Number(parameters["Weakness Hide Duration"] || 90),
    'ShowBreakShield': eval(parameters["Weakness Show Break Shield"]),
    'ShowStunTurns': eval(parameters["Weakness Stun Duration"]),
    'ShowHpGauge': eval(parameters["Weakness Show HP Gauge"]),
    'HpGaugeMinWidth': Number(parameters["HP Gauge Minimum Width"] || 100),
    'HpGaugePadding': Number(parameters["HP Gauge Padding"] || 100),
    'ShowName': eval(parameters["Weakness Show Name"]),
    'NameFontSize': Number(parameters["Name Font Size"] || 22),
    'HpColor50': Number(parameters["50% HP Color"] || 17),
    'HpColor25': Number(parameters["25% HP Color"] || 18),
    'ShowStates': eval(parameters["Weakness Show States"] || "true"),
    'SmallWeakIcons': eval(parameters["Small Weakness Icons"]),
    'WeakIconSize': Number(parameters["Weak Icon Size"] || 0.6)
};

Olivia.OctoBattle.BreakShield = {
    'Enabled': eval(parameters["Break Shield System"]),
    'Actors': eval(parameters["Actor Shields"]),
    'DrawMenu': eval(parameters["Draw Menu Shields"]),
    'Enemies': eval(parameters["Enemy Shields"]),
    'BaseShields': Number(parameters["Base Shield Value"] || 0),
    'BreakReduce': Number(parameters["Break Reduction"] || 1),
    'MaxShields': Number(parameters["Max Break Shields"] || 99),
    'StunState': Number(parameters["Stun State ID"] || 1),
    'WeakRate': Number(parameters["Element Weakness Rate"] || 1.1),
    'ShieldIcon': Number(parameters["Shield Icon"] || 81),
    'StunIcon': Number(parameters["Stun Icon"] || 6),
    'ProtectIcon': Number(parameters["Protect Weakness Icon"] || 81),
    'IconFontSize': Number(parameters["Icon Font Size"] || 22),
    'ReduceAnimation': Number(parameters["Reduce Animation"] || 0),
    'BreakAnimation': Number(parameters["Break Animation"] || 0),
    'ShowActorShield': eval(parameters["Show Actor Shields"]),
    'ShowEnemyShield': eval(parameters["Show Enemy Shields"])
};

Olivia.OctoBattle.BoostPoint = {
    'Enabled': eval(parameters["Boost Point System"]),
    'BP_StartBattle': Number(parameters["Boost Point Start Battle"] || 1),
    'BP_TurnRegen': Number(parameters["Boost Point Regen"] || 1),
    'BP_AlwaysRegen': eval(parameters["Boost Point Always Regen"]),
    'BP_MaxStored': Number(parameters["Boost Point Maximum Stored"] || 5),
    'BP_MaxUse': Number(parameters["Boost Point Maximum Use"] || 3),
    'DeathRemoval': eval(parameters["Boost Point Death Removal"] || "false"),
    'DeathRegen': eval(parameters["Boost Point Death Regen"] || "false"),
    'BP_DmgMultiply': JSON.parse(parameters["Boost Point Damage Multipliers"] || "[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]"),
    'BP_DmgAddition': JSON.parse(parameters["Boost Point Damage Addition"] || "[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]"),
    'BP_RepMultiply': JSON.parse(parameters["Boost Point Repeat Multipliers"] || "[\"1\",\"1\",\"1\",\"1\",\"1\",\"1\",\"1\",\"1\",\"1\",\"1\"]"),
    'BP_RepAddition': JSON.parse(parameters["Boost Point Repeat Addition"] || "[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]"),
    'BP_TurnMultiply': JSON.parse(parameters["Boost Point Turn Multipliers"] || "[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]"),
    'BP_TurnAddition': JSON.parse(parameters["Boost Point Turn Addition"] || "[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]"),
    'BP_AnalyzeMultiply': JSON.parse(parameters["Boost Point Analyze Multipliers"] || "[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]"),
    'BP_AnalyzeAddition': JSON.parse(parameters["Boost Point Analyze Addition"] || "[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]"),
    'BP_BPEffectMultiply': JSON.parse(parameters["Boost Point BP Effect Multipliers"] || "[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]"),
    'BP_BPEffectAddition': JSON.parse(parameters["Boost Point BP Addition"] || "[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]"),
    'Animations': JSON.parse(parameters["Boost Point Animations"]),
    'ShowIcons': eval(parameters["Boost Point Show Icons"]),
    'BoostIcon': Number(parameters["Boost Point Icon Filled"] || 160),
    'EmptyIcon': Number(parameters["Boost Point Icon Empty"] || 161),
    'SmallIcon': eval(parameters["Small Boost Icons"]),
    'IconSize': Number(parameters["Boost Icon Size"] || 0.5),
    'SmallText': String(parameters["Boost Point Small Text"]),
    'TextAlign': String(parameters["Boost Point Small Text Align"]),
    'BoostCmd': String(parameters["Boost Point Boost Command"]),
    'BoostShow': eval(parameters["Boost Point Boost Command Show"]),
    'UnboostCmd': String(parameters["Boost Point Unboost Command"]),
    'UnboostShow': eval(parameters["Boost Point Unboost Command Show"]),
    'LRButtons': eval(parameters["Boost Point LR Buttons"])
};

Olivia.OctoBattle.WeaponSwap = {
    'Enabled': eval(parameters["Weapon Swap System"]),
    'WpnSwapCmd': String(parameters["Weapon Swap Command"]),
    'WpnSwapShow': eval(parameters["Weapon Swap Show Command"]),
    'WpnSwapArrows': eval(parameters["Weapon Swap Arrow Buttons"]),
    'ShowArrows': eval(parameters["Weapon Swap Show Arrows"] || "false"),
    'WpnBattleTest': eval(parameters["Weapon Swap Battle Test"] || "false"),
    'ShowIcons': eval(parameters["Weapon Swap Battle Icons"]),
    'BattleAction': eval(parameters["Weapon Swap Battle Action"]),
    'ExtraLines': eval(parameters["Weapon Swap Equip Core Window"] || 'true'),
    'TextHit': String(parameters["Weapon Swap Text Hit"] || 'ACC'),
    'TextEva': String(parameters["Weapon Swap Text Evasion"] || 'EVA'),
    'TextCri': String(parameters["Weapon Swap Text Critical"] || 'CRI')
};

Olivia.OctoBattle.SideBattleUI = {
    'Enabled': eval(parameters["Side Battle UI"]),
    'DimHelpWindow': eval(parameters["Side Battle Dim Help Window"]),
    'WindowMasking': eval(parameters["Side Battle Window Masking"]),
    'WindowScale': Number(parameters["Side Battle Command Window Scale"] || 0.8),
    'WindowCmdWidth': Number(parameters["Side Battle Command Window Width"] || 160),
    'WindowMaxList': Number(parameters["Side Battle List Window Max"] || 8),
    'WindowListWidth': Number(parameters["Side Battle List Window Width"] || 320),
    'CeilingBuffer': Number(parameters["Side Battle Ceiling Distance"] || 0),
    'StatusScale': Number(parameters["Side Battle Status Scale"] || 0.6),
    'StatusWidth': Number(parameters["Side Battle Status Width"] || 200),
    'GaugeWidth': Number(parameters["Side Battle Gauge Width"] || 160),
    'GaugeHeight': Number(parameters["Side Battle Gauge Height"] || 6),
    'StatesMax': Number(parameters["Side Battle Status States Max"] || 4),
    'ActiveBattlerMove': Number(parameters["Side Battle Status Move Active"] || 48),
    'SelectBattlerMove': Number(parameters["Side Battle Status Move Selected"] || 24),
    'WindowMoveSpeed': Number(parameters["Side Battle Status Move Speed"] || 4),
    'PositionActors': eval(parameters["Side Battle Position Actors"]),
    'ActorPositionFormulaX': String(parameters["Side Battle Actor X"]),
    'ActorPositionFormulaY': String(parameters["Side Battle Actor Y"]),
    'PositionEnemies': eval(parameters["Side Battle Position Enemies"]),
    'EnemyPositionFormulaX': String(parameters["Side Battle Enemy X"]),
    'EnemyPositionFormulaY': String(parameters["Side Battle Enemy Y"])
};

Olivia.OctoBattle.VictoryUI = {
    'Enabled': eval(parameters["Victory Screen UI"]),
    'LevelUpSound': {
        'name': String(parameters["Victory Screen Level Sound"]),
        'volume': Number(parameters["Victory Screen Level Sound Volume"]),
        'pitch': Number(parameters["Victory Screen Level Sound Pitch"]),
        'pan': Number(parameters["Victory Screen Level Sound Pan"])
    },
    'VictoryBgm': {
        'name': String(parameters["Victory Screen BGM"]),
        'volume': Number(parameters["Victory Screen BGM Volume"]),
        'pitch': Number(parameters["Victory Screen BGM Pitch"]),
        'pan': Number(parameters["Victory Screen BGM Pan"])
    },
    'TransitionPower': Number(parameters["Victory Screen Transition Power"]),
    'WaitHideWindows': Number(parameters["Victory Screen Hide Window Delay"]),
    'WaitDisplayVictory': Number(parameters["Victory Screen Display Delay"]),
    'ZoomInTransition': eval(parameters["Victory Screen Zoom"]),
    'ZoomX': Number(parameters["Victory Screen Zoom X"]),
    'ZoomY': Number(parameters["Victory Screen Zoom Y"]),
    'ZoomScale': Number(parameters["Victory Screen Zoom Scale"]),
    'ZoomDuration': Number(parameters["Victory Screen Zoom Duration"]),
    'BackgroundDimHeight': Number(parameters["Victory Screen Background Dimmer Height"]),
    'SideThickness': Number(parameters["Victory Screen Background Side Thickness"]),
    'MiddleThickness': Number(parameters["Victory Screen Background Middle Thickness"]),
    'TextItems': String(parameters["Victory Screen Background Text Items"]),
    'TextItemsFontSize': Number(parameters["Victory Screen Background Text Items Font Size"]),
    'TextVictory': String(parameters["Victory Screen Background Text Victory"]),
    'TextVictoryFontSize': Number(parameters["Victory Screen Background Text Victory Font Size"]),
    'RewardCategoryFontSize': Number(parameters["Victory Screen Rewards Category Font Size"]),
    'RewardCategoryFontColor': Number(parameters["Victory Screen Rewards Category Font Color"]),
    'RewardResultsFontSize': Number(parameters["Victory Screen Rewards Results Font Size"]),
    'RewardResultsFontColor': Number(parameters["Victory Screen Rewards Results Font Color"]),
    'ActorNameFontSize': Number(parameters["Victory Screen Status Actor Font Size"]),
    'ActorLevelFontSize': Number(parameters["Victory Screen Status Level Font Size"]),
    'ActorLevelFormat': String(parameters["Victory Screen Status Level Format"]),
    'ActorJPFontSize': Number(parameters["Victory Screen Status JP Font Size"]),
    'ActorEXPFontSize': Number(parameters["Victory Screen Status EXP Font Size"]),
    'ActorUpdateDuration': Number(parameters["Victory Screen Status Update Duration"]),
    'ExpCurrentFontSize': Number(parameters["Victory Screen Status Current EXP Font Size"]),
    'ExpCurrentFontColor': Number(parameters["Victory Screen Status Current EXP Font Color"]),
    'ExpNextFontSize': Number(parameters["Victory Screen Status Next EXP Font Size"]),
    'ExpNextFontColor': Number(parameters["Victory Screen Status Next EXP Font Color"]),
    'ExpGaugeHeight': Number(parameters["Victory Screen Status Exp Gauge Height"]),
    'ExpGaugeColor1': Number(parameters["Victory Screen Status Exp Gauge Color 1"]),
    'ExpGaugeColor2': Number(parameters["Victory Screen Status Exp Gauge Color 2"]),
    'LevelUpText': String(parameters["Victory Screen Status Level Up Text"]),
    'LevelUpTextFontSize': Number(parameters["Victory Screen Status Level Up Font Size"]),
    'LevelUpTextColor': Number(parameters["Victory Screen Status Level Up Color"]),
    'ContinueDuration': Number(parameters["Victory Screen Continue Duration"]),
    'ContinueText': String(parameters["Victory Screen Continue Text"])
};

Olivia.OctoBattle.BattleEffects = {
    'Enabled': eval(parameters["Battle Effects Pack"]),
    'WeakPopupEnabled': eval(parameters["Battle Effects Weak Popups"]),
    'WeakPopupReqRate': Number(parameters["Battle Effects Weak Popup Require Rate"] || 1.1),
    'WeakCellX': Number(parameters["Battle Effects Weak Popup Cell X"] || 4),
    'WeakCellWidth': Number(parameters["Battle Effects Weak Popup Cell Width"] || 3),
    'WeakCellXFactor': Number(parameters["Battle Effects Weak Popup Cell X Factor"] || 0.25),
    'WeakCellYFactor': Number(parameters["Battle Effects Weak Popup Cell Y Factor"] || 0.6),
    'WeakMoveXBase': Number(parameters["Battle Effects Weak Popup Move X Base"] || -0.04),
    'WeakMoveXRate': Number(parameters["Battle Effects Weak Popup Move X Rate"] || 1.1),
    'WeakMoveYBase': Number(parameters["Battle Effects Weak Popup Move Y Base"] || 0),
    'WeakMoveYRate': Number(parameters["Battle Effects Weak Popup Move Y Rate"] || 0),
    'BreakPopupEnabled': eval(parameters["Battle Effects Break Popups"]),
    'BreakCellX': Number(parameters["Battle Effects Break Popup Cell X"] || 7),
    'BreakCellWidth': Number(parameters["Battle Effects Break Popup Cell Width"] || 3),
    'BreakCellXFactor': Number(parameters["Battle Effects Break Popup Cell X Factor"] || 0.25),
    'BreakCellYFactor': Number(parameters["Battle Effects Break Popup Cell Y Factor"] || 0.6),
    'BreakMoveXBase': Number(parameters["Battle Effects Break Popup Move X Base"] || -0.04),
    'BreakMoveXRate': Number(parameters["Battle Effects Break Popup Move X Rate"] || 1.1),
    'BreakMoveYBase': Number(parameters["Battle Effects Break Popup Move Y Base"] || 0),
    'BreakMoveYRate': Number(parameters["Battle Effects Break Popup Move Y Rate"] || 0),
    'StackBuffTurns': eval(parameters["Battle Effects Stack Buff Turns"]),
    'MaxBuffTurns': Number(parameters["Battle Effects Max Buff Turns"] || 9),
    'StackDebuffTurns': eval(parameters["Battle Effects Stack Debuff Turns"]),
    'MaxDebuffTurns': Number(parameters["Battle Effects Max Buff Turns"] || 9)
};

Olivia.OctoBattle.OTB = {
    'Enabled': eval(parameters["Order Turn Battle"]),
    'ForceBattleSystem': eval(parameters["OTB Force Battle System"]),
    'ActionSpeedConvert': eval(parameters["OTB Mechanics Action Speed Convert"]),
    'BuffDebuffAgiConvert': eval(parameters["OTB Mechanics Buff Debuff AGI Convert"]),
    'AddedActionTimes': eval(parameters["OTB Mechanics Added Action Times"]),
    'ActionTimeOrderRandomize': eval(parameters["OTB Mechanics Action Time Order Randomize"]),
    'EnablePartyWindow': eval(parameters["OTB Mechanics Enable Party Window"]),
    'EscapeActorWindow': eval(parameters["OTB Mechanics Escape Actor Window"]),
    'RemoveRestrictCurrent': eval(parameters["OTB Mechanics Remove Restrict Current"]),
    'RemoveRestrictNext': eval(parameters["OTB Mechanics Remove Restrict Next"]),
    'StaticAgiCalculation': eval(parameters["OTB Mechanics Static AGI Calculation"]),
    'StunWakeUpFirst': eval(parameters["OTB Mechanics Stun Wakeup First"]),
    'StunWakeUpClamp': eval(parameters["OTB Mechanics Stun Wakeup Clamp"]),
    'BackgroundActorColor': String(parameters["OTB Background Actor Color"]),
    'BackgroundEnemyColor': String(parameters["OTB Background Enemy Color"]),
    'DisplayX': Number(parameters["OTB Display X"]),
    'DisplayY': Number(parameters["OTB Display Y"]),
    'HelpWindowMoveY': Number(parameters["OTB Display Help Window Move Y"]),
    'HelpWindowMoveSpeed': Number(parameters["OTB Display Help Window Move Speed"]),
    'CurrentTurnText': String(parameters["OTB Display Current Text"]),
    'CurrentTurnFontSize': Number(parameters["OTB Display Current Size"]),
    'NextTurnText': String(parameters["OTB Display Next Text"]),
    'NextTurnFontSize': Number(parameters["OTB Display Next Size"]),
    'MoveDuration': Number(parameters["OTB Sprite Move Duration"]),
    'OpacitySpeed': Number(parameters["OTB Sprite Opacity Speed"]),
    'HelpWindowNewY': Number(parameters["OTB Help Window Y"]),
    'LogWindowNewY': Number(parameters["OTB Log Window Y"])
};

//=============================================================================
// Weakness Display
//
// 1. Reveal corresponding weakness when struck with elemental damage.
// 2. Display data according to the elements revealed about that enemy.
// 3. Analyze effects to reveal more weaknesses.

if (Olivia.OctoBattle.WeaknessDisplay.Enabled) {
  Olivia.OctoBattle.Weakness = Olivia.OctoBattle.Weakness || {};

  BattleManager.revealWeaknessByVariable = function(variableId) {
    var value = $gameVariables.value(variableId);
    this.revealWeakness(value);
  };

  BattleManager.revealWeakness = function(elements) {
    var members = $gameTroop.members();
    var processed = [];
    for (var i = 0; i < members.length; i++) {
      var enemy = members[i];
      if (!!enemy && !processed.contains(enemy.enemyId())) {
        enemy.revealNewWeaknesses(elements);
        processed.push(enemy.enemyId());
      }
    }
  };

  Olivia.OctoBattle.Weakness.___Game_System_initialize___ = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    Olivia.OctoBattle.Weakness.___Game_System_initialize___.call(this);
    this.initializeRevealedEnemyWeaknesses();
  };

  Game_System.prototype.initializeRevealedEnemyWeaknesses = function() {
    this._revealedEnemyWeaknesses = this._revealedEnemyWeaknesses || {};
  };

  Game_System.prototype.addEnemyWeaknessElement = function(enemyId, elementId) {
    if (this._revealedEnemyWeaknesses === undefined) {
      this.initializeRevealedEnemyWeaknesses();
    }
    this._revealedEnemyWeaknesses[enemyId] = this._revealedEnemyWeaknesses[enemyId] || [];
    if (!this._revealedEnemyWeaknesses[enemyId].contains(elementId)) {
      this._revealedEnemyWeaknesses[enemyId].push(elementId);
    }
    this._revealedEnemyWeaknesses[enemyId].sort(function(a, b) {
      return a - b;
    });
  };

  Game_System.prototype.getRevealedEnemyWeaknesses = function(enemyId) {
    if (this._revealedEnemyWeaknesses === undefined) {
      this.initializeRevealedEnemyWeaknesses();
    }
    this._revealedEnemyWeaknesses[enemyId] = this._revealedEnemyWeaknesses[enemyId] || [];
    return this._revealedEnemyWeaknesses[enemyId];
  };

  Olivia.OctoBattle.Weakness.___Game_Action_apply___ = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function(target) {
    Olivia.OctoBattle.Weakness.___Game_Action_apply___.call(this, target);
    target.revealWeaknessDisplay();
  };

  Olivia.OctoBattle.Weakness.___Game_Action_executeDamage___ = Game_Action.prototype.executeDamage;
  Game_Action.prototype.executeDamage = function(target, value) {
    Olivia.OctoBattle.Weakness.___Game_Action_executeDamage___.call(this, target, value);
    if (!!target && target.isEnemy() && value !== 0) {
      this.addEnemyWeaknessElement(target);
    }
  };

  Game_Action.prototype.addEnemyWeaknessElement = function(target) {
    if (Imported.YEP_ElementCore) {
      var elements = this.getItemElements();
    } else {
      var elementId = this.item().damage.elementId;
      if (elementId < 0) {
        var elements = this.subject().attackElements();
      } else {
        var elements = [elementId];
      }
    }
    for (var i = 0; i < elements.length; i++) {
      var elementId = elements[i];
      if (elementId > 0) {
        $gameSystem.addEnemyWeaknessElement(target.enemyId(), elementId);
      }
    }
  };

  Olivia.OctoBattle.Weakness.___Game_Action_applyItemUserEffect___ = Game_Action.prototype.applyItemUserEffect;
  Game_Action.prototype.applyItemUserEffect = function(target) {
    Olivia.OctoBattle.Weakness.___Game_Action_applyItemUserEffect___.call(this, target);
    if (target.isEnemy()) {
      this.applyWeaknessAnalyze(target);
    }
  };

  Game_Action.prototype.applyWeaknessAnalyze = function(target) {
    if (this.item().note.match(/<Analyze (?:Weakness|Weaknesses): (\d+)>/i)) {
      var count = parseInt(RegExp.$1);
      if (Olivia.OctoBattle.BoostPoint && this.item().note.match(/<(?:BP|Boost) Analyze>/i)) {
        var multiplier = this.subject().multiplierForBP('Analyze');
        count = Math.round(multiplier * count);
        count += this.subject().additionForBP('Analyze');
      }
      target.revealNewWeaknesses(count);
    }
  };

  Olivia.OctoBattle.Weakness.___Game_BattlerBase_refresh___ = Game_BattlerBase.prototype.refresh;
  Game_BattlerBase.prototype.refresh = function() {
    Olivia.OctoBattle.Weakness.___Game_BattlerBase_refresh___.call(this);
    $gameTemp._needRefreshAllEnemyWeaknessWindows = true;
  };

  Olivia.OctoBattle.Weakness.___Game_Battler_startAnimation___ = Game_Battler.prototype.startAnimation;
  Game_Battler.prototype.startAnimation = function(animationId, mirror, delay) {
    Olivia.OctoBattle.Weakness.___Game_Battler_startAnimation___.call(this, animationId, mirror, delay);
    this.revealWeaknessDisplay();
  };

  Game_Battler.prototype.revealWeaknessDisplay = function() {
    if (this.isEnemy()) {
      this._showWeaknessDisplay = Olivia.OctoBattle.WeaknessDisplay.HideDuration;
    }
  };

  Game_Enemy.prototype.getWeaknessElements = function() {
    var elements = [];
    for (var i = 0; i < Olivia.OctoBattle.WeaknessDisplay.ShownElements.length; i++) {
      var element = Number(Olivia.OctoBattle.WeaknessDisplay.ShownElements[i]);
      if (Olivia.OctoBattle.BreakShield && Olivia.OctoBattle.BreakShield.Enabled) {
        if (this.originalElementRate(element) >= Olivia.OctoBattle.BreakShield.WeakRate) {
          elements.push(element);
        }
      } else {
        if (this.elementRate(element) >= 1.1) {
          elements.push(element);
        }
      }
    }
    return elements;
  };

  Game_Enemy.prototype.isShowWeaknessHpGauge = function() {
    if (this.enemy().note.match(/<No HP Gauge>/i)) {
      return false;
    } else if (this.enemy().note.match(/<Show HP Gauge>/i)) {
      return true;
    } else if (this.enemy().note.match(/<Hide HP Gauge>/i)) {
      return false;
    }
    return Olivia.OctoBattle.WeaknessDisplay.ShowHpGauge;
  };

  Game_Enemy.prototype.revealNewWeaknesses = function(count) {
    var allWeak = this.getWeaknessElements();
    var revealed = $gameSystem.getRevealedEnemyWeaknesses(this.enemyId());
    var unrevealed = [];
    for (var i = 0; i < allWeak.length; i++) {
      var element = allWeak[i];
      if (!revealed.contains(element)) {
        unrevealed.push(element);
      }
    }
    while (count > 0) {
      if (unrevealed.length <= 0) {
        break;
      }
      count -= 1;
      var index = Math.floor(Math.random() * unrevealed.length);
      var element = unrevealed[index];
      $gameSystem.addEnemyWeaknessElement(this.enemyId(), element);
      unrevealed.splice(index, 1);
      this.revealWeaknessDisplay();
    }
    $gameTemp._needRefreshAllEnemyWeaknessWindows = true;
  };

  Olivia.OctoBattle.Weakness.___Spriteset_Battle_update___ = Spriteset_Battle.prototype.update;
  Spriteset_Battle.prototype.update = function() {
    Olivia.OctoBattle.Weakness.___Spriteset_Battle_update___.call(this);
    this.updateEnemyWeaknessWindows();
  };

  Spriteset_Battle.prototype.updateEnemyWeaknessWindows = function() {
    if ($gameTemp._needRefreshAllEnemyWeaknessWindows === true) {
      for (var i = 0; i < this._enemySprites.length; i++) {
        var sprite = this._enemySprites[i];
        if (!!sprite && !!sprite._weaknessWindow) {
          sprite._weaknessWindow.refresh();
          if (sprite._weaknessWindow._added === false) {
            this._baseSprite.addChild(sprite._weaknessWindow);
          }
        }
      }
      $gameTemp._needRefreshAllEnemyWeaknessWindows = false;
    }
  };

  Olivia.OctoBattle.Weakness.___Sprite_Enemy_initMembers___ = Sprite_Enemy.prototype.initMembers;
  Sprite_Enemy.prototype.initMembers = function() {
    Olivia.OctoBattle.Weakness.___Sprite_Enemy_initMembers___.call(this);
    this.createWeaknessDisplayWindow();
  };

  Sprite_Enemy.prototype.createWeaknessDisplayWindow = function() {
    this._weaknessWindow = new Window_WeaknessDisplay(this._enemy, this);
    this._weaknessWindow.refresh();
    this._weaknessWindow._added = false;
    if (Olivia.OctoBattle.WeaknessDisplay.ShowStates) {
      this._stateIconSprite.opacity = 0;
    }
  };

  Olivia.OctoBattle.Weakness.___Sprite_Enemy_setBattler___ = Sprite_Enemy.prototype.setBattler;
  Sprite_Enemy.prototype.setBattler = function(battler) {
    Olivia.OctoBattle.Weakness.___Sprite_Enemy_setBattler___.call(this, battler);
    if (!!this._weaknessWindow) {
      this._weaknessWindow.setSubject(battler);
    }
  };

  function Window_WeaknessDisplay() {
    this.initialize.apply(this, arguments);
  }

  Window_WeaknessDisplay.prototype = Object.create(Window_Base.prototype);
  Window_WeaknessDisplay.prototype.constructor = Window_WeaknessDisplay;

  Window_WeaknessDisplay.prototype.initialize = function(subject, sprite) {
    this._subject = subject;
    this._sprite = sprite;
    var width = Math.ceil(Graphics.boxWidth / 2);
    var height = this.fittingHeight(2);
    this.setCalculationConstants();
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.createStateIconSprite();
    this.opacity = 0;
    this.refresh();
  };

  Window_WeaknessDisplay.prototype.standardPadding = function() {
    return 0;
  };

  Window_WeaknessDisplay.prototype.setCalculationConstants = function() {
    this._factorX = -1 * Math.ceil(Graphics.boxWidth * 0.25);
    this._factorY = -1 * Math.round(this.lineHeight() * 0.75);
  };

  Window_WeaknessDisplay.prototype.createStateIconSprite = function() {
    if (Olivia.OctoBattle.WeaknessDisplay) {
      this._stateIconSprite = new Sprite_StateIcon();
      this.addChild(this._stateIconSprite);
      this._stateIconSprite.x = this.width / 2;
      this._stateIconSprite.y = 0;
    }
  };

  Window_WeaknessDisplay.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (!!this._subject) {
      this.updatePosition();
      this.updateOpacity();
    }
  };

  Window_WeaknessDisplay.prototype.updatePosition = function() {
    this.x = this._sprite.x + this._factorX;
    this.y = this._sprite.y + this._factorY;
  };

  Window_WeaknessDisplay.prototype.updateOpacity = function() {
    if (this._subject.isHidden() || this._subject.isDead()) {
      this.contentsOpacity -= 16;
    } else if (this._subject.battler() && this._subject.battler().opacity <= 0) {
      this.contentsOpacity -= 10;
    } else if (Olivia.OctoBattle.WeaknessDisplay.AlwaysShow) {
      this.contentsOpacity = 255;
    } else if (this._subject.isSelected()) {
      this.contentsOpacity = 255;
    } else if (this._subject._showWeaknessDisplay > 0) {
      this.contentsOpacity = 255;
      this._subject._showWeaknessDisplay -= 1;
    } else {
      this.contentsOpacity -= 16;
    }
    if (!!this._stateIconSprite) {
      this._stateIconSprite.opacity = this.contentsOpacity;
    }
  };

  Window_WeaknessDisplay.prototype.setSubject = function(subject) {
    this._subject = subject;
    this._subject._showWeaknessDisplay = this._subject._showWeaknessDisplay || Olivia.OctoBattle.WeaknessDisplay.HideDuration;
    if (!!this._stateIconSprite) {
      this._stateIconSprite.setup(this._subject);
    }
    if (this._subject.isHidden()) {
      this.contentsOpacity = 0;
    }
    this.refresh();
  };

  Window_WeaknessDisplay.prototype.refresh = function() {
    this.contents.clear();
    if (!!this._subject) {
      this.drawHpGauge();
      this.drawSubjectName();
      this.drawBreakShield();
      this.drawWeaknessIcons();
      if (!!this._stateIconSprite) {
        this.moveStateSprite();
      }
    }
  };

  Window_WeaknessDisplay.prototype.drawHpGauge = function() {
    if (Olivia.OctoBattle.WeaknessDisplay.ShowHpGauge) {
      if (Olivia.OctoBattle.WeaknessDisplay.ShowName) {
        this.resetFontSettings();
        this.contents.fontSize = Olivia.OctoBattle.WeaknessDisplay.NameFontSize;
        var gaugeWidth = this.textWidth(this._subject.name());
        this.resetFontSettings();
        gaugeWidth = Math.max(Olivia.OctoBattle.WeaknessDisplay.HpGaugeMinWidth, gaugeWidth);
      } else {
        var gaugeWidth = Olivia.OctoBattle.WeaknessDisplay.HpGaugeMinWidth;
      }
      gaugeWidth += 2 * Olivia.OctoBattle.WeaknessDisplay.HpGaugePadding;
      this._hpGaugeWidth = gaugeWidth;
      var x = Math.round((this.contentsWidth() - gaugeWidth) / 2);
      var rate = this._subject.hpRate();
      var color1 = this.hpGaugeColor1();
      var color2 = this.hpGaugeColor2();
      this.drawGauge(x, 0, gaugeWidth, rate, color1, color2);
    } else {
      this._hpGaugeWidth = 0;
    }
  };

  Window_WeaknessDisplay.prototype.drawSubjectName = function() {
    if (Olivia.OctoBattle.WeaknessDisplay.ShowName) {
      this.resetFontSettings();
      this.contents.fontSize = Olivia.OctoBattle.WeaknessDisplay.NameFontSize;
      if (this._subject.hpRate() > 0.5) {
        this.changeTextColor(this.normalColor());
      } else if (this._subject.hpRate() > 0.25) {
        this.changeTextColor(this.textColor(Olivia.OctoBattle.WeaknessDisplay.HpColor50));
      } else {
        this.changeTextColor(this.textColor(Olivia.OctoBattle.WeaknessDisplay.HpColor25));
      }
      this.drawText(this._subject.name(), 0, 0, this.contentsWidth(), 'center');
      this.resetFontSettings();
    }
  };

  Window_WeaknessDisplay.prototype.drawBreakShield = function() {
    if (Olivia.OctoBattle.WeaknessDisplay.ShowBreakShield && Olivia.OctoBattle.BreakShield && Olivia.OctoBattle.BreakShield.Enabled && Olivia.OctoBattle.BreakShield.Enemies) {
      if (Olivia.OctoBattle.WeaknessDisplay.ShowName) {
        this.resetFontSettings();
        this.contents.fontSize = Olivia.OctoBattle.WeaknessDisplay.NameFontSize;
        var nameWidth = this.textWidth(this._subject.name());
        this.resetFontSettings();
        nameWidth = Math.max(this._hpGaugeWidth, nameWidth);
        var x = Math.round((this.contentsWidth() - nameWidth) / 2) - Window_Base._iconWidth - 2;
      } else if (Olivia.OctoBattle.WeaknessDisplay.ShowStates && this._subject.allIcons().length > 0) {
        var x = Math.round(this.contentsWidth() / 2) - Window_Base._iconWidth;
      } else {
        var x = Math.round((this.contentsWidth() - Window_Base._iconWidth) / 2);
      }
      this.drawBreakShieldIcon(this._subject, x, 0);
    }
  };

  Window_WeaknessDisplay.prototype.moveStateSprite = function() {
    var x = Math.round(this.contentsWidth() / 2);
    var y = Math.round(this.lineHeight() / 2) - 2;
    if (Olivia.OctoBattle.WeaknessDisplay.ShowHpGauge) {
      if (Olivia.OctoBattle.WeaknessDisplay.ShowName) {
        this.resetFontSettings();
        this.contents.fontSize = Olivia.OctoBattle.WeaknessDisplay.NameFontSize;
        var gaugeWidth = this.textWidth(this._subject.name());
        this.resetFontSettings();
        gaugeWidth = Math.max(Olivia.OctoBattle.WeaknessDisplay.HpGaugeMinWidth, gaugeWidth);
      } else {
        var gaugeWidth = Olivia.OctoBattle.WeaknessDisplay.HpGaugeMinWidth;
      }
      gaugeWidth += 2 * Olivia.OctoBattle.WeaknessDisplay.HpGaugePadding + 2;
      x += Math.round(gaugeWidth / 2) + Math.round(Window_Base._iconWidth / 2);
    } else if (Olivia.OctoBattle.WeaknessDisplay.ShowName) {
      this.resetFontSettings();
      this.contents.fontSize = Olivia.OctoBattle.WeaknessDisplay.NameFontSize;
      var gaugeWidth = this.textWidth(this._subject.name()) + Window_Base._iconWidth + 4;
      this.resetFontSettings();
      x += Math.round(gaugeWidth / 2);
    } else if (Olivia.OctoBattle.WeaknessDisplay.ShowBreakShield) {
      x += Math.round(Window_Base._iconWidth / 2);
    } else {
      y -= this.lineHeight();
    }
    this._stateIconSprite.x = x;
    this._stateIconSprite.y = y;
  };

  Window_WeaknessDisplay.prototype.showBreakStunDuration = function() {
    return Olivia.OctoBattle.WeaknessDisplay.ShowStunTurns;
  };

  Window_WeaknessDisplay.prototype.drawWeaknessIcons = function() {
    var elements = this._subject.getWeaknessElements();
    var iconWidth = Window_Base._iconWidth;
    if (Olivia.OctoBattle.WeaknessDisplay.SmallWeakIcons) {
      iconWidth = Math.round(iconWidth * Olivia.OctoBattle.WeaknessDisplay.WeakIconSize);
    }
    var totalWidth = elements.length * iconWidth;
    var startX = Math.round((this.contentsWidth() - totalWidth) / 2);
    if (!Olivia.OctoBattle.WeaknessDisplay.ShowName && !Olivia.OctoBattle.WeaknessDisplay.ShowBreakShield && !Olivia.OctoBattle.WeaknessDisplay.ShowHpGauge) {
      var y = 0;
    } else {
      var y = this.lineHeight();
    }
    var revealed = $gameSystem.getRevealedEnemyWeaknesses(this._subject.enemyId());
    if (Olivia.OctoBattle.BreakShield && Olivia.OctoBattle.BreakShield.Enabled) {
      var protectedElements = this._subject.getProtectedWeaknessElements();
    }
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (revealed.contains(element)) {
        var index = Olivia.OctoBattle.WeaknessDisplay.ShownElements.indexOf(String(element));
        var iconIndex = Number(Olivia.OctoBattle.WeaknessDisplay.ElementIcons[index]);
      } else {
        var iconIndex = Olivia.OctoBattle.WeaknessDisplay.UnknownIcon;
      }
      if (Olivia.OctoBattle.WeaknessDisplay.SmallWeakIcons) {
        this.drawSmallIcon(iconIndex, startX, y);
      } else {
        this.drawIcon(iconIndex, startX, y);
      }
      if (Olivia.OctoBattle.BreakShield && Olivia.OctoBattle.BreakShield.Enabled && protectedElements.contains(element)) {
        var iconIndex = Olivia.OctoBattle.BreakShield.ProtectIcon;
        if (Olivia.OctoBattle.WeaknessDisplay.SmallWeakIcons) {
          this.drawSmallIcon(iconIndex, startX, y);
        } else {
          this.drawIcon(iconIndex, startX, y);
        }
      }
      startX += iconWidth;
    }
  };

  Window_WeaknessDisplay.prototype.drawSmallIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var iconWidth = Window_Base._iconWidth;
    var iconHeight = Window_Base._iconHeight;
    var sx = iconIndex % 16 * iconWidth;
    var sy = Math.floor(iconIndex / 16) * iconHeight;
    var scale = Olivia.OctoBattle.WeaknessDisplay.WeakIconSize;
    this.contents.blt(bitmap, sx, sy, iconWidth, iconHeight, x, y, Math.round(iconWidth * scale), Math.round(iconHeight * scale));
  };

  if (Imported.YEP_BattleEngineCore) {
    Window_EnemyVisualSelect.prototype.refresh = function() {};
  }
}
//=============================================================================
// Break Shield System
//
// 1. Each target has a shield value
// 2. Shield value goes down whenever a weakness is struck
// 3. When shield value reaches 0, the target becomes stunned

if (Olivia.OctoBattle.BreakShield.Enabled) {
  Olivia.OctoBattle.Shields = Olivia.OctoBattle.Shields || {};

  Olivia.OctoBattle.Shields.___BattleManager_setup___ = BattleManager.setup;
  BattleManager.setup = function(troopId, turnCount, battleEvents) {
    Olivia.OctoBattle.Shields.___BattleManager_setup___.call(this, troopId, turnCount, battleEvents);
    $gameParty.resetBreakShields();
    $gameTroop.resetBreakShields();
  };

  Olivia.OctoBattle.Shields.___Game_Action_executeDamage___ = Game_Action.prototype.executeDamage;
  Game_Action.prototype.executeDamage = function(target, value) {
    Olivia.OctoBattle.Shields.___Game_Action_executeDamage___.call(this, target, value);
    if (!!target && value > 0 && target.isAffectedByBreakShield() && this.isHpEffect()) {
      this.executeBreakShieldReduction(target, value);
    }
  };

  Game_Action.prototype.executeBreakShieldReduction = function(target, value) {
    if (!target.isBreakStunned()) {
      var rate = this.calcElementRate(target);
      if (rate >= Olivia.OctoBattle.BreakShield.WeakRate) {
        var reduction = -1 * this.itemBreakShieldReduction();
        target.startBreakShieldReduceAnimation();
        target.alterBreakShield(reduction);
      }
    }
  };

  Game_Action.prototype.itemBreakShieldReduction = function() {
    if (this.item().note.match(/<Break (?:Reduce|Reduction): (\d+)>/i)) {
      return parseInt(RegExp.$1);
    } else {
      return Olivia.OctoBattle.BreakShield.BreakReduce;
    }
  };

  Olivia.OctoBattle.Shields.___Game_Action_applyItemUserEffect___ = Game_Action.prototype.applyItemUserEffect;
  Game_Action.prototype.applyItemUserEffect = function(target) {
    Olivia.OctoBattle.Shields.___Game_Action_applyItemUserEffect___.call(this, target);
    if (!!target && target.isAffectedByBreakShield()) {
      this.applyChangeBreakShield(target);
    }
  };

  Game_Action.prototype.applyChangeBreakShield = function(target) {
    if (!target.isBreakStunned()) {
      if (this.item().note.match(/<(?:Set|Change) Break (?:Shield|Shields): (\d+)>/i)) {
        target.setBreakShield(parseInt(RegExp.$1));
        $gameTemp._needRefreshAllEnemyWeaknessWindows = true;
      }
      if (this.item().note.match(/<(?:Increase|Decrease|Change) Break (?:Shield|Shields): ([\+\-]\d+)>/i)) {
        target.alterBreakShield(parseInt(RegExp.$1));
        $gameTemp._needRefreshAllEnemyWeaknessWindows = true;
      }
    }
  };

  Olivia.OctoBattle.Shields.___Game_BattlerBase_elementRate___ = Game_BattlerBase.prototype.elementRate;
  Game_BattlerBase.prototype.elementRate = function(elementId) {
    var rate = Olivia.OctoBattle.Shields.___Game_BattlerBase_elementRate___.call(this, elementId);
    if (this.getProtectedWeaknessElements().contains(elementId)) {
      return Math.min(1, rate);
    } else {
      return rate;
    }
  };

  Game_BattlerBase.prototype.originalElementRate = function(elementId) {
    return Olivia.OctoBattle.Shields.___Game_BattlerBase_elementRate___.call(this, elementId);
  };

  Olivia.OctoBattle.Shields.___Game_Battler_removeBattleStates___ = Game_Battler.prototype.removeBattleStates;
  Game_Battler.prototype.removeBattleStates = function() {
    Olivia.OctoBattle.Shields.___Game_Battler_removeBattleStates___.call(this);
    this.resetBreakShield();
  };

  Game_Battler.prototype.resetBreakShield = function() {
    if (this.isAffectedByBreakShield()) {
      this.setBreakShield(this.topBreakShield());
      this.refresh();
    }
  };

  Game_Battler.prototype.baseBreakShield = function() {
    return Olivia.OctoBattle.BreakShield.BaseShields;
  };

  Game_Battler.prototype.topBreakShield = function() {
    var value = this.baseBreakShield();
    value = this.addedBreakShields(value);
    return Math.max(1, value);
  };

  Game_Battler.prototype.addedBreakShields = function(value) {
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      if (!!state && state.note.match(/<Break (?:Shield|Shields): ([\+\-]\d+)>/i)) {
        value += parseInt(RegExp.$1);
      }
    }
    return value;
  };

  Game_Battler.prototype.currentBreakShield = function() {
    if (this._currentBreakShield === undefined) {
      this.setBreakShield(this.topBreakShield());
    }
    return this._currentBreakShield;
  };

  Game_Battler.prototype.setBreakShield = function(value) {
    if (this.isAffectedByBreakShield()) {
      this._currentBreakShield = Math.ceil(value);
      this._currentBreakShield = this._currentBreakShield.clamp(0, Olivia.OctoBattle.BreakShield.MaxShields);
      if (this._currentBreakShield <= 0) {
        this.applyBreakStun();
      }
      this.refresh();
    }
  };

  Game_Battler.prototype.alterBreakShield = function(delta) {
    this.setBreakShield(this.currentBreakShield() + delta);
  };

  Game_Battler.prototype.applyBreakStun = function() {
    this.setBreakShield(this.topBreakShield());
    var stunState = Olivia.OctoBattle.BreakShield.StunState;
    this.addState(stunState);
    this.startBreakShieldBrokenAnimation();
  };

  Game_Battler.prototype.isBreakStunned = function() {
    return this.isStateAffected(Olivia.OctoBattle.BreakShield.StunState);
  };

  Game_Battler.prototype.startBreakShieldReduceAnimation = function() {
    if (Olivia.OctoBattle.BreakShield.ReduceAnimation) {
      var anim = Olivia.OctoBattle.BreakShield.ReduceAnimation;
      this.startAnimation(anim);
    }
  };

  Game_Battler.prototype.startBreakShieldBrokenAnimation = function() {
    if (Olivia.OctoBattle.BreakShield.BreakAnimation) {
      var anim = Olivia.OctoBattle.BreakShield.BreakAnimation;
      this.startAnimation(anim);
    }
  };

  Game_Battler.prototype.getProtectedWeaknessElements = function() {
    var elements = [];
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      if (!!state && state.note.match(/<Protect (?:Element|Elements):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        var list = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        elements = elements.concat(list);
      }
    }
    elements.sort(function(a, b) { return a - b; });
    return elements;
  };

  Game_Actor.prototype.isAffectedByBreakShield = function() {
    return Olivia.OctoBattle.BreakShield.Actors;
  };

  Game_Actor.prototype.bareHandsElementId = function() {
    return 0;
  };

  Game_Actor.prototype.baseBreakShield = function() {
    var value = Olivia.OctoBattle.BreakShield.BaseShields;
    if (!!this.currentClass() && this.currentClass().note.match(/<Break (?:Shield|Shields): (\d+)>/i)) {
      value = parseInt(RegExp.$1);
    } else if (this.actor() && this.actor().note.match(/<Break (?:Shield|Shields): (\d+)>/i)) {
      value = parseInt(RegExp.$1);
    }
    return value;
  };

  Game_Actor.prototype.addedBreakShields = function(value) {
    value = Game_Battler.prototype.addedBreakShields.call(this, value);
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
      var item = equips[i];
      if (!!item && item.note.match(/<Break (?:Shield|Shields): ([\+\-]\d+)>/i)) {
        value += parseInt(RegExp.$1);
      }
    }
    if (!!this.currentClass() && this.currentClass().note.match(/<Break (?:Shield|Shields): ([\+\-]\d+)>/i)) {
      value += parseInt(RegExp.$1);
    }
    return value;
  };

  Game_Actor.prototype.getProtectedWeaknessElements = function() {
    var elements = Game_Battler.prototype.getProtectedWeaknessElements.call(this);
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
      var item = equips[i];
      if (!!item && item.note.match(/<Protect (?:Element|Elements):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        var list = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        elements = elements.concat(list);
      }
    }
    if (!!this.currentClass() && this.currentClass().note.match(/<Protect (?:Element|Elements):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      var list = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      elements = elements.concat(list);
    }
    elements.sort(function(a, b) { return a - b; });
    return elements;
  };

  Game_Enemy.prototype.isAffectedByBreakShield = function() {
    return Olivia.OctoBattle.BreakShield.Enemies;
  };

  Game_Enemy.prototype.baseBreakShield = function() {
    var value = Olivia.OctoBattle.BreakShield.BaseShields;
    if (this.enemy() && this.enemy().note.match(/<Break (?:Shield|Shields): (\d+)>/i)) {
      value = parseInt(RegExp.$1);
    }
    return value;
  };

  Game_Unit.prototype.resetBreakShields = function() {
    var inBattle = this._inBattle;
    this._inBattle = false;
    var members = this.members();
    for (var i = 0; i < members.length; i++) {
      var battler = members[i];
      if (battler) {
        battler.resetBreakShield();
      }
    }
    this._inBattle = inBattle;
  };

  Window_Base._iconBreakShield = Olivia.OctoBattle.BreakShield.ShieldIcon;
  Window_Base._iconBreakStun = Olivia.OctoBattle.BreakShield.StunIcon;

  Window_Base.prototype.drawBreakShieldIcon = function(battler, x, y) {
    if (battler.isAffectedByBreakShield()) {
      if (battler.isDead() && $dataStates[battler.deathStateId()].iconIndex > 0) {
        var icon = $dataStates[battler.deathStateId()].iconIndex;
        var text = '';
      } else if (battler.isDead()) {
        var icon = 0;
        var text = '';
      } else if (battler.isBreakStunned()) {
        var icon = Window_Base._iconBreakStun;
        if (this.showBreakStunDuration()) {
          var text = battler._stateTurns[Olivia.OctoBattle.BreakShield.StunState] || 0;
          if (text === 0) { text = ''; }
        } else {
          var text = '';
        }
      } else {
        var icon = Window_Base._iconBreakShield;
        var text = battler.currentBreakShield();
      }
      this.drawIcon(icon, x, y);
      this.contents.fontSize = Olivia.OctoBattle.BreakShield.IconFontSize;
      var oldOutline = this.contents.outlineColor;
      this.contents.outlineColor = "rgba(0, 0, 0, 1.0)";
      this.drawText(text, x, y, Window_Base._iconWidth, 'center');
      this.resetFontSettings();
      this.contents.outlineColor = oldOutline;
    }
  };

  Window_Base.prototype.showBreakStunDuration = function() {
    return true;
  };

  if (Olivia.OctoBattle.BreakShield.Actors && Olivia.OctoBattle.BreakShield.DrawMenu) {
    Olivia.OctoBattle.Shields.___Window_Base_drawActorIcons___ = Window_Base.prototype.drawActorIcons;
    Window_Base.prototype.drawActorIcons = function(actor, x, y, width) {
      if (!$gameParty.inBattle() && !(SceneManager._scene instanceof Scene_Battle)) {
        actor.resetBreakShield();
        this.drawBreakShieldIcon(actor, x, y + 2);
        x += Window_Base._iconWidth;
        width -= Window_Base._iconWidth;
      }
      Olivia.OctoBattle.Shields.___Window_Base_drawActorIcons___.call(this, actor, x, y, width);
    };
  }

  if (Olivia.OctoBattle.BreakShield.Actors && Olivia.OctoBattle.BreakShield.ShowActorShield) {
    Olivia.OctoBattle.BreakShield.Window_BattleStatus_drawBasicArea = Window_BattleStatus.prototype.drawBasicArea;
    Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
      if (actor.isAffectedByBreakShield()) {
        this.drawBreakShieldBasic(rect, actor);
        rect.x += Window_Base._iconWidth + 2;
        rect.width -= Window_Base._iconWidth + 2;
      }
      Olivia.OctoBattle.BreakShield.Window_BattleStatus_drawBasicArea.call(this, rect, actor);
    };
    Window_BattleStatus.prototype.drawBreakShieldBasic = function(rect, actor) {
      this.drawBreakShieldIcon(actor, rect.x, rect.y + 2);
    };
  }

	if (Olivia.OctoBattle.BreakShield.Enemies && Olivia.OctoBattle.BreakShield.ShowEnemyShield) {
		Window_BattleEnemy.prototype.drawItem = function(index) {
			this.resetTextColor();
			var enemy = this._enemies[index];
			var rect = this.itemRectForText(index);
			var x = rect.x;
			var y = rect.y;
			var width = rect.width;
			this.drawBreakShieldIcon(enemy, x, y + 2);
			x += Window_Base._iconWidth + 2;
			width -= Window_Base._iconWidth + 2;
			this.drawText(enemy.name(), x, y, width);
		};
	}
}
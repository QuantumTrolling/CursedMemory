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
Imported["OctoBattle"] = true;

var Olivia = Olivia || {};
Olivia["OctoBattle"] = Olivia["OctoBattle"] || {};

// поиск параметров плагина
var parameters = $plugins.filter(function (plugin) {
  return plugin.description.contains("<OctoBattle>");
})[0].parameters;

// WeaknessDisplay
Olivia["OctoBattle"]["WeaknessDisplay"] = {
  Enabled: eval(parameters["Weakness Display"]),
  ShownElements: JSON.parse(parameters["Shown Elements"]),
  ElementIcons: JSON.parse(parameters["Element Icons"]),
  UnknownIcon: Number(parameters["Unknown Weakness Icon"]),
  AlwaysShow: eval(parameters["Weakness Always Show"]),
  HideDuration: Number(parameters["Weakness Hide Duration"] || 90),
  ShowBreakShield: eval(parameters["Weakness Show Break Shield"]),
  ShowStunTurns: eval(parameters["Weakness Stun Duration"]),
  ShowHpGauge: eval(parameters["Weakness Show HP Gauge"]),
  HpGaugeMinWidth: Number(parameters["HP Gauge Minimum Width"] || 100),
  HpGaugePadding: Number(parameters["HP Gauge Padding"] || 100),
  ShowName: eval(parameters["Weakness Show Name"]),
  NameFontSize: Number(parameters["Name Font Size"] || 22),
  HpColor50: Number(parameters["50% HP Color"] || 17),
  HpColor25: Number(parameters["25% HP Color"] || 18),
  ShowStates: eval(parameters["Weakness Show States"] || true),
  SmallWeakIcons: eval(parameters["Small Weakness Icons"]),
  WeakIconSize: Number(parameters["Weak Icon Size"] || 0.6)
};

// BreakShield
Olivia["OctoBattle"]["BreakShield"] = {
  Enabled: eval(parameters["Break Shield System"]),
  Actors: eval(parameters["Actor Shields"]),
  DrawMenu: eval(parameters["Draw Menu Shields"]),
  Enemies: eval(parameters["Enemy Shields"]),
  BaseShields: Number(parameters["Base Shield Value"] || 0),
  BreakReduce: Number(parameters["Break Reduction"] || 1),
  MaxShields: Number(parameters["Max Break Shields"] || 99),
  StunState: Number(parameters["Stun State ID"] || 1),
  WeakRate: Number(parameters["Element Weakness Rate"] || 1.1),
  ShieldIcon: Number(parameters["Shield Icon"] || 81),
  StunIcon: Number(parameters["Stun Icon"] || 6),
  ProtectIcon: Number(parameters["Protect Weakness Icon"] || 81),
  IconFontSize: Number(parameters["Icon Font Size"] || 22),
  ReduceAnimation: Number(parameters["Reduce Animation"] || 0),
  BreakAnimation: Number(parameters["Break Animation"] || 0),
  ShowActorShield: eval(parameters["Show Actor Shields"]),
  ShowEnemyShield: eval(parameters["Show Enemy Shields"])
};

//=============================================================================
// Weakness Display
//
// 1. Reveal corresponding weakness when struck with elemental damage.
// 2. Display data according to the elements revealed about that enemy.
// 3. Analyze effects to reveal more weaknesses.

var _0x9115 = ['_subject', 'drawWeaknessIcons', 'setSubject', '_weaknessWindow', 'push', 'additionForBP', 'drawSmallIcon', 'elementId', 'random', '_hpGaugeWidth', 'YEP_ElementCore', 'normalColor', 'length', 'applyItemUserEffect', 'startAnimation', 'setCalculationConstants', '___Game_Action_apply___', 'WeaknessDisplay', 'enemy', 'ProtectIcon', 'YEP_BattleEngineCore', 'subject', 'ShowHpGauge', 'initializeRevealedEnemyWeaknesses', 'Analyze', 'constructor', 'changeTextColor', 'fittingHeight', 'HpGaugeMinWidth', 'WeakIconSize', 'applyWeaknessAnalyze', 'call', 'drawHpGauge', 'create', 'refresh', 'HpColor25', 'drawBreakShield', 'revealWeaknessByVariable', 'drawSubjectName', 'elementRate', 'isShowWeaknessHpGauge', 'drawBreakShieldIcon', 'contains', 'revealWeakness', 'contentsOpacity', 'contents', 'resetFontSettings', 'ShowName', 'prototype', 'moveStateSprite', 'drawIcon', '_iconHeight', 'max', 'getRevealedEnemyWeaknesses', '___Game_Action_applyItemUserEffect___', 'floor', 'drawGauge', 'HideDuration', '___Spriteset_Battle_update___', 'textColor', 'match', 'initialize', '___Game_Action_executeDamage___', 'battler', 'center', 'update', 'ShowStates', 'width', 'Weakness', 'WeakRate', 'initMembers', 'addEnemyWeaknessElement', 'AlwaysShow', 'updateEnemyWeaknessWindows', 'revealNewWeaknesses', 'contentsWidth', 'lineHeight', 'members', 'boxWidth', 'getProtectedWeaknessElements', '_added', '_sprite', 'drawText', 'clear', 'isSelected', 'getWeaknessElements', 'hpGaugeColor1', 'UnknownIcon', 'ceil', 'NameFontSize', 'standardPadding', '___Sprite_Enemy_initMembers___', 'createWeaknessDisplayWindow', '___Game_BattlerBase_refresh___', '_iconWidth', 'showBreakStunDuration', 'blt', 'ElementIcons', 'HpGaugePadding', 'updatePosition', 'revealWeaknessDisplay', '_factorY', 'OctoBattle', '_enemySprites', 'Enabled', 'executeDamage', 'round', 'textWidth', 'allIcons', 'attackElements', 'ShownElements', 'apply', 'note', 'setup', '_needRefreshAllEnemyWeaknessWindows', 'opacity', 'originalElementRate', 'ShowBreakShield', 'enemyId', 'isHidden', '_revealedEnemyWeaknesses', '_stateIconSprite', 'name', 'setBattler', 'SmallWeakIcons', '_enemy', 'BoostPoint', 'fontSize', 'value', 'Enemies', 'isEnemy', '_showWeaknessDisplay', 'indexOf', '___Game_Battler_startAnimation___', 'hpRate', 'item', '_factorX', 'BreakShield', 'sort', 'updateOpacity', 'splice', 'loadSystem'];
(function (_0x17d538, _0x9115f0) {
  var _0x35656e = function (_0x2f9b63) {
    while (--_0x2f9b63) {
      _0x17d538.push(_0x17d538.shift());
    }
  };
  _0x35656e(++_0x9115f0);
})(_0x9115, 0xc8);
var _0x3565 = function (_0x17d538, _0x9115f0) {
  _0x17d538 = _0x17d538 - 0x0;
  var _0x35656e = _0x9115[_0x17d538];
  return _0x35656e;
};
if (Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x2e')]) {
  Olivia[_0x3565('0x2c')][_0x3565('0xa')] = Olivia[_0x3565('0x2c')][_0x3565('0xa')] || {};
  BattleManager[_0x3565('0x79')] = function (_0x3ac8c4) {
    var _0xa23b9 = $gameVariables[_0x3565('0x46')](_0x3ac8c4);
    this.revealWeakness(_0xa23b9);
  };
  BattleManager[_0x3565('0x7f')] = function (_0x400d7e) {
    var _0x9281a4 = $gameTroop[_0x3565('0x13')]();
    var _0xf3783e = [];
    for (var _0x105d2f = 0x0; _0x105d2f < _0x9281a4[_0x3565('0x60')]; _0x105d2f++) {
      var _0x30d30e = _0x9281a4[_0x105d2f];
      if (!!_0x30d30e && !_0xf3783e[_0x3565('0x7e')](_0x30d30e.enemyId())) {
        _0x30d30e[_0x3565('0x10')](_0x400d7e);
        _0xf3783e[_0x3565('0x58')](_0x30d30e[_0x3565('0x3c')]());
      }
    }
  };
  Olivia[_0x3565('0x2c')][_0x3565('0xa')].___Game_System_initialize___ = Game_System[_0x3565('0x84')][_0x3565('0x3')];
  Game_System[_0x3565('0x84')][_0x3565('0x3')] = function () {
    Olivia[_0x3565('0x2c')][_0x3565('0xa')].___Game_System_initialize___[_0x3565('0x73')](this);
    this[_0x3565('0x6b')]();
  };
  Game_System[_0x3565('0x84')][_0x3565('0x6b')] = function () {
    this[_0x3565('0x3e')] = this[_0x3565('0x3e')] || {};
  };
  Game_System[_0x3565('0x84')].addEnemyWeaknessElement = function (_0x9f973b, _0x4b21c1) {
    if (this[_0x3565('0x3e')] === undefined) {
      this[_0x3565('0x6b')]();
    }
    this[_0x3565('0x3e')][_0x9f973b] = this._revealedEnemyWeaknesses[_0x9f973b] || [];
    if (!this[_0x3565('0x3e')][_0x9f973b][_0x3565('0x7e')](_0x4b21c1)) {
      this[_0x3565('0x3e')][_0x9f973b].push(_0x4b21c1);
    }
    this[_0x3565('0x3e')][_0x9f973b][_0x3565('0x50')](function (_0x2513bb, _0x325fe6) {
      return _0x2513bb - _0x325fe6;
    });
  };
  Game_System.prototype[_0x3565('0x89')] = function (_0x236093) {
    if (this[_0x3565('0x3e')] === undefined) {
      this.initializeRevealedEnemyWeaknesses();
    }
    this[_0x3565('0x3e')][_0x236093] = this._revealedEnemyWeaknesses[_0x236093] || [];
    return this[_0x3565('0x3e')][_0x236093];
  };
  Olivia[_0x3565('0x2c')][_0x3565('0xa')][_0x3565('0x64')] = Game_Action[_0x3565('0x84')][_0x3565('0x35')];
  Game_Action.prototype[_0x3565('0x35')] = function (_0x3856df) {
    Olivia.OctoBattle[_0x3565('0xa')].___Game_Action_apply___.call(this, _0x3856df);
    _0x3856df[_0x3565('0x2a')]();
  };
  Olivia[_0x3565('0x2c')][_0x3565('0xa')][_0x3565('0x4')] = Game_Action[_0x3565('0x84')].executeDamage;
  Game_Action[_0x3565('0x84')][_0x3565('0x2f')] = function (_0x3e53d0, _0x32d104) {
    Olivia[_0x3565('0x2c')][_0x3565('0xa')].___Game_Action_executeDamage___[_0x3565('0x73')](this, _0x3e53d0, _0x32d104);
    if (!!_0x3e53d0 && _0x3e53d0.isEnemy() && _0x32d104 !== 0x0) {
      this.addEnemyWeaknessElement(_0x3e53d0);
    }
  };
  Game_Action.prototype[_0x3565('0xd')] = function (_0x2f5668) {
    if (Imported[_0x3565('0x5e')]) {
      var _0x322b33 = this.getItemElements();
    } else {
      var _0x1c8509 = this.item().damage[_0x3565('0x5b')];
      if (_0x1c8509 < 0x0) {
        var _0x322b33 = this[_0x3565('0x69')]()[_0x3565('0x33')]();
      } else {
        var _0x322b33 = [_0x1c8509];
      }
    }
    for (var _0x217494 = 0x0; _0x217494 < _0x322b33[_0x3565('0x60')]; _0x217494++) {
      var _0x1c8509 = _0x322b33[_0x217494];
      if (_0x1c8509 > 0x0) {
        $gameSystem[_0x3565('0xd')](_0x2f5668[_0x3565('0x3c')](), _0x1c8509);
      }
    }
  };
  Olivia[_0x3565('0x2c')][_0x3565('0xa')].___Game_Action_applyItemUserEffect___ = Game_Action[_0x3565('0x84')][_0x3565('0x61')];
  Game_Action.prototype[_0x3565('0x61')] = function (_0x1522e8) {
    Olivia[_0x3565('0x2c')][_0x3565('0xa')][_0x3565('0x8a')][_0x3565('0x73')](this, _0x1522e8);
    if (_0x1522e8[_0x3565('0x48')]()) {
      this[_0x3565('0x72')](_0x1522e8);
    }
  };
  Game_Action[_0x3565('0x84')][_0x3565('0x72')] = function (_0x38a9cc) {
    if (this[_0x3565('0x4d')]().note[_0x3565('0x2')](/<Analyze (?:Weakness|Weaknesses): (\d+)>/i)) {
      var _0x34c729 = parseInt(RegExp.$1);
      if (Olivia[_0x3565('0x2c')][_0x3565('0x44')] && this[_0x3565('0x4d')]().note[_0x3565('0x2')](/<(?:BP|Boost) Analyze>/i)) {
        var _0x4a5165 = this.subject().multiplierForBP(_0x3565('0x6c'));
        _0x34c729 = Math[_0x3565('0x30')](_0x4a5165 * _0x34c729);
        _0x34c729 += this[_0x3565('0x69')]()[_0x3565('0x59')]('Analyze');
      }
      _0x38a9cc.revealNewWeaknesses(_0x34c729);
    }
  };
  Olivia[_0x3565('0x2c')][_0x3565('0xa')][_0x3565('0x23')] = Game_BattlerBase[_0x3565('0x84')].refresh;
  Game_BattlerBase[_0x3565('0x84')][_0x3565('0x76')] = function () {
    Olivia[_0x3565('0x2c')][_0x3565('0xa')][_0x3565('0x23')][_0x3565('0x73')](this);
    $gameTemp[_0x3565('0x38')] = true;
  };
  Olivia.OctoBattle[_0x3565('0xa')].___Game_Battler_startAnimation___ = Game_Battler.prototype[_0x3565('0x62')];
  Game_Battler[_0x3565('0x84')][_0x3565('0x62')] = function (_0x3fb4e0, _0x574eef, _0x3bfad4) {
    Olivia.OctoBattle[_0x3565('0xa')][_0x3565('0x4b')][_0x3565('0x73')](this, _0x3fb4e0, _0x574eef, _0x3bfad4);
    this[_0x3565('0x2a')]();
  };
  Game_Battler[_0x3565('0x84')][_0x3565('0x2a')] = function () {
    if (this[_0x3565('0x48')]()) {
      this._showWeaknessDisplay = Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x8d')];
    }
  };
  Game_Enemy[_0x3565('0x84')][_0x3565('0x1b')] = function () {
    var _0x4ecf73 = [];
    for (var _0x40e0bc = 0x0; _0x40e0bc < Olivia[_0x3565('0x2c')][_0x3565('0x65')].ShownElements[_0x3565('0x60')]; _0x40e0bc++) {
      var _0x18e0a0 = Number(Olivia[_0x3565('0x2c')].WeaknessDisplay[_0x3565('0x34')][_0x40e0bc]);
      if (Olivia.OctoBattle.BreakShield && Olivia.OctoBattle.BreakShield[_0x3565('0x2e')]) {
        if (this[_0x3565('0x3a')](_0x18e0a0) >= Olivia[_0x3565('0x2c')].BreakShield[_0x3565('0xb')]) {
          _0x4ecf73.push(_0x18e0a0);
        }
      } else {
        if (this[_0x3565('0x7b')](_0x18e0a0) >= 1.1) {
          _0x4ecf73[_0x3565('0x58')](_0x18e0a0);
        }
      }
    }
    return _0x4ecf73;
  };
  Game_Enemy[_0x3565('0x84')][_0x3565('0x7c')] = function () {
    if (this[_0x3565('0x66')]()[_0x3565('0x36')][_0x3565('0x2')](/<No HP Gauge>/i)) {
      return false;
    } else if (this[_0x3565('0x66')]()[_0x3565('0x36')][_0x3565('0x2')](/<Show HP Gauge>/i)) {
      return true;
    } else if (this.enemy()[_0x3565('0x36')][_0x3565('0x2')](/<Hide HP Gauge>/i)) {
      return false;
    }
    return Olivia.OctoBattle[_0x3565('0x65')][_0x3565('0x6a')];
  };
  Game_Enemy[_0x3565('0x84')][_0x3565('0x10')] = function (_0x421107) {
    var _0x2805fb = this[_0x3565('0x1b')]();
    var _0x42e998 = $gameSystem.getRevealedEnemyWeaknesses(this[_0x3565('0x3c')]());
    var _0x35daf0 = [];
    for (var _0x55c955 = 0x0; _0x55c955 < _0x2805fb[_0x3565('0x60')]; _0x55c955++) {
      var _0x5ecee6 = _0x2805fb[_0x55c955];
      if (!_0x42e998[_0x3565('0x7e')](_0x5ecee6)) {
        _0x35daf0[_0x3565('0x58')](_0x5ecee6);
      }
    }
    while (_0x421107 > 0x0) {
      if (_0x35daf0[_0x3565('0x60')] <= 0x0) {
        break;
      }
      _0x421107 -= 0x1;
      var _0x2830d0 = Math[_0x3565('0x8b')](Math[_0x3565('0x5c')]() * _0x35daf0[_0x3565('0x60')]);
      var _0x182a46 = _0x35daf0[_0x2830d0];
      $gameSystem.addEnemyWeaknessElement(this[_0x3565('0x3c')](), _0x182a46);
      _0x35daf0[_0x3565('0x52')](_0x2830d0, 0x1);
      this[_0x3565('0x2a')]();
    }
    $gameTemp[_0x3565('0x38')] = true;
  };
  Olivia[_0x3565('0x2c')][_0x3565('0xa')][_0x3565('0x0')] = Spriteset_Battle[_0x3565('0x84')][_0x3565('0x7')];
  Spriteset_Battle.prototype[_0x3565('0x7')] = function () {
    Olivia[_0x3565('0x2c')][_0x3565('0xa')][_0x3565('0x0')][_0x3565('0x73')](this);
    this[_0x3565('0xf')]();
  };
  Spriteset_Battle[_0x3565('0x84')][_0x3565('0xf')] = function () {
    if ($gameTemp._needRefreshAllEnemyWeaknessWindows === true) {
      for (var _0x89cfbb = 0x0; _0x89cfbb < this[_0x3565('0x2d')].length; _0x89cfbb++) {
        var _0x1ca57d = this[_0x3565('0x2d')][_0x89cfbb];
        if (!!_0x1ca57d && !!_0x1ca57d[_0x3565('0x57')]) {
          _0x1ca57d[_0x3565('0x57')][_0x3565('0x76')]();
          if (_0x1ca57d[_0x3565('0x57')]._added === false) {
            this._baseSprite.addChild(_0x1ca57d[_0x3565('0x57')]);
          }
        }
      }
      $gameTemp._needRefreshAllEnemyWeaknessWindows = false;
    }
  };
  Olivia[_0x3565('0x2c')][_0x3565('0xa')][_0x3565('0x21')] = Sprite_Enemy[_0x3565('0x84')][_0x3565('0xc')];
  Sprite_Enemy[_0x3565('0x84')].initMembers = function () {
    Olivia[_0x3565('0x2c')][_0x3565('0xa')].___Sprite_Enemy_initMembers___[_0x3565('0x73')](this);
    this[_0x3565('0x22')]();
  };
  Sprite_Enemy[_0x3565('0x84')][_0x3565('0x22')] = function () {
    this[_0x3565('0x57')] = new Window_WeaknessDisplay(this[_0x3565('0x43')], this);
    this._weaknessWindow[_0x3565('0x76')]();
    this[_0x3565('0x57')][_0x3565('0x16')] = false;
    if (Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x8')]) {
      this._stateIconSprite[_0x3565('0x39')] = 0x0;
    }
  };
  Olivia[_0x3565('0x2c')].Weakness.___Sprite_Enemy_setBattler___ = Sprite_Enemy.prototype[_0x3565('0x41')];
  Sprite_Enemy[_0x3565('0x84')][_0x3565('0x41')] = function (_0x36ba2b) {
    Olivia[_0x3565('0x2c')][_0x3565('0xa')].___Sprite_Enemy_setBattler___.call(this, _0x36ba2b);
    if (!!this[_0x3565('0x57')]) {
      this[_0x3565('0x57')][_0x3565('0x56')](_0x36ba2b);
    }
  };
  function Window_WeaknessDisplay() {
    this[_0x3565('0x3')][_0x3565('0x35')](this, arguments);
  }
  Window_WeaknessDisplay[_0x3565('0x84')] = Object[_0x3565('0x75')](Window_Base.prototype);
  Window_WeaknessDisplay[_0x3565('0x84')][_0x3565('0x6d')] = Window_WeaknessDisplay;
  Window_WeaknessDisplay[_0x3565('0x84')].initialize = function (_0x4d84dc, _0x2ad5b0) {
    this._subject = _0x4d84dc;
    this[_0x3565('0x17')] = _0x2ad5b0;
    var _0x2ea141 = Math[_0x3565('0x1e')](Graphics.boxWidth / 0x2);
    var _0x10442c = this[_0x3565('0x6f')](0x2);
    this[_0x3565('0x63')]();
    Window_Base[_0x3565('0x84')][_0x3565('0x3')][_0x3565('0x73')](this, 0x0, 0x0, _0x2ea141, _0x10442c);
    this.createStateIconSprite();
    this[_0x3565('0x39')] = 0x0;
    this[_0x3565('0x76')]();
  };
  Window_WeaknessDisplay[_0x3565('0x84')][_0x3565('0x20')] = function () {
    return 0x0;
  };
  Window_WeaknessDisplay[_0x3565('0x84')][_0x3565('0x63')] = function () {
    this[_0x3565('0x4e')] = -0x1 * Math[_0x3565('0x1e')](Graphics[_0x3565('0x14')] * 0.25);
    this[_0x3565('0x2b')] = -0x1 * Math[_0x3565('0x30')](this[_0x3565('0x12')]() * 0.75);
  };
  Window_WeaknessDisplay[_0x3565('0x84')].createStateIconSprite = function () {
    if (Olivia[_0x3565('0x2c')][_0x3565('0x65')]) {
      this[_0x3565('0x3f')] = new Sprite_StateIcon();
      this.addChild(this[_0x3565('0x3f')]);
      this[_0x3565('0x3f')].x = this[_0x3565('0x9')] / 0x2;
      this[_0x3565('0x3f')].y = 0x0;
    }
  };
  Window_WeaknessDisplay.prototype[_0x3565('0x7')] = function () {
    Window_Base[_0x3565('0x84')][_0x3565('0x7')].call(this);
    if (!!this[_0x3565('0x54')]) {
      this[_0x3565('0x29')]();
      this.updateOpacity();
    }
  };
  Window_WeaknessDisplay[_0x3565('0x84')][_0x3565('0x29')] = function () {
    this.x = this[_0x3565('0x17')].x + this[_0x3565('0x4e')];
    this.y = this[_0x3565('0x17')].y + this._factorY;
  };
  Window_WeaknessDisplay[_0x3565('0x84')][_0x3565('0x51')] = function () {
    if (this[_0x3565('0x54')][_0x3565('0x3d')]() || this[_0x3565('0x54')].isDead()) {
      this[_0x3565('0x80')] -= 0x10;
    } else if (this[_0x3565('0x54')][_0x3565('0x5')]() && this[_0x3565('0x54')][_0x3565('0x5')]()[_0x3565('0x39')] <= 0x0) {
      this[_0x3565('0x80')] -= 0xa;
    } else if (Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0xe')]) {
      this[_0x3565('0x80')] = 0xff;
    } else if (this[_0x3565('0x54')][_0x3565('0x1a')]()) {
      this[_0x3565('0x80')] = 0xff;
    } else if (this._subject[_0x3565('0x49')] > 0x0) {
      this[_0x3565('0x80')] = 0xff;
      this[_0x3565('0x54')][_0x3565('0x49')] -= 0x1;
    } else {
      this[_0x3565('0x80')] -= 0x10;
    }
    if (!!this[_0x3565('0x3f')]) {
      this[_0x3565('0x3f')][_0x3565('0x39')] = this.contentsOpacity;
    }
  };
  Window_WeaknessDisplay.prototype[_0x3565('0x56')] = function (_0x561b76) {
    this._subject = _0x561b76;
    this[_0x3565('0x54')][_0x3565('0x49')] = this[_0x3565('0x54')][_0x3565('0x49')] || Olivia.OctoBattle.WeaknessDisplay[_0x3565('0x8d')];
    if (!!this[_0x3565('0x3f')]) {
      this[_0x3565('0x3f')][_0x3565('0x37')](this._subject);
    }
    if (this[_0x3565('0x54')][_0x3565('0x3d')]()) {
      this.contentsOpacity = 0x0;
    }
    this[_0x3565('0x76')]();
  };
  Window_WeaknessDisplay.prototype[_0x3565('0x76')] = function () {
    this[_0x3565('0x81')][_0x3565('0x19')]();
    if (!!this[_0x3565('0x54')]) {
      this[_0x3565('0x74')]();
      this[_0x3565('0x7a')]();
      this[_0x3565('0x78')]();
      this[_0x3565('0x55')]();
      if (!!this[_0x3565('0x3f')]) {
        this[_0x3565('0x85')]();
      }
    }
  };
  Window_WeaknessDisplay[_0x3565('0x84')][_0x3565('0x74')] = function () {
    if (Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x6a')]) {
      if (Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x83')]) {
        this[_0x3565('0x82')]();
        this[_0x3565('0x81')][_0x3565('0x45')] = Olivia.OctoBattle[_0x3565('0x65')][_0x3565('0x1f')];
        var _0x1f4000 = this.textWidth(this[_0x3565('0x54')][_0x3565('0x40')]());
        this[_0x3565('0x82')]();
        _0x1f4000 = Math.max(Olivia.OctoBattle[_0x3565('0x65')][_0x3565('0x70')], _0x1f4000);
      } else {
        var _0x1f4000 = Olivia[_0x3565('0x2c')][_0x3565('0x65')].HpGaugeMinWidth;
      }
      _0x1f4000 += 0x2 * Olivia[_0x3565('0x2c')].WeaknessDisplay[_0x3565('0x28')];
      this[_0x3565('0x5d')] = _0x1f4000;
      var _0x4ff8c2 = Math[_0x3565('0x30')]((this[_0x3565('0x11')]() - _0x1f4000) / 0x2);
      var _0x3f533a = this[_0x3565('0x54')][_0x3565('0x4c')]();
      var _0x20d2d6 = this[_0x3565('0x1c')]();
      var _0x30c21b = this.hpGaugeColor2();
      this[_0x3565('0x8c')](_0x4ff8c2, 0x0, _0x1f4000, _0x3f533a, _0x20d2d6, _0x30c21b);
    } else {
      this[_0x3565('0x5d')] = 0x0;
    }
  };
  Window_WeaknessDisplay[_0x3565('0x84')].drawSubjectName = function () {
    if (Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x83')]) {
      this[_0x3565('0x82')]();
      this[_0x3565('0x81')][_0x3565('0x45')] = Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x1f')];
      if (this._subject[_0x3565('0x4c')]() > 0.5) {
        this[_0x3565('0x6e')](this[_0x3565('0x5f')]());
      } else if (this[_0x3565('0x54')][_0x3565('0x4c')]() > 0.25) {
        this[_0x3565('0x6e')](this[_0x3565('0x1')](Olivia[_0x3565('0x2c')][_0x3565('0x65')].HpColor50));
      } else {
        this[_0x3565('0x6e')](this.textColor(Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x77')]));
      }
      this[_0x3565('0x18')](this[_0x3565('0x54')].name(), 0x0, 0x0, this[_0x3565('0x11')](), _0x3565('0x6'));
      this.resetFontSettings();
    }
  };
  Window_WeaknessDisplay[_0x3565('0x84')][_0x3565('0x78')] = function () {
    if (Olivia[_0x3565('0x2c')].WeaknessDisplay[_0x3565('0x3b')] && Olivia[_0x3565('0x2c')][_0x3565('0x4f')] && Olivia[_0x3565('0x2c')][_0x3565('0x4f')].Enabled && Olivia[_0x3565('0x2c')][_0x3565('0x4f')][_0x3565('0x47')]) {
      if (Olivia.OctoBattle[_0x3565('0x65')][_0x3565('0x83')]) {
        this[_0x3565('0x82')]();
        this.contents[_0x3565('0x45')] = Olivia[_0x3565('0x2c')].WeaknessDisplay[_0x3565('0x1f')];
        var _0x257f89 = this[_0x3565('0x31')](this[_0x3565('0x54')][_0x3565('0x40')]());
        this[_0x3565('0x82')]();
        _0x257f89 = Math[_0x3565('0x88')](this[_0x3565('0x5d')], _0x257f89);
        var _0x58c8cb = Math[_0x3565('0x30')]((this[_0x3565('0x11')]() - _0x257f89) / 0x2) - Window_Base[_0x3565('0x24')] - 0x2;
      } else if (Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x8')] && this[_0x3565('0x54')][_0x3565('0x32')]()[_0x3565('0x60')] > 0x0) {
        var _0x58c8cb = Math[_0x3565('0x30')](this[_0x3565('0x11')]() / 0x2) - Window_Base[_0x3565('0x24')];
      } else {
        var _0x58c8cb = Math[_0x3565('0x30')]((this[_0x3565('0x11')]() - Window_Base[_0x3565('0x24')]) / 0x2);
      }
      this[_0x3565('0x7d')](this[_0x3565('0x54')], _0x58c8cb, 0x0);
    }
  };
  Window_WeaknessDisplay[_0x3565('0x84')][_0x3565('0x85')] = function () {
    var _0x22e264 = Math[_0x3565('0x30')](this.contentsWidth() / 0x2);
    var _0x2d1dc5 = Math[_0x3565('0x30')](this[_0x3565('0x12')]() / 0x2) - 0x2;
    if (Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x6a')]) {
      if (Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x83')]) {
        this[_0x3565('0x82')]();
        this[_0x3565('0x81')][_0x3565('0x45')] = Olivia[_0x3565('0x2c')].WeaknessDisplay[_0x3565('0x1f')];
        var _0x122a9d = this[_0x3565('0x31')](this._subject[_0x3565('0x40')]());
        this[_0x3565('0x82')]();
        _0x122a9d = Math[_0x3565('0x88')](Olivia[_0x3565('0x2c')].WeaknessDisplay[_0x3565('0x70')], _0x122a9d);
      } else {
        var _0x122a9d = Olivia[_0x3565('0x2c')].WeaknessDisplay[_0x3565('0x70')];
      }
      _0x122a9d += 0x2 * Olivia[_0x3565('0x2c')][_0x3565('0x65')].HpGaugePadding + 0x2;
      _0x22e264 += Math[_0x3565('0x30')](_0x122a9d / 0x2) + Math.round(Window_Base[_0x3565('0x24')] / 0x2);
    } else if (Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x83')]) {
      this[_0x3565('0x82')]();
      this[_0x3565('0x81')].fontSize = Olivia.OctoBattle[_0x3565('0x65')][_0x3565('0x1f')];
      var _0x122a9d = this[_0x3565('0x31')](this[_0x3565('0x54')].name()) + Window_Base[_0x3565('0x24')] + 0x4;
      this[_0x3565('0x82')]();
      _0x22e264 += Math[_0x3565('0x30')](_0x122a9d / 0x2);
    } else if (Olivia.OctoBattle.WeaknessDisplay[_0x3565('0x3b')]) {
      _0x22e264 += Math[_0x3565('0x30')](Window_Base[_0x3565('0x24')] / 0x2);
    } else {
      _0x2d1dc5 -= this.lineHeight();
    }
    this[_0x3565('0x3f')].x = _0x22e264;
    this[_0x3565('0x3f')].y = _0x2d1dc5;
  };
  Window_WeaknessDisplay[_0x3565('0x84')][_0x3565('0x25')] = function () {
    return Olivia.OctoBattle[_0x3565('0x65')].ShowStunTurns;
  };
  Window_WeaknessDisplay[_0x3565('0x84')][_0x3565('0x55')] = function () {
    var _0x121e14 = this[_0x3565('0x54')][_0x3565('0x1b')]();
    var _0x1e60ba = Window_Base[_0x3565('0x24')];
    if (Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x42')]) {
      _0x1e60ba = Math[_0x3565('0x30')](_0x1e60ba * Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x71')]);
    }
    var _0x1f15eb = _0x121e14[_0x3565('0x60')] * _0x1e60ba;
    var _0x164445 = Math[_0x3565('0x30')]((this[_0x3565('0x11')]() - _0x1f15eb) / 0x2);
    if (!Olivia[_0x3565('0x2c')].WeaknessDisplay[_0x3565('0x83')] && !Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x3b')] && !Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x6a')]) {
      var _0x1b9ec6 = 0x0;
    } else {
      var _0x1b9ec6 = this.lineHeight();
    }
    var _0x597b19 = $gameSystem[_0x3565('0x89')](this[_0x3565('0x54')][_0x3565('0x3c')]());
    if (Olivia[_0x3565('0x2c')][_0x3565('0x4f')] && Olivia.OctoBattle.BreakShield.Enabled) {
      var _0x34c958 = this[_0x3565('0x54')][_0x3565('0x15')]();
    }
    for (var _0x3e6646 = 0x0; _0x3e6646 < _0x121e14[_0x3565('0x60')]; _0x3e6646++) {
      var _0x29e9e5 = _0x121e14[_0x3e6646];
      if (_0x597b19[_0x3565('0x7e')](_0x29e9e5)) {
        var _0xcd6c72 = Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x34')][_0x3565('0x4a')](String(_0x29e9e5));
        var _0x28278f = Number(Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x27')][_0xcd6c72]);
      } else {
        var _0x28278f = Olivia.OctoBattle[_0x3565('0x65')][_0x3565('0x1d')];
      }
      if (Olivia[_0x3565('0x2c')][_0x3565('0x65')].SmallWeakIcons) {
        this[_0x3565('0x5a')](_0x28278f, _0x164445, _0x1b9ec6);
      } else {
        this[_0x3565('0x86')](_0x28278f, _0x164445, _0x1b9ec6);
      }
      if (Olivia[_0x3565('0x2c')][_0x3565('0x4f')] && Olivia[_0x3565('0x2c')][_0x3565('0x4f')][_0x3565('0x2e')] && _0x34c958[_0x3565('0x7e')](_0x29e9e5)) {
        var _0x28278f = Olivia[_0x3565('0x2c')][_0x3565('0x4f')][_0x3565('0x67')];
        if (Olivia[_0x3565('0x2c')].WeaknessDisplay[_0x3565('0x42')]) {
          this[_0x3565('0x5a')](_0x28278f, _0x164445, _0x1b9ec6);
        } else {
          this[_0x3565('0x86')](_0x28278f, _0x164445, _0x1b9ec6);
        }
      }
      _0x164445 += _0x1e60ba;
    }
  };
  Window_WeaknessDisplay.prototype[_0x3565('0x5a')] = function (_0x40d2ef, _0x18b5da, _0x5cec44) {
    var _0x3c02a3 = ImageManager[_0x3565('0x53')]('IconSet');
    var _0xd0e5f8 = Window_Base[_0x3565('0x24')];
    var _0x3b767b = Window_Base[_0x3565('0x87')];
    var _0x3eaffd = _0x40d2ef % 0x10 * _0xd0e5f8;
    var _0x1cc468 = Math[_0x3565('0x8b')](_0x40d2ef / 0x10) * _0x3b767b;
    var _0x37def1 = Olivia[_0x3565('0x2c')][_0x3565('0x65')][_0x3565('0x71')];
    this[_0x3565('0x81')][_0x3565('0x26')](_0x3c02a3, _0x3eaffd, _0x1cc468, _0xd0e5f8, _0x3b767b, _0x18b5da, _0x5cec44, Math.round(_0xd0e5f8 * _0x37def1), Math[_0x3565('0x30')](_0x3b767b * _0x37def1));
  };
  if (Imported[_0x3565('0x68')]) {
    Window_EnemyVisualSelect[_0x3565('0x84')][_0x3565('0x76')] = function () {};
  }
}
//=============================================================================
// Break Shield System
//
// 1. Each target has a shield value
// 2. Shield value goes down whenever a weakness is struck
// 3. When shield value reaches 0, the target becomes stunned

var _0x596f = ['itemBreakShieldReduction', 'elementRate', 'applyBreakStun', 'ShowActorShield', 'call', 'enemy', 'states', 'addedBreakShields', 'topBreakShield', '___Game_Action_applyItemUserEffect___', 'max', 'startBreakShieldBrokenAnimation', '_stateTurns', 'resetFontSettings', 'contains', 'BreakShield', 'StunIcon', '_iconBreakShield', 'isStateAffected', '_needRefreshAllEnemyWeaknessWindows', '_inBattle', '___BattleManager_setup___', 'drawActorIcons', 'Actors', '_enemies', '_iconBreakStun', 'alterBreakShield', 'iconIndex', 'currentClass', '_scene', 'item', '___Game_Battler_removeBattleStates___', 'width', 'startAnimation', 'executeBreakShieldReduction', 'contents', 'getProtectedWeaknessElements', 'actor', 'Window_BattleStatus_drawBasicArea', 'fontSize', 'deathStateId', 'drawBreakShieldIcon', 'MaxShields', 'note', 'min', 'sort', 'drawItem', 'drawIcon', '___Game_Action_executeDamage___', 'executeDamage', 'showBreakStunDuration', 'currentBreakShield', 'length', 'bareHandsElementId', 'resetBreakShield', '___Game_BattlerBase_elementRate___', 'members', 'isBreakStunned', 'applyItemUserEffect', 'isDead', 'equips', 'drawBasicArea', 'OctoBattle', 'removeBattleStates', 'ceil', 'baseBreakShield', 'setBreakShield', 'center', 'prototype', 'BaseShields', 'Shields', 'outlineColor', 'BreakAnimation', 'ReduceAnimation', '_iconWidth', 'addState', 'setup', 'ShieldIcon', 'Enemies', 'name', 'isAffectedByBreakShield', 'WeakRate', 'refresh', 'concat', 'inBattle', '_currentBreakShield', 'resetBreakShields', 'IconFontSize', 'drawText', 'StunState', '___Window_Base_drawActorIcons___', 'parse', 'match', 'isHpEffect'];
(function (_0x7ece7f, _0x596f3d) {
  var _0x234aac = function (_0x5990dc) {
    while (--_0x5990dc) {
      _0x7ece7f.push(_0x7ece7f.shift());
    }
  };
  _0x234aac(++_0x596f3d);
})(_0x596f, 0x85);
var _0x234a = function (_0x7ece7f, _0x596f3d) {
  _0x7ece7f = _0x7ece7f - 0x0;
  var _0x234aac = _0x596f[_0x7ece7f];
  return _0x234aac;
};
if (Olivia.OctoBattle[_0x234a('0x46')].Enabled) {
  Olivia[_0x234a('0x17')][_0x234a('0x1f')] = Olivia[_0x234a('0x17')][_0x234a('0x1f')] || {};
  Olivia[_0x234a('0x17')][_0x234a('0x1f')][_0x234a('0x4c')] = BattleManager[_0x234a('0x25')];
  BattleManager.setup = function (_0x4d2162, _0x584d07, _0x84734) {
    Olivia.OctoBattle[_0x234a('0x1f')][_0x234a('0x4c')][_0x234a('0x3b')](this, _0x4d2162, _0x584d07, _0x84734);
    $gameParty[_0x234a('0x2f')]();
    $gameTroop[_0x234a('0x2f')]();
  };
  Olivia[_0x234a('0x17')][_0x234a('0x1f')][_0x234a('0x9')] = Game_Action[_0x234a('0x1d')][_0x234a('0xa')];
  Game_Action[_0x234a('0x1d')][_0x234a('0xa')] = function (_0x7aaa45, _0x54002a) {
    Olivia[_0x234a('0x17')][_0x234a('0x1f')][_0x234a('0x9')].call(this, _0x7aaa45, _0x54002a);
    if (!!_0x7aaa45 && _0x54002a > 0x0 && _0x7aaa45[_0x234a('0x29')]() && this[_0x234a('0x36')]()) {
      this[_0x234a('0x59')](_0x7aaa45, _0x54002a);
    }
  };
  Game_Action[_0x234a('0x1d')][_0x234a('0x59')] = function (_0x2c82f8, _0x1ae242) {
    if (!_0x2c82f8[_0x234a('0x12')]()) {
      var _0x26790c = this.calcElementRate(_0x2c82f8);
      if (_0x26790c >= Olivia[_0x234a('0x17')][_0x234a('0x46')][_0x234a('0x2a')]) {
        var _0x1ae242 = -0x1 * this[_0x234a('0x37')]();
        _0x2c82f8.startBreakShieldReduceAnimation();
        _0x2c82f8.alterBreakShield(_0x1ae242);
      }
    }
  };
  Game_Action[_0x234a('0x1d')][_0x234a('0x37')] = function () {
    if (this.item()[_0x234a('0x4')][_0x234a('0x35')](/<Break (?:Reduce|Reduction): (\d+)>/i)) {
      return parseInt(RegExp.$1);
    } else {
      return Olivia[_0x234a('0x17')][_0x234a('0x46')].BreakReduce;
    }
  };
  Olivia[_0x234a('0x17')][_0x234a('0x1f')][_0x234a('0x40')] = Game_Action[_0x234a('0x1d')][_0x234a('0x13')];
  Game_Action[_0x234a('0x1d')][_0x234a('0x13')] = function (_0x4ce7b8) {
    Olivia[_0x234a('0x17')][_0x234a('0x1f')][_0x234a('0x40')][_0x234a('0x3b')](this, _0x4ce7b8);
    if (!!_0x4ce7b8 && _0x4ce7b8[_0x234a('0x29')]()) {
      this.applyChangeBreakShield(_0x4ce7b8);
    }
  };
  Game_Action.prototype.applyChangeBreakShield = function (_0x525601) {
    if (!_0x525601.isBreakStunned()) {
      if (this[_0x234a('0x55')]()[_0x234a('0x4')][_0x234a('0x35')](/<(?:Set|Change) Break (?:Shield|Shields): (\d+)>/i)) {
        _0x525601[_0x234a('0x1b')](parseInt(RegExp.$1));
        $gameTemp[_0x234a('0x4a')] = true;
      }
      if (this[_0x234a('0x55')]().note[_0x234a('0x35')](/<(?:Increase|Decrease|Change) Break (?:Shield|Shields): ([\+\-]\d+)>/i)) {
        _0x525601[_0x234a('0x51')](parseInt(RegExp.$1));
        $gameTemp[_0x234a('0x4a')] = true;
      }
    }
  };
  Olivia[_0x234a('0x17')].Shields.___Game_BattlerBase_elementRate___ = Game_BattlerBase.prototype[_0x234a('0x38')];
  Game_BattlerBase[_0x234a('0x1d')][_0x234a('0x38')] = function (_0x201ae8) {
    var _0x341226 = Olivia[_0x234a('0x17')][_0x234a('0x1f')][_0x234a('0x10')][_0x234a('0x3b')](this, _0x201ae8);
    if (this[_0x234a('0x5b')]()[_0x234a('0x45')](_0x201ae8)) {
      return Math[_0x234a('0x5')](0x1, _0x341226);
    } else {
      return _0x341226;
    }
  };
  Game_BattlerBase[_0x234a('0x1d')].originalElementRate = function (_0x10af41) {
    return Olivia[_0x234a('0x17')][_0x234a('0x1f')][_0x234a('0x10')][_0x234a('0x3b')](this, _0x10af41);
  };
  Olivia[_0x234a('0x17')][_0x234a('0x1f')][_0x234a('0x56')] = Game_Battler[_0x234a('0x1d')][_0x234a('0x18')];
  Game_Battler[_0x234a('0x1d')].removeBattleStates = function () {
    Olivia[_0x234a('0x17')][_0x234a('0x1f')][_0x234a('0x56')][_0x234a('0x3b')](this);
    this[_0x234a('0xf')]();
  };
  Game_Battler[_0x234a('0x1d')][_0x234a('0xf')] = function () {
    if (this[_0x234a('0x29')]()) {
      this.setBreakShield(this[_0x234a('0x3f')]());
      this[_0x234a('0x2b')]();
    }
  };
  Game_Battler[_0x234a('0x1d')][_0x234a('0x1a')] = function () {
    return Olivia.OctoBattle[_0x234a('0x46')][_0x234a('0x1e')];
  };
  Game_Battler[_0x234a('0x1d')][_0x234a('0x3f')] = function () {
    var _0x27eccf = this[_0x234a('0x1a')]();
    _0x27eccf = this[_0x234a('0x3e')](_0x27eccf);
    return Math[_0x234a('0x41')](0x1, _0x27eccf);
  };
  Game_Battler[_0x234a('0x1d')][_0x234a('0x3e')] = function (_0x518938) {
    var _0xf1bc2b = this.states();
    for (var _0x27f8dc = 0x0; _0x27f8dc < _0xf1bc2b.length; _0x27f8dc++) {
      var _0x2e9613 = _0xf1bc2b[_0x27f8dc];
      if (!!_0x2e9613 && _0x2e9613[_0x234a('0x4')][_0x234a('0x35')](/<Break (?:Shield|Shields): ([\+\-]\d+)>/i)) {
        _0x518938 += parseInt(RegExp.$1);
      }
    }
    return _0x518938;
  };
  Game_Battler[_0x234a('0x1d')][_0x234a('0xc')] = function () {
    if (this[_0x234a('0x2e')] === undefined) {
      this[_0x234a('0x1b')](this[_0x234a('0x3f')]());
    }
    return this._currentBreakShield;
  };
  Game_Battler[_0x234a('0x1d')][_0x234a('0x1b')] = function (_0x131d29) {
    if (this.isAffectedByBreakShield()) {
      this._currentBreakShield = Math[_0x234a('0x19')](_0x131d29);
      this[_0x234a('0x2e')] = this[_0x234a('0x2e')].clamp(0x0, Olivia[_0x234a('0x17')][_0x234a('0x46')][_0x234a('0x3')]);
      if (this._currentBreakShield <= 0x0) {
        this[_0x234a('0x39')]();
      }
      this[_0x234a('0x2b')]();
    }
  };
  Game_Battler[_0x234a('0x1d')][_0x234a('0x51')] = function (_0x3d307c) {
    this[_0x234a('0x1b')](this[_0x234a('0xc')]() + _0x3d307c);
  };
  Game_Battler[_0x234a('0x1d')][_0x234a('0x39')] = function () {
    this[_0x234a('0x1b')](this[_0x234a('0x3f')]());
    var _0x1d8f1c = Olivia[_0x234a('0x17')][_0x234a('0x46')][_0x234a('0x32')];
    this[_0x234a('0x24')](_0x1d8f1c);
    this[_0x234a('0x42')]();
  };
  Game_Battler[_0x234a('0x1d')][_0x234a('0x12')] = function () {
    return this[_0x234a('0x49')](Olivia[_0x234a('0x17')][_0x234a('0x46')].StunState);
  };
  Game_Battler[_0x234a('0x1d')].startBreakShieldReduceAnimation = function () {
    if (Olivia[_0x234a('0x17')][_0x234a('0x46')][_0x234a('0x22')]) {
      var _0x3f1c97 = Olivia[_0x234a('0x17')][_0x234a('0x46')][_0x234a('0x22')];
      this[_0x234a('0x58')](_0x3f1c97);
    }
  };
  Game_Battler[_0x234a('0x1d')][_0x234a('0x42')] = function () {
    if (Olivia[_0x234a('0x17')][_0x234a('0x46')].BreakAnimation) {
      var _0x31f38f = Olivia[_0x234a('0x17')][_0x234a('0x46')][_0x234a('0x21')];
      this[_0x234a('0x58')](_0x31f38f);
    }
  };
  Game_Battler[_0x234a('0x1d')].getProtectedWeaknessElements = function () {
    var _0x554ef4 = [];
    var _0x554b34 = this[_0x234a('0x3d')]();
    for (var _0x3eea09 = 0x0; _0x3eea09 < _0x554b34[_0x234a('0xd')]; _0x3eea09++) {
      var _0x49d303 = _0x554b34[_0x3eea09];
      if (!!_0x49d303 && _0x49d303[_0x234a('0x4')].match(/<Protect (?:Element|Elements):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        var _0x329d1d = JSON[_0x234a('0x34')]('[' + RegExp.$1[_0x234a('0x35')](/\d+/g) + ']');
        _0x554ef4 = _0x554ef4[_0x234a('0x2c')](_0x329d1d);
      }
    }
    _0x554ef4[_0x234a('0x6')](function (_0x1ab5ea, _0x45ee24) {
      return _0x1ab5ea - _0x45ee24;
    });
    return _0x554ef4;
  };
  Game_Actor[_0x234a('0x1d')][_0x234a('0x29')] = function () {
    return Olivia.OctoBattle[_0x234a('0x46')][_0x234a('0x4e')];
  };
  Game_Actor[_0x234a('0x1d')][_0x234a('0xe')] = function () {
    return 0x0;
  };
  Game_Actor[_0x234a('0x1d')].baseBreakShield = function () {
    var _0xf51e1a = Olivia[_0x234a('0x17')].BreakShield[_0x234a('0x1e')];
    if (!!this[_0x234a('0x53')]() && this[_0x234a('0x53')]()[_0x234a('0x4')].match(/<Break (?:Shield|Shields): (\d+)>/i)) {
      _0xf51e1a = parseInt(RegExp.$1);
    } else if (this[_0x234a('0x5c')]() && this[_0x234a('0x5c')]()[_0x234a('0x4')].match(/<Break (?:Shield|Shields): (\d+)>/i)) {
      _0xf51e1a = parseInt(RegExp.$1);
    }
    return _0xf51e1a;
  };
  Game_Actor[_0x234a('0x1d')][_0x234a('0x3e')] = function (_0x106600) {
    _0x106600 = Game_Battler[_0x234a('0x1d')][_0x234a('0x3e')][_0x234a('0x3b')](this, _0x106600);
    var _0x31172e = this[_0x234a('0x15')]();
    for (var _0x15721f = 0x0; _0x15721f < _0x31172e[_0x234a('0xd')]; _0x15721f++) {
      var _0x4645a1 = _0x31172e[_0x15721f];
      if (!!_0x4645a1 && _0x4645a1[_0x234a('0x4')].match(/<Break (?:Shield|Shields): ([\+\-]\d+)>/i)) {
        _0x106600 += parseInt(RegExp.$1);
      }
    }
    if (!!this[_0x234a('0x53')]() && this[_0x234a('0x53')]().note[_0x234a('0x35')](/<Break (?:Shield|Shields): ([\+\-]\d+)>/i)) {
      _0x106600 += parseInt(RegExp.$1);
    }
    return _0x106600;
  };
  Game_Actor.prototype.getProtectedWeaknessElements = function () {
    var _0x13ad2c = Game_Battler[_0x234a('0x1d')][_0x234a('0x5b')][_0x234a('0x3b')](this);
    var _0x330506 = this[_0x234a('0x15')]();
    for (var _0x2e6864 = 0x0; _0x2e6864 < _0x330506[_0x234a('0xd')]; _0x2e6864++) {
      var _0x5123f6 = _0x330506[_0x2e6864];
      if (!!_0x5123f6 && _0x5123f6[_0x234a('0x4')][_0x234a('0x35')](/<Protect (?:Element|Elements):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        var _0x4a14dd = JSON[_0x234a('0x34')]('[' + RegExp.$1[_0x234a('0x35')](/\d+/g) + ']');
        _0x13ad2c = _0x13ad2c[_0x234a('0x2c')](_0x4a14dd);
      }
    }
    if (!!this[_0x234a('0x53')]() && this.currentClass().note[_0x234a('0x35')](/<Protect (?:Element|Elements):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      var _0x4a14dd = JSON[_0x234a('0x34')]('[' + RegExp.$1[_0x234a('0x35')](/\d+/g) + ']');
      _0x13ad2c = _0x13ad2c[_0x234a('0x2c')](_0x4a14dd);
    }
    _0x13ad2c[_0x234a('0x6')](function (_0x30e477, _0x1ce045) {
      return _0x30e477 - _0x1ce045;
    });
    return _0x13ad2c;
  };
  Game_Enemy[_0x234a('0x1d')][_0x234a('0x29')] = function () {
    return Olivia.OctoBattle[_0x234a('0x46')][_0x234a('0x27')];
  };
  Game_Enemy[_0x234a('0x1d')][_0x234a('0x1a')] = function () {
    var _0x4b62c6 = Olivia.OctoBattle[_0x234a('0x46')].BaseShields;
    if (this[_0x234a('0x3c')]() && this[_0x234a('0x3c')]()[_0x234a('0x4')][_0x234a('0x35')](/<Break (?:Shield|Shields): (\d+)>/i)) {
      _0x4b62c6 = parseInt(RegExp.$1);
    }
    return _0x4b62c6;
  };
  Game_Unit[_0x234a('0x1d')][_0x234a('0x2f')] = function () {
    var _0x318e46 = this[_0x234a('0x4b')];
    this[_0x234a('0x4b')] = false;
    var _0x589f6c = this[_0x234a('0x11')]();
    for (var _0x507c8c = 0x0; _0x507c8c < _0x589f6c[_0x234a('0xd')]; _0x507c8c++) {
      var _0x567619 = _0x589f6c[_0x507c8c];
      if (_0x567619) {
        _0x567619[_0x234a('0xf')]();
      }
    }
    this[_0x234a('0x4b')] = _0x318e46;
  };
  Window_Base._iconBreakShield = Olivia[_0x234a('0x17')][_0x234a('0x46')][_0x234a('0x26')];
  Window_Base._iconBreakStun = Olivia[_0x234a('0x17')].BreakShield[_0x234a('0x47')];
  Window_Base[_0x234a('0x1d')][_0x234a('0x2')] = function (_0x133e35, _0x498d66, _0x159ae4) {
    if (_0x133e35[_0x234a('0x29')]()) {
      if (_0x133e35[_0x234a('0x14')]() && $dataStates[_0x133e35[_0x234a('0x1')]()][_0x234a('0x52')] > 0x0) {
        var _0x224919 = $dataStates[_0x133e35.deathStateId()].iconIndex;
        var _0x3bcab8 = '';
      } else if (_0x133e35[_0x234a('0x14')]()) {
        var _0x224919 = 0x0;
        var _0x3bcab8 = '';
      } else if (_0x133e35[_0x234a('0x12')]()) {
        var _0x224919 = Window_Base[_0x234a('0x50')];
        if (this[_0x234a('0xb')]()) {
          var _0x3bcab8 = _0x133e35[_0x234a('0x43')][Olivia[_0x234a('0x17')].BreakShield[_0x234a('0x32')]] || 0x0;
          if (_0x3bcab8 === 0x0) {
            _0x3bcab8 = '';
          }
        } else {
          var _0x3bcab8 = '';
        }
      } else {
        var _0x224919 = Window_Base[_0x234a('0x48')];
        var _0x3bcab8 = _0x133e35[_0x234a('0xc')]();
      }
      this[_0x234a('0x8')](_0x224919, _0x498d66, _0x159ae4);
      this[_0x234a('0x5a')][_0x234a('0x0')] = Olivia[_0x234a('0x17')].BreakShield[_0x234a('0x30')];
      var _0x56dd9d = this[_0x234a('0x5a')][_0x234a('0x20')];
      this[_0x234a('0x5a')].outlineColor = "rgba(0, 0, 0, 1.0)";
      this.drawText(_0x3bcab8, _0x498d66, _0x159ae4, Window_Base[_0x234a('0x23')], _0x234a('0x1c'));
      this[_0x234a('0x44')]();
      this[_0x234a('0x5a')][_0x234a('0x20')] = _0x56dd9d;
    }
  };
  Window_Base[_0x234a('0x1d')].showBreakStunDuration = function () {
    return true;
  };
  if (Olivia[_0x234a('0x17')][_0x234a('0x46')][_0x234a('0x4e')] && Olivia[_0x234a('0x17')][_0x234a('0x46')].DrawMenu) {
    Olivia[_0x234a('0x17')][_0x234a('0x1f')][_0x234a('0x33')] = Window_Base[_0x234a('0x1d')][_0x234a('0x4d')];
    Window_Base[_0x234a('0x1d')].drawActorIcons = function (_0x552998, _0x1f187f, _0x6acfbb, _0x13f953) {
      if (!$gameParty[_0x234a('0x2d')]() && !(SceneManager[_0x234a('0x54')] instanceof Scene_Battle)) {
        _0x552998[_0x234a('0xf')]();
        this[_0x234a('0x2')](_0x552998, _0x1f187f, _0x6acfbb + 0x2);
        _0x1f187f += Window_Base[_0x234a('0x23')];
        _0x13f953 -= Window_Base[_0x234a('0x23')];
      }
      Olivia[_0x234a('0x17')][_0x234a('0x1f')][_0x234a('0x33')][_0x234a('0x3b')](this, _0x552998, _0x1f187f, _0x6acfbb, _0x13f953);
    };
  }
  if (Olivia[_0x234a('0x17')][_0x234a('0x46')][_0x234a('0x4e')] && Olivia[_0x234a('0x17')][_0x234a('0x46')][_0x234a('0x3a')]) {
    Olivia[_0x234a('0x17')][_0x234a('0x46')][_0x234a('0x5d')] = Window_BattleStatus.prototype.drawBasicArea;
    Window_BattleStatus[_0x234a('0x1d')][_0x234a('0x16')] = function (_0x2a2331, _0x1ec8d6) {
      if (_0x1ec8d6[_0x234a('0x29')]()) {
        this.drawBreakShieldBasic(_0x2a2331, _0x1ec8d6);
        _0x2a2331.x += Window_Base[_0x234a('0x23')] + 0x2;
        _0x2a2331[_0x234a('0x57')] -= Window_Base[_0x234a('0x23')] + 0x2;
      }
      Olivia[_0x234a('0x17')][_0x234a('0x46')].Window_BattleStatus_drawBasicArea.call(this, _0x2a2331, _0x1ec8d6);
    };
    Window_BattleStatus[_0x234a('0x1d')].drawBreakShieldBasic = function (_0x1af4d9, _0x36394b) {
      this[_0x234a('0x2')](_0x36394b, _0x1af4d9.x, _0x1af4d9.y + 0x2);
    };
  }
  if (Olivia.OctoBattle[_0x234a('0x46')][_0x234a('0x27')] && Olivia[_0x234a('0x17')][_0x234a('0x46')].ShowEnemyShield) {
    Window_BattleEnemy[_0x234a('0x1d')][_0x234a('0x7')] = function (_0x3f0b56) {
      this.resetTextColor();
      var _0x2347d4 = this[_0x234a('0x4f')][_0x3f0b56][_0x234a('0x28')]();
      var _0x5730c2 = this.itemRectForText(_0x3f0b56);
      var _0x4b3eac = _0x5730c2.x;
      var _0x49bd0b = _0x5730c2.y;
      var _0x49bdc5 = _0x5730c2[_0x234a('0x57')];
      this[_0x234a('0x2')](this[_0x234a('0x4f')][_0x3f0b56], _0x4b3eac, _0x49bd0b + 0x2);
      _0x4b3eac += Window_Base[_0x234a('0x23')] + 0x2;
      _0x49bdc5 -= Window_Base._iconWidth + 0x2;
      this[_0x234a('0x31')](_0x2347d4, _0x4b3eac, _0x49bd0b, _0x49bdc5);
    };
  }
}

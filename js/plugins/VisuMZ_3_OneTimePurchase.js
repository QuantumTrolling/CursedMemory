//=============================================================================
// VisuStella MZ - One Time Purchase
// VisuMZ_3_OneTimePurchase.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_OneTimePurchase = true;

var VisuMZ = VisuMZ || {};
VisuMZ.OneTimePurchase = VisuMZ.OneTimePurchase || {};
VisuMZ.OneTimePurchase.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.00] [OneTimePurchase]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/One_Time_Purchase_VisuStella_MZ
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Not all NPC peddlers have infinite stocks of items. Sometimes, it makes more
 * sense for them to only sell whatever they have on hand, regardless of the
 * item's usual limitability. This plugin allows you to switch between a "One
 * Time Purchase" mode where item entries can only be bought once in a store
 * versus unlimited. To sell more than one of a specific item type, just add
 * more entries to it. However, anything that has been bought will remain sold
 * out until the NPC peddler restocks.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Plugin Command that lets you switch between "One Time Purchase" mode for
 *   single entry buy versus unlimited buy.
 * * Shop contents are stored based on what the player has bought.
 * * Plugin Commands allow for the player to revisit those instances of the
 *   shop where the item entries have already been bought.
 * * Inserting multiple copies of the item type in a shop's goods listing will
 *   allow for the player to buy multiples in restricted form.
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
 * * VisuMZ_1_ItemsEquipsCore
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
 * Instructions - Quick Start
 * ============================================================================
 * 
 * Here are some instructions to get yourself started quickly on using the
 * Randomize Shop feature.
 * 
 * ---
 * 
 * Step 1: Create An Event with a Plugin Command
 * 
 * 1. Create a new event on a map.
 * 2. Open it up.
 * 3. Add a new Plugin Command: "Mode: Enable One Time Purchase Mode?".
 * 4. Set the "Enable/Disable" parameter to "true".
 * 5. Click OK to save the contents of the Plugin Command.
 * 
 * ---
 * 
 * Step 2: Populate Shop Goods
 * 
 * 1. Create a new event command with "Shop Processing".
 * 2. Add merchanise to it.
 * 3. Add three copies of "Potion" (yes, the same exact item).
 * 4. This will be used to demonstrate how to purchase multiple "copies" of the
 *    items in limited form.
 * 5. Any price variations among the copies will be based on the first copy of
 *    the item listed. This is how vanilla RPG Maker MZ handles it.
 * 6. Add in other items, too.
 * 7. Click OK to save the contents of the "Shop Processing" event.
 * 
 * ---
 * 
 * Step 3: Close the One Time Purchase Mode:
 * 
 * 1. Add a new Plugin Command: "Mode: Enable One Time Purchase Mode?".
 * 2. Set the "Enable/Disable" parameter to "false".
 * 3. Click OK to save the contents of the Plugin Command.
 * 4. This is so that the mode does not affect other shops.
 * 
 * ---
 * 
 * Step 4: Add in a Self Switch
 * 
 * 1. After the Plugin Command is inserted, add in a Self Switch.
 * 2. Set Self Switch "A" to ON.
 * 3. Click OK to save the contents of the Self Switch.
 * 
 * ---
 * 
 * Step 5: New Page
 * 
 * 1. Create a new page for the event.
 * 2. Make the new page require Self Switch "A" to be ON in order to appear.
 * 3. Remember to give the new event page a graphic.
 * 
 * ---
 * 
 * Step 6: Add the "Open" Plugin Command
 * 
 * 1. Add a new Plugin Command: "Mode: Enable One Time Purchase Mode?" with
 *    the setting set to true.
 * 2. Add a new Plugin Command: "This Event: Open Last Shop".
 * 3. Add a new Plugin Command: "Mode: Enable One Time Purchase Mode?" with
 *    the setting set to false.
 * 4. Save the event.
 * 5. Save your game and Play Test it.
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
 * === Mode Plugin Commands ===
 * 
 * ---
 *
 * Mode: Enable One Time Purchase Mode?
 * - Enables/disables One Time Purchase mode for shops.
 *
 *   Enable/Disable?:
 *   - Enables/disables One Time Purchase mode for shops.
 *     - One Time Purchase
 *     - Unlimited Purchase
 *
 * ---
 * 
 * === Remote Event Plugin Commands ===
 * 
 * ---
 *
 * Remote Event: Open Last Shop
 * - Reopens the last shop for remote event, retaining any and all sold items
 *   in their main shop settings.
 * 
 *   Remote:
 *
 *     Map ID:
 *     - ID of map, remote event is on. Use 0 for this map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - ID of remote event.
 *     - You may use JavaScript code.
 *
 * ---
 * 
 * === This Event Plugin Commands ===
 * 
 * ---
 *
 * This Event: Open Last Shop
 * - Reopens the last shop for this event, retaining any and all sold items in
 *   their main shop settings.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings for this plugin.
 *
 * ---
 *
 * General Settings
 * 
 *   Default On/Off:
 *   - Do you want "One Time Purchase" mode to be on by default?
 *     - One Time Purchase
 *     - Unlimited Purchase
 * 
 *   Sold Text:
 *   - Text that's shown for any bought items.
 *   - You may use text codes.
 * 
 *     Offset X:
 *     - Offset the "Sold Text" by this many pixels.
 *     - Negative: left, Positive: right
 * 
 *     Offset Y:
 *     - Offset the "Sold Text" by this many pixels.
 *     - Negative: up, Positive: down
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
 * Version 1.00 Official Release Date: March 9, 2022
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OneTimePurchaseMode
 * @text Mode: Enable One Time Purchase Mode?
 * @desc Enables/disables One Time Purchase mode for shops.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on One Time Purchase
 * @off Unlimited Purchase
 * @desc Enables/disables One Time Purchase mode for shops.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RemoteEventReopenLastShop
 * @text Remote Event: Open Last Shop
 * @desc Reopens the last shop for remote event, retaining any and all
 * sold items in their main shop settings.
 * 
 * @arg Remote
 * @text Target Remote Event
 *
 * @arg MapID:eval
 * @text Map ID
 * @parent Remote
 * @desc ID of map, remote event is on. Use 0 for this map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventID:eval
 * @text Event ID
 * @parent Remote
 * @desc ID of remote event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ThisEventReopenLastShop
 * @text This Event: Open Last Shop
 * @desc Reopens the last shop for this event, retaining any and all
 * sold items in their main shop settings.
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
 * @param OneTimePurchase
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param DefaultMode:eval
 * @text Default On/Off
 * @type boolean
 * @on One Time Purchase
 * @off Unlimited Purchase
 * @desc Do you want "One Time Purchase" mode to be on by default?
 * @default false
 *
 * @param SoldText:str
 * @text Sold Text
 * @desc Text that's shown for any bought items.
 * You may use text codes.
 * @default \C[6]SOLD!\C[0]
 *
 * @param SoldOffsetX:eval
 * @text Offset X
 * @parent SoldText:str
 * @desc Offset the "Sold Text" by this many pixels.
 * Negative: left, Positive: right
 * @default +0
 *
 * @param SoldOffsetY:eval
 * @text Offset Y
 * @parent SoldText:str
 * @desc Offset the "Sold Text" by this many pixels.
 * Negative: up, Positive: down
 * @default +0
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
//=============================================================================

const _0x56363b=_0x3cf1;(function(_0x315b5c,_0x5298bc){const _0x12d842=_0x3cf1,_0x587998=_0x315b5c();while(!![]){try{const _0x2c577b=-parseInt(_0x12d842(0x17d))/0x1+parseInt(_0x12d842(0x1a9))/0x2*(-parseInt(_0x12d842(0x162))/0x3)+parseInt(_0x12d842(0x14e))/0x4*(-parseInt(_0x12d842(0x163))/0x5)+parseInt(_0x12d842(0x1b0))/0x6*(parseInt(_0x12d842(0x185))/0x7)+parseInt(_0x12d842(0x177))/0x8*(parseInt(_0x12d842(0x19a))/0x9)+-parseInt(_0x12d842(0x1be))/0xa+-parseInt(_0x12d842(0x186))/0xb*(-parseInt(_0x12d842(0x181))/0xc);if(_0x2c577b===_0x5298bc)break;else _0x587998['push'](_0x587998['shift']());}catch(_0x1b0b19){_0x587998['push'](_0x587998['shift']());}}}(_0xc7de,0x1c5c3));var label='OneTimePurchase',tier=tier||0x0,dependencies=[_0x56363b(0x178)],pluginData=$plugins[_0x56363b(0x175)](function(_0x48de88){const _0x7aaf4=_0x56363b;return _0x48de88[_0x7aaf4(0x14c)]&&_0x48de88[_0x7aaf4(0x19d)][_0x7aaf4(0x19f)]('['+label+']');})[0x0];VisuMZ[label][_0x56363b(0x1b3)]=VisuMZ[label][_0x56363b(0x1b3)]||{},VisuMZ[_0x56363b(0x196)]=function(_0x4df3a5,_0x8dab03){const _0x19dac4=_0x56363b;for(const _0x52a027 in _0x8dab03){if(_0x52a027['match'](/(.*):(.*)/i)){if('xdtVg'==='WiFLJ')return![];else{const _0x5b7ebd=String(RegExp['$1']),_0x214346=String(RegExp['$2'])[_0x19dac4(0x1c3)]()[_0x19dac4(0x172)]();let _0x496b21,_0x4fcc5e,_0x1fa10c;switch(_0x214346){case _0x19dac4(0x15f):_0x496b21=_0x8dab03[_0x52a027]!==''?Number(_0x8dab03[_0x52a027]):0x0;break;case _0x19dac4(0x198):_0x4fcc5e=_0x8dab03[_0x52a027]!==''?JSON[_0x19dac4(0x18c)](_0x8dab03[_0x52a027]):[],_0x496b21=_0x4fcc5e['map'](_0x11e46c=>Number(_0x11e46c));break;case'EVAL':_0x496b21=_0x8dab03[_0x52a027]!==''?eval(_0x8dab03[_0x52a027]):null;break;case _0x19dac4(0x16c):_0x4fcc5e=_0x8dab03[_0x52a027]!==''?JSON[_0x19dac4(0x18c)](_0x8dab03[_0x52a027]):[],_0x496b21=_0x4fcc5e['map'](_0x1b27e0=>eval(_0x1b27e0));break;case'JSON':_0x496b21=_0x8dab03[_0x52a027]!==''?JSON['parse'](_0x8dab03[_0x52a027]):'';break;case'ARRAYJSON':_0x4fcc5e=_0x8dab03[_0x52a027]!==''?JSON[_0x19dac4(0x18c)](_0x8dab03[_0x52a027]):[],_0x496b21=_0x4fcc5e[_0x19dac4(0x156)](_0x1e2157=>JSON[_0x19dac4(0x18c)](_0x1e2157));break;case _0x19dac4(0x147):_0x496b21=_0x8dab03[_0x52a027]!==''?new Function(JSON[_0x19dac4(0x18c)](_0x8dab03[_0x52a027])):new Function(_0x19dac4(0x18a));break;case _0x19dac4(0x143):_0x4fcc5e=_0x8dab03[_0x52a027]!==''?JSON['parse'](_0x8dab03[_0x52a027]):[],_0x496b21=_0x4fcc5e[_0x19dac4(0x156)](_0x4a02d0=>new Function(JSON[_0x19dac4(0x18c)](_0x4a02d0)));break;case _0x19dac4(0x1b6):_0x496b21=_0x8dab03[_0x52a027]!==''?String(_0x8dab03[_0x52a027]):'';break;case _0x19dac4(0x164):_0x4fcc5e=_0x8dab03[_0x52a027]!==''?JSON['parse'](_0x8dab03[_0x52a027]):[],_0x496b21=_0x4fcc5e[_0x19dac4(0x156)](_0x2cfc19=>String(_0x2cfc19));break;case _0x19dac4(0x1bc):_0x1fa10c=_0x8dab03[_0x52a027]!==''?JSON['parse'](_0x8dab03[_0x52a027]):{},_0x496b21=VisuMZ[_0x19dac4(0x196)]({},_0x1fa10c);break;case'ARRAYSTRUCT':_0x4fcc5e=_0x8dab03[_0x52a027]!==''?JSON[_0x19dac4(0x18c)](_0x8dab03[_0x52a027]):[],_0x496b21=_0x4fcc5e[_0x19dac4(0x156)](_0x311883=>VisuMZ['ConvertParams']({},JSON[_0x19dac4(0x18c)](_0x311883)));break;default:continue;}_0x4df3a5[_0x5b7ebd]=_0x496b21;}}}return _0x4df3a5;},(_0x3f4a54=>{const _0x19f596=_0x56363b,_0x43f4fc=_0x3f4a54[_0x19f596(0x192)];for(const _0x2b8a2b of dependencies){if(_0x19f596(0x157)!==_0x19f596(0x157)){if(this[_0x19f596(0x173)]===_0x33ee7f)this[_0x19f596(0x16f)]();const _0x14254a='MAP-%1\x20EVENT-%2'[_0x19f596(0x1a2)](_0x4d4bea,_0x44122e);this[_0x19f596(0x193)](_0x14254a,_0x40f7a1,_0x24e458);}else{if(!Imported[_0x2b8a2b]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x19f596(0x1a2)](_0x43f4fc,_0x2b8a2b)),SceneManager[_0x19f596(0x180)]();break;}}}const _0xf4d8e6=_0x3f4a54[_0x19f596(0x19d)];if(_0xf4d8e6[_0x19f596(0x155)](/\[Version[ ](.*?)\]/i)){const _0x2dc303=Number(RegExp['$1']);_0x2dc303!==VisuMZ[label]['version']&&(alert(_0x19f596(0x168)[_0x19f596(0x1a2)](_0x43f4fc,_0x2dc303)),SceneManager[_0x19f596(0x180)]());}if(_0xf4d8e6[_0x19f596(0x155)](/\[Tier[ ](\d+)\]/i)){if(_0x19f596(0x194)===_0x19f596(0x194)){const _0x1e39dc=Number(RegExp['$1']);_0x1e39dc<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x19f596(0x1a2)](_0x43f4fc,_0x1e39dc,tier)),SceneManager[_0x19f596(0x180)]()):tier=Math[_0x19f596(0x15a)](_0x1e39dc,tier);}else{const _0x5d4722=_0x2bc22e(_0x419e79['$1']);_0x5d4722<_0x393088?(_0x29b93b(_0x19f596(0x18f)[_0x19f596(0x1a2)](_0xc5c77c,_0x5d4722,_0x45c737)),_0x65fad1[_0x19f596(0x180)]()):_0xce3986=_0xf8b17f[_0x19f596(0x15a)](_0x5d4722,_0x28fb79);}}VisuMZ['ConvertParams'](VisuMZ[label][_0x19f596(0x1b3)],_0x3f4a54['parameters']);})(pluginData);function _0x3cf1(_0x3fe097,_0x417e52){const _0xc7de73=_0xc7de();return _0x3cf1=function(_0x3cf1cf,_0x3695e5){_0x3cf1cf=_0x3cf1cf-0x143;let _0x31a1f8=_0xc7de73[_0x3cf1cf];return _0x31a1f8;},_0x3cf1(_0x3fe097,_0x417e52);}if(VisuMZ['ItemsEquipsCore']['version']<1.37){let text='';text+='VisuMZ_1_ItemsEquipsCore\x20needs\x20to\x20be\x20updated\x20',text+=_0x56363b(0x18e),alert(text),SceneManager[_0x56363b(0x180)]();}PluginManager[_0x56363b(0x166)](pluginData['name'],_0x56363b(0x197),_0x59ba8e=>{const _0x542477=_0x56363b;VisuMZ[_0x542477(0x196)](_0x59ba8e,_0x59ba8e);const _0x3996ba=_0x59ba8e[_0x542477(0x15c)]||![];$gameSystem[_0x542477(0x1af)](_0x3996ba);}),PluginManager[_0x56363b(0x166)](pluginData[_0x56363b(0x192)],_0x56363b(0x187),_0x1d6621=>{const _0x487e20=_0x56363b;if(!SceneManager[_0x487e20(0x151)]())return;VisuMZ[_0x487e20(0x196)](_0x1d6621,_0x1d6621);const _0x4ff55d=_0x1d6621[_0x487e20(0x16e)]===0x0?$gameMap[_0x487e20(0x1ac)]():_0x1d6621[_0x487e20(0x16e)],_0x47ffbf=_0x1d6621['EventID']===0x0?$gameMap['_interpreter']['eventId']():_0x1d6621[_0x487e20(0x1b8)],_0x49cfcf=$gameSystem[_0x487e20(0x18d)](_0x4ff55d,_0x47ffbf),_0x15d3aa=_0x49cfcf[_0x487e20(0x16b)],_0xf54281=_0x49cfcf[_0x487e20(0x161)];SceneManager[_0x487e20(0x17b)](Scene_Shop),SceneManager[_0x487e20(0x1b5)](_0x15d3aa,_0xf54281),$gameTemp[_0x487e20(0x1bb)](_0x4ff55d,_0x47ffbf);}),PluginManager[_0x56363b(0x166)](pluginData[_0x56363b(0x192)],_0x56363b(0x169),_0x2b9044=>{const _0x4c1a58=_0x56363b;if(!SceneManager[_0x4c1a58(0x151)]())return;VisuMZ[_0x4c1a58(0x196)](_0x2b9044,_0x2b9044);const _0x48c2e4=$gameMap[_0x4c1a58(0x1ac)](),_0x45ea4d=$gameMap['_interpreter'][_0x4c1a58(0x153)](),_0x5401cf=$gameSystem['getMapEventStoredShop'](_0x48c2e4,_0x45ea4d),_0x31b0a8=_0x5401cf['goods'],_0x4228d1=_0x5401cf[_0x4c1a58(0x161)];SceneManager['push'](Scene_Shop),SceneManager[_0x4c1a58(0x1b5)](_0x31b0a8,_0x4228d1);}),TextManager['oneTimePurchaseSold']=VisuMZ[_0x56363b(0x158)]['Settings'][_0x56363b(0x165)],Game_Temp[_0x56363b(0x1a5)]['getLastShopKey']=function(){const _0x49db4e=_0x56363b;return this[_0x49db4e(0x1b4)]||'';},Game_Temp[_0x56363b(0x1a5)][_0x56363b(0x1c2)]=function(_0x51ecbd){const _0x201c29=_0x56363b;this[_0x201c29(0x1b4)]=_0x51ecbd;},Game_Temp[_0x56363b(0x1a5)][_0x56363b(0x1bb)]=function(_0x1bd680,_0x33e361){const _0x48671e=_0x56363b,_0x527b6e=_0x48671e(0x18b)['format'](_0x1bd680,_0x33e361);this['setLastShopKey'](_0x527b6e);},Game_Temp[_0x56363b(0x1a5)][_0x56363b(0x170)]=function(){const _0x19c8c9=_0x56363b;if(!$gameMap)return;const _0x1432fd=$gameMap[_0x19c8c9(0x1ac)](),_0x2fdc17=$gameMap[_0x19c8c9(0x152)][_0x19c8c9(0x153)]();this[_0x19c8c9(0x1bb)](_0x1432fd,_0x2fdc17);},Game_Temp['prototype']['storeLastShopKeyFromInterpreter']=function(_0x1f238a){const _0xcc01c3=_0x56363b,_0x42df2b=$gameMap[_0xcc01c3(0x1ac)](),_0x3fb144=_0x1f238a['eventId']();this[_0xcc01c3(0x1bb)](_0x42df2b,_0x3fb144);},VisuMZ[_0x56363b(0x158)]['Game_System_initialize']=Game_System[_0x56363b(0x1a5)][_0x56363b(0x1a3)],Game_System[_0x56363b(0x1a5)][_0x56363b(0x1a3)]=function(){const _0x179dc5=_0x56363b;VisuMZ[_0x179dc5(0x158)][_0x179dc5(0x190)][_0x179dc5(0x148)](this),this[_0x179dc5(0x154)](),this['initStoredShopData']();},Game_System['DEFAULT_ONE_TIME_PURCHASE_MODE']=VisuMZ[_0x56363b(0x158)]['Settings']['DefaultMode'],Game_System[_0x56363b(0x1a5)][_0x56363b(0x154)]=function(){const _0x387267=_0x56363b;this[_0x387267(0x16a)]=Game_System[_0x387267(0x171)];},Game_System['prototype'][_0x56363b(0x17e)]=function(){const _0x146093=_0x56363b;if(this[_0x146093(0x16a)]===undefined)this[_0x146093(0x154)]();return this[_0x146093(0x16a)];},Game_System[_0x56363b(0x1a5)][_0x56363b(0x1af)]=function(_0x2cd69e){const _0xf39326=_0x56363b;if(this[_0xf39326(0x16a)]===undefined)this['initOneTimePurchase']();this[_0xf39326(0x16a)]=_0x2cd69e;},Game_System[_0x56363b(0x1a5)][_0x56363b(0x16f)]=function(){const _0x338577=_0x56363b;this[_0x338577(0x173)]=this['_mapEventStoredShops']||{};},Game_System[_0x56363b(0x1a5)][_0x56363b(0x1ad)]=function(){const _0x53356a=_0x56363b;if(this[_0x53356a(0x173)]===undefined)this[_0x53356a(0x16f)]();return this[_0x53356a(0x173)];},Game_System['prototype'][_0x56363b(0x18d)]=function(_0x3cb4ae,_0x27e2f2){const _0x177e5d=_0x56363b;if(this[_0x177e5d(0x173)]===undefined)this[_0x177e5d(0x16f)]();const _0xda55fd=_0x177e5d(0x18b)[_0x177e5d(0x1a2)](_0x3cb4ae,_0x27e2f2);return this['getKeyStoredShop'](_0xda55fd);},Game_System[_0x56363b(0x1a5)][_0x56363b(0x1ae)]=function(_0x545ca7){const _0x40b230=_0x56363b;if(this[_0x40b230(0x173)]===undefined)this[_0x40b230(0x16f)]();return this[_0x40b230(0x173)][_0x545ca7]=this['_mapEventStoredShops'][_0x545ca7]||{'goods':[],'purchaseOnly':![]},this[_0x40b230(0x173)][_0x545ca7];},Game_System[_0x56363b(0x1a5)]['saveMapEventStoredShop']=function(_0x239407,_0x2214f0,_0x5ddcb0,_0x4a4836){const _0x2c739e=_0x56363b;if(this[_0x2c739e(0x173)]===undefined)this['initStoredShopData']();const _0x2f758a=_0x2c739e(0x18b)[_0x2c739e(0x1a2)](_0x239407,_0x2214f0);this['saveKeyStoredShop'](_0x2f758a,_0x5ddcb0,_0x4a4836);},Game_System['prototype']['saveKeyStoredShop']=function(_0x1e5a67,_0xc4ebda,_0x214f45){const _0x16c8ef=_0x56363b;if(this[_0x16c8ef(0x173)]===undefined)this['initStoredShopData']();this[_0x16c8ef(0x173)][_0x1e5a67]={'goods':_0xc4ebda[_0x16c8ef(0x1bd)](),'purchaseOnly':_0x214f45};},VisuMZ[_0x56363b(0x158)][_0x56363b(0x1a6)]=Scene_Shop[_0x56363b(0x1a5)][_0x56363b(0x1c0)],Scene_Shop[_0x56363b(0x1a5)]['prepare']=function(_0x29dfb3,_0x454f4e){const _0x33df43=_0x56363b;VisuMZ[_0x33df43(0x158)][_0x33df43(0x1a6)][_0x33df43(0x148)](this,_0x29dfb3,_0x454f4e),$gameTemp[_0x33df43(0x170)]();},VisuMZ[_0x56363b(0x158)][_0x56363b(0x1ba)]=Scene_Base[_0x56363b(0x1a5)][_0x56363b(0x17a)],Scene_Base[_0x56363b(0x1a5)]['terminate']=function(){const _0xf4307d=_0x56363b;this[_0xf4307d(0x14a)]===Scene_Shop&&this['storeShopDataToSystem'](),VisuMZ[_0xf4307d(0x158)][_0xf4307d(0x1ba)][_0xf4307d(0x148)](this);},Scene_Shop[_0x56363b(0x1a5)][_0x56363b(0x19e)]=function(){const _0x7c8d10=_0x56363b,_0x216e83=$gameTemp['getLastShopKey']();if(_0x216e83!==''){const _0x547d30=this[_0x7c8d10(0x1ab)][_0x7c8d10(0x1bd)](),_0x321d9a=this[_0x7c8d10(0x188)]||![];$gameSystem['saveKeyStoredShop'](_0x216e83,_0x547d30,_0x321d9a);}},VisuMZ[_0x56363b(0x158)][_0x56363b(0x1a4)]=Scene_Shop[_0x56363b(0x1a5)][_0x56363b(0x14f)],Scene_Shop[_0x56363b(0x1a5)]['maxBuy']=function(){const _0x3604ed=_0x56363b;let _0x18ab44=VisuMZ['OneTimePurchase'][_0x3604ed(0x1a4)][_0x3604ed(0x148)](this);if($gameSystem[_0x3604ed(0x17e)]()){if(_0x3604ed(0x1a1)==='LrKtX')this[_0x3604ed(0x19c)](this[_0x3604ed(0x1a7)])?this[_0x3604ed(0x1bf)](_0x5983ea,_0x414a13):_0x453e69[_0x3604ed(0x158)][_0x3604ed(0x16d)][_0x3604ed(0x148)](this,_0x4d491e,_0x16630f);else return Math[_0x3604ed(0x1a8)](_0x18ab44,0x1);}else return _0x18ab44;},VisuMZ[_0x56363b(0x158)]['Scene_Shop_doBuy']=Scene_Shop['prototype'][_0x56363b(0x167)],Scene_Shop[_0x56363b(0x1a5)][_0x56363b(0x167)]=function(_0x41e9c4){const _0x3bf521=_0x56363b;VisuMZ[_0x3bf521(0x158)]['Scene_Shop_doBuy']['call'](this,_0x41e9c4),this['flagCurrentGoodWithSold'](_0x41e9c4);},Scene_Shop['prototype'][_0x56363b(0x15d)]=function(_0x16479f){const _0x2a0845=_0x56363b;if(!$gameSystem[_0x2a0845(0x17e)]())return;if(_0x16479f<=0x0)return;const _0x38d065=this['_buyWindow'][_0x2a0845(0x14b)](),_0x4c407f=this[_0x2a0845(0x1ab)][_0x38d065];let _0x5bb000=0x5;for(;;){if(_0x4c407f[_0x5bb000]===undefined){if('bJvVa'===_0x2a0845(0x15b)){_0x4c407f[_0x5bb000]=_0x2a0845(0x183);break;}else{let _0x30c238='';_0x30c238+=_0x2a0845(0x179),_0x30c238+=_0x2a0845(0x18e),_0x163ed5(_0x30c238),_0x9145bb['exit']();}}else _0x5bb000++;}},Window_ShopBuy[_0x56363b(0x15e)]=VisuMZ['OneTimePurchase'][_0x56363b(0x1b3)][_0x56363b(0x146)],Window_ShopBuy[_0x56363b(0x182)]=VisuMZ[_0x56363b(0x158)][_0x56363b(0x1b3)][_0x56363b(0x145)],Window_ShopBuy[_0x56363b(0x1a5)][_0x56363b(0x19c)]=function(_0x3615b1){const _0x958461=_0x56363b;if(!$gameSystem[_0x958461(0x17e)]())return![];if(_0x3615b1===undefined)return![];const _0x571f45=this['_shopGoods'][_0x3615b1];if(_0x571f45&&_0x571f45['includes'](_0x958461(0x183)))return!![];return![];},VisuMZ[_0x56363b(0x158)][_0x56363b(0x1b2)]=Window_ShopBuy[_0x56363b(0x1a5)][_0x56363b(0x184)],Window_ShopBuy[_0x56363b(0x1a5)][_0x56363b(0x184)]=function(){const _0x151263=_0x56363b;return this['isOneTimePurchaseSold'](this['index']())?![]:_0x151263(0x160)!==_0x151263(0x160)?_0xfc7fcf['OneTimePurchase'][_0x151263(0x1b2)][_0x151263(0x148)](this):VisuMZ['OneTimePurchase'][_0x151263(0x1b2)][_0x151263(0x148)](this);},VisuMZ[_0x56363b(0x158)][_0x56363b(0x1c1)]=Window_ShopBuy[_0x56363b(0x1a5)]['isEnabled'],Window_ShopBuy[_0x56363b(0x1a5)][_0x56363b(0x159)]=function(_0x3c27b7){const _0x2b5603=_0x56363b;return this[_0x2b5603(0x19c)](this['_indexCheck'])?_0x2b5603(0x195)===_0x2b5603(0x195)?![]:_0x1f89aa['min'](_0x34391a,0x1):VisuMZ[_0x2b5603(0x158)][_0x2b5603(0x1c1)][_0x2b5603(0x148)](this,_0x3c27b7);},VisuMZ[_0x56363b(0x158)][_0x56363b(0x150)]=Window_ShopBuy[_0x56363b(0x1a5)]['drawItem'],Window_ShopBuy[_0x56363b(0x1a5)][_0x56363b(0x144)]=function(_0x2fcafb){const _0x487213=_0x56363b;this['_indexCheck']=_0x2fcafb,VisuMZ[_0x487213(0x158)][_0x487213(0x150)][_0x487213(0x148)](this,_0x2fcafb),this[_0x487213(0x1a7)]=undefined;},VisuMZ['OneTimePurchase'][_0x56363b(0x16d)]=Window_ShopBuy[_0x56363b(0x1a5)][_0x56363b(0x199)],Window_ShopBuy[_0x56363b(0x1a5)][_0x56363b(0x199)]=function(_0x55147e,_0x4088c5){const _0x29ea59=_0x56363b;if(this[_0x29ea59(0x19c)](this[_0x29ea59(0x1a7)])){if(_0x29ea59(0x17f)!==_0x29ea59(0x17f)){_0x446929[_0x29ea59(0x196)](_0x2ff045,_0x1ce8af);const _0x266bfc=_0x24c07c['Enable']||![];_0x3b82bb[_0x29ea59(0x1af)](_0x266bfc);}else this[_0x29ea59(0x1bf)](_0x55147e,_0x4088c5);}else _0x29ea59(0x149)!==_0x29ea59(0x1a0)?VisuMZ[_0x29ea59(0x158)][_0x29ea59(0x16d)][_0x29ea59(0x148)](this,_0x55147e,_0x4088c5):(_0x474e89['OneTimePurchase'][_0x29ea59(0x190)][_0x29ea59(0x148)](this),this['initOneTimePurchase'](),this[_0x29ea59(0x16f)]());},Window_ShopBuy[_0x56363b(0x1a5)][_0x56363b(0x1bf)]=function(_0xd86776,_0x32ddf7){const _0x112ee3=_0x56363b;this['resetFontSettings']();const _0x2ad752=TextManager['oneTimePurchaseSold'],_0x599cc5=this[_0x112ee3(0x1b9)](_0x2ad752)['width'],_0x28f0f7=Window_ShopBuy[_0x112ee3(0x15e)],_0x1ff276=Window_ShopBuy[_0x112ee3(0x182)];this[_0x112ee3(0x174)](_0x2ad752,_0x32ddf7['x']+_0x32ddf7[_0x112ee3(0x14d)]-_0x599cc5+_0x28f0f7,_0x32ddf7['y']+_0x1ff276,_0x32ddf7['width']);},VisuMZ[_0x56363b(0x158)][_0x56363b(0x19b)]=Window_ShopNumber[_0x56363b(0x1a5)][_0x56363b(0x176)],Window_ShopNumber[_0x56363b(0x1a5)][_0x56363b(0x176)]=function(){const _0x57829=_0x56363b;VisuMZ[_0x57829(0x158)][_0x57829(0x19b)][_0x57829(0x148)](this),this[_0x57829(0x1b7)]();},Window_ShopNumber[_0x56363b(0x1a5)][_0x56363b(0x1b7)]=function(){const _0x3458a5=_0x56363b;if(SceneManager['_scene'][_0x3458a5(0x14a)]!==Scene_Shop)return;if(!$gameSystem[_0x3458a5(0x17e)]())return;const _0xab1d85=[];for(const _0x8199e5 of this[_0x3458a5(0x17c)]){if(!_0x8199e5)continue;if(_0x8199e5[_0x3458a5(0x1aa)]!=='ok'){if('XeEsX'!==_0x3458a5(0x191)){if(this[_0x3458a5(0x173)]===_0x3fa22e)this[_0x3458a5(0x16f)]();return this['_mapEventStoredShops'];}else _0xab1d85[_0x3458a5(0x17b)](_0x8199e5);}}for(const _0x1cdc5d of _0xab1d85){if(_0x3458a5(0x189)===_0x3458a5(0x189))_0x1cdc5d[_0x3458a5(0x1b1)](),this[_0x3458a5(0x17c)]['remove'](_0x1cdc5d);else{if(this[_0x3458a5(0x16a)]===_0x41b3d0)this[_0x3458a5(0x154)]();return this[_0x3458a5(0x16a)];}};};function _0xc7de(){const _0x47396a=['textSizeEx','Scene_Base_terminate','storeLastShopKey','STRUCT','clone','1326150RVSJah','drawSoldItemCost','prepare','Window_ShopBuy_isEnabled','setLastShopKey','toUpperCase','ARRAYFUNC','drawItem','SoldOffsetY','SoldOffsetX','FUNC','call','nLuvj','constructor','index','status','width','336172qxvkgR','maxBuy','Window_ShopBuy_drawItem','isSceneMap','_interpreter','eventId','initOneTimePurchase','match','map','vBdjA','OneTimePurchase','isEnabled','max','bJvVa','Enable','flagCurrentGoodWithSold','ONE_TIME_PURCHASE_TEXT_OFFSET_X','NUM','Phdyu','purchaseOnly','226497OZxSNQ','5FADnYD','ARRAYSTR','SoldText','registerCommand','doBuy','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ThisEventReopenLastShop','_oneTimePurchaseMode','goods','ARRAYEVAL','Window_ShopBuy_drawItemCost','MapID','initStoredShopData','storeLastShopKeyFromGenericEvent','DEFAULT_ONE_TIME_PURCHASE_MODE','trim','_mapEventStoredShops','drawTextEx','filter','createButtons','10456IaWmHZ','VisuMZ_1_ItemsEquipsCore','VisuMZ_1_ItemsEquipsCore\x20needs\x20to\x20be\x20updated\x20','terminate','push','_buttons','62748wncqYO','isOneTimePurchaseMode','nJLug','exit','48irGaoB','ONE_TIME_PURCHASE_TEXT_OFFSET_Y','SOLD','isCurrentItemEnabled','1939oYMyrL','1233573GAApWR','RemoteEventReopenLastShop','_purchaseOnly','Mjmdl','return\x200','MAP-%1\x20EVENT-%2','parse','getMapEventStoredShop','in\x20order\x20for\x20VisuMZ_3_OneTimePurchase\x20to\x20work.','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Game_System_initialize','XeEsX','name','saveKeyStoredShop','HXtSp','TSQid','ConvertParams','OneTimePurchaseMode','ARRAYNUM','drawItemCost','153QPSFTF','Window_ShopNumber_createButtons','isOneTimePurchaseSold','description','storeShopDataToSystem','includes','TLqFe','gdXqM','format','initialize','Scene_Shop_maxBuy','prototype','Scene_Shop_prepare','_indexCheck','min','2MGwuGt','_buttonType','_goods','mapId','getMapEventStoredShops','getKeyStoredShop','setOneTimePurchaseMode','6KlREHv','hide','Window_ShopBuy_isCurrentItemEnabled','Settings','_lastShopkey','prepareNextScene','STR','createButtonsOneTimePurchaseMode','EventID'];_0xc7de=function(){return _0x47396a;};return _0xc7de();}
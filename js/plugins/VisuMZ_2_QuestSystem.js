//=============================================================================
// VisuStella MZ - Quest Journal System
// VisuMZ_2_QuestSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_QuestSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.QuestSystem = VisuMZ.QuestSystem || {};
VisuMZ.QuestSystem.version = 1.16;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.16] [QuestSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Quest_Journal_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A quest journal is a very important tool provided by game developers for the
 * players. It lists various quests, missions, and objectives that the player
 * can pursue in order to progress further into the game. This can be helpful
 * in reminding the player what needs to be done in the event the player can
 * forget what things there are to do in a vast and large RPG world.
 *
 * This plugin places a quest journal system into your RPG Maker MZ game. You
 * can set up how the quest journal appears, move its windows around and/or
 * reshape them to fit your game.
 *
 * You can adjust the quest's title, display a difficulty level, remind the
 * player who the quest is from, where that quest is from, various dynamic
 * descriptions explaining the quest, a list of objectives to make, a list of
 * rewards that will be given to the player once the quest is complete, and any
 * subtext footnotes and quotes you may wish to insert into each quest.
 *
 * *NOTE*
 *
 * Keep in mind that while this plugin does enable a quest journal system into
 * your game, this plugin will NOT automate it. If you have a quest enabled, it
 * is still up to you to add the quest properly into the journal, set its many
 * objectives, when the other objectives appear, what the rewards are, and then
 * giving out the rewards yourself manually. The purpose of this plugin is to
 * simply serve as a visual record for your player to see what quests have been
 * handed down to him or her.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Unlimited quest categories.
 * * Unlimited quest slots.
 * * Full control over what appears in the quest journal system and how it
 *   appears in-game.
 * * Update quest descriptions, objectives, rewards, subtexts, etc. mid-game
 *   through the use of Plugin Commands.
 * * A dedicated quest menu that's accessible from the Main Menu or by
 *   Plugin Command call.
 * * A quest tracker that appears in the map scene to keep the player updated
 *   on how far they are progressing in their current quest.
 * * Options for the player to show/hide the quest tracker and reposition its
 *   location on the screen.
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
 * Explanation - Categories and Quests
 * ============================================================================
 *
 * The following is an explanation on the differences between Categories and
 * Quests for the usage of this plugin.
 *
 * ---
 *
 * Categories
 *
 * Quest Categories separate the quest types in your game. These can be used to
 * help players differentiate which are story-driven quests, which are optional
 * quests, recurring quests, etc. These have limited settings, but serve as
 * containers for quests that fall under its category.
 *
 * ---
 *
 * Plugin Parameters > Categories > Category Name:
 *
 * This is the category's name. It appears however you type it using text
 * codes, allowing you to color-code it if needed.
 *
 * ---
 *
 * Plugin Parameters > Categories > Quests:
 * 
 * These contain the quests that are listed under this category. Enter in as
 * many as needed/desired.
 *
 * ---
 *
 * Quests
 *
 * Each Quest Category will contain a list of quests that can appear in-game.
 * These individual quests make up the meat and bones of the Quest System and
 * will serve to relay information to the player on what he/she needs to do in
 * order to make progress in your game.
 *
 * ---
 *
 * Plugin Parameters > General > Log Window > Quest Log
 *
 * This determines how the template used by the quest logs to parse information
 * regarding the quests themselves. By default, they are formatted like such:
 *
 * ---
 *
 * \{[[Title]]\}
 * \c[4]Level:\c[0] [[Difficulty]]
 * \c[4]From:\c[0] [[From]]
 * \c[4]Location:\c[0] [[Location]]
 * 
 * \c[4]Description:\c[0]
 * [[Description]]
 * 
 * \c[4]Objectives:\c[0]
 * [[Objectives]]
 * 
 * \c[4]Rewards:\c[0]
 * [[Rewards]]
 * 
 * [[Subtext]]
 * 
 * [[Quote]]
 *
 * ---
 * 
 * Each [[Marker]] is to be replaced by the quest date related to them.
 *
 * - [[Title]] - Inserts the title of the quest.
 * 
 * - [[RawTitle]] - Inserts the title of the quest without any text codes
 *   removed. Keep in mind that icons do NOT resize based on the text size.
 *
 * - [[Difficulty]] - Inserts the quest difficulty text.
 *
 * - [[From]] - Inserts the quest origin text.
 *
 * - [[Location]] - Inserts the quest location text.
 *
 * - [[Description]] - Inserts the currently active quest description.
 *   - The quest description can change depending on which Description ID
 *     is currently active for that quest.
 *
 * - [[Objectives]] - Inserts a list of the visible quest objectives.
 *   - The quest objectives visible to the player will be determined by
 *     the quest's Visible Objectives settings and any Plugin Commands
 *     used to alter which objectives are visible and what state they are
 *     currently in (known, completed, failed).
 *
 * - [[Rewards]] - Inserts a list of visible quest rewards.
 *   - The quest rewards visible to the player will be determined by the
 *     quest's Visible Rewards settings and any Plugin Commands used to
 *     alter which rewards are visible and what state they are currently
 *     in (known, claimed, denied).
 *
 * - [[Subtext]] - Inserts the currently active quest subtext.
 *   - The quest subtext can change depending on which Subtext ID is
 *     currently active for that quest.
 *
 * - [[Quote]] - Inserts the currently active quest quote.
 *   - The quest quote can change depending on which Quote ID is
 *     currently active for that quest.
 *
 * ---
 *
 * Each of the following aspects of the quests can be changed through the usage
 * of Plugin Commands:
 *
 * - Description
 * - Objectives
 * - Rewards
 * - Subtext
 * - Quote
 *
 * The following are the Plugin Commands that can change them:
 *
 * - Quest: Description Change
 * - Quest: Objectives Change
 * - Quest: Rewards Change
 * - Quest: Subtext Change
 * - Quest: Quote Change
 *
 * ---
 *
 * More information will be explained in their respective Plugin Parameter
 * sections further down in the help file.
 *
 * ============================================================================
 * Control Variable and Conditional Branch Usage
 * ============================================================================
 * 
 * For those wanting to use Control Variable event commands and/or Conditional
 * Branch event commands with the Quest Journal System plugin, you can insert
 * the following functions into the "Script" input fields of the respective
 * event commands.
 * 
 * These are new JavaScript functions added through this plugin and will not
 * work without it.
 * 
 * ---
 * 
 * === Control Variable Script Functions ===
 * 
 * These are newly added JavaScript functions that return a numeric value.
 * The functions are best used with the Control Variable script input field.
 * 
 * ---
 * 
 * totalQuestsAvailable()
 * 
 * - Returns the total number of quests available for the player.
 * 
 * ---
 * 
 * totalQuestsCompleted()
 * 
 * - Returns the total number of quests completed by the player.
 * 
 * ---
 * 
 * totalQuestsFailed()
 * 
 * - Returns the total number of quests failed by the player.
 * 
 * ---
 * 
 * totalQuestsRevealed()
 * 
 * - Returns the total number of quests visible to the player.
 * 
 * ---
 * 
 * totalQuestsInGame()
 * 
 * - Returns the total number of quests available in-game.
 * 
 * ---
 * 
 * getQuestDescriptionIndex(questKey)
 * 
 * - Returns the select quest's current description index ID.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: getQuestDescriptionIndex('Welcome')
 * 
 * ---
 * 
 * totalVisibleQuestObjectives(questKey)
 * 
 * - Returns the total number of visible quest objectives for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalVisibleQuestObjectives('Welcome')
 * 
 * ---
 * 
 * totalQuestObjectives(questKey)
 * 
 * - Returns the total number of quest objectives for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalQuestObjectives('Welcome')
 * 
 * ---
 * 
 * totalVisibleQuestRewards(questKey)
 * 
 * - Returns the total number of visible quest rewards for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalVisibleQuestRewards('Welcome')
 * 
 * ---
 * 
 * totalQuestRewards(questKey)
 * 
 * - Returns the total number of quest rewards for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalQuestRewards('Welcome')
 * 
 * ---
 * 
 * getQuestSubtextIndex(questKey)
 * 
 * - Returns the select quest's current subtext index ID.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: getQuestSubtextIndex('Welcome')
 * 
 * ---
 * 
 * getQuestQuoteIndex(questKey)
 * 
 * - Returns the select quest's current subtext index ID.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: getQuestQuoteIndex('Welcome')
 * 
 * ---
 * 
 * === Conditional Branch Script Functions ===
 * 
 * These are newly added JavaScript functions that return a true/false value.
 * The functions are best used with the Conditional Branch script input field.
 * 
 * ---
 * 
 * isQuestObjectiveCompleted(questKey, objectiveID)
 * 
 * - Returns a true/false value depending on the selected quest's objective
 *   and if it is completed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest objective you want
 *   to check.
 * - Example: isQuestObjectiveCompleted('Welcome', 1)
 * 
 * ---
 * 
 * isQuestObjectiveFailed(questKey, objectiveID)
 * 
 * - Returns a true/false value depending on the selected quest's objective
 *   and if it is failed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest objective you want
 *   to check.
 * - Example: isQuestObjectiveFailed('Welcome', 1)
 * 
 * ---
 * 
 * isQuestObjectiveUncleared(questKey, objectiveID)
 * 
 * - Returns a true/false value depending on the selected quest's objective
 *   and if it is uncleared.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest objective you want
 *   to check.
 * - Example: isQuestObjectiveUncleared('Welcome', 1)
 * 
 * ---
 * 
 * isQuestRewardClaimed(questKey, rewardID)
 * 
 * - Returns a true/false value depending on the selected quest's reward
 *   and if it is claimed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest reward you want
 *   to check.
 * - Example: isQuestRewardClaimed('Welcome', 1)
 * 
 * ---
 * 
 * isQuestRewardDenied(questKey, rewardID)
 * 
 * - Returns a true/false value depending on the selected quest's reward
 *   and if it is denied.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest reward you want
 *   to check.
 * - Example: isQuestRewardDenied('Welcome', 1)
 * 
 * ---
 * 
 * isQuestRewardUnclaimed(questKey, rewardID)
 * 
 * - Returns a true/false value depending on the selected quest's reward
 *   and if it is unclaimed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest reward you want
 *   to check.
 * - Example: isQuestRewardUnclaimed('Welcome', 1)
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
 * === Action Tracking-Related Notetags ===
 * 
 * ---
 *
 * <Variable id On Use: +x>
 * <Variable id On Use: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Whenever any actor uses this specific skill or item, increase or decrease
 *   the target variable by a certain amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 * 
 * === Enemy Tracking-Related Notetags ===
 * 
 * ---
 *
 * <Variable id On Death: +x>
 * <Variable id On Death: -x>
 *
 * - Used for: Enemy Notetags
 * - Whenever this specific enemy dies, increase or decrease the target
 *   variable by a certain amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 * 
 * === Item Tracking-Related Notetags ===
 * 
 * ---
 *
 * <Variable id On Gain: +x>
 * <Variable id On Gain: -x>
 *
 * - Used Item, Weapon, Armor Notetags
 * - Whenever the party gains the specific item, weapon, or armor, increase or
 *   decrease the target variable by a certai amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 * 
 * ---
 *
 * <Variable id On Lose: +x>
 * <Variable id On Lose: -x>
 *
 * - Used Item, Weapon, Armor Notetags
 * - Whenever the party loses the specific item, weapon, or armor, increase or
 *   decrease the target variable by a certai amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 *
 * <Track With Variable id>
 *
 * - Used Item, Weapon, Armor Notetags
 * - Whenever there is a change made to the specific item, weapon, or armor,
 *   set the value of the target variable to the number of items owned.
 * - Replace 'id' with the Variable ID you wish to alter.
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
 * === Quest Plugin Commands ===
 * 
 * ---
 *
 * Quest: Add/Complete/Fail/Remove
 * - Adds quest(s) to be known/completed/failed.
 * - Or removes them.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Status:
 *   - Change the status to this.
 *     - Add to Known
 *     - Add to Completed
 *     - Add to Failed
 *     - Remove from All
 *
 * ---
 *
 * Quest: Description Change
 * - Changes the description of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Description ID:
 *   - Change the description of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Quest: Objectives Change
 * - Changes the objective(s) status of the quest(s).
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Objective ID(s):
 *   - Select the objective ID(s) to change.
 *   - You may use JavaScript code.
 *
 *   Status:
 *   - Change the status of the objective(s) to this.
 *     - Show Objective(s)
 *     - Complete Objective(s)
 *     - Fail Objective(s)
 *     - Remove Objective(s)
 *
 * ---
 *
 * Quest: Quote Change
 * - Changes the quote of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Subtext ID:
 *   - Change the quote of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Quest: Rewards Change
 * - Changes the reward(s) status of the quest(s).
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Reward ID(s):
 *   - Select the reward ID(s) to change.
 *   - You may use JavaScript code.
 *
 *   Status:
 *   - Change the status of the reward(s) to this.
 *     - Show Reward(s)
 *     - Claim Reward(s)
 *     - Deny Reward(s)
 *     - Remove Reward(s)
 *
 * ---
 *
 * Quest: Subtext Change
 * - Changes the subtext of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Subtext ID:
 *   - Change the subtext of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Tracker Plugin Commands ===
 * 
 * ---
 *
 * Tracker: Change Quest
 * - Changes the tracked quest.
 *
 *   Quest Key:
 *   - Insert the quest key here.
 *
 * ---
 *
 * Tracker: Refresh Window
 * - Refreshes the quest tracker window.
 *
 * ---
 *
 * Tracker: Show/Hide Window
 * - Can forcefully hide window.
 * - Showing will depend on the player's Options setting.
 *
 *   Show/Hide?:
 *   - Shows/hides the tracker window on the map.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Call Scene_Quest
 * - Opens Scene_Quest for the player.
 * - Does not work in battle.
 *
 * ---
 *
 * System: Enable Quests in Menu?
 * - Enables/disables quest menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables quest menu inside the main menu.
 *
 * ---
 *
 * System: Show Quests in Menu?
 * - Shows/hides quest menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides quest menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The general settings determine various aspects of the Quest System plugin
 * from the quests that appear at the start of the game to how it's displayed
 * inside menus.
 *
 * ---
 *
 * Starting Quests
 * 
 *   Known Quests:
 *   - Which quests are known at the start of the game?
 *   - Insert their keys here.
 * 
 *   Completed Quests:
 *   - Which quests are completed at the start of the game?
 *   - Insert their keys here.
 * 
 *   Failed Quests:
 *   - Which quests are failed at the start of the game?
 *   - Insert their keys here.
 * 
 *   Tracked Quest:
 *   - Which quest is tracked at the start of the game?
 *
 * ---
 *
 * Scene_Quest
 *
 * ---
 * 
 * Scene_Quest > Background Settings:
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * Scene_Quest > Vocab
 *
 * ---
 * 
 * Scene_Quest > Vocab > Command Window
 * 
 *   Command: Known:
 *   - Text used to display known quests.
 *
 *   Command: Completed:
 *   - Text used to display completed quests.
 * 
 *   Command: Failed:
 *   - Text used to display failed quests.
 *
 * ---
 *
 * Scene_Quest > Vocab > Label Window
 * 
 *   Empty Title:
 *   - Text displayed in the Label Window when no quest is selected.
 *
 * ---
 *
 * Scene_Quest > Vocab > List Window
 * 
 *   Open Categories:
 *   - Text format for an open category.
 *   - %1 - Category Name, %2 - Quest Amount
 * 
 *   Closed Categories:
 *   - Text format for a closed category.
 *   - %1 - Category Name, %2 - Quest Amount
 * 
 *   No Quest Listed:
 *   - Text when no quest is listed.
 * 
 *   Tracked Quest:
 *   - Text format for a tracked quest.
 *   - %1 - Tracked Quest's Name
 *
 * ---
 *
 * Scene_Quest > Vocab > Log Window
 * 
 *   Empty Message:
 *   - Text displayed when no quest is selected.
 *
 *     JS: On Load:
 *     - Runs code upon making the empty message.
 *     - Useful for setting up variables.
 * 
 *   Quest Log:
 *   - Text format for Quest Log Window.
 *   - Instructions:
 *     - Insert the [[Keyword]] marks in the text where you want certain parts
 *       of the quest to appear.
 *
 *       - [[Title]] - Inserts the title of the quest.
 *
 *       - [[Difficulty]] - Inserts the quest difficulty text.
 *
 *       - [[From]] - Inserts the quest origin text.
 *
 *       - [[Location]] - Inserts the quest location text.
 *
 *       - [[Description]] - Inserts the currently active quest description.
 *         - The quest description can change depending on which Description ID
 *           is currently active for that quest.
 *
 *       - [[Objectives]] - Inserts a list of the visible quest objectives.
 *         - The quest objectives visible to the player will be determined by
 *           the quest's Visible Objectives settings and any Plugin Commands
 *           used to alter which objectives are visible and what state they are
 *           currently in (known, completed, failed).
 *
 *       - [[Rewards]] - Inserts a list of visible quest rewards.
 *         - The quest rewards visible to the player will be determined by the
 *           quest's Visible Rewards settings and any Plugin Commands used to
 *           alter which rewards are visible and what state they are currently
 *           in (known, claimed, denied).
 *
 *       - [[Subtext]] - Inserts the currently active quest subtext.
 *         - The quest subtext can change depending on which Subtext ID is
 *           currently active for that quest.
 *
 *       - [[Quote]] - Inserts the currently active quest quote.
 *         - The quest quote can change depending on which Quote ID is
 *           currently active for that quest.
 * 
 *   Objective (Known):
 *   - Text format for known objectives.
 *   - %1 - Objective Text
 * 
 *   Objective (Done):
 *   - Text format for complete objectives.
 *   - %1 - Objective Text
 * 
 *   Objective (Failed):
 *   - Text format for failed objectives.
 *   - %1 - Objective Text
 * 
 *   Reward (Known):
 *   - Text format for normal rewards.
 *   - %1 - Reward Text
 * 
 *   Reward (Claimed):
 *   - Text format for claimed rewards.
 *   - %1 - Reward Text
 * 
 *   Reward (Denied):
 *   - Text format for denied rewards.
 *   - %1 - Reward Text
 *
 * ---
 *
 * Scene_Quest > Vocab > Button Assist Window
 * 
 *   Scroll Up/Down:
 *   - Text for Page Up/Down to scroll log window.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Tracker:
 *   - Text for tracking quests.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Expand:
 *   - Text for expanding categories.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Collapse:
 *   - Text for collapsing categories.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Scene_Quest > Icons
 * 
 *   Icon: Known:
 *   - Icon used for this command.
 * 
 *   Icon: Completed:
 *   - Icon used for this command.
 * 
 *   Icon: Failed:
 *   - Icon used for this command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Category Settings
 * ============================================================================
 *
 * Quest Categories separate the quest types in your game. These can be used to
 * help players differentiate which are story-driven quests, which are optional
 * quests, recurring quests, etc. These have limited settings, but serve as
 * containers for quests that fall under its category.
 *
 * ---
 *
 * Category
 * 
 *   Category Name:
 *   - This category's name.
 *   - You may use text codes.
 * 
 *   Quests:
 *   - A list of quests listed under this category.
 *   - Quests will be listed in the same order as this parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Settings
 * ============================================================================
 *
 * Each Quest Category will contain a list of quests that can appear in-game.
 * These individual quests make up the meat and bones of the Quest System and
 * will serve to relay information to the player on what he/she needs to do in
 * order to make progress in your game.
 *
 * ---
 *
 * Quest
 * 
 *   Quest ID Key:
 *   - This quest's identification key. Quests require unique keys for the
 *     plugin to differentiate them.
 *   - It is VERY important that you keep this key unique from other quests in
 *     order for the Quest System to operate properly in your game.
 *
 * ---
 *
 * Header
 * 
 *   Title:
 *   - The title of the quest. This is what appears in-game.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Title]] marker.
 * 
 *   Difficulty:
 *   - Difficulty level for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Difficulty]] marker.
 * 
 *   From:
 *   - Insert the name of the one who issued this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[From]] marker.
 * 
 *   Location:
 *   - Insert location name where this quest was issued.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Location]] marker.
 * 
 *   Description:
 *   - Type out the description(s) used for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Description]] marker.
 *   - The displayed description will depend on the Description ID set through
 *     Plugin Command.
 *   - If no Description ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 *
 * ---
 *
 * Lists
 * 
 *   Objectives List:
 *   - The objectives to be completed for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Objectives]] marker.
 *   - Depending on which ID's are set to visible, a list will created at the
 *     marker displaying each of the objectives.
 *    - This can be done thorugh the Visible Objectives parameter or through
 *      Plugin Commands.
 * 
 *   Visible Objectives:
 *   - The objectives that are visible from the start.
 * 
 *   Rewards List:
 *   - The reward list for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Rewards]] marker.
 *   - Depending on which ID's are set to visible, a list will created at the
 *     marker displaying each of the rewards.
 *    - This can be done thorugh the Visible Rewards parameter or through
 *      Plugin Commands.
 * 
 *   Visible Rewards:
 *   - The rewards that are visible from the start.
 *
 * ---
 *
 * Footer
 * 
 *   Subtext:
 *   - Subtext to be displayed with the quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Subtext]] marker.
 *   - The displayed description will depend on the Subtext ID set through
 *     Plugin Command.
 *   - If no Subtext ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 * 
 *   Quotes:
 *   - Quotes to be displayed with the quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Quote]] marker.
 *   - The displayed description will depend on the Quote ID set through
 *     Plugin Command.
 *   - If no Quote ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Load:
 *   - Runs code upon loading the quest in Scene_Quest.
 *   - Useful for setting up variables.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Tracker Settings
 * ============================================================================
 *
 * The Quest Tracker Window is a window that appears on the map scene to
 * display the objectives (and other desired information) of the currently
 * tracked quest decided by the player.
 *
 * ---
 *
 * General
 *
 *   Tracker Format:
 *   - Text format for Quest Tracker Window.
 *   - Read help file for instructions.
 * 
 * ---
 * 
 * Fading
 * 
 *   Close Minimum Opacity:
 *   - Minimum opacity when the player is too close to the quest tracker on
 *     the map screen.
 * 
 *   Tracker Fade Speed: 
 *   - Fade speed of the tracker when toggled on/off.
 *   - Lower is slower. Higher is faster.
 *
 * ---
 *
 * Options
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Add Show Tracker?:
 *   - Add the 'Show Tracker' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *   Add Position Tracker?:
 *   - Add the 'Position Tracker' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *     Option OFF:
 *     - Text displayed when the option is OFF.
 * 
 *     Option ON:
 *     - Text displayed when the option is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Set up the main menu defaults.
 *
 * ---
 *
 * Main Menu Settings
 * 
 *   Command Name:
 *   - Name of the 'Quest' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Quest' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Quest' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Quest.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * These settings let you control the various windows that appear in the
 * Scene_Quest menu and the Quest Tracker Window that appears in Scene_Map.
 *
 * ---
 *
 * Command Window
 * 
 *   Show Failed Quests?:
 *   - Show/hide Failed Quests in the command window.
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Quest Label
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Log Window
 * 
 *   PageUp/Down Speed:
 *   - Scroll speed for PageUp/Down.
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 *   EXPERIMENTAL:
 * 
 *     Automatic Word Wrap?:
 *     - Enables/disables automatic word wrap.
 *     - Requires VisuMZ_1_MessageCore!
 *     - This feature is experimental. Word Wrap does not worth perfectly
 *       with the Log Window, although it performs well enough. This feature
 *       will be updated and completed at a later point in the future. Use it
 *       at your own discretion.
 *
 * ---
 *
 * List Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Tracker Window
 * 
 *   Window Scale:
 *   - How much do you want to scale the Tracker Window's size by?
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * JavaScript Functions
 * ============================================================================
 *
 * These are some new JavaScript functions that you can use for the
 * 'JS: On Load' Plugin Parameter found in the Quest settings.
 *
 * Using these require you to have an adequate understanding of how JavaScript
 * works in order to successfully use it.
 *
 * ---
 *
 * $gameSystem.setQuestStatus(key, status)
 * - Changes the quest's completion status.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'completed'
 *   - 'failed'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestStatus('exampleName', 'completed')
 *
 * ---
 *
 * $gameSystem.setQuestDescription(key, id)
 * - Changes the quest's description.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with description ID to use.
 *
 * Example: $gameSystem.setQuestDescription('exampleName', 2)
 *
 * ---
 *
 * $gameSystem.setQuestObjectives(key, ids, status)
 * - Changes the quest's objectives.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'ids' with an array of ID's to use.
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'completed'
 *   - 'failed'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestDescription('exampleName', [1, 2, 3], 'failed')
 *
 * ---
 *
 * $gameSystem.setQuestRewards(key, ids, status)
 * - Changes the quest's rewards.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'ids' with an array of ID's to use.
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'claimed'
 *   - 'denied'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestRewards('exampleName', [1, 3, 5], 'claimed')
 *
 * ---
 *
 * $gameSystem.setQuestSubtext(key, id)
 * - Changes the quest's subtext.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with subtext ID to use.
 *
 * Example: $gameSystem.questSubtext('exampleName', 3)
 *
 * ---
 *
 * $gameSystem.setQuestQuote(key, id)
 * - Changes the quest's quote.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with quote ID to use.
 *
 * Example: $gameSystem.setQuestQuote('exampleName', 4)
 *
 * ---
 *
 * DISCLAIMER:
 *
 * Keep in mind that VisuStella is NOT responsible for your proficiency (or
 * otherwise) of JavaScript.
 *
 * If you get any errors with the custom code, it is up to YOU to fix it.
 * 
 * If you do not understand how any of this section works, do not be afraid.
 * It's not the end of the world.
 * 
 * You can still change the status of the quests and its objectives through the
 * usage of Plugin Commands.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.16: November 24, 2022
 * * Feature Update!
 * ** Updated Plugin Command "Tracker: Show/Hide Window" cases from "Enable"
 *    and "Disable" to "Show" and "Hide". Update made by Arisu.
 * 
 * Version 1.15: October 6, 2022
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.14: August 18, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Quest Tracker Settings > Fading > Close Minimum Opacity
 * *** Quest Tracker Settings > Fading > Tracker Fade Speed
 * **** These settings allow you to make the quest tracker become opaque the
 *      moment the player comes near the quest tracker on the screen.
 * 
 * Version 1.13: March 10, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.12: July 9, 2021
 * * Feature Update!
 * ** Improved calculations for determining window size. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Feature!
 * ** Added new [[Marker]] to Quest Log format and Quest Tracker formats.
 * *** [[RawTitle]] - Inserts the title of the quest without any text codes
 *     removed. Keep in mind that icons do NOT resize based on the text size.
 * 
 * Version 1.10: December 11, 2020
 * * Bugs Fixed!
 * ** Quest tracking should now automatically remove itself once a quest is
 *    dubbed complete, failed, or removed. Fix made by Yanfly.
 * 
 * Version 1.09: November 29, 2020
 * * Bug Fixed!
 * ** The Button Assist Window will now properly display the text for expanding
 *    and collapsing quest categories. Fix made by Arisu.
 * 
 * Version 1.08: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 1, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Updates!
 * ** When multiple parallel events are occuring, they will no longer cause lag
 *    by inducing multiple refreshes at a time. Update by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Quest Tracker Settings > Tracker Format
 * **** Text format for Quest Tracker Window. This lets you customize the text
 *      that appears in the Quest Tracker instead of just having the title and
 *      the objectives.
 * 
 * Version 1.06: October 25, 2020
 * * Feature Update!
 * ** If Message Core is not detected, <ColorLock> and </ColorLock> notetags
 *    will be automatically removed. Added by Arisu.
 * 
 * Version 1.05: October 11, 2020
 * * Documentation Update!
 * ** "Control Variable and Conditional Branch Usage" section added for those
 *    who wish to gather data for the script input fields of the mentioned
 *    event commands.
 * 
 * Version 1.04: October 4, 2020
 * * Bug Fixes!
 * ** Quest Tracker window refreshes should no longer cause infinite loops when
 *    used with specific script calls. Fix made by Yanfly.
 * 
 * Version 1.03: September 20, 2020
 * * Documentation Update!
 * ** For all the new features!
 * * New Features!
 * ** New notetags added by Olivia!
 * ** <Variable id On Death: +x> and <Variable id On Death: -x> for enemies.
 * ** <Variable id On Gain: +x> and <Variable id On Gain: -x> for items,
 *    weapons, and armors.
 * ** <Variable id On Lose: +x> and <Variable id On Lose: -x> for items,
 *    weapons, and armors.
 * ** <Track With Variable id> for items, weapons, and armors.
 * ** <Variable id On Use: +x> and <Variable id On Use: -x> for items & skills.
 * 
 * Version 1.02: September 13, 2020
 * * Bugs Fixed!:
 * ** Quest Tracker Window should no longer flicker.
 * 
 * Version 1.01: September 6, 2020
 * * Bug Fixed!
 * ** Disabled track windows no longer appear on the screen for one frame after
 *    leaving a menu of any sort. Fix made by Yanfly.
 * ** Viewing the failed quests no longer crash the game. Fix made by Yanfly.
 * * Feature Update!
 * ** The following Plugin Commands will now automatically update the tracker
 *    if needed. Feature update by Yanfly.
 * *** Quest: Add/Complete/Fail/Remove
 * *** Quest: Description Change
 * *** Quest: Objectives Change
 * *** Quest: Quote Change
 * *** Quest: Rewards Change
 * *** Quest: Subtext Change
 *
 * Version 1.00: August 31, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestSet
 * @text Quest: Add/Complete/Fail/Remove
 * @desc Adds quest(s) to be known/completed/failed.
 * Or removes them.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Add to Known
 * @value known
 * @option Add to Completed
 * @value completed
 * @option Add to Failed
 * @value failed
 * @option Remove from All
 * @value remove
 * @desc Change the status to this.
 * @default known
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestDescription
 * @text Quest: Description Change
 * @desc Changes the description of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Description ID
 * @desc Change the description of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestObjectives
 * @text Quest: Objectives Change
 * @desc Changes the objective(s) status of the quest(s).
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetIDs:arrayeval
 * @text Objective ID(s)
 * @type string[]
 * @desc Select the objective ID(s) to change.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Show Objective(s)
 * @value show
 * @option Complete Objective(s)
 * @value complete
 * @option Fail Objective(s)
 * @value fail
 * @option Remove Objective(s)
 * @value remove
 * @desc Change the status of the objective(s) to this.
 * @default show
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestQuote
 * @text Quest: Quote Change
 * @desc Changes the quote of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Quote ID
 * @desc Change the quote of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestRewards
 * @text Quest: Rewards Change
 * @desc Changes the reward(s) status of the quest(s).
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetIDs:arrayeval
 * @text Reward ID(s)
 * @type string[]
 * @desc Select the reward ID(s) to change.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Show Reward(s)
 * @value show
 * @option Claim Reward(s)
 * @value claim
 * @option Deny Reward(s)
 * @value deny
 * @option Remove Reward(s)
 * @value remove
 * @desc Change the status of the reward(s) to this.
 * @default show
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestSubtext
 * @text Quest: Subtext Change
 * @desc Changes the subtext of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Subtext ID
 * @desc Change the subtext of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerChangeQuest
 * @text Tracker: Change Quest
 * @desc Changes the tracked quest.
 *
 * @arg Key:str
 * @text Quest Key
 * @desc Insert the quest key here.
 * @default Example
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerRefreshWindow
 * @text Tracker: Refresh Window
 * @desc Refreshes the quest tracker window.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerShowHide
 * @text Tracker: Show/Hide Window
 * @desc Can forcefully hide window.
 * Showing will depend on the player's Options setting.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides the tracker window on the map.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemCallSceneQuest
 * @text System: Call Scene_Quest
 * @desc Opens Scene_Quest for the player.
 * Does not work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableQuestMenu
 * @text System: Enable Quests in Menu?
 * @desc Enables/disables quest menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables quest menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowQuestMenu
 * @text System: Show Quests in Menu?
 * @desc Shows/hides quest menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides quest menu inside the main menu.
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
 * @param QuestSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings for the Quest System.
 * @default {"StartingQuests":"","KnownQuests:arraystr":"[\"Welcome\",\"Example\",\"Plugin_Tutorial_Title\",\"Plugin_Tutorial_Difficulty\",\"Plugin_Tutorial_From\",\"Plugin_Tutorial_Description\",\"Plugin_Tutorial_Objectives\",\"Plugin_Tutorial_Rewards\",\"Plugin_Tutorial_Subtext\",\"Plugin_Tutorial_Quote\",\"Challenge_Plugin_Variables\",\"Challenge_Plugin_Switches\"]","CompletedQuests:arraystr":"[]","FailedQuests:arraystr":"[]","TrackedQuest:str":"Welcome","SceneQuest":"","Vocab":"","VocabCommandWindow":"","CommandWindow_Known_Text:str":"Available","CommandWindow_Completed_Text:str":"Completed","CommandWindow_Failed_Text:str":"Failed","VocabLabelWindow":"","EmptyTitleLabel:str":"\\i[186]Quest Journal","VocabListWindow":"","ListWindowCategoryOpenFmt:str":"- %1(%2)","ListWindowCategoryCloseFmt:str":"+ %1(%2)","NoQuestListed:str":"(No Quests Listed)","ListWindowTrackedQuest:str":"\\c[17]%1\\c[0]","VocabLogWindow":"","LogEmpty:json":"\"\\\\c[5]Main Quests\\\\c[0] are quests that must be\\ncompleted in order to progress further\\ninto the game's story.\\n\\n\\\\c[6]Side Quests\\\\c[0] are optional quests that can\\nbe completed at your discretion. Upon\\ncompleting a side quest, you can receive\\nuseful rewards that may assist you on\\nyour journey.\"","OnLoadQuestJS:func":"\"// Insert JavaScript code here.\"","LogFmt:json":"\"\\\\{[[Title]]\\\\}\\n\\\\c[4]Level:\\\\c[0] [[Difficulty]]\\n\\\\c[4]From:\\\\c[0] [[From]]\\n\\\\c[4]Location:\\\\c[0] [[Location]]\\n\\n\\\\c[4]Description:\\\\c[0]\\n[[Description]]\\n\\n\\\\c[4]Objectives:\\\\c[0]\\n[[Objectives]]\\n\\n\\\\c[4]Rewards:\\\\c[0]\\n[[Rewards]]\\n\\n[[Subtext]]\\n\\n[[Quote]]\"","Objective_Normal_Fmt:str":"◎%1","Objective_Completed_Fmt:str":"\\c[24]<ColorLock>✔%1</ColorLock>\\c[0]","Objective_Failed_Fmt:str":"\\c[25]<ColorLock>✘%1</ColorLock>\\c[0]","Reward_Normal_Fmt:str":"◎%1","Reward_Completed_Fmt:str":"\\c[24]<ColorLock>✔%1</ColorLock>\\c[0]","Reward_Failed_Fmt:str":"\\c[25]<ColorLock>✘%1</ColorLock>\\c[0]","ButtonAssistWindow":"","ButtonAssistPageUpDown:str":"Scroll Up/Down","questButtonAssistActive:str":"Track","ButtonAssistExpand:str":"Expand","ButtonAssistCollapse:str":"Collapse","CommandWindowIcons":"","CommandWindow_Known_Icon:num":"193","CommandWindow_Completed_Icon:num":"192","CommandWindow_Failed_Icon:num":"194"}
 *
 * @param Categories:arraystruct
 * @text Quest Categories
 * @type struct<Category>[]
 * @desc A list of categories and their quests.
 * @default ["{\"CategoryName:str\":\"\\\\C[5]Main Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Welcome\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Welcome Quest\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Thank you for using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplugin made by \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella MZ\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThis is an example quest to demonstrate\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhow the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] works. It functions\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nprimarily as a log book for the various\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nadventures inside your game.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Take a look at the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] menu.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]tracked quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to something else.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[186]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] for your game!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[84]Helping support \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Example\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Example Quest\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is where the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngoes. Type in whatever text you need\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhere in order to explain to the player\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nabout the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Describe each of the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhere for the player.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can have multiple quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nout at once.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If you do, make sure you have the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Visible Objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] list the ID's of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe objectives you want visible from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe very beginning.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Here, you can list all the rewards the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngame will give the player upon the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncompletion of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can list the rewards however you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nlike, but do keep it concise.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can list multiple rewards, too.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If you do, make sure you have the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Visible Rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] list the ID's of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrewards you want visible from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nvery beginning.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is a \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]. It is used as extra\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ntext that you may want to place on your\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest journal that differs from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"We learn by example and by direct\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nexperience because there are real limits\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto the adequacy of verbal instruction.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Malcolm Gladwell\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"CategoryName:str\":\"\\\\c[6]Side Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Title\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Titles\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"The quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is listed in three\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndifferent places in the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Scene\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n1. The top of the screen.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n2. The top of the quest log entry.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n3. The quest list on the side.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nBe sure to put some thought in deciding\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyour titles as they are there to convey\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nwhat the quest is all about.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the title through the quest's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can use icons in the quest title by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[x]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] text code. Keep in mind\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthat the icon will be removed from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest log entry.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A good title is the title of a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsuccessful book.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Raymond Chandler\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Difficulty\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Difficulty\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can be used to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nconvey what kinds of expectations they\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nshould have regarding challenge.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThese can range from star ratings like:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[87]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[87]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nLevel ranges like:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Level 20+\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the difficulty through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A quest's difficulty is often used to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrelay the expected level of conflict a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplayer may face.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A pessimist sees the difficulty in\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nevery opportunity; an optimist sees the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nopportunity in every difficulty.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Winston Churchill\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_From\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]From\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Explaining which \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]NPC\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] the quest is from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncan help remind the player its origin\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nand also help save the player some time\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nin trying to find that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]NPC\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] again when\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngoing to claim the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" text through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]From\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]From\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Use the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] as a means to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstreamline your player's experience.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"More important than the quest for\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncertainty is the quest for clarity.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Francois Gautier\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Description\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Descriptions\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Insert the quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThe displayed \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] will\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndepend on the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Description ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] that is\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncurrently active for the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is the updated quest description. This\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncan only be seen when it is Description ID #2.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Description ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Description Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Description Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Descriptions are valuable tools that can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbe used to help remind the player the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\npurpose of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Description begins in the writer's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nimagination but should finish in the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nreader's.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Stephen King\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Objectives\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Objectives\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium-Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] are used to streamline\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe goals the player needs to achieve in\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\norder to make progress.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the status of each\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Known\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Completed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nor \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]Failed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can also \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]remove\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] objectives from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbeing viewed.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can determine the default \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nobjectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Visible\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nObjectives \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can reveal new \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough the use of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Objectives Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]The following are examples:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Known Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Completed Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Failed Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Objectives Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Treat \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] like a set of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ninstructions or outline for the player\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto follow in order to get the desired\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresult both of you want.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"People with objectives succeed because\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthey know where they're going.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Earl Nightingale\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Plugin_Tutorial_Objectives';\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [5], 'show');\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [6], 'complete');\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [7], 'fail');\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Rewards\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Rewards\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium-Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] are the goodies that are\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\npromised to be given to the player upon\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe completion of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the status of each\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Known\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Claimed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nor \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]Denied\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can also \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]remove\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] rewardsfrom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbeing viewed.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can determine the default \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Visible\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nRewards \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Rewards Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can reveal new \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough the use of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Rewards Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]The following are examples:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Known Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Claimed Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Denied Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Rewards are incentives for the player to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncomplete them, especially quests of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhigher difficulty levels.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Reward the behavior you want repeated.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Larry Winget\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Plugin_Tutorial_Rewards';\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [4], 'show');\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [5], 'claim');\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [6], 'deny');\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Subtext\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Subtexts\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"The \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] section can be used in a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnumber of ways, from hints to summaries,\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto warnings.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nAnd like the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], you can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nchange the text displayed in the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough changing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Subtext ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Subtext ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Subtexts\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can serve as hints, summaries,\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nwarnings, reminders, you name it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"After all, reminding a player to do\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsomething only means you want them to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsucceed at it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A discerning eye needs only a hint, and\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nunderstatement leaves the imagination\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nfree to build its own elaborations.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Russell Page\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Quote\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Quotes\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quotes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can be used to reference specific\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nlines of dialogue that could help the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplayer understand what's needed to be\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndone.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nOr they could just be \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quotes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] made by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\njust about anyone.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nAnd like quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]descriptions and quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtexts\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], the quest quotes can also be\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nchanged to display something else based\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\non the quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quote ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Quote ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Quote Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"How you want to use them is up to you.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You miss 100% of the shots you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndon't take.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Micahel Scott\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If at first you don't succeed, then\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nskydiving definitely isn't for you.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Steven Wright\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"CategoryName:str\":\"\\\\c[2]Challenge Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Challenge_Plugin_Variables\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[5]Variables\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game variables are set\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nup to automatically equal the number of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nof the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]first item\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] in the inventory.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThe \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] will automatically set\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nitself to completed if the variable's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nvalue is determined to be over 10.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Obtain \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\v[1]/10x First Database Item!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Knowledge for \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[2]DISCLAIMER:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nKeep in mind that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is NOT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresponsible for your proficiency (or\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\notherwise) of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you get any errors with the custom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncode, it is up to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to fix it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you do not understand how any of this\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsection works, do not be afraid. It's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnot the end of the world.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nYou can still change the status of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quests\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] and its \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusage of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Commands\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst value = $gameParty.numItems($dataItems[1])\\\\\\\\\\\\\\\\nconst status = value >= 10 ? 'completed' : 'known';\\\\\\\\\\\\\\\\nconst key = 'Challenge_Plugin_Variables';\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\n$gameVariables.setValue(1, value);\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [1], status)\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Challenge_Plugin_Switches\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[5]Switches\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game switch 1's ON/OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstatus will determine which description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthis quest will use.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nGame Switch 1 is now \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nDescription ID \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is being used.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game switch 1's ON/OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstatus will determine which description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthis quest will use.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nGame Switch 1 is now \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]ON\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nDescription ID \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is being used.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change Switch 1's ON/OFF status.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"View this quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Knowledge for \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[2]DISCLAIMER:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nKeep in mind that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is NOT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresponsible for your proficiency (or\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\notherwise) of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you get any errors with the custom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncode, it is up to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to fix it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you do not understand how any of this\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsection works, do not be afraid. It's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnot the end of the world.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nYou can still change the status of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quests\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] and its \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusage of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Commands\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Challenge_Plugin_Switches';\\\\\\\\\\\\\\\\nconst id = $gameSwitches.value(1) ? 2 : 1;\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\n$gameSystem.setQuestDescription(key, id)\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}"]
 *
 * @param Tracker:struct
 * @text Quest Tracker Settings
 * @type struct<Tracker>
 * @desc Setup how all the quest tracker works.
 * @default {"General":"","TrackerFmt:json":"\"\\\\{[[Title]]\\\\}\\n[[Objectives]]\"","Options":"","AdjustRect:eval":"true","AddShowOption:eval":"true","ShowName:str":"Show Quest Tracker","AddPositionOption:eval":"true","PositionName:str":"Quest Tracker Position","PositionOff:str":"←","PositionOn:str":"→"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Set up the main menu defaults.
 * @default {"Name:str":"Quest","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Quest.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Setup how all the windows appear in-game.
 * @default {"CommandWindow":"","ShowFailed:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CommandWindow_BgType:num":"0","CommandWindow_Rect:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(Window_QuestCommand.prototype.totalCommands(), true);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","QuestLabel":"","QuestLabel_BgType:num":"0","QuestLabel_Rect:func":"\"const ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, false);\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","LogWindow":"","LogWindow_Auto_WordWrap:eval":"false","LogWindow_ScrollSpeed:num":"0.20","LogWindow_BgType:num":"0","LogWindow_Rect:func":"\"const ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.mainAreaHeight() - this.questLabelWindowRect().height;\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop() + this.questLabelWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","ListWindow":"","ListWindow_BgType:num":"0","ListWindow_Rect:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.mainAreaHeight() - this.commandWindowRect().height;\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nconst wy = this.mainAreaTop() + this.commandWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","TrackerWindow":"","TrackerWindow_Scale:num":"0.50","TrackerWindow_BgType:num":"0","TrackerWindow_Rect:func":"\"const ww = 560;\\nconst wh = Graphics.height / Window_QuestTracker.scale;\\nconst wx = this.questTrackerOnRight() ? Graphics.width - Math.ceil(ww * Window_QuestTracker.scale) : 0;\\nconst wy = this.buttonAreaHeight() + 8;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param StartingQuests
 * @text Starting Quests
 *
 * @param KnownQuests:arraystr
 * @text Known Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are known at the start of the game?
 * Insert their keys here.
 * @default ["Welcome","Example","Plugin_Tutorial_Title","Plugin_Tutorial_Difficulty","Plugin_Tutorial_From","Plugin_Tutorial_Description","Plugin_Tutorial_Objectives","Plugin_Tutorial_Rewards","Plugin_Tutorial_Subtext","Plugin_Tutorial_Quote","Challenge_Plugin_Variables","Challenge_Plugin_Switches"]
 *
 * @param CompletedQuests:arraystr
 * @text Completed Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are completed at the start of the game?
 * Insert their keys here.
 * @default []
 *
 * @param FailedQuests:arraystr
 * @text Failed Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are failed at the start of the game?
 * Insert their keys here.
 * @default []
 *
 * @param TrackedQuest:str
 * @text Tracked Quest
 * @parent StartingQuests
 * @desc Which quest is tracked at the start of the game?
 * @default Welcome
 *
 * @param SceneQuest
 * @text Scene_Quest
 *
 * @param Vocab
 * @parent SceneQuest
 *
 * @param VocabCommandWindow
 * @text Command Window
 * @parent Vocab
 *
 * @param CommandWindow_Known_Text:str
 * @text Command: Known
 * @parent VocabCommandWindow
 * @desc Text used to display known quests.
 * @default Available
 *
 * @param CommandWindow_Completed_Text:str
 * @text Command: Completed
 * @parent VocabCommandWindow
 * @desc Text used to display completed quests.
 * @default Completed
 *
 * @param CommandWindow_Failed_Text:str
 * @text Command: Failed
 * @parent VocabCommandWindow
 * @desc Text used to display failed quests.
 * @default Failed
 *
 * @param VocabLabelWindow
 * @text Label Window
 * @parent Vocab
 *
 * @param EmptyTitleLabel:str
 * @text Empty Title
 * @parent VocabLabelWindow
 * @desc Text displayed in the Label Window when no quest is selected.
 * @default \i[186]Quest Journal
 *
 * @param VocabListWindow
 * @text List Window
 * @parent Vocab
 *
 * @param ListWindowCategoryOpenFmt:str
 * @text Open Categories
 * @parent VocabListWindow
 * @desc Text format for an open category.
 * %1 - Category Name, %2 - Quest Amount
 * @default - %1(%2)
 *
 * @param ListWindowCategoryCloseFmt:str
 * @text Closed Categories
 * @parent VocabListWindow
 * @desc Text format for a closed category.
 * %1 - Category Name, %2 - Quest Amount
 * @default + %1(%2)
 *
 * @param NoQuestListed:str
 * @text No Quest Listed
 * @parent VocabListWindow
 * @desc Text when no quest is listed.
 * @default (No Quests Listed)
 *
 * @param ListWindowTrackedQuest:str
 * @text Tracked Quest
 * @parent VocabListWindow
 * @desc Text format for a tracked quest.
 * %1 - Tracked Quest's Name
 * @default \c[17]%1\c[0]
 *
 * @param VocabLogWindow
 * @text Log Window
 * @parent Vocab
 *
 * @param LogEmpty:json
 * @text Empty Message
 * @parent VocabLogWindow
 * @type note
 * @desc Text displayed when no quest is selected.
 * @default "\\c[5]Main Quests\\c[0] are quests that must be\ncompleted in order to progress further\ninto the game's story.\n\n\\c[6]Side Quests\\c[0] are optional quests that can\nbe completed at your discretion. Upon\ncompleting a side quest, you can receive\nuseful rewards that may assist you on\nyour journey."
 *
 * @param OnLoadQuestJS:func
 * @text JS: On Load
 * @parent LogEmpty:json
 * @type note
 * @desc Runs code upon making the empty message.
 * Useful for setting up variables.
 * @default "// Insert JavaScript code here."
 *
 * @param LogFmt:json
 * @text Quest Log
 * @parent VocabLogWindow
 * @type note
 * @desc Text format for Quest Log Window.
 * Read help file for instructions.
 * @default "\\{[[Title]]\\}\n\\c[4]Level:\\c[0] [[Difficulty]]\n\\c[4]From:\\c[0] [[From]]\n\\c[4]Location:\\c[0] [[Location]]\n\n\\c[4]Description:\\c[0]\n[[Description]]\n\n\\c[4]Objectives:\\c[0]\n[[Objectives]]\n\n\\c[4]Rewards:\\c[0]\n[[Rewards]]\n\n[[Subtext]]\n\n[[Quote]]"
 *
 * @param Objective_Normal_Fmt:str
 * @text Objective (Known)
 * @parent LogFmt:json
 * @desc Text format for known objectives.
 * %1 - Objective Text
 * @default ◎%1
 *
 * @param Objective_Completed_Fmt:str
 * @text Objective (Done)
 * @parent LogFmt:json
 * @desc Text format for complete objectives.
 * %1 - Objective Text
 * @default \c[24]<ColorLock>✔%1</ColorLock>\c[0]
 *
 * @param Objective_Failed_Fmt:str
 * @text Objective (Failed)
 * @parent LogFmt:json
 * @desc Text format for failed objectives.
 * %1 - Objective Text
 * @default \c[25]<ColorLock>✘%1</ColorLock>\c[0]
 *
 * @param Reward_Normal_Fmt:str
 * @text Reward (Known)
 * @parent LogFmt:json
 * @desc Text format for normal rewards.
 * %1 - Reward Text
 * @default ◎%1
 *
 * @param Reward_Completed_Fmt:str
 * @text Reward (Claimed)
 * @parent LogFmt:json
 * @desc Text format for claimed rewards.
 * %1 - Reward Text
 * @default \c[24]<ColorLock>✔%1</ColorLock>\c[0]
 *
 * @param Reward_Failed_Fmt:str
 * @text Reward (Denied)
 * @parent LogFmt:json
 * @desc Text format for denied rewards.
 * %1 - Reward Text
 * @default \c[25]<ColorLock>✘%1</ColorLock>\c[0]
 *
 * @param ButtonAssistWindow
 * @text Button Assist Window
 * @parent Vocab
 *
 * @param ButtonAssistPageUpDown:str
 * @text Scroll Up/Down
 * @parent ButtonAssistWindow
 * @desc Text for Page Up/Down to scroll log window.
 * Requires VisuMZ_0_CoreEngine!
 * @default Scroll Up/Down
 *
 * @param questButtonAssistActive:str
 * @text Tracker
 * @parent ButtonAssistWindow
 * @desc Text for tracking quests.
 * Requires VisuMZ_0_CoreEngine!
 * @default Track
 *
 * @param ButtonAssistExpand:str
 * @text Expand
 * @parent ButtonAssistWindow
 * @desc Text for expanding categories.
 * Requires VisuMZ_0_CoreEngine!
 * @default Expand
 *
 * @param ButtonAssistCollapse:str
 * @text Collapse
 * @parent ButtonAssistWindow
 * @desc Text for collapsing categories.
 * Requires VisuMZ_0_CoreEngine!
 * @default Collapse
 *
 * @param CommandWindowIcons
 * @text Icons
 * @parent SceneQuest
 *
 * @param CommandWindow_Known_Icon:num
 * @text Icon: Known
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 193
 *
 * @param CommandWindow_Completed_Icon:num
 * @text Icon: Completed
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 192
 *
 * @param CommandWindow_Failed_Icon:num
 * @text Icon: Failed
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 194
 *
 */
/* ----------------------------------------------------------------------------
 * Quest Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param CategoryName:str
 * @text Category Name
 * @desc This category's name.
 * You may use text codes.
 * @default Untitled
 *
 * @param Quests:arraystruct
 * @text Quests
 * @type struct<Quest>[]
 * @desc A list of quests listed under this category.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Individual Quest Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Quest:
 *
 * @param Key:str
 * @text Quest ID Key
 * @desc This quest's identification key. Quests require
 * unique keys for the plugin to differentiate them.
 * @default (Needs Key)
 *
 * @param Header
 *
 * @param Title:str
 * @text Title
 * @parent Header
 * @desc The title of the quest. This is what appears in-game.
 * You may use text codes.
 * @default \i[87]Untitled Quest
 *
 * @param Difficulty:str
 * @text Difficulty
 * @parent Header
 * @desc Difficulty level for this quest.
 * You may use text codes.
 * @default Easy Peasy
 *
 * @param From:str
 * @text From
 * @parent Header
 * @desc Insert the name of the one who issued this quest.
 * You may use text codes.
 * @default NPC Name
 *
 * @param Location:str
 * @text Location
 * @parent Header
 * @desc Insert location name where this quest was issued.
 * You may use text codes.
 * @default Location Name
 *
 * @param Description:arrayjson
 * @text Description
 * @parent Header
 * @type note[]
 * @desc Type out the description(s) used for this quest.
 * You may use text codes.
 * @default ["\"This is the \\\\c[4]default\\\\c[0] quest description.\"","\"This is the \\\\c[4]default\\\\c[0] quest description.\\n\\nYou can insert multiple description entries in case you\\never want to update the quest description midway while the\\nquest is in progress.\""]
 *
 * @param Lists
 *
 * @param Objectives:arrayjson
 * @text Objectives List
 * @parent Lists
 * @type note[]
 * @desc The objectives to be completed for this quest.
 * You may use text codes.
 * @default ["\"\\\\c[4]First\\\\c[0] objective to be cleared.\"","\"\\\\c[4]Second\\\\c[0] objective, but it's hidden.\"","\"To make other objectives appear,\\nenable them through the \\\\c[4]'Visible\\nObjectives'\\\\c[0] plugin parameter or by\\nusing a plugin command to make\\nthem appear\""]
 *
 * @param VisibleObjectives:arraynum
 * @text Visible Objectives
 * @parent Objectives:arrayjson
 * @type number[]
 * @min 1
 * @desc The objectives that are visible from the start.
 * @default ["1"]
 *
 * @param Rewards:arrayjson
 * @text Rewards List
 * @parent Lists
 * @type note[]
 * @desc The reward list for this quest.
 * You may use text codes.
 * @default ["\"\\\\i[176]Potion x5\"","\"\\\\i[178]Ether x3\"","\"To make other rewards appear,\\nenable them through the \\\\c[4]'Visible\\nRewards'\\\\c[0] plugin parameter or by\\nusing a plugin command to make\\nthem appear\""]
 *
 * @param VisibleRewards:arraynum
 * @text Visible Rewards
 * @parent Rewards:arrayjson
 * @type number[]
 * @min 1
 * @desc The rewards that are visible from the start.
 * @default ["1"]
 *
 * @param Footer
 *
 * @param Subtext:arrayjson
 * @text Subtext
 * @parent Footer
 * @type note[]
 * @desc Subtext to be displayed with the quest.
 * You may use text codes.
 * @default ["\"\"","\"This is a \\\\c[4]subtext\\\\c[0]. It is used as extra\\ntext that you may want to place on your\\nquest journal that differs from the\\n\\\\c[4]description\\\\c[0].\""]
 *
 * @param Quotes:arrayjson
 * @text Quotes
 * @parent Footer
 * @type note[]
 * @desc Quotes to be displayed with the quest.
 * You may use text codes.
 * @default ["\"\"","\"Insert the quotes of NPC's here.\""]
 *
 * @param JavaScript
 *
 * @param OnLoadQuestJS:func
 * @text JS: On Load
 * @parent JavaScript
 * @type note
 * @desc Runs code upon loading the quest in Scene_Quest.
 * Useful for setting up variables.
 * @default "// Insert JavaScript code here."
 *
 */
/* ----------------------------------------------------------------------------
 * Quest Tracker Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tracker:
 *
 * @param General
 *
 * @param TrackerFmt:json
 * @text Tracker Format
 * @parent General
 * @type note
 * @desc Text format for Quest Tracker Window.
 * Read help file for instructions.
 * @default "\\{[[Title]]\\}\n[[Objectives]]"
 *
 * @param Fading
 *
 * @param MinTrackerOpacity:num
 * @text Close Minimum Opacity
 * @parent Fading
 * @type number
 * @min 0
 * @desc Minimum opacity when the player is too close to the
 * quest tracker on the map screen.
 * @default 128
 *
 * @param TrackerFadeSpeed:num
 * @text Tracker Fade Speed
 * @parent Fading
 * @type number
 * @min 1
 * @desc Fade speed of the tracker when toggled on/off.
 * Lower is slower. Higher is faster.
 * @default 16
 *
 * @param Options
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param AddShowOption:eval
 * @text Add Show Tracker?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Tracker' option to the Options menu?
 * @default true
 *
 * @param ShowName:str
 * @text Option Name
 * @parent AddShowOption:eval
 * @desc Command name of the option.
 * @default Show Quest Tracker
 *
 * @param AddPositionOption:eval
 * @text Add Position Tracker?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Position Tracker' option to the Options menu?
 * @default true
 *
 * @param PositionName:str
 * @text Option Name
 * @parent AddPositionOption:eval
 * @desc Command name of the option.
 * @default Quest Tracker Position
 *
 * @param PositionOff:str
 * @text Option OFF
 * @parent AddPositionOption:eval
 * @desc Text displayed when the option is OFF.
 * @default ←
 *
 * @param PositionOn:str
 * @text Option ON
 * @parent AddPositionOption:eval
 * @desc Text displayed when the option is ON.
 * @default →
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Quest' option in the Main Menu.
 * @default Quest
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Quest' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Quest' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param ShowFailed:eval
 * @text Show Failed Quests?
 * @parent CommandWindow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show/hide Failed Quests in the command window.
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent CommandWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent CommandWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CommandWindow_BgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(Window_QuestCommand.prototype.totalCommands(), true);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param QuestLabel
 * @text Quest Label
 *
 * @param QuestLabel_BgType:num
 * @text Background Type
 * @parent QuestLabel
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param QuestLabel_Rect:func
 * @text JS: X, Y, W, H
 * @parent QuestLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, false);\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param LogWindow
 * @text Log Window
 *
 * @param LogWindow_ScrollSpeed:num
 * @text PageUp/Down Speed
 * @parent LogWindow
 * @desc Scroll speed for PageUp/Down.
 * @default 0.20
 *
 * @param LogWindow_BgType:num
 * @text Background Type
 * @parent LogWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param LogWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent LogWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.mainAreaHeight() - this.questLabelWindowRect().height;\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop() + this.questLabelWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param LogWindowExperimental
 * @text EXPERIMENTAL
 * @parent LogWindow
 *
 * @param LogWindow_Auto_WordWrap:eval
 * @text Automatic Word Wrap?
 * @parent LogWindowExperimental
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables automatic word wrap.
 * Requires VisuMZ_1_MessageCore!
 * @default false
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindow_BgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.mainAreaHeight() - this.commandWindowRect().height;\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nconst wy = this.mainAreaTop() + this.commandWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param TrackerWindow
 * @text Tracker Window
 *
 * @param TrackerWindow_Scale:num
 * @text Window Scale
 * @parent TrackerWindow
 * @desc How much do you want to scale the Tracker Window's size by?
 * @default 0.50
 *
 * @param TrackerWindow_BgType:num
 * @text Background Type
 * @parent TrackerWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param TrackerWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent TrackerWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = 560;\nconst wh = Graphics.height / Window_QuestTracker.scale;\nconst wx = this.questTrackerOnRight() ? Graphics.width - Math.ceil(ww * Window_QuestTracker.scale) : 0;\nconst wy = this.buttonAreaHeight() + 8;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x51ad78=_0xbcee;(function(_0x154a1e,_0x5c9b30){const _0x30202e=_0xbcee,_0x5b45f2=_0x154a1e();while(!![]){try{const _0x29659b=-parseInt(_0x30202e(0x1c7))/0x1*(parseInt(_0x30202e(0x38c))/0x2)+parseInt(_0x30202e(0x2f7))/0x3*(parseInt(_0x30202e(0x22f))/0x4)+-parseInt(_0x30202e(0x22e))/0x5*(-parseInt(_0x30202e(0x23c))/0x6)+-parseInt(_0x30202e(0x32d))/0x7+parseInt(_0x30202e(0x1d9))/0x8*(-parseInt(_0x30202e(0x200))/0x9)+parseInt(_0x30202e(0x1fe))/0xa*(parseInt(_0x30202e(0x2cc))/0xb)+parseInt(_0x30202e(0x1f8))/0xc;if(_0x29659b===_0x5c9b30)break;else _0x5b45f2['push'](_0x5b45f2['shift']());}catch(_0x26c2f7){_0x5b45f2['push'](_0x5b45f2['shift']());}}}(_0x5c9f,0xe208c));var label=_0x51ad78(0x18c),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x59d761){const _0x212697=_0x51ad78;return _0x59d761[_0x212697(0x1b3)]&&_0x59d761[_0x212697(0x2a4)]['includes']('['+label+']');})[0x0];function _0xbcee(_0x347565,_0xb4f33e){const _0x5c9f4d=_0x5c9f();return _0xbcee=function(_0xbcee3e,_0x3af722){_0xbcee3e=_0xbcee3e-0x17a;let _0x54980f=_0x5c9f4d[_0xbcee3e];return _0x54980f;},_0xbcee(_0x347565,_0xb4f33e);}VisuMZ[label][_0x51ad78(0x2aa)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x51ad78(0x306)]=function(_0x9abc1,_0x3955e6){const _0x4f5752=_0x51ad78;for(const _0x28d577 in _0x3955e6){if(_0x4f5752(0x271)===_0x4f5752(0x271)){if(_0x28d577[_0x4f5752(0x2be)](/(.*):(.*)/i)){if('KpwoZ'===_0x4f5752(0x270)){const _0x58ecca=String(RegExp['$1']),_0x476bdb=String(RegExp['$2'])['toUpperCase']()[_0x4f5752(0x225)]();let _0x513246,_0x7087c1,_0x49fe99;switch(_0x476bdb){case _0x4f5752(0x1ec):_0x513246=_0x3955e6[_0x28d577]!==''?Number(_0x3955e6[_0x28d577]):0x0;break;case _0x4f5752(0x1a8):_0x7087c1=_0x3955e6[_0x28d577]!==''?JSON[_0x4f5752(0x2ab)](_0x3955e6[_0x28d577]):[],_0x513246=_0x7087c1[_0x4f5752(0x337)](_0x271dbf=>Number(_0x271dbf));break;case'EVAL':_0x513246=_0x3955e6[_0x28d577]!==''?eval(_0x3955e6[_0x28d577]):null;break;case _0x4f5752(0x2fe):_0x7087c1=_0x3955e6[_0x28d577]!==''?JSON[_0x4f5752(0x2ab)](_0x3955e6[_0x28d577]):[],_0x513246=_0x7087c1['map'](_0x3878fd=>eval(_0x3878fd));break;case _0x4f5752(0x20a):_0x513246=_0x3955e6[_0x28d577]!==''?JSON[_0x4f5752(0x2ab)](_0x3955e6[_0x28d577]):'';break;case _0x4f5752(0x349):_0x7087c1=_0x3955e6[_0x28d577]!==''?JSON[_0x4f5752(0x2ab)](_0x3955e6[_0x28d577]):[],_0x513246=_0x7087c1[_0x4f5752(0x337)](_0x5d8e4d=>JSON[_0x4f5752(0x2ab)](_0x5d8e4d));break;case _0x4f5752(0x2ac):_0x513246=_0x3955e6[_0x28d577]!==''?new Function(JSON[_0x4f5752(0x2ab)](_0x3955e6[_0x28d577])):new Function(_0x4f5752(0x389));break;case _0x4f5752(0x19d):_0x7087c1=_0x3955e6[_0x28d577]!==''?JSON['parse'](_0x3955e6[_0x28d577]):[],_0x513246=_0x7087c1[_0x4f5752(0x337)](_0x3bc35c=>new Function(JSON['parse'](_0x3bc35c)));break;case _0x4f5752(0x184):_0x513246=_0x3955e6[_0x28d577]!==''?String(_0x3955e6[_0x28d577]):'';break;case'ARRAYSTR':_0x7087c1=_0x3955e6[_0x28d577]!==''?JSON[_0x4f5752(0x2ab)](_0x3955e6[_0x28d577]):[],_0x513246=_0x7087c1[_0x4f5752(0x337)](_0x29df15=>String(_0x29df15));break;case'STRUCT':_0x49fe99=_0x3955e6[_0x28d577]!==''?JSON['parse'](_0x3955e6[_0x28d577]):{},_0x513246=VisuMZ[_0x4f5752(0x306)]({},_0x49fe99);break;case'ARRAYSTRUCT':_0x7087c1=_0x3955e6[_0x28d577]!==''?JSON[_0x4f5752(0x2ab)](_0x3955e6[_0x28d577]):[],_0x513246=_0x7087c1[_0x4f5752(0x337)](_0x4188d5=>VisuMZ[_0x4f5752(0x306)]({},JSON[_0x4f5752(0x2ab)](_0x4188d5)));break;default:continue;}_0x9abc1[_0x58ecca]=_0x513246;}else{if(!_0x4060c7['wordWrapSupport'])return _0x2b06e6;if(!_0x5deaac[_0x4f5752(0x282)])return _0x242b35;return _0x4dee9d='<WORDWRAP>%1'['format'](_0x10fdb2),_0x59d94b;}}}else _0x45d8e1='\x5cI[%1]%2'[_0x4f5752(0x333)](_0x41e49b,_0x4404f2);}return _0x9abc1;},(_0x2c3e5a=>{const _0x405136=_0x51ad78,_0xf42ee9=_0x2c3e5a[_0x405136(0x190)];for(const _0x181431 of dependencies){if(_0x405136(0x1aa)!==_0x405136(0x359)){if(!Imported[_0x181431]){if(_0x405136(0x25e)===_0x405136(0x252))this['addCommand'](_0xadfaa6['noQuestsListed'],_0x405136(0x2f8),![]);else{alert(_0x405136(0x249)[_0x405136(0x333)](_0xf42ee9,_0x181431)),SceneManager[_0x405136(0x24f)]();break;}}}else this[_0x405136(0x1e2)]=new _0x2193df(_0x4e5580[_0x405136(0x37d)](_0x4330b0[_0x405136(0x1af)])),this[_0x405136(0x215)]=new _0x290e2f(_0x244cc9[_0x405136(0x256)](_0xcd3986[_0x405136(0x361)])),this[_0x405136(0x388)](this[_0x405136(0x1e2)]),this[_0x405136(0x388)](this[_0x405136(0x215)]),this[_0x405136(0x1e2)][_0x405136(0x2c4)]['addLoadListener'](this[_0x405136(0x1e3)]['bind'](this,this['_backSprite1'])),this[_0x405136(0x215)][_0x405136(0x2c4)][_0x405136(0x336)](this['adjustSprite'][_0x405136(0x1b1)](this,this[_0x405136(0x215)]));}const _0x1dd245=_0x2c3e5a[_0x405136(0x2a4)];if(_0x1dd245[_0x405136(0x2be)](/\[Version[ ](.*?)\]/i)){const _0x2b45fb=Number(RegExp['$1']);_0x2b45fb!==VisuMZ[label][_0x405136(0x22d)]&&(_0x405136(0x28b)!=='NTJLc'?this[_0x405136(0x2f2)](...arguments):(alert(_0x405136(0x278)[_0x405136(0x333)](_0xf42ee9,_0x2b45fb)),SceneManager[_0x405136(0x24f)]()));}if(_0x1dd245[_0x405136(0x2be)](/\[Tier[ ](\d+)\]/i)){const _0x11d6ce=Number(RegExp['$1']);_0x11d6ce<tier?(alert(_0x405136(0x1f0)[_0x405136(0x333)](_0xf42ee9,_0x11d6ce,tier)),SceneManager[_0x405136(0x24f)]()):'bujue'===_0x405136(0x360)?this[_0x405136(0x2e5)](_0xf6441f,_0x405136(0x36d)):tier=Math[_0x405136(0x21e)](_0x11d6ce,tier);}VisuMZ[_0x405136(0x306)](VisuMZ[label][_0x405136(0x2aa)],_0x2c3e5a[_0x405136(0x29d)]);})(pluginData),PluginManager[_0x51ad78(0x258)](pluginData[_0x51ad78(0x190)],_0x51ad78(0x344),_0xb4e5d4=>{const _0x54a26d=_0x51ad78;VisuMZ[_0x54a26d(0x306)](_0xb4e5d4,_0xb4e5d4);const _0x33f96a=_0xb4e5d4['Keys'],_0x298d8f=_0xb4e5d4['Status'];for(const _0x519fd6 of _0x33f96a){$gameSystem['setQuestStatus'](_0x519fd6,_0x298d8f);}if(SceneManager['isSceneMap']()){if(_0x54a26d(0x2ae)!==_0x54a26d(0x2ae)){const _0x1320e9=this['_commandNameWindow'],_0x167e6f=_0x1712eb[_0x54a26d(0x339)](),_0x4f8202=_0x3a2844['x']+_0x33f314[_0x54a26d(0x17b)](_0x859672[_0x54a26d(0x183)]/0x2)+_0x167e6f;_0x1320e9['x']=_0x1320e9[_0x54a26d(0x183)]/-0x2+_0x4f8202,_0x1320e9['y']=_0x27d611[_0x54a26d(0x17b)](_0x1a38ae['height']/0x2);}else SceneManager[_0x54a26d(0x238)][_0x54a26d(0x30a)]();}}),PluginManager[_0x51ad78(0x258)](pluginData[_0x51ad78(0x190)],_0x51ad78(0x235),_0xa1061=>{const _0x31b951=_0x51ad78;VisuMZ[_0x31b951(0x306)](_0xa1061,_0xa1061);const _0x481843=_0xa1061[_0x31b951(0x36f)],_0x16c26b=_0xa1061['TargetID'];for(const _0x4f2cb8 of _0x481843){$gameSystem[_0x31b951(0x226)](_0x4f2cb8,_0x16c26b);}SceneManager[_0x31b951(0x376)]()&&SceneManager['_scene'][_0x31b951(0x30a)]();}),PluginManager[_0x51ad78(0x258)](pluginData[_0x51ad78(0x190)],_0x51ad78(0x1cd),_0x5c438c=>{const _0x149674=_0x51ad78;VisuMZ[_0x149674(0x306)](_0x5c438c,_0x5c438c);const _0x14f933=_0x5c438c[_0x149674(0x36f)],_0x3dcd48=_0x5c438c[_0x149674(0x325)],_0x65fa75=_0x5c438c['Status'];for(const _0x283a3e of _0x14f933){$gameSystem[_0x149674(0x36c)](_0x283a3e,_0x3dcd48,_0x65fa75);}SceneManager[_0x149674(0x376)]()&&SceneManager['_scene'][_0x149674(0x30a)]();}),PluginManager['registerCommand'](pluginData['name'],_0x51ad78(0x1d8),_0xa4f31b=>{const _0x16474c=_0x51ad78;VisuMZ['ConvertParams'](_0xa4f31b,_0xa4f31b);const _0x86c809=_0xa4f31b[_0x16474c(0x36f)],_0x21b3a2=_0xa4f31b[_0x16474c(0x307)];for(const _0x36f6b6 of _0x86c809){'dsokG'!=='zZtOU'?$gameSystem['setQuestQuote'](_0x36f6b6,_0x21b3a2):this['drawTextEx'](_0x47ce5a,_0x4a0ae0['x']+_0x37e96c['width']-_0x5e4ae5,_0x10d9aa['y'],_0x5ec20b);}SceneManager[_0x16474c(0x376)]()&&SceneManager['_scene'][_0x16474c(0x30a)]();}),PluginManager['registerCommand'](pluginData[_0x51ad78(0x190)],_0x51ad78(0x232),_0x9211a3=>{const _0xc13c94=_0x51ad78;VisuMZ['ConvertParams'](_0x9211a3,_0x9211a3);const _0x4eb259=_0x9211a3['Keys'],_0x1a5d50=_0x9211a3[_0xc13c94(0x325)],_0x1b2b6c=_0x9211a3[_0xc13c94(0x262)];for(const _0x4349e1 of _0x4eb259){$gameSystem[_0xc13c94(0x296)](_0x4349e1,_0x1a5d50,_0x1b2b6c);}SceneManager['isSceneMap']()&&(_0xc13c94(0x36e)!==_0xc13c94(0x36e)?_0xe46633[_0xc13c94(0x1b5)]['drawItem'][_0xc13c94(0x253)](this,_0x381054):SceneManager[_0xc13c94(0x238)][_0xc13c94(0x30a)]());}),PluginManager[_0x51ad78(0x258)](pluginData['name'],_0x51ad78(0x335),_0x5a1430=>{const _0x287f40=_0x51ad78;VisuMZ[_0x287f40(0x306)](_0x5a1430,_0x5a1430);const _0x5e5cf9=_0x5a1430['Keys'],_0x437f79=_0x5a1430[_0x287f40(0x307)];for(const _0x2dfeb0 of _0x5e5cf9){$gameSystem[_0x287f40(0x379)](_0x2dfeb0,_0x437f79);}if(SceneManager[_0x287f40(0x376)]()){if('bDewq'==='GMEtr')return _0x4741b6[_0x287f40(0x1c3)]()['failed'][_0x287f40(0x1ab)];else SceneManager[_0x287f40(0x238)][_0x287f40(0x30a)]();}}),PluginManager[_0x51ad78(0x258)](pluginData[_0x51ad78(0x190)],_0x51ad78(0x2d4),_0x3f7fea=>{const _0x1a8929=_0x51ad78;VisuMZ[_0x1a8929(0x306)](_0x3f7fea,_0x3f7fea);const _0x38b747=_0x3f7fea[_0x1a8929(0x324)];$gameSystem[_0x1a8929(0x347)](_0x38b747),SceneManager[_0x1a8929(0x376)]()&&SceneManager['_scene'][_0x1a8929(0x30a)]();}),PluginManager[_0x51ad78(0x258)](pluginData[_0x51ad78(0x190)],_0x51ad78(0x22b),_0x15febb=>{const _0x294ee4=_0x51ad78;if(!SceneManager['isSceneMap']())return;SceneManager[_0x294ee4(0x238)][_0x294ee4(0x30a)]();}),PluginManager[_0x51ad78(0x258)](pluginData[_0x51ad78(0x190)],_0x51ad78(0x1ed),_0x4664ec=>{const _0x57d996=_0x51ad78;VisuMZ[_0x57d996(0x306)](_0x4664ec,_0x4664ec),$gameSystem[_0x57d996(0x24d)](_0x4664ec[_0x57d996(0x248)]),SceneManager[_0x57d996(0x376)]()&&('OxwaX'!==_0x57d996(0x28d)?_0x4e779a[_0x57d996(0x238)][_0x57d996(0x30a)]():SceneManager['_scene'][_0x57d996(0x30a)]());}),PluginManager['registerCommand'](pluginData[_0x51ad78(0x190)],_0x51ad78(0x229),_0x3b2b4e=>{const _0x54021a=_0x51ad78;if($gameParty[_0x54021a(0x35f)]())return;SceneManager['push'](Scene_Quest);}),PluginManager[_0x51ad78(0x258)](pluginData['name'],'SystemEnableQuestMenu',_0x3a2fea=>{const _0x2b5594=_0x51ad78;VisuMZ[_0x2b5594(0x306)](_0x3a2fea,_0x3a2fea),$gameSystem[_0x2b5594(0x1c3)]()['enabled']=_0x3a2fea[_0x2b5594(0x23f)];}),PluginManager[_0x51ad78(0x258)](pluginData[_0x51ad78(0x190)],_0x51ad78(0x31e),_0x4ed5ab=>{const _0x193b44=_0x51ad78;VisuMZ[_0x193b44(0x306)](_0x4ed5ab,_0x4ed5ab),$gameSystem[_0x193b44(0x1c3)]()[_0x193b44(0x2ca)]=_0x4ed5ab['Show'];}),VisuMZ[_0x51ad78(0x18c)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x51ad78(0x340)],Scene_Boot['prototype'][_0x51ad78(0x340)]=function(){const _0x31c9dc=_0x51ad78;VisuMZ[_0x31c9dc(0x18c)][_0x31c9dc(0x2db)][_0x31c9dc(0x253)](this),this[_0x31c9dc(0x2e4)]();},VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x370)]=[],VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x1e1)]={},Scene_Boot[_0x51ad78(0x1b5)][_0x51ad78(0x2e4)]=function(){const _0x3682e4=_0x51ad78;for(const _0x2a72c7 of VisuMZ[_0x3682e4(0x18c)][_0x3682e4(0x2aa)][_0x3682e4(0x241)]){if(_0x3682e4(0x189)!==_0x3682e4(0x189))this[_0x3682e4(0x250)](_0x4865c7),this[_0x3682e4(0x1c4)](_0x3c3519);else{if(!_0x2a72c7)continue;for(const _0xbf9519 of _0x2a72c7['Quests']){if(!_0xbf9519)continue;_0xbf9519['category']=_0x2a72c7,_0xbf9519[_0x3682e4(0x1f2)][_0x3682e4(0x2d5)](''),_0xbf9519[_0x3682e4(0x353)][_0x3682e4(0x2d5)](''),_0xbf9519[_0x3682e4(0x17e)][_0x3682e4(0x2d5)](''),_0xbf9519['Subtext']['unshift'](''),_0xbf9519[_0x3682e4(0x1e0)][_0x3682e4(0x2d5)]('');const _0x3ad4b2=_0xbf9519['Key'][_0x3682e4(0x21d)]()[_0x3682e4(0x225)]();VisuMZ[_0x3682e4(0x18c)][_0x3682e4(0x370)][_0x3682e4(0x1bd)](_0x3ad4b2),VisuMZ['QuestSystem'][_0x3682e4(0x1e1)][_0x3ad4b2]=_0xbf9519;}}}},ConfigManager[_0x51ad78(0x213)]=!![],ConfigManager['questTrackerPosition']=!![],VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x267)]=ConfigManager[_0x51ad78(0x266)],ConfigManager[_0x51ad78(0x266)]=function(){const _0x3645bb=_0x51ad78,_0x46e5a3=VisuMZ[_0x3645bb(0x18c)][_0x3645bb(0x267)][_0x3645bb(0x253)](this);return _0x46e5a3[_0x3645bb(0x213)]=this[_0x3645bb(0x213)],_0x46e5a3[_0x3645bb(0x37e)]=this[_0x3645bb(0x37e)],_0x46e5a3;},VisuMZ['QuestSystem'][_0x51ad78(0x1a7)]=ConfigManager[_0x51ad78(0x188)],ConfigManager[_0x51ad78(0x188)]=function(_0x54c4b7){const _0x9eb6a0=_0x51ad78;VisuMZ[_0x9eb6a0(0x18c)]['ConfigManager_applyData']['call'](this,_0x54c4b7),'questTrackerShow'in _0x54c4b7?this[_0x9eb6a0(0x213)]=_0x54c4b7[_0x9eb6a0(0x213)]:'NcNQN'===_0x9eb6a0(0x375)?this['drawTextEx'](_0xcf7f6e,_0x59d033['x']+_0x410638['width']-_0x554240,_0x12a96f['y'],_0xbe15b1):this['questTrackerShow']=!![],'questTrackerPosition'in _0x54c4b7?this[_0x9eb6a0(0x37e)]=_0x54c4b7[_0x9eb6a0(0x37e)]:_0x9eb6a0(0x2e3)==='fYWpg'?this[_0x9eb6a0(0x37e)]=!![]:(_0x22de8f[_0x9eb6a0(0x1b5)][_0x9eb6a0(0x292)][_0x9eb6a0(0x253)](this),this[_0x9eb6a0(0x298)]());},ImageManager[_0x51ad78(0x211)]=VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x2aa)]['General'][_0x51ad78(0x230)],ImageManager['questCompletedIcon']=VisuMZ[_0x51ad78(0x18c)]['Settings'][_0x51ad78(0x201)]['CommandWindow_Completed_Icon'],ImageManager['questFailedIcon']=VisuMZ[_0x51ad78(0x18c)]['Settings'][_0x51ad78(0x201)]['CommandWindow_Failed_Icon'],TextManager[_0x51ad78(0x2c3)]=VisuMZ[_0x51ad78(0x18c)]['Settings'][_0x51ad78(0x202)][_0x51ad78(0x2e7)],TextManager[_0x51ad78(0x23d)]=VisuMZ[_0x51ad78(0x18c)]['Settings'][_0x51ad78(0x201)][_0x51ad78(0x279)],TextManager[_0x51ad78(0x25d)]=VisuMZ['QuestSystem'][_0x51ad78(0x2aa)][_0x51ad78(0x201)]['CommandWindow_Completed_Text'],TextManager[_0x51ad78(0x310)]=VisuMZ['QuestSystem'][_0x51ad78(0x2aa)][_0x51ad78(0x201)]['CommandWindow_Failed_Text'],TextManager[_0x51ad78(0x33f)]=VisuMZ['QuestSystem'][_0x51ad78(0x2aa)][_0x51ad78(0x201)]['ListWindowCategoryOpenFmt'],TextManager[_0x51ad78(0x2b7)]=VisuMZ['QuestSystem'][_0x51ad78(0x2aa)][_0x51ad78(0x201)][_0x51ad78(0x1be)],TextManager['noQuestsLabel']=VisuMZ['QuestSystem']['Settings']['General']['EmptyTitleLabel'],TextManager[_0x51ad78(0x36a)]=VisuMZ['QuestSystem'][_0x51ad78(0x2aa)][_0x51ad78(0x201)][_0x51ad78(0x2f4)],TextManager[_0x51ad78(0x301)]=VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x2aa)][_0x51ad78(0x201)]['LogFmt'],TextManager[_0x51ad78(0x2ee)]=VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x2aa)][_0x51ad78(0x201)][_0x51ad78(0x203)],TextManager['questObjectiveNormalFmt']=VisuMZ[_0x51ad78(0x18c)]['Settings'][_0x51ad78(0x201)]['Objective_Normal_Fmt'],TextManager['questObjectiveClearedFmt']=VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x2aa)][_0x51ad78(0x201)][_0x51ad78(0x2b5)],TextManager[_0x51ad78(0x210)]=VisuMZ['QuestSystem']['Settings'][_0x51ad78(0x201)]['Objective_Failed_Fmt'],TextManager['questRewardsNormalFmt']=VisuMZ[_0x51ad78(0x18c)]['Settings']['General'][_0x51ad78(0x20b)],TextManager[_0x51ad78(0x35b)]=VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x2aa)][_0x51ad78(0x201)][_0x51ad78(0x1ba)],TextManager[_0x51ad78(0x19c)]=VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x2aa)][_0x51ad78(0x201)]['Reward_Failed_Fmt'],TextManager[_0x51ad78(0x330)]=VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x2aa)][_0x51ad78(0x201)][_0x51ad78(0x2c5)],TextManager['questButtonAssistActive']=VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x2aa)][_0x51ad78(0x201)]['questButtonAssistActive'],TextManager[_0x51ad78(0x2ef)]=VisuMZ['QuestSystem'][_0x51ad78(0x2aa)][_0x51ad78(0x201)][_0x51ad78(0x1b2)],TextManager[_0x51ad78(0x199)]=VisuMZ[_0x51ad78(0x18c)]['Settings'][_0x51ad78(0x201)][_0x51ad78(0x277)],TextManager[_0x51ad78(0x243)]=_0x51ad78(0x2df),TextManager['questTrackerFmt']=VisuMZ[_0x51ad78(0x18c)]['Settings'][_0x51ad78(0x1cb)][_0x51ad78(0x33c)]||TextManager['defaultQuestTrackerFmt'],TextManager[_0x51ad78(0x1db)]=VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x2aa)][_0x51ad78(0x201)][_0x51ad78(0x320)],TextManager[_0x51ad78(0x213)]=VisuMZ['QuestSystem'][_0x51ad78(0x2aa)][_0x51ad78(0x1cb)][_0x51ad78(0x318)],TextManager[_0x51ad78(0x37e)]=VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x2aa)]['Tracker'][_0x51ad78(0x239)],TextManager[_0x51ad78(0x323)]=VisuMZ['QuestSystem'][_0x51ad78(0x2aa)]['Tracker'][_0x51ad78(0x20e)],TextManager[_0x51ad78(0x1de)]=VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x2aa)][_0x51ad78(0x1cb)][_0x51ad78(0x2ff)],SceneManager['isSceneMap']=function(){const _0x253004=_0x51ad78;return this[_0x253004(0x238)]&&this['_scene'][_0x253004(0x382)]===Scene_Map;},VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x280)]=Game_System[_0x51ad78(0x1b5)][_0x51ad78(0x2f2)],Game_System[_0x51ad78(0x1b5)]['initialize']=function(){const _0x5b381c=_0x51ad78;VisuMZ[_0x5b381c(0x18c)][_0x5b381c(0x280)][_0x5b381c(0x253)](this),this[_0x5b381c(0x223)]();},Game_System[_0x51ad78(0x1b5)][_0x51ad78(0x223)]=function(){const _0x5e81cb=_0x51ad78,_0xc2cab=VisuMZ[_0x5e81cb(0x18c)][_0x5e81cb(0x2aa)][_0x5e81cb(0x201)],_0x1c3354=VisuMZ[_0x5e81cb(0x18c)][_0x5e81cb(0x2aa)][_0x5e81cb(0x202)];this['_quests']={'shown':_0x1c3354['ShowMainMenu'],'enabled':_0x1c3354[_0x5e81cb(0x33a)],'known':[],'completed':[],'failed':[],'description':{},'objectives':{},'objectivesCompleted':{},'objectivesFailed':{},'rewards':{},'rewardsClaimed':{},'rewardsDenied':{},'subtext':{},'quotes':{},'tracked':_0xc2cab[_0x5e81cb(0x317)][_0x5e81cb(0x21d)]()[_0x5e81cb(0x225)](),'showTracker':!![]};for(const _0xe9f14a of _0xc2cab[_0x5e81cb(0x1c5)]){this[_0x5e81cb(0x2e5)](_0xe9f14a,'known');}for(const _0x20a597 of _0xc2cab[_0x5e81cb(0x1bb)]){this['setQuestStatus'](_0x20a597,'completed');}for(const _0x306da2 of _0xc2cab[_0x5e81cb(0x2a5)]){this[_0x5e81cb(0x2e5)](_0x306da2,'failed');}},Game_System['prototype'][_0x51ad78(0x23b)]=function(_0x41e8a4){const _0xc0d198=_0x51ad78;return _0x41e8a4=_0x41e8a4['toUpperCase']()[_0xc0d198(0x225)](),VisuMZ[_0xc0d198(0x18c)][_0xc0d198(0x1e1)][_0x41e8a4];},Game_System['prototype']['questData']=function(){const _0x5e5728=_0x51ad78;if(this[_0x5e5728(0x286)]===undefined)this['initQuestSystem']();return this['_quests'];},Game_System[_0x51ad78(0x1b5)][_0x51ad78(0x2e8)]=function(){const _0x1e0170=_0x51ad78;return this[_0x1e0170(0x1c3)]()['shown'];},Game_System[_0x51ad78(0x1b5)][_0x51ad78(0x30c)]=function(){const _0x4f9386=_0x51ad78;return this[_0x4f9386(0x1c3)]()['enabled'];},Game_System[_0x51ad78(0x1b5)]['setQuestStatus']=function(_0x9031c4,_0x49f8bd){const _0x3abd42=_0x51ad78;_0x9031c4=_0x9031c4[_0x3abd42(0x21d)]()[_0x3abd42(0x225)]();if(!VisuMZ[_0x3abd42(0x18c)][_0x3abd42(0x1e1)][_0x9031c4])return;const _0x568b99=this[_0x3abd42(0x1c3)]();_0x568b99[_0x3abd42(0x180)]=_0x568b99[_0x3abd42(0x180)]||[],_0x568b99['completed']=_0x568b99[_0x3abd42(0x36d)]||[],_0x568b99[_0x3abd42(0x1e6)]=_0x568b99['failed']||[],_0x568b99[_0x3abd42(0x180)][_0x3abd42(0x381)](_0x9031c4),_0x568b99['completed'][_0x3abd42(0x381)](_0x9031c4),_0x568b99[_0x3abd42(0x1e6)]['remove'](_0x9031c4);if(_0x49f8bd!==_0x3abd42(0x381))_0x568b99[_0x49f8bd][_0x3abd42(0x1bd)](_0x9031c4);if(_0x9031c4===_0x568b99['tracked'][_0x3abd42(0x21d)]()[_0x3abd42(0x225)]()){if(_0x3abd42(0x1fa)!==_0x3abd42(0x1fa)){const _0x369a60=this[_0x3abd42(0x228)](_0x3328dd),_0x207a02=this[_0x3abd42(0x371)](_0x4c5cbd),_0x4f499f=this['textSizeEx'](_0x207a02)[_0x3abd42(0x183)];this[_0x3abd42(0x2c2)](this[_0x3abd42(0x26a)](_0x391e2d));const _0x224298=this[_0x3abd42(0x368)]();if(_0x224298===_0x3abd42(0x30e))this[_0x3abd42(0x328)](_0x207a02,_0x369a60['x']+_0x369a60['width']-_0x4f499f,_0x369a60['y'],_0x4f499f);else{if(_0x224298==='center'){const _0x572012=_0x369a60['x']+_0xaf02c8['floor']((_0x369a60[_0x3abd42(0x183)]-_0x4f499f)/0x2);this['drawTextEx'](_0x207a02,_0x572012,_0x369a60['y'],_0x4f499f);}else this[_0x3abd42(0x328)](_0x207a02,_0x369a60['x'],_0x369a60['y'],_0x4f499f);}}else _0x49f8bd!=='known'&&this['setTrackedQuest']('');}},Game_System[_0x51ad78(0x1b5)][_0x51ad78(0x187)]=function(){const _0x4fb935=_0x51ad78,_0x12245e=this[_0x4fb935(0x1c3)]();return _0x12245e['known']=_0x12245e[_0x4fb935(0x180)]||[],_0x12245e[_0x4fb935(0x180)][_0x4fb935(0x337)](_0x43a152=>this['quest'](_0x43a152))[_0x4fb935(0x381)](null);},Game_System[_0x51ad78(0x1b5)][_0x51ad78(0x34b)]=function(_0x50169f){const _0x57c957=_0x51ad78,_0x536939=this[_0x57c957(0x1c3)]();return _0x536939[_0x57c957(0x180)]=_0x536939['known']||[],_0x50169f=_0x50169f[_0x57c957(0x21d)]()[_0x57c957(0x225)](),_0x536939['known']['includes'](_0x50169f);},Game_System[_0x51ad78(0x1b5)][_0x51ad78(0x1d3)]=function(){const _0x37474f=_0x51ad78,_0x39a418=this[_0x37474f(0x1c3)]();return _0x39a418[_0x37474f(0x36d)]=_0x39a418[_0x37474f(0x36d)]||[],_0x39a418[_0x37474f(0x36d)]['map'](_0x4f2e7e=>this[_0x37474f(0x23b)](_0x4f2e7e))[_0x37474f(0x381)](null);},Game_System[_0x51ad78(0x1b5)]['isQuestCompleted']=function(_0xd58145){const _0x194424=_0x51ad78,_0x2b0ca7=this[_0x194424(0x1c3)]();return _0x2b0ca7[_0x194424(0x36d)]=_0x2b0ca7['completed']||[],_0xd58145=_0xd58145[_0x194424(0x21d)]()[_0x194424(0x225)](),_0x2b0ca7[_0x194424(0x36d)]['includes'](_0xd58145);},Game_System[_0x51ad78(0x1b5)][_0x51ad78(0x214)]=function(){const _0x2a3935=_0x51ad78,_0x548801=this[_0x2a3935(0x1c3)]();return _0x548801['failed']=_0x548801[_0x2a3935(0x1e6)]||[],_0x548801[_0x2a3935(0x1e6)][_0x2a3935(0x337)](_0x1f6c2d=>this[_0x2a3935(0x23b)](_0x1f6c2d))[_0x2a3935(0x381)](null);},Game_System[_0x51ad78(0x1b5)][_0x51ad78(0x367)]=function(_0x52fafe){const _0x3ec4a5=_0x51ad78,_0x1e8125=this[_0x3ec4a5(0x1c3)]();return _0x1e8125['failed']=_0x1e8125[_0x3ec4a5(0x1e6)]||[],_0x52fafe=_0x52fafe[_0x3ec4a5(0x21d)]()['trim'](),_0x1e8125['failed'][_0x3ec4a5(0x283)](_0x52fafe);},Game_System[_0x51ad78(0x1b5)][_0x51ad78(0x24e)]=function(_0x452f00){const _0x5600f9=_0x51ad78;_0x452f00=_0x452f00['toUpperCase']()[_0x5600f9(0x225)]();const _0x2c7fcd=this[_0x5600f9(0x23b)](_0x452f00);if(!_0x2c7fcd)return'';const _0x4dbab1=this[_0x5600f9(0x1c3)]()[_0x5600f9(0x2a4)];_0x4dbab1[_0x452f00]=_0x4dbab1[_0x452f00]||0x1;const _0xa67485=_0x4dbab1[_0x452f00];return _0x2c7fcd[_0x5600f9(0x1f2)][_0xa67485]||'';},Game_System[_0x51ad78(0x1b5)]['setQuestDescription']=function(_0xa64d5b,_0xe70efc){const _0x5108ad=_0x51ad78;_0xa64d5b=_0xa64d5b['toUpperCase']()[_0x5108ad(0x225)]();const _0x400d4d=this[_0x5108ad(0x23b)](_0xa64d5b);if(!_0x400d4d)return'';const _0x50b0b4=this[_0x5108ad(0x1c3)]()[_0x5108ad(0x2a4)];_0x50b0b4[_0xa64d5b]=_0xe70efc;},Game_System[_0x51ad78(0x1b5)]['questObjectives']=function(_0x3a81b6){const _0x456306=_0x51ad78;_0x3a81b6=_0x3a81b6[_0x456306(0x21d)]()['trim']();const _0x369220=this['quest'](_0x3a81b6);if(!_0x369220)return'';const _0xffeb49=this['questData']();return _0xffeb49[_0x456306(0x299)]=_0xffeb49['objectives']||{},!_0xffeb49[_0x456306(0x299)][_0x3a81b6]&&(_0xffeb49[_0x456306(0x299)][_0x3a81b6]=JsonEx[_0x456306(0x29a)](_0x369220['VisibleObjectives'])),_0xffeb49[_0x456306(0x299)][_0x3a81b6][_0x456306(0x1a2)]((_0x3e6e7b,_0x300ce1)=>_0x3e6e7b-_0x300ce1);},Game_System[_0x51ad78(0x1b5)][_0x51ad78(0x36c)]=function(_0x10705e,_0x574a95,_0x509da7){const _0x3dfd20=_0x51ad78;_0x10705e=_0x10705e[_0x3dfd20(0x21d)]()['trim']();const _0x54fa03=this['quest'](_0x10705e);if(!_0x54fa03)return'';const _0x4b4164=this[_0x3dfd20(0x1c3)]();_0x4b4164['objectives']=_0x4b4164['objectives']||{};if(!_0x4b4164[_0x3dfd20(0x299)][_0x10705e]){if('IZGio'===_0x3dfd20(0x322))_0x4b4164['objectives'][_0x10705e]=JsonEx[_0x3dfd20(0x29a)](_0x54fa03['VisibleObjectives']);else{_0x59b8a7=_0x18eb57['toUpperCase']()[_0x3dfd20(0x225)]();const _0x5e396b=_0x35f831['quest'](_0xcf4049);if(!_0x5e396b)return![];_0x2f1bc1[_0x3dfd20(0x194)](_0x1665a2);const _0x430198=_0x30cabc['questData']()[_0x3dfd20(0x35c)];if(!_0x430198[_0xb5807])return![];return _0x430198[_0xc64bb5][_0x3dfd20(0x283)](_0x5b3239);}}_0x4b4164['objectives'][_0x10705e]=_0x4b4164[_0x3dfd20(0x299)][_0x10705e]||[],_0x4b4164[_0x3dfd20(0x2b0)][_0x10705e]=_0x4b4164[_0x3dfd20(0x2b0)][_0x10705e]||[],_0x4b4164[_0x3dfd20(0x251)][_0x10705e]=_0x4b4164[_0x3dfd20(0x251)][_0x10705e]||[];for(const _0x15bedf of _0x574a95){_0x4b4164[_0x3dfd20(0x299)][_0x10705e]['remove'](_0x15bedf),_0x4b4164[_0x3dfd20(0x2b0)][_0x10705e]['remove'](_0x15bedf),_0x4b4164[_0x3dfd20(0x251)][_0x10705e][_0x3dfd20(0x381)](_0x15bedf);switch(_0x509da7){case _0x3dfd20(0x331):case'known':_0x4b4164['objectives'][_0x10705e][_0x3dfd20(0x1bd)](_0x15bedf);break;case'complete':case _0x3dfd20(0x36d):_0x4b4164[_0x3dfd20(0x2b0)][_0x10705e][_0x3dfd20(0x1bd)](_0x15bedf);break;case'fail':case _0x3dfd20(0x1e6):_0x4b4164[_0x3dfd20(0x251)][_0x10705e]['push'](_0x15bedf);break;case _0x3dfd20(0x381):case _0x3dfd20(0x378):break;}}},Game_System[_0x51ad78(0x1b5)][_0x51ad78(0x2d2)]=function(_0xb20378){const _0x28ef73=_0x51ad78;_0xb20378=_0xb20378[_0x28ef73(0x21d)]()[_0x28ef73(0x225)]();const _0x9b8cc3=this[_0x28ef73(0x23b)](_0xb20378);if(!_0x9b8cc3)return'';const _0x4d477f=this[_0x28ef73(0x1c3)]();return _0x4d477f[_0x28ef73(0x2b0)]=_0x4d477f[_0x28ef73(0x2b0)]||{},_0x4d477f[_0x28ef73(0x2b0)][_0xb20378]=_0x4d477f[_0x28ef73(0x2b0)][_0xb20378]||[],_0x4d477f[_0x28ef73(0x2b0)][_0xb20378][_0x28ef73(0x1a2)]((_0x485cf9,_0x3fe9dd)=>_0x485cf9-_0x3fe9dd);},Game_System[_0x51ad78(0x1b5)]['questObjectivesFailed']=function(_0x33dc66){const _0x49f1ea=_0x51ad78;_0x33dc66=_0x33dc66['toUpperCase']()['trim']();const _0x4ae392=this[_0x49f1ea(0x23b)](_0x33dc66);if(!_0x4ae392)return'';const _0xe330d8=this[_0x49f1ea(0x1c3)]();return _0xe330d8[_0x49f1ea(0x251)]=_0xe330d8[_0x49f1ea(0x251)]||{},_0xe330d8['objectivesFailed'][_0x33dc66]=_0xe330d8[_0x49f1ea(0x251)][_0x33dc66]||[],_0xe330d8[_0x49f1ea(0x251)][_0x33dc66][_0x49f1ea(0x1a2)]((_0x3c06be,_0xd9a217)=>_0x3c06be-_0xd9a217);},Game_System[_0x51ad78(0x1b5)]['questRewards']=function(_0x6068c6){const _0x49fe3e=_0x51ad78;_0x6068c6=_0x6068c6['toUpperCase']()[_0x49fe3e(0x225)]();const _0x3ea9d2=this['quest'](_0x6068c6);if(!_0x3ea9d2)return'';const _0x1be1d0=this[_0x49fe3e(0x1c3)]();return _0x1be1d0['rewards']=_0x1be1d0['rewards']||{},!_0x1be1d0[_0x49fe3e(0x25c)][_0x6068c6]&&(_0x1be1d0['rewards'][_0x6068c6]=JsonEx[_0x49fe3e(0x29a)](_0x3ea9d2[_0x49fe3e(0x209)])),_0x1be1d0['rewards'][_0x6068c6][_0x49fe3e(0x1a2)]((_0x2d724a,_0xda3cf7)=>_0x2d724a-_0xda3cf7);},Game_System['prototype'][_0x51ad78(0x296)]=function(_0x2fe30f,_0x6c26ef,_0x45f9ba){const _0x22bbf7=_0x51ad78;_0x2fe30f=_0x2fe30f[_0x22bbf7(0x21d)]()['trim']();const _0x402864=this[_0x22bbf7(0x23b)](_0x2fe30f);if(!_0x402864)return'';const _0x14850e=this[_0x22bbf7(0x1c3)]();_0x14850e[_0x22bbf7(0x25c)]=_0x14850e['rewards']||{};!_0x14850e[_0x22bbf7(0x25c)][_0x2fe30f]&&(_0x14850e[_0x22bbf7(0x25c)][_0x2fe30f]=JsonEx[_0x22bbf7(0x29a)](_0x402864[_0x22bbf7(0x209)]));_0x14850e[_0x22bbf7(0x25c)][_0x2fe30f]=_0x14850e[_0x22bbf7(0x25c)][_0x2fe30f]||[],_0x14850e[_0x22bbf7(0x35c)][_0x2fe30f]=_0x14850e[_0x22bbf7(0x35c)][_0x2fe30f]||[],_0x14850e[_0x22bbf7(0x2c0)][_0x2fe30f]=_0x14850e[_0x22bbf7(0x2c0)][_0x2fe30f]||[];for(const _0x3d0874 of _0x6c26ef){_0x14850e[_0x22bbf7(0x25c)][_0x2fe30f]['remove'](_0x3d0874),_0x14850e[_0x22bbf7(0x35c)][_0x2fe30f]['remove'](_0x3d0874),_0x14850e[_0x22bbf7(0x2c0)][_0x2fe30f][_0x22bbf7(0x381)](_0x3d0874);switch(_0x45f9ba){case _0x22bbf7(0x331):case'known':_0x14850e[_0x22bbf7(0x25c)][_0x2fe30f][_0x22bbf7(0x1bd)](_0x3d0874);break;case _0x22bbf7(0x18b):case _0x22bbf7(0x338):_0x14850e['rewardsClaimed'][_0x2fe30f]['push'](_0x3d0874);break;case _0x22bbf7(0x32b):case _0x22bbf7(0x37f):_0x14850e[_0x22bbf7(0x2c0)][_0x2fe30f]['push'](_0x3d0874);break;case _0x22bbf7(0x381):case _0x22bbf7(0x378):break;}}},Game_System['prototype'][_0x51ad78(0x351)]=function(_0xea413e){const _0x472106=_0x51ad78;_0xea413e=_0xea413e[_0x472106(0x21d)]()['trim']();const _0x2bb655=this['quest'](_0xea413e);if(!_0x2bb655)return'';const _0x13c37f=this[_0x472106(0x1c3)]();return _0x13c37f[_0x472106(0x35c)]=_0x13c37f[_0x472106(0x35c)]||{},_0x13c37f['rewardsClaimed'][_0xea413e]=_0x13c37f[_0x472106(0x35c)][_0xea413e]||[],_0x13c37f[_0x472106(0x35c)][_0xea413e][_0x472106(0x1a2)]((_0x4cdec3,_0x9468e2)=>_0x4cdec3-_0x9468e2);},Game_System[_0x51ad78(0x1b5)][_0x51ad78(0x2a7)]=function(_0xefe14e){const _0x2b6a42=_0x51ad78;_0xefe14e=_0xefe14e[_0x2b6a42(0x21d)]()['trim']();const _0x5569f5=this[_0x2b6a42(0x23b)](_0xefe14e);if(!_0x5569f5)return'';const _0x213585=this[_0x2b6a42(0x1c3)]();return _0x213585['rewardsDenied']=_0x213585[_0x2b6a42(0x2c0)]||{},_0x213585['rewardsDenied'][_0xefe14e]=_0x213585[_0x2b6a42(0x2c0)][_0xefe14e]||[],_0x213585[_0x2b6a42(0x2c0)][_0xefe14e][_0x2b6a42(0x1a2)]((_0x447557,_0x2c0284)=>_0x447557-_0x2c0284);},Game_System[_0x51ad78(0x1b5)][_0x51ad78(0x1a5)]=function(_0x168bf2){const _0x42644f=_0x51ad78;_0x168bf2=_0x168bf2[_0x42644f(0x21d)]()[_0x42644f(0x225)]();const _0x3a8967=this[_0x42644f(0x23b)](_0x168bf2);if(!_0x3a8967)return'';const _0x5ebacc=this['questData']()[_0x42644f(0x217)];_0x5ebacc[_0x168bf2]=_0x5ebacc[_0x168bf2]||0x1;const _0x30a288=_0x5ebacc[_0x168bf2];return _0x3a8967['Subtext'][_0x30a288]||'';},Game_System[_0x51ad78(0x1b5)]['setQuestSubtext']=function(_0x9b244a,_0x42147c){const _0x44ce7e=_0x51ad78;_0x9b244a=_0x9b244a[_0x44ce7e(0x21d)]()[_0x44ce7e(0x225)]();const _0x2b6a2c=this[_0x44ce7e(0x23b)](_0x9b244a);if(!_0x2b6a2c)return'';const _0x33bc91=this[_0x44ce7e(0x1c3)]()[_0x44ce7e(0x217)];_0x33bc91[_0x9b244a]=_0x42147c;},Game_System[_0x51ad78(0x1b5)]['questQuote']=function(_0x28b861){const _0x9c7761=_0x51ad78;_0x28b861=_0x28b861[_0x9c7761(0x21d)]()[_0x9c7761(0x225)]();const _0x2eeab4=this['quest'](_0x28b861);if(!_0x2eeab4)return'';const _0x5e3902=this[_0x9c7761(0x1c3)]()['quotes'];_0x5e3902[_0x28b861]=_0x5e3902[_0x28b861]||0x1;const _0x23668b=_0x5e3902[_0x28b861];return _0x2eeab4[_0x9c7761(0x1e0)][_0x23668b]||'';},Game_System[_0x51ad78(0x1b5)][_0x51ad78(0x1c8)]=function(_0x3a2735,_0x1058c8){const _0x59054e=_0x51ad78;_0x3a2735=_0x3a2735[_0x59054e(0x21d)]()[_0x59054e(0x225)]();const _0x184d8c=this[_0x59054e(0x23b)](_0x3a2735);if(!_0x184d8c)return'';const _0x25d743=this[_0x59054e(0x1c3)]()[_0x59054e(0x274)];_0x25d743[_0x3a2735]=_0x1058c8;},Game_System[_0x51ad78(0x1b5)][_0x51ad78(0x2f9)]=function(){const _0x20c8da=_0x51ad78,_0x27ab50=this[_0x20c8da(0x1c3)]();return this[_0x20c8da(0x23b)](_0x27ab50[_0x20c8da(0x2c6)]);},Game_System['prototype'][_0x51ad78(0x347)]=function(_0x1b2496,_0x2e6334){const _0x202e4e=_0x51ad78,_0x5e0459=this[_0x202e4e(0x1c3)]();if(_0x2e6334&&_0x5e0459[_0x202e4e(0x2c6)]===_0x1b2496)_0x1b2496='';_0x5e0459['tracked']=_0x1b2496;if(SceneManager[_0x202e4e(0x376)]()){if('gCPEV'===_0x202e4e(0x2fa)){const _0x14b3a1=this[_0x202e4e(0x2bb)]();_0x4e16c6[_0x202e4e(0x18c)][_0x202e4e(0x357)]['call'](this,_0xc68e86),this[_0x202e4e(0x18a)](_0x4c74c6,_0x14b3a1);}else SceneManager['_scene']['setQuestForQuestTrackerWindow'](_0x1b2496);}},Game_System[_0x51ad78(0x1b5)][_0x51ad78(0x341)]=function(){const _0x11e8e9=_0x51ad78,_0x3c5b69=this[_0x11e8e9(0x1c3)]();return _0x3c5b69[_0x11e8e9(0x26b)];},Game_System[_0x51ad78(0x1b5)][_0x51ad78(0x24d)]=function(_0x36cebc){const _0x1a67d5=_0x51ad78,_0x251fe5=this[_0x1a67d5(0x1c3)]();_0x251fe5['showTracker']=_0x36cebc;},VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x357)]=Game_BattlerBase[_0x51ad78(0x1b5)][_0x51ad78(0x1d7)],Game_BattlerBase['prototype'][_0x51ad78(0x1d7)]=function(_0x58a0a2){const _0x198722=_0x51ad78,_0x758d1e=this[_0x198722(0x2bb)]();VisuMZ[_0x198722(0x18c)][_0x198722(0x357)]['call'](this,_0x58a0a2),this[_0x198722(0x18a)](_0x58a0a2,_0x758d1e);},Game_BattlerBase['prototype'][_0x51ad78(0x18a)]=function(_0x349ed7,_0x3b7684){const _0x41bfdc=_0x51ad78;if(_0x349ed7!==this[_0x41bfdc(0x363)]())return;if(!this[_0x41bfdc(0x1f4)]())return;if(!_0x3b7684)return;if(!this[_0x41bfdc(0x1d2)]())return;if(this[_0x41bfdc(0x19a)])return;this[_0x41bfdc(0x19a)]=!![];const _0x8e5c93=this['enemy']()[_0x41bfdc(0x300)],_0x20401c=_0x8e5c93[_0x41bfdc(0x2be)](/<VARIABLE (\d+) ON DEATH: ([\+\-]\d+)>/gi);if(_0x20401c)for(const _0x143252 of _0x20401c){_0x143252[_0x41bfdc(0x2be)](/<VARIABLE (\d+) ON DEATH: ([\+\-]\d+)>/i);const _0x488258=Number(RegExp['$1']),_0x25a023=Number(RegExp['$2']),_0x348dae=$gameVariables[_0x41bfdc(0x2da)](_0x488258);$gameVariables[_0x41bfdc(0x373)](_0x488258,_0x348dae+_0x25a023);}},VisuMZ['QuestSystem'][_0x51ad78(0x334)]=Game_Battler['prototype'][_0x51ad78(0x2a1)],Game_Battler['prototype'][_0x51ad78(0x2a1)]=function(_0x1dadcc){const _0x47c343=_0x51ad78;VisuMZ[_0x47c343(0x18c)][_0x47c343(0x334)][_0x47c343(0x253)](this,_0x1dadcc),this[_0x47c343(0x1c2)](_0x1dadcc);},Game_Battler[_0x51ad78(0x1b5)][_0x51ad78(0x1c2)]=function(_0x1cf7be){const _0x46b04b=_0x51ad78;if(!_0x1cf7be)return;if(!this[_0x46b04b(0x38a)]())return;const _0x5ce08d=_0x1cf7be[_0x46b04b(0x300)],_0x2bd2ce=_0x5ce08d[_0x46b04b(0x2be)](/<VARIABLE (\d+) ON USE: ([\+\-]\d+)>/gi);if(_0x2bd2ce)for(const _0x4f7364 of _0x2bd2ce){if(_0x46b04b(0x309)===_0x46b04b(0x309)){_0x4f7364[_0x46b04b(0x2be)](/<VARIABLE (\d+) ON USE: ([\+\-]\d+)>/i);const _0x4e2a2a=Number(RegExp['$1']),_0x2c7d7d=Number(RegExp['$2']),_0x37bcc8=$gameVariables[_0x46b04b(0x2da)](_0x4e2a2a);$gameVariables[_0x46b04b(0x373)](_0x4e2a2a,_0x37bcc8+_0x2c7d7d);}else _0x5e6dbb[_0x46b04b(0x18c)][_0x46b04b(0x369)]['call'](this),this[_0x46b04b(0x31c)]();}},VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x1ef)]=Game_Actor[_0x51ad78(0x1b5)][_0x51ad78(0x1e7)],Game_Actor[_0x51ad78(0x1b5)]['tradeItemWithParty']=function(_0x3f6f18,_0x51773f){const _0x8cc710=_0x51ad78;$gameTemp['_tradeItemWithParty']=!![];const _0x471711=VisuMZ[_0x8cc710(0x18c)][_0x8cc710(0x1ef)][_0x8cc710(0x253)](this,_0x3f6f18,_0x51773f);return $gameTemp[_0x8cc710(0x302)]=undefined,_0x471711;},VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x255)]=Game_Party[_0x51ad78(0x1b5)]['gainItem'],Game_Party[_0x51ad78(0x1b5)][_0x51ad78(0x231)]=function(_0x335fc4,_0x529caf,_0x5c0317){const _0x27375b=_0x51ad78;VisuMZ[_0x27375b(0x18c)][_0x27375b(0x255)][_0x27375b(0x253)](this,_0x335fc4,_0x529caf,_0x5c0317),this[_0x27375b(0x1cf)](_0x335fc4,_0x529caf);},Game_Party[_0x51ad78(0x1b5)][_0x51ad78(0x1cf)]=function(_0x386d09,_0x524717){const _0x3a1b49=_0x51ad78;if(!_0x386d09)return;if($gameTemp[_0x3a1b49(0x302)])return;const _0x1b80bf=_0x386d09[_0x3a1b49(0x300)];if(_0x524717>0x0){const _0x521b80=_0x1b80bf[_0x3a1b49(0x2be)](/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/gi);if(_0x521b80){if('xClUB'!==_0x3a1b49(0x2fb))for(const _0x4fb018 of _0x521b80){if(_0x3a1b49(0x316)===_0x3a1b49(0x38b))return _0x246702[_0x3a1b49(0x18c)]['Settings']['Window'][_0x3a1b49(0x2ba)]['call'](this);else{_0x4fb018['match'](/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/i);const _0x52db79=Number(RegExp['$1']),_0x524c12=Number(RegExp['$2'])*_0x524717,_0x55c2c1=$gameVariables[_0x3a1b49(0x2da)](_0x52db79);$gameVariables['setValue'](_0x52db79,_0x55c2c1+_0x524c12);}}else _0x3037b8+=_0x18dc84;}}else{if(_0x524717<0x0){const _0x1c297d=_0x1b80bf[_0x3a1b49(0x2be)](/<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/gi);if(_0x1c297d){if(_0x3a1b49(0x34e)===_0x3a1b49(0x34e))for(const _0x140183 of _0x1c297d){_0x140183[_0x3a1b49(0x2be)](/<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/i);const _0x415eff=Number(RegExp['$1']),_0x522130=Number(RegExp['$2'])*_0x524717,_0x43ebf5=$gameVariables[_0x3a1b49(0x2da)](_0x415eff);$gameVariables[_0x3a1b49(0x373)](_0x415eff,_0x43ebf5+_0x522130);}else _0x3ea688['QuestSystem']['Scene_Boot_onDatabaseLoaded'][_0x3a1b49(0x253)](this),this[_0x3a1b49(0x2e4)]();}}}const _0x1f884f=_0x1b80bf['match'](/<TRACK WITH VARIABLE (\d+)>/gi);if(_0x1f884f){if(_0x3a1b49(0x237)!==_0x3a1b49(0x352))for(const _0x51840b of _0x1f884f){if('mwbOV'===_0x3a1b49(0x25b))return _0x2ead0e[_0x3a1b49(0x2e8)]();else{_0x51840b['match'](/<TRACK WITH VARIABLE (\d+)>/i);const _0x43a265=Number(RegExp['$1']),_0x5ac705=$gameParty[_0x3a1b49(0x222)](_0x386d09);$gameVariables[_0x3a1b49(0x373)](_0x43a265,_0x5ac705);}}else{_0xacdc70[_0x3a1b49(0x306)](_0xe44fa1,_0x5a57c5);const _0x59fbdc=_0x314e39[_0x3a1b49(0x36f)],_0x578e8e=_0x3f4398['TargetIDs'],_0x2e7c84=_0x2b9db5[_0x3a1b49(0x262)];for(const _0x5e7f68 of _0x59fbdc){_0x1e1e17[_0x3a1b49(0x36c)](_0x5e7f68,_0x578e8e,_0x2e7c84);}_0x33ddbf[_0x3a1b49(0x376)]()&&_0x1e90d5[_0x3a1b49(0x238)][_0x3a1b49(0x30a)]();}}},VisuMZ[_0x51ad78(0x18c)]['Game_Map_requestRefresh']=Game_Map['prototype'][_0x51ad78(0x28f)],Game_Map['prototype']['requestRefresh']=function(){const _0x3887f8=_0x51ad78;VisuMZ[_0x3887f8(0x18c)]['Game_Map_requestRefresh'][_0x3887f8(0x253)](this);if(SceneManager[_0x3887f8(0x376)]()&&!this[_0x3887f8(0x1c0)]){if(_0x3887f8(0x2b4)===_0x3887f8(0x2b4))this['_isRefreshingQuestTrackerWindow']=!![];else{if(!this[_0x3887f8(0x2b9)]())return;if(!this['isQuestCommandVisible']())return;const _0x55a424=_0xcd48a3[_0x3887f8(0x2c3)],_0x2e8f8b=this[_0x3887f8(0x1dd)]();this['addCommand'](_0x55a424,'quest',_0x2e8f8b);}}},VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x383)]=Game_Map[_0x51ad78(0x1b5)][_0x51ad78(0x26f)],Game_Map[_0x51ad78(0x1b5)][_0x51ad78(0x26f)]=function(){const _0x127274=_0x51ad78;VisuMZ['QuestSystem'][_0x127274(0x383)][_0x127274(0x253)](this),SceneManager[_0x127274(0x376)]()&&this[_0x127274(0x1c0)]&&(SceneManager[_0x127274(0x238)]['refreshQuestTrackerWindow'](),this['_isRefreshingQuestTrackerWindow']=![]);},VisuMZ['QuestSystem'][_0x51ad78(0x308)]=Scene_Map[_0x51ad78(0x1b5)]['createSpriteset'],Scene_Map['prototype'][_0x51ad78(0x1f6)]=function(){const _0x2d797b=_0x51ad78;VisuMZ['QuestSystem'][_0x2d797b(0x308)]['call'](this),this[_0x2d797b(0x2d7)]();},Scene_Map['prototype']['createQuestTrackerWindow']=function(){const _0x45afaa=_0x51ad78;if(!SceneManager['isSceneMap']())return;const _0x45e474=this[_0x45afaa(0x236)](),_0x798a09=new Window_QuestTracker(_0x45e474);this[_0x45afaa(0x388)](_0x798a09),this[_0x45afaa(0x257)]=_0x798a09;},Scene_Map[_0x51ad78(0x1b5)][_0x51ad78(0x288)]=function(){const _0x31e214=_0x51ad78;return ConfigManager[_0x31e214(0x37e)];},Scene_Map['prototype'][_0x51ad78(0x236)]=function(){const _0x53731a=_0x51ad78;return VisuMZ['QuestSystem']['Settings'][_0x53731a(0x1da)][_0x53731a(0x2a8)][_0x53731a(0x253)](this);},Scene_Map[_0x51ad78(0x1b5)][_0x51ad78(0x30a)]=function(){const _0x5078eb=_0x51ad78;if(!this['_questTrackerWindow'])return;this[_0x5078eb(0x257)][_0x5078eb(0x26f)]();},Scene_Map[_0x51ad78(0x1b5)][_0x51ad78(0x358)]=function(_0xfa5045){const _0x634a9f=_0x51ad78;if(!this[_0x634a9f(0x257)])return;_0xfa5045=_0xfa5045[_0x634a9f(0x21d)]()[_0x634a9f(0x225)]();const _0x33a44c=$gameSystem[_0x634a9f(0x23b)](_0xfa5045);this['_questTrackerWindow'][_0x634a9f(0x28a)](_0x33a44c);},VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x27d)]=Scene_Menu['prototype'][_0x51ad78(0x342)],Scene_Menu['prototype']['createCommandWindow']=function(){const _0x425ee0=_0x51ad78;VisuMZ[_0x425ee0(0x18c)][_0x425ee0(0x27d)]['call'](this),this['_commandWindow']['setHandler'](_0x425ee0(0x23b),this[_0x425ee0(0x212)]['bind'](this));},Scene_Menu[_0x51ad78(0x1b5)][_0x51ad78(0x212)]=function(){const _0x40a11d=_0x51ad78;SceneManager[_0x40a11d(0x1bd)](Scene_Quest);},VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x268)]=Scene_Options[_0x51ad78(0x1b5)]['maxCommands'],Scene_Options['prototype'][_0x51ad78(0x304)]=function(){const _0x5aaadf=_0x51ad78;let _0x4abb79=VisuMZ[_0x5aaadf(0x18c)]['Scene_Options_maxCommands'][_0x5aaadf(0x253)](this);if(VisuMZ['QuestSystem'][_0x5aaadf(0x2aa)][_0x5aaadf(0x1cb)][_0x5aaadf(0x275)]){if('CkWLW'!==_0x5aaadf(0x2af)){_0x3fef4a=_0x10fb1f[_0x5aaadf(0x21d)]()['trim']();const _0x1601b9=this[_0x5aaadf(0x23b)](_0xdd71a);if(!_0x1601b9)return'';const _0x31c667=this[_0x5aaadf(0x1c3)]()[_0x5aaadf(0x274)];_0x31c667[_0x507264]=_0x1cd44a;}else{if(VisuMZ[_0x5aaadf(0x18c)][_0x5aaadf(0x2aa)]['Tracker'][_0x5aaadf(0x303)])_0x4abb79++;if(VisuMZ['QuestSystem']['Settings'][_0x5aaadf(0x1cb)]['AddPositionOption'])_0x4abb79++;}}return _0x4abb79;};function Scene_Quest(){this['initialize'](...arguments);}Scene_Quest['prototype']=Object[_0x51ad78(0x244)](Scene_MenuBase['prototype']),Scene_Quest[_0x51ad78(0x1b5)][_0x51ad78(0x382)]=Scene_Quest,Scene_Quest[_0x51ad78(0x1b5)][_0x51ad78(0x2f2)]=function(){const _0x47fb5a=_0x51ad78;Scene_MenuBase[_0x47fb5a(0x1b5)]['initialize'][_0x47fb5a(0x253)](this);},Scene_Quest[_0x51ad78(0x1b5)]['helpAreaHeight']=function(){return 0x0;},Scene_Quest['prototype'][_0x51ad78(0x32e)]=function(){const _0x3f219a=_0x51ad78;if(ConfigManager[_0x3f219a(0x2b1)]&&ConfigManager[_0x3f219a(0x37c)]!==undefined){if('CZNhz'!==_0x3f219a(0x1fc))return ConfigManager[_0x3f219a(0x37c)];else{_0x45f577=_0x513bf2[_0x3f219a(0x21d)]()[_0x3f219a(0x225)]();const _0x445e72=_0x108b19[_0x3f219a(0x23b)](_0x5b4434);if(!_0x445e72)return-0x1;_0x59d075[_0x3f219a(0x1a5)](_0x52a271);const _0x4aa3ca=_0x582fcb[_0x3f219a(0x1c3)]()[_0x3f219a(0x217)];return _0x4aa3ca[_0x329cb8]||0x0;}}else{if(ConfigManager['uiMenuStyle']===![])return![];else{if(_0x3f219a(0x26d)===_0x3f219a(0x1b7))_0x57c1bf[_0x3f219a(0x1c8)](_0xf39251,_0x11babd);else return Scene_MenuBase[_0x3f219a(0x1b5)][_0x3f219a(0x32e)][_0x3f219a(0x253)](this);}}},Scene_Quest[_0x51ad78(0x1b5)][_0x51ad78(0x204)]=function(){const _0x34f23a=_0x51ad78;return(Graphics['boxWidth']-0x230)['clamp'](0xf0,Math[_0x34f23a(0x17b)](Graphics['boxWidth']/0x2));},Scene_Quest[_0x51ad78(0x1b5)][_0x51ad78(0x244)]=function(){const _0x4b5f12=_0x51ad78;Scene_MenuBase['prototype'][_0x4b5f12(0x244)]['call'](this),this[_0x4b5f12(0x342)](),this[_0x4b5f12(0x297)](),this[_0x4b5f12(0x22a)](),this[_0x4b5f12(0x28c)]();},Scene_Quest[_0x51ad78(0x1b5)]['createCommandWindow']=function(){const _0x7e0380=_0x51ad78,_0x159921=this[_0x7e0380(0x1a4)](),_0x250264=new Window_QuestCommand(_0x159921);_0x250264[_0x7e0380(0x19f)](_0x7e0380(0x180),this[_0x7e0380(0x326)]['bind'](this)),_0x250264[_0x7e0380(0x19f)](_0x7e0380(0x36d),this[_0x7e0380(0x326)]['bind'](this)),_0x250264[_0x7e0380(0x19f)]('failed',this['onCommandOk']['bind'](this)),_0x250264[_0x7e0380(0x19f)](_0x7e0380(0x2f8),this[_0x7e0380(0x181)][_0x7e0380(0x1b1)](this)),this[_0x7e0380(0x2a3)](_0x250264),this[_0x7e0380(0x227)]=_0x250264,_0x250264[_0x7e0380(0x362)](VisuMZ[_0x7e0380(0x18c)][_0x7e0380(0x2aa)][_0x7e0380(0x1da)][_0x7e0380(0x2d9)]);},Scene_Quest[_0x51ad78(0x1b5)][_0x51ad78(0x1a4)]=function(){const _0x20b549=_0x51ad78;return VisuMZ[_0x20b549(0x18c)][_0x20b549(0x2aa)][_0x20b549(0x1da)][_0x20b549(0x2ba)][_0x20b549(0x253)](this);},Scene_Quest['prototype'][_0x51ad78(0x297)]=function(){const _0x799983=_0x51ad78,_0x15580f=this[_0x799983(0x242)](),_0xf98dbd=new Window_Base(_0x15580f);this[_0x799983(0x2a3)](_0xf98dbd),this[_0x799983(0x192)]=_0xf98dbd,_0xf98dbd['setBackgroundType'](VisuMZ[_0x799983(0x18c)][_0x799983(0x2aa)][_0x799983(0x1da)][_0x799983(0x281)]);},Scene_Quest[_0x51ad78(0x1b5)]['questLabelWindowRect']=function(){const _0x2481d6=_0x51ad78;return VisuMZ['QuestSystem'][_0x2481d6(0x2aa)][_0x2481d6(0x1da)][_0x2481d6(0x1e4)]['call'](this);},Scene_Quest['prototype'][_0x51ad78(0x22a)]=function(){const _0x35bca2=_0x51ad78,_0x333c92=this[_0x35bca2(0x343)](),_0x9d6b9a=new Window_QuestLog(_0x333c92);this['addWindow'](_0x9d6b9a),this[_0x35bca2(0x26e)]=_0x9d6b9a,_0x9d6b9a[_0x35bca2(0x362)](VisuMZ[_0x35bca2(0x18c)]['Settings'][_0x35bca2(0x1da)][_0x35bca2(0x1ca)]);},Scene_Quest[_0x51ad78(0x1b5)]['questLogWindowRect']=function(){const _0x495965=_0x51ad78;return VisuMZ[_0x495965(0x18c)][_0x495965(0x2aa)][_0x495965(0x1da)]['LogWindow_Rect'][_0x495965(0x253)](this);},Scene_Quest[_0x51ad78(0x1b5)][_0x51ad78(0x28c)]=function(){const _0x18f993=_0x51ad78,_0x2ba871=this[_0x18f993(0x18f)](),_0x135f46=new Window_QuestList(_0x2ba871);_0x135f46[_0x18f993(0x19f)](_0x18f993(0x30f),this[_0x18f993(0x2d1)][_0x18f993(0x1b1)](this)),_0x135f46[_0x18f993(0x19f)](_0x18f993(0x23b),this['onListQuest']['bind'](this)),_0x135f46['setHandler'](_0x18f993(0x2f8),this[_0x18f993(0x289)][_0x18f993(0x1b1)](this)),this['addWindow'](_0x135f46),this[_0x18f993(0x33b)]=_0x135f46,_0x135f46[_0x18f993(0x362)](VisuMZ[_0x18f993(0x18c)]['Settings'][_0x18f993(0x1da)]['ListWindow_BgType']),this[_0x18f993(0x227)][_0x18f993(0x384)](this[_0x18f993(0x33b)]),this['_listWindow'][_0x18f993(0x25a)](this[_0x18f993(0x192)]),this[_0x18f993(0x33b)][_0x18f993(0x392)](this[_0x18f993(0x26e)]);},Scene_Quest['prototype'][_0x51ad78(0x18f)]=function(){const _0x2048dc=_0x51ad78;return VisuMZ['QuestSystem'][_0x2048dc(0x2aa)]['Window']['ListWindow_Rect']['call'](this);},Scene_Quest[_0x51ad78(0x1b5)]['onCommandOk']=function(){const _0x21aafe=_0x51ad78;this[_0x21aafe(0x33b)]['activate'](),this[_0x21aafe(0x33b)][_0x21aafe(0x195)](0x0);},Scene_Quest['prototype']['onListCategory']=function(){const _0x43cef3=_0x51ad78;this[_0x43cef3(0x33b)][_0x43cef3(0x32f)](),this[_0x43cef3(0x33b)]['activate']();},Scene_Quest[_0x51ad78(0x1b5)][_0x51ad78(0x387)]=function(){const _0x3307d2=_0x51ad78,_0x34325f=this[_0x3307d2(0x33b)][_0x3307d2(0x1f7)](),_0x158bd5=_0x34325f['Key'][_0x3307d2(0x21d)]()[_0x3307d2(0x225)]();$gameSystem['setTrackedQuest'](_0x158bd5,!![]),this[_0x3307d2(0x33b)][_0x3307d2(0x26f)](),this[_0x3307d2(0x33b)][_0x3307d2(0x2bf)]();},Scene_Quest['prototype'][_0x51ad78(0x289)]=function(){const _0x46a60f=_0x51ad78;this[_0x46a60f(0x33b)][_0x46a60f(0x17f)](),this[_0x46a60f(0x227)][_0x46a60f(0x2bf)]();},Scene_Quest[_0x51ad78(0x1b5)][_0x51ad78(0x315)]=function(){const _0x5a984d=_0x51ad78;return TextManager[_0x5a984d(0x330)];},Scene_Quest[_0x51ad78(0x1b5)][_0x51ad78(0x29b)]=function(){const _0x2600ed=_0x51ad78;if(this[_0x2600ed(0x33b)]&&this[_0x2600ed(0x33b)][_0x2600ed(0x35a)]){if(this['_listWindow'][_0x2600ed(0x1f7)]()){if(_0x2600ed(0x265)!==_0x2600ed(0x36b))return this[_0x2600ed(0x33b)][_0x2600ed(0x313)]()?TextManager['questButtonAssistActive']:'';else _0x58c4fd[_0x2600ed(0x18c)][_0x2600ed(0x334)]['call'](this,_0x11f393),this[_0x2600ed(0x1c2)](_0x197f85);}else return this[_0x2600ed(0x33b)][_0x2600ed(0x1ad)]()?TextManager[_0x2600ed(0x199)]:TextManager['questButtonAssistExpand'];}return Scene_MenuBase[_0x2600ed(0x1b5)][_0x2600ed(0x29b)]['call'](this);},Scene_Quest[_0x51ad78(0x1b5)][_0x51ad78(0x1a3)]=function(){const _0x38f91=_0x51ad78;Scene_MenuBase['prototype'][_0x38f91(0x1a3)][_0x38f91(0x253)](this),this[_0x38f91(0x293)](this[_0x38f91(0x38f)]()),this[_0x38f91(0x18e)]();},Scene_Quest[_0x51ad78(0x1b5)][_0x51ad78(0x38f)]=function(){const _0x54fb9=_0x51ad78;return VisuMZ['QuestSystem'][_0x54fb9(0x2aa)][_0x54fb9(0x2ad)][_0x54fb9(0x2d0)];},Scene_Quest[_0x51ad78(0x1b5)][_0x51ad78(0x18e)]=function(){const _0x5cec32=_0x51ad78,_0x132a36={'BgFilename1':VisuMZ[_0x5cec32(0x18c)][_0x5cec32(0x2aa)][_0x5cec32(0x2ad)][_0x5cec32(0x1af)],'BgFilename2':VisuMZ[_0x5cec32(0x18c)][_0x5cec32(0x2aa)]['BgSettings']['BgFilename2']};if(_0x132a36&&(_0x132a36['BgFilename1']!==''||_0x132a36[_0x5cec32(0x361)]!=='')){if(_0x5cec32(0x1d4)==='xVAIM'){if(_0x2e6312[_0x5cec32(0x346)])return;_0x54b47b[_0x5cec32(0x346)]=!![],_0x2043e7[_0x5cec32(0x1b5)]['refresh'][_0x5cec32(0x253)](this),this[_0x5cec32(0x362)](this['_quest']?_0x450463[_0x5cec32(0x17d)]:0x2),_0x2b6abf[_0x5cec32(0x346)]=![];}else this['_backSprite1']=new Sprite(ImageManager['loadTitle1'](_0x132a36[_0x5cec32(0x1af)])),this[_0x5cec32(0x215)]=new Sprite(ImageManager[_0x5cec32(0x256)](_0x132a36[_0x5cec32(0x361)])),this[_0x5cec32(0x388)](this[_0x5cec32(0x1e2)]),this[_0x5cec32(0x388)](this[_0x5cec32(0x215)]),this[_0x5cec32(0x1e2)][_0x5cec32(0x2c4)][_0x5cec32(0x336)](this[_0x5cec32(0x1e3)][_0x5cec32(0x1b1)](this,this[_0x5cec32(0x1e2)])),this[_0x5cec32(0x215)][_0x5cec32(0x2c4)][_0x5cec32(0x336)](this[_0x5cec32(0x1e3)][_0x5cec32(0x1b1)](this,this[_0x5cec32(0x215)]));}},Scene_Quest[_0x51ad78(0x1b5)][_0x51ad78(0x1e3)]=function(_0x4f134a){const _0x455280=_0x51ad78;this[_0x455280(0x250)](_0x4f134a),this[_0x455280(0x1c4)](_0x4f134a);},VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x2b2)]=Window_MenuCommand[_0x51ad78(0x1b5)][_0x51ad78(0x2bd)],Window_MenuCommand[_0x51ad78(0x1b5)][_0x51ad78(0x2bd)]=function(){const _0x36b63b=_0x51ad78;VisuMZ[_0x36b63b(0x18c)]['Window_MenuCommand_addOriginalCommands'][_0x36b63b(0x253)](this),this[_0x36b63b(0x2f0)]();},Window_MenuCommand[_0x51ad78(0x1b5)][_0x51ad78(0x2f0)]=function(){const _0x534910=_0x51ad78;if(!this['addQuestCommandAutomatically']())return;if(!this['isQuestCommandVisible']())return;const _0x125ec7=TextManager[_0x534910(0x2c3)],_0x35252c=this['isQuestCommandEnabled']();this[_0x534910(0x1a9)](_0x125ec7,_0x534910(0x23b),_0x35252c);},Window_MenuCommand[_0x51ad78(0x1b5)][_0x51ad78(0x2b9)]=function(){const _0x409e32=_0x51ad78;return Imported[_0x409e32(0x2f1)]?![]:!![];},Window_MenuCommand['prototype'][_0x51ad78(0x2a6)]=function(){const _0x12f5a4=_0x51ad78;return $gameSystem[_0x12f5a4(0x2e8)]();},Window_MenuCommand[_0x51ad78(0x1b5)][_0x51ad78(0x1dd)]=function(){const _0x54ea77=_0x51ad78;return $gameSystem[_0x54ea77(0x30c)]();},VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x369)]=Window_Options['prototype'][_0x51ad78(0x21f)],Window_Options['prototype'][_0x51ad78(0x21f)]=function(){const _0x33102b=_0x51ad78;VisuMZ['QuestSystem'][_0x33102b(0x369)]['call'](this),this[_0x33102b(0x31c)]();},Window_Options[_0x51ad78(0x1b5)][_0x51ad78(0x31c)]=function(){const _0x53bd6f=_0x51ad78;if(VisuMZ['QuestSystem'][_0x53bd6f(0x2aa)][_0x53bd6f(0x1cb)]['AddShowOption']){if(_0x53bd6f(0x17a)==='Qrauq')return _0x3d7bd9['QuestSystem'][_0x53bd6f(0x2aa)][_0x53bd6f(0x2ad)][_0x53bd6f(0x2d0)];else this['addQuestSystemquestTrackerShowCommand']();}if(VisuMZ['QuestSystem']['Settings'][_0x53bd6f(0x1cb)][_0x53bd6f(0x2de)]){if(_0x53bd6f(0x1eb)===_0x53bd6f(0x20c)){_0x32deb7=_0x10dfac[_0x53bd6f(0x21d)]()['trim']();const _0x281913=_0x247bbb[_0x53bd6f(0x23b)](_0x1bae4f);if(!_0x281913)return-0x1;_0x1a756f[_0x53bd6f(0x194)](_0x24b10b);const _0xa9e771=_0x383023['questData']()[_0x53bd6f(0x25c)]||{};if(!_0xa9e771[_0x23a824])return 0x0;return _0xa9e771[_0x571e71]['length'];}else this[_0x53bd6f(0x208)]();}},Window_Options['prototype'][_0x51ad78(0x1b6)]=function(){const _0x316829=_0x51ad78,_0xc5fe6=TextManager[_0x316829(0x213)],_0x2350af=_0x316829(0x213);this[_0x316829(0x1a9)](_0xc5fe6,_0x2350af);},Window_Options[_0x51ad78(0x1b5)][_0x51ad78(0x208)]=function(){const _0x38ec1c=_0x51ad78,_0x27c81f=TextManager[_0x38ec1c(0x37e)],_0x17bbd4=_0x38ec1c(0x37e);this[_0x38ec1c(0x1a9)](_0x27c81f,_0x17bbd4);},VisuMZ[_0x51ad78(0x18c)]['Window_Options_statusText']=Window_Options[_0x51ad78(0x1b5)]['statusText'],Window_Options['prototype'][_0x51ad78(0x2a2)]=function(_0x488553){const _0x4f9621=_0x51ad78,_0x559587=this[_0x4f9621(0x380)](_0x488553);if(_0x559587===_0x4f9621(0x37e)){const _0x41d2d6=this[_0x4f9621(0x1fb)](_0x559587);return _0x41d2d6?TextManager['questTrackerPosOn']:TextManager['questTrackerPosOff'];}return VisuMZ[_0x4f9621(0x18c)]['Window_Options_statusText'][_0x4f9621(0x253)](this,_0x488553);};function Window_QuestCommand(){this['initialize'](...arguments);}Window_QuestCommand[_0x51ad78(0x1b5)]=Object[_0x51ad78(0x244)](Window_Command[_0x51ad78(0x1b5)]),Window_QuestCommand[_0x51ad78(0x1b5)][_0x51ad78(0x382)]=Window_QuestCommand,Window_QuestCommand[_0x51ad78(0x1b5)]['initialize']=function(_0x3ee657){const _0x1b8715=_0x51ad78;Window_Command[_0x1b8715(0x1b5)][_0x1b8715(0x2f2)][_0x1b8715(0x253)](this,_0x3ee657),this[_0x1b8715(0x233)](_0x3ee657);},Window_QuestCommand[_0x51ad78(0x1b5)]['createCommandNameWindow']=function(_0x52621f){const _0x448660=_0x51ad78,_0x3a7c54=new Rectangle(0x0,0x0,_0x52621f[_0x448660(0x183)],_0x52621f[_0x448660(0x1a0)]);this[_0x448660(0x2cb)]=new Window_Base(_0x3a7c54),this['_commandNameWindow'][_0x448660(0x393)]=0x0,this[_0x448660(0x388)](this['_commandNameWindow']),this[_0x448660(0x287)]();},Window_QuestCommand[_0x51ad78(0x1b5)][_0x51ad78(0x305)]=function(){const _0x48585b=_0x51ad78;Window_Command[_0x48585b(0x1b5)]['callUpdateHelp']['call'](this);if(this[_0x48585b(0x2cb)])this[_0x48585b(0x287)]();if(this[_0x48585b(0x33b)])this[_0x48585b(0x33b)][_0x48585b(0x17c)](this[_0x48585b(0x374)]());},Window_QuestCommand['prototype'][_0x51ad78(0x287)]=function(){const _0x53b488=_0x51ad78,_0x2fa9ec=this[_0x53b488(0x2cb)];_0x2fa9ec[_0x53b488(0x1ff)]['clear']();const _0x568854=this['commandStyleCheck'](this['index']());if(_0x568854==='icon'){const _0x4a1860=this[_0x53b488(0x228)](this['index']());let _0x5b38d6=this[_0x53b488(0x371)](this['index']());_0x5b38d6=_0x5b38d6[_0x53b488(0x21c)](/\\I\[(\d+)\]/gi,''),_0x2fa9ec[_0x53b488(0x312)](),this[_0x53b488(0x221)](_0x5b38d6,_0x4a1860),this[_0x53b488(0x22c)](_0x5b38d6,_0x4a1860),this[_0x53b488(0x2ce)](_0x5b38d6,_0x4a1860);}},Window_QuestCommand[_0x51ad78(0x1b5)]['commandNameWindowDrawBackground']=function(_0x2cd363,_0x3c0a0e){},Window_QuestCommand[_0x51ad78(0x1b5)][_0x51ad78(0x22c)]=function(_0x53874d,_0x1cbf69){const _0x23992d=_0x51ad78,_0x439d07=this['_commandNameWindow'];_0x439d07[_0x23992d(0x1a6)](_0x53874d,0x0,_0x1cbf69['y'],_0x439d07[_0x23992d(0x24c)],'center');},Window_QuestCommand['prototype'][_0x51ad78(0x2ce)]=function(_0x28f3a7,_0xc86f20){const _0x474821=_0x51ad78,_0x5ca6b1=this['_commandNameWindow'],_0x1fcc66=$gameSystem[_0x474821(0x339)](),_0x3752b9=_0xc86f20['x']+Math[_0x474821(0x17b)](_0xc86f20[_0x474821(0x183)]/0x2)+_0x1fcc66;_0x5ca6b1['x']=_0x5ca6b1[_0x474821(0x183)]/-0x2+_0x3752b9,_0x5ca6b1['y']=Math[_0x474821(0x17b)](_0xc86f20[_0x474821(0x1a0)]/0x2);},Window_QuestCommand[_0x51ad78(0x1b5)][_0x51ad78(0x206)]=function(){const _0x544dc1=_0x51ad78;this[_0x544dc1(0x19b)](),this[_0x544dc1(0x1e8)](),this['addFailedQuestsCommand']();},Window_QuestCommand[_0x51ad78(0x1b5)][_0x51ad78(0x19b)]=function(){const _0x1207ef=_0x51ad78,_0x494f02=_0x1207ef(0x180),_0x376795=ImageManager[_0x1207ef(0x211)];let _0x3e5b58=TextManager[_0x1207ef(0x23d)];if(_0x376795>0x0&&this[_0x1207ef(0x2dc)]()!==_0x1207ef(0x29c)){if(_0x1207ef(0x269)!==_0x1207ef(0x269)){const _0xfeef96=this['commandSymbol'](_0x4e373d);if(_0xfeef96==='questTrackerPosition'){const _0x27ef0b=this[_0x1207ef(0x1fb)](_0xfeef96);return _0x27ef0b?_0x2ee3f6[_0x1207ef(0x1de)]:_0x53f2b6['questTrackerPosOff'];}return _0x2f51c8[_0x1207ef(0x18c)][_0x1207ef(0x354)][_0x1207ef(0x253)](this,_0x38ce46);}else _0x3e5b58=_0x1207ef(0x2e0)[_0x1207ef(0x333)](_0x376795,_0x3e5b58);}const _0x21ae12=this[_0x1207ef(0x350)]();this[_0x1207ef(0x1a9)](_0x3e5b58,_0x494f02,_0x21ae12);},Window_QuestCommand['prototype'][_0x51ad78(0x350)]=function(){const _0x34b5ea=_0x51ad78;return $gameSystem[_0x34b5ea(0x187)]()[_0x34b5ea(0x1ab)]>0x0;},Window_QuestCommand[_0x51ad78(0x1b5)]['addCompletedQuestsCommand']=function(){const _0x4fd868=_0x51ad78,_0x10d2ac=_0x4fd868(0x36d),_0x495d4e=ImageManager[_0x4fd868(0x28e)];let _0x28df37=TextManager[_0x4fd868(0x25d)];_0x495d4e>0x0&&this[_0x4fd868(0x2dc)]()!==_0x4fd868(0x29c)&&(_0x28df37=_0x4fd868(0x2e0)[_0x4fd868(0x333)](_0x495d4e,_0x28df37));const _0x5e4ccc=this[_0x4fd868(0x35e)]();this[_0x4fd868(0x1a9)](_0x28df37,_0x10d2ac,_0x5e4ccc);},Window_QuestCommand['prototype'][_0x51ad78(0x35e)]=function(){const _0x1dcc46=_0x51ad78;return $gameSystem[_0x1dcc46(0x1d3)]()['length']>0x0;},Window_QuestCommand['prototype'][_0x51ad78(0x198)]=function(){const _0x29dc37=_0x51ad78;if(!this[_0x29dc37(0x364)]())return;const _0x308aca=_0x29dc37(0x1e6),_0x588fb3=ImageManager[_0x29dc37(0x2bc)];let _0x34f4f6=TextManager[_0x29dc37(0x310)];if(_0x588fb3>0x0&&this[_0x29dc37(0x2dc)]()!==_0x29dc37(0x29c)){if(_0x29dc37(0x33d)===_0x29dc37(0x33d))_0x34f4f6='\x5cI[%1]%2'[_0x29dc37(0x333)](_0x588fb3,_0x34f4f6);else{const _0x32d143=this['currentQuest'](),_0x1186a7=this[_0x29dc37(0x26e)];_0x1186a7[_0x29dc37(0x28a)](_0x32d143);}}const _0x5f4c7b=this['isFailedQuestsEnabled']();this[_0x29dc37(0x1a9)](_0x34f4f6,_0x308aca,_0x5f4c7b);},Window_QuestCommand['prototype'][_0x51ad78(0x364)]=function(){const _0x151406=_0x51ad78;return VisuMZ['QuestSystem'][_0x151406(0x2aa)][_0x151406(0x1da)][_0x151406(0x1b9)];},Window_QuestCommand[_0x51ad78(0x1b5)]['isFailedQuestsEnabled']=function(){const _0x1fdc9d=_0x51ad78;return $gameSystem[_0x1fdc9d(0x214)]()['length']>0x0;},Window_QuestCommand[_0x51ad78(0x1b5)][_0x51ad78(0x1bc)]=function(){return this['isFailedQuestsVisible']()?0x3:0x2;},Window_QuestCommand[_0x51ad78(0x1b5)][_0x51ad78(0x368)]=function(){const _0x581d4b=_0x51ad78;return VisuMZ[_0x581d4b(0x18c)]['Settings'][_0x581d4b(0x1da)][_0x581d4b(0x2c8)];},Window_QuestCommand[_0x51ad78(0x1b5)][_0x51ad78(0x1bf)]=function(_0x4c4e0b){const _0x2baa1b=_0x51ad78,_0x54fa8a=this['commandStyleCheck'](_0x4c4e0b);if(_0x54fa8a===_0x2baa1b(0x20f))_0x2baa1b(0x2ed)!==_0x2baa1b(0x2ed)?_0x1c28de=_0xb64b74[_0x2baa1b(0x21c)](/[\n\r]+/g,'\x1bWrapBreak[0]'):this[_0x2baa1b(0x294)](_0x4c4e0b);else _0x54fa8a===_0x2baa1b(0x2a0)?this['drawItemStyleIcon'](_0x4c4e0b):Window_HorzCommand[_0x2baa1b(0x1b5)][_0x2baa1b(0x1bf)]['call'](this,_0x4c4e0b);},Window_QuestCommand[_0x51ad78(0x1b5)]['commandStyle']=function(){const _0x50d747=_0x51ad78;return VisuMZ[_0x50d747(0x18c)][_0x50d747(0x2aa)]['Window']['CmdStyle'];},Window_QuestCommand[_0x51ad78(0x1b5)]['commandStyleCheck']=function(_0x266bfe){const _0x410545=_0x51ad78;if(_0x266bfe<0x0)return _0x410545(0x29c);const _0x1e96c4=this['commandStyle']();if(_0x1e96c4!==_0x410545(0x24b)){if(_0x410545(0x34d)!==_0x410545(0x34d))_0x34d79a[_0x410545(0x37a)]('pagedown')&&this[_0x410545(0x29e)](_0x1a0896[_0x410545(0x27e)]),_0x154b58['isPressed']('pageup')&&this[_0x410545(0x30d)](_0x242e5b[_0x410545(0x27e)]);else return _0x1e96c4;}else{if(this['maxItems']()>0x0){const _0x39e7b2=this[_0x410545(0x371)](_0x266bfe);if(_0x39e7b2[_0x410545(0x2be)](/\\I\[(\d+)\]/i)){if(_0x410545(0x1f9)===_0x410545(0x2ea)){const _0x1fb2ad=this[_0x410545(0x228)](_0x3c6484),_0x39e1ba=this[_0x410545(0x371)](_0x4aaa1d),_0x11de9e=this[_0x410545(0x1b8)](_0x39e1ba)[_0x410545(0x183)];this[_0x410545(0x2c2)](this[_0x410545(0x26a)](_0x2dc88e));const _0x295086=this['itemTextAlign']();if(_0x295086==='right')this[_0x410545(0x328)](_0x39e1ba,_0x1fb2ad['x']+_0x1fb2ad[_0x410545(0x183)]-_0x11de9e,_0x1fb2ad['y'],_0x11de9e);else{if(_0x295086==='center'){const _0x583ace=_0x1fb2ad['x']+_0x1c1fc5['floor']((_0x1fb2ad['width']-_0x11de9e)/0x2);this[_0x410545(0x328)](_0x39e1ba,_0x583ace,_0x1fb2ad['y'],_0x11de9e);}else this[_0x410545(0x328)](_0x39e1ba,_0x1fb2ad['x'],_0x1fb2ad['y'],_0x11de9e);}}else{const _0x3f0c17=this['itemLineRect'](_0x266bfe),_0x2bdc09=this[_0x410545(0x1b8)](_0x39e7b2)[_0x410545(0x183)];if(_0x2bdc09<=_0x3f0c17[_0x410545(0x183)])return _0x410545(0x20f);else{if(_0x410545(0x272)!=='sPjhA')return _0x410545(0x2a0);else this[_0x410545(0x2e5)](_0x5a68e7,_0x410545(0x1e6));}}}}}return _0x410545(0x29c);},Window_QuestCommand[_0x51ad78(0x1b5)][_0x51ad78(0x294)]=function(_0x388c43){const _0x42f555=_0x51ad78,_0x492616=this[_0x42f555(0x228)](_0x388c43),_0x233abc=this[_0x42f555(0x371)](_0x388c43),_0xda11ae=this[_0x42f555(0x1b8)](_0x233abc)['width'];this[_0x42f555(0x2c2)](this[_0x42f555(0x26a)](_0x388c43));const _0x2bed9f=this[_0x42f555(0x368)]();if(_0x2bed9f==='right'){if(_0x42f555(0x1ae)!=='WsQDB')this['drawTextEx'](_0x233abc,_0x492616['x']+_0x492616[_0x42f555(0x183)]-_0xda11ae,_0x492616['y'],_0xda11ae);else{if(!this[_0x42f555(0x257)])return;_0x3b74a7=_0x48ae04['toUpperCase']()[_0x42f555(0x225)]();const _0x24f57d=_0x21e774[_0x42f555(0x23b)](_0x408e2d);this[_0x42f555(0x257)]['setQuest'](_0x24f57d);}}else{if(_0x2bed9f===_0x42f555(0x264)){if(_0x42f555(0x182)==='OZGUG'){const _0x2f2719=_0x492616['x']+Math[_0x42f555(0x17b)]((_0x492616[_0x42f555(0x183)]-_0xda11ae)/0x2);this['drawTextEx'](_0x233abc,_0x2f2719,_0x492616['y'],_0xda11ae);}else _0x1786a9[_0x42f555(0x238)][_0x42f555(0x30a)]();}else{if(_0x42f555(0x1b4)!==_0x42f555(0x2b8))this['drawTextEx'](_0x233abc,_0x492616['x'],_0x492616['y'],_0xda11ae);else{this['commandName'](_0x389b39)[_0x42f555(0x2be)](/\\I\[(\d+)\]/i);const _0x3d5282=_0x1c6c11(_0x3f9eb6['$1'])||0x0,_0x3d0dc1=this['itemLineRect'](_0x1de93d),_0x2b64ec=_0x3d0dc1['x']+_0x22cd09[_0x42f555(0x17b)]((_0x3d0dc1[_0x42f555(0x183)]-_0x80a5d1[_0x42f555(0x29f)])/0x2),_0x443326=_0x3d0dc1['y']+(_0x3d0dc1[_0x42f555(0x1a0)]-_0x13c272[_0x42f555(0x193)])/0x2;this[_0x42f555(0x355)](_0x3d5282,_0x2b64ec,_0x443326);}}}},Window_QuestCommand[_0x51ad78(0x1b5)][_0x51ad78(0x260)]=function(_0x550f59){const _0x427b00=_0x51ad78;this[_0x427b00(0x371)](_0x550f59)[_0x427b00(0x2be)](/\\I\[(\d+)\]/i);const _0x5981b9=Number(RegExp['$1'])||0x0,_0x3d32a3=this[_0x427b00(0x228)](_0x550f59),_0x144e51=_0x3d32a3['x']+Math['floor']((_0x3d32a3[_0x427b00(0x183)]-ImageManager[_0x427b00(0x29f)])/0x2),_0x3b25fe=_0x3d32a3['y']+(_0x3d32a3[_0x427b00(0x1a0)]-ImageManager['iconHeight'])/0x2;this[_0x427b00(0x355)](_0x5981b9,_0x144e51,_0x3b25fe);},Window_QuestCommand[_0x51ad78(0x1b5)][_0x51ad78(0x384)]=function(_0x167d24){const _0x36e650=_0x51ad78;this[_0x36e650(0x33b)]=_0x167d24,this[_0x36e650(0x305)]();};function Window_QuestList(){const _0x4762bf=_0x51ad78;this[_0x4762bf(0x2f2)](...arguments);}Window_QuestList[_0x51ad78(0x285)]=VisuMZ[_0x51ad78(0x18c)]['Settings'][_0x51ad78(0x241)],Window_QuestList[_0x51ad78(0x1b5)]=Object['create'](Window_Command['prototype']),Window_QuestList[_0x51ad78(0x1b5)][_0x51ad78(0x382)]=Window_QuestList,Window_QuestList[_0x51ad78(0x1b5)]['initialize']=function(_0x32cccd){const _0x17ff85=_0x51ad78;this[_0x17ff85(0x1c9)](),Window_Command[_0x17ff85(0x1b5)][_0x17ff85(0x2f2)]['call'](this,_0x32cccd),this[_0x17ff85(0x233)](_0x32cccd),this[_0x17ff85(0x27a)](),this['deselect']();},Window_QuestList['prototype'][_0x51ad78(0x1c9)]=function(){const _0x73c517=_0x51ad78;this[_0x73c517(0x31f)]={};for(const _0x136099 of VisuMZ[_0x73c517(0x18c)][_0x73c517(0x2aa)][_0x73c517(0x241)]){this['_categoryStatus'][_0x136099[_0x73c517(0x319)]]=!![];}this[_0x73c517(0x1d0)]=_0x73c517(0x180);},Window_QuestList['prototype'][_0x51ad78(0x17c)]=function(_0x161d97){const _0x283979=_0x51ad78;if(this['_categoryFilter']===_0x161d97)return;this[_0x283979(0x1d0)]=_0x161d97,this[_0x283979(0x26f)]();},Window_QuestList[_0x51ad78(0x1b5)][_0x51ad78(0x32f)]=function(){const _0x2cbb30=_0x51ad78,_0xc26d5a=this[_0x2cbb30(0x21b)]();this[_0x2cbb30(0x31f)][_0xc26d5a['CategoryName']]=!this['_categoryStatus'][_0xc26d5a[_0x2cbb30(0x319)]],this[_0x2cbb30(0x26f)](),this[_0x2cbb30(0x305)]();},Window_QuestList[_0x51ad78(0x1b5)][_0x51ad78(0x1ad)]=function(){const _0x1c3962=_0x51ad78,_0x419595=this[_0x1c3962(0x21b)]();return _0x419595&&this[_0x1c3962(0x31f)][_0x419595[_0x1c3962(0x319)]];},Window_QuestList[_0x51ad78(0x1b5)]['createCommandNameWindow']=function(_0x1134e7){const _0x10d6d4=_0x51ad78,_0x9e68e7=new Rectangle(0x0,0x0,_0x1134e7[_0x10d6d4(0x183)],_0x1134e7[_0x10d6d4(0x1a0)]);this['_commandNameWindow']=new Window_Base(_0x9e68e7),this[_0x10d6d4(0x2cb)][_0x10d6d4(0x393)]=0x0,this[_0x10d6d4(0x388)](this['_commandNameWindow']),this[_0x10d6d4(0x287)]();},Window_QuestList[_0x51ad78(0x1b5)]['callUpdateHelp']=function(){const _0x37970c=_0x51ad78;Window_Command[_0x37970c(0x1b5)][_0x37970c(0x305)]['call'](this);if(this[_0x37970c(0x2cb)])this[_0x37970c(0x287)]();if(this['_labelWindow'])this[_0x37970c(0x261)]();if(this[_0x37970c(0x26e)])this[_0x37970c(0x2d8)]();},Window_QuestList[_0x51ad78(0x1b5)][_0x51ad78(0x287)]=function(){const _0x2af9be=_0x51ad78,_0x280ec0=this[_0x2af9be(0x2cb)];_0x280ec0[_0x2af9be(0x1ff)]['clear']();const _0x5aa501=this[_0x2af9be(0x1b0)](this['index']());if(_0x5aa501==='icon'){const _0x317412=this[_0x2af9be(0x228)](this['index']());let _0x4644c5=this['commandName'](this[_0x2af9be(0x197)]());_0x4644c5=_0x4644c5['replace'](/\\I\[(\d+)\]/gi,''),_0x280ec0[_0x2af9be(0x312)](),this['commandNameWindowDrawBackground'](_0x4644c5,_0x317412),this[_0x2af9be(0x22c)](_0x4644c5,_0x317412),this[_0x2af9be(0x2ce)](_0x4644c5,_0x317412);}},Window_QuestList[_0x51ad78(0x1b5)][_0x51ad78(0x221)]=function(_0x4dd8e3,_0x22511c){},Window_QuestList['prototype'][_0x51ad78(0x22c)]=function(_0x304a35,_0x564254){const _0x1448c9=_0x51ad78,_0x528b2f=this[_0x1448c9(0x2cb)];_0x528b2f[_0x1448c9(0x1a6)](_0x304a35,0x0,_0x564254['y'],_0x528b2f[_0x1448c9(0x24c)],_0x1448c9(0x264));},Window_QuestList[_0x51ad78(0x1b5)][_0x51ad78(0x2ce)]=function(_0x45c6ae,_0x4a1975){const _0x5de450=_0x51ad78,_0x471c59=this[_0x5de450(0x2cb)],_0x782ab6=$gameSystem[_0x5de450(0x339)](),_0x2367d4=_0x4a1975['x']+Math[_0x5de450(0x17b)](_0x4a1975[_0x5de450(0x183)]/0x2)+_0x782ab6;_0x471c59['x']=_0x471c59[_0x5de450(0x183)]/-0x2+_0x2367d4,_0x471c59['y']=Math[_0x5de450(0x17b)](_0x4a1975[_0x5de450(0x1a0)]/0x2);},Window_QuestList[_0x51ad78(0x1b5)]['makeCommandList']=function(){const _0x16614e=_0x51ad78;for(const _0x4d470f of Window_QuestList['categoryList']){if(!_0x4d470f)continue;if(!this[_0x16614e(0x31d)](_0x4d470f))continue;this[_0x16614e(0x20d)](_0x4d470f),this['makeQuestList'](_0x4d470f);}if(this[_0x16614e(0x26c)][_0x16614e(0x1ab)]<=0x0){if(_0x16614e(0x1d5)!=='coqwk')return _0x1a3fd4[_0x16614e(0x1b5)][_0x16614e(0x313)]['call'](this);else this[_0x16614e(0x23e)]();}},Window_QuestList[_0x51ad78(0x1b5)]['addNoQuestsListedCommand']=function(){const _0x15fdcf=_0x51ad78;this['addCommand'](TextManager[_0x15fdcf(0x36a)],'cancel',![]);},Window_QuestList[_0x51ad78(0x1b5)][_0x51ad78(0x31d)]=function(_0x180791){const _0x5b4670=_0x51ad78;for(const _0x26d131 of _0x180791[_0x5b4670(0x329)]){if(!_0x26d131)continue;switch(this[_0x5b4670(0x1d0)]){case _0x5b4670(0x180):if($gameSystem[_0x5b4670(0x34b)](_0x26d131[_0x5b4670(0x324)]))return!![];break;case'completed':if($gameSystem[_0x5b4670(0x2f6)](_0x26d131[_0x5b4670(0x324)]))return!![];break;case'failed':if($gameSystem[_0x5b4670(0x367)](_0x26d131['Key']))return!![];break;}}return![];},Window_QuestList[_0x51ad78(0x1b5)][_0x51ad78(0x20d)]=function(_0x47133d){const _0x4fcaa9=_0x51ad78,_0xebd7bb=this['isCategoryOpen'](_0x47133d)?TextManager[_0x4fcaa9(0x33f)]:TextManager[_0x4fcaa9(0x2b7)],_0x2649ff=this[_0x4fcaa9(0x291)](_0x47133d)[_0x4fcaa9(0x1ab)],_0x322838=_0xebd7bb[_0x4fcaa9(0x333)](_0x47133d['CategoryName'],_0x2649ff);this['addCommand'](_0x322838,_0x4fcaa9(0x30f),!![],_0x47133d);},Window_QuestList[_0x51ad78(0x1b5)][_0x51ad78(0x291)]=function(_0xac535){const _0x510ebc=_0x51ad78;switch(this[_0x510ebc(0x1d0)]){case _0x510ebc(0x180):return $gameSystem[_0x510ebc(0x187)]()[_0x510ebc(0x2c1)](_0x44b1fe=>_0x44b1fe['category']===_0xac535);break;case _0x510ebc(0x36d):return $gameSystem['questsCompleted']()[_0x510ebc(0x2c1)](_0x1aa1b6=>_0x1aa1b6[_0x510ebc(0x30f)]===_0xac535);break;case _0x510ebc(0x1e6):return $gameSystem[_0x510ebc(0x214)]()['filter'](_0x4add06=>_0x4add06[_0x510ebc(0x30f)]===_0xac535);break;}return[];},Window_QuestList['prototype']['makeQuestList']=function(_0x1859e3){const _0x4cf74e=_0x51ad78;if(!this[_0x4cf74e(0x2eb)](_0x1859e3))return;for(const _0xfbe7e of _0x1859e3['Quests']){if(!_0xfbe7e)continue;switch(this[_0x4cf74e(0x1d0)]){case'known':if($gameSystem['isQuestKnown'](_0xfbe7e['Key']))this['addQuestCommand'](_0xfbe7e);break;case _0x4cf74e(0x36d):if($gameSystem[_0x4cf74e(0x2f6)](_0xfbe7e[_0x4cf74e(0x324)]))this['addQuestCommand'](_0xfbe7e);break;case _0x4cf74e(0x1e6):if($gameSystem[_0x4cf74e(0x367)](_0xfbe7e[_0x4cf74e(0x324)]))this[_0x4cf74e(0x2f0)](_0xfbe7e);break;}}},Window_QuestList['prototype'][_0x51ad78(0x2eb)]=function(_0x5f3d2d){const _0x3b5520=_0x51ad78;return this['_categoryStatus'][_0x5f3d2d[_0x3b5520(0x319)]];},Window_QuestList['prototype'][_0x51ad78(0x2f0)]=function(_0x82fca9){const _0x13b2a2=_0x51ad78;let _0x56b522=_0x82fca9[_0x13b2a2(0x34a)];if(_0x82fca9===$gameSystem[_0x13b2a2(0x2f9)]()){if('MGeOc'!==_0x13b2a2(0x259))_0x56b522=TextManager[_0x13b2a2(0x1db)][_0x13b2a2(0x333)](_0x56b522);else{const _0x2eba6d=this[_0x13b2a2(0x2cb)];_0x2eba6d['drawText'](_0x401d0e,0x0,_0x52899b['y'],_0x2eba6d[_0x13b2a2(0x24c)],_0x13b2a2(0x264));}}this[_0x13b2a2(0x1a9)](_0x56b522,_0x13b2a2(0x23b),!![],_0x82fca9);},Window_QuestList['prototype'][_0x51ad78(0x368)]=function(){const _0x3e004b=_0x51ad78;return _0x3e004b(0x32c);},Window_QuestList[_0x51ad78(0x1b5)][_0x51ad78(0x1bf)]=function(_0x349a9b){const _0x1e5841=_0x51ad78,_0x22f383=this[_0x1e5841(0x1b0)](_0x349a9b);if(_0x22f383===_0x1e5841(0x20f))this[_0x1e5841(0x294)](_0x349a9b);else{if(_0x22f383==='icon'){if('gmBHN'!==_0x1e5841(0x1c1)){_0xe3cb2b=_0x172ab0['toUpperCase']()['trim']();const _0x39b177=this['quest'](_0x323a32);if(!_0x39b177)return'';const _0x5aac35=this['questData']();return _0x5aac35[_0x1e5841(0x2b0)]=_0x5aac35[_0x1e5841(0x2b0)]||{},_0x5aac35[_0x1e5841(0x2b0)][_0x50648c]=_0x5aac35['objectivesCompleted'][_0x216973]||[],_0x5aac35[_0x1e5841(0x2b0)][_0x21ba7a][_0x1e5841(0x1a2)]((_0x923b10,_0x3b1fca)=>_0x923b10-_0x3b1fca);}else this[_0x1e5841(0x260)](_0x349a9b);}else Window_HorzCommand[_0x1e5841(0x1b5)]['drawItem']['call'](this,_0x349a9b);}},Window_QuestList[_0x51ad78(0x1b5)]['commandStyle']=function(){const _0x51d6ff=_0x51ad78;return _0x51d6ff(0x20f);},Window_QuestList[_0x51ad78(0x1b5)][_0x51ad78(0x1b0)]=function(_0x5d43d1){const _0xc5ce52=_0x51ad78;if(_0x5d43d1<0x0)return _0xc5ce52(0x29c);const _0x101200=this[_0xc5ce52(0x2dc)]();if(_0x101200!==_0xc5ce52(0x24b))return _0x101200;else{if(this[_0xc5ce52(0x2fc)]()>0x0){const _0x3f4750=this[_0xc5ce52(0x371)](_0x5d43d1);if(_0x3f4750['match'](/\\I\[(\d+)\]/i)){const _0x55670b=this[_0xc5ce52(0x228)](_0x5d43d1),_0x85f01d=this['textSizeEx'](_0x3f4750)[_0xc5ce52(0x183)];if(_0x85f01d<=_0x55670b[_0xc5ce52(0x183)]){if(_0xc5ce52(0x1dc)===_0xc5ce52(0x1dc))return'iconText';else{if(this[_0xc5ce52(0x33b)]['currentQuest']())return this[_0xc5ce52(0x33b)][_0xc5ce52(0x313)]()?_0x2a2609[_0xc5ce52(0x27f)]:'';else return this[_0xc5ce52(0x33b)][_0xc5ce52(0x1ad)]()?_0x2bb3ed['questButtonAssistCollapse']:_0x827f29[_0xc5ce52(0x2ef)];}}else{if('pmLjD'!==_0xc5ce52(0x263))return _0xc5ce52(0x2a0);else{_0x420ef5['ConvertParams'](_0x36c9d0,_0x5f2636);const _0x2189b9=_0x36b2c8[_0xc5ce52(0x324)];_0x423288[_0xc5ce52(0x347)](_0x2189b9),_0x1d1735['isSceneMap']()&&_0x194cd3['_scene']['refreshQuestTrackerWindow']();}}}}}return'text';},Window_QuestList['prototype']['drawItemStyleIconText']=function(_0x2206b0){const _0x4f50b9=_0x51ad78,_0x250037=this[_0x4f50b9(0x228)](_0x2206b0),_0x58dc0b=this[_0x4f50b9(0x371)](_0x2206b0),_0x5742d6=this['textSizeEx'](_0x58dc0b)[_0x4f50b9(0x183)];this[_0x4f50b9(0x2c2)](this['isCommandEnabled'](_0x2206b0));const _0x4ec7e1=this[_0x4f50b9(0x368)]();if(_0x4ec7e1===_0x4f50b9(0x30e)){if(_0x4f50b9(0x366)===_0x4f50b9(0x366))this['drawTextEx'](_0x58dc0b,_0x250037['x']+_0x250037['width']-_0x5742d6,_0x250037['y'],_0x5742d6);else{if(_0x3d9ab0[_0x4f50b9(0x2b1)]&&_0x162aca[_0x4f50b9(0x37c)]!==_0x7d4b09)return _0x498182[_0x4f50b9(0x37c)];else return _0x5f517b[_0x4f50b9(0x2b1)]===![]?![]:_0x2c2e77[_0x4f50b9(0x1b5)][_0x4f50b9(0x32e)][_0x4f50b9(0x253)](this);}}else{if(_0x4ec7e1==='center'){if(_0x4f50b9(0x247)!=='BGxWi'){const _0x1a50c0=_0x250037['x']+Math['floor']((_0x250037[_0x4f50b9(0x183)]-_0x5742d6)/0x2);this['drawTextEx'](_0x58dc0b,_0x1a50c0,_0x250037['y'],_0x5742d6);}else _0x42d6b4['_scene'][_0x4f50b9(0x30a)]();}else{if('OHCZt'==='OHCZt')this[_0x4f50b9(0x328)](_0x58dc0b,_0x250037['x'],_0x250037['y'],_0x5742d6);else return![];}}},Window_QuestList['prototype'][_0x51ad78(0x260)]=function(_0x3bf6df){const _0x56f3c6=_0x51ad78;this[_0x56f3c6(0x371)](_0x3bf6df)['match'](/\\I\[(\d+)\]/i);const _0x39799d=Number(RegExp['$1'])||0x0,_0x5824b8=this['itemLineRect'](_0x3bf6df),_0x373370=_0x5824b8['x']+Math['floor']((_0x5824b8['width']-ImageManager['iconWidth'])/0x2),_0x457183=_0x5824b8['y']+(_0x5824b8[_0x56f3c6(0x1a0)]-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x39799d,_0x373370,_0x457183);},Window_QuestList['prototype'][_0x51ad78(0x21b)]=function(){const _0x32bf73=_0x51ad78;return this[_0x32bf73(0x374)]()===_0x32bf73(0x30f)?this[_0x32bf73(0x2ec)]():null;},Window_QuestList[_0x51ad78(0x1b5)]['currentQuest']=function(){const _0x415727=_0x51ad78;return this[_0x415727(0x374)]()===_0x415727(0x23b)?this[_0x415727(0x2ec)]():null;},Window_QuestList[_0x51ad78(0x1b5)][_0x51ad78(0x25a)]=function(_0x361022){const _0x4c20fa=_0x51ad78;this[_0x4c20fa(0x192)]=_0x361022,this[_0x4c20fa(0x305)]();},Window_QuestList[_0x51ad78(0x1b5)][_0x51ad78(0x261)]=function(){const _0x17a0ba=_0x51ad78,_0x138977=this[_0x17a0ba(0x1f7)](),_0x27c4d1=this[_0x17a0ba(0x192)];_0x27c4d1[_0x17a0ba(0x1ff)]['clear']();const _0x3fd58e=_0x138977?_0x138977['Title']:TextManager[_0x17a0ba(0x2fd)],_0xbb98c8=_0x27c4d1[_0x17a0ba(0x1b8)](_0x3fd58e)[_0x17a0ba(0x183)],_0xafb17c=_0x27c4d1[_0x17a0ba(0x18d)]()+Math['round']((_0x27c4d1[_0x17a0ba(0x24c)]-_0xbb98c8)/0x2);_0x27c4d1['drawTextEx'](_0x3fd58e,_0xafb17c,0x0,_0x27c4d1[_0x17a0ba(0x24c)]);},Window_QuestList[_0x51ad78(0x1b5)]['setLogWindow']=function(_0x4c8f3d){const _0xae08df=_0x51ad78;this[_0xae08df(0x26e)]=_0x4c8f3d,this['callUpdateHelp']();},Window_QuestList['prototype'][_0x51ad78(0x2d8)]=function(){const _0x5d3ef7=_0x51ad78,_0x14849d=this[_0x5d3ef7(0x1f7)](),_0x5a0bf0=this[_0x5d3ef7(0x26e)];_0x5a0bf0['setQuest'](_0x14849d);},Window_QuestList[_0x51ad78(0x1b5)]['cursorPagedown']=function(){},Window_QuestList['prototype'][_0x51ad78(0x1f3)]=function(){},Window_QuestList[_0x51ad78(0x1b5)]['isOkEnabled']=function(){const _0x2dc439=_0x51ad78;if(this[_0x2dc439(0x1f7)]()){if('lqeuG'==='lqeuG')return this[_0x2dc439(0x1d0)]===_0x2dc439(0x180);else{if(!_0x32c0ca[_0x2dc439(0x376)]())return;_0x41602a[_0x2dc439(0x238)]['refreshQuestTrackerWindow']();}}else return Window_Command['prototype'][_0x2dc439(0x313)]['call'](this);};function Window_QuestLog(){const _0x1f429a=_0x51ad78;this[_0x1f429a(0x2f2)](...arguments);}Window_QuestLog['wordWrapSupport']=VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x2aa)]['Window'][_0x51ad78(0x205)],Window_QuestLog[_0x51ad78(0x27e)]=VisuMZ[_0x51ad78(0x18c)]['Settings'][_0x51ad78(0x1da)]['LogWindow_ScrollSpeed'],Window_QuestLog[_0x51ad78(0x1b5)]=Object[_0x51ad78(0x244)](Window_Scrollable[_0x51ad78(0x1b5)]),Window_QuestLog['prototype'][_0x51ad78(0x382)]=Window_QuestLog,Window_QuestLog[_0x51ad78(0x38d)]=0x19,Window_QuestLog[_0x51ad78(0x1b5)][_0x51ad78(0x2f2)]=function(_0x3bea3b){const _0x3a386b=_0x51ad78;this[_0x3a386b(0x345)]=0x0,this[_0x3a386b(0x38d)]=0x0,Window_Scrollable[_0x3a386b(0x1b5)][_0x3a386b(0x2f2)][_0x3a386b(0x253)](this,_0x3bea3b),this[_0x3a386b(0x2b3)]=null,this['refresh']();},Window_QuestLog['prototype']['contentsHeight']=function(){const _0x9e89b1=_0x51ad78;return Math[_0x9e89b1(0x21e)](this[_0x9e89b1(0x345)],0x1);},Window_QuestLog['prototype'][_0x51ad78(0x1ea)]=function(){const _0x3d6c96=_0x51ad78;return this[_0x3d6c96(0x2c7)]();},Window_QuestLog[_0x51ad78(0x1b5)][_0x51ad78(0x25f)]=function(){const _0x1bfa06=_0x51ad78;Window_Scrollable[_0x1bfa06(0x1b5)][_0x1bfa06(0x25f)][_0x1bfa06(0x253)](this),this[_0x1bfa06(0x2c9)]();},Window_QuestLog[_0x51ad78(0x1b5)][_0x51ad78(0x2c9)]=function(){const _0x5462eb=_0x51ad78;if(this[_0x5462eb(0x38d)]--===0x0)this[_0x5462eb(0x26f)]();},Window_QuestLog[_0x51ad78(0x1b5)][_0x51ad78(0x186)]=function(){const _0xf62d6a=_0x51ad78,_0x5a4e19=this[_0xf62d6a(0x284)]()||0x1,_0x594a65=this[_0xf62d6a(0x1e5)]()||0x1,_0x5a60af=this['_scrollX']-this[_0xf62d6a(0x31b)]%_0x5a4e19,_0x578f92=this['_scrollY']-this['_scrollY']%_0x594a65;if(_0x5a60af!==this['_scrollBaseX']||_0x578f92!==this['_scrollBaseY']){if(_0xf62d6a(0x1d6)===_0xf62d6a(0x1d6))this[_0xf62d6a(0x21a)](_0x5a60af,_0x578f92),this[_0xf62d6a(0x1d1)]();else return _0x370a47['questsFailed']()[_0xf62d6a(0x1ab)]>0x0;}this[_0xf62d6a(0x295)]['x']=this[_0xf62d6a(0x31b)],this[_0xf62d6a(0x295)]['y']=this['_scrollY'];},Window_QuestLog[_0x51ad78(0x1b5)][_0x51ad78(0x292)]=function(){const _0x13f74b=_0x51ad78;Window_Scrollable[_0x13f74b(0x1b5)][_0x13f74b(0x292)][_0x13f74b(0x253)](this),this[_0x13f74b(0x298)]();},Window_QuestLog[_0x51ad78(0x1b5)]['updatePageUpDownScroll']=function(){const _0x3517b6=_0x51ad78;Input['isPressed'](_0x3517b6(0x1ce))&&this[_0x3517b6(0x29e)](Window_QuestLog[_0x3517b6(0x27e)]),Input[_0x3517b6(0x37a)](_0x3517b6(0x220))&&this[_0x3517b6(0x30d)](Window_QuestLog[_0x3517b6(0x27e)]);},Window_QuestLog[_0x51ad78(0x1b5)][_0x51ad78(0x28a)]=function(_0x31a554){const _0x2c51bd=_0x51ad78;if(this[_0x2c51bd(0x2b3)]===_0x31a554)return;this['_quest']=_0x31a554,this[_0x2c51bd(0x38d)]=Window_QuestLog[_0x2c51bd(0x38d)];},Window_QuestLog['prototype']['refresh']=function(){const _0x395b04=_0x51ad78;this[_0x395b04(0x1ff)][_0x395b04(0x219)](),this[_0x395b04(0x1f5)](),this[_0x395b04(0x2e6)](),this[_0x395b04(0x1c6)]();},Window_QuestLog[_0x51ad78(0x1b5)][_0x51ad78(0x1f5)]=function(){const _0x485cee=_0x51ad78;if(![]){const _0x207d4c=this['baseTextRect'](),_0x21bacd=this[_0x485cee(0x2b3)]?this[_0x485cee(0x224)]():this['createEmptyText'](),_0x4598be=this[_0x485cee(0x1b8)](_0x21bacd[_0x485cee(0x225)]());this[_0x485cee(0x345)]=_0x4598be[_0x485cee(0x1a0)];if(this['constructor']===Window_QuestLog){this[_0x485cee(0x345)]+=this['lineHeight']();if(Window_QuestLog[_0x485cee(0x191)]){if(_0x485cee(0x240)!==_0x485cee(0x19e))this[_0x485cee(0x345)]+=this[_0x485cee(0x1ee)]()*0x4;else return _0x3ac1e[_0x485cee(0x1c3)]()[_0x485cee(0x36d)][_0x485cee(0x1ab)];}}}const _0x3be2b9=this['_quest']?this[_0x485cee(0x224)]():this['createEmptyText']();this[_0x485cee(0x345)]=this[_0x485cee(0x1b8)](_0x3be2b9[_0x485cee(0x225)]())[_0x485cee(0x1a0)];},Window_QuestLog[_0x51ad78(0x1b5)][_0x51ad78(0x1c6)]=function(){const _0x3ac630=_0x51ad78,_0x495e8c=this[_0x3ac630(0x2b3)]?this[_0x3ac630(0x224)]():this[_0x3ac630(0x372)]();this[_0x3ac630(0x328)](_0x495e8c,0x0,0x0,this['innerWidth']),this[_0x3ac630(0x332)]=0x0,this[_0x3ac630(0x295)]['y']=0x0;},Window_QuestLog['prototype'][_0x51ad78(0x372)]=function(){const _0x31cdee=_0x51ad78;VisuMZ[_0x31cdee(0x18c)][_0x31cdee(0x2aa)][_0x31cdee(0x201)][_0x31cdee(0x391)]();let _0x3e0704=this[_0x31cdee(0x290)]();return _0x3e0704=VisuMZ[_0x31cdee(0x18c)][_0x31cdee(0x348)](_0x3e0704),_0x3e0704=VisuMZ[_0x31cdee(0x18c)]['finalizeWordWrapSupport'](_0x3e0704),_0x3e0704;},Window_QuestLog['prototype'][_0x51ad78(0x290)]=function(){const _0x559b5a=_0x51ad78;return TextManager[_0x559b5a(0x2ee)];},Window_QuestLog[_0x51ad78(0x1b5)][_0x51ad78(0x224)]=function(){const _0x3d004b=_0x51ad78,_0x386b67=this[_0x3d004b(0x2b3)],_0x1bb86e=_0x386b67[_0x3d004b(0x324)][_0x3d004b(0x21d)]()[_0x3d004b(0x225)]();if(_0x386b67[_0x3d004b(0x391)])_0x386b67[_0x3d004b(0x391)][_0x3d004b(0x253)](this);let _0x4ddb0d=this[_0x3d004b(0x27b)]();return _0x4ddb0d=VisuMZ[_0x3d004b(0x18c)][_0x3d004b(0x276)](_0x4ddb0d),_0x4ddb0d=_0x4ddb0d[_0x3d004b(0x21c)](/\[\[RAWTITLE\]\]/gi,_0x386b67[_0x3d004b(0x34a)]),_0x4ddb0d=_0x4ddb0d[_0x3d004b(0x21c)](/\[\[TITLE\]\]/gi,_0x386b67['Title']['replace'](/\\I\[(\d+)\]/gi,'')[_0x3d004b(0x225)]()),_0x4ddb0d=_0x4ddb0d[_0x3d004b(0x21c)](/\[\[DIFFICULTY\]\]/gi,_0x386b67[_0x3d004b(0x321)]['trim']()),_0x4ddb0d=_0x4ddb0d[_0x3d004b(0x21c)](/\[\[FROM\]\]/gi,_0x386b67['From'][_0x3d004b(0x225)]()),_0x4ddb0d=_0x4ddb0d['replace'](/\[\[LOCATION\]\]/gi,_0x386b67[_0x3d004b(0x2cd)]['trim']()),_0x4ddb0d=_0x4ddb0d[_0x3d004b(0x21c)](/\[\[DESCRIPTION\]\]/gi,this[_0x3d004b(0x386)](_0x1bb86e)),_0x4ddb0d=_0x4ddb0d[_0x3d004b(0x21c)](/\[\[OBJECTIVES\]\]/gi,this['createQuestObjectives'](_0x386b67,_0x1bb86e)),_0x4ddb0d=_0x4ddb0d[_0x3d004b(0x21c)](/\[\[REWARDS\]\]/gi,this[_0x3d004b(0x1ac)](_0x386b67,_0x1bb86e)),_0x4ddb0d=_0x4ddb0d[_0x3d004b(0x21c)](/\[\[SUBTEXT\]\]/gi,this[_0x3d004b(0x34c)](_0x1bb86e)),_0x4ddb0d=_0x4ddb0d[_0x3d004b(0x21c)](/\[\[QUOTE\]\]/gi,this[_0x3d004b(0x27c)](_0x1bb86e)),_0x4ddb0d=VisuMZ['QuestSystem']['finalizeWordWrapSupport'](_0x4ddb0d),_0x4ddb0d=VisuMZ[_0x3d004b(0x18c)]['noMessageCoreRemoveEscapeCodes'](_0x4ddb0d),_0x4ddb0d[_0x3d004b(0x225)]();},Window_QuestLog[_0x51ad78(0x1b5)][_0x51ad78(0x27b)]=function(){const _0x5cab13=_0x51ad78;return TextManager[_0x5cab13(0x301)];},Window_QuestLog['prototype'][_0x51ad78(0x386)]=function(_0x481d91){const _0x315baf=_0x51ad78;let _0x297647=$gameSystem[_0x315baf(0x24e)](_0x481d91);return _0x297647=VisuMZ[_0x315baf(0x18c)][_0x315baf(0x385)](_0x297647),_0x297647[_0x315baf(0x225)]();},Window_QuestLog[_0x51ad78(0x1b5)][_0x51ad78(0x23a)]=function(_0x1c017c,_0x50f6bd){const _0x4331ca=_0x51ad78,_0x40f500=[],_0x42cbb1=$gameSystem[_0x4331ca(0x2e2)](_0x50f6bd),_0x4384a0=$gameSystem['questObjectivesCompleted'](_0x50f6bd),_0x23cd2b=$gameSystem[_0x4331ca(0x196)](_0x50f6bd),_0x170cf3=_0x42cbb1[_0x4331ca(0x2d3)](_0x4384a0)[_0x4331ca(0x2d3)](_0x23cd2b)[_0x4331ca(0x1a2)]((_0x3f0b90,_0x18564a)=>_0x3f0b90-_0x18564a);for(const _0x4c1f40 of _0x170cf3){if(_0x4331ca(0x33e)!==_0x4331ca(0x33e))_0x306b68[_0x4331ca(0x238)][_0x4331ca(0x30a)]();else{if(!_0x1c017c['Objectives'][_0x4c1f40])continue;const _0x6a0e24=_0x1c017c[_0x4331ca(0x353)][_0x4c1f40];let _0x2c9506=TextManager['questObjectiveNormalFmt'];if(_0x4384a0['includes'](_0x4c1f40))_0x2c9506=TextManager[_0x4331ca(0x2e9)];if(_0x23cd2b[_0x4331ca(0x283)](_0x4c1f40))_0x2c9506=TextManager['questObjectiveFailedFmt'];_0x40f500['push'](VisuMZ[_0x4331ca(0x18c)]['applyWordWrapEntry'](_0x2c9506[_0x4331ca(0x333)](_0x6a0e24)[_0x4331ca(0x225)]()));}}let _0x4243a1=VisuMZ['QuestSystem'][_0x4331ca(0x35d)](_0x40f500);return _0x4243a1;},Window_QuestLog['prototype'][_0x51ad78(0x1ac)]=function(_0x7b30c2,_0x46457){const _0x2df1d9=_0x51ad78,_0x6c64c8=[],_0x539319=$gameSystem[_0x2df1d9(0x194)](_0x46457),_0x1f4cb8=$gameSystem['questRewardsClaimed'](_0x46457),_0x5232e6=$gameSystem['questRewardsDenied'](_0x46457),_0x202ea7=_0x539319['concat'](_0x1f4cb8)[_0x2df1d9(0x2d3)](_0x5232e6)[_0x2df1d9(0x1a2)]((_0x3f704c,_0x2dae44)=>_0x3f704c-_0x2dae44);for(const _0x36bfbb of _0x202ea7){if(!_0x7b30c2['Rewards'][_0x36bfbb])continue;const _0x1977ac=_0x7b30c2[_0x2df1d9(0x17e)][_0x36bfbb];let _0x3bb50c=TextManager[_0x2df1d9(0x24a)];if(_0x1f4cb8[_0x2df1d9(0x283)](_0x36bfbb))_0x3bb50c=TextManager[_0x2df1d9(0x35b)];if(_0x5232e6[_0x2df1d9(0x283)](_0x36bfbb))_0x3bb50c=TextManager['questRewardsDeniedFmt'];_0x6c64c8[_0x2df1d9(0x1bd)](VisuMZ[_0x2df1d9(0x18c)][_0x2df1d9(0x377)](_0x3bb50c['format'](_0x1977ac)[_0x2df1d9(0x225)]()));}let _0xde2d1b=VisuMZ['QuestSystem'][_0x2df1d9(0x35d)](_0x6c64c8);return _0xde2d1b;},Window_QuestLog[_0x51ad78(0x1b5)][_0x51ad78(0x34c)]=function(_0x868f33){const _0x50abd1=_0x51ad78;let _0xdf49f6=$gameSystem[_0x50abd1(0x1a5)](_0x868f33);return _0xdf49f6=VisuMZ['QuestSystem']['finalizeWordWrapSupport'](_0xdf49f6),_0xdf49f6[_0x50abd1(0x225)]();},Window_QuestLog[_0x51ad78(0x1b5)][_0x51ad78(0x27c)]=function(_0x8f53a9){const _0x3779bb=_0x51ad78;let _0x442b33=$gameSystem[_0x3779bb(0x1a1)](_0x8f53a9);return _0x442b33=VisuMZ[_0x3779bb(0x18c)]['finalizeWordWrapSupport'](_0x442b33),_0x442b33[_0x3779bb(0x225)]();};function Window_QuestTracker(){const _0x2c1865=_0x51ad78;this[_0x2c1865(0x2f2)](...arguments);}Window_QuestTracker[_0x51ad78(0x1b5)]=Object['create'](Window_QuestLog[_0x51ad78(0x1b5)]),Window_QuestTracker[_0x51ad78(0x1b5)][_0x51ad78(0x382)]=Window_QuestTracker,Window_QuestTracker[_0x51ad78(0x2cf)]=VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x2aa)][_0x51ad78(0x1da)][_0x51ad78(0x1cc)],Window_QuestTracker['activeBgType']=VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x2aa)][_0x51ad78(0x1da)][_0x51ad78(0x31a)],Window_QuestTracker['CLOSE_MINIMUM_OPACITY']=VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x2aa)][_0x51ad78(0x1cb)]['MinTrackerOpacity']??0x80,Window_QuestTracker[_0x51ad78(0x246)]=VisuMZ[_0x51ad78(0x18c)]['Settings'][_0x51ad78(0x1cb)][_0x51ad78(0x185)]??0x10,Window_QuestTracker[_0x51ad78(0x1b5)][_0x51ad78(0x2f2)]=function(_0x3a3a13){const _0x586343=_0x51ad78;Window_QuestLog[_0x586343(0x1b5)][_0x586343(0x2f2)][_0x586343(0x253)](this,_0x3a3a13),this[_0x586343(0x28a)]($gameSystem[_0x586343(0x2f9)]()),this[_0x586343(0x2cf)]['x']=this['scale']['y']=Window_QuestTracker[_0x586343(0x2cf)],this['updateVisibility']();},Window_QuestTracker[_0x51ad78(0x1b5)][_0x51ad78(0x2c7)]=function(){const _0xf352c0=_0x51ad78;return Math[_0xf352c0(0x21e)](this[_0xf352c0(0x345)],0x1);},Window_QuestTracker[_0x51ad78(0x1b5)]['getEmptyLogFmt']=function(){return'';},Window_QuestTracker[_0x51ad78(0x1b5)][_0x51ad78(0x27b)]=function(){const _0x25787d=_0x51ad78;return TextManager[_0x25787d(0x327)];},Window_QuestTracker[_0x51ad78(0x1b5)]['createContents']=function(){const _0x5e4bfa=_0x51ad78;this[_0x5e4bfa(0x1a0)]=this[_0x5e4bfa(0x2c7)]()+$gameSystem['windowPadding']()*0x2,Window_QuestLog[_0x5e4bfa(0x1b5)][_0x5e4bfa(0x2e6)][_0x5e4bfa(0x253)](this);},Window_QuestTracker[_0x51ad78(0x1b5)][_0x51ad78(0x28a)]=function(_0x1a8e19){const _0x501ec6=_0x51ad78;if(this[_0x501ec6(0x2b3)]===_0x1a8e19)return;this[_0x501ec6(0x2b3)]=_0x1a8e19,this[_0x501ec6(0x26f)]();},Window_QuestTracker[_0x51ad78(0x1b5)]['refresh']=function(){const _0x3b4aa9=_0x51ad78;if($gameTemp[_0x3b4aa9(0x346)])return;$gameTemp[_0x3b4aa9(0x346)]=!![],Window_QuestLog[_0x3b4aa9(0x1b5)][_0x3b4aa9(0x26f)][_0x3b4aa9(0x253)](this),this[_0x3b4aa9(0x362)](this[_0x3b4aa9(0x2b3)]?Window_QuestTracker['activeBgType']:0x2),$gameTemp[_0x3b4aa9(0x346)]=![];},Window_QuestTracker[_0x51ad78(0x1b5)]['update']=function(){const _0x425f9f=_0x51ad78;Window_QuestLog[_0x425f9f(0x1b5)][_0x425f9f(0x25f)][_0x425f9f(0x253)](this),this[_0x425f9f(0x216)](),this[_0x425f9f(0x314)]();},Window_QuestTracker['prototype'][_0x51ad78(0x216)]=function(){const _0x2b85e3=_0x51ad78;let _0xece5c=this[_0x2b85e3(0x1fd)];const _0x4eb753=Window_QuestTracker[_0x2b85e3(0x246)];if(this[_0x2b85e3(0x2dd)]()){const _0x7cc9f6=Window_QuestTracker[_0x2b85e3(0x245)];_0xece5c=(_0xece5c-_0x4eb753)[_0x2b85e3(0x34f)](_0x7cc9f6,0xff);}else _0xece5c+=_0x4eb753;this[_0x2b85e3(0x1fd)]=_0xece5c,this['backOpacity']=_0xece5c;},Window_QuestTracker[_0x51ad78(0x1b5)]['isCloseToQuestTrackerScreenPosition']=function(){const _0x491eb1=_0x51ad78;if(!SceneManager['isSceneMap']())return![];const _0x1a61fe=$gameMap[_0x491eb1(0x2d6)](),_0x3b7e47=$gameScreen[_0x491eb1(0x1e9)](),_0x5b6600=$gamePlayer['screenX']()*_0x3b7e47,_0x596523=($gamePlayer[_0x491eb1(0x1df)]()-Math[_0x491eb1(0x17b)](_0x1a61fe/0x2*_0x3b7e47))*_0x3b7e47,_0x5ab559=new Point(_0x5b6600,_0x596523),_0x557d1d=this[_0x491eb1(0x2e1)][_0x491eb1(0x234)](_0x5ab559);return this[_0x491eb1(0x30b)][_0x491eb1(0x38e)](_0x557d1d['x'],_0x557d1d['y']);},Window_QuestTracker['prototype'][_0x51ad78(0x314)]=function(){const _0x15e825=_0x51ad78,_0x4a87ab=this[_0x15e825(0x390)]();this[_0x15e825(0x365)]=_0x4a87ab;},Window_QuestTracker[_0x51ad78(0x1b5)][_0x51ad78(0x390)]=function(){const _0x2dbe17=_0x51ad78;if(!ConfigManager[_0x2dbe17(0x213)])return 0x0;if($gameTemp[_0x2dbe17(0x2a9)]){if('sesPE'!=='sesPE')_0x5aed42['setQuestStatus'](_0x78d1a2,_0x3b387e);else return 0x0;}const _0x1e816d=SceneManager['_scene'];if(_0x1e816d&&_0x1e816d[_0x2dbe17(0x37b)]){if(_0x2dbe17(0x273)===_0x2dbe17(0x273)){if(_0x1e816d['_messageWindow'][_0x2dbe17(0x365)]>0x0)return 0x0;}else this[_0x2dbe17(0x30d)](_0x365add['scrollSpeed']);}if(!this[_0x2dbe17(0x2b3)])return 0x0;if($gamePlayer['isTransferring']())return 0x0;if($gameParty['inBattle']())return 0x0;if(SceneManager[_0x2dbe17(0x2f5)]())return 0x0;return $gameSystem[_0x2dbe17(0x341)]()?0xff:0x0;},VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x385)]=function(_0x25f55d){const _0x191052=_0x51ad78;if(!Window_QuestLog[_0x191052(0x191)])return _0x25f55d;if(!Imported[_0x191052(0x282)])return _0x25f55d;return _0x25f55d=_0x191052(0x254)[_0x191052(0x333)](_0x25f55d),_0x25f55d;},VisuMZ[_0x51ad78(0x18c)]['noMessageCoreRemoveEscapeCodes']=function(_0x50fda9){const _0x17ede1=_0x51ad78;if(Imported[_0x17ede1(0x282)])return _0x50fda9;return _0x50fda9=_0x50fda9['replace'](/<COLORLOCK>/gi,''),_0x50fda9=_0x50fda9[_0x17ede1(0x21c)](/<\/COLORLOCK>/gi,''),_0x50fda9;},VisuMZ['QuestSystem']['applyWordWrap']=function(_0x14daea){const _0x400ded=_0x51ad78;if(!Window_QuestLog[_0x400ded(0x191)]){if(_0x400ded(0x207)!=='PzLFe')return _0x14daea[_0x400ded(0x21c)](/<(?:BR|LINEBREAK)>/gi,'');else this[_0x400ded(0x2f2)](...arguments);}if(!Imported[_0x400ded(0x282)]){if(_0x400ded(0x2b6)!==_0x400ded(0x2b6)){const _0x5897b9=this[_0x400ded(0x1c3)]();if(_0x2242e9&&_0x5897b9[_0x400ded(0x2c6)]===_0x443500)_0x5b9895='';_0x5897b9[_0x400ded(0x2c6)]=_0x1f4a70,_0x55a443[_0x400ded(0x376)]()&&_0x11b61b[_0x400ded(0x238)][_0x400ded(0x358)](_0x5becd0);}else return _0x14daea['replace'](/<(?:BR|LINEBREAK)>/gi,'');}return VisuMZ[_0x400ded(0x32a)][_0x400ded(0x2aa)][_0x400ded(0x356)][_0x400ded(0x1f1)]?_0x14daea=_0x14daea['replace'](/[\n\r]+/g,_0x400ded(0x311)):_0x14daea=_0x14daea[_0x400ded(0x21c)](/[\n\r]+/g,''),_0x14daea;},VisuMZ[_0x51ad78(0x18c)]['convertLineBreaksForWordWrap']=function(_0x343c30){const _0x1d61d5=_0x51ad78;if(!Window_QuestLog[_0x1d61d5(0x191)])return _0x343c30;if(!Imported[_0x1d61d5(0x282)])return _0x343c30;return _0x343c30['trim']()[_0x1d61d5(0x21c)](/[\n\r]/g,_0x1d61d5(0x218));},VisuMZ[_0x51ad78(0x18c)][_0x51ad78(0x377)]=function(_0x57b645){const _0x588626=_0x51ad78;if(!Window_QuestLog[_0x588626(0x191)])return _0x57b645;if(!Imported[_0x588626(0x282)])return _0x57b645;return VisuMZ[_0x588626(0x18c)]['applyWordWrap'](_0x57b645['trim']());},VisuMZ[_0x51ad78(0x18c)]['joinQuestEntries']=function(_0x5b7fe4){const _0x3fc626=_0x51ad78;if(!Window_QuestLog['wordWrapSupport'])return _0x5b7fe4[_0x3fc626(0x2f3)]('\x0a')[_0x3fc626(0x225)]();if(!Imported['VisuMZ_1_MessageCore'])return _0x5b7fe4['join']('\x0a')[_0x3fc626(0x225)]();return _0x5b7fe4[_0x3fc626(0x2f3)](_0x3fc626(0x218))[_0x3fc626(0x225)]();},totalQuestsAvailable=function(){const _0x18dce9=_0x51ad78;return $gameSystem['questData']()['known'][_0x18dce9(0x1ab)];},totalQuestsCompleted=function(){const _0x11dcf5=_0x51ad78;return $gameSystem[_0x11dcf5(0x1c3)]()[_0x11dcf5(0x36d)][_0x11dcf5(0x1ab)];},totalQuestsFailed=function(){const _0x34dcd2=_0x51ad78;return $gameSystem[_0x34dcd2(0x1c3)]()[_0x34dcd2(0x1e6)][_0x34dcd2(0x1ab)];},totalQuestsRevealed=function(){return totalQuestsAvailable()+totalQuestsCompleted()+totalQuestsFailed();},totalQuestsInGame=function(){const _0x1bfb92=_0x51ad78;return VisuMZ[_0x1bfb92(0x18c)][_0x1bfb92(0x370)][_0x1bfb92(0x1ab)];},getQuestDescriptionIndex=function(_0x2b4078){const _0x4b3fe4=_0x51ad78;_0x2b4078=_0x2b4078[_0x4b3fe4(0x21d)]()[_0x4b3fe4(0x225)]();const _0x32fcb3=$gameSystem[_0x4b3fe4(0x23b)](_0x2b4078);if(!_0x32fcb3)return-0x1;$gameSystem['questDescription'](_0x2b4078);const _0x44181e=$gameSystem[_0x4b3fe4(0x1c3)]()[_0x4b3fe4(0x2a4)];return _0x44181e[_0x2b4078]||0x0;},totalVisibleQuestObjectives=function(_0x41ebb0){const _0x340cac=_0x51ad78;_0x41ebb0=_0x41ebb0[_0x340cac(0x21d)]()['trim']();const _0x321138=$gameSystem[_0x340cac(0x23b)](_0x41ebb0);if(!_0x321138)return-0x1;$gameSystem[_0x340cac(0x2e2)](_0x41ebb0);const _0x2b3690=$gameSystem[_0x340cac(0x1c3)]()[_0x340cac(0x299)]||{};if(!_0x2b3690[_0x41ebb0])return 0x0;return _0x2b3690[_0x41ebb0][_0x340cac(0x1ab)];},totalQuestObjectives=function(_0x33072b){const _0x44a9fc=_0x51ad78;_0x33072b=_0x33072b['toUpperCase']()[_0x44a9fc(0x225)]();const _0xd0035c=$gameSystem[_0x44a9fc(0x23b)](_0x33072b);return _0xd0035c?_0xd0035c[_0x44a9fc(0x353)][_0x44a9fc(0x1ab)]-0x1:0x0;},totalVisibleQuestRewards=function(_0x204a80){const _0x12c63f=_0x51ad78;_0x204a80=_0x204a80[_0x12c63f(0x21d)]()[_0x12c63f(0x225)]();const _0x2f21a1=$gameSystem['quest'](_0x204a80);if(!_0x2f21a1)return-0x1;$gameSystem['questRewards'](_0x204a80);const _0x18e635=$gameSystem[_0x12c63f(0x1c3)]()['rewards']||{};if(!_0x18e635[_0x204a80])return 0x0;return _0x18e635[_0x204a80][_0x12c63f(0x1ab)];},totalQuestRewards=function(_0x2b4db1){const _0x596444=_0x51ad78;_0x2b4db1=_0x2b4db1[_0x596444(0x21d)]()[_0x596444(0x225)]();const _0x2afc67=$gameSystem['quest'](_0x2b4db1);return _0x2afc67?_0x2afc67['Rewards'][_0x596444(0x1ab)]-0x1:0x0;},getQuestSubtextIndex=function(_0x2119e6){const _0x312ac8=_0x51ad78;_0x2119e6=_0x2119e6['toUpperCase']()[_0x312ac8(0x225)]();const _0x4e36ff=$gameSystem[_0x312ac8(0x23b)](_0x2119e6);if(!_0x4e36ff)return-0x1;$gameSystem[_0x312ac8(0x1a5)](_0x2119e6);const _0x4cf16e=$gameSystem[_0x312ac8(0x1c3)]()[_0x312ac8(0x217)];return _0x4cf16e[_0x2119e6]||0x0;},getQuestQuoteIndex=function(_0xf88e32){const _0x5e60c4=_0x51ad78;_0xf88e32=_0xf88e32[_0x5e60c4(0x21d)]()[_0x5e60c4(0x225)]();const _0x1ff56e=$gameSystem[_0x5e60c4(0x23b)](_0xf88e32);if(!_0x1ff56e)return-0x1;$gameSystem['questQuote'](_0xf88e32);const _0x3d53ce=$gameSystem[_0x5e60c4(0x1c3)]()[_0x5e60c4(0x274)];return _0x3d53ce[_0xf88e32]||0x0;},isQuestObjectiveCompleted=function(_0x42c9a3,_0x5b9d60){const _0x17b08b=_0x51ad78;_0x42c9a3=_0x42c9a3[_0x17b08b(0x21d)]()[_0x17b08b(0x225)]();const _0x2a660e=$gameSystem['quest'](_0x42c9a3);if(!_0x2a660e)return![];$gameSystem[_0x17b08b(0x2e2)](_0x42c9a3);const _0x54149b=$gameSystem[_0x17b08b(0x1c3)]()[_0x17b08b(0x2b0)];if(!_0x54149b[_0x42c9a3])return![];return _0x54149b[_0x42c9a3][_0x17b08b(0x283)](_0x5b9d60);},isQuestObjectiveFailed=function(_0x1ece33,_0x242c96){const _0x567f72=_0x51ad78;_0x1ece33=_0x1ece33['toUpperCase']()[_0x567f72(0x225)]();const _0x1e9c4a=$gameSystem[_0x567f72(0x23b)](_0x1ece33);if(!_0x1e9c4a)return![];$gameSystem[_0x567f72(0x2e2)](_0x1ece33);const _0x179ba0=$gameSystem[_0x567f72(0x1c3)]()[_0x567f72(0x251)];if(!_0x179ba0[_0x1ece33])return![];return _0x179ba0[_0x1ece33]['includes'](_0x242c96);},isQuestObjectiveUncleared=function(_0x337612,_0x181b0a){const _0x3be901=_0x51ad78;_0x337612=_0x337612['toUpperCase']()[_0x3be901(0x225)]();const _0x4f542a=$gameSystem[_0x3be901(0x23b)](_0x337612);if(!_0x4f542a)return![];$gameSystem[_0x3be901(0x2e2)](_0x337612);const _0x37d321=$gameSystem[_0x3be901(0x1c3)]()['objectives'];if(!_0x37d321[_0x337612])return![];return _0x37d321[_0x337612]['includes'](_0x181b0a);},isQuestRewardClaimed=function(_0x5d4ec9,_0x16c148){const _0x330395=_0x51ad78;_0x5d4ec9=_0x5d4ec9[_0x330395(0x21d)]()[_0x330395(0x225)]();const _0xdbff44=$gameSystem[_0x330395(0x23b)](_0x5d4ec9);if(!_0xdbff44)return![];$gameSystem[_0x330395(0x194)](_0x5d4ec9);const _0x3195b6=$gameSystem[_0x330395(0x1c3)]()[_0x330395(0x35c)];if(!_0x3195b6[_0x5d4ec9])return![];return _0x3195b6[_0x5d4ec9][_0x330395(0x283)](_0x16c148);},isQuestRewardDenied=function(_0x5a3207,_0x1d5c26){const _0x2f3a69=_0x51ad78;_0x5a3207=_0x5a3207[_0x2f3a69(0x21d)]()['trim']();const _0x5c293c=$gameSystem[_0x2f3a69(0x23b)](_0x5a3207);if(!_0x5c293c)return![];$gameSystem['questRewards'](_0x5a3207);const _0x58b88f=$gameSystem['questData']()[_0x2f3a69(0x2c0)];if(!_0x58b88f[_0x5a3207])return![];return _0x58b88f[_0x5a3207][_0x2f3a69(0x283)](_0x1d5c26);},isQuestRewardUnclaimed=function(_0x141984,_0x3897af){const _0x3de0fe=_0x51ad78;_0x141984=_0x141984[_0x3de0fe(0x21d)]()[_0x3de0fe(0x225)]();const _0x187054=$gameSystem['quest'](_0x141984);if(!_0x187054)return![];$gameSystem[_0x3de0fe(0x194)](_0x141984);const _0x3f9294=$gameSystem['questData']()[_0x3de0fe(0x25c)];if(!_0x3f9294[_0x141984])return![];return _0x3f9294[_0x141984]['includes'](_0x3897af);};function _0x5c9f(){const _0x4a0242=['34785144EEbdXp','PVtlO','QXZxc','getConfigValue','ERJqr','contentsOpacity','340nLuxFb','contents','90gNqzge','General','MainMenu','LogEmpty','mainCommandWidth','LogWindow_Auto_WordWrap','makeCommandList','CrWOF','addQuestSystemquestTrackerPositionCommand','VisibleRewards','JSON','Reward_Normal_Fmt','WLyoD','addCategoryCommand','PositionOff','iconText','questObjectiveFailedFmt','questKnownIcon','commandQuest','questTrackerShow','questsFailed','_backSprite2','updateOpacity','subtext','<BR>','clear','updateScrollBase','currentCategory','replace','toUpperCase','max','addGeneralOptions','pageup','commandNameWindowDrawBackground','numItems','initQuestSystem','createQuestText','trim','setQuestDescription','_commandWindow','itemLineRect','SystemCallSceneQuest','createQuestLogWindow','TrackerRefreshWindow','commandNameWindowDrawText','version','80HgUOOi','4VaPUnC','CommandWindow_Known_Icon','gainItem','QuestRewards','createCommandNameWindow','applyInverse','QuestDescription','questTrackerWindow','WWWLn','_scene','PositionName','createQuestObjectives','quest','47946CXRVoe','questKnownCmd','addNoQuestsListedCommand','Enable','fJfqZ','Categories','questLabelWindowRect','defaultQuestTrackerFmt','create','CLOSE_MINIMUM_OPACITY','CLOSE_FADE_SPEED','kFdFm','Show','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','questRewardsNormalFmt','auto','innerWidth','setQuestTrackerVisible','questDescription','exit','scaleSprite','objectivesFailed','OLylB','call','<WORDWRAP>%1','Game_Party_gainItem','loadTitle2','_questTrackerWindow','registerCommand','XgozM','setLabelWindow','wBpyP','rewards','questCompletedCmd','DciWX','update','drawItemStyleIcon','updateLabelWindow','Status','dfFmA','center','WpOEf','makeData','ConfigManager_makeData','Scene_Options_maxCommands','idCsh','isCommandEnabled','showTracker','_list','BLsyj','_logWindow','refresh','KpwoZ','VcIir','kkQor','mncPD','quotes','AdjustRect','convertLineBreaksForWordWrap','ButtonAssistCollapse','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','CommandWindow_Known_Text','deactivate','getQuestLogFmt','createQuestQuote','Scene_Menu_createCommandWindow','scrollSpeed','questButtonAssistActive','Game_System_initialize','QuestLabel_BgType','VisuMZ_1_MessageCore','includes','scrollBlockWidth','categoryList','_quests','updateCommandNameWindow','questTrackerOnRight','onListCancel','setQuest','NTJLc','createQuestListWindow','OxwaX','questCompletedIcon','requestRefresh','getEmptyLogFmt','getTotalCategoryQuests','processWheelScroll','setBackgroundOpacity','drawItemStyleIconText','origin','setQuestRewards','createQuestLabelWindow','updatePageUpDownScroll','objectives','makeDeepCopy','buttonAssistText4','text','parameters','smoothScrollDown','iconWidth','icon','useItem','statusText','addWindow','description','FailedQuests','isQuestCommandVisible','questRewardsDenied','TrackerWindow_Rect','_doodadEditorMode','Settings','parse','FUNC','BgSettings','xxFjy','CkWLW','objectivesCompleted','uiMenuStyle','Window_MenuCommand_addOriginalCommands','_quest','LKXiS','Objective_Completed_Fmt','yrYGU','questCategoryClosedFmt','GQnvl','addQuestCommandAutomatically','CommandWindow_Rect','isAlive','questFailedIcon','addOriginalCommands','match','activate','rewardsDenied','filter','changePaintOpacity','questCommandName','bitmap','ButtonAssistPageUpDown','tracked','contentsHeight','CmdTextAlign','updateDelayRefresh','shown','_commandNameWindow','163075FXvLGp','Location','commandNameWindowCenter','scale','SnapshotOpacity','onListCategory','questObjectivesCompleted','concat','TrackerChangeQuest','unshift','tileHeight','createQuestTrackerWindow','updateLogWindow','CommandWindow_BgType','value','Scene_Boot_onDatabaseLoaded','commandStyle','isCloseToQuestTrackerScreenPosition','AddPositionOption','\x0a\x5c{[[Title]]\x5c}\x0a[[Objectives]]\x0a','\x5cI[%1]%2','worldTransform','questObjectives','fYWpg','process_VisuMZ_QuestSystem_Data','setQuestStatus','createContents','Name','isquestMenuShown','questObjectiveClearedFmt','IdGOI','isCategoryOpen','currentExt','SvZPT','questEmptyText','questButtonAssistExpand','addQuestCommand','VisuMZ_1_MainMenuCore','initialize','join','NoQuestListed','isSceneChanging','isQuestCompleted','159261FnbIOC','cancel','trackedQuest','eORMB','XZbGE','maxItems','noQuestsLabel','ARRAYEVAL','PositionOn','note','questLogFmt','_tradeItemWithParty','AddShowOption','maxCommands','callUpdateHelp','ConvertParams','TargetID','Scene_Map_createSpriteset','BTszZ','refreshQuestTrackerWindow','innerRect','isquestMenuEnabled','smoothScrollUp','right','category','questFailedCmd','\x1bWrapBreak[0]','resetFontSettings','isOkEnabled','updateVisibility','buttonAssistText1','hDKRp','TrackedQuest','ShowName','CategoryName','TrackerWindow_BgType','_scrollX','addQuestSystemCommands','doesCategoryHaveQuestsAvailable','SystemShowQuestMenu','_categoryStatus','ListWindowTrackedQuest','Difficulty','IZGio','questTrackerPosOff','Key','TargetIDs','onCommandOk','questTrackerFmt','drawTextEx','Quests','MessageCore','deny','left','12273856yARMqe','isRightInputMode','openCloseCurrentCategory','questButtonAssistPageUpDn','show','_scrollY','format','Game_Battler_useItem','QuestSubtext','addLoadListener','map','claimed','windowPadding','EnableMainMenu','_listWindow','TrackerFmt','zArVv','fcHMo','questCategoryOpenedFmt','onDatabaseLoaded','isQuestTrackerVisible','createCommandWindow','questLogWindowRect','QuestSet','_textHeight','_questTrackerRefresh','setTrackedQuest','applyWordWrap','ARRAYJSON','Title','isQuestKnown','createQuestSubtext','CuXOj','hYduZ','clamp','isKnownQuestsEnabled','questRewardsClaimed','SNade','Objectives','Window_Options_statusText','drawIcon','WordWrap','Game_BattlerBase_addNewState','setQuestForQuestTrackerWindow','wnhku','active','questRewardsClaimedFmt','rewardsClaimed','joinQuestEntries','isCompletedQuestsEnabled','inBattle','ZeQet','BgFilename2','setBackgroundType','deathStateId','isFailedQuestsVisible','openness','mjGPu','isQuestFailed','itemTextAlign','Window_Options_addGeneralOptions','noQuestsListed','Cspxx','setQuestObjectives','completed','UWddY','Keys','QuestOrder','commandName','createEmptyText','setValue','currentSymbol','RnfMx','isSceneMap','applyWordWrapEntry','removed','setQuestSubtext','isPressed','_messageWindow','uiInputPosition','loadTitle1','questTrackerPosition','denied','commandSymbol','remove','constructor','Game_Map_refresh','setListWindow','finalizeWordWrapSupport','createQuestDescription','onListQuest','addChild','return\x200','isActor','TXaLV','2QNYKwt','_delayDraw','contains','getBackgroundOpacity','visibilityLevel','OnLoadQuestJS','setLogWindow','opacity','XuAqV','floor','setCategoryFilter','activeBgType','Rewards','deselect','known','popScene','OZGUG','width','STR','CompassFadeSpeed','updateOrigin','questsKnown','applyData','pmrbf','questJournalSystemAddDeath','claim','QuestSystem','itemPadding','createCustomBackgroundImages','questListWindowRect','name','wordWrapSupport','_labelWindow','iconHeight','questRewards','smoothSelect','questObjectivesFailed','index','addFailedQuestsCommand','questButtonAssistCollapse','_hasDiedBefore','addKnownQuestsCommand','questRewardsDeniedFmt','ARRAYFUNC','fYrUm','setHandler','height','questQuote','sort','createBackground','commandWindowRect','questSubtext','drawText','ConfigManager_applyData','ARRAYNUM','addCommand','ZSlzw','length','createQuestRewards','isCurrentCategoryOpen','MArmy','BgFilename1','commandStyleCheck','bind','ButtonAssistExpand','status','ogzMT','prototype','addQuestSystemquestTrackerShowCommand','IZrNs','textSizeEx','ShowFailed','Reward_Completed_Fmt','CompletedQuests','totalCommands','push','ListWindowCategoryCloseFmt','drawItem','_isRefreshingQuestTrackerWindow','gmBHN','questJournalSystemUseItem','questData','centerSprite','KnownQuests','drawAllText','752201Oabbvf','setQuestQuote','initCategories','LogWindow_BgType','Tracker','TrackerWindow_Scale','QuestObjectives','pagedown','questJournalSystemGainItem','_categoryFilter','paint','isDead','questsCompleted','rhjIf','coqwk','PTCBG','addNewState','QuestQuote','121848kaivoU','Window','questTrackedQuestFmt','phvJI','isQuestCommandEnabled','questTrackerPosOn','screenY','Quotes','QuestData','_backSprite1','adjustSprite','QuestLabel_Rect','scrollBlockHeight','failed','tradeItemWithParty','addCompletedQuestsCommand','zoomScale','overallHeight','ylqXX','NUM','TrackerShowHide','lineHeight','Game_Actor_tradeItemWithParty','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','LineBreakSpace','Description','cursorPageup','isEnemy','calculateTextHeight','createSpriteset','currentQuest'];_0x5c9f=function(){return _0x4a0242;};return _0x5c9f();}
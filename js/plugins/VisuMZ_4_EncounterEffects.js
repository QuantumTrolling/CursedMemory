//=============================================================================
// VisuStella MZ - Enemy Encounter Effects
// VisuMZ_4_EncounterEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_EncounterEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EncounterEffects = VisuMZ.EncounterEffects || {};
VisuMZ.EncounterEffects.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.09] [EncounterEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Encounter_Effects_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Both random encounters and on-screen encounters are pretty limited in what
 * they're able to do in RPG Maker MZ. This plugin expands their functionality
 * with some unique effects added through this plugin.
 * 
 * Both types of encounters can benefit from having more control over the
 * occurrence of Preemptive and Surprise Attacks. These can be enforced through
 * Plugin Commands and set up in a queue.
 * 
 * On-screen encounters can utilize alert functions that will cause events to
 * chase the player (or flee from them) once the player steps within their
 * visible detection range.
 * 
 * On-screen encounters can also utilize new functions added for use with the
 * Conditional Branch to determine which direction the player has approached
 * the on-screen encounter event from.
 * 
 * Random encounters can utilize repel and lure effects to nullify any random
 * encounters for a certain amount of steps or to increase their rate of
 * occurrence.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Take control of battle advantage. Enforce preemptive attacks, surprise
 *   attacks, neither, or chance it.
 * * Battle advantages can be set up in a queue for more interesting gameplay.
 * * Events can be given alert functionality to chase the player if the player
 *   steps within their vision range.
 * * Use Terrain Tags and Regions to set up tiles that will block detection
 *   range through line of sight usage.
 * * Events can trigger themselves upon touching followers instead of just
 *   players.
 * * Events can lock themselves in the direction they're facing when interacted
 *   with to make it easier to apply side attack and back attack effects.
 * * Random encounters can be bypassed through repel effects.
 * * Increase the rate of random encounters with lure effects.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Battle Advantage
 * 
 * Upon starting a battle with forced advantages, any calculations made by
 * other means will be overwritten in favor of the declared forced advantage.
 *
 * ---
 * 
 * Game_Player.encounterProgressValue
 * 
 * This function has been overwritten to allow for more flexibility over the
 * multipliers and effects applied through various effects and to allow for
 * the repel and lure effects to work as best as they can.
 * 
 * ---
 * 
 * Game_Event.updateSelfMovement
 * 
 * This function's original code will be ignored when the event is set to chase
 * or flee from the player after being alerted. After the alert and return
 * periods are over, self movement will resume as normal.
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
 * === Battle Advantage-Related Tags ===
 * 
 * ---
 *
 * <Preemptive>
 *
 * - Used for: Troop Name Tag
 * - Any troop with this tag in its name will have the battle start off with
 *   the preemptive advantage (in favor of the player party).
 *
 * ---
 *
 * <Surprise>
 *
 * - Used for: Troop Name Tag
 * - Any troop with this tag in its name will have the battle start off with
 *   the surprise advantage (in favor of the enemy party).
 *
 * ---
 *
 * <No Advantage>
 *
 * - Used for: Troop Name Tag
 * - Any troop with this tag in its name will have the battle start off with
 *   no advantage at all.
 *
 * ---
 *
 * <Chance>
 *
 * - Used for: Troop Name Tag
 * - Any troop with this tag in its name will have the battle start off with
 *   a chance for preemptive, surprise, or no advantages (calculated normally).
 *
 * ---
 * 
 * === Event Encounter-Related Notetags ===
 * 
 * ---
 *
 * <Follower Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This event can trigger by touching a follower instead of only the player.
 *
 * ---
 *
 * <Encounter Direction Lock>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Normally when an event triggers without Direction Fix, it will face the
 *   player character. This tag prevents the event from facing the player, but
 *   still allows the event to freely turn directions.
 * - This is best used in conjunction with the Conditional Branch scripts.
 *
 * ---
 * 
 * === Alert-Related Notetags ===
 * 
 * ---
 *
 * <Alert>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - This will use the default settings unless changed by other tags.
 *
 * ---
 *
 * <Alert Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Changes the event's alert detection range to 'x' tiles.
 * - Replace 'x' with a number value representing the number of tiles to use
 *   for its detection range.
 *
 * ---
 *
 * <Alert Dash>
 * <Alert Walk>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - If alerted, the event will dash/walk instead of whatever is set as a
 *   default setting within the Plugin Parameters.
 *
 * ---
 *
 * <Alert Time: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - This determines the amount of time in frames for the event to chase the
 *   player continuously while the player is outside of the detection range.
 * - Replace 'x' with a number value representing the number of frames for the
 *   event to keep chasing the player with.
 * - If the player steps back into the alert detection range, the timer will be
 *   reset.
 *
 * ---
 * 
 * <Alert FoV Angle: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the Field of View angle to 'x' for the event.
 * - Replace 'x' with a number value representing the degrees of for the field
 *   of view angle used by the event to detect players.
 * - The angle will always be centered to the event's line of sight.
 * 
 * ---
 * 
 * <Alert Show FoV>
 * <Alert Hide FoV>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Shows/hides the field of view for the event.
 * - If an event's field of view is hidden, it can still chase players when
 *   entering the event's range.
 * 
 * ---
 *
 * <Alert Response: chase>
 * <Alert Response: rush>
 * <Alert Response: flee>
 * <Alert Response: random>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - This determines how an alerted event will react.
 * - Chase: Use path finding to find a route to the player
 * - Rush: Rush directly at the player
 * - Flee: Run away from the player
 * - Random: Move in random directions
 *
 * ---
 *
 * <Response Balloon: name>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Determines the balloon displayed when initially alerted and responding.
 * - Replace 'name' with any of the following:
 *   - None
 *   - Exclamation
 *   - Question
 *   - Music Note
 *   - Heart
 *   - Angle
 *   - Sweat
 *   - Frustration
 *   - Silence
 *   - Light Bulb
 *   - Zzz
 *   - User-defined 1
 *   - User-defined 2
 *   - User-defined 3
 *   - User-defined 4
 *   - User-defined 5
 *
 * ---
 *
 * <Alert React Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - When initially alerted, there is a small window of waiting before starting
 *   the chase.
 * - Replace 'x' with a number representing the number of frames for the
 *   initial reaction delay.
 *
 * ---
 *
 * <Alert Common Event: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Runs a Common Event when initially alerted.
 * - Replace 'x' with a number representing the ID of the Common Event to run.
 * - Use 0 to run no Common Events.
 *
 * ---
 *
 * <Alert Sound Name: name>
 * <Alert Sound Volume: x>
 * <Alert Sound Pitch: y>
 * <Alert Sound Pan: z>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Play this sound effect when the event is initially alerted.
 * - Replace 'name' with the filename of the sound effect found in /audio/se/
 *   to play. Do NOT include the file extension.
 * - Replace 'x' with a number representing the volume of the sound effect.
 * - Replace 'y' with a number representing the pitch of the sound effect.
 * - Replace 'z' with a number representing the pan of the sound effect.
 *
 * ---
 *
 * <Return Position>
 * <Stay Position>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Decide if the event will return back to its initial position after an
 *   alert chase is over.
 * - Or if it will stay where it currently is.
 *
 * ---
 *
 * <Return Time: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - This is the amount of time spent (in frames) after an alert chase is over
 *   but returning back to the event's original position.
 * - Replace 'x' with a number representing the number of frames for the
 *   duration between idling and returning.
 *
 * ---
 *
 * <Idle Balloon: name>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Determines the balloon displayed when beginning the idle phase after an
 *   alert chase is over but before returning back to the original position.
 * - Replace 'name' with any of the following:
 *   - None
 *   - Exclamation
 *   - Question
 *   - Music Note
 *   - Heart
 *   - Angle
 *   - Sweat
 *   - Frustration
 *   - Silence
 *   - Light Bulb
 *   - Zzz
 *   - User-defined 1
 *   - User-defined 2
 *   - User-defined 3
 *   - User-defined 4
 *   - User-defined 5
 *
 * ---
 *
 * <Returning Balloon: name>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Determines the balloon displayed when the event starts returning back to
 *   the event's original position.
 * - Replace 'name' with any of the following:
 *   - None
 *   - Exclamation
 *   - Question
 *   - Music Note
 *   - Heart
 *   - Angle
 *   - Sweat
 *   - Frustration
 *   - Silence
 *   - Light Bulb
 *   - Zzz
 *   - User-defined 1
 *   - User-defined 2
 *   - User-defined 3
 *   - User-defined 4
 *   - User-defined 5
 *
 * ---
 * 
 * === Alert Vision Blocking-Related Notetags ===
 * 
 * ---
 *
 * <Block Vision Tag: x>
 * <Block Vision Tags: x, x, x>
 *
 * - Used for: Tileset and Map Notetags
 * - When using a specific tileset or on a specific map, tiles marked with the
 *   terrain tag 'x' will obscure the line of sight from the event to the
 *   player character.
 * - Replace 'x' with a number value representing the terrain tag used.
 * - This does NOT change the Field of View Alert Detection Range graphic.
 *
 * ---
 *
 * <Block Vision Region: x>
 * <Block Vision Regions: x, x, x>
 *
 * - Used for: Tileset and Map Notetags
 * - When using a specific tileset or on a specific map, tiles marked with the
 *   region ID 'x' will obscure the line of sight from the event to the
 *   player character.
 * - Replace 'x' with a number value representing the region ID used.
 * - This does NOT change the Field of View Alert Detection Range graphic.
 *
 * ---
 *
 * ============================================================================
 * Conditional Branch Usage
 * ============================================================================
 * 
 * For those wanting to use Conditional Branch event commands with this plugin
 * the following functions into the "Script" input fields of the respective
 * event commands.
 * 
 * === Conditional Branch Script Functions ===
 * 
 * These are newly added JavaScript functions that return a true/false value.
 * The functions are best used with the Conditional Branch script input field.
 * 
 * ---
 * 
 * this.checkEventFacingPlayerFront()
 * 
 * - Returns true if the event is facing the player's front.
 * 
 * ---
 * 
 * this.checkEventFacingPlayerBack()
 * 
 * - Returns true if the event is facing the player's back.
 * - Best used with a Surprise attack.
 * 
 * ---
 * 
 * this.checkEventFacingPlayerSide()
 * 
 * - Returns true if the event is facing the player's side.
 * 
 * ---
 * 
 * this.checkPlayerFacingEventFront()
 * 
 * - Returns true if the player is facing the event's front.
 * 
 * ---
 * 
 * this.checkPlayerFacingEventBack()
 * 
 * - Returns true if the player is facing the event's back.
 * - Best used with a Preemptive attack.
 * 
 * ---
 * 
 * this.checkPlayerFacingEventSide()
 * 
 * - Returns true if the player is facing the event's side.
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
 * === Advantage Plugin Commands ===
 * 
 * ---
 *
 * Advantage: Add to Queue
 * - Add (at the end) to the existing advantage queue the following encounter
 *  advantages for the upcoming battles.
 *
 *   Queue:
 *   - Add to the queue the following advantage options for the
 *     upcoming battles.
 *     - Preemptive (Player gains turn advantage)
 *     - Surprise (Enemies gain turn advantage)
 *     - No Advantage (Neither party has advantage)
 *     - Chance (Random encounter advantage chance)
 *
 * ---
 *
 * Advantage: Set Queue
 * - Declare the exact advantage queue for the upcoming battles.
 *
 *   Queue:
 *   - Add to the queue the following advantage options for the
 *     upcoming battles.
 *     - Preemptive (Player gains turn advantage)
 *     - Surprise (Enemies gain turn advantage)
 *     - No Advantage (Neither party has advantage)
 *     - Chance (Random encounter advantage chance)
 *
 * ---
 *
 * Advantage: Reset Queue
 * - Resets the advantage queue for battles.
 *
 * ---
 * 
 * === Alert Plugin Commands ===
 * 
 * ---
 *
 * Alert: Stealth Mode
 * - Changes the stealth mode setting for the player.
 *
 *   Stealth Mode:
 *   - If Stealth Mode is on, bypass unnoticed alerts.
 *   - Already alerted events will stay alert.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Advantage Settings
 * ============================================================================
 *
 * Advantage common event settings related to enemy encounters.
 *
 * ---
 *
 * Settings
 * 
 *   Preemptive Event:
 *   - Run this Common Event upon a preemptive advantage.
 *   - Use 0 to run no Common Events.
 * 
 *   Surprise Event:
 *   - Run this Common Event upon a surprise advantage.
 *   - Use 0 to run no Common Events.
 * 
 *   No Advantage Event:
 *   - Run this Common Event when no advantage is given.
 *   - Use 0 to run no Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Alert Settings
 * ============================================================================
 *
 * These are settings for alerting events. Used mainly for events chasing the
 * player.
 * 
 * How alert detection works is when the player steps with an event (who has
 * an alert notetag or comment tag), the event will enter alert mode. At the
 * very start, a response balloon will play along with an initialy delay. If
 * there is a common event set, the common event will play immediately.
 * 
 * After the initial delay is over, the event will begin its chasing phase.
 * Although it's called the chasing phase, it can react differently by using
 * path finding to find a way to the player, rushing directly in a straight
 * line at the player, running away from the player, or moving about randomly.
 * 
 * If the player stays out of the event's alert detection range for a specific
 * amount of time, the event will enter its idle phase. An idle balloon will
 * play and the event will wait a short duration.
 * 
 * After this short duration is over, the event will return back to its
 * original position (if desired). Upon starting its return to its original
 * position, it will play the returning balloon.
 * 
 * During the idle and return phases, if the player steps in range of the
 * event's alert range, it will begin the chase all over again.
 *
 * ---
 *
 * Alert
 * 
 *   Detection Range:
 *   - Default tile range for event to detect the player in.
 * 
 *   Alert Dash:
 *   - Alerted events use dashing speed.
 * 
 *   Alert Time:
 *   - Number of frames the alerted event will attempt to chase the player.
 *
 * ---
 *
 * Field of View
 * 
 *   Angle Range:
 *   - The angle range used to determine the event's field of view.
 * 
 *   Show Range:
 *   - Show the field of view of events?
 * 
 *   Color 1:
 *   Color 2:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Response
 * 
 *   Response Type:
 *   - What kind of default response behavior do you want?
 *     - Chase: Use path finding to find a route to the player
 *     - Rush: Rush directly at the player
 *     - Flee: Run away from the player
 *     - Random: Move in random directions
 * 
 *   Response Balloon:
 *   - What kind of balloon should the event play when detecting the player?
 * 
 *   Common Event:
 *   - Run this Common Event when the player is detected.
 *   - Use 0 for no Common Event.
 * 
 *   Reaction Delay:
 *   - Number of frames for the event to stand still before beginning
 *     the chase.
 *
 * ---
 *
 * Sound
 * 
 *   Filename:
 *   - Filename of the sound effect played when alerted.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * Return
 * 
 *   Return Home:
 *   - After finishing a chase, return back to the home position?
 * 
 *   Idle Wait:
 *   - Number of frames to wait before returning home.
 * 
 *   Idle Balloon:
 *   - Play this balloon when an event is about to return.
 * 
 *   Returning Balloon:
 *   - Play this balloon when an event begins returning.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Encounter Multipliers
 * ============================================================================
 *
 * Encounter multiplier settings regarding enemy encounters.
 *
 * ---
 *
 * Bush Multiplier
 * 
 *   Parameter:
 *   - Multiplier for how fast encounters occur by when the player is walking
 *     through bushes.
 * 
 *   Boat Multiplier:
 *   - Multiplier for how fast encounters occur by when the player is
 *     traveling via boat.
 * 
 *   Ship Multiplier:
 *   - Multiplier for how fast encounters occur by when the player is
 *     traveling via ship.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Repel/Lure Settings
 * ============================================================================
 *
 * Repel/Lure settings regarding enemy encounters.
 *
 * ---
 *
 * Settings
 * 
 *   Repel Variable:
 *   - Select a variable where if the value is above 0, it will
 *     repel encounters.
 *   - Each step reduces variable value by 1.
 * 
 *   Wear Off Common Event:
 *   - Run this Common Event when Repel reaches 0.
 *   - Use 0 to run no Common Events.
 *
 * ---
 *
 * Settings
 * 
 *   Lure Variable:
 *   - Select a variable where if the value is above 0, it will
 *     lure encounters.
 *   - Each step reduces variable value by 1.
 * 
 *   Wear Off Common Event:
 *   - Run this Common Event when Lure reaches 0.
 *   - Use 0 to run no Common Events.
 * 
 *   Lure Multiplier:
 *   - Multiplier for how fast encounters occur by when the lure
 *     effect is active.
 * 
 *   Lure Increase:
 *   - Flat increase for how fast encounters occur by when the lure
 *     effect is active.
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
 * Version 1.09: September 15, 2022
 * * Compatibility Update!
 * ** This plugin now works better with the Events and Movement Core's stop
 *    event movement plugin parameters and commands. Update made by Arisu.
 * 
 * Version 1.08: February 17, 2022
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.07: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: August 20, 2021
 * * Compatibility Update!
 * ** Better compatibility with Event and Movement Core's spawn functions.
 *    Update made by Arisu.
 * 
 * Version 1.05: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for features that were left out by accident.
 * *** Notetag/Comment Tag: <Alert FoV Angle: x>
 * *** Notetag/Comment Tag: <Alert Hide FoV>
 * *** Notetag/Comment Tag: <Alert Show FoV>
 * 
 * Version 1.04: December 11, 2020
 * * Bug Fixes!
 * ** Without the Events and Movement Core, events returning home after a
 *    failed alert chase will no longer crash the game.
 *    Fix by Yanfly and Shiro.
 * 
 * Version 1.03: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: November 29, 2020
 * * Feature Update!
 * ** Initialization of the encounter effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu and Shaz.
 * 
 * Version 1.01: November 22, 2020
 * * Bug Fixes!
 * ** Certain notetags will no longer cause crashes. Fix made by Yanfly.
 * ** Erased events will have their alert sprite removed, too. Fix made by
 *    Yanfly.
 *
 * Version 1.00: December 11, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AdvantageAddQueue
 * @text Advantage: Add to Queue
 * @desc Add (at the end) to the existing advantage queue the following
 * encounter advantages for the upcoming battles.
 *
 * @arg Queue:arraystr
 * @text Queue
 * @type select[]
 * @option Preemptive (Player gains turn advantage)
 * @value preemptive
 * @option Surprise (Enemies gain turn advantage)
 * @value surprise
 * @option No Advantage (Neither party has advantage)
 * @value no advantage
 * @option Chance (Random encounter advantage chance)
 * @value chance
 * @desc Add to the queue the following advantage options for
 * the upcoming battles.
 * @default ["preemptive"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AdvantageSetQueue
 * @text Advantage: Set Queue
 * @desc Declare the exact advantage queue for the upcoming battles.
 *
 * @arg Queue:arraystr
 * @text Queue
 * @type select[]
 * @option Preemptive (Player gains turn advantage)
 * @value preemptive
 * @option Surprise (Enemies gain turn advantage)
 * @value surprise
 * @option No Advantage (Neither party has advantage)
 * @value no advantage
 * @option Chance (Random encounter advantage chance)
 * @value chance
 * @desc Change the queue to the following advantage options for
 * the upcoming battles.
 * @default ["preemptive"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AdvantageResetQueue
 * @text Advantage: Reset Queue
 * @desc Resets the advantage queue for battles.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AlertStealthMode
 * @text Alert: Stealth Mode
 * @desc Changes the stealth mode setting for the player.
 *
 * @arg StealthMode:eval
 * @text Stealth Mode
 * @type boolean
 * @on Stealth On
 * @off No Steath
 * @desc If Stealth Mode is on, bypass unnoticed alerts.
 * Already alerted events will stay alert.
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
 * @param EncounterEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Advantage:struct
 * @text Advantage Settings
 * @type struct<Advantage>
 * @desc Advantage common event settings related to enemy encounters.
 * @default {"Preemptive:num":"0","Surprise:num":"0","Normal:num":"0"}
 *
 * @param Alert:struct
 * @text Alert Settings
 * @type struct<Alert>
 * @desc Settings alerting events. Used mainly for events chasing the player.
 * @default {"Alert":"","AlertRange:num":"4","AlertDash:eval":"true","AlertLock:num":"600","FoV":"","FovAngle:num":"120","ShowFoV:eval":"true","FovColor1:str":"rgba(255, 0, 0, 0)","FovColor2:str":"rgba(255, 0, 0, 0.5)","Response":"","ResponseType:str":"chase","ResponseBalloon:str":"Exclamation","CommonEvent:num":"0","ReactDelay:num":"80","Sound":"","SoundName:str":"Attack1","SoundVolume:num":"90","SoundPitch:num":"120","SoundPan:num":"0","Return":"","ReturnHome:eval":"true","ReturnWait:num":"180","ReturnStartBalloon:str":"Silence","ReturnEndBalloon:str":"Frustration"}
 *
 * @param EncounterMultiplier:struct
 * @text Encounter Multipliers
 * @type struct<EncounterMultiplier>
 * @desc Encounter multiplier settings regarding enemy encounters.
 * @default {"BushMultiplier:num":"2.00","BoatMultiplier:num":"1.00","ShipMultiplier:num":"0.50"}
 *
 * @param RepelLure:struct
 * @text Repel/Lure Settings
 * @type struct<RepelLure>
 * @desc Repel/Lure settings regarding enemy encounters.
 * @default {"RepelVariable:num":"31","RepelEvent:num":"6","LureVariable:num":"32","LureEvent:num":"8","LureRate:num":"4.0","LureFlat:num":"1"}
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
 * Advantage Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Advantage:
 *
 * @param Preemptive:num
 * @text Preemptive Event
 * @parent Advantage
 * @type common_event
 * @desc Run this Common Event upon a preemptive advantage.
 * Use 0 to run no Common Events.
 * @default 0
 *
 * @param Surprise:num
 * @text Surprise Event
 * @parent Advantage
 * @type common_event
 * @desc Run this Common Event upon a surprise advantage.
 * Use 0 to run no Common Events.
 * @default 0
 *
 * @param Normal:num
 * @text No Advantage Event
 * @parent Advantage
 * @type common_event
 * @desc Run this Common Event when no advantage is given.
 * Use 0 to run no Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Alert Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Alert:
 *
 * @param Alert
 * 
 * @param AlertRange:num
 * @text Detection Range
 * @parent Alert
 * @type number
 * @min 1
 * @desc Default tile range for event to detect the player in.
 * @default 4
 *
 * @param AlertDash:eval
 * @text Alert Dash
 * @parent Alert
 * @type boolean
 * @on Dash
 * @off Walk
 * @desc Alerted events use dashing speed.
 * @default true
 * 
 * @param AlertLock:num
 * @text Alert Time
 * @parent Alert
 * @type number
 * @min 1
 * @desc Number of frames the alerted event will attempt to chase the player.
 * @default 600
 *
 * @param FoV
 * @text Field of View
 * 
 * @param FovAngle:num
 * @text Angle Range
 * @parent FoV
 * @type number
 * @min 1
 * @max 360
 * @desc The angle range used to determine the event's field of view.
 * @default 120
 *
 * @param ShowFoV:eval
 * @text Show Range
 * @parent FoV
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the field of view of events?
 * @default true
 *
 * @param FovColor1:str
 * @text Color 1
 * @parent FoV
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(255, 0, 0, 0)
 *
 * @param FovColor2:str
 * @text Color 2
 * @parent FoV
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(255, 0, 0, 0.5)
 *
 * @param Response
 *
 * @param ResponseType:str
 * @text Response Type
 * @parent Response
 * @type select
 * @option Chase: Use path finding to find a route to the player
 * @value chase
 * @option Rush: Rush directly at the player
 * @value rush
 * @option Flee: Run away from the player
 * @value flee
 * @option Random: Move in random directions
 * @value random
 * @desc What kind of default response behavior do you want?
 * @default chase
 *
 * @param ResponseBalloon:str
 * @text Response Balloon
 * @parent Response
 * @type select
 * @option Exclamation
 * @option Question
 * @option Music Note
 * @option Heart
 * @option Angle
 * @option Sweat
 * @option Frustration
 * @option Silence
 * @option Light Bulb
 * @option Zzz
 * @option User-defined 1
 * @option User-defined 2
 * @option User-defined 3
 * @option User-defined 4
 * @option User-defined 5
 * @desc What kind of balloon should the event play when detecting the player?
 * @default Exclamation
 *
 * @param CommonEvent:num
 * @text Common Event
 * @parent Response
 * @type common_event
 * @desc Run this Common Event when the player is detected.
 * Use 0 for no Common Event.
 * @default 0
 * 
 * @param ReactDelay:num
 * @text Reaction Delay
 * @parent Response
 * @type number
 * @min 1
 * @desc Number of frames for the event to stand still before beginning the chase.
 * @default 80
 *
 * @param Sound
 *
 * @param SoundName:str
 * @text Filename
 * @type file
 * @parent Sound
 * @dir audio/se/
 * @desc Filename of the sound effect played when alerted.
 * @default Attack1
 *
 * @param SoundVolume:num
 * @text Volume
 * @type number
 * @parent Sound
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param SoundPitch:num
 * @text Pitch
 * @type number
 * @parent Sound
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param SoundPan:num
 * @text Pan
 * @parent Sound
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param Return
 *
 * @param ReturnHome:eval
 * @text Return Home
 * @parent Return
 * @type boolean
 * @on Return
 * @off Stay
 * @desc After finishing a chase, return back to the home position?
 * @default true
 * 
 * @param ReturnWait:num
 * @text Idle Wait
 * @parent Return
 * @type number
 * @min 1
 * @desc Number of frames to wait before returning home.
 * @default 180
 *
 * @param ReturnStartBalloon:str
 * @text Idle Balloon
 * @parent Return
 * @type select
 * @option Exclamation
 * @option Question
 * @option Music Note
 * @option Heart
 * @option Angle
 * @option Sweat
 * @option Frustration
 * @option Silence
 * @option Light Bulb
 * @option Zzz
 * @option User-defined 1
 * @option User-defined 2
 * @option User-defined 3
 * @option User-defined 4
 * @option User-defined 5
 * @desc Play this balloon when an event is about to return.
 * @default Silence
 *
 * @param ReturnEndBalloon:str
 * @text Returning Balloon
 * @parent Return
 * @type select
 * @option Exclamation
 * @option Question
 * @option Music Note
 * @option Heart
 * @option Angle
 * @option Sweat
 * @option Frustration
 * @option Silence
 * @option Light Bulb
 * @option Zzz
 * @option User-defined 1
 * @option User-defined 2
 * @option User-defined 3
 * @option User-defined 4
 * @option User-defined 5
 * @desc Play this balloon when an event begins returning.
 * @default Frustration
 *
 */
/* ----------------------------------------------------------------------------
 * Encounter Multipliers Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EncounterMultiplier:
 *
 * @param BushMultiplier:num
 * @text Bush Multiplier
 * @desc Multiplier for how fast encounters occur by when the
 * player is walking through bushes.
 * @default 2.00
 *
 * @param BoatMultiplier:num
 * @text Boat Multiplier
 * @desc Multiplier for how fast encounters occur by when the
 * player is traveling via boat.
 * @default 1.00
 *
 * @param ShipMultiplier:num
 * @text Ship Multiplier
 * @desc Multiplier for how fast encounters occur by when the
 * player is traveling via ship.
 * @default 0.50
 *
 */
/* ----------------------------------------------------------------------------
 * Repel/Lure Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~RepelLure:
 *
 * @param RepelVariable:num
 * @text Repel Variable
 * @parent Repel/Lure
 * @type variable
 * @desc Select a variable where if the value is above 0, it will
 * repel encounters. Each step reduces variable value by 1.
 * @default 0
 *
 * @param RepelEvent:num
 * @text Wear Off Common Event
 * @parent RepelVariable:num
 * @type common_event
 * @desc Run this Common Event when Repel reaches 0.
 * Use 0 to run no Common Events.
 * @default 0
 *
 * @param LureVariable:num
 * @text Lure Variable
 * @parent Repel/Lure
 * @type variable
 * @desc Select a variable where if the value is above 0, it will
 * lure encounters. Each step reduces variable value by 1.
 * @default 0
 *
 * @param LureEvent:num
 * @text Wear Off Common Event
 * @parent LureVariable:num
 * @type common_event
 * @desc Run this Common Event when Lure reaches 0.
 * Use 0 to run no Common Events.
 * @default 0
 *
 * @param LureRate:num
 * @text Lure Multiplier
 * @parent LureVariable:num
 * @desc Multiplier for how fast encounters occur by when the
 * lure effect is active.
 * @default 4.0
 *
 * @param LureFlat:num
 * @text Lure Increase
 * @parent LureVariable:num
 * @desc Flat increase for how fast encounters occur by when the
 * lure effect is active.
 * @default 1
 *
 */
//=============================================================================

const _0xea1d7=_0x48e3;(function(_0x22d9d4,_0x29d1b1){const _0x2c9c9a=_0x48e3,_0x1ffac4=_0x22d9d4();while(!![]){try{const _0x194faf=parseInt(_0x2c9c9a(0x1ae))/0x1*(parseInt(_0x2c9c9a(0xe3))/0x2)+parseInt(_0x2c9c9a(0x144))/0x3*(-parseInt(_0x2c9c9a(0x178))/0x4)+-parseInt(_0x2c9c9a(0xe1))/0x5+parseInt(_0x2c9c9a(0x20a))/0x6+-parseInt(_0x2c9c9a(0x112))/0x7*(parseInt(_0x2c9c9a(0x1ac))/0x8)+-parseInt(_0x2c9c9a(0x1eb))/0x9*(parseInt(_0x2c9c9a(0x218))/0xa)+parseInt(_0x2c9c9a(0x161))/0xb;if(_0x194faf===_0x29d1b1)break;else _0x1ffac4['push'](_0x1ffac4['shift']());}catch(_0x27e288){_0x1ffac4['push'](_0x1ffac4['shift']());}}}(_0x374e,0x1a0d7));function _0x374e(){const _0x3d483b=['fovAngle','BattleCore','isPositionSideOf','needsSmartChaseUpdate','isFacingTowards','vzguS','QUESTION','makeDeepCopy','MTAKM','IacuW','isMovementSucceeded','isPositionFrontOf','updatePosition','actor','checkEventFollowerTriggerTouch','refresh','ANNOYED','returnAfter','getAlertAngleToPlayer','moveAwayFromPlayer','initialize','round','Game_CharacterBase_setBalloonPose',',\x20\x20This\x20Y:\x20','Game_CharacterBase_isDashing','MUSICNOTE','version','min','chance','lock','Game_Player_initMembers','azzym','ANGER','wQcql','61173jFndWm','HCZJT','getAlertAngleToFollower','isPreventSelfMovement','ShipMultiplier','_EncounterEffects_EventChaseData','SGSIm','setDirection','log','RepelLure','AlertRange','BlockVisionTag','parameters','Event\x20X:\x20','map','update','showFov','returnStartBalloon','MUSIC-NOTE','isChaseReturning','_scene','checkPlayerFacingEventBack','followers','initEncounterEffects','getAlertDistanceToTarget','FovColor1','code','fill','alertSoundPitch','2663529YyLhgr','_moveRouteIndex','setupEncounterEffectsCommentTags','visibleFollowers','AlertSoundPan','updateEncounterEffects','getAlertTargets','LIGHTBULB','isDashing','save','_forcedAdvantage','Game_Event_lock','EncounterEffects','Normal','_data','BoatMultiplier','LOVE','updateBitmap','returnTime','LIGHT\x20BULB','destroy','getAlertDistanceToFollower','trim','4oojBkP','initEncounterEffects_ForcedAdvantage','USER-DEFINED\x204','_spriteset','BeelG','restore','setupEncounterEffectsData','setAlertStealthMode','isMoving','updateAngle','setupEncounterEffectsEffects','_characterErased','parent','angle','_alertFovSprite','setBalloonPose','NUM','setupPageSettings','_lightContainerAlertFovSprite','max','debugShowDirections','registerCommand','sin','addColorStop','egoOL','StealthMode','isSupportDiagonalMovement','grdft','isRepelEncounters','ResponseBalloon','checkEncounterEffectsStringTagsChase','Icxaz','uTQgW','GcaRX','returnWaiting','commonEvent','getForcedAdvantage','concat','playerY','KvuaL','setValue','_visible','Queue','sqrt','call','AlertLock','note','bKFiU','RepelVariable','Game_Event_clearPageSettings','push','TUzvR','810040lYvVoV','includes','11EijsrB','CURbu','clearPageSettings','RepelEvent','_EncounterEffectsFollowerTrigger','_character','StSlX','ReactDelay','JFIUH','ARRAYEVAL','_eventAlertChaseCache','checkEventFacingPlayerFront','initEncounterEffectsData','Alert','returning','arc','atan2','XvONq','tileset','moveTo','SoundPan','Sprite_Character_update','isInShip','SoundName','reserveCommonEvent','updateAlertChase','ARRAYFUNC','MUSIC\x20NOTE','returnDir','WjRJS','exit','playSe','ReturnEndBalloon','match','checkEventFacingPlayerSide','_EncounterEffectsTouchDirectionLock','TrZgs','getAlertDistanceToClosest','LqDhD','terrainTag','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','EncounterMultiplier','alertDash','setForcedAdvantage','ConvertBallonTextToID','parse','AlertHideFov','ZZZ','ConvertParams','reactDelay','Game_Map_setup','ARRAYNUM','_alertBlockVisionTags','updateAlert','needsBitmapRedraw','initEventChaseData','Game_Event_checkEventTriggerTouch','ARRAYSTR','BattleManager_startBattle','toLowerCase','runAdvantageCommonEvents','9GwEEZx','BushMultiplier','returnEndBalloon','GLJEo','getAlertAngleToTarget','startBattle','jWPpZ','Player:\x20','value','pow','alertRange','ktAzj','SWEAT','moveTypeRandom','split','MYkKG',',\x20Event\x20Y:\x20','BULB','updateSelfMovementSmartChase','Game_Event_setupPageSettings','isJumping','_source','nHqEl','eventX','checkEventFacingPlayerBack','UDrkh','cos','zkAJL','getAlertDistanceToPlayer','updateSelfMovement','DzWxi','313992AYhUzK','AdvantageSetQueue','ARRAYJSON','SILENCE','LltxV','Game_Event_update','checkForcedAdvantage','urvNl','hasEncounterHalf','format','playerX','chaseTime','Preemptive','_direction','1224710anryMu','lineTo','EVAL','GJFZs','ReturnHome','ReturnWait','constructor','FovColor2','enabled','follower','tileWidth','returnWait','initMembers','_trigger','oCwcN','AdvantageResetQueue','direction','_lightContainer','shift','preemptive','isAlertLineOfVisionClear','STR','ReturnPosition','USER-DEFINED\x202','MMZck','AlertDash','\x20This\x20X:\x20','anchor','ZeNTQ','createFovBitmap','KHdgS','alertSoundName','start','Settings','NwaJU','fillStyle','requestBalloon','_preemptive','isChaseEnabled','drawAlertCircle','reactTime','AlertDefault','processLureEncounters','bEMuB','Game_System_initialize','LureFlat','_surprise','USER-DEFINED\x201','shiftForcedAdvantage','chase','RegExp','turnTowardPlayer','updateAlertReturnWait','isPositionBackOf','QsOYb','CommonEvent','eventY','event','_alertBlockVisionRegions','contains','AlertSoundVolume','alertSoundVolume','chaseData','checkEventTriggerTouch','LureEvent','initEncounterEffectsEffects','checkEncounterEffectsStringTags','isFacingSideways','rwjKm','ReturnStartBalloon','JtLQv','filter','EKVXE','LureVariable','yGGHq','updateSelfMovementReturnFromChase','encounterProgressValue','create','executeMoveDir8','Data:\x20','HaRrP','alertLock','399720UzIpbE','status','24782kSZYJt','troop','eventId','isInBoat','ShowFoV','_erased','NgtjO','isChaseAlerted','zSkyN','FollowerTrigger','return\x200','ExrqJ','Game_Event_updateSelfMovement','bitmap','SQnXF','Surprise','FtTbs','checkPlayerFacingEventSide','AlertStealthMode','rush','STRUCT','BlockVisionRegion','NOTE','surprise','UEAUl','isLureEncounters','LIGHT','setup','findDiagonalDirectionTo','response','Game_Character_turnTowardPlayer','_baseTexture','_alertStealthMode','COBWEB','ltyEn','name','length','processRepelEncounters','isAlertVisionBlocked','MUSIC','ARRAYSTRUCT','updateAlertIdle','no\x20advantage','getAlertStealthMode','_processEncounterDirectionLock','alerted','prototype','7giKNev','biHul','alertBalloon','isFacingAway','updateSelfMovementAlerted','StayPosition','xyTxs','addChild','FRUSTRATION','alertSoundPan','description','ResponseType','setupEncounterEffectsNotetags','addForcedAdvantage','ceil','VisuMZ_1_EventsMoveCore'];_0x374e=function(){return _0x3d483b;};return _0x374e();}var label='EncounterEffects',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xea1d7(0xd6)](function(_0x1ea72a){const _0x2d79cf=_0xea1d7;return _0x1ea72a[_0x2d79cf(0xe2)]&&_0x1ea72a[_0x2d79cf(0x11c)][_0x2d79cf(0x1ad)]('['+label+']');})[0x0];function _0x48e3(_0x1fb9e3,_0x3a36cf){const _0x374e0b=_0x374e();return _0x48e3=function(_0x48e31d,_0x2ede1f){_0x48e31d=_0x48e31d-0xd0;let _0x2b1fe8=_0x374e0b[_0x48e31d];return _0x2b1fe8;},_0x48e3(_0x1fb9e3,_0x3a36cf);}VisuMZ[label]['Settings']=VisuMZ[label][_0xea1d7(0x239)]||{},VisuMZ[_0xea1d7(0x1de)]=function(_0x4a54cd,_0x2caea3){const _0x2c6dae=_0xea1d7;for(const _0x135c64 in _0x2caea3){if(_0x2c6dae(0x1b4)===_0x2c6dae(0x226)){const _0x503e8f=_0xd7ceba[_0x2c6dae(0x137)](this['x']+_0x36913b*_0x354f1f[_0x2c6dae(0x205)](_0x180522)),_0x4479b3=_0xf1bee0[_0x2c6dae(0x137)](this['y']+_0x5268ff*_0x4692d7[_0x2c6dae(0x18e)](_0x4cabd8));_0x4704b4-=0x1;_0x3f45e5&&_0x4e6c8f[_0x2c6dae(0x14c)](_0x2c6dae(0xde),_0x615991,_0x4e6a07,_0x503e8f,_0x4479b3);if(_0x283a9b['isAlertVisionBlocked'](_0x503e8f,_0x4479b3))return![];}else{if(_0x135c64['match'](/(.*):(.*)/i)){if('wQcql'===_0x2c6dae(0x143)){const _0x30cc73=String(RegExp['$1']),_0x50eb45=String(RegExp['$2'])['toUpperCase']()[_0x2c6dae(0x177)]();let _0x2ea5f3,_0x4a0121,_0x58bee4;switch(_0x50eb45){case _0x2c6dae(0x188):_0x2ea5f3=_0x2caea3[_0x135c64]!==''?Number(_0x2caea3[_0x135c64]):0x0;break;case _0x2c6dae(0x1e1):_0x4a0121=_0x2caea3[_0x135c64]!==''?JSON[_0x2c6dae(0x1db)](_0x2caea3[_0x135c64]):[],_0x2ea5f3=_0x4a0121[_0x2c6dae(0x152)](_0x26cf69=>Number(_0x26cf69));break;case _0x2c6dae(0x21a):_0x2ea5f3=_0x2caea3[_0x135c64]!==''?eval(_0x2caea3[_0x135c64]):null;break;case _0x2c6dae(0x1b7):_0x4a0121=_0x2caea3[_0x135c64]!==''?JSON[_0x2c6dae(0x1db)](_0x2caea3[_0x135c64]):[],_0x2ea5f3=_0x4a0121[_0x2c6dae(0x152)](_0x23ded9=>eval(_0x23ded9));break;case'JSON':_0x2ea5f3=_0x2caea3[_0x135c64]!==''?JSON[_0x2c6dae(0x1db)](_0x2caea3[_0x135c64]):'';break;case _0x2c6dae(0x20c):_0x4a0121=_0x2caea3[_0x135c64]!==''?JSON[_0x2c6dae(0x1db)](_0x2caea3[_0x135c64]):[],_0x2ea5f3=_0x4a0121[_0x2c6dae(0x152)](_0x44e05e=>JSON[_0x2c6dae(0x1db)](_0x44e05e));break;case'FUNC':_0x2ea5f3=_0x2caea3[_0x135c64]!==''?new Function(JSON['parse'](_0x2caea3[_0x135c64])):new Function(_0x2c6dae(0xed));break;case _0x2c6dae(0x1c8):_0x4a0121=_0x2caea3[_0x135c64]!==''?JSON['parse'](_0x2caea3[_0x135c64]):[],_0x2ea5f3=_0x4a0121[_0x2c6dae(0x152)](_0x10a767=>new Function(JSON[_0x2c6dae(0x1db)](_0x10a767)));break;case _0x2c6dae(0x22d):_0x2ea5f3=_0x2caea3[_0x135c64]!==''?String(_0x2caea3[_0x135c64]):'';break;case _0x2c6dae(0x1e7):_0x4a0121=_0x2caea3[_0x135c64]!==''?JSON[_0x2c6dae(0x1db)](_0x2caea3[_0x135c64]):[],_0x2ea5f3=_0x4a0121[_0x2c6dae(0x152)](_0x53ac63=>String(_0x53ac63));break;case _0x2c6dae(0xf7):_0x58bee4=_0x2caea3[_0x135c64]!==''?JSON[_0x2c6dae(0x1db)](_0x2caea3[_0x135c64]):{},_0x2ea5f3=VisuMZ[_0x2c6dae(0x1de)]({},_0x58bee4);break;case _0x2c6dae(0x10b):_0x4a0121=_0x2caea3[_0x135c64]!==''?JSON[_0x2c6dae(0x1db)](_0x2caea3[_0x135c64]):[],_0x2ea5f3=_0x4a0121[_0x2c6dae(0x152)](_0x32d715=>VisuMZ[_0x2c6dae(0x1de)]({},JSON[_0x2c6dae(0x1db)](_0x32d715)));break;default:continue;}_0x4a54cd[_0x30cc73]=_0x2ea5f3;}else this['initEncounterEffects_ForcedAdvantage']();}}}return _0x4a54cd;},(_0x2f814f=>{const _0x19ffa9=_0xea1d7,_0x29161a=_0x2f814f[_0x19ffa9(0x106)];for(const _0xb42b8d of dependencies){if(!Imported[_0xb42b8d]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x29161a,_0xb42b8d)),SceneManager[_0x19ffa9(0x1cc)]();break;}}const _0x1a9038=_0x2f814f[_0x19ffa9(0x11c)];if(_0x1a9038['match'](/\[Version[ ](.*?)\]/i)){const _0x4e5f39=Number(RegExp['$1']);_0x4e5f39!==VisuMZ[label][_0x19ffa9(0x13c)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x19ffa9(0x213)](_0x29161a,_0x4e5f39)),SceneManager[_0x19ffa9(0x1cc)]());}if(_0x1a9038['match'](/\[Tier[ ](\d+)\]/i)){if('rwjKm'===_0x19ffa9(0xd3)){const _0x244734=Number(RegExp['$1']);if(_0x244734<tier){if(_0x19ffa9(0x234)===_0x19ffa9(0x234))alert(_0x19ffa9(0x1d6)[_0x19ffa9(0x213)](_0x29161a,_0x244734,tier)),SceneManager[_0x19ffa9(0x1cc)]();else{const _0x1d41c7=[0x0,0xe1,0x10e,0x13b,0xb4,0x0,0x0,0x87,0x5a,0x2d][this['direction']()];_0x5b6fff+=_0x1d41c7,_0x21c81a+=this['chaseData']()[_0x19ffa9(0x122)]/0x2;}}else{if(_0x19ffa9(0xf1)===_0x19ffa9(0xf1))tier=Math[_0x19ffa9(0x18b)](_0x244734,tier);else return this[_0x19ffa9(0x149)]===_0x4a0e9b&&this[_0x19ffa9(0x131)](),this[_0x19ffa9(0x149)];}}else{const _0x3ab45c=_0x25478d[_0x19ffa9(0x251)](this[_0x19ffa9(0xe5)]());if(!_0x3ab45c)return![];const _0x4961b1=_0x4471c1;return _0x4961b1[_0x19ffa9(0x126)](_0x3ab45c)&&_0x3ab45c[_0x19ffa9(0x12d)](_0x4961b1);}}VisuMZ['ConvertParams'](VisuMZ[label][_0x19ffa9(0x239)],_0x2f814f[_0x19ffa9(0x150)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0xea1d7(0x106)],'AdvantageAddQueue',_0x36fe31=>{const _0x1b72f2=_0xea1d7;VisuMZ['ConvertParams'](_0x36fe31,_0x36fe31);const _0x55e077=_0x36fe31[_0x1b72f2(0x1a2)];$gameSystem[_0x1b72f2(0x11f)](_0x55e077);}),PluginManager[_0xea1d7(0x18d)](pluginData[_0xea1d7(0x106)],_0xea1d7(0x20b),_0x15788c=>{const _0x41c54f=_0xea1d7;VisuMZ[_0x41c54f(0x1de)](_0x15788c,_0x15788c);const _0x2e3f7c=_0x15788c[_0x41c54f(0x1a2)];$gameSystem[_0x41c54f(0x1d9)](_0x2e3f7c);}),PluginManager[_0xea1d7(0x18d)](pluginData[_0xea1d7(0x106)],_0xea1d7(0x227),_0x216e9d=>{VisuMZ['ConvertParams'](_0x216e9d,_0x216e9d),$gameSystem['setForcedAdvantage']([]);}),PluginManager[_0xea1d7(0x18d)](pluginData[_0xea1d7(0x106)],_0xea1d7(0xf5),_0x4b16aa=>{const _0x5186cf=_0xea1d7;VisuMZ['ConvertParams'](_0x4b16aa,_0x4b16aa);const _0x42f05f=_0x4b16aa[_0x5186cf(0x191)];$gamePlayer[_0x5186cf(0x17f)](_0x42f05f);}),VisuMZ['EncounterEffects'][_0xea1d7(0x24a)]={'Preemptive':/<(?:PREEMPTIVE|PRE-EMPTIVE|PRE EMPTIVE)>/i,'Surprise':/<(?:SURPRISE|SURPRISED)>/i,'NoAdvantage':/<NO ADVANTAGE>/i,'Chance':/<CHANCE>/i,'FollowerTrigger':/<(?:FOLLOWER TRIGGER|FOLLOWERTRIGGER)>/i,'TouchDirectionLock':/<(?:ENCOUNTER LOCK|ENCOUNTER DIRECTION LOCK)>/i,'AlertDefault':/<ALERT>/i,'AlertRange':/<ALERT RANGE:[ ](\d+)>/i,'AlertDash':/<ALERT DASH>/i,'AlertWalk':/<ALERT WALK>/i,'AlertLock':/<ALERT TIME:[ ](\d+)>/i,'AlertFovAngle':/<ALERT FOV ANGLE:[ ](\d+)>/i,'AlertShowFov':/<ALERT SHOW FOV>/i,'AlertHideFov':/<ALERT HIDE FOV>/i,'AlertResponse':/<ALERT RESPONSE:[ ](.*)>/i,'AlertBalloon':/<(?:ALERT|RESPONSE) BALLOON:[ ](.*)>/i,'AlertReactDelay':/<ALERT REACT DELAY:[ ](\d+)>/i,'AlertCommonEvent':/<ALERT COMMON EVENT:[ ](\d+)>/i,'AlertSoundName':/<ALERT SOUND NAME:[ ](.*)>/i,'AlertSoundVolume':/<ALERT SOUND VOLUME:[ ](\d+)>/i,'AlertSoundPitch':/<ALERT SOUND PITCH:[ ](\d+)>/i,'AlertSoundPan':/<ALERT SOUND PAN:[ ](.*)>/i,'ReturnPosition':/<RETURN POSITION>/i,'StayPosition':/<STAY POSITION>/i,'ReturnStartBalloon':/<IDLE BALLOON:[ ](.*)>/i,'ReturnEndBalloon':/<RETURNING BALLOON:[ ](.*)>/i,'ReturnWait':/<RETURN TIME:[ ](\d+)>/i,'BlockVisionTag':/<(?:BLOCK|BLOCKED) VISION (?:TAG|TAGS):[ ](.*)>/i,'BlockVisionRegion':/<(?:BLOCK|BLOCKED) VISION (?:REGION|REGIONS):[ ](.*)>/i},VisuMZ[_0xea1d7(0x16d)][_0xea1d7(0x1e8)]=BattleManager[_0xea1d7(0x1f0)],BattleManager['startBattle']=function(){const _0x4282ef=_0xea1d7;this[_0x4282ef(0x210)](),VisuMZ[_0x4282ef(0x16d)][_0x4282ef(0x1e8)][_0x4282ef(0x1a4)](this),this[_0x4282ef(0x1ea)]();},BattleManager[_0xea1d7(0x210)]=function(){const _0x12be53=_0xea1d7,_0x2eb6c4=$gameSystem[_0x12be53(0x248)]();if(!_0x2eb6c4)return;switch(_0x2eb6c4[_0x12be53(0x1e9)]()[_0x12be53(0x177)]()){case _0x12be53(0x22b):this[_0x12be53(0x23d)]=!![],this[_0x12be53(0x246)]=![];break;case _0x12be53(0xfa):this[_0x12be53(0x23d)]=![],this['_surprise']=!![];break;case _0x12be53(0x10d):this[_0x12be53(0x23d)]=![],this[_0x12be53(0x246)]=![];break;case _0x12be53(0x13e):VisuMZ[_0x12be53(0x123)]['BattleManager_onEncounter'][_0x12be53(0x1a4)](this);break;}},BattleManager[_0xea1d7(0x1ea)]=function(){const _0x3fd91f=_0xea1d7,_0x562ae9=VisuMZ['EncounterEffects'][_0x3fd91f(0x239)]['Advantage'];if(!_0x562ae9)return;let _0x42b8fb=0x0;if(this[_0x3fd91f(0x23d)])_0x42b8fb=_0x562ae9[_0x3fd91f(0x216)]||0x0;else this[_0x3fd91f(0x246)]?_0x3fd91f(0x1bf)!=='vexJu'?_0x42b8fb=_0x562ae9[_0x3fd91f(0xf2)]||0x0:(_0x3a33b2['enabled']=!![],_0xd470d['reactDelay']=_0x5116d8(_0x544e5f['$1'])||0x1,_0x43696c[_0x3fd91f(0x240)]=_0x594e10(_0x11ebc2['$1'])||0x1):_0x42b8fb=_0x562ae9['Normal']||0x0;_0x42b8fb>0x0&&(_0x3fd91f(0x206)!==_0x3fd91f(0x206)?this[_0x3fd91f(0xda)]():$gameTemp[_0x3fd91f(0x1c6)](_0x42b8fb));},VisuMZ['EncounterEffects'][_0xea1d7(0x244)]=Game_System[_0xea1d7(0x111)]['initialize'],Game_System[_0xea1d7(0x111)][_0xea1d7(0x136)]=function(){const _0x3871ff=_0xea1d7;VisuMZ['EncounterEffects'][_0x3871ff(0x244)][_0x3871ff(0x1a4)](this),this['initEncounterEffects_ForcedAdvantage']();},Game_System[_0xea1d7(0x111)]['initEncounterEffects_ForcedAdvantage']=function(){const _0xe0d599=_0xea1d7;this[_0xe0d599(0x16b)]=[];},Game_System['prototype'][_0xea1d7(0x19c)]=function(){const _0x570f70=_0xea1d7;return this[_0x570f70(0x16b)]===undefined&&this[_0x570f70(0x179)](),this['_forcedAdvantage'];},Game_System[_0xea1d7(0x111)][_0xea1d7(0x248)]=function(){const _0x2b4576=_0xea1d7;if($gameTroop&&$gameTroop[_0x2b4576(0xe4)]()){const _0x280c4c=VisuMZ[_0x2b4576(0x16d)][_0x2b4576(0x24a)],_0x4b2bb3=$gameTroop['troop']()['name'];if(_0x4b2bb3[_0x2b4576(0x1cf)](_0x280c4c[_0x2b4576(0x216)]))return _0x2b4576(0x22b);else{if(_0x4b2bb3[_0x2b4576(0x1cf)](_0x280c4c['Surprise'])){if(_0x2b4576(0x1f1)===_0x2b4576(0x21b)){_0xc9e180[_0x2b4576(0x240)]-=0x1;return;}else return _0x2b4576(0xfa);}else{if(_0x4b2bb3[_0x2b4576(0x1cf)](_0x280c4c['NoAdvantage']))return _0x2b4576(0x10d);else{if(_0x4b2bb3[_0x2b4576(0x1cf)](_0x280c4c['Chance']))return _0x2b4576(0x13e);}}}}return this[_0x2b4576(0x19c)]()[_0x2b4576(0x22a)]();},Game_System['prototype'][_0xea1d7(0x1d9)]=function(_0x31123f){const _0x57fd56=_0xea1d7;if(this[_0x57fd56(0x16b)]===undefined){if(_0x57fd56(0x201)!==_0x57fd56(0x201))return _0x57fd56(0xfa);else this['initEncounterEffects_ForcedAdvantage']();}this[_0x57fd56(0x16b)]=_0x31123f;},Game_System[_0xea1d7(0x111)][_0xea1d7(0x11f)]=function(_0x32a2c3){const _0x16ac63=_0xea1d7;this[_0x16ac63(0x16b)]===undefined&&this['initEncounterEffects_ForcedAdvantage'](),this[_0x16ac63(0x16b)]=this[_0x16ac63(0x16b)][_0x16ac63(0x19d)](_0x32a2c3);},VisuMZ[_0xea1d7(0x16d)][_0xea1d7(0x1e0)]=Game_Map[_0xea1d7(0x111)]['setup'],Game_Map[_0xea1d7(0x111)][_0xea1d7(0xfe)]=function(_0x52a9da){const _0x40872a=_0xea1d7;VisuMZ['EncounterEffects'][_0x40872a(0x1e0)]['call'](this,_0x52a9da),this[_0x40872a(0x1ba)](),this[_0x40872a(0x17e)]();},Game_Map[_0xea1d7(0x111)][_0xea1d7(0x1ba)]=function(){const _0x3b1bcb=_0xea1d7;this[_0x3b1bcb(0x1e2)]=[],this[_0x3b1bcb(0x252)]=[];},Game_Map[_0xea1d7(0x111)][_0xea1d7(0x17e)]=function(){const _0x4b5c48=_0xea1d7,_0x2783b4=this[_0x4b5c48(0x1c0)]();if(!_0x2783b4)return;const _0x52e718=VisuMZ[_0x4b5c48(0x16d)][_0x4b5c48(0x24a)],_0x24b2cf=_0x2783b4['note'],_0x12dc01=$dataMap?$dataMap[_0x4b5c48(0x1a6)]:'';if(_0x24b2cf[_0x4b5c48(0x1cf)](_0x52e718['BlockVisionTag'])){const _0x4e70ae=String(RegExp['$1'])['split'](',')[_0x4b5c48(0x152)](_0x594e34=>Number(_0x594e34));this['_alertBlockVisionTags']=this['_alertBlockVisionTags'][_0x4b5c48(0x19d)](_0x4e70ae);}if(_0x24b2cf['match'](_0x52e718['BlockVisionRegion'])){const _0xf1ae8b=String(RegExp['$1'])[_0x4b5c48(0x1f9)](',')[_0x4b5c48(0x152)](_0x12e2cf=>Number(_0x12e2cf));this[_0x4b5c48(0x252)]=this[_0x4b5c48(0x252)][_0x4b5c48(0x19d)](_0xf1ae8b);}if(_0x12dc01[_0x4b5c48(0x1cf)](_0x52e718[_0x4b5c48(0x14f)])){if(_0x4b5c48(0x197)===_0x4b5c48(0x236)){_0x5708bd['ConvertParams'](_0x5c27a0,_0x3f6e23);const _0x369f60=_0x523f2b[_0x4b5c48(0x1a2)];_0x3df99d[_0x4b5c48(0x11f)](_0x369f60);}else{const _0x30cee2=String(RegExp['$1'])[_0x4b5c48(0x1f9)](',')['map'](_0x2333ab=>Number(_0x2333ab));this[_0x4b5c48(0x1e2)]=this[_0x4b5c48(0x1e2)]['concat'](_0x30cee2);}}if(_0x12dc01[_0x4b5c48(0x1cf)](_0x52e718[_0x4b5c48(0xf8)])){if('YWuIB'===_0x4b5c48(0x12a)){const _0x4cb6cb=_0x168026['EncounterEffects'][_0x4b5c48(0x239)][_0x4b5c48(0x14d)];if(!_0x4cb6cb)return![];if(_0x4cb6cb[_0x4b5c48(0x1a8)]<=0x0)return![];const _0x219a94=_0x5672b3[_0x4b5c48(0x1f3)](_0x4cb6cb['RepelVariable'])||0x0;return _0x219a94>0x0;}else{const _0x43c817=String(RegExp['$1'])[_0x4b5c48(0x1f9)](',')[_0x4b5c48(0x152)](_0x31b57c=>Number(_0x31b57c));this[_0x4b5c48(0x252)]=this[_0x4b5c48(0x252)][_0x4b5c48(0x19d)](_0x43c817);}}},Game_Map[_0xea1d7(0x111)][_0xea1d7(0x109)]=function(_0x4d8e2c,_0x19dfb6){const _0x1faede=_0xea1d7;if(this[_0x1faede(0x1e2)]===undefined)return![];if(this['_alertBlockVisionRegions']===undefined)return![];const _0x29214a=this[_0x1faede(0x1d5)](_0x4d8e2c,_0x19dfb6);if(this['_alertBlockVisionTags'][_0x1faede(0x1ad)](_0x29214a))return!![];const _0x5a1de0=this['regionId'](_0x4d8e2c,_0x19dfb6);if(this[_0x1faede(0x252)][_0x1faede(0x1ad)](_0x5a1de0))return!![];return![];},Game_CharacterBase[_0xea1d7(0x111)]['debugShowDirections']=function(_0x3bc1b5){const _0x5d2068=_0xea1d7;return;console['log']('\x20This\x20X:\x20'+this['x']+_0x5d2068(0x139)+this['y']),console[_0x5d2068(0x14c)](_0x5d2068(0x151)+_0x3bc1b5['x']+_0x5d2068(0x1fb)+_0x3bc1b5['y']);},Game_CharacterBase[_0xea1d7(0x111)][_0xea1d7(0x126)]=function(_0x32c2cd){const _0x2956d6=_0xea1d7;switch(this[_0x2956d6(0x228)]()){case 0x1:return[0x8,0x9,0x6][_0x2956d6(0x253)](_0x32c2cd[_0x2956d6(0x228)]());case 0x2:return[0x7,0x8,0x9][_0x2956d6(0x253)](_0x32c2cd['direction']());case 0x3:return[0x4,0x7,0x8][_0x2956d6(0x253)](_0x32c2cd['direction']());case 0x4:return[0x9,0x6,0x3][_0x2956d6(0x253)](_0x32c2cd['direction']());case 0x6:return[0x7,0x4,0x1][_0x2956d6(0x253)](_0x32c2cd[_0x2956d6(0x228)]());case 0x7:return[0x2,0x3,0x6][_0x2956d6(0x253)](_0x32c2cd[_0x2956d6(0x228)]());case 0x8:return[0x1,0x2,0x3][_0x2956d6(0x253)](_0x32c2cd[_0x2956d6(0x228)]());case 0x9:return[0x4,0x1,0x2][_0x2956d6(0x253)](_0x32c2cd[_0x2956d6(0x228)]());}return![];},Game_CharacterBase[_0xea1d7(0x111)]['isFacingAway']=function(_0x16a0f5){const _0x2bda25=_0xea1d7;switch(this[_0x2bda25(0x228)]()){case 0x1:return[0x4,0x1,0x2][_0x2bda25(0x253)](_0x16a0f5[_0x2bda25(0x228)]());case 0x2:return[0x1,0x2,0x3][_0x2bda25(0x253)](_0x16a0f5[_0x2bda25(0x228)]());case 0x3:return[0x2,0x3,0x6][_0x2bda25(0x253)](_0x16a0f5[_0x2bda25(0x228)]());case 0x4:return[0x7,0x4,0x1]['contains'](_0x16a0f5[_0x2bda25(0x228)]());case 0x6:return[0x9,0x6,0x3]['contains'](_0x16a0f5['direction']());case 0x7:return[0x4,0x7,0x8][_0x2bda25(0x253)](_0x16a0f5[_0x2bda25(0x228)]());case 0x8:return[0x7,0x8,0x9][_0x2bda25(0x253)](_0x16a0f5['direction']());case 0x9:return[0x8,0x9,0x6][_0x2bda25(0x253)](_0x16a0f5['direction']());}return![];},Game_CharacterBase[_0xea1d7(0x111)]['isFacingSideways']=function(_0x25b6b2){const _0x3279dc=_0xea1d7;switch(this['direction']()){case 0x1:return[0x4,0x7,0x8,0x2,0x3,0x6][_0x3279dc(0x253)](_0x25b6b2[_0x3279dc(0x228)]());case 0x2:return[0x7,0x4,0x1,0x9,0x6,0x3][_0x3279dc(0x253)](_0x25b6b2[_0x3279dc(0x228)]());case 0x3:return[0x4,0x1,0x2,0x8,0x9,0x6][_0x3279dc(0x253)](_0x25b6b2['direction']());case 0x4:return[0x7,0x8,0x9,0x1,0x2,0x3]['contains'](_0x25b6b2[_0x3279dc(0x228)]());case 0x6:return[0x7,0x8,0x9,0x1,0x2,0x3][_0x3279dc(0x253)](_0x25b6b2[_0x3279dc(0x228)]());case 0x7:return[0x4,0x1,0x2,0x8,0x9,0x6][_0x3279dc(0x253)](_0x25b6b2[_0x3279dc(0x228)]());case 0x8:return[0x7,0x4,0x1,0x9,0x6,0x3][_0x3279dc(0x253)](_0x25b6b2['direction']());case 0x9:return[0x4,0x7,0x8,0x2,0x3,0x6]['contains'](_0x25b6b2[_0x3279dc(0x228)]());}return![];},Game_CharacterBase[_0xea1d7(0x111)][_0xea1d7(0x12d)]=function(_0x23990f){const _0x1917ea=_0xea1d7;this[_0x1917ea(0x18c)](_0x23990f);switch(this[_0x1917ea(0x228)]()){case 0x1:return _0x23990f['y']>this['y'];case 0x2:return _0x23990f['y']>this['y'];case 0x3:return _0x23990f['y']>this['y'];case 0x4:return _0x23990f['x']<this['x'];case 0x6:return _0x23990f['x']>this['x'];case 0x7:return _0x23990f['y']<this['y'];case 0x8:return _0x23990f['y']<this['y'];case 0x9:return _0x23990f['y']<this['y'];}return![];},Game_CharacterBase['prototype'][_0xea1d7(0x24d)]=function(_0x168896){const _0x2b4089=_0xea1d7;this[_0x2b4089(0x18c)](_0x168896);switch(this['direction']()){case 0x1:return _0x168896['y']<this['y'];case 0x2:return _0x168896['y']<this['y'];case 0x3:return _0x168896['y']<this['y'];case 0x4:return _0x168896['x']>this['x'];case 0x6:return _0x168896['x']<this['x'];case 0x7:return _0x168896['y']>this['y'];case 0x8:return _0x168896['y']>this['y'];case 0x9:return _0x168896['y']>this['y'];}return![];},Game_CharacterBase[_0xea1d7(0x111)][_0xea1d7(0x124)]=function(_0xd742f5){this['debugShowDirections'](_0xd742f5);switch(this['direction']()){case 0x1:return this['x']<_0xd742f5['x']&&this['y']>_0xd742f5['y']||this['x']>_0xd742f5['x']&&this['y']<_0xd742f5['y'];case 0x2:return this['x']!==_0xd742f5['x'];case 0x3:return this['x']>_0xd742f5['x']&&this['y']>_0xd742f5['y']||this['x']<_0xd742f5['x']&&this['y']<_0xd742f5['y'];case 0x4:return this['y']!==_0xd742f5['y'];break;case 0x6:return this['y']!==_0xd742f5['y'];break;case 0x7:return this['x']>_0xd742f5['x']&&this['y']>_0xd742f5['y']||this['x']<_0xd742f5['x']&&this['y']<_0xd742f5['y'];case 0x8:return this['x']!==_0xd742f5['x'];case 0x9:return this['x']<_0xd742f5['x']&&this['y']>_0xd742f5['y']||this['x']>_0xd742f5['x']&&this['y']<_0xd742f5['y'];}return![];},VisuMZ[_0xea1d7(0x16d)][_0xea1d7(0x140)]=Game_Player['prototype'][_0xea1d7(0x224)],Game_Player[_0xea1d7(0x111)]['initMembers']=function(){const _0x2f8c75=_0xea1d7;VisuMZ[_0x2f8c75(0x16d)][_0x2f8c75(0x140)][_0x2f8c75(0x1a4)](this),this['initEncounterEffects']();},Game_Player[_0xea1d7(0x111)][_0xea1d7(0x15b)]=function(){const _0x1dbb96=_0xea1d7;this[_0x1dbb96(0x103)]=![];},Game_Player['prototype'][_0xea1d7(0x10e)]=function(){const _0x3ceb8c=_0xea1d7;return this[_0x3ceb8c(0x103)]===undefined&&this[_0x3ceb8c(0x15b)](),this[_0x3ceb8c(0x103)];},Game_Player['prototype']['setAlertStealthMode']=function(_0x234ec6){const _0xd96d76=_0xea1d7;this[_0xd96d76(0x103)]===undefined&&this[_0xd96d76(0x15b)](),this[_0xd96d76(0x103)]=_0x234ec6;},Game_Player[_0xea1d7(0x111)][_0xea1d7(0xdb)]=function(){const _0x28dbbf=_0xea1d7;if(this['isRepelEncounters']())return this[_0x28dbbf(0x108)](),0x0;const _0x57b92c=VisuMZ[_0x28dbbf(0x16d)]['Settings'][_0x28dbbf(0x1d7)];if(!_0x57b92c)return 0x1;let _0x586035=0x1;$gameMap['isBush'](this['x'],this['y'])&&(_0x586035*=_0x57b92c[_0x28dbbf(0x1ec)]);$gameParty[_0x28dbbf(0x212)]()&&(_0x586035*=0.5);if(this[_0x28dbbf(0xe6)]()){if(_0x28dbbf(0x24e)!==_0x28dbbf(0xf3))_0x586035*=_0x57b92c[_0x28dbbf(0x170)];else{const _0x418251=this[_0x28dbbf(0x16f)];let _0x3c5684=_0x418251[_0x28dbbf(0x122)]/-0x2;_0x3c5684+=[0x0,0x87,0x5a,0x2d,0xb4,0x0,0x0,0xe1,0x10e,0x13b][this['_character']['_direction']],this[_0x28dbbf(0x185)]=_0x3c5684;}}return this[_0x28dbbf(0x1c4)]()&&(_0x586035*=_0x57b92c[_0x28dbbf(0x148)]),this[_0x28dbbf(0xfc)]()&&(_0x586035=this[_0x28dbbf(0x242)](_0x586035)),_0x586035;},Game_Player[_0xea1d7(0x111)][_0xea1d7(0x194)]=function(){const _0x22667b=_0xea1d7,_0x5d509b=VisuMZ[_0x22667b(0x16d)][_0x22667b(0x239)]['RepelLure'];if(!_0x5d509b)return![];if(_0x5d509b[_0x22667b(0x1a8)]<=0x0)return![];const _0x47083c=$gameVariables[_0x22667b(0x1f3)](_0x5d509b[_0x22667b(0x1a8)])||0x0;return _0x47083c>0x0;},Game_Player[_0xea1d7(0x111)][_0xea1d7(0x108)]=function(){const _0x1b0035=_0xea1d7,_0x4f2ee8=VisuMZ[_0x1b0035(0x16d)][_0x1b0035(0x239)][_0x1b0035(0x14d)];if(!_0x4f2ee8)return;if(_0x4f2ee8[_0x1b0035(0x1a8)]<=0x0)return;let _0x29f907=$gameVariables[_0x1b0035(0x1f3)](_0x4f2ee8['RepelVariable'])||0x0;const _0x4554f4=_0x29f907>0x0;_0x4554f4&&(_0x29f907--,$gameVariables[_0x1b0035(0x1a0)](_0x4f2ee8[_0x1b0035(0x1a8)],_0x29f907),_0x29f907<=0x0&&_0x4f2ee8[_0x1b0035(0x1b1)]>0x0&&$gameTemp[_0x1b0035(0x1c6)](_0x4f2ee8[_0x1b0035(0x1b1)]));},Game_Player[_0xea1d7(0x111)][_0xea1d7(0xfc)]=function(){const _0x26cc3d=_0xea1d7,_0x487682=VisuMZ[_0x26cc3d(0x16d)][_0x26cc3d(0x239)][_0x26cc3d(0x14d)];if(!_0x487682)return![];if(_0x487682[_0x26cc3d(0xd8)]<=0x0)return![];const _0x517549=$gameVariables[_0x26cc3d(0x1f3)](_0x487682[_0x26cc3d(0xd8)])||0x0;return _0x517549>0x0;},Game_Player[_0xea1d7(0x111)][_0xea1d7(0x242)]=function(_0x2d6f68){const _0x3bf9e2=_0xea1d7,_0x1bb2bb=VisuMZ[_0x3bf9e2(0x16d)][_0x3bf9e2(0x239)][_0x3bf9e2(0x14d)];if(!_0x1bb2bb)return _0x2d6f68;if(_0x1bb2bb[_0x3bf9e2(0xd8)]<=0x0)return _0x2d6f68;let _0x2f3230=$gameVariables['value'](_0x1bb2bb['LureVariable'])||0x0;const _0x1b68ed=_0x2f3230>0x0;return _0x1b68ed&&(_0x2f3230--,$gameVariables[_0x3bf9e2(0x1a0)](_0x1bb2bb['LureVariable'],_0x2f3230),_0x2f3230<=0x0&&_0x1bb2bb[_0x3bf9e2(0x258)]>0x0&&$gameTemp[_0x3bf9e2(0x1c6)](_0x1bb2bb['LureEvent'])),_0x2d6f68*=_0x1bb2bb['LureRate'],_0x2d6f68+=_0x1bb2bb[_0x3bf9e2(0x245)],_0x2d6f68;},VisuMZ[_0xea1d7(0x16d)][_0xea1d7(0x1a9)]=Game_Event[_0xea1d7(0x111)]['clearPageSettings'],Game_Event[_0xea1d7(0x111)][_0xea1d7(0x1b0)]=function(){const _0x135a54=_0xea1d7;VisuMZ[_0x135a54(0x16d)][_0x135a54(0x1a9)][_0x135a54(0x1a4)](this),this[_0x135a54(0xd0)]();},VisuMZ[_0xea1d7(0x16d)][_0xea1d7(0x1fe)]=Game_Event[_0xea1d7(0x111)][_0xea1d7(0x189)],Game_Event[_0xea1d7(0x111)][_0xea1d7(0x189)]=function(){const _0x50708b=_0xea1d7;VisuMZ[_0x50708b(0x16d)][_0x50708b(0x1fe)]['call'](this),this[_0x50708b(0x182)]();},Game_Event[_0xea1d7(0x111)]['setupEncounterEffectsEffects']=function(){const _0x4c0606=_0xea1d7;this[_0x4c0606(0xd0)](),this[_0x4c0606(0x11e)](),this[_0x4c0606(0x163)]();},Game_Event[_0xea1d7(0x111)][_0xea1d7(0x11e)]=function(_0x34920f){const _0xd14cb2=_0xea1d7;if(!this[_0xd14cb2(0x251)]())return;const _0x42f5b0=this[_0xd14cb2(0x251)]()['note'];if(_0x42f5b0==='')return;this[_0xd14cb2(0xd1)](_0x42f5b0);},Game_Event[_0xea1d7(0x111)][_0xea1d7(0x163)]=function(_0x181b91){const _0x515074=_0xea1d7;if(!this['event']())return;if(!this['page']())return;const _0x5b3e23=this['list']();let _0x4058dd='';for(const _0x23050e of _0x5b3e23){if([0x6c,0x198][_0x515074(0x1ad)](_0x23050e[_0x515074(0x15e)])){if(_0x4058dd!=='')_0x4058dd+='\x0a';_0x4058dd+=_0x23050e[_0x515074(0x150)][0x0];}}this['checkEncounterEffectsStringTags'](_0x4058dd);},Game_Event[_0xea1d7(0x111)][_0xea1d7(0xd0)]=function(){const _0x8e6691=_0xea1d7;this['_EncounterEffectsFollowerTrigger']=![],this[_0x8e6691(0x1d1)]=![],this[_0x8e6691(0x1e5)]();},Game_Event[_0xea1d7(0x111)][_0xea1d7(0xd1)]=function(_0x2d9b1d){const _0xcfaff8=_0xea1d7,_0xa47d25=VisuMZ['EncounterEffects']['RegExp'];_0x2d9b1d['match'](_0xa47d25[_0xcfaff8(0xec)])&&(_0xcfaff8(0x1f6)!==_0xcfaff8(0xd9)?(this[_0xcfaff8(0x1b2)]=!![],this['_trigger']=0x2):(this[_0xcfaff8(0x200)]=_0x558998,this[_0xcfaff8(0x1b3)]=_0x2d65a6[_0xcfaff8(0x1b3)],_0x3191e0['prototype'][_0xcfaff8(0x136)]['call'](this),this[_0xcfaff8(0x224)](),this[_0xcfaff8(0x153)]())),_0x2d9b1d[_0xcfaff8(0x1cf)](_0xa47d25['TouchDirectionLock'])&&(this[_0xcfaff8(0x1d1)]=!![]),this[_0xcfaff8(0x196)](_0x2d9b1d);},VisuMZ[_0xea1d7(0x16d)][_0xea1d7(0x1e6)]=Game_Event[_0xea1d7(0x111)][_0xea1d7(0x257)],Game_Event['prototype']['checkEventTriggerTouch']=function(_0x28a53e,_0x46dfe7){const _0x53f2ff=_0xea1d7;VisuMZ[_0x53f2ff(0x16d)]['Game_Event_checkEventTriggerTouch']['call'](this,_0x28a53e,_0x46dfe7),this[_0x53f2ff(0x130)](_0x28a53e,_0x46dfe7);},Game_Event['prototype'][_0xea1d7(0x130)]=function(_0x332565,_0x31a562){const _0x87fc73=_0xea1d7;if(!this['_EncounterEffectsFollowerTrigger'])return;if($gameMap['isEventRunning']())return;if(this[_0x87fc73(0x225)]!==0x2)return;if(this[_0x87fc73(0x1ff)]())return;if(!this['isNormalPriority']())return;const _0x1662f8=$gamePlayer[_0x87fc73(0x15a)]()[_0x87fc73(0x164)]();for(const _0x43911e of _0x1662f8){if(_0x87fc73(0x127)===_0x87fc73(0x127)){if(!_0x43911e)continue;if(_0x43911e['pos'](_0x332565,_0x31a562)){if('BeelG'===_0x87fc73(0x17c)){this[_0x87fc73(0x238)]();break;}else _0x4673ba=this[_0x87fc73(0xff)](_0x2cdc1e,_0x1e5e95),this[_0x87fc73(0xdd)](_0x1c012d);}}else{_0x5361e4[_0x87fc73(0x215)]--;if(_0x1ecad3[_0x87fc73(0x215)]>0x0)return;_0x374463[_0x87fc73(0x110)]=![],_0x487dc6[_0x87fc73(0x133)]?(_0x18635d[_0x87fc73(0x19a)]=!![],_0x461fd1[_0x87fc73(0x173)]=_0x53a94d[_0x87fc73(0x223)],_0xec34ca[_0x87fc73(0x23c)](this,_0x3d28bf[_0x87fc73(0x155)])):_0xe594d0[_0x87fc73(0x23c)](this,_0x48180e[_0x87fc73(0x1ed)]);}}},VisuMZ[_0xea1d7(0x16d)][_0xea1d7(0x16c)]=Game_Event[_0xea1d7(0x111)][_0xea1d7(0x13f)],Game_Event[_0xea1d7(0x111)][_0xea1d7(0x13f)]=function(){const _0x12e361=_0xea1d7;this['_processEncounterDirectionLock']=!!this[_0x12e361(0x1d1)],VisuMZ[_0x12e361(0x16d)]['Game_Event_lock'][_0x12e361(0x1a4)](this),this[_0x12e361(0x10f)]=undefined;},VisuMZ[_0xea1d7(0x16d)]['Game_Character_turnTowardPlayer']=Game_Character[_0xea1d7(0x111)]['turnTowardPlayer'],Game_Character[_0xea1d7(0x111)][_0xea1d7(0x24b)]=function(){const _0x1fa2b8=_0xea1d7;if(this[_0x1fa2b8(0x10f)])return;VisuMZ[_0x1fa2b8(0x16d)][_0x1fa2b8(0x101)][_0x1fa2b8(0x1a4)](this);},Game_Event[_0xea1d7(0x111)][_0xea1d7(0x1e5)]=function(){const _0x34033a=_0xea1d7,_0x415fb1=VisuMZ[_0x34033a(0x16d)]['Settings'][_0x34033a(0x1bb)];this[_0x34033a(0x149)]={'enabled':![],'alerted':![],'alertRange':_0x415fb1[_0x34033a(0x14e)],'alertDash':_0x415fb1[_0x34033a(0x231)],'alertLock':_0x415fb1[_0x34033a(0x1a5)],'chaseTime':_0x415fb1[_0x34033a(0x1a5)],'fovAngle':_0x415fb1['FovAngle'],'showFov':_0x415fb1[_0x34033a(0xe7)],'response':_0x415fb1[_0x34033a(0x11d)],'alertBalloon':VisuMZ[_0x34033a(0x16d)][_0x34033a(0x1da)](_0x415fb1[_0x34033a(0x195)]),'commonEvent':_0x415fb1[_0x34033a(0x24f)],'reactDelay':_0x415fb1[_0x34033a(0x1b5)],'reactTime':_0x415fb1[_0x34033a(0x1b5)],'alertSoundName':_0x415fb1[_0x34033a(0x1c5)],'alertSoundVolume':_0x415fb1['SoundVolume'],'alertSoundPitch':_0x415fb1['SoundPitch'],'alertSoundPan':_0x415fb1[_0x34033a(0x1c2)],'returnStartBalloon':VisuMZ[_0x34033a(0x16d)][_0x34033a(0x1da)](_0x415fb1[_0x34033a(0xd4)]),'returnEndBalloon':VisuMZ[_0x34033a(0x16d)][_0x34033a(0x1da)](_0x415fb1[_0x34033a(0x1ce)]),'returnAfter':_0x415fb1[_0x34033a(0x21c)],'returnWaiting':![],'returnTime':_0x415fb1[_0x34033a(0x21d)],'returnWait':_0x415fb1[_0x34033a(0x21d)],'returning':![],'returnX':this['x'],'returnY':this['y'],'returnDir':this[_0x34033a(0x228)]()};},VisuMZ['EncounterEffects'][_0xea1d7(0x1da)]=function(_0x6f0707){const _0xd7b057=_0xea1d7;let _0xb19824=0x0;switch(_0x6f0707['toUpperCase']()['trim']()){case'!':case'EXCLAMATION':_0xb19824=0x1;break;case'?':case _0xd7b057(0x128):_0xb19824=0x2;break;case _0xd7b057(0x10a):case _0xd7b057(0xf9):case _0xd7b057(0x1c9):case _0xd7b057(0x156):case _0xd7b057(0x13b):_0xb19824=0x3;break;case'HEART':case _0xd7b057(0x171):_0xb19824=0x4;break;case _0xd7b057(0x142):_0xb19824=0x5;break;case _0xd7b057(0x1f7):_0xb19824=0x6;break;case _0xd7b057(0x104):case _0xd7b057(0x132):case _0xd7b057(0x11a):_0xb19824=0x7;break;case _0xd7b057(0x20d):case'...':_0xb19824=0x8;break;case _0xd7b057(0xfd):case _0xd7b057(0x1fc):case _0xd7b057(0x174):case'LIGHT-BULB':case _0xd7b057(0x168):_0xb19824=0x9;break;case'Z':case'ZZ':case _0xd7b057(0x1dd):case'SLEEP':_0xb19824=0xa;break;case _0xd7b057(0x247):_0xb19824=0xb;break;case _0xd7b057(0x22f):_0xb19824=0xc;break;case'USER-DEFINED\x203':_0xb19824=0xd;break;case _0xd7b057(0x17a):_0xb19824=0xe;break;case'USER-DEFINED\x205':_0xb19824=0xf;break;}return _0xb19824;},Game_Event['prototype'][_0xea1d7(0x196)]=function(_0x275fb4){const _0x5875ae=_0xea1d7,_0x14c8d8=VisuMZ[_0x5875ae(0x16d)][_0x5875ae(0x24a)],_0x4f0ebe=this[_0x5875ae(0x149)];_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8[_0x5875ae(0x241)])&&(_0x4f0ebe[_0x5875ae(0x220)]=!![]);_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8[_0x5875ae(0x14e)])&&(_0x4f0ebe[_0x5875ae(0x220)]=!![],_0x4f0ebe[_0x5875ae(0x1f5)]=Number(RegExp['$1'])||0x1);if(_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8[_0x5875ae(0x231)])){if('grdft'!==_0x5875ae(0x193)){const _0xeec47d=_0x174dc1[_0x5875ae(0x251)](this[_0x5875ae(0xe5)]());if(!_0xeec47d)return![];const _0x34a4fb=_0x341ff7;return _0xeec47d[_0x5875ae(0xd2)](_0x34a4fb)&&_0x34a4fb[_0x5875ae(0x124)](_0xeec47d);}else _0x4f0ebe['enabled']=!![],_0x4f0ebe['alertDash']=![];}_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8['AlertWalk'])&&(_0x4f0ebe[_0x5875ae(0x220)]=!![],_0x4f0ebe[_0x5875ae(0x1d8)]=![]);_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8[_0x5875ae(0x1a5)])&&(_0x4f0ebe[_0x5875ae(0x220)]=!![],_0x4f0ebe[_0x5875ae(0xe0)]=Number(RegExp['$1'])||0x1,_0x4f0ebe['chaseTime']=Number(RegExp['$1'])||0x1);if(_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8['AlertFovAngle'])){if('kCAbz'!==_0x5875ae(0x1d4))_0x4f0ebe[_0x5875ae(0x220)]=!![],_0x4f0ebe[_0x5875ae(0x122)]=Number(RegExp['$1'])||0x1;else{const _0x287a73=_0x3cdfc8(_0x2b147f['$1'])['split'](',')[_0x5875ae(0x152)](_0x498674=>_0x2d79b2(_0x498674));this[_0x5875ae(0x1e2)]=this['_alertBlockVisionTags'][_0x5875ae(0x19d)](_0x287a73);}}_0x275fb4['match'](_0x14c8d8['AlertShowFov'])&&(_0x4f0ebe[_0x5875ae(0x220)]=!![],_0x4f0ebe[_0x5875ae(0x154)]=!![]);_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8[_0x5875ae(0x1dc)])&&(_0x4f0ebe[_0x5875ae(0x220)]=!![],_0x4f0ebe['showFov']=![]);_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8['AlertResponse'])&&('EsBlN'!==_0x5875ae(0x198)?(_0x4f0ebe[_0x5875ae(0x220)]=!![],_0x4f0ebe[_0x5875ae(0x100)]=String(RegExp['$1'])['toLowerCase']()[_0x5875ae(0x177)]()):(_0x13c1b7[_0x5875ae(0x16d)][_0x5875ae(0x1e6)][_0x5875ae(0x1a4)](this,_0x4ab326,_0x35fe5d),this['checkEventFollowerTriggerTouch'](_0x139062,_0x26a5d9)));if(_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8['AlertBalloon'])){if(_0x5875ae(0x199)===_0x5875ae(0x199)){_0x4f0ebe['enabled']=!![];const _0x32f2df=VisuMZ['EncounterEffects'][_0x5875ae(0x1da)](String(RegExp['$1']));_0x4f0ebe[_0x5875ae(0x114)]=_0x32f2df;}else _0x24d4e5[_0x5875ae(0x220)]=!![],_0x53d38b[_0x5875ae(0x173)]=_0x57fe7f(_0x4f691a['$1'])||0x1,_0x39e5c4['returnWait']=_0x461854(_0x18c08c['$1'])||0x1;}if(_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8['AlertReactDelay'])){if(_0x5875ae(0x204)===_0x5875ae(0xfb)){const _0x1b0105=this['_data'];if(!_0x1b0105['showFov'])return;const _0x4a86e3=_0x2c1e27[_0x5875ae(0x16d)]['Settings']['Alert'],_0x50a58b=_0x1b0105[_0x5875ae(0x122)],_0xea0125=_0x12af53[_0x5875ae(0x120)]((_0x1b0105[_0x5875ae(0x1f5)]+0.4)*_0x1237a8[_0x5875ae(0x222)]()),_0x26e597=_0x4a86e3[_0x5875ae(0x15d)],_0x5e14ba=_0x4a86e3[_0x5875ae(0x21f)];this[_0x5875ae(0xf0)]=new _0x2faaf3(_0xea0125*0x2,_0xea0125*0x2),this[_0x5875ae(0xf0)]['drawAlertCircle'](_0xea0125,_0x50a58b,_0x26e597,_0x5e14ba),this['blendMode']=0x1;}else _0x4f0ebe[_0x5875ae(0x220)]=!![],_0x4f0ebe[_0x5875ae(0x1df)]=Number(RegExp['$1'])||0x1,_0x4f0ebe[_0x5875ae(0x240)]=Number(RegExp['$1'])||0x1;}_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8['AlertCommonEvent'])&&('IacuW'===_0x5875ae(0x12b)?(_0x4f0ebe[_0x5875ae(0x220)]=!![],_0x4f0ebe['commonEvent']=Number(RegExp['$1'])||0x0):_0x47fd29[_0x5875ae(0x220)]=!![]);_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8['AlertSoundName'])&&(_0x4f0ebe[_0x5875ae(0x220)]=!![],_0x4f0ebe[_0x5875ae(0x237)]=String(RegExp['$1']));_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8[_0x5875ae(0x254)])&&(_0x4f0ebe[_0x5875ae(0x220)]=!![],_0x4f0ebe[_0x5875ae(0x255)]=Number(RegExp['$1'])||0x1);if(_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8['AlertSoundPitch'])){if('suVJd'!=='AxUJi')_0x4f0ebe[_0x5875ae(0x220)]=!![],_0x4f0ebe['alertSoundPitch']=Number(RegExp['$1'])||0x1;else{if(this[_0x5875ae(0x21e)]===_0x299c47&&this[_0x5875ae(0xea)]()&&this[_0x5875ae(0x256)]()[_0x5875ae(0x1d8)])return this[_0x5875ae(0x12c)]();return _0x2329e2[_0x5875ae(0x16d)][_0x5875ae(0x13a)]['call'](this);}}_0x275fb4['match'](_0x14c8d8[_0x5875ae(0x165)])&&(_0x5875ae(0xd7)===_0x5875ae(0x243)?_0x432a00=_0x28c785[_0x5875ae(0x16e)]||0x0:(_0x4f0ebe[_0x5875ae(0x220)]=!![],_0x4f0ebe[_0x5875ae(0x11b)]=Number(RegExp['$1'])||0x1));if(_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8[_0x5875ae(0x22e)])){if(_0x5875ae(0x113)==='biHul')_0x4f0ebe['enabled']=!![],_0x4f0ebe[_0x5875ae(0x133)]=!![];else{if(_0x33cb37!=='')_0x32af85+='\x0a';_0x5de52d+=_0x5593b1['parameters'][0x0];}}_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8[_0x5875ae(0x117)])&&(_0x4f0ebe[_0x5875ae(0x220)]=!![],_0x4f0ebe[_0x5875ae(0x133)]=![]);if(_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8[_0x5875ae(0xd4)])){_0x4f0ebe[_0x5875ae(0x220)]=!![];const _0x528f6a=VisuMZ[_0x5875ae(0x16d)][_0x5875ae(0x1da)](String(RegExp['$1']));_0x4f0ebe[_0x5875ae(0x155)]=_0x528f6a;}if(_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8[_0x5875ae(0x1ce)])){_0x4f0ebe[_0x5875ae(0x220)]=!![];const _0x515837=VisuMZ['EncounterEffects'][_0x5875ae(0x1da)](String(RegExp['$1']));_0x4f0ebe['returnEndBalloon']=_0x515837;}_0x275fb4[_0x5875ae(0x1cf)](_0x14c8d8[_0x5875ae(0x21d)])&&(_0x5875ae(0xee)===_0x5875ae(0xee)?(_0x4f0ebe[_0x5875ae(0x220)]=!![],_0x4f0ebe['returnTime']=Number(RegExp['$1'])||0x1,_0x4f0ebe[_0x5875ae(0x223)]=Number(RegExp['$1'])||0x1):this['updateAlertChase']());},Game_Event[_0xea1d7(0x111)][_0xea1d7(0x256)]=function(){const _0x473eff=_0xea1d7;return this[_0x473eff(0x149)]===undefined&&this['refresh'](),this[_0x473eff(0x149)];},Game_Event[_0xea1d7(0x111)][_0xea1d7(0x23e)]=function(){const _0x27f31b=_0xea1d7;if(this[_0x27f31b(0xe8)])return![];return this['chaseData']()['enabled'];},Game_Event[_0xea1d7(0x111)][_0xea1d7(0x157)]=function(){const _0x5cf2c1=_0xea1d7;if(Imported[_0x5cf2c1(0x121)]){if(this[_0x5cf2c1(0x147)]())return![];}return this[_0x5cf2c1(0x256)]()[_0x5cf2c1(0x19a)]||this['chaseData']()[_0x5cf2c1(0x1bc)];},Game_Event[_0xea1d7(0x111)][_0xea1d7(0xea)]=function(){const _0x1131ce=_0xea1d7;if(Imported[_0x1131ce(0x121)]){if(_0x1131ce(0x230)===_0x1131ce(0x230)){if(this[_0x1131ce(0x147)]())return![];}else this[_0x1131ce(0x131)]();}return this[_0x1131ce(0x256)]()[_0x1131ce(0x110)];},VisuMZ[_0xea1d7(0x16d)][_0xea1d7(0xef)]=Game_Event[_0xea1d7(0x111)][_0xea1d7(0x208)],Game_Event['prototype'][_0xea1d7(0x208)]=function(){const _0x5180fc=_0xea1d7;if(this[_0x5180fc(0xea)]()){if('yZwfY'!=='dFsqE')this[_0x5180fc(0x116)]();else{this[_0x5180fc(0x18c)](_0x14a9d0);switch(this[_0x5180fc(0x228)]()){case 0x1:return _0x258108['y']<this['y'];case 0x2:return _0x39b1ee['y']<this['y'];case 0x3:return _0x381539['y']<this['y'];case 0x4:return _0xc31ea3['x']>this['x'];case 0x6:return _0x12e1b2['x']<this['x'];case 0x7:return _0x45b509['y']>this['y'];case 0x8:return _0x13b55c['y']>this['y'];case 0x9:return _0x1d1141['y']>this['y'];}return![];}}else this['isChaseReturning']()?this[_0x5180fc(0xda)]():_0x5180fc(0x209)!==_0x5180fc(0xeb)?VisuMZ[_0x5180fc(0x16d)]['Game_Event_updateSelfMovement']['call'](this):this[_0x5180fc(0x179)]();},Game_Event[_0xea1d7(0x111)][_0xea1d7(0x116)]=function(){const _0x30b189=_0xea1d7,_0x4dddf5=this['chaseData']();if(_0x4dddf5[_0x30b189(0x240)]>0x0){if(_0x30b189(0x145)!=='MwRhR'){_0x4dddf5[_0x30b189(0x240)]-=0x1;return;}else this['createAlertFovSprite']();}switch(_0x4dddf5[_0x30b189(0x100)]){case _0x30b189(0x249):this[_0x30b189(0x1fd)]();break;case _0x30b189(0xf6):this['moveTowardPlayer']();break;case'flee':this[_0x30b189(0x135)]();break;case'random':this[_0x30b189(0x1f8)]();break;default:VisuMZ['EncounterEffects'][_0x30b189(0xef)][_0x30b189(0x1a4)](this);break;}},Game_Event[_0xea1d7(0x111)]['updateSelfMovementSmartChase']=function(){const _0x4f157e=_0xea1d7;if(!this['needsSmartChaseUpdate']())return;this['_eventAlertChaseCache']=this['_eventAlertChaseCache']||{},this[_0x4f157e(0x1b8)]['playerX']=$gamePlayer['x'],this[_0x4f157e(0x1b8)]['playerY']=$gamePlayer['y'],this[_0x4f157e(0x1b8)][_0x4f157e(0x202)]=this['x'],this[_0x4f157e(0x1b8)][_0x4f157e(0x250)]=this['y'];const _0x555fcc=Imported[_0x4f157e(0x121)]&&$gameMap[_0x4f157e(0x192)]();let _0x1d0303=$gamePlayer['x'],_0xe64fa5=$gamePlayer['y'],_0x280b21=0x0;if(_0x555fcc)_0x280b21=this[_0x4f157e(0xff)](_0x1d0303,_0xe64fa5),this[_0x4f157e(0xdd)](_0x280b21);else{if(_0x4f157e(0x19f)!=='lDvEN')_0x280b21=this['findDirectionTo'](_0x1d0303,_0xe64fa5),this['moveStraight'](_0x280b21);else{if(this['isPreventSelfMovement']())return![];}}},Game_Event[_0xea1d7(0x111)][_0xea1d7(0x125)]=function(){const _0x2fcd5f=_0xea1d7;if(this[_0x2fcd5f(0x180)]())return![];this[_0x2fcd5f(0x1b8)]=this[_0x2fcd5f(0x1b8)]||{};if(this[_0x2fcd5f(0x1b8)][_0x2fcd5f(0x214)]!==$gamePlayer['x'])return!![];if(this[_0x2fcd5f(0x1b8)][_0x2fcd5f(0x19e)]!==$gamePlayer['y'])return!![];if(this[_0x2fcd5f(0x1b8)][_0x2fcd5f(0x202)]!==this['x'])return!![];if(this[_0x2fcd5f(0x1b8)][_0x2fcd5f(0x250)]!==this['y'])return!![];return![];},Game_Event[_0xea1d7(0x111)][_0xea1d7(0xda)]=function(){const _0x522330=_0xea1d7,_0x1aeed6=this['chaseData']();if(!_0x1aeed6[_0x522330(0x1bc)])return;let _0x391f95=_0x1aeed6['returnX'],_0x5a6428=_0x1aeed6['returnY'];this['x']===_0x391f95&&this['y']===_0x5a6428&&(_0x1aeed6[_0x522330(0x1bc)]=![],this[_0x522330(0x162)]=0x0,this[_0x522330(0x14b)](_0x1aeed6[_0x522330(0x1ca)]));const _0x4af5b2=Imported['VisuMZ_1_EventsMoveCore']&&$gameMap['isSupportDiagonalMovement']();let _0x1a527f=0x0;if(_0x4af5b2)_0x1a527f=this[_0x522330(0xff)](_0x391f95,_0x5a6428),this[_0x522330(0xdd)](_0x1a527f);else{if('bKFiU'!==_0x522330(0x1a7)){switch(this['direction']()){case 0x1:return[0x4,0x7,0x8,0x2,0x3,0x6][_0x522330(0x253)](_0x47a2c6['direction']());case 0x2:return[0x7,0x4,0x1,0x9,0x6,0x3][_0x522330(0x253)](_0x33fac3[_0x522330(0x228)]());case 0x3:return[0x4,0x1,0x2,0x8,0x9,0x6][_0x522330(0x253)](_0x5e81e6['direction']());case 0x4:return[0x7,0x8,0x9,0x1,0x2,0x3][_0x522330(0x253)](_0x567c87[_0x522330(0x228)]());case 0x6:return[0x7,0x8,0x9,0x1,0x2,0x3][_0x522330(0x253)](_0x56191d[_0x522330(0x228)]());case 0x7:return[0x4,0x1,0x2,0x8,0x9,0x6][_0x522330(0x253)](_0x1b7a26[_0x522330(0x228)]());case 0x8:return[0x7,0x4,0x1,0x9,0x6,0x3][_0x522330(0x253)](_0x4abf55['direction']());case 0x9:return[0x4,0x7,0x8,0x2,0x3,0x6][_0x522330(0x253)](_0x4a9e70[_0x522330(0x228)]());}return![];}else _0x1a527f=this['findDirectionTo'](_0x391f95,_0x5a6428),this['moveStraight'](_0x1a527f);}},VisuMZ[_0xea1d7(0x16d)][_0xea1d7(0x20f)]=Game_Event['prototype'][_0xea1d7(0x153)],Game_Event[_0xea1d7(0x111)][_0xea1d7(0x153)]=function(){const _0x1a56ea=_0xea1d7;VisuMZ['EncounterEffects'][_0x1a56ea(0x20f)][_0x1a56ea(0x1a4)](this),this[_0x1a56ea(0x1e3)]();},Game_Event['prototype'][_0xea1d7(0x1e3)]=function(){const _0x5eb0ff=_0xea1d7;if(!this['isChaseEnabled']())return;if(Imported[_0x5eb0ff(0x121)]){if(_0x5eb0ff(0x1cb)!==_0x5eb0ff(0x1cb)){this['_characterErased']=this['_character']['_erased'];if(this[_0x5eb0ff(0xf0)])this['bitmap'][_0x5eb0ff(0x175)]();this[_0x5eb0ff(0xf0)]=new _0x413e8b(0x1,0x1);}else{if(this[_0x5eb0ff(0x147)]())return![];}}if(this[_0x5eb0ff(0xea)]())'TrZgs'===_0x5eb0ff(0x1d2)?this['updateAlertChase']():(_0xf819d1[_0x5eb0ff(0x220)]=!![],_0x2d5a23[_0x5eb0ff(0x100)]=_0x101d49(_0x37e482['$1'])[_0x5eb0ff(0x1e9)]()[_0x5eb0ff(0x177)]());else{if(_0x5eb0ff(0x190)===_0x5eb0ff(0x1ee))return _0x29c151[_0x5eb0ff(0xe2)]&&_0x9f41f1[_0x5eb0ff(0x11c)][_0x5eb0ff(0x1ad)]('['+_0x10cfaa+']');else this['updateAlertReturnWait'](),this[_0x5eb0ff(0x10c)]();}},Game_Event[_0xea1d7(0x111)][_0xea1d7(0x1c7)]=function(){const _0x1a4453=_0xea1d7,_0x36b426=this['chaseData'](),_0x72c320=this[_0x1a4453(0x1d3)]();if(_0x72c320>_0x36b426[_0x1a4453(0x1f5)]){_0x36b426[_0x1a4453(0x215)]--;if(_0x36b426[_0x1a4453(0x215)]>0x0)return;_0x36b426[_0x1a4453(0x110)]=![];if(_0x36b426['returnAfter']){if(_0x1a4453(0x141)===_0x1a4453(0x14a)){if(this['_erased'])return![];return this[_0x1a4453(0x256)]()['enabled'];}else _0x36b426[_0x1a4453(0x19a)]=!![],_0x36b426['returnTime']=_0x36b426[_0x1a4453(0x223)],$gameTemp[_0x1a4453(0x23c)](this,_0x36b426['returnStartBalloon']);}else _0x1a4453(0x23a)===_0x1a4453(0x23a)?$gameTemp['requestBalloon'](this,_0x36b426['returnEndBalloon']):(this[_0x1a4453(0x210)](),_0x603378[_0x1a4453(0x16d)][_0x1a4453(0x1e8)][_0x1a4453(0x1a4)](this),this[_0x1a4453(0x1ea)]());}else{if(_0x1a4453(0x1fa)!=='MYkKG'){const _0xad9c22=_0x4c16bb['event'](this[_0x1a4453(0xe5)]());if(!_0xad9c22)return![];const _0x5dcb50=_0x538e0b;return _0x5dcb50[_0x1a4453(0x115)](_0xad9c22)&&_0xad9c22['isPositionBackOf'](_0x5dcb50);}else _0x36b426[_0x1a4453(0x215)]=_0x36b426[_0x1a4453(0xe0)];}},Game_Event[_0xea1d7(0x111)][_0xea1d7(0x24c)]=function(){const _0x321d2b=_0xea1d7,_0x57cd8c=this[_0x321d2b(0x256)]();if(!_0x57cd8c[_0x321d2b(0x19a)])return;_0x57cd8c['returnTime']-=0x1,_0x57cd8c[_0x321d2b(0x173)]<=0x0&&(_0x57cd8c[_0x321d2b(0x19a)]=![],_0x57cd8c[_0x321d2b(0x1bc)]=!![],$gameTemp[_0x321d2b(0x23c)](this,_0x57cd8c[_0x321d2b(0x1ed)]));},Game_Event[_0xea1d7(0x111)][_0xea1d7(0x10c)]=function(){const _0x2ffd91=_0xea1d7;if($gamePlayer[_0x2ffd91(0x10e)]())return;const _0x1409ff=this['chaseData'](),_0x834c30=Math['round'](this[_0x2ffd91(0x1d3)]());if(_0x834c30>_0x1409ff[_0x2ffd91(0x1f5)])return;const _0x5d31f1=this['getAlertAngleToPlayer']();if(_0x5d31f1>_0x1409ff[_0x2ffd91(0x122)])return;if(!this[_0x2ffd91(0x22c)]())return;_0x1409ff[_0x2ffd91(0x110)]=!![],_0x1409ff[_0x2ffd91(0x215)]=_0x1409ff[_0x2ffd91(0xe0)],_0x1409ff[_0x2ffd91(0x19a)]=![],_0x1409ff[_0x2ffd91(0x1bc)]=![],$gameTemp[_0x2ffd91(0x23c)](this,_0x1409ff[_0x2ffd91(0x114)]),_0x1409ff[_0x2ffd91(0x240)]=_0x1409ff[_0x2ffd91(0x1df)];_0x1409ff[_0x2ffd91(0x19b)]>0x0&&(_0x2ffd91(0x1ab)!==_0x2ffd91(0xd5)?$gameTemp[_0x2ffd91(0x1c6)](_0x1409ff[_0x2ffd91(0x19b)]):(_0x29b72e['enabled']=!![],_0x3ebe06['showFov']=![]));if(_0x1409ff['alertSoundName']!==''){if(_0x2ffd91(0x20e)!==_0x2ffd91(0x20e)){return;_0x2df64a['log'](_0x2ffd91(0x232)+this['x']+_0x2ffd91(0x139)+this['y']),_0x5f0d23[_0x2ffd91(0x14c)](_0x2ffd91(0x151)+_0x13a8a0['x']+',\x20Event\x20Y:\x20'+_0x21965f['y']);}else{const _0x5e620b={'name':_0x1409ff[_0x2ffd91(0x237)],'volume':_0x1409ff[_0x2ffd91(0x255)],'pitch':_0x1409ff[_0x2ffd91(0x160)],'pan':_0x1409ff[_0x2ffd91(0x11b)]};AudioManager[_0x2ffd91(0x1cd)](_0x5e620b);}}},Game_Event['prototype'][_0xea1d7(0x167)]=function(){const _0x544ffd=_0xea1d7,_0x24ac94=[$gamePlayer];if($gamePlayer[_0x544ffd(0x15a)]()[_0x544ffd(0x1a1)]){if(_0x544ffd(0x118)!==_0x544ffd(0x105))for(let _0xd4baee=0x0;_0xd4baee<$gamePlayer[_0x544ffd(0x15a)]()['_data']['length'];_0xd4baee++){const _0x4fb3b0=$gamePlayer[_0x544ffd(0x15a)]()['follower'](_0xd4baee);if(!_0x4fb3b0)continue;if(!_0x4fb3b0[_0x544ffd(0x12f)]())continue;_0x24ac94[_0x544ffd(0x1aa)](_0x4fb3b0);}else _0x1ecd54[_0x544ffd(0x16d)][_0x544ffd(0x140)]['call'](this),this[_0x544ffd(0x15b)]();}return _0x24ac94;},Game_Event[_0xea1d7(0x111)]['getAlertDistanceToClosest']=function(){const _0x255fb1=_0xea1d7,_0x3affb9=[];_0x3affb9[_0x255fb1(0x1aa)](this[_0x255fb1(0x207)]());for(let _0x221142=0x0;_0x221142<$gamePlayer[_0x255fb1(0x15a)]()['_data'][_0x255fb1(0x107)];_0x221142++){_0x255fb1(0xdf)!=='HaRrP'?(this[_0x255fb1(0x16b)]===_0x5853c1&&this['initEncounterEffects_ForcedAdvantage'](),this[_0x255fb1(0x16b)]=_0x133717):_0x3affb9['push'](this[_0x255fb1(0x176)](_0x221142));}return Math[_0x255fb1(0x13d)](..._0x3affb9);},Game_Event[_0xea1d7(0x111)][_0xea1d7(0x207)]=function(){const _0x9b76b9=_0xea1d7;return this[_0x9b76b9(0x15c)]($gamePlayer);},Game_Event[_0xea1d7(0x111)]['getAlertDistanceToFollower']=function(_0x49a220){const _0x594bc6=_0xea1d7;if(!$gamePlayer[_0x594bc6(0x15a)]()['_visible'])return 0x3e7;const _0x1d2762=$gamePlayer[_0x594bc6(0x15a)]()[_0x594bc6(0x221)](_0x49a220);if(!_0x1d2762[_0x594bc6(0x12f)]())return 0x3e7;return this[_0x594bc6(0x15c)](_0x1d2762);},Game_Event[_0xea1d7(0x111)]['getAlertDistanceToTarget']=function(_0x49c432){const _0x9830d9=_0xea1d7,_0x4e03ec=this['x'],_0x2a2625=this['y'],_0xdf91ed=_0x49c432['x'],_0x3ad285=_0x49c432['y'],_0x599a7e=Math[_0x9830d9(0x1f4)](_0xdf91ed-_0x4e03ec,0x2),_0x4a3332=Math[_0x9830d9(0x1f4)](_0x3ad285-_0x2a2625,0x2);return Math[_0x9830d9(0x1a3)](_0x599a7e+_0x4a3332);},Game_Event[_0xea1d7(0x111)][_0xea1d7(0x134)]=function(_0x3054d6){const _0x4c56fc=_0xea1d7;return this[_0x4c56fc(0x1ef)]($gamePlayer,_0x3054d6);},Game_Event[_0xea1d7(0x111)][_0xea1d7(0x146)]=function(_0x1c280d,_0x176ead){const _0x30f665=_0xea1d7;if(!$gamePlayer['followers']()['_visible'])return 0x3e7;const _0x4dcb85=$gamePlayer[_0x30f665(0x15a)]()[_0x30f665(0x221)](_0x1c280d);if(!_0x4dcb85[_0x30f665(0x12f)]())return 0x3e7;return this['getAlertAngleToTarget'](_0x4dcb85,_0x176ead);},Game_Event[_0xea1d7(0x111)]['getAlertAngleToTarget']=function(_0x2e718e,_0x557f03){const _0x303cbb=_0xea1d7,_0x49c8e8=this['x'],_0x372eaf=this['y'],_0x37cae9=_0x2e718e['x'],_0x5232d7=_0x2e718e['y'];let _0x1a38f5=Math[_0x303cbb(0x1be)](_0x5232d7-_0x372eaf,_0x37cae9-_0x49c8e8)*0xb4/Math['PI'];if(!_0x557f03){const _0x5d6565=[0x0,0xe1,0x10e,0x13b,0xb4,0x0,0x0,0x87,0x5a,0x2d][this[_0x303cbb(0x228)]()];_0x1a38f5+=_0x5d6565,_0x1a38f5+=this['chaseData']()[_0x303cbb(0x122)]/0x2;}while(_0x1a38f5<0x0)_0x1a38f5+=0x168;while(_0x1a38f5>=0x168)_0x1a38f5-=0x168;return _0x1a38f5;},Game_Event['prototype']['isAlertLineOfVisionClear']=function(){const _0x26305b=_0xea1d7;let _0x21e996=![];const _0x18a157=this['getAlertDistanceToClosest']();_0x21e996&&('CURbu'!==_0x26305b(0x1af)?(_0x5168b1[_0x26305b(0x16d)][_0x26305b(0x1fe)]['call'](this),this[_0x26305b(0x182)]()):(console[_0x26305b(0x14c)](_0x26305b(0x1f2),$gamePlayer['x'],$gamePlayer['y']),console[_0x26305b(0x14c)]('Event:\x20',this['x'],this['y'])));const _0x57f1b1=this[_0x26305b(0x167)]();for(const _0xdb22fa of _0x57f1b1){if(!_0xdb22fa)continue;let _0x399936=_0x18a157,_0x168e71=this[_0x26305b(0x1ef)](_0xdb22fa,!![]),_0x5e91c6=_0x168e71*Math['PI']/0xb4;while(_0x399936>=0x0){const _0x311397=Math['round'](this['x']+_0x399936*Math[_0x26305b(0x205)](_0x5e91c6)),_0x2ee193=Math[_0x26305b(0x137)](this['y']+_0x399936*Math[_0x26305b(0x18e)](_0x5e91c6));_0x399936-=0x1;if(_0x21e996){if(_0x26305b(0x1b6)===_0x26305b(0x1b6))console[_0x26305b(0x14c)](_0x26305b(0xde),_0x168e71,_0x399936,_0x311397,_0x2ee193);else{const _0x2283f4=this['x'],_0x2869e2=this['y'],_0xc02fba=_0x53684a['x'],_0x11eb1c=_0x569f8e['y'];let _0x276018=_0x5df1cb['atan2'](_0x11eb1c-_0x2869e2,_0xc02fba-_0x2283f4)*0xb4/_0x351e3a['PI'];if(!_0x281ad0){const _0x43d047=[0x0,0xe1,0x10e,0x13b,0xb4,0x0,0x0,0x87,0x5a,0x2d][this[_0x26305b(0x228)]()];_0x276018+=_0x43d047,_0x276018+=this[_0x26305b(0x256)]()[_0x26305b(0x122)]/0x2;}while(_0x276018<0x0)_0x276018+=0x168;while(_0x276018>=0x168)_0x276018-=0x168;return _0x276018;}}if($gameMap[_0x26305b(0x109)](_0x311397,_0x2ee193))return![];}}return!![];},VisuMZ[_0xea1d7(0x16d)][_0xea1d7(0x13a)]=Game_CharacterBase[_0xea1d7(0x111)][_0xea1d7(0x169)],Game_CharacterBase[_0xea1d7(0x111)][_0xea1d7(0x169)]=function(){const _0x1b84dd=_0xea1d7;if(this[_0x1b84dd(0x21e)]===Game_Event&&this[_0x1b84dd(0xea)]()&&this[_0x1b84dd(0x256)]()[_0x1b84dd(0x1d8)])return this[_0x1b84dd(0x12c)]();return VisuMZ['EncounterEffects'][_0x1b84dd(0x13a)][_0x1b84dd(0x1a4)](this);},VisuMZ['EncounterEffects'][_0xea1d7(0x138)]=Game_CharacterBase[_0xea1d7(0x111)][_0xea1d7(0x187)],Game_CharacterBase['prototype'][_0xea1d7(0x187)]=function(_0x521dd8,_0x43bea9){const _0x53aab9=_0xea1d7;if(this['constructor']===Game_Event){if(this['isChaseReturning']()||this[_0x53aab9(0xea)]())return;}VisuMZ[_0x53aab9(0x16d)][_0x53aab9(0x138)][_0x53aab9(0x1a4)](this,_0x521dd8,_0x43bea9);},Game_Interpreter['prototype'][_0xea1d7(0x1b9)]=function(){const _0x60991f=_0xea1d7,_0x251d79=$gameMap[_0x60991f(0x251)](this[_0x60991f(0xe5)]());if(!_0x251d79)return![];const _0x5ef580=$gamePlayer;return _0x251d79[_0x60991f(0x126)](_0x5ef580)&&_0x5ef580[_0x60991f(0x12d)](_0x251d79);},Game_Interpreter[_0xea1d7(0x111)][_0xea1d7(0x203)]=function(){const _0x10e4d7=_0xea1d7,_0x5ab69a=$gameMap[_0x10e4d7(0x251)](this[_0x10e4d7(0xe5)]());if(!_0x5ab69a)return![];const _0x87c32a=$gamePlayer;return _0x5ab69a['isFacingAway'](_0x87c32a)&&_0x87c32a['isPositionBackOf'](_0x5ab69a);},Game_Interpreter[_0xea1d7(0x111)][_0xea1d7(0x1d0)]=function(){const _0x468f95=_0xea1d7,_0x4de628=$gameMap[_0x468f95(0x251)](this[_0x468f95(0xe5)]());if(!_0x4de628)return![];const _0x5924a3=$gamePlayer;return _0x4de628[_0x468f95(0xd2)](_0x5924a3)&&_0x5924a3[_0x468f95(0x124)](_0x4de628);},Game_Interpreter[_0xea1d7(0x111)]['checkPlayerFacingEventFront']=function(){const _0x3db8fd=_0xea1d7,_0x24e355=$gameMap[_0x3db8fd(0x251)](this[_0x3db8fd(0xe5)]());if(!_0x24e355)return![];const _0x2fe352=$gamePlayer;return _0x2fe352[_0x3db8fd(0x126)](_0x24e355)&&_0x24e355[_0x3db8fd(0x12d)](_0x2fe352);},Game_Interpreter['prototype'][_0xea1d7(0x159)]=function(){const _0x1f3b41=_0xea1d7,_0x4ef382=$gameMap[_0x1f3b41(0x251)](this[_0x1f3b41(0xe5)]());if(!_0x4ef382)return![];const _0x4dae1b=$gamePlayer;return _0x4dae1b['isFacingAway'](_0x4ef382)&&_0x4ef382['isPositionBackOf'](_0x4dae1b);},Game_Interpreter[_0xea1d7(0x111)][_0xea1d7(0xf4)]=function(){const _0x1bf8ad=_0xea1d7,_0x3c2a40=$gameMap[_0x1bf8ad(0x251)](this['eventId']());if(!_0x3c2a40)return![];const _0xece718=$gamePlayer;return _0xece718[_0x1bf8ad(0xd2)](_0x3c2a40)&&_0x3c2a40[_0x1bf8ad(0x124)](_0xece718);},VisuMZ[_0xea1d7(0x16d)][_0xea1d7(0x1c3)]=Sprite_Character[_0xea1d7(0x111)][_0xea1d7(0x153)],Sprite_Character[_0xea1d7(0x111)][_0xea1d7(0x153)]=function(){const _0x1e69b9=_0xea1d7;VisuMZ['EncounterEffects'][_0x1e69b9(0x1c3)][_0x1e69b9(0x1a4)](this),this[_0x1e69b9(0x166)]();},Sprite_Character[_0xea1d7(0x111)][_0xea1d7(0x166)]=function(){this['createAlertFovSprite']();},Sprite_Character[_0xea1d7(0x111)]['createAlertFovSprite']=function(){const _0x1576c2=_0xea1d7;if(this[_0x1576c2(0x186)])return;if(!this[_0x1576c2(0x184)])return;this[_0x1576c2(0x186)]=new Sprite_AlertFovSprite(this),this['_alertFovSprite']['z']=0x6,this[_0x1576c2(0x184)][_0x1576c2(0x119)](this['_alertFovSprite']),SceneManager['_scene']['_spriteset'][_0x1576c2(0x229)]&&(this[_0x1576c2(0x18a)]=new Sprite_AlertFovSprite(this),this[_0x1576c2(0x18a)]['z']=0x6,SceneManager[_0x1576c2(0x158)][_0x1576c2(0x17b)][_0x1576c2(0x229)][_0x1576c2(0x119)](this[_0x1576c2(0x18a)]));};function Sprite_AlertFovSprite(){const _0x2c197f=_0xea1d7;this[_0x2c197f(0x136)](...arguments);}Sprite_AlertFovSprite[_0xea1d7(0x111)]=Object[_0xea1d7(0xdc)](Sprite['prototype']),Sprite_AlertFovSprite[_0xea1d7(0x111)][_0xea1d7(0x21e)]=Sprite_AlertFovSprite,Sprite_AlertFovSprite[_0xea1d7(0x111)]['initialize']=function(_0x1aebe5){const _0x1f8b25=_0xea1d7;this[_0x1f8b25(0x200)]=_0x1aebe5,this['_character']=_0x1aebe5[_0x1f8b25(0x1b3)],Sprite[_0x1f8b25(0x111)]['initialize']['call'](this),this[_0x1f8b25(0x224)](),this['update']();},Sprite_AlertFovSprite['prototype'][_0xea1d7(0x224)]=function(){const _0x184c89=_0xea1d7;this[_0x184c89(0x233)]['x']=0.5,this[_0x184c89(0x233)]['y']=0.5,this['_characterErased']=![];if(!this[_0x184c89(0x1b3)])return;if(this[_0x184c89(0x1b3)][_0x184c89(0x21e)]!==Game_Event)return;this['_data']={};},Sprite_AlertFovSprite[_0xea1d7(0x111)][_0xea1d7(0x153)]=function(){const _0x5f5911=_0xea1d7;Sprite[_0x5f5911(0x111)][_0x5f5911(0x153)][_0x5f5911(0x1a4)](this);if(!this['_character'])return;if(this[_0x5f5911(0x1b3)][_0x5f5911(0x21e)]!==Game_Event)return;this[_0x5f5911(0x172)]();if(!this[_0x5f5911(0x16f)][_0x5f5911(0x220)])return;this['updatePosition'](),this['updateAngle']();},Sprite_AlertFovSprite[_0xea1d7(0x111)]['updateBitmap']=function(){const _0x332659=_0xea1d7;if(!this['needsBitmapRedraw']())return;this['_data']=JsonEx[_0x332659(0x129)](this['_character'][_0x332659(0x256)]());if(this['_data'][_0x332659(0x220)]&&!this['_character']['_erased'])this['createFovBitmap']();else{if(_0x332659(0x211)===_0x332659(0xe9))_0x2a034e[_0x332659(0x220)]=!![],_0x308723[_0x332659(0x133)]=![];else{this[_0x332659(0x183)]=this[_0x332659(0x1b3)][_0x332659(0xe8)];if(this['bitmap'])this[_0x332659(0xf0)][_0x332659(0x175)]();this[_0x332659(0xf0)]=new Bitmap(0x1,0x1);}}},Sprite_AlertFovSprite['prototype'][_0xea1d7(0x1e4)]=function(){const _0x3478f5=_0xea1d7,_0x5adc5c=this[_0x3478f5(0x1b3)][_0x3478f5(0x256)](),_0x5021a6=this['_data'];if(_0x5adc5c[_0x3478f5(0x220)]!==_0x5021a6[_0x3478f5(0x220)])return!![];if(_0x5adc5c['alertRange']!==_0x5021a6[_0x3478f5(0x1f5)])return!![];if(_0x5adc5c[_0x3478f5(0x122)]!==_0x5021a6['fovAngle'])return!![];if(this['_characterErased']!==this[_0x3478f5(0x1b3)][_0x3478f5(0xe8)])return!![];return![];},Sprite_AlertFovSprite['prototype'][_0xea1d7(0x235)]=function(){const _0x41ad37=_0xea1d7,_0x1d141e=this[_0x41ad37(0x16f)];if(!_0x1d141e[_0x41ad37(0x154)])return;const _0xaf2cb0=VisuMZ[_0x41ad37(0x16d)]['Settings'][_0x41ad37(0x1bb)],_0x2ca625=_0x1d141e[_0x41ad37(0x122)],_0x3a0836=Math[_0x41ad37(0x120)]((_0x1d141e[_0x41ad37(0x1f5)]+0.4)*$gameMap['tileWidth']()),_0x2522f5=_0xaf2cb0['FovColor1'],_0x1ea2c3=_0xaf2cb0['FovColor2'];this[_0x41ad37(0xf0)]=new Bitmap(_0x3a0836*0x2,_0x3a0836*0x2),this[_0x41ad37(0xf0)][_0x41ad37(0x23f)](_0x3a0836,_0x2ca625,_0x2522f5,_0x1ea2c3),this['blendMode']=0x1;},Bitmap[_0xea1d7(0x111)][_0xea1d7(0x23f)]=function(_0x55e981,_0x218660,_0x12b631,_0x5cafc3){const _0x2d7810=_0xea1d7,_0x1cf262=this['context'],_0x64fb8f=_0x218660*(Math['PI']/0xb4),_0xf2efe1=_0x55e981*0x2,_0x33097e=_0x1cf262['createRadialGradient'](_0x55e981,_0x55e981,0x18,_0x55e981,_0x55e981,_0x55e981);_0x33097e[_0x2d7810(0x18f)](0x0,_0x12b631),_0x33097e['addColorStop'](0.85,_0x5cafc3),_0x33097e['addColorStop'](0x1,_0x12b631),_0x1cf262[_0x2d7810(0x16a)](),_0x1cf262[_0x2d7810(0x23b)]=_0x33097e,_0x1cf262['beginPath'](),_0x1cf262[_0x2d7810(0x1c1)](_0x55e981,_0x55e981),_0x1cf262[_0x2d7810(0x219)](_0xf2efe1,_0x55e981),_0x1cf262[_0x2d7810(0x1bd)](_0x55e981,_0x55e981,_0x55e981,0x0,_0x64fb8f),_0x1cf262[_0x2d7810(0x219)](_0x55e981,_0x55e981),_0x1cf262[_0x2d7810(0x15f)](),_0x1cf262[_0x2d7810(0x17d)](),this[_0x2d7810(0x102)][_0x2d7810(0x153)]();},Sprite_AlertFovSprite[_0xea1d7(0x111)][_0xea1d7(0x12e)]=function(){const _0x24321=_0xea1d7;this['x']=this['_source']['x'],this['y']=this[_0x24321(0x200)]['y']-this['_source']['height']/0x2;},Sprite_AlertFovSprite[_0xea1d7(0x111)][_0xea1d7(0x181)]=function(){const _0x14bb9c=_0xea1d7,_0x4f059c=this[_0x14bb9c(0x16f)];let _0x10ca18=_0x4f059c[_0x14bb9c(0x122)]/-0x2;_0x10ca18+=[0x0,0x87,0x5a,0x2d,0xb4,0x0,0x0,0xe1,0x10e,0x13b][this['_character'][_0x14bb9c(0x217)]],this[_0x14bb9c(0x185)]=_0x10ca18;};
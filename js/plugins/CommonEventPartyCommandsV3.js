/*:
 * @plugindesc Allows you to add common events to the party command window
 * (The window that says Fight and Escape)
 * @author Ninjapon
 *
 * @param Event 1 Visible
 * @desc Whether you want the event to be in the menu
 * This can be changed with plugin commands
 * @type boolean
 * @default true
 *
 * @param Event 1 Text
 * @desc The text for the first event which will appear in the Party command Menu
 * @type text
 * @default Event 1
 *
 * @param Event 1 ID
 * @desc The Id of the event you want to run
 * Ex. entering 1 will run Common Event 0001
 * @default 1
 * @type number
 *
 * @param Event 1 Turn
 * @desc Do you want this event to count as your party's turn
 * ON = Continue As Normal, OFF = Only Enemies Attack
 * @type boolean
 * @default true
 *
 * @param
 * @desc
 * @default
 *
 * @param Event 2 Visible
 * @desc Whether you want the event to be in the menu
 * This can be changed with plugin commands
 * @type boolean
 * @default true
 *
 * @param Event 2 Text
 * @desc The text for the first event which will appear in the Party command Menu
 * @type text
 * @default Event 2
 *
 * @param Event 2 ID
 * @desc The Id of the event you want to run
 * Ex. entering 1 will run Common Event 0001
 * @default 1
 * @type number
 *
 * @param Event 2 Turn
 * @desc Do you want this event to count as your party's turn
 * ON = Continue As Normal, OFF = Only Enemies Attack
 * @type boolean
 * @default true
 *
 * @param
 * @desc
 * @default
 *
 * @param Event 3 Visible
 * @desc Whether you want the event to be in the menu
 * This can be changed with plugin commands
 * @type boolean
 * @default false
 *
 * @param Event 3 Text
 * @desc The text for the first event which will appear in the Party command Menu
 * @type text
 * @default Event 3
 *
 * @param Event 3 ID
 * @desc The Id of the event you want to run
 * Ex. entering 1 will run Common Event 0001
 * @default 1
 * @type number
 *
 * @param Event 3 Turn
 * @desc Do you want this event to count as your party's turn
 * ON = Continue As Normal, OFF = Only Enemies Attack
 * @type boolean
 * @default true
 *
 * @param
 * @desc
 * @default
 *
 * @param Event 4 Visible
 * @desc Whether you want the event to be in the menu
 * This can be changed with plugin commands
 * @type boolean
 * @default false
 *
 * @param Event 4 Text
 * @desc The text for the first event which will appear in the Party command Menu
 * @type text
 * @default Event 4
 *
 * @param Event 4 ID
 * @desc The Id of the event you want to run
 * Ex. entering 1 will run Common Event 0001
 * @default 1
 * @type number
 *
 * @param Event 4 Turn
 * @desc Do you want this event to count as your party's turn
 * ON = Continue As Normal, OFF = Only Enemies Attack
 * @type boolean
 * @default true
 *
 * @param
 * @desc
 * @default
 *
 * @param Fight Visible
 * @desc Whether you want to show the fight option or not
 * This can be changed with plugin commands
 * @type boolean
 * @default true
 *
 * @param Escape Visible
 * @desc Whether you want to show the escape option or not
 * This can be changed with plugin commands
 * @type boolean
 * @default true
 *
 * @help
 * ===== Plugin Commands =====
 * You can change whether these commands show up or not during certain parts
 * of the game if you want.
 * true = add to window, false = remove from window
 *
 * PartyCommand event1 "true/false"
 * PartyCommand event2 "true/false"
 * PartyCommand event3 "true/false"
 * PartyCommand event4 "true/false"
 * PartyCommand fight "true/false"
 * PartyCommand escape "true/false"
 *
 * ===== Help =====
 * Visible
 * Tells you if the event will show up as an option on the command window
 *
 * Text
 * This is the text that will appear for the event in the command window
 *
 * ID
 * This is the number of the common event you want to run
 * 
 * Turn
 * If you want the event to count as the player's action or not
 *
 * ===== Log =====
 * Free for commercial and non-commercial use
 *
 * Version 1:
 * - you can add up to three common events to the command window
 * - you can remove escape from the command window
 *
 * Version 2:
 * - parameters window has been updated
 * - added the option for a fourth event
 * - you can now remove the fight command
 * - added plugin commands
 *
 * Version 3:
 * - fixed bug where states progress when they shouldn't
 */


(function() {

  // setting values for all the parameters
  var parameters = PluginManager.parameters('CommonEventPartyCommandsV3');

  var event1Visible = (parameters['Event 1 Visible'] || "true") === "true";
  var event1Text = String(parameters['Event 1 Text'] || "Event 1");
  var event1ID = Number(parameters['Event 1 ID'] || 1);
  var event1Turn = (parameters['Event 1 Turn'] || "true") === "true";

  var event2Visible = (parameters['Event 2 Visible'] || "true") === "true";
  var event2Text = String(parameters['Event 2 Text'] || "Event 2");
  var event2ID = Number(parameters['Event 2 ID'] || 1);
  var event2Turn = (parameters['Event 2 Turn'] || "true") === "true";

  var event3Visible = (parameters['Event 3 Visible'] || "false") === "true";
  var event3Text = String(parameters['Event 3 Text'] || "Event 3");
  var event3ID = Number(parameters['Event 3 ID'] || 1);
  var event3Turn = (parameters['Event 3 Turn'] || "true") === "true";

  var event4Visible = (parameters['Event 4 Visible'] || "false") === "true";
  var event4Text = String(parameters['Event 4 Text'] || "Event 4");
  var event4ID = Number(parameters['Event 4 ID'] || 1);
  var event4Turn = (parameters['Event 4 Turn'] || "true") === "true";

  var fightVisible = (parameters['Fight Visible'] || "true") === "true";
  var escapeVisible = (parameters['Escape Visible'] || "true") === "true";



  // adding choices to the party command window
  Window_PartyCommand.prototype.makeCommandList = function() {
    if(fightVisible) {
      this.addCommand(TextManager.fight,  'fight');
    }

    if(event1Visible) {
      this.addCommand(event1Text,  'event1');
    }
    if(event2Visible) {
      this.addCommand(event2Text,  'event2');
    }
    if(event3Visible) {
      this.addCommand(event3Text,  'event3');
    }
    if(event4Visible) {
      this.addCommand(event4Text,  'event4');
    }

    if(escapeVisible) {
      this.addCommand(TextManager.escape, 'escape', BattleManager.canEscape());
    }
  };

// adding functions to the party command window
Scene_Battle.prototype.createPartyCommandWindow = function() {
    this._partyCommandWindow = new Window_PartyCommand();
    this._partyCommandWindow.setHandler('fight',  this.commandFight.bind(this));
    this._partyCommandWindow.setHandler('event1', this.commandEvent1.bind(this));
    this._partyCommandWindow.setHandler('event2', this.commandEvent2.bind(this));
    this._partyCommandWindow.setHandler('event3', this.commandEvent3.bind(this));
    this._partyCommandWindow.setHandler('event4', this.commandEvent4.bind(this));
    this._partyCommandWindow.setHandler('escape', this.commandEscape.bind(this));
    this._partyCommandWindow.deselect();
    this.addWindow(this._partyCommandWindow);
};



  // Creating restart turn function
  BattleManager.restartTurn = function() {
    this._phase = 'turnEnd';
    this._preemptive = false;
    this._surprise = false;
    if (this.isForcedTurn()) {
        this._turnForced = false;
    }
  };



  // running common events
  Scene_Battle.prototype.commandEvent1 = function() {
    $gameTemp.reserveCommonEvent(event1ID);

    if (event1Turn === true) {
      BattleManager.restartTurn();
    }
    else {
      BattleManager.startTurn();
    }
  };

    Scene_Battle.prototype.commandEvent2 = function() {
    $gameTemp.reserveCommonEvent(event2ID);

    if (event2Turn === true) {
      BattleManager.restartTurn();
    }
    else {
      BattleManager.startTurn();
    }
  };

    Scene_Battle.prototype.commandEvent3 = function() {
    $gameTemp.reserveCommonEvent(event3ID);

    if (event3Turn === true) {
      BattleManager.restartTurn();
    }
    else {
      BattleManager.startTurn();
    }
  };

  Scene_Battle.prototype.commandEvent4 = function() {
    $gameTemp.reserveCommonEvent(event4ID);

    if (event4Turn === true) {
      BattleManager.restartTurn();
    }
    else {
      BattleManager.startTurn();
    }
  };



  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "PartyCommand") {
        switch (args[0].toLowerCase()) {
          case 'event1':
            event1Visible = Boolean(args[1] === "true");
            break;
          case 'event2':
            event2Visible = Boolean(args[1] === "true");
            break;
          case 'event3':
            event3Visible = Boolean(args[1] === "true");
            break;
          case 'event4':
            event4Visible = Boolean(args[1] === "true");
            break;
          case 'fight':
            fightVisible = Boolean(args[1] === "true");
            break;
          case 'escape':
            escapeVisible = Boolean(args[1] === "true");
            break;
        }
      }
  };


})();
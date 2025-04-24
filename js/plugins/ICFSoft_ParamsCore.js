//=============================================================================
// ICF-Soft Plugins - Params Core
// ICFSoft_ParamsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.ICFSoft_ParamCore = true;

var ICF = ICF || {};
ICF.ParamCore = ICF.ParamCore || {};

ICF.ParamCore.Version = 104; // 1.04

//=============================================================================
 /*:
 * @plugindesc v1.04b This plugin allow to add new full custom params and 
 * more basic and x/sparam control.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param NParam0 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam0 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam0 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam0 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam0 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam0 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam1 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam1 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam1 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam1 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam1 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam1 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam2 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam2 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam2 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam2 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam2 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam2 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam3 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam3 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam3 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam3 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam3 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam3 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam4 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam4 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam4 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam4 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam4 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam4 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam5 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam5 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam5 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam5 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam5 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam5 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam6 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam6 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam6 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam6 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam6 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam6 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam7 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam7 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam7 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam7 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam7 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam7 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam8 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam8 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam8 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam8 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam8 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam8 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam9 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam9 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam9 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam9 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam9 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam9 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam10 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam10 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam10 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam10 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam10 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam10 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam11 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam11 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam11 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam11 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam11 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam11 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam12 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam12 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam12 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam12 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam12 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam12 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam13 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam13 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam13 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam13 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam13 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam13 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam14 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam14 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam14 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam14 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam14 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam14 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam15 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam15 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam15 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam15 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam15 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam15 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam16 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam16 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam16 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam16 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam16 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam16 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam17 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam17 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam17 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam17 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam17 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam17 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam18 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam18 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam18 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam18 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam18 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam18 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam19 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam19 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam19 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam19 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam19 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam19 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam20 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam20 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam20 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam20 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam20 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam20 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam21 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam21 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam21 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam21 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam21 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam21 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam22 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam22 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam22 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam22 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam22 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam22 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam23 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam23 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam23 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam23 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam23 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam23 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam24 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam24 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam24 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam24 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam24 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam24 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam25 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam25 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam25 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam25 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam25 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam25 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam26 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam26 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam26 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam26 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam26 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam26 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam27 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam27 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam27 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam27 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam27 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam27 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam28 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam28 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam28 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam28 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam28 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam28 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam29 Name
 * @desc Name for this new param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param NParam29 Full Name
 * @desc Name that will be shown for this new param.
 * @default
 *
 * @param NParam29 Base
 * @desc How this new param is configured by default. See help.
 * @default 30 15
 *
 * @param NParam29 Limits
 * @desc Formula for min and max value for this new param. See help.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam29 Buff Icons
 * @desc Icons for each buff stack. Empty to don't use. See help.
 * @default
 *
 * @param NParam29 Debuff Icons
 * @desc Icons for each debuff stack. Empty to don't use. See help.
 * @default
 *
 * @param PParam0 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam0 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam0 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam1 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam1 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam1 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam2 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam2 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam2 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam3 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam3 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam3 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam4 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam4 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam4 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam5 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam5 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam5 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam6 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam6 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam6 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam7 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam7 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam7 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam8 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam8 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam8 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam9 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam9 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam9 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam10 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam10 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam10 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam11 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam11 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam11 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam12 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam12 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam12 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam13 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam13 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam13 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam14 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam14 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam14 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam15 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam15 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam15 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam16 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam16 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam16 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam17 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam17 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam17 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam18 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam18 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam18 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam19 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam19 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam19 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam20 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam20 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam20 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam21 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam21 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam21 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam22 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam22 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam22 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam23 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam23 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam23 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam24 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam24 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam24 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam25 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam25 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam25 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam26 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam26 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam26 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam27 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam27 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam27 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam28 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam28 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam28 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param PParam29 Name
 * @desc Name for this plain param in lowercase without spaces. Empty to skip.
 * @default
 *
 * @param PParam29 Full Name
 * @desc Name that will be shown for this plain param.
 * @default
 *
 * @param PParam29 Base
 * @desc Formula for base value for this plain param.
 * @default 0
 *
 * @param BParam0 Name
 * @desc Alias for this basic param. You can to redefine it.
 * @default mhp
 *
 * @param BParam0 Limits
 * @desc Formula for min and max value for this param. See help.
 * Hit points
 * @default (this.isActor())? [1, 9999, 12000] : [1, 999999, 1200000]
 *
 * @param BParam1 Name
 * @desc Alias for this basic param. You can to redefine it.
 * @default mmp
 *
 * @param BParam1 Limits
 * @desc Formula for min and max value for this param. See help.
 * Magic points
 * @default (this.isActor())? [0, 9999, 12000] : [0, 9999, 12000]
 *
 * @param BParam2 Name
 * @desc Alias for this basic param. You can to redefine it.
 * @default atk
 *
 * @param BParam2 Limits
 * @desc Formula for min and max value for this param. See help.
 * Attack
 * @default (this.isActor())? [1, 999, 1200]   : [1, 999, 1200]
 *
 * @param BParam3 Name
 * @desc Alias for this basic param. You can to redefine it.
 * @default def
 *
 * @param BParam3 Limits
 * @desc Formula for min and max value for this param. See help.
 * Defense
 * @default (this.isActor())? [1, 999, 1200]   : [1, 999, 1200]
 *
 * @param BParam4 Name
 * @desc Alias for this basic param. You can to redefine it.
 * @default mat
 *
 * @param BParam4 Limits
 * @desc Formula for min and max value for this param. See help.
 * Magic attack
 * @default (this.isActor())? [1, 999, 1200]   : [1, 999, 1200]
 *
 * @param BParam5 Name
 * @desc Alias for this basic param. You can to redefine it.
 * @default mdf
 *
 * @param BParam5 Limits
 * @desc Formula for min and max value for this param. See help.
 * Magic defense
 * @default (this.isActor())? [1, 999, 1200]   : [1, 999, 1200]
 *
 * @param BParam6 Name
 * @desc Alias for this basic param. You can to redefine it.
 * @default agi
 *
 * @param BParam6 Limits
 * @desc Formula for min and max value for this param. See help.
 * Agility
 * @default (this.isActor())? [1, 999, 1200]   : [1, 999, 1200]
 *
 * @param BParam7 Name
 * @desc Alias for this basic param. You can to redefine it.
 * @default luk
 *
 * @param BParam7 Limits
 * @desc Formula for min and max value for this param. See help.
 * Luck
 * @default (this.isActor())? [1, 999, 1200]   : [1, 999, 1200]
 *
 * @param XParam0 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Hit rate
 *
 * @param XParam0 Base
 * @desc Formula for base value for x param hit (HIT rate).
 * @default 0
 *
 * @param XParam1 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Evasion rate
 *
 * @param XParam1 Base
 * @desc Formula for base value for x param eva (EVAsion rate).
 * @default 0
 *
 * @param XParam2 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Critical rate
 *
 * @param XParam2 Base
 * @desc Formula for base value for x param cri (CRItical rate).
 * @default 0
 *
 * @param XParam3 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Critical evasion rate
 *
 * @param XParam3 Base
 * @desc Formula for base value for x param cev (Critical Evasion Rate).
 * @default 0
 *
 * @param XParam4 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Magic evasion rate
 *
 * @param XParam4 Base
 * @desc Formula for base value for x param mev (Magic EVasion rate).
 * @default 0
 *
 * @param XParam5 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Magic reflection rate
 *
 * @param XParam5 Base
 * @desc Formula for base value for x param mrf (Magic ReFlection rate).
 * @default 0
 *
 * @param XParam6 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Counter-attack rate
 *
 * @param XParam6 Base
 * @desc Formula for base value for x param cnt (CouNTer attack rate).
 * @default 0
 *
 * @param XParam7 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Hp-regen rate
 *
 * @param XParam7 Base
 * @desc Formula for base value for x param hrg (Hp ReGeneration rate).
 * @default 0
 *
 * @param XParam8 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Mp-regen rate
 *
 * @param XParam8 Base
 * @desc Formula for base value for x param mrg (Mp ReGeneration rate).
 * @default 0
 *
 * @param XParam9 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Tp-regen rate
 *
 * @param XParam9 Base
 * @desc Formula for base value for x param trg (Tp ReGeneration rate).
 * @default 0
 *
 * @param SParam0 Full Name
 * @desc Name that will be shown for this special param.
 * @default Targeted rate
 *
 * @param SParam0 Base
 * @desc Formula for base value for x param tgr (TarGet Rate).
 * @default 1
 *
 * @param SParam1 Full Name
 * @desc Name that will be shown for this special param.
 * @default Guard rate
 *
 * @param SParam1 Base
 * @desc Formula for base value for s param grd (GuaRD effect rate).
 * @default 1
 *
 * @param SParam2 Full Name
 * @desc Name that will be shown for this special param.
 * @default Recovery rate
 *
 * @param SParam2 Base
 * @desc Formula for base value for s param rec (RECovery effect rate).
 * @default 1
 *
 * @param SParam3 Full Name
 * @desc Name that will be shown for this special param.
 * @default Pharmacology
 *
 * @param SParam3 Base
 * @desc Formula for base value for s param pha (PHArmacology).
 * @default 1
 *
 * @param SParam4 Full Name
 * @desc Name that will be shown for this special param.
 * @default Mp cost rate
 *
 * @param SParam4 Base
 * @desc Formula for base value for s param mcr (Mp Cost Rate).
 * @default 1
 *
 * @param SParam5 Full Name
 * @desc Name that will be shown for this special param.
 * @default Tp cost rate
 *
 * @param SParam5 Base
 * @desc Formula for base value for s param tcr (Tp Cost Rate).
 * @default 1
 *
 * @param SParam6 Full Name
 * @desc Name that will be shown for this special param.
 * @default Phisical damage rate
 *
 * @param SParam6 Base
 * @desc Formula for base value for s param pdr (Physical Damage Rate).
 * @default 1
 *
 * @param SParam7 Full Name
 * @desc Name that will be shown for this special param.
 * @default Magical damage rate
 *
 * @param SParam7 Base
 * @desc Formula for base value for s param mdr (Magical Damage Rate).
 * @default 1
 *
 * @param SParam8 Full Name
 * @desc Name that will be shown for this special param.
 * @default Floor damage rate
 *
 * @param SParam8 Base
 * @desc Formula for base value for s param fdr (Floor Damage Rate).
 * @default 1
 *
 * @param SParam9 Full Name
 * @desc Name that will be shown for this special param.
 * @default Experience rate
 *
 * @param SParam9 Base
 * @desc Formula for base value for s param exr (EXperience Rate).
 * @default 1
 *
 * @param Developer HaltJS
 * @desc When true it throws an error if a custom class param/nparam
 * javascript doesn't work.   NO - false     YES - true
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * 
 * By default there are some fixed types of params, there are usefull but
 * have specified purposes and limits the way you can use them.
 * 
 * With this plugin you can add new params that can be used in your formulas
 * and every use you can imagine.
 * 
 * There are 2 new param types:
 *  -New/Normal Params: Level based params like the default ones,
 *   with buff/debuff effects and trait modifiers.
 *   Plus an option that can be used in some enemy levels plugins.
 * 
 *  -Plain Params: Non level based params, these work as x/sparams
 *   with trait modifiers.
 * 
 * Now there are more customization and control for basic, x and s params.
 * And a new double cap feature.
 * 
 * ============================================================================
 * How to use
 * ============================================================================
 * 
 * NParams and PParams are calculated with their respective formulas:
 * 
 * NParam = (Base + Plus) * Rate * XRate * Buff + Flat + XFlat
 * PParam = (Base + Plus) * Rate + Flat
 * 
 *   -Base is different for n and pparams. For NParams is a level based value.
 *    For PParam is a fixed value used to emulate x/sparams (0 and 1).
 *   -Plus is the sum of all plus traits attached to a battler. In case of
 *    NParam there is an extra added by script calls and item effects.
 *   -Rate is the product of all trait multipliers attached to a battler.
 *   -XRate is the product of all trait x-multipliers attached to a battler.
 *   -Buff is de effect of buff/debuff.
 *   -Flat is the sum of all flat trais attached to a battler. It isn't affected
 *    by any rate.
 *   -XFlat is the sum of all x-flat trais attached to a battler. It isn't affected
 *    by any rate.
 * 
 * XRate, XFlat and Buff can make param to pass througth first max cap.
 * 
 * To make XParams and SParams more customizable I've changed a little
 * their formulas:
 * 
 * Param  = (Base + Plus) * Rate * XRate * Buff + Flat + XFlat
 * XParam = (Base + Plus) * Rate + Flat
 * SParam = (Base + Plus) * Rate + Flat
 * 
 * They still work as usual but now you can add traits to have more control.
 * 
 * To add traits you can use notetags inside data.
 * 
 * Classes and enemies only:
 * 
 * <NPARAM: NParam Base Grow HGrow Cap>
 *    -Overrides default NParam for specified class/enemy.
 *     NParam can be referenced by it's name or index.
 *     Base is the initial value in level 1.
 *     Grow is how much is increased per level. If empty it will be fixed.
 *     HGrow is similar to Grow but in an exponential way.
 *     Cap is the level at wich NParam stops growing.
 *     You can use decimal numbers.
 *     
 * 
 * Actors, classes, enemies, weapons, armors and states:
 * 
 * <NDEBUFFRATE: NParam Rate>
 *    -This is used for nparam debuff resistance, it's the chance of
 *     succes debuff.
 *     0.5 means 50% debuff succes, 0.2 is 20% and so on.
 * 
 * 
 * <NPARAMPLUS: NParam Plus>
 * <NPARAMRATE: NParam Rate>
 * <NPARAMXRATE: NParam XRate>
 * <NPARAMFLAT: NParam Flat>
 * <NPARAMXFLAT: NParam Flat>
 *    -There are plus, rate, xrate and flat modifiers for nparam.
 * 
 * <PPARAMPLUS: PParam Plus>
 * <PPARAMRATE: PParam Rate>
 * <PPARAMFLAT: PParam Flat>
 *    -There are plus, rate and flat modifiers for pparam.
 * 
 * <PARAMPLUS: Param Plus>
 * <PARAMRATE: Param Rate>
 * <PARAMXRATE: Param XRate>
 * <PARAMFLAT: Param Flat>
 * <PARAMXFLAT: Param Flat>
 * <xPARAMPLUS: XParam Plus>
 * <XPARAMRATE: XParam Rate>
 * <XPARAMFLAT: XParam Flat>
 * <SPARAMPLUS: SParam Plus>
 * <SPARAMRATE: SParam Rate>
 * <SPARAMFLAT: SParam Flat>
 *    -There are plus, rate, xrate and flat modifiers for x and sparam.
 *     I have included these to give more control.
 * 
 * 
 * Skills and items only:
 * 
 * <NBUFF: NParam turns>
 * <NDEBUFF: NParam turns>
 * <REMOVE NBUFF: NParam>
 * <REMOVE NDEBUFF: NParam>
 *    -There are buff/debuff effects to attach to skills and items.
 * 
 * <NPARAM GROW: NParam amount>
 *    -Allow to increase/decrease nparam by a specified amount.
 * 
 * ============================================================================
 * Lunatic Mode
 * ============================================================================
 *
 * Knowing javascript you can redefine specific base value for params
 * and nparams for classes and enemies through lunatic mode.
 * 
 * It also work in notetags:
 *
 * <CUSTOM NPARAM BASE NPARAM>
 * value = 2;
 * value += 25;
 * </CUSTOM NPARAM BASE>
 * 
 * <CUSTOM PARAM BASE PARAM>
 * value = 2;
 * value += 25;
 * </CUSTOM PARAM BASE>
 * 
 * Those params defined will use their formula instead of normal base
 * value calculation. You can use javascript between these tags to alter
 * the final result.
 * 
 * value - This is the value you want to alter with your own formula.
 *         It starts at 0.
 * 
 * ============================================================================
 * Parameters
 * ============================================================================
 * 
 * There are avaiable up to 30 params of each type with indexes from 0 to 29.
 * 
 * NParamX Name: the name you give to specified nparam. It will be used
 * in formulas and can be used to reference a notetag.
 * Leave empty to skip.
 * 
 * NParamX Full Name: the name you give to specified nparam. It is not used
 * here but usefull for plugins that need this.
 * 
 * NParamX Base: the default formula for classes/enemies if they haven't.
 * First number is the value at level 1. Second is the amount gained
 * each level. Third is a level exponential grow and fourth is the level at
 * wich will stop growing.
 *
 * NParamX Limits: the min and max value a nparam can be. It's used now
 * as a formula and needs 3 values.
 * First is min, second is normal max and third is X-max.
 * By default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * NParamX Buff Icons:
 * This is an array of icons separated by spaces. When specified param is
 * affected by a positive buff will be shown. Is starts with first and
 * use next for each buff stack. If you don't want to use it leave Empty.
 *
 * NParamX Debuff Icons:
 * Same as previous but with debuff stack. Empty to don't use.
 *
 * PParamX Name: the name you give to specified pparam. It will be used
 * in formulas and can be used to reference a notetag.
 * Leave empty to skip.
 *
 * PParamX Full Name: the name you give to specified pparam. It is not used
 * here but usefull for plugins that need this.
 *
 * PParamX Base: is a base value that can be used to emulate x/sparams.
 * 0 is used for a xparam and 1 for a sparam.
 * It works as a formula so you can do it param based.
 * 
 * Current basic, x and s params can also be customized througth params.
 * 
 * BParamX Name: the alias you give to specified param. Can be used to
 * redefine or recicle a param. It will be used in formulas and can be used
 * to reference a notetag.
 *
 * BParamX Limits: the min and max value a param can be. It uses a
 * formula and needs 3 values. Same as nparams.
 * First is min, second is normal max and third is X-max.
 *
 * XParamX Base: xparams are 0 by default but you can have more control
 * because it works as a formula.
 *
 * SParamX Base: sparams are 1 by default but you can have more control
 * because it works as a formula.
 * 
 * Developer HaltJS: This is a development variable usefull to check if there is
 * a wrong javascript nparam or basic param.
 * When true will throw an error when it found a wrong javascript in lunatic
 * mode and tell specified param.
 * When false it will be ignored and game continues.
 * 
 * ============================================================================
 * More Params
 * ============================================================================
 * 
 * When Main Core released you will be able to add more params.
 * 
 * Use "NParam" and "PParam" commands to add them.
 * Note: Database fields that reffers to param indexes higher than 29 must
 * reffer to number. Javascript code can still reffer to param names.
 * 
 * NParam 30 crea Creativity
 * base 30 12 0.3 50
 * limit (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 * buff 1 2 3 4 5 6 7
 * 
 * PParam 30 parry Arrow Parry
 * base 0.2
 * 
 * ============================================================================
 * Incompatibilities
 * ============================================================================
 * 
 * There's no known incompatible plugins yet.
 * 
 * ============================================================================
 * Known isues
 * ============================================================================
 * 
 * Not yet.
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.04:
 * - Allow ICF-Soft Main Core.
 * - Expanded lunatic mode to include enemies.
 * - More nparam control.
 * 
 * Version 1.03:
 * - Added XFlat for the double cap.
 * - Increased n/pparams to 30.
 * - Allow names for x/sparams.
 * 
 * Version 1.02:
 * - Allow to aliasing or redefining MV basic params.
 * 
 * Version 1.01:
 * - Use of ICF-Soft Main Utility.
 * - Added lunatic mode for custom params and nparams.
 * - Changed how min and max limits work.
 * - Added double cap.
 * - Added more traits.
 * - Use of base params.
 *
 * Version 1.00:
 * - Finished plugin!
 * 
 * ============================================================================
 * 
 * For commercial and non-commercial games.
 * Credit to ICF-Soft.
 * This entire header must be included with plugin.
 * 
 * ============================================================================
*/
//=============================================================================
 /*:es
 * @plugindesc v1.04b Este complemento permite añadir nuevos parámetros
 * personalizables y mayor control sobre los parámetros del MV.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param NParam0 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam0 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam0 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam0 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam0 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam0 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam1 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam1 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam1 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam1 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam1 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam1 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam2 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam2 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam2 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam2 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam2 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam2 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam3 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam3 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam3 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam3 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam3 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam3 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam4 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam4 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam4 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam4 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam4 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam4 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam5 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam5 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam5 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam5 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam5 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam5 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam6 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam6 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam6 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam6 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam6 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam6 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam7 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam7 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam7 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam7 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam7 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam7 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam8 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam8 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam8 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam8 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam8 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam8 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam9 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam9 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam9 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam9 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam9 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam9 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam10 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam10 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam10 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam10 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam10 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam10 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam11 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam11 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam11 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam11 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam11 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam11 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam12 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam12 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam12 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam12 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam12 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam12 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam13 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam13 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam13 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam13 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam13 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam13 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam14 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam14 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam14 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam14 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam14 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam14 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam15 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam15 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam15 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam15 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam15 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam15 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam16 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam16 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam16 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam16 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam16 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam16 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam17 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam17 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam17 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam17 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam17 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam17 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam18 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam18 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam18 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam18 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam18 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam18 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam19 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam19 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam19 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam19 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam19 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam19 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam20 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam20 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam20 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam20 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam20 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam20 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam21 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam21 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam21 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam21 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam21 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam21 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam22 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam22 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam22 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam22 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam22 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam22 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam23 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam23 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam23 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam23 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam23 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam23 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam24 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam24 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam24 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam24 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam24 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam24 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam25 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam25 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam25 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam25 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam25 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam25 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam26 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam26 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam26 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam26 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam26 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam26 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam27 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam27 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam27 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam27 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam27 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam27 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam28 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam28 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam28 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam28 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam28 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam28 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam29 Name
 * @desc Nombre para este nuevo parámetro en minúsculas. Vacío para saltar.
 * @default
 *
 * @param NParam29 Full Name
 * @desc Nombre mostrado para este nuevo parámetro.
 * @default
 *
 * @param NParam29 Base
 * @desc Modo predeterminado de configuración. Ver ayuda.
 * @default 30 15
 *
 * @param NParam29 Limits
 * @desc Una fórmula para los valores mínimo y máximos para este
 * nuevo parámetro. Ver ayuda.
 * @default (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 *
 * @param NParam29 Buff Icons
 * @desc Iconos a mostrar para cada valor de fortalecimiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param NParam29 Debuff Icons
 * @desc Iconos a mostrar para cada valor de debilitamiento.
 * Vacío no usar ninguno. Ver ayuda.
 * @default
 *
 * @param PParam0 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam0 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam0 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam1 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam1 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam1 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam2 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam2 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam2 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam3 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam3 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam3 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam4 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam4 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam4 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam5 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam5 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam5 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam6 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam6 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam6 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam7 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam7 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam7 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam8 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam8 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam8 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam9 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam9 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam9 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam10 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam10 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam10 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam11 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam11 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam11 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam12 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam12 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam12 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam13 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam13 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam13 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam14 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam14 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam14 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam15 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam15 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam15 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam16 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam16 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam16 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam17 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam17 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam17 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam18 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam18 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam18 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam19 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam19 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam19 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam20 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam20 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam20 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam21 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam21 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam21 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam22 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam22 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam22 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam23 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam23 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam23 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam24 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam24 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam24 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam25 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam25 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam25 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam26 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam26 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam26 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam27 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam27 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam27 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam28 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam28 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam28 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param PParam29 Name
 * @desc Nombre para este parámetro plano en minúsculas. Vacío para saltar.
 * @default
 *
 * @param PParam29 Full Name
 * @desc Nombre para mostrar para este parámetro plano.
 * @default
 *
 * @param PParam29 Base
 * @desc Fórmula para calcular el Valor básico de este parámetro plano.
 * @default 0
 *
 * @param BParam0 Name
 * @desc Alias para este parámetro. Puedes redefirlo.
 * @default mhp
 *
 * @param BParam0 Limits
 * @desc Una fórmula para los valores mínimo y máximos. Ver ayuda.
 * Vida
 * @default (this.isActor())? [1, 9999, 12000] : [1, 999999, 1200000]
 *
 * @param BParam1 Name
 * @desc Alias para este parámetro. Puedes redefirlo.
 * @default mmp
 *
 * @param BParam1 Limits
 * @desc Una fórmula para los valores mínimo y máximos. Ver ayuda.
 * Magia
 * @default (this.isActor())? [0, 9999, 12000] : [0, 9999, 12000]
 *
 * @param BParam2 Name
 * @desc Alias para este parámetro. Puedes redefirlo.
 * @default atk
 *
 * @param BParam2 Limits
 * @desc Una fórmula para los valores mínimo y máximos. Ver ayuda.
 * Ataque
 * @default (this.isActor())? [1, 999, 1200]   : [1, 999, 1200]
 *
 * @param BParam3 Name
 * @desc Alias para este parámetro. Puedes redefirlo.
 * @default def
 *
 * @param BParam3 Limits
 * @desc Una fórmula para los valores mínimo y máximos. Ver ayuda.
 * Defensa
 * @default (this.isActor())? [1, 999, 1200]   : [1, 999, 1200]
 *
 * @param BParam4 Name
 * @desc Alias para este parámetro. Puedes redefirlo.
 * @default mat
 *
 * @param BParam4 Limits
 * @desc Una fórmula para los valores mínimo y máximos. Ver ayuda.
 * Ataque mágico
 * @default (this.isActor())? [1, 999, 1200]   : [1, 999, 1200]
 *
 * @param BParam5 Name
 * @desc Alias para este parámetro. Puedes redefirlo.
 * @default mdf
 *
 * @param BParam5 Limits
 * @desc Una fórmula para los valores mínimo y máximos. Ver ayuda.
 * Defensa mágica
 * @default (this.isActor())? [1, 999, 1200]   : [1, 999, 1200]
 *
 * @param BParam6 Name
 * @desc Alias para este parámetro. Puedes redefirlo.
 * @default agi
 *
 * @param BParam6 Limits
 * @desc Una fórmula para los valores mínimo y máximos. Ver ayuda.
 * Agilidad
 * @default (this.isActor())? [1, 999, 1200]   : [1, 999, 1200]
 *
 * @param BParam7 Name
 * @desc Alias para este parámetro. Puedes redefirlo.
 * @default luk
 *
 * @param BParam7 Limits
 * @desc Una fórmula para los valores mínimo y máximos. Ver ayuda.
 * Suerte
 * @default (this.isActor())? [1, 999, 1200]   : [1, 999, 1200]
 *
 * @param XParam0 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Puntería
 *
 * @param XParam0 Base
 * @desc Fórmula para el parámetro-x hit (Puntería).
 * @default 0
 *
 * @param XParam1 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Evasión
 *
 * @param XParam1 Base
 * @desc Fórmula para el parámetro-x eva (EVAsión).
 * @default 0
 *
 * @param XParam2 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Probabilidad de crítico
 *
 * @param XParam2 Base
 * @desc Fórmula para el parámetro-x cri (probabilidad de CRÍtico).
 * @default 0
 *
 * @param XParam3 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Evadir crítico
 *
 * @param XParam3 Base
 * @desc Fórmula para el parámetro-x cev (evadir Crítico).
 * @default 0
 *
 * @param XParam4 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Evasión mágica
 *
 * @param XParam4 Base
 * @desc Fórmula para el parámetro-x param mev (evasión Mágica).
 * @default 0
 *
 * @param XParam5 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Reflejo mágico
 *
 * @param XParam5 Base
 * @desc Fórmula para el parámetro-x mrf (reflejar Magia).
 * @default 0
 *
 * @param XParam6 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Contraataque
 *
 * @param XParam6 Base
 * @desc Fórmula para el parámetro-x cnt (CoNTraataque).
 * @default 0
 *
 * @param XParam7 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Regenerar vida
 *
 * @param XParam7 Base
 * @desc Fórmula para el parámetro-x hrg (regeneración de vida).
 * @default 0
 *
 * @param XParam8 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Regenerar magia
 *
 * @param XParam8 Base
 * @desc Fórmula para el parámetro-x mrg (regeneración de magia).
 * @default 0
 *
 * @param XParam9 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Regenerar turbo
 *
 * @param XParam9 Base
 * @desc Fórmula para el parámetro-x trg (regeneración de tp).
 * @default 0
 *
 * @param SParam0 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Ser el objetivo
 *
 * @param SParam0 Base
 * @desc Fórmula para el parámetro-s tgr (ser el objetivo).
 * @default 1
 *
 * @param SParam1 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Efecto defensivo
 *
 * @param SParam1 Base
 * @desc Fórmula para el parámetro-s grd (efecto de defensa).
 * @default 1
 *
 * @param SParam2 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Efecto de recuperación
 *
 * @param SParam2 Base
 * @desc Fórmula para el parámetro-s rec (efecto de RECuperación).
 * @default 1
 *
 * @param SParam3 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Farmacología
 *
 * @param SParam3 Base
 * @desc Fórmula para el parámetro-s pha (PHArmacología).
 * @default 1
 *
 * @param SParam4 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Coste de mp
 *
 * @param SParam4 Base
 * @desc Fórmula para el parámetro-s mcr (coste de Mp).
 * @default 1
 *
 * @param SParam5 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Coste de tp
 *
 * @param SParam5 Base
 * @desc Fórmula para el parámetro-s tcr (coste de Tp).
 * @default 1
 *
 * @param SParam6 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Daño físico recibido
 *
 * @param SParam6 Base
 * @desc Fórmula para el parámetro-s pdr (daño físico recibido).
 * @default 1
 *
 * @param SParam7 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Daño mágico recibido
 *
 * @param SParam7 Base
 * @desc Fórmula para el parámetro-s mdr (daño Mágico recibido).
 * @default 1
 *
 * @param SParam8 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Daño por el terreno
 *
 * @param SParam8 Base
 * @desc Fórmula para el parámetro-s fdr (daño por el suelo).
 * @default 1
 *
 * @param SParam9 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Experiencia obtenible
 *
 * @param SParam9 Base
 * @desc Fórmula para el parámetro-s exr (EXperiencia obtenida).
 * @default 1
 *
 * @param Developer HaltJS
 * @desc Si está activado salta cuando una función personalizada
 * da error.   No - false   Si - true
 * @default false
 *
 * @help
 * ============================================================================
 * Introducción
 * ============================================================================
 * 
 * El RPG Maker MV viene con unos tipos fijos de parámetros, son útiles pero
 * tienen sus propósitos específicos y limita el modo en que los puedes usar.
 * 
 * Coneste complemento puedes añadir nuevos para usarlos en tus fórmulas
 * y cualquier uso que puedas imaginar.
 * 
 * Existen 2 nuevos tipos de parámetros:
 *  -Nuevo/Normal Params: Basados en el nivel igual que los que vienen por
 *   defecto, con los efectos de fortalecer/debilitar y modificadores.
 *   Además de una opción que puede servir en distintos complementos
 *   de niveles de enemigos.
 * 
 *  -Planos Params: No basados en nivel, funcionan como los x/sparams
 *   con modificadores.
 * 
 * Además se ha añadido personalización para los x/sparams que permite mayor
 * control.
 * Y una nueva característica que permite 2 topes para los params y nparams.
 * 
 * ============================================================================
 * Uso
 * ============================================================================
 * 
 * Los NParams y PParams son calculados mediante sus respectivas fórmulas:
 * 
 * NParam = (Base + Plus) * Rate * XRate * Buff + Flat + XFlat
 * PParam = (Base + Plus) * Rate + Flat
 * 
 *   -Base es distinto entre ambas. Para los NParams está basado en el nivel.
 *    Para los PParam el valor es fijo emulando los x/sparams (0 y 1).
 *   -Plus es la suma de todas las características plus que atañen al personaje.
 *    En el caso de NParam existe un extra añadido mediante llamadas a script
 *    y efectos de los objetos.
 *   -Rate es el producto de todos los multiplicadores que atañen al personaje.
 *   -XRate es el producto de todos los multiplicadores especiales que atañen
 *    al personaje.
 *   -Buff es el efecto de fortalecer/debilitar.
 *   -Flat es la suma de todas las características flat que atañen al personaje.
 *    No se ve afectado por los multiplicadores.
 *   -XFlat es la suma de todas las características flat especiales que atañen
 *    al personaje. No se ve afectado por los multiplicadores.
 * 
 * 
 * XRate, XFlat y Buff permiten ir más allá del primer límite.
 * 
 * Para hacer los XParams y SParams más personalizables he cambiado un poco
 * sus fórmulas:
 * 
 * Param  = (Base + Plus) * Rate * XRate * Buff + Flat + XFlat
 * XParam = (Base + Plus) * Rate + Flat
 * SParam = (Base + Plus) * Rate + Flat
 * 
 * Siguen funcionando como de costumbre pero ahora puedes añadir más
 * características para tener un mayor control.
 * 
 * Para añadir características basta con añadir etiquetas en los cuadros de notas
 * respectivos.
 * 
 * Clases y enemigos solo:
 * 
 * <NPARAM: NParam Base Grow HGrow Cap>
 *    -Cambia la base predeterminada del NParam por una específica.
 *     NParam se puede referenciar por su nombre o índice.
 *     Base es el valor inicial en el nivel 1.
 *     Grow es cuanto se incrementa por nivel. Si está vacío cuenta como 0.
 *     HGrow es similar a Grow pero de crecimiento exponencial.
 *     Cap es el nivel en el cual el NParam deja de subir.
 *     Puedes usar números decimales.
 *     
 * 
 * Héroes, clases, enemigos, armas, armaduras y estados alterados:
 * 
 * <NDEBUFFRATE: NParam Rate>
 *    -Se usa para la resistencia al debilitamiento en dicho nparam debuff,
 *     básicamente es la probabilidad de acierto.
 *     0.5 significa 50% acierto, 0.2 es 20%, etc.
 * 
 * 
 * <NPARAMPLUS: NParam Plus>
 * <NPARAMRATE: NParam Rate>
 * <NPARAMXRATE: NParam XRate>
 * <NPARAMFLAT: NParam Flat>
 * <NPARAMXFLAT: NParam XFlat>
 *    -Modificadores para el nparam.
 * 
 * <PPARAMPLUS: PParam Plus>
 * <PPARAMRATE: PParam Rate>
 * <PPARAMFLAT: PParam Flat>
 *    -Modificadores para el pparam.
 * 
 * <PARAMPLUS: Param Plus>
 * <PARAMRATE: Param Rate>
 * <PARAMXRATE: Param XRate>
 * <PARAMFLAT: Param Flat>
 * <PARAMXFLAT: Param XFlat>
 * <xPARAMPLUS: XParam Plus>
 * <XPARAMRATE: XParam Rate>
 * <XPARAMFLAT: XParam Flat>
 * <SPARAMPLUS: SParam Plus>
 * <SPARAMRATE: SParam Rate>
 * <SPARAMFLAT: SParam Flat>
 *    -Modificadores para los parámetros básicos, x e y.
 *     Los he incluido para dar más control.
 * 
 * 
 * Habilidades y objetos solo:
 * 
 * <NBUFF: NParam turns>
 * <NDEBUFF: NParam turns>
 * <REMOVE NBUFF: NParam>
 * <REMOVE NDEBUFF: NParam>
 *    -Efectos de añadir y quitar fortalecimiento/debilitamiento.
 * 
 * <NPARAM GROW: NParam amount>
 *    -Permite incrementar/decrementar el nparam una cantidad específica.
 * 
 * ============================================================================
 * Lunatic Mode
 * ============================================================================
 *
 * Para aquellos que quieren utilizar un modo personalizado para calcular
 * los parámetros he añadido el modo lunático.
 * El modo lunático permite utilizar código javascript diréctamente.
 * 
 * Usa las siguientes etiquetas en las clases y enemigos:
 *
 * <CUSTOM NPARAM BASE NPARAM>
 * value = 2;
 * value += 25;
 * </CUSTOM NPARAM BASE>
 * 
 * <CUSTOM PARAM BASE PARAM>
 * value = 2;
 * value += 25;
 * </CUSTOM PARAM BASE>
 * 
 * Dicho código se ejecutará en lugar de la fórmula predeterminada.
 * 
 * value - Esta es la variable donde se almacena el resultado.
 *         Si no se especifica será 0.
 * 
 * ============================================================================
 * Parámetros
 * ============================================================================
 * 
 * Hay disponibles hasta 30 parámetros de cada tipo con índices de 0 a 29.
 * 
 * NParamX Name: el nombre que le vas a dar al nparam. Se utilizará en
 * fórmulas y se puede usar como referencia en las etiquetas en las notas.
 * Dejar vacío si no se quiere usar.
 * 
 * NParamX Full Name: el nombre que quieres dar al nparam. Por el momento
 * no se usa aquí pero sirve para los plugins que usen este.
 * 
 * NParamX Base: la fórmula predeterminada para clases y enemigos que no tengan.
 * El primer númber es el valor en el nivel 1. El segundo es cuanto sube
 * cada nivel. El tercero es de crecimiento exponencial y el cuarto es el nivel
 * en el cual va a dejar de subir.
 *
 * NParamX Limits: los valores mínimo y máximo que puede tener el nparam.
 * Ahora se utiliza como fórmula que da 3 valores.
 * El primero es el mínimo, el segundo es máximo normal y el tercero es
 * el extra máximo.
 * (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 * 
 * NParamX Buff Icons: conjunto de iconos separados por espacios.
 * Cuando dicho parámetro se vea afectado por un fortalecimiento se mostrará
 * el icono correspondiente al fortalecimiento acumulado.
 * Si se deja en blanco no se usará.
 *
 * NParamX Debuff Icons: igual que el anterior pero para los
 * debilitamientos del parámetro.
 * 
 * PParamX Name: el nombre que le vas a dar al pparam. Se utilizará en
 * fórmulas y se puede usar como referencia en las etiquetas en las notas.
 * Dejar vacío si no se quiere usar.
 *
 * PParamX Full Name: el nombre que quieres dar al pparam. Por el momento
 * no se usa aquí pero sirve para los plugins que usen este.
 *
 * PParamX Base: es un valor básico con el que se pueden emular los x/sparams.
 * 0 para un xparam y 1 para un sparam. Ahora se pueden utilizar como
 * usar como referencia en las etiquetas en las notas.
 * 
 * Los parámetros básicos, x y s ahora se pueden personalizar mediante
 * los siguientes parámetros.
 * 
 * BParamX Name: un alias para el parámetro específico. Se puede usar para
 * redefinir o reciclar un parámetro. Se utilizará en fórmulas y se puede
 * to reference a notetag.
 *
 * BParamX Limits: límites igual que en los nparams.
 * El primero es el mínimo, el segundo es máximo normal y el tercero es
 * el extra máximo.
 *
 * XParamX Base: 0 como predeterminado, pero ahora como fórmula.
 *
 * SParamX Base: 1 como predeterminado, pero ahora como fórmula.
 * 
 * Developer HaltJS: Esta es una variable de uso durante el desarrollo del juego
 * útil cuando quieres comprobar si hay alguna función personalizada incorrecta.
 * Cuando está activado al encontrar un error el juego se para y muestra
 * en qué parámetro se encuentra el error.
 * Cuando está desactivado ignora el error y el juego continúa.
 * 
 * ============================================================================
 * Más Parámetros
 * ============================================================================
 * 
 * Si el Main Core está disponible puedes añadir más parámetros.
 * 
 * Mediante los comandos "NParam" y "PParam" es posible añadirlos.
 * Nota: Los campos de la base de datos que hacen referencia a parámetros cuyos
 * índices son mayores del 29 deben hacer referencia por número. El código
 * javascript, en cambio, sí que puede hacer referencia por el nombre.
 * 
 * NParam 30 crea Creatividad
 * base 30 12 0.3 50
 * limit (this.isActor())? [0, 999, 1200] : [0, 999, 1200]
 * buff 1 2 3 4 5 6 7
 * 
 * PParam 30 parry Bloqueo de flechas
 * base 0.2
 * 
 * ============================================================================
 * Incompatibilidades
 * ============================================================================
 * 
 * No se conocen complementos que sean incompatibles hasta la fecha.
 * 
 * ============================================================================
 * Problemas conocidos
 * ============================================================================
 * 
 * Por el momento ninguno.
 * 
 * ============================================================================
 * Historial de versiones
 * ============================================================================
 * 
 * Versión 1.04:
 * - Permite el ICF-Soft Main Core.
 * - Se ha expandido el modo lunático para afectar enemigos.
 * - Mayor control para los nparams.
 * 
 * Versión 1.03:
 * - Se ha añadido el modificador XFlat para el doble máximo.
 * - Se ha subido la cantidad de n/pparams a 30.
 * - Permite nombrar los parámetros especiales y extra.
 * 
 * Versión 1.02:
 * - Permite añadir alias o redefinir los parámetros básicos.
 * 
 * Versión 1.01:
 * - Se empieza a utilizar el ICF-Soft Main Utility.
 * - Se ha añadido el modo lunático para params y nparams.
 * - Se ha cambiado el cómo funcionan los límites mínimo y máximo.
 * - Se ha añadido el doble máximo.
 * - Se han añadido más características.
 * - Se pueden usar los base params.
 *
 * Versión 1.00:
 * - Complemento terminado.
 * 
 * ============================================================================
 * 
 * Para juegos comerciales y no comerciales.
 * Se debe incluir a ICF-Soft en los créditos.
 * Esta cabecera debe incluirse íntegramente con el plugin.
 * 
 * ============================================================================
*/
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

ICF.Parameters = PluginManager.parameters('ICFSoft_ParamsCore');
ICF.Param = ICF.Param || {};

ICF.Param.NParams = [];
ICF.Param.NParamsFullName = [];
ICF.Param.NParamBase = [];
ICF.Param.NParamLimit = [];
ICF.Param.NParamBuffIcons = [];
ICF.Param.NParamDebuffIcons = [];
ICF.Param.PParams = [];
ICF.Param.PParamsFullName = [];
ICF.Param.PParamBase = [];
ICF.Param.BParamLimit = [];
ICF.Param.XParamsFullName = [];
ICF.Param.XParamBase = [];
ICF.Param.SParamsFullName = [];
ICF.Param.SParamBase = [];

ICF.Param.BParams = ["mhp", "mmp", "atk", "def", "mat", "mdf", "agi", "luk"];
ICF.Param.XParams = ["hit", "eva", "cri", "cev", "mev", "mrf", "cnt", "hrg", "mrg", "trg"];
ICF.Param.SParams = ["tgr", "grd", "rec", "pha", "mcr", "tcr", "pdr", "mdr", "fdr", "exr"];

for (var i = 0; i < 30; i++) {
	ICF.Param.NParams[i] = String(ICF.Parameters['NParam' + i + ' Name']);
	ICF.Param.NParamsFullName[i] = String(ICF.Parameters['NParam' + i + ' Full Name']);
	ICF.Param.NParamBase[i] = String(ICF.Parameters['NParam' + i + ' Base']).split(/\s+/).leaveNumbers();
	ICF.Param.NParamLimit[i] = String(ICF.Parameters['NParam' + i + ' Limits']);
	ICF.Param.NParamBuffIcons[i] = String(ICF.Parameters['NParam' + i + ' Buff Icons']).split(/\s+/).leaveNumbers();
	ICF.Param.NParamDebuffIcons[i] = String(ICF.Parameters['NParam' + i + ' Debuff Icons']).split(/\s+/).leaveNumbers();
	ICF.Param.PParams[i] = String(ICF.Parameters['PParam' + i + ' Name']);
	ICF.Param.PParamsFullName[i] = String(ICF.Parameters['PParam' + i + ' Full Name']);
	ICF.Param.PParamBase[i] = String(ICF.Parameters['PParam' + i + ' Base']);
}

for (var i = 0; i < 10; i++) {
	ICF.Param.XParamsFullName[i] = String(ICF.Parameters['XParam' + i + ' Full Name']);
	ICF.Param.XParamBase[i] = String(ICF.Parameters['XParam' + i + ' Base']);
	ICF.Param.SParamsFullName[i] = String(ICF.Parameters['SParam' + i + ' Full Name']);
	ICF.Param.SParamBase[i] = String(ICF.Parameters['SParam' + i + ' Base']);
}

for (var i = 0; i < 8; i++) {
	ICF.Param.BParams[i] = String(ICF.Parameters['BParam' + i + ' Name']);
	ICF.Param.BParamLimit[i] = String(ICF.Parameters['BParam' + i + ' Limits']);
}

ICF.Param.ParamCoreHalt = ICF.Parameters['Developer HaltJS'].toLowerCase() === "true";

if (!Imported.ICFSoft_MainUtility) {throw new Error('This plugin requires ICF-Soft Main Utility plugin version 1.01 to work.\nYou can download it at icfsoft.blogspot.com inside plugins section.');}
if (ICF.MainUtility.Version < 101) {throw new Error('This plugin requires ICF-Soft Main Utility plugin version 1.01 to work.\nYou can download it at icfsoft.blogspot.com inside plugins section.');}

//=============================================================================
// Constants
//=============================================================================

Game_BattlerBase.TRAIT_NPARAM          = 24;
Game_BattlerBase.TRAIT_PPARAM          = 25;
Game_Action.EFFECT_ADD_NBUFF           = 35;
Game_Action.EFFECT_ADD_NDEBUFF         = 36;
Game_Action.EFFECT_REMOVE_NBUFF        = 37;
Game_Action.EFFECT_REMOVE_NDEBUFF      = 38;
Game_Action.EFFECT_NGROW               = 45;

//=============================================================================
// DataManager
//=============================================================================

ICF.ParamCore.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!ICF.ParamCore.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!ICF.ParamCore.Procesed) {
	DataManager.processParamCoreNotetags($dataActors);
	DataManager.processParamCoreNotetagsB($dataClasses);
	DataManager.processParamCoreNotetagsB($dataEnemies);
	DataManager.processParamCoreNotetags($dataWeapons);
	DataManager.processParamCoreNotetags($dataArmors);
	DataManager.processParamCoreNotetags($dataStates);
	DataManager.processParamCoreNotetagsC($dataSkills);
	DataManager.processParamCoreNotetagsC($dataItems);
	ICF.ParamCore.Procesed = true;
    }
    return true;
};

DataManager.processParamCoreNotetags = function(group) {
    var note1 = /<(?:NPARAMPLUS):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note1b = /<(?:NPARAMRATE):[ ]*(\w+)[ ]+(\d+(?:\.\d+)?)>/i;
    var note1c = /<(?:NPARAMFLAT):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note1d = /<(?:NPARAMXRATE):[ ]*(\w+)[ ]+(\d+(?:\.\d+)?)>/i;
    var note1e = /<(?:NPARAMXFLAT):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note2 = /<(?:PPARAMPLUS):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note2b = /<(?:PPARAMRATE):[ ]*(\w+)[ ]+(\d+(?:\.\d+)?)>/i;
    var note2c = /<(?:PPARAMFLAT):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note3 = /<(?:xPARAMPLUS):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note3b = /<(?:XPARAMRATE):[ ]*(\w+)[ ]+(\d+(?:\.\d+)?)>/i;
    var note3c = /<(?:XPARAMFLAT):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note4 = /<(?:SPARAMPLUS):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note4b = /<(?:SPARAMRATE):[ ]*(\w+)[ ]+(\d+(?:\.\d+)?)>/i;
    var note4c = /<(?:SPARAMFLAT):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note5 = /<(?:PARAMPLUS):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note5b = /<(?:PARAMRATE):[ ]*(\w+)[ ]+(\d+(?:\.\d+)?)>/i;
    var note5c = /<(?:PARAMFLAT):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note5d = /<(?:PARAMXRATE):[ ]*(\w+)[ ]+(\d+(?:\.\d+)?)>/i;
    var note5e = /<(?:PARAMXFLAT):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note6 = /<(?:NDEBUFFRATE):[ ]*(\w+)[ ]+(\d+(?:\.\d+)?)>/i;

    for (var n = 1; n < group.length; n++) {
	var obj = group[n];
	var notedata = obj.note.split(/[\r\n]+/);

	for (var i = 0; i < notedata.length; i++) {
		var line = notedata[i];
		if (line.match(note1)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:24, dataId:indx, value:Number(RegExp.$2)});
			}
		else if (line.match(note1b)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:24, dataId:indx + 100, value:Number(RegExp.$2)});
			}
		else if (line.match(note1c)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:24, dataId:indx + 200, value:Number(RegExp.$2)});
			}
		else if (line.match(note1d)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:24, dataId:indx + 300, value:Number(RegExp.$2)});
			}
		else if (line.match(note1e)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:24, dataId:indx + 400, value:Number(RegExp.$2)});
			}
		else if (line.match(note2)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.PParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:25, dataId:indx, value:Number(RegExp.$2)});
			}
		else if (line.match(note2b)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.PParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:25, dataId:indx + 100, value:Number(RegExp.$2)});
			}
		else if (line.match(note2c)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.PParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:25, dataId:indx + 200, value:Number(RegExp.$2)});
			}
		else if (line.match(note3)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.XParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:Game_BattlerBase.TRAIT_XPARAM, dataId:indx, value:Number(RegExp.$2)});
			}
		else if (line.match(note3b)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.XParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:Game_BattlerBase.TRAIT_XPARAM, dataId:indx + 10, value:Number(RegExp.$2)});
			}
		else if (line.match(note3c)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.XParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:Game_BattlerBase.TRAIT_XPARAM, dataId:indx + 20, value:Number(RegExp.$2)});
			}
		else if (line.match(note4)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.SParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:Game_BattlerBase.TRAIT_SPARAM, dataId:indx + 10, value:Number(RegExp.$2)});
			}
		else if (line.match(note4b)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.SParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:Game_BattlerBase.TRAIT_SPARAM, dataId:indx, value:Number(RegExp.$2)});
			}
		else if (line.match(note4c)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.SParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:Game_BattlerBase.TRAIT_SPARAM, dataId:indx + 20, value:Number(RegExp.$2)});
			}
		else if (line.match(note5)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.BParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:21, dataId:indx + 10, value:Number(RegExp.$2)});
			}
		else if (line.match(note5b)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.BParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:21, dataId:indx, value:Number(RegExp.$2)});
			}
		else if (line.match(note5c)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.BParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:21, dataId:indx + 20, value:Number(RegExp.$2)});
			}
		else if (line.match(note5d)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.BParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:21, dataId:indx + 30, value:Number(RegExp.$2)});
			}
		else if (line.match(note5e)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.BParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:21, dataId:indx + 40, value:Number(RegExp.$2)});
			}
		else if (line.match(note6)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:Game_BattlerBase.TRAIT_DEBUFF_RATE, dataId:indx + 10, value:Number(RegExp.$2)});
			}
	}
    }
};

DataManager.processParamCoreNotetagsB = function(group) {
    var grouparray = [];
    var note1 = /<(?:NPARAMPLUS):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note1b = /<(?:NPARAMRATE):[ ]*(\w+)[ ]+(\d+(?:\.\d+)?)>/i;
    var note1c = /<(?:NPARAMFLAT):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note1d = /<(?:NPARAMXRATE):[ ]*(\w+)[ ]+(\d+(?:\.\d+)?)>/i;
    var note1e = /<(?:NPARAMXFLAT):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note1x = /<(?:NPARAM):[ ]*(\w+)[ ]+(\d+(?:\.\d+)?)(?:[ ]+(\d+(?:\.\d+)?))?(?:[ ]+(\d+(?:\.\d+)?))?(?:[ ]+(\d+(?:\.\d+)?))?>/i;
    var note1y = /<(?:CUSTOM NPARAM BASE)[ ]+(\w+)>/i;
    var note1z = /<\/(?:CUSTOM NPARAM BASE)>/i;
    var note2 = /<(?:PPARAMPLUS):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note2b = /<(?:PPARAMRATE):[ ]*(\w+)[ ]+(\d+(?:\.\d+)?)>/i;
    var note2c = /<(?:PPARAMFLAT):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note3 = /<(?:xPARAMPLUS):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note3b = /<(?:XPARAMRATE):[ ]*(\w+)[ ]+(\d+(?:\.\d+)?)>/i;
    var note3c = /<(?:XPARAMFLAT):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note4 = /<(?:SPARAMPLUS):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note4b = /<(?:SPARAMRATE):[ ]*(\w+)[ ]+(\d+(?:\.\d+)?)>/i;
    var note4c = /<(?:SPARAMFLAT):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note5 = /<(?:PARAMPLUS):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note5b = /<(?:PARAMRATE):[ ]*(\w+)[ ]+(\d+(?:\.\d+)?)>/i;
    var note5c = /<(?:PARAMFLAT):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note5d = /<(?:PARAMXRATE):[ ]*(\w+)[ ]+(\d+(?:\.\d+)?)>/i;
    var note5e = /<(?:PARAMXFLAT):[ ]*(\w+)[ ]+((?:\-)?\d+(?:\.\d+)?)>/i;
    var note5y = /<(?:CUSTOM PARAM BASE)[ ]+(\w+)>/i;
    var note5z = /<\/(?:CUSTOM PARAM BASE)>/i;
    var note6 = /<(?:NDEBUFFRATE):[ ]*(\w+)[ ]+(\d+(?:\.\d+)?)>/i;

    for (var n = 1; n < group.length; n++) {
	var obj = group[n];
	var notedata = obj.note.split(/[\r\n]+/);

	obj.basicNParam = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
	obj.customNParam = ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''];
	obj.customBParam = ['','','','','','','','','',''];

	var nFlag = false;
	var bFlag = false;
	var nIndex = -1;
	var bIndex = -1;

	for (var i = 0; i < notedata.length; i++) {
		var line = notedata[i];
		if (line.match(note1)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:24, dataId:indx, value:Number(RegExp.$2)});
			}
		else if (line.match(note1b)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:24, dataId:indx + 100, value:Number(RegExp.$2)});
			}
		else if (line.match(note1c)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:24, dataId:indx + 200, value:Number(RegExp.$2)});
			}
		else if (line.match(note1d)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:24, dataId:indx + 300, value:Number(RegExp.$2)});
			}
		else if (line.match(note1e)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:24, dataId:indx + 400, value:Number(RegExp.$2)});
			}
		else if (line.match(note1x)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			obj.basicNParam[indx] = [Number(RegExp.$2)];
			if (!isNaN(Number(RegExp.$3))) obj.basicNParam[indx] = obj.basicNParam[indx].concat([Number(RegExp.$3)]);
			if (!isNaN(Number(RegExp.$4))) obj.basicNParam[indx] = obj.basicNParam[indx].concat([Number(RegExp.$4)]);
			if (!isNaN(Number(RegExp.$5))) obj.basicNParam[indx] = obj.basicNParam[indx].concat([Number(RegExp.$5)]);
			}
		else if (line.match(note1y)) {
			nFlag = true;
			nIndex = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			}
		else if (line.match(note1z)) {
			nFlag = false;
			}
		else if (line.match(note2)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.PParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:25, dataId:indx, value:Number(RegExp.$2)});
			}
		else if (line.match(note2b)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.PParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:25, dataId:indx + 100, value:Number(RegExp.$2)});
			}
		else if (line.match(note2c)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.PParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:25, dataId:indx + 200, value:Number(RegExp.$2)});
			}
		else if (line.match(note3)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.XParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:Game_BattlerBase.TRAIT_XPARAM, dataId:indx, value:Number(RegExp.$2)});
			}
		else if (line.match(note3b)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.XParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:Game_BattlerBase.TRAIT_XPARAM, dataId:indx + 10, value:Number(RegExp.$2)});
			}
		else if (line.match(note3c)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.XParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:Game_BattlerBase.TRAIT_XPARAM, dataId:indx + 20, value:Number(RegExp.$2)});
			}
		else if (line.match(note4)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.SParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:Game_BattlerBase.TRAIT_SPARAM, dataId:indx + 10, value:Number(RegExp.$2)});
			}
		else if (line.match(note4b)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.SParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:Game_BattlerBase.TRAIT_SPARAM, dataId:indx, value:Number(RegExp.$2)});
			}
		else if (line.match(note4c)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.SParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:Game_BattlerBase.TRAIT_SPARAM, dataId:indx + 20, value:Number(RegExp.$2)});
			}
		else if (line.match(note5)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.BParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:21, dataId:indx + 10, value:Number(RegExp.$2)});
			}
		else if (line.match(note5b)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.BParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:21, dataId:indx, value:Number(RegExp.$2)});
			}
		else if (line.match(note5c)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.BParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:21, dataId:indx + 20, value:Number(RegExp.$2)});
			}
		else if (line.match(note5d)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.BParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:21, dataId:indx + 30, value:Number(RegExp.$2)});
			}
		else if (line.match(note5e)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.BParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:21, dataId:indx + 40, value:Number(RegExp.$2)});
			}
		else if (line.match(note5y)) {
			bFlag = true;
			bIndex = (isNaN(Number(RegExp.$1)))? ICF.Param.BParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			}
		else if (line.match(note5z)) {
			bFlag = false;
			}
		else if (line.match(note6)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.traits.push({code:Game_BattlerBase.TRAIT_DEBUFF_RATE, dataId:indx + 10, value:Number(RegExp.$2)});
			}
		else if (nFlag && nIndex > -1) {
			obj.customNParam[nIndex] = obj.customNParam[nIndex] + line + '\n';
			}
		else if (bFlag && bIndex > -1) {
			obj.customBParam[bIndex] = obj.customBParam[bIndex] + line + '\n';
			}
	}
    }
};

DataManager.processParamCoreNotetagsC = function(group) {
    var note1 = /<(?:NBUFF):[ ]*(\w+)[ ]+(\d+)>/i;
    var note2 = /<(?:NDEBUFF):[ ]*(\w+)[ ]+(\d+)>/i;
    var note3 = /<(?:REMOVE NBUFF):[ ]*(\w+)[ ]+>/i;
    var note4 = /<(?:REMOVE NDEBUFF):[ ]*(\w+)[ ]+>/i;
    var note5 = /<(?:NPARAM GROW):[ ]*(\w+)[ ]+((?:\-)?\d+)>/i;

    for (var n = 1; n < group.length; n++) {
	var obj = group[n];
	var notedata = obj.note.split(/[\r\n]+/);

	for (var i = 0; i < notedata.length; i++) {
		var line = notedata[i];
		if (line.match(note1)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.effects.push({code:35, dataId:indx, value1:Number(RegExp.$2)});
			}
		else if (line.match(note2)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.effects.push({code:36, dataId:indx, value1:Number(RegExp.$2)});
			}
		else if (line.match(note3)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.effects.push({code:37, dataId:indx, value1:0});
			}
		else if (line.match(note4)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.effects.push({code:38, dataId:indx, value1:0});
			}
		else if (line.match(note5)) {
			var indx = (isNaN(Number(RegExp.$1)))? ICF.Param.NParams.indexOf(RegExp.$1.toLowerCase()) : Number(RegExp.$1);
			if (indx > -1) obj.effects.push({code:45, dataId:indx, value1:Number(RegExp.$2)});
			}
	}
    }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

for (var i = 0; i < 30; i++) {
	if (ICF.Param.NParams[i].length > 0) {
		eval("Object.defineProperty(Game_BattlerBase.prototype, ICF.Param.NParams[" + i + "], { get: function() { return this.NParam(" + i + "); }, configurable: true });");
	}
	if (ICF.Param.PParams[i].length > 0) {
		eval("Object.defineProperty(Game_BattlerBase.prototype, ICF.Param.PParams[" + i + "], { get: function() { return this.PParam(" + i + "); }, configurable: true });");
	}
}

if (ICF.Param.BParams[0].length > 0) Object.defineProperty(Game_BattlerBase.prototype, ICF.Param.BParams[0], { get: function() { return this.param(0); }, configurable: true });
if (ICF.Param.BParams[1].length > 0) Object.defineProperty(Game_BattlerBase.prototype, ICF.Param.BParams[1], { get: function() { return this.param(1); }, configurable: true });
if (ICF.Param.BParams[2].length > 0) Object.defineProperty(Game_BattlerBase.prototype, ICF.Param.BParams[2], { get: function() { return this.param(2); }, configurable: true });
if (ICF.Param.BParams[3].length > 0) Object.defineProperty(Game_BattlerBase.prototype, ICF.Param.BParams[3], { get: function() { return this.param(3); }, configurable: true });
if (ICF.Param.BParams[4].length > 0) Object.defineProperty(Game_BattlerBase.prototype, ICF.Param.BParams[4], { get: function() { return this.param(4); }, configurable: true });
if (ICF.Param.BParams[5].length > 0) Object.defineProperty(Game_BattlerBase.prototype, ICF.Param.BParams[5], { get: function() { return this.param(5); }, configurable: true });
if (ICF.Param.BParams[6].length > 0) Object.defineProperty(Game_BattlerBase.prototype, ICF.Param.BParams[6], { get: function() { return this.param(6); }, configurable: true });
if (ICF.Param.BParams[7].length > 0) Object.defineProperty(Game_BattlerBase.prototype, ICF.Param.BParams[7], { get: function() { return this.param(7); }, configurable: true });

Object.defineProperty(Game_BattlerBase.prototype, 'level', { value: 1, configurable: true});

ICF.ParamCore.clearParamPlus = Game_BattlerBase.prototype.clearParamPlus;
Game_BattlerBase.prototype.clearParamPlus = function() {
	ICF.ParamCore.clearParamPlus.call(this);
	this._NParamPlus = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
};

ICF.ParamCore.clearBuffs = Game_BattlerBase.prototype.clearBuffs;
Game_BattlerBase.prototype.clearBuffs = function() {
	ICF.ParamCore.clearBuffs.call(this);
	this._NBuffs = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	this._NBuffTurns = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
};

Game_BattlerBase.prototype.eraseNBuff = function(paramId) {
    this._NBuffs[paramId] = 0;
    this._NBuffTurns[paramId] = 0;
};

Game_BattlerBase.prototype.NBuffLength = function() {
    return this._NBuffs.length;
};

Game_BattlerBase.prototype.NBuff = function(paramId) {
    return this._NBuffs[paramId];
};

Game_BattlerBase.prototype.isNBuffAffected = function(paramId) {
    return this._NBuffs[paramId] > 0;
};

Game_BattlerBase.prototype.isNDebuffAffected = function(paramId) {
    return this._NBuffs[paramId] < 0;
};

Game_BattlerBase.prototype.isNBuffOrDebuffAffected = function(paramId) {
    return this._NBuffs[paramId] !== 0;
};

Game_BattlerBase.prototype.isMaxNBuffAffected = function(paramId) {
    return this._NBuffs[paramId] === 2;
};

Game_BattlerBase.prototype.isMaxNDebuffAffected = function(paramId) {
    return this._NBuffs[paramId] === -2;
};

Game_BattlerBase.prototype.increaseNBuff = function(paramId) {
    if (!this.isMaxNBuffAffected(paramId)) {
        this._NBuffs[paramId]++;
    }
};

Game_BattlerBase.prototype.decreaseNBuff = function(paramId) {
    if (!this.isMaxNDebuffAffected(paramId)) {
        this._NBuffs[paramId]--;
    }
};

Game_BattlerBase.prototype.overwriteNBuffTurns = function(paramId, turns) {
    if (this._NBuffTurns[paramId] < turns) {
        this._NBuffTurns[paramId] = turns;
    }
};

Game_BattlerBase.prototype.isNBuffExpired = function(paramId) {
    return this._NBuffTurns[paramId] === 0;
};

ICF.ParamCore.updateBuffTurns = Game_BattlerBase.prototype.updateBuffTurns;
Game_BattlerBase.prototype.updateBuffTurns = function() {
    ICF.ParamCore.updateBuffTurns.call(this);
    for (var i = 0; i < this._NBuffTurns.length; i++) {
        if (this._NBuffTurns[i] > 0) {
            this._NBuffTurns[i]--;
        }
    }
};

ICF.ParamCore.buffIcons = Game_BattlerBase.prototype.buffIcons;
Game_BattlerBase.prototype.buffIcons = function() {
    var icons = ICF.ParamCore.buffIcons.call(this);
    for (var i = 0; i < this._NBuffs.length; i++) {
        if ((this._NBuffs[i] > 0)&&(ICF.Param.NParamBuffIcons[i].length > 0)) {
            icons.push(ICF.Param.NParamBuffIcons[i][Math.min(ICF.Param.NParamBuffIcons[i].length, this._NBuffs[i]) - 1]);
        } else if ((this._NBuffs[i] < 0)&&(ICF.Param.NParamDebuffIcons[i].length > 0)) {
            icons.push(ICF.Param.NParamDebuffIcons[i][Math.min(ICF.Param.NParamDebuffIcons[i].length, Math.abs(this._NBuffs[i])) - 1]);
        }
    }
    return icons;
};

Game_BattlerBase.prototype.NParamBasic = function(array, level) {
    if (array.length == 1) {
        return Number(array[0]);
    } else if (array.length == 2) {
        return Number(array[0]) + Number(array[1] * (level - 1));
    } else if (array.length == 3 || array[3] > level) {
        return Number(array[0]) + Number(array[1] * (level - 1)) + Number(array[2] * Math.pow(level - 1,1.2));
    } else if (array.length > 3) {
        return Number(array[0]) + Number(array[1] * (array[3] - 1)) + Number(array[2] * Math.pow(array[3] - 1,1.2));
    } else {
        return 0;
    }
};

Game_BattlerBase.prototype.NParamBase = function(paramId) {
    var array = ICF.Param.NParamBase[paramId];
    if (array.length < 1) {
        return 0;
    } else {
        return this.NParamBasic(array, this.level);
    }
};

Game_BattlerBase.prototype.NParamPlus = function(paramId) {
    return this._NParamPlus[paramId] + this.traitsSum(Game_BattlerBase.TRAIT_NPARAM, paramId);
};

Game_BattlerBase.prototype.NParamLimits = function(paramId) {
    var array = eval(ICF.Param.NParamLimit[paramId]);
    if (!Array.isArray(array)) array = ICF.Param.NParamLimit[paramId].split(/\s+/).leaveNumbers();
    if (array.length < 1) array[0] = 0;
    if (array.length < 2) array[1] = 999;
    if (array.length < 3) array[2] = array[1];
    return array;
};

Game_BattlerBase.prototype.NParamRate = function(paramId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_NPARAM, paramId + 100);
};

Game_BattlerBase.prototype.NParamXRate = function(paramId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_NPARAM, paramId + 300);
};

Game_BattlerBase.prototype.NParamBuffRate = function(paramId) {
    return this._NBuffs[paramId] * 0.25 + 1.0;
};

Game_BattlerBase.prototype.NParamFlat = function(paramId) {
    return this.traitsSum(Game_BattlerBase.TRAIT_NPARAM, paramId + 200);
};

Game_BattlerBase.prototype.NParamXFlat = function(paramId) {
    return this.traitsSum(Game_BattlerBase.TRAIT_NPARAM, paramId + 400);
};

Game_BattlerBase.prototype.NParam = function(paramId) {
    var value = this.NParamBase(paramId) + this.NParamPlus(paramId);
    value *= this.NParamRate(paramId);
    var limits = this.NParamLimits(paramId);
    var buff = this.NParamXRate(paramId) * this.NParamBuffRate(paramId);
    value = Math.min(value, limits[1]);
    var flat = (buff > 1)? Math.min(this.NParamFlat(paramId), limits[1] - value) : Math.min(this.NParamFlat(paramId), limits[1] - value * buff);
    value *= buff;
    value += flat + this.NParamXFlat(paramId);
    return Math.round(value.clamp(limits[0], limits[2]));
};

Game_BattlerBase.prototype.PParamBase = function(pparamId) {
    return eval(ICF.Param.PParamBase[pparamId]) || 0;
}

Game_BattlerBase.prototype.PParam = function(pparamId) {
    var value = this.PParamBase(pparamId) + this.traitsSum(Game_BattlerBase.TRAIT_PPARAM, pparamId);
    value *= this.traitsPi(Game_BattlerBase.TRAIT_PPARAM, pparamId + 100);
    value += this.traitsSum(Game_BattlerBase.TRAIT_PPARAM, pparamId + 200);
    return value;
};

ICF.ParamCore.paramplus = Game_BattlerBase.prototype.paramPlus;
Game_BattlerBase.prototype.paramPlus = function(paramId) {
    return ICF.ParamCore.paramplus.call(this, paramId) + this.traitsSum(Game_BattlerBase.TRAIT_PARAM, paramId + 10);
};

Game_BattlerBase.prototype.paramFlat = function(paramId) {
    return this.traitsSum(Game_BattlerBase.TRAIT_PARAM, paramId + 20);
};

Game_BattlerBase.prototype.paramXFlat = function(paramId) {
    return this.traitsSum(Game_BattlerBase.TRAIT_PARAM, paramId + 40);
};

Game_BattlerBase.prototype.paramXRate = function(paramId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_PARAM, paramId + 30);
};

Game_BattlerBase.prototype.paramLimits = function(paramId) {
    return eval(ICF.Param.BParamLimit[paramId]) || [0, 999, 1200];
};

Game_BattlerBase.prototype.param = function(paramId) {
    var value = this.paramBase(paramId) + this.paramPlus(paramId);
    value *= this.paramRate(paramId);
    var limits = this.paramLimits(paramId);
    var buff = this.paramXRate(paramId) * this.paramBuffRate(paramId);
    value = Math.min(value, limits[1]);
    var flat = (buff > 1)? Math.min(this.paramFlat(paramId), limits[1] - value) : Math.min(this.paramFlat(paramId), limits[1] - value * buff);
    value *= buff;
    value += flat + this.paramXFlat(paramId);
    return Math.round(value.clamp(limits[0], limits[2]));
};

Game_BattlerBase.prototype.xparamBase = function(xparamId) {
    return eval(ICF.Param.XParamBase[xparamId]) || 0;
}

Game_BattlerBase.prototype.xparam = function(xparamId) {
    return (this.xparamBase(xparamId) + this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId)) * this.traitsPi(Game_BattlerBase.TRAIT_XPARAM, xparamId + 10) + this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId + 20);
};

Game_BattlerBase.prototype.sparamBase = function(sparamId) {
    return eval(ICF.Param.SParamBase[sparamId]) || 1;
}

Game_BattlerBase.prototype.sparam = function(sparamId) {
    return (this.sparamBase(sparamId) + this.traitsSum(Game_BattlerBase.TRAIT_SPARAM, sparamId + 10)) * this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId) + this.traitsSum(Game_BattlerBase.TRAIT_SPARAM, sparamId + 20);
};

Game_BattlerBase.prototype.NDebuffRate = function(paramId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_DEBUFF_RATE, paramId + 10);
};

Game_BattlerBase.prototype.addNParam = function(paramId, value) {
    this._NParamPlus[paramId] += value;
    this.refresh();
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.addNBuff = function(paramId, turns) {
    if (this.isAlive()) {
        this.increaseNBuff(paramId);
        if (this.isNBuffAffected(paramId)) {
            this.overwriteNBuffTurns(paramId, turns);
        }
        this._result.pushAddedNBuff(paramId);
        this.refresh();
    }
};

Game_Battler.prototype.addNDebuff = function(paramId, turns) {
    if (this.isAlive()) {
        this.decreaseNBuff(paramId);
        if (this.isNDebuffAffected(paramId)) {
            this.overwriteNBuffTurns(paramId, turns);
        }
        this._result.pushAddedNDebuff(paramId);
        this.refresh();
    }
};

Game_Battler.prototype.removeNBuff = function(paramId) {
    if (this.isAlive() && this.isNBuffOrDebuffAffected(paramId)) {
        this.eraseNBuff(paramId);
        this._result.pushRemovedNBuff(paramId);
        this.refresh();
    }
};

ICF.ParamCore.removeAllBuffs = Game_Battler.prototype.removeAllBuffs;
Game_Battler.prototype.removeAllBuffs = function() {
    ICF.ParamCore.removeAllBuffs.call(this);
    for (var i = 0; i < this.NBuffLength(); i++) {
        this.removeNBuff(i);
    }
};

ICF.ParamCore.removeBuffsAuto = Game_Battler.prototype.removeBuffsAuto;
Game_Battler.prototype.removeBuffsAuto = function() {
    ICF.ParamCore.removeBuffsAuto.call(this);
    for (var i = 0; i < this.NBuffLength(); i++) {
        if (this.isNBuffExpired(i)) {
            this.removeNBuff(i);
        }
    }
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.NParamBase = function(paramId) {
    if ($dataClasses[this._classId].customNParam[paramId] != '') {
	try { 	var value = 0;
		eval($dataClasses[this._classId].customNParam[paramId]);
		return value;
	    }
	catch (e) {if(ICF.Param.ParamCoreHalt){throw new Error('Error in custom NParam Base #' + paramId + ' in actor class #' + this._classId);}}
    }

    var array = $dataClasses[this._classId].basicNParam[paramId];

    if (!array || array.length < 1) return Game_BattlerBase.prototype.NParamBase.call(this, paramId);
    return this.NParamBasic(array, this.level);
};

ICF.ParamCore.actorparambase = Game_Actor.prototype.paramBase;
Game_Actor.prototype.paramBase = function(paramId) {
    if ($dataClasses[this._classId].customBParam[paramId] != '') {
	try { 	var value = 0;
		eval($dataClasses[this._classId].customBParam[paramId]);
		return value;
	    }
	catch (e) {if(ICF.Param.ParamCoreHalt){throw new Error('Error in custom Param Base #' + paramId + ' in actor class #' + this._classId);}}
    }

    return ICF.ParamCore.actorparambase.call(this, paramId);
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.NParamBase = function(paramId) {
    if ($dataEnemies[this._enemyId].customNParam[paramId] != '') {
	try { 	var value = 0;
		eval($dataEnemies[this._enemyId].customNParam[paramId]);
		return value;
	    }
	catch (e) {if(ICF.Param.ParamCoreHalt){throw new Error('Error in custom NParam Base #' + paramId + ' in enemy #' + this._enemyId);}}
    }

    var array = $dataEnemies[this._enemyId].basicNParam[paramId];

    if (!array || array.length < 1) return Game_BattlerBase.prototype.NParamBase.call(this, paramId);
    return this.NParamBasic(array, this.level);
};

ICF.ParamCore.enemyparambase = Game_Enemy.prototype.paramBase;
Game_Enemy.prototype.paramBase = function(paramId) {
    if ($dataEnemies[this._enemyId].customBParam[paramId] != '') {
	try { 	var value = 0;
		eval($dataEnemies[this._enemyId].customBParam[paramId]);
		return value;
	    }
	catch (e) {if(ICF.Param.ParamCoreHalt){throw new Error('Error in custom Param Base #' + paramId + ' in enemy #' + this._enemyId);}}
    }

    return ICF.ParamCore.enemyparambase.call(this, paramId);
};

//=============================================================================
// Game_Action
//=============================================================================

ICF.ParamCore.testItemEffect = Game_Action.prototype.testItemEffect;
Game_Action.prototype.testItemEffect = function(target, effect) {
    switch (effect.code) {
    case Game_Action.EFFECT_ADD_NBUFF :
        return !target.isMaxNBuffAffected(effect.dataId);
    case Game_Action.EFFECT_ADD_NDEBUFF :
        return !target.isMaxNDebuffAffected(effect.dataId);
    case Game_Action.REMOVE_NBUFF:
        return target.isNBuffAffected(effect.dataId);
    case Game_Action.REMOVE_NDEBUFF:
        return target.isNDebuffAffected(effect.dataId);
    default:
        return ICF.ParamCore.testItemEffect.call(this, target, effect);
    }
};

ICF.ParamCore.applyItemEffect = Game_Action.prototype.applyItemEffect;
Game_Action.prototype.applyItemEffect = function(target, effect) {
    switch (effect.code) {
    case Game_Action.EFFECT_ADD_NBUFF:
        this.itemEffectAddNBuff(target, effect);
        break;
    case Game_Action.EFFECT_ADD_NDEBUFF:
        this.itemEffectAddNDebuff(target, effect);
        break;
    case Game_Action.EFFECT_REMOVE_NBUFF:
        this.itemEffectRemoveNBuff(target, effect);
        break;
    case Game_Action.EFFECT_REMOVE_NDEBUFF:
        this.itemEffectRemoveNDebuff(target, effect);
        break;
    case Game_Action.EFFECT_NGROW:
        this.itemEffectGrowNParam(target, effect);
        break;
    default:
        ICF.ParamCore.applyItemEffect.call(this, target, effect);
    }
};

Game_Action.prototype.itemEffectAddNBuff = function(target, effect) {
    target.addNBuff(effect.dataId, effect.value1);
    this.makeSuccess(target);
};

Game_Action.prototype.itemEffectAddNDebuff = function(target, effect) {
    var chance = target.NDebuffRate(effect.dataId) * this.lukEffectRate(target);
    if (Math.random() < chance) {
        target.addNDebuff(effect.dataId, effect.value1);
        this.makeSuccess(target);
    }
};

Game_Action.prototype.itemEffectRemoveNBuff = function(target, effect) {
    if (target.isNBuffAffected(effect.dataId)) {
        target.removeNBuff(effect.dataId);
        this.makeSuccess(target);
    }
};

Game_Action.prototype.itemEffectRemoveNDebuff = function(target, effect) {
    if (target.isNDebuffAffected(effect.dataId)) {
        target.removeNBuff(effect.dataId);
        this.makeSuccess(target);
    }
};

Game_Action.prototype.itemEffectGrowNParam = function(target, effect) {
    target.addNParam(effect.dataId, Math.floor(effect.value1));
    this.makeSuccess(target);
};

//=============================================================================
// Game_ActionResult
//=============================================================================

ICF.ParamCore.GARClear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
    ICF.ParamCore.GARClear.call(this);
    this.addedNBuffs = [];
    this.addedNDebuffs = [];
    this.removedNBuffs = [];
};

Game_ActionResult.prototype.isNBuffAdded = function(paramId) {
    return this.addedNBuffs.contains(paramId);
};

Game_ActionResult.prototype.pushAddedNBuff = function(paramId) {
    if (!this.isNBuffAdded(paramId)) {
        this.addedNBuffs.push(paramId);
    }
};

Game_ActionResult.prototype.isNDebuffAdded = function(paramId) {
    return this.addedNDebuffs.contains(paramId);
};

Game_ActionResult.prototype.pushAddedNDebuff = function(paramId) {
    if (!this.isNDebuffAdded(paramId)) {
        this.addedNDebuffs.push(paramId);
    }
};

Game_ActionResult.prototype.isNBuffRemoved = function(paramId) {
    return this.removedNBuffs.contains(paramId);
};

Game_ActionResult.prototype.pushnRemovedBuff = function(paramId) {
    if (!this.isNBuffRemoved(paramId)) {
        this.removedNBuffs.push(paramId);
    }
};

//=============================================================================
// Game_Item
//=============================================================================

Game_Item.prototype.nparamTypes = function() {
    return this.traitDataTypesMod(24, 100);
};

Game_Item.prototype.pparamTypes = function() {
    return this.traitDataTypesMod(25, 100);
};

Game_Item.prototype.paramTypes = function() {
    return this.traitDataTypesMod(21, 10);
};

Game_Item.prototype.xparamTypes = function() {
    return this.traitDataTypesMod(22, 10);
};

Game_Item.prototype.sparamTypes = function() {
    return this.traitDataTypesMod(23, 10);
};

//=============================================================================
// Utility
//=============================================================================

if (Imported.ICFSoft_MainCore) {
	ICF.MainCore.functions['NParam'] = function(args, params) {
		var index = args.shift();
		ICF.Param.NParams[index] = args.shift();
		ICF.Param.NParamsFullName[index] = args.join(' ');
		ICF.Param.NParamBase[index] = ICF.Param.NParamBase[index] || [30,15,0.5];
		ICF.Param.NParamLimit[index] = ICF.Param.NParamLimit[index] || "(this.isActor())? [0, 999, 1200] : [0, 999, 1200]";
		ICF.Param.NParamBuffIcons[index] = ICF.Param.NParamBuffIcons[index] || [];
		ICF.Param.NParamDebuffIcons[index] = ICF.Param.NParamDebuffIcons[index] || [];
		for (var i = 0; i < params.length; i++) {
		    var ary = params[i].split(/\s+/);
		    var code = ary.shift().toLowerCase();
		    if (code == "base") {
			ICF.Param.NParamBase[index] = ary.leaveNumbers();
		    } else if (code == "limit") {
			ICF.Param.NParamLimit[index] = ary.join(" ");
		    } else if (code == "buff") {
			ICF.Param.NParamBuffIcons[index] = ary.leaveNumbers();
		    } else if (code == "debuff") {
			ICF.Param.NParamDebuffIcons[index] = ary.leaveNumbers();
		    }
		}
	}

	ICF.MainCore.functions['PParam'] = function(args, params) {
		var index = args.shift();
		ICF.Param.PParams[index] = args.shift();
		ICF.Param.PParamsFullName[index] = args.join(' ');
		ICF.Param.PParamBase[index] = ICF.Param.NParamBase[index] || 0;
		for (var i = 0; i < params.length; i++) {
		    var ary = params[i].split(/\s+/);
		    var code = ary.shift().toLowerCase();
		    if (code == "base") {
			ICF.Param.NParamBase[index] = ary.join(" ");
		    }
		}
	}
}

//=============================================================================
// End of File
//=============================================================================

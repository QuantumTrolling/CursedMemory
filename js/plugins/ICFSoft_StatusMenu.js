//=============================================================================
// ICF-Soft Plugins - Status Menu
// ICFSoft_StatusMenu.js
//=============================================================================

var Imported = Imported || {};
Imported.ICFSoft_StatusMenu = true;

var ICF = ICF || {};
ICF.StatusMenu = ICF.StatusMenu || {};
ICF.NotetagsProcessor = ICF.NotetagsProcessor || {};

ICF.StatusMenu.Version = 102; // 1.02

//=============================================================================
 /*:
 * @plugindesc v1.02 A status menu where you can organize actor params.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param Column1
 * @desc Param names that will be shown in column.
 * @default atk def mat mdf agi luk
 *
 * @param Column2
 * @desc Param names that will be shown in column.
 * @default 
 *
 * @param Column3
 * @desc Param names that will be shown in column.
 * @default 
 *
 * @param Percentage params
 * @desc What params will be used as percentages.
 * @default 
 *
 * @param Eval0 Name
 * @desc A name to show inside status menu.
 * @default Something random
 *
 * @param Eval0 Formula
 * @desc Custom formula to show a value.
 * @default Math.trunc(Math.random() * 100)
 *
 * @param Eval1 Name
 * @desc A name to show inside status menu.
 * @default 
 *
 * @param Eval1 Formula
 * @desc Custom formula to show a value.
 * @default 
 *
 * @param Eval2 Name
 * @desc A name to show inside status menu.
 * @default 
 *
 * @param Eval2 Formula
 * @desc Custom formula to show a value.
 * @default 
 *
 * @param Eval3 Name
 * @desc A name to show inside status menu.
 * @default 
 *
 * @param Eval3 Formula
 * @desc Custom formula to show a value.
 * @default 
 *
 * @param Eval4 Name
 * @desc A name to show inside status menu.
 * @default 
 *
 * @param Eval4 Formula
 * @desc Custom formula to show a value.
 * @default 
 *
 * @param Eval5 Name
 * @desc A name to show inside status menu.
 * @default 
 *
 * @param Eval5 Formula
 * @desc Custom formula to show a value.
 * @default 
 *
 * @param Eval6 Name
 * @desc A name to show inside status menu.
 * @default 
 *
 * @param Eval6 Formula
 * @desc Custom formula to show a value.
 * @default 
 *
 * @param Eval7 Name
 * @desc A name to show inside status menu.
 * @default 
 *
 * @param Eval7 Formula
 * @desc Custom formula to show a value.
 * @default 
 *
 * @param Eval8 Name
 * @desc A name to show inside status menu.
 * @default 
 *
 * @param Eval8 Formula
 * @desc Custom formula to show a value.
 * @default 
 *
 * @param Eval9 Name
 * @desc A name to show inside status menu.
 * @default 
 *
 * @param Eval9 Formula
 * @desc Custom formula to show a value.
 * @default 
 *
 * @param Percentage0 Name
 * @desc A name to show inside status menu.
 * @default Something random
 *
 * @param Percentage0 Formula
 * @desc Custom formula to show a percentage value.
 * @default Math.random()
 *
 * @param Percentage1 Name
 * @desc A name to show inside status menu.
 * @default 
 *
 * @param Percentage1 Formula
 * @desc Custom formula to show a percentage value.
 * @default 
 *
 * @param Percentage2 Name
 * @desc A name to show inside status menu.
 * @default 
 *
 * @param Percentage2 Formula
 * @desc Custom formula to show a percentage value.
 * @default 
 *
 * @param Percentage3 Name
 * @desc A name to show inside status menu.
 * @default 
 *
 * @param Percentage3 Formula
 * @desc Custom formula to show a percentage value.
 * @default 
 *
 * @param Percentage4 Name
 * @desc A name to show inside status menu.
 * @default 
 *
 * @param Percentage4 Formula
 * @desc Custom formula to show a percentage value.
 * @default 
 *
 * @param Percentage5 Name
 * @desc A name to show inside status menu.
 * @default 
 *
 * @param Percentage5 Formula
 * @desc Custom formula to show a percentage value.
 * @default 
 *
 * @param Percentage6 Name
 * @desc A name to show inside status menu.
 * @default 
 *
 * @param Percentage6 Formula
 * @desc Custom formula to show a percentage value.
 * @default 
 *
 * @param Percentage7 Name
 * @desc A name to show inside status menu.
 * @default 
 *
 * @param Percentage7 Formula
 * @desc Custom formula to show a percentage value.
 * @default 
 *
 * @param Percentage8 Name
 * @desc A name to show inside status menu.
 * @default 
 *
 * @param Percentage8 Formula
 * @desc Custom formula to show a percentage value.
 * @default 
 *
 * @param Percentage9 Name
 * @desc A name to show inside status menu.
 * @default 
 *
 * @param Percentage9 Formula
 * @desc Custom formula to show a percentage value.
 * @default 
 *
 * @param XParam0 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Hit rate
 *
 * @param XParam1 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Evasion rate
 *
 * @param XParam2 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Critical rate
 *
 * @param XParam3 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Critical evasion rate
 *
 * @param XParam4 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Magic evasion rate
 *
 * @param XParam5 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Magic reflection rate
 *
 * @param XParam6 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Counter-attack rate
 *
 * @param XParam7 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Hp-regen rate
 *
 * @param XParam8 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Mp-regen rate
 *
 * @param XParam9 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Tp-regen rate
 *
 * @param SParam0 Full Name
 * @desc Name that will be shown for this special param.
 * @default Targeted rate
 *
 * @param SParam1 Full Name
 * @desc Name that will be shown for this special param.
 * @default Guard rate
 *
 * @param SParam2 Full Name
 * @desc Name that will be shown for this special param.
 * @default Recovery rate
 *
 * @param SParam3 Full Name
 * @desc Name that will be shown for this special param.
 * @default Pharmacology
 *
 * @param SParam4 Full Name
 * @desc Name that will be shown for this special param.
 * @default Mp cost rate
 *
 * @param SParam5 Full Name
 * @desc Name that will be shown for this special param.
 * @default Tp cost rate
 *
 * @param SParam6 Full Name
 * @desc Name that will be shown for this special param.
 * @default Phisical damage rate
 *
 * @param SParam7 Full Name
 * @desc Name that will be shown for this special param.
 * @default Magical damage rate
 *
 * @param SParam8 Full Name
 * @desc Name that will be shown for this special param.
 * @default Floor damage rate
 *
 * @param SParam9 Full Name
 * @desc Name that will be shown for this special param.
 * @default Experience rate
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * This plugin is made for use with ICF-Soft Params Core but can work alone.
 * 
 * Allows you to show params in up to three columns plus equip, using all
 * window width.
 * 
 * You can use javascript code to be run to get a value and change columns
 * for specified actors.
 * 
 * More features will be added in the future.
 * 
 * ============================================================================
 * How to use
 * ============================================================================
 * 
 * You can give different columns for specified actors with this notetag:
 * 
 * <STATUS MENU COL x param param param>
 * 
 * You need to specify column from 1 to 3 that will be replaced and
 * params are separated by spaces.
 * 
 * ============================================================================
 * Parameters
 * ============================================================================
 * 
 * ColumnX: Place the param names that will be shown in comlumn separated by
 * spaces. You can use up to 3 columns sharing width with equips.
 * It works with param, nparam, pparam and eval and percentage codes.
 * These codes are from eval0 to eval9, same for percentage ones.
 * 
 * Percentage params: Tell what params will be used as percentages.
 * It works with pparam.
 * 
 * EvalX/PercentageX Name: A name to give to pseudoparams inside
 * status menu.
 *
 * EvalX/PercentageX Formula: These are custom formulas to give
 * a value. Normal eval allow to use strings as a result while
 * percentage ones must give a rate to convert into a percentage.
 * 
 * ============================================================================
 * Incompatibilities
 * ============================================================================
 * 
 * Can be incompatible or interfere with some similar plugins.
 * 
 * ============================================================================
 * Known isues
 * ============================================================================
 * 
 * Can interfere with some similar plugins or enhace them.
 * Later or sooner will be a status menu replace.
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Added custom formulas to get values.
 * - Added custom columns for specified actors.
 *
 * Version 1.01:
 * - Allow to show special and extra params.
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
 * @plugindesc v1.02 Una ventana de estado que permite mostrar
 * los nparam y los pparam.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param Column1
 * @desc Nombres básicos de los parámetros separados por espacios.
 * @default atk def mat mdf agi luk
 *
 * @param Column2
 * @desc Nombres básicos de los parámetros separados por espacios.
 * @default 
 *
 * @param Column3
 * @desc Nombres básicos de los parámetros separados por espacios.
 * @default 
 *
 * @param Percentage params
 * @desc Indica qué parámetros serán tratados como porcentajes.
 * @default 
 *
 * @param Eval0 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default Algo aleatorio
 *
 * @param Eval0 Formula
 * @desc Fórmula personalizada para obtener un valor.
 * @default Math.trunc(Math.random() * 100)
 *
 * @param Eval1 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default 
 *
 * @param Eval1 Formula
 * @desc Fórmula personalizada para obtener un valor.
 * @default 
 *
 * @param Eval2 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default 
 *
 * @param Eval2 Formula
 * @desc Fórmula personalizada para obtener un valor.
 * @default 
 *
 * @param Eval3 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default 
 *
 * @param Eval3 Formula
 * @desc Fórmula personalizada para obtener un valor.
 * @default 
 *
 * @param Eval4 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default 
 *
 * @param Eval4 Formula
 * @desc Fórmula personalizada para obtener un valor.
 * @default 
 *
 * @param Eval5 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default 
 *
 * @param Eval5 Formula
 * @desc Fórmula personalizada para obtener un valor.
 * @default 
 *
 * @param Eval6 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default 
 *
 * @param Eval6 Formula
 * @desc Fórmula personalizada para obtener un valor.
 * @default 
 *
 * @param Eval7 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default 
 *
 * @param Eval7 Formula
 * @desc Fórmula personalizada para obtener un valor.
 * @default 
 *
 * @param Eval8 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default 
 *
 * @param Eval8 Formula
 * @desc Fórmula personalizada para obtener un valor.
 * @default 
 *
 * @param Eval9 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default 
 *
 * @param Eval9 Formula
 * @desc Fórmula personalizada para obtener un valor.
 * @default 
 *
 * @param Percentage0 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default Algo aleatorio
 *
 * @param Percentage0 Formula
 * @desc Fórmula personalizada para obtener un valor porcentual.
 * @default Math.random()
 *
 * @param Percentage1 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default 
 *
 * @param Percentage1 Formula
 * @desc Fórmula personalizada para obtener un valor porcentual.
 * @default 
 *
 * @param Percentage2 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default 
 *
 * @param Percentage2 Formula
 * @desc Fórmula personalizada para obtener un valor porcentual.
 * @default 
 *
 * @param Percentage3 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default 
 *
 * @param Percentage3 Formula
 * @desc Fórmula personalizada para obtener un valor porcentual.
 * @default 
 *
 * @param Percentage4 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default 
 *
 * @param Percentage4 Formula
 * @desc Fórmula personalizada para obtener un valor porcentual.
 * @default 
 *
 * @param Percentage5 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default 
 *
 * @param Percentage5 Formula
 * @desc Fórmula personalizada para obtener un valor porcentual.
 * @default 
 *
 * @param Percentage6 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default 
 *
 * @param Percentage6 Formula
 * @desc Fórmula personalizada para obtener un valor porcentual.
 * @default 
 *
 * @param Percentage7 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default 
 *
 * @param Percentage7 Formula
 * @desc Fórmula personalizada para obtener un valor porcentual.
 * @default 
 *
 * @param Percentage8 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default 
 *
 * @param Percentage8 Formula
 * @desc Fórmula personalizada para obtener un valor porcentual.
 * @default 
 *
 * @param Percentage9 Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default 
 *
 * @param Percentage9 Formula
 * @desc Fórmula personalizada para obtener un valor porcentual.
 * @default 
 *
 * @param XParam0 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Puntería
 *
 * @param XParam1 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Evasión
 *
 * @param XParam2 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Probabilidad de crítico
 *
 * @param XParam3 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Evadir crítico
 *
 * @param XParam4 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Evasión mágica
 *
 * @param XParam5 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Reflejo mágico
 *
 * @param XParam6 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Contraataque
 *
 * @param XParam7 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Regenerar vida
 *
 * @param XParam8 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Regenerar magia
 *
 * @param XParam9 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Regenerar turbo
 *
 * @param SParam0 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Ser el objetivo
 *
 * @param SParam1 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Efecto defensivo
 *
 * @param SParam2 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Efecto de recuperación
 *
 * @param SParam3 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Farmacología
 *
 * @param SParam4 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Coste de mp
 *
 * @param SParam5 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Coste de tp
 *
 * @param SParam6 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Daño físico recibido
 *
 * @param SParam7 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Daño mágico recibido
 *
 * @param SParam8 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Daño por el terreno
 *
 * @param SParam9 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Experiencia obtenible
 *
 * @help
 * ============================================================================
 * Introducción
 * ============================================================================
 * 
 * Este plugin está hecho para su uso con el ICF-Soft Params Core pero puede
 * usarse solo.
 * 
 * Permite mostrar los parámetros en hasta tres columnas aparte del
 * equipamiento aprovechando todo el ancho.
 * 
 * Puedes utilizar código javascript que se ejecutará para obtener un valor
 * y además cambiar columnas para personajes específicos.
 * 
 * Iré añadiendo más características.
 * 
 * ============================================================================
 * Uso
 * ============================================================================
 * 
 * Puedes alterar las columnas para personajes específicos con la
 * siguiente etiqueta:
 * 
 * <STATUS MENU COL x param param param>
 * 
 * Debes especificar una columna entre la 1 y la 3 que será reemplazada
 * y los parámetros separados por espacios.
 * 
 * ============================================================================
 * Parámetros
 * ============================================================================
 * 
 * ColumnX: Para colocar los nombres básicos de los parámetros separados por
 * espacios. Hay hasta 3 columnas repartidas entre el ancho de la ventana.
 * Por el momento funciona con los param, nparam y pparam y los códigos de
 * eval y percentage. Dichos códigos van de eval0 a eval9 y de percentage0
 * a percentage9.
 * 
 * Percentage params: Indica qué parámetros serán tratados como porcentajes.
 * Usa dos decimales. De momento solo para los pparam.
 * 
 * EvalX/PercentageX Name: Un nombre a mostrar dentro del menú de estado
 * para representar el código javascript.
 *
 * EvalX/PercentageX Formula: Fórmulas personalizadas de donde obtener un
 * valor. Los códigos eval permiten el uso de strings como resultado
 * mientras que los percentage requieren un número de donde sacar un
 * porcentaje.
 * 
 * ============================================================================
 * Incompatibilidades
 * ============================================================================
 * 
 * Puede ser incompatible con otros plugins similares.
 * 
 * ============================================================================
 * Problemas conocidos
 * ============================================================================
 * 
 * Puede interferir con otros plugins similares. Pero puede combinarse
 * con otros.
 * Tarde o temprano será un reemplazo del menú estado.
 * 
 * ============================================================================
 * Historial de versiones
 * ============================================================================
 * 
 * Versión 1.02:
 * - Añadidas fórmulas personalizadas para obtener valores.
 * - Añadidas columnas personalizadas para personajes específicos.
 *
 * Versión 1.01:
 * - Permite mostrar los parámetros especiales y extra.
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

ICF.Parameters = PluginManager.parameters('ICFSoft_StatusMenu');
ICF.Param = ICF.Param || {};

ICF.Param.StatusMenuCol1 = ICF.Parameters['Column1'].toLowerCase().trim().split(/\s+/);
ICF.Param.StatusMenuCol2 = ICF.Parameters['Column2'].toLowerCase().trim().split(/\s+/);
ICF.Param.StatusMenuCol3 = ICF.Parameters['Column3'].toLowerCase().trim().split(/\s+/);
ICF.Param.PercentageParams = ICF.Parameters['Percentage params'].toLowerCase().split(/\s+/);

if (ICF.Param.StatusMenuCol1[0] == "") ICF.Param.StatusMenuCol1.shift();
if (ICF.Param.StatusMenuCol2[0] == "") ICF.Param.StatusMenuCol2.shift();
if (ICF.Param.StatusMenuCol3[0] == "") ICF.Param.StatusMenuCol3.shift();

if (!Imported.ICFSoft_ParamCore) {
	ICF.Param.NParams = [];
	ICF.Param.PParams = [];
	ICF.Param.BParams = ["mhp", "mmp", "atk", "def", "mat", "mdf", "agi", "luk"];
	ICF.Param.XParamsFullName = [];
	ICF.Param.XParams = ["hit", "eva", "cri", "cev", "mev", "mrf", "cnt", "hrg", "mrg", "trg"];
	ICF.Param.SParamsFullName = [];
	ICF.Param.SParams = ["tgr", "grd", "rec", "pha", "mcr", "tcr", "pdr", "mdr", "fdr", "exr"];

	for (var i = 0; i < 10; i++) {
		ICF.Param.XParamsFullName[i] = String(ICF.Parameters['XParam' + i + ' Full Name']);
		ICF.Param.SParamsFullName[i] = String(ICF.Parameters['SParam' + i + ' Full Name']);
	}

}

ICF.Param.EvalParams = [];
ICF.Param.EvalPercentParams = [];
for (var i = 0; i < 10; i++) {
	ICF.Param.EvalParams[i] = [];
	ICF.Param.EvalParams[i][0] = String(ICF.Parameters['Eval' + i + ' Name']);
	ICF.Param.EvalParams[i][1] = String(ICF.Parameters['Eval' + i + ' Formula']);
	ICF.Param.EvalPercentParams[i] = [];
	ICF.Param.EvalPercentParams[i][0] = String(ICF.Parameters['Percentage' + i + ' Name']);
	ICF.Param.EvalPercentParams[i][1] = String(ICF.Parameters['Percentage' + i + ' Formula']);
}

//=============================================================================
// DataManager
//=============================================================================

ICF.StatusMenu.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!ICF.StatusMenu.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!ICF.StatusMenu.Procesed) {
	ICF.NotetagsProcessor.statusMenu($dataActors);
	ICF.StatusMenu.Procesed = true;
    }
    return true;
};

ICF.NotetagsProcessor.statusMenu = function(group) {
    var note = /<(?:STATUS[-_ ]MENU[-_ ]COL[-_ ])(\d)[ ]+((?:[\w-_]+\s*)+)>/i;

    for (var n = 1; n < group.length; n++) {
	var obj = group[n];
	var notedata = obj.note.split(/[\r\n]+/);

	obj.StatusMenuCols = [];

	    for (var i = 0; i < notedata.length; i++) {
		var line = notedata[i];
		if (line.match(note)) {
			obj.StatusMenuCols[Number(RegExp.$1)] = RegExp.$2.toLowerCase().trim().split(/\s+/);
		}
	    }
    }
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.statusMenuCols = function() {
    var st0 = $dataActors[this._actorId].StatusMenuCols;
    var st1 = [];
    st1[1] = st0[1] || ICF.Param.StatusMenuCol1;
    st1[2] = st0[2] || ICF.Param.StatusMenuCol2;
    st1[3] = st0[3] || ICF.Param.StatusMenuCol3;
    return st1;
};

//=============================================================================
// Window_Status
//=============================================================================

Window_Status.prototype.drawBlock3 = function(y) {
    var st = this._actor.statusMenuCols();

    if (st[1].length == 0) {
	this.drawEquipments(this.contentsWidth()/2, y);
    } else if (st[2].length == 0) {
	var width = this.contentsWidth() / 2 - this.textPadding() * 3;
	this.drawParameters(this.textPadding(), y, width, st[1]);
	this.drawEquipments(this.contentsWidth()/2 + this.textPadding(), y);
    } else if (st[3].length == 0) {
	var width = this.contentsWidth() / 3 - this.textPadding() * 4;
	this.drawParameters(this.textPadding(), y, width, st[1]);
	this.drawParameters(this.contentsWidth()/3 + this.textPadding(), y, width, st[2]);
	this.drawEquipments(this.contentsWidth()*2/3 + this.textPadding(), y);
    } else {
	var width = this.contentsWidth() / 4 - this.textPadding() * 5;
	this.drawParameters(this.textPadding(), y, width, st[1]);
	this.drawParameters(this.contentsWidth()/4 + this.textPadding(), y, width, st[2]);
	this.drawParameters(this.contentsWidth()*2/4 + this.textPadding(), y, width, st[3]);
	this.drawEquipments(this.contentsWidth()*3/4 + this.textPadding(), y);
    }
};

ICF.StatusMenu.drawParamsOldStyle = Window_Status.prototype.drawParameters;
Window_Status.prototype.drawParameters = function(x, y, width, ary) {
    if ((width == undefined)||(ary == undefined)) {
	ICF.StatusMenu.drawParamsOldStyle.call(this, x, y);
	return;
    }
    var lineHeight = this.lineHeight();
    var y2 = y;
    var actor = this._actor;
    for (var i = 0; i < ary.length; i++) {
        var param = [];
	if (ICF.Param.NParams.indexOf(ary[i]) > -1) {
		var paramId = ICF.Param.NParams.indexOf(ary[i]);
		param.push(ICF.Param.NParamsFullName[paramId]);
		param.push(actor.NParam(paramId));
	} else if (ICF.Param.PParams.indexOf(ary[i]) > -1) {
		var paramId = ICF.Param.PParams.indexOf(ary[i]);
		param.push(ICF.Param.PParamsFullName[paramId]);
		if (ICF.Param.PercentageParams.indexOf(ary[i]) > -1) {
			param.push((actor.PParam(paramId)*100).toFixed(2) + "%");
		} else {
			param.push(Math.trunc(actor.PParam(paramId)));
		}
	} else if (ICF.Param.BParams.indexOf(ary[i]) > -1) {
		var paramId = ICF.Param.BParams.indexOf(ary[i]);
		param.push(TextManager.param(paramId));
		param.push(actor.param(paramId));
	} else if (ICF.Param.XParams.indexOf(ary[i]) > -1) {
		var paramId = ICF.Param.XParams.indexOf(ary[i]);
		param.push(ICF.Param.XParamsFullName[paramId]);
		param.push((actor.xparam(paramId)*100).toFixed(2) + "%");
	} else if (ICF.Param.SParams.indexOf(ary[i]) > -1) {
		var paramId = ICF.Param.SParams.indexOf(ary[i]);
		param.push(ICF.Param.SParamsFullName[paramId]);
		param.push((actor.sparam(paramId)*100).toFixed(2) + "%");
	} else if (ary[i].match(/(?:eval)(\d+)/i)) {
		var paramId = ICF.Param.EvalParams[RegExp.$1];
		param.push(paramId[0]);
		param.push(eval(paramId[1]));
	} else if (ary[i].match(/(?:percentage)(\d+)/i)) {
		var paramId = ICF.Param.EvalPercentParams[RegExp.$1];
		param.push(paramId[0]);
		param.push((eval(paramId[1])*100).toFixed(2) + "%");
	}
	if (param.length > 0) {
		this.changeTextColor(this.systemColor());
		this.drawText(param[0], x, y2, width * 2 / 3);
		this.resetTextColor();
		this.drawText(param[1], x + width * 2 / 3, y2, width / 3, 'right');
	}
	y2 += lineHeight;
    }
};

//=============================================================================
// End of File
//=============================================================================

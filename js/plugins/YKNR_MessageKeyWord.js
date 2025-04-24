//============================================================================
// YKNR_MessageKeyWord.js - ver.2.0.1
// ---------------------------------------------------------------------------
// Copyright (c) 2017 Yakinori
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//============================================================================
/*:
 * ===========================================================================
 * @plugindesc You can register keywords that you want to use with- 
 * （\KW[***]） control character
 * @author Yakinori
 * ===========================================================================
 * @param KeyWordList
 * @text Register keyword
 * @desc List of keywords. You can register from here.
 * Select a blank line in the list and type in the Key & Word.
 * @type struct<StructKeyWord>[]
 * @default ["{\"Key\":\"actor1\",\"Word\":\"\\\\C[1]\\\\N[1]\\\\C[0]\"}","{\"Key\":\"actor2\",\"Word\":\"\\\\C[1]\\\\N[2]\\\\C[0]\"}","{\"Key\":\"actor3\",\"Word\":\"\\\\C[1]\\\\N[3]\\\\C[0]\"}","{\"Key\":\"actor4\",\"Word\":\"\\\\C[1]\\\\N[4]\\\\C[0]\"}","{\"Key\":\"leader\",\"Word\":\"\\\\C[1]\\\\P[1]\\\\C[0]\"}"]
 *
 * @help
 * ===========================================================================
 *【！Warning！】
 * ※May not work in RPG Maker MV version 1.4.X or below
 * ===========================================================================
 *【Features】
 * Allows you to collect and manage words that appear in the game.
 *
 * You can also use control character with keywords
 * If you want colored text on keyword each time, use-
 * /C[1]keyword\C[0]
 *
 * Control characters added by other plugins can be used without modification.
 *
 * ---------------------------------------------------------------------------
 *【How to register】
 * To register a keyword, set the Key and Word in the parameters.
 *
 * Key is an arbitrary string that is required to call Word.
 * Can be set in alphanumeric characters or Japanese. Symbols are not supported.
 *
 * Fill in Word with the text to be displayed. Control characters are also supported.
 *
 * ---------------------------------------------------------------------------
 *【Usage】
 * Use control characters with the registered keywords.
 * Control character for the keyword call is \KW[***]
 * ※ *** = specify the value of Key for keyword registration.
 *
 * ---------------------------------------------------------------------------
 * For example, we have registered some keywords.
 * First, try the following control characters from the "Show Text" event command
 * and run the game to see how it works.
 *
 * ・\KW[actor1]  => Display the name of Actor ID1 with color number 1.
 * ・\KW[leader]   => display the name of the first party with color number 1
 *
 * ---------------------------------------------------------------------------
 *【Changelog】
 * [2018/10/14] [2.0.1] ・Modification to the source code
 * [2017/10/15] [2.0.0] ・1.5.0 Parameter names revised
 * [2017/02/11] [1.0.0] public release
 *
 * ===========================================================================
 * [Blog]   : http://mata-tuku.ldblog.jp/
 * [Twitter]: https://twitter.com/Noritake0424
 * ---------------------------------------------------------------------------
 * Licensed under MIT License. Feel free to use.
 * http://opensource.org/licenses/mit-license.php
*/
/*~struct~StructKeyWord:
 * @param Key
 * @desc Register a term to call the keyword.
 * \KW[***] & *** 
 * @default Keyword
 *
 * @param Word
 * @desc Registers a character string to the set Key. 
 * Control characters can also be used.
 * @default Text
 */

(function() {
    'use strict';

    //------------------------------------------------------------------------
    /**
     * 対象のオブジェクト上の関数を別の関数に差し替えます.
     *
     * @method monkeyPatch
     * @param {Object} target 対象のオブジェクト
     * @param {String} methodName オーバーライドする関数名
     * @param {Function} newMethod 新しい関数を返す関数
     */
    function monkeyPatch(target, methodName, newMethod) {
        target[methodName] = newMethod(target[methodName]);
    };

    //------------------------------------------------------------------------
    /**
     * Jsonをパースし, プロパティの値を変換して返す
     *
     * @method jsonParamsParse
     * @param {String} json JSON文字列
     * @return {Object} パース後のオブジェクト
     */
    function jsonParamsParse(json) {
        return JSON.parse(json, parseRevive);
    };

    function parseRevive(key, value) {
        if (key === '') { return value; }
        try {
            return JSON.parse(value, parseRevive);
        } catch (e) {
            return value;
        }
    };

    /**
     * Jsonをパースして変換後, 配列ならば連想配列に変換して返す
     *
     * @method jsonParamsParse
     * @param {String} json JSON文字列
     * @param {String} keyName 連想配列のキーとする要素のあるプロパティ名
     * @param {String} valueName 連想配列の値とする要素のあるプロパティ名
     * @return {Object} パース後の連想配列
     */
    function parseArrayToHash(json, keyName, valueName) {
        let hash = {};
        const array = jsonParamsParse(json);
        if (Array.isArray(array)) {
            for (let i = 0, l = array.length; i < l; i++) {
                const key = array[i][keyName];
                if (key && key !== '') {
                    hash[key] = array[i][valueName] || null;
                }
            }
        }
        return hash;
    };

    //------------------------------------------------------------------------
    // パラメータを受け取る.
    var parameters = PluginManager.parameters('YKNR_MessageKeyWord');
    var keyWordTable = parseArrayToHash(parameters['KeyWordList'], 'Key', 'Word');

    //------------------------------------------------------------------------

    monkeyPatch(Window_Base.prototype, 'convertEscapeCharacters', function($) {
        return function(text) {
            let keyWord = null;
            text = text.replace(/\\KW\[(.+?)\]/gi, function() {
                keyWord = keyWordTable[arguments[1]];
                return keyWord !== undefined ? keyWord : '\\' + arguments[0];
            }.bind(this));
            return $.call(this, text);
        };
    });
})();

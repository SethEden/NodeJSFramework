/**
 * @file arrayParsing.js
 * @module arrayParsing
 * @description Contains all system defined business rules for parsing arrays with various operations.
 * @requires module:basic.constants
 * @requires module:message.constants
 * @requires module:system.constants
 * @requires module:word1.constants
 * @requires module:stringParsingUtilities
 * @requires module:loggers
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2021/10/28
 * @copyright Copyright © 2021-… by Seth Hollingsead. All rights reserved
 */

var bas = require('../../constants/basic.constants');
var msg = require('../../constants/message.constants');
var sys = require('../../constants/system.constants');
var wr1 = require('../../constants/word1.constants');
var stringParsingUtilities = require('./stringParsingUtilities');
var loggers = require('../../executrix/loggers');
var path = require('path');
var baseFileName = path.basename(module.filename, path.extname(module.filename));
var namespacePrefix = sys.cbusinessRules + bas.cDot + wr1.crules + bas.cDot + baseFileName + bas.cDot;

/**
 * @function replaceCharacterWithCharacter
 * @description Replaces all of the specified character in the inputData with another specified character.
 * @param {string} inputData A string that may or may not contain the specified
 * characters that should be converted to another specified character.
 * @param {array<string,string} inputMetaData An array of data that contains 2 additional string parameters:
 * inputMetaData[0] === character2Find - The character to be searched and replaced from the input string.
 * inputMetaData[1] === character2Replace - The character that should be used to replace
 * the character specified for replacement from the input data.
 * @return {string} The same as the input string but with specified characters converted to the other specified character.
 * @author Seth Hollingsead
 * @date 2021/10/28
 */
export const replaceCharacterWithCharacter = function(inputData, inputMetaData) {
  let functionName = replaceCharacterWithCharacter.name;
  // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  // console.log(`inputData is: ${inputData}`);
  // console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
  loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  loggers.consoleLog(namespacePrefix + functionName, msg.cInputMetaDataIs + JSON.stringify(inputMetaData));
  let returnData;
  if (!inputData && !inputMetaData) {
    returnData = false;
  } else {
    returnData = stringParsingUtilities.utilitiesReplaceCharacterWithCharacter(inputData, inputMetaData);
  }
  loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  // console.log(`returnData is: ${JSON.stringify(returnData)}`);
  // console.log(`END ${namespacePrefix}${functionName} function`);
  return returnData;
};

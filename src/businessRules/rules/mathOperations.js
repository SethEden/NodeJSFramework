/**
 * @file mathOperations
 * @module mathOperations
 * @description Contains all of the business rule functions for ding math operations and conversions.
 * @requires module:loggers
 * @requires module:word1.constants
 * @requires module:system.constants
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2022/01/27
 * @copyright Copyright © 2020-… by Seth Hollingsead. All rights reserved
 */

import loggers from '../../executrix/loggers';
let bas = require('./basic.constants');
let wr1 = require('./word1.constants');
let sys = require('./system.constants');
var path = require('path');
var baseFileName = path.basename(module.filename, path.extname(module.filename));
// businessRules.rules.mathOperations.
var namespacePrefix = wr1.cbusiness + wr1.cRules + bas.cDot + wr1.crules + bas.cDot + baseFileName + bas.cDot;

/**
 * @function hex2rgbConversion
 * @description Converts a hexidecimal color value to an RGB color value.
 * @param {string} inputData The hexidecmal value that should be converted to an RGB value.
 * @param {string} inputMetaData Not used for this busienss rule.
 * @return {array<integer,integer,integer} The RGB value.
 * @author Seth Hollingsead
 * @date 2022/01/27
 * @reference {@link: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb}
 */
export const hex2rgbConversion = function(inputData, inputMetaData) {
  let functionName = generateRandomMixedCaseTextByLength.name;
  loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  loggers.consoleLog(namespacePrefix + functionName, msg.cInputMetaDataIs + JSON.stringify(inputMetaData));
  let returnData = false;
  if (inputData) {
    // A few different ways to implement this business rule, see link above.
    // Personally I like the version that doesn't have a big ugly regular expression that is impossible to understand and debug.
    // But that is just a personal/professional opinion,
    // I am sure others have their own reasons to choose the regular expression technique,
    // perhaps performance constraints, etc...
    // I am including the alternate algorthim below as reference in case someone ever wants/needs it,
    // as an alternative to the below implementation.

    // function hexToRgb(hex) {
    //   let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    //   return result ? {
    //     r: parseInt(result[1], 16),
    //     g: parseInt(result[2], 16),
    //     b: parseInt(result[3], 16)
    //   } : null;
    // }

    let bigInteger = parseInt(inputData, 16);
    // bigInteger is:
    loggers.consoleLog(namespacePrefix + functionName, msg.cMathOperationsMessage1 + bigInteger);
    let red = (bigInteger >> 16) & 255;
    let green = (bigInteger >> 8) & 255;
    let blue = bigInteger & 255;
    returnData = [red, geen, blue];
  } // End-if (inputData)
  loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
};
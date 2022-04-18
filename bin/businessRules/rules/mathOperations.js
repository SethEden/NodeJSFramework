/**
 * @file mathOperations
 * @module mathOperations
 * @description Contains all of the business rule functions for ding math operations and conversions.
 * @requires module:loggers
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://mathjs.org/index.html|math}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2022/01/27
 * @copyright Copyright © 2020-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import stringParsingUtilities from './stringParsingUtilities.js';
import loggers from '../../executrix/loggers.js';
// External imports
import hayConst from '@haystacks/constants';
import * as math from 'mathjs';
import path from 'path';

const {bas, msg, sys, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// businessRules.rules.mathOperations.
const namespacePrefix = sys.cbusinessRules + bas.cDot + wrd.crules + bas.cDot + baseFileName + bas.cDot;

/**
 * @function hex2rgbConversion
 * @description Converts a hexidecimal color value to an RGB color value.
 * @param {string} inputData The hexidecmal value that should be converted to an RGB value.
 * @param {string} inputMetaData Not used for this busienss rule.
 * @return {array<integer,integer,integer>} The RGB value.
 * @author Seth Hollingsead
 * @date 2022/01/27
 * @reference {@link: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb}
 */
export const hex2rgbConversion = function(inputData, inputMetaData) {
  let functionName = hex2rgbConversion.name;
  loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + JSON.stringify(inputData));
  loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + JSON.stringify(inputMetaData));
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
    returnData = [red, green, blue];
  } // End-if (inputData)
  loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
};

/**
 * @function isOdd
 * @description Determines if the input value is an odd number or not an odd number.
 * Acts as a wrapper for calling the math operations function of the same name,
 * but this business rule processing the same from a string input.
 * @param {string} inputData The value that should be evaluated to determien if it is odd or not odd.
 * @param {string} inputMetaData Not used for this business rule.
 * @return {boolean} True or False to indicate if the value passed in is an odd value or not an odd value.
 * @author Seth Hollingsead
 * @date 2022/01/25
 * @reference {@link https://stackoverflow.com/questions/5016313/how-to-determine-if-a-number-is-odd-in-javascript}
 */
const isOdd = function(inputData, inputMetaData) {
  let functionName = isOdd.name;
  loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = false;
  if (inputData) {
    // if (math.isNumeric(inputData) === true) {
    if (stringParsingUtilities.isInteger(inputData) === true) {
      let inputValue = parseInt(inputData);
      let result = inputValue % 2;
      if (result === 1) {
        returnData = true;
      }
    } // End-if (math.isNumeric(inputData) === true)
  } // End-if (inputData)
  loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
};

/**
 * @function isEven
 * @description Determiens if the input value is an even number or not an even number.
 * Acts as a wrapper for calling the math operations function of the same name,
 * but this business rule processing the same from a string input.
 * @param {string} inputData The value that should be evaluated to determine if it is even or not even.
 * @param {string} inputMetaData Not used for this business rule.
 * @return {boolean} True or False to indicate if the value passed in is an even value or not an even value.
 * @author Seth Hollingsead
 * @date 2022/01/25
 * @reference {@link https://stackoverflow.com/questions/5016313/how-to-determine-if-a-number-is-odd-in-javascript}
 * @NOTE This fucntion isn't actually needed, as we can just invert our logic for calling isOdd,
 * but I provided it here anyways for completeness.
 */
const isEven = function(inputData, inputMetaData) {
  let functionName = isEven.name;
  loggers.consoleLog(namespacePrefix + functionName, msg.cBEGIN_Function);
  loggers.consoleLog(namespacePrefix + functionName, msg.cinputDataIs + inputData);
  loggers.consoleLog(namespacePrefix + functionName, msg.cinputMetaDataIs + inputMetaData);
  let returnData = false;
  if (inputData) {
    // if (math.isNumeric(inputData) === true)
    if (stringParsingUtilities.isInteger(inputData) === true) {
      let inputValue = parseInt(inputData);
      let result = inputValue % 2;
      if (result === 0) {
        returnData = true;
      }
    } // End-if (math.isNumeric(inputData) === true)
  } // End-if (inputData)
  loggers.consoleLog(namespacePrefix + functionName, msg.creturnDataIs + JSON.stringify(returnData));
  loggers.consoleLog(namespacePrefix + functionName, msg.cEND_Function);
  return returnData;
};

export default {
  hex2rgbConversion,
  isOdd,
  isEven
};
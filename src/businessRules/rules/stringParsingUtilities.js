/**
 * @file stringParsingUtilities.js
 * @module stringParsingUtilities
 * @description Contains all system defined business rules for parsing strings,
 * with values of all kinds, and various parsing operations.
 * Excluding functions that use the loggers.
 * @requires module:basic.constants
 * @requires module:generic.constants
 * @requires module:message.constants
 * @requires module:system.constants
 * @requires module:word1.constants
 * @requires module:arrayParsing
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2021/12/28
 * @copyright Copyright © 2021-… by Seth Hollingsead. All rights reserved
 */

 var bas = require('../../constants/basic.constants');
 var gen = require('../../constants/generic.constants');
 var msg = require('../../constants/message.constants');
 var sys = require('../../constants/system.constants');
 var wr1 = require('../../constants/word1.constants');
 var path = require('path');
 var baseFileName = path.basename(module.filename, path.extname(module.filename));
 var namespacePrefix = sys.cbusinessRules + bas.cDot + wr1.crules + bas.cDot + baseFileName + bas.cDot;

 /**
  * @function parseSystemRootPath
  * @description Parses the root path as returned by calling: path.resolve(__dirname);
  * This business rule looks for the "AppName" part of the path
  * and will parse that out to determine where on the hard drive this "appName" folder is installed at.
  * @NOTE: The "AppName" is derived from the configuration settings called "applicationName"
  * which should have been set by the system when it was loaded.
  * @param {string} inputData The root path as defined by calling path.resolve(__dirname);
  * @param {string} inputMetaData The name of the application.
  * @return {string} A string with the path up to the application folder,
  * where ever that is installed on the local system currently executing.
  * @author Seth Hollingsead
  * @date 2021/10/27
  * @NOTE Cannot use the loggers here, because dependency data will have never been loaded.
  */
 export const parseSystemRootPath = function(inputData, inputMetaData) {
   let functionName = parseSystemRootPath.name;
   // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
   // console.log(`inputData is: ${JSON.stringify(inputData)}`);
   // console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
   let returnData = '';
   if (inputData) {
     let applicationName = inputMetaData; // Rename it for readability.
     let pathElements = inputData.split(bas.cBackSlash);
     loop1:
     for (let i = 0; i < pathElements.length; i++) {
       // console.log(`BEGIN iteration i: ${i}`);
       let pathElement = pathElements[i];
       // console.log(`pathElement is: ${pathElement}`);
       if (i === 0) {
         // console.log('case: i === 0');
         returnData = pathElement;
       } else if (pathElement === applicationName) {
         // console.log(`case: pathElement === ${applicationName}`);
         returnData = returnData + bas.cBackSlash + pathElement + bas.cBackSlash; // `${returnData}\\${pathElement}\\`;
         break loop1;
       } else {
         // console.log('case else');
         returnData = returnData + bas.cBackSlash + pathElement; // `${returnData}\\${pathElement}`;
       }
     } // End for-loop: (let i = 0; i < pathElements.length; i++)
   } // End-if (inputData)
   // console.log(`returnData is: ${JSON.stringify(returnData)}`);
   // console.log(`END ${namespacePrefix}${functionName} function`);
   return returnData;
 };

 /**
  * @function stringToDataType
  * @description Converts a string to the appropriate data value.
  * So if it's a string value of "3.1415926535897932384626433832" Then it will get converted to a float of the same value.
  * If it's a string value of "false" then it will get converted to a boolean of the same value.
  * If it's a string value of "12" then it will get converted to an integer of the same value.
  * If it's a string value of "Happy Birthday" it will get returned the same as the input, no change, since it's just a string.
  * If it's an array of strings, or collection object, it will get returned as the same as the input, no change.
  * @param {string} inputData The string that should be converted to some value.
  * @param {string} inputMetaData Not used for this business rule.
  * @return {object|string|boolean|integer} Returns a value of whatever type the string should be converted to as appropriate.
  * @author Seth Hollingsead
  * @date 2021/11/10
  * @NOTE Cannot use the loggers here, because of a circular dependency.
  */
 export const stringToDataType = function(inputData, inputMetaData) {
   let functionName = stringToDataType.name;
   // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
   // console.log(`inputData is: ${JSON.stringify(inputData)}`);
   // console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
   let returnData = false;
   if (inputData) {
     let dataType = determineObjectDataType(inputData, '');
     switch (dataType) {
       case wr1.cBoolean:
         returnData = stringToBoolean(inputData, '');
         break;
       case wr1.cInteger:
         returnData = parseInt(inputData, '');
         break;
       case wr1.cFloat:
         returnData = parseFloat(inputData, '');
         break;
       case wr1.cString:
         returnData = inputData;
         break;
       default: // We don't know what kind of object this is, better just return it the way it is.
         returnData = inputData;
         break;
     }
   } // End-if (inputData)
   // console.log(`returnData is: ${JSON.stringify(returnData)}`);
   // console.log(`END ${namespacePrefix}${functionName} function`);
   return returnData;
 };

 /**
  * @function stringToBoolean
  * @description Converts a string to a boolean value.
  * @param {string} inputData A string that contains a truthy or falsy value and should be converted to a boolean value.
  * @param {string} inputMetaData Not used for this business rule.
  * @return {boolean} A Boolean value of either True or False according to the business rule conversion.
  * @author Seth Hollingsead
  * @date 2021/11/10
  * @NOTE We cannot pass in a 1 or 0 to this function and expect it to evaluate as a True or False because:
  * We have another function that is passing strings into the function, and also part of that check to look for data-types is a check to see if a string is a number.
  * If we cause this function to evaluate a 0 or 1 to a Boolean, then the integer function would never get a chance to evaluate.
  * @NOTE Cannot use the loggers here, because of a circular dependency.
  */
 export const stringToBoolean = function(inputData, inputMetaData) {
   let functionName = stringToBoolean.name;
   // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
   // console.log(`inputData is: ${JSON.stringify(inputData)}`);
   // console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
   let returnData = false;
   if (inputData) {
     if (typeof inputData === wr1.cboolean) {
       returnData = inputData;
     } else {
       switch (inputData.toLowerCase().trim()) {
         case gen.ctrue: case bas.ct: case bas.cy: case gen.cyes: case bas.con:
           returnData = true;
           break;
         case gen.cfalse: case bas.cf: case bas.cn: case bas.cno: case gen.coff:
           returnData = false;
           break;
         default:
           returnData = false;
           break;
       }
     }
   }
   // console.log(`returnData is: ${JSON.stringify(returnData)}`);
   // console.log(`END ${namespacePrefix}${functionName} function`);
   return returnData;
 };

 /**
  * @function determineObjectDataType
  * @description Determines if the contents of a string are actually a Boolean, Integer, Float, String or something else.
  * @param {string} inputData A string that contains some value that we should figure out
  * what kind of data type that data is, Boolean, Integer, Float, String or something else.
  * @param {string} inputMetaDataNot Not used for this business rule.
  * @return {string} A string that indicates if the data type should be Boolean, Integer, Float, String or something else.
  * @author Seth Hollingsead
  * @date 2021/11/10
  * @NOTE Cannot use the loggers here, because of a circular dependency.
  */
 export const determineObjectDataType = function(inputData, inputMetaData) {
   let functionName = determineObjectDataType.name;
   // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
   // console.log(`inputData is: ${JSON.stringify(inputData)}`);
   // console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
   let returnData = false;
   if (inputData) {
     if (isBoolean(inputData, '') === true) {
       returnData = wr1.cBoolean;
     } else if (isInteger(inputData, '') === true) {
       returnData = wr1.cInteger;
     } else if (isFloat(inputData, '') === true) {
       returnData = wr1.cFloat;
     } else if (isString(inputData, '') === true) {
       returnData = wr1.cString;
     } else { // Otherwise we cannot figure out what the data type is.
       // No real way to tell the difference between Short, Long and Double.
       // And we don't really need to tell the difference between all these complicated data types.
       // At least not yet!
       returnData = wr1.cObject;
     }
   }
   // console.log(`returnData is: ${JSON.stringify(returnData)}`);
   // console.log(`END ${namespacePrefix}${functionName} function`);
   return returnData;
 };

 /**
  * @function isBoolean
  * @description Determines if the input string is a boolean type of value,
  * "true", "True", "TRUE", "t", "T", "y", "Y", "yes", "Yes", "YES", "on", "On", "ON" or
  * "false", "False", "FALSE", "f", "F", "n", "N", "no", "No", "NO"
  * @param {string} inputData The string that should be checked if it is a Boolean style value or not, could be some form of "true" or "false".
  * @param {string} inputMetaData Not used for this business rule.
  * @return {boolean} A Boolean value of True or False to indicate if the input string is a Boolean or not.
  * @author Seth Hollingsead
  * @date 2021/11/10
  * @NOTE Cannot use the loggers here, because of a circular dependency.
  */
 export const isBoolean = function(inputData, inputMetaData) {
   let functionName = isBoolean.name;
   // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
   // console.log(`inputData is: ${JSON.stringify(inputData)}`);
   // console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
   let returnData = false;
   if (inputData) {
     if (typeof inputData === 'boolean') {
       returnData = true;
     } else {
       inputData = inputData.toLowerCase().trim();
       if (inputData === gen.ctrue || inputData === bas.ct || inputData === bas.cy || inputData === gen.cyes || inputData === bas.con ||
       inputData === gen.cfalse || inputData === bas.cf || inputData === bas.cn || inputData === bas.cno || inputData === gen.coff) {
         returnData = true;
       } else {
         returnData = false;
       }
     }
   }
   // console.log(`returnData is: ${JSON.stringify(returnData)}`);
   // console.log(`END ${namespacePrefix}${functionName} function`);
   return returnData;
 };

 /**
  * @function isInteger
  * @description Determines if the input string is an integer type of value -9007299254740992 to 9007299254740992.
  * @param {string} inputData The string that should be checked if it is an integer style value or not.
  * @param {string} inputMetaData Not used for this business rule.
  * @return {boolean} A Boolean value of true or false to indicate if the input string is an integer or not.
  * @author Seth Hollingsead
  * @date 2021/11/10
  * @NOTE Cannot use the loggers here, because of a circular dependency.
  */
 export const isInteger = function(inputData, inputMetaData) {
   let functionName = isInteger.name;
   // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
   // console.log(`inputData is: ${JSON.stringify(inputData)}`);
   // console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
   let returnData = false;
   if (inputData) {
     if (!isNaN(inputData)) {
       if (inputData % 1 === 0) {
         // It's a whole number, aka: integer
         returnData = true;
       } else { // Else clause is redundant, but kept here for code completeness.
         // Might be a number, but not a whole number.
         returnData = false;
       }
     } else { // Else clause is redundant, but kept here for code completeness.
       // Possibly also console log here for debugging.
       returnData = false;
     }
   }
   // console.log(`returnData is: ${JSON.stringify(returnData)}`);
   // console.log(`END ${namespacePrefix}${functionName} function`);
   return returnData;
 };

 /**
  * @function isFloat
  * @description Determines if the input string is a floating point type of value or not.
  * @param {string} inputData The string that should be checked if it is an integer style value or not.
  * @param {string} inputMetaData Not used for this business rule.
  * @return {boolean} A Boolean value of true or false to indicate if the input string is a floating point number or not.
  * @author Seth Hollingsead
  * @date 2021/11/10
  * @NOTE Cannot use the loggers here, because of a circular dependency.
  */
 export const isFloat = function(inputData, inputMetaData) {
   let functionName = isFloat.name;
   // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
   // console.log(`inputData is: ${JSON.stringify(inputData)}`);
   // console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
   let returnData = false;
   if (inputData) {
     if (!isNaN(inputData) && inputData.indexOf(bas.cDot) !== -1) {
       returnData = true;
     } else { // Else clause is redundant, but kept here for code completeness.
       // Possibly also console log here for debugging.
       returnData = false;
     }
   }
   // console.log(`returnData is: ${JSON.stringify(returnData)}`);
   // console.log(`END ${namespacePrefix}${functionName} function`);
   return returnData;
 };

 /**
  * @function isString
  * @description Determines if the input string is a string or not, by process of elimination,
  * aka if it's not a Boolean, and not an Integer and not a Float then it must be a string.
  * @param {string} inputData The string that should be checked if it is a string and not a Boolean, Integer or Float.
  * @param {string} inputMetaData Not used for this business rule.
  * @return {boolean} A Boolean value of true or false to indicate if the input string is a string and
  * not a Boolean, Integer or Float; or not (meaning it would be one of those 3 data types, discuised as a string).
  * @author Seth Hollingsead
  * @date 2021/11/10
  * @NOTE Cannot use the loggers here, because of a circular dependency.
  */
 export const isString = function(inputData, inputMetaData) {
   let functionName = isString.name;
   // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
   // console.log(`inputData is: ${JSON.stringify(inputData)}`);
   // console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
   let returnData = false;
   if (inputData) {
     if (isBoolean(inputData, '') === false && isInteger(inputData, '') === false && isFloat(inputData, '') === false &&
     (typeof inputData === wr1.cstring || inputData instanceof String)) {
       returnData = true; // If it's not a Boolean, and not an Integer, and not a Float, then it must be a string,
       // especially given the type of the variable is a string!
     } else { // Else clause is redundant, but kept here for code completeness.
       // Possibly also console log here for debugging.
       returnData = false;
     }
   }
   // console.log(`returnData is: ${JSON.stringify(returnData)}`);
   // console.log(`END ${namespacePrefix}${functionName} function`);
   return returnData;
 };

 /**
  * @function replaceDoublePercentWithMessage
  * @description Parses the input string and replaces any instance of a double percentage sign
  * with the input Meta Data string.
  * @param {string} inputData The string that might contain the double percentage signs.
  * @param {string} inputMetaData The string that should replace the double percentage signs.
  * @return {string} The modified string with the message inserted.
  * @author Seth Hollingsead
  * @date 2021/12/24
  * @NOTE Cannot use the loggers here, because of a circular dependency.
  */
 export const replaceDoublePercentWithMessage = function(inputData, inputMetaData) {
   let functionName = replaceDoublePercentWithMessage.name;
   // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
   // console.log(`inputData is: ${JSON.stringify(inputData)}`);
   // console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
   let returnData = '';
   if (inputData) {
     returnData = utilitiesReplaceCharacterWithCharacter(inputData, [bas.cDoublePercent, inputMetaData]);
   }
   // console.log(`returnData is: ${JSON.stringify(returnData)}`);
   // console.log(`END ${namespacePrefix}${functionName} function`);
   return returnData;
 };

 /**
  * @function utilitiesReplaceCharacterWithCharacter
  * @description Replaces all of the specified character in the inputData with another specified character.
  * @param {string} inputData A string that may or may not contain the specified
  * characters that should be converted to another specified character.
  * @param {array<string,string} inputMetaData An array of data that contains 2 additional string parameters:
  * inputMetaData[0] === character2Find - The character to be searched and replaced from the input string.
  * inputMetaData[1] === character2Replace - The character that should be used to replace
  * the character specified for replacement from the input data.
  * @return {string} The same as the input string but with specified characters converted to the other specified character.
  * @author Seth Hollingsead
  * @date 2021/12/28
  */
 export const utilitiesReplaceCharacterWithCharacter = function(inputData, inputMetaData) {
   let functionName = utilitiesReplaceCharacterWithCharacter.name;
   // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
   // console.log(`inputData is: ${JSON.stringify(inputData)}`);
   // console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
   let returnData;
   let character2Find = inputMetaData[0];
   let character2Replace = inputMetaData[1];
   if (!inputData && !character2Find && !character2Replace) {
     returnData = false;
   } else {
     returnData = inputData.replace(character2Find, character2Replace);
   }
   // console.log(`returnData is: ${JSON.stringify(returnData)}`);
   // console.log(`END ${namespacePrefix}${functionName} function`);
   return returnData;
 };
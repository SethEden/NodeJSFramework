/**
 * @file command.constants.js
 * @module command.constants
 * @description Contains many re-usable command constants
 * @requires module:basic.constants
 * @requires module:business.constants
 * @requires module:system.constants
 * @requires module:word1.constants
 * @author Seth Hollingsead
 * @date 2022/02/04
 * @copyright Copyright © 2022-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import * as bas from './basic.constants.js';
import * as biz from './business.constants.js';
import * as sys from './system.constants.js';
import * as wr1 from './word1.constants.js';

// Generic Commands constants

// ***********************************************
// Nominal commands in order
// ***********************************************
export const cechoCommand = biz.cecho + wr1.cCommand; // echoCommand
export const cEchoCommand = biz.cEcho + wr1.cCommand; // EchoCommand
export const cclearScreen = wr1.cclear + wr1.cScreen; // clearScreen

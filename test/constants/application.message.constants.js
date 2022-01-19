/**
 * @file application.message.constants.js
 * @module application.message.constants
 * @description Contains many re-usable application message constants.
 * @requires module:haystacks.basic.constants
 * @requires module:haystacks.word.constants
 * @author Seth Hollingsead
 * @date 2021/12/30
 * @copyright Copyright © 2021-… by Seth Hollingsead. All rights reserved
 */

import haystacks from '../../src/main.js';
var apcon = require('./application.constant.constants');
var bas = haystacks.bas;
var wr1 = haystacks.wr1;

let capplicationMessage01 = wr1.cBEGIN + bas.cSpace + wr1.cmain + bas.cSpace + wr1.cprogram + bas.cSpace + wr1.cloop; // BEGIN main program loop
let capplicationMessage02 = wr1.cBEGIN + bas.cSpace + wr1.ccommand + bas.cSpace + wr1.cparser; // BEGIN command parser
let capplicationMessage03 = wr1.cEND + bas.cSpace + wr1.ccommand + bas.cSpace + wr1.cparser; // END command parser
let capplicationMessage04 = wr1.cEND + bas.cSpace + wr1.cmain + bas.cSpace + wr1.cprogram + bas.cSpace + wr1.cloop; // END main program loop
let capplicationMessage05 = wr1.cExiting + bas.cSpace + wr1.cTEST + bas.cSpace + wr1.cHARNESS + bas.cSpace + wr1.cAPPLICATION; // Exiting TEST HARNESS APPLICATION

module.exports = {
  [bas.cc + apcon.capplicationMessage01]: capplicationMessage01, // BEGIN main program loop
  [bas.cc + apcon.capplicationMessage02]: capplicationMessage02, // BEGIN command parser
  [bas.cc + apcon.capplicationMessage03]: capplicationMessage03, // END command parser
  [bas.cc + apcon.capplicationMessage04]: capplicationMessage04, // END main program loop
  [bas.cc + apcon.capplicationMessage05]: capplicationMessage05 // Exiting TEST HARNESS APPLICATION
};

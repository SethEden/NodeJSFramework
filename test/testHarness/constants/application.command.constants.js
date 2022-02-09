/**
 * @file application.command.constants.js
 * @module application.command.constants
 * @description A file to hold all of the cient application command constants.
 * So none of the constants in this file should be generic/system/framework constants.
 * @requires module:haystacks
 * @requires module:haystacks.basic.constants
 * @requires module:haystacks.word1.constants
 * @author Seth Hollingsead
 * @date 2022/02/08
 * @copyright Copyright © 2022-… by Seth Hollingsead. All rights reserved
 */

let haystacks = require('../../../src/main.js');
let bas = haystacks.bas;
let wr1 = haystacks.wr1;

// ********************************
// Client Commands in order
// ********************************
let ccustomEchoCommand = wr1.ccustom + wr1.cEcho + wr1.cCommand; // customEchoCommand

module.exports = {
  [bas.cc + ccustomEchoCommand]: ccustomEchoCommand // customEchoCommand
};

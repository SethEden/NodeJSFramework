#!/usr/bin/env node

/**
 * @file testHarness.js
 * @module testHarness
 * @description This is the main init for the testHarness application.
 * It contains just enough of the main program loop and/or basic argument parsing to effectively test the framework.
 *
 * @requires module:clientRules
 * @requires module:clientCommands
 * @requires module:application.constants
 * @requires module:application.function.constants
 * @requires module:application.message.constants
 * @requires module:haystacks
 * @requires module:haystacks.constants.basic
 * @requires module:haystacks.constants.configuration
 * @requires module:haystacks.constants.generic
 * @requires module:haystacks.constants.message
 * @requires module:haystacks.constants.phonic
 * @requires module:haystacks.constants.system
 * @requires module:haystacks.constants.word1
 *
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2021/10/07
 * @copyright Copyright © 2021-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import clientRules from './businessRules/clientRulesLibrary.js';
import clientCommands from './commands/clientCommandsLibrary.js';
import * as apc from './constants/application.constants.js';
import * as app_fnc from './constants/application.function.constants.js';
import * as app_msg from './constants/application.message.constants.js';
// External imports
import haystacks from 'haystacks';
// const {bas, cfg, } = haystacks
let bas = haystacks.bas;
let cmd = haystacks.cmd;
let cfg = haystacks.cfg;
let gen = haystacks.gen;
let msg = haystacks.msg;
let phn = haystacks.phn;
let sys = haystacks.sys;
let wr1 = haystacks.wr1;
import path from 'path';

let rootPath = '';
let baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// testHarness.
let namespacePrefix = baseFileName + bas.cDot;
global.appRot = path.resolve(process.cwd());

/**
 * @function bootstrapApplication
 * @description Setup all the testHarness application data and configuration settings.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2021/10/15
 */
function bootstrapApplication() {
  let functionName = bootstrapApplication.name;
  // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  rootPath = path.resolve(process.cwd());
  let appConfig = {
    clientRootPath: rootPath,
    appConfigResourcesPath: rootPath + apc.cFullResourcesPath,
    appConfigReferencePath: rootPath + apc.cFullConfigurationPath,
    clientMetaDataPath: apc.cmetaDataPath,
    clientCommandAliasesPath: rootPath + apc.cFullCommandsPath,
    clientWorkflowsPath: rootPath + apc.cFullWorkflowsPath,
    clientBusinessRules: {},
    clientCommands: {}
  };
  appConfig[sys.cclientBusinessRules] = clientRules.initClientRulesLibrary();
  appConfig[sys.cclientCommands] = clientCommands.initClientCommandsLibrary();
  haystacks.initFramework(appConfig);
  // console.log(`END ${namespacePrefix}${functionName} function`);
};

/**
 * @function application
 * @description This is the main program loop, the init for the testHarness application.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2021/10/15
 */
async function application() {
  let functionName = application.name;
  haystacks.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);
  let argumentDrivenInterface = false;
  let commandInput;
  let commandResult;

  argumentDrivenInterface = haystacks.getConfigurationSetting(wr1.csystem, cfg.cArgumentDrivenInterface);
  // argumentDrivenInterface is:
  haystacks.consoleLog(namespacePrefix, functionName, app_msg.cargumentDrivenInterfaceIs + argumentDrivenInterface);
  haystacks.enqueueCommand(cmd.cStartupWorkflow);

  // NOTE: We are processing the argument driven interface first that way even if we are not in an argument driven interface,
  // arguments can still be passed in and they will be executed first, after the startup workflow is complete.
  //
  // We need to strip off any preceeding "--" before we try to process it as an actual command.
  // Also need to make sure that the command to execute actually contains the "--" or "/" or "\" or "-".
  let commandToExecute = '';
  // Make sure we execute any and all commands so the command queue is empty before
  // we process the command args and add more commands to the command queue.
  // Really this is about getting out the application name, version and about message.
  while (haystacks.isCommandQueueEmpty() === false) {
    commandResult = haystacks.processCommandQueue();
  }


  if (argumentDrivenInterface === false) {
    // BEGIN main program loop
    haystacks.consoleLog(namespacePrefix, functionName, app_msg.capplicationMessage01);

    // BEGIN cmmand parser
    haystacks.consoleLog(namespacePrefix, functionName, app_msg.capplicationMessage02);

    while(programRunning === true) {
      commandInput = haystacks.prompt(bas.cGreaterThan);
      if (commandInput.toUpperCase() === wr1.cEXIT) {
        // END command parser
        haystacks.consoleLog(namespacePrefix, functionName, app_msg.capplicationMessage03);
        programRunning = false;
        // END main program loop
        haystacks.consoleLog(namespacePrefix, functionName, app_msg.capplicationMessage04);
        // Exiting TEST HARNESS APPLICATION
        haystacks.consoleLog(namespacePrefix, functionName, app_msg.capplicationMessage05);
        break;
      }
    } // End-while (programRunning === true)
  } // End-if (argumnentDrivenInterface === false)
  haystacks.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
};

// Launch the Test Harness application!!
let programRunning = false;
bootstrapApplication();
programRunning = true;
application();

/**
 * @file chiefConfiguration.js
 * @module chiefConfiguration
 * @description Contains all the functions to manage the configuration system,
 * such as oading, setup, parsing & processing.
 * @requires module:chiefData
 * @requires module:ruleBroker
 * @requires module:configurator
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2021/10/13
 * @copyright Copyright © 2021-… by Seth Hollingsead. All rights reserved
 */

var chiefData = require('./chiefData');
var ruleBroker = require('../brokers/ruleBroker');
var configurator = require('../executrix/configurator');
var D = require('../structures/data');
var path = require('path');
var baseFileName = path.basename(module.filename, path.extname(module.filename));
var namespacePrefix = `controllers.${baseFileName}.`;

/**
 * @function setupConfiguration
 * @description Sets up all of the application and framework configuration data.
 * @param {string} appConfigPath The path of the configuration files for the application layer.
 * @param {string} frameworkConfigPath The path of the configuration files for the framework layer.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2021/10/13
 */
function setupConfiguration(appConfigPath, frameworkConfigPath) {
  let functionName = setupConfiguration.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`appConfigPath is: ${appConfigPath}`);
  console.log(`frameworkConfigPath is: ${frameworkConfigPath}`);
  let rules = {};
  rules[0] = 'swapBackSlashToForwardSlash';
  appConfigPath = ruleBroker.processRules(appConfigPath, '', rules);
  console.log(`appConfigPath after rule processing is: ${appConfigPath}`);
  frameworkConfigPath = ruleBroker.processRules(frameworkConfigPath, '', rules);
  console.log(`frameworkConfigPath after rule processing is: ${frameworkConfigPath}`);
  configurator.setConfigurationSetting('system', 'appConfigPath', appConfigPath);
  configurator.setConfigurationSetting('system', 'frameworkConfigPath', frameworkConfigPath);
  let allAppConfigData = {};
  let allFrameworkConfigData = {};
  allFrameworkConfigData = chiefData.setupAllJsonConfigData('frameworkConfigPath', 'configuration');
  allAppConfigData = chiefData.setupAllJsonConfigData('appConfigPath', 'configuration');
  parseLoadedConfigurationData(allFrameworkConfigData);
  parseLoadedConfigurationData(allAppConfigData);
  console.log('ALL DATA IS: ' + JSON.stringify(D));
  console.log(`END ${namespacePrefix}${functionName} function`);
};

/**
 * @function parseLoadedConfigurationData
 * @description Parses through all of the configuration data that we just loaded from the XML files and
 * adds that data to the correct data-structures in the D.[configuration] data hive.
 * @param {object} allConfigurationData A JSON data structure object that contains all configuration emta-data.
 * @return {void}
 * @author Seth Hollingsead
 * @date 2021/11/10
 */
function parseLoadedConfigurationData(allConfigurationData) {
  let functionName = parseLoadedConfigurationData.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`allConfigurationData is: ${JSON.stringify(allConfigurationData)}`);
  let highLevelSystemConfigurationContainer = {};
  let highLevelDebugConfigurationContainer = {};
  let allSystemConfigurations = {};
  let rules = {};
  let configurationElement;
  let configurationSubElement;
  let fullyQualifiedName;
  let namespace;
  let name;
  let type;
  let value;
  let version;
  let advancedDebugSettingPrefix;
  rules[0] = 'stringToDataType';

  highLevelSystemConfigurationContainer = allConfigurationData['system'];
  highLevelDebugConfigurationContainer = allConfigurationData['debugSettings'];

  for (let key in highLevelSystemConfigurationContainer) {
    fullyQualifiedName = '';
    namespace = '';
    name = '';
    value = '';
    value = highLevelSystemConfigurationContainer[key];
    if (!!value || value === false) {
      fullyQualifiedName = key;

      name = configurator.processConfigurationNameRules(fullyQualifiedName);
      namespace = configurator.processConfigurationNamespaceRules(fullyQualifiedName);
      value = configurator.processConfigurationValueRules(name, value);
      value = ruleBroker.processRules(value, '', rules);

      configurator.setConfigurationSetting(namespace, name, value);

    }
  }

  for (let key in highLevelDebugConfigurationContainer) {
    fullyQualifiedName = '';
    namespace = '';
    name = '';
    value = '';
    value = highLevelDebugConfigurationContainer[key];
    if (!!value || value === false) {
      fullyQualifiedName = key;

      name = configurator.processConfigurationNameRules(fullyQualifiedName);
      namespace = configurator.processConfigurationNamespaceRules(fullyQualifiedName);
      value = configurator.processConfigurationValueRules(name, value);
      value = ruleBroker.processRules(value, '', rules);

      configurator.setConfigurationSetting(namespace, name, value);

    }
  }
  console.log(`END ${namespacePrefix}${functionName} function`);
};

module.exports = {
  ['setupConfiguration']: (appConfigPath, frameworkConfigPath) => setupConfiguration(appConfigPath, frameworkConfigPath)
};

/* eslint-disable no-unused-vars */
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
// eslint-disable-next-line import/no-extraneous-dependencies
const cucumber = require('cypress-cucumber-preprocessor').default;
// eslint-disable-next-line import/no-extraneous-dependencies
const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const { JsonSchemaValidation } = require('@jc21/cypress-jsonschema-validation');
const fs = require('fs');

// webpackPreprocessor
module.exports = (on) => {
  on('file:preprocessor', webpackPreprocessor());
};

module.exports = (on) => {
  on('before:run', async (details) => {
    console.log('override before:run');
    await beforeRunHook(details);
  });

  on('after:run', async () => {
    console.log('override after:run');
    await afterRunHook();
  });
};

// Cypress v4+
module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium') {
      launchOptions.args.push('--disable-dev-shm-usage');
    }

    return launchOptions;
  });
};

/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {
  // cypress-cucumber-preprocessor
  on('file:preprocessor', cucumber());

  // JsonSchemaValidation
  on('task', JsonSchemaValidation(config));

  // data will be stored here
  const data = {};

  // configuring tasks
  on('task', {
    setValue: (params) => {
      const { key, value } = params;
      data[key] = value;
      return value;
    },
    getValue: (params) => {
      const { key } = params;
      return data[key] || null;
    },
  });

  // get download files
  on('task', {
    downloads: (downloader) => fs.readdirSync(downloader),
  });
};

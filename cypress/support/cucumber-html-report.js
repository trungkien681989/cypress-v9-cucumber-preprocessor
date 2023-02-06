// eslint-disable-next-line import/no-extraneous-dependencies
const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'cypress/cucumber-json',
  reportPath: './reports/cucumber-htmlreport.html',
  metadata: {
    browser: {
      name: 'chrome',
    },
    device: 'Local Machine',
    platform: {
      name: 'osx',
      version: 'Catalina',
    },
  },
});
// Generate Report: node cypress/support/cucumber-html-report.js

# Cypress cucumber with application actions [![Circle CI](https://circleci.com/gh/cypress-io/cypress-example-todomvc.svg?style=svg)](https://circleci.com/gh/cypress-io/cypress-example-todomvc) [![Build status](https://ci.appveyor.com/api/projects/status/6wjyoye82orkkyny/branch/master?svg=true)](https://ci.appveyor.com/project/cypress-io/cypress-example-todomvc/branch/master)

This repo contains an example of automation testing written in Cypress v9 and cypress-cucumber-preprocessor package which supports BDD feature files.

The tests are written to verify basic functions of https://juice-shop.guardrails.ai website.

This project follows suggestions from App Actions approach. Refer link: [Stop using Page Objects and Start using App Actions](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/)

## Installation

The steps below will take you all the way through setup and running the tests. You will also need to clone the repo and have a basic understanding of [Git](https://en.wikipedia.org/wiki/Git).

### 1. Install Node.js

[Node.js download](https://nodejs.org/en/download/)

### 2. Install Cypress

[Follow this instruction to install Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress)

### 3. Install cypress-cucumber-preprocessor

[Follow this instruction to install and setup cypress-cucumber-preprocessor](https://www.npmjs.com/package/cypress-cucumber-preprocessor)

### 4. Installing node_modules
```npm install```

## Run Test

### 1. Open Cypress and select a test to run
```npm run cypress:open```

![cypress-open](https://user-images.githubusercontent.com/49904115/180260041-45e1cdb7-fa29-4885-93a9-c5b0d62fe28a.gif)

### 2. Run all tests (headless)
```npm run cypress:run```

![cypress-run](https://user-images.githubusercontent.com/49904115/180261381-cc8a4478-fd68-4c99-9eef-06c6b29a6493.gif)

### 3. Run tests based on test type (headless)
```npm run cypress:smoke-ui```

```npm run cypress:smoke-api```

```npm run cypress:regression-ui```

```npm run cypress:regression-api```

## Generate HTML Report

After running your test scenarios, folder 'cypress/cucumber-json' will be generated along with cucumber.json results. Based on these files, you can generate a HTML summary report.

### 1. Generate HTML summary report
```npm run generate-html-report```

### 2. Open HTML summary report
Open 'index.html' in folder 'reports/cucumber-htmlreport.html'

<img width="1389" alt="html-summary-report" src="https://user-images.githubusercontent.com/49904115/180266752-1b055f00-28f5-481b-952e-3475ed3a0fb9.png">

## Help!
**If you get stuck, here is more help:**

* [Gitter Channel](https://gitter.im/cypress-io/cypress)
* [Cypress Docs](https://on.cypress.io)
* [Cypress CLI Tool Docs](https://docs.cypress.io/guides/guides/command-line)

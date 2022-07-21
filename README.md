# Cypress cucumber with application actions [![Circle CI](https://circleci.com/gh/cypress-io/cypress-example-todomvc.svg?style=svg)](https://circleci.com/gh/cypress-io/cypress-example-todomvc) [![Build status](https://ci.appveyor.com/api/projects/status/6wjyoye82orkkyny/branch/master?svg=true)](https://ci.appveyor.com/project/cypress-io/cypress-example-todomvc/branch/master)

This repo contains an example of automation testing written in Cypress v9 and cypress-cucumber-preprocessor package which supports BDD feature files.

The tests are written to verify basic functions of https://juice-shop.guardrails.ai website.

This project applies App Actions approach. Refer link: [Stop using Page Objects and Start using App Actions](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/)

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

### 2. Run all tests (headless)
```npm run cypress:run```

### 3. Run tests based on test type (headless)
```npm run cypress:smoke-ui```

```npm run cypress:smoke-api```

```npm run cypress:regression-ui```

```npm run cypress:regression-api```


## Help!
**If you get stuck, here is more help:**

* [Gitter Channel](https://gitter.im/cypress-io/cypress)
* [Cypress Docs](https://on.cypress.io)
* [Cypress CLI Tool Docs](https://docs.cypress.io/guides/guides/command-line)

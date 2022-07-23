# Cypress cucumber with application actions [![Circle CI](https://circleci.com/gh/cypress-io/cypress-example-todomvc.svg?style=svg)](https://circleci.com/gh/cypress-io/cypress-example-todomvc) [![Build status](https://ci.appveyor.com/api/projects/status/6wjyoye82orkkyny/branch/master?svg=true)](https://ci.appveyor.com/project/cypress-io/cypress-example-todomvc/branch/master)

This repo contains an example of automation testing written in Cypress v9 and cypress-cucumber-preprocessor package which supports BDD feature files.

The tests are written to verify basic functions of https://juice-shop.guardrails.ai website.

This project follows suggestions from App Actions approach. Refer link: [Stop using Page Objects and Start using App Actions](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/)

## Installation

The steps below will take you all the way through setup and running the tests. You will also need to clone the repo and have a basic understanding of [Git](https://en.wikipedia.org/wiki/Git).

### 1. Install Node.js

[Node.js download](https://nodejs.org/en/download/)

### 2. Installing node_modules
```npm install```

## Run Test

### 1. Open Cypress and select a test to run
```npm run cypress:open```

![cypress-open](https://user-images.githubusercontent.com/49904115/180589806-a4fddbd3-7264-4718-957e-0abb6826dc9f.gif)

### 2. Run all tests (headless)
```npm run cypress:run```

![cypress-run](https://user-images.githubusercontent.com/49904115/180590503-1890d635-21e9-4a32-8e5e-69573837ff9e.gif)

### 3. Run tests based on test type (headless)
```npm run cypress:smoke-ui```

```npm run cypress:smoke-api```

```npm run cypress:regression-ui```

```npm run cypress:regression-api```

### 4. Run visual tests with percy

You can run visual test with 'percy.io' follows this guide: https://docs.percy.io/docs/cypress

Below is an example of this repo:

```export PERCY_TOKEN=a527c5b46ab5d1b6fe507145147a2e9b4bade97a0b6ffa08a720e38ebd520ca0```

```percy exec -- cypress run```

![percy](https://user-images.githubusercontent.com/49904115/180349604-f563d2f9-96c1-4a68-a700-5d64bd71a082.png)

## Generate HTML Report

After running your test scenarios, folder 'cypress/cucumber-json' will be generated along with cucumber.json results. Based on these files, you can generate a HTML summary report.

### 1. Generate HTML summary report
```npm run generate-html-report```

### 2. Open HTML summary report
Open 'index.html' in folder 'reports/cucumber-htmlreport.html'

<img width="1389" alt="html-summary-report" src="https://user-images.githubusercontent.com/49904115/180266752-1b055f00-28f5-481b-952e-3475ed3a0fb9.png">

## Help!
**If you get stuck, here is more help:**

* [Install Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress)
* [Setup cypress-cucumber-preprocessor](https://www.npmjs.com/package/cypress-cucumber-preprocessor)
* [Gitter Channel](https://gitter.im/cypress-io/cypress)
* [Cypress Docs](https://on.cypress.io)
* [Cypress CLI Tool Docs](https://docs.cypress.io/guides/guides/command-line)

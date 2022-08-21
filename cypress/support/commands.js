/* eslint-disable cypress/no-force */
/* eslint-disable no-param-reassign */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { popup, login, allProducts } from './element-store';

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // turn off original log
    options.log = false;
    // create own log w/ masked message
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    });
  }
  return originalFn(element, text, options);
});

/**
 * @memberOf cy
 * @method setValue
 * @param {string} keyName
 * @param {string} keyValue
 * @returns Chainable
 */
Cypress.Commands.add('setValue', (keyName, keyValue) => {
  cy.task('setValue', { key: keyName, value: keyValue });
});

/**
 * @memberOf cy
 * @method getValue
 * @param {string} keyName
 * @returns Chainable
 */
Cypress.Commands.add('getValue', (keyName) => {
  cy.task('getValue', { key: keyName }).then((value) => value);
});

/**
 * @memberOf cy
 * @method clickElement
 * @param {string} selector
 * @returns Chainable
 */
Cypress.Commands.add('clickElement', (selector) => {
  cy.get(selector).first().should('be.visible').click({ waitForAnimations: true, force: true });
});

/**
 * @memberOf cy
 * @method clearAndType
 * @param {string} selector
 * @param {string} value
 * @returns Chainable
 */
Cypress.Commands.add('clearAndType', (selector, value) => {
  cy.get(selector).first().should('be.visible').clear()
    .type(value);
});

/**
 * @memberOf cy
 * @method validateText
 * @param {string} selector
 * @param {string} value
 * @returns Chainable
 */
Cypress.Commands.add('validateText', (selector, value) => {
  cy.get(selector).should('be.visible').invoke('text').should('equal', value);
});

/**
 * @memberOf cy
 * @method clickButton
 * @param {string} label
 * @returns Chainable
 */
Cypress.Commands.add('clickButton', (label) => {
  cy.contains(label).should('exist');
  cy.get('button').contains(label).should('be.visible')
    .scrollIntoView()
    .click({ waitForAnimations: true, force: true });
});

/**
 * @memberOf cy
 * @method clickLinkSameWindow
 * @param {string} label
 * @returns Chainable
 */
Cypress.Commands.add('clickLinkSameWindow', (label) => {
  cy.contains(label).should('exist');
  cy.get('a').contains(label).should('be.visible')
    .scrollIntoView()
    .invoke('removeAttr', 'target')
    .invoke('removeAttr', 'onclick')
    .click({ waitForAnimations: true, force: true });
});

/**
 * @memberOf cy
 * @method clickLink
 * @param {string} label
 * @returns Chainable
 */
Cypress.Commands.add('clickLink', (label) => {
  cy.contains(label).should('exist');
  cy.get('a').contains(label).should('exist')
    .scrollIntoView()
    .click({ waitForAnimations: true, force: true });
});

/**
 * @memberOf cy
 * @method clickLinkButton
 * @param {string} label
 * @returns Chainable
 */
Cypress.Commands.add('clickLinkButton', (label) => {
  cy.get(`button[aria-label="${label}"]`).should('exist')
    .scrollIntoView().click({ waitForAnimations: true, force: true });
});

/**
 * @memberOf cy
 * @method clickSpan
 * @param {string} label
 * @returns Chainable
 */
Cypress.Commands.add('clickSpan', (label) => {
  cy.contains(label).should('exist');
  cy.get('span').contains(label).should('exist')
    .scrollIntoView()
    .click({ waitForAnimations: true, force: true });
});

/**
 * @memberOf cy
 * @method login
 * @param {string} email
 * @param {string} password
 * @returns Chainable
 */
Cypress.Commands.add('login', (email, password) => {
  cy.get(login.emailInput).should('be.visible').clear().type(email, { log: true });
  cy.get(login.passwordInput).should('be.visible').clear().type(password, { sensitive: true });
  cy.get(login.loginButton).should('be.enabled').click();
  cy.get(login.loginButton).should('not.exist');
});

/**
 * @memberOf cy
 * @method authenticate
 * @returns Chainable
 */
Cypress.Commands.add('authenticate', () => {
  cy.fixture('user').then((users) => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('baseURL')}/rest/user/login`,
      headers: { 'content-type': 'application/json' },
      body: { email: `${users.valid.email}`, password: `${users.valid.password}` },
    }).then((response) => response.body.authentication);
  });
});

/**
 * @memberOf cy
 * @method openOWASPJuiceShop
 * @returns Chainable
 */
Cypress.Commands.add('openOWASPJuiceShop', () => {
  cy.visit(Cypress.env('baseURL'));
  expect(cy.title().should('equal', 'OWASP Juice Shop'));
  cy.get(popup.closeWelcomeBannerButton).should('be.visible').click();
  cy.get(popup.dismissCookieMessage).should('be.visible').click();
  cy.get(allProducts.itemsPerPage).should('exist');
});

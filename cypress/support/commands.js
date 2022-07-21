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

import { elementStore } from './element-store';

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
 * @method clickButton
 * @param {string} label
 * @returns Chainable
 */
Cypress.Commands.add('clickButton',
  (label) => {
    cy.contains(label)
      .should('exist');
    cy.get('button')
      .contains(label)
      .should('be.visible')
      .scrollIntoView()
      .click({ waitForAnimations: true, force: true });
  });

/**
 * @memberOf cy
 * @method clickLinkSameWindow
 * @param {string} label
 * @returns Chainable
 */
Cypress.Commands.add('clickLinkSameWindow',
  (label) => {
    cy.contains(label)
      .should('exist');
    cy.get('a')
      .contains(label)
      .should('be.visible')
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
Cypress.Commands.add('clickLink',
  (label) => {
    cy.contains(label)
      .should('exist');
    cy.get('a')
      .contains(label)
      .should('exist')
      .scrollIntoView()
      .click({ waitForAnimations: true, force: true });
  });

/**
 * @memberOf cy
 * @method clickLinkButton
 * @param {string} label
 * @returns Chainable
 */
Cypress.Commands.add('clickLinkButton',
  (label) => {
    cy.get(`button[aria-label="${label}"]`)
      .should('exist')
      .scrollIntoView()
      .click({ waitForAnimations: true, force: true });
  });

/**
 * @memberOf cy
 * @method clickSpan
 * @param {string} label
 * @returns Chainable
 */
Cypress.Commands.add('clickSpan',
  (label) => {
    cy.contains(label)
      .should('exist');
    cy.get('span')
      .contains(label)
      .should('exist')
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
  cy.get(elementStore['Email Text']).should('be.visible').clear().type(email, { log: true });
  cy.get(elementStore['Password Text']).should('be.visible').clear().type(password, { sensitive: true });
  cy.get(elementStore['Login Button']).should('be.enabled').click();
  cy.get(elementStore['Login Button']).should('not.exist');
});

/**
 * @memberOf cy
 * @method getValidBearerToken
 * @returns Chainable
 */
Cypress.Commands.add('getValidBearerToken', () => {
  cy.fixture('user').then((users) => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('baseURL')}/rest/user/login`,
      headers: { 'content-type': 'application/json' },
      body: { email: `${users.valid.email}`, password: `${users.valid.password}` },
    }).then((response) => {
      cy.task('setValue', {
        key: 'bearerToken',
        value: response.body.authentication.token,
      });
      cy.task('setValue', {
        key: 'basketId',
        value: response.body.authentication.bid,
      });
      cy.task('setValue', {
        key: 'responseCode',
        value: response.status,
      });
    });
  });
});

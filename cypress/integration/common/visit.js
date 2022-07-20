import { Given } from 'cypress-cucumber-preprocessor/steps';
import { elementStore } from '../../support/element-store';

/* eslint-disable */
Given(`I am on the OWASP Juice Shop home page`, () => {
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.visit(Cypress.env('baseURL'));
  expect(cy.title().should('equal', 'OWASP Juice Shop'));
  cy.get(elementStore["Items Per Page"]).should('be.visible');
});

import { Given } from 'cypress-cucumber-preprocessor/steps';
import { elementStore } from '../../support/element-store';

Given('I am on the OWASP Juice Shop home page', () => {
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.visit(Cypress.env('baseURL'));
  expect(cy.title().should('equal', 'OWASP Juice Shop'));
  cy.get(elementStore['Close Welcome Banner Button']).should('be.visible').click();
  cy.get(elementStore['Dismiss Cookie Message']).should('be.visible').click();
  cy.get(elementStore['Items Per Page']).should('exist');
});

Given('I login to my account', () => {
  cy.get(elementStore['Nav Bar Account Button']).should('be.visible').click();
  cy.get(elementStore['Nav Bar Login Button']).should('be.visible').click();
  cy.url().should('include', '/login');
  cy.fixture('user').then((users) => {
    cy.login(users.valid.email, users.valid.password);
  });
});

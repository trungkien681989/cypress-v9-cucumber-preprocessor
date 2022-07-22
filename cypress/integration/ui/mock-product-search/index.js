import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import { elementStore } from '../../../support/element-store';

Given('I am on the OWASP Juice Shop home page with mock {string}', (fixtureFile) => {
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.intercept('GET', '**/products/search?q=**', { fixture: `mock/${fixtureFile}.json` }).as('interceptProductSearch');
  cy.visit(Cypress.env('baseURL'));
  expect(cy.title().should('equal', 'OWASP Juice Shop'));
  cy.get(elementStore['Close Welcome Banner Button']).should('be.visible').click();
  cy.get(elementStore['Dismiss Cookie Message']).should('be.visible').click();
  cy.get(elementStore['Items Per Page']).should('exist');
});

Given('I am on the OWASP Juice Shop home page with internal server error mock', () => {
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.fixture('mock/internal-server-error.html').then((responseBody) => {
    cy.intercept('GET', '**/products/search?q=**', {
      statusCode: 500,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
      body: responseBody,
    });
  });
  cy.visit(Cypress.env('baseURL'));
  expect(cy.title().should('equal', 'OWASP Juice Shop'));
  cy.get(elementStore['Close Welcome Banner Button']).should('be.visible').click();
  cy.get(elementStore['Dismiss Cookie Message']).should('be.visible').click();
  cy.get(elementStore['Items Per Page']).should('exist');
});

Then('I expect home page display no product', () => {
  cy.get(elementStore['Item Name Text']).should('not.exist');
  cy.get(elementStore['Item Price Text']).should('not.exist');
  cy.get(elementStore['Add To Basket Button']).should('not.exist');
});

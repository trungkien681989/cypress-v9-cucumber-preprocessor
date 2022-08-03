import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import * as elements from '../../../support/element-store';

Given('I am on the OWASP Juice Shop home page with mock {string}', (fixtureFile) => {
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.intercept('GET', '**/products/search?q=**', { fixture: `mock/${fixtureFile}.json` }).as('interceptProductSearch');
  cy.openOWASPJuiceShop();
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
  cy.openOWASPJuiceShop();
});

Then('I expect home page display no product', () => {
  cy.get(elements.itemNameText).should('not.exist');
  cy.get(elements.itemPriceText).should('not.exist');
  cy.get(elements.addToBasketButton).should('not.exist');
});

import { Given } from 'cypress-cucumber-preprocessor/steps';
import * as elements from '../../support/element-store';

Given('I am on the OWASP Juice Shop home page', () => {
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.openOWASPJuiceShop();
});

Given('I login to my account', () => {
  cy.get(elements.navBarAccountButton).should('be.visible').click();
  cy.get(elements.navBarLoginButton).should('be.visible').click();
  cy.url().should('include', '/login');
  cy.fixture('user').then((users) => {
    cy.login(users.valid.email, users.valid.password);
  });
});

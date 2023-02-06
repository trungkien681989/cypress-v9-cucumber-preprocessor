import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import { header } from '../../support/element-store';

Given('I am on the OWASP Juice Shop home page', () => {
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.openOWASPJuiceShop();
});

When('I login to my account', () => {
  cy.get(header.navBarAccountButton).should('be.visible').click();
  cy.get(header.navBarLoginButton).should('be.visible').click();
  cy.url().should('include', '/login');
  cy.fixture('user').then((users) => {
    cy.login(users.valid.email, users.valid.password);
  });
});

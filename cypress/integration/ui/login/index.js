import { Then } from 'cypress-cucumber-preprocessor/steps';
import { header, login } from '../../../support/element-store';

Then('I expect error message shows if I enter incorrect info', () => {
  cy.get(header.navBarAccountButton).should('be.visible').click();
  cy.get(header.navBarLoginButton).should('be.visible').click();
  cy.url().should('include', '/login');
  cy.fixture('user-invalid').then((users) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < users.length; i++) {
      cy.get(login.emailInput).should('be.visible').clear().type(users[i].invalid.email, { log: true });
      cy.get(login.passwordInput).should('be.visible').clear().type(users[i].invalid.password, { sensitive: true });
      cy.get(login.loginButton).should('be.enabled').click();
      cy.validateText(login.errorMessage, 'Invalid email or password.');
    }
  });
});

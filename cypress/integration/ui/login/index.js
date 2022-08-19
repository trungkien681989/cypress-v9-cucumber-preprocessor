import { Then } from 'cypress-cucumber-preprocessor/steps';
import * as elements from '../../../support/element-store';

Then('I expect error message shows if I enter incorrect info', () => {
  cy.get(elements.navBarAccountButton).should('be.visible').click();
  cy.get(elements.navBarLoginButton).should('be.visible').click();
  cy.url().should('include', '/login');
  cy.fixture('user-invalid').then((users) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < users.length; i++) {
      cy.get(elements.emailText).should('be.visible').clear().type(users[i].invalid.email, { log: true });
      cy.get(elements.passwordText).should('be.visible').clear().type(users[i].invalid.password, { sensitive: true });
      cy.get(elements.loginButton).should('be.enabled').click();
      cy.validateText(elements.loginErrorMessage, 'Invalid email or password.');
    }
  });
});

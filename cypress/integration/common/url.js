import { Then} from 'cypress-cucumber-preprocessor/steps';

/* eslint-disable */
Then(`I expect to see the url include {string}`, (text) => {
  cy.url().should('include', text);
});

Then(`I expect not to see the url include {string}`, (text) => {
  cy.url().should('not.include', text);
});


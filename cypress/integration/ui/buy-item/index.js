import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { elementStore } from '../../../support/element-store';

When('I add one product to the basket', () => {
  cy.intercept('GET', '**/rest/basket/**').as('basket');
  cy.get(elementStore['Add To Basket Button']).first().should('be.visible').click();
  cy.wait('@basket').then((interception) => {
    expect(interception.response.body.status).to.include('success');
    expect(interception.response.body.data.Products.length).to.eq(0);
  });
  cy.wait('@basket').then((interception) => {
    expect(interception.response.body.status).to.include('success');
    expect(interception.response.body.data.Products.length).to.eq(1);
  });
});

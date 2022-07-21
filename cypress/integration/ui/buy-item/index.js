import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { elementStore } from '../../../support/element-store';

let productName;
let productPrice;

When('I add one product to the basket', () => {
  cy.intercept('GET', '**/rest/basket/**').as('basket');
  cy.get(elementStore['Item Name Text']).first().should('be.visible').then(($el) => {
    productName = $el.text();
  });
  cy.get(elementStore['Item Price Text']).first().should('be.visible').then(($el) => {
    productPrice = $el.text();
  });
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

Then('I expect one product that added to the basket has correct info', () => {
  cy.get(elementStore['Checkout Button']).first().should('be.visible');
  cy.get('app-basket mat-row').first().find('mat-cell').eq(1)
    .invoke('text')
    .should('equal', productName);
  cy.get('app-basket mat-row').first().find('mat-cell').eq(2)
    .first()
    .find('span')
    .eq(3)
    .invoke('text')
    .should('equal', ' 1');
  cy.get('app-basket mat-row').first().find('mat-cell').eq(3)
    .invoke('text')
    .should('include', productPrice);
});

When('I add a new address', () => {
  cy.get(elementStore['Add New Address Button']).first().should('be.visible').click();
  cy.fixture('address').then((address) => {
    cy.get(elementStore['New Address Country Input']).first().should('be.visible').clear()
      .type(address.country);
    cy.get(elementStore['New Address Name Input']).first().should('be.visible').clear()
      .type(address.name);
    cy.get(elementStore['New Address Mobile Input']).first().should('be.visible').clear()
      .type(address.mobile);
    cy.get(elementStore['New Address Zip Code Input']).first().should('be.visible').clear()
      .type(address.zip);
    cy.get(elementStore['New Address Input']).first().should('be.visible').clear()
      .type(address.address);
    cy.get(elementStore['New Address City Input']).first().should('be.visible').clear()
      .type(address.city);
    cy.get(elementStore['New Address State Input']).first().should('be.visible').clear()
      .type(address.state);
  });
  cy.get(elementStore['New Address Submit Button']).first().should('be.visible').click();
  cy.get(elementStore['New Address Submit Button']).first().should('not.exist');
});

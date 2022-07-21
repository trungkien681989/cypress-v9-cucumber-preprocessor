import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { elementStore } from '../../../support/element-store';

let firstProductName;
let firstProductPrice;
let secondProductName;
let secondProductPrice;
let addressId;
let firstItemBasketId;
let secondItemBasketId;

When('I add one product to the basket', () => {
  cy.intercept('GET', '**/rest/basket/**').as('basket');
  cy.get(elementStore['Item Name Text']).first().should('be.visible').then(($el) => {
    firstProductName = $el.text();
  });
  cy.get(elementStore['Item Price Text']).first().should('be.visible').then(($el) => {
    firstProductPrice = $el.text();
  });
  cy.get(elementStore['Add To Basket Button']).first().should('be.visible').click();
  cy.wait('@basket').then((interception) => {
    expect(interception.response.body.status).to.include('success');
    expect(interception.response.body.data.Products.length).to.eq(0);
  });
  cy.wait('@basket').then((interception) => {
    expect(interception.response.body.status).to.include('success');
    expect(interception.response.body.data.Products.length).to.eq(1);
    firstItemBasketId = interception.response.body.data.Products[0].BasketItem.id;
  });
});

Then('I expect one product that added to the basket has correct info', () => {
  cy.get(elementStore['Checkout Button']).first().should('be.visible');
  cy.get('app-basket mat-row').first().find('mat-cell').eq(1)
    .invoke('text')
    .should('equal', firstProductName);
  cy.get('app-basket mat-row').first().find('mat-cell').eq(2)
    .first()
    .find('span')
    .eq(3)
    .invoke('text')
    .should('equal', ' 1');
  cy.get('app-basket mat-row').first().find('mat-cell').eq(3)
    .invoke('text')
    .should('include', firstProductPrice);
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
  cy.intercept('POST', '**/api/Addresss/**').as('createNewAddress');
  cy.get(elementStore['New Address Submit Button']).first().should('be.visible').click();
  cy.wait('@createNewAddress').then((interception) => {
    expect(interception.response.statusCode).to.equals(201);
    expect(interception.response.body.status).to.include('success');
    addressId = interception.response.body.data.id;
  });
});

Then('I expect the newly added address has correct info', () => {
  cy.fixture('address').then((address) => {
    cy.get('app-address mat-row').first().find('mat-cell').eq(1)
      .invoke('text')
      .should('contain', address.name);
    cy.get('app-address mat-row').first().find('mat-cell').eq(2)
      .invoke('text')
      .should('include', `${address.address}, ${address.city}, ${address.state}, ${address.zip}`);
    cy.get('app-address mat-row').first().find('mat-cell').eq(3)
      .invoke('text')
      .should('include', address.country);
  });
});

When('I clean up data of one product', () => {
  cy.getValidBearerToken();
  cy.task('getValue', { key: 'bearerToken' }).then((bearerTokenValue) => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('baseURL')}/api/Addresss/${addressId}`,
      headers: { Authorization: `Bearer ${bearerTokenValue}` },
    });
  }).then((response) => {
    expect(response).property('status').to.equal(200);
    expect(response.body.status).to.equal('success');
  });
  cy.task('getValue', { key: 'bearerToken' }).then((bearerTokenValue) => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('baseURL')}/api/BasketItems/${firstItemBasketId}`,
      headers: { Authorization: `Bearer ${bearerTokenValue}` },
    });
  }).then((response) => {
    expect(response).property('status').to.equal(200);
    expect(response.body.status).to.equal('success');
  });
});

When('I add two products to the basket', () => {
  cy.intercept('GET', '**/rest/basket/**').as('basket');
  cy.get(elementStore['Item Name Text']).first().should('be.visible').then(($el) => {
    firstProductName = $el.text();
  });
  cy.get(elementStore['Item Price Text']).first().should('be.visible').then(($el) => {
    firstProductPrice = $el.text();
  });
  cy.get(elementStore['Add To Basket Button']).first().should('be.visible').click();
  cy.wait('@basket').then((interception) => {
    expect(interception.response.body.status).to.include('success');
    expect(interception.response.body.data.Products.length).to.eq(0);
  });
  cy.wait('@basket').then((interception) => {
    expect(interception.response.body.status).to.include('success');
    expect(interception.response.body.data.Products.length).to.eq(1);
    firstItemBasketId = interception.response.body.data.Products[0].BasketItem.id;
  });
  cy.get(elementStore['Item Name Text']).eq(1).should('be.visible').then(($el) => {
    secondProductName = $el.text();
  });
  cy.get(elementStore['Item Price Text']).eq(1).should('be.visible').then(($el) => {
    secondProductPrice = $el.text();
  });
  cy.get(elementStore['Add To Basket Button']).eq(1).should('be.visible').click();
  cy.wait('@basket').then((interception) => {
    expect(interception.response.body.status).to.include('success');
    expect(interception.response.body.data.Products.length).to.eq(1);
  });
  cy.wait('@basket').then((interception) => {
    expect(interception.response.body.status).to.include('success');
    expect(interception.response.body.data.Products.length).to.eq(2);
    secondItemBasketId = interception.response.body.data.Products[1].BasketItem.id;
  });
});

Then('I expect two products that added to the basket has correct info', () => {
  cy.get(elementStore['Checkout Button']).first().should('be.visible');
  cy.get('app-basket mat-row').first().find('mat-cell').eq(1)
    .invoke('text')
    .should('equal', firstProductName);
  cy.get('app-basket mat-row').first().find('mat-cell').eq(2)
    .first()
    .find('span')
    .eq(3)
    .invoke('text')
    .should('equal', ' 1');
  cy.get('app-basket mat-row').first().find('mat-cell').eq(3)
    .invoke('text')
    .should('include', firstProductPrice);
  cy.get('app-basket mat-row').eq(1).find('mat-cell').eq(1)
    .invoke('text')
    .should('equal', secondProductName);
  cy.get('app-basket mat-row').eq(1).find('mat-cell').eq(2)
    .first()
    .find('span')
    .eq(3)
    .invoke('text')
    .should('equal', ' 1');
  cy.get('app-basket mat-row').eq(1).find('mat-cell').eq(3)
    .invoke('text')
    .should('include', secondProductPrice);
});

When('I clean up data of two products', () => {
  cy.getValidBearerToken();
  cy.task('getValue', { key: 'bearerToken' }).then((bearerTokenValue) => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('baseURL')}/api/Addresss/${addressId}`,
      headers: { Authorization: `Bearer ${bearerTokenValue}` },
    });
  }).then((response) => {
    expect(response).property('status').to.equal(200);
    expect(response.body.status).to.equal('success');
  });
  cy.task('getValue', { key: 'bearerToken' }).then((bearerTokenValue) => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('baseURL')}/api/BasketItems/${firstItemBasketId}`,
      headers: { Authorization: `Bearer ${bearerTokenValue}` },
    });
  }).then((response) => {
    expect(response).property('status').to.equal(200);
    expect(response.body.status).to.equal('success');
  });
  cy.task('getValue', { key: 'bearerToken' }).then((bearerTokenValue) => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('baseURL')}/api/BasketItems/${secondItemBasketId}`,
      headers: { Authorization: `Bearer ${bearerTokenValue}` },
    });
  }).then((response) => {
    expect(response).property('status').to.equal(200);
    expect(response.body.status).to.equal('success');
  });
});

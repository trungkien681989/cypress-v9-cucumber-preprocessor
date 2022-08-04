import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import * as elements from '../../../support/element-store';

let firstProductName;
let firstProductPrice;
let secondProductName;
let secondProductPrice;
let addressId;
let firstItemBasketId;
let secondItemBasketId;

When('I add one product to the basket', () => {
  cy.intercept('GET', '**/rest/basket/**').as('basket');
  cy.get(elements.itemNameText).first().should('be.visible').then(($el) => {
    firstProductName = $el.text();
  });
  cy.get(elements.itemPriceText).first().should('be.visible').then(($el) => {
    firstProductPrice = $el.text();
  });
  cy.get(elements.addToBasketButton).first().should('be.visible').click();
  // Wait for first API /basket then validate zero product is in the basket before adding
  cy.wait('@basket').then((interception) => {
    expect(interception.response.body.status).to.include('success');
    expect(interception.response.body.data.Products.length).to.eq(0);
  });
  // Wait for second API /basket then validate one product is in the basket after adding
  cy.wait('@basket').then((interception) => {
    expect(interception.response.body.status).to.include('success');
    expect(interception.response.body.data.Products.length).to.eq(1);
    firstItemBasketId = interception.response.body.data.Products[0].BasketItem.id;
  });
});

Then('I expect one product that added to the basket has correct info', () => {
  cy.get(elements.checkoutButton).first().should('be.visible');
  // Validate product name
  cy.get('app-basket mat-row').first().find('mat-cell').eq(1)
    .invoke('text')
    .should('equal', firstProductName);
  // Validate product quantity
  cy.get('app-basket mat-row').first().find('mat-cell').eq(2)
    .first()
    .find('span')
    .eq(3)
    .invoke('text')
    .should('equal', ' 1');
  // Validate product price
  cy.get('app-basket mat-row').first().find('mat-cell').eq(3)
    .invoke('text')
    .should('include', firstProductPrice);
});

When('I add a new address', () => {
  cy.get(elements.addNewAddressButton).first().should('be.visible').click();
  cy.fixture('address').then((address) => {
    cy.get(elements.newAddressCountryInput).first().should('be.visible').clear()
      .type(address.country);
    cy.get(elements.newAddressNameInput).first().should('be.visible').clear()
      .type(address.name);
    cy.get(elements.newAddressMobileInput).first().should('be.visible').clear()
      .type(address.mobile);
    cy.get(elements.newAddressZipCodeInput).first().should('be.visible').clear()
      .type(address.zip);
    cy.get(elements.newAddressInput).first().should('be.visible').clear()
      .type(address.address);
    cy.get(elements.newAddressCityInput).first().should('be.visible').clear()
      .type(address.city);
    cy.get(elements.newAddressStateInput).first().should('be.visible').clear()
      .type(address.state);
  });
  cy.intercept('POST', '**/api/Addresss/**').as('createNewAddress');
  cy.get(elements.newAddressSubmitButton).first().should('be.visible').click();
  // Wait for API /Addresss return success after click on Submit
  cy.wait('@createNewAddress').then((interception) => {
    expect(interception.response.statusCode).to.equals(201);
    expect(interception.response.body.status).to.include('success');
    addressId = interception.response.body.data.id;
  });
});

Then('I expect the newly added address has correct info', () => {
  cy.fixture('address').then((address) => {
    // Validate address name
    cy.get('app-address mat-row').first().find('mat-cell').eq(1)
      .invoke('text')
      .should('contain', address.name);
    // Validate address detail
    cy.get('app-address mat-row').first().find('mat-cell').eq(2)
      .invoke('text')
      .should('include', `${address.address}, ${address.city}, ${address.state}, ${address.zip}`);
    // Validate country
    cy.get('app-address mat-row').first().find('mat-cell').eq(3)
      .invoke('text')
      .should('include', address.country);
  });
});

When('I clean up data of one product', () => {
  cy.authenticate().then((authentication) => {
    // Delete address
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('baseURL')}/api/Addresss/${addressId}`,
      headers: { Authorization: `Bearer ${authentication.token}` },
    }).then((response) => {
      expect(response).property('status').to.equal(200);
      expect(response.body.status).to.equal('success');
    });
    // Remove product from basket
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('baseURL')}/api/BasketItems/${firstItemBasketId}`,
      headers: { Authorization: `Bearer ${authentication.token}` },
    }).then((response) => {
      expect(response).property('status').to.equal(200);
      expect(response.body.status).to.equal('success');
    });
  });
});

When('I add two products to the basket', () => {
  cy.intercept('GET', '**/rest/basket/**').as('basket');
  cy.get(elements.itemNameText).first().should('be.visible').then(($el) => {
    firstProductName = $el.text();
  });
  cy.get(elements.itemPriceText).first().should('be.visible').then(($el) => {
    firstProductPrice = $el.text();
  });
  cy.get(elements.addToBasketButton).first().should('be.visible').click();
  // Wait for API /basket then validate zero product is in the basket before adding
  cy.wait('@basket').then((interception) => {
    expect(interception.response.body.status).to.include('success');
    expect(interception.response.body.data.Products.length).to.eq(0);
  });
  // Wait for API /basket then validate one product is in the basket after adding 1st product
  cy.wait('@basket').then((interception) => {
    expect(interception.response.body.status).to.include('success');
    expect(interception.response.body.data.Products.length).to.eq(1);
    firstItemBasketId = interception.response.body.data.Products[0].BasketItem.id;
  });
  cy.get(elements.itemNameText).eq(1).should('be.visible').then(($el) => {
    secondProductName = $el.text();
  });
  cy.get(elements.itemPriceText).eq(1).should('be.visible').then(($el) => {
    secondProductPrice = $el.text();
  });
  cy.get(elements.addToBasketButton).eq(1).should('be.visible').click();
  // Wait for API /basket then validate one product is in the basket before adding second product
  cy.wait('@basket').then((interception) => {
    expect(interception.response.body.status).to.include('success');
    expect(interception.response.body.data.Products.length).to.eq(1);
  });
  // Wait for API /basket then validate two products is in the basket after adding 2nd product
  cy.wait('@basket').then((interception) => {
    expect(interception.response.body.status).to.include('success');
    expect(interception.response.body.data.Products.length).to.eq(2);
    secondItemBasketId = interception.response.body.data.Products[1].BasketItem.id;
  });
});

Then('I expect two products that added to the basket has correct info', () => {
  cy.get(elements.checkoutButton).first().should('be.visible');
  // Validate first product
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
  // Validate second product
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
  cy.authenticate().then((authentication) => {
    // Delete address
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('baseURL')}/api/Addresss/${addressId}`,
      headers: { Authorization: `Bearer ${authentication.token}` },
    }).then((response) => {
      expect(response).property('status').to.equal(200);
      expect(response.body.status).to.equal('success');
    });
    // Remove 1st product from basket
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('baseURL')}/api/BasketItems/${firstItemBasketId}`,
      headers: { Authorization: `Bearer ${authentication.token}` },
    }).then((response) => {
      expect(response).property('status').to.equal(200);
      expect(response.body.status).to.equal('success');
    });
    // Remove 2nd product from basket
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('baseURL')}/api/BasketItems/${secondItemBasketId}`,
      headers: { Authorization: `Bearer ${authentication.token}` },
    }).then((response) => {
      expect(response).property('status').to.equal(200);
      expect(response.body.status).to.equal('success');
    });
  });
});

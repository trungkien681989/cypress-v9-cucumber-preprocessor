import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

let bearerToken;
let basketId;
let firstItemBasketId;
let firstItemId;
let firstItemName;
let secondItemBasketId;
let secondItemId;
let secondItemName;

function addItemToBasket(itemId) {
  cy.authenticate().then((authentication) => {
    bearerToken = authentication.token;
    basketId = authentication.bid;
    cy.request({
      method: 'POST',
      url: `${Cypress.env('baseURL')}/api/BasketItems/`,
      headers: { Authorization: `Bearer ${bearerToken}` },
      body: {
        ProductId: itemId,
        BasketId: basketId,
        quantity: 1,
      },
    }).then((response) => {
      expect(response).property('status').to.equal(200);
      cy.setValue('itemBasketId', response.body.data.id);
    });
  });
}

function deleteItemFromBasket(itemBasketIdValue) {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('baseURL')}/api/BasketItems/${itemBasketIdValue}`,
    headers: { Authorization: `Bearer ${bearerToken}` },
  }).then((response) => {
    expect(response).property('status').to.equal(200);
    expect(response.body.status).to.equal('success');
  });
}

Given('I search items to add to the basket', () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseURL')}/rest/products/search?q=`,
    headers: { Authorization: `Bearer ${bearerToken}` },
  }).then((response) => {
    expect(response).property('status').to.equal(200);
    firstItemId = response.body.data[0].id;
    firstItemName = response.body.data[0].name;
    secondItemId = response.body.data[1].id;
    secondItemName = response.body.data[1].name;
  });
});

When('I add one item to the basket', () => {
  addItemToBasket(firstItemId);
  cy.getValue('itemBasketId').then((itemBasketId) => {
    firstItemBasketId = itemBasketId;
  });
});

Then('I expect one item is added to the basket', () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseURL')}/rest/basket/${basketId}`,
    headers: { Authorization: `Bearer ${bearerToken}` },
  }).then((response) => {
    expect(response).property('status').to.equal(200);
    expect(response.body.data.Products.length).to.equal(1);
    expect(response.body.data.Products[0].id).to.equal(firstItemId);
    expect(response.body.data.Products[0].name).to.equal(firstItemName);
  });
});

When('I add two items to the basket', () => {
  addItemToBasket(firstItemId);
  // Retrieve first item basket ID to delete in later steps
  cy.getValue('itemBasketId').then((itemBasketId) => {
    firstItemBasketId = itemBasketId;
  });
  addItemToBasket(secondItemId);
  // Retrieve second item basket ID to delete in later steps
  cy.getValue('itemBasketId').then((itemBasketId) => {
    secondItemBasketId = itemBasketId;
  });
});

Then('I expect two items are added to the basket', () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseURL')}/rest/basket/${basketId}`,
    headers: { Authorization: `Bearer ${bearerToken}` },
  }).then((response) => {
    expect(response).property('status').to.equal(200);
    expect(response.body.data.Products.length).to.equal(2);
    expect(response.body.data.Products[0].id).to.equal(firstItemId);
    expect(response.body.data.Products[0].name).to.equal(firstItemName);
    expect(response.body.data.Products[1].id).to.equal(secondItemId);
    expect(response.body.data.Products[1].name).to.equal(secondItemName);
  });
});

When('I delete one item from the basket', () => {
  deleteItemFromBasket(firstItemBasketId);
});

When('I delete two items from the basket', () => {
  deleteItemFromBasket(firstItemBasketId);
  deleteItemFromBasket(secondItemBasketId);
});

When('I delete one remaining item from the basket', () => {
  deleteItemFromBasket(secondItemBasketId);
});

Then('I expect one item is remain in the basket', () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseURL')}/rest/basket/${basketId}`,
    headers: { Authorization: `Bearer ${bearerToken}` },
  }).then((response) => {
    expect(response).property('status').to.equal(200);
    expect(response.body.data.Products.length).to.equal(1);
    expect(response.body.data.Products[0].id).to.equal(secondItemId);
    expect(response.body.data.Products[0].name).to.equal(secondItemName);
  });
});

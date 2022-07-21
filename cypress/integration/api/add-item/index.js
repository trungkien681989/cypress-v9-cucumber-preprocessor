import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

function addItemToBasket(itemId) {
  cy.task('getValue', { key: 'bearerToken' }).then((bearerTokenValue) => {
    cy.task('getValue', { key: 'basketId' }).then((basketIdValue) => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('baseURL')}/api/BasketItems/`,
        headers: { Authorization: `Bearer ${bearerTokenValue}` },
        body: {
          ProductId: itemId,
          BasketId: basketIdValue,
          quantity: 1,
        },
      });
    });
  }).then((response) => {
    expect(response).property('status').to.equal(200);
    cy.task('setValue', { key: 'firstItemBasketId', value: response.body.data.id });
  });
}

Given('I search items to add to the basket', () => {
  cy.task('getValue', { key: 'bearerToken' }).then((bearerTokenValue) => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('baseURL')}/rest/products/search?q=`,
      headers: { Authorization: `Bearer ${bearerTokenValue}` },
    });
  }).then((response) => {
    expect(response).property('status').to.equal(200);
    cy.task('setValue', { key: 'firstItemId', value: response.body.data[0].id });
    cy.task('setValue', { key: 'firstItemName', value: response.body.data[0].name });
    cy.task('setValue', { key: 'secondItemId', value: response.body.data[1].id });
    cy.task('setValue', { key: 'secondItemName', value: response.body.data[1].name });
  });
});

When('I add one item to the basket', () => {
  cy.task('getValue', { key: 'firstItemId' }).then((firstItemIdValue) => {
    addItemToBasket(firstItemIdValue);
  });
});

Then('I expect one item was added to the basket', () => {
  cy.task('getValue', { key: 'bearerToken' }).then((bearerTokenValue) => {
    cy.task('getValue', { key: 'basketId' }).then((basketIdValue) => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('baseURL')}/rest/basket/${basketIdValue}`,
        headers: { Authorization: `Bearer ${bearerTokenValue}` },
      });
    });
  }).then((response) => {
    expect(response).property('status').to.equal(200);
    expect(response.body.data.Products.length).to.equal(1);
    cy.task('getValue', { key: 'firstItemId' }).then((firstItemIdValue) => {
      expect(response.body.data.Products[0].id).to.equal(firstItemIdValue);
    });
    cy.task('getValue', { key: 'firstItemName' }).then((firstItemNameValue) => {
      expect(response.body.data.Products[0].name).to.equal(firstItemNameValue);
    });
  });
});

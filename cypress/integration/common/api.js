import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

Given('I call login endpoint to generate a valid bearer token', () => {
  cy.getValidBearerToken();
});

Given('I make sure test data is cleaned up', () => {
  cy.getValidBearerToken();
  cy.task('getValue', { key: 'bearerToken' }).then((bearerTokenValue) => {
    cy.task('getValue', { key: 'basketId' }).then((basketIdValue) => {
      // Get items in basket
      cy.request({
        method: 'GET',
        url: `${Cypress.env('baseURL')}/rest/basket/${basketIdValue}`,
        headers: { Authorization: `Bearer ${bearerTokenValue}` },
      }).then((getResponse) => {
        expect(getResponse).property('status').to.equal(200);
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < getResponse.body.data.Products.length; i++) {
          // Delete items
          cy.request({
            method: 'DELETE',
            url: `${Cypress.env('baseURL')}/api/BasketItems/${getResponse.body.data.Products[i].BasketItem.id}`,
            headers: { Authorization: `Bearer ${bearerTokenValue}` },
          }).then((deleteResponse) => {
            expect(deleteResponse).property('status').to.equal(200);
            expect(deleteResponse.body.status).to.equal('success');
          });
        }
      });
    });
  });
});

Then('I validate schema of {string} endpoint', (endpoint) => {
  cy.task('getValue', { key: `body_${endpoint}` }).then((response) => {
    cy.fixture(`schema/${endpoint.toString().replaceAll('/', '-')}`).then((schema) => {
      const validate = ajv.compile(schema);
      const valid = validate(response);
      if (!valid) {
        cy.log(validate.errors).then(() => {
          throw new Error('Wrong Schema. Please double check recent commits.');
        });
      }
    });
  });
});

When('I make request to endpoint {string} with method {string} and expect response status code is {string}', (endpoint, method, status) => {
  cy.task('getValue', { key: 'bearerToken' }).then((bearerTokenValue) => {
    cy.request({
      method: `${method}`,
      url: `${Cypress.env('baseURL')}/${endpoint}`,
      headers: {
        Authorization: `Bearer ${bearerTokenValue}`,
      },
      failOnStatusCode: false,
    });
  }).then((response) => {
    expect(response).property('status').to.equal(parseInt(status, 10));
    cy.task('setValue', { key: `body_${endpoint}`, value: response.body });
  });
});

When('I make request to endpoint {string} with method {string} and query params {string} then expect response status code is {string}', (endpoint, method, queryParam, status) => {
  cy.task('getValue', { key: 'bearerToken' }).then((bearerTokenValue) => {
    cy.request({
      method: `${method}`,
      url: `${Cypress.env('baseURL')}/${endpoint}?${queryParam}`,
      headers: {
        Authorization: `Bearer ${bearerTokenValue}`,
      },
      failOnStatusCode: false,
    });
  }).then((response) => {
    expect(response).property('status').to.equal(parseInt(status, 10));
    cy.task('setValue', { key: `body_${endpoint}`, value: response.body });
  });
});

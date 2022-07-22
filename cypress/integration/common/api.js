import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

Given('I call login endpoint to generate a valid bearer token', () => {
  cy.getValidBearerToken();
});

Then('I validate schema of {string} endpoint', (endpoint) => {
  cy.task('getValue', { key: `body_${endpoint}` }).then((response) => {
    cy.fixture(endpoint.toString().replaceAll('/', '-')).then((schema) => {
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

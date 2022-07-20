import { When } from 'cypress-cucumber-preprocessor/steps';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

When('I validate schema {string} of {string} endpoint', (api, endpoint) => {
  cy.task('getValue', { key: `body_${api}` }).then((response) => {
    cy.fixture(`${endpoint}`).then((schema) => {
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
  cy.getValidBearerToken();
  cy.task('getValue', { key: 'bearerToken' }).then((bearerTokenValue) => {
    cy.request({
      method: `${method}`,
      url: `${Cypress.env('baseURL')}/${endpoint}`,
      headers: {
        Authorization: `Bearer ${bearerTokenValue}`,
      },
    });
  }).then((response) => {
    expect(response).property('status').to.equal(status);
    cy.task('setValue', { key: `body_${endpoint}`, value: response.body });
  });
});

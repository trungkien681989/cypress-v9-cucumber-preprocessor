import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import Ajv from 'ajv';
import AddressUtil from '../utils/addressUtil';
import ProductUtil from '../utils/productUtil';

const addressUtil = new AddressUtil();
const productUtil = new ProductUtil();
const ajv = new Ajv({ allErrors: true });
let bearerToken;
let responseBody;

Given('I call login endpoint to generate a valid bearer token', () => {
  cy.authenticate().then((authentication) => {
    bearerToken = authentication.token;
  });
});

Given('I make sure test data is cleaned up', () => {
  productUtil.cleanUpProducts();
  addressUtil.cleanupAddress();
});

Then('I validate schema of {string} endpoint', (endpoint) => {
  cy.fixture(`schema/${endpoint.toString().replaceAll('/', '-')}`).then((schema) => {
    const validate = ajv.compile(schema);
    const valid = validate(responseBody);
    if (!valid) {
      cy.log(validate.errors).then(() => {
        throw new Error('Wrong Schema. Please double check recent commits.');
      });
    }
  });
});

When('I make request to endpoint {string} with method {string} and expect response status code is {string}', (endpoint, method, statusCode) => {
  cy.request({
    method: `${method}`,
    url: `${Cypress.env('baseURL')}/${endpoint}`,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
    failOnStatusCode: false,
  }).should(({ status, body }) => {
    expect(status).to.equal(parseInt(statusCode, 10));
    responseBody = body;
  });
});

When('I make request to endpoint {string} with method {string} and query params {string} then expect response status code is {string}', (endpoint, method, queryParam, statusCode) => {
  cy.request({
    method: `${method}`,
    url: `${Cypress.env('baseURL')}/${endpoint}?${queryParam}`,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
    failOnStatusCode: false,
  }).should(({ status, body }) => {
    expect(status).to.equal(parseInt(statusCode, 10));
    responseBody = body;
  });
});

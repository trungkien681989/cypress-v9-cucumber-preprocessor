import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { elementStore } from '../../support/element-store';

When('I set viewport to {string}', (option) => {
  cy.viewport(option);
});

When('I click the {string}', (element) => {
  cy.clickElement(elementStore[element]);
});

When('I enter {string} into the {string}', (text, element) => {
  cy.clearAndType(elementStore[element], text);
});

When('I select {string} in the {string}', (option, element) => {
  cy.get(elementStore[element]).should('be.visible').select(option);
});

When('I scroll in the {string}', (element) => {
  cy.get(elementStore[element]).first().should('be.visible').scrollTo(0, 1000, { duration: 1000 }); // down 1000px
});

When('I take a snapshot with name is {string}', (name) => {
  cy.percySnapshot(name);
});

Then('I expect to see the {string} is enabled', (element) => {
  cy.get(elementStore[element]).first().should('be.enabled');
});

Then('I expect to see the {string} is disabled', (element) => {
  cy.get(elementStore[element]).first().should('be.disabled');
});

Then('I expect the {string} to be visible', (element) => {
  cy.get(elementStore[element]).should('be.visible');
});

Then('I expect the {string} not to be visible', (element) => {
  cy.get(elementStore[element]).should('not.exist');
});

Then('I expect to see {string} in the {string}', (text, element) => {
  cy.contains(elementStore[element], text);
});

Then('I expect not to see text in the {string}', (element) => {
  cy.get(elementStore[element]).should('not.contain.text');
});

Then('I expect to see text of the {string} is {string}', (element, text) => {
  cy.get(elementStore[element]).invoke('text').should('eq', text);
});

Then('I expect to see text of the {string} includes {string}', (element, text) => {
  cy.get(elementStore[element]).invoke('text').should('include', text);
});

Then('I expect to see value of the {string} is {string}', (element, value) => {
  cy.get(elementStore[element]).invoke('val').should('eq', value);
});

Then('I expect to see value of the {string} is not empty', (element) => {
  cy.get(elementStore[element]).invoke('val').should('not.be.empty');
});

Then('I expect to see value of the {string} is empty', (element) => {
  cy.get(elementStore[element]).invoke('val').should('be.empty');
});

Then('I expect to see text of the {string} shows {string}', (element, text) => {
  cy.get(elementStore[element]).invoke('text').should('eq', text);
});

Then('I expect to see text of the {string} does not show {string}', (element, text) => {
  cy.get(elementStore[element]).invoke('text').should('not.eq', text);
});

Then('I expect to see text of the xpath element {string} shows {string}', (element, text) => {
  cy.xpath(elementStore[element]).invoke('text').should('eq', text);
});

Then('I expect to see text of the xpath element {string} does not show {string}', (element, text) => {
  cy.xpath(elementStore[element]).invoke('text').should('eq', text);
});

Then('I expect the link {string} is working', (element) => {
  cy.get(elementStore[element]).then(($linkUrl) => {
    cy.wrap($linkUrl).invoke('attr', 'href').as('hrefUrl');
    cy.get('@hrefUrl').then((url) => {
      cy.request(`${url}`).then((resp) => {
        expect(resp.status).to.eq(200);
      });
    });
  });
});

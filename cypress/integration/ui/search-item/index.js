import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { elementStore } from '../../../support/element-store';

When('I search for {string}', (searchValue) => {
  cy.get(elementStore['Search Input']).first().should('be.visible').click()
    .type(`${searchValue}{enter}`);
});

Then('I expect search results shows {string} products', (searchValue) => {
  cy.get(elementStore['Search Value Text']).should('be.visible')
    .invoke('text').should('equal', searchValue);
  cy.get(elementStore['Item Name Text']).each(($el) => {
    expect($el.text()).to.include(searchValue);
  });
});

Then('I expect search results does not show {string} products', (searchValue) => {
  cy.get(elementStore['Item Name Text']).each(($el) => {
    expect($el.text()).not.to.include(searchValue);
  });
});

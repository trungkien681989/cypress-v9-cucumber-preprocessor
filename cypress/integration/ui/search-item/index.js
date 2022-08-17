import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import * as elements from '../../../support/element-store';

When('I search for {string}', (searchValue) => {
  cy.get(elements.searchInput).first().should('be.visible').click()
    .type(`${searchValue}{enter}`);
});

Then('I expect search results shows {string} products', (searchValue) => {
  cy.validateText(elements.searchValueText, searchValue);
  cy.get(elements.itemNameText).each(($el) => {
    expect($el.text()).to.include(searchValue);
  });
});

Then('I expect search results does not show {string} products', (searchValue) => {
  cy.get(elements.itemNameText).each(($el) => {
    expect($el.text()).not.to.include(searchValue);
  });
});

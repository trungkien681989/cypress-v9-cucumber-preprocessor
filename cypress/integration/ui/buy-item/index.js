import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import AddressUtil from '../../utils/addressUtil';
import ProductUtil from '../../utils/productUtil';
import {
  allProducts, basket, address, newAddress,
} from '../../../support/element-store';

const addressUtil = new AddressUtil();
const productUtil = new ProductUtil();

let firstProductName;
let firstProductPrice;
let secondProductName;
let secondProductPrice;

When('I add one product to the basket', () => {
  cy.intercept('GET', '**/rest/basket/**').as('basket');
  cy.get(allProducts.itemNameText).first().should('be.visible').then(($el) => {
    firstProductName = $el.text();
  });
  cy.get(allProducts.itemPriceText).first().should('be.visible').then(($el) => {
    firstProductPrice = $el.text();
  });
  cy.clickElement(allProducts.addToBasketButton);
  // Wait for first API /basket then validate zero product is in the basket before adding
  productUtil.validateProductNumberFromBackend('@basket', 0);
  // Wait for second API /basket then validate one product is in the basket after adding
  productUtil.validateProductNumberFromBackend('@basket', 1);
});

Then('I expect one product that added to the basket has correct info', () => {
  cy.get(basket.checkoutButton).first().should('be.visible');
  productUtil.validateProductInfoInBasket(1, firstProductName, 1, firstProductPrice);
});

When('I add a new address', () => {
  cy.clickElement(address.addNewAddressButton);
  cy.fixture('address').then((addressData) => {
    addressUtil.fillAddress(addressData.country, addressData.name, addressData.mobile,
      addressData.zip, addressData.address, addressData.city, addressData.state);
  });
  cy.intercept('POST', '**/api/Addresss/**').as('createNewAddress');
  cy.clickElement(newAddress.submitButton);
  // Wait for API /Addresss return success after click on Submit
  cy.wait('@createNewAddress').then((interception) => {
    expect(interception.response.statusCode).to.equals(201);
    expect(interception.response.body.status).to.include('success');
  });
});

Then('I expect the newly added address has correct info', () => {
  cy.fixture('address').then((addressData) => {
    addressUtil.validateAddressInfo(addressData.name, addressData.address, addressData.city,
      addressData.state, addressData.zip, addressData.country);
  });
});

When('I add two products to the basket', () => {
  cy.intercept('GET', '**/rest/basket/**').as('basket');
  cy.get(allProducts.itemNameText).first().should('be.visible').then(($el) => {
    firstProductName = $el.text();
  });
  cy.get(allProducts.itemPriceText).first().should('be.visible').then(($el) => {
    firstProductPrice = $el.text();
  });
  cy.clickElement(allProducts.addToBasketButton);
  // Wait for API /basket then validate zero product is in the basket before adding
  productUtil.validateProductNumberFromBackend('@basket', 0);
  // Wait for API /basket then validate one product is in the basket after adding 1st product
  productUtil.validateProductNumberFromBackend('@basket', 1);
  cy.get(allProducts.itemNameText).eq(1).should('be.visible').then(($el) => {
    secondProductName = $el.text();
  });
  cy.get(allProducts.itemPriceText).eq(1).should('be.visible').then(($el) => {
    secondProductPrice = $el.text();
  });
  cy.get(allProducts.addToBasketButton).eq(1).should('be.visible').click();
  // Wait for API /basket then validate one product is in the basket before adding second product
  productUtil.validateProductNumberFromBackend('@basket', 1);
  // Wait for API /basket then validate two products is in the basket after adding 2nd product
  productUtil.validateProductNumberFromBackend('@basket', 2);
});

Then('I expect two products that added to the basket has correct info', () => {
  cy.get(basket.checkoutButton).first().should('be.visible');
  // Validate first product
  productUtil.validateProductInfoInBasket(1, firstProductName, 1, firstProductPrice);
  // Validate second product
  productUtil.validateProductInfoInBasket(2, secondProductName, 1, secondProductPrice);
});

@ui
Feature: Buy products

  As a user of OWASP Juice Shop, I want to buy my selected products

  Background: Generate a valid bearer token
    Given I am on the OWASP Juice Shop home page
    And I login to my account

  @smoke @regression
  Scenario: Buying one product

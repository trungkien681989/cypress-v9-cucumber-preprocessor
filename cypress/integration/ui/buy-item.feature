@ui
Feature: Buy products

  As a user of OWASP Juice Shop, I want to buy my selected products

  Background: Logged in the OWASP Juice Shop
    Given I make sure test data is cleaned up
    And I am on the OWASP Juice Shop home page
    And I login to my account

  @smoke @regression
  Scenario: Buying one product
    When I add one product to the basket
    And I click the "Your Basket Button"
    Then I expect one product that added to the basket has correct info
    And I click the "Checkout Button"
    And I add a new address
    Then I expect the newly added address has correct info

  @regression
  Scenario: Buying two products
    When I add two products to the basket
    And I click the "Your Basket Button"
    Then I expect two products that added to the basket has correct info
    And I click the "Checkout Button"
    And I add a new address
    Then I expect the newly added address has correct info

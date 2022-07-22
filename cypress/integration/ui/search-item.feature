@ui
Feature: Search products

  As a user of OWASP Juice Shop, I want to search for my interested products

  Background: Open the OWASP Juice Shop
    Given I am on the OWASP Juice Shop home page

  @smoke @regression
  Scenario: Search for a product
    When I click the "Search Button"
    And I search for "Apple"
    Then I expect search results shows "Apple" products
    And I expect search results does not show "Banana" products
    And I take a snapshot with name is "AppleSearchResults"

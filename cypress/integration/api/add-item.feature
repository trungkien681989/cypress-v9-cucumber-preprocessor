@api
Feature: Add and Delete items from basket using api
  As a Software Test Engineer, when I add and delete items from basket using api
  I expect to gain successful responses

  Background: Search items to add to the basket
    Given I make sure test data is cleaned up
    And I search items to add to the basket

  @smoke @regression
  Scenario: Add one item to the basket
    When I add one item to the basket
    Then I expect one item is added to the basket

  @regression
  Scenario: Add two items to the basket
    When I add two items to the basket
    Then I expect two items are added to the basket

  @regression
  Scenario: Add two items to the basket then delete one
    When I add two items to the basket
    Then I expect two items are added to the basket
    When I delete one item from the basket
    Then I expect one item is remain in the basket
    And I delete one remaining item from the basket

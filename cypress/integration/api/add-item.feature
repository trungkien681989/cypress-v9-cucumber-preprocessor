@api
Feature: Add and Delete items from basket using api
  As a Software Test Engineer, when I add and delete items from basket using api
  I expect to gain successful responses

  Background: Generate a valid bearer token
    Given I call login endpoint to generate a valid bearer token
    And I search items to add to the basket

  @smoke
  Scenario: Add one item to the basket
    When I add one item to the basket
    Then I expect one item was added to the basket
    And I delete one item from the basket

  @regression
  Scenario: Add two items to the basket
    When I add two items to the basket
    Then I expect two items was added to the basket
    And I delete two items from the basket

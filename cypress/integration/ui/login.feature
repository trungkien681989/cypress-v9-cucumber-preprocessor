@ui
Feature: Login

  As a software test engineer , I want to validate login feature for OWASP Juice Shop

  Background: Open the OWASP Juice Shop
    Given I am on the OWASP Juice Shop home page

  @regression
  Scenario: Error message shows if user login with incorrect info
    Then I expect error message shows if I enter incorrect info

  @smoke @regression
  Scenario: Login success with valid account
    When I login to my account
    Then I expect to see the "Add To Basket Button" is enabled

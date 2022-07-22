@ui
Feature: Alternative cases of product search using mock

  As a Software Test Engineer, I want to test alternative cases of product search using mock

  @regression
  Scenario: Home page display when no product found
    Given I am on the OWASP Juice Shop home page with mock "no-product"
    Then I expect home page display no product

  @regression
  Scenario: Home page display when product search api returns internal server error
    Given I am on the OWASP Juice Shop home page with internal server error mock
    Then I expect home page display no product

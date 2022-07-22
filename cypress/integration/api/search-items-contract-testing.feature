@api
Feature: API contract testing for endpoint "/product/search"
  As a Software Test Engineer, when I make a RESTful request to the endpoint "/product/search"
  I expect to gain successful responses.

  Background: Generate a valid bearer token
    Given I call login endpoint to generate a valid bearer token

  @regression
  Scenario: Verify valid response of "rest/product/search"
    When I make request to endpoint "rest/products/search" with method "GET" and query params "q=" then expect response status code is "200"
    Then I validate schema of "rest/products/search" endpoint

  # The API should return method not allowed 405 instead of 500
  @regression
  Scenario: Verify Method Not Allowed response of "rest/product/search"
    When I make request to endpoint "rest/products/search" with method "POST" and query params "q=" then expect response status code is "500"

  # The API should return not found 404 instead of 500
  @regression
  Scenario Outline: Verify Not Found response of "rest/product/search"
    When I make request to endpoint "<endpoint>" with method "GET" and expect response status code is "500"
    Examples:
      | endpoint               |
      | rest/products/searches |
      | rest/product/search    |

/* LOCATORS
 Should place them in order: left-to-right & top-to-bottom */

export const popup = {
  closeWelcomeBannerButton: 'button[aria-label="Close Welcome Banner"]',
  dismissCookieMessage: 'a[aria-label="dismiss cookie message"]',
};

export const login = {
  emailInput: 'input#email',
  passwordInput: 'input#password',
  loginButton: 'button#loginButton',
  errorMessage: 'div[class*="error"]',
};

export const header = {
  backToHomePageButton: 'button[aria-label="Back to homepage"]',
  searchButton: 'mat-icon[class*="mat-search_icon-search"]',
  searchInput: 'input#mat-input-0',
  navBarAccountButton: 'button#navbarAccount',
  navBarLoginButton: 'button#navbarLoginButton',
  yourBasketButton: 'button[aria-label="Show the shopping cart"]',
};

export const allProducts = {
  itemNameText: 'div.item-name',
  itemPriceText: 'div.item-price span',
  addToBasketButton: 'button[aria-label="Add to Basket"]',
  itemsPerPage: 'div[class*="paginator-page-size-label"]',
};

export const searchResults = {
  searchValueText: 'span#searchValue',
};

export const basket = {
  checkoutButton: 'button#checkoutButton',
};

export const address = {
  addNewAddressButton: 'button[aria-label="Add a new address"]',
};

export const newAddress = {
  countryInput: 'input[data-placeholder="Please provide a country."]',
  nameInput: 'input[data-placeholder="Please provide a name."]',
  mobileInput: 'input[data-placeholder="Please provide a mobile number."]',
  zipCodeInput: 'input[data-placeholder="Please provide a ZIP code."]',
  addressInput: 'textarea[data-placeholder="Please provide an address."]',
  cityInput: 'input[data-placeholder="Please provide a city."]',
  stateInput: 'input[data-placeholder="Please provide a state."]',
  submitButton: 'button#submitButton',
};

export const elementStore = {
  // POPUPS
  'Close Welcome Banner Button': popup.closeWelcomeBannerButton,
  'Dismiss Cookie Message': popup.dismissCookieMessage,

  // LOGIN
  'Email Input': login.emailInput,
  'Password Input': login.passwordInput,
  'Login Button': login.loginButton,
  'Login Error Message': login.errorMessage,

  // HEADER
  'Back To Home Page Button': header.backToHomePageButton,
  'Search Button': header.searchButton,
  'Search Input': header.searchInput,
  'Nav Bar Account Button': header.navBarAccountButton,
  'Nav Bar Login Button': header.navBarLoginButton,
  'Your Basket Button': header.yourBasketButton,

  // ALL PRODUCTS
  'Item Name Text': allProducts.itemNameText,
  'Item Price Text': allProducts.itemPriceText,
  'Add To Basket Button': allProducts.addToBasketButton,
  'Items Per Page': allProducts.itemsPerPage,

  // SEARCH RESULTS
  'Search Value Text': searchResults.searchValueText,

  // BASKET
  'Checkout Button': basket.checkoutButton,

  // ADDRESS
  'Add New Address Button': address.addNewAddressButton,

  // NEW ADDRESS FORM
  'New Address Country Input': newAddress.countryInput,
  'New Address Name Input': newAddress.nameInput,
  'New Address Mobile Input': newAddress.mobileInput,
  'New Address Zip Code Input': newAddress.zipCodeInput,
  'New Address Input': newAddress.addressInput,
  'New Address City Input': newAddress.cityInput,
  'New Address State Input': newAddress.stateInput,
  'New Address Submit Button': newAddress.submitButton,
};

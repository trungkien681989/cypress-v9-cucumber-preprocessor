/* LOCATORS
 Should place them in order: left-to-right & top-to-bottom */

/* POPUPS
========================================================================= */
export const closeWelcomeBannerButton = 'button[aria-label="Close Welcome Banner"]';
export const dismissCookieMessage = 'a[aria-label="dismiss cookie message"]';

/* LOGIN
========================================================================= */
export const emailText = 'input#email';
export const passwordText = 'input#password';
export const loginButton = 'button#loginButton';

/* HEADER
========================================================================= */
export const backToHomePageButton = 'button[aria-label="Back to homepage"]';
export const searchButton = 'mat-icon[class*="mat-search_icon-search"]';
export const searchInput = 'input#mat-input-0';
export const navBarAccountButton = 'button#navbarAccount';
export const navBarLoginButton = 'button#navbarLoginButton';
export const yourBasketButton = 'button[aria-label="Show the shopping cart"]';

/* ALL PRODUCTS
========================================================================= */
export const itemNameText = 'div.item-name';
export const itemPriceText = 'div.item-price span';
export const addToBasketButton = 'button[aria-label="Add to Basket"]';
export const itemsPerPage = 'div[class*="paginator-page-size-label"]';

/* SEARCH RESULTS
========================================================================= */
export const searchValueText = 'span#searchValue';

/* BASKET
========================================================================= */
export const checkoutButton = 'button#checkoutButton';

/* ADDRESS
========================================================================= */
export const addNewAddressButton = 'button[aria-label="Add a new address"]';

/* NEW ADDRESS FORM
========================================================================= */
export const newAddressCountryInput = 'input[data-placeholder="Please provide a country."]';
export const newAddressNameInput = 'input[data-placeholder="Please provide a name."]';
export const newAddressMobileInput = 'input[data-placeholder="Please provide a mobile number."]';
export const newAddressZipCodeInput = 'input[data-placeholder="Please provide a ZIP code."]';
export const newAddressInput = 'textarea[data-placeholder="Please provide an address."]';
export const newAddressCityInput = 'input[data-placeholder="Please provide a city."]';
export const newAddressStateInput = 'input[data-placeholder="Please provide a state."]';
export const newAddressSubmitButton = 'button#submitButton';

export const elementStore = {
  // POPUPS
  'Close Welcome Banner Button': closeWelcomeBannerButton,
  'Dismiss Cookie Message': dismissCookieMessage,

  // LOGIN
  'Email Text': emailText,
  'Password Text': passwordText,
  'Login Button': loginButton,

  // HEADER
  'Back To Home Page Button': backToHomePageButton,
  'Search Button': searchButton,
  'Search Input': searchInput,
  'Nav Bar Account Button': navBarAccountButton,
  'Nav Bar Login Button': navBarLoginButton,
  'Your Basket Button': yourBasketButton,

  // ALL PRODUCTS
  'Item Name Text': itemNameText,
  'Item Price Text': itemPriceText,
  'Add To Basket Button': addToBasketButton,
  'Items Per Page': itemsPerPage,

  // SEARCH RESULTS
  'Search Value Text': searchValueText,

  // BASKET
  'Checkout Button': checkoutButton,

  // ADDRESS
  'Add New Address Button': addNewAddressButton,

  // NEW ADDRESS FORM
  'New Address Country Input': newAddressCountryInput,
  'New Address Name Input': newAddressNameInput,
  'New Address Mobile Input': newAddressMobileInput,
  'New Address Zip Code Input': newAddressZipCodeInput,
  'New Address Input': newAddressInput,
  'New Address City Input': newAddressCityInput,
  'New Address State Input': newAddressStateInput,
  'New Address Submit Button': newAddressSubmitButton,
};

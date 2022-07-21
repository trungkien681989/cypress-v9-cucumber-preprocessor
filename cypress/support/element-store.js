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
export const navBarAccountButton = 'button#navbarAccount';
export const navBarLoginButton = 'button#navbarLoginButton';
export const yourBasketButton = 'button[aria-label="Show the shopping cart"]';

/* ALL PRODUCTS
========================================================================= */
export const itemNameText = 'div.item-name';
export const itemPriceText = 'div.item-price span';
export const addToBasketButton = 'button[aria-label="Add to Basket"]';
export const itemsPerPage = 'div[class*="paginator-page-size-label"]';

/* BASKET
========================================================================= */
export const checkoutButton = 'button#checkoutButton';

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
  'Nav Bar Account Button': navBarAccountButton,
  'Nav Bar Login Button': navBarLoginButton,
  'Your Basket Button': yourBasketButton,

  // ALL PRODUCTS
  'Item Name Text': itemNameText,
  'Item Price Text': itemPriceText,
  'Add To Basket Button': addToBasketButton,
  'Items Per Page': itemsPerPage,

  // BASKET
  'Checkout Button': checkoutButton,
};

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

/* ALL PRODUCTS
========================================================================= */
export const addToBasketButton = 'button[aria-label="Add to Basket"]';
export const itemsPerPage = 'div[class*="paginator-page-size-label"]';

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

  // ALL PRODUCTS
  'Add To Basket Button': addToBasketButton,
  'Items Per Page': itemsPerPage,
};

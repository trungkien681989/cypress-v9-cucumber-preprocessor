export default class ProductUtil {
  validateProductInfoInBasket(row, productName, productQuantity, productPrice) {
    // Validate product name
    cy.get('app-basket mat-row').eq(row - 1).find('mat-cell').eq(1)
      .invoke('text')
      .should('equal', productName);
    // Validate product quantity
    cy.get('app-basket mat-row').eq(row - 1).find('mat-cell').eq(2)
      .first()
      .find('span')
      .eq(3)
      .invoke('text')
      .should('equal', ` ${productQuantity}`);
    // Validate product price
    cy.get('app-basket mat-row').eq(row - 1).find('mat-cell').eq(3)
      .invoke('text')
      .should('include', productPrice);
    return this;
  }

  validateProductNumberFromBackend(alias, productNumber) {
    cy.wait(alias).then((interception) => {
      expect(interception.response.body.status).to.include('success');
      expect(interception.response.body.data.Products.length).to.eq(productNumber);
    });
    return this;
  }

  cleanUpProducts() {
    cy.authenticate().then((authentication) => {
      // Get items in basket
      cy.request({
        method: 'GET',
        url: `${Cypress.env('baseURL')}/rest/basket/${authentication.bid}`,
        headers: { Authorization: `Bearer ${authentication.token}` },
      }).should(({ status, body }) => {
        expect(status).to.equal(200);
        const { Products } = body.data;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < Products.length; i++) {
          // Delete item
          cy.request({
            method: 'DELETE',
            url: `${Cypress.env('baseURL')}/api/BasketItems/${Products[i].BasketItem.id}`,
            headers: { Authorization: `Bearer ${authentication.token}` },
            // eslint-disable-next-line no-shadow
          }).should(({ status, body }) => {
            expect(status).to.equal(200);
            expect(body.status).to.equal('success');
          });
        }
      });
    });
    return this;
  }
}

import { newAddress } from '../../support/element-store';

export default class AddressUtil {
  fillAddress(country, name, mobile, zip, address, city, state) {
    cy.clearAndType(newAddress.countryInput, country);
    cy.clearAndType(newAddress.nameInput, name);
    cy.clearAndType(newAddress.mobileInput, mobile);
    cy.clearAndType(newAddress.zipCodeInput, zip);
    cy.clearAndType(newAddress.addressInput, address);
    cy.clearAndType(newAddress.cityInput, city);
    cy.clearAndType(newAddress.stateInput, state);
    return this;
  }

  validateAddressInfo(name, address, city, state, zip, country) {
    // Validate address name
    cy.get('app-address mat-row').first().find('mat-cell').eq(1)
      .invoke('text')
      .should('contain', name);
    // Validate address detail
    cy.get('app-address mat-row').first().find('mat-cell').eq(2)
      .invoke('text')
      .should('include', `${address}, ${city}, ${state}, ${zip}`);
    // Validate country
    cy.get('app-address mat-row').first().find('mat-cell').eq(3)
      .invoke('text')
      .should('include', country);
    return this;
  }

  cleanupAddress() {
    cy.authenticate().then((authentication) => {
      // Get all address
      cy.request({
        method: 'GET',
        url: `${Cypress.env('baseURL')}/api/Addresss`,
        headers: { Authorization: `Bearer ${authentication.token}` },
      }).should(({ status, body }) => {
        expect(status).to.equal(200);
        const { data } = body;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < data.length; i++) {
          // Delete address
          cy.request({
            method: 'DELETE',
            url: `${Cypress.env('baseURL')}/api/Addresss/${data[i].id}`,
            headers: { Authorization: `Bearer ${authentication.token}` },
          }).then((response) => {
            expect(response).property('status').to.equal(200);
            expect(response.body.status).to.equal('success');
          });
        }
      });
    });
    return this;
  }
}

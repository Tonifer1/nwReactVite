/*it.only('Lisäys formi aukeaa ja lisäys toimii oikein', function () {
    // Tämä ajetaan, muut ohitetaan
});

Voidaan ajaa vain tiettyjä testejä käyttämällä 
it.only tai jättää testejä pois it.skip.
 */

describe('Customers-sivun testit', function () {

  beforeEach(function () {
    cy.login('teppo', 'testaaja'); // Kirjaudu
    cy.contains('Customers').click(); // Siirry Customers-sivulle
  });

  it('Lisäys formi aukeaa ja lisäys toimii oikein', function () {
    // Odota ja klikkaa "Show Add" -painiketta
    cy.contains('Show Add', { timeout: 10000 }).click();
  
    // Varmista, että lomake on näkyvissä
    cy.get('form#add-customer-form', { timeout: 5000 }).should('be.visible');
  
    // Täytä lomake
    cy.get('input[placeholder="ID with 5 capital letters"]').type('ABCDE');
    cy.get('input[placeholder="Company name"]').type('ATESTI');
    cy.get('input[placeholder="Contact name"]').type('TestConName');
    cy.get('input[placeholder="Contact title"]').type('TestCTitle');
    cy.get('input[placeholder="Country"]').type('TestCountry');
    cy.get('input[placeholder="Address"]').type('TestAddress');
    cy.get('input[placeholder="City"]').type('TestCity');
    cy.get('input[placeholder="Postal code"]').type('TestPCode');
    cy.get('input[placeholder="Phone"]').type('TestPhone');
    cy.get('input[placeholder="Fax"]').type('TestFax');
  
    // Lähetä lomake
    cy.get('input[type="submit"]').click();
    cy.wait(1000); // Anna tarpeeksi aikaa backendille ja käyttöliittymälle reagoida
  
    // Tarkista, että lisäys onnistui backendista
    cy.request('GET', 'https://localhost:7121/api/customers/ABCDE').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.companyName).to.eq('ATESTI');
    });
  
    // Tarkista käyttöliittymästä
    cy.contains('Lisätty new customer:ATESTI', { timeout: 10000 }).should('be.visible');
  });

  it('Customerin poistaminen onnistuu', function () {
    //  Siirrytään Customers-sivulle
    cy.contains('Customers').click();
  
    //  Päivitetään näkymä ja varmistetaan, että uusi asiakas näkyy
    cy.contains('Show Customers').click();
    cy.contains('ATESTI', { timeout: 5000 }).should('be.visible');
  
    //  Avaa asiakkaan yksityiskohdat
    cy.contains('ATESTI').parent().contains('Show Details').click();
  
    // Odota, että Delete-painike on näkyvissä ja klikkaa sitä
    cy.contains('Delete', { timeout: 5000 }).should('be.visible').click();
  
    // Käsitellään confirm-ikkuna
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Are you sure you want to delete customer ATESTI?');
      return true; // Hyväksytään
    });
  
    //  Varmista poiston onnistuminen
    cy.contains('Succesfully removed customer ATESTI', { timeout: 6000 }).should('be.visible');
    cy.contains('ATESTI').should('not.exist');
  });

})  


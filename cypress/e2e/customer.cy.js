describe('Customers-sivun testit', function () {

  beforeEach(function () {
    cy.login('teppo', 'testaaja');
    cy.contains('Customers').click(); // Siirry Customers-sivulle
  });

  it('Lisäys formi aukeaa ja lisäys toimii oikein', function () {
    // Odota ja klikkaa "Show Add" -painiketta
    cy.contains('Show Add', { timeout: 10000 }).click();

    // Varmista, että lomake on näkyvissä
    cy.get('form#add-customer-form', { timeout: 5000 }).should('be.visible');

    // Täytä lomake
    cy.get('input[placeholder="ID with 5 capital letters"]').type('TESTB');
    cy.get('input[placeholder="Company name"]').type('TestB');
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
    cy.wait(500); // Odota
    // Varmista, että lisäys onnistui
    cy.contains('Lisätty new customer:TestB', { timeout: 5000 }).should('be.visible');
  });



  // it('Kurssin poistaminen onnistuu', function () {
  //     cy.get('h4').last().children().click()
  //     cy.contains('Poisto tehty')
  //     cy.get('h4').last().should('not.contain', 'e2eTestikurssi')
  // })

});
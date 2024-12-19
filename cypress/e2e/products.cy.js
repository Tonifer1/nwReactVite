describe('Products-sivun testit', function () {
  beforeEach(function () {
     cy.login('teppo', 'testaaja');
   });



  it('Testaa Products-sivun testejä', function () {
    cy.contains('Products').click(); // Siirry Products-sivulle
  
    cy.contains('Show Add Product').click(); // Näytä lisäyslomake
  
    // Odota, että lomake näkyy
    cy.get('form#add-product-form', { timeout: 5000 }).should('be.visible');
  
    // Varmista, että viesti ei ole enää olemassa (jos se poistuu DOMista)
    //cy.contains('Welcome teppo').should('not.exist');
  
    // Piilota lisäyslomake
    cy.get('button').contains('Hide Add Product').click({ force: true });
  
    // Varmista, että lomake ei ole näkyvissä
    cy.get('form#add-product-form').should('not.exist');
  });
});

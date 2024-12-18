describe('nwReact Vite sovellus - Auth ja tuotteet', function () {

  it('Kirjautuu ja varmistaa, että Products-sivu toimii kirjautuneena', function () {
    // Avaa aloitussivu
    cy.visit('http://localhost:5173');
    cy.contains('Login').click(); // Siirry Login-sivulle

    // Täytä kirjautumislomake placeholderien avulla
    cy.get('input[placeholder="Username"]').type('teppo'); // Syötä käyttäjätunnus
    cy.get('input[placeholder="Password"]').type('testaaja'); // Syötä hashattu salasana
    cy.contains('login').click(); // Klikkaa login-painiketta

    // Tarkista, että kirjautuminen onnistui
    cy.url().should('not.include', '/login'); // URL ei saa olla enää /login
    cy.contains('Welcome teppo'); // Varmista, että käyttäjä on kirjautunut

    // Siirry Products-sivulle ja testaa sen toimintoja
    cy.contains('Products').click();
    cy.contains('Show Add Product').click();
    //cy.get('form#add-product-form').should('be.visible'); // Varmista, että forma näkyy
    cy.contains('Hide Add Product').click();
    
  });
});

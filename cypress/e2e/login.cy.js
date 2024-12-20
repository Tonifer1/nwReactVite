
describe('Kirjautumisen testit', function () {
  it('Näyttää virheilmoituksen väärillä tunnuksilla', function () {
    cy.visit('http://localhost:5173'); // Avaa sovellus
    cy.contains('Login').click(); // Siirry kirjautumissivulle

    // Syötä väärät tunnukset
    cy.get('input[placeholder="Username"]').type('vääräkäyttäjä');
    cy.get('input[placeholder="Password"]').type('vääräsalasana');
    cy.contains('login').click(); // Yritä kirjautua

    // Varmista, että virheilmoitus näkyy
    cy.contains('Wrong username or password').should('be.visible');
  });
});

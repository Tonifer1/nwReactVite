// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe('Products Page Tests', () => {
  it('opens the app', () => {
    cy.visit('http://localhost:5173'); // Korvaa osoitteella, jossa sovellus pyörii
  });
});

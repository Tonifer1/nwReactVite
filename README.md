# Cypress Testit
### End-to-End
Testatut toiminnot:

Login testi:

Virheellisillä tunnuksilla kirjautuminen epäonnistuu, ja käyttäjälle näytetään virheilmoitus.

Products-sivun testit:

Kirjautunut käyttäjä voi siirtyä Products-sivulle.
Käyttäjä voi avata ja sulkea tuotelisäyslomakkeen.
Lomakkeen avautuminen ja sulkeutuminen toimivat odotetusti.

Customers-sivun testit:

Käyttäjä voi avata lisäyslomakkeen ja täyttää sen tiedoilla.
Asiakkaan lisäys onnistuu, ja käyttäjä saa onnistumisviestin.
Käyttäjä voi päivittää sivunäkymän ja nähdä lisätyn asiakkaan.
Asiakkaan tiedot näkyvät oikein sivunäkymässä.
Käyttäjä voi poistaa asiakkaan onnistuneesti.
Poiston jälkeen käyttäjä näkee onnistumisviestin, eikä asiakas enää näy listauksessa.

### Komponenttitestaus - Vitest ja React Testing Library


Testatut toiminnot:

CustomerAdd-komponentti:
Komponentti renderöi kaikki lomakekentät oikein.
Käyttäjä voi täyttää lomakekentät ja lähettää lomakkeen.
Lomakekenttien arvot päivittyvät oikein käyttäjän syötteiden mukaisesti.
Lomake ei lähetä tietoja, jos pakollisia kenttiä ei ole täytetty.
Virheellisen syötteen tapauksessa lomake näyttää virheilmoituksia.







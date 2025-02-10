
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






# nwReactVite Front-End Application
nwReactVite is a React-based front-end application designed to interact seamlessly with an ASP.NET Core back-end. This project demonstrates practical implementation of RESTful API communication, user interface design, and state management using modern web technologies. The application focuses on CRUD operations and dynamic rendering of data fetched from the database.

# Key Features
Dynamic User Interface:

Responsive and visually appealing interface using a combination of Bootstrap's responsive components 
and custom CSS media queries for tailored adjustments.
Intuitive navigation between various sections, such as Customers, Products, and Users.
CRUD Operations:

Perform Create, Read, Update, and Delete operations efficiently.
Real-time updates to the UI after database transactions.
State Management:

Utilizes React hooks (useState and useEffect) for dynamic state handling.
Ensures consistent synchronization between the front-end and back-end.
Search and Filtering:

Search functionality for tables,  allowing users to filter data based on specific criteria.
Form Validation:

User-friendly forms with validation to ensure accurate data input.

# Integration with Back-End:

The application communicates with the ASP.NET Core back-end through RESTful APIs.
Secure operations are managed using authentication and token-based authorization.
Technologies Used
**Languages**: JavaScript (ES6), HTML, CSS
**Frameworks**: React.js, Bootstrap
**Libraries**: Axios, React Router, React-Bootstrap
**Environment**: Node.js, Vite (development and build tooling)
**Database**: SQL Server (connected via back-end API)
**Version Control**: Git and GitHub
**Purpose**
This project is a part of the coursework for the second-year Software Developer program. It showcases the practical application of front-end development skills and integration with a RESTful back-end. The project has been crafted as a learning exercise to enhance understanding of web application development, state management, and API integration.



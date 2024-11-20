import axios from 'axios';

//const baseUrl = 'https://localhost:7121/api/Authentication';
const baseUrl = 'https://northwindrestapi20241105134531.azurewebsites.net/api/Authentication';

//2.Funktio lähettää POST-pyynnön backend-palvelimelle osoitteeseen https://localhost:7121/api/authentication
//Backend palauttaa tokenin, jos tunnukset ovat oikein.
//JWT (JSON Web Token)sisältää tietoa käyttäjästä ja hänen käyttöoikeuksistaan. 

const authenticate = (userForAuth) => {
    return axios.post(baseUrl, userForAuth).then(response => response.data); // Palautetaan suoraan response.data
};

export default { authenticate };


import axios from 'axios';

//const baseUrl = 'https://localhost:7121/api/Authentication';
const baseUrl = 'https://northwindrestapi20241105134531.azurewebsites.net/api/Authentication';


const authenticate = (userForAuth) => {
    return axios.post(baseUrl, userForAuth).then(response => response.data); // Palautetaan suoraan response.data
};

export default { authenticate };


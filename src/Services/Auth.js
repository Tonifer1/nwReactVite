// import axios from 'axios';

// const baseUrl = 'https://localhost:7121/api/Authentication'; // Huomaa isolla alkava "Authentication"

// const authenticate = (userForAuth) => {
//     const request = axios.post(baseUrl, userForAuth);
//     return request.then(response => response.data); // Voit palauttaa `response` tai `response.data` tarpeen mukaan
// };

// export default { authenticate };

import axios from 'axios';

const baseUrl = 'https://localhost:7121/api/Authentication';

const authenticate = (userForAuth) => {
    return axios.post(baseUrl, userForAuth).then(response => response.data); // Palautetaan suoraan response.data
};

export default { authenticate };


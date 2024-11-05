import axios from "axios";

const baseUrl = 'https://localhost:7121/api/customers';
// const baseUrl = 'https://northwindrestapi20241105134531.azurewebsites.net/api/customers'

// Luodaan axios-olio
const api = axios.create({
    baseURL: baseUrl
});

//Tähän muuttujaan tallennetaan token, joka otetaan local storagesta.
let token = null;

//3.Token  Auth.authenticate funktiosta login.jsx tiedostosta
//Metodi jota kutsutaan aina ennen kuin tehdään pyyntö backendiin.
//Parametrina annetaan token joka otetaan local storagesta.
const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
    api.defaults.headers.common['Authorization'] = token; // Asetetaan oletusotsikko Headereihin
    console.log("Authorization header set in CustomerServ:", api.defaults.headers.common['Authorization']);
};


const getAll = () => {
    // Käytetään  api-oliota
    const request = api.get('/');
    return request.then(response => response.data);
};

const addNew = (object) => {
    const request = api.post('/', object);
    return request.then(response => response.data);
};

const remove = (id) => {
    return api.delete(`/${id}`);
};

const update = (object) => {
    return api.put(`/${object.customerId}`, object);
};

export default { getAll, addNew, remove, update, setToken };




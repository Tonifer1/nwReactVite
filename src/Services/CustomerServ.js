import axios from "axios";

const baseUrl = 'https://localhost:7121/api/customers';

// Luo axios-instanssi
const api = axios.create({
    baseURL: baseUrl
});

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
    api.defaults.headers.common['Authorization'] = token; // Asetetaan oletusotsikko
    console.log("Authorization header set in CustomerServ:", api.defaults.headers.common['Authorization']);
};


const getAll = () => {
    // Käytä nyt `api`-instanssia
    const request = api.get('/');
    return request.then(response => response.data);
};

const addNew = (object) => {
    // Käytä `api`-instanssia
    const request = api.post('/', object);
    return request.then(response => response.data);
};

const remove = (id) => {
    // Käytä `api`-instanssia
    return api.delete(`/${id}`);
};

const update = (object) => {
    // Käytä `api`-instanssia
    return api.put(`/${object.customerId}`, object);
};

export default { getAll, addNew, remove, update, setToken };



// // Tämä palvelu hoitaa HTTP-pyyntöjen tekemisen
// // Back-end palauttaa pyynnön vastauksen JSON-muodossa
// // Tämä ei ole React-komponentti vaan JavaScript-tiedosto.
// import axios from "axios"

// // Määritellään perus-URL, johon kaikki pyynnöt tehdään
// const baseUrl = 'https://localhost:7121/api/customers'

// //GET
// // Nimetön funktio, joka palauttaa pyynnön vastauksen. Ei parametreja.
// //data lähetetään CustomerList moduuliin CustomerList-komponenttiin.

// const api = axios.create({
//     baseURL: baseUrl
// });

// let token = null;

// const setToken = (newToken) => {
//     token = `Bearer ${newToken}`;
//     api.defaults.headers.common['Authorization'] = token; // Asetetaan oletusotsikko
// };

// const getAll = () => {
//     // Tehdään GET-pyyntö baseUrl-osoitteeseen. (axios).get itse keksitty nimi.
//     const request = axios.get(baseUrl)
//     // Palautetaan pyyntö ja käsitellään vastaus, jolloin saadaan (data) osio jossa on kaikki asiakkaat.
//     return request.then(response => response.data)
// }

// //CREATE Vaihe 4.
// // Nimetön funktio, jossa object on alias nimi customerille
// // Parametrina MIHIN osoitteeseen (baseUrl) pyyntö tehdään ja MITÄ dataa lähetetään
// // Tehdään POST-pyyntö baseUrl-osoitteeseen ja lähetetään mukana object-data
// // Eli minne lähetetään ja mitä lähetetään.

// const addNew = (object) => {
//     const request = axios.post(baseUrl, object)    
//     return request.then(response => response.data)
// }

// //Delete
// // Poistaa asiakkaan tietokannasta. Parametreina url ja id
// const remove = id => {
//     return axios.delete(`${baseUrl}/${id}`)
// }

// //Edit 
// const update = (object) => {
//     return axios.put(`${baseUrl}/${object.customerId}`, object)
// }

// // Exportataan  funktiot, jotta niitä voidaan käyttää muualla sovelluksessa
// export default { getAll, addNew, remove, update }
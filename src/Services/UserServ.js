
import axios from "axios"

// Määritellään perus-URL, johon kaikki pyynnöt tehdään
const baseUrl = 'https://localhost:7121/api/users'
//const baseUrl = 'https://northwindrestapi20241105134531.azurewebsites.net/api/users'

const api = axios.create({
    baseURL: baseUrl
});

//Tähän muuttujaan tallennetaan token, joka otetaan local storagesta.
let token = null

//3.Token  Auth.authenticate funktiosta login.jsx tiedostosta
//Metodi jota kutsutaan aina ennen kuin tehdään pyyntö backendiin.
//Parametrina annetaan token joka otetaan local storagesta.
const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
    api.defaults.headers.common['Authorization'] = token; // Asetetaan oletusotsikko
    console.log("Authorization header set to:", api.defaults.headers.common['Authorization']); // Varmistus
};



// const getAll = () => {

//     // const request = axios.get(baseUrl)
//     // return request.then(response => response.data)
//     console.log("Making getAll request with Authorization header:", api.defaults.headers.common['Authorization']); // Varmistus
//     return api.get('/').then(response => response.data)
// }

const getAll = () => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }
    console.log("UserServ: Making getAll request with Authorization header:", api.defaults.headers.common['Authorization']); // Varmistus
    return api.get('/').then(response => response.data);
};



const addNew = newUser => {
    // const request = axios.post(baseUrl, newUser)    
    // return request.then(response => response.data)
    return api.post('/', newUser).then(response => response.data)
}


const remove = id => {
    // return axios.delete(`${baseUrl}/${id}`)
    return api.delete(`/${id}`)
}

//Edit 
const update = (object) => {
    // return axios.put(`${baseUrl}/${object.userId}`, object)
    return api.put(`/${object.userId}`, object)
}


export default { getAll, addNew, remove, update , setToken };
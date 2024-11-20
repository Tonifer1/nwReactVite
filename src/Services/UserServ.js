
import axios from "axios"

// Määritellään perus-URL, johon kaikki pyynnöt tehdään
//const baseUrl = 'https://localhost:7121/api/users'
const baseUrl = 'https://northwindrestapi20241105134531.azurewebsites.net/api/users'

const api = axios.create({
    baseURL: baseUrl
});

//Tähän muuttujaan tallennetaan token, joka otetaan local storagesta.
let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
    api.defaults.headers.common['Authorization'] = token; // Asetetaan oletusotsikko
    console.log("Authorization header set to:", api.defaults.headers.common['Authorization']); // Varmistus
};



const getAll = () => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }
    console.log("UserServ: Making getAll request with Authorization header:", api.defaults.headers.common['Authorization']); // Varmistus
    return api.get('/').then(response => response.data);
};



const addNew = newUser => {
    return api.post('/', newUser).then(response => response.data)
}


const remove = id => {
    return api.delete(`/${id}`)
}

//Edit 
const update = (object) => {
    return api.put(`/${object.userId}`, object)
}


export default { getAll, addNew, remove, update , setToken };
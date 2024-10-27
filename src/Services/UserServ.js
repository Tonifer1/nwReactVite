// Tämä palvelu hoitaa HTTP-pyyntöjen tekemisen
// Back-end palauttaa pyynnön vastauksen JSON-muodossa
// Tämä ei ole React-komponentti vaan JavaScript-tiedosto.
import axios from "axios"

// Määritellään perus-URL, johon kaikki pyynnöt tehdään
const baseUrl = 'https://localhost:7121/api/users'

//GET
// Nimetön funktio, joka palauttaa pyynnön vastauksen. Ei parametreja.
//data lähetetään UserList moduuliin UserList-komponenttiin.

const getAll = () => {
    // Tehdään GET-pyyntö baseUrl-osoitteeseen. (axios).get itse keksitty nimi.
    const request = axios.get(baseUrl)
    // Palautetaan pyyntö ja käsitellään vastaus, jolloin saadaan (data) osio jossa on kaikki asiakkaat.
    return request.then(response => response.data)
}

//CREATE Vaihe 4.
// Nimetön funktio, jossa object on alias nimi customerille
// Parametrina MIHIN osoitteeseen (baseUrl) pyyntö tehdään ja MITÄ dataa lähetetään
// Tehdään POST-pyyntö baseUrl-osoitteeseen ja lähetetään mukana object-data
// Eli minne lähetetään ja mitä lähetetään.

const addNew = newUser => {
    const request = axios.post(baseUrl, newUser)    
    return request.then(response => response.data)
}

//Delete
// Poistaa asiakkaan tietokannasta. Parametreina url ja id
const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

//Edit 
const update = (object) => {
    return axios.put(`${baseUrl}/${object.UserId}`, object)
}

// Exportataan  funktiot, jotta niitä voidaan käyttää muualla sovelluksessa
export default { getAll, addNew, remove, update }
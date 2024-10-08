// Tämä palvelu hoitaa HTTP-pyyntöjen tekemisen
// Back-end palauttaa pyynnön vastauksen JSON-muodossa
// Tämä ei ole React-komponentti vaan JavaScript-tiedosto.
import axios from "axios"

// Määritellään perus-URL, johon kaikki pyynnöt tehdään
const baseUrl = 'https://localhost:7121/api/customers'

//GET
// Nimetön funktio, joka palauttaa pyynnön vastauksen. Ei parametreja.
//data lähetetään CustomerList moduuliin CustomerList-komponenttiin.

const getAll = () => {
    // Tehdään GET-pyyntö baseUrl-osoitteeseen. (axios).get itse keksitty nimi.
    const request = axios.get(baseUrl)
    // Palautetaan pyyntö ja käsitellään vastaus, jolloin saadaan (data) osio jossa on kaikki asiakkaat.
    return request.then(response => response.data)
}

//CREATE
// Nimetön funktio, jossa object on alias nimi customerille
// Parametrina mihin osoitteeseen (baseUrl) pyyntö tehdään ja mitä dataa lähetetään

//Vaihe 4.
const addNew = (object) => {
    // Tehdään POST-pyyntö baseUrl-osoitteeseen ja lähetetään mukana object-data
    // Eli minne lähetetään ja mitä lähetetään.
    const request = axios.post(baseUrl, object)
    // Palautetaan pyyntö ja käsitellään vastaus, jolloin saadaan data
    return request.then(response => response.data)
}

// Exportataan getAll ja addNew funktiot, jotta niitä voidaan käyttää muualla sovelluksessa
export default { getAll, addNew }
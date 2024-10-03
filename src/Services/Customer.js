//Tämä palvelu hoitaa http pyyntöjen tekemisen
//Back-end palautta pyynnön vastauksen json-muodossa
import axios from "axios"

const baseUrl = 'https://localhost:7121/api/customers'

//nimetön funktio, joka palauttaa pyynnön vastauksen
const getAll =  () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)

}

//Tässä on nimetön funktio jossa  object on alias nimi customerille
//Parametrina mihin osoitteeseen(baseUrl) pyyntö tehdään ja mitä dataa lähetetään
const addNew = (object) => {
    const request = axios.post(baseUrl, object)
    return request.then(response => response.data)
}
export default { getAll, addNew }
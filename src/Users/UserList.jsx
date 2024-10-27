// Tuodaan tyylitiedosto
import '../App.css'

// Tuodaan Reactin hookit useState ja useEffect
import { useState, useEffect } from 'react'

// Tuodaan UserService, joka sisältää asiakastietojen hakemiseen liittyvät funktiot
// Tässä on "ulkoistettu" asiakastietojen hakeminen Services/UserServ.js tiedostoon.
import UserService from '../Services/UserServ'

// Tuodaan User-komponentti (Funktion nimi), joka renderöi yhden userin tiedot
// import User from './user'

// Tuodaan CustomerAdd-komponentti (Funktion nimi), joka mahdollistaa uuden asiakkaan lisäämisen
// import UserAdd from './userAdd';

// import UserEdit from './userEdit'

// UserList-komponentti 
const UserList = ({setIsPositive, setMessage, setShowMessage,}) => {


//!#*****************************************Tilan määritys Hooks****************************************************

    // Määritellään tila eli state users, joka sisältää userslistan.Alempana tarkistetaan onko dataa renderöitäväksi.
    const [users, setUsers] = useState([])

    // Määritellään tila eli state lisäystila, joka määrittää näytetäänkö CustomerAdd vai ei.
    const [lisäystila, setLisäystila] = useState(false)

    const [muokkaustila, setMuokkaustila] = useState(false)

    const [muokattavaUser, setMuokattavaUser] = useState(false)

    const [search, setSearch] = useState('')

    const [reload, reloadNow] = useState(false) 

    //useEffect-hook, joka hakee heti asiakastiedot ohjelman käynnistyessä CustomerService:ltä komponentin latautuessa. Tässä tulee Axios käyttöön.
    //Axios osaa konvertoida JSON datan suoraan JavaScriptiksi.
    //getAll-funktio löytyy CustomerServ.js tiedostosta.

    useEffect(() => {
        UserService.getAll()
            .then(data =>  setUsers(data)) // Asetetaan haetut asiakastiedot users-tilaan.(data) tulee UserServ.js tiedostosta.
    }, [lisäystila, muokkaustila])//reload olisi tässä 

    //Hakukentän onChange tapahtumankäsittelijä. Parametrina event, joka edustaa input-kentän tapahtumaa. 
    const handleSearchInputChange = (event) => {        
        setSearch(event.target.value.toLowerCase())
    }
    
    // const editUser = (userprops) => {
    //     setMuokattavaUser(userprops)
    //     setMuokkaustila(true)
    // }

return (
    <>                
        <div>
            <h2>Users</h2>
            {!lisäystila && !muokkaustila &&
            <input placeholder="Search by last name" value={search} className="inputsearch"  onChange={handleSearchInputChange} />
            }
        </div>

        {/* <span className="nowrap">
        {(!lisäystila && !muokkaustila) && (
            <button className="nappi" style={{ cursor: 'pointer' }} onClick={() => setShow(!show)}>                        
                {show ? "Hide Customers" : "Show Customers"}</button>)}
        
        </span> */}

        {/* <span className="nowrap">
            <button className="nappi" style={{ cursor: 'pointer' }} onClick={() => setLisäystila(!lisäystila)}>      
                {lisäystila ? "Hide Add Customer" : "Show Add Customer"}
            </button>
        </span> */}

        {/* PROPSIT  kolmeen tiedostoon. --> customerAdd,customerEdit, customer */}
        {/* Renderöidään CustomerAdd-komponentti, kun lisäystila on true. Mahdollistaa uuden asiakaan lisäyksen */}

        {/* {lisäystila && ( <CustomerAdd setLisäystila= {setLisäystila} setCustomers={setCustomers}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>                  
        )}

        {muokkaustila && ( <CustomerEdit setMuokkaustila ={setMuokkaustila} 
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        muokattavaCustomer={muokattavaCustomer} setCustomers={setCustomers} />                    
        )} */}
    
    <table>
    <thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>                                
            <th>Acceslevel</th>
        </tr>
    </thead>
    <tbody>                                           
        {users && users.map(u => {
            const lowerCaseName = u.lastName.toLowerCase();
            if (lowerCaseName.indexOf(search) > -1) {
                return (
                    <tr key={u.userId}>
                        <td>{u.firstName}</td>
                        <td>{u.lastName}</td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>{u.acceslevelId}</td>
                    </tr>
                ); 
            } 
            return null;
        })}
    </tbody>
</table>   
    </>
)//return
    
}//UserList

// Exportataan UserList-komponentti, jotta sitä voidaan käyttää muualla sovelluksessa
export default UserList
// Tuodaan tyylitiedosto
import '../App.css'

// Tuodaan Reactin hookit useState ja useEffect
import { useState, useEffect } from 'react'

// Tuodaan UserService, joka sisältää asiakastietojen hakemiseen liittyvät funktiot
// Tässä on "ulkoistettu" asiakastietojen hakeminen Services/UserServ.js tiedostoon.
import UserService from '../Services/UserServ'

// Tuodaan User-komponentti (Funktion nimi), joka renderöi yhden userin tiedot
 import User from './user'

// Tuodaan CustomerAdd-komponentti (Funktion nimi), joka mahdollistaa uuden asiakkaan lisäämisen
 import UserAdd from './userAdd';

 import UserEdit from './userEdit'

// UserList-komponentti 
const UserList = ({setIsPositive, setMessage, setShowMessage,}) => {


//!#*****************************************Tilan määritys Hooks****************************************************

    // Määritellään tila eli STATE USER, joka sisältää userslistan.Alempana tarkistetaan onko dataa renderöitäväksi.

    const [users, setUsers] = useState([])
    // Määritellään tila eli state show, joka määrittää näytetäänkö userit vai ei.
    const [show, setShow] = useState(false)

    // Määritellään tila eli state lisäystila, joka määrittää näytetäänkö UserAdd vai ei.
    const [lisäystila, setLisäystila] = useState(false)

    const [muokkaustila, setMuokkaustila] = useState(false)

    const [muokattavaUser, setMuokattavaUser] = useState(false)

    const [search, setSearch] = useState('')
     
    //useEffect-hook, joka hakee heti Usertiedot ohjelman käynnistyessä UserService:ltä komponentin latautuessa. Tässä tulee Axios käyttöön.

    useEffect(() => {
        if (show) {
            UserService.getAll()
            .then(data =>{
             console.log("Fetched users:", data);    
                 setUsers(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setMessage('Access allowed only for Administrator.');
                setIsPositive(false);
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);
            });
        }//if
    }, [show, lisäystila,]);


    
    //Hakukentän onChange tapahtumankäsittelijä. Parametrina event, joka edustaa input-kentän tapahtumaa. 
    const handleSearchInputChange = (event) => {
        setShow(true)        
        setSearch(event.target.value.toLowerCase())
    }
    
    const editUser = (userprops) => {
        setMuokattavaUser(userprops)
        setMuokkaustila(true)
    }

return (
    <>                
        <div>
            <h2>UsersList</h2>
            {!lisäystila && !muokkaustila &&
            <input placeholder="Search by last name" value={search} className="inputsearch"  onChange={handleSearchInputChange} />
            }
        </div>

        <span className="nowrap">
            {(!lisäystila && !muokkaustila) && (
                <button className="nappi" style={{ cursor: 'pointer' }} onClick={() => setShow(!show)}>
                    {show ? "Hide UsersList" : "Show UsersList"}</button>)}
                
            <button className="nappi" style={{ cursor: 'pointer' }} onClick={() => setLisäystila(!lisäystila)}>      
                {lisäystila ? "Hide Add UserList" : "Show Add UserList"}
            </button>
        </span>

        {/* Renderöidään UserAdd-komponentti, kun lisäystila on true. Mahdollistaa uuden Userin lisäyksen */}

        {lisäystila && ( <UserAdd setLisäystila= {setLisäystila} setUsers={setUsers}
         setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>                  
        )}

        {muokkaustila && (<UserEdit setMuokkaustila={setMuokkaustila}
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
            muokattavaUser={muokattavaUser} setUsers={setUsers} />
        )}


        {/* Jos show on true näytetään userslista */}
        {(!lisäystila && !muokkaustila && show) && (
            users.map(u => {
                const lowerCaseName = u.lastName ? u.lastName.toLowerCase() : '';
                if (lowerCaseName.indexOf(search) > -1) {
                    return (
                        <User
                            key={u.userId || u.email || u.username}
                            userprops={u}
                            setUsers={setUsers}
                            setMessage={setMessage}
                            setIsPositive={setIsPositive}                            
                            setShowMessage={setShowMessage}
                            editUser={editUser}
                        />
                    );
                }
                return null;
            })
        )}



    
               
        </>
    )//return
    
}//UserList

export default UserList
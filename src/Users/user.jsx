import '../App.css'
import { useState } from 'react'
import UserService from '../Services/UserServ'
// Täällä käsitellään yksittäisen käyttäjän tiedot. Siksi nimi user.jsx yksikkömuodossa.
// Jokaisen userin yksittäiset tiedot renderöidään tässä komponentissa.
// Props on nimeltään userprops, jonka se saa CustomerList-komponentilta.
// Tämä tarkoittaa, että User-komponentti odottaa saavansa userprops-nimisen propsin, joka sisältää userin tiedot.
// Tässä User-komponentti ottaa vastaan propsit, jotka on määritelty { userprops }-parametrina.
// u on yksittäinen asiakasobjekti, joka on peräisin UserList users-taulukosta ja sisältää yhden userin tiedot.
// Parametri on määritelty UserList tiedostossa näin: userprops={u}. Kuitenkin tässä tiedostossa se on {userprops}.Eli hakasuluissa.

                  //Ikäänkuin import. Tulee (User)List  tiedostosta.
const User = ({ setUsers, userprops, setMessage, setIsPositive, setShowMessage, editUser }) => {

    // Komponentin tilan määritys
    const [showDetails, setShowDetails] = useState(false)

    const deleteUser = (userprops) => {
        let vastaus = window.confirm(`Delete user ${userprops.username}?`);
    
        if (vastaus === true) {
            UserService.remove(userprops.userId)
            .then(res => {
                if (res.status === 200 || res.status === 204) {
                    setMessage(`Successfully removed user ${userprops.username}`);
                    setIsPositive(true);
                    setShowMessage(true);
                    window.scrollBy(0, -10000);
                    setUsers(prevUsers => prevUsers.filter(u => u.userId !== userprops.userId));
                }
                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);

                })//then

                .catch(error => {
                    setMessage(`Error: ${error}`);
                    setIsPositive(false);
                    setShowMessage(true);
                    setTimeout(() => {
                    setShowMessage(false);
                    window.scrollBy(0, -10000);
                    }, 5000);
                });
        }//if
        else {
                
            console.log("Poisto peruttu konsolissa. Näkyykö? Else haara ");
            setMessage('Poisto peruttu onnistuneesti.')
                setIsPositive(true)
                setShowMessage(true)
                
                 window.scrollBy(0, -5000) // Scrollataan ylös jotta nähdään alert :)
        
                // Ilmoituksen piilotus
                setTimeout(() => {
                setShowMessage(false)},
                3000
                )
            }//else
    }//deleteUser
    
    

    return (
        < >
            {/* Näytetään yksittäisen userin nimi */}
            <h4>
                {userprops.username} 
            </h4>

            
            <button className="nappi" onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? "Hide Details" : "Show Details"}
            </button>

            {/* Jos showDetails on true, näytetään userin tiedot */}
            {showDetails && (
                <div>
                    <h3>{userprops.userName}</h3>
                    
                    <button onClick={() =>editUser(userprops)} style={{ marginRight: '10px' }}>Edit</button>
                    <button onClick={() =>deleteUser(userprops)}>Delete</button>
                    <table className= "table table-striped table-primary">
                        <thead>
                            <tr>
                                <th>Firstname</th>
                                <th>Last name</th>
                                <th>E-mail</th>
                                <th>Username</th>
                                <th>Accesslevel</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{userprops.firstName}</td>
                                <td>{userprops.lastName}</td>
                                <td>{userprops.email}</td>
                                <td>{userprops.username}</td>
                                <td>{userprops.acceslevelId}</td>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default User



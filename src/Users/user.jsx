import '../App.css'
import { useState } from 'react'
import UserServive from '../Services/UserServ'
// Täällä käsitellään yksittäisen käyttäjän tiedot. Siksi nimi user.jsx yksikkömuodossa.
// Jokaisen userin yksittäiset tiedot renderöidään tässä komponentissa.
// Props on nimeltään userprops, jonka se saa CustomerList-komponentilta.
// Tämä tarkoittaa, että User-komponentti odottaa saavansa userprops-nimisen propsin, joka sisältää userin tiedot.
// Tässä User-komponentti ottaa vastaan propsit, jotka on määritelty { userprops }-parametrina.
// u on yksittäinen asiakasobjekti, joka on peräisin UserList users-taulukosta ja sisältää yhden userin tiedot.
// Parametri on määritelty UserList tiedostossa näin: userprops={u}. Kuitenkin tässä tiedostossa se on {userprops}.Eli hakasuluissa.

                  //Ikäänkuin import. Tulee CustomerList  tiedostosta.
const User = ({ userprops,setUser, setIsPositive, setMessage, setShowMessage, editUser }) => {

    // Komponentin tilan määritys
    const [showDetails, setShowDetails] = useState(false)

    const deleteUser = (user) => {
        let vastaus = window.confirm(`Delete customer window.confirm osio ${user.userName}?`)

        if (vastaus === true) {
            UserServive.remove(user.userId)
                .then(res => {
                    if (res.status === 200) {
                        console.log("Poisto tehty: viesti näkyy? If lohko");
                        setMessage(`Succesfully removed user ${user.userName}`)
                        setIsPositive(true)
                        setShowMessage(true)
                        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
                        setUsers(prevUsers => 
                            prevUsers.filter(u => u.userId !== user.userId)
                        ); 
                    }//if

                    setTimeout(() => {
                    setShowMessage(false)
                    }, 3000)
                    
                })//then

            .catch(error => {
                setMessage(`Error: ${error}`)
                setIsPositive(false)
                setShowMessage(true)
                setTimeout(() => {
                setShowMessage(false)
                window.scrollBy(0, -10000)
                }, 5000)
            })
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
                }

               

        

    }//deleteUser

    return (
        <div className='customerDiv'>
            {/* Näytetään yksittäisen asiakkaan yrityksen nimi */}
            <h4>
                {userprops.username} 
            </h4>

            {/* Nappi, joka vaihtaa showDetails-tilan arvoa true/false. !showDetails vaihtaa käänteisesti järjestystä */}
            <button className="nappi" onClick={() => setShowDetails(!showDetails)}>
                
            {/* tämä ternäärinen operaattori tarkistaa showDetails-tilan arvon ja palauttaa 
            joko "Hide Details" tai "Show Details"
             sen mukaan, onko showDetails tosi vai epätosi.     */}
                {showDetails ? "Hide Details" : "Show Details"}
            </button>

            {/* Jos showDetails on true, näytetään userin tiedot */}
            {showDetails && (
                <div className="customerDetails">
                    <h3>{userprops.userName}</h3>
                    
                    <button onClick={() =>editUser(userprops)} style={{ marginRight: '10px' }}>Edit</button>
                    <button onClick={() =>deleteUser(userprops)}>Delete</button>
                    <table>
                        <thead>
                            <tr>
                                <th>First name</th>
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
        </div>
    )
}

export default User



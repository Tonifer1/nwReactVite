import '../App.css'
import React, { useState } from 'react'
import UserService from '../Services/UserServ'
import md5 from 'md5'

const UserAdd = ({ setLisäystila, setIsPositive, setUsers, setMessage, setShowMessage, }) => {

    //! ********************Tilan eli Staten määritys*************************************
    // Statet pitävät kirjaa sen hetken tilasta ja päivittävät sitä, joka kerta kun käyttäjä kirjoittaa jotain kenttään.
    // Esim Id kenttään kirjoitettaessa, kutsutaan setNewCustomerId funktiota(alla returnissa), joka päivittää tilan newCustomerId arvon.

    
    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastname] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newAcceslevelId, setNewAcceslevelId] = useState('')

    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    
    // 2.  Syötetyt tiedot kerätään ja luodaan uusi userobjekti(newUser), johon tiedot tallennetaan.
    //! ********************onSubmit tapahtumankäsittelijä funktio*****************************************************
    // event.preventDefault() estää lomakkeen lähettämisen yhteydessä kokokonaisen sivun uudelleen lataamisen.

    const handleSubmit = (event) => {
        event.preventDefault()
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
          }
        // Alla olevat kentät täytyy olla nimeltään samat kuin back-endissä olevat kentät. Huom! camelCase.
        var newUser = {
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
            acceslevelId:newAcceslevelId,
            username: newUsername,
            password: md5(newPassword)
        }//newUser

        
        console.log("newAcceslevelId ennen Userserviceä:", newAcceslevelId);

        UserService.addNew(newUser)
            .then(() => {
                console.log("Sending new user to backend:", newUser);
                setMessage(`Lisätty new user:${newUser.firstName} ${newUser.lastName}`)
                setIsPositive(true);
                setShowMessage(true);
                setUsers(prevUsers => [...prevUsers, newUser])
                console.log("Lisattu uusi luuseri Servicen sisällä:",)
                

                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);

                setLisäystila(false);
                
            })//then

            .catch(error => {
                console.error("Error adding new user:", error);
                setMessage('Adding only for Administrator.');
                setIsPositive(false);
                setShowMessage(true);
                setTimeout(() => {
                  setShowMessage(false);
                }, 3000);
              });
    
    }//handleSubmit

    //! ****************************return*************************************
    return (
        <div className="form-container">
            <h2>User add</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={newFirstName} placeholder="First name"
                        onChange={({ target }) => setNewFirstName (target.value)} required />
                </div>
                <div>
                    <input type="text" value={newLastName} placeholder="Last name"
                        onChange={({ target }) => setNewLastname (target.value)} required />
                </div>
                <div>
                    <input type="email" value={newEmail} placeholder="Email"
                        onChange={({ target }) => setNewEmail(target.value)} />
                </div>
                <div>
                    <input type="text" value={newAcceslevelId} placeholder="AcceslevelId"
                        onChange={({ target }) => setNewAcceslevelId(target.value)} />
                </div>
                <div>
                    <input type="text" value={newUsername} placeholder="Username"
                        onChange={({ target }) => setNewUsername(target.value)} />
                </div>
                <div>
                    <input type="password" value={newPassword} placeholder="Password"
                        onChange={({ target }) => setNewPassword(target.value)} required />
                </div>
                <div>
                    <input type="password" value={confirmPassword} placeholder="Confirm Password"
                        onChange={({ target }) => setConfirmPassword(target.value)} required />
                </div>
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

                <div style={{ marginTop: '20px' }}>
                    {/* 1. */}
                    {/* Tämä on submit-tyyppinen input-elementti, joka lähettää lomakkeen, kun sitä(save) klikataan */}

                    {/* Ohjelman suoritus siirtyy tästä ylhäällä olevaan handleSubmit-funktioon */}

                    <input type='submit' value='save' style={{ marginRight: '10px', width: '150px',color: 'black' }} />

                    {/* Tämä on tavallinen button-tyyppinen input-elementti, joka ei lähetä lomaketta */}
                    <input type='button' value='back' onClick={() => setLisäystila(false)} 
                     style={{ marginRight: '10px', width: '150px',color: 'black' }} />
                </div>
            </form>

        </div>

    )//return

}//UserAdd

export default UserAdd
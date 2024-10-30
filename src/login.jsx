import './App.css'
import React, { useState } from 'react'
import UserService from './Services/UserServ'
import md5 from 'md5'

const Login = ({ setIsPositive, setMessage, setShowMessage, setloggedIn }) => {

    //! ********************Tilan eli Staten määritys*************************************
    // Statet pitävät kirjaa sen hetken tilasta ja päivittävät sitä, joka kerta kun käyttäjä kirjoittaa jotain kenttään.
    // Esim Id kenttään kirjoitettaessa, kutsutaan setNewCustomerId funktiota(alla returnissa), joka päivittää tilan newCustomerId arvon.

    


    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    
    
    
    // 2.  Syötetyt tiedot kerätään ja luodaan uusi userobjekti(newUser), johon tiedot tallennetaan.
    //! ********************onSubmit tapahtumankäsittelijä funktio*****************************************************
    // event.preventDefault() estää lomakkeen lähettämisen yhteydessä kokokonaisen sivun uudelleen lataamisen.

    const handleSubmit = (event) => {
        event.preventDefault()
        // Alla olevat kentät täytyy olla nimeltään samat kuin back-endissä olevat kentät. Huom! camelCase.
        var user = {

            username: newUsername,
            password: md5(newPassword)
        }//newUser

        UserService.Login(user)
            .then(response => {
                
                setMessage(`Welcome ${response.username}`);
                setIsPositive(true);
                setShowMessage(true);
                
                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);
             localStorage.setItem('username', response.username);
            localStorage.setItem('acceslevelId', response.acceslevelId);
            localStorage.setItem('token', response.token);
            //Muutetaan App komponentin tilaa trueksi.   
            setloggedIn(true)

            })//then

            
            .catch(error => {
                console.error("failed to login:", error);
            });
    
    }//handleSubmit

    //! ****************************return*************************************
    return (
        <div id="addNew">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                
                <div>
                    <input type="text" value={newUsername} placeholder="Username"
                        onChange={({ target }) => setNewUsername(target.value)} />
                </div>
                <div>
                    <input type="password" value={newPassword} placeholder="Password"
                        onChange={({ target }) => setNewPassword(target.value)} />
                </div>
               

                <div style={{ marginTop: '20px' }}>
                    {/* 1. */}
                    {/* Tämä on submit-tyyppinen input-elementti, joka lähettää lomakkeen, kun sitä(save) klikataan */}

                    {/* Ohjelman suoritus siirtyy tästä ylhäällä olevaan handleSubmit-funktioon */}

                    <input type='submit' value='save' style={{ marginRight: '10px' }} />

                    {/* Tämä on tavallinen button-tyyppinen input-elementti, joka ei lähetä lomaketta */}
                    <input type='button' value='back' />
                </div>
            </form>

        </div>

    )//return

}//UserAdd

export default Login
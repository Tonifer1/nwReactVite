import './App.css'
import React, { useState } from 'react'
import UserService from './Services/UserServ'
import CustomerService from './Services/CustomerServ'; 
import Auth from './Services/Auth'
import md5 from 'md5'

const Login = ({ setIsPositive, setMessage, setShowMessage, setloggedIn }) => {

    //! ********************Tilan eli Staten määritys*************************************
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            username: newUsername,
            password: md5(newPassword)
        };

        // Kutsutaan Auth.authenticate eikä UserService.Login
        Auth.authenticate(user)
        .then(response => {
            localStorage.setItem('username', response.username);
            localStorage.setItem('accesslevelId', response.accesslevelId);
            localStorage.setItem('token', response.token); // Tallenna token ensin
            console.log('Token set to localStorage:', localStorage.getItem('token')); // Varmistus tulostuksen sijoittaminen nyt tähän
            UserService.setToken(response.token); // Tämä asettaa tokenin
            CustomerService.setToken(response.token); // Aseta token CustomerServille
            setMessage(`Welcome ${response.username}`);
            setIsPositive(true);
            setShowMessage(true);
    
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
            console.log('Muutetaan App komponentin tilaa trueksi.');
            setloggedIn(true);
        })
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

                    <input type='submit' value='login' style={{ marginRight: '10px' }} />

                    {/* Tämä on tavallinen button-tyyppinen input-elementti, joka ei lähetä lomaketta */}
                    <input type='button' value='back' />
                </div>
            </form>

        </div>

    )//return

}//Login

export default Login
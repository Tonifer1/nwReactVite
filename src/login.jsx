import './App.css'
import React, { useState } from 'react'
import UserService from './Services/UserServ'
import CustomerService from './Services/CustomerServ'; 
import Auth from './Services/Auth'
import md5 from 'md5'
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsPositive, setMessage, setShowMessage, setloggedIn, }) => {

    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
     

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // Siirtää käyttäjän takaisin edelliselle sivulle
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            username: newUsername,
            password: md5(newPassword)
        };

        Auth.authenticate(user)
        .then(response => {
            console.log("Authentication successful, response: (from login.jsx)", response);
            localStorage.setItem('username', response.username);
            localStorage.setItem('acceslevelId', response.acceslevelId);
            localStorage.setItem('token', response.token);
            console.log("Setting acceslevelId: (from login.jsx)", response.acceslevelId);
            console.log('Token set to localStorage: (from login.jsx)', localStorage.getItem('token')); // Varmistus tulostuksen sijoittaminen nyt tähän
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
             setMessage('Wrong username or password');
             setIsPositive(false);
             setShowMessage(true);
             console.error("failed to do login:", error);
             setTimeout(() => {
                setShowMessage(false);
                }, 3000);
            
        });
            
    

    }//handleSubmit
    
    return (
        <div className="login">
            <h1>Login</h1>
            <div className="form-container">
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
                        <input type='submit' value='login' className="nappi" style={{ marginRight: '10px' }} />
                        <input type='button' value='back' className="nappi" onClick={handleBack} />
                    </div>
                </form>
            </div>
        </div>

    )//return

}//Login

export default Login
//Täällä on funktionaalinen komponentti App, joka palauttaa divin, jonka sisäällä on html-elementtejä.
//Sivun alaosassa on exportattu App-komponentti, joka on käytössä main.jsx-tiedostossa.
//export pitää aina olla, jotta komponentti on käytettävissä muualla.

import './App.css'
import Laskuri from './Laskuri.jsx'
import Posts from './Posts.jsx'
import CustomerList from './Customers/CustomerList.jsx'
import UserList from './Users/UserList.jsx'
import {useState} from 'react'
import { useEffect } from 'react'
import Message from './Message.jsx'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'
import Login from './login.jsx'

//Määritellään / esitellään funktionaalinen "Äiti" komponentti App. Huom! Komponentit on aina oltava isolla alkukirjaimella!
//Nimetön funktio arvoltaan.
//Ei parametreja, joten sulut ovat tyhjät.
//ES 6 syntaksi: const App = () => {}
//Ehdolliset renderöinnit kannattaa tehdä yhden (main) return palautuksen sisällä, jos mahdollista ilman erillisiä if lohkoja.
//Reactin KOMPONENTEISSA  return osio on AINA pakollinen.Oltava vähintään NULL, jos ei ole muuta palautettavaa.

const App = () => {

   // App komponentin tila (state) muuttujat
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)
  const [loggedIn, setloggedIn] = useState(false)


useEffect(() => {
  if (localStorage.getItem('username') !== null) {
    setloggedIn(true);
  }
}, []);

const handleLogout = () => {
  localStorage.removeItem('username');
  setloggedIn(false);
  setMessage('Logged out successfully');
  setIsPositive(true);
  setShowMessage(true);
  setTimeout(() => {
    setShowMessage(false);
  }, 3000);
};


  return (
    <div className="App">
      <Router>        

        <Navbar className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
          <Nav className="me-auto">
          <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to={loggedIn ? '/customers' : '/login'}>
              Customers
            </Nav.Link>
            <Nav.Link as={Link} to='/posts'>Posts</Nav.Link>
            <Nav.Link as={Link} to='/users'>Users</Nav.Link>
            {loggedIn ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) 
            :
             (
                <Nav.Link as={Link} to='/login'>Login</Nav.Link>
            )}
            <Nav.Link as={Link} to='/laskuri'>Laskuri</Nav.Link>
          </Nav>        
        </Navbar>
          
          {/* <h2>Northwind Traders</h2> */}

            {showMessage && <Message message={message} isPositive={isPositive} />}

          <Routes>
                <Route path="/" element={<h1>Welcome to ReactApp</h1>} />

          <Route path="/customers" element={
            loggedIn ? (
              <CustomerList
                setMessage={setMessage}
                setIsPositive={setIsPositive}
                setShowMessage={setShowMessage}
              />
            ) 
            : 
            ( <Navigate to="/login" replace />)            
          } />

          <Route path="/users" element={
            loggedIn ? 
            (
              <UserList
                setMessage={setMessage}
                setIsPositive={setIsPositive}
                setShowMessage={setShowMessage}
              />
            ) 
            : 
            (<Navigate to="/login" replace />)
          }/>
          
                <Route path="/posts"
                element={ <Posts />} >
                </Route>

                <Route path="/laskuri"
                element={ <Laskuri />}>                  
                </Route>

                <Route path="/login" element={
                 !loggedIn ? 
                (
                  <Login setMessage={setMessage} setShowMessage={setShowMessage} 
                  setloggedIn={setloggedIn} setIsPositive={setIsPositive}/>
                )
                : 
                (<Navigate to="/" replace />)
                }/>
                
          </Routes>
         
      </Router>
          
      </div>
    
  )//return

}//App

//Tämä on importattu main.jsx-tiedostossa
export default App


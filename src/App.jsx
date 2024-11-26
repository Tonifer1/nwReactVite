import './App.css'
import CustomerList from './Customers/CustomerList.jsx'
import ProductList from './Products/ProductList.jsx'
import UserList from './Users/UserList.jsx'
import {useState} from 'react'
import { useEffect } from 'react'
import Message from './Message.jsx'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'
import Login from './login.jsx'

const App = () => {

   // App komponentin tila (state) muuttujat
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)
  const [loggedIn, setloggedIn] = useState(false)
  const [acceslevelId, setAcceslevelId] = useState(null);


    useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      const storedAcceslevelId = localStorage.getItem('acceslevelId');
      
      // Varmistetaan, että localStorage sisältää arvot
      console.log('Stored username: (from App.jsx)', storedUsername);
      console.log('Stored acceslevelId (from App.jsx):', storedAcceslevelId);
  
      if (storedUsername && storedAcceslevelId) {
        setloggedIn(true);
        setAcceslevelId(storedAcceslevelId); // Asetetaan acceslevelId tilaan
      }
      else {
        setloggedIn(false);
        setAcceslevelId(null);
      }

    }, [loggedIn, acceslevelId]); // Ajetaan vain kerran komponentin ladataessa




const handleLogout = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('acceslevelId');
  setloggedIn(false);
  setMessage('Logged out successfully');
  setIsPositive(true);
  setShowMessage(true);
  setTimeout(() => {
  setShowMessage(false);
  }, 3000);
};


  return (
    <div className="app">
      <Router>

        <Navbar className="navbar navbar-expand-lg" style={{ backgroundColor: '#343a40', color: 'white' }} data-bs-theme="dark">
          <Nav className="me-auto">
            
           <Nav.Link as={Link} to='/'>Home</Nav.Link>

            <Nav.Link as={Link} to='/customers'>
              Customers
            </Nav.Link>

            <Nav.Link as={Link} to= '/products'>
              Products
            </Nav.Link>
            
            {acceslevelId === "2" &&(
            <Nav.Link as={Link} to='/users'>
               Users
            </Nav.Link>)}

            {loggedIn ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) 
            :
             (
                <Nav.Link as={Link} to='/login'>Login</Nav.Link>
            )}
       
          </Nav>        
        </Navbar>
          
          {showMessage && <Message message={message} isPositive={isPositive} />}

          <Routes>
            <Route path="/" element={<h1>Northwind Traders</h1>} />

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

          <Route path="/products" element={
            loggedIn ? (
              <ProductList
                setMessage={setMessage}
                setIsPositive={setIsPositive}
                setShowMessage={setShowMessage}
              />
            )
              :
              (<Navigate to="/login" replace />)
          } />

          <Route path="/users" element={
            acceslevelId === "2" ? (
              <UserList
                setMessage={setMessage}
                setIsPositive={setIsPositive}
                setShowMessage={setShowMessage}
              />
            )
             : 
             (<Navigate to="/login" replace />
            )
          } />

                <Route path="/login" element={
                 !loggedIn ? 
                (
                  <Login setMessage={setMessage} setShowMessage={setShowMessage} 
                  setloggedIn={setloggedIn} setIsPositive={setIsPositive}  />
                )
                : 
                (<Navigate to="/" replace />)
                }/>
                
          </Routes>
        {/* <footer style={{ backgroundColor: '#343a40', color: 'white', padding: '0px 0', textAlign: 'center' }}>
          <p>Northwind Traders - All rights reserved &copy; 2024</p>       
        </footer> */}
         
      </Router>
               

    </div>    
    
  )//return

}//App

export default App


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
    <div className="app">
      <Router>

        <Navbar className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
          <Nav className="me-auto">
          <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to={loggedIn ? '/customers' : '/login'}>
              Customers
            </Nav.Link>
            <Nav.Link as={Link} to={loggedIn ? '/products' : '/login'}>
              Products
            </Nav.Link>
            
            <Nav.Link as={Link} to='/users'>Users</Nav.Link>
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
            <Route path="/" element={<h1>Northwind traders</h1>} />

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

export default App


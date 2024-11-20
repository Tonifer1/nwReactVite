
import '../App.css'
import { useState, useEffect } from 'react'
import CustomerService from '../Services/CustomerServ'
import Customer from './customer'
import CustomerAdd from './customerAdd';
import CustomerEdit from './customerEdit'
//import { withTheme } from 'styled-components';

const CustomerList = ({ setMessage, setIsPositive, setShowMessage,  }) => {
   
    const [customers, setCustomers] = useState([])    
    const [show, setShow] = useState(false)
    const [lisäystila, setLisäystila] = useState(false)
    const [muokkaustila, setMuokkaustila] = useState(false)
    const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)
    const [search, setSearch] = useState('')
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            CustomerService.setToken(token); // Asetetaan token jokaisessa latauksessa    
            CustomerService.getAll()
                .then(data => {
                    setCustomers(data); // Asetetaan haetut asiakastiedot customers-tilaan.
                })
                .catch(error => {
                    console.error("Failed to fetch customers:", error);
                    if (error.response && error.response.status === 401) {
                        alert("Session expired. Please log in again.");
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }
                });
        } else {
            window.location.href = '/login'; // Ohjaa käyttäjä kirjautumaan
        }
    },   [lisäystila, muokkaustila]) // useEffect;
    
    const handleSearchInputChange = (event) => {
        setShow(true)
        setSearch(event.target.value.toLowerCase())
    }
    
    const editCustomer = (customerprops) => {
        setMuokattavaCustomer(customerprops)
        setMuokkaustila(true)
    }

return (
           <div className='customerList'>                
                <div>
                    <h1>Customers</h1>
                    {!lisäystila && !muokkaustila &&
                    <input placeholder="Search by company" value={search} className="inputsearch"  onChange={handleSearchInputChange} />
                    }
                </div>
                    <span className="nowrap">
                    {(!lisäystila && !muokkaustila) && (
                        <button className="nappi" style={{ cursor: 'pointer' }} onClick={() => setShow(!show)}>                        
                            {show ? "Hide Customers" : "Show Customers"}</button>)}

                        <button className="nappi" style={{ cursor: 'pointer' }} onClick={() => setLisäystila(!lisäystila)}>      
                            {lisäystila ? "Hide Add" : "Show Add "}
                        </button>
                    </span>

                    {lisäystila && ( <CustomerAdd setLisäystila= {setLisäystila} setCustomers={setCustomers}
                    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>                  
                    )}

                    {muokkaustila && ( <CustomerEdit setMuokkaustila ={setMuokkaustila} 
                    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                    muokattavaCustomer={muokattavaCustomer}  />                    
                    )}

                {
                    (!lisäystila && !muokkaustila && show) && (
                        customers.map(cust => 
                        {
                            const lowerCaseName = cust.companyName.toLowerCase()
                            if (lowerCaseName.indexOf(search) > -1) {
                                return (
                                    <Customer key={cust.customerId} customerprops={cust} setCustomers={setCustomers}
                                        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} editCustomer={editCustomer} />
                                )//return

                            }//if

                            return null;

                        })//customers.map

                )}  
            </div>
        )//return
    
}//CustomerList
export default CustomerList
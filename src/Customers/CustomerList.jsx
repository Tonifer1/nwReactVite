// Tuodaan tyylitiedosto
import '../App.css'

// Tuodaan Reactin hookit useState ja useEffect
import { useState, useEffect } from 'react'

// Tuodaan CustomerService, joka sisältää asiakastietojen hakemiseen liittyvät funktiot
// Tässä on "ulkoistettu" asiakastietojen hakeminen Services/CustomerServ.js tiedostoon.
import CustomerService from '../Services/CustomerServ'

// Tuodaan Customer-komponentti (Funktion nimi), joka renderöi yhden asiakkaan tiedot
import Customer from './customer'

// Tuodaan CustomerAdd-komponentti (Funktion nimi), joka mahdollistaa uuden asiakkaan lisäämisen
import CustomerAdd from './customerAdd';

import CustomerEdit from './customerEdit'


// CustomerList-komponentti 
const CustomerList = ({ setMessage, setIsPositive, setShowMessage,  }) => {


//!#*****************************************Tilan määritys Hooks****************************************************

    // Määritellään tila eli state customers, joka sisältää asiakaslistan.Alempana tarkistetaan onko dataa renderöitäväksi.
    const [customers, setCustomers] = useState([])

    // Määritellään tila eli state show, joka määrittää näytetäänkö customers vai ei.
    const [show, setShow] = useState(false)

    // Määritellään tila eli state lisäystila, joka määrittää näytetäänkö CustomerAdd vai ei.
    const [lisäystila, setLisäystila] = useState(false)

    const [muokkaustila, setMuokkaustila] = useState(false)

    const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)

    const [search, setSearch] = useState('')
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            CustomerService.setToken(token); // Asetetaan token jokaisessa latauksessa
            console.log("Token asetettu, haetaan asiakkaat");
    
            CustomerService.getAll()
                .then(data => {
                    console.log("Customers data:", data);
                    setCustomers(data); // Asetetaan haetut asiakastiedot customers-tilaan.
                })
                .catch(error => {
                    console.error("Failed to fetch customers:", error);
                    if (error.response && error.response.status === 401) {
                        // Token saattaa olla vanhentunut
                        alert("Session expired. Please log in again.");
                        // Voit tässä tyhjentää tokenin ja ohjata käyttäjän kirjautumaan uudelleen
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }
                });
        } else {
            console.log("Token puuttuu, käyttäjä ohjataan kirjautumaan");
            window.location.href = '/login'; // Ohjaa käyttäjä kirjautumaan
        }
    },   [lisäystila, muokkaustila]) // useEffect;
    

    

    //Hakukentän onChange tapahtumankäsittelijä. Parametrina event, joka edustaa input-kentän tapahtumaa. 
    const handleSearchInputChange = (event) => {
        setShow(true)
        setSearch(event.target.value.toLowerCase())
    }
    
    const editCustomer = (customerprops) => {
        setMuokattavaCustomer(customerprops)
        setMuokkaustila(true)
    }

return (
           <>                
                <div>
                    <h2>CustomerList</h2>
                    {!lisäystila && !muokkaustila &&
                    <input placeholder="Search by company CList" value={search} className="inputsearch"  onChange={handleSearchInputChange} />
                    }
                </div>
                    <span className="nowrap">
                    {(!lisäystila && !muokkaustila) && (
                        <button className="nappi" style={{ cursor: 'pointer' }} onClick={() => setShow(!show)}>                        
                            {show ? "Hide CustList" : "Show CustList"}</button>)}

                        <button className="nappi" style={{ cursor: 'pointer' }} onClick={() => setLisäystila(!lisäystila)}>      
                            {lisäystila ? "Hide Add CustList" : "Show Add CustList"}
                        </button>
                    </span>

                                    {/* PROPSIT  kolmeen tiedostoon. --> customerAdd,customerEdit, customer */}
                    {/* Renderöidään CustomerAdd-komponentti, kun lisäystila on true. Mahdollistaa uuden asiakaan lisäyksen */}

                    {lisäystila && ( <CustomerAdd setLisäystila= {setLisäystila} setCustomers={setCustomers}
                    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>                  
                    )}

                    {muokkaustila && ( <CustomerEdit setMuokkaustila ={setMuokkaustila} 
                    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                    muokattavaCustomer={muokattavaCustomer}  />                    
                    )}

            
                    {/* Tässä kaksi && merkkiä tarkoittaa (ja) viimeinen && että mitä tehdään jos molemmat ovat tosia. */}
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
            </>
        )//return
    
}//CustomerList

// Exportataan CustomerList-komponentti, jotta sitä voidaan käyttää muualla sovelluksessa
export default CustomerList
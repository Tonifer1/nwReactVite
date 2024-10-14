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


const CustomerList = ({setIsPositive, setMessage, setShowMessage,}) => {


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

    const [reload, reloadNow] = useState(false) 

    

    //useEffect-hook, joka hakee asiakastiedot CustomerService:ltä komponentin latautuessa. Tässä tulee Axios käyttöön.
    //Axios osaa konvertoida JSON datan suoraan JavaScriptiksi.
    //getAll-funktio löytyy Customer.js tiedostosta.

    useEffect(() => {
        CustomerService.getAll()
            .then(data =>  setCustomers(data)) // Asetetaan haetut asiakastiedot customers-tilaan.(data) tulee CustomerServ.js tiedostosta.
    }, [lisäystila, muokkaustila])

    //Hakukentän onChange tapahtumankäsittelijä
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
            
                {/* Ensimmäinen span-elementti, joka sisältää tekstin "Show Customers" tai "Hide Customers" riippuen show-tilan arvosta */}
                {/* nowrap estää tekstin rivittymisen (eli estää sen katkeamisen useammalle riville käyttäjälle). */}
                {/* Näytetään "Hide Customers", jos show-tila on true, ja "Show Customers", jos show-tila on false */}
                <h2>Customers</h2>

                {!lisäystila && !muokkaustila &&
                <input placeholder="Search by company name" value={search} className="inputsearch" onChange={handleSearchInputChange} />
                }

                <span className="nowrap">
                {(!lisäystila && !muokkaustila) && (
                    <button className="nappi" style={{ cursor: 'pointer' }} onClick={() => setShow(!show)}>                        
                        {show ? "Hide Customers" : "Show Customers"}</button>)}
                </span>

                <span className="nowrap">
                    <button className="nappi" style={{ cursor: 'pointer' }} onClick={() => setLisäystila(!lisäystila)}>      
                        {lisäystila ? "Hide Add Customer" : "Show Add Customer"}
                    </button>
                </span>

                                {/* PROPSIT  kolmeen tiedostoon. --> customerAdd,customerEdit, customer */}
                {/* Renderöidään CustomerAdd-komponentti, kun lisäystila on true. Mahdollistaa uuden asiakaan lisäyksen */}

                {lisäystila && ( <CustomerAdd setLisäystila= {setLisäystila} setCustomers={setCustomers}
                 setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>                  
                )}

                {muokkaustila && ( <CustomerEdit setMuokkaustila ={setMuokkaustila} 
                 setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                  muokattavaCustomer={muokattavaCustomer} setCustomers={setCustomers} />                    
                )}


          
            {/* Jos show on true ja customers-tila ei ole tyhjä(eli data on saapunut), renderöidään asiakaslista */}
            {/* Kun listan kohteet muuttuvat, React käyttää key-propia tunnistaakseen, mitkä kohteet ovat muuttuneet,
             lisätty tai poistettu. Tämä auttaa Reactia optimoimaan uudelleenrenderöinnin ja parantaa sovelluksen suorituskykyä */}
             {/* Alla oleva customer (punaisella) on propsi joka lähetetään Customer-komponentille.Parametri on {cust}. */}
            
                                {/* PROPSIT 5 kpl Funktion nimiä ylhäällä ---> customer.jsx*/}
            {/* {show && customers && customers.map(cust => (
                <Customer key={cust.customerId} customerprops={cust} setCustomers={setCustomers}   
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} editCustomer={editCustomer} />
                 
            ))} */}
                {/* Tässä kaksi && merkkiä tarkoittaa (ja) viimeinen && että mitä tehdään jos molemmat ovat tosia. */}
            {(!lisäystila && !muokkaustila && show) && (
                customers.map(cust => {
                    const lowerCaseName = cust.companyName.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return (
                            <Customer key={cust.customerId} customerprops={cust} setCustomers={setCustomers}
                                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} editCustomer={editCustomer} />
                        )//return

                    }//if(lowerCaseName.indexOf(search) > -1)

                    return null;

                })//customers.map

            )}  
        </>
    )//return
    
}//CustomerList

// Exportataan CustomerList-komponentti, jotta sitä voidaan käyttää muualla sovelluksessa
export default CustomerList
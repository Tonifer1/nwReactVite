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

// CustomerList-komponentti, joka renderöi asiakaslistan ja mahdollistaa asiakkaiden näyttämisen/piilottamisen
const CustomerList = ({setIsPositive, setMessage, setShowMessage}) => {


//!#*****************************************Tilan määritys****************************************************

    // Määritellään tila eli state customers, joka sisältää asiakaslistan.Alempana tarkistetaan onko dataa renderöitäväksi.
    const [customers, setCustomers] = useState([])

    // Määritellään tila eli state show, joka määrittää näytetäänkö customers vai ei.
    const [show, setShow] = useState(false)

    // Määritellään tila eli state lisäystila, joka määrittää näytetäänkö CustomerAdd vai ei.
    const [lisäystila, setLisäystila] = useState(false)

    const [reload, reloadNow] = useState(false)

    

    //useEffect-hook, joka hakee asiakastiedot CustomerService:ltä komponentin latautuessa. Tässä tulee Axios käyttöön.
    //Axios osaa konvertoida JSON datan suoraan JavaScriptiksi.
    //getAll-funktio löytyy Customer.js tiedostosta.

    useEffect(() => {
        CustomerService.getAll()
            .then(data => setCustomers(data)) // Asetetaan haetut asiakastiedot customers-tilaan.(data) tulee CustomerServ.js tiedostosta.
    }, [lisäystila]) // Tyhjä riippuvuuslista tarkoittaa, että tämä ajetaan vain kerran, komponentin latautuessa

    return (
       <>
            <h4>
                {/* Ensimmäinen span-elementti, joka sisältää tekstin "Show Customers" tai "Hide Customers" riippuen show-tilan arvosta */}
                {/* nowrap estää tekstin rivittymisen (eli estää sen katkeamisen useammalle riville käyttäjälle). */}
                {/* Näytetään "Hide Customers", jos show-tila on true, ja "Show Customers", jos show-tila on false */}
                <h4>Customers</h4>

                <span className="nowrap">
                    <button className="nappi" style={{ cursor: 'pointer' }} onClick={() => setShow(!show)}>                        
                        {show ? "Hide Customers" : "Show Customers"}</button>
                </span>

                <span className="nowrap">
                    <button className="nappi" style={{ cursor: 'pointer' }} onClick={() => setLisäystila(!lisäystila)}>      
                        {lisäystila ? "Hide Add Customer" : "Show Add Customer"}
                    </button>
                </span>

                {/* Renderöidään CustomerAdd-komponentti, kun lisäystila on true. Mahdollistaa uuden asiakaan lisäyksen */}
                {lisäystila && <CustomerAdd setLisäystila= {setLisäystila}
                 setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>}
            </h4>


          
            {/* Jos show on true ja customers-tila ei ole tyhjä(eli data on saapunut), renderöidään asiakaslista */}
            {/* Kun listan kohteet muuttuvat, React käyttää key-propia tunnistaakseen, mitkä kohteet ovat muuttuneet,
             lisätty tai poistettu. Tämä auttaa Reactia optimoimaan uudelleenrenderöinnin ja parantaa sovelluksen suorituskykyä */}
             {/* Alla oleva customer (punaisella) on propsi joka lähetetään Customer-komponentille.Parametri on {cust}. */}
            
            {show && customers && customers.map(cust => (
                <Customer key={cust.customerId} customerprops={cust} reloadNow={reloadNow} reload={reload}  
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />
                 
            ))}
        </>
    )
}

// Exportataan CustomerList-komponentti, jotta sitä voidaan käyttää muualla sovelluksessa
export default CustomerList
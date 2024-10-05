// Tuodaan tyylitiedosto
import '../App.css'

// Tuodaan Reactin hookit useState ja useEffect
import { useState, useEffect } from 'react'

// Tuodaan CustomerService, joka sisältää asiakastietojen hakemiseen liittyvät funktiot
import CustomerService from '../Services/Customer'

// Tuodaan Customer-komponentti, joka renderöi yhden asiakkaan tiedot
import Customer from './customer'

// Tuodaan CustomerAdd-komponentti, joka mahdollistaa uuden asiakkaan lisäämisen
import CustomerAdd from './customerAdd';  

// CustomerList-komponentti, joka renderöi asiakaslistan ja mahdollistaa asiakkaiden näyttämisen/piilottamisen
function CustomerList() {
    // useEffect-hook, joka hakee asiakastiedot CustomerService:ltä komponentin latautuessa. Tässä tulee Axios käyttöön.
    //Axios osaa konvertoida JSON datan suoraan JavaScriptiksi.
    useEffect(() => {
        CustomerService.getAll()
            .then(data => setCustomers(data)) // Asetetaan haetut asiakastiedot customers-tilaan
    }, []) // Tyhjä riippuvuuslista tarkoittaa, että tämä ajetaan vain kerran, komponentin latautuessa

    // Määritellään tila eli state customers, joka sisältää asiakaslistan
    const [customers, setCustomers] = useState([])

    // Määritellään tila eli state show, joka määrittää näytetäänkö customers vai ei.
    const [show, setShow] = useState(false)

    return (
        <div>
            <h2>
                {/* Nappi, joka vaihtaa show-tilan arvoa true/false */}
                <button onClick={() => setShow(!show)}>
                    {show ? "Hide Customers" : "Show Customers"}
                </button>
            </h2>

            {/* Renderöidään CustomerAdd-komponentti, joka mahdollistaa uuden asiakkaan lisäämisen */}
            <CustomerAdd />

            {/* Jos show on true ja customers-tila ei ole tyhjä, renderöidään asiakaslista */}
            {show && customers && customers.map(cust => (
                <Customer key={cust.customerId} customer={cust} />
            ))}
        </div>
    )
}

// Exportataan CustomerList-komponentti, jotta sitä voidaan käyttää muualla sovelluksessa
export default CustomerList
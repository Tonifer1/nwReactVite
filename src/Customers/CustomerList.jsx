// Tuodaan tyylitiedosto
import '../App.css'

// Tuodaan Reactin hookit useState ja useEffect
import { useState, useEffect } from 'react'

// Tuodaan CustomerService, joka sisältää asiakastietojen hakemiseen liittyvät funktiot
// Tässä on "ulkoistettu" asiakastietojen hakeminen Services/CustomerServ.js tiedostoon.
import CustomerService from '../Services/CustomerServ'

// Tuodaan Customer-komponentti, joka renderöi yhden asiakkaan tiedot
import Customer from './customer'

// Tuodaan CustomerAdd-komponentti, joka mahdollistaa uuden asiakkaan lisäämisen
import CustomerAdd from './customerAdd';  

// CustomerList-komponentti, joka renderöi asiakaslistan ja mahdollistaa asiakkaiden näyttämisen/piilottamisen
function CustomerList() {

    // Määritellään tila eli state customers, joka sisältää asiakaslistan.Alempana tarkistetaan onko dataa renderöitäväksi.
    const [customers, setCustomers] = useState([])

    //EHDOLLINEN RENDERÖINTI. Määritellään tila eli state show, joka määrittää näytetäänkö customers vai ei.
    const [show, setShow] = useState(false)

    // useEffect-hook, joka hakee asiakastiedot CustomerService:ltä komponentin latautuessa. Tässä tulee Axios käyttöön.
    //Axios osaa konvertoida JSON datan suoraan JavaScriptiksi.
    //getAll-funktio löytyy Customer.js tiedostosta.

    useEffect(() => {
        CustomerService.getAll()
            .then(data => setCustomers(data)) // Asetetaan haetut asiakastiedot customers-tilaan.(data) tulee CustomerServ.js tiedostosta.
    }, []) // Tyhjä riippuvuuslista tarkoittaa, että tämä ajetaan vain kerran, komponentin latautuessa

    

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

            {/* Jos show on true ja customers-tila ei ole tyhjä(eli data on saapunut), renderöidään asiakaslista */}
            {/* Kun listan kohteet muuttuvat, React käyttää key-propia tunnistaakseen, mitkä kohteet ovat muuttuneet,
             lisätty tai poistettu. Tämä auttaa Reactia optimoimaan uudelleenrenderöinnin ja parantaa sovelluksen suorituskykyä */}
             {/* Alla oleva customer(punaisella) on propsi joka lähetetään Customer-komponentille.Parametri on {cust}. */}

            {show && customers && customers.map(cust => (
                <Customer key={cust.customerId} customer={cust} />
            ))}
        </div>
    )
}

// Exportataan CustomerList-komponentti, jotta sitä voidaan käyttää muualla sovelluksessa
export default CustomerList
import '../App.css'
import { useState } from 'react'
import CustomerService from '../Services/CustomerServ'

// Huom! Tässä komponentissa hoidetaan myös Delete-toiminto
/*Propsina saadaan customerprops(cust), joka sisältää yhden asiakkaan kaikki tiedot, setCustomers, setMessage, 
setIsPositive ja setShowMessage-funktiot, sekä editCustomer-funktion, joka sijaitsee CustomerList osiossa.
Tässä komponentissa hoidetaan myös Delete toiminto Axios kirjaston avulla Id:n perusteella
*/

const Customer = ({ customerprops,setCustomers, setMessage, setIsPositive, setShowMessage, editCustomer }) => {

    // Komponentin tilan määritys
    const [showDetails, setShowDetails] = useState(false)
    //(customer) parametri on itse nimetty tässä, ja se on sama kuin customerprops.
    //Kun painetaan buttonia delete alhaalla, niin se lähettää customerpropsin deleteCustomer-funktiolle ja käyttää nimeä customer.

    const deleteCustomer = (customer) => {
        let vastaus = window.confirm(`Delete customer window.confirm osio ${customer.companyName}?`)

            /* "vastaus" perustuu window.confirmin palauttamaan boolean arvoon:Ok=>true, Cancel=>false
            Kutsutaan axios kirjastosta CustomerServicen remove-funktiota, joka poistaa asiakkaan tietokannasta Id:n perusteella.
            Axios käyttää parametrina (id) nimitystä (johon customer.customerId lähetetään), 
            mutta nimellä ei ole muuta tekemistä tämän nimen kanssa.  
            (customer.customerId) on se miten se tietokannassa on oikeasti määritelty.
            Jos olisi esim (res.data), niin data sisältäisi back-endiltä saadun messagen, joka on koodattu metodiin esim. 
            return Ok ("Asiakas" + id + poistettiin"); */

        if (vastaus === true) {
            CustomerService.remove(customer.customerId)
                .then(res => {
                    if (res.status === 200) {
                        setMessage(`Succesfully removed customer ${customer.companyName}`)
                        setIsPositive(true)
                        setShowMessage(true)
                        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
                        setCustomers(prevCustomers => 
                            prevCustomers.filter(c => c.customerId !== customerprops.customerId)
                        ); 
                    }//if

                    setTimeout(() => {
                    setShowMessage(false)
                    }, 3000)
                    
                })//then

            .catch(error => {
                setMessage(`Error: ${error}`)
                setIsPositive(false)
                setShowMessage(true)
                setTimeout(() => {
                setShowMessage(false)
                window.scrollBy(0, -10000)
                }, 5000)
            })
        }//if               
            else {
                               
                setMessage('Poisto peruttu onnistuneesti.')
                    setIsPositive(true)
                    setShowMessage(true)
                    
                     window.scrollBy(0, -5000) 
            
                    // Ilmoituksen piilotus
                    setTimeout(() => {
                    setShowMessage(false)},
                    3000
                    )
                }//else

    }//deleteCustomer

      /*{customerprops} sisältää yhden asiakkaan kaikki tiedot, jotka on saatu loopista CustomerList-komponentista. 
          Alias nimi on  CustomerList-komponentin loopisssa (cust), joka on siis Propsin arvo.
          CSS määritykset ovat tablessa: className="table table-striped */

    return (
        <div>
            <h4>{customerprops.companyName}</h4>

                                            {/* Tässä (!showDetails) merkitsee käänteistä tilaa */}
            <button className="nappi" onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? "Hide Details" : "Show Details"}
            </button>
    
            {/* Jos showDetails on true, näytetään asiakkaan tiedot */}
            {showDetails && (
                <>
                    <h3>{customerprops.companyName}</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Contact name</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{customerprops.contactName}</td>
                                <td>{customerprops.phone}</td>
                                <td>{customerprops.address}</td>
                                <td>{customerprops.city}</td>
                                <td>{customerprops.country}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Vaihe1. onClick-tapahtumankäsittelijä kutsuu editCustomer(customerprops) -funktion, joka löytyy CustomerList.jsx-tiedostosta.
                            customerprops sisältää 1 valitun asiakkaan tiedot, jotka välitetään editCustomer-funktiolle CustomerListiin */}
                    <button onClick={() => editCustomer(customerprops)} style={{ marginRight: '10px' }}>Edit</button>

                    <button onClick={() => deleteCustomer(customerprops)}>Delete</button>
                </>
            )}
        </div>
    );
    
}

export default Customer



import '../App.css'
import { useState } from 'react'
import CustomerService from '../Services/CustomerServ'
// Täällä käsitellään yksittäisen asiakkaan tiedot. Siksi nimi customer.jsx yksikkömuodossa.
// Jokaisen asiakkaan yksittäiset tiedot renderöidään tässä komponentissa.
// Props on nimeltään customerprops, jonka se saa CustomerList-komponentilta.
// Tämä tarkoittaa, että Customer-komponentti odottaa saavansa customerprops-nimisen propsin, joka sisältää asiakkaan tiedot.
// Tässä Customer-komponentti ottaa vastaan propsit, jotka on määritelty { customerprops }-parametrina.
// cust on yksittäinen asiakasobjekti, joka on peräisin CustomerList customers-taulukosta ja sisältää yhden asiakkaan tiedot.
// Parametri on määritelty CustomerList tiedostossa näin: customerprops={cust}. Kuitenkin tässä tiedostossa se on {customerprops}.Eli hakasuluissa.

                  //Ikäänkuin import. Tulee CustomerList  tiedostosta.
const Customer = ({ customerprops,setCustomers, setMessage, setIsPositive, setShowMessage, editCustomer }) => {

    // Komponentin tilan määritys
    const [showDetails, setShowDetails] = useState(false)

    const deleteCustomer = (customer) => {
        let vastaus = window.confirm(`Delete customer window.confirm osio ${customer.companyName}?`)

        if (vastaus === true) {
            CustomerService.remove(customer.customerId)
                .then(res => {
                    if (res.status === 200) {
                        console.log("Poisto tehty customer: viesti näkyy? If lohko");
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
                
                console.log("Poisto peruttu konsolissa. Näkyykö? Else haara ");
                setMessage('Poisto peruttu onnistuneesti.')
                    setIsPositive(true)
                    setShowMessage(true)
                    
                     window.scrollBy(0, -5000) // Scrollataan ylös jotta nähdään alert :)
            
                    // Ilmoituksen piilotus
                    setTimeout(() => {
                    setShowMessage(false)},
                    3000
                    )
                }//else

    }//deleteCustomer

    return (
        <div className='customerDiv'>
            {/* Näytetään yksittäisen asiakkaan yrityksen nimi */}
            <h4>
                {customerprops.companyName} 
            </h4>

            {/* Nappi, joka vaihtaa showDetails-tilan arvoa true/false. !showDetails vaihtaa käänteisesti järjestystä */}
            <button className="nappi" onClick={() => setShowDetails(!showDetails)}>
                
            {/* tämä ternäärinen operaattori tarkistaa showDetails-tilan arvon ja palauttaa 
            joko "Hide Details" tai "Show Details"
             sen mukaan, onko showDetails tosi vai epätosi.     */}
                {showDetails ? "Hide Details cust" : "Show Details cust"}
            </button>

            {/* Jos showDetails on true, näytetään asiakkaan tiedot */}
            {showDetails && (
                <div className="customerDetails">
                    <h3>{customerprops.companyName}</h3>
                    
                    <button onClick={() =>editCustomer(customerprops)} style={{ marginRight: '10px' }}>Edit</button>
                    <button onClick={() =>deleteCustomer(customerprops)} >Delete</button>
                    <table>
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
                </div>
            )}
        </div>
    )
}

export default Customer



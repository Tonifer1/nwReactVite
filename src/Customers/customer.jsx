import '../App.css'
import { useState } from 'react'
// Täällä käsitellään yksittäisen asiakkaan tiedot. Siksi nimi customer.jsx yksikkömuodossa.
// Jokaisen asiakkaan yksittäiset tiedot renderöidään tässä komponentissa.
// Props on nimeltään customerprops, jonka se saa CustomerList-komponentilta.
// Tämä tarkoittaa, että Customer-komponentti odottaa saavansa customerprops-nimisen propsin, joka sisältää asiakkaan tiedot.
// Tässä Customer-komponentti ottaa vastaan propsit, jotka on määritelty { customerprops }-parametrina.
// cust on yksittäinen asiakasobjekti, joka on peräisin CustomerList customers-taulukosta ja sisältää yhden asiakkaan tiedot.
// Parametri on määritelty CustomerList tiedostossa näin: customerprops={cust}. Kuitenkin tässä tiedostossa se on {customerprops}.Eli hakasuluissa.

const Customer = ({ customerprops }) => {
    // Komponentin tilan määritys
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div className='customerDiv'>
            {/* Näytetään yksittäisen asiakkaan yrityksen nimi */}
            <h4>
                {customerprops.companyName}
            </h4>

            {/* Nappi, joka vaihtaa showDetails-tilan arvoa true/false */}
            <button onClick={() => setShowDetails(!showDetails)}>
                
            {/* tämä ternäärinen operaattori tarkistaa showDetails-tilan arvon ja palauttaa 
            joko "Hide Details" tai "Show Details"
             sen mukaan, onko showDetails tosi vai epätosi.     */}
                {showDetails ? "Hide Details" : "Show Details"}
            </button>

            {/* Jos showDetails on true, näytetään asiakkaan tiedot */}
            {showDetails && (
                <div className="customerDetails">
                    <h3>{customerprops.companyName}</h3>
                    <button>Edit</button>
                    <button>Delete</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Contact person</th>
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
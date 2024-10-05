import '../App.css'
import { useState } from 'react'

// props on nimeltään customer
const Customer = ({ customer }) => {
    // Komponentin tilan määritys
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div className='customerDiv'>
            {/* Näytetään asiakkaan yrityksen nimi */}
            <h4>
                {customer.companyName}
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
                    <h3>{customer.companyName}</h3>
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
                                <td>{customer.contactName}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.address}</td>
                                <td>{customer.city}</td>
                                <td>{customer.country}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Customer
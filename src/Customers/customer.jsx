import '../App.css'
import { useState } from 'react'
import CustomerService from '../Services/CustomerServ'

const Customer = ({ customerprops,setCustomers, setMessage, setIsPositive, setShowMessage, editCustomer }) => {

    // Komponentin tilan määritys
    const [showDetails, setShowDetails] = useState(false)

    const deleteCustomer = (customer) => {
        let vastaus = window.confirm(`Delete customer window.confirm osio ${customer.companyName}?`)

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

    return (
        <div>
            <h4>{customerprops.companyName}</h4>
    
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
                    <button onClick={() => editCustomer(customerprops)} style={{ marginRight: '10px' }}>Edit</button>
                    <button onClick={() => deleteCustomer(customerprops)}>Delete</button>
                </>
            )}
        </div>
    );
    
}

export default Customer



import '../App.css'
import { useState, useEffect } from 'react'
import CustomerService from '../Services/Customer'
import Customer from './customer' // Tuodaan Customer-komponentti
import CustomerAdd from './customerAdd';  // Muuta isolla alkukirjaimella

//Tämä on aina yhtä customeria vastaava komponentti, joka renderöi yhden asiakkaan tiedot.

function CustomerList() {
    useEffect(() => {
        CustomerService.getAll()
            .then(data => setCustomers(data)) // asetetaan stateen nimeltä customers
    }, [])

    // State
    const [customers, setCustomers] = useState([])
    const [show, setShow] = useState(false)

    return (
        <div>
            <h2>
                <button onClick={() => setShow(!show)}>
                    {show ? "Hide Customers" : "Show Customers"}
                </button>
            </h2>

            <CustomerAdd />
            {show && customers && customers.map(cust => (
                <Customer key={cust.customerId} customer={cust} />
            ))}
        </div>
    )
}

export default CustomerList
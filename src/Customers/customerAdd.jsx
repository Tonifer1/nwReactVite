import '../App.css'
import React, { useState } from 'react'
import CustomerService from '../Services/CustomerServ'

const CustomerAdd = ({ setLisäystila, setCustomers, setMessage, setIsPositive, setShowMessage, }) => {

    const [newCustomerId, setNewCustomerId] = useState('')
    const [newCompanyName, setNewCompanyName] = useState('')
    const [newContactName, setNewContactName] = useState('')
    const [newContactTitle, setNewContactTitle] = useState('')

    const [newCountry, setNewCountry] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newCity, setNewCity] = useState('')

    const [newPostalCode, setNewPostalCode] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newFax, setNewFax] = useState('')


    const handleSubmit = (event) => {
        event.preventDefault()
        var newCustomer = {
            customerId: newCustomerId.toUpperCase(), 
            companyName: newCompanyName,
            contactName: newContactName,
            contactTitle: newContactTitle,
            country: newCountry,
            address: newAddress,
            city: newCity,
            postalCode: newPostalCode,
            phone: newPhone,
            fax: newFax
        }

        CustomerService.addNew(newCustomer)
            .then(() => {
                setMessage(`Lisätty new customer:${newCustomer.companyName}`)
                setIsPositive(true);
                setShowMessage(true);
                setCustomers(prevCustomers => [...prevCustomers, newCustomer])                

                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);

                setLisäystila(false);
                
            })//then

            .catch(error => {
                console.error("Error to Add New Customer:", error);
            });
    
    }//handleSubmit

    return (
        <div id="addNew">
            <h2>From Customer add</h2>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" value={newCustomerId} placeholder="ID with 5 capital letters" maxLength="5" minLength="5"
                            onChange={({ target }) => setNewCustomerId(target.value)} required />
                    </div>
                    <div>
                        <input type="text" value={newCompanyName} placeholder="Company name"
                            onChange={({ target }) => setNewCompanyName(target.value)} required />
                    </div>
                    <div>
                        <input type="text" value={newContactName} placeholder="Contact name"
                            onChange={({ target }) => setNewContactName(target.value)} />
                    </div>
                    <div>
                        <input type="text" value={newContactTitle} placeholder="Contact title"
                            onChange={({ target }) => setNewContactTitle(target.value)} />
                    </div>
                    <div>
                        <input type="text" value={newCountry} placeholder="Country"
                            onChange={({ target }) => setNewCountry(target.value)} />
                    </div>
                    <div>
                        <input type="text" value={newAddress} placeholder="Address"
                            onChange={({ target }) => setNewAddress(target.value)} />
                    </div>
                    <div>
                        <input type="text" value={newCity} placeholder="City"
                            onChange={({ target }) => setNewCity(target.value)} />
                    </div>
                    <div>
                        <input type="text" value={newPostalCode} placeholder="Postal code"
                            onChange={({ target }) => setNewPostalCode(target.value)} />
                    </div>
                    <div>
                        <input type="text" value={newPhone} placeholder="Phone"
                            onChange={({ target }) => setNewPhone(target.value)} />
                    </div>
                    <div>
                        <input type="text" value={newFax} placeholder="Fax"
                            onChange={({ target }) => setNewFax(target.value)} />
                    </div>

                    <div className="nowrap" style={{ marginTop: '20px' }}>
                        <input type='submit' value='save' className="nappi" style={{ marginRight: '10px' }} />                      
                        <input type='button' value='back' className="nappi" onClick={() => setLisäystila(false)} />
                    </div>
                </form>
            </div>

        </div>

    )//return

}//CustomerAdd

export default CustomerAdd
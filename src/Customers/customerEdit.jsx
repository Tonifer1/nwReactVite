import '../App.css'
import React, { useState } from 'react'
import CustomerService from '../Services/CustomerServ'

//Funktion nimi. Huom! On oltava isolla alkukirjaimella
// setMuokkaustila ym. on propseja, jotka tulee CustomerList-komponentilta, jotta täältä päästään pois.

//Ikäänkuin import toiminto. Tulee CustomerList  tiedostosta.
const CustomerEdit= ({ setMuokkaustila, setCustomers, setIsPositive,  setMessage, setShowMessage, muokattavaCustomer }) => {

    //! ********************Tilan eli Staten määritys*************************************
    // Statet pitävät kirjaa sen hetken tilasta ja päivittävät sitä, joka kerta kun käyttäjä kirjoittaa jotain kenttään.
    // Esim Id kenttään kirjoitettaessa, kutsutaan setNewCustomerId funktiota(alla returnissa), joka päivittää tilan newCustomerId arvon.

    const [newCustomerId, setNewCustomerId] = useState(muokattavaCustomer.customerId)
    const [newCompanyName, setNewCompanyName] = useState(muokattavaCustomer.companyName)
    const [newContactName, setNewContactName] = useState(muokattavaCustomer.contactName)
    const [newContactTitle, setNewContactTitle] = useState(muokattavaCustomer.contactTitle)

    const [newCountry, setNewCountry] = useState(muokattavaCustomer.country)
    const [newAddress, setNewAddress] = useState(muokattavaCustomer.address)
    const [newCity, setNewCity] = useState('')

    const [newPostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode)
    const [newPhone, setNewPhone] = useState(muokattavaCustomer.phone)
    const [newFax, setNewFax] = useState(muokattavaCustomer.fax)

    
    // 2.  Syötetyt tiedot kerätään ja luodaan uusi asiakasobjekti(newCustomer), johon tiedot tallennetaan.
    //! ********************onSubmit tapahtumankäsittelijä funktio*****************************************************
    // event.preventDefault() estää lomakkeen lähettämisen yhteydessä kokokonaisen sivun uudelleen lataamisen.

    const handleSubmit = (event) => {
        // alert('Customer added')
        event.preventDefault()

        // Luodaan uusi asiakasobjekti lomakkeen tiedoista. new Customer on itse keksitty nimi.
        // Alla olevat kentät täytyy olla nimeltään samat kuin back-endissä olevat kentät. Huom! camelCase.
        var newCustomer = {
            customerId: newCustomerId, 
            companyName: newCompanyName,
            contactName: newContactName,
            contactTitle: newContactTitle,
            country: newCountry,
            address: newAddress,
            city: newCity,
            postalCode: newPostalCode,
            phone: newPhone,
            fax: newFax
        }//newCustomer

        CustomerService.update(newCustomer)
            .then(() => {
                setMessage(`Edited customer:${newCustomer.companyName}`)
                setIsPositive(true)
                setShowMessage(true);
                window.scrollBy(0, -10000)
                setCustomers(prevCustomers => [...prevCustomers, newCustomer])

                //reloadNow(!reload);Tämän poisto auttoi.

                setTimeout(() => {
                    console.log('setTimeout Osio')
                    setShowMessage(false);
                }, 3000);

                setMuokkaustila(false);
                
            })//then

            .catch(error => {
                console.error("Error to Update New Customer:", error);
            });
    }//handleSubmit


    //! ****************************return*************************************
    return (
        <div id="edit">
            <h2>Customer Edit</h2>

            <form onSubmit={handleSubmit} className="customer-edit-form">
                <div>
                    <label htmlFor="customerId">Customer ID</label>
                    <input type="text" id="customerId" value={newCustomerId} disabled />
                </div>
                <div>
                    <label htmlFor="companyName">Company Name</label>
                    <input
                        type="text"
                        id="companyName"
                        value={newCompanyName}
                        onChange={({ target }) => setNewCompanyName(target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="contactName">Contact Name</label>
                    <input
                        type="text"
                        id="contactName"
                        value={newContactName}                        
                        onChange={({ target }) => setNewContactName(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="contactTitle">Contact Title</label>
                    <input
                        type="text"
                        id="contactTitle"
                        value={newContactTitle}
                        onChange={({ target }) => setNewContactTitle(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        value={newCountry}
                        onChange={({ target }) => setNewCountry(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        value={newAddress}
                        onChange={({ target }) => setNewAddress(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        value={newCity}
                        onChange={({ target }) => setNewCity(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                        type="text"
                        id="postalCode"
                        value={newPostalCode}
                        onChange={({ target }) => setNewPostalCode(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        value={newPhone}
                        onChange={({ target }) => setNewPhone(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="fax">Fax</label>
                    <input
                        type="text"
                        id="fax"
                        value={newFax}
                        onChange={({ target }) => setNewFax(target.value)}
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    {/* 1. */}
                    {/* Tämä on submit-tyyppinen input-elementti, joka lähettää lomakkeen, kun sitä(save) klikataan */}

                    {/* Ohjelman suoritus siirtyy tästä ylhäällä olevaan handleSubmit-funktioon */}

                    <input type='submit' value='save' style={{ marginRight: '10px' }} />

                    {/* Tämä on tavallinen button-tyyppinen input-elementti, joka ei lähetä lomaketta */}
                    <input type='button' value='back' onClick={() => setMuokkaustila(false)} />
                </div>
            </form>

        </div>

    )//return

}//CustomerAdd

export default CustomerEdit
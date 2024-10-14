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

        //3.
        // Uusi asiakas (newCustomer) lähetetään back-endille kutsumalla CustomerService.addNew-funktiota -> (CustomerServ.js),    
        // joka tekee POST-pyynnön ja lähettää uuden asiakasobjektin.
        // Ottaa parametriksi uuden asiakkaan (newCustomer) ja palauttaa vastauksen eli (responsen).
        //5. Kun onnistunut vastaus on saatu, päivittyy asiakaslista suoraan ilman sivun uudelleenlatausta funktion avulla.

        // CustomerService.addNew(newCustomer)
        //     .then(response => {
        //         console.log("Vastaus:", response);
        //         if (response.status === 200) {
        //             setShowMessage(true)
        //             setMessage(`Lisätty new customer:${newCustomer.companyName}`)
        //             setIsPositive(true)
                    
        //             console.log("Näkyykö viesti lisäyksestä? ")
                    

        //             setTimeout(() => {
        //                 setShowMessage(false)
        //             }, 5000)

        //             setLisäystila(false)

                    
        //             setCustomers(prevCustomers => [...prevCustomers, newCustomer])
        //         }//if 


        //     })//.then
        //     .catch(error => {
        //         setMessage('Error in adding new customer')
        //         setIsPositive(false)
        //         setShowMessage(true)

        //         setTimeout(() => {
        //             setShowMessage(false)
        //         }, 5000)

        //     })//.catch


        CustomerService.update(newCustomer)
            .then(() => {
                alert('Customer then')
                setMessage(`Edited customer:${newCustomer.companyName}`)
                setIsPositive(true)
                setShowMessage(true);
                //window.scrollBy(0, -10000)
                setCustomers(prevCustomers => [...prevCustomers, newCustomer])

                //reloadNow(!reload);Tämän poisto auttoi.

                setTimeout(() => {
                    console.log('setTimeout Osio')
                    setShowMessage(false);
                }, 3000);

                setMuokkaustila(false);
                
            })//then

            .catch(error => {
                alert('Ei onnistu')
                console.error("Error to Update New Customer:", error);
            });
    
    



    }//handleSubmit


    //! ****************************return*************************************
    return (
        <div id="edit">
            <h2>Customer Edit</h2>

            {/* Lomake eli Form uuden asiakkaan lisäämistä varten */}
            {/* Normaalisti ei anneta Id kenttää käyttäjän täytettäväksi, mutta tässä annetaan, koska Id on string. */}
            {/* Tietokanta huolehtii id:n lisäämisestä juoksevalla numerolla */}
            {/* value viittaa tilaan, joka on määritelty yläpuolella.*/}
            {/*Eli alla {newCustomerId} = const [newCustomerId, setNewCustomerId] = useState('')  */}
            {/* onChange tapahtumankäsittelijä, joka päivittää tilaa, kun kenttään kirjoitetaan */}
            {/* required tarkoittaa, että kenttä on pakollinen ja se ei voi olla tyhjä */}
            {/* virheenkäsittely varten Id kenttä on pakollinen ja pituus 5 merkkiä: maxLength="5" minLength="5" */}


            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={newCustomerId} disabled />
                         
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
import '../App.css'
import React, {useState} from 'react'
import CustomerService from '../Services/CustomerServ'

//Funktion nimi. Huom! On oltava isolla alkukirjaimella
const CustomerAdd = () => {

// Komponentin tilan määritys

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


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
    alert('Customer added')
      event.preventDefault()

    // Luodaan uusi asiakasobjekti lomakkeen tiedoista
      var newCustomer = {
        customerId: newCustomerId.toUpperCase(), // Muutetaan ID isoiksi kirjaimiksi
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

    // Lähetetään uusi asiakas CustomerService:n kautta
    
    CustomerService.addNew(newCustomer)
    .then(response => {
      if (response.status === 200) {
       alert(response.data)
        window.location.reload()     
    }

      })
      .catch(error => {
        alert(error.message)
   
      })
    }


  return (
    <div id="addNew">
       <h2>Customer add</h2>

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
         
            <div style={{ marginTop: '20px' }}>
                {/* Tämä on submit-tyyppinen input-elementti, joka lähettää lomakkeen, kun sitä klikataan */}
                    <input type='submit' value='save' style={{ marginRight: '10px' }} />

                    {/* Tämä on tavallinen button-tyyppinen input-elementti, joka ei lähetä lomaketta */}
                    <input type='button' value='back' />
                </div>
       </form>

    </div>
  )

}

export default CustomerAdd
//Täällä on funktionaalinen komponentti App, joka palauttaa divin, jonka sisäällä on html-elementtejä.
//Sivun alaosassa on exportattu App-komponentti, joka on käytössä main.jsx-tiedostossa.
//export pitää aina olla, jotta komponentti on käytettävissä muualla.
//import React, { useState } from 'react'
import './App.css'
import Laskuri from './Laskuri.jsx'
import Viesti from './Viesti.jsx'
import Posts from './Posts.jsx'
import CustomerList from './Customers/CustomerList.jsx'
import {useState} from 'react'

// Määritellään / esitellään funktionaalinen komponentti App. Huom! Komponentit on aina oltava isolla alkukirjaimella!
const App = () => {
  
  // Määritellään huomio-funktio, joka näyttää alert-viestin
  const huomio = () => {
    alert('huomio!')
  }

  // Määritellään state 'showLaskuri' ja sen asettamiseen käytettävä funktio 'setShowLaskuri'
  // Alustetaan 'showLaskuri' arvolla false
  //State määrittää onko laskuri näkyvissä vai ei
  const [showLaskuri, setShowLaskuri] = useState(false)

  return (
    <div className="app">
      <h1>Hello from React</h1>
      <CustomerList />
      {/* <Posts />  */}

      {/* Jos 'showLaskuri' on true, näytetään Laskuri-komponentti */}
      {/* Läheteään huomio niminen props Laskuri komponentille, jonka sisältö on huomio funktion arvo */}
      {showLaskuri && <Laskuri huomio={huomio} />}

      {/* Jos 'showLaskuri' on true, näytetään button, joka (asettaa falsen) ja piilottaa Laskuri-komponentin */}
      {showLaskuri && <button onClick={() => setShowLaskuri(false)}>Piilota laskuri</button>}

      {/* Jos 'showLaskuri' on false, näytetään button, joka (asettaa truen) ja näyttää Laskuri-komponentin */}
      {!showLaskuri && <button onClick={() => setShowLaskuri(true)}>Näytä laskuri</button>}

      {/* Näytetään Viesti-komponentti, joka saa propsina tekstin "tervehdys app komponentista" */}
      <Viesti teksti=" app komponentista terve!" />
    </div>

  )
}

//Exportataan App-komponentti, jotta sitä voidaan käyttää muualla sovelluksessa import komennolla
//Tämä on importattu main.jsx-tiedostossa
export default App


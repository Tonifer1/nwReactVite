//Täällä on funktionaalinen komponentti App, joka palauttaa divin, jonka sisäällä on html-elementtejä.
//Sivun alaosassa on exportattu App-komponentti, joka on käytössä main.jsx-tiedostossa.
//export pitää aina olla, jotta komponentti on käytettävissä muualla.
import React, { useState } from 'react'
import './App.css'
import Laskuri from './Laskuri.jsx'
import Viesti from './Viesti.jsx'

// Määritellään funktionaalinen komponentti App
const App = () => {
  const [x, setx] = useState("")

  // Määritellään state 'showLaskuri' ja sen asettamiseen käytettävä funktio 'setShowLaskuri'
  // Alustetaan 'showLaskuri' arvolla false
  const [showLaskuri, setShowLaskuri] = useState(false)

  return (
     <div className="app">
      <h1>Hello from React</h1>
      {/* Jos 'showLaskuri' on true, näytetään Laskuri-komponentti */}
      {showLaskuri && <Laskuri />}

      {/* Jos 'showLaskuri' on true, näytetään nappi, joka piilottaa Laskuri-komponentin */}
      {showLaskuri && <button onClick={() => setShowLaskuri(false)}>Piilota laskuri</button>}

      {/* Jos 'showLaskuri' on false, näytetään nappi, joka näyttää Laskuri-komponentin */} 
      {!showLaskuri && <button onClick={() => setShowLaskuri(true)}>Näytä laskuri</button>}

      <Viesti teksti="tervehdys app komponentista" />       
    </div>
      
  )
}

export default App


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
import Message from './Message.jsx'
//
//Määritellään / esitellään funktionaalinen "Äiti" komponentti App. Huom! Komponentit on aina oltava isolla alkukirjaimella!
//Nimetön funktio arvoltaan.
//Ei parametreja, joten sulut ovat tyhjät.
//ES 6 syntaksi: const App = () => {}
//Ehdolliset renderöinnit kannattaa tehdä yhden (main) return palautuksen sisällä, jos mahdollista ilman erillisiä if lohkoja.
//Reactin KOMPONENTEISSA  return osio on AINA pakollinen.Oltava vähintään NULL, jos ei ole muuta palautettavaa.

const App = () => {

  // App komponentin tila 
  const [showLaskuri, setShowLaskuri] = useState(false)
  

  // Statet messagen näyttämistä varten 
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)



  const huomio = () => {
    alert('huomio!')
  }



  // Määritellään state 'showLaskuri' ja sen asettamiseen käytettävä funktio 'setShowLaskuri'
  // Alustetaan 'showLaskuri' arvolla false
  //State määrittää onko laskuri näkyvissä vai ei
  //Tämä on ehdollinen renderöinti, jossa näytetään Laskuri-komponentti vain, jos 'showLaskuri' on true

  return (
    <div className="app">
      <h1>React</h1>
                          {/*PROPSIT 5 paikkaan --> CustomerList, Message, Posts,  Laskuri, Viesti */}
                          { showMessage && <Message message={message} isPositive={isPositive} /> }
     
      <CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />

      

      {/* <Posts />  */}

      {/* Jos 'showLaskuri' on true, näytetään Laskuri-komponentti */}
      {/* Läheteään huomio niminen props Laskuri komponentille, jonka sisältö on huomio funktion arvo */}
      {/* {showLaskuri && <Laskuri huomio={huomio} attention={attention} />} */}

      {/* Jos 'showLaskuri' on true, näytetään button, joka (asettaa falsen) ja piilottaa Laskuri-komponentin */}
      {/* {showLaskuri && <button onClick={() => setShowLaskuri(false)}>Piilota laskuri</button>} */}

      {/* Jos 'showLaskuri' on false, näytetään button, joka (asettaa truen) ja näyttää Laskuri-komponentin */}
      {/* {!showLaskuri && <button onClick={() => setShowLaskuri(true)}>Näytä laskuri</button>} */}

      {/* Näytetään Viesti-komponentti, joka saa propsina(sisältönä) tekstin "tervehdys app komponentista" */}
      {/* <Viesti teksti=" Viesti.jsx-> app komponentista terve!" teksti2="Toinen Viesti" /> */}
      
    </div>

  )
}

//Exportataan App-komponentti, jotta sitä voidaan käyttää muualla sovelluksessa import komennolla
//Tämä on importattu main.jsx-tiedostossa
export default App


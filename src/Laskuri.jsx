//Täällä on funktionaalinen komponentti Laskuri, joka palauttaa buttonin, + merkin ja luvun.
//Sivun alaosassa on exportattu Laskuri-komponentti.
//export pitää aina olla, jotta komponentti on käytettävissä muualla.
//Jos ei halua tehdä div määritystä voi käyttää tyhjää tagia <></>
//Tuodaan React ja useState hook käyttöön
//Staten päivitys muuttaa vain sen osan, joka on muuttunut.
//Lisää ehdollinen lause myöhemmin!!!
import React, { useState } from 'react'
import './App.css'

// Määritellään funktionaalinen komponentti Laskuri
//Props {huomio} otetaan  vastaan App.jsx tiedostosta suoraan nimellä {huomio}
// Määritellään state (muuttuja) 'luku' ja sen asettamiseen käytettävä funktio 'setLuku'
// Jos tila muuttuu, koko komponentti renderöidään uudelleen, 
//mutta React päivittää vain muuttuneet osat (esim. tässä h3-elementin sisältö{luku}).
const Laskuri = ({huomio, attention}) => {
    

    // Alustetaan staten nimi eli 'luku'  arvolla 0. Käytetään reactin hookia useState
    const [luku, setLuku] = useState(0)

    // Palautetaan JSX muotoista dataa, joka sisältää otsikon ja napin. {Jsx} on Reactin tapa kirjoittaa html-koodia JavaScriptissä.
    return (
        <>
        {/* Näytetään nykyinen 'luku' h3-elementissä */}
            <h3>{luku}</h3>
            {/* Nappi, joka kasvattaa 'luku' arvoa yhdellä klikkauksella */}
            <button onClick={() => setLuku(luku + 1)}>+</button>
            <button onClick={() => setLuku(luku - 1)}>-</button>
            <button onClick={() => setLuku(luku - luku)}>Reset</button>

            {/* Props joka tulee App.jsx tiedostosta {huomio nimellä} */}
            <button onClick={huomio}>huomio</button>
            <button onClick={attention}>attention</button>
        </>

    )
}
// Exportataan Laskuri-komponentti, jotta se voidaan käyttää muualla sovelluksessa
export default Laskuri
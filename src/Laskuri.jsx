//Täällä on funktionaalinen komponentti Laskuri, joka palauttaa buttonin, + merkin ja luvun.
//Sivun alaosassa on exportattu Laskuri-komponentti.
//export pitää aina olla, jotta komponentti on käytettävissä muualla.
//Jos ei halua tehdä div määritystä voi käyttää tyhjää tagia <></>
//Tuodaan React ja useState hook käyttöön
//Staten päivitys muuttaa vain sen osan, joka on muuttunut.
//Lisää ehdollinen lause myöhemmin!
import React, { useState } from 'react'
import './App.css'

// Määritellään funktionaalinen komponentti Laskuri
//Props otettu vastaan suoraan {huomio} nimellä
const Laskuri = ({huomio}) => {
    // Määritellään state 'luku' ja sen asettamiseen käytettävä funktio 'setLuku'
    // Alustetaan 'luku' arvolla 0
    const [luku, setLuku] = useState(0)

    // Palautetaan JSX, joka sisältää otsikon ja napin
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
        </>

    )
}
// Exportataan Laskuri-komponentti, jotta se voidaan käyttää muualla sovelluksessa
export default Laskuri
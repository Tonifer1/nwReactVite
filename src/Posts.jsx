// Kun state muuttuu tässä komponentissa, se näyttää statea vastaavan datan ja aiheuttaa renderöinnin.
// Tyhjään [] jos laittaisi tässä posts, niin se aiheuttaisi loputtoman silmukan.
// 2. parametri on tyhjä taulukko, joka tarkoittaa, että useEffect suoritetaan vain kerran.
// useEffect kutsutaan aina automaattisesti aina alussa
// 2. parametri on tyhjä taulukko: jos sinne laittaa statejen nimiä, niiden muuttuessa useEffect suoritetaan uudelleen.

import './App.css'
// Tuodaan Reactin hookit useState ja useEffect
import { useState, useEffect } from 'react'

const Posts = () => {
    // Määritellään tila posts, joka sisältää postaukset (jsoliot)
    const [posts, setPosts] = useState([]) // Määrittelee aluksi posts-tilan tyhjäksi taulukoksi[]

    // EHDOLLINEN RENDERÖINTI. Määritellään tila show, joka määrittää näytetäänkö postaukset vai ei. 
    const [show, setShow] = useState(false)

    // useEffect-hook, joka hakee postaukset API:sta komponentin latautuessa
    //Ei parametreja, joten tämä ajetaan vain kerran, komponentin latautuessa

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json()) // Muutetaan JSON-data JavaScript muotoon.(Taulukollinen olioita)
            .then(jsoliot => setPosts(jsoliot)) // Asetetaan haetut postaukset posts-tilaan,eli lähetetään jsoliot setPosts-funktiolle
    }, []) // Tyhjä riippuvuuslista tarkoittaa, että tämä ajetaan vain kerran, komponentin latautuessa

    return (
        <>
            <h2>Posts From Typicode</h2>
            {/* Button, joka vaihtaa show-tilan arvoa true/false */}
            <button onClick={() => setShow(!show)}>{show ? "Hide Posts" : "Show Posts"}</button>
            {
                // Jos show on true ja posts-tila ei ole tyhjä(posts && tarkistaa tilan), renderöidään postaukset
                //posts.map on paras tapa käydä läpi taulukko ja renderöidä sen sisältö. eli .map() funktio.
                //Huom! Json datassa on aina yhdys-sana eli camelCasea käytetään, kuten tässä userId. Eli p.userId taulukossa.
                //Käytettävä classNamea. Ei saa olla id, koska tässä on looppi.
                show && posts && posts.map(p =>
                    <div className='post' key={p.id}>
                        <h3>UserId: {p.userId}</h3>
                        <h3>{p.title}</h3>
                        <p>{p.body}</p>
                    </div>
                )
            }
        </>
    )
}

// Exportataan Posts-komponentti, jotta se voidaan käyttää muualla sovelluksessa
export default Posts
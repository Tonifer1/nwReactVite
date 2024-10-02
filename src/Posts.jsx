//Kun state muuttuu tässä komponentissa, se näyttää statea vastaavan datan ja aiheuttaa renderöinnin.
//Tyhjään [] jos laittaisi tässä posts, niin se aiheuttaisi loputtoman silmukan.
//2. parametri on tyhjä taulukko, joka tarkoittaa, että useEffect suoritetaan vain kerran.
//use effect kutsutaan aina automaattisesti aina alussa
//2. parametri on tyhjä taulukko:jos sinne laittaa statejen nimiä, niiden 


import './App.css'
import React, { useState, useEffect } from 'react'

const Posts = () => {

    const [posts, setPosts] = useState([])
    const [show, setShow] = useState(false)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json()) // Muutetaan json data javascript-olioksi
            .then(oliot => setPosts(oliot))
    }, [])

    return (
        <>
            <h2>Posts</h2>
            <button onClick={() => setShow(!show)}>{show ? "Hide Posts" : "Show Posts"}</button>
            {
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

// Exportataan Posts -komponentti, jotta se voidaan käyttää muualla sovelluksessa
export default Posts
import './App.css'
import React, { useState, useEffect } from 'react'

const Posts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json()) // Muutetaan json data javascript-olioksi
            .then(oliot => setPosts(oliot))
    }, [])

    return (
        <>
            <h2>Posts from typicode</h2>
            {
                posts && posts.map(p =>
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
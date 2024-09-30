//Täällä on funktionaalinen komponentti App, joka palauttaa divin, jonka sisäällä on html-elementtejä.
//Sivun alaosassa on exportattu App-komponentti, joka on käytössä main.jsx-tiedostossa.
//export pitää aina olla, jotta komponentti on käytettävissä muualla.
import { useState } from 'react'
import './App.css'

const App =()=> {
  const [count, setCount] = useState(0)

  return (
     <div className="app">
      <h1>Hello from React</h1>        
    </div>
      
  )
}

export default App

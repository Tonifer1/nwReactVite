// Tänne ei tarvitse  yleensä tehdä muutoksia, eikä tänne koodata mitään.
//Tänne on importattu(istutettu) App-komponentti. Vrt import Using dot.Netissä
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    
  </StrictMode>,
)

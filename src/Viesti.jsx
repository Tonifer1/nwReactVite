
import './App.css'

// Määritellään funktionaalinen komponentti Viesti
//Tekstin sisältö määritellään App.jsx tiedostossa <Viesti teksti="tervehdys app komponentista" /> 
const Viesti = ({teksti}) => {

    // Palautetaan JSX,
    return (
        <>
            <p>{teksti}</p>
            
        </>

    )
}
// Exportataan Viesti-komponentti, jotta sitä voidaan käyttää muualla sovelluksessa
export default Viesti 
import './App.css'
//message props {message} sisältää itse viestin sisällön  ja isPositive onko viesti positiivinen vai negatiivinen (boolean). 
//classNamessa viitataan muuttujaan {tyyli}, joka saa arvokseen pos tai neg riippuen siitä onko viesti positiivinen vai negatiivinen.
//Props tulee App.jsx:stä, jossa viesti näytetään.
//Muuttuja arvo siis on dynaaminen. Riippuen tilanteesta, viestin ulkoasu muuttuu.
//neg ja pos ovat css-luokkia, jotka määrittävät viestin ulkoasun.
const Message = ({ message, isPositive }) => {

    let tyyli = '';

    if (isPositive === true) {
        tyyli = "pos"
    }
    else {
        tyyli = "neg"
    }

    return (
        <div className={`message-container ${tyyli}`}>
            {message}
        </div>
    )
}

export default Message
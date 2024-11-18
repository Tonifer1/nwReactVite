import './App.css'
// Tätä komponenttia voidaan käyttää missä vain komponentissa, jossa halutaan näyttää viesti käyttäjälle.
// Tämä komponentti ottaa propsina messagen ja sen tyypin (positiivinen tai negatiivinen).

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
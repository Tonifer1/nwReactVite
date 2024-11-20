import './App.css'

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
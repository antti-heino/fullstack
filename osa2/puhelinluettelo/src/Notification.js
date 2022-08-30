const Notification = ({ message }) => {
    
    if (message === null) {
        return null
    }

    const style = {
        backgroundColor: message.messageType == 'error' ? 'red' : 'green',
        border: '1px solid',
        fontStyle: 'italic',
        fontSize: 16,
        borderRadius: '0.5rem'
    }

    return (
        <p className="notification" style={style}>
            {message.message}
        </p>
    )
}

export default Notification
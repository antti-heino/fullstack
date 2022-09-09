const SuccessMessage = ({message})=>{
    if (message === null){
        console.log('message null')
        return null
    }
    console.log(message)
    return (
        <div className="success">
            {message}
        </div>
    )
}

export default SuccessMessage
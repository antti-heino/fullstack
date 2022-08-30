import { useState } from "react"

const Form = ({ addContact, updateContact, existingContact }) => {

    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const setDefaults = () => {
        setName('')
        setNumber('')
    }

    const handleNameChange = (event) => setName(event.target.value)
    const handleNumberChange = (event) => setNumber(event.target.value)
    const handleAddContact = (event) => {
        event.preventDefault()
        const contact = {
            name: name,
            number: number,
        }

        if (existingContact(name)) {
            window.confirm(`${name} exists, do you want to overwrite number?`)
                && updateContact(contact).then(setDefaults())

            setDefaults()
            return
        }

        addContact(contact).then(setDefaults())
    }

    

    return (
        <form onSubmit={handleAddContact}>
            <div>
                name: <input value={name} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={number} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add contact</button>
            </div>
        </form>
    )
}

export default Form
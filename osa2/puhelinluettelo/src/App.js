import { useEffect, useState } from 'react'
import notesService from './services/notes'
import PersonForm from './Form'
import Persons from './Person'
import Filter from './Filter'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  const showMsg = (message, messageType) => {
    setMessage({message, messageType})
    setTimeout(() => setMessage(null), 3000)
  }

  const initPersons = () => {
    notesService.getAll()
      .then((initialPersons) => setPersons(initialPersons))
  }

  const existingContact = (name) =>
    persons.map((person) => person.name).includes(name)

  const filteredList =
    persons.filter(
      (person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addContact = (person) =>
    notesService
      .create(person)
      .then(addedContact => {
        setPersons(persons.concat(addedContact))
        showMsg(`Added ${addedContact.name}`, 'info')
      })

  const removeContact = (person) =>
    notesService
      .remove(person.id)
      .then((response) => {
        setPersons(persons.filter(person => person.id !== person.id))
        showMsg(`Removed ${person.name}`, 'info')
      })
      .catch((error) => {
        showMsg(`${error.message}`,
          'error')
        setPersons(persons.filter(p => p.id !== person.id))
      })


  const updateContact = (newPerson) => {
    const person = persons.find(p => p.name === newPerson.name)
    const updatedPerson = { ...person, 'number': newPerson.number }

    return notesService
      .update(updatedPerson.id, updatedPerson)
      .then(updatedPerson => {
        setPersons(persons.map(p =>
          p.id !== updatedPerson.id ? p : updatedPerson))
        showMsg(`Contact updated: ${updatedPerson.name}`, 'info')
      })
      .catch(error => {
        showMsg(`${updatedPerson.name} not found `,
          'error')
      })
  }

  useEffect(initPersons, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        filterName={filter}
        setFilter={setFilter}
      />

      <h2>add a new</h2>
      <PersonForm
        addContact={addContact}
        updateContact={updateContact}
        existingContact={existingContact}
      />
      <h2>Numbers</h2>
      <Persons
        persons={filteredList}
        removePerson={removeContact}
      />
    </div>
  )
}

export default App
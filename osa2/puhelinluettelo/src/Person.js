const Person = ({ name, number, removePerson }) => {
    const handleRemove = () => {
        if (window.confirm(`Delete '${name}'?`)) {
            removePerson()
        }
    }
    return (
        <span>
            {name} {number} 
            <button onClick={handleRemove} style={{ marginLeft: '.5rem' }} >delete</button>
            <br />
        </span >
    )
}

const Persons = ({ persons, removePerson }) => (
    <>
        {persons.map(person =>
            <Person
                key={person.id}
                name={person.name}
                number={person.number}
                removePerson={() => removePerson(person)}
            />
        )}
    </>
)

export default Persons
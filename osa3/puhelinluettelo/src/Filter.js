const Filter = ({ filter, setFilter }) => {
    const handleFilterChange = (event) => setFilter(event.target.value)
    
    return (
        <span>
            filter shown with 
            <input value={filter} onChange={handleFilterChange} style={{ marginLeft: '.5rem' }}  />
        </span>
    )
}

export default Filter
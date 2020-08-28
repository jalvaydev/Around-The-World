import React from 'react'

const SearchBar = ({search, setSearch}) => {
  
    const handleSearchInput = (e) => {
      setSearch(e.target.value)
    }
  
    return(
      <p>Enter Country Name: <input value={search} onChange={handleSearchInput}/></p>
    )
  }
  
export default SearchBar
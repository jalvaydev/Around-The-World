import React from 'react'

const CountryList = ({search, countries, setSearch}) => {


    const setSearchBtn = (e) => {
      setSearch(e.target.value)
    }
  
    let filtered = countries
                    .filter(country => country.name
                      .toLowerCase()
                      .includes(search.toLowerCase()))
  
    if (search.length === 0) {
      return(
        <p>Enter a country name above in order to see results</p>
      )
    }
    if (filtered.length === 0){
      return(
        <p>No results found, please try again.</p>
      )
    }
  
    if(filtered.length === 1){
      return(
        <div>
          <CountryDetails country={filtered[0]}/>
          <Weather capital={filtered[0].capital}/>
        </div>
      )
    }
  
    if (filtered.length <= 10){
      return(
        <ul>{filtered.map(country => <li key={country.name}>{country.name}
        <button value={country.name} onClick={setSearchBtn}>show</button></li>)}</ul>)
    }
  
    if (filtered.length > 10){
      return(
        <p>Too many results to be displayed...</p>
      )
    }
  }

export default CountryList
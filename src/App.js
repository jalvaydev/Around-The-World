import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({country}) => {

  return(
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => <li key={language}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={country.name + " flag"} width="400" height="250"/>
    </div>
  )
}

const CountryList = ({search, countries, setSearchBtn}) => {

  let filtered = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))

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
      <CountryDetails country={filtered[0]}/>
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

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data))
      .then(console.log("Countries recieved"))
  }, [])

  const setSearchBtn = (e) => {
    console.log("Clicked", e.target.value)
    setSearch(e.target.value)
  }

  const handleSearchInput = (e) => {
    setSearch(e.target.value)
  }

  return(
    <div>
      <p>Enter Country Name: <input value={search} onChange={handleSearchInput}/></p> 

      <CountryList search={search} countries={countries} setSearchBtn={setSearchBtn}/>
    </div>
    )
}

export default App;
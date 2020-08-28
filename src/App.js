import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const SearchBar = ({search, setSearch}) => {
  
  const handleSearchInput = (e) => {
    setSearch(e.target.value)
  }

  return(
    <p>Enter Country Name: <input value={search} onChange={handleSearchInput}/></p>
  )
}

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

const Weather = ({capital}) => {
  const [weather, setWeather] = useState([])



  useEffect(() => {
    const fetchWeather = () => {
      axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => setWeather(response.data.current))
    }

    fetchWeather()
  }, [capital])

  return(
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.temperature} Celcius</p>
      <p>Wind: {weather.wind_speed} direction {weather.wind_dir}</p>
    </div>
  )
}

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

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data))
      .then(console.log("Countries recieved"))
  }, [])

  

  return(
    <div>
      <SearchBar search={search} setSearch={setSearch}/>
      <CountryList search={search} countries={countries} setSearch={setSearch}/>
    </div>
    )
}

export default App;
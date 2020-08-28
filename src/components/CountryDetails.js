import React from 'react'

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

export default CountryDetails
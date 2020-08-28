import React from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

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

export default Weather
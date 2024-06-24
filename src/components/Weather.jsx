import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import { APIKey } from '../api'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'

function Weather() {

    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "50d": humidity_icon,
        "50n": humidity_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
        "11d": wind_icon,
        "11n": wind_icon,
    }

    async function search(city) {
        if (city === '') {
            alert('Please Enter City!')
            return;
        }
        try {

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                weatherIcon: icon,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed
            })

        } catch (error) {
            setWeatherData(false);
            console.error('Error in Loading Data!!!!!')
        }
    }
    useEffect(() => {
        search('New York')
    }, [])

    return (
        <div className="weather">
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search ...' />
                <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherData ?
                <>
                    <img src={weatherData.weatherIcon} alt="" className='weather-icon' />
                    <p className='temperature'>{weatherData.temperature}°</p>
                    <p className='location'>{weatherData.location}</p>

                    <div className="weather-data">
                        <div className='col'>
                            <img src={humidity_icon} alt="" />
                            <div>
                                <span>{weatherData.humidity}</span>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className='col'>
                            <img src={wind_icon} alt="" />
                            <div>
                                <span>{weatherData.windSpeed} m/h</span>
                                <p>Wind Speed</p>
                            </div>
                        </div>

                    </div>
                </>
                : null}

        </div>
    )
}

export default Weather

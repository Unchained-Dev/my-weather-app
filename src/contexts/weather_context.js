import React, { useState, createContext, useEffect } from 'react';
import { fetchWeatherApi } from 'openmeteo';

export const WeatherContext = createContext(undefined);

export const WeatherProvider = ({ children }) => {
    const [weather, setWeather] = useState(undefined);
    const url = "https://api.open-meteo.com/v1/forecast";
    const [ params, setParams ] = React.useState({
        "latitude": undefined,
        "longitude": undefined,
        "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature",
                    "precipitation", "rain", "showers", "snowfall", "cloud_cover", 
                    "surface_pressure", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m", "weather_code"],

        "daily": ["temperature_2m_max", "temperature_2m_min", "apparent_temperature_max",
                    "apparent_temperature_min", "sunrise", "uv_index_max", "precipitation_sum",
                    "rain_sum", "showers_sum", "snowfall_sum", "precipitation_hours",
                    "precipitation_probability_max", "wind_speed_10m_max", "wind_gusts_10m_max", "weather_code"],

        "hourly": ["weather_code", "temperature_2m"],
    })

    const [country, setCountry] = useState({name:'',iso:''});
    const [city, setCity] = useState({name: '', stateCode: '', longitude: '', latitude: ''});

    useEffect(() => {
        if(city.latitude && city.longitude){
            setParams((prev) => {
                return {
                    ...prev,
                    latitude: city.latitude,
                    longitude: city.longitude
                }
            })
        }
    }, [city])

    useEffect(() => {
        if(params.latitude && params.longitude){
            fetchWeatherApi(url, params)
            .then(response => {
                setWeather(response[0]);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
        }
    }, [params])

    return <WeatherContext.Provider 
        value={{
            country,
            city,
            current: weather && weather.current(),
            daily: weather && weather.daily(),
            hourly: weather && weather.hourly(),
            params,
            changeCountry: (value) => setCountry(value),
            changeCity: (value) => setCity(value),
            changeParams: (value) => setParams(value),
        }}
        >
            {children}
        </WeatherContext.Provider>;
};
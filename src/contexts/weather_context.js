import React, { useState, createContext, useEffect } from 'react';
import { fetchWeatherApi } from 'openmeteo';

export const WeatherContext = createContext(undefined);

export const WeatherProvider = ({ children }) => {
    const [weather, setWeather] = useState(undefined);
    const url = "https://api.open-meteo.com/v1/forecast";


    const getCurrentDateISO = () => {
        const now = new Date();
        return now.toISOString().split('T')[0];
    };
  
// This state contains the parameters that will be used to fetch the weather data
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
        "timezone": "auto",
        "start_hour": getCurrentDateISO() + "T00:00",
        "end_hour": getCurrentDateISO() + "T23:59"
    })

// open meteo organizes response variables by the position of the parameter in the array
// this state helps keep track of their positions
    const [ paramsMap, setParamsMap ] = useState(undefined)

    const [country, setCountry] = useState({name:'',iso:''});
    const [city, setCity] = useState({name: '', stateCode: '', longitude: '', latitude: ''});

    console.log(params.startHour)
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

        setParamsMap(()=> {
            let temp = {}

            for (const key in params){
                temp[key] = {}

                for (let i = 0; params[key] && i < params[key].length; i++){
                    temp[key][params[key][i]] = i
                }
            }
            return (temp)
        }
        )
        // console.log(weather.hourly().variables(0).valuesArray())
    }, [params])

    // console.log(weather && weather.timezone())
    // console.log(weather && weather.timezoneAbbreviation())
    // console.log(weather.current().variables(paramsMap.current.weather_code).value())
    // console.log(weather && weather.current().variables(paramsMap.current.temperature_2m).value())
    return <WeatherContext.Provider 
        value={{
            country,
            city,
            current: weather && weather.current(),
            daily: weather && weather.daily(),
            hourly: weather && weather.hourly(),
            params,
            paramsMap,
            changeCountry: (value) => setCountry(value),
            changeCity: (value) => setCity(value),
            changeParams: (value) => setParams(value),
        }}
        >
            {children}
        </WeatherContext.Provider>;
};
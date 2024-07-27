import React, { useContext } from "react";
import {SettingsContext} from '../../contexts/settings_context'
import {WeatherContext} from '../../contexts/weather_context'
import descriptions from '../../resources/descriptions.json'
import Graph from "./Graph";

export default function Details(){
    const { theme } = useContext(SettingsContext)
    const { current, paramsMap, utcOffsetSeconds } = useContext(WeatherContext)
    const period = current && current.variables(paramsMap.current.is_day).value() == 1 ? "day" : "night";
    const date = current ? Number(current.time()) + utcOffsetSeconds: null
    const today = date? new Date(date * 1000) : undefined

    let day = today ? today.getUTCDate() : 0;
    let month = today ? today.getUTCMonth() : 0;
    day = day < 10 ? `0${day}` : day;
    month = month < 10 ? `0${month}` : month;

    const getUVDescription = (value) => {
    // Function that returns the description of the UV index
        switch (true) {
            case (value >= 0 && value < 2.5):
                return "Low";
            case (value >= 2.5 && value < 5.5):
                return "Moderate";
            case (value >= 5.5 && value < 7.5):
                return "High";
            case (value >= 7.5 && value < 10.5):
                return "Very High";
            case (value >= 10.5):
                return "Extreme";
            default:
                return "Unknown index";
        }
    }

    const degToCompass = (degrees) => {
    // Function that converts degrees to compass direction
        const directions = [
            "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
            "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
        ];
    
        degrees = (degrees + 360) % 360;

        const index = Math.round(degrees / 22.5) % 16;
    
        return directions[index];
    }

    return(
        <div className="row">
            <div className={"today--details " + theme}>
                <div className='today--header'>
                    <span>Today</span>
                    <span>{day + '/' + month}</span>
                </div>
                <div className="today--body">
                    <div className="today--temp--details">
                        <div className="today--temp--container">
                            <img 
                                src={
                                    current ? 
                                    descriptions[current.variables(paramsMap.current.weather_code).value()][period].image : 
                                    "http://openweathermap.org/img/wn/02d@2x.png"
                                } 
                                alt="weather" 
                            />
                            <span className="today--temp">
                                {
                                    current ? 
                                    Math.round(current.variables(paramsMap.current.temperature_2m).value()) : 
                                    "26"
                                }
                                °C
                            </span>
                        </div>
                        <div className="today--precip">
                            <img src="./icons/water.png" alt="precipitation" />
                            <span>
                                {
                                    current ? 
                                    Math.round(current.variables(paramsMap.current.precipitation).value() * 100) / 100 : 
                                    "0"
                                }
                                %
                            </span>
                        </div>
                    </div>
                    <div className="today--forecast">
                        {
                            current ?
                            descriptions[current.variables(paramsMap.current.weather_code).value()][period].description : 
                            "cloudy"
                        }
                    </div>
                    <div className="today--information">
                        <div className="today--left">
                            <div className="today--row">
                                <span className="label">Apparent Temperature</span>
                                <span className="value">
                                    {
                                        current ?
                                        Math.round(current.variables(paramsMap.current.apparent_temperature).value()) :
                                        "26" 
                                    } °C
                                </span>
                            </div>
                            <div className="today--row">
                                <span className="label">UV Index</span>
                                <span className="value">
                                    {
                                        current ? 
                                        Math.round(current.variables(paramsMap.current.uv_index).value() * 10) / 10 + " " : 
                                        "0 "
                                    }
                                    {
                                        current ? 
                                        getUVDescription(current.variables(paramsMap.current.uv_index).value()) :
                                        "Low"
                                    }
                                </span>
                            </div>
                            <div className="today--row">
                                <span className="label">Wind</span>
                                <span className="value">
                                    {
                                        current ?
                                        degToCompass(current.variables(paramsMap.current.wind_direction_10m).value()) + " " +
                                        Math.round(current.variables(paramsMap.current.wind_speed_10m).value()) + " "
                                        :
                                        "N 0 "
                                    }
                                    km/h
                                </span>
                            </div>
                            <div className="today--row">
                                <span className="label">Wind Gusts</span>
                                <span className="value">
                                    {
                                        current ? 
                                        Math.round(current.variables(paramsMap.current.wind_gusts_10m).value()) + " " : 
                                        "0 "
                                    }
                                    km/h
                                </span>
                            </div>
                            <div className="today--row">
                                <span className="label">Humidity</span>
                                <span className="value">
                                    {
                                        current ? 
                                        Math.round(current.variables(paramsMap.current.relative_humidity_2m).value()) + " " : 
                                        "0 "
                                    }
                                    %
                                </span>
                            </div>

                        </div>
                        <div className="today--right">
                            <div className="today--row">
                                <span className="label">precipitation</span>
                                <span className="value">
                                    {
                                        current ? 
                                        Math.round(current.variables(paramsMap.current.precipitation).value() * 100) / 100 + " ": 
                                        "0 "
                                    }
                                     mm
                                </span>
                            </div>
                            <div className="today--row">
                                <span className="label">rain</span>
                                <span className="value">
                                    {
                                        current ? 
                                        Math.round(current.variables(paramsMap.current.rain).value() * 100) / 100 + " ": 
                                        "0 "
                                    }
                                    mm
                                </span>
                            </div>
                            <div className="today--row">
                                <span className="label">showers</span>
                                <span className="value">
                                    {
                                        current ? 
                                        Math.round(current.variables(paramsMap.current.showers).value() * 100) / 100 + " ": 
                                        "0 "
                                    }
                                     mm
                                </span>
                            </div>
                            <div className="today--row">
                                <span className="label">snowfall</span>
                                <span className="value">
                                    {
                                        current ? 
                                        Math.round(current.variables(paramsMap.current.snowfall).value() * 100) / 100 + " " : 
                                        "0 "
                                    }
                                    cm
                                </span>
                            </div>
                             <div className="today--row">
                                <span className="label">Cloud Cover</span>
                                <span className="value">
                                    {
                                        current ? 
                                        Math.round(current.variables(paramsMap.current.cloud_cover).value()) + " " : 
                                        "0 "
                                    }
                                    %
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Graph />
        </div>
    )
}
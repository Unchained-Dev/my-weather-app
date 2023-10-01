import React from "react";
import Current from "./current";
import Details from "./details";
import './Today.css'

export default function WeatherBody({currentWeather, days}){
    return(
        <div className="weather--body--container">
            <Current 
                currentWeather={currentWeather}
                days={days}
            />
            <Details 
                currentWeather={currentWeather}
            />
        </div>
    )
}
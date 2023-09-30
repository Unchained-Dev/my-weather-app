import React from "react";
import Current from "./current";
import Details from "./details";
import './Today.css'

export default function WeatherBody({currentWeather}){
    return(
        <div className="weather--body--container">
            <Current 
                currentWeather={currentWeather}
            />
            <Details 
                currentWeather={currentWeather}
            />
        </div>
    )
}
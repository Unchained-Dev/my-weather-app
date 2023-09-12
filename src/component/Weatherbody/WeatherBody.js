import React from "react";
import Current from "./current";
import Details from "./details";
import './weatherbody.css'

export default function WeatherBody(){

    

    return(
        <div className="weather--body--container">
            <Current />
            <Details />
        </div>
    )
}
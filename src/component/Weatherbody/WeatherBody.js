import React from "react";
import Current from "./Current";
import Details from "./Details";
import './weatherbody.css';

export default function WeatherBody(){    

    return(
        <div className="weather--body--container">
            <Current />
            <Details />
        </div>
    )
}
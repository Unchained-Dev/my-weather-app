import React from "react";
import WeatherBody from "./component/Weatherbody/WeatherBody";
import {
    Route,
    Routes
  } from "react-router-dom";

export default function NavRoute(){

    return(
        <Routes>
            <Route path="/" element={<WeatherBody />} />
            <Route path="about" element={<div>About</div>} />
        </Routes>
    )
}
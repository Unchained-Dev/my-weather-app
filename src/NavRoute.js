import React from "react";
import Today from "./pages/Today";
import Hourly from "./pages/Hourly";
import {
    Route,
    Routes
  } from "react-router-dom";

export default function NavRoute(){

    return(
        <Routes>
            <Route path="/" element={<Today />} />
            <Route path="about" element={<div>About</div>} />
            <Route path="hourly" element={<Hourly />} />
        </Routes>
    )
}
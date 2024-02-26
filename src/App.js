import React from "react";
import Header from "./component/Header/Header";
import Navbar from './component/Navbar/Navbar'
import WeatherBody from "./component/Weatherbody/WeatherBody";
import {WeatherProvider} from './Context'

export default function App(){
    return(
        <WeatherProvider>
            <div>
                <Header />
                <Navbar />
                <WeatherBody />
            </div>
        </WeatherProvider>
    )
}
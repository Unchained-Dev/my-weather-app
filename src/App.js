import React from "react";
import Header from "./component/Header/Header";
import Navbar from './component/Navbar/Navbar'
import WeatherBody from "./component/Weatherbody/WeatherBody";
import {WeatherProvider} from './contexts/weather_context'
import { SettingsProvider } from "./contexts/settings_context";

export default function App(){
    return(
        <WeatherProvider>
            <SettingsProvider>
            <section>
                <Header />
                <Navbar />
                <WeatherBody />
            </section>
            </SettingsProvider>
        </WeatherProvider>
    )
}
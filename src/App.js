import React from "react";
import Header from "./component/Header/Header";
import Navbar from './component/Navbar/Navbar'
import NavRoute from "./NavRoute";
import {WeatherProvider} from './contexts/weather_context'
import { SettingsProvider } from "./contexts/settings_context";
import { BrowserRouter } from "react-router-dom";

export default function App(){

    return(
        <WeatherProvider>
            <SettingsProvider>
                <BrowserRouter>
                    <section>
                        <Header />
                        <Navbar />
                        <NavRoute />
                    </section>
                </BrowserRouter>
            </SettingsProvider>
        </WeatherProvider>
    )
}
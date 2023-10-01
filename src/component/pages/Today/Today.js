import React, {useContext} from "react";
import Current from "./current";
import Details from "./details";
import { UserContext } from "../../../myContext";
import './Today.css'

export default function WeatherBody({days}){
    const {currentWeather, hourly} = useContext(UserContext)

    return(
        currentWeather &&
        (<div className="weather--body--container">
            <Current />
            <Details />
        </div>)
    )
}
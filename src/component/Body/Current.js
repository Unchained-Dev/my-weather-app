import React, { useContext } from "react";
import {SettingsContext} from '../../contexts/settings_context'
import {WeatherContext} from '../../contexts/weather_context'
import descriptions from '../../resources/descriptions.json'

export default function Current(){
    const { theme } = useContext(SettingsContext)
    const { city, current, paramsMap } = useContext(WeatherContext)
    let daily = ['Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday']

    let dailyRend = daily.map(element=>{
        return(
                <div className="daily--forecast" key={element}>
                    <span className="daily--date">{element}</span>
                    <span className="daily--maximum">24°C</span>
                    <span className="daily--minimum">24°C</span>
                    <img src="./icons/01d.png" alt="weather"></img>
                </div>
        )
    })

    return(
        <div className="row">
            <div className={"current--container " + theme}>
                <div className="current--left">
                    <div className="current--location">
                        <h2>{city.name}</h2>
                        <span>{current ? 
                            descriptions[current.variables(paramsMap.current.weather_code).value()].night.description : "--"}
                        </span>
                    </div>
                    <div className="current--temp">{current ? Math.round(current.variables(paramsMap.current.temperature_2m).value()) :  "--"}°C</div> 
                </div>
                <div className="current--right">
                    <img 
                        src={current ? 
                            descriptions[current.variables(paramsMap.current.weather_code).value()].day.image : "--"} 
                        alt="weather"></img>
                </div>
            </div>
            <div className={"daily--container " + theme}>
                <h3>Daily Forecast</h3>
                <div className="daily">
                    {dailyRend}
                </div>
            </div>
        </div>  
    )
}
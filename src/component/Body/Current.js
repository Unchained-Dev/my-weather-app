import React, { useContext } from "react";
import {SettingsContext} from '../../contexts/settings_context'
import {WeatherContext} from '../../contexts/weather_context'
import DailyScroll from "./DailyScroll";
import descriptions from '../../resources/descriptions.json'

export default function Current(){
    const { theme } = useContext(SettingsContext)
    const { city, current, paramsMap } = useContext(WeatherContext)
    const period = current && current.variables(paramsMap.current.is_day).value() === 1 ? "day" : "night";

    return(
        <div className="row">
            <div className={"current--container " + theme}>
                <div className="current--left">
                    <div className="current--location">
                        <h2>{city.latitude ? city.name : 'Argentina'}</h2>
                        <span>{current ? 
                            descriptions[current.variables(paramsMap.current.weather_code).value()][period].description
                            : 
                            "clear"}
                        </span>
                    </div>
                    <div className="current--temp">{current ? Math.round(current.variables(paramsMap.current.temperature_2m).value()) :  "24"}°C</div> 
                </div>
                <div className="current--right">
                    <img 
                        src={current ? 
                            descriptions[current.variables(paramsMap.current.weather_code).value()][period].image :
                            "http://openweathermap.org/img/wn/02d@2x.png"
                        }
                        alt="weather"></img>
                </div>
            </div>
            <DailyScroll />
        </div>  
    )
}
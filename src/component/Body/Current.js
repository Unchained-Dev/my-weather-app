import React, { useContext } from "react";
import {SettingsContext} from '../../contexts/settings_context'
import {WeatherContext} from '../../contexts/weather_context'
import descriptions from '../../resources/descriptions.json'

export default function Current(){
    const { theme } = useContext(SettingsContext)
    const { city, current, paramsMap, daily, utcOffsetSeconds } = useContext(WeatherContext)
    const period = current && current.variables(paramsMap.current.is_day).value() === 1 ? "day" : "night";
    let dailyMap = ['Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday']

    let dailyRend = dailyMap.map(element=>{
        return(
                <div className="daily--forecast" key={element}>
                    <div className="daily--date">
                        <h1>{element.getDay? element.getDay() : element}</h1>
                        <span>26/06</span>
                    </div>
                    <span className="daily--maximum">24°C</span>
                    <span className="daily--minimum">24°C</span>
                    <img src="http://openweathermap.org/img/wn/02d@2x.png" alt="weather"></img>
                </div>
        )
    })

    const getNextTenDays = (today) => {
        const daysArray = [];
    
        for (let i = 0; i < 10; i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getUTCDate() + i);
            daysArray.push(nextDay);
        }
    
        return daysArray;
    }

    const date = daily ? Number(daily.time()) + utcOffsetSeconds : null
    const datetime = date? new Date(date * 1000) : undefined
    
    const dateArray = datetime? getNextTenDays(datetime) : null;
    let day = dateArray ? dateArray[0].getUTCDate() : 0;
    let month = dateArray ? dateArray[0].getUTCMonth() : 0;
    day = day < 10 ? `0${day}` : day;
    month = month < 10 ? `0${month}` : month;

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
            <div className={"daily--container " + theme}>
                <h3>Daily Forecast</h3>
                <div className="daily">
                    {dailyRend}
                </div>
            </div>
        </div>  
    )
}
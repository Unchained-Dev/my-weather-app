import React, {useContext} from "react";
import { UserContext } from "../../../myContext";
import { Link } from "react-router-dom";

export default function Current(){
    const {currentWeather, days, hourly, today} = useContext(UserContext)

    let daysRender = days.map(element=>{
        let index = days.indexOf(element)
        let imgPath = hourly ? `./icons/${hourly.list[(index * 8) + 3].weather[0].icon}.png` : "./icons/01d.png"
        
        let dateCopy = new Date(today)
        dateCopy.setDate(today.getDate() + index + 1)
        let day = dateCopy.getDate()
        let month = dateCopy.getMonth()
        return(
                <div className="daily--forecast" key={element}>
                    <span className="day">{element}</span>
                    <span className="daily--date">
                        {day.toString().padStart(2, '0')}/{month.toString().padStart(2, '0')}
                    </span>
                    <span className="daily--minMax" id={element}>
                        {hourly ? Math.round(hourly.list[index * 8].main.temp) : '--'}°C /
                        <> </>
                        <span className="daily--min">
                             {hourly ? Math.round(hourly.list[(index * 8) + 7].main.temp) : '--'}°C
                        </span>
                    </span>
                    <img src={imgPath} alt="weather icon"></img>
                </div>
        )
    })
    let imgPath = `./icons/${currentWeather.weather[0].icon}.png`
    return(
        <div className="row">
            <div className="current--container">
                <div className="current--left">
                    <div className="current--location">
                        <h2>{currentWeather.name? currentWeather.name : '--'}</h2>
                        <span>{currentWeather.weather? currentWeather.weather[0].main : '--'}</span>
                    </div>
                    <div className="current--temp">
                        {currentWeather.main? Math.round(currentWeather.main.temp) : '--'}°C
                    </div> 
                </div>
                <div className="current--right">
                        <img src={imgPath} alt="weather icon" />
                </div>
            </div>
            <div className="daily--container">
                <h3>Daily Forecast</h3>
                <div className="daily">
                    {daysRender}
                </div>
                <div className="more--button">
                    <Link className="more--link" to="/daily"><i>Daily</i></Link>
                    <img className="daily--arrow" src="./icons/right_arrow.png"></img>
                </div>
            </div>
        </div>  
    )
}
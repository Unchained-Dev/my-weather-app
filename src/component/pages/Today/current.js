import React, {useContext} from "react";
import { UserContext } from "../../../myContext";
import { Link } from "react-router-dom";

export default function Current(){
    const {currentWeather, days} = useContext(UserContext)

    let daysRender = days.map(element=>{
        return(
                <div className="daily--forecast" key={element}>
                    <span className="daily--date">{element}</span>
                    <span className="daily--maximum">24°C</span>
                    <span className="daily--minimum">24°C</span>
                    <img src="./icons/01d.png" alt="weather icon"></img>
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
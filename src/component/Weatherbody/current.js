import React from "react";

export default function Current(){
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
            <div className="current--container">
                <div className="current--left">
                    <div className="current--location">
                        <h2>Argentina</h2>
                        <span>Sunny</span>
                    </div>
                    <div className="current--temp">18°C</div> 
                </div>
                <div className="current--right">
                    <img src="./icons/01d.png" alt="weather"></img>
                </div>
            </div>
            <div className="daily--container">
                <h3>Daily Forecast</h3>
                <div className="daily">
                    {dailyRend}
                </div>
            </div>
        </div>  
    )
}
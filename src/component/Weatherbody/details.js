import React from "react";

export default function Details(){
    return(
        <div className="row">
            <div className="today--details">
                <div className='today--header'>
                    <span>Today</span>
                    <span>Date</span>
                </div>
                <div className="today--body">
                    <div className="today--temp--details">
                        <img src="./icons/01d.png" alt="weather icon"></img>
                        <span className="today--temp">29°C</span>
                    </div>
                    <div className="today--forecast">Cloudy</div>
                    <div className="today--information">
                        <div className="today--left">
                            <div className="today--row">
                                <span className="label">Max UV Index</span>
                                <span className="value">11 Extreme</span>
                            </div>
                            <div className="today--row">
                                <span className="label">Wind</span>
                                <span className="value">32 km/h</span>
                            </div>
                            <div className="today--row">
                                <span className="label">Probability of precipitation</span>
                                <span className="value">43 %</span>
                            </div>
                            <div className="today--row">
                                <span className="label">Probability of Thunderstorms</span>
                                <span className="value">26 %</span>
                            </div>
                        </div>
                        <div className="today--right">
                            <div className="today--row">
                                <span className="label">precipitation</span>
                                <span className="value">4.2 mm</span>
                            </div>
                            <div className="today--row">
                                <span className="label">precipitation</span>
                                <span className="value">4.2 mm</span>
                            </div>
                            <div className="today--row">
                                <span className="label">Hours of Rain</span>
                                <span className="value">1.5</span>
                            </div>
                            <div className="today--row">
                                <span className="label">Cloud Cover</span>
                                <span className="value">77 %</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
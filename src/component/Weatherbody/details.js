import React from "react";

export default function Details({currentWeather}){
    let imgPath = currentWeather? `./icons/${currentWeather.weather[0].icon}.png`: ''

    return(
        <div className="row">
            <div className="today--details">
                <div className='today--header'>
                    <span>Today</span>
                    <span>Date</span>
                </div>
                <div className="today--body">
                    <div className="today--temp--details">
                        <img src={imgPath} alt="--"></img>
                        <span className="today--temp">
                            {currentWeather.main? Math.round(currentWeather.main.temp * 10) / 10 : '--'}°C
                        </span>
                    </div>
                    <div className="today--forecast">
                        {currentWeather.weather? currentWeather.weather[0].description : '--'}
                    </div>
                    <div className="today--information">
                        <div className="today--left">
                            <div className="today--row">
                                <span className="label">Temp-min</span>
                                <span className="value">
                                    {currentWeather.main? Math.round(currentWeather.main.temp_min * 10) / 10 : '--'}°C
                                </span>
                            </div>
                            <div className="today--row">
                                <span className="label">Temp-max</span>
                                <span className="value">
                                    {currentWeather.main? Math.round(currentWeather.main.temp_max * 10) / 10 : '--'}°C
                                </span>
                            </div>
                            <div className="today--row">
                                <span className="label">wind Deg</span>
                                <span className="value">{currentWeather.wind.deg ? currentWeather.wind.deg : '--'} °</span>
                            </div>
                            <div className="today--row">
                                <span className="label">Wind</span>
                                <span className="value">
                                    {currentWeather.wind? Math.round((currentWeather.wind.speed) * 3.6 * 10)/10 : '--'} km/h</span>
                            </div>
                        </div>
                        <div className="today--right">
                            <div className="today--row">
                                <span className="label">pressure</span>
                                <span className="value">{currentWeather? currentWeather.main.pressure : '--'} hPa</span>
                            </div>
                            <div className="today--row">
                                <span className="label">precipitation</span>
                                <span className="value">{currentWeather && (currentWeather.rain ? currentWeather.rain : '--')} mm</span>
                            </div>
                            <div className="today--row">
                                <span className="label">Humidity</span>
                                <span className="value">{currentWeather? currentWeather.main.humidity : '--'} %</span>
                            </div>
                            <div className="today--row">
                                <span className="label">Cloud Cover</span>
                                <span className="value">{currentWeather? currentWeather.clouds.all : '--'} %</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
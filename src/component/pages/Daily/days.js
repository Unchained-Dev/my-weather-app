import React, { useContext, useEffect, useState } from "react";
import { 
    Accordion, 
    AccordionItem, 
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel } 
from "react-accessible-accordion";
import { UserContext } from "../../../myContext";

export default function Day({currentDay}){
    const {hourly} = useContext(UserContext)
    let currentData = hourly.list.slice((currentDay * 8), ((currentDay * 8) + 8))
    console.log(hourly)
    console.log(currentData)

    let accordion = currentData.map((element) => {
        let imgPath = `./icons/${element.weather[0].icon}.png`
        let timePortion = element.dt_txt.split(" ")[1].split(":").slice(0, 2).join(":");

        return(
            <AccordionItem key={element.dt_txt}>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <div className="accordion--button--container"> 
                            <div className="accordion--button--header">
                                <div className="header--left">
                                    <img 
                                        src={imgPath} 
                                        alt="description" 
                                        className="description--icon" />
                                    <span className="header--temp">{element.main.temp}</span>
                                </div>
                                <div className="header--right">
                                    <span className="time--frame">{timePortion}</span>
                                </div>
                            </div>
                            <div className="description--container">
                                {element.weather[0].description}
                            </div>
                            <span className="pop--container">
                                <img src="./icons/drop-icon.svg" className="drop--icon"/>
                                <span className="pop--value">{element.pop}%</span>
                            </span>
                            <div className="visible--details">
                                <div className="details--row">
                                    <div className="details--column">
                                        <div className="label">Feels Like</div>
                                        <div className="value">
                                            {Math.round(element.main.feels_like * 10) / 10}°C
                                        </div>
                                    </div>
                                    <div className="details--column">
                                        <div className="label">
                                            Humidity
                                        </div>
                                        <div className="value">
                                        {element.main.humidity}%
                                        </div>    
                                    </div>
                                </div>
                                <div className="details--row">
                                    <div className="details--column">
                                        <div className="label">
                                            Min/Max
                                        </div>
                                        <div className="value">
                                            {Math.round(element.main.temp_min * 10) / 10} °C/
                                            <> </>
                                            <span className="temp--min">
                                                {Math.round(element.main.temp_max * 10) / 10} °C
                                            </span>
                                        </div> 
                                    </div>
                                    <div className="details--column">
                                        <div className="label">
                                            Precipitation(3h)
                                        </div>
                                        <div className="value">
                                            {element.rain? element["rain"]["3h"] : '--'} mm
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                        <div className="accordion--panel">
                            <div className="details--row">
                                <div className="details--column">
                                    <div className="label">Wind</div>
                                    <div className="value">
                                        {Math.round(element.wind.speed * 3.6)} Km/h
                                    </div>
                                </div>
                                <div className="details--column">
                                    <div className="label">Wind deg(°)</div>
                                    <div className="value">
                                        {element.wind.deg}°
                                    </div>    
                                </div>
                            </div>
                            <div className="details--row">
                                <div className="details--column">
                                    <div className="label">Gusts</div>
                                    <div className="value">
                                        {Math.round(element.wind.gust * 3.6)} Km/h
                                    </div> 
                                </div>
                                <div className="details--column">
                                    <div className="label">Snow(3h)</div>
                                    <div className="value">
                                        {element.snow? element["snow"]["3h"] : '--'} mm
                                    </div> 
                                </div>
                            </div>
                            <div className="details--row">
                                <div className="details--column">
                                    <div className="label">Cloudiness</div>
                                    <div className="value">
                                        {element.clouds.all}%
                                    </div> 
                                </div>
                                <div className="details--column">
                                    <div className="label">Visibility</div>
                                    <div className="value">
                                        {(element.visibility / 1000)} Km
                                    </div> 
                                </div>
                            </div>
                            <div className="details--row">
                                <div className="details--column">
                                    <div className="label">Pressure(sea)</div>
                                    <div className="value">
                                        {element.main.sea_level} hPa
                                    </div> 
                                </div>
                                <div className="details--column">
                                    <div className="label">Pressure(ground)</div>
                                    <div className="value">
                                        {element.main.grnd_level} hPa
                                    </div> 
                                </div>
                            </div>
                        </div>
                </AccordionItemPanel>
            </AccordionItem>
        )
        })
    
    return(
        <div className="accordion--container">
            <div className="accordion--container--left">
                <Accordion allowZeroExpanded>
                    {accordion.slice(0,4)}
                </Accordion>
            </div>
            <div className="accordion--container--right">
                <Accordion allowZeroExpanded>
                    {accordion.slice(4)}
                </Accordion>
            </div>
        </div>   
    )
}

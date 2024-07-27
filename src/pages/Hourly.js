import React, { useContext } from "react";
import "./hourly.css";
import { WeatherContext } from "../contexts/weather_context";
import { SettingsContext } from "../contexts/settings_context";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

export default function Hourly() {
    const { theme } = useContext(SettingsContext);
    const { hourly, utcOffsetSeconds } = useContext(WeatherContext);

    // const offsetTime = hourly ? Number(hourly.time()) + utcOffsetSeconds : null
    // const time = offsetTime? new Date(offsetTime * 1000) : undefined
//   const hoursTillMidnight = time ? 24 - time.getHours() : undefined
  
  
    hourly && console.log(hourly.variables(0).valuesArray())
    const labels = [];
    for (let i = 0; i <= 24; i++) {
        labels.push(`${i}:00`);
    }

    const accordionItems = labels.map(item => {
        return (
            <AccordionItem className={"accordion__item " + theme} key={item}>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <div className="button--header">
                            <div className="button--header--temp">
                                <h2>26°C</h2>
                                <span>cloudy</span>
                            </div>
                            <div className="button--header--time">
                                <h1>00:00</h1>
                                <img src="http://openweathermap.org/img/wn/02d@2x.png" alt="weather" />
                            </div>
                            <div className="button--header--precip">
                                <img src="./icons/water.png" alt="precipitation" />
                                <span>0%</span>
                            </div>
                        </div>
                        <div className="button--content grid">
                            <div className="button--content--column">
                                <div className="button--content--row">
                                    <div className="label">Cloud Cover</div>
                                    <div className="value">98%</div>
                                </div>
                                <div className="button--content--row">
                                    <div className="label">Humidity</div>
                                    <div className="value">54%</div>
                                </div>
                            </div>
                            <div className="button--content--column">
                                <div className="button--content--row">
                                    <div className="label">Wind</div>
                                    <div className="value">SSW 13 km/h</div>
                                </div>
                                <div className="button--content--row">
                                    <div className="label">Gust</div>
                                    <div className="value">22 km/h</div>
                                </div>
                            </div>
                        </div>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="button--content grid">
                            <div className="button--content--column">
                                <div className="button--content--row">
                                    <div className="label">Cloud Cover</div>
                                    <div className="value">98%</div>
                                </div>
                                <div className="button--content--row">
                                    <div className="label">Humidity</div>
                                    <div className="value">54%</div>
                                </div>
                                <div className="button--content--row">
                                    <div className="label">Rain</div>
                                    <div className="value">0.1 mm</div>
                                </div>
                                <div className="button--content--row">
                                    <div className="label">Rain</div>
                                    <div className="value">0.1 mm</div>
                                </div>
                            </div>
                            <div className="button--content--column">
                                <div className="button--content--row">
                                    <div className="label">Wind</div>
                                    <div className="value">SSW 13 km/h</div>
                                </div>
                                <div className="button--content--row">
                                    <div className="label">Gust</div>
                                    <div className="value">22 km/h</div>
                                </div>
                                <div className="button--content--row">
                                    <div className="label">Visibility</div>
                                    <div className="value">16 km</div>
                                </div>
                                <div className="button--content--row">
                                    <div className="label">Visibility</div>
                                    <div className="value">16 km</div>
                                </div>
                            </div>
                        </div>
                </AccordionItemPanel>
            </AccordionItem>
        )
    })
    
    return (
        <div className="hourly--container">
            <div className="column">
                <Accordion allowZeroExpanded={true}>
                    {accordionItems? accordionItems.filter((item, index) => index % 2 === 0) : null}
                </Accordion>
            </div>
            <div className="column">
                <Accordion allowZeroExpanded={true}>
                    {accordionItems ? accordionItems.filter((item, index) => index % 2 !== 0) : null}
                </Accordion>
            </div>
        </div>
    );
}
import React, { useContext } from "react";
import "./hourly.css";
import { WeatherContext } from "../contexts/weather_context";
import { SettingsContext } from "../contexts/settings_context";
import { getUVDescription, getWindDesc } from "../utils/utils";
import descriptions from "../resources/descriptions";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

export default function Hourly() {
    const { theme } = useContext(SettingsContext);
    const { hourly, utcOffsetSeconds, paramsMap } = useContext(WeatherContext);
    const offsetTime = hourly ? Number(hourly.time()) + utcOffsetSeconds : null
    const time = offsetTime? new Date(offsetTime * 1000) : undefined
    const labels = [];

    let i = time? time.getUTCHours() : 0;
    
    for (; i < 24; i++) {
        labels.push(`${i}:00`);
    }

    const getData = hourly => {
        return (
            hourly ?
            {
                "apparent_temperature": hourly.variables([paramsMap.hourly.apparent_temperature]).valuesArray(),
                "cloud_cover": hourly.variables([paramsMap.hourly.cloud_cover]).valuesArray(),
                "humidity": hourly.variables([paramsMap.hourly.relative_humidity_2m]).valuesArray(),
                "precipitation": hourly.variables([paramsMap.hourly.precipitation]).valuesArray(),
                "rain": hourly.variables([paramsMap.hourly.rain]).valuesArray(),
                "showers": hourly.variables([paramsMap.hourly.showers]).valuesArray(),
                "snowfall": hourly.variables([paramsMap.hourly.snowfall]).valuesArray(),
                "snowdepth": hourly.variables([paramsMap.hourly.snow_depth]).valuesArray(),
                "temperature": hourly.variables([paramsMap.hourly.temperature_2m]).valuesArray(),
                "wind_speed": hourly.variables([paramsMap.hourly.wind_speed_10m]).valuesArray(),
                "wind_direction": hourly.variables([paramsMap.hourly.wind_direction_10m]).valuesArray(),
                "gusts": hourly.variables([paramsMap.hourly.wind_gusts_10m]).valuesArray(),
                "weather_code": hourly.variables([paramsMap.hourly.weather_code]).valuesArray(),
                "visibility": hourly.variables([paramsMap.hourly.visibility]).valuesArray(),
                "precipitation_probability": hourly.variables([paramsMap.hourly.precipitation_probability]).valuesArray(),
                "uv_index": hourly.variables([paramsMap.hourly.uv_index]).valuesArray(),
                "is_day": hourly.variables(paramsMap.hourly.is_day).valuesArray()
            }
            :
            null
        )
    }

    const data = getData(hourly);
    const accordionItems = labels.map((item, index) => {
        const period = data ? (data.is_day[index] === 1 ? "day" : "night") : "day";
        return (
            <AccordionItem className={"accordion__item " + theme} key={item}>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <div className="button--header">
                            <div className="button--header--temp">
                                <h2>{data ? Math.round(data.temperature[index]) + " " : "26 "}
                                    °C
                                </h2>
                                <span>{ data ?
                                    descriptions[data.weather_code[index]][period].description : "cloudy"}
                                </span>
                            </div>
                            <div className="button--header--time">
                                <h1>{item}</h1>
                                <img src={data ? 
                                    descriptions[data.weather_code[index]][period].image : 
                                    "http://openweathermap.org/img/wn/02d@2x.png"
                                    } alt="weather" />
                            </div>
                            <div className="button--header--precip">
                                <img src="./icons/water.png" alt="precipitation" />
                                <span>{data ? Math.floor(data.precipitation_probability[index] * 100) / 100 + " " 
                                : "0 "}%</span>
                            </div>
                        </div>
                        <div className="button--content grid">
                            <div className="button--content--column">
                                <div className="button--content--row">
                                    <div className="label">Apparent Temperature</div>
                                    <div className="value">{data ? Math.round(data.apparent_temperature[index]) + " " : "26 "}
                                        °C</div>
                                </div>
                                <div className="button--content--row">
                                    <div className="label">UV Index</div>
                                    <div className="value">
                                    {data ? 
                                        getUVDescription(data.uv_index[index]) :
                                        "0 Low"}
                                    </div>
                                </div>
                            </div>
                            <div className="button--content--column">
                                <div className="button--content--row">
                                    <div className="label">Wind</div>
                                    <div className="value">
                                        {data ?
                                            getWindDesc(data.wind_direction[index], data.wind_speed[index])
                                            :
                                            "N 0 "}
                                    </div>
                                </div>
                                <div className="button--content--row">
                                    <div className="label">Gusts</div>
                                    <div className="value">{data? Math.round(data.gusts[index]) + " " : "22 "}km/h</div>
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
                                    <div className="value">{data ?
                                        Math.round(data.cloud_cover[index]) + " " : "26 "} %
                                    </div>
                                </div>
                                <div className="button--content--row">
                                    <div className="label">Humidity</div>
                                    <div className="value">{data ? 
                                        Math.round(data.humidity[index]) + " " : "50 "}%
                                    </div>
                                </div>
                                <div className="button--content--row">
                                    <div className="label">snowfall</div>
                                    <div className="value">{data ? 
                                        Math.round(data.snowfall[index] * 100 ) / 100  + " " : "50 "}cm
                                    </div>
                                </div>
                                <div className="button--content--row">
                                    <div className="label">snow depth</div>
                                    <div className="value">{data ? 
                                        Math.round(data.snowdepth[index] * 100 ) / 100  + " " : "50 "}m
                                    </div>
                                </div>
                            </div>
                            <div className="button--content--column">
                                <div className="button--content--row">
                                    <div className="label">Visibility</div>
                                    <div className="value">{data ? data.visibility[index] + " " : "12 "}km</div>
                                </div>
                                <div className="button--content--row">
                                    <div className="label">precipitation</div>
                                    <div className="value">{data ? 
                                        Math.round(data.precipitation[index] * 100 ) / 100  + " " : "50 "}mm
                                    </div>
                                </div>
                                <div className="button--content--row">
                                    <div className="label">rain</div>
                                    <div className="value">{data ? 
                                        Math.round(data.rain[index] * 100 ) / 100  + " " : "50 "}mm
                                    </div>
                                </div>
                                <div className="button--content--row">
                                    <div className="label">shower</div>
                                    <div className="value">{data ? 
                                        Math.round(data.showers[index] * 100 ) / 100  + " " : "50 "}mm
                                    </div>
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
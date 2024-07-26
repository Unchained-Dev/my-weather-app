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
    const { hourly, paramsMap, utcOffsetSeconds } = useContext(WeatherContext);

    const offsetTime = hourly ? Number(hourly.time()) + utcOffsetSeconds : null
    const time = offsetTime? new Date(offsetTime * 1000) : undefined
//   const hoursTillMidnight = time ? 24 - time.getHours() : undefined
  
  
    hourly && console.log(hourly.variables(0).valuesArray())
    const labels = [];
    for (let i = 0; i <= 24; i++) {
        labels.push(`${i}:00`);
    }

    const accordionItems = labels.map(item => {
        return (
            <AccordionItem key={item}>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <div className="dummy--header">
                            {item}
                        </div>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="dummy--data">
                        dummydata
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
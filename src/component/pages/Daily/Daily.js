import React, { useContext } from "react";
import Day from "./days";
import { UserContext } from "../../../myContext";
import "./daily.css"

export default function Daily(){
    const {days, hourly} = useContext(UserContext)
    
    let daysRender= days.map(element=>{
        return(
            <li className="daily--forecast">
                <button className="daily--nav">
                    <span className="daily--date">{element}</span>
                    <span className="daily--maximum">24°C</span>
                    <span className="daily--minimum">24°C</span>
                    <img src="./icons/01d.png" alt="weather icon"></img>
                </button>
            </li>    
        )
    })

    return(
        <section className="daily--section">
            <ul className="daily--nav--container">
                {daysRender}
            </ul>
        </section>     
    )
}
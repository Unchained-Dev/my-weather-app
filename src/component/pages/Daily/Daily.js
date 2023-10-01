import React from "react";
import "./daily.css"
import Day from "./days";

export default function Daily({hourly, days}){

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
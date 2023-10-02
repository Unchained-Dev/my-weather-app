import React, { useContext, useState, useEffect} from "react";
import Day from "./days";
import { UserContext } from "../../../myContext";
import "./daily.css"

export default function Daily(){
    const {days, hourly, today} = useContext(UserContext)
    const [currentBtn, setCurrentBtn] = useState(days[0])
    const [currentDay, setCurrentDay] = useState(0)
    
    let daysRender= days.map(element=>{
        let index = days.indexOf(element)
        let imgPath = hourly ? `./icons/${hourly.list[(index * 8) + 3].weather[0].icon}.png` : "./icons/01d.png"
        
        let dateCopy = new Date(today)
        dateCopy.setDate(today.getDate() + index + 1)
        let day = dateCopy.getDate()
        let month = dateCopy.getMonth()
        return(
            <li className="daily--forecast" key={element}>
                <button
                    id={element}
                    onClick={(event)=>handleClick(event)}
                    className={currentBtn == element ? "daily--nav currentBtn" : "daily--nav inActive"}>
                    <span className="day" id={element}>{element}</span>
                    <span className="daily--date">
                        {day.toString().padStart(2, '0')}/{month.toString().padStart(2, '0')}
                    </span>
                    <span className="daily--minMax" id={element}>
                        {hourly ? Math.round(hourly.list[index * 8].main.temp) : '--'}°C /
                        <> </>
                        <span className="daily--min">
                             {hourly ? Math.round(hourly.list[(index * 8) + 7].main.temp) : '--'}°C
                        </span>
                    </span>
                    <img src={imgPath} alt="weather icon" id={element}></img>
                </button>
            </li>    
        )
    })

    function handleClick(event){
        setCurrentBtn(event.target.id)
        setCurrentDay(days.indexOf(event.target.id))
    }

    return(
        <section className="daily--section">
            <ul className="daily--nav--container">
                {daysRender}
            </ul>
            {hourly && <Day currentDay={currentDay}/>}
        </section>     
    )
}
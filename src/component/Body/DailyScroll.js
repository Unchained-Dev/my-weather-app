import React, { useContext } from "react";
import {SettingsContext} from '../../contexts/settings_context'
import {WeatherContext} from '../../contexts/weather_context'
import {getNextTenDays} from '../../utils/utils'

export default function DailyScroll() {
    const { theme } = useContext(SettingsContext)
    const { daily, utcOffsetSeconds } = useContext(WeatherContext)
    const scrollableDivRef = React.useRef(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [startPosition, setStartPosition] = React.useState(0);

    function handleMouseDown(event){
        setIsDragging(true);
        setStartPosition(event.clientX - scrollableDivRef.current.scrollLeft);
    }

    function handleMouseUp(){
        setIsDragging(false);
    }

    function handleMouseMove(event){
        if (isDragging) {
            event.preventDefault();
            const scrollX = event.clientX - startPosition;
            scrollableDivRef.current.scrollLeft = scrollX;
        }
    }
    let days = {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday'
    }

    const date = daily ? Number(daily.time()) + utcOffsetSeconds : null
    const datetime = date? new Date(date * 1000) : undefined

    let dailyMap;

    dailyMap = datetime ? getNextTenDays(datetime) : 
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let dailyRend = dailyMap.map(element=>{
        let day = element.getUTCDay ? element.getUTCDate() : 0;
        let month = element.getUTCMonth ? element.getUTCMonth() : 0;
        day = day < 10 ? `0${day}` : day;
        month = month < 10 ? `0${month}` : month;

        return(
                <div 
                    className="daily--forecast" 
                    key={element.getDay? element.getDate() : element}
                >
                    <div className="daily--date">
                        <h1>{element.getDay? days[element.getDay()] : element}</h1>
                        <span>{ day + "/" + month }</span>
                    </div>
                    <span className="daily--maximum">24°C</span>
                    <span className="daily--minimum">24°C</span>
                    <img src="http://openweathermap.org/img/wn/02d@2x.png" alt="weather"></img>
                </div>
        )
    })

    return(
        <div className={"daily--container " + theme}>
            <h3>Daily Forecast</h3>
            <div 
                className="daily"
                ref={scrollableDivRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {dailyRend}
            </div>
        </div>
    )
}
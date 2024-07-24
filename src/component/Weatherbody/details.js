import React, { useContext } from "react";
import {SettingsContext} from '../../contexts/settings_context'
import {WeatherContext} from '../../contexts/weather_context'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

export default function Details(){
    const { theme } = useContext(SettingsContext)
    const { hourly, paramsMap } = useContext(WeatherContext)

    const labels = [];
    for (let i = 0; i <= 24; i++) {
        labels.push(`${i}:00`);
    }


    hourly && console.log(hourly.variables(paramsMap.hourly.temperature_2m).valuesArray())

    return(
        <div className="row">
            <div className={"today--details " + theme}>
                <div className='today--header'>
                    <span>Today</span>
                    <span>Date</span>
                </div>
                <div className="today--body">
                    <div className="today--temp--details">
                        <img src="./icons/01d.png" alt="weather"></img>
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
            <div className={"today--chart " + theme}>
                <Line data={{
                    labels: labels,
                    datasets: [
                        {
                            label: 'Temperature (°C)',
                            data: hourly && hourly.variables(paramsMap.hourly.temperature_2m).valuesArray().map(element=>Math.round(element)),
                            borderColor: '#FFFFFF',
                            pointBackgroundColor: '#FF6384'
                        },
                    ],
                }}
                />
            </div>
        </div>
    )
}
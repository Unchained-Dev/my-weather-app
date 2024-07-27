import React, { useContext } from "react";
import { WeatherContext } from "../../contexts/weather_context";
import { SettingsContext } from "../../contexts/settings_context";
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

export default function Graph(){
    const { hourly, paramsMap , utcOffsetSeconds} = useContext(WeatherContext)
    const { theme } = useContext(SettingsContext)
    const offsetTime = hourly ? Number(hourly.time()) + utcOffsetSeconds : null
    const time = offsetTime? new Date(offsetTime * 1000) : undefined
    const labels = [];

    let i = time? time.getUTCHours() : 0;
    
    for (let j = 0; j <= 24; j++, i++) {
        if (i === 24) i = 0;
        labels.push(`${i}:00`);
    }
    return(
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
    )
}
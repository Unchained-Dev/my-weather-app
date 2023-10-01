import { useContext, useState, createContext } from "react";
import React from "react";

// Step 1: Create a user context
export const UserContext = createContext();

// Step 2: Create a context provider component
export default function UserContextProvider({ children }){
    const link = 'https://api.openweathermap.org/data/2.5/'
    const apiKey = '233be77dacbf073ca4e9197db09da8c2'
    const [country, setCountry] = React.useState({name:'', isoCode:''})
    const [currentWeather, setCurrentWeather] = React.useState('')
    const [hourly, setHourly] = React.useState('')

    const updateCountry = (value) => {
        setCountry(value);
    };

    // checks what day it is and adjusts the array of days to start from that day
    let daily = ['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday']
    let today = new Date()
    let day = today.getDay()
    let days = [...daily.slice(0,day), ...daily.slice(day)].slice(0,5)

    function handleSearch(lat, lon){
        // fetch the current weather data
        fetch(`${link}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
        .then((data) => {
            setCurrentWeather(data)
          })
        .catch((error) => {
            console.error('Fetch error:', error);
          })

        // fetch the 3-hourly forecast data
        fetch(`${link}forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
        .then((data) => {
            setHourly(data)
            console.log(data)
          })
        .catch((error) => {
            console.error('Fetch error:', error);
          })
    }

  return (
    <UserContext.Provider value={{ country, updateCountry, handleSearch, currentWeather, hourly, days}}>
      {children}
    </UserContext.Provider>
  );
};

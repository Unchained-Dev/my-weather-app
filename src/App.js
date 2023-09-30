import React from "react";
import Header from "./component/Header/Header";
import Navbar from './component/Navbar/Navbar'
import Today from "./component/pages/Today/Today";
import Daily from "./component/pages/Daily/Daily";
import { Route, Routes } from "react-router";


export default function App(){
    const link = 'https://api.openweathermap.org/data/2.5/'
    const apiKey = '233be77dacbf073ca4e9197db09da8c2'
    const [country,setCountry] = React.useState({name:'',isoCode:''})
    const [currentWeather, setCurrentWeather] = React.useState('')
    const [hourly, setHourly] = React.useState('')

    function handleSearch(lat, lon){
        // fetch the current weather data
        fetch(`${link}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then((response) => {
            // Check if the response status is OK (status code 200)
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            // Parse the response JSON data
            return response.json();
          })
        .then((data) => {
            // Handle the data received from the API
            setCurrentWeather(data)
          })
        .catch((error) => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
          })

        // fetch the 3-hourly forecast data
        fetch(`${link}forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)

        .then((response) => {
            // Check if the response status is OK (status code 200)
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            // Parse the response JSON data
            return response.json();
          })
        .then((data) => {
            // Handle the data received from the API
            setHourly(data)
            console.log(data)
          })
        .catch((error) => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
          })
    }

    return(
        <div>
            <Header 
                country={country}
                setCountry={setCountry}
                handleSearch={handleSearch}
            />
            <Navbar 
              buttonDisabled={currentWeather? false : true}
            />
            <Routes>
              <Route path="/today" element={currentWeather && <Today currentWeather={currentWeather}/>} />
              <Route path="/daily" element={hourly && <Daily hourly={hourly}/>} />
            </Routes>
        </div>
    )
}
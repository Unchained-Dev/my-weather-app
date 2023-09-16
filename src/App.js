import React from "react";
import Header from "./component/Header/Header";
import Navbar from './component/Navbar/Navbar'
import WeatherBody from "./component/Weatherbody/WeatherBody";

export default function App(){
    const apiKey = '233be77dacbf073ca4e9197db09da8c2'
    const [country,setCountry] = React.useState({name:'',isoCode:''})
    const [currentWeather, setCurrentWeather] = React.useState('')

    function handleSearch(lat, lon){
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
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
            <Navbar />
            <WeatherBody 
                currentWeather={currentWeather}
            />
        </div>
    )
}
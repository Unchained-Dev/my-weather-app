import React from "react";
import Header from "./component/Header/Header";
import Navbar from './component/Navbar/Navbar'
import WeatherBody from "./component/Weatherbody/WeatherBody";

export default function App(){
    const [country,setCountry] = React.useState({name:'',iso:''})

    return(
        <div>
            <Header 
                country = {country}
                setCountry = {setCountry}
            />
            <Navbar />
            <WeatherBody />
        </div>
    )
}
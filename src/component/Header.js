import React from "react";
import weatherIcon from '../Images/Weather Icon.png'
import searchIcon from '../Images/search icon.png'

export default function Header(){

    return(
        <header className="main--header">
            <div className="icon--container">
                <img src={weatherIcon} className="weather--icon"></img>
                <h2>My Weather</h2>
            </div>
            <div className="search--space--container">
                <input className='search--space' type="text" placeholder="search"></input>
                <img src={searchIcon} className="search--icon"></img>
            </div>
            <div className="unit">
                <select className="temp--unit">
                    <option>Celsius (&deg;C)</option>
                    <option>Fahrenheit (&deg;F)</option>
                </select>
                
            </div>
        </header>
    )
}


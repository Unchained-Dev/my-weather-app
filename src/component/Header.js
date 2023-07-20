import React from "react";
import weatherIcon from '../Images/Weather Icon.png'
import searchIcon from '../Images/search icon.png'
import countries from "./countryData";

export default function Header(){
    let [country,setCountry] = React.useState('')
    let [suggestions, setSuggestions] = React.useState([])

    function handleChange(event){
        setCountry(event.target.value)
    }

    function handleClick(event){
        setCountry(event.target.textContent)
    }

    React.useEffect(()=>{
        let startWith = country
        setSuggestions(()=>{
            return(
                countries.filter(element=>{
                    return(
                        country && element.startsWith(startWith) && 
                        element != startWith)
                }).map(element=><li onClick={event=>handleClick(event)}>{element}</li>)
            )
        })
    }, [country])

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
                <div className="country--space--container">
                    <input 
                        className="country--space" 
                        placeholder="Country"
                        onChange={event=>handleChange(event)}
                        value={country}>
                    </input>
                    <ul className="country--dropdown">{suggestions}</ul>
                </div>
                <select className="temp--unit">
                    <option>&deg;C</option>
                    <option>&deg;F</option>
                </select>  
            </div>
        </header>
    )
}


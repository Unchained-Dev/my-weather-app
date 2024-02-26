import React, { useCallback } from "react";
import {Country, State,City} from 'country-state-city'
import './header.css'

export default function Header({country, setCountry}){
    const countries = Country.getAllCountries()
    const [city, setCity] = React.useState({name: '', stateCode: '', longitude: '', latitude: ''})
    const [countrySuggestions, setCountrySuggestions] = React.useState([])
    const [citySuggestions, setCitySuggestions] = React.useState([])
    const [cities, setCities] = React.useState([])

    const handleChange = (event) => {
        setCountry({name: event.target.value, iso: ''})
    }

    const handleClick = useCallback((event) => {
        setCountry({name: event.target.textContent, iso: event.target.id})
    }, [setCountry])

    function handleCityChange(event){
        setCity({
            name: event.target.value,
            stateCode: '',
            longitude: '',
            latitude: ''
        })
    }

    function handleCityClick(event){
        setCity({
            name: event.target.textContent,
            longitude: event.target.className,
            latitude: event.target.id
        })
    }

    React.useEffect(()=>{
        setCities(()=>City.getCitiesOfCountry(country.iso))
    }, [country])

    React.useEffect(()=>{
        let startWith = country.name.toLowerCase()
        setCountrySuggestions(()=>{
            return(
                countries.filter(element=>{
                    let test = element.name.toLowerCase()
                    return(
                        country.name && test.startsWith(startWith) && 
                        test !== startWith)
                }).slice(0,10)
                .map(element=><li 
                    onClick={event=>handleClick(event)} 
                    key={element.isoCode}
                    id={element.isoCode}
                    >{element.name}</li>)
            )
        })
    }, [country, countries, handleClick])

    React.useEffect(()=>{
        let startWith = city.name.toLowerCase()
        setCitySuggestions(()=>{
            return(
                city.latitude === '' &&
                cities.filter(element=>{
                    let lower = element.name.toLowerCase()
                    return(
                        city.name.toLowerCase() &&
                        lower.startsWith(startWith) &&
                        lower.name !== startWith
                    )
                }).slice(0,10)
                .map(element=>{
                    let tempName = element.name
                    let stateName = State.getStateByCodeAndCountry(element.stateCode, country.iso).name
                    let concatenated = `${tempName}, ${stateName}`

                    return(
                        <li
                            onClick={event=>handleCityClick(event)}
                            key={element.latitude}
                            id={element.latitude}
                            className={element.longitude}
                            >{concatenated}
                        </li>
                    )
                })
            )
        })
    }, [city, country, cities])

    return(
        <header className="main--header">
            <div className="icon--container">
                <img src='./icons/weather_icon.png' className="weather--icon" alt="logo"></img>
                <h2>My Weather</h2>
            </div>
            <div className="search--suggestion--container">
                <div className="search--space--container">
                    <input 
                        className='search--space' 
                        type="text" 
                        placeholder="search"
                        onChange={event=>handleCityChange(event)}
                        value={city.name}>
                    </input>
                    <img src='./icons/search_icon.png' className="search--icon" alt="search-icon"></img>
                </div>
                <ul className="city--dropdown">{citySuggestions}</ul>
            </div>
            <div className="unit">
                <div className="country--space--container">
                    <input 
                        className="country--space" 
                        type="text"
                        placeholder="Country"
                        onChange={event=>handleChange(event)}
                        value={country.name}>
                    </input>
                    <ul className="country--dropdown">{countrySuggestions}</ul>
                </div>
                <select className="temp--unit">
                    <option>&deg;C</option>
                    <option>&deg;F</option>
                </select>  
            </div>
        </header>
    )
}


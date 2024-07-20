import React, { useContext, useCallback } from "react";
import {Country, State,City} from 'country-state-city'
import {WeatherContext} from '../../contexts/weather_context'
import {SettingsContext} from '../../contexts/settings_context'
import './header.css'

export default function Header(){
    const countries = Country.getAllCountries()
    const [cities, setCities] = React.useState([])

    const [countrySuggestions, setCountrySuggestions] = React.useState([])
    const [citySuggestions, setCitySuggestions] = React.useState([])
    const [citySearchActive, setCitySearchActive] = React.useState(false)
    const [countrySearchActive, setCountrySearchActive] = React.useState(false)


    const {country, changeCountry, city, changeCity} = useContext(WeatherContext)
    const {theme, toggleTheme} = useContext(SettingsContext)

    const handleChange = (event) => {
        changeCountry({name: event.target.value, iso: ''})
    }

    const handleClick = useCallback((event) => {

        changeCountry({name: event.target.textContent, iso: event.target.id})
    }, [changeCountry])

    const handleCityClick = useCallback((event) => {
        changeCity({
            name: event.target.textContent,
            longitude: event.target.className,
            latitude: event.target.id
        })
    }, [changeCity])

    const handleCityChange = (event) => {
        changeCity({
            name: event.target.value,
            stateCode: '',
            longitude: '',
            latitude: ''
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
    }, [city, country, cities, handleCityClick])

    return(
        <header className={"main--header " + theme}>
            <div className="icon--container">
                <img src='./icons/weather_icon.png' className="weather--icon" alt="logo"></img>
                <h2>My Weather</h2>
                <button className="theme--button" onClick={toggleTheme}/>
            </div>
            <div className="search--suggestion--container">
                <div className={"search--space--container " + theme}>
                    <input 
                    
                        className='search--space' 
                        type="text" 
                        placeholder="search"
                        onChange={event=>handleCityChange(event)}
                        value={city.name}
                        onFocus={()=>setCitySearchActive(true)}
                        onBlur={()=>{
                                    const timeoutId = setTimeout(() => {
                                        setCitySearchActive(false)
                                    }, 200);
                                    return () => clearTimeout(timeoutId);
                                }
                            }
                    >
                    </input>
                    <img src='./icons/search_icon.png' className="search--icon" alt="search-icon"></img>
                </div>
                {citySearchActive && <ul className={"city--dropdown " + theme}>{citySuggestions}</ul>}
            </div>
            <div className={"unit " + theme}>
                <div className={"country--space--container " + theme}>
                    <input 
                        className="country--space" 
                        type="text"
                        placeholder="Country"
                        onChange={event=>handleChange(event)}
                        value={country.name}
                        onFocus={()=>setCountrySearchActive(true)}
                        onBlur={()=>{
                                const timeoutId = setTimeout(() => {
                                    setCountrySearchActive(false)
                                }, 200);
                                return () => clearTimeout(timeoutId);
                                }
                            }
                    >
                    </input>
                    {countrySearchActive && <ul className={"country--dropdown " + theme}>{countrySuggestions}</ul>}
                </div>
                <div className="settings--button">
                    <img src='./icons/setting.png' className="settings--icon" alt="settings-icon"></img>
                </div>
            </div>
        </header>
    )
}


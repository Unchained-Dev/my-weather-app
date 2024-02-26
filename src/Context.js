import React, { useState, createContext } from 'react';

export const WeatherContext = createContext(undefined);

export const WeatherProvider = ({ children }) => {
    const [country, setCountry] = useState({name:'',iso:''});
    const [city, setCity] = useState({name: '', stateCode: '', longitude: '', latitude: ''});
    return <WeatherContext.Provider 
        value={{
            country,
            city,
            changeCountry: (value) => setCountry(value),
            changeCity: (value) => setCity(value)
        }}
        >
            {children}
        </WeatherContext.Provider>;
};
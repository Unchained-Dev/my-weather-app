import React, { useState, createContext } from 'react';

export const WeatherContext = createContext(undefined);

export const WeatherProvider = ({ children }) => {
    const [country, setCountry] = useState({name:'',iso:''});
    return <WeatherContext.Provider 
        value={{
            country,
            changeCountry: (value) => setCountry(value)
        }}
        >
            {children}
        </WeatherContext.Provider>;
};
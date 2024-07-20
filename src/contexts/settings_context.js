import React, { useState, useEffect, createContext } from 'react';

export const SettingsContext = createContext(undefined);

export const SettingsProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');
    const body = document.querySelector('body');

    const toggleTheme = () => {
        setTheme(prev => {
            return prev === 'dark' ? 'light' : 'dark';
            }
        )
    }

    useEffect(() => {
        if (body) {
            body.classList.remove('dark', 'light');
            body.classList.add(theme);
        }
    }, [theme, body]);

    return <SettingsContext.Provider 
        value={{
            theme,
            toggleTheme: toggleTheme
        }}
        >
            {children}
        </SettingsContext.Provider>;
};
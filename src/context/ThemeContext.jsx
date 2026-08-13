import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Default to the established IOTA CFT dark operating profile.
    const [isLightMode, setIsLightMode] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (isLightMode) {
            root.classList.remove('dark');
        } else {
            root.classList.add('dark');
        }
        root.style.colorScheme = isLightMode ? 'light' : 'dark';
    }, [isLightMode]);

    const toggleTheme = () => setIsLightMode(!isLightMode);

    return (
        <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

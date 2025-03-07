import React, { useEffect, useState } from "react";
import { ThemeContext } from "./themeContext";

type ITheme = 'light' | 'dark'

export interface IThemeContext {
    theme: ITheme;
    toggleTheme: () => void;
}

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [theme, setTheme] = useState<ITheme>(() => {
        return (localStorage.getItem('theme') as ITheme || 'light')
    })

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light' )

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

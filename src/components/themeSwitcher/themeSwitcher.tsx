import React, { useContext } from "react";
import styles from './themeSwitceher.module.css'

import { ThemeContext } from "../../context/themeContext/themeContext";

const ThemeSwitcher: React.FC = () => {

    const themeContext = useContext(ThemeContext)
    if (!themeContext) return null

    return (
        <button 
        className={styles.themeSwitcher}
            onClick={themeContext.toggleTheme}
        >
            {themeContext.theme === "light" ? "🌙" : "☀️"}
        </button>
    );
}
 
export default ThemeSwitcher;
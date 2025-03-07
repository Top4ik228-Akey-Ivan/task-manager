import { createContext } from "react";
import { IThemeContext } from "./themeProvider";

export const ThemeContext = createContext<IThemeContext | null>(null)
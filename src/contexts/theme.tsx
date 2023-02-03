import { createContext } from "react";
import { Theme } from "../types";

export const ThemeContext = createContext<Theme>("light");

export const ThemeProvider = ThemeContext.Provider
export const ThemeConsumer = ThemeContext.Consumer
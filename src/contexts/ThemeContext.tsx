import { createContext, useContext } from "react";

export interface ThemeContextType {
  mode: "light" | "dark";
  palette: "blue" | "green" | "purple" | "pink" | "orange";
  toggleMode: () => void;
  setPalette: (palette: "blue" | "green" | "purple" | "pink" | "orange") => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  palette: "blue",
  toggleMode: () => {},
  setPalette: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
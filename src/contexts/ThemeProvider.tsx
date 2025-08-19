import React, { useEffect, useMemo, useState } from "react";
import { ThemeContext, ThemeContextType } from "./ThemeContext";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme-mode");
    return (saved as "light" | "dark") || "light";
  });
  
  const [palette, setPalette] = useState<"blue" | "green" | "purple" | "pink" | "orange">(() => {
    const saved = localStorage.getItem("theme-palette");
    return (saved as "blue" | "green" | "purple" | "pink" | "orange") || "blue";
  });

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handleSetPalette = (newPalette: "blue" | "green" | "purple" | "pink" | "orange") => {
    setPalette(newPalette);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-mode", mode);
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-palette", palette);
    localStorage.setItem("theme-palette", palette);
  }, [palette]);

  const value: ThemeContextType = useMemo(
    () => ({
      mode,
      palette,
      toggleMode,
      setPalette: handleSetPalette,
    }),
    [mode, palette]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
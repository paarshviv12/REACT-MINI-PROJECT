import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({ isDark: false, toggle: () => {} });

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("travel_theme") === "dark"
  );

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("travel_theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("travel_theme", "light");
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

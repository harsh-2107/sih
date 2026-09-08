"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Only stores the non-sensitive theme preference.
// Do NOT use this storage key for anything security-sensitive.
const THEME_STORAGE_KEY = "crimenet-theme";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  // Initialise from localStorage synchronously to avoid a second render.
  // The FOUC-prevention inline script in layout.js already applied the class
  // to <html> before React hydrates, so we read from document here to stay in sync.
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // Safe to persist: only a UI preference, not auth or case data.
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage may be unavailable (private browsing); fail silently.
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

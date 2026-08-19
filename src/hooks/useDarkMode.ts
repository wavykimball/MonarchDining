import { useState, useEffect } from "react";

export function useDarkMode() {
  // Auto detect theme on any user device
  const getInitialTheme = (): boolean => {
    if (typeof window !== "undefined") {
      // Check manual override in localStorage first
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme !== null) {
        return savedTheme === "dark";
      }
      // Fallback to system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  };

  const [isDark, setIsDark] = useState<boolean>(getInitialTheme);

  // Update localStorage when state changes
  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  // Set up system preferences listener to auto-detect system changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update theme automatically if there is no manual override saved
      if (localStorage.getItem("theme") === null) {
        setIsDark(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return {
    isDark,
    setIsDark,
    toggleDarkMode,
  };
}

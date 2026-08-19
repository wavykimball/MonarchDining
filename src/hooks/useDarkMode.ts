import { useState } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  const toggleDarkMode = () => setIsDark((v) => !v);

  return {
    isDark,
    setIsDark,
    toggleDarkMode,
  };
}

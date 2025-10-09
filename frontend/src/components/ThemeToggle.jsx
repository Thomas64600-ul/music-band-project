import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="text-reveren-gold text-xl focus:outline-none transition hover:scale-110"
      aria-label="Basculer le thème clair/sombre"
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}



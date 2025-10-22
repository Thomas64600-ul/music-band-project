import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      // 🔹 Récupère le thème stocké, sinon détecte le thème système
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const htmlElement = document.querySelector("html"); // ✅ cible bien <html>

    if (darkMode) {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="text-[var(--accent)] dark:text-[var(--gold)] text-xl focus:outline-none transition-transform duration-300 hover:scale-110"
      aria-label="Basculer le thème clair/sombre"
      title={darkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}





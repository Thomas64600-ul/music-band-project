import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved
        ? saved === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;

    if (darkMode) {
      html.classList.add("dark");
      html.setAttribute("data-theme", "dark"); 
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      html.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="
        text-[var(--accent)] dark:text-[var(--gold)]
        text-xl sm:text-2xl
        focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60
        focus:outline-none rounded-full
        transition-transform duration-300 hover:scale-110
      "
      aria-pressed={darkMode}
      aria-label={darkMode ? "Activer le thème clair" : "Activer le thème sombre"}
      title={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
    >
      <span aria-hidden="true">
        {darkMode ? <FaSun /> : <FaMoon />}
      </span>
    </button>
  );
}




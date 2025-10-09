import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ animations

export default function Header({
  logoSrc,
  siteTitle = "Reveren",
  links = [],
  bgColor = "#0B101C",
  accentColor = "#FFD700",
  defaultDark = false,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(defaultDark);
  const [scrolled, setScrolled] = useState(false);

  // ✅ Gestion du mode sombre
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // ✅ Ombre dynamique au scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Variantes d’animation pour le menu
  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 
      ${scrolled ? "shadow-[0_2px_10px_rgba(0,0,0,0.4)] dark:shadow-[0_2px_12px_rgba(255,215,0,0.2)]" : ""}
      ${darkMode ? "bg-[#0A0F1C]" : "bg-[#0B101C]"}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* === BARRE SUPÉRIEURE === */}
      <div className="flex items-center justify-between px-4 py-2 md:px-10 md:py-4">
        {/* 🌙 Bouton Dark/Light */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`text-3xl transition-transform duration-300 hover:scale-125 ${
            darkMode
              ? "text-[#FFD700] drop-shadow-[0_0_10px_#FFD700]"
              : `text-[${accentColor}]`
          }`}
          aria-label="Basculer le mode sombre"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* 🎵 LOGO ANIMÉ */}
        <div className="flex justify-center flex-1">
          <Link to="/" aria-label="Accueil">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 0px rgba(255,215,0,0)",
                  "0 0 30px rgba(255,215,0,0.6)",
                  "0 0 0px rgba(255,215,0,0)",
                ],
              }}
              transition={{ duration: 3, ease: "easeInOut" }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 25px rgba(255,215,0,0.7)",
              }}
              className={`rounded-full transition-transform duration-500 hover:scale-105 ${
                darkMode ? "drop-shadow-[0_0_25px_#FFD700]" : ""
              }`}
            >
              <motion.img
                src={logoSrc}
                alt={`${siteTitle} Logo`}
                className="h-20 sm:h-28 md:h-40 lg:h-48 w-auto object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </motion.div>
          </Link>
        </div>

        {/* 🍔 MENU BURGER */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`text-4xl md:hidden transition-transform duration-300 hover:scale-125 ${
            darkMode
              ? "text-[#FFD700] drop-shadow-[0_0_10px_#FFD700]"
              : `text-[${accentColor}]`
          }`}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* === MENU DE NAVIGATION === */}
      <nav
        className={`transition-all duration-500 ease-in-out border-t border-gray-800 ${
          darkMode ? "bg-gray-900/95" : "bg-[#0F1626]"
        }`}
      >
        {/* 🖥️ Menu Desktop animé */}
        <motion.ul
          className="hidden md:flex justify-center items-center space-x-12 py-4 text-lg font-semibold text-gray-100"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
        >
          {links.map(({ name, path }) => (
            <motion.li key={path} variants={linkVariants}>
              <Link
                to={path}
                className={`hover:text-[${accentColor}] transition`}
              >
                {name}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* 📱 Menu mobile animé */}
        <motion.div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          variants={menuVariants}
          initial="hidden"
          animate={menuOpen ? "visible" : "hidden"}
        >
          <motion.ul
            className="flex flex-col items-center py-4 space-y-4 text-lg font-medium text-gray-100"
            variants={menuVariants}
          >
            {links.map(({ name, path }) => (
              <motion.li key={path} variants={linkVariants}>
                <Link
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`hover:text-[${accentColor}] transition`}
                >
                  {name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </nav>
    </header>
  );
}




















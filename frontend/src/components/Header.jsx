import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { motion,AnimatePresence } from "framer-motion";

function LinkItem({ to, children, onClick, className = "" }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      end
      className={({ isActive }) =>
        [
          
          "relative group inline-block text-gray-200 transition-colors duration-300",
          
          "hover:text-[#FFD700] focus-visible:text-[#FFD700] active:text-[#FFD700]",
         
          'after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[2px] after:bg-[#FFD700] after:transition-all after:duration-300',
          
          isActive ? "after:w-3/4 after:opacity-100" : "after:w-0 after:opacity-60",
          
          "group-hover:after:w-3/4 group-focus-visible:after:w-3/4 active:after:w-3/4",
          className,
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export default function Header({ logoSrc, links }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleTheme = () => setDarkMode((v) => !v);
  const toggleMenu = () => setMenuOpen((v) => !v);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-gray-800 ${
        darkMode
          ? isScrolled
            ? "bg-[#070B12]/95 shadow-[0_2px_15px_#FFD70030]"
            : "bg-[#0B0F17]/100"
          : isScrolled
          ? "bg-[#F2F2F2]/95 shadow-[0_2px_15px_#FFD70040]"
          : "bg-[#F2F2F2]/100"
      }`}
    >
     
      <div className="flex items-center justify-between px-4 sm:px-8 py-2 sm:py-3">
    
        <button
          onClick={toggleTheme}
          className="text-yellow-400 hover:scale-110 transition-transform duration-200"
          aria-label="Basculer le thème"
        >
          {darkMode ? <FaMoon size={20} /> : <FaSun size={20} />}
        </button>

      
        <div className="flex justify-center flex-1">
          <img
            src={logoSrc}
            alt="Logo REVEREN"
            className={`object-contain transition-all duration-500 ${
              isScrolled ? "h-12 sm:h-14" : "h-14 sm:h-16"
            } drop-shadow-[0_0_10px_#FFD70080] hover:drop-shadow-[0_0_18px_#FFD700]`}
          />
        </div>

       
        <button
          onClick={toggleMenu}
          className="text-yellow-400 hover:scale-110 transition-transform duration-200 sm:hidden"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

     
      <div className="hidden sm:flex justify-center border-t border-gray-800 py-2">
        <nav className="flex space-x-8 text-sm font-semibold">
          {links.map((l) => (
            <LinkItem key={l.name} to={l.path}>
              {l.name}
            </LinkItem>
          ))}
        </nav>
      </div>

     
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className={`sm:hidden flex flex-col items-center py-3 border-t border-gray-700 ${
              darkMode ? "bg-[#0B0F17]" : "bg-[#F2F2F2]"
            }`}
          >
            {links.map((l) => (
              <LinkItem
                key={l.name}
                to={l.path}
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center py-3 text-xl"
              >
                {l.name}
              </LinkItem>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
























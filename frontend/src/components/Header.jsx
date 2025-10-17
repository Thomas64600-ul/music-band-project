import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { User, LogOut, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const { user, isAdmin, logout } = useAuth();

  const toggleTheme = () => {
    setDarkMode((v) => !v);
    document.body.className = darkMode ? "light" : "dark";
  };

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
     
      {isAdmin && (
        <div className="bg-[#FFD700] text-black text-center text-sm py-1 font-semibold tracking-wide">
          Mode administrateur activé 🛠️
        </div>
      )}

     
      <div className="flex items-center justify-between px-4 sm:px-12 py-3 sm:py-5">
       
        <button
          onClick={toggleTheme}
          className="hidden sm:block text-yellow-400 hover:scale-110 transition-transform duration-200"
          aria-label="Basculer le thème"
        >
          {darkMode ? <FaMoon size={24} /> : <FaSun size={24} />}
        </button>

       
        <div className="flex justify-center items-center flex-1 sm:translate-x-[20px]">
          <motion.img
            src={logoSrc}
            alt="Logo REVEREN"
            animate={{
              boxShadow: [
                "0 0 15px #FFD70080",
                "0 0 25px #FFD70060",
                "0 0 15px #FFD70080",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className={`object-contain transition-all duration-500
              ${isScrolled ? "h-16 sm:h-[100px]" : "h-20 sm:h-[115px]"}
              drop-shadow-[0_0_14px_#FFD70090] hover:drop-shadow-[0_0_25px_#FFD700]`}
          />
        </div>

        
        <div className="hidden sm:flex items-center gap-4 text-sm ml-auto">
          {user ? (
            <>
              <span className="text-[#FFD700] flex items-center gap-2">
                <User size={16} />
                {user.firstname || user.email}
                {isAdmin && (
                  <span className="bg-[#FFD700] text-black text-xs px-2 py-1 rounded-md flex items-center gap-1">
                    <Shield size={12} /> Admin
                  </span>
                )}
              </span>
              <button
                onClick={logout}
                className="text-red-400 hover:text-red-500 flex items-center gap-1"
              >
                <LogOut size={14} /> Déconnexion
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                className="hover:text-[#FFD700] transition"
              >
                Inscription
              </NavLink>
              <NavLink to="/login" className="hover:text-[#FFD700] transition">
                Connexion
              </NavLink>
            </>
          )}
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
            className={`sm:hidden flex flex-col items-center py-4 border-t border-gray-700 ${
              darkMode ? "bg-[#0B0F17]" : "bg-[#F2F2F2]"
            }`}
          >
            {links.map((l) => (
              <LinkItem
                key={l.name}
                to={l.path}
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center py-3 text-lg"
              >
                {l.name}
              </LinkItem>
            ))}

            
            <div className="flex justify-center mt-4">
              <button
                onClick={toggleTheme}
                className="text-yellow-400 hover:scale-110 transition-transform duration-200"
                aria-label="Basculer le thème"
              >
                {darkMode ? <FaMoon size={22} /> : <FaSun size={22} />}
              </button>
            </div>

            
            <div className="flex flex-col items-center gap-3 mt-6 text-sm">
              {user ? (
                <>
                  <span className="text-[#FFD700] flex items-center gap-2">
                    <User size={16} />
                    {user.firstname || user.email}
                  </span>
                  {isAdmin && (
                    <span className="bg-[#FFD700] text-black text-xs px-2 py-1 rounded-md flex items-center gap-1">
                      <Shield size={12} /> Admin
                    </span>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="text-red-400 hover:text-red-500 flex items-center gap-1 mt-2"
                  >
                    <LogOut size={14} /> Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-[#FFD700]"
                  >
                    Inscription
                  </NavLink>
                  <NavLink
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-[#FFD700]"
                  >
                    Connexion
                  </NavLink>
                </>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}














































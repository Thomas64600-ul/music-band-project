import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { User, LogOut, Shield, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function LinkItem({ to, children, onClick, className = "" }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      end
      className={({ isActive }) =>
        [
          "relative group inline-block transition-colors duration-300",
          isActive
            ? "text-[var(--accent)]"
            : "text-[var(--text)] opacity-90 hover:text-[var(--accent)]",
          'after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[2px] after:bg-[var(--accent)] after:transition-all after:duration-300',
          isActive
            ? "after:w-3/4 after:opacity-100"
            : "after:w-0 after:opacity-60",
          "group-hover:after:w-3/4 group-focus-visible:after:w-3/4",
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
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAdmin, logout } = useAuth();

  
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((v) => !v);
  const toggleMenu = () => setMenuOpen((v) => !v);

  
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-[var(--border)] ${
        isScrolled
          ? "bg-[color-mix(in_oklab,var(--bg)_90%,black_10%)] shadow-[0_2px_25px_color-mix(in_oklab,var(--accent)_30%,transparent)] backdrop-blur-md"
          : "bg-[var(--bg)]"
      }`}
    >
     
      {isAdmin && (
        <div className="bg-[var(--accent)] text-[var(--bg)] text-center text-sm py-1 font-semibold tracking-wide border-b border-[color-mix(in_oklab,var(--accent)_80%,black_20%)] shadow-[0_0_12px_var(--accent)] animate-pulse">
          Mode administrateur activé
        </div>
      )}

     
      <div className="flex items-center justify-between px-4 sm:px-12 py-3 sm:py-5">
        
        <button
          onClick={toggleTheme}
          className="hidden sm:block text-[var(--accent)] hover:text-[color-mix(in_oklab,var(--accent)_80%,var(--gold)_20%)] hover:scale-110 transition-transform duration-200"
          aria-label="Basculer le thème clair/sombre"
        >
          {darkMode ? <FaSun size={22} /> : <FaMoon size={22} />}
        </button>

        
        <div className="flex justify-center items-center flex-1 sm:translate-x-[60px] md:translate-x-[80px]">
          <motion.img
            src={logoSrc}
            alt="Logo REVEREN"
            animate={{
              boxShadow: [
                "0 0 20px var(--accent)",
                "0 0 35px var(--gold)",
                "0 0 20px var(--accent)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className={`object-contain transition-all duration-500 ${
              isScrolled ? "h-16 sm:h-[95px]" : "h-20 sm:h-[110px]"
            } drop-shadow-[0_0_20px_var(--accent)] hover:drop-shadow-[0_0_30px_var(--gold)]`}
          />
        </div>

        
        <div className="hidden sm:flex items-center gap-4 text-sm ml-auto">
          {user ? (
            <>
              <span className="text-[var(--accent)] flex items-center gap-2 font-semibold">
                <User size={16} />
                {user.firstname || user.email}
                {isAdmin && (
                  <span className="bg-[var(--accent)] text-[var(--bg)] text-xs px-2 py-1 rounded-md flex items-center gap-1">
                    <Shield size={12} /> Admin
                  </span>
                )}
              </span>

              <button
                onClick={logout}
                className="text-[var(--accent)] hover:text-[color-mix(in_oklab,var(--accent)_80%,var(--gold)_20%)] flex items-center gap-1"
              >
                <LogOut size={14} /> Déconnexion
              </button>
            </>
          ) : (
            <>
              <NavLink to="/register" className="hover:text-[var(--accent)]">
                Inscription
              </NavLink>
              <NavLink to="/login" className="hover:text-[var(--accent)]">
                Connexion
              </NavLink>
            </>
          )}
        </div>

        
        <button
          onClick={toggleMenu}
          className="text-[var(--accent)] hover:text-[color-mix(in_oklab,var(--accent)_80%,var(--gold)_20%)] hover:scale-110 transition-transform duration-200 sm:hidden"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

     
      <div className="hidden sm:flex flex-col items-center">
        <div className="flex justify-center border-t border-[var(--border)] py-2 bg-[var(--bg)] relative w-full">
          <nav className="flex space-x-8 text-sm font-semibold">
            {links.map((l) => (
              <LinkItem key={l.name} to={l.path}>
                {l.name}
              </LinkItem>
            ))}

            {isAdmin && (
              <LinkItem
                to="/admin"
                className="text-[var(--accent)] hover:text-[color-mix(in_oklab,var(--accent)_80%,var(--gold)_20%)]"
              >
                Dashboard
              </LinkItem>
            )}
          </nav>

          <motion.div
            initial={{ opacity: 0.4 }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              boxShadow: [
                "0 0 12px var(--accent)",
                "0 0 18px var(--gold)",
                "0 0 12px var(--accent)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--accent)]"
          />
        </div>
      </div>

      
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden flex flex-col items-center py-4 border-t border-[var(--border)] bg-[var(--bg)]"
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

            {isAdmin && (
              <LinkItem
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center py-3 text-[var(--accent)] font-semibold"
              >
                <LayoutDashboard size={18} className="inline-block mr-2" />
                Dashboard
              </LinkItem>
            )}

            
            <div className="flex justify-center mt-4">
              <button
                onClick={toggleTheme}
                className="text-[var(--accent)] hover:text-[color-mix(in_oklab,var(--accent)_80%,var(--gold)_20%)] hover:scale-110 transition-transform duration-200"
                aria-label="Basculer le thème"
              >
                {darkMode ? <FaSun size={22} /> : <FaMoon size={22} />}
              </button>
            </div>

           
            <div className="flex flex-col items-center gap-3 mt-6 text-sm">
              {user ? (
                <>
                  <span className="text-[var(--accent)] flex items-center gap-2">
                    <User size={16} />
                    {user.firstname || user.email}
                  </span>
                  {isAdmin && (
                    <span className="bg-[var(--accent)] text-[var(--bg)] text-xs px-2 py-1 rounded-md flex items-center gap-1">
                      <Shield size={12} /> Admin
                    </span>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="text-[var(--accent)] hover:text-[color-mix(in_oklab,var(--accent)_80%,var(--gold)_20%)] flex items-center gap-1 mt-2"
                  >
                    <LogOut size={14} /> Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-[var(--accent)]"
                  >
                    Inscription
                  </NavLink>
                  <NavLink
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-[var(--accent)]"
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




















































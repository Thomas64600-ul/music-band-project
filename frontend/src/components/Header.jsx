import { useState, useEffect, lazy, Suspense } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import logo from "/logo-small.webp"; 


const FaBars = lazy(() => import("react-icons/fa").then(m => ({ default: m.FaBars })));
const FaTimes = lazy(() => import("react-icons/fa").then(m => ({ default: m.FaTimes })));
const FaSun = lazy(() => import("react-icons/fa").then(m => ({ default: m.FaSun })));
const FaMoon = lazy(() => import("react-icons/fa").then(m => ({ default: m.FaMoon })));
const { User, LogOut, Shield } = await import("lucide-react");

function LinkItem({ to, children, onClick, className = "" }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      end
      className={({ isActive }) =>
        [
          "relative group inline-block transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-md",
          isActive
            ? "text-[var(--accent)]"
            : "text-[var(--text)] opacity-90 hover:text-[var(--accent)]",
          'after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[2px] after:bg-[var(--accent)] after:transition-all after:duration-300',
          isActive ? "after:w-3/4 after:opacity-100" : "after:w-0 after:opacity-60",
          "group-hover:after:w-3/4 group-focus-visible:after:w-3/4",
          className,
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export default function Header({ links = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAdmin, logout } = useAuth();

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
    html.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-[var(--border)] ${
        isScrolled
          ? darkMode
            ? "bg-[color-mix(in_oklab,var(--bg)_90%,black_10%)] shadow-[0_2px_25px_color-mix(in_oklab,var(--accent)_30%,transparent)] backdrop-blur-md"
            : "bg-white shadow-[0_2px_20px_rgba(0,0,0,0.05)]"
          : "bg-[var(--bg)]"
      }`}
      role="banner"
    >
      {isAdmin && (
        <div className="bg-[var(--accent)] text-[var(--bg)] text-center text-sm py-1 font-semibold tracking-wide border-b border-[color-mix(in_oklab,var(--accent)_80%,black_20%)] shadow-[0_0_12px_var(--accent)] animate-pulse">
          Mode administrateur activé
        </div>
      )}

      <div className="flex items-center justify-between px-4 sm:px-12 py-3 sm:py-5 relative">
       
        <Suspense fallback={null}>
          <button
            onClick={() => setDarkMode(v => !v)}
            className="hidden sm:block text-[var(--accent)] hover:text-[var(--gold)] hover:scale-110 transition-transform duration-200"
            aria-label="Basculer le thème clair/sombre"
          >
            {darkMode ? <FaSun size={22} /> : <FaMoon size={22} />}
          </button>
        </Suspense>

        <div className="flex justify-center items-center flex-1 sm:translate-x-[60px] md:translate-x-[80px] relative z-0">
          <div className="absolute -z-10 w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full bg-[var(--accent)] blur-[80px] opacity-60"></div>

          <motion.img
            src={logo}
            alt="Logo du groupe REVEREN"
            width="140"
            height="40"
            fetchpriority="high"
            decoding="async"
            animate={{ scale: isScrolled ? 0.95 : 1 }}
            transition={{ duration: 0.4 }}
            className="object-contain transition-transform duration-500 pointer-events-none h-16 sm:h-[95px] rounded-md"
          />
        </div>

        <div className="hidden sm:flex items-center gap-4 text-sm ml-auto relative z-10">
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
                className="text-[var(--accent)] hover:text-[var(--gold)] flex items-center gap-1 transition-colors"
              >
                <LogOut size={14} /> Déconnexion
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                className="hover:text-[var(--accent)] transition-colors"
              >
                Inscription
              </NavLink>
              <NavLink
                to="/login"
                className="hover:text-[var(--accent)] transition-colors"
              >
                Connexion
              </NavLink>
            </>
          )}
        </div>

        <Suspense fallback={null}>
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="text-[var(--accent)] hover:text-[var(--gold)] hover:scale-110 transition-transform duration-200 sm:hidden z-20"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </Suspense>
      </div>
    </header>
  );
}
























































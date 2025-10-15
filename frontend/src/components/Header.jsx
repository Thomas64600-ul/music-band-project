import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, LogOut, Shield } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

export default function Header({ logoSrc, links }) {
  const { user, isAdmin, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 bg-dark text-light z-50 border-b border-[#FFD70040]">
      {/* ===== Bandeau admin ===== */}
      {isAdmin && (
        <div className="bg-[#FFD700] text-black text-center text-sm py-1 font-semibold tracking-wide">
          Mode administrateur activé 🛠️
        </div>
      )}

      {/* ===== Barre principale ===== */}
      <div
        className="relative flex justify-between items-center px-6 md:px-12 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#FFD70040]"
        style={{
          height: "110px", // hauteur fixe harmonieuse (ajustable)
        }}
      >
        {/* --- Bouton DarkMode à gauche --- */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>

        {/* --- Logo centré parfaitement --- */}
        <Link
          to="/"
          className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2"
        >
          <img
            src={logoSrc}
            alt="Logo REVEREN"
            className="h-[80px] md:h-[90px] w-auto object-contain hover:scale-105 transition-transform"
            style={{
              maxHeight: "90px",
              paddingBottom: "2px", // évite le contact avec la bordure
            }}
          />
        </Link>

        {/* --- Zone utilisateur à droite --- */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-[#FFD700] flex items-center gap-2">
                <User size={16} />
                {user.firstname || user.email}
                {isAdmin && (
                  <span className="bg-[#FFD700] text-black text-xs px-2 py-1 rounded-md flex items-center gap-1">
                    <Shield size={12} />
                    Admin
                  </span>
                )}
              </span>
              <button
                onClick={logout}
                className="text-red-400 hover:text-red-500 flex items-center gap-1 text-sm"
              >
                <LogOut size={14} /> Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="hover:text-[#FFD700] text-sm">
                Inscription
              </Link>
              <Link to="/login" className="hover:text-[#FFD700] text-sm">
                Connexion
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ===== Barre de navigation ===== */}
      <nav className="bg-[#0A0A0A] flex justify-center py-3 border-t border-[#FFD70040]">
        <ul className="flex gap-6 text-sm md:text-base">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="hover:text-[#FFD700] transition"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}




























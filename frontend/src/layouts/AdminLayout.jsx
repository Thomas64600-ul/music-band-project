import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LogOut,
  LayoutDashboard,
  Newspaper,
  Music,
  MessageCircle,
  Users,
  DollarSign,
  BarChart3,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const { logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/admin", Icon: LayoutDashboard },
    { name: "Articles", path: "/admin/articles", Icon: Newspaper },
    { name: "Concerts", path: "/admin/concerts", Icon: Music },
    { name: "Messages", path: "/admin/messages", Icon: MessageCircle },
    { name: "Utilisateurs", path: "/admin/users", Icon: Users },
    { name: "Dons", path: "/admin/donations", Icon: DollarSign },
    { name: "Statistiques", path: "/admin/stats", Icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-[#F2F2F2]">
      {/* === Overlay mobile === */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* === Sidebar gauche === */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#111] border-r border-[#FFD70040] flex flex-col justify-between transform transition-transform duration-300 ease-in-out z-50
        ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* --- Header logo --- */}
        <div className="flex justify-between items-center p-6 border-b border-[#FFD70040]">
          <Link
            to="/"
            className="text-[#FFD700] font-bold text-xl tracking-wider"
            onClick={() => setMenuOpen(false)}
          >
            REVEREN Admin
          </Link>
          <button
            className="text-[#FFD700] md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* --- Navigation --- */}
        <nav className="flex flex-col space-y-1 px-3 py-4 overflow-y-auto">
          {navLinks.map(({ name, path, Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                location.pathname === path
                  ? "bg-[#FFD700] text-black font-semibold"
                  : "hover:bg-[#1a1a1a] text-gray-300 hover:text-[#FFD700]"
              }`}
            >
              <Icon size={18} />
              {name}
            </Link>
          ))}
        </nav>

        {/* --- Footer --- */}
        <div className="p-6 border-t border-[#FFD70040] flex flex-col items-center gap-3">
          <Link
            to="/"
            className="text-sm text-[#FFD700] hover:underline mb-2"
            onClick={() => setMenuOpen(false)}
          >
            Retour au site
          </Link>
          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 text-red-400 hover:text-red-500 text-sm"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* === Zone principale === */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* --- Header mobile --- */}
        <div className="md:hidden flex justify-between items-center bg-[#111] border-b border-[#FFD70040] px-6 py-4">
          <h1 className="text-lg font-semibold text-[#FFD700]">
            Panneau admin
          </h1>
          <button
            onClick={() => setMenuOpen(true)}
            className="text-[#FFD700] hover:text-white transition"
          >
            <Menu size={26} />
          </button>
        </div>

        {/* --- Contenu principal --- */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-[#0A0A0A] text-[#F2F2F2] min-h-screen">
          <div className="max-w-4xl mx-auto bg-[#111] border border-[#FFD70040] rounded-xl p-8 animate-fade-in shadow-lg shadow-black/30">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

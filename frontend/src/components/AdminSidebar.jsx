import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Music2,
  Gift,
  Mail,
  MessageSquareQuote,
  Users,
  PieChart,
  LogOut,
  Disc,
} from "lucide-react";

export default function AdminSidebar() {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  const links = [
    { name: "Dashboard", path: "/admin", Icon: LayoutDashboard },
    { name: "Articles", path: "/admin/articles", Icon: FileText },
    { name: "Musique", path: "/admin/musics", Icon: Disc },
    { name: "Concerts", path: "/admin/concerts", Icon: Music2 },
    { name: "Dons", path: "/admin/donations", Icon: Gift },
    { name: "Messages", path: "/admin/messages", Icon: Mail },
    { name: "Commentaires", path: "/admin/comments", Icon: MessageSquareQuote },
    { name: "Utilisateurs", path: "/admin/users", Icon: Users },
    { name: "Statistiques", path: "/admin/stats", Icon: PieChart },
  ];

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erreur déconnexion :", error);
    }
  }

  return (
    <aside
      role="navigation"
      aria-label="Menu d’administration"
      className="
        hidden md:flex flex-col fixed left-0
        top-[217px] h-[calc(100vh-217px)] w-64
        bg-[var(--bg)] text-[var(--text)]
        border-r border-transparent
        shadow-[inset_-1px_0_12px_rgba(179,18,45,0.3)]
        transition-all duration-700 ease-in-out
        z-40
      "
    >
     
      <div
        className="
          py-5 text-center select-none
          bg-[color-mix(in_oklab,var(--bg)_96%,var(--accent)_4%)]
          shadow-[0_2px_15px_rgba(179,18,45,0.25)]
        "
      >
        <h1
          tabIndex={0}
          onClick={() => navigate("/admin")}
          onKeyDown={(e) => e.key === "Enter" && navigate("/admin")}
          className="
            text-2xl font-bold text-[var(--accent)] cursor-pointer
            drop-shadow-[0_0_6px_var(--accent)]
            hover:scale-[1.05] transition-transform duration-300
            focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 rounded-md px-2
          "
        >
          REVEREN Admin
        </h1>
      </div>

      <nav className="flex-1 mt-5 px-4 space-y-1 overflow-y-auto" aria-label="Liens d’administration">
        {links.map(({ name, path, Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/admin"}
            className={({ isActive }) =>
              `
              flex items-center gap-3 px-4 py-2 rounded-lg font-medium
              transition-all duration-300 focus:outline-none focus:ring-2
              focus:ring-[var(--accent)]/50
              ${
                isActive
                  ? "bg-[var(--accent)]/20 text-[var(--accent)] shadow-[0_0_10px_var(--accent)]/30"
                  : "hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
              }
              `
            }
            aria-current={({ isActive }) => (isActive ? "page" : undefined)}
          >
            <Icon size={18} aria-hidden="true" />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      <div
        className="
          mt-auto p-4
          bg-[color-mix(in_oklab,var(--bg)_96%,var(--accent)_4%)]
          shadow-[0_-2px_15px_rgba(179,18,45,0.25)]
        "
      >
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-2 w-full justify-center
            text-[var(--accent)] font-medium
            hover:text-[var(--gold)]
            focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 rounded-md py-2
            transition-all duration-300
          "
        >
          <LogOut size={18} aria-hidden="true" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}

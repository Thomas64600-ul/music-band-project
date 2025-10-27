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

  return (
    <aside
      className="
        hidden md:flex flex-col fixed left-0 top-0 h-full w-64
        bg-[var(--bg)] text-[var(--text)]
        border-r border-[var(--accent)]/30
        shadow-[0_0_15px_var(--accent)]/15
        transition-colors duration-700 ease-in-out
        z-50
      "
    >
    
      <div className="py-6 text-center border-b border-[var(--accent)]/30 bg-[var(--bg-secondary)]">
        <h1
          onClick={() => navigate("/admin")}
          className="
            text-2xl font-bold text-[var(--accent)] cursor-pointer
            drop-shadow-[0_0_6px_var(--accent)]
            hover:scale-[1.03] transition-transform duration-300
          "
        >
          REVEREN Admin
        </h1>
      </div>

      <nav className="flex-1 mt-8 px-4 space-y-1">
        {links.map(({ name, path, Icon }) => (
          <NavLink
            key={path}
            to={path}
            end
            className={({ isActive }) =>
              `
              flex items-center gap-3 px-4 py-2 rounded-lg font-medium
              transition-all duration-300
              ${
                isActive
                  ? "bg-[var(--accent)]/20 text-[var(--accent)] shadow-[0_0_10px_var(--accent)]/30"
                  : "hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
              }
              `
            }
          >
            <Icon size={18} />
            {name}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-[var(--accent)]/30 p-4 bg-[var(--bg-secondary)]">
        <button
          onClick={logout}
          className="
            flex items-center gap-2 text-[var(--accent)] font-medium
            hover:text-[var(--gold)] transition-all duration-300
          "
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

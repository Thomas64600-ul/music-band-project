import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Music2,
  Gift,
  Mail,
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
    { name: "Musique", path: "/admin/musics", Icon: Disc }, // 🎵 ajout
    { name: "Concerts", path: "/admin/concerts", Icon: Music2 },
    { name: "Dons", path: "/admin/donations", Icon: Gift },
    { name: "Messages", path: "/admin/messages", Icon: Mail },
    { name: "Utilisateurs", path: "/admin/users", Icon: Users },
    { name: "Statistiques", path: "/admin/stats", Icon: PieChart },
  ];

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-[#F9F9F9] border-r border-gray-300 text-gray-800 shadow-lg z-50">
      
      <div className="py-6 text-center border-b border-gray-300 bg-white">
        <h1
          className="text-2xl font-bold text-[#B3122D] cursor-pointer"
          onClick={() => navigate("/admin")}
        >
          REVEREN Admin
        </h1>
      </div>

      
      <nav className="flex-1 mt-8 px-4 space-y-2">
        {links.map(({ name, path, Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-[#B3122D20] text-[#B3122D] font-medium"
                  : "hover:bg-gray-100"
              }`
            }
          >
            <Icon size={18} />
            {name}
          </NavLink>
        ))}
      </nav>

      
      <div className="border-t border-gray-300 p-4 bg-white">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-[#B3122D] hover:text-red-700 transition"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}


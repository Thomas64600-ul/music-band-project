import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
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
    { name: "Concerts", path: "/admin/concerts", Icon: Music2 },
    { name: "Dons", path: "/admin/donations", Icon: Gift },
    { name: "Messages", path: "/admin/messages", Icon: Mail },
    { name: "Utilisateurs", path: "/admin/users", Icon: Users },
    { name: "Statistiques", path: "/admin/stats", Icon: PieChart },
  ];

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-[#0A0A0A] border-r border-[#FFD70040] text-[#F2F2F2] shadow-xl z-50">
      <div className="py-6 text-center border-b border-gray-800">
        <h1
          className="text-2xl font-bold text-[#FFD700] cursor-pointer"
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
                  ? "bg-[#FFD70020] text-[#FFD700]"
                  : "hover:bg-[#FFD70010]"
              }`
            }
          >
            <Icon size={18} />
            {name}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-800 p-4">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-400 hover:text-red-500"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

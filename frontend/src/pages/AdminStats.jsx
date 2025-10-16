import { useEffect, useState } from "react";
import { get } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Button from "../components/Button";

export default function AdminStats() {
  const [stats, setStats] = useState({
    users: [],
    articles: 0,
    concerts: 0,
    donations: 0,
  });
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

 
  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  
  useEffect(() => {
    (async () => {
      try {
        const [usersRes, articlesRes, concertsRes, donationsRes] =
          await Promise.all([
            get("/users"),
            get("/articles"),
            get("/concerts"),
            get("/donations"),
          ]);

        console.log("Résultats API stats :", {
          usersRes,
          articlesRes,
          concertsRes,
          donationsRes,
        });

      
        const users = Array.isArray(usersRes)
          ? usersRes
          : usersRes.users || [];

        const articles = Array.isArray(articlesRes)
          ? articlesRes
          : articlesRes.articles || [];

        const concerts = Array.isArray(concertsRes)
          ? concertsRes
          : concertsRes.concerts || [];

        const donations = Array.isArray(donationsRes)
          ? donationsRes
          : donationsRes.donations || [];

        const totalDonations = donations.reduce(
          (sum, d) => sum + (parseFloat(d.amount) || 0),
          0
        );

        setStats({
          users,
          articles: articles.length,
          concerts: concerts.length,
          donations: totalDonations,
        });
      } catch (e) {
        console.error("Erreur chargement stats :", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400">
        Chargement des statistiques...
      </p>
    );

  
  const roleData = [
    { name: "Admin", value: stats.users.filter((u) => u.roles === "admin").length },
    { name: "Vendeur", value: stats.users.filter((u) => u.roles === "seller").length },
    { name: "Utilisateur", value: stats.users.filter((u) => u.roles === "buyer").length },
  ];

  const COLORS = ["#FFD700", "#B3122D", "#00E0FF"];

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] py-12 px-6 sm:px-12 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-[#111] border border-[#FFD70040] rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-bold text-center text-[#FFD700] mb-8">
          Statistiques globales
        </h1>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#151515] rounded-xl p-6 text-center border border-gray-700">
            <p className="text-gray-400">Utilisateurs</p>
            <p className="text-3xl font-bold text-[#FFD700]">{stats.users.length}</p>
          </div>

          <div className="bg-[#151515] rounded-xl p-6 text-center border border-gray-700">
            <p className="text-gray-400">Articles</p>
            <p className="text-3xl font-bold text-[#FFD700]">{stats.articles}</p>
          </div>

          <div className="bg-[#151515] rounded-xl p-6 text-center border border-gray-700">
            <p className="text-gray-400">Concerts</p>
            <p className="text-3xl font-bold text-[#FFD700]">{stats.concerts}</p>
          </div>

          <div className="bg-[#151515] rounded-xl p-6 text-center border border-gray-700">
            <p className="text-gray-400">Total des dons (€)</p>
            <p className="text-3xl font-bold text-[#FFD700]">
              {stats.donations.toFixed(2)}
            </p>
          </div>
        </div>

        
        <div className="bg-[#151515] rounded-xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-[#FFD700] mb-6 text-center">
            Répartition des rôles utilisateurs
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        
        <div className="mt-10 text-center">
          <Button variant="secondary" onClick={() => navigate("/admin")}>
            Retour Dashboard
          </Button>
        </div>
      </div>
    </section>
  );
}


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
    musics: 0,
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
        const [usersRes, articlesRes, concertsRes, musicsRes, donationsRes] =
          await Promise.all([
            get("/users"),
            get("/articles"),
            get("/concerts"),
            get("/musics"),
            get("/donations"),
          ]);

        const users = Array.isArray(usersRes)
          ? usersRes
          : usersRes.users || [];

        const articles = Array.isArray(articlesRes)
          ? articlesRes
          : articlesRes.articles || [];

        const concerts = Array.isArray(concertsRes)
          ? concertsRes
          : concertsRes.concerts || [];

        const musics = Array.isArray(musicsRes)
          ? musicsRes
          : musicsRes.musics || [];

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
          musics: musics.length,
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
      <p className="text-center mt-10 text-gray-400 animate-pulse">
        Chargement des statistiques...
      </p>
    );

  const roleData = [
    { name: "Admins", value: stats.users.filter((u) => u.roles === "admin").length },
    { name: "Vendeurs", value: stats.users.filter((u) => u.roles === "seller").length },
    { name: "Utilisateurs", value: stats.users.filter((u) => u.roles === "buyer").length },
  ];

  const COLORS = ["#B3122D", "#FF4C4C", "#F2F2F2"];

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] py-8 sm:py-10 px-4 sm:px-12 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-[#111] border border-[#B3122D50] rounded-2xl shadow-[0_0_25px_#B3122D30] p-6 sm:p-10 relative overflow-hidden">
        {/* Halo lumineux */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#B3122D40] rounded-full blur-[150px] opacity-50 pointer-events-none"></div>

        {/* Titre */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-[#B3122D] drop-shadow-[0_0_15px_#B3122D80] mb-8 sm:mb-12">
          Statistiques globales
        </h1>

        {/* --- Statistiques principales --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {[
            { label: "Utilisateurs", value: stats.users.length },
            { label: "Articles", value: stats.articles },
            { label: "Concerts", value: stats.concerts },
            { label: "Musiques", value: stats.musics },
            { label: "Total dons (€)", value: stats.donations.toFixed(2) },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#151515] rounded-xl p-3 sm:p-6 text-center border border-[#B3122D50] shadow-[0_0_10px_#B3122D20] hover:shadow-[0_0_20px_#B3122D40] hover:scale-[1.02] transition-all duration-300"
            >
              <p className="text-gray-400 text-sm sm:text-base mb-1 sm:mb-2">{stat.label}</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#FF4C4C] tracking-wide">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

       
        <div className="bg-[#151515] rounded-2xl p-4 sm:p-6 border border-[#B3122D50] shadow-[0_0_20px_#B3122D20]">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#FF4C4C] mb-4 sm:mb-6 text-center">
            Répartition des rôles utilisateurs
          </h2>
          <div className="w-full h-[250px] sm:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  sm={{ outerRadius: 100 }}
                  dataKey="value"
                  label
                >
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0A0A0A",
                    border: "1px solid #B3122D",
                    color: "#F2F2F2",
                    fontSize: "0.8rem",
                  }}
                />
                <Legend
                  wrapperStyle={{
                    color: "#F2F2F2",
                    fontSize: "0.8rem",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      
        <div className="mt-8 sm:mt-10 text-center">
          <Button
            variant="secondary"
            onClick={() => navigate("/admin")}
            className="border border-[#B3122D] text-[#B3122D] hover:bg-[#B3122D] hover:text-white font-semibold px-6 py-2 rounded-xl shadow-[0_0_8px_#B3122D40] transition text-sm sm:text-base"
          >
            ⏎ Retour Dashboard
          </Button>
        </div>
      </div>
    </section>
  );
}




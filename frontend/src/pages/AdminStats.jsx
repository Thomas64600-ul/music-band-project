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
import { motion } from "framer-motion";

export default function AdminStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  
  useEffect(() => {
    (async () => {
      try {
        const res = await get("/stats");
        setStats(res.data || res);
      } catch (e) {
        console.error("Erreur chargement stats :", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-[var(--subtext)] animate-pulse">
        Chargement des statistiques...
      </p>
    );

  if (!stats)
    return (
      <p className="text-center mt-10 text-red-500">
        Impossible de charger les statistiques.
      </p>
    );

 
  const roles = stats.rolesDistribution || {};
  const roleData = [
    { name: "Admins", value: roles.admin || 0 },
    { name: "Utilisateurs", value: roles.user || 0 },
  ];

  const COLORS = ["#B3122D", "#FFD700"];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="
        min-h-screen py-8 sm:py-10 px-4 sm:px-12 
        flex flex-col items-center
        bg-[var(--bg)] text-[var(--text)]
        transition-colors duration-700 ease-in-out
      "
    >
      <div
        className="
          w-full max-w-5xl relative overflow-hidden
          bg-[var(--bg-secondary)] border border-[var(--accent)]/40
          rounded-2xl shadow-[0_0_25px_var(--accent)]/30
          p-6 sm:p-10
        "
      >
        
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[var(--accent)]/30 rounded-full blur-[150px] opacity-50 pointer-events-none"></div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-[var(--accent)] drop-shadow-[0_0_15px_var(--accent)] mb-8 sm:mb-12">
          Statistiques globales
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {[
            { label: "Utilisateurs", value: stats.usersCount },
            { label: "Articles", value: stats.articlesCount },
            { label: "Concerts", value: stats.concertsCount },
            { label: "Musiques", value: stats.musicsCount },
            {
              label: "Total dons (€)",
              value: stats.totalDonations.toFixed(2),
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="
                bg-[var(--bg)] rounded-xl p-3 sm:p-6 text-center
                border border-[var(--accent)]/40
                shadow-[0_0_10px_var(--accent)]/20
                hover:shadow-[0_0_20px_var(--accent)]/40
                hover:scale-[1.02] transition-all duration-300
              "
            >
              <p className="text-[var(--subtext)] text-sm sm:text-base mb-1 sm:mb-2">
                {stat.label}
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)] tracking-wide">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div
          className="
            bg-[var(--bg)] rounded-2xl p-4 sm:p-6
            border border-[var(--accent)]/40
            shadow-[0_0_20px_var(--accent)]/20
          "
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--accent)] mb-4 sm:mb-6 text-center">
            Répartition des rôles utilisateurs
          </h2>

          <div className="w-full h-[250px] sm:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label
                >
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg)",
                    border: "1px solid var(--accent)",
                    color: "var(--text)",
                    fontSize: "0.8rem",
                  }}
                />
                <Legend
                  wrapperStyle={{
                    color: "var(--text)",
                    fontSize: "0.8rem",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 text-center">
          <Button
            onClick={() => navigate("/admin")}
            className="
              border border-[var(--accent)] text-[var(--accent)]
              hover:bg-[var(--accent)] hover:text-[var(--bg)]
              font-semibold px-6 py-2 rounded-xl
              shadow-[0_0_8px_var(--accent)]/40 transition text-sm sm:text-base
            "
          >
            ⏎ Retour Dashboard
          </Button>
        </div>
      </div>
    </motion.section>
  );
}





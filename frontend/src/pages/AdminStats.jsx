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
      <p className="text-center mt-10 text-[var(--accent)]">
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
        min-h-screen py-12 px-6 sm:px-12
        flex flex-col items-center
        bg-[var(--bg)] text-[var(--text)]
        relative overflow-hidden
        transition-colors duration-700 ease-in-out
      "
    >
     
      <div
        className="
          absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_center,#B3122D33_0%,transparent_70%)]
          blur-[150px] opacity-70
        "
      ></div>

      <div
        className="
          relative w-full max-w-6xl
          border border-[var(--accent)]/40
          rounded-2xl
          shadow-[0_0_25px_var(--accent)]
          hover:shadow-[0_0_40px_var(--accent)]
          bg-[var(--surface)]
          transition-all duration-500
          p-6 sm:p-10
        "
      >
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[var(--accent)]/25 rounded-full blur-[150px] opacity-60 pointer-events-none"></div>

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
              value: stats.totalDonations?.toFixed(2) || "0.00",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="
                bg-[var(--surface)]
                rounded-xl p-3 sm:p-6 text-center
                border border-[var(--accent)]/40
                shadow-[0_0_15px_var(--accent)]
                hover:shadow-[0_0_25px_var(--accent)]
                hover:scale-[1.03]
                transition-all duration-300
              "
            >
              <p className="text-[var(--subtext)] text-sm sm:text-base mb-1 sm:mb-2">
                {stat.label}
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)] tracking-wide">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
            bg-[var(--surface)]
            rounded-2xl p-4 sm:p-6
            border border-[var(--accent)]/40
            shadow-[0_0_25px_var(--accent)]
            transition-all duration-500
          "
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--accent)] mb-6 text-center drop-shadow-[0_0_8px_var(--accent)]">
            Répartition des rôles utilisateurs
          </h2>

          <div className="w-full flex justify-center">
            <div className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleData}
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    dataKey="value"
                    label={({ name, value }) => `${name} (${value})`}
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
        </motion.div>

        <div className="mt-10 text-center">
          <Button
            onClick={() => navigate("/admin")}
            className="
              border border-[var(--accent)] text-[var(--accent)]
              hover:bg-[var(--accent)] hover:text-[var(--bg)]
              font-semibold px-6 py-2 rounded-xl
              shadow-[0_0_10px_var(--accent)]
              transition-all duration-300 text-sm sm:text-base
              active:scale-[0.97]
            "
          >
            ⏎ Retour Dashboard
          </Button>
        </div>
      </div>

      <div
        className="
          absolute bottom-0 left-1/2 -translate-x-1/2
          w-[60vw] h-[60vw]
          bg-[radial-gradient(circle_at_center,#B3122D33_0%,transparent_70%)]
          blur-[120px] opacity-60 pointer-events-none
        "
      ></div>
    </motion.section>
  );
}








import { useEffect, useState } from "react";
import { get, del } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { motion } from "framer-motion";

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const data = await get("/donations");
        setDonations(Array.isArray(data.data) ? data.data : data);
      } catch (e) {
        console.error("Erreur chargement dons :", e);
        setDonations([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Supprimer ce don ?")) return;
    try {
      await del(`/donations/${id}`);
      setDonations((prev) => prev.filter((d) => d.id !== id));
    } catch (e) {
      console.error("Erreur suppression don :", e);
      alert("Erreur lors de la suppression");
    }
  }

  const total = donations.reduce(
    (sum, d) => sum + (parseFloat(d.amount) || 0),
    0
  );

  if (loading)
    return (
      <p className="text-center mt-10 text-[var(--subtext)] animate-pulse">
        Chargement des dons...
      </p>
    );

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
          border border-[color-mix(in_oklab,var(--accent)_70%,transparent_30%)]
          rounded-2xl
          shadow-[0_0_25px_color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
          hover:shadow-[0_0_40px_color-mix(in_oklab,var(--accent)_60%,transparent_40%)]
          bg-[color-mix(in_oklab,var(--bg)_96%,var(--accent)_4%)]
          transition-all duration-500
          p-6 sm:p-10
        "
      >
      
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-[var(--accent)] drop-shadow-[0_0_12px_var(--accent)]">
            Gestion des dons
          </h1>
          <Button
            onClick={() => navigate("/admin")}
            className="
              border border-[var(--accent)] text-[var(--accent)]
              hover:bg-[var(--accent)] hover:text-[var(--bg)]
              font-semibold px-6 py-2 rounded-xl
              shadow-[0_0_12px_var(--accent)]/40 transition-all duration-300
            "
          >
            ⏎ Retour Dashboard
          </Button>
        </div>

        <div
          className="
            mb-10 py-5 px-6 text-center rounded-2xl
            border border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
            bg-[color-mix(in_oklab,var(--bg)_94%,var(--accent)_6%)]
            shadow-[0_0_25px_color-mix(in_oklab,var(--accent)_30%,transparent_70%)]
            hover:shadow-[0_0_35px_color-mix(in_oklab,var(--accent)_50%,transparent_50%)]
            transition-all duration-500
          "
        >
          <p className="text-xl font-semibold">
            Total collecté :{" "}
            <span className="text-[var(--accent)] font-bold drop-shadow-[0_0_6px_var(--accent)]">
              {total.toFixed(2)} €
            </span>
          </p>
        </div>

        {donations.length === 0 ? (
          <p className="text-[var(--subtext)] text-center italic">
            Aucun don enregistré pour le moment.
          </p>
        ) : (
          <>
           
            <div className="block sm:hidden space-y-4">
              {donations.map((d) => (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="
                    border border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
                    rounded-xl p-4
                    bg-[color-mix(in_oklab,var(--bg)_95%,var(--accent)_5%)]
                    shadow-[0_0_20px_color-mix(in_oklab,var(--accent)_25%,transparent_75%)]
                    flex flex-col gap-2
                  "
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-[var(--accent)]">
                      {d.user_name || "Anonyme"}
                    </h3>
                    <p
                      className={`font-bold ${
                        d.status === "succeeded"
                          ? "text-green-500"
                          : "text-[var(--accent)]"
                      } text-sm`}
                    >
                      {d.status === "succeeded" ? "Validé" : "En attente"}
                    </p>
                  </div>

                  <p className="text-[var(--text)] text-sm italic">
                    {d.message || "—"}
                  </p>

                  <p className="text-[var(--accent)] font-bold">
                    {parseFloat(d.amount).toFixed(2)} €
                  </p>

                  <Button
                    onClick={() => handleDelete(d.id)}
                    className="
                      bg-[var(--accent)] text-white 
                      hover:bg-[var(--gold)] hover:text-[var(--bg)]
                      mt-3 w-full
                    "
                  >
                    Supprimer
                  </Button>
                </motion.div>
              ))}
            </div>

            <div
  className="
    hidden sm:block overflow-x-auto rounded-2xl
    border border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
    bg-[color-mix(in_oklab,var(--bg)_94%,var(--accent)_6%)]
    shadow-[0_0_25px_color-mix(in_oklab,var(--accent)_30%,transparent_70%)]
    transition-all duration-500
    w-full
  "
>
  <table className="w-full text-sm sm:text-base border-collapse">

                <thead
                  className="
                    bg-[color-mix(in_oklab,var(--accent)_10%,var(--bg)_90%)]
                    text-[var(--accent)] uppercase tracking-wide
                    border-b border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
                  "
                >
                  <tr>
                    <th className="py-3 px-4 text-left">Utilisateur</th>
                    <th className="py-3 px-4 text-left">Montant (€)</th>
                    <th className="py-3 px-4 text-left">Message</th>
                    <th className="py-3 px-4 text-center">Statut</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {donations.map((d, index) => (
                    <motion.tr
                      key={d.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="
                        border-b border-[color-mix(in_oklab,var(--accent)_25%,transparent_75%)]
                        hover:bg-[color-mix(in_oklab,var(--accent)_12%,transparent_88%)]
                        transition-all duration-300
                      "
                    >
                      <td className="py-3 px-4 font-semibold text-[color-mix(in_oklab,var(--text)_90%,var(--accent)_10%)] whitespace-nowrap">
                        {d.user_name || "Anonyme"}
                      </td>
                      <td className="py-3 px-4 text-[var(--accent)] font-semibold">
                        {d.amount ? parseFloat(d.amount).toFixed(2) : "—"}
                      </td>
                      <td
                        className="py-3 px-4 text-[var(--subtext)] max-w-sm truncate"
                        title={d.message}
                      >
                        {d.message || "—"}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`font-semibold ${
                            d.status === "succeeded"
                              ? "text-green-500"
                              : "text-[var(--accent)]"
                          }`}
                        >
                          {d.status === "succeeded" ? "Validé" : "En attente"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Button
                          onClick={() => handleDelete(d.id)}
                          className="
                            bg-[var(--accent)] text-white 
                            hover:bg-[var(--gold)] hover:text-[var(--bg)]
                            w-28
                          "
                        >
                          Supprimer
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
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


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
        setDonations(data);
      } catch (e) {
        console.error("Erreur lors du chargement des dons :", e);
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
      console.error("Erreur suppression don:", e);
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
          bg-[var(--surface)]
          border border-[var(--border)]
          rounded-2xl
          shadow-[0_0_25px_var(--accent)]
          hover:shadow-[0_0_35px_var(--accent)]
          hover:border-[var(--accent)]
          transition-all duration-500
          p-6 sm:p-10
        "
      >
       
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-[var(--accent)] drop-shadow-[0_0_10px_var(--accent)]">
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
            mb-10 py-5 px-6 rounded-2xl border border-[var(--accent)]/30 
            bg-[color-mix(in_oklab,var(--bg)_95%,black_5%)]
            shadow-[0_0_25px_rgba(179,18,45,0.35)]
            text-center transition-all duration-500
          "
        >
          <p className="text-xl font-semibold">
            Total collecté :{" "}
            <span className="text-[var(--accent)] font-bold">
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
          
            <div className="grid gap-6 sm:hidden">
              {donations.map((d) => (
                <div
                  key={d.id}
                  className="
                    bg-[color-mix(in_oklab,var(--bg)_95%,black_5%)]
                    border border-[var(--accent)]/30 
                    rounded-2xl p-5
                    shadow-[0_0_25px_rgba(179,18,45,0.3)]
                    hover:shadow-[0_0_35px_rgba(179,18,45,0.5)]
                    transition-all duration-300
                  "
                >
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-1">
                    {d.user_name || "Anonyme"}
                  </h3>
                  <p className="text-sm text-[var(--subtext)] mb-1">
                     Montant :{" "}
                    <span className="text-[var(--accent)] font-semibold">
                      {d.amount ? `${parseFloat(d.amount).toFixed(2)} €` : "—"}
                    </span>
                  </p>
                  <p className="text-sm text-[var(--subtext)] mb-1">
                     {d.message || "Aucun message"}
                  </p>
                  <p className="text-sm text-[var(--subtext)] mb-4">
                     Statut :{" "}
                    <span
                      className={
                        d.status === "succeeded"
                          ? "text-green-500 font-semibold"
                          : "text-[var(--accent)] font-semibold"
                      }
                    >
                      {d.status === "succeeded" ? "Validé" : "En attente"}
                    </span>
                  </p>

                  <div className="flex justify-center">
                    <Button
                      onClick={() => handleDelete(d.id)}
                      className="
                        bg-[var(--accent)] text-white hover:bg-[var(--gold)]
                        hover:text-[var(--bg)] text-sm
                      "
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="
                hidden sm:block overflow-x-auto
                rounded-2xl border border-[var(--accent)]/30
                bg-[color-mix(in_oklab,var(--bg)_95%,black_5%)]
                shadow-[0_0_25px_rgba(179,18,45,0.35)]
                transition-all duration-500
              "
            >
              <table className="min-w-full text-sm sm:text-base">
                <thead className="bg-[var(--accent)]/10 border-b border-[var(--accent)]/30">
                  <tr className="text-[var(--accent)] uppercase tracking-wide">
                    <th className="py-3 px-4 text-left">Utilisateur</th>
                    <th className="py-3 px-4 text-left">Montant (€)</th>
                    <th className="py-3 px-4 text-left">Message</th>
                    <th className="py-3 px-4 text-center">Statut</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((d) => (
                    <tr
                      key={d.id}
                      className="border-b border-[var(--accent)]/20 hover:bg-[var(--accent)]/10 transition"
                    >
                      <td className="py-3 px-4 font-medium">
                        {d.user_name || "Anonyme"}
                      </td>
                      <td className="py-3 px-4 text-[var(--accent)] font-semibold">
                        {d.amount ? `${parseFloat(d.amount).toFixed(2)}` : "—"}
                      </td>
                      <td className="py-3 px-4 text-[var(--subtext)] max-w-sm truncate">
                        {d.message || "—"}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`${
                            d.status === "succeeded"
                              ? "text-green-500"
                              : "text-[var(--accent)]"
                          } font-semibold`}
                        >
                          {d.status === "succeeded" ? "Validé" : "En attente"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center flex flex-col gap-2 items-center justify-center">
                        <Button
                          onClick={() => handleDelete(d.id)}
                          className="
                            bg-[var(--accent)] text-white hover:bg-[var(--gold)]
                            hover:text-[var(--bg)] w-28
                          "
                        >
                          Supprimer
                        </Button>
                      </td>
                    </tr>
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




import { useEffect, useState } from "react";
import { get, del } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { motion } from "framer-motion";

export default function AdminListConcerts() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const data = await get("/concerts");
        setConcerts(data.data || []);
      } catch (e) {
        console.error("Erreur lors du chargement des concerts :", e);
        setConcerts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Supprimer ce concert ?")) return;
    try {
      await del(`/concerts/${id}`);
      setConcerts((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      console.error("Erreur lors de la suppression :", e);
      alert("Erreur lors de la suppression");
    }
  }

  if (loading)
    return (
      <p className="text-center mt-10 text-[var(--subtext)] animate-pulse">
        Chargement des concerts...
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
            Gestion des concerts
          </h1>
          <Button
            onClick={() => navigate("/admin/concerts/new")}
            className="
              bg-[var(--accent)] hover:bg-[var(--gold)]
              text-white hover:text-[var(--bg)]
              font-semibold px-6 py-2 rounded-xl 
              shadow-[0_0_15px_var(--accent)]
              transition-all duration-300
            "
          >
            + Nouveau concert
          </Button>
        </div>

        {concerts.length === 0 ? (
          <p className="text-[var(--subtext)] text-center mt-10 italic">
            Aucun concert pour le moment.
          </p>
        ) : (
          <>
          
            <div className="block sm:hidden space-y-4">
              {concerts.map((c) => (
                <motion.div
                  key={c.id}
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
                  <div className="flex items-center gap-3">
                    {c.image_url ? (
                      <img
                        src={c.image_url}
                        alt={c.title || c.city}
                        className="w-16 h-16 object-cover rounded-md border border-[var(--accent)]/40"
                      />
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center bg-[color-mix(in_oklab,var(--accent)_10%,var(--bg)_90%)] text-[var(--subtext)] rounded-md text-xs">
                        Aucune
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-[var(--accent)]">
                        {c.title || c.city}
                      </h3>
                      <p className="text-[var(--subtext)] text-sm">
                        {c.location || "—"} —{" "}
                        {c.date
                          ? new Date(c.date).toLocaleDateString("fr-FR")
                          : "—"}
                      </p>
                    </div>
                  </div>

                  {c.ticket_url && (
                    <a
                      href={c.ticket_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] hover:text-[var(--gold)] mt-2 text-sm underline"
                    >
                      Billetterie
                    </a>
                  )}

                  <div className="flex gap-3 mt-3">
                    <Button
                      onClick={() =>
                        navigate(`/admin/concerts/edit/${c.id}`)
                      }
                      className="
                        border border-[var(--accent)] text-[var(--accent)]
                        hover:bg-[var(--accent)] hover:text-[var(--bg)]
                        flex-1
                      "
                    >
                      Modifier
                    </Button>
                    <Button
                      onClick={() => handleDelete(c.id)}
                      className="
                        bg-[var(--accent)] text-white 
                        hover:bg-[var(--gold)] hover:text-[var(--bg)]
                        flex-1
                      "
                    >
                      Supprimer
                    </Button>
                  </div>
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
              "
            >
              <table className="min-w-[700px] text-sm sm:text-base border-collapse">
                <thead
                  className="
                    bg-[color-mix(in_oklab,var(--accent)_10%,var(--bg)_90%)]
                    text-[var(--accent)] uppercase tracking-wide
                    border-b border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
                  "
                >
                  <tr>
                    <th className="py-3 px-4 text-left">Image</th>
                    <th className="py-3 px-4 text-left">Titre</th>
                    <th className="py-3 px-4 text-left">Lieu</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Billetterie</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {concerts.map((c, index) => (
                    <tr
                      key={c.id}
                      className={`
                        ${index !== concerts.length - 1 ? "border-b" : ""}
                        border-[color-mix(in_oklab,var(--accent)_25%,transparent_75%)]
                        hover:bg-[color-mix(in_oklab,var(--accent)_12%,transparent_88%)]
                        transition-colors duration-300
                      `}
                    >
                      <td className="py-3 px-4">
                        {c.image_url ? (
                          <img
                            src={c.image_url}
                            alt={c.title || c.city}
                            className="w-20 h-14 object-cover rounded-md border border-[color-mix(in_oklab,var(--accent)_30%,transparent_70%)]"
                          />
                        ) : (
                          <div className="w-20 h-14 bg-[color-mix(in_oklab,var(--accent)_10%,var(--bg)_90%)] rounded-md flex items-center justify-center text-[var(--subtext)] text-xs">
                            Aucune
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[color-mix(in_oklab,var(--text)_90%,var(--accent)_10%)]">
                        {c.title || c.city}
                      </td>
                      <td className="py-3 px-4 text-[color-mix(in_oklab,var(--subtext)_90%,var(--accent)_10%)]">
                        {c.location || "—"}
                      </td>
                      <td className="py-3 px-4 text-[color-mix(in_oklab,var(--subtext)_90%,var(--accent)_10%)]">
                        {c.date
                          ? new Date(c.date).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {c.ticket_url ? (
                          <a
                            href={c.ticket_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent)] hover:text-[var(--gold)] hover:underline"
                          >
                            Voir
                          </a>
                        ) : (
                          <span className="text-[var(--subtext)]">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center flex flex-col gap-2 items-center justify-center">
                        <Button
                          onClick={() =>
                            navigate(`/admin/concerts/edit/${c.id}`)
                          }
                          className="
                            border border-[var(--accent)] text-[var(--accent)]
                            hover:bg-[var(--accent)] hover:text-[var(--bg)]
                            w-28
                          "
                        >
                          Modifier
                        </Button>
                        <Button
                          onClick={() => handleDelete(c.id)}
                          className="
                            bg-[var(--accent)] text-white 
                            hover:bg-[var(--gold)] hover:text-[var(--bg)]
                            w-28
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






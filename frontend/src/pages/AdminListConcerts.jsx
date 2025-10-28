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
        console.log("Réponse API /concerts :", data);
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
            Gestion des concerts
          </h1>
          <Button
            onClick={() => navigate("/admin/concerts/new")}
            className="
              bg-[var(--accent)] hover:bg-[var(--gold)]
              text-white hover:text-[var(--bg)]
              px-6 py-2 font-semibold rounded-xl
              shadow-[0_0_12px_var(--accent)]
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
           
            <div className="grid gap-6 sm:hidden">
              {concerts.map((c) => (
                <div
                  key={c.id}
                  className="
                    bg-[color-mix(in_oklab,var(--bg)_95%,black_5%)]
                    border border-[var(--accent)]/30 
                    rounded-2xl p-5
                    shadow-[0_0_25px_rgba(179,18,45,0.3)]
                    hover:shadow-[0_0_35px_rgba(179,18,45,0.5)]
                    transition-all duration-300
                  "
                >
                  {c.image_url && (
                    <img
                      src={c.image_url}
                      alt={c.title || c.city}
                      className="w-full h-40 object-cover rounded-lg mb-4 border border-[var(--accent)]/40"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-1">
                    {c.title || c.city}
                  </h3>
                  <p className="text-sm text-[var(--subtext)] mb-2">
                     {c.location || "Lieu non précisé"}
                  </p>
                  <p className="text-sm text-[var(--subtext)] mb-4">
                    {" "}
                    {c.date
                      ? new Date(c.date).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : "Date non indiquée"}
                  </p>

                  <div className="flex flex-wrap justify-center gap-3">
                    <Button
                      onClick={() => navigate(`/admin/concerts/edit/${c.id}`)}
                      className="
                        border border-[var(--accent)] text-[var(--accent)] 
                        hover:bg-[var(--accent)] hover:text-[var(--bg)] text-sm
                      "
                    >
                      Modifier
                    </Button>
                    <Button
                      onClick={() => handleDelete(c.id)}
                      className="
                        bg-[var(--accent)] text-white hover:bg-[var(--gold)]
                        hover:text-[var(--bg)] text-sm
                      "
                    >
                      Supprimer
                    </Button>
                    {c.ticket_url && (
                      <Button
                        as="a"
                        href={c.ticket_url}
                        target="_blank"
                        className="
                          border border-[var(--accent)]/50 text-[var(--subtext)]
                          hover:text-[var(--accent)] hover:border-[var(--accent)]
                          text-sm
                        "
                      >
                        Billetterie
                      </Button>
                    )}
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
                    <th className="py-3 px-4 text-left">Image</th>
                    <th className="py-3 px-4 text-left">Titre</th>
                    <th className="py-3 px-4 text-left">Lieu</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Billetterie</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {concerts.map((c) => (
                    <tr
                      key={c.id}
                      className="
                        border-b border-[var(--accent)]/20 
                        hover:bg-[var(--accent)]/10
                        transition-colors duration-300
                      "
                    >
                      <td className="py-3 px-4">
                        {c.image_url ? (
                          <img
                            src={c.image_url}
                            alt={c.title}
                            className="w-20 h-14 object-cover rounded-md border border-[var(--accent)]/30"
                          />
                        ) : (
                          <div className="w-20 h-14 bg-[var(--accent)]/5 rounded-md flex items-center justify-center text-[var(--subtext)] text-xs">
                            Aucune
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[var(--text)]">
                        {c.title || c.city}
                      </td>
                      <td className="py-3 px-4 text-[var(--subtext)]">
                        {c.location || "—"}
                      </td>
                      <td className="py-3 px-4 text-[var(--subtext)]">
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
                          onClick={() => navigate(`/admin/concerts/edit/${c.id}`)}
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





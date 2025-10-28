import { useEffect, useState } from "react";
import { get, del } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { motion } from "framer-motion";

export default function AdminListMusics() {
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const data = await get("/musics");
        setMusics(Array.isArray(data.data) ? data.data : data);
      } catch (e) {
        console.error("Erreur chargement musiques :", e);
        setMusics([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Supprimer cette musique ?")) return;
    try {
      await del(`/musics/${id}`);
      setMusics((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      console.error("Erreur suppression musique:", e);
      alert("Erreur lors de la suppression");
    }
  }

  if (loading)
    return (
      <p className="text-center mt-10 text-[var(--subtext)] animate-pulse">
        Chargement des musiques...
      </p>
    );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="
        min-h-screen py-12 px-4 sm:px-12 
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
          p-4 sm:p-10
        "
      >
       
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)] drop-shadow-[0_0_12px_var(--accent)]">
            Gestion des musiques
          </h1>
          <Button
            onClick={() => navigate("/admin/musics/new")}
            className="
              bg-[var(--accent)] hover:bg-[var(--gold)]
              text-white hover:text-[var(--bg)]
              font-semibold px-5 py-2 rounded-xl 
              shadow-[0_0_15px_var(--accent)]
              transition-all duration-300
            "
          >
            + Nouvelle musique
          </Button>
        </div>

        {musics.length === 0 ? (
          <p className="text-[var(--subtext)] text-center mt-10 italic">
            Aucune musique pour le moment.
          </p>
        ) : (
          <div
            className="
              w-full overflow-x-auto rounded-2xl
              border border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
              bg-[color-mix(in_oklab,var(--bg)_94%,var(--accent)_6%)]
              shadow-[0_0_25px_color-mix(in_oklab,var(--accent)_30%,transparent_70%)]
              transition-all duration-500
              scrollbar-thin scrollbar-thumb-[var(--accent)] scrollbar-track-transparent
            "
          >
            <table className="min-w-[600px] sm:min-w-full text-xs sm:text-base border-collapse">
              <thead
                className="
                  bg-[color-mix(in_oklab,var(--accent)_10%,var(--bg)_90%)]
                  text-[var(--accent)] uppercase tracking-wide
                  border-b border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
                "
              >
                <tr>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 text-left">Image</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 text-left">Titre</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 text-left">Artiste</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 text-left">Date</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 text-left">Lien</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {musics.map((m, index) => (
                  <tr
                    key={m.id}
                    className={`
                      ${index !== musics.length - 1 ? "border-b" : ""}
                      border-[color-mix(in_oklab,var(--accent)_25%,transparent_75%)]
                      hover:bg-[color-mix(in_oklab,var(--accent)_12%,transparent_88%)]
                      transition-colors duration-300
                    `}
                  >
                    <td className="py-2 px-2 sm:py-3 sm:px-4">
                      {m.image_url ? (
                        <img
                          src={m.image_url}
                          alt={m.title}
                          className="w-16 h-12 sm:w-20 sm:h-14 object-cover rounded-md border border-[color-mix(in_oklab,var(--accent)_30%,transparent_70%)]"
                        />
                      ) : (
                        <div className="w-16 h-12 sm:w-20 sm:h-14 bg-[color-mix(in_oklab,var(--accent)_10%,var(--bg)_90%)] rounded-md flex items-center justify-center text-[var(--subtext)] text-xs">
                          Aucune
                        </div>
                      )}
                    </td>

                    <td className="py-2 px-2 sm:py-3 sm:px-4 font-semibold text-[color-mix(in_oklab,var(--text)_90%,var(--accent)_10%)]">
                      {m.title}
                    </td>

                    <td className="py-2 px-2 sm:py-3 sm:px-4 text-[color-mix(in_oklab,var(--subtext)_90%,var(--accent)_10%)]">
                      {m.artist || "—"}
                    </td>

                    <td className="py-2 px-2 sm:py-3 sm:px-4 text-[color-mix(in_oklab,var(--subtext)_90%,var(--accent)_10%)]">
                      {m.created_at
                        ? new Date(m.created_at).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : "—"}
                    </td>

                    <td className="py-2 px-2 sm:py-3 sm:px-4 text-center">
                      {m.audio_url ? (
                        <a
                          href={m.audio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--accent)] hover:text-[var(--gold)] hover:underline"
                        >
                          Écouter
                        </a>
                      ) : (
                        <span className="text-[var(--subtext)]">—</span>
                      )}
                    </td>

                    <td className="py-2 px-2 sm:py-3 sm:px-4 text-center flex flex-col sm:flex-row gap-2 items-center justify-center">
                      <Button
                        onClick={() => navigate(`/admin/musics/edit/${m.id}`)}
                        className="
                          border border-[var(--accent)] text-[var(--accent)]
                          hover:bg-[var(--accent)] hover:text-[var(--bg)]
                          w-24 sm:w-28
                        "
                      >
                        Modifier
                      </Button>
                      <Button
                        onClick={() => handleDelete(m.id)}
                        className="
                          bg-[var(--accent)] text-white 
                          hover:bg-[var(--gold)] hover:text-[var(--bg)]
                          w-24 sm:w-28
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






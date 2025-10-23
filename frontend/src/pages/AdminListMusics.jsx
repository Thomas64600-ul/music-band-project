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
        min-h-screen py-12 px-6 sm:px-12 
        bg-[var(--bg)] text-[var(--text)]
        transition-colors duration-700 ease-in-out
      "
    >
      
      <div
        className="
          absolute top-[30%] left-1/2 -translate-x-1/2 
          w-[70vw] h-[70vw]
          bg-[radial-gradient(circle,var(--accent)_10%,transparent_70%)]
          opacity-20 blur-[140px] -z-10 pointer-events-none
        "
      ></div>

     
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-[var(--accent)] drop-shadow-[0_0_10px_var(--accent)]">
          Gestion des musiques
        </h1>

        <Button
          onClick={() => navigate("/admin/musics/new")}
          className="
            bg-[var(--accent)] hover:bg-[var(--gold)]
            text-white hover:text-[var(--bg)]
            font-semibold px-6 py-2 rounded-xl 
            shadow-[0_0_12px_var(--accent)]
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
        <div className="overflow-x-auto rounded-2xl border border-[var(--accent)]/20 bg-[var(--bg)] shadow-[0_0_25px_var(--accent)]/20">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-[var(--accent)]/10 border-b border-[var(--accent)]/30">
              <tr className="text-[var(--accent)] uppercase tracking-wide">
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Titre</th>
                <th className="py-3 px-4 text-left">Artiste</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Lien</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {musics.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-[var(--accent)]/20 hover:bg-[var(--accent)]/10 transition"
                >
                  <td className="py-3 px-4">
                    {m.image_url ? (
                      <img
                        src={m.image_url}
                        alt={m.title}
                        className="w-20 h-14 object-cover rounded-md border border-[var(--accent)]/30"
                      />
                    ) : (
                      <div className="w-20 h-14 bg-[var(--accent)]/5 rounded-md flex items-center justify-center text-[var(--subtext)] text-xs">
                        Aucune
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium">{m.title}</td>
                  <td className="py-3 px-4 text-[var(--subtext)]">
                    {m.artist || "—"}
                  </td>
                  <td className="py-3 px-4 text-[var(--subtext)]">
                    {m.created_at
                      ? new Date(m.created_at).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="py-3 px-4 text-center">
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
                  <td className="py-3 px-4 text-center flex flex-col gap-2 items-center justify-center">
                    <Button
                      onClick={() => navigate(`/admin/musics/edit/${m.id}`)}
                      className="
                        border border-[var(--accent)] text-[var(--accent)]
                        hover:bg-[var(--accent)] hover:text-[var(--bg)]
                        w-28
                      "
                    >
                      Modifier
                    </Button>
                    <Button
                      onClick={() => handleDelete(m.id)}
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
      )}
    </motion.section>
  );
}




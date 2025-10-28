import { useEffect, useState, useMemo } from "react";
import { get, del } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { motion } from "framer-motion";

export default function AdminComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterArticle, setFilterArticle] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const data = await get("/comments");
        setComments(Array.isArray(data.data) ? data.data : []);
      } catch (e) {
        console.error("Erreur chargement commentaires :", e);
        setError("Impossible de charger les commentaires.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Supprimer ce commentaire ?")) return;
    try {
      await del(`/comments/${id}`);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      console.error("Erreur suppression commentaire :", e);
      alert("Erreur lors de la suppression du commentaire");
    }
  }

  const filteredComments = useMemo(() => {
    return comments.filter((c) => {
      const contentMatch = c.content
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const authorMatch = (c.firstname + " " + (c.lastname || ""))
        ?.toLowerCase()
        .includes(filterAuthor.toLowerCase());
      const articleMatch =
        c.article_title?.toLowerCase().includes(filterArticle.toLowerCase()) ||
        c.target_type?.toLowerCase().includes(filterArticle.toLowerCase());
      return contentMatch && authorMatch && articleMatch;
    });
  }, [comments, searchTerm, filterAuthor, filterArticle]);

  if (loading)
    return (
      <p className="text-center mt-10 text-[var(--subtext)] animate-pulse">
        Chargement des commentaires...
      </p>
    );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="
        min-h-screen py-12 px-6 sm:px-12 flex flex-col items-center
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
          relative w-full max-w-7xl
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
            Gestion des commentaires
          </h1>
          <p className="text-sm text-[color-mix(in_oklab,var(--subtext)_90%,var(--accent)_10%)] italic">
            Total : {filteredComments.length} commentaire
            {filteredComments.length > 1 ? "s" : ""}
          </p>
        </div>

        <div
          className="
            flex flex-col sm:flex-row gap-4 mb-8
            bg-[color-mix(in_oklab,var(--bg)_94%,var(--accent)_6%)]
            border border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
            rounded-xl p-4
            shadow-[0_0_20px_color-mix(in_oklab,var(--accent)_25%,transparent_75%)]
            transition-all duration-500
          "
        >
          {[
            {
              placeholder: "🔍 Rechercher un mot...",
              value: searchTerm,
              setter: setSearchTerm,
            },
            {
              placeholder: "Filtrer par auteur...",
              value: filterAuthor,
              setter: setFilterAuthor,
            },
            {
              placeholder: "Filtrer par article ou type...",
              value: filterArticle,
              setter: setFilterArticle,
            },
          ].map(({ placeholder, value, setter }, i) => (
            <input
              key={i}
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="
                flex-1 p-2 rounded-md
                bg-[color-mix(in_oklab,var(--bg)_96%,black_4%)]
                border border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
                text-[color-mix(in_oklab,var(--text)_90%,var(--accent)_10%)]
                focus:ring-2 focus:ring-[var(--accent)]/40
                focus:border-[var(--accent)]
                transition-all duration-300
              "
            />
          ))}
        </div>

        {error && (
          <p className="text-center text-red-500 font-medium mb-6">{error}</p>
        )}

        {filteredComments.length === 0 ? (
          <p className="text-[var(--subtext)] text-center mt-10 italic">
            Aucun commentaire ne correspond à votre recherche.
          </p>
        ) : (
          <>
         
            <div className="block sm:hidden space-y-4">
              {filteredComments.map((c) => (
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
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-[var(--accent)]">
                      {c.firstname
                        ? `${c.firstname} ${c.lastname || ""}`
                        : "Anonyme"}
                    </h3>
                    <p className="text-[var(--subtext)] text-xs">
                      {new Date(c.created_at).toLocaleDateString("fr-FR")}
                    </p>
                  </div>

                  <p className="text-[var(--text)] text-sm mt-1 italic">
                    “{c.content}”
                  </p>

                  <p className="text-[var(--accent)] text-xs">
                    Cible : {c.article_title || c.target_type || "—"}
                  </p>

                  <Button
                    onClick={() => handleDelete(c.id)}
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
              "
            >
              <table className="min-w-[800px] text-sm sm:text-base border-collapse">
                <thead
                  className="
                    bg-[color-mix(in_oklab,var(--accent)_10%,var(--bg)_90%)]
                    text-[var(--accent)] uppercase tracking-wide
                    border-b border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
                  "
                >
                  <tr>
                    <th className="py-3 px-4 text-left">Auteur</th>
                    <th className="py-3 px-4 text-left">Contenu</th>
                    <th className="py-3 px-4 text-left">Cible</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComments.map((c, index) => (
                    <motion.tr
                      key={c.id}
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
                        {c.firstname
                          ? `${c.firstname} ${c.lastname || ""}`
                          : "Anonyme"}
                      </td>
                      <td
                        className="py-3 px-4 text-[var(--text)] max-w-[300px] truncate"
                        title={c.content}
                      >
                        {c.content}
                      </td>
                      <td className="py-3 px-4 text-[var(--accent)] whitespace-nowrap">
                        {c.article_title || c.target_type || "—"}
                      </td>
                      <td className="py-3 px-4 text-[var(--subtext)] whitespace-nowrap">
                        {new Date(c.created_at).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3 px-4 text-center">
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



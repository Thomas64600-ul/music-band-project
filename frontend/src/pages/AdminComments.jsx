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
        console.log("Réponse API /comments :", data);
        setComments(Array.isArray(data.data) ? data.data : []);
      } catch (e) {
        console.error("Erreur lors du chargement des commentaires :", e);
        setError("Impossible de charger les commentaires.");
        setComments([]);
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
      console.error("Erreur lors de la suppression :", e);
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
        min-h-screen py-10 px-6 sm:px-12
        bg-[var(--bg)] text-[var(--text)]
        transition-colors duration-700 ease-in-out
      "
    >
    
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-[var(--accent)] drop-shadow-[0_0_10px_var(--accent)]">
          Gestion des commentaires
        </h1>
        <p className="text-sm text-[var(--subtext)] italic">
          Total : {filteredComments.length} commentaire
          {filteredComments.length > 1 ? "s" : ""}
        </p>
      </div>

      <div
        className="
          flex flex-col sm:flex-row gap-4 mb-8
          bg-[var(--bg-secondary)] border border-[var(--accent)]/30 rounded-xl p-4
          shadow-[0_0_15px_var(--accent)]/20
        "
      >
        <input
          type="text"
          placeholder="🔍 Rechercher un mot dans les commentaires..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            flex-1 p-2 rounded-md border border-[var(--accent)]/30 
            bg-[var(--bg)] text-[var(--text)]
            focus:ring-2 focus:ring-[var(--accent)]/50
            transition-all
          "
        />
        <input
          type="text"
          placeholder="Filtrer par auteur..."
          value={filterAuthor}
          onChange={(e) => setFilterAuthor(e.target.value)}
          className="
            flex-1 p-2 rounded-md border border-[var(--accent)]/30 
            bg-[var(--bg)] text-[var(--text)]
            focus:ring-2 focus:ring-[var(--accent)]/50
            transition-all
          "
        />
        <input
          type="text"
          placeholder="Filtrer par article ou type..."
          value={filterArticle}
          onChange={(e) => setFilterArticle(e.target.value)}
          className="
            flex-1 p-2 rounded-md border border-[var(--accent)]/30 
            bg-[var(--bg)] text-[var(--text)]
            focus:ring-2 focus:ring-[var(--accent)]/50
            transition-all
          "
        />
      </div>

      {error && (
        <p className="text-center text-red-500 font-medium mb-6">{error}</p>
      )}

      {filteredComments.length === 0 ? (
        <p className="text-[var(--subtext)] text-center mt-10 italic">
          Aucun commentaire ne correspond à votre recherche.
        </p>
      ) : (
        <div
          className="
            overflow-x-auto rounded-2xl border border-[var(--accent)]/30 
            bg-[var(--bg-secondary)] shadow-[0_0_25px_var(--accent)]/20
          "
        >
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-[var(--accent)]/10 border-b border-[var(--accent)]/30">
              <tr className="text-[var(--accent)] uppercase tracking-wide">
                <th className="py-3 px-4 text-left">Auteur</th>
                <th className="py-3 px-4 text-left">Contenu</th>
                <th className="py-3 px-4 text-left">Cible</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComments.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-[var(--accent)]/20 hover:bg-[var(--accent)]/10 transition"
                >
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
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


import React, { useState, useEffect } from "react";
import { get, post, del, put } from "../lib/api";
import { motion } from "framer-motion";

export default function CommentSection({ type, relatedId, user }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const normalizedType = type?.toLowerCase().replace(/s$/, "");

  useEffect(() => {
    (async () => {
      try {
        const data = await get(`/comments/${normalizedType}/${relatedId}`);
       
        setComments(Array.isArray(data.data) ? data.data : []);
      } catch (e) {
        console.error("Erreur chargement commentaires :", e);
        setError("Impossible de charger les commentaires.");
      } finally {
        setLoading(false);
      }
    })();
  }, [normalizedType, relatedId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const body = {
        target_type: normalizedType,
        target_id: relatedId,
        content: newComment,
      };

      const response = await post("/comments", body);
     
      setComments((prev) => [response.data, ...prev]);
      setNewComment("");
      setError(null);
    } catch (e) {
      console.error("Erreur lors de l’envoi :", e);
      setError("Erreur lors de la publication du commentaire.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Supprimer ce commentaire ?")) return;
    try {
      await del(`/comments/${id}`);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      console.error("Erreur suppression :", e);
      setError("Erreur lors de la suppression du commentaire.");
    }
  }

  function startEdit(comment) {
    setEditingId(comment.id);
    setEditedContent(comment.content);
  }

  async function handleEdit(e) {
    e.preventDefault();
    if (!editedContent.trim()) return;

    try {
      const res = await put(`/comments/${editingId}`, { content: editedContent });
     
      setComments((prev) =>
        prev.map((c) => (c.id === editingId ? res.data : c))
      );
      setEditingId(null);
      setEditedContent("");
      setError(null);
    } catch (e) {
      console.error("Erreur modification :", e);
      setError("Impossible de modifier le commentaire.");
    }
  }

  if (loading)
    return (
      <p className="text-[var(--subtext)] text-sm animate-pulse">
        Chargement des commentaires...
      </p>
    );

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        mt-10 p-6 rounded-xl 
        border border-[color-mix(in_oklab,var(--accent)_30%,black_70%)]/60
        bg-[color-mix(in_oklab,var(--bg)_95%,black_5%)]
        text-[var(--text)]
        shadow-[0_0_10px_color-mix(in_oklab,var(--accent)_12%,transparent)]
        hover:border-[var(--accent)]/50 hover:shadow-[0_0_18px_var(--accent)]/30
        transition-all duration-700 ease-in-out
      "
    >
      <h3 className="text-lg font-semibold text-[var(--accent)] mb-4 tracking-wide">
        Commentaires ({comments.length})
      </h3>

      <div className="flex flex-col gap-4 mb-6 max-h-[350px] overflow-y-auto no-scrollbar">
        {comments.length === 0 ? (
          <p className="text-[var(--subtext)] text-sm italic">
            Aucun commentaire pour le moment.
          </p>
        ) : (
          comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="
                p-3 rounded-lg border border-[color-mix(in_oklab,var(--accent)_20%,black_70%)]/40
                bg-[color-mix(in_oklab,var(--bg)_92%,black_8%)] text-[var(--text)]
                hover:border-[var(--accent)]/60 hover:shadow-[0_0_12px_var(--accent)]/30
                transition-all duration-300
              "
            >
              {editingId === comment.id ? (
                <form onSubmit={handleEdit} className="flex flex-col gap-2">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    rows={2}
                    className="w-full p-2 rounded-md border border-[var(--accent)]/40 bg-[var(--bg)] text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)]/70 transition-all"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="submit"
                      className="px-3 py-1 bg-[var(--accent)] text-white rounded-md hover:bg-[var(--gold)] hover:text-[var(--bg)] transition-all"
                    >
                      Enregistrer
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 border border-[var(--accent)] text-[var(--accent)] rounded-md hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="text-sm leading-snug break-words">
                    {comment.content}
                  </p>
                  <p className="text-xs text-[var(--subtext)] mt-2">
                    Par{" "}
                    <span className="text-[var(--accent)] font-medium">
                      {comment.firstname || "Utilisateur"}
                    </span>{" "}
                    —{" "}
                    {comment.created_at
                      ? new Date(comment.created_at).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : "Date inconnue"}
                  </p>

                  {user && comment.user_id === user.id && (
                    <div className="flex justify-end gap-3 mt-2 text-xs">
                      <button
                        onClick={() => startEdit(comment)}
                        className="text-[var(--accent)] hover:text-[var(--gold)] font-medium transition"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="text-red-500 hover:text-red-400 font-medium transition"
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          ))
        )}
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Écrire un commentaire..."
            rows={3}
            className="
              w-full p-3 rounded-md border border-[color-mix(in_oklab,var(--accent)_25%,black_70%)]/40
              bg-[color-mix(in_oklab,var(--bg)_95%,black_5%)] text-[var(--text)]
              focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/70
              transition-all duration-300
            "
          />
          <button
            type="submit"
            className="
              self-end px-5 py-2 rounded-md
              bg-[var(--accent)] text-white
              hover:bg-[var(--gold)] hover:text-[var(--bg)]
              shadow-md hover:shadow-[0_0_20px_var(--accent)]
              transition-all duration-300 active:scale-95
            "
          >
            Publier
          </button>
        </form>
      ) : (
        <p className="text-sm text-[var(--subtext)] italic">
          Connectez-vous pour commenter.
        </p>
      )}

      {error && (
        <p className="text-[var(--accent)] text-sm mt-3 italic">{error}</p>
      )}
    </motion.section>
  );
}

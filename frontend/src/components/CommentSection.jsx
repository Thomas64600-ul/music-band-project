import React, { useState, useEffect } from "react";
import { get, post } from "../lib/api";
import { motion } from "framer-motion";

export default function CommentSection({ type, relatedId, user }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    (async () => {
      try {
        const data = await get(`/comments/${type}/${relatedId}`);
        setComments(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setError("Impossible de charger les commentaires.");
      } finally {
        setLoading(false);
      }
    })();
  }, [type, relatedId]);

  
  async function handleSubmit(e) {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const body = {
        user_id: user?.id,
        content: newComment,
        related_type: type,
        related_id: relatedId,
      };

      const response = await post("/comments", body);
      setComments((prev) => [response, ...prev]);
      setNewComment("");
      setError(null);
    } catch (e) {
      console.error("Erreur lors de l’envoi :", e);
      setError("Erreur lors de la publication du commentaire.");
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
              <p className="text-sm leading-snug">{comment.content}</p>
              <p className="text-xs text-[var(--subtext)] mt-2">
                Par{" "}
                <span className="text-[var(--accent)] font-medium">
                  {comment.username || "Utilisateur"}
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
        <p className="text-[var(--accent)] text-sm mt-3 italic">
          {error}
        </p>
      )}
    </motion.section>
  );
}


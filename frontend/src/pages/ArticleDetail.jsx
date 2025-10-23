import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { get } from "../lib/api";
import Loader from "../components/Loader";
import Button from "../components/Button";
import CommentSection from "../components/CommentSection";
import { useAuth } from "../context/AuthContext"; // ← si tu as un contexte utilisateur

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [status, setStatus] = useState("loading");
  const { user } = useAuth(); // récupère l'utilisateur connecté (si dispo)

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const response = await get(`/articles/${id}`);
        console.log("Détail article :", response);
        setArticle(response.data || response);
        setStatus("success");
      } catch (error) {
        console.error("Erreur récupération article:", error);
        setStatus("error");
      }
    })();
  }, [id]);

  if (status === "loading") return <Loader />;

  if (status === "error" || !article)
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)] px-6">
        <h1 className="text-3xl font-bold text-[var(--accent)] mb-4 drop-shadow-[0_0_10px_var(--accent)]">
          Article introuvable
        </h1>
        <Button variant="secondary" onClick={() => navigate("/blog")}>
          ← Retour au blog
        </Button>
      </section>
    );

  return (
    <main className="bg-[var(--bg)] text-[var(--text)] min-h-screen flex flex-col items-center pt-24 pb-20 px-6 relative overflow-hidden transition-colors duration-700 ease-in-out">
      
      {/* Halo décoratif */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-[var(--accent)]/25 rounded-full blur-[150px] opacity-40 -z-10"></div>

      {/* === TITRE === */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--accent)] mb-6 drop-shadow-[0_0_12px_var(--accent)] text-center max-w-3xl">
        {article.title}
      </h1>

      {/* === MÉTADONNÉES === */}
      <p className="text-[var(--subtext)] text-sm text-center mb-10">
        Publié le{" "}
        <span className="text-[var(--gold)] font-medium">
          {article.created_at
            ? new Date(article.created_at).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "—"}
        </span>
      </p>

      {/* === IMAGE === */}
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="rounded-2xl mb-10 border border-[var(--accent)]/40 shadow-[0_0_25px_var(--accent)]/30 mx-auto w-full max-w-3xl object-cover"
          loading="lazy"
        />
      )}

      {/* === CONTENU === */}
      <article
        className="prose prose-invert max-w-3xl leading-relaxed text-[var(--text)] prose-p:mb-4 prose-h2:text-[var(--gold)] prose-strong:text-[var(--accent)] text-justify"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* === SECTION COMMENTAIRES === */}
      <div className="w-full max-w-3xl mt-16">
        <CommentSection type="article" relatedId={article.id} user={user} />
      </div>

      {/* === BOUTON RETOUR === */}
      <div className="mt-12">
        <Button
          variant="secondary"
          onClick={() => navigate("/blog")}
          className="text-base px-6 py-3"
        >
          ← Retour au blog
        </Button>
      </div>
    </main>
  );
}


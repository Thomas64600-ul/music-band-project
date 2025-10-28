import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { get } from "../lib/api";
import Loader from "../components/Loader";
import Button from "../components/Button";
import CommentSection from "../components/CommentSection";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [status, setStatus] = useState("loading");
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const response = await get(`/articles/${id}`);
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
    <motion.main
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="
        bg-[var(--bg)] text-[var(--text)]
        min-h-screen flex flex-col items-center
        pt-32 pb-28 px-6 relative overflow-hidden
        transition-colors duration-700 ease-in-out
      "
    >
    
      <div
        className="
          absolute top-[25%] left-1/2 -translate-x-1/2 
          w-[75vw] h-[75vw]
          bg-[radial-gradient(circle_at_center,#B3122D33_0%,transparent_70%)]
          opacity-70 blur-[160px] -z-10 pointer-events-none
        "
      ></div>

      <h1 className="
        text-4xl md:text-5xl font-extrabold text-center
        text-[var(--accent)] mb-6
        drop-shadow-[0_0_18px_var(--accent)]
        hover:text-[var(--gold)] hover:drop-shadow-[0_0_20px_var(--gold)]
        transition-all duration-500 ease-in-out
        max-w-3xl leading-tight
      ">
        {article.title}
      </h1>

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

    
      <motion.article
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          relative max-w-3xl w-full
          bg-[color-mix(in_oklab,var(--bg)_96%,var(--accent)_4%)]
          border border-[color-mix(in_oklab,var(--accent)_50%,transparent_50%)]
          rounded-2xl
          shadow-[0_0_25px_rgba(179,18,45,0.35)]
          hover:shadow-[0_0_40px_rgba(179,18,45,0.5)]
          hover:border-[var(--accent)]
          p-8 sm:p-10
          text-[var(--text)] leading-relaxed
          transition-all duration-700 ease-in-out
        "
      >
   
        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            className="
              w-full h-80 object-cover rounded-xl mb-8
              border border-[var(--accent)]/40
              shadow-[0_0_25px_rgba(179,18,45,0.3)]
              hover:shadow-[0_0_40px_rgba(179,18,45,0.5)]
              transition-all duration-500
            "
            loading="lazy"
          />
        )}

        <div
          className="
            prose prose-invert max-w-none
            prose-h2:text-[var(--gold)] prose-h3:text-[var(--accent)]
            prose-strong:text-[var(--accent)]
            prose-a:text-[var(--gold)] prose-a:no-underline hover:prose-a:underline
            prose-p:mb-5 prose-img:rounded-lg
            text-justify tracking-wide
          "
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </motion.article>

      <div
        className="
          w-full max-w-3xl mt-12 p-6 rounded-xl
          bg-[color-mix(in_oklab,var(--bg)_96%,black_4%)]
          border border-[var(--border)]
          hover:border-[var(--accent)]
          hover:shadow-[0_0_20px_var(--accent)]
          transition-all duration-500
        "
      >
        <h2 className="text-2xl font-bold text-[var(--accent)] mb-6 text-center drop-shadow-[0_0_10px_var(--accent)]">
          Commentaires
        </h2>
        <CommentSection type="article" relatedId={article.id} user={user} />
      </div>

      <div className="mt-20 mb-6">
        <Button
          variant="secondary"
          onClick={() => navigate("/blog")}
          className="
            text-base px-6 py-3 rounded-xl font-medium
            hover:shadow-[0_0_25px_var(--accent)]
            transition-all duration-300
          "
        >
          ← Retour au blog
        </Button>
      </div>

      <div
        className="
          absolute bottom-0 left-1/2 -translate-x-1/2 
          w-[60vw] h-[60vw]
          bg-[radial-gradient(circle_at_center,#B3122D33_0%,transparent_70%)]
          opacity-60 blur-[120px] -z-10 pointer-events-none
        "
      ></div>
    </motion.main>
  );
}






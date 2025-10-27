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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
          absolute top-[30%] left-1/2 -translate-x-1/2 
          w-[70vw] h-[70vw]
          bg-[radial-gradient(circle,var(--accent)_10%,transparent_70%)]
          opacity-25 blur-[140px] -z-10 pointer-events-none
        "
      ></div>

     
      <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--accent)] mb-6 drop-shadow-[0_0_15px_var(--accent)] text-center max-w-3xl leading-tight">
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          relative max-w-3xl w-full 
          bg-[color-mix(in_oklab,var(--bg)_92%,black_8%)]
          border border-[var(--accent)]/25 rounded-2xl
          shadow-[0_0_25px_var(--accent)]/30
          p-8 text-[var(--text)] leading-relaxed
          hover:border-[var(--accent)]/50 hover:shadow-[0_0_35px_var(--accent)]/40
          transition-all duration-700 ease-in-out
        "
      >
      
        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            className="
              w-full h-80 object-cover rounded-xl mb-8
              shadow-[0_0_20px_var(--accent)]/40 border border-[var(--accent)]/30
            "
            loading="lazy"
          />
        )}

        <div
          className="
            prose prose-invert max-w-none 
            prose-p:mb-4 prose-h2:text-[var(--gold)] prose-strong:text-[var(--accent)]
            text-justify tracking-wide
          "
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </motion.article>

      <div className="w-full max-w-3xl mt-12">
        <CommentSection type="article" relatedId={article.id} user={user} />
      </div>

      <div className="mt-20 mb-6">
        <Button
          variant="secondary"
          onClick={() => navigate("/blog")}
          className="
            text-base px-6 py-3 
            hover:shadow-[0_0_20px_var(--accent)] transition-all duration-300
          "
        >
          ← Retour au blog
        </Button>
      </div>

      <div
        className="
          absolute bottom-0 left-1/2 -translate-x-1/2 
          w-[50vw] h-[50vw]
          bg-[radial-gradient(circle,var(--accent)_0%,transparent_70%)]
          opacity-20 blur-[120px] -z-10 pointer-events-none
        "
      ></div>
    </motion.main>
  );
}



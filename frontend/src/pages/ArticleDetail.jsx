import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { get } from "../lib/api";
import Loader from "../components/Loader";
import Button from "../components/Button";

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [status, setStatus] = useState("loading");

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
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] text-[#F2F2F2] px-6">
        <h1 className="text-3xl font-bold text-[#B3122D] mb-4 drop-shadow-[0_0_10px_#B3122D70]">
          Article introuvable
        </h1>
        <Button variant="secondary" onClick={() => navigate("/blog")}>
          ← Retour au blog
        </Button>
      </section>
    );

  return (
    <main className="bg-[#0A0A0A] text-[#F2F2F2] min-h-screen flex flex-col items-center pt-24 pb-20 px-6 relative overflow-hidden">
      
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-[#B3122D40] rounded-full blur-[150px] opacity-40 -z-10"></div>

      
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#B3122D] mb-6 drop-shadow-[0_0_12px_#B3122D80] text-center max-w-3xl">
        {article.title}
      </h1>

      
      <p className="text-gray-400 text-sm text-center mb-10">
        Publié le{" "}
        <span className="text-[#FFD700] font-medium">
          {article.created_at
            ? new Date(article.created_at).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "—"}
        </span>
      </p>

      
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="rounded-2xl mb-10 border border-[#B3122D50] shadow-[0_0_25px_#B3122D40] mx-auto w-full max-w-3xl object-cover"
          loading="lazy"
        />
      )}

      
      <article
        className="prose prose-invert max-w-3xl leading-relaxed text-[#EAEAEA] prose-p:mb-4 prose-h2:text-[#FFD700] prose-strong:text-[#FFD700] text-justify"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      
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



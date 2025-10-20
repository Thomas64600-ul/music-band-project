import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get } from "../lib/api";
import Loader from "../components/Loader";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    (async () => {
      try {
        const response = await get(`/articles/${id}`);
        console.log("Détail article :", response);

      
        setArticle(response.data || null);
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
      <p className="text-center text-[#FF2B6A] py-12">
        Article introuvable ou erreur de chargement.
      </p>
    );

  return (
    <main className="px-6 py-12 max-w-3xl mx-auto text-[#F2F2F2]">
     
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#FF2B6A] mb-6 drop-shadow-[0_0_12px_#FF2B6A80] text-center">
        {article.title}
      </h1>

      <p className="text-gray-400 text-sm text-center mb-10">
        Publié le{" "}
        {article.created_at
          ? new Date(article.created_at).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          : "—"}
      </p>

      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="rounded-2xl mb-10 border border-[#FF2B6A50] shadow-[0_0_25px_#FF2B6A40] mx-auto"
          loading="lazy"
        />
      )}

      <article
        className="prose prose-invert max-w-none leading-relaxed text-justify text-[#EAEAEA]"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </main>
  );
}


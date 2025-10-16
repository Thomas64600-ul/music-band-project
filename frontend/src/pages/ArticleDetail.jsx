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
        const data = await get(`/articles/${id}`);
        
        setArticle(Array.isArray(data) ? data[0] : data);
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
      <p className="text-center text-red-400 py-12">
        Article introuvable ou erreur de chargement.
      </p>
    );

  return (
    <main className="px-6 py-12 max-w-3xl mx-auto text-[#F2F2F2]">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#FFD700] mb-4">
        {article.title}
      </h1>
      <p className="text-gray-400 text-sm mb-8">
        Publié le{" "}
        {new Date(article.created_at).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="rounded-xl mb-8 border border-[#FFD70040]"
          loading="lazy"
        />
      )}
      <article
        className="prose prose-invert max-w-none leading-relaxed"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </main>
  );
}

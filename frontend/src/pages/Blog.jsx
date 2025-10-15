import { useEffect, useState } from "react";
import { get } from "../lib/api";
import ArticleCard from "../components/ArticleCard";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await get("/articles");

        
        const articleList = Array.isArray(data)
          ? data
          : Array.isArray(data.articles)
          ? data.articles
          : [];

        setArticles(articleList);
      } catch (e) {
        console.error("Erreur chargement articles :", e);
        setArticles([]); 
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-400 mt-10">Chargement des articles...</p>
    );

  if (!articles.length)
    return (
      <p className="text-center text-gray-400 mt-10">
        Aucun article trouvé pour le moment.
      </p>
    );

  return (
    <section className="bg-[#0A0A0A] text-[#F2F2F2] flex flex-col items-center py-10 px-6">
      <h1 className="text-3xl font-bold text-[#FFD700] mb-10">
        Dernières actualités
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles.map((a) => (
          <ArticleCard
            key={a.id}
            title={a.title}
            excerpt={a.description}
            image={a.image_url}
            date={new Date(a.created_at).toLocaleDateString("fr-FR")}
            link={`/blog/${a.id}`}
          />
        ))}
      </div>
    </section>
  );
}



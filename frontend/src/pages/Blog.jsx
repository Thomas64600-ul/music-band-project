import { useEffect, useState } from "react";
import { get } from "../lib/api";
import ArticleCard from "../components/ArticleCard";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await get("/articles"); 
        setArticles(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <section className="bg-[#0A0A0A] text-[#F2F2F2] flex flex-col items-center py-10 px-6">
      <h1 className="text-3xl font-bold text-[#FFD700] mb-10">Dernières actualités</h1>
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


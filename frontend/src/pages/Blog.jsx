import { useEffect, useState } from "react";
import { get } from "../lib/api";
import ArticleCard from "../components/ArticleCard";
import { motion } from "framer-motion";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const response = await get("/articles");
        console.log("Réponse API /articles :", response);

        const articleList = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response)
          ? response
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
      <p className="text-center text-gray-400 mt-20 animate-pulse">
        Chargement des articles...
      </p>
    );

  if (!articles.length)
    return (
      <section className="bg-[#0A0A0A] text-center py-24 text-[#F2F2F2]">
        <h1 className="text-3xl font-bold text-[#B3122D] mb-4 drop-shadow-[0_0_10px_#B3122D60]">
          Aucun article pour le moment
        </h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Revenez bientôt pour découvrir les dernières nouvelles de REVEREN —
          le groupe prépare du nouveau contenu 
        </p>
      </section>
    );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#0A0A0A] text-[#F2F2F2] flex flex-col items-center pt-28 pb-16 px-6 relative overflow-hidden"
    >
      
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-[#B3122D40] rounded-full blur-[150px] opacity-40 -z-10"></div>

    
      <div className="relative inline-block mb-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B3122D40] to-transparent blur-md"></div>
        <h1 className="relative text-4xl md:text-5xl font-extrabold text-[#B3122D] drop-shadow-[0_0_12px_#B3122D80] tracking-wide">
          Dernières actualités
        </h1>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent animate-glow-line"></div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {articles.map((a) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ArticleCard
              title={a.title}
              excerpt={a.description}
              image={a.image_url}
              date={
                a.created_at
                  ? new Date(a.created_at).toLocaleDateString("fr-FR")
                  : "—"
              }
              link={`/blog/${a.id}`}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}





import ArticleCard from "../components/ArticleCard";

export default function TestArticles() {
  const articles = [
    {
      title: "🎤 Nouveau concert à Bordeaux",
      excerpt:
        "Le groupe REVEREN revient sur scène avec une performance électro-rock inédite. Réservez vos places dès maintenant !",
      image: "/src/assets/concert-bordeaux.jpg",
      date: "10 Oct 2025",
      link: "/blog/concert-bordeaux",
    },
    {
      title: "⚡ Sortie du single 'Electric Sunrise'",
      excerpt:
        "Découvrez le nouveau titre de REVEREN, un mélange explosif de riffs électro et d’énergie live.",
      image: "/src/assets/electric-sunrise.jpg",
      date: "05 Oct 2025",
      link: "/blog/electric-sunrise",
    },
    {
      title: "🎧 Backstage : enregistrement du prochain album",
      excerpt:
        "Un aperçu exclusif du processus créatif du groupe REVEREN en studio.",
      image: "/src/assets/studio.jpg",
      date: "02 Oct 2025",
      link: "/blog/studio",
    },
  ];

  return (
    <section className="bg-[#0A0A0A] text-[#F2F2F2] flex flex-col items-center py-10 px-6">
      <h1 className="text-3xl font-bold text-[#FFD700] mb-10">
        📰 Dernières actualités
      </h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles.map((article, i) => (
          <ArticleCard key={i} {...article} />
        ))}
      </div>
    </section>
  );
}

import ArticleCard from "../components/ArticleCard";
import Button from "../components/Button";

export default function BlogTest() {
  const articles = [
    {
      title: "🎤 REVEREN en concert à Bordeaux",
      excerpt:
        "Le groupe revient sur scène avec une performance électro-rock inédite. Découvrez l’énergie brute du live !",
      image: "/src/assets/concert-bordeaux.png",
      date: "10 Oct 2025",
      link: "/blog/concert-bordeaux",
    },
    {
      title: "⚡ Nouveau single 'Electric Sunrise'",
      excerpt:
        "Le nouveau titre de REVEREN plonge dans une ambiance électrisante, mêlant puissance et émotion.",
      image: "/src/assets/electric-sunrise.png",
      date: "05 Oct 2025",
      link: "/blog/electric-sunrise",
    },
    {
      title: "🎧 Backstage : enregistrement du prochain album",
      excerpt:
        "Un aperçu exclusif du processus créatif du groupe REVEREN dans leur studio à Bayonne.",
      image: "/src/assets/studio.png",
      date: "02 Oct 2025",
      link: "/blog/studio",
    },
  ];

  return (
    <section className="bg-[#0A0A0A] text-[#F2F2F2] min-h-screen">
      
      <div
        className="relative h-64 sm:h-80 bg-cover bg-center flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.8), rgba(10,10,10,0.8)), url('/src/assets/banner-blog.jpg')",
        }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-[#FFD700] drop-shadow-[0_0_10px_#FFD70080]">
          Le Blog de REVEREN
        </h1>
        <p className="text-gray-300 mt-3 text-lg">
          Suivez nos actus, concerts et sorties exclusives 🎶
        </p>
      </div>

      
      <div className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles.map((article, i) => (
          <ArticleCard key={i} {...article} />
        ))}
      </div>

    
      <div className="bg-[#0B0F17] border-t border-[#FFD70040] py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-[#FFD700] mb-4">
          🔔 Suivez REVEREN
        </h2>
        <p className="text-gray-300 mb-8">
          Recevez nos dernières actualités, concerts et nouveautés directement
          par e-mail.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="max-w-md mx-auto flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Entrez votre e-mail"
            className="w-full sm:flex-1 px-4 py-3 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            required
          />
          <Button variant="primary" type="submit">
            S’abonner
          </Button>
        </form>

        <p className="text-gray-500 text-xs mt-6">
          En vous inscrivant, vous acceptez de recevoir les actualités du groupe
          REVEREN. Vous pouvez vous désinscrire à tout moment.
        </p>
      </div>
    </section>
  );
}

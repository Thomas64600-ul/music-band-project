import { useEffect, useState } from "react";
import ConcertCard from "../components/ConcertCard";
import { get } from "../lib/api";

export default function Concerts() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await get("/concerts");

        // 🧠 Sécurisation selon la forme du retour
        // Si ton backend renvoie { concerts: [...] }
        // ou un tableau direct, les deux cas sont couverts
        const concertList = Array.isArray(data)
          ? data
          : Array.isArray(data.concerts)
          ? data.concerts
          : [];

        setConcerts(concertList);
      } catch (e) {
        console.error("Erreur lors du chargement des concerts :", e);
        setConcerts([]); // évite le plantage si erreur
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="text-center text-gray-400 mt-10">Chargement...</p>;

  if (!concerts.length)
    return <p className="text-center text-gray-400 mt-10">Aucun concert trouvé.</p>;

  return (
    <section className="px-6 sm:px-12 py-16 bg-[#0A0A0A]">
      <h2 className="text-3xl font-bold text-center text-[#FFD700] mb-12">
        Prochains concerts
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {concerts.map((c) => (
          <ConcertCard
            key={c.id}
            city={c.city}
            date={new Date(c.date).toLocaleDateString("fr-FR")}
            location={c.location}
            image={c.image_url}
            ticketLink={c.ticket_url}
          />
        ))}
      </div>
    </section>
  );
}


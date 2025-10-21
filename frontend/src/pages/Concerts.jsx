import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ConcertCard from "../components/ConcertCard";
import { get } from "../lib/api";

export default function Concerts() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await get("/concerts");

        
        const concertList = Array.isArray(data)
          ? data
          : Array.isArray(data.data)
          ? data.data
          : Array.isArray(data.concerts)
          ? data.concerts
          : [];

        console.log("Concerts récupérés :", concertList);
        setConcerts(concertList);
      } catch (e) {
        console.error("Erreur lors du chargement des concerts :", e);
        setConcerts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return <p className="text-center text-gray-400 mt-10">Chargement...</p>;

  if (!concerts.length)
    return (
      <p className="text-center text-gray-400 mt-10">
        Aucun concert trouvé.
      </p>
    );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="px-6 sm:px-12 py-16 bg-[#0A0A0A] text-[#F2F2F2] relative overflow-hidden"
    >
     
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-[#B3122D30] rounded-full blur-[120px] opacity-40 -z-10"></div>

     
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#FFD700] mb-12 drop-shadow-[0_0_15px_#FFD70060]">
        Prochains concerts
      </h2>

     
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
        {concerts.map((c, index) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 25px rgba(179, 18, 45, 0.5)",
            }}
            className="transition-all"
          >
            <ConcertCard
              city={c.city}
              date={
                c.date
                  ? new Date(c.date).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "Date à venir"
              }
              location={c.location || "Lieu à confirmer"}
              image={c.image_url}
              ticketLink={c.ticket_url}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}


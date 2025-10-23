import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ConcertCard from "../components/ConcertCard";
import CommentSection from "../components/CommentSection";
import { useAuth } from "../context/AuthContext";
import { get } from "../lib/api";

export default function Concerts() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);

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
    return (
      <p className="text-center text-[var(--subtext)] mt-10 animate-pulse">
        Chargement des concerts...
      </p>
    );

  
  if (!concerts.length)
    return (
      <section className="bg-[var(--bg)] text-center py-24 text-[var(--text)] transition-colors duration-500">
        <h1 className="text-3xl font-bold text-[var(--accent)] mb-4 drop-shadow-[0_0_10px_var(--accent)]">
          Aucun concert à venir
        </h1>
        <p className="text-[var(--subtext)] max-w-md mx-auto">
          Le groupe prépare de nouvelles dates.  
          Restez connectés pour ne rien manquer 🎸
        </p>
      </section>
    );

  
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="
        bg-[var(--bg)] text-[var(--text)]
        flex flex-col items-center
        pt-24 sm:pt-28 pb-32 px-6
        relative overflow-hidden
        transition-colors duration-500
      "
    >
      
      <div
        className="
          absolute top-[30%] left-1/2 -translate-x-1/2 
          w-[60vw] h-[60vw]
          bg-[var(--accent)]/35 rounded-full blur-[150px] opacity-40 
          -z-10
        "
      ></div>

      
      <div className="relative inline-block mb-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent blur-md"></div>

        <h1 className="relative text-4xl md:text-5xl font-extrabold text-[var(--accent)] drop-shadow-[0_0_12px_var(--accent)] tracking-wide">
          Prochains concerts
        </h1>

        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent animate-glow-line"></div>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl relative z-10">
        {concerts.map((c, index) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 25px var(--accent)",
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

      
      <section
        className="
          w-full max-w-4xl mt-20 mb-28 px-6
          relative z-10
        "
      >
        <CommentSection type="concert" relatedId={0} user={user} />
      </section>

      
      <div
        className="
          absolute bottom-0 left-0 w-full h-[120px]
          bg-gradient-to-b from-transparent to-[var(--bg)]
          pointer-events-none
        "
      ></div>
    </motion.main>
  );
}





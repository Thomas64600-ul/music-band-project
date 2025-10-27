import { useEffect, useState } from "react";
import { get } from "../lib/api";
import ConcertCard from "../components/ConcertCard";
import { motion } from "framer-motion";
import CommentSection from "../components/CommentSection";
import { useAuth } from "../context/AuthContext";

export default function Concerts() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const response = await get("/concerts");
        const concertList = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
          ? response
          : [];
        setConcerts(concertList);
      } catch (e) {
        console.error("Erreur chargement concerts :", e);
        setConcerts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <p className="text-center text-[var(--subtext)] mt-20 animate-pulse">
        Chargement des concerts...
      </p>
    );

  if (!concerts.length)
    return (
      <section className="bg-[var(--bg)] text-center py-24 text-[var(--text)] transition-colors duration-700 ease-in-out">
        <h1 className="text-3xl font-bold text-[var(--accent)] mb-4 drop-shadow-[0_0_10px_var(--accent)]">
          Aucun concert à venir
        </h1>
        <p className="text-[var(--subtext)] max-w-md mx-auto">
          Le groupe prépare de nouvelles dates — restez connectés pour ne rien manquer 🎸
        </p>

        <div className="max-w-4xl mx-auto mt-16 px-6">
          <CommentSection type="concert" relatedId={0} user={user} />
        </div>
      </section>
    );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="
        relative flex flex-col items-center 
        bg-[var(--bg)] text-[var(--text)]
        pt-28 pb-16 px-6
        min-h-screen
        transition-colors duration-700 ease-in-out
        overflow-hidden
      "
    >
     
      <div
        className="
          absolute top-[35%] left-1/2 -translate-x-1/2 
          w-[70vw] h-[70vw]
          bg-[radial-gradient(circle,var(--accent)_10%,transparent_70%)]
          opacity-25 blur-[140px] -z-10 pointer-events-none
        "
      ></div>

    
      <div className="relative inline-block mb-10 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent blur-md"></div>
        <h1 className="relative text-4xl md:text-5xl font-extrabold text-[var(--accent)] drop-shadow-[0_0_12px_var(--accent)] tracking-wide">
          Prochains concerts
        </h1>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent animate-glow-line"></div>
      </div>

   
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-20">
        {concerts.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              bg-[color-mix(in_oklab,var(--bg)_93%,black_7%)]
              border border-[color-mix(in_oklab,var(--accent)_25%,black_70%)]/50
              rounded-2xl p-5 shadow-[0_0_25px_var(--accent)]/40
              hover:shadow-[0_0_35px_var(--accent)]/60
              hover:scale-[1.02]
              transition-all duration-300
            "
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

            <div className="mt-4 w-full bg-[color-mix(in_oklab,var(--bg)_96%,black_4%)] rounded-xl p-3 border border-[var(--accent)]/15">
              <CommentSection type="concert" relatedId={c.id} user={user} />
            </div>
          </motion.div>
        ))}
      </section>

      <div
        className="
          absolute bottom-0 left-1/2 -translate-x-1/2 
          w-[45vw] h-[45vw]
          bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)]
          opacity-20 blur-[120px] -z-10 pointer-events-none
        "
      ></div>
    </motion.main>
  );
}





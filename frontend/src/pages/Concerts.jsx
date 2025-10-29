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
      <p className="text-center text-gray-400 mt-20 animate-pulse">
        Chargement des concerts...
      </p>
    );

  if (!concerts.length)
    return (
      <section className="bg-[#0A0A0A] text-center py-24 text-[#F2F2F2] transition-colors duration-700 ease-in-out">
        <h1 className="text-3xl font-bold text-[#B3122D] mb-4 drop-shadow-[0_0_10px_#B3122D]">
          Aucun concert à venir
        </h1>
        <p className="text-gray-400 max-w-md mx-auto">
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
        bg-[#0A0A0A] text-[#F2F2F2]
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
          bg-[radial-gradient(circle,#B3122D33_0%,transparent_70%)]
          opacity-25 blur-[140px] -z-10 pointer-events-none
        "
      ></div>

      <div className="relative inline-block mb-10 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B3122D33] to-transparent blur-md"></div>
        <h1 className="relative text-4xl md:text-5xl font-extrabold text-[#B3122D] drop-shadow-[0_0_12px_#B3122D] tracking-wide">
          Prochains concerts
        </h1>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent animate-glow-line"></div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-20">
        {concerts.map((c) => (
          <motion.article
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              relative rounded-2xl overflow-hidden
              bg-[#111111] text-[#F2F2F2]
              border border-[#B3122D33]
              hover:border-[#B3122D]
              hover:shadow-[0_0_25px_#B3122D]
              transition-all duration-500 flex flex-col
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

            <div className="px-5 pb-6">
              <CommentSection type="concert" relatedId={c.id} user={user} />
            </div>
          </motion.article>
        ))}
      </section>

      <div
        className="
          absolute bottom-0 left-1/2 -translate-x-1/2 
          w-[45vw] h-[45vw]
          bg-[radial-gradient(circle_at_center,#B3122D33_0%,transparent_70%)]
          opacity-20 blur-[120px] -z-10 pointer-events-none
        "
      ></div>
    </motion.main>
  );
}







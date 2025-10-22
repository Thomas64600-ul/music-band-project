import React, { useEffect, useState } from "react";
import Player from "../components/Player";
import Button from "../components/Button";
import { get } from "../lib/api";
import { motion } from "framer-motion";

export default function Music() {
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchMusics = async () => {
      try {
        const response = await get("/musics");
        console.log("Réponse API /musics :", response);
        setMusics(response.data || []);
      } catch (error) {
        console.error("Erreur de chargement des musiques :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMusics();
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="
        min-h-screen 
        bg-[var(--bg)] text-[var(--text)]
        flex flex-col items-center justify-start 
        pt-24 sm:pt-28 pb-16 px-6 
        relative overflow-hidden
        transition-colors duration-500
      "
    >
      
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-[var(--accent)]/35 rounded-full blur-[150px] opacity-40 -z-10"></div>

      
      <section className="text-center max-w-2xl mb-12 relative">
       
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent blur-md"></div>

        <div className="relative inline-block mb-12 text-center">
         
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent blur-md"></div>
          
          
          <h1 className="relative text-4xl md:text-5xl font-extrabold text-[var(--accent)] drop-shadow-[0_0_12px_var(--accent)] tracking-wide">
            Musique
          </h1>

          
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent animate-glow-line"></div>
        </div>

        
        <p className="relative text-[var(--subtext)] leading-relaxed mt-8">
          Plongez dans l’univers de{" "}
          <strong className="text-[var(--accent)]">REVEREN</strong> :
          un son électro-rock vibrant où la guitare et les synthés s’entrelacent
          pour une expérience sonore unique.
        </p>
      </section>

      
      {loading ? (
        <p className="text-[var(--subtext)] mt-10 animate-pulse">
          Chargement des morceaux...
        </p>
      ) : musics.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
          {musics.map((music) => (
            <motion.div
              key={music.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="
                bg-[var(--surface)]
                border border-[var(--border)]
                rounded-2xl shadow-md 
                p-5 flex flex-col items-center 
                hover:border-[var(--accent)]
                hover:shadow-[0_0_25px_var(--accent)]
                transition-all duration-300
              "
            >
              <Player
                src={music.url}
                title={music.title}
                artist={music.artist || "REVEREN"}
                cover={music.cover_url}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-[var(--subtext)] mt-10 italic">
          Aucun morceau n’est encore publié.  
          Restez à l’écoute — REVEREN prépare du lourd 🔥
        </p>
      )}

     
      <section className="text-center max-w-xl mt-16">
        <h2 className="text-2xl font-semibold mb-3 text-[var(--gold)] tracking-wide">
          Nouvel EP –{" "}
          <span className="text-[var(--accent)] italic">
            Electric Sunrise
          </span>
        </h2>
        <p className="text-[var(--subtext)] mb-6">
          Découvrez le nouveau titre de REVEREN, un mélange explosif de riffs électro et d’énergie live.
        </p>
        <Button variant="primary" as="a" href="https://spotify.com">
          ÉCOUTER SUR SPOTIFY
        </Button>
      </section>
    </motion.main>
  );
}




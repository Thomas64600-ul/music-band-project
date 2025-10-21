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
        const data = await get("/musics");
        setMusics(data || []);
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
      className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] flex flex-col items-center justify-start pt-28 pb-16 px-6 relative overflow-hidden"
    >
     
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-[#B3122D40] rounded-full blur-[150px] opacity-40 -z-10"></div>

      
      <section className="text-center max-w-2xl mb-10 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B3122D30] to-transparent blur-md"></div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#B3122D] mb-4 drop-shadow-[0_0_12px_#B3122D80]">
          MUSIQUE
        </h1>
        <p className="text-gray-300 leading-relaxed">
          Plongez dans l’univers de <strong className="text-[#B3122D]">REVEREN</strong> : un son électro-rock vibrant où la guitare et les synthés s’entrelacent pour une expérience sonore unique.
        </p>
      </section>

      
      {loading ? (
        <p className="text-gray-400 mt-10 animate-pulse">
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
              className="bg-[#0B0F17] border border-[#B3122D60] rounded-2xl shadow-md p-5 flex flex-col items-center hover:shadow-[0_0_25px_#B3122D50] transition-all duration-300"
            >
              {music.cover_url && (
                <img
                  src={music.cover_url}
                  alt={music.title}
                  className="w-full h-48 object-cover rounded-xl mb-4 border border-[#B3122D40]"
                />
              )}
              <h3 className="text-xl font-semibold text-[#FFD700] mb-2 text-center">
                {music.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 italic">REVEREN</p>
              <Player
                src={music.url}
                title={music.title}
                artist="REVEREN"
                cover={music.cover_url}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mt-10 italic">
          Aucun morceau n’est encore publié. Restez à l’écoute — REVEREN prépare du lourd 🔥
        </p>
      )}

      
      <section className="text-center max-w-xl mt-16">
        <h2 className="text-2xl font-semibold mb-3 text-[#FFD700] tracking-wide">
          Nouvel EP – <span className="text-[#B3122D] italic">Electric Sunrise</span>
        </h2>
        <p className="text-gray-400 mb-6">
          Découvrez le nouveau titre de REVEREN, un mélange explosif de riffs électro et d’énergie live.
        </p>
        <Button variant="primary" as="a" href="https://spotify.com">
          ÉCOUTER SUR SPOTIFY
        </Button>
      </section>
    </motion.main>
  );
}

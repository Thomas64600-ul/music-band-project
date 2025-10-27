import { useEffect, useState } from "react";
import { get } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import Player from "../components/Player";
import CommentSection from "../components/CommentSection";
import Button from "../components/Button";

export default function Music() {
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const response = await get("/musics");
        const musicList = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
          ? response
          : [];
        setMusics(musicList);
      } catch (e) {
        console.error("Erreur chargement musiques :", e);
        setMusics([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <p className="text-center text-[var(--subtext)] mt-20 animate-pulse">
        Chargement des morceaux...
      </p>
    );

  if (!musics.length)
    return (
      <section className="bg-[var(--bg)] text-center py-24 text-[var(--text)] transition-colors duration-700 ease-in-out">
        <h1 className="text-3xl font-bold text-[var(--accent)] mb-4 drop-shadow-[0_0_10px_var(--accent)]">
          Aucune musique publiée
        </h1>
        <p className="text-[var(--subtext)] max-w-md mx-auto">
          Restez à l’écoute —{" "}
          <span className="text-[var(--accent)]">REVEREN</span> prépare du lourd 🔥
        </p>

        <div className="max-w-4xl mx-auto mt-16 px-6">
          <CommentSection type="music" relatedId={0} user={user} />
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
          Musiques
        </h1>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent animate-glow-line"></div>
      </div>

 
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-20">
        {musics.map((m) => (
          <motion.article
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              relative rounded-2xl overflow-hidden
              bg-[var(--surface)] text-[var(--text)]
              border border-[var(--border)]
              hover:border-[var(--accent)]
              hover:shadow-[0_0_25px_var(--accent)]
              transition-all duration-500 flex flex-col
            "
          >
          
            {m.cover_url && (
              <div className="relative w-full h-52 sm:h-56 md:h-64 overflow-hidden group">
                <img
                  src={m.cover_url}
                  alt={m.title}
                  className="
                    w-full h-full object-cover transform
                    transition-transform duration-700
                    sm:group-hover:scale-110 pointer-events-none select-none
                  "
                  draggable="false"
                />
                <div
                  className="
                    absolute inset-0 bg-gradient-to-t 
                    from-[var(--bg)]/90 via-[var(--bg)]/40 to-transparent
                    opacity-80 sm:opacity-0 sm:group-hover:opacity-100
                    transition-opacity duration-500
                  "
                ></div>
                <div
                  className="
                    absolute inset-0 bg-gradient-to-tr 
                    from-transparent via-[var(--accent)]/25 to-transparent
                    opacity-40 sm:opacity-0 sm:group-hover:opacity-100
                    blur-[3px] transition-opacity duration-700
                  "
                ></div>
              </div>
            )}

 
            <div className="flex flex-col flex-grow p-5 sm:p-6 text-center">
              <h3
                className="
                  text-lg sm:text-xl font-bold text-[var(--accent)]
                  mb-1 sm:group-hover:text-[var(--gold)] transition-colors
                "
              >
                {m.title || "Titre inconnu"}
              </h3>
              <p className="text-[var(--subtext)] text-sm mb-4">
                {m.artist || "REVEREN"}
              </p>

              <Player
                src={m.url}
                title={m.title}
                artist={m.artist || "REVEREN"}
                cover={m.cover_url}
              />
            </div>

            <div className="px-5 pb-6">
              <CommentSection type="music" relatedId={m.id} user={user} />
            </div>
          </motion.article>
        ))}
      </section>

      <section className="text-center max-w-xl mt-12 mb-32">
        <h2 className="text-2xl font-semibold mb-3 text-[var(--gold)] tracking-wide">
          Nouvel EP –{" "}
          <span className="text-[var(--accent)] italic">Electric Sunrise</span>
        </h2>
        <p className="text-[var(--subtext)] mb-6">
          Découvrez le nouveau titre de{" "}
          <span className="text-[var(--accent)] font-semibold">REVEREN</span>,
          un mélange explosif de riffs électro et d’énergie live.
        </p>
        <Button
          variant="primary"
          as="a"
          href="https://spotify.com"
          className="
            mt-2 px-6 py-3 rounded-md 
            bg-[var(--accent)] text-white font-semibold 
            hover:bg-[var(--gold)] hover:text-[var(--bg)]
            hover:shadow-[0_0_25px_var(--gold)] 
            transition-all duration-300 ease-in-out
            active:scale-95
          "
        >
          ÉCOUTER SUR SPOTIFY
        </Button>
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






// src/pages/Music.jsx
import React, { useEffect } from "react";
import Player from "../components/Player";
import Button from "../components/Button";

export default function Music() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] flex flex-col items-center justify-start pt-24 pb-16 px-6">
      {/* 🎵 Titre principal */}
      <section className="text-center max-w-2xl mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#FFD700] mb-4 drop-shadow-[0_0_10px_#FFD70070]">
          MUSIQUE
        </h1>
        <p className="text-gray-300 leading-relaxed">
          Plongez dans l’univers de <strong>REVEREN</strong> : un son électro-rock vibrant où
          la guitare et les synthés s’entrelacent pour créer une expérience sonore unique.
        </p>
      </section>

      {/* 🎧 Lecteur audio */}
      <div className="w-full max-w-2xl mb-10">
        <Player />
      </div>

      {/* 💿 Call to Action ou prochain album */}
      <section className="text-center max-w-xl">
        <h2 className="text-2xl font-semibold mb-3 text-[#FFD700]">
          Nouvel EP – *Electric Sunrise*
        </h2>
        <p className="text-gray-400 mb-6">
          Découvrez le nouveau titre de REVEREN, un mélange explosif de riffs électro et d’énergie live.
        </p>
        <Button variant="primary">ÉCOUTER SUR SPOTIFY</Button>
      </section>
    </main>
  );
}

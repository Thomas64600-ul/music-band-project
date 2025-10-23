import React, { useEffect } from "react";
import ContactForm from "../components/ContactForm";
import SocialLinks from "../components/SocialLinks";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section
      className="
        min-h-screen flex flex-col justify-center items-center text-center 
        px-6 py-16 md:py-24
        bg-[#F8F8F8] text-[#1A1A1A]
        dark:bg-[#0A0A0A] dark:text-[#F2F2F2]
        transition-colors duration-700 relative overflow-hidden
      "
    >
      {/* Halo doux */}
      <div
        className="
          absolute inset-0 pointer-events-none -z-10
          bg-[radial-gradient(circle_at_center,#FFD1A133_0%,transparent_70%)]
          dark:bg-[radial-gradient(circle_at_center,#B3122D33_0%,transparent_70%)]
          blur-[150px] opacity-70
        "
      ></div>

      {/* Titre principal */}
      <div className="relative inline-block mb-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B3122D33] to-transparent blur-md"></div>
        <h1 className="relative text-4xl md:text-5xl font-extrabold text-[#B3122D] drop-shadow-[0_0_10px_#B3122D40] tracking-wide">
          Contact & Linktree
        </h1>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-[#B3122D] to-transparent animate-glow-line"></div>
      </div>

      {/* Texte d’introduction */}
      <p className="text-gray-600 dark:text-gray-400 max-w-xl mb-10 leading-relaxed">
        Une question, une collaboration ou juste un mot pour le groupe ?<br />
        Envoyez-nous un message ou suivez-nous sur nos réseaux.
      </p>

      {/* Formulaire */}
      <div
        className="
          w-full max-w-2xl mb-14 rounded-2xl shadow-lg 
          bg-white dark:bg-[#111]
          border border-gray-200 dark:border-[#B3122D55]
          transition-all duration-500
        "
      >
        <ContactForm />
      </div>

      {/* Réseaux sociaux */}
      <SocialLinks />

      {/* Halo d’arrière-plan bas */}
      <div
        className="
          absolute bottom-0 left-1/2 -translate-x-1/2 
          w-[60vw] h-[60vw]
          bg-[radial-gradient(circle_at_center,#FFD1A122_0%,transparent_70%)]
          dark:bg-[radial-gradient(circle_at_center,#B3122D33_0%,transparent_70%)]
          blur-[120px] opacity-60 pointer-events-none
        "
      ></div>
    </section>
  );
}



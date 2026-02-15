import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import groupImage from "../assets/groupImage.webp";
import groupImageMobile from "../assets/groupImage-mobile.webp";
export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => window.scrollTo(0, 0), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      role="main"
      className="
        relative overflow-hidden 
        flex flex-col
        bg-[var(--bg)] text-[var(--text)]
        transition-colors duration-700 ease-in-out
      "
    >
      
      <section className="relative h-[70vh] md:h-[90vh] overflow-hidden">
      
        <img
          src="/groupImage.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-2xl scale-105"
          loading="eager"
          fetchPriority="low"
          decoding="async"
        />

        <motion.img
  src={groupImage}
  srcSet={`
    ${groupImageMobile} 800w,
    ${groupImage} 1920w
  `}
  sizes="(max-width: 768px) 100vw, 1920px"
  alt="Photo du groupe REVEREN sur scène"
  width="1920"
  height="1080"
  fetchPriority="high"
  decoding="async"
  loading="eager"
  initial={{ scale: 1 }}
  whileInView={{ scale: 1.08 }}
  viewport={{ once: true }}
  transition={{
    duration: 15,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "reverse",
  }}
  className="
    absolute inset-0 w-full h-full object-cover
    object-[50%_30%]
    contrast-125 brightness-[0.85]
    dark:brightness-[0.8] dark:contrast-110
  "
/>


        <div
          className="
            absolute inset-0 pointer-events-none
            bg-gradient-to-b from-transparent via-[var(--bg)]/80 to-[var(--bg)]
          "
          aria-hidden="true"
        ></div>

        <div
          className="
            absolute inset-0
            dark:bg-[radial-gradient(circle_at_center,var(--accent)_15%,transparent_70%)]
            blur-[120px] opacity-30 pointer-events-none
          "
          aria-hidden="true"
        ></div>
      </section>

      <section
        className="
          relative z-10 text-center max-w-3xl mx-auto px-6 
          py-16 md:py-20 flex-grow
        "
      >
        <div className="relative inline-block mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent blur-xl opacity-80 animate-pulse-slow"></div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent animate-glow-line"></div>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="
              relative text-5xl md:text-6xl font-extrabold 
              text-[var(--accent)] drop-shadow-[0_0_12px_var(--accent)] 
              tracking-widest uppercase
            "
          >
            REVEREN
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="
            text-[var(--subtext)] leading-relaxed text-sm md:text-base mb-10
          "
        >
          <strong className="text-[var(--accent)]">REVEREN</strong>, c’est la
          fusion brute du rock électrique et de la vibration électronique.
          Un duo singulier composé de{" "}
          <strong className="text-[var(--accent)]">Louis</strong>, guitariste à
          l’énergie débordante et aux solos envoûtants, et de{" "}
          <strong className="text-[var(--accent)]">Antoine</strong>, architecte
          du son numérique, maître des machines et des rythmes électro.
          Ensemble, ils repoussent les frontières du genre pour créer une
          expérience scénique intense, où la guitare vibre au rythme des synthés
          et où chaque note résonne comme une onde lumineuse.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <Button
            variant="primary"
            as="a"
            href="/music"
            className="
              text-lg md:text-base px-10 py-4 md:px-8 md:py-3 rounded-xl
              shadow-md hover:shadow-[0_0_25px_var(--accent)]
              active:scale-95 transition-all duration-300
            "
          >
            ÉCOUTER MAINTENANT
          </Button>
        </motion.div>
      </section>

      <div
        className="
          absolute bottom-[-10%] left-1/2 -translate-x-1/2 
          w-[60vw] h-[60vw]
          bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_75%)]
          opacity-15 blur-[180px] -z-10 pointer-events-none
        "
        aria-hidden="true"
      ></div>
    </main>
  );
}












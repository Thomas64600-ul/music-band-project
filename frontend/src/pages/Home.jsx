import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import groupImage from "../assets/groupImage.png";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-black text-[#F2F2F2]">
     
<section className="relative h-[70vh] md:h-[90vh] overflow-hidden">
  <motion.img
    src={groupImage}
    alt="Groupe REVEREN"
    initial={{ scale: 1 }}
    animate={{ scale: 1.08 }}
    transition={{
      duration: 15,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    }}
   
    className="
      absolute inset-0 w-full h-full object-cover
      object-[50%_35%]          /* base (mobile) */
      sm:object-[50%_30%]
      md:object-[50%_22%]
      lg:object-[50%_15%]
      xl:object-[50%_12%]
      contrast-125
    "
  />
  
  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/80" />
</section>

      
      <section className="relative z-10 text-center max-w-3xl mx-auto px-6 py-16 md:py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#FFD700] drop-shadow-[0_0_10px_#FFD70080] mb-6">
          REVEREN
        </h1>

        <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-8">
          REVEREN, c’est la fusion brute du rock électrique et de la vibration électronique.  
          Un duo singulier composé de <strong>Louis</strong>, guitariste à l’énergie débordante et aux solos envoûtants,  
          et de <strong>Antoine</strong>, architecte du son numérique, maître des machines et des rythmes électro.  
          Ensemble, ils repoussent les frontières du genre pour créer une expérience scénique intense,  
          où la guitare vibre au rythme des synthés et où chaque note résonne comme une onde lumineuse.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <Button
            variant="primary"
            as="a"
            href="/music"
            className="bg-[#B3122D] hover:bg-black border border-[#B3122D] text-white text-lg md:text-base px-10 py-4 md:px-8 md:py-3 rounded-xl shadow-md hover:shadow-[0_0_15px_#B3122D] active:scale-95 transition-all"
          >
            ÉCOUTER MAINTENANT
          </Button>
        </motion.div>
      </section>
    </main>
  );
}





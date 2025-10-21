import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import groupImage from "../assets/groupImage.png";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#0A0A0A] text-[#F2F2F2] relative overflow-hidden">
      
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
            object-[50%_35%]
            sm:object-[50%_30%]
            md:object-[50%_22%]
            lg:object-[50%_15%]
            xl:object-[50%_12%]
            contrast-125 brightness-[0.85]
          "
        />

       
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/70 to-[#0A0A0A]"></div>

        
        <div className="absolute inset-0 bg-gradient-radial from-[#B3122D30] via-transparent to-transparent blur-3xl opacity-70"></div>
      </section>

     
      <section className="relative z-10 text-center max-w-3xl mx-auto px-6 py-16 md:py-20">
        
        <div className="relative inline-block mb-8">
         
          <div className="absolute inset-0 bg-gradient-to-r from-[#B3122D]/0 via-[#B3122D]/40 to-[#B3122D]/0 blur-xl opacity-80 animate-pulse-slow"></div>

          
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#FFD1A1] to-transparent animate-glow-line"></div>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative text-5xl md:text-6xl font-extrabold text-[#B3122D] drop-shadow-[0_0_12px_#B3122D90] tracking-widest"
          >
            REVEREN
          </motion.h1>
        </div>

      
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-gray-300 leading-relaxed text-sm md:text-base mb-10"
        >
          REVEREN, c’est la fusion brute du rock électrique et de la vibration électronique.  
          Un duo singulier composé de <strong className="text-[#B3122D]">Louis</strong>, guitariste à l’énergie débordante et aux solos envoûtants,  
          et de <strong className="text-[#B3122D]">Antoine</strong>, architecte du son numérique, maître des machines et des rythmes électro.  
          Ensemble, ils repoussent les frontières du genre pour créer une expérience scénique intense,  
          où la guitare vibre au rythme des synthés et où chaque note résonne comme une onde lumineuse.
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
            className="text-lg md:text-base px-10 py-4 md:px-8 md:py-3 rounded-xl shadow-md hover:shadow-[0_0_20px_#B3122D90] active:scale-95 transition-all"
          >
            ÉCOUTER MAINTENANT
          </Button>
        </motion.div>
      </section>

      
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-[#B3122D40] rounded-full blur-[150px] opacity-40 -z-10"></div>
    </main>
  );
}






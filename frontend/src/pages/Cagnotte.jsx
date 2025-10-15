import React, { useState, useEffect } from "react";
import DonationCard from "../components/DonationCard";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function Cagnotte() {
  const goal = 5000;
  const [collected, setCollected] = useState(3250);
  const [showModal, setShowModal] = useState(false);
  const [lastAmount, setLastAmount] = useState(null);

 
  const handleDonation = (amount) => {
    setCollected((prev) => Math.min(prev + amount, goal));
    setLastAmount(amount);
    setShowModal(true);
    launchConfetti(); 
  };

 
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => setShowModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  
  const percentage = Math.min((collected / goal) * 100, 100).toFixed(1);

  
  const launchConfetti = () => {
    const duration = 1.5 * 1000;
    const end = Date.now() + duration;

    const colors = ["#FFD700", "#FFF4B0", "#FFA500"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const donations = [
    { amount: 10, description: "Un grand merci sur nos réseaux" },
    { amount: 25, description: "Votre nom dans les remerciements de l’album" },
    { amount: 50, description: "Accès anticipé à un titre inédit" },
    { amount: 100, description: "Invitation backstage à un concert" },
  ];

  return (
    <section className="px-6 sm:px-12 py-16 bg-[#0A0A0A] text-center text-[#F2F2F2] relative overflow-hidden">
      
      <h2 className="text-3xl font-bold text-[#FFD700] mb-6">
        Soutenez REVEREN 
      </h2>
      <p className="max-w-xl mx-auto text-gray-300 mb-10">
        Aidez-nous à financer notre prochain album et nos tournées !
      </p>

      
      <div className="max-w-md mx-auto mb-12">
        <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
          <div
            className="bg-[#FFD700] h-4 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          {collected.toLocaleString()} € collectés sur {goal.toLocaleString()} €
          ({percentage}%)
        </p>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {donations.map((d, i) => (
          <DonationCard
            key={i}
            amount={d.amount}
            description={d.description}
            onDonate={() => handleDonation(d.amount)}
          />
        ))}
      </div>

      
      <AnimatePresence>
        {showModal && (
          <>
            
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.div>

           
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="bg-[#0B0F17] border border-[#FFD700] rounded-2xl shadow-[0_0_25px_#FFD70080] p-8 text-center max-w-sm mx-auto">
                <h3 className="text-[#FFD700] text-2xl font-bold mb-3 animate-pulse">
                  💛 Merci pour votre don !
                </h3>
                <p className="text-gray-300">
                  Vous venez de contribuer à hauteur de{" "}
                  <span className="text-[#FFD700] font-semibold">
                    {lastAmount} €
                  </span>{" "}
                  à l’aventure REVEREN 🎶
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-6 bg-[#FFD700] text-black font-semibold py-2 px-6 rounded-full hover:bg-black hover:text-[#FFD700] transition-all duration-300"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}


import React, { useState, useEffect } from "react";
import DonationCard from "../components/DonationCard";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { post } from "../lib/api"; // ✅ ton utilitaire d’appel API (axios ou fetch)

export default function Cagnotte() {
  const goal = 5000;
  const [collected, setCollected] = useState(3250);
  const [showModal, setShowModal] = useState(false);
  const [lastAmount, setLastAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

 
  const percentage = Math.min((collected / goal) * 100, 100).toFixed(1);

 
  const launchConfetti = () => {
    const duration = 1.5 * 1000;
    const end = Date.now() + duration;
    const colors = ["#B3122D", "#FFD700", "#FF4C4C"];

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
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

 
  const handleLocalDonation = (amount) => {
    setCollected((prev) => Math.min(prev + amount, goal));
    setLastAmount(amount);
    setShowModal(true);
    launchConfetti();
  };

  
  const handleStripeDonation = async (amount) => {
    try {
      setLoading(true);
      const response = await post("/donations/create-checkout-session", {
        amount,
        message,
      });
      window.location.href = response.url; 
    } catch (error) {
      console.error("Erreur de don :", error);
      alert("Erreur lors de la création de la session Stripe.");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => setShowModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  
  const donations = [
    { amount: 10, description: "Un grand merci sur nos réseaux" },
    { amount: 25, description: "Votre nom dans les remerciements de l’album" },
    { amount: 50, description: "Accès anticipé à un titre inédit" },
    { amount: 100, description: "Invitation backstage à un concert" },
  ];

  return (
   <section className="px-6 sm:px-12 py-24 md:py-28 bg-[#0A0A0A] text-center text-[#F2F2F2] relative overflow-hidden">
  <div className="relative inline-block mb-12">
  
  <div className="absolute inset-0 bg-gradient-to-r from-[#B3122D]/0 via-[#B3122D]/40 to-[#B3122D]/0 blur-xl opacity-80 animate-pulse-slow"></div>

  
  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#FFD1A1] to-transparent animate-glow-line"></div>

  <h2 className="relative text-3xl md:text-4xl font-extrabold text-[#B3122D] drop-shadow-[0_0_10px_#B3122D80] tracking-wider">
    Soutenez REVEREN
  </h2>
</div>

<p className="max-w-xl mx-auto text-gray-400 text-base md:text-lg mb-12">
  Aidez-nous à financer notre prochain album et nos tournées !
</p>

 
  <div className="max-w-md mx-auto mb-14">
    <div className="bg-[#1A1A1A] rounded-full h-4 overflow-hidden shadow-inner">
      <div
        className="bg-[#B3122D] h-4 rounded-full transition-all duration-700 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <p className="text-sm text-gray-400 mt-3 font-medium">
      {collected.toLocaleString()} € collectés sur {goal.toLocaleString()} € ({percentage}%)
    </p>
  </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {donations.map((d, i) => (
          <DonationCard
            key={i}
            amount={d.amount}
            description={d.description}
            onDonate={() => handleStripeDonation(d.amount)}
          />
        ))}
      </div>

      
      <div className="max-w-md mx-auto bg-[#111] border border-[#B3122D]/60 rounded-2xl p-6 shadow-lg">
        <h3 className="text-[#FFD700] font-bold text-xl mb-4">Montant libre</h3>

        <input
          type="number"
          min="1"
          step="1"
          placeholder="Entrez un montant (ex : 20)"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-[#0A0A0A] text-[#F2F2F2] border border-gray-700 focus:border-[#B3122D] outline-none text-center"
        />

        <textarea
          placeholder="Un petit message (facultatif)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="3"
          className="w-full p-3 mb-4 rounded-lg bg-[#0A0A0A] text-[#F2F2F2] border border-gray-700 focus:border-[#FFD700] outline-none text-center"
        />

        <button
          onClick={() => handleStripeDonation(parseFloat(customAmount))}
          disabled={!customAmount || loading}
          className="bg-[#B3122D] hover:bg-black border border-[#B3122D] text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 w-full disabled:opacity-50"
        >
          {loading ? "Redirection..." : "Faire un don"}
        </button>
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
              <div className="bg-[#0B0F17] border border-[#B3122D] rounded-2xl shadow-[0_0_25px_#B3122D80] p-8 text-center max-w-sm mx-auto">
                <h3 className="text-[#FFD700] text-2xl font-bold mb-3 animate-pulse">
                  Merci pour votre don !
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
                  className="mt-6 bg-[#B3122D] text-white font-semibold py-2 px-6 rounded-full hover:bg-black hover:text-[#B3122D] transition-all duration-300"
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


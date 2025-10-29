import React, { useState, useEffect } from "react";
import DonationCard from "../components/DonationCard";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { createStripeSession } from "../lib/api";

export default function Cagnotte() {
  const goal = 5000;
  const [collected, setCollected] = useState(3250);
  const [showModal, setShowModal] = useState(false);
  const [lastAmount, setLastAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [email, setEmail] = useState("");
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

  const handleStripeDonation = async (amount) => {
    if (!amount || isNaN(amount))
      return alert("Veuillez saisir un montant valide.");
    if (!email) return alert("Veuillez saisir votre adresse email.");

    try {
      setLoading(true);
      setLastAmount(amount);
      await createStripeSession({
        amount: parseFloat(amount),
        message,
        email,
        user_id: localStorage.getItem("userId") || null,
      });

      setShowModal(true); 
      launchConfetti(); 
    } catch (error) {
      console.error("Erreur Stripe:", error);
      alert("Erreur lors de la création du paiement.");
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
    <section
      className="
        px-6 sm:px-12 py-24 md:py-28 
        bg-[#F8F8F8] text-[#1A1A1A]
        dark:bg-[#0A0A0A] dark:text-[#F2F2F2]
        text-center relative overflow-hidden transition-colors duration-700
      "
    >
   
      <div
        className="
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[80vw] sm:w-[60vw] h-[80vw] sm:h-[60vw]
          bg-[radial-gradient(circle_at_center,#FFD1A133_0%,transparent_70%)]
          dark:bg-[radial-gradient(circle_at_center,#B3122D44_0%,transparent_70%)]
          blur-[150px] opacity-60 pointer-events-none -z-10
        "
      ></div>

   
      <div className="relative inline-block mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B3122D33] to-transparent blur-md"></div>
        <h2 className="relative text-3xl md:text-4xl font-extrabold text-[#B3122D] drop-shadow-[0_0_10px_#B3122D55] tracking-wider">
          Soutenez REVEREN
        </h2>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#B3122D] to-transparent animate-glow-line"></div>
      </div>

      <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-400 text-base md:text-lg mb-12">
        Aidez-nous à financer notre prochain album et nos tournées !
      </p>

    
      <div className="max-w-md mx-auto mb-14">
        <div className="bg-gray-200 dark:bg-[#1A1A1A] rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className="bg-[#B3122D] h-4 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 font-medium transition-all">
          {collected.toLocaleString()} € collectés sur {goal.toLocaleString()} €
          {"  "}
          <span className="text-[#B3122D] font-semibold">
            ({percentage}%)
          </span>
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

      <div
        className="
          max-w-md mx-auto bg-white dark:bg-[#111] 
          border border-gray-200 dark:border-[#B3122D]/60
          rounded-2xl p-6 
          shadow-[0_0_20px_rgba(0,0,0,0.05)]
          dark:shadow-[0_0_25px_#B3122D40]
          transition-all duration-300 hover:shadow-[0_0_25px_#B3122D55]
        "
      >
        <h3 className="text-[#B3122D] font-bold text-xl mb-4">Montant libre</h3>

        <input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full p-3 mb-4 rounded-lg 
            bg-[#F8F8F8] dark:bg-[#0A0A0A]
            text-[#1A1A1A] dark:text-[#F2F2F2]
            border border-gray-300 dark:border-gray-700
            focus:border-[#B3122D] outline-none text-center
          "
        />

        <input
          type="number"
          min="1"
          step="1"
          placeholder="Entrez un montant (ex : 20)"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="
            w-full p-3 mb-4 rounded-lg 
            bg-[#F8F8F8] dark:bg-[#0A0A0A]
            text-[#1A1A1A] dark:text-[#F2F2F2]
            border border-gray-300 dark:border-gray-700
            focus:border-[#B3122D] outline-none text-center
          "
        />

        <textarea
          placeholder="Un petit message (facultatif)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="3"
          className="
            w-full p-3 mb-4 rounded-lg 
            bg-[#F8F8F8] dark:bg-[#0A0A0A]
            text-[#1A1A1A] dark:text-[#F2F2F2]
            border border-gray-300 dark:border-gray-700
            focus:border-[#B3122D] outline-none text-center
          "
        />

        <button
          onClick={() => handleStripeDonation(customAmount)}
          disabled={!customAmount || loading}
          className="
            bg-[#B3122D] hover:bg-[#A01025]
            text-white font-semibold py-2 px-6 rounded-full 
            transition-all duration-300 w-full disabled:opacity-50
            hover:shadow-[0_0_25px_#B3122D88] active:scale-[0.97]
          "
        >
          {loading ? "Redirection..." : "Faire un don"}
        </button>
      </div>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
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
              <div className="bg-white dark:bg-[#0B0F17] border border-[#B3122D] rounded-2xl shadow-[0_0_25px_#B3122D60] p-8 text-center max-w-sm mx-auto">
                <h3 className="text-[#B3122D] text-2xl font-bold mb-3 animate-pulse">
                  Merci pour votre don !
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Vous venez de contribuer à hauteur de{" "}
                  <span className="text-[#B3122D] font-semibold">
                    {lastAmount} €
                  </span>{" "}
                  à l’aventure REVEREN.
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-6 bg-[#B3122D] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#A01025] transition-all duration-300"
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




import React, { useState, useEffect, useRef } from "react";
import DonationCard from "../components/DonationCard";
import { createStripeSession } from "../lib/api";

export default function Cagnotte() {
  const goal = 5000;

  const [collected, setCollected] = useState(0);
  const [customAmount, setCustomAmount] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);

  const percentage = Math.min((collected / goal) * 100, 100).toFixed(1);

  useEffect(() => {
    async function fetchPublicStats() {
      try {
        const res = await fetch(
          "https://music-band-project.onrender.com/api/donations/public-stats"
        );
        const data = await res.json();
        setCollected(Number(data.total_montant) || 0);
      } catch (err) {
        console.error("Erreur stats cagnotte:", err);
        setCollected(0);
      }
    }

    fetchPublicStats();
  }, []);

  const handleStripeDonation = async (amount) => {
    if (!amount || isNaN(amount))
      return alert("Veuillez saisir un montant valide.");

    if (!email) {
      emailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      emailRef.current?.focus();
      return alert("Veuillez saisir votre adresse email.");
    }

    try {
      setLoading(true);

      await createStripeSession({
        amount: parseFloat(amount),
        message,
        email,
        user_id: localStorage.getItem("userId") || null,
      });

    } catch (error) {
      console.error("Erreur Stripe:", error);
      alert("Erreur lors de la création du paiement.");
    } finally {
      setLoading(false);
    }
  };

  const donations = [
    {
      amount: 10,
      description:
        "Soutien symbolique : vous aidez à lancer le projet et à diffuser notre musique.",
    },
    {
      amount: 25,
      description:
        "Soutien actif : vous participez au financement studio, mix et mastering.",
    },
    {
      amount: 50,
      description:
        "Soutien fort : vous contribuez directement à la production du clip et des visuels.",
    },
    {
      amount: 100,
      description:
        "Soutien majeur : vous faites avancer le projet plus vite (studio + clip + communication).",
    },
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

      <div className="relative inline-block mb-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B3122D33] to-transparent blur-md"></div>
        <h2 className="relative text-3xl md:text-4xl font-extrabold text-[#B3122D] drop-shadow-[0_0_10px_#B3122D55] tracking-wider">
          Soutenez REVEREN
        </h2>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#B3122D] to-transparent animate-glow-line"></div>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
          <span className="font-semibold text-[#B3122D]">REVEREN démarre.</span>{" "}
          On a la musique, l’énergie et la vision. Il nous manque les moyens pour
          la rendre visible : studio, mix/master, clip, diffusion.
          <br />
          <br />
          Votre don devient du concret : une session studio, un montage vidéo,
          une sortie propre sur les plateformes. Merci de nous aider à
          transformer un projet naissant en vraie aventure.
        </p>

        <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          <p className="font-semibold mb-2 text-[#B3122D]">
            À quoi servira votre soutien ?
          </p>
          <ul className="space-y-1">
            <li>🎙️ Enregistrement studio</li>
            <li>🎚️ Mix & mastering</li>
            <li>🎬 Clip / contenu vidéo</li>
            <li>📣 Diffusion & communication</li>
            <li>🚐 Répétitions & logistique</li>
          </ul>
        </div>
      </div>

      <div className="max-w-md mx-auto mb-8">
        <div className="bg-gray-200 dark:bg-[#1A1A1A] rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className="bg-[#B3122D] h-4 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 font-medium transition-all">
          {collected.toLocaleString()} € collectés sur {goal.toLocaleString()} €
          {"  "}
          <span className="text-[#B3122D] font-semibold">({percentage}%)</span>
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Pour recevoir les nouvelles du projet (studio/clip), indiquez votre
          email :
        </p>

        <input
          ref={emailRef}
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full p-3 rounded-lg 
            bg-[#F8F8F8] dark:bg-[#0A0A0A]
            text-[#1A1A1A] dark:text-[#F2F2F2]
            border border-gray-300 dark:border-gray-700
            focus:border-[#B3122D] outline-none text-center
          "
        />
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
        <h3 className="text-[#B3122D] font-bold text-xl mb-2">Montant libre</h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Choisissez le montant. Laissez un message si vous le souhaitez.
        </p>

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

        <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
          Merci 🙏 Chaque soutien aide concrètement le projet à avancer.
        </p>
      </div>
    </section>
  );
}




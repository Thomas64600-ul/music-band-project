import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import confetti from "canvas-confetti";

export default function DonationSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  const [hasShot, setHasShot] = useState(false);

  useEffect(() => {
    if (hasShot) return;

    const duration = 1500;
    const end = Date.now() + duration;
    const colors = ["#B3122D", "#FFD700", "#FF4C4C"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    setHasShot(true);
  }, [hasShot]);

  return (
    <section
      className="
        px-6 sm:px-12 py-24 md:py-28 
        text-center relative overflow-hidden
        bg-[#F8F8F8] text-[#1A1A1A]
        dark:bg-[#0A0A0A] dark:text-[#F2F2F2]
        transition-colors duration-700
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

      <div
        className="
          max-w-xl mx-auto
          bg-white dark:bg-[#111]
          border border-gray-200 dark:border-[#B3122D]/60
          rounded-2xl p-8
          shadow-[0_0_20px_rgba(0,0,0,0.06)]
          dark:shadow-[0_0_25px_#B3122D40]
        "
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#B3122D] drop-shadow-[0_0_10px_#B3122D55]">
          Merci pour votre soutien 🤘
        </h1>

        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          Votre paiement a bien été confirmé. Grâce à vous, REVEREN avance
          concrètement : studio, mix/master, clip et diffusion.
        </p>

        {sessionId && (
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-500">
            Référence : <span className="font-mono">{sessionId}</span>
          </p>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/cagnotte"
            className="
              bg-[#B3122D] hover:bg-[#A01025]
              text-white font-semibold py-2 px-6 rounded-full
              transition-all duration-300
              hover:shadow-[0_0_25px_#B3122D88]
            "
          >
            Retour à la cagnotte
          </Link>

          <Link
            to="/"
            className="
              border border-gray-300 dark:border-gray-700
              text-gray-700 dark:text-gray-200
              font-semibold py-2 px-6 rounded-full
              hover:border-[#B3122D] hover:text-[#B3122D]
              transition-all duration-300
            "
          >
            Revenir à l’accueil
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          Vous pouvez suivre les avancées sur nos réseaux : coulisses studio,
          annonces et sorties.
        </p>
      </div>
    </section>
  );
}

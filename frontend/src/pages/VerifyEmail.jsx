import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { get } from "../lib/api";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

export default function VerifyEmail() {
  const { token } = useParams();
  const [message, setMessage] = useState("Vérification de ton compte en cours...");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function verify() {
      try {
        const data = await get(`/users/verify/${token}`);
        if (data.success) {
          setStatus("success");
          setMessage("Ton adresse e-mail a été vérifiée avec succès!");
        } else {
          setStatus("error");
          setMessage(data.error || "Lien de vérification invalide ou expiré.");
        }
      } catch (error) {
        console.error("Erreur de vérification :", error);
        setStatus("error");
        setMessage("Une erreur est survenue pendant la vérification.");
      }
    }
    verify();
  }, [token]);

  const icon =
    status === "success" ? (
      <FaCheckCircle
        className="text-green-500 text-5xl mb-4 animate-bounce"
        aria-label="Vérification réussie"
      />
    ) : status === "error" ? (
      <FaTimesCircle
        className="text-red-500 text-5xl mb-4 animate-pulse"
        aria-label="Erreur de vérification"
      />
    ) : (
      <FaSpinner
        className="text-[#FFD700] text-5xl mb-4 animate-spin"
        aria-label="Chargement en cours"
      />
    );

  return (
    <motion.main
      role="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="
        min-h-screen flex flex-col items-center justify-center
        bg-[var(--bg)] text-[var(--text)]
        transition-colors duration-700 ease-in-out text-center px-6
      "
    >
     
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          w-full max-w-md p-8 rounded-2xl shadow-lg
          bg-[var(--card)] border border-[var(--border)]
          text-center transition-all duration-500
        "
      >
        <div className="flex flex-col items-center">{icon}</div>

        <h1 className="text-2xl font-bold text-[var(--accent)] mb-4 drop-shadow-[0_0_12px_var(--accent)]">
          Vérification d’e-mail
        </h1>

        <p
          role="status"
          className="text-base leading-relaxed mb-8 text-[var(--subtext)]"
        >
          {message}
        </p>

        {status === "success" && (
          <Link
            to="/login"
            className="
              inline-block bg-[var(--accent)] text-white font-semibold
              px-6 py-3 rounded-xl
              hover:bg-[var(--gold)] hover:text-[var(--bg)]
              hover:shadow-[0_0_25px_var(--accent)]
              focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50
              transition-all duration-300 ease-in-out
            "
          >
            Se connecter
          </Link>
        )}

        {status === "error" && (
          <Link
            to="/register"
            className="
              inline-block bg-red-600 text-white font-semibold
              px-6 py-3 rounded-xl
              hover:bg-red-700 hover:shadow-[0_0_25px_rgba(255,0,0,0.5)]
              focus:outline-none focus:ring-2 focus:ring-red-400
              transition-all duration-300 ease-in-out
            "
          >
            Créer un compte
          </Link>
        )}
      </motion.div>

      <footer className="mt-6 text-sm opacity-60">
        © 2025{" "}
        <span className="text-[var(--accent)] font-semibold">REVEREN</span> — Fast Turtle Records
      </footer>
    </motion.main>
  );
}


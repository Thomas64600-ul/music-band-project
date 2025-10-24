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
          setMessage("Ton adresse e-mail a été vérifiée avec succès 🎉 !");
        } else {
          setStatus("error");
          setMessage(data.error || "Token invalide ou expiré.");
        }
      } catch (error) {
        console.error(error);
        setStatus("error");
        setMessage("Une erreur est survenue pendant la vérification.");
      }
    }
    verify();
  }, [token]);

  const icon =
    status === "success" ? (
      <FaCheckCircle className="text-green-500 text-5xl mb-4 animate-bounce" />
    ) : status === "error" ? (
      <FaTimesCircle className="text-red-500 text-5xl mb-4 animate-pulse" />
    ) : (
      <FaSpinner className="text-[#FFD700] text-5xl mb-4 animate-spin" />
    );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center transition-colors duration-500
        bg-[var(--bg)] text-[var(--text)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-[90%] sm:w-[500px] p-8 rounded-2xl shadow-lg
        bg-[var(--card)] border border-[var(--border)] text-center"
      >
        <div className="flex flex-col items-center">{icon}</div>

        <h1 className="text-2xl font-bold text-[var(--accent)] mb-4">
          Vérification d'e-mail
        </h1>

        <p className="text-base leading-relaxed mb-8">{message}</p>

        {status === "success" && (
          <Link
            to="/login"
            className="inline-block bg-[var(--accent)] hover:bg-[var(--accent-hover)] 
            text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-md"
          >
            Se connecter
          </Link>
        )}

        {status === "error" && (
          <Link
            to="/register"
            className="inline-block bg-red-600 hover:bg-red-700 
            text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-md"
          >
            Créer un compte
          </Link>
        )}
      </motion.div>

      <p className="mt-6 text-sm opacity-60">
        © 2025 <span className="text-[var(--accent)] font-semibold">REVEREN</span> — Fast Turtle Records
      </p>
    </div>
  );
}


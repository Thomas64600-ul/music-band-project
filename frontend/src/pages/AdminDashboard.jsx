import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "../components/Button";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="
        flex flex-col items-center justify-center
        py-10 px-4 sm:px-6 md:px-8 min-h-screen
        bg-[var(--bg)] text-[var(--text)]
        relative overflow-hidden
        transition-colors duration-700 ease-in-out
      "
    >
      
      <div
        className="
          absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_center,#B3122D33_0%,transparent_70%)]
          blur-[150px] opacity-70
        "
      ></div>

      <div
        className="
          relative w-full max-w-3xl text-center
          bg-[var(--surface)]
          border border-[var(--border)]
          rounded-2xl 
          shadow-[0_0_25px_var(--accent)]
          hover:shadow-[0_0_35px_var(--accent)]
          hover:border-[var(--accent)]
          p-8 sm:p-10
          transition-all duration-300
        "
      >
        <h1
          className="
            text-3xl sm:text-4xl font-extrabold text-[var(--accent)]
            mb-6 drop-shadow-[0_0_15px_var(--accent)]
          "
        >
          Tableau de bord Admin
        </h1>

        <p className="mb-10 text-[var(--subtext)] text-sm sm:text-base leading-relaxed">
          Bienvenue{" "}
          <span className="text-[var(--accent)] font-semibold">
            {user?.firstname}
          </span>{" "}
          ! Gère le contenu du site{" "}
          <strong className="text-[var(--accent)]">REVEREN</strong> depuis ce
          panneau.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-center">
          <Button
            onClick={() => navigate("/admin/articles")}
            className="
              bg-[var(--accent)] text-white py-3 rounded-lg font-semibold
              hover:bg-[var(--gold)] hover:text-[var(--bg)]
              hover:shadow-[0_0_15px_var(--accent)] transition-all duration-300
            "
          >
            GÉRER LES ARTICLES
          </Button>

          <Button
            onClick={() => navigate("/admin/concerts")}
            className="
              bg-[var(--accent)] text-white py-3 rounded-lg font-semibold
              hover:bg-[var(--gold)] hover:text-[var(--bg)]
              hover:shadow-[0_0_15px_var(--accent)] transition-all duration-300
            "
          >
            GÉRER LES CONCERTS
          </Button>

          <Button
            onClick={() => navigate("/admin/musics")}
            className="
              bg-[var(--accent)] text-white py-3 rounded-lg font-semibold
              hover:bg-[var(--gold)] hover:text-[var(--bg)]
              hover:shadow-[0_0_15px_var(--accent)] transition-all duration-300
            "
          >
            GÉRER LES MUSIQUES
          </Button>

          <Button
            onClick={() => navigate("/admin/donations")}
            className="
              bg-[var(--accent)] text-white py-3 rounded-lg font-semibold
              hover:bg-[var(--gold)] hover:text-[var(--bg)]
              hover:shadow-[0_0_15px_var(--accent)] transition-all duration-300
            "
          >
            GÉRER LES DONS
          </Button>

          <Button
            onClick={() => navigate("/admin/messages")}
            className="
              bg-[var(--accent)] text-white py-3 rounded-lg font-semibold
              hover:bg-[var(--gold)] hover:text-[var(--bg)]
              hover:shadow-[0_0_15px_var(--accent)] transition-all duration-300
            "
          >
            GÉRER LES MESSAGES
          </Button>

          <Button
            onClick={() => navigate("/admin/comments")}
            className="
              bg-[var(--accent)] text-white py-3 rounded-lg font-semibold
              hover:bg-[var(--gold)] hover:text-[var(--bg)]
              hover:shadow-[0_0_15px_var(--accent)] transition-all duration-300
            "
          >
            GÉRER LES COMMENTAIRES
          </Button>

          <Button
            onClick={() => navigate("/admin/users")}
            className="
              bg-[var(--accent)] text-white py-3 rounded-lg font-semibold
              hover:bg-[var(--gold)] hover:text-[var(--bg)]
              hover:shadow-[0_0_15px_var(--accent)] transition-all duration-300
            "
          >
            GÉRER LES UTILISATEURS
          </Button>

          <Button
            onClick={() => navigate("/admin/stats")}
            className="
              bg-[var(--accent)] text-white py-3 rounded-lg font-semibold
              hover:bg-[var(--gold)] hover:text-[var(--bg)]
              hover:shadow-[0_0_15px_var(--accent)] transition-all duration-300
            "
          >
            STATISTIQUES GLOBALES
          </Button>
        </div>
      </div>

      <div
        className="
          absolute bottom-0 left-1/2 -translate-x-1/2
          w-[60vw] h-[60vw]
          bg-[radial-gradient(circle_at_center,#B3122D33_0%,transparent_70%)]
          blur-[120px] opacity-60 pointer-events-none
        "
      ></div>
    </motion.section>
  );
}











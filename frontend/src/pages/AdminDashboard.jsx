import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "../components/Button";

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] flex flex-col items-center justify-center py-10 px-4 sm:px-6 md:px-8">
      <div className="bg-[#111111] border border-[#B3122D50] rounded-2xl shadow-[0_0_25px_#B3122D30] p-8 sm:p-10 w-full max-w-3xl text-center">
        {/* === Titre === */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#B3122D] mb-6 drop-shadow-[0_0_12px_#B3122D80]">
          Tableau de bord Admin
        </h1>

        {/* === Sous-titre === */}
        <p className="mb-10 text-gray-400 text-sm sm:text-base leading-relaxed">
          Bienvenue{" "}
          <span className="text-[#FF4C4C] font-semibold">
            {user?.firstname}
          </span>{" "}
          ! Gère le contenu du site{" "}
          <strong className="text-[#B3122D]">REVEREN</strong> depuis ce panneau.
        </p>

        {/* === Grille des boutons === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-center">
          <Button
            variant="primary"
            onClick={() => navigate("/admin/articles")}
            className="bg-[#B3122D] text-white py-3 rounded-lg font-semibold hover:bg-[#FF4C4C] hover:shadow-[0_0_15px_#FF4C4C80] transition-all duration-300"
          >
            GÉRER LES ARTICLES
          </Button>

          <Button
            variant="primary"
            onClick={() => navigate("/admin/concerts")}
            className="bg-[#B3122D] text-white py-3 rounded-lg font-semibold hover:bg-[#FF4C4C] hover:shadow-[0_0_15px_#FF4C4C80] transition-all duration-300"
          >
            GÉRER LES CONCERTS
          </Button>

          <Button
            variant="primary"
            onClick={() => navigate("/admin/musics")}
            className="bg-[#B3122D] text-white py-3 rounded-lg font-semibold hover:bg-[#FF4C4C] hover:shadow-[0_0_15px_#FF4C4C80] transition-all duration-300"
          >
            GÉRER LES MUSIQUES
          </Button>

          <Button
            variant="primary"
            onClick={() => navigate("/admin/donations")}
            className="bg-[#B3122D] text-white py-3 rounded-lg font-semibold hover:bg-[#FF4C4C] hover:shadow-[0_0_15px_#FF4C4C80] transition-all duration-300"
          >
            GÉRER LES DONS
          </Button>

          <Button
            variant="primary"
            onClick={() => navigate("/admin/messages")}
            className="bg-[#B3122D] text-white py-3 rounded-lg font-semibold hover:bg-[#FF4C4C] hover:shadow-[0_0_15px_#FF4C4C80] transition-all duration-300"
          >
            GÉRER LES MESSAGES
          </Button>

          <Button
            variant="primary"
            onClick={() => navigate("/admin/stats")}
            className="bg-[#B3122D] text-white py-3 rounded-lg font-semibold hover:bg-[#FF4C4C] hover:shadow-[0_0_15px_#FF4C4C80] transition-all duration-300"
          >
            STATISTIQUES GLOBALES
          </Button>
        </div>

        {/* === Bouton retour === */}
        <div className="mt-10">
          <Button
            variant="danger"
            onClick={() => navigate("/")}
            className="bg-[#0A0A0A] border border-[#B3122D] text-[#B3122D] px-6 py-2 rounded-lg font-semibold hover:bg-[#B3122D] hover:text-white hover:shadow-[0_0_10px_#B3122D80] transition-all duration-300"
          >
            RETOUR AU SITE
          </Button>
        </div>
      </div>
    </section>
  );
}





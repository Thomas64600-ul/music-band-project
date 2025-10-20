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
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] flex flex-col items-center justify-center py-16 px-6">
      <div className="bg-[#111] border border-[#FFD70040] rounded-2xl shadow-lg p-10 w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-[#FFD700] mb-8">
          Tableau de bord Admin
        </h1>
        <p className="mb-8 text-gray-300">
          Bienvenue <span className="text-[#FFD700]">{user?.firstname}</span> !  
          Gère le contenu du site <strong>REVEREN</strong> depuis ce panneau.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Button variant="primary" onClick={() => navigate("/admin/articles")}>
            Gérer les articles
          </Button>

          <Button variant="primary" onClick={() => navigate("/admin/concerts")}>
            Gérer les concerts
          </Button>

          <Button variant="primary" onClick={() => navigate("/admin/musics")}>
            Gérer les musiques 
          </Button>

          <Button variant="secondary" onClick={() => navigate("/admin/donations")}>
            Gérer les dons
          </Button>

          <Button variant="secondary" onClick={() => navigate("/admin/messages")}>
            Gérer les messages
          </Button>

          <Button variant="primary" onClick={() => navigate("/admin/stats")}>
            Statistiques globales
          </Button>
        </div>

        <div className="mt-10">
          <Button variant="danger" onClick={() => navigate("/")}>
            Retour au site
          </Button>
        </div>
      </div>
    </section>
  );
}



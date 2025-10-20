import { useEffect, useState } from "react";
import { get, del } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function AdminListMusics() {
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const data = await get("/musics");
        console.log("Réponse API /musics :", data);

        setMusics(Array.isArray(data.data) ? data.data : data);
      } catch (e) {
        console.error("Erreur chargement musiques :", e);
        setMusics([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Supprimer cette musique ?")) return;
    try {
      await del(`/musics/${id}`);
      setMusics((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      console.error("Erreur suppression musique:", e);
      alert("Erreur lors de la suppression");
    }
  }

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400">
        Chargement des musiques...
      </p>
    );

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] py-12 px-6 sm:px-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#FF1744]">
          Gestion des musiques
        </h1>
        <Button
          variant="primary"
          onClick={() => navigate("/admin/musics/new")}
        >
          Nouvelle musique
        </Button>
      </div>

      {musics.length === 0 ? (
        <p className="text-gray-400">Aucune musique pour le moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 bg-[#111] rounded-xl">
            <thead>
              <tr className="text-[#FF1744] border-b border-gray-700">
                <th className="py-3 px-4 text-left">Titre</th>
                <th className="py-3 px-4 text-left hidden sm:table-cell">Artiste</th>
                <th className="py-3 px-4 text-left hidden md:table-cell">Date</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {musics.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-gray-800 hover:bg-[#1a1a1a]"
                >
                  <td className="py-3 px-4">{m.title}</td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    {m.artist || "—"}
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    {m.created_at
                      ? new Date(m.created_at).toLocaleDateString("fr-FR")
                      : "—"}
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/admin/musics/edit/${m.id}`)}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(m.id)}
                    >
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

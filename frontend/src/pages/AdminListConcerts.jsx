import { useEffect, useState } from "react";
import { get, del } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function AdminListConcerts() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  
  useEffect(() => {
    (async () => {
      try {
        const data = await get("/concerts");
        setConcerts(data);
      } catch (e) {
        console.error("Erreur lors du chargement des concerts :", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Supprimer ce concert ?")) return;
    try {
      await del(`/concerts/${id}`);
      setConcerts((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      console.error("Erreur lors de la suppression :", e);
      alert("Erreur lors de la suppression");
    }
  }

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400">
        Chargement des concerts...
      </p>
    );

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] py-12 px-6 sm:px-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#FFD700]">Gestion des concerts</h1>
        <Button variant="primary" onClick={() => navigate("/admin/concerts/new")}>
          Nouveau concert
        </Button>
      </div>

      {concerts.length === 0 ? (
        <p className="text-gray-400">Aucun concert pour le moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 bg-[#111] rounded-xl">
            <thead>
              <tr className="text-[#FFD700] border-b border-gray-700">
                <th className="py-3 px-4 text-left">Ville</th>
                <th className="py-3 px-4 text-left hidden sm:table-cell">Date</th>
                <th className="py-3 px-4 text-left hidden md:table-cell">Lieu</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {concerts.map((c) => (
                <tr key={c.id} className="border-b border-gray-800 hover:bg-[#1a1a1a]">
                  <td className="py-3 px-4">{c.city}</td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    {new Date(c.date).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">{c.location}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/admin/concerts/edit/${c.id}`)}
                    >
                      Modifier
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(c.id)}>
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

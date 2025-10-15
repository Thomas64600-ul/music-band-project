import { useEffect, useState } from "react";
import { get, del } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

 
  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  
  useEffect(() => {
    (async () => {
      try {
        const data = await get("/donations");
        setDonations(data);
      } catch (e) {
        console.error("Erreur lors du chargement des dons :", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Supprimer ce don ?")) return;
    try {
      await del(`/donations/${id}`);
      setDonations((prev) => prev.filter((d) => d.id !== id));
    } catch (e) {
      console.error("Erreur suppression don:", e);
      alert("Erreur lors de la suppression");
    }
  }

  const total = donations.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400">
        Chargement des dons...
      </p>
    );

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] py-12 px-6 sm:px-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#FFD700]">Gestion des dons</h1>
        <Button variant="secondary" onClick={() => navigate("/admin")}>
          Retour Dashboard
        </Button>
      </div>

      <div className="mb-8 text-center bg-[#111] py-4 rounded-xl border border-[#FFD70040]">
        <p className="text-xl font-semibold">
          Total collecté :{" "}
          <span className="text-[#FFD700]">{total.toFixed(2)} €</span>
        </p>
      </div>

      {donations.length === 0 ? (
        <p className="text-gray-400">Aucun don enregistré.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 bg-[#111] rounded-xl">
            <thead>
              <tr className="text-[#FFD700] border-b border-gray-700">
                <th className="py-3 px-4 text-left">Utilisateur</th>
                <th className="py-3 px-4 text-left hidden sm:table-cell">Montant (€)</th>
                <th className="py-3 px-4 text-left hidden md:table-cell">Message</th>
                <th className="py-3 px-4 text-center">Statut</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d.id} className="border-b border-gray-800 hover:bg-[#1a1a1a]">
                  <td className="py-3 px-4">{d.user_name || "Anonyme"}</td>
                  <td className="py-3 px-4 hidden sm:table-cell text-[#FFD700] font-semibold">
                    {d.amount ? `${parseFloat(d.amount).toFixed(2)}` : "—"}
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell max-w-xs truncate">
                    {d.message || "—"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {d.status === "succeeded" ? "Validé" : "En attente"}
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <Button variant="danger" onClick={() => handleDelete(d.id)}>
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

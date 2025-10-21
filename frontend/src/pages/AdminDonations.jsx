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

  const total = donations.reduce(
    (sum, d) => sum + (parseFloat(d.amount) || 0),
    0
  );

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400 animate-pulse">
        Chargement des dons...
      </p>
    );

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] py-10 px-6 sm:px-12">
      {/* --- En-tête --- */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-[#B3122D] drop-shadow-[0_0_12px_#B3122D70]">
          Gestion des dons
        </h1>
        <Button
          variant="secondary"
          onClick={() => navigate("/admin")}
          className="border border-[#B3122D] text-[#B3122D] hover:bg-[#B3122D] hover:text-white font-semibold rounded-xl shadow-[0_0_10px_#B3122D40]"
        >
          Retour Dashboard
        </Button>
      </div>

      {/* --- Total collecté --- */}
      <div className="mb-10 bg-[#111] py-5 px-6 rounded-2xl border border-[#B3122D40] shadow-[0_0_25px_#B3122D20] text-center">
        <p className="text-xl font-semibold">
          Total collecté :{" "}
          <span className="text-[#FF4C4C]">{total.toFixed(2)} €</span>
        </p>
      </div>

      {/* --- Aucun don --- */}
      {donations.length === 0 ? (
        <p className="text-gray-400 text-center italic">
          Aucun don enregistré pour le moment.
        </p>
      ) : (
        <>
          {/* --- Mobile : cartes --- */}
          <div className="grid gap-6 sm:hidden">
            {donations.map((d) => (
              <div
                key={d.id}
                className="bg-[#111] border border-[#B3122D40] rounded-2xl p-5 shadow-[0_0_20px_#B3122D20] transition hover:shadow-[0_0_25px_#B3122D40]"
              >
                <h3 className="text-lg font-semibold text-[#F2F2F2] mb-1">
                  {d.user_name || "Anonyme"}
                </h3>
                <p className="text-sm text-gray-400 mb-1">
                  💰 Montant :{" "}
                  <span className="text-[#FF4C4C] font-semibold">
                    {d.amount ? `${parseFloat(d.amount).toFixed(2)} €` : "—"}
                  </span>
                </p>
                <p className="text-sm text-gray-400 mb-1">
                  💬 {d.message || "Aucun message"}
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  📦 Statut :{" "}
                  <span
                    className={
                      d.status === "succeeded"
                        ? "text-[#4CAF50]"
                        : "text-[#FF4C4C]"
                    }
                  >
                    {d.status === "succeeded" ? "Validé" : "En attente"}
                  </span>
                </p>

                <div className="flex justify-center">
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(d.id)}
                    className="bg-[#B3122D] text-white hover:bg-[#FF4C4C] text-sm"
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* --- Desktop : tableau --- */}
          <div className="hidden sm:block overflow-x-auto rounded-2xl border border-[#B3122D30] bg-[#111] shadow-[0_0_25px_#B3122D20]">
            <table className="min-w-full text-sm sm:text-base">
              <thead className="bg-[#1A1A1A] border-b border-[#B3122D40]">
                <tr className="text-[#FF4C4C] uppercase tracking-wide">
                  <th className="py-3 px-4 text-left">Utilisateur</th>
                  <th className="py-3 px-4 text-left">Montant (€)</th>
                  <th className="py-3 px-4 text-left">Message</th>
                  <th className="py-3 px-4 text-center">Statut</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr
                    key={d.id}
                    className="border-b border-[#222] hover:bg-[#181818] transition"
                  >
                    <td className="py-3 px-4 font-medium">
                      {d.user_name || "Anonyme"}
                    </td>
                    <td className="py-3 px-4 text-[#FF4C4C] font-semibold">
                      {d.amount ? `${parseFloat(d.amount).toFixed(2)}` : "—"}
                    </td>
                    <td className="py-3 px-4 text-gray-300 max-w-sm truncate">
                      {d.message || "—"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`${
                          d.status === "succeeded"
                            ? "text-[#4CAF50]"
                            : "text-[#FF4C4C]"
                        } font-semibold`}
                      >
                        {d.status === "succeeded" ? "Validé" : "En attente"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center flex flex-col gap-2 items-center justify-center">
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(d.id)}
                        className="bg-[#B3122D] text-white hover:bg-[#FF4C4C] w-28"
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}


import { useEffect, useState } from "react";
import { get, del } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function AdminListConcerts() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const data = await get("/concerts");
        console.log("Réponse API /concerts :", data);
        setConcerts(data.data || []);
      } catch (e) {
        console.error("Erreur lors du chargement des concerts :", e);
        setConcerts([]);
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
      <p className="text-center mt-10 text-gray-400 animate-pulse">
        Chargement des concerts...
      </p>
    );

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] py-10 px-6 sm:px-12">
     
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-[#B3122D] drop-shadow-[0_0_12px_#B3122D70]">
          Gestion des concerts
        </h1>
        <Button
          variant="primary"
          onClick={() => navigate("/admin/concerts/new")}
          className="bg-[#B3122D] hover:bg-[#FF4C4C] px-6 py-2 text-white font-semibold rounded-xl shadow-[0_0_10px_#B3122D50]"
        >
          + Nouveau concert
        </Button>
      </div>

      {concerts.length === 0 ? (
        <p className="text-gray-400 text-center mt-10 italic">
          Aucun concert pour le moment.
        </p>
      ) : (
        <>
         
          <div className="grid gap-6 sm:hidden">
            {concerts.map((c) => (
              <div
                key={c.id}
                className="bg-[#111] border border-[#B3122D40] rounded-2xl p-5 shadow-[0_0_20px_#B3122D20] transition hover:shadow-[0_0_25px_#B3122D40]"
              >
                {c.image_url && (
                  <img
                    src={c.image_url}
                    alt={c.title || c.city}
                    className="w-full h-40 object-cover rounded-lg mb-4 border border-[#B3122D30]"
                  />
                )}
                <h3 className="text-lg font-semibold text-[#F2F2F2] mb-1">
                  {c.title || c.city}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                  📍 {c.location || "Lieu non précisé"}
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  📅{" "}
                  {c.date
                    ? new Date(c.date).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "Date non indiquée"}
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      navigate(`/admin/concerts/edit/${c.id}`)
                    }
                    className="border border-[#B3122D] text-[#B3122D] hover:bg-[#B3122D] hover:text-white text-sm"
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(c.id)}
                    className="bg-[#B3122D] text-white hover:bg-[#FF4C4C] text-sm"
                  >
                    Supprimer
                  </Button>
                  {c.ticket_url && (
                    <Button
                      variant="outline"
                      as="a"
                      href={c.ticket_url}
                      target="_blank"
                      className="border border-[#B3122D60] text-gray-300 hover:text-[#FF4C4C] hover:border-[#FF4C4C] text-sm"
                    >
                      Billetterie
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          
          <div className="hidden sm:block overflow-x-auto rounded-2xl border border-[#B3122D30] bg-[#111] shadow-[0_0_25px_#B3122D20]">
            <table className="min-w-full text-sm sm:text-base">
              <thead className="bg-[#1A1A1A] border-b border-[#B3122D40]">
                <tr className="text-[#FF4C4C] uppercase tracking-wide">
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Titre</th>
                  <th className="py-3 px-4 text-left">Lieu</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Billetterie</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {concerts.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-[#222] hover:bg-[#181818] transition"
                  >
                    <td className="py-3 px-4">
                      {c.image_url ? (
                        <img
                          src={c.image_url}
                          alt={c.title}
                          className="w-20 h-14 object-cover rounded-md border border-[#B3122D30] shadow-[0_0_10px_#00000080]"
                        />
                      ) : (
                        <div className="w-20 h-14 bg-[#1A1A1A] rounded-md flex items-center justify-center text-gray-500 text-xs">
                          Aucune
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 font-medium">{c.title || c.city}</td>
                    <td className="py-3 px-4">{c.location || "—"}</td>
                    <td className="py-3 px-4 text-gray-400">
                      {c.date
                        ? new Date(c.date).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {c.ticket_url ? (
                        <a
                          href={c.ticket_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FF4C4C] hover:underline"
                        >
                          Voir
                        </a>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center flex flex-col gap-2 items-center justify-center">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          navigate(`/admin/concerts/edit/${c.id}`)
                        }
                        className="border border-[#B3122D] text-[#B3122D] hover:bg-[#B3122D] hover:text-white w-28"
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(c.id)}
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




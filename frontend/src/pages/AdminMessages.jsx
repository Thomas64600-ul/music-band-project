import { useEffect, useState } from "react";
import { get, del, put } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const data = await get("/messages");
        console.log("Réponse API /messages :", data);
        setMessages(Array.isArray(data) ? data : data.messages || []);
      } catch (e) {
        console.error("Erreur lors du chargement des messages :", e);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Supprimer ce message ?")) return;
    try {
      await del(`/messages/${id}`);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      console.error("Erreur suppression message :", e);
      alert("Erreur lors de la suppression");
    }
  }

  async function handleRead(id) {
    try {
      await put(`/messages/${id}/read`);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
      );
    } catch (e) {
      console.error("Erreur lecture message :", e);
    }
  }

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400 animate-pulse">
        Chargement des messages...
      </p>
    );

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] py-10 px-6 sm:px-12">
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-[#B3122D] drop-shadow-[0_0_12px_#B3122D70]">
          Messages reçus
        </h1>
        <Button
          variant="secondary"
          onClick={() => navigate("/admin")}
          className="border border-[#B3122D] text-[#B3122D] hover:bg-[#B3122D] hover:text-white font-semibold rounded-xl shadow-[0_0_10px_#B3122D40]"
        >
          Retour Dashboard
        </Button>
      </div>

      
      {messages.length === 0 ? (
        <p className="text-gray-400 text-center italic">
          Aucun message pour le moment.
        </p>
      ) : (
        <>
          
          <div className="grid gap-6 sm:hidden">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`bg-[#111] border ${
                  m.is_read
                    ? "border-[#444]"
                    : "border-[#B3122D70] shadow-[0_0_20px_#B3122D30]"
                } rounded-2xl p-5 transition`}
              >
                <h3 className="text-lg font-semibold text-[#F2F2F2] mb-1">
                  {m.name}
                </h3>
                <p className="text-sm text-gray-400 mb-1">
                  ✉️ {m.email || "—"}
                </p>
                <p className="text-sm text-gray-300 mb-3">
                  💬 {m.message || "Aucun contenu"}
                </p>
                <p className="text-sm mb-4">
                  📦 Statut :{" "}
                  <span
                    className={
                      m.is_read ? "text-[#4CAF50]" : "text-[#FF4C4C]"
                    }
                  >
                    {m.is_read ? "Lu" : "Non lu"}
                  </span>
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                  {!m.is_read && (
                    <Button
                      variant="secondary"
                      onClick={() => handleRead(m.id)}
                      className="border border-[#B3122D] text-[#B3122D] hover:bg-[#B3122D] hover:text-white text-sm"
                    >
                      Marquer lu
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(m.id)}
                    className="bg-[#B3122D] text-white hover:bg-[#FF4C4C] text-sm"
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </div>

          
          <div className="hidden sm:block overflow-x-auto rounded-2xl border border-[#B3122D30] bg-[#111] shadow-[0_0_25px_#B3122D20]">
            <table className="min-w-full text-sm sm:text-base">
              <thead className="bg-[#1A1A1A] border-b border-[#B3122D40]">
                <tr className="text-[#FF4C4C] uppercase tracking-wide">
                  <th className="py-3 px-4 text-left">Nom</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Message</th>
                  <th className="py-3 px-4 text-center">Statut</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m) => (
                  <tr
                    key={m.id}
                    className={`border-b border-[#222] hover:bg-[#181818] transition ${
                      m.is_read ? "opacity-70" : ""
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold">{m.name}</td>
                    <td className="py-3 px-4 text-[#B3122D]">{m.email}</td>
                    <td className="py-3 px-4 text-gray-300 max-w-sm truncate">
                      {m.message}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`font-semibold ${
                          m.is_read ? "text-[#4CAF50]" : "text-[#FF4C4C]"
                        }`}
                      >
                        {m.is_read ? "Lu" : "Non lu"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center flex flex-col gap-2 items-center justify-center">
                      {!m.is_read && (
                        <Button
                          variant="secondary"
                          onClick={() => handleRead(m.id)}
                          className="border border-[#B3122D] text-[#B3122D] hover:bg-[#B3122D] hover:text-white w-28"
                        >
                          Marquer lu
                        </Button>
                      )}
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(m.id)}
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


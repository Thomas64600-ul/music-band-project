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
      <p className="text-center mt-10 text-gray-400">
        Chargement des messages...
      </p>
    );

  
  return (
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] py-12 px-6 sm:px-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#FFD700]">
          Messages reçus
        </h1>
        <Button variant="secondary" onClick={() => navigate("/admin")}>
          Retour Dashboard
        </Button>
      </div>

      {messages.length === 0 ? (
        <p className="text-gray-400">Aucun message pour le moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 bg-[#111] rounded-xl">
            <thead>
              <tr className="text-[#FFD700] border-b border-gray-700">
                <th className="py-3 px-4 text-left">Nom</th>
                <th className="py-3 px-4 text-left hidden sm:table-cell">
                  Email
                </th>
                <th className="py-3 px-4 text-left">Message</th>
                <th className="py-3 px-4 text-center">Statut</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr
                  key={m.id}
                  className={`border-b border-gray-800 ${
                    m.is_read ? "opacity-70" : "bg-[#151515]"
                  } hover:bg-[#1a1a1a]`}
                >
                  <td className="py-3 px-4 font-semibold">{m.name}</td>
                  <td className="py-3 px-4 hidden sm:table-cell text-[#FFD700]">
                    {m.email}
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate">{m.message}</td>
                  <td className="py-3 px-4 text-center">
                    {m.is_read ? "Lu" : "Non lu"}
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    {!m.is_read && (
                      <Button
                        variant="secondary"
                        onClick={() => handleRead(m.id)}
                      >
                        Marquer lu
                      </Button>
                    )}
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

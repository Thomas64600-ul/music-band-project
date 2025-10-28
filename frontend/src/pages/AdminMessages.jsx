import { useEffect, useState } from "react";
import { get, del, put } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { motion } from "framer-motion";

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
      <p className="text-center mt-10 text-[var(--subtext)] animate-pulse">
        Chargement des messages...
      </p>
    );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="
        min-h-screen py-12 px-6 sm:px-12
        flex flex-col items-center
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
          relative w-full max-w-6xl
          bg-[var(--surface)]
          border border-[var(--border)]
          rounded-2xl
          shadow-[0_0_25px_var(--accent)]
          hover:shadow-[0_0_35px_var(--accent)]
          hover:border-[var(--accent)]
          transition-all duration-500
          p-6 sm:p-10
        "
      >
       
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-[var(--accent)] drop-shadow-[0_0_10px_var(--accent)]">
            Messages reçus
          </h1>
          <Button
            onClick={() => navigate("/admin")}
            className="
              border border-[var(--accent)] text-[var(--accent)]
              hover:bg-[var(--accent)] hover:text-[var(--bg)]
              font-semibold px-6 py-2 rounded-xl
              shadow-[0_0_12px_var(--accent)]/40 transition-all duration-300
            "
          >
            ⏎ Retour Dashboard
          </Button>
        </div>

        {messages.length === 0 ? (
          <p className="text-[var(--subtext)] text-center italic">
            Aucun message pour le moment.
          </p>
        ) : (
          <>
          
            <div className="grid gap-6 sm:hidden">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`
                    bg-[color-mix(in_oklab,var(--bg)_95%,black_5%)]
                    border rounded-2xl p-5 transition-all duration-300
                    ${
                      m.is_read
                        ? "border-[var(--subtext)]/40 opacity-80"
                        : "border-[var(--accent)]/50 shadow-[0_0_25px_rgba(179,18,45,0.3)] hover:shadow-[0_0_35px_rgba(179,18,45,0.5)]"
                    }
                  `}
                >
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-1">
                    {m.name}
                  </h3>
                  <p className="text-sm text-[var(--subtext)] mb-1">
                     {m.email || "—"}
                  </p>
                  <p className="text-sm text-[var(--text)] mb-3">
                     {m.message || "Aucun contenu"}
                  </p>
                  <p className="text-sm mb-4">
                     Statut :{" "}
                    <span
                      className={
                        m.is_read
                          ? "text-green-500 font-semibold"
                          : "text-[var(--accent)] font-semibold"
                      }
                    >
                      {m.is_read ? "Lu" : "Non lu"}
                    </span>
                  </p>

                  <div className="flex flex-wrap justify-center gap-3">
                    {!m.is_read && (
                      <Button
                        onClick={() => handleRead(m.id)}
                        className="
                          border border-[var(--accent)] text-[var(--accent)]
                          hover:bg-[var(--accent)] hover:text-[var(--bg)]
                          text-sm
                        "
                      >
                        Marquer lu
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(m.id)}
                      className="
                        bg-[var(--accent)] text-white
                        hover:bg-[var(--gold)] hover:text-[var(--bg)]
                        text-sm
                      "
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="
                hidden sm:block overflow-x-auto
                rounded-2xl border border-[var(--accent)]/30
                bg-[color-mix(in_oklab,var(--bg)_95%,black_5%)]
                shadow-[0_0_25px_rgba(179,18,45,0.35)]
                transition-all duration-500
              "
            >
              <table className="min-w-full text-sm sm:text-base">
                <thead className="bg-[var(--accent)]/10 border-b border-[var(--accent)]/30">
                  <tr className="text-[var(--accent)] uppercase tracking-wide">
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
                      className={`
                        border-b border-[var(--accent)]/20 transition
                        ${
                          m.is_read
                            ? "opacity-70 bg-[var(--bg-secondary)]"
                            : "hover:bg-[var(--accent)]/10"
                        }
                      `}
                    >
                      <td className="py-3 px-4 font-semibold">{m.name}</td>
                      <td className="py-3 px-4 text-[var(--accent)]">
                        {m.email}
                      </td>
                      <td className="py-3 px-4 text-[var(--subtext)] max-w-sm truncate">
                        {m.message}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`font-semibold ${
                            m.is_read
                              ? "text-green-500"
                              : "text-[var(--accent)]"
                          }`}
                        >
                          {m.is_read ? "Lu" : "Non lu"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center flex flex-col gap-2 items-center justify-center">
                        {!m.is_read && (
                          <Button
                            onClick={() => handleRead(m.id)}
                            className="
                              border border-[var(--accent)] text-[var(--accent)]
                              hover:bg-[var(--accent)] hover:text-[var(--bg)] w-28
                            "
                          >
                            Marquer lu
                          </Button>
                        )}
                        <Button
                          onClick={() => handleDelete(m.id)}
                          className="
                            bg-[var(--accent)] text-white hover:bg-[var(--gold)]
                            hover:text-[var(--bg)] w-28
                          "
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




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
        min-h-screen py-12 px-6 sm:px-12 flex flex-col items-center
        bg-[var(--bg)] text-[var(--text)]
        relative overflow-hidden transition-colors duration-700 ease-in-out
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
          border border-[var(--accent)]/40
          rounded-2xl
          shadow-[0_0_25px_var(--accent)]
          hover:shadow-[0_0_40px_var(--accent)]
          bg-[color-mix(in_oklab,var(--bg)_96%,var(--accent)_4%)]
          transition-all duration-500
          p-6 sm:p-10
        "
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-[var(--accent)] drop-shadow-[0_0_12px_var(--accent)]">
            Messages reçus
          </h1>
          <Button
            onClick={() => navigate("/admin")}
            className="
              border border-[var(--accent)] text-[var(--accent)]
              hover:bg-[var(--accent)] hover:text-[var(--bg)]
              font-semibold px-6 py-2 rounded-xl
              shadow-[0_0_12px_var(--accent)]
              transition-all duration-300
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
          
            <div className="block sm:hidden space-y-4">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`
                    border rounded-xl p-4
                    border-[var(--accent)]/40
                    shadow-[0_0_20px_var(--accent)]
                    bg-[color-mix(in_oklab,var(--bg)_95%,var(--accent)_5%)]
                    transition-all duration-500
                    ${m.is_read ? "opacity-70" : ""}
                  `}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-[var(--accent)]">
                      {m.name}
                    </h3>
                    <p
                      className={`text-xs font-semibold ${
                        m.is_read ? "text-green-500" : "text-[var(--accent)]"
                      }`}
                    >
                      {m.is_read ? "Lu" : "Non lu"}
                    </p>
                  </div>

                  <p className="text-[var(--subtext)] text-sm break-words mb-1">
                    ✉ {m.email}
                  </p>

                  <p className="text-[var(--text)] text-sm italic mb-3">
                    “{m.message}”
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {!m.is_read && (
                      <Button
                        onClick={() => handleRead(m.id)}
                        className="
                          border border-[var(--accent)] text-[var(--accent)]
                          hover:bg-[var(--accent)] hover:text-[var(--bg)]
                          w-full
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
                        w-full
                      "
                    >
                      Supprimer
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div
              className="
                hidden sm:block overflow-x-auto rounded-2xl
                border border-[var(--accent)]/40
                bg-[color-mix(in_oklab,var(--bg)_94%,var(--accent)_6%)]
                shadow-[0_0_25px_var(--accent)]
                transition-all duration-500
                w-full
              "
            >
              <table className="w-full text-sm sm:text-base border-collapse">
                <thead
                  className="
                    bg-[color-mix(in_oklab,var(--accent)_10%,var(--bg)_90%)]
                    text-[var(--accent)] uppercase tracking-wide
                    border-b border-[var(--accent)]/40
                  "
                >
                  <tr>
                    <th className="py-3 px-4 text-left">Nom</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Message</th>
                    <th className="py-3 px-4 text-center">Statut</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((m, index) => (
                    <motion.tr
                      key={m.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`
                        ${index !== messages.length - 1 ? "border-b" : ""}
                        border-[var(--accent)]/25
                        transition-colors duration-300
                        ${
                          m.is_read
                            ? "opacity-70 bg-[color-mix(in_oklab,var(--bg)_96%,var(--accent)_3%)]"
                            : "hover:bg-[color-mix(in_oklab,var(--accent)_12%,transparent_88%)]"
                        }
                      `}
                    >
                      <td className="py-3 px-4 font-semibold text-[color-mix(in_oklab,var(--text)_90%,var(--accent)_10%)] whitespace-nowrap">
                        {m.name}
                      </td>
                      <td className="py-3 px-4 text-[var(--accent)] whitespace-nowrap">
                        {m.email}
                      </td>
                      <td className="py-3 px-4 text-[color-mix(in_oklab,var(--subtext)_90%,var(--accent)_10%)] max-w-[500px] break-words">
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
                              hover:bg-[var(--accent)] hover:text-[var(--bg)]
                              w-28
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
                            w-28
                          "
                        >
                          Supprimer
                        </Button>
                      </td>
                    </motion.tr>
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



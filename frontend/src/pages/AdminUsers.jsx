import { useEffect, useState } from "react";
import { get, del, put } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { motion } from "framer-motion";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const res = await get("/users");
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.error("Erreur lors du chargement des utilisateurs :", e);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      await del(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (e) {
      console.error("Erreur suppression utilisateur :", e);
      alert("Erreur lors de la suppression");
    }
  }

  async function handleRoleChange(id, newRole) {
    try {
      await put(`/users/${id}`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
    } catch (e) {
      console.error("Erreur modification rôle :", e);
      alert("Impossible de modifier le rôle");
    }
  }

  if (loading)
    return (
      <p className="text-center mt-10 text-[var(--subtext)] animate-pulse">
        Chargement des utilisateurs...
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
          border border-[color-mix(in_oklab,var(--accent)_70%,transparent_30%)]
          rounded-2xl
          shadow-[0_0_25px_color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
          hover:shadow-[0_0_40px_color-mix(in_oklab,var(--accent)_60%,transparent_40%)]
          bg-[color-mix(in_oklab,var(--bg)_96%,var(--accent)_4%)]
          transition-all duration-500
          p-6 sm:p-10
        "
      >
       
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-[var(--accent)] drop-shadow-[0_0_12px_var(--accent)]">
            Gestion des utilisateurs
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

        {users.length === 0 ? (
          <p className="text-[var(--subtext)] text-center italic">
            Aucun utilisateur enregistré.
          </p>
        ) : (
          <>
         
            <div className="block sm:hidden space-y-4">
              {users.map((u) => (
                <motion.div
                  key={u.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="
                    border border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
                    rounded-xl p-4
                    bg-[color-mix(in_oklab,var(--bg)_95%,var(--accent)_5%)]
                    shadow-[0_0_20px_color-mix(in_oklab,var(--accent)_25%,transparent_75%)]
                    flex flex-col gap-2
                  "
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-[var(--accent)]">
                      {u.firstname} {u.lastname}
                    </h3>
                    <span
                      className={`text-xs font-semibold ${
                        u.is_verified ? "text-green-500" : "text-[var(--accent)]"
                      }`}
                    >
                      {u.is_verified ? "✔ Vérifié" : "Non vérifié"}
                    </span>
                  </div>

                  <p className="text-[var(--subtext)] text-sm">{u.email}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <label className="text-sm text-[var(--subtext)]">
                      Rôle :
                    </label>
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="
                        flex-1 bg-[color-mix(in_oklab,var(--bg)_94%,black_6%)]
                        border border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
                        text-[color-mix(in_oklab,var(--text)_90%,var(--accent)_10%)]
                        rounded-md px-2 py-1
                        focus:border-[var(--accent)]
                        focus:ring-1 focus:ring-[var(--accent)]/40
                        transition-all duration-300
                      "
                    >
                      <option value="buyer">Utilisateur</option>
                      <option value="seller">Vendeur</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => handleDelete(u.id)}
                    className="
                      bg-[var(--accent)] text-white 
                      hover:bg-[var(--gold)] hover:text-[var(--bg)]
                      mt-3 w-full
                    "
                  >
                    Supprimer
                  </Button>
                </motion.div>
              ))}
            </div>

            <div
              className="
                hidden sm:block overflow-x-auto rounded-2xl
                border border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
                bg-[color-mix(in_oklab,var(--bg)_94%,var(--accent)_6%)]
                shadow-[0_0_25px_color-mix(in_oklab,var(--accent)_30%,transparent_70%)]
                transition-all duration-500
              "
            >
              <table className="min-w-[700px] text-sm sm:text-base border-collapse">
                <thead
                  className="
                    bg-[color-mix(in_oklab,var(--accent)_10%,var(--bg)_90%)]
                    text-[var(--accent)] uppercase tracking-wide
                    border-b border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
                  "
                >
                  <tr>
                    <th className="py-3 px-4 text-left">Nom</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Rôle</th>
                    <th className="py-3 px-4 text-center">Vérifié</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((u, index) => (
                    <motion.tr
                      key={u.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`
                        ${index !== users.length - 1 ? "border-b" : ""}
                        border-[color-mix(in_oklab,var(--accent)_25%,transparent_75%)]
                        hover:bg-[color-mix(in_oklab,var(--accent)_12%,transparent_88%)]
                        transition-colors duration-300
                      `}
                    >
                      <td className="py-3 px-4 font-semibold text-[color-mix(in_oklab,var(--text)_90%,var(--accent)_10%)]">
                        {u.firstname} {u.lastname}
                      </td>
                      <td className="py-3 px-4 text-[var(--accent)]">
                        {u.email}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={u.role}
                          onChange={(e) =>
                            handleRoleChange(u.id, e.target.value)
                          }
                          className="
                            bg-[color-mix(in_oklab,var(--bg)_94%,black_6%)]
                            border border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
                            text-[color-mix(in_oklab,var(--text)_90%,var(--accent)_10%)]
                            rounded-md px-3 py-1
                            focus:border-[var(--accent)]
                            focus:ring-1 focus:ring-[var(--accent)]/40
                            transition-all duration-300
                          "
                        >
                          <option value="buyer">Utilisateur</option>
                          <option value="seller">Vendeur</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`font-semibold ${
                            u.is_verified
                              ? "text-green-500"
                              : "text-[var(--accent)]"
                          }`}
                        >
                          {u.is_verified ? "Oui" : "Non"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center flex flex-col gap-2 items-center justify-center">
                        <Button
                          onClick={() => handleDelete(u.id)}
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






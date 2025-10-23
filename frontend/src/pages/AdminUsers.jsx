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
        const data = await get("/users");
        setUsers(Array.isArray(data) ? data : data.users || []);
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
      await put(`/users/${id}`, { roles: newRole });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, roles: newRole } : u))
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
        min-h-screen py-10 px-6 sm:px-12
        bg-[var(--bg)] text-[var(--text)]
        transition-colors duration-700 ease-in-out
      "
    >
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-[var(--accent)] drop-shadow-[0_0_10px_var(--accent)]">
          Gestion des utilisateurs
        </h1>
        <Button
          onClick={() => navigate("/admin")}
          className="
            border border-[var(--accent)] text-[var(--accent)]
            hover:bg-[var(--accent)] hover:text-[var(--bg)]
            font-semibold rounded-xl
            shadow-[0_0_10px_var(--accent)]/40
            transition-all duration-300
          "
        >
          Retour Dashboard
        </Button>
      </div>

    
      {users.length === 0 ? (
        <p className="text-[var(--subtext)] text-center italic">
          Aucun utilisateur enregistré.
        </p>
      ) : (
        <>
          
          <div className="grid gap-6 sm:hidden">
            {users.map((u) => (
              <div
                key={u.id}
                className="
                  bg-[var(--bg-secondary)] border border-[var(--accent)]/30 
                  rounded-2xl p-5 shadow-[0_0_20px_var(--accent)]/20 
                  hover:shadow-[0_0_25px_var(--accent)]/40
                  transition-all duration-300
                "
              >
                <h3 className="text-lg font-semibold text-[var(--text)] mb-1">
                  {u.firstname} {u.lastname}
                </h3>
                <p className="text-sm text-[var(--subtext)] mb-2">
                  📧 {u.email}
                </p>

                <p className="text-sm text-[var(--subtext)] mb-2">
                  🎭 Rôle :{" "}
                  <span className="text-[var(--accent)] font-semibold">
                    {u.roles || "—"}
                  </span>
                </p>

                <p className="text-sm mb-4">
                  ✅ Vérification :{" "}
                  <span
                    className={
                      u.is_verified ? "text-green-500" : "text-[var(--accent)]"
                    }
                  >
                    {u.is_verified ? "Oui" : "Non"}
                  </span>
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                  <select
                    value={u.roles}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="
                      bg-[var(--bg)] border border-[var(--accent)]/50
                      text-[var(--text)] text-sm rounded-md px-3 py-1
                      focus:border-[var(--accent)] transition
                    "
                  >
                    <option value="buyer">Utilisateur</option>
                    <option value="seller">Vendeur</option>
                    <option value="admin">Admin</option>
                  </select>

                  <Button
                    onClick={() => handleDelete(u.id)}
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
              bg-[var(--bg-secondary)] shadow-[0_0_25px_var(--accent)]/20
            "
          >
            <table className="min-w-full text-sm sm:text-base">
              <thead className="bg-[var(--accent)]/10 border-b border-[var(--accent)]/30">
                <tr className="text-[var(--accent)] uppercase tracking-wide">
                  <th className="py-3 px-4 text-left">Nom</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Rôle</th>
                  <th className="py-3 px-4 text-center">Vérifié</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="
                      border-b border-[var(--accent)]/20 
                      hover:bg-[var(--accent)]/10 transition
                    "
                  >
                    <td className="py-3 px-4 font-medium">
                      {u.firstname} {u.lastname}
                    </td>
                    <td className="py-3 px-4 text-[var(--accent)]">
                      {u.email}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={u.roles}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="
                          bg-[var(--bg)] border border-[var(--accent)]/50 
                          text-[var(--text)] rounded-md px-3 py-1
                          focus:border-[var(--accent)] transition
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </motion.section>
  );
}



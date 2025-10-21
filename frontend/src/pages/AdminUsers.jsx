import { useEffect, useState } from "react";
import { get, del, put } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

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
        console.log("Réponse API /users :", data);
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
      <p className="text-center mt-10 text-gray-400 animate-pulse">
        Chargement des utilisateurs...
      </p>
    );

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] py-10 px-6 sm:px-12">
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-[#B3122D] drop-shadow-[0_0_12px_#B3122D70]">
          Gestion des utilisateurs
        </h1>
        <Button
          variant="secondary"
          onClick={() => navigate("/admin")}
          className="border border-[#B3122D] text-[#B3122D] hover:bg-[#B3122D] hover:text-white font-semibold rounded-xl shadow-[0_0_10px_#B3122D40]"
        >
          Retour Dashboard
        </Button>
      </div>

      
      {users.length === 0 ? (
        <p className="text-gray-400 text-center italic">
          Aucun utilisateur enregistré.
        </p>
      ) : (
        <>
          
          <div className="grid gap-6 sm:hidden">
            {users.map((u) => (
              <div
                key={u.id}
                className="bg-[#111] border border-[#B3122D40] rounded-2xl p-5 shadow-[0_0_20px_#B3122D20] transition hover:shadow-[0_0_25px_#B3122D40]"
              >
                <h3 className="text-lg font-semibold text-[#F2F2F2] mb-1">
                  {u.firstname} {u.lastname}
                </h3>
                <p className="text-sm text-gray-400 mb-2">📧 {u.email}</p>

                <p className="text-sm text-gray-300 mb-2">
                  🎭 Rôle :{" "}
                  <span className="text-[#FF4C4C] font-semibold">
                    {u.roles || "—"}
                  </span>
                </p>

                <p className="text-sm mb-4">
                  ✅ Vérification :{" "}
                  <span
                    className={
                      u.is_verified ? "text-[#4CAF50]" : "text-[#FF4C4C]"
                    }
                  >
                    {u.is_verified ? "Oui" : "Non"}
                  </span>
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                  <select
                    value={u.roles}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="bg-[#1A1A1A] border border-[#B3122D60] text-[#F2F2F2] text-sm rounded-md px-3 py-1 focus:border-[#FF4C4C] transition"
                  >
                    <option value="buyer">Utilisateur</option>
                    <option value="seller">Vendeur</option>
                    <option value="admin">Admin</option>
                  </select>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(u.id)}
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
                  <th className="py-3 px-4 text-left">Rôle</th>
                  <th className="py-3 px-4 text-center">Vérifié</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-[#222] hover:bg-[#181818] transition"
                  >
                    <td className="py-3 px-4 font-medium">
                      {u.firstname} {u.lastname}
                    </td>
                    <td className="py-3 px-4 text-[#B3122D]">{u.email}</td>
                    <td className="py-3 px-4">
                      <select
                        value={u.roles}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="bg-[#1A1A1A] border border-[#B3122D60] text-[#F2F2F2] rounded-md px-3 py-1 focus:border-[#FF4C4C] transition"
                      >
                        <option value="buyer">Utilisateur</option>
                        <option value="seller">Vendeur</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`font-semibold ${
                          u.is_verified ? "text-[#4CAF50]" : "text-[#FF4C4C]"
                        }`}
                      >
                        {u.is_verified ? "Oui" : "Non"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center flex flex-col gap-2 items-center justify-center">
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(u.id)}
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



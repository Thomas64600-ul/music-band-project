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
        setUsers(data);
      } catch (e) {
        console.error("Erreur lors du chargement des utilisateurs :", e);
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
      console.error("Erreur suppression utilisateur:", e);
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
      <p className="text-center mt-10 text-gray-400">
        Chargement des utilisateurs...
      </p>
    );

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] py-12 px-6 sm:px-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#FFD700]">Gestion des utilisateurs</h1>
        <Button variant="secondary" onClick={() => navigate("/admin")}>
          Retour Dashboard
        </Button>
      </div>

      {users.length === 0 ? (
        <p className="text-gray-400">Aucun utilisateur enregistré.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 bg-[#111] rounded-xl">
            <thead>
              <tr className="text-[#FFD700] border-b border-gray-700">
                <th className="py-3 px-4 text-left">Nom</th>
                <th className="py-3 px-4 text-left hidden sm:table-cell">Email</th>
                <th className="py-3 px-4 text-left">Rôle</th>
                <th className="py-3 px-4 text-left hidden md:table-cell">Vérifié</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-gray-800 hover:bg-[#1a1a1a]"
                >
                  <td className="py-3 px-4">
                    {u.firstname} {u.lastname}
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell text-[#FFD700]">
                    {u.email}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={u.roles}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="bg-[#222] text-[#F2F2F2] border border-gray-700 rounded-md p-1 focus:border-[#FFD700]"
                    >
                      <option value="buyer">Utilisateur</option>
                      <option value="seller">Vendeur</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell text-center">
                    {u.is_verified ? "✅" : "❌"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Button variant="danger" onClick={() => handleDelete(u.id)}>
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

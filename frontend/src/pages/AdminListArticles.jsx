import { useEffect, useState } from "react";
import { get, del } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function AdminListArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

 
  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  
  useEffect(() => {
  (async () => {
    try {
      const data = await get("/articles");
      console.log("Réponse API /articles :", data);

      
      setArticles(data.data || []); 
    } catch (e) {
      console.error("Erreur lors du chargement des articles :", e);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  })();
}, []);

  
  async function handleDelete(id) {
    if (!window.confirm("Supprimer cet article ?")) return;
    try {
      await del(`/articles/${id}`);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      console.error("Erreur suppression article:", e);
      alert("Erreur lors de la suppression");
    }
  }

  
  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400 animate-pulse">
        Chargement des articles...
      </p>
    );

  
  return (
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] py-12 px-6 sm:px-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#FFD700]">
          Gestion des articles
        </h1>
        <Button
          variant="primary"
          onClick={() => navigate("/admin/articles/new")}
        >
          Nouvel article
        </Button>
      </div>

      {articles.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">
          Aucun article pour le moment.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 bg-[#111] rounded-xl shadow-md">
            <thead>
              <tr className="text-[#FFD700] border-b border-gray-700 bg-[#161616]">
                <th className="py-3 px-4 text-left hidden sm:table-cell">
                  Image
                </th>
                <th className="py-3 px-4 text-left">Titre</th>
                <th className="py-3 px-4 text-left hidden sm:table-cell">
                  Date
                </th>
                <th className="py-3 px-4 text-left hidden md:table-cell">
                  Auteur
                </th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-gray-800 hover:bg-[#1a1a1a] transition"
                >
                  
                  <td className="py-2 px-4 hidden sm:table-cell">
                    {a.image_url ? (
                      <img
                        src={a.image_url}
                        alt={a.title}
                        className="w-20 h-14 object-cover rounded-md border border-gray-700"
                      />
                    ) : (
                      <div className="w-20 h-14 bg-gray-800 rounded-md flex items-center justify-center text-gray-500 text-xs">
                        Aucune
                      </div>
                    )}
                  </td>

                
                  <td className="py-3 px-4 font-medium">{a.title}</td>

                 
                  <td className="py-3 px-4 hidden sm:table-cell">
                    {a.created_at
                      ? new Date(a.created_at).toLocaleDateString("fr-FR")
                      : "—"}
                  </td>

                  
                  <td className="py-3 px-4 hidden md:table-cell">
                    {a.author_name || a.author || "—"}
                  </td>

                 
                  <td className="py-3 px-4 text-center space-x-2 flex flex-wrap justify-center gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/admin/articles/edit/${a.id}`)}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(a.id)}
                    >
                      Supprimer
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/blog/${a.id}`)}
                    >
                      Voir
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


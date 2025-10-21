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
        setArticles(data.data || []);
      } catch (e) {
        console.error("Erreur chargement articles :", e);
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
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] py-10 px-6 sm:px-12">
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-[#B3122D] drop-shadow-[0_0_12px_#B3122D70]">
          Gestion des articles
        </h1>
        <Button
          variant="primary"
          onClick={() => navigate("/admin/articles/new")}
          className="bg-[#B3122D] hover:bg-[#FF4C4C] px-6 py-2 text-white font-semibold rounded-xl shadow-[0_0_10px_#B3122D50]"
        >
          + Nouvel article
        </Button>
      </div>

     
      {articles.length === 0 ? (
        <p className="text-gray-400 text-center mt-10 italic">
          Aucun article publié pour le moment.
        </p>
      ) : (
        <>
          
          <div className="grid gap-6 sm:hidden">
            {articles.map((a) => (
              <div
                key={a.id}
                className="bg-[#111] border border-[#B3122D40] rounded-2xl p-5 shadow-[0_0_20px_#B3122D20] transition hover:shadow-[0_0_25px_#B3122D40]"
              >
                {a.image_url && (
                  <img
                    src={a.image_url}
                    alt={a.title}
                    className="w-full h-40 object-cover rounded-lg mb-4 border border-[#B3122D30]"
                  />
                )}
                <h3 className="text-lg font-semibold text-[#F2F2F2] mb-2">
                  {a.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  {a.created_at
                    ? new Date(a.created_at).toLocaleDateString("fr-FR")
                    : "—"}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      navigate(`/admin/articles/edit/${a.id}`)
                    }
                    className="border border-[#B3122D] text-[#B3122D] hover:bg-[#B3122D] hover:text-white text-sm"
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(a.id)}
                    className="bg-[#B3122D] text-white hover:bg-[#FF4C4C] text-sm"
                  >
                    Supprimer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/blog/${a.id}`)}
                    className="border border-[#B3122D60] text-gray-300 hover:text-[#FF4C4C] hover:border-[#FF4C4C] text-sm"
                  >
                    Voir
                  </Button>
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
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Auteur</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-[#222] hover:bg-[#181818] transition"
                  >
                    <td className="py-3 px-4">
                      {a.image_url ? (
                        <img
                          src={a.image_url}
                          alt={a.title}
                          className="w-20 h-14 object-cover rounded-md border border-[#B3122D40]"
                        />
                      ) : (
                        <div className="w-20 h-14 bg-[#1A1A1A] rounded-md flex items-center justify-center text-gray-500 text-xs">
                          Aucune
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 font-medium">{a.title}</td>
                    <td className="py-3 px-4 text-gray-400">
                      {a.created_at
                        ? new Date(a.created_at).toLocaleDateString("fr-FR")
                        : "—"}
                    </td>
                    <td className="py-3 px-4 text-gray-400">
                      {a.author_name || a.author || "—"}
                    </td>
                    <td className="py-3 px-4 text-center space-x-2">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          navigate(`/admin/articles/edit/${a.id}`)
                        }
                        className="border border-[#B3122D] text-[#B3122D] hover:bg-[#B3122D] hover:text-white transition-all"
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(a.id)}
                        className="bg-[#B3122D] text-white hover:bg-[#FF4C4C]"
                      >
                        Supprimer
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/blog/${a.id}`)}
                        className="border border-[#B3122D60] text-gray-300 hover:border-[#FF4C4C] hover:text-[#FF4C4C]"
                      >
                        Voir
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




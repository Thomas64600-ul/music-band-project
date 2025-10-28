import { useEffect, useState } from "react";
import { get, del } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { motion } from "framer-motion";

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
      <p className="text-center mt-10 text-[var(--subtext)] animate-pulse">
        Chargement des articles...
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
            Gestion des articles
          </h1>
          <Button
            onClick={() => navigate("/admin/articles/new")}
            className="
              bg-[var(--accent)] hover:bg-[var(--gold)]
              text-white hover:text-[var(--bg)]
              font-semibold px-6 py-2 rounded-xl
              shadow-[0_0_12px_var(--accent)]
              transition-all duration-300
            "
          >
            + Nouvel article
          </Button>
        </div>

        {articles.length === 0 ? (
          <p className="text-[var(--subtext)] text-center mt-10 italic">
            Aucun article publié pour le moment.
          </p>
        ) : (
          <>
           
            <div className="grid gap-6 sm:hidden">
              {articles.map((a) => (
                <div
                  key={a.id}
                  className="
                    bg-[color-mix(in_oklab,var(--bg)_95%,black_5%)]
                    border border-[var(--accent)]/30
                    rounded-2xl p-5
                    shadow-[0_0_25px_rgba(179,18,45,0.3)]
                    hover:shadow-[0_0_35px_rgba(179,18,45,0.5)]
                    transition-all duration-300
                  "
                >
                  {a.image_url && (
                    <img
                      src={a.image_url}
                      alt={a.title}
                      className="w-full h-40 object-cover rounded-lg mb-4 border border-[var(--accent)]/40"
                    />
                  )}
                  <h3 className="text-lg font-semibold mb-2">{a.title}</h3>
                  <p className="text-sm text-[var(--subtext)] mb-4">
                    {a.created_at
                      ? new Date(a.created_at).toLocaleDateString("fr-FR")
                      : "—"}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button
                      onClick={() => navigate(`/admin/articles/edit/${a.id}`)}
                      className="
                        border border-[var(--accent)] text-[var(--accent)]
                        hover:bg-[var(--accent)] hover:text-[var(--bg)]
                        text-sm
                      "
                    >
                      Modifier
                    </Button>
                    <Button
                      onClick={() => handleDelete(a.id)}
                      className="
                        bg-[var(--accent)] text-white hover:bg-[var(--gold)]
                        hover:text-[var(--bg)] text-sm
                      "
                    >
                      Supprimer
                    </Button>
                    <Button
                      onClick={() => navigate(`/blog/${a.id}`)}
                      className="
                        border border-[var(--accent)]/50 text-[var(--subtext)]
                        hover:text-[var(--accent)] hover:border-[var(--accent)]
                        text-sm
                      "
                    >
                      Voir
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
                      className="
                        border-b border-[var(--accent)]/20 
                        hover:bg-[var(--accent)]/10
                        transition-colors duration-300
                      "
                    >
                      <td className="py-3 px-4">
                        {a.image_url ? (
                          <img
                            src={a.image_url}
                            alt={a.title}
                            className="w-20 h-14 object-cover rounded-md border border-[var(--accent)]/30"
                          />
                        ) : (
                          <div className="w-20 h-14 bg-[var(--accent)]/5 rounded-md flex items-center justify-center text-[var(--subtext)] text-xs">
                            Aucune
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[var(--text)]">
                        {a.title}
                      </td>
                      <td className="py-3 px-4 text-[var(--subtext)]">
                        {a.created_at
                          ? new Date(a.created_at).toLocaleDateString("fr-FR")
                          : "—"}
                      </td>
                      <td className="py-3 px-4 text-[var(--subtext)]">
                        {a.author_name || a.author || "—"}
                      </td>
                      <td className="py-3 px-4 text-center flex flex-col gap-2 items-center justify-center">
                        <Button
                          onClick={() => navigate(`/admin/articles/edit/${a.id}`)}
                          className="
                            border border-[var(--accent)] text-[var(--accent)]
                            hover:bg-[var(--accent)] hover:text-[var(--bg)]
                            w-28
                          "
                        >
                          Modifier
                        </Button>
                        <Button
                          onClick={() => handleDelete(a.id)}
                          className="
                            bg-[var(--accent)] text-white hover:bg-[var(--gold)]
                            hover:text-[var(--bg)] w-28
                          "
                        >
                          Supprimer
                        </Button>
                        <Button
                          onClick={() => navigate(`/blog/${a.id}`)}
                          className="
                            border border-[var(--accent)]/50 text-[var(--subtext)]
                            hover:text-[var(--accent)] hover:border-[var(--accent)]
                            w-28
                          "
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





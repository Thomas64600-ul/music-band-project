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
          relative w-full max-w-7xl
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
            Gestion des articles
          </h1>
          <Button
            onClick={() => navigate("/admin/articles/new")}
            className="
              bg-[var(--accent)] hover:bg-[var(--gold)]
              text-white hover:text-[var(--bg)]
              font-semibold px-6 py-2 rounded-xl 
              shadow-[0_0_15px_var(--accent)]
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
         
            <div className="block sm:hidden space-y-4">
              {articles.map((a) => (
                <motion.div
                  key={a.id}
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
                  <div className="flex items-center gap-3">
                    {a.image_url ? (
                      <img
                        src={a.image_url}
                        alt={a.title}
                        className="w-16 h-16 object-cover rounded-md border border-[var(--accent)]/40"
                      />
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center bg-[color-mix(in_oklab,var(--accent)_10%,var(--bg)_90%)] text-[var(--subtext)] rounded-md text-xs">
                        Aucune
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-[var(--accent)]">
                        {a.title}
                      </h3>
                      <p className="text-[var(--subtext)] text-sm">
                        {a.author_name || a.author || "—"} —{" "}
                        {a.created_at
                          ? new Date(a.created_at).toLocaleDateString("fr-FR")
                          : "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-3">
                    <Button
                      onClick={() =>
                       navigate(`/admin/articles/${m.id}`)
                      }
                      className="
                        border border-[var(--accent)] text-[var(--accent)]
                        hover:bg-[var(--accent)] hover:text-[var(--bg)]
                        flex-1
                      "
                    >
                      Modifier
                    </Button>
                    <Button
                      onClick={() => handleDelete(a.id)}
                      className="
                        bg-[var(--accent)] text-white 
                        hover:bg-[var(--gold)] hover:text-[var(--bg)]
                        flex-1
                      "
                    >
                      Supprimer
                    </Button>
                    <Button
                      onClick={() => navigate(`/blog/${a.id}`)}
                      className="
                        border border-[var(--accent)]/50 text-[var(--subtext)]
                        hover:text-[var(--accent)] hover:border-[var(--accent)]
                        flex-1
                      "
                    >
                      Voir
                    </Button>
                  </div>
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
                w-full
              "
            >
              <table className="w-full text-sm sm:text-base border-collapse">
                <thead
                  className="
                    bg-[color-mix(in_oklab,var(--accent)_10%,var(--bg)_90%)]
                    text-[var(--accent)] uppercase tracking-wide
                    border-b border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
                  "
                >
                  <tr>
                    <th className="py-3 px-4 text-left">Image</th>
                    <th className="py-3 px-4 text-left">Titre</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Auteur</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {articles.map((a, index) => (
                    <motion.tr
                      key={a.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="
                        border-b border-[color-mix(in_oklab,var(--accent)_25%,transparent_75%)]
                        hover:bg-[color-mix(in_oklab,var(--accent)_12%,transparent_88%)]
                        transition-all duration-300
                      "
                    >
                      <td className="py-3 px-4">
                        {a.image_url ? (
                          <img
                            src={a.image_url}
                            alt={a.title}
                            className="w-20 h-14 object-cover rounded-md border border-[color-mix(in_oklab,var(--accent)_30%,transparent_70%)]"
                          />
                        ) : (
                          <div className="w-20 h-14 bg-[color-mix(in_oklab,var(--accent)_10%,var(--bg)_90%)] rounded-md flex items-center justify-center text-[var(--subtext)] text-xs">
                            Aucune
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 font-semibold text-[color-mix(in_oklab,var(--text)_90%,var(--accent)_10%)]">
                        {a.title}
                      </td>
                      <td className="py-3 px-4 text-[color-mix(in_oklab,var(--subtext)_90%,var(--accent)_10%)] whitespace-nowrap">
                        {a.created_at
                          ? new Date(a.created_at).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                      <td className="py-3 px-4 text-[color-mix(in_oklab,var(--subtext)_90%,var(--accent)_10%)] whitespace-nowrap">
                        {a.author_name || a.author || "—"}
                      </td>

                      <td className="py-3 px-4 text-center flex flex-col gap-2 items-center justify-center">
                        <Button
                          onClick={() =>
                            navigate(`/admin/articles/edit/${a.id}`)
                          }
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
                            bg-[var(--accent)] text-white 
                            hover:bg-[var(--gold)] hover:text-[var(--bg)]
                            w-28
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








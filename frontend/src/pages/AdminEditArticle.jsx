import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, post, put } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { motion } from "framer-motion";

export default function AdminEditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const isNew = id === "new";

  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (!isNew && id) {
      (async () => {
        try {
          const data = await get(`/articles/${id}`);
          setForm({
            title: data.title || "",
            description: data.description || "",
            content: data.content || "",
            image: null,
          });
          setPreview(data.image_url || null);
        } catch (e) {
          console.error("Erreur chargement article :", e);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [id, isNew]);

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
  }

  function onFileChange(e) {
    const file = e.target.files[0];
    setForm((f) => ({ ...f, image: file }));
    if (file) setPreview(URL.createObjectURL(file));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("content", form.content);
      if (form.image) formData.append("image", form.image);
      formData.append("author_id", user?.id);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token manquant. Veuillez vous reconnecter.");
        navigate("/login");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      if (isNew) {
        await post("/articles", formData, config);
      } else {
        await put(`/articles/${id}`, formData, config);
      }

      setStatus("success");
      setTimeout(() => navigate("/admin/articles"), 800);
    } catch (e) {
      console.error("Erreur enregistrement article :", e);
      setStatus("error");
    }
  }

  if (loading)
    return (
      <p className="text-center mt-10 text-[var(--subtext)] animate-pulse">
        Chargement de l’article...
      </p>
    );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="
        min-h-screen py-12 px-6 sm:px-12
        flex justify-center items-start
        bg-[var(--bg)] text-[var(--text)]
        relative overflow-hidden
      "
    >
     
      <div
        className="
          absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_center,#B3122D33_0%,transparent_70%)]
          blur-[150px] opacity-70
        "
      ></div>

      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="
          relative w-full max-w-3xl
          border border-[color-mix(in_oklab,var(--accent)_70%,transparent_30%)]
          rounded-2xl
          shadow-[0_0_25px_color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
          hover:shadow-[0_0_40px_color-mix(in_oklab,var(--accent)_60%,transparent_40%)]
          bg-[color-mix(in_oklab,var(--bg)_96%,var(--accent)_4%)]
          p-8 sm:p-10
          transition-all duration-500
        "
      >
        <h1 className="text-3xl font-extrabold text-center text-[var(--accent)] drop-shadow-[0_0_12px_var(--accent)] mb-8">
          {isNew ? "Créer un article" : "Modifier l’article"}
        </h1>

    
        <div className="mb-5">
          <label htmlFor="title" className="block text-[var(--accent)] mb-2 font-semibold">
            Titre
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={onChange}
            required
            className="
              w-full p-3 rounded-md
              bg-[color-mix(in_oklab,var(--bg)_94%,black_6%)]
              border border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
              text-[color-mix(in_oklab,var(--text)_90%,var(--accent)_10%)]
              focus:ring-2 focus:ring-[var(--accent)]/40
              focus:border-[var(--accent)]
              transition-all duration-300
            "
          />
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="block text-[var(--accent)] mb-2 font-semibold">
            Description courte
          </label>
          <input
            id="description"
            type="text"
            value={form.description}
            onChange={onChange}
            required
            className="
              w-full p-3 rounded-md
              bg-[color-mix(in_oklab,var(--bg)_94%,black_6%)]
              border border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
              text-[color-mix(in_oklab,var(--text)_90%,var(--accent)_10%)]
              focus:ring-2 focus:ring-[var(--accent)]/40
              focus:border-[var(--accent)]
              transition-all duration-300
            "
          />
        </div>

        <div className="mb-5">
          <label htmlFor="content" className="block text-[var(--accent)] mb-2 font-semibold">
            Contenu complet
          </label>
          <textarea
            id="content"
            rows="6"
            value={form.content}
            onChange={onChange}
            required
            className="
              w-full p-3 rounded-md
              bg-[color-mix(in_oklab,var(--bg)_94%,black_6%)]
              border border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
              text-[color-mix(in_oklab,var(--text)_90%,var(--accent)_10%)]
              focus:ring-2 focus:ring-[var(--accent)]/40
              focus:border-[var(--accent)]
              transition-all duration-300
            "
          />
        </div>

        <div className="mb-8">
          <label htmlFor="image" className="block text-[var(--accent)] mb-2 font-semibold">
            Image (upload local)
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="
              w-full text-[var(--text)]
              border border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
              rounded-md p-2
              bg-[color-mix(in_oklab,var(--bg)_96%,black_4%)]
              cursor-pointer transition-all duration-300
              hover:border-[var(--accent)] hover:shadow-[0_0_15px_var(--accent)]/40
            "
          />
          {preview && (
            <img
              src={preview}
              alt="Aperçu"
              className="mt-3 rounded-lg max-h-48 mx-auto border border-[var(--accent)]/40 shadow-[0_0_15px_rgba(179,18,45,0.3)]"
            />
          )}
        </div>

        <div
          className="
            flex flex-col sm:flex-row justify-center sm:justify-between
            gap-4 sm:gap-0 mt-10 text-center
          "
        >
          <Button
            variant="secondary"
            onClick={() => navigate('/admin/articles')}
            className="
              border border-[var(--accent)] text-[var(--accent)]
              hover:bg-[var(--accent)] hover:text-[var(--bg)]
              px-6 py-3 rounded-xl transition-all duration-300
              shadow-[0_0_12px_color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
              hover:shadow-[0_0_20px_color-mix(in_oklab,var(--accent)_70%,transparent_30%)]
              w-full sm:w-auto font-semibold
            "
          >
            ← Retour
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={status === 'loading'}
            className="
              bg-[var(--accent)] hover:bg-[var(--gold)]
              text-white hover:text-[var(--bg)]
              px-8 py-3 rounded-xl font-semibold
              shadow-[0_0_20px_color-mix(in_oklab,var(--accent)_50%,transparent_50%)]
              hover:shadow-[0_0_25px_color-mix(in_oklab,var(--gold)_70%,transparent_30%)]
              w-full sm:w-auto
              transition-all duration-300 relative overflow-hidden
              active:scale-[0.97]
            "
          >
            {status === "loading"
              ? "Enregistrement..."
              : isNew
              ? "Créer l’article"
              : "Mettre à jour"}
          </Button>
        </div>

        {status === "success" && (
          <p className="mt-4 text-center text-green-400 font-medium">
            Article enregistré avec succès
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-center text-red-400 font-medium">
            Erreur lors de l’enregistrement
          </p>
        )}
      </form>

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



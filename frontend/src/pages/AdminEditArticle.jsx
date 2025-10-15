import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, post, put } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

export default function AdminEditArticle() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image_url: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

 
  useEffect(() => {
    if (id && id !== "new") {
      (async () => {
        try {
          const data = await get(`/articles/${id}`);
          setForm({
            title: data.title || "",
            description: data.description || "",
            content: data.content || "",
            image_url: data.image_url || "",
          });
        } catch (e) {
          console.error("Erreur chargement article:", e);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [id]);

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      if (id === "new") {
        await post("/articles", form);
      } else {
        await put(`/articles/${id}`, form);
      }
      setStatus("success");
      navigate("/admin/articles");
    } catch (e) {
      console.error("Erreur enregistrement article:", e);
      setStatus("error");
    }
  }

  if (loading)
    return <p className="text-center text-gray-400 mt-10">Chargement...</p>;

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] flex justify-center py-12 px-6 sm:px-12">
      <form
        onSubmit={onSubmit}
        className="bg-[#111] border border-[#FFD70040] rounded-2xl shadow-lg p-8 w-full max-w-2xl"
      >
        <h1 className="text-3xl font-bold text-center text-[#FFD700] mb-6">
          {id === "new" ? "Créer un article" : "Modifier l’article"}
        </h1>

        <div className="mb-5">
          <label htmlFor="title" className="block text-[#FFD700] mb-2 font-semibold">
            Titre
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={onChange}
            required
            className="w-full p-3 bg-[#222] text-[#F2F2F2] border border-gray-700 rounded-md focus:border-[#FFD700] outline-none"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="block text-[#FFD700] mb-2 font-semibold">
            Description courte
          </label>
          <input
            id="description"
            type="text"
            value={form.description}
            onChange={onChange}
            required
            className="w-full p-3 bg-[#222] text-[#F2F2F2] border border-gray-700 rounded-md focus:border-[#FFD700] outline-none"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="content" className="block text-[#FFD700] mb-2 font-semibold">
            Contenu complet
          </label>
          <textarea
            id="content"
            rows="6"
            value={form.content}
            onChange={onChange}
            required
            className="w-full p-3 bg-[#222] text-[#F2F2F2] border border-gray-700 rounded-md focus:border-[#FFD700] outline-none"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="image_url" className="block text-[#FFD700] mb-2 font-semibold">
            URL de l’image
          </label>
          <input
            id="image_url"
            type="text"
            value={form.image_url}
            onChange={onChange}
            placeholder="https://..."
            className="w-full p-3 bg-[#222] text-[#F2F2F2] border border-gray-700 rounded-md focus:border-[#FFD700] outline-none"
          />
        </div>

        <div className="text-center">
          <Button variant="primary" type="submit" disabled={status === "loading"}>
            {status === "loading"
              ? "Enregistrement..."
              : id === "new"
              ? "Créer l’article"
              : "Mettre à jour"}
          </Button>

          {status === "success" && (
            <p className="mt-3 text-green-400">Article enregistré</p>
          )}
          {status === "error" && (
            <p className="mt-3 text-red-400">Erreur lors de l’enregistrement</p>
          )}
        </div>
      </form>
    </section>
  );
}

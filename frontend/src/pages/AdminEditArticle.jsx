import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, post, put } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

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
            image: null,
          });
          setPreview(data.image_url || null);
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

    if (id === "new") {
      await post("/articles", formData, config);
    } else {
      await put(`/articles/${id}`, formData, config);
    }

    setStatus("success");
    navigate("/admin/articles");
  } catch (e) {
    console.error("Erreur enregistrement article:", e);
    setStatus("error");
  }
}

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] flex justify-center py-12 px-6 sm:px-12">
      <form
        onSubmit={onSubmit}
        className="bg-[#111] border border-[#FFD70040] rounded-2xl shadow-lg p-8 w-full max-w-2xl"
        encType="multipart/form-data"
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
          <label htmlFor="image" className="block text-[#FFD700] mb-2 font-semibold">
            Image (upload local)
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="w-full text-[#F2F2F2]"
          />
          {preview && (
            <img
              src={preview}
              alt="Aperçu"
              className="mt-3 rounded-lg max-h-48 mx-auto"
            />
          )}
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
            <p className="mt-3 text-green-400">Article enregistré avec succès</p>
          )}
          {status === "error" && (
            <p className="mt-3 text-red-400">Erreur lors de l’enregistrement</p>
          )}
        </div>
      </form>
    </section>
  );
}



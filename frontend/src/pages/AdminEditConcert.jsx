import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, post, put } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

export default function AdminEditConcert() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    ticket_url: "",
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
          const data = await get(`/concerts/${id}`);
          setForm({
            title: data.title || "",
            date: data.date ? data.date.split("T")[0] : "",
            location: data.location || "",
            ticket_url: data.ticket_url || "",
            image: null,
          });
          setPreview(data.image_url || null);
        } catch (e) {
          console.error("Erreur chargement concert :", e);
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
      formData.append("date", form.date);
      formData.append("location", form.location);
      formData.append("ticket_url", form.ticket_url);
      if (form.image) formData.append("image", form.image);

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
        await post("/concerts", formData, config);
      } else {
        await put(`/concerts/${id}`, formData, config);
      }

      setStatus("success");
      navigate("/admin/concerts");
    } catch (e) {
      console.error("Erreur enregistrement concert :", e);
      setStatus("error");
    }
  }

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400">
        Chargement du concert...
      </p>
    );

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] flex justify-center py-12 px-6 sm:px-12">
      <form
        onSubmit={onSubmit}
        className="bg-[#111] border border-[#FF2B6A40] rounded-2xl shadow-lg p-8 w-full max-w-2xl"
        encType="multipart/form-data"
      >
        <h1 className="text-3xl font-bold text-center text-[#FF2B6A] mb-6">
          {id === "new" ? "Créer un concert" : "Modifier le concert"}
        </h1>

        <div className="mb-5">
          <label htmlFor="title" className="block text-[#FF2B6A] mb-2 font-semibold">
            Ville / Titre
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={onChange}
            required
            className="w-full p-3 bg-[#222] text-[#F2F2F2] border border-gray-700 rounded-md focus:border-[#FF2B6A] outline-none"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="block text-[#FF2B6A] mb-2 font-semibold">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={form.date}
            onChange={onChange}
            required
            className="w-full p-3 bg-[#222] text-[#F2F2F2] border border-gray-700 rounded-md focus:border-[#FF2B6A] outline-none"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="location" className="block text-[#FF2B6A] mb-2 font-semibold">
            Lieu
          </label>
          <input
            id="location"
            type="text"
            value={form.location}
            onChange={onChange}
            required
            className="w-full p-3 bg-[#222] text-[#F2F2F2] border border-gray-700 rounded-md focus:border-[#FF2B6A] outline-none"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="ticket_url" className="block text-[#FF2B6A] mb-2 font-semibold">
            Lien de billetterie
          </label>
          <input
            id="ticket_url"
            type="url"
            value={form.ticket_url}
            onChange={onChange}
            placeholder="https://billetterie.com"
            className="w-full p-3 bg-[#222] text-[#F2F2F2] border border-gray-700 rounded-md focus:border-[#FF2B6A] outline-none"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="image" className="block text-[#FF2B6A] mb-2 font-semibold">
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
              className="mt-3 rounded-lg max-h-48 mx-auto shadow-neon"
            />
          )}
        </div>

        <div className="text-center">
          <Button variant="primary" type="submit" disabled={status === "loading"}>
            {status === "loading"
              ? "Enregistrement..."
              : id === "new"
              ? "Créer le concert"
              : "Mettre à jour"}
          </Button>

          {status === "success" && (
            <p className="mt-3 text-green-400">Concert enregistré avec succès</p>
          )}
          {status === "error" && (
            <p className="mt-3 text-red-400">Erreur lors de l’enregistrement</p>
          )}
        </div>
      </form>
    </section>
  );
}

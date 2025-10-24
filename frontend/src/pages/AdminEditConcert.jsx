import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, post, put } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { motion } from "framer-motion";

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
      <p className="text-center mt-10 text-[var(--subtext)] animate-pulse">
        Chargement du concert...
      </p>
    );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="
        min-h-screen flex justify-center items-start
        bg-[var(--bg)] text-[var(--text)]
        py-12 px-6 sm:px-12 transition-colors duration-700
      "
    >
      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="
          w-full max-w-2xl bg-[var(--bg-secondary)]
          border border-[var(--accent)]/40 rounded-2xl
          shadow-[0_0_25px_var(--accent)]/30
          p-8 sm:p-10 transition-all duration-700
        "
      >
        <h1 className="text-3xl font-extrabold text-center text-[var(--accent)] mb-8 drop-shadow-[0_0_10px_var(--accent)]">
          {id === "new" ? "Créer un concert" : "Modifier le concert"}
        </h1>

       
        <div className="mb-5">
          <label htmlFor="title" className="block text-[var(--accent)] mb-2 font-semibold">
            Ville / Titre
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={onChange}
            required
            className="
              w-full p-3 rounded-md border border-[var(--accent)]/40
              bg-[var(--bg)] text-[var(--text)]
              focus:border-[var(--accent)] outline-none transition
            "
          />
        </div>

       
        <div className="mb-5">
          <label htmlFor="date" className="block text-[var(--accent)] mb-2 font-semibold">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={form.date}
            onChange={onChange}
            required
            className="
              w-full p-3 rounded-md border border-[var(--accent)]/40
              bg-[var(--bg)] text-[var(--text)]
              focus:border-[var(--accent)] outline-none transition
            "
          />
        </div>

       
        <div className="mb-5">
          <label htmlFor="location" className="block text-[var(--accent)] mb-2 font-semibold">
            Lieu
          </label>
          <input
            id="location"
            type="text"
            value={form.location}
            onChange={onChange}
            required
            className="
              w-full p-3 rounded-md border border-[var(--accent)]/40
              bg-[var(--bg)] text-[var(--text)]
              focus:border-[var(--accent)] outline-none transition
            "
          />
        </div>

        
        <div className="mb-5">
          <label htmlFor="ticket_url" className="block text-[var(--accent)] mb-2 font-semibold">
            Lien de billetterie
          </label>
          <input
            id="ticket_url"
            type="url"
            value={form.ticket_url}
            onChange={onChange}
            placeholder="https://billetterie.com"
            className="
              w-full p-3 rounded-md border border-[var(--accent)]/40
              bg-[var(--bg)] text-[var(--text)]
              focus:border-[var(--accent)] outline-none transition
            "
          />
        </div>

       
        <div className="mb-5">
          <label htmlFor="image" className="block text-[var(--accent)] mb-2 font-semibold">
            Image (upload local)
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="w-full text-[var(--text)]"
          />
          {preview && (
            <img
              src={preview}
              alt="Aperçu"
              className="mt-3 rounded-lg max-h-48 mx-auto border border-[var(--accent)]/40 shadow-[0_0_15px_var(--accent)]/30"
            />
          )}
        </div>

       
        <div className="text-center mt-8">
          <Button
            variant="primary"
            type="submit"
            disabled={status === "loading"}
            className="
              bg-[var(--accent)] hover:bg-[var(--gold)] hover:text-[var(--bg)]
              text-white font-semibold px-8 py-3 rounded-xl
              shadow-[0_0_12px_var(--accent)]/40 transition
            "
          >
            {status === "loading"
              ? "Enregistrement..."
              : id === "new"
              ? "Créer le concert"
              : "Mettre à jour"}
          </Button>

          {status === "success" && (
            <p className="mt-3 text-green-500">Concert enregistré avec succès</p>
          )}
          {status === "error" && (
            <p className="mt-3 text-red-500">Erreur lors de l’enregistrement</p>
          )}
        </div>
      </form>
    </motion.section>
  );
}

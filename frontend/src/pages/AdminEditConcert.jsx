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

  const isNew = id === "new";

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
    if (!isNew) {
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
          setStatus("error");
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

      if (isNew) {
        await post("/concerts", formData, config);
      } else {
        await put(`/concerts/${id}`, formData, config);
      }

      setStatus("success");
      setTimeout(() => navigate("/admin/concerts"), 1000);
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="
        min-h-screen flex justify-center items-start
        bg-[var(--bg)] text-[var(--text)]
        py-12 px-6 sm:px-12 relative overflow-hidden
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
          {isNew ? "Créer un concert" : "Modifier le concert"}
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

        <div className="flex justify-between mt-8">
          <Button
            variant="secondary"
            onClick={() => navigate("/admin/concerts")}
            className="
              border border-[var(--accent)] text-[var(--accent)]
              hover:bg-[var(--accent)] hover:text-[var(--bg)]
              px-6 py-2 rounded-xl transition-all duration-300
              shadow-[0_0_12px_var(--accent)]/30 hover:shadow-[0_0_18px_var(--accent)]/50
            "
          >
            ← Retour
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={status === "loading"}
            className="
              bg-[var(--accent)] hover:bg-[var(--gold)]
              text-white hover:text-[var(--bg)]
              px-8 py-3 rounded-xl font-semibold
              shadow-[0_0_20px_var(--accent)] hover:shadow-[0_0_25px_var(--gold)]
              transition-all duration-300
            "
          >
            {status === "loading"
              ? "Enregistrement..."
              : isNew
              ? "Créer le concert"
              : "Mettre à jour"}
          </Button>
        </div>

        {status === "success" && (
          <p className="mt-4 text-center text-green-400 font-medium">
            Concert enregistré avec succès
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

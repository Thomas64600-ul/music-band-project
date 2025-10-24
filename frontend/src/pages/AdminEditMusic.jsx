import { useEffect, useState } from "react";
import { get, post, put } from "../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { motion } from "framer-motion";

export default function AdminEditMusic() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    url: "",
    cover: null,
  });

  const [music, setMusic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isEditMode = Boolean(id);


  useEffect(() => {
    if (isEditMode) {
      (async () => {
        try {
          const data = await get(`/musics/${id}`);
          const musicData = data.data || data;
          setMusic(musicData);
          setFormData({
            title: musicData.title || "",
            artist: musicData.artist || "",
            url: musicData.url || "",
            cover: null,
          });
          setPreview(musicData.cover_url || null);
        } catch (error) {
          console.error("Erreur récupération musique :", error);
          setErrorMsg("Erreur lors du chargement de la musique.");
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [id, isEditMode]);

  
  function handleChange(e) {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      if (isEditMode) {
        await put(`/musics/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("🎵 Musique mise à jour avec succès !");
      } else {
        await post("/musics", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("🎶 Nouvelle musique ajoutée !");
      }

      navigate("/admin/musics");
    } catch (error) {
      console.error("Erreur mise à jour musique :", error);
      setErrorMsg(
        error.response?.data?.error || "Erreur lors de la sauvegarde."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return (
      <p className="text-center mt-10 text-[var(--subtext)] animate-pulse">
        Chargement de la musique...
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
      <div
        className="
          w-full max-w-2xl bg-[var(--bg-secondary)]
          border border-[var(--accent)]/40 rounded-2xl
          shadow-[0_0_25px_var(--accent)]/30
          p-8 sm:p-10 transition-all duration-700
        "
      >
        <h1 className="text-3xl font-extrabold text-center text-[var(--accent)] mb-8 drop-shadow-[0_0_10px_var(--accent)]">
          {isEditMode ? "Modifier la musique" : "Ajouter une musique"}
        </h1>

        {errorMsg && (
          <p className="text-[var(--accent)]/90 bg-[var(--accent)]/10 p-3 rounded mb-4 text-center">
            {errorMsg}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          encType="multipart/form-data"
        >
          
          <div>
            <label className="block mb-2 text-[var(--accent)] font-semibold">
              Titre *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="
                w-full p-3 rounded-md border border-[var(--accent)]/40
                bg-[var(--bg)] text-[var(--text)]
                focus:border-[var(--accent)] outline-none transition
              "
            />
          </div>

          
          <div>
            <label className="block mb-2 text-[var(--accent)] font-semibold">
              Artiste
            </label>
            <input
              type="text"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              className="
                w-full p-3 rounded-md border border-[var(--accent)]/40
                bg-[var(--bg)] text-[var(--text)]
                focus:border-[var(--accent)] outline-none transition
              "
            />
          </div>

          
          <div>
            <label className="block mb-2 text-[var(--accent)] font-semibold">
              Lien audio (SoundCloud / Spotify / Cloudinary) *
            </label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              className="
                w-full p-3 rounded-md border border-[var(--accent)]/40
                bg-[var(--bg)] text-[var(--text)]
                focus:border-[var(--accent)] outline-none transition
              "
            />
          </div>

         
          <div>
            <label className="block mb-2 text-[var(--accent)] font-semibold">
              Pochette de la musique
            </label>
            <input
              type="file"
              name="cover"
              accept="image/*"
              onChange={handleChange}
              className="
                block w-full text-[var(--text)]
                border border-[var(--accent)]/40 rounded-md p-2
                bg-[var(--bg)] cursor-pointer
              "
            />

            {(preview || music?.cover_url) && (
              <div className="mt-4 text-center">
                <p className="text-sm text-[var(--subtext)] mb-2">
                  Aperçu :
                </p>
                <img
                  src={preview || music?.cover_url}
                  alt="Prévisualisation"
                  className="
                    w-full max-w-sm mx-auto rounded-lg
                    border border-[var(--accent)]/40
                    shadow-[0_0_15px_var(--accent)]/30
                  "
                />
              </div>
            )}
          </div>

       
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/admin/musics")}
              className="
                border border-[var(--accent)] text-[var(--accent)]
                hover:bg-[var(--accent)] hover:text-[var(--bg)]
                px-6 py-2 rounded-xl transition
              "
            >
              ← Retour
            </Button>

            <Button
              type="submit"
              variant="primary"
              disabled={saving}
              className="
                bg-[var(--accent)] hover:bg-[var(--gold)]
                text-white hover:text-[var(--bg)]
                px-6 py-2 rounded-xl font-semibold
                shadow-[0_0_12px_var(--accent)]/40 transition
              "
            >
              {saving
                ? "Enregistrement..."
                : isEditMode
                ? "Mettre à jour"
                : "Ajouter"}
            </Button>
          </div>
        </form>
      </div>
    </motion.section>
  );
}


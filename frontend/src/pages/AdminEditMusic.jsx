import { useEffect, useState } from "react";
import { get, post, put } from "../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { motion } from "framer-motion";

export default function AdminEditMusic() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    url: "",
    cover: null,
    audio: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!isNew) {
      (async () => {
        try {
          const data = await get(`/musics/${id}`);
          const music = data.data || data;
          setFormData({
            title: music.title || "",
            artist: music.artist || "",
            url: music.url || "",
            cover: null,
            audio: null,
          });
          setPreview(music.cover_url || null);
        } catch (error) {
          console.error("Erreur récupération musique :", error);
          setStatus("error");
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [id, isNew]);

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));

      if (name === "cover") setPreview(URL.createObjectURL(files[0]));
      if (name === "audio") setFormData((prev) => ({ ...prev, url: "" })); 
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      if (isNew) {
        await post("/musics", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await put(`/musics/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setStatus("success");
      setTimeout(() => navigate("/admin/musics"), 1000);
    } catch (error) {
      console.error("Erreur sauvegarde musique :", error);
      setStatus("error");
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
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="
          relative w-full max-w-3xl
          border border-[color-mix(in_oklab,var(--accent)_70%,transparent_30%)]
          rounded-2xl
          shadow-[0_0_25px_var(--accent)]
          hover:shadow-[0_0_40px_var(--accent)]
          bg-[color-mix(in_oklab,var(--bg)_96%,var(--accent)_4%)]
          p-8 sm:p-10
          transition-all duration-500
        "
      >
        <h1 className="text-3xl font-extrabold text-center text-[var(--accent)] drop-shadow-[0_0_12px_var(--accent)] mb-8">
          {isNew ? "Ajouter une musique" : "Modifier la musique"}
        </h1>

        {[
          { name: "title", label: "Titre *", type: "text", required: true },
          { name: "artist", label: "Artiste", type: "text", required: false },
        ].map(({ name, label, type, required }) => (
          <div key={name} className="mb-5">
            <label
              htmlFor={name}
              className="block mb-2 text-[var(--accent)] font-semibold"
            >
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              required={required}
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
        ))}

        {!formData.audio && (
          <div className="mb-8">
            <label
              htmlFor="url"
              className="block mb-2 text-[var(--accent)] font-semibold"
            >
              Lien audio (Cloudinary ou fichier .mp3 direct) *
            </label>
            <input
              id="url"
              name="url"
              type="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://soundcloud.com/reveren/only-god-forgives"
              required={!formData.audio}
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
        )}

        <div className="mb-8">
          <label
            htmlFor="audio"
            className="block mb-2 text-[var(--accent)] font-semibold"
          >
            Fichier audio (MP3 / WAV)
          </label>
          <input
            id="audio"
            name="audio"
            type="file"
            accept="audio/*"
            onChange={handleChange}
            className="
              block w-full text-[var(--text)]
              border border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
              rounded-md p-2
              bg-[color-mix(in_oklab,var(--bg)_96%,black_4%)]
              cursor-pointer transition-all duration-300
              hover:border-[var(--accent)] hover:shadow-[0_0_15px_var(--accent)]
            "
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="cover"
            className="block mb-2 text-[var(--accent)] font-semibold"
          >
            Pochette (image)
          </label>
          <input
            id="cover"
            name="cover"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="
              block w-full text-[var(--text)]
              border border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
              rounded-md p-2
              bg-[color-mix(in_oklab,var(--bg)_96%,black_4%)]
              cursor-pointer transition-all duration-300
              hover:border-[var(--accent)] hover:shadow-[0_0_15px_var(--accent)]
            "
          />

          {preview && (
            <div className="mt-4 text-center">
              <p className="text-sm text-[var(--subtext)] mb-2">Aperçu :</p>
              <img
                src={preview}
                alt="Prévisualisation"
                className="
                  w-full max-w-sm mx-auto rounded-lg
                  border border-[var(--accent)]/40
                  shadow-[0_0_20px_var(--accent)]
                  transition-all duration-500
                "
              />
            </div>
          )}
        </div>

        <div
          className="
            flex flex-col sm:flex-row justify-center sm:justify-between
            gap-4 sm:gap-0 mt-10 text-center
          "
        >
          <Button
            type="button"
            onClick={() => navigate("/admin/musics")}
            className="
              border border-[var(--accent)] text-[var(--accent)]
              hover:bg-[var(--accent)] hover:text-[var(--bg)]
              px-6 py-3 rounded-xl transition-all duration-300
              shadow-[0_0_12px_var(--accent)]
              hover:shadow-[0_0_20px_var(--accent)]
              w-full sm:w-auto font-semibold
            "
          >
            ← Retour
          </Button>

          <Button
            type="submit"
            disabled={saving}
            className="
              bg-[var(--accent)] hover:bg-[var(--gold)]
              text-white hover:text-[var(--bg)]
              px-8 py-3 rounded-xl font-semibold
              shadow-[0_0_20px_var(--accent)]
              hover:shadow-[0_0_25px_var(--gold)]
              w-full sm:w-auto
              transition-all duration-300 relative overflow-hidden
              active:scale-[0.97]
            "
          >
            {saving
              ? "Enregistrement..."
              : isNew
              ? "Ajouter la musique"
              : "Mettre à jour"}
          </Button>
        </div>

        {status === "success" && (
          <p className="mt-4 text-center text-green-400 font-medium">
            Musique enregistrée avec succès
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


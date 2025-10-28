import { useState } from "react";
import { post } from "../lib/api";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { motion } from "framer-motion";

export default function AdminNewMusic() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    url: "",
    cover: null,
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [preview, setPreview] = useState(null);

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
    setLoading(true);
    setErrorMsg("");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      await post("/musics", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/musics");
    } catch (error) {
      console.error("Erreur création musique :", error);
      setErrorMsg(
        error.response?.data?.error || "Erreur lors de la création de la musique."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
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
          shadow-[0_0_25px_color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
          hover:shadow-[0_0_40px_color-mix(in_oklab,var(--accent)_60%,transparent_40%)]
          bg-[color-mix(in_oklab,var(--bg)_96%,var(--accent)_4%)]
          p-8 sm:p-10
          transition-all duration-500
        "
      >
        <h1 className="text-3xl font-extrabold text-center text-[var(--accent)] drop-shadow-[0_0_12px_var(--accent)] mb-8">
          Ajouter une nouvelle musique
        </h1>

        {errorMsg && (
          <p className="text-[var(--accent)]/90 bg-[var(--accent)]/10 p-3 rounded mb-6 text-center font-medium">
            {errorMsg}
          </p>
        )}

        <div className="mb-5">
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
          <label className="block mb-2 text-[var(--accent)] font-semibold">
            Artiste
          </label>
          <input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            placeholder="REVEREN"
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
          <label className="block mb-2 text-[var(--accent)] font-semibold">
            Lien audio (SoundCloud / Spotify / Cloudinary) *
          </label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            placeholder="https://soundcloud.com/reveren/only-god-forgives"
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
          <label className="block mb-2 text-[var(--accent)] font-semibold">
            Pochette (image)
          </label>
          <input
            type="file"
            name="cover"
            accept="image/*"
            onChange={handleChange}
            className="
              block w-full text-[var(--text)]
              border border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
              rounded-md p-2
              bg-[color-mix(in_oklab,var(--bg)_96%,black_4%)]
              cursor-pointer transition-all duration-300
              hover:border-[var(--accent)] hover:shadow-[0_0_15px_var(--accent)]/40
            "
          />
          {preview && (
            <div className="mt-4 text-center">
              <p className="text-sm text-[var(--subtext)] mb-2">Aperçu :</p>
              <img
                src={preview}
                alt="Aperçu pochette"
                className="
                  w-full max-w-sm mx-auto rounded-lg
                  border border-[var(--accent)]/40
                  shadow-[0_0_20px_rgba(179,18,45,0.3)]
                  transition-all duration-500
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
              px-6 py-2 rounded-xl transition-all duration-300
              shadow-[0_0_12px_var(--accent)]/30 hover:shadow-[0_0_18px_var(--accent)]/50
            "
          >
            ← Annuler
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="
              bg-[var(--accent)] hover:bg-[var(--gold)]
              text-white hover:text-[var(--bg)]
              px-8 py-3 rounded-xl font-semibold
              shadow-[0_0_20px_var(--accent)] hover:shadow-[0_0_25px_var(--gold)]
              transition-all duration-300
            "
          >
            {loading ? "Enregistrement..." : "Ajouter la musique"}
          </Button>
        </div>
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


import { useState } from "react";
import { post } from "../lib/api";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

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

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
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

      const res = await post("/musics", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Musique créée :", res);
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
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] py-12 px-6 sm:px-12">
      <div className="max-w-2xl mx-auto bg-[#111] p-8 rounded-2xl border border-[#FF1744]/30 shadow-lg">
        <h1 className="text-3xl font-bold text-[#FF1744] mb-6">
          Ajouter une nouvelle musique
        </h1>

        {errorMsg && (
          <p className="text-red-400 bg-red-950/40 p-3 rounded mb-4">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block mb-2 font-semibold">Titre *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-[#1a1a1a] border border-gray-700 text-[#F2F2F2] focus:border-[#FF1744] focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Artiste</label>
            <input
              type="text"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              placeholder="REVEREN"
              className="w-full p-3 rounded bg-[#1a1a1a] border border-gray-700 text-[#F2F2F2] focus:border-[#FF1744] focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Lien audio (SoundCloud / Spotify) *
            </label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              placeholder="https://soundcloud.com/reveren/only-god-forgives"
              className="w-full p-3 rounded bg-[#1a1a1a] border border-gray-700 text-[#F2F2F2] focus:border-[#FF1744] focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Pochette (image)</label>
            <input
              type="file"
              name="cover"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-gray-300 bg-[#1a1a1a] border border-gray-700 p-2 rounded cursor-pointer"
            />
          </div>

          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/admin/musics")}
            >
              Annuler
            </Button>

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? "Enregistrement..." : "Ajouter la musique"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

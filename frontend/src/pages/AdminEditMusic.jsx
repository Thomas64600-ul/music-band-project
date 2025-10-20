import { useEffect, useState } from "react";
import { get, post, put } from "../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";

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
      <p className="text-center mt-10 text-gray-400">
        Chargement de la musique...
      </p>
    );

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] py-12 px-6 sm:px-12">
      <div className="max-w-2xl mx-auto bg-[#111] p-8 rounded-2xl border border-[#FF1744]/30 shadow-lg">
        <h1 className="text-3xl font-bold text-[#FF1744] mb-6 text-center">
          {isEditMode ? "Modifier la musique" : "Ajouter une musique"}
        </h1>

        {errorMsg && (
          <p className="text-red-400 bg-red-950/40 p-3 rounded mb-4">
            {errorMsg}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          encType="multipart/form-data"
        >
          
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
              className="w-full p-3 rounded bg-[#1a1a1a] border border-gray-700 text-[#F2F2F2] focus:border-[#FF1744] focus:outline-none"
            />
          </div>

          
          <div>
            <label className="block mb-2 font-semibold">
              Lien audio (SoundCloud / Spotify / Cloudinary) *
            </label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-[#1a1a1a] border border-gray-700 text-[#F2F2F2] focus:border-[#FF1744] focus:outline-none"
            />
          </div>

         
          <div>
            <label className="block mb-2 font-semibold">
              Pochette de la musique
            </label>
            <input
              type="file"
              name="cover"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-gray-300 bg-[#1a1a1a] border border-gray-700 p-2 rounded cursor-pointer"
            />

            {preview && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">Aperçu :</p>
                <img
                  src={preview}
                  alt="Prévisualisation"
                  className="w-full max-w-sm rounded-lg border border-gray-700"
                />
              </div>
            )}

            {!preview && music?.cover_url && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">Pochette actuelle :</p>
                <img
                  src={music.cover_url}
                  alt={music.title}
                  className="w-full max-w-sm rounded-lg border border-gray-700"
                />
              </div>
            )}
          </div>

          
          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/admin/musics")}
            >
              ← Retour
            </Button>

            <Button type="submit" variant="primary" disabled={saving}>
              {saving
                ? "Enregistrement..."
                : isEditMode
                ? "Mettre à jour"
                : "Ajouter"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}


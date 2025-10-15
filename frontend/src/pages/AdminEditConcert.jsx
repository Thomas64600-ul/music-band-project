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
    city: "",
    date: "",
    location: "",
    image_url: "",
    ticket_url: "",
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
          const data = await get(`/concerts/${id}`);
          setForm({
            city: data.city || "",
            date: data.date ? data.date.split("T")[0] : "",
            location: data.location || "",
            image_url: data.image_url || "",
            ticket_url: data.ticket_url || "",
          });
        } catch (e) {
          console.error("Erreur chargement concert:", e);
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
        await post("/concerts", form);
      } else {
        await put(`/concerts/${id}`, form);
      }
      setStatus("success");
      navigate("/admin/concerts");
    } catch (e) {
      console.error("Erreur enregistrement concert:", e);
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
          {id === "new" ? "Ajouter un concert" : "Modifier le concert"}
        </h1>

        <div className="mb-5">
          <label htmlFor="city" className="block text-[#FFD700] mb-2 font-semibold">
            Ville
          </label>
          <input
            id="city"
            type="text"
            value={form.city}
            onChange={onChange}
            required
            className="w-full p-3 bg-[#222] text-[#F2F2F2] border border-gray-700 rounded-md focus:border-[#FFD700] outline-none"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="block text-[#FFD700] mb-2 font-semibold">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={form.date}
            onChange={onChange}
            required
            className="w-full p-3 bg-[#222] text-[#F2F2F2] border border-gray-700 rounded-md focus:border-[#FFD700] outline-none"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="location" className="block text-[#FFD700] mb-2 font-semibold">
            Lieu
          </label>
          <input
            id="location"
            type="text"
            value={form.location}
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
          {form.image_url && (
            <img
              src={form.image_url}
              alt="Aperçu"
              className="mt-3 rounded-lg max-h-48 mx-auto"
            />
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="ticket_url" className="block text-[#FFD700] mb-2 font-semibold">
            Lien de billetterie
          </label>
          <input
            id="ticket_url"
            type="text"
            value={form.ticket_url}
            onChange={onChange}
            placeholder="https://billetterie.com"
            className="w-full p-3 bg-[#222] text-[#F2F2F2] border border-gray-700 rounded-md focus:border-[#FFD700] outline-none"
          />
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
            <p className="mt-3 text-green-400">Concert enregistré</p>
          )}
          {status === "error" && (
            <p className="mt-3 text-red-400">Erreur lors de l’enregistrement</p>
          )}
        </div>
      </form>
    </section>
  );
}

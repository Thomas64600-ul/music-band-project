import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      await register(form);
      setStatus("success");
      navigate("/login"); 
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-[#F2F2F2]">
      <form
        onSubmit={onSubmit}
        className="bg-[#111] border border-[#FFD70040] rounded-2xl shadow-lg p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-[#FFD700] mb-6">Inscription</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstname" className="block text-[#FFD700] mb-2">Prénom</label>
            <input
              id="firstname"
              type="text"
              value={form.firstname}
              onChange={onChange}
              required
              className="w-full p-3 bg-[#222] text-[#F2F2F2] border border-gray-700 rounded-md focus:outline-none focus:border-[#FFD700]"
            />
          </div>
          <div>
            <label htmlFor="lastname" className="block text-[#FFD700] mb-2">Nom</label>
            <input
              id="lastname"
              type="text"
              value={form.lastname}
              onChange={onChange}
              required
              className="w-full p-3 bg-[#222] text-[#F2F2F2] border border-gray-700 rounded-md focus:outline-none focus:border-[#FFD700]"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-[#FFD700] mb-2">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            className="w-full p-3 bg-[#222] text-[#F2F2F2] border border-gray-700 rounded-md focus:outline-none focus:border-[#FFD700]"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-[#FFD700] mb-2">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
            className="w-full p-3 bg-[#222] text-[#F2F2F2] border border-gray-700 rounded-md focus:outline-none focus:border-[#FFD700]"
          />
        </div>

        <div className="text-center">
          <Button variant="primary" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Inscription..." : "S’inscrire"}
          </Button>
          {status === "success" && (
            <p className="mt-3 text-green-400">Compte créé,Vérifiez votre e-mail</p>
          )}
          {status === "error" && (
            <p className="mt-3 text-red-400">Échec de l’inscription</p>
          )}
        </div>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      await login(form);
      setStatus("success");
      navigate("/"); 
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
        <h1 className="text-3xl font-bold text-center text-[#FFD700] mb-6">Connexion</h1>
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
            {status === "loading" ? "Connexion..." : "Se connecter"}
          </Button>
          {status === "error" && (
            <p className="mt-3 text-red-400">Échec de la connexion</p>
          )}
        </div>
      </form>
    </div>
  );
}

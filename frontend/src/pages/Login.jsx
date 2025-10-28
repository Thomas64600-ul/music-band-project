import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="
        min-h-screen flex items-center justify-center
        relative overflow-hidden
        bg-[var(--bg)] text-[var(--text)]
        transition-colors duration-700 ease-in-out
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
        className="
          relative w-full max-w-md
          bg-[color-mix(in_oklab,var(--bg)_95%,black_5%)]
          border border-[var(--accent)]/30
          rounded-2xl shadow-[0_0_25px_rgba(179,18,45,0.35)]
          hover:shadow-[0_0_40px_rgba(179,18,45,0.5)]
          hover:border-[var(--accent)]
          transition-all duration-500
          p-8 sm:p-10
        "
      >
        <h1 className="text-3xl font-extrabold text-center text-[var(--accent)] mb-8 drop-shadow-[0_0_12px_var(--accent)]">
          Connexion
        </h1>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-[var(--subtext)] mb-2 font-medium"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            className="
              w-full p-3 rounded-md
              bg-[color-mix(in_oklab,var(--bg)_90%,black_10%)]
              text-[var(--text)]
              border border-[var(--border)]/40
              focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/40
              outline-none transition-all duration-300
            "
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="password"
            className="block text-[var(--subtext)] mb-2 font-medium"
          >
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
            className="
              w-full p-3 rounded-md
              bg-[color-mix(in_oklab,var(--bg)_90%,black_10%)]
              text-[var(--text)]
              border border-[var(--border)]/40
              focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/40
              outline-none transition-all duration-300
            "
          />
        </div>

        <div className="text-center">
          <Button
            variant="primary"
            type="submit"
            disabled={status === "loading"}
            className="
              px-6 py-3 rounded-md
              bg-[var(--accent)] text-white font-semibold
              hover:bg-[var(--gold)] hover:text-[var(--bg)]
              hover:shadow-[0_0_25px_var(--accent)]
              active:scale-95
              transition-all duration-300 ease-in-out
            "
          >
            {status === "loading" ? "Connexion..." : "Se connecter"}
          </Button>

          {status === "error" && (
            <p className="mt-4 text-red-400 font-semibold">
              ⚠️ Échec de la connexion
            </p>
          )}
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
    </motion.div>
  );
}

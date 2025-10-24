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
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-[var(--bg)] text-[var(--text)]
        transition-colors duration-700 ease-in-out
      "
    >
      <form
        onSubmit={onSubmit}
        className="
          bg-[var(--surface)]
          border border-[var(--border)]/40
          rounded-2xl shadow-md p-8 w-full max-w-md
          transition-all duration-300
          hover:shadow-[0_0_20px_var(--accent)]/20
        "
      >
       
        <h1 className="text-3xl font-bold text-center text-[var(--accent)] mb-8 drop-shadow-[0_0_8px_var(--accent)]">
          Connexion
        </h1>

       
        <div className="mb-5">
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
              border border-[var(--border)] focus:border-[var(--accent)]
              outline-none transition-colors duration-300
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
              border border-[var(--border)] focus:border-[var(--accent)]
              outline-none transition-colors duration-300
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
              hover:shadow-[0_0_20px_var(--accent)]
              transition-all duration-300 ease-in-out
              active:scale-95
            "
          >
            {status === "loading" ? "Connexion..." : "Se connecter"}
          </Button>

          {status === "error" && (
            <p className="mt-4 text-red-400">Échec de la connexion</p>
          )}
        </div>
      </form>
    </div>
  );
}

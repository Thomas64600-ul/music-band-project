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
      setTimeout(() => navigate("/login"), 1500);
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
          Inscription
        </h1>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label
              htmlFor="firstname"
              className="block text-[var(--subtext)] mb-2 font-medium"
            >
              Prénom
            </label>
            <input
              id="firstname"
              type="text"
              value={form.firstname}
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

          <div>
            <label
              htmlFor="lastname"
              className="block text-[var(--subtext)] mb-2 font-medium"
            >
              Nom
            </label>
            <input
              id="lastname"
              type="text"
              value={form.lastname}
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
        </div>

        
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
              hover:shadow-[0_0_25px_var(--accent)]
              transition-all duration-300 ease-in-out
              active:scale-95
            "
          >
            {status === "loading" ? "Inscription..." : "S’inscrire"}
          </Button>

          {status === "success" && (
            <p className="mt-4 text-green-400 animate-pulse">
              Compte créé, vérifiez votre e-mail
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-red-400">Échec de l’inscription</p>
          )}
        </div>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { motion } from "framer-motion";

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
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      setStatus("error");
    }
  }

  return (
    <motion.main
      role="main"
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
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_center,#B3122D33_0%,transparent_70%)]
          blur-[150px] opacity-70
        "
      ></div>

      <form
        onSubmit={onSubmit}
        aria-label="Formulaire d’inscription"
        className="
          relative w-full max-w-md
          rounded-2xl p-8 sm:p-10 transition-all duration-500
          border border-[color-mix(in_oklab,var(--accent)_70%,transparent_30%)]
          shadow-[0_0_25px_color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
          hover:shadow-[0_0_40px_color-mix(in_oklab,var(--accent)_60%,transparent_40%)]
          bg-[color-mix(in_oklab,var(--bg)_96%,var(--accent)_4%)]
        "
      >
        <h1
          className="
            text-3xl font-extrabold text-center mb-8
            text-[var(--accent)] drop-shadow-[0_0_15px_var(--accent)]
          "
        >
          Inscription
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {[
            { id: "firstname", label: "Prénom" },
            { id: "lastname", label: "Nom" },
          ].map(({ id, label }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block mb-2 font-medium text-[color-mix(in_oklab,var(--text)_85%,var(--accent)_15%)]"
              >
                {label}
              </label>
              <input
                id={id}
                type="text"
                value={form[id]}
                onChange={onChange}
                autoComplete={id === "firstname" ? "given-name" : "family-name"}
                required
                className="
                  w-full p-3 rounded-md border outline-none transition-all duration-300
                  bg-[color-mix(in_oklab,var(--bg)_90%,var(--accent)_10%)]
                  border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
                  text-[var(--text)]
                  focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30
                "
              />
            </div>
          ))}
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 font-medium text-[color-mix(in_oklab,var(--text)_85%,var(--accent)_15%)]"
          >
            Adresse email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={onChange}
            autoComplete="email"
            placeholder="exemple@mail.com"
            required
            className="
              w-full p-3 rounded-md border outline-none transition-all duration-300
              bg-[color-mix(in_oklab,var(--bg)_90%,var(--accent)_10%)]
              border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
              text-[var(--text)]
              focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30
            "
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="password"
            className="block mb-2 font-medium text-[color-mix(in_oklab,var(--text)_85%,var(--accent)_15%)]"
          >
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={onChange}
            autoComplete="new-password"
            placeholder="Votre mot de passe"
            required
            className="
              w-full p-3 rounded-md border outline-none transition-all duration-300
              bg-[color-mix(in_oklab,var(--bg)_90%,var(--accent)_10%)]
              border-[color-mix(in_oklab,var(--accent)_40%,transparent_60%)]
              text-[var(--text)]
              focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30
            "
          />
        </div>

        <div className="text-center">
          <Button
            type="submit"
            disabled={status === "loading"}
            className="
              px-6 py-3 rounded-md 
              bg-[var(--accent)] text-white font-semibold 
              hover:bg-[var(--gold)] hover:text-[var(--bg)]
              hover:shadow-[0_0_25px_var(--accent)]
              active:scale-95
              transition-all duration-300 ease-in-out
              w-full
            "
          >
            {status === "loading" ? "Inscription..." : "S’inscrire"}
          </Button>

          {status === "success" && (
            <p
              role="status"
              className="mt-4 text-green-400 animate-pulse"
            >
              Compte créé — vérifiez votre e-mail
            </p>
          )}
          {status === "error" && (
            <p
              role="alert"
              className="mt-4 text-red-400 font-semibold"
            >
              Échec de l’inscription
            </p>
          )}
        </div>
      </form>

      <div
        aria-hidden="true"
        className="
          absolute bottom-0 left-1/2 -translate-x-1/2
          w-[60vw] h-[60vw]
          bg-[radial-gradient(circle_at_center,#B3122D33_0%,transparent_70%)]
          blur-[120px] opacity-60 pointer-events-none
        "
      ></div>
    </motion.main>
  );
}



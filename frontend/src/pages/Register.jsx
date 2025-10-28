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
    bg-[#0A0A0A]
    border border-[#B3122D66]
    rounded-2xl shadow-[0_0_25px_#B3122D55]
    hover:shadow-[0_0_40px_#B3122D99]
    hover:border-[#B3122D]
    transition-all duration-500
    p-8 sm:p-10
  "
>
  <h1 className="text-3xl font-extrabold text-center text-[#B3122D] mb-8 drop-shadow-[0_0_15px_#B3122D99]">
    Inscription
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
    <div>
      <label htmlFor="firstname" className="block text-[#CFCFCF] mb-2 font-medium">
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
          bg-[#111]
          text-[#F2F2F2]
          border border-[#B3122D66]
          focus:border-[#B3122D]
          outline-none transition-all duration-300
        "
      />
    </div>

    <div>
      <label htmlFor="lastname" className="block text-[#CFCFCF] mb-2 font-medium">
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
          bg-[#111]
          text-[#F2F2F2]
          border border-[#B3122D66]
          focus:border-[#B3122D]
          outline-none transition-all duration-300
        "
      />
    </div>
  </div>

  <div className="mb-5">
    <label htmlFor="email" className="block text-[#CFCFCF] mb-2 font-medium">
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
        bg-[#111]
        text-[#F2F2F2]
        border border-[#B3122D66]
        focus:border-[#B3122D]
        outline-none transition-all duration-300
      "
    />
  </div>

  <div className="mb-8">
    <label htmlFor="password" className="block text-[#CFCFCF] mb-2 font-medium">
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
        bg-[#111]
        text-[#F2F2F2]
        border border-[#B3122D66]
        focus:border-[#B3122D]
        outline-none transition-all duration-300
      "
    />
  </div>

  <div className="text-center">
    <Button
      type="submit"
      disabled={status === 'loading'}
      className="
        px-6 py-3 rounded-md 
        bg-[#B3122D] text-white font-semibold 
        hover:bg-[#E6B422] hover:text-[#0A0A0A]
        hover:shadow-[0_0_25px_#B3122D]
        active:scale-95
        transition-all duration-300 ease-in-out
      "
    >
      {status === 'loading' ? 'Inscription...' : 'S’inscrire'}
    </Button>

    {status === 'success' && (
      <p className="mt-4 text-green-400 animate-pulse">
        Compte créé — vérifiez votre e-mail
      </p>
    )}
    {status === 'error' && (
      <p className="mt-4 text-red-400 font-semibold">Échec de l’inscription</p>
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


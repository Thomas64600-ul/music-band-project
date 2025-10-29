import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main
      role="main"
      className="
        min-h-screen flex flex-col items-center justify-center 
        bg-[#0A0A0A] text-[#F2F2F2] text-center
        transition-colors duration-700 ease-in-out
      "
    >
      <h1
        className="
          text-6xl font-extrabold text-[#FFD700] mb-4 
          drop-shadow-[0_0_15px_#FFD70080]
        "
      >
        404
      </h1>

      <p className="text-xl mb-6 text-gray-300">
        Page introuvable ou supprimée.
      </p>

      <Link
        to="/"
        className="
          px-6 py-3 bg-[#B3122D] text-white rounded-lg font-semibold
          hover:bg-[#8E0F24] hover:shadow-[0_0_20px_#B3122D80]
          focus:outline-none focus:ring-2 focus:ring-[#FFD700]/60
          active:scale-95
          transition-all duration-300 ease-in-out
        "
      >
        Retour à l’accueil
      </Link>
    </main>
  );
}

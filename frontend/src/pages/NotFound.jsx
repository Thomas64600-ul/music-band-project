import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-[#0A0A0A] text-[#F2F2F2]">
      <h1 className="text-6xl font-extrabold text-[#FFD700] mb-4">404</h1>
      <p className="text-xl mb-6">Page introuvable ou supprimée.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#B3122D] text-white rounded-lg hover:bg-[#8E0F24] transition-colors"
      >
        Retour à l’accueil
      </Link>
    </main>
  );
}
